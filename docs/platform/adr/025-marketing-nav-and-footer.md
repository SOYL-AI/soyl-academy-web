# ADR-025: Marketing header mega menus and a light footer

Status: accepted by the Lead for owner review (marketing, 2026-10-28). The visual baseline is **not** re-captured: the owner approves the new look first (see "Baseline" below).
Related: ADR-001 (platform inside the marketing app; shared-file rule), ADR-023 (platform app shell: the marketing header and footer step aside on platform paths), D-019 (flag-gated platform entry points), GEN-4 (flag off = no platform).

## Context

The owner, 2026-10-28: "Do you think the nav bar and the footer can be improved. For the footer try the design of Sarvam AI, and for nav bar I feel like when I hover over About it should show more options like team, this and that … Everything needs to have a good visual hierarchy."

Before this change the top bar was a flat row of five or six text links (Learn when the flag is on, For schools, For teachers, For parents, Future Builders, About), and "For students", "The SOYL Method", "What we teach", "Journal" and "Contact" were reachable only from the footer or from page bodies. The footer was a dark ink band with a slogan, one button and four link columns.

We took Sarvam's **patterns**, not its look: SOYL's colours (cobalt, red pen, highlighter, ink, paper), fonts (Inter, Newsreader), radii and the tri-stripe stay; no Sarvam asset, illustration or copy is used. Every label and description is written from the existing page copy (`lib/seo/pages.ts`, page heroes). No page was added; no person or fact was invented.

## Options

1. *Keep flat links, add a dropdown only under About.* Smallest change, but leaves half the site out of the top bar and does not give the hierarchy the owner asked for.
2. *A menu library (Radix NavigationMenu, Headless UI).* Good accessibility out of the box, but a new runtime dependency on every marketing page and its ARIA `menu`-style semantics are not what a site navigation needs.
3. *Hand-written disclosure menus in one small client island* (chosen). The WAI-ARIA disclosure navigation pattern (`button[aria-expanded][aria-controls]` + a region of links), no dependency, CSS-only motion.

## Decision

### Header (`components/layout/Header.tsx`, `SiteHeader.tsx`, `MenuParts.tsx`, `NavIcon.tsx`)

* **Groups** (config in `lib/site.ts`, `NAV_GROUPS`): **Programs** (For schools, For teachers, For parents, For students, The SOYL Method; card: "See SOYL in your school" → Book a demo), **Future Builders** (Future Builders, What we teach; card: "Build a working prototype"), **Learn** *only when `NEXT_PUBLIC_PLATFORM_ENABLED=true`* (Free lessons, Tests, Ask AI; card: "Free for every CBSE & ICSE student" → Start learning free), **About** (About SOYL, The SOYL Method, Journal, Contact, Book a demo; card: the **latest Journal post**). Each item has an icon tile (brand tones cycling blue / red / yellow), a title and a one-line description.
* **Team and Careers** do not exist (no page, no content). They are **not** linked. `COMPANY_ITEMS` in `lib/site.ts` documents the one line to add for each once the owner supplies the page; the desktop panel, mobile sheet and footer pick it up automatically.
* **Right side:** flag ON → "Log in" (`/me`, which shows the platform log-in sheet to guests and the profile to members) + "Book a demo"; the teacher app's sign-in moves into the Programs panel ("Already a SOYL school? Sign in to the teacher app") so the bar no longer shows two different sign-ins. Flag OFF → "Sign in" (the teacher app, `APP_URL`) + "Book a demo", exactly as before.
* **Server/client split:** `Header.tsx` is now a server component. It resolves the About card from `content/journal.ts` at build time and renders the logo, every desktop panel, the mobile accordion bodies, the Learn card and the action links (`MenuParts.tsx`, `NavIcon.tsx`, server-only) and passes them as React nodes to the client island `SiteHeader`. The island holds only state and the pointer / keyboard / focus logic (plus the chevron). This matters because the root layout imports the island on **every** route, platform routes included, where it counts against the platform route JS budget (≤ 200 KB gz, ARCHITECTURE §16): a first version that rendered the menus in the client pushed the lesson page to 201.9 KB gz. Item `aria-current` is set by the island after navigation, since the items are server-rendered. `SiteHeader` keeps ADR-023's guard verbatim: `if (platformChromeActive(pathname)) return null;` after its hooks. `app/layout.tsx` still renders `<Header />` unchanged.
* **Behaviour (≥ 1024 px):** a full-width panel under the sticky bar; opens on hover after 90 ms (mouse only; touch and pen use click), moving between buttons while one is open switches at once, leaving closes after 180 ms; click / Enter / Space toggle; a click on a hover-opened panel pins it rather than closing it. The page behind is dimmed and slightly blurred (`bg-ink/20 backdrop-blur-[2px]`, below the header's z-index); clicking it closes the panel. The panel is `position: absolute` inside the sticky header, so opening it causes **no layout shift**; the bar keeps its 64 / 72 px height.
* **Below 1024 px:** the existing menu button opens a full-height sheet (`#mobile-menu`, as before) with accordion groups showing the same items and descriptions, the Learn card at the top when the flag is on, and "Log in" / "Sign in" + "Book a demo" pinned at the bottom (safe-area aware).

### Accessibility

* Disclosure pattern, **not** ARIA menu roles: each group is a `<button aria-expanded aria-controls>`; the panel is a plain region of links in DOM order right after its button, so Tab goes button → panel links → next button. No `role="menu"`, `menuitem` or `menubar` (the e2e asserts it).
* Keyboard: Enter / Space / ArrowDown open and move focus to the first link (ArrowUp: last); ArrowDown / ArrowUp / Home / End move between links; ArrowLeft / ArrowRight move between the top-level buttons; **Escape** closes and returns focus to the button; tabbing out of the navigation closes the panel. Pointer: outside click and route change close it; following a link closes it even when the URL does not change.
* Mobile sheet: body scroll locked (`html { overflow: hidden }` while open, restored after), focus moves into the sheet, **Tab / Shift+Tab are trapped** in the menu button + sheet, Escape closes and returns focus to the menu button, it closes on navigation and if the window grows to desktop width. Accordion buttons use `aria-expanded` / `aria-controls`.
* Current page: `aria-current="page"` on the matching item; a red-pen dot (decorative) marks the current group.
* Motion: CSS only (`@starting-style` fade/slide of 200 ms, chevron rotation); the existing `prefers-reduced-motion` block in `globals.css` turns all of it off.
* Icons are inline SVG, `aria-hidden`; the Instagram icon link is named "SOYL Academy on Instagram (opens in a new tab)". axe (WCAG 2.1 A/AA, serious + critical) is clean with a desktop panel open and with the mobile sheet open, in both flag states.

### Footer (`components/layout/Footer.tsx`)

> **Revised 2026-10-29 (owner):** "Try another footer design, I feel the previous one was better, and from Sarvam I just liked how their company name is written at the dead bottom." The footer is back to the **dark ink band** that predates this ADR (tri-stripe, the serif line "Learning that still asks students to *think.*", Book a demo, link columns, the legal bar with the logo, "© {year} SOYL AI Private Limited · Bengaluru 560043", the email, Instagram as a text link and "Photography is illustrative."). It keeps this ADR's link columns (Programs, Future Builders, Learn when the flag is on, Company, Legal; a five-column grid when Learn is present). New: an oversized **"SOYL" wordmark** closes the footer. It is decorative (`aria-hidden`; the name is in the logo and legal line), Inter 600, sized to the page width with container-query units (`41.5cqw` of `.page`), centred with flex, a white 35 % → 12 % gradient on ink, and its baseline rests on the footer's bottom edge so every letter stays whole (a deeper crop cut the foot off the L and read "SOYI"). The CTA band and the light footer described below are retired.


* **Pre-footer CTA band:** a large rounded cobalt card (tri-stripe on top, decorative highlighter disc, red-pen quarter, two drawn rings): eyebrow "For schools", "Bring future-ready learning to your *school.*", the existing line "Interactive assignments for Grades 1–10, written from your notes and approved by you.", **Book a demo**, and **Start learning free** (`/learn`) only when the flag is on.
* **Main footer, light** (`bg-paper/40` over white, replacing the dark ink footer): a brand block (wordmark, the existing tagline `SITE_TAGLINE` "Thinking is the work.", "Find us at" + the Instagram icon link — the only profile in `lib/site.ts`, none added — the contact email from `lib/seo/config`, "© {year} SOYL AI Private Limited. Bengaluru, Karnataka 560043" and the existing "Photography is illustrative.") and link columns **Programs, Future Builders, Learn (flag on only), Company, Legal** with small uppercase muted headings (`t-eyebrow text-muted`) and 15 px links. Cookie preferences stays in Legal (`CookieSettingsButton`). A tri-stripe closes the page.
* Still a server component wrapped in ADR-023's `<MarketingOnly>`; still `cv-auto` (rendered only near the viewport).

### Shared files changed

| File | Change |
|---|---|
| `components/layout/Header.tsx` | Now a server component: resolves menu data, renders all menu content, hands it to `SiteHeader` |
| `components/layout/SiteHeader.tsx` (new) | The client island: top bar shell, disclosure buttons, panel / backdrop / sheet state, focus handling; keeps the ADR-023 guard |
| `components/layout/MenuParts.tsx`, `NavIcon.tsx` (new) | Server-rendered menu item, feature card, desktop panel, sheet panel; inline icon set |
| `components/layout/Footer.tsx` | New CTA band + light footer; `MarketingOnly` and `cv-auto` kept. **2026-10-29:** dark footer restored + bottom wordmark (see Footer) |
| `lib/site.ts` | `MAIN_NAV` replaced by `NAV_GROUPS` (+ types); `FOOTER_NAV` rebuilt from the same items; `PLATFORM_ENABLED`, `PLATFORM_LOGIN_HREF` exported; `SOCIAL_LINKS` gains an `icon` field. `APP_URL`, `PRIMARY_CTA`, `SHOW_CONTENT_TODOS` unchanged |
| `platform/e2e/tests/platform/web/marketing-nav.spec.ts` (new) | Header / sheet / footer e2e, both flag states |
| `platform/e2e/tests/platform/web/flag-off.config.ts` | `testMatch` also runs `marketing-nav.spec.ts` (one line), so the flag-OFF assertions run against the flag-OFF build |

**Not changed:** `app/layout.tsx`, `app/globals.css` (every style is a Tailwind utility or an existing class: `page`, `grid-12`, `t-eyebrow`, `t-headline`, `t-accent`, `tone-*`, `tri-stripe`, `hover-line`, `press`, `on-dark`, `rise`, `cv-auto`), page bodies, `proxy.ts`, next/build config, dependencies, platform code, the committed baseline.

### Flag behaviour

* **Flag OFF (production default, GEN-4):** groups Programs / Future Builders / About; "Sign in" → teacher app; no "Log in"; no Learn column; no "Start learning free"; the HTML contains no `href="/learn"` (asserted by `flag-off.spec.ts` and `marketing-nav.spec.ts` under `flag-off.config.ts`).
* **Flag ON:** adds the Learn group and footer column, "Log in" → `/me`, the Learn card in the mobile sheet and "Start learning free" in the CTA band. On platform paths (`/learn`, `/tests`, `/ask`, … and `/dev/ui`) `SiteHeader` returns null and `MarketingOnly` hides the footer, exactly as in ADR-023 (asserted on `/learn` by `marketing-nav.spec.ts` and `revamp.spec.ts`).

### Baseline

The header and footer appear on every marketing page, so `npm run marketing:regression` reports a visual diff on **every** baseline screenshot. That is the intended change, not a regression; the diffs are confined to the header band and the region from the end of `<main>` down (page bodies are pixel-identical; see the handoff for the measured proof), routes all return 200, and Lighthouse is reported against the baseline. Under golden rule 1 and AGENTS.md §4.6 a change to the marketing site's appearance needs the owner: the **owner reviews the before/after screenshots** in `docs/platform/design/marketing-nav-footer/` and, if approved, runs (or authorises) `npm run marketing:baseline -w @soyl/e2e`. Agents must not re-capture it.

## Consequences

* Every marketing page is reachable from the top bar in at most two interactions, with a one-line description; the footer mirrors the same structure.
* Client JS: only the island's state and handlers; the nav config, icons, panels and article data stay on the server (sizes measured in the handoff). Keep it that way: the island ships on platform routes too.
* `MAIN_NAV` no longer exists; anything that needs the site structure reads `NAV_GROUPS` / `FOOTER_NAV`.
* Adding Team, Careers or another verified social profile is a one-line config change **after** the owner supplies real content; nothing may link a page that does not exist.
* Future changes to the marketing header must keep `platformChromeActive` in `SiteHeader` and `MarketingOnly` around the footer (ADR-023).
