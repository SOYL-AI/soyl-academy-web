# ADR-028: Marketing design language "Ink and wash", with a slate night theme for the app

Status: **proposed** (marketing, 2026-11-10). Owner decisions are recorded in
[`docs/redesign-ink-and-wash.md`](../../redesign-ink-and-wash.md) §0. The visual baseline is
**not** re-captured by this ADR: the owner approves the new look first (see "Baseline").
Related: ADR-001 (platform inside the marketing app; shared-file rule), ADR-023 (platform app
shell and theme), ADR-025 (marketing header and footer), D-019 and GEN-4 (flag-gated platform
entry points), WEB-1 (no third-party requests at runtime).

If another ADR takes the number 028 before this merges, renumber this file at merge; nothing
links to it yet except the plan.

## Context

The owner, 2026-11-10: the site "is not very nice"; it should sell the product genuinely, "not
just like a discount or something slapped all over"; take the painted p5.brush look of the SOYL
portfolio as the reference; show options first. Three languages were shown as rendered specimens
(https://claude.ai/artifact/UtaCNZZByQjbbXZvdU9e3L). The owner chose A, Ink and wash, with B,
Slate and chalk, as the night mode in the app; chose to lead the homepage with free learning; and
kept the Diwali offer tab.

What was measured on the live site the same day is in the plan, §1. Two findings drive this ADR:

- Marketing pages (white, Newsreader, Inter) and the app (`/learn`, `/plans`: Inter on a dark or
  cool grey ground) read as two different products.
- `main > section ~ section { content-visibility: auto; contain-intrinsic-size: auto 900px }` in
  `app/globals.css` makes the homepage 13,002 px tall at load and 10,929 px after scrolling,
  pulling the scroll position back three times on the way down.

This is the fifth visual direction since September (Primer editorial, Working Notebook, editorial
restore, the calm single-typeface language in the skills hub). The earlier four share one recipe.
This ADR records a language with a material of its own, so that the next change is a refinement
and not another reskin.

## Options

1. *Keep the editorial language and fix only the homepage order and the scroll bug.* Smallest
   change. Leaves two brands and no owned material.
2. *Adopt the app's current look on marketing pages.* One brand, but it is the generic one.
3. *One language on two grounds: paper by day, slate at night* (chosen). Marketing and the app's
   light theme use paper and ink; the app's dark theme uses slate and chalk; the same painted ring
   is the signature in both.

For fonts (Zodiak and Switzer, Fontshare, ITF Free Font License: free to use on a website, not to
be redistributed as files), in a **public** repository:

a. *Commit the woff2 files.* Simplest, but it republishes the files.
b. *Load from Fontshare's CDN at runtime.* A third-party request from every visitor, most of whom
   are minors; breaks WEB-1 and needs a CSP change.
c. *Fetch at build time into a git-ignored folder and self-host with `next/font/local`* (chosen).
   No file in the repo, no runtime third-party request. The build already needs the network for
   `next/font/google`.

## Decision

### Shared files this ADR covers

- `app/globals.css`: the `@theme` block is replaced by the tokens in the plan §2.2 (paper set and
  slate set). The `content-visibility` rule above is deleted. Legacy token names that other files
  still read are re-pointed, not removed, until phase 5 finishes.
- `app/layout.tsx`: Newsreader is replaced by Zodiak and Switzer through `next/font/local`.
  `--font-inter` and `--font-instrument-serif` stay defined until the app's own theme change
  (below) lands, because the platform UI kit reads them.
- `package.json`: a `prebuild` and `predev` step runs `scripts/fetch-fonts.mjs`. It exits 0 when
  Fontshare is unreachable (the metric-matched fallbacks render), so it can never fail a build.
  `.gitignore` gains `assets/fonts/`.
- No new runtime dependency. Paint is shipped as images from `public/art/`; the site carries no
  canvas, WebGL or animation library. Sources live in `tools/art/` (p5.brush is MIT; its licence
  file is added there).

### The platform UI kit is a separate change

`components/platform/ui/styles/tokens.css` (owned by design-system) becomes paper in the light
theme and slate in the dark theme in **its own pull request with its own ADR**, after the Lead
agrees and after the marketing change is approved. This ADR does not touch `components/platform/ui/**`.
The one platform path the marketing work touches is `components/platform/plans/*` (plan §6,
phase 3): new sections above the plan cards; Razorpay and the plan data flow are unchanged.

### Flag behaviour

Unchanged. With `NEXT_PUBLIC_PLATFORM_ENABLED` off, no marketing page contains a platform link.
The new homepage therefore has two states of its first screen (plan §3.1).

### What stays

Every URL and its status code; the header and footer structure of ADR-025; the consent banner
and consented analytics; Future Builders' own brand, its cohort logic and the Diwali offer tab
(restyled only); forms and their endpoints; SEO plumbing in `lib/seo/*` (titles and descriptions
change for `/` and `/schools`); legal text.

## Consequences

- Every marketing page changes visually, so `platform/e2e/marketing-baseline/` needs an
  owner-approved re-baseline (`npm run marketing:baseline -w @soyl/e2e`) before the regression
  gate can be green again. Until then the gate is expected to show diffs on this branch only.
- Builds need to reach `api.fontshare.com` to get the brand faces. A build without network still
  succeeds and renders fallbacks.
- The homepage keeps one height from load to the bottom. Sections are fewer and shorter, so the
  layout cost that `content-visibility` was saving is smaller than before.
- The classroom photographs and the looping video, which are AI-generated, are retired page by
  page and replaced by real photographs (Pexels and other open collections, credited in
  `content/credits.ts`) printed as duotones. A recognisable child's face is never placed beside
  a price, a claim or a number.
- Prices, allowances and dates shown on marketing pages are read from
  `platform/shared/config/*` and `content/exam-dates.ts`, each with a unit test, so a config
  change cannot leave a stale figure on the site.

## Baseline

Not re-captured here. The owner sees the pages on the branch's preview deploy first; the
re-baseline is a separate, explicit step at the end of the plan (§6, phase 6).
