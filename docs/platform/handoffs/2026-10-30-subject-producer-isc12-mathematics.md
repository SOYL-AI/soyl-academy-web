# subject-producer — ISC Class 12 Mathematics, ch01–ch17 hand-authored — 2026-10-30/31

Status: done. All 17 chapters of the ISC 2027 Class 12 syllabus are hand-authored, pass every gate and are committed, one commit per chapter.

Branch: `platform/subject-producer/isc-12-mathematics`, based on local `platform/main` 4c30f89. Hand-authored under D-025/D-026; every item has `status: "draft"`; family folder `maths`.

Session limits stopped work three times: at about 11:00 IST on 30 October, about 05:00 IST on 31 October, and earlier in the wave. Each chapter was committed only after a full gate run that started after its last file change. From 31 October at most two chapter sub-agents ran at a time.

## Syllabus and pattern

- **Chapters:** the 17 chapters of `platform/catalog/cisce/isc-12/mathematics/syllabus.yaml` (ISC 2027, seven units), with SOYL's chapter split. That split includes Methods of Differentiation (ch06); Integration by Parts, Partial Fractions and Special Integrals (ch09); and 3-D Lines (ch14) apart from Planes (ch15).
- **ISC content CBSE dropped, all kept:**
  - inverse-trig sum and difference formulae and equations
  - properties of determinants
  - removable discontinuity
  - tangents, normals and the angle between curves
  - the special trigonometric integrals
  - the section formula for external division
  - coplanar and skew lines, and line–plane intersection
  - LP terminology and types
- **Removed topics honoured:**
  - composites and inverses of algebraic functions only
  - matrices of order up to 3 only
  - no derivatives above second order
  - the fundamental theorem stated without proof
  - second-order differential equations never solved
- **Sections:** the 2027 syllabus has no Section A/B/C choice (all seven units compulsory), so none is modelled.
- **Question style:** follows the ISC 2027 specimen (sources/cisce.md, anchor isc-2027-specimen-860-mathematics): 1-mark objective items including assertion-reason, then 2-, 3- and 5-mark structured questions with internal choice; 5-mark items are set in parts.
- **Tests:** each chapter has two, on `isc-12-default-chapter-test-short` (20 marks, 50 min) and `isc-12-default-chapter-test-long` (40 marks, 100 min). Both follow their blueprint item for item, including the internal-choice groups. The two tests are disjoint and use no deck-check item.
- **Marks per section:** 2/3/5, per the blueprints. The brief's "2/4/6" did not match the ISC 2027 blueprints in the catalog, which were followed.

## Build

- **Shared library:** `isc-12-mathematics-ch01/src/lib.mjs`, used by every chapter through an import (never copied). It is the CBSE 12 Mathematics lib with these changes:
  - ISC ids (`q_isc12math_chNN_`, `t_isc12math_chNN_*`) and an ISC `chapterTests()`;
  - build-time stage-4 lint and stage-5 deterministic checks;
  - an exact-stem originality pre-check (prose with maths and code stripped) against every other authored chapter and exemplar;
  - `*.wip.json` parking when a build fails.
- **Re-solve:** every key is recomputed independently.
  - Calculus: numerical differentiation, integration and minimisation.
  - Matrices, vectors and probability: exact integer and fraction arithmetic, plus enumeration.
  - LP: corner points by pairwise intersection, checked by a grid search.
  - Every MCQ option is evaluated, so that exactly one matches the key.
- **Near-duplicates:** each chapter also passed a 5-gram near-duplicate scan using the originality gate's own rule, run against the whole repo.

## Chapters

| Ch | Title | Commit | Decks (slides) | Notes | Cards | Questions | mcq/AR/s2/s3/long | App.+ |
|---|---|---|---|---|---|---|---|---|
| 01 | Relations and Functions | d694cd2 | 20 + 19 | 6 | 30 | 71 | 26/6/9/10/6 | 56% |
| 02 | Inverse Trigonometric Functions | fa5c502 | 18 + 19 | 6 | 30 | 72 | 28/6/9/10/6 | 57% |
| 03 | Matrices | ccfd960 | 19 + 18 | 6 | 30 | 68 | 24/6/9/10/6 | 54% |
| 04 | Determinants and Systems of Linear Equations | 851b391 | 18 + 17 | 6 | 30 | 68 | 26/5/10/11/6 | 54% |
| 05 | Continuity and Differentiability | ad46528 | 21 + 19 | 6 | 30 | 71 | 26/5/10/10/6 | 59% |
| 06 | Methods of Differentiation | b7f4753 | 20 + 21 | 6 | 30 | 66 | 25/6/9/10/6 | 56% |
| 07 | Applications of Derivatives | 05e1ca2 | 19 + 18 | 6 | 30 | 68 | 26/5/9/10/6 | 51% |
| 08 | Indefinite Integrals: Standard Forms and Substitution | c7efd1e | 18 + 17 | 6 | 30 | 67 | 25/6/9/10/6 | 55% |
| 09 | Integration by Parts, Partial Fractions and Special Integrals | ca740b2 | 18 + 18 | 6 | 30 | 70 | 26/7/9/10/6 | 56% |
| 10 | Definite Integrals | 441756b | 18 + 18 | 6 | 30 | 68 | 25/6/9/10/6 | 56% |
| 11 | Application of Integrals | 5692742 | 18 + 17 | 6 | 30 | 70 | 26/6/9/10/6 | 53% |
| 12 | Differential Equations | 221e215 | 19 + 18 | 6 | 30 | 68 | 25/6/9/10/6 | 54% |
| 13 | Vector Algebra | 2aa3b3d | 19 + 18 | 6 | 30 | 72 | 28/6/9/10/6 | 56% |
| 14 | Three-Dimensional Geometry: Lines | c31c20f | 21 + 16 | 6 | 30 | 67 | 26/5/9/10/6 | 55% |
| 15 | Three-Dimensional Geometry: Planes | d477484 | 19 + 19 | 6 | 30 | 67 | 26/5/9/10/6 | 54% |
| 16 | Linear Programming | 0c932a1 | 19 + 17 | 6 | 30 | 68 | 24/6/9/10/6 | 54% |
| 17 | Probability | 92a0259 | 19 + 20 | 6 | 30 | 68 | 24/6/9/10/6 | 56% |
| **Total** | | | **34 decks, 632 slides** | 102 | 510 | **1,169** | | |

"App.+" is the share of items at application or above, which is 45–65% in every chapter (lint band). Every chapter also has true-false, fill-blank and numerical items.

Every chapter has the following:
- **Decks:** two, each with a title slide and goals, 2–6 worked examples (each asserted in its build), 4 check slides, a summary and exam tips. No more than 2 slides in a row lack a visual.
- **Notes:** 6 sections, each with formulas and visuals.
- **Maths:** KaTeX strict parse of every maths string.

## Gates (from `platform/`, each under `_tools/heavy.sh`)

`npm test -w @soyl/content-templates`; `npm run content -- catalog`; `npm run content -- lint --exemplars`; `npm run content -- verify --board cisce --class 12 --subject mathematics --authored`; `npm run content -- originality --authored`; `npx vitest run --root db test/db6-split.test.ts`; `npx vitest run --root api test/content.test.ts`.

| Run (IST) | Chapters committed after it | Content gate | Catalog | Lint | Verify | Originality | DB-6 | API |
|---|---|---|---|---|---|---|---|---|
| 30 Oct 10:45 | ch01 | 1233/1233 | 0 errors | 0 errors, 0 warnings | 0 blocking | 176 units, 0 errors | 8/8 | 13/13 |
| 31 Oct 03:02 | ch02–ch08 | 1282/1282 | 0 errors | 0 errors, 0 warnings | 0 blocking | 183 units, 0 errors | 8/8 | 13/13 |
| 31 Oct 03:16 | ch09–ch10 | 1296/1296 | 0 errors | 0 errors, 0 warnings | 0 blocking | 185 units, 0 errors | 8/8 | 13/13 |
| 31 Oct 03:23 | ch11–ch12 | 1310/1310 | 0 errors | 0 errors, 0 warnings | 0 blocking | 187 units, 0 errors | 8/8 | 13/13 |
| 31 Oct 17:14 | ch13–ch14 | 1324/1324 | 0 errors | 0 errors, 0 warnings | 14 units, 966 questions, 0 blocking | 189 units, 0 errors | 8/8 | 13/13 |
| 31 Oct 22:39 | ch15–ch17 (one run) | 1345/1345 | 0 errors | 0 errors, 0 warnings | 17 units, 1,169 questions, 0 blocking | 192 units, 0 errors | 8/8 | 13/13 |

Verify reports a few **minor** (non-blocking) flags in some chapters, from 0 to 3 per chapter; there are no blocking flags anywhere.

## Facts and conventions a reviewer should check (details in each chapter README)

- **ch02:** principal branches are cot⁻¹ in (0, π), sec⁻¹ in [0, π] without π/2, and cosec⁻¹ in [−π/2, π/2] without 0. The sin⁻¹/cos⁻¹ sum formulae are stated with sufficient (simplified) conditions, and the items check the ranges directly.
- **ch03:** inverses come from AB = I or from matrix equations; the adjoint method is in ch04.
- **ch04:** inverses are written as (1/|A|) adj A.
- **ch05:** removable discontinuity is taught as two types (value undefined; value different from the limit). Hollow dots cannot be drawn, so they are described in captions.
- **ch06:** the endless power tower is stated "where it converges". `ar3` uses the general relation for y'' through dx/dy.
- **ch07:** `m19` treats a point where f′ does not exist as critical.
- **ch10:** `l02(b)` gives the value of ∫ log sin x on [0, π/2] rather than deriving it, because the derivation is a textbook example. `ar4` is keyed (d), for the fundamental theorem applied to an unbounded integrand.
- **ch11:** `s209` and `ar4` use ∫ log x dx as a standard result.
- **ch12:** `m21` treats A cos(x + B) as having order 2.
- **ch14:** `l04` is in tens of metres.
- **ch15:** `m10` treats p < 0 as not normal form.
- **ch16:** the transportation-type item stays within three non-trivial constraints. Regions cannot be shaded, so shading is described in the alt text.
- **ch17:** no binomial distribution or variance, which are not in ISC 2027 Unit 7.
- **Assertion-reason keys:** several (b) keys rest on "R is true but does not explain A". Each solution states the reason.

## Known gaps / follow-ups

- **Rendering has not been checked.** Nobody has looked at the plots, geometry sketches, wide matrices in table cells or the 3-D sketches at 360 px, in light and dark mode, on staging.
- **Content:** items are `draft`. The content-verifier sample has not been done. There is no frozen test series for ISC 12 Mathematics yet (an assessment-designer step).

Decisions made: none beyond this note (no ADR; no shared file touched).
Needs from owner: none.
