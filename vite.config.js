import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkGfm from 'remark-gfm';
import html from 'remark-html';

// Função simples para calcular o tempo de leitura
function calculateReadingTime(text) {
  const wordsPerMinute = 200;
  const words = text.trim().split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min de leitura`;
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'markdown-api',
      configureServer(server) {
        // Configurar endpoints da API
        server.middlewares.use((req, res, next) => {
          // Diretório dos posts em Markdown
          const postsDirectory = path.join(process.cwd(), 'public/contents/markdown');
          
          // Endpoint para listar todos os arquivos de posts
          if (req.url === '/api/posts-list') {
            try {
              const fileNames = fs.readdirSync(postsDirectory);
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify(fileNames));
            } catch (error) {
              console.error('Erro ao listar posts:', error);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ error: 'Erro ao listar posts' }));
            }
          }
          
          // Endpoint para obter um post específico pelo slug
          const slugMatch = req.url.match(/^\/api\/posts\/(.+)$/);
          if (slugMatch) {
            const slug = slugMatch[1];
            const fullPath = path.join(postsDirectory, `${slug}.md`);
            
            try {
              if (!fs.existsSync(fullPath)) {
                res.statusCode = 404;
                res.setHeader('Content-Type', 'application/json');
                return res.end(JSON.stringify({ error: 'Post não encontrado' }));
              }
              
              const fileContents = fs.readFileSync(fullPath, 'utf8');
              const { data, content } = matter(fileContents);
              
              // Processar o markdown para HTML de forma síncrona para evitar problemas
              const processor = unified()
                .use(remarkParse)
                .use(remarkGfm)
                .use(html, { sanitize: false });
              
              const file = processor.processSync(content);
              const htmlContent = String(file);
              
              // Calcular o tempo de leitura
              const readingTimeText = calculateReadingTime(content);
              
              // Criar um resumo de aproximadamente 160 caracteres
              const plainText = content
                .replace(/\n/g, ' ')
                .replace(/\r/g, '')
                .replace(/[#*_[\]]/g, '')
                .trim();
              
              const excerpt = plainText.substring(0, 160) + '...';
              
              const post = {
                slug,
                content: htmlContent,
                readingTime: readingTimeText,
                excerpt,
                ...data
              };
              
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify(post));
            } catch (error) {
              console.error(`Erro ao obter post ${slug}:`, error);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              return res.end(JSON.stringify({ error: `Erro ao obter post ${slug}` }));
            }
          }
          
          // Passa para o próximo middleware se não for uma rota da API
          next();
        });
      },
    },
  ],
  server: {
    port: 5173,
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true
      }
    }
  }
}); 