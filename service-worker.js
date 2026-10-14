const CACHE_NAME = 'hydro-v2';

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(['index.html', 'manifest.json']))
  );
});

self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});

// メインアプリからの通知命令を受け取る
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'NOTIFY') {
    self.registration.showNotification(event.data.title, {
      body: event.data.body,
      icon: 'https://cdn-icons-png.flaticon.com/512/3105/3105807.png',
      badge: 'https://cdn-icons-png.flaticon.com/512/3105/3105807.png',
      vibrate: [200, 100, 200],
      tag: 'water-timer', // 同じ通知が重ならないように固定
      renotify: true
    });
  }
});