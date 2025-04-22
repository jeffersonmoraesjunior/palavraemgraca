import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
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
      },
    },
    // Gerar source maps para produção
    sourcemap: true,
    // Otimizar o tamanho do CSS
    cssCodeSplit: true,
  },
  // Otimizações para o servidor de desenvolvimento
  server: {
    port: 5173,
    strictPort: false,
    open: true,
    cors: true,
    hmr: {
      overlay: true,
    },
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  // Suporte para o problema de módulos Node.js
  resolve: {
    alias: {
      // Estes módulos são problemáticos no browser
      fs: 'empty-module', // não usado mais, mas pode estar sendo importado em dependências
      path: 'path-browserify',
      stream: 'stream-browserify',
      util: 'util',
      'reading-time': './src/utils/mockReadingTime.js'
    }
  },
  // Permite a definição de variáveis globais
  define: {
    // Variáveis de ambiente
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
  },
});
