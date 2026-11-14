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
