# Phase 1 — Audit of the existing site

_Written before any redesign work. Reflects the codebase as of commit `4cf038f`._

## Stack

| Concern | Current |
| --- | --- |
| Framework | Next.js 16.3 (App Router, Turbopack), React 19 |
| Styling | Tailwind CSS v4, tokens declared in `app/globals.css` under `@theme` |
| Motion | `framer-motion` 13 (`ScrollReveal`) **and** `gsap` + `ScrollTrigger` (`Interruption`, `AiManifesto`, `EditorialImage`) |
| Fonts | Instrument Sans (UI/display), Instrument Serif (editorial accents) via `next/font` |
| Content | Typed TS modules in `/content` (no CMS wired up; `lib/cms/sanity.ts` is a stub) |
| Docs found | **No `/docs` folder existed.** `DESIGN.md` at the repo root is a _Notion_ design analysis, not SOYL's system — it is not authoritative for this project. The real design tokens live in `globals.css`. |

## The SOYL design language that already exists (keep)

- **Palette:** ink `#171717`, cobalt `#3155FF`, teacher-red `#D84A3F`, highlighter `#F2D45C`, paper `#F4F0E7`, bone `#FAFAF8`, white canvas.
  Rule already encoded in the CSS: _white is the canvas, paper belongs inside artifacts only_; cobalt is the single "interactive/thinking" accent; red is the teacher's pen.
- **Type:** one grotesk + one serif used sparingly. Tight negative tracking, `text-display / hero / headline / subhead / lead / body / eyebrow / manifesto` scale with `clamp()`.
- **Device vocabulary:** teacher-pen annotations (hand-drawn SVG circles/arrows in red), ruled-paper "artifacts", highlighter marks, hairline rules instead of card borders, small notebook-grid motif in the header.
- **Layout:** 12-column grid, `container-default` (1180px), generous `section-padding`.
- **Accessibility groundwork:** skip link, visible `:focus-visible`, global `prefers-reduced-motion` rule, `VideoLoop` that never fetches video for reduced-motion users.
- **Voice:** the strongest lines are already written — _"Homework was built for a world before AI."_, _"Learning is a verb."_, _"Less busywork. More doing."_, _"Change what homework means."_, _"Thinking is the work."_, _"We don't want students to stop using AI."_

## Homepage as it stands: 14 stacked sections

| # | Component | Idea | Words of copy (approx.) | Verdict |
|---|---|---|---|---|
| 1 | `Hero` | Headline + photo + red annotation | ~45 | **Redesign** — keep headline, shorten support line, replace static photo with a living transformation visual |
| 2 | `Interruption` | GSAP-pinned "Ask. Generate. Copy. Paste. Submit." | ~40 | **Merge** into one scroll story (problem) |
| 3 | `OldAssignment` | Photo + ruled-paper artifact + Prompt→AI→Answer→Submit chain | ~60 | **Merge** into problem story |
| 4 | `Transformation` | Static "Energy Challenge" document + labels | ~70 | **Redesign** as an animated old→SOYL transformation |
| 5 | `SoylMethod` | Five ruled rows, each with tagline **and** body | ~110 | **Redesign** as a scroll-driven visual sequence, one short sentence each |
| 6 | `ForTeachers` | Photo + 6-step rail + two paragraphs | ~100 | **Replace** with animated product demo |
| 7 | `StudentExperience` | Staggered "Solve something…" statements + video | ~90 | **Retire** from homepage; its line "Less busywork. More doing." becomes the subjects headline; page `/students` already covers it |
| 8 | `AiManifesto` | GSAP-pinned manifesto | ~60 | **Redesign** as scroll-linked typographic moment |
| 9 | `BuiltAroundTeachers` | "AI should support judgement." | ~25 | **Retire** (idea folded into product demo: teacher edits the draft) |
| 10 | `TwoPaths` | Schools / Students | ~55 | **Replace** with three entry points (Teachers / Students / Schools) |
| 11 | `WhatWeTeach` | Programs teaser | ~80 | **Retire** from homepage (dedicated `/what-we-teach` page + nav) |
| 12 | `SoylJournal` | Article teasers | ~60 | **Retire** from homepage (dedicated `/journal` page + nav) |
| 12b | `Faq` | Answer-first FAQ, mirrors `FAQPage` JSON-LD | ~250 | **Keep** — required so the JSON-LD matches visible content (SEO/AEO). Moves to the bottom, unchanged |
| 13 | `EducationManifesto` | "Thinking is the work." | ~40 | **Fold** into the philosophy section |
| 14 | `FinalCta` | Portrait + CTA | ~35 | **Simplify** to a type-led close |

Total visible homepage copy is roughly **1,100+ words** across 14 sections, with at least four sections repeating the same idea (the assignment is broken / thinking matters / teacher stays in charge).

## Problems identified

1. **Too much explaining.** Most sections pair a headline with a lead paragraph _and_ a second paragraph. The core idea (AI gives answers; SOYL makes students think) is stated 5+ times in prose.
2. **The product is invisible.** Nothing on the homepage shows what a teacher or student actually does in SOYL. `ForTeachers` lists six steps as text.
3. **Subject breadth is invisible.** Nothing hints that assignments go beyond a text box.
4. **Two animation systems.** GSAP pins (`Interruption`, `AiManifesto`) use `scrub` on a long pinned timeline; everything else is a single generic fade-up (`ScrollReveal`) applied identically to nearly every block — the "fade-in-everything" pattern the brief asks us to avoid.
5. **No interaction beyond hover colour.** Buttons and cards have no press/tilt/spring feedback.
6. **Mobile = desktop stacked.** Sections collapse to one column but keep the same copy volume; pinned GSAP scenes are 320% tall.
7. **No social-proof architecture.** There is nowhere to put testimonials, school logos, project photos or stats once they exist.
8. **Dead weight.** `lib/animations/gsap-config.ts` is unused; the global `rounded` language is inconsistent (`rounded-sm` buttons vs `rounded-lg` photos vs `rounded-xl` forms).

## Decisions

- **Retain:** hero headline, palette, type, annotation devices, FAQ block, header/footer, all non-home pages.
- **Simplify:** every homepage section to one idea, ≤ 8-word headline, ≤ 2 short sentences.
- **Redesign:** hero visual, problem story, transformation, method, product, subjects, entry points, manifesto, final CTA.
- **Add:** a hidden-until-populated social-proof section with a typed content contract.
- **Motion stack:** standardise _new_ work on `framer-motion` (already a dependency, already used). GSAP is no longer needed on the homepage; it stays only for `EditorialImage` until that component is migrated.
- Retired section files are **left in the repo** (not deleted) so the redesign is easily reversible while it is reviewed; see `docs/website-architecture.md`.
