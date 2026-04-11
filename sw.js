// ============================================
// TripLite Service Worker
// 离线缓存策略：Cache First for static assets
// ============================================

const CACHE_NAME = 'triplite-v9';
const OFFLINE_PAGE = '/index.html';

const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/trip',
  '/trip.html',
  '/map',
  '/map.html',
  '/checklist',
  '/checklist.html',
  '/stay',
  '/stay.html',
  '/emergency',
  '/emergency.html',
  '/weather',
  '/weather.html',
  '/css/style.css',
  '/js/data.js',
  '/js/home.js',
  '/js/weather-service.js',
  '/js/app.js',
  '/manifest.json'
];

// 安装 SW：预缓存核心文件
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('[SW] Pre-caching assets');
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

// 激活：清理旧缓存
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// 拦截请求：Cache First + Network Fallback
self.addEventListener('fetch', event => {
  // 只处理GET请求
  if (event.request.method !== 'GET') return;
  
  const url = new URL(event.request.url);
  
  // 外部资源（CDN等）：Network First
  if (!url.origin.includes(self.location.origin)) {
    event.respondWith(
      fetch(event.request).catch(() => {
        // CDN失败时什么都不做，让浏览器处理
        return new Response('', { status: 503 });
      })
    );
    return;
  }
  
  // 本地资源：Cache First
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      if (cachedResponse) {
        // 后台更新缓存
        fetch(event.request).then(networkResponse => {
          if (networkResponse && networkResponse.ok) {
            caches.open(CACHE_NAME).then(cache => {
              cache.put(event.request, networkResponse.clone());
            });
          }
        }).catch(() => {});
        return cachedResponse;
      }
      
      // 缓存中没有，走网络
      return fetch(event.request).then(networkResponse => {
        if (networkResponse && networkResponse.ok) {
          const responseToCache = networkResponse.clone();
          caches.open(CACHE_NAME).then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      }).catch(() => {
        // 离线且无缓存
        if (event.request.mode === 'navigate') {
          return caches.match(OFFLINE_PAGE);
        }
        return new Response('', { status: 503 });
      });
    })
  );
});
