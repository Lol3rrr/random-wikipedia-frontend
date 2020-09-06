const cacheName = "static-cache";

const extras = [
  "service-worker.js"
];

self.__precacheManifest = [
  ...extras,
].concat(self.__precacheManifest || []);
workbox.setConfig({
  debug: false
});
workbox.precaching.precacheAndRoute(self.__precacheManifest, {});

self.addEventListener("install", () => {
  self.skipWaiting();
});
self.addEventListener("activate", (e) => {
  console.log(`Activated ${version}`);

  e.waitUntil(e.clients.claim());
});
self.addEventListener("fetch", (e) => {
  e.respondWith(
    caches
      .match(e.request)
      .then(function(response) {
        return response || fetch(e.request);
      })
      .catch(function(err) {
        console.log(err);
      })
  );
});
self.addEventListener("message", (e) => {
  const port = e.ports[0];
  const data = e.data;

  // Send response
  port.postMessage();
});