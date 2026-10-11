import type { APIRoute } from 'astro';

// Nenhum crawler é bloqueado (inclui buscadores e assistentes de IA).
export const GET: APIRoute = ({ site }) => {
  const sitemapURL = new URL('sitemap-index.xml', site).href;
  return new Response(`User-agent: *\nAllow: /\n\nSitemap: ${sitemapURL}\n`, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
};
