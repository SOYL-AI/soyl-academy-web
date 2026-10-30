// ch09 notes and flashcards.
import { T, unit, PROV, r } from '../../cbse-12-physics-ch01/src/lib.mjs';
import { V, devPlot } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Ray Optics and Optical Instruments — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Spherical mirrors',
      `**New Cartesian sign convention:** distances from the pole; along the incident light +, against it −; heights above the axis +.

$$\\dfrac{1}{v} + \\dfrac{1}{u} = \\dfrac{1}{f},\\qquad f = \\dfrac{R}{2},\\qquad m = -\\dfrac{v}{u}$$

- Concave: f < 0; real image (v < 0, m < 0) unless the object is inside F (virtual, erect, enlarged).
- Convex: f > 0; image always virtual, erect, diminished; wide field of view (rear-view mirrors).`,
      [kt('Principal focus', 'Point where rays parallel to the axis meet (or appear to diverge from) after reflection.')],
      [fm(r`\dfrac{1}{v} + \dfrac{1}{u} = \dfrac{1}{f},\qquad m = -\dfrac{v}{u}`, 'Mirror formula')],
      V.mConcave,
      [1],
      [V.mConvex],
    ),
    sec(
      '2. Refraction and total internal reflection',
      `**Snell’s law:** $n_1\\sin i = n_2\\sin r$; $n = c/v$. Towards the normal into a denser medium. Apparent depth = real depth / n (near-normal viewing). Frequency unchanged across a boundary.

**Total internal reflection:** from denser to rarer, at the **critical angle** C the refracted ray grazes the surface: $\\sin C = n_2/n_1$ (into air: $1/n$). For $i > C$ all light is reflected. Conditions: denser → rarer **and** i > C.

Critical angles: glass (1.5) ≈ 41.8°, water (1.33) ≈ 48.8°, diamond (2.42) ≈ 24.4°.

**Applications:** optical fibres (core of higher n than cladding; guided by repeated TIR; communication, endoscopy), sparkle of diamonds, totally reflecting prisms (periscopes, binoculars), mirages.`,
      [kt('Critical angle', 'Angle of incidence in the denser medium for which the angle of refraction is 90°.'), kt('Optical fibre', 'A glass fibre that guides light by repeated total internal reflection between core and cladding.')],
      [fm(r`n_1\sin i = n_2\sin r,\qquad \sin C = \dfrac{n_2}{n_1}`, 'Refraction and TIR')],
      V.tir,
      [2],
      [V.fibre],
    ),
    sec(
      '3. Spherical surfaces and lenses',
      `**One spherical surface:** $\\dfrac{n_2}{v} - \\dfrac{n_1}{u} = \\dfrac{n_2 - n_1}{R}$ (paraxial rays).

**Lens maker’s formula** (thin lens of index n in air): $\\dfrac{1}{f} = (n - 1)\\left(\\dfrac{1}{R_1} - \\dfrac{1}{R_2}\\right)$. In a medium of index $n_m$ use $n/n_m$.

**Thin lens formula:** $\\dfrac{1}{v} - \\dfrac{1}{u} = \\dfrac{1}{f}$, $m = \\dfrac{v}{u}$. Convex f > 0; concave f < 0.

**Power:** $P = 1/f$ (f in m), dioptre (D). Thin lenses in contact: $P = P_1 + P_2 + \\dots$, $m = m_1m_2$.`,
      [kt('Dioptre', 'Unit of lens power; the power of a lens of focal length 1 m.'), kt('Optical centre', 'Point of a lens through which rays pass undeviated.')],
      [fm(r`\dfrac{n_2}{v} - \dfrac{n_1}{u} = \dfrac{n_2 - n_1}{R}`, 'Spherical surface'), fm(r`\dfrac{1}{f} = (n - 1)\left(\dfrac{1}{R_1} - \dfrac{1}{R_2}\right)`, 'Lens maker'), fm(r`\dfrac{1}{v} - \dfrac{1}{u} = \dfrac{1}{f},\qquad P = \dfrac{1}{f}`, 'Thin lens')],
      V.lConvex,
      [3],
      [V.sph, V.lConcave],
    ),
    sec(
      '4. Refraction through a prism',
      `For a prism of angle A: $r_1 + r_2 = A$; deviation $\\delta = i + e - A$.

As i increases, δ decreases to a minimum $\\delta_m$ and then increases. At minimum deviation $i = e$, $r_1 = r_2 = A/2$, the ray inside is parallel to the base, and
$$n = \\dfrac{\\sin\\left(\\frac{A + \\delta_m}{2}\\right)}{\\sin\\left(\\frac{A}{2}\\right)}$$
For a 60° prism of n = 1.5: $i = 48.6°$, $\\delta_m \\approx 37.2°$. (Thin prism: $\\delta \\approx (n - 1)A$.)`,
      [kt('Angle of minimum deviation', 'The smallest deviation produced by a prism, when the ray passes through it symmetrically.')],
      [fm(r`n = \dfrac{\sin\frac{A + \delta_m}{2}}{\sin\frac{A}{2}}`, 'Prism')],
      V.prism,
      [4],
      [devPlot],
    ),
    sec(
      '5. Optical instruments',
      `**Magnifying power** = angle subtended at the eye by the image / angle subtended by the object at the near point (D = 25 cm).

- **Simple microscope:** $m = 1 + D/f$ (image at D); $m = D/f$ (image at infinity).
- **Compound microscope:** objective (very short $f_o$) gives a real, inverted, enlarged image just inside the focus of the eyepiece; $m = m_om_e \\approx \\dfrac{L}{f_o}\\cdot\\dfrac{D}{f_e}$ (infinity) or $\\dfrac{L}{f_o}\\left(1 + \\dfrac{D}{f_e}\\right)$ (at D), L = tube length.
- **Astronomical telescope:** long $f_o$, large aperture; normal adjustment $m = f_o/f_e$, tube length $f_o + f_e$; final image inverted.
- **Reflecting telescope (Cassegrain):** concave primary, convex secondary, light through a hole in the primary. Advantages: no chromatic aberration, paraboloidal mirror removes spherical aberration, large mirrors can be supported from behind, cheaper and lighter.`,
      [kt('Magnifying power', 'Ratio of the angle subtended at the eye by the image to that subtended by the object (at the near point for microscopes, directly for telescopes).'), kt('Normal adjustment', 'Setting of a telescope with the final image at infinity.')],
      [fm(r`m_\text{simple} = 1 + \dfrac{D}{f},\qquad m_\text{tel} = \dfrac{f_o}{f_e}`, 'Instruments')],
      V.micro,
      [5],
      [V.tele],
    ),
  ],
  exam_tips_md: `- Signs first, then formulas: mirror $1/v + 1/u = 1/f$; lens $1/v - 1/u = 1/f$.
- TIR: always state both conditions.
- Lens maker: signs of $R_1$, $R_2$ from the centres of curvature.
- Prism: $r_1 + r_2 = A$, $\\delta = i + e - A$; at the minimum i = e.
- Instruments: state where the final image is; draw labelled ray diagrams.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Mirror formula?', '$1/v + 1/u = 1/f$, $f = R/2$.', 'formula', 1),
    fc(2, 'Magnification by a mirror?', '$m = -v/u$.', 'formula', 1),
    fc(3, 'Sign of f for concave and convex mirrors?', 'Concave negative; convex positive.', 'fact', 1),
    fc(4, 'Image in a convex mirror?', 'Always virtual, erect, diminished.', 'fact', 1),
    fc(5, 'Snell’s law?', '$n_1\\sin i = n_2\\sin r$.', 'formula', 2),
    fc(6, 'Refractive index in terms of speed?', '$n = c/v$.', 'formula', 2),
    fc(7, 'Critical angle formula?', '$\\sin C = n_2/n_1$ (into air: 1/n).', 'formula', 2),
    fc(8, 'Two conditions for total internal reflection?', 'Light goes from denser to rarer medium; angle of incidence exceeds the critical angle.', 'concept', 2),
    fc(9, 'Critical angle of glass (n = 1.5)?', 'About 41.8°.', 'example', 2),
    fc(10, 'Why does a diamond sparkle?', 'Small critical angle (24.4°): light is totally reflected many times inside.', 'concept', 2),
    fc(11, 'How does an optical fibre guide light?', 'Repeated total internal reflection at the core–cladding boundary (core has higher n).', 'concept', 2),
    fc(12, 'Refraction at a spherical surface?', '$n_2/v - n_1/u = (n_2 - n_1)/R$.', 'formula', 3),
    fc(13, 'Lens maker’s formula?', '$1/f = (n - 1)(1/R_1 - 1/R_2)$.', 'formula', 3),
    fc(14, 'Thin lens formula?', '$1/v - 1/u = 1/f$.', 'formula', 3),
    fc(15, 'Magnification by a lens?', '$m = v/u$.', 'formula', 3),
    fc(16, 'Power of a lens and its unit?', '$P = 1/f$ (f in m); dioptre.', 'definition', 3),
    fc(17, 'Power of lenses in contact?', '$P = P_1 + P_2$.', 'formula', 3),
    fc(18, 'Convex glass lens in water: f?', 'Longer (weaker), since n is replaced by n_glass/n_water.', 'concept', 3),
    fc(19, 'Prism relations?', '$r_1 + r_2 = A$; $\\delta = i + e - A$.', 'formula', 4),
    fc(20, 'Conditions at minimum deviation?', 'i = e, r₁ = r₂ = A/2, ray inside parallel to the base.', 'concept', 4),
    fc(21, 'Refractive index from minimum deviation?', '$n = \\sin\\frac{A+\\delta_m}{2}/\\sin\\frac{A}{2}$.', 'formula', 4),
    fc(22, 'Deviation by a thin prism?', '$\\delta \\approx (n - 1)A$.', 'formula', 4),
    fc(23, 'Simple microscope magnifying power?', '$1 + D/f$ (near point); $D/f$ (infinity).', 'formula', 5),
    fc(24, 'Compound microscope magnifying power (infinity)?', '$\\approx (L/f_o)(D/f_e)$.', 'formula', 5),
    fc(25, 'Telescope magnifying power (normal adjustment)?', '$f_o/f_e$, tube length $f_o + f_e$.', 'formula', 5),
    fc(26, 'Objective of a telescope vs microscope?', 'Telescope: long f, large aperture. Microscope: very short f.', 'concept', 5),
    fc(27, 'Two advantages of reflecting telescopes?', 'No chromatic aberration; large mirrors can be supported from behind (also cheaper, no spherical aberration with a paraboloid).', 'fact', 5),
    fc(28, 'Exam tip: mirror vs lens formula?', 'Mirror +, lens −; magnification −v/u for mirrors, v/u for lenses.', 'exam-tip', 3),
    fc(29, 'Exam tip: before an instrument formula?', 'State whether the final image is at D or at infinity.', 'exam-tip', 5),
    fc(30, 'Near point of a normal eye?', 'D = 25 cm.', 'fact', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
