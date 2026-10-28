# marketing web designer/engineer — header mega menus and footer redesign — 2026-10-28

Status: **done, awaiting owner review of the new look** (branch `platform/marketing/nav-footer`, not merged, not deployed; the marketing visual baseline is intentionally **not** re-captured).
Decision record: [ADR-025](../adr/025-marketing-nav-and-footer.md).

Owner request (2026-10-28): "Do you think the nav bar and the footer can be improved. For the footer try the design of Sarvam AI, and for nav bar I feel like when I hover over About it should show more options like team, this and that … Everything needs to have a good visual hierarchy."

## What changed

* **Header** (`components/layout/Header.tsx` server component → `SiteHeader.tsx` client island; `MenuParts.tsx`, `NavIcon.tsx` server-only):
  * Top bar: logo · **Programs** · **Future Builders** · **Learn** (flag on only) · **About** · right: "Log in" (flag on, `/me`) or "Sign in" (flag off, the teacher app as before) · **Book a demo**.
  * Each menu opens a full-width panel under the sticky bar (hover with a 90 ms intent delay, or click / Enter / Space), with a small uppercase heading, items as icon tile + title + one-line description in two columns, and a featured card on the right. The page behind is dimmed and slightly blurred.
    * Programs: For schools, For teachers, For parents, For students, The SOYL Method. Card: "See SOYL in your school" (Book a demo). With the flag on, it also has "Already a SOYL school? Sign in to the teacher app", because the bar's sign-in now goes to the platform.
    * Future Builders: Future Builders, What we teach. Card: "Build a working prototype".
    * Learn: Free lessons, Tests, Ask AI. Card: "Free for every CBSE & ICSE student" (Start learning free).
    * About: About SOYL, The SOYL Method, Journal, Contact, Book a demo. Card: **the latest Journal post**, read from `content/journal.ts` at build time (currently "Learning to defend an idea", 20 January 2024).
  * Below 1024 px: the menu button opens a full-height sheet. The Learn card is at the top (flag on), the groups are accordions with the same items and descriptions, and Log in / Sign in + Book a demo are pinned at the bottom. Scroll lock, focus trap and Escape all work.
  * Everything visual is rendered on the server and handed to the island as React nodes. The island holds only the state and the focus / pointer / keyboard logic, because the root layout loads it on every route, platform routes included (see "JS" below).
* **Footer** (`components/layout/Footer.tsx`, still wrapped in `MarketingOnly`, still `cv-auto`):
  * A rounded cobalt **CTA band**: "Bring future-ready learning to your *school.*", the existing Grades 1–10 line, Book a demo, and Start learning free (flag on only).
  * A **light footer** with a brand block: logo, tagline "Thinking is the work.", "Find us at" + Instagram icon link, outreach@soyl.cloud, "© 2026 SOYL AI Private Limited. Bengaluru, Karnataka 560043", "Photography is illustrative.".
  * Link columns **Programs / Future Builders / Learn (flag on) / Company / Legal**, with small uppercase muted headings. Cookie preferences stays in Legal.
  * A tri-stripe closes the page.
* **Config** `lib/site.ts`:
  * `MAIN_NAV` is replaced by `NAV_GROUPS` (items with description + icon, feature cards).
  * `FOOTER_NAV` is rebuilt from the same items.
  * `PLATFORM_ENABLED` and `PLATFORM_LOGIN_HREF` are new; `SOCIAL_LINKS` gains `icon`.
  * `COMPANY_ITEMS` documents the one line to add for Team / Careers.
* **Tests:**
  * `platform/e2e/tests/platform/web/marketing-nav.spec.ts` (new; 12 tests). It adapts to the flag: it runs in the flag-ON suite and, through a one-line `testMatch` change in `flag-off.config.ts`, in the flag-OFF suite.
* **Docs:**
  * ADR-025, plus its row in the ADR index (024 is marked reserved).
  * Before/after screenshots.
  * This note.
* **Not changed:** `app/layout.tsx`, `app/globals.css`, page bodies, `proxy.ts`, Next/build config, dependencies (no icon library: inline SVG), platform code, the committed marketing baseline.

## How to verify (results from this branch, Windows 11, 8 GB machine, heavy jobs serialised with `_tools/heavy.sh`)

| Gate | Command | Result |
|---|---|---|
| Lint | `npm run lint` (root) | exit 0, no findings |
| Build | `npm run build` (root) | exit 0; 46 static pages; TypeScript OK |
| Web unit tests | `npm run test:platform-web -- --maxWorkers=2` (root) | **16 files, 283 tests passed** |
| Platform web e2e | `PW_WEB_PORT=3360 PW_FLAG_OFF_PORT=3361 npm run test:platform-web -w @soyl/e2e` (platform/) | **flag ON 87 / 87 passed** (incl. 12 marketing-nav); **flag OFF 48 passed, 1 skipped** (the flag-ON-only `/learn` shell check); `[platform-web] PASSED` |
| Platform route JS budget (inside the e2e) | `bundle.mjs` | all platform pages ≤ 200 KB gz; heaviest: test result 191.1, test player 190.8, lesson 189.6 |
| Marketing regression | `npm run marketing:regression -w @soyl/e2e` | **expected FAIL on visuals only**: 43 screenshot diffs (all 42 full-page shots + desktop first visit; the mobile first-visit shot is pixel-identical). All 4 route-status checks pass (every page, metadata route, feed, API route and sitemap URL returns its expected status). Lighthouse within budget (below). `marketing:baseline` was **not** run |
| Secrets | `gitleaks git --log-opts="origin/platform/main..HEAD" .` | no leaks found |

Two earlier e2e runs failed for environmental reasons, not because of this change:
* **Run 1:** port 8098 (mock OIDC) belonged to another agent's e2e. The local API stopped answering mid-run, so every later API-backed test got 502s.
* **Run 2:** to isolate the run I moved the API / OIDC / control ports. `auth.spec.ts` hardcodes `127.0.0.1:8098` as an allowed origin, so 2 Google tests failed.

Run 2 also exposed a **real** problem: the first version of the header pushed the lesson page to **201.9 KB gz**, over the 200 KB platform budget. I fixed it by rendering the menus on the server (commit `perf(marketing)`). The final run used the default ports once they were free; everything passed.

### Marketing regression: where the diffs are

`.scratch` proof (not committed): the same capture procedure as the regression (`marketing/stabilise.ts`, same viewports), compared row by row with the committed baseline PNGs.

| Region | Desktop 1280 | Mobile 360 |
|---|---|---|
| Header band (`y < main.top`: 73 / 65 px) | 16–22 changed rows per page (the nav labels and right-hand links); bar height unchanged | **0 changed rows** (logo + menu button are identical with the flag off) |
| Page body (`main.top` → `main.bottom`, same y in both images) | **0 changed rows on all 21 pages** | **0 changed rows on all 21 pages** |
| Footer (after `main`) | 518 → 1,102 px tall | 1,098 → 1,527 px tall |

So page content is pixel-identical and the diffs are confined to the header band and the footer. The footer is taller because of the CTA band.

### Lighthouse (regression medians vs the committed baseline)

| Page | Mobile perf | Desktop perf | A11y / BP / SEO |
|---|---|---|---|
| / | 91 → 96 | 100 → 100 | 100 / 100 / 100 |
| /schools | 93 → 95 | 100 → 100 | 100 / 100 / 100 |
| /students | 93 → 94 | 100 → 100 | 100 / 100 / 100 |
| /parents | 94 → 93 | 100 → 100 | 100 / 100 / 100 |
| /future-builders | 93 → 92 | 100 → 100 | 100 / 100 / 100 |
| /journal | 94 → 92 | 100 → 100 | 100 / 100 / 100 |
| /about | 94 → 94 | 100 → 100 | 100 / 100 / 100 |
| /contact | 95 → 97 | 100 → 100 | 100 / 100 / 100 |

Largest drop: −2 (mobile /journal), within run-to-run noise. The budget is ≤ 5. CLS is 0 on every page.

### JS

The regression's build-size report (flag off, vs the baseline build) shows first-load JS **−7.2 KB gz** on most marketing pages. The new island no longer pulls tailwind-merge and the nav config into the shared client chunk. Pages that use `cn` in their own client components show +1.2 to +1.5 KB.

### Screenshots for the owner

`docs/platform/design/marketing-nav-footer/`. Both sets were taken with the platform flag **ON**, which is what www.soylai.com shows today.
* `before/` was captured from the live site.
* `after/` was captured from a local flag-ON production build of this branch.

| Set | desktop/ (1440 wide, full page) | mobile/ (360 wide, full page, 2× pixels) |
|---|---|---|
| Pages (`.jpg`, quality 85, to keep the repo light) | `home`, `about`, `schools`, `future-builders` | `home`, `about`, `schools`, `future-builders` |
| Menus (`.png`, `after/` only) | `menu-programs`, `menu-future-builders`, `menu-learn`, `menu-about` | `menu-sheet`, `menu-sheet-expanded` (Programs open) |
| Old menu | — | `before/mobile/menu-sheet` |

## Tests added

`marketing-nav.spec.ts`, 12 tests:

**Desktop**
1. Groups per flag; disclosure buttons with no ARIA menu roles; Log in vs Sign in; no `/learn` href with the flag off.
2. Hover open, dimmed backdrop, item structure + featured card, staying open inside the panel, closing when the pointer leaves.
3. Enter / Space / ArrowDown open with focus on the first link; ArrowDown moves between links; Escape closes and returns focus; ArrowLeft / ArrowRight move between buttons; Enter toggles.
4. Tab goes button → panel links, and tabbing out closes the panel.
5. Click toggles; an outside click closes; following a link navigates and closes; the current item gets `aria-current`.
6. The About card is the latest Journal post, and every menu link returns 200.
7. axe with the Programs panel open and with the About panel open.

**Mobile 360**

8. The sheet opens; scroll lock; focus moves in; no horizontal overflow; accordion items + descriptions; CTA pinned at the bottom; Log in vs Sign in; Tab and Shift+Tab are trapped; Escape closes, returns focus and restores scroll.
9. Following a link from the sheet closes it.
10. axe with the sheet open, and with a group expanded.

**Footer**

11. Column headings per flag, Cookie preferences, Instagram name/URL, email, legal line, Start learning free only with the flag on, and every internal footer link returns 200.

**Platform shell**

12. With the flag ON, `/learn` has no marketing header, sheet or footer. This test is skipped under the flag-off config, where `/learn` is a 404 covered by `flag-off.spec.ts`.

## Known gaps / follow-ups

* **The baseline must be re-captured after the owner approves the look.** Until then `marketing:regression` / `marketing:diff` stay red on visuals by design. `marketing:baseline` is owner-approved only.
* Pages that end with their own "Book a demo" band (for example the home page's `FinalCta`) now show two consecutive calls to action: the page's band, then the footer's CTA band. The owner may want the footer band hidden on pages that already end with a CTA. That would be a per-page decision and a page-body change, so it is not done here.
* The Learn card says "Free for every CBSE & ICSE student" (wording from the Lead's brief). Check it matches what is live for ICSE when this ships.
* "Log in" goes to `/me`, which shows the platform's log-in prompt to guests. A direct "open the log-in sheet" URL does not exist yet.
* `.scratch/` (local only, not committed) holds the region-proof spec used above.

## Decisions made

ADR-025: disclosure pattern rather than ARIA menus; no menu library; a server-rendered menu with a minimal client island; flag-gated Learn / Log in; the teacher-app sign-in moves into the Programs panel when the flag is on; no `globals.css` change.

## Needs from owner

1. **Approve the new look** (screenshots above), then re-capture the marketing baseline (or authorise it).
2. **Team page content:** real names, roles, photos and bios. Nothing was invented; the "Team" menu item is one config line in `lib/site.ts` (`COMPANY_ITEMS`) once a `/team` page exists.
3. **Careers:** whether to have a page, and its content (same one-line hook).
4. **Other social profiles:** only Instagram exists in `lib/site.ts`. Send verified LinkedIn / X / YouTube URLs if you want them in "Find us at" (and in the Organization schema via `NEXT_PUBLIC_*_URL`).
5. Optional: whether the footer CTA band should also show on pages that already end with a "Book a demo" band.
