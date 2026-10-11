// Verificação de SEO pós-build. Falha (exit 1) se algo publicaria canonical,
// schema ou sitemap errados. Uso: node scripts/check-seo.mjs (depois do astro build).
import { readFile, readdir } from 'node:fs/promises';
import { join, relative, sep } from 'node:path';
import config from '../astro.config.mjs';

const DIST = new URL('../dist/', import.meta.url).pathname;
const SITE = new URL(config.site).href; // sempre com barra final
const errors = [];
const fail = (where, msg) => errors.push(`${where}: ${msg}`);

const decode = (s) =>
  s
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&');
const text = (html) => decode(html.replace(/<[^>]*>/g, '')).replace(/\s+/g, ' ').trim();
const attr = (tag, name) => tag.match(new RegExp(`${name}="([^"]*)"`))?.[1];
const meta = (html, key, value) =>
  [...html.matchAll(/<meta\b[^>]*>/g)].map((m) => m[0]).find((t) => attr(t, key) === value);

async function htmlFiles(dir) {
  const out = [];
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) out.push(...(await htmlFiles(full)));
    else if (entry.name.endsWith('.html')) out.push(full);
  }
  return out;
}

const pageURL = (file) => {
  const rel = relative(DIST, file).split(sep).join('/');
  return new URL(rel.replace(/(^|\/)index\.html$/, '$1'), SITE).href;
};

const definedIds = new Set();
const referencedIds = [];

function walkSchema(node, where, key = '') {
  if (Array.isArray(node)) return node.forEach((n) => walkSchema(n, where, key));
  if (node && typeof node === 'object') {
    const type = node['@type'];
    if (['Review', 'AggregateRating', 'Offer'].includes(type)) fail(where, `schema proibido: ${type}`);
    if ('priceRange' in node || 'price' in node) fail(where, 'schema com preço');
    const keys = Object.keys(node);
    if (keys.length === 1 && keys[0] === '@id') referencedIds.push([where, node['@id']]);
    else if (node['@id']) definedIds.add(node['@id']);
    for (const [k, v] of Object.entries(node)) walkSchema(v, where, k);
    return;
  }
  if (typeof node !== 'string') return;
  if (/^(\/|\.\/|\.\.\/)/.test(node)) fail(where, `URL relativa no schema (${key}): ${node}`);
  const mustBeSite = ['@id', 'url', 'image', 'thumbnailUrl', 'contentUrl'];
  if (mustBeSite.includes(key) && !node.startsWith(SITE)) fail(where, `${key} fora do site: ${node}`);
}

const pages = [];
for (const file of await htmlFiles(DIST)) {
  const html = await readFile(file, 'utf8');
  const url = pageURL(file);
  const where = relative(DIST, file);
  const is404 = /(^|\/)404(\.html|\/index\.html)$/.test(where);
  const robots = attr(meta(html, 'name', 'robots') ?? '', 'content') ?? '';
  const noindex = robots.includes('noindex');
  if (!noindex) pages.push(url);
  if (is404 && !noindex) fail(where, '404 deveria ter noindex');

  const title = text(html.match(/<title>([\s\S]*?)<\/title>/)?.[1] ?? '');
  if (!title) fail(where, '<title> vazio');
  if (title.length > 65) fail(where, `<title> com ${title.length} caracteres (máx. 65)`);
  const desc = decode(attr(meta(html, 'name', 'description') ?? '', 'content') ?? '');
  if (!desc) fail(where, 'meta description vazia');
  if (desc.length > 155) fail(where, `meta description com ${desc.length} caracteres (máx. 155)`);

  const canonical = attr(html.match(/<link[^>]*rel="canonical"[^>]*>/)?.[0] ?? '', 'href');
  const ogUrl = attr(meta(html, 'property', 'og:url') ?? '', 'content');
  const ogImage = attr(meta(html, 'property', 'og:image') ?? '', 'content');
  for (const [name, value] of [['canonical', canonical], ['og:url', ogUrl], ['og:image', ogImage]]) {
    if (!value?.startsWith(SITE)) fail(where, `${name} não começa com ${SITE}: ${value}`);
  }
  if (!noindex && canonical !== url) fail(where, `canonical ${canonical} difere da URL ${url}`);

  const h1 = html.match(/<h1\b/g)?.length ?? 0;
  if (h1 !== 1) fail(where, `${h1} <h1> na página (esperado 1)`);
  for (const m of html.matchAll(/<(h2|h3)\b[^>]*>([\s\S]*?)<\/\1>/g)) {
    if (!text(m[2])) fail(where, `<${m[1]}> vazio`);
  }
  for (const m of html.matchAll(/<img\b[^>]*>/g)) {
    if (!/\balt="/.test(m[0])) fail(where, `<img> sem alt: ${m[0].slice(0, 80)}`);
  }

  const blocks = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)];
  if (!noindex && blocks.length !== 1) fail(where, `${blocks.length} blocos JSON-LD (esperado 1)`);
  for (const block of blocks) {
    let data;
    try {
      data = JSON.parse(block[1]);
    } catch (e) {
      fail(where, `JSON-LD inválido: ${e.message}`);
      continue;
    }
    walkSchema(data, where);
    const graph = data['@graph'] ?? [];
    for (const v of graph.filter((n) => n['@type'] === 'VideoObject')) {
      for (const k of ['name', 'thumbnailUrl', 'uploadDate']) if (!v[k]) fail(where, `VideoObject sem ${k}`);
    }
    // FAQPage tem que bater com o texto visível
    const faq = graph.find((n) => n['@type'] === 'FAQPage');
    if (faq) {
      const visible = [...html.matchAll(/<details class="faq-item"[^>]*>([\s\S]*?)<\/details>/g)].map((m) => ({
        q: text(m[1].match(/<summary>([\s\S]*?)<\/summary>/)?.[1] ?? ''),
        a: text(m[1].match(/<p>([\s\S]*?)<\/p>/)?.[1] ?? ''),
      }));
      const schemaQA = faq.mainEntity.map((q) => ({ q: q.name, a: q.acceptedAnswer.text }));
      if (JSON.stringify(visible) !== JSON.stringify(schemaQA)) fail(where, 'FAQPage difere do FAQ visível');
    }
  }
}

for (const [where, id] of referencedIds) {
  if (!definedIds.has(id)) fail(where, `@id referenciado não existe: ${id}`);
}

// Sitemap: exatamente as páginas indexáveis
const sitemap = await readFile(join(DIST, 'sitemap-0.xml'), 'utf8');
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]).sort();
if (JSON.stringify(locs) !== JSON.stringify([...pages].sort())) {
  fail('sitemap-0.xml', `lista ${JSON.stringify(locs)}, esperado ${JSON.stringify(pages.sort())}`);
}

// robots.txt: nada bloqueado e Sitemap apontando para o site
const robotsTxt = await readFile(join(DIST, 'robots.txt'), 'utf8');
if (/^\s*Disallow:\s*\S/im.test(robotsTxt)) fail('robots.txt', 'contém Disallow');
const sitemapLine = robotsTxt.match(/^Sitemap:\s*(\S+)/m)?.[1];
if (sitemapLine !== new URL('sitemap-index.xml', SITE).href) fail('robots.txt', `Sitemap: ${sitemapLine}`);

if (errors.length) {
  console.error(`check-seo: ${errors.length} problema(s) (site ${SITE})`);
  for (const e of errors) console.error(`  - ${e}`);
  process.exit(1);
}
console.log(`check-seo: ok (${pages.length} páginas indexáveis, site ${SITE})`);
