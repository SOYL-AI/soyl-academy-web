# School leaderboards — design note (future, not built)

Status: **proposal, design only** (D-043). Nothing in this note is built. The owner asked on 2026-10-28: "there could even be a school based leaderboard later in the future, just put it in the docs for now."
Owner of the build when scheduled: backend-api (leagues), web-platform (pages), security-reviewer (privacy review), Lead (directory sourcing).

## 1. What already exists

| Piece | Where | State |
|---|---|---|
| School directory table `schools` (name, board, city, state, UDISE+ code) | `platform/db/schema/identity.ts` | Present since 0001. Migration 0013 (dashboard/school branch) adds normalised names, `source` and `verified_at`. |
| Student's school `profiles.school_id` | same file | Set from /me → Profile, **only when consent is `granted`** (D-014), never at sign-up (D-039), optional, removable. Account deletion clears it. |
| League scopes `class`, `school`, `city` | `platform/db/schema/gamification.ts` (`LEAGUE_SCOPES`) | Only `class` leagues run today (`cbse-10` etc.). `school` is reserved. |
| Pseudonymous public names ("Sturdy Giraffe 304") | D-039, `platform/shared/config/public-names.ts` | Every leaderboard shows only this name. |
| Weekly XP with anti-grinding rules | `platform/shared/config/gamification.ts` | Reused as the ranking metric. |

So a school board is mostly a new **cohort key** for the league engine plus privacy rules. It does not need a new ranking system.

## 2. Two products

**A. Within-school league.** Students of the same school, board and class compete in the weekly league (same tiers, promotion and relegation as class leagues). The scope key is `school:<schoolId>:<board>-<class>`.

**B. School vs school board.** Schools are ranked against each other each week, within a board and city or state. The metric is the **mean weekly XP per active, opted-in student**, with each student's contribution capped at the weekly XP cap so a few grinders cannot carry a school. Schools are split into size bands (for example 10–49, 50–199, 200+ active students), so a small school is not compared with a 3,000-student one. The board shows the school name and rank, never individual students.

Build A first. B needs verified schools and enough students per school to mean anything.

## 3. Privacy rules (children's data — must hold before either ships)

1. **Consent:** only accounts with consent `granted` can save a school or appear on a school board (D-014, D-039). Parent withdrawal removes the student from the board immediately.
2. **Separate opt-in:** saving a school does **not** enrol the student. A separate toggle, "Show me in my school's league", is off by default and can be switched off at any time.
3. **Pseudonymous only:** public name, tier and XP, as in class leagues. No real names, photos or class sections.
4. **Minimum group size:** a within-school league shows only when at least `SCHOOL_LEAGUE_MIN_MEMBERS` (proposed 10) opted-in students of that school, board and class played that week. Below that, the student plays in the normal class league. A school appears on board B only with at least `SCHOOL_BOARD_MIN_ACTIVE` (proposed 25) active opted-in students. Both values live in config. Small groups make a pseudonym plus a school too easy to re-identify.
5. **No exact counts for small schools:** show "10+ students", not "11 students".
6. **Rate of change:** a student can change school at most once every 30 days (config). This stops leaderboard hopping and school boosting.
7. **Retention:** weekly snapshots keep handles only (as `leaderboard_snapshots` does today). Deleting an account removes its rows.
8. **Legal check first:** OA-14 (counsel on DPDP s.9) must cover "school + pseudonymous rank" before launch, because it identifies a child more than a class-wide board does.

## 4. School directory and verification

- **Sources:**
  - Student-entered (unverified; available from the dashboard/school work).
  - CBSE affiliated-school list (SARAS).
  - CISCE affiliated-school list.
  - UDISE+ school codes.
  Before importing any public list, the Lead confirms that its terms allow reuse and records the source in `platform/catalog/sources.md`. Import is a CLI, not hand-edited rows.
- **Verified schools only on boards.** Student-entered schools are matched to an official row (name, city, board) by an admin merge tool, or by auto-match with a high similarity score plus admin review. Duplicates are merged and students move with them.
- **Student membership** is self-declared in phase 1, with these protections: the 30-day change limit, XP caps, anomaly alerts (for example a school's active count doubling in a week from new accounts), and an admin action to freeze a school's board.
- **Phase 2:** school join codes issued to partner schools, verified by a teacher. This ties into the teacher/school dashboards listed as "later phase" in CONTEXT §13.

## 5. Changes needed when built

- **Config** (`gamification.ts`): `SCHOOL_LEAGUE_MIN_MEMBERS`, `SCHOOL_BOARD_MIN_ACTIVE`, size bands, school-change cooldown, feature flag `SCHOOL_LEAGUES_ENABLED` (default off).
- **DB:**
  - `profiles.school_league_opt_in_at` (nullable timestamp);
  - `profiles.school_changed_at`;
  - `school_week_stats` (week_start, school_id, board, active_count, mean_xp_capped, rank, band), written when the week closes.
- **API:**
  - `PUT /v1/me/school-league` (opt in or out);
  - `GET /v1/leagues/current?scope=school` (re-uses the league read);
  - `GET /v1/schools/board?board=&city=&band=` (product B);
  - admin endpoints to verify, merge and freeze schools.
  All consent-gated and rate-limited, with route-policy tests.
- **Worker:** add the school cohort to the weekly close job, and compute `school_week_stats`.
- **Web:**
  - a "School" tab on /leaderboard (shown only when the student opted in and the group is large enough);
  - an opt-in card on /me and on the dashboard;
  - a school board page.
- **Tests:**
  - the minimum-group fallback;
  - opt-out and withdrawal removing the student within the same week;
  - no handle-to-user leakage;
  - the cooldown;
  - capped-mean ranking;
  - an e2e check that consent-not-granted accounts never see school UI.

## 6. Open questions for the owner

1. Is product B (school vs school) wanted, or only leagues inside a school?
2. Should schools be told or invited (partnerships, join codes), or stay student-driven?
3. Rewards: should top schools get recognition, such as a certificate or a feature on soylai.com? That would need the school's permission.
4. Are the proposed minimums (10 per school league, 25 per listed school) acceptable?
