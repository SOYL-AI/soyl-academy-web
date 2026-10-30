// ch10 Wave Optics — two decks: Part 1 (t01–t02) wavefronts, Huygens' principle, proofs of reflection and refraction,
// coherent sources and interference; Part 2 (t03–t04) Young's double-slit experiment (fringe width used, not derived) and
// single-slit diffraction (qualitative, width of the central maximum). Worked-example numbers are computed here.
import { sl, deck, table, flow, svgV, plot, r, sci, dec } from '../../cbse-12-physics-ch01/src/lib.mjs';
import * as G from './svgs.mjs';

const deg = (d) => (d * Math.PI) / 180;
const todeg = (x) => (x * 180) / Math.PI;
export const C = 3e8;

// ---------------------------------------------------------------- worked-example numbers
const ex1 = { n: 1.5, i: 45, lam: 600e-9 };
ex1.r = todeg(Math.asin(Math.sin(deg(ex1.i)) / ex1.n));
ex1.v = C / ex1.n;
ex1.lam2 = ex1.lam / ex1.n;
const ex2 = { dx: 1.25e-6, lam: 500e-9 };
ex2.ratio = ex2.dx / ex2.lam;
const ex3 = { a: 2, b: 1 };
ex3.Imax = (ex3.a + ex3.b) ** 2;
ex3.Imin = (ex3.a - ex3.b) ** 2;
ex3.I60 = 4 * Math.cos(Math.PI / 6) ** 2;
const ex4 = { ...G.YDSE_DATA };
ex4.y3 = 3 * ex4.beta;
ex4.yd2 = 1.5 * ex4.beta;
ex4.ang = ex4.lam / ex4.d;
const ex5 = { span: 16.5e-3, N: 10, d: 0.4e-3, D: 1.2, nw: 1.33 };
ex5.beta = ex5.span / ex5.N;
ex5.lam = (ex5.beta * ex5.d) / ex5.D;
ex5.betaW = ex5.beta / ex5.nw;
const ex6 = { a: 0.2e-3, lam: 600e-9, D: 2.0 };
ex6.th = ex6.lam / ex6.a;
ex6.y1 = ex6.D * ex6.th;
ex6.width = 2 * ex6.y1;
export const EX = { ex1, ex2, ex3, ex4, ex5, ex6 };

export const V = {
  wf: svgV(G.WAVEFRONTS, 'Spherical, plane and cylindrical wavefronts with rays perpendicular to them'),
  refl: svgV(G.HUYGENS_REFLECT, 'Huygens construction for reflection at a plane mirror', 'BC and AE are drawn equal, so the triangles are congruent and i = r (checked).'),
  refr: svgV(G.HUYGENS_REFRACT, 'Huygens construction for refraction into a slower medium', 'Drawn for i = 45° and v₁/v₂ = 1.5: the lengths give sin i/sin r = 1.5 (checked).'),
  ydse: svgV(G.YDSE, 'Young’s double-slit set-up with equally spaced bright fringes', 'Fringe spacing drawn to scale for λ = 600 nm, d = 0.30 mm, D = 1.5 m (β = 3.0 mm).'),
  ss: svgV(G.SINGLESLIT, 'Single slit: path difference a sin θ between the edge rays'),
};

export const intPlot = plot(
  {
    x: { min: 0, max: 12.6, label: 'phase difference φ (rad)' },
    y: { min: 0, max: 4.4, label: 'I / I₀' },
    functions: [
      { expr: '4(cos(x/2))^2', label: 'coherent: I = 4I₀ cos²(φ/2)' },
      { expr: '2', label: 'incoherent: I = 2I₀ everywhere' },
    ],
  },
  'Intensity from two equal coherent waves plotted against their phase difference: it swings between four times and zero times the single-wave intensity, averaging twice; for incoherent sources it is a flat line at twice',
  'Maxima at φ = 0, 2π, 4π; zeros at φ = π, 3π. The average is 2I₀ in both cases: energy is redistributed, not lost.',
);
export const fringePlot = plot(
  {
    x: { min: -3.2, max: 3.2, label: 'y / β (distance from the centre in fringe widths)' },
    y: { min: 0, max: 1.15, label: 'I / I_max' },
    functions: [{ expr: '(cos(pi*x))^2', label: 'double slit: equally bright, equally spaced fringes' }],
  },
  'Intensity on the screen in Young’s experiment plotted against distance from the centre: equally spaced, equally bright maxima one fringe width apart, with dark fringes halfway between them',
  'Bright fringes at y = nβ, dark fringes at y = (n + ½)β.',
);
const ssPts = [];
for (let k = -350; k <= 350; k++) {
  const u = k / 100;
  const I = u === 0 ? 1 : (Math.sin(Math.PI * u) / (Math.PI * u)) ** 2;
  ssPts.push([u, Number(I.toFixed(4))]);
}
export const SS_MIN_CHECK = [1, 2, 3].every((m) => ssPts.find((p) => p[0] === m)[1] < 1e-6) && ssPts.find((p) => p[0] === 0)[1] === 1;
export const ssPlot = plot(
  {
    x: { min: -3.5, max: 3.5, label: 'a sin θ / λ' },
    y: { min: 0, max: 1.1, label: 'I / I₀' },
    series: [{ label: 'single slit (computed)', kind: 'line', points: ssPts }],
    vlines: [{ x: -1, dashed: true }, { x: 1, label: 'first minima: a sin θ = ±λ', dashed: true }],
  },
  'Intensity of the single-slit diffraction pattern plotted against a sine theta over lambda: a bright central maximum between the first minima at plus and minus one, twice as wide as the much fainter secondary maxima beyond',
  'Minima where a sin θ = nλ (n = ±1, ±2, …); the central maximum is twice as wide as the others and far brighter.',
);

const condTable = table(
  ['Condition', 'Path difference Δ', 'Phase difference φ', 'Result'],
  [
    ['Constructive', 'nλ (n = 0, 1, 2, …)', '2nπ', 'bright, I = 4I₀'],
    ['Destructive', '(n + ½)λ', '(2n + 1)π', 'dark, I = 0'],
  ],
  'Table of conditions for constructive and destructive interference in terms of path difference and phase difference',
);
const factorTable = table(
  ['Change', 'Effect on β = λD/d'],
  [
    ['Longer wavelength (red instead of blue)', 'β increases'],
    ['Screen moved farther (D larger)', 'β increases'],
    ['Slits closer together (d smaller)', 'β increases'],
    ['Apparatus in a liquid of index n', 'β becomes β/n'],
    ['White light', 'central fringe white, others coloured'],
  ],
  'Table of how the fringe width changes with wavelength, screen distance, slit separation, a surrounding liquid and white light',
);

export const deck1 = deck({
  part: 1,
  title: 'Wave Optics — Part 1: Wavefronts, Huygens’ principle and interference',
  goals: [
    'Describe wavefronts and use Huygens’ principle to construct a new wavefront',
    'Prove the laws of reflection and refraction with Huygens’ construction',
    'Explain coherent sources and the conditions for sustained interference',
  ],
  slides: [
    sl('title', 'Wave Optics', {
      b: 'Part 1 — light as a wave: how wavefronts move, why light bends at a boundary, and how two waves can add up to brightness or cancel to darkness.',
      v: flow('LR', [['w', 'Wavefronts'], ['h', 'Huygens’ principle'], ['l', 'Laws of reflection and refraction'], ['c', 'Coherent sources'], ['i', 'Interference']], [['w', 'h'], ['h', 'l'], ['l', 'c'], ['c', 'i']], 'Flow of the part: wavefronts, Huygens’ principle, the laws of reflection and refraction, coherent sources, interference'),
      n: 'Ray optics treats light as straight lines. It cannot explain the colours of a soap film or why two beams of light can produce darkness. In this part we treat light as a wave. We meet wavefronts and Huygens’ principle, use them to prove the laws of reflection and refraction, and then see what happens when waves from two coherent sources overlap.',
    }),
    sl('concept', 'Wavefronts', {
      b: 'A **wavefront** is a surface on which every point oscillates **in the same phase**. Energy travels at right angles to it: **rays are normals to wavefronts**.',
      ul: ['Point source: **spherical** wavefronts.', 'Line source (a long slit): **cylindrical** wavefronts.', 'Very distant source (the Sun, a star): small parts of the wavefront are **plane**.', 'Wavefronts one wavelength apart are in the same phase.'],
      v: V.wf,
      n: 'Drop a stone in a pond and watch the circular ripples. Every point on one crest is in the same phase, and that set of points is a wavefront. For a point source of light the wavefronts are spheres. Far from the source, a small piece of a huge sphere is almost flat, so light from the Sun arrives as plane wavefronts. Rays simply show the direction in which the wavefronts move.',
    }),
    sl('diagram', 'Huygens’ principle', {
      b: 'To find where a wavefront will be a time $t$ later:',
      ul: ['Every point on the wavefront acts as a source of **secondary wavelets**, spreading at the wave speed $v$.', 'After time $t$ each wavelet has radius $vt$.', 'The new wavefront is the **forward envelope** (common tangent) of the wavelets. (The backward wave is ignored; a fuller theory shows it is absent.)'],
      v: V.wf,
      n: 'Huygens gave a simple rule. Treat every point on a wavefront as a tiny source sending out its own wavelets at the speed of the wave. After a time t each wavelet is a small sphere of radius v t. Draw the surface that touches all these wavelets in the forward direction: that is the new wavefront. With this rule we can follow light into a mirror or a block of glass.',
    }),
    sl('diagram', 'Proving the law of reflection', {
      b: r`A plane wavefront AB meets a mirror at A. In the time $t$ that B takes to reach C, a wavelet from A spreads to radius $AE = vt = BC$. The reflected wavefront CE is the tangent from C to this wavelet.`,
      ul: ['Triangles ABC and CEA are right-angled, share the hypotenuse AC and have $BC = AE$, so they are **congruent**.', r`Hence $\angle BAC = \angle ECA$, i.e. $i = r$: the angle of incidence equals the angle of reflection.`],
      v: V.refl,
      n: 'The edge A of the wavefront touches the mirror first. While the other edge B travels to the mirror at C, a wavelet from A grows to the same radius, because the speed is unchanged. The reflected wavefront is the tangent from C to that wavelet. The two right triangles have the same hypotenuse and an equal side, so they are congruent, and the angle of incidence equals the angle of reflection.',
    }),
    sl('diagram', 'Proving Snell’s law', {
      b: r`Medium 2 is slower ($v_2 < v_1$). While B travels $BC = v_1 t$, the wavelet from A travels only $AE = v_2 t$. The refracted wavefront EC is the tangent from C.
$$\sin i = \dfrac{BC}{AC},\quad \sin r = \dfrac{AE}{AC}\ \Rightarrow\ \dfrac{\sin i}{\sin r} = \dfrac{v_1}{v_2} = n_{21}$$`,
      ul: ['Since $n = c/v$, this gives $n_1\\sin i = n_2\\sin r$ (Snell’s law).', 'The wavefront turns because one edge slows down first: light bends **towards the normal** in a slower medium.'],
      v: V.refr,
      n: 'Now the lower medium is slower. In the time the edge B moves a distance v one t to reach C, the wavelet from A, now in the slower medium, spreads only v two t. The refracted wavefront is again the tangent from C. From the two right triangles, sine i is B C over A C and sine r is A E over A C, so their ratio is v one over v two: Snell’s law, with the refractive index as a ratio of speeds.',
    }),
    sl('example', 'Worked example 1: light entering glass', {
      b: r`Light of wavelength 600 nm in air strikes glass ($n = 1.5$) at $i = 45°$. Find the angle of refraction, the speed of light in the glass and the wavelength in the glass.`,
      ul: [
        r`Step 1 — $\sin r = \dfrac{\sin 45°}{1.5} \approx ${dec(Math.sin(deg(45)) / 1.5, 3)}$, so $r = ${dec(ex1.r, 3)}°$.`,
        r`Step 2 — $v = \dfrac{c}{n} = \dfrac{3.0 \times 10^{8}}{1.5} = ${sci(ex1.v, 2)}$ m s$^{-1}$.`,
        r`Step 3 — the frequency is unchanged, so $\lambda' = \dfrac{\lambda}{n} = \dfrac{600}{1.5} = ${dec(ex1.lam2 * 1e9, 3)}$ nm.`,
      ],
      v: V.refr,
      n: 'Use Snell’s law: sine of forty five degrees divided by one point five gives about zero point four seven one, so the angle of refraction is about twenty eight degrees. The speed in glass is the speed of light divided by one point five, two times ten to the eight metres per second. The frequency is fixed by the source, so the wavelength shrinks by the same factor, to four hundred nanometres.',
    }),
    sl('check', 'Quick check: Huygens’ principle', {
      b: 'Decide whether the statement is true or false.',
      v: null,
      chk: 'envelope-tf',
      n: 'Recall how the new wavefront is found from the secondary wavelets.',
    }),
    sl('concept', 'Superposition and interference', {
      b: r`Where two waves overlap, the resultant displacement is the **sum** of the separate displacements. For waves from two sources in phase, with **path difference** $\Delta$, the **phase difference** is $\varphi = \dfrac{2\pi}{\lambda}\Delta$.`,
      v: condTable,
      n: 'When two waves meet, their displacements simply add. If the crests of one arrive with the crests of the other, the waves reinforce: that happens when the path difference is a whole number of wavelengths. If crests arrive with troughs, they cancel: that needs a path difference of an odd number of half wavelengths. A path difference of one wavelength is a phase difference of two pi.',
    }),
    sl('concept', 'Intensity in interference', {
      b: r`For two waves of intensities $I_1$, $I_2$ and phase difference $\varphi$:
$$I = I_1 + I_2 + 2\sqrt{I_1 I_2}\cos\varphi$$
For equal intensities $I_0$: $I = 4I_0\cos^2(\varphi/2)$, between $4I_0$ and $0$.`,
      ul: ['**Incoherent** sources: $\\varphi$ changes randomly, $\\cos\\varphi$ averages to zero, so $I = I_1 + I_2$ (no pattern).', 'Energy is only **redistributed**: the average of $4I_0\\cos^2(\\varphi/2)$ is $2I_0$.'],
      v: intPlot,
      n: 'Intensity goes as the square of amplitude, so it does not simply add. For two equal waves, the intensity is four I nought times cos squared of half the phase difference. At bright points it is four times one wave alone, and at dark points it is zero. Averaged over the pattern it is two I nought, exactly the sum of the two waves, so energy is moved from dark places to bright ones, not created.',
    }),
    sl('concept', 'Coherent sources', {
      b: 'Two sources are **coherent** if they have the **same frequency** and a **constant phase difference**. Only coherent sources give a **sustained** (steady) interference pattern.',
      ul: ['Two separate bulbs are not coherent: each atom emits for only about a billionth of a second, so the phase difference changes randomly millions of times a second and the pattern washes out.', 'Coherent sources are made from **one** source, e.g. by dividing one wavefront with two slits (Young) or using a laser.', 'For good contrast the two waves should have nearly **equal amplitudes**, and the sources should be narrow and close together.'],
      v: flow('LR', [['s', 'One source'], ['d', 'Split wavefront: two slits'], ['c', 'Fixed phase difference'], ['p', 'Steady fringes']], [['s', 'd'], ['d', 'c'], ['c', 'p']], 'Flow: one source, split the wavefront with two slits, fixed phase difference, steady fringes'),
      n: 'Why don’t two torches pointed at a wall make bright and dark bands? Light from an ordinary source comes in short bursts from countless atoms, each lasting about a billionth of a second with a random phase. The pattern from two such sources shifts far too quickly to see. The trick is to take both waves from one source, so whatever the phase does, it does in both, and the phase difference stays fixed.',
    }),
    sl('example', 'Worked example 2: bright or dark?', {
      b: r`Two coherent sources emit light of wavelength 500 nm in phase. At a point P the path difference is 1.25 μm. Is P bright or dark? What if the wavelength were 625 nm?`,
      ul: [
        r`Step 1 — $\dfrac{\Delta}{\lambda} = \dfrac{1.25 \times 10^{-6}}{500 \times 10^{-9}} = ${dec(ex2.ratio, 2)}$: an odd number of half wavelengths, so P is **dark**.`,
        r`Step 2 — $\dfrac{1.25 \times 10^{-6}}{625 \times 10^{-9}} = 2$: a whole number of wavelengths, so P would be **bright**.`,
      ],
      v: condTable,
      n: 'Divide the path difference by the wavelength. One point two five micrometres is two and a half wavelengths of five hundred nanometre light, so a crest from one source meets a trough from the other: darkness. With six hundred and twenty five nanometre light the same path difference is exactly two wavelengths, so the waves arrive in step and the point is bright.',
    }),
    sl('example', 'Worked example 3: intensity ratios', {
      b: r`(a) Two coherent waves have amplitudes in the ratio 2 : 1. Find $I_\text{max} : I_\text{min}$. (b) Two equal coherent waves, each of intensity $I_0$, meet with phase difference $\pi/3$. Find the resultant intensity.`,
      ul: [
        r`(a) $\dfrac{I_\text{max}}{I_\text{min}} = \dfrac{(a_1 + a_2)^2}{(a_1 - a_2)^2} = \dfrac{(2 + 1)^2}{(2 - 1)^2} = ${ex3.Imax / ex3.Imin}$.`,
        r`(b) $I = 4I_0\cos^2\left(\dfrac{\pi}{6}\right) = 4I_0 \times 0.75 = ${dec(ex3.I60, 2)}I_0$.`,
      ],
      v: intPlot,
      n: 'At a bright point the amplitudes add, three units, and at a dark point they subtract, one unit. Intensity goes as amplitude squared, so the ratio is nine to one; the dark fringes are not completely dark when the amplitudes differ. For the second part, half of pi by three is pi by six, whose cosine squared is three quarters, giving three times I nought.',
    }),
    sl('check', 'Quick check: path difference', {
      b: 'Choose the correct option.',
      v: condTable,
      chk: 'pd-mcq',
      n: 'Compare the path difference with whole and half wavelengths.',
    }),
    sl('check', 'Quick check: coherent sources', {
      b: 'Judge the assertion and the reason.',
      v: null,
      chk: 'bulbs-ar',
      n: 'Think about what happens to the phase of light from two separate lamps.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Wavefront', 'Surface of constant phase; rays are its normals'],
          ['Huygens’ principle', 'New wavefront = forward envelope of secondary wavelets'],
          ['Reflection', 'BC = AE ⇒ congruent triangles ⇒ i = r'],
          ['Refraction', '$\\sin i/\\sin r = v_1/v_2 = n_2/n_1$'],
          ['Interference', 'Δ = nλ bright; Δ = (n + ½)λ dark; $I = 4I_0\\cos^2(\\varphi/2)$'],
          ['Coherent sources', 'Same frequency, constant phase difference'],
        ],
        'Summary table of wavefronts, Huygens’ principle, reflection, refraction, interference conditions and coherent sources',
      ),
      n: 'To sum up: a wavefront is a surface of constant phase, and Huygens’ principle finds the next one as the envelope of secondary wavelets. That construction proves that the angles of incidence and reflection are equal, and that the ratio of sines in refraction equals the ratio of speeds. Waves from coherent sources interfere: whole wavelengths of path difference give brightness, odd half wavelengths give darkness.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'In the Huygens proofs, label A, B, C, E, state $BC = v_1 t$ and $AE = v_2 t$ (or $vt$), and show both right angles.',
        'For refraction, end with $\\sin i/\\sin r = v_1/v_2$ and connect it to $n = c/v$.',
        'Define coherent sources with both parts: same frequency **and** constant phase difference.',
        'Use $I_\\text{max}/I_\\text{min} = (a_1 + a_2)^2/(a_1 - a_2)^2$; square amplitudes, not intensities.',
      ],
      v: table(['Asked', 'Key point'], [['Why are two bulbs not coherent?', 'Random phase changes'], ['Is energy lost at dark fringes?', 'No: redistributed'], ['Frequency on entering glass?', 'Unchanged; λ and v fall']], 'Table of common questions and the key point for each'),
      n: 'In the Huygens proofs, examiners look for a neat labelled figure, the two distances travelled in the same time, and the right angles that make the triangles work. Finish the refraction proof by linking the speed ratio to refractive index. When defining coherent sources, give both conditions. And in intensity ratios, add and subtract amplitudes before squaring.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Wave Optics — Part 2: Young’s double-slit experiment and diffraction',
  goals: [
    'Use the fringe-width expression β = λD/d to solve problems on Young’s double-slit experiment',
    'Predict how the fringe pattern changes with wavelength, distances and the medium',
    'Describe single-slit diffraction and the width of its central maximum',
  ],
  slides: [
    sl('title', 'Young’s experiment and diffraction', {
      b: 'Part 2 — the experiment that convinced physicists that light is a wave, and the spreading of light through a single narrow slit.',
      v: V.ydse,
      n: 'In eighteen oh one Thomas Young let sunlight pass through a pinhole and then through two closely spaced pinholes, and saw bright and dark bands on a screen. Only waves can do that. In this part we use the fringe width of his experiment to solve problems, and then look at diffraction, the spreading of light through a single narrow slit.',
    }),
    sl('diagram', 'The double-slit set-up', {
      b: 'Light from a narrow slit S falls on two slits S₁ and S₂, a distance $d$ apart, and a screen is placed a distance $D$ away ($D \\gg d$).',
      ul: ['S₁ and S₂ lie on the same wavefront from S, so they are **coherent**.', 'At a point a distance $y$ from the centre of the screen, the path difference is $\\Delta = \\dfrac{yd}{D}$ (used, not derived).', 'The central point is equidistant from both slits: always **bright**.'],
      v: V.ydse,
      n: 'The single slit S makes sure that the light reaching the two slits comes from one wavefront, so the slits act as coherent sources. The screen is far away compared with the slit separation. At a height y on the screen the extra distance from the farther slit is y d over D. The centre of the screen is the same distance from both slits, so it is always bright.',
    }),
    sl('concept', 'Fringe positions and fringe width', {
      b: r`Bright where $\dfrac{yd}{D} = n\lambda$, dark where $\dfrac{yd}{D} = (n + \tfrac{1}{2})\lambda$:
$$y_n = \dfrac{n\lambda D}{d},\qquad y'_n = \left(n + \tfrac{1}{2}\right)\dfrac{\lambda D}{d},\qquad \beta = \dfrac{\lambda D}{d}$$`,
      ul: ['Bright and dark fringes are **equally spaced** and equally wide.', 'Angular fringe width $\\theta = \\beta/D = \\lambda/d$, independent of $D$.'],
      v: fringePlot,
      n: 'Setting the path difference equal to whole wavelengths gives the bright fringes, at n lambda D over d. Odd half wavelengths give dark fringes, halfway between. The distance between neighbouring bright fringes, or neighbouring dark ones, is the fringe width beta, lambda D over d. Because it is the same everywhere, the pattern is a set of evenly spaced stripes. Divide by D to get the angular fringe width, lambda over d.',
    }),
    sl('example', 'Worked example 4: fringe width and positions', {
      b: r`In a double-slit experiment $\lambda = 600$ nm, $d = 0.30$ mm and $D = 1.5$ m. Find the fringe width, the distance of the third bright fringe and of the second dark fringe from the centre, and the angular fringe width.`,
      ul: [
        r`Step 1 — $\beta = \dfrac{\lambda D}{d} = \dfrac{600 \times 10^{-9} \times 1.5}{0.30 \times 10^{-3}} = ${sci(ex4.beta, 2)}$ m (3.0 mm).`,
        r`Step 2 — third bright: $y_3 = 3\beta = ${dec(ex4.y3 * 1e3, 2)}$ mm; second dark: $y = 1.5\beta = ${dec(ex4.yd2 * 1e3, 2)}$ mm.`,
        r`Step 3 — $\theta = \dfrac{\lambda}{d} = \dfrac{600 \times 10^{-9}}{0.30 \times 10^{-3}} = ${sci(ex4.ang, 2)}$ rad.`,
      ],
      v: V.ydse,
      n: 'Put the numbers in, keeping everything in metres: lambda D over d is three times ten to the minus three metre, three millimetres. The third bright fringe is three fringe widths from the centre, nine millimetres. The second dark fringe lies one and a half fringe widths out, four and a half millimetres. The angular width is lambda over d, two thousandths of a radian.',
    }),
    sl('check', 'Quick check: fringe width', {
      b: 'Calculate the fringe width.',
      v: V.ydse,
      chk: 'beta-num',
      n: 'Use beta equals lambda D over d, with every length in metres.',
    }),
    sl('concept', 'What changes the fringe width?', {
      b: r`From $\beta = \lambda D/d$:`,
      v: factorTable,
      ul: ['In a liquid of refractive index $n$, the wavelength becomes $\\lambda/n$, so $\\beta\' = \\beta/n$.', 'With **white light** the central fringe is white (zero path difference for every colour); the next fringes are coloured, blue inside and red outside, and the pattern soon blurs.'],
      n: 'The formula tells you everything. Longer wavelengths make wider fringes, so red fringes are wider than blue. Moving the screen back or bringing the slits closer also widens the fringes. Immerse the apparatus in water and the wavelength shrinks by the refractive index, so the fringes squeeze together. With white light every colour has a bright centre, so the middle fringe is white, edged with colours.',
    }),
    sl('example', 'Worked example 5: measuring a wavelength', {
      b: r`With $d = 0.40$ mm and $D = 1.2$ m, ten fringe widths are found to span 16.5 mm. Find the wavelength. What is the fringe width if the apparatus is placed in water ($n = 1.33$)?`,
      ul: [
        r`Step 1 — $\beta = \dfrac{16.5}{10} = ${dec(ex5.beta * 1e3, 3)}$ mm.`,
        r`Step 2 — $\lambda = \dfrac{\beta d}{D} = \dfrac{1.65 \times 10^{-3} \times 0.40 \times 10^{-3}}{1.2} = ${sci(ex5.lam, 2)}$ m (550 nm).`,
        r`Step 3 — in water $\beta' = \dfrac{\beta}{n} = \dfrac{1.65}{1.33} = ${dec(ex5.betaW * 1e3, 3)}$ mm.`,
      ],
      v: factorTable,
      n: 'Measuring across ten fringes and dividing by ten gives a more accurate fringe width, one point six five millimetres. Rearranging the formula, the wavelength is beta d over D: five point five times ten to the minus seven metre, five hundred and fifty nanometres, green light. In water the wavelength, and so the fringe width, is divided by one point three three, about one point two four millimetres.',
    }),
    sl('check', 'Quick check: under water', {
      b: 'Choose the correct option.',
      v: factorTable,
      chk: 'immerse-mcq',
      n: 'What happens to the wavelength of light in water, and how does the fringe width depend on it?',
    }),
    sl('diagram', 'Diffraction at a single slit', {
      b: 'Light passing through a slit of width $a$ comparable to $\\lambda$ **spreads** into the geometrical shadow: **diffraction**. Treat each point of the slit as a source of wavelets (Huygens):',
      ul: ['Straight ahead ($\\theta = 0$) all wavelets are in phase: bright **central maximum**.', 'At $a\\sin\\theta = \\lambda$, divide the slit into two halves; each wavelet in the upper half cancels its partner in the lower half: **first minimum**.', 'Minima at $a\\sin\\theta = n\\lambda$ ($n = \\pm1, \\pm2, \\dots$); weak secondary maxima roughly halfway between.'],
      v: V.ss,
      n: 'Shine light through one narrow slit and it spreads out. Each point across the slit sends out wavelets. Straight ahead they all arrive in step, giving a bright centre. At the angle where the edge rays differ by one wavelength, pair each point in the top half with the point half a slit width below it: their paths differ by half a wavelength, so every pair cancels and the first dark band appears.',
    }),
    sl('diagram', 'The single-slit pattern', {
      b: r`The first minima lie at $\theta \approx \pm\dfrac{\lambda}{a}$, so the central maximum has angular width $\dfrac{2\lambda}{a}$ and linear width $\dfrac{2\lambda D}{a}$ on a screen at distance $D$.`,
      ul: ['The central maximum is **twice as wide** as each secondary maximum and much brighter; the secondary maxima fade quickly.', 'A **narrower** slit or a **longer** wavelength gives a **wider** pattern.', 'Diffraction is noticeable only when $a$ is not much larger than $\\lambda$.'],
      v: ssPlot,
      n: 'Here is the intensity across the pattern. The central maximum stretches from minus lambda over a to plus lambda over a, so its angular width is two lambda over a. Beyond it are much fainter secondary maxima, each half as wide. Notice the surprise: making the slit narrower makes the pattern wider. That is why diffraction of light is only seen with very narrow slits.',
    }),
    sl('example', 'Worked example 6: width of the central maximum', {
      b: r`Light of wavelength 600 nm falls on a slit 0.20 mm wide. Find the angle of the first minimum and the width of the central maximum on a screen 2.0 m away.`,
      ul: [
        r`Step 1 — $\theta_1 = \dfrac{\lambda}{a} = \dfrac{600 \times 10^{-9}}{0.20 \times 10^{-3}} = ${sci(ex6.th, 2)}$ rad.`,
        r`Step 2 — $y_1 = D\theta_1 = 2.0 \times ${sci(ex6.th, 2)} = ${sci(ex6.y1, 2)}$ m (6.0 mm).`,
        r`Step 3 — width of central maximum $= 2y_1 = ${dec(ex6.width * 1e3, 2)}$ mm.`,
      ],
      v: ssPlot,
      n: 'The first minimum is at lambda over a, three thousandths of a radian, a very small angle, so the distance on the screen is just D times the angle: six millimetres. The central maximum runs from six millimetres below the centre to six millimetres above, twelve millimetres wide. Compare this with the three millimetre fringes of the double slit in example four.',
    }),
    sl('two-column', 'Interference and diffraction compared', {
      b: 'Both are superposition of waves; they differ in the sources and the pattern:',
      cols: [
        '**Double-slit interference**\n- Two coherent sources\n- Fringes equally wide\n- Bright fringes equally bright\n- Fringe width λD/d',
        '**Single-slit diffraction**\n- Wavelets from one wavefront across one slit\n- Central maximum twice as wide\n- Intensity falls off fast\n- Central width 2λD/a',
      ],
      v: ssPlot,
      n: 'Interference and diffraction are both superposition. In interference we add waves from two coherent sources, and get equally spaced, equally bright fringes. In diffraction we add the wavelets from every point across a single slit, and get a broad, bright centre with faint, narrower side maxima. In a real double-slit experiment both happen: the double-slit fringes sit inside the diffraction pattern of each slit.',
    }),
    sl('check', 'Quick check: narrower slit', {
      b: 'Choose the correct option.',
      v: ssPlot,
      chk: 'narrow-mcq',
      n: 'How does the width of the central maximum depend on the slit width?',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Bright fringes', '$y_n = n\\lambda D/d$'],
          ['Dark fringes', '$y = (n + \\tfrac12)\\lambda D/d$'],
          ['Fringe width', '$\\beta = \\lambda D/d$; angular width $\\lambda/d$'],
          ['In a liquid', '$\\beta\' = \\beta/n$'],
          ['Single-slit minima', '$a\\sin\\theta = n\\lambda$'],
          ['Central maximum', 'angular width $2\\lambda/a$, linear width $2\\lambda D/a$'],
        ],
        'Summary table of fringe positions, fringe width, effect of a liquid, single-slit minima and width of the central maximum',
      ),
      n: 'To sum up: in Young’s experiment bright fringes sit at n lambda D over d and dark ones halfway between, all one fringe width, lambda D over d, apart. The fringes widen with wavelength and screen distance and narrow with slit separation or in a liquid. A single slit gives minima where a sine theta is a whole number of wavelengths, and a central maximum two lambda over a wide in angle.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'Convert nm, mm and cm to metres before using $\\beta = \\lambda D/d$.',
        'Count carefully: the $n$th dark fringe is at $(n - \\tfrac12)\\beta$ from the centre.',
        'Central maximum: angular width $2\\lambda/a$, not $\\lambda/a$.',
        'State that a narrower slit gives a **wider** central maximum.',
      ],
      v: table(['Asked', 'Key point'], [['Why is the central fringe white with white light?', 'Zero path difference for all colours'], ['Fringes in water?', 'Narrower by a factor n'], ['Can diffraction of light be seen through a wide window?', 'No: a ≫ λ']], 'Table of common questions and the key point for each'),
      n: 'Most lost marks in this topic come from units, so convert every length to metres first. Be careful with counting: the first dark fringe is half a fringe width from the centre, the second is one and a half. The central maximum of a single slit spans two lambda over a in angle. And remember the counter-intuitive result: narrowing the slit widens the pattern.',
    }),
  ],
});
