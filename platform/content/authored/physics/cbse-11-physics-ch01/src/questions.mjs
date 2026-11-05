// ch01 Units and Measurements — question bank, part 1: t01 (units) and t02 (significant figures, errors).
// Part 2 (t03, long answers, case-based items) is in questions-extra.mjs. Numbers are computed here and re-checked by `check` functions.
// AR keys across the chapter: radian a, light year c, trailing zeros b, nearly equal lengths d, power e error a, homogeneity c.
import { mk, add, r, sci, dec, near } from './lib.mjs';
import { sf, roundSf, pt, sfCount, NV, mean, meanAbsErr, roundDp, Q, C_LIGHT, YEAR, AU, PARSEC, LY } from './calc.mjs';
import { unitTxt } from './decks.mjs';

const { mcq, ar, tf, fill, num, short } = mk;

// ================================================================ t01 systems of units, SI, practical units
add('baseunit-mcq', mcq({
  stem: 'A student prepares a list headed "SI base units": metre, kilogram, kelvin, candela, newton. Which entry does not belong in the list?',
  right: 'The newton, because it is a derived unit equal to kg m s⁻²',
  wrong: ['The kelvin, because temperature cannot be a base quantity', 'The candela, because light cannot be measured in the SI', 'The kilogram, because mass is derived from force'],
  sol: 'The seven SI base units are metre, kilogram, second, ampere, kelvin, mole and candela. The newton is derived: force = mass × acceleration, so 1 N = 1 kg m s⁻² — option (@K).',
  d: 1, c: 'understanding', t: [1],
}), () => unitTxt(Q.force) === 'kg m s⁻²' || 'newton');
add('pascal-mcq', mcq({
  stem: 'The tyre pressure of a scooter is printed as 2.2 × 10⁵ Pa. In SI base units, one pascal is',
  right: 'kg m⁻¹ s⁻²',
  wrong: ['kg m s⁻²', 'kg m² s⁻²', 'kg m⁻² s⁻¹'],
  sol: 'Pressure = force ÷ area = (kg m s⁻²) ÷ m² = kg m⁻¹ s⁻² — option (@K).',
  d: 2, c: 'understanding', t: [1],
}), () => unitTxt(Q.pressure) === 'kg m⁻¹ s⁻²' || 'pascal');
add('angle-mcq', mcq({
  stem: 'A surveyor in Dehradun records four quantities for a bend in a hill road: the arc length of the bend, the radius of the bend, the angle it subtends at the centre of the curve in radian, and the time taken to drive round it. Which of these has no dimensions?',
  right: 'The angle in radian',
  wrong: ['The arc length', 'The radius', 'The time taken'],
  sol: 'The radian measure of an angle is arc ÷ radius, a ratio of two lengths, so it is dimensionless; the other three have dimensions [L], [L] and [T] — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('prefix-mcq', mcq({
  stem: 'A chip plant advertises a "7 nm process". Written in SI base units without a prefix, 7 nm is',
  right: '7 × 10⁻⁹ m',
  wrong: ['7 × 10⁻⁶ m', '7 × 10⁻¹² m', '7 × 10⁹ m'],
  sol: 'The prefix nano stands for 10⁻⁹, so 7 nm = 7 × 10⁻⁹ m — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('astro-mcq', mcq({
  stem: 'Astronomers measure distances inside the solar system in multiples of the mean Earth–Sun distance, 1.496 × 10¹¹ m. This length is called',
  right: 'one astronomical unit',
  wrong: ['one light year', 'one parsec', 'one fermi'],
  sol: 'The mean Earth–Sun distance defines the astronomical unit (AU); a light year and a parsec are far larger and a fermi is nuclear in size — option (@K).',
  d: 1, c: 'recall', t: [1],
}));

add('radian-ar', ar({
  a: 'In the relation s = r θ for an arc of a circle, the angle θ in radian has no dimensions, so s and r have the same dimensions.',
  r: 'The radian is defined as the ratio of an arc length to a radius, two quantities of the same kind.',
  key: 'a',
  sol: 'Both statements are true, and R explains A: θ = s/r is a ratio of two lengths, so it is a pure number and s = rθ equates two lengths — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('ly-ar', ar({
  a: 'Light from Proxima Centauri, which is 4.24 light years away, takes about 4.24 years to reach us.',
  r: 'A light year is a unit of time.',
  key: 'c',
  sol: 'A is true: light covers one light year in one year. R is false: a light year is a unit of distance, the distance light travels in one year — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('tf-prefix', tf({
  stem: 'A capacitor marked 470 μF has a larger capacitance than a capacitor marked 0.5 mF.',
  key: 'f',
  sol: 'False. 470 μF = 470 × 10⁻⁶ F = 0.47 mF, which is smaller than 0.5 mF.',
  d: 2, c: 'understanding', t: [1],
}), () => 470e-6 < 0.5e-3 || 'cap');
add('tf-parsec', tf({
  stem: 'In an astronomy quiz, a student claims that one parsec is longer than one light year.',
  key: 't',
  sol: 'True. One parsec is about 3.08 × 10¹⁶ m, which is about 3.26 light years.',
  d: 1, c: 'recall', t: [1],
}), () => PARSEC > LY || 'pc');
add('fill-fermi', fill({
  stem: 'Nuclear sizes are quoted in fermi. One fermi equals 10 raised to the power ___ metre.',
  acc: [['-15', '−15', '–15']],
  sol: 'One fermi = 10 raised to the power −15 metre, that is 10⁻¹⁵ m: the blank is −15.',
  d: 1, c: 'recall', t: [1],
}));
add('fill-kg', fill({
  stem: 'Among the seven SI base units, the only one whose name already carries a prefix is the ___.',
  acc: [['kilogram', 'kg']],
  sol: 'The **kilogram**: its name contains the prefix kilo.',
  d: 1, c: 'recall', t: [1],
}));

const comet = { d: 6.0e12 };
comet.au = comet.d / 1.496e11;
add('comet-num', num({
  stem: 'A comet reaches a farthest point 6.00 × 10¹² m from the Sun. Express this distance in astronomical units, to 3 significant figures. (1 AU = 1.496 × 10¹¹ m.)',
  ...NV(comet.au, 3), unit: 'AU',
  sol: r`$\dfrac{6.00 \times 10^{12}}{1.496 \times 10^{11}} \approx ${dec(comet.au, 3)}$ AU.`,
  scheme: [['Divide by the length of 1 AU', 1]],
  marks: 1, d: 1, c: 'application', t: [1],
}), (q) => near(6.0e12 / 1.496e11, q.answer.value, 0.01) || 'comet');
const srr = { A: 3.0, R: 1.5 };
srr.sr = srr.A / srr.R ** 2;
add('sr-num', num({
  stem: 'A bulb sits at the centre of a spherical lampshade of radius 1.50 m. A translucent patch of area 3.00 m² on the lampshade lets out most of the light. Find the solid angle that the patch subtends at the bulb, in steradian (3 significant figures).',
  ...NV(srr.sr, 3), unit: 'sr',
  sol: r`$\Omega = \dfrac{A}{r^2} = \dfrac{3.00}{(1.50)^2} = \dfrac{3.00}{${dec(srr.R ** 2, 3)}} \approx ${dec(srr.sr, 3)}$ sr.`,
  scheme: [['Ω = A/r²', 1], [`Ω ≈ ${dec(srr.sr, 3)} sr`, 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => near(3 / 2.25, q.answer.value, 0.01) || 'sr');
const sun = { d: 1.496e11, c: 2.998e8 };
sun.s = sun.d / sun.c;
sun.min = sun.s / 60;
add('ltime-num', num({
  stem: 'Sunlight takes some time to reach Earth. Using the mean Earth–Sun distance 1.496 × 10¹¹ m and the speed of light 2.998 × 10⁸ m s⁻¹, find the time in minutes (3 significant figures).',
  ...NV(sun.min, 3), unit: 'min',
  sol: r`$t = \dfrac{d}{c} = \dfrac{1.496 \times 10^{11}}{2.998 \times 10^{8}} \approx ${dec(sun.s, 3)}$ s; in minutes $\dfrac{${dec(sun.s, 3)}}{60} \approx ${dec(sun.min, 3)}$ min.`,
  scheme: [['t = d/c ≈ ' + `${dec(sun.s, 3)} s`, 1], [`Divide by 60: ≈ ${dec(sun.min, 3)} min`, 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => near(1.496e11 / 2.998e8 / 60, q.answer.value, 0.01) || 'ltime');
const wd = { ly: 8.6 };
wd.pc = (wd.ly * 9.46e15) / 3.08e16;
add('pc-num', num({
  stem: 'A white dwarf is 8.6 light years away. Express its distance in parsec, to 2 significant figures. (1 ly = 9.46 × 10¹⁵ m, 1 pc = 3.08 × 10¹⁶ m.)',
  ...NV(wd.pc, 2, 0.03), unit: 'pc',
  sol: r`Distance in metre $= 8.6 \times 9.46 \times 10^{15} = ${sf(wd.ly * 9.46e15, 3)}$ m; in parsec $\dfrac{${sf(wd.ly * 9.46e15, 3)}}{3.08 \times 10^{16}} = ${dec(wd.pc, 3)} \approx ${dec(roundSf(wd.pc, 2), 2)}$ pc.`,
  scheme: [['Convert light years to metre', 1], [`Divide by 1 pc: ≈ ${dec(roundSf(wd.pc, 2), 2)} pc`, 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => near(8.6 / 3.26, q.answer.value, 0.02) || 'pc');
const at = { N: 1.0e-3 / 1.06e-10 };
add('atom-num', num({
  stem: 'A hydrogen atom has a diameter of about 1.06 Å. How many such atoms placed in a straight row, touching one another, would span 1.00 mm? Give the answer in units of 10⁶ (3 significant figures). (1 Å = 10⁻¹⁰ m.)',
  ...NV(at.N / 1e6, 3), unit: '× 10⁶',
  sol: r`$N = \dfrac{1.00 \times 10^{-3}\ \text{m}}{1.06 \times 10^{-10}\ \text{m}} \approx ${sf(at.N, 3)}$. In units of $10^{6}$: $N = ${dec(at.N / 1e6, 3)}$.`,
  scheme: [['N = length ÷ diameter, both in metre', 1], [`N ≈ ${pt(at.N, 3)}`, 1]],
  marks: 2, d: 3, c: 'application', t: [1],
}), (q) => near(1e-3 / 1.06e-10 / 1e6, q.answer.value, 0.01) || 'atom');
const ck = { f: 3.0e9 };
ck.T = 1 / ck.f;
ck.ps = ck.T * 1e12;
add('clock-num', num({
  stem: 'The clock of a processor runs at 3.0 GHz. Find the time for one cycle in picosecond, to 3 significant figures.',
  ...NV(ck.ps, 3), unit: 'ps',
  sol: r`$T = \dfrac{1}{f} = \dfrac{1}{3.0 \times 10^{9}} = ${sf(ck.T, 3)}$ s. Since 1 ps $= 10^{-12}$ s, $\dfrac{${sf(ck.T, 3)}}{10^{-12}} = ${dec(ck.ps, 3)}$ ps.`,
  scheme: [['T = 1/f ≈ ' + `${pt(ck.T, 3)} s`, 1], [`Convert with 1 ps = 10⁻¹² s: ≈ ${dec(ck.ps, 3)} ps`, 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), (q) => near(1 / 3.0e9 / 1e-12, q.answer.value, 0.01) || 'clock');

add('sr-short', short({
  marks: 2,
  stem: 'Explain why the radian and the steradian have no dimensions, and say how modern SI classifies them.',
  model: 'The radian is arc length divided by radius, a ratio of two lengths, and the steradian is surface area divided by radius squared, a ratio of two areas. A ratio of like quantities is a pure number, so both are dimensionless. Earlier called supplementary units, they are now classed as dimensionless derived units of the SI.',
  sol: 'Ratios of like quantities.',
  scheme: [['Radian = arc ÷ radius and steradian = area ÷ radius² are ratios of like quantities, so dimensionless', 1], ['Now classed as dimensionless derived units (formerly supplementary)', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('derived-short', short({
  marks: 2,
  stem: 'Distinguish a base unit from a derived unit, with two examples of each, and write the watt in SI base units.',
  model: `A base unit belongs to one of the seven base quantities, for example the metre and the kilogram. A derived unit is a product or quotient of base units, for example the newton and the joule. The watt is a joule per second, so in base units it is ${unitTxt(Q.power)}.`,
  sol: 'Base against derived; watt = J s⁻¹.',
  scheme: [['Base unit defined for a base quantity, derived unit formed from base units, with examples', 1], [`Watt = J s⁻¹ = ${unitTxt(Q.power)}`, 1]],
  d: 2, c: 'understanding', t: [1],
}), () => unitTxt(Q.power) === 'kg m² s⁻³' || 'watt');
add('ly-short', short({
  marks: 2,
  stem: 'Define a light year and find its value in metre, given that the speed of light is 2.998 × 10⁸ m s⁻¹ and one year is 3.156 × 10⁷ s.',
  model: `A light year is the distance travelled by light in vacuum in one year. Its value is the speed of light multiplied by the time of one year: 2.998 × 10⁸ m s⁻¹ × 3.156 × 10⁷ s ≈ ${pt(LY, 3)} m.`,
  sol: 'Distance = speed × time.',
  scheme: [['Distance light travels in one year', 1], [`2.998 × 10⁸ × 3.156 × 10⁷ ≈ ${pt(LY, 3)} m`, 1]],
  d: 2, c: 'application', t: [1],
}), () => near(LY, 9.46e15, 0.001) || 'ly');
const kmh = { v: 72, P: 0.25e6, l: 640e-9 };
kmh.vs = (kmh.v * 1000) / 3600;
add('prefix-short3', short({
  marks: 3,
  stem: 'Express each quantity in SI base units without a prefix: (a) a train speed of 72 km h⁻¹, (b) a power of 0.25 MW, (c) the wavelength 640 nm of red light.',
  model: `(a) 72 km h⁻¹ = 72 × 1000 m ÷ 3600 s = ${pt(kmh.vs, 2)} m s⁻¹. (b) Mega means 10⁶, so 0.25 MW = 0.25 × 10⁶ W = ${pt(kmh.P, 2)} W. (c) Nano means 10⁻⁹, so 640 nm = 640 × 10⁻⁹ m = ${pt(kmh.l, 2)} m.`,
  sol: 'Replace each prefix by its power of ten and convert hours to seconds.',
  scheme: [[`72 km h⁻¹ = ${pt(kmh.vs, 2)} m s⁻¹`, 1], [`0.25 MW = ${pt(kmh.P, 2)} W`, 1], [`640 nm = ${pt(kmh.l, 2)} m`, 1]],
  d: 2, c: 'understanding', t: [1],
}), () => near(kmh.vs, 20) && near(kmh.P, 2.5e5) && near(kmh.l, 6.4e-7) || 'prefix3');

// ================================================================ t02 significant figures
add('sfcount-mcq', mcq({
  stem: 'A digital balance at a jeweller\'s in Jaipur shows 0.07050 g. The number of significant figures in this reading is',
  right: '4',
  wrong: ['5', '3', '2'],
  sol: 'The leading zeros are not significant. The digits 7, 0, 5 and the final 0 (a trailing zero after the decimal point) are significant, so there are 4 — option (@K).',
  d: 1, c: 'understanding', t: [2],
}), () => sfCount('0.07050') === 4 || 'sf');
const path = { parts: [6.25, 0.036, 12.1] };
path.sum = path.parts.reduce((s, v) => s + v, 0);
path.R = roundDp(path.sum, 1);
add('sfadd-mcq', mcq({
  stem: 'Three tapes are used to measure the parts of a garden path: 6.25 m, 0.036 m and 12.1 m. The total length is correctly written as',
  right: `${dec(path.R, 3)} m`,
  wrong: ['18.386 m', '18.39 m', '18 m'],
  sol: `The sum is ${dec(path.sum, 5)} m. In addition the answer keeps the least number of decimal places; 12.1 m has one, so the total is ${dec(path.R, 3)} m — option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => path.R === 18.4 || 'path');
add('round-mcq', mcq({
  stem: 'Rounded to three significant figures with the rule "a dropped 5 with nothing after it makes the last kept digit even", the number 5.365 becomes',
  right: `${dec(roundSf(5.365, 3), 3)}`,
  wrong: ['5.37', '5.4', '5.30'],
  sol: 'The dropped digit is exactly 5 and the last kept digit 6 is already even, so it is left unchanged: 5.36 — option (@K).',
  d: 2, c: 'understanding', t: [2],
}), () => roundSf(5.365, 3) === 5.36 || 'round');
add('prec-mcq', mcq({
  stem: 'A kitchen scale is checked with a standard 50.0 g mass. Five readings are 52.1 g, 52.2 g, 52.1 g, 52.2 g and 52.1 g. The scale is',
  right: 'precise but not accurate',
  wrong: ['accurate but not precise', 'both accurate and precise', 'neither precise nor accurate'],
  sol: 'The readings agree closely with each other (precise) but all lie about 2 g above the true 50.0 g (not accurate) — option (@K).',
  d: 2, c: 'application', t: [2],
}));
const sg = { zero: 0.03, reading: 1.45 };
sg.true = sg.reading - sg.zero;
add('zero-mcq', mcq({
  stem: 'A screw gauge shows +0.03 mm when its jaws are closed. A wire placed between the jaws gives a reading of 1.45 mm. The correct diameter of the wire is',
  right: `${sg.true.toFixed(2)} mm`,
  wrong: ['1.48 mm', '1.45 mm', '1.43 mm'],
  sol: 'A positive zero error is subtracted from the reading: 1.45 − 0.03 = 1.42 mm — option (@K).',
  d: 2, c: 'application', t: [2],
}), () => Math.abs(sg.true - 1.42) < 1e-9 || 'zero');
const plot = { l: 40.0, dl: 0.4, b: 25.0, db: 0.5 };
plot.rel = plot.dl / plot.l + plot.db / plot.b;
add('comb-mcq', mcq({
  stem: 'The sides of a rectangular plot are measured as 40.0 m with an error of 0.4 m and 25.0 m with an error of 0.5 m. The percentage error in its area is',
  right: `${dec(plot.rel * 100, 2)} %`,
  wrong: ['1.5 %', '2.0 %', '0.9 %'],
  sol: `For a product the relative errors add: 0.4/40.0 + 0.5/25.0 = 0.010 + 0.020 = ${dec(plot.rel, 2)}, which is ${dec(plot.rel * 100, 2)} % — option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => near(plot.rel, 0.03, 1e-9) || 'plot');
add('diff-mcq', mcq({
  stem: 'Two temperatures are measured as (74.5 ± 0.2) °C and (28.5 ± 0.3) °C. Their difference is correctly written as',
  right: '(46.0 ± 0.5) °C',
  wrong: ['(46.0 ± 0.1) °C', '(46.0 ± 0.3) °C', '(46.0 ± 0.06) °C'],
  sol: 'In a difference the absolute errors add: 0.2 + 0.3 = 0.5 °C, and 74.5 − 28.5 = 46.0 °C — option (@K).',
  d: 2, c: 'application', t: [2],
}), () => near(74.5 - 28.5, 46.0) && near(0.2 + 0.3, 0.5) || 'diff');
add('rand-mcq', mcq({
  stem: 'While timing a trolley on a track, a student presses the stopwatch a little early on some runs and a little late on others. Taking many runs and averaging mainly reduces the',
  right: 'random error',
  wrong: ['systematic error of a stopwatch that runs fast', 'zero error of the instrument', 'least count of the stopwatch'],
  sol: 'Early and late presses scatter readings on both sides of the true value; averaging cancels much of this random error, but not a fixed offset or the instrument\'s least count — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));

add('trail-ar', ar({
  a: 'The sum of 2.5 cm and 1.25 cm is reported as 3.8 cm.',
  r: 'Zeros between two non-zero digits are significant.',
  key: 'b',
  sol: 'A is true: 3.75 cm is kept to one decimal place (the least precise number is 2.5 cm), and the dropped 5 follows the odd digit 7, which is raised to 8. R is also true but has nothing to do with the sum — option (b).',
  d: 3, c: 'application', t: [2],
}), () => roundDp(2.5 + 1.25, 1) === 3.8 || 'trail');
add('diff-ar', ar({
  a: 'When two nearly equal lengths are subtracted, the percentage error in the difference is smaller than the percentage error in either length.',
  r: 'In a difference the absolute errors of the two quantities add.',
  key: 'd',
  sol: 'R is true. A is false: the absolute errors add while the difference itself is small, so the percentage error in the difference is much larger — option (d).',
  d: 3, c: 'analysis', t: [2],
}));
add('power-ar', ar({
  a: 'A 1.5 % error in the radius of a circle causes a 3.0 % error in its area.',
  r: 'The relative error of a quantity raised to a power is multiplied by that power.',
  key: 'a',
  sol: 'The area is πr², so the relative error in r is multiplied by 2: 2 × 1.5 % = 3.0 %. Both statements are true and R explains A — option (a).',
  d: 2, c: 'application', t: [2],
}), () => near(2 * 1.5, 3.0, 1e-9) || 'power');
add('tf-sf', tf({
  stem: 'Writing a length of 2.50 m as 250 cm keeps three significant figures.',
  key: 'f',
  sol: 'False. By the usual convention the trailing zero in 250 (no decimal point) is not significant, so 250 cm shows only 2 significant figures; write 2.50 × 10² cm to keep three.',
  d: 2, c: 'understanding', t: [2],
}), () => sfCount('250') === 2 || 'tf-sf');

const lap = [72.4, 73.1, 72.8, 73.5, 72.7];
lap.mean = mean(lap);
lap.dm = meanAbsErr(lap);
add('abserr-num', num({
  stem: 'Five cyclists time one lap of a stadium track: 72.4 s, 73.1 s, 72.8 s, 73.5 s and 72.7 s. Find the mean absolute error of the readings, in seconds (2 significant figures).',
  ...NV(lap.dm, 2), unit: 's',
  sol: r`Mean $= \dfrac{364.5}{5} = ${dec(lap.mean, 3)}$ s. Absolute errors: $${lap.map((v) => Math.abs(lap.mean - v).toFixed(1)).join(',\\ ')}$ s. Their mean is $\dfrac{${lap.map((v) => Math.abs(lap.mean - v)).reduce((s, e) => s + e, 0).toFixed(1)}}{5} = ${dec(lap.dm, 2)}$ s.`,
  scheme: [[`Mean = ${dec(lap.mean, 3)} s`, 1], [`Mean of the absolute errors ≈ ${dec(lap.dm, 2)} s`, 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near(meanAbsErr([72.4, 73.1, 72.8, 73.5, 72.7]), q.answer.value, 0.01) || 'abserr');
const cl = { x: 8.45, dx: 0.06 };
cl.pct = (cl.dx / cl.x) * 100;
add('pct-num', num({
  stem: 'The length of a classroom is recorded as (8.45 ± 0.06) m. Find the percentage error in the length (3 significant figures).',
  ...NV(cl.pct, 3), unit: '%',
  sol: r`Percentage error $= \dfrac{\Delta l}{l} \times 100 = \dfrac{0.06}{8.45} \times 100 \approx ${dec(cl.pct, 3)}\ \%$.`,
  scheme: [['Relative error = Δl/l', 1]],
  marks: 1, d: 1, c: 'application', t: [2],
}), (q) => near(0.06 / 8.45 * 100, q.answer.value, 0.01) || 'pct');
const pw = { V: 220, dV: 4, R: 48, dR: 1 };
pw.rel = (2 * pw.dV) / pw.V + pw.dR / pw.R;
add('power-num', num({
  stem: 'The power in a heater is found from P = V²/R with V = (220 ± 4) V and R = (48 ± 1) Ω. Find the percentage error in P (3 significant figures).',
  ...NV(pw.rel * 100, 3), unit: '%',
  sol: r`$\dfrac{\Delta P}{P} = 2\dfrac{\Delta V}{V} + \dfrac{\Delta R}{R} = 2 \times \dfrac{4}{220} + \dfrac{1}{48} = ${dec((2 * pw.dV) / pw.V, 3)} + ${dec(pw.dR / pw.R, 3)} = ${dec(pw.rel, 3)}$. Percentage error $= ${dec(pw.rel, 3)} \times 100 = ${dec(pw.rel * 100, 3)}$ %.`,
  scheme: [['Power rule: V² doubles its relative error', 1], [`Add Δ R/R: total ≈ ${dec(pw.rel * 100, 3)} %`, 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => near((2 * 4 / 220 + 1 / 48) * 100, q.answer.value, 0.01) || 'power');
const bl = { m: 125.0, dm: 0.5, V: 48.0, dV: 0.8 };
bl.rho = bl.m / bl.V;
bl.rel = bl.dm / bl.m + bl.dV / bl.V;
bl.drho = bl.rho * bl.rel;
add('density-num', num({
  stem: 'A metal block has mass (125.0 ± 0.5) g and volume (48.0 ± 0.8) cm³. Find the absolute error in its density, in g cm⁻³ (2 significant figures).',
  ...NV(bl.drho, 2), unit: 'g cm⁻³',
  sol: r`$\rho = \dfrac{125.0}{48.0} = ${dec(bl.rho, 4)}$ g cm$^{-3}$. $\dfrac{\Delta\rho}{\rho} = \dfrac{0.5}{125.0} + \dfrac{0.8}{48.0} = ${dec(bl.dm / bl.m, 3)} + ${dec(bl.dV / bl.V, 3)} = ${dec(bl.rel, 3)}$. $\Delta\rho = ${dec(bl.rho, 4)} \times ${dec(bl.rel, 3)} \approx ${dec(bl.drho, 2)}$ g cm$^{-3}$.`,
  scheme: [['ρ = m/V and relative errors add for a quotient', 1], [`Δρ = ρ × relative error ≈ ${dec(bl.drho, 2)} g cm⁻³`, 1]],
  marks: 2, d: 3, c: 'application', t: [2],
}), (q) => near((125 / 48) * (0.5 / 125 + 0.8 / 48), q.answer.value, 0.01) || 'density');
const rs = { r1: 100, d1: 3, r2: 47, d2: 2 };
rs.R = rs.r1 + rs.r2;
rs.dR = rs.d1 + rs.d2;
rs.pct = (rs.dR / rs.R) * 100;
add('rsum-num', num({
  stem: 'Two resistors, (100 ± 3) Ω and (47 ± 2) Ω, are joined in series. Find the percentage error in the total resistance (3 significant figures).',
  ...NV(rs.pct, 3), unit: '%',
  sol: r`$R = 100 + 47 = ${rs.R}\ \Omega$; for a sum the absolute errors add, $\Delta R = 3 + 2 = ${rs.dR}\ \Omega$. Percentage error $= \dfrac{${rs.dR}}{${rs.R}} \times 100 \approx ${dec(rs.pct, 3)}\ \%$.`,
  scheme: [['Absolute errors add: ΔR = 5 Ω', 1], [`Percentage error ≈ ${dec(rs.pct, 3)} %`, 1]],
  marks: 2, d: 2, c: 'application', t: [2],
}), (q) => near((5 / 147) * 100, q.answer.value, 0.01) || 'rsum');
const bv = { r: 3.5, dr: 0.05 };
bv.pct = 3 * (bv.dr / bv.r) * 100;
add('vol-num', num({
  stem: 'The radius of a spherical ball is measured as (3.50 ± 0.05) cm. Find the percentage error in its volume (3 significant figures).',
  ...NV(bv.pct, 3), unit: '%',
  sol: r`$V = \tfrac{4}{3}\pi r^3$, so $\dfrac{\Delta V}{V} = 3\dfrac{\Delta r}{r} = 3 \times \dfrac{0.05}{3.50} = ${dec(bv.pct / 100, 3)}$. Percentage error $= ${dec(bv.pct / 100, 3)} \times 100 = ${dec(bv.pct, 3)}$ %.`,
  scheme: [['Power rule: factor 3 for r³', 1]],
  marks: 1, d: 2, c: 'application', t: [2],
}), (q) => near(3 * 0.05 / 3.5 * 100, q.answer.value, 0.01) || 'vol');
const tl = { a: 59.6, b: 29.8 };
tl.area = tl.a * tl.b;
add('tile-num', num({
  stem: 'A floor tile measures 59.6 cm by 29.8 cm. Find its area with the correct number of significant figures, in units of 10³ cm².',
  ...NV(tl.area / 1e3, 3), unit: '× 10³ cm²',
  sol: r`$59.6 \times 29.8 = ${dec(tl.area, 6)}$ cm$^2$. Both factors have 3 significant figures, so the area is $${dec(tl.area / 1e3, 3)} \times 10^{3}$ cm$^2$. In units of $10^{3}$ cm$^2$: $A = ${dec(tl.area / 1e3, 3)}$.`,
  scheme: [['Multiply the two lengths', 1]],
  marks: 1, d: 2, c: 'application', t: [2],
}), (q) => near(59.6 * 29.8 / 1e3, q.answer.value, 0.01) || 'tile');
const sp = { s: 100.0, t: 11.2 };
sp.v = sp.s / sp.t;
add('speed-sf-num', num({
  stem: 'A sprinter covers 100.0 m in 11.20 s. Find her average speed with the correct number of significant figures, in m s⁻¹.',
  ...NV(sp.v, 4, 0.002), unit: 'm s⁻¹',
  sol: r`$v = \dfrac{100.0}{11.20} = ${dec(sp.v, 7)}$ m s$^{-1}$. Both data have 4 significant figures, so $v \approx ${dec(sp.v, 4)}$ m s$^{-1}$.`,
  scheme: [['Divide distance by time', 1]],
  marks: 1, d: 1, c: 'application', t: [2],
}), (q) => near(100 / 11.2, q.answer.value, 0.005) || 'speed');
const lc = { lc: 0.01, d: 0.5 };
lc.pct = (lc.lc / lc.d) * 100;
add('relerr-num', num({
  stem: 'A screw gauge has a least count of 0.01 mm. It is used to measure a wire of diameter 0.50 mm. Find the maximum percentage error in the diameter due to the least count (2 significant figures).',
  ...NV(lc.pct, 2), unit: '%',
  sol: r`The error can be as large as one least count: $\dfrac{0.01}{0.50} \times 100 = ${dec(lc.pct, 2)}\ \%$, so $\approx ${dec(lc.pct, 2)}\ \%$.`,
  scheme: [['Take Δd = least count 0.01 mm', 1]],
  marks: 1, d: 1, c: 'application', t: [2],
}), (q) => near(0.01 / 0.5 * 100, q.answer.value, 0.01) || 'relerr');

const zs = { a: '0.0207', b: '5.00', c: '4300' };
add('zeros-short', short({
  marks: 2,
  stem: 'A student must report 0.0207 mol, 5.00 g and 4300 m. State the rules she uses to decide which zeros are significant and give the number of significant figures in each value.',
  model: `Zeros before the first non-zero digit only place the decimal point, so 0.0207 has ${sfCount(zs.a)}. Zeros after a decimal point are significant, so 5.00 has ${sfCount(zs.b)}. Trailing zeros in a number without a decimal point are not significant, so 4300 has ${sfCount(zs.c)}.`,
  sol: 'Leading zeros no; zeros after a decimal point yes; trailing zeros without a decimal point no.',
  scheme: [['Rules: leading zeros no; trailing zeros after a decimal point yes; trailing zeros without a decimal point no', 1], [`Counts: ${sfCount(zs.a)}, ${sfCount(zs.b)} and ${sfCount(zs.c)}`, 1]],
  d: 2, c: 'understanding', t: [2],
}), () => sfCount(zs.a) === 3 && sfCount(zs.b) === 3 && sfCount(zs.c) === 2 || 'zeros');
add('acc-short', short({
  marks: 2,
  stem: 'A stopwatch gains 2 s every minute and is used to time a school race. Using this example, explain the difference between the accuracy and the precision of the readings.',
  model: 'Precision tells how closely repeated readings agree with each other, and accuracy tells how close they are to the true value. The fast stopwatch gives times that agree closely, so they are precise, but every time is too large by the same fraction, so the readings are not accurate. This is a systematic error.',
  sol: 'Precise but inaccurate: systematic error.',
  scheme: [['Precision: agreement among readings; accuracy: closeness to the true value', 1], ['The fast watch is precise but not accurate (systematic error)', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('rand-short', short({
  marks: 2,
  stem: 'Name one cause of random error and one cause of systematic error when a falling ball is timed by hand with a stopwatch, and state how each kind of error can be reduced.',
  model: 'Random error: the changing reaction time of the observer in starting and stopping the watch. It is reduced by taking many readings and averaging. Systematic error: a stopwatch that runs fast or slow, a constant offset. It is removed by calibrating the watch against a standard or correcting every reading.',
  sol: 'Random: reaction time, average; systematic: faulty watch, calibrate.',
  scheme: [['Random error with its cause and the averaging remedy', 1], ['Systematic error with its cause and the calibration remedy', 1]],
  d: 2, c: 'understanding', t: [2],
}));

const sc3 = { a: [7.25, 0.4, 12.088], b: [3.4, 2.5], c: [6.8, 0.032] };
sc3.sum = sc3.a.reduce((s, v) => s + v, 0);
sc3.sumR = roundDp(sc3.sum, 1);
sc3.prod = sc3.b[0] * sc3.b[1];
sc3.prodR = roundSf(sc3.prod, 2);
sc3.quo = sc3.c[0] / sc3.c[1];
sc3.quoR = roundSf(sc3.quo, 2);
const q3 = `${dec(sc3.quoR / 100, 2)} × 10²`;
add('sfcalc-short3', short({
  marks: 3,
  stem: 'Evaluate each expression and give the result with the correct number of significant figures: (a) 7.25 + 0.4 + 12.088, (b) 3.40 × 2.5, (c) 6.80 ÷ 0.032.',
  model: `(a) The sum is ${dec(sc3.sum, 5)}. The least precise number, 0.4, has one decimal place, so the result is ${dec(sc3.sumR, 3)}. (b) The product is ${dec(sc3.prod, 2)}. The factor 2.5 has two significant figures, so the result is ${dec(sc3.prodR, 2)}. (c) The quotient is ${dec(sc3.quo, 4)}. The divisor 0.032 has two significant figures, so the result is ${q3}.`,
  sol: 'Decimal places for the sum; fewest significant figures for the product and quotient.',
  scheme: [[`(a) ${dec(sc3.sumR, 3)}`, 1], [`(b) ${dec(sc3.prodR, 2)}`, 1], [`(c) ${q3}`, 1]],
  d: 2, c: 'application', t: [2],
}), () => sc3.sumR === 19.7 && sc3.prodR === 8.5 && sc3.quoR === 210 || `sc3 ${sc3.sumR} ${sc3.prodR} ${sc3.quoR}`);
const cb = { A: 2.0, dA: 0.02 };
cb.pct = 3 * (cb.dA / cb.A) * 100;
add('combo-short3', short({
  marks: 3,
  stem: 'State how the errors combine in (a) Z = A − B and (b) Z = AB/C. The edge of a cube is measured as (2.00 ± 0.02) m; use the rule for powers to find the percentage error in its volume.',
  model: `(a) In a difference the absolute errors add: ΔZ = ΔA + ΔB. (b) In a product or quotient the relative errors add: ΔZ/Z = ΔA/A + ΔB/B + ΔC/C. For the cube V = a³, so ΔV/V = 3 Δa/a = 3 × 0.02/2.00 = ${dec(cb.pct / 100, 2)}, a percentage error of ${dec(cb.pct, 2)} %.`,
  sol: 'Absolute errors for a difference; relative errors for products; power multiplies.',
  scheme: [['ΔZ = ΔA + ΔB for a difference', 1], ['Relative errors add for AB/C', 1], [`Cube: 3 × 1.0 % = ${dec(cb.pct, 2)} %`, 1]],
  d: 2, c: 'application', t: [2],
}), () => near(cb.pct, 3.0, 1e-9) || 'combo');
const nd = { a: 52.4, b: 51.8, e: 0.1 };
nd.diff = nd.a - nd.b;
nd.de = nd.e + nd.e;
nd.pct = (nd.de / nd.diff) * 100;
add('sc-short3', short({
  marks: 3,
  stem: 'The lengths of two nearly equal rods are measured as (52.4 ± 0.1) cm and (51.8 ± 0.1) cm. Find the difference with its error and its percentage error, and explain why this percentage error is so much larger than that of either rod.',
  model: `The difference is 52.4 − 51.8 = ${nd.diff.toFixed(1)} cm and the absolute errors add, so the error is 0.1 + 0.1 = ${nd.de.toFixed(1)} cm. The percentage error is 0.2/0.6 × 100 ≈ ${dec(nd.pct, 2)} %, while each rod has only about 0.2 %. The absolute errors add, but the difference itself is small, so the relative error becomes large.`,
  sol: 'Difference small, errors add.',
  scheme: [[`Difference ${nd.diff.toFixed(1)} cm with error ${nd.de.toFixed(1)} cm`, 1], [`Percentage error ≈ ${dec(nd.pct, 2)} %`, 1], ['Reason: absolute errors add while the difference is small', 1]],
  d: 4, c: 'analysis', t: [2],
}), () => near(nd.diff, 0.6, 1e-6) && near(nd.pct, 33.3, 0.01) || 'sc3');
void [sci, mean, meanAbsErr, C_LIGHT, YEAR, AU, roundDp];
