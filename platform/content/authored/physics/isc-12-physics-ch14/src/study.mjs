// ISC 12 Physics ch14 notes and flashcards.
import { T, unit, PROV, r } from '../../isc-12-physics-ch01/src/lib.mjs';
import { V, devPlot, thinPlot, nPlot } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Refraction and Dispersion by a Prism — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Refraction through a prism: r₁ + r₂ = A and δ = i + e − A',
      `- A **prism** has two plane refracting faces meeting at the **refracting edge**; the angle between them is the **refracting angle A**; the face opposite the edge is the **base**. Rays are drawn in a **principal section** (a cut at right angles to the edge). A prism denser than its surroundings bends rays **towards the base** at both faces.
- Snell’s law at the two faces: $\\sin i = n\\sin r_1$ and $n\\sin r_2 = \\sin e$ (angles from the normals).
- **Geometry:** the normals at the entry point Q and exit point R meet at N. In the quadrilateral formed by the refracting edge, Q, N and R, the angles at Q and R are 90°, so ∠QNR = 180° − A; in triangle QNR, $r_1 + r_2 = A$.
- **Deviation:** the ray turns by $(i - r_1)$ at Q and $(e - r_2)$ at R; these are the inside angles of triangle QDR (D: where the incident ray produced meets the emergent ray produced backwards), so the exterior angle $\\delta = i + e - A$.
- Special cases: normal incidence on the first face ($i = 0$, $r_1 = 0$, $r_2 = A$); a ray that retraces its path from a silvered second face meets it normally ($r_2 = 0$, $r_1 = A$).`,
      [kt('Refracting angle', 'The angle A between the two refracting faces of a prism.'), kt('Angle of deviation', 'The angle between the incident ray produced forward and the emergent ray; δ = i + e − A.')],
      [fm(r`r_1 + r_2 = A`, 'Angles inside the prism'), fm(r`\delta = i + e - A`, 'Angle of deviation')],
      V.geom,
      [1],
      [V.parts],
    ),
    sec(
      '2. The i–δ graph and the limits of emergence',
      `- As i increases, δ falls to a **minimum δm** and then rises: a U-shaped (not quite symmetric) curve.
- **Reversibility:** a ray entering at $i$ and leaving at $e$ has the same δ as one entering at $e$; so each δ > δm occurs for two angles of incidence ($i$ and $e$), which coincide only at the minimum.
- **Emergence:** at the second face the light goes from glass to air, so it emerges only if $r_2 \\le C$ ($\\sin C = 1/n$). The least angle of incidence for emergence (grazing emergence, $e = 90^\\circ$) satisfies $\\sin i = n\\sin(A - C)$; for smaller i the ray is totally reflected at the second face.
- Since $r_1 \\le C$ always, $r_2 = A - r_1 \\ge A - C$: if $A > 2C$, **no ray emerges** from the second face for any i.
- Example: A = 60°, n = 1.52: C = 41.1°, least i = 29.4°, δm = 38.9° at i = 49.5°.`,
      [kt('Grazing emergence', 'Emergence along the second face (e = 90°), when the ray meets that face at the critical angle.'), kt('Limiting angle of a prism', 'Twice the critical angle; a prism with a larger refracting angle lets no ray out of its second face.')],
      [fm(r`\sin i_{\min} = n\sin(A - C)`, 'Least angle of incidence for emergence'), fm(r`A \le 2C`, 'Condition for any emergence')],
      devPlot,
      [1],
      [V.limits],
    ),
    sec(
      '3. Minimum deviation and the prism formula',
      `- At minimum deviation the path is **symmetric**: $i = e$, $r_1 = r_2 = A/2$; in an isosceles prism the ray inside runs **parallel to the base**.
- $\\delta_m = 2i - A$, so $i = (A + \\delta_m)/2$. Snell’s law $n = \\sin i/\\sin r$ gives
  $n = \\dfrac{\\sin\\frac{A + \\delta_m}{2}}{\\sin\\frac{A}{2}}$.
- For a given A, a larger n gives a larger δm; for the same glass, a larger A gives a larger δm. In a liquid, use the relative index $n_{glass}/n_{liquid}$: δm falls.
- **Spectrometer:** measure A; rotate the table until the image of the slit stops and turns back; that is δm. The reading is precise because δ changes very slowly near the minimum. A hollow prism with thin walls, filled with a liquid, measures the liquid’s index.
- If $\\delta_m = A$, then $n = 2\\cos(A/2)$ (e.g. A = 60°: n = √3).`,
      [kt('Angle of minimum deviation', 'The least deviation a prism produces, reached when the ray passes symmetrically (i = e).'), kt('Spectrometer', 'Instrument with a collimator, turntable and telescope used to measure A and δm accurately.')],
      [fm(r`n = \dfrac{\sin\left(\frac{A + \delta_m}{2}\right)}{\sin\left(\frac{A}{2}\right)}`, 'Prism formula'), fm(r`r = \dfrac{A}{2},\; i = \dfrac{A + \delta_m}{2}`, 'At minimum deviation')],
      V.mindev,
      [2],
    ),
    sec(
      '4. The thin prism',
      `- For a thin prism (small A) and small angles of incidence, $\\sin\\theta \\approx \\theta$: $i = n r_1$, $e = n r_2$, so $\\delta = n(r_1 + r_2) - A = (n - 1)A$.
- δ does not depend on i (for small i), and is proportional to A and to (n − 1).
- In a liquid of index $n_l$: $\\delta = (n/n_l - 1)A$; zero when $n_l = n$, negative (bent towards the edge) when $n_l > n$.
- Two thin prisms in contact add their deviations, with opposite signs if one is inverted: $\\delta = (n_1 - 1)A_1 - (n_2 - 1)A_2$.
- Uses: weak prisms in spectacles to correct a squint; beam steering.`,
      [kt('Thin prism', 'A prism of small refracting angle (a few degrees), for which δ = (n − 1)A.')],
      [fm(r`\delta = (n - 1)A`, 'Thin prism'), fm(r`\delta = \left(\dfrac{n}{n_l} - 1\right)A`, 'Thin prism in a liquid')],
      V.thin,
      [3],
      [thinPlot],
    ),
    sec(
      '5. Dispersion, angular dispersion and dispersive power',
      `- **Dispersion:** splitting of white light into its colours, because the refractive index depends on wavelength. In glass $n_v > n_r$ (n falls as λ rises), so violet is deviated most and red least (VIBGYOR). In a vacuum there is no dispersion.
- A parallel-sided slab gives no spectrum: every colour leaves parallel to the incident ray. An inverted second prism recombines the colours (Newton).
- Thin prism: **angular dispersion** $\\theta = \\delta_v - \\delta_r = (n_v - n_r)A$; **mean deviation** $\\delta = (n - 1)A$, n for yellow (often the mean of $n_v$ and $n_r$).
- **Dispersive power** $\\omega = \\dfrac{\\delta_v - \\delta_r}{\\delta} = \\dfrac{n_v - n_r}{n - 1}$: no unit, depends only on the material (crown about 0.034, flint about 0.040).
- For a thick prism, trace each colour with Snell’s law; (nᵥ − nᵣ)A applies only to thin prisms.`,
      [kt('Angular dispersion', 'The angle between the violet and red rays emerging from a prism; (n_v − n_r)A for a thin prism.'), kt('Dispersive power', 'Ratio of angular dispersion to mean deviation, (n_v − n_r)/(n − 1); a property of the material.')],
      [fm(r`\theta = (n_v - n_r)A`, 'Angular dispersion'), fm(r`\omega = \dfrac{n_v - n_r}{n - 1}`, 'Dispersive power')],
      V.disp,
      [4],
      [nPlot, V.newton],
    ),
    sec(
      '6. The rainbow',
      `- A **primary rainbow** forms when sunlight entering raindrops is refracted (and dispersed), **reflected once** inside, and refracted out. Rays bunch at about **42° for red** and **40° for violet** from the antisolar direction (the direction pointing away from the sun), so light from drops at those angles is bright.
- The sun must be **behind** the observer and the rain in front. Drops on a cone of half-angle 42° round the antisolar direction send red to the eye; those at 40° send violet: **red outside, violet inside**; the bow is an arc of a circle.
- The top of the bow is (42° − sun’s elevation) above the horizon: no primary bow is seen when the sun is higher than about 42° (around noon in summer). Evening rainbows appear in the east, morning ones in the west.
- A fainter **secondary** bow (two internal reflections) lies outside, at about 50°–54°, with the colours **reversed**.
- Only the ray diagram and simple explanation are required; the derivation of the angles is not in the syllabus.`,
      [kt('Primary rainbow', 'Bow formed by one internal reflection in raindrops; red outside at about 42°, violet inside at about 40°.'), kt('Antisolar direction', 'The direction from the observer pointing directly away from the sun; the centre of the rainbow’s circle.')],
      [],
      V.drop,
      [4],
      [V.sky],
    ),
  ],
  exam_tips_md: `- Derivations: r₁ + r₂ = A from the quadrilateral and triangle; δ = i + e − A from the exterior angle; at minimum deviation i = e and r = A/2.
- Emergence needs r₂ ≤ C; no emergence for any i if A > 2C.
- Thin prism: δ = (n − 1)A, independent of small i; in a liquid use n/nₗ.
- Dispersive power (nᵥ − nᵣ)/(n − 1) has no unit and does not depend on A.
- Rainbow: refraction, one reflection, refraction; sun behind; red outside at about 42°.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What is the refracting angle of a prism?', 'The angle A between its two refracting faces.', 'definition', 1),
    fc(2, 'Towards which part of a glass prism in air is a ray bent?', 'Towards the base, at both faces.', 'fact', 1),
    fc(3, 'Relation between r₁, r₂ and A?', '$r_1 + r_2 = A$.', 'formula', 1),
    fc(4, 'Angle of deviation of a prism in terms of i, e and A?', '$\\delta = i + e - A$.', 'formula', 1),
    fc(5, 'Angle between the normals to the two faces (inside the prism)?', '$180^\\circ - A$.', 'fact', 1),
    fc(6, 'Shape of the i–δ graph?', 'U-shaped: δ falls to a minimum δm and rises again.', 'concept', 1),
    fc(7, 'Why does each δ above δm occur at two angles of incidence?', 'Reversibility: swapping i and e gives the same deviation.', 'concept', 1),
    fc(8, 'Condition for a ray to leave the second face?', '$r_2 \\le C$, where $\\sin C = 1/n$.', 'concept', 1),
    fc(9, 'Least angle of incidence for emergence?', '$\\sin i = n\\sin(A - C)$ (grazing emergence).', 'formula', 1),
    fc(10, 'When does no ray emerge from a prism?', 'When A > 2C.', 'fact', 1),
    fc(11, 'Ray falls normally on the first face: r₂ = ?', '$r_2 = A$.', 'example', 1),
    fc(12, 'At minimum deviation, how are i and e related?', 'Equal: i = e, so r₁ = r₂ = A/2.', 'concept', 2),
    fc(13, 'Path inside an equilateral prism at minimum deviation?', 'Parallel to the base.', 'fact', 2),
    fc(14, 'Prism formula?', '$n = \\sin\\frac{A + \\delta_m}{2} \\big/ \\sin\\frac{A}{2}$.', 'formula', 2),
    fc(15, 'Angle of incidence at minimum deviation?', '$i = (A + \\delta_m)/2$.', 'formula', 2),
    fc(16, 'Equilateral prism with δm = 50°: n?', '$\\sin 55^\\circ/\\sin 30^\\circ \\approx 1.64$.', 'example', 2),
    fc(17, 'Why is n measured at minimum deviation?', 'δ changes very slowly there, so the reading is precise and easy to find.', 'concept', 2),
    fc(18, 'Effect on δm of immersing a glass prism in water?', 'δm decreases (relative index n/nw is smaller).', 'concept', 2),
    fc(19, 'Deviation by a thin prism?', '$\\delta = (n - 1)A$.', 'formula', 3),
    fc(20, 'Approximation used for a thin prism?', 'Small angles: sin θ ≈ θ.', 'concept', 3),
    fc(21, 'Does a thin prism’s deviation depend on i?', 'No, not for small angles of incidence.', 'concept', 3),
    fc(22, 'Thin prism in a liquid of index nₗ?', '$\\delta = (n/n_l - 1)A$.', 'formula', 3),
    fc(23, 'What is dispersion?', 'Splitting of white light into colours because n depends on wavelength.', 'definition', 4),
    fc(24, 'Which colour does glass deviate most, and why?', 'Violet: its refractive index is largest.', 'fact', 4),
    fc(25, 'Angular dispersion of a thin prism?', '$(n_v - n_r)A$.', 'formula', 4),
    fc(26, 'Dispersive power?', '$\\omega = (n_v - n_r)/(n - 1)$; no unit.', 'formula', 4),
    fc(27, 'Does dispersive power depend on the prism angle?', 'No: it depends only on the material.', 'concept', 4),
    fc(28, 'Three processes in a raindrop for the primary bow?', 'Refraction (with dispersion), one internal reflection, refraction.', 'concept', 4),
    fc(29, 'Colour on the outside of the primary rainbow?', 'Red (about 42° from the antisolar direction; violet about 40°).', 'fact', 4),
    fc(30, 'Exam tip: where to look for an evening rainbow?', 'East, with the sun in the west behind you.', 'exam-tip', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
