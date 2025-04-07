// Este arquivo é usado apenas no servidor
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import type { BlogPost } from './blogUtils';

/**
 * Obtém o diretório dos posts baseado no ambiente
 */
export function getPostsDirectory(): string {
  // In production (Vercel), the posts should be in /var/task/public/contents/posts
  // In development, they should be in public/contents/posts
  const isProd = process.env.NODE_ENV === 'production';
  const baseDir = isProd ? '/var/task' : process.cwd();
  const postsDir = path.join(baseDir, 'public/contents/posts');
  
  console.log('Posts directory configuration:', {
    environment: process.env.NODE_ENV,
    baseDir,
    postsDir,
    exists: fs.existsSync(postsDir),
    contents: fs.existsSync(postsDir) ? fs.readdirSync(postsDir) : []
  });

  return postsDir;
}

/**
 * Obtém todos os posts de blog
 * Função exclusiva para o servidor
 */
export function getAllPosts(): BlogPost[] {
  const postsDirectory = getPostsDirectory();
  
  if (!fs.existsSync(postsDirectory)) {
    console.error('Posts directory does not exist:', postsDirectory);
    return [];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  console.log('Found files in posts directory:', fileNames);

  const allPosts = fileNames
    .filter(fileName => fileName.endsWith('.json'))
    .map(fileName => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      
      try {
        const { data } = matter(fileContents);
        return {
          slug: fileName.replace(/\.json$/, ''),
          ...data,
        } as BlogPost;
      } catch (error) {
        console.error(`Error parsing ${fileName}:`, error);
        return null;
      }
    })
    .filter((post): post is BlogPost => post !== null)
    .sort((post1, post2) => (post1.datePublished > post2.datePublished ? -1 : 1));

  return allPosts;
}

/**
 * Obtém um post específico pelo slug
 * Função exclusiva para o servidor
 */
export function getPostBySlug(slug: string): BlogPost | null {
  const postsDirectory = getPostsDirectory();
  const fullPath = path.join(postsDirectory, `${slug}.json`);
  
  if (!fs.existsSync(fullPath)) {
    console.error('Post file does not exist:', fullPath);
    return null;
  }

  try {
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data } = matter(fileContents);
    return {
      slug,
      ...data,
    } as BlogPost;
  } catch (error) {
    console.error(`Error reading post ${slug}:`, error);
    return null;
  }
}

/**
 * Obtém posts paginados
 * Função exclusiva para o servidor
 */
export function getPaginatedPosts(page: number = 1, limit: number = 10) {
  const allPosts = getAllPosts();
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const posts = allPosts.slice(startIndex, endIndex);
  
  return {
    posts,
    totalPosts: allPosts.length,
    totalPages: Math.ceil(allPosts.length / limit)
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