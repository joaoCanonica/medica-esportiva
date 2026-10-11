import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// Domínio público do site. Enquanto o domínio próprio não existir, usa a URL da Vercel.
// Para trocar, defina SITE_URL nas variáveis de ambiente da Vercel (sem barra no final).
const SITE = (process.env.SITE_URL ?? 'https://medica-esportiva.vercel.app').replace(/\/+$/, '');

export default defineConfig({
  site: SITE,
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => !/\/404\/?$/.test(page),
      lastmod: new Date(),
    }),
  ],
  compressHTML: true,
});
