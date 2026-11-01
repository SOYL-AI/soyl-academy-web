// ISC 12 Physics ch17 Wave Optics: Interference and Diffraction — two decks: Part 1 (t01–t03) wavefronts, Huygens'
// principle, Huygens' proofs of reflection and refraction, superposition, path and phase difference, coherence; Part 2
// (t04–t07) Young's double slit, fringe width, intensity distribution, single-slit diffraction and the width of the central
// maximum. Numbers computed here; plots computed point by point.
import { sl, deck, table, svgV, plot, r, dec, sci } from '../../isc-12-physics-ch01/src/lib.mjs';
import * as G from './svgs.mjs';

const { refrAngle, fringeWidth, sinc2, C_LIGHT } = G;

// ---------------------------------------------------------------- worked-example numbers
const ex1 = { lam0: 540e-9, v: 2.4e8, i: 50 };
ex1.n = C_LIGHT / ex1.v;
ex1.r = refrAngle(ex1.i, C_LIGHT, ex1.v);
ex1.lamM = ex1.lam0 / ex1.n;
ex1.f = C_LIGHT / ex1.lam0;
const ex2 = { lam: 640e-9, p1: 2.24e-6, p2: 1.92e-6 };
ex2.k1 = ex2.p1 / ex2.lam;
ex2.k2 = ex2.p2 / ex2.lam;
const ex3 = { a1: 5, a2: 3, I0: 2.0 };
ex3.ratio = (ex3.a1 + ex3.a2) ** 2 / (ex3.a1 - ex3.a2) ** 2;
ex3.Iratio = ex3.a1 ** 2 / ex3.a2 ** 2;
ex3.bright = 4 * ex3.I0;
ex3.avg = 2 * ex3.I0;
const ex4 = { ...G.YDSE_DATA };
ex4.beta = fringeWidth(ex4.lam, ex4.D, ex4.d);
ex4.y4 = 4 * ex4.beta;
ex4.dark3 = 2.5 * ex4.beta;
ex4.ang = ex4.lam / ex4.d;
const ex5 = { beta: 1.8e-3, D1: 1.5, D2: 1.0, n: 1.2, d: 0.4e-3 };
ex5.lam = (ex5.beta * ex5.d) / ex5.D1;
ex5.beta2 = fringeWidth(ex5.lam, ex5.D2, ex5.d, ex5.n);
const ex6 = { ...G.STRIPS_DATA.ss };
ex6.th1 = ex6.lam / ex6.a;
ex6.y1 = ex6.D * ex6.th1;
ex6.W = 2 * ex6.y1;
ex6.y2 = 2 * ex6.y1;
ex6.ysec = 1.5 * ex6.y1;
export const EX = { ex1, ex2, ex3, ex4, ex5, ex6 };
for (const [ok, msg] of [
  [Math.abs(ex1.n - 1.25) < 1e-12 && Math.abs(ex1.r - 37.79) < 0.01 && Math.abs(ex1.lamM - 432e-9) < 1e-15, 'ex1'],
  [Math.abs(ex2.k1 - 3.5) < 1e-9 && Math.abs(ex2.k2 - 3) < 1e-9, 'ex2'],
  [ex3.ratio === 16 && ex3.bright === 8 && ex3.avg === 4, 'ex3'],
  [Math.abs(ex4.beta - 2e-3) < 1e-12 && Math.abs(ex4.ang - 1.6e-3) < 1e-12, 'ex4'],
  [Math.abs(ex5.lam - 480e-9) < 1e-15 && Math.abs(ex5.beta2 - 1e-3) < 1e-12, 'ex5'],
  [Math.abs(ex6.th1 - 3.5e-3) < 1e-12 && Math.abs(ex6.W - 11.2e-3) < 1e-12 && Math.abs(ex6.ysec - 8.4e-3) < 1e-12, 'ex6'],
])
  if (!ok) throw new Error(`deck number check failed: ${msg}`);

export const V = {
  wavefronts: svgV(G.WAVEFRONTS, 'Spherical, cylindrical and plane wavefronts'),
  huynew: svgV(G.HUYGENS_NEW, 'Huygens’ construction of a new wavefront'),
  reflect: svgV(G.HUYGENS_REFLECT, 'Huygens’ proof of the law of reflection'),
  refract: svgV(G.HUYGENS_REFRACT, 'Huygens’ proof of the law of refraction (worked example 1)'),
  out: svgV(G.HUYGENS_OUT, 'Huygens’ construction for light leaving glass'),
  superpose: svgV(G.SUPERPOSE, 'Superposition of two waves in phase and in antiphase'),
  ydse: svgV(G.YDSE, 'Geometry of Young’s double slit: path difference d sin θ'),
  patterns: svgV(G.PATTERNS, 'Computed double-slit and single-slit patterns', 'Worked examples 4 and 6 drawn to the same scale.'),
  slit: svgV(G.SLIT, 'Single slit: the path difference across the slit'),
  central: svgV(G.CENTRAL, 'Angular and linear width of the central maximum'),
};

// ---------------------------------------------------------------- computed plots
const r4 = (x) => Number(x.toFixed(4));
const fringePts = [];
const unequalPts = [];
for (let k = -250; k <= 250; k++) {
  const y = k / 50; // mm
  const phi = (2 * Math.PI * y) / (ex4.beta * 1e3);
  fringePts.push([y, r4(G.twoBeam(1, 1, phi))]);
  unequalPts.push([y, r4(G.twoBeam(1, 0.25, phi))]);
}
export const FRINGE_CHECK = fringePts.find((p) => p[0] === 0)[1] === 4 && fringePts.find((p) => p[0] === 1)[1] === 0 && unequalPts.find((p) => p[0] === 0)[1] === 2.25 && unequalPts.find((p) => p[0] === 1)[1] === 0.25;
export const fringePlot = plot(
  {
    x: { min: -5, max: 5, label: 'distance y from the centre of the screen (mm)' },
    y: { min: 0, max: 4.4, label: 'intensity I / I₀' },
    series: [
      { label: 'equal slits, each I₀ (computed)', kind: 'line', points: fringePts },
      { label: 'slits giving I₀ and I₀/4 (computed)', kind: 'line', points: unequalPts },
    ],
    hlines: [{ y: 2, label: 'average with equal slits: 2I₀', dashed: true }],
  },
  'Graph of intensity across the double-slit pattern of worked example 4, fringe width 2 millimetres: with equal slits the intensity swings between four times and zero times the intensity from one slit, averaging twice; with one slit giving a quarter of the light, the maxima fall to 2.25 and the minima rise to 0.25, so the dark fringes are no longer dark',
  'I = I₁ + I₂ + 2√(I₁I₂) cos φ, with φ = 2πy/β.',
);
const ssPts = [];
for (let k = -240; k <= 240; k++) {
  const th = k / 20; // mrad
  ssPts.push([th, r4(sinc2((Math.PI * ex6.a * Math.sin(th / 1e3)) / ex6.lam))]);
}
export const SS_CHECK = ssPts.find((p) => p[0] === 0)[1] === 1 && [-7, -3.5, 3.5, 7].every((t) => ssPts.find((p) => Math.abs(p[0] - t) < 1e-9)[1] < 1e-3);
export const ssPlot = plot(
  {
    x: { min: -12, max: 12, label: 'angle θ from the straight-through direction (mrad)' },
    y: { min: 0, max: 1.1, label: 'intensity I / I(centre)' },
    series: [{ label: 'slit 0.18 mm, λ = 630 nm (computed)', kind: 'line', points: ssPts }],
    vlines: [{ x: -3.5, dashed: true }, { x: 3.5, label: 'first minima ±3.5 mrad', dashed: true }, { x: -7, dashed: true }, { x: 7, label: 'second minima', dashed: true }],
  },
  'Graph of intensity against angle for the single slit of worked example 6: a tall central maximum between the first minima at plus and minus 3.5 milliradians, then secondary maxima less than a twentieth as bright, each half as wide, with the second minima at plus and minus 7 milliradians',
  'Minima where a sin θ = nλ; the central maximum is twice as wide as the others and far brighter.',
);
const envA = 0.07e-3;
const envPts = [];
const envOnly = [];
for (let k = -200; k <= 200; k++) {
  const th = k / 20; // mrad
  const s = Math.sin(th / 1e3);
  const env = sinc2((Math.PI * envA * s) / ex4.lam);
  envOnly.push([th, r4(env)]);
  envPts.push([th, r4(env * G.doubleSlit(ex4.d, ex4.lam, s))]);
}
export const ENV_CHECK = Math.abs(ex4.lam / envA - 8e-3) < 1e-12 && envPts.find((p) => p[0] === 8)[1] < 1e-3;
export const envPlot = plot(
  {
    x: { min: -10, max: 10, label: 'angle θ (mrad)' },
    y: { min: 0, max: 1.1, label: 'relative intensity' },
    series: [
      { label: 'two slits 0.35 mm apart, each 0.07 mm wide (computed)', kind: 'line', points: envPts },
      { label: 'single-slit envelope of one slit', kind: 'line', points: envOnly },
    ],
  },
  'Graph of the intensity from two real slits, each 0.07 millimetres wide and 0.35 millimetres apart, with light of 560 nanometres: equally spaced interference fringes 1.6 milliradians apart whose brightness follows the single-slit diffraction envelope, which falls to zero at plus and minus 8 milliradians',
  'Real double-slit fringes: interference fringes (spacing λ/d) inside a diffraction envelope (first zeros at ±λ/a).',
);

// ---------------------------------------------------------------- tables
const wfTable = table(
  ['Source', 'Wavefront', 'Amplitude at distance r', 'Intensity'],
  [
    ['Point (small lamp, LED)', 'Spheres', '$A \\propto 1/r$', '$I \\propto 1/r^2$'],
    ['Line (long tube light, slit)', 'Coaxial cylinders', '$A \\propto 1/\\sqrt{r}$', '$I \\propto 1/r$'],
    ['Very distant (the Sun, a star)', 'Planes', 'constant', 'constant'],
  ],
  'Table of the three kinds of wavefront: a point source gives spheres with intensity falling as one over r squared, a line source gives cylinders with intensity falling as one over r, a distant source gives planes of constant intensity',
);
const mediumTable = table(
  ['Quantity', 'Air → medium of index n'],
  [
    ['Frequency $f$', 'unchanged (set by the source)'],
    ['Speed', '$v = c/n$'],
    ['Wavelength', '$\\lambda_m = \\lambda/n$'],
    ['Ray direction', '$\\sin i/\\sin r = v_1/v_2 = n$'],
  ],
  'Table of what happens to light entering a medium of refractive index n: frequency unchanged, speed and wavelength divided by n, direction given by Snell’s law',
);
const condTable = table(
  ['At the point', 'Path difference Δ', 'Phase difference φ', 'Result'],
  [
    ['Constructive', '$n\\lambda$ ($n = 0, 1, 2, \\dots$)', '$2n\\pi$', 'bright: amplitude $a_1 + a_2$'],
    ['Destructive', '$(2n - 1)\\dfrac{\\lambda}{2}$ ($n = 1, 2, \\dots$)', '$(2n - 1)\\pi$', 'dark: amplitude $|a_1 - a_2|$'],
  ],
  'Table of conditions for constructive interference, path difference a whole number of wavelengths, and destructive interference, an odd number of half wavelengths, with the corresponding phase differences',
);
const cohTable = table(
  ['Needed for a sustained pattern', 'Why'],
  [
    ['Coherent sources (one source split in two)', 'constant phase difference'],
    ['Same frequency (monochromatic light)', 'pattern does not drift or blur'],
    ['Nearly equal amplitudes', 'dark fringes really dark (good contrast)'],
    ['Narrow source slit; slits close together', 'fringes sharp and wide enough to see'],
  ],
  'Table of the conditions for a sustained, clear interference pattern: coherent sources, a single frequency, nearly equal amplitudes, and a narrow source slit with closely spaced slits',
);
const effectTable = table(
  ['Change (others fixed)', 'Fringe width β = λD/d'],
  [
    ['Longer wavelength (red instead of blue)', 'wider'],
    ['Screen moved farther away (D up)', 'wider; angular width unchanged'],
    ['Slits closer together (d down)', 'wider'],
    ['Apparatus in a liquid of index n', 'narrower: $\\beta/n$'],
    ['White light', 'central fringe white, then coloured fringes'],
  ],
  'Table of how the fringe width changes: wider for a longer wavelength, a more distant screen or closer slits; narrower by the factor n in a liquid; with white light the central fringe is white and the others coloured',
);
export const compareTable = table(
  ['Double-slit interference', 'Single-slit diffraction'],
  [
    ['Waves from two coherent slits', 'Wavelets from every point of one slit'],
    ['Fringes equally wide ($\\lambda D/d$)', 'Central band twice as wide as the others'],
    ['Bright fringes (nearly) equally bright', 'Brightness falls off sharply away from the centre'],
    ['Dark fringes at $d\\sin\\theta = (n - \\tfrac{1}{2})\\lambda$', 'Dark bands at $a\\sin\\theta = n\\lambda$'],
  ],
  'Table comparing double-slit interference with single-slit diffraction: two sources against many, equal fringe widths against a double-width central band, equal brightness against rapidly fading bands, and the conditions for dark fringes',
);

export const deck1 = deck({
  part: 1,
  title: 'Wave Optics — Part 1: Wavefronts, Huygens’ principle and coherent sources',
  goals: [
    'Describe spherical, cylindrical and plane wavefronts and use Huygens’ principle to construct a new wavefront',
    'Prove the laws of reflection and refraction with Huygens’ construction, and relate speed, wavelength and frequency in a medium',
    'Relate path difference to phase difference and state the conditions for sustained interference',
  ],
  slides: [
    sl('title', 'Wave Optics: Interference and Diffraction', {
      b: 'Part 1 — light as a wave: wavefronts, Huygens’ principle, and what it takes for two light waves to interfere.',
      v: V.wavefronts,
      n: 'Ray optics treats light as straight lines, and it works well for mirrors and lenses. But light is a wave, and some effects need the wave picture: the coloured bands in a soap film, the bright and dark fringes behind two narrow slits, the spreading of light through a tiny gap. In this part we describe light by its wavefronts, learn Huygens’ way of moving a wavefront forward, and find what two light waves need in order to interfere.',
    }),
    sl('concept', 'Wavefronts and rays', {
      b: 'A **wavefront** is a surface on which every point vibrates **in the same phase**. Successive wavefronts one wavelength apart move outward at the wave speed.',
      ul: ['A **ray** is a line along which energy travels; in a uniform medium it is always **perpendicular** to the wavefronts.', 'The shape of the wavefront depends on the source and the distance from it.'],
      v: V.wavefronts,
      n: 'Imagine all the points that a wave disturbance reaches at the same instant, all vibrating in step. That surface is a wavefront. As time passes, the wavefront moves outward at the speed of the wave. The rays of ray optics are simply lines drawn at right angles to the wavefronts, showing the direction in which the energy travels.',
    }),
    sl('diagram', 'Three kinds of wavefront', {
      b: 'The same light energy spreads over a larger and larger wavefront, so the intensity falls with distance in a way set by the wavefront’s shape.',
      ul: ['Point source: area $4\\pi r^2$, so $I \\propto 1/r^2$.', 'Line source: area $2\\pi r L$, so $I \\propto 1/r$.', 'Plane wavefront: area fixed, intensity constant (no spreading).'],
      v: wfTable,
      n: 'A small lamp sends out spherical wavefronts. The energy is shared over a sphere whose area grows as r squared, so the intensity falls as one over r squared and the amplitude as one over r. A long tube light gives cylinders, whose area grows only as r, so the intensity falls as one over r. Very far from any source a small piece of wavefront is flat: a plane wavefront, with constant intensity.',
    }),
    sl('diagram', 'Huygens’ principle', {
      b: '**Huygens’ principle:** (1) every point on a wavefront acts as a source of **secondary wavelets**, which spread out in the forward direction at the speed of the wave; (2) after a time $t$, the new wavefront is the **forward envelope** (common tangent) of all the wavelets of radius $vt$.',
      ul: ['A spherical wavefront grows into a larger sphere; a plane wavefront moves forward unchanged, a distance $vt$.', 'The backward wavelets are ignored: no wave is observed travelling back towards the source.'],
      v: V.huynew,
      n: 'Huygens gave a simple rule for finding where a wavefront will be a moment later. Treat every point of the wavefront as a tiny source sending out wavelets at the wave speed. After a time t each wavelet has a radius v t. Draw the surface that touches all of them on the forward side: that is the new wavefront. A sphere grows into a bigger sphere, and a plane moves forward as a plane.',
    }),
    sl('check', 'Quick check: building a wavefront', {
      b: 'Choose the correct option.',
      v: V.huynew,
      chk: 'envelope-mcq',
      n: 'What is the radius of each wavelet after the given time, and which surface is the new wavefront?',
    }),
    sl('diagram', 'Huygens’ proof of the law of reflection', {
      b: r`A plane wavefront AB meets a mirror at A. While its edge B travels to C, the wavelet from A spreads an equal distance: $AE = BC = vt$. The reflected wavefront CE is the **tangent from C** to this wavelet.`,
      ul: ['Triangles ABC and CEA: right angles at B and E, common hypotenuse AC, and $BC = AE$, so they are **congruent**.', r`Hence $\angle BAC = \angle ECA$: the wavefronts, and so the rays, make equal angles: $i = r$. The incident ray, reflected ray and normal lie in one plane.`],
      v: V.reflect,
      n: 'Let a plane wavefront reach a mirror at A. While its far edge B travels on to the mirror at C, the wavelet from A spreads out by exactly the same distance, because the speed does not change. The reflected wavefront is the tangent from C to that wavelet. The two right-angled triangles share the side A C and have equal sides B C and A E, so they are congruent, and the angle of reflection equals the angle of incidence.',
    }),
    sl('diagram', 'Huygens’ proof of the law of refraction', {
      b: r`Now the wavefront meets a medium where light is slower, $v_2 < v_1$. In the time $t$ that B takes to reach C, $BC = v_1 t$, the wavelet from A grows only to $AE = v_2 t$. The refracted wavefront EC is the tangent from C:
$$\sin i = \dfrac{BC}{AC},\quad \sin r = \dfrac{AE}{AC} \;\Rightarrow\; \dfrac{\sin i}{\sin r} = \dfrac{v_1}{v_2} = \dfrac{n_2}{n_1}$$`,
      ul: ['The ratio is a constant for the two media: **Snell’s law**, with $n = c/v$.', 'Slower medium: smaller wavelet, the wavefront swings round and the ray bends **towards** the normal.'],
      v: V.refract,
      n: 'Refraction works the same way, except that the wavelet from A now spreads into the slower medium. While B covers B C at speed v one, the wavelet from A grows only to v two times t. The new wavefront is again the tangent from C. From the two right-angled triangles, sine i is B C over A C and sine r is A E over A C, so sine i over sine r equals v one over v two, a constant: Snell’s law.',
    }),
    sl('concept', 'Speed, wavelength and frequency in a medium', {
      b: r`Each wavelet at the boundary is started by the incident wave, so the light keeps the **frequency** of its source. With $v = f\lambda$ and $v = c/n$:
$$\lambda_m = \dfrac{\lambda}{n}$$`,
      ul: ['Colour is decided by frequency, so light does not change colour when it enters water or glass.', 'In a denser medium the wavefronts crowd closer together, as the refraction figure shows.'],
      v: mediumTable,
      n: 'What changes when light enters glass? The frequency cannot change, because the vibrations at the boundary are driven by the incoming wave, crest for crest. The speed drops to c over n, so the wavelength, which is speed over frequency, also drops by the factor n. That is why the wavefronts in the slower medium are packed closer together.',
    }),
    sl('example', 'Worked example 1: light entering a liquid', {
      b: 'Light of wavelength 540 nm in air travels at $2.4 \\times 10^{8}$ m s⁻¹ in a transparent liquid. It meets the flat liquid surface at an angle of incidence of 50°. Find the refractive index, the angle of refraction, and the wavelength and frequency in the liquid.',
      ul: [
        r`Step 1 — $n = \dfrac{c}{v} = \dfrac{3.0 \times 10^{8}}{2.4 \times 10^{8}} = ${dec(ex1.n, 3)}$.`,
        r`Step 2 — $\sin r = \dfrac{\sin 50°}{1.25} = ${dec(Math.sin((50 * Math.PI) / 180) / 1.25, 3)}$, so $r = ${dec(ex1.r, 3)}°$ (towards the normal).`,
        r`Step 3 — $\lambda_m = \dfrac{540}{1.25} = ${dec(ex1.lamM * 1e9, 3)}$ nm; $f = \dfrac{c}{\lambda} = ${sci(ex1.f, 3)}$ Hz in air and in the liquid.`,
      ],
      v: V.refract,
      n: 'The refractive index is the ratio of the speeds, three over two point four, one point two five. Snell’s law gives sine r as sine fifty divided by one point two five, so r is about thirty eight degrees: the light bends towards the normal. The wavelength shrinks by the same factor, to four hundred and thirty two nanometres, while the frequency stays at about five point five six times ten to the fourteen hertz.',
    }),
    sl('check', 'Quick check: inside a gemstone', {
      b: 'Choose the correct option.',
      v: mediumTable,
      chk: 'diamond-mcq',
      n: 'Which two quantities are divided by the refractive index, and which one stays the same?',
    }),
    sl('diagram', 'From a denser to a rarer medium', {
      b: r`For light going from glass ($n = 1.5$) into air, the wavelet in air is **longer** than BC: $AE = 1.5\,BC$. The refracted wavefront turns the other way and the ray bends **away** from the normal.`,
      ul: [r`If $1.5\sin i > 1$, the wavelet radius $AE$ is larger than $AC$: no tangent can be drawn from C, so there is **no refracted wave**. This happens beyond $i = 41.8°$, the critical angle.`],
      v: V.out,
      n: 'Reverse the direction, so that the light goes from glass into air. Now the wavelet in air grows faster than the wavefront moves in the glass, one and a half times as far, and the refracted ray bends away from the normal. At a large enough angle the wavelet would be bigger than A C itself, and no tangent from C can touch it. Then there is no refracted wave at all: Huygens’ picture of total internal reflection.',
    }),
    sl('concept', 'Superposition of waves', {
      b: '**Principle of superposition:** where two or more waves overlap, the resultant displacement at any instant is the **sum** of the separate displacements. Each wave then travels on unchanged.',
      ul: ['In phase: crests meet crests, amplitude $a_1 + a_2$ (**constructive** interference).', 'In antiphase: crests meet troughs, amplitude $|a_1 - a_2|$ (**destructive** interference).', 'Intensity is proportional to amplitude squared: $I \\propto a^2$.'],
      v: V.superpose,
      n: 'When two waves overlap, the disturbance at each point is simply the sum of the two separate disturbances. If they arrive in step, crest on crest, the amplitudes add and the light is brighter: constructive interference. If a crest meets a trough, they subtract: destructive interference, and the point is dark if the amplitudes are equal. Remember that the intensity goes as the square of the amplitude.',
    }),
    sl('concept', 'Path difference and phase difference', {
      b: r`Two sources vibrating in phase send waves to a point P by paths of different lengths. A path difference of one wavelength puts the waves back in step, so
$$\varphi = \dfrac{2\pi}{\lambda}\,\Delta$$`,
      v: condTable,
      ul: ['Bright where $\\Delta$ is a whole number of wavelengths; dark where it is an odd number of half wavelengths.'],
      n: 'Suppose two sources start in step. If one wave travels farther to reach a point, it arrives late. Every wavelength of extra path is a full cycle, two pi radians, so the phase difference is two pi over lambda times the path difference. Whole wavelengths of path difference give bright points; odd half wavelengths give dark points, where crest meets trough.',
    }),
    sl('example', 'Worked example 2: bright or dark?', {
      b: 'Two coherent sources in phase emit light of wavelength 640 nm. At point P the path difference is 2.24 μm; at point Q it is 1.92 μm. Find the phase difference at each point and say whether it is bright or dark.',
      ul: [
        r`P: $\dfrac{\Delta}{\lambda} = \dfrac{2.24 \times 10^{-6}}{640 \times 10^{-9}} = ${dec(ex2.k1, 2)}$, so $\varphi = 2\pi \times 3.5 = 7\pi$: an odd multiple of $\pi$, **dark**.`,
        r`Q: $\dfrac{1.92 \times 10^{-6}}{640 \times 10^{-9}} = ${dec(ex2.k2, 1)}$, so $\varphi = 6\pi$: a whole number of cycles, **bright**.`,
      ],
      v: V.superpose,
      n: 'Divide each path difference by the wavelength. At P the result is three and a half: the waves are seven pi out of step, which is the same as being half a cycle apart, so a crest meets a trough and P is dark. At Q the result is exactly three: the waves arrive a whole number of cycles apart, back in step, and Q is bright.',
    }),
    sl('concept', 'Coherent and incoherent sources', {
      b: 'Two sources are **coherent** if they have the **same frequency** and a **constant phase difference**. Only coherent sources give a **sustained** interference pattern.',
      ul: ['Two separate lamps are **incoherent**: their atoms emit short, random bursts, so the phase difference changes millions of times a second and the fringes average out; the screen shows $I_1 + I_2$ everywhere.', 'Coherent sources are made by **dividing one wavefront** (two slits lit by one narrow slit) or by using a laser.'],
      v: cohTable,
      n: 'Interference fringes only stay put if the phase difference between the two sources stays fixed. Ordinary lamps cannot manage that: each atom emits a short burst lasting about a hundred millionth of a second, with a random phase, so the pattern from two lamps shifts far too fast to see. The trick is to take light from one source and split it, so that both parts share every change of phase.',
    }),
    sl('example', 'Worked example 3: how dark are the dark fringes?', {
      b: '(a) In a double-slit set-up the waves from the two slits have amplitudes in the ratio 5 : 3. Find the ratio of the intensities of the slits and $I_{\\max} : I_{\\min}$. (b) With equal slits, each giving 2.0 units of intensity, find the intensity at a bright fringe and the average.',
      ul: [
        r`(a) $\dfrac{I_1}{I_2} = \dfrac{5^2}{3^2} = \dfrac{25}{9}$; $\dfrac{I_{\max}}{I_{\min}} = \dfrac{(5 + 3)^2}{(5 - 3)^2} = \dfrac{64}{4} = ${ex3.ratio}$.`,
        r`(b) Amplitudes add: $I_{\max} = (\sqrt{2.0} + \sqrt{2.0})^2 = 4 \times 2.0 = ${dec(ex3.bright, 2)}$ units, $I_{\min} = 0$; averaged over the fringes, ${dec(ex3.avg, 2)} units, the same as the two slits separately.`,
      ],
      v: fringePlot,
      n: 'Intensity follows amplitude squared, so amplitudes of five and three mean intensities of twenty five and nine. At a bright fringe the amplitudes add to eight; at a dark fringe they subtract to two. Squaring, the bright fringes are sixteen times as intense as the dark ones, which are not completely dark. With two equal slits the bright fringes reach four times one slit, but the average is just twice: energy is only moved around.',
    }),
    sl('check', 'Quick check: which point is bright?', {
      b: 'Choose the correct option.',
      v: condTable,
      chk: 'brightpick-mcq',
      n: 'Divide each path difference by the wavelength and look for a whole number.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Wavefront', 'surface of equal phase; rays perpendicular to it'],
          ['Huygens’ principle', 'new wavefront = forward envelope of wavelets of radius $vt$'],
          ['Reflection; refraction', '$i = r$; $\\dfrac{\\sin i}{\\sin r} = \\dfrac{v_1}{v_2}$; $\\lambda_m = \\lambda/n$, $f$ unchanged'],
          ['Phase difference', '$\\varphi = \\dfrac{2\\pi}{\\lambda}\\Delta$; bright $\\Delta = n\\lambda$, dark $\\Delta = (2n - 1)\\lambda/2$'],
          ['Contrast', '$\\dfrac{I_{\\max}}{I_{\\min}} = \\dfrac{(a_1 + a_2)^2}{(a_1 - a_2)^2}$; coherent sources needed'],
        ],
        'Summary table of wavefronts, Huygens’ principle, the laws of reflection and refraction from Huygens’ construction, path and phase difference, and the contrast of fringes',
      ),
      n: 'To sum up: a wavefront joins points vibrating in phase, and rays are perpendicular to it. Huygens’ wavelets and their envelope move a wavefront forward, and give the laws of reflection and refraction, with sine i over sine r equal to the ratio of speeds. Phase difference is two pi over lambda times the path difference. Sustained interference needs coherent sources, and equal amplitudes give the darkest dark fringes.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'In Huygens’ proofs, draw the wavelet from the first point of contact and the tangent from the last, and state that BC and AE are covered in the same time.',
        'Name the two triangles and say why they are congruent (reflection) or use their sines (refraction).',
        'Entering a medium: frequency unchanged; speed and wavelength divided by n.',
        'Coherent means the same frequency and a constant phase difference, not just the same colour.',
      ],
      v: table(['Asked', 'Key point'], [['Shape of wavefront from a tube light?', 'Cylindrical'], ['Frequency in glass?', 'Unchanged'], ['Two bulbs, no fringes?', 'Not coherent']], 'Table of common questions and the key point for each'),
      n: 'In a Huygens proof, mark where the wavefront first touches the surface, draw the wavelet from there, and draw the tangent from the point it reaches last. Say clearly that the two distances are covered in the same time. When light enters a medium, only the speed and wavelength change. And coherent means a fixed phase difference, not merely the same colour.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Wave Optics — Part 2: Young’s double slit and single-slit diffraction',
  goals: [
    'Derive the positions of bright and dark fringes and the fringe width β = λD/d in Young’s experiment',
    'Sketch and interpret the intensity distribution of the double-slit pattern',
    'Describe single-slit diffraction (minima a sin θ = nλ, secondary maxima) and find the angular and linear width of the central maximum',
  ],
  slides: [
    sl('title', 'Young’s Double Slit and Single-Slit Diffraction', {
      b: 'Part 2 — two slits give equally spaced fringes; one slit spreads light into a broad central band.',
      v: V.patterns,
      n: 'In eighteen oh one Thomas Young sent sunlight through a pinhole and then through two pinholes close together, and saw bands of light and dark where ray optics predicts plain light. It was strong evidence that light is a wave. In this part we work out where the fringes fall, how wide they are and how their brightness varies, and then see what a single narrow slit does on its own.',
    }),
    sl('diagram', 'Young’s arrangement', {
      b: 'Light from a narrow slit S falls on two narrow slits S₁ and S₂, a distance $d$ apart, equidistant from S. Fringes form on a screen a distance $D$ away ($D \\gg d$).',
      ul: ['S₁ and S₂ are lit by the **same wavefront**, so they are **coherent** and in phase.', 'O, opposite the midpoint of the slits, is equidistant from both: the **central fringe is bright**.'],
      v: V.ydse,
      n: 'Young’s trick was to make two coherent sources from one. A single narrow slit S lights two narrow slits, S one and S two, a small distance d apart. Because the same wavefront reaches both, they vibrate in step and act as coherent sources. Their waves overlap on a screen a distance D away. The centre of the screen is the same distance from both slits, so it is bright.',
    }),
    sl('concept', 'The path difference d sin θ', {
      b: r`For a point P at height $y$, draw S₁N perpendicular to S₂P. Since $D \gg d$, S₁P and NP are almost equal, so the path difference is
$$\Delta = S_2P - S_1P \approx S_2N = d\sin\theta$$
For small angles $\sin\theta \approx \tan\theta = y/D$, so $\Delta = \dfrac{yd}{D}$.`,
      v: V.ydse,
      n: 'At a point P above the centre, the wave from the lower slit travels farther. Drop a perpendicular from S one onto the line S two P. Because the screen is far away, the two rays are almost parallel, and the extra path is the short piece S two N, which equals d sine theta. For small angles, sine theta is y over D, so the path difference is y d over D.',
    }),
    sl('concept', 'Bright and dark fringes; fringe width', {
      b: r`**Bright** fringes: $\dfrac{yd}{D} = n\lambda \Rightarrow y_n = \dfrac{n\lambda D}{d}$ ($n = 0, 1, 2, \dots$).
**Dark** fringes: $\dfrac{yd}{D} = (2n - 1)\dfrac{\lambda}{2} \Rightarrow y_n' = \dfrac{(2n - 1)\lambda D}{2d}$ ($n = 1, 2, \dots$).
**Fringe width** (spacing of successive bright, or dark, fringes):
$$\beta = y_{n+1} - y_n = \dfrac{\lambda D}{d}$$`,
      ul: ['β is the same for every fringe: the fringes are **equally spaced**; dark fringes lie midway between bright ones.', 'Angular fringe width $\\theta_\\beta = \\beta/D = \\lambda/d$.'],
      v: table(['Fringe', 'Distance from O'], [['Central bright', '0'], ['First dark', 'β/2'], ['First bright', 'β'], ['Second dark', '3β/2'], ['n-th bright', 'nβ']], 'Table of fringe positions: central bright at zero, first dark at half a fringe width, first bright at one fringe width, second dark at one and a half, the n th bright at n fringe widths'),
      n: 'Bright fringes appear where the path difference y d over D is a whole number of wavelengths, at y equals n lambda D over d. Dark fringes appear at odd half wavelengths. Subtract the positions of two neighbouring bright fringes and n cancels: the spacing, or fringe width beta, is lambda D over d, the same everywhere. So the fringes are equally spaced, with each dark fringe halfway between two bright ones.',
    }),
    sl('example', 'Worked example 4: positions of fringes', {
      b: 'In a double-slit experiment, $\\lambda = 560$ nm, $d = 0.35$ mm and $D = 1.25$ m. Find the fringe width, the distance of the fourth bright fringe and of the third dark fringe from the centre, and the angular fringe width.',
      ul: [
        r`Step 1 — $\beta = \dfrac{\lambda D}{d} = \dfrac{560 \times 10^{-9} \times 1.25}{0.35 \times 10^{-3}} = ${sci(ex4.beta, 2)}$ m $= 2.0$ mm.`,
        r`Step 2 — fourth bright: $y_4 = 4\beta = ${dec(ex4.y4 * 1e3, 2)}$ mm; third dark: $y = \dfrac{5}{2}\beta = ${dec(ex4.dark3 * 1e3, 2)}$ mm.`,
        r`Step 3 — $\theta_\beta = \dfrac{\lambda}{d} = ${sci(ex4.ang, 2)}$ rad.`,
      ],
      v: V.patterns,
      n: 'Work in metres: lambda D over d comes to two times ten to the minus three metre, two millimetres. The fourth bright fringe is four fringe widths from the centre, eight millimetres. The third dark fringe is two and a half fringe widths out, five millimetres. The angular fringe width is lambda over d, one point six milliradians. The top strip of the figure shows this pattern drawn to scale.',
    }),
    sl('concept', 'What changes the fringe width?', {
      b: 'From $\\beta = \\lambda D/d$ (and $\\lambda_m = \\lambda/n$ in a medium):',
      v: effectTable,
      ul: ['With **white light**, every colour has a bright fringe at O, so the central fringe is white; beyond it the fringes are coloured, violet nearest the centre, and soon overlap into uniform light.'],
      n: 'The formula answers most questions. A longer wavelength, a more distant screen or slits closer together all widen the fringes. Moving the screen does not change the angular width, only the linear one. In a liquid the wavelength is divided by the refractive index, so the fringes close up by the same factor. With white light the centre is white, and the coloured fringes on either side soon blur into each other.',
    }),
    sl('check', 'Quick check: three changes at once', {
      b: 'Choose the correct option.',
      v: effectTable,
      chk: 'change-mcq',
      n: 'Multiply the three factors: the wavelength and the distance on top, the separation underneath.',
    }),
    sl('example', 'Worked example 5: a moved screen and a liquid', {
      b: 'Slits 0.40 mm apart give fringes 1.8 mm wide on a screen 1.5 m away. (a) Find the wavelength. (b) The screen is moved 0.50 m closer and the whole apparatus is immersed in a liquid of refractive index 1.2. Find the new fringe width.',
      ul: [
        r`(a) $\lambda = \dfrac{\beta d}{D} = \dfrac{1.8 \times 10^{-3} \times 0.40 \times 10^{-3}}{1.5} = ${sci(ex5.lam, 2)}$ m (${dec(ex5.lam * 1e9, 3)} nm).`,
        r`(b) $\beta' = \dfrac{\lambda D'}{n d} = 1.8 \times \dfrac{1.0}{1.5} \times \dfrac{1}{1.2} = ${dec(ex5.beta2 * 1e3, 2)}$ mm.`,
      ],
      v: table(['Change', 'Factor', 'β (mm)'], [['Start', '—', '1.8'], ['D: 1.5 m → 1.0 m', '× 2/3', '1.2'], ['In liquid, n = 1.2', '÷ 1.2', '1.0']], 'Worked table: the fringe width falls from 1.8 to 1.2 millimetres when the screen is brought closer, and to 1.0 millimetre in the liquid'),
      n: 'Rearranging the fringe width formula, the wavelength is beta d over D, which gives four point eight times ten to the minus seven metre, four hundred and eighty nanometres. Moving the screen from one and a half metres to one metre multiplies the fringe width by two thirds, to one point two millimetres. The liquid then divides it by one point two, leaving exactly one millimetre.',
    }),
    sl('diagram', 'Intensity distribution in the double-slit pattern', {
      b: r`For two coherent waves of intensities $I_1$ and $I_2$ with phase difference $\varphi$ (result quoted, not derived):
$$I = I_1 + I_2 + 2\sqrt{I_1 I_2}\cos\varphi, \qquad \text{equal slits: } I = 4I_0\cos^2\dfrac{\varphi}{2}$$`,
      ul: ['Equal slits: maxima $4I_0$, minima **zero**, all maxima equally bright and equally spaced in $y$ (or in $\\theta$, spacing $\\lambda/d$).', 'The average is $2I_0$: interference **redistributes** energy; none is created or destroyed.'],
      v: fringePlot,
      n: 'Here is the brightness across the screen. With equal slits, each giving I nought on its own, the intensity rises to four I nought at every bright fringe and falls to zero at every dark one, following a cosine squared shape. All the maxima are equally bright and equally spaced. The average is two I nought, exactly what the two slits would give without interference: the energy is only redistributed.',
    }),
    sl('concept', 'Unequal slits: contrast', {
      b: r`If one slit lets through less light, the minima are no longer zero:
$$I_{\max} = (\sqrt{I_1} + \sqrt{I_2})^2,\qquad I_{\min} = (\sqrt{I_1} - \sqrt{I_2})^2$$`,
      ul: ['The fringe **positions** and **width** do not change; only the contrast falls.', 'Covering one slit completely removes the interference fringes: only the faint, broad pattern of one slit is left.'],
      v: fringePlot,
      n: 'If one slit is narrower and lets through a quarter as much light, the amplitudes no longer cancel completely. The maxima drop and the minima rise above zero, so the fringes look washed out, though they stay in the same places with the same spacing. Cover one slit entirely and the fringes vanish, leaving only the broad glow of light spreading from a single slit.',
    }),
    sl('check', 'Quick check: a dimmer slit', {
      b: 'Choose the correct option.',
      v: fringePlot,
      chk: 'unequal-mcq',
      n: 'What happens to the bright fringes, the dark fringes and the spacing?',
    }),
    sl('diagram', 'Diffraction at a single slit', {
      b: 'Light through a slit of width $a$ (comparable with λ) spreads into the geometrical shadow: **diffraction**. Each point of the slit sends out Huygens wavelets (Fraunhofer case: plane wavefront in, pattern viewed far away).',
      ul: ['Straight ahead, all wavelets are in phase: a bright **central maximum**.', r`At angle $\theta$ with $a\sin\theta = \lambda$, split the slit into two halves: each wavelet in the top half has a partner $a/2$ below it, $\lambda/2$ behind, and they cancel: **first minimum**.`],
      v: V.slit,
      n: 'Now use a single narrow slit. Every point across the slit is a source of wavelets. Straight ahead they all travel equal distances and arrive in step, so the centre is bright. At an angle where the edge-to-edge path difference a sine theta is one wavelength, split the slit into two halves. Each wavelet in the upper half has a partner half a slit lower, exactly half a wavelength behind, and they cancel in pairs.',
    }),
    sl('concept', 'Minima and secondary maxima', {
      b: r`**Minima:** $a\sin\theta = n\lambda$ ($n = \pm1, \pm2, \dots$; not $n = 0$).
**Secondary maxima** (approximately): $a\sin\theta = \left(n + \tfrac{1}{2}\right)\lambda$. At $a\sin\theta = \tfrac{3}{2}\lambda$, split the slit into **three** parts: two cancel, the third is left over, so the light is weak but not zero.`,
      ul: ['The secondary maxima are faint: the first is less than one twentieth as bright as the central maximum, and they get fainter outward.', 'This qualitative picture is all the ISC syllabus requires; the exact intensity formula is not examined.'],
      v: ssPlot,
      n: 'Repeat the halving argument with four, six or more strips, and you get dark directions wherever a sine theta is a whole number of wavelengths, except straight ahead. Between them are secondary maxima, roughly where the slit can be split into an odd number of strips. All but one strip cancel, so these maxima are faint: the first is under a twentieth of the central brightness.',
    }),
    sl('diagram', 'Width of the central maximum', {
      b: r`The first minima are at $\sin\theta_1 = \pm\dfrac{\lambda}{a}$ (small angles: $\theta_1 \approx \lambda/a$).
$$\text{angular width} = 2\theta_1 = \dfrac{2\lambda}{a}, \qquad \text{linear width } W = \dfrac{2\lambda D}{a}$$`,
      ul: ['The central maximum is **twice** as wide as each secondary maximum.', 'A **narrower** slit or a **longer** wavelength gives a **wider** central band; diffraction is clear only when $a$ is not much larger than λ.'],
      v: V.central,
      n: 'The central maximum stretches between the first minima on either side, at angles where sine theta is plus or minus lambda over a. Its angular width is therefore two lambda over a, and on a screen a distance D away its width is two lambda D over a. Surprisingly, a narrower slit gives a wider pattern. The secondary maxima are only half as wide as the central one.',
    }),
    sl('example', 'Worked example 6: the central band', {
      b: 'Light of wavelength 630 nm falls normally on a slit 0.18 mm wide. Find the angle of the first minimum, the width of the central maximum on a screen 1.6 m away, and the approximate position of the first secondary maximum.',
      ul: [
        r`Step 1 — $\theta_1 = \dfrac{\lambda}{a} = \dfrac{630 \times 10^{-9}}{0.18 \times 10^{-3}} = ${sci(ex6.th1, 2)}$ rad.`,
        r`Step 2 — $y_1 = D\theta_1 = ${dec(ex6.y1 * 1e3, 2)}$ mm, so $W = 2y_1 = ${dec(ex6.W * 1e3, 3)}$ mm (angular width ${sci(2 * ex6.th1, 2)} rad).`,
        r`Step 3 — first secondary maximum near $a\sin\theta = 1.5\lambda$: $y \approx 1.5 \times ${dec(ex6.y1 * 1e3, 2)} = ${dec(ex6.ysec * 1e3, 2)}$ mm, between the first minimum (${dec(ex6.y1 * 1e3, 2)} mm) and the second (${dec(ex6.y2 * 1e3, 3)} mm).`,
      ],
      v: ssPlot,
      n: 'The first minimum is at lambda over a, three point five milliradians. On a screen one point six metres away that is five point six millimetres from the centre, so the central band is eleven point two millimetres wide. The first secondary maximum sits roughly where a sine theta is one and a half wavelengths, about eight point four millimetres out, between the first and second minima.',
    }),
    sl('concept', 'Interference and diffraction compared', {
      b: 'Both come from superposing waves; they differ in the number of sources and the pattern:',
      v: envPlot,
      ul: ['Two coherent slits: fringes equally wide ($\\lambda D/d$) and, for narrow slits, equally bright.', 'One slit: wavelets from every point; central band twice as wide as the others, side bands fading fast; dark where $a\\sin\\theta = n\\lambda$.', 'Real slits have width, so the double-slit fringes sit inside the single-slit **diffraction envelope** (graph).'],
      n: 'Interference and diffraction are both superposition. In Young’s experiment two coherent sources give equally spaced, equally bright fringes. In single-slit diffraction a continuous set of wavelets from one slit gives a wide, bright centre and faint, narrower side bands. Real slits always have some width, so the double-slit fringes are really sitting inside a diffraction envelope.',
    }),
    sl('check', 'Quick check: width of the central band', {
      b: 'Choose the correct option.',
      v: V.central,
      chk: 'angwidth-mcq',
      n: 'The central band spreads between the first minima on either side.',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Path difference (double slit)', '$\\Delta = d\\sin\\theta \\approx yd/D$'],
          ['Fringes', 'bright $y = n\\lambda D/d$; dark $y = (2n - 1)\\lambda D/(2d)$'],
          ['Fringe width', '$\\beta = \\lambda D/d$; angular $\\lambda/d$; in a medium $\\beta/n$'],
          ['Intensity', '$I = 4I_0\\cos^2(\\varphi/2)$ for equal slits; average $2I_0$'],
          ['Single slit', 'minima $a\\sin\\theta = n\\lambda$; central width $2\\lambda/a$, $2\\lambda D/a$'],
        ],
        'Summary table of the double-slit path difference, fringe positions, fringe width, intensity distribution and single-slit results',
      ),
      n: 'To sum up: in Young’s experiment the path difference is d sine theta, about y d over D. Bright fringes are at n lambda D over d, dark ones halfway between, and the fringe width is lambda D over d. Equal slits give fringes from four I nought down to zero. A single slit has minima where a sine theta is n lambda, and a central maximum of angular width two lambda over a.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'In the fringe-width derivation, show Δ = d sin θ ≈ yd/D, write the bright and dark conditions, then subtract neighbouring positions.',
        'Count dark fringes from n = 1: the n-th dark fringe is at (2n − 1)λD/(2d).',
        'Convert nm and mm to metres before substituting.',
        'Single slit: minima at a sin θ = nλ (the double-slit maximum condition looks the same; do not mix them up).',
        'Central maximum width is 2λD/a, twice the distance to the first minimum.',
      ],
      v: table(['Asked', 'Key point'], [['Apparatus in water?', 'β divided by n'], ['Slit made narrower?', 'Central band wider'], ['One slit dimmer?', 'Same β, poorer contrast']], 'Table of common questions and the key point for each'),
      n: 'In the fringe width derivation, show the path difference, write both conditions, and subtract neighbouring positions. Number the dark fringes from one. Change every length to metres before you substitute. Be careful: for a single slit, a sine theta equals n lambda gives a dark band, while the similar double slit expression gives a bright one. And the width of the central maximum is twice the distance to the first minimum.',
    }),
  ],
});
