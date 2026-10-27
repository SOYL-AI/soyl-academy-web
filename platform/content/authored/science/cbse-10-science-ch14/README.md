# CBSE Class 10 Science, Chapter 14 — Periodic Classification of Elements (formative assessment only)

`cbse-10-science-ch14` · release v1 · academic year 2026-27 · family `science` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (19 + 21 slides), notes (7 sections), 31 flashcards, 64 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse10sci_ch14_short` (20 marks, 40 min) and `t_cbse10sci_ch14_long` (40 marks, 90 min), laid out as the default blueprints `cbse-10-default-chapter-test-short` / `-long`. No shared questions. |
| `src/svgs.mjs` | Five SVGs. The two periodic-table layouts are **computed** from (period, group) positions; the file also holds an independent shell-filling engine (`shellsOf`, `positionOf`, `valencyOf` for Z 1–20) used by the re-solve checks. |
| `src/` (others) | `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; shared library `../cbse-10-science-ch06/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/science/cbse-10-science-ch14/src/build.mjs`. |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- The whole chapter is `board_assessed: false` in the 2026-27 syllabus: it is taught and assessed only through internal assessment (activities, projects, portfolio), never in the board theory paper. The Part 1 title slide and the first notes section say so. The chapter tests use the default chapter-test blueprints so students can practise; they are not board-pattern papers.
- All three syllabus topics: t01 Döbereiner’s triads and Newlands’ octaves; t02 Mendeléev’s table (basis, achievements, limitations); t03 the modern periodic table (modern periodic law, position from electronic configuration, trends in valency, atomic size and metallic/non-metallic character).
- **Current science:** IUPAC group numbering 1–18 throughout (Mendeléev’s own Roman-numeral groups only when describing his table); 118 known elements; metalloids as in the CBSE/NCERT list (B, Si, Ge, As, Sb, Te, Po). In the layout diagram, astatine and the period 7 p-block elements are left unshaded as "little known" instead of being forced into a category.
- Electronic configurations are limited to Z ≤ 20 (2, 8, 8, 2 filling), as the syllabus expects. The rule "group = 10 + valence electrons" is stated only for groups 13–18 among these elements.
- Since the chapter is formative, the bank leans toward understanding and classroom activity/practical items: an element-card activity, a Newlands rows-of-seven activity, a litmus test of oxides, a triad data project and an atomic-radius data table.

## Shape
- **Part 1 (t01–t02), 19 slides:** why classify; Döbereiner’s triads (table of three triads with modern masses); worked example (Ca–Sr–Ba mean 88.7 vs 87.6); limits of triads; Newlands’ octaves (sa re ga ma pa dha ni table, light elements only); every eighth element; limitations; Mendeléev’s basis (oxide and hydride formula table); worked example (hydride XH₃, not group III → group V, oxide X₂O₅); gaps and eka-elements (predicted vs found gallium table); noble gases as a new group; worked example (tellurium before iodine); limitations; summary; exam tips.
- **Part 2 (t03), 21 slides:** Moseley and the modern law; old problems solved (isotopes, Te/I, Co/Ni, Ar/K by atomic number); layout of the table (SVG); first 20 elements (SVG); same group = same valence electrons; periods and 2, 8, 8, 18, 18, 32, 32; worked example (Z = 16 → period 3, group 16); valency across period 3; worked example (Z = 20 and Z = 9 → AB₂); size down group 1 (SVG); size across period 3 (plot of radii); why atoms shrink (Na vs Cl SVG); metallic character (trends SVG); metalloids and oxides; worked example (Z = 11, 13, 19); summary; exam tips.
- Layouts: title 2, concept 16, diagram 6, example 6, check 6, summary 2, exam-tips 2.
- **Visuals (34 of 40 slides; no gap longer than one slide):** table 25, svg 5, flow 3, plot 1. The notes reuse the SVGs and add a hydrogen table and the radius plot.
- **Diagrams (5 hand-written SVGs):** the 18 × 7 layout with lanthanoid/actinoid rows and metal/metalloid/non-metal shading; the first 20 elements with atomic numbers; trend arrows across a period and down a group; Li/Na/K shell diagrams; Na vs Cl shell diagrams with nuclear charges. Rasterised (resvg) and eye-checked; fixes: the "Period" label was clipped at the left edge, and the nuclear-charge labels overlapped the inner shell (now inside an enlarged nucleus).
- **Narration:** 10–65 words (mean 49); numbers, years and radii spoken in words; no formulas or symbols.

## Question bank (64)
| Type | Count | Marks |
|---|---|---|
| mcq | 22 | 1 (keys a 6, b 6, c 5, d 5) |
| assertion-reason | 7 | 1 (keys d a b a c c d: a 2, b 1, c 2, d 2) |
| true-false | 4 | 1 |
| fill-blank | 4 | 1 |
| match | 2 | 2 |
| numerical | 4 | 1 (sodium’s mass from the Li/K triad 23.0 u; valency of Ga in Ga₂O₃ = 3; group of 2, 8, 7 = 17; atomic number in period 3, group 14 = 14) |
| short | 6 + 5 | 2 / 3 |
| long | 5 | 5 |
| case-based | 5 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Contract v2:** `passage_origin: "soyl-original"` on every passage; `word_limit` on the 10 prose short/long items, left off configuration/formula answers and multi-heading long answers.
- **Difficulty:** d1 10 · d2 26 · d3 24 · d4 4.
- **Competency:** recall 10 · understanding 24 · application 23 · analysis 7. Application or higher is **47% of items (55% of marks)** — at the lower end of the lint band (45–65%), as intended for a formative chapter.
- **Topic tags:** t01 12 · t02 22 · t03 36.
- **Cases:** a triad data project in Pune (three sets incl. N–P–As, which fails the rule; evaluation alternative); the eka-aluminium prediction against gallium (1.7 u difference; group 13 alternative); an element-card activity in Guwahati (Z 13, 4, 10 and a wrong placement of Z 19 to evaluate); a period 3 / group 1 atomic-radius data table (87 pm fall; francium prediction alternative); a litmus test of the oxides of Z 11, 12 and 16 in Jaipur (phosphorus prediction alternative).
- **Deck checks:** q005, q003, q019 (Part 1); q048, q039, q034 (Part 2) — all objective.

## Chapter tests (default blueprints)
- **Short:** A q028, q014, q033 (MCQ), q020 (A-R) · B q024, q050 (2 marks), q053 (3 marks) · C q056 or q059 · D q063.
- **Long:** A q001, q004, q011, q013, q016, q029, q034, q038 (MCQ), q019, q040 (A-R) · B q009, q051, (q025 or q052), q026, (q054 or q055) · C q058 + (q027 or q057) · D q061, q062.

## Validation
- `npm test -w @soyl/content-templates`: all 7 checks for this chapter pass.
- `npm run content -- lint --exemplars`: **0 errors, 0 warnings**.
- `npm run content -- verify --board cbse --class 10 --authored`: 64/64 pass, 0 flags.
- `npm run content -- originality --authored`: 0 errors for this chapter.
- Author validator: 21 maths strings (KaTeX strict + mhchem) parse; 9 SVG visuals / 5 distinct diagrams pass the allow-list; narration clean; **30/30 scripted re-solves**: every configuration, period, group, valency and formula is recomputed by the independent shell-filling engine (`positionOf`, `valencyOf`, a valency cross-over with common-factor cancelling), every triad mean and the case thresholds are recomputed, Newlands’ columns are recounted from the list, and the radius tables are checked for monotonic trends.

## Verifier pass (2026-10-27)
Every item, case part and alternative was re-solved from its stem; no key was wrong. Fixes during authoring:
1. **Stale ordinal.** The triad-set MCQ solution said "only in the first set" but the seeded key placement put that set at option (c); the solution now names the set by its numbers.
2. **Percentage base.** The gallium case said the 1.7 u difference was "2.5% of the mass" (it is 2.4% of 69.7 u); it now says "about 2.5% of the predicted value" (1.7/68).
3. **Period table.** A "shells being filled" column was wrong from period 4 on (inner shells also fill); it now lists the outermost shell, with a caption on 2n² and longer periods.
4. **Diagram labels** (see Shape).

## Facts a reviewer should confirm
- Historical details stated: Döbereiner’s triads (early 1800s), Newlands 1866, Mendeléev 1869 with 63 elements, eka-aluminium predicted 1871 (about 68 u) and gallium found 1875 (69.7 u), Moseley 1913. Newlands’ placement of cobalt and nickel together in the column of fluorine, chlorine and bromine, with iron elsewhere, follows the usual textbook account of his table; only his first two full rows (H … O, F … S) and the start of the third (Cl, K, Ca) are shown.
- Atomic radii (pm): period 3 Na 186, Mg 160, Al 143, Si 117, P 110, S 104, Cl 99; group 1 Li 152, Na 186, K 231, Rb 244, Cs 262 — typical data-book values, labelled "typical".
- Hydrogen is said to resemble halogens partly because it "forms compounds with metals" (metal hydrides such as NaH).

## Known gaps
- Narration audio is not generated (TTS stage).
- The radius plot has no per-point labels (the plot contract has none for series); the values are in the slide body and the alt text.
- Formative-only status is stated in content; the contract has no field to mark a whole release as formative, so the API serves it like any other chapter.

## Competency audit by assessment-designer (2026-10-27)

Re-read against the rule used for CBSE 10 Maths (D-035 context): a routine, textbook-standard step on given data — a one-step formula numerical, a balanced equation, an electron-dot structure, a named part or a value read off a table — is **understanding**; applying ideas to new situations, interpreting data, explaining observations, analysis and evaluation keep their tags. 8 item tag(s) and 5 case/source-part tag(s) changed to understanding (case items whose parts are now mostly recall/understanding carry `understanding` at the top level). No question text, key, solution or marking scheme changed. Now: recall 10, understanding 32, application 15, analysis 7, evaluation 0 — application or higher 34% of items, 41% of marks (supersedes the competency figures above).
