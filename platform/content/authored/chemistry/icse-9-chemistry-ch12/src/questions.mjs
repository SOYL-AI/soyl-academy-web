// ICSE 9 Chemistry ch12 Study of Gas Laws: question bank in ICSE school-examination style.
// Numbers come from calc.mjs. AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true, R does not explain.
import { mk, add, svgV, plot, r } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import * as K from './calc.mjs';
import { APPARATUS_LETTERED } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, long, match } = mk;
const IT = K.IT;
const M = '−';
const appFig = svgV(APPARATUS_LETTERED, 'Gas-law apparatus with parts lettered A to E');
const g2Fig = plot(
  {
    x: { min: 0, max: 100, label: 'Volume V (cm³)' },
    y: { min: 0, max: 700, label: 'Pressure P (mm Hg)' },
    functions: [{ expr: `${IT.G2_K}/x`, domain: [14, 100] }],
    points: IT.G2.map(([v, p]) => ({ at: [v, p] })),
  },
  'Graph of pressure against volume for a fixed mass of gas at constant temperature: a falling curve through six marked points',
);
const term = (o) => short({ marks: 1, wl: null, scheme: [[o.sch ?? 'Correct answer', 1]], ...o });
const tbl = (head, rows) => `| ${head.join(' | ')} |\n|${head.map(() => '---').join('|')}|\n${rows.map((x) => `| ${x.join(' | ')} |`).join('\n')}`;
const sgn = (c) => (c < 0 ? `${M}${Math.abs(c)}` : `${c}`);

// ---------------------------------------------------------------- deck-check items (not used in tests)
add('chk-motion', mcq({
  stem: 'A gas in a sealed flask presses on the walls because its molecules',
  right: 'keep colliding with the walls', wrong: ['rest against the walls', 'are attracted by the walls', 'expand each time they touch the walls'],
  sol: 'The constant collisions give the pressure — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('chk-boyle-table', num({
  stem: 'In a Boyle experiment a gas occupies 30 cm³ at 400 mm Hg and 60 cm³ at an unknown pressure at the same temperature. What is the unknown pressure?',
  value: IT.chkBT, unit: 'mm Hg',
  sol: `P₁V₁ = P₂V₂, so P₂ = 400 × 30 ÷ 60 = ${IT.chkBT} mm Hg.`,
  scheme: [[`${IT.chkBT} mm Hg`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 200 || 'value');
add('chk-boyle-graph', mcq({
  stem: 'For a fixed mass of gas at constant temperature, which graph is a straight line through the origin?',
  right: 'Pressure against 1/volume', wrong: ['Pressure against volume', 'Volume against 1/pressure', 'Pressure × volume against volume'],
  sol: 'P is proportional to 1/V — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('chk-boyle-num', num({
  stem: `${K.H3.V1} cm³ of hydrogen at ${K.H3.P1} mm Hg is compressed at constant temperature to one third of its volume. Find the final pressure in mm Hg.`,
  value: K.H3_P2, unit: 'mm Hg',
  sol: `V₂ = ${K.H3.V1} ÷ 3 = ${K.H3_V2} cm³; P₂ = ${K.H3.P1} × ${K.H3.V1} ÷ ${K.H3_V2} = ${K.H3_P2} mm Hg.`,
  scheme: [[`${K.H3_P2} mm Hg`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 2280 || 'value');
add('chk-kelvin', num({
  stem: 'What is 47 °C on the kelvin scale?',
  value: K.CONV.c47K, unit: 'K',
  sol: `K = °C + 273 = 47 + 273 = ${K.CONV.c47K} K.`,
  scheme: [[`${K.CONV.c47K} K`, 1]],
  d: 1, c: 'application', t: [4],
}), (q) => q.answer.value === 320 || 'value');
add('chk-abs0', mcq({
  stem: 'Extrapolating the straight-line graph of volume against Celsius temperature to zero volume gives a temperature of',
  right: `${M}273 °C`, wrong: ['0 °C', `${M}100 °C`, '273 °C'],
  sol: 'The extended line meets the zero-volume level at absolute zero — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('chk-comb', num({
  stem: `A gas at 300 K, ${K.TF.P1} mm Hg and ${K.TF.V1} cm³ is compressed to ${K.TF.V2} cm³ at ${K.TF.P2} mm Hg. What is the final temperature in kelvin?`,
  value: K.TF_T2K, unit: 'K',
  sol: `T₂ = T₁P₂V₂ ÷ (P₁V₁) = 300 × ${K.TF.P2} × ${K.TF.V2} ÷ (${K.TF.P1} × ${K.TF.V1}) = ${K.TF_T2K} K.`,
  scheme: [[`${K.TF_T2K} K`, 1]],
  d: 3, c: 'application', t: [5],
}), (q) => q.answer.value === 225 || 'value');
add('chk-stp', num({
  stem: `${K.ST3.V1} dm³ of a gas at ${K.ST3.P1} mm Hg and ${K.ST3.T1C} °C is reduced to STP. Find its volume in dm³.`,
  value: K.ST3_V0, unit: 'dm³',
  sol: `T₁ = ${K.toK(K.ST3.T1C)} K; V₀ = ${K.ST3.P1} × ${K.ST3.V1} × ${K.STP_T} ÷ (${K.toK(K.ST3.T1C)} × ${K.STP_P}) = ${K.ST3_V0} dm³.`,
  scheme: [[`${K.ST3_V0} dm³`, 1]],
  d: 3, c: 'application', t: [5],
}), (q) => q.answer.value === 27.3 || 'value');

// ---------------------------------------------------------------- t01 molecular motion
add('motion-mcq1', mcq({
  stem: 'Which statement about the molecules of a gas is correct?',
  right: 'They move at random in straight lines between collisions', wrong: ['They are packed tightly and only vibrate', 'They move in layers that slide over one another', 'They stop moving when the gas is cooled slightly'],
  sol: 'Gas molecules are far apart and in constant random motion — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('motion-mcq2', mcq({
  stem: 'A closed steel cylinder of hydrogen is left in strong sunlight. The pressure inside rises because the molecules',
  right: 'move faster and hit the walls harder and more often', wrong: ['become larger', 'attract one another more strongly', 'increase in number'],
  sol: 'Heating raises the speed of the molecules, not their size or number — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('motion-mcq3', mcq({
  stem: 'A gas trapped under a light piston that moves freely is heated. Which change is seen?',
  right: 'The volume increases at the same pressure', wrong: ['The pressure increases at the same volume', 'The volume and pressure both fall', 'The molecules slow down'],
  sol: 'Faster molecules push the piston out until the pressure again equals the outside pressure — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('ar-motion', ar({
  a: 'When a gas is compressed to half its volume at constant temperature, its pressure becomes double.',
  r: 'The molecules of a gas are in constant random motion.',
  key: 'd',
  sol: 'Both statements are true, but the reason does not explain the assertion. The pressure doubles because the molecules strike each unit area of wall twice as often in half the space — option (d).',
  d: 2, c: 'analysis', t: [1, 2],
}));
add('tf-weight', tf({
  stem: 'The pressure of a gas is caused by the weight of its molecules pressing on the base of the container.',
  key: 'f',
  sol: 'False. It is caused by the collisions of the molecules with all the walls.',
  d: 1, c: 'recall', t: [1],
}));
add('s2-tyre', short({
  marks: 2,
  stem: 'The pressure in a car tyre is higher at the end of a long journey than at the start. Explain this using the motion of molecules. (The volume of the tyre hardly changes.)',
  model: 'The tyre and the air in it become **warm**, so the air molecules move **faster**. They hit the inside wall **harder and more often**, which raises the pressure.',
  sol: 'Warmer air; faster molecules; harder, more frequent hits.',
  scheme: [['The air is warmer, so molecules move faster', 1], ['Harder and more frequent collisions with the wall', 1]],
  d: 2, c: 'application', t: [1],
}));
add('s3-molecules', short({
  marks: 3,
  stem: 'Explain, in terms of molecular motion, (i) why a gas has no fixed volume, (ii) why a gas can be compressed easily and (iii) why a gas exerts pressure in every direction.',
  model: '(i) The molecules are **far apart and move freely**, so the gas spreads to fill any container. (ii) There is a lot of **empty space** between the molecules, so they can be pushed closer. (iii) The molecules move at random and **strike every part of the wall**, so the push is the same in all directions.',
  sol: 'Free-moving molecules; empty space; random collisions with all walls.',
  scheme: [['Molecules far apart and free to move', 1], ['Empty space allows compression', 1], ['Random collisions on all walls', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 Boyle's law
add('boyle-mcq2', mcq({
  stem: "The volume of a fixed mass of gas at constant temperature is reduced to one third of its value. The pressure becomes",
  right: 'three times the original pressure', wrong: ['one third of the original pressure', 'nine times the original pressure', 'the same as the original pressure'],
  sol: 'P × V is constant, so a third of the volume needs three times the pressure — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('boyle-mcq3', mcq({
  stem: 'Which pair of readings for the same fixed mass of gas at constant temperature obeys Boyle\'s law?',
  right: `P = ${IT.MCQ_OK[0][0]} mm Hg, V = ${IT.MCQ_OK[0][1]} cm³ and P = ${IT.MCQ_OK[1][0]} mm Hg, V = ${IT.MCQ_OK[1][1]} cm³`,
  wrong: IT.MCQ_BAD.map(([a, b]) => `P = ${a[0]} mm Hg, V = ${a[1]} cm³ and P = ${b[0]} mm Hg, V = ${b[1]} cm³`),
  sol: `Both products are ${IT.MCQ_OK[0][0] * IT.MCQ_OK[0][1]}; in the other pairs the products differ — option (@K).`,
  d: 3, c: 'application', t: [2],
}));
add('boyle-mcq4', mcq({
  stem: "In an experiment to test Boyle's law the cylinder of gas stands in a water bath. The bath is used to",
  right: 'keep the temperature of the gas constant', wrong: ['reduce the pressure of the gas', 'cool the gas to absolute zero', 'increase the mass of the gas'],
  sol: "Boyle's law holds only at constant temperature — option (@K).",
  d: 1, c: 'recall', t: [2],
}));
add('boyle-mcq5', mcq({
  stem: 'For a fixed mass of gas at constant temperature, a graph of the product P × V (vertical axis) against P (horizontal axis) is',
  right: 'a horizontal straight line', wrong: ['a straight line through the origin', 'a curve that falls towards the axis', 'a vertical straight line'],
  sol: 'P × V has the same value at every pressure — option (@K).',
  d: 3, c: 'understanding', t: [2],
}));
add('tf-hyper', tf({
  stem: 'The graph of pressure against volume for a fixed mass of gas at constant temperature is a straight line.',
  key: 'f',
  sol: 'False. It is a curve; the graph of P against 1/V is the straight line through the origin.',
  d: 2, c: 'recall', t: [2],
}));
add('term-boyle', term({
  stem: "State Boyle's law.",
  model: 'For a **fixed mass of gas at constant temperature**, the volume varies **inversely** with the pressure (so P × V is constant).',
  sol: 'Fixed mass, constant temperature; volume inversely proportional to pressure.', sch: 'Law with both conditions',
  d: 1, c: 'recall', t: [2],
}));
add('term-shape', term({
  stem: 'Name the quantity that, plotted against the pressure of a fixed mass of gas at constant temperature, gives a straight line through the origin.',
  model: 'The **reciprocal of the volume** (1/V).',
  sol: 'One divided by the volume.', sch: '1/V',
  d: 2, c: 'understanding', t: [2],
}));
add('s2-graphs', short({
  marks: 2,
  stem: "Describe the shape of each graph for a fixed mass of gas at constant temperature: (i) pressure against volume, (ii) pressure against 1/volume.",
  model: '(i) A **curve** that falls as the volume increases and never meets either axis. (ii) A **straight line through the origin**.',
  sol: 'Curve; straight line through the origin.',
  scheme: [['Curve for P against V', 1], ['Straight line through the origin for P against 1/V', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('s2-compress', short({
  marks: 2,
  stem: "Explain Boyle's law using the idea of molecules striking the wall of the container.",
  model: 'In a **smaller volume** the same number of molecules are crowded together, so they hit **each unit area of wall more often** each second. The **pressure** therefore **rises**.',
  sol: 'Smaller space; more hits per unit area; higher pressure.',
  scheme: [['Same molecules in a smaller space', 1], ['More collisions per unit area, so higher pressure', 1]],
  d: 2, c: 'understanding', t: [1, 2],
}));
add('s3-graphs', short({
  marks: 3,
  stem: 'A student measures the pressure of a trapped gas at several volumes at constant temperature. She plots P against V, and then P against 1/V. Describe both graphs and state what the second one shows.',
  model: 'P against V is a **curve** falling steeply and then flattening, never touching the axes. P against 1/V is a **straight line through the origin**. The second graph shows that **P is directly proportional to 1/V**, which is Boyle\'s law.',
  sol: 'Curve; straight line through origin; P proportional to 1/V.',
  scheme: [['Curve for P against V', 1], ['Straight line through the origin for P against 1/V', 1], ['Direct proportion between P and 1/V', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('num-boyle-p', num({
  stem: `A gas has a volume of ${K.GEXP.V1} cm³ at ${K.GEXP.P1} mm Hg. Its volume is changed to ${K.GEXP.V2} cm³ at constant temperature. Calculate the new pressure.`,
  value: K.GEXP_P2, unit: 'mm Hg',
  sol: `P₂ = P₁V₁ ÷ V₂ = ${K.GEXP.P1} × ${K.GEXP.V1} ÷ ${K.GEXP.V2} = ${K.GEXP_P2} mm Hg.`,
  scheme: [[`${K.GEXP_P2} mm Hg`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 500 || 'value');
add('num-boyle-flask', num({
  stem: `A ${K.CL2.V1}.0 dm³ flask holds chlorine at ${K.CL2.P1} mm Hg. Its tap is opened to an empty flask so that the gas now fills a total volume of ${K.CL2.V2}.0 dm³ at the same temperature. Find the final pressure.`,
  value: K.CL2_P2, unit: 'mm Hg',
  sol: `P₂ = ${K.CL2.P1} × ${K.CL2.V1} ÷ ${K.CL2.V2} = ${K.CL2_P2} mm Hg.`,
  scheme: [[`${K.CL2_P2} mm Hg`, 1]],
  d: 3, c: 'application', t: [2],
}), (q) => q.answer.value === 760 || 'value');
add('num-boyle-pct', num({
  stem: `The pressure on a fixed mass of gas at constant temperature is raised by ${K.PUP.pct} per cent, from ${K.PUP.P1} mm Hg. By what percentage does the volume fall?`,
  value: K.PUP_V_FALL, unit: '%',
  sol: `New pressure = ${K.PUP.P1} × 1.25 = ${K.PUP_P2} mm Hg. V₂/V₁ = P₁/P₂ = ${K.PUP.P1}/${K.PUP_P2} = ${K.PUP_V_RATIO}. Fall = (1 − ${K.PUP_V_RATIO}) × 100 = ${K.PUP_V_FALL}%.`,
  scheme: [[`${K.PUP_V_FALL}%`, 1]],
  d: 4, c: 'analysis', t: [2],
}), (q) => q.answer.value === 20 || 'value');

// ---------------------------------------------------------------- t03 Charles's law and absolute zero
add('charles-mcq1', mcq({
  stem: 'The volume of a fixed mass of gas at constant pressure is plotted against its kelvin temperature. The graph is',
  right: 'a straight line through the origin', wrong: ['a curve that falls steeply', 'a horizontal straight line', 'a straight line cutting the volume axis at a positive value'],
  sol: 'V is directly proportional to T — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('charles-mcq2', mcq({
  stem: 'A fixed mass of gas has a volume V at 27 °C and a constant pressure. At what Celsius temperature will its volume be 2V?',
  right: `${IT.DBL_C} °C`, wrong: [`${IT.WRONG_DBL_C} °C`, `${IT.DBL_K} °C`, '127 °C'],
  sol: `Volume doubles when the kelvin temperature doubles: 2 × ${K.toK(27)} = ${IT.DBL_K} K = ${IT.DBL_C} °C — option (@K).`,
  d: 3, c: 'application', t: [3, 4],
}));
add('charles-mcq3', mcq({
  stem: 'The zero-volume point on the volume–temperature graph is found by extrapolation because',
  right: 'real gases turn to liquids before reaching that temperature', wrong: ['the gas becomes too hot to measure', 'the pressure becomes infinite at that point', 'thermometers cannot be placed in a water bath'],
  sol: 'The line cannot be measured down to absolute zero, so it is extended — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('ar-abs', ar({
  a: 'The graph of volume against Celsius temperature for a gas at constant pressure is a straight line through the origin.',
  r: 'Extending the volume–temperature graph backwards gives zero volume at −273 °C.',
  key: 'b',
  sol: 'The assertion is false: the line meets the temperature axis at −273 °C, not at 0 °C. The reason is true — option (b).',
  d: 3, c: 'analysis', t: [3],
}));
add('tf-abs', tf({
  stem: 'A real gas can be cooled to absolute zero and its volume then becomes zero.',
  key: 'f',
  sol: 'False. Real gases liquefy before that; the zero volume is reached only on extrapolation.',
  d: 2, c: 'understanding', t: [3],
}));
add('term-charles-const', term({
  stem: "Name the two quantities that are kept constant in Charles's law.",
  model: 'The **pressure** and the **mass** of the gas.',
  sol: 'Pressure and mass.', sch: 'Both named',
  d: 1, c: 'recall', t: [3],
}));
add('reason-kelvin', term({
  stem: "Give a reason: temperatures are changed to kelvin before using V₁/T₁ = V₂/T₂.",
  model: 'The volume is proportional to the **absolute (kelvin) temperature**, not to the Celsius value.',
  sol: 'Volume is proportional to kelvin temperature.', sch: 'Reason',
  d: 2, c: 'understanding', t: [3, 4],
}));
add('s2-abs0', short({
  marks: 2,
  stem: 'What is meant by absolute zero? State its value on the Celsius scale.',
  model: 'Absolute zero is the **lowest possible temperature**, **0 K**. On the Celsius scale it is **−273 °C**.',
  sol: 'Lowest possible temperature, 0 K; −273 °C.',
  scheme: [['Lowest possible temperature (0 K)', 1], ['−273 °C', 1]],
  d: 1, c: 'recall', t: [3, 4],
}));
add('s2-diff', short({
  marks: 2,
  stem: "State two differences between Boyle's law and Charles's law.",
  model: "Boyle's law applies at **constant temperature** and gives V ∝ 1/P; Charles's law applies at **constant pressure** and gives V ∝ T (kelvin).",
  sol: 'Constant temperature and inverse proportion; constant pressure and direct proportion.',
  scheme: [['Quantity kept constant in each', 1], ['Inverse versus direct proportion', 1]],
  d: 2, c: 'understanding', t: [2, 3],
}));
add('s2-fault', short({
  marks: 2,
  stem: 'A student says that raising a gas from 20 °C to 40 °C at constant pressure doubles its volume. Is she right? Support your answer with kelvin values.',
  model: `No. ${IT.c20K} K rises to only ${IT.c40K} K, a factor of ${IT.ratio2040}, so the volume increases by about ${Math.round((IT.ratio2040 - 1) * 100)} per cent, not two-fold.`,
  sol: `${IT.c20K} K to ${IT.c40K} K: ratio ${IT.ratio2040}.`,
  scheme: [['Converts to kelvin', 1], ['Shows the ratio is about 1.07, not 2', 1]],
  d: 3, c: 'analysis', t: [3, 4],
}));
add('s3-extrap', short({
  marks: 3,
  stem: 'A student measures the volume of a fixed mass of gas at four Celsius temperatures at constant pressure. Describe how she can use a graph of her results to find absolute zero.',
  model: 'She plots **volume against Celsius temperature**, which gives a **straight line**. She **extends the line backwards** (extrapolates) until it reaches the **zero-volume level**. The temperature there, **−273 °C**, is absolute zero.',
  sol: 'Plot V against t; extend the line to zero volume; read −273 °C.',
  scheme: [['Plots V against Celsius temperature (straight line)', 1], ['Extrapolates to zero volume', 1], ['Reads −273 °C as absolute zero', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('s3-charles-calc', short({
  marks: 3, wl: null,
  stem: `A balloon contains ${IT.S3C.V1} cm³ of air at ${M}23 °C. Calculate its volume at ${IT.S3C.T2C} °C at constant pressure.`,
  model: `T₁ = ${M}23 + 273 = ${K.toK(IT.S3C.T1C)} K; T₂ = ${IT.S3C.T2C} + 273 = ${K.toK(IT.S3C.T2C)} K. V₂ = V₁T₂ ÷ T₁ = ${IT.S3C.V1} × ${K.toK(IT.S3C.T2C)} ÷ ${K.toK(IT.S3C.T1C)} = **${IT.S3C_V2} cm³**.`,
  sol: `Kelvin conversion; substitution; ${IT.S3C_V2} cm³.`,
  scheme: [['Both temperatures in kelvin', 1], ['Correct substitution', 1], [`${IT.S3C_V2} cm³`, 1]],
  d: 2, c: 'application', t: [3, 4],
}), () => IT.S3C_V2 === 1008 || 'v');
add('num-charles-v', num({
  stem: `${K.CF.V1} cm³ of oxygen in a flexible bag is warmed from ${K.CF.T1C} °C to ${K.CF.T2C} °C at constant pressure. Find the final volume.`,
  value: K.CF_V2, unit: 'cm³',
  sol: `T₁ = ${K.toK(K.CF.T1C)} K, T₂ = ${K.toK(K.CF.T2C)} K; V₂ = ${K.CF.V1} × ${K.toK(K.CF.T2C)} ÷ ${K.toK(K.CF.T1C)} = ${K.CF_V2} cm³.`,
  scheme: [[`${K.CF_V2} cm³`, 1]],
  d: 2, c: 'application', t: [3, 4],
}), (q) => q.answer.value === 315 || 'value');
add('num-charles-t', num({
  stem: `${K.CB.V1} cm³ of a gas at ${K.CB.T1C} °C is heated at constant pressure until its volume is ${K.CB.V2} cm³. What is the final temperature in °C?`,
  value: K.CB_T2C, unit: '°C',
  sol: `T₁ = ${K.toK(K.CB.T1C)} K; T₂ = ${K.toK(K.CB.T1C)} × ${K.CB.V2} ÷ ${K.CB.V1} = ${K.CB_T2K} K = ${K.CB_T2C} °C.`,
  scheme: [[`${K.CB_T2C} °C`, 1]],
  d: 3, c: 'application', t: [3, 4],
}), (q) => q.answer.value === 147 || 'value');
add('num-charles-half', num({
  stem: `A gas of volume ${K.CC.V1} cm³ at ${K.CC.T1C} °C is cooled at constant pressure until its volume is halved. What is the final temperature in °C?`,
  value: K.CC_T2C, unit: '°C',
  sol: `T₁ = ${K.toK(K.CC.T1C)} K; half the volume needs half the kelvin temperature: ${K.CC_T2K} K = ${K.CC_T2C} °C.`,
  scheme: [[`${M}73 °C`, 1]],
  d: 3, c: 'application', t: [3, 4],
}), (q) => q.answer.value === -73 || 'value');
add('num-celsius-form', num({
  stem: `A gas has a volume of ${K.C0.V0} cm³ at 0 °C. Using V = V₀(1 + t/273), find its volume at ${K.C0.t} °C at constant pressure.`,
  value: K.C0_V, unit: 'cm³',
  sol: `V = ${K.C0.V0} × (1 + ${K.C0.t}/273) = ${K.C0.V0} × (1 + 1/3) = ${K.C0_V} cm³.`,
  scheme: [[`${K.C0_V} cm³`, 1]],
  d: 2, c: 'application', t: [3],
}), (q) => q.answer.value === 364 || 'value');

// ---------------------------------------------------------------- t04 kelvin and Celsius, STP
add('kelvin-mcq1', mcq({
  stem: 'A temperature of 100 K on the Celsius scale is',
  right: `${M}173 °C`, wrong: ['173 °C', '373 °C', `${M}373 °C`],
  sol: `°C = K − 273 = 100 − 273 = ${M}173 — option (@K).`,
  d: 2, c: 'application', t: [4],
}));
add('kelvin-mcq2', mcq({
  stem: 'Standard temperature and pressure (STP) are',
  right: '273 K and 760 mm Hg', wrong: ['0 K and 760 mm Hg', '273 K and 1 mm Hg', '373 K and 760 mm Hg'],
  sol: 'STP is 273 K (0 °C) and 760 mm Hg (1 atmosphere) — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('kelvin-mcq3', mcq({
  stem: 'Which of these temperatures cannot be reached by any substance?',
  right: `${M}300 °C`, wrong: [`${M}250 °C`, `${M}100 °C`, '27 °C'],
  sol: `${M}300 °C is below absolute zero (${M}273 °C) — option (@K).`,
  d: 2, c: 'application', t: [4],
}));
add('ar-stp', ar({
  a: 'The volume of a gas is usually compared at STP.',
  r: 'Standard pressure is 273 mm Hg and standard temperature is 760 K.',
  key: 'a',
  sol: 'The assertion is true because volume depends on temperature and pressure. The reason is false: STP is 273 K and 760 mm Hg — option (a).',
  d: 2, c: 'analysis', t: [4],
}));
add('tf-stp', tf({
  stem: 'Standard temperature is 0 °C and standard pressure is 760 mm Hg.',
  key: 't',
  sol: 'True. These are the values of STP.',
  d: 1, c: 'recall', t: [4],
}));
add('term-conv', term({
  stem: 'Write the relation between a temperature t in degrees Celsius and the same temperature T in kelvin.',
  model: '**T = t + 273** (kelvin = Celsius + 273).',
  sol: 'T = t + 273.', sch: 'Relation',
  d: 1, c: 'recall', t: [4],
}));
add('s2-conv', short({
  marks: 2, wl: null,
  stem: `Convert (i) ${M}13 °C to kelvin and (ii) 250 K to degrees Celsius.`,
  model: `(i) ${M}13 + 273 = **${IT.m13K} K**. (ii) 250 − 273 = **${M}${Math.abs(IT.k250C)} °C**.`,
  sol: `${IT.m13K} K; ${IT.k250C} °C.`,
  scheme: [[`${IT.m13K} K`, 1], [`${M}23 °C`, 1]],
  d: 1, c: 'application', t: [4],
}), () => IT.m13K === 260 && IT.k250C === -23 || 'values');
add('s2-stp', short({
  marks: 2,
  stem: 'Why is it necessary to state the temperature and pressure when the volume of a gas is given? State the values of the standard conditions.',
  model: 'The volume of a gas **changes with temperature and pressure**, so it has a meaning only under stated conditions. The standard values are **273 K** and **760 mm Hg**.',
  sol: 'Volume depends on temperature and pressure; 273 K and 760 mm Hg.',
  scheme: [['Volume depends on temperature and pressure', 1], ['273 K and 760 mm Hg', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('num-celsius', num({
  stem: `Liquid nitrogen boils at ${K.CONV.ln2K} K. Express this temperature in degrees Celsius.`,
  value: K.CONV.ln2C, unit: '°C',
  sol: `°C = K − 273 = ${K.CONV.ln2K} − 273 = ${K.CONV.ln2C} °C.`,
  scheme: [[`${M}196 °C`, 1]],
  d: 1, c: 'application', t: [4],
}), (q) => q.answer.value === -196 || 'value');

// ---------------------------------------------------------------- t05 combined gas equation and STP
add('comb-mcq1', mcq({
  stem: "Which equation is obtained by combining Boyle's law and Charles's law for a fixed mass of gas?",
  right: 'P₁V₁/T₁ = P₂V₂/T₂', wrong: ['P₁T₁/V₁ = P₂T₂/V₂', 'P₁V₁T₁ = P₂V₂T₂', 'V₁T₁/P₁ = V₂T₂/P₂'],
  sol: 'PV/T is constant for a fixed mass of gas — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('comb-mcq2', mcq({
  stem: 'A student puts 27 °C and 87 °C directly into V₁/T₁ = V₂/T₂. The main error is that',
  right: 'the temperatures were not changed to kelvin', wrong: ["Charles's law needs constant temperature", 'the volume should be multiplied by the temperature', 'the pressure was not doubled'],
  sol: 'Charles\'s law uses the absolute (kelvin) temperature — option (@K).',
  d: 3, c: 'analysis', t: [3, 5],
}));
add('comb-mcq3', mcq({
  stem: 'A fixed mass of gas at STP is heated to 273 °C at constant pressure. Its volume becomes',
  right: 'twice its volume at STP', wrong: ['half its volume at STP', 'the same as at STP', 'four times its volume at STP'],
  sol: `The kelvin temperature changes from ${K.STP_T} K to ${K.toK(273)} K, a factor of ${IT.STP_WARM_RATIO} — option (@K).`,
  d: 3, c: 'application', t: [5],
}));
add('comb-mcq4', mcq({
  stem: 'The volume of a gas at STP is smaller than its volume at 27 °C and 760 mm Hg because',
  right: 'the temperature at STP is lower', wrong: ['the pressure at STP is higher', 'the mass of gas is smaller at STP', 'the molecules are heavier at STP'],
  sol: 'The pressure is the same (760 mm Hg); only the temperature differs, and 0 °C is lower than 27 °C — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('ar-comb', ar({
  a: "The combined gas equation can be obtained from Boyle's law and Charles's law.",
  r: 'A change of both pressure and temperature can be carried out in two steps, one at constant temperature and one at constant pressure.',
  key: 'c',
  sol: 'Both are true, and the two-step path is exactly how the equation is derived — option (c).',
  d: 3, c: 'analysis', t: [5],
}));
add('term-eq', term({
  stem: 'Write the gas equation that relates the pressure, volume and kelvin temperature of a fixed mass of gas in two states.',
  model: '**P₁V₁/T₁ = P₂V₂/T₂**',
  sol: 'P₁V₁/T₁ = P₂V₂/T₂.', sch: 'Equation',
  d: 1, c: 'recall', t: [5],
}));
add('term-atm', term({
  stem: 'State the standard pressure in mm Hg and in atmospheres.',
  model: '**760 mm Hg**, which is **1 atmosphere**.',
  sol: '760 mm Hg; 1 atmosphere.', sch: 'Both values',
  d: 1, c: 'recall', t: [4, 5],
}));
add('s3-derive', short({
  marks: 3, wl: null,
  stem: "Derive the gas equation P₁V₁/T₁ = P₂V₂/T₂ from Boyle's law and Charles's law.",
  model: "Take the gas from (P₁, V₁, T₁) to (P₂, V₂, T₂) in two steps. **Step 1 (Boyle, constant T₁):** the volume at pressure P₂ is V′ = P₁V₁/P₂. **Step 2 (Charles, constant P₂):** V′/T₁ = V₂/T₂. Eliminating V′ gives **P₁V₁/T₁ = P₂V₂/T₂**.",
  sol: 'Boyle step; Charles step; eliminate V′.',
  scheme: [["Boyle's law step", 1], ["Charles's law step", 1], ['Combines to the gas equation', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('s3-stp-calc', short({
  marks: 3, wl: null,
  stem: `${IT.S3.V1} cm³ of a gas is collected at ${IT.S3.P1} mm Hg and ${IT.S3.T1C} °C. Calculate its volume at STP.`,
  model: `T₁ = ${IT.S3.T1C} + 273 = ${K.toK(IT.S3.T1C)} K. V₀ = P₁V₁ × 273 ÷ (T₁ × 760) = ${IT.S3.P1} × ${IT.S3.V1} × 273 ÷ (${K.toK(IT.S3.T1C)} × 760) = **${IT.S3_V0} cm³**.`,
  sol: `Kelvin conversion; substitution with STP values; ${IT.S3_V0} cm³.`,
  scheme: [['Temperature in kelvin', 1], ['Correct substitution with STP values', 1], [`${IT.S3_V0} cm³`, 1]],
  d: 3, c: 'application', t: [4, 5],
}), () => IT.S3_V0 === 208 || 'v');
add('num-comb-v', num({
  stem: `${K.PG.V1} cm³ of oxygen at ${K.PG.P1} mm Hg and ${K.PG.T1C} °C is taken to ${K.PG.P2} mm Hg and ${K.PG.T2C} °C. Find the new volume.`,
  value: K.PG_V2, unit: 'cm³',
  sol: `T₁ = ${K.toK(K.PG.T1C)} K, T₂ = ${K.toK(K.PG.T2C)} K; V₂ = ${K.PG.P1} × ${K.PG.V1} × ${K.toK(K.PG.T2C)} ÷ (${K.toK(K.PG.T1C)} × ${K.PG.P2}) = ${K.PG_V2} cm³.`,
  scheme: [[`${K.PG_V2} cm³`, 1]],
  d: 3, c: 'application', t: [5],
}), (q) => q.answer.value === 1350 || 'value');
add('num-comb-p', num({
  stem: `${IT.NP.V1} cm³ of neon at ${IT.NP.P1} mm Hg and ${IT.NP.T1C} °C is heated to ${IT.NP.T2C} °C and allowed to occupy ${IT.NP.V2} cm³. Find the final pressure.`,
  value: IT.NP_P2, unit: 'mm Hg',
  sol: `T₁ = ${K.toK(IT.NP.T1C)} K, T₂ = ${K.toK(IT.NP.T2C)} K; P₂ = ${IT.NP.P1} × ${IT.NP.V1} × ${K.toK(IT.NP.T2C)} ÷ (${K.toK(IT.NP.T1C)} × ${IT.NP.V2}) = ${IT.NP_P2} mm Hg.`,
  scheme: [[`${IT.NP_P2} mm Hg`, 1]],
  d: 3, c: 'application', t: [5],
}), (q) => q.answer.value === 950 || 'value');
add('num-stp', num({
  stem: `${K.ST2.V1} cm³ of a gas is collected at ${K.ST2.P1} mm Hg and ${K.ST2.T1C} °C. Find its volume at STP.`,
  value: K.ST2_V0, unit: 'cm³',
  sol: `V₀ = ${K.ST2.P1} × ${K.ST2.V1} × 273 ÷ (${K.toK(K.ST2.T1C)} × 760) = ${K.ST2_V0} cm³.`,
  scheme: [[`${K.ST2_V0} cm³`, 1]],
  d: 3, c: 'application', t: [5],
}), (q) => q.answer.value === 819 || 'value');
add('num-stp-rev', num({
  stem: `${K.RV.V0} cm³ of a gas at STP is taken to ${K.RV.T2C} °C and ${K.RV.P2} mm Hg. Find its new volume.`,
  value: K.RV_V2, unit: 'cm³',
  sol: `V₂ = ${K.STP_P} × ${K.RV.V0} × ${K.toK(K.RV.T2C)} ÷ (${K.STP_T} × ${K.RV.P2}) = ${K.RV_V2} cm³.`,
  scheme: [[`${K.RV_V2} cm³`, 1]],
  d: 3, c: 'application', t: [5],
}), (q) => q.answer.value === 896 || 'value');

// ---------------------------------------------------------------- fill and match
add('fill-5', fill({
  marks: 5,
  stem: "Complete the paragraph. At constant temperature the volume of a fixed mass of gas is (1) ____ proportional to its pressure. At constant pressure its volume is (2) ____ proportional to its (3) ____ temperature. Absolute zero is (4) ____ °C. Standard pressure is (5) ____ mm Hg.",
  acc: [['inversely'], ['directly'], ['kelvin', 'absolute'], ['-273', `${M}273`, 'minus 273'], ['760']],
  sol: 'Inversely; directly; kelvin (absolute); −273; 760.',
  d: 1, c: 'recall', t: [2, 3, 4],
}));
add('match-5', match({
  marks: 5,
  stem: 'Match each term in Column A with the correct item in Column B.',
  pairs: [
    ["Boyle's law", 'P₁V₁ = P₂V₂'],
    ["Charles's law", 'V₁/T₁ = V₂/T₂'],
    ['Absolute zero', `${M}273 °C`],
    ['Standard temperature', '273 K'],
    ['Gas equation', 'P₁V₁/T₁ = P₂V₂/T₂'],
  ],
  order: [3, 0, 2, 1, 4],
  sol: "Boyle: P₁V₁ = P₂V₂; Charles: V₁/T₁ = V₂/T₂; absolute zero: −273 °C; standard temperature: 273 K; gas equation: P₁V₁/T₁ = P₂V₂/T₂.",
  d: 1, c: 'recall', t: [2, 3, 4, 5],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('boyle-long', long({
  marks: 10, wl: null,
  stem: `A student traps a fixed mass of nitrogen under a piston in a cylinder kept in a water bath and notes the pressure at several volumes, keeping the temperature constant.\n\n${tbl(['Volume V (cm³)', ...K.BOYLE_V.map(String)], [['Pressure P (mm Hg)', ...K.BOYLE_P.map(String)]])}\n\n(a) Calculate P × V for each reading and state what the results show. [3]\n\n(b) State Boyle's law. [2]\n\n(c) Calculate the pressure of the gas when its volume is 75 cm³. [2]\n\n(d) Name the shape of the graph of (i) P against V, (ii) P against 1/V. [2]\n\n(e) Why must the temperature be kept constant? [1]`,
  model: `**(a)** P × V = ${K.BOYLE_PV.join(', ')} for the five readings: it is **constant** (${K.BOYLE_K} mm Hg cm³). So P is **inversely proportional** to V.\n\n**(b)** For a **fixed mass of gas at constant temperature** the volume varies **inversely** with the pressure.\n\n**(c)** P = ${K.BOYLE_K} ÷ 75 = **${K.BOYLE_V75_P} mm Hg**.\n\n**(d)** (i) A **curve** (never meeting the axes). (ii) A **straight line through the origin**.\n\n**(e)** The pressure and volume of a gas also change with temperature, so the relation holds only at constant temperature.`,
  sol: `Products ${K.BOYLE_K} each time; law; ${K.BOYLE_V75_P} mm Hg; curve and straight line; temperature affects volume.`,
  scheme: [['Five products found', 1], ['Products are equal', 1], ['P inversely proportional to V', 1], ['Fixed mass and constant temperature', 1], ['Volume inversely proportional to pressure', 1], ['Substitution', 1], [`${K.BOYLE_V75_P} mm Hg`, 1], ['Curve for P against V', 1], ['Straight line through origin for P against 1/V', 1], ['Temperature also changes the volume', 1]],
  d: 3, c: 'application', t: [2],
}), () => K.BOYLE_V75_P === 160 || 'p');
add('charles-long', long({
  marks: 10, wl: null,
  stem: `A fixed mass of gas is heated at constant pressure and its volume is read at four temperatures.\n\n${tbl(['Temperature t (°C)', ...K.CH_C.map(sgn)], [['Volume V (cm³)', ...K.CH_V.map(String)]])}\n\n(a) Express the four temperatures in kelvin. [2]\n\n(b) Calculate V/T for each reading and state what you conclude. [3]\n\n(c) State Charles's law. [2]\n\n(d) A graph of V against t is drawn through these points and extended backwards to zero volume. State the temperature at which it meets the axis and the name given to it. [2]\n\n(e) Find the volume of the gas at 0 °C. [1]`,
  model: `**(a)** ${K.CH_C.map((c, i) => `${sgn(c)} °C = ${K.CH_K[i]} K`).join('; ')}.\n\n**(b)** V/T = ${K.CH_V.map((v, i) => `${v}/${K.CH_K[i]}`).join(', ')} = **${K.CH_RATIO[0]} cm³ per K** each time. So V is **directly proportional to T** (kelvin).\n\n**(c)** For a **fixed mass of gas at constant pressure**, the volume is **directly proportional to the kelvin temperature**.\n\n**(d)** It meets the axis at **${M}273 °C**, called **absolute zero** (0 K).\n\n**(e)** At 273 K: V = ${K.CH_SLOPE} × 273 = **${K.CH_V0C} cm³**.`,
  sol: `Kelvin values; V/T = ${K.CH_RATIO[0]}; law; −273 °C absolute zero; ${K.CH_V0C} cm³.`,
  scheme: [['First two conversions', 1], ['All four conversions', 1], ['V/T worked out for the readings', 1], ['V/T found to be constant', 1], ['V proportional to kelvin temperature', 1], ['Constant pressure and fixed mass', 1], ['Directly proportional to kelvin temperature', 1], ['−273 °C', 1], ['Absolute zero', 1], [`${K.CH_V0C} cm³`, 1]],
  d: 3, c: 'application', t: [3, 4],
}), () => K.CH_V0C === 136.5 || 'v0');
add('balloon-long', long({
  marks: 10, wl: null,
  stem: `A weather balloon holds ${K.BAL.V1} dm³ of helium at ${K.BAL.P1} mm Hg and ${K.BAL.T1C} °C. At a great height the pressure is ${K.BAL.P2} mm Hg and the temperature is ${M}33 °C.\n\n(a) Express the two temperatures in kelvin. [2]\n\n(b) Write the gas equation that connects the two states. [1]\n\n(c) Calculate the volume of the balloon at the great height. [3]\n\n(d) What would the volume be if only the pressure had fallen to ${K.BAL.P2} mm Hg and the temperature had stayed at ${K.BAL.T1C} °C? [2]\n\n(e) State whether the fall in pressure and the fall in temperature each increase or decrease the volume. [2]`,
  model: `**(a)** ${K.BAL.T1C} + 273 = **${K.toK(K.BAL.T1C)} K**; ${M}33 + 273 = **${K.toK(K.BAL.T2C)} K**.\n\n**(b)** P₁V₁/T₁ = P₂V₂/T₂.\n\n**(c)** V₂ = P₁V₁T₂ ÷ (T₁P₂) = ${K.BAL.P1} × ${K.BAL.V1} × ${K.toK(K.BAL.T2C)} ÷ (${K.toK(K.BAL.T1C)} × ${K.BAL.P2}) = **${K.BAL_V2} dm³**.\n\n**(d)** V = ${K.BAL.P1} × ${K.BAL.V1} ÷ ${K.BAL.P2} = **${K.BAL_BOYLE_STEP} dm³**.\n\n**(e)** The **fall in pressure increases** the volume (${K.BAL.V1} to ${K.BAL_BOYLE_STEP} dm³); the **fall in temperature decreases** it (${K.BAL_BOYLE_STEP} to ${K.BAL_V2} dm³).`,
  sol: `${K.toK(K.BAL.T1C)} K and ${K.toK(K.BAL.T2C)} K; gas equation; ${K.BAL_V2} dm³; ${K.BAL_BOYLE_STEP} dm³; pressure fall raises and temperature fall lowers the volume.`,
  scheme: [['First temperature in kelvin', 1], ['Second temperature in kelvin', 1], ['Gas equation', 1], ['Substitution', 1], ['Rearranged for V₂', 1], [`${K.BAL_V2} dm³`, 1], ['Boyle step working', 1], [`${K.BAL_BOYLE_STEP} dm³`, 1], ['Pressure fall increases volume', 1], ['Temperature fall decreases volume', 1]],
  d: 3, c: 'application', t: [4, 5],
}), () => K.BAL_V2 === 32 && K.BAL_BOYLE_STEP === 40 || 'balloon');
add('apparatus-long', long({
  marks: 10, wl: null,
  stem: `The diagram shows an apparatus used to study how the volume of a fixed mass of gas changes when the load on the piston is changed. The parts are lettered A to E.\n\n(a) Name the parts A, C and E. [3]\n\n(b) Why is the cylinder kept in E? [1]\n\n(c) The load on A is increased. State the change in the volume of B and explain it using molecules. [3]\n\n(d) The gas has a volume of ${IT.APP.V1} cm³ at ${IT.APP.P1} mm Hg. Find its volume when the load raises the pressure to ${IT.APP.P2} mm Hg. [2]\n\n(e) If the load is kept fixed and the water in E is warmed, what happens to the volume of B? [1]`,
  model: `**(a)** A: **piston with load**. C: **thermometer**. E: **water bath**.\n\n**(b)** To keep the **temperature of the gas constant**.\n\n**(c)** The volume **decreases**. The same molecules are in a **smaller space**, so they strike **each unit area of wall more often**, which balances the greater pressure.\n\n**(d)** V₂ = ${IT.APP.P1} × ${IT.APP.V1} ÷ ${IT.APP.P2} = **${IT.APP_V2} cm³**.\n\n**(e)** The volume **increases**.`,
  sol: `Piston with load, thermometer, water bath; constant temperature; volume falls, more collisions per unit area; ${IT.APP_V2} cm³; volume increases.`,
  scheme: [['A named', 1], ['C named', 1], ['E named', 1], ['Constant temperature', 1], ['Volume decreases', 1], ['Same molecules in smaller space', 1], ['More collisions per unit area', 1], ['Substitution', 1], [`${IT.APP_V2} cm³`, 1], ['Volume increases on warming', 1]],
  d: 3, c: 'application', t: [1, 2, 3],
  assets: [appFig],
}), () => IT.APP_V2 === 150 || 'v2');
add('stp-long', long({
  marks: 10, wl: null,
  stem: `A student working in a hill-station laboratory collects ${K.ST2.V1} cm³ of a gas at ${K.ST2.T1C} °C and ${K.ST2.P1} mm Hg.\n\n(a) State the values of standard temperature and pressure. [2]\n\n(b) Express the laboratory temperature in kelvin. [1]\n\n(c) Calculate the volume of the gas at STP. [3]\n\n(d) The gas at STP is then warmed to 273 °C at constant pressure. Find its volume. [2]\n\n(e) Explain why the volume in (c) is smaller than the volume collected. [2]`,
  model: `**(a)** **273 K** (0 °C) and **760 mm Hg** (1 atmosphere).\n\n**(b)** ${K.ST2.T1C} + 273 = **${K.toK(K.ST2.T1C)} K**.\n\n**(c)** V₀ = ${K.ST2.P1} × ${K.ST2.V1} × 273 ÷ (${K.toK(K.ST2.T1C)} × 760) = **${K.ST2_V0} cm³**.\n\n**(d)** ${K.ST2_V0} × ${K.toK(273)} ÷ ${K.STP_T} = **${K.ST2_WARM} cm³**.\n\n**(e)** Two changes act: the pressure at STP is **higher** (760 against ${K.ST2.P1} mm Hg) and the temperature at STP is **lower** (273 against ${K.toK(K.ST2.T1C)} K). Both **reduce** the volume.`,
  sol: `273 K and 760 mm Hg; ${K.toK(K.ST2.T1C)} K; ${K.ST2_V0} cm³; ${K.ST2_WARM} cm³; higher pressure and lower temperature both reduce the volume.`,
  scheme: [['273 K', 1], ['760 mm Hg', 1], ['Kelvin temperature', 1], ['Substitution with STP values', 1], ['Rearranged correctly', 1], [`${K.ST2_V0} cm³`, 1], ['Kelvin ratio used', 1], [`${K.ST2_WARM} cm³`, 1], ['Higher pressure at STP', 1], ['Lower temperature at STP', 1]],
  d: 3, c: 'application', t: [4, 5],
}), () => K.ST2_V0 === 819 && K.ST2_WARM === 1638 || 'stp');
add('graph-long', long({
  marks: 10, wl: null,
  stem: `The graph shows the pressure of a fixed mass of a gas at different volumes at constant temperature.\n\n(a) Name the law the graph illustrates and use two points to show that the data obey it. [3]\n\n(b) From the graph, read the pressure at 30 cm³ and the volume at 150 mm Hg. [2]\n\n(c) Using the law, calculate the pressure when the volume is reduced to 18 cm³. [2]\n\n(d) Describe the graph obtained by plotting P against 1/V for the same gas. [1]\n\n(e) The experiment is repeated at a higher temperature. State how the position of the curve changes and explain with molecules. [2]`,
  model: `**(a)** **Boyle's law**. At ${IT.G2[1][0]} cm³ the pressure is ${IT.G2[1][1]} mm Hg, so P × V = ${IT.G2[1][0] * IT.G2[1][1]}; at ${IT.G2[3][0]} cm³ it is ${IT.G2[3][1]} mm Hg, so P × V = ${IT.G2[3][0] * IT.G2[3][1]}. The products are **equal**.\n\n**(b)** At 30 cm³: **${IT.G2_P30} mm Hg**; at 150 mm Hg: **${IT.G2_V150} cm³**.\n\n**(c)** P = ${IT.G2_K} ÷ 18 = **${IT.G2_P18} mm Hg**.\n\n**(d)** A **straight line through the origin**.\n\n**(e)** The curve lies **higher** (more pressure at each volume), because the molecules move **faster** and hit the walls harder and more often.`,
  sol: `Boyle's law with equal products; ${IT.G2_P30} mm Hg and ${IT.G2_V150} cm³; ${IT.G2_P18} mm Hg; straight line through the origin; curve moves up.`,
  scheme: [["Boyle's law named", 1], ['Two products worked out', 1], ['Products shown equal', 1], [`${IT.G2_P30} mm Hg`, 1], [`${IT.G2_V150} cm³`, 1], ['Substitution', 1], [`${IT.G2_P18} mm Hg`, 1], ['Straight line through the origin', 1], ['Curve moves higher', 1], ['Faster molecules, harder and more frequent hits', 1]],
  d: 3, c: 'application', t: [1, 2],
  assets: [g2Fig],
}), () => IT.G2_P18 === 500 || 'p18');
