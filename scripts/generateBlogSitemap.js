import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import matter from 'gray-matter';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createBlogSitemap() {
  try {
    console.log('🔄 Gerando sitemap específico para o blog...');
    
    // Definição do diretório de posts
    const postsDir = path.join(process.cwd(), 'public', 'contents', 'markdown');
    
    // Verificar se o diretório existe
    try {
      await fs.access(postsDir);
    } catch (error) {
      throw new Error(`Diretório de posts não encontrado: ${postsDir}`);
    }
    
    // Ler todos os posts
    const files = await fs.readdir(postsDir);
    const markdownFiles = files.filter(file => file.endsWith('.md'));
    
    // Iniciar a construção do sitemap
    let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
    sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
    
    // URL base do site
    const baseUrl = 'https://palavraemgraca.com.br';
    
    // Adicionar entrada para a página principal do blog
    sitemap += '  <url>\n';
    sitemap += `    <loc>${baseUrl}/blog</loc>\n`;
    sitemap += '    <changefreq>weekly</changefreq>\n';
    sitemap += '    <priority>0.8</priority>\n';
    sitemap += '  </url>\n';
    
    // Processar cada arquivo markdown
    for (const file of markdownFiles) {
      // Ler o conteúdo do arquivo
      const filePath = path.join(postsDir, file);
      const fileContent = await fs.readFile(filePath, 'utf-8');
      
      // Extrair o frontmatter
      const { data } = matter(fileContent);
      
      // Obter o slug (nome do arquivo sem extensão)
      const slug = file.replace(/\.md$/, '');
      
      // Obter a data de modificação
      const dateModified = data.dateModified || data.datePublished || new Date().toISOString();
      
      // Adicionar URL para este post
      sitemap += '  <url>\n';
      sitemap += `    <loc>${baseUrl}/${slug}</loc>\n`;
      sitemap += `    <lastmod>${dateModified.split('T')[0]}</lastmod>\n`;
      sitemap += '    <changefreq>monthly</changefreq>\n';
      sitemap += '    <priority>0.9</priority>\n';
      sitemap += '  </url>\n';
    }
    
    // Fechar o sitemap
    sitemap += '</urlset>';
    
    // Caminho para salvar o blog-sitemap.xml
    const outputPath = path.join(process.cwd(), 'public', 'blog-sitemap.xml');
    
    // Salvar o arquivo
    await fs.writeFile(outputPath, sitemap, 'utf-8');
    
    console.log('✅ blog-sitemap.xml gerado com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao gerar o blog-sitemap.xml:', error);
  }
}

createBlogSitemap(); 