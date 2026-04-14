// ============================================
// TripLite Service Worker v33
// v33: note.html hitlayer改用top/left/right/bottom，fitCanvas补全尺寸计算
// v32: note.html 新增 #hitlayer绕过平台注入的透明覆盖节点
// ============================================

var CACHE_NAME = 'triplite-v33';
var OFFLINE_HTML = '<!DOCTYPE html><html lang="zh-CN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>离线 · TripLite</title><style>body{font-family:-apple-system,BlinkMacSystemFont,sans-serif;background:#f0f4f8;display:flex;flex-direction:column;align-items:center;justify-content:center;min-height:100vh;margin:0;padding:20px;text-align:center}h2{color:#1a3a5c;font-size:22px;margin-bottom:8px}.sub{color:#64748b;font-size:14px;margin-bottom:24px}button{background:#1a3a5c;color:#fff;border:none;padding:12px 28px;border-radius:10px;font-size:15px;cursor:pointer}</style></head><body><div style="font-size:48px;margin-bottom:16px">📡</div><h2>暂时无法访问</h2><p class="sub">请检查网络连接后重试</p><button onclick="location.reload()">重新加载</button></body></html>';

// 只缓存确定存在的带扩展名文件，避免Cloudflare 404导致install失败
var PRECACHE_URLS = [
  '/index.html',
  '/trip.html',
  '/map.html',
  '/checklist.html',
  '/stay.html',
  '/emergency.html',
  '/weather.html',
  '/budget.html',
  '/note.html',
  '/css/style.css',
  '/js/data.js',
  '/js/home.js',
  '/js/weather-service.js',
  '/js/app.js',
  '/manifest.json'
];

// ── 安装：逐个缓存，单个失败不阻断，保证SW能安装成功 ──
self.addEventListener('install', function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      var tasks = PRECACHE_URLS.map(function(url) {
        return fetch(url, { cache: 'no-cache' })
          .then(function(response) {
            if (response && response.ok) {
              return cache.put(url, response);
            }
          })
          .catch(function(err) {
            // 单个资源失败不影响SW整体安装
            console.warn('[SW v33] precache skip:', url, err.message);
          });
      });
      return Promise.all(tasks);
    }).then(function() {
      console.log('[SW v33] install done');
    }).catch(function(err) {
      console.warn('[SW v33] install error (non-fatal):', err);
    })
  );
  // 强制立即激活
  self.skipWaiting();
});

// ── 激活：删除所有旧版缓存 ──
self.addEventListener('activate', function(event) {
  event.waitUntil(
    caches.keys().then(function(keys) {
      return Promise.all(
        keys.filter(function(key) { return key !== CACHE_NAME; })
            .map(function(key) {
              console.log('[SW v33] delete old cache:', key);
              return caches.delete(key);
            })
      );
    }).then(function() {
      return self.clients.claim();
    })
  );
});

// ── 判断是否为外部请求（CDN / 字体 / 天气API等）──
function isExternal(url) {
  return url.origin !== self.location.origin;
}

// ── 判断是否为导航请求（用户点击链接/输入URL访问HTML页面）──
function isNavigationRequest(request) {
  return request.mode === 'navigate' ||
    (request.method === 'GET' && request.headers.get('accept') &&
     request.headers.get('accept').indexOf('text/html') !== -1);
}

// ── Fetch 拦截 ──
self.addEventListener('fetch', function(event) {
  var request = event.request;

  // 只处理 GET 请求
  if (request.method !== 'GET') return;

  var url;
  try {
    url = new URL(request.url);
  } catch (e) {
    return;
  }

  // ① 外部资源（CDN、字体、天气API）：完全不拦截，让浏览器直接处理
  //    这解决了旧SW拦截CDN请求返回503的问题
  if (isExternal(url)) {
    return;
  }

  // ② 本地导航请求（HTML页面）：网络优先，失败时返回离线页
  //    这是解决 ERR_FAILED 的核心修复点
  if (isNavigationRequest(request)) {
    event.respondWith(
      fetch(request).then(function(response) {
        // 网络成功：后台更新缓存
        if (response && response.ok && response.status === 200) {
          var clone = response.clone();
          caches.open(CACHE_NAME).then(function(c) {
            c.put(request, clone);
          });
        }
        return response;
      }).catch(function() {
        // 网络失败：尝试缓存
        return caches.match(request).then(function(cached) {
          if (cached) return cached;
          // 无缓存：返回离线兜底页
          return caches.match('/index.html').then(function(index) {
            return index || new Response(OFFLINE_HTML, {
              status: 200,
              headers: { 'Content-Type': 'text/html; charset=utf-8' }
            });
          });
        });
      })
    );
    return;
  }

  // ③ 本地静态资源（CSS/JS/图片等）：网络优先，断网时才用缓存
  //    确保每次部署后刷新一次即可获取最新文件
  event.respondWith(
    fetch(request).then(function(response) {
      if (response && response.ok && response.status === 200) {
        var clone = response.clone();
        caches.open(CACHE_NAME).then(function(c) { c.put(request, clone); });
      }
      return response;
    }).catch(function() {
      // 断网时降级到缓存
      return caches.match(request).then(function(cached) {
        if (cached) return cached;
        return new Response('', { status: 503, statusText: 'Offline' });
      });
    })
  );
});
