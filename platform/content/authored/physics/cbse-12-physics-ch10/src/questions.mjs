// ch10 Wave Optics — question bank. Numbers are computed here and re-checked by the `check` functions.
// AR keys planned: a c d a b a c.
import { mk, add, r, sci, dec, near } from '../../cbse-12-physics-ch01/src/lib.mjs';
import { C } from './decks.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const deg = (d) => (d * Math.PI) / 180;
const todeg = (x) => (x * 180) / Math.PI;

// ================================================================ t01 wavefronts and Huygens' principle
add('star-mcq', mcq({
  stem: 'Light from a distant star reaches a telescope on Earth. The wavefronts entering the telescope are',
  right: 'plane',
  wrong: ['spherical, diverging from the telescope', 'cylindrical', 'spherical, converging on the star'],
  sol: 'A tiny part of a huge spherical wavefront, very far from its source, is practically flat — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('envelope-tf', tf({
  stem: 'In Huygens’ construction, the new wavefront is the surface that touches the secondary wavelets on the side facing back towards the source.',
  key: 'f',
  sol: 'False. The new wavefront is the FORWARD envelope of the secondary wavelets; the backward wave is ignored.',
  d: 1, c: 'understanding', t: [1],
}));
add('normal-fill', fill({
  stem: 'In an isotropic medium, a ray of light is always ___ to the wavefront at the point where it crosses it.',
  acc: [['perpendicular', 'normal', 'at right angles']],
  sol: 'Rays are **perpendicular** (normal) to wavefronts: energy travels at right angles to the surfaces of constant phase.',
  d: 1, c: 'recall', t: [1],
}));
add('lensfocus-mcq', mcq({
  stem: 'A point source of light is placed at the focus of a thin convex lens. The wavefront that emerges from the lens is',
  right: 'plane',
  wrong: ['spherical and converging', 'spherical and diverging', 'cylindrical'],
  sol: 'Rays from the focus leave the lens parallel; wavefronts perpendicular to parallel rays are plane — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('concave-wf-mcq', mcq({
  stem: 'A plane wavefront falls on a concave mirror along its axis. After reflection the wavefront is',
  right: 'spherical, converging to the focus',
  wrong: ['plane, travelling back along the axis', 'spherical, diverging from a point behind the mirror', 'cylindrical'],
  sol: 'Parallel rays reflect through the focus; the wavefronts normal to them are spheres shrinking onto the focus — option (@K).',
  d: 2, c: 'application', t: [1],
}));
const yw = { lam: 589, n: 1.33 };
yw.lam2 = yw.lam / yw.n;
add('yellow-mcq', mcq({
  stem: 'Yellow light of wavelength 589 nm in air passes into water of refractive index 1.33. In the water, its wavelength and frequency are',
  right: 'about 443 nm, with the frequency unchanged',
  wrong: ['589 nm, with the frequency reduced by 1.33', 'about 783 nm, with the frequency unchanged', 'about 443 nm, with the frequency increased by 1.33'],
  sol: r`The source fixes the frequency; the speed falls by $n$, so $\lambda' = \dfrac{589}{1.33} \approx ${dec(yw.lam2, 3)}$ nm — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => near(yw.lam2, 443) || 'yw');
add('bend-ar', ar({
  a: 'A plane wavefront entering a slower medium obliquely turns so that the refracted rays bend towards the normal.',
  r: 'The part of the wavefront that enters the slower medium first travels a shorter distance in the same time than the part still in the faster medium.',
  key: 'a',
  sol: 'Both true; because the wavelets in the slower medium have smaller radii (R), the wavefront swings round and the ray bends towards the normal (A) — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('ratio-mcq', mcq({
  stem: 'In Huygens’ construction for refraction from medium 1 into medium 2, the ratio of the radius of the secondary wavelet in medium 2 to the distance travelled by the incident wavefront in medium 1, in the same time, equals',
  right: '$v_2/v_1$, which is $n_1/n_2$',
  wrong: ['$v_1/v_2$, which is $n_1/n_2$', '$n_2/n_1$, which is $v_1/v_2$ squared', '1, because the time is the same'],
  sol: 'AE = v₂t and BC = v₁t, so AE/BC = v₂/v₁ = n₁/n₂ — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
const sn = { i: 60, r: 35 };
sn.v = (C * Math.sin(deg(sn.r))) / Math.sin(deg(sn.i));
add('speed-num', num({
  stem: 'A ray of light in air meets the surface of a transparent plastic at an angle of incidence of 60° and is refracted at 35°. Using Huygens’ result sin i / sin r = v₁/v₂, find the speed of light in the plastic, in units of 10⁸ m s⁻¹ (3 significant figures).',
  value: Number(dec(sn.v / 1e8, 3)), tol: 0.01, unit: '× 10⁸ m s⁻¹',
  sol: r`$v_2 = v_1\dfrac{\sin r}{\sin i} = 3.0 \times 10^{8} \times \dfrac{\sin 35°}{\sin 60°} = 3.0 \times 10^{8} \times \dfrac{0.5736}{0.8660} \approx ${sci(sn.v, 3)}$ m s$^{-1}$, i.e. $\dfrac{${sci(sn.v, 3)}}{10^{8}} = ${dec(sn.v / 1e8, 3)}$ in units of $10^{8}$ m s$^{-1}$.`,
  scheme: [['v₂ = v₁ sin r / sin i', 1], ['≈ 1.99 × 10⁸ m s⁻¹', 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => near(sn.v / 1e8, q.answer.value) || `sn ${sn.v}`);
const lm = { lam: 600, v: 2.25e8 };
lm.n = C / lm.v;
lm.lam2 = lm.lam / lm.n;
add('medlam-num', num({
  stem: 'Light of wavelength 600 nm in vacuum travels at 2.25 × 10⁸ m s⁻¹ in a liquid. Find its wavelength in the liquid, in nm.',
  value: lm.lam2, tol: 1, unit: 'nm',
  sol: r`$\lambda' = \dfrac{v}{f} = \lambda\dfrac{v}{c} = 600 \times \dfrac{2.25 \times 10^{8}}{3.0 \times 10^{8}} = ${dec(lm.lam2, 3)}$ nm.`,
  scheme: [['λ′ = λ v/c (f unchanged)', 1], ['450 nm', 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => near(lm.lam2, 450) && near(q.answer.value, 450) || 'lm');
const wa = { th: 40, n: 1.5 };
wa.r = todeg(Math.asin(Math.sin(deg(wa.th)) / wa.n));
add('wfangle-num', num({
  stem: 'A plane wavefront travelling in air makes an angle of 40° with the flat surface of a glass block (n = 1.5) as it reaches it. Find the angle, in degrees, that the refracted wavefront inside the glass makes with the surface (1 decimal place).',
  value: Number(wa.r.toFixed(1)), tol: 0.3, unit: '°',
  sol: r`The angle between a wavefront and the surface equals the angle between the ray and the normal, so $i = 40°$. Then $\sin r = \dfrac{\sin 40°}{1.5} = \dfrac{0.6428}{1.5} = ${dec(Math.sin(deg(40)) / 1.5, 3)}$, so $r = \sin^{-1}(${dec(Math.sin(deg(40)) / 1.5, 3)}) = ${dec(wa.r, 3)}$°: the refracted wavefront makes ${wa.r.toFixed(1)}° with the surface.`,
  scheme: [['Wavefront angle with surface = angle of incidence', 1], ['r = 25.4° by Snell’s law', 1]],
  marks: 2, d: 4, c: 'application', t: [1],
}), (q) => near(wa.r, 25.4, 0.003) && near(q.answer.value, 25.4) || `wa ${wa.r}`);
add('reflect-short3', short({
  marks: 3,
  stem: 'Using Huygens’ principle, prove that the angle of incidence equals the angle of reflection when a plane wavefront is reflected from a plane surface.',
  model: r`Let plane wavefront AB be incident at angle $i$ on the mirror, A touching it first. In the time $t$ that B travels to C ($BC = vt$), a secondary wavelet from A spreads to radius $AE = vt$. The tangent from C to this wavelet, CE, is the reflected wavefront, at angle $r$. In right triangles ABC and AEC (right angles at B and E), the hypotenuse AC is common and $BC = AE$, so the triangles are congruent: $\angle BAC = \angle ECA$, i.e. $i = r$.`,
  sol: 'Equal times, equal speeds, congruent right triangles.',
  scheme: [['Figure: AB, wavelet from A, tangent CE', 1], ['BC = AE = vt', 1], ['Congruent triangles ⇒ i = r', 1]],
  d: 3, c: 'understanding', t: [1], wl: null,
}));
add('rarer-short', short({
  marks: 2,
  stem: 'Using Huygens’ construction, explain why a ray of light passing obliquely from glass into air bends away from the normal.',
  model: 'Light is **faster in air**. While the far edge of the wavefront still moves through glass, the wavelet from the edge that has reached air spreads **farther** in the same time. The tangent wavefront therefore swings **towards the surface**, and the ray, normal to it, bends **away from the normal** ($r > i$).',
  sol: 'Bigger wavelet radius in the faster medium.',
  scheme: [['Wavelet in air has larger radius (v_air > v_glass)', 1], ['New wavefront tilts, ray bends away from normal', 1]],
  d: 3, c: 'understanding', t: [1],
}));

// ================================================================ t02 coherent sources and interference
add('coherent-fill', fill({
  stem: 'Two sources are coherent if they have the same frequency and a constant ___ difference.',
  acc: [['phase']],
  sol: 'A constant **phase** difference.',
  d: 1, c: 'recall', t: [2],
}));
add('bulbs-ar', ar({
  a: 'Two independent sodium lamps placed side by side do not produce a steady interference pattern on a screen.',
  r: 'Two sodium lamps always emit light of different frequencies.',
  key: 'c',
  sol: 'A is true. R is false: both lamps emit the same yellow sodium light; the pattern fails because the phase of each lamp changes randomly about every 10⁻⁹ s, so the phase difference is not constant — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('energy-ar', ar({
  a: 'In an interference pattern, light energy is destroyed at the dark fringes.',
  r: 'For two equal coherent waves the intensity, averaged across the pattern, equals the sum of the two separate intensities.',
  key: 'd',
  sol: 'R is true (the average of 4I₀cos²(φ/2) is 2I₀). A is false: energy missing from the dark fringes appears in the bright ones; it is only redistributed — option (d).',
  d: 2, c: 'understanding', t: [2],
}));
const pd = { dx: 2.1e-6, lam: 700e-9 };
pd.k = pd.dx / pd.lam;
add('pd-mcq', mcq({
  stem: 'Two coherent sources in phase emit red light of wavelength 700 nm. At a point P the waves have a path difference of 2.1 μm. P is a point of',
  right: 'constructive interference (bright), since the path difference is 3λ',
  wrong: ['destructive interference (dark), since the path difference is 3λ', 'destructive interference (dark), since the path difference is 2.5λ', 'neither, since 2.1 μm is not a whole number of micrometres'],
  sol: r`$\dfrac{\Delta}{\lambda} = \dfrac{2.1 \times 10^{-6}}{700 \times 10^{-9}} = ${dec(pd.k, 2)}$, a whole number of wavelengths, so the waves arrive in phase — option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => near(pd.k, 3) || 'pd');
add('quarter-mcq', mcq({
  stem: 'A path difference of λ/4 between two waves corresponds to a phase difference of',
  right: 'π/2',
  wrong: ['π/4', 'π', '2π'],
  sol: 'φ = (2π/λ)Δ = (2π/λ)(λ/4) = π/2 — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('odd-tf', tf({
  stem: 'Two coherent waves starting in phase interfere constructively at a point where their path difference is an odd multiple of λ/2.',
  key: 'f',
  sol: 'False. An odd multiple of λ/2 brings a crest onto a trough: destructive interference. Constructive needs a whole number of wavelengths.',
  d: 1, c: 'understanding', t: [2],
}));
const ph = { dx: 0.125e-6, lam: 500e-9 };
ph.phi = (2 * Math.PI * ph.dx) / ph.lam;
ph.I = 4 * Math.cos(ph.phi / 2) ** 2;
add('phase-num', num({
  stem: 'Two coherent waves, each of intensity I₀ at a point, have a path difference of 0.125 μm there. The wavelength is 500 nm. Find the resultant intensity as a multiple of I₀.',
  value: ph.I, tol: 0.05, unit: '× I₀',
  sol: r`$\varphi = \dfrac{2\pi}{\lambda}\Delta = \dfrac{2\pi \times 0.125 \times 10^{-6}}{500 \times 10^{-9}} = \dfrac{\pi}{2}$; $\dfrac{I}{I_0} = 4\cos^2\dfrac{\pi}{4} = 4 \times 0.5 = ${dec(ph.I, 2)}$, so $I = 2I_0$.`,
  scheme: [['φ = π/2', 1], ['I = 4I₀cos²(φ/2) = 2I₀', 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => near(ph.I, 2) && near(q.answer.value, 2) || 'ph');
const am = { a1: 3, a2: 2 };
am.R = (am.a1 + am.a2) ** 2 / (am.a1 - am.a2) ** 2;
add('amp-num', num({
  stem: 'Two coherent waves with amplitudes in the ratio 3 : 2 interfere. Find the ratio of the maximum to the minimum intensity.',
  value: am.R, tol: 0.1, unit: '',
  sol: r`$\dfrac{I_\text{max}}{I_\text{min}} = \dfrac{(a_1 + a_2)^2}{(a_1 - a_2)^2} = \dfrac{(3 + 2)^2}{(3 - 2)^2} = ${am.R}$.`,
  scheme: [['Ratio of squares of (a₁ ± a₂) = 25', 1]],
  d: 2, c: 'application', t: [2],
}), (q) => near(am.R, 25) && near(q.answer.value, 25) || 'am');
const ir = { I1: 9, I2: 1 };
ir.R = (Math.sqrt(ir.I1) + Math.sqrt(ir.I2)) ** 2 / (Math.sqrt(ir.I1) - Math.sqrt(ir.I2)) ** 2;
add('intratio-num', num({
  stem: 'The two slits in an interference experiment let through light of INTENSITIES in the ratio 9 : 1. Find the ratio of the intensity at a bright fringe to that at a dark fringe.',
  value: ir.R, tol: 0.05, unit: '',
  sol: r`Amplitude $\propto \sqrt{I}$, so $a_1 : a_2 = 3 : 1$. Then $\dfrac{I_\text{max}}{I_\text{min}} = \dfrac{(3 + 1)^2}{(3 - 1)^2} = \dfrac{16}{4} = ${ir.R}$.`,
  scheme: [['Amplitude ratio √9 : √1 = 3 : 1', 1], ['I_max/I_min = 16/4 = 4', 1]],
  marks: 2, d: 4, c: 'analysis', t: [2],
}), (q) => near(ir.R, 4) && near(q.answer.value, 4) || 'ir');
add('incoherent-mcq', mcq({
  stem: 'Light from two incoherent sources, each giving intensity I₀ alone, falls on the same screen. The intensity on the screen is',
  right: '2I₀ everywhere',
  wrong: ['alternately 4I₀ and 0', '4I₀ everywhere', 'I₀ everywhere'],
  sol: 'With a randomly changing phase difference the cos φ term averages to zero, so the intensities simply add — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('coherent-short', short({
  marks: 2,
  stem: 'What are coherent sources? Why can two independent sources of light not be coherent?',
  model: 'Coherent sources emit waves of the **same frequency** with a **constant phase difference**. In an ordinary source each atom emits a short burst lasting about $10^{-9}$ s with a **random phase**, so the phase difference between two independent sources changes randomly and very rapidly, and no steady pattern forms.',
  sol: 'Definition plus random phase changes.',
  scheme: [['Definition: same frequency, constant phase difference', 1], ['Independent sources: random, rapid phase changes', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('conditions-short', short({
  marks: 2,
  stem: 'State any two conditions needed to obtain a sustained interference pattern with good contrast.',
  model: 'Any two: the sources must be **coherent** (same frequency, constant phase difference); the interfering waves should have **nearly equal amplitudes** so that dark fringes are really dark; the sources should be **narrow** and **close together**; the light should be **monochromatic**.',
  sol: 'Two of the four conditions.',
  scheme: [['First condition', 1], ['Second condition', 1]],
  d: 1, c: 'recall', t: [2],
}));
const mm = { I1: 1, I2: 4 };
mm.max = (Math.sqrt(mm.I1) + Math.sqrt(mm.I2)) ** 2;
mm.min = (Math.sqrt(mm.I1) - Math.sqrt(mm.I2)) ** 2;
mm.mid = mm.I1 + mm.I2 + 2 * Math.sqrt(mm.I1 * mm.I2) * Math.cos(Math.PI / 2);
mm.third = mm.I1 + mm.I2 + 2 * Math.sqrt(mm.I1 * mm.I2) * Math.cos(Math.PI / 3);
add('maxmin-short3', short({
  marks: 3,
  stem: 'Two coherent waves of intensities I and 4I superpose. Find (a) the maximum and (b) the minimum possible intensities, and (c) the intensity where their phase difference is π/3.',
  model: r`$I_R = I_1 + I_2 + 2\sqrt{I_1 I_2}\cos\varphi = I + 4I + 2\sqrt{4I^2}\cos\varphi = 5I + 4I\cos\varphi$.
(a) $\varphi = 0$: $I_\text{max} = 5I + 4I = ${mm.max}I$.
(b) $\varphi = \pi$: $I_\text{min} = 5I - 4I = I$.
(c) $\varphi = \pi/3$: $I_R = 5I + 4I \times 0.5 = ${mm.third}I$.`,
  sol: 'I_R = I₁ + I₂ + 2√(I₁I₂) cos φ.',
  scheme: [['I_max = 9I', 1], ['I_min = I', 1], ['I = 7I at π/3', 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => near(mm.max, 9) && near(mm.min, 1) && near(mm.third, 7) || 'mm');

// ================================================================ t03 Young's double-slit experiment
const bn = { lam: 500e-9, d: 0.25e-3, D: 1.0 };
bn.beta = (bn.lam * bn.D) / bn.d;
add('beta-num', num({
  stem: 'In a double-slit experiment the slits are 0.25 mm apart and the screen is 1.0 m away. Light of wavelength 500 nm is used. Find the fringe width, in mm.',
  value: bn.beta * 1e3, tol: 0.02, unit: 'mm',
  sol: r`$\beta = \dfrac{\lambda D}{d} = \dfrac{500 \times 10^{-9} \times 1.0}{0.25 \times 10^{-3}} = ${sci(bn.beta, 2)}$ m, i.e. $${sci(bn.beta, 2)} \times 10^{3} = ${dec(bn.beta * 1e3, 2)}$ mm.`,
  scheme: [['β = λD/d = 2.0 mm', 1]],
  d: 1, c: 'understanding', t: [3],
}), (q) => near(bn.beta * 1e3, q.answer.value) || 'bn');
const b4 = { lam: 450e-9, d: 0.5e-3, D: 1.2 };
b4.beta = (b4.lam * b4.D) / b4.d;
b4.y = 4 * b4.beta;
add('fourth-num', num({
  stem: 'Blue light of wavelength 450 nm illuminates two slits 0.50 mm apart, and fringes are seen on a screen 1.2 m away. How far from the central bright fringe is the fourth bright fringe, in mm (3 significant figures)?',
  value: Number(dec(b4.y * 1e3, 3)), tol: 0.03, unit: 'mm',
  sol: r`$\beta = \dfrac{\lambda D}{d} = \dfrac{450 \times 10^{-9} \times 1.2}{0.50 \times 10^{-3}} = ${sci(b4.beta, 3)}$ m; $y_4 = 4\beta = ${sci(b4.y, 3)}$ m $= ${dec(b4.y * 1e3, 3)}$ mm.`,
  scheme: [['β = 1.08 mm', 1], ['y₄ = 4β = 4.32 mm', 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(b4.y * 1e3, q.answer.value) && near(b4.y, 4.32e-3) || 'b4');
const dk = { beta: 1.2 };
dk.sep = 4.5 * dk.beta - 3 * dk.beta;
add('darkbright-num', num({
  stem: 'In a double-slit pattern the fringe width is 1.2 mm. Find the distance, in mm, between the third bright fringe and the fifth dark fringe on the same side of the centre.',
  value: dk.sep, tol: 0.02, unit: 'mm',
  sol: r`The $n$th dark fringe is at $(n - \tfrac{1}{2})\beta$, so the fifth is at $4.5\beta$; the third bright is at $3\beta$. Separation $= 1.5\beta = 1.5 \times 1.2 = ${dec(dk.sep, 2)}$ mm.`,
  scheme: [['Fifth dark at 4.5β, third bright at 3β', 1], ['Separation 1.5β = 1.8 mm', 1]],
  marks: 2, d: 4, c: 'application', t: [3],
}), (q) => near(dk.sep, 1.8) && near(q.answer.value, 1.8) || 'dk');
const lf = { d: 0.6e-3, D: 1.5, beta: 1.4e-3 };
lf.lam = (lf.beta * lf.d) / lf.D;
add('lamfind-num', num({
  stem: 'Two slits 0.60 mm apart give fringes of width 1.4 mm on a screen 1.5 m away. Find the wavelength of the light, in nm.',
  value: lf.lam * 1e9, tol: 2, unit: 'nm',
  sol: r`$\lambda = \dfrac{\beta d}{D} = \dfrac{1.4 \times 10^{-3} \times 0.60 \times 10^{-3}}{1.5} = ${sci(lf.lam, 2)}$ m, i.e. $${sci(lf.lam, 3)} \times 10^{9} = ${dec(lf.lam * 1e9, 3)}$ nm.`,
  scheme: [['λ = βd/D', 1], ['560 nm', 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(lf.lam, 5.6e-7) && near(q.answer.value, 560) || 'lf');
add('immerse-mcq', mcq({
  stem: 'A double-slit apparatus gives fringes 3.0 mm wide in air. The whole apparatus is then immersed in a transparent liquid of refractive index 1.5. The fringe width becomes',
  right: '2.0 mm',
  wrong: ['4.5 mm', '3.0 mm', '1.5 mm'],
  sol: 'In the liquid λ becomes λ/n, so β becomes β/n = 3.0/1.5 = 2.0 mm — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('dD-mcq', mcq({
  stem: 'In a double-slit experiment the distance to the screen is doubled and the slit separation is halved. The fringe width',
  right: 'becomes four times as large',
  wrong: ['stays the same', 'doubles', 'becomes one quarter'],
  sol: 'β = λD/d: doubling D doubles β and halving d doubles it again — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('red-mcq', mcq({
  stem: 'In a double-slit experiment, blue light of wavelength 450 nm is replaced by red light of wavelength 675 nm, with nothing else changed. The fringe width',
  right: 'increases by a factor of 1.5',
  wrong: ['decreases by a factor of 1.5', 'is unchanged, since only the colour changes', 'increases by a factor of 2.25'],
  sol: 'β ∝ λ, and 675/450 = 1.5 — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('white-mcq', mcq({
  stem: 'When white light is used in a double-slit experiment, the central fringe is',
  right: 'white, because the path difference there is zero for every colour',
  wrong: ['dark, because the colours cancel one another', 'violet, because violet has the shortest wavelength', 'red, because red has the widest fringes'],
  sol: 'At the centre every wavelength interferes constructively, so all colours combine to give white — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
const ag = { lam: 589e-9, d: 0.2e-3 };
ag.th = ag.lam / ag.d;
ag.thDeg = todeg(ag.th);
add('angular-num', num({
  stem: 'Find the angular fringe width, in degrees, for a double-slit experiment with sodium light (λ = 589 nm) and slits 0.20 mm apart (2 significant figures).',
  value: Number(ag.thDeg.toPrecision(2)), tol: 0.005, unit: '°',
  sol: r`$\theta = \dfrac{\lambda}{d} = \dfrac{589 \times 10^{-9}}{0.20 \times 10^{-3}} = ${sci(ag.th, 3)}$ rad. In degrees: $${sci(ag.th, 3)} \times \dfrac{180}{\pi} = ${dec(ag.thDeg, 3)}°$, about 0.17°.`,
  scheme: [['θ = λ/d ≈ 2.94 × 10⁻³ rad', 1], ['≈ 0.17°', 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(ag.thDeg, q.answer.value, 0.02) || `ag ${ag.thDeg}`);
const cc = { l1: 650e-9, l2: 520e-9, D: 1.2, d: 0.5e-3 };
for (let n1 = 1; n1 < 20; n1++) {
  const n2 = (n1 * cc.l1) / cc.l2;
  if (Math.abs(n2 - Math.round(n2)) < 1e-9) { cc.n1 = n1; cc.n2 = Math.round(n2); break; }
}
cc.y = (cc.n1 * cc.l1 * cc.D) / cc.d;
add('coincide-short3', short({
  marks: 3,
  stem: 'A double-slit arrangement (d = 0.50 mm, D = 1.2 m) is lit by light containing two wavelengths, 650 nm and 520 nm. Find the least distance from the central maximum at which a bright fringe of one wavelength falls exactly on a bright fringe of the other.',
  model: r`Bright fringes coincide where $n_1\lambda_1 = n_2\lambda_2$: $650n_1 = 520n_2$, i.e. $\dfrac{n_1}{n_2} = \dfrac{520}{650} = \dfrac{4}{5}$. The smallest whole numbers are $n_1 = ${cc.n1}$, $n_2 = ${cc.n2}$. Then $y = \dfrac{n_1\lambda_1 D}{d} = \dfrac{4 \times 650 \times 10^{-9} \times 1.2}{0.50 \times 10^{-3}} = ${sci(cc.y, 3)}$ m, i.e. about ${dec(cc.y * 1e3, 3)} mm.`,
  sol: 'Equal positions: n₁λ₁ = n₂λ₂ with the smallest integers.',
  scheme: [['Condition n₁λ₁ = n₂λ₂', 1], ['n₁ = 4, n₂ = 5', 1], ['y = 6.24 mm', 1]],
  d: 5, c: 'analysis', t: [3], wl: null,
}), () => cc.n1 === 4 && cc.n2 === 5 && near(cc.y, 6.24e-3) || `cc ${cc.n1} ${cc.y}`);
add('cover-ar', ar({
  a: 'If one of the two slits in Young’s experiment is covered, the equally spaced interference fringes disappear.',
  r: 'Interference fringes need light from two coherent sources to overlap on the screen.',
  key: 'a',
  sol: 'Both true, and R explains A: with only one slit open there is no second coherent wave to interfere with (only the broad diffraction pattern of one slit remains) — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('centre-ar', ar({
  a: 'The fringe width in Young’s experiment increases when the distance between the slits is increased.',
  r: 'The central fringe in Young’s experiment is bright because the path difference there is zero.',
  key: 'd',
  sol: 'R is true. A is false: β = λD/d, so a larger slit separation gives NARROWER fringes — option (d).',
  d: 2, c: 'understanding', t: [3],
}));
add('slitS-short', short({
  marks: 2,
  stem: 'In Young’s experiment, why is the light first passed through a single narrow slit S before it reaches the double slit?',
  model: 'The narrow slit S provides a **single wavefront** that reaches both S₁ and S₂. Any random change of phase at S reaches both slits together, so S₁ and S₂ have a **constant phase difference**: they act as **coherent sources**. A wide source would give many overlapping patterns that wash out.',
  sol: 'S makes S₁ and S₂ coherent.',
  scheme: [['One wavefront reaches both slits', 1], ['So S₁, S₂ are coherent (constant phase difference)', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('changes-short', short({
  marks: 2,
  stem: 'State how the fringe width in Young’s double-slit experiment changes when (a) the screen is moved away from the slits, (b) the separation between the slits is increased. Give a reason in each case.',
  model: 'Since $\\beta = \\lambda D/d$: (a) moving the screen away **increases** $D$, so the fringe width **increases** in proportion; (b) increasing the slit separation $d$ **decreases** the fringe width, since $\\beta \\propto 1/d$; the fringes crowd together.',
  sol: 'Use β = λD/d.',
  scheme: [['(a) increases, β ∝ D', 1], ['(b) decreases, β ∝ 1/d', 1]],
  d: 2, c: 'understanding', t: [3],
}));
const wt = { lam: 600e-9, d: 1.0e-3, D: 1.0, n: 4 / 3 };
wt.beta = (wt.lam * wt.D) / wt.d;
wt.betaW = wt.beta / wt.n;
wt.y2 = 2 * wt.betaW;
add('water-short3', short({
  marks: 3,
  stem: 'Light of wavelength 600 nm in air is used in a double-slit experiment with slits 1.0 mm apart and a screen 1.0 m away. Find the fringe width (a) in air, (b) when the whole set-up is immersed in water of refractive index 4/3. (c) How far from the centre is the second bright fringe in water?',
  model: r`(a) $\beta = \dfrac{\lambda D}{d} = \dfrac{600 \times 10^{-9} \times 1.0}{1.0 \times 10^{-3}} = ${sci(wt.beta, 2)}$ m (0.60 mm).
(b) In water $\lambda' = \lambda/n$, so $\beta' = \dfrac{\beta}{n} = \dfrac{0.60}{4/3} = ${dec(wt.betaW * 1e3, 2)}$ mm.
(c) $y_2 = 2\beta' = ${dec(wt.y2 * 1e3, 2)}$ mm.`,
  sol: 'β = λD/d; in water divide by n.',
  scheme: [['β = 0.60 mm', 1], ['β′ = 0.45 mm', 1], ['y₂ = 0.90 mm', 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => near(wt.betaW, 4.5e-4) && near(wt.y2, 9e-4) || 'wt');
const pt = { frac: 1 / 3 };
pt.phi = 2 * Math.PI * pt.frac;
pt.I = Math.cos(pt.phi / 2) ** 2;
add('third-num', num({
  stem: 'In a double-slit experiment with two slits of equal intensity, a point P on the screen is one third of a fringe width from the centre of the central bright fringe. Find the intensity at P as a fraction of the intensity at the centre.',
  value: pt.I, tol: 0.01, unit: '',
  sol: r`At P the path difference is $\dfrac{y d}{D} = \dfrac{\beta}{3}\cdot\dfrac{d}{D} = \dfrac{\lambda}{3}$, so $\varphi = \dfrac{2\pi}{3}$. $\dfrac{I}{I_\text{max}} = \cos^2\dfrac{\varphi}{2} = \cos^2 60° = ${dec(pt.I, 2)}$.`,
  scheme: [['Path difference λ/3, φ = 2π/3', 1], ['I/I_max = cos²(π/3) = 0.25', 1]],
  marks: 2, d: 4, c: 'analysis', t: [2, 3],
}), (q) => near(pt.I, 0.25) && near(q.answer.value, 0.25) || 'pt');

// ================================================================ t04 single-slit diffraction
add('narrow-mcq', mcq({
  stem: 'In a single-slit diffraction experiment, the slit is made half as wide. The angular width of the central maximum',
  right: 'doubles',
  wrong: ['halves', 'stays the same', 'becomes four times as large'],
  sol: 'The angular width is 2λ/a, so halving a doubles it — option (@K).',
  d: 2, c: 'application', t: [4],
}));
const s1 = { lam: 500e-9, a: 0.1e-3 };
s1.th = s1.lam / s1.a;
add('ssmin-num', num({
  stem: 'Light of wavelength 500 nm falls normally on a slit 0.10 mm wide. Find the angle of the first minimum of the diffraction pattern, in milliradians.',
  value: s1.th * 1e3, tol: 0.05, unit: 'mrad',
  sol: r`$\sin\theta_1 \approx \theta_1 = \dfrac{\lambda}{a} = \dfrac{500 \times 10^{-9}}{0.10 \times 10^{-3}} = ${sci(s1.th, 2)}$ rad, i.e. $${sci(s1.th, 2)} \times 10^{3} = ${dec(s1.th * 1e3, 2)}$ mrad.`,
  scheme: [['θ = λ/a = 5.0 mrad', 1]],
  d: 1, c: 'understanding', t: [4],
}), (q) => near(s1.th * 1e3, q.answer.value) || 's1');
const s2 = { lam: 550e-9, a: 0.11e-3, D: 1.5 };
s2.w = (2 * s2.lam * s2.D) / s2.a;
add('sswidth-num', num({
  stem: 'Green light of wavelength 550 nm passes through a slit 0.11 mm wide. Find the width of the central bright band on a screen 1.5 m away, in mm.',
  value: s2.w * 1e3, tol: 0.1, unit: 'mm',
  sol: r`$w = \dfrac{2\lambda D}{a} = \dfrac{2 \times 550 \times 10^{-9} \times 1.5}{0.11 \times 10^{-3}} = ${sci(s2.w, 2)}$ m, i.e. $${sci(s2.w, 2)} \times 10^{3} = ${dec(s2.w * 1e3, 2)}$ mm.`,
  scheme: [['w = 2λD/a', 1], ['15 mm', 1]],
  marks: 2, d: 2, c: 'application', t: [4],
}), (q) => near(s2.w, 0.015) && near(q.answer.value, 15) || 's2');
const s3 = { lam: 500e-9, D: 1.0, y: 2.5e-3 };
s3.a = (s3.lam * s3.D) / s3.y;
add('ssa-num', num({
  stem: 'In a single-slit experiment with light of wavelength 500 nm, the first dark band on a screen 1.0 m away is 2.5 mm from the centre of the pattern. Find the width of the slit, in mm.',
  value: s3.a * 1e3, tol: 0.005, unit: 'mm',
  sol: r`$\theta_1 = \dfrac{y_1}{D} = \dfrac{\lambda}{a}$, so $a = \dfrac{\lambda D}{y_1} = \dfrac{500 \times 10^{-9} \times 1.0}{2.5 \times 10^{-3}} = ${sci(s3.a, 2)}$ m, i.e. $${sci(s3.a, 2)} \times 10^{3} = ${dec(s3.a * 1e3, 2)}$ mm.`,
  scheme: [['a = λD/y₁', 1], ['0.20 mm', 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), (q) => near(s3.a, 2e-4) && near(q.answer.value, 0.2) || 's3');
add('equalslit-mcq', mcq({
  stem: 'Light falls normally on a slit whose width equals the wavelength of the light. The first diffraction minimum on each side would be at',
  right: '90°, so the central maximum spreads over the whole region beyond the slit',
  wrong: ['30°, so the central maximum is 60° wide', '0°, so there is no central maximum', '45°, so the central maximum is 90° wide'],
  sol: 'a sin θ = λ with a = λ gives sin θ = 1, θ = 90°: there are no minima at all, and the light spreads in every forward direction — option (@K).',
  d: 4, c: 'analysis', t: [4],
}));
add('door-ar', ar({
  a: 'We can hear a person talking round the corner of an open doorway but cannot see them.',
  r: 'The wavelengths of audible sound are comparable to the width of a doorway, while the wavelength of light is far smaller.',
  key: 'a',
  sol: 'Both true, and R explains A: diffraction is marked only when the opening is comparable to the wavelength, so sound bends round the doorway and light hardly does — option (a).',
  d: 2, c: 'understanding', t: [4],
}));
add('fringes-ar', ar({
  a: 'In single-slit diffraction, the central maximum is twice as wide as each secondary maximum.',
  r: 'Light from the two halves of the slit cancels completely at every point beyond the first minimum.',
  key: 'c',
  sol: 'A is true: the central maximum spans −λ/a to +λ/a, the others only λ/a each. R is false: beyond the first minimum there are secondary maxima where the cancellation is incomplete — option (c).',
  d: 3, c: 'understanding', t: [4],
}));
add('colour-mcq', mcq({
  stem: 'A single slit is lit first with red light and then with blue light. Compared with the red pattern, the central maximum with blue light is',
  right: 'narrower, because the wavelength of blue light is shorter',
  wrong: ['wider, because blue light is more energetic', 'the same width, because the slit is unchanged', 'narrower, because blue light travels faster in air'],
  sol: 'The width 2λD/a is proportional to λ, and blue light has a shorter wavelength than red — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('secondary-tf', tf({
  stem: 'In single-slit diffraction, the secondary maxima are as bright as the central maximum.',
  key: 'f',
  sol: 'False. The secondary maxima become rapidly fainter; the first is only a few per cent as intense as the central maximum.',
  d: 1, c: 'recall', t: [4],
}));
const s4 = { lam: 500e-9, a: 0.4e-3, D: 1.6 };
s4.y2 = (2 * s4.lam * s4.D) / s4.a;
add('second-num', num({
  stem: 'Light of wavelength 500 nm falls on a slit 0.40 mm wide. Find the distance from the centre of the pattern to the second dark band on a screen 1.6 m away, in mm.',
  value: s4.y2 * 1e3, tol: 0.03, unit: 'mm',
  sol: r`Second minimum: $a\sin\theta = 2\lambda$, so $y_2 = \dfrac{2\lambda D}{a} = \dfrac{2 \times 500 \times 10^{-9} \times 1.6}{0.40 \times 10^{-3}} = ${sci(s4.y2, 2)}$ m, i.e. $${sci(s4.y2, 2)} \times 10^{3} = ${dec(s4.y2 * 1e3, 2)}$ mm.`,
  scheme: [['a sin θ = 2λ', 1], ['y₂ = 4.0 mm', 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), (q) => near(s4.y2, 4e-3) && near(q.answer.value, 4) || 's4');
const nf = { d: 1.0e-3, a: 0.2e-3 };
nf.N = (2 * nf.d) / nf.a;
add('fit-num', num({
  stem: 'In a double-slit experiment each slit is 0.20 mm wide and the slits are 1.0 mm apart (centre to centre). How many double-slit fringe widths fit within the central maximum of the single-slit diffraction pattern of each slit?',
  value: nf.N, tol: 0.1, unit: '',
  sol: r`Central diffraction maximum: angular width $\dfrac{2\lambda}{a}$. Angular fringe width: $\dfrac{\lambda}{d}$. Number of fringe widths $= \dfrac{2\lambda/a}{\lambda/d} = \dfrac{2d}{a} = \dfrac{2 \times 1.0}{0.20} = ${nf.N}$.`,
  scheme: [['Ratio (2λ/a)/(λ/d) = 2d/a', 1], ['= 10', 1]],
  marks: 2, d: 5, c: 'analysis', t: [3, 4],
}), (q) => near(nf.N, 10) && near(q.answer.value, 10) || 'nf');
add('compare-short', short({
  marks: 2,
  stem: 'Give two differences between the interference pattern of Young’s double slit and the diffraction pattern of a single slit.',
  model: 'Any two: interference comes from waves of **two coherent sources**, diffraction from wavelets across **one** slit; interference fringes are **equally wide**, while the central diffraction maximum is **twice as wide** as the others; interference bright fringes are **equally bright**, while diffraction maxima fade rapidly.',
  sol: 'Sources, widths, intensities.',
  scheme: [['First difference', 1], ['Second difference', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('minimum-short3', short({
  marks: 3,
  stem: 'Light falls normally on a single slit of width a. Explain why (a) the centre of the pattern is bright, and (b) there is a dark band in the direction θ where a sin θ = λ.',
  model: '(a) Straight ahead, wavelets from every point of the slit travel **equal distances**, so they all arrive **in phase** and add up to a bright central maximum. (b) In direction θ the edge rays differ in path by $a\\sin\\theta = \\lambda$. Divide the slit into **two halves**: each point in the upper half has a partner $a/2$ below whose path differs by **λ/2**. Each pair cancels, so the whole slit gives **zero** intensity: the first minimum.',
  sol: 'All in phase at θ = 0; pairs cancel at a sin θ = λ.',
  scheme: [['Centre: equal paths, all wavelets in phase', 1], ['Two halves, partners differ by λ/2', 1], ['Pairs cancel ⇒ dark', 1]],
  d: 3, c: 'understanding', t: [4],
}));
add('formula-match', match({
  stem: 'Match each quantity in Column A with its expression in Column B (λ wavelength, d slit separation, a slit width, D screen distance).',
  pairs: [['Fringe width in Young’s experiment', 'λD/d'], ['Angular fringe width in Young’s experiment', 'λ/d'], ['Angular width of the single-slit central maximum', '2λ/a'], ['Linear width of the single-slit central maximum', '2λD/a']],
  order: [3, 1, 0, 2],
  sol: 'Fringe width → λD/d (1 → s); angular fringe width → λ/d (2 → q); angular width of central maximum → 2λ/a (3 → p); its linear width → 2λD/a (4 → r).',
  d: 2, c: 'understanding', t: [3, 4],
}));

// ================================================================ long answers (5 marks)
const rl = { n: 1.5, i: 30, lam: 600 };
rl.r = todeg(Math.asin(Math.sin(deg(rl.i)) / rl.n));
rl.v = C / rl.n;
rl.lam2 = rl.lam / rl.n;
add('refract-long', long({
  stem: '(a) State Huygens’ principle. (b) Using it, derive Snell’s law for a plane wavefront refracted from a rarer into a denser medium, and show that n₂₁ = v₁/v₂. (c) A beam of light of wavelength 600 nm in air enters glass of refractive index 1.5 at an angle of incidence of 30°. Find the angle of refraction, the speed and the wavelength in the glass, and state what happens to the frequency.',
  model: r`(a) Every point on a wavefront is a source of secondary wavelets spreading at the wave speed; the new wavefront at a later time is the forward envelope (common tangent) of these wavelets.

(b) Let plane wavefront AB meet the boundary at A at angle $i$. In time $t$, B travels to C: $BC = v_1 t$. In the same time the wavelet from A spreads into medium 2 to radius $AE = v_2 t$. The tangent CE is the refracted wavefront, at angle $r$. In right triangles ABC and AEC: $\sin i = \dfrac{BC}{AC} = \dfrac{v_1 t}{AC}$ and $\sin r = \dfrac{AE}{AC} = \dfrac{v_2 t}{AC}$. Dividing, $\dfrac{\sin i}{\sin r} = \dfrac{v_1}{v_2}$, a constant: Snell’s law. With $n = c/v$, $\dfrac{v_1}{v_2} = \dfrac{n_2}{n_1} = n_{21}$.

(c) $\sin r = \dfrac{\sin 30°}{1.5} = \dfrac{0.5}{1.5} = 0.333$, so $r = ${dec(rl.r, 3)}°$. $v = \dfrac{c}{n} = \dfrac{3.0 \times 10^{8}}{1.5} = ${sci(rl.v, 2)}$ m s$^{-1}$. $\lambda' = \dfrac{600}{1.5} = ${dec(rl.lam2, 3)}$ nm. The frequency is unchanged ($5.0 \times 10^{14}$ Hz).`,
  sol: 'Huygens; BC = v₁t, AE = v₂t; numbers.',
  scheme: [['Statement of Huygens’ principle', 1], ['Construction with BC = v₁t, AE = v₂t', 1], ['sin i/sin r = v₁/v₂ = n₂₁', 1], ['r = 19.5°, v = 2.0 × 10⁸ m s⁻¹', 1], ['λ′ = 400 nm, f unchanged', 1]],
  d: 3, c: 'application', t: [1], wl: null,
}), () => near(rl.r, 19.47, 0.002) && near(rl.lam2, 400) || `rl ${rl.r}`);
const il = { a1: 1, a2: 1 };
add('interf-long', long({
  stem: '(a) Two coherent waves of the same amplitude a, y₁ = a cos ωt and y₂ = a cos(ωt + φ), superpose at a point. Show that the resultant intensity is I = 4I₀ cos²(φ/2), where I₀ is the intensity of each wave. (b) Write the conditions on path difference for maximum and minimum intensity. (c) Show that the average intensity is 2I₀ and explain what this means for energy. (d) What would be seen if the two sources were incoherent?',
  model: r`(a) $y = a\cos\omega t + a\cos(\omega t + \varphi) = 2a\cos\dfrac{\varphi}{2}\cos\left(\omega t + \dfrac{\varphi}{2}\right)$, an oscillation of amplitude $A = 2a\cos\dfrac{\varphi}{2}$. Intensity $\propto$ amplitude², so $I = 4a^2\cos^2\dfrac{\varphi}{2} \cdot k = 4I_0\cos^2\dfrac{\varphi}{2}$, where $I_0 = ka^2$.

(b) $\varphi = \dfrac{2\pi}{\lambda}\Delta$. Maximum ($4I_0$) when $\Delta = n\lambda$; minimum (zero) when $\Delta = (n + \tfrac{1}{2})\lambda$, $n = 0, 1, 2, \dots$

(c) The average of $\cos^2$ over a cycle of $\varphi$ is $\tfrac{1}{2}$, so $\bar I = 4I_0 \times \tfrac{1}{2} = 2I_0$: the same as two separate waves. Energy is not created or destroyed; it is **redistributed** from dark to bright fringes.

(d) The phase difference would change randomly; $\cos^2(\varphi/2)$ averages to $\tfrac{1}{2}$ at every point, so the screen would be **uniformly lit** at $2I_0$ with no fringes.`,
  sol: 'Add with the sum formula; I ∝ A²; average cos² = ½.',
  scheme: [['Resultant amplitude 2a cos(φ/2)', 1], ['I = 4I₀cos²(φ/2)', 1], ['Conditions nλ and (n + ½)λ', 1], ['Average 2I₀: energy redistributed', 1], ['Incoherent: uniform 2I₀, no fringes', 1]],
  d: 3, c: 'understanding', t: [2], wl: null,
}), () => il.a1 === il.a2 || 'il');
const yl = { lam: 640e-9, d: 0.32e-3, D: 1.6 };
yl.beta = (yl.lam * yl.D) / yl.d;
yl.yb3 = 3 * yl.beta;
yl.yd3 = 2.5 * yl.beta;
yl.lamB = 480e-9;
yl.betaB = (yl.lamB * yl.D) / yl.d;
add('ydse-long', long({
  stem: '(a) Describe Young’s double-slit experiment with a labelled diagram (described in words), and explain why the two slits act as coherent sources. (b) Given that the path difference at a point a distance y from the centre of the screen is yd/D, write the positions of the bright and dark fringes and show that they are equally spaced. (c) With λ = 640 nm, d = 0.32 mm and D = 1.6 m, find the fringe width and the positions of the third bright and the third dark fringes. (d) Find the new fringe width if light of 480 nm is used instead.',
  model: r`(a) Monochromatic light passes through a narrow slit S and then falls on two narrow parallel slits S₁ and S₂, a distance $d$ apart, equidistant from S; a screen is placed a distance $D \gg d$ beyond them. S₁ and S₂ lie on the same wavefront from S, so any phase change at S reaches both together: their phase difference is constant and they are **coherent**. Alternate bright and dark fringes appear on the screen.

(b) Bright: $\dfrac{yd}{D} = n\lambda \Rightarrow y_n = \dfrac{n\lambda D}{d}$. Dark: $\dfrac{yd}{D} = \left(n + \tfrac{1}{2}\right)\lambda \Rightarrow y'_n = \left(n + \tfrac{1}{2}\right)\dfrac{\lambda D}{d}$. Neighbouring bright (or dark) fringes differ by $\beta = \dfrac{\lambda D}{d}$, independent of $n$: equally spaced.

(c) $\beta = \dfrac{640 \times 10^{-9} \times 1.6}{0.32 \times 10^{-3}} = ${sci(yl.beta, 2)}$ m (3.2 mm). Third bright: $3\beta = ${dec(yl.yb3 * 1e3, 3)}$ mm. Third dark: $2.5\beta = ${dec(yl.yd3 * 1e3, 2)}$ mm.

(d) $\beta' = \dfrac{480 \times 10^{-9} \times 1.6}{0.32 \times 10^{-3}} = ${sci(yl.betaB, 2)}$ m (2.4 mm).`,
  sol: 'Set-up and coherence; positions from yd/D; β = λD/d.',
  scheme: [['Set-up and why S₁, S₂ are coherent', 1], ['Bright and dark positions', 1], ['Equal spacing β = λD/d', 1], ['β = 3.2 mm; 9.6 mm and 8.0 mm', 1], ['β′ = 2.4 mm', 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => near(yl.beta, 3.2e-3) && near(yl.yb3, 9.6e-3) && near(yl.yd3, 8e-3) && near(yl.betaB, 2.4e-3) || 'yl');
const sl5 = { lam: 600e-9, a: 0.3e-3, D: 1.5 };
sl5.th = sl5.lam / sl5.a;
sl5.w = 2 * sl5.th * sl5.D;
sl5.wNarrow = (2 * sl5.lam * sl5.D) / (sl5.a / 2);
add('single-long', long({
  stem: '(a) Describe, with a sketch of intensity against angle (described in words), the diffraction pattern produced by a single slit illuminated by monochromatic light. (b) Explain the condition for the first minimum. (c) Show that the angular width of the central maximum is 2λ/a. (d) For λ = 600 nm and a = 0.30 mm, find the width of the central maximum on a screen 1.5 m away, and its width if the slit is narrowed to 0.15 mm.',
  model: r`(a) A broad, bright **central maximum** straight ahead, with dark minima on either side and much fainter, narrower **secondary maxima** beyond, fading quickly; the graph of intensity against angle has a tall central peak with small side peaks.

(b) At angle $\theta$ the edge rays differ in path by $a\sin\theta$. When $a\sin\theta = \lambda$, split the slit into two halves: each point of one half has a partner in the other with path difference $\lambda/2$, so the wavelets cancel in pairs and the intensity is zero.

(c) The first minima are at $\sin\theta \approx \theta = \pm\dfrac{\lambda}{a}$, so the central maximum spans an angle $\dfrac{2\lambda}{a}$.

(d) $\theta_1 = \dfrac{600 \times 10^{-9}}{0.30 \times 10^{-3}} = ${sci(sl5.th, 2)}$ rad, width $= 2D\theta_1 = 2 \times 1.5 \times ${sci(sl5.th, 2)} = ${sci(sl5.w, 2)}$ m (6.0 mm). Halving the slit doubles the width: $\dfrac{2 \times 600 \times 10^{-9} \times 1.5}{0.15 \times 10^{-3}} = ${sci(sl5.wNarrow, 2)}$ m (12 mm).`,
  sol: 'Pattern, two-halves argument, 2λ/a, numbers.',
  scheme: [['Description and intensity sketch', 1], ['First-minimum argument', 1], ['Angular width 2λ/a', 1], ['Width 6.0 mm', 1], ['12 mm for the narrower slit', 1]],
  d: 3, c: 'application', t: [4], wl: null,
}), () => near(sl5.w, 6e-3) && near(sl5.wNarrow, 1.2e-2) || 'sl5');
const ml = { lam: 550e-9, D: 1.0, d: 0.5e-3, span: 0 };
ml.beta = (ml.lam * ml.D) / ml.d;
ml.span = 8 * ml.beta;
add('measure-long', long({
  stem: 'A student uses a double-slit arrangement to measure the wavelength of light from a green LED with a filter. (a) Explain why she measures across several fringes rather than one. (b) With d = 0.50 mm and D = 1.0 m she finds that nine consecutive bright fringes span 8.8 mm. Find the wavelength. (c) Predict the change in the pattern if (i) the slits are moved 0.25 mm closer together (to d = 0.25 mm), (ii) a white-light source is used. (d) Explain why the fringes become less sharp if the source slit S is made much wider.',
  model: r`(a) One fringe width is only about a millimetre; measuring across many and dividing reduces the percentage error.

(b) Nine bright fringes enclose **eight** fringe widths: $\beta = \dfrac{8.8}{8} = 1.1$ mm. $\lambda = \dfrac{\beta d}{D} = \dfrac{1.1 \times 10^{-3} \times 0.50 \times 10^{-3}}{1.0} = 5.5 \times 10^{-7}$ m (550 nm).

(c) (i) $\beta \propto 1/d$: halving $d$ doubles $\beta$ to 2.2 mm. (ii) The central fringe is white, the next few are coloured (blue edges nearer the centre, red outer), and the fringes soon merge into uniform white light.

(d) A wide slit acts like many narrow sources side by side, each producing its own fringe pattern slightly shifted; the patterns overlap, bright on dark, and the contrast falls.`,
  sol: 'Eight intervals; λ = βd/D; β ∝ 1/d; wide source washes out fringes.',
  scheme: [['Several fringes reduce error', 1], ['Eight fringe widths, β = 1.1 mm', 1], ['λ = 550 nm', 1], ['(i) β doubles (ii) white centre, coloured fringes', 1], ['Wide source: overlapping shifted patterns', 1]],
  d: 4, c: 'analysis', t: [3], wl: null,
}), () => near(ml.span, 8.8e-3) || 'ml');

// ================================================================ case-based (4 marks: 1 + 1 + 2)
const lc = { lam: 532e-9, d: 0.25e-3, D: 2.0 };
lc.beta = (lc.lam * lc.D) / lc.d;
lc.betaR = (650e-9 * lc.D) / lc.d;
add('lab-case', mk.case({
  passage: 'In a physics laboratory in Bhopal, students shine a green laser pointer (wavelength 532 nm) through two fine slits 0.25 mm apart, scratched on a blackened glass slide. On a wall 2.0 m away they see a row of equally spaced bright spots with dark gaps between them. One student later repeats the experiment with a red laser pointer of wavelength 650 nm.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'What happens to the row of bright spots if one slit is covered with tape?',
      right: 'The equally spaced spots disappear, leaving only a broad patch of light',
      wrong: ['The spots remain but become half as bright', 'The spots move closer together', 'The spots move apart to twice their spacing'],
      sol: 'Interference needs two coherent sources; with one slit only its broad diffraction patch remains — option (@K).',
      d: 2, c: 'understanding', t: [3],
    })),
    part('b', num({
      stem: 'Find the fringe width with the green laser, in mm (3 significant figures).',
      value: Number(dec(lc.beta * 1e3, 3)), tol: 0.03, unit: 'mm',
      sol: r`$\beta = \dfrac{\lambda D}{d} = \dfrac{532 \times 10^{-9} \times 2.0}{0.25 \times 10^{-3}} \approx ${sci(lc.beta, 3)}$ m, i.e. $${sci(lc.beta, 3)} \times 10^{3} = ${dec(lc.beta * 1e3, 3)}$ mm.`,
      scheme: [['β ≈ 4.26 mm', 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Find the fringe width with the red laser and explain why it differs from that with the green laser.',
      model: r`$\beta = \dfrac{650 \times 10^{-9} \times 2.0}{0.25 \times 10^{-3}} = ${sci(lc.betaR, 2)}$ m (5.2 mm). It is wider because $\beta \propto \lambda$ and red light has a longer wavelength than green.`,
      sol: 'β ∝ λ.',
      scheme: [['β = 5.2 mm', 1], ['Reason: β ∝ λ, red longer', 1]],
      d: 2, c: 'application', t: [3], wl: null,
    }), [
      short({
        marks: 2,
        stem: 'Another student suggests using two separate green laser pointers, one behind each slit, to get brighter spots. Evaluate this suggestion.',
        model: 'It would **not work** well. Two separate lasers are independent sources: their phases are not locked together, so the phase difference between them drifts randomly and the fringe pattern shifts too fast to be seen; the wall would show a fairly **uniform** patch. A single laser lighting both slits gives **coherent** sources.',
        sol: 'Independent lasers are not mutually coherent.',
        scheme: [['Separate lasers not coherent (random phase difference)', 1], ['Fringes wash out; use one source', 1]],
        d: 3, c: 'evaluation', t: [2, 3],
      }),
    ]),
  ],
}), (q) => near(lc.beta, 4.256e-3, 0.002) && near(q.children[1].answer.value, 4.26) && near(lc.betaR, 5.2e-3) || 'lc');

const gc = { lam: 650e-9, D: 3.0, a: 0.15e-3 };
gc.w = (2 * gc.lam * gc.D) / gc.a;
add('slit-case', mk.case({
  passage: 'A student in Kochi points a red laser (wavelength 650 nm) at an adjustable slit made from two razor blades and watches the pattern on a wall 3.0 m away. As she slowly closes the gap between the blades, the bright band on the wall, instead of shrinking, spreads out sideways, with fainter bands on either side.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The spreading of the light beyond the edges of the narrow slit is called',
      right: 'diffraction',
      wrong: ['refraction', 'dispersion', 'total internal reflection'],
      sol: 'Bending of light round the edges of an opening comparable to its wavelength is diffraction — option (@K).',
      d: 1, c: 'recall', t: [4],
    })),
    part('b', num({
      stem: 'Find the width of the central bright band, in mm, when the slit is 0.15 mm wide.',
      value: gc.w * 1e3, tol: 0.2, unit: 'mm',
      sol: r`$w = \dfrac{2\lambda D}{a} = \dfrac{2 \times 650 \times 10^{-9} \times 3.0}{0.15 \times 10^{-3}} = ${sci(gc.w, 2)}$ m, i.e. $${sci(gc.w, 2)} \times 10^{3} = ${dec(gc.w * 1e3, 2)}$ mm.`,
      scheme: [['w = 2λD/a = 26 mm', 1]],
      d: 2, c: 'application', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why the central band spreads out as the slit is made narrower.',
      model: 'The first minima lie where $a\\sin\\theta = \\lambda$, so $\\theta \\approx \\lambda/a$. A **smaller** $a$ means a **larger** angle before the wavelets from the two halves of the slit cancel, so the central band, of angular width $2\\lambda/a$, becomes **wider**.',
      sol: 'θ₁ = λ/a.',
      scheme: [['First minimum at θ ≈ λ/a', 1], ['Smaller a ⇒ larger angle ⇒ wider band', 1]],
      d: 3, c: 'analysis', t: [4],
    }), [
      short({
        marks: 2,
        stem: 'Her friend claims that with a violet laser (405 nm) and the same slit, the central band would be wider than with the red laser. Evaluate the claim.',
        model: 'The claim is **wrong**. The width $2\\lambda D/a$ is **proportional to the wavelength**. Violet light (405 nm) has a shorter wavelength than red (650 nm), so the band would be **narrower**, about $405/650 \\approx 0.62$ of the red width, roughly 16 mm.',
        sol: 'Width ∝ λ.',
        scheme: [['Width ∝ λ', 1], ['Violet band narrower (≈ 16 mm): claim wrong', 1]],
        d: 3, c: 'evaluation', t: [4],
      }),
    ]),
  ],
}), (q) => near(gc.w, 0.026) && near(q.children[1].answer.value, 26) || 'gc');

const rt = { v1: 24, v2: 16, i: 50 };
rt.r = todeg(Math.asin((rt.v2 / rt.v1) * Math.sin(deg(rt.i))));
add('ripple-case', mk.case({
  passage: 'In a ripple tank at a science centre in Jaipur, a straight vibrating bar sends plane water waves of frequency 8.0 Hz across the tank. A glass plate under part of the tank makes the water shallower there, and the waves slow from 24 cm s⁻¹ to 16 cm s⁻¹. Where the wavefronts cross the edge of the plate obliquely, they change direction.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which property of the water waves stays the same as they pass into the shallow region?',
      right: 'Their frequency',
      wrong: ['Their wavelength', 'Their speed', 'The direction of the wavefronts'],
      sol: 'The vibrating bar fixes the frequency; speed and wavelength both fall — option (@K).',
      d: 1, c: 'understanding', t: [1],
    })),
    part('b', num({
      stem: 'The wavefronts meet the edge of the plate at an angle of incidence of 50°. Find the angle of refraction, in degrees (1 decimal place).',
      value: Number(rt.r.toFixed(1)), tol: 0.3, unit: '°',
      sol: r`$\sin r = \dfrac{v_2}{v_1}\sin i = \dfrac{16}{24} \times \sin 50° = ${dec((16 / 24) * Math.sin(deg(50)), 3)}$, so $r = \sin^{-1}(${dec((16 / 24) * Math.sin(deg(50)), 3)}) = ${dec(rt.r, 3)}$°.`,
      scheme: [['sin r = (v₂/v₁) sin i; r ≈ 30.7°', 1]],
      d: 3, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'Using Huygens’ principle, explain why the wavefronts bend towards the normal and are closer together in the shallow region.',
      model: 'The end of a wavefront that reaches the shallow water first sends out wavelets that spread **more slowly** (16 cm s⁻¹), while the rest still moves at 24 cm s⁻¹. The tangent to the wavelets therefore **swings round**, so the rays bend **towards the normal**. With the same frequency and lower speed, the wavelength $\\lambda = v/f$ falls from 3.0 cm to 2.0 cm, so the wavefronts are **closer**.',
      sol: 'Slower wavelets; λ = v/f.',
      scheme: [['Slower wavelets turn the wavefront towards the normal', 1], ['Same f, smaller v ⇒ shorter λ (3.0 → 2.0 cm)', 1]],
      d: 3, c: 'application', t: [1], wl: null,
    }), [
      short({
        marks: 2,
        stem: 'A visitor says that the waves bend because the glass plate “attracts” them. Evaluate this explanation using Huygens’ principle.',
        model: 'The explanation is **not correct**. Nothing pulls the waves sideways. The bending happens because the **speed changes**: wavelets from the part of the wavefront in shallow water spread less in the same time, so the envelope (new wavefront) **turns**. Huygens’ construction predicts the exact angle from $\\sin i/\\sin r = v_1/v_2$.',
        sol: 'Speed change, not attraction.',
        scheme: [['No attraction: speed change causes bending', 1], ['Huygens: smaller wavelets turn the wavefront', 1]],
        d: 3, c: 'evaluation', t: [1],
      }),
    ]),
  ],
}), (q) => near(rt.r, 30.7, 0.002) && near(q.children[1].answer.value, 30.7) || `rt ${rt.r}`);
