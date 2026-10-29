# web-platform + design-system — learn mode: lesson player, notes, flashcards — 2026-10-29

Status: done (see "Gates")
Branch: `platform/web-platform/learn-mode`. Started from local `platform/main` 919ffbb; rebased onto `origin/platform/main` e357ad6 (which carries the Lead's contract fix 3d0db68, so the earlier cherry-pick dropped out and the marketing-diff base builds); then merged local `platform/main` 32453de (marketing nav/footer, avatars-assets) as the Lead asked: no conflicts (avatars-assets did not touch the lesson, notes or flashcards files). Check-slide rewards and celebrations from avatars-assets still fire: they live in `usePracticeAnswer`, which the (now lazy) check card uses; the shell's `CelebrationHost` (z-index 69) draws above the focus view (z-index 30).
Owner ask (2026-10-28): "look into the learn mode formatting, the scroll and everything … make everything more perfect", good visual hierarchy, leading platforms (Khan Academy, LeetCode, Brilliant-style focus), light and dark.
Decisions: ADR-023 (app shell, theme) unchanged; no new ADR (no shared, marketing, API, DB or dependency change).

## What changed

### Lesson player (focus mode)

Before: on a 360×760 phone the top bar, a two-line breadcrumb, a four-line title, the part pills, a "Read mode / Explain / flag" row and a progress bar used the top ~440 px; the slide started at y ≈ 440 and was cut by the fixed Previous/Next bar, so students scrolled the page and the slide. Desktop had the same cut.

Now (`components/platform/lesson/`):

- **Pinned view.** The player is pinned between the app top bar and the bottom of the screen (`focus.tsx` `useFocusTop` measures where the page content starts; CSS default 60 px = the shell's top bar, so nothing moves on hydration). The page never scrolls: `scrollHeight ≤ innerHeight + 1` at 360×640 and 360×760 (e2e). The shell is untouched (see "Shell follow-ups").
- **Strip (52 px phone, 56 px desktop).** × back to the chapter hub; the deck title as the page's `<h1>`, one line with ellipsis (full text in the accessible name and `title`); second line: **part switcher** ("Part 1 of 2 ▾", a popover of part links, in the HTML even while closed), "7 / 21", Beta (hidden under 420 px, repeated in the options); **Listen** toggle (when the deck has playable audio); **Explain** (icon only under 640 px); **options ⋯** (report a mistake in this slide, chapter notes, practice, a numbered **slide outline** that jumps, and the read-mode / unsupported-audio notes). Under it a **segmented progress bar** (one segment per slide, a continuous bar above 40 slides; `role="progressbar"` with "Slide 7 of 21").
- **Stage.** The slide card fills the rest. A slide taller than the card scrolls **inside the card** with a fade and a "More below" pill; the card becomes keyboard-focusable while it scrolls (axe `scrollable-region-focusable`). Slide typography is fitted from the player's CSS (the kit's slide layouts are unchanged): no 420/540 px min-height, heading `clamp(1.375rem … 2rem)`, running text ≤ 68ch, diagrams/plots/images max `clamp(180px, 100dvh − 400px, 520px)` tall, Devanagari line height 1.75, title slides `justify-content: safe center` (never cut at the top); from 768 px every slide centres vertically when it fits. The per-slide "3 / 18" is no longer rendered (the strip shows it once).
- **Bottom bar.** Previous (icon + label from 400 px) and Next (primary, wide); 48 px targets; safe-area inset. On an unanswered **question slide**: Skip + **Check** (submits the card's own form, so the server-checked flow is unchanged). On the last slide Next says **Finish**. Desktop shows the key hint (← → Space).
- **Navigation.** ← → Space / Shift+Space, PageUp/PageDown, Home/End; ↑ ↓ scroll a long slide. Arrows/Home/End also work while a button has focus (Space/Enter still belong to the button; fields, radios, sliders, tabs keep every key). Swipe left/right: ≥ 50 px and 1.5× the vertical travel; ignored when it starts within 16 px of a screen edge (OS back gesture) or inside anything that scrolls sideways (tables, KaTeX, code, or any element that really overflows horizontally).
- **Deep links.** `?slide=N` (1-based, with `?part=`): opened before first paint, "Opened at slide N · Start over". The URL follows the slide with `history.replaceState` (Next's documented integration), so a reload or a Back from practice returns to the same slide, while the browser's Back still leaves the lesson (a pushState per slide would make Back step through 21 slides on Android). `popstate` re-reads the slide. The proxy rewrite of `?part=` (ADR-017) ignores the extra parameter.
- **Resume.** Unchanged API/guest logic; `openingPosition()` decides: URL slide > saved slide; a reload (URL = saved) still says "Continuing from slide N"; finished parts open at the start. The note floats over the card (no layout shift) with Start over and Dismiss.
- **Completion screen** (lazy chunk, `CompletionScreen.tsx`): medal + a 12-piece CSS/SVG confetti burst (only under `prefers-reduced-motion: no-preference`), "Part 1 complete" / "Lesson complete", a headline from the quick checks, stats (slides done, checks right or answered), the detail line, "Saved on this device / to your account", secondary links (practice, flashcards, notes, chapter, go through it again). The primary next step (next part, else practice, else chapter) sits in the bottom bar. Completion is saved immediately on Finish (not after the 1.2 s debounce). Previous returns to the last slide.
- **Listen mode** (lazy chunk, `ListenPanel.tsx`): docked between the card and the bottom bar (never over content): Play/Pause, clock, **Auto-play next slide** (on by default), read-along with the spoken-word highlight in a short scroll area. The `<audio>` element stays in the player.
- **Announcements.** `aria-live="polite"`: "Slide 7 of 21: <heading>", "Part 1 complete".
- **Check results** reach the player through `CheckResultsProvider onResult` (CheckQuestion.tsx), which drives the bottom-bar Check and the summary.
- **Check question is a lazy chunk** (`CheckQuestionCard.tsx`: QuestionCard + practice wiring, ~10 KB gz). Check slides are never the first slides and the player mounts two slides ahead, so it loads before the student reaches the question (a 14rem placeholder holds the space meanwhile). Practice rewards and celebrations still come from `usePracticeAnswer`.

### Notes (`components/platform/notes/`)

- Reading layout: header (breadcrumb, title, "7 sections · 10 min read", Beta); **contents** inline on phones, a **sticky sidebar** from 1024 px with the section being read marked (`aria-current="location"`) and "18% read" with a bar; a **sticky reader bar** on phones under the top bar: "Sections" (opens the contents as a bottom sheet, the kit's Dialog `sheet`), the current section, "% read" and a progress bar (`role="progressbar"`).
- Scroll spy and progress are pure (`toc-model.ts`: `activeIndex`, `readingProgress`, `readingMinutes`, `stripNumber`); at the very end of the page the last section on screen counts.
- Callouts: **Formulas** (cobalt), **Key terms** (green), **Exam tips** (amber, with icon); section separators; 17 px body from 768 px, 1.7 line height, a 44rem column (~70 characters).
- Anchors land below the sticky bars (`scroll-margin-top` on sections, measured in the e2e on phone and desktop).
- End: "Back to chapter" and **"Next: Flashcards"** (else "Next: Practice"); the notes' report button stays. Server-rendered as before (LearningResource now also has `timeRequired`).

### Flashcards (`components/platform/flashcards/`)

- Same focus frame as the lesson: × to the chapter, "Flashcards: <chapter>" h1, "Card 3 of 32", Shuffle, options (report this card, start again, keys); a two-colour sorting bar (known / still learning).
- The card fills the stage; the visible face only (the e2e and screen readers see one face); a quick turn animation when the face changes (none under reduced motion); the answer side is tinted. Long faces scroll inside the card.
- Bottom bar: ‹ / Show answer / › on the question side; ‹ / **Still learning (1)** / **Know it (2)** / › on the answer side. Keys: Space/Enter flip, ← → move, 1/2 sort (answer side only).
- End of deck: a known-share ring, "Deck done!", counts, **Review N still learning**, notes, chapter; the bar offers Start again and **Practise this chapter**.
- Session state in a pure reducer (`deck-model.ts`); no flashcard progress API exists (see "API gaps").

## How to verify

```
# repo root
npm ci
npm run test:platform-web -- --maxWorkers=2      # includes __tests__/learn-mode.test.tsx
# platform/
npm ci
PW_WEB_PORT=3380 PW_FLAG_OFF_PORT=3381 npm run test:platform-web -w @soyl/e2e   # learn-mode.spec.ts + the rest; JS budget
```
By hand: `npm run dev -w @soyl/api` and `npm run dev` (flag on), open `/learn/cbse/10/science/ch01/lesson` at 360×640 in both themes; try swipe, keys, `?slide=7`, the options menu, Finish; `/notes` (Sections, sidebar at 1280 px); `/flashcards` (Space, 1, 2).

## Gates

Final head 8f83d7c (branch merged with 32453de), this worktree, 2026-10-29, Windows 11, 8 GB; every heavy job through `heavy.sh`, one at a time.

| Gate | Result |
|---|---|
| `npm run lint` (root) | exit 0, no findings |
| `npm run test:platform-web -- --maxWorkers=2` | 22 files, **456 passed** (includes `learn-mode.test.tsx`, 24 tests) |
| `npm run test:platform-ui -- --maxWorkers=2` | 6 files, **646 passed** |
| `npm run build` (root) | exit 0 |
| `npm run typecheck` (platform/) | exit 0 |
| `PW_WEB_PORT=3390 PW_FLAG_OFF_PORT=3391 npm run test:platform-web -w @soyl/e2e` | flag ON: **106 passed, 20 failed**; flag OFF: **57 passed**; JS budget PASSED. The 20 failures are every test from #107 on (`review.spec`, `tests.spec`): the `next start` server on 3390 stopped answering at that point (`net::ERR_CONNECTION_REFUSED`, ~0.3 s each). All 27 learn-mode/learning tests and everything before #107 passed. |
| Re-run of those two specs (`--on-only review.spec.ts tests.spec.ts`, fresh flag-on build) | **21 passed**, `[platform-web] PASSED` |
| `npm run marketing:diff -w @soyl/e2e -- --base origin/platform/main` | **48 passed**: "HEAD renders the marketing site identically to its merge-base" (merge-base 94b8ddb) |
| gitleaks `git --log-opts="origin/platform/main..HEAD"` | no leaks found |

Earlier full runs on this branch (before the 32453de merge): 110 passed + 1 failed (dashboard spec, an API response timeout), and 108 + 3 failed on 919ffbb (`ai.spec` 429 rate limit, fixed on main by e357ad6; listen-mode axe `scrollable-region-focusable` and the lesson at 200.6 KB, both fixed here in 19a001a). The live-mock test failed once in the run after the merge (5-minute timeout) and passed in the re-run above.

## JS budget (first-load KB gz)

Measured by `bundle.mjs` in the e2e run (360 px, `next start`, flag on). "Before" for these pages comes from two runs: the dashboard run on 919ffbb's web code (this task's starting point) and the avatars-assets run at 3eeec9a, which is the web code of 32453de before main's lazy AI dialogs. "After" is this branch at its final head (merged with 32453de). Main's own changes lowered the shared shell by about 7.6 KB (hub 183.8 → 176.2), so the fair comparison is each page's size **relative to the hub** (same shell, same run).

| Page | Before (919ffbb) | Before (32453de web, 3eeec9a) | After (this branch) | vs hub before → after |
|---|---|---|---|---|
| hub (reference, unchanged) | 183.4 | 183.8 | 176.2 | 0 → 0 |
| lesson | 197.7 | 198.3 | **181.4** | +14.5 → **+5.2** (−9.3) |
| lesson part 2 | 197.7 | 198.3 | **181.4** | +14.5 → **+5.2** (−9.3) |
| notes | 181.3 | 181.4 | **176.1** | −2.4 → **−0.1** (+2.3) |
| notes (Hindi) | 181.3 | 181.4 | **176.1** | −2.4 → **−0.1** (+2.3) |
| flashcards | 182.1 | 182.9 | **178.7** | −0.9 → **+2.5** (+3.4) |

Every page in the run is ≤ 200 KB gz; the heaviest are test player 189.3, me 189.0, dashboard 188.7, test result 187.8, practice 187.7 (full table in the run log). Lazy chunks added: completion screen, listen panel, the check-question card (QuestionCard + practice wiring, about 10 KB gz, loaded two slides before a check slide). Notes grew by its client islands (contents scroll-spy, reader bar, the kit Dialog for the sheet); flashcards by the focus frame and reducer.

## Tests added / changed

- **Unit, new** `components/platform/__tests__/learn-mode.test.tsx` (24 tests): keys (incl. focused buttons vs fields), swipe thresholds and edge gestures, sideways scrollers, deep-link parse/format, opening position (URL vs saved vs reload vs finished), completion summary (all right, some, self-marked, none, no checks); the player strip (h1, close link, part switcher popover with Escape, options with report + outline jump, progress value), ↓/↑ scroll the card, edge swipes ignored, deep link + URL follows + popstate, guest resume + Start over, bottom-bar Check submits the card's form, Finish → completion → next part link → Previous back; notes contents ids/labels, number stripping, scroll spy (incl. end of page), reading progress, reading time, NotesToc + NotesReaderBar (active section on scroll, Sections sheet); flashcard reducer (flip, sort, wrap to the next unsorted card, review, restart, shuffle accepts only permutations, clamped moves), keys, and the deck (1/2 keys, end-of-deck summary and practice link, review round).
- **Unit, updated** `m2-components.test.tsx`: the URL is reset before each test (the player now writes `?slide=`); End is followed by Next (Finish) and the completion text is "Lesson complete" + "Saved on this device"; the narration Play button and the completion screen are found asynchronously (lazy chunks). Every assertion kept.
- **e2e, new** `platform/e2e/tests/platform/web/learn-mode.spec.ts`: 360×640 and 360×760 × light/dark (h1 visible, theme applied, strip ≤ 58 px, no breadcrumb, slides 1–4 each inside the strip/bottom-bar band, `scrollHeight ≤ innerHeight + 1`, no horizontal scroll, `innerWidth === 360`, 44 px targets, axe); a long slide scrolls inside its card (More below, focusable, ↓ scrolls, page still does not); navigation by buttons, keys, Shift+Space, swipe both ways, edge swipe ignored, announcer, URL follows, deep link to part 2 slide 3, part switch, Finish → completion (summary, saved, no page scroll, axe), Previous/Next around it, next part, × to the hub; notes Sections sheet → #s3 below the sticky bars, reading progress, end links, desktop sidebar marks the followed section and stays in view, axe light/dark, #s4 deep link clear of the bar; flashcards fit 360×640, flip by Space/tap/button, 1/2 sorting (ignored on the question side), arrows, axe light/dark, the whole deck → end screen, practice link, review round; owner screenshots.
- **e2e, updated** `learning.spec.ts`: End is followed by ArrowRight (Finish) before the completion check; the report-a-mistake test opens "Lesson options" first. Intent and assertions unchanged.

## Screenshots

`docs/platform/design/learn-mode/before/` (live www.soylai.com, 2026-10-29) and `after/` (this branch, e2e against the local API): `{desktop,mobile}-{light,dark}-{lesson,lesson-end,notes,flashcards}.png` (mobile 360×760, desktop 1280×860/900).

## Shell follow-ups (not changed here; `components/platform/shell/**` belongs to another agent)

1. **Hide the app top bar on lesson and flashcards** (`isFocusRoute`), at least under 768 px. The strip already has × back to the chapter; this gives the slide another 60 px on a phone. `useFocusTop` picks the change up with no code change (the view pins to wherever the content starts).
2. **Do not render the app footer on focus routes.** Today it sits under the pinned view (hidden, but its links stay in the Tab order after the bottom bar). Once it is gone, the player could also drop `position: fixed` for an in-flow `height: calc(100dvh − top)`.
3. The notes reader bar sticks at `top: 60px` (the top bar's height, as `scroll-padding-top: 4.5rem` already assumes). A `--p-appbar-h` custom property on the shell would let both read one value.
4. Kit/slides (design-system, read-only here): the slide frame's `min-height: 420px/540px` and the per-slide "n / N" could become options of `SlideFrame` (`fill`, no position) instead of being overridden from the player's CSS.

## API gaps (the web works without them)

- **Flashcard progress**: no endpoint stores "known / still learning" per card, so sorting is per visit (session state). Suggested: `PUT /v1/me/flashcards/{chapterId}` `{ cardId, mark }` and `GET` returning the marks (+ guest merge), which would also give the chapter hub's learning path a real "Flashcards" state.
- **Notes progress**: no "read" state for notes (the hub step shows "Not started" until there is one); `readingProgress` already computes the value to send.
- **Lesson check results**: the completion summary counts this visit's answers only; a `GET` of the part's check answers would let a resumed part show earlier ones.

## Known gaps / follow-ups

- Nothing here is deployed. The lesson-progress response's badges are still announced with the existing toast only; a `celebrate({ kind: 'badge' })` there (as practice does) is a small follow-up.
- Listen mode was verified by the existing listen e2e (mock TTS audio); dev content has no audio, so the dock is not in the owner screenshots.
- Swipe uses touchstart/touchend (no drag-follow animation); a follow-the-finger transition would need pointer tracking and was left out to keep the bundle small.

## Needs from owner

None. Review the before/after screenshots.
