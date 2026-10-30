# CBSE Class 12 Chemistry, Chapter 10 — Biomolecules

`cbse-12-chemistry-ch10` · release v1 · academic year 2026-27 · family `chemistry` · provenance `human` (author `claude-opus-5-5 (subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (19 + 18 slides), notes (5 sections), 32 flashcards, 80 questions. `build.checks` records the validation results. |
| `tests.json` | `t_cbse12chem_ch10_short` (20 marks, 40 min) and `t_cbse12chem_ch10_long` (40 marks, 90 min), laid out exactly as the default blueprints `cbse-12-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | Authoring sources (same builder as ch01): `lib.mjs`, `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`. Rebuild from `platform/`: `npx tsx content/authored/chemistry/cbse-12-chemistry-ch10/src/build.mjs` (deterministic; writes `release.json`, `tests.json` and the git-ignored `src/build.log`). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All six syllabus topics (t01 carbohydrates, t02 proteins, t03 enzymes, t04 vitamins, t05 nucleic acids, t06 hormones) are covered; the chapter has no removed topics.
- Carbohydrates: classification (mono-, oligo-, polysaccharides; aldoses/ketoses; reducing/non-reducing); preparation of glucose; open-chain structure and the reactions that prove it (HI, NH₂OH, HCN, Br₂ water, acetylation, HNO₃); D-configuration; cyclic structure, α/β anomers, mutarotation; fructose (furanose); sucrose (non-reducing, invert sugar), maltose, lactose; amylose, amylopectin, cellulose, glycogen; importance. Proteins: α-amino acids, essential amino acids, zwitterions; peptide bond; primary to quaternary structure; fibrous vs globular; denaturation. Enzymes as specific biocatalysts. Vitamins: fat- and water-soluble, deficiency diseases. Nucleic acids: nucleosides, nucleotides, phosphodiester links, DNA vs RNA, double helix and base pairing, replication and protein synthesis. Hormones: chemical classes and roles (elementary).
- Facts a reviewer may wish to double-check: specific rotations (sucrose +66.5°, D-glucose equilibrium +52.5°, D-fructose −92.4°, α-glucose +111°, β-glucose +19.2°); melting points of α- (419 K) and β-glucose (423 K); amylose 15–20% / amylopectin 80–85% of starch; vitamin–deficiency table (A, B₁, B₂, B₆, B₁₂, C, D, E, K).

## Shape
- **Part 1 (t01), 19 slides:** classes of biomolecules; classifying carbohydrates; aldoses and ketoses; preparing glucose; open-chain structure (diagram); evidence; worked example (interpreting glucose reactions); cyclic structure and anomers; fructose; disaccharides; invert sugar; worked example (why sucrose is non-reducing); polysaccharides; worked example (counting glucose units in amylose); summary; exam tips.
- **Part 2 (t02–t06), 18 slides:** amino acids; peptide bond (diagram); levels of protein structure; fibrous/globular and denaturation; enzymes; vitamins; worked example (linking deficiency to diet); nucleic acid building blocks; DNA double helix (diagram); functions of nucleic acids; worked example (base composition); hormones; summary; exam tips.
- Layouts: title 2, concept 17, diagram 3, example 5, check 6, summary 2, exam-tips 2.
- **Visuals in decks:** table 23, flow 5, svg 3 (no gap longer than one slide). **Diagrams (3 hand-written SVGs):** Fischer projection of D-glucose with the C5 –OH marked; peptide bond formation with loss of water; DNA ladder with A=T and G≡C pairs.
- **Narration:** 10–78 words (mean 55); no formulae or symbols.

## Question bank (80)
| Type | Count | Marks |
|---|---|---|
| mcq | 30 | 1 (keys a 8, b 8, c 7, d 7; seeded balanced shuffle) |
| assertion-reason | 8 | 1 (keys b c a a d a c a) |
| true-false | 5 | 1 |
| fill-blank | 3 | 1 |
| match | 4 | 2 |
| numerical | 7 | 1 or 2 (18 g glucose from sucrose; 18 g glucose from maltose; 3000 units in cellulose; dipeptide 146 g/mol; 149 water molecules; 32% adenine; 240 hydrogen bonds) |
| short | 9 + 5 | 2 / 3 |
| long | 5 | 5 |
| case-based | 4 | 4 (1 + 1 + 2), part (c) either/or via `alternatives` |

- **Difficulty:** d1 18 · d2 38 · d3 21 · d4 3.
- **Competency:** recall 15 · understanding 25 · application 33 · analysis 7. Application or higher is **50% of items (55% of marks)**, inside the 45–65% band.
- **Topic tags:** t01 31 · t02 19 · t03 8 · t04 9 · t05 13 · t06 6 (carbohydrates carry the most syllabus content).
- **Cases:** honey testing (reducing sugars, 90 g fructose from 171 g sucrose, detecting added cane sugar or why honey is laevorotatory); a teenager with type 1 diabetes (glucagon, 180 mg/100 mL = 10 mmol/L, why the glucometer uses an enzyme or why insulin is injected); paneer and curled hair (denaturation, alanine tripeptide 231 g/mol, irreversibility or hydrogen bonds in keratin); forensic DNA (G–C pairing, 28% adenine from 22% cytosine, strand separation or re-pairing).
- **Deck checks:** q001, q002, q003 (Part 1); q030, q052, q060 (Part 2) — all objective.

## Chapter tests (default blueprints)
- **Short (20 marks, 40 min):** A q004, q007, q061 (MCQ), q017 (A-R) · B q023, q043 (2 marks), q026 (3 marks) · C q028 or q071 · D q077.
- **Long (40 marks, 90 min):** A q006, q010, q011, q031, q032, q047, q053, q072 (MCQ), q019, q066 (A-R) · B q024, q044, (q058 or q069), q045, (q059 or q070) · C q046 + (q029 or q076) · D q079, q080.

## Validation
- Author validator (`src/lib.mjs`): 0 errors, 0 warnings; all maths strings parse with KaTeX + mhchem (strict); SVGs pass the allow-list; narration has no symbols; check slides all objective; 11/11 scripted re-solves pass.
- Pipeline stage-4 lint (called by the build): 0 errors, 0 warnings. Deterministic verify checks: 0 flags.
- Gates: see the handoff `docs/platform/handoffs/2026-10-29-subject-producer-cbse12-chemistry.md`.

## Verifier pass (2026-10-30)
Every question, case part and alternative was re-solved from its stem; distractors were checked. Findings and fixes:
1. **Difficulty spread.** The first build had no difficulty 4–5 items (lint warning); three analysis items (G–C content and strand separation, the cyclic-structure 3-marker, the sucrose assertion-reason) were raised to d4.
2. **A distractor cleaned.** The nitric-acid MCQ listed "oxalic acid" as a wrong option; strong nitric acid can in fact give oxalic acid, so it was replaced with hexanoic acid.
3. **Flow diagram.** The DNA → protein flow first drew replication as a self-loop; it now points to a separate "New DNA copy" node.
4. **Originality.** All examples and data (amylose 81 000 g/mol, cotton cellulose 4.86 × 10⁵ g/mol, honey, glucometer, paneer, forensic DNA) are fresh; no textbook or sample-paper wording.

## Known gaps
- Narration audio is not generated (TTS stage).
- SVGs were reviewed by coordinates, not rasterised (no rasteriser is installed in this worktree).
- Haworth projections of the glucose and fructose rings are described in words and tables, not drawn.
- Data in case passages are realistic illustrative values, not cited measurements.
