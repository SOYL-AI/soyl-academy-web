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
  AVIF/WebP via the existing `images.formats`, honest `sizes`, lazy below the fold, `preload`
  (Next 16 replacement for `priority`) only on hero images.
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
- Proof stays real-or-absent (`content/proof.ts`); TODO frames show only in dev/preview.
  Product-screenshot slots in `content/media.ts` no longer render TODO frames — the layouts
  stand without them and show a screenshot as soon as a file is supplied.
- Root layout still provides `--font-inter` and `--font-instrument-serif` for the learning
  platform's UI kit (Instrument Serif is no longer preloaded, since marketing pages don't use it).
  No new inline `<head>` script (the platform CSP hashes only the consent boot script).

## 3. Dependencies

None added. Motion is CSS + one IntersectionObserver; framer-motion/GSAP were not needed.
Fonts are self-hosted by `next/font` (Newsreader 400 normal + italic, Inter, Instrument Serif).

## 4. Results (production build, local, 27 Oct 2026)

RESULTS_TABLE

## 5. Remaining gaps / for the owner

- **Hero image.** Homepage uses `hero_students_collaborating.jpg`. Alternatives that fit:
  `students_building_project.jpg`, `teacher_mentoring.jpg`. One-line change in `components/home/Hero.tsx`.
- **The photos are AI-generated stock-style images** (the video carries a generator watermark
  sparkle in one corner). They are labelled illustrative; replacing them with real, consented
  photography from pilots and cohorts (via `content/media.ts`) remains the goal.
- Real product screenshots, pilot-school proof, the 1024 px brand mark and the Pip
  illustration are still to be supplied (see `docs/redesign-working-notebook.md` §4).
- The marketing visual baseline on `platform/main` (`platform/e2e/marketing-baseline/`) will
  need an owner-approved re-baseline when this merges, because every page changes visually.
