const cacheName    = 'simplenotecache-v4';
const staticAssets = [
    './',
    './index.html',
    './sw.js',
    './manifest.json',

    './css/bootstrap.min.css',
    './css/app.css',
    './css/recursive.woff2',

    './js/app.js',
    './js/_downloads.js',
    './js/_localstore.js',

    './js/_note_titles.js',

    './images/notebook.svg',
    './libs/bootstrap.min.js',
    './libs/jquery-3.5.0.min.js',
    './libs/moment.js',
    './libs/popper.min.js',
    './libs/lodash.min.js',

    './icons/favicon.ico',
    './icons/android-chrome-512x512.png'
];

self.addEventListener('install', async event => {
    // const cache = await caches.open(cacheName);
    // await cache.addAll(staticAssets);
});

self.addEventListener('fetch', async event => {
    // const request = event.request;
    // event.respondWith(cacheFirst(request));
});

async function cacheFirst(request) {
    const cache          = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    return cachedResponse || fetch(request);
}