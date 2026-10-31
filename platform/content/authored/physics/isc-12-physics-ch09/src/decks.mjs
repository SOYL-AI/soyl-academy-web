// ISC 12 Physics ch09 Magnetism and Matter — two decks: Part 1 (t01–t03) the bar magnet and its equivalent solenoid,
// magnetic and electric field lines, the end-on and broadside-on fields of a magnetic dipole, the torque on a magnet,
// magnetic flux and its units; Part 2 (t04–t05) M, H, χ and μr, dia-, para- and ferromagnetism, Curie's law and the
// Curie temperature, electromagnets, the B–H loop and the choice of magnetic materials. Numbers computed here.
import { sl, deck, table, svgV, plot, r, sci, dec } from '../../isc-12-physics-ch01/src/lib.mjs';
import * as G from './svgs.mjs';

export const MU0 = 4 * Math.PI * 1e-7;
export const KM = 1e-7; // μ0/4π, T m A⁻¹
// ---------------------------------------------------------------- worked-example numbers
const ex1 = { m: 0.9, N: 500, r: 0.012 };
ex1.A = Math.PI * ex1.r ** 2;
ex1.I = ex1.m / (ex1.N * ex1.A);
const ex2 = { l: 0.025, m: 0.4, d: 0.1 };
ex2.end = KM * G.endOn(ex2.m, ex2.l, ex2.d);
ex2.endShort = (KM * 2 * ex2.m) / ex2.d ** 3;
ex2.bro = KM * G.broadside(ex2.m, ex2.l, ex2.d);
ex2.broShort = (KM * ex2.m) / ex2.d ** 3;
const ex3 = { m: 0.6, B: 0.025 };
ex3.tmax = ex3.m * ex3.B;
ex3.t30 = ex3.tmax * Math.sin(Math.PI / 6);
const ex4 = { a: 0.12, B: 0.5 };
ex4.A = ex4.a ** 2;
ex4.perp = ex4.B * ex4.A;
ex4.at60 = ex4.perp * Math.cos(Math.PI / 3);
ex4.gauss = ex4.B * 1e4;
const ex5 = { n: 2400, I: 0.5, chi: 349 };
ex5.H = ex5.n * ex5.I;
ex5.mur = 1 + ex5.chi;
ex5.B = MU0 * ex5.mur * ex5.H;
ex5.M = ex5.chi * ex5.H;
const ex6 = { chi1: 5.6e-4, T1: 200, T2: 320, chi3: 8.0e-4 };
ex6.C = ex6.chi1 * ex6.T1;
ex6.chi2 = ex6.C / ex6.T2;
ex6.T3 = ex6.C / ex6.chi3;
const ex7 = { N: 360, len: 0.12, I: 0.25, mur: 1400 };
ex7.n = ex7.N / ex7.len;
ex7.H = ex7.n * ex7.I;
ex7.B0 = MU0 * ex7.H;
ex7.B = ex7.mur * ex7.B0;
export const EX = { ex1, ex2, ex3, ex4, ex5, ex6, ex7 };

const fail = [];
const need = (ok, msg) => ok || fail.push(msg);
need(Math.abs(ex1.I - 3.979) < 1e-3, 'ex1');
need(Math.abs(ex2.end - 9.102e-5) < 1e-8 && Math.abs(ex2.endShort - 8e-5) < 1e-12 && Math.abs(ex2.bro - 3.652e-5) < 1e-8 && Math.abs(ex2.broShort - 4e-5) < 1e-12, `ex2 ${ex2.end} ${ex2.bro}`);
need(Math.abs(ex3.tmax - 0.015) < 1e-12 && Math.abs(ex3.t30 - 0.0075) < 1e-12, 'ex3');
need(Math.abs(ex4.perp - 7.2e-3) < 1e-12 && Math.abs(ex4.at60 - 3.6e-3) < 1e-12 && ex4.gauss === 5000, 'ex4');
need(ex5.H === 1200 && Math.abs(ex5.B - 0.5278) < 1e-4 && ex5.M === 418800, `ex5 ${ex5.B}`);
need(Math.abs(ex6.C - 0.112) < 1e-12 && Math.abs(ex6.chi2 - 3.5e-4) < 1e-12 && Math.abs(ex6.T3 - 140) < 1e-9, 'ex6');
need(Math.abs(ex7.n - 3000) < 1e-9 && Math.abs(ex7.H - 750) < 1e-9 && Math.abs(ex7.B0 - 9.425e-4) < 1e-7 && Math.abs(ex7.B - 1.3195) < 1e-4, `ex7 ${ex7.B}`);
if (fail.length) throw new Error(`worked examples: ${fail.join(', ')}`);

export const V = {
  bar: svgV(G.BAR, 'Field lines of a bar magnet'),
  sol: svgV(G.SOLENOID, 'Field lines of the equivalent solenoid'),
  evb: svgV(G.E_VS_B, 'Electric dipole and bar magnet field lines compared'),
  pos: svgV(G.POSITIONS, 'End-on and broadside-on points of a bar magnet'),
  torque: svgV(G.MAGNET_TORQUE, 'Torque on a bar magnet in a uniform field'),
  flux: svgV(G.FLUX, 'Flux through a face-on and a tilted surface'),
  mats: svgV(G.MATERIALS, 'Dia-, para- and ferromagnetic samples in a uniform field'),
  domains: svgV(G.DOMAINS, 'Domains in a ferromagnet'),
  emag: svgV(G.ELECTROMAGNET, 'An electromagnet: coil on a soft-iron core'),
  bh: svgV(G.BH_LOOP, 'The B–H (hysteresis) loop of a ferromagnet'),
  loops: svgV(G.LOOPS_COMPARE, 'B–H loops of soft iron and steel', 'Qualitative: real coercivities differ by a factor of a thousand or more.'),
};
export const fieldPlot = plot(
  {
    x: { min: 1, max: 4, label: 'distance d (units of d₀)' },
    y: { min: 0, max: 2.2, label: 'B in units of (μ₀/4π) m/d₀³' },
    functions: [
      { expr: '2/x^3', label: 'end-on: 2m/d³' },
      { expr: '1/x^3', label: 'broadside-on: m/d³' },
    ],
    points: [{ at: [2, 0.25], label: 'end-on at 2d₀' }, { at: [2, 0.125], label: 'broadside-on at 2d₀' }],
  },
  'Field of a short bar magnet against distance from its centre: both curves fall as the inverse cube of distance, the end-on curve always twice the broadside-on curve at the same distance',
  'Doubling d divides either field by 8.',
);
export const fluxPlot = plot(
  {
    x: { min: 0, max: 180, label: 'angle θ between B and the normal (degrees)' },
    y: { min: -1.1, max: 1.1, label: 'Φ / BA' },
    functions: [{ expr: 'cos(pi*x/180)', label: 'Φ = BA cos θ' }],
    points: [{ at: [0, 1], label: 'face-on: BA' }, { at: [60, 0.5], label: '60°: half' }, { at: [90, 0], label: 'plane along B: zero' }],
  },
  'Flux through a flat surface as a fraction of B times A, against the angle between the field and the normal: a cosine curve, one at zero degrees, one half at sixty degrees, zero at ninety degrees and negative beyond',
  'Beyond 90° the field passes through the other face: the flux is negative.',
);
export const curiePlot = plot(
  {
    x: { min: 100, max: 500, label: 'temperature T (K)' },
    y: { min: 0, max: 12, label: 'χ (× 10⁻⁴)' },
    functions: [{ expr: '1120/x', label: 'χ = C/T, C = 0.112 K' }],
    points: [{ at: [140, 8], label: '140 K' }, { at: [200, 5.6], label: '200 K' }, { at: [320, 3.5], label: '320 K' }],
  },
  'Susceptibility of the paramagnetic salt of worked example 6 against absolute temperature: a hyperbola, 8 times ten to the minus four at 140 kelvin, 5.6 at 200 kelvin and 3.5 at 320 kelvin',
  'Curie’s law: χT stays constant.',
);
const ex2Table = table(
  ['Point (d = 10 cm)', 'Magnet of length 5.0 cm', 'Short-magnet formula'],
  [
    ['End-on', `$${sci(ex2.end, 3)}$ T`, `$${sci(ex2.endShort, 2)}$ T`],
    ['Broadside-on', `$${sci(ex2.bro, 3)}$ T`, `$${sci(ex2.broShort, 2)}$ T`],
  ],
  'Table of worked example 2: for a 5 centimetre magnet of moment 0.40 ampere square metre at 10 centimetres, the end-on field is about 9.1 times ten to the minus five tesla against 8.0 from the short-magnet formula, and the broadside-on field about 3.65 against 4.0',
);
const orient = table(
  ['Angle θ between m and B', 'Torque mB sin θ', 'Equilibrium'],
  [
    ['0°', 'zero', 'stable'],
    ['90°', 'largest, mB', 'none'],
    ['180°', 'zero', 'unstable'],
  ],
  'Table of the torque on a magnet at three orientations: zero and stable at 0 degrees, largest at 90 degrees, zero and unstable at 180 degrees',
);
const unitsTable = table(
  ['Quantity', 'Symbol', 'SI unit', 'Other unit'],
  [
    ['Magnetic flux', 'Φ', 'weber (Wb) = T m²', '—'],
    ['Flux density (magnetic field)', 'B', 'tesla (T) = Wb m⁻²', '1 gauss (G) = 10⁻⁴ T'],
    ['Earth’s field (typical)', 'B', '$\\sim 5 \\times 10^{-5}$ T', 'about 0.5 G'],
    ['Strong lab magnet / MRI', 'B', '1 to 3 T', '10 000 to 30 000 G'],
  ],
  'Table of the units of magnetic flux and flux density: the weber, the tesla equal to a weber per square metre, and the gauss equal to ten to the minus four tesla, with typical values',
);
const quantTable = table(
  ['Quantity', 'Meaning', 'Unit'],
  [
    ['Magnetisation $M$', 'magnetic moment per unit volume, $m/V$', 'A m⁻¹'],
    ['Magnetic intensity $H$', 'set by the free currents, e.g. $nI$ in a solenoid', 'A m⁻¹'],
    ['Susceptibility $\\chi$', '$M/H$', 'none'],
    ['Relative permeability $\\mu_r$', '$\\mu/\\mu_0 = 1 + \\chi$', 'none'],
  ],
  'Table of magnetisation, magnetic intensity, susceptibility and relative permeability with their meanings and units',
);
export const classTable = table(
  ['', 'Diamagnetic', 'Paramagnetic', 'Ferromagnetic'],
  [
    ['Atomic moments', 'none permanent; induced, opposing B', 'permanent, randomly oriented', 'permanent, aligned in domains'],
    ['χ', 'small, negative ($\\sim -10^{-5}$)', 'small, positive ($10^{-5}$ to $10^{-3}$)', 'large, positive (hundreds to thousands)'],
    ['μr', 'slightly below 1', 'slightly above 1', 'much greater than 1'],
    ['In a non-uniform field', 'pushed to weaker field', 'pulled to stronger field', 'strongly pulled in'],
    ['Effect of temperature', 'almost none', 'χ = C/T (Curie’s law)', 'paramagnetic above $T_C$'],
    ['Examples', 'bismuth, copper, water', 'aluminium, sodium, oxygen', 'iron, nickel, cobalt'],
  ],
  'Table comparing diamagnetic, paramagnetic and ferromagnetic substances by atomic moments, susceptibility, relative permeability, behaviour in a non-uniform field, effect of temperature and examples',
);
const curieTable = table(
  ['Ferromagnet', 'Curie temperature'],
  [
    ['Iron', 'about 1043 K'],
    ['Cobalt', 'about 1390 K'],
    ['Nickel', 'about 631 K'],
    ['Gadolinium', 'about 293 K (20 °C)'],
  ],
  'Table of approximate Curie temperatures: iron 1043 kelvin, cobalt 1390 kelvin, nickel 631 kelvin and gadolinium 293 kelvin',
);
export const choiceTable = table(
  ['Use', 'Needs', 'Typical material'],
  [
    ['Permanent magnet', 'high retentivity, high coercivity', 'steel, alnico, ferrites'],
    ['Electromagnet core', 'high permeability, low retentivity, low coercivity', 'soft iron'],
    ['Transformer core', 'high permeability, low coercivity, narrow loop (small loss)', 'soft iron or silicon steel, laminated'],
  ],
  'Table of the choice of magnetic materials: permanent magnets need high retentivity and coercivity, as in steel or alnico; electromagnet cores need high permeability and low retentivity and coercivity, as in soft iron; transformer cores need high permeability and a narrow loop, as in laminated soft iron or silicon steel',
);

export const deck1 = deck({
  part: 1,
  title: 'Magnetism and Matter — Part 1: Bar magnets, magnetic dipoles and flux',
  goals: [
    'Compare a bar magnet with its equivalent solenoid, and magnetic field lines with electric field lines',
    'Use the end-on and broadside-on formulae for the field of a magnet, and find the torque on a magnet in a uniform field',
    'Calculate magnetic flux and convert between tesla, weber per square metre and gauss',
  ],
  slides: [
    sl('title', 'Magnetism and Matter', {
      b: 'Part 1 — the bar magnet as a magnetic dipole: its field lines, its field at a point, the torque on it, and magnetic flux.',
      v: V.bar,
      n: 'A compass needle, a fridge magnet and the coil of a motor all behave in the same way: each is a magnetic dipole. In this part we look at the field lines of a bar magnet and see why it acts just like a solenoid, compare its lines with those of an electric dipole, use formulae for its field at a point, find the torque on it, and define magnetic flux.',
    }),
    sl('diagram', 'The bar magnet and its field lines', {
      b: 'Field lines of a bar magnet, traced with a small compass or iron filings:',
      ul: ['Outside the magnet they run from the **N** pole round to the **S** pole; **inside** they continue from S to N.', 'Every line is a **closed loop**; lines never cross.', 'The **magnetic moment** $\\vec m$ points from S to N inside the magnet (unit A m²).', 'Breaking a magnet gives two complete magnets: no isolated pole (**monopole**) has ever been found.'],
      v: V.bar,
      n: 'Sprinkle iron filings round a bar magnet and they trace curved lines from the north pole round to the south pole. The lines do not stop at the poles: they carry on through the body of the magnet from south to north, so every line is a closed loop. The magnetic moment of the magnet points the same way as the lines inside it, from the south pole to the north pole.',
    }),
    sl('diagram', 'A bar magnet as an equivalent solenoid', {
      b: r`A short solenoid carrying a current has **the same field pattern** as a bar magnet: the end where the current is anticlockwise as seen from outside acts as N. Its moment is
$$m = NIA$$`,
      ul: ['In a magnet, the electrons of each atom act as tiny **current loops**; in a magnet they are aligned, so their effects add like the turns of a solenoid.', 'Inside currents of neighbouring loops cancel, leaving a net current round the surface: an equivalent solenoid.'],
      v: V.sol,
      n: 'Now compare a short solenoid carrying a current. Outside it, the field lines are exactly those of the bar magnet, and inside they run along the axis. The reason is that every atom of a magnet contains circulating electrons, tiny current loops. In a magnet these loops are lined up, so the magnet behaves like a solenoid whose moment is the number of turns times the current times the area.',
    }),
    sl('example', 'Worked example 1: an equivalent solenoid', {
      b: r`A bar magnet has a magnetic moment of 0.90 A m². It is to be replaced by a solenoid of 500 turns, each of radius 1.2 cm. What current is needed?`,
      ul: [
        r`Area of a turn: $A = \pi r^2 = \pi \times (0.012)^2 \approx ${sci(ex1.A, 3)}$ m².`,
        r`$I = \dfrac{m}{NA} = \dfrac{0.90}{500 \times ${sci(ex1.A, 3)}} \approx ${dec(ex1.I, 3)}$ A, about 4 A.`,
        'The end towards which the moment points (current anticlockwise as seen from outside) takes the place of the N pole.',
      ],
      v: V.sol,
      n: 'Each turn has an area of pi times one point two centimetres squared, about four point five square centimetres. Five hundred turns of that area need a current of nought point nine divided by five hundred times the area, close to four amperes, to match the magnet. The end of the solenoid where the current circulates anticlockwise, as you look at it from outside, takes the place of the north pole.',
    }),
    sl('diagram', 'Magnetic and electric field lines compared', {
      b: 'Both dipoles have the same pattern **far away**, but close up they differ:',
      ul: ['Electric lines **start on +q and end on −q**; magnetic lines have **no ends**.', 'Between the charges $\\vec E$ points **opposite** to $\\vec p$; inside the magnet $\\vec B$ points **along** $\\vec m$.', 'Hence the net magnetic flux through **any closed surface is zero**, while the electric flux through a surface round a charge is not.'],
      v: V.evb,
      n: 'Put an electric dipole beside a bar magnet. Far away their field lines look alike. Close up there is a real difference. Electric lines begin on the positive charge and end on the negative one, and between the charges the field points opposite to the dipole moment. Magnetic lines never end: they run straight through the magnet, along its moment. This happens because there are no magnetic charges.',
    }),
    sl('check', 'Quick check: inside the dipole', {
      b: 'Choose the correct option.',
      v: V.evb,
      chk: 'lines-vs-e-mcq',
      n: 'Look at the direction of the lines between the charges, and through the middle of the magnet.',
    }),
    sl('concept', 'Field of a magnetic dipole: end-on and broadside-on', {
      b: r`For a magnet of magnetic length $2l$ and moment $m$, at distance $d$ from its centre (formulae only; derivations are not required):
$$B_\text{end-on} = \dfrac{\mu_0}{4\pi}\dfrac{2md}{(d^2 - l^2)^2}, \qquad B_\text{broadside-on} = \dfrac{\mu_0}{4\pi}\dfrac{m}{(d^2 + l^2)^{3/2}}$$`,
      ul: ['End-on (on the axis): $\\vec B$ along $\\vec m$. Broadside-on (on the perpendicular bisector): $\\vec B$ opposite to $\\vec m$.', 'Short magnet, $d \\gg l$: $\\dfrac{\\mu_0}{4\\pi}\\dfrac{2m}{d^3}$ end-on and $\\dfrac{\\mu_0}{4\\pi}\\dfrac{m}{d^3}$ broadside-on, with $\\dfrac{\\mu_0}{4\\pi} = 10^{-7}$ T m A$^{-1}$.'],
      v: V.pos,
      n: 'Two positions matter. End-on means a point on the axis of the magnet; broadside-on means a point on the line that cuts the magnet at right angles through its centre. On the axis the field points along the moment; on the bisector it points the opposite way. For a short magnet, far away, the end-on field is two m over d cubed and the broadside-on field m over d cubed, times mu nought over four pi.',
    }),
    sl('example', 'Worked example 2: a magnet that is not short', {
      b: r`A bar magnet of magnetic length 5.0 cm has a moment of 0.40 A m². Find the field 10 cm from its centre (a) end-on, (b) broadside-on, and compare with the short-magnet formulae.`,
      ul: [
        r`$l = 0.025$ m, $d = 0.10$ m. (a) $B = 10^{-7} \times \dfrac{2 \times 0.40 \times 0.10}{(0.010 - 0.000625)^2} \approx ${sci(ex2.end, 3)}$ T.`,
        r`(b) $B = 10^{-7} \times \dfrac{0.40}{(0.010 + 0.000625)^{3/2}} \approx ${sci(ex2.bro, 3)}$ T.`,
        r`Short-magnet values: $${sci(ex2.endShort, 2)}$ T and $${sci(ex2.broShort, 2)}$ T. The ratio is no longer 2, because $l$ is a quarter of $d$.`,
      ],
      v: ex2Table,
      n: 'Here half the length is two and a half centimetres and the distance is ten. End-on, the field works out at about nine point one times ten to the minus five tesla; broadside-on, about three point six five times ten to the minus five. The short-magnet formulae would give eight and four, a little low and a little high. When the magnet is not much shorter than the distance, use the full formulae.',
    }),
    sl('diagram', 'How the field falls with distance', {
      b: r`For a short magnet both fields fall as $1/d^3$, much faster than the $1/d^2$ field of a point charge. At the same distance:
$$\dfrac{B_\text{end-on}}{B_\text{broadside-on}} = 2$$`,
      ul: ['Doubling $d$ divides either field by $2^3 = 8$.', 'To compare two points, write both fields in terms of $m$ and the distances, then divide.'],
      v: fieldPlot,
      n: 'The graph shows both fields of a short magnet against distance. Each falls as the inverse cube of the distance, so moving twice as far away cuts the field to an eighth. At every distance the end-on curve is exactly twice the broadside-on curve. To compare the field at two different points, write each in terms of the moment and its own distance, and divide one by the other.',
    }),
    sl('check', 'Quick check: two points', {
      b: 'Choose the correct option.',
      v: fieldPlot,
      chk: 'ratio-endbroad-mcq',
      n: 'Write both fields with their own distances before you divide.',
    }),
    sl('diagram', 'Torque on a magnetic dipole', {
      b: r`A magnet of moment $\vec m$ in a uniform field $\vec B$ feels **no net force** but a **torque**
$$\vec\tau = \vec m \times \vec B, \qquad \tau = mB\sin\theta$$
which turns $\vec m$ towards $\vec B$ (the same law as for a current loop, chapter 8).`,
      ul: ['$\\theta = 0^\\circ$: zero torque, **stable**; $\\theta = 180^\\circ$: zero torque, **unstable**; $\\theta = 90^\\circ$: largest torque $mB$.'],
      v: V.torque,
      n: 'A magnet in a uniform field is just like the current loop of the last chapter. There is no net force, but there is a turning effect, m cross B, of size m B sine theta. It always tries to swing the moment round into line with the field. Lined up with the field, the magnet is stable; pointing exactly against it, the torque is also zero, but the slightest nudge makes it turn right round.',
    }),
    sl('example', 'Worked example 3: torque on a suspended magnet', {
      b: r`A magnet of moment 0.60 A m² hangs so that it can turn in a horizontal plane, in a uniform horizontal field of 0.025 T. Find the torque on it when its axis is (a) at right angles to the field, (b) at 30° to the field, and say which way it turns.`,
      ul: [
        r`(a) $\tau = mB = 0.60 \times 0.025 = ${dec(ex3.tmax, 2)}$ N m (the largest possible).`,
        r`(b) $\tau = mB\sin 30^\circ = ${dec(ex3.tmax, 2)} \times 0.5 = ${sci(ex3.t30, 2)}$ N m.`,
        'In both cases the torque turns the magnet so that its moment swings towards the field.',
      ],
      v: orient,
      n: 'At right angles to the field, the torque is simply m times B: nought point six times nought point nought two five, which is nought point nought one five newton metre. At thirty degrees the sine is one half, so the torque halves to seven point five times ten to the minus three newton metre. Either way the magnet turns to bring its moment into line with the field.',
    }),
    sl('concept', 'Magnetic flux', {
      b: r`The **magnetic flux** through a flat surface of area $A$ in a uniform field is
$$\Phi = \vec B \cdot \vec A = BA\cos\theta$$
where $\theta$ is the angle between $\vec B$ and the **normal** to the surface. Flux is a **scalar**; it measures how many field lines cross the surface.`,
      ul: ['Greatest, $BA$, when the surface faces the field; zero when the field runs along the surface.', 'Through any **closed** surface the net magnetic flux is zero.'],
      v: V.flux,
      n: 'Magnetic flux tells us how much field passes through a surface. For a flat surface it is the field times the area times the cosine of the angle between the field and the normal. Facing the field squarely, the surface catches the most lines. Tilted, it catches fewer: at sixty degrees, only half. With the field running along the surface, none cross it, and the flux is zero.',
    }),
    sl('concept', 'Flux density and its units', {
      b: r`Since $\Phi = BA$ for a surface facing the field, $B = \Phi/A$: the magnetic field is the **flux density**, the flux per unit area normal to the field.`,
      ul: ['Unit of flux: the **weber**, 1 Wb = 1 T m².', 'Unit of B: the **tesla**, 1 T = 1 Wb m⁻².', 'The **gauss** is still used: 1 G $= 10^{-4}$ T, so 1 T $= 10^4$ G.'],
      v: unitsTable,
      n: 'Turning the formula round, the field is the flux through each square metre held at right angles to it, which is why B is also called the flux density. Flux is measured in webers, and one tesla is one weber per square metre. An older unit, the gauss, is still common: one gauss is ten to the minus four tesla. The Earth’s field is about half a gauss.',
    }),
    sl('example', 'Worked example 4: flux through a square loop', {
      b: r`A square loop of side 12 cm is in a uniform field of 0.50 T. Find the flux through it when (a) its plane is perpendicular to the field, (b) its normal makes 60° with the field, (c) its plane is parallel to the field. Express the field in gauss.`,
      ul: [
        r`$A = (0.12)^2 = 0.0144$ m². (a) $\Phi = BA = 0.50 \times 0.0144 = ${sci(ex4.perp, 2)}$ Wb.`,
        r`(b) $\Phi = BA\cos 60^\circ = ${sci(ex4.perp, 2)} \times 0.5 = ${sci(ex4.at60, 2)}$ Wb. (c) $\Phi = 0$.`,
        r`$B = 0.50$ T $= 0.50 \times 10^{4}$ G $= ${ex4.gauss}$ G.`,
      ],
      v: fluxPlot,
      n: 'The area is nought point nought one four four square metre. Facing the field, the flux is half a tesla times that area, seven point two milliwebers. With the normal at sixty degrees, the cosine halves it to three point six milliwebers. With the plane along the field, no lines cross, and the flux is zero. Half a tesla is five thousand gauss.',
    }),
    sl('check', 'Quick check: gauss and tesla', {
      b: 'Choose the correct option.',
      v: unitsTable,
      chk: 'gauss-mcq',
      n: 'One gauss is ten to the minus four tesla.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Field lines of a magnet', 'Closed loops; inside S → N, along $\\vec m$; no monopoles'],
          ['Equivalent solenoid', 'Same pattern; $m = NIA$'],
          ['End-on field', '$\\dfrac{\\mu_0}{4\\pi}\\dfrac{2md}{(d^2 - l^2)^2} \\approx \\dfrac{\\mu_0}{4\\pi}\\dfrac{2m}{d^3}$, along $\\vec m$'],
          ['Broadside-on field', '$\\dfrac{\\mu_0}{4\\pi}\\dfrac{m}{(d^2 + l^2)^{3/2}} \\approx \\dfrac{\\mu_0}{4\\pi}\\dfrac{m}{d^3}$, opposite to $\\vec m$'],
          ['Torque', '$\\vec\\tau = \\vec m \\times \\vec B$; no net force in uniform B'],
          ['Flux', '$\\Phi = BA\\cos\\theta$; Wb; 1 T = 1 Wb m⁻² = $10^4$ G'],
        ],
        'Summary table of field lines, the equivalent solenoid, the end-on and broadside-on fields, the torque on a magnet and magnetic flux',
      ),
      n: 'To sum up: a bar magnet behaves like a solenoid, and its field lines are closed loops because there are no magnetic monopoles. On its axis the field points along the moment, and on its bisector against it, half as strong for a short magnet. In a uniform field it feels a torque m cross B but no net force. Flux is B A cos theta, in webers, and a tesla is a weber per square metre.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'Say which position (end-on or broadside-on) you are using and give the direction of B with its size.',
        'Use the short-magnet formulae only when the magnet is short compared with d, or when told to.',
        'In τ = mB sin θ and Φ = BA cos θ, check what θ is measured from.',
        'Convert cm to m and gauss to tesla before substituting.',
      ],
      v: table(['Asked', 'Key point'], [['Field on the axis?', 'end-on, along m'], ['Field on the bisector?', 'broadside-on, opposite to m'], ['Plane of coil along B?', 'flux zero']], 'Table of common questions and the key point for each'),
      n: 'When you calculate a field, name the position, end-on or broadside-on, and give the direction as well as the size. Use the short-magnet formulae only when the magnet really is short compared with the distance. In the torque and flux formulae, check whether the angle is measured from the field or from the normal. And convert centimetres to metres, and gauss to tesla, before you substitute.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Magnetism and Matter — Part 2: Magnetic materials, electromagnets and the B–H loop',
  goals: [
    'Define magnetisation, magnetic intensity, susceptibility and relative permeability, and use B = μ₀(H + M)',
    'Classify dia-, para- and ferromagnetic substances and apply Curie’s law and the Curie temperature',
    'Explain electromagnets and the B–H loop, and choose materials for permanent magnets, electromagnets and transformer cores',
  ],
  slides: [
    sl('title', 'Magnetic Materials', {
      b: 'Part 2 — what happens to matter placed in a magnetic field, and how we choose materials for magnets and cores.',
      v: V.mats,
      n: 'Every material responds to a magnetic field, though most respond very weakly. In this part we describe that response with a few quantities, sort materials into diamagnetic, paramagnetic and ferromagnetic, see how temperature affects them, and then put ferromagnets to work in electromagnets and transformer cores, using the B H loop to choose the right material for each job.',
    }),
    sl('concept', 'Magnetisation M and magnetic intensity H', {
      b: r`**Magnetisation** $M$ is the net magnetic moment per unit volume of a material, $M = m/V$ (A m⁻¹). **Magnetic intensity** $H$ is the part of the field due to the free currents; inside a long solenoid $H = nI$ (A m⁻¹). The total field is
$$B = \mu_0(H + M)$$`,
      v: quantTable,
      ul: ['With no material, $M = 0$ and $B = \\mu_0 H$.'],
      n: 'When a material sits inside a solenoid, two things make up the field. The current in the windings sets up the magnetic intensity H, equal to n I. The material itself becomes magnetised, and its magnetisation M is its magnetic moment per unit volume. Both are measured in amperes per metre, and the field is mu nought times their sum.',
    }),
    sl('concept', 'Susceptibility and relative permeability', {
      b: r`For most materials $M$ is proportional to $H$: $M = \chi H$, where $\chi$ is the **magnetic susceptibility** (no unit). Then
$$B = \mu_0(1 + \chi)H = \mu_0\mu_r H, \qquad \mu_r = 1 + \chi$$
$\mu_r$ is the **relative permeability**; the permeability is $\mu = \mu_0\mu_r$.`,
      ul: ['$\\chi < 0$: diamagnetic. $\\chi$ small and $> 0$: paramagnetic. $\\chi \\gg 1$: ferromagnetic.'],
      v: quantTable,
      n: 'In most materials the magnetisation is proportional to H. The constant is the susceptibility, chi, a pure number. Putting M equal to chi H into the field equation gives B equals mu nought times one plus chi times H. One plus chi is the relative permeability. The sign and size of the susceptibility tell us at once what kind of material we have.',
    }),
    sl('example', 'Worked example 5: a solenoid with a core', {
      b: r`A long solenoid with 2400 turns per metre carries 0.50 A. Its core has susceptibility 349. Find $H$, $\mu_r$, $B$ in the core and $M$.`,
      ul: [
        r`$H = nI = 2400 \times 0.50 = ${ex5.H}$ A m$^{-1}$; $\mu_r = 1 + \chi = ${ex5.mur}$.`,
        r`$B = \mu_0\mu_r H = 4\pi \times 10^{-7} \times 350 \times 1200 \approx ${dec(ex5.B, 3)}$ T.`,
        r`$M = \chi H = 349 \times 1200 = ${ex5.M}$ A m$^{-1}$ ($\approx ${sci(ex5.M, 3)}$).`,
      ],
      v: quantTable,
      n: 'The windings give H equal to twenty four hundred times half an ampere, twelve hundred amperes per metre. The relative permeability is three hundred and fifty, so the field in the core is about nought point five three tesla, three hundred and fifty times what the empty coil would give. The magnetisation is the susceptibility times H, about four point two times ten to the five amperes per metre.',
    }),
    sl('diagram', 'Three kinds of magnetic material', {
      b: 'Field lines through a sample placed in a uniform field:',
      ul: ['**Diamagnetic** ($\\chi < 0$): lines spread out slightly; $B$ inside a little less.', '**Paramagnetic** ($\\chi$ small, $> 0$): lines crowd in slightly.', '**Ferromagnetic** ($\\chi \\gg 1$): lines are drawn strongly into the sample.'],
      v: V.mats,
      n: 'Place three samples in the same uniform field. In a diamagnetic sample the field lines spread out a little, so the field inside is slightly weaker. In a paramagnetic sample they crowd in slightly. In a ferromagnetic sample they are drawn in very strongly. The drawing exaggerates the first two effects: real diamagnets and paramagnets change the field by only a few parts in a hundred thousand.',
    }),
    sl('two-column', 'Dia-, para- and ferromagnetism compared', {
      b: 'The difference lies in the atoms:',
      cols: ['**Diamagnetic and paramagnetic**\n- Dia: no permanent atomic moment; the field induces small moments that oppose it, so the sample moves towards weaker field\n- Para: permanent moments, partly lined up by the field, so the sample moves towards stronger field', '**Ferromagnetic**\n- Permanent moments lined up spontaneously in small regions called domains\n- A modest field reorients whole domains: very large M\n- Stays magnetised after the field is removed'],
      v: classTable,
      n: 'Diamagnetism is present in every atom: an applied field alters the electrons’ orbits so that they produce small moments opposing it. Paramagnetic atoms carry permanent moments, which the field partly lines up against the jostling of thermal motion. In ferromagnets the moments line up by themselves within domains, so even a small field produces a huge magnetisation, and some of it remains when the field is removed.',
    }),
    sl('check', 'Quick check: a small negative susceptibility', {
      b: 'Choose the correct option.',
      v: V.mats,
      chk: 'sphere-mcq',
      n: 'Think about the sign of the susceptibility.',
    }),
    sl('concept', 'Curie’s law for paramagnets', {
      b: r`The susceptibility of a paramagnet falls as the temperature rises:
$$\chi = \dfrac{C}{T}$$
($T$ in kelvin; $C$ is the Curie constant of the material). Thermal agitation disorders the permanent moments that the field tries to line up.`,
      ul: ['At fixed $H$, $M = \\chi H \\propto 1/T$ (well below saturation).', 'Diamagnetic susceptibility hardly depends on temperature.'],
      v: curiePlot,
      n: 'For a paramagnet, heat works against the field. The hotter the sample, the more violently its atoms jostle, and the harder it is for the field to line up their moments. Curie found that the susceptibility is inversely proportional to the absolute temperature: chi equals C over T. Halve the temperature in kelvin and the susceptibility doubles. Diamagnetism, by contrast, is almost unaffected by temperature.',
    }),
    sl('example', 'Worked example 6: Curie’s law', {
      b: r`A paramagnetic salt has susceptibility $5.6 \times 10^{-4}$ at 200 K. Find (a) its Curie constant, (b) its susceptibility at 320 K, (c) the temperature at which its susceptibility is $8.0 \times 10^{-4}$.`,
      ul: [
        r`(a) $C = \chi T = 5.6 \times 10^{-4} \times 200 = ${dec(ex6.C, 3)}$ K.`,
        r`(b) $\chi = \dfrac{C}{T} = \dfrac{0.112}{320} = ${sci(ex6.chi2, 2)}$.`,
        r`(c) $T = \dfrac{C}{\chi} = \dfrac{0.112}{8.0 \times 10^{-4}} = ${ex6.T3}$ K.`,
      ],
      v: curiePlot,
      n: 'The product of susceptibility and temperature is the Curie constant: five point six times ten to the minus four times two hundred gives nought point one one two kelvin. At three hundred and twenty kelvin, divide the constant by the temperature: three point five times ten to the minus four. For eight times ten to the minus four, divide the constant by that value: one hundred and forty kelvin.',
    }),
    sl('diagram', 'Ferromagnetism: domains and the Curie temperature', {
      b: 'A ferromagnet is made of **domains**, each spontaneously magnetised. With no field they point in random directions. A weak field makes favourably aligned domains **grow**; a strong field **rotates** the rest until the sample is **saturated**.',
      ul: ['Above the **Curie temperature** $T_C$ thermal agitation destroys the alignment within domains: the material becomes **paramagnetic**.', 'On cooling below $T_C$ the domains form again.'],
      v: V.domains,
      n: 'Inside a ferromagnet, millions of atomic moments are lined up within each tiny domain. An unmagnetised piece has its domains pointing every which way. A field makes the well-placed domains grow and then turns the rest, until all point along the field. Heat the material above its Curie temperature and the alignment within the domains breaks up: it becomes merely paramagnetic until it cools again.',
    }),
    sl('check', 'Quick check: the Curie temperature', {
      b: 'Choose the correct option.',
      v: curieTable,
      chk: 'gadolinium-mcq',
      n: 'Convert both temperatures to kelvin and compare them with the Curie temperature.',
    }),
    sl('diagram', 'Electromagnets', {
      b: r`An **electromagnet** is a coil wound on a **soft-iron** core. The core multiplies the field of the coil by its relative permeability:
$$B \approx \mu_0\mu_r nI$$`,
      ul: ['Strength rises with the **turns per unit length** $n$, the **current** $I$ and the **permeability** of the core; a U-shaped core with a small air gap helps too.', 'Above a certain current the core **saturates**; then extra current adds little.', 'Switch off the current and soft iron loses its magnetism: used in cranes, relays, bells and door locks.'],
      v: V.emag,
      n: 'Wind a coil on a soft iron bar and pass a current. The coil’s own field lines up the domains of the iron, and the field in the core becomes hundreds or thousands of times stronger. More turns per metre, a bigger current, or a core of higher permeability all make it stronger, until the iron saturates. Because soft iron loses its magnetism when the current stops, the magnet can be switched off.',
    }),
    sl('example', 'Worked example 7: an electromagnet', {
      b: r`A coil of 360 turns is wound along a soft-iron core 12 cm long, of relative permeability 1400, and carries 0.25 A. Find the field in the core, and compare it with the field of the empty coil.`,
      ul: [
        r`$n = \dfrac{360}{0.12} = ${ex7.n}$ m$^{-1}$; $H = nI = ${ex7.H}$ A m$^{-1}$.`,
        r`Empty coil: $B_0 = \mu_0 H = 4\pi \times 10^{-7} \times 750 \approx ${sci(ex7.B0, 3)}$ T.`,
        r`With the core: $B = \mu_r B_0 \approx 1400 \times ${sci(ex7.B0, 3)} \approx ${dec(ex7.B, 3)}$ T (provided the iron is not saturated).`,
      ],
      v: V.emag,
      n: 'Three hundred and sixty turns on twelve centimetres is three thousand turns per metre, so H is seven hundred and fifty amperes per metre. On its own, the coil gives just under a millitesla. The iron core multiplies this by fourteen hundred, to about one point three two tesla, provided the iron has not reached saturation.',
    }),
    sl('diagram', 'The B–H loop: hysteresis', {
      b: 'Take a ferromagnet through a full cycle of $H$ and plot $B$ (qualitatively):',
      ul: ['**Saturation:** B levels off when the domains are all aligned.', '**Retentivity** (remanence): the $B$ left when $H$ is brought back to zero.', '**Coercivity:** the reverse $H$ needed to bring $B$ to zero.', 'B **lags** behind H (hysteresis); the loop area measures the energy turned into heat each cycle.'],
      v: V.bh,
      n: 'Increase H from zero and B climbs until it levels off at saturation. Now reduce H to zero: B does not return to zero, because the domains stay partly aligned. What is left is the retentivity. To remove it we must apply a reverse H, the coercivity. Going on round the cycle traces a closed loop. B always lags behind H, and the area of the loop measures the energy wasted as heat in each cycle.',
    }),
    sl('check', 'Quick check: reading the loop', {
      b: 'Choose the correct option.',
      v: V.bh,
      chk: 'coercivity-mcq',
      n: 'Which point on the loop has B equal to zero?',
    }),
    sl('diagram', 'Soft iron and steel compared', {
      b: 'The loops of two ferromagnets:',
      ul: ['**Soft iron:** narrow loop: **low coercivity**, high permeability, slightly higher retentivity, **small loop area** (little energy lost).', '**Steel:** wide loop: **high coercivity**, so its magnetisation is hard to destroy; large loop area.'],
      v: V.loops,
      n: 'Compare the loops of soft iron and steel. Soft iron gives a tall, narrow loop: it is easily magnetised, its coercivity is small, and little energy is lost in each cycle, though it keeps a fair retentivity while no reverse field acts. Steel gives a wide loop: once magnetised, it needs a large reverse field to demagnetise it, which is exactly what a permanent magnet needs.',
    }),
    sl('concept', 'Choosing magnetic materials', {
      b: 'Match the material to the job:',
      ul: ['**Permanent magnets:** high retentivity **and** high coercivity, e.g. steel, alnico, ferrites.', '**Electromagnet cores:** high permeability, low retentivity and low coercivity, e.g. soft iron.', '**Transformer cores** (230 V, 50 Hz mains): high permeability and a **narrow loop** to keep the hysteresis loss small, e.g. laminated soft iron or silicon steel.'],
      v: choiceTable,
      n: 'A permanent magnet must keep its magnetism against knocks and stray fields, so it needs both a high retentivity and a high coercivity: steel or alnico. An electromagnet must switch off cleanly, so its core needs a low retentivity and coercivity: soft iron. A transformer core goes round its loop fifty times a second, so it needs a narrow loop and a high permeability: laminated soft iron or silicon steel.',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: classTable,
      ul: ['$B = \\mu_0(H + M)$, $M = \\chi H$, $\\mu_r = 1 + \\chi$.', 'Paramagnets: $\\chi = C/T$. Ferromagnets become paramagnetic above $T_C$.', 'Electromagnet: $B \\approx \\mu_0\\mu_r nI$ up to saturation.', 'B–H loop: retentivity, coercivity; choose hard (wide-loop) materials for permanent magnets, soft (narrow-loop) ones for cores.'],
      n: 'To sum up: the field in a material is mu nought times H plus M, and the relative permeability is one plus the susceptibility. Diamagnets have a small negative susceptibility, paramagnets a small positive one that follows Curie’s law, and ferromagnets a huge one that vanishes above the Curie temperature. Wide B H loops suit permanent magnets; narrow ones suit electromagnet and transformer cores.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'Classify from the sign and size of χ, or from μr compared with 1.',
        'In Curie’s law always use kelvin.',
        'For a material in a solenoid: H = nI first, then B = μ₀μrH and M = χH.',
        'When choosing materials, name the property (retentivity, coercivity, permeability, loop area) and say why it matters for that use.',
      ],
      v: table(['Asked', 'Key point'], [['μr slightly below 1?', 'diamagnetic'], ['χ doubled on cooling?', 'T halved (kelvin)'], ['Transformer core?', 'narrow loop, high μr']], 'Table of common questions and the key point for each'),
      n: 'Classify a material from the sign and size of its susceptibility, or from whether its relative permeability is above or below one. Always use kelvin in Curie’s law. For a material inside a solenoid, find H from the current first, then B and M. And when you choose a material, name the property that matters, such as coercivity or loop area, and say why it suits that use.',
    }),
  ],
});
