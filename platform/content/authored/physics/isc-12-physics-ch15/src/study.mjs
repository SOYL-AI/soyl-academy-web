// ISC 12 Physics ch15 notes and flashcards.
import { T, unit, PROV, r } from '../../isc-12-physics-ch01/src/lib.mjs';
import { V, liquidPlot, recipPlot } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Refraction at Spherical Surfaces and Thin Lenses — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Refraction at a single spherical surface',
      `- **New Cartesian convention** (light from left to right): distances from the pole P; along the light positive; real object u < 0; R positive when the centre of curvature C lies on the side the light goes to. Paraxial rays only.
- **Derivation (convex surface facing the rarer medium n₁, real image in the denser medium n₂):** a ray from O meets the surface at A and bends towards the normal CA, crossing the axis at I. With α, β, γ the angles at O, I and C: i = α + γ (triangle OAC) and γ = r + β (triangle AIC). Small angles: n₁i = n₂r and α ≈ AD/OP, β ≈ AD/PI, γ ≈ AD/PC with D at P. Putting OP = −u, PI = v, PC = R gives $\\dfrac{n_2}{v} - \\dfrac{n_1}{u} = \\dfrac{n_2 - n_1}{R}$. With signs, the same formula is used for other cases.
- **Focal lengths of a surface:** $f_2 = \\dfrac{n_2 R}{n_2 - n_1}$ (parallel light from the first medium), $f_1 = -\\dfrac{n_1 R}{n_2 - n_1}$; $f_2/f_1 = -n_2/n_1$.
- **Magnification:** $m = \\dfrac{n_1 v}{n_2 u}$. **Flat surface** (R → ∞): $n_2/v = n_1/u$, the real and apparent depth relation. A point at the centre of curvature is seen at its true place (its rays meet the surface normally).`,
      [kt('Paraxial rays', 'Rays close to the principal axis, making small angles with it, so that sin θ ≈ tan θ ≈ θ.'), kt('Radius of curvature (sign)', 'Positive when the centre of curvature lies on the side to which the refracted light travels.')],
      [fm(r`\dfrac{n_2}{v} - \dfrac{n_1}{u} = \dfrac{n_2 - n_1}{R}`, 'Refraction at a spherical surface'), fm(r`m = \dfrac{n_1 v}{n_2 u}`, 'Magnification of a surface')],
      V.surf,
      [1],
      [V.sex],
    ),
    sec(
      '2. Lens maker’s formula, thin lens formula and lenses in liquids',
      `- **Thin lens:** two surfaces, thickness negligible; distances from the optical centre O. Light from the left: biconvex R₁ > 0, R₂ < 0; biconcave R₁ < 0, R₂ > 0; a plane face R = ∞.
- **Derivation (biconvex lens in air):** surface 1 alone: $\\dfrac{n}{v_1} - \\dfrac{1}{u} = \\dfrac{n - 1}{R_1}$. Its image I₁ is the object for surface 2: $\\dfrac{1}{v} - \\dfrac{n}{v_1} = \\dfrac{1 - n}{R_2}$. Adding: $\\dfrac{1}{v} - \\dfrac{1}{u} = (n - 1)\\left(\\dfrac{1}{R_1} - \\dfrac{1}{R_2}\\right)$. For u → −∞, v = f: **lens maker’s formula** $\\dfrac{1}{f} = (n - 1)\\left(\\dfrac{1}{R_1} - \\dfrac{1}{R_2}\\right)$, hence the **thin lens formula** $\\dfrac{1}{v} - \\dfrac{1}{u} = \\dfrac{1}{f}$.
- **Special shapes:** equiconvex f = R/[2(n − 1)]; plano-convex f = R/(n − 1); biconcave f negative. Reversing a lens does not change f.
- **In a medium of index n_m:** replace n by n/n_m: $\\dfrac{1}{f} = \\left(\\dfrac{n}{n_m} - 1\\right)\\left(\\dfrac{1}{R_1} - \\dfrac{1}{R_2}\\right)$, so $\\dfrac{f_{\\text{liquid}}}{f_{\\text{air}}} = \\dfrac{n - 1}{n/n_m - 1}$. n_m < n: weaker, same type; n_m = n: no focusing; n_m > n: the lens changes type (an air bubble shaped like a convex lens in glass diverges light).`,
      [kt('Optical centre', 'The point at the centre of a thin lens through which rays pass undeviated.'), kt('Lens maker’s formula', '1/f = (n − 1)(1/R₁ − 1/R₂), linking the focal length of a thin lens to its index and radii.')],
      [fm(r`\dfrac{1}{f} = (n - 1)\left(\dfrac{1}{R_1} - \dfrac{1}{R_2}\right)`, 'Lens maker’s formula'), fm(r`\dfrac{1}{v} - \dfrac{1}{u} = \dfrac{1}{f}`, 'Thin lens formula')],
      V.lm,
      [2],
      [V.shapes, liquidPlot],
    ),
    sec(
      '3. Magnification and power',
      `- **Magnification:** $m = \\dfrac{h'}{h} = \\dfrac{v}{u}$ (from the undeviated ray through O). m negative: real, inverted; m positive: virtual, erect.
- **Convex lens:** real, inverted images for objects beyond F₁ (at 2F₁ → at 2F₂, same size); virtual, erect, enlarged inside F₁. **Concave lens:** always virtual, erect, diminished, between F₁ and O.
- **Power:** $P = \\dfrac{1}{f}$ with f in metres; unit dioptre (D) = m⁻¹. Converging +, diverging −. A shorter focal length means a larger power.
- **Graph:** 1/v = 1/u + P is a straight line of slope 1, meeting both axes at a distance P from the origin.
- **Displacement method:** for fixed object–screen distance D, two lens positions a distance x apart give sharp images; $f = \\dfrac{D^2 - x^2}{4D}$ and m₁m₂ = 1.`,
      [kt('Power of a lens', 'The reciprocal of its focal length in metres; measured in dioptres, positive for converging lenses.'), kt('Dioptre', 'The unit of lens power: the power of a lens of focal length one metre (1 D = 1 m⁻¹).')],
      [fm(r`m = \dfrac{h'}{h} = \dfrac{v}{u}`, 'Magnification of a lens'), fm(r`P = \dfrac{1}{f}`, 'Power (f in metres)')],
      V.lex,
      [3],
      [V.cex, recipPlot],
    ),
    sec(
      '4. Thin lenses in contact',
      `- **Derivation:** lens 1 alone: $\\dfrac{1}{v_1} - \\dfrac{1}{u} = \\dfrac{1}{f_1}$. I₁ is the object for lens 2 at the same distance (lenses touching): $\\dfrac{1}{v} - \\dfrac{1}{v_1} = \\dfrac{1}{f_2}$. Adding: $\\dfrac{1}{v} - \\dfrac{1}{u} = \\dfrac{1}{f_1} + \\dfrac{1}{f_2}$, so the pair acts as one lens with $\\dfrac{1}{F} = \\dfrac{1}{f_1} + \\dfrac{1}{f_2}$ and $P = P_1 + P_2$.
- Magnification of the pair: m = m₁m₂. Equal and opposite powers cancel (P = 0, like a parallel-sided plate).
- **Lens on a plane mirror with a liquid:** a liquid layer between a convex lens and a plane mirror forms a plano-concave liquid lens in contact with the glass lens; the pin–image coincidence distance is then the focal length F of the pair, giving the liquid lens from 1/f_liquid = 1/F − 1/f_glass.`,
      [kt('Equivalent focal length', 'The focal length F of the single lens that has the same effect as the combination: 1/F = 1/f₁ + 1/f₂.')],
      [fm(r`\dfrac{1}{F} = \dfrac{1}{f_1} + \dfrac{1}{f_2}`, 'Lenses in contact'), fm(r`P = P_1 + P_2`, 'Powers add')],
      V.contact,
      [4],
    ),
    sec(
      '5. Combinations of separated lenses, and a lens with a mirror',
      `- **Separated lenses (distance d):** find v₁ for lens 1; the object for lens 2 is at $u_2 = v_1 - d$ (measured from lens 2); if I₁ lies beyond lens 2, u₂ > 0 (**virtual object**: the rays reach lens 2 still converging). Total magnification m = m₁m₂.
- **Lens with a mirror:** light passes the lens, is reflected, and passes the lens again. Treat each step in turn: lens image → object for the mirror (a plane mirror forms its image as far in front as the object is behind) → object for the lens on the return pass, measuring distances along the returning light. m = m₁ × m(mirror) × m₃.
- **Auto-collimation:** a pin at the focus of a convex lens backed by a plane mirror coincides with its own inverted image, whatever the lens–mirror distance: a quick way to measure f.
- **Image back on the object:** if the lens’s image falls at the centre of curvature of a concave or convex mirror placed behind it, the rays retrace their path and the final image forms on the object (inverted). Silvered lenses are not in the ISC syllabus.`,
      [kt('Virtual object', 'A point towards which rays are converging when they meet a lens or mirror; it lies beyond the element and has u > 0.'), kt('Auto-collimation', 'Finding the focal length of a lens by placing a plane mirror behind it and making an object coincide with its own image.')],
      [fm(r`u_2 = v_1 - d`, 'Object distance for the second lens'), fm(r`m = m_1 m_2`, 'Total magnification')],
      V.two,
      [5],
      [V.auto, V.lensmirror],
    ),
  ],
  exam_tips_md: `- Signs first: n₁ is the medium the light comes from; R positive when C is on the outgoing side; real object u < 0.
- Lens: m = v/u (mirror: m = −v/u); P = 1/f with f in metres.
- In a liquid use n/n_m; a liquid denser than the glass reverses the lens.
- Combinations: one image at a time; u₂ = v₁ − d; multiply magnifications; on a return pass measure along the returning light.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Refraction formula for a spherical surface?', '$\\dfrac{n_2}{v} - \\dfrac{n_1}{u} = \\dfrac{n_2 - n_1}{R}$.', 'formula', 1),
    fc(2, 'Which medium is n₁ in the surface formula?', 'The medium the light comes from (where the object is).', 'concept', 1),
    fc(3, 'When is R of a refracting surface positive?', 'When its centre of curvature lies on the side the light goes to.', 'concept', 1),
    fc(4, 'Exterior-angle results used in the surface derivation?', 'i = α + γ and r = γ − β.', 'concept', 1),
    fc(5, 'Second focal length of a surface?', '$f_2 = \\dfrac{n_2 R}{n_2 - n_1}$.', 'formula', 1),
    fc(6, 'Magnification produced by one refracting surface?', '$m = \\dfrac{n_1 v}{n_2 u}$.', 'formula', 1),
    fc(7, 'Surface formula with R → ∞ gives?', 'n₂/v = n₁/u: the real and apparent depth relation.', 'concept', 1),
    fc(8, 'Lens maker’s formula?', '$\\dfrac{1}{f} = (n - 1)\\left(\\dfrac{1}{R_1} - \\dfrac{1}{R_2}\\right)$.', 'formula', 2),
    fc(9, 'Signs of R₁ and R₂ for a biconvex lens (light from the left)?', 'R₁ positive, R₂ negative.', 'concept', 2),
    fc(10, 'Focal length of a plano-convex lens?', 'f = R/(n − 1).', 'formula', 2),
    fc(11, 'Role of I₁ in the lens maker’s derivation?', 'The image by the first surface acts as the object for the second surface.', 'concept', 2),
    fc(12, 'Does turning a thin lens round change f?', 'No: both foci are equally far from the optical centre.', 'fact', 2),
    fc(13, 'Lens of index n in a liquid of index n_m?', 'Replace n by n/n_m in the lens maker’s formula.', 'formula', 2),
    fc(14, 'Convex glass lens in a liquid denser than the glass?', 'It diverges light.', 'fact', 2),
    fc(15, 'Lens n = 1.6, f = 20 cm in air: f in water (4/3)?', '60 cm.', 'example', 2),
    fc(16, 'Thin lens formula?', '$\\dfrac{1}{v} - \\dfrac{1}{u} = \\dfrac{1}{f}$.', 'formula', 3),
    fc(17, 'Magnification of a thin lens?', '$m = h\'/h = v/u$.', 'formula', 3),
    fc(18, 'Image formed by a concave lens of a real object?', 'Always virtual, erect, diminished, between F₁ and O.', 'fact', 3),
    fc(19, 'Power of a lens and its unit?', 'P = 1/f (f in metres); dioptre, D = m⁻¹.', 'definition', 3),
    fc(20, 'Sign of power: converging and diverging lens?', 'Converging positive, diverging negative.', 'concept', 3),
    fc(21, 'Graph of 1/v against 1/u for a lens?', 'Straight line, slope 1, meeting both axes a distance P from the origin.', 'concept', 3),
    fc(22, 'Object 28 cm from a lens of f = 21 cm: image?', 'v = +84 cm, m = −3: real, inverted.', 'example', 3),
    fc(23, 'Focal length of two thin lenses in contact?', '$\\dfrac{1}{F} = \\dfrac{1}{f_1} + \\dfrac{1}{f_2}$.', 'formula', 4),
    fc(24, 'Power of lenses in contact?', 'P = P₁ + P₂.', 'formula', 4),
    fc(25, '+8.0 D and −5.0 D in contact?', '+3.0 D: converging, F = 33.3 cm.', 'example', 4),
    fc(26, 'Object distance for the second of two separated lenses?', 'u₂ = v₁ − d, measured from the second lens.', 'formula', 5),
    fc(27, 'What is a virtual object?', 'A point beyond a lens towards which rays are converging when they reach it (u > 0).', 'definition', 5),
    fc(28, 'Total magnification of a combination?', 'The product of the separate magnifications.', 'formula', 5),
    fc(29, 'Pin coincides with its own image with a lens backed by a plane mirror: where is the pin?', 'At the focus of the lens.', 'concept', 5),
    fc(30, 'Exam tip: return pass through a lens after a mirror?', 'Measure distances along the returning light and re-apply the lens formula.', 'exam-tip', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
