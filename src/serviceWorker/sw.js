const cacheName = "static-cache";

const extras = [
  "sw.js"
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

self.addEventListener('push', function(event) {
  const content = event.data.text();
  const data = JSON.parse(content);

  const title = data.Title;
  const options = {
    icon: 'images/icon.png',
    badge: 'images/badge.png',
    data: {
      URL: data.URL
    }
  };

  let request = indexedDB.open('data', 1);
  request.onsuccess = function(event) {
    let db = event.target.result;

    let transaction = db.transaction('articles', 'readwrite');
    let store = transaction.objectStore('articles');
    store.put({id: 'latest', data: data});
  };
  request.onupgradeneeded = function(event) {
    var db = event.target.result;
    db.createObjectStore('articles', {keyPath: 'id'});
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
  event.notification.close();

  const notification = event.notification;
  const URL = notification.data.URL;

  event.waitUntil(
    clients.openWindow(URL)
  );
});