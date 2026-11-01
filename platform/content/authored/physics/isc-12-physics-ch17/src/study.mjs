// ISC 12 Physics ch17 notes and flashcards.
import { T, unit, PROV, r } from '../../isc-12-physics-ch01/src/lib.mjs';
import { V, fringePlot, ssPlot, envPlot, compareTable } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Wave Optics: Interference and Diffraction — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Wavefronts and Huygens’ principle',
      `- **Wavefront:** the locus of points vibrating in the same phase; it moves at the wave speed. In a uniform medium the **rays are perpendicular** to the wavefronts.
- **Shapes:** a point source gives **spherical** wavefronts (amplitude ∝ 1/r, intensity ∝ 1/r²); a line source gives **cylindrical** wavefronts (amplitude ∝ 1/√r, intensity ∝ 1/r); a very distant source gives **plane** wavefronts (no spreading, constant intensity).
- **Huygens’ principle:** every point of a wavefront is a source of secondary wavelets travelling forward at the wave speed v; after time t the new wavefront is the **forward envelope** (common tangent) of the wavelets of radius vt. The backward envelope is ignored (no backward wave is observed).
- A spherical wavefront of radius R becomes one of radius R + vt; a plane wavefront moves forward a distance vt and stays plane.`,
      [kt('Wavefront', 'A surface on which all points vibrate in the same phase.'), kt('Secondary wavelets', 'The small spherical waves that, by Huygens’ principle, spread from every point of a wavefront at the wave speed.')],
      [fm(r`I \propto \dfrac{1}{r^2}\ \text{(point)},\qquad I \propto \dfrac{1}{r}\ \text{(line)}`, 'Fall of intensity with distance')],
      V.wavefronts,
      [1],
      [V.huynew],
    ),
    sec(
      '2. Reflection and refraction from Huygens’ construction',
      `- **Reflection:** a plane wavefront AB meets the mirror at A; while B travels to C (BC = vt), the wavelet from A grows to AE = vt. The reflected wavefront CE is the tangent from C. Triangles ABC and CEA are right-angled (at B and E), share AC and have BC = AE, so they are congruent: **i = r**.
- **Refraction (rarer to denser, v₂ < v₁):** BC = v₁t, AE = v₂t, EC tangent from C. sin i = BC/AC, sin r = AE/AC, so $\\dfrac{\\sin i}{\\sin r} = \\dfrac{v_1}{v_2} = \\dfrac{n_2}{n_1}$ (Snell’s law), with n = c/v.
- **Denser to rarer:** the wavelet is longer than BC and the ray bends away from the normal; when (v₂/v₁) sin i > 1 the wavelet radius exceeds AC, no tangent exists and there is no refracted wave (total internal reflection).
- **In a medium:** frequency unchanged (set by the source); speed v = c/n; wavelength λ_m = λ/n.`,
      [kt('Refractive index', 'n = c/v, the ratio of the speed of light in vacuum to that in the medium; n₂/n₁ = v₁/v₂.')],
      [fm(r`\dfrac{\sin i}{\sin r} = \dfrac{v_1}{v_2} = \dfrac{n_2}{n_1}`, 'Snell’s law from Huygens’ construction'), fm(r`\lambda_m = \dfrac{\lambda}{n}`, 'Wavelength in a medium')],
      V.refract,
      [2],
      [V.reflect, V.out],
    ),
    sec(
      '3. Superposition, coherence and the conditions for interference',
      `- **Superposition:** where waves overlap, the resultant displacement is the sum of the separate displacements; I ∝ (amplitude)².
- **Phase difference** $\\varphi = \\dfrac{2\\pi}{\\lambda}\\Delta$ for a path difference Δ (sources in phase). **Constructive:** Δ = nλ, φ = 2nπ, amplitude a₁ + a₂. **Destructive:** Δ = (2n − 1)λ/2, φ = (2n − 1)π, amplitude |a₁ − a₂|.
- $I_{\\max} = (\\sqrt{I_1} + \\sqrt{I_2})^2$, $I_{\\min} = (\\sqrt{I_1} - \\sqrt{I_2})^2$.
- **Coherent sources:** same frequency and a constant phase difference. Two independent lamps are incoherent (random, short bursts of emission), so the intensities simply add: I = I₁ + I₂, no fringes.
- **Conditions for sustained, clear fringes:** coherent sources (derived from one source, e.g. by two slits or a laser); monochromatic light; nearly equal amplitudes (good contrast); narrow source slit; slits close together and the screen far enough away for β to be visible.`,
      [kt('Coherent sources', 'Sources of the same frequency with a constant phase difference between them.'), kt('Path difference', 'The difference in the distances travelled by two waves from their sources to a point.')],
      [fm(r`\varphi = \dfrac{2\pi}{\lambda}\,\Delta`, 'Phase difference from path difference'), fm(r`\dfrac{I_{\max}}{I_{\min}} = \dfrac{(a_1 + a_2)^2}{(a_1 - a_2)^2}`, 'Contrast of the fringes')],
      V.superpose,
      [3],
    ),
    sec(
      '4. Young’s double-slit experiment',
      `- A narrow slit S lights two slits S₁, S₂ (separation d), which act as coherent sources in phase; the screen is at distance D ≫ d.
- **Path difference** at a point P at height y: S₂P − S₁P ≈ S₂N = d sin θ ≈ yd/D (small angles).
- **Bright fringes:** yd/D = nλ, $y_n = \\dfrac{n\\lambda D}{d}$ (n = 0, 1, 2, …; the central fringe is bright). **Dark fringes:** $y_n = \\dfrac{(2n - 1)\\lambda D}{2d}$ (n = 1, 2, …).
- **Fringe width** $\\beta = \\dfrac{\\lambda D}{d}$, the same for all fringes; angular fringe width λ/d.
- **Effects:** β ∝ λ (red fringes wider than blue), β ∝ D, β ∝ 1/d; in a medium of index n, β′ = β/n. White light: white central fringe, coloured fringes beyond (violet edge inwards), soon merging. Widening the source slit or making one slit dimmer reduces the contrast; covering one slit removes the fringes.`,
      [kt('Fringe width', 'The distance between the centres of two neighbouring bright (or dark) fringes, β = λD/d.')],
      [fm(r`\Delta = d\sin\theta \approx \dfrac{yd}{D}`, 'Path difference'), fm(r`\beta = \dfrac{\lambda D}{d}`, 'Fringe width')],
      V.ydse,
      [4],
      [V.patterns],
    ),
    sec(
      '5. Intensity distribution in the double-slit pattern',
      `- Result (quoted; the derivation from the wave equations is not in the ISC syllabus): $I = I_1 + I_2 + 2\\sqrt{I_1 I_2}\\cos\\varphi$. For equal slits, $I = 4I_0\\cos^2\\dfrac{\\varphi}{2}$.
- **Sketch:** a cos² pattern against y (or θ): maxima 4I₀ at y = nβ, zeros at y = (n − ½)β, all maxima equally bright (narrow slits); the average over many fringes is 2I₀, so energy is conserved and only redistributed.
- **Unequal slits:** the same positions and spacing, but maxima (√I₁ + √I₂)² and non-zero minima (√I₁ − √I₂)²: poorer contrast.
- **Real slits** have a width a, so the fringes are modulated by the single-slit envelope, whose first zeros are at sin θ = ±λ/a.`,
      [kt('Contrast (visibility)', 'How dark the dark fringes are compared with the bright ones; best when the two slits give equal intensities.')],
      [fm(r`I = 4I_0\cos^2\dfrac{\varphi}{2}`, 'Equal slits'), fm(r`I_{\text{av}} = 2I_0`, 'Average intensity')],
      fringePlot,
      [5],
      [envPlot],
    ),
    sec(
      '6. Single-slit (Fraunhofer) diffraction and the central maximum',
      `- **Diffraction:** the spreading of light into the geometrical shadow when it passes a slit or edge comparable with its wavelength. Fraunhofer case: plane wavefront on the slit, pattern observed far away (or in the focal plane of a lens).
- **Central maximum:** straight ahead, all wavelets from the slit are in phase.
- **Minima:** $a\\sin\\theta = n\\lambda$ (n = ±1, ±2, …). For n = 1, divide the slit into two halves: each wavelet in the upper half has a partner a/2 lower, λ/2 behind, and they cancel in pairs.
- **Secondary maxima:** approximately at $a\\sin\\theta = \\left(n + \\tfrac{1}{2}\\right)\\lambda$ (divide into three, five, … parts: one part is left uncancelled), so they are faint (the first under 1/20 of the central intensity) and fade outwards.
- **Central maximum:** angular width $2\\theta_1 = \\dfrac{2\\lambda}{a}$, linear width $W = \\dfrac{2\\lambda D}{a}$; twice as wide as each secondary maximum. A narrower slit or longer wavelength widens it; in a liquid λ, and so W, is divided by n.
- **Compared with double-slit interference:** see the table.`,
      [kt('Diffraction', 'The bending and spreading of waves round obstacles or through apertures comparable in size with the wavelength.'), kt('Central maximum', 'The bright band between the first minima on either side of a single-slit pattern, of angular width 2λ/a.')],
      [fm(r`a\sin\theta = n\lambda`, 'Single-slit minima'), fm(r`W = \dfrac{2\lambda D}{a}`, 'Width of the central maximum')],
      ssPlot,
      [6, 7],
      [V.slit, V.central, compareTable],
    ),
  ],
  exam_tips_md: `- Huygens’ proofs: wavelet from the first point of contact, tangent from the last; equal times for BC and AE.
- In a medium: f unchanged, v and λ divided by n; fringe width and central-band width divided by n.
- Double slit: bright yd/D = nλ, dark (2n − 1)λ/2, β = λD/d; equal slits give I from 4I₀ to 0.
- Single slit: dark at a sin θ = nλ; central width 2λ/a (angle), 2λD/a (screen).`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What is a wavefront?', 'A surface on which every point vibrates in the same phase.', 'definition', 1),
    fc(2, 'Angle between a ray and the wavefront it crosses (uniform medium)?', '90°: rays are normal to wavefronts.', 'fact', 1),
    fc(3, 'Wavefronts from a long tube light?', 'Cylindrical; intensity ∝ 1/r.', 'fact', 1),
    fc(4, 'Wavefronts of sunlight reaching the Earth?', 'Plane (the source is very distant).', 'fact', 1),
    fc(5, 'Huygens’ principle in one line?', 'Every point of a wavefront emits secondary wavelets; the new wavefront is their forward envelope.', 'concept', 1),
    fc(6, 'Radius of a Huygens wavelet after time t?', 'vt, where v is the wave speed in that medium.', 'formula', 1),
    fc(7, 'Huygens’ proof of reflection: which triangles are congruent?', 'ABC and CEA (right angles at B and E, common AC, BC = AE).', 'concept', 2),
    fc(8, 'Snell’s law from Huygens’ construction?', '$\\dfrac{\\sin i}{\\sin r} = \\dfrac{v_1}{v_2} = \\dfrac{n_2}{n_1}$.', 'formula', 2),
    fc(9, 'Which property of light stays the same on refraction?', 'Frequency.', 'fact', 2),
    fc(10, 'Wavelength of light in a medium of index n?', 'λ/n.', 'formula', 2),
    fc(11, 'Light enters a slower medium: towards or away from the normal?', 'Towards: the wavelet in the slower medium is shorter.', 'concept', 2),
    fc(12, 'Principle of superposition?', 'The resultant displacement is the sum of the separate displacements.', 'definition', 3),
    fc(13, 'Phase difference for a path difference Δ?', '$\\varphi = \\dfrac{2\\pi}{\\lambda}\\Delta$.', 'formula', 3),
    fc(14, 'Path difference for a dark point (sources in phase)?', 'An odd number of half wavelengths, (2n − 1)λ/2.', 'concept', 3),
    fc(15, 'What makes two sources coherent?', 'Same frequency and a constant phase difference.', 'definition', 3),
    fc(16, 'Why do two lamps give no fringes?', 'Their phase difference changes randomly and rapidly: they are incoherent.', 'concept', 3),
    fc(17, 'Amplitudes 5 : 3 — ratio I_max : I_min?', '16 : 1.', 'example', 3),
    fc(18, 'Path difference at height y on the screen (double slit)?', 'd sin θ ≈ yd/D.', 'formula', 4),
    fc(19, 'Fringe width in Young’s experiment?', '$\\beta = \\dfrac{\\lambda D}{d}$.', 'formula', 4),
    fc(20, 'Position of the n-th dark fringe?', '(2n − 1)λD/(2d).', 'formula', 4),
    fc(21, 'Double-slit apparatus put in a liquid of index n: fringe width?', 'β/n.', 'fact', 4),
    fc(22, 'λ = 560 nm, d = 0.35 mm, D = 1.25 m: β?', '2.0 mm.', 'example', 4),
    fc(23, 'Intensity at a point, equal slits, phase difference φ?', '$I = 4I_0\\cos^2(\\varphi/2)$.', 'formula', 5),
    fc(24, 'Average intensity of a double-slit pattern with equal slits?', '2I₀: energy is redistributed, not lost.', 'concept', 5),
    fc(25, 'One slit made dimmer: effect on the fringes?', 'Same positions and width; minima no longer zero (poorer contrast).', 'concept', 5),
    fc(26, 'Condition for single-slit minima?', 'a sin θ = nλ, n = ±1, ±2, …', 'formula', 6),
    fc(27, 'Where are the secondary maxima of a single slit (approximately)?', 'a sin θ = (n + ½)λ; faint, fading outward.', 'concept', 6),
    fc(28, 'Angular width of the central maximum?', '2λ/a.', 'formula', 7),
    fc(29, 'Linear width of the central maximum on a screen at D?', '2λD/a.', 'formula', 7),
    fc(30, 'Exam tip: single slit narrowed — central band?', 'Wider (width ∝ 1/a).', 'exam-tip', 7),
  ],
  status: 'draft',
  provenance: PROV,
};
