# ADR-034: The marketing site as a story experience

Status: accepted (owner: "move to production", 2026-11-14). Builds on ADR-033 (brush language, p5.brush paint worker), which stays in force except for the header.
Related: ADR-001 (shared-file rule), ADR-023 (marketing chrome steps aside on platform paths), ADR-025 (the drop-down header this brings back), ADR-033.

## Context

Owner, 2026-11-14, after ADR-033 went live: the site "looks fine" but lacks imagery and motion; the drop-down navigation was better than the Index; every marketing page must be an *experience* that tells a story ("our company is called Story of Your Life"); complete creative freedom, stock photography acceptable for now, 3D welcome, and a dummy film to come.

A research pass (NN/g, web.dev, WCAG 2.2, award-level scrollytelling) set the rules: keep native scroll (no scroll-jacking, no smooth-scroll library), pin only short scenes (≤ 3 screens) with a way to skip, keep primary navigation visible, give every animation a reduced-motion state that still shows all the content, animate transform and opacity only, and label sample content honestly.

## Decision

### Story toolkit (`components/story/`, loaded only by marketing pages)
- **`Scene`**: a tall section with a sticky stage. One shared passive scroll listener (rAF, only for scenes near the viewport) writes `--p` (0 → 1) and `data-step` on the section, and updates `[data-count]` counters. Everything else is CSS: `[data-at]` / `[data-only]` / `[data-fade]` steps, scrubbed transforms computed from `--p` with `clamp()`. Hidden steps use opacity only, so screen readers read every line. Scenes start below the sticky header by default.
- **`ChapterRail`**: on wide screens, numbered chapters in the left margin (from `[data-chapter][id]` sections), current one marked; also the skip links for pinned scenes.
- **`Kinetic`**: server-split words that rise in on load or on scroll-in; the plain sentence for screen readers.
- **`Film`**: "Watch a mission", a modal `<dialog>`; the video is fetched only when opened. `content/film.ts` points at the 10-second brand loop until the owner's film arrives (swap `src`, `poster`, `duration`, `placeholder: false`).
- **`Tilt`**: pointer-following 3D tilt (mouse only, off under reduced motion).
- `story.css` is imported by these components, so it never reaches the learning platform.

### Pages
- **Home**: the story of one mission. Prologue ("Every pupil has a story. Homework only kept the score.") → Tuesday night (a dark scene; the worksheet's question counter and countdown run as you scroll; 7/10 lands) → Wednesday (the worksheet tears in two; a mission behind it) → the hour (a spiral-bound pad, one sheet per stage, flipping in CSS 3D) → the Thoughtprint (painting with handwritten annotations) → Monday (32 pupils re-sort into misconception groups; hover a group to pick out its pupils) → seven days later → the Story (Thoughtprints drift past as pages; "Story of Your Life.") → vocabulary and house rules → four readers → Future Builders → FAQ → epilogue with the film. Ira and Ms Rao are illustrative and the page says so.
- **Every other marketing page** follows the same language (four parallel forks): /method (anatomy of a mission), /students (your story), /teachers (a teacher's week), /schools (a term with SOYL), /parents (what comes home), /future-builders (a summer of building; prices, offer, form and tracking unchanged), /what-we-teach, /about (a book that opens), /journal (a magazine), /book-a-demo and /contact (form first), 404.

### Header (replaces ADR-033's Index)
ADR-025's drop-down behaviour is restored (hover with intent delay, click, full keyboard support, Escape, outside click, focus handling, mobile sheet with accordions, scroll lock and focus trap), redrawn on paper: numbered pages with a drawn underline, a taped photo card per group, a torn-paper edge. Groups: Missions, Future Builders, Learn (flag on only), About. The island (`StoryNav`) loads through `NavGate`, so learning-platform pages never download it. `lib/site.ts` exports `NAV_GROUPS` again; the footer's columns come from it.

### Photography
Nineteen stock photographs from Pexels (Pexels License: free commercial use, no attribution required) in `public/images/stock/`, credited in `public/images/stock/CREDITS.md`, registered in `content/images.ts` with factual alt text, resized to 2000 px. They are placeholders under the same rules as the existing editorial images: never captioned as SOYL pupils, schools or outcomes. Pexels gives no model releases; replace with consented SOYL photography before any paid advertising.

## Consequences
- The marketing visual baseline changed on every page and was re-captured. Under automation every painting now starts on load, never repaints on resize, and marks its box `data-paint="done"`; `marketing/stabilise.ts` waits for that, so full-page captures are stable.
- Pinned scenes make the home page longer to scroll (about 16 screens of scenes). The chapter rail and anchors let readers skip; each scene is ≤ 3.4 screens.
- More images per page: all through `next/image` (AVIF/WebP, responsive sizes, lazy below the fold); Lighthouse must stay within 5 points of `main`.
- The film slot is live with a placeholder ("Preview") until the owner supplies the video.

## Amendment, 2026-11-14: a 3D front page and the owner's teaser
Owner: "I would really like a 3D… front page… and narrate the story", after liking the /about book.
- **The opening** (`components/home/story/Opening.tsx`, `opening.css`, `OpeningMotion.tsx`) replaces the Prologue. Ira's Story is a cloth-bound book (gold-foil title, painted Thoughtprint on the label) lying on a desk with a pencil, a sticky note, a paper aeroplane and a mission chip. Scrolling (one pinned scene, 4.4 screens; 4 on phones) lifts it upright, opens the cover onto a bookplate, turns three leaves (contents → before: 20 questions, a timer, 7/10 → after: five stages; left-hand pages carry a Tuesday-night photo, the five-stage loop and a Thoughtprint), then the camera falls into the last page, "Chapter one: Tuesday night", whose dark becomes the Tuesday scene. The book has real thickness (page-block edges, spine, back board); leaves lift and shade as they turn; the cover's foil glints and the book leans towards the mouse (mouse only).
- **Implementation**: CSS 3D on real DOM, moved by scroll progress (see "Scroll performance"); no WebGL, no library, no new dependency. Nothing that flattens 3D sits on a 3D parent. `sin()` lift and shading sit behind `@supports`. The book is `aria-hidden`; screen readers get the headline, the actions and a one-sentence summary (`opening.summary`). Reduced motion: no tilt, bob or scrub; each step shows the next spread. Under automation the same rules as the rest of ADR-034 apply.
- **The Story chapter**: Ira's eight pages now stand on a 3D ring that turns as the reader scrolls (reduced motion: the flat swipe row as before). Pages keep full opacity (fading turned pages failed colour contrast).
- **Film**: `content/film.ts` now plays the owner's 36-second teaser (`public/video/soyl-academy-teaser.mp4`, 1920×1080, 6.6 MB, with a soundtrack; poster = the 12.6 s frame); the trigger shows 0:36 instead of "Preview". Captions are needed if a future cut has speech.
- **Privacy notice**: section 4 of `/privacy` gains the owner-approved line on learning reminders (D-055).

### Scroll performance (owner: "make sure the scroll is as smooth as possible")
Measured with a steady 1,400 px/s scripted scroll of the production build (real GPU; a 4× CPU slowdown stands in for a mid-range phone). Writing `--p` on a scene re-styles every element inside it on every frame, and the book's `calc(var())` chains made that about 50 µs an element: the opening ran at 9 fps throttled (29 fps unthrottled, with an 833 ms hitch).
- `Scene` gains `progress`: `'css'` (default, unchanged), `'targets'` (a non-inherited registered `--sp` on the scene's `[data-p]` elements only) and `'event'` (a `sceneprogress` event). Each scene writes only when its progress changes, and caches its counters and targets.
- The opening uses `'event'`: `OpeningMotion.tsx` writes registered, non-inherited `--op-*` numbers on the ~15 moving elements (and the turning leaves' shade opacity), so the pages' text and paintings are never re-styled by scrolling. Registered names are prefixed (`@property` is global; `--f` and `--open` are used elsewhere). Its idle bob pauses off screen.
- Tuesday, Wednesday (the tear), the hour (the pad), Monday (the dots) and the Story ring use `'targets'`; derived values are written out in place so nothing hands a custom property down to content. Monday's hover rules use sibling selectors instead of `:has()`. The header only sets React state when "scrolled" flips. The worksheet's ticking counters repaint on their own layer.
- Result, home page: desktop 58–60 fps throughout (opening 29 → 59); throttled, opening 9 → 44–56 fps, ring 29 → 43–55, whole page 33 → 47–49. Other pages keep `'css'` and are unchanged.
- Narration lines that fade back now fade to 0.68, not 0.32 (axe colour contrast; shipped earlier, found by this sweep).

