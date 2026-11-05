# ICSE Class 9 Biology, Chapter 10 — Teeth and the Digestive System

`icse-9-biology-ch10` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 17 slides), notes (4 sections), 30 flashcards, 80 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse9bio_ch10_short` (20 marks, 30 min) and `t_icse9bio_ch10_long` (40 marks, 60 min), laid out as `icse-9-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (computed and asserted values), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is the shared `../../icse-9-biology-ch01/src/lib.mjs` (not edited). Rebuild from `platform/`: `npx tsx content/authored/biology/icse-9-biology-ch10/src/build.mjs` (deterministic). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All four ICSE 2028 Class IX syllabus topics: structure of a tooth, types of teeth and the adult dental formula; organs of the alimentary canal and the digestive glands; digestive enzymes and their action in the mouth, stomach and small intestine (with the tabulation of enzyme, substrate and end product); absorption and assimilation, including the adaptations of villi.
- No removed topics for this chapter.
- Class 9 has no board examination; the items follow the ICSE 2027 Biology specimen style (523): biological terms, odd one out with its category, give-reason items, differences, labelled diagrams, a lettered-diagram match or fill-in, assertion-reason items in the specimen option order, and 10-mark structured questions in parts.
- **Originality:** the situations (a sweets-and-cold-drinks warning from a dentist, teeth lost in an accident, saliva and starch in four tubes at different temperatures, patches of villi with counts and areas, a meal of rice, dal and butter, a man whose gall bladder was removed) are written by SOYL and differ from CBSE 11 ch17 and ch20, ISC 11 ch19 and CBSE 10 Science. Exact-stem and originality checks report no duplicates.

## Shape
- **Decks:** Part 1 (15 slides): Teeth and the Digestive System; Structure of a tooth; Parts of a tooth and what they do; Four types of teeth; Quick check: the tearing tooth; The dental formula of an adult; Worked example 1: counting all the teeth; The human digestive system; Organs of the alimentary canal; Quick check: not part of the canal; The digestive glands; Worked example 2: teeth lost in an accident; Quick check: bile; Summary; Exam tips. Part 2 (17 slides): Enzymes, Absorption and Assimilation; In the mouth; In the stomach; Quick check: the protein enzyme of the stomach; In the small intestine; The master table of digestion; Worked example 1: following starch through the canal; Worked example 2: reading an enzyme experiment; Quick check: end products of fat digestion; A villus of the small intestine; Worked example 3: what villi add to the surface; How villi are adapted for absorption; Quick check: the lacteal; Absorption and assimilation; Quick check: storing glucose; Summary; Exam tips.
- **Visuals (23 of 32 slides):** flow 4, table 16, svg 3.
- **Diagrams (6 distinct SVGs):** a tooth in section (named, and lettered A-E); the human digestive system (named, and lettered A-E); a villus of the small intestine (named, and lettered A-E). All drawn with the S helpers and palette colours, rendered to PNG and checked by eye (leaders and labels were moved off the rectum, the gum and the neighbouring villi).
- **Narration:** 5–48 words per slide (mean 34); no symbols or abbreviations.

## Question bank (80 items, 169 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 28 | 28 |
| assertion-reason | 5 | 5 |
| short-1 (terms, odd one out, give reason) | 8 | 8 |
| true-false | 6 | 6 |
| fill-blank-5 | 1 | 5 |
| numerical | 6 | 6 |
| match-5 | 1 | 5 |
| short-2 | 11 | 22 |
| short-3 | 8 | 24 |
| long-10 (structured) | 6 | 60 |

- **MCQ deck-check items:** 7 of the mcq items; none is used in a test.
- **Structured questions:** 6, each 10 marks in 4 parts with the part marks in the stem; each has a labelled-diagram part (the alimentary canal, the teeth of a half jaw, a test-tube set-up, a villus, a tooth in section, a villus again); the diagram part draws something that the other parts do not name.
- **Difficulty:** d1 23 · d2 43 · d3 13 · d4 1.
- **Competency:** recall 23 · understanding 18 · application 29 · analysis 9 · evaluation 1. Application or higher is **49% of items**, inside the 45–65% lint band.
- **Assertion-reason keys:** a b c a d.

## Chapter tests (ICSE 9 default blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 1 short-2, 1 short-3 · B: 2 structured (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 7 mcq, 1 assertion-reason, 3 short-2, 2 short-3 · B: 3 structured (10) (attempt 2 of 3).

## Verifier pass
- Every question was re-solved from its stem; computed values are asserted in `calc.mjs`.
- Structured-question schemes sum to 10 and part marks are shown in each stem; test items were chosen so that no item names the answer of another item in the same test (the structured questions of one test sit on topics that its objective items do not state).
- Six short answers that fell below their word limits were lengthened.

## For a reviewer
- **Dental formula:** the adult formula is written for one half of each jaw as 2, 1, 2, 3 (incisors, canines, premolars, molars) above and below, giving 32 teeth. Milk teeth are not taught here because the syllabus names the adult formula only.
- **Enzymes:** the list follows the common ICSE textbooks: salivary amylase (starch to maltose), pepsin (protein to peptones), rennin (infants, milk), pancreatic amylase, trypsin, lipase, and the intestinal enzymes maltase, sucrase, lactase and erepsin. Some books use "peptidases" for erepsin, name the intestinal juice "succus entericus", or give extra enzymes such as gastric lipase; these are not taught.
- **Bile** is described as containing no enzyme and as emulsifying fats and making the food alkaline; it is made by the liver and stored in the gall bladder.
- **Absorption routes:** glucose and amino acids into the capillaries and the hepatic portal vein to the liver; fatty acids and glycerol into the lacteal (lymph). Some books mention that part of the fat is absorbed after resynthesis in the epithelial cells; this is left out at Class 9 level.
- **Intestine lengths** (about 6 m and about 1.5 m) are approximate and vary in books (the small intestine is quoted as 6 to 7 m).
- All times, temperatures, villi densities, areas and counts are imagined and illustrative; the drawings are schematic (the digestive system is drawn as a simple front view, not to scale).
