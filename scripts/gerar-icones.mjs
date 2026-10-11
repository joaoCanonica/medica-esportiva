// Gera os ícones PNG a partir de public/favicon.svg (uso: node scripts/gerar-icones.mjs).
import sharp from 'sharp';
import { readFile } from 'node:fs/promises';

const svg = await readFile(new URL('../public/favicon.svg', import.meta.url));
const fundo = '#0d2620'; // mesmo verde do fundo do favicon.svg

const alvos = [
  ['favicon-32.png', 32],
  ['favicon-192.png', 192],
  ['favicon-512.png', 512],
];

for (const [nome, tamanho] of alvos) {
  await sharp(svg, { density: 384 }).resize(tamanho, tamanho).png().toFile(`public/${nome}`);
}

// apple-touch-icon: 180x180, fundo sólido, sem transparência (o iOS arredonda os cantos).
await sharp(svg, { density: 384 })
  .resize(180, 180)
  .flatten({ background: fundo })
  .png()
  .toFile('public/apple-touch-icon.png');

console.log('Ícones gerados em public/.');
