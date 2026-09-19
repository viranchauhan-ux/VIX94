const CACHE = "vix94-shell-v1";
const SHELL = [
  "/",
  "/manifest.webmanifest",
  "/favicon.png",
  "/apple-touch-icon.png",
  "/favicon.ico",
  "/vix94logo.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(SHELL))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE)
          .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", event => {
  const request = event.request;
  const url = new URL(request.url);

  // Never intercept audio/R2/media requests.
  if (
    request.destination === "audio" ||
    url.hostname.includes(".r2.dev") ||
    url.pathname.endsWith(".mp3") ||
    url.pathname.endsWith(".m4a") ||
    url.pathname.endsWith(".aac") ||
    url.pathname.endsWith(".wav")
  ) {
    return;
  }

  if(request.method !== "GET"){
    return;
  }

  event.respondWith(
    caches.match(request).then(cached => {
      return cached || fetch(request).then(response => {
        const copy = response.clone();
        caches.open(CACHE).then(cache => cache.put(request, copy));
        return response;
      }).catch(() => cached);
    })
  );
});
