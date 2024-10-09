// service-worker.js

const CACHE_NAME = 'portal-aluno-v1';
const urlsToCache = [
    '/',
    '/index.html',
    '/frontend/teste/style.css',
    '/frontend/teste/script.js',
    '/frontend/imagens/Senac_mediotec.png',
    '/frontend/imagens/avatar.png',
    '/frontend/imagens/email.png',
    '/frontend/imagens/cadeado-seguro.png'
];

// Instala o service worker e armazena os arquivos em cache
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                return cache.addAll(urlsToCache);
            })
    );
});

// Intercepta requisições e responde com o cache ou busca na rede
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                return response || fetch(event.request);
            })
    );
});

// Atualiza o cache quando houver mudanças nos arquivos
self.addEventListener('activate', event => {
    const cacheWhitelist = [CACHE_NAME];
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cacheName => {
                    if (cacheWhitelist.indexOf(cacheName) === -1) {
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});
