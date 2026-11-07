# ICSE Class 9 Physics, Chapter 12 — Magnetism

`icse-9-physics-ch12` · release v1 · academic year 2026-27 · family `physics` · provenance `human` (author `claude-sonnet-5-5 (writer; reviewed by the subject-producer)`, hand-authored under D-025/D-026)

| File | What |
|---|---|
| `release.json` | `ChapterRelease`: 2 decks (15 + 15 slides), notes (4 sections), 30 flashcards, 67 questions. `build.checks` records the validation results. |
| `tests.json` | `t_icse9phy_ch12_short` (20 marks, 30 min) and `t_icse9phy_ch12_long` (40 marks, 60 min), laid out as `icse-9-default-chapter-test-short` / `-long`. The two tests share no questions, and no deck-check item is used in a test. |
| `src/` | `calc.mjs` (the field model and every asserted value), `svgs.mjs` (diagrams computed in JS, with self-checks), `decks.mjs`, `study.mjs`, `questions.mjs`, `build.mjs`; the shared authoring library is `../icse-9-physics-ch01/src/lib.mjs` (not edited). Rebuild from `platform/`: `npx tsx content/authored/physics/icse-9-physics-ch12/src/build.mjs` (deterministic). |

All items are `status: "draft"` until a reviewer approves them.

## Scope
- All four ICSE 2028 Class IX topics of the chapter: induced magnetism and "induction precedes attraction"; magnetic field lines of a bar magnet and their properties; the earth's magnetic field (evidence, the compass, the uniform field over a small region); the combined field of a bar magnet and the earth, with neutral points for a magnet whose N pole points north and one whose N pole points south.
- This chapter has no removed topics.
- **Overlap kept out:** the magnetic field of a current, electromagnets, motors and induction (ICSE 10 Physics ch10) are never asked, and no unit of magnetic field (tesla) is introduced: field strengths in numericals are given in arbitrary units (arrow lengths).
- **Convention:** the earth's magnetic S pole is near the geographic north; in distance problems the poles are taken at the ends of the magnet (the stem says so), whereas the figures place the poles slightly inside the ends.
- Class 9 has no board examination; the items follow the ICSE 2027 Physics specimen style (521): short stems, reasons, diagrams and assertion-reason items in the specimen option order.
- **Numericals:** 6 numerical items (neutral-point distances, resultants and directions of two fields) plus 2 calculation short answers and calculation parts in 4 structured questions; the brief asks for at least 3 in this chapter.
- **Originality:** situations and numbers differ from CBSE 10 Science ch13 (magnetic effects), ICSE 10 Physics ch10 and CBSE 12 Physics; exact-stem and originality checks report no duplicates (three stems that matched other banks were reworded).

## Shape
- **Decks:** Part 1 (15 slides): Magnets and their fields; Magnetic materials and poles; Induced magnetism; Induction precedes attraction; Quick check: induced poles; Worked example 1: a chain of nails; Field lines of a bar magnet; Properties of field lines; Quick check: crossing lines; Plotting a field line with a compass; Worked example 2: reading a field diagram; Quick check: direction at a point; Quick check: strength of the field; Summary; Exam tips. Part 2 (15 slides): The earth as a magnet; The earth as a bar magnet; Evidence for the earth's field; Quick check: why the needle points north; The compass and the uniform field; Neutral points; N pole pointing north; N pole pointing south; Quick check: where are the neutral points?; Quick check: the other way round; Worked example 1: distance of a neutral point from a pole; Worked example 2: the direction of a compass needle; Quick check: equal fields at right angles; Summary; Exam tips.
- **Visuals (30 of 30 slides):** flow 2, table 19, svg 9.
- **Diagrams (11 distinct SVGs, all geometry computed in JS):** a soft iron bar far from and near a magnet (induced poles); a chain of nails; the field lines of a bar magnet (plain, with compass needles along a line, and lettered A to E); the earth as a bar magnet with compass needles; the combined field of a bar magnet and the earth for N pole north (plain and lettered) and N pole south (plain and lettered), with the neutral points found numerically; the resultant of two perpendicular fields. Field lines are traced with a fourth-order Runge-Kutta step from a two-pole model (and a uniform earth field); the 21 self-checks include that the field is zero (below 10⁻⁶) at every marked neutral point and that the neutral points lie on the equatorial line (N north) or the axial line (N south). Each SVG was rendered to PNG and checked by eye.
- **Narration:** 13–44 words per slide (mean 30); no symbols, formulae or unit abbreviations.

## Question bank (67 items, 152 marks)
| Type | Count | Marks |
|---|---|---|
| mcq | 26 (8 are deck-check items) | 26 |
| assertion-reason | 4 | 4 |
| short-1 (terms) | 2 | 2 |
| true-false | 4 | 4 |
| fill-blank | 2 (one with five blanks) | 6 |
| numerical | 6 | 6 |
| match-5 | 1 | 5 |
| short-2 | 9 | 18 |
| short-3 | 7 | 21 |
| long-10 (structured) | 6 | 60 |

- **Structured questions:** 6, each 10 marks in 4 to 6 parts with part marks in the stem: nails hanging from a magnet (with figure), a lettered field-line diagram, the earth as a magnet (with figure), a magnet with N pole north (lettered figure, distance numerical), a magnet with N pole south (lettered figure, distances and a stronger magnet), and the resultant of two fields at a point.
- **Difficulty:** d1 17 · d2 36 · d3 12 · d4 2 (the N-pole-south and resultant structured questions).
- **Competency:** recall 15 · understanding 18 · application 26 · analysis 8. Application or higher is **51% of items**, inside the 45–65% lint band. No tag was changed.
- **Assertion-reason keys:** a b c d (all four options used).

## Chapter tests (ICSE 9 default blueprints)
- **Short (20 marks, 30 min):** A: 4 mcq, 1 assertion-reason, 1 short-2, 1 short-3 · B: 2 structured (10) (attempt 1 of 2).
- **Long (40 marks, 60 min):** A: 7 mcq, 1 assertion-reason, 3 short-2, 2 short-3 · B: 3 structured (10) (attempt 2 of 3).

## Verifier pass
- Every question was re-solved from its stem; every distance, resultant and angle is computed and asserted in `calc.mjs`, and the build's scripted re-solve checks all pass.
- Structured-question schemes sum to 10 and part marks are shown in each stem. Test items were chosen so that no item states the answer to another in the same test: the short test's Section A avoids field lines and neutral points (its structured questions), and the long test's Section A has only field-line items (its structured questions are induction, the earth and neutral points on the axial line).

## For a reviewer
- **Neutral points:** for the N pole pointing north the field of the magnet on its equatorial line points south, opposite to the earth's horizontal field (which points north), so the neutral points are on the equatorial line, one east and one west. For the N pole pointing south the magnet's field along the axis points south beyond both poles, so the neutral points are on the axial line, one beyond each pole. Both are as in the ICSE textbooks and the figures are computed to agree.
- **Pole position:** the figures use a pole distance of 80% of the length (poles inside the ends); the numericals say "taking the poles at the ends", so the textbook triangle (half length, distance to the point) applies and gives round numbers (6-8-10, 7-24-25, 3-4-5).
- **Earth's field:** only the horizontal field of the earth is used; the dip and the declination are not introduced beyond one clause in the notes that the magnetic meridian differs a little from the geographic one.
- **Wording:** "magnetic S pole near the geographic north" (rather than "north magnetic pole") is used throughout; some books say "the earth's magnetic north pole is in the north" and mean the geographic location, which the notes explain.
- **Not asked:** the field of a current, electromagnets, magnetic dip, field strength in tesla, and the working of a compass beyond "a small pivoted magnet".
