/* Service worker · Hannover 26 · Garante e Intecat
   Guarda la app en el móvil para que se abra sin cobertura.
   - La app (index.html) y la ruta (ruta.json): primero red, si no hay, la copia guardada.
   - Iconos y tipografías: copia guardada, y se refresca en segundo plano.
   - GitHub (publicar o leer la ruta en directo) nunca pasa por aquí. */
const CACHE = "hann26-v15";
const CORE = ["./", "index.html", "manifest.webmanifest", "favicon.ico",
  "apple-touch-icon.png", "icon-192.png", "icon-512.png", "icon-maskable-512.png",
  "img/rathaus.jpg", "img/kramer.jpg", "img/herrenhausen.jpg", "img/ernstaugust.jpg", "img/altesrathaus.jpg", "img/oper.jpg", "img/leibnizhaus.jpg",
  "img/foto_rathaus.jpg", "img/foto_kramer.jpg", "img/foto_herrenhausen.jpg", "img/foto_ernstaugust.jpg", "img/foto_altesrathaus.jpg", "img/foto_oper.jpg", "img/foto_leibnizhaus.jpg"];

self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", e => {
  e.waitUntil(caches.keys()
    .then(keys => Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k))))
    .then(() => self.clients.claim()));
});

function withTimeout(p, ms) {
  return new Promise((ok, ko) => { const t = setTimeout(() => ko(new Error("timeout")), ms);
    p.then(r => { clearTimeout(t); ok(r); }, e => { clearTimeout(t); ko(e); }); });
}

async function networkFirst(req, key, ms) {
  const c = await caches.open(CACHE);
  try {
    const res = await withTimeout(fetch(req), ms);
    if (res && res.ok) c.put(key || req, res.clone());
    return res;
  } catch (e) {
    const hit = await c.match(key || req, { ignoreSearch: true });
    if (hit) return hit;
    throw e;
  }
}

async function staleWhileRevalidate(req) {
  const c = await caches.open(CACHE);
  const hit = await c.match(req);
  const net = fetch(req).then(res => { if (res && (res.ok || res.type === "opaque")) c.put(req, res.clone()); return res; }).catch(() => null);
  return hit || (await net) || Response.error();
}

self.addEventListener("fetch", e => {
  const req = e.request;
  if (req.method !== "GET") return;
  const url = new URL(req.url);

  // GitHub: siempre en directo
  if (/(^|\.)github(usercontent)?\.com$/.test(url.hostname)) return;

  // Tipografías de Google
  if (url.hostname === "fonts.googleapis.com" || url.hostname === "fonts.gstatic.com") {
    e.respondWith(staleWhileRevalidate(req)); return;
  }

  if (url.origin !== self.location.origin) return;

  // La app
  if (req.mode === "navigate" || url.pathname.endsWith("/") || url.pathname.endsWith("/index.html")) {
    e.respondWith(networkFirst(req, "index.html", 4000)); return;
  }
  // La ruta común
  if (url.pathname.endsWith("/ruta.json")) {
    e.respondWith(networkFirst(req, "ruta.json", 5000)); return;
  }
  // Iconos y demás
  e.respondWith(staleWhileRevalidate(req));
});
