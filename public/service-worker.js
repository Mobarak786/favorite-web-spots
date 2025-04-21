
self.addEventListener("install", event => {
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  self.clients.claim();
});

// Add caching for offline functionality
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response;
      }
      return fetch(event.request).then(networkResponse => {
        // Cache important resources
        if (event.request.url.includes('/icon') || 
            event.request.url.includes('.js') || 
            event.request.url.includes('.css') || 
            event.request.url.includes('.html')) {
          const responseToCache = networkResponse.clone();
          caches.open('web-spots-cache-v1').then(cache => {
            cache.put(event.request, responseToCache);
          });
        }
        return networkResponse;
      });
    })
  );
});
