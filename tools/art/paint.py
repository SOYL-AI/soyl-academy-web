"""Paint the plates with p5.brush in headless Chrome (offline; the site ships only the processed images).

    python tools/art/paint.py ring:7 rays:7 wash:7 sun:7 pools:11 panel:13 strokes:17
    python tools/art/process.py

Each plate is painted on white at 1920x1080 into tools/art/out/<name>.png (git-ignored, reproducible from the
seed). process.py then cuts them into transparent, registered WebP/AVIF files in public/art/.
Needs: Python 3, Pillow, numpy, playwright (with the Chrome channel installed). Recipes: plates.js.
p5.brush (brush.js) is MIT, see LICENSE-p5.brush.md; engine.js comes from the SOYL portfolio (Documents/soyl-portfolio/v2/art).
"""
import base64, io, json, sys, pathlib
from PIL import Image
from playwright.sync_api import sync_playwright

ART = pathlib.Path(__file__).resolve().parent
RAW = ART / "out"
RAW.mkdir(exist_ok=True)


def parse(arg):
    """name[:seed][,key=value...]"""
    name, _, rest = arg.partition(",")
    seed = 7
    if ":" in name:
        name, s = name.split(":")
        seed = int(s)
    opts = {"seed": seed}
    for kv in filter(None, rest.split(",")):
        k, v = kv.split("=")
        opts[k] = json.loads(v) if v[:1] in "[{0123456789-" else v
    return name, opts


def main():
    jobs = [parse(a) for a in sys.argv[1:]]
    if not jobs:
        print(__doc__)
        return
    with sync_playwright() as p:
        b = p.chromium.launch(channel="chrome", args=["--use-angle=d3d11", "--enable-gpu", "--ignore-gpu-blocklist", "--allow-file-access-from-files"])
        pg = b.new_page(viewport={"width": 1920, "height": 1080})
        pg.on("pageerror", lambda e: print("[pageerror]", e))
        pg.goto((ART / "paint.html").as_uri())
        pg.wait_for_function("typeof window.renderPlate === 'function'")
        for name, opts in jobs:
            r = pg.evaluate("([n, o]) => window.renderPlate(n, o)", [name, opts])
            raw = Image.open(io.BytesIO(base64.b64decode(r["url"].split(",")[1]))).convert("RGB")
            raw.save(RAW / f"{opts.get('out', name)}.png")
            print(f"{name}: {r['ms']:.0f} ms")
        b.close()


if __name__ == "__main__":
    main()
