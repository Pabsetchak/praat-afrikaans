// Offline service worker: caches the whole app (code, course, every audio file) on install,
// then serves from cache first. assets.json and VERSION are written by tools/build.mjs.
importScripts('version.js');
const CACHE = 'afrikaans-' + self.APP_VERSION;

self.addEventListener('install', e => {
  e.waitUntil((async () => {
    const list = await (await fetch('assets.json', { cache: 'no-store' })).json();
    const cache = await caches.open(CACHE);
    // Add in batches so one slow file does not block the rest.
    for (let i = 0; i < list.length; i += 40) {
      await Promise.all(list.slice(i, i + 40).map(u => cache.add(new Request(u, { cache: 'reload' })).catch(() => {})));
    }
    self.cachedCount = list.length;
    await self.skipWaiting();
  })());
});

self.addEventListener('activate', e => {
  e.waitUntil((async () => {
    for (const k of await caches.keys()) if (k !== CACHE) await caches.delete(k);
    await self.clients.claim();
    for (const c of await self.clients.matchAll()) c.postMessage({ type: 'cached', n: self.cachedCount || 0 });
  })());
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;
  e.respondWith((async () => {
    const cache = await caches.open(CACHE);
    const hit = await cache.match(req, { ignoreSearch: true });
    if (hit) return hit;
    try {
      const res = await fetch(req);
      if (res.ok && res.status === 200) cache.put(req, res.clone());
      return res;
    } catch {
      if (req.mode === 'navigate') return (await cache.match('index.html')) || Response.error();
      return Response.error();
    }
  })());
});
