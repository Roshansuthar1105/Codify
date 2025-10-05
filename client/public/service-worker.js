// service-worker.js
const CACHE_NAME = 'app-cache-v1';

// Only cache essential files that definitely exist
const urlsToCache = [
  '/',
  '/index.html',
  // Remove specific file paths that might not exist
  // Let the dynamic caching handle other assets
];

self.addEventListener('install', (event) => {
  console.log('Service Worker installing');
  
  // Skip waiting - activate immediately
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Opened cache');
        
        // Use a more robust caching approach
        return Promise.allSettled(
          urlsToCache.map(url => {
            return cache.add(url).catch(error => {
              console.warn(`Failed to cache: ${url}`, error);
              // Don't fail the entire installation if one file fails
              return null;
            });
          })
        );
      })
      .then(results => {
        const failed = results.filter(r => r.status === 'rejected');
        if (failed.length > 0) {
          console.warn(`${failed.length} files failed to cache`);
        } else {
          console.log('All files cached successfully');
        }
      })
      .catch(error => {
        console.log('Cache installation error:', error);
        // Don't fail the installation - continue anyway
      })
  );
});

self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip chrome-extension requests
  if (event.request.url.startsWith('chrome-extension://')) {
    return;
  }

  // Skip non-HTTP/HTTPS requests
  if (!event.request.url.startsWith('http')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Return cached version if found
        if (response) {
          return response;
        }

        // Otherwise fetch from network
        return fetch(event.request)
          .then((response) => {
            // Check if valid response
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response
            const responseToCache = response.clone();

            // Cache the successful response
            caches.open(CACHE_NAME)
              .then((cache) => {
                // Only cache same-origin requests
                if (event.request.url.startsWith(self.location.origin)) {
                  cache.put(event.request, responseToCache)
                    .catch(error => {
                      console.warn('Failed to cache response:', error);
                    });
                }
              });

            return response;
          })
          .catch(() => {
            // Return a fallback for failed requests
            // You could return an offline page here
            return new Response('You are offline', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: new Headers({
                'Content-Type': 'text/plain'
              })
            });
          });
      })
  );
});

self.addEventListener('activate', (event) => {
  console.log('Service Worker activating');
  
  // Take control immediately
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('Deleting old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
    ])
  );
});