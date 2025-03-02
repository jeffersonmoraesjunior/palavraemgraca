/// <reference types="vite/client" />
import { StrictMode } from 'react';
import type { JSX } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App.tsx';
import './index.css';

// Adiciona tipos para as variáveis globais
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}

// Função para inicializar o app
function initApp(): void {
  try {
    // Primeiro tenta encontrar o elemento root padrão
    let rootElement = document.getElementById('root');
    
    // Se não encontrar, cria um novo elemento
    if (!rootElement) {
      rootElement = document.createElement('div');
      rootElement.id = 'root';
      document.body.appendChild(rootElement);
    }
    
    // Cria a raiz do React e renderiza o app
    const root = createRoot(rootElement);
    root.render(
      <StrictMode>
        <BrowserRouter>
          <HelmetProvider>
            <App />
          </HelmetProvider>
        </BrowserRouter>
      </StrictMode>
    );

    // Carrega analytics e web vitals de forma assíncrona
    if (import.meta.env.PROD) {
      import('./utils/scriptLoader').then(({ loadGoogleAnalytics }) => {
        const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
        if (measurementId) {
          loadGoogleAnalytics(measurementId);
        }
      });

      // Carrega web vitals de forma assíncrona
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        const sendToGoogleAnalytics = ({ name, delta, id }: { name: string, delta: number, id: string }) => {
          window.gtag?.('event', name, {
            event_category: 'Web Vitals',
            event_label: id,
            value: Math.round(delta),
            non_interaction: true,
          });
        };
        
        getCLS(sendToGoogleAnalytics);
        getFID(sendToGoogleAnalytics);
        getFCP(sendToGoogleAnalytics);
        getLCP(sendToGoogleAnalytics);
        getTTFB(sendToGoogleAnalytics);
      }).catch(err => {
        console.warn('Erro ao carregar web-vitals:', err);
      });
    }
  } catch (error) {
    console.error('Erro ao inicializar o aplicativo:', error);
    // Renderiza uma versão simplificada em caso de erro
    const fallbackElement = document.createElement('div');
    fallbackElement.innerHTML = `
      <div style="text-align: center; padding: 20px;">
        <h1>Caixinha de Promessas</h1>
        <p>Desculpe, ocorreu um erro ao carregar o aplicativo.</p>
        <p>Por favor, recarregue a página ou tente novamente mais tarde.</p>
      </div>
    `;
    document.body.appendChild(fallbackElement);
  }
}

// Inicializa o app quando o DOM estiver pronto
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}