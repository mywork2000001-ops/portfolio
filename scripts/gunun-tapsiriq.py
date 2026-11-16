"""Günün tapşırığı (ana səhifə, #gunun) – hər gün yeni sual (16.11.2026, istifadəçi: «sual dəyişmir»).
Mənbə: Media-Studio növbəsi (Oracle /opt/media-studio/daily/queue.json – yoxlanmış bank sualları, cavab + həll).
    scp ubuntu@92.5.191.133:/opt/media-studio/daily/queue.json /tmp/queue.json
    py -3 scripts/gunun-tapsiriq.py /tmp/queue.json
→ public/gunun/N.json (bir sual – bir fayl, səhifə yalnız bugünkünü yükləyir) + public/gunun/say.json.
Şəkil/cədvəl tələb edən suallar götürülmür (şəkilsiz göstərmək olmaz)."""
import json, re, shutil, sys
from pathlib import Path

src = json.loads(Path(sys.argv[1]).read_text(encoding="utf-8"))
ok = [x for x in src if not re.search(r"şəkil|şəkl|<img|rəsm|cədvəl|qrafik|diaqram", x["q"], re.I)
      and len(x["o"]) >= 4 and isinstance(x["a"], int) and 0 <= x["a"] < len(x["o"])]
out = Path(__file__).resolve().parents[1] / "public" / "gunun"
shutil.rmtree(out, ignore_errors=True); out.mkdir(parents=True)
for i, x in enumerate(ok):
    (out / f"{i}.json").write_text(json.dumps({"q": x["q"], "o": x["o"], "a": x["a"], "e": x.get("e", ""),
                                               "test": x.get("test", ""), "topic": x.get("topic", "")},
                                              ensure_ascii=False), encoding="utf-8")
(out / "say.json").write_text(json.dumps({"n": len(ok)}), encoding="utf-8")
print(len(ok), "sual ->", out)
