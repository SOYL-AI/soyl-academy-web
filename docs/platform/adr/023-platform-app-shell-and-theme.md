# ADR-023: Platform app shell and the Light / Dark / System theme

Status: accepted (web-platform + design-system, 2026-10-28)
Related: ADR-001 (platform inside the marketing app; route group; shared-file rule), ADR-005 (same-domain proxy), ADR-009 (web dependencies, scoped tokens), ADR-011 (web) (security headers, nonce CSP), ADR-017/018 (learning core, tests), ADR-021 (SOYL Coins), D-014 / D-039 (consent-gated public features, pseudonymous names), D-037 / D-038 (coins earn-only, redemption "coming soon"), D-041 (go-live), WEB-1, WEB-3, WEB-5, WEB-6.

## Context

The owner (2026-10-28): "the UI/UX of the learn platform is not that great … enhance it based on leading platforms like LeetCode and FUT and Khan Academy … and keep light and dark mode options". On the live site:

1. Platform pages rendered **inside** the marketing header and footer (ADR-001 §7): two nav bars, "Sign in" and "Log in" side by side, and the large marketing footer under every lesson.
2. Dark mode was half done: the platform area followed `prefers-color-scheme`, but the marketing header, footer and cookie bar stayed white, and there was no switch.
3. No app-level sense of progress (no mastery, streak, "continue"), generic cards on a beige background, a one-question-at-a-time practice view.

The root layout (`app/layout.tsx`) is shared by marketing and platform routes and renders `<Header />`, `<main>`, `<Footer />`, the cookie bar and analytics. Marketing pages must not change at all (golden rule 1; the marketing regression is zero-diff against a committed baseline).

## Decision

### (a) Platform routes skip the marketing header and footer

**Options**

1. *Two root layouts* (`app/(marketing)/layout.tsx` + `app/(platform)/layout.tsx`): the cleanest separation, but it moves every marketing page into a new folder (a large diff in marketing files), turns every platform↔marketing navigation into a full page load, and duplicates the root layout (fonts, consent boot script, structured data, cookie bar).
2. *CSS only* (`body:has(.soyl-platform) > header { display: none }`): no JS, but the marketing header and footer markup (and the footer's links) would still ship on every platform page, and the hidden header's script still runs.
3. *The marketing Header and Footer render nothing on platform paths* (chosen). `Header.tsx` (already a client component with `usePathname`) returns `null` when `platformChromeActive(pathname)`; `Footer.tsx` (a server component) wraps its unchanged markup in `<MarketingOnly>`, a client component that renders its children unless the path is a platform path. The test is `NEXT_PUBLIC_PLATFORM_ENABLED === 'true' && isPlatformPath(pathname)` — the same `platform/shared/config/platform-routes.ts` list that `ConsentedAnalytics` and `proxy.ts` use — so with the flag off every platform URL is still the marketing 404 with the marketing chrome (GEN-4).

Changes to shared files: `components/layout/Header.tsx` (+3 lines: one import, one early return after the hooks) and `components/layout/Footer.tsx` (+3 lines: one import, the wrapper). `MarketingOnly` adds no DOM element, so marketing HTML is identical; `app/layout.tsx` is untouched. Proven by `npm run marketing:regression` (zero diffs against the committed Windows baseline) and `npm run marketing:diff`.

The platform layout now renders its own **app shell** (`components/platform/shell/AppShell.tsx`): a compact top bar (SOYL mark → `/learn`; Learn, Tests, Ask AI, Leaderboard; streak, SOYL Coins, today's AI credits when a parent approved AI (D-014), theme picker, profile / Log in), a mobile tab bar under 768 px (Learn, Tests, Ask AI, Ranks, Me; hidden on immersive pages — lesson, flashcards, test player, live mock — whose own controls dock to the bottom), and a quiet app footer with the way back to soylai.com, Plans, Privacy, Terms and **Cookie preferences** (the cookie bar itself still comes from the root layout and keeps working on every platform page). A platform `not-found.tsx` renders unknown boards/classes/subjects/chapters inside the shell. Because the shell sits inside the root layout's `<main>`, it adds its own "Skip to page content" link to `#platform-content`.

### (b) Theme: Light / Dark / System, persisted, no flash

* **Storage:** a first-party cookie `soyl_theme=light|dark|system` (Path=/, one year, SameSite=Lax, Secure on https, readable by JS). It is a preference the student sets, so it is an essential/functional cookie (no consent category needed) and it keeps localStorage to `soyl_guest_v1` (WEB-5). Default: `system`.
* **Before first paint:** `/learn/**` pages are static/ISR, so the server cannot read the cookie without making them dynamic (and losing the cache, ADR-010). Instead a **constant inline script** (`THEME_BOOT_SCRIPT` in `components/platform/shell/theme.ts`) is the first child of the platform root; it reads the cookie, resolves `system` with `matchMedia`, and sets `data-theme="light|dark"` (and `data-theme-pref`) on the platform root and `data-platform-theme` on `<html>`. It runs while the HTML is parsed, before the page paints.
* **CSP (WEB-3):** the static policy on `/learn/**` already allows inline scripts (F-010 exception, ADR-011). On the nonce routes the script carries no nonce (the layout is shared with static routes, and reading the nonce would make every platform page dynamic); it is allowed by its **SHA-256 hash**, exactly like the root layout's consent boot script (`THEME_BOOT_SCRIPT_HASH` in `security-headers.ts`). `'strict-dynamic'` honours hashes. The e2e now checks that every script without a nonce is an inline script whose exact hash is in the policy.
* **WEB-6:** `ThemeBootScript.tsx` uses `dangerouslySetInnerHTML` for a compile-time constant with no data; it carries a reviewed `eslint-disable-next-line react/no-danger` naming this ADR. No user text can reach it.
* **After hydration:** `ThemeProvider` reads the cookie, follows OS changes for "System", writes the cookie when the student picks a theme, and applies the theme in a layout effect (so client-side navigation from a marketing page into the platform, where the inline script does not run, is themed before paint). It removes `data-platform-theme` from `<html>` when the platform unmounts, so a marketing page reached by client navigation is exactly as before.
* **Whole page:** `components/platform/shell/platform-global.css` (imported only by the platform layout) styles the page canvas and the existing cookie bar for dark mode. Every selector requires `html[data-platform-theme]`, which only exists while a platform page is open; the marketing `CookieConsent` component is not changed.
* **Palette:** `tokens.css` keeps light/dark blocks (forced `data-theme` and the `prefers-color-scheme` fallback for the instant before the script). Light is a cool neutral app background (`#f5f6f8`) with white surfaces; dark is a LeetCode-style neutral near-black (`#16171a` / `#1f2024`, never pure black). SOYL cobalt, red-pen and highlighter yellow (the marketing tri-stripe) are brand accents. New semantic tokens: difficulty (`--p-easy|medium|hard` + soft), mastery levels (`--p-m-*`), streak flame, heatmap ramp (`--p-heat-0…4`), league/card tiers. `kit.test.tsx` checks AA text contrast and 3:1 graphics contrast for every pair in **both** themes; the e2e runs axe on the main pages in dark mode at 360 px.

### (c) Dependencies

None. Motion is CSS only (transitions on hover/progress, honouring `prefers-reduced-motion` through the existing token rules); icons are the kit's inline SVG set; mastery rings, heatmap, player card, podium and rarity frames are plain React + CSS modules. The route JS budget (≤ 200 KB gz first load, `bundle.mjs`) still applies and passes.

## Product patterns adopted (what the shell hosts)

* **Khan Academy:** mastery levels (not started → attempted → familiar → proficient → mastered) from the shared formula `platform/shared/learning/mastery.ts` (members: `GET /v1/me/mastery`; guests: the same function over device progress); course sidebar; course mastery ring + segmented bar; "Up next / Continue"; a learning path on the chapter hub (Lesson → Notes → Flashcards → Practice → Chapter test) with per-step state.
* **LeetCode:** practice as a problem list (status solved / attempted / new, Easy / Medium / Hard, filters by status, difficulty and type, "Solved x/y" with per-difficulty counts) beside a focused workspace; J / K and Ctrl+Enter shortcuts; an activity heatmap on IST days (`GET /v1/me/activity`).
* **FIFA Ultimate Team:** a **private** player card (`GET /v1/me/card`: overall 40–99, bronze/silver/gold/elite frames, attributes), the weekly league as a tiered card with a podium and promotion/relegation zones (`GET /v1/leagues/current`, consent-gated), store items as collectible cards with **deterministic** rarity frames. No loot boxes, packs, random rewards or purchases of any kind (children's product); coin redemption stays off (D-038); public names only (D-039).

## Consequences

* Platform pages no longer show the marketing navigation. Students reach the main site through the app footer ("soylai.com"); the marketing header still links to `/learn` when the flag is on.
* Two tiny edits in shared marketing components, both gated on the platform flag and path; any future change to the marketing Header/Footer must keep the `platformChromeActive` guard.
* The theme cookie is readable by scripts on the site (it holds only `light|dark|system`).
* The nonce CSP lists two script hashes; changing `THEME_BOOT_SCRIPT` changes its hash automatically (computed at module load), and the unit test pins the relationship.
* `platform-global.css` styles the cookie bar's elements by tag inside `.cookie-bar` in dark mode only; if the marketing cookie bar's markup changes, re-check it in dark mode (the e2e axe run covers contrast).
* Platform pages are taller than the viewport only when their content is; the platform root fills the viewport so short pages never show the marketing background.
