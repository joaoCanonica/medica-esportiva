import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://drakarinebittencourt.com.br',
  integrations: [sitemap()],
  compressHTML: true,
});
