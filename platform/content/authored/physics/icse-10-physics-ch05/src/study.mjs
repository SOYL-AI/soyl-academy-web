// ICSE 10 Physics ch05 Refraction through Lenses — notes and flashcards.
import { T, table, svgV, unit, PROV, r } from './lib.mjs';
import { CONVEX_AT_F } from './svgs.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Refraction through Lenses — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Lenses and their terms',
      `- **Lens:** a transparent medium bounded by two surfaces, at least one curved (usually spherical).
- **Convex (converging):** thicker at the middle — biconvex, plano-convex, concavo-convex. **Concave (diverging):** thinner at the middle — biconcave, plano-concave, convexo-concave.
- **Lens as prisms:** a convex lens behaves like prisms with bases towards the axis (light bends towards the axis); a concave lens like prisms with apexes towards the axis (light bends away).
- **Centres of curvature, principal axis, optical centre O** (ray through it is undeviated), **principal foci F₁ and F₂**, **focal plane** (plane through F normal to the axis), **focal length f** (distance OF).
- A lens has two principal foci, one on each side; for a thin lens in air both focal lengths are equal.`,
      [kt('Optical centre', 'The point on the principal axis of a lens through which a ray of light passes without deviation.'), kt('Principal focus (convex lens)', 'The point on the principal axis where rays parallel to the axis meet after refraction.'), kt('Focal length', 'The distance between the optical centre and a principal focus of a lens.')],
      [],
      table(['Feature', 'Convex lens', 'Concave lens'], [['Shape', 'Thick middle', 'Thin middle'], ['Parallel beam', 'Converges to F₂', 'Diverges as if from F₁'], ['Focus', 'Real', 'Virtual'], ['Prism picture', 'Bases towards axis', 'Apexes towards axis']], 'Table comparing a convex and a concave lens'),
      [1],
    ),
    sec(
      '2. Images formed by a convex lens',
      `**Principal rays:** (1) parallel to the axis → through F₂; (2) through O → undeviated; (3) through F₁ → parallel to the axis. Two rays fix the image; real where rays meet, virtual where they appear to meet.

| Object position | Image position | Nature and size | Use |
|---|---|---|---|
| At infinity | At F₂ | Real, inverted, highly diminished | Burning glass, telescope objective |
| Beyond 2F₁ | Between F₂ and 2F₂ | Real, inverted, diminished | Camera |
| At 2F₁ | At 2F₂ | Real, inverted, same size | Photocopier |
| Between F₁ and 2F₁ | Beyond 2F₂ | Real, inverted, magnified | Projector |
| At F₁ | At infinity | Real, inverted, highly magnified | Searchlight beam |
| Between O and F₁ | Same side, beyond the object | Virtual, erect, magnified | Magnifying glass |`,
      [kt('Real image', 'An image formed where refracted rays actually meet; it can be caught on a screen.'), kt('Virtual image', 'An image formed where refracted rays only appear to meet when produced backwards; it cannot be caught on a screen.')],
      [],
      table(['Object moves', 'Real image'], [['From infinity towards 2F₁', 'Moves from F₂ towards 2F₂ and grows'], ['From 2F₁ towards F₁', 'Moves from 2F₂ towards infinity and grows']], 'Table of how the real image of a convex lens moves as the object approaches'),
      [2],
      [svgV(CONVEX_AT_F, 'Convex lens with the object at the focus: the refracted rays are parallel, so the image is at infinity', 'Object at F: image at infinity.')],
    ),
    sec(
      '3. Images formed by a concave lens',
      `- Ray parallel to the axis diverges as if from F₁; ray through O goes straight on.
- The refracted rays never meet; produced back, they meet **between F₁ and O**.
- For **every** position of a real object the image is **virtual, erect, diminished**, between F₁ and O, on the object side. For an object at infinity the image is at F₁, highly diminished.
- A quick test: a lens that always gives a smaller, upright image of objects at all distances is concave.`,
      [kt('Diverging lens', 'A lens that spreads a parallel beam so that the rays appear to come from its principal focus; a concave lens.')],
      [],
      table(['Object', 'Image (concave lens)'], [['At infinity', 'At F₁, highly diminished, virtual, erect'], ['Anywhere in front', 'Between F₁ and O, diminished, virtual, erect']], 'Table of images formed by a concave lens'),
      [3],
    ),
    sec(
      '4. Sign convention, lens formula and magnification',
      r`**New Cartesian sign convention:** distances from O; along the incident light (left to right) positive, against it negative; heights up positive, down negative. Hence $u < 0$ for a real object; $f > 0$ convex, $f < 0$ concave; $v > 0$ real image, $v < 0$ virtual image.

**Lens formula:** $\dfrac{1}{v} - \dfrac{1}{u} = \dfrac{1}{f}$. **Magnification:** $m = \dfrac{h_{2}}{h_{1}} = \dfrac{v}{u}$ — negative for real, inverted images; positive for virtual, erect ones.

Method: list $u$, $v$, $f$ with signs → substitute → solve → interpret the signs.`,
      [kt('Linear magnification', 'The ratio of the height of the image to the height of the object, equal to v divided by u for a lens.')],
      [fm(r`\frac{1}{v} - \frac{1}{u} = \frac{1}{f}`, 'Lens formula'), fm(r`m = \frac{h_{2}}{h_{1}} = \frac{v}{u}`, 'Magnification')],
      table(['u', 'f', 'v', 'm'], [['−30 cm', '+10 cm', '+15 cm', '−0.5'], ['−6 cm', '+10 cm', '−15 cm', '+2.5'], ['−20 cm', '−10 cm', '−6.7 cm', '+0.33']], 'Table of three solved lens cases with object distance, focal length, image distance and magnification'),
      [4],
    ),
    sec(
      '5. Power of a lens; magnifying glass; uses',
      r`- **Power** $P = \dfrac{1}{f}$ with $f$ in metres; unit **dioptre (D)**; $1\ \text{D}$ is the power of a lens of focal length 1 m. Convex: $P > 0$; concave: $P < 0$.
- **Magnifying glass (simple microscope):** convex lens of short focal length; object between O and F; image virtual, erect, magnified, usually at about 25 cm from the eye. Shorter focal length → greater magnification.
- **Uses:** convex — magnifying glass, camera, projector, microscope and telescope lenses, spectacles for long sight; concave — spectacles for short sight, peephole, lens combinations.`,
      [kt('Power of a lens', 'The reciprocal of the focal length of a lens expressed in metres; it measures the converging or diverging ability of the lens.'), kt('Dioptre', 'The power of a lens whose focal length is one metre.')],
      [fm(r`P = \frac{1}{f\ (\text{m})} = \frac{100}{f\ (\text{cm})}`, 'Power of a lens')],
      table(['Focal length', 'Power'], [['+25 cm', '+4 D'], ['+10 cm', '+10 D'], ['−50 cm', '−2 D']], 'Table of three focal lengths and the corresponding powers'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Taking u as positive for a real object.
- Forgetting that f is negative for a concave lens.
- Using f in cm to calculate power (power needs metres).
- Drawing virtual rays or images with full lines; missing arrows on rays.
- Calling the magnifying-glass image “real”.

**How marks are usually awarded**
- Ray diagrams: two correct rays with arrows (1), image correctly placed and labelled (1).
- Numericals: signed data and formula (1), substitution (1), answer with unit and interpretation (1).
- Nature of image: real or virtual, erect or inverted, magnified or diminished — all three words.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Convex lens shape?', 'Thicker at the middle than at the edges.', 'definition', 1),
    fc(2, 'Concave lens shape?', 'Thinner at the middle than at the edges.', 'definition', 1),
    fc(3, 'Lens-as-prisms picture of a convex lens?', 'Prisms with bases towards the axis, so light bends towards the axis.', 'concept', 1),
    fc(4, 'Optical centre?', 'Point through which a ray passes undeviated.', 'definition', 1),
    fc(5, 'Principal focus of a convex lens?', 'Point where rays parallel to the axis meet after refraction.', 'definition', 1),
    fc(6, 'Focal plane?', 'Plane through the focus, normal to the principal axis.', 'definition', 1),
    fc(7, 'Ray parallel to the axis (convex)?', 'Passes through F₂ after refraction.', 'diagram', 2),
    fc(8, 'Ray through F₁ (convex)?', 'Emerges parallel to the axis.', 'diagram', 2),
    fc(9, 'Object beyond 2F (convex)?', 'Image between F and 2F: real, inverted, diminished.', 'fact', 2),
    fc(10, 'Object at 2F (convex)?', 'Image at 2F: real, inverted, same size.', 'fact', 2),
    fc(11, 'Object between F and 2F (convex)?', 'Image beyond 2F: real, inverted, magnified.', 'fact', 2),
    fc(12, 'Object at F (convex)?', 'Image at infinity: real, inverted, highly magnified.', 'fact', 2),
    fc(13, 'Object within F (convex)?', 'Virtual, erect, magnified image on the same side.', 'fact', 2),
    fc(14, 'Projector: where is the slide?', 'Between F and 2F, placed upside down.', 'example', 2),
    fc(15, 'Image by a concave lens?', 'Always virtual, erect, diminished, between F₁ and O.', 'fact', 3),
    fc(16, 'Why is a concave lens image always virtual?', 'Refracted rays diverge and never meet.', 'concept', 3),
    fc(17, 'Sign of u for a real object?', 'Negative.', 'fact', 4),
    fc(18, 'Sign of f: convex, concave?', 'Positive; negative.', 'fact', 4),
    fc(19, 'Lens formula?', '1/v − 1/u = 1/f.', 'formula', 4),
    fc(20, 'Magnification of a lens?', 'm = h₂/h₁ = v/u.', 'formula', 4),
    fc(21, 'Negative m means…', 'Real, inverted image.', 'concept', 4),
    fc(22, 'Positive v means…', 'Real image on the other side of the lens.', 'concept', 4),
    fc(23, 'Power of a lens?', 'P = 1/f, with f in metres.', 'formula', 5),
    fc(24, 'Unit of power?', 'Dioptre (D).', 'fact', 5),
    fc(25, 'One dioptre?', 'Power of a lens of focal length 1 m.', 'definition', 5),
    fc(26, 'Sign of power of a concave lens?', 'Negative.', 'fact', 5),
    fc(27, 'Shorter focal length means…', 'Greater power.', 'concept', 5),
    fc(28, 'Magnifying glass?', 'Convex lens of short focal length, object within F.', 'definition', 5),
    fc(29, 'Lens for short sight?', 'Concave.', 'example', 5),
    fc(30, 'Exam tip: numericals', 'Write u, v, f with signs before substituting.', 'exam-tip', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
