// ICSE 10 Physics ch04 Refraction of Light at Plane Surfaces — notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Refraction of Light at Plane Surfaces — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Refraction and its laws',
      r`- **Refraction:** the change in direction of light as it passes obliquely from one transparent medium into another. **Cause:** light has different speeds in different media.
- At every boundary there is also **partial reflection** (a faint reflection in a window pane).
- Rarer → denser: ray bends **towards** the normal; denser → rarer: **away** from the normal.
- **Laws of refraction:** (1) incident ray, refracted ray and normal at the point of incidence lie in one plane; (2) **Snell’s law** — $\sin i / \sin r$ is constant for a given pair of media and a given colour.
- On entering a denser medium: **speed and wavelength decrease**, **frequency (and so colour) is unchanged**.
- **No deviation** when (i) $i = 0$ (along the normal) or (ii) both media have the same refractive index.`,
      [kt('Refraction', 'Bending of light when it passes obliquely from one transparent medium into another, because its speed changes.'), kt('Snell’s law', 'For a given pair of media and colour of light, the sine of the angle of incidence divided by the sine of the angle of refraction is a constant.')],
      [fm(r`\frac{\sin i}{\sin r} = {}_{1}\mu_{2}`, 'Snell’s law'), fm(r`v = f \lambda`, 'Wave equation')],
      table(['Into a denser medium', 'Change'], [['Speed', 'Decreases'], ['Wavelength', 'Decreases'], ['Frequency', 'Unchanged'], ['Direction (oblique ray)', 'Bends towards the normal']], 'Table of the changes in light on entering a denser medium'),
      [1],
    ),
    sec(
      '2. Refractive index',
      r`- **Absolute refractive index:** $\mu = c / v$, with $c = 3 \times 10^{8}$ m s⁻¹. No unit; greater than 1 for every material medium.
- Larger $\mu$ → slower light → **optically denser** (optical density is not the same as mass density: kerosene is optically denser than water but floats on it).
- **Relative refractive index:** $\,{}_{1}\mu_{2} = \mu_{2} / \mu_{1} = v_{1} / v_{2}$.
- $\mu$ depends on the **material**, the **colour (wavelength)** of light (larger for violet than red) and slightly on **temperature**.
- Typical values: water 1.33, glass 1.5, diamond 2.42.`,
      [kt('Absolute refractive index', 'Ratio of the speed of light in vacuum to the speed of light in the medium.'), kt('Optically denser medium', 'A medium with a larger refractive index, in which light travels more slowly.')],
      [fm(r`\mu = \frac{c}{v}`, 'Refractive index from speeds'), fm(r`{}_{1}\mu_{2} = \frac{\mu_{2}}{\mu_{1}} = \frac{v_{1}}{v_{2}}`, 'Relative refractive index')],
      table(['Medium', 'μ', 'Speed (× 10⁸ m/s)'], [['Water', '1.33', '2.25'], ['Glass', '1.5', '2.0'], ['Diamond', '2.42', '1.24']], 'Table of refractive indices and speeds of light in three media'),
      [2],
    ),
    sec(
      '3. Rectangular glass block and thick mirror',
      `- Ray bends towards the normal at the first face and away at the second; the faces are parallel, so **e = i** and the **emergent ray is parallel to the incident ray**.
- **Lateral displacement:** perpendicular distance between the incident ray produced and the emergent ray. It increases with the **thickness** of the block, the **angle of incidence** and the **refractive index**; it is zero for normal incidence.
- **Thick plane mirror (silvered at the back):** partial reflection at the front glass surface gives a faint first image; reflection at the silvered back gives the **brightest (second)** image; repeated internal reflections give further, fainter images. All emergent rays are parallel.`,
      [kt('Lateral displacement', 'The perpendicular distance between the incident ray produced and the emergent ray of a parallel-sided block.'), kt('Angle of emergence', 'The angle between the emergent ray and the normal at the second face.')],
      [fm(r`e = i`, 'Parallel-sided block')],
      table(['Image in a thick mirror', 'Formed by', 'Brightness'], [['First', 'Reflection at the front glass surface', 'Faint'], ['Second', 'Reflection at the silvered back', 'Brightest'], ['Third and later', 'Repeated internal reflection', 'Fainter and fainter']], 'Table of the images formed by a thick plane mirror'),
      [3],
    ),
    sec(
      '4. Real and apparent depth',
      r`- Rays from an object under water bend away from the normal on leaving; produced back they meet **above** the object, which appears **raised**.
- For near-normal viewing: $\mu = \dfrac{\text{real depth}}{\text{apparent depth}}$.
- **Shift (apparent rise)** $= \text{real depth} - \text{apparent depth} = \text{real depth}\,(1 - 1/\mu)$.
- Viewed obliquely, the object appears raised even more.
- Effects: a pool looks shallower; a stick dipped obliquely looks bent at the surface; print under a glass block looks raised; to a fish, a bird looks higher.`,
      [kt('Apparent depth', 'The depth at which an object in a denser medium appears to be when viewed from the rarer medium.'), kt('Shift', 'The distance by which an object under a denser medium appears raised: real depth minus apparent depth.')],
      [fm(r`\mu = \frac{\text{real depth}}{\text{apparent depth}}`, 'Real and apparent depth'), fm(r`\text{shift} = d\left(1 - \frac{1}{\mu}\right)`, 'Apparent rise for real depth d')],
      table(['Real depth', 'μ', 'Apparent depth', 'Shift'], [['12 cm', '4/3', '9 cm', '3 cm'], ['9 cm', '1.5', '6 cm', '3 cm'], ['5 m', '1.25', '4 m', '1 m']], 'Table of real depth, refractive index, apparent depth and shift for three cases'),
      [4],
    ),
    sec(
      '5. Refraction through a triangular prism',
      r`- A prism has two refracting faces inclined at the **angle of the prism** $A$.
- The ray bends towards the normal at the first face and away from it at the second; the emergent ray is turned **towards the base**.
- **Angle of deviation** $\delta$: angle between the incident ray produced and the emergent ray.
- Relations: $r_{1} + r_{2} = A$; $\delta = i + e - A$.
- $\delta$ depends on (i) angle of incidence, (ii) angle of the prism, (iii) refractive index of the material, (iv) colour of light (violet deviates most). As $i$ increases, $\delta$ first decreases to a minimum, then increases.`,
      [kt('Angle of deviation', 'The angle between the direction of the incident ray and the direction of the emergent ray.'), kt('Angle of the prism', 'The angle between the two refracting faces of a prism.')],
      [fm(r`r_{1} + r_{2} = A`, 'Angles inside a prism'), fm(r`\delta = i + e - A`, 'Deviation')],
      table(['Change', 'Effect on deviation'], [['Larger prism angle A', 'Larger'], ['Larger refractive index', 'Larger'], ['Violet light instead of red', 'Larger'], ['Angle of incidence increased', 'First less, then more']], 'Table of factors that change the angle of deviation of a prism'),
      [5],
    ),
    sec(
      '6. Critical angle and total internal reflection',
      r`- **Critical angle C:** the angle of incidence in the denser medium for which the angle of refraction in the rarer medium is $90^\circ$.
- For a medium in air: $\mu = 1 / \sin C$.
- **Total internal reflection (TIR):** when $i > C$, all the light is reflected back into the denser medium. **Conditions:** light travels from denser to rarer; $i > C$.
- **Totally reflecting prisms** (45°–45°–90° glass, $C \approx 42^\circ$): enter a short face normally → turned through 90° (periscope); enter the hypotenuse face normally → turned through 180° (binoculars, reflectors). An equilateral prism can also reflect totally at a face.
- Advantages over a plane mirror: all light reflected (brighter), one image only, no silvering to spoil.`,
      [kt('Critical angle', 'The angle of incidence in the denser medium for which the refracted ray grazes the surface (angle of refraction 90°).'), kt('Total internal reflection', 'Reflection of all the light back into a denser medium when it meets the boundary with a rarer medium at more than the critical angle.')],
      [fm(r`\mu = \frac{1}{\sin C}`, 'Critical angle')],
      table(['Medium', 'C (about)'], [['Water', '49°'], ['Glass', '42°'], ['Diamond', '24°']], 'Table of critical angles of water, glass and diamond'),
      [6],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Measuring angles from the surface instead of the normal.
- Saying the frequency of light changes in glass.
- Writing apparent depth = real depth × μ.
- Giving only one condition for total internal reflection.
- Drawing the emergent ray of a glass block not parallel to the incident ray.

**How marks are usually awarded**
- Calculations: formula, substitution, answer (and unit where there is one; μ has none).
- Ray diagrams: arrows on rays, normals drawn dotted, angles labelled, emergent ray direction correct.
- TIR: both conditions, each with its key word (denser to rarer; greater than the critical angle).`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Refraction?', 'Bending of light at a boundary between two transparent media.', 'definition', 1),
    fc(2, 'Cause of refraction?', 'Change in the speed of light from one medium to another.', 'concept', 1),
    fc(3, 'Rarer to denser: the ray bends…', 'Towards the normal.', 'fact', 1),
    fc(4, 'First law of refraction?', 'Incident ray, refracted ray and normal lie in one plane.', 'definition', 1),
    fc(5, 'Snell’s law?', 'sin i / sin r is constant for a pair of media and a colour.', 'formula', 1),
    fc(6, 'What stays the same when light enters water?', 'Frequency (so the colour).', 'fact', 1),
    fc(7, 'Two cases of no deviation?', 'Normal incidence; media of equal refractive index.', 'concept', 1),
    fc(8, 'Refractive index from speeds?', 'μ = c / v.', 'formula', 2),
    fc(9, 'Unit of refractive index?', 'None (a ratio).', 'fact', 2),
    fc(10, 'μ of water, glass, diamond?', 'About 1.33, 1.5, 2.42.', 'fact', 2),
    fc(11, 'Optically denser means…', 'Higher μ, slower light.', 'concept', 2),
    fc(12, 'Relative refractive index ₁μ₂?', 'μ₂ / μ₁ = v₁ / v₂.', 'formula', 2),
    fc(13, 'Is μ the same for all colours?', 'No: larger for violet than for red.', 'fact', 2),
    fc(14, 'Glass block: angle of emergence?', 'Equal to the angle of incidence.', 'fact', 3),
    fc(15, 'Lateral displacement?', 'Perpendicular distance between incident ray produced and emergent ray.', 'definition', 3),
    fc(16, 'Lateral displacement depends on…', 'Thickness, angle of incidence, refractive index.', 'concept', 3),
    fc(17, 'Brightest image in a thick mirror?', 'The second, from the silvered back.', 'fact', 3),
    fc(18, 'Real and apparent depth relation?', 'μ = real depth / apparent depth.', 'formula', 4),
    fc(19, 'Why does a pool look shallow?', 'Light bends away from the normal leaving water; the bottom appears raised.', 'concept', 4),
    fc(20, 'Shift of an object under a slab of thickness t?', 't (1 − 1/μ).', 'formula', 4),
    fc(21, 'Stick dipped obliquely in water looks…', 'Bent at the surface, immersed part raised.', 'example', 4),
    fc(22, 'Prism bends light towards…', 'Its base.', 'fact', 5),
    fc(23, 'Angle of deviation?', 'Angle between incident ray produced and emergent ray.', 'definition', 5),
    fc(24, 'Prism relations?', 'r₁ + r₂ = A; δ = i + e − A.', 'formula', 5),
    fc(25, 'Deviation depends on…', 'i, A, material, colour of light.', 'concept', 5),
    fc(26, 'Critical angle?', 'Angle of incidence in the denser medium giving r = 90°.', 'definition', 6),
    fc(27, 'μ and critical angle?', 'μ = 1 / sin C.', 'formula', 6),
    fc(28, 'Conditions for TIR?', 'Denser to rarer; i greater than C.', 'concept', 6),
    fc(29, 'Critical angle of glass?', 'About 42°.', 'fact', 6),
    fc(30, '45°–45°–90° prism, light in through a short face?', 'Turned through 90° (periscope).', 'diagram', 6),
    fc(31, 'Why prisms, not mirrors, in binoculars?', 'All light reflected, one image, no silvering to spoil.', 'concept', 6),
    fc(32, 'Exam tip: angles', 'Always measure i, r and e from the normal.', 'exam-tip', 1),
  ],
  status: 'draft',
  provenance: PROV,
};
