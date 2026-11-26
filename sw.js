const C='noor-v2',SHELL=['./','index.html','manifest.json','icon-192.png','icon-512.png','nav-home.png','nav-prayer.png','nav-ummah.png','nav-chat.png','nav-settings.png'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(SHELL)).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const r=e.request;if(r.method!=='GET')return;const h=new URL(r.url).hostname;
if(/supabase\.co$|islamic\.network|geojs|bigdatacloud|geocoding/.test(h))return;
e.respondWith(fetch(r).then(res=>{if(res.ok){const cp=res.clone();caches.open(C).then(c=>c.put(r,cp))}return res}).catch(()=>caches.match(r).then(m=>m||(r.mode==='navigate'?caches.match('index.html'):Response.error()))))});
