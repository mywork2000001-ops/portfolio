"""18.11.2026: hər bölmə (fizmatix.com/bolme/<alt>) telefona ayrıca tətbiq kimi qurulur (PWA, brend daxilində).
public/app/<alt>.webmanifest + public/app/icon-192/512.png (loqo) + public/bolme/sw.js. SUBS siyahısı src/App.tsx-dən oxunur."""
import json, re
from pathlib import Path
from PIL import Image, ImageDraw
R = Path(__file__).resolve().parent.parent
src = (R / "src/App.tsx").read_text(encoding="utf-8")
body = re.search(r"const SUBS: Record<string, string> = \{(.*?)\n\}", src, re.S).group(1)
subs = dict(re.findall(r"(\w+): '([^']+)'", body))
logo = Image.open(R / "public/logo.png").convert("RGBA")
for n in (192, 512):
    c = Image.new("RGB", (n, n), "#0B1026")
    s = int(n * 0.72); lg = logo.resize((s, s), Image.LANCZOS)
    m = Image.new("L", (s, s), 0); ImageDraw.Draw(m).ellipse((0, 0, s - 1, s - 1), fill=255)
    c.paste(lg, ((n - s) // 2, (n - s) // 2), m); c.save(R / f"public/app/icon-{n}.png")
for k, t in subs.items():
    (R / f"public/app/{k}.webmanifest").write_text(json.dumps({
        "id": f"/bolme/{k}", "name": f"{t} · Fizmatix", "short_name": t[:24], "start_url": f"/bolme/{k}", "scope": f"/bolme/{k}",
        "display": "standalone", "background_color": "#0B1026", "theme_color": "#0B1026", "lang": "az",
        "icons": [{"src": "/app/icon-192.png", "sizes": "192x192", "type": "image/png", "purpose": "any"},
                  {"src": "/app/icon-512.png", "sizes": "512x512", "type": "image/png", "purpose": "any maskable"}]},
        ensure_ascii=False, indent=1), encoding="utf-8")
(R / "public/bolme/sw.js").write_text(
    "// 18.11.2026: bölmə tətbiqləri üçün (quraşdırma şərti); keş yoxdur – hər şey şəbəkədən\n"
    "self.addEventListener('install',()=>self.skipWaiting());\n"
    "self.addEventListener('activate',e=>e.waitUntil(self.clients.claim()));\n"
    "self.addEventListener('fetch',()=>{});\n", encoding="utf-8")
print(len(subs), "sections")
