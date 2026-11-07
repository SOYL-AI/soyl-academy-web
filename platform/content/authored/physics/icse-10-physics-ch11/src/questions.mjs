// ICSE 10 Physics ch11 Calorimetry — question bank (ICSE 2027 specimen style).
// Every numerical value is computed here and asserted by a re-solve check. c(water) = 4200 J kg⁻¹ K⁻¹, L(ice) = 336 000 J kg⁻¹.
import { mk, add, r, near } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const f = (x, n = 3) => String(Number(x.toPrecision(n)));
const CW = 4200;
const CI = 2100;
const L = 336000;

// ---------------------------------------------------------------- t01 heat, temperature, C and c
const q1 = 0.5 * CW * 30;
add('qmc-mcq', mcq({
  stem: 'How much heat is needed to raise the temperature of 500 g of water in a kettle from 20 °C to 50 °C?',
  right: `${q1} J`,
  wrong: ['63 000 000 J', '2100 J', '126 000 J'],
  sol: `$Q = mc\\Delta T = 0.5 \\times 4200 \\times 30 = ${q1}$ J — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => q1 === 63000 || 'Q');
add('unitc-mcq', mcq({
  stem: 'The SI unit of specific heat capacity is:',
  right: 'J kg⁻¹ K⁻¹',
  wrong: ['J K⁻¹', 'J kg⁻¹', 'cal °C⁻¹'],
  sol: 'Heat per unit mass per kelvin — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('heattemp-mcq', mcq({
  stem: 'A bathtub of warm water at 40 °C and a cup of tea at 90 °C are compared. Which statement is correct?',
  right: 'The tea is at a higher temperature, but the bathtub water contains more heat energy',
  wrong: ['The tea contains more heat because it is hotter', 'Both contain the same heat', 'The bathtub water is at the higher temperature'],
  sol: 'Heat depends on mass as well as temperature — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
const cAl = 900;
const dT = 18000 / (0.5 * cAl);
add('alrise-mcq', mcq({
  stem: 'A 0.5 kg aluminium pan (c = 900 J kg⁻¹ K⁻¹) absorbs 18 000 J of heat. Its temperature rises by:',
  right: `${f(dT)} °C`,
  wrong: ['20 °C', '4 °C', '400 °C'],
  sol: `$\\Delta T = Q/(mc) = 18000 \\div (0.5 \\times 900) = ${f(dT)}$ °C — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => dT === 40 || 'dT');
const C1 = 2 * 400;
add('capacity-num', num({
  stem: 'What is the heat capacity, in J K⁻¹, of a 2 kg copper block? (c of copper = 400 J kg⁻¹ K⁻¹)',
  value: C1, tol: 0, unit: 'J K⁻¹',
  sol: `$C = mc = 2 \\times 400 = ${C1}$ J K⁻¹.`,
  scheme: [[`${C1} J K⁻¹`, 1]],
  d: 1, c: 'application', t: [1],
}), () => C1 === 800 || 'C');
const q2 = 1.5 * CW * (100 - 25);
add('kettle-num', num({
  stem: 'Find the heat (in J) needed to bring 1.5 kg of water from 25 °C to its boiling point 100 °C.',
  value: q2, tol: 0, unit: 'J',
  sol: `$Q = mc\\Delta T = 1.5 \\times 4200 \\times 75 = ${q2}$ J.`,
  scheme: [[`${q2} J`, 1]],
  d: 2, c: 'application', t: [1],
}), () => q2 === 472500 || 'Q');
const cX = 7200 / (0.2 * 40);
add('findc-num', num({
  stem: 'A 200 g block of an unknown metal absorbs 7200 J and warms by 40 °C. Find its specific heat capacity in J kg⁻¹ K⁻¹.',
  value: cX, tol: 0, unit: 'J kg⁻¹ K⁻¹',
  sol: `$c = Q/(m\\Delta T) = 7200 \\div (0.2 \\times 40) = ${f(cX)}$ J kg⁻¹ K⁻¹.`,
  scheme: [[`${f(cX)} J kg⁻¹ K⁻¹`, 1]],
  d: 2, c: 'application', t: [1],
}), () => cX === 900 || 'c');
add('cap-ar', ar({
  a: 'A large iron pot has a greater heat capacity than a small iron spoon.',
  r: 'Heat capacity depends on the mass of the body as well as on the material.',
  key: 'c',
  sol: 'Both are true, and R explains A (C = mc) — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('cap-tf', tf({
  stem: 'Specific heat capacity of a substance depends on the mass of the sample.',
  key: 'f',
  sol: 'False: it is a property of the material; heat capacity depends on mass.',
  d: 1, c: 'understanding', t: [1],
}));
add('relation-fill', fill({
  stem: 'Heat capacity = mass × specific heat ___.',
  acc: [['capacity']],
  sol: '**Capacity** (C = mc).',
  d: 1, c: 'recall', t: [1],
}));
add('kelvin-fill', fill({
  stem: 'The SI unit of temperature is the ___.',
  acc: [['kelvin', 'K']],
  sol: '**Kelvin**.',
  d: 1, c: 'recall', t: [1],
}));
add('cdef-short1', short({
  marks: 1,
  stem: 'Define specific heat capacity.',
  model: 'The heat needed to raise the temperature of unit mass (1 kg) of a substance through 1 K (1 °C).',
  sol: 'Definition.',
  scheme: [['Definition', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('cap-short2', short({
  marks: 2,
  stem: 'Distinguish between heat capacity and specific heat capacity, giving the SI unit of each.',
  model: 'Heat capacity: heat needed to raise the temperature of a whole body by 1 K; depends on mass and material; unit J K⁻¹. Specific heat capacity: heat needed for 1 kg of a substance per 1 K; depends only on the material; unit J kg⁻¹ K⁻¹.',
  sol: 'Whole body vs unit mass; units.',
  scheme: [['Difference', 1], ['Units', 1]],
  d: 1, c: 'understanding', t: [1],
}));
const qPan = 0.8 * 900 * 60 + 1.2 * CW * 60;
add('pan-short3', short({
  marks: 3,
  stem: 'An aluminium pan of mass 0.8 kg contains 1.2 kg of water at 30 °C. Both are heated to 90 °C. (c of aluminium = 900 J kg⁻¹ K⁻¹.) Calculate (a) the heat taken by the pan, (b) the heat taken by the water and (c) the total heat supplied.',
  model: `(a) $0.8 \\times 900 \\times 60 = ${0.8 * 900 * 60}$ J. (b) $1.2 \\times 4200 \\times 60 = ${1.2 * CW * 60}$ J. (c) $${0.8 * 900 * 60} + ${1.2 * CW * 60} = ${qPan}$ J.`,
  sol: `${0.8 * 900 * 60} J; ${1.2 * CW * 60} J; ${qPan} J.`,
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [1],
}), () => qPan === 43200 + 302400 || 'Q');

// ---------------------------------------------------------------- t02 method of mixtures
const T1 = (0.3 * 90 + 0.6 * 30) / 0.9;
add('mix-mcq', mcq({
  stem: '300 g of water at 90 °C is poured into 600 g of water at 30 °C. Ignoring heat losses, the final temperature is:',
  right: `${f(T1)} °C`,
  wrong: ['60 °C', '45 °C', '70 °C'],
  sol: `$0.3(90 - T) = 0.6(T - 30)$, so $T = ${f(T1)}$ °C — option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => near(T1, 50) || 'T');
add('mixprin-mcq', mcq({
  stem: 'The principle of the method of mixtures assumes that:',
  right: 'no heat is exchanged with the surroundings',
  wrong: ['the two bodies have the same specific heat capacity', 'the two bodies have equal masses', 'the final temperature is the average of the two'],
  sol: 'Only then is heat lost = heat gained — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
const Tcu = (0.2 * 400 * 100 + 0.5 * CW * 20) / (0.2 * 400 + 0.5 * CW);
add('cu-mcq', mcq({
  stem: 'A 200 g copper ball at 100 °C is dropped into 500 g of water at 20 °C (c of copper = 400 J kg⁻¹ K⁻¹; ignore the container). The final temperature is about:',
  right: `${f(Tcu, 3)} °C`,
  wrong: ['60.0 °C', '34.2 °C', '20.0 °C'],
  sol: `$0.2 \\times 400 (100 - T) = 0.5 \\times 4200 (T - 20)$ gives $T \\approx ${f(Tcu, 3)}$ °C — option (@K).`,
  d: 3, c: 'application', t: [2],
}), () => near(Tcu, 22.9, 0.01) || 'T');
const Tf = (2 * 70 + 3 * 20) / 5;
add('bath-num', num({
  stem: 'To prepare a bath, 2 kg of water at 70 °C is mixed with 3 kg of water at 20 °C. Find the final temperature in °C (no heat loss).',
  value: Tf, tol: 0, unit: '°C',
  sol: `$2(70 - T) = 3(T - 20)$, so $140 + 60 = 5T$ and $T = 200 \\div 5 = ${f(Tf)}$ °C.`,
  scheme: [[`${f(Tf)} °C`, 1]],
  d: 2, c: 'application', t: [2],
}), () => Tf === 40 || 'T');
const cM = (0.4 * CW * 6) / (0.2 * (100 - 26));
add('metalc-num', num({
  stem: 'A 0.2 kg piece of metal at 100 °C is placed in 0.4 kg of water at 20 °C. The final temperature is 26 °C. Neglecting the container, find the specific heat capacity of the metal in J kg⁻¹ K⁻¹ (to 3 significant figures).',
  value: Number(cM.toPrecision(3)), tol: 2, unit: 'J kg⁻¹ K⁻¹',
  sol: `Heat gained by water $= 0.4 \\times 4200 \\times 6 = ${0.4 * CW * 6}$ J; heat lost by metal $= 0.2 \\times c \\times 74$; so $c = ${0.4 * CW * 6} \\div 14.8 \\approx ${f(cM)}$ J kg⁻¹ K⁻¹.`,
  scheme: [[`about ${f(cM)} J kg⁻¹ K⁻¹`, 1]],
  d: 3, c: 'application', t: [2],
}), () => near(cM, 681, 0.002) || 'c');
add('mix-ar', ar({
  a: 'When equal masses of water at 20 °C and 80 °C are mixed, the final temperature is 50 °C.',
  r: 'Heat lost by the hot water equals heat gained by the cold water, and both have the same specific heat capacity.',
  key: 'c',
  sol: 'Both are true, and R explains A — option (c).',
  d: 2, c: 'application', t: [2],
}));
add('calor-tf', tf({
  stem: 'A calorimeter is usually made of copper because copper has a high specific heat capacity.',
  key: 'f',
  sol: 'False: copper is used because it is a good conductor with a low specific heat capacity, so it takes little of the heat.',
  d: 2, c: 'understanding', t: [2],
}));
add('mix-fill', fill({
  stem: 'In the method of mixtures, heat lost by the hot body = heat ___ by the cold body.',
  acc: [['gained']],
  sol: '**Gained**.',
  d: 1, c: 'recall', t: [2],
}));
add('principle-short1', short({
  marks: 1,
  stem: 'State the principle of the method of mixtures.',
  model: 'If no heat is exchanged with the surroundings, the heat lost by the hot body is equal to the heat gained by the cold body.',
  sol: 'Statement.',
  scheme: [['Statement with the condition', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('calor-short2', short({
  marks: 2,
  stem: 'Give two reasons why a calorimeter is made of thin, polished copper and kept in an insulating jacket.',
  model: 'Copper is a good conductor with a low specific heat capacity, so the vessel quickly reaches the mixture’s temperature and takes little heat; polishing (and the insulating jacket) reduces heat loss by radiation and by conduction and convection to the surroundings.',
  sol: 'Low c, good conductor; reduced losses.',
  scheme: [['Copper', 1], ['Polish and jacket', 1]],
  d: 2, c: 'understanding', t: [2],
}));
const Tcal = (0.1 * 500 * 100 + 0.3 * CW * 20 + 0.1 * 400 * 20) / (0.1 * 500 + 0.3 * CW + 0.1 * 400);
add('calmix-short3', short({
  marks: 3,
  stem: 'A 100 g iron nail (c = 500 J kg⁻¹ K⁻¹) at 100 °C is dropped into a 100 g copper calorimeter (c = 400 J kg⁻¹ K⁻¹) containing 300 g of water at 20 °C. Write the heat-balance equation and find the final temperature to one decimal place.',
  model: `Heat lost by nail $= 0.1 \\times 500 \\times (100 - T)$; heat gained $= (0.3 \\times 4200 + 0.1 \\times 400)(T - 20)$. So $50(100 - T) = 1300(T - 20)$, giving $1350T = 31000$ and $T \\approx ${f(Tcal, 3)}$ °C.`,
  sol: `Heat balance; about ${f(Tcal, 3)} °C.`,
  scheme: [['Heat lost', 1], ['Heat gained (water + calorimeter)', 1], ['Answer', 1]],
  d: 4, c: 'analysis', t: [2],
}), () => near(Tcal, 22.96, 0.001) || 'T');

// ---------------------------------------------------------------- t03 high c of water
add('water-mcq', mcq({
  stem: 'Coastal towns such as Mumbai have a smaller difference between day and night temperatures than inland deserts such as Jaisalmer. This is mainly because:',
  right: 'the sea has a high specific heat capacity, so it warms and cools slowly',
  wrong: ['sand has a high specific heat capacity', 'the sea reflects all sunlight', 'water has a low specific heat capacity'],
  sol: 'Water moderates the temperature of nearby land — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('breeze-mcq', mcq({
  stem: 'On a sunny afternoon at the seaside, the breeze at ground level blows:',
  right: 'from the sea to the land, because the land heats up faster',
  wrong: ['from the land to the sea, because the sea heats up faster', 'from the land to the sea, because the land heats up faster', 'in no fixed direction'],
  sol: 'Warm air rises over the land and cooler sea air flows in — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('frost-mcq', mcq({
  stem: 'On frosty nights, farmers in Himachal sometimes flood their fields with water. This protects the crops because:',
  right: 'water gives out a lot of heat as it cools, keeping the field warmer',
  wrong: ['water has a low specific heat capacity', 'water absorbs heat from the crops', 'water stops all air from reaching the crops'],
  sol: 'High c: much heat released per degree of cooling — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('coolant-ar', ar({
  a: 'Water is used as a coolant in car radiators.',
  r: 'Water has a low specific heat capacity, so it heats up quickly.',
  key: 'a',
  sol: 'A is true; R is false: water has a high specific heat capacity, so it absorbs much heat for a small rise — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('bottle-tf', tf({
  stem: 'A hot-water bottle stays warm for a long time because water has a high specific heat capacity.',
  key: 't',
  sol: 'True: it releases a lot of heat for each degree it cools.',
  d: 1, c: 'understanding', t: [3],
}));
add('water-short2', short({
  marks: 2,
  stem: 'Explain why (a) a sea breeze blows during the day and (b) water is used in hot-water bottles.',
  model: '(a) Land has a much lower specific heat capacity than sea water, so by day it heats faster; warm air above the land rises and cooler air from the sea flows in. (b) Water has a high specific heat capacity, so it gives out a large amount of heat as it cools, keeping the bottle warm for long.',
  sol: 'Land heats faster; high c.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- t04 change of state, heating curve, latent heat
add('melt-mcq', mcq({
  stem: 'How much heat is needed to melt 150 g of ice at 0 °C into water at 0 °C?',
  right: `${0.15 * L} J`,
  wrong: ['50 400 000 J', '630 J', '18 900 J'],
  sol: `$Q = mL = 0.15 \\times 336000 = ${0.15 * L}$ J — option (@K).`,
  d: 2, c: 'application', t: [4],
}), () => 0.15 * L === 50400 || 'Q');
add('curve-mcq', mcq({
  stem: 'On the heating curve of ice heated steadily, the temperature stays at 0 °C for some time because:',
  right: 'the heat supplied is used to change ice into water, not to raise the temperature',
  wrong: ['the heater is switched off', 'ice has a very low specific heat capacity', 'heat is lost to the surroundings at exactly the same rate'],
  sol: 'Latent heat of fusion is absorbed — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('length-mcq', mcq({
  stem: 'On the heating curve of 1 kg of ice from −10 °C at constant power, the melting part (at 0 °C) is much longer than the ice-warming part because:',
  right: 'melting 1 kg needs 336 000 J, while warming the ice by 10 °C needs only 21 000 J',
  wrong: ['ice has a higher specific heat capacity than water', 'the heater power falls during melting', 'the thermometer cannot read below 0 °C'],
  sol: 'mL ≫ m c_ice ΔT — option (@K).',
  d: 3, c: 'analysis', t: [4],
}), () => 1 * CI * 10 === 21000 || 'Q');
const mIce = 168000 / L;
add('icemass-num', num({
  stem: 'A freezer removes 168 000 J of heat from water at 0 °C. What mass of ice (in kg) is formed?',
  value: mIce, tol: 0, unit: 'kg',
  sol: `$m = Q/L = 168000 \\div 336000 = ${f(mIce)}$ kg.`,
  scheme: [[`${f(mIce)} kg`, 1]],
  d: 2, c: 'application', t: [4],
}), () => mIce === 0.5 || 'm');
const qTot = 0.2 * CI * 5 + 0.2 * L;
add('icewarm-num', num({
  stem: 'Find the total heat (in J) needed to change 200 g of ice at −5 °C into water at 0 °C. (c of ice = 2100 J kg⁻¹ K⁻¹; L = 336 000 J kg⁻¹)',
  value: qTot, tol: 0, unit: 'J',
  sol: `Warm the ice: $0.2 \\times 2100 \\times 5 = ${0.2 * CI * 5}$ J; melt it: $0.2 \\times 336000 = ${0.2 * L}$ J; total $= ${qTot}$ J.`,
  scheme: [[`${qTot} J`, 1]],
  d: 3, c: 'application', t: [4],
}), () => qTot === 2100 + 67200 || 'Q');
const Tmix2 = (0.3 * CW * 50 - 0.06 * L) / ((0.3 + 0.06) * CW);
add('icedrink-num', num({
  stem: '60 g of ice at 0 °C is added to 300 g of lemonade (treat as water) at 50 °C. Find the final temperature in °C, to one decimal place, assuming no heat loss.',
  value: Number(Tmix2.toFixed(1)), tol: 0.1, unit: '°C',
  sol: `Heat gained $= 0.06 \\times 336000 + 0.06 \\times 4200 T$; heat lost $= 0.3 \\times 4200 (50 - T)$. So $20160 + 252T = 63000 - 1260T$, giving $1512T = 42840$, so $T = 42840 \\div 1512 \\approx ${Tmix2.toFixed(1)}$ °C.`,
  scheme: [[`about ${Tmix2.toFixed(1)} °C`, 1]],
  d: 4, c: 'analysis', t: [4],
}), () => near(Tmix2, 28.33, 0.001) || 'T');
add('latent-ar', ar({
  a: 'The temperature of a mixture of ice and water stays at 0 °C while it is being heated, until all the ice melts.',
  r: 'Heat absorbed during melting is used to overcome the forces holding the molecules in fixed positions.',
  key: 'c',
  sol: 'Both are true, and R explains A — option (c).',
  d: 2, c: 'understanding', t: [4],
}));
add('latent-tf', tf({
  stem: 'Water at 0 °C gives out heat when it freezes into ice at 0 °C.',
  key: 't',
  sol: 'True: it gives out its latent heat of fusion.',
  d: 1, c: 'understanding', t: [4],
}));
add('L-fill', fill({
  stem: 'The specific latent heat of fusion of ice is 336 ___ (unit, per gram). (Write the unit symbol.)',
  acc: [['J g⁻¹', 'J/g', 'J g-1', 'joule per gram']],
  sol: '**J g⁻¹** (336 000 J kg⁻¹).',
  d: 2, c: 'recall', t: [4],
}));
add('latentdef-short1', short({
  marks: 1,
  stem: 'Define specific latent heat of fusion.',
  model: 'The heat energy needed to change unit mass (1 kg) of a solid at its melting point into liquid at the same temperature.',
  sol: 'Definition.',
  scheme: [['Definition with “same temperature”', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('curve-short2', short({
  marks: 2,
  stem: 'Sketch (or describe) the heating curve of ice at −10 °C heated until it is water at 100 °C, labelling the part where latent heat is absorbed.',
  model: 'Temperature rises from −10 °C to 0 °C (ice warming); stays constant at 0 °C for a long time (ice melting — latent heat of fusion absorbed); then rises steadily from 0 °C to 100 °C (water warming).',
  sol: 'Rise, flat at 0 °C, rise.',
  scheme: [['Three stages in order', 1], ['Flat part labelled as latent heat', 1]],
  d: 2, c: 'understanding', t: [4],
}));

// ---------------------------------------------------------------- t05 everyday latent heat
add('icecool-mcq', mcq({
  stem: 'Ice at 0 °C cools a glass of juice more than the same mass of ice-cold water at 0 °C because:',
  right: 'each gram of ice must absorb 336 J from the juice just to melt',
  wrong: ['ice is colder than water at 0 °C', 'ice has a higher specific heat capacity than water', 'water at 0 °C gives heat to the juice'],
  sol: 'Latent heat of fusion is taken from the juice — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('snow-mcq', mcq({
  stem: 'Snow on the Himalayas melts slowly through summer, so the Ganga keeps flowing. This is because:',
  right: 'snow needs a large amount of latent heat to melt',
  wrong: ['snow has a high melting point', 'sunlight cannot reach the snow', 'snow has a low specific heat capacity'],
  sol: 'Large L means slow melting for the heat received — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('cellar-tf', tf({
  stem: 'A tub of water kept in a cellar on a freezing night helps protect stored vegetables, because the water gives out latent heat as it freezes.',
  key: 't',
  sol: 'True.',
  d: 2, c: 'application', t: [5],
}));
add('fusion-fill', fill({
  stem: 'Heat absorbed during melting without any rise in temperature is called latent heat of ___.',
  acc: [['fusion']],
  sol: '**Fusion**.',
  d: 1, c: 'recall', t: [5],
}));
const extra = 0.1 * L;
add('ice-short2', short({
  marks: 2,
  stem: 'Show by calculation how much more heat 100 g of ice at 0 °C can take from a drink, compared with 100 g of water at 0 °C, before each reaches 0 °C as water.',
  model: `Ice must melt first: $Q = mL = 0.1 \\times 336000 = ${extra}$ J; water at 0 °C is already liquid and absorbs nothing to reach the same state. So the ice takes ${extra} J more.`,
  sol: `${extra} J more.`,
  scheme: [['Q = mL', 1], ['Comparison', 1]],
  d: 3, c: 'application', t: [5],
}), () => extra === 33600 || 'Q');

// ---------------------------------------------------------------- additional items
add('calorie-mcq', mcq({
  stem: 'The heat needed to raise the temperature of 1 g of water by 1 °C is:',
  right: '1 calorie, about 4.2 J',
  wrong: ['1 joule', '4200 J', '1 kilocalorie'],
  sol: 'Definition of the calorie — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('sand-mcq', mcq({
  stem: '1 kg of dry sand (c = 840 J kg⁻¹ K⁻¹) and 1 kg of sea water (c ≈ 4200 J kg⁻¹ K⁻¹) each absorb the same heat from the Sun. The sand warms up:',
  right: 'about five times as much as the water',
  wrong: ['by the same amount', 'about one-fifth as much', 'not at all'],
  sol: 'ΔT = Q/(mc): 4200 ÷ 840 = 5 — option (@K).',
  d: 3, c: 'analysis', t: [3],
}), () => 4200 / 840 === 5 || 'ratio');
const qc = 3 * CW * 50;
add('cool-num', num({
  stem: 'How much heat (in J) is given out when 3 kg of water cools from 80 °C to 30 °C?',
  value: qc, tol: 0, unit: 'J',
  sol: `$Q = mc\\Delta T = 3 \\times 4200 \\times 50 = ${qc}$ J.`,
  scheme: [[`${qc} J`, 1]],
  d: 1, c: 'application', t: [1],
}), () => qc === 630000 || 'Q');
const mm = 25200 / L;
add('meltmass-num', num({
  stem: 'A hair-dryer supplies 25 200 J of heat to a block of ice at 0 °C. What mass of ice (in kg) melts?',
  value: mm, tol: 0, unit: 'kg',
  sol: `$m = Q/L = 25200 \\div 336000 = ${f(mm)}$ kg.`,
  scheme: [[`${f(mm)} kg`, 1]],
  d: 2, c: 'application', t: [4],
}), () => mm === 0.075 || 'm');
add('boil-tf', tf({
  stem: 'While pure water is boiling at normal pressure, its temperature keeps rising as heat is supplied.',
  key: 'f',
  sol: 'False: it stays at 100 °C; the heat is used to change the state.',
  d: 1, c: 'understanding', t: [4],
}));
add('mp-fill', fill({
  stem: 'At normal atmospheric pressure, pure ice melts at ___ °C.',
  acc: [['0', 'zero']],
  sol: '**0 °C**.',
  d: 1, c: 'recall', t: [4],
}));
add('pond-short2', short({
  marks: 2,
  stem: 'Explain why (a) a pond takes a long time to freeze completely in winter and (b) a tub of water kept beside stored vegetables protects them on a frosty night.',
  model: '(a) Before the water can turn to ice, a large amount of latent heat of fusion (336 J for every gram) must be removed from it, so freezing is slow. (b) As the water freezes it gives out its latent heat of fusion to the surroundings, keeping the air near the vegetables from falling much below 0 °C.',
  sol: 'Latent heat removed slowly; latent heat released.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'application', t: [5],
}));
add('touch-ar', ar({
  a: 'A lump of ice at 0 °C feels colder to the touch than water at 0 °C.',
  r: 'Melting ice absorbs latent heat from the hand.',
  key: 'c',
  sol: 'Both are true, and R explains A — option (c).',
  d: 2, c: 'understanding', t: [5],
}));
add('Q-short1', short({
  marks: 1,
  stem: 'Write the formula for the heat absorbed by a body of mass m and specific heat capacity c when its temperature rises by ΔT.',
  model: 'Q = m × c × ΔT.',
  sol: 'Q = mcΔT.',
  scheme: [['Formula', 1]],
  d: 1, c: 'recall', t: [1],
}));

// ---------------------------------------------------------------- match items
add('unit-match', match({
  marks: 2,
  stem: 'Match each quantity in Column A with its SI unit in Column B.',
  pairs: [
    ['Heat', 'J'],
    ['Heat capacity', 'J K⁻¹'],
    ['Specific heat capacity', 'J kg⁻¹ K⁻¹'],
    ['Specific latent heat', 'J kg⁻¹'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Heat → J; heat capacity → J K⁻¹; specific heat capacity → J kg⁻¹ K⁻¹; specific latent heat → J kg⁻¹.',
  d: 1, c: 'recall', t: [1, 4],
}));
add('effect-match', match({
  marks: 2,
  stem: 'Match each observation in Column A with its explanation in Column B.',
  pairs: [
    ['Sea breeze by day', 'Land heats faster than the sea'],
    ['Water in car radiators', 'High specific heat capacity'],
    ['Ice cools drinks well', 'Latent heat of fusion'],
    ['Temperature flat while ice melts', 'Change of state'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Sea breeze → land heats faster; radiator → high c; ice cools drinks → latent heat; flat curve → change of state.',
  d: 2, c: 'application', t: [3, 4, 5],
}));

// ---------------------------------------------------------------- 10-mark structured questions
const Tl = (0.25 * 400 * 150 + 0.5 * CW * 25) / (0.25 * 400 + 0.5 * CW);
add('cap-long', long({
  stem: '(a) Distinguish between heat and temperature, giving the SI unit of each. [3]\n\n(b) Define specific heat capacity and write the relation between heat capacity and specific heat capacity. Calculate the heat capacity of 3 kg of water. [3]\n\n(c) A 250 g copper block (c = 400 J kg⁻¹ K⁻¹) at 150 °C is dropped into 500 g of water at 25 °C in an insulated container of negligible heat capacity. (i) Write the heat-balance equation. (ii) Find the final temperature to one decimal place. (iii) State the principle used. [4]',
  model: `(a) Heat is energy that flows from a hotter to a colder body (unit joule); temperature is the degree of hotness that decides the direction of heat flow (unit kelvin).\n\n(b) Heat needed to raise the temperature of 1 kg of a substance by 1 K. $C = mc$; $C = 3 \\times 4200 = ${3 * CW}$ J K⁻¹.\n\n(c) (i) $0.25 \\times 400 \\times (150 - T) = 0.5 \\times 4200 \\times (T - 25)$. (ii) $100(150 - T) = 2100(T - 25)$, so $2200T = 67500$ and $T \\approx ${f(Tl, 3)}$ °C. (iii) Principle of method of mixtures: heat lost = heat gained when no heat is lost to the surroundings.`,
  sol: 'Heat vs temperature; c; mixture.',
  scheme: [['(a)', 3], ['(b) definition and relation', 2], ['(b) calculation', 1], ['(c)(i)', 1], ['(c)(ii)', 2], ['(c)(iii)', 1]],
  d: 3, c: 'application', t: [1, 2],
}), () => near(Tl, 30.68, 0.001) || 'T');
const cU = (0.5 * CW * (24 - 20) + 0.1 * 400 * 4) / (0.2 * (100 - 24));
add('mix-long', long({
  stem: '(a) State the principle of the method of mixtures and the condition for it to hold. [3]\n\n(b) Why is a calorimeter (i) made of copper, (ii) polished and (iii) kept in a wooden box or insulating jacket? [3]\n\n(c) A 200 g metal block at 100 °C is put into a 100 g copper calorimeter (c = 400 J kg⁻¹ K⁻¹) containing 500 g of water at 20 °C. The final temperature is 24 °C. (i) Find the heat gained by the water. (ii) Find the heat gained by the calorimeter. (iii) Find the specific heat capacity of the metal to 3 significant figures. [4]',
  model: `(a) Heat lost by the hot body = heat gained by the cold body, provided no heat is exchanged with the surroundings.\n\n(b) (i) Good conductor with low specific heat capacity, so it quickly takes the mixture’s temperature and absorbs little heat. (ii) To reduce heat loss by radiation. (iii) To reduce loss by conduction and convection.\n\n(c) (i) $0.5 \\times 4200 \\times 4 = ${0.5 * CW * 4}$ J. (ii) $0.1 \\times 400 \\times 4 = ${0.1 * 400 * 4}$ J. (iii) Heat lost by metal $= 0.2 \\times c \\times 76 = ${0.5 * CW * 4 + 0.1 * 400 * 4}$ J, so $c \\approx ${f(cU)}$ J kg⁻¹ K⁻¹.`,
  sol: 'Principle; calorimeter design; specific heat of metal.',
  scheme: [['(a)', 3], ['(b)(i)', 1], ['(b)(ii)', 1], ['(b)(iii)', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 2]],
  d: 3, c: 'application', t: [2],
}), () => near(cU, 563.2, 0.001) || 'c');
add('water-long', long({
  stem: '(a) Water has a high specific heat capacity. Explain how this causes (i) sea breezes by day and (ii) land breezes at night. [3]\n\n(b) Give three other uses or effects of the high specific heat capacity of water. [3]\n\n(c) Equal masses (1 kg) of water and sand each receive 42 000 J. (c of sand = 840 J kg⁻¹ K⁻¹.) (i) Find the rise in temperature of each. (ii) Which gets hotter and by how many times? (iii) Relate this to a beach on a sunny day. [4]',
  model: `(a) (i) By day, land (low c) heats faster than the sea; hot air over land rises and cooler air from the sea blows in at the surface. (ii) At night land cools faster; the sea is warmer, air rises over the sea and air from the land blows towards it.\n\n(b) Any three: coolant in car radiators; hot-water bottles; farmers flood fields on frosty nights; coastal climates are moderate; body temperature stays steady.\n\n(c) (i) Water: $42000 \\div (1 \\times 4200) = 10$ °C. Sand: $42000 \\div (1 \\times 840) = 50$ °C. (ii) Sand, 5 times as much. (iii) On a sunny day the sand becomes far hotter than the sea water.`,
  sol: 'Breezes; uses; comparison.',
  scheme: [['(a)(i)', 1.5], ['(a)(ii)', 1.5], ['(b)', 3], ['(c)(i)', 2], ['(c)(ii)', 1], ['(c)(iii)', 1]],
  d: 2, c: 'understanding', t: [3],
}), () => 42000 / 4200 === 10 && 42000 / 840 === 50 || 'dT');
const qTotal = 0.5 * CI * 10 + 0.5 * L + 0.5 * CW * 100;
add('curve-long', long({
  stem: '(a) What is meant by latent heat? Define specific latent heat of fusion and state its value for ice. [3]\n\n(b) 500 g of ice at −10 °C is heated until it becomes water at 100 °C. (c of ice = 2100 J kg⁻¹ K⁻¹.) Calculate the heat needed (i) to warm the ice to 0 °C, (ii) to melt it and (iii) to warm the water to 100 °C. [3]\n\n(c) (i) Sketch the temperature–time graph for (b) at constant heater power. (ii) Which stage takes the longest? (iii) Why is the temperature constant during melting? (iv) Find the total heat. [4]',
  model: `(a) Heat absorbed or given out during a change of state without a change of temperature. Specific latent heat of fusion: heat needed to change 1 kg of solid at its melting point into liquid at the same temperature; for ice 336 000 J kg⁻¹.\n\n(b) (i) $0.5 \\times 2100 \\times 10 = ${0.5 * CI * 10}$ J. (ii) $0.5 \\times 336000 = ${0.5 * L}$ J. (iii) $0.5 \\times 4200 \\times 100 = ${0.5 * CW * 100}$ J.\n\n(c) (i) Rise from −10 °C to 0 °C; flat at 0 °C; rise to 100 °C. (ii) Warming the water (${0.5 * CW * 100} J), slightly more than melting (${0.5 * L} J). (iii) The heat is used to change the state (separate the molecules), not to raise the temperature. (iv) $${0.5 * CI * 10} + ${0.5 * L} + ${0.5 * CW * 100} = ${qTotal}$ J.`,
  sol: 'Latent heat; three stages; graph.',
  scheme: [['(a)', 3], ['(b)(i)', 1], ['(b)(ii)', 1], ['(b)(iii)', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(c)(iv)', 1]],
  d: 3, c: 'application', t: [4],
}), () => qTotal === 10500 + 168000 + 210000 || 'Q');
const mIce2 = (0.4 * CW * 40) / (L + CW * 10);
add('ice-long', long({
  stem: '(a) Explain why ice at 0 °C is a better coolant than water at 0 °C. [3]\n\n(b) Give two natural phenomena explained by the large latent heat of fusion of ice. [3]\n\n(c) What mass of ice at 0 °C must be added to 400 g of water at 50 °C so that the final temperature is 10 °C? (i) Write the heat lost by the water. (ii) Write the heat gained by the ice in terms of its mass m. (iii) Solve for m in grams (to 3 significant figures). [4]',
  model: `(a) Each kilogram of ice must first absorb 336 000 J of latent heat to melt, at 0 °C, before its temperature can rise; water at 0 °C absorbs only mcΔT. So ice removes far more heat from the drink.\n\n(b) Snow on mountains melts slowly, keeping rivers flowing; ponds and lakes freeze slowly in winter (also ice-cream and frozen food stay cold for long).\n\n(c) (i) $0.4 \\times 4200 \\times (50 - 10) = ${0.4 * CW * 40}$ J. (ii) $m \\times 336000 + m \\times 4200 \\times 10 = 378000\\,m$. (iii) $m = ${0.4 * CW * 40} \\div 378000 \\approx ${f(mIce2)}$ kg $\\approx ${f(mIce2 * 1000)}$ g.`,
  sol: 'Latent heat; phenomena; mass of ice.',
  scheme: [['(a)', 3], ['(b)', 3], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 2]],
  d: 4, c: 'analysis', t: [4, 5],
}), () => near(mIce2 * 1000, 177.8, 0.001) || 'm');
