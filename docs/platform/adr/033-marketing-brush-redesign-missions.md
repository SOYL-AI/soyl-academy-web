# ADR-033: Marketing site redrawn in the brush language, and told as missions

Status: accepted (live 2026-11-14, a73f2ba0). The header's Index is superseded by ADR-034 (drop-down menus back); the rest stays in force. The owner asked for this redesign. The marketing visual baseline is **not** re-captured until the owner has reviewed the new look (`marketing:baseline` is owner-approved only).
Related: ADR-001 (shared-file rule), ADR-023 (marketing chrome steps aside on platform paths), ADR-025 (the header and footer this replaces), ADR-032 (platform design language v3, untouched here). Source for the product story: *SOYL Missions product spec v1.2* (11 Nov 2026).

## Context

The owner, 2026-11-13: adopt the company's new design concept, built on [p5.brush](https://github.com/acamposuribe/p5.brush), on **all marketing pages and never on the learning platform**; cut a lot of text; make the site sell what SOYL now is. The product has moved from "teacher writes questions, pupil answers them" to **missions** (spec v1.2): Assignment → Mission, Evidence card → Thoughtprint, Learning record → Story; five stages (Spark, Build, Defend, Fix, Reflect); the teacher sets outcomes and approves a mission brief; a Monday screen groups pupils by misconception; a 7-day recheck; no counters, no timers, no mark as the headline.

## Options

1. *Static illustrations exported from p5.brush.* Lightest, but loses what makes the concept: brushwork that is drawn, and different every time.
2. *p5.js + p5.brush (p5 build).* p5.js adds ~1 MB to the pages for nothing we use.
3. *p5.brush's standalone build, lazy-loaded, one shared WebGL surface* (chosen).

## Decision

### Painting engine (`components/brush/`)
- **Dependency:** `p5.brush@3.0.0` (exact pin, MIT, published 2026-10-28). Only `p5.brush/standalone` is imported (~113 KB min, loaded by dynamic `import()` after the page has loaded and the main thread is idle). npm also installs its peer `p5` into `node_modules`; nothing imports it and it is never bundled.
- **`paint.worker.ts` + `engine.ts`:** all painting happens in **one Web Worker** on an `OffscreenCanvas` (a single WebGL2 context for the whole page). p5.brush keeps one global state, so paintings are queued and painted one at a time; after each ~12 ms slice of strokes the worker sends an `ImageBitmap` copy, and the page draws it into that painting's own 2D canvas, so artwork appears stroke by stroke. A first, main-thread version blocked the page: Lighthouse mobile TBT on `/` was ~10 s. In the worker, TBT is under 0.2 s and desktop scores 100. Paintings are drawn on the opaque colour of the section they sit on (`bg`), because p5.brush's pencils and wet edges are designed for paper. Browsers without Worker + OffscreenCanvas + WebGL2 skip the paintings, which are decorative.
- **`recipes.ts`:** `thoughtprint` (a fingerprint of ridges with a vermilion "turning point", seeded per visit in the hero: no two visitors see the same one), `wash`, `path` (the mission path), `loop` (the mission loop) and `storyline` (the footer).
- **`BrushArt.tsx`:** the client island. It is decorative (`aria-hidden`), starts only after the page's `load` event and an idle callback (the hero does not wait to be scrolled to; everything else paints when near the viewport), and repaints at once if its width changes by more than 12%. Under `prefers-reduced-motion` or `navigator.webdriver` it paints instantly, and under automation it uses fixed seeds, so screenshots are stable. Without WebGL2 or JS it shows its optional static fallback, or nothing.
- **`marks.tsx`:** hand-drawn SVG marks (underline, strike-through, ring, arrows), a handwritten `Note`, and the watercolour `Dab`. They trace themselves through the existing `data-reveal` mechanism and are visible without JS.

### Visual language
Graphite on warm paper (`--color-sheet` #F6F1E6, `--color-sheet-deep`), the brand's three pigments kept as watercolours (ultramarine, vermilion, ochre) plus sap green for "secure". Newsreader display, Inter body, and **Kalam** (Indian Type Foundry, also covers Devanagari) for handwritten notes and labels. The new utilities are `leaf` (paper card), `tape`, `sketch`, `ruled` (only for "the old way"), `swipe` and `btn-brush`. Buttons, section labels, photos (taped prints), FAQ and the headline accent are restyled centrally. Spec §14's UI rules are followed on every page.

### Header and footer (replaces ADR-025's mega menus)
- **Header (`BrushNav.tsx`, loaded through `BrushNavGate.tsx` on marketing pages only):** five links (Missions, Schools, Teachers, Parents, Future Builders) with a hand-drawn underline on hover and for the current page, Sign in / Log in (same flag logic as before), Book a demo, and an **Index** button. The Index is a full-page table of contents (numbered chapters, like a book: Story of Your Life) that opens from the button like ink spreading (`clip-path`). It is a modal dialog: focus moves in and is trapped, Escape closes it and returns focus, page scroll is locked, it closes on navigation and on any link click, and it is `inert` while closed, and the page behind it (`main`, footer, cookie bar) is `inert` while it is open. Its painting loads only on first open. ADR-023's guard is kept: `platformChromeActive(pathname)` → `null`.
- **Footer:** the storyline painting (loaded through `LazyBrushArt`, so learning-platform pages never download the painting code), "Story of Your Life." with S·O·Y·L in pigments, the link columns from `SITE_INDEX`, and the legal line.
- **Config:** `lib/site.ts` now exports `NAV_LINKS`, `SITE_INDEX`, `LEGAL_LINKS` and `FOOTER_NAV`. `NAV_GROUPS` and the icon set are gone, and `SiteHeader.tsx`, `MenuParts.tsx` and `NavIcon.tsx` are deleted. The Learn chapter still appears only when `NEXT_PUBLIC_PLATFORM_ENABLED=true`.

### Shared files touched
- `app/globals.css`: new `--color-*` tokens and `--font-hand` (additive; no existing token value changed), the brush utilities, the headline accent as an ochre swipe, and `html:not([data-platform-theme]) body { background: sheet }`. Platform pages set `data-platform-theme` before paint, so their background is unchanged.
- `app/layout.tsx`: adds Kalam (`preload: false`, so it is not preloaded on platform pages). `themeColor` is unchanged.
- `package.json` / lockfile: `p5.brush` 3.0.0.

### Copy
Every marketing page is retold as missions, in British English and sentence case, and roughly half as long. No statistics, testimonials or real-pupil quotes are invented: Thoughtprint and Monday-screen content is labelled "Example". SEO titles and descriptions (`lib/seo/pages.ts`, `config.ts`) and `llms.txt` describe missions. Legal wording, Future Builders prices, dates, offers, forms and payment logic are unchanged.

## Consequences
- **Marketing regression will fail by design** (every page changes). The owner reviews the new look; then `marketing:baseline` is re-captured with owner approval. Until then use `marketing:regression -- --skip-build` only as a smoke test.
- The root layout loads only `BrushNavGate` on every route: a few lines that check the path and load the header (`BrushNav`) as its own chunk on marketing pages. Platform pages never download the header. A first version imported `BrushNav` directly and pushed several platform pages 2–7 KB over the 200 KB gz first-load budget (`bundle.mjs`); the gate brought them back under.
- The marketing copy now describes the missions product from spec v1.2 ahead of its full build (spec §16 build order). The owner owns that positioning decision.
- p5.brush 3.x is a fresh major. The engine relies on `load()` accepting a resized canvas and on `clear(colour)`. Pin upgrades and re-check the lab screenshots.
