const CACHE_NAME = 'portal-jogos-v6';

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
  './jogos/jogo-4/index.html',
  './jogos/jogo-5/index.html',
  './jogos/jogo-6/index.html',
  './jogos/puzzle-portugal/index.html',
  './jogos/puzzle-portugal/pesca_lula.html',
  './jogos/puzzle-portugal/css/styles.css',
  './jogos/puzzle-portugal/css/lula.css',
  './jogos/puzzle-portugal/js/audio.js',
  './jogos/puzzle-portugal/js/data.js',
  './jogos/puzzle-portugal/js/game.js',
  './jogos/puzzle-portugal/js/lula_game.js',
  './jogos/puzzle-portugal/js/map.js',
  './jogos/puzzle-magnetico/index.html',
  './jogos/avo-magnetico/index.html',
  './jogos/aventura-lagos/index.html',
  './jogos/matematica-lagos/index.html',
  './jogos/pesca-malega/index.html',
  './jogos/pesca-embarcada/index.html',
  './jogos/aorus-corrida/index.html',
  './jogos/cyber-runner/index.html',
  './jogos/freecell/index.html',
  './jogos/paciencia/index.html',
  './jogos/spider/index.html',
  './jogos/nao-te-irrites/index.html',
  './jogos/puzzle-mapa/index.html',
  './jogos/puzzle-paises/index.html',
  './jogos/puzzle-capitais/index.html',
  './jogos/pesca-lula-animada/index.html',
  './jogos/aventura-pirata/index.html',
  './jogos/palavras-cruzadas/index.html',
  './jogos/plataformas-2d/index.html'
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
