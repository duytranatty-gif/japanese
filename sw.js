/* Japanese for Kids service worker.
   The whole app is one self-contained index.html (curriculum embedded) with no
   API, so once these assets are cached it runs fully offline / in flight mode.
   Page = network-first so a deploy lands without a cache bump; icons/manifest =
   cache-first. */
const CACHE = "japanese-kids-v2";
const ASSETS = [
  "./", "./index.html", "./manifest.webmanifest",
  "./icon-192.png", "./icon-512.png", "./icon-180.png",
];

self.addEventListener("install", (e) => {
  // Cache each asset on its own rather than addAll(): addAll is atomic, so one
  // 404 would throw away the whole install and cache nothing.
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => Promise.all(ASSETS.map((u) =>
        c.add(u).catch((err) => console.warn("[japanese] not cached:", u, err))
      )))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  if (url.origin !== location.origin) return;

  const isPage = e.request.mode === "navigate" ||
    url.pathname.endsWith("/") || url.pathname.endsWith("index.html");

  if (isPage) {
    e.respondWith(
      fetch(e.request).then((resp) => {
        const copy = resp.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return resp;
      }).catch(() => caches.match(e.request).then((r) => r || caches.match("./index.html")))
    );
    return;
  }

  e.respondWith(
    caches.match(e.request).then((cached) =>
      cached ||
      fetch(e.request).then((resp) => {
        const copy = resp.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return resp;
      })
    )
  );
});
