// ISC 12 Physics ch13 notes and flashcards.
import { T, unit, PROV, r } from '../../isc-12-physics-ch01/src/lib.mjs';
import { V, uvPlot, tirPlot, latPlot } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Reflection at Spherical Mirrors and Refraction at Plane Surfaces — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Spherical mirrors, R = 2f and the sign convention',
      `- **Concave** (converging) and **convex** (diverging) mirrors are parts of a sphere. Pole P, centre of curvature C, radius of curvature R = PC, principal axis through P and C, principal focus F, focal length f = PF. Results hold for **paraxial** rays (close to the axis, small aperture).
- **R = 2f:** a ray parallel to the axis meets the mirror at M; the normal is CM. The angle of incidence θ equals the angle of reflection θ, and ∠MCF = θ (alternate angles), so triangle FCM is isosceles: FC = FM. For a paraxial ray FM ≈ FP, so F is the midpoint of PC and $f = R/2$. The focal length does not depend on the surrounding medium.
- **New Cartesian sign convention** (light drawn from left to right): distances measured from P; along the incident light positive, against it negative; heights above the axis positive. A real object has u < 0; concave mirror f < 0; convex mirror f > 0; a real image (in front) has v < 0, a virtual image (behind) v > 0.`,
      [kt('Paraxial rays', 'Rays close to the principal axis and making small angles with it; for them all rays from a point meet at one image point.'), kt('Principal focus', 'The point where rays parallel to the axis meet after reflection (concave mirror) or from which they appear to diverge (convex mirror).')],
      [fm(r`f = \dfrac{R}{2}`, 'Focal length and radius of curvature')],
      V.r2f,
      [1],
      [V.terms, V.sign],
    ),
    sec(
      '2. Mirror formula and magnification',
      `- **Derivation (concave, object beyond C, real image):** ray AM parallel to the axis reflects through F to A′; ray AP reflects at P to A′. MD is perpendicular to the axis. Triangles A′B′F ~ MDF and A′B′P ~ ABP; with MD = AB and D ≈ P (paraxial): A′B′/AB = B′F/FP = B′P/BP. Putting B′P = −v, BP = −u, FP = −f, B′F = f − v gives $(f - v)/(-f) = v/u$, which rearranges to $\\dfrac{1}{v} + \\dfrac{1}{u} = \\dfrac{1}{f}$.
- **Magnification:** $m = \\dfrac{h'}{h} = -\\dfrac{v}{u}$. m negative: real, inverted; m positive: virtual, erect; |m| > 1 enlarged.
- **Concave mirror:** object beyond C → image between F and C, smaller; at C → at C, same size; between C and F → beyond C, larger; at F → at infinity; inside F → virtual, erect, enlarged, behind the mirror.
- **Convex mirror:** for every real object the image is virtual, erect, diminished and between P and F (1/v = 1/f − 1/u is a sum of positive terms). Wide field of view: rear-view and security mirrors.
- Method: write u and f with signs, solve for v, then m = −v/u and h′ = mh; interpret the signs.`,
      [kt('Linear magnification', 'Ratio of image height to object height, m = h′/h = −v/u.'), kt('Virtual image', 'An image from which reflected rays only appear to come; it cannot be formed on a screen.')],
      [fm(r`\dfrac{1}{v} + \dfrac{1}{u} = \dfrac{1}{f}`, 'Mirror formula'), fm(r`m = \dfrac{h'}{h} = -\dfrac{v}{u}`, 'Magnification')],
      V.deriv,
      [1],
      [V.ex1, V.ex2, V.convex, uvPlot],
    ),
    sec(
      '3. Snell’s law, relative refractive index and slabs',
      `- **Laws of refraction:** the incident ray, refracted ray and normal are in one plane; $n_1\\sin i = n_2\\sin r$ (Snell’s law). Absolute index $n = c/v$. Frequency unchanged; speed and wavelength divided by n.
- **Relative index:** $_1n_2 = \\sin i/\\sin r = n_2/n_1 = v_1/v_2$; $_2n_1 = 1/{}_1n_2$.
- **Several parallel media:** $n\\sin\\theta$ is the same in every layer. For a ray going 1 → 2 → 3 → 1: $_1n_2 \\times {}_2n_3 \\times {}_3n_1 = 1$, so $_2n_3 = {}_1n_3/{}_1n_2$. The emergent ray is parallel to the incident ray when the first and last media are the same.
- **Parallel-sided slab:** e = i; **lateral shift** $d = t\\sin(i - r)/\\cos r$ (zero for normal incidence; increases with t, i and n).`,
      [kt('Absolute refractive index', 'Speed of light in vacuum divided by its speed in the medium, n = c/v.'), kt('Lateral shift', 'Perpendicular distance between the incident ray produced and the emergent ray of a parallel-sided slab.')],
      [fm(r`n_1\sin i = n_2\sin r`, 'Snell’s law'), fm(r`{}_1n_2\,{}_2n_3\,{}_3n_1 = 1`, 'Three media'), fm(r`d = \dfrac{t\sin(i - r)}{\cos r}`, 'Lateral shift')],
      V.layers,
      [2],
      [V.snell, V.slab, latPlot],
    ),
    sec(
      '4. Real and apparent depth',
      `- An object under a liquid seen from above (near-normal rays) appears raised: $n = \\dfrac{\\text{real depth}}{\\text{apparent depth}}$ (from $n = \\sin r/\\sin i \\approx \\tan r/\\tan i$).
- **Apparent shift** through a slab or liquid layer of thickness t: $s = t(1 - 1/n)$, independent of the object’s distance below the slab.
- **Several layers:** apparent depth = $t_1/n_1 + t_2/n_2 + \\dots$
- Seen obliquely, the bottom looks even shallower. An object in air seen from under water appears **higher** (apparent height = n × real height).
- **Travelling microscope:** n = real thickness ÷ apparent thickness of a slab or liquid.`,
      [kt('Apparent depth', 'The depth at which an object under a refracting medium appears to lie when viewed from above.'), kt('Apparent shift', 'The distance an object appears to be raised by a slab or layer: t(1 − 1/n).')],
      [fm(r`n = \dfrac{\text{real depth}}{\text{apparent depth}}`, 'Apparent depth'), fm(r`s = t\left(1 - \dfrac{1}{n}\right)`, 'Apparent shift')],
      V.depth,
      [3],
    ),
    sec(
      '5. Total internal reflection, prisms and fibres',
      `- **TIR** happens when light travels from a denser to a rarer medium and meets the boundary at more than the **critical angle** C. At i = C the refracted ray grazes the surface (r = 90°).
- $n\\sin C = 1$, so $\\sin C = 1/n$; between two media $\\sin C = n_2/n_1$ ($n_1 > n_2$). Water 48.8°, crown glass about 41°, diamond 24.4°.
- **Total reflecting prisms:** a 45°–90°–45° glass prism turns a ray through 90° (one TIR at 45°) or 180° (two TIRs, ray entering the hypotenuse); in a 30°–60°–90° prism an incidence of 60° is total for n > 1.155, while 30° would need n > 2. Prisms reflect almost 100%, do not tarnish and give no multiple images. In water the critical angle rises and a prism may stop working.
- **Optical fibre:** glass core (n₁) inside cladding (n₂ < n₁); light meeting the wall at more than C (sin C = n₂/n₁) is guided by repeated TIR. Uses: communication, endoscopy, decorative lamps; low loss, high capacity, no electrical interference.`,
      [kt('Critical angle', 'Angle of incidence in the denser medium for which the angle of refraction is 90°; sin C = n₂/n₁.'), kt('Total internal reflection', 'Complete reflection of light at a boundary with a rarer medium when the angle of incidence exceeds the critical angle.')],
      [fm(r`\sin C = \dfrac{1}{n} = \dfrac{n_2}{n_1}`, 'Critical angle')],
      V.tir,
      [4],
      [tirPlot, V.prisms, V.fibre],
    ),
  ],
  exam_tips_md: `- Mirrors: signs first (u < 0 for a real object; concave f < 0), then 1/v + 1/u = 1/f and m = −v/u; read the nature of the image from the signs.
- Layers: n sin θ is constant; product of relative indices round a closed set of media is 1.
- Apparent depth needs near-normal viewing; shift t(1 − 1/n) is independent of the object’s position.
- TIR: denser to rarer and i > C; compare angles inside the glass with C for the actual surroundings.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Focal length of a spherical mirror in terms of R?', '$f = R/2$, for paraxial rays.', 'formula', 1),
    fc(2, 'Why is triangle FCM isosceles in the R = 2f proof?', 'Both base angles equal θ: the angle of reflection and the alternate angle at C.', 'concept', 1),
    fc(3, 'Sign of u for a real object (New Cartesian)?', 'Negative: it is against the direction of the incident light.', 'concept', 1),
    fc(4, 'Sign of f: concave and convex mirror?', 'Concave negative, convex positive.', 'concept', 1),
    fc(5, 'Mirror formula?', '$\\dfrac{1}{v} + \\dfrac{1}{u} = \\dfrac{1}{f}$.', 'formula', 1),
    fc(6, 'Magnification of a mirror?', '$m = h\'/h = -v/u$.', 'formula', 1),
    fc(7, 'A mirror image has m = −2: what is it like?', 'Real, inverted, twice the size.', 'example', 1),
    fc(8, 'Concave mirror, object at C: image?', 'At C: real, inverted, same size.', 'fact', 1),
    fc(9, 'Concave mirror, object inside F: image?', 'Virtual, erect, enlarged, behind the mirror.', 'fact', 1),
    fc(10, 'Image in a convex mirror of a real object?', 'Always virtual, erect, diminished, between P and F.', 'fact', 1),
    fc(11, 'Why are convex mirrors used on vehicles?', 'Erect image and a wide field of view.', 'concept', 1),
    fc(12, 'Does a mirror’s focal length change in water?', 'No: f = R/2 depends only on the shape.', 'concept', 1),
    fc(13, 'Snell’s law?', '$n_1\\sin i = n_2\\sin r$.', 'formula', 2),
    fc(14, 'Absolute refractive index in terms of speeds?', '$n = c/v$.', 'definition', 2),
    fc(15, 'Relative index of medium 2 with respect to medium 1?', '$n_2/n_1 = v_1/v_2 = \\sin i/\\sin r$.', 'formula', 2),
    fc(16, 'Product of relative indices for media 1 → 2 → 3 → 1?', 'One.', 'formula', 2),
    fc(17, 'What stays constant across parallel layers?', '$n\\sin\\theta$.', 'concept', 2),
    fc(18, 'Lateral shift through a slab?', '$d = t\\sin(i - r)/\\cos r$.', 'formula', 2),
    fc(19, 'Which property of light does not change on refraction?', 'Frequency.', 'fact', 2),
    fc(20, 'Refractive index from real and apparent depth?', 'n = real depth ÷ apparent depth (near-normal viewing).', 'formula', 3),
    fc(21, 'Apparent shift through a slab of thickness t?', '$t(1 - 1/n)$.', 'formula', 3),
    fc(22, 'Water 40 cm deep (n = 4/3) seen from above?', 'Looks 30 cm deep.', 'example', 3),
    fc(23, 'Apparent depth for several layers?', 'Sum of each thickness divided by its refractive index.', 'formula', 3),
    fc(24, 'Two conditions for total internal reflection?', 'Denser to rarer medium; angle of incidence greater than C.', 'concept', 4),
    fc(25, 'Critical angle and refractive index?', '$\\sin C = 1/n$, or $n_2/n_1$ between two media.', 'formula', 4),
    fc(26, 'Critical angle of glass with n = 1.5?', 'About 41.8°.', 'example', 4),
    fc(27, 'How does a 45° prism turn light through 180°?', 'Two total internal reflections at 45°, entering and leaving through the hypotenuse.', 'concept', 4),
    fc(28, 'Why must fibre cladding have a lower index than the core?', 'TIR only occurs going from a denser to a rarer medium.', 'concept', 4),
    fc(29, 'Two uses of optical fibres?', 'Telecommunication cables and medical endoscopes.', 'fact', 4),
    fc(30, 'Exam tip: before using sin C = 1/n?', 'Check the light goes from denser to rarer, and use n₂/n₁ if the outside is not air.', 'exam-tip', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
