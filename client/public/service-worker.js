// service-worker.js
const CACHE_NAME = 'app-cache-v1';

// Only cache essential files that definitely exist
const urlsToCache = ['/', '/index.html'];

// 🧩 Disable SW entirely in development (localhost or 5173)
if (
  self.location.hostname === 'localhost' ||
  self.location.port === '5173'
) {
  console.log('⚙️ Service Worker disabled in development (localhost:5173)');
  self.addEventListener('install', (event) => self.skipWaiting());
  self.addEventListener('activate', (event) => self.clients.claim());
  // Stop here — don’t register fetch handlers or caching
  return;
}

// ✅ Install
self.addEventListener('install', (event) => {
  console.log('Service Worker installing');
  self.skipWaiting();

  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        return Promise.allSettled(
          urlsToCache.map((url) =>
            cache.add(url).catch((error) => {
              console.warn(`Failed to cache: ${url}`, error);
              return null;
            })
          )
        );
      })
      .then((results) => {
        const failed = results.filter((r) => r.status === 'rejected');
        if (failed.length > 0) {
          console.warn(`${failed.length} files failed to cache`);
        } else {
          console.log('All files cached successfully');
        }
      })
      .catch((error) => {
        console.error('Cache installation error:', error);
      })
  );
});

// ✅ Fetch (Cache-first, then network fallback)
self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  if (event.request.url.startsWith('chrome-extension://')) return;
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request).then((response) => {
      if (response) return response;

      return fetch(event.request)
        .then((response) => {
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }

          const responseToCache = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            if (event.request.url.startsWith(self.location.origin)) {
              cache.put(event.request, responseToCache).catch((error) => {
                console.warn('Failed to cache response:', error);
              });
            }
          });

          return response;
        })
        .catch(() => {
          return new Response('You are offline', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
              'Content-Type': 'text/plain',
            }),
          });
        });
    })
  );
});

// ✅ Activate
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating');
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then((cacheNames) =>
        Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        )
      ),
    ])
  );
});
