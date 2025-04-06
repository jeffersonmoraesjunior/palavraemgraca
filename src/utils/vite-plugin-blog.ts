import type { Plugin, ViteDevServer, PreviewServer } from 'vite';
import type { IncomingMessage, ServerResponse } from 'http';
import path from 'path';
import fs from 'fs';
import { BlogPost } from './blogUtils';
import * as serverUtils from './serverBlogUtils';

// Main Vite plugin function
export function blogPlugin(options?: { postsDir?: string }): Plugin {
  const postsDirectory = options?.postsDir || path.resolve(process.cwd(), 'contents/posts');
  
  // Função para configurar o servidor
  function setupServer(server: ViteDevServer | PreviewServer) {
    // Endpoint for getting paginated blog posts
    server.middlewares.use('/api/posts', (req: IncomingMessage, res: ServerResponse, next: () => void) => {
      try {
        // Verifica se é uma solicitação para a lista de posts (sem slug)
        if (req.url === '/' || req.url?.startsWith('/?')) {
          const url = new URL(req.url || '', 'http://localhost');
          const page = parseInt(url.searchParams.get('page') || '1', 10);
          const postsPerPage = parseInt(url.searchParams.get('limit') || '10', 10);
          
          const paginatedData = serverUtils.getPaginatedPosts(page, postsPerPage);
          
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify(paginatedData));
        } else {
          // Passa para o próximo middleware que pode ser o que processa posts específicos
          next();
        }
      } catch (error) {
        console.error('Error serving blog posts API:', error);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Internal server error' }));
      }
    });
    
    // Endpoint for getting a single post by slug
    server.middlewares.use('/api/posts', (req: IncomingMessage, res: ServerResponse, next: () => void) => {
      try {
        // Certifica-se de que req.url existe
        if (!req.url) {
          next();
          return;
        }
        
        // Extrai o slug da URL
        const match = req.url.match(/^\/([^\/\?]+)/);
        
        if (match) {
          const slug = match[1];
          console.log(`Buscando post com slug: ${slug}`);
          
          const post = serverUtils.getPostBySlug(slug);
          
          if (post) {
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify(post));
          } else {
            res.statusCode = 404;
            res.end(JSON.stringify({ error: 'Post not found', slug }));
          }
        } else {
          next();
        }
      } catch (error) {
        console.error('Error serving blog post API:', error);
        res.statusCode = 500;
        res.end(JSON.stringify({ error: 'Internal server error' }));
      }
    });
  }
  
  return {
    name: 'vite-plugin-blog',
    configureServer(server: ViteDevServer) {
      setupServer(server);
    },
    configurePreviewServer(server: PreviewServer) {
      setupServer(server);
    },
    generateBundle() {
      // Garantir que os arquivos JSON sejam copiados para o build
      const files = fs.readdirSync(path.resolve(process.cwd(), 'src/contents/posts'));
      files.forEach(file => {
        if (file.endsWith('.json')) {
          const content = fs.readFileSync(path.resolve(process.cwd(), 'src/contents/posts', file), 'utf-8');
          this.emitFile({
            type: 'asset',
            fileName: `contents/posts/${file}`,
            source: content
          });
        }
      });
    }
  };
} 