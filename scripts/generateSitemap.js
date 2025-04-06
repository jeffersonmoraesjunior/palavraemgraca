// @ts-check
import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { generateSitemap } from '../src/utils/serverBlogUtils.js';

// Obtenha o diretório atual em ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Diretório público onde o sitemap será salvo
const publicDirectory = path.join(path.resolve(__dirname, '..'), 'public');

// Função principal para gerar e escrever o sitemap
function writeSitemap() {
  try {
    if (!fs.existsSync(publicDirectory)) {
      fs.mkdirSync(publicDirectory, { recursive: true });
    }
    
    const sitemap = generateSitemap();
    fs.writeFileSync(path.join(publicDirectory, 'sitemap.xml'), sitemap, 'utf8');
    console.log('Sitemap has been generated successfully at public/sitemap.xml');
  } catch (error) {
    console.error('Error generating sitemap:', error);
  }
}

// Execute a geração do sitemap
writeSitemap(); 