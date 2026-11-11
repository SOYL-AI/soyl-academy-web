"""PNG copies of the plates the share card uses (app/og/route.tsx), from the WebP plates in public/art/.

    python tools/art/og.py

The card is drawn by satori, which does not read WebP. It needs two images: the hero stage (wash, then ring) flattened
into one transparent PNG, and the indigo heading stroke. They are written to app/og/ beside the route, at the size
the card draws them, as palette PNGs with alpha so each stays small. Run it again after tools/art/process.py.
"""
import pathlib
from PIL import Image

ART = pathlib.Path(__file__).resolve().parent
PUBLIC = ART.parent.parent / "public" / "art"
OUT = ART.parent.parent / "app" / "og"

STAGE_PX = 620   # the card draws the stage at 620 x 620
STROKE_PX = (300, 24)


def small(img: Image.Image, path: pathlib.Path) -> None:
    # 128 colours with alpha is plenty for paint on paper and keeps each file well under 100 KB.
    img.quantize(colors=128, method=Image.Quantize.FASTOCTREE, dither=Image.Dither.NONE).save(path, optimize=True)
    print(f"{path.name}: {path.stat().st_size // 1024} KB")


stage = Image.new("RGBA", (1040, 1040), (0, 0, 0, 0))
for layer in ("wash", "ring"):
    stage.alpha_composite(Image.open(PUBLIC / f"{layer}.webp").convert("RGBA"))
small(stage.resize((STAGE_PX, STAGE_PX), Image.Resampling.LANCZOS), OUT / "stage.png")

stroke = Image.open(PUBLIC / "stroke-indigo.webp").convert("RGBA").resize(STROKE_PX, Image.Resampling.LANCZOS)
small(stroke, OUT / "stroke.png")
