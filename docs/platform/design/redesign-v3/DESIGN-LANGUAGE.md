# SOYL Academy platform: design language v3 ("warm notebook, soft cards")

Owner: design-system. Decision record: [ADR-032](../../adr/032-design-language-v3-shell-and-age-stages.md). Kit source: `components/platform/ui/kit/`. Live gallery (dev only): `/dev/ui#v3` (light) and `/dev/ui#v3-dark`.
Screenshots: [`after/`](after/).

**Page agents follow this document literally.** If something you need is not here, use the closest kit component, write it down in your handoff, and ask the Lead before inventing a new pattern. Never copy names, mascots or art from the owner's reference images; we take patterns, not branding.

---

## 1. Principles

1. **One calm "today".** Every page answers one question first ("what should I do now?") with ONE primary action (a cobalt pill). Everything else is secondary and quieter.
2. **Show what means something today.** No empty 140-day heatmaps for a new student, no "3 of 7,537" denominators, no chart without data. If a number is not encouraging or actionable, move it to Progress (`/me/progress`) or drop it.
3. **Soft, warm, calm; not childish.** Students are 12–18 and many prepare for board exams. Warm paper canvas, white cards with soft elevation, pastel tints, large radii, friendly copy. No cartoon mascots (the 64 animal avatars are our warmth), no confetti outside `CelebrationHost`, no exclamation marks in errors.
4. **Cobalt is the only action colour.** Red-pen and highlighter yellow are brand accents (decoration, "new", live, errors). Tints are for subjects, study modes and friendly cards, never for buttons.
5. **Colour is never the only cue.** Every tint, pill, dot, ring and medal also writes its meaning ("Science", "Done", "Rank 1", "You").
6. **Phones first.** Design at 360 px, then 768, 1024, 1280+. No horizontal scroll, 44 px touch targets, the tab bar never covers content.
7. **Learning and tests are free; only AI costs credits.** Never put a paywall, lock or price near lessons, practice or tests. Credits appear only where AI is used (Ask AI, Explain, Plans, the credits guide).

## 2. Tokens (all CSS custom properties on `.soyl-platform`; light and dark)

Source: `components/platform/ui/styles/tokens.css`. Contrast is unit-tested in both themes (`ui/__tests__/kit.test.tsx`). Use tokens only; no raw hex in page CSS (exception: decorative art already in `art/`).

| Group | Tokens | Intent |
|---|---|---|
| Canvas | `--p-bg` (warm paper `#f6f4ef` / `#121316`), `--p-paper` (brand paper, hero panels) | Page background. Never put body text directly on a tint-less hero without checking it is `--p-ink`. |
| Surfaces | `--p-surface` (cards), `--p-surface-2` (wells, stripes, inputs' quiet fill), `--p-surface-3` (pressed, empty tracks) | Cards are white on paper; in dark, `#1b1c20` on `#121316`. |
| Text | `--p-ink`, `--p-ink-muted` (secondary), `--p-ink-subtle` (meta, captions) | All three are AA on every surface and every tint. |
| Lines | `--p-border` (separators), `--p-card-border` (the hairline under a card shadow), `--p-border-strong` (inputs, chips: 3:1) | Prefer elevation over borders for cards. |
| Action | `--p-accent` (SOYL cobalt), `--p-accent-hover`, `--p-accent-soft`, `--p-on-accent`, `--p-info`, `--p-focus`, `--p-focus-ring` | Primary buttons, links, progress, the current nav item (`--p-accent-soft` + `--p-info` text). |
| Status | `--p-success`, `--p-warning`, `--p-danger` (+ `-soft`), `--p-highlight` / `--p-on-highlight` | Pills and messages. Danger is red-pen. |
| Brand | `--p-brand-blue|red|yellow`, `--p-decor-yellow|blue|red` | Tri-stripe and hero decoration only, never text. |
| **Tints (v3)** | `--p-tint-{blue,violet,pink,red,orange,yellow,green,teal,neutral}` + `--p-tint-X-ink` | Pastel fill + its strong hue (icons, short labels; AA on its fill). Subjects and study modes. |
| Learning | `--p-easy|medium|hard` (+ soft), `--p-m-*` (mastery), `--p-flame`, `--p-heat-0…4`, `--p-tier-*`, `--p-avatar-*` | Unchanged meanings from ADR-023. |
| Type | `--p-text-xs` (13 px floor) … `--p-text-4xl` (36 px), `--p-text-greet` (28→40 px fluid), `--p-leading-display` 1.12, `--p-weight-strong` 650, `--p-weight-display` 750, `--p-tracking-display` | Inter + Noto Sans Devanagari (`lang="hi"` switches automatically). |
| Space | `--p-space-1…16` (4 px grid), `--p-gutter` (16 → 24 px at 768 → 32 px at 1280; set by the shell) | |
| Radius | `--p-radius-sm` 6, `-md` 10, `-lg` 16, `-xl` 20, `-2xl` 24, `-pill` | Cards use `--p-stage-card-radius` (20 by default). |
| Elevation | `--p-shadow-1` (chips), `--p-shadow-card` (resting card), `--p-shadow-2` (hover, popover), `--p-shadow-3` (dialogs) | Dark mode uses a hairline + a faint shadow. |
| Layout | `--p-topbar-h` 60, `--p-tabbar-h` 60, `--p-sidebar-w` 248, `--p-sidebar-rail-w` 80, `--p-content-max` 1200, `--p-right-rail-w` 320 | |
| **Stage** | `--p-stage-card-radius`, `--p-stage-card-pad`, `--p-stage-gap`, `--p-stage-tile-min`, `--p-stage-greet`, `--p-stage-avatar` | Retuned by `data-stage` (section 6). Use them for card radius/padding/gaps so stages work for free. |

Subject tints: `subjectTint(hueOrKind)` from `kit/tints.ts`. It accepts the course pages' hue (`subjectStyle(...).hue` in `components/platform/learn/subject-style.ts`) or a subject-art kind. Maths blue, Science/Biology green, Physics/Computer violet, Chemistry/Geography teal, History/Social orange, Civics/Economics/Sanskrit yellow, English pink, Hindi red, other neutral. Use the same tint for a subject on every page.

Study modes: `STUDY_MODES` in `kit/tints.ts`: Lesson blue (play), Notes yellow (book), Flashcards violet (layers), Practice green (target), Tests pink (clock).

## 3. Layout grid and breakpoints

| Width | Shell | Page |
|---|---|---|
| 360–767 | Top bar (mark, chips, theme, avatar / Log in); "Back to soylai.com" row above it; bottom tab bar (5 tabs) | One column, 16 px gutter. Rail content stacks after the main column (or first: `railFirstOnPhones`). |
| 768–1023 | Same as phones; 24 px gutter | One column; card grids get 2–3 columns. |
| 1024–1279 | Icon-rail sidebar (80 px; names as tooltips and accessible names), top bar shows the class chip | One column unless the page container is ≥ 1000 px (it is not at this width). |
| 1280+ | Full sidebar (248 px) with labels, credits, soylai.com link and the student card; top bar shows class chip + today's date (from 1180 px of top bar) | Main column + 320 px right rail when the page container is ≥ 1000 px (true from about 1300 px). 32 px gutter. Content max 1200 px. |

The page container is `shell.page` from `components/platform/shell/shell.module.css` (max-width `--p-content-max`, padding `--p-gutter`). It lines up with the top bar; an e2e test checks this on every page. **Every page's first element inside `#platform-content` is this container.**

## 4. The app shell (what pages get for free)

`components/platform/shell/AppShell.tsx` (client), mounted by `app/(platform)/layout.tsx`. Pages never render navigation themselves.

- **Sidebar (≥ 1024 px):** SOYL mark → `/learn`; nav: members Home (`/me/dashboard`), Learn, Tests, Ask AI, Leaderboard, Progress (`/me/progress`); guests Learn, Tests, Ask AI, Leaderboard. Bottom: members see "N AI credits today" (opens the credits guide, `data-testid="sidebar-credits"`), guests a "Keep your progress / Log in" card; then "‹ soylai.com" (`main-site-link`, owner requirement ADR-023) and, for members, the student card (avatar, name, "Level 3 · Class 10", level bar → `/me`, `sidebar-profile`).
- **Top bar (slim, 60 px):** below 1024 px the SOYL mark; from 1024 px the page context (`class-chip` "CBSE · Class 10" → that class, and today's date). Right side: streak chip, SOYL Coins chip, the AI credits chip **only on `/ask` and `/plans`** (`credit-chip`, opens the guide), theme picker, avatar (`profile-link`) or Log in (`login-button`). Nothing else goes in the top bar.
- **Tab bar (< 1024 px):** members Home, Learn, Tests, Ask AI, Me; guests Learn, Tests, Ask AI, Ranks, Me. Home stays lit on `/leaderboard` and `/me/progress`; Me on `/me`, `/coins`, `/store`.
- **Immersive routes** (lesson, flashcards, test attempt, live mock; `isFocusRoute`): no sidebar, no tab bar; top bar = mark + soylai.com (≥ 768 px) + chips. The page owns the bottom of the screen.
- Also: skip link, `CelebrationHost`, the app footer (soylai.com, Plans, Privacy, Terms, Cookie preferences), Light/Dark/System with no flash, dark cookie bar.
- **Stage:** `data-stage` on the shell root and `useStage()` (section 6).

## 5. Page template

```tsx
// Server component page. Reuse the shell container; put the greeting/title first.
import shell from '@/components/platform/shell/shell.module.css';
import { GreetingHeader } from '@/components/platform/ui/kit/Greeting';
import { PageColumns, PageSection, CardGrid } from '@/components/platform/ui/kit/Page';
import { RailCard } from '@/components/platform/ui/kit/Rail';

<div className={shell.page}>
  <GreetingHeader title="Your tests" subtitle="Free chapter tests and full board papers." />   {/* or PageHeader for hubs with breadcrumbs */}
  <PageColumns rail={<><RailCard id="up" title="Upcoming live mocks">…</RailCard></>}>
    <PageSection id="series" title="Test series" count={6} action={{ href: '/tests', label: 'See all' }}>
      <CardGrid label="Test series">…</CardGrid>
    </PageSection>
  </PageColumns>
</div>
```

Order on every page: (1) header area (breadcrumbs for course pages via `PageHeader`; greeting for "today" pages), (2) the ONE primary action, (3) main sections in order of importance, (4) right rail (goal, league, upcoming, reward), (5) footer comes from the shell. Vertical rhythm: 24 px between sections on phones, 32 px from 1024 px (`PageColumns` does this). Section titles are `h2` (`PageSection`), card titles `h3`.

Headings: exactly one `h1` per page (GreetingHeader or PageHeader). Landmarks: the shell provides `nav` and `header`; `PageColumns` makes the rail an `aside` (label it).

## 6. Age stages (`data-stage`)

One system, a quiet knob. The shell sets it:

| Stage | Classes | Feel | Tokens |
|---|---|---|---|
| `junior` | 7–8 | Warmer, roomier, more avatar, playful (never babyish) microcopy | radius 24, padding 24, gap 20, tiles ≥ 168 px, greeting 30→44 px, avatar 72 |
| `middle` (default) | 9–10 | Balanced, board-exam aware | radius 20, padding 20, gap 16, tiles ≥ 156, greeting 28→40, avatar 56 |
| `senior` | 11–12 | Denser, calmer, exam and stream focus | radius 16, padding 16, gap 12, tiles ≥ 140, greeting 26→34, avatar 48 |

Resolution (`components/platform/shell/stage.ts`): a member's own class (GET /v1/session `user.classLevel`) wins; otherwise the class in a course URL (`/learn/{board}/{class}/…`, `/tests/series/{board}/{class}/…`); otherwise `middle`.

How pages use it:
- **CSS (preferred):** kit components already read `--p-stage-*`. In page CSS modules use the tokens, or attribute selectors: `[data-stage='junior'] .hero { … }`.
- **Client components:** `const { stage, pick } = useStage()` from `components/platform/shell/StageProvider`; `pick({ junior: 'Nice one!', middle: 'Good work', senior: 'Done' })`.
- **Server components:** `stageForClass(Number(params.class))` or `byStage(stage, {...})` from `components/platform/shell/stage.ts` (pure, no client code).
- Keep it subtle: never hide features by stage, never change navigation, never change what is free.

### Copy tone per stage

| | junior (7–8) | middle (9–10) | senior (11–12) |
|---|---|---|---|
| Greeting | "Hi Asha, ready to explore?" | "Good evening, Asha" | "Evening, Asha" |
| Primary CTA | "Let's go: Chapter 3" | "Continue Chapter 3" | "Continue: Electrostatics" |
| Praise | "Nice one! 3 in a row." | "Good work: 3 in a row." | "3 correct in a row." |
| Empty state | "Nothing here yet. Your first test will show up here." | "No tests yet. Your scores appear here." | "No attempts yet." |
| Exam framing | Rare; "school test" | "Board exam" when relevant | Board/entrance countdowns, marks, time per question |

Always: plain English, short sentences, second person, Indian English spellings (practise as verb, practice as noun), dates like "Sat 15 Nov", times in IST, numbers with `toLocaleString('en-IN')`. Hindi strings carry `lang="hi"`.

## 7. Light and dark rules

- Never hard-code colours; every token has a dark value. Check every new page in both themes at 360 and 1280.
- Tints in dark are deep, low-saturation fills with light inks; text stays `--p-ink`.
- Do not use `--p-shadow-*` as the only separation in dark mode; cards keep `--p-card-border`.
- Decorative brand shapes use `--p-decor-*` (they fade in dark).
- Avatars keep their light backgrounds in both themes (by design).

## 8. Kit reference (import paths under `@/components/platform/ui/kit/`)

Server-safe unless marked client. Every snippet below is real API.

### Buttons
```tsx
import { Button, IconButton } from '…/kit/Button';       // variants: primary | secondary | soft (v3) | ghost | danger; sizes sm | md | lg; block; loading; icon
import { ButtonLink } from '…/kit/ButtonLink';            // a Link styled as a Button: href, variant, size, block, icon, iconEnd
<ButtonLink href={next} icon="play" size="lg">Continue Chapter 3</ButtonLink>
<Button variant="soft" icon="sparkles">Explain this</Button>
```
Pill shaped. One `primary` per view. `soft` for secondary actions on cards and tints.

### Cards and surfaces
```tsx
import { Card, CardTitle, CardMeta, cardLinkClass, EmptyState, Skeleton, SkeletonCard, Badge, Chip, ProgressBar, Avatar } from '…/kit/Display';
<Card tint="green">…</Card>                              // tint: any Tint (pastel, no shadow)
<Link href="…" className={cardLinkClass()}>…</Link>      // whole-card link with hover lift + focus ring
<EmptyState title="No tests yet" icon="clock" tint="pink" compact action={<ButtonLink href="/tests" size="sm">Browse tests</ButtonLink>}>Tests are free.</EmptyState>
<div aria-busy="true"><SkeletonCard thumb lines={2} /></div>
```

### Page layout
```tsx
import { PageColumns, PageSection, SectionHeader, CardGrid } from '…/kit/Page';
<PageColumns rail={…} railLabel="Today" railFirstOnPhones={false}>…</PageColumns>
<PageSection id="subjects" title="Your subjects" count={6} description="…" action={{ href: '/learn', label: 'See all' }}>…</PageSection>
<CardGrid label="Your subjects" min={200}>{/* SubjectCard / ModeTile render <li> */}</CardGrid>
```

### Greeting
```tsx
import { GreetingHeader, DateChip, greetingFor, istHour } from '…/kit/Greeting';
<GreetingHeader variant="hero" eyebrow="CBSE · Class 10" title={`${greetingFor()}, ${firstName}`} subtitle="One short lesson keeps your streak going."
  actions={<ButtonLink href={next} icon="play" size="lg">Continue Chapter 3</ButtonLink>}
  art={<AnimalAvatar avatar={me.avatar} size={112} decorative />} />
<GreetingHeader title="Leaderboard" subtitle="…" aside={<DateChip />} />   // plain: other pages
```
`as="h2"` only when another `h1` exists. `greetingFor()` uses India time. In client components compute the greeting after mount (static pages must not bake the hour).

### Tiles and subject cards
```tsx
import { SubjectCard, ModeTile, ContinueCard, IconTile } from '…/kit/Tiles';
import { subjectTint, STUDY_MODES } from '…/kit/tints';
import { SubjectGlyph } from '@/components/platform/ui/art/SubjectGlyph';
const st = subjectStyle(subject.id, subject.name, subject.language);   // components/platform/learn/subject-style.ts
<SubjectCard href={url} title={subject.name} meta="14 chapters" tint={subjectTint(st.hue)} art={<SubjectGlyph kind={st.art} size={32} />}
  progress={{ value: 42, label: '42% done' }} badge={<StatusPill tone="success">Almost done</StatusPill>} variant="tinted" />   // variant="plain" for long lists
<ModeTile mode="practice" href={`${ch}/practice`} meta="77 questions" />
<ModeTile mode="flashcards" meta="Coming soon" disabled />
<ContinueCard href={resume} title="Chemical Reactions and Equations" meta="Science · Chapter 1 · Part 2 of 3" tint="green"
  art={<SubjectGlyph kind="science" size={56} />} progress={{ value: 60, label: '60%' }} cta="Continue" />
<IconTile icon="gift" tint="yellow" size="lg" inverse />
```
`SubjectCard` and `ModeTile` render an `<li>` (put them in `CardGrid`); pass `listItem={false}` to render the bare link.

### Stats, goal, week
```tsx
import { StatCard, StatGrid } from '…/kit/Stat';
import { GoalRing, WeekStrip, weekDays, istToday } from '…/kit/Goal';
<StatGrid label="This week"><StatCard label="Solved this week" value={24} icon="checkCircle" tint="green" trend={{ direction: 'up', text: '6 more than last week' }} href="/me/progress" /></StatGrid>
<GoalRing value={15} target={20} unit="questions" label="Today's goal: 15 of 20 questions" title="5 more to go" caption="New questions count." />
<WeekStrip days={weekDays(activeDaysYmd, istToday())} label="Study days this week" />
```
`weekDays` takes IST `YYYY-MM-DD` strings (the activity API's days).

### Rail, league, schedule, lists, tables
```tsx
import { RailCard, LeaderboardMini } from '…/kit/Rail';
import { List, ListRow, StatusPill, DataTable, dataTableNum, Timeline } from '…/kit/Lists';
<RailCard id="league" title="Weekly league" aside={<StatusPill tone="info">Bronze</StatusPill>} action={{ href: '/leaderboard', label: 'See all' }}>
  <LeaderboardMini label="Top five this week" rows={[{ rank: 1, name, avatar, score: 1240 }, { rank: 2, name, avatar, score: 1105, you: true }]} unit="XP" />
</RailCard>
<Timeline label="Upcoming live mocks" items={[{ id, time: 'Sat', timeSub: '15 Nov', title: 'Science full mock', meta: '10:00 · 3 h', href, status: <StatusPill tone="success">Registered</StatusPill>, tint: 'green' }]} />
<List label="Chapters"><ListRow href={url} leading={<IconTile icon="play" tint="blue" size="sm" />} title="Chapter 2" meta="Part 2 of 3" trailing={<StatusPill tone="info">In progress</StatusPill>} current /></List>
<DataTable caption="Recent tests" hideCaption><thead>…</thead><tbody>… <td className={dataTableNum}>16/20</td></tbody></DataTable>
<StatusPill tone="live">Live now</StatusPill>   // neutral | info | success | warning | danger | live | highlight; dot
```

### Existing pieces (unchanged APIs)
`Mastery.tsx` (MasteryPip, MasteryBar, ProgressRing, DifficultyTag), `AnimalAvatar` (any size, `ring`, `decorative`), `Icon` (now also `chart`, `calendar`, `arrowRight`, `star`, `sparkles`), `Dialog`/`BottomSheet` (client), `Tabs` (client), `Toast` (client), `Field`/`TextInput`/`OTPInput` (client), `CreditChip` (client; softer chip in v3), art: `SubjectGlyph`, `EmptyIllustration`, `BadgeMedal`, `LeagueCrest`.

## 9. Do and don't

| Do | Don't |
|---|---|
| One cobalt primary action per view | Two primary buttons side by side |
| White cards with `--p-shadow-card` on the paper canvas | Grey boxes with 1 px borders everywhere |
| Pastel tints for subjects and modes, same tint everywhere for a subject | Tinted buttons, tinted body text, random colours per page |
| Show 3–5 things on Home; link to Progress for the rest | 12-section analytics scrolls |
| Hide a card when it has nothing useful (new student) | Empty heatmaps, "0 of 7,537" |
| `toLocaleString('en-IN')`, IST dates | Raw ISO dates, US formats |
| Animal avatars for people (league, profile) | Photos, initials-only for students who have an avatar |
| `aria-current` on the current item, labels on every list and region | Colour-only state |
| Keep `data-testid`s the e2e uses (list in the handoff) | Renaming or removing testids without updating the specs |

## 10. Per-page briefs

Each brief: purpose → sections in order (phone order = this order unless noted) → kit → notes. "Rail" = the right rail at ≥ 1280 px; on phones it stacks where noted. Keep existing data sources and testids unless the brief says otherwise.

### Home: `/me/dashboard` (members' "today")
Purpose: one calm screen that starts today's learning.
1. `GreetingHeader variant="hero"`: eyebrow "{BOARD} · Class N" (or the add-class prompt), title `greetingFor(), FirstName`, subtitle one encouraging line (streak or goal), ONE action: `ButtonLink` to the next step (resume lesson/practice; new students: "Pick a subject"), art: the student's `AnimalAvatar` (112 px; 72/56/48 by stage via `--p-stage-avatar` × 2).
2. `ContinueCard` (only if there is something to continue): subject tint + glyph, "Unit 2 · Lesson 3"-style meta, progress.
3. Rail first on phones (`railFirstOnPhones`): **Today's goal** `RailCard` with `GoalRing` (weekly goal or today's practice goal) + `WeekStrip`.
4. **Your subjects**: `PageSection` + `CardGrid` of `SubjectCard` (class subjects with lessons; progress where known; "See all" → `/learn/{board}/{class}`).
5. **Study your way**: `ModeTile`s pointing at the continue chapter (Lesson, Notes, Flashcards, Practice) and Tests (`/tests`).
6. Rail: **Upcoming live mocks** (`Timeline`, hide if none), **Weekly league** (`LeaderboardMini` top 5 + You; consent-gated rules unchanged), **Next reward / Daily challenge** (`RailCard tint="yellow"` with progress; keep the coins daily challenge here), **AI credits** (keep `data-testid="credits-tile"` and its "What can I do with my credits?" button).
7. A quiet link card "See all your progress →" `/me/progress`.
Remove from Home (moved to Progress): KPI row, solved-by-difficulty, mastery bar, test-score chart, focus areas, activity heatmap, recent activity, player card. Keep `data-testid="dashboard"`, `dashboard-profile-line`, `prompt-class*` (dashboard.spec.ts).

### Progress: `/me/progress` (new page, under `/me` so the nonce CSP matcher covers it)
Purpose: the analytics that used to be on Home, honest and readable.
1. `GreetingHeader` plain: "Your progress", subtitle "{BOARD} Class N · this week".
2. `StatGrid` (4): solved this week, accuracy (7 days), lessons done, study days; trends in words; hide a stat that has no data yet (show `EmptyState compact` instead of zeros for brand-new students).
3. `PageSection` "Mastery": `MasteryBar` + per-subject rows (`List`/`ListRow` with `ProgressRing` 40 px).
4. "Test scores": `DataTable` of recent marked tests (score column `dataTableNum`, `StatusPill`), chart only with ≥ 3 scores.
5. "Practice by difficulty": three `StatCard`s (Easy/Medium/Hard solved, no total denominators over 1,000).
6. "Focus areas": `ListRow`s with "Practise now" links.
7. "Activity": the heatmap only after ≥ 7 active days; otherwise `WeekStrip` for this week.
8. Rail: player card (existing component), badges teaser (`BadgeMedal`), weekly goal edit.
Add the route under `app/(platform)/me/progress/page.tsx`; members only (guests → login prompt like `/me`).

### Learn landing: `/learn`
Guests: `GreetingHeader` plain "What are you studying?" + board/class picker (two `Card`s with class pills; keep the free-for-everyone line); "Ready to learn" `CardGrid` of `SubjectCard`s for the default/last class.
Members: do not repeat the board/class picker at full size; show `ContinueCard`, "Your subjects" (`SubjectCard` grid for their class), daily challenge card, then a compact "Browse another class" `Card` with class pills. Stage applies from the URL class for guests.

### Class hub: `/learn/{board}/{class}`
`PageHeader` (breadcrumbs) → `CardGrid` of `SubjectCard` grouped by tier (core, languages, electives: `PageSection` each, `count`). `variant="plain"` when a group has > 8 subjects. Rail (≥ 1280): "Tests for Class N" `RailCard` + daily challenge.

### Subject hub: `/learn/{board}/{class}/{subject}`
`PageHeader` with the subject `IconTile` (xl, tint) → course progress `Card` (ProgressRing + MasteryBar + "Up next" `ButtonLink`) → chapters as `List`s per unit (`ListRow` with mastery pip as `leading`, status pill as `trailing`). Keep the course sidebar at ≥ 1280 if it still fits (container ≥ 1000 px), otherwise drop it below the list; keep `course-sidebar`, `chapters-title` testids/ids.

### Chapter hub: `/learn/…/{chapter}`
`PageHeader` → `ContinueCard` (resume point) → "Study your way" `ModeTile` grid (Lesson, Notes, Flashcards, Practice, Chapter test) with state in `meta` ("Part 2 of 3", "18 of 77 solved") → the path list (existing) restyled as a `List`. Rail: mastery for this chapter, related tests.

### Notes / Practice / Flashcards chrome
Notes: reading width 68ch, `PageHeader` + a sticky in-page TOC on ≥ 1280 (rail), `Card` sections; Devanagari intact. Practice: keep the LeetCode split (list + workspace) and all testids (`problem-list`, `problem-row`, `solved-count`, `practice-position`, `list-toggle`, `next-question`); restyle summary as `StatGrid`-like row and filters as `Chip`s; the workspace is a `Card`. Flashcards and lesson are immersive: only token-driven restyling, no layout change.

### Tests hub `/tests`, series, result, builder
Hub: `GreetingHeader` plain "Tests" + `DateChip` aside → "Upcoming live mocks" `Timeline` → "Your subjects with tests" `CardGrid` of `SubjectCard` (badge "Full series" / "N tests") keeping `subject-list`, `more-subjects`, `data-has-tests` → "Recent attempts" `DataTable`. Series: `PageHeader` → test cards as `List` with duration/marks meta and `StatusPill` (Not started / In progress / Score). Result: score hero `Card` (big number, `ProgressRing`), section breakdown `DataTable`, review list. Builder: form in a `Card`, chapter checklist as `List`.

### Leaderboard `/leaderboard`
`GreetingHeader` plain "Weekly league" + tier crest (`LeagueCrest`) aside → podium (existing) → full table restyled as `List` of rows like `LeaderboardMini` (you highlighted, "You" written) → promotion/relegation zones as `StatusPill`s. Guests: explain + Log in `ButtonLink`.

### Ask AI `/ask`
Keep all `ask-*` testids and the credit quote flow. Header: `GreetingHeader` plain "Ask the AI tutor"; the credits chip is in the top bar on this page; add a small "What can I do with my credits?" `Button variant="ghost"` near the composer. Composer in a `Card`; modes as radio pills; chats as `List`.

### Profile `/me`
`GreetingHeader` plain with the avatar (art) and name → sections as `Card`s: profile & school, avatar picker, appearance (`ThemeOptions` inline), credits (`#credits`), badges, account. Keep every `/me` testid and anchor (`#activity`, `#credits`, `#school`, `#badges`, `#attempts`).

### Coins `/coins` and Store `/store`
Coins: balance hero `Card tint="yellow"` (coin icon, balance, check-in button) → "Ways to earn" `List` → history `DataTable`. Store: `CardGrid` of item cards (keep deterministic rarity frames; redemption "coming soon", D-038).

### Plans `/plans`
Three plan `Card`s (Free, Plus, Pro + Board Exam Pass) with the current plan as a `StatusPill`; the paid ones list AI features only; "Learning and tests are free forever" banner `Card tint="green"`. Keep `price-*`, `buy-*`, `plans-consent`, `current-plan`, `[data-plan]` testids; GST wording per `invoicing.ts` (D-046).

## 11. Testids the shell owns (keep them)

`app-shell` (+ `data-stage`), `sidebar`, `sidebar-credits` (+ `data-balance`), `sidebar-profile`, `class-chip`, `today`, `main-site-link`, `main-site-row-link`, `streak-chip`, `coin-chip`, `credit-chip` (+ `data-balance`; `/ask` and `/plans` only), `theme-toggle`, `theme-options`, `login-button`, `profile-link`; `nav[aria-label="Learning platform"]` (sidebar, tab bar); `#platform-content`.
