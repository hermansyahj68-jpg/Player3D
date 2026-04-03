const CACHE_NAME = "player 3D-v1.0";

const urlsToCache = [
  "./",
  "./index.html",
  "./icon.png",
  "./manifest.json"
];

// Install → simpan cache
self.addEventListener("install", event => {
  self.skipWaiting(); // langsung aktif
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate → hapus cache lama
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    })
  );
  self.clients.claim(); // langsung kontrol halaman
});

// Fetch → ambil dari cache dulu
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      if (response) {
        return response; // ambil dari cache (offline mode)
      }
      return fetch(event.request);
    })
  );
});
