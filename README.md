# Site — Dra. Karine Bittencourt

Site institucional estático, construído com [Astro](https://astro.build) + TypeScript, sem
backend, sem CMS e com o mínimo de JavaScript necessário.

## Stack

- **Astro** — geração de HTML estático e pipeline de imagens.
- **TypeScript** (modo `strict`) para dados e scripts.
- **CSS próprio**, organizado em tokens e seções (`src/styles/global.css`), sem frameworks de
  utilitários.
- **JavaScript mínimo**: menu móvel acessível, cabeçalho sólido ao rolar e animações de entrada
  via `IntersectionObserver` (respeitando `prefers-reduced-motion`).

## Como rodar o projeto

```bash
npm install       # instala as dependências
npm run dev        # inicia o servidor de desenvolvimento (http://localhost:4321)
npm run check       # verifica tipos (Astro + TypeScript)
npm run build       # gera a build de produção em ./dist
npm run preview      # serve a build de produção localmente
```

## Estrutura

```
src/
  assets/images/     # imagens usadas pelo pipeline de imagens do Astro (astro:assets)
  components/        # um componente Astro por seção da página
  components/icons/  # ícones SVG inline (sem bibliotecas de ícones)
  data/site.ts        # dados centrais: contato, links, textos reutilizados
  layouts/BaseLayout.astro  # <head>, SEO, fontes, dados estruturados
  pages/
    index.astro        # página principal
    politica-de-privacidade.astro
  lib/schema.ts        # JSON-LD (@graph) a partir de data/site.ts
  scripts/             # scripts do navegador (menu, vídeo, animações)
  styles/global.css    # tokens de design e todo o CSS do site
public/
  favicon.svg, ícones PNG, site.webmanifest, og-image.png, videos/
assets/   # imagens originais enviadas pela cliente (preservadas, não usadas diretamente pelo site)
videos/   # vídeos originais enviados pela cliente (preservados; não incluídos no site nesta etapa)
```

As pastas `assets/` e `videos/` na raiz do repositório contêm os arquivos originais e não são
lidas pelo build do Astro (que usa `src/` e `public/`). Elas foram mantidas intactas.

## Deploy

O projeto é compatível com o preset padrão de sites estáticos da Vercel:

1. Importe o repositório na Vercel.
2. Framework preset: **Astro** (detectado automaticamente).
3. Build command: `npm run build` (inclui `astro check` e `scripts/check-seo.mjs`). Output directory: `dist`.

O `vercel.json` define URLs com barra final, cabeçalhos de segurança e cache de assets.

### Domínio

O domínio público vem da variável de ambiente `SITE_URL` (lida em `astro.config.mjs`). Ela gera
`canonical`, Open Graph, JSON-LD, `sitemap-index.xml` e a linha `Sitemap:` do `robots.txt`
(gerado por `src/pages/robots.txt.ts`).

Enquanto o domínio próprio não existir, o site usa a URL da Vercel,
`https://medica-esportiva.vercel.app`. Quando o domínio for registrado:

1. Na Vercel, em Settings > Environment Variables, crie `SITE_URL=https://dominio.com.br`
   (ambiente **Production**, sem barra no final).
2. Em Settings > Domains, adicione `dominio.com.br` e `www.dominio.com.br`. Deixe o domínio
   sem `www` como principal e configure o `www` para redirecionar com 301.
3. Faça um redeploy. O build falha se alguma URL de SEO não bater com `SITE_URL`.

Para conferir localmente: `SITE_URL=https://exemplo.com.br npm run build`.

### Ícones

Os PNG de `public/` (favicon, apple-touch-icon) são gerados a partir de `public/favicon.svg`
com `node scripts/gerar-icones.mjs`.

## Vídeos

Os vídeos publicados ficam em `public/videos/` (H.264, faststart) e abrem num diálogo com
`preload="none"`. Título, descrição, duração e data de publicação de cada um estão em
`src/data/site.ts` e alimentam também o JSON-LD (`VideoObject`). Os originais da pasta `videos/`
na raiz não entram no build.
