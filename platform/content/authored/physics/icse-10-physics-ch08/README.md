# ICSE Class 10 Physics, Chapter 8 — Current Electricity

`icse-10-physics-ch08` · release v1 · academic year 2026-27 (ICSE 2027 examination) · family `physics` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 15 slides), notes (6 sections), 30 flashcards, 69 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10phy_ch08_short` (20 marks, 30 min) and `t_icse10phy_ch08_long` (40 marks, 60 min), laid out exactly as the subject's own blueprints `icse-10-physics-chapter-test-short` / `-long` (Section A compulsory MCQs, assertion-reason, 1-mark fill-ins, a 2-mark match and 2- and 3-mark short answers; Section B 10-mark structured questions in parts 3 + 3 + 4, any one of two or any two of three). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ICSE 10 Chemistry builder adapted for ICSE Physics ids and blueprints, with the physics number helpers, the pipeline’s verify checks and an answer-leak scan run inside the build; every numerical is computed in code and asserted; SVG geometry is computed in svgs.mjs and self-checked), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/physics/icse-10-physics-ch08/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ICSE 2027 syllabus, Class X section)
- All 4 syllabus topics are covered: t01 Charge, current, potential difference and resistance; Ohm's law V = IR and its verification; t02 Factors affecting resistance; specific resistance (resistivity); superconductors; t03 EMF and internal resistance of a cell; terminal voltage; t04 Resistances in series and parallel: derivations and simple networks.
- Facts a reviewer may wish to double-check: Resistivities: copper 1.7 × 10⁻⁸, aluminium 2.7 × 10⁻⁸, manganin 4.4 × 10⁻⁷, constantan 4.9 × 10⁻⁷, nichrome 1.1 × 10⁻⁶ Ω m; mercury superconducts below about 4.2 K; internal resistance rises with electrode separation and electrolyte concentration and falls with electrode area and temperature.

## Shape
- **Part 1, 15 slides:** charge and electric current; potential difference and resistance; ohm’s law and its verification; the V–I graph: finding R from the slope; worked example (using Ohm’s law); ohmic and non-ohmic conductors; factors affecting resistance; worked example (specific resistance); specific resistance, temperature and superconductors; summary; exam tips; 3 checks.
- **Part 2, 15 slides:** e.m.f. and terminal voltage; internal resistance in a circuit; worked example (finding internal resistance); terminal voltage falls as more current is drawn; resistors in series; resistors in parallel; worked example (series and parallel); a simple network; worked example (currents in a network); summary; exam tips; 3 checks.
- Layouts: title 2 · concept 5 · diagram 8 · example 5 · check 6 · summary 2 · exam-tips 2. Visuals: flow 1 · plot 2 · svg 6 · table 15. Six SVG circuits drawn with a small netlist kit that checks for loose ends, ammeters in series and voltmeters across the right part, and solves each circuit by nodal analysis (Ohm’s-law verification, factors affecting resistance, e.m.f. and internal resistance, series, parallel, series–parallel), plus V–I and terminal-voltage plots. Narration 11–68 words (mean 49), no symbols, formulae or unit abbreviations.

## Question bank (69)
| Type | Count | Marks |
|---|---|---|
| mcq | 21 | 1 (keys a 6, b 5, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 5 | 1 (keys a c a d b) |
| true-false | 5 | 1 |
| fill-blank | 7 | 1 (one blank each) |
| match | 2 | 2 (four pairs, half a mark each) |
| short (1 mark) | 4 | 1 (a definition, a name or a one-step answer) |
| numerical | 10 | 1 or 2 (3; 40 Ω; 6 V; 4.4 × 10⁻⁷ Ω m; 10 m; 1 V; 0.9999999999999998 Ω; 1 A; 3 Ω; 10.5 V) |
| short (2 marks) | 7 | 2 |
| short (3 marks) | 3 | 3 (calculations with formula, substitution and unit; reasons; comparisons) |
| long | 5 | 10, set in parts with marks shown (3 + 3 + 4), as in Section B of the ICSE paper |

- No case-based items: the ICSE Physics pattern has none (the 10-mark structured questions carry the data, diagram or situation instead).
- **Difficulty:** d1 22 · d2 31 · d3 14 · d4 2.
- **Competency:** recall 13 · understanding 16 · application 29 · analysis 11. Application or higher is **58% of items (74% of marks)**, inside the 45–65% band and in line with the CISCE aim (October 2026 circular) of about half the marks on higher-order skills.
- **Topic tags:** t01 20 · t02 17 · t03 17 · t04 22.
- **Deck checks:** q002, q019, q020 (Part 1); q032, q044, q045 (Part 2) — all objective, none used in the tests.

## Chapter tests (ICSE 10 Physics blueprints)
- **Short (20 marks, 30 min):** A q001, q033, q046, q007, q009, q053, q017, q061 · B (q065 or q067).
- **Long (40 marks, 60 min):** A q003, q004, q022, q035, q048, q036, q025, q039, q054, q063, q042, q060, q030, q062 · B (q066 or q068 or q069).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their computed-geometry self-checks (17 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 34/34 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-11-01-subject-producer-icse10-physics.md`.

## Verifier pass (2026-11-01)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Authoring.** Drafted by a helper author working to the same brief and template, who re-solved every item and rendered the circuits; the chapter producer rebuilt it from source (validator, lint, verify and leak scan clean).
2. **Fixes.** One circuit self-check compared a signed current with a size and was corrected; overlapping labels were fixed on four figures; CBSE 10 ch11 and ISC 12 ch05/ch06 set-ups are not reused.
3. **Every numerical computed in code and asserted**; seventeen circuit self-checks pass.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

