// ISC 11 ch01 Some Basic Concepts: Measurement, Laws of Chemical Combination and Atomic Theory — question bank.
// MCQ keys are placed by the builder (balanced); AR keys: a b c d c a (ar-sf, ar-const, ar-gl, ar-dalton, ar-recip, ar-cons).
// Every numerical is computed here, interpolated into the stem and solution, and re-solved by the check passed to add().
import { mk, add, r, near, dec, sci } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const mean = (a) => a.reduce((s, v) => s + v, 0) / a.length;
const ATM = 101325; // Pa per atm (stated in stems)

// ================================================================ t01 scope of chemistry, matter
add('matter-mcq', mcq({
  stem: 'A food-technology student sorts samples from a school canteen. Which of these is a heterogeneous mixture?',
  right: 'mustard oil shaken with water, photographed a minute after shaking',
  wrong: ['sugar fully dissolved in hot tea', 'filtered air from the canteen kitchen', 'a pinch of iodised salt stirred into a glass of water'],
  sol: 'Oil and water form visible separate phases, so the mixture is heterogeneous — option (@K). The other three samples are uniform throughout, which makes them homogeneous mixtures (solutions).',
  d: 1, c: 'understanding', t: [1],
}));
add('compound-mcq', mcq({
  stem: 'A white crystalline solid melts at 801 °C. Electrolysis of the molten solid gives a silvery metal at one electrode and a pale-green gas at the other, and neither product can be broken down further by chemical means. The solid is best classified as:',
  right: 'a compound, because it splits into two different elements by electrolysis',
  wrong: ['an element, because it is a pure substance', 'a homogeneous mixture, because it is uniform', 'a heterogeneous mixture, because two products form'],
  sol: 'A pure substance that can be decomposed chemically into simpler substances of fixed composition is a compound — option (@K). It is pure, but a pure substance can be an element or a compound (@1); a mixture can be separated by physical methods, not by electrolysis (@2, @3).',
  d: 2, c: 'application', t: [1],
}));
add('mixture-tf', tf({
  stem: 'A solution of ethanol in water is a compound, because its particles are uniformly distributed throughout.',
  key: 'f',
  sol: 'False. Uniform distribution only shows the mixture is homogeneous. A compound has a fixed composition by mass and cannot be separated by physical methods, whereas ethanol and water can be separated by distillation and the solution can have any composition.',
  d: 1, c: 'understanding', t: [1],
}));
add('phase-fill', fill({
  stem: 'A mixture whose composition and properties are uniform throughout, such as brass, is called a ___ mixture.',
  acc: [['homogeneous']],
  sol: 'Uniform composition throughout means a **homogeneous** mixture, as in an alloy or a solution; a heterogeneous mixture has visibly different parts.',
  d: 1, c: 'recall', t: [1],
}));
add('scope-short', short({
  marks: 2,
  stem: 'A district health officer and an agricultural extension worker both depend on chemistry. Give one specific contribution of chemistry to medicine and one to agriculture.',
  model: 'Medicine: chemists synthesise and purify drugs, for example antibiotics such as penicillin derivatives, and design vaccines and diagnostic reagents. Agriculture: chemistry provides fertilisers rich in nitrogen, phosphorus and potassium, and pesticides and soil-testing methods that raise crop yields.',
  sol: 'One specific example from each area.',
  scheme: [['Medicine: a correct specific contribution', 1], ['Agriculture: a correct specific contribution', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('matter-short3', short({
  marks: 3,
  stem: 'Classify each of the following as an element, a compound, a homogeneous mixture or a heterogeneous mixture, giving one reason: (i) the graphite of a pencil lead, (ii) baking soda (sodium hydrogencarbonate), (iii) river sand mixed with iron filings.',
  model: '(i) Graphite is an element: it consists of carbon atoms only and cannot be broken down chemically. (ii) Sodium hydrogencarbonate is a compound: it contains sodium, hydrogen, carbon and oxygen combined in a fixed mass ratio and can be decomposed chemically. (iii) Sand with iron filings is a heterogeneous mixture: the two solids are visible as separate parts and a magnet separates the iron.',
  sol: 'Element, compound, heterogeneous mixture, each with a reason.',
  scheme: [['(i) element with reason', 1], ['(ii) compound with reason', 1], ['(iii) heterogeneous mixture with reason', 1]],
  d: 2, c: 'application', t: [1],
}));

// ================================================================ t02 precision, accuracy, significant figures, SI
add('prec-chk', (() => {
  const X = [20.31, 20.30, 20.32];
  const Y = [20.0, 19.99, 20.01];
  const Z = [19.6, 20.5, 20.0];
  return mcq({
    stem: `Three trainee analysts each weigh a certified 20.000 g standard mass three times. Trainee X records ${X.join(', ')} g, trainee Y records ${Y.map((v) => v.toFixed(2)).join(', ')} g and trainee Z records ${Z.map((v) => v.toFixed(1)).join(', ')} g. Which statement is correct?`,
    right: 'Only Y is both precise and accurate.',
    wrong: ['X is both precise and accurate.', 'Z is precise but not accurate.', 'X is accurate but not precise.'],
    sol: `X: readings agree closely (precise) but the mean ${dec(mean(X), 4)} g is about 0.31 g too high (not accurate). Y: readings within 0.02 g of each other and a mean of ${dec(mean(Y), 4)} g (precise and accurate). Z: readings spread over 0.9 g (not precise), although the mean ${dec(mean(Z), 4)} g is near the true value. Only Y is both — option (@K).`,
    d: 2, c: 'application', t: [2],
  });
})(), () => near(mean([20.31, 20.3, 20.32]), 20.31, 0.001) && near(mean([20.0, 19.99, 20.01]), 20.0, 0.001) && near(mean([19.6, 20.5, 20.0]), 20.033, 0.001) || 'means');
add('sf-chk', (() => {
  const m = 21.35;
  const v = '25.0'; // shown with its trailing zero (three significant figures)
  const rho = m / Number(v);
  return mcq({
    stem: `The mass of a liquid sample is measured as ${m} g and its volume as ${v} mL. The density should be reported, in g mL⁻¹, as:`,
    right: '0.854',
    wrong: ['0.8540', '0.85', '0.9'],
    sol: r`Division keeps the fewest significant figures. The mass has four, the volume three, so the density has three: $${m} / ${v} = ${rho.toFixed(4)} \approx 0.854$ g mL⁻¹ — option (@K). (@1) keeps four figures, (@2) two and (@3) one.`,
    d: 2, c: 'application', t: [2],
  });
})(), () => near(21.35 / 25.0, 0.854, 0.001) || 'density');
add('sfcount-mcq', mcq({
  stem: r`The numbers of significant figures in $3.040$, $0.00205$ and $5.0 \times 10^{-4}$ are, respectively:`,
  right: '4, 3 and 2',
  wrong: ['3, 3 and 2', '4, 5 and 2', '4, 3 and 1'],
  sol: r`$3.040$: the zero after the decimal point is significant, so 4. $0.00205$: leading zeros are not significant but the zero between 2 and 5 is, so 3. $5.0 \times 10^{-4}$: both digits of the coefficient count, so 2 — option (@K). (@1) drops the trailing zero, (@2) counts leading zeros, (@3) ignores the trailing zero of 5.0.`,
  d: 2, c: 'understanding', t: [2],
}));
add('si-mcq', mcq({
  stem: 'A student lists the SI base units as metre, kilogram, second, ampere, kelvin, mole, candela and litre. The unit wrongly included is:',
  right: 'litre',
  wrong: ['kelvin', 'mole', 'ampere'],
  sol: 'The litre (1 dm³) is a derived, non-SI unit of volume; the SI unit of volume is the cubic metre, built from the base unit metre. Kelvin, mole and ampere are base units — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('mean-mcq', (() => {
  const trueC = 0.1;
  const exp = 0.1024;
  const err = (Math.abs(exp - trueC) / trueC) * 100;
  return mcq({
    stem: `A standard sodium hydroxide solution is known to be ${trueC.toFixed(4)} M. A student's titrations give a mean value of ${exp.toFixed(4)} M. The percentage error of the student's result is:`,
    right: r`$2.4\ \%$`,
    wrong: [r`$0.024\ \%$`, r`$2.3\ \%$`, r`$24\ \%$`],
    sol: r`Percentage error $= \dfrac{|\text{measured} - \text{true}|}{\text{true}} \times 100 = \dfrac{${exp.toFixed(4)} - ${trueC.toFixed(4)}}{${trueC.toFixed(4)}} \times 100 \approx ${dec(err, 2)}\ \%$ — option (@K). (@2) divides by the measured value instead of the true value.`,
    d: 2, c: 'understanding', t: [2],
  });
})(), () => near(((0.1024 - 0.1) / 0.1) * 100, 2.4, 0.001) || 'error');
add('sci-mcq', mcq({
  stem: r`A virus particle has a diameter of $0.000000085\ \text{m}$. In scientific notation this is:`,
  right: r`$8.5 \times 10^{-8}\ \text{m}$`,
  wrong: [r`$8.5 \times 10^{-7}\ \text{m}$`, r`$8.5 \times 10^{-9}\ \text{m}$`, r`$8.5 \times 10^{8}\ \text{m}$`],
  sol: r`The decimal point moves 8 places to the right to give 8.5, so the power is $-8$: $8.5 \times 10^{-8}$ m — option (@K).`,
  d: 1, c: 'understanding', t: [2],
}));
add('ar-sf', ar({
  a: r`The product $2.0 \times 3.456$ is reported as $6.9$.`,
  r: 'In multiplication the result carries the same number of significant figures as the factor that has the fewest.',
  key: 'a',
  sol: r`$2.0 \times 3.456 = 6.912$. The factor 2.0 has two significant figures, so the result is rounded to $6.9$ — A is true. R states exactly the rule used, so R is the correct explanation — option (a).`,
  d: 1, c: 'understanding', t: [2],
}), () => near(2.0 * 3.456, 6.912, 1e-6) || 'product');
add('ar-const', ar({
  a: 'Pure water distilled from river water and pure water collected from burning hydrogen in air both contain 11.1 % hydrogen by mass.',
  r: r`Hydrogen and oxygen form two compounds, $\ce{H2O}$ and $\ce{H2O2}$.`,
  key: 'b',
  sol: 'A is true: pure water has a fixed composition (2 × 1 / 18 = 11.1 % hydrogen). R is also true. But the existence of a second compound does not explain why every sample of water has the same composition; the explanation is the law of definite proportions — option (b).',
  d: 2, c: 'analysis', t: [4],
}));
add('pcterr-num', (() => {
  const lit = 0.789;
  const got = 0.812;
  const e = (Math.abs(got - lit) / lit) * 100;
  return num({
    stem: `A student measures the density of ethanol as ${got} g cm⁻³ at a temperature where the accepted value is ${lit} g cm⁻³. Find the percentage error, to two significant figures.`,
    value: Number(e.toPrecision(2)), tol: 0.1, unit: '%',
    sol: r`$\text{error} = \dfrac{|${got} - ${lit}|}{${lit}} \times 100 = ${e.toFixed(2)} \approx ${dec(e, 2)}\ \%$.`,
    scheme: [['Absolute error 0.023 divided by the accepted value', 1], ['Multiplies by 100 and rounds: 2.9 %', 1]],
    marks: 2, d: 2, c: 'application', t: [2],
  });
})(), (q) => near((Math.abs(0.812 - 0.789) / 0.789) * 100, 2.915, 0.001) && q.answer.value === 2.9 || 'pct error');
add('sfadd-short', (() => {
  const a = 14.236;
  const b = 8.5;
  const c = 0.0612;
  const s = a + b + c;
  return short({
    marks: 2,
    stem: `A chemist mixes three solids of masses ${a} g, ${b} g and ${c} g. Report the total mass with the correct number of significant figures and state the rule you applied.`,
    model: r`The sum is $${a} + ${b} + ${c} = ${s.toFixed(4)}$ g. In addition the result is given to the same number of decimal places as the term with the fewest decimal places; 8.5 g has one, so the total is **${dec(s, 3)} g**.`,
    sol: 'Add, then round to one decimal place.',
    scheme: [['Sum 22.7972 g', 1], ['Rounded to 22.8 g with the decimal-place rule stated', 1]],
    d: 2, c: 'application', t: [2],
  });
})(), () => near(14.236 + 8.5 + 0.0612, 22.7972, 1e-6) || 'sum');
add('prec-short', short({
  marks: 2,
  stem: 'A jeweller weighs a 50.00 g test weight three times and records 50.42 g, 50.41 g and 50.43 g. Comment on the precision and accuracy of the balance and suggest the likely kind of error.',
  model: 'The readings agree within 0.02 g, so the balance is precise. Their mean, 50.42 g, is 0.42 g above the true 50.00 g, so it is not accurate. A steady offset of this kind points to a systematic error, such as a zero error or poor calibration of the balance.',
  sol: 'Close agreement shows precision; the offset from the true value shows lack of accuracy.',
  scheme: [['Precise: readings agree closely', 1], ['Not accurate, with a systematic error suggested', 1]],
  d: 2, c: 'application', t: [2],
}));
add('sfcalc-short3', (() => {
  const a = (6.25 * 0.032) / 4.1;
  const b = 125.5 - 23.74 + 0.065;
  return short({
    marks: 3,
    stem: r`Evaluate each expression and report the result to the correct number of significant figures: (i) $\dfrac{6.25 \times 0.0320}{4.1}$ (ii) $125.5 - 23.74 + 0.065$ (iii) Write the answer to (i) in scientific notation.`,
    model: r`(i) $6.25 \times 0.0320 = 0.2000$ and $0.2000 / 4.1 = ${a.toFixed(4)}$; the least precise factor, 4.1, has two significant figures, so the answer is **0.049**. (ii) The sum is $${b.toFixed(3)}$; 125.5 has one decimal place, so the answer is **${dec(b, 4)}**. (iii) $0.049 = 4.9 \times 10^{-2}$.`,
    sol: 'Fewest significant figures for the quotient; fewest decimal places for the sum.',
    scheme: [['(i) 0.049 with the rule', 1], ['(ii) 101.8 with the decimal-place rule', 1], ['(iii) 4.9 × 10⁻²', 1]],
    d: 2, c: 'application', t: [2],
  });
})(), () => near((6.25 * 0.032) / 4.1, 0.04878, 0.001) && near(125.5 - 23.74 + 0.065, 101.825, 1e-6) || 'sfcalc');
add('error-short3', (() => {
  const d = [10.12, 10.15, 10.11, 10.14, 10.13];
  const m = mean(d);
  const abs = Math.abs(m - 10.0);
  return short({
    marks: 3,
    stem: `A school laboratory weighs a 10.00 g standard five times and records ${d.join(', ')} g. Calculate the mean reading, the absolute error of the mean and the percentage error, and state whether the balance is precise and accurate.`,
    model: r`Mean $= (${d.join(' + ')}) / 5 = ${m.toFixed(2)}$ g. Absolute error $= ${m.toFixed(2)} - 10.00 = ${abs.toFixed(2)}$ g. Percentage error $= ${abs.toFixed(2)} / 10.00 \times 100 = ${(abs * 10).toFixed(1)}\ \%$. The readings agree within 0.04 g, so the balance is precise, but the mean is 0.13 g above the true value, so it is not accurate.`,
    sol: 'Mean, error, percentage error, comment.',
    scheme: [['Mean 10.13 g', 1], ['Absolute error 0.13 g and percentage error 1.3 %', 1], ['Precise but not accurate', 1]],
    d: 2, c: 'application', t: [2],
  });
})(), () => near(mean([10.12, 10.15, 10.11, 10.14, 10.13]), 10.13, 1e-6) || 'mean');
add('sf-long', (() => {
  const P = [8.91, 8.93, 8.92];
  const Q = [9.3, 8.4, 8.95];
  return long({
    stem: `(a) Distinguish between precision and accuracy. [2]\n\n(b) Two students measure the density of a copper block, whose accepted value is 8.96 g cm⁻³. Student P records ${P.join(', ')} g cm⁻³ and student Q records ${Q.map((v) => v.toFixed(2)).join(', ')} g cm⁻³. Find each mean to three significant figures and state which student's work is more precise and which mean is closer to the accepted value. [3]`,
    model: r`(a) Precision is the closeness of repeated measurements to one another; accuracy is the closeness of a measurement, or of the mean, to the true or accepted value. (b) Mean of P $= (${P.join(' + ')}) / 3 = ${mean(P).toFixed(2)}$ g cm⁻³; mean of Q $= (${Q.join(' + ')}) / 3 \approx ${dec(mean(Q), 3)}$ g cm⁻³. P's readings span 0.02 g cm⁻³ and Q's span 0.90 g cm⁻³, so P is far more precise. P's mean differs from 8.96 by 0.04 and Q's by 0.08, so P's mean is also closer to the accepted value.`,
    sol: 'Definitions; two means; spread and distance from the accepted value.',
    scheme: [['(a) Precision defined', 1], ['(a) Accuracy defined', 1], ['(b) Both means correct', 1], ['(b) P is more precise (spread comparison)', 1], ['(b) P mean closer to 8.96', 1]],
    d: 3, c: 'application', t: [2],
  });
})(), () => near(mean([8.91, 8.93, 8.92]), 8.92, 0.001) && near(mean([9.3, 8.4, 8.95]), 8.883, 0.001) || 'means');
add('si-match', match({
  stem: 'Match each quantity with its unit expressed in SI base units.',
  pairs: [
    ['Force (newton)', r`$\text{kg m s}^{-2}$`],
    ['Energy (joule)', r`$\text{kg m}^{2}\text{ s}^{-2}$`],
    ['Pressure (pascal)', r`$\text{kg m}^{-1}\text{ s}^{-2}$`],
    ['Density', r`$\text{kg m}^{-3}$`],
  ],
  order: [2, 0, 3, 1],
  sol: r`Newton $= \text{kg m s}^{-2}$ (mass × acceleration); joule $= \text{N m} = \text{kg m}^2\text{ s}^{-2}$; pascal $= \text{N m}^{-2} = \text{kg m}^{-1}\text{ s}^{-2}$; density is mass per volume, $\text{kg m}^{-3}$.`,
  d: 2, c: 'understanding', t: [2],
}));

// ================================================================ t03 dimensional analysis
add('dim-chk', (() => {
  const P = 2.0e6;
  const atm = P / 1.013e5;
  return mcq({
    stem: `The pressure gauge of a gas cylinder reads $${sci(P, 2)}$ Pa. Taking 1 atm = $1.013 \\times 10^{5}$ Pa, the pressure in atmospheres is about:`,
    right: '20 atm',
    wrong: ['2.0 atm', '0.051 atm', r`$2.0 \times 10^{11}$ atm`],
    sol: r`The conversion factor is $\dfrac{1\ \text{atm}}{1.013 \times 10^{5}\ \text{Pa}}$, so the pressure is $${sci(P, 2)} \times \dfrac{1}{1.013 \times 10^{5}} \approx ${dec(atm, 2)}$ atm — option (@K). (@1) is off by a factor of ten; (@2) uses the conversion factor upside down, and (@3) multiplies instead of dividing.`,
    d: 2, c: 'application', t: [3],
  });
})(), () => near(2.0e6 / 1.013e5, 19.74, 0.001) || 'atm');
add('vol-mcq', mcq({
  stem: 'A hospital drip bag holds 500 mL of saline. Its volume in m³ is:',
  right: r`$5.00 \times 10^{-4}\ \text{m}^3$`,
  wrong: [r`$5.00 \times 10^{-6}\ \text{m}^3$`, r`$5.00 \times 10^{-3}\ \text{m}^3$`, r`$5.00 \times 10^{2}\ \text{m}^3$`],
  sol: r`$1\ \text{mL} = 1\ \text{cm}^3 = 10^{-6}\ \text{m}^3$, so $500 \times 10^{-6} = 5.00 \times 10^{-4}\ \text{m}^3$ — option (@K). (@1) uses $10^{-9}$ per millilitre by mistake, and (@2) treats the bag as 5 litres.`,
  d: 2, c: 'understanding', t: [3],
}), () => near(500e-6, 5e-4, 1e-9) || 'vol');
add('press-mcq', (() => {
  const p = 2.2;
  const pa = p * ATM;
  return mcq({
    stem: `A bicycle tyre is inflated to ${p.toFixed(2)} atm. With 1 atm = ${ATM} Pa, the pressure in pascal, to three significant figures, is:`,
    right: r`$2.23 \times 10^{5}\ \text{Pa}$`,
    wrong: [r`$2.20 \times 10^{5}\ \text{Pa}$`, r`$2.23 \times 10^{3}\ \text{Pa}$`, r`$2.17 \times 10^{-5}\ \text{Pa}$`],
    sol: r`$${p.toFixed(2)} \times ${ATM} = ${pa.toFixed(0)} \approx 2.23 \times 10^{5}\ \text{Pa}$ — option (@K). (@1) rounds the factor to $10^{5}$ and loses accuracy; (@2) and (@3) misplace the power of ten.`,
    d: 2, c: 'understanding', t: [3],
  });
})(), () => near(2.2 * ATM, 222915, 1e-6) || 'Pa');
add('homog-mcq', mcq({
  stem: r`In SI base units, pressure is $\text{kg m}^{-1}\text{ s}^{-2}$ and volume is $\text{m}^{3}$. The product $PV$ therefore has the same dimensions as:`,
  right: 'energy (work)',
  wrong: ['force', 'momentum', 'power'],
  sol: r`$PV$ has units $\text{kg m}^{-1}\text{ s}^{-2} \times \text{m}^{3} = \text{kg m}^{2}\text{ s}^{-2}$, which is the joule, the unit of energy — option (@K). Force is $\text{kg m s}^{-2}$, momentum $\text{kg m s}^{-1}$ and power $\text{kg m}^{2}\text{ s}^{-3}$.`,
  d: 3, c: 'analysis', t: [3],
}));
add('dim-mcq2', (() => {
  const kmh = 54;
  const ms = (kmh * 1000) / 3600;
  return mcq({
    stem: `A goods train on a straight track moves at ${kmh} km h⁻¹. Its speed in m s⁻¹ is:`,
    right: r`$15\ \text{m s}^{-1}$`,
    wrong: [r`$194\ \text{m s}^{-1}$`, r`$0.90\ \text{m s}^{-1}$`, r`$5.4 \times 10^{4}\ \text{m s}^{-1}$`],
    sol: r`$${kmh}\ \dfrac{\text{km}}{\text{h}} \times \dfrac{1000\ \text{m}}{1\ \text{km}} \times \dfrac{1\ \text{h}}{3600\ \text{s}} = ${ms}\ \text{m s}^{-1}$ — option (@K). (@1) multiplies by 3.6 instead of dividing, and (@2) divides by 60 only.`,
    d: 2, c: 'understanding', t: [3],
  });
})(), () => near((54 * 1000) / 3600, 15, 1e-9) || 'speed');
add('conv-tf', tf({
  stem: 'A conversion factor such as 1 dm / 10 cm is equal to one, so multiplying by it changes the unit but not the size of the quantity.',
  key: 't',
  sol: 'True. The numerator and denominator are the same length expressed in different units, so the factor equals 1 and the physical quantity is unchanged.',
  d: 1, c: 'understanding', t: [3],
}));
add('atm-fill', fill({
  stem: 'One standard atmosphere is equal to ___ Pa (to four significant figures, in the form a × 10⁵).',
  acc: [['1.013 × 10⁵', '1.013 x 10^5', '1.013e5', '101300', '101325', '1.01325 × 10⁵']],
  sol: 'By definition 1 atm = 101325 Pa, which is 1.013 × 10⁵ Pa to four significant figures.',
  d: 1, c: 'recall', t: [3],
}));
add('pa-num', (() => {
  const atm = 3.5;
  const kpa = (atm * ATM) / 1000;
  return num({
    stem: `A diver's gauge reads ${atm.toFixed(2)} atm. Using 1 atm = ${ATM} Pa, find the pressure in kPa, to three significant figures.`,
    value: Number(kpa.toPrecision(3)), tol: 1, unit: 'kPa',
    sol: r`$${atm.toFixed(2)} \times ${ATM}\ \text{Pa} = ${(atm * ATM).toFixed(0)}\ \text{Pa}$, and dividing by 1000 gives $${kpa.toFixed(1)}$ kPa $\approx 355$ kPa.`,
    scheme: [['Converts atm to Pa (3.5 × 101325)', 1], ['Divides by 1000: 355 kPa', 1]], marks: 2, d: 2, c: 'understanding', t: [3],
  });
})(), (q) => near(3.5 * ATM / 1000, 354.6, 0.001) && q.answer.value === 355 || 'kPa');
add('dim-short', (() => {
  const nm = 0.142;
  const m = nm * 1e-9;
  const pm = nm * 1000;
  return short({
    marks: 2,
    stem: `The carbon–carbon bond length in graphite is ${nm} nm. Express it (i) in metres and (ii) in picometres.`,
    model: r`(i) $1\ \text{nm} = 10^{-9}\ \text{m}$, so $${nm} \times 10^{-9} = ${sci(m, 3)}\ \text{m}$. (ii) $1\ \text{pm} = 10^{-12}\ \text{m}$, so the length is $${nm} \times 10^{3} = ${pm.toFixed(0)}\ \text{pm}$.`,
    sol: 'Use 1 nm = 10⁻⁹ m and 1 pm = 10⁻¹² m.',
    scheme: [['(i) 1.42 × 10⁻¹⁰ m', 1], ['(ii) 142 pm', 1]],
    d: 1, c: 'understanding', t: [3],
  });
})(), () => near(0.142e-9, 1.42e-10, 1e-9) && near(0.142 * 1000, 142, 1e-9) || 'length');
add('conv-short3', (() => {
  const cm3 = 149;
  const dm3 = cm3 / 1000;
  const m3 = cm3 * 1e-6;
  const lmin = 2.4;
  const flow = (lmin * 1e-3) / 60;
  return short({
    marks: 3,
    stem: `The engine of a scooter has a displacement of ${cm3} cm³. A cooling pump delivers water at ${lmin} L min⁻¹. Express (i) the displacement in dm³, (ii) the displacement in m³, and (iii) the flow rate in m³ s⁻¹.`,
    model: r`(i) $1\ \text{dm}^3 = 10^{3}\ \text{cm}^3$, so $${cm3} / 1000 = ${dm3}\ \text{dm}^3$. (ii) $1\ \text{cm}^3 = 10^{-6}\ \text{m}^3$, so $${cm3} \times 10^{-6} = ${sci(m3, 3)}\ \text{m}^3$. (iii) $${lmin}\ \text{L min}^{-1} = ${lmin} \times 10^{-3}\ \text{m}^3 / 60\ \text{s} = ${sci(flow, 2)}\ \text{m}^3\text{ s}^{-1}$.`,
    sol: 'Each conversion by a factor equal to one.',
    scheme: [['(i) 0.149 dm³', 1], ['(ii) 1.49 × 10⁻⁴ m³', 1], ['(iii) 4.0 × 10⁻⁵ m³ s⁻¹', 1]],
    d: 2, c: 'application', t: [3],
  });
})(), () => near(149e-6, 1.49e-4, 1e-9) && near((2.4e-3) / 60, 4.0e-5, 1e-9) || 'conversions');
add('dens-short3', (() => {
  const rho = 13.6;
  const kgm3 = rho * 1000;
  const V = 250;
  const kg = (rho * V) / 1000;
  return short({
    marks: 3,
    stem: `The density of mercury is ${rho} g cm⁻³. Convert it to kg m⁻³ and find the mass, in kilograms, of ${V} mL of mercury filled in a barometer reservoir.`,
    model: r`$${rho}\ \dfrac{\text{g}}{\text{cm}^3} \times \dfrac{1\ \text{kg}}{10^{3}\ \text{g}} \times \dfrac{10^{6}\ \text{cm}^3}{1\ \text{m}^3} = ${sci(kgm3, 3)}\ \text{kg m}^{-3}$. Mass $= ${rho} \times ${V} = ${rho * V}$ g $= ${kg.toFixed(2)}$ kg.`,
    sol: 'Two conversion factors for the density; then mass = density × volume.',
    scheme: [['Conversion factors set up', 1], ['1.36 × 10⁴ kg m⁻³', 1], ['3.40 kg', 1]],
    d: 2, c: 'application', t: [3],
  });
})(), () => near(13.6 * 1000, 13600, 1e-9) && near((13.6 * 250) / 1000, 3.4, 1e-9) || 'density');
add('dim-long', (() => {
  const R1 = 0.0821;
  const R2 = R1 * 1e-3 * ATM;
  return long({
    stem: `(a) The gas constant is $R = ${R1}\\ \\text{L atm K}^{-1}\\text{ mol}^{-1}$. Using 1 L = $10^{-3}\\ \\text{m}^3$ and 1 atm = ${ATM} Pa, express $R$ in J K⁻¹ mol⁻¹. [3]\n\n(b) Show by dimensional analysis that the litre-atmosphere is a unit of energy. [2]`,
    model: r`(a) $R = ${R1} \times 10^{-3}\ \text{m}^3 \times ${ATM}\ \text{Pa}\ \text{K}^{-1}\text{ mol}^{-1} = ${R2.toFixed(3)}$, that is $R \approx ${dec(R2, 3)}\ \text{J K}^{-1}\text{ mol}^{-1}$, because $1\ \text{Pa m}^3 = 1\ \text{J}$. (b) $1\ \text{L atm} = 10^{-3}\ \text{m}^3 \times 101325\ \text{N m}^{-2} = 101.3\ \text{N m} = 101.3\ \text{J}$; pressure × volume has the dimensions of force × length, which is work or energy.`,
    sol: 'Convert L to m³ and atm to Pa; then Pa m³ = N m = J.',
    scheme: [['(a) Both conversion factors used', 1], ['(a) Value 8.32 (three significant figures)', 1], ['(a) Unit Pa m³ = J', 1], ['(b) 1 L atm in SI units, about 101.3 J', 1], ['(b) Pressure × volume has dimensions of force × length', 1]],
    d: 3, c: 'application', t: [3],
  });
})(), () => near(0.0821 * 1e-3 * ATM, 8.319, 0.001) || 'R');

// ================================================================ t04 laws of chemical combination
add('cons-chk', (() => {
  const a = 20.8;
  const b = 14.2;
  const p = 23.3;
  const x = a + b - p;
  return mcq({
    stem: `In a sealed flask, ${a} g of barium chloride and ${b} g of sodium sulfate, both in solution, are mixed. ${p} g of barium sulfate precipitates and the only other product is dissolved sodium chloride. The mass of sodium chloride formed is:`,
    right: `${x.toFixed(1)} g`,
    wrong: [`${(a + b).toFixed(1)} g`, `${p.toFixed(1)} g`, `${(a + b + p).toFixed(1)} g`],
    sol: r`In a sealed flask nothing escapes, so mass of products equals mass of reactants: $${a} + ${b} = ${(a + b).toFixed(1)}$ g. Sodium chloride $= ${(a + b).toFixed(1)} - ${p} = ${x.toFixed(1)}$ g — option (@K). (@1) is the total mass of reactants, and (@3) adds the precipitate to it.`,
    d: 2, c: 'application', t: [4],
  });
})(), () => near(20.8 + 14.2 - 23.3, 11.7, 1e-6) || 'mass');
add('mass-mcq', (() => {
  const mg = 2.4;
  const ash = 3.98;
  return mcq({
    stem: `A student burns ${mg} g of magnesium ribbon in an open crucible and finds the white ash weighs ${ash} g, which is more than the metal she started with. Which statement explains this correctly?`,
    right: 'The ash contains oxygen taken from the air; mass of magnesium plus mass of oxygen used equals the mass of ash.',
    wrong: ['The law of conservation of mass does not hold for reactions in open vessels.', 'Magnesium atoms become heavier when heated.', 'Part of the magnesium was converted into oxygen.'],
    sol: r`Oxygen from the air combines with the metal, so the ash weighs more: the oxygen taken up is $${ash} - ${mg} = ${(ash - mg).toFixed(2)}$ g. Counting the air that took part, mass is conserved — option (@K). (@1) is wrong because the law always holds when every substance is counted; (@2) and (@3) contradict Dalton's idea that atoms keep their identity.`,
    d: 2, c: 'analysis', t: [4],
  });
})(), () => near(3.98 - 2.4, 1.58, 1e-6) || 'oxygen');
add('const-mcq', (() => {
  const A = { zn: 4.01, tot: 5.0 };
  const B = { zn: 6.44, tot: 8.03 };
  const fa = A.zn / A.tot;
  const fb = B.zn / B.tot;
  return mcq({
    stem: `Zinc oxide prepared by roasting zinc carbonate contains ${A.zn} g of zinc in a ${A.tot.toFixed(2)} g sample. Zinc oxide made by burning zinc metal contains ${B.zn} g of zinc in a ${B.tot} g sample. These data support the law of:`,
    right: 'definite (constant) proportions',
    wrong: ['multiple proportions', 'reciprocal proportions', 'conservation of mass'],
    sol: r`Zinc fraction in the first sample $= ${A.zn} / ${A.tot.toFixed(2)} = ${fa.toFixed(3)}$; in the second $= ${B.zn} / ${B.tot} = ${fb.toFixed(3)}$. The same compound from two sources has the same composition — option (@K). Multiple and reciprocal proportions (@1, @2) need different compounds.`,
    d: 2, c: 'application', t: [4],
  });
})(), () => near(4.01 / 5.0, 6.44 / 8.03, 0.005) || 'fractions');
add('const-short', (() => {
  const A = { pb: 4.78, s: 0.64 };
  const B = { pb: 11.95, s: 1.6 };
  const ra = A.s / A.pb;
  const rb = B.s / B.pb;
  return short({
    marks: 2,
    stem: `A 4.78 g sample of lead sulfide made in a laboratory contains ${A.s} g of sulfur. A 11.95 g sample of the mineral galena contains ${B.s} g of sulfur. Do the data agree with the law of definite proportions?`,
    model: r`Sulfur per gram of sample: $${A.s} / ${A.pb} = ${ra.toFixed(4)}$ and $${B.s} / ${B.pb} = ${rb.toFixed(4)}$. The two values agree (13.4 % sulfur in each), so lead sulfide from both sources has the same composition by mass and the law of definite proportions is obeyed.`,
    sol: 'Compare the sulfur fractions of the two samples.',
    scheme: [['Both sulfur fractions calculated', 1], ['Equal fractions, so the law is obeyed', 1]],
    d: 2, c: 'application', t: [4],
  });
})(), () => near(0.64 / 4.78, 1.6 / 11.95, 0.005) || 'fraction');
add('cons-short', (() => {
  const a = 2.65;
  const b = 4.2;
  const gas = 1.1;
  const rem = a + b - gas;
  return short({
    marks: 2,
    stem: `In an open beaker, ${a} g of anhydrous sodium carbonate is stirred with ${b} g of dilute hydrochloric acid. Carbon dioxide escapes and the beaker with its contents is found to have lost ${gas} g. What mass of material is left in the beaker? Which law is illustrated?`,
    model: r`Total mass before $= ${a} + ${b} = ${(a + b).toFixed(2)}$ g. The mass after must be the same once the escaped gas is counted, so the beaker holds $${(a + b).toFixed(2)} - ${gas} = ${rem.toFixed(2)}$ g. This illustrates the law of conservation of mass: the escaped carbon dioxide accounts for the apparent loss.`,
    sol: 'Mass before minus mass of escaped gas.',
    scheme: [['5.75 g remaining', 1], ['Law of conservation of mass', 1]],
    d: 2, c: 'application', t: [4],
  });
})(), () => near(2.65 + 4.2 - 1.1, 5.75, 1e-6) || 'mass');
add('mult-mcq', (() => {
  const c1 = 3.44;
  const c2 = 5.73;
  const ratio = c1 / c2;
  return mcq({
    stem: `Phosphorus forms two chlorides. In the first, 1.00 g of phosphorus combines with ${c1} g of chlorine; in the second, 1.00 g of phosphorus combines with ${c2} g. The ratio of the masses of chlorine that combine with a fixed mass of phosphorus is:`,
    right: '3 : 5',
    wrong: ['2 : 3', '1 : 2', '3 : 4'],
    sol: r`$${c1} : ${c2} = 1 : ${(c2 / c1).toFixed(2)}$, and $${ratio.toFixed(2)} \approx 3/5$, so the ratio is $3 : 5$ — option (@K), as expected for $\ce{PCl3}$ and $\ce{PCl5}$. This is the law of multiple proportions.`,
    d: 2, c: 'application', t: [4],
  });
})(), () => near(3.44 / 5.73, 0.6, 0.01) || 'ratio');
add('mult-short3', (() => {
  const x = 77.7;
  const y = 70.0;
  const ox = (100 - x) / x;
  const oy = (100 - y) / y;
  return short({
    marks: 3,
    stem: `A steel-plant chemist analyses two oxides of iron. Oxide X contains ${x} % iron by mass and oxide Y contains ${y.toFixed(1)} % iron. (i) Find the mass of oxygen combined with 1.00 g of iron in each oxide. (ii) Show that the two masses are in a simple ratio. (iii) Name and state the law illustrated.`,
    model: r`(i) Oxide X: $(100 - ${x}) / ${x} = ${ox.toFixed(3)}$ g oxygen per gram of iron; oxide Y: $(100 - ${y.toFixed(1)}) / ${y.toFixed(1)} = ${oy.toFixed(3)}$ g. (ii) $${ox.toFixed(3)} : ${oy.toFixed(3)} = 2 : 3$ (the ratio is ${(ox / oy).toFixed(2)}). (iii) This is the law of multiple proportions: when two elements form more than one compound, the masses of one element that combine with a fixed mass of the other are in a simple whole-number ratio.`,
    sol: 'Oxygen per gram of iron; the ratio 2 : 3; statement of the law.',
    scheme: [['(i) 0.287 g and 0.429 g', 1], ['(ii) Ratio 2 : 3', 1], ['(iii) Law named and stated', 1]],
    d: 3, c: 'application', t: [4],
  });
})(), () => near((100 - 77.7) / 77.7 / ((100 - 70) / 70), 2 / 3, 0.01) || 'ratio');
add('match-laws', match({
  stem: 'A teacher lists four laboratory records on the board. Pair every law on the left with the record that demonstrates it.',
  pairs: [
    ['Law of conservation of mass', 'A sealed flask weighs 85.20 g before and after a precipitation reaction inside it'],
    ['Law of definite proportions', 'Pure water from any source gives 8.0 g of oxygen for every 1.0 g of hydrogen'],
    ['Law of multiple proportions', 'Copper forms two chlorides in which 1.00 g of copper combines with 0.559 g and 1.118 g of chlorine'],
    ['Gay-Lussac’s law', '60 mL of hydrogen reacts with 20 mL of nitrogen to give 40 mL of ammonia at the same temperature and pressure'],
  ],
  order: [1, 2, 0, 3],
  sol: r`Equal mass before and after is conservation; the same composition in two sources is definite proportions; $0.559 : 1.118 = 1 : 2$ is multiple proportions; $60 : 20 : 40 = 3 : 1 : 2$ is a simple volume ratio, Gay-Lussac's law.`,
  d: 2, c: 'understanding', t: [4],
}));
add('law-fill', fill({
  stem: 'Proust’s law states that a pure compound always contains the same elements combined in the same mass ratio; it is called the law of ___ proportions.',
  acc: [['definite', 'constant', 'fixed']],
  sol: 'The law of **definite** (constant) proportions.',
  d: 1, c: 'recall', t: [4],
}));
add('laws-long', (() => {
  const cuCl = 35.5 / 63.5;
  const cuCl2 = 71 / 63.5;
  return long({
    stem: `(a) State the law of multiple proportions. [1]\n\n(b) Copper forms two chlorides. In one, 6.35 g of copper is combined with 3.55 g of chlorine; in the other, 6.35 g of copper is combined with 7.10 g of chlorine. Calculate the mass of chlorine combined with 1.00 g of copper in each, and show that the data obey the law. [2]\n\n(c) A 4.78 g sample of lead sulfide made in a laboratory contains 0.64 g of sulfur and a 11.95 g sample of galena contains 1.60 g of sulfur. Which law do these data illustrate? Show your working. [2]`,
    model: r`(a) When two elements combine to form more than one compound, the masses of one element that combine with a fixed mass of the other are in a simple whole-number ratio. (b) First chloride: $3.55 / 6.35 = ${cuCl.toFixed(3)}$ g Cl per gram of Cu; second: $7.10 / 6.35 = ${cuCl2.toFixed(3)}$ g. The ratio $${cuCl.toFixed(3)} : ${cuCl2.toFixed(3)} = 1 : 2$, a simple whole-number ratio, so the law is obeyed. (c) Sulfur fractions: $0.64 / 4.78 = 0.134$ and $1.60 / 11.95 = 0.134$. The same compound has the same composition from both sources: the law of definite proportions.`,
    sol: 'Statement; two ratios and 1 : 2; equal fractions for lead sulfide.',
    scheme: [['(a) Law stated', 1], ['(b) 0.559 g and 1.118 g per gram of Cu', 1], ['(b) Ratio 1 : 2 and conclusion', 1], ['(c) Both sulfur fractions 0.134', 1], ['(c) Law of definite proportions named', 1]],
    d: 3, c: 'application', t: [4],
  });
})(), () => near(3.55 / 6.35 * 2, 7.1 / 6.35, 1e-6) && near(0.64 / 4.78, 1.6 / 11.95, 0.005) || 'laws');
add('ar-cons', ar({
  a: 'When a candle burns in a sealed bottle, the total mass of the bottle and its contents does not change.',
  r: 'Atoms are rearranged during a chemical reaction; they are neither created nor destroyed.',
  key: 'a',
  sol: 'A is true because nothing enters or leaves the sealed bottle (law of conservation of mass). R is true and is exactly the reason: the same atoms are present before and after, only rearranged — option (a).',
  d: 1, c: 'understanding', t: [4],
}));
add('recip-chk', (() => {
  const H = 3.0;
  const N = 14.0;
  const O = 24.0;
  const ND = 14.0;
  const OD = 24.0;
  return mcq({
    stem: `In ammonia, ${H.toFixed(2)} g of hydrogen combines with ${N.toFixed(1)} g of nitrogen. In water, ${H.toFixed(2)} g of hydrogen combines with ${O.toFixed(1)} g of oxygen. In dinitrogen trioxide, ${ND.toFixed(1)} g of nitrogen combines directly with ${OD.toFixed(1)} g of oxygen. These data verify the law of:`,
    right: 'reciprocal proportions',
    wrong: ['multiple proportions', 'definite proportions', 'conservation of mass'],
    sol: r`Through the common element hydrogen, N : O $= ${N} : ${O} = 7 : 12$. The direct ratio in the oxide is $${ND} : ${OD} = 7 : 12$, the same — the law of reciprocal proportions, option (@K). Multiple proportions (@1) compares two compounds of the same two elements.`,
    d: 3, c: 'analysis', t: [4],
  });
})(), () => near(14 / 24, 14 / 24, 1e-9) && near(14 / 24, 7 / 12, 1e-9) || 'ratio');
add('recip-mcq', (() => {
  const viaH = 16 / 8;
  const direct = 2 / 3;
  return mcq({
    stem: 'In hydrogen sulfide, 1.00 g of hydrogen combines with 16.0 g of sulfur; in water, 1.00 g of hydrogen combines with 8.00 g of oxygen. In sulfur trioxide, sulfur and oxygen combine directly in the mass ratio 2 : 3. Compared with the ratio S : O obtained through hydrogen, the direct ratio is:',
    right: 'one third of it, a simple fraction',
    wrong: ['three times it', 'exactly equal to it', 'unrelated to it'],
    sol: r`Through hydrogen, S : O $= 16 : 8 = ${viaH}$. Direct, S : O $= 2 : 3 = ${direct.toFixed(3)}$. The direct ratio divided by the ratio through hydrogen is $${direct.toFixed(3)} / ${viaH} = 0.333 \approx 1/3$ — option (@K). A simple multiple or fraction is what the law of reciprocal proportions allows.`,
    d: 3, c: 'analysis', t: [4],
  });
})(), () => near(2 / 3 / 2, 1 / 3, 1e-9) || 'fraction');
add('recip-short3', (() => {
  const H = 4.0;
  const Cl = 142;
  const ratioVia = H / Cl;
  const ratioDirect = 1.0 / 35.5;
  return short({
    marks: 3,
    stem: `Methane contains 12.0 g of carbon combined with ${H.toFixed(2)} g of hydrogen; carbon tetrachloride contains 12.0 g of carbon combined with ${Cl} g of chlorine; hydrogen chloride contains 1.00 g of hydrogen combined with 35.5 g of chlorine. (i) What masses of hydrogen and chlorine combine with 12.0 g of carbon? (ii) Find the ratio H : Cl through carbon. (iii) Compare it with the direct ratio in hydrogen chloride and name the law.`,
    model: r`(i) ${H.toFixed(2)} g of hydrogen and ${Cl} g of chlorine. (ii) H : Cl $= ${H.toFixed(2)} : ${Cl} = 1 : ${(Cl / H).toFixed(1)}$ $(${ratioVia.toFixed(4)})$. (iii) In hydrogen chloride, H : Cl $= 1.00 : 35.5 = 1 : 35.5$ $(${ratioDirect.toFixed(4)})$, which is the same. Two elements that each combine with a third combine with each other in the same ratio (or a simple multiple of it): the law of reciprocal proportions.`,
    sol: 'Masses with fixed carbon; ratio 1 : 35.5; same as direct ratio.',
    scheme: [['(i) 4.00 g H and 142 g Cl with 12.0 g C', 1], ['(ii) 1 : 35.5 through carbon', 1], ['(iii) Same direct ratio; reciprocal proportions', 1]],
    d: 3, c: 'application', t: [4],
  });
})(), () => near(4 / 142, 1 / 35.5, 0.001) || 'ratio');
add('ar-recip', ar({
  a: 'In the law of reciprocal proportions, the ratio in which two elements combine with a fixed mass of a third element is the same as, or a simple multiple of, the ratio in which they combine with each other.',
  r: 'The law of reciprocal proportions is another name for the law of multiple proportions.',
  key: 'c',
  sol: 'A is a correct statement of the law (Richter). R is false: multiple proportions compares two compounds of the same pair of elements, whereas reciprocal proportions compares the combining ratios of two elements through a third — option (c).',
  d: 3, c: 'analysis', t: [4],
}));
add('recip-long', (() => {
  const Na = 2.3;
  const Cl = 3.55;
  const O = 0.8;
  const Cl2 = 7.1;
  const O2 = 1.6;
  const via = Cl / O;
  const dir = Cl2 / O2;
  return long({
    stem: `(a) State the law of reciprocal proportions. [1]\n\n(b) Sodium chloride has ${Na.toFixed(2)} g of sodium combined with ${Cl} g of chlorine, and sodium oxide has ${Na.toFixed(2)} g of sodium combined with ${O} g of oxygen. Find the ratio of the masses of chlorine and oxygen that combine with ${Na.toFixed(2)} g of sodium. [2]\n\n(c) In dichlorine monoxide, ${Cl2} g of chlorine is combined directly with ${O2} g of oxygen. Show that the data obey the law of reciprocal proportions. [2]`,
    model: r`(a) If two elements combine separately with a fixed mass of a third element, the masses in which they do so are in the same ratio, or a simple multiple of it, as the masses in which they combine with each other. (b) With ${Na.toFixed(2)} g of sodium: ${Cl} g of chlorine and ${O} g of oxygen, so Cl : O $= ${Cl} : ${O} = ${via.toFixed(2)} : 1$. (c) Directly in the oxide, Cl : O $= ${Cl2} : ${O2} = ${dir.toFixed(2)} : 1$. The two ratios are identical (the simple multiple is 1), so the data obey the law of reciprocal proportions.`,
    sol: 'Statement; ratio 4.44 : 1 through sodium; same ratio in the oxide.',
    scheme: [['(a) Law stated', 1], ['(b) Masses with 2.30 g Na identified', 1], ['(b) Ratio 3.55 : 0.80 = 4.44 : 1', 1], ['(c) Direct ratio 7.10 : 1.60 = 4.44 : 1', 1], ['(c) Comparison and conclusion', 1]],
    d: 4, c: 'analysis', t: [4],
  });
})(), () => near(3.55 / 0.8, 7.1 / 1.6, 1e-9) || 'ratio');
add('gl-mcq1', (() => {
  const c2h2 = 20;
  const o2 = 70;
  const used = (5 / 2) * c2h2;
  const co2 = 2 * c2h2;
  const left = o2 - used;
  const total = co2 + left;
  return mcq({
    stem: r`A chemist burns ${c2h2} mL of ethyne in ${o2} mL of oxygen: $\ce{2C2H2 + 5O2 -> 4CO2 + 2H2O}$. The products are cooled to the original temperature and pressure, when the water is liquid. The volume of the gas mixture is then:`,
    right: `${total} mL`,
    wrong: [`${c2h2 + o2} mL`, `${co2} mL`, `${left} mL`],
    sol: r`By Gay-Lussac's law the gas volumes react as $2 : 5 : 4$. ${c2h2} mL of ethyne uses ${used} mL of oxygen and gives ${co2} mL of $\ce{CO2}$; oxygen left $= ${o2} - ${used} = ${left}$ mL. Gas volume $= ${co2} + ${left} = ${total}$ mL — option (@K). (@1) is the volume before the reaction, (@2) counts only the carbon dioxide and (@3) counts only the oxygen left.`,
    d: 3, c: 'application', t: [4],
  });
})(), () => 20 * 2 + (70 - 50) === 60 || 'volume');
add('gl-mcq2', (() => {
  const n2 = 30;
  const h2 = 60;
  const nh3 = (2 / 3) * h2;
  const n2used = h2 / 3;
  const left = n2 - n2used;
  const total = nh3 + left;
  return mcq({
    stem: r`${n2} mL of nitrogen and ${h2} mL of hydrogen are passed over a catalyst: $\ce{N2 + 3H2 -> 2NH3}$. Reaction goes to completion at constant temperature and pressure. The total volume of gas at the end is:`,
    right: `${total} mL`,
    wrong: [`${n2 + h2} mL`, `${nh3 + n2} mL`, `${nh3} mL`],
    sol: r`Volumes react as $1 : 3 : 2$. Hydrogen is limiting: ${h2} mL of it uses ${n2used} mL of nitrogen and gives ${nh3} mL of ammonia. Nitrogen left $= ${n2} - ${n2used} = ${left}$ mL, so the total is $${nh3} + ${left} = ${total}$ mL — option (@K). (@3) forgets the unused nitrogen.`,
    d: 3, c: 'application', t: [4],
  });
})(), () => (2 / 3) * 60 + (30 - 20) === 50 || 'total');
add('ammonia-num', (() => {
  const h2 = 90;
  const v = (2 / 3) * h2;
  return num({
    stem: r`At constant temperature and pressure, $\ce{N2 + 3H2 -> 2NH3}$. What volume of ammonia, in mL, is obtained from ${h2} mL of hydrogen with excess nitrogen?`,
    value: v, tol: 0.5, unit: 'mL',
    sol: r`Hydrogen and ammonia are in the volume ratio $3 : 2$, so $V = ${h2} \times 2/3 = ${v}$ mL.`,
    scheme: [['Volume ratio 3 : 2', 0.5], ['60 mL', 0.5]], d: 2, c: 'understanding', t: [4],
  });
})(), (q) => q.answer.value === 60 || 'volume');
add('gl-tf', tf({
  stem: 'Gay-Lussac’s law of combining volumes applies equally to gaseous, liquid and solid reactants measured at the same temperature.',
  key: 'f',
  sol: 'False. The law applies to gases only: it relates the volumes of gaseous reactants and gaseous products measured at the same temperature and pressure.',
  d: 1, c: 'understanding', t: [4],
}));
add('gl-short', (() => {
  const co = 30;
  const o2 = co / 2;
  const co2 = co;
  return short({
    marks: 2,
    stem: r`${co} mL of carbon monoxide is burnt completely in air: $\ce{2CO + O2 -> 2CO2}$. All volumes are at the same temperature and pressure. Find the volumes of oxygen consumed and carbon dioxide formed, and name the law used.`,
    model: r`The volumes are in the ratio $2 : 1 : 2$ (Gay-Lussac's law). Oxygen used $= ${co} / 2 = ${o2}$ mL; carbon dioxide formed $= ${co2}$ mL.`,
    sol: 'Volume ratio 2 : 1 : 2.',
    scheme: [['Oxygen 15 mL and carbon dioxide 30 mL', 1.5], ['Gay-Lussac’s law named', 0.5]],
    d: 2, c: 'understanding', t: [4],
  });
})(), () => 30 / 2 === 15 || 'volume');
add('gl-short3', (() => {
  const c3h8 = 20;
  const o2 = 150;
  const used = 5 * c3h8;
  const co2 = 3 * c3h8;
  const left = o2 - used;
  const total = co2 + left;
  return short({
    marks: 3,
    stem: r`${c3h8} mL of propane is burnt in ${o2} mL of oxygen: $\ce{C3H8 + 5O2 -> 3CO2 + 4H2O}$. The products are cooled to the original temperature and pressure, when the water is liquid. Find (i) the volume of oxygen consumed, (ii) the volume of carbon dioxide formed and (iii) the total volume of gas remaining.`,
    model: r`Gas volumes react as $1 : 5 : 3$. (i) Oxygen used $= 5 \times ${c3h8} = ${used}$ mL. (ii) $\ce{CO2}$ formed $= 3 \times ${c3h8} = ${co2}$ mL. (iii) Oxygen left $= ${o2} - ${used} = ${left}$ mL, so the gas remaining is $${co2} + ${left} = ${total}$ mL.`,
    sol: 'Use the volume ratio 1 : 5 : 3.',
    scheme: [['(i) 100 mL', 1], ['(ii) 60 mL', 1], ['(iii) 110 mL', 1]],
    d: 3, c: 'application', t: [4],
  });
})(), () => 3 * 20 + (150 - 100) === 110 || 'total');
add('ar-gl', ar({
  a: 'Gases react in simple whole-number ratios of volume when measured at the same temperature and pressure.',
  r: 'Gay-Lussac’s law of combining volumes was fully explained by Dalton’s atomic theory.',
  key: 'c',
  sol: 'A is a correct statement of Gay-Lussac’s law. R is false: Dalton assumed that elementary gases were single atoms and could not account for the volume ratios; Avogadro’s molecular hypothesis was needed — option (c).',
  d: 3, c: 'analysis', t: [4],
}));
add('avog-mcq', mcq({
  stem: 'One volume of hydrogen and one volume of chlorine give two volumes of hydrogen chloride at the same temperature and pressure. Avogadro explained this by proposing that:',
  right: 'molecules of hydrogen and of chlorine each contain two atoms, which separate on reaction',
  wrong: ['one volume of any gas holds one atom of that gas', 'a hydrogen chloride molecule has one hydrogen atom and two chlorine atoms', 'hydrogen and chlorine atoms cannot combine in equal numbers'],
  sol: r`Equal volumes hold equal numbers of molecules. If $\ce{H2}$ and $\ce{Cl2}$ are diatomic, one molecule of each gives two molecules of $\ce{HCl}$: $\ce{H2 + Cl2 -> 2HCl}$, so 1 + 1 volumes give 2 volumes — option (@K).`,
  d: 4, c: 'analysis', t: [4],
}));
add('gl-long', (() => {
  const h2 = 40;
  const o2 = 25;
  const used = h2 / 2;
  const left = o2 - used;
  return long({
    stem: r`(a) State Gay-Lussac's law of combining volumes. [1]

(b) ${h2} mL of hydrogen is mixed with ${o2} mL of oxygen and ignited: $\ce{2H2 + O2 -> 2H2O}$. The mixture is cooled to the original temperature and pressure, when the water is liquid. Which gas is left over and what is its volume? [2]

(c) One volume of hydrogen and one volume of chlorine give two volumes of hydrogen chloride. Using Avogadro's law, show that this requires the molecules of hydrogen and chlorine to be diatomic. [2]`,
    model: r`(a) Gases react with one another, and form gaseous products, in volumes that bear a simple whole-number ratio, when all volumes are measured at the same temperature and pressure. (b) Hydrogen and oxygen react in the volume ratio $2 : 1$, so ${h2} mL of hydrogen needs ${used} mL of oxygen. Oxygen left $= ${o2} - ${used} = ${left}$ mL, and since water is a liquid the only gas remaining is ${left} mL of oxygen. (c) By Avogadro's law, equal volumes contain equal numbers of molecules. If $n$ molecules of hydrogen react with $n$ molecules of chlorine, $2n$ molecules of hydrogen chloride form. Each molecule of hydrogen chloride needs at least one atom of each element, so each hydrogen and chlorine molecule must supply two atoms: $\ce{H2 + Cl2 -> 2HCl}$.`,
    sol: 'Law; oxygen in excess; Avogadro argument.',
    scheme: [['(a) Law stated with same T and P', 1], ['(b) Oxygen required 20 mL', 1], ['(b) 5 mL of oxygen left', 1], ['(c) Equal numbers of molecules from equal volumes', 1], ['(c) Two molecules of HCl need two atoms of each element: diatomic', 1]],
    d: 4, c: 'analysis', t: [4],
  });
})(), () => 25 - 40 / 2 === 5 || 'oxygen');

// ================================================================ t05 Dalton's atomic theory
add('dalton-chk', mcq({
  stem: 'Which of the following observations is not consistent with Dalton’s original postulate that all atoms of an element are identical in mass?',
  right: 'Neon exists as atoms of mass numbers 20, 21 and 22',
  wrong: ['Water from any source contains hydrogen and oxygen in the mass ratio 1 : 8', 'Carbon and oxygen form both carbon monoxide and carbon dioxide', 'The mass of a closed system is the same before and after a reaction'],
  sol: 'The existence of isotopes (neon-20, neon-21, neon-22) shows atoms of one element can differ in mass — option (@K). The other three observations are consistent with, and were explained by, Dalton’s theory.',
  d: 2, c: 'application', t: [5],
}));
add('limit-mcq', mcq({
  stem: 'Which discovery most directly contradicted Dalton’s postulate that atoms are indivisible?',
  right: 'Cathode-ray tubes yielded electrons from atoms of every gas used',
  wrong: ['Proust’s analysis of two samples of copper carbonate', 'Gay-Lussac’s measurement of combining volumes of gases', 'Lavoisier’s weighing of mercury before and after heating'],
  sol: 'Identical negatively charged particles (electrons) came from atoms of every gas, so atoms must have smaller constituents — option (@K). The other three experiments led to laws that Dalton’s theory explained.',
  d: 2, c: 'understanding', t: [5],
}));
add('atoms-mol-mcq', mcq({
  stem: 'A student lists the particles of four substances. Which entry is a molecule of an element?',
  right: r`$\ce{P4}$ of white phosphorus`,
  wrong: [r`$\ce{NH3}$ of ammonia`, r`$\ce{CO2}$ of dry ice`, r`$\ce{H2O}$ of ice`],
  sol: 'A molecule of an element contains atoms of one kind only. White phosphorus has four phosphorus atoms per molecule — option (@K). The other three molecules contain two different elements, so they are molecules of compounds.',
  d: 2, c: 'understanding', t: [5],
}));
add('dalton-mcq', mcq({
  stem: 'Which postulate of Dalton’s atomic theory is the direct basis for the law of conservation of mass?',
  right: 'Atoms are neither created nor destroyed in a chemical reaction; they are only rearranged.',
  wrong: ['Atoms of different elements differ in mass and properties.', 'Atoms combine in small whole-number ratios to form compounds.', 'All the atoms of an element are identical.'],
  sol: 'If atoms are only rearranged, the number and mass of atoms are unchanged by a reaction, so total mass is conserved — option (@K). Small whole-number ratios explain the laws of definite and multiple proportions.',
  d: 2, c: 'understanding', t: [5],
}));
add('ar-dalton', ar({
  a: 'According to Dalton, an atom can be broken into smaller particles during a chemical reaction.',
  r: 'Dalton’s theory explains the existence of isotopes of an element.',
  key: 'd',
  sol: 'Both are false. Dalton’s atom was indivisible and was only rearranged in reactions, and his postulate that all atoms of an element are identical in mass rules out isotopes — option (d).',
  d: 2, c: 'understanding', t: [5],
}));
add('dalton-short', short({
  marks: 2,
  stem: 'State any two postulates of Dalton’s atomic theory. Which one of them has been modified by later discoveries, and how?',
  model: 'Postulates: (1) matter consists of indivisible atoms; (2) atoms of an element are identical in mass and properties; (3) atoms combine in small whole-number ratios to form compounds; (4) atoms are neither created nor destroyed in reactions. The postulate that atoms of an element are identical in mass is modified: isotopes of one element have different masses.',
  sol: 'Two postulates and one modification.',
  scheme: [['Two postulates stated', 1], ['One postulate with its modification', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('limit-short', short({
  marks: 2,
  stem: 'Give two limitations of Dalton’s atomic theory, each supported by an observation that contradicts it.',
  model: 'First, atoms are divisible: electrons, protons and neutrons are found inside atoms. Second, atoms of one element are not all identical in mass: chlorine consists of isotopes of mass numbers 35 and 37. (Other limitations: the theory could not explain Gay-Lussac’s law, and does not explain why diamond and graphite, both made of carbon atoms, differ in properties.)',
  sol: 'Two limitations with evidence.',
  scheme: [['First limitation with evidence', 1], ['Second limitation with evidence', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('dalton-short3', short({
  marks: 3,
  stem: 'Use Dalton’s postulates to explain (i) the law of conservation of mass, (ii) the law of definite proportions and (iii) the law of multiple proportions, taking carbon monoxide and carbon dioxide as the example for (iii).',
  model: '(i) Atoms are only rearranged, never created or destroyed, so the total mass of reactants equals that of products. (ii) A compound is made of atoms combined in a fixed whole-number ratio and every atom of an element has the same mass, so the mass ratio of the elements is always the same. (iii) The same atoms can combine in different whole-number ratios: carbon monoxide has one oxygen atom per carbon atom and carbon dioxide has two, so for a fixed mass of carbon the masses of oxygen are in the ratio 1 : 2.',
  sol: 'Link each law to the relevant postulate.',
  scheme: [['(i) Conservation explained', 1], ['(ii) Definite proportions explained', 1], ['(iii) Multiple proportions with CO and CO₂', 1]],
  d: 3, c: 'application', t: [5],
}));
add('limit-short3', short({
  marks: 3,
  stem: 'Explain why Dalton’s theory could not account for Gay-Lussac’s observation that 1 volume of hydrogen and 1 volume of chlorine give 2 volumes of hydrogen chloride, and state how Avogadro resolved the difficulty.',
  model: 'Dalton took the smallest particle of a gaseous element to be a single atom. With one atom of hydrogen and one of chlorine, equal volumes would give one particle of hydrogen chloride per pair, and so only one volume of product, not two. Avogadro proposed that equal volumes of gases at the same temperature and pressure hold equal numbers of molecules and that hydrogen and chlorine exist as diatomic molecules; each molecule splits into two atoms, giving two molecules of hydrogen chloride and so two volumes.',
  sol: 'Dalton’s monatomic assumption; Avogadro’s molecules.',
  scheme: [['Dalton’s assumption of single atoms', 1], ['Predicted one volume, observed two', 1], ['Avogadro: diatomic molecules and equal numbers of molecules in equal volumes', 1]],
  d: 3, c: 'analysis', t: [5],
}));
add('dalton-long', long({
  stem: '(a) State two postulates of Dalton’s atomic theory and show how they explain the law of conservation of mass. [2]\n\n(b) Describe three limitations of the theory, giving for each the later discovery that shows it. [3]',
  model: '(a) Matter is made of atoms that cannot be created or destroyed in a chemical reaction; a reaction only rearranges atoms into new combinations. Because the number and kind of atoms, each with a fixed mass, are unchanged, the total mass of the reactants equals that of the products. (b) First, atoms are divisible: the discovery of the electron, proton and neutron shows they have internal structure. Second, atoms of the same element can differ in mass: isotopes such as chlorine-35 and chlorine-37 exist. Third, the theory treats the smallest particle of a gas as an atom, so it fails to explain Gay-Lussac’s law; Avogadro’s concept of the molecule was needed. (Also, it cannot explain allotropy: diamond and graphite, both carbon, differ in properties.)',
  sol: 'Two postulates and conservation of mass; three limitations with evidence.',
  scheme: [['(a) Two postulates stated', 1], ['(a) Explains conservation of mass', 1], ['(b) First limitation with evidence', 1], ['(b) Second limitation with evidence', 1], ['(b) Third limitation with evidence', 1]],
  d: 3, c: 'understanding', t: [5],
}));
