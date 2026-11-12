// ISC 11 ch01 Units and Measurement — question bank, part 1: objective items (mcq, assertion-reason, true-false, fill-blank, numerical).
// Written answers are in questions2.mjs. Numbers are computed here and re-checked by `check` functions (a different route).
// AR keys across the chapter: parsec a, prefix b, rules c, significant figures d, exponential argument a, zero error b.
import { mk, add, near } from './lib.mjs';
import { sf, roundSf, pt, sfCount, NV, mean, meanAbsErr, Q, A, T, L, dmul, ddiv, dpow, deq, dimTxt, convert, orderOfMag, AU, LY, PARSEC, U_KG, ARCSEC, C_LIGHT, YEAR, sup } from './calc.mjs';

const { mcq, ar, tf, fill, num } = mk;
const br = (d) => `[${dimTxt(d)}]`;

// ================================================================ t01 units and systems
add('cgs-mcq', mcq({
  stem: 'A physics teacher in Pune writes four units of work on the board: joule, erg, foot-poundal and newton metre. Which of them belongs to the CGS system?',
  right: 'The erg',
  wrong: ['The joule', 'The foot-poundal', 'The newton metre'],
  sol: 'In the CGS system work = force × length = dyne × centimetre = erg, so the erg is the CGS unit; the joule and newton metre are MKS and the foot-poundal is FPS — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('fps-mcq', mcq({
  stem: 'An old railway workshop manual in Jamalpur records lengths in feet, masses in pounds and times in seconds. The manual uses the',
  right: 'FPS system',
  wrong: ['CGS system', 'MKS system', 'MKSA system'],
  sol: 'Foot, pound and second are the base units of the FPS system — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('goodunit-mcq', mcq({
  stem: 'A standards laboratory rejects a length standard made of a rubber cord because its length changes with tension and temperature. The property of a good unit that this standard lacks is',
  right: 'invariability',
  wrong: ['convenience of size', 'use of a prefix', 'being a derived unit'],
  sol: 'A good unit must stay the same with time, place and conditions; a cord whose length changes is not invariable — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
const dyn = { F: 4.5e5 };
dyn.N = convert(dyn.F, Q.force, 'CGS', 'SI');
add('dyne-mcq', mcq({
  stem: `A force of ${pt(dyn.F, 2)} dyne acts on a trolley. In newton this force is`,
  right: `${pt(dyn.N, 2)} N`,
  wrong: [`${pt(dyn.N * 1e-5, 2)} N`, `${pt(dyn.N * 1e10, 2)} N`, `${pt(dyn.N * 10, 2)} N`],
  sol: `1 dyne = 1 g × 1 cm s⁻² = 10⁻³ kg × 10⁻² m s⁻² = 10⁻⁵ N, so ${pt(dyn.F, 2)} dyne = ${pt(dyn.F, 2)} × 10⁻⁵ N = ${pt(dyn.N, 2)} N — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => near(dyn.F * 1e-3 * 1e-2, 4.5) || 'dyne');

// ================================================================ t02 SI units, rules, prefixes
add('rules-mcq', mcq({
  stem: 'A lab report must state a mass of five kilograms inside a sentence, following the SI rules for symbols. Which entry is correct?',
  right: '5 kg',
  wrong: ['5 Kg', '5 kgs', '5 K.G.'],
  sol: 'The symbol for the kilogram is kg: lower case, a space after the number, no plural s and no full stops — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
const ps = { v: 40, s: 40e-12 };
add('prefix-mcq', mcq({
  stem: `A pulse of light in a fibre-optic cable lasts ${ps.v} ps. In seconds, its duration is`,
  right: `${pt(ps.s, 2)} s`,
  wrong: [`${pt(ps.s * 1e3, 2)} s`, `${pt(ps.s * 1e-4, 2)} s`, `${pt(ps.s * 1e22, 2)} s`],
  sol: `The prefix pico stands for 10⁻¹², so ${ps.v} ps = ${ps.v} × 10⁻¹² s = ${pt(ps.s, 2)} s — option (@K).`,
  d: 1, c: 'recall', t: [2],
}), () => near(ps.v * 1e-12, 4e-11) || 'ps');
add('volt-mcq', mcq({
  stem: 'The volt is defined as one watt per ampere. In SI base units one volt is',
  right: 'kg m² s⁻³ A⁻¹',
  wrong: ['kg m² s⁻² A⁻¹', 'kg m s⁻³ A⁻¹', 'kg m² s⁻³ A'],
  sol: 'The watt is kg m² s⁻³, so volt = watt ÷ ampere = kg m² s⁻³ A⁻¹ — option (@K).',
  d: 4, c: 'application', t: [2],
}), () => dimTxt(ddiv(Q.power, A)) === 'M L² T⁻³ A⁻¹' || 'volt');

// ================================================================ t03 practical units, measuring
add('fermi-mcq', mcq({
  stem: 'A lecture on nuclear sizes gives the radius of a nucleus as 6 fm. Expressed in metre, this radius is',
  right: `${pt(6e-15, 1)} m`,
  wrong: [`${pt(6e-10, 1)} m`, `${pt(6e-12, 1)} m`, `${pt(6e-18, 1)} m`],
  sol: `One fermi is 10⁻¹⁵ m, so 6 fm = 6 × 10⁻¹⁵ m — option (@K).`,
  d: 1, c: 'recall', t: [3],
}));
add('largest-mcq', mcq({
  stem: 'Four lengths are listed: one angstrom, one astronomical unit, one light year and one parsec. The longest of them is the',
  right: 'parsec',
  wrong: ['light year', 'astronomical unit', 'angstrom'],
  sol: `The sizes are 10⁻¹⁰ m, ${pt(AU, 4)} m, ${pt(LY, 3)} m and ${pt(PARSEC, 3)} m respectively, so the parsec is longest — option (@K).`,
  d: 2, c: 'understanding', t: [3],
}), () => PARSEC > LY && LY > AU && AU > 1e-10 || 'order');
const par = { p: 0.2 };
par.pc = 1 / par.p;
add('parsec-mcq', mcq({
  stem: `The parallax of a star measured from the Earth's orbit is ${par.p.toFixed(2)} arcsecond. The distance of the star is`,
  right: `${pt(par.pc, 2)} pc`,
  wrong: [`${pt(par.p, 2)} pc`, `${pt(par.pc * 0.4, 2)} pc`, `${pt(par.pc * 10, 2)} pc`],
  sol: `By the definition of the parsec, D = 1 ÷ p = 1 ÷ ${par.p.toFixed(2)} = ${pt(par.pc, 2)} pc — option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => near((AU / Math.tan(0.2 * ARCSEC)) / PARSEC, 5, 0.01) || 'parsec');
const he = { u: 4 };
he.kg = he.u * U_KG;
add('atomu-mcq', mcq({
  stem: `A helium atom has a mass of nearly ${he.u} u. Taking 1 u = ${pt(U_KG, 3)} kg, its mass in kilogram is nearly`,
  right: `${pt(he.kg, 2)} kg`,
  wrong: [`${pt(he.kg * 1e3, 2)} kg`, `${pt(U_KG, 3)} kg`, `${pt(he.kg * 1e-3, 2)} kg`],
  sol: `Mass = ${he.u} × ${pt(U_KG, 3)} kg = ${pt(he.kg, 2)} kg — option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => near(4 * 1.66e-27, 6.64e-27) || 'u');
add('measure-mcq', mcq({
  stem: 'A research group wants the mass of a single molecule. Which instrument or method suits this measurement?',
  right: 'A mass spectrometer, giving the mass in unified atomic mass units',
  wrong: ['A beam balance with a very small pan', 'A spring balance with a very light spring', 'A comparison with the mass of the Earth through orbits'],
  sol: 'Masses of atoms and molecules are found with a mass spectrometer and expressed in u; balances are far too coarse and orbit methods are for planets and stars — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));

// ================================================================ t04 errors, significant figures, order of magnitude
add('sfcount-mcq', mcq({
  stem: 'A digital caliper in a Rajkot workshop shows the thickness of a washer as 0.0830 cm. The number of significant figures in this reading is',
  right: String(sfCount('0.0830')),
  wrong: ['2', '4', '5'],
  sol: 'The leading zeros are not significant; the digits 8, 3 and the trailing zero after the decimal point are, so there are 3 — option (@K).',
  d: 1, c: 'understanding', t: [4],
}), () => '0.0830'.replace(/^0\.0*/, '').length === 3 || 'sf');
const sa = { x: 8.47, y: 2.3 };
sa.sum = sa.x + sa.y;
sa.r = Number(sa.sum.toFixed(1));
add('sfadd-mcq', mcq({
  stem: `A student mixes ${sa.x.toFixed(2)} g of one salt with ${sa.y.toFixed(1)} g of another. The total mass, reported with the correct number of significant figures, is`,
  right: `${sa.r.toFixed(1)} g`,
  wrong: [`${sa.sum.toFixed(2)} g`, `${Math.round(sa.sum)} g`, `${(Math.floor(sa.sum * 10) / 10).toFixed(1)} g`],
  sol: `The sum ${sa.sum.toFixed(2)} g must carry only as many decimal places as the least precise number, ${sa.y.toFixed(1)} g, which has one: ${sa.r.toFixed(1)} g — option (@K).`,
  d: 2, c: 'application', t: [4],
}), () => (8.47 + 2.3).toFixed(1) === '10.8' || 'sfadd');
const sm = { l: 0.3, b: 0.254 };
sm.A = sm.l * sm.b;
sm.r = roundSf(sm.A, 1);
add('sfmul-mcq', mcq({
  stem: `A floor tile measures ${sm.l.toFixed(2)} m by ${sm.b.toFixed(3)} m. Its area, with the correct number of significant figures, is`,
  right: `${pt(roundSf(sm.A, 2), 2)} m²`,
  wrong: [`${sm.A.toFixed(5)} m²`, `${sm.A.toFixed(4)} m²`, `${sm.r.toFixed(2)} m²`],
  sol: `The product is ${sm.A.toFixed(5)} m². The factor ${sm.l.toFixed(2)} has 2 significant figures, so the answer keeps 2: ${pt(roundSf(sm.A, 2), 2)} m² — option (@K).`,
  d: 2, c: 'application', t: [4],
}), () => roundSf(0.3 * 0.254, 2) === 0.076 || 'sfmul');
add('round-mcq', mcq({
  stem: 'Using the rule for a dropped digit of exactly 5, a reading of 5.835 s is rounded off to three significant figures. The result is',
  right: `${roundSf(5.835, 3)} s`,
  wrong: ['5.83 s', '5.8 s', '5.835 s'],
  sol: 'The dropped digit is exactly 5 and the last kept digit, 3, is odd, so it is raised to 4: 5.84 s — option (@K).',
  d: 2, c: 'application', t: [4],
}), () => roundSf(5.835, 3) === 5.84 || 'round');
const fl = { v: [20.2, 19.8, 20.4, 19.6] };
fl.m = mean(fl.v);
fl.e = meanAbsErr(fl.v);
add('err-mcq', mcq({
  stem: `Four readings of the focal length of a lens, in centimetre, are ${fl.v.map((x) => x.toFixed(1)).join(', ')}. The mean absolute error is`,
  right: `${fl.e.toFixed(2)} cm`,
  wrong: ['0.20 cm', '0.40 cm', '0.60 cm'],
  sol: `Mean = ${fl.m.toFixed(1)} cm. The absolute errors are 0.2, 0.2, 0.4 and 0.4 cm, so their mean is ${fl.e.toFixed(2)} cm — option (@K).`,
  d: 2, c: 'application', t: [4],
}), () => near((0.2 + 0.2 + 0.4 + 0.4) / 4, 0.3) && near((20.2 + 19.8 + 20.4 + 19.6) / 4, 20) || 'err');
add('systematic-mcq', mcq({
  stem: 'A spring balance reads 0.20 N when nothing is hung from it, so every weight it shows is 0.20 N too high. This error is',
  right: 'a systematic error that can be removed by subtracting 0.20 N from each reading',
  wrong: ['a random error that averaging many readings will remove', 'a least-count error that a finer scale would remove', 'a gross error caused only by careless reading'],
  sol: 'A constant shift of every reading in one direction is a systematic (zero) error; it is corrected, not averaged away — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
const sun = { M: 1.99e30 };
sun.k = orderOfMag(sun.M);
add('oomsun-mcq', mcq({
  stem: `The mass of the Sun is ${pt(sun.M, 3)} kg. Its order of magnitude is`,
  right: `10${sup(sun.k)} kg`,
  wrong: [`10${sup(sun.k - 1)} kg`, `10${sup(sun.k + 1)} kg`, `10${sup(sun.k - 3)} kg`],
  sol: `Here a = 1.99, which is below 3.16, so the order of magnitude keeps the power: 10${sup(sun.k)} kg — option (@K).`,
  d: 2, c: 'application', t: [4],
}), () => orderOfMag(1.99e30) === 30 || 'oom');

// ================================================================ t05 dimensions
add('dimpow-mcq', mcq({
  stem: 'A turbine at a hydroelectric plant in Uttarakhand delivers power. The dimensional formula of power is',
  right: br(Q.power),
  wrong: [br(Q.energy), br(dmul(Q.force, Q.frequency)), br(Q.angMom)],
  sol: `Power = work ÷ time, and work has dimensions ${br(Q.energy)}, so power is ${br(Q.power)} — option (@K).`,
  d: 1, c: 'recall', t: [5],
}), () => deq(ddiv(Q.energy, T), Q.power) || 'power');
add('spring-mcq', mcq({
  stem: 'A spring exerts a restoring force F = −kx when stretched by a distance x. The dimensional formula of the spring constant k is',
  right: br(Q.springK),
  wrong: [br(Q.force), br(Q.pressure), br(Q.accel)],
  sol: `k = F ÷ x, so [k] = ${br(Q.force)} ÷ [L] = ${br(Q.springK)} — option (@K).`,
  d: 3, c: 'application', t: [5],
}), () => deq(ddiv(Q.force, L), Q.springK) || 'k');
const dl = {
  right: ddiv(dmul(Q.force, T), Q.momentum),
  w: [ddiv(dmul(Q.force, L), Q.momentum), ddiv(dmul(Q.pressure, Q.area), M_()), ddiv(Q.power, Q.energy)],
};
function M_() {
  return [1, 0, 0, 0, 0];
}
add('dimless-mcq', mcq({
  stem: 'Four ratios are formed from quantities in a mechanics problem. Which one has no dimensions?',
  right: 'force × time ÷ momentum',
  wrong: ['force × distance ÷ momentum', 'pressure × area ÷ mass', 'power ÷ energy'],
  sol: 'Force × time is impulse, which has the dimensions of momentum, so force × time ÷ momentum is dimensionless. The other three ratios reduce to a velocity, an acceleration and a frequency, which all have dimensions — option (@K).',
  d: 3, c: 'analysis', t: [5],
}), () => dl.right.every((v) => v === 0) && dl.w.every((d) => d.some((v) => v !== 0)) || 'dimless');

// ================================================================ t06 uses and limitations
add('coeff-mcq', mcq({
  stem: 'The position of a cart on a track is modelled by x = A + B t + C t², with x in metre and t in second. The SI unit of C is',
  right: 'm s⁻²',
  wrong: ['m s⁻¹', 'm s', 'm s²'],
  sol: 'Each term must be a length, so C t² is in metre and C has the unit m ÷ s² = m s⁻² — option (@K).',
  d: 3, c: 'application', t: [6],
}), () => deq(ddiv(L, dpow(T, 2)), Q.accel) || 'C');
add('inconsistent-mcq', mcq({
  stem: 'One of these relations for the pressure P of a moving fluid of density ρ, speed v, height h and gravitational acceleration g is not dimensionally consistent. Which one?',
  right: 'P = ρ v² / h',
  wrong: ['P = ½ ρ v²', 'P = ρ g h', 'P = F / A'],
  sol: 'ρv² has the dimensions of pressure already, so dividing it by a length h gives pressure per length — not consistent. The other three each give [M L⁻¹ T⁻²] — option (@K).',
  d: 4, c: 'analysis', t: [6],
}), () => deq(dmul(Q.density, dpow(Q.velocity, 2)), Q.pressure) && !deq(ddiv(Q.pressure, L), Q.pressure) && deq(dmul(Q.density, Q.accel, L), Q.pressure) || 'incons');
const cp = { v: 5.0e6 };
cp.pa = convert(cp.v, Q.pressure, 'CGS', 'SI');
add('pressconv-mcq', mcq({
  stem: `A hydraulic press in a CGS laboratory handbook is rated at ${pt(cp.v, 2)} dyne cm⁻². Using dimensions, this pressure in pascal is`,
  right: `${pt(cp.pa, 2)} Pa`,
  wrong: [`${pt(cp.pa * 100, 2)} Pa`, `${pt(cp.pa / 10, 2)} Pa`, `${pt(cp.v, 2)} Pa`],
  sol: `[P] = [M L⁻¹ T⁻²]. 1 dyne cm⁻² = (10⁻³)(10⁻²)⁻¹ = 10⁻¹ Pa, so ${pt(cp.v, 2)} dyne cm⁻² = ${pt(cp.pa, 2)} Pa — option (@K).`,
  d: 4, c: 'application', t: [6],
}), () => near(5e6 * (1e-5 / 1e-4), 5e5) || 'pressconv');
add('limit-mcq', mcq({
  stem: 'Which of these results cannot be obtained from dimensional analysis alone?',
  right: 'The numerical factor 2π in the formula for the period of a pendulum',
  wrong: ['Whether an equation is dimensionally consistent', 'The dimensions of a constant appearing in an equation', 'The factor that converts newton to dyne'],
  sol: 'Dimensional analysis checks consistency, finds dimensions of constants and converts units, but pure numbers such as 2π carry no dimensions and cannot be found from them — option (@K).',
  d: 2, c: 'understanding', t: [6],
}));

// ================================================================ assertion-reason (keys: a b c d a b)
add('parsec-ar', ar({
  a: 'Of two stars, the one with the larger parallax angle is nearer to the Earth.',
  r: 'The distance of a star equals the baseline divided by its parallax angle.',
  key: 'a',
  sol: 'Both are true and R explains A: D = b/p, so for the same baseline a larger p gives a smaller D — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('prefix-ar', ar({
  a: 'The kilogram is the only SI base unit whose name carries a prefix.',
  r: 'Since 2019 the kilogram has been defined by fixing the value of the Planck constant.',
  key: 'b',
  sol: 'A is true: kilo is a prefix. R is also true, but the definition through the Planck constant has nothing to do with the name containing a prefix — option (b).',
  d: 3, c: 'analysis', t: [2],
}));
add('rules-ar', ar({
  a: 'A mass of five kilograms may correctly be written 5 kg.',
  r: 'SI unit symbols are made plural by adding the letter s.',
  key: 'c',
  sol: 'A is true. R is false: symbols are never pluralised, so 5 kg stays 5 kg — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('sf-ar', ar({
  a: 'The number 2600 written without a decimal point always has four significant figures.',
  r: 'Zeros placed after the decimal point in a number such as 2.600 are significant.',
  key: 'd',
  sol: 'A is false: trailing zeros of a whole number with no decimal point are not counted as significant, so 2600 has two (2.600 × 10³ has four). R is true — option (d).',
  d: 3, c: 'analysis', t: [4],
}));
add('exp-ar', ar({
  a: 'In a physical formula the argument of an exponential function must be dimensionless.',
  r: 'The series 1 + x + x²/2 + … adds powers of x, and these have the same dimensions only if x has none.',
  key: 'a',
  sol: 'Both true and R explains A: the series adds x, x², … so they can be added only if x is dimensionless — option (a).',
  d: 3, c: 'analysis', t: [5],
}));
add('zero-ar', ar({
  a: 'A zero error in a vernier caliper is a systematic error.',
  r: 'Every reading of a vernier caliper is limited by its least count.',
  key: 'b',
  sol: 'A is true: a zero error shifts every reading the same way. R is also true, but it describes the least-count limit and does not explain why a zero error is systematic — option (b).',
  d: 3, c: 'analysis', t: [4],
}));

// ================================================================ true-false and fill
add('tf-poundal', tf({
  stem: 'In the FPS system the unit of force is the poundal.',
  key: 't',
  sol: 'True. In the FPS system force = pound × foot per second squared, which is the poundal.',
  d: 1, c: 'recall', t: [1],
}));
add('tf-zeros', tf({
  stem: 'The number 0.00450 has five significant figures.',
  key: 'f',
  sol: 'False. The leading zeros do not count; 4, 5 and the trailing 0 after the decimal point do, so it has three.',
  d: 2, c: 'understanding', t: [4],
}), () => sfCount('0.00450') === 3 || 'zeros');
add('tf-homog', tf({
  stem: 'By the principle of homogeneity, a length may be added to a speed provided both are written in SI units.',
  key: 'f',
  sol: 'False. Only quantities with the same dimensions can be added; a length [L] and a speed [L T⁻¹] differ in dimensions whatever the units.',
  d: 2, c: 'understanding', t: [5],
}));
add('fill-mole', fill({
  stem: 'The SI base unit of the amount of substance is the ___.',
  acc: [['mole', 'mol']],
  sol: 'The **mole**, symbol mol.',
  d: 1, c: 'recall', t: [2],
}));
const fo = { x: 4.5e7 };
fo.k = orderOfMag(fo.x);
add('fill-order', fill({
  stem: `The order of magnitude of ${pt(fo.x, 2)} m is 10 raised to the power ___.`,
  acc: [[String(fo.k)]],
  sol: `Here a = 4.5, which is above 3.16, so the power is raised by one: 7 + 1 = ${fo.k}.`,
  d: 2, c: 'understanding', t: [4],
}), () => orderOfMag(4.5e7) === 8 || 'fo');
add('fill-freq', fill({
  stem: 'The dimensional formula of frequency is [T raised to the power ___].',
  acc: [['-1', '−1', '–1']],
  sol: `Frequency = 1 ÷ time, so the dimensional formula is [T⁻¹] and the blank is −1.`,
  d: 1, c: 'recall', t: [5],
}), () => deq(Q.frequency, dpow(T, -1)) || 'freq');

// ================================================================ numericals
const n1 = { d: 2.5e22, ly: 9.46e15 };
n1.r = n1.d / n1.ly;
add('ly-num', num({
  stem: 'A galaxy lies 2.5 × 10²² m from the Earth. Express this distance in units of 10⁶ light years, to 3 significant figures. (1 ly = 9.46 × 10¹⁵ m.)',
  ...NV(n1.r / 1e6, 3), unit: '× 10⁶ ly',
  sol: `Distance in ly = ${pt(n1.d, 2)} m ÷ ${pt(n1.ly, 3)} m per ly = ${pt(n1.r, 3)} ly, which is ${pt(n1.r / 1e6, 3)} in units of 10⁶ ly.`,
  scheme: [[`2.5 × 10²² ÷ 9.46 × 10¹⁵ = ${pt(n1.r, 3)} ly, so the answer is ${pt(n1.r / 1e6, 3)}`, 1]],
  marks: 1, d: 1, c: 'application', t: [3],
}), (q) => near(Math.pow(10, 22 + Math.log10(2.5) - 15 - Math.log10(9.46) - 6), q.answer.value, 0.01) || 'ly');
const n2 = { km: 4.5e9 };
n2.au = (n2.km * 1000) / AU;
add('au-num', num({
  stem: 'A space probe is 4.5 × 10⁹ km from the Sun. Express this in astronomical units, to 3 significant figures. (1 AU = 1.496 × 10¹¹ m.)',
  ...NV(n2.au, 3), unit: 'AU',
  sol: `4.5 × 10⁹ km = 4.5 × 10¹² m; dividing by 1.496 × 10¹¹ m per AU gives ≈ ${pt(n2.au, 3)} AU.`,
  scheme: [[`4.5 × 10¹² m ÷ 1.496 × 10¹¹ m ≈ ${pt(n2.au, 3)} AU`, 1]],
  marks: 1, d: 2, c: 'application', t: [3],
}), (q) => near(4.5e9 * 1e3 / 1.496e11, q.answer.value, 0.01) || 'au');
const n3 = { b: 3.0e6, deg: 0.45 };
n3.p = (n3.deg * Math.PI) / 180;
n3.D = n3.b / n3.p;
add('parallax-num', num({
  stem: 'Two observatories 3.0 × 10³ km apart on the Earth sight the same crater on the Moon, and the directions differ by 0.45°. Treating this angle as the parallax for the baseline, find the Earth–Moon distance in units of 10⁸ m (3 significant figures).',
  ...NV(n3.D / 1e8, 3), unit: '× 10⁸ m',
  sol: `p = 0.45° = ${pt(n3.p, 3)} rad and b = 3.0 × 10⁶ m, so D = b ÷ p = ${pt(n3.D, 3)} m, which is ${pt(n3.D / 1e8, 3)} in units of 10⁸ m.`,
  scheme: [[`Convert the angle: p = ${pt(n3.p, 3)} rad`, 1], [`D = b/p = ${pt(n3.D, 3)} m, so the answer is ${pt(n3.D / 1e8, 3)}`, 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(3.0e6 / Math.tan((0.45 * Math.PI) / 180) / 1e8, q.answer.value, 0.01) || 'parallax');
const n4 = { au: 5.2 };
n4.s = (n4.au * AU) / C_LIGHT;
n4.min = n4.s / 60;
add('lighttime-num', num({
  stem: 'Jupiter is 5.2 AU from the Sun. Taking 1 AU = 1.496 × 10¹¹ m and the speed of light 2.998 × 10⁸ m s⁻¹, find the time light takes to travel from the Sun to Jupiter, in minutes (3 significant figures).',
  ...NV(n4.min, 3), unit: 'min',
  sol: `d = 5.2 × 1.496 × 10¹¹ m ≈ ${pt(n4.au * AU, 3)} m; t = d ÷ c ≈ ${pt(n4.s, 3)} s = ${pt(n4.min, 3)} min.`,
  scheme: [[`t = d/c ≈ ${pt(n4.s, 3)} s`, 1], [`In minutes ≈ ${pt(n4.min, 3)} min`, 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near((5.2 * 1.496e11) / 2.998e8 / 60, q.answer.value, 0.01) || 'lt');
const n5 = { u: 238 };
n5.kg = n5.u * U_KG;
add('uranium-num', num({
  stem: 'A uranium atom has a mass of 238 u. Taking 1 u = 1.66 × 10⁻²⁷ kg, find its mass in units of 10⁻²⁵ kg (3 significant figures).',
  ...NV(n5.kg / 1e-25, 3), unit: '× 10⁻²⁵ kg',
  sol: `Mass = 238 × 1.66 × 10⁻²⁷ kg = ${pt(n5.kg, 3)} kg, which is ${pt(n5.kg / 1e-25, 3)} in units of 10⁻²⁵ kg.`,
  scheme: [[`238 × 1.66 × 10⁻²⁷ = ${pt(n5.kg, 3)} kg, so the answer is ${pt(n5.kg / 1e-25, 3)}`, 1]],
  marks: 1, d: 1, c: 'application', t: [3],
}), (q) => near((238 * 1.66 * 1e-27) / 1e-25, q.answer.value, 0.01) || 'u');
const n6 = { d: [0.52, 0.5, 0.53, 0.51, 0.54] };
n6.m = mean(n6.d);
n6.e = meanAbsErr(n6.d);
n6.pct = (n6.e / n6.m) * 100;
add('wire-num', num({
  stem: 'A student measures the diameter of a wire with a screw gauge at five places and records 0.52, 0.50, 0.53, 0.51 and 0.54 mm. Find the percentage error in the mean diameter (2 significant figures).',
  ...NV(n6.pct, 2), unit: '%',
  sol: `Mean = ${n6.m.toFixed(2)} mm; absolute errors 0.00, 0.02, 0.01, 0.01, 0.02 mm; mean absolute error = ${n6.e.toFixed(3)} mm; percentage error = ${n6.e.toFixed(3)} ÷ ${n6.m.toFixed(2)} × 100 ≈ ${pt(n6.pct, 2)} %.`,
  scheme: [[`Mean ${n6.m.toFixed(2)} mm and mean absolute error ${n6.e.toFixed(3)} mm`, 1], [`Percentage error ≈ ${pt(n6.pct, 2)} %`, 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), (q) => near(((Math.abs(0.52 - 0.52) + 0.02 + 0.01 + 0.01 + 0.02) / 5 / 0.52) * 100, q.answer.value, 0.02) || 'wire');
const n7 = { g: 13.6 };
n7.kg = convert(n7.g, Q.density, 'CGS', 'SI');
add('mercury-num', num({
  stem: 'The density of mercury is 13.6 g cm⁻³. Using dimensions, find its density in kg m⁻³ (3 significant figures).',
  ...NV(n7.kg, 3), unit: 'kg m⁻³',
  sol: `[ρ] = [M L⁻³]; 1 g cm⁻³ = 10⁻³ kg ÷ (10⁻² m)³ = 10³ kg m⁻³, so the density is ${pt(n7.g, 3)} × 10³ = ${Math.round(n7.kg)} kg m⁻³.`,
  scheme: [[`13.6 × 10³ = ${Math.round(n7.kg)} kg m⁻³`, 1]],
  marks: 1, d: 2, c: 'application', t: [6],
}), (q) => near(13.6 * 1e-3 / 1e-6, q.answer.value, 0.01) || 'rho');
const n8 = { W: 60 };
n8.erg = convert(n8.W, Q.power, 'SI', 'CGS');
add('bulb-num', num({
  stem: 'A lamp is rated 60 W. Using dimensions, find its power in units of 10⁸ erg s⁻¹ (2 significant figures).',
  ...NV(n8.erg / 1e8, 2), unit: '× 10⁸ erg s⁻¹',
  sol: `[P] = [M L² T⁻³]; 1 W = (10³)(10²)² = 10⁷ erg s⁻¹, so 60 W = ${pt(n8.erg, 2)} erg s⁻¹, which is ${pt(n8.erg / 1e8, 2)} in units of 10⁸ erg s⁻¹.`,
  scheme: [[`60 × 10⁷ = ${pt(n8.erg, 2)} erg s⁻¹, so the answer is ${pt(n8.erg / 1e8, 2)}`, 1]],
  marks: 1, d: 2, c: 'application', t: [6],
}), (q) => near((60 * 1e3 * 1e4) / 1e8, q.answer.value, 0.01) || 'bulb');
void [sf, A, YEAR];
