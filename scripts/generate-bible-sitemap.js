import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Obter o diretório atual do módulo ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Configurações
const SITE_URL = 'https://amigosdedeus.com.br';
const BIBLE_DIR = path.join(__dirname, '../public/bible');
const OUTPUT_FILE = path.join(__dirname, '../public/bible-sitemap.xml');

// Função principal
async function generateBibleSitemap() {
  console.log('Gerando sitemap da Bíblia...');
  
  try {
    // Ler os arquivos da Bíblia disponíveis
    const bibleFiles = fs.readdirSync(BIBLE_DIR)
      .filter(file => file.endsWith('.json'));
    
    if (bibleFiles.length === 0) {
      console.error('Nenhum arquivo de Bíblia encontrado!');
      return;
    }
    
    // Iniciar o XML do sitemap
    let sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
`;
    
    // Adicionar a página de índice da Bíblia
    sitemap += `  <url>
    <loc>${SITE_URL}/biblia/indice</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>
`;
    
    // Para cada versão da Bíblia
    for (const bibleFile of bibleFiles) {
      const version = bibleFile.replace('.json', '').toLowerCase();
      console.log(`Processando versão: ${version}`);
      
      // Adicionar a página de índice da versão
      sitemap += `  <url>
    <loc>${SITE_URL}/biblia/indice/${version}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
      
      // Ler o arquivo JSON da Bíblia
      const bibleData = JSON.parse(fs.readFileSync(path.join(BIBLE_DIR, bibleFile), 'utf8'));
      
      // Adicionar a página principal da versão
      sitemap += `  <url>
    <loc>${SITE_URL}/biblia/${version}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>
`;
      
      // Para cada livro
      for (const book of bibleData) {
        const bookAbbrev = book.abbrev.toLowerCase();
        
        // Adicionar a página principal do livro
        sitemap += `  <url>
    <loc>${SITE_URL}/biblia/${version}/${bookAbbrev}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
`;
        
        // Para cada capítulo
        for (let chapterIndex = 0; chapterIndex < book.chapters.length; chapterIndex++) {
          const chapterNumber = chapterIndex + 1;
          
          // Adicionar a página do capítulo
          sitemap += `  <url>
    <loc>${SITE_URL}/biblia/${version}/${bookAbbrev}/${chapterNumber}</loc>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
`;
          
          // Não adicionamos URLs para cada versículo para evitar sitemap muito grande
          // Apenas para versículos importantes ou populares
          if (
            (bookAbbrev === 'sl' && chapterNumber === 23) || // Salmo 23
            (bookAbbrev === 'jo' && chapterNumber === 3) // João 3:16
          ) {
            sitemap += `  <url>
    <loc>${SITE_URL}/biblia/${version}/${bookAbbrev}/${chapterNumber}/16</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
`;
          }
        }
      }
    }
    
    // Fechar o XML
    sitemap += `</urlset>`;
    
    // Escrever o arquivo
    fs.writeFileSync(OUTPUT_FILE, sitemap);
    console.log(`Sitemap gerado com sucesso: ${OUTPUT_FILE}`);
    
  } catch (error) {
    console.error('Erro ao gerar sitemap:', error);
  }
}

// Executar a função
generateBibleSitemap(); 