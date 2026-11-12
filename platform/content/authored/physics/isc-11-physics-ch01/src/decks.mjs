// ISC 11 ch01 Units and Measurement — two decks: Part 1 (t01 to t03) systems of units, the SI, rules for unit names and symbols,
// prefixes, practical units and how lengths, masses and times are measured; Part 2 (t04 to t06) errors, significant figures,
// rounding, order of magnitude, dimensions and the uses and limits of dimensional analysis. Every number on a slide is computed here.
import { sl, deck, table, svgV, r, sci, dec } from './lib.mjs';
import { sfCount, roundSf, pt, dimTex, Q, M, L, T, A, D, dmul, ddiv, dpow, mean, meanAbsErr, C_LIGHT, YEAR, AU, PARSEC, LY, ARCSEC, U_KG, orderOfMag, convert, sup } from './calc.mjs';
import * as G from './svgs.mjs';
import { sf } from './calc.mjs';

// ---------------------------------------------------------------- worked-example numbers
const tr = { kmh: 270 };
tr.ms = (tr.kmh * 1000) / 3600;
const prefixEx = { uF: 2.2, F: 2.2e-6, GHz: 4.2, Hz: 4.2e9, pm: 350, m: 350e-12 };
const star = { p: 0.4 }; // arcsecond
star.pc = 1 / star.p;
star.m = star.pc * PARSEC;
star.ly = star.m / LY;
star.au = star.m / AU;
const atom = { O: 16, kg: 16 * U_KG, au: 1.4e-14 };
atom.nucFm = 14.0;
atom.nucM = atom.nucFm * 1e-15;
atom.nucA = atom.nucM / 1e-10;
const cnt = [
  ['0.0320', '0.0320'],
  ['4.050', '4.050'],
  ['2600', '2600'],
  ['2.600 × 10³', '2.600e3'],
  ['6.02 × 10²³', '6.02e23'],
].map(([shown, parse]) => ({ shown, n: sfCount(parse) }));
const rnd = [
  [7.865, 3],
  [7.875, 3],
  [0.012349, 3],
  [45.65, 3],
].map(([x, n]) => ({ x, n, out: roundSf(x, n) }));
const ar = { a: [21.34, 3.7, 0.052], b: [14.2, 6.35], c: [135, 4.2] };
ar.sum = ar.a.reduce((s, v) => s + v, 0);
ar.sumR = Number(ar.sum.toFixed(1));
ar.prod = ar.b[0] * ar.b[1];
ar.prodR = roundSf(ar.prod, 3);
ar.quo = ar.c[0] / ar.c[1];
ar.quoR = roundSf(ar.quo, 2);
const rp = { times: [...G.PEND] };
rp.mean = mean(G.PEND);
rp.errs = G.PEND.map((v) => Math.abs(rp.mean - v));
rp.dm = meanAbsErr(G.PEND);
rp.rel = rp.dm / rp.mean;
rp.pct = rp.rel * 100;
const oom = {
  uni: { yr: 13.8e9 },
  beats: { rate: 72, years: 70 },
};
oom.uni.s = oom.uni.yr * YEAR;
oom.beats.n = oom.beats.rate * 60 * 24 * 365.25 * oom.beats.years;
const oomRows = [
  ['radius of a hydrogen atom', 5.3e-11, 'm'],
  ['mass of a proton', 1.67e-27, 'kg'],
  ['radius of the Earth', 6.4e6, 'm'],
  ['mass of the Earth', 5.97e24, 'kg'],
  ['age of the universe', oom.uni.s, 's'],
  ['heartbeats in 70 years', oom.beats.n, ''],
].map(([what, x, u]) => ({ what, x, u, k: orderOfMag(x) }));
const dG = ddiv(dmul(Q.force, dpow(L, 2)), dpow(M, 2));
const dh = dmul(Q.energy, T);
const dA = dmul(Q.pressure, dpow(L, 6)); // van der Waals a: P V^2 per mole^2 (amount ignored, as in the chapter exercise)
const conv = {
  newton: convert(1, Q.force, 'SI', 'CGS'),
  joule: convert(1, Q.energy, 'SI', 'CGS'),
  pascal: convert(1, Q.pressure, 'SI', 'CGS'),
  g: convert(9.8, Q.accel, 'SI', 'FPS'),
  G: convert(6.67e-11, dG, 'SI', 'CGS'),
  rho: convert(1, Q.density, 'CGS', 'SI'),
};
const eqRows = [
  { eq: 'v² = u² + 2as', lhs: dpow(Q.velocity, 2), rhs: [dpow(Q.velocity, 2), dmul(Q.accel, L)] },
  { eq: 'P = ρ g h', lhs: Q.pressure, rhs: [dmul(Q.density, Q.accel, L)] },
  { eq: 'K = ½ m v', lhs: Q.energy, rhs: [dmul(M, Q.velocity)] },
  { eq: 'T = 2π √(l / g)', lhs: T, rhs: [dpow(ddiv(L, Q.accel), 0.5)] },
];
const eqOk = eqRows.map((e) => e.rhs.every((d) => d.every((v, i) => Math.abs(v - e.lhs[i]) < 1e-9)));
export const EQ = { rows: eqRows, ok: eqOk };
export const EX = { tr, prefixEx, star, atom, cnt, rnd, ar, rp, oom, oomRows, dG, dh, dA, conv, eqOk };

const UNITS = ['kg', 'm', 's', 'A', 'K'];
export const unitTxt = (d) => {
  if (d.every((v, i) => v === Q.charge[i])) return 'A s';
  const parts = UNITS.map((u, i) => (d[i] ? u + (d[i] === 1 ? '' : sup(d[i])) : '')).filter(Boolean);
  return parts.join(' ');
};

// ---------------------------------------------------------------- visuals
export const V = {
  lengths: svgV(G.LENGTHS, 'A logarithmic scale of lengths from the fermi to the parsec', 'Every tick is a factor of 100 000 in length.'),
  parallax: svgV(G.PARALLAX, 'A triangle formed by the Sun, the Earth and a distant star, showing the parallax angle p and the relation D equals b divided by p', 'Not to scale: the real angle is tiny.'),
  radian: svgV(G.RADIAN, 'A circle with an arc equal to its radius marking one radian, and a sphere with a patch of area r squared marking one steradian'),
  ruler: svgV(G.RULER, `A metal strip measured against a millimetre scale, read as ${G.ROD.toFixed(2)} centimetres with the last digit estimated`, 'Digits 5 and 2 are certain; the 7 is an estimate.'),
  dots: svgV(G.DOTS, 'Five stopwatch readings on a number line with their mean and a band for the mean absolute error'),
  order: svgV(G.ORDER, 'A logarithmic number line from 1 to 10 with 3.16 at the midpoint, dividing numbers whose order of magnitude is k from those whose order is k plus 1'),
  balance: svgV(G.BALANCE, 'A balance showing that v squared and each term of u squared plus 2 a s have the same dimensions'),
};

const tSystems = table(
  ['System', 'Length', 'Mass', 'Time', 'Force', 'Work'],
  [
    ['CGS', 'centimetre', 'gram', 'second', 'dyne', 'erg'],
    ['FPS', 'foot', 'pound', 'second', 'poundal', 'foot-poundal'],
    ['MKS', 'metre', 'kilogram', 'second', 'newton', 'joule'],
    ['MKSA', 'metre', 'kilogram', 'second (ampere added)', 'newton', 'joule'],
    ['SI', 'metre', 'kilogram', 'second (six more base units)', 'newton', 'joule'],
  ],
  'Table of the CGS, FPS, MKS, MKSA and SI systems of units with the units of length, mass, time, force and work in each',
);
const tGoodUnit = table(
  ['A good unit must be', 'Meaning'],
  [
    ['well defined', 'its size is stated without ambiguity'],
    ['reproducible', 'anyone, anywhere, can set up the same standard'],
    ['invariable', 'it does not change with time, place or temperature'],
    ['convenient', 'of a size that suits the measurement, with prefixes for the rest'],
  ],
  'Table of the four properties of a good unit: well defined, reproducible, invariable and convenient',
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
  ['energy or work', 'joule (J)', Q.energy],
  ['power', 'watt (W)', Q.power],
  ['pressure', 'pascal (Pa)', Q.pressure],
  ['frequency', 'hertz (Hz)', Q.frequency],
  ['electric charge', 'coulomb (C)', Q.charge],
];
const tDerived = table(['Derived quantity', 'Named unit', 'In base units'], derivedRows.map(([q, u, d]) => [q, u, unitTxt(d)]), 'Table of derived quantities, their named SI units and the same units written in base units');
const tRules = table(
  ['Rule for unit names and symbols', 'Correct', 'Wrong'],
  [
    ['names are lower case, even when named after a person', 'newton, kelvin', 'Newton, Kelvin'],
    ['a symbol is capital only if the unit is named after a person', 'N, Pa, m, kg', 'n, pa, M, Kg'],
    ['symbols are never made plural', '5 kg', '5 kgs'],
    ['no full stop after a symbol (except at the end of a sentence)', '10 N', '10 N.'],
    ['a space between the number and the symbol', '25 m', '25m'],
    ['do not mix names and symbols', 'metre per second, m s⁻¹', 'metre per s'],
    ['one prefix only, joined to the unit', 'nanometre, nm', 'millimicrometre'],
  ],
  'Table of the SI rules for writing unit names and symbols, each with a correct and a wrong example',
);
const tPrefix = table(
  ['Prefix', 'Symbol', 'Factor', 'Prefix', 'Symbol', 'Factor'],
  [
    ['atto', 'a', '$10^{-18}$', 'deca', 'da', '$10^{1}$'],
    ['femto', 'f', '$10^{-15}$', 'hecto', 'h', '$10^{2}$'],
    ['pico', 'p', '$10^{-12}$', 'kilo', 'k', '$10^{3}$'],
    ['nano', 'n', '$10^{-9}$', 'mega', 'M', '$10^{6}$'],
    ['micro', 'μ', '$10^{-6}$', 'giga', 'G', '$10^{9}$'],
    ['milli', 'm', '$10^{-3}$', 'tera', 'T', '$10^{12}$'],
    ['centi', 'c', '$10^{-2}$', 'deci', 'd', '$10^{-1}$'],
  ],
  'Table of the SI prefixes from atto to tera with their symbols and powers of ten',
);
const tPractical = table(
  ['Unit', 'Value in SI', 'Used for'],
  [
    ['fermi (fm)', '$10^{-15}$ m', 'sizes of nuclei'],
    ['angstrom (Å)', '$10^{-10}$ m', 'sizes of atoms, wavelengths of light'],
    ['astronomical unit (AU)', `$${sf(AU, 4)}$ m`, 'distances in the solar system'],
    ['light year (ly)', `$${sf(LY, 3)}$ m`, 'distances to stars'],
    ['parsec (pc)', `$${sf(PARSEC, 3)}$ m (${dec(PARSEC / LY, 3)} ly)`, 'distances to stars and galaxies'],
    ['unified atomic mass unit (u)', `$${sf(U_KG, 3)}$ kg`, 'masses of atoms and molecules'],
  ],
  'Table of practical units: fermi, angstrom, astronomical unit, light year, parsec and the unified atomic mass unit with their values in SI units',
);
const tMethods = table(
  ['Quantity', 'Range', 'Method'],
  [
    ['length', 'millimetres to metres', 'metre scale, vernier callipers, screw gauge'],
    ['length', 'atoms and nuclei', 'scattering of electrons or X-rays; electron microscope'],
    ['length', 'Moon, planets, nearby stars', 'parallax; radar echo for the Moon and planets'],
    ['mass', 'grams to kilograms', 'beam or electronic balance'],
    ['mass', 'atoms and molecules', 'mass spectrometer, in unified atomic mass units'],
    ['mass', 'Earth, Sun', 'from the law of gravitation and orbits'],
    ['time', 'seconds to hours', 'stopwatch, pendulum clock, quartz clock'],
    ['time', 'very short or very precise', 'atomic clock based on caesium'],
  ],
  'Table of methods for measuring lengths, masses and times at very small, ordinary and very large scales',
);

const tErrKinds = table(
  ['Kind of error', 'Cause', 'Effect and remedy'],
  [
    ['systematic: instrumental', 'zero error, faulty calibration, worn scale', 'every reading is shifted the same way; correct the zero or recalibrate'],
    ['systematic: personal and method', 'habit of the observer, parallax in reading, wrong technique', 'a steady bias; change the method or the observer'],
    ['random', 'unpredictable small changes in reaction time, temperature, draughts', 'readings scatter both ways; take many readings and average'],
    ['least count', 'the smallest division the instrument shows', 'a fixed limit on any single reading; use a finer instrument'],
  ],
  'Table of systematic, random and least-count errors with causes, effects and remedies',
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
    ['multiply or divide', 'as many significant figures as the least precise factor', `$${dec(ar.c[0], 3)} \\div ${dec(ar.c[1], 2)}$ gives ${dec(ar.quoR, 2)}`],
    ['exact numbers', 'unlimited: counts and defined factors', 'a bicycle has exactly 2 wheels'],
  ],
  'Table of the rules for adding, subtracting, multiplying and dividing with significant figures and for exact numbers',
);
const tOom = table(
  ['Quantity', 'Value', 'Order of magnitude'],
  oomRows.map((o) => [o.what, `$${sci(o.x, 3)}$ ${o.u}`.trim(), `$10^{${o.k}}$`]),
  'Table of six quantities with their values and orders of magnitude, found by the square root of ten rule',
);
const dimRows = [
  ['area', 'length × breadth', Q.area],
  ['velocity', 'displacement ÷ time', Q.velocity],
  ['acceleration', 'velocity ÷ time', Q.accel],
  ['momentum or impulse', 'mass × velocity', Q.momentum],
  ['force', 'mass × acceleration', Q.force],
  ['work, energy or torque', 'force × distance', Q.energy],
  ['power', 'work ÷ time', Q.power],
  ['pressure', 'force ÷ area', Q.pressure],
  ['frequency', '1 ÷ period', Q.frequency],
  ['moment of inertia', 'mass × distance²', Q.momInertia],
];
const tDim = table(['Quantity', 'Defined by', 'Dimensional formula'], dimRows.map(([q, def, d]) => [q, def, `$${dimTex(d)}$`]), 'Table of dimensional formulae of area, velocity, acceleration, momentum, force, energy, power, pressure, frequency and moment of inertia');
const tConst = table(
  ['Constant', 'From the relation', 'Dimensional formula'],
  [
    ['gravitational constant $G$', '$F = G m_1 m_2 / r^2$', `$${dimTex(dG)}$`],
    ['Planck constant $h$', '$E = h \\nu$', `$${dimTex(dh)}$`],
    ['spring constant $k$', '$F = k x$', `$${dimTex(Q.springK)}$`],
    ['surface tension $S$', '$S = F / \\ell$', `$${dimTex(Q.surfTension)}$`],
    ['coefficient of viscosity $\\eta$', '$F = \\eta A\\, v / d$', `$${dimTex(Q.viscosity)}$`],
    ['Boltzmann constant $k_B$', '$E = k_B T$', `$${dimTex(Q.boltz)}$`],
  ],
  'Table of the dimensional formulae of the gravitational constant, the Planck constant, the spring constant, surface tension, viscosity and the Boltzmann constant',
);
const tEq = table(
  ['Equation', 'Dimensions of the terms', 'Verdict'],
  eqRows.map((e, i) => [e.eq, `$${dimTex(e.lhs)}$ ; ${e.rhs.map((d) => `$${dimTex(d)}$`).join(' , ')}`, eqOk[i] ? 'consistent' : 'not consistent']),
  'Table checking four equations for dimensional consistency',
);
const tConv = table(
  ['Quantity', 'Dimensions', 'In SI', 'Converted to'],
  [
    ['force', `$${dimTex(Q.force)}$`, '1 N', `$${sci(conv.newton, 3)}$ dyne`],
    ['work', `$${dimTex(Q.energy)}$`, '1 J', `$${sci(conv.joule, 3)}$ erg`],
    ['pressure', `$${dimTex(Q.pressure)}$`, '1 Pa', `${dec(conv.pascal, 3)} dyne cm⁻²`],
    ['acceleration', `$${dimTex(Q.accel)}$`, '9.8 m s⁻²', `${dec(conv.g, 3)} ft s⁻²`],
  ],
  'Table converting a newton, a joule, a pascal and an acceleration of 9.8 metres per second squared into CGS or FPS units using dimensions',
);
const tLimit = table(
  ['Dimensional analysis can', 'Dimensional analysis cannot'],
  [
    ['show that an equation is dimensionally wrong', 'prove that a dimensionally correct equation is right'],
    ['give the dimensions of a constant in an equation', 'give pure numbers such as ½ or 2π'],
    ['convert a quantity from one system of units to another', 'handle sin, log or exponential of a quantity with dimensions, or tell scalars from vectors'],
  ],
  'Table of what dimensional analysis can and cannot do',
);

// ================================================================ Part 1
export const deck1 = deck({
  part: 1,
  title: 'Units and Measurement — Part 1: Systems of units, the SI and practical units',
  goals: [
    'Explain why a unit is a reference standard and compare the CGS, FPS, MKS, MKSA and SI systems',
    'Name the seven SI base units, write unit names and symbols by the SI rules and use prefixes from atto to tera',
    'Convert between metres, fermi, angstrom, astronomical units, light years, parsecs and atomic mass units, and choose a method to measure very large and very small lengths, masses and times',
  ],
  slides: [
    sl('title', 'Units and Measurement', {
      b: 'Part 1 — why physics begins with measurement: units and systems of units, the SI and its rules, prefixes, and practical units from the nucleus to the galaxy.',
      v: V.lengths,
      n: 'Physics is a science of measurement. A bowler measures speed, an engineer measures strain on a bridge, an astronomer measures the distance to a star, and each needs a number and a unit. In this part we study systems of units, the international system and its rules, the prefixes, and the practical units that stretch from a nucleus to a galaxy.',
    }),
    sl('concept', 'A unit is a reference standard', {
      b: 'To measure is to compare with a standard of the same kind. The result is **number × unit**; the number alone says nothing.',
      ul: [
        '**Fundamental (base) quantities** such as length, mass and time are chosen independently; every other quantity is **derived** from them.',
        'The standard chosen for a quantity is its **unit**; a good unit is well defined, reproducible, invariable and convenient.',
        'Changing the unit changes the number but not the physical quantity: $n_1 u_1 = n_2 u_2$.',
      ],
      v: tGoodUnit,
      n: 'To measure something is to compare it with a standard of the same kind. The answer is a number times a unit, and the number alone means nothing. A good standard is well defined, reproducible by anyone, invariable with time and place, and of a convenient size. If we change the unit the number changes, but the quantity itself stays exactly the same.',
    }),
    sl('concept', 'Systems of units: CGS, FPS, MKS, MKSA and SI', {
      b: 'A **system of units** fixes the units of the base quantities; all other units follow from them.',
      ul: [
        '**CGS** uses centimetre, gram, second; **FPS** uses foot, pound, second; **MKS** uses metre, kilogram, second.',
        '**MKSA** adds the ampere for electric current. The **SI** (Système International) extends MKSA to seven base units and is now used worldwide.',
        'Force is a dyne in CGS, a poundal in FPS and a newton in MKS and SI.',
      ],
      v: tSystems,
      n: 'Different systems choose different base units. The C G S system uses centimetre, gram and second. The F P S system uses foot, pound and second. The M K S system uses metre, kilogram and second, and M K S A adds the ampere for current. The S I extends this to seven base units and is used all over the world. The unit of force is the dyne, the poundal or the newton, depending on the system.',
    }),
    sl('check', 'Quick check: systems of units', {
      b: 'Choose the correct option.',
      v: tSystems,
      chk: 'cgs-mcq',
      n: 'Use the table of systems to decide which unit of work belongs to the system named in the question.',
    }),
    sl('concept', 'The seven SI base units', {
      b: 'The SI has **seven** base quantities. Since 2019 each unit is defined by fixing a constant of nature.',
      ul: [
        r`The **metre** follows from fixing the speed of light, $c = 299\,792\,458$ m s$^{-1}$, and the **second** from the frequency of a caesium atomic clock.`,
        'The **kilogram** is fixed through the Planck constant; the **ampere** through the elementary charge.',
        'The **kelvin**, **mole** and **candela** are fixed through the Boltzmann constant, the Avogadro constant and a defined luminous efficacy.',
      ],
      v: tBase,
      n: 'The S I has seven base units: metre, kilogram, second, ampere, kelvin, mole and candela. Since two thousand nineteen each one is tied to a constant of nature. For example, the speed of light is fixed at exactly two hundred and ninety nine million, seven hundred and ninety two thousand, four hundred and fifty eight metres per second, and that fixes the metre.',
    }),
    sl('concept', 'Derived units', {
      b: 'Every other SI unit is **derived** by multiplying or dividing base units. Many have special names.',
      ul: ['One newton is the force that gives a mass of 1 kg an acceleration of 1 m s$^{-2}$.', 'Rewriting a named unit in base units is a quick way to check an answer.'],
      v: tDerived,
      n: 'A derived unit is a product or quotient of base units. Force is mass times acceleration, so the newton is one kilogram metre per second squared. The joule, watt, pascal, hertz and coulomb are also names for particular combinations. Rewriting a named unit in base units is a good way to check a result.',
    }),
    sl('diagram', 'Supplementary units: radian and steradian', {
      b: 'Earlier the radian and steradian were called **supplementary units**; today they are **dimensionless derived units**.',
      ul: [
        r`**Plane angle:** $\theta = \dfrac{s}{r}$; one radian $= \dfrac{180^\circ}{\pi} \approx 57.3^\circ$.`,
        r`**Solid angle:** $\Omega = \dfrac{A}{r^2}$; a whole sphere subtends $4\pi$ steradian.`,
      ],
      v: V.radian,
      n: 'To measure an angle, draw a circle about its tip. The angle in radians is the arc divided by the radius. When the arc equals the radius the angle is one radian, about fifty seven point three degrees. The solid angle is the area of a patch on the sphere divided by the radius squared, in steradians. Both are ratios of like quantities, so neither has dimensions.',
    }),
    sl('concept', 'Rules for writing unit names and symbols', {
      b: 'The SI has fixed rules so that a measurement reads the same everywhere:',
      v: tRules,
      ul: ['Write a product of units with a space, as in N m, and a quotient with a negative power, as in m s$^{-1}$.', 'Use at most one solidus: write m s$^{-2}$ rather than m/s/s.'],
      n: 'Here are the rules. Unit names are written in lower case, even when named after a person, so newton and kelvin. A symbol is a capital only when the unit is named after a person. Symbols are never made plural, take no full stop, and stand a space after the number. Never mix names and symbols, and never stack two prefixes on one unit.',
    }),
    sl('check', 'Quick check: writing units', {
      b: 'Choose the correct option.',
      v: tRules,
      chk: 'rules-mcq',
      n: 'Compare each written form with the rules in the table and pick the one that follows all of them.',
    }),
    sl('concept', 'SI prefixes from atto to tera', {
      b: 'A **prefix** multiplies the unit it is joined to by a power of ten. Never join two prefixes.',
      ul: ['Most prefixes go in steps of 1000; centi, deci, deca and hecto are the exceptions.', r`The kilogram is the only base unit whose name carries a prefix; prefixes for mass are added to the gram, as in $1\ \mu\text{g} = 10^{-9}$ kg.`],
      v: tPrefix,
      n: 'Prefixes keep numbers readable. Kilo is a thousand, mega a million, giga a thousand million and tera a million million. Going down, milli is a thousandth, micro a millionth, nano a thousand millionth, then pico, femto and atto. Centi, deci, deca and hecto are the odd ones out, not in steps of a thousand. The kilogram is the only base unit with a prefix, so mass prefixes are added to the gram.',
    }),
    sl('example', 'Worked example 1: prefixes and derived units', {
      b: r`Express in SI base units without prefixes: (a) a train speed of ${tr.kmh} km h$^{-1}$; (b) a capacitance of ${prefixEx.uF} μF; (c) a clock rate of ${prefixEx.GHz} GHz; (d) the pascal.`,
      ul: [
        r`(a) $${tr.kmh} \times \dfrac{1000\ \text{m}}{3600\ \text{s}} = ${dec(tr.ms, 3)}$ m s$^{-1}$.`,
        r`(b) micro is $10^{-6}$: $${prefixEx.uF} \times 10^{-6} = ${sci(prefixEx.F, 2)}$ F.`,
        r`(c) giga is $10^{9}$: $${prefixEx.GHz} \times 10^{9} = ${sci(prefixEx.Hz, 2)}$ Hz.`,
        r`(d) pressure $=$ force ÷ area, so 1 Pa $= \dfrac{\text{kg m s}^{-2}}{\text{m}^2} = ${unitTxt(Q.pressure)}$.`,
      ],
      v: tPrefix,
      n: `For part a, multiply by one thousand metres and divide by three thousand six hundred seconds to get ${dec(tr.ms, 3)} metres per second. In part b, micro means ten to the minus six. In part c, giga means ten to the nine. In part d, pressure is force over area, so the pascal is kilogram per metre per second squared.`,
    }),
    sl('concept', 'Practical units for the very large and the very small', {
      b: 'SI units are awkward at the extremes, so physicists also use **practical units**:',
      ul: [
        `A **light year** is the distance light travels in a year: $${sf(C_LIGHT, 4)} \\times ${sf(YEAR, 4)} \\approx ${sf(LY, 3)}$ m.`,
        'The **astronomical unit** is the mean Earth–Sun distance; the **parsec** is about 3.26 light years.',
        'The **fermi** and **angstrom** suit nuclei and atoms; the **unified atomic mass unit** is one twelfth of the mass of a carbon-12 atom.',
      ],
      v: tPractical,
      n: `Distances between stars are far too large for metres, so astronomers use the light year, the distance light covers in a year, about ${dec(LY / 1e15, 3)} thousand million million metres. The astronomical unit is the Earth to Sun distance, and the parsec is about three point two six light years. For the tiny scale there are the angstrom, the fermi, and the unified atomic mass unit for the masses of atoms.`,
    }),
    sl('diagram', 'Parallax and the parsec', {
      b: 'The **parsec** comes from the **parallax** method: the angle $p$ that a baseline $b$ subtends at a distant object gives its distance.',
      ul: [r`For a small angle, $D = \dfrac{b}{p}$ with $p$ in radian.`, r`One parsec is the distance at which the baseline of 1 AU subtends $p = 1$ arcsecond, so $1\ \text{pc} = \dfrac{1\ \text{AU}}{4.848 \times 10^{-6}} \approx ${sf(PARSEC, 3)}$ m.`],
      v: V.parallax,
      n: 'Hold a finger at arm length and look with one eye, then the other: it seems to jump against the background. That shift is parallax. Astronomers use the baseline between the Earth and the Sun, one astronomical unit. The distance of a star is the baseline divided by its parallax angle in radians. A star whose parallax is one arcsecond lies one parsec away.',
    }),
    sl('example', 'Worked example 2: distance from parallax', {
      b: `A star has a parallax of ${star.p} arcsecond against a baseline of 1 AU. Find its distance in parsec, in light year and in AU. (1 pc $= ${sf(PARSEC, 3)}$ m, 1 ly $= ${sf(LY, 3)}$ m, 1 AU $= ${sf(AU, 4)}$ m.)`,
      ul: [
        r`Step 1 — by the definition of the parsec, $D = \dfrac{1}{p} = \dfrac{1}{${star.p}} = ${dec(star.pc, 3)}$ pc.`,
        r`Step 2 — in metre: $${dec(star.pc, 3)} \times ${sf(PARSEC, 3)} \approx ${sf(star.m, 3)}$ m.`,
        r`Step 3 — in light year: $\dfrac{${sf(star.m, 3)}}{${sf(LY, 3)}} \approx ${dec(star.ly, 3)}$ ly; in AU: $\dfrac{${sf(star.m, 3)}}{${sf(AU, 4)}} \approx ${sf(star.au, 3)}$ AU.`,
      ],
      v: V.parallax,
      n: `One over the parallax of ${star.p} arcsecond gives ${dec(star.pc, 3)} parsec. Multiplying by the metres in a parsec gives about ${dec(star.m / 1e16, 3)} times ten to the sixteen metres. Dividing by the metres in a light year gives about ${dec(star.ly, 3)} light years, and dividing by the metres in an astronomical unit gives about ${dec(star.au / 1e5, 3)} hundred thousand astronomical units.`,
    }),
    sl('concept', 'Measuring lengths, masses and times', {
      b: 'The method must suit the scale. Each step up or down in size needs a new technique.',
      ul: ['**Length:** direct scales for everyday sizes, electron or X-ray methods for atoms, parallax and radar echoes for the Moon, planets and stars.', '**Mass:** a balance for ordinary masses, a mass spectrometer for atoms, orbits and gravitation for planets and stars.', '**Time:** pendulum and quartz clocks for ordinary times, atomic clocks for the highest precision.'],
      v: tMethods,
      n: 'No single instrument works at every scale. For lengths we use scales and callipers, then electron or X ray methods for atoms, and parallax or radar echoes for the Moon, planets and stars. For masses we use a balance, a mass spectrometer for atoms, and orbits and gravitation for planets. For time we use a pendulum or quartz clock, and an atomic clock for the greatest precision.',
    }),
    sl('diagram', 'Spanning thirty two powers of ten', {
      b: 'On a **logarithmic scale** each tick is a factor of $10^5$.',
      ul: [`A nucleus is a few fermi; an atom is about one angstrom; the Earth has radius $6.4 \\times 10^{6}$ m.`, `One light year is about $${sf(LY / AU, 3)}$ AU and one parsec is about ${dec(PARSEC / LY, 3)} light years.`],
      v: V.lengths,
      n: 'This scale is logarithmic: each step to the right multiplies the length by ten, and each tick is five such steps. A fermi, an angstrom, the wavelength of light, a person, the Earth, the astronomical unit and the light year all fit on one line. The light year is more than sixty thousand astronomical units, and a parsec is a little over three light years.',
    }),
    sl('check', 'Quick check: practical units', {
      b: 'Work out the answer and enter it.',
      v: tPractical,
      chk: 'ly-num',
      n: 'Convert the distance by dividing by the value of the practical unit from the table.',
    }),
    sl('example', 'Worked example 3: atomic masses and nuclear sizes', {
      b: `(a) Find the mass in kg of an oxygen atom of mass ${atom.O} u. (b) The nucleus of a gold atom has a diameter of about ${atom.nucFm} fm. Express it in metre. (c) Express the same diameter in angstrom. (1 u $= ${sf(U_KG, 3)}$ kg.)`,
      ul: [
        r`(a) $${atom.O} \times ${sf(U_KG, 3)} = ${sf(atom.kg, 3)}$ kg.`,
        r`(b) $1\ \text{fm} = 10^{-15}$ m, so $${atom.nucFm} \times 10^{-15} = ${sci(atom.nucM, 2)}$ m.`,
        r`(c) $1\ \text{Å} = 10^{-10}$ m, so $\dfrac{${sci(atom.nucM, 2)}}{10^{-10}} = ${sci(atom.nucA, 2)}$ Å: the nucleus is a tiny fraction of an angstrom.`,
      ],
      v: tPractical,
      n: `The oxygen atom has a mass of sixteen atomic mass units, which is about ${dec(atom.kg / 1e-26, 3)} times ten to the minus twenty six kilograms. A fermi is ten to the minus fifteen metres, so fourteen fermi is about ${dec(atom.nucM / 1e-14, 2)} times ten to the minus fourteen metres. Dividing by an angstrom shows the nucleus is only about one ten thousandth of an angstrom across.`,
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Units', 'a unit is a reference standard: well defined, reproducible, invariable, convenient'],
          ['Systems', 'CGS, FPS, MKS, MKSA, SI (seven base units)'],
          ['Writing units', 'lower-case names, no plurals, no full stops, space after the number'],
          ['Prefixes', 'atto 10⁻¹⁸ up to tera 10¹²'],
          ['Practical units', `1 ly ≈ ${pt(LY, 3)} m; 1 AU ≈ ${pt(AU, 4)} m; 1 pc ≈ ${pt(PARSEC, 3)} m; 1 Å = 10⁻¹⁰ m; 1 fm = 10⁻¹⁵ m; 1 u ≈ ${pt(U_KG, 3)} kg`],
          ['Parallax', 'D = b / p; 1 AU at 1 arcsecond defines the parsec'],
        ],
        'Summary table of units, systems, rules, prefixes, practical units and parallax',
      ),
      n: 'To sum up. A unit is a reference standard. The common systems are C G S, F P S, M K S, M K S A and the S I with its seven base units. Unit names and symbols follow fixed rules, and prefixes run from atto to tera. Practical units such as the fermi, angstrom, astronomical unit, light year, parsec and atomic mass unit cover the very small and the very large, and parallax gives stellar distances.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'Write the unit with every number and convert all quantities to one system before calculating.',
        'In a question on writing units, check each rule in turn: capital letter, plural, full stop, space and prefix.',
        'Learn the values of the light year, astronomical unit, parsec and atomic mass unit; give conversions to the data\'s number of significant figures.',
        'Marks are given for the formula, for the substitution with units and for the final answer with its unit.',
      ],
      v: table(['Asked', 'Key point'], [['Is the radian a base unit?', 'No: a dimensionless derived unit'], ['Write 5 kilograms as a symbol', '5 kg, never 5 kgs'], ['Which is longer, a parsec or a light year?', 'The parsec, about 3.26 light years']], 'Table of common questions on units with the key point for each'),
      n: 'Always write the unit, and convert to one system before you calculate. When asked about writing units, test each rule in turn: capital letter, plural, full stop, space and prefix. Know the values of the practical units. Marks are given for the formula, for the substitution with units, and for the answer with its unit.',
    }),
  ],
});

// ================================================================ Part 2
export const deck2 = deck({
  part: 2,
  title: 'Units and Measurement — Part 2: Errors, significant figures and dimensional analysis',
  goals: [
    'Distinguish systematic from random errors and find absolute, relative and percentage error',
    'Count significant figures, round off, apply the rules in calculations and find an order of magnitude',
    'Write dimensional formulae, apply the principle of homogeneity, and use dimensions to check equations, find dimensions of constants and convert units, stating the limitations',
  ],
  slides: [
    sl('title', 'Errors, significant figures and dimensions', {
      b: 'Part 2 — how good is a measurement, how many digits it deserves, and what dimensions can tell us about an equation.',
      v: V.ruler,
      n: 'Every measurement is a little uncertain. In this part we ask how large the error is, how many digits a result deserves, and how to estimate an order of magnitude. Then we turn to dimensions, which let us check an equation, find the dimensions of a constant, and convert units, and we finish with the limits of the method.',
    }),
    sl('concept', 'Errors in measurement', {
      b: '**Accuracy** is closeness to the true value; **precision** is closeness of repeated readings to one another. Errors come in two main kinds.',
      ul: ['**Systematic errors** push every reading the same way: zero error, a faulty scale, a wrong technique, an observer\'s habit.', '**Random errors** scatter readings both ways and are reduced by averaging many readings.', 'The **least count** is the smallest division the instrument shows and limits any single reading.'],
      v: tErrKinds,
      n: 'Accuracy means closeness to the true value, and precision means that repeated readings agree with one another. Systematic errors, such as a zero error or a worn scale, push every reading the same way. Random errors scatter the readings both ways, and averaging many readings reduces them. The least count of the instrument sets a limit for any single reading.',
    }),
    sl('concept', 'Absolute, relative and percentage error', {
      b: 'With repeated readings $a_1, a_2, \\dots, a_n$ of the same quantity:',
      ul: ['The **mean** is the best estimate of the true value.', 'The **absolute error** of a reading is its difference from the mean; the **mean absolute error** is the average of these.', 'The **relative error** is the mean absolute error divided by the mean; the **percentage error** is that times 100 %.'],
      v: tErrDef,
      n: 'Take several readings and find their mean, which is the best estimate of the true value. The absolute error of a reading is how far it lies from the mean, and the mean absolute error is the average of those distances. Dividing the mean absolute error by the mean gives the relative error, and multiplying that by one hundred gives the percentage error.',
    }),
    sl('example', 'Worked example 1: timing a swing', {
      b: `Five stopwatch readings of one swing of a pendulum bob, in seconds: ${rp.times.map((x) => x.toFixed(2)).join(', ')}. Find the mean, the mean absolute error, and the relative and percentage errors.`,
      ul: [
        r`Step 1 — mean $= \dfrac{${rp.times.map((x) => x.toFixed(2)).join(' + ')}}{5} = ${dec(rp.mean, 3)}$ s.`,
        r`Step 2 — absolute errors: ${rp.errs.map((x) => x.toFixed(2)).join(', ')} s; mean absolute error $= \dfrac{${rp.errs.map((x) => x.toFixed(2)).join(' + ')}}{5} = ${rp.dm.toFixed(2)}$ s.`,
        r`Step 3 — relative error $= \dfrac{${rp.dm.toFixed(2)}}{${dec(rp.mean, 3)}} = ${dec(rp.rel, 3)}$; percentage error $\approx ${dec(rp.pct, 2)}\ \%$.`,
      ],
      v: V.dots,
      n: `The mean of the five readings is ${dec(rp.mean, 3)} seconds. The readings differ from the mean by amounts that average ${rp.dm.toFixed(2)} seconds, which is the mean absolute error. Dividing by the mean gives a relative error of about ${dec(rp.rel, 3)}, so the percentage error is about ${dec(rp.pct, 2)} percent. The result is written as ${dec(rp.mean, 3)} plus or minus ${rp.dm.toFixed(2)} seconds.`,
    }),
    sl('check', 'Quick check: errors', {
      b: 'Choose the correct option.',
      v: tErrDef,
      chk: 'err-mcq',
      n: 'Find the mean of the four readings, then the average distance of the readings from that mean, and pick the matching option.',
    }),
    sl('concept', 'Significant figures and how to count them', {
      b: 'A measured value shows the digits the instrument gives **certainly**, plus **one uncertain** digit estimated by eye. Together they are its **significant figures**.',
      v: tSf,
      ul: [`The strip on the millimetre scale reads ${G.ROD.toFixed(2)} cm: 5 and 2 are certain, the last digit 7 is an estimate, so there are 3 significant figures.`, r`Changing the unit must not change the count; writing $a \times 10^{n}$ removes any doubt about trailing zeros.`],
      n: 'A reading has the digits the instrument shows for certain and one estimated digit, and all of them are significant. Here are the rules. Every non zero digit counts. Zeros between non zero digits count. Zeros before the first non zero digit do not count, they only place the decimal point. Zeros at the end count when there is a decimal point and do not count when there is none. A power of ten never counts. Writing a number in scientific form removes any doubt.',
    }),
    sl('example', 'Worked example 2: counting and rounding off', {
      b: 'State the number of significant figures in each value, then round each value in the second set to 3 significant figures.',
      ul: [
        `Counting — ${cnt.map((c) => `${c.shown}: **${c.n}**`).join('; ')}.`,
        'Rounding off — if the digit to be dropped is more than 5, raise the last kept digit by one; if less than 5, leave it; if it is exactly 5 with nothing after it, make the last kept digit **even**.',
        `Rounding — ${rnd.map((c) => `${String(c.x)} → **${dec(c.out, 3)}**`).join('; ')}.`,
      ],
      v: tSf,
      n: 'First the counting. The first value has three, because the leading zeros do not count. The second has four, with the trailing zero after the decimal point. Twenty six hundred written without a decimal point has two, but in scientific form with a decimal it has four. For rounding, a dropped five leaves the last kept digit even, so seven point eight six five becomes seven point eight six, and seven point eight seven five becomes seven point eight eight.',
    }),
    sl('concept', 'Arithmetic with significant figures', {
      b: 'A calculator shows many digits; the answer may keep only as many as the data justify.',
      v: tArith,
      ul: ['Carry **one extra digit** through intermediate steps and round only at the end.', 'Counted numbers and defined factors are **exact** and do not limit the answer.'],
      n: 'When adding or subtracting, look at decimal places: the answer keeps as many as the least precise number. When multiplying or dividing, look at significant figures: the answer keeps as many as the factor with the fewest. Exact numbers, such as the two wheels of a bicycle, never limit the answer. Round once, at the very end.',
    }),
    sl('example', 'Worked example 3: calculations', {
      b: 'Evaluate with the correct number of significant figures: (a) $21.34 + 3.7 + 0.052$; (b) the area of a sheet $14.2$ cm by $6.35$ cm; (c) the speed of a trolley that covers $135$ m in $4.2$ s.',
      ul: [
        r`(a) The sum is $${dec(ar.sum, 5)}$. The least precise number, $3.7$, has one decimal place, so the answer is $${dec(ar.sumR, 3)}$.`,
        r`(b) $14.2 \times 6.35 = ${dec(ar.prod, 4)}$ cm$^2$. Both factors have 3 significant figures, so the area is $${dec(ar.prodR, 3)}$ cm$^2$.`,
        r`(c) $\dfrac{135}{4.2} = ${dec(ar.quo, 4)}$. The factor $4.2$ has only 2 significant figures, so the speed is $${dec(ar.quoR, 2)}$ m s$^{-1}$.`,
      ],
      v: tArith,
      n: `In part a the sum is ${dec(ar.sum, 5)}, but the least precise number has one decimal place, so we report ${dec(ar.sumR, 3)}. In part b the product is ${dec(ar.prod, 4)}, and with three significant figures in both factors the answer is ${dec(ar.prodR, 3)} square centimetres. In part c the quotient is ${dec(ar.quo, 4)}, and since four point two has two significant figures we report ${dec(ar.quoR, 2)} metres per second.`,
    }),
    sl('check', 'Quick check: significant figures', {
      b: 'Choose the correct option.',
      v: tSf,
      chk: 'sfadd-mcq',
      n: 'Decide whether decimal places or significant figures control the answer for this operation.',
    }),
    sl('concept', 'Order of magnitude', {
      b: 'The **order of magnitude** of a number is the power of ten nearest to it. Write $N = a \\times 10^{k}$ with $1 \\le a < 10$.',
      ul: [r`If $a \le 3.16$ ($\sqrt{10}$) the order of magnitude is $10^{k}$; if $a > 3.16$ it is $10^{k+1}$.`, 'It lets us compare sizes and make quick estimates: a result right to the order of magnitude is right to within a factor of about three.'],
      v: V.order,
      n: 'Write a number as a times ten to the k, with a between one and ten. If a is up to three point one six, the square root of ten, the order of magnitude is ten to the k. If a is larger, it is ten to the k plus one. On a logarithmic scale three point one six sits exactly halfway between one and ten, which is why it is the dividing line.',
    }),
    sl('example', 'Worked example 4: estimating sizes', {
      b: `Find the order of magnitude of (a) the age of the universe, ${dec(oom.uni.yr / 1e9, 3)} billion years, in seconds; (b) the number of heartbeats in ${oom.beats.years} years at ${oom.beats.rate} beats per minute. (1 year $= ${sf(YEAR, 4)}$ s.)`,
      ul: [
        r`(a) $${sci(oom.uni.yr, 3)} \times ${sf(YEAR, 4)} = ${sci(oom.uni.s, 3)}$ s. Here $a = ${dec(oom.uni.s / 10 ** 17, 3)} > 3.16$, so the order is $10^{${orderOfMag(oom.uni.s)}}$ s.`,
        r`(b) $${oom.beats.rate} \times 60 \times 24 \times 365.25 \times ${oom.beats.years} = ${sci(oom.beats.n, 3)}$. Here $a = ${dec(oom.beats.n / 1e9, 3)} < 3.16$, so the order is $10^{${orderOfMag(oom.beats.n)}}$.`,
      ],
      v: tOom,
      n: `Multiply the age of the universe by the seconds in a year to get about ${dec(oom.uni.s / 1e17, 3)} times ten to the seventeen seconds. The leading number is above three point one six, so the order of magnitude is ten to the eighteen. For the heartbeats, the product is about ${dec(oom.beats.n / 1e9, 3)} times ten to the nine, which is below three point one six, so the order is ten to the nine.`,
    }),
    sl('concept', 'Dimensions and dimensional formulae', {
      b: 'The **dimensions** of a quantity are the powers to which the base quantities, written $[\\text{M}]$, $[\\text{L}]$, $[\\text{T}]$ and so on, appear in it. Its **dimensional formula** shows them, for example $[F] = [\\text{M L T}^{-2}]$.',
      ul: ['Pure numbers and ratios of like quantities, such as angle and strain, are dimensionless.', 'Dimensions follow from the defining relation; constants take the dimensions that make their equation balance.'],
      v: tDim,
      n: 'The dimensions of a quantity show how the base quantities of mass, length and time enter it. Velocity is length over time, force is mass times length over time squared, and energy is mass times length squared over time squared. The table lists the dimensional formulae of the quantities you need. Pure numbers and ratios of like quantities have no dimensions.',
    }),
    sl('concept', 'Dimensions of physical constants', {
      b: 'A constant gets its dimensions from the equation in which it appears. For example $F = G m_1 m_2 / r^2$ gives $[G] = [F][r^2]/[m^2]$.',
      ul: [r`$[G] = ${dimTex(dG)}$, $[h] = ${dimTex(dh)}$, $[k] = ${dimTex(Q.springK)}$.`, 'Many constants carry units that you must be able to write.'],
      v: tConst,
      n: 'A constant takes the dimensions that make its equation balance. From the law of gravitation, G equals force times distance squared over mass squared, so its dimensions are the inverse of mass times length cubed over time squared. The same method gives the dimensions of the Planck constant, the spring constant, surface tension and viscosity.',
    }),
    sl('diagram', 'The principle of homogeneity', {
      b: '**Principle of homogeneity:** every term on both sides of a correct physical equation has the same dimensions. Only like quantities can be added, subtracted or equated.',
      ul: [r`In $v^2 = u^2 + 2as$ every term has dimensions $[\text{L}^{2}\text{T}^{-2}]$.`, 'The argument of sin, cos, log or an exponential must be dimensionless.'],
      v: V.balance,
      n: 'The principle of homogeneity says every term in a correct equation has the same dimensions. You cannot add a length to a time, just as you cannot add apples to hours. In the equation v squared equals u squared plus two a s, each term has dimensions of length squared over time squared. The balance shows the three terms are of equal weight.',
    }),
    sl('check', 'Quick check: dimensions', {
      b: 'Choose the correct option.',
      v: tDim,
      chk: 'dimpow-mcq',
      n: 'Write power as work divided by time, use the dimensions of work from the table, and pick the matching formula.',
    }),
    sl('example', 'Worked example 5: checking equations', {
      b: 'Use dimensions to test the equations $v^2 = u^2 + 2as$, $P = \\rho g h$, $K = \\tfrac12 m v$ and $T = 2\\pi\\sqrt{l/g}$.',
      ul: ['Find the dimensions of every term, using $[\\rho] = [\\text{ML}^{-3}]$, $[g] = [\\text{LT}^{-2}]$ and so on.', 'If the terms agree, the equation is dimensionally consistent; if not, it is certainly wrong.', 'The kinetic energy formula fails: $[mv] = [\\text{MLT}^{-1}]$, not the dimensions of energy.'],
      v: tEq,
      n: 'For each equation we find the dimensions of every term. In v squared equals u squared plus two a s, all terms are length squared over time squared, so it passes. Pressure equals density times g times height balances. The period formula balances because the square root of length over g is a time. But half m v fails, since mass times velocity is momentum, not energy.',
    }),
    sl('concept', 'Converting units with dimensions', {
      b: 'If a quantity has dimensions $[\\text{M}^{a}\\text{L}^{b}\\text{T}^{c}]$ and numerical value $n_1$ in a system with units $M_1, L_1, T_1$, its value in another system is',
      m: [r`n_2 = n_1\left[\dfrac{M_1}{M_2}\right]^{a}\left[\dfrac{L_1}{L_2}\right]^{b}\left[\dfrac{T_1}{T_2}\right]^{c}`],
      ul: ['A larger unit gives a smaller number, so the ratio of units appears with the powers of the dimensions.'],
      v: tConv,
      n: 'To change systems, multiply the number by the ratio of the old unit to the new unit for each base quantity, each raised to the power in the dimensional formula. A larger unit gives a smaller number. The table shows the newton as one hundred thousand dynes, the joule as ten million ergs, and the acceleration of free fall in feet per second squared.',
    }),
    sl('example', 'Worked example 6: converting and finding constants', {
      b: `(a) Convert $G = 6.67 \\times 10^{-11}$ N m$^2$ kg$^{-2}$ to CGS units. (b) In the equation $\\left(P + \\dfrac{a}{V^2}\\right)(V - b) = RT$ find the dimensions of $a$.`,
      ul: [
        r`(a) $[G] = ${dimTex(dG)}$: $n_2 = 6.67\times 10^{-11}\left(\dfrac{1\ \text{kg}}{1\ \text{g}}\right)^{-1}\left(\dfrac{1\ \text{m}}{1\ \text{cm}}\right)^{3} = 6.67\times 10^{-11}\times 10^{-3}\times 10^{6} = ${sci(conv.G, 3)}$ in CGS units.`,
        r`(b) $a/V^2$ must have the dimensions of $P$, so $[a] = [P][V^2] = ${dimTex(Q.pressure)}[\text{L}^{6}] = ${dimTex(dA)}$.`,
      ],
      v: tConv,
      n: `For part a, the gravitational constant has dimensions of inverse mass, length cubed, time to the minus two. Converting from kilogram and metre to gram and centimetre multiplies by ten to the minus three and by ten to the six, giving about ${dec(conv.G / 1e-8, 3)} times ten to the minus eight in C G S units. For part b, a over V squared must have the dimensions of pressure, so a has the dimensions of pressure times length to the sixth power.`,
    }),
    sl('concept', 'Limitations of dimensional analysis', {
      b: 'Dimensional analysis is a useful check, but it has limits:',
      ul: ['It **cannot** give pure numbers or dimensionless constants such as $\\tfrac12$ or $2\\pi$.', 'It **cannot** handle sin, cos, log or exponential of a quantity with dimensions, nor derive a relation that has a sum of terms.', 'A dimensionally correct equation is **not necessarily correct**, and quantities with the same dimensions (work and torque) cannot be told apart.'],
      v: tLimit,
      n: 'Dimensional analysis can show that an equation is wrong, but it cannot show that an equation is right. It cannot give pure numbers such as one half or two pi. It cannot deal with sines, logarithms or exponentials of a dimensional quantity, nor with a relation made of a sum of terms. And it cannot distinguish quantities with the same dimensions, like work and torque.',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Errors', 'systematic shift readings; random scatter them; mean absolute error = Σ|Δa| / n'],
          ['Relative error', 'mean absolute error ÷ mean; percentage = × 100'],
          ['Significant figures', 'add by decimal places; multiply by significant figures'],
          ['Order of magnitude', 'N = a × 10ᵏ: k if a ≤ 3.16, otherwise k + 1'],
          ['Homogeneity', 'every term of a correct equation has the same dimensions'],
          ['Uses and limits', 'check equations, dimensions of constants, convert units; no pure numbers, no sums of terms'],
        ],
        'Summary table of errors, significant figures, order of magnitude, homogeneity, and the uses and limits of dimensional analysis',
      ),
      n: 'To sum up. Systematic errors shift readings and random errors scatter them. The mean absolute error divided by the mean gives the relative error. When adding keep decimal places, when multiplying keep significant figures. The order of magnitude is found from the square root of ten rule. Every term of a correct equation has the same dimensions, which lets us check equations, find constants and convert units, but never gives pure numbers.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'Show the mean, then each absolute error, then the mean absolute error, then the relative or percentage error; each step carries a mark.',
        'Count significant figures from the data, round only at the end, and give the unit.',
        'To check an equation, find the dimensions of every term, not only the two sides, and state the conclusion in words.',
        'When asked for limitations, give three distinct ones; a dimensionally correct equation is not necessarily true.',
      ],
      v: table(['Asked', 'Key point'], [['2600 m: how many significant figures?', 'Two, unless written 2.600 × 10³ m'], ['Sum of 2.50 and 0.4', 'Round to one decimal place'], ['Is a dimensionally correct equation always true?', 'No: constants and sums of terms are not tested']], 'Table of common questions on measurement with the key point for each'),
      n: 'Show every step in an error question: the mean, each absolute error, the mean absolute error, then the relative or percentage error. Count significant figures from the data and round once at the end. To check an equation, find the dimensions of every term. When asked for limitations, give three different ones, and remember that a dimensionally correct equation need not be true.',
    }),
  ],
});
void [ARCSEC, M, L, A, roundSf];
export const TB = { tSystems, tGoodUnit, tBase, tDerived, tRules, tPrefix, tPractical, tMethods, tErrKinds, tErrDef, tSf, tArith, tOom, tDim, tConst, tEq, tConv, tLimit };
