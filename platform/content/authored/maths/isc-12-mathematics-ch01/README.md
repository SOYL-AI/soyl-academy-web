# ISC Class 12 Mathematics — Chapter 1: Relations and Functions (authored, v1)

Hand-authored production chapter (D-025, D-026) for ISC 2027 Mathematics (860), Paper I.

- **Author:** `claude-opus-5-5 (subject-producer)`, provenance `origin: "human"`.
- **Status:** all items are `status: "draft"`.
- **Style:** follows the CISCE 2027 specimen paper pattern (sources/cisce.md, anchor `isc-2027-specimen-860-mathematics`): 1-mark objective items including assertion-reason, then 2-, 3- and 5-mark questions, with the 5-mark ones set in parts and internal choice.

## Shared library

`src/lib.mjs` is the shared ISC 12 Mathematics authoring library; later ISC chapters import it from this folder. It is a copy of the CBSE 12 Mathematics lib (`cbse-12-mathematics-ch01/src/lib.mjs`), changed as follows:
- ISC ids: `q_isc12math_chNN_` and `t_isc12math_chNN_*`.
- `chapterTests()` follows the `isc-12-default-chapter-test-short` and `-long` blueprints.
- `build()` gains four things:
  - the pipeline's stage-4 lint (0 errors and 0 warnings required);
  - the stage-5 deterministic verify checks;
  - a pre-check of the originality gate's exact-stem rule (stem prose with maths and code stripped) against every other authored chapter and exemplar;
  - parking of a failing build's output as `*.wip.json`.

`src/rel.mjs` holds brute-force helpers for relations and functions, copied from the CBSE 12 ch01 helpers.

## Scope (ISC 2027 syllabus, Unit 1)

- **t01 Relations on a set:**
  - empty, identity and universal relations;
  - reflexive, symmetric and transitive relations, tested by brute force;
  - equivalence relations and their classes, including congruence-type relations on $\mathbb{Z}$ (for example $4 \mid (a + 3b)$, $7 \mid (3a + 4b)$, $5 \mid (a^2 - b^2)$);
  - counting relations.
- **t02 Functions:**
  - domain and range of real functions (roots, reciprocals, completing the square);
  - one-one, many-one, onto and into functions;
  - horizontal line test;
  - counting functions between finite sets.
- **t03 Composite functions of algebraic functions:**
  - $f \circ g$ against $g \circ f$, and the domain of a composite;
  - non-commutativity and associativity.
- **t04 Invertible functions:**
  - invertible if and only if bijective;
  - finding inverses of linear, rational and restricted-domain quadratic functions, and a self-inverse rational function;
  - sketching $f$ and $f^{-1}$ as reflections in $y = x$;
  - $(g \circ f)^{-1} = f^{-1} \circ g^{-1}$.
- **Removed topic respected:** composite and invertible functions appear only for algebraic functions. No exponential, logarithmic or trigonometric composite or inverse is used.

## Contents

| Item | Count |
|---|---|
| Decks | Part 1 "Relations and types of functions" (t01–t02), 20 slides; Part 2 "Composite and inverse functions" (t03–t04), 19 slides |
| Visuals | 31 of 39 slides have a visual (tables, flows, arrow diagrams, plots), with at most 1 slide in a row without one. Plots include $f$ and $f^{-1}$ with the mirror line $y = x$, and $x^2 + 1$ on $[0, \infty)$ with $\sqrt{x - 1}$. |
| Worked examples | 4 + 5, each recomputed in `build.mjs`, which stops on any mismatch |
| Check slides | 4 + 4, on objective items that are not in either test (m03, m08, tf3, fb1; fb2, m19, m25, n04) |
| Notes | 6 sections with key terms, formulas and visuals; exam tips on ISC step marking and common mistakes |
| Flashcards | 30 |
| Questions | 71 items worth 124 marks, by type below |
| Difficulty | d1 8, d2 35, d3 22, d4 6 |
| Competency | application or higher: 56% of items, 70% of marks (lint band 45–65%) |
| Tests | `t_isc12math_ch01_short` (20 marks in 50 minutes: A 4 MCQ + 1 AR; B 2 + (2 or 2); C 3 + (3 or 3); D 5) and `t_isc12math_ch01_long` (40 marks in 100 minutes: A 10 MCQ + 2 AR; B 2 + 2 + (2 or 2); C 3 + 3 + 3 + (3 or 3); D 5 + (5 or 5)). The two tests share no items and use no deck-check items. |

| Question type | Count |
|---|---|
| mcq | 26 (keys balanced by the lib: a7 b7 c6 d6) |
| assertion-reason | 6 |
| true-false | 4 |
| fill-blank | 4 |
| numerical | 6 |
| short, 2 marks | 9 |
| short, 3 marks | 10 |
| long, 5 marks, set in parts | 6 |

## Verifier record

Run from `platform/`: `npx tsx content/authored/maths/isc-12-mathematics-ch01/src/build.mjs`.

- **Re-solve:** 122 of 122 checks pass (the log is `src/resolve.log`, gitignored). How each kind of item is checked:
  - Relation properties and classes are found by listing pairs.
  - Counts of relations and functions are found by full enumeration, including all $65{,}536$ relations on a four-element set for n01.
  - One-one is checked by sampling for collisions; onto by solving for pre-images.
  - Composites and inverses are compared numerically at about 80 points.
  - Ranges are checked by dense sampling.
- **KaTeX:** 1,235 maths strings parse in strict mode.
- **Narration:** at most 65 words per slide and no symbols.
- **Lint and verify:** stage-4 lint shows 0 errors and 0 warnings, and stage-5 deterministic verify raises 0 flags.
- **Duplicate stems:**
  - The exact-stem pre-check against every authored chapter (including CBSE 12 Mathematics ch01) raises 0 collisions.
  - The originality gate's near-duplicate rule (5-gram Jaccard of at least 0.7 over the whole repo) gives 0 pairs.
- **Originality:** every set-up is SOYL's own. Examples include a Shillong music club, a stamp collector's multiples, raffle tickets, a ticket machine, a delivery app and a puzzle app on $\{1, 2, 3\}$. Textbook classics (for example "same distance from the origin", the $(a, b) R (c, d)$ relation on $\mathbb{N} \times \mathbb{N}$, and the odd/even swap on $\mathbb{W}$) were deliberately avoided.

## For a reviewer

- **Assertion-reason keys:** they are `a a d a a c`, which leans towards (a).
- **m23 and m25:** these definition items rest on brute-force checks (invertible if and only if bijective, on all 27 maps of a three-element set) plus the key.
- **Plots:** the endpoints of the square-root curves are not marked. The plot lint cannot locate a zero at the end of a function's domain numerically, so the endpoints are described in alt text and captions instead.
- **Blueprint marks:** ISC Section B, C and D marks (2, 3 and 5) follow the `isc-12-default` blueprints, not the older 2, 4 and 6 pattern.

## Gaps

- Narration audio has not been generated yet (the TTS stage).
- Nobody has seen the arrow-diagram labels and plots on a phone, so they need a look at 360 px on staging.
