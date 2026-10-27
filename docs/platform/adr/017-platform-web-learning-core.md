# ADR-017: Platform web learning core — lesson URLs, listen mode, where content renders, QR dependency

- **Status:** Proposed (web-platform M2; for Lead approval at integration)
- **Date:** 2026-10-27
- **Author:** web-platform
- **Related:** ARCHITECTURE §3.1–3.2, §16; CONTEXT §5; ADR-005, ADR-009 (renderers), ADR-010 (content API), ADR-011 (proxy +
  CSP), ADR-012; WEB-1, WEB-3, WEB-5, WEB-6/7; F-006; pipeline M2 handoff (Ogg Opus, `slide.audio`)

## Context

M2 adds the chapter hub, slide player, notes, flashcards, practice, "Report a mistake" and a minimal `/admin`. Four
choices needed a record: how lesson parts are addressed while staying ISR, what "listen mode" does when a deck has no
audio (and on browsers that cannot play Ogg Opus), where Markdown/KaTeX run so the route JS stays ≤ 200 KB gz, and a
QR code for staff TOTP enrolment.

## Decisions

### 1. Lesson parts: `lesson?part=N` publicly, `lesson/[part]` internally

`/learn/…/chNN/lesson` shows the first part; other parts are `lesson?part=N` (backend-api M2 point 3; `0` = a
single-deck chapter). Reading `searchParams` would make the page dynamic (no ISR, per-request KaTeX). Instead the
platform `proxy.ts` rewrites exactly `/learn/<board>/<class>/<subject>/chNN/lesson?part=<1–2 digits>` to the
prerendered route `lesson/[part]` (`components/platform/server/lesson-rewrite.ts`, unit-tested). Unknown parts are 404.
The proxy still never redirects, reads cookies or runs on marketing routes; this is its only rewrite.

### 2. Listen mode plays recorded narration only — no `speechSynthesis`

- Listen mode exists only when the deck has `slide.audio`. It plays `${NEXT_PUBLIC_CDN_BASE_URL}/${audio.key}` (https
  CDN base, key pattern-checked; CSP `media-src` already allows the CDN origin).
- With no audio (all authored decks today) the mode switch is not shown ("Read mode"). We do **not** fall back to the
  browser's `speechSynthesis`: Chrome's default voices are network voices (narration text leaves for a third-party
  cloud, against WEB-1's intent), quality and Hindi voice availability vary by device, and the result could not be
  reviewed like our TTS output. A clearly-labelled preview could be added later behind a flag if product wants it.
- Highlighting: the pipeline stores only `duration_ms`, so the player shares the clip time out over words by length
  (+ a pause per sentence) and highlights the current sentence and word (`wordAtTime`). When the pipeline stores Azure
  word-boundary offsets, switch to the kit's `wordAtOffset` (request in the handoff).
- At the end of a clip the player waits 0.7 s and moves to the next slide, continuing to play while the student is
  listening; it never autoplays without a tap.

**iOS Safari.** Ogg Opus *playback* only arrived with Safari 18.4 (March 2025; iOS 18.4), and reports of its
completeness differ. Older iPhones/iPads cannot play the pipeline's default format. The player checks
`canPlayType(mime)` and, when it is empty, keeps Listen disabled with "Narration audio does not play in this browser
yet". Fallback plan (pipeline-owned contract change, requested in the handoff): publish a second rendition per slide,
`slide.audio.fallback = { key, duration_ms }` in MP3 (`audio-24khz-48kbitrate-mono-mp3`, Azure supports it; AAC is not
offered), and the player picks the first rendition the browser can play (`audioMime` already maps `.mp3`). Until
real TTS runs (OA-02), no student is affected.

### 3. Content renders on the server; the browser renders only what it fetches after load

- Slides, notes, flashcard faces and the content of lesson check questions are rendered in Server Components with the
  reviewed renderers and handed to client components as React nodes ("slots", `components/platform/ui/question/
  slots.tsx`). KaTeX, react-markdown and the visual renderers cost no client JS on those routes.
- Client-fetched text (the answer key revealed after a check; practice questions fetched page by page, which are
  personal for members) renders through the same reviewed `Markdown` component, loaded lazily (`RichText` /
  `import('…/slots')`), so it is never in a route's first-load JS.
- The player mounts only the previous, current and next two slides (`hidden` + `inert` when not current). The next two
  are the prefetch (their CDN images switch to eager loading; their SVG islands mount); the rest mount when they come
  near ("lazy diagrams").
- Measured first-load JS (gz, `platform/e2e/tests/platform/web/bundle.mjs` on `next start`): hub 168.3, lesson 184.7,
  notes 169.3, flashcards 169.6, practice 179.1, admin 168.9, `/learn` 166.9 KB, of which ~157 KB is the framework and
  root layout shared with marketing pages. Practice then loads the renderer chunk (183 KB gz: KaTeX, react-markdown,
  visuals) after first paint. All ≤ 200 KB (ARCHITECTURE §16).

### 4. Guest progress in M2

`soyl_guest_v1` lesson entries are kept per (chapter, part) with `mode` (optional fields of the v1 contract). Since API
M2 stores positions (`lessonsStored`), any entry triggers the merge and the whole key is cleared after a successful
merge (backend-api M2 point 6).

### 5. QR codes for staff TOTP: `qrcode-generator` 2.0.4

Staff enrolment shows the `otpauth://` URI as a QR code. Options: `qrcode` (larger, several dependencies), an
external QR image service (sends the TOTP secret to a third party: refused, WEB-1), our own encoder (error-prone:
Reed–Solomon, masking, version selection), **`qrcode-generator` 2.0.4** (MIT, zero dependencies, typed, Aug 2025,
~20 KB min). Chosen: `qrcode-generator`, exact version, root `dependencies` (additive; the marketing app never imports
it). It is loaded only by the `/admin` enrolment step (lazy chunk), and drawn as one SVG `<path>` from the module
matrix (`isDark`), so no HTML strings or images are injected (WEB-6).

### 6. Deferred

"Download deck as PDF" (ARCHITECTURE §3.2) is not built in M2: it needs server-side rendering of KaTeX + SVG into PDF
(a headless browser or a PDF library in a function), which is heavy for Vercel functions. Proposed for later as a
worker job writing a cached PDF per deck version to the public CDN.

## Consequences

- Any new client component that needs rendered content must take it as slots/props, or load the renderer lazily;
  importing `render/Markdown`, `visual/Visual` or `question/slots` from a client module puts KaTeX into that route's
  first load (the bundle check in the e2e catches it).
- The e2e serves mock narration (the pipeline's silent Ogg Opus, manifest marked non-simulated in `test-results/` only)
  from a fake CDN origin through Playwright routing, so listen mode is tested end to end without real TTS.
- `.next/server/route-cache` survives `next build`; the e2e runner deletes it after each build so `next start` cannot
  serve ISR HTML from an earlier build.
