# subject-producer (remediation) — competency audit fixes — 2026-11-05 (finished 2026-11-09)
Status: done (all four target groups; see "Known gaps")
Branch: `platform/subject-producer/qa-competency-fixes` (worktree `C:/Users/Prabhu/soyl-wt/content-qa-competency`), fast-forwarded to `platform/main` 72f2a9e (includes a1ae318, the api hookTimeout fix) on 2026-11-07, and to `platform/main` 54643166 on 2026-11-09 (no conflicts; no overlap with the edited chapters, no lockfile change).

Models: Sonnet writers drafted every new or rewritten item; an Opus producer reviewed, fixed, gated and committed every chapter. The work was paused on 2026-11-08 (owner priority) with 16 chapters edited but not committed; a resuming Opus producer re-reviewed those 16 on 2026-11-09 (spot-check of rewrites against each README, one further honest downgrade: ICSE 10 History ch09 q044, all dates printed in the options, now understanding), rebuilt them twice (byte-identical), ran the gates and committed them.

Remediation of `docs/platform/content-qa/2026-11-05-competency-retag-audit.md`. Owner rule: a competency tag must describe its item honestly; if a chapter misses the 45–65% band, change the items, not the labels. Per D-050, every new or rewritten item was drafted by a Sonnet writer (one at a time) and reviewed, corrected where needed, gated and committed by the producer. Each chapter README has a `## Competency audit 2026-11-05` section listing its retags and rewrites.

## Method
- Every item the audit listed was set to its honest tag, or rewritten in place into a genuinely higher-order item (same key, type, marks, topic tags and test slots; ids unchanged because no item was inserted, deleted or reordered).
- Upgrades are real changes of demand: source inference, cause weighing, chronology, judging partly right claims, multi-step numericals, new set-ups, data interpretation, identifying unknowns from observations. Scenario wrappers were not accepted: the reviewer downgraded a further 13 writer rewrites that were still near-definitional (listed per chapter below as "rewritten, below application").
- Facts were checked by the reviewer item by item (chemistry equations balanced by hand, numericals re-computed, history dates and provisions checked against the chapter notes). Two writer items were corrected for accuracy (ISC 12 Chemistry ch22 q028 and q044) and one withdrawn as out of syllabus (CBSE 10 Science ch02 q024).
- Builds were run twice and are byte-identical; every commit followed a fully green gate run that started after the chapter's final build.

## Per chapter
Share = top-level items at application or higher. "Before" is platform/main at 8774ebf; "after" is the chapter at its commit. Computed from `release.json` (8774ebf against the commit). "Tags changed" = items whose tag (or a part's tag) changed with no text change. "Items upgraded" = items rewritten in place that are now honestly application or higher (in ICSE 10 History & Civics most were already tagged application, dishonestly, before the rewrite); "+N rewritten, below application" = rewrites the reviewer kept at recall or understanding. CBSE 10 Mathematics uses the D-035 band 20–65%; every other chapter is inside 45–65%. The 16 chapters listed under "Gates" were committed on 2026-11-09 (a7266512 to b6cc43fe); the other 24 on 2026-11-05 and 2026-11-07.

| Chapter | Tags changed (retag only) | Items upgraded | Share before → after | Commit |
|---|---|---|---|---|
| CBSE 10 English ch02 | 3 | 0 | 47/76 (61.8%) → 44/76 (57.9%) | a7266512 |
| CBSE 10 English ch04 | 8 | 10 (+3 rewritten, below application) | 30/63 (47.6%) → 32/63 (50.8%) | 39aeb3e5 |
| CBSE 10 English ch06 | 1 | 0 | 33/66 (50.0%) → 32/66 (48.5%) | 9ec0de34 |
| CBSE 10 English ch07 | 1 | 0 | 32/63 (50.8%) → 31/63 (49.2%) | 01101d84 |
| CBSE 10 English ch08 | 1 | 0 | 34/67 (50.7%) → 33/67 (49.3%) | 086ab4cd |
| CBSE 10 Hindi A ch12 | 2 | 6 (+5 rewritten, below application) | 37/75 (49.3%) → 37/75 (49.3%) | b4060a61 |
| CBSE 10 Mathematics ch01 | 2 | 0 | 28/75 (37.3%) → 26/75 (34.7%) | b9f1fa88 |
| CBSE 10 Science ch02 | 0 | 4 | 32/77 (41.6%) → 36/77 (46.8%) | 67df2c07 |
| CBSE 10 Science ch15 | 0 | 3 | 28/64 (43.8%) → 31/64 (48.4%) | 8b4de249 |
| CBSE 12 Chemistry ch01 | 2 | 3 | 32/68 (47.1%) → 33/68 (48.5%) | 6e650126 |
| CBSE 12 Chemistry ch02 | 1 | 0 | 33/70 (47.1%) → 32/70 (45.7%) | a315a0d6 |
| CBSE 12 Chemistry ch04 | 4 | 4 | 30/64 (46.9%) → 30/64 (46.9%) | 40128742 |
| CBSE 12 Chemistry ch08 | 4 | 16 | 30/65 (46.2%) → 35/65 (53.8%) | 80381d89 |
| CBSE 12 Chemistry ch09 | 1 | 0 | 31/65 (47.7%) → 30/65 (46.2%) | 24db09e1 |
| CBSE 12 Chemistry ch11 | 1 | 0 | 34/62 (54.8%) → 33/62 (53.2%) | ebf998a6 |
| ICSE 10 Chemistry ch08 | 7 | 12 (+1 rewritten, below application) | 30/64 (46.9%) → 32/64 (50.0%) | 1f6e35b3 |
| ICSE 10 History & Civics ch08 | 6 | 39 | 44/87 (50.6%) → 42/87 (48.3%) | 02e04038 |
| ICSE 10 History & Civics ch09 | 0 | 9 (+2 rewritten, below application) | 44/93 (47.3%) → 42/93 (45.2%) | 93f7fc33 |
| ICSE 10 History & Civics ch10 | 0 | 7 (+1 rewritten, below application) | 36/77 (46.8%) → 35/77 (45.5%) | 604226d1 |
| ICSE 10 History & Civics ch11 | 3 | 7 | 40/80 (50.0%) → 37/80 (46.3%) | ee8a381d |
| ICSE 10 History & Civics ch12 | 0 | 11 (+1 rewritten, below application) | 40/80 (50.0%) → 39/80 (48.8%) | c763fc0f |
| ICSE 10 History & Civics ch13 | 9 | 29 (+1 rewritten, below application) | 39/80 (48.8%) → 37/80 (46.3%) | d18c4c95 |
| ICSE 10 History & Civics ch15 | 3 | 6 (+1 rewritten, below application) | 40/80 (50.0%) → 36/80 (45.0%) | c8c81946 |
| ICSE 10 History & Civics ch16 | 2 | 9 (+2 rewritten, below application) | 44/87 (50.6%) → 40/87 (46.0%) | 4f124912 |
| ICSE 10 History & Civics ch18 | 2 | 9 | 40/78 (51.3%) → 38/78 (48.7%) | b6cc43fe |
| ICSE 10 Physics ch10 | 4 | 17 (+1 rewritten, below application) | 33/71 (46.5%) → 33/71 (46.5%) | 8018fa1c |
| ISC 12 Chemistry ch21 | 4 | 9 (+1 rewritten, below application) | 35/69 (50.7%) → 33/69 (47.8%) | d35d89eb |
| ISC 12 Chemistry ch22 | 1 | 9 | 32/68 (47.1%) → 34/68 (50.0%) | d5a2cf3c |
| ISC 12 Physics ch09 | 12 | 0 | 45/71 (63.4%) → 33/71 (46.5%) | f067e5ee |
| ISC 12 Physics ch11 | 6 | 0 | 43/75 (57.3%) → 37/75 (49.3%) | 10bff657 |
| ISC 12 Physics ch12 | 5 | 8 | 37/68 (54.4%) → 33/68 (48.5%) | f260d3cb |
| ISC 12 Physics ch13 | 3 | 0 | 40/70 (57.1%) → 37/70 (52.9%) | e9dcd578 |
| ISC 12 Physics ch14 | 1 | 0 | 39/69 (56.5%) → 38/69 (55.1%) | da607645 |
| ISC 12 Physics ch15 | 5 | 0 | 41/70 (58.6%) → 36/70 (51.4%) | 266622b6 |
| ISC 12 Physics ch16 | 5 | 0 | 37/68 (54.4%) → 32/68 (47.1%) | aa051f65 |
| ISC 12 Physics ch17 | 7 | 3 | 41/74 (55.4%) → 35/74 (47.3%) | aac612db |
| ISC 12 Physics ch18 | 4 | 5 | 39/75 (52.0%) → 35/75 (46.7%) | 3f73215f |
| ISC 12 Physics ch19 | 7 | 0 | 39/71 (54.9%) → 32/71 (45.1%) | f011de9b |
| ISC 12 Physics ch20 | 9 | 0 | 46/75 (61.3%) → 37/75 (49.3%) | 48f2a812 |
| ISC 12 Physics ch21 | 9 | 2 | 55/99 (55.6%) → 46/99 (46.5%) | 1d052d9f |

Full id lists (retag only / rewritten into higher-order / rewritten but honestly below application) are in each README and in the appendix below.

## Judged honest despite the audit, or differently from it
- ISC 12 Chemistry ch21 q036 and ICSE 10 History ch09 q034, ch10 q072, ch12 q068, ch13 q034, ch15 q008, ch16 q056/q075: the writer rewrote these, but the new versions are still recall/understanding in substance, so they are tagged understanding (not the audit's "recall" for the old text). Same for ICSE 10 Physics ch10 q046 and ICSE 10 Chemistry ch08 q054.
- CBSE 10 Hindi A ch12: the audit counted 2 of 5 higher-order parts in passages 001, 003–006 by their tags. On reading, most "analysis" parts are answered verbatim by the SOYL commentary, so the parts themselves were over-tagged too. All passage parts in Hindi ch12 and English ch04 were re-judged (stated in the passage → recall/understanding); every passage parent is now understanding except Hindi q007 (case, 3 of 4 parts higher-order). The share was restored with standalone items.
- No audit retag was judged dishonest in the other direction; every audited over-tag was confirmed.

## Leads (audit "worth checking next")
- **ICSE 10 History & Civics ch08:** confirmed. 18+ "why/how/state" items and scenario wrappers were over-tagged. Fixed: 6 retags; 39 items rewritten (all long and source items re-judged by their parts); 44/87 → 42/87 (48.3%).
- **ISC 12 Physics ch09 onwards:** the downward relabels were honest, but one-formula substitutions and directly applied rules were still tagged application in every chapter from ch09 to ch21 (objective and numerical items re-read; short and long answers were not). 96 retags across ch09, ch11–ch21; ch12, ch17, ch18 and ch21 fell below 45% and got 18 genuine upgrades. ch10 was already audited.
- **CBSE 10 English ch02:** the 84% → 62% relabel is honest and follows the chapter's stated rule; three recognition MCQs still tagged analysis against that rule were retagged (q004, q016, q030); 57.9%.

## Gates
Final run for the last 16 chapters (ICSE 10 History & Civics ch08–ch13, ch15, ch16, ch18; ISC 12 Physics ch12, ch17, ch18, ch21; CBSE 10 Science ch02, ch15; CBSE 10 English ch02), 2026-11-09 02:11–02:23 IST under `_tools/heavy.sh`, on the tree merged with `platform/main` 54643166, after the final rebuild of every chapter with `src/` (`npx tsx content/authored/<family>/<unit>/src/build.mjs` from `platform/`, run twice: `release.json` + `tests.json` of all 15 rebuilt chapters byte-identical, tree unchanged). From `platform/`:

| Command | Result |
|---|---|
| `npm test -w @soyl/content-templates` | 1 file, 4649/4649 passed |
| `npm run content -- lint --exemplars` | exit 0; 664 units, 0 errors; warnings only in 11 chapters outside this task (CBSE 10 Science ch03–ch05, ch08, ch09, ch11–ch14 and SST ch05 `balance.competency` ×1 each; Hindi A ch10 quote-review/passage-origin), none in the 40 chapters of this handoff |
| `npm run content -- verify --board cbse --class 10 --authored` | 99 units, 7537 questions, 0 blocking flags |
| `npm run content -- verify --board cisce --class 10 --authored` | 101 units, 6978 questions, 0 blocking flags |
| `npm run content -- verify --board cisce --class 12 --authored` | 128 units, 8871 questions, 0 blocking flags |
| `npm run content -- originality --authored` | 664 units, 0 errors |
| `npx vitest run --root db test/db6-split.test.ts` | 8/8 passed |
| `npx vitest run --root api test/content.test.ts` | 13/13 passed |
| `npx vitest run --root content-pipeline test/series.test.ts` | 41/41 passed |

The 24 chapters committed earlier (merged to `platform/main` in content waves w27 and w28) were gated by the earlier producer before each commit (2026-11-05 and 2026-11-07); the 2026-11-09 run above includes them too, since lint, originality and the api/db/series tests cover every authored unit and the three verify runs cover all of them except CBSE 12 Chemistry (not re-verified in this run).

## Known gaps / follow-ups
- **Same patterns elsewhere (not in scope, not changed):** language chapters with SOYL commentary passages tag "according to the commentary…" parts as analysis (seen in English ch04 and Hindi ch12; the audit saw it in Hindi ch05/ch06); ISC 12 Physics short/long answers were not re-judged; ICSE 10 Chemistry ch14 has nine learnt-equation look-alikes tagged application (audit pattern 3).
- **CBSE 10 Science ch02 has no `src/`:** its `release.json` was edited directly (four items; fields listed in its README), as the 2026-10-27 audit did. Items in the frozen series `series/cbse-10-science.json` were not touched in ch02 or ch15.
- Some chapters sit close to the floor (ICSE 10 History ch15 45.0%, ch09 45.2%, ch10 45.5%; ISC 12 Physics ch19 45.1%), because honest downgrades of writer items were applied after the writer's target.
- Assessment-designer: frozen series that use items whose tag changed should be checked against board competency mixes (audit follow-up).
- Process note: on 2026-11-07 ~11:18 IST, stopping a superseded gate run left stray processes; the producer killed processes whose command line matched this worktree or `gates.sh`, and removed its own stale `_heavy.lock`. If another agent's queued gate script (named gates.sh) died at that time, that is the cause.

## Decisions made
None new (applies the audit's definitions; the CBSE 10 Maths D-035 band was kept for maths).

## Needs from owner
None.

## Appendix: per-chapter id lists
Ids are release ids without the `q_<subject>_chNN_` prefix, computed from `release.json` (8774ebf against each chapter's commit) and matching the README sections. For a passage, case or long item, "rewritten" means the stem, options, key or a part's text changed; "retag only" includes parents whose parts' tags changed.
- **CBSE 10 English ch02** (`cbse-10-english-language-and-literature-ch02`): retag only: 004, 016, 030. Rewritten into application or higher: none.
- **CBSE 10 English ch04** (`cbse-10-english-language-and-literature-ch04`): retag only: 001, 004, 006, 007, 039, 041, 058, 063. Rewritten into application or higher: 008, 010, 011, 013, 014, 022, 023, 024, 042, 044. Rewritten, honestly below application: 002, 003, 005.
- **CBSE 10 English ch06** (`cbse-10-english-language-and-literature-ch06`): retag only: 053. Rewritten into application or higher: none.
- **CBSE 10 English ch07** (`cbse-10-english-language-and-literature-ch07`): retag only: 023. Rewritten into application or higher: none.
- **CBSE 10 English ch08** (`cbse-10-english-language-and-literature-ch08`): retag only: 023. Rewritten into application or higher: none.
- **CBSE 10 Hindi A ch12** (`cbse-10-hindi-a-ch12`): retag only: 002, 007. Rewritten into application or higher: 024, 025, 028, 047, 061, 069. Rewritten, honestly below application: 001, 003, 004, 005, 006.
- **CBSE 10 Mathematics ch01** (`cbse-10-mathematics-ch01`): retag only: 002, 027. Rewritten into application or higher: none.
- **CBSE 10 Science ch02** (`cbse-10-science-ch02`): retag only: none. Rewritten into application or higher: 006, 007, 020, 064.
- **CBSE 10 Science ch15** (`cbse-10-science-ch15`): retag only: none. Rewritten into application or higher: 006, 022, 053.
- **CBSE 12 Chemistry ch01** (`cbse-12-chemistry-ch01`): retag only: 025, 027. Rewritten into application or higher: 012, 036, 048.
- **CBSE 12 Chemistry ch02** (`cbse-12-chemistry-ch02`): retag only: 005. Rewritten into application or higher: none.
- **CBSE 12 Chemistry ch04** (`cbse-12-chemistry-ch04`): retag only: 006, 012, 017, 022. Rewritten into application or higher: 021, 023, 024, 031.
- **CBSE 12 Chemistry ch08** (`cbse-12-chemistry-ch08`): retag only: 013, 016, 037, 038. Rewritten into application or higher: 001, 008, 009, 017, 018, 019, 028, 030, 031, 032, 039, 049, 052, 057, 058, 059.
- **CBSE 12 Chemistry ch09** (`cbse-12-chemistry-ch09`): retag only: 022. Rewritten into application or higher: none.
- **CBSE 12 Chemistry ch11** (`cbse-12-chemistry-ch11`): retag only: 041. Rewritten into application or higher: none.
- **ICSE 10 Chemistry ch08** (`icse-10-chemistry-ch08`): retag only: 017, 018, 026, 027, 034, 035, 045. Rewritten into application or higher: 006, 009, 010, 014, 015, 019, 022, 033, 037, 038, 040, 049. Rewritten, honestly below application: 054.
- **ICSE 10 History & Civics ch08** (`icse-10-history-civics-ch08`): retag only: 036, 049, 076, 084, 085, 086. Rewritten into application or higher: 003, 004, 005, 006, 009, 013, 014, 017, 018, 020, 021, 024, 026, 030, 031, 032, 033, 040, 041, 042, 043, 046, 048, 050, 052, 061, 063, 069, 070, 071, 072, 073, 074, 075, 077, 078, 079, 080, 081.
- **ICSE 10 History & Civics ch09** (`icse-10-history-civics-ch09`): retag only: none. Rewritten into application or higher: 005, 006, 016, 019, 033, 051, 065, 067, 069. Rewritten, honestly below application: 034, 044.
- **ICSE 10 History & Civics ch10** (`icse-10-history-civics-ch10`): retag only: none. Rewritten into application or higher: 070, 071, 073, 074, 075, 076, 077. Rewritten, honestly below application: 072.
- **ICSE 10 History & Civics ch11** (`icse-10-history-civics-ch11`): retag only: 020, 021, 035. Rewritten into application or higher: 004, 009, 010, 011, 027, 043, 045.
- **ICSE 10 History & Civics ch12** (`icse-10-history-civics-ch12`): retag only: none. Rewritten into application or higher: 034, 035, 063, 064, 065, 066, 067, 069, 070, 071, 072. Rewritten, honestly below application: 068.
- **ICSE 10 History & Civics ch13** (`icse-10-history-civics-ch13`): retag only: 009, 018, 025, 029, 044, 052, 072, 074, 075. Rewritten into application or higher: 003, 004, 006, 008, 012, 013, 014, 020, 021, 022, 023, 032, 035, 036, 037, 038, 040, 046, 047, 054, 055, 057, 058, 059, 060, 061, 062, 067, 068. Rewritten, honestly below application: 034.
- **ICSE 10 History & Civics ch15** (`icse-10-history-civics-ch15`): retag only: 009, 031, 058. Rewritten into application or higher: 007, 032, 033, 034, 056, 057. Rewritten, honestly below application: 008.
- **ICSE 10 History & Civics ch16** (`icse-10-history-civics-ch16`): retag only: 053, 054. Rewritten into application or higher: 020, 038, 043, 055, 073, 074, 076, 077, 078. Rewritten, honestly below application: 056, 075.
- **ICSE 10 History & Civics ch18** (`icse-10-history-civics-ch18`): retag only: 041, 042. Rewritten into application or higher: 005, 006, 007, 028, 066, 067, 068, 069, 070.
- **ICSE 10 Physics ch10** (`icse-10-physics-ch10`): retag only: 038, 040, 051, 056. Rewritten into application or higher: 004, 012, 014, 015, 017, 022, 028, 036, 041, 047, 048, 053, 054, 058, 059, 061, 063. Rewritten, honestly below application: 046.
- **ISC 12 Chemistry ch21** (`isc-12-chemistry-ch21`): retag only: 006, 046, 067, 068. Rewritten into application or higher: 003, 007, 012, 024, 028, 049, 057, 058, 060. Rewritten, honestly below application: 036.
- **ISC 12 Chemistry ch22** (`isc-12-chemistry-ch22`): retag only: 033. Rewritten into application or higher: 027, 028, 030, 032, 041, 043, 044, 045, 054.
- **ISC 12 Physics ch09** (`isc-12-physics-ch09`): retag only: 005, 010, 011, 012, 015, 016, 019, 025, 031, 037, 040, 065. Rewritten into application or higher: none.
- **ISC 12 Physics ch11** (`isc-12-physics-ch11`): retag only: 015, 030, 039, 051, 052, 054. Rewritten into application or higher: none.
- **ISC 12 Physics ch12** (`isc-12-physics-ch12`): retag only: 017, 021, 024, 039, 050. Rewritten into application or higher: 002, 008, 023, 025, 045, 046, 047, 048.
- **ISC 12 Physics ch13** (`isc-12-physics-ch13`): retag only: 003, 038, 050. Rewritten into application or higher: none.
- **ISC 12 Physics ch14** (`isc-12-physics-ch14`): retag only: 002. Rewritten into application or higher: none.
- **ISC 12 Physics ch15** (`isc-12-physics-ch15`): retag only: 015, 016, 044, 046, 051. Rewritten into application or higher: none.
- **ISC 12 Physics ch16** (`isc-12-physics-ch16`): retag only: 004, 005, 018, 057, 058. Rewritten into application or higher: none.
- **ISC 12 Physics ch17** (`isc-12-physics-ch17`): retag only: 002, 013, 014, 015, 020, 021, 063. Rewritten into application or higher: 037, 039, 065.
- **ISC 12 Physics ch18** (`isc-12-physics-ch18`): retag only: 008, 050, 051, 054. Rewritten into application or higher: 009, 015, 020, 044, 058.
- **ISC 12 Physics ch19** (`isc-12-physics-ch19`): retag only: 010, 011, 013, 024, 051, 053, 070. Rewritten into application or higher: none.
- **ISC 12 Physics ch20** (`isc-12-physics-ch20`): retag only: 001, 002, 007, 008, 017, 021, 024, 034, 045. Rewritten into application or higher: none.
- **ISC 12 Physics ch21** (`isc-12-physics-ch21`): retag only: 004, 009, 020, 033, 044, 045, 049, 065, 074. Rewritten into application or higher: 008, 036.
