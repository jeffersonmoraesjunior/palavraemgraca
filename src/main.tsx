import { StrictMode, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import SimpleApp from './SimpleApp.tsx';
import './index.css';
import { loadGoogleAnalytics } from './utils/scriptLoader';

// Adiciona tipos para as variáveis globais
declare global {
  interface Window {
    wp?: any;
    gtag?: (...args: any[]) => void;
  }
}

// Componente wrapper para inicializar scripts e otimizações
const AppWithAnalytics = () => {
  useEffect(() => {
    // Carrega o Google Analytics se estiver em produção
    if (import.meta.env.PROD) {
      const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
      if (measurementId) {
        loadGoogleAnalytics(measurementId);
      }
    }
    
    // Reporta métricas de Web Vitals
    if (import.meta.env.PROD) {
      import('web-vitals').then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        // Função para enviar métricas para o Google Analytics
        const sendToGoogleAnalytics = ({ name, delta, id }: { name: string, delta: number, id: string }) => {
          // Envia evento para o Google Analytics
          window.gtag?.('event', name, {
            event_category: 'Web Vitals',
            event_label: id,
            value: Math.round(delta),
            non_interaction: true,
          });
        };
        
        // Monitora as métricas de Web Vitals
        getCLS(sendToGoogleAnalytics);
        getFID(sendToGoogleAnalytics);
        getFCP(sendToGoogleAnalytics);
        getLCP(sendToGoogleAnalytics);
        getTTFB(sendToGoogleAnalytics);
      });
    }
  }, []);

  // Usando o App component principal
  return <App />;
};

// Função para inicializar o app
function initPromiseBox() {
  const rootElement = document.getElementById('promise-box-root');
  if (rootElement) {
    createRoot(rootElement).render(
      <StrictMode>
        <AppWithAnalytics />
      </StrictMode>
    );
  }
}

// Verifica se estamos em um ambiente WordPress
if (window.wp) {
  // Se estivermos no WordPress, inicializa quando o DOM estiver pronto
  document.addEventListener('DOMContentLoaded', initPromiseBox);
} else {
  // Se não, assume que estamos em desenvolvimento
  const rootElement = document.getElementById('root');
  if (rootElement) {
    createRoot(rootElement).render(
      <StrictMode>
        <AppWithAnalytics />
      </StrictMode>
    );
  } else {
    console.error('Elemento root não encontrado no DOM!');
  }
}