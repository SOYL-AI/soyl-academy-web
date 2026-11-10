# ISC Class 11 Chemistry, Chapter 5 — Quantum Mechanical Model and Electronic Configuration

`isc-11-chemistry-ch05` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (writer Sonnet 5.5 (claude-sonnet-5-5); reviewed, gated and committed by the subject-producer, Claude Opus 5.5; hand-authored under D-025/D-026, D-050)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (20 + 18 slides), notes (7 sections), 32 flashcards, 69 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11chem_ch05_short` (20 marks, 50 min) and `t_isc11chem_ch05_long` (40 marks, 100 min), laid out exactly as the class-default blueprints `isc-11-default-chapter-test-short` / `-long` (four sections A–D as in the ISC 2027 specimens: objective items, 2-mark and 3-mark short answers, 5-mark long answers set in parts, with internal choice in B, C and D). The two tests share no questions. |
| `src/` | Authoring sources: `lib.mjs` (the ISC 12 Chemistry builder with ISC 11 ids and blueprints and the assertion-reason options of the ISC 2027 Chemistry specimen; the pipeline’s verify checks, an answer-leak scan and an atom-balance check of equations with = or # bonds run inside the build), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/isc-11-chemistry-ch05/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope (ISC 2028 syllabus, Class XI portion)
- All 5 syllabus topics are covered: t01 Quantum mechanical model: Schrodinger wave equation and the physical significance of psi and psi^2 (no derivation); t02 Quantum numbers; shells, subshells and orbitals; information they give about distance, energy and number of electrons; t03 Shapes, size and orientation of s, p and d orbitals; nodes, nodal planes and radial probability curves; t04 Aufbau principle and (n + l) rule; Pauli's exclusion principle; Hund's rule of maximum multiplicity; t05 Electronic configuration of elements and ions; stability of half-filled and completely filled orbitals.
- The Schrödinger equation is described without derivation (as the syllabus says): the meaning of ψ and ψ², quantum numbers, shapes and orientation of s, p and d orbitals, radial and angular nodes and radial probability curves, then the Aufbau (n + l) rule, Pauli's principle, Hund's rule and the configurations of atoms and ions with the Cr and Cu exceptions.
- Facts a reviewer may wish to double-check: Bohr radius a₀ = 52.9 pm. Radial nodes (Z = 1, in a₀): 2s at 2.0; 3s at 1.9 and 7.1; 3p at 6.0. Most probable distances: 1s 1.00, 2p 4.00, 3d 9.00, 3p 12.0 a₀. The Aufbau order and every configuration in the bank are computed from the (n + l) rule, with Cr [Ar] 3d⁵ 4s¹ and Cu [Ar] 3d¹⁰ 4s¹ as the only exceptions; cations lose the highest-n electrons first.

## Shape
- **Part 1, 20 slides:** from orbit to orbital; the Schrödinger wave equation (no derivation); what ψ and ψ² mean; seeing the probability: the 1s electron; orbital and boundary surface; the four quantum numbers; shells, subshells and orbitals; worked example (quantum numbers of the 3p electrons); what the quantum numbers tell us; shapes of s and p orbitals; size and orientation; the five d orbitals; nodes: radial and angular; radial probability curves; worked example (counting nodes); summary; exam tips; 3 checks.
- **Part 2, 18 slides:** aufbau principle; the (n + l) rule; the order of filling; worked example (arranging subshells by energy); pauli’s exclusion principle; hund’s rule of maximum multiplicity; orbital box diagrams; worked example (orbital diagram of sulfur); writing electronic configurations; chromium and copper: extra stability; worked example (cobalt and its ions); configurations of ions; summary; exam tips; 3 checks.
- Layouts: title 2 · concept 15 · diagram 6 · example 5 · check 6 · summary 2 · exam-tips 2. Visuals: flow 2 · svg 9 · table 21. SVGs: the 1s electron-density dot picture with ψ² and radial-probability curves, six radial-probability panels computed from hydrogen-like functions (nodes from sign changes, each normalised), s and p orbital shapes with nodal planes, the five d orbitals, shells and subshells, the Aufbau (n + l) diagram and orbital boxes for P, Fe, Fe³⁺, Cr and Cu; all rendered and checked by eye. Narration 44–66 words (mean 57), no symbols, formulae or unit abbreviations.

## Question bank (69)
| Type | Count | Marks |
|---|---|---|
| mcq | 26 | 1 (keys a 7, b 7, c 6, d 6; seeded balanced shuffle) |
| assertion-reason | 6 | 1 (keys a c d b a c; options in the order of the ISC 2027 Chemistry specimen, with (d) both false) |
| true-false | 3 | 1 |
| fill-blank | 3 | 1 |
| match | 2 | 2 |
| numerical | 4 | 1–3 (50 electrons; 3 nodes; 3 unpaired electrons; 11 electrons) |
| short (2 marks) | 9 | 2 |
| short (3 marks) | 10 | 3 |
| long | 6 | 5, set in parts |

- **Difficulty:** d1 20 · d2 31 · d3 15 · d4 3.
- **Competency:** recall 14 · understanding 19 · application 25 · analysis 11. Application or higher is **52% of items (61% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 10 · t02 15 · t03 17 · t04 16 · t05 15.
- **Deck checks:** q001, q010, q032 (Part 1); q040, q044, q059 (Part 2) — all objective, none used in the tests.

## Chapter tests (ISC 11 class-default blueprints)
- **Short (20 marks, 50 min):** A q002, q011, q042, q055, q030 · B q020, (q034 or q050) · C q022, (q051 or q065) · D q069.
- **Long (40 marks, 100 min):** A q003, q012, q014, q025, q028, q027, q041, q045, q054, q058, q061, q048 · B q007, q021, (q035 or q049) · C q023, q037, q052, (q063 or q064) · D q039, (q053 or q066).

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list and their self-checks (47 diagram self-checks (geometry computed in svgs.mjs): 0 failures); narration has no symbols; check slides all objective; 31/31 scripted re-solve checks pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags. Answer-leak scan: clean. Bonded-equation (= / #) balance check: 0 errors.
- Gates: see the handoff `docs/platform/handoffs/2026-11-09-subject-producer-isc11-chemistry.md`.

## Verifier pass (2026-11-09)
Every question and internal-choice alternative was re-solved from its stem by the writer; the producer (Claude Opus 5.5) reviewed the assertion-reason items, the objective keys, the flagged facts, the competency tags and the numericals. Findings and fixes:
1. An assertion-reason item paired '3d holds ten electrons' with 'spin has two values', a borderline (b); the reason is now 'in the Aufbau order 3d fills after 4s', which is true and clearly unrelated to the capacity, so (b) is unambiguous.
2. The producer re-solved every objective key (quantum-number counts, nodes, configurations, unpaired electrons): all correct.
3. Writer fixes: three r'…' strings, a wrong re-solve check (the question was right), a d4 retag of a one-idea count, two match solutions and SVG label clipping.

## Known gaps
- Narration audio is not generated (TTS stage).

