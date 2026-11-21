# Hannover 26 · Garante e Intecat

App móvil del viaje de cortesía a Hannover (25–27 de noviembre de 2026). **Garante** (Grupo WERTGARANTIE) organiza; **Intecat** es la invitada. Viajan Rosa Ana (Garante, desde Madrid; organiza junto a Lars, también de Garante) y Óscar y Raquel (Intecat, desde Barcelona). Hotel: me and all hotel Hannover, Aegidientorplatz 3.

La ruta es común para los tres y solo la cambian los organizadores, **Rosa Ana y Lars**. Desde el móvil también pueden cambiar el hotel, la hora de la visita a WERTGARANTIE, avisos sobre los vuelos y el enlace del grupo de WhatsApp (Guía → Reservas y vuelos), y todo se publica junto. Los vuelos y asientos van fijos en la app.

La app tiene **dos estéticas**: «Revista» (marfil y tinta) y «Corporativa» (colores de Garante, foto y pestañas abajo). Cada uno la elige en su móvil, en «¿Quién eres?» o en el Índice.

## Publicar (GitHub Pages)
1. github.com → **New repository** `hannover26` → **Public**.
2. **Uploading an existing file**: sube todo el contenido de esta carpeta (index.html, sw.js, manifest.webmanifest, ruta.json, iconos, favicon.ico, README.md y la carpeta img).
3. **Settings → Pages** → Deploy from a branch → `main` / `(root)` → Save.
4. Quedará en `https://pereamunuaga-gif.github.io/hannover26/`. En GitHub Pages la app detecta sola el repositorio.

> El repositorio es público: quien tenga el enlace verá lo que se publique (vuelos, hotel). Alternativa con repositorio privado: Netlify. Importa el repositorio, sin comando de build; `SYNC_CFG` en index.html ya apunta a `pereamunuaga-gif/hannover26`.

## Claves de los organizadores
GitHub → Settings → Developer settings → Personal access tokens → **Fine-grained tokens** → Generate:
- nombre `Hannover Rosa Ana` (y otro `Hannover Lars`);
- 30 días de validez;
- acceso solo a este repositorio;
- *Contents: Read and write*.

Pasa a cada uno su clave por privado. En su móvil: abrir la app instalada → elegir su nombre → **Guía → Modo organizador** → pegar la clave → **Guardar y comprobar**.

## En el iPhone
Abre el enlace en **Safari** (no en el navegador interno de WhatsApp) → Compartir → **Añadir a pantalla de inicio**, y ábrela desde el icono. La app instalada guarda sus datos aparte de Safari, así que hay que elegir el nombre dentro de ella.

## Después del viaje
Borra las claves en GitHub o deja que caduquen. Si quieres, pon el repositorio en privado.
