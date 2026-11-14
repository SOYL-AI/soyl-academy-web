# subject-producer — ISC Class 11 Chemistry (hand-authored) — 2026-11-09, completed 2026-11-14

Status: **done**. All 24 chapters of `platform/catalog/cisce/isc-11/chemistry/syllabus.yaml` are authored. ch01–ch12 were committed by the first producer and merged to platform/main in content wave w36. ch13–ch24 were reviewed, finished, gated and committed by a second producer session on 2026-11-14, one commit per chapter after a fully green gate run. All items are `status: "draft"` until a reviewer approves them.

Branch: `platform/subject-producer/isc-11-chemistry` (worktree `C:/Users/Prabhu/soyl-wt/content-isc11-chemistry`), fast-forwarded to platform/main 1ea7b21f before this work. Not pushed and not merged.

**Process (D-050).** Sonnet 5.5 writers drafted every chapter, two at a time, from one shared brief; writers never committed. The first producer (Opus 5.5) reviewed and committed ch01–ch12, reviewed ch13–ch16 and part of ch17–ch18, and was then stopped (owner pause, 8 Nov). The second producer (Opus 5.5, this session):
- read every item of ch13–ch24 from the built bank (key, solution, marking scheme, competency tag, topic ids, assertion-reason logic) and re-solved every numerical;
- read every deck, notes section and flashcard set in compact form and spot-checked rendered SVGs (ch20 SN2 and E1/E2, ch24 nitration mechanism and directing effect);
- fixed what it found (list below; each chapter README has a "Verifier pass" section);
- moved each chapter from the untracked staging area `platform/content/_stage/` to `platform/content/authored/chemistry/`, wrote its README, rebuilt it twice (byte-identical), gated in batches of four and committed.

No new writer was spawned: the staged drafts covered ch13–ch24, and ch24 lacked only its build script and test layout, which the producer wrote. The Opus writer fallback was not needed. `_stage/` is deleted.

Assertion-reason options are exactly those of the ISC 2027 Chemistry specimen (862): (a) both true and R explains A; (b) both true, R does not explain A; (c) A true, R false; (d) both false. There is no "A false, R true" item. Every chapter uses all four keys.

## What changed (this session)
| Path | What | Commit |
|---|---|---|
| `platform/content/authored/chemistry/isc-11-chemistry-ch13/` | Chemical Equilibrium | 37469704 |
| `…-ch14/` | Ionic Equilibrium: Acids, Bases and pH | 3e183f38 |
| `…-ch15/` | Common Ion Effect, Salt Hydrolysis, Buffers and Solubility Product | 7a413567 |
| `…-ch16/` | Redox Reactions | 4bd8204c |
| `…-ch17/` | Introduction, Classification and IUPAC Nomenclature of Organic Compounds | 48ca8b08 |
| `…-ch18/` | Isomerism | 4e8141cc |
| `…-ch19/` | Purification and Analysis of Organic Compounds | 6d7ad0a0 |
| `…-ch20/` | Basic Concepts of Organic Reaction Mechanisms | d86a2ee9 |
| `…-ch21/` | Alkanes | d13d4050 |
| `…-ch22/` | Alkenes | 492d3e64 |
| `…-ch23/` | Alkynes | 69e24023 |
| `…-ch24/` | Aromatic Hydrocarbons: Benzene | 325f626c |
| `docs/platform/handoffs/2026-11-09-subject-producer-isc11-chemistry.md` | This note | docs commit after ch24 |

Each chapter folder holds `release.json`, `tests.json`, `README.md` and `src/` (a copy of the ISC 11 Chemistry builder `lib.mjs`, the SVG, deck, study and question modules, and `build.mjs`). Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-11-chemistry-chNN/src/build.mjs`.

## Chapters ch13–ch24
| Chapter | Written by | Decks (slides) | Notes | Flashcards | Questions (marks) | SVG slides | A-R keys | App+ items |
|---|---|---|---|---|---|---|---|---|
| ch13 Chemical Equilibrium | Sonnet 5.5 (two writers); reviewed by Opus 5.5 | 2 (18 + 18) | 6 | 32 | 66 (123) | 5 | a c c b d a | 55% |
| ch14 Ionic Equilibrium | Sonnet 5.5 (two writers); reviewed by Opus 5.5 | 2 (20 + 17) | 6 | 32 | 68 (127) | 5 | a b c d c a | 50% |
| ch15 Common Ion, Hydrolysis, Buffers, Ksp | Sonnet 5.5 (two writers); reviewed and corrected by Opus 5.5 | 2 (17 + 19) | 6 | 31 | 68 (126) | 6 | a b c d a b | 54% |
| ch16 Redox Reactions | Sonnet 5.5 (two writers); reviewed and corrected by Opus 5.5 | 2 (15 + 17) | 6 | 31 | 68 (125) | 6 | a b c d a b | 57% |
| ch17 Classification and IUPAC Nomenclature | Sonnet 5.5; reviewed and corrected by Opus 5.5 | 2 (18 + 19) | 7 | 31 | 65 (120) | 13 | a b c d c b | 57% |
| ch18 Isomerism | Sonnet 5.5; reviewed and corrected by Opus 5.5 | 2 (17 + 17) | 7 | 31 | 67 (122) | 11 | b b a c d c | 49% |
| ch19 Purification and Analysis | Sonnet 5.5; reviewed and corrected by Opus 5.5 | 2 (19 + 18) | 7 | 32 | 70 (120) | 7 | b d c a c b | 49% |
| ch20 Reaction Mechanisms | Sonnet 5.5; reviewed and corrected by Opus 5.5 | 2 (15 + 19) | 7 | 32 | 65 (115) | 9 | a b c c d b | 51% |
| ch21 Alkanes | Sonnet 5.5; reviewed and corrected by Opus 5.5 | 2 (18 + 18) | 7 | 32 | 67 (123) | 8 | a b c d b c | 51% |
| ch22 Alkenes | Sonnet 5.5; reviewed and corrected by Opus 5.5 | 2 (16 + 18) | 7 | 32 | 67 (123) | 6 | a c b d c b | 54% |
| ch23 Alkynes | Sonnet 5.5; reviewed and corrected by Opus 5.5 | 2 (18 + 17) | 7 | 32 | 65 (124) | 6 | a b c d c b | 57% |
| ch24 Aromatic Hydrocarbons: Benzene | Sonnet 5.5; build script and fixes by Opus 5.5 | 2 (17 + 17) | 7 | 32 | 66 (124) | 7 | a b c d c b | 50% |
| **Total ch13–ch24** | | **24 decks (422 slides)** | **80** | **380** | **802 (1472)** | **89** | | |

Every chapter has two ISC chapter tests on the class-default blueprints `isc-11-default-chapter-test-short` (20 marks, 50 min) and `-long` (40 marks, 100 min): Section A objective (MCQ + assertion-reason), B 2-mark, C 3-mark and D 5-mark long answers set in parts, with internal choice in B, C and D. Short and long tests share no item, and no check-slide item is used in either test. Each question bank has 23–24 MCQs, 6 assertion-reason, 2–3 true-false, 2–3 fill-blank, 1–2 match, 3–6 numericals, 9 two-mark and 10 three-mark short answers and 5–6 long items. There are no case-based items and no word limits (ISC sets neither).

## Review findings and fixes (second producer, 2026-11-14)
| Chapter | Finding | Fix |
|---|---|---|
| ch13 | A solution printed one value twice ("α² = 0.0588 = 0.0588"). | Shows the division. |
| ch15 | Six plain-text solution lines printed raw LaTeX ("2.0 \times 10^{-4}"). | Numbers set as inline maths. |
| ch15 | Five one-step items tagged application. | Retagged understanding (62% → 54%). |
| ch16 | An MCQ keyed "the chlorate ion" for "same oxidation number as in KClO₃" (tests nothing); its solution had unpaired maths delimiters. | Key is now Cl₂O₅ (+5); solution rewritten; it and the oxidation-number match retagged understanding. |
| ch17 | The ortho-nitrotoluene key was the only option with a bracketed common name (a cue); a table printed C₁H₄. | Cue removed; CH₄. Two recognition items retagged understanding. |
| ch18 | Writing syn/anti oxime structures from the definition tagged application. | Understanding. |
| ch19 | **Error:** the Liebig long item's model answer worked a different sample (0.1250 g, 84.0% C) from the stem (0.2100 g, 0.6600 g CO₂, 0.2700 g H₂O). | Model computed from the stated data: 85.7% C, 14.3% H, CH₂. |
| ch19 | A Carius item gave 50% P for an organic compound; a 49% N compound was called an amide. | Sample mass changed (25.0% P); now "a nitrogen-rich fertiliser additive". |
| ch20 | A deck table printed "1.74e-5"; a check-slide heading read "S N one". | 1.74 × 10⁻⁵; SN1. |
| ch21 | A Grignard stem was self-contradictory ("water in dry conditions"). | Reworded. |
| ch22 | Four standard-equation or standard-reagent items tagged application. | Understanding (60% → 54%). |
| ch23 | A solution wrote the hex-3-yne enol with seven carbons. Three recall-type items tagged application. | Enol corrected; three retagged (62% → 57%). |
| ch24 | No build script or test layout (writer stopped). Negative enthalpies printed with hyphens. A 3-mark item repeated the deck's worked example (same data). Notes read "C₆H₅-ring C₆H₆". Four standard-equation items tagged application. | build.mjs written (tests, seed, provenance); true minus signs; item now compares benzene with cyclohexa-1,4-diene (stabilisation 0); notes fixed; four retagged (56% → 50%). |
| ch14, ch21 | No errors found. | — |

Tags were changed only where the tag did not match what the item asks; no item was tagged up. All chapters stay in the 45–65% band. In every build `verifier_pass` now records the writer's pass and the producer's item-by-item review; a duplicate `chemistry_facts: 'FACTS-SUMMARY '` placeholder in ch14's build was removed and ch20's `--dump` path aligned with the template.

The first producer's notes for ch13–ch16 (and SVG re-layouts in ch17–ch18) are kept in the READMEs.

## How to verify
From `platform/` in the worktree, under `bash C:/Users/Prabhu/soyl-wt/_tools/heavy.sh`:
```
npm test -w @soyl/content-templates
npm run content -- lint --exemplars
npm run content -- verify --board cisce --class 11 --subject chemistry --authored
npm run content -- originality --authored
npx vitest run --root db test/db6-split.test.ts
npx vitest run --root api test/content.test.ts
npx vitest run --root content-pipeline test/series.test.ts
```
Results of the three gate runs (each started after the final build of its chapters):
| Run | content-templates | lint --exemplars | verify cisce 11 chemistry | originality | db6-split | api content | series |
|---|---|---|---|---|---|---|---|
| ch13–16 (12:54–13:09 IST) | 5181/5181 | 0 errors | 16 units, 1092 q, 0 blocking | 740 units, 0 errors | 8/8 | 13/13 | 41/41 |
| ch17–20 (13:23–13:32 IST) | 5209/5209 | 0 errors | 20 units, 1359 q, 0 blocking | 744 units, 0 errors | 8/8 | 13/13 | 41/41 |
| ch21–24 (13:34–13:43 IST) | 5237/5237 | 0 errors | 24 units, 1624 q, 0 blocking | 748 units, 0 errors | 8/8 | 13/13 | 41/41 |

Rebuilding any chapter leaves the tree clean (checked twice per chapter with md5 and again by the commit script).

## Known gaps / follow-ups
- Narration audio is not generated (TTS stage).
- SVGs of ch13–ch19 were rendered and checked by the first producer; for ch20–ch24 the writers' renders were current and the producer spot-checked four of them rather than every diagram.
- pKa of ethanoic acid: ch20 uses the measured 4.76; ch14 and ch15 use Ka = 1.8 × 10⁻⁵ (pKa 4.74), each as its stems state. Both are standard textbook values.
- ch19 takes about 40 K as the boiling-point gap for a clean simple distillation (textbooks quote 25–40 K); internally consistent with its hexane/heptane (30 K, fractional) items.

## Decisions made
None new. D-025, D-026, D-036, D-050 followed.

## Needs from owner
None.
