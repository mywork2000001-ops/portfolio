// 18.11.2026: bölmə tətbiqləri üçün (quraşdırma şərti); keş yoxdur – hər şey şəbəkədən
self.addEventListener('install',()=>self.skipWaiting());
self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));
self.addEventListener('fetch',()=>{});
