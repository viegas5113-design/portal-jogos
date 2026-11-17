const CACHE_NAME = 'portal-jogos-v1';

const APP_SHELL = [
  './',
  './index.html',
  './manifest.json',
  './static/css/app.css',
  './static/js/app.js',
  './static/icons/icon-192.png',
  './static/icons/icon-512.png',
  './jogos/jogo-1/index.html',
  './jogos/jogo-2/index.html',
  './jogos/jogo-3/index.html',
  './jogos/jogo-4/index.html'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;

  event.respondWith(
    caches.match(req).then((cached) => {
      if (cached) return cached;
      return fetch(req)
        .then((resp) => {
          if (resp && resp.ok && req.url.startsWith(self.location.origin)) {
            const copy = resp.clone();
            caches.open(CACHE_NAME).then((c) => c.put(req, copy));
          }
          return resp;
        })
        .catch(() => caches.match('./index.html'));
    })
  );
});
