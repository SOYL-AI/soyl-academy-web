# SOYL Academy design language: "Ink and wash"

Adopted 10 Nov 2026 (ADR-028). The full plan, page by page, with the copy deck, the asset manifest and the build
phases, is [`docs/redesign-ink-and-wash.md`](docs/redesign-ink-and-wash.md); this file is its section 2 (the
language) plus how to use the shared components. Rendered specimens: the direction board,
https://claude.ai/artifact/UtaCNZZByQjbbXZvdU9e3L (option A, with B as the night theme).

Where it lives in code:

| What | Where |
|---|---|
| Tokens (paper and slate sets, legacy names re-pointed) | `app/globals.css` (`@theme static`) |
| Fonts (Zodiak, Switzer; fetched, never committed) | `lib/fonts.ts`, `scripts/fetch-fonts.mjs` |
| Shared components | `components/ink/` |
| Painted plates (sources and the shipped images) | `tools/art/`, `public/art/` |
| Pages not yet rebuilt | still on the legacy classes in `app/globals.css`; Future Builders keeps its own look inside `.brand-legacy` |

## 1. The idea

**Your work is the paint.** A student's tries are brush strokes. One ink ring (an enso) is the site's single
signature: it is unfinished until the visitor solves a real question, and every try, wrong ones included, lays
part of the stroke. Each subject owns a natural-dye pigment, and progress in the app is literal: an untouched
chapter is an outline, a finished one is washed in.

By day the ground is paper and the ring is ink. At night (the app's dark theme) the ground is slate and the same
ring is chalk. One system, two grounds.

**Allowed** (anything not listed is a tell and should be cut at review): one painted ring per page; washes under
product moments; pigment dabs as list bullets; one drawn stroke under a heading per section; small-caps labels
inside product moments only; the rubber stamp for streak days and rank cards only.

**Not allowed:** italic accent word with a highlighter stroke, verb marquee, photo cards with offset colour
blocks, pill buttons, glow, gradients, numbered section eyebrows, fade-up on every block.

## 2. Colour

Paper (marketing, and the app's light theme). Contrast is against paper `#FBFAF7`.

| Token | Hex | Role | Contrast |
|---|---|---|---|
| `paper` | `#FBFAF7` | Ground | |
| `paper-2` | `#F3F1EA` | Alternate band, cards on paper | |
| `paper-3` | `#E9E6DC` | Pressed, the deeper band | |
| `ink` | `#1B1A19` | Text, the ring | 16.6:1 |
| `graphite` | `#4A4744` | Secondary text | 8.8:1 |
| `muted` | `#6B6762` | Captions, labels | 5.4:1 |
| `indigo` | `#27467E` | **The action**: buttons, links, focus | 8.9:1 (paper text on it: 8.9:1) |
| `indigo-deep` | `#14294F` | Hover, the deep edge of a wash | |
| `indigo-pale` | `#6F88B5` | Wash fills | fill only |
| `madder` | `#A3302A` | A missed try, errors | 6.7:1 |
| `leaf` | `#3F6A2A` | A right answer, success | 6.1:1 |
| `turmeric` | `#DFA22A` | Marks and strokes | **2.2:1, never text** |
| `henna` | `#9A562A` | Fifth subject pigment | 5.4:1 |
| `rule` | `rgba(27,26,25,.14)` | Hairlines | |

Subject pigments (a subject's wash, dab and progress): Mathematics indigo, Science and Physics madder, Chemistry
turmeric, Biology leaf, Social Science henna, languages ink.

Slate (the app's dark theme; on marketing pages, the footer band). Contrast is against slate `#0E1215`.

| Token | Hex | Role | Contrast |
|---|---|---|---|
| `slate` | `#0E1215` | Ground | |
| `slate-2` | `#14181C` | Cards, the board | |
| `chalk` | `#F2EEE4` | Text, the ring | 16.2:1 |
| `chalk-muted` | `#B9B5AA` | Secondary text | 9.2:1 |
| `mint` | `#9EC9C2` | **The action** (text on it is `mint-ink` `#0B0F12`, 10.6:1) | 10.4:1 |
| `lamp` | `#F4C95D` | Marks, the lamp | 12.0:1 |
| `madder-rose` | `#E08A7F` | A missed try | 7.3:1 |
| `chalk-rule` | `rgba(242,238,228,.16)` | Hairlines | |

Obsidian, snow and mint are the SOYL house palette, so the night theme also brings the Academy back under the
parent brand. All tokens are Tailwind colours (`bg-paper-2`, `text-graphite`, `border-chalk-rule`) and CSS
variables (`var(--color-indigo)`).

Legacy names (`cobalt`, `highlighter`, `red-pen`, `red-ink`, `success`, the `*-soft` tints) still exist for the
pages that have not been rebuilt; they point at the new pigments. Do not use them in new code. They go when
phase 5 of the plan is done.

## 3. Type

- **Zodiak** 400 and 400 italic: display, and the one italic "ask" line per screen (`font-serif`).
- **Switzer** 400, 500, 600: text and interface (`font-sans`, the body default).
- **Devanagari:** Noto Sans Devanagari in the app (ADR-023). Marketing uses it too for any Hindi line; do not add
  a second Devanagari face.
- **Coverage:** Switzer has **no rupee sign** (₹). Set prices in Zodiak, which has it. Neither face has arrows
  (→): draw them as SVG (`Arrow` in `components/ink/Button.tsx`).
- Scale: hero `clamp(2.6rem, 6.2vw, 5rem)/0.96`, tracking `-0.026em`; section head `clamp(1.9rem, 4.2vw, 3.2rem)/1.04`;
  title `1.45rem/1.15`; lead `clamp(1.05rem, 1.4vw, 1.25rem)/1.5`; body `1rem` to `1.0625rem/1.6`;
  label `0.72rem`, 600, `0.1em`, uppercase (inside product moments only).
- Headlines are two lines or fewer at 390, 768 and 1440. Sentence case. No dashes in visible copy.
- In code these are Tailwind utilities in `app/globals.css`: `ink-hero`, `ink-head`, `ink-title`, `ink-lead`,
  `ink-ask` (the italic line) and `ink-label` (0.75rem, the smallest type on a page).

**Font files.** Zodiak and Switzer are Fontshare faces (ITF Free Font License): free to use on a website, not to
be redistributed as files. This repo is public, so the files are not committed. `scripts/fetch-fonts.mjs` runs on
`postinstall`, `predev` and `prebuild`, downloads them into the git-ignored `assets/fonts/` (and a cache in
`node_modules/.cache/soyl-fonts/`), and `next/font/local` self-hosts them, so visitors never request anything from
Fontshare (WEB-1). Each face has a metric-matched fallback (`adjustFontFallback`: Times New Roman for Zodiak,
Arial for Switzer). If Fontshare and the cache are both unavailable the script installs a glyphless placeholder
(`scripts/fonts/placeholder.woff2`), the build still succeeds and every character renders in the fallback.

## 4. Paint

Painted with p5.brush (MIT, `tools/art/LICENSE-p5.brush.md`) in headless Chrome, offline. The site ships only
images; it carries no canvas, WebGL or animation library.

```
python tools/art/paint.py ring:7 rays:7 wash:7 sun:7 pools:11 panel:13 strokes:17   # raw plates -> tools/art/out/ (git-ignored)
python tools/art/process.py                                                        # -> public/art/*.webp, budgets checked
```

- **Registration:** every layer of the hero stage is painted in the same 1920x1080 coordinates and cropped to one
  1040x1040 window, so layers stack with `inset: 0`. Ring centre is at 44.2% / 46.2% of the stage; the stroke
  starts at 222deg (CSS conic angle) and runs 336deg clockwise.
- **Budget:** hero ring <= 110 KB, any other plate <= 80 KB, total paint on the homepage <= 350 KB.
  `process.py` fails if a file is over.
- **Chalk variants** are the same strokes with the colour replaced and the alpha kept, so day and night are
  pixel-registered.

| Plate (`public/art/`) | Use |
|---|---|
| `ring`, `rays`, `wash`, `sun` | The hero stage. Night: `ring-chalk`, `rays-chalk`, `wash-chalk`, `sun-lamp`. |
| `pool-{indigo,madder,turmeric,leaf,henna,ink}` | Subject marks, list bullets, the credits meter. |
| `stroke-{indigo,madder,turmeric}`, `stroke-chalk` | One drawn stroke under a section head or a number. |
| `panel` | The ragged wash a product moment or a photograph lies on (also the photo mask). |
| To paint in later phases | `door-wash`, `ledger-wash`, `report-wash`, `fb-sun`. |

## 5. Motion

One verb: **bleed and settle.** Easing `--ease-ink`, `cubic-bezier(.3,.7,.2,1)`.

- The ring draws with a conic mask whose angle is a registered custom property (`@property --sweep`), 900 ms per
  third. Without `@property` support it shows the right amount, unanimated.
- A wash or a stroke wipes in once along the direction it was brushed (`data-reveal="ink-wipe"`, mask-position,
  700 ms) when it first enters the viewport. The one IntersectionObserver is `components/motion/RevealObserver`.
- Controls answer in under 160 ms. Hover is gated to `(hover: hover) and (pointer: fine)`.
- **Nothing pins, nothing loops, no marquee, no scroll library, no parallax.** Native scrolling.
- `prefers-reduced-motion`: everything is in place, nothing is pending.
- No `content-visibility` on page sections: the page keeps one height from load to the bottom.

## 6. Photography

Real photographs only. Every one is printed in the language: a **duotone from indigo-deep to paper**, inside the
`panel` wash as a mask, so it reads as an ink print rather than a stock photo (`InkPhoto`). At night the duotone
runs from slate to warm chalk.

Rules (students here are minors):
- Prefer hands, desks, books and backs of heads. A child's recognisable face never sits beside a price, a claim or
  a number.
- Crop out school crests and name badges.
- Photographs are illustrative and say so once, in the footer. Credits live in `content/credits.ts` and render on
  `/about` (Pexels does not require credit; we give it anyway).
- No AI-generated people. Retire `public/images/*` and `public/video/soyl-loop.mp4` as each page is rebuilt.

## 7. Components (`components/ink/`)

Server components unless noted; styles in `ink.module.css` (inside Tailwind's `components` layer, so a utility in
`className` overrides them). Import each file directly; there is no barrel.

| Component | What it is | Notes |
|---|---|---|
| `Button.tsx`: `InkLink`, `InkButton`, `inkButtonClasses()` | The action. `primary` (indigo), `secondary` (ink outline), `quiet` (underlined text), `night` (mint), `night-secondary` (chalk outline); `md` 44 px, `lg` 52 px; `arrow` | Soft corners (7 px), never pills. External, `mailto:` and `tel:` URLs get a plain anchor. |
| `Chip.tsx` | One choice in a small set (board, class) | `aria-pressed`; 44 x 44 minimum; the parent owns state and labels the group. |
| `Section.tsx` | A screen of a page: `ground` paper, paper-2 or slate; `tight` | Wraps children in `.page` unless `contained={false}`. |
| `Stroke.tsx` | One painted stroke under a heading or a number | Decorative; sized in em; wipes in on view. |
| `Dab.tsx` | A pigment pool: bullet, subject mark, swatch | Decorative unless `label` is given. |
| `Wash.tsx` | The painted panel behind a product moment | Bleeds a little past its content; wipes in on view. |
| `InkPhoto.tsx` | A real photograph as a duotone inside the panel | `alt` required; `night` for slate. |
| `Ring.tsx` | The enso and its stage (wash, sun, rays) | `progress` 0 to 3 thirds; `draw` load, view or none; `night`; children sit in the ring's centre; `priority` when it is the hero. One per page. |
