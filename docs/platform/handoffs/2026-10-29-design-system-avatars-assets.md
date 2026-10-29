# design-system + web-platform — avatars, original artwork, celebrations and the D-044 credits UI — 2026-10-29

Status: done (all gates green on 3eeec9a; see "Gates")
Branch: `platform/design-system/avatars-assets` (from local `platform/main` 919ffbb, plus the Lead's type fix `3d0db68` cherry-picked as `d998580`). `origin/platform/main` (e357ad6: invoices, integration fixes) was merged in as `579453e`, so the merge-base builds and the Lead's merge is clean. Gates ran on `3eeec9a`; later commits are docs and screenshots only.
Owner ask (2026-10-28): "add in more assets like avatars and so many other things that will make the experience itself more complete … make everything more perfect", "good visual hierarchy", light and dark.
Decisions: D-037/D-038 (no purchases, coins never buy art), D-039 (public names only), D-043 (dashboard), D-044 (credits), D-045 (interest counters), ADR-023 (shell, theme), ADR-010 (private data in the browser).

## What changed

### Original artwork (`components/platform/ui/art/`)

Every drawing is hand-written SVG data in one flat, friendly, geometric style. No icon set, emoji, illustration, textbook image or font was copied or traced. Nothing loads from a third party, and no real people appear.

- **`svg-tree.ts`** is a tiny drawing format (`[tag, attrs, children]`) with builders (`circle`, `ellipse`, `path`, `line`, `pair`/`mirror` for symmetric features). It renders as React (`SvgTree.tsx`, no `dangerouslySetInnerHTML`) or as a standalone SVG string (`svgString`, for the image route).
- **64 animal avatars** (`avatar-art.ts`), one per id in `platform/shared/config/avatars.ts`, which is exactly `PUBLIC_NAME_ANIMALS`.
  - Drawn as front-facing head and shoulders. Dolphin, whale and narwhal are in profile.
  - Built from shared primitives: shoulders, eyes, noses, round, pointed and side ears, cheek muzzles, beaks, spots and rosettes.
  - Built from family composers: a big-cat face (tiger, lion, leopard, cheetah, jaguar, panther, lynx), a long-faced grazer (zebra, deer, giraffe, camel, llama, gazelle, ibex, moose, bison, yak, tapir), a small-bird head and a sea profile.
  - Recognisable at 24 px and detailed at 96–128 px (see the sheet).
- **Avatar backgrounds**: `--p-avatar-{sky,mint,sunflower,coral,lavender,meadow,peach,ocean}` in `tokens.css`, defined in all three theme blocks.
  - Light mode uses pastels. Dark mode uses calmer mid-tones, so the circles do not glare on the near-black canvas.
  - `--p-avatar-ink` is AA (≥ 4.5:1) on all 8 backgrounds in both themes.
  - The art's dark features (`INK #23252e`) are ≥ 3:1 on every background in both themes (kit test).
  - The art itself has fixed colours, because an image cannot read the page's CSS.
- **Static avatar images** come from `app/(platform)/me/avatars/[file]/route.ts` at `/me/avatars/<id>.v1.svg`.
  - They are prerendered at build time (`force-static`, `generateStaticParams`, `dynamicParams = false`), so an unknown id is a 404.
  - They are cached `public, max-age=31536000, immutable`; the version lives in the file name (`AVATAR_IMAGE_VERSION`, `avatar-src.ts`).
  - With the flag off, nothing is generated and every request is a 404 (flag-off spec).
- **`kit/AnimalAvatar`** is the avatar everywhere outside the picker: the background token in a circle plus that one static image.
  - It accepts any size and an optional ring (`bronze|silver|gold|sapphire|diamond|elite|accent`).
  - Its name is "Giraffe avatar" (or a custom label). It is decorative where a name is printed beside it.
  - A student with no avatar (no consent: `avatar: null` on boards) gets a neutral silhouette.
  - **The top bar, boards, cards and headers load no drawing code.** The full set (inline) ships only in the picker's lazy chunk and on the dev art sheet.
- **Badge medals** (`badge-art.ts`, `Art.tsx` `BadgeMedal`) cover the 12 badges in `gamification.ts`.
  - The colour shows the family: lessons blue, practice green, streaks orange, mastery violet, tests teal, perfect gold.
  - The shape grows with the effort: round, then hexagon, then star.
  - Locked medals are a token-grey medal with a lock, so they sit calmly in both themes.
- **League crests** (`crest-art.ts`, `LeagueCrest`) cover Bronze, Silver, Gold, Sapphire, Diamond and the player card's Elite. They get more ornate as the tier rises: star, chevron, wings, gem, crown. New tokens `--p-tier-sapphire` and `--p-tier-diamond` have graphics contrast ≥ 3:1.
- **Subject glyphs** (`subject-art.ts`, `SubjectGlyph`) come in 15 kinds: maths, science, physics, chemistry, biology, history, geography, civics, economics, social, English, Hindi, Sanskrit, computer and generic.
  - They are drawn in `currentColor`, so they follow the existing tile hue tokens and the theme.
  - `subjectStyle()` now also returns `art`. "Social Science", "Political Science" and "Computer Science" now match before plain "science"; they used to get the science tile.
- **Empty-state illustrations** (`empty-art.ts`, `EmptyIllustration`) come in 6 kinds: no tests, no activity, no AI chats, no badges, not found (404) and offline/error. They use theme tokens only and are always decorative. The kit `EmptyState` gained an `art` prop that replaces the icon circle.

### Avatars wired end to end

- **Picker** (`me/AvatarCard.tsx` → lazy `me/AvatarPicker.tsx`, model `me/avatar-picker-model.ts`): `/me` → Settings → "Your avatar", next to Appearance.
  - It opens by itself on `/me#avatar`; the dashboard header avatar links there.
  - It reads `GET /v1/me/avatars`.
  - Groups: Starters (with the student's public-name animal first), then Level, Badge, Streak, League and Live mock rewards, each with "n of m" unlocked.
  - Every animal shows its unlock rule with progress, for example "Reach level 8 — you're level 5", "Earn the Week warrior badge — not earned yet", "Keep a 14-day learning streak — your longest is 3 days", "Play in the Gold league — your best is Silver" and "Take part in 3 live All-India mocks — 1 so far".
  - Students pick from the 8 backgrounds, with a live preview of the avatar and their public name.
  - **Accessibility:** the animals and backgrounds are two native radio groups, so arrow keys move through all 64 and the screen reader says "Moose, radio button". The rule and progress are the radio's description (`aria-describedby`). Locked animals can be selected to preview them and hear the rule, but **Save stays disabled** and explains why.
  - **Saving:** `PATCH /v1/me { avatar: {id, bg} }`. A `403 avatar_locked` shows our own message and changes nothing. "Use my default avatar" sends `{ avatar: null }`.
  - After a save, the top bar updates at once (`MyAvatarProvider.setAvatar`).
  - A new public name re-reads `/v1/me`, because the API may move a default or name-only avatar to the new animal.
  - It works at 360 px (wrapping grid).
- **Everywhere a student identity appears:**
  - top-bar profile button (`MyAvatarProvider`: `GET /v1/me` once per member per page load);
  - dashboard header (`/v1/me/card` avatar, linked to `/me#avatar`);
  - `/me` header;
  - player card (the avatar replaces the initials crest, with a tier crest beside the tier name);
  - weekly league podium (ringed gold, silver and bronze, with the rank as a small medal) and standings rows;
  - live-mock leaderboards.
  - Boards show other students' avatars only with their pseudonymous names (the API's `avatar`, null with the name).

### D-044 credits UI

- **"What can I do with my credits?"** (`ai/CreditGuide.tsx`, model `ai/credit-guide-model.ts`) is a lazy dialog opened through `CreditsProvider.openGuide()`. It reads `GET /v1/me/credits/guide` and shows:
  - every action with its price from config ("7 credits per answer, at most 50 a paper");
  - availability on the student's plan ("Part of the Pro and Board Exam Pass plans") and "≈ N left today";
  - the two learning bonuses with today's progress bars;
  - each plan's daily credits, with the current plan marked;
  - 1 credit in rupees.
  - **Reachable from:** the header credit chip (now a button), the quote and paywall dialogs ("What can I do with my credits?", which closes the dialog first), `/me` → AI credits, and the dashboard credits tile.
- **14-day history** (`ai/CreditHistory.tsx`, `GET /v1/me/credits/history?days=14`, lazy on `/me#credits`) is a small SVG bar chart: received (daily plus bonus, stacked) beside used, one per IST day.
  - The written summary is its accessible name ("Last 14 days: 750 credits received (10 of them bonus), …").
  - Every bar has a `<title>`, and there is a legend.
  - "Show as a table" opens the same numbers as a real table, newest first.
- **Bonus today**:
  - credit chip: in the screen-reader label ("…, including 10 bonus"), as a tooltip, and as a "+10" pill from 600 px;
  - dashboard "AI credits" tile: balance, "+10 bonus today", and goal and streak bonus progress;
  - `/me` credits line;
  - the ledger labels "Bonus: daily practice goal" and "Bonus: streak milestone" (Lead fix kept).
- **Bonus toast:** `creditBonuses[]` on `POST /v1/practice/answers` and `PATCH /v1/practice/answers/:id` triggers:
  - a toast saying "+10 AI credits for hitting today's practice goal" (streak: "+5 AI credits for your learning streak");
  - the daily-goal (or bonus) celebration;
  - a refresh of the header chip.
- **/plans:** a "How AI credits work" section built from config.
  - The allowance per plan comes from the API's plans (`plans.ts`).
  - The example prices come from `AI_ACTIONS` via `quoteCredits`.
  - The bonuses come from `CREDIT_BONUSES`.
  - A unit test asserts the copy equals config. It also asserts that no allowance or price number followed by "credits" appears in the plans, ask or explain-slide sources.
  - The `/ask` and explain-slide prompts still say "free AI credits every day".

### Celebrations (`components/platform/celebrate/`)

- `celebrate()` dispatches a window event. `CelebrationHost` in the app shell shows one celebration at a time for 2.8 s, and the visuals (`Celebration.tsx`) load on first use.
- There are four kinds:
  - **level up**, a star with the new level, from XP before plus XP awarded crossing `LEVEL_THRESHOLDS`;
  - **badge earned**, with the badge medal;
  - **daily goal met**, a target with a check and "+10 AI credits for today";
  - **bonus credits**.
- They are CSS and SVG only, with no dependency. Confetti uses fixed positions (nothing random).
- They are **decorative**: `aria-hidden`, `pointer-events: none`, never focusable, so focus is never stolen. The words come from the toast that goes with each one.
- Badge toasts now show badge names ("Week warrior") instead of keys, and there is a new "Level N reached!" toast.
- With reduced motion, the card simply appears: no confetti, no bounce.
- Triggers live in `usePracticeAnswer`, through a lazy `celebrate/rewards.ts`, so practice, lesson check slides and the daily challenge all celebrate. Nothing loads until something is earned.

### Interest counters (D-045)

- `trackInterest('dashboard_view')` fires when the dashboard mounts.
- `trackInterest('signup_prompt_click', 'header')` fires on the top-bar "Log in". The helper is imported on click, so it adds nothing to page JS.
- Both send only after analytics consent, as before.
- `future_builders_click` (`menu`) was **not** added, because the platform shell has no Future Builders link. Adding the link is an owner/Lead call (marketing link in the app shell).

### Other

- `/me` → Plan has **"Invoices and receipts"** → `/me/invoices`, next to "See plans" (coordinator request; the page arrives with the invoices merge). It is unit-tested for its `href` only.
- `AiNotice` moved to `ai/AiNotice.tsx` and is re-exported from `AiDialogs`. The test result page loads the quote and paywall dialogs lazily (JS budget, below).
- `/dev/ui/art` is a dev-only art sheet (404 in production builds and with the flag off).
- The UI kit README has an Artwork section.

## JS budget (first-load KB gz, `bundle.mjs`, 360 px)

Before is the dashboard run at f35df39, the last full measurement with the same web code as 919ffbb. It predates the D-044 contract merge, which by itself added the gamification tables to the shared shell chunk. After is this branch at 3eeec9a, `learning.spec` full run. Every page is ≤ 200 KB gz.

| Page | Before | After | Δ |
|---|---|---|---|
| hub | 183.4 | 183.8 | +0.4 |
| lesson | 197.7 | 198.3 | +0.6 |
| lesson part 2 | 197.7 | 198.3 | +0.6 |
| notes | 181.3 | 181.4 | +0.1 |
| flashcards | 182.1 | 182.9 | +0.8 |
| practice | 194.6 | 195.3 | +0.7 |
| notes (Hindi) | 181.3 | 181.4 | +0.1 |
| admin | 180.8 | 181.4 | +0.6 |
| learn | 187.3 | 193.2 | +5.9 |
| tests | 181.6 | 179.7 | -1.9 |
| test series | 182.4 | 180.4 | -2.0 |
| test player | 198.8 | 196.9 | -1.9 |
| test result | 199.1 | 195.4 | -3.7 |
| test builder | 189.2 | 188.4 | -0.8 |
| live mock | 185.4 | 183.7 | -1.7 |
| ask | 187.8 | 188 | +0.2 |
| plans | 180.5 | 182.2 | +1.7 |
| leaderboard | 187.5 | 188 | +0.5 |
| me | 196.1 | 196.5 | +0.4 |
| class (challenge) | 183.6 | 188 | +4.4 |
| coins | 180 | 181.9 | +1.9 |
| store | 185.8 | 188.6 | +2.8 |
| dashboard | 191.8 | 196.2 | +4.4 |
| subject | – | 181.2 | new page in the list |

How the pages stay under budget:
- The shell gained the avatar image, the avatar provider, the celebration host and the chip changes (about 1 KB gz).
- `coins-format.ts` takes the coins config and gamification tables out of every page that only formats coins (the header chip, toasts, the test player, the league): about −4 KB.
- The test result page loads the AI dialogs lazily.
- Heavy pieces are lazy: the picker (with all 64 drawings), the credit guide, the 14-day chart, the /me badge medals, the celebrations and the rewards logic.
- /learn (+5.9) and the class page (+4.4) carry the subject glyphs, which are server-rendered on the course pages. The dashboard (+4.4) carries the credits tile, the medal, the crest and the empty states.


Avatar set: the 64 drawings are 35.4 KB of source (12.6 KB gz). The lazy picker chunk carries them together with the picker UI: 35.5 KB raw, 14.1 KB gz, loaded only when "Change avatar" is pressed. As static images they are 86.2 KB raw for all 64, **451 B gz on average per avatar** (306–714 B). The top bar loads exactly one.

## How to verify

From the repo root:

```
npm run lint
npm run test:platform-web -- --maxWorkers=2
npm run test:platform-ui -- --maxWorkers=2
npm run build
```

From `platform/`:

```
npm run typecheck
PW_WEB_PORT=3390 PW_FLAG_OFF_PORT=3391 npm run test:platform-web -w @soyl/e2e
npm run marketing:diff -w @soyl/e2e -- --base origin/platform/main
npm run test:design-system -w @soyl/e2e   # art sheet screenshots
```

Run every heavy job through `heavy.sh`.

Manual check:
1. Log in and open `/me#avatar`.
2. Pick an animal and a background, then save. The top bar changes.
3. Pick a locked animal. Save is off and the rule is shown.
4. As a consented member, press the credit chip to open the guide.
5. Practise 10 questions in a day. You see the toast and the goal celebration, and the chip goes up by 10.

## Gates

Windows 11, 8 GB, shared machine. Heavy jobs ran through `heavy.sh`, one at a time.

| Gate | Result |
|---|---|
| `npm run lint` (root) | exit 0 |
| `npm run test:platform-web -- --maxWorkers=2` | 21 files, **432 passed** (332 at the base; +93 in `avatars-assets.test.tsx`, the rest from the invoices merge) |
| `npm run test:platform-ui -- --maxWorkers=2` | 6 files, **646 passed** (+40 contrast checks) |
| `npm run build` (root) | exit 0 |
| `npm run typecheck` (platform/) | exit 0 |
| `PW_WEB_PORT=3390 PW_FLAG_OFF_PORT=3391 npm run test:platform-web -w @soyl/e2e` | flag ON **104 passed** (40.2 min), flag OFF **46 passed**, `[platform-web] PASSED`. Both JS budget tests passed. |
| `npm run marketing:diff -w @soyl/e2e -- --base origin/platform/main` | **48 passed**: "HEAD renders the marketing site identically to its merge-base" |
| `npm run test:design-system -w @soyl/e2e -- art-sheet` | **4 passed** (360 and 1280 px, light and dark); screenshots written |
| gitleaks (`919ffbb..HEAD`) | no leaks found |

Earlier runs, for the record:
1. **Base did not build.** The first marketing diff failed because the merge-base 919ffbb does not build (the D-044 contract type errors fixed by `3d0db68`). I merged `origin/platform/main` (e357ad6) into the branch. The only conflicts were in /plans: I kept the credits section and the invoice note.
2. **First budget run failed.** It measured lesson 202.1, test player 200.6 and me 200.0. That led to the `coins-format` split and the lazy result-page dialogs.
3. **Axe found a scroll region.** The credit-guide dialog body scrolled with nothing focusable inside (`scrollable-region-focusable`). I moved "Compare plans" into the panel.
4. **Two e2e runs lost the local API.** One webServer failed to start (0xC0000409). In the other, the API process died silently after test 19 with about 1.5 GB of RAM free, so every later API test failed with "could not reach". The dashboard handoff saw the same thing. A clean rerun passed everything.
5. **I could not stop an orphaned runner.** When I stopped my own superseded gate run, the orphaned runner's flag-off build could not be killed (the permission was refused). It finished on its own before the next run started.

## Tests added / changed

- Unit, `components/platform/__tests__/avatars-assets.test.tsx` (93 tests):
  - all 64 ids render inline and as an SVG string, using only shapes and literal colours, with no `href`, `image`, `text`, `script` or URL;
  - image file names round-trip; `AnimalAvatar` label, decoration, ring and fallback;
  - picker groups, lock and unlock text for **every rule shape**, save state; radio groups and descriptions; a locked avatar cannot be saved; save sends the picked background; `403 avatar_locked` is explained; reset sends `null`;
  - guide rows, bonus lines, panel; history rows, summary, chart label, bar titles, table;
  - bonus toast text; `announceRewards` (badge names, level up, bonus toast, celebration events, credits refresh); celebrations are aria-hidden with nothing focusable;
  - /plans copy equals config, with no hard-coded numbers in the plans, ask and explain sources;
  - a medal for every config badge (locked name), crests for every league tier, glyph mapping (social, computer and political science), empty states use tokens only;
  - the chip's bonus label and tooltip; the invoices link.
- Kit contrast, `components/platform/ui/__tests__/kit.test.tsx` (+40):
  - `--p-avatar-ink` on all 8 backgrounds (AA, light and dark);
  - the art's dark features ≥ 3:1 on every background (light and dark);
  - `--p-tier-sapphire` and `--p-tier-diamond` graphics ≥ 3:1 on surface and background (both themes);
  - the dark media block still equals the forced dark block.
- Changed fixtures, with nothing removed or weakened:
  - `m34-components.test.tsx`: the `CreditsProvider` mock also exports `useOptionalCredits`;
  - `revamp-insights.test.tsx`: `subjectStyle` expectations include the new `art` field.
- e2e, `platform/e2e/tests/platform/web/avatars-assets.spec.ts`:
  - the top bar shows one static, immutable SVG; picking an unlocked avatar and background changes the top bar and the dashboard;
  - a locked avatar keeps Save off and the API answers `403 avatar_locked`; reset;
  - the credit guide opens from the chip (≈ 50 / ≈ 7 left, Pro-only paper, bonus progress);
  - the 14-day history and table on `/me#credits`; the dashboard credits tile;
  - axe and 360 px in light and dark; owner screenshots;
  - the JS budget for the touched pages.
- e2e, `design-system/art-sheet.spec.ts`: the art sheet in light and dark (counts of every drawing, axe, no overflow, no foreign requests) and the screenshots.
- e2e, `flag-off.spec.ts`: `/me/avatars/otter.v1.svg`, `/dev/ui/art`, `/api/platform/v1/me/avatars` and `/api/platform/v1/me/credits/guide` all return 404.
- e2e, `bundle.mjs`: `--only` and the subject page.

## Screenshots

`docs/platform/design/avatars-assets/`:
- the art sheet: `{light,dark}-{avatars,badges,crests,subjects,empty}.png`;
- the picker: `{mobile,desktop}-{light,dark}-picker.png`;
- the dashboard: `desktop-{light,dark}-dashboard.png`;
- the credit guide: `{mobile,desktop}-{light,dark}-credit-guide.png`;
- the credit history: `mobile-{light,dark}-credit-history.png`.

## API gaps (for backend-api; the web works without them)

1. **`avatar` on `SessionUser`** (`GET /v1/session`, sign-in responses). Today the top bar makes one extra `GET /v1/me` per page load for members just to draw the avatar.
2. **Level in practice responses.** `xpAwarded` arrives, but not the new total or level. The level-up celebration infers it from the progress snapshot plus the XP since then, which is correct but one step removed. A `levelReached` (or `xpTotal`) field would be exact.
3. **Streak bonuses from lessons and tests** are not echoed in those responses (already listed by ai-gateway), so there is no toast or celebration there. The chip and dashboard still show them after the next refresh.
4. **Avatar catalogue in one call with `/v1/me`.** This is optional. The separate `GET /v1/me/avatars` is fine for the picker.

## Known gaps / follow-ups

- No Future Builders link exists in the platform shell, so its counter is not wired (owner/Lead decision).
- The art uses fixed colours inside images. A future dark-specific art variant is possible through a second version of the image set; it was not needed by the contrast checks.
- Celebrations come from practice answers (all members) and the bonus awards. Test submissions still show the existing toasts only.

## Decisions made

- **One drawing source, two outputs.** Inline SVG where the whole set is needed (picker, sheet). A prerendered static SVG image everywhere else. This keeps avatars off every page's first-load JS and lets the browser cache each animal once.
- **No ADR.** No shared or marketing file, global CSS, root layout, dependency or API changed. The new route lives under `app/(platform)/me/` and is covered by the existing `/me/:path*` proxy matcher and `PLATFORM_PREFIXES`.
- **Locked avatars are selectable for preview,** not disabled, so keyboard and screen-reader users can reach every rule. Save explains the lock.

Needs from owner: a look at the art sheet and the picker screenshots. Also a decision on whether the platform shell should link to Future Builders.
