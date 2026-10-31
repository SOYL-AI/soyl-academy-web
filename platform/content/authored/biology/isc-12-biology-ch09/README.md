# ISC Class 12 Biology, Chapter 9 — Evolution: Origin of Life and Evidences

`isc-12-biology-ch09` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 15 slides), notes (5 sections), 30 flashcards, 62 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc12bio_ch09_short` (20 marks, 50 min) and `t_isc12bio_ch09_long` (40 marks, 100 min), laid out as `isc-12-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | `calc.mjs` (carbon-14 decay: fraction left, age from fraction, half-lives), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `../isc-12-biology-ch01/src/lib.mjs`. Rebuild from `platform/`: `npx tsx content/authored/biology/isc-12-biology-ch09/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All five ISC syllabus topics: **abiogenesis, biogenesis and panspermia** (Pasteur’s swan-neck flasks); the **Oparin–Haldane theory**, **why a reducing atmosphere was needed**, **protobionts, coacervates and microspheres**; the **Miller–Urey experiment**; **homologous, analogous and vestigial organs** with **divergent and convergent evolution** (two plant and two animal examples each); **embryological evidence** (recapitulation, von Baer); **palaeontological evidence** (fossils, strata, Archaeopteryx, **radiocarbon dating**, the **geological time scale** with dominant flora and fauna); **biogeographical and molecular evidence**; **adaptive radiation** (Darwin’s finches, Australian marsupials).
- Mechanisms of evolution, Hardy–Weinberg and human evolution are in ch10.

## Shape
- **Part 1 (t01–t03), 15 slides:** chemical evolution; three old ideas; Oparin–Haldane; protobionts and coacervates; Miller–Urey; check; worked example (each part of the apparatus and what it represented); check; homologous organs; analogous organs; vestigial organs; worked example (classifying organ pairs); check; summary; exam tips.
- **Part 2 (t04–t05), 15 slides:** four lines of evidence; embryology; fossils; radiocarbon dating; worked example (one quarter left, computed); geological time scale; two checks; biogeography; Darwin’s finches; worked example (one sixteenth left, computed, and why dinosaurs need other isotopes); molecular evidence; check; summary; exam tips.
- **Visuals (22 of 30 slides; no gap longer than two slides):** table 16, svg 4, flow 2.
- **Diagrams (4 SVGs, 11 uses):** Miller–Urey apparatus and homologous forelimbs (copied from CBSE 12 ch06); new: a **carbon-14 decay curve** (points computed from the half-life) and the **adaptive radiation of Darwin’s finches**. Every SVG was rasterised and checked by eye.
- **Narration:** 8–49 words (mean 32).

## Question bank (62)
| Type | Count | Marks |
|---|---|---|
| mcq | 27 | 1 (keys a 7, b 7, c 7, d 6) |
| assertion-reason | 6 | 1 (ISC options; keys a d b c a a) |
| short, 1 mark | 2 | give-a-reason |
| fill-blank | 4 | 1 |
| numerical | 2 | 1 (17 190 years for one eighth; 0.0625 after 22 920 years) |
| short | 7 + 8 | 2 / 3 |
| long | 4 | 5, in marked parts |
| case-based (stimulus) | 2 | 4 (1 + 1 + 2), part (c) either/or: carbon-14 table of four samples; forelimb figure with insect and bird wings |

- **Difficulty:** d1 10 · d2 28 · d3 23 · d4 1 (a Miller–Urey control experiment).
- **Competency:** recall 12 · understanding 21 · application 23 · analysis 6. Application or higher is **47% of items (57% of marks)**, inside the 45–65 % band.
- **Re-solves:** 4 scripted checks recompute the radiocarbon ages and fractions.

## Chapter tests (ISC defaults)
- **Short:** A Pasteur’s flasks, sparks, octopus eye, Mesozoic (MCQ), dinosaur dating (A-R) · B abiogenesis vs biogenesis; (classify four organ pairs or recapitulation) · C Miller–Urey; (radiocarbon principle or Australian marsupials) · D origin of life in parts.
- **Long:** A panspermia, oxygen in the early air, Miller figure, Bougainvillea and Cucurbita, appendix, gill slits, von Baer, strata, sugar glider, universal code (MCQ), bat and butterfly wings, appendix (A-R) · B protobionts vs coacervates; vestigial organs; (adaptive radiation or molecular evidence) · C Oparin–Haldane; three reasons against chemical evolution today; homologous vs analogous; (geological eras or divergent vs convergent) · D fossils in parts; (Miller–Urey or adaptive radiation).

## Validation
- `npm test -w @soyl/content-templates`, `npm run content -- lint --exemplars`, `verify --board cisce --class 12 --subject biology --authored`, `originality --authored`, DB-6 split and the API content test: results in the handoff `docs/platform/handoffs/2026-10-30-subject-producer-isc12-biology.md`.
- Author validator (in the build): 13 maths strings parse; 11 SVG uses / 4 distinct diagrams pass the allow-list; narration clean; 4/4 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.

## Verifier pass (2026-10-31)
Every question, case part and alternative was re-solved from its stem. Fixes made:
1. **Assertion-reason keys.** An item whose natural key was “Assertion false, Reason true” (not an ISC option) was rewritten so that both statements are false, keyed (d).
2. **Word limit.** The 3-mark model answer on geological eras was expanded from 24 to the 50–80-word range.
3. **Originality.** Every stem names its own experiment, organism pair, sample or era, so it does not collide with the CBSE 12 ch06 bank by the same author; `originality --authored` reports 0 errors across 222 units.

## Facts a reviewer should double-check
- Era boundaries (541, 252 and 66 million years ago) are rounded modern values; the textbook may give slightly different figures.
- Miller–Urey products (glycine, alanine, aspartic acid) and the 50 000-year practical limit of radiocarbon dating follow standard sources.
