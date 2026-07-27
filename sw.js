/* Service Worker — เล่นออฟไลน์ได้ (cache แบบ stale-while-revalidate) */
var CACHE = "ksl-cache-v5";   // ⚠️ ต้องบวกเลขทุกครั้งที่แก้ app.js / quizzes.js ไม่งั้นเครื่องที่ติดตั้ง PWA จะเห็นของเก่า
var ASSETS = [
  "./",
  "index.html",
  "style.css",
  "buddies.js",
  "app.js",
  "data/quizzes.js",
  "manifest.webmanifest",
  "icon-192.png",
  "icon-512.png",
  "apple-touch-icon.png"
];

self.addEventListener("install", function (e) {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(function (c) {
    // cache ทีละไฟล์ ไม่ให้ไฟล์เดียวพังทั้งชุด
    return Promise.all(ASSETS.map(function (u) { return c.add(u).catch(function () {}); }));
  }));
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.map(function (k) { if (k !== CACHE) return caches.delete(k); }));
  }).then(function () { return self.clients.claim(); }));
});

self.addEventListener("fetch", function (e) {
  var req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  // stale-while-revalidate: ส่ง cache ก่อน แล้วอัปเดตเบื้องหลัง → รอบหน้าได้ของใหม่เอง
  e.respondWith(
    caches.open(CACHE).then(function (cache) {
      return cache.match(req).then(function (cached) {
        var network = fetch(req).then(function (res) {
          if (res && res.status === 200) cache.put(req, res.clone());
          return res;
        }).catch(function () { return cached; });
        return cached || network;
      });
    })
  );
});
