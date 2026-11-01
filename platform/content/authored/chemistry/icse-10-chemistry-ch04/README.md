# ICSE Class 10 Chemistry, Chapter 4 — Analytical Chemistry

`icse-10-chemistry-ch04` · release v1 · academic year 2026-27 (ICSE 2027 examination) · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 15 slides), notes (7 sections), 30 flashcards, 63 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse10chem_ch04_short` (20 marks, 30 min) and `t_icse10chem_ch04_long` (40 marks, 60 min), laid out exactly as the subject's own blueprints `icse-10-chemistry-chapter-test-short` / `-long` (Section A compulsory objective items, 1-mark answers, bracket completion and match; Section B 10-mark structured questions, any one of two or any two of three). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ISC 12 Chemistry builder adapted for ICSE ids, the ICSE 10 Chemistry blueprints, 10-mark structured questions, five-pair matches and per-blank fill marks), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/icse-10-chemistry-ch04/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ICSE 2027 syllabus, Class X section)
- All 5 syllabus topics are covered: t01 Colours of common salts and their solutions; t02 Adding sodium hydroxide dropwise and in excess to solutions of Fe, Cu, Zn and Pb salts; t03 Adding ammonium hydroxide dropwise and in excess to solutions of Fe, Cu, Zn and Pb salts; t04 Action of sodium hydroxide on ammonium salts; t05 Amphoteric nature: action of caustic alkalis on aluminium, zinc and lead and their oxides and hydroxides.
- Facts a reviewer may wish to double-check: Hydroxide colours follow the ICSE practical list (Fe(OH)₂ dirty green, Fe(OH)₃ reddish brown, Cu(OH)₂ pale blue, Zn(OH)₂ and Pb(OH)₂ white); Zn(OH)₂ and Pb(OH)₂ dissolve in excess NaOH (zincate, plumbite); Cu(OH)₂ and Zn(OH)₂ dissolve in excess NH₄OH, Pb(OH)₂ does not; aluminium with NaOH is written as giving sodium aluminate NaAlO₂. Calcium (white Ca(OH)₂, insoluble in excess NaOH) is included because the official ICSE list of ions includes Ca, although the SOYL topic summary names only Fe, Cu, Zn and Pb; no claim is made about calcium with NH₄OH. PbO is given as yellow, ZnO as white when cold and yellow when hot.

## Shape
- **Part 1, 15 slides:** colours of salts and their solutions; coloured oxides and other compounds; sodium hydroxide, a few drops at a time; equations for the coloured precipitates; worked example (iron(II) or iron(III)?); zinc and lead: precipitates that dissolve; worked example (how much alkali?); sodium hydroxide and ammonium salts; worked example (is it an ammonium salt?); summary; exam tips; 3 checks.
- **Part 2, 15 slides:** ammonium hydroxide, a few drops; excess ammonium hydroxide: copper and zinc; equations for the excess reactions; worked example (telling pairs apart); identifying a cation: a flow; amphoteric substances; metals that react with alkalis; worked example (hydrogen from aluminium); hydroxides with caustic alkali; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 11 · diagram 2 · example 5 · check 6 · summary 2 · exam-tips 2. Visuals: chem 2 · flow 2 · svg 2 · table 18. Two SVGs (hydroxide precipitates in five test tubes; copper and zinc solutions with a little and with excess ammonium hydroxide); the cation-identification scheme is a flow. Narration 14–68 words (mean 49), no symbols, formulae or unit abbreviations.

## Question bank (63)
| Type | Count | Marks |
|---|---|---|
| mcq | 20 | 1 (keys a 5, b 5, c 5, d 5; seeded balanced shuffle) |
| assertion-reason | 5 | 1 (keys c a b a d) |
| true-false | 4 | 1 |
| fill-blank | 4 | 1 per blank (the 3-blank bracket completion carries 3) |
| match | 2 | 1 per pair (4 or 5 pairs) |
| short (1 mark) | 12 | 1 (a balanced equation, an observation or a name) |
| numerical | 3 | 1 or 2 (8 g; 2.24 L; 6.72 L) |
| short (2 marks) | 5 | 2 |
| short (3 marks) | 3 | 3 (reasons, comparisons, calculations with working) |
| long | 5 | 10, set in parts with marks shown (2 + 2 + 3 + 3 or 3 + 3 + 4), as in Section B of the ICSE paper |

- No case-based items: the ICSE Chemistry pattern has none (the 10-mark structured questions carry the data or situation instead).
- **Difficulty:** d1 22 · d2 27 · d3 12 · d4 2.
- **Competency:** recall 14 · understanding 12 · application 27 · analysis 10. Application or higher is **59% of items (76% of marks)**, inside the 45–65% band and in line with the CISCE aim (October 2026 circular) of about half the marks on higher-order skills.
- **Topic tags:** t01 9 · t02 24 · t03 13 · t04 11 · t05 20.
- **Deck checks:** q001, q007, q035 (Part 1); q026, q029, q043 (Part 2) — all objective, none used in the tests.

## Chapter tests (ICSE 10 Chemistry blueprints)
- **Short (20 marks, 30 min):** A q008, q002, q044, q036, q014, q017, q039, q019, q023 · B (q060 or q061).
- **Long (40 marks, 60 min):** A q009, q010, q027, q028, q047, q012, q037, q005, q033, q054, q055, q040, q051, q006 · B (q059 or q062 or q063).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list; narration has no symbols; check slides all objective; 6/6 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-11-01-subject-producer-icse10-chemistry.md`.

## Verifier pass (2026-11-01)
Every question and every internal-choice alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Authoring.** Drafted by a helper author working to the same brief and template; the chapter producer rebuilt it from source (validator, lint and verify clean) and spot-checked the keys, equations and numericals.
2. **Specific stems.** Stems name their own solutions and observations; the CBSE 10 Science ch02/ch03 set-ups and the ICSE ch10 aqueous-ammonia stems are not reused.
3. **Every equation re-balanced** and every numerical re-computed by the build script.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised.

