# marketing — Ink and wash, phase 5b (about, what we teach, journal, contact, demo, legal, 404, cookie bar) — 2026-11-11

Status: done (branch `marketing/ink-and-wash-phase5b`, from `marketing/ink-and-wash` at ac96833e). Not pushed, not
merged, not deployed; the visual baseline is not re-captured (owner first, ADR-028).

Plan: `docs/redesign-ink-and-wash.md` §3.3 ("Restyle with the shared components. Text unchanged on legal pages.")
and §6 phase 5 (one page per commit). Language: `DESIGN.md`.

## What changed

One commit per page (the legal pages share one):

- **/book-a-demo** (`app/book-a-demo/page.tsx`): the quiet opener (`PageIntro size="head"`), the form, and beside it
  a real photograph (`teacher-blackboard`, an adult) over "What happens next" (same three steps). The generated
  `teacherMentoring` picture is gone.
  - **Ink fields** (new `components/forms/InkField.tsx` + `ink-field.module.css`): visible labels, 48 px fields,
    7 px corners, an edge with 3.9:1 contrast on paper, an indigo focus edge (2 px outline, 2 px offset), madder
    errors with a drawn mark, a drawn select chevron, and checkbox "choices" drawn as ink chips (44 x 44, never
    pills). `components/ui/Field.tsx` is untouched (the Future Builders forms keep it).
  - **`components/forms/DemoForm.tsx`**: restyled only. Field names, ids, the either/or email and phone rule,
    `validateDemo`, the focus-first-error behaviour, the honeypot and `submitDemoRequest` are as they were. One
    link changed: the thank-you note's "Try a SOYL question yourself" pointed at `/#try-it`, an anchor that left
    with the old homepage; it now points at `/`, which opens on the ring question.
- **/contact** (`app/contact/page.tsx`, `app/contact/layout.tsx`): the form moved, unchanged in behaviour, into
  `components/forms/ContactForm.tsx` (react-hook-form + the zod `contactSchema`, same field names and ids, same
  `submitContact` action), so the page is now a server component. Opener with the email address under it; a real
  photograph (`notes-top`) beside the form on wide screens. Metadata and structured data stay in the layout.
- **The cookie bar** (`components/legal/CookieConsent.tsx`): paper bar with a hairline, ink buttons from
  `inkButtonClasses` (Accept all primary, Essential only secondary, Choose quiet; all 44 px, 7 px corners),
  indigo checkboxes with 44 px rows. Text, behaviour, `consent.ts` (storage key `soyl_cookie_consent_v1`, events,
  `CONSENT_BOOT_SCRIPT`) untouched. The `.cookie-bar` class and DOM shape are kept for `app/globals.css` (hidden
  once a choice exists) and `components/platform/shell/platform-global.css` (dark theme: `h2`, `p`, `a`, `label`,
  `button`, `button:first-child` is still the primary choice). "Choose" carries `border-0` so the dark rules keep
  it a plain underlined word there, as before.
- **The 404 page** (`app/not-found.tsx`): same words and the same two actions (homepage, `PRIMARY_CTA`), now with
  the page's one ring left unfinished (two thirds, the rest a faint outline) and "404" inside it. Generic: no
  platform link, no claim. The struck-through "This page" and the accent word are gone. It now exports its own
  metadata title, "Page not found" (it used to inherit the home title; Next adds `noindex` to a 404 itself).
- **Legal** (`app/privacy`, `app/terms`, `app/refund-policy`, `app/shipping-policy`): restyled with the new
  `components/legal/LegalPage.tsx` (`LegalPage`, `LegalSection`, `LegalNote`) and `legal.module.css`: label, a
  Zodiak heading with one drawn stroke, the date line, numbered sections with Zodiak headings and hairlines,
  boxes of facts on the paper band, one readable column (46 rem), body text at one size. **The policy text is
  unchanged** (checked, see below). The only visible differences are decorative glyphs: the ← and → characters
  in the "Back to SOYL Academy Home" and next-policy links are now drawn SVG arrows (DESIGN.md §3: neither brand
  face has arrows), and the 🛡️ emoji beside the refund guarantee is a painted turmeric dab. The bottom links are
  now a `<nav aria-label="Policies">`.
- **/what-we-teach**: opener (`electronics-top`), the Future Builders card in the camp's own sunflower, as on the
  homepage (`arduino-team`, "Grades 7 to 12", same line, "See dates and fees"), the four school programmes on the
  paper band (one pigment dab each, topics as soft tags, "Coming soon" said once), the FAQ (`FaqList`, heading
  "Questions, answered." so it fits two lines; the questions and answers are unchanged), and `ClosingCta`
  "Workshops for your school." with "Register your school" to /contact. The generated pictures are gone.
- **/about**: opener (`chalk-alt`), the old model on paper against the new reality on slate, "Teachers remain the
  irreplaceable core." with `hands-red-pencil`, the company line, then **the photograph credits rebuilt**: every
  entry of `PHOTO_CREDITS` with a small duotone thumbnail, its description, the photographer and Pexels links.
  `ClosingCta` with the old closing copy (`finalCta` in `content/home.ts`). No numbered eyebrow, no accent word.
- **/journal** and **/journal/[slug]**: the opener is "The SOYL Journal" with the old headline as its lead (the
  old 64-character headline could not be two lines); the latest essay large, the others in a row. The article
  is set for reading: Zodiak heading with a stroke, photograph beside it, Switzer body at 65 characters a line
  (17 px, 19 px from 768), "Keep reading" with two thumbnails, `ClosingCta`. `components/journal/ArticleImage`
  maps each article slug to a real photograph (`hands-writing-night`, `electronics-top`, `desk-pages`,
  `chalk-maths`), so the `photo` field of `content/journal.ts` (keys into the generated `content/images.ts`) is
  no longer read by these pages; a new article without a mapping gets the typographic card. New
  `components/journal/ArticleMeta.tsx`.

Headlines: `PageIntro` caps its h1 at 16ch, which made "Answers are cheap. Thinking is not." and "Some things are
better learned together." three lines. Both pages use `size="head"` and widen the h1 through the `className`
prop (`[&_h1]:max-w-[20ch]` / `[22ch]`), so every h1 and section h2 on these pages is two lines or fewer at 390,
768 and 1440 (measured). `components/ink/*` is untouched.

Not changed: `content/faqs.ts` (the `whatWeTeachFaqs` text was fine), `lib/seo/pages.ts` (no subject changed),
`content/journal.ts`, every shared file in the brief's list, `public/images/*` (no longer used by these pages;
not deleted).

## How to verify

```
npm ci                                          # postinstall fetches the brand fonts
npm run lint                                    # clean
npm run build                                   # flag off: exit 0
NEXT_PUBLIC_PLATFORM_ENABLED=true npm run build # flag on: exit 0
npx next start --port 3324 --hostname 127.0.0.1 # then the browser checks below (Python Playwright, Chrome)
```

The browser checks were a local Playwright script (not committed; `platform/e2e` belongs to qa-e2e). Each one,
so it can be repeated by hand or in a spec:

Run on 2026-11-11 (Windows 11, Node 24, Chrome) on the final commit, **once with the flag off and once with it on**
(same results unless noted):

- `npm ci` exit 0; `npm run lint` clean; `npm run build` exit 0 (TypeScript passed, 52 pages);
  `NEXT_PUBLIC_PLATFORM_ENABLED=true npm run build` exit 0 (116 pages).
- **Statuses**: /what-we-teach, /about, /journal, the four essays, /contact, /book-a-demo, /privacy, /terms,
  /refund-policy, /shipping-policy 200; `/this-page-does-not-exist` 404 (title "Page not found | SOYL Academy").
- **No horizontal scroll** (`scrollWidth <= clientWidth`) on all 14 at 360, 390, 768, 1024 and 1440 px.
- **Height** identical at load and after scrolling to the bottom, all 14 at 390 and 1440 px.
- **Flag off**: no href to /learn, /tests, /ask, /plans, /me, /leaderboard, /dashboard, /store or /coins on any of them.
- **Headlines**: every visible h1 and h2 in `<main>` is two lines or fewer at 390, 768 and 1440.
- **Cookie bar** (fresh browser, no stored choice): visible; "Accept all" writes `soyl_cookie_consent_v1` with
  analytics and marketing true and the bar hides, and stays hidden after a reload; "Essential only" writes both
  false, same; "Choose" shows the three categories, ticking Analytics and "Save choices" writes analytics true,
  marketing false and hides the bar; "Cookie preferences" in the footer re-opens it (`data-forced`) with the saved
  choice ticked. All three buttons 44 px tall, 7 px corners. Flag on, at night (`soyl_theme=dark` on /learn): the
  platform's dark rules still apply (chalk primary, outlined secondary, "Choose" a plain underlined word).
- **Forms** (submit empty; no request is sent): /book-a-demo shows its six messages and focuses `#demo-name`;
  /contact shows its seven messages and focuses `#c-name`; zero POST requests; fields 48 px tall.
- **Legal text**: `innerText` of `<main>` captured from a build of the base commit ac96833e, compared word by word
  with this branch. Every word is the same on all four pages. The only differences are the decorative glyphs
  listed above: ← and → (privacy 4, terms 4, refund 3, shipping 3) and 🛡️ (refund).
- **Looked at by eye** (screenshots at 390 and 1440 after scrolling, plus the cookie bar, "Choose", the forms'
  error states and the dark cookie bar): what was wrong in the first pass and is fixed: three-line headlines on
  /about and /what-we-teach (PageIntro's 16ch cap), an unreadable crop of the hero photograph on /what-we-teach,
  pale programme dabs, topic separators breaking at line ends, a boxed "Choose" on the dark cookie bar.

## Tests added

None in the repo (marketing pages have no unit tests; the checks are a local Playwright script, described above).

## Known gaps / follow-ups

- **Not run**: the platform e2e suites, the design-system e2e, the marketing regression (expected to show diffs on
  these pages until the owner approves a re-baseline; `marketing:baseline` was not run), Lighthouse and axe.
- **A stale e2e assertion, not touched**: `platform/e2e/tests/platform/web/revamp.spec.ts` expects `/about`'s body
  background to be `rgb(255, 255, 255)`. The ground has been paper (`#FBFAF7`) since phase 1, so that line fails on
  this branch with or without these pages; it belongs to the theme spec, so it is left for qa-e2e. No spec asserts
  text or structure that changed here (the footer, nav and visual specs only use `.cookie-bar` and the footer).
- **Legal page titles** read "Privacy & Cookie Policy | SOYL Academy | SOYL Academy" (the page's own title already
  ends in the site name and the layout template adds it again). It was like that before; not changed here
  because the brief was "restyle only". A one-word fix per page when the owner agrees.
- **`PageIntro` caps its h1 at 16ch**: at hero size any title over about 30 characters takes three lines. These
  pages widen it from the outside (`className="[&_h1]:max-w-[..ch]"`) and use `size="head"`; the lead may want to
  change the cap in `components/ink/PageIntro.tsx` for every page instead.
- **Generated images still referenced elsewhere**: `content/journal.ts` (`photo` keys) and `content/images.ts`
  still point at `public/images/*`; nothing on these pages shows them. Clean up with `public/images`.
- **Copy that moved**: eyebrow labels were dropped ("About SOYL Academy", "What we build" with its "01", "What we
  teach", "Contact", "Book a demo", "Error 404" is now the number in the ring with "Error" for screen readers);
  "The SOYL Journal" is now the journal's h1 with the old headline as its lead; the what-we-teach FAQ heading is
  "Questions, answered." (was "Questions about our programmes"); the Future Builders card says "Grades 7 to 12".
  Facts are unchanged.
- One photographer's name in `content/credits.ts` carries emoji ("MT photography 😊📸📸"); /about prints it as
  the credit says. Not changed (shared file).
- The footer's flag-off line still describes school assignments for Grades 1 to 10 (shared footer, not this phase).

Decisions made: none needing an ADR (no shared file, no dependency). Recorded here: legal glyphs (arrows, emoji)
replaced by drawn marks with the words unchanged; `/#try-it` to `/` in the demo thank-you note; journal photos
mapped by slug in `components/journal/ArticleImage.tsx` instead of editing `content/journal.ts`.

Needs from owner: a look at the pages; say if the legal pages must keep the arrow characters and the shield emoji.
