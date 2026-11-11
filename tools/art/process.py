"""Cut the painted plates (tools/art/out/*.png, paint on white) into the images the site uses (public/art/).

    python tools/art/process.py

- Colour layers are "unmixed" from white: the paint keeps its colour, the paper becomes transparent.
- Chalk (night) variants are the same strokes with the colour replaced and the alpha kept, so day and night are
  pixel-registered (plan §2.4).
- The hero stage (ring, rays, wash, sun) is cropped from one shared window so the layers stack with `inset: 0`.
  Ring centre: 44.2% / 46.2% of the stage; the stroke starts at 222deg (CSS conic angle) and runs 336deg clockwise.
  components/ink/Ring.tsx reads these numbers; change both together.
- Budgets (plan §2.4): the ring <= 110 KB, any other plate <= 80 KB. The script fails loudly if one is over.
- Only WebP is written. Layers drawn with next/image (the ring, InkPhoto) are re-encoded per device width and
  served as AVIF by the image optimiser; plates used in CSS (strokes, pools, the panel mask) are served as is.
"""
import pathlib, sys
import numpy as np
from PIL import Image

ART = pathlib.Path(__file__).resolve().parent
RAW = ART / "out"
OUT = ART.parent.parent / "public" / "art"
OUT.mkdir(parents=True, exist_ok=True)

STAGE = (440, 20, 1480, 1060)          # the shared 1040 x 1040 window of the hero stage
CHALK, MINT, LAMP = "#F2EEE4", "#9EC9C2", "#F4C95D"
BUDGET = {"ring": 110, "ring-chalk": 110}   # KB, the hero ring by day and night; everything else 80
DEFAULT_BUDGET = 80
sizes = {}


def rgba(img):
    """Unmultiply from white."""
    a = np.asarray(img.convert("RGB"), dtype=np.float32)
    alpha = np.clip(1 - a.min(axis=2) / 255.0, 0, 1)
    alpha = np.clip((alpha - 0.015) / 0.985, 0, 1)
    safe = np.maximum(alpha, 1e-3)[..., None]
    rgb = np.clip((a - (1 - safe) * 255) / safe, 0, 255)
    return np.dstack([rgb, alpha * 255]).astype(np.uint8)


def tint(arr, hexcol, gain=1.0, gamma=1.0):
    """Keep the stroke's texture as alpha, replace its colour."""
    c = [int(hexcol[i:i + 2], 16) for i in (1, 3, 5)]
    al = np.clip((arr[..., 3] / 255.0) ** gamma * gain, 0, 1)
    out = np.zeros_like(arr)
    out[..., 0], out[..., 1], out[..., 2] = c
    out[..., 3] = (al * 255).astype(np.uint8)
    return out


def save(arr, name, size=None, q=80, aq=100):
    im = Image.fromarray(arr).convert("RGBA")
    if size:
        im = im.resize(size, Image.LANCZOS)
    path = OUT / f"{name}.webp"
    im.save(path, quality=q, method=6, alpha_quality=aq)
    sizes[path.name] = path.stat().st_size
    return im


def main():
    missing = [n for n in ("ring", "rays", "wash", "sun", "pools", "panel", "strokes") if not (RAW / f"{n}.png").exists()]
    if missing:
        sys.exit(f"missing raw plates in {RAW}: {', '.join(missing)}. Paint them first (see paint.py).")

    # The hero stage, ink by day.
    stage = {n: rgba(Image.open(RAW / f"{n}.png").crop(STAGE)) for n in ("ring", "rays", "wash", "sun")}
    # Ring and rays are one pigment (ink): stored as flat ink plus the brush texture in the alpha, which is how
    # they look anyway and compresses far better than the unmixed colour noise at the stroke edges.
    save(tint(stage["ring"], "#1B1A19"), "ring", (1040, 1040), q=80, aq=80)
    save(tint(stage["rays"], "#1B1A19"), "rays", (1040, 1040), q=80)
    save(stage["wash"], "wash", (1040, 1040), q=56, aq=70)
    save(stage["sun"], "sun", (1040, 1040), q=80)
    # ... and chalk at night: the same strokes, a mint haze and the lamp.
    save(tint(stage["ring"], CHALK, gain=1.0, gamma=0.85), "ring-chalk", (1040, 1040), q=80, aq=90)
    save(tint(stage["rays"], CHALK, gain=0.9), "rays-chalk", (1040, 1040), q=78)
    save(tint(stage["wash"], MINT, gain=0.62, gamma=1.15), "wash-chalk", (1040, 1040), q=70, aq=80)
    save(tint(stage["sun"], LAMP, gain=0.95), "sun-lamp", (1040, 1040), q=80)

    # Pigment pools: one per subject pigment (plan §2.2). The direction board's "green" is the plan's leaf.
    pools = Image.open(RAW / "pools.png")
    for i, name in enumerate(["indigo", "madder", "turmeric", "leaf", "henna", "ink"]):
        cx = 170 + i * 316
        save(rgba(pools.crop((cx - 150, 150, cx + 150, 450))), f"pool-{name}", (160, 160), q=82)

    # The ragged panel a product moment or a photograph lies on (also used as a CSS mask).
    save(rgba(Image.open(RAW / "panel.png").crop((300, 190, 1620, 910))), "panel", (800, 436), q=56, aq=65)

    # Strokes under a heading or a number; chalk for the slate footer.
    strokes = Image.open(RAW / "strokes.png")
    rows = {"indigo": 0, "madder": 1, "turmeric": 2}
    for name, i in rows.items():
        y = 130 + i * 190
        arr = rgba(strokes.crop((100, y - 70, 1820, y + 70)))
        save(arr, f"stroke-{name}", (860, 70), q=80)
        if name == "indigo":
            save(tint(arr, CHALK, gain=0.95), "stroke-chalk", (860, 70), q=80)

    # Registration check: the stage composited on paper and on slate.
    for ground, names, file in (("#FBFAF7", ["wash", "sun", "rays", "ring"], "preview-day.jpg"),
                                ("#14181C", ["wash-chalk", "sun-lamp", "rays-chalk", "ring-chalk"], "preview-night.jpg")):
        canvas = Image.new("RGBA", (1040, 1040), ground)
        for n in names:
            canvas.alpha_composite(Image.open(OUT / f"{n}.webp").convert("RGBA"))
        canvas.convert("RGB").resize((520, 520), Image.LANCZOS).save(RAW / file, quality=88)

    over = []
    for f, b in sorted(sizes.items()):
        kb = b / 1024
        limit = BUDGET.get(f.rsplit(".", 1)[0], DEFAULT_BUDGET)
        flag = "" if kb <= limit else f"  OVER {limit} KB"
        if flag:
            over.append(f)
        print(f"{f:24s} {kb:7.1f} KB{flag}")
    print(f"total {sum(sizes.values()) / 1024:.1f} KB in {len(sizes)} files; previews in {RAW}")
    if over:
        sys.exit(f"over budget: {', '.join(over)}")


if __name__ == "__main__":
    main()
