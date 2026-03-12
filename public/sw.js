<<<<<<< HEAD
const CACHE_NAME = "pwa-template-cache-v2";
const ASSETS_TO_CACHE = ["./", "./manifest.webmanifest", "./icon-192.svg", "./icon-512.svg"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE)));
  self.skipWaiting();
=======
const CACHE_NAME = "pwa-template-cache-v1";
const ASSETS_TO_CACHE = ["/", "/manifest.webmanifest"];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS_TO_CACHE)));
>>>>>>> origin/main
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key)))),
  );
<<<<<<< HEAD
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
=======
});

self.addEventListener("fetch", (event) => {
>>>>>>> origin/main
  event.respondWith(caches.match(event.request).then((response) => response || fetch(event.request)));
});
