const cacheName    = 'pwa-conf-v1';
const staticAssets = [
    './',
    './index.html',
    './manifest.json',
    './sw.js',
    './css/bootstrap.min.css',
    './css/app.css',
    './js/app.js',
    './js/_downloads.js',
    './js/_localstore.js',
    './js/_note_titles.js',
    './images/notebook.svg',
    './vendor/bootstrap.min.js',
    './vendor/jquery-3.5.0.min.js',
    './vendor/moment.js',
    './vendor/popper.min.js',
    './css/recursive.woff2',
    './icons/favicon.ico',
    './icons/android-chrome-512x512.png'
];

self.addEventListener('install', async event => {
    const cache = await caches.open(cacheName);
    await cache.addAll(staticAssets);
});

self.addEventListener('fetch', async event => {
    const request = event.request;
    event.respondWith(cacheFirst(request));
});

async function cacheFirst(request) {
    const cache          = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    return cachedResponse || fetch(request);
}