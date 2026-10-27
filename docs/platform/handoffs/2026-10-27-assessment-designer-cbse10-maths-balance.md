# assessment-designer — CBSE 10 Maths competency balance — 2026-10-27

Status: **done**. Every frozen CBSE 10 Maths board and May paper (Standard 041 and Basic 241) is now within ±3 marks of the board's competency targets in each band, **whichever internal-choice alternatives a student attempts**. Science and Social Science frozen files are byte-identical.
Branch: `platform/assessment-designer/cbse10-maths-balance`, worktree `C:/Users/Prabhu/soyl-wt/assessment-cbse10-maths-balance`, from `origin/platform/main` 9c033fd.

## The problem

The first frozen Maths mocks (handoff `2026-10-27-assessment-designer-cbse10-series.md`) missed the CBSE design mix of recall+understanding / application / analysis+evaluation marks:

| Variant | Target | Frozen mocks before |
|---|---|---|
| Standard (041) | 43 / 19 / 18 (54 / 24 / 22 %) | 30–36 / 23–29 / 20–23 |
| Basic (241) | 60 / 12 / 8 (75 / 15 / 10 %) | 29–42 / 21–35 / 13–19 |

Two causes: the bank tagged almost every written answer as application or higher, and the engine only scored competency softly (and counted a whole case item, and only the first alternative of a choice).

## 1. Honest competency audit (re-tags)

Every short, long, numerical (2-mark) and case item in `content/authored/maths/` was re-read against what it actually asks. Rule used (the Lead's): a routine, textbook-standard procedure on given data is **understanding** — find an HCF/LCM by prime factorisation, solve a given pair, find a term or a sum of an AP, roots by the formula, a discriminant condition, a section-formula point, a single right triangle, a sector or segment area, a combined-solid volume, a grouped mean/median/mode, a classical probability. Word problems that need modelling, two-triangle height problems, surface areas of combined solids (choosing the exposed faces), non-routine or multi-step reasoning, error analysis and justification keep application / analysis / evaluation. Case parts were judged one by one; a case whose parts are now mostly recall/understanding carries `understanding` at the top level. Only `competency` and `bloom` changed: no question text, key, solution or marking scheme (checked by diffing every release field).

Exemplar ch06 (`content-templates/exemplars/maths/`) was **not** changed: the exemplar author already relabelled it honestly (README §5), and it is owned by exemplar-author. Its case parts (b) ("find the height from the proportion") would be understanding under the same rule — a follow-up for exemplar-author if wanted.

Counts per chapter (written + case items as whole items, and case parts with alternatives; RU / AP / AE = recall+understanding / application / analysis+evaluation):

| Chapter | Items before | Items after (same items) | Case parts before | Case parts after | Item tags changed | Part tags changed | Items added |
|---|---|---|---|---|---|---|---|
| ch01 | 8/14/12 | 14/9/11 | 5/9/6 | 11/3/6 | 6 | 6 | 5 |
| ch02 | 6/21/8 | 18/9/8 | 5/10/5 | 10/5/5 | 12 | 5 | 1 |
| ch03 | 10/16/9 | 14/12/9 | 6/8/6 | 10/4/6 | 4 | 4 | 1 |
| ch04 | 6/21/8 | 13/15/7 | 6/10/4 | 11/5/4 | 7 | 5 | 1 |
| ch05 | 5/23/6 | 12/17/5 | 4/14/2 | 11/7/2 | 7 | 7 | 2 |
| ch07 | 5/20/9 | 19/7/8 | 9/8/3 | 14/3/3 | 14 | 5 | 9 |
| ch08 | 7/19/8 | 25/2/7 | 9/9/2 | 16/2/2 | 18 | 7 | 3 |
| ch09 | 7/23/4 | 10/20/4 | 9/8/3 | 11/6/3 | 3 | 2 | 2 |
| ch10 | 7/17/11 | 18/6/11 | 5/11/4 | 13/3/4 | 11 | 8 | 6 |
| ch11 | 7/23/6 | 24/6/6 | 5/13/2 | 16/2/2 | 17 | 11 | 2 |
| ch12 | 4/24/8 | 15/13/8 | 6/12/2 | 14/4/2 | 11 | 8 | 3 |
| ch13 | 7/20/9 | 23/4/9 | 5/15/0 | 20/0/0 | 16 | 15 | 2 |
| ch14 | 7/23/5 | 24/6/5 | 10/6/4 | 15/1/4 | 17 | 5 | 2 |
| **Total** | 86/264/103 | 229/126/98 | 84/133/43 | 172/45/43 | **143** | **88** | **39** |

Every change was application → understanding, except 5 case top levels that went analysis → understanding (ch01 c04, ch04 c03, ch05 c04, ch07 c05, ch08 c05), because their parts are now mostly understanding. Each chapter README's Questions / Difficulty / Competency rows are updated and a "Competency audit" section lists the changes.

## 2. New recall/understanding items (39)

Re-tagging alone reached the averaged targets, but the Basic series then had to re-use mock questions in its May papers and mix bands inside internal choices, and the balance asked for more 5-mark understanding items in Coordinate Geometry (a shortfall request for `D long/5 recall+understanding [ch07]`). So 21 three-mark, 17 five-mark and 1 case item were written, all appended to `src/questions.mjs` (earlier ids unchanged), each with an independent re-solve check, KaTeX-clean, worked steps in the model answer and a short method note in `solution_md` (D-032), original numbers and contexts (NCERT examples such as the trisection of A(2, −2), B(−7, 4) and the kite problem were deliberately avoided). Two-mark understanding items were not needed: the bank already had 83.

| Chapter | Added (id suffix, type) |
|---|---|
| ch01 Real Numbers | 071 short-3 (HCF/LCM of three numbers), 072 short-3 (√7 irrational), 073 long-5 (factorise, HCF, LCM, product check), 074 long-5 (√2 irrational; 5 + 3√2), 075 long-5 (72, 120, 168) |
| ch02 Polynomials | 071 short-3 (factorise, verify sum and product) |
| ch03 Linear equations | 071 short-3 (elimination with check) |
| ch04 Quadratic equations | 071 short-3 (discriminant, nature, formula) |
| ch05 AP | 071 short-3 (20th term, S₂₀), 072 long-5 (terms, a₂₅, S₂₅, which term) |
| ch07 Coordinate geometry | 071 short-3 (collinear by distances), 072 short-3 (trisection points), 073 long-5 (rectangle), 074 long-5 (section point, midpoint, distances), 075 case (sports ground: recall part (a), understanding (b)/(c)), 076 short-3 (equidistant point, find k), 077 long-5 (right triangle, circumcentre), 078 long-5 (3 : 2 point, x-axis ratio, length), 079 long-5 (collinear, ratio, section check) |
| ch08 Trigonometry | 071 short-3 (8-15-17 ratios), 072 short-3 (standard-angle values), 073 long-5 (sin A = 3/5: all ratios, identity) |
| ch09 Heights and distances | 071 short-3 (guy wire), 072 long-5 (one flagpole, 45°/60°/30°) |
| ch10 Circles | 071 short-3 (two tangents, perimeter), 072 short-3 (tangent length, right angle, area), 073 short-3 (incircle tangent lengths), 074 long-5 (theorem statement, OP, area, perimeter), 075 short-3 (secant/tangent/none, chord), 076 short-3 (30° tangent triangle) |
| ch11 Areas related to circles | 071 short-3 (120° sector: arc, area, perimeter), 072 long-5 (r = 10.5 sector and major sector) |
| ch12 Surface areas and volumes | 071 short-3 (cone on hemisphere volume), 072 long-5 (tank volumes and curved surfaces), 073 long-5 (cylinder + cone) |
| ch13 Statistics | 071 short-3 (median), 072 long-5 (mean two ways, mode) |
| ch14 Probability | 071 short-3 (bag, impossible event), 072 long-5 (cards 1–50) |

Bank: 988 → 1,027 questions in the Maths files bank (authored chapters 910 → 949; ch06 exemplar 78, unchanged).

## 3. Engine: competency balance (`content-pipeline/src/assemble/*`, `config/pipeline.ts`)

- **Targets from data.** `competencyTargetsFor(bp)` (series.ts) turns the blueprint `mark_shares` into band targets for paper types in `COMPETENCY_BALANCE.paperTypes` (`board`, `board-second-exam`), tolerance `COMPETENCY_BALANCE.toleranceMarks = 3`. Nothing is hard-coded per subject. Shares must partition the competencies and add up to 1 within 1 % (CBSE 10 SST's 30 / 19.5 / 50 counts).
- **Counting.** `competencyMarksOf` gives case / source-based items per-part competency marks (a part's alternatives split its marks); banks from files, from Postgres (`body.children`) and the chapter-test bank in `publish` all carry them. `competencyRangeByBand(test)` returns the average and the least / most marks per band over every way a student can choose.
- **Balancing.** After the greedy fill (which now scores per-part fractions for board-pattern papers), `balanceCompetency` makes the best single swap — same slot, same unit scope, no repeat, no near-duplicate; May papers pay a small penalty for mock questions — until the band deviation plus the band mismatch between choice alternatives (weight 2) stops falling. Blueprint layout and exact unit weightage are untouched by construction. Papers without targets (chapter tests, unit tests) are assembled exactly as before.
- **Shortfalls are requests.** If a band can still fall outside the tolerance, the paper is built and returned with `shortfalls`: generation requests with the band (`competency: 'recall+understanding'`), slot section/type/marks and the unit's chapters. `assembleSubject` adds them to `requests`, so `--strict` exits 2 and `--freeze` is refused ("generation request(s) on series papers (missing questions or a competency shortfall)").
- **Frozen papers.** Re-used frozen papers that are off target get a note on every `assemble --series` run (never silent).
- **`--refreeze <series,…>`** (cli.ts, `keepFrozen`): with `--freeze`, re-assemble only the listed series and keep every other frozen paper. A full `--freeze` produces the same mocks and May papers (checked); only the unit tests would be redrawn.
- **`ORIGINALITY.keepApart`**: the 14 rewritten former duplicate pairs are engine conflicts now (the first re-freeze put ch02_053 + ch02_047 in Basic mock 4; `series.test.ts` caught it).

## 4. Re-freeze (Maths only)

```
npm run content -- assemble --board cbse --class 10 --subject mathematics --series --source files --freeze --refreeze mocks,may,mocks_basic,may_basic
```

- 16 papers replaced (Standard mocks 1–6, May 1–2; Basic mocks 1–6, May 1–2). They get new test versions on the next release. This is acceptable now because production has never released a frozen series (ADR-019 addendum).
- Unit tests 1–3: byte-identical (JSON-compared).
- Re-running the command reproduces the file byte for byte.
- Overlap: 0 % inside every series (asserted). May papers re-using same-variant mock questions: Standard 3 / 88, Basic 8 / 88 (soft rule; was mostly cross-variant before).
- Science and Social Science: `git diff --stat` on both frozen files is empty; SHA-256 unchanged (`0a20846e…`, `7ca9d2d3…`).

## 5. Competency per paper (marks: recall+understanding / application / analysis+evaluation)

"Before" is the old paper with the old tags, counted as before (whole item, first alternative), which reproduces the Lead's figures. "After" is the re-frozen paper with the new tags, counted per part with choice alternatives averaged; the range is the least–most a band can carry over every choice a student can make.

| Paper | Target | Before | After (average) | After, range over choices | Worst deviation |
|---|---|---|---|---|---|
| mock_1 | 43.2 / 19.2 / 17.6 | 36 / 23 / 21 | 43 / 19 / 18 | fixed | 0.4 |
| mock_2 | 43.2 / 19.2 / 17.6 | 36 / 24 / 20 | 43 / 19 / 18 | fixed | 0.4 |
| mock_3 | 43.2 / 19.2 / 17.6 | 33 / 24 / 23 | 43 / 19 / 18 | fixed | 0.4 |
| mock_4 | 43.2 / 19.2 / 17.6 | 33 / 26 / 21 | 43 / 19 / 18 | fixed | 0.4 |
| mock_5 | 43.2 / 19.2 / 17.6 | 30 / 29 / 21 | 43 / 19 / 18 | fixed | 0.4 |
| mock_6 | 43.2 / 19.2 / 17.6 | 33 / 27 / 20 | 43 / 19 / 18 | fixed | 0.4 |
| may_1 | 43.2 / 19.2 / 17.6 | 34 / 27 / 19 | 43 / 19 / 18 | fixed | 0.4 |
| may_2 | 43.2 / 19.2 / 17.6 | 33 / 23 / 24 | 43 / 19 / 18 | fixed | 0.4 |
| basic_mock_1 | 60 / 12 / 8 | 42 / 21 / 17 | 60 / 12 / 8 | fixed | 0 |
| basic_mock_2 | 60 / 12 / 8 | 38 / 29 / 13 | 60 / 10 / 10 | fixed | 2 |
| basic_mock_3 | 60 / 12 / 8 | 33 / 28 / 19 | 60 / 12 / 8 | fixed | 0 |
| basic_mock_4 | 60 / 12 / 8 | 29 / 35 / 16 | 60 / 12 / 8 | fixed | 0 |
| basic_mock_5 | 60 / 12 / 8 | 29 / 34 / 17 | 60 / 12 / 8 | fixed | 0 |
| basic_mock_6 | 60 / 12 / 8 | 33 / 30 / 17 | 59.5 / 12.5 / 8 | 57–62 / 10–15 / 8 | 3 |
| basic_may_1 | 60 / 12 / 8 | 30 / 36 / 14 | 59 / 13 / 8 | fixed | 1 |
| basic_may_2 | 60 / 12 / 8 | 29 / 32 / 19 | 60 / 12 / 8 | fixed | 0 |

The Standard target 43.2 / 19.2 / 17.6 is 54 / 24 / 22 % of 80 (the blueprint's `mark_shares`; the CBSE design table rounds it to 43 / 19 / 18). All papers are within ±3 in every band for every choice (asserted by `series.test.ts`); 15 of 16 are within ±2.

Science and Social Science (frozen, unchanged) are off target under this measure, and `assemble --series` prints a note for each paper. On average, Science mocks 3, 5 and 6 are short of analysis+evaluation (11–12.5 marks against 16), and SST mocks 3–6 and May 2 carry too much recall+understanding (26–31 against 24) and too little analysis+evaluation (30–35.5 against 40). The other Science and SST papers are close on average, but their internal-choice alternatives mix bands, so depending on the choices a student makes their shares swing by up to ±8 marks (e.g. Science mock 1: recall+understanding 36–48 against 40). All 16 Science and SST board/May papers therefore get a note. Re-freezing them is a separate decision (see follow-ups).

## How to verify (from `platform/`)

```
npm run content -- assemble --board cbse --class 10 --subject mathematics --series --source files --strict --verbose   # exit 0, 0 requests
npx vitest run --root content-pipeline test/series.test.ts      # 41 tests: frozen files incl. competency targets, engine rules
git diff 9c033fd -- content/authored/series/cbse-10-science.json content/authored/series/cbse-10-social-science.json   # empty
for c in 01 02 03 04 05 07 08 09 10 11 12 13 14; do npx tsx content/authored/maths/cbse-10-mathematics-ch$c/src/build.mjs | tail -1; done   # NO ERRORS ×13
```

## Tests added (`content-pipeline/test/series.test.ts`, 33 → 41)

- Per frozen subject: board and May papers meet the competency targets within the tolerance whichever alternatives a student attempts; for the two subjects frozen before the balance (`FROZEN_BEFORE_COMPETENCY_BALANCE`), every off-target paper must be reported as an `assemble` note.
- Case parts counted per part, alternatives split; `bandFractions`.
- Targets come from `mark_shares` for board-pattern blueprints only (Maths Standard 43.2 / 19.2 / 17.6, Basic and Basic May 60 / 12 / 8, SST 24 / 15.6 / 40; unit-test blueprint and a non-partition → null).
- Balancing reaches the exact targets with both choice alternatives in one band, the same paper for either bank order.
- A band the bank cannot fill comes back as `shortfalls` (band, slot, chapters) and as an `assembleSubject` request.
- `--refreeze` keeps every frozen paper outside the listed series.

## Known gaps / follow-ups

- **Lint warnings (new, not errors).** `balance.competency` warns when under 45 % of a chapter's items are application or higher. After the honest audit 11 Maths chapters are below that band (ch08, ch13, ch14 at 21–24 %; others 32–44 %). The band was set from the Standard paper; one bank serves Standard and Basic (Basic is 75 % recall+understanding), so the band (or measuring it by marks, per variant) needs a pipeline-engineer / Lead decision. I did not change it.
- **Science and SST re-freeze.** Their frozen papers are off target under the per-part, any-choice measure (above). Re-freeze with `--refreeze mocks,may` after the Lead decides; check the bank first (SST needs more analysis/evaluation marks).
- **Exemplar ch06** case parts (b) could be re-tagged to understanding by exemplar-author under the same rule.
- **Commit message slip:** the first content commit says "25" new items; that batch had 26 (39 in total after the second batch).
- Live mocks, chapter tests (`tests.json`) and unit tests are unchanged.

## Decisions made

ADR-019 addendum (competency balance, counting rule, `--refreeze`, Maths-only re-freeze, Science/SST exemption until re-frozen). Config: `COMPETENCY_BALANCE` and `ORIGINALITY.keepApart` in `content-pipeline/config/pipeline.ts`.

## Needs from owner

None.

## Gate results (2026-10-27)

```
npm test -w @soyl/content-templates                            Test Files 1 passed · Tests 505 passed · exit 0
npm run content -- lint --exemplars                            all units 0 error(s) (11 Maths balance.competency warnings, see gaps) · exit 0
npm run content -- verify --board cbse --class 10 --authored   72 unit(s), 5771 questions, 0 blocking flag(s) · exit 0
npm run content -- originality --authored                      72 unit(s), 0 error(s) · exit 0
npm test -w @soyl/content-pipeline                             Test Files 8 passed · Tests 277 passed (series.test.ts 41) · exit 0
assemble --series --source files --strict                      science 0 · mathematics 0 · social-science 0
npx vitest run --root api test/content.test.ts                 Test Files 1 passed · Tests 13 passed · exit 0
npx vitest run --root db test/db6-split.test.ts                Test Files 1 passed · Tests 8 passed · exit 0
npm run typecheck                                              all workspaces · exit 0
Maths chapter builds (13)                                      NO ERRORS; every new item's re-solve check OK
```
