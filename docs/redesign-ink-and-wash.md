# Redesign: "Ink and wash" (Nov 2026)

Branch: `marketing/ink-and-wash` (from `main` at 5464316). This file is the plan, the design
language, the copy deck, the asset manifest and the hand-over task list. It is written so that
someone who was not in the planning session can execute it cold.

Direction board (rendered specimens of the language): https://claude.ai/artifact/UtaCNZZByQjbbXZvdU9e3L
ADR: [028](platform/adr/028-marketing-ink-and-wash-design-language.md) (proposed).

## 0. Owner decisions (10 Nov 2026)

| # | Decision | Owner's words |
|---|---|---|
| 1 | Design language **A, Ink and wash**, with **B, Slate and chalk**, as the night mode in the app. | "go with A and with B at night" |
| 2 | **The homepage leads with free learning** for Classes 7 to 12. The school-assignment story moves to `/schools`. | "we should lead with free learning" |
| 3 | **The Diwali offer tab stays on the homepage.** It is restyled in the new language, not removed. | "it's a sales element we are having right now, so I think it's nice" |
| 4 | Work on a **separate branch with a pull request**. | "create a separate branch and a PR" |
| 5 | Imagery from **Pexels and other stock sources, plus generated art**. Key supplied (kept in `.env.local`, never committed). | "use that as well … and generate your own" |
| 6 | **Plan first, then execute.** | "plan it out properly, and after the plan … execute" |

Lead: please record these as the next D-number in `docs/platform/DECISIONS.md` when this merges
(not edited here, to avoid a conflict on a file other agents write to daily).

## 1. Why (measured on the live site, 10 Nov 2026)

1. **Three products, one homepage.** `/` sells school assignments for Grades 1 to 10. The product
   a family can pay for (free lessons for Classes 7 to 12, AI plans) is a dropdown item.
2. **Two brands.** Marketing is white with Newsreader. `/learn` and `/plans` are a dark Inter app.
3. **The only sales device is a discount.**
4. **The page changes length while scrolling:** 13,002 px at load, 10,929 px at the bottom, with
   the scroll position pulled back 400 to 650 px three times. Cause: `main > section ~ section`
   has `content-visibility: auto; contain-intrinsic-size: auto 900px` (`app/globals.css`), a guess
   that is wrong for every section.
5. **The people in the photographs are generated** (`docs/redesign-editorial-restore.md` §5).
6. **Four reskins since September are one family:** serif accent word, photo cards, pill buttons.
   None has a material of its own or something for the visitor to do.

## 2. The design language

### 2.1 The idea

**Your work is the paint.** A student's tries are brush strokes. One ink ring (an enso) is the
site's single signature: it is unfinished until the visitor solves a real question, and every
try, wrong ones included, lays part of the stroke. Each subject owns a natural-dye pigment, and
progress in the app is literal: an untouched chapter is an outline, a finished one is washed in.

By day the ground is paper and the ring is ink. At night (the app's dark theme) the ground is
slate and the same ring is chalk. One system, two grounds.

Allowed patterns (anything not listed is a tell and should be cut at review): one painted ring
per page; washes under product moments; pigment dabs as list bullets; one drawn stroke under a
heading per section; small-caps labels inside product moments only; the rubber stamp for streak
days and rank cards only. Not allowed: italic accent word with a highlighter stroke, verb
marquee, photo cards with offset colour blocks, pill buttons, glow, gradients, numbered section
eyebrows, fade-up on every block.

### 2.2 Colour tokens

Paper (marketing, and the app's light theme). Contrast is against paper `#FBFAF7`.

| Token | Hex | Role | Contrast |
|---|---|---|---|
| `--paper` | `#FBFAF7` | Ground | |
| `--paper-2` | `#F3F1EA` | Alternate band, cards on paper | |
| `--ink` | `#1B1A19` | Text, the ring | 16.6:1 |
| `--graphite` | `#4A4744` | Secondary text | 8.8:1 |
| `--muted` | `#6B6762` | Captions, labels | 5.4:1 |
| `--indigo` | `#27467E` | **The action**: buttons, links, focus | 8.9:1 (paper text on it: 8.9:1) |
| `--indigo-deep` | `#14294F` | Hover, the deep edge of a wash | |
| `--indigo-pale` | `#6F88B5` | Wash fills | fill only |
| `--madder` | `#A3302A` | A missed try, errors | 6.7:1 |
| `--leaf` | `#3F6A2A` | A right answer, success | 6.1:1 |
| `--turmeric` | `#DFA22A` | Marks and strokes | **2.2:1, never text** |
| `--henna` | `#9A562A` | Fifth subject pigment | 5.4:1 |
| `--rule` | `rgba(27,26,25,.14)` | Hairlines | |

Subject pigments (used for a subject's wash, dab and progress): Mathematics indigo, Science and
Physics madder, Chemistry turmeric, Biology leaf, Social Science henna, languages ink.

Slate (the app's dark theme). Contrast is against slate `#0E1215`.

| Token | Hex | Role | Contrast |
|---|---|---|---|
| `--slate` | `#0E1215` | Ground | |
| `--slate-2` | `#14181C` | Cards, the board | |
| `--chalk` | `#F2EEE4` | Text, the ring | 16.2:1 |
| `--chalk-muted` | `#B9B5AA` | Secondary text | 9.2:1 |
| `--mint` | `#9EC9C2` | **The action** (text on it is `#0B0F12`, 10.6:1) | 10.4:1 |
| `--lamp` | `#F4C95D` | Marks, the lamp | 12.0:1 |
| `--madder-rose` | `#E08A7F` | A missed try | 7.3:1 |

Obsidian, snow and mint are the SOYL house palette, so the night theme also brings the Academy
back under the parent brand.

### 2.3 Type

- **Zodiak** 400 and 400 italic (display, and the one italic "ask" line per screen).
- **Switzer** 400, 500, 600 (text and UI).
- **Devanagari:** keep Noto Sans Devanagari in the app (ADR-023). Marketing uses it too for any
  Hindi line; do not add a second Devanagari face.
- Scale: hero `clamp(2.6rem, 6.2vw, 5rem)/0.96`, tracking `-0.026em`; section head
  `clamp(1.9rem, 4.2vw, 3.2rem)/1.04`; title `1.45rem/1.15`; lead `clamp(1.05rem, 1.4vw, 1.25rem)/1.5`;
  body `1rem` to `1.0625rem/1.6`; label `0.72rem`, 600, `0.1em`, uppercase (inside product moments only).
- Headlines are two lines or fewer at 390, 768 and 1440. Sentence case. No dashes in visible copy.

**Font files.** Zodiak and Switzer are Fontshare faces (ITF Free Font License): free to use on a
website, not to be redistributed as files. **This repo is public, so the files are not
committed.** `scripts/fetch-fonts.mjs` downloads them at build time into a git-ignored
`assets/fonts/` and `next/font/local` self-hosts them (no runtime third-party request, WEB-1
holds). Set `adjustFontFallback` (`Times New Roman` for Zodiak, `Arial` for Switzer) so CLS stays
0. If Fontshare is unreachable at build time the script exits 0 and the fallbacks render; it
must never fail the build. See ADR-028.

### 2.4 Paint

Painted with the p5.brush engine the owner already uses (`Documents/soyl-portfolio/v2/art`).
Plates are painted offline and shipped as images, so the site carries no canvas or WebGL code.

- Source goes in `tools/art/`: `engine.js`, `brush.js` (p5.brush, MIT: add its licence file),
  `plates.js` (recipes), `paint.py` (headless Chrome), `process.py` (cuts registered transparent
  sprites, makes the chalk variants). Working copies: `Documents/soyl-academy-direction/`.
- Output goes in `public/art/` as WebP with alpha, plus AVIF for the two largest.
- **Registration:** every layer of the hero stage is painted in the same 1920x1080 coordinates
  and cropped to one 1040x1040 window, so layers stack with `inset: 0`. Ring centre is at
  44.2% / 46.2% of the stage; the stroke starts at 222deg (CSS conic angle) and runs 336deg clockwise.
- Budget: hero ring <= 110 KB, any other plate <= 80 KB, total paint on the homepage <= 350 KB.
- Chalk variants are the same strokes with the colour replaced and the alpha kept
  (`process.py: tint()`), so day and night are pixel-registered.

| Plate | Use |
|---|---|
| `ring`, `rays`, `wash`, `sun` | Home hero stage (and `/learn` door). Chalk set for the app's dark theme. |
| `pool-{indigo,madder,turmeric,leaf,henna,ink}` | Subject marks, list bullets, the credits meter (50 drops). |
| `stroke-{indigo,madder,turmeric}` | One drawn stroke under a section head or a number. |
| `panel` | The ragged wash a product moment or a photograph lies on (also used as a CSS mask). |
| New, to paint: `door-wash` (wide, under the class picker on phones), `ledger-wash` (two pools, free and metered), `report-wash`, `fb-sun` (sunflower dab for the Future Builders door). |

### 2.5 Motion

One verb: **bleed and settle.** Easing `cubic-bezier(.3,.7,.2,1)`.

- The ring draws with a conic mask whose angle is a registered custom property
  (`@property --sweep`), 900 ms per third. Without `@property` support it is simply complete.
- A wash wipes in once along the direction it was brushed (CSS mask-position, 700 ms) when it
  first enters the viewport. One IntersectionObserver (the existing `RevealObserver`) is enough.
- Controls answer in under 160 ms. Hover is gated to `(hover: hover) and (pointer: fine)`.
- **Nothing pins, nothing loops, no marquee, no scroll library, no parallax.** Native scrolling.
- `prefers-reduced-motion`: everything is in place, nothing is pending.
- **Delete the `content-visibility: auto` rule** (`main > section ~ section, .cv-auto`). The new
  home is five short screens; the rule's cost (a page that changes length) is larger than its saving.

### 2.6 Photography

Real photographs only. Every one is printed in the language: a **duotone from indigo-deep to
paper**, inside the `panel` wash as a mask, so it reads as an ink print rather than a stock photo.
At night the duotone runs from obsidian to warm chalk.

Rules (students here are minors):
- Prefer hands, desks, books and backs of heads. A child's recognisable face never sits beside a
  price, a claim or a number.
- Crop out school crests and name badges.
- Photographs are illustrative and say so once, in the footer. Credits live in `content/credits.ts`
  and render on `/about` (Pexels does not require credit; we give it anyway).
- No AI-generated people. Retire `public/images/*` and `public/video/soyl-loop.mp4` as each page
  is rebuilt (the video carries a generator's watermark).

## 3. The site, page by page

### 3.1 Shape

Home asks one question, "What are you studying?". The board and class the visitor picks is kept
in `localStorage` (`soyl.door = {board, class}`) and every later screen speaks about it. No
account is needed.

**`PLATFORM_ENABLED` still gates every platform link (GEN-4, D-019).** With the flag off the home
page must contain no `/learn`, `/tests`, `/ask`, `/plans` or `/me` href. Build two states of the
door: flag on, it opens the class in `/learn`; flag off, it shows the same headline and ring, the
picker is replaced by one line ("Free lessons for Classes 7 to 12 open soon") and the action is
`Book a demo`. `platform/e2e` already tests both states; keep it green.

### 3.2 Home (five screens, was about thirteen)

```
1 DOOR        [ headline / line / ask / board + class chips / one action ]   ( ring + playable question )
              Diwali offer tab on the right edge while the offer runs (kept, restyled)
2 LEDGER      "Everything you need to pass is free."   Free, always | Metered: AI      -> See what AI costs
3 TASTE       "Try it for ten seconds."   [ a lesson slide ] [ a flashcard ] [ an AI doubt ]
4 CLOCK       Class 10 or 12: days to the first paper + Board Exam Pass.  Others: streak + league.
5 THREE DOORS For parents | For schools | Future Builders      then FAQ (4) and footer
```

Copy deck.

1. **Door.** H1: `The whole syllabus, free.` Line: `Classes 7 to 12. CBSE, ICSE and ISC. You only
   ever pay for AI.` Ask (Zodiak italic): `What are you studying?` Chips: `CBSE`, `ICSE / ISC`;
   `7` `8` `9` `10` `11` `12` (default from `localStorage`, else CBSE 10). Action: `Open Class 10`
   (the number follows the chip) to `/learn/<board>/<class>`; read the real slugs from
   `platform/catalog`. Under the ring: `Three tries close the ring. The wrong ones stay in it.`
   The playable question is the existing `components/home/MiniSimulator.tsx` (keyboard operable,
   no library) moved inside the ring: each wrong try advances the ring by a third (to at most two
   thirds) and stays as a madder chip; the right answer closes it and the wash blooms. Later
   (phase 6) swap in one hand-picked objective question per class from authored content.
2. **Ledger.** H2: `Everything you need to pass is free.` Left, "Free, always": Lessons; Notes and
   flashcards; Practice with instant checks; Chapter tests, mock papers and All-India mocks. Right,
   "Metered": AI help. Reason, one sentence: `AI costs money to run, so it is the one thing with a
   meter. You get <N> credits free every day.` `<N>` comes from `platform/shared/config/plans.ts`
   (rule: config, not code). Link: `See what AI costs`.
3. **Taste.** H2: `Try it for ten seconds.` Three live miniatures, each one real content for the
   chosen class and each a link into the real feature: a lesson (three real slides, tap to
   advance); a flashcard (tap to flip); an AI doubt (a recorded exchange with its cost tag,
   `1 credit`; no live AI call for a guest). Then the saved-place line once the visitor has done
   anything: `<x> slides, <y> questions. Saved on this phone only.` Action: `Keep it` to `/me`.
4. **Clock.** For Class 10 and 12: H2 `<D> days to your first paper.` with the Board Exam Pass:
   `₹499 once. About ₹<per-day> a day until 31 March 2027.` `<D>` reads `content/exam-dates.ts`
   (official date sheets only; when a board has not published, render `Board exams begin in
   February.` with no number: never estimate). `<per-day>` is computed from the config price and
   the days left, with a unit test. For other classes: `A streak starts with one question.` and
   the weekly league.
5. **Three doors.** Parents: `See what your child did this week.` Schools: `Homework was built
   for a world before AI.` Future Builders: its own sunflower card and its existing copy.
6. **FAQ**, four questions, rewritten for free learning (`content/faqs.ts`; the FAQ JSON-LD
   mirrors the visible text): Is it really free? What do I pay for? Which boards and classes?
   Do I need an account?

Sections that leave the homepage: `Shift`, `MethodModule`, `HowItWorks` (to `/schools`),
`Belief` (the video is retired), `Subjects` (folded into Taste), `Audiences` (becomes the three
doors), `JournalTeaser` (footer link), `ProofStrip` (returns when proof is real), `FinalCta`.

SEO: `HOME_TITLE` becomes `SOYL Academy | The whole syllabus, free. CBSE and ICSE/ISC, Classes 7 to 12`;
update `SITE_DESCRIPTION`, `/og`, `llms.txt`, `llms-full.txt` to match. `/schools` takes over the
"interactive assignments" title and keywords.

### 3.3 Other pages

| Page | Job | Change |
|---|---|---|
| `/learn` (app) | The same door, now the app | Reuse the door component and the ring. Phase 4 (tokens) makes it paper by day, slate at night. |
| `/plans` (app) | Let a parent decide in a minute | Above the existing plan cards (Razorpay logic untouched): the ledger, then per-day prices beside each plan, the exam clock, a sample weekly report, FAQ, refund link. Every number from config, unit-tested like `plans-copy.ts`. While `BILLING_ENABLED` is off, the button label is `Opens soon` (not three "Coming soon" tiles with nothing around them). |
| `/parents` | Show the payer what they receive | The weekly report itself (a sample, labelled), what is free, what is metered, consent and safety in plain words. One action: `See the plans` (flag on) or `Book a demo` (flag off). |
| `/schools`, `/teachers` | Book a pilot | Take over `Shift`, `MethodModule`, `HowItWorks` and the simulator played as a pupil. Headline: `Homework was built for a world before AI.` |
| `/students` | (merged) | Becomes a short page that hands straight to the door. Keep the URL (200). |
| `/future-builders` | Fill the cohort | **Keeps its own brand** (cream, sunflower, indigo, brick, sticker cards). Only the header and footer change. |
| `/method` | Earn belief | The five verbs as a short journey with a checkpoint at each. |
| `/what-we-teach`, `/about`, `/journal`, `/contact`, `/book-a-demo`, legal | | Restyle with the shared components. Text unchanged on legal pages. |
| Header, footer | | Same structure and menus (ADR-025). New tokens and type. `Learn` moves first in the nav when the flag is on. Primary action in the bar: `Start free` (flag on) or `Book a demo` (flag off). |

### 3.4 The Diwali tab (kept)

`components/marketing/DiwaliOfferTab.tsx` keeps its logic, its dates and its dismiss button. It is
restyled as a painted turmeric tab with ink text so that it belongs to the page. It still shows
only while a cohort is open and the offer runs. No second discount device is added anywhere.

## 4. Selling without a discount

Each device rests on a rule that is already true. Nothing is invented.

| # | Device | Component | Where | Source of truth |
|---|---|---|---|---|
| 1 | The open door | `Door`, ring + `MiniSimulator` | Home 1, `/learn` | Guests can already learn (CONTEXT §5) |
| 2 | The honest ledger | `Ledger` | Home 2, `/plans`, `/parents` | "Only AI costs credits" (golden rule 3) |
| 3 | Your syllabus, counted | `SyllabusCount` | Home 3, `/learn` | Catalog counts at build time, never hard-coded |
| 4 | A saved place | `SavedPlace` | Home 3, app shell | Guest progress merges into an account (CONTEXT §5) |
| 5 | The midnight refill | `CreditsMeter` (50 drops) | `/plans`, app header | `plans.ts`, `credit-bonuses.ts` |
| 6 | The exam clock | `ExamClock` | Home 4, `/plans` | `content/exam-dates.ts` (official sheets only) |
| 7 | Price in a parent's units | `PerDay` | `/plans`, `/parents` | Computed from `plans.ts`; unit test |
| 8 | The report a parent receives | `ReportSample` | `/parents`, `/plans` | Pro and Pass feature (CONTEXT §7) |
| 9 | The paywall that waits | existing out-of-credits sheet | App | "Never block non-AI features" (CONTEXT §6) |

Guardrail: **persuade the parent, motivate the student.** No countdown sales aimed at students,
no guilt copy, no invented scarcity, no made-up reviews, numbers or logos. Streaks can pause.
`content/proof.ts` stays real-or-absent.

## 5. Assets

### 5.1 Photographs chosen (Pexels; scouted 10 Nov 2026)

`.env.local` holds `PEXELS_API_KEY` (git-ignored). `tools/assets/fetch-pexels.mjs` downloads by id
at a fixed width, writes `content/credits.ts`, and never prints the key.

| Slot | Pexels id | Photographer | Note |
|---|---|---|---|
| Home taste, hands | 9797031 | Towfiqu barbhuiya | A hand with a red pencil over a notebook |
| Hands, night variant | 239548 | Pew Nguyen | Hands writing, low light |
| Study desk, top view | 8423372 | Pavel Danilyuk | Hands turning pages beside a notebook |
| Notes, top view | 6929270 | Polina Tankilevitch | |
| Night study (app dark theme) | 33940743 | MT photography | Reading under a desk lamp |
| Lamplight | 40746551 | angel studio | A younger child: use small, not as a hero |
| Classroom | 3231358 | Yogendra Singh | Schoolgirls listening. Crop out the crest. |
| Classroom, from behind | 6217466 | Siddharth Rathod | Braids and uniforms, no faces. Safest people shot. |
| Classroom, boys | 18012456 | Swastik Arora | |
| Parents | 7104388 | RDNE Stock project | Mother and daughter with a book |
| Parents, alternate | 7104142 | RDNE Stock project | |
| Teachers | 3184658 | fauxels | Writing on a blackboard |
| Chalk (night theme) | 39191015 | Vitaly Gariev | A hand writing maths in chalk |
| Chalk, alternate | 6256258 | kaboompics.com | |
| Future Builders | 15470540 | Chengxin Zhao | Hands wiring a breadboard |
| Future Builders | 33373082 | Youn Seung Jin | A team around an Arduino |
| Future Builders, top view | 4709369 | cottonbro studio | |

Video candidates, only if a moving picture earns its place (one at most per page, muted, loaded
near the viewport, a still under reduced motion): 8342365 (Pavel Danilyuk, writing, 14 s),
854320 (Pixabay, chalk on a board, 23 s), 20606481 (watercolour brush on paper, 12 s).

Gap: Pexels is thin on Indian teenagers studying. Do not fill the gap with a generated person.
Use hands, the from-behind classroom shot, and paint.

### 5.2 Other sources

- **Openverse** and **Wikimedia Commons** (no key): for specific Indian objects and places, CC0
  or CC BY only, credit recorded.
- **Canva** (connector): object images that code cannot paint (for example an inkwell or a brass
  lamp for the credits meter), "no text, no logos, no people", then put through the same duotone.
  Also the share cards. Nothing generated is presented as a photograph.
- **Lesson diagrams:** already drawn as code in `components/platform/ui/visual`. The best become art.
- **Painted plates:** see 2.4.

## 6. Build order

Each phase ends with the checks under it. Never claim a check that was not run.

**Phase 1. Foundations.** `app/globals.css` tokens (paper and slate sets), `scripts/fetch-fonts.mjs`
and `next/font/local` in `app/layout.tsx` (keep `--font-inter` and `--font-instrument-serif`
defined until phase 4, the UI kit reads them), `tools/art/` and `public/art/`, shared components
in `components/ink/` (`Button`, `Chip`, `Section`, `Stroke`, `Dab`, `Wash`, `InkPhoto`, `Ring`),
header and footer restyle, delete the `content-visibility` rule, replace root `DESIGN.md` with
section 2 of this file. Checks: `npm run lint`, `npm run build`, every route 200, no horizontal
scroll at 360, 390, 768, 1024, 1440, document height identical at load and after scrolling to the bottom.

**Phase 2. Home.** Sections 3.2 and 3.4, both flag states. Checks: phase 1 checks, plus keyboard
play of the ring question, reduced-motion screenshot with everything visible, no content hidden
without JS, LCP element is text or the ring plate, homepage paint <= 350 KB.

**Phase 3. Plans and Parents.** `Ledger`, `PerDay`, `ExamClock`, `ReportSample`, `CreditsMeter`.
Touches `components/platform/plans/*`: keep Razorpay and the plan data flow exactly as they are.
Checks: `npm run test:platform-web`, new unit tests for every computed number.

**Phase 4. The app, day and night.** `components/platform/ui/styles/tokens.css`: light becomes
paper, dark becomes slate, accent indigo by day and mint at night, fonts Zodiak and Switzer.
This path belongs to the design-system agent, so it ships as **its own pull request with its own
ADR**, after the Lead agrees. Checks: `npm run test:platform-ui` (the kit's contrast tests),
`npm run test:design-system -w @soyl/e2e`, 360 px.

**Phase 5. The other pages.** 3.3, one page per commit.

**Phase 6. Finish.** Catalog-driven door question; `SyllabusCount`; share cards; the stamp for
streak days; credits page; then the gates: `npm run marketing:regression -w @soyl/e2e` and an
**owner-approved re-baseline** (`marketing:baseline`), Lighthouse mobile on `/`, `/plans`,
`/parents`, axe, and a blind review from screenshots only.

## 7. Rules for whoever executes this

- Read `CLAUDE.md`, `AGENTS.md` and `node_modules/next/dist/docs/` before writing code. This is
  Next 16; several APIs differ from older versions.
- Do not break the marketing site. Every URL keeps returning 200. Shared files (`app/layout.tsx`,
  `app/globals.css`) are covered by ADR-028.
- No new runtime dependency. If one seems necessary, stop and ask; it needs an ADR.
- Never touch `platform/content/` (a content agent writes there continuously) or `platform/infra/`.
- Prices, credits and dates come from config. A hard-coded rupee figure or allowance is a bug.
- No secrets in git. The Pexels key stays in `.env.local`.
- Proof is real or absent. No invented customers, quotes, counts or logos.
- Commit in small steps with the repo's message style (`feat(marketing): …`, `docs(marketing): …`).
  Write a handoff note in `docs/platform/handoffs/` at the end of each phase.
- Nothing is deployed, and the visual baseline is not re-captured, without the owner's word.

## 8. Open questions for the owner

1. **Fonts.** The plan fetches Zodiak and Switzer at build time because the repo is public. If you
   would rather commit the files, say so.
2. **Exam dates.** `ExamClock` shows a number only from an official date sheet. Until CBSE and
   CISCE publish for 2027 it shows the month.
3. **"One credit is ₹0.10".** The ledger says AI is metered and why. Do you want the rupee value
   of a credit said in public?
4. **Night mode on marketing pages.** This plan gives the night theme to the app only, and keeps
   marketing on paper. Say if marketing should follow the visitor's system theme too.
