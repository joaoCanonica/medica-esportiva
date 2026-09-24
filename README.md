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
  scripts/reveal.ts    # animação de entrada (IntersectionObserver)
  styles/global.css    # tokens de design e todo o CSS do site
public/
  favicon.svg, og-image.png, robots.txt
assets/   # imagens originais enviadas pela cliente (preservadas, não usadas diretamente pelo site)
videos/   # vídeos originais enviados pela cliente (preservados; não incluídos no site nesta etapa)
```

As pastas `assets/` e `videos/` na raiz do repositório contêm os arquivos originais e não são
lidas pelo build do Astro (que usa `src/` e `public/`). Elas foram mantidas intactas.

## Domínio e SEO

O `astro.config.mjs` define `site: 'https://drakarinebittencourt.com.br'` como placeholder para
gerar as tags `canonical`, Open Graph e o `sitemap.xml`. **Atualize esse valor** para o domínio
definitivo antes do deploy final — o `robots.txt` também referencia esse domínio no campo
`Sitemap:` e deve ser atualizado junto.

## Deploy na Vercel

O projeto é compatível com o preset padrão de sites estáticos da Vercel:

1. Importe o repositório na Vercel.
2. Framework preset: **Astro** (detectado automaticamente).
3. Build command: `npm run build` — Output directory: `dist`.

## Vídeos

Os vídeos enviados (pasta `videos/`) não foram incorporados nesta primeira versão do site,
conforme solicitado. Eles serão tratados em uma etapa futura (com otimização de tamanho antes de
qualquer uso em produção).
