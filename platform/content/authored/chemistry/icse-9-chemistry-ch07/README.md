# ICSE Class 9 Chemistry, Chapter 7 — Atomic Structure

`icse-9-chemistry-ch07` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 16 slides), notes (5 sections), 30 flashcards, 82 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse9chem_ch07_short` (20 marks, 30 min) and `t_icse9chem_ch07_long` (40 marks, 60 min), laid out as `icse-9-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (the first 20 elements, shell-filling configurations, valencies, counts of protons, neutrons and electrons for atoms and ions, isotope data and the chlorine average), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`, and the shared authoring library `lib.mjs` of chapter 1 (not edited). Rebuild from `platform/`: `npx tsx content/authored/chemistry/icse-9-chemistry-ch07/src/build.mjs` (deterministic). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ICSE 2028 Class IX syllabus topics of the chapter: protons, neutrons and electrons with atomic number and mass number; Rutherford's gold foil experiment with its conclusions, merit and limitation; Bohr's model in simplified form; the 2n squared rule, the octet and duplet and the configurations of the first 20 elements with chemical activity; the isotopes of hydrogen, carbon and chlorine.
- Removed topic honoured: the mathematical expressions of Bohr's model are not taught or asked; the notes say so in one sentence. Shells only, no orbitals or quantum numbers.
- Class 9 has no board examination; the items follow the ICSE 2027 Chemistry specimen style (522): short stems, particle counts with working, configurations, identification, assertion-reason items in the specimen option order and 10-mark structured questions in parts.
- **Originality:** the data (phosphorus, calcium, sulphide, fluorine, magnesium, oxide ions; an imagined 20 000 alpha-particle run; chlorine in a sample of 400 atoms; tritium and carbon-14) differ from CBSE 11 Chemistry ch02 (structure of the atom) and from the ICSE 10 periodic-properties bank. Exact-stem and originality checks report no duplicates.

## Shape
- **Decks:** Part 1 (15 slides): Inside the atom; The three particles; Atomic number and mass number; Worked example 1: a phosphorus atom; Quick check: counting particles; Worked example 2: counting in an ion; Rutherford's gold foil experiment; What he saw and what it showed; Quick check: the gold foil; A limitation of Rutherford's model; Bohr's model of the atom; Postulates of the simplified Bohr model; Quick check: Bohr's idea; Summary: Part 1; Exam tips: Part 1. Part 2 (16 slides): Filling the shells; The two n squared rule; Elements 1 to 10; Elements 11 to 20; Shell diagrams; Worked example 1: a sulphur atom; Quick check: configuration; Duplet, octet and chemical activity; Worked example 2: reactive or inert?; Quick check: reactivity; Isotopes of hydrogen; Isotopes of carbon and chlorine; Worked example 3: why chlorine is 35.5; Quick check: isotopes; Summary: Part 2; Exam tips: Part 2.
- **Visuals (31 of 31 slides):** flow 3, table 24, svg 4.
- **Diagrams (6 distinct SVGs):** Rutherford's scattering (named, and lettered A to E for a structured question); the Bohr model of sodium (named, and lettered A to E); a row of Bohr shell diagrams (Li, O, Ne, Mg, K); the isotopes of hydrogen. All drawn with the S helpers and palette colours, rendered to PNG and checked by eye.
- **Narration:** 10–48 words per slide (mean 34); no symbols, formulae or unit abbreviations.

## Question bank (82 items, 164 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 30 (6 are deck-check items) | 30 |
| assertion-reason | 5 | 5 |
| short-1 (terms, names, equations) | 6 | 6 |
| true-false | 4 | 4 |
| fill-blank | 4 | 4 |
| numerical | 9 | 9 |
| match-5 | 1 | 5 |
| short-2 | 10 | 20 |
| short-3 | 7 | 21 |
| long-10 | 6 | 60 |

- **Structured questions:** 6, each 10 marks in parts with part marks in the stem; two use a lettered diagram (the gold foil apparatus and a Bohr atom).
- **Difficulty:** d1 25 · d2 37 · d3 19 · d4 1.
- **Competency:** recall 16 · understanding 16 · application 39 · analysis 11. Application or higher is **61% of items**, inside the 45–65% lint band.
- **Assertion-reason keys:** a c b c d.

## Chapter tests (ICSE 9 default blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 1 short-2, 1 short-3 · B: 2 structured (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 7 mcq, 1 assertion-reason, 3 short-2, 2 short-3 · B: 3 structured (10) (attempt 2 of 3).

## Verifier pass
- Every question was re-solved from its stem; every particle count, configuration and isotope average is computed and asserted in `calc.mjs`.
- Structured-question schemes sum to 10 and part marks are shown in each stem. Test items were chosen so that no item gives away another in the same test (for example the short test has no isotope or Rutherford item outside its structured questions, and the long test has no configuration item that answers its structured questions).
- The 20 000-particle run, the 3 : 1 chlorine ratio and the 400-atom sample are imagined or rounded data and are labelled as such in the stems.

## For a reviewer
- **Rutherford:** most alpha particles passed straight through, a few were deflected by small angles, very few rebounded. The notes quote "about one in twenty thousand" for the rebounds as the usual account; books give figures from one in 8 000 to one in 20 000. The imagined run in the numerical (19 980 straight, 19 deflected, 1 rebound out of 20 000) is illustrative only.
- **Limitation of Rutherford's model:** a revolving charged electron should radiate energy and spiral into the nucleus; also no account of the arrangement of electrons. Merits: the nucleus and the empty space.
- **Bohr (simplified):** fixed orbits (K, L, M, N), fixed energy, no radiation in an orbit, jumps absorb or emit energy; no mathematical expressions.
- **Mass of the electron:** "about 1/1840 of a proton"; some books use 1/1836 or 1/2000. Relative mass of proton and neutron taken as 1.
- **Configurations** follow the ICSE first-20 rule (2, 8, 8, 2): potassium 2, 8, 8, 1 and calcium 2, 8, 8, 2.
- **Isotopes:** protium, deuterium and tritium; carbon-12, -13, -14; chlorine-35 and -37 in the ratio about 3 : 1 (books also say about 75 percent and 25 percent), average 35.5.
- **Discoverers** named in the notes only: Thomson (electron), Goldstein (proton), Chadwick (neutron).
