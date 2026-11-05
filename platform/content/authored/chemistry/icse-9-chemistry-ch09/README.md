# ICSE Class 9 Chemistry, Chapter 9 — The Periodic Table

`icse-9-chemistry-ch09` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 17 slides), notes (5 sections), 30 flashcards, 88 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse9chem_ch09_short` (20 marks, 30 min) and `t_icse9chem_ch09_long` (40 marks, 60 min), laid out as `icse-9-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (Dobereiner mean masses, Newlands' octave counting, Mendeleev's out-of-order pairs, period lengths, group and period from configuration, and the trend data), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`, and the shared authoring library `lib.mjs` of chapter 1 (not edited). Rebuild from `platform/`: `npx tsx content/authored/chemistry/icse-9-chemistry-ch09/src/build.mjs` (deterministic). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ICSE 2028 Class IX syllabus topics of the chapter: Dobereiner's triads (with computed mean masses) and Newlands' law of octaves with a limitation; Mendeleev's periodic law with merits and limitations; atomic number and the modern periodic law; the modern table (18 groups, 7 periods, transition and inner transition elements, position from electronic configuration); and groups 1, 2, 17 and 18 related to valence electrons.
- No removed topics. Periodic properties (atomic size, ionisation energy, electronegativity trends) belong to Class 10 and are not asked; the group trends are limited to reactivity, melting and boiling point and state.
- Class 9 has no board examination; the items follow the ICSE 2027 Chemistry specimen style (522): calculations with working, positions from configuration, identification, assertion-reason items in the specimen option order and 10-mark structured questions in parts.
- **Originality:** the triads (Be, Mg, Ca; S, Se, Te; Cl, Br, I), the Newlands counts, the tellurium and iodine anomaly, the elements of atomic numbers 3, 11, 16 and 18 and the lettered outline of the whole table differ from the ICSE 10 periodic-properties bank and from CBSE 11 Chemistry ch03. Exact-stem and originality checks report no duplicates.

## Shape
- **Decks:** Part 1 (17 slides): Sorting the elements; Dobereiner's triads; Two triads in numbers; Worked example 1: is it a triad?; Quick check: a triad; Newlands' law of octaves; Newlands' arrangement; Limitations of Newlands' law; Quick check: Newlands' count; Mendeleev's periodic law; Merits and limitations; Worked example 2: an element out of order; Quick check: Mendeleev's gaps; Atomic number and the modern periodic law; Quick check: the modern law; Summary: Part 1; Exam tips: Part 1. Part 2 (17 slides): The modern table; The table in outline; Periods and groups; Finding the period and the group; Worked example 1: locating an element; Quick check: period and group; Transition and inner transition elements; Quick check: where are they?; Group 1: the alkali metals; A trend in group 1; Group 2: the alkaline earth metals; Worked example 2: from configuration to properties; Group 17: the halogens; Group 18: the noble gases; Quick check: a halogen; Summary: Part 2; Exam tips: Part 2.
- **Visuals (34 of 34 slides):** flow 2, table 28, svg 4.
- **Diagrams (5 distinct SVGs):** Dobereiner's triads (lithium, sodium, potassium and chlorine, bromine, iodine); Newlands' arrangement in rows of seven; the modern table in outline with the first 20 elements (named, and lettered A to E for a structured question); a bar chart of the melting points of the alkali metals. All drawn with the S helpers and palette colours, rendered to PNG and checked by eye.
- **Narration:** 11–46 words per slide (mean 32); no symbols, formulae or unit abbreviations.

## Question bank (88 items, 168 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 35 (7 are deck-check items) | 35 |
| assertion-reason | 4 | 4 |
| short-1 (terms, names, equations) | 7 | 7 |
| true-false | 5 | 5 |
| fill-blank | 5 | 5 |
| numerical | 8 | 8 |
| match-5 | 1 | 5 |
| short-2 | 12 | 24 |
| short-3 | 5 | 15 |
| long-10 | 6 | 60 |

- **Structured questions:** 6, each 10 marks in parts with part marks in the stem; one uses a lettered outline of the periodic table.
- **Difficulty:** d1 34 · d2 42 · d3 11 · d4 1.
- **Competency:** recall 31 · understanding 13 · application 36 · analysis 8. Application or higher is **50% of items**, inside the 45–65% lint band.
- **Assertion-reason keys:** c d b a.

## Chapter tests (ICSE 9 default blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 1 short-2, 1 short-3 · B: 2 structured (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 7 mcq, 1 assertion-reason, 3 short-2, 2 short-3 · B: 3 structured (10) (attempt 2 of 3).

## Verifier pass
- Every question was re-solved from its stem; every mean mass, octave count, period length, position and trend difference is computed and asserted in `calc.mjs`.
- Structured-question schemes sum to 10 and part marks are shown in each stem. Test items were chosen so that no item gives away another in the same test (for example the long test has no triad, position or valence-electron item outside its three structured questions).

## For a reviewer
- **Triads:** Li, Na, K (7, 23, 39: mean 23); Ca, Sr, Ba (40, 88, 137: mean 88.5); Cl, Br, I (35.5, 80, 127: mean 81.25); S, Se, Te (32, 79, 128: mean 80; books also use 127.6 for tellurium); Be, Mg, Ca (9, 24, 40: mean 24.5). Carbon, nitrogen and oxygen (12, 14, 16) are used as a numeric fit that is rejected for unlike properties.
- **Newlands:** order H, Li, Be, B, C, N, O, F, Na, Mg, Al, Si, P, S, Cl, K, Ca; the eighth element from lithium is sodium, from sodium potassium, from fluorine chlorine, from beryllium magnesium. Limitation: valid only up to calcium; unlike elements together; no place for noble gases.
- **Mendeleev:** eka-aluminium is gallium and eka-silicon is germanium; the out-of-order pairs quoted are tellurium 127.6 and iodine 126.9, argon 39.9 and potassium 39.1, cobalt 58.9 and nickel 58.7 (atomic masses rounded; books differ slightly). The mention that eka-aluminium is "next below" aluminium is a simplification.
- **Period lengths:** 2, 8, 8, 18, 18, 32, 32 (118 elements; period 7 is completed by recently made elements). Inner transition elements: 14 in each of two rows (books differ on whether lanthanum and actinium are counted in the rows).
- **Groups:** group = outer electrons for groups 1 and 2, and 10 + outer electrons for groups 13 to 18 (helium in group 18); hydrogen is drawn in group 1 in the outline.
- **Trend data (approximate, in degrees Celsius):** melting points of Li 181, Na 98, K 63, Rb 39, Cs 28; boiling points of F2 minus 188, Cl2 minus 34, Br2 59, I2 184 and of the noble gases He minus 269 to Xe minus 108; states at room temperature F2 and Cl2 gases, Br2 liquid, I2 solid; colours as in most books (fluorine pale yellow, chlorine greenish yellow, bromine reddish brown, iodine dark grey with violet vapour). Please confirm.
- **Uses of noble gases:** helium for balloons, neon for signs, argon for electric bulbs.
