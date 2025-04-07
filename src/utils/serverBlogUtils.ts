// Este arquivo é usado apenas no servidor
import fs from 'fs';
import path from 'path';
import type { BlogPost } from './blogUtils';

/**
 * Obtém o diretório dos posts baseado no ambiente
 */
function getPostsDirectory(): string {
  const isProduction = process.env.NODE_ENV === 'production';
  const postsDirectory = isProduction
    ? path.join(process.cwd(), '.vercel/output/static/contents/posts')
    : path.resolve(process.cwd(), 'src/contents/posts');
  
  console.log('Getting posts directory:', {
    environment: process.env.NODE_ENV,
    directory: postsDirectory,
    exists: fs.existsSync(postsDirectory),
    cwd: process.cwd(),
    files: fs.existsSync(postsDirectory) ? fs.readdirSync(postsDirectory) : []
  });
  
  return postsDirectory;
}

/**
 * Obtém todos os posts de blog
 * Função exclusiva para o servidor
 */
export function getAllPosts(): BlogPost[] {
  try {
    const currentPostsDirectory = getPostsDirectory();
    console.log('Getting all posts from directory:', currentPostsDirectory);
    
    if (!fs.existsSync(currentPostsDirectory)) {
      console.error(`Posts directory not found: ${currentPostsDirectory}`);
      return [];
    }
    
    const fileNames = fs.readdirSync(currentPostsDirectory);
    console.log('Found files:', fileNames);
    
    const allPosts = fileNames
      .filter(fileName => fileName.endsWith('.json'))
      .map(fileName => {
        // Remove ".json" from file name to get slug
        const slug = fileName.replace(/\.json$/, '');
        console.log('Processing file:', fileName, 'with slug:', slug);
        
        // Read the JSON file
        const fullPath = path.join(currentPostsDirectory, fileName);
        const fileContents = fs.readFileSync(fullPath, 'utf8');
        
        // Parse the JSON content
        const post = JSON.parse(fileContents) as BlogPost;
        return post;
      })
      .sort((a, b) => {
        // Sort by date, most recent first
        return new Date(b.datePublished).getTime() - new Date(a.datePublished).getTime();
      });
    
    console.log(`Processed ${allPosts.length} posts`);
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
    const currentPostsDirectory = getPostsDirectory();
    const fullPath = path.join(currentPostsDirectory, `${slug}.json`);
    
    console.log('Looking for post file:', {
      slug,
      directory: currentPostsDirectory,
      fullPath,
      exists: fs.existsSync(fullPath)
    });
    
    if (!fs.existsSync(fullPath)) {
      console.error(`Post file not found: ${fullPath}`);
      return null;
    }
    
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const post = JSON.parse(fileContents) as BlogPost;
    
    console.log('Found post:', {
      slug: post.slug,
      headline: post.headline
    });
    
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
  console.log('Getting paginated posts:', { page, postsPerPage });
  
  const allPosts = getAllPosts();
  const startIndex = (page - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const paginatedPosts = allPosts.slice(startIndex, endIndex);
  
  const result = {
    posts: paginatedPosts,
    totalPosts: allPosts.length,
    totalPages: Math.ceil(allPosts.length / postsPerPage)
  };
  
  console.log('Paginated posts result:', {
    totalPosts: result.totalPosts,
    totalPages: result.totalPages,
    currentPage: page,
    postsInPage: result.posts.length
  });
  
  return result;
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