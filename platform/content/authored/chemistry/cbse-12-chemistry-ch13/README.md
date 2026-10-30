# CBSE Class 12 Chemistry, Chapter 13 — Polymers (formative assessment only)

`cbse-12-chemistry-ch13` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

The syllabus marks this chapter `board_assessed: false` (formative assessment only). It is authored to the same standard as the board chapters so that schools can use it for periodic tests; the title slide says it is not in the board exam.

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 15 slides), notes (5 sections), 31 flashcards, 65 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse12chem_ch13_short` (20 marks, 40 min) and `t_cbse12chem_ch13_long` (40 marks, 90 min), laid out exactly as the default blueprints `cbse-12-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | Authoring sources (same builder as ch01): `lib.mjs`, `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/cbse-12-chemistry-ch13/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- The single syllabus topic (t01: polymerisation, homopolymers and copolymers; classify polymers) is covered, together with the standard supporting content of the chapter, so every item carries t01.
- Monomer, polymer, repeating unit, degree of polymerisation; classification by source, structure, mode of polymerisation and molecular forces (elastomers, fibres, thermoplastics, thermosets); addition (free radical mechanism) and condensation polymerisation; homopolymers and copolymers; LDPE, HDPE (Ziegler–Natta), Teflon, PAN, PVC; nylon 6,6, nylon 6, terylene, Bakelite (via Novolac), melamine–formaldehyde; natural rubber, vulcanisation, neoprene, Buna-N, Buna-S; number- and weight-average molar masses and PDI; biodegradable polymers (PHBV, nylon-2–nylon 6).
- Facts a reviewer may wish to double-check: LDPE (1000–2000 atm, 350–570 K) and HDPE (333–343 K, 6–7 atm) conditions; terylene at 420–460 K; vulcanisation at 373–415 K with about 5% sulfur in tyre rubber; the temperatures at which raw rubber becomes sticky (about 335 K) and brittle (about 283 K).

## Shape
- **Part 1, 15 slides:** everyday polymers; monomers and repeating units; source and structure (diagram); molecular forces; worked example (classifying four items); addition polymerisation; free radical mechanism; condensation polymerisation; worked example (degree of polymerisation of polypropene); homopolymer or copolymer; summary; exam tips.
- **Part 2, 15 slides:** overview; polythene, Teflon, PAN; nylons and terylene; worked example (nylon 6,6 repeating unit = 226); Bakelite and melamine; natural rubber and vulcanisation (diagram); synthetic rubbers; molecular mass averages; worked example (Mn, Mw, PDI); biodegradable polymers; summary; exam tips.
- Layouts: title 2, concept 13, diagram 1, example 4, check 6, summary 2, exam-tips 2.
- **Visuals in decks:** table 19, flow 3, svg 2 (no gap longer than one slide). **Diagrams (2 hand-written SVGs):** linear, branched and cross-linked chains; rubber chains before and after vulcanisation (S–S bridges).
- **Narration:** 11–68 words (mean 52); no formulae or symbols.

## Question bank (65)
| Type | Count | Marks |
|---|---|---|
| mcq | 23 | 1 (keys a 6, b 6, c 6, d 5; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a c b a a d) |
| true-false | 4 | 1 |
| fill-blank | 2 | 1 |
| match | 2 | 2 |
| numerical | 7 | 1 or 2 (DP 2000 for PVC; 5.0 × 10⁵ g/mol Teflon; DP 500 polystyrene; terylene unit 192; 4.76% sulfur; Mn 20 000; Mw 40 000) |
| short | 8 + 4 | 2 / 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Difficulty:** d1 15 · d2 34 · d3 15 · d4 1.
- **Competency:** recall 10 · understanding 25 · application 26 · analysis 4. Application or higher is **46% of items (54% of marks)**, inside the 45–65% band.
- **Cases:** a municipal ban on thin carry bags (LDPE branching, 5000 ethene units, persistence or HDPE strength); a tyre factory near Chennai (vulcanisation, Buna-S, temperature behaviour or Buna-N hoses); a Surat textile mill (terylene, PDI 1.5, PAN classification or PDI meaning); a school club heating plastics (thermoset, PVC molar mass, reshaping or nylon’s higher melting point).
- **Deck checks:** q001, q011, q012 (Part 1); q028, q037, q047 (Part 2) — all objective.

## Chapter tests (default blueprints)
- **Short (20 marks, 40 min):** A q002, q005, q014 (MCQ), q008 (A-R) · B q026, q035 (2 marks), q010 (3 marks) · C q057 or q059 · D q062.
- **Long (40 marks, 90 min):** A q003, q004, q013, q017, q029, q031, q039, q048 (MCQ), q021, q052 (A-R) · B q027, q034, (q055 or q056), q025, (q036 or q046) · C q058 + (q060 or q061) · D q063, q064.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list; narration has no symbols; check slides all objective; every numerical re-solved by the build.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-10-29-subject-producer-cbse12-chemistry.md`.

## Verifier pass (2026-10-30)
Every question, case part and alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Arithmetic lint.** The Mw worked example wrote a rounded quotient with “=”; it now uses ≈ (31 429 and PDI 1.12).
2. **Competency.** The first build had 44% application-or-higher; two application items were added (identifying PVC from its repeating unit; degree of polymerisation of a polystyrene sample). Final 65 questions, 46%.
3. **Word limit.** One 2-mark model answer (LDPE vs HDPE) was tightened to the 30–50 band.
4. **Originality.** All data (PVC 1.25 × 10⁵, polystyrene 52 000, LDPE 1.4 × 10⁵, the 40/10 and 100/200/100 molecule mixtures, Surat and Chennai cases) are fresh; no textbook or sample-paper wording.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised (no rasteriser is installed in this worktree).
- Structural formulae of monomers are given as condensed formulae and names, not drawn.
