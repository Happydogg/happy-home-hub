const CACHE_NAME = 'happy-home-cache-v2.8';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  // Let Google Apps Script, Sheets, and AI requests bypass service worker cache
  const url = event.request.url;
  if (url.includes('script.google.com') || url.includes('docs.google.com') || url.includes('googleapis.com')) {
    return;
  }
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});