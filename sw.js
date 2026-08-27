/* Cache nie wymaga ręcznego podbijania wersji:
   HTML/CSV/JSON pobierane są najpierw z sieci (gdy jest), a cache służy jako zapas offline. */
const CACHE = 'oboz';

const CORE = [
  './',
  './index.html',
  './manifest.json',
  './vendor/xlsx.mini.min.js',
  './icons/icon-180.png',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const cache = await caches.open(CACHE);
    await cache.addAll(CORE).catch(err => console.warn('SW: cache CORE', err));
    self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)));
    self.clients.claim();
  })());
});

/* dane i strona: najpierw sieć (żeby deploy był od razu widoczny), cache jako zapas
   reszta (ikony): najpierw cache */
const freshFirst = url => {
  if (url.pathname.includes('/vendor/')) return false;   // biblioteka: zawsze z cache
  return url.pathname.endsWith('/') ||
    /\.(html|csv|json|js|xlsx|xlsm|xls)$/i.test(url.pathname);
};

self.addEventListener('fetch', e => {
  if (e.request.method !== 'GET') return;
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;

  if (freshFirst(url)) {
    e.respondWith((async () => {
      try {
        const res = await fetch(e.request, {cache: 'no-store'});
        if (res && res.ok) (await caches.open(CACHE)).put(e.request, res.clone());
        return res;
      } catch (err) {
        const hit = await caches.match(e.request, {ignoreSearch: true});
        return hit || caches.match('./index.html');
      }
    })());
    return;
  }

  e.respondWith((async () => {
    const hit = await caches.match(e.request, {ignoreSearch: true});
    if (hit) return hit;
    try {
      const res = await fetch(e.request);
      if (res && res.ok) (await caches.open(CACHE)).put(e.request, res.clone());
      return res;
    } catch (err) {
      return caches.match('./index.html');
    }
  })());
});
