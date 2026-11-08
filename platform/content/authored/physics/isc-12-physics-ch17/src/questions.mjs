// ISC 12 Physics ch17 Wave Optics: Interference and Diffraction — question bank (ISC style).
// Numbers computed and re-checked. Intensity results are quoted (I = I₁ + I₂ + 2√(I₁I₂) cos φ), not derived from the wave
// equations (an ISC removed topic); single-slit items stay at the elementary level (minima a sin θ = nλ, secondary maxima
// near (n + ½)λ, width of the central maximum). Checks re-solve each numerical independently (exact geometry, intensity
// functions from svgs.mjs, or a different route through the formulas).
import { mk, add, r, dec, near } from '../../isc-12-physics-ch01/src/lib.mjs';
import { twoBeam, sinc2, singleSlit, doubleSlit, fringeWidth, refrAngle, C_LIGHT } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const sinD = (d) => Math.sin((d * Math.PI) / 180);
const asinD = (x) => (Math.asin(x) * 180) / Math.PI;

// ================================================================ t01 wavefronts and Huygens' principle
add('wfline-mcq', mcq({
  stem: 'A straight sodium-vapour street-lamp tube 1.5 m long glows evenly along its whole length. At a point 15 cm from the middle of the tube, the wavefronts of its light are best described as',
  right: 'coaxial cylinders with the tube as their common axis',
  wrong: ['spheres centred on the middle of the tube', 'planes parallel to the tube', 'planes perpendicular to the tube'],
  sol: 'At a distance small compared with the length of the tube, it acts as a line source: every part of it radiates alike, so points of equal phase lie at equal distances from the line of the tube: coaxial cylinders. Spheres belong to a point source and planes to a very distant one — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
const env = { v: 2.0e8, t: 0.5e-9 };
env.r = env.v * env.t;
add('envelope-mcq', mcq({
  stem: 'A plane wavefront of light travels through a glass in which the speed of light is 2.0 × 10⁸ m s⁻¹. To find where it is 0.50 ns later by Huygens’ construction, secondary wavelets are drawn from points on the wavefront with a radius of',
  right: '10 cm, and the new wavefront is the plane touching their forward edges',
  wrong: ['15 cm, and the new wavefront is the plane touching their forward edges', '10 cm, and the new wavefront is the plane through their centres', '5.0 cm, and the new wavefront is the plane touching their forward edges'],
  sol: r`Wavelet radius $vt = 2.0 \times 10^{8} \times 0.50 \times 10^{-9} = ${dec(env.r, 2)}$ m $= 10$ cm, using the speed **in the glass** (15 cm would use the speed in vacuum). The new wavefront is the forward envelope of the wavelets — option (@K).`,
  d: 2, c: 'understanding', t: [1],
}), () => near(env.r, 0.1) || `env ${env.r}`);
add('amp-mcq', mcq({
  stem: 'A glowing wire 3 m long acts as a line source for points near its middle. The amplitude of its light wave is A at 10 cm from the wire. At 40 cm from the wire the amplitude is',
  right: 'A/2',
  wrong: ['A/4', 'A/16', 'A'],
  sol: r`Cylindrical wavefronts: the energy spreads over an area $\propto r$, so $I \propto 1/r$ and amplitude $\propto 1/\sqrt{r}$. At four times the distance the amplitude is $A/\sqrt{4} = A/2$. (A/4 would hold for a point source; A for a plane wave) — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => near(Math.sqrt(1 / 4), 0.5) || 'amp');
const cyl = { I1: 9.0, r1: 0.1, r2: 0.4 };
cyl.I2 = (cyl.I1 * cyl.r1) / cyl.r2;
add('cyl-num', num({
  stem: 'At 10 cm from the middle of a 1.8 m fluorescent tube light, the intensity of its light is 9.0 W m⁻². Treating the tube as a line source, find the intensity at 40 cm from it, in W m⁻².',
  value: Number(dec(cyl.I2, 3)), tol: 0.05, unit: 'W m⁻²',
  sol: r`A line source gives cylindrical wavefronts of area $2\pi r L$, so $I \propto \dfrac{1}{r}$: $I_2 = 9.0 \times \dfrac{10}{40} =${dec(cyl.I2, 3)}$ W m⁻².`,
  scheme: [['Cylindrical wavefronts: I ∝ 1/r', 1], ['I = 9.0 × 10/40 = 2.25 W m⁻²', 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => {
  // independent: same power through cylinders of radius r1 and r2 (unit length)
  const P = cyl.I1 * 2 * Math.PI * cyl.r1;
  return (near(P / (2 * Math.PI * cyl.r2), 2.25) && q.answer.value === 2.25) || `cyl ${cyl.I2}`;
});
add('point-tf', tf({
  stem: 'A small LED behaves as a point source. Moving from 0.5 m to 1.0 m away from it halves the amplitude of its light wave and reduces the intensity to a quarter.',
  key: 't',
  sol: 'True. Spherical wavefronts: I ∝ 1/r² and amplitude ∝ 1/r, so doubling r halves the amplitude and quarters the intensity.',
  d: 1, c: 'understanding', t: [1],
}), () => near((0.5 / 1.0) ** 2, 0.25) || 'ptf');
add('sphere-fill', fill({
  stem: 'A small lamp sends out spherical wavefronts. On the wavefront 3.0 m from the lamp the intensity is I; on the wavefront 6.0 m from the lamp the intensity is ___ I.',
  acc: [['0.25', '1/4', '0.250']],
  sol: r`The same power crosses spheres of area $4\pi r^2$, so $I \propto 1/r^2$: $\left(\dfrac{3.0}{6.0}\right)^2 = 0.25$.`,
  d: 2, c: 'understanding', t: [1],
}), (q) => near((3 / 6) ** 2, 0.25) && q.answer.blanks[0].accepted[0] === '0.25' || 'sph');
const adv = 1.8e8 * 1.5e-9 * 100;
add('advance-num', num({
  stem: 'Light travels at 1.8 × 10⁸ m s⁻¹ in a block of flint glass. Using Huygens’ construction, how far does a plane wavefront inside the block move forward in 1.5 ns? Answer in cm.',
  value: Number(dec(adv, 2)), tol: 0.3, unit: 'cm',
  sol: r`The wavelets have radius $vt = 1.8 \times 10^{8} \times 1.5 \times 10^{-9} = 0.27$ m $= ${dec(adv, 2)}$ cm, and the new plane wavefront touches their forward edges, so it moves forward ${dec(adv, 2)} cm.`,
  scheme: [['vt = 0.27 m = 27 cm', 1]],
  d: 2, c: 'understanding', t: [1],
}), (q) => near(adv, 27) && q.answer.value === 27 || `adv ${adv}`);
add('huygens-short2', short({
  marks: 2,
  stem: 'State Huygens’ principle. Use it to explain why a plane wavefront travelling through a uniform medium stays plane.',
  model: 'Every point of a wavefront acts as a source of secondary wavelets that spread forward at the wave speed; the new wavefront is their forward envelope. In a uniform medium all wavelets from a plane wavefront have the same radius vt, so the surface touching them is a plane parallel to the original, a distance vt ahead.',
  sol: 'Equal wavelet radii from every point; common tangent is a parallel plane.',
  scheme: [['Statement: secondary wavelets; new wavefront is their forward envelope', 1], ['Equal radii vt, so the envelope is a parallel plane vt ahead', 1]],
  d: 2, c: 'understanding', t: [1],
}));
const src = { r1: 0.5, r2: 2.0 };
src.point = (src.r1 / src.r2) ** 2;
src.line = src.r1 / src.r2;
add('sources-short3', short({
  marks: 3,
  stem: 'Name the shape of the wavefronts reaching an observer from (a) a small torch bulb, (b) a long tube light, (c) the Sun. Find the ratio of the intensity at 2.0 m from the bulb to that at 0.50 m, and the ratio of the intensity at 40 cm from the middle of the tube to that at 10 cm.',
  model: r`(a) **Spherical** wavefronts: $I \propto 1/r^2$, so $\dfrac{I(2.0)}{I(0.50)} = \left(\dfrac{0.50}{2.0}\right)^2 = ${dec(src.point, 3)}$, i.e. 1 : 16.
(b) **Cylindrical** wavefronts: $I \propto 1/r$, so the ratio is $\dfrac{10}{40} = ${dec(src.line, 2)}$, i.e. 1 : 4 (close to a long tube, it acts as a line source).
(c) The Sun is so far away that the wavefronts reaching us are effectively **plane** (constant intensity over a small region).`,
  sol: 'I ∝ 1/r² for spherical, 1/r for cylindrical wavefronts.',
  scheme: [['Spherical, cylindrical, plane', 1], ['Point source: 1 : 16', 1], ['Line source: 1 : 4', 1]],
  d: 2, c: 'application', t: [1], wl: null,
}), () => near(src.point, 1 / 16) && near(src.line, 0.25) || 'src');
add('wavefront-match', match({
  stem: 'Match each light source in Column A, observed at the place described, with the shape of its wavefronts there in Column B.',
  pairs: [
    ['A tiny LED, seen from 3 m away', 'Spheres spreading out from the LED'],
    ['A long straight neon tube, seen from 10 cm away', 'Cylinders round the tube'],
    ['A star, as its light enters a telescope', 'Parallel planes'],
    ['Light from a distant lamp just after a convex lens has started to focus it', 'Spheres shrinking towards a point'],
  ],
  order: [2, 0, 3, 1],
  sol: 'A point source gives diverging spheres (1 → r); a line source gives coaxial cylinders (2 → p); a very distant source gives plane wavefronts (3 → s); a convex lens turns plane wavefronts into spheres converging on its focus (4 → q).',
  d: 2, c: 'understanding', t: [1],
}));

// ================================================================ t02 reflection and refraction from Huygens' construction
add('reflect-short3', short({
  marks: 3,
  stem: 'A plane wavefront AB of light strikes a flat polished steel plate obliquely, edge A first. Using a construction based on Huygens’ principle (described in words), show that the reflected wavefront makes the same angle with the plate as AB does, and hence that the angle of reflection equals the angle of incidence.',
  model: r`Let the edge B reach the plate at C after a time $t$, so $BC = vt$, with BC perpendicular to AB. Meanwhile the wavelet from A, in the same medium, grows to radius $AE = vt$. The reflected wavefront is the **tangent CE** from C to this wavelet, so $\angle AEC = 90°$.
Right-angled triangles ABC and CEA have the common hypotenuse AC and $BC = AE$, so they are **congruent**: $\angle BAC = \angle ECA$.
These are the angles the incident and reflected wavefronts make with the plate, equal to the angles the rays make with the normal: $i = r$.`,
  sol: 'BC = AE = vt; congruent right-angled triangles.',
  scheme: [['Wavelet from A of radius vt while B travels BC = vt', 1], ['Reflected wavefront is the tangent from C; right angles at B and E', 1], ['Congruent triangles give i = r', 1]],
  d: 2, c: 'understanding', t: [2], wl: null,
}));
add('refract-short3', short({
  marks: 3,
  stem: 'A plane wavefront in air reaches the flat surface of a glass slab obliquely. Light travels at speed v₁ in air and v₂ in glass. Using Huygens’ construction, show that sin i / sin r = v₁/v₂, and explain why the ray bends towards the normal.',
  model: r`The wavefront AB touches the surface first at A. In the time $t$ that the edge B takes to reach the surface at C, $BC = v_1 t$, while the wavelet from A spreads into the glass to radius $AE = v_2 t$. The refracted wavefront is the **tangent EC** from C to this wavelet.
In right-angled triangles ABC and AEC (common hypotenuse AC): $\sin i = \dfrac{BC}{AC}$ and $\sin r = \dfrac{AE}{AC}$, so $\dfrac{\sin i}{\sin r} = \dfrac{v_1 t}{v_2 t} = \dfrac{v_1}{v_2}$, a constant (Snell’s law).
Since $v_2 < v_1$, $AE < BC$, so $\sin r < \sin i$: the ray bends **towards** the normal.`,
  sol: 'BC = v₁t, AE = v₂t; sines from the two right-angled triangles.',
  scheme: [['BC = v₁t and AE = v₂t in the same time; EC tangent from C', 1], ['sin i = BC/AC, sin r = AE/AC, giving sin i / sin r = v₁/v₂', 1], ['v₂ < v₁ so r < i: towards the normal', 1]],
  d: 2, c: 'understanding', t: [2], wl: null,
}));
const qz = { i: 48, r: 29 };
qz.v = (C_LIGHT * sinD(qz.r)) / sinD(qz.i);
add('crystal-num', num({
  stem: 'A narrow beam of light in air strikes a polished face of a quartz crystal at an angle of incidence of 48° and is refracted at 29°. Using sin i / sin r = v₁/v₂, find the speed of light in the quartz, in units of 10⁸ m s⁻¹ (3 significant figures).',
  value: Number(dec(qz.v / 1e8, 3)), tol: 0.01, unit: '10⁸ m s⁻¹',
  sol: r`$v_2 = v_1\dfrac{\sin r}{\sin i} = 3.0 \times 10^{8} \times \dfrac{\sin 29°}{\sin 48°} = 3.0 \times 10^{8} \times \dfrac{0.485}{0.743} = 1.957 \times 10^{8}$ m s⁻¹, so in units of $10^{8}$ m s⁻¹, $v_2 = ${dec(qz.v / 1e8, 3)}$.`,
  scheme: [['v₂ = v₁ sin r / sin i', 1], ['v₂ = 1.96 × 10⁸ m s⁻¹', 1]],
  marks: 2, d: 2, c: 'understanding', t: [2],
}), (q) => {
  // independent: index from the angles, then v = c/n
  const n = sinD(48) / sinD(29);
  return (near(C_LIGHT / n / 1e8, 1.957, 1e-3) && q.answer.value === 1.96) || `qz ${qz.v}`;
});
const wg = { n1: 1.33, n2: 1.6, i: 42 };
wg.r = asinD((wg.n1 * sinD(wg.i)) / wg.n2);
add('waterglass-num', num({
  stem: 'Light travelling in water (n = 1.33) meets the flat face of a glass plate (n = 1.60) lying under the water, at an angle of incidence of 42°. Find the angle of refraction in the glass, in degrees (1 decimal place).',
  value: Number(wg.r.toFixed(1)), tol: 0.2, unit: '°',
  sol: r`$\dfrac{\sin i}{\sin r} = \dfrac{v_1}{v_2} = \dfrac{n_2}{n_1}$, so $\sin r = \dfrac{1.33 \sin 42°}{1.60} = \dfrac{1.33 \times 0.669}{1.60} = ${dec((1.33 * sinD(42)) / 1.6, 3)}$ and $r = ${wg.r.toFixed(1)}$°.`,
  scheme: [['sin r = (n₁/n₂) sin i', 1], ['r = 33.8°', 1]],
  marks: 2, d: 3, c: 'understanding', t: [2],
}), (q) => {
  // independent: speeds in the two media and Huygens' ratio
  const v1 = C_LIGHT / 1.33;
  const v2 = C_LIGHT / 1.6;
  return (near(refrAngle(42, v1, v2), 33.80, 1e-3) && q.answer.value === 33.8) || `wg ${wg.r}`;
});
const dia = { lam: 660e-9, n: 2.4 };
dia.lamM = dia.lam / dia.n;
dia.v = C_LIGHT / dia.n;
add('diamond-mcq', mcq({
  stem: 'Red light of wavelength 660 nm in air passes into a diamond of refractive index 2.4. Inside the diamond, the wavelength and the speed of the light are',
  right: '275 nm and 1.25 × 10⁸ m s⁻¹',
  wrong: ['660 nm and 1.25 × 10⁸ m s⁻¹', '1584 nm and 7.2 × 10⁸ m s⁻¹', '275 nm and 3.0 × 10⁸ m s⁻¹'],
  sol: r`The frequency is unchanged, so both speed and wavelength are divided by n: $\lambda_m = \dfrac{660}{2.4} = ${dec(dia.lamM * 1e9, 3)}$ nm and $v = \dfrac{3.0 \times 10^{8}}{2.4} = 1.25 \times 10^{8}$ m s⁻¹ — option (@K).`,
  d: 2, c: 'understanding', t: [2],
}), () => near(dia.lamM, 275e-9) && near(dia.v, 1.25e8) && near(dia.v / dia.lamM, C_LIGHT / dia.lam) || 'dia');
add('freq-ar', ar({
  a: 'When light passes from air into glass, its frequency does not change.',
  r: 'The speed of light in glass is less than its speed in air.',
  key: 'b',
  sol: 'Both are true, but R does not explain A. The frequency is fixed because the vibrations at the boundary are driven by the incoming wave, crest for crest; the lower speed explains the shorter wavelength and the bending, not the unchanged frequency — option (b).',
  d: 2, c: 'understanding', t: [2],
}));
add('denser-tf', tf({
  stem: 'In Huygens’ construction for light passing from glass into air, the secondary wavelet drawn in the air is shorter than the distance the incident wavefront moves in the glass in the same time.',
  key: 'f',
  sol: 'False. Light is faster in air, so in the same time the wavelet in air grows to AE = (v_air/v_glass) BC = n BC, longer than BC; that is why the ray bends away from the normal.',
  d: 2, c: 'understanding', t: [2],
}), () => refrAngle(30, 2, 3) > 30 || 'dtf');
add('mirrorwf-mcq', mcq({
  stem: 'A plane wavefront of light meets a flat mirror with the wavefront inclined at 25° to the mirror surface. Just after reflection, the reflected wavefront makes with the mirror an angle of',
  right: '25°, tilted the opposite way',
  wrong: ['65°, tilted the opposite way', '25°, tilted the same way', '50°, tilted the opposite way'],
  sol: 'In Huygens’ construction the congruent triangles ABC and CEA make the reflected wavefront CE meet the mirror at the same angle as AB, but sloping the other way (the angle of incidence 25° equals the angle of reflection). The same tilt would mean no reflection at all — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
const tir = { n: 1.5, i: 45 };
tir.ratio = tir.n * sinD(tir.i); // AE / AC
add('tirhuy-short2', short({
  marks: 2,
  stem: 'Light in a glass block (n = 1.5) strikes the glass–air surface at an angle of incidence of 45°. Use Huygens’ construction to explain why no refracted wavefront forms in the air.',
  model: r`While the edge B of the incident wavefront moves $BC = v_1 t$ in the glass, the wavelet from A in air grows to $AE = v_2 t = 1.5\,BC$. But $AC = \dfrac{BC}{\sin 45°} = 1.41\,BC$, so $AE > AC$: C lies **inside** the wavelet and no tangent from C can touch it. There is no refracted wavefront; the light is totally reflected.`,
  sol: 'AE = 1.5 BC exceeds AC = 1.41 BC.',
  scheme: [['AE = 1.5 BC compared with AC = BC/sin 45° = 1.41 BC', 1], ['AE > AC: no tangent from C, no refracted wave (total reflection)', 1]],
  d: 3, c: 'analysis', t: [2], wl: null,
}), () => near(tir.ratio, 1.0607, 1e-3) && Number.isNaN(refrAngle(45, 2, 3)) || `tir ${tir.ratio}`);

// ================================================================ t03 superposition, path and phase difference, coherence
const ph = { lam: 720e-9, p: 1.08e-6 };
ph.k = (2 * ph.p) / ph.lam; // phase difference in units of π
add('phase-num', num({
  stem: 'Two coherent sources vibrate in phase and emit light of wavelength 720 nm. At a point where their waves have a path difference of 1.08 μm, what is the phase difference between them? Give it in units of π rad.',
  value: Number(dec(ph.k, 2)), tol: 0.05, unit: 'π rad',
  sol: r`$\varphi = \dfrac{2\pi}{\lambda}\Delta = 2\pi \times \dfrac{1.08 \times 10^{-6}}{720 \times 10^{-9}} = 2\pi \times 1.5 = ${dec(ph.k, 2)}\pi$ rad, so in units of π rad, $\varphi/\pi = ${dec(ph.k, 2)}$ (the point is dark).`,
  scheme: [['φ = (2π/λ)Δ = 3π rad', 1]],
  d: 2, c: 'understanding', t: [3],
}), (q) => near(Math.cos(ph.k * Math.PI), -1) && q.answer.value === 3 || `ph ${ph.k}`);
const bp = { lam: 480e-9, opts: [1.2e-6, 1.68e-6, 1.92e-6, 2.16e-6] };
bp.ratios = bp.opts.map((p) => p / bp.lam);
add('brightpick-mcq', mcq({
  stem: 'Two coherent sources in phase emit light of wavelength 480 nm. Points on a screen are described by the path difference between the two waves arriving there. Which point is at the centre of a bright fringe?',
  right: 'the point with path difference 1.92 μm',
  wrong: ['the point with path difference 1.20 μm', 'the point with path difference 1.68 μm', 'the point with path difference 2.16 μm'],
  sol: r`Divide by λ: 1.20 μm → 2.5λ, 1.68 μm → 3.5λ, 1.92 μm → 4.0λ, 2.16 μm → 4.5λ. Only 1.92 μm is a whole number of wavelengths (constructive); the others are odd half wavelengths (dark) — option (@K).`,
  d: 2, c: 'understanding', t: [3],
}), () => near(bp.ratios[2], 4) && [0, 1, 3].every((k) => near(bp.ratios[k] % 1, 0.5)) || `bp ${bp.ratios}`);
add('phasepath-mcq', mcq({
  stem: 'Two sources emit light of wavelength λ in phase. At a point P the waves from them have a phase difference of 5π/2. The path difference at P is',
  right: '5λ/4',
  wrong: ['5λ/2', '5λ', '5λ/8'],
  sol: r`$\Delta = \dfrac{\lambda}{2\pi}\varphi = \dfrac{\lambda}{2\pi} \times \dfrac{5\pi}{2} = \dfrac{5\lambda}{4}$ — option (@K).`,
  d: 1, c: 'understanding', t: [3],
}), () => near((1 / (2 * Math.PI)) * ((5 * Math.PI) / 2), 1.25) || 'pp');
add('headlamp-short2', short({
  marks: 2,
  stem: 'The two headlamps of a parked car, fitted with identical bulbs, light up the same patch of a wall. Explain why no interference fringes are seen, and state how Young obtained two sources that do give fringes.',
  model: 'The lamps are independent, so they are not coherent: each atom emits short bursts with random phase, and the phase difference between the lamps changes millions of times a second. Any fringes shift too fast to see, so intensities simply add. Young lit two slits from one narrow slit, dividing one wavefront.',
  sol: 'Independent lamps are incoherent; Young split one wavefront.',
  scheme: [['Random, rapidly changing phase difference: incoherent, intensities add', 1], ['Two slits lit by one narrow slit (same wavefront) are coherent', 1]],
  d: 2, c: 'understanding', t: [3],
}));
const flt = { ratio: 9 / 16 };
flt.amp = Math.sqrt(flt.ratio);
flt.c = (1 + flt.amp) ** 2 / (1 - flt.amp) ** 2;
add('filter-num', num({
  stem: 'In a double-slit set-up, one slit is covered with a tinted film, so that the light reaching the screen from it has 9/16 of the intensity of the light from the other slit. Find the ratio of the intensity at a bright fringe to that at a dark fringe.',
  value: Number(dec(flt.c, 2)), tol: 0.5, unit: null,
  sol: r`Amplitudes are as the square roots of the intensities: $\dfrac{a_2}{a_1} = \sqrt{\dfrac{9}{16}} = \dfrac{3}{4}$. Then $\dfrac{I_{\max}}{I_{\min}} = \dfrac{(4 + 3)^2}{(4 - 3)^2} = ${dec(flt.c, 2)}$.`,
  scheme: [['Amplitude ratio 4 : 3', 1], ['I_max/I_min = 49', 1]],
  marks: 2, d: 3, c: 'application', t: [3, 5],
}), (q) => {
  const I1 = 16;
  const I2 = 9;
  return (near(twoBeam(I1, I2, 0) / twoBeam(I1, I2, Math.PI), 49) && q.answer.value === 49) || `flt ${flt.c}`;
});
const ct = { c: 25 };
ct.k = Math.sqrt(ct.c); // (a1 + a2)/(a1 − a2)
ct.a = (ct.k + 1) / (ct.k - 1);
ct.I = ct.a ** 2;
add('contrast-num', num({
  stem: 'A light meter moved across a double-slit pattern reads 25 times as much at the bright fringes as at the dark fringes. Find the ratio of the intensities of the light from the two slits, larger to smaller (3 significant figures).',
  value: Number(dec(ct.I, 3)), tol: 0.02, unit: null,
  sol: r`$\dfrac{a_1 + a_2}{a_1 - a_2} = \sqrt{25} = 5$, so $a_1 + a_2 = 5a_1 - 5a_2$, $4a_1 = 6a_2$ and $\dfrac{a_1}{a_2} = ${dec(ct.a, 2)}$. The intensities are in the ratio $1.5^2 = ${dec(ct.I, 3)}$.`,
  scheme: [['(a₁ + a₂)/(a₁ − a₂) = 5, so a₁/a₂ = 1.5', 1], ['I₁/I₂ = 2.25', 1]],
  marks: 2, d: 3, c: 'analysis', t: [3, 5],
}), (q) => near(twoBeam(2.25, 1, 0) / twoBeam(2.25, 1, Math.PI), 25) && q.answer.value === 2.25 || `ct ${ct.I}`);
const rs = { I1: 2.0, I2: 8.0, lam: 630e-9, p: 210e-9 };
rs.phi = (2 * Math.PI * rs.p) / rs.lam;
rs.I = twoBeam(rs.I1, rs.I2, rs.phi);
add('resultant-num', num({
  stem: 'Two coherent beams of light of wavelength 630 nm, from sources in phase, reach a point with a path difference of 210 nm. On their own they would give intensities of 2.0 W m⁻² and 8.0 W m⁻² there. Using I = I₁ + I₂ + 2√(I₁I₂) cos φ, find the resultant intensity, in W m⁻².',
  value: Number(dec(rs.I, 2)), tol: 0.05, unit: 'W m⁻²',
  sol: r`$\varphi = \dfrac{2\pi}{630} \times 210 = \dfrac{2\pi}{3}$, so $\cos\varphi = -0.5$. $I = 2.0 + 8.0 + 2\sqrt{16}\,(-0.5) = 10.0 - 4.0 = ${dec(rs.I, 2)}$ W m⁻².`,
  scheme: [['φ = 2π/3 from the path difference', 1], ['I = 6.0 W m⁻²', 1]],
  marks: 2, d: 3, c: 'analysis', t: [3, 5],
}), (q) => {
  // independent: add the two amplitudes as phasors
  const a1 = Math.sqrt(2);
  const a2 = Math.sqrt(8);
  const I = (a1 + a2 * Math.cos((2 * Math.PI) / 3)) ** 2 + (a2 * Math.sin((2 * Math.PI) / 3)) ** 2;
  return (near(I, 6) && q.answer.value === 6) || `rs ${rs.I}`;
});
add('coherent-ar', ar({
  a: 'Light from one laser, split by two pinholes, gives a steady fringe pattern, but two separate lasers of the same colour generally do not.',
  r: 'The phase difference between light from two independent sources changes randomly and rapidly.',
  key: 'a',
  sol: 'Both are true, and R explains A: the pinholes take light from the same wavefront, so their phase difference is fixed (coherent); two independent lasers drift in phase, so their pattern moves too fast to be seen — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('torch-tf', tf({
  stem: 'Two beams of torchlight that cross in a dark, dusty room pass through each other, and each continues beyond the crossing exactly as if the other were absent.',
  key: 't',
  sol: 'True. By the principle of superposition the displacements simply add where the beams overlap; each wave then travels on unchanged.',
  d: 1, c: 'understanding', t: [3],
}));
add('spoil-mcq', mcq({
  stem: 'A double-slit experiment with a narrow source slit shows clear fringes. Which one of these changes would wash the fringes out?',
  right: 'Replacing the narrow source slit by a broad, bright lamp placed close to the double slit',
  wrong: ['Moving the screen twice as far from the double slit', 'Using a brighter lamp of the same single colour behind the same narrow source slit', 'Changing the colour filter in front of the source from green to red'],
  sol: 'Different points of a broad source produce fringe patterns shifted from one another, and the light reaching the two slits is no longer from one wavefront, so the patterns overlap into uniform light. A farther screen or red light only changes the fringe width; a brighter coherent source makes the fringes brighter — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
const pq = { lam: 560e-9, p: 1.4e-6 };
pq.k = pq.p / pq.lam;
add('phase-short3', short({
  marks: 3,
  stem: 'Show that a path difference Δ between waves from two in-phase sources produces a phase difference φ = 2πΔ/λ, and write the conditions for constructive and destructive interference in terms of Δ and of φ. Two such sources emit light of wavelength 560 nm: is a point where Δ = 1.40 μm bright or dark?',
  model: r`A path of one wavelength corresponds to one complete cycle, a phase of $2\pi$; so a path difference $\Delta$ is $\Delta/\lambda$ cycles: $\varphi = \dfrac{2\pi}{\lambda}\Delta$.
**Constructive:** $\Delta = n\lambda$, $\varphi = 2n\pi$. **Destructive:** $\Delta = (2n - 1)\dfrac{\lambda}{2}$, $\varphi = (2n - 1)\pi$.
Here $\dfrac{\Delta}{\lambda} = \dfrac{1.40 \times 10^{-6}}{560 \times 10^{-9}} = ${dec(pq.k, 2)}$, so $\varphi = 5\pi$: the point is **dark**.`,
  sol: 'One wavelength of path ↔ 2π of phase.',
  scheme: [['φ = 2πΔ/λ with reason', 1], ['Both conditions in Δ and φ', 1], ['Δ = 2.5λ: dark', 1]],
  d: 2, c: 'understanding', t: [3], wl: null,
}), () => near(pq.k, 2.5) || `pq ${pq.k}`);

// ================================================================ t04 Young's double slit
add('ydse-short3', short({
  marks: 3,
  stem: 'In Young’s double-slit experiment, two slits a distance d apart are lit by monochromatic light of wavelength λ, and fringes form on a screen a distance D away (D ≫ d). Show that the path difference at a point a distance y from the centre of the screen is about yd/D, and hence derive the expression for the fringe width.',
  model: r`Drop a perpendicular S₁N from S₁ onto S₂P. Since $D \gg d$, $S_1P \approx NP$, so the path difference is $S_2P - S_1P \approx S_2N = d\sin\theta$, where θ is the angle of P from the centre. For small θ, $\sin\theta \approx \tan\theta = \dfrac{y}{D}$, so $\Delta = \dfrac{yd}{D}$.
Bright fringes: $\dfrac{yd}{D} = n\lambda$, so $y_n = \dfrac{n\lambda D}{d}$.
Fringe width: $\beta = y_{n+1} - y_n = \dfrac{\lambda D}{d}$, the same for every fringe (dark fringes, at $(2n - 1)\lambda D/2d$, are spaced equally too).`,
  sol: 'Δ = d sin θ ≈ yd/D; subtract neighbouring bright positions.',
  scheme: [['S₂N = d sin θ ≈ yd/D with the approximations stated', 1], ['Bright fringes y = nλD/d', 1], ['β = λD/d, independent of n', 1]],
  d: 2, c: 'understanding', t: [4], wl: null,
}), () => {
  // exact geometry: path difference at y = 3β matches 3λ for typical values
  const lam = 500e-9;
  const d = 0.5e-3;
  const D = 1;
  const y = (3 * lam * D) / d;
  return near(Math.hypot(D, y + d / 2) - Math.hypot(D, y - d / 2), 3 * lam, 1e-4) || 'ydse';
});
const b1 = fringeWidth(480e-9, 1.25, 0.24e-3) * 1e3;
add('beta-num', num({
  stem: 'Blue-green light of wavelength 480 nm falls on two slits 0.24 mm apart. Find the fringe width on a screen 1.25 m from the slits, in mm.',
  value: Number(dec(b1, 2)), tol: 0.05, unit: 'mm',
  sol: r`$\beta = \dfrac{\lambda D}{d} = \dfrac{480 \times 10^{-9} \times 1.25}{0.24 \times 10^{-3}} = 2.5 \times 10^{-3}$ m $= ${dec(b1, 2)}$ mm.`,
  scheme: [['β = λD/d = 2.5 mm', 1]],
  d: 1, c: 'understanding', t: [4],
}), (q) => near(b1, 2.5) && q.answer.value === 2.5 || `b1 ${b1}`);
const os = { lam: 640e-9, d: 0.8e-3, D: 1.5 };
os.beta = fringeWidth(os.lam, os.D, os.d) * 1e3;
os.sep = 2 * os.beta + 2.5 * os.beta;
add('oppsides-num', num({
  stem: 'In a double-slit experiment with light of wavelength 640 nm, slits 0.80 mm apart and a screen 1.5 m away, find the distance between the second bright fringe on one side of the central fringe and the third dark fringe on the other side, in mm.',
  value: Number(dec(os.sep, 2)), tol: 0.05, unit: 'mm',
  sol: r`$\beta = \dfrac{640 \times 10^{-9} \times 1.5}{0.80 \times 10^{-3}} = ${dec(os.beta, 2)}$ mm. Second bright: $2\beta$ on one side; third dark: $\dfrac{5}{2}\beta$ on the other. Distance $= 4.5\beta = ${dec(os.sep, 2)}$ mm.`,
  scheme: [['β = 1.2 mm', 1], ['2β + 2.5β = 5.4 mm', 1]],
  marks: 2, d: 3, c: 'analysis', t: [4],
}), (q) => {
  // independent: positions from yd/D = nλ and (2n − 1)λ/2
  const yB = (2 * os.lam * os.D) / os.d;
  const yD = ((2 * 3 - 1) * os.lam * os.D) / (2 * os.d);
  return (near((yB + yD) * 1e3, 5.4) && q.answer.value === 5.4) || `os ${os.sep}`;
});
const lf = { d: 0.45e-3, D: 1.1, span: 13.2e-3 };
lf.beta = lf.span / 10;
lf.lam = (lf.beta * lf.d) / lf.D;
add('lamfind-num', num({
  stem: 'In a double-slit experiment with slits 0.45 mm apart and a screen 1.1 m away, the first and the eleventh dark fringes on the same side of the centre are 13.2 mm apart. Find the wavelength of the light, in nm.',
  value: Number(dec(lf.lam * 1e9, 3)), tol: 3, unit: 'nm',
  sol: r`From the first to the eleventh dark fringe there are 10 fringe widths: $\beta = \dfrac{13.2}{10} = 1.32$ mm. $\lambda = \dfrac{\beta d}{D} = \dfrac{1.32 \times 10^{-3} \times 0.45 \times 10^{-3}}{1.1} = ${dec(lf.lam * 1e9, 3)}$ nm.`,
  scheme: [['10 fringe widths: β = 1.32 mm', 1], ['λ = βd/D = 540 nm', 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), (q) => near(fringeWidth(540e-9, 1.1, 0.45e-3) * 10, 13.2e-3) && q.answer.value === 540 || `lf ${lf.lam}`);
add('medium-tf', tf({
  stem: 'A double-slit apparatus gives fringes 1.8 mm wide in air. If the whole space between the slits and the screen is filled with water (n = 4/3), the fringes become 2.4 mm wide.',
  key: 'f',
  sol: 'False. In water the wavelength is λ/n, so β becomes 1.8 × 3/4 = 1.35 mm: the fringes get narrower, not wider (2.4 mm multiplies by n instead of dividing).',
  d: 2, c: 'understanding', t: [4],
}), () => near(fringeWidth(600e-9, 1, 0.5e-3, 4 / 3) / fringeWidth(600e-9, 1, 0.5e-3), 0.75) || 'mtf');
const chg = 1.2 * 0.75 / 1.5;
add('change-mcq', mcq({
  stem: 'In a double-slit experiment the wavelength is increased by 20%, the distance from the slits to the screen is reduced by 25%, and the slit separation is increased by 50%. The fringe width',
  right: 'falls to 0.6 times its original value',
  wrong: ['rises to 1.2 times its original value', 'falls to 0.9 times its original value', 'stays the same'],
  sol: r`$\beta = \dfrac{\lambda D}{d}$, so the new value is $\dfrac{1.2 \times 0.75}{1.5} = ${dec(chg, 1)}$ times the old one — option (@K).`,
  d: 2, c: 'application', t: [4],
}), () => near(fringeWidth(1.2 * 500e-9, 0.75, 1.5e-3) / fringeWidth(500e-9, 1, 1e-3), 0.6) || 'chg');
const ang = { d: 0.36e-3, D: 1.5, y6: 10.8e-3 };
ang.beta = ang.y6 / 6;
ang.lam = (ang.beta * ang.d) / ang.D;
add('angular-num', num({
  stem: 'A student finds the wavelength of a laser by double-slit fringes. The slits are 0.36 mm apart and the screen is 1.50 m away. She measures 10.8 mm from the central bright fringe to the 6th bright fringe on one side. Find the wavelength of the laser, in nm.',
  value: Number(dec(ang.lam * 1e9, 3)), tol: 2, unit: 'nm',
  sol: r`The 6th bright fringe is at $y_6 = 6\beta$, so $\beta = \dfrac{10.8}{6} = 1.80$ mm. From $\beta = \dfrac{\lambda D}{d}$: $\lambda = \dfrac{\beta d}{D} = \dfrac{1.80 \times 10^{-3} \times 0.36 \times 10^{-3}}{1.50} = 4.32 \times 10^{-7}$ m $= ${dec(ang.lam * 1e9, 3)}$ nm.`,
  scheme: [['β = 10.8/6 = 1.80 mm', 1]],
  d: 2, c: 'application', t: [4],
}), (q) => near(fringeWidth(432e-9, ang.D, ang.d), ang.beta, 1e-3) && q.answer.value === 432 || `ang ${ang.lam}`);
add('white-ar', ar({
  a: 'With white light in Young’s experiment, the bright fringe next to the white central fringe has a violet inner edge and a red outer edge.',
  r: 'The fringe width in Young’s experiment does not depend on the wavelength of the light.',
  key: 'c',
  sol: 'A is true: the first bright fringe of each colour is at y = λD/d, nearer the centre for violet (short λ) than for red. R is false: β = λD/d is proportional to λ — option (c).',
  d: 2, c: 'understanding', t: [4],
}), () => (400e-9 * 1) / 1e-3 < (700e-9 * 1) / 1e-3 || 'wh');
const scr = { beta: 1.5e-3, d: 0.28e-3, lam: 420e-9, n: 1.33, d2: 0.20e-3 };
scr.D = (scr.beta * scr.d) / scr.lam;
scr.beta2 = fringeWidth(scr.lam / scr.n, scr.D, scr.d2) * 1e3;
add('screen-num', num({
  stem: 'Violet light of wavelength 420 nm (in air) passes through two slits 0.28 mm apart, and the fringes on the screen are 1.5 mm wide. The slits are then replaced by a pair 0.20 mm apart, the screen is not moved, and the whole apparatus is immersed in water (n = 1.33). What is the fringe width now? Answer in mm (3 significant figures).',
  value: Number(dec(scr.beta2, 3)), tol: 0.02, unit: 'mm',
  sol: r`The screen distance is not given, so find it from the first arrangement: $D = \dfrac{\beta d}{\lambda} = \dfrac{1.5 \times 10^{-3} \times 0.28 \times 10^{-3}}{420 \times 10^{-9}} = ${dec(scr.D, 2)}$ m. In water the wavelength becomes $\lambda' = \dfrac{\lambda}{n} = \dfrac{420}{1.33} = 316$ nm, so $\beta' = \dfrac{\lambda' D}{d'} = \dfrac{316 \times 10^{-9} \times 1.0}{0.20 \times 10^{-3}} = ${dec(scr.beta2, 3)}$ mm. (Equivalently $\beta' = 1.5 \times \dfrac{0.28}{0.20} \times \dfrac{1}{1.33}$: the narrower slit separation widens the fringes by 1.4 times, the water narrows them by 1.33 times.)`,
  scheme: [['D = βd/λ = 1.0 m', 1], ['β′ = (λ/n)D/d′ = 1.58 mm', 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), (q) => near(fringeWidth(scr.lam, 1, scr.d), 1.5e-3) && near(scr.D, 1) && near((1.5 * scr.d) / scr.d2 / scr.n, 1.5789, 0.001) && q.answer.value === 1.58 || `scr ${scr.beta2}`);
const cnt = { lam: 480e-9, d: 2.0e-6 };
cnt.nmax = Math.floor(cnt.d / cnt.lam);
cnt.total = 2 * cnt.nmax + 1;
add('count-mcq', mcq({
  stem: 'Light of wavelength 480 nm falls on two very narrow slits only 2.0 μm apart, and the pattern is viewed on a large curved screen that surrounds the slits. Using d sin θ = nλ for the bright fringes, the total number of bright fringes formed, including the central one, is',
  right: '9',
  wrong: ['4', '8', '11'],
  sol: r`$\sin\theta = \dfrac{n\lambda}{d} \le 1$ needs $n \le \dfrac{2.0}{0.48} = 4.17$, so n = 0, ±1, ±2, ±3, ±4: ${cnt.total} bright fringes. (Small-angle formulas fail here; the angles are large) — option (@K).`,
  d: 4, c: 'analysis', t: [4],
}), () => cnt.total === 9 && (4 * cnt.lam) / cnt.d < 1 && (5 * cnt.lam) / cnt.d > 1 || `cnt ${cnt.total}`);
add('contrastchange-short2', short({
  marks: 2,
  stem: 'A Young’s double-slit set-up gives clear fringes. State and explain what happens to the fringes when (a) the source slit S is gradually widened, (b) one of the two slits is made narrower than the other.',
  model: '(a) The fringes grow less distinct and finally vanish: different strips of a wide source slit produce fringe patterns shifted from one another, which overlap. (b) Less light comes through the narrower slit, so the amplitudes no longer cancel: dark fringes are not fully dark and contrast falls, but the fringe width is unchanged.',
  sol: 'Wide source: overlapping shifted patterns; unequal slits: poorer contrast, same β.',
  scheme: [['(a) Fringes blur and disappear, with reason', 1], ['(b) Dark fringes not dark (poorer contrast); β unchanged', 1]],
  d: 3, c: 'analysis', t: [4, 5],
}));
add('halfhalf-short2', short({
  marks: 2,
  stem: 'A student claims that halving both the slit separation and the slit-to-screen distance in Young’s experiment leaves the fringe pattern on the screen unchanged. Evaluate the claim.',
  model: r`Partly right. The fringe width $\beta = \dfrac{\lambda D}{d}$ has both D and d halved, so it is **unchanged** and the fringes fall in the same places. But the angular fringe width $\dfrac{\lambda}{d}$ **doubles**: the same pattern is now spread over twice the angle, seen on a screen at half the distance.`,
  sol: 'β unchanged; angular width doubles.',
  scheme: [['β = λD/d unchanged when D and d are both halved', 1], ['Angular fringe width λ/d doubles, so the claim needs qualifying', 1]],
  d: 3, c: 'evaluation', t: [4], wl: null,
}), () => near(fringeWidth(500e-9, 0.5, 0.25e-3), fringeWidth(500e-9, 1, 0.5e-3)) || 'hh');
const lq = { lam: 630e-9, d: 0.42e-3, D: 1.4, n: 1.5 };
lq.b = fringeWidth(lq.lam, lq.D, lq.d) * 1e3;
lq.bl = fringeWidth(lq.lam, lq.D, lq.d, lq.n) * 1e3;
lq.y5 = 4.5 * lq.bl;
add('liquid-short3', short({
  marks: 3,
  stem: 'A double-slit set-up uses light of wavelength 630 nm (in air), slits 0.42 mm apart and a screen 1.4 m away. Find the fringe width (a) in air, (b) when the whole set-up is immersed in a liquid of refractive index 1.5. (c) How far from the centre is the fifth dark fringe in the liquid?',
  model: r`(a) $\beta = \dfrac{\lambda D}{d} = \dfrac{630 \times 10^{-9} \times 1.4}{0.42 \times 10^{-3}} = ${dec(lq.b, 2)}$ mm.
(b) In the liquid the wavelength is $\lambda/1.5 = 420$ nm, so $\beta' = \dfrac{2.1}{1.5} = ${dec(lq.bl, 2)}$ mm.
(c) Fifth dark fringe: $y = \dfrac{(2 \times 5 - 1)}{2}\beta' = 4.5 \times 1.4 = ${dec(lq.y5, 2)}$ mm.`,
  sol: 'β = λD/d; divide by n in the liquid; dark fringe at (2n − 1)β/2.',
  scheme: [['β = 2.1 mm', 1], ['β′ = 1.4 mm', 1], ['y = 4.5β′ = 6.3 mm', 1]],
  d: 3, c: 'application', t: [4], wl: null,
}), () => near(lq.b, 2.1) && near(lq.bl, 1.4) && near(lq.y5, 6.3) && near(fringeWidth(420e-9, 1.4, 0.42e-3) * 1e3, 1.4) || `lq ${lq.y5}`);
add('changes-match', match({
  stem: 'Match each change made to a working Young’s double-slit set-up (Column A) with its effect on the fringe width (Column B).',
  pairs: [
    ['Wavelength changed from 480 nm to 720 nm', 'Multiplied by 1.5'],
    ['Slit separation doubled', 'Halved'],
    ['Whole set-up immersed in water (n = 4/3)', 'Multiplied by 0.75'],
    ['Source made twice as bright', 'Unchanged'],
  ],
  order: [2, 0, 3, 1],
  sol: 'β = λD/d (and λ/n in a medium): 720/480 = 1.5 (1 → r); doubling d halves β (2 → p); water divides by 4/3, i.e. × 0.75 (3 → s); brightness does not enter β (4 → q).',
  d: 2, c: 'application', t: [4],
}), () => near(fringeWidth(720e-9, 1, 1e-3) / fringeWidth(480e-9, 1, 1e-3), 1.5) && near(fringeWidth(500e-9, 1, 1e-3, 4 / 3) / fringeWidth(500e-9, 1, 1e-3), 0.75) || 'cm');

// ================================================================ t05 intensity distribution
add('sketch-short2', short({
  marks: 2,
  stem: 'Describe the graph of intensity against distance from the centre of the screen for a double-slit pattern from two identical narrow slits, each of which alone gives intensity I₀. State the greatest and least intensities and the spacing of the peaks.',
  model: 'The graph is a row of identical rounded (cosine-squared) peaks, symmetrical about the central maximum at the centre. Every peak reaches 4I₀ and every trough falls to zero. Neighbouring peaks are one fringe width λD/d apart, with troughs midway; the average intensity is 2I₀.',
  sol: 'I = 4I₀ cos²(φ/2): peaks 4I₀, zeros, spacing β.',
  scheme: [['Equal cos²-shaped peaks of 4I₀, minima zero, central maximum at y = 0', 1], ['Peaks spaced β = λD/d; average 2I₀', 1]],
  d: 2, c: 'understanding', t: [5],
}));
const pt = { beta: 1.8, frac: 0.75 };
pt.phi = 2 * Math.acos(Math.sqrt(pt.frac));
pt.y = (pt.beta * pt.phi) / (2 * Math.PI);
add('point-num', num({
  stem: 'In a double-slit pattern from two identical slits, the fringe width is 1.8 mm. How far from the centre of the central bright fringe is the nearest point where the intensity is three quarters of the maximum? Answer in mm.',
  value: Number(dec(pt.y, 2)), tol: 0.02, unit: 'mm',
  sol: r`$I = I_{\max}\cos^2\dfrac{\varphi}{2} = \dfrac{3}{4}I_{\max}$, so $\cos\dfrac{\varphi}{2} = \dfrac{\sqrt{3}}{2}$ and $\varphi = \dfrac{\pi}{3}$. The phase changes by $2\pi$ over one fringe width, so $y = \dfrac{\varphi}{2\pi}\beta = \dfrac{\beta}{6} = ${dec(pt.y, 2)}$ mm.`,
  scheme: [['cos²(φ/2) = 3/4, φ = π/3', 1], ['y = β/6 = 0.30 mm', 1]],
  marks: 2, d: 4, c: 'analysis', t: [5],
}), (q) => {
  // independent: intensity from the double-slit function at y = 0.30 mm with β = 1.8 mm (λD/d chosen to give it)
  const lam = 600e-9;
  const D = 1.5;
  const d = (lam * D) / 1.8e-3;
  return (near(doubleSlit(d, lam, 0.3e-3 / D), 0.75, 1e-4) && q.answer.value === 0.3) || `pt ${pt.y}`;
});
add('unequal-mcq', mcq({
  stem: 'In a double-slit experiment, one slit is narrowed so that it lets through less light than the other. Compared with the pattern from two equal slits,',
  right: 'the dark fringes are no longer completely dark and the bright ones are dimmer, but the fringe width is unchanged',
  wrong: ['the dark fringes stay completely dark, but the fringe width decreases', 'the bright fringes become brighter and the fringe width increases', 'the fringes disappear, leaving uniform light'],
  sol: r`$I_{\min} = (\sqrt{I_1} - \sqrt{I_2})^2 > 0$ when $I_1 \ne I_2$, and $I_{\max} = (\sqrt{I_1} + \sqrt{I_2})^2$ is less than before; the positions depend only on $\lambda D/d$, so β is unchanged. Fringes vanish only if a slit is covered completely — option (@K).`,
  d: 3, c: 'analysis', t: [5],
}), () => twoBeam(1, 0.25, Math.PI) > 0 && twoBeam(1, 0.25, 0) < twoBeam(1, 1, 0) || 'uneq');
add('avg-fill', fill({
  stem: 'Each of two identical slits alone gives an intensity of 3.0 W m⁻² on a distant screen. With both slits open, the intensity averaged across many fringes is ___ W m⁻².',
  acc: [['6.0', '6', '6.00']],
  sol: 'The fringes swing from 4 × 3.0 = 12 W m⁻² to zero; the average of cos² is ½, so the average is 2 × 3.0 = **6.0** W m⁻²: interference only redistributes the energy.',
  d: 2, c: 'understanding', t: [5],
}), (q) => {
  let s = 0;
  const N = 10000;
  for (let k = 0; k < N; k++) s += twoBeam(3, 3, (2 * Math.PI * k) / N);
  return (near(s / N, 6, 1e-6) && q.answer.blanks[0].accepted[0] === '6.0') || 'avg';
});
add('dark-ar', ar({
  a: 'The dark fringes of a double-slit pattern are perfectly dark only when the two slits send equal intensities to the screen.',
  r: 'The minimum intensity of the pattern is (√I₁ − √I₂)².',
  key: 'a',
  sol: 'Both are true, and R explains A: (√I₁ − √I₂)² is zero only when I₁ = I₂ — option (a).',
  d: 2, c: 'understanding', t: [5],
}), () => near(twoBeam(2, 2, Math.PI) + 1, 1) && twoBeam(2, 1, Math.PI) > 0 || 'dar');
add('double-tf', tf({
  stem: 'With two identical narrow slits, the intensity at the centre of a bright fringe is twice the intensity that one slit alone produces there.',
  key: 'f',
  sol: 'False. The amplitudes add, a + a = 2a, so the intensity is (2a)² = 4a²: four times that of one slit. Twice is only the average across the pattern.',
  d: 1, c: 'understanding', t: [5],
}), () => near(twoBeam(1, 1, 0), 4) || 'dtf2');
const mt = { max: 8.1, min: 0.9 };
mt.a1 = (Math.sqrt(mt.max) + Math.sqrt(mt.min)) / 2;
mt.a2 = (Math.sqrt(mt.max) - Math.sqrt(mt.min)) / 2;
mt.I1 = mt.a1 ** 2;
mt.I2 = mt.a2 ** 2;
add('meter-short3', short({
  marks: 3,
  stem: 'A light meter is moved slowly across a double-slit pattern. It reads 8.1 units at the bright fringes and 0.9 units at the dark fringes. Find (a) the ratio of the amplitudes of the waves from the two slits, (b) the intensity each slit gives on its own, (c) the reading near the centre of the screen if the dimmer slit is covered.',
  model: r`(a) $\dfrac{a_1 + a_2}{a_1 - a_2} = \sqrt{\dfrac{8.1}{0.9}} = 3$, so $a_1 + a_2 = 3a_1 - 3a_2$ and $\dfrac{a_1}{a_2} = ${dec(mt.a1 / mt.a2, 2)}$.
(b) $\sqrt{I_1} + \sqrt{I_2} = \sqrt{8.1} = 2.85$ and $\sqrt{I_1} - \sqrt{I_2} = \sqrt{0.9} = 0.949$, so $\sqrt{I_1} = 1.90$, $\sqrt{I_2} = 0.949$: $I_1 = ${dec(mt.I1, 2)}$ units, $I_2 = ${dec(mt.I2, 2)}$ unit.
(c) With one slit covered there is no interference: the meter reads about **3.6 units** everywhere near the centre.`,
  sol: 'Square roots of the readings give a₁ + a₂ and a₁ − a₂.',
  scheme: [['a₁ : a₂ = 2 : 1', 1], ['I₁ = 3.6, I₂ = 0.9 units', 1], ['About 3.6 units, no fringes', 1]],
  d: 4, c: 'analysis', t: [5], wl: null,
}), () => near(mt.a1 / mt.a2, 2) && near(mt.I1, 3.6) && near(mt.I2, 0.9) && near(twoBeam(mt.I1, mt.I2, 0), 8.1) && near(twoBeam(mt.I1, mt.I2, Math.PI), 0.9) || `mt ${mt.I1}`);

// ================================================================ t06 single-slit diffraction
const sm = (2 * 480e-9) / 0.24e-3 * 1e3;
add('secondmin-num', num({
  stem: 'Light of wavelength 480 nm falls normally on a slit 0.24 mm wide. Find the angle of the second minimum of the diffraction pattern, in milliradians.',
  value: Number(dec(sm, 2)), tol: 0.05, unit: 'mrad',
  sol: r`$a\sin\theta = 2\lambda$: $\theta \approx \dfrac{2 \times 480 \times 10^{-9}}{0.24 \times 10^{-3}} = 4.0 \times 10^{-3}$ rad $= ${dec(sm, 2)}$ mrad.`,
  scheme: [['a sin θ = 2λ gives θ = 4.0 mrad', 1]],
  d: 1, c: 'understanding', t: [6],
}), (q) => singleSlit(0.24e-3, 480e-9, Math.sin(sm / 1e3)) < 1e-6 && q.answer.value === 4 || `sm ${sm}`);
const aw = { lam: 720e-9, D: 1.5, span: 18e-3 };
aw.y2 = aw.span / 2;
aw.a = (2 * aw.lam * aw.D) / aw.y2;
add('awidth-num', num({
  stem: 'A single slit is lit normally by light of wavelength 720 nm, and the diffraction pattern is viewed on a screen 1.5 m away. The second minima on either side of the centre are 18 mm apart. Find the width of the slit, in mm.',
  value: Number(dec(aw.a * 1e3, 2)), tol: 0.01, unit: 'mm',
  sol: r`Each second minimum is $9.0$ mm from the centre, at $a\sin\theta = 2\lambda$, i.e. $y_2 = \dfrac{2\lambda D}{a}$. So $a = \dfrac{2\lambda D}{y_2} = \dfrac{2 \times 720 \times 10^{-9} \times 1.5}{9.0 \times 10^{-3}} = ${dec(aw.a * 1e3, 2)}$ mm.`,
  scheme: [['y₂ = 9.0 mm = 2λD/a', 1], ['a = 0.24 mm', 1]],
  marks: 2, d: 3, c: 'analysis', t: [6],
}), (q) => singleSlit(0.24e-3, aw.lam, Math.sin(Math.atan(9e-3 / aw.D))) < 1e-6 && q.answer.value === 0.24 || `aw ${aw.a}`);
const sx = { lam: 540e-9, a: 0.27e-3, D: 1.2 };
sx.y = ((1.5 * sx.lam * sx.D) / sx.a) * 1e3;
add('secmax-num', num({
  stem: 'Light of wavelength 540 nm passes through a slit 0.27 mm wide. Taking the first secondary maximum to lie at a sin θ = 3λ/2, find its distance from the centre of the pattern on a screen 1.2 m away, in mm.',
  value: Number(dec(sx.y, 2)), tol: 0.05, unit: 'mm',
  sol: r`$\theta \approx \dfrac{1.5\lambda}{a} = \dfrac{1.5 \times 540 \times 10^{-9}}{0.27 \times 10^{-3}} = 3.0 \times 10^{-3}$ rad; $y = D\theta = 1.2 \times 3.0 \times 10^{-3}$ m $= ${dec(sx.y, 2)}$ mm (between the minima at 2.4 mm and 4.8 mm).`,
  scheme: [['θ = 1.5λ/a = 3.0 mrad', 1], ['y = 3.6 mm', 1]],
  marks: 2, d: 2, c: 'application', t: [6],
}), (q) => {
  // independent: the true maximum of (sin b / b)² between the first two zeros lies close to b = 1.43π
  let best = [0, 0];
  for (let b = 1.05 * Math.PI; b < 1.95 * Math.PI; b += 0.0005) if (sinc2(b) > best[1]) best = [b, sinc2(b)];
  const yTrue = ((best[0] / Math.PI) * sx.lam * sx.D) / sx.a * 1e3;
  return (Math.abs(yTrue - sx.y) < 0.2 && q.answer.value === 3.6) || `sx ${sx.y} vs ${yTrue}`;
});
add('halves-short3', short({
  marks: 3,
  stem: 'Monochromatic light falls normally on a single slit of width a and the pattern is seen on a distant screen. By dividing the slit into suitable parts, explain why (a) the centre of the pattern is bright, (b) the direction θ with a sin θ = λ is dark, (c) the direction with a sin θ = 3λ/2 is bright but much less bright than the centre.',
  model: r`(a) Straight ahead, wavelets from all points of the slit travel equal distances and arrive **in phase**: maximum brightness.
(b) Divide the slit into two halves. A wavelet from any point in the upper half and one from the point $a/2$ below it differ in path by $\dfrac{a}{2}\sin\theta = \dfrac{\lambda}{2}$, so they cancel; pair by pair the whole slit gives **zero**.
(c) Divide the slit into three equal parts; neighbouring parts differ by $\dfrac{a}{3}\sin\theta = \dfrac{\lambda}{2}$, so two of them cancel and only one third of the slit contributes, and not even in phase: a **weak** maximum (under a twentieth of the centre).`,
  sol: 'Two halves cancel at a sin θ = λ; three thirds leave one at 3λ/2.',
  scheme: [['Centre: all wavelets in phase', 1], ['Halves cancel in pairs at a sin θ = λ', 1], ['Thirds at 3λ/2: one part uncancelled, weak maximum', 1]],
  d: 3, c: 'understanding', t: [6], wl: null,
}));
let secPeak = 0;
for (let b = 1.05 * Math.PI; b < 1.95 * Math.PI; b += 0.0005) secPeak = Math.max(secPeak, sinc2(b));
add('secmax-tf', tf({
  stem: 'The first secondary maximum of a single-slit diffraction pattern is less than one twentieth as bright as the central maximum.',
  key: 't',
  sol: `True. Only about a third of the slit is left uncancelled there, and its wavelets are not in phase; the first secondary maximum has about ${(secPeak * 100).toFixed(1)}% of the central intensity, and the later ones are fainter still.`,
  d: 2, c: 'understanding', t: [6],
}), () => secPeak < 0.05 && secPeak > 0.04 || `sec ${secPeak}`);
add('ssds-short2', short({
  marks: 2,
  stem: 'A student sees on a screen a broad, bright central band with much fainter, narrower bands on each side of it. Was the light passed through one slit or through two? Give two features of the pattern that decide it.',
  model: 'One slit. In single-slit diffraction the central band is twice as wide as the others, while double-slit fringes are all equally wide. Also, the side bands fade rapidly (the first is under a twentieth as bright), whereas fringes from two narrow slits are nearly equally bright.',
  sol: 'Double-width central band; rapidly fading side bands.',
  scheme: [['Single slit', 1], ['Central band twice as wide; side bands much fainter (double-slit fringes equal in width and brightness)', 1]],
  d: 3, c: 'analysis', t: [6],
}));
add('narrow-ar', ar({
  a: 'Making a single slit wider makes the central maximum of its diffraction pattern wider.',
  r: 'The first minima of a single-slit pattern lie at sin θ = ±λ/a.',
  key: 'd',
  sol: 'R is true, and it shows that A is false: a larger a gives a smaller θ for the first minima, so a wider slit gives a narrower central maximum — option (d).',
  d: 2, c: 'understanding', t: [6, 7],
}), () => Math.asin(500e-9 / 0.4e-3) < Math.asin(500e-9 / 0.2e-3) || 'nar');
const mc = { k: 2.5 };
mc.n = Math.floor(mc.k - 1e-12);
add('mincount-mcq', mcq({
  stem: 'Monochromatic light falls normally on a slit whose width is 2.5 times the wavelength. On each side of the central maximum, the number of dark directions in the diffraction pattern is',
  right: '2',
  wrong: ['1', '3', '5'],
  sol: r`Minima need $\sin\theta = \dfrac{n\lambda}{a} = \dfrac{n}{2.5} \le 1$: n = 1 ($\sin\theta = 0.4$) and n = 2 (0.8) are possible, n = 3 (1.2) is not. So there are ${mc.n} dark directions on each side — option (@K).`,
  d: 3, c: 'analysis', t: [6],
}), () => mc.n === 2 && singleSlit(2.5, 1, 0.8) < 1e-12 || `mc ${mc.n}`);
add('half-fill', fill({
  stem: 'At the first minimum of a single-slit diffraction pattern, the wavelet from the top edge of the slit and the wavelet from the middle of the slit reach the distant screen with a path difference of ___ of a wavelength.',
  acc: [['half', 'one half', '1/2', '0.5']],
  sol: 'The edges differ by a sin θ = λ, so points a/2 apart differ by (a/2) sin θ = λ/2: **half** a wavelength, and such pairs cancel.',
  d: 2, c: 'understanding', t: [6],
}));
add('ssfirst-mcq', mcq({
  stem: 'A slit of width a is lit normally by light of wavelength λ. Between the first and second dark directions of the diffraction pattern there is a faint bright band. Its centre lies approximately where',
  right: 'a sin θ = 3λ/2',
  wrong: ['a sin θ = λ', 'a sin θ = 2λ', 'a sin θ = λ/2'],
  sol: 'The dark directions are at a sin θ = λ and 2λ; the secondary maximum lies roughly midway, at a sin θ = 3λ/2, where the slit splits into three parts and one is left uncancelled. (a sin θ = λ/2 lies inside the central maximum) — option (@K).',
  d: 1, c: 'understanding', t: [6],
}));
const scx = { lam: 660e-9, a: 0.165e-3, D: 1.5 };
scx.th = scx.lam / scx.a;
scx.y1 = scx.D * scx.th * 1e3;
scx.y2 = 2 * scx.y1;
scx.W = 2 * scx.y1;
scx.ys = 1.5 * scx.y1;
add('slitcalc-short3', short({
  marks: 3,
  stem: 'Light of wavelength 660 nm falls normally on a slit 0.165 mm wide, and the pattern is seen on a screen 1.5 m away. Find (a) the angle of the first minimum, (b) the distances of the first and second minima from the centre, (c) the width of the central maximum and the approximate position of the first secondary maximum.',
  model: r`(a) $\theta_1 = \dfrac{\lambda}{a} = \dfrac{660 \times 10^{-9}}{0.165 \times 10^{-3}} = ${dec(scx.th * 1e3, 2)} \times 10^{-3}$ rad.
(b) $y_1 = D\theta_1 = ${dec(scx.y1, 2)}$ mm; $y_2 = \dfrac{2\lambda D}{a} = ${dec(scx.y2, 2)}$ mm.
(c) Central maximum $W = 2y_1 = ${dec(scx.W, 2)}$ mm; first secondary maximum near $a\sin\theta = 1.5\lambda$, about $${dec(scx.ys, 2)}$ mm from the centre.`,
  sol: 'θ₁ = λ/a; y = Dθ; W = 2λD/a; secondary maximum near 1.5λ/a.',
  scheme: [['θ₁ = 4.0 × 10⁻³ rad', 1], ['y₁ = 6.0 mm, y₂ = 12 mm', 1], ['W = 12 mm; secondary maximum about 9.0 mm', 1]],
  d: 3, c: 'application', t: [6, 7], wl: null,
}), () => near(scx.th, 4e-3) && near(scx.y1, 6) && near(scx.W, 12) && near(scx.ys, 9) && singleSlit(scx.a, scx.lam, Math.sin(Math.atan(6e-3 / 1.5))) < 1e-5 || `scx ${scx.y1}`);

// ================================================================ t07 width of the central maximum
const cw = ((2 * 640e-9 * 1.25) / 0.16e-3) * 1e3;
add('central-num', num({
  stem: 'Light of wavelength 640 nm from a laser falls normally on a slit 0.16 mm wide. Find the width of the central bright band on a screen 1.25 m from the slit, in mm.',
  value: Number(dec(cw, 2)), tol: 0.1, unit: 'mm',
  sol: r`$W = \dfrac{2\lambda D}{a} = \dfrac{2 \times 640 \times 10^{-9} \times 1.25}{0.16 \times 10^{-3}} = 1.0 \times 10^{-2}$ m $= ${dec(cw, 2)}$ mm.`,
  scheme: [['W = 2λD/a', 1], ['W = 10 mm', 1]],
  marks: 2, d: 2, c: 'understanding', t: [7],
}), (q) => singleSlit(0.16e-3, 640e-9, Math.sin(Math.atan(5e-3 / 1.25))) < 1e-5 && q.answer.value === 10 || `cw ${cw}`);
const aw2 = (2 * 480e-9) / 0.32e-3;
add('angwidth-mcq', mcq({
  stem: 'Light of wavelength 480 nm falls normally on a slit 0.32 mm wide. The angular width of the central maximum of the diffraction pattern is',
  right: '3.0 × 10⁻³ rad',
  wrong: ['1.5 × 10⁻³ rad', '6.0 × 10⁻³ rad', '0.75 × 10⁻³ rad'],
  sol: r`The first minima are at $\theta = \pm\dfrac{\lambda}{a} = \pm 1.5 \times 10^{-3}$ rad, so the central maximum spans $\dfrac{2\lambda}{a} = ${aw2.toExponential(1).replace('e-3', ' \\times 10^{-3}')}$ rad. (1.5 × 10⁻³ rad is only the half-width) — option (@K).`,
  d: 2, c: 'understanding', t: [7],
}), () => near(aw2, 3e-3) || `aw2 ${aw2}`);
const sn = { W: 6e-3, D: 2.5, lam: 540e-9 };
sn.a = (2 * sn.lam * sn.D) / sn.W;
sn.W2 = (2 * 650e-9 * 1.8) / sn.a;
add('slitneeded-num', num({
  stem: 'A teacher sets a single slit so that light of wavelength 540 nm gives a central bright band 6.0 mm wide on a wall 2.5 m away. She then replaces the lamp by a red laser of wavelength 650 nm and moves the wall to 1.8 m from the slit, leaving the slit as it was. How wide is the central bright band now? Answer in mm (3 significant figures).',
  value: Number(dec(sn.W2 * 1e3, 3)), tol: 0.05, unit: 'mm',
  sol: r`The slit width is not given, so find it first: $W = \dfrac{2\lambda D}{a}$ gives $a = \dfrac{2\lambda D}{W} = \dfrac{2 \times 540 \times 10^{-9} \times 2.5}{6.0 \times 10^{-3}} = ${dec(sn.a * 1e3, 2)}$ mm. With the laser at the new distance, $W' = \dfrac{2\lambda' D'}{a} = \dfrac{2 \times 650 \times 10^{-9} \times 1.8}{0.45 \times 10^{-3}} = ${dec(sn.W2 * 1e3, 3)}$ mm. (Check by scaling: $6.0 \times \dfrac{650}{540} \times \dfrac{1.8}{2.5} = 5.20$ mm.)`,
  scheme: [['a = 2λD/W = 0.45 mm', 1], ['W′ = 2λ′D′/a = 5.20 mm', 1]],
  marks: 2, d: 3, c: 'application', t: [7],
}), (q) => singleSlit(sn.a, sn.lam, Math.sin(Math.atan(3e-3 / sn.D))) < 1e-5 && near(sn.a, 0.45e-3) && near(6 * (650 / 540) * (1.8 / 2.5), 5.2, 1e-6) && q.answer.value === 5.2 || `sn ${sn.W2}`);
const wss = 12 / (4 / 3);
add('waterss-mcq', mcq({
  stem: 'A single-slit diffraction set-up gives a central maximum 12 mm wide on a screen in air. The whole set-up, slit and screen, is then immersed in water (n = 4/3). The width of the central maximum becomes',
  right: '9.0 mm',
  wrong: ['16 mm', '12 mm', '6.75 mm'],
  sol: r`$W = \dfrac{2\lambda D}{a}$ and in water $\lambda \to \lambda/n$, so $W' = \dfrac{12}{4/3} = ${dec(wss, 2)}$ mm. (16 mm multiplies by n instead of dividing) — option (@K).`,
  d: 2, c: 'application', t: [7],
}), () => near(wss, 9) || 'wss');
add('screen-tf', tf({
  stem: 'Moving the screen of a single-slit experiment from 1.0 m to 2.0 m from the slit doubles the linear width of the central maximum but leaves its angular width unchanged.',
  key: 't',
  sol: 'True. The angular width 2λ/a does not involve D; the linear width 2λD/a is proportional to D, so it doubles.',
  d: 2, c: 'understanding', t: [7],
}));
add('widen-short2', short({
  marks: 2,
  stem: 'To make the central band of a single-slit pattern twice as wide on the same screen, a student proposes to double the width of the slit. Evaluate the proposal and suggest two changes that would work.',
  model: r`The proposal is **wrong**. The width $W = \dfrac{2\lambda D}{a}$ is inversely proportional to $a$, so doubling the slit width **halves** the central band. To double it: **halve the slit width**, or move the screen to **twice the distance**, or use light of twice the wavelength.`,
  sol: 'W ∝ λD/a.',
  scheme: [['W ∝ 1/a: doubling a halves W, so the plan fails', 1], ['Two valid changes: halve a, double D or double λ', 1]],
  d: 3, c: 'evaluation', t: [7], wl: null,
}), () => near((2 * 500e-9 * 1) / 0.1e-3, 2 * ((2 * 500e-9 * 1) / 0.2e-3)) || 'wid');
add('compare-mcq', mcq({
  stem: 'A double slit and a single slit are lit by the same light, and their patterns are viewed on screens at the same distance. The fringe width of the double-slit pattern equals the width of the central maximum of the single-slit pattern when the slit separation d and the single-slit width a are related by',
  right: 'a = 2d',
  wrong: ['a = d', 'd = 2a', 'a = 4d'],
  sol: r`$\beta = \dfrac{\lambda D}{d}$ and $W = \dfrac{2\lambda D}{a}$; equal when $\dfrac{1}{d} = \dfrac{2}{a}$, i.e. $a = 2d$ — option (@K).`,
  d: 3, c: 'analysis', t: [4, 7],
}), () => near(fringeWidth(500e-9, 1, 0.2e-3), (2 * 500e-9 * 1) / 0.4e-3) || 'cmp');

// ================================================================ 5-mark questions (in parts)
const hl = { n: 1.5, i: 30, lam: 630e-9 };
hl.r = asinD(hl.n * sinD(hl.i));
hl.lamG = (hl.lam / hl.n) * 1e9;
add('huygens-long', long({
  stem: '(a) What is a wavefront? Name the shape of the wavefronts from a point source and from a very distant source. [1] (b) State Huygens’ principle and use it to prove the law of reflection for a plane wavefront striking a plane mirror. [2] (c) A plane wavefront of light of wavelength 630 nm (in air) travels inside a glass block (n = 1.5) and meets the glass–air surface at an angle of incidence of 30°. Find the angle of refraction in the air and the wavelength of the light inside the glass. [2]',
  model: r`(a) A wavefront is a surface on which all points vibrate in the same phase. Point source: **spherical**; very distant source: **plane**.
(b) Every point of a wavefront is a source of secondary wavelets moving forward at the wave speed; the new wavefront is their forward envelope. A plane wavefront AB meets the mirror at A; while B moves $BC = vt$ to the mirror at C, the wavelet from A grows to $AE = vt$; the reflected wavefront is the tangent CE. Right-angled triangles ABC and CEA share AC and have $BC = AE$, so they are congruent and $\angle BAC = \angle ECA$: $i = r$.
(c) Glass to air: $\sin r = 1.5\sin 30° = 0.75$, so $r = ${hl.r.toFixed(1)}°$ (away from the normal). In the glass $\lambda_g = \dfrac{630}{1.5} = ${dec(hl.lamG, 3)}$ nm.`,
  sol: 'Definition; Huygens’ congruent triangles; Snell’s law with n₁ = 1.5, λ/n.',
  scheme: [['Definition and the two shapes', 1], ['Statement of Huygens’ principle', 1], ['Construction and congruent triangles giving i = r', 1], ['r = 48.6°', 1], ['λ in glass = 420 nm', 1]],
  d: 3, c: 'application', t: [1, 2], wl: null,
}), () => near(refrAngle(30, 2, 3), 48.59, 1e-3) && near(hl.lamG, 420) || `hl ${hl.r}`);
const rl = { n1: 1.5, n2: 4 / 3 };
rl.r60 = asinD((rl.n1 * sinD(60)) / rl.n2);
rl.k70 = (rl.n1 * sinD(70)) / rl.n2;
add('refraction-long', long({
  stem: '(a) Light travels at speed v₁ in one medium and v₂ (< v₁) in another. Using Huygens’ construction, show that a plane wavefront crossing the plane boundary between them is refracted so that sin i / sin r = v₁/v₂. [3] (b) Light in crown glass (n = 1.5) meets a flat boundary with water (n = 4/3). (i) Find the angle of refraction for an angle of incidence of 60°. (ii) Explain, using the construction, what happens when the angle of incidence is 70°. [2]',
  model: r`(a) The wavefront AB meets the boundary first at A. While its edge B travels $BC = v_1 t$ to the boundary at C, the wavelet from A spreads into the second medium to radius $AE = v_2 t$. The refracted wavefront is the tangent EC from C. In right-angled triangles ABC and AEC, with common hypotenuse AC, $\sin i = \dfrac{BC}{AC}$ and $\sin r = \dfrac{AE}{AC}$, so $\dfrac{\sin i}{\sin r} = \dfrac{v_1}{v_2}$, a constant (Snell’s law); as $v_2 < v_1$, the ray bends towards the normal.
(b)(i) $\dfrac{\sin i}{\sin r} = \dfrac{v_g}{v_w} = \dfrac{n_w}{n_g}$, so $\sin r = \dfrac{1.5}{4/3}\sin 60° = 1.125 \times 0.866 = ${dec((rl.n1 * sinD(60)) / rl.n2, 3)}$ and $r = ${rl.r60.toFixed(1)}°$.
(ii) At 70° the wavelet in water would have radius $AE = 1.125\,BC = 1.125\,AC\sin 70° = ${dec(rl.k70, 3)}\,AC$, larger than AC: no tangent can be drawn from C, so there is **no refracted wave**: the light is totally internally reflected.`,
  sol: 'BC = v₁t, AE = v₂t; sines; then the wavelet outgrows AC.',
  scheme: [['Construction: BC = v₁t, AE = v₂t, tangent EC from C', 1], ['sin i = BC/AC, sin r = AE/AC', 1], ['sin i / sin r = v₁/v₂', 1], ['r = 76.9°', 1], ['At 70°: AE > AC, no refracted wave (total internal reflection)', 1]],
  d: 4, c: 'analysis', t: [2], wl: null,
}), () => near(refrAngle(60, 2 / 3, 3 / 4), 76.9, 1e-3) && near(rl.r60, refrAngle(60, 2 / 3, 3 / 4)) && rl.k70 > 1 && Number.isNaN(refrAngle(70, 2 / 3, 3 / 4)) || `rl ${rl.r60}`);
const yl = { lam: 510e-9, d: 0.34e-3, D: 1.6, D2: 2.4, n: 1.2 };
yl.b = fringeWidth(yl.lam, yl.D, yl.d) * 1e3;
yl.b2 = fringeWidth(yl.lam, yl.D2, yl.d, yl.n) * 1e3;
add('ydse-long', long({
  stem: '(a) In Young’s double-slit experiment, explain why the two slits act as coherent sources. [1] (b) Show that the bright fringes are equally spaced and derive the expression for the fringe width. [2] (c) Light of wavelength 510 nm falls on slits 0.34 mm apart, and the screen is 1.6 m away. (i) Find the fringe width. (ii) The screen is moved to 2.4 m from the slits and the whole apparatus is immersed in a liquid of refractive index 1.2. Find the new fringe width. [2]',
  model: r`(a) Both slits are lit by the **same wavefront** from one narrow slit, so they vibrate with the same frequency and a fixed phase difference (in phase if equidistant from it).
(b) At a point P a distance y from the centre, the path difference is $S_2P - S_1P \approx d\sin\theta \approx \dfrac{yd}{D}$. Bright fringes: $\dfrac{yd}{D} = n\lambda$, so $y_n = \dfrac{n\lambda D}{d}$. Neighbouring bright fringes are $\beta = y_{n+1} - y_n = \dfrac{\lambda D}{d}$ apart, the same for all n: the fringes are equally spaced.
(c)(i) $\beta = \dfrac{510 \times 10^{-9} \times 1.6}{0.34 \times 10^{-3}} = ${dec(yl.b, 2)}$ mm.
(ii) $\beta' = \dfrac{\lambda D'}{n d} = 2.4 \times \dfrac{2.4}{1.6} \times \dfrac{1}{1.2} = ${dec(yl.b2, 2)}$ mm.`,
  sol: 'One wavefront → coherent; Δ = yd/D; β = λD/d; in a liquid λ/n.',
  scheme: [['Same wavefront, fixed phase difference', 1], ['Δ = yd/D and bright fringes at nλD/d', 1], ['β = λD/d independent of n', 1], ['β = 2.4 mm', 1], ['β′ = 3.0 mm', 1]],
  d: 3, c: 'application', t: [3, 4], wl: null,
}), () => near(yl.b, 2.4) && near(yl.b2, 3.0) && near(fringeWidth(yl.lam / yl.n, yl.D2, yl.d) * 1e3, 3.0) || `yl ${yl.b2}`);
const il = { ratio: 4, beta: 1.5 };
il.c = ((Math.sqrt(il.ratio) + 1) / (Math.sqrt(il.ratio) - 1)) ** 2;
il.y = il.beta / 4;
add('intensity-long', long({
  stem: '(a) Two identical narrow slits each give an intensity I₀ on a distant screen. Using I = 4I₀ cos²(φ/2), describe how the intensity varies across the screen (a sketch described in words), and show that the average intensity is 2I₀, so that energy is conserved. [2] (b) The light from one slit is then reduced so that it is one quarter as intense as the light from the other. Find I_max : I_min. [1] (c) With equal slits and a fringe width of 1.5 mm, find the distance from the centre of the central maximum of the nearest point where the intensity is half the maximum. [2]',
  model: r`(a) As y increases, φ = 2πy/β grows steadily, so the intensity rises and falls in identical $\cos^2$ peaks: maxima of $4I_0$ at $y = 0, \pm\beta, \pm2\beta, \dots$ and zeros midway, all peaks equally bright. The average of $\cos^2$ over a cycle is $\tfrac{1}{2}$, so the average intensity is $4I_0 \times \tfrac{1}{2} = 2I_0$: exactly the two slits’ intensities added. Energy taken from the dark fringes appears in the bright ones; none is lost.
(b) Amplitudes in the ratio $\sqrt{4} : 1 = 2 : 1$: $\dfrac{I_{\max}}{I_{\min}} = \dfrac{(2 + 1)^2}{(2 - 1)^2} = ${dec(il.c, 1)}$, i.e. 9 : 1.
(c) $\cos^2\dfrac{\varphi}{2} = \dfrac{1}{2}$ gives $\varphi = \dfrac{\pi}{2}$, a quarter of a cycle, so $y = \dfrac{\beta}{4} = ${dec(il.y, 3)}$ mm.`,
  sol: 'Average of cos² is ½; amplitude ratio 2 : 1; φ = π/2 ↔ y = β/4.',
  scheme: [['Description: equal peaks 4I₀, zeros midway, spacing β', 1], ['Average 2I₀: energy redistributed', 1], ['I_max : I_min = 9 : 1', 1], ['φ = π/2', 1], ['y = 0.375 mm', 1]],
  d: 3, c: 'analysis', t: [4, 5], wl: null,
}), () => {
  const lam = 500e-9;
  const D = 1;
  const d = (lam * D) / 1.5e-3;
  return (near(il.c, 9) && near(doubleSlit(d, lam, 0.375e-3 / D), 0.5, 1e-4) && near(twoBeam(4, 1, 0) / twoBeam(4, 1, Math.PI), 9)) || `il ${il.c}`;
});
const sl5 = { lam: 580e-9, a: 0.29e-3, D: 1.5 };
sl5.ang = (2 * sl5.lam) / sl5.a;
sl5.W = sl5.ang * sl5.D * 1e3;
add('singleslit-long', long({
  stem: '(a) Monochromatic light falls normally on a single narrow slit. Describe the diffraction pattern seen on a distant screen, and explain, by dividing the slit into parts, the conditions for its minima and for its secondary maxima. [3] (b) Light of wavelength 580 nm falls on a slit 0.29 mm wide and the pattern is observed on a screen 1.5 m away. Find the angular width and the linear width of the central maximum. [2]',
  model: r`(a) The pattern is a broad, bright **central maximum** with fainter, narrower bright bands on either side, separated by dark bands; the side bands fade quickly. Straight ahead all wavelets are in phase (bright centre). At $a\sin\theta = \lambda$ the slit is split into two halves whose wavelets cancel in pairs ($\lambda/2$ apart): dark. In general, dark bands lie at $a\sin\theta = n\lambda$ ($n = \pm1, \pm2, \dots$), where the slit splits into an even number of cancelling parts. At about $a\sin\theta = (n + \tfrac{1}{2})\lambda$ it splits into an odd number of parts, one uncancelled: weak **secondary maxima**.
(b) Angular width $\dfrac{2\lambda}{a} = \dfrac{2 \times 580 \times 10^{-9}}{0.29 \times 10^{-3}} = ${(sl5.ang * 1e3).toFixed(1)} \times 10^{-3}$ rad; linear width $W = D \times \dfrac{2\lambda}{a} = ${dec(sl5.W, 2)}$ mm.`,
  sol: 'Pairs cancel at a sin θ = nλ; one part left at (n + ½)λ; W = 2λD/a.',
  scheme: [['Description of the pattern', 1], ['Minima a sin θ = nλ by pairing halves', 1], ['Secondary maxima near (n + ½)λ, weak', 1], ['Angular width 4.0 × 10⁻³ rad', 1], ['W = 6.0 mm', 1]],
  d: 3, c: 'application', t: [6, 7], wl: null,
}), () => near(sl5.ang, 4e-3) && near(sl5.W, 6) && singleSlit(sl5.a, sl5.lam, Math.sin(Math.atan(3e-3 / sl5.D))) < 1e-5 || `sl5 ${sl5.W}`);
