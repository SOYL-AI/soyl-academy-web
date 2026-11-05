# ICSE Class 9 Chemistry, Chapter 11 — Oxidation and Reduction

`icse-9-chemistry-ch11` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 14 slides), notes (3 sections), 30 flashcards, 74 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse9chem_ch11_short` (20 marks, 30 min) and `t_icse9chem_ch11_long` (40 marks, 60 min), laid out as `icse-9-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (every equation atom-balanced, every half-change balanced for atoms and charge, half-changes combined by computation, every electron count), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`, and the shared authoring library `lib.mjs` of chapter 1 (not edited). Rebuild from `platform/`: `npx tsx content/authored/chemistry/icse-9-chemistry-ch11/src/build.mjs` (deterministic). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All three ICSE 2028 Class IX syllabus topics of the chapter: oxidation and reduction as addition or removal of oxygen or hydrogen; the electronic concept with ionic half-changes written with caret charges (`Cu^2+ + 2e- -> Cu`); and oxidising agents, reducing agents and redox reactions (including reactions that are not redox).
- No removed topics for this chapter. Oxidation numbers, balancing by half-reaction in acid, disproportionation and titrations are not used (Class XI).
- Class 9 has no board examination; the items follow the ICSE 2027 Chemistry specimen style (522): "name the substance oxidised and reduced", half-changes, balanced equations, observations, assertion-reason items in the specimen option order and 10-mark structured questions in parts.
- **Originality:** the situations (lead(II) oxide in hydrogen, magnesium in carbon dioxide and with copper(II) oxide, hydrogen sulphide with chlorine and with oxygen, manganese(IV) oxide with hydrochloric acid, chlorine with iron(II) chloride, aluminium in iron(II) sulphate, lettered sodium–chlorine electron transfer and magnesium ribbon in copper(II) sulphate) differ from CBSE 11 Chemistry (redox), CBSE 10 Science ch01 and ICSE 10 Chemistry ch07 and ch08. Exact-stem and originality checks report no duplicates.

## Shape
- **Decks:** Part 1 (15 slides): Two changes that never travel alone; Oxygen: added or removed; Hydrogen: removed or added; Worked example 1: lead oxide and hydrogen; Quick check: oxygen transfer; A single reaction shows both; The electronic concept; Writing half-changes; Worked example 2: balancing a half-change; Quick check: reading a half-change; Joining two half-changes; When the electrons are not equal; Quick check: oxidation or reduction?; Summary; Exam tips. Part 2 (14 slides): Who does the work?; Oxidising agent; Reducing agent; Common agents; Worked example 1: chlorine and hydrogen sulphide; Quick check: agents; Electron view: magnesium in copper sulphate; Quick check: the oxidising agent; Spotting a redox reaction; Worked example 2: chlorine and iron(II) chloride; Quick check: is it redox?; Not every reaction is redox; Summary; Exam tips.
- **Visuals (29 of 29 slides):** table 14, chem 10, flow 3, svg 2.
- **Diagrams (4 distinct SVGs):** an electron passing from a sodium atom (2, 8, 1) to a chlorine atom (2, 8, 7) (named, and lettered A to E); a magnesium ribbon in copper(II) sulphate solution with the two half-changes (named, and lettered A to E). Rendered to PNG and checked by eye.
- **Narration:** 10–51 words per slide (mean 35); no symbols, formulae or unit abbreviations.

## Question bank (74 items, 150 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 30 (6 are deck-check items) | 30 |
| assertion-reason | 4 | 4 |
| short-1 (half-changes, names, equations) | 7 | 7 |
| true-false | 5 | 5 |
| fill-blank | 4 | 5 |
| numerical | 5 | 5 |
| match-5 | 1 | 5 |
| short-2 | 7 | 14 |
| short-3 | 5 | 15 |
| long-10 (structured) | 6 | 60 |

- **Structured questions:** 6, each 10 marks in parts with part marks in the stem; two use a lettered diagram (electron transfer, magnesium ribbon in copper(II) sulphate); one is on lead(II) oxide and hydrogen, one on chlorine and iron(II) chloride, one on hydrogen sulphide, and one combines two half-changes (difficulty 4).
- **Difficulty:** d1 28 · d2 31 · d3 14 · d4 1.
- **Competency:** recall 13 · understanding 14 · application 41 · analysis 6. Application or higher is **64% of items**, inside the 45–65% lint band. The first build was at 69%, so six new recall and understanding items were added (`og-mcq8`, `og-fill`, `og-term3`, `el-mcq8`, `ag-mcq8`, `ag-tf3`); no existing tag was changed.
- **Assertion-reason keys:** c a b d.
- **Numericals** (electron counts, no mole concept): 15 electrons from 5 Al atoms; 12 Cu²⁺ ions reduced by 12 Mg atoms; 24 electrons for 6 O₂ molecules; 6 Fe²⁺ ions reduced by 4 Al atoms; 5 Cl₂ molecules for 10 Fe²⁺ ions. Each is computed in `calc.mjs`.

## Chapter tests (ICSE 9 default blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 1 short-2, 1 short-3 · B: 2 structured (10) (attempt 1 of 2): lead(II) oxide and hydrogen; aluminium in iron(II) sulphate.
- **Long (40 marks, 60 min):** A: 7 mcq, 1 assertion-reason, 3 short-2, 2 short-3 · B: 3 structured (10) (attempt 2 of 3): the lettered electron transfer, the lettered magnesium ribbon and hydrogen sulphide.

## Verifier pass
- Every question was re-solved from its stem; every equation is atom-checked, every half-change atom- and charge-checked, and every combination of half-changes computed in `calc.mjs`.
- Structured-question schemes sum to 10 and part marks are shown in each stem. Test items avoid the topics of the structured questions in the same test (for example the long test has no item on sodium and chlorine, magnesium and copper(II) sulphate, or hydrogen sulphide with chlorine).

## For a reviewer
- **Oxygen and hydrogen concept:** in `2Mg + O₂ → 2MgO` and `2CO + O₂ → 2CO₂` only the oxidation is described in these terms; oxygen is called reduced only in the electronic concept (notes section 2). In `2H₂S + O₂ → 2S + 2H₂O` oxygen is called reduced because it gains hydrogen. Please confirm this suits the CISCE treatment.
- **Observations:** yellow lead(II) oxide turns grey with drops of water in hydrogen; magnesium takes oxygen from black copper(II) oxide to give reddish-brown copper; chlorine turns pale green iron(II) chloride solution yellow and colourless potassium iodide solution brown; chlorine with hydrogen sulphide gives yellow sulphur; the blue copper(II) sulphate solution fades and a reddish-brown deposit forms on magnesium ribbon. Please confirm the colours as ICSE books give them.
- **Agents:** the acid is named the oxidising agent in zinc with dilute sulphuric acid (its hydrogen ions gain electrons), an analysis-level item (`ag-mcq2`); the list of common agents includes hydrogen peroxide, potassium permanganate and potassium dichromate by name only (no equations or colour changes).
- **Half-changes:** ions use caret charges; `Cl + e⁻ → Cl⁻` (atom) is used with the electron-transfer diagram, and `Cl₂ + 2e⁻ → 2Cl⁻` elsewhere.
- **Practical point:** passing hydrogen before heating (to expel air) is asked in `pbo-long`; the hydrogen-in-air explosion links to chapter 10.
