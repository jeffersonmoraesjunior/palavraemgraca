// Service Worker unificado para o Palavra em Graça
const CACHE_NAME = 'palavra-em-graca-v2';
const IMAGE_CACHE_NAME = 'palavra-em-graca-images-v1';

// Arquivos essenciais para armazenar em cache
const CORE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/bible.svg',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/offline.html' // Página de fallback para quando estiver offline
];

// Recursos adicionais que podem ser cacheados, mas não são críticos
const ADDITIONAL_ASSETS = [
  '/logo.svg',
  '/css/main.css',
  '/js/main.js'
];

// Assets para pré-cache
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/bible.svg',
  '/images/fallback.webp'
];

// Instalação do service worker
self.addEventListener('install', event => {
  console.log('[Service Worker] Instalando...');
  
  // Pré-cache dos recursos essenciais
  event.waitUntil(
    Promise.all([
      // Cache principal para arquivos críticos
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] Cacheando recursos essenciais');
        return cache.addAll(CORE_ASSETS);
        }),
      // Cache separado para imagens
      caches.open(IMAGE_CACHE_NAME)
    ])
      .then(() => {
        // Ativa o service worker imediatamente, sem esperar pelo refresh
        return self.skipWaiting();
      })
  );
});

// Ativação do service worker
self.addEventListener('activate', event => {
  console.log('[Service Worker] Ativando...');
  
  // Limpa caches antigos
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => {
            return (
              cacheName !== CACHE_NAME && 
              cacheName !== IMAGE_CACHE_NAME
            );
          })
          .map((cacheName) => {
            console.log('[Service Worker] Removendo cache antigo:', cacheName);
            return caches.delete(cacheName);
        })
      );
    })
    .then(() => {
      // Assume o controle de todas as abas abertas
      return self.clients.claim();
    })
  );
});

// Estratégia para imagens: Cache First com fallback para rede
const handleImageRequest = async (request) => {
  // Verificar no cache de imagens primeiro
  const cachedResponse = await caches.match(request, { cacheName: IMAGE_CACHE_NAME });
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Se não estiver em cache, buscar da rede
  try {
    const networkResponse = await fetch(request);
    
    // Clonar a resposta para armazenar no cache e retornar
    const responseToCache = networkResponse.clone();
    
    // Verificar se a resposta é válida antes de armazenar
    if (responseToCache.ok) {
      const cache = await caches.open(IMAGE_CACHE_NAME);
      cache.put(request, responseToCache);
    }
    
    return networkResponse;
  } catch (error) {
    // Se falhar, tentar retornar uma imagem padrão
    return caches.match('/images/fallback.webp');
  }
};

// Estratégia de cache para diferentes tipos de recursos
self.addEventListener('fetch', event => {
  // Ignora requisições para extensões do Chrome ou outras origens
  if (
    event.request.url.startsWith('chrome-extension://') || 
    !event.request.url.startsWith(self.location.origin)
  ) {
    return;
  }

  // Estratégia para requisições de navegação (HTML)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .catch(() => {
          // Se falhar, tenta retornar a página do cache
          return caches.match(event.request)
            .then(cachedResponse => {
              // Se não estiver no cache, retorna a página offline
              return cachedResponse || caches.match('/offline.html');
            });
        })
    );
    return;
  }

  // Estratégia para recursos estáticos (imagens, CSS, JS)
  if (
    event.request.destination === 'style' ||
    event.request.destination === 'script' ||
    event.request.destination === 'image'
  ) {
    // Cache-first para recursos estáticos
    event.respondWith(
      caches.match(event.request)
        .then(cachedResponse => {
          // Retorna do cache se existir
          if (cachedResponse) {
            // Atualiza o cache em segundo plano (stale-while-revalidate)
            fetch(event.request)
              .then(response => {
                if (response.ok) {
                  caches.open(CACHE_NAME)
                    .then(cache => cache.put(event.request, response));
                }
              })
              .catch(() => console.log('[Service Worker] Falha ao atualizar recurso em segundo plano'));
            
            return cachedResponse;
          }

          // Se não estiver no cache, busca na rede e armazena
          return fetch(event.request)
            .then(response => {
              if (!response || !response.ok) {
                return response;
              }

              // Clona a resposta para armazenar no cache
              const responseToCache = response.clone();
              caches.open(CACHE_NAME)
                .then(cache => {
                  cache.put(event.request, responseToCache);
                });

              return response;
            });
        })
    );
    return;
  }

  // Estratégia para imagens - Cache First para imagens
  if (/\.(webp|jpg|jpeg|png|gif|svg)$/.test(new URL(event.request.url).pathname) || 
      event.request.destination === 'image') {
    event.respondWith(handleImageRequest(event.request));
    return;
  }

  // Estratégia para API - Network First com timeout
  if (new URL(event.request.url).pathname.includes('/api/')) {
  event.respondWith(
    fetch(event.request)
      .then(response => {
          // Não armazenar em cache respostas com erro
          if (!response.ok) {
            return response;
          }
          
          // Clone da resposta para armazenar no cache
          const clonedResponse = response.clone();
          
          caches.open(CACHE_NAME).then(cache => {
            // Armazena apenas responses GET
            if (event.request.method === 'GET') {
              cache.put(event.request, clonedResponse);
            }
            });
          
        return response;
      })
      .catch(() => {
          // Se a rede falhar, tenta buscar do cache
        return caches.match(event.request);
        })
    );
    return;
  }

  // Estratégia padrão - Stale While Revalidate
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      // Usar o cache se disponível
      const fetchPromise = fetch(event.request)
        .then((networkResponse) => {
          // Atualizar o cache com a nova resposta
          if (networkResponse.ok && event.request.method === 'GET') {
            caches.open(CACHE_NAME).then((cache) => {
              cache.put(event.request, networkResponse.clone());
            });
          }
          return networkResponse;
        })
        .catch(() => {
          // Se a rede falhar e não tivermos cache, retornar página offline
          if (event.request.mode === 'navigate') {
            return caches.match('/offline.html');
          }
          return null;
        });
      
      // Retornar cache imediatamente enquanto atualiza em segundo plano
      return cachedResponse || fetchPromise;
      })
  );
});

// Sincronização em segundo plano (quando o usuário volta a ficar online)
self.addEventListener('sync', event => {
  if (event.tag === 'sync-data') {
    console.log('[Service Worker] Sincronizando dados em segundo plano');
    // Implementar lógica de sincronização aqui
  }
});

// Notificações push
self.addEventListener('push', event => {
  if (!event.data) return;

  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/icons/icon-192x192.png',
    badge: '/icons/badge.png',
    data: {
      url: data.url || '/'
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Ação ao clicar na notificação
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.notification.data && event.notification.data.url) {
    event.waitUntil(
      clients.openWindow(event.notification.data.url)
    );
  }
}); 