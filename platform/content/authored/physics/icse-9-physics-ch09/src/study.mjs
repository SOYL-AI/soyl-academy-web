// ICSE 9 Physics ch09 Spherical Mirrors: notes and flashcards. The derivation of the mirror formula and scale drawing are removed
// topics and are not taught.
import { T, table, unit, PROV, r } from '../../icse-9-physics-ch01/src/lib.mjs';
import { CASES, D2_EX1 } from './calc.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });
const size = (m) => (!Number.isFinite(m) ? 'highly enlarged' : Math.abs(m) < 1 ? 'diminished' : Math.abs(m) === 1 ? 'same size' : 'enlarged');

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Spherical Mirrors — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Concave and convex mirrors; pole, centre of curvature, focus; f = R/2',
      r`A **spherical mirror** is a part of a hollow sphere whose one surface is silvered. If the **inner** (hollow) surface reflects, it is a **concave** (converging) mirror; if the **outer** (bulging) surface reflects, it is a **convex** (diverging) mirror.

- **Pole (P):** the middle point of the mirror surface.
- **Centre of curvature (C):** the centre of the sphere of which the mirror is a part. **Radius of curvature (R):** the radius of that sphere, R = PC.
- **Principal axis:** the straight line through P and C.
- **Principal focus (F):** the point on the axis where rays parallel to the axis meet (concave: real focus in front) or from which they appear to come (convex: virtual focus behind). **Focal length (f):** the distance PF.
- **f = R/2** is used without proof. For a concave mirror f and R are negative in the Cartesian convention, for a convex mirror positive.

The derivation of f = R/2 and of the mirror formula is not required in Class IX.`,
      [kt('Pole', 'The middle point of the surface of a spherical mirror.'), kt('Centre of curvature', 'The centre of the sphere of which the mirror is a part.'), kt('Principal focus', 'The point on the principal axis at which rays parallel to the axis meet (concave) or appear to meet (convex) after reflection.'), kt('Focal length', 'The distance between the pole and the principal focus.')],
      [fm(r`f = \dfrac{R}{2}`, 'Focal length and radius of curvature')],
      table(['', 'Concave', 'Convex'], [['Reflecting surface', 'Inner', 'Outer'], ['Parallel rays', 'Converge at a real F', 'Appear to diverge from a virtual F'], ['f and R (Cartesian)', 'Negative', 'Positive']], 'Table comparing concave and convex mirrors'),
      [1],
    ),
    sec(
      '2. Paths of specific rays',
      r`Three rays whose paths are known are used to draw images:

1. A ray **parallel to the principal axis** is reflected **through F** (concave) or **as if coming from F** (convex).
2. A ray **through F** (concave), or directed **towards F** (convex), is reflected **parallel to the principal axis**.
3. A ray **through C**, or directed **towards C**, falls along the normal and is reflected **back along its own path**.

**Parallel rays meeting on the focal plane:** a beam of parallel rays at a small angle to the principal axis is reflected so that the rays meet at a point on the **focal plane** (the plane through F perpendicular to the principal axis). A very distant object gives parallel rays, so its image lies **at F**.

Ray diagrams in this chapter are simple sketches; **scale drawing and graphical construction are removed topics**.`,
      [kt('Focal plane', 'The plane through the principal focus at right angles to the principal axis.')],
      [],
      table(['Incident ray', 'Reflected ray'], [['Parallel to the axis', 'Through F (concave); appears to come from F (convex)'], ['Through or towards F', 'Parallel to the axis'], ['Through or towards C', 'Back along its own path']], 'Table of the three specific rays and the reflected ray for each'),
      [2],
    ),
    sec(
      '3. Images formed by a concave mirror',
      r`The image depends on where the object is placed.

| Object | Image position | Nature | Size |
|---|---|---|---|
| At infinity | At F | Real, inverted | Highly diminished (a point) |
| Beyond C | Between F and C | Real, inverted | ${size(CASES[0].m)} |
| At C | At C | Real, inverted | ${size(CASES[1].m)} |
| Between C and F | Beyond C | Real, inverted | ${size(CASES[2].m)} |
| At F | At infinity | Real, inverted | ${size(CASES[3].m)} |
| Between F and P | Behind the mirror | Virtual, erect | ${size(CASES[4].m)} |

The sizes follow from the mirror formula (for f = −10 cm, magnifications ${CASES[0].m}, ${CASES[1].m}, ${CASES[2].m} and +${CASES[4].m} for u = −30, −20, −15 and −5 cm). A **real** image can be caught on a screen and is inverted; a **virtual** image cannot and is erect. Draw each diagram with two of the rays of section 2.`,
      [kt('Real image', 'An image formed where the reflected rays actually meet; it can be received on a screen.'), kt('Virtual image', 'An image formed where the reflected rays only appear to meet; it cannot be received on a screen.')],
      [],
      table(['Object', 'Image'], [['Beyond C', 'Between F and C, diminished'], ['At C', 'At C, same size'], ['Between C and F', 'Beyond C, enlarged'], ['At F', 'At infinity'], ['Between F and P', 'Behind the mirror, enlarged, erect']], 'Table of the image position for each object position for a concave mirror'),
      [3],
    ),
    sec(
      '4. The convex mirror; uses of mirrors',
      r`**Image in a convex mirror:** for every position of the object the image is **virtual, erect and diminished** and lies **between P and F, behind the mirror**. The rays diverge after reflection and only their backward extensions meet, so no real image can form; as the object moves far away the image moves towards F, and its size decreases.

**Uses of a concave mirror**
- **Shaving mirror, make-up mirror, dentist's mirror:** the object is inside F, so the image is erect and enlarged.
- **Torch, car headlight:** the lamp is at F, so the reflected light is a parallel beam.
- **Solar cooker or furnace:** parallel sunlight is focused at F.

**Uses of a convex mirror**
- **Rear-view mirror of a vehicle:** the image is erect and the **field of view is wide**.
- **Street light reflector, security mirror in a shop:** a wide area is covered.`,
      [kt('Field of view', 'The extent of the region that can be seen in a mirror.')],
      [],
      table(['Mirror', 'Use', 'Reason'], [['Concave', 'Shaving mirror', 'Erect, enlarged image inside F'], ['Concave', 'Headlight', 'Lamp at F gives a parallel beam'], ['Convex', 'Rear-view mirror', 'Erect image with a wide field of view']], 'Table of three uses of concave and convex mirrors and the reason for each'),
      [4],
    ),
    sec(
      '5. Cartesian sign convention; the mirror formula and magnification',
      r`**Cartesian sign convention** (used throughout)
- The **pole** is the origin and the **principal axis** is the x-axis; light travels from left to right and the object is placed on the left.
- Distances measured **against** the direction of the incident light (to the left of P) are **negative**; **along** it (to the right of P) are **positive**.
- Heights **above** the principal axis are **positive**; below it, negative.
- Therefore **u is negative** for a real object; **f and R are negative for a concave mirror** and **positive for a convex mirror**; **v is negative for a real image** of a concave mirror and **positive for a virtual image**.

**Mirror formula and magnification** (used without derivation; direct numericals only)
$$\dfrac{1}{v} + \dfrac{1}{u} = \dfrac{1}{f} \qquad m = \dfrac{h'}{h} = -\dfrac{v}{u}$$
A **negative m** means an inverted (real) image, a **positive m** an erect (virtual) image; $|m| > 1$ enlarged, $|m| < 1$ diminished.

**Worked check.** Concave mirror, f = ${D2_EX1.f} cm, u = ${D2_EX1.u} cm, object 4 cm tall: 1/v = 1/f − 1/u gives v = ${D2_EX1.v} cm (real, in front), m = ${D2_EX1.m}, image ${D2_EX1.h2} cm (inverted).`,
      [kt('Magnification', 'The ratio of the height of the image to the height of the object, m = h′/h = −v/u.')],
      [fm(r`\dfrac{1}{v} + \dfrac{1}{u} = \dfrac{1}{f}`, 'Mirror formula'), fm(r`m = \dfrac{h'}{h} = -\dfrac{v}{u}`, 'Magnification')],
      table(['Quantity', 'Concave mirror', 'Convex mirror'], [['f and R', 'Negative', 'Positive'], ['u', 'Negative', 'Negative'], ['v (real image)', 'Negative', 'Not formed'], ['v (virtual image)', 'Positive', 'Positive']], 'Table of the signs of f, R, u and v'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Using the wrong sign convention: u is negative, f is negative for a concave mirror and positive for a convex mirror.
- Drawing the image of a convex mirror in front of the mirror, or a real image with dotted lines.
- Leaving out arrows on rays, or the dotted backward extensions for virtual images.
- Forgetting that m is negative for an inverted image and quoting v without its sign.
- Teaching or using scale drawing or the derivation of the mirror formula: both are removed from Class IX.

**How marks are usually awarded**
- Ray diagrams (2 to 3 marks): two rays with arrows, correct position of the image, labels P, F, C.
- Image description (2 marks): position, nature, size.
- Numericals (2 to 3 marks): sign convention, formula with substitution, answer with sign and unit.
- Uses (2 marks): the mirror and the reason (shaving mirror inside F, rear-view mirror wide field).`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Concave mirror?', 'A spherical mirror whose inner (hollow) surface reflects; it converges parallel rays.', 'definition', 1),
    fc(2, 'Convex mirror?', 'A spherical mirror whose outer (bulging) surface reflects; it diverges parallel rays.', 'definition', 1),
    fc(3, 'Pole?', 'The middle point of the mirror surface.', 'definition', 1),
    fc(4, 'Centre of curvature?', 'The centre of the sphere of which the mirror is a part.', 'definition', 1),
    fc(5, 'Radius of curvature?', 'The distance between the pole and the centre of curvature.', 'definition', 1),
    fc(6, 'Principal focus?', 'The point where rays parallel to the axis meet (or appear to meet) after reflection.', 'definition', 1),
    fc(7, 'Focal length?', 'The distance between the pole and the principal focus.', 'definition', 1),
    fc(8, 'f in terms of R?', 'f = R/2.', 'formula', 1),
    fc(9, 'Principal axis?', 'The line through the pole and the centre of curvature.', 'definition', 1),
    fc(10, 'Ray parallel to the axis, concave mirror?', 'Reflected through F.', 'fact', 2),
    fc(11, 'Ray through F, concave mirror?', 'Reflected parallel to the axis.', 'fact', 2),
    fc(12, 'Ray through C?', 'Reflected back along its own path.', 'fact', 2),
    fc(13, 'Ray parallel to the axis, convex mirror?', 'Reflected as if coming from F behind the mirror.', 'fact', 2),
    fc(14, 'Parallel rays at a small angle to the axis?', 'Meet at a point on the focal plane.', 'concept', 2),
    fc(15, 'Image of an object at infinity?', 'At F, real, inverted, highly diminished.', 'fact', 2),
    fc(16, 'Concave: object beyond C?', 'Image between F and C; real, inverted, diminished.', 'fact', 3),
    fc(17, 'Concave: object at C?', 'Image at C; real, inverted, same size.', 'fact', 3),
    fc(18, 'Concave: object between C and F?', 'Image beyond C; real, inverted, enlarged.', 'fact', 3),
    fc(19, 'Concave: object at F?', 'Image at infinity; real, inverted, highly enlarged.', 'fact', 3),
    fc(20, 'Concave: object between F and P?', 'Image behind the mirror; virtual, erect, enlarged.', 'fact', 3),
    fc(21, 'Real image?', 'Formed where rays actually meet; it can be caught on a screen.', 'definition', 3),
    fc(22, 'Image formed by a convex mirror?', 'Always virtual, erect and diminished, between P and F.', 'fact', 4),
    fc(23, 'Why does a convex mirror never form a real image?', 'It diverges the rays, so they never meet in front.', 'concept', 4),
    fc(24, 'Mirror used for shaving?', 'Concave, with the face inside F.', 'fact', 4),
    fc(25, 'Mirror used as a rear-view mirror?', 'Convex: erect image and a wide field of view.', 'fact', 4),
    fc(26, 'Why is a lamp placed at F in a torch?', 'The reflected rays form a parallel beam.', 'concept', 4),
    fc(27, 'Cartesian convention: u for a real object?', 'Negative.', 'fact', 5),
    fc(28, 'Cartesian convention: f of a concave mirror?', 'Negative (convex: positive).', 'fact', 5),
    fc(29, 'Mirror formula?', '1/v + 1/u = 1/f.', 'formula', 5),
    fc(30, 'Magnification of a mirror?', 'm = h′/h = −v/u; negative means inverted.', 'formula', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
