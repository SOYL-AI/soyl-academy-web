// ch01 Units and Measurements — two decks: Part 1 (t01 plus the significant-figure half of t02) systems of units, SI base and
// derived units, practical units, significant figures; Part 2 (t02 errors plus t03) uncertainty in results, dimensions and
// dimensional analysis. Every number on a slide is computed here.
import { sl, deck, table, flow, svgV, plot, r, sci, dec } from './lib.mjs';
import { sf, sfCount, roundSf, pt, dimTex, dimTxt, Q, M, L, T, A, Kel, D, dmul, ddiv, dpow, derive, mean, meanAbsErr, C_LIGHT, YEAR, AU, PARSEC, LY, RAMP, ROD, sup } from './calc.mjs';
import * as G from './svgs.mjs';

// ---------------------------------------------------------------- worked-example numbers
const moon = { d: 3.48e6, r: 3.84e8 };
moon.th = moon.d / moon.r;
moon.deg = (moon.th * 180) / Math.PI;
const prox = { ly: 4.24 };
prox.m = prox.ly * LY;
prox.pc = prox.m / PARSEC;
prox.au = prox.m / AU;
const cnt = [
  ['0.00620', '0.00620'],
  ['5.0040', '5.0040'],
  ['7200', '7200'],
  ['7.200 × 10³', '7.200e3'],
  ['1.20 × 10⁻³', '1.20e-3'],
].map(([shown, parse]) => ({ shown, n: sfCount(parse) }));
const rnd = [
  [2.745, 3],
  [2.735, 3],
  [4.5764, 3],
  [0.036549, 3],
].map(([x, n]) => ({ x, n, out: roundSf(x, n) }));
const ar = { a: [12.78, 3.1, 0.456], b: [12.4, 8.25], c: [482, 12.5] };
ar.sum = ar.a.reduce((s, v) => s + v, 0);
ar.sumR = Number(ar.sum.toFixed(1));
ar.prod = ar.b[0] * ar.b[1];
ar.prodR = roundSf(ar.prod, 3);
ar.quo = ar.c[0] / ar.c[1];
ar.quoR = roundSf(ar.quo, 3);
const rp = { times: [...RAMP] };
rp.mean = mean(RAMP);
rp.errs = RAMP.map((v) => Math.abs(rp.mean - v));
rp.dm = meanAbsErr(RAMP);
rp.rel = rp.dm / rp.mean;
rp.pct = rp.rel * 100;
const res = { V: 12.0, dV: 0.2, I: 2.5, dI: 0.05 };
res.R = res.V / res.I;
res.relR = res.dV / res.V + res.dI / res.I;
res.dR = res.R * res.relR;
const pg = { l: 0.92, dl: 0.002, T: 1.92, dT: 0.02 };
pg.g = (4 * Math.PI ** 2 * pg.l) / pg.T ** 2;
pg.rel = pg.dl / pg.l + (2 * pg.dT) / pg.T;
pg.dg = pg.g * pg.rel;
const dG = ddiv(dmul(Q.force, dpow(L, 2)), dpow(M, 2));
const dh = dmul(Q.energy, T);
const pend = derive(T, [M, L, Q.accel]);
const strg = derive(Q.velocity, [Q.force, Q.linDensity]);
export const EX = { moon, prox, cnt, rnd, ar, rp, res, pg, dG, dh, pend, strg };

// unit strings from a dimension vector (M L T A K -> kg m s A K)
const UNITS = ['kg', 'm', 's', 'A', 'K'];
export const unitTxt = (d) => {
  if (d.every((v, i) => v === Q.charge[i])) return 'A s';
  const parts = UNITS.map((u, i) => (d[i] ? u + (d[i] === 1 ? '' : sup(d[i])) : '')).filter(Boolean);
  return parts.join(' ');
};

// ---------------------------------------------------------------- visuals
export const V = {
  lengths: svgV(G.LENGTHS, 'A logarithmic scale of lengths from the fermi to the parsec', 'Every tick is a factor of 100 000 in length.'),
  radian: svgV(G.RADIAN, 'A circle with an arc equal to its radius marking one radian, and a sphere with a patch of area r squared marking one steradian'),
  ruler: svgV(G.RULER, 'A rod measured against a millimetre scale, read as 4.63 centimetres with the last digit estimated', 'Digits 4 and 6 are certain; the 3 is an estimate.'),
  dots: svgV(G.DOTS, 'Five stopwatch readings on a number line with their mean and a band for the mean absolute error'),
  area: svgV(G.AREA, 'A rectangle with strips showing how errors in length and breadth make an error in area'),
  pendulum: svgV(G.PENDULUM, 'A simple pendulum with its bob, string length l, angle theta and gravity g'),
  balance: svgV(G.BALANCE, 'A balance showing that the displacement s and each term of u t plus half a t squared have the dimension of length'),
};

const tSystems = table(
  ['System', 'Length', 'Mass', 'Time'],
  [
    ['CGS', 'centimetre', 'gram', 'second'],
    ['FPS', 'foot', 'pound', 'second'],
    ['MKS', 'metre', 'kilogram', 'second'],
    ['SI (international standard)', 'metre', 'kilogram', 'second, plus four more base units'],
  ],
  'Table of the CGS, FPS, MKS and SI systems of units with the unit of length, mass and time in each',
);
const tBase = table(
  ['Base quantity', 'SI unit', 'Symbol'],
  [
    ['length', 'metre', 'm'],
    ['mass', 'kilogram', 'kg'],
    ['time', 'second', 's'],
    ['electric current', 'ampere', 'A'],
    ['thermodynamic temperature', 'kelvin', 'K'],
    ['amount of substance', 'mole', 'mol'],
    ['luminous intensity', 'candela', 'cd'],
  ],
  'Table of the seven SI base quantities with their units and symbols',
);
const derivedRows = [
  ['force', 'newton (N)', Q.force],
  ['energy', 'joule (J)', Q.energy],
  ['power', 'watt (W)', Q.power],
  ['pressure', 'pascal (Pa)', Q.pressure],
  ['frequency', 'hertz (Hz)', Q.frequency],
  ['electric charge', 'coulomb (C)', Q.charge],
  ['potential difference', 'volt (V)', ddiv(Q.power, A)],
];
const tDerived = table(['Derived quantity', 'Named unit', 'In base units'], derivedRows.map(([q, u, d]) => [q, u, unitTxt(d)]), 'Table of derived quantities, their named SI units and the same units written in base units');
const tPrefix = table(
  ['Prefix', 'Symbol', 'Factor', 'Example'],
  [
    ['tera', 'T', '$10^{12}$', 'a 2 TB disk drive'],
    ['giga', 'G', '$10^{9}$', 'a 2.4 GHz processor'],
    ['mega', 'M', '$10^{6}$', 'a 5 MW solar plant'],
    ['kilo', 'k', '$10^{3}$', 'a 42 km marathon'],
    ['milli', 'm', '$10^{-3}$', 'a 2 mm raindrop'],
    ['micro', 'μ', '$10^{-6}$', 'a 70 μm hair'],
    ['nano', 'n', '$10^{-9}$', 'a 100 nm virus'],
    ['pico', 'p', '$10^{-12}$', 'a 100 pF capacitor'],
    ['femto', 'f', '$10^{-15}$', 'a proton, 1.7 fm across'],
  ],
  'Table of SI prefixes from tera to femto with symbols, powers of ten and an example of each',
);
const tPractical = table(
  ['Practical unit', 'Value in metres', 'Used for'],
  [
    ['light year (ly)', `$${sf(LY, 3)}$`, 'distance light travels in one year; stars'],
    ['astronomical unit (AU)', `$${sf(AU, 4)}$`, 'mean Earth–Sun distance; the solar system'],
    ['parsec (pc)', `$${sf(PARSEC, 3)}$ (${dec(PARSEC / LY, 3)} ly)`, 'distances between stars'],
    ['angstrom (Å)', '$10^{-10}$', 'sizes of atoms; wavelengths of light'],
    ['fermi (fm)', '$10^{-15}$', 'sizes of nuclei'],
  ],
  'Table of practical length units: light year, astronomical unit, parsec, angstrom and fermi with their values in metres',
);
const sfRows = [
  ['All non-zero digits count', '2.57', '2.57'],
  ['Zeros between non-zero digits count', '3.0052', '3.0052'],
  ['Zeros before the first non-zero digit do not count', '0.0043', '0.0043'],
  ['Trailing zeros after a decimal point count', '6.200', '6.200'],
  ['Trailing zeros with no decimal point do not count', '4500 m', '4500'],
  ['Powers of ten do not count', '4.50 × 10³', '4.50e3'],
];
const tSf = table(['Rule', 'Example', 'Significant figures'], sfRows.map(([rule, ex, parse]) => [rule, ex, String(sfCount(parse))]), 'Table of the rules for counting significant figures with an example and the count for each');
const tArith = table(
  ['Operation', 'Keep', 'Example'],
  [
    ['add or subtract', 'as many decimal places as the least precise number', `$${dec(ar.a[0], 4)} + ${dec(ar.a[1], 2)} + ${dec(ar.a[2], 3)}$ gives ${dec(ar.sumR, 3)}`],
    ['multiply or divide', 'as many significant figures as the least precise factor', `$${dec(ar.c[0], 3)} \\div ${dec(ar.c[1], 3)}$ gives ${dec(ar.quoR, 3)}`],
    ['exact numbers', 'unlimited: counts, defined factors, the 2 in 2πr', 'a square has exactly 4 sides'],
  ],
  'Table of the rules for adding, subtracting, multiplying and dividing with significant figures and for exact numbers',
);
const tErr = table(
  ['Kind of error', 'Cause', 'Effect and remedy'],
  [
    ['systematic', 'zero error, faulty calibration, a wrong method, a habit of the observer', 'shifts every reading the same way; correct it or change the method'],
    ['random', 'unpredictable small changes in reaction time, temperature, draughts', 'scatter both ways; reduce by taking many readings and averaging'],
    ['least count', 'the smallest division the instrument can show', 'a fixed limit on any single reading; use a finer instrument'],
  ],
  'Table comparing systematic errors, random errors and least-count error: causes, effects and remedies',
);
const tErrDef = table(
  ['Term', 'Meaning', 'Formula'],
  [
    ['mean value', 'best estimate of the true value', '$a_\\text{mean} = \\dfrac{a_1 + a_2 + \\dots + a_n}{n}$'],
    ['absolute error', 'size of the difference of one reading from the mean', '$|\\Delta a_i| = |a_\\text{mean} - a_i|$'],
    ['mean absolute error', 'average of the absolute errors', '$\\Delta a_\\text{mean} = \\dfrac{\\sum |\\Delta a_i|}{n}$'],
    ['relative error', 'error as a fraction of the value', '$\\dfrac{\\Delta a_\\text{mean}}{a_\\text{mean}}$'],
    ['percentage error', 'relative error × 100', '$\\dfrac{\\Delta a_\\text{mean}}{a_\\text{mean}} \\times 100\\ \\%$'],
  ],
  'Table defining mean value, absolute error, mean absolute error, relative error and percentage error',
);
const tComb = table(
  ['Result', 'Rule for the error'],
  [
    ['$Z = A + B$ or $Z = A - B$', '$\\Delta Z = \\Delta A + \\Delta B$ (absolute errors add)'],
    ['$Z = A B$ or $Z = A / B$', '$\\dfrac{\\Delta Z}{Z} = \\dfrac{\\Delta A}{A} + \\dfrac{\\Delta B}{B}$ (relative errors add)'],
    ['$Z = \\dfrac{A^{p} B^{q}}{C^{r}}$', '$\\dfrac{\\Delta Z}{Z} = p\\dfrac{\\Delta A}{A} + q\\dfrac{\\Delta B}{B} + r\\dfrac{\\Delta C}{C}$'],
  ],
  'Table of how errors combine in sums, differences, products, quotients and powers',
);
const dimRows = [
  ['area', 'length × breadth', Q.area],
  ['velocity', 'displacement ÷ time', Q.velocity],
  ['acceleration', 'velocity ÷ time', Q.accel],
  ['momentum', 'mass × velocity', Q.momentum],
  ['force', 'mass × acceleration', Q.force],
  ['work or energy', 'force × distance', Q.energy],
  ['power', 'work ÷ time', Q.power],
  ['pressure', 'force ÷ area', Q.pressure],
  ['frequency', '1 ÷ period', Q.frequency],
];
const tDim = table(['Quantity', 'Defined by', 'Dimensional formula'], dimRows.map(([q, def, d]) => [q, def, `$${dimTex(d)}$`]), 'Table of dimensional formulae of area, velocity, acceleration, momentum, force, energy, power, pressure and frequency');
const tConst = table(
  ['Constant', 'From the relation', 'Dimensional formula'],
  [
    ['gravitational constant $G$', '$F = G m_1 m_2 / r^2$', `$${dimTex(dG)}$`],
    ['Planck constant $h$', '$E = h \\nu$', `$${dimTex(dh)}$`],
    ['surface tension $S$', '$S = F / \\ell$ (force per unit length)', `$${dimTex(Q.surfTension)}$`],
  ],
  'Table of the dimensional formulae of the gravitational constant, the Planck constant and surface tension',
);
// worked check of three equations
const eqRows = [
  { eq: 's = ut + ½at²', lhs: L, rhs: [dmul(Q.velocity, T), dmul(Q.accel, T, T)] },
  { eq: 'v = u + at²', lhs: Q.velocity, rhs: [Q.velocity, dmul(Q.accel, T, T)] },
  { eq: 'v² = u² + 2as', lhs: dpow(Q.velocity, 2), rhs: [dpow(Q.velocity, 2), dmul(Q.accel, L)] },
];
const eqOk = eqRows.map((e) => e.rhs.every((d) => d.every((v, i) => Math.abs(v - e.lhs[i]) < 1e-9)));
export const EQ = { rows: eqRows, ok: eqOk };
const tEq = table(
  ['Equation', 'Dimensions of the terms', 'Verdict'],
  eqRows.map((e, i) => [e.eq, `$${dimTex(e.lhs)}$ ; ${e.rhs.map((d) => `$${dimTex(d)}$`).join(' , ')}`, eqOk[i] ? 'consistent' : 'not consistent']),
  'Table checking three kinematic equations for dimensional consistency',
);
const tLimit = table(
  ['Dimensional analysis can', 'Dimensional analysis cannot'],
  [
    ['check whether an equation could be correct', 'prove that an equation is correct'],
    ['deduce a relation for a quantity that is a pure product of powers', 'give numerical constants such as ½ or 2π'],
    ['convert a quantity from one system of units to another', 'handle sums of terms, or sin, log and exponential of a quantity with dimensions'],
  ],
  'Table of what dimensional analysis can and cannot do',
);

// T² against l for a simple pendulum (g = 9.8 m s⁻²)
const slope = (4 * Math.PI ** 2) / 9.8;
const penPts = [];
for (let l = 0.2; l <= 1.0001; l += 0.2) penPts.push([Number(l.toFixed(1)), Number((slope * l).toFixed(3))]);
export const SLOPE = slope;
const penPlot = plot(
  {
    x: { min: 0, max: 1.2, label: 'length l (m)' },
    y: { min: 0, max: 5, label: 'T² (s²)' },
    functions: [{ expr: `${slope.toFixed(3)}*x`, label: 'T² = (4π²/g) l for g = 9.8 m s⁻²' }],
    series: [{ label: 'computed values', kind: 'scatter', points: penPts }],
  },
  'Graph of the square of the pendulum period against its length: a straight line through the origin with slope 4 pi squared divided by g, about 4.03 seconds squared per metre',
  'The slope gives g. Dimensional analysis alone could not give the factor 4π².',
);

// ================================================================ Part 1
export const deck1 = deck({
  part: 1,
  title: 'Units and Measurements — Part 1: Units and significant figures',
  goals: [
    'Express quantities in SI units and tell base units from derived units',
    'Use prefixes and practical units such as the light year and the angstrom',
    'Count significant figures, round correctly and apply the rules in calculations',
  ],
  slides: [
    sl('title', 'Units and Measurements', {
      b: 'Part 1 — how physics puts numbers on the world: the SI system, units for the very large and the very small, and how many digits a measurement is really worth.',
      v: V.lengths,
      n: 'Physics begins with measurement. A cricket pitch, a bacterium and a distant star all need numbers, and every number needs a unit. In this part we meet the international system of units, the prefixes and practical units that let us span the nucleus to the galaxy, and the rules that tell us how many digits of a measurement deserve to be written.',
    }),
    sl('concept', 'A measurement is a number times a unit', {
      b: 'To measure a quantity is to compare it with a standard called a **unit**. The result is a **number × unit**; the number alone means nothing.',
      ul: [
        '**Base (fundamental) quantities** are chosen independently, such as length, mass and time.',
        '**Derived quantities** are built from them, such as speed, force and energy.',
        'A **system of units** fixes the units of the base quantities. The international standard is the **SI**, built on the MKS system.',
      ],
      v: tSystems,
      n: 'A length of three is meaningless, but three metres is a measurement. We measure by comparing with a standard, called a unit. A few base quantities, like length, mass and time, are chosen independently, and every other quantity is derived from them. Different systems fix different base units, for example centimetre gram second, or foot pound second, but the world now uses the SI, built on metre, kilogram and second.',
    }),
    sl('concept', 'The seven SI base units', {
      b: 'The SI has **seven** base quantities and units. Since 2019 each unit is defined by fixing the value of a natural constant.',
      ul: [
        r`The **metre** is fixed through the speed of light in vacuum, $c = 299\,792\,458$ m s$^{-1}$.`,
        'The **second** is fixed by the frequency of a caesium atomic clock.',
        'The **kilogram** is fixed through the Planck constant.',
      ],
      v: tBase,
      n: 'The SI has seven base units: metre, kilogram, second, ampere, kelvin, mole and candela. They are no longer defined by a metal bar or a block in a vault. Each is tied to a constant of nature. For example the speed of light is fixed at exactly two hundred and ninety nine million, seven hundred and ninety two thousand, four hundred and fifty eight metres per second, and that defines the metre.',
    }),
    sl('check', 'Quick check: base units', {
      b: 'Choose the correct option.',
      v: tBase,
      chk: 'baseunit-mcq',
      n: 'Look at the table of base units and decide which of the listed units is not one of the seven.',
    }),
    sl('concept', 'Derived units', {
      b: 'Every other unit is **derived** by multiplying or dividing base units. Many have their own names.',
      ul: ['A newton is the force that gives 1 kg an acceleration of 1 m s$^{-2}$.', 'Written in base units, each named unit shows the same combination of kg, m, s and A.', 'The dimensional formula of a quantity tells which combination of base quantities it is.'],
      v: tDerived,
      n: 'A derived unit comes from combining base units. Force is mass times acceleration, so the newton is one kilogram metre per second squared. The joule, watt, pascal and hertz are likewise names for particular combinations. The table shows each named unit rewritten in base units, which is a useful way to check an answer.',
    }),
    sl('diagram', 'Supplementary units: radian and steradian', {
      b: 'Angles also need units. Earlier systems called the radian and steradian **supplementary units**; today they are treated as **dimensionless derived units**.',
      ul: [
        r`**Plane angle:** $\theta = \dfrac{s}{r}$ (arc ÷ radius); 1 radian $= \dfrac{180^\circ}{\pi} \approx 57.3^\circ$.`,
        r`**Solid angle:** $\Omega = \dfrac{A}{r^2}$; a whole sphere subtends $4\pi$ steradian.`,
        'Each is a ratio of two like quantities, so it has no dimensions.',
      ],
      v: V.radian,
      n: 'To measure an angle, draw a circle around its tip. The angle in radians is the arc cut off divided by the radius. When the arc equals the radius, the angle is one radian, about fifty seven point three degrees. In three dimensions, the solid angle is the patch of surface area divided by the radius squared, measured in steradians. Both are ratios of like quantities, so they have no dimensions.',
    }),
    sl('example', 'Worked example 1: the angular size of the Moon', {
      b: r`The Moon has diameter $${sf(moon.d, 3)}$ m and is $${sf(moon.r, 3)}$ m from the Earth. Find the angle it subtends at the Earth, in radian and in degree.`,
      ul: [
        r`Step 1 — for a small angle the diameter is almost an arc of radius $r$: $\theta = \dfrac{d}{r} = \dfrac{${sf(moon.d, 3)}}{${sf(moon.r, 3)}} \approx ${sf(moon.th, 3)}$ rad.`,
        r`Step 2 — in degrees: $\theta \approx ${sf(moon.th, 3)} \times \dfrac{180}{\pi} \approx ${dec(moon.deg, 3)}^\circ$, about half a degree.`,
      ],
      v: V.radian,
      n: `The Moon is so far away that its diameter is almost an arc of a huge circle centred on us. Dividing the diameter by the distance gives ${dec(moon.th * 1000, 3)} thousandths of a radian. Multiplying by one hundred and eighty over pi converts it to about ${dec(moon.deg, 3)} of a degree, roughly half a degree, which matches how small the full Moon looks.`,
    }),
    sl('concept', 'Prefixes: the SI ladder', {
      b: 'Powers of ten are written with **prefixes** so that numbers stay readable. A prefix multiplies the unit that follows it.',
      ul: ['Prefixes go in steps of 1000 from kilo up and from milli down, with the exception of centi, deci, deca and hecto.', 'Prefixes are never combined: write nanometre, not millimicrometre.'],
      v: tPrefix,
      n: 'Prefixes keep numbers readable. Kilo means a thousand, mega a million, giga a thousand million and tera a million million. Going down, milli is a thousandth, micro a millionth, nano a thousand millionth and so on to femto. Each prefix multiplies the unit it is attached to, and prefixes are never stacked on top of one another.',
    }),
    sl('concept', 'Practical units for the very large and very small', {
      b: 'SI units are inconvenient at the extremes, so physicists also use these **practical units**:',
      ul: [`A **light year** is the distance light travels in one year: $${sf(C_LIGHT, 4)} \\times ${sf(YEAR, 4)} \\approx ${sf(LY, 3)}$ m.`, 'The **parsec** is about 3.26 light years.', 'The **angstrom** and the **fermi** are used for atoms and nuclei.'],
      v: tPractical,
      n: `Distances between stars are far too large for metres, so astronomers use the light year, the distance light covers in one year, about ${dec(LY / 1e15, 3)} thousand million million metres. The astronomical unit is the Earth to Sun distance. For the tiny scale, the angstrom is a ten thousand millionth of a metre, the size of an atom, and the fermi, a hundred thousand times smaller still, is the size of a nucleus.`,
    }),
    sl('diagram', 'Spanning thirty two powers of ten', {
      b: 'On a **logarithmic scale** each tick is a factor of $10^5$.',
      ul: ['A nucleus is a few fermi; an atom is about one angstrom; the Earth is $6.4 \\times 10^{6}$ m in radius.', r`One light year is about $${sf(LY / AU, 3)}$ AU, and one parsec is about ${dec(PARSEC / LY, 3)} light years.`],
      v: V.lengths,
      n: 'This scale is logarithmic: each step to the right multiplies the length by ten, and each tick is five such steps. A fermi, an angstrom, the wavelength of light, a person, the Earth, the astronomical unit and the light year all fit on one line. The light year is more than sixty thousand astronomical units, and a parsec is a little over three light years.',
    }),
    sl('example', 'Worked example 2: a nearby star', {
      b: r`Proxima Centauri is ${dec(prox.ly, 3)} light years away. Express this distance in metre, in parsec and in AU. (1 ly $= ${sf(LY, 3)}$ m, 1 pc $= ${sf(PARSEC, 3)}$ m, 1 AU $= ${sf(AU, 4)}$ m.)`,
      ul: [
        r`Step 1 — in metre: $${dec(prox.ly, 3)} \times ${sf(LY, 3)} \approx ${sf(prox.m, 3)}$ m.`,
        r`Step 2 — in parsec: $\dfrac{${sf(prox.m, 3)}}{${sf(PARSEC, 3)}} \approx ${dec(prox.pc, 3)}$ pc.`,
        r`Step 3 — in AU: $\dfrac{${sf(prox.m, 3)}}{${sf(AU, 4)}} \approx ${sf(prox.au, 3)}$ AU.`,
      ],
      v: V.lengths,
      n: `Multiply the number of light years by the metres in one light year to get about ${dec(prox.m / 1e16, 3)} times ten to the sixteen metres. Dividing by the metres in a parsec gives about ${dec(prox.pc, 3)} parsec. Dividing by the metres in an astronomical unit gives roughly ${dec(prox.au / 1e5, 3)} hundred thousand astronomical units. The same distance, three different numbers, depending on the unit.`,
    }),
    sl('check', 'Quick check: converting units', {
      b: 'Work out the answer and enter it.',
      v: tPractical,
      chk: 'comet-num',
      n: 'Convert the given quantity by multiplying by the value of the practical unit from the table.',
    }),
    sl('concept', 'Significant figures: what a reading is worth', {
      b: 'A measurement carries the digits the instrument can **certainly** show, plus **one uncertain** digit estimated by eye. These are its **significant figures**.',
      ul: [`On the millimetre scale the rod reads ${ROD.toFixed(2)} cm: the 4 and the 6 are certain, the last digit 3 is an estimate.`, 'Writing more digits than the instrument justifies claims precision you do not have.', 'Changing units must not change the number of significant figures.'],
      v: V.ruler,
      n: 'The millimetre scale shows the rod ending between the four point six and four point seven centimetre marks. We can say the first two digits for certain, and estimate the third by eye. All three digits are significant, the last one being uncertain. Writing more digits would pretend to a precision the scale cannot give, and changing the unit must never change the count.',
    }),
    sl('concept', 'Counting significant figures', {
      b: 'Use these rules to count the significant figures in a written number:',
      v: tSf,
      ul: ['Writing a number in the form $a \\times 10^{n}$ with the correct digits in $a$ removes any doubt about trailing zeros.'],
      n: 'Here are the rules. Every non zero digit counts. Zeros between non zero digits count. Zeros in front of the first non zero digit do not count, they only place the decimal point. Zeros at the end count if there is a decimal point, and do not count if there is none. A power of ten never counts. Writing a number in scientific form removes any doubt.',
    }),
    sl('example', 'Worked example 3: counting and rounding', {
      b: 'State the number of significant figures in each value, and then round each of the second set to 3 significant figures.',
      ul: [
        `Counting — ${cnt.map((c) => `${c.shown}: **${c.n}**`).join('; ')}.`,
        r`Rounding rule — if the digit to be dropped is more than 5, raise the last digit; if less than 5, leave it; if it is exactly 5 with nothing after it, make the last kept digit **even**.`,
        `Rounding — ${rnd.map((c) => `${String(c.x)} → **${dec(c.out, 3)}**`).join('; ')}.`,
      ],
      v: tSf,
      n: 'Counting first. The value with leading zeros and a final zero after the decimal point has three. The one with zeros inside and a trailing zero after the decimal has five. Seven thousand two hundred written without a decimal point has two, but in scientific form with a decimal it has four. For rounding, a dropped five is made to leave the last kept digit even, so two point seven four five and two point seven three five both become two point seven four.',
    }),
    sl('concept', 'Arithmetic with significant figures', {
      b: 'A calculator shows many digits; the answer may keep only as many as the data justify.',
      v: tArith,
      ul: ['Carry **one extra digit** through intermediate steps and round only at the end.', 'Counted numbers and defined factors are **exact** and do not limit the answer.'],
      n: 'When adding or subtracting, look at decimal places: the answer keeps as many decimal places as the least precise number. When multiplying or dividing, look at significant figures: the answer keeps as many as the factor with the fewest. Exact numbers, like the four sides of a square or the two in two pi r, never limit the answer. Round only once, at the very end.',
    }),
    sl('example', 'Worked example 4: calculations', {
      b: 'Evaluate with the correct number of significant figures: (a) $12.78 + 3.1 + 0.456$; (b) the area of a plate $12.4$ cm by $8.25$ cm; (c) the speed of a cyclist who covers $482$ m in $12.5$ s.',
      ul: [
        r`(a) The sum is $${dec(ar.sum, 5)}$. The least precise number, $3.1$, has one decimal place, so the answer is $${dec(ar.sumR, 3)}$.`,
        r`(b) $12.4 \times 8.25 = ${dec(ar.prod, 4)}$ cm$^2$. Both factors have 3 significant figures, so the area is $${dec(ar.prodR, 3)}$ cm$^2$.`,
        r`(c) $\dfrac{482}{12.5} = ${dec(ar.quo, 4)}$. Both have 3 significant figures, so the speed is $${dec(ar.quoR, 3)}$ m s$^{-1}$.`,
      ],
      v: tArith,
      n: `In part a the sum on the calculator is ${dec(ar.sum, 5)}, but the least precise number has one decimal place, so we report ${dec(ar.sumR, 3)}. In part b the product is ${dec(ar.prod, 4)}, and with three significant figures in both factors the answer is ${dec(ar.prodR, 3)} square centimetres. In part c the quotient is ${dec(ar.quo, 4)}, reported as ${dec(ar.quoR, 3)} metres per second.`,
    }),
    sl('check', 'Quick check: significant figures', {
      b: 'Choose the correct option.',
      v: tSf,
      chk: 'sfadd-mcq',
      n: 'Decide whether decimal places or significant figures control the answer for this operation.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['SI', 'Seven base units; every other unit is derived'],
          ['Angles', 'radian θ = s/r, steradian Ω = A/r²; both dimensionless'],
          ['Practical units', `1 ly ≈ ${pt(LY, 3)} m; 1 AU ≈ ${pt(AU, 4)} m; 1 pc ≈ ${pt(PARSEC, 3)} m; 1 Å = 10⁻¹⁰ m; 1 fm = 10⁻¹⁵ m`],
          ['Significant figures', 'certain digits plus one uncertain digit'],
          ['Add or subtract', 'least number of decimal places'],
          ['Multiply or divide', 'least number of significant figures'],
        ],
        'Summary table of SI units, angles, practical units and the rules for significant figures',
      ),
      n: 'To sum up. The SI has seven base units and everything else is derived. Radian and steradian are dimensionless ratios. Practical units such as the light year, astronomical unit, parsec, angstrom and fermi cover the huge and the tiny. A measurement has certain digits and one uncertain digit. Adding keeps the fewest decimal places, and multiplying keeps the fewest significant figures.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'Write the unit with every number, and convert before calculating.',
        'In a conversion, count significant figures in the **given** data, not in the conversion factor if it is exact.',
        'Round only at the end; show the unrounded value in the working.',
        'Trailing zeros without a decimal point are not significant: use scientific notation when you need them to be.',
      ],
      v: table(['Asked', 'Key point'], [['Is the radian a base unit?', 'No: dimensionless derived unit'], ['4500 m: how many significant figures?', 'Two, unless written 4.500 × 10³ m'], ['Sum of 2.50 and 0.4', 'Round to one decimal place']], 'Table of common questions on units and significant figures with the key point for each'),
      n: 'Always write the unit, and convert units before you calculate. Count significant figures from the measured data, since defined factors are exact. Keep extra digits in the working and round once at the end. And remember the trap: trailing zeros with no decimal point are not significant, so use scientific form when you need them counted.',
    }),
  ],
});

// ================================================================ Part 2
export const deck2 = deck({
  part: 2,
  title: 'Units and Measurements — Part 2: Errors and dimensional analysis',
  goals: [
    'Find absolute, relative and percentage error and combine errors in calculations',
    'Write dimensional formulae and check whether an equation is consistent',
    'Deduce relations by dimensional analysis and state its limitations',
  ],
  slides: [
    sl('title', 'Errors and dimensions', {
      b: 'Part 2 — no measurement is exact, so how far can a result be trusted? And how can dimensions alone expose a wrong equation?',
      v: V.dots,
      n: 'Every measurement is a little off. In this part we learn to say how far off, by finding errors in a reading and in a result calculated from several readings. Then we turn to dimensions, a surprisingly powerful tool: simply by comparing the dimensions on both sides of an equation we can expose a mistake, and sometimes even derive a formula.',
    }),
    sl('concept', 'Accuracy, precision and kinds of error', {
      b: '**Accuracy** is how close a result is to the true value. **Precision** is how closely repeated readings agree with each other. A set of readings can be precise but inaccurate.',
      v: tErr,
      n: 'Accuracy is closeness to the true value, precision is closeness of the readings to one another. A stopwatch that runs fast gives precise but inaccurate times. Systematic errors push every reading the same way, such as a zero error. Random errors scatter the readings both ways and are reduced by averaging. The least count of the instrument sets a final limit on any single reading.',
    }),
    sl('diagram', 'Repeated readings, mean and error', {
      b: 'Several students time the same event. Each reading differs from the **mean** by an **absolute error**.',
      ul: ['The mean is the best estimate of the true value.', 'The **mean absolute error** is the average of the absolute errors; it describes the spread.'],
      v: V.dots,
      n: 'Here five readings of the same time are plotted. Their mean, the dashed line, is the best estimate of the true value. Each reading lies some distance from it, and that distance is its absolute error. The average of those distances is the mean absolute error, shown by the shaded band. A smaller band means a more precise set of readings.',
    }),
    sl('example', 'Worked example 5: timing a rolling marble', {
      b: r`Five students time a marble rolling down a ramp: ${RAMP.map((v) => v.toFixed(2)).join(', ')} s. Find the mean, the mean absolute error, the relative error and the percentage error, and write the result.`,
      ul: [
        r`Step 1 — mean $= \dfrac{${RAMP.map((v) => v.toFixed(2)).join(' + ')}}{5} = ${dec(rp.mean, 3)}$ s.`,
        r`Step 2 — absolute errors: ${rp.errs.map((e) => `$${e.toFixed(2)}$`).join(', ')} s. Their mean is $\dfrac{${rp.errs.reduce((s, e) => s + e, 0).toFixed(2)}}{5} = ${dec(rp.dm, 2)}$ s, and with one significant figure $\Delta T \approx ${rp.dm.toFixed(2)}$ s.`,
        r`Step 3 — relative error $= \dfrac{${dec(rp.dm, 2)}}{${dec(rp.mean, 3)}} \approx ${dec(rp.rel, 2)}$; percentage error $\approx ${dec(rp.pct, 2)}\ \%$.`,
        r`Result: $t = (${dec(rp.mean, 3)} \pm ${rp.dm.toFixed(2)})$ s.`,
      ],
      v: V.dots,
      n: `The mean of the five times is ${dec(rp.mean, 3)} seconds. The absolute errors are four, two, one, five and two hundredths of a second, which average to ${dec(rp.dm, 2)} seconds. Dividing by the mean gives a relative error of about ${dec(rp.rel, 2)}, or ${dec(rp.pct, 2)} percent. We report the time as ${dec(rp.mean, 3)} plus or minus ${rp.dm.toFixed(2)} seconds.`,
    }),
    sl('check', 'Quick check: absolute error', {
      b: 'Work out the answer and enter it.',
      v: V.dots,
      chk: 'abserr-num',
      n: 'Find the mean first, then average the sizes of the differences from it.',
    }),
    sl('concept', 'Error definitions at a glance', {
      b: 'Keep the error to **one** significant figure (two at most), and give the mean to the same decimal place.',
      v: tErrDef,
      n: 'Here are the definitions together. The mean is the best value. The absolute error of a reading is its distance from the mean, and the mean absolute error is the average of those. The relative error divides that by the mean, and the percentage error multiplies by one hundred. The final result is quoted as the mean plus or minus the error, with the same number of decimal places.',
    }),
    sl('concept', 'Combining errors', {
      b: 'When a result is calculated from measured quantities, their errors combine:',
      v: tComb,
      ul: ['Sum or difference: add the **absolute** errors.', 'Product or quotient: add the **relative** errors.', 'Powers: multiply the relative error by the power.'],
      n: 'In a sum or a difference, the absolute errors add, even when you subtract. In a product or a quotient, the relative errors add. If a quantity is raised to a power, its relative error is multiplied by that power, so a squared quantity contributes twice its relative error. These simple rules give the largest likely error in the result.',
    }),
    sl('diagram', 'Why relative errors add in a product', {
      b: 'A rectangle has area $A = l b$. Increase $l$ by $\\Delta l$ and $b$ by $\\Delta b$:',
      ul: ['The extra area is two thin strips and a tiny corner: $\\Delta A \\approx b\\,\\Delta l + l\\,\\Delta b$.', 'Divide by $A = l b$: $\\dfrac{\\Delta A}{A} = \\dfrac{\\Delta l}{l} + \\dfrac{\\Delta b}{b}$.'],
      v: V.area,
      n: 'Here is why. Make the length and the breadth slightly bigger and the area grows by two thin strips and a very small corner. The corner is a product of two small errors, so we ignore it. Dividing the two strips by the area, the relative errors of length and breadth simply add. The same reasoning works for quotients and powers.',
    }),
    sl('example', 'Worked example 6: resistance from V and I', {
      b: r`A potential difference $V = (${dec(res.V, 3)} \pm ${res.dV})$ V drives a current $I = (${dec(res.I, 3)} \pm ${res.dI})$ A through a resistor. Find $R = V/I$ with its error.`,
      ul: [
        r`Step 1 — $R = \dfrac{${dec(res.V, 3)}}{${dec(res.I, 3)}} = ${dec(res.R, 3)}\ \Omega$.`,
        r`Step 2 — $\dfrac{\Delta R}{R} = \dfrac{${res.dV}}{${dec(res.V, 3)}} + \dfrac{${res.dI}}{${dec(res.I, 3)}} = ${dec(res.dV / res.V, 3)} + ${dec(res.dI / res.I, 3)} = ${dec(res.relR, 3)}$, or ${dec(res.relR * 100, 3)} %.`,
        r`Step 3 — $\Delta R = ${dec(res.R, 3)} \times ${dec(res.relR, 3)} = ${dec(res.dR, 3)}\ \Omega$. Result: $R = (${dec(res.R, 2)} \pm ${dec(roundSf(res.dR, 1), 1)})\ \Omega$.`,
      ],
      v: tComb,
      n: `The resistance is twelve volts over two point five amperes, which is ${dec(res.R, 3)} ohms. For a quotient the relative errors add: a sixtieth from the voltage and a fiftieth from the current, giving a total of ${dec(res.relR * 100, 3)} percent. Multiplying by the resistance gives an absolute error of ${dec(res.dR, 3)} ohm, so we write ${dec(res.R, 2)} plus or minus ${dec(roundSf(res.dR, 1), 1)} ohms.`,
    }),
    sl('check', 'Quick check: combining errors', {
      b: 'Choose the correct option.',
      v: tComb,
      chk: 'comb-mcq',
      n: 'Decide whether the absolute or the relative errors add for this combination.',
    }),
    sl('example', 'Worked example 7: g from a pendulum', {
      b: r`A pendulum of length $l = (${dec(pg.l, 3)} \pm ${dec(pg.dl, 1)})$ m has a period $T = (${dec(pg.T, 3)} \pm ${pg.dT})$ s. Use $g = 4\pi^2 l / T^2$ to find $g$ and its error.`,
      ul: [
        r`Step 1 — $g = \dfrac{4\pi^2 \times ${dec(pg.l, 3)}}{(${dec(pg.T, 3)})^2} = ${dec(pg.g, 4)}$ m s$^{-2}$.`,
        r`Step 2 — $T$ is squared, so $\dfrac{\Delta g}{g} = \dfrac{\Delta l}{l} + 2\dfrac{\Delta T}{T} = ${dec(pg.dl / pg.l, 3)} + ${dec((2 * pg.dT) / pg.T, 3)} = ${dec(pg.rel, 3)}$.`,
        r`Step 3 — $\Delta g = ${dec(pg.g, 4)} \times ${dec(pg.rel, 3)} = ${dec(pg.dg, 3)}$ m s$^{-2}$. Result: $g = (${dec(roundSf(pg.g, 2), 2)} \pm ${dec(roundSf(pg.dg, 1), 1)})$ m s$^{-2}$.`,
      ],
      v: V.pendulum,
      n: `The pendulum gives g equal to four pi squared times length over period squared, about ${dec(pg.g, 3)} metres per second squared. Because the period is squared, its relative error counts twice. Adding gives a relative error of about ${dec(pg.rel * 100, 3)} percent, so g is known to within about ${dec(roundSf(pg.dg, 1), 1)}. Notice that the timing error dominates the length error.`,
    }),
    sl('concept', 'Dimensions of physical quantities', {
      b: 'The **dimensions** of a quantity are the powers to which the base quantities are raised to represent it. We write $[\\text{M}]$, $[\\text{L}]$, $[\\text{T}]$ for mass, length, time, and $[\\text{A}]$, $[\\text{K}]$ for current and temperature.',
      ul: ['Pure numbers, angles and ratios of like quantities are **dimensionless**: $[\\text{M}^0\\text{L}^0\\text{T}^0]$.', 'Only quantities with the **same dimensions** may be added, subtracted or equated.'],
      v: tDim,
      n: 'The dimensions of a quantity tell which base quantities make it up and in what powers. Area is length squared, velocity is length over time, and force is mass times length over time squared. A pure number or a ratio of like quantities has no dimensions. Dimensions are not units, but they decide which quantities can legitimately be added, subtracted or set equal.',
    }),
    sl('example', 'Worked example 8: dimensions of constants', {
      b: r`Find the dimensional formulae of (a) the gravitational constant $G$ from $F = G m_1 m_2 / r^2$, and (b) the Planck constant $h$ from $E = h\nu$.`,
      ul: [
        r`(a) $[G] = \dfrac{[F][r^2]}{[m^2]} = \dfrac{${dimTex(Q.force)}\,[\text{L}^{2}]}{[\text{M}^{2}]} = ${dimTex(dG)}$.`,
        r`(b) $[h] = \dfrac{[E]}{[\nu]} = ${dimTex(Q.energy)} \times [\text{T}] = ${dimTex(dh)}$.`,
      ],
      v: tConst,
      n: 'For the gravitational constant, rearrange the law of gravitation: G is force times distance squared divided by mass squared. Substituting the dimensions of force gives mass to the minus one, length cubed, time to the minus two. For the Planck constant, divide energy by frequency, which means multiplying energy by time, giving mass, length squared, time to the minus one.',
    }),
    sl('diagram', 'The principle of homogeneity', {
      b: 'In a correct physical equation every term has the **same dimensions**, like the two pans of a balance.',
      ul: ['This does not depend on the units used.', 'A numerical factor such as ½ has no dimensions and cannot be tested.'],
      v: V.balance,
      n: 'This is the principle of homogeneity. In a correct equation every term must have the same dimensions, just as a balance can only weigh like with like. In the equation for distance, the displacement is a length, the product of velocity and time is a length, and the half a t squared term is also a length. The numerical factor one half has no dimensions, so it cannot be tested this way.',
    }),
    sl('example', 'Worked example 9: checking equations', {
      b: 'Use dimensions to check which of the three equations could be correct. Here $s$ is displacement, $u$ and $v$ are velocities, $a$ is acceleration and $t$ is time.',
      ul: ['Compare the dimensions of the left side with those of **every** term on the right.', `Result — ${eqRows.map((e, i) => `$${e.eq.replace('½', '\\tfrac{1}{2}').replace(/²/g, '^2')}$ is **${eqOk[i] ? 'consistent' : 'not consistent'}**`).join('; ')}.`, 'A consistent equation is only possibly correct: the numerical factors are untested.'],
      v: tEq,
      n: 'Compare each term. In the first equation displacement, velocity times time and acceleration times time squared are all lengths, so it is consistent. In the second, acceleration times time squared is a length but velocity is length per time, so the equation cannot be right. In the third, every term has dimensions of length squared over time squared, so it is consistent. Consistency does not prove correctness.',
    }),
    sl('check', 'Quick check: homogeneity', {
      b: 'Choose the correct option.',
      v: tEq,
      chk: 'homog-mcq',
      n: 'Work out the dimensions of each term and compare them.',
    }),
    sl('diagram', 'Deducing a relation: the simple pendulum', {
      b: r`Suppose the period depends only on the mass $m$, the length $l$ and $g$: $T = k\,m^{a}\,l^{b}\,g^{c}$ with $k$ a pure number.`,
      ul: [
        r`Equate dimensions: $[\text{T}] = [\text{M}]^{a}[\text{L}]^{b}\,[\text{L}\,\text{T}^{-2}]^{c}$.`,
        r`Compare powers — M: $a = 0$; L: $b + c = 0$; T: $-2c = 1$. So $a = ${pend[0]}$, $b = ${pend[1]}$, $c = ${pend[2]}$ and $T = k\sqrt{l/g}$.`,
        'The mass does not appear; $k$ ($= 2\\pi$) must come from experiment or theory.',
      ],
      v: V.pendulum,
      n: 'Suppose the period of a pendulum depends on mass, length and gravity. Write the period as a constant times mass to the a, length to the b and g to the c, and equate dimensions. The mass power must be zero. The time power gives c equal to minus one half, and then length gives b equal to one half. So the period is a constant times the square root of length over g. The constant itself needs experiment.',
    }),
    sl('example', 'Worked example 10: speed of a wave on a string', {
      b: r`The speed $v$ of a wave on a stretched string depends on its tension $F$ and its mass per unit length $\mu$. Deduce $v = k F^{a}\mu^{b}$.`,
      ul: [
        r`$[\text{L}\,\text{T}^{-1}] = [\text{M}\,\text{L}\,\text{T}^{-2}]^{a}\,[\text{M}\,\text{L}^{-1}]^{b}$.`,
        r`M: $a + b = 0$; L: $a - b = 1$; T: $-2a = -1$. Hence $a = ${strg[0]}$ and $b = ${strg[1]}$.`,
        r`$v = k\sqrt{\dfrac{F}{\mu}}$, which is the correct form (here $k = 1$).`,
      ],
      v: table(['Quantity', 'Dimensional formula'], [['speed $v$', `$${dimTex(Q.velocity)}$`], ['tension $F$', `$${dimTex(Q.force)}$`], ['mass per unit length $\\mu$', `$${dimTex(Q.linDensity)}$`]], 'Table of the dimensional formulae of wave speed, tension and mass per unit length'),
      n: 'Write the speed as a constant times tension to the a times mass per unit length to the b. Matching powers of time gives a equal to one half. Matching mass gives b equal to minus one half. Matching length confirms it. So the speed is proportional to the square root of tension over mass per unit length, which is exactly the right form, with the constant equal to one.',
    }),
    sl('two-column', 'What dimensional analysis can and cannot do', {
      b: 'A powerful check, but not a proof.',
      cols: [
        '**It can**\n- Test whether an equation could be right\n- Deduce a relation among up to three quantities\n- Convert from one system of units to another',
        '**It cannot**\n- Supply numbers such as ½ or 2π\n- Handle sums of terms\n- Deal with sin, log or exponential of a quantity with dimensions',
      ],
      v: penPlot,
      n: 'Dimensional analysis can test an equation, deduce a relation for a quantity that is a product of powers, and convert units. It cannot give pure numbers like one half or two pi, which is why the graph of period squared against length is needed to find g from the slope. It also cannot handle sums of terms or functions like sine and logarithm of a dimensional quantity.',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Errors', 'absolute: |mean − reading|; relative: mean error ÷ mean; percentage: × 100'],
          ['Sum or difference', 'ΔZ = ΔA + ΔB'],
          ['Product or quotient', 'ΔZ/Z = ΔA/A + ΔB/B'],
          ['Power', 'Z = Aᵖ: ΔZ/Z = p ΔA/A'],
          ['Dimensions', 'every term in a correct equation has the same dimensions'],
          ['Limits', 'no numerical constants, no sums, no sin, log or exp'],
        ],
        'Summary table of error definitions, rules for combining errors and the use and limits of dimensional analysis',
      ),
      n: 'To sum up. Absolute, relative and percentage errors describe how far a result may be off. In sums and differences the absolute errors add. In products and quotients the relative errors add, and powers multiply the relative error. Dimensions let us test equations and deduce relations, but they cannot give numerical constants or deal with sums of terms.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'In a quotient the errors **add**: never subtract them.',
        'Give the error to one significant figure and match the decimal places of the result.',
        'To check an equation, find the dimensions of **every** term, not just the first.',
        'To deduce a relation, write one equation per base quantity and solve for the powers.',
      ],
      v: table(['Asked', 'Key point'], [['Error in a difference?', 'Add the absolute errors'], ['Percentage error in $x^3$ if $x$ has 2 %?', '3 × 2 % = 6 %'], ['Can dimensions give the ½ in ½mv²?', 'No: numerical factors are untestable']], 'Table of common questions on errors and dimensions with the key point for each'),
      n: 'Remember that errors add in quotients and differences alike, never subtract them. Quote the error to one significant figure and match the decimal places of the result. When checking an equation test every term, and when deducing a relation write one equation for each base quantity. Finally, dimensions can never tell you the numerical constant.',
    }),
  ],
});
void [Kel, D, dimTxt, sup, sci, flow, svgV, r];
