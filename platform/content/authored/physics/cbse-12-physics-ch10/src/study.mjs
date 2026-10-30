// ch10 notes and flashcards.
import { T, unit, PROV, r } from '../../cbse-12-physics-ch01/src/lib.mjs';
import { V, intPlot, fringePlot, ssPlot } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Wave Optics — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Wavefronts and Huygens’ principle',
      `- A **wavefront** is the locus of points oscillating in the same phase; **rays are normal** to wavefronts. Point source → spherical; line source → cylindrical; distant source → plane.
- **Huygens’ principle:** every point of a wavefront is a source of secondary wavelets spreading at the wave speed; the new wavefront after time $t$ is the **forward envelope** of wavelets of radius $vt$.`,
      [kt('Wavefront', 'A surface on which all points vibrate in the same phase.'), kt('Secondary wavelets', 'Waves imagined to spread from every point of a wavefront (Huygens).')],
      [],
      V.wf,
      [1],
    ),
    sec(
      '2. Reflection and refraction by Huygens’ construction',
      `**Reflection:** plane wavefront AB meets the mirror at A. In time $t$, B moves to C ($BC = vt$) and the wavelet from A grows to $AE = vt$. The reflected wavefront CE is tangent to it. Right triangles ABC and CEA share hypotenuse AC with $BC = AE$, so they are congruent and $i = r$.

**Refraction** ($v_2 < v_1$): in time $t$, $BC = v_1 t$ in medium 1 and $AE = v_2 t$ in medium 2. Then $\\sin i = BC/AC$, $\\sin r = AE/AC$, so
$$\\dfrac{\\sin i}{\\sin r} = \\dfrac{v_1}{v_2} = \\dfrac{n_2}{n_1} = n_{21}\\quad\\Rightarrow\\quad n_1\\sin i = n_2\\sin r.$$
On refraction the **frequency stays the same**; speed and wavelength both fall by the factor $n$: $\\lambda' = \\lambda/n$.`,
      [kt('Refractive index', 'n = c/v; the ratio n₂₁ = v₁/v₂ for light going from medium 1 to medium 2.')],
      [fm(r`\dfrac{\sin i}{\sin r} = \dfrac{v_1}{v_2} = n_{21}`, 'Snell’s law from Huygens'), fm(r`\lambda' = \dfrac{\lambda}{n}`, 'Wavelength in a medium')],
      V.refr,
      [1],
      [V.refl],
    ),
    sec(
      '3. Coherent sources and interference',
      `- **Superposition:** the resultant displacement is the sum of the individual displacements.
- **Coherent sources:** same frequency and a **constant phase difference**. Ordinary independent sources change phase randomly (each atom emits for about $10^{-9}$ s), so no steady pattern forms. Coherent sources are derived from one source (dividing a wavefront, as in Young’s slits) or are lasers.
- Phase difference $\\varphi = \\dfrac{2\\pi}{\\lambda}\\Delta$ for path difference $\\Delta$ (sources in phase).
- **Constructive:** $\\Delta = n\\lambda$, $\\varphi = 2n\\pi$. **Destructive:** $\\Delta = (n + \\tfrac12)\\lambda$, $\\varphi = (2n + 1)\\pi$.
- **Intensity:** $I = I_1 + I_2 + 2\\sqrt{I_1I_2}\\cos\\varphi$; for equal $I_0$, $I = 4I_0\\cos^2(\\varphi/2)$. $I_\\text{max}/I_\\text{min} = (a_1 + a_2)^2/(a_1 - a_2)^2$. Incoherent: $I = I_1 + I_2$. Energy is redistributed, not destroyed.
- Conditions for a clear, sustained pattern: coherent sources; nearly equal amplitudes; narrow sources close together; monochromatic light.`,
      [kt('Coherent sources', 'Sources of the same frequency with a constant phase difference.'), kt('Path difference', 'The difference in distances travelled by two waves to a point.')],
      [fm(r`I = 4I_0\cos^2\dfrac{\varphi}{2}`, 'Two equal coherent waves'), fm(r`\varphi = \dfrac{2\pi}{\lambda}\Delta`, 'Phase and path difference')],
      intPlot,
      [2],
    ),
    sec(
      '4. Young’s double-slit experiment',
      `Slits S₁, S₂ (separation $d$) lit from one narrow slit act as coherent sources; screen at distance $D \\gg d$. Path difference at height $y$: $\\Delta = yd/D$.
- Bright: $y_n = \\dfrac{n\\lambda D}{d}$; dark: $y = \\left(n + \\tfrac12\\right)\\dfrac{\\lambda D}{d}$ ($n = 0, 1, 2, \\dots$).
- **Fringe width** $\\beta = \\dfrac{\\lambda D}{d}$ (bright and dark fringes equally wide); angular fringe width $\\lambda/d$.
- $\\beta$ increases with $\\lambda$ and $D$, decreases with $d$; in a liquid $\\beta' = \\beta/n$.
- White light: central fringe white, a few coloured fringes (blue nearer the centre), then uniform illumination.`,
      [kt('Fringe width', 'Distance between consecutive bright (or dark) fringes, β = λD/d.')],
      [fm(r`\beta = \dfrac{\lambda D}{d}`, 'Fringe width'), fm(r`y_n = \dfrac{n\lambda D}{d}`, 'Position of nth bright fringe')],
      V.ydse,
      [3],
      [fringePlot],
    ),
    sec(
      '5. Diffraction at a single slit',
      `- **Diffraction:** bending of light round edges into the geometrical shadow; noticeable when the slit width $a$ is comparable to $\\lambda$.
- Wavelets from all points of the slit superpose. At $\\theta = 0$ all are in phase: bright central maximum.
- **Minima:** $a\\sin\\theta = n\\lambda$ ($n = \\pm1, \\pm2, \\dots$): split the slit into $2n$ parts whose wavelets cancel in pairs. Weak secondary maxima lie roughly midway.
- **Central maximum:** angular width $2\\lambda/a$, linear width $2\\lambda D/a$; twice as wide as the secondary maxima and much brighter.
- Narrower slit or longer wavelength → **wider** pattern.
- Interference (two sources, equal fringes of equal brightness) vs diffraction (one slit, wide bright centre, fading side maxima).`,
      [kt('Diffraction', 'Spreading of a wave as it passes an obstacle or aperture comparable in size to its wavelength.'), kt('Central maximum', 'Bright band between the first minima on either side, of angular width 2λ/a.')],
      [fm(r`a\sin\theta = n\lambda\ \ (\text{minima})`, 'Single-slit minima'), fm(r`w = \dfrac{2\lambda D}{a}`, 'Width of the central maximum')],
      V.ss,
      [4],
      [ssPlot],
    ),
  ],
  exam_tips_md: `- Huygens proofs: labelled figure, equal times give $BC = v_1t$, $AE = v_2t$, then sines from right triangles.
- Coherent: same frequency and constant phase difference — give both.
- Convert to metres; $\\beta = \\lambda D/d$; $n$th dark fringe at $(n - \\tfrac12)\\beta$.
- Single slit: central maximum $2\\lambda/a$ wide in angle; narrower slit → wider pattern.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What is a wavefront?', 'A surface of points oscillating in the same phase.', 'concept', 1),
    fc(2, 'Wavefront from a very distant source?', 'Plane.', 'fact', 1),
    fc(3, 'Wavefront from a point source?', 'Spherical.', 'fact', 1),
    fc(4, 'Relation between rays and wavefronts?', 'Rays are perpendicular to wavefronts.', 'concept', 1),
    fc(5, 'Huygens’ principle in one line?', 'Each point of a wavefront emits secondary wavelets; the new wavefront is their forward envelope.', 'concept', 1),
    fc(6, 'Huygens reflection: which lengths are equal?', 'BC = AE = vt, giving congruent triangles and i = r.', 'concept', 1),
    fc(7, 'Snell’s law from Huygens?', '$\\sin i/\\sin r = v_1/v_2 = n_{21}$.', 'formula', 1),
    fc(8, 'What stays the same when light enters glass?', 'Frequency (speed and wavelength fall by n).', 'fact', 1),
    fc(9, 'Wavelength in a medium of index n?', '$\\lambda/n$.', 'formula', 1),
    fc(10, 'Coherent sources?', 'Same frequency and a constant phase difference.', 'concept', 2),
    fc(11, 'Why are two bulbs not coherent?', 'Their phases change randomly and independently (about every 10⁻⁹ s).', 'concept', 2),
    fc(12, 'Condition for constructive interference?', 'Path difference nλ (phase 2nπ).', 'formula', 2),
    fc(13, 'Condition for destructive interference?', 'Path difference (n + ½)λ (phase (2n + 1)π).', 'formula', 2),
    fc(14, 'Phase difference from path difference?', '$\\varphi = 2\\pi\\Delta/\\lambda$.', 'formula', 2),
    fc(15, 'Resultant of two equal coherent waves?', '$I = 4I_0\\cos^2(\\varphi/2)$.', 'formula', 2),
    fc(16, 'I_max/I_min for amplitudes a₁, a₂?', '$(a_1 + a_2)^2/(a_1 - a_2)^2$.', 'formula', 2),
    fc(17, 'Is energy lost at dark fringes?', 'No; it is redistributed to bright fringes (average 2I₀).', 'concept', 2),
    fc(18, 'Fringe width in YDSE?', '$\\beta = \\lambda D/d$.', 'formula', 3),
    fc(19, 'Position of nth bright fringe?', '$y_n = n\\lambda D/d$.', 'formula', 3),
    fc(20, 'Angular fringe width?', '$\\lambda/d$.', 'formula', 3),
    fc(21, 'Fringe width when YDSE is put in water (n)?', 'β/n.', 'fact', 3),
    fc(22, 'Central fringe with white light?', 'White (zero path difference for all colours).', 'fact', 3),
    fc(23, 'Example: λ = 600 nm, d = 0.30 mm, D = 1.5 m. β?', '3.0 mm.', 'example', 3),
    fc(24, 'Single-slit minima condition?', '$a\\sin\\theta = n\\lambda$, n = ±1, ±2, …', 'formula', 4),
    fc(25, 'Angular width of the single-slit central maximum?', '$2\\lambda/a$.', 'formula', 4),
    fc(26, 'Effect of narrowing the slit?', 'The central maximum becomes wider.', 'concept', 4),
    fc(27, 'Central maximum vs secondary maxima?', 'Twice as wide and much brighter.', 'fact', 4),
    fc(28, 'When is diffraction noticeable?', 'When the aperture is comparable to the wavelength.', 'concept', 4),
    fc(29, 'Exam tip: second dark fringe in YDSE?', 'At 1.5β from the centre.', 'exam-tip', 3),
    fc(30, 'Exam tip: units in β = λD/d?', 'Convert nm and mm to metres first.', 'exam-tip', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
