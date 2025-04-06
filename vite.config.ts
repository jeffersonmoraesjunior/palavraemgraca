import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { blogPlugin } from './src/utils/vite-plugin-blog';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    blogPlugin({
      postsDir: process.env.NODE_ENV === 'production' 
        ? path.resolve(process.cwd(), 'dist/contents/posts')
        : path.resolve(process.cwd(), 'src/contents/posts')
    })
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
        drop_console: true,
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
  },
  // Otimizações para o servidor de desenvolvimento
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
});
