# ISC Class 11 Biology, Chapter 1 — The Living World

`isc-11-biology-ch01` · release v1 · academic year 2026-27 · family `biology` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (17 + 17 slides), notes (4 sections), 30 flashcards, 72 questions. `build.checks` records the validation results. |
| `tests.json` | `t_isc11bio_ch01_short` (20 marks, 50 min) and `t_isc11bio_ch01_long` (40 marks, 100 min), laid out as `isc-11-default-chapter-test-short` / `-long`. The two tests share no questions. |
| `src/` | `calc.mjs` (classification table with shared-category counts, a ten-character similarity matrix, chromosome numbers and ploidy, species counts, name correction; every value asserted with `eq`), `svgs.mjs`, `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the authoring library is `./lib.mjs` (shared by the ISC 11 chapters, not edited here). Rebuild from `platform/`: `npx tsx content/authored/biology/isc-11-biology-ch01/src/build.mjs` (deterministic; the tree stays clean). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All four ISC Class XI syllabus topics (t01–t04): need for classification, taxonomy and systematics, **numerical taxonomy, cytotaxonomy and chemotaxonomy**; the **biological species concept** and the taxonomic hierarchy with **man, housefly, mango and wheat**; **binomial nomenclature**, its rules and advantages; **artificial, natural and phylogenetic systems**. The three-domain and five-kingdom schemes belong to ch02.
- No removed topics for this chapter.

## Shape
- **Part 1 (t01–t02), 17 slides:** need for classification; taxonomy and systematics; branches of taxonomy; worked example (ten characters scored, mango and neem 0.9); similarity dendrogram; worked example (bread wheat 42 chromosomes, ploidy 6); species concept; hierarchy funnel; four organisms classified; worked example (shared categories of man with dog and housefly); four checks; summary; exam tips.
- **Part 2 (t03–t04), 17 slides:** binomial nomenclature; parts of a name; rules; worked example (three wrongly written names corrected); advantages; codes of nomenclature; systems of classification and their comparison; worked example (single-character key against all characters); phylogenetic tree; four checks; summary; exam tips.
- **Visuals (24 of 34 slides; no gap longer than two slides):** table 16, flow 4, svg 4.
- **Diagrams (5 SVGs, 11 uses):** the taxonomic funnel with man and mango; a **lettered funnel (A–E) of the housefly** for three diagram-based questions; a similarity dendrogram computed from the character matrix; parts of a scientific name; a phylogenetic tree. Every SVG was rasterised and checked by eye.
- **Narration:** 9–42 words (mean 31).

## Question bank (72)
| Type | Count | Marks |
|---|---|---|
| mcq | 27 | 1 (keys a 7, b 7, c 7, d 6), 3 on the lettered figure |
| assertion-reason | 7 | 1 (ISC options; keys b a a c a d d) |
| short, 1 mark | 5 | give-a-reason (3) and analogy (2) |
| fill-blank | 3 | 1 |
| true-false | 1 | 1 |
| numerical | 6 | 1 (0.8 similarity; 4 sets; 21 gamete; 84 species; 4 shared categories; 1 plant) |
| short | 9 + 8 | 2 / 3 |
| long | 4 | 5, in marked parts |
| case-based (stimulus) | 2 | 4 (1 + 1 + 2), part (c) either/or: herbarium sheet and chromosome numbers |

- **Difficulty:** d1 22 · d2 39 · d3 10 · d4 1.
- **Competency:** recall 16 · understanding 20 · application 28 · analysis 8. Application or higher is **50% of items (53% of marks)**, inside the 45–65 % band.
- **Topic tags:** t01 20 · t02 24 · t03 13 · t04 15.
- **Re-solves:** 13 scripted checks recompute keys from `calc.mjs`.

## Chapter tests (ISC defaults)
- **Short:** A species concept (beetles), handwritten name, habit-based key, author citation, wheat and mango (A-R) · B advantages of scientific names; (chromosome-based branch or phylogenetic system) · C man and housefly; (need for classification or similarity matrix of three plants, d4) · D hierarchy in parts.
- **Long:** A classification of man, largest taxon, taxon against category, order of ranks, three questions on the lettered housefly figure, genus from two names, code for a new mushroom, papaya names, equal weight (A-R), genus against family (A-R) · B species concept; classification of mango; (printed and handwritten name faults or artificial against natural) · C three plants compared by shared categories, rules with wheat, three systems, (single-character key or wheat and rice) · D need, data and systematics; (binomial nomenclature or the three systems in parts).
- Items in the tests are not used on any deck check slide, and stems were read so that no stem or option states the answer to another item of the same test.

## Validation
- `npm run content -- lint --exemplars`, `verify --board cisce --class 11 --subject biology --authored`, `originality --authored` and the exact-stem check: results in the producer's handoff.
- Author validator (in the build): 0 maths strings; 11 SVG uses / 5 distinct diagrams pass the allow-list; narration clean; 13/13 scripted re-solves; pipeline stage-4 lint 0 errors, 0 warnings.

## Verifier pass (2026-11-02)
Every question, case part and alternative was re-solved from its stem by the writer. Fixes made:
1. **Calculation check.** The re-solve for the three-plant matrix item asserted the wrong pair counts (3 and 2); recomputing from the matrix gave mango and wheat 2 of 10 and neem and wheat 1 of 10, and the check and the model answer now agree with `calc.mjs`.
2. **Word limits.** The one-word analogy answer and a 38-word three-mark answer were flagged; the analogy now has a 1–10 word limit and the three-mark answer was expanded with a comparison.
3. **Test leaks.** Long-answer parts were reworded (no scientist names in the systems question; only cytotaxonomy and chemotaxonomy in the taxonomy question) so that no assertion-reason or MCQ stem in the same test states their answers.
4. **Diagrams after rasterising.** The ladder note was clipped on the left and was re-centred; the lettered funnel's species box was too narrow for its text and was widened; the phylogenetic tree label crossed the stem and the tree was moved right.
5. **Originality.** Set-ups differ from CBSE 11 Biology ch01 (herbal root names, beetles, habit-based key, papaya, a mushroom, herbarium sheet, chromosome counts, a lettered housefly funnel; no tiger, potato, brinjal or campus-survey items). The exact-stem check found no duplicates against the ISC 11 worktree or the CBSE 11 worktree.

## Facts a reviewer should double-check
- The classification of man (Primata, Hominidae), housefly (Diptera, Muscidae), mango (Sapindales, Anacardiaceae) and wheat (Poales, Poaceae) follows the common Class XI table; the plant divisions are given as Angiospermae and the classes as Dicotyledonae and Monocotyledonae, although modern systems use eudicots and monocots.
- The ten-character plant matrix, the similarity values and the made-up collection sizes are illustrative, not real survey data.
- Chromosome numbers (man 46, housefly 12, mango 40, maize 20, bread wheat 42, garden pea 14) are the usual textbook values; bread wheat is hexaploid on a basic number of 7.
- Systems of classification: Linnaeus (sexual system, artificial), Bentham and Hooker (natural), Engler and Prantl and Hutchinson (phylogenetic); textbooks sometimes add Takhtajan or Cronquist.
- The Botanical Code is now the International Code of Nomenclature for algae, fungi and plants; both names are given in the notes.
