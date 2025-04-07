import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { blogPlugin } from './src/utils/vite-plugin-blog';
import path from 'path';
import fs from 'fs';

// Plugin para servir arquivos JSON
function jsonServerPlugin() {
  return {
    name: 'serve-json',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url?.startsWith('/api/posts')) {
          console.log('Handling API request:', req.url);
          
          const postsDir = process.env.NODE_ENV === 'production'
            ? path.resolve(process.cwd(), 'dist/contents/posts')
            : path.resolve(process.cwd(), 'src/contents/posts');
          
          console.log('Posts directory:', postsDir);
          console.log('Directory exists:', fs.existsSync(postsDir));
          
          // Rota para listar posts paginados
          const url = new URL(req.url, `http://${req.headers.host || 'localhost'}`);
          if (url.pathname === '/api/posts') {
            const page = Number(url.searchParams.get('page')) || 1;
            const limit = Number(url.searchParams.get('limit')) || 10;
            
            console.log('Getting paginated posts:', { page, limit });
            
            try {
              const files = fs.readdirSync(postsDir);
              console.log('Found files:', files);
              
              const posts = files
                .filter(file => file.endsWith('.json'))
                .map(file => {
                  console.log('Reading file:', file);
                  const content = fs.readFileSync(path.join(postsDir, file), 'utf-8');
                  return JSON.parse(content);
                })
                .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
              
              console.log('Total posts found:', posts.length);
              
              const start = (page - 1) * limit;
              const end = start + limit;
              const paginatedPosts = posts.slice(start, end);
              
              console.log('Returning posts:', {
                page,
                limit,
                total: posts.length,
                returned: paginatedPosts.length
              });
              
              res.setHeader('Content-Type', 'application/json');
              res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
              res.end(JSON.stringify({
                posts: paginatedPosts,
                total: posts.length,
                page,
                limit,
                totalPages: Math.ceil(posts.length / limit)
              }));
            } catch (error) {
              console.error('Error reading posts:', error);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: 'Internal Server Error' }));
            }
            return;
          }
          
          // Rota para post individual
          const match = url.pathname.match(/^\/api\/posts\/(.+)$/);
          if (match) {
            const slug = match[1];
            const filePath = path.join(postsDir, `${slug}.json`);
            
            console.log('Getting post by slug:', {
              slug,
              filePath,
              exists: fs.existsSync(filePath)
            });
            
            try {
              if (fs.existsSync(filePath)) {
                const content = fs.readFileSync(filePath, 'utf-8');
                const post = JSON.parse(content);
                
                console.log('Found post:', {
                  slug: post.slug,
                  headline: post.headline
                });
                
                res.setHeader('Content-Type', 'application/json');
                res.setHeader('Cache-Control', 'public, s-maxage=10, stale-while-revalidate=59');
                res.end(content);
              } else {
                console.log('Post not found:', slug);
                res.statusCode = 404;
                res.end(JSON.stringify({ error: 'Post not found' }));
              }
            } catch (error) {
              console.error('Error reading post:', error);
              res.statusCode = 500;
              res.end(JSON.stringify({ error: 'Internal Server Error' }));
            }
            return;
          }
        }
        next();
      });
    }
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    blogPlugin({
      postsDir: process.env.NODE_ENV === 'production' 
        ? path.resolve(process.cwd(), 'dist/contents/posts')
        : path.resolve(process.cwd(), 'src/contents/posts')
    }),
    jsonServerPlugin()
  ],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
  build: {
    // Minificar o código para produção
    minify: 'terser',
    // Otimizações para o Terser
    terserOptions: {
      compress: {
        drop_console: false, // Mantém os console.log para debug
        drop_debugger: true,
      },
    },
    // Dividir o código em chunks menores
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react', '@headlessui/react'],
        },
        // Garantir que arquivos JSON sejam copiados
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith('.json')) {
            return 'contents/posts/[name][extname]';
          }
          return 'assets/[name]-[hash][extname]';
        }
      },
    },
    // Gerar source maps para produção
    sourcemap: true,
    // Otimizar o tamanho do CSS
    cssCodeSplit: true,
    // Configurar o diretório de saída
    outDir: 'dist',
    // Limpar o diretório de saída antes do build
    emptyOutDir: true,
  },
  // Otimizações para o servidor de desenvolvimento e preview
  server: {
    // Abrir o navegador automaticamente
    open: true,
    // Configuração para resolver problemas de CORS
    cors: true,
    // Configuração para resolver problemas de HMR
    hmr: {
      overlay: true,
    },
    // Configuração para resolver problemas de porta
    port: 5173,
    strictPort: false,
  },
  preview: {
    // Configurações para o servidor de preview
    port: 5173,
    strictPort: false,
    cors: true,
  }
});
