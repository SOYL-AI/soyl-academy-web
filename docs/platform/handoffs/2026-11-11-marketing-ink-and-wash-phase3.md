# marketing — Ink and wash, phase 3 (plans and parents) — 2026-11-11

Status: done (branch `marketing/ink-and-wash-phase3`, from `marketing/ink-and-wash` at c2dcfaad). Not pushed, not
merged, not deployed; the visual baseline was not re-captured.

Plan: `docs/redesign-ink-and-wash.md` §6 phase 3, the §3.3 rows for `/plans` and `/parents`, §4 devices 2, 5, 6, 7
and 8 and the guardrail under §4.

## What changed

**Computations, every number from `platform/shared/config`** (`lib/pricing/`, `npm run test:pricing`):

- `per-day.ts`: a price in a parent's units. A month is spread over 30 days, a year over 365, the Board Exam Pass
  over the IST days it has left, today included (the homepage clock's rule). Nearest 10 paise; whole rupees from
  ₹10 up. **Dependency-free** (type-only imports), because the `/plans` cards import it in the browser and
  `plans.ts` carries zod; a test checks its imports. `istDay`, `daysUntil` and `perDayLabel` moved here from
  `lib/home/numbers.ts`, which re-exports them (homepage unchanged).
- `price-rows.ts`: every paid price in `plans.ts` with its plan's credits and per-day figure (server side).
- `refill.ts`: the free allowance (`plans.ts`), "midnight, India time" (`CREDIT_RESET_TIME_ZONE`), the learning
  bonuses (`credit-bonuses.ts`), and how many drops draw an amount.
- `report-sample.ts`: the sample weekly report (see "Known gaps" 1), typed field by field against
  `GET /v1/me/dashboard` and `GET /v1/me/credits/history`; made-up figures, real CBSE 10 chapter titles (a test
  reads `platform/catalog`); `reportPlans()` names the plans with `parent_weekly_report` ("Pro and the Board Exam
  Pass").
- `pass.ts`: days to a first paper only from official date sheets (none yet, so the month line), and the pass's
  features as a sentence from `plans.ts`.
- `plans-faq.ts`: four answers that rest on existing rules; no refund promise.
- Fix: `perDayLabel` printed "₹10.00" when 996 paise rounded up (Pro monthly hits it); now "₹10".

**Shared components** (new files in `components/ink/`, each with its own CSS module that declares the layer order
first): `PerDay` and `PriceList`, `CreditsMeter`, `ReportSample`, `LedgerColumns`. They read the platform tokens
when inside the app (`var(--p-ink, var(--color-ink))` and so on), so the same component follows the app's light and
dark themes on `/plans` (and phase 4's paper and slate, whose token names are unchanged) and the paper tokens on
`/parents`. Rupee figures are Zodiak. In the app's dark theme the pigment pools are lifted with a filter (there
are no chalk pools).

**`/plans`** (`app/(platform)/plans/page.tsx`, `components/platform/plans/PlansGuide.tsx` + `guide.module.css`): above
the cards, a server component (no client JS): "Learning is free. AI has a meter." (the ledger, with the free
allowance as 50 painted drops, the midnight refill and the bonuses); "Board exams begin in February." with the
pass "₹499 once. About ₹3.50 a day until 31 March 2027." and its features; "The weekly report" with the labelled
sample; "Before you choose" (four questions) and the "Cancellation and refund policy" link. A "Go to the plans"
link under the page title jumps to "Choose a plan", where the cards are.

`PlansClient` keeps Razorpay, Checkout, the API calls, the polling and `plans-copy.ts` exactly as they were.
Labels only: while billing is off the buttons say **"Opens soon"** (was "Coming soon"); the notice says "Plans open
soon. Until then everyone gets free AI credits every day, and lessons, practice and tests are always free."; the
activation line lost its em dash. Each paid card shows "About ₹X a day" under its price, from the API's own amount
(`data-testid="per-day-<plan>"`). Prices are set in Zodiak (Switzer, the app's face after phase 4, has no ₹).

The billing state still comes only from the API (`plans.billingEnabled`, which is `readFlags().billingEnabled` on
the API). The web does not read `BILLING_ENABLED` itself: in e2e only the API has it on, and in production a
second copy of the flag could contradict the buttons. Nothing in `PlansGuide` depends on it.

**`/parents`** (`app/parents/page.tsx`, copy and sources in `content/parents.ts`): rebuilt in the language.

1. "See your child's week." / "One short report a week: what they studied and practised, and where it got hard."
   and one action: **See the plans** (`/plans`, flag on) or **Book a demo** (`PRIMARY_CTA`, flag off), beside
   `parents-reading` printed with `InkPhoto`. No number, price or claim sits beside the child's face.
2. "This is the weekly report." with the `ReportSample` on the soft panel wash, and the plans it comes with.
3. "Learning is free. AI has a meter." `LedgerColumns` with the `CreditsMeter`; flag on, every plan's prices with
   the per-day figure (`PriceList`) and a quiet "See the plans"; flag off, no prices and "Free lessons for Classes
   7 to 12 open soon." (the homepage's flag-off line).
4. "You decide what AI your child can use." Three steps (learning never waits; AI help waits for a parent's yes by
   a code sent to their email; the withdraw link switches it off and deletes AI conversations and photos) and six
   plain lines (age group only; the parent's address not kept; email-only accounts; made-up public names;
   moderation of every prompt and answer, AI pauses if the check cannot run; no advertising, third-party tracking
   or chat on the learning pages). Each rests on D-014, D-039, ADR-015, ADR-022, PII.md or CONTEXT §12; the
   sources are in `content/parents.ts`. Not said on purpose: where data is stored (AI runs outside Central India,
   ADR-008) and how long AI data is kept (pending sign-off, F-015).

Retired from the page: the AI-generated `student_thinking_portrait` and the Future Builders presentation shot (the
files stay: `/method`, `/future-builders` and the journal use them) and the empty `media.parents` product-shot
slot. SEO entry (`lib/seo/pages.ts`) rewritten for the new subject: "For Parents: See What Your Child Did This
Week". `export const revalidate = 3600` so the pass's per-day figure follows the date.

## Commits

```
b760fc6a fix(marketing): a per-day price that rounds to ten rupees reads ₹10, not ₹10.00
66b6f64f feat(platform-web): prices per day, the midnight refill, the sample report and the plans FAQ from config
6d9bdaed feat(marketing): PerDay, CreditsMeter, ReportSample and LedgerColumns in components/ink
dd339642 feat(platform-web): /plans lets a parent decide in a minute (plan §3.3, phase 3)
7968d50c feat(marketing): /parents shows the payer what they receive (plan §3.3, phase 3)
```
(plus this note)

## How to verify

```
npm ci
npm run lint
npm run test:pricing            # 43 tests
npm run test:home               # 14 tests
npm run test:platform-web       # 464 tests
NEXT_PUBLIC_PLATFORM_ENABLED=true npm run build && NEXT_PUBLIC_PLATFORM_ENABLED=true npx next start -p 3321 -H 127.0.0.1
npm run build && npx next start -p 3321 -H 127.0.0.1
```

Run on 2026-11-11 (Windows 11, Node 24, Chrome via Python Playwright):

- `npm run lint`: clean. `npm run test:pricing` 43/43, `npm run test:home` 14/14, `npm run test:platform-web`
  464/464 (23 files).
- `NEXT_PUBLIC_PLATFORM_ENABLED=true npm run build`: exit 0 (TypeScript passed, 116 pages). `npm run build` (flag
  off): exit 0 (52 pages).
- Flag on, `next start`: `/plans` 200, `/parents` 200. No horizontal scroll at 360, 390, 768, 1024 and 1440 on both
  pages, and document height identical at load and after scrolling to the bottom, both with the cards' error
  state (no platform API running) and with the cards rendered (Playwright answered `/api/platform/v1/plans` with
  the config's plans, billing off). Headlines two lines or fewer at 390, 768 and 1440.
- Flag off, `next start`: `/parents` 200, `/plans` 404. Same width and height checks on `/parents` (pass). No
  `/learn`, `/tests`, `/ask`, `/plans`, `/me`, `/leaderboard`, `/dashboard`, `/store` or `/coins` href on
  `/parents` or on any of the other 20 routes with status 200 in `platform/e2e/marketing/routes.ts`.
- Looked at by eye: `/plans` at 390 and 1440 in light and dark, `/parents` at 390 and 1440 with the flag on and
  off. Fixed from that look: the free column stretched to the metered column's height (now top-aligned), the
  hero headline ran to three lines (now "See your child's week."), the pools were muddy on the dark theme.

Not run: the platform e2e suites (`npm run test:platform-web -w @soyl/e2e`, which builds against a real local API;
`plans.spec.ts` and `review.spec.ts` assert things this branch kept: `₹199`, "100 AI credits every day",
`price-free` = "₹0", `[data-plan="free"] h2`), axe, Lighthouse, the bundle budget script
(`platform/e2e/tests/platform/web/bundle.mjs`), the marketing regression (expected to show diffs on `/parents`
until the owner approves a re-baseline), `npm run test:platform-ui` (nothing under `components/platform/ui` changed).

## Tests added

- `lib/pricing/per-day.test.ts` (rule, rounding, the pass matching the homepage, rows from config, no runtime
  imports), `refill.test.ts`, `report-sample.test.ts` (consistency, real chapter titles, the plans with the
  report), `plans-faq.test.ts` (config dates, no stray numbers, no refund promise), `pass.test.ts`,
  `parents-copy.test.ts` (consent copy in step with `ConsentFlow` `UNLOCKS`; no rupee figure, allowance or per-day
  figure written into any phase 3 page or component). Config: `lib/pricing/vitest.config.mts`, script
  `test:pricing`.
- `lib/home/numbers.test.ts`: the ₹10 boundary.
- `components/platform/__tests__/m34-components.test.tsx`: "Opens soon" (was "Coming soon") and the per-day line,
  monthly and yearly. No e2e spec asserted "Coming soon" on `/plans` (the e2e API runs with billing on), so none
  changed.

## Known gaps / follow-ups

1. **The weekly report does not exist yet.** `parent_weekly_report` is a feature id in `plans.ts` and a label in
   `PlansClient`; there is no API route, worker job or email for it on any branch (searched `platform/api`,
   `platform/worker`, `components/platform`, every remote branch). The sample therefore shows only figures the
   platform already computes for a week (dashboard and credit history), typed against those API fields. Pro and
   the Pass are sold with this feature (`plans.ts`, the homepage, `/plans`), so it has to be built before billing
   goes on; when it is, check `lib/pricing/report-sample.ts` against it.
2. **`/refund-policy` covers only the Future Builders cohort.** It says nothing about AI plans. `/plans` links it
   neutrally ("Cancellation and refund policy") and the FAQ promises nothing; the policy needs an AI-plans section
   before billing goes on.
3. **Shared files I did not edit:** `lib/site.ts` still describes `/parents` in the Programs menu and footer as
   "See your child’s progress and feedback, not just a mark." (the school-assignment page). Suggested:
   "A weekly report, what is free, and how consent works."
4. `components/home/Ledger.tsx` keeps its own copy of the four free items; `components/ink/LedgerColumns.tsx` exports
   `FREE_ALWAYS` for it to import.
5. `content/media.ts` `parents` (an empty product-shot slot) has no user now.
6. `PlansClient`'s "How AI credits work" repeats the allowance and bonuses the meter shows above it. Kept, because
   this phase only adds sections and changes labels; drop the repeat if the owner agrees.
7. Dark theme: the pools are brightened with a CSS filter. Chalk or lamp pools (`process.py tint()`) would be
   better; `ledger-wash` and `report-wash` are still not painted (the report lies on the soft `panel` wash).
8. Exam dates: `content/exam-dates.ts` is still empty, so `/plans` shows "Board exams begin in February."

## Decisions made

- A month is 30 days and a year 365 for "about ₹X a day" (stated in `lib/pricing/per-day.ts`; 30 never
  understates the daily cost).
- The web does not read the billing flag; the API's `billingEnabled` drives the only billing-dependent labels.
- Phase 3 components follow the platform tokens through CSS fallbacks instead of taking a `night` prop, so they
  need no change when phase 4 lands.
- No ADR: no shared file, dependency or infrastructure changed (`lib/home/numbers.ts` re-exports, same behaviour).

## Needs from owner

- Confirm the weekly report will be built for Pro and the Pass (or the feature should be taken off the plans).
- AI-plans terms in the refund policy before billing goes on.
- OK on the 30-day month, and on the menu line for `/parents` in `lib/site.ts`.
- A look at the branch preview.
