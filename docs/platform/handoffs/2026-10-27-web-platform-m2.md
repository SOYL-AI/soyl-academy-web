# web-platform — M2 learning core UI (hub, slide player, notes, flashcards, practice, report, /admin) — 2026-10-27

Status: **done**, green (stand-in) per D-010. Every flow ran against the real local API (`npm run dev -w @soyl/api`:
embedded PostgreSQL, all 20 authored chapters published at start, mock providers) and a production `next start`.
Nothing was deployed (D-025).

Branch: `platform/web-platform/m2` (worktree `C:/Users/Prabhu/soyl-wt/web-platform-m2`), with `origin/platform/main`
merged in (incl. edbbcbd WEB-11-safe negative test and 470fc70 `vercel.json`, D-030).

## What changed

| Area | Files |
|---|---|
| Chapter hub | `app/(platform)/learn/[board]/[class]/[subject]/[chapter]/page.tsx` (ISR, public `GET /v1/chapters/:id`), `components/platform/learn/HubProgress.tsx` (private half: members `GET /v1/me/progress/chapters/:id`, guests `soyl_guest_v1`), `hub.module.css`, `LearnClient.tsx` (tests card lists the chapter tests) |
| Slide player | `…/[chapter]/lesson/page.tsx`, `…/lesson/[part]/page.tsx`, `components/platform/lesson/{LessonView,SlidePlayer,CheckQuestion,player-logic,load}.ts(x)`, `lesson.module.css`; `proxy.ts` + `components/platform/server/lesson-rewrite.ts` (`?part=N` → ISR part route) |
| Notes | `…/[chapter]/notes/page.tsx`, `components/platform/notes/NotesView.tsx` (server-rendered, contents list, LearningResource JSON-LD) |
| Flashcards | `…/[chapter]/flashcards/page.tsx`, `components/platform/flashcards/{FlashcardsView,FlashcardDeck}.tsx` |
| Practice | `…/[chapter]/practice/page.tsx`, `components/platform/practice/{PracticeApp,usePracticeAnswer}.ts(x)` |
| Question renderers (shared, M3 reuses) | `components/platform/ui/question/{model.ts,slots.tsx,QuestionCard.tsx,inputs.tsx,OrderingInput.tsx,AnswerReveal.tsx,RichText.tsx,map-places.ts,question.module.css}`, fixtures `ui/__fixtures__/questions.ts` |
| Renderer upgrades | `ui/visual/{GeometryVisual,PlotVisual,Visual,svg-utils}.tsx`, `visual.module.css` (geometry lines/rays/ticks/arrows/arcs/highlight; plot vlines/hlines/on_curve; SVG label sub/superscripts, primes, inline-maths subset; compact tables incl. Punnett squares); `ui/render/{remark-soyl.ts,Markdown.tsx,render.module.css}` (`++underline++` → `<ins>`); `ui/kit/Icon.tsx` (9 icons) |
| Report a mistake | `components/platform/report/{ReportMistake,ReportDialog}.tsx` (button everywhere; dialog lazy) |
| /admin | `app/(platform)/admin/page.tsx` (per request, nonce CSP), `components/platform/admin/{AdminApp,QrCode}.tsx` |
| Content readers | `components/platform/server/{content,chapter-route}.ts`, `components/platform/lib/lesson-links.ts`; `server/catalog.ts` (`serverApi(cacheOpts)`) |
| Guest storage | `components/platform/lib/guest-storage.ts`: lessons per (chapter, part) + mode; merge on any entry; full clear after merge |
| API client | `platform/shared/api-client/index.ts`: `put()`, 201 typing, M2 type exports (schema already regenerated at 39d3d05; drift test unchanged) |
| Removed | `…/[chapter]/[view]/page.tsx` (M1 "coming soon" placeholder) |
| Tests | `components/platform/__tests__/{lesson-logic.test.ts,m2-components.test.tsx}`, `guest-storage.test.ts` updated; `components/platform/ui/__tests__/{question.test.tsx,visual-v2.test.tsx}`; e2e `platform/e2e/tests/platform/web/{learning.spec.ts,bundle.mjs}`, `run.mjs`/`env.mjs` (mock narration + fake CDN, route-cache clearing), M1 specs updated (`pages`, `guest`, `flag-off`) |
| Root | `package.json`/lockfile: `qrcode-generator` 2.0.4 (exact, ADR-013 §5) |
| ADR | [ADR-013](../adr/013-platform-web-learning-core.md) |

RESULTS_PLACEHOLDER
