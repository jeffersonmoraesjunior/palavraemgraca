// Nome do cache
const CACHE_NAME = 'caixinha-promessas-v1';

// Arquivos para armazenar em cache
const urlsToCache = [
  '/',
  '/index.html',
  '/manifest.json',
  '/bible.svg',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png'
];

// Instalação do service worker
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        // Cache aberto
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptação de requisições
self.addEventListener('fetch', event => {
  // Ignorar requisições de extensões do Chrome
  if (event.request.url.startsWith('chrome-extension://')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Cache hit - retorna a resposta do cache
        if (response) {
          return response;
        }

        // Clona a requisição
        const fetchRequest = event.request.clone();

        return fetch(fetchRequest).then(
          response => {
            // Verifica se recebemos uma resposta válida
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clona a resposta
            const responseToCache = response.clone();

            // Tenta armazenar em cache
            try {
              caches.open(CACHE_NAME)
                .then(cache => {
                  // Verifica se a URL é válida para cache
                  if (!event.request.url.startsWith('chrome-extension://')) {
                    cache.put(event.request, responseToCache);
                  }
                });
            } catch (error) {
              console.warn('Erro ao armazenar em cache:', error);
            }

            return response;
          }
        );
      })
  );
});

// Atualização do service worker
self.addEventListener('activate', event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheWhitelist.indexOf(cacheName) === -1) {
            // Remove caches antigos
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
}); 