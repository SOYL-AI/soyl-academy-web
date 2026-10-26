// ch09 notes and flashcards.
import { T, table, unit, PROV, r } from '../../cbse-10-science-ch06/src/lib.mjs';
import { V, concaveTable, convexLensTable } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, visual, topics, visuals = [], formulas = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });
const fm = (latex, label) => ({ latex, label });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Light – Reflection and Refraction — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Reflection and spherical mirrors',
      `**Laws of reflection:** (1) the angle of incidence equals the angle of reflection; (2) the incident ray, the reflected ray and the normal at the point of incidence lie in the same plane. They apply to all reflecting surfaces. A plane mirror forms a virtual, erect, same-size, laterally inverted image as far behind the mirror as the object is in front.

A **spherical mirror** is part of a hollow sphere: **concave** if the reflecting surface curves inwards, **convex** if it bulges outwards.

- **Pole (P):** centre of the reflecting surface.
- **Centre of curvature (C):** centre of the sphere of which the mirror is part (in front of a concave mirror, behind a convex one). **Radius of curvature (R) = PC.**
- **Principal axis:** the line through P and C.
- **Principal focus (F):** the point where rays parallel to the axis meet after reflection (concave) or appear to diverge from (convex). **Focal length f = PF.**
- For mirrors of small aperture, **R = 2f**.`,
      [kt('Pole', 'The centre of the reflecting surface of a spherical mirror.'), kt('Principal focus', 'The point on the axis where parallel rays meet after reflection, or appear to come from.'), kt('Aperture', 'The diameter of the reflecting surface of the mirror.')],
      V.terms,
      [1],
      [],
      [fm('R = 2f', 'Radius of curvature and focal length')],
    ),
    sec(
      '2. Images formed by a concave mirror',
      `**Ray rules:** a ray parallel to the axis reflects through F; a ray through F reflects parallel; a ray through C reflects back along itself; a ray at P reflects at an equal angle on the other side of the axis. Any two rays locate the image. Virtual rays and images are drawn dashed.

The table below summarises all six object positions. Every **real** image from a single mirror is **inverted**; the only virtual image (object between F and P) is **erect and enlarged**.`,
      [kt('Real image', 'Formed where reflected or refracted rays actually meet; can be caught on a screen; inverted for a single mirror or lens.'), kt('Virtual image', 'Formed where rays only appear to meet when extended backwards; cannot be caught on a screen.')],
      concaveTable,
      [1],
      [V.mBeyond, V.mCF, V.mFP],
    ),
    sec(
      '3. Convex mirrors and uses of mirrors',
      `A **convex mirror** always forms a **virtual, erect, diminished** image between P and F behind the mirror (at F, point-sized, for an object at infinity).

**Uses:** concave mirrors in **torches, searchlights and headlights** (bulb at F gives a parallel beam), **shaving and make-up mirrors** (enlarged erect image), **dentists' mirrors**, and **solar furnaces** (concentrate sunlight). Convex mirrors as **rear-view (wing) mirrors** of vehicles: always erect, diminished, giving a **wider field of view**.`,
      [kt('Field of view', 'The extent of the scene that can be seen in a mirror; larger for a convex mirror.')],
      V.mConvex,
      [1, 2],
      [V.mConvexInf, table(['Mirror', 'Use'], [['Concave', 'Torches, headlights, shaving mirrors, dentists, solar furnaces'], ['Convex', 'Rear-view mirrors of vehicles']], 'Table of uses of concave and convex mirrors')],
    ),
    sec(
      '4. Sign convention, mirror formula and magnification',
      `**New Cartesian sign convention:** the pole is the origin and the principal axis is the x-axis; the object is placed to the left; distances in the direction of the incident light are positive and against it negative; heights above the axis are positive and below it negative.

For mirrors: u is negative; f is **negative for concave** and **positive for convex**; v is negative for a real image and positive for a virtual image.

**Magnification** m = h′/h = −v/u. Negative m → real, inverted; positive m → virtual, erect; |m| > 1 enlarged, |m| < 1 diminished. (Derivation of the formula is not required.)`,
      [kt('Magnification', 'Ratio of the height of the image to the height of the object.')],
      V.sign,
      [2],
      [],
      [fm(r`\dfrac{1}{v} + \dfrac{1}{u} = \dfrac{1}{f}`, 'Mirror formula'), fm(r`m = \dfrac{h'}{h} = -\dfrac{v}{u}`, 'Magnification by a mirror')],
    ),
    sec(
      '5. Refraction and its laws',
      `**Refraction** is the change in direction of light as it passes obliquely from one medium to another, because its **speed changes**. From a rarer to a denser medium the ray bends **towards** the normal; from denser to rarer, **away** from the normal; along the normal it does not bend.

**Glass slab:** the ray bends towards the normal on entering and away on leaving; the **emergent ray is parallel to the incident ray** (angle of emergence = angle of incidence) but **laterally shifted**.

**Laws of refraction:** (1) the incident ray, the refracted ray and the normal at the point of incidence lie in the same plane; (2) for a given pair of media and a given colour of light, sin i / sin r is constant (**Snell's law**). The constant is the refractive index of the second medium with respect to the first.`,
      [kt('Refraction', 'Change in the direction of light when it passes obliquely from one medium into another.'), kt('Lateral shift', 'The sideways displacement of the emergent ray from the line of the incident ray in a glass slab.')],
      V.slab,
      [3],
      [],
      [fm(r`\dfrac{\sin i}{\sin r} = n_{21}`, 'Snell’s law')],
    ),
    sec(
      '6. Refractive index',
      `The **absolute refractive index** of a medium is n = c/v, where c = 3 × 10⁸ m/s is the speed of light in vacuum and v its speed in the medium. The **relative refractive index** of medium 2 with respect to medium 1 is n₂₁ = v₁/v₂ = n₂/n₁.

A medium with a larger refractive index is **optically denser** (light travels more slowly in it). Optical density is **not** mass density: kerosene (n = 1.44) floats on water (n = 1.33) but is optically denser.

| Medium | n (approx.) |
|---|---|
| Air | 1.0003 |
| Water | 1.33 |
| Kerosene | 1.44 |
| Crown glass | 1.52 |
| Diamond | 2.42 |`,
      [kt('Absolute refractive index', 'Ratio of the speed of light in vacuum to its speed in the medium.'), kt('Optically denser medium', 'The medium with the higher refractive index, in which light travels more slowly.')],
      table(['Speed of light', 'Value'], [['In vacuum', r`$3 \times 10^8$ m/s`], ['In glass (n = 1.5)', r`$2 \times 10^8$ m/s`], ['In water (n = 1.33)', r`about $2.26 \times 10^8$ m/s`]], 'Table of the speed of light in vacuum, glass and water'),
      [3],
      [],
      [fm(r`n = \dfrac{c}{v}`, 'Absolute refractive index'), fm(r`n_{21} = \dfrac{v_1}{v_2} = \dfrac{n_2}{n_1}`, 'Relative refractive index')],
    ),
    sec(
      '7. Spherical lenses and the images they form',
      `A **convex (converging) lens** is thicker in the middle; a **concave (diverging) lens** is thinner in the middle. Terms: **optical centre O** (rays through it pass undeviated), principal axis, two principal foci **F₁** and **F₂**, focal length **f**, and the points **2F₁**, **2F₂**.

**Ray rules:** parallel to the axis → through F₂ (convex) or appearing to come from F₁ (concave); through F₁ (convex) or towards F₂ (concave) → emerges parallel; through O → straight on.

Convex-lens images follow the table below. A **concave lens** always gives a **virtual, erect, diminished** image between F₁ and O (at F₁ for an object at infinity).`,
      [kt('Optical centre', 'The central point of a lens; a ray through it passes without deviation.'), kt('Converging lens', 'A convex lens, which bends parallel rays to meet at a focus.')],
      convexLensTable,
      [4],
      [V.lBeyond, V.lFO, V.lConcave],
    ),
    sec(
      '8. Lens formula, magnification and power',
      `With the optical centre as origin and the same sign convention: f is **positive for a convex lens** and **negative for a concave lens**. For a real image (convex lens) v is positive; for a virtual image v is negative.

**Magnification** for a lens: m = h′/h = v/u (no minus sign).

**Power** P = 1/f with f in **metres**; unit **dioptre (D)**, 1 D = 1 m⁻¹. Convex lenses have positive power, concave lenses negative power. For lenses **in contact**, P = P₁ + P₂ + P₃ + …`,
      [kt('Power of a lens', 'The reciprocal of its focal length in metres; a measure of how strongly it converges or diverges light.'), kt('Dioptre', 'The unit of power of a lens: the power of a lens of focal length 1 m.')],
      table(['Lens', 'f', 'P'], [['Convex', '+20 cm', '+5 D'], ['Concave', '−50 cm', '−2 D']], 'Table of two example lenses with focal length and power'),
      [5],
      [],
      [fm(r`\dfrac{1}{v} - \dfrac{1}{u} = \dfrac{1}{f}`, 'Lens formula'), fm(r`m = \dfrac{h'}{h} = \dfrac{v}{u}`, 'Magnification by a lens'), fm(r`P = \dfrac{1}{f}`, 'Power (f in metres)'), fm(r`P = P_1 + P_2 + P_3 + \dots`, 'Lenses in contact')],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Using a positive focal length for a concave mirror, or a negative one for a convex lens.
- Mixing up the formulas: mirror 1/v + 1/u = 1/f; lens 1/v − 1/u = 1/f.
- Writing m = −v/u for a lens (it is v/u) or m = v/u for a mirror (it is −v/u).
- Forgetting to convert centimetres to metres before calculating power.
- Ray diagrams without arrowheads, or virtual rays drawn as solid lines.
- Calling kerosene optically rarer than water because it floats.

**How marks are usually awarded**
- 1-mark items: correct option, sign, value with unit, or term.
- 2–3-mark numericals: given values with signs and formula (1) + substitution and answer with unit (1) + nature of the image or lens (1).
- Ray diagrams: correct rays with arrows (1) + image located and drawn (1) + position, size and nature stated (1).
- 5-mark answers: often a ray diagram (2) + a numerical (2) + a use or explanation (1).`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Laws of reflection?', 'Angle of incidence = angle of reflection; incident ray, reflected ray and normal lie in one plane.', 'definition', 1),
    fc(2, 'Concave vs convex mirror?', 'Concave: reflecting surface curves inwards (converges light). Convex: bulges outwards (diverges light).', 'concept', 1),
    fc(3, 'Relation between R and f?', 'R = 2f (for mirrors of small aperture).', 'formula', 1),
    fc(4, 'Concave mirror: ray parallel to the axis?', 'Reflects through the principal focus F.', 'fact', 1),
    fc(5, 'Concave mirror: ray through C?', 'Reflects back along the same path.', 'fact', 1),
    fc(6, 'Concave mirror, object at C?', 'Image at C: real, inverted, same size.', 'fact', 1),
    fc(7, 'Concave mirror, object between F and P?', 'Image behind the mirror: virtual, erect, enlarged.', 'fact', 1),
    fc(8, 'Convex mirror image?', 'Always virtual, erect, diminished, between P and F behind the mirror.', 'fact', 1),
    fc(9, 'Why convex mirrors for rear-view?', 'Always erect, diminished images and a wider field of view.', 'example', 2),
    fc(10, 'Why a concave reflector in a torch?', 'Bulb at F, so reflected rays form a parallel beam.', 'example', 2),
    fc(11, 'Mirror formula?', '1/v + 1/u = 1/f.', 'formula', 2),
    fc(12, 'Magnification by a mirror?', 'm = h′/h = −v/u.', 'formula', 2),
    fc(13, 'Sign of f: concave mirror, convex mirror?', 'Concave negative; convex positive.', 'fact', 2),
    fc(14, 'Negative m means…?', 'Real and inverted image.', 'concept', 2),
    fc(15, 'Define refraction.', 'Change in direction of light when it passes obliquely from one medium to another, due to a change in speed.', 'definition', 3),
    fc(16, 'Air to glass: bends which way?', 'Towards the normal.', 'fact', 3),
    fc(17, 'Glass slab: emergent ray?', 'Parallel to the incident ray, with a lateral shift.', 'diagram', 3),
    fc(18, 'Snell’s law?', 'sin i / sin r = constant (for a given pair of media and colour of light).', 'formula', 3),
    fc(19, 'Absolute refractive index?', 'n = c/v (speed in vacuum ÷ speed in the medium).', 'formula', 3),
    fc(20, 'Speed of light in glass of n = 1.5?', '2 × 10⁸ m/s.', 'example', 3),
    fc(21, 'Is kerosene optically denser than water?', 'Yes (n = 1.44 > 1.33), though it is less dense by mass.', 'concept', 3),
    fc(22, 'Convex lens: ray through O?', 'Passes undeviated.', 'fact', 4),
    fc(23, 'Convex lens, object at 2F₁?', 'Image at 2F₂: real, inverted, same size.', 'fact', 4),
    fc(24, 'Convex lens as a magnifying glass?', 'Object between F₁ and O: virtual, erect, enlarged image.', 'example', 4),
    fc(25, 'Concave lens image?', 'Always virtual, erect, diminished, between F₁ and O.', 'fact', 4),
    fc(26, 'Lens formula?', '1/v − 1/u = 1/f.', 'formula', 5),
    fc(27, 'Magnification by a lens?', 'm = h′/h = v/u.', 'formula', 5),
    fc(28, 'Power of a lens?', 'P = 1/f, f in metres; unit dioptre (D).', 'formula', 5),
    fc(29, 'Power of a concave lens of f = 50 cm?', '−2 D.', 'example', 5),
    fc(30, 'Lenses in contact?', 'Total power = sum of the powers: P = P₁ + P₂ + …', 'formula', 5),
    fc(31, 'Exam tip: mirror vs lens formula?', 'Mirror: plus sign (1/v + 1/u). Lens: minus sign (1/v − 1/u).', 'exam-tip', 5),
    fc(32, 'Exam tip: ray diagrams?', 'Ruler, arrows on every ray, dashed virtual rays, label P/F/C or O/F₁/F₂, state position, size and nature.', 'exam-tip', 1),
  ],
  status: 'draft',
  provenance: PROV,
};
