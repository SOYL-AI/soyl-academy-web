# ICSE Class 9 Chemistry, Chapter 3 — Chemical Changes and Reactions

`icse-9-chemistry-ch03` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 17 slides), notes (5 sections), 30 flashcards, 80 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse9chem_ch03_short` (20 marks, 30 min) and `t_icse9chem_ch03_long` (40 marks, 60 min), laid out as `icse-9-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (every equation atom-balanced, the activity series, temperature and volume data), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`, and the shared authoring library `lib.mjs` of chapter 1 (not edited). Rebuild from `platform/`: `npx tsx content/authored/chemistry/icse-9-chemistry-ch03/src/build.mjs` (deterministic). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ICSE 2028 Class IX syllabus topics of the chapter: direct combination; decomposition by heat, light and electricity; displacement and the role of reactivity; double decomposition with the three prescribed reactions (sodium sulphate with barium chloride, silver nitrate with sodium chloride, lead nitrate with potassium iodide) and their precipitate colours; and exothermic and endothermic reactions involving heat, light and electricity.
- No removed topics for this chapter. Reactions of metals with water and acids belong to the hydrogen chapters and are not asked here; ionic equations and solubility rules are not used.
- Class 9 has no board examination; the items follow the ICSE 2027 Chemistry specimen style (522): balanced equations, "state one observation", identification from observations, colours of precipitates, predictions from the activity series, assertion-reason items in the specimen option order, and 10-mark structured questions in parts.
- **Originality:** the set-ups (zinc carbonate and zinc nitrate residues, silver bromide, molten lead bromide, iron nail and zinc strip in three sulphate solutions, copper bowl with silver nitrate, baking soda with citric acid, quicklime in a polystyrene cup, lettered tubes of precipitates) differ from CBSE 10 Science ch01 (chemical reactions) and ICSE 10 ch03 (acids, bases and salts). Exact-stem and originality checks report no duplicates.

## Shape
- **Decks:** Part 1 (15 slides): Joining and splitting; Direct combination; Equations for direct combination; Compounds can combine too; Quick check: direct combination; Decomposition; Decomposition by heat; Worked example 1: heating copper carbonate; Decomposition by light; Decomposition by electricity; Quick check: electrolysis; Worked example 2: heating zinc nitrate; Quick check: heat decomposition; Summary; Exam tips. Part 2 (17 slides): Swapping partners; The activity series; Worked example 1: zinc in copper sulphate; Will it react?; Quick check: displacement; Worked example 2: copper wire in silver nitrate; Double displacement and precipitates; The three prescribed reactions; Three precipitates side by side; Quick check: precipitate colours; Worked example 3: silver nitrate and sodium chloride; Quick check: balancing a double displacement; Energy changes; Worked example 4: classify from temperature data; Quick check: energy; Summary; Exam tips.
- **Visuals (32 of 32 slides):** flow 4, table 15, chem 10, svg 3.
- **Diagrams (5 distinct SVGs):** electrolysis of acidified water (named, and lettered A to E for a structured question); the activity series; three precipitates in test tubes (named, and lettered A to C for a structured question). All drawn with the S helpers and palette colours, rendered to PNG and checked by eye.
- **Narration:** 12–48 words per slide (mean 33); no symbols, formulae or unit abbreviations.

## Question bank (80 items, 158 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 32 (7 are deck-check items) | 32 |
| assertion-reason | 4 | 4 |
| short-1 (equations, colours, observations, names) | 10 | 10 |
| true-false | 5 | 5 |
| fill-blank | 5 | 5 |
| numerical | 2 | 2 |
| match-5 | 1 | 5 |
| short-2 | 10 | 20 |
| short-3 | 5 | 15 |
| long-10 (structured) | 6 | 60 |

- **Structured questions:** 6, each 10 marks in 4 or 5 parts with part marks in the stem; two use a lettered diagram (electrolysis apparatus, three precipitates).
- **Difficulty:** d1 25 · d2 39 · d3 15 · d4 1.
- **Competency:** recall 22 · understanding 13 · application 35 · analysis 10. Application or higher is **56% of items**, inside the 45–65% lint band.
- **Assertion-reason keys:** c a b d.

## Chapter tests (ICSE 9 default blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 1 short-2, 1 short-3 · B: 2 structured (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 7 mcq, 1 assertion-reason, 3 short-2, 2 short-3 · B: 3 structured (10) (attempt 2 of 3).

## Verifier pass
- Every question was re-solved from its stem; every equation is atom-checked in `calc.mjs`, each displacement prediction is made from the activity series there, and the temperature and volume values are computed there.
- Structured-question schemes sum to 10 and part marks are shown in each stem; test items were chosen so that no item names the answer of another in the same test (for example the precipitate equations are asked in the short test's structured question only, and the long test has only multiple-choice items on double decomposition, with no structured question on it).

## For a reviewer
- **Observations and colours:** iron with sulphur glows red and gives a black solid that a magnet does not attract; magnesium burns with a dazzling white flame leaving white ash; copper(II) carbonate turns green to black; zinc carbonate and zinc nitrate leave zinc oxide that is yellow when hot and white when cold; lead(II) nitrate crackles, gives brown fumes and leaves a yellow residue; silver chloride turns grey in light; the displaced copper is reddish brown and silver forms grey crystals; barium sulphate is white, silver chloride white and curdy, lead iodide yellow (some books say bright yellow). Please confirm the ICSE textbook wording for residues and the lead(II) oxide colour.
- **Electrolysis:** hydrogen is at the cathode and oxygen at the anode, volume ratio 2 : 1, acid added to make the water conduct; molten lead(II) bromide gives lead and reddish-brown bromine (a Class IX extension, taught only as an example of electrolytic decomposition).
- **Activity series:** K, Na, Ca, Mg, Al, Zn, Fe, Pb, (H), Cu, Hg, Ag, Au, with hydrogen as a reference; displacement is taught for metals in salt solutions only, and a note says very reactive metals react with water first.
- **Energy:** quicklime with water, burning, neutralisation and respiration are exothermic; heating calcium carbonate, photosynthesis, electrolysis and nitrogen with oxygen at a very high temperature are endothermic; a dry cell (and a zinc and copper cell) evolves electricity; burning magnesium evolves light. The three temperature readings (28 to 55, 27 to 33, 28 to 22 degrees Celsius) are imagined and illustrative; baking soda with citric acid is a common school endothermic reaction.
- Ammonium chloride on heating is mentioned in the notes as a reversible change (it breaks down and re-forms on the cool part of the tube); mercury(II) oxide is named but not demonstrated because mercury is toxic.
- The reaction of sodium with water that makes a displacement from a salt solution unsuitable is described only in words.
