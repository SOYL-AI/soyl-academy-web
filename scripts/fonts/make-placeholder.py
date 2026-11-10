"""Make scripts/fonts/placeholder.woff2: a valid font with no characters at all.

scripts/fetch-fonts.mjs copies it into assets/fonts/ only when Zodiak and Switzer cannot be downloaded or
found in the cache, so `next/font/local` still compiles. With an empty character map, the browser takes every
character from the next font in the stack (the metric-matched Times New Roman / Arial fallback), so the page
looks like the fallback, not like boxes. It contains no outlines from any other font.

    python scripts/fonts/make-placeholder.py      (needs fontTools and brotli)
"""
from pathlib import Path
from fontTools.fontBuilder import FontBuilder
from fontTools.pens.ttGlyphPen import TTGlyphPen

UPM = 1000
fb = FontBuilder(UPM, isTTF=True)
fb.setupGlyphOrder([".notdef"])
fb.setupCharacterMap({})
fb.setupGlyf({".notdef": TTGlyphPen(None).glyph()})
fb.setupHorizontalMetrics({".notdef": (500, 0)})
fb.setupHorizontalHeader(ascent=900, descent=-250)
fb.setupNameTable({"familyName": "SOYL Placeholder", "styleName": "Regular"})
fb.setupOS2(sTypoAscender=900, sTypoDescender=-250, sTypoLineGap=0, usWinAscent=900, usWinDescent=250, xAvgCharWidth=500)
fb.setupPost()
fb.font.flavor = "woff2"
out = Path(__file__).with_name("placeholder.woff2")
fb.save(str(out))
print(out, out.stat().st_size, "bytes")
