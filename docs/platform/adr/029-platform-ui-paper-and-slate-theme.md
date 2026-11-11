# ADR-029: The platform UI kit on paper by day and slate at night ("Ink and wash" in the app)

Status: **proposed** (design-system, 2026-11-11). Branch `design-system/ink-and-wash-theme`, based on
`marketing/ink-and-wash` at c2dcfaad; ships as its own pull request after the Lead agrees (plan §6, phase 4).
Related: ADR-028 (the "Ink and wash" language for marketing; it left the kit to this change), ADR-023 (app shell,
Light / Dark / System theme, the token groups), ADR-009 (scoped tokens, no Tailwind in platform UI), ADR-001 §7
(platform styles never reach marketing pages), [DESIGN.md](../../../DESIGN.md), plan
[`docs/redesign-ink-and-wash.md`](../../redesign-ink-and-wash.md) §0 decision 1, §2.1 to §2.3, §3.3 (`/learn`), §6 phases 4 and 6.

## Context

The owner chose (10 Nov 2026) language A, Ink and wash, for the site, "and B at night" in the app: by day the
ground is paper and the ring is ink; at night the ground is slate and the same ring is chalk. ADR-028 moved the
marketing pages to paper, Zodiak and Switzer, and said that the platform UI kit
(`components/platform/ui/styles/tokens.css`, owned by design-system) would follow in its own pull request with its
own ADR.

Until this change the app read as a second brand: a cool grey ground (`#f5f6f8`) with white cards, cobalt
(`#2b4fe6`) as the action, Inter and Instrument Serif, a LeetCode-style near-black (`#16171a`) at night, and a
blue, red and yellow tri-colour stripe (a linear-gradient) over the top bar. Two things in the plan also had no
home in the kit yet: the rubber stamp for streak days and rank cards (§2.1, §6 phase 6), and the rule that the
language has no gradients, glow or pills.

Constraints: no component logic changes (web-platform owns the pages, and another agent is changing `/plans` in
parallel); no change to `app/globals.css`, `app/layout.tsx` or any marketing file; every contrast pair in
`__tests__/kit.test.tsx` must keep passing in both themes; no new dependency.

## Options

1. *Leave the kit as it is.* The marketing site and the app stay two brands; the owner's night mode does not exist.
2. *Rename the kit's tokens to the language's names* (`--p-paper`, `--p-indigo`, ...) and update every component.
   Readable, but it touches the 29 CSS modules in web-platform paths that read `--p-*` (plus the kit's own), collides with the parallel `/plans` work,
   and changes nothing a student can see that option 3 does not.
3. *Keep the `--p-*` names (the ADR-023 contract) and change their values* (chosen), plus a few kit and shell
   stylesheet edits, and one new kit component, the `Stamp`.

For the thin line where the tri-colour stripe was, two ways were weighed: the painted stroke from `public/art/`
(`stroke-indigo.webp`, `stroke-chalk.webp`), or a plain rule in the action colour. The strokes are painted to sit
under a heading at about 11 em; stretched across a 1440 px bar at 2 to 3 px they smear, and they would add an image
request to every platform page. **Chosen: a 2 px rule in `--p-accent`** (indigo by day, mint at night).

## Decision

### Colour: the roles keep their names, the values move to paper and slate

Day is the paper set of plan §2.2, night the slate set. Where the plan has no direct value (fills, hover, soft
backgrounds, ramps), the value is a tint or a deepening of a plan pigment, chosen to pass the kit's contrast test.

| Role (token) | Day (paper) | Night (slate) |
|---|---|---|
| Ground `--p-bg` | paper `#fbfaf7` | slate `#0e1215` |
| Surfaces `--p-surface` / `-2` / `-3` | paper-2 `#f3f1ea` / `#ece9e0` / `#e0dccf` | slate-2 `#14181c` / `#1b2025` / `#252b31` |
| Text `--p-ink` / `-muted` / `-subtle` | ink `#1b1a19` / graphite `#4a4744` / muted `#6b6762` | chalk `#f2eee4` / chalk-muted `#b9b5aa` / `#9a968c` |
| Lines `--p-border` / `-strong` | rule `rgba(27,26,25,.14)` / `#77736d` | chalk-rule `rgba(242,238,228,.16)` / `#77736b` |
| Action `--p-accent` / hover / soft / on | indigo `#27467e` / indigo-deep `#14294f` / `#e4e8f0` / paper | mint `#9ec9c2` / `#bfddd8` / `#1a2a2a` / `#0b0f12` |
| Focus `--p-focus` | indigo | mint |
| Highlight (listen mode) | light turmeric `#ecc874`, ink on it | lamp `#f4c95d`, `#0b0f12` on it |
| Danger | madder `#a3302a` | madder-rose `#e08a7f` |
| Success | leaf `#3f6a2a` | `#a8cc8f` |
| Warning | turmeric deepened to `#7a5512` (turmeric itself is never text) | lamp |
| Info | indigo | `#bfddd8` |
| Pigments `--p-brand-blue` / `-red` / `-yellow` | indigo / madder / turmeric | mint / madder-rose / lamp |
| Stamp `--p-stamp` / `--p-stamp-solved` (new) | madder / leaf | madder-rose / `#a8cc8f` |
| Difficulty easy / medium / hard | leaf / `#7a5512` / madder | `#a8cc8f` / lamp / madder-rose |
| Mastery attempted / familiar / proficient / mastered | `#9c6c10` / henna `#9a562a` / indigo / leaf | lamp / `#dda27a` / `#9fb4de` / `#a8cc8f` |
| Streak flame | madder (as the streak stamp) | madder-rose |
| Heatmap | an indigo wash, `#e0dccf` to indigo | a mint wash, `#1e2429` to mint |
| Tiers bronze / silver / gold / sapphire / diamond / elite | henna / `#77736d` / `#8a6410` / indigo / `#2e6b64` / ink | `#dda27a` / chalk-muted / lamp / `#9fb4de` / mint / chalk |
| Diagrams accent / blue / green / yellow / brown / red | indigo / indigo / leaf / `#8a6410` / henna / madder | mint / `#9fb4de` / `#a8cc8f` / lamp / `#dda27a` / madder-rose |
| Avatar backgrounds | unchanged (a student picked them by name); `--p-avatar-ink` becomes ink | unchanged |

Contrast, as the kit test computes it (every pair in the test passes; the lowest margins shown):

| Pair | Day | Night |
|---|---|---|
| ink on ground | 16.6 | 16.2 |
| muted / subtle text on surface-2 (the tightest text pair) | 4.6 | 5.6 |
| action on surface | 8.2 | 9.8 |
| text on the action | 8.9 | 10.6 |
| control boundary on surface (3:1 needed) | 4.2 | 3.8 |
| stamp text on surface | 6.2 (madder), 5.6 (leaf) | 6.9, 9.9 |
| mastery "attempted" on surface (3:1 needed) | 4.1 | 11.3 |

The first draft used paper-3 (`#e9e6dc`) for `--p-surface-2`; muted text on it measured 4.49:1 and failed, so the
fill was lightened to `#ece9e0` (4.6:1) rather than darkening the muted text the plan specifies.

### Type

- `--p-font-sans` is Switzer (`var(--font-switzer)`), then Noto Sans Devanagari per glyph, then system faces.
- `--p-font-serif` is Zodiak (`var(--font-zodiak)`), then Georgia. It is used by title slides, the store, and now
  the `PageHeader` title (Zodiak 400; a Hindi title keeps Noto Sans Devanagari at 600).
- `--p-font-devanagari` and the `lang="hi"` rules are unchanged (ADR-023).
- Both variables are set on `<html>` by the root layout (`lib/fonts.ts`, ADR-028), so the kit needs no font code.

### Shape, motion, the few stylesheet edits

- `--p-radius-pill` becomes 7 px, the soft corner of the marketing buttons and chips: the language has no pill
  buttons. Thin tracks (8 px high) still end round, since a radius is capped at half the height.
- `--p-ease` becomes "bleed and settle", `cubic-bezier(.3,.7,.2,1)` (DESIGN.md §5). Shadows use ink, not cool grey.
- The skeleton's gradient sweep becomes a flat wash whose opacity breathes (`kit/Display.module.css`).
- `shell/appshell.module.css`: the tri-colour stripe becomes the 2 px action-colour rule; the top bar and the phone
  tab bar sit on the ground, like the marketing header, so paper-2 surfaces read as cards.
- `shell/platform-global.css`: the page canvas is paper / slate, and the cookie bar's night overrides move to
  slate-2, chalk and mint (its checkboxes too). The cookie bar's own markup is not touched.

### The Stamp (`components/platform/ui/kit/Stamp.tsx`)

A double-ringed rubber stamp, rotated a few degrees: label round the top, an optional caption round the bottom,
the number in Zodiak; madder, or leaf for `tone="solved"` (a goal met, a promotion). One inline SVG and a CSS
module, server-safe, no image request; `useId` keeps each stamp's text paths and its fixed-seed wear filter unique,
so server and client draw the same stamp. Named by what it shows (or `decorative`), tilt clamped to ±12°, at least
72 px, plain in forced colours. **Allowed for streak days and rank cards only** (plan §2.1).

It is shown in the gallery (`/dev/ui#stamp`) and **not mounted in the app** by this change: every place that shows a
streak or a rank is a web-platform file outside this pull request's paths. Where it should go (web-platform, plan §6
phase 6):

1. The learning home's progress teaser, beside or instead of the flame and number
   (`components/platform/learn/LearnHome.tsx`, the `streakRow`).
2. The dashboard's streak (`components/platform/dashboard/DashboardClient.tsx`, `data-testid="dashboard-streak"`),
   with `tone="solved"` on a day the daily goal is met.
3. The weekly league / rank card (`components/platform/leaderboard/WeeklyLeague.tsx`): the student's rank, caption
   the league.

One stamp per screen; keep the written number beside it and pass `decorative`, or drop the text and let the stamp's
name carry it. Not for the top-bar streak chip (too small; 72 px is the floor).

## Consequences

- Every platform page changes appearance; no component's markup or logic changes, and every `--p-*` name a
  component reads still exists.
- Marketing is untouched: the built CSS of every prerendered marketing page is byte-identical to the base commit
  (same chunk names and hashes, flag on). Only platform chunks changed.
- After this change **the kit no longer reads `--font-inter` or `--font-instrument-serif`.** Nothing else reads
  Instrument Serif, so a later change to `app/layout.tsx` can drop it. Inter is still read by the Future Builders
  pages (`.brand-legacy` in `app/globals.css`) and `components/home/MiniSimulator.tsx`, so it must stay defined;
  that later change can stop preloading it on every page instead. This ADR does not edit `app/layout.tsx`.
- Switzer ships 400, 500 and 600. Component styles that ask for 650 to 800 render at 600
  (`font-synthesis-weight: none`), so headings in the web-platform modules are a little lighter than before; Zodiak has
  one weight, 400. Which other headings should move to Zodiak is a per-page decision for web-platform.
- Switzer has no rupee sign: ₹ falls back per glyph to Switzer's metric-matched Arial fallback (or Noto Sans
  Devanagari), as on the marketing pages. Prices that should look set belong in Zodiak (DESIGN.md §3).
- Diagram colours change hue a little (vivid blue becomes indigo, and so on); each named colour is still the colour
  its label says, and passes 3:1 in both themes.
- Still out of language after this change, in web-platform files this pull request may not edit (follow-ups): radial
  gradients behind the `/learn` hero (`learn/home.module.css`) and the league card (`leaderboard/league.module.css`),
  linear-gradient shines in `coins/store.module.css` and others (`dashboard`, `flashcards`, `lesson`, `me/insights`,
  `learn/course`, `coins`), and a hard-coded cobalt step in the admin heatmap (`admin/analytics/analytics.module.css`).
  The `/learn` door and ring of plan §3.3 replace the hero in phase 5. The marketing cookie bar's round buttons belong
  to the marketing components.
- Rollback is a revert of the kit and shell stylesheet commits; nothing else depends on the new values.
- Tests: `__tests__/kit.test.tsx` gains the stamp's text pairs; `__tests__/stamp.test.tsx` covers the Stamp.
