// ICSE 9 Physics ch07 Heat and Energy: question bank in ICSE school-examination style (short stems, "state", "define",
// "give a reason", numericals with formula, substitution and unit, 10-mark structured questions in parts). Numbers come from
// calc.mjs. AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains,
// d = both true and R does not explain.
import { mk, add, svgV, r, sig } from '../../icse-9-physics-ch01/src/lib.mjs';
import * as K from './calc.mjs';
import { HOPE_LETTERED, GREENHOUSE_LETTERED, DENS_GRAPH_PLAIN, SANKEY_LONG } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, long, match } = mk;
const hopeFig = svgV(HOPE_LETTERED, 'Hope’s apparatus with the parts lettered A to E');
const ghFig = svgV(GREENHOUSE_LETTERED, 'The greenhouse effect with the parts lettered A to E');
const densFig = svgV(DENS_GRAPH_PLAIN, 'Graph of the density of water against temperature from 0 to 10 degrees Celsius');
const sankeyFig = svgV(SANKEY_LONG, 'Band diagram of the energy flow in a machine; the heat band is marked with a question mark');
const term = (o) => short({ marks: 1, wl: null, scheme: [[o.sch ?? 'Correct answer', 1]], ...o });
const H = (i) => K.HOPE_T.indexOf(i);

// ---------------------------------------------------------------- deck-check items (not used in tests)
add('chk-flow', mcq({
  stem: 'Two metal blocks, P at 80 °C and Q at 30 °C, are placed in contact. Heat flows',
  right: 'from P to Q, because P is at the higher temperature', wrong: ['from Q to P, because Q has less heat', 'from the larger block to the smaller block', 'in neither direction, because both are metal'],
  sol: 'Heat always flows from the body at the higher temperature to the body at the lower temperature, option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('chk-conv', mcq({
  stem: 'A body takes in 400 cal of heat. In joules this is (1 cal = 4.186 J)',
  right: `${K.CHK_CONV} J`, wrong: [`${sig(400 / K.CAL, 3)} J`, '400 J', '4.186 J'],
  sol: r`Heat $= 400 \times 4.186 = ${K.CHK_CONV}$ J, option (@K).`,
  d: 1, c: 'application', t: [1],
}), () => K.CHK_CONV === 1674.4 || 'conv');
add('chk-4c', mcq({
  stem: 'Water has its greatest density at',
  right: '4 °C', wrong: ['0 °C', '10 °C', '100 °C'],
  sol: 'The density of water is maximum at 4 °C, option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('chk-gas', mcq({
  stem: 'Which pair of gases in the air both absorb the infrared radiation given out by the Earth?',
  right: 'carbon dioxide and methane', wrong: ['nitrogen and oxygen', 'oxygen and argon', 'nitrogen and argon'],
  sol: 'Carbon dioxide and methane are greenhouse gases; nitrogen, oxygen and argon are not, option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('chk-warm', mcq({
  stem: 'Which of the following is a likely result of global warming?',
  right: 'melting of glaciers and a rise in sea level', wrong: ['thicker ice caps at the poles', 'less evaporation from the oceans', 'a fall in the average temperature of the Earth'],
  sol: 'A warmer Earth melts ice, so the sea level rises, option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('chk-degr', mcq({
  stem: 'A car engine gives out less useful work than the energy of the fuel burnt. The rest of the energy',
  right: 'spreads into the surroundings as heat and cannot be fully used again', wrong: ['is destroyed', 'returns to the fuel tank', 'becomes more useful than before'],
  sol: 'Energy is conserved but a part of it is degraded to heat in the surroundings, option (@K).',
  d: 2, c: 'understanding', t: [5],
}));

// ---------------------------------------------------------------- t01 heat, temperature, calorie
add('ht-mcq1', mcq({
  stem: 'The SI unit of heat is the',
  right: 'joule', wrong: ['kelvin', 'degree Celsius', 'newton'],
  sol: 'Heat is a form of energy, so its SI unit is the joule, option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('ht-mcq2', mcq({
  stem: 'Two bodies at the same temperature are placed in contact. There is',
  right: 'no net flow of heat between them', wrong: ['a flow of heat from the heavier to the lighter', 'a flow of heat from the larger to the smaller', 'a flow of heat from the one that was heated first'],
  sol: 'Heat flows only because of a difference in temperature, option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('ht-mcq3', mcq({
  stem: 'A student supplies 1500 cal of heat to a metal block. In joules this is (1 cal = 4.186 J)',
  right: `${K.M3[0]} J`, wrong: [`${sig(1500 / K.CAL, 4)} J`, '1500 J', `${sig(1500 + K.CAL, 5)} J`],
  sol: r`Heat $= 1500 \times 4.186 = ${K.M3[0]}$ J, option (@K).`,
  d: 1, c: 'application', t: [1],
}), () => K.M3[0] === 6279 || 'cal');
add('ht-mcq4', mcq({
  stem: 'A bucket holds 10 kg of water and a mug holds 0.3 kg of water, both at 40 °C. Which statement is correct?',
  right: 'The temperatures are equal, but the bucket holds more heat', wrong: ['The bucket is hotter because it holds more water', 'The mug holds more heat because it is smaller', 'The two hold equal amounts of heat'],
  sol: 'Temperature does not depend on the mass, but the heat contained does, option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('ht-mcq5', mcq({
  stem: 'The "Calorie" printed on a food packet is the same as',
  right: '1000 cal', wrong: ['1 cal', '100 cal', '4.186 cal'],
  sol: 'The food Calorie is the kilocalorie, which is 1000 cal, option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('ht-tf', tf({
  stem: 'A body at a higher temperature always contains more heat than a body at a lower temperature.',
  key: 'f',
  sol: 'False. The heat in a body depends on its mass as well as its temperature; a lake at a low temperature holds more heat than a cup of hot tea.',
  d: 2, c: 'understanding', t: [1],
}));
add('ht-fill', fill({
  marks: 5,
  stem: 'Heat is a form of ___. It flows from a body at a ___ temperature to a body at a ___ temperature. The SI unit of heat is the ___, and 1 cal = ___ J.',
  acc: [['energy'], ['higher', 'greater'], ['lower', 'smaller'], ['joule', 'J'], ['4.186', '4.2']],
  sol: 'Energy; higher; lower; joule; 4.186.',
  d: 1, c: 'recall', t: [1],
}));
add('ht-term', term({
  stem: 'Define one calorie.',
  model: 'The **heat needed to raise the temperature of 1 g of water by 1 °C**.', sol: 'Heat to warm 1 g of water through 1 °C.', sch: 'Heat to raise 1 g of water by 1 °C',
  d: 1, c: 'recall', t: [1],
}));
add('ht-short2a', short({
  marks: 2, wl: null,
  stem: 'State two differences between heat and temperature.',
  model: 'Heat is a **form of energy**, measured in **joule**; temperature is the **degree of hotness** of a body, measured with a **thermometer** in kelvin or °C. Heat flows because of a difference in temperature; temperature decides the **direction** of flow.',
  sol: 'Energy against degree of hotness; joule against kelvin; calorimeter against thermometer.',
  scheme: [['First correct difference', 1], ['Second correct difference', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('ht-short2b', short({
  marks: 2, wl: null,
  stem: 'Beaker P holds 100 g of water and beaker Q holds 400 g of water, both at 60 °C. State, with a reason, which beaker contains more heat and which is hotter.',
  model: '**Q** contains more heat, because it has **four times the mass** of water at the same temperature. **Neither is hotter**: both are at the **same temperature**.',
  sol: 'Q holds more heat as it has more mass; the same temperature, so equally hot.',
  scheme: [['Q has more heat, because of its greater mass', 1], ['Equally hot, same temperature', 1]],
  d: 2, c: 'application', t: [1],
}));
add('ht-short3', short({
  marks: 3, wl: null,
  stem: `A heater supplies ${K.N_MASS.j} J of heat to 400 g of water in an insulated vessel, with no loss of heat. Find (a) the heat supplied in calories and (b) the rise in temperature of the water. (1 cal = 4.186 J)`,
  model: r`**(a)** Heat in cal $= \dfrac{${K.N_MASS.j}}{4.186} = ${K.N_MASS.cal}$ cal.` + '\n\n' + r`**(b)** 1 cal warms 1 g by 1 °C, so rise $= \dfrac{${K.N_MASS.cal}}{400 \times 1} = ${K.N_RISE.dt}$ °C.`,
  sol: '1200 cal; 3 °C.',
  scheme: [['Division by 4.186', 1], ['1200 cal', 1], ['Rise of 3 °C', 1]],
  d: 3, c: 'application', t: [1],
}), () => K.N_MASS.cal === 1200 && K.N_RISE.dt === 3 || 'ht-s3');
add('num-cal', num({
  stem: 'Convert 250 cal of heat into joules. (1 cal = 4.186 J)',
  value: K.N_CAL, tol: 0.5, unit: 'J',
  sol: r`Heat $= 250 \times 4.186 = ${K.N_CAL}$ J.`,
  scheme: [['250 × 4.186', 0.5], [`${K.N_CAL} J`, 0.5]],
  d: 1, c: 'application', t: [1],
}), () => K.N_CAL === 1046.5 || 'cal');
add('num-j', num({
  stem: 'A food processor motor gives out 8372 J of heat. Express this heat in calories. (1 cal = 4.186 J)',
  value: K.N_J, tol: 1, unit: 'cal',
  sol: r`Heat in cal $= \dfrac{8372}{4.186} = ${K.N_J}$ cal.`,
  scheme: [['8372 ÷ 4.186', 0.5], [`${K.N_J} cal`, 0.5]],
  d: 2, c: 'application', t: [1],
}), () => K.N_J === 2000 || 'j');
add('num-warm', num({
  stem: 'How much heat, in joules, is needed to raise the temperature of 200 g of water by 15 °C? Assume no heat is lost. (1 cal = 4.186 J)',
  value: K.N_WARM.j, tol: 1, unit: 'J',
  sol: r`Heat $= 200 \times 15 = ${K.N_WARM.cal}$ cal $= ${K.N_WARM.cal} \times 4.186 = ${K.N_WARM.j}$ J.`,
  scheme: [['3000 cal', 0.5], [`${K.N_WARM.j} J`, 0.5]],
  d: 2, c: 'application', t: [1],
}), () => K.N_WARM.j === 12558 || 'warm');
add('num-food', num({
  stem: 'The label on a packet of biscuits says that 100 g gives 150 kcal. Find this energy in kilojoule. (1 cal = 4.186 J)',
  value: K.N_FOOD.kj, tol: 0.5, unit: 'kJ',
  sol: r`$150\ \text{kcal} = 150 \times 1000 = 150000$ cal $= 150000 \times 4.186 = ${K.N_FOOD.j}$ J $= ${K.N_FOOD.kj}$ kJ.`,
  scheme: [['150 000 cal', 0.5], [`${K.N_FOOD.kj} kJ`, 0.5]],
  d: 3, c: 'application', t: [1],
}), () => K.N_FOOD.kj === 627.9 || 'food');
add('num-kj', num({
  stem: 'A small heater gives out 2 kJ of heat. How many calories is this? (1 cal = 4.186 J)',
  value: K.N_KJ, tol: 0.5, unit: 'cal',
  sol: r`$2\ \text{kJ} = 2000$ J, so heat $= \dfrac{2000}{4.186} = ${K.N_KJ}$ cal.`,
  scheme: [['2000 ÷ 4.186', 0.5], [`${K.N_KJ} cal`, 0.5]],
  d: 2, c: 'application', t: [1],
}), () => K.N_KJ === 477.8 || 'kj');

// ---------------------------------------------------------------- t02 anomalous expansion of water
add('an-mcq1', mcq({
  stem: 'A beaker of water at 0 °C is heated slowly to 4 °C. The volume of the water',
  right: 'decreases', wrong: ['increases', 'first increases and then decreases', 'stays the same'],
  sol: 'Between 0 °C and 4 °C water contracts on heating, option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('an-mcq2', mcq({
  stem: 'A fixed mass of water is heated from 0 °C to 10 °C. Its density',
  right: 'first increases and then decreases', wrong: ['decreases throughout', 'increases throughout', 'first decreases and then increases'],
  sol: 'Density rises to a maximum and then falls, because the volume first falls and then rises, option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('an-mcq3', mcq({
  stem: 'On the volume-temperature graph of 1 kg of water between 0 °C and 10 °C, the points for 2 °C and 6 °C lie at the same height. This means that water at 2 °C and water at 6 °C',
  right: 'have the same volume', wrong: ['have the same mass, but different volumes', 'have different densities', 'are both at the minimum volume'],
  sol: 'Equal heights on the graph mean equal volumes for the same mass, and so equal densities, option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('an-mcq4', mcq({
  stem: 'Water at 10 °C is cooled steadily to 0 °C in a vessel. Its volume',
  right: 'decreases to a minimum and then increases', wrong: ['decreases all the way', 'increases all the way', 'increases to a maximum and then decreases'],
  sol: 'The volume falls until 4 °C and then rises as the water cools from 4 °C to 0 °C, option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('ar-an', ar({
  a: 'A fixed mass of water has its smallest volume at 4 °C.',
  r: 'The density of water is greatest at 4 °C.',
  key: 'c',
  sol: 'Both are true; because density is mass divided by volume, the greatest density means the smallest volume, so (R) explains (A), option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('an-tf', tf({
  stem: 'When water at 0 °C is warmed to 4 °C, it expands.',
  key: 'f',
  sol: 'False. Water contracts on warming from 0 °C to 4 °C; it expands only above 4 °C.',
  d: 1, c: 'recall', t: [2],
}));
add('an-term', term({
  stem: 'State the temperature at which the density of water is maximum.',
  model: '**4 °C**.', sol: '4 °C.', sch: '4 °C',
  d: 1, c: 'recall', t: [2],
}));
add('an-short2a', short({
  marks: 2, wl: null,
  stem: 'What is meant by the anomalous expansion of water? State the range of temperature in which it occurs.',
  model: 'Unlike most liquids, water **contracts** when it is heated, instead of expanding. This happens between **0 °C and 4 °C**.',
  sol: 'Water contracts on heating from 0 °C to 4 °C.',
  scheme: [['Contracts on heating instead of expanding', 1], ['0 °C to 4 °C', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('an-short3', short({
  marks: 3, wl: null,
  stem: 'Describe how the volume of a fixed mass of water changes as it is heated from 0 °C to 10 °C, and state how the density changes over the same range.',
  model: 'From **0 °C to 4 °C** the volume **decreases**; it is **minimum at 4 °C**; from **4 °C to 10 °C** it **increases**. The density does the opposite: it **rises to a maximum at 4 °C** and then **falls**, because density is mass divided by volume.',
  sol: 'Volume falls to a minimum at 4 °C then rises; density rises to a maximum at 4 °C then falls.',
  scheme: [['Volume falls from 0 °C to 4 °C and rises after', 1], ['Minimum volume at 4 °C', 1], ['Density rises to a maximum at 4 °C then falls', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('num-ice', num({
  stem: 'A closed vessel is completely filled with 500 cm³ of water, which then freezes into ice. Find the volume of the ice. (Density of water 1000 kg m⁻³ = 1 g cm⁻³; density of ice 900 kg m⁻³ = 0.9 g cm⁻³)',
  value: K.N_ICE.vi, tol: 0.2, unit: 'cm³',
  sol: r`Mass of water $= 500 \times 1 = 500$ g and the mass does not change on freezing, so volume of ice $= \dfrac{500}{0.9} = ${K.N_ICE.vi}$ cm³.`,
  scheme: [['Mass 500 g unchanged', 0.5], [`${K.N_ICE.vi} cm³`, 0.5]],
  d: 3, c: 'application', t: [2, 3],
}), () => K.N_ICE.vi === 555.6 || 'ice');
add('num-icepct', num({
  stem: 'A sealed bottle contains 500 cm³ of water, which freezes completely. Find the percentage increase in the volume. (Density of water 1000 kg m⁻³; density of ice 900 kg m⁻³)',
  value: K.N_ICE_PCT, tol: 0.1, unit: '%',
  sol: r`Volume of ice $= \dfrac{500}{0.9} = ${K.N_ICE.vi}$ cm³; increase $= ${K.N_ICE.vi} - 500 = ${K.N_ICE_INC}$ cm³; percentage $= \dfrac{${K.N_ICE_INC}}{500} \times 100 = ${K.N_ICE_PCT}$ %.`,
  scheme: [['Increase 55.6 cm³', 0.5], [`${K.N_ICE_PCT}%`, 0.5]],
  d: 3, c: 'application', t: [2, 3],
}), () => K.N_ICE_PCT === 11.1 || 'pct');

// ---------------------------------------------------------------- t03 Hope's experiment and consequences
add('hp-mcq1', mcq({
  stem: 'In Hope’s experiment the lower thermometer finally reads steadily',
  right: '4 °C', wrong: ['0 °C', '10 °C', 'room temperature'],
  sol: 'Water cooled in the middle sinks until it reaches the temperature of greatest density, 4 °C, option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('hp-mcq2', mcq({
  stem: 'In winter a deep lake has a layer of ice on its surface. A diver lowers a thermometer from just under the ice to the bottom of the lake. The readings are most likely to',
  right: 'rise from about 0 °C just under the ice to about 4 °C at the bottom', wrong: ['stay at 0 °C at every depth', 'fall from about 4 °C just under the ice to about 0 °C at the bottom', 'rise from 0 °C just under the ice to 10 °C at the bottom'],
  sol: 'The densest water, at about 4 °C, sinks to the bottom, and the water next to the ice is at 0 °C, option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('hp-mcq3', mcq({
  stem: 'A water pipe, completely full and closed at both ends, cracks on a freezing night because',
  right: 'water expands when it freezes', wrong: ['water contracts when it freezes', 'the pipe contracts more than the water', 'the water becomes denser when it freezes'],
  sol: 'Ice has a larger volume than the water it came from, so it pushes on the walls, option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('hp-mcq4', mcq({
  stem: 'A thick layer of ice has formed on a pond. Fish in the pond survive because',
  right: 'the water below the ice is liquid, and the water at the bottom is at about 4 °C', wrong: ['the ice is at 4 °C', 'the water at the bottom has frozen and gives off heat', 'cold water is denser and rises to the top'],
  sol: 'The floating ice shields the water below, and the densest water stays at the bottom, option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('hp-mcq5', mcq({
  stem: 'On cold mountains, water that seeps into the cracks of rocks freezes at night. After many winters the cracks become wider because',
  right: 'the ice formed takes up more space than the water did', wrong: ['the ice formed takes up less space than the water did', 'the water contracts as it freezes', 'the rock expands in the cold'],
  sol: 'Water expands on freezing, and the ice pushes the sides of the crack apart, option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('an-mcq5', mcq({
  stem: 'A tall insulated jar is filled with water at 10 °C, and only its top surface is cooled steadily by cold air. A thermometer at the bottom of the jar will',
  right: 'fall to about 4 °C and stay there for a long time, while the water at the top goes down towards 0 °C', wrong: ['fall steadily to 0 °C, because the cold water sinks to the bottom', 'stay at 10 °C throughout, because cold water stays at the top', 'rise above 10 °C, because the cold water pushes the warm water down'],
  sol: 'Water that is cooled at the top and is denser sinks, so the bottom cools to 4 °C. Colder water is less dense and stays at the top, so the bottom stays at about 4 °C while the top cools towards 0 °C, option (@K).',
  d: 4, c: 'analysis', t: [2, 3],
}));
add('num-spoon', num({
  stem: 'How much heat, in joules, is needed to raise the temperature of 60 g of water from 25 °C to 65 °C? Assume no heat is lost. (1 cal = 4.186 J)',
  value: K.N_SP.j, tol: 0.5, unit: 'J',
  sol: r`Rise in temperature $= 65 - 25 = 40$ °C; heat $= 60 \times 40 = ${K.N_SP.cal}$ cal $= ${K.N_SP.cal} \times 4.186 = ${K.N_SP.j}$ J.`,
  scheme: [['2400 cal', 0.5], [`${K.N_SP.j} J`, 0.5]],
  d: 2, c: 'application', t: [1],
}), () => K.N_SP.j === 10046.4 || 'spoon');
add('num-tank', num({
  stem: 'A closed tank is completely filled with 900 kg of water, which then freezes completely into ice. Find the increase in volume, in m³. (Density of water 1000 kg m⁻³; density of ice 900 kg m⁻³)',
  value: K.N_TANK.inc, tol: 0.005, unit: 'm³',
  sol: r`Volume of water $= \dfrac{900}{1000} = ${K.N_TANK.vw}$ m³; volume of ice $= \dfrac{900}{900} = ${K.N_TANK.vi}$ m³; increase $= ${K.N_TANK.vi} - ${K.N_TANK.vw} = ${K.N_TANK.inc}$ m³.`,
  scheme: [['Volumes 0.9 m³ and 1 m³', 0.5], [`${K.N_TANK.inc} m³`, 0.5]],
  d: 3, c: 'application', t: [2, 3],
}), () => K.N_TANK.inc === 0.1 || 'tank');
add('ar-hope', ar({
  a: 'In Hope’s experiment the upper thermometer starts to fall noticeably only after the lower thermometer has settled at 4 °C.',
  r: 'Water that is colder than 4 °C is denser than water at 4 °C and sinks to the bottom.',
  key: 'a',
  sol: '(A) is true; (R) is false because water colder than 4 °C is less dense and stays above, option (a).',
  d: 3, c: 'analysis', t: [3],
}));
add('hp-short2', short({
  marks: 2, wl: null,
  stem: 'A householder leaves a completely filled water pipe in an unheated room in a very cold country. Explain why the pipe may crack on a freezing night.',
  model: 'Water **expands on freezing**: the ice needs **more space** than the water. In the **closed, full pipe** it has no room, so it presses on the walls with a large force and the pipe cracks.',
  sol: 'Ice has a greater volume than water; a full closed pipe has no room, so it cracks.',
  scheme: [['Water expands on freezing', 1], ['Closed full pipe, so it is forced to crack', 1]],
  d: 2, c: 'application', t: [3],
}));
add('hp-short3', short({
  marks: 3, wl: null,
  stem: 'Describe the readings of the two thermometers in Hope’s experiment and name the property of water that the experiment demonstrates.',
  model: 'The **lower thermometer** falls first and **stops at 4 °C**. The **upper thermometer** falls later and finally reaches **0 °C**. The experiment shows that water has its **greatest density at 4 °C**.',
  sol: 'Lower falls first, stops at 4 °C; upper falls later to 0 °C; densest at 4 °C.',
  scheme: [['Lower thermometer falls first and stops at 4 °C', 1], ['Upper thermometer falls later to 0 °C', 1], ['Maximum density at 4 °C', 1]],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 greenhouse effect and global warming
add('gh-mcq1', mcq({
  stem: 'The greenhouse effect keeps the lower atmosphere warm because greenhouse gases',
  right: 'absorb infrared radiation from the ground and send part of it back', wrong: ['absorb all the sunlight before it reaches the ground', 'give out ultraviolet radiation to the ground', 'reflect all the infrared radiation out into space'],
  sol: 'The gases trap part of the infrared given out by the warm ground, option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('gh-mcq2', mcq({
  stem: 'Which of the following would help to reduce global warming?',
  right: 'planting trees on a large scale', wrong: ['burning more coal in power stations', 'cutting down forests for farmland', 'using more vehicles that burn petrol'],
  sol: 'Trees absorb carbon dioxide; the other actions add more of it, option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('gh-mcq3', mcq({
  stem: 'Melting of glaciers and polar ice caps because of global warming mainly causes',
  right: 'a rise in sea level', wrong: ['a fall in sea level', 'a rise in the temperature of the ground at the poles only', 'more snowfall at the equator'],
  sol: 'The melt water runs into the oceans and raises the sea level, option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('gh-mcq4', mcq({
  stem: 'The radiation absorbed by greenhouse gases in the atmosphere is mainly the',
  right: 'infrared radiation given out by the Earth’s surface', wrong: ['visible light from the Sun', 'X-rays from space', 'radio waves from the ground'],
  sol: 'The warm ground gives out infrared, which the gases absorb, option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('ar-gh', ar({
  a: 'Carbon dioxide is added to the air when coal and petrol are burnt.',
  r: 'Carbon dioxide absorbs the infrared radiation given out by the Earth.',
  key: 'd',
  sol: 'Both statements are true, but (R) does not explain why burning fuels adds carbon dioxide, option (d).',
  d: 2, c: 'understanding', t: [4],
}));
add('gh-tf', tf({
  stem: 'The natural greenhouse effect is harmful, because it makes the Earth warmer than it would be without it.',
  key: 'f',
  sol: 'False. The natural effect keeps the average temperature suitable for life; the harm comes from the extra greenhouse gases.',
  d: 2, c: 'understanding', t: [4],
}));
add('gh-term', term({
  stem: 'Name the radiation from the Earth’s surface that is absorbed by greenhouse gases.',
  model: '**Infrared radiation**.', sol: 'Infrared radiation.', sch: 'Infrared',
  d: 1, c: 'recall', t: [4],
}));
add('gh-short2a', short({
  marks: 2, wl: null,
  stem: 'Distinguish between the greenhouse effect and global warming.',
  model: 'The **greenhouse effect** is the **natural** warming of the lower atmosphere by greenhouse gases, and it makes life possible. **Global warming** is the **rise in the average temperature** of the Earth caused by **extra** greenhouse gases added by human activities.',
  sol: 'Natural and useful against extra gases from human activity raising the temperature.',
  scheme: [['Greenhouse effect: natural warming by the gases', 1], ['Global warming: rise caused by extra gases from human activities', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('gh-short2b', short({
  marks: 2, wl: null,
  stem: 'Give two ways in which the people of a city can lessen their contribution to global warming.',
  model: 'Use **public transport**, bicycles or walking instead of private cars, and **save electricity**; or **plant trees** and recycle waste. Each lowers the amount of greenhouse gas added to the air.',
  sol: 'Any two: public transport, saving electricity, planting trees, recycling.',
  scheme: [['First way', 1], ['Second way', 1]],
  d: 1, c: 'understanding', t: [4],
}));
add('gh-short3', short({
  marks: 3, wl: null,
  stem: 'A car parked in the sun with its windows closed becomes much hotter inside than the air outside. Use the idea of the greenhouse effect to explain this.',
  model: '**Sunlight** passes through the glass and **warms the seats and the dashboard**. These give out **infrared radiation**, which the **glass absorbs and does not let out** easily. So the energy is trapped and the air inside gets hotter, in the same way as in the atmosphere.',
  sol: 'Sunlight enters; warm objects emit infrared; the glass traps it, so the inside heats up.',
  scheme: [['Sunlight enters through the glass and warms the objects', 1], ['The warm objects give out infrared that the glass does not let out', 1], ['Trapped energy raises the temperature, as in the greenhouse effect', 1]],
  d: 3, c: 'application', t: [4],
}));
add('gh-short3b', short({
  marks: 3, wl: null,
  stem: 'State three harmful effects of global warming on life on the Earth.',
  model: 'Any three: **melting of ice** and **rising sea level**, which floods coasts; **heat waves**; **droughts or floods** from changed rainfall; **damage to crops**; **bleaching of coral reefs**; loss of **habitats** of animals.',
  sol: 'Any three: rising sea level, heat waves, droughts or floods, crop damage, coral bleaching, loss of habitat.',
  scheme: [['First effect', 1], ['Second effect', 1], ['Third effect', 1]],
  d: 1, c: 'recall', t: [4],
}));

// ---------------------------------------------------------------- t05 energy degradation
add('ed-mcq1', mcq({
  stem: 'Energy degradation means that',
  right: 'useful energy changes into heat that spreads out and cannot be fully used again', wrong: ['energy is destroyed in the machine', 'heat energy changes into more useful forms', 'the total energy becomes less'],
  sol: 'Energy is conserved but the part that spreads into the surroundings as heat is less useful, option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('ed-mcq2', mcq({
  stem: 'Most of the electrical energy given to a filament bulb is changed into',
  right: 'heat', wrong: ['light', 'sound', 'chemical energy'],
  sol: 'Only a small part becomes light; most is degraded to heat, option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('ed-mcq3', mcq({
  stem: 'A stone falls from a height and stops when it hits the ground. The energy of its motion',
  right: 'is changed into heat and sound that spread out and are not recoverable', wrong: ['is destroyed', 'is stored in the ground as useful motion energy', 'is changed into an equal amount of useful energy'],
  sol: 'The motion energy is degraded to heat and sound, option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('ed-mcq4', mcq({
  stem: 'A machine takes in 500 J of energy and does 150 J of useful work. Which statement about the other 350 J is correct?',
  right: 'It is degraded as heat and sound in the surroundings, and the total energy is still 500 J', wrong: ['It is destroyed, so the total becomes 150 J', 'It is stored in the machine as useful energy', 'It becomes useful work if the machine is run for longer'],
  sol: 'Energy is conserved, so 350 J has been degraded, option (@K).',
  d: 3, c: 'analysis', t: [5],
}));
add('ar-ed', ar({
  a: 'The energy of the fuel burnt in a car engine is destroyed.',
  r: 'Energy can neither be created nor destroyed.',
  key: 'b',
  sol: '(A) is false because the energy is degraded to heat in the surroundings, not destroyed; (R) is true, option (b).',
  d: 2, c: 'understanding', t: [5],
}));
add('ed-fill', fill({
  stem: 'In energy degradation, useful energy is changed into ___ that spreads into the surroundings.',
  acc: [['heat', 'thermal energy']],
  sol: 'Heat.',
  d: 1, c: 'recall', t: [5],
}));
add('ed-match', match({
  marks: 5,
  stem: 'Match each item in Column A with the correct statement in Column B.',
  pairs: [
    ['Anomalous expansion', 'water contracts on heating from 0 °C to 4 °C'],
    ['Hope’s experiment', 'shows that water is densest at 4 °C'],
    ['Methane', 'a greenhouse gas produced in paddy fields and by cattle'],
    ['Brakes of a moving car', 'motion energy degraded to heat'],
    ['1 kcal', '1000 cal'],
  ],
  order: [3, 0, 2, 4, 1],
  sol: 'Anomalous expansion: contraction 0 to 4 °C; Hope: densest at 4 °C; methane: greenhouse gas; brakes: motion energy to heat; 1 kcal is 1000 cal.',
  d: 2, c: 'understanding', t: [1, 2, 3, 4, 5],
}));
add('ed-short2', short({
  marks: 2, wl: null,
  stem: 'What is meant by energy degradation? Give one example.',
  model: 'In energy degradation, **useful energy changes into heat that spreads into the surroundings** and cannot be fully used again, though the total energy stays the same. Example: the **heat and sound given out by a running car engine**.',
  sol: 'Useful energy turns into spread-out heat; example: heat from an engine.',
  scheme: [['Useful energy becomes heat spread out, not recoverable', 1], ['A correct example', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('ed-short3', short({
  marks: 3, wl: null,
  stem: 'A cyclist applies the brakes and the bicycle slows to a stop. Name the energy change that takes place and explain why this is an example of energy degradation.',
  model: 'The **energy of motion** (kinetic energy) of the bicycle is changed into **heat** at the brake pads and the rim. The heat **spreads into the air** and cannot be collected to set the cycle moving again, so the useful energy has been **degraded**, although the **total energy is conserved**.',
  sol: 'Motion energy to heat; heat spreads into the air and cannot be recovered; total conserved.',
  scheme: [['Kinetic energy changes to heat', 1], ['Heat spreads out and cannot be recovered', 1], ['Total energy is conserved', 1]],
  d: 2, c: 'application', t: [5],
}));
add('num-deg', num({
  stem: 'A machine takes in 8000 J of energy and gives out 2400 J as useful work. Find the energy that is degraded as heat and sound.',
  value: K.N_DEG.deg, tol: 0, unit: 'J',
  sol: r`Degraded energy $= \text{energy supplied} - \text{useful energy} = ${K.N_DEG.in} - ${K.N_DEG.useful} = ${K.N_DEG.deg}$ J.`,
  scheme: [['8000 − 2400', 0.5], [`${K.N_DEG.deg} J`, 0.5]],
  d: 1, c: 'application', t: [5],
}), () => K.N_DEG.deg === 5600 || 'deg');
add('num-pct', num({
  stem: 'A small engine takes in 12 000 J of energy, of which 30% becomes useful work. Find the energy that is degraded to heat, in calories. (1 cal = 4.186 J)',
  value: K.N_PCT.cal, tol: 0.5, unit: 'cal',
  sol: r`Useful work $= 0.30 \times 12000 = ${K.N_PCT.useful}$ J; degraded energy $= 12000 - ${K.N_PCT.useful} = ${K.N_PCT.deg}$ J $= \dfrac{${K.N_PCT.deg}}{4.186} = ${K.N_PCT.cal}$ cal.`,
  scheme: [['Degraded energy 8400 J', 0.5], [`${K.N_PCT.cal} cal`, 0.5]],
  d: 3, c: 'application', t: [1, 5],
}), () => K.N_PCT.cal === 2006.7 || 'pct');
add('num-bulb', num({
  stem: 'A lamp takes in 60 J of electrical energy every second and gives out 3 J of it as light. Find the percentage of the energy that is degraded to heat.',
  value: K.N_BULB.pct, tol: 0.1, unit: '%',
  sol: r`Heat $= 60 - 3 = ${K.N_BULB.heat}$ J; percentage $= \dfrac{${K.N_BULB.heat}}{60} \times 100 = ${K.N_BULB.pct}$ %.`,
  scheme: [['Heat 57 J', 0.5], [`${K.N_BULB.pct}%`, 0.5]],
  d: 2, c: 'application', t: [5],
}), () => K.N_BULB.pct === 95 || 'bulb');

// ---------------------------------------------------------------- 10-mark structured questions
add('long-hope', long({
  marks: 10, wl: null,
  stem: `The figure shows the apparatus used in Hope’s experiment, with its parts lettered A to E. A student notes the readings of the two thermometers every 10 minutes while the freezing mixture cools the water in the middle of the jar.\n\n| Time (min) | ${[0, 10, 20, 30, 40].join(' | ')} |\n|---|---|---|---|---|---|\n| Upper thermometer (°C) | ${[0, 10, 20, 30, 40].map((t) => K.HOPE_TOP[H(t)]).join(' | ')} |\n| Lower thermometer (°C) | ${[0, 10, 20, 30, 40].map((t) => K.HOPE_BOT[H(t)]).join(' | ')} |\n\n(a) Name the parts A, B, C, D and E. [3]\n\n(b) Which thermometer falls first, and what is its final reading? [2]\n\n(c) Explain why the lower thermometer stops falling at this reading. [2]\n\n(d) Explain why the upper thermometer reaches a lower reading than the lower thermometer in the end. [2]\n\n(e) State the property of water that this experiment demonstrates. [1]`,
  model: '**(a)** **A** is the tall glass jar; **B** is the freezing mixture (ice and salt) in the trough; **C** is the upper thermometer; **D** is the lower thermometer; **E** is the water.\n\n' + `**(b)** The **lower thermometer** falls first; its final reading is **${K.HOPE_BOT.at(-1)} °C**.\n\n` + '**(c)** Water cooled in the middle becomes denser and sinks to the bottom, and the **densest water collects at the bottom**; water at 4 °C is the densest, so the lower thermometer cannot fall below 4 °C.\n\n**(d)** Water colder than 4 °C is **less dense**, so it **rises** and stays near the top; the top layer goes on cooling until it reaches **0 °C**, where ice starts to form.\n\n**(e)** Water has its **maximum density at 4 °C**.',
  sol: 'Jar, freezing mixture, upper thermometer, lower thermometer, water; lower, 4 °C; densest water at the bottom; colder water is lighter and rises; maximum density at 4 °C.',
  scheme: [['A and B named', 1], ['C and D named', 1], ['E named', 1], ['Lower thermometer', 1], ['4 °C', 1], ['Cooled water becomes denser and sinks', 1], ['4 °C water is densest, so the reading stops', 1], ['Water colder than 4 °C is less dense and rises', 1], ['Top reaches 0 °C', 1], ['Maximum density at 4 °C', 1]],
  d: 3, c: 'analysis', t: [3],
  assets: [hopeFig],
}), () => K.HOPE_BOT.at(-1) === 4 && K.HOPE_TOP.at(-1) === 0 || 'hope');
add('long-graph', long({
  marks: 10, wl: null,
  stem: `The graph shows how the density of water changes with temperature from 0 °C to 10 °C. The vertical scale is stretched, so the changes look larger than they really are. The volume of 1 kg of water is ${K.V0} cm³ at 0 °C, ${K.V4} cm³ at the temperature of its greatest density, and ${K.V10} cm³ at 10 °C.\n\n(a) At what temperature is the density greatest? [1]\n\n(b) State how the density changes (i) from 0 °C to this temperature and (ii) above it. [2]\n\n(c) At what other temperature does water have the same density as at 2 °C? [1]\n\n(d) Find the decrease in the volume of 1 kg of water when it is heated from 0 °C to the temperature in (a). [2]\n\n(e) Find the increase in the volume of 1 kg of water when it is heated from that temperature to 10 °C. [2]\n\n(f) Explain why the volume of a fixed mass of water is least when its density is greatest. [2]`,
  model: `**(a)** **4 °C**.\n\n**(b)** **(i)** The density **increases**. **(ii)** The density **decreases**.\n\n**(c)** **6 °C**.\n\n` + r`**(d)** Decrease $= ${K.V0} - ${K.V4} = ${K.DV_0_4}$ cm³.` + '\n\n' + r`**(e)** Increase $= ${K.V10} - ${K.V4} = ${K.DV_4_10}$ cm³.` + '\n\n**(f)** Density is **mass divided by volume**; for a fixed mass, the smaller the volume, the greater the density.',
  sol: '4 °C; rises then falls; 6 °C; 0.13 cm³; 0.27 cm³; density is inversely related to volume for a fixed mass.',
  scheme: [['4 °C', 1], ['Increases from 0 °C to 4 °C', 1], ['Decreases above 4 °C', 1], ['6 °C', 1], ['Subtraction with units', 1], ['0.13 cm³', 1], ['Subtraction with units', 1], ['0.27 cm³', 1], ['Density = mass ÷ volume', 1], ['Mass fixed, so smaller volume gives greater density', 1]],
  d: 3, c: 'analysis', t: [2],
  assets: [densFig],
}), () => K.DV_0_4 === 0.13 && K.DV_4_10 === 0.27 || 'graph');
add('long-heat', long({
  marks: 10, wl: null,
  stem: `A heater gives ${K.LH_HEATER.j} J of heat to ${K.LH_HEATER.m} g of water in an insulated vessel, so that no heat is lost. (1 cal = 4.186 J)\n\n(a) Define the calorie. [2]\n\n(b) Express the heat supplied in calories. [2]\n\n(c) Find the rise in the temperature of the water. [3]\n\n(d) A second vessel holds 100 g of water at the final temperature of the first vessel. State which vessel contains more heat, and what is the same for the two vessels. [3]`,
  model: '**(a)** One calorie is the **heat needed to raise the temperature of 1 g of water by 1 °C**.\n\n' + r`**(b)** Heat $= \dfrac{${K.LH_HEATER.j}}{4.186} = ${K.LH_HEATER.cal}$ cal.` + '\n\n' + r`**(c)** 1 cal warms 1 g by 1 °C, so the rise $= \dfrac{${K.LH_HEATER.cal}}{${K.LH_HEATER.m} \times 1} = ${K.LH_HEATER.dt}$ °C.` + '\n\n**(d)** The **first vessel** contains more heat, because it has **five times the mass** of water. The **temperature** is the same in the two vessels, so no heat flows between them if they are put in contact.',
  sol: 'Heat to warm 1 g by 1 °C; 8000 cal; 16 °C; the first vessel holds more heat; same temperature.',
  scheme: [['Heat needed', 1], ['1 g of water by 1 °C', 1], ['33488 ÷ 4.186', 1], ['8000 cal', 1], ['Rise = heat ÷ (mass × 1)', 1], ['Substitution', 1], ['16 °C', 1], ['First vessel has more heat, with the reason of more mass', 1], ['Same temperature', 1], ['No heat flow between them', 1]],
  d: 3, c: 'application', t: [1],
}), () => K.LH_HEATER.cal === 8000 && K.LH_HEATER.dt === 16 || 'heat');
add('long-pond', long({
  marks: 10, wl: null,
  stem: 'In a cold country the water of a deep lake cools in winter until the surface freezes. (Density of water 1000 kg m⁻³; of ice 900 kg m⁻³)\n\n(a) Explain, using density, why the water at the bottom of the lake does not freeze, and state its temperature. [3]\n\n(b) Why does the ice float, and how does the floating ice help the fish in the lake? [2]\n\n(c) A closed metal tank is completely filled with 2000 cm³ of water, which then freezes. Find the volume of the ice formed. [3]\n\n(d) Explain why the tank in (c) may crack. [2]',
  model: '**(a)** As the surface water cools it becomes **denser** and sinks until it is at **4 °C**, its greatest density. Water that is colder is **less dense**, so it stays above and freezes first. The water at the bottom therefore remains at about **4 °C**.\n\n**(b)** Ice is **less dense** than water, so it floats. It is a poor conductor of heat, so it **shields the water below** from the cold air, and the water under it stays liquid for the fish.\n\n' + r`**(c)** Mass of water $= 2000 \times 1 = 2000$ g, and the mass stays the same on freezing. Volume of ice $= \dfrac{2000}{0.9} = ${K.LP.vi}$ cm³ (increase of ${K.LP_INC} cm³).` + '\n\n**(d)** Ice occupies **more volume** than the water; in the **closed full tank** there is no room, so it pushes outwards with a large force and the tank cracks.',
  sol: 'Densest water at 4 °C sinks, colder water rises and freezes; ice is less dense and shields the water below; 2222.2 cm³; ice needs more space in a closed tank.',
  scheme: [['Cooled surface water becomes denser and sinks', 1], ['Water colder than 4 °C is less dense and stays on top', 1], ['Bottom stays at about 4 °C', 1], ['Ice less dense than water', 1], ['Ice shields the water below', 1], ['Mass 2000 g unchanged', 1], ['2000 ÷ 0.9', 1], ['2222.2 cm³', 1], ['Ice occupies more volume', 1], ['No room in the closed tank, so it cracks', 1]],
  d: 3, c: 'application', t: [3],
}), () => K.LP.vi === 2222.2 || 'pond');
add('long-gh', long({
  marks: 10, wl: null,
  stem: 'The figure shows the greenhouse effect, with its parts lettered A to E.\n\n(a) Name the parts A, B, C, D and E. [3]\n\n(b) Explain how C helps to keep the Earth warm. [2]\n\n(c) Name two gases that are present in C. [1]\n\n(d) State two human activities that increase the amount of C in the atmosphere. [2]\n\n(e) State two harmful effects of the resulting global warming. [2]',
  model: '**(a)** **A** is the Sun; **B** is the sunlight (visible light) reaching the Earth; **C** is the layer of greenhouse gases; **D** is the infrared radiation from the Earth’s surface; **E** is the infrared radiation that escapes into space.\n\n**(b)** The gases in C **absorb part of the infrared** given out by the ground and **send some of it back** to the surface, so the surface stays warmer than it would otherwise be.\n\n**(c)** Any two of: carbon dioxide, methane, water vapour, nitrous oxide.\n\n**(d)** Any two of: burning coal, oil and petrol; cutting down forests; keeping large herds of cattle; dumping rubbish.\n\n**(e)** Any two of: rise in sea level; heat waves; droughts or floods; damage to crops; bleaching of corals.',
  sol: 'Sun, sunlight, greenhouse gases, infrared from the ground, infrared escaping; absorb and return infrared; carbon dioxide and methane; burning fuels and deforestation; sea level rise and heat waves.',
  scheme: [['A and B named', 1], ['C and D named', 1], ['E named', 1], ['C absorbs infrared from the ground', 1], ['Sends part of it back to the surface', 1], ['Two gases', 1], ['First activity', 1], ['Second activity', 1], ['First effect', 1], ['Second effect', 1]],
  d: 2, c: 'understanding', t: [4],
  assets: [ghFig],
}));
add('long-engine', long({
  marks: 10, wl: null,
  stem: `The figure shows how the ${K.LE.in} J of energy taken in by a machine is shared. ${K.LE.useful} J becomes useful work, ${K.LE.sound} J is lost as sound, and the rest, marked with a question mark, is lost as heat. (1 cal = 4.186 J)\n\n(a) Find the energy lost as heat. [2]\n\n(b) Find the total energy degraded, and express it in calories. [3]\n\n(c) Find the percentage of the energy supplied that is degraded. [2]\n\n(d) Explain why the degraded energy cannot be fully used again. [2]\n\n(e) Is the total energy of the machine and its surroundings changed by the degradation? [1]`,
  model: r`**(a)** Heat $= ${K.LE.in} - ${K.LE.useful} - ${K.LE.sound} = ${K.LE.heat}$ J.` + '\n\n' + r`**(b)** Degraded energy $= ${K.LE.heat} + ${K.LE.sound} = ${K.LE.deg}$ J, which is $\dfrac{${K.LE.deg}}{4.186} = ${K.LE.cal}$ cal.` + '\n\n' + r`**(c)** Percentage $= \dfrac{${K.LE.deg}}{${K.LE.in}} \times 100 = ${K.LE_PCT}$ %.` + '\n\n**(d)** The heat and sound **spread out into the air and the surroundings** in all directions; it is **not possible to collect** them back to do useful work.\n\n**(e)** **No**; the total energy is conserved, only part of it has become less useful.',
  sol: '4800 J; 5600 J and 1337.8 cal; 70%; spread out in the surroundings and cannot be collected; no.',
  scheme: [['8000 − 2400 − 800', 1], ['4800 J', 1], ['4800 + 800', 1], ['5600 J', 1], ['1337.8 cal', 1], ['Percentage working', 1], ['70%', 1], ['Heat and sound spread out into the surroundings', 1], ['Cannot be collected for use', 1], ['No change in total energy', 1]],
  d: 3, c: 'application', t: [5],
  assets: [sankeyFig],
}), () => K.LE.heat === 4800 && K.LE.cal === 1337.8 && K.LE_PCT === 70 || 'engine');
