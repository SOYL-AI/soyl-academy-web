# ICSE 10 Mathematics, ch18: Constructions: Tangents and Circles

Hand-authored by `claude-opus-5-5 (subject-producer)`; all items `status: "draft"`. Board CISCE (ICSE), Class 10, 2026-27.

## Scope
Topics t01 to t03 exactly as in `platform/catalog/cisce/icse-10/mathematics/syllabus.yaml` (no removed topics):
- t01 constructing tangents to a circle from an external point, measuring their lengths (with concentric circles and tangents at a given angle);
- t02 circumscribing and inscribing a circle on a triangle (acute, right, obtuse), measuring the radius;
- t03 regular hexagon with its circumcircle and incircle.

## Contents
| Part | Count |
|---|---|
| Deck 1 (tangents) | 17 slides, 3 worked examples, 4 checks |
| Deck 2 (circles of a triangle, hexagon) | 21 slides, 5 worked examples, 4 checks |
| Notes | 7 sections, each with visuals |
| Flashcards | 30 |
| Questions | 69: 22 mcq, 6 assertion-reason, 7 true-false, 5 fill-blank, 6 numerical, 4 short-2, 5 short-3, 7 short-4, 7 long-10 |
| Tests | short (20 marks): A = m07, m11, m16, ar4, s301, s303; B = l01, l04. Long (40 marks): A = m12, m13, m14, m17, m18, m19, ar2, ar5, s401, s403, s405; B = l02, l05, l07 |

Difficulty 11 / 22 / 27 / 8 / 1 (d1 to d5); application or higher 58 % of items.

## Verifier record
- `tang.mjs` computes every constructed point as an exact intersection (circle on OP as diameter with the given circle; perpendicular bisectors; angle bisectors; stepped hexagon vertices) and asserts: right angle at each point of contact, PA = PB, PA = sqrt(OP^2 - r^2), angle APB = 2 asin(r/OP), angle AOB + angle APB = 180, circumcentre equidistant from the vertices and R = abc/4K, incentre equidistant from the sides with r = K/s, tangent lengths s - a, s - b, s - c, the circumcentre inside, at the hypotenuse mid-point or outside by triangle type, the hexagon sides, angles, circumcircle and incircle.
- Every figure is drawn from those coordinates (`figs.mjs`); numeric segment labels equal true lengths, degree labels equal measured angles.
- Every measured value in a model answer (lengths to 0.1 cm, angles to the nearest degree) is computed and asserted after rounding; exact working lines are parsed by an exact-fraction checker. 227 re-solve checks pass.
- Build prints NO ERRORS and rebuilds byte-identically; verify-local 0 flags; chapter lint 0 errors, 0 warnings; originality 0 errors.

## Originality
All stems are original, imagined contexts, with their own numbers and wording; no Selina/ML Aggarwal/NCERT text and no specimen or past-paper questions. Distinct from ch15 (Loci) stems.

## Known gaps
- Constructions are described in words with a computed figure of the finished construction; no step-by-step animation.
- Tangent at a point on the circle is only treated as a fact (the syllabus asks for tangents from an external point).
- **2026-11-05:** assertion-reason options reordered to the ICSE 2027 Mathematics specimen paper (511) order and wording; every key re-mapped so each item's meaning is unchanged.
