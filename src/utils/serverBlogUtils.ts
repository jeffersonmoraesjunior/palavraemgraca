// Este arquivo é usado apenas no servidor
import fs from 'fs';
import path from 'path';
import { BlogPost } from './blogUtils';

const postsDirectory = path.join(process.cwd(), 'src/contents/posts');

/**
 * Obtém todos os posts de blog
 * Função exclusiva para o servidor
 */
export function getAllPosts(): BlogPost[] {
  try {
    if (!fs.existsSync(postsDirectory)) {
      return [];
    }
    
    const fileNames = fs.readdirSync(postsDirectory);
    const allPosts = fileNames
      .filter(fileName => fileName.endsWith('.json'))
      .map(fileName => {
        // Remove ".json" from file name to get slug
        const slug = fileName.replace(/\.json$/, '');
        
        // Read the JSON file
        const fullPath = path.join(postsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        
        // Parse the JSON content
        const post = JSON.parse(fileContents) as BlogPost;
        
        return post;
      })
      .sort((a, b) => {
        // Sort by date, most recent first
        return new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime();
      });
    
    return allPosts;
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return [];
  }
}

/**
 * Obtém um post específico pelo slug
 * Função exclusiva para o servidor
 */
export function getPostBySlug(slug: string): BlogPost | null {
  try {
    const fullPath = path.join(postsDirectory, `${slug}.json`);
    
    if (!fs.existsSync(fullPath)) {
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const post = JSON.parse(fileContents) as BlogPost;
    
    return post;
  } catch (error) {
    console.error(`Error fetching post with slug "${slug}":`, error);
    return null;
  }
}

/**
 * Obtém posts paginados
 * Função exclusiva para o servidor
 */
export function getPaginatedPosts(page = 1, postsPerPage = 10): {
  posts: BlogPost[];
  totalPosts: number;
  totalPages: number;
} {
  const allPosts = getAllPosts();
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const paginatedPosts = allPosts.slice(startIndex, endIndex);
  
  return {
    posts: paginatedPosts,
    totalPosts: allPosts.length,
    totalPages: Math.ceil(allPosts.length / postsPerPage)
  };
}

/**
 * Gera um sitemap XML
 * Função exclusiva para o servidor
 */
export function generateSitemap(): string {
  const baseUrl = 'https://palavraemgraca.com.br';
  const allPosts = getAllPosts();
  
  let sitemap = '<?xml version="1.0" encoding="UTF-8"?>\n';
  sitemap += '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';
  
  // Add the main URLs
  const mainUrls = [
    '', 
    '/sobre', 
    '/privacidade', 
    '/contato', 
    '/termos', 
    '/sitemap',
    '/perguntas',
    '/biblia',
    '/biblia/indice',
    '/artigos'
  ];
  
  mainUrls.forEach(url => {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${baseUrl}${url}</loc>\n`;
    sitemap += '    <changefreq>weekly</changefreq>\n';
    sitemap += '    <priority>0.8</priority>\n';
    sitemap += '  </url>\n';
  });
  
  // Add blog posts
  allPosts.forEach(post => {
    sitemap += '  <url>\n';
    sitemap += `    <loc>${baseUrl}/${post.slug}</loc>\n`;
    if (post.dateModified) {
      sitemap += `    <lastmod>${post.dateModified}</lastmod>\n`;
    }
    sitemap += '    <changefreq>monthly</changefreq>\n';
    sitemap += '    <priority>0.7</priority>\n';
    sitemap += '  </url>\n';
  });
  
  sitemap += '</urlset>';
  
  return sitemap;
}

/**
 * Atualiza o arquivo de sitemap
 * Função exclusiva para o servidor
 */
export function updateSitemap(): void {
  try {
    const sitemap = generateSitemap();
    fs.writeFileSync(path.join(process.cwd(), 'public/sitemap.xml'), sitemap, 'utf8');
    console.log('Sitemap has been updated successfully.');
  } catch (error) {
    console.error('Error updating sitemap:', error);
  }
} 