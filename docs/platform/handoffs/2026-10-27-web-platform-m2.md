# web-platform — M2 learning core UI (hub, slide player, notes, flashcards, practice, report, /admin) — 2026-10-27

Status: **done**, green (stand-in) per D-010. Every flow ran against the real local API (`npm run dev -w @soyl/api`:
embedded PostgreSQL, all 20 authored chapters published at start, mock providers) and a production `next start`.
Nothing was deployed (D-025).

Branch: `platform/web-platform/m2` (worktree `C:/Users/Prabhu/soyl-wt/web-platform-m2`). `origin/platform/main` was last
merged at f29d27f: backend-api M3, prod-readiness (`GET /v1/auth/methods`), catalog QA, edbbcbd (WEB-11-safe negative
test) and 470fc70 (`vercel.json`, D-030). The API client needed no new regeneration: platform/main had already
regenerated `schema.gen.ts`, regenerating gives no diff, and the drift test passes (20/20).

## What changed

| Area | Files |
|---|---|
| Chapter hub | `app/(platform)/learn/[board]/[class]/[subject]/[chapter]/page.tsx`: ISR, public `GET /v1/chapters/:id`.<br>`components/platform/learn/HubProgress.tsx`: the private half. Members call `GET /v1/me/progress/chapters/:id`; guests read `soyl_guest_v1`.<br>`hub.module.css`.<br>`LearnClient.tsx`: the tests card now lists the chapter's tests. |
| Slide player | `…/[chapter]/lesson/page.tsx` and `…/lesson/[part]/page.tsx`.<br>`components/platform/lesson/{LessonView,SlidePlayer,CheckQuestion,player-logic,load}.ts(x)`, `lesson.module.css`.<br>`proxy.ts` + `components/platform/server/lesson-rewrite.ts`: `?part=N` → the ISR part route. |
| Notes | `…/[chapter]/notes/page.tsx`.<br>`components/platform/notes/NotesView.tsx`: server-rendered, contents list, LearningResource JSON-LD. |
| Flashcards | `…/[chapter]/flashcards/page.tsx`, `components/platform/flashcards/{FlashcardsView,FlashcardDeck}.tsx`. |
| Practice | `…/[chapter]/practice/page.tsx`, `components/platform/practice/{PracticeApp,usePracticeAnswer}.ts(x)`. |
| Question renderers (shared; the M3 test player reuses them) | `components/platform/ui/question/{model.ts,slots.tsx,QuestionCard.tsx,inputs.tsx,OrderingInput.tsx,AnswerReveal.tsx,RichText.tsx,map-places.ts,question.module.css}`.<br>Fixtures: `ui/__fixtures__/questions.ts`. |
| Renderer upgrades | `ui/visual/{GeometryVisual,PlotVisual,Visual,svg-utils}.tsx`, `visual.module.css`:<br>- geometry: lines, rays, ticks, arrows, arcs, highlight<br>- plot: vlines, hlines, on_curve<br>- SVG labels: sub/superscripts, primes, a small inline-maths subset<br>- compact tables, including Punnett squares<br>`ui/render/{remark-soyl.ts,Markdown.tsx,render.module.css}`: `++underline++` → `<ins>`.<br>`ui/kit/Icon.tsx`: 9 new icons. |
| Report a mistake | `components/platform/report/{ReportMistake,ReportDialog}.tsx`: the button sits everywhere; the dialog loads lazily. |
| /admin | `app/(platform)/admin/page.tsx`: rendered per request, so the nonce CSP applies.<br>`components/platform/admin/{AdminApp,QrCode}.tsx`. |
| Login sheet | `components/platform/auth/LoginSheet.tsx` shows only the methods `GET /v1/auth/methods` enables:<br>- one OTP method → no tabs<br>- Google disabled → no Google button and no divider<br>- the "SMS paused" hint names only enabled methods<br>- if the call fails, all three are shown (the API enforces anyway) |
| Content readers | `components/platform/server/{content,chapter-route}.ts`, `components/platform/lib/lesson-links.ts`.<br>`server/catalog.ts`: `serverApi(cacheOpts)`. |
| Guest storage | `components/platform/lib/guest-storage.ts`: lessons kept per (chapter, part) with mode; any entry triggers the merge; the whole key is cleared after a merge. |
| API client | `platform/shared/api-client/index.ts`: `put()`, typing for 201 responses, and exports for the M2 and `AuthMethods` types. |
| Removed | `…/[chapter]/[view]/page.tsx`: the M1 "coming soon" placeholder. |
| Tests | Unit:<br>- `components/platform/__tests__/{lesson-logic.test.ts,m2-components.test.tsx}`; `guest-storage.test.ts` updated<br>- `components/platform/ui/__tests__/{question.test.tsx,visual-v2.test.tsx}`<br>e2e:<br>- `platform/e2e/tests/platform/web/{learning.spec.ts,bundle.mjs}`<br>- `run.mjs` and `env.mjs`: mock narration, fake CDN, route-cache clearing<br>- M1 specs updated: `pages`, `guest`, `flag-off` |
| Root | `package.json` and lockfile: `qrcode-generator` 2.0.4, exact version (ADR-013 §5). |
| ADR | [ADR-013](../adr/013-platform-web-learning-core.md) |

## Requirement coverage

| # | Deliverable | Where / evidence |
|---|---|---|
| 1 | Hub: public data + signed-in progress; links to parts, notes, flashcards, practice; tests; report | Hub page + `HubProgress`.<br>e2e "chapter hub". The guest-merge e2e checks member progress on the hub.<br>Tests: the backend M3 API exists but there is no web test player yet. The card lists the chapter's tests (title, marks, minutes) with "Log in to take tests" or "coming soon". |
| 2 | Slide player | `SlidePlayer`. Requirements:<br>- keys and swipe<br>- progress bar<br>- read + listen with highlight<br>- resume (guest storage, or a debounced PUT for members)<br>- prefetch of the next 2 slides<br>- inline check slides<br>- completion<br>- 360 px<br>Unit tests: keys, swipe, mounted window, prefetch, guest and member resume, one PUT per settled slide with `completed` on the last, listen + highlight, unsupported-format message.<br>e2e: lesson and listen tests. |
| 3 | Notes, flashcards, practice | - Notes: ISR, SEO, JSON-LD.<br>- Flashcards: flip, shuffle, known/still learning.<br>- Practice: filters, cursor paging, one question at a time, checked on the server; solution and marking scheme shown after answering; written answers self-marked; guest progress kept locally.<br>e2e covers each: notes (maths, chemistry, diagrams, Hindi), flashcards (maths, Hindi), practice per objective type, self-mark PATCH, guest → merge. |
| 4 | Every question type incl. v2, `++underline++`, passage_origin, shared + XSS tests | `ui/question/*`.<br>`question.test.tsx`, 96 tests:<br>- every type and the model<br>- the XSS corpus through stems, options and passages (server render)<br>- the XSS corpus through revealed keys (client `RichText`)<br>- underline |
| 5 | Geometry / plot / tables / SVG text | `ui/visual/*`.<br>`visual-v2.test.tsx`, 30 tests. They include rendering every authored geometry, plot and table visual: each must be inert, with no raw TeX left in SVG text. |
| 6 | Report a mistake | On the hub, every slide (player bar), each notes section and the notes page, each flashcard, and each question.<br>Unit tests: request body, rate-limit text.<br>e2e: 201, with `itemRef` = slide id. |
| 7 | /admin with MFA + reports queue, role-gated | `AdminApp`.<br>Unit tests:<br>- guest and student gates<br>- enrol → confirm → recovery codes → queue; a comment containing XSS shows as text<br>- verify with a recovery code<br>- the QR matrix<br>e2e: guest prompt, student refused (API 403), no violations under the nonce CSP. |
| 8 | ≤ 200 KB gz, players lazy, LCP-friendly | See Bundle. Slides and notes are server HTML; the first slide is in the HTML. |
| 9 | Unit + e2e (real API + `next start`), axe, no horizontal scroll, no third-party requests, flag-off 404s, marketing regression + D-028 | See Results. |

## Results (final runs, Windows 11, Node 24.15, HEAD = this commit's parent b694c1b + handoff)

```
npm run lint                     → eslint, exit 0, no output
npm run build                    → ✓ Compiled successfully in 66s; ✓ Generating static pages (37/37); ƒ Proxy (Middleware)
npm run test:platform-web        → Test Files 6 passed (6) · Tests 124 passed (124)
npm run test:platform-ui         → Test Files 6 passed (6) · Tests 548 passed (548)
platform/: npx vitest run --root shared api-client → 1 file, 20 passed (client drift test)
npm run test:platform-web -w @soyl/e2e   (builds flag ON, real API + next start; then flag OFF)
  [platform-web] Playwright: flows with the flag ON
  PASSED: every page ≤ 200 KB gz first-load JS
    47 passed (6.0m)
  [platform-web] Playwright: flag OFF
    20 passed (55.5s)
  [platform-web] PASSED
npm run marketing:regression -w @soyl/e2e -- --skip-lighthouse
  48 passed (50.6s)
  marketing regression PASSED: no visual diffs, all routes as expected
npm run marketing:diff -w @soyl/e2e -- --lighthouse   (D-028: base cd33ca7 = merge-base with main, vs HEAD dc3d777)
  44 + 48 passed; "differential marketing regression PASSED: HEAD renders the marketing site identically to its merge-base"
```

The 17 M2 e2e flows (`learning.spec.ts`), all passing:
- the chapter hub
- the guest lesson: keyboard and swipe, a check slide answered inline, resume after a reload, `?part=2`, `?part=9` → 404
- listen mode: CDN narration, and the highlight advancing
- notes (maths, chemistry, diagrams, JSON-LD, Hindi)
- flashcards (maths and Hindi)
- practice: each of mcq, multi-select, assertion-reason, true-false, numerical, fill-blank and match answered once right and once wrong (7 tests)
- a written answer self-marked by a member (PATCH 200)
- guest practice merged at login
- report a mistake
- the /admin gate
- the route JS budget

Every page checked with axe has no serious or critical violations, and no horizontal scroll at 360 px. The fixture
fails on any third-party request, CSP violation or page error. The listen test explicitly allows only the CDN origin.
The flag-off suite now also covers notes, flashcards, practice, `lesson?part=2`, `lesson/2`, `/admin` and the
chapters API.

D-028 Lighthouse, mobile performance (base → HEAD; desktop 99–100 both):

| Page | Base | HEAD |
|---|---|---|
| `/` | 82 | 82 |
| `/schools` | 86 | 85 |
| `/students` | 83 | 86 |
| `/parents` | 85 | 85 |
| `/future-builders` | 85 | 88 |
| `/journal` | 86 | 84 |
| `/about` | 77 | 84 |
| `/contact` | 85 | 86 |

Accessibility, best practices and SEO are 100 on both. Every page is within 5 points.

## Bundle

First-load JS, gzip -9, measured by `platform/e2e/tests/platform/web/bundle.mjs` against `next start` with the flag on:

| Page | First load (KB gz) | Fetched after load, no interaction (KB gz) |
|---|---|---|
| hub `/learn/cbse/10/science/ch01` | 168.3 | 9.0 |
| lesson (part 1) | 184.8 | 9.0 |
| lesson `?part=2` | 184.8 | 20.2 |
| notes | 169.3 | 20.2 |
| flashcards | 169.6 | 9.0 |
| practice | 179.2 | 183.2 (renderer chunk: KaTeX, react-markdown, visuals) |
| notes (Hindi) | 169.3 | 9.0 |
| admin | 168.9 | 17.2 |
| `/learn` (M1) | 166.9 | 7.4 |

- About 157 KB of every number is the framework and root layout, which marketing pages load too.
- The ≤ 200 KB budget passes on every page; the e2e fails if it does not.
- Fixed along the way: `QuestionCard` value-imported a helper from `slots.tsx`. That pulled KaTeX, react-markdown and smiles into the lesson's first load (394 → 185 KB).

**Marketing impact**
- `/` first-load JS is 266 B gz smaller than platform/main 0dee08c.
- The marketing CSS is byte-identical (md5 300b26841d34).
- A Tailwind leak was found and fixed: the string `'overline'` in `svg-utils.ts` added a `.overline` utility to the marketing stylesheet (+40 B). It is now assembled at run time.
- The marketing regression reports "+1.4 KB gz vs the stored baseline" on every page. That predates this branch; platform/main shows the same.

## Screenshots (360 px)

They are gitignored and regenerated by the e2e, in `platform/e2e/test-results/platform-web/screenshots/`:
- Hub and lesson: `hub-360.png`, `lesson-read-360.png`, `lesson-check-answered-360.png`, `lesson-listen-360.png`.
- Notes: `notes-360.png`, `notes-hindi-360.png`.
- Flashcards: `flashcards-360.png`, `flashcards-maths-360.png`, `flashcards-hindi-360.png`.
- Practice: `practice-mcq-360.png`, `practice-numerical-360.png`, `practice-fill-blank-360.png`, `practice-match-360.png`, `practice-written-self-mark-360.png`.
- Other: `report-dialog-360.png`, `admin-guest-360.png`, plus the M1 set.

## Deviations and decisions

1. **`?part=N` goes through a proxy rewrite** to `lesson/[part]`, so every part is ISR (ADR-013 §1). This is `proxy.ts`'s first rewrite, and it applies only to platform lesson URLs.
2. **Listen mode uses recorded audio only; no `speechSynthesis`** (ADR-013 §2).
   - No authored deck has audio yet, so dev and production show "Read mode" today.
   - The e2e generates mock narration for Science ch01 (pipeline `tts`, silent Ogg Opus) and serves it from a fake CDN origin.
3. **Highlight timing is estimated** from `duration_ms`, by word length; no word timings are stored yet.
4. **Rendering split** (ADR-013 §3): content is rendered on the server as slots. Only post-answer keys and practice questions render in the browser, through a lazy chunk.
5. **Hub "Report a mistake"** sends `contentType: 'notes', itemRef: 'hub'`; the API has no chapter-level type.
6. **New root dependency:** `qrcode-generator` 2.0.4 (MIT, zero dependencies) for the TOTP QR code, loaded only in a lazy admin chunk (ADR-013 §5).
7. **Match questions** label items with the content's own ids (1–4 / P–S), so solution text such as "1 → q" lines up.
8. **e2e harness:**
   - `run.mjs` now generates the mock audio.
   - It deletes `.next/server/route-cache` after each build; otherwise `next start` served ISR HTML from an earlier build.
   - M1 specs were updated for M2 behaviour: the lesson is no longer "coming soon", guest data is fully cleared after the merge, and the flag-off list has more routes.
9. **The M1 placeholder route** `[chapter]/[view]` was removed. Unknown views are still 404 (covered by e2e).

## What the M3 test player needs from this work

- **Reuse `components/platform/ui/question/`:** `slots.tsx` (server) and the inputs.
- **Add a controlled test mode to `QuestionCard`** (not built yet):
  - `draft`/`onDraftChange` props, for autosave on every change;
  - no "Check answer" button and no reveal until the result page;
  - `fromResponse(question, saved) → Draft`, the inverse of `toResponse`, to resume an attempt (`model.ts` is the place).
- **Results page:** can use `Verdict`, `KeyDetails` and `SelfMark` from `AnswerReveal.tsx` directly.
- **Internal choice:** case/source items already send `{parts:[{id, alternative?, response}]}`.
- **Fixtures:** every type is in `ui/__fixtures__/questions.ts`.
- **Hub tests card:** it lists chapter tests from the hub. Point it at the test series page once that page exists.

## Known gaps / follow-ups

- **Download deck as PDF is not built.** ADR-013 §6 proposes a worker job that writes a cached PDF per deck version.
- **iOS Safari below 18.4 cannot play Ogg Opus.** Listen is disabled there, with a message. Request to pipeline-engineer:
  - a fallback rendition `slide.audio.fallback` (MP3);
  - word-boundary timings, for exact highlighting.
- **Staff MFA is not exercised end to end.**
  - Staff sign in with Google and a staff `hd`, and the dev mock OIDC issues `hd` only through its programmatic queue.
  - Component tests cover the flow.
  - Request to backend-api: in local only, let the mock map a staff-domain `login_hint` to `hd`, so the e2e can sign in a reviewer.
- **Map questions** are a list of labelled fields with suggestions. Outline SVG maps per `map_id` are not built; the `renderMap` slot is ready.
- **Some v2 types have no content yet:** writing, map, code-output and ordering. Component tests cover them; the e2e cannot.
- **Subject page progress** for members still shows device progress only; `GET /v1/me/progress` could feed it.
- **Platform sitemap** still lists only /learn, class and subject pages. Chapter and notes URLs need the bulk catalog endpoint (M1 request 6).
- **Lighthouse for platform routes** is not measured. Budgets are checked by bundle size; axe and layout by the e2e.
- **Vitest worker flake.** On this busy machine vitest sometimes fails to start a worker ("Timeout waiting for worker to respond"). A rerun, or `--maxWorkers=2`, is green.

## Needs from owner

None new.
