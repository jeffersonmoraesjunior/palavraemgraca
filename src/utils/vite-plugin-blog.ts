import type { Plugin, ViteDevServer, PreviewServer } from 'vite';
import type { IncomingMessage, ServerResponse } from 'http';
import path from 'path';
import fs from 'fs';
import { BlogPost } from './blogUtils';
import * as serverUtils from './serverBlogUtils';

// Main Vite plugin function
export function blogPlugin(options?: { postsDir?: string }): Plugin {
  const postsDirectory = options?.postsDir || path.resolve(process.cwd(), 'contents/posts');
  console.log('Blog plugin initialized with directory:', postsDirectory);
  
  // Função para configurar o servidor
  function setupServer(server: ViteDevServer | PreviewServer) {
    console.log('Setting up blog server middleware');
    
    // Handler para todas as requisições /api/posts
    server.middlewares.use('/api/posts', async (req: IncomingMessage, res: ServerResponse) => {
      try {
        // Certifica-se de que req.url existe
        const url = req.url || '';
        console.log('Handling request:', {
          url,
          method: req.method,
          headers: req.headers
        });
        
        // Rota para lista de posts paginados
        if (url === '/' || url.startsWith('/?')) {
          const urlObj = new URL(url || '', 'http://localhost');
          const page = parseInt(urlObj.searchParams.get('page') || '1', 10);
          const postsPerPage = parseInt(urlObj.searchParams.get('limit') || '10', 10);
          
          console.log('Getting paginated posts:', { page, postsPerPage });
          const paginatedData = serverUtils.getPaginatedPosts(page, postsPerPage);
          console.log('Serving paginated posts:', { 
            page, 
            postsPerPage, 
            totalPosts: paginatedData.totalPosts,
            postsReturned: paginatedData.posts.length
          });
          
          res.setHeader('Content-Type', 'application/json');
          return res.end(JSON.stringify(paginatedData));
        }
        
        // Rota para post específico
        const match = url.match(/^\/([^\/\?]+)/);
        if (match) {
          const slug = match[1];
          console.log(`Buscando post com slug: ${slug}`);
          
          const post = serverUtils.getPostBySlug(slug);
          
          if (post) {
            console.log('Post encontrado:', {
              slug: post.slug,
              headline: post.headline
            });
            res.setHeader('Content-Type', 'application/json');
            return res.end(JSON.stringify(post));
          } else {
            console.log('Post não encontrado:', { slug });
            res.statusCode = 404;
            return res.end(JSON.stringify({ error: 'Post not found', slug }));
          }
        }
        
        // Se nenhuma rota corresponder
        console.log('Rota não encontrada:', { url });
        res.statusCode = 404;
        res.end(JSON.stringify({ error: 'Route not found' }));
        
      } catch (error) {
        console.error('Error serving blog API:', error);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Internal server error' }));
      }
    });
  }
  
  return {
    name: 'vite-plugin-blog',
    configureServer(server: ViteDevServer) {
      console.log('Configuring development server');
      setupServer(server);
    },
    configurePreviewServer(server: PreviewServer) {
      console.log('Configuring preview server');
      setupServer(server);
    },
    generateBundle() {
      try {
        console.log('Starting bundle generation');
        // Garantir que os arquivos JSON sejam copiados para o build
        const sourceDir = path.resolve(process.cwd(), 'src/contents/posts');
        console.log('Source directory:', sourceDir);
        
        if (!fs.existsSync(sourceDir)) {
          console.error(`Source directory not found: ${sourceDir}`);
          return;
        }
        
        const files = fs.readdirSync(sourceDir);
        console.log(`Found ${files.length} files in ${sourceDir}:`, files);
        
        files.forEach(file => {
          if (file.endsWith('.json')) {
            const sourcePath = path.resolve(sourceDir, file);
            console.log('Reading file:', sourcePath);
            const content = fs.readFileSync(sourcePath, 'utf-8');
            console.log(`Copying file to build: ${file}`);
            this.emitFile({
              type: 'asset',
              fileName: `contents/posts/${file}`,
              source: content
            });
          }
        });
        
        console.log('Bundle generation completed');
      } catch (error) {
        console.error('Error in generateBundle:', error);
      }
    }
  };
} 