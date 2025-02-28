/**
 * Utilitários para carregamento otimizado de scripts externos
 * Ajuda a melhorar o desempenho do site carregando scripts de forma assíncrona
 */

/**
 * Carrega um script externo de forma assíncrona
 * @param url URL do script a ser carregado
 * @param id ID opcional para o elemento script
 * @param callback Função de callback a ser executada após o carregamento
 * @returns Promise que resolve quando o script é carregado
 */
export const loadScript = (
  url: string,
  id?: string,
  callback?: () => void
): Promise<void> => {
  return new Promise((resolve, reject) => {
    // Verifica se o script já existe
    if (id && document.getElementById(id)) {
      if (callback) callback();
      resolve();
      return;
    }

    const script = document.createElement('script');
    script.src = url;
    script.async = true;
    if (id) script.id = id;

    script.onload = () => {
      if (callback) callback();
      resolve();
    };

    script.onerror = (error) => {
      reject(new Error(`Falha ao carregar script: ${url}`));
      console.error('Erro ao carregar script:', error);
    };

    document.head.appendChild(script);
  });
};

/**
 * Carrega o Google Analytics
 * @param measurementId ID de medição do Google Analytics
 */
export const loadGoogleAnalytics = (measurementId: string): void => {
  // Carrega o script do Google Analytics
  loadScript(
    `https://www.googletagmanager.com/gtag/js?id=${measurementId}`,
    'google-analytics'
  ).then(() => {
    // Inicializa o Google Analytics
    window.dataLayer = window.dataLayer || [];
    function gtag(...args: any[]) {
      window.dataLayer.push(args);
    }
    gtag('js', new Date());
    gtag('config', measurementId);
  });
};

/**
 * Carrega o Facebook Pixel
 * @param pixelId ID do Facebook Pixel
 */
export const loadFacebookPixel = (pixelId: string): void => {
  // Inicializa o Facebook Pixel
  window.fbq = window.fbq || function(...args: any[]) {
    window._fbq = window._fbq || [];
    window._fbq.push(args);
  };

  // Carrega o script do Facebook Pixel
  loadScript(
    'https://connect.facebook.net/en_US/fbevents.js',
    'facebook-pixel'
  ).then(() => {
    window.fbq('init', pixelId);
    window.fbq('track', 'PageView');
  });
};

// Adiciona tipos para as variáveis globais
declare global {
  interface Window {
    dataLayer: any[];
    fbq: (...args: any[]) => void;
    _fbq: any[];
  }
}

export default {
  loadScript,
  loadGoogleAnalytics,
  loadFacebookPixel,
}; 