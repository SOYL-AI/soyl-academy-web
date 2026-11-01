// ISC 12 Physics ch14 Refraction and Dispersion by a Prism — two decks: Part 1 (t01–t02) refraction through a prism,
// r1 + r2 = A, δ = i + e − A, the i–δ graph, the limits of emergence, minimum deviation and n = sin((A + δm)/2)/sin(A/2);
// Part 2 (t03–t04) the thin prism δ = (n − 1)A, dispersion, angular dispersion, dispersive power and the rainbow
// (ray diagram and simple explanation; its derivation is not part of the syllabus). Numbers computed here.
import { sl, deck, table, flow, svgV, plot, r, dec } from '../../isc-12-physics-ch01/src/lib.mjs';
import * as G from './svgs.mjs';

const { prismRay, minDev, nFromMin, critical, iGrazing } = G;
const rad = (d) => (d * Math.PI) / 180;

// ---------------------------------------------------------------- worked-example numbers
const ex1 = { A: 60, n: 1.52, i: 40 };
Object.assign(ex1, prismRay(ex1.A, ex1.n, ex1.i));
const ex2 = { A: 60, n: 1.52, big: 85 };
ex2.C = critical(ex2.n);
ex2.ig = iGrazing(ex2.A, ex2.n);
ex2.min = minDev(ex2.A, ex2.n);
const ex3 = { A: 60, dm: 50 };
ex3.n = nFromMin(ex3.A, ex3.dm);
ex3.i = (ex3.A + ex3.dm) / 2;
const ex4 = { A: 60, dm: 27 };
ex4.n = nFromMin(ex4.A, ex4.dm);
ex4.i = (ex4.A + ex4.dm) / 2;
const ex5 = { A: 4, n: 1.6 };
ex5.d = (ex5.n - 1) * ex5.A;
ex5.exact = prismRay(ex5.A, ex5.n, 0).d;
const ex6 = { A: 6, n: 1.56, nw: 1.33 };
ex6.air = (ex6.n - 1) * ex6.A;
ex6.rel = ex6.n / ex6.nw;
ex6.water = (ex6.rel - 1) * ex6.A;
const ex7 = { A: 8, nr: 1.514, nv: 1.532 };
ex7.ny = (ex7.nr + ex7.nv) / 2;
ex7.dr = (ex7.nr - 1) * ex7.A;
ex7.dv = (ex7.nv - 1) * ex7.A;
ex7.theta = ex7.dv - ex7.dr;
ex7.d = (ex7.ny - 1) * ex7.A;
ex7.w = ex7.theta / ex7.d;
const disp = G.DISP_DATA.colours.map(([nm, n]) => ({ nm, n, ...prismRay(G.DISP_DATA.A, n, G.DISP_DATA.i) }));
export const EX = { ex1, ex2, ex3, ex4, ex5, ex6, ex7, disp };

export const V = {
  parts: svgV(G.PARTS, 'Principal section of a prism with its refracting faces, refracting edge, refracting angle and base'),
  geom: svgV(G.GEOM, 'Ray through a prism with the angles i, r1, r2, e and the deviation, normals meeting at N'),
  mindev: svgV(G.MINDEV, 'Symmetric path through an equilateral prism at minimum deviation'),
  limits: svgV(G.LIMITS, 'Three rays through one prism: emerging, grazing out, and totally reflected at the second face'),
  thin: svgV(G.THIN, 'Thin prism deviating rays at different incidences by almost the same angle'),
  disp: svgV(G.DISP, 'White light dispersed by a flint glass prism into red, yellow and violet'),
  newton: svgV(G.NEWTON, 'An inverted second prism bringing the dispersed colours back parallel'),
  drop: svgV(G.DROP, 'Path of sunlight through a raindrop forming the primary rainbow'),
  sky: svgV(G.SKY, 'Observer with the sun behind, receiving red from higher drops and violet from lower drops'),
};

// ---------------------------------------------------------------- plots
const devExpr = (A, n) => `x + asin(${n}sin(${A}*pi/180 - asin(sin(x*pi/180)/${n})))*180/pi - ${A}`;
const dAt = (i) => Number(prismRay(60, 1.52, i).d.toFixed(2));
export const devPlot = plot(
  {
    x: { min: 25, max: 90, label: 'angle of incidence i (degrees)' },
    y: { min: 30, max: 65, label: 'angle of deviation δ (degrees)' },
    functions: [{ expr: devExpr(60, 1.52), label: 'A = 60°, n = 1.52 (traced with Snell’s law)', domain: [29.5, 90] }],
    hlines: [{ y: Number(ex2.min.dm.toFixed(2)), label: `δm = ${ex2.min.dm.toFixed(1)}°`, dashed: true }],
    points: [
      { at: [Number(ex2.min.i.toFixed(2)), dAt(ex2.min.i)], label: `minimum at i = ${ex2.min.i.toFixed(1)}°` },
      { at: [40, dAt(40)], label: 'i = 40°' },
      { at: [Number(ex1.e.toFixed(2)), dAt(ex1.e)], label: `i = ${ex1.e.toFixed(1)}°: same δ` },
      { at: [90, dAt(90)], label: 'grazing incidence' },
    ],
  },
  'Graph of the angle of deviation against the angle of incidence for a 60 degree prism of refractive index 1.52: the deviation falls from about 59 degrees, reaches a minimum of about 38.9 degrees at an incidence of about 49.5 degrees, and rises again; 40 degrees and 60.6 degrees give the same deviation',
  'Apart from the minimum, each deviation occurs for two angles of incidence, i and e.',
);
const thinAt = (i) => Number(prismRay(8, 1.523, i).d.toFixed(3));
export const thinPlot = plot(
  {
    x: { min: 0, max: 40, label: 'angle of incidence i (degrees)' },
    y: { min: 3.5, max: 6, label: 'deviation δ (degrees)' },
    functions: [{ expr: devExpr(8, 1.523), label: 'thin prism, A = 8°, n = 1.523 (exact)', domain: [0, 40] }],
    hlines: [{ y: Number(((1.523 - 1) * 8).toFixed(3)), label: '(n − 1)A = 4.18°', dashed: true }],
    points: [
      { at: [0, thinAt(0)], label: `i = 0°: ${thinAt(0).toFixed(2)}°` },
      { at: [10, thinAt(10)], label: `i = 10°: ${thinAt(10).toFixed(2)}°` },
      { at: [40, thinAt(40)], label: `i = 40°: ${thinAt(40).toFixed(2)}°` },
    ],
  },
  'Graph of the exact deviation of a thin prism of angle 8 degrees and refractive index 1.523 against the angle of incidence: it stays within about one and a half per cent of 4.18 degrees for incidences up to about 12 degrees, and only rises noticeably beyond 20 degrees',
  'For small angles of incidence δ ≈ (n − 1)A.',
);
const cauchy = (l) => Number((1.5046 + 4200 / (l * l)).toFixed(4));
export const nPlot = plot(
  {
    x: { min: 380, max: 760, label: 'wavelength in air (nm)' },
    y: { min: 1.505, max: 1.54, label: 'refractive index n' },
    functions: [{ expr: '1.5046 + 4200/x^2', label: 'a crown glass', domain: [380, 760] }],
    points: [
      { at: [400, cauchy(400)], label: `violet 400 nm: ${cauchy(400)}` },
      { at: [589, cauchy(589)], label: `yellow 589 nm: ${cauchy(589)}` },
      { at: [700, cauchy(700)], label: `red 700 nm: ${cauchy(700)}` },
    ],
  },
  'Graph of the refractive index of a crown glass against wavelength: it falls from about 1.531 for violet light at 400 nanometres to about 1.513 for red light at 700 nanometres, so violet is refracted more than red',
  'Shorter wavelength, larger n, larger deviation.',
);

// ---------------------------------------------------------------- tables
const glassTable = table(
  ['Material', 'n (red)', 'n (yellow)', 'n (violet)', 'Dispersive power ω'],
  [
    ['Crown glass', '1.514', '1.523', '1.532', '0.034'],
    ['Flint glass', '1.642', '1.655', '1.668', '0.040'],
    ['Water', '1.331', '1.337', '1.343', '0.036'],
  ],
  'Table of refractive indices for red, yellow and violet light with the dispersive power: crown glass 1.514, 1.523, 1.532 and 0.034; flint glass 1.642, 1.655, 1.668 and 0.040; water 1.331, 1.337, 1.343 and 0.036',
);
const sugarTable = table(
  ['Reading', 'Value'],
  [
    ['Angle of the hollow prism A', '60.0°'],
    ['Minimum deviation δm', '27.0°'],
    ['(A + δm)/2', '43.5°'],
    ['n = sin 43.5° / sin 30.0°', dec(ex4.n, 3)],
  ],
  `Worked table: a hollow prism of angle 60 degrees filled with sugar solution gives a minimum deviation of 27 degrees, so the refractive index is sine 43.5 degrees over sine 30 degrees, about ${dec(ex4.n, 3)}`,
);
const waterTable = table(
  ['Surroundings', 'Relative index', 'Deviation (n − 1)A'],
  [
    ['Air', '1.56', `${dec(ex6.air, 3)}°`],
    ['Water (1.33)', `1.56/1.33 = ${dec(ex6.rel, 3)}`, `${dec(ex6.water, 3)}°`],
    ['Liquid of n = 1.56', '1', '0° (prism invisible)'],
  ],
  `Worked table: a thin prism of angle 6 degrees and index 1.56 deviates light by ${dec(ex6.air, 3)} degrees in air, ${dec(ex6.water, 3)} degrees in water, and not at all in a liquid of the same index`,
);
const crownTable = table(
  ['Quantity', 'Working', 'Value'],
  [
    ['Deviation of red', '0.514 × 8.0°', `${dec(ex7.dr, 3)}°`],
    ['Deviation of violet', '0.532 × 8.0°', `${dec(ex7.dv, 3)}°`],
    ['Angular dispersion', '(1.532 − 1.514) × 8.0°', `${dec(ex7.theta, 3)}°`],
    ['Mean deviation', '0.523 × 8.0°', `${dec(ex7.d, 3)}°`],
    ['Dispersive power', '0.144 / 4.184', dec(ex7.w, 3)],
  ],
  'Worked table for an 8 degree crown glass prism: red deviated 4.11 degrees, violet 4.26 degrees, angular dispersion 0.144 degrees, mean deviation 4.18 degrees, dispersive power 0.0344',
);

// ---------------------------------------------------------------- Part 1
export const deck1 = deck({
  part: 1,
  title: 'Prism — Part 1: Refraction through a prism and minimum deviation',
  goals: [
    'Trace a ray through a prism and prove that r1 + r2 = A and δ = i + e − A',
    'Interpret the graph of deviation against angle of incidence, including the limits of emergence',
    'Derive n = sin((A + δm)/2)/sin(A/2) and use it to find refractive indices',
  ],
  slides: [
    sl('title', 'Refraction through a Prism', {
      b: 'Part 1 — how a prism bends light, the angle of deviation, and the special symmetric path of minimum deviation.',
      v: V.parts,
      n: 'A glass prism on a laboratory bench turns a beam of light sharply aside, and it is also the heart of the spectrometer you will use to measure refractive index. In this part we follow a ray through a prism face by face, find a simple rule for how much it is turned, see how that depends on the angle of incidence, and use the symmetric path of minimum deviation to measure the refractive index.',
    }),
    sl('concept', 'The parts of a prism', {
      b: 'A **prism** is a transparent block with two plane **refracting faces** inclined to each other.',
      ul: [
        '**Refracting edge:** the line where the two faces meet. **Refracting angle A** (angle of the prism): the angle between the faces.',
        '**Base:** the face opposite the refracting edge.',
        '**Principal section:** a cut at right angles to the edge; we draw rays in this plane.',
        'For a prism denser than its surroundings, a ray is bent **towards the base** at both faces.',
      ],
      v: V.parts,
      n: 'A prism has two flat refracting faces that meet along the refracting edge. The angle between them is the refracting angle, A, sometimes called the angle of the prism. The face opposite the edge is the base. We always draw the triangle you get by cutting the prism at right angles to its edge. When the prism is optically denser than the air around it, light is bent towards the base at both faces.',
    }),
    sl('diagram', 'Tracing a ray through a prism', {
      b: r`A ray meets the first face at angle of incidence $i$, refracts at $r_1$, crosses the prism, meets the second face at $r_2$ and leaves at the angle of emergence $e$. Snell’s law at each face:
$$\sin i = n\sin r_1 \qquad n\sin r_2 = \sin e$$`,
      ul: ['All four angles are measured from the **normals** to the faces, not from the faces.', 'The **angle of deviation δ** is the angle between the incident ray produced forward and the emergent ray.'],
      v: V.geom,
      n: 'Follow one ray. At the first face it meets the normal at the angle of incidence i and bends towards the normal to the angle r one. Inside, it meets the second face at r two, measured from the normal there, and leaves at the angle of emergence e, bending away from that normal. Snell’s law holds at each face. The angle between the original direction and the final direction is the angle of deviation.',
    }),
    sl('diagram', 'Two key relations: r₁ + r₂ = A and δ = i + e − A', {
      b: r`**Normals:** in the quadrilateral formed by the refracting edge, Q, N and R, the angles at Q and R are 90°, so $\angle QNR = 180^\circ - A$. In triangle QNR, $r_1 + r_2 + (180^\circ - A) = 180^\circ$:
$$r_1 + r_2 = A$$
**Deviation:** at Q the ray turns by $(i - r_1)$, at R by $(e - r_2)$; these are the two inside angles of triangle QDR at Q and R, so the exterior angle at D is
$$\delta = (i - r_1) + (e - r_2) = i + e - A$$`,
      v: V.geom,
      n: 'Two facts follow from geometry. The normals at the two faces meet at N, and the quadrilateral with the refracting edge has right angles at Q and R, so the angle at N is one hundred and eighty degrees minus A. The triangle formed by Q, N and R then gives r one plus r two equals A. The ray turns by i minus r one at the first face and by e minus r two at the second, so the total deviation is i plus e minus A.',
    }),
    sl('example', 'Worked example 1: following a ray', {
      b: 'A ray meets one face of a 60° prism of crown glass (n = 1.52) at 40°. Find r₁, r₂, the angle of emergence and the deviation.',
      ul: [
        r`Step 1 — $\sin r_1 = \dfrac{\sin 40^\circ}{1.52} = ${dec(Math.sin(rad(40)) / 1.52, 3)}$, so $r_1 = ${dec(ex1.r1, 3)}^\circ$.`,
        r`Step 2 — $r_2 = A - r_1 = 60^\circ - ${dec(ex1.r1, 3)}^\circ = ${dec(ex1.r2, 3)}^\circ$.`,
        r`Step 3 — $\sin e = 1.52 \times \sin ${dec(ex1.r2, 3)}^\circ = ${dec(1.52 * Math.sin(rad(ex1.r2)), 3)}$, so $e = ${dec(ex1.e, 3)}^\circ$.`,
        r`Step 4 — $\delta = i + e - A = 40^\circ + ${dec(ex1.e, 3)}^\circ - 60^\circ = ${dec(ex1.d, 3)}^\circ$.`,
      ],
      v: V.geom,
      n: 'The sine of r one is the sine of forty degrees over one point five two, so r one is about twenty five degrees. Since r one plus r two equals sixty, r two is about thirty five degrees. At the second face, one point five two times the sine of thirty five degrees gives an emergence angle of about sixty point six degrees. The deviation is forty plus sixty point six minus sixty, about forty point six degrees.',
    }),
    sl('check', 'Quick check: angles inside the prism', {
      b: 'Choose the correct option.',
      v: V.geom,
      chk: 'r1r2-mcq',
      n: 'Inside the prism, the two refraction angles always add up to the refracting angle.',
    }),
    sl('diagram', 'How deviation depends on the angle of incidence', {
      b: 'Tracing the ray for many values of i gives the **i–δ graph**:',
      v: devPlot,
      ul: [
        'δ is large near grazing emergence, **falls to a minimum δm**, then rises again towards grazing incidence.',
        r`Light paths are reversible: a ray entering at $i$ and leaving at $e$ has the same δ as one entering at $e$ and leaving at $i$. So each δ above δm occurs at **two** incidences.`,
        'At the minimum the two coincide: $i = e$.',
      ],
      n: 'If we repeat the calculation for many angles of incidence, the deviation first falls, reaches a smallest value called the angle of minimum deviation, and then rises again, giving a U shaped curve that is not quite symmetric. Because light can retrace its path, swapping the angles of incidence and emergence gives the same deviation, so forty degrees and sixty point six degrees deviate this prism equally. At the bottom, the two angles are equal.',
    }),
    sl('check', 'Quick check: reading the graph', {
      b: 'Choose the correct option.',
      v: devPlot,
      chk: 'pair-mcq',
      n: 'Use the reversibility of light: swapping the angles of incidence and emergence leaves the deviation unchanged.',
    }),
    sl('concept', 'When does light get out of the second face?', {
      b: r`At the second face the light goes from glass to air, so it can be totally reflected. It leaves only if $r_2 \le C$, where $\sin C = 1/n$.`,
      ul: [
        r`Since $r_2 = A - r_1$, emergence needs $r_1 \ge A - C$: the least angle of incidence is given by $\sin i = n\sin(A - C)$. At that angle the ray **grazes** out along the second face ($e = 90^\circ$).`,
        r`$r_1$ can never exceed C (even at $i = 90^\circ$), so $r_2 \ge A - C$. If $A > 2C$, then $r_2 > C$ for every ray: **no light emerges** from the second face.`,
      ],
      v: V.limits,
      n: 'Light leaving through the second face goes from glass into air, so it can be trapped by total internal reflection. It escapes only if r two is no bigger than the critical angle. Small angles of incidence make r two large, so there is a least angle of incidence, at which the ray just grazes out along the face. And because r one can never exceed the critical angle, a prism whose angle is more than twice the critical angle lets no ray out of its second face at all.',
    }),
    sl('example', 'Worked example 2: the limits of emergence', {
      b: 'For the 60° crown glass prism (n = 1.52), find the critical angle and the least angle of incidence for which light emerges from the second face. Could light pass through two faces of an 85° prism of the same glass?',
      ul: [
        r`Step 1 — $\sin C = \dfrac{1}{1.52}$, so $C = ${dec(ex2.C, 3)}^\circ$.`,
        r`Step 2 — grazing emergence: $r_2 = C$, $r_1 = 60^\circ - ${dec(ex2.C, 3)}^\circ = ${dec(60 - ex2.C, 3)}^\circ$, $\sin i = 1.52\sin ${dec(60 - ex2.C, 3)}^\circ = ${dec(Math.sin(rad(ex2.ig)), 3)}$, so $i = ${dec(ex2.ig, 3)}^\circ$.`,
        r`Step 3 — $2C = ${dec(2 * ex2.C, 3)}^\circ < 85^\circ$: an 85° prism of this glass lets **no** light out of its second face.`,
      ],
      v: V.limits,
      n: 'One over one point five two gives a critical angle of about forty one point one degrees. For grazing emergence r two equals the critical angle, so r one is sixty minus forty one point one, about eighteen point nine degrees, and the angle of incidence is about twenty nine point four degrees. Any smaller angle and the light is totally reflected inside. Twice the critical angle is about eighty two degrees, less than eighty five, so the wider prism would trap every ray.',
    }),
    sl('check', 'Quick check: a very wide prism', {
      b: 'Choose the correct option.',
      v: V.limits,
      chk: 'noemerge-ar',
      n: 'Compare the refracting angle with twice the critical angle.',
    }),
    sl('diagram', 'Minimum deviation: the symmetric path', {
      b: r`At minimum deviation the ray passes **symmetrically**: $i = e$, so $r_1 = r_2$, and with $r_1 + r_2 = A$:
$$r_1 = r_2 = \dfrac{A}{2}$$
In an isosceles or equilateral prism the ray inside then runs **parallel to the base**.`,
      ul: ['Why symmetric? If the minimum were at some i ≠ e, reversing the ray would give a second, equal minimum at i and e swapped; a curve with one minimum must have it where the two coincide.'],
      v: V.mindev,
      n: 'At the bottom of the curve the path through the prism is symmetric. The angle of incidence equals the angle of emergence, so the two inside angles are equal too, and since they add up to A, each is half of A. In an equilateral prism the ray inside then runs parallel to the base. The symmetry follows from reversibility: the single lowest point must be the one where incidence and emergence can be swapped without change.',
    }),
    sl('concept', 'Deriving the prism formula', {
      b: r`At minimum deviation $\delta = \delta_m$, $i = e$ and $r_1 = r_2 = r$.
From $r_1 + r_2 = A$: $r = \dfrac{A}{2}$. From $\delta = i + e - A$: $\delta_m = 2i - A$, so $i = \dfrac{A + \delta_m}{2}$.
Snell’s law at the first face, $n = \dfrac{\sin i}{\sin r}$:
$$n = \dfrac{\sin\left(\dfrac{A + \delta_m}{2}\right)}{\sin\left(\dfrac{A}{2}\right)}$$`,
      ul: ['Only two angles need to be measured, A and δm, both easily read on a spectrometer.', 'For a given A, a larger n gives a larger δm.'],
      v: V.mindev,
      n: 'Put the symmetric conditions into the two prism relations. The inside angle r is half of A. The deviation becomes twice i minus A, so i is A plus the minimum deviation, all over two. Snell’s law at the first face then gives the refractive index as the sine of half of A plus delta m, divided by the sine of half of A. Only the prism angle and the minimum deviation are needed.',
    }),
    sl('example', 'Worked example 3: an equilateral prism', {
      b: 'An equilateral prism of dense glass gives a minimum deviation of 50.0° for yellow light. Find the refractive index of the glass and the angle of incidence at minimum deviation.',
      ul: [
        r`Step 1 — $\dfrac{A + \delta_m}{2} = \dfrac{60^\circ + 50^\circ}{2} = 55^\circ$; this is also the angle of incidence.`,
        r`Step 2 — $n = \dfrac{\sin 55^\circ}{\sin 30^\circ} = \dfrac{${dec(Math.sin(rad(55)), 4)}}{0.5} = ${dec(ex3.n, 3)}$.`,
        r`Check — inside, $r = 30^\circ$ and $${dec(ex3.n, 3)} \times \sin 30^\circ = ${dec(ex3.n / 2, 3)} = \sin 55^\circ$.`,
      ],
      v: V.mindev,
      n: 'Add the prism angle and the minimum deviation, sixty plus fifty, and halve it: fifty five degrees, which is also the angle of incidence. Half the prism angle is thirty degrees. The refractive index is the sine of fifty five degrees over the sine of thirty degrees, about one point six four. As a check, that index times the sine of thirty degrees gives back the sine of fifty five degrees.',
    }),
    sl('example', 'Worked example 4: the index of a liquid', {
      b: 'A hollow prism with thin glass walls and a refracting angle of 60.0° is filled with a sugar solution. On a spectrometer it gives a minimum deviation of 27.0°. Find the refractive index of the solution.',
      ul: [
        r`The thin parallel-sided walls do not deviate the light, so the liquid acts as the prism.`,
        r`$n = \dfrac{\sin\frac{60^\circ + 27^\circ}{2}}{\sin 30^\circ} = \dfrac{\sin 43.5^\circ}{0.5} = ${dec(ex4.n, 3)}$.`,
      ],
      v: sugarTable,
      n: 'The glass walls are thin and have parallel sides, so they only shift the light slightly and do not turn it. The liquid inside behaves as the prism. Half of sixty plus twenty seven is forty three and a half degrees. The sine of that divided by the sine of thirty degrees gives a refractive index of about one point three eight, a little more than that of pure water.',
    }),
    sl('check', 'Quick check: refractive index from δm', {
      b: 'Calculate the refractive index.',
      v: V.mindev,
      chk: 'mindev-num',
      n: 'Halve the sum of the prism angle and the minimum deviation, take its sine, and divide by the sine of half the prism angle.',
    }),
    sl('concept', 'Measuring n with a spectrometer', {
      b: 'The prism stands on the turntable of a spectrometer, lit by a narrow parallel beam from the collimator.',
      v: flow(
        'LR',
        [['a', 'Measure A from the beams reflected off the two faces'], ['b', 'Turn the table: the image moves, stops, turns back'], ['c', 'At the turning point read δm'], ['d', 'n = sin((A + δm)/2)/sin(A/2)']],
        [['a', 'b'], ['b', 'c'], ['c', 'd']],
        'Flow chart of the spectrometer method: measure the prism angle, rotate the table until the image of the slit stops and turns back, read the minimum deviation there, then calculate the refractive index',
      ),
      ul: ['Near the minimum δ hardly changes with i, so a small error in setting the table hardly affects δm: the reading is precise and easy to find.'],
      n: 'In the laboratory the prism sits on the turntable of a spectrometer. First measure its angle. Then watch the image of the slit through the telescope while slowly turning the table: the image moves towards the straight-through direction, stops, and then moves back. The turning point is the minimum deviation. Because the curve is flat there, a small error in setting the table hardly changes the reading.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Snell at each face', '$\\sin i = n\\sin r_1$, $n\\sin r_2 = \\sin e$'],
          ['Geometry', '$r_1 + r_2 = A$; $\\delta = i + e - A$'],
          ['i–δ graph', 'U-shaped; each δ > δm at two incidences (i and e)'],
          ['Emergence', '$r_2 \\le C$; least $i$: $\\sin i = n\\sin(A - C)$; none if $A > 2C$'],
          ['Minimum deviation', '$i = e$, $r = A/2$, ray parallel to base'],
          ['Prism formula', '$n = \\sin\\frac{A + \\delta_m}{2} \\big/ \\sin\\frac{A}{2}$'],
        ],
        'Summary table of Snell’s law at the two faces, the relations r1 plus r2 equals A and delta equals i plus e minus A, the i delta graph, the condition for emergence and the minimum deviation formula',
      ),
      n: 'To sum up: Snell’s law applies at each face, the two inside angles add up to the prism angle, and the deviation is i plus e minus A. The deviation graph is U shaped, with each deviation above the minimum occurring at two angles of incidence. Light leaves the second face only if r two is within the critical angle. At minimum deviation the path is symmetric and the refractive index follows from A and delta m.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'In the derivation, name the quadrilateral (two right angles) and the triangle; state reversibility for i = e.',
        'Write i = (A + δm)/2 and r = A/2 before using Snell’s law.',
        'Measure every angle from the normal; check that r₁ + r₂ = A in your numbers.',
        'For "no emergence" questions compare r₂ with the critical angle, or A with 2C.',
      ],
      v: table(['Asked', 'Key point'], [['Ray retraces from a silvered second face?', 'Meets it normally: r₁ = A'], ['Normal incidence on the first face?', 'r₁ = 0, so r₂ = A'], ['Prism in water?', 'Use n(glass)/n(water): δm smaller']], 'Table of common questions and the key point for each'),
      n: 'In derivations, name the quadrilateral with two right angles and the triangle you use, and say why the path is symmetric at minimum deviation. Before using Snell’s law there, write the angle of incidence as A plus delta m over two and the inside angle as half of A. Always measure angles from the normal, and check that your two inside angles add up to A. For emergence questions, compare r two with the critical angle.',
    }),
  ],
});

// ---------------------------------------------------------------- Part 2
export const deck2 = deck({
  part: 2,
  title: 'Prism — Part 2: Thin prisms, dispersion and the rainbow',
  goals: [
    'Show that a thin prism deviates light by (n − 1)A and use it in air and in liquids',
    'Explain dispersion and calculate angular dispersion and dispersive power',
    'Explain, with a ray diagram, how raindrops form the primary rainbow',
  ],
  slides: [
    sl('title', 'Thin Prisms, Dispersion and the Rainbow', {
      b: 'Part 2 — a simple rule for thin prisms, why a prism spreads white light into colours, and how raindrops paint a rainbow.',
      v: V.disp,
      n: 'Newton let a narrow beam of sunlight through a hole in his shutter and a prism spread it into a band of colours. In this part we first find a very simple rule for the deviation produced by a thin prism. Then we see why different colours are deviated by different amounts, measure that spreading with the angular dispersion and the dispersive power, and finish with the most beautiful prism of all, the raindrop.',
    }),
    sl('concept', 'The thin prism: δ = (n − 1)A', {
      b: r`For a **thin prism** (A a few degrees) and small angles of incidence, all the angles are small and $\sin\theta \approx \theta$ (in radians). Snell’s law becomes $i = n r_1$ and $e = n r_2$, so
$$\delta = i + e - A = n(r_1 + r_2) - A = (n - 1)A$$`,
      ul: ['The deviation does **not depend on i** (for small i): every ray is turned by the same angle.', 'δ is proportional to A and to (n − 1).'],
      v: V.thin,
      n: 'When the prism angle is only a few degrees and light falls nearly normally, every angle in the problem is small, so each sine can be replaced by the angle itself. Snell’s law then says i equals n times r one, and e equals n times r two. Adding, and using r one plus r two equals A, the deviation becomes n minus one, times A. It no longer depends on the angle of incidence.',
    }),
    sl('diagram', 'How good is the thin-prism rule?', {
      b: 'The exact deviation of an 8.0° prism (n = 1.523), traced with Snell’s law, compared with (n − 1)A:',
      v: thinPlot,
      ul: ['Within about 1.5% of 4.18° for incidences up to about 12°.', 'At large angles of incidence the rule fails: the prism is then not "thin" for that ray.'],
      n: 'Here the exact deviation of an eight degree prism, worked out with Snell’s law at both faces, is plotted against the angle of incidence. Up to about twelve degrees it stays within about one and a half per cent of the simple value, four point one eight degrees. Only at large angles of incidence does it climb away. So the thin prism rule is excellent for the near-normal rays it is meant for.',
    }),
    sl('example', 'Worked example 5: a prism in spectacles', {
      b: 'An optometrist grinds a thin prism of refracting angle 4.0° into a spectacle lens of plastic with n = 1.60, to help a patient whose eyes do not point the same way. By how much does it deviate light?',
      ul: [
        r`$\delta = (n - 1)A = (1.60 - 1) \times 4.0^\circ = ${dec(ex5.d, 2)}^\circ$.`,
        r`Check with the exact formulae at normal incidence: $\delta = ${dec(ex5.exact, 3)}^\circ$, within about 1%.`,
      ],
      v: V.thin,
      n: 'The refractive index minus one is point six, and point six times four degrees gives a deviation of two point four degrees. Working it out exactly with Snell’s law at both faces for light falling normally gives almost the same value. Prisms like this, built into spectacles, shift the image slightly so that both eyes can look at the same thing comfortably.',
    }),
    sl('example', 'Worked example 6: the same prism under water', {
      b: 'A thin glass prism of angle 6.0° and n = 1.56 deviates light in air. Find the deviation in air and when the prism is under water (n = 1.33).',
      ul: [
        r`Air: $\delta = 0.56 \times 6.0^\circ = ${dec(ex6.air, 3)}^\circ$.`,
        r`Water: use the index relative to water, $\dfrac{1.56}{1.33} = ${dec(ex6.rel, 4)}$, so $\delta = (${dec(ex6.rel, 4)} - 1) \times 6.0^\circ = ${dec(ex6.water, 3)}^\circ$.`,
        'In a liquid of n = 1.56 the deviation would be zero and the prism would seem to vanish.',
      ],
      v: waterTable,
      n: 'In air the deviation is point five six times six degrees, about three point three six degrees. Under water what matters is the refractive index of the glass relative to the water, one point five six over one point three three, about one point one seven. So the deviation falls to about one degree. In a liquid with the same index as the glass there would be no bending at all.',
    }),
    sl('check', 'Quick check: a thin prism', {
      b: 'Calculate the deviation.',
      v: V.thin,
      chk: 'thin-num',
      n: 'Multiply n minus one by the refracting angle.',
    }),
    sl('diagram', 'Dispersion of white light', {
      b: 'White light is a mixture of colours. In glass the refractive index is **largest for violet** and **smallest for red**, so violet is deviated most:',
      ul: [
        `Traced: 60° flint prism, i = 50°: red (n = 1.62) δ = ${dec(disp[0].d, 3)}°, violet (n = 1.66) δ = ${dec(disp[2].d, 3)}°.`,
        '**Dispersion:** the splitting of white light into its colours (VIBGYOR) because n depends on colour.',
        'For a thick prism trace each colour separately; the simple (nᵥ − nᵣ)A holds only for thin prisms.',
      ],
      v: V.disp,
      n: 'White light is a mixture of colours, and glass slows violet light a little more than red light, so its refractive index is larger for violet. A larger index means a larger deviation. Tracing a ray through a sixty degree flint glass prism at fifty degrees, red is deviated by about forty eight point six degrees and violet by about fifty three point two. The colours fan out into a spectrum: this is dispersion.',
    }),
    sl('diagram', 'Refractive index depends on wavelength', {
      b: 'For glass, n falls steadily as the wavelength increases (normal dispersion):',
      v: nPlot,
      ul: ['In a vacuum all colours travel at c, so a vacuum shows no dispersion.', 'The speed in glass, v = c/n, is least for violet.'],
      n: 'The graph shows how the refractive index of a crown glass falls as the wavelength increases, from about one point five three for violet light to about one point five one for red. That small difference is all it takes to spread the colours. In a vacuum every colour travels at the same speed, so there is no dispersion there; in glass violet travels the slowest.',
    }),
    sl('diagram', 'Newton: undoing the dispersion', {
      b: 'A second, identical prism placed upside down bends every colour back by the same amount it was bent in the first:',
      ul: ['The colours leave **parallel** to the original beam; where they overlap, the light is white again.', 'So the prism does not make the colours: they were already in white light.'],
      v: V.newton,
      n: 'Newton placed a second identical prism upside down after the first. Each colour is bent back by exactly the amount the first prism bent it, so red and violet come out travelling parallel to the original beam, and where they overlap the light is white again. This showed that the prism does not create colours. It only sorts out colours that were already mixed in white light.',
    }),
    sl('concept', 'Angular dispersion and dispersive power', {
      b: r`For a thin prism, with $n_v$, $n_r$ and the mean (yellow) index $n$:
$$\theta = \delta_v - \delta_r = (n_v - n_r)A \qquad \delta = (n - 1)A$$
The **dispersive power** is the ratio of angular dispersion to mean deviation:
$$\omega = \dfrac{\delta_v - \delta_r}{\delta} = \dfrac{n_v - n_r}{n - 1}$$`,
      ul: ['ω has no unit and depends **only on the material**, not on A.', 'Flint glass has a larger ω than crown glass.'],
      v: glassTable,
      n: 'The angular dispersion is the angle between the violet and red rays. For a thin prism it is the difference of the two indices times A. The mean deviation, for yellow light, is n minus one times A. Their ratio is the dispersive power, omega, equal to the difference of the violet and red indices divided by the mean index minus one. The prism angle cancels, so omega depends only on the material.',
    }),
    sl('example', 'Worked example 7: a crown glass prism', {
      b: 'A thin prism of crown glass has A = 8.0°, with n = 1.514 for red and 1.532 for violet. Find the deviations of red and violet, the angular dispersion, the mean deviation and the dispersive power.',
      ul: [
        r`$\delta_r = 0.514 \times 8.0^\circ = ${dec(ex7.dr, 4)}^\circ$, $\delta_v = 0.532 \times 8.0^\circ = ${dec(ex7.dv, 4)}^\circ$.`,
        r`$\theta = ${dec(ex7.dv, 4)}^\circ - ${dec(ex7.dr, 4)}^\circ = ${dec(ex7.theta, 3)}^\circ$; mean index $\dfrac{1.514 + 1.532}{2} = ${dec(ex7.ny, 4)}$, $\delta = 0.523 \times 8.0^\circ = ${dec(ex7.d, 4)}^\circ$.`,
        r`$\omega = \dfrac{${dec(ex7.theta, 3)}}{${dec(ex7.d, 4)}} = ${dec(ex7.w, 3)}$ (or $\dfrac{0.018}{0.523}$).`,
      ],
      v: crownTable,
      n: 'Red is deviated by point five one four times eight, about four point one one degrees, and violet by point five three two times eight, about four point two six degrees. The difference, the angular dispersion, is only about point one four degrees. The mean index is one point five two three, giving a mean deviation of about four point one eight degrees, and the dispersive power is about point zero three four.',
    }),
    sl('check', 'Quick check: dispersive power', {
      b: 'Calculate the dispersive power.',
      v: glassTable,
      chk: 'omega-num',
      n: 'Divide the difference between the violet and red indices by the mean index minus one.',
    }),
    sl('diagram', 'The rainbow: inside one raindrop', {
      b: 'Sunlight entering a raindrop is **refracted** and **dispersed**, **reflected once** from the back of the drop, and **refracted** again as it leaves.',
      ul: [
        `Rays leaving the drop bunch up at about ${dec(G.BOW.red.phi, 3)}° (red) and ${dec(G.BOW.violet.phi, 3)}° (violet) from the antisolar direction, so these angles are seen brightly.`,
        'Only the ray diagram and this explanation are needed; the derivation of the angle is not part of the syllabus.',
      ],
      v: V.drop,
      n: 'A raindrop is a tiny sphere of water. Sunlight entering it is refracted and split into colours, reflected once from the back surface, and refracted again on the way out. Rays from different parts of the drop leave at different angles, but they crowd together at about forty two degrees from the direction pointing away from the sun for red light, and about forty degrees for violet. Those crowded directions look bright.',
    }),
    sl('diagram', 'Seeing the bow', {
      b: 'The sun must be **behind** the observer, with raindrops in front. Drops that lie about 42° from the antisolar direction send red to the eye; drops at about 40° send violet.',
      ul: ['Red therefore appears on the **outside** of the primary bow and violet on the inside.', 'All such drops lie on a cone around the antisolar direction: the bow is an arc of a circle.', 'A fainter **secondary** bow (two internal reflections) appears outside, at about 50°–54°, with the colours reversed.'],
      v: V.sky,
      n: 'To see a rainbow, stand with the sun behind you and rain in front. Every drop that lies about forty two degrees from the direction pointing away from the sun sends you red light; drops at about forty degrees send violet. So red is on the outside of the arc and violet on the inside. Light reflected twice inside the drops makes a fainter secondary bow, higher up, with its colours the other way round.',
    }),
    sl('check', 'Quick check: colours of the bow', {
      b: 'Choose the correct option.',
      v: V.sky,
      chk: 'bowred-mcq',
      n: 'Which colour leaves the drop at the larger angle from the antisolar direction?',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Thin prism', '$\\delta = (n - 1)A$, independent of i'],
          ['In a liquid', 'use $n_{glass}/n_{liquid}$ in place of n'],
          ['Dispersion', '$n_v > n_r$: violet deviated most'],
          ['Angular dispersion', '$\\theta = (n_v - n_r)A$'],
          ['Dispersive power', '$\\omega = (n_v - n_r)/(n - 1)$, material only'],
          ['Primary rainbow', 'refraction, one reflection, refraction; red ≈ 42°, violet ≈ 40°'],
        ],
        'Summary table of the thin prism deviation, the effect of a liquid, dispersion, angular dispersion, dispersive power and the primary rainbow',
      ),
      n: 'To sum up: a thin prism deviates light by n minus one times A, whatever the small angle of incidence, and in a liquid you use the index relative to the liquid. Because violet has the larger refractive index, it is deviated most. Angular dispersion is the difference of the indices times A, and dispersive power is that difference over n minus one. In the primary rainbow, red is outside at about forty two degrees.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'State the small-angle approximation when deriving δ = (n − 1)A.',
        'Use the mean (yellow) index for the mean deviation, not the red or violet one.',
        'Dispersive power is a pure number and does not depend on A: say so.',
        'Rainbow answers: sun behind the observer, refraction–reflection–refraction, red outside; no derivation needed.',
      ],
      v: table(['Asked', 'Key point'], [['Thin prism in water?', 'δ = (n/nw − 1)A'], ['Why a slab gives no spectrum?', 'Parallel faces: colours leave parallel'], ['Evening rainbow?', 'Sun in the west: look east']], 'Table of common questions and the key point for each'),
      n: 'When you derive the thin prism result, say clearly that the angles are small so the sines can be replaced by the angles. Use the mean index, for yellow light, when you find the mean deviation. Remember that dispersive power has no unit and depends only on the material. In rainbow answers describe the path in the drop, keep the sun behind the observer, and say that red is outside.',
    }),
  ],
});
