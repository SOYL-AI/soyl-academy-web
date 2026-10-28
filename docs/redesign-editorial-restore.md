# Redesign: "Editorial restore" (27 Oct 2026)

Branch: `marketing/editorial-restore` (from `origin/main` cd33ca7). Owner feedback on the
"Working Notebook" redesign: the old site (e2f1085, 17 Oct) looked better — Primer-style,
editorial, white, with photography and motion — and the notebook concept felt odd.
This branch brings back that design language without reverting the fixes made since.

Screenshots (OLD e2f1085 / CURRENT origin/main / NEW, 1440 and 390, full page):
`C:/Users/Prabhu/soyl-wt/marketing-editorial-shots/` (outside the repo).

## 1. Decisions

- **Look.** White canvas, one warm sand band colour (`--color-paper` #F6F2EA) for alternate
  sections, ink (#141414) for buttons and dark bands, cobalt only for links/accents, a red pen
  for drawn underlines. Pill buttons, 14–22 px rounded photo frames, hairline rules.
- **Type.** Newsreader (display serif, 400, with an italic for one accent word per headline)
  and Inter for body and UI. The notebook motifs (graph paper, ruled lines, red margin line,
  page-frame rules, TODO-striped frames) are gone.
- **Narrative (homepage).** Promise → the shift (traditional vs SOYL assignment) → the SOYL
  Method (verb marquee + five verbs) → how it works (steps + the live coordinate-grid
  question) → belief over the classroom video → subjects → who it's for (three photo doors) →
  Future Builders → journal → FAQ → close. Audience pages follow the same rhythm.
- **Photography.** The October images are back (`public/images`, `public/video`) and
  registered in `content/images.ts` with neutral alt text. They are illustrative: no names,
  quotes, schools or outcomes are attached to them, they never sit next to a number or a
  testimonial, and the footer says "Photography is illustrative." Three images were dropped
  because they carry fake names or imply a real cohort (`cohort_group`, `demo_day` with a
  team-name sign, `saturday_workshop` with a school crest); `ai_classifier.jpg` had a real
  school name on a lanyard, which is now blurred (and cropped out by the frame).
  The five Future Builders JPEGs were re-encoded (≈800 KB → 115–160 KB each).
- **Images.** `next/image` with static imports: intrinsic size (no CLS), blur placeholder,
  AVIF/WebP via the existing `images.formats`, honest `sizes`, lazy loading. Hero photos get
  `fetchPriority="high"` but no preload: on phones they sit under the headline (the text is
  the LCP element), so a preload would only compete for the first second of a slow connection.
  (`priority` is deprecated in Next 16 and is not used.)
- **Video.** `components/media/VideoLoop.tsx`: muted, looping, `preload="none"`, no
  `autoplay` attribute — it is only fetched and played when its frame nears the viewport,
  pauses when scrolled away, and fades in over a still (`public/video/soyl-loop-poster.jpg`,
  its first frame). Under reduced motion or without JS only the still shows and the MP4 is
  never downloaded.
- **Motion, without an animation library.**
  - Headline words rise in on load (CSS, runs without JS); the hero accent gets a drawn
    pen underline. Lead paragraphs (the mobile LCP element) do not animate.
  - Scroll reveals: `components/motion/RevealObserver.tsx` (one IntersectionObserver for every
    `[data-reveal]`). Only elements that start below the fold are hidden, and only after JS
    runs, so nothing is ever invisible without JS and nothing that was painted disappears.
    Reveals use opacity/transform/clip-path only (no CLS).
  - Photo frames wipe in with a slight zoom; scroll-driven parallax on large photos is pure CSS
    (`animation-timeline: view()`, progressive: browsers without it get a still photo).
  - Verb marquee, card lift + slow photo zoom, nav underline draw, arrow nudges, a sliding
    toggle thumb.
  - `prefers-reduced-motion`: every animation and transition is off, nothing is pending, the
    video is a still.
- **Performance work.** Sections after the first use `content-visibility: auto`; the reveal
  observer never calls `getBoundingClientRect` (a read/write loop had caused ~50 forced
  layouts); Newsreader is one static weight per style with `display: optional`, so a late font
  can never re-flow a headline (CLS 0).
- **Header.** White, sticky, blurred; nav underline draws on hover; "Book a demo" pill. The
  mobile menu is a full-height panel with large serif links (it lives outside the blurred
  header so `position: fixed` works). The CTA in the bar hides below 375 px (it is in the
  menu). Flag-gated "Learn" link: `lib/site.ts` now carries the same `PLATFORM_NAV` block as
  `platform/main` (identical lines, so the merge is clean); with the flag off the header HTML
  has no Learn link.
- **Footer.** Ink band with a serif line, CTA, four link columns, cookie preferences.

### Accent palette (owner request, 28 Oct)

The brand mark is black and white, so the trio is chosen to work on white: blue `#2B4FE6`
(`--color-cobalt`), red `#C8473C` (`--color-red-pen`; text uses `--color-red-ink` #B23A30,
5.6:1), yellow `#F2D45C` (`--color-highlighter`, fills only, never text), plus soft tints.
`.tone-blue|red|yellow` set `--tone`, `--tone-text`, `--tone-soft`. Where they appear:
section eyebrows (colour dot + number, cycling blue → red → yellow by section number),
a per-page tone on inner heroes (schools red, teachers blue, parents yellow, students blue,
Future Builders yellow, about red, method blue, journal red, what-we-teach yellow), a
highlighter stroke under the italic accent word of light-background headlines, offset colour
blocks behind key photos, coloured step numbers, subject (maths blue, physics red, chemistry
yellow) and audience colour coding, the three-colour stripe on the footer and coming-soon
panel, yellow coming-soon badges and secondary-button hovers, red nav/footer hover underlines,
blue FAQ toggles. Body text stays ink.

### Coming soon (owner request, 28 Oct)

`components/ui/ComingSoon.tsx`: an editorial panel (yellow "Coming soon" badge, serif title,
one line, CTAs to the contact form → Google Sheets, or book a demo). Used for the school
workshops on `/what-we-teach`. Future Builders already shows its own waitlist state (Sheets).
Every other page has real content and stays as is; all URLs return 200. The flag-gated
"Learn" entry stays off until the platform launches.

## 2. Kept from Working Notebook (unchanged behaviour)

- Cookie banner gates Vercel Analytics/Speed Insights (`ConsentedAnalytics.tsx` untouched).
- Future Builders cohort state (`content/future-builders.ts`, `getCohortState`), waitlist
  when closed, `/api/razorpay` refusing payment when closed, hourly revalidation.
- Routes `/teachers`, `/parents`, `/book-a-demo`, `/feed.xml`; all URLs unchanged.
- SEO config and canonical `https://www.soylai.com` (`lib/seo/*`, `lib/site.ts`), `/og`,
  sitemap, robots, llms.txt, manifest, JSON-LD (FAQ schema still mirrors the visible FAQ).
- Contact and book-a-demo forms posting to the Google Sheets webhook.
- Legal pages: text unchanged (only the shared type/link styles changed).
- No auto-popup promo modal, no top announcement bar. The slim, dismissible Future Builders
  banner still appears on the homepage only while registration is open.
- Proof stays real-or-absent (`content/proof.ts`). There are no TODO frames anywhere any more
  (not even on previews): an empty proof strip or screenshot slot simply renders nothing, and
  a screenshot appears as soon as a file is supplied in `content/media.ts`.
- Root layout still provides `--font-inter` and `--font-instrument-serif` for the learning
  platform's UI kit (Instrument Serif is no longer preloaded, since marketing pages don't use it).
  No new inline `<head>` script (the platform CSP hashes only the consent boot script).

## 3. Dependencies

None added. Motion is CSS + one IntersectionObserver; framer-motion/GSAP were not needed.
Fonts are self-hosted by `next/font` (Newsreader 400 normal + italic, Inter, Instrument Serif).

## 4. Results (production build, local, 28 Oct 2026)

Measured on the final build (632f6b4 + this doc), `npm run start`, Windows 11 / Node 24.

| Check | Result |
|---|---|
| `npm run lint` | pass (0 problems) |
| `npm run build` | pass (Next 16.4.3, 34 static pages) |
| Routes | 31/31 return 200: 20 sitemap URLs + `/sitemap.xml`, `/og`, `/og?path=/schools`, `/robots.txt`, `/feed.xml`, `/manifest.webmanifest`, `/llms.txt`, `/llms-full.txt`, icons; unknown URL → 404 |
| Horizontal scroll | none: 105/105 (21 pages × 360/390/768/1024/1440) |
| Interaction suite | 32/32 pass: consent gates analytics (none before consent, loads after "Analytics" is allowed, choice remembered, footer re-opens), contact + book-a-demo + waitlist reach a mock Sheets webhook, closed cohort shows waitlist, `/api/razorpay` → 409, mobile menu (open, links, Esc returns focus, closes on navigation), skip link, visible focus ring, toggle + simulator by keyboard, no console errors on 20 pages × 2 viewports, no hidden content without JS, reduced motion (nothing pending, no video download), video loads only near the viewport and plays, reveals all resolve after scrolling, no Learn link with the flag off |
| Homepage first-load JS | 158.8 KB gzipped (modern; + 38.6 KB `noModule` polyfill legacy browsers fetch). Current site: 157.7 KB |
| CLS | 0.000 on every Lighthouse run |
| Placeholders | no TODO frames, "To come" labels or empty slots on any page |

**Lighthouse mobile (default, simulated throttling), new vs current, interleaved runs on the same
machine.** This machine was at 100 % CPU (dozens of other agents) throughout; the Lighthouse
Chromium and both servers ran at raised priority, but scores are still far below an idle machine
(the current site scored 92–96 here on 25 Oct and scores 49–83 now). The ≥ 85 performance
target is therefore **not verified**; the side-by-side shows where the new site stands.

Final build (1 interleaved pair per page):

| Page | New: Perf / A11y / BP / SEO | New LCP · TBT | Current: Perf | Current LCP · TBT |
|---|---|---|---|---|
| / | 66 / 100 / 100 / 100 | 4.19 s · 599 ms | 49 | 4.09 s · 2073 ms |
| /schools | 62 / 100 / 100 / 100 | 3.99 s · 840 ms | 79 | 3.30 s · 530 ms |
| /future-builders | 63 / 100 / 100 / 100 | 4.43 s · 493 ms | 64 | 4.02 s · 556 ms |
| /students | 56 / 100 / 100 / 100 | 4.10 s · 949 ms | 57 | 3.64 s · 1277 ms |

Previous build (9b2412a, 3 interleaved pairs per page, medians): new 58 / 58 / 63 / 72 vs current
57 / 66 / 72 / 78 (same page order); A11y/BP/SEO 100 everywhere for both.

Reading: accessibility, best practices and SEO are 100 on every run; CLS is 0; TBT is equal or
lower than the current site. The new site's simulated LCP is consistently ~0.4–0.8 s slower
than the current one (more font bytes for the serif + italic, a larger HTML/RSC payload from the
photo-led sections, and early image requests), which costs it a few performance points.

## 5. Remaining gaps / for the owner

- **Hero image.** Homepage uses `hero_students_collaborating.jpg`. Alternatives that fit:
  `students_building_project.jpg`, `teacher_mentoring.jpg`. One-line change in `components/home/Hero.tsx`.
- **The photos are AI-generated stock-style images** (the video carries a generator watermark
  sparkle in one corner). They are labelled illustrative; replacing them with real, consented
  photography from pilots and cohorts (via `content/media.ts`) remains the goal.
- **Performance:** to win back the LCP gap, consider dropping the italic serif (one font file)
  or serving fewer photo-led sections above the journal on mobile; re-measure on an idle machine
  or with PageSpeed Insights on the Vercel preview.
- Real product screenshots, pilot-school proof, the 1024 px brand mark and the Pip
  illustration are still to be supplied (see `docs/redesign-working-notebook.md` §4).
- The marketing visual baseline on `platform/main` (`platform/e2e/marketing-baseline/`) will
  need an owner-approved re-baseline when this merges, because every page changes visually.
