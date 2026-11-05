# ICSE Class 9 Chemistry, Chapter 1 — Symbols, Valency, Radicals and Formulae

`icse-9-chemistry-ch01` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (18 + 15 slides), notes (5 sections), 30 flashcards, 69 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse9chem_ch01_short` (20 marks, 30 min) and `t_icse9chem_ch01_long` (40 marks, 60 min), laid out as `icse-9-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (computed and asserted values), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`, and the shared authoring library `lib.mjs` (not edited by this chapter). Rebuild from `platform/`: `npx tsx content/authored/chemistry/icse-9-chemistry-ch01/src/build.mjs` (deterministic). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ICSE 2028 Class IX syllabus topics of the chapter: symbols of elements (including Latin-derived symbols; qualitative and quantitative meaning); valency (from hydrides and from valence electrons; mono-, di-, tri- and tetravalent); radicals (simple and compound, acid and basic, with valencies); radicals in the atmosphere (free radicals in polluted air, effects, ways to reduce them); and writing names and formulae by exchanging valencies.
- No removed topics for this chapter. "Radicals in the atmosphere" is taught as reactive free radicals (an unpaired electron) at Class IX level, and the deck and notes say plainly that this differs from the charged radicals of formulae. No reaction mechanisms are taught.
- Class 9 has no board examination; the items follow the ICSE 2027 Chemistry specimen style (522): names, formulae, "give a reason", differences, calculation of valency and atom counts, assertion-reason items in the specimen option order, and 10-mark structured questions in parts.
- **Originality:** the situations (a lead jar label, Pb and Cu symbols, atoms A to D with lettered shells, a school store labelling four salts, a town with a highway, kiln and rubbish dump, a notebook list of formulae) are written by SOYL and differ from ICSE 10 Chemistry ch02 (bonding), ISC 12 and CBSE 10 Science (chemical reactions). Exact-stem checks report no duplicates.

## Shape
- **Decks:** Part 1 (18 slides): The shorthand of chemistry; Symbols; Latin symbols; What a symbol tells us; Quick check: symbols; Valency; Valency from the outer shell; The valence-electron rule; Worked example 1: valency from the electron arrangement; Quick check: valency; Mono-, di-, tri- and tetravalent; Radicals; Common positive radicals; Common negative radicals; Worked example 2: valency of an acid radical; Quick check: radicals; Summary; Exam tips. Part 2 (15 slides): From valency to formula; The criss-cross method; Steps for writing a formula; Worked example 1: aluminium sulphate; Quick check: a formula; Common factor and brackets; Worked example 2: ammonium phosphate; Quick check: another formula; Naming a compound; Worked example 3: name from a formula; Quick check: naming; Radicals in the atmosphere; Harm done and ways to reduce it; Summary; Exam tips.
- **Visuals (33 of 33 slides):** flow 4, table 26, svg 2, chem 1.
- **Diagrams (4 distinct SVGs):** electron shells of Na, Mg, N and Cl with valencies; the criss-cross rule for Al₂(SO₄)₃ and MgCl₂; a lettered version of the shells (unknown atoms A to D) for a structured question; a lettered criss-cross (Ca₃(PO₄)₂, parts A to E) for a structured question. All drawn with the S helpers and palette colours, rendered to PNG and checked by eye.
- **Narration:** 13–53 words per slide (mean 37); no symbols, formulae or unit abbreviations.

## Question bank (69 items, 147 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 28 (6 are deck-check items) | 28 |
| assertion-reason | 4 | 4 |
| short-1 (terms, names, formulae, reasons) | 10 | 10 |
| true-false | 4 | 4 |
| fill-blank | 2 | 2 |
| match-5 | 1 | 5 |
| short-2 | 8 | 16 |
| short-3 | 6 | 18 |
| long-10 (structured) | 6 | 60 |

- **Structured questions:** 6, each 10 marks in 4 parts with part marks in the stem; two use a lettered diagram (atoms A to D; the criss-cross parts A to E).
- **Difficulty:** d1 16 · d2 36 · d3 16 · d4 1.
- **Competency:** recall 16 · understanding 10 · application 31 · analysis 12. Application or higher is **62% of items**, inside the 45–65% lint band.
- **Assertion-reason keys:** a d c b.

## Chapter tests (ICSE 9 default blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 1 short-2, 1 short-3 · B: 2 structured (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 7 mcq, 1 assertion-reason, 3 short-2, 2 short-3 · B: 3 structured (10) (attempt 2 of 3).

## Verifier pass
- Every question was re-solved from its stem; valencies, formulae (by the criss-cross function), atom counts and electron counts are asserted in `calc.mjs`.
- Structured-question schemes sum to 10 and part marks are shown in each stem; test items were chosen so that no item names the answer of another in the same test.

## For a reviewer
- Valency of a non-metal is taught as 8 minus the outer electrons, and carbon and silicon as 4; a full outer shell gives 0. The lettered atoms A to D are invented elements used only for the rule.
- Variable valency is shown by iron(II)/(III) and copper(II) only; the Roman number in names follows ICSE books. Spellings follow ICSE (sulphate, sulphide, sulphite, aluminium).
- Hydroxide is listed among the negative (acid) radicals although it is not the radical of an acid; books vary and a note says so. Ammonium is the only positive compound radical listed.
- "Radicals in the atmosphere" is treated as free radicals with an unpaired electron: effects (irritation of eyes and lungs, cell damage, smog) and reduction measures (catalytic converters, cutting emissions, no open burning, planting trees, avoiding CFCs) are stated at Class IX level and are general rather than quoted from a single textbook. One note mentions a chlorine molecule splitting into atoms in sunlight; no equation is taught.
- The quantitative meaning of a symbol is given as one atom (with its relative atomic mass); some books also say "one gram atom", which this chapter does not use.
