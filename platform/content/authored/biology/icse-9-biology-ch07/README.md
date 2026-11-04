# ICSE Class 9 Biology, Chapter 7 — Diversity in the Animal Kingdom

`icse-9-biology-ch07` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 15 slides), notes (6 sections), 30 flashcards, 74 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse9bio_ch07_short` (20 marks, 30 min) and `t_icse9bio_ch07_long` (40 marks, 60 min), laid out as `icse-9-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (computed and asserted values), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is the shared `../../icse-9-biology-ch01/src/lib.mjs` (not edited). Rebuild from `platform/`: `npx tsx content/authored/biology/icse-9-biology-ch07/src/build.mjs` (deterministic). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All six ICSE 2028 Class IX syllabus topics: the basis of grouping (chordates and non-chordates); Porifera and Coelenterata; Platyhelminthes, Nemathelminthes and Annelida (with body cavity); Arthropoda, Mollusca and Echinodermata; Pisces and Amphibia; Reptilia, Aves and Mammalia. No removed topics for this chapter.
- Class 9 has no board examination; the items follow the ICSE 2027 Biology specimen style (523): biological terms, odd one out with its category, give-reason items, differences, labelled diagrams, a 5-blank fill-in, a lettered-diagram match, assertion-reason items in the specimen option order, and 10-mark structured questions in parts.
- **Originality:** the situations (legs counted in jars and trays, a pond-and-shore tally, a museum shelf of vertebrates, lost museum label cards, three worms cut across, heart-chamber clues, a rock-pool find) are written by SOYL and differ from CBSE 11 ch04, ISC 11 ch05 and CBSE 10 Science. Exact-stem and originality checks report no duplicates. The level is Class 9: no symmetry, germ layers or levels of organisation.

## Shape
- **Decks:** Part 1 (18 slides): Sorting the Animal Kingdom; Two big groups; Chordates and non-chordates; Quick check; Sponges and Hydra; Porifera and Coelenterata; Quick check; Three kinds of body cavity; The three worm phyla; Quick check; Arthropoda: jointed legs; Molluscs and echinoderms; Arthropoda, Mollusca, Echinodermata; Worked example 1 (counting legs); Quick check; Worked example 2 (a survey tally); Summary; Exam tips. Part 2 (15 slides): The Chordates; What makes a chordate; Pisces and Amphibia; Quick check; Reptilia, Aves and Mammalia; Heart chambers; Quick check; Worked example 1 (which class?); Comparing the five classes; Quick check; Worked example 2 (a museum shelf); A key to the classes; Quick check; Summary; Exam tips.
- **Visuals (23 of 33 slides):** flow 3, svg 6, table 14.
- **Diagrams (7 distinct SVGs):** the animal kingdom in two groups; three kinds of body cavity (cross-sections); a sponge and a Hydra with a cnidoblast; an insect (named, and lettered A–E for two figure questions and a match); heart chambers in the five classes; a starfish and a snail. All drawn with the S helpers and palette colours, rendered and checked by eye (the thorax and arm leaders were moved after rendering).
- **Narration:** 4–43 words per slide (mean 28); no symbols or abbreviations.

## Question bank (74 items, 168 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 27 | 27 (8 are deck-check items) |
| assertion-reason | 6 | 6 (keys c c a a b d) |
| short-1 (terms, odd one out, give reason) | 9 | 9 |
| true-false | 4 | 4 |
| fill-blank-1 | 1 | 1 |
| fill-blank-5 | 1 | 5 |
| numerical | 2 | 2 |
| match-5 | 1 | 5 |
| short-2 | 9 | 18 |
| short-3 | 7 | 21 |
| long-10 (structured) | 7 | 70 |

- **Structured questions:** 7, each 10 marks in 4 or 5 parts with the part marks in the stem; each has a labelled-diagram part.
- **Difficulty:** d1 22 · d2 37 · d3 14 · d4 1.
- **Competency:** recall 20 · understanding 11 · application 30 · analysis 13. Application or higher is **58% of items**, inside the 45–65% lint band.

## Chapter tests (ICSE 9 default blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 1 short-2, 1 short-3 · B: 2 structured (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 7 mcq, 1 assertion-reason, 3 short-2, 2 short-3 · B: 3 structured (10) (attempt 2 of 3).

## Verifier pass
- Every question was re-solved from its stem; the numerical items (legs, survey percentages, the shelf, heart chambers) are computed and asserted in `calc.mjs`.
- Structured-question schemes sum to 10 and part marks are shown in each stem. Tests were assembled topic by topic so that no item names the answer of another in the same test; three extra items were added to make this possible.

## For a reviewer
- Level is the ICSE Class 9 textbook level: eight non-chordate phyla and five chordate classes, with body cavity (none, false, true) but no germ layers or symmetry.
- Chordate features are given as notochord, dorsal hollow nerve cord and pharyngeal gill slits; the non-chordate contrast (solid ventral nerve cord, heart on the back side) follows common ICSE books.
- Reptiles are given a three-chambered heart; the crocodile (four) is mentioned only as an exception in the notes. Mammals are "mostly" viviparous (the egg-laying platypus is not taught).
- Octopus and cuttlefish are placed in Mollusca although they have no external shell; spiders are arthropods but not insects.
- Leg counts, survey tallies and the museum shelf are illustrative numbers, not real data.
