// ICSE 9 Chemistry ch13 Atmospheric and Environmental Chemistry: question bank in ICSE school-examination style.
// Numbers come from calc.mjs. AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true, R does not explain.
import { mk, add, svgV, r } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import * as K from './calc.mjs';
import { ACID_LETTERED, GREENHOUSE_LETTERED, OZONE_LETTERED } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, long, match } = mk;
const IT = K.IT;
const acidFig = svgV(ACID_LETTERED, 'Acid rain scene with parts lettered A to E');
const ghFig = svgV(GREENHOUSE_LETTERED, 'Greenhouse effect with parts lettered A to E');
const ozFig = svgV(OZONE_LETTERED, 'Layers of the atmosphere and the ozone layer with parts lettered A to E');
const term = (o) => short({ marks: 1, wl: null, scheme: [[o.sch ?? 'Correct answer', 1]], ...o });
const tbl = (head, rows) => `| ${head.join(' | ')} |\n|${head.map(() => '---').join('|')}|\n${rows.map((x) => `| ${x.join(' | ')} |`).join('\n')}`;

// ---------------------------------------------------------------- deck-check items (not used in tests)
add('chk-so2eq', mcq({
  stem: 'Which equation shows the formation of sulphuric acid from sulphur trioxide?',
  right: r`$\ce{SO3 + H2O -> H2SO4}$`, wrong: [r`$\ce{SO2 + H2O -> H2SO4}$`, r`$\ce{SO3 + H2O -> H2SO3}$`, r`$\ce{SO3 -> SO2 + H2O}$`],
  sol: 'Sulphur trioxide combines with water to give sulphuric acid, and the atoms balance — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('chk-nitric', mcq({
  stem: 'The brown gas that dissolves in rainwater to form nitric acid is',
  right: 'nitrogen dioxide', wrong: ['nitric oxide', 'nitrogen', 'carbon monoxide'],
  sol: 'Nitrogen dioxide is brown; nitric oxide is colourless — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('chk-ghg-source', mcq({
  stem: 'Burning coal in a power station mainly adds which greenhouse gas to the air?',
  right: 'carbon dioxide', wrong: ['oxygen', 'helium', 'neon'],
  sol: 'Coal is mostly carbon, which burns to carbon dioxide — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('chk-reduce', tf({
  stem: 'Planting trees helps to reduce the carbon dioxide in the air.',
  key: 't',
  sol: 'True. Green plants take in carbon dioxide for photosynthesis.',
  d: 1, c: 'understanding', t: [2],
}));
add('chk-ozone-eq', mcq({
  stem: 'Which equation shows an oxygen atom joining an oxygen molecule to form ozone?',
  right: r`$\ce{O + O2 -> O3}$`, wrong: [r`$\ce{O2 -> O + O}$`, r`$\ce{O3 -> O2 + O}$`, r`$\ce{2O3 -> 3O2}$`],
  sol: 'One atom plus one molecule gives the three-atom ozone molecule — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('chk-ozone-role', mcq({
  stem: 'The ozone layer is important to living things because it',
  right: 'absorbs harmful ultraviolet radiation from the Sun', wrong: ['absorbs the heat given out by the Earth', 'supplies oxygen for breathing', 'reflects all sunlight back into space'],
  sol: 'Ozone absorbs most of the harmful ultraviolet rays — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('chk-do', mcq({
  stem: 'On a hot, still day fish in a shallow pond come to the surface gasping because',
  right: 'warm water holds less dissolved oxygen', wrong: ['warm water holds more dissolved oxygen', 'fish cannot breathe in sunlight', 'plants add too much oxygen'],
  sol: 'Gases are less soluble in warm water — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('chk-mina', mcq({
  stem: 'Minamata disease was caused by compounds of which toxic metal?',
  right: 'mercury', wrong: ['lead', 'iron', 'sodium'],
  sol: 'Methylmercury in fish caused the disease — option (@K).',
  d: 1, c: 'recall', t: [5],
}));

// ---------------------------------------------------------------- t01 acid rain
add('acid-mcq1', mcq({
  stem: 'Which pair of gases is chiefly responsible for acid rain?',
  right: 'Sulphur dioxide and nitrogen dioxide', wrong: ['Carbon dioxide and methane', 'Oxygen and nitrogen', 'Ozone and carbon monoxide'],
  sol: 'Oxides of sulphur and nitrogen dissolve in rain to give acids — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('acid-mcq2', mcq({
  stem: 'Oxides of nitrogen are formed inside a petrol engine because',
  right: 'nitrogen and oxygen of the air combine at a very high temperature', wrong: ['petrol contains a large amount of nitrogen', 'the spark splits water into hydrogen and oxygen', 'the engine oil burns to form nitrogen'],
  sol: 'Nitrogen and oxygen react only in the very hot flame — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('acid-mcq3', mcq({
  stem: 'A power station burns coal rich in sulphur, and rain near it is found to contain sulphurous acid. The acid forms when',
  right: 'sulphur dioxide dissolves in the water droplets', wrong: ['sulphur burns directly in the rain', 'carbon dioxide reacts with sulphur', 'sulphates evaporate from the soil'],
  sol: 'Sulphur dioxide plus water gives sulphurous acid — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('acid-mcq4', mcq({
  stem: 'The marble facade of a building in an industrial city has become pitted and rough. The most likely cause is that',
  right: 'acids in the rain have reacted with calcium carbonate', wrong: ['ozone has oxidised the marble', 'the marble has turned into a metal', 'sunlight has melted its surface'],
  sol: 'Sulphuric and nitric acids attack calcium carbonate — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('acid-mcq5', mcq({
  stem: 'Which step would not help to reduce acid rain?',
  right: 'Burning coal that has a high sulphur content', wrong: ['Fitting catalytic converters to vehicles', 'Removing sulphur dioxide from chimney gases', 'Generating more power from the Sun'],
  sol: 'Sulphur-rich coal produces more sulphur dioxide — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('ar-acid', ar({
  a: 'Marble statues in industrial cities slowly wear away.',
  r: 'The acids in acid rain react with calcium carbonate.',
  key: 'c',
  sol: 'Both are true, and the reaction with calcium carbonate explains the wearing away — option (c).',
  d: 2, c: 'analysis', t: [1],
}));
add('eq-no', term({
  stem: 'Write a balanced equation for the formation of nitric oxide from nitrogen and oxygen at a very high temperature.',
  model: r`$\ce{N2 + O2 ->[\text{very high temperature}] 2NO}$`, sol: 'N₂ + O₂ gives 2NO at very high temperature.', sch: 'Balanced equation',
  d: 2, c: 'application', t: [1],
}));
add('eq-marble', term({
  stem: 'Write a balanced equation for the action of sulphuric acid in acid rain on marble (calcium carbonate).',
  model: r`$\ce{CaCO3 + H2SO4 -> CaSO4 + H2O + CO2}$`, sol: 'Calcium carbonate gives calcium sulphate, water and carbon dioxide.', sch: 'Balanced equation',
  d: 3, c: 'application', t: [1],
}));
add('term-sulphurous', term({
  stem: 'Name the acid formed when sulphur dioxide dissolves in water.',
  model: '**Sulphurous acid.**', sol: 'Sulphurous acid.', sch: 'Sulphurous acid',
  d: 1, c: 'recall', t: [1],
}));
add('bal-nitric', term({
  stem: r`Balance the skeletal equation for the formation of nitric acid in rain: $\ce{NO2 + O2 + H2O -> HNO3}$`,
  model: r`$\ce{4NO2 + O2 + 2H2O -> 4HNO3}$`, sol: `Coefficients ${IT.BAL.join(', ')}.`, sch: 'Balanced equation',
  d: 3, c: 'application', t: [1],
}));
add('tf-lightning', tf({
  stem: 'Lightning is a natural source of oxides of nitrogen in the air.',
  key: 't',
  sol: 'True. The heat of a lightning flash makes nitrogen and oxygen combine.',
  d: 1, c: 'recall', t: [1],
}));
add('s2-nox', short({
  marks: 2,
  stem: 'Explain how oxides of nitrogen are formed in a car engine, and name the brown gas that is formed when nitric oxide meets air.',
  model: 'Nitrogen and oxygen of the air **combine at the very high temperature** inside the engine to form **nitric oxide**, which in air gives the brown gas **nitrogen dioxide**.',
  sol: 'Very high temperature combines the two gases; nitrogen dioxide.',
  scheme: [['Nitrogen and oxygen combine at a very high temperature', 1], ['Nitrogen dioxide named as the brown gas', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('s2-acid-eff', short({
  marks: 2,
  stem: 'State one harmful effect of acid rain on (i) soil and (ii) a lake.',
  model: '(i) It **washes out nutrients** such as calcium and magnesium and harms plants. (ii) The water becomes **too acidic for fish and water plants**.',
  sol: 'Nutrients washed from soil; lake too acidic for life.',
  scheme: [['An effect on soil', 1], ['An effect on a lake', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('s3-acid-eqs', short({
  marks: 3, wl: null,
  stem: 'Write balanced equations to show how burning sulphur in a fuel can lead to sulphuric acid in rainwater, in three steps.',
  model: r`(i) $\ce{S + O2 -> SO2}$ (ii) $\ce{2SO2 + O2 -> 2SO3}$ (iii) $\ce{SO3 + H2O -> H2SO4}$`,
  sol: 'Sulphur to sulphur dioxide; to sulphur trioxide; to sulphuric acid.',
  scheme: [['Burning of sulphur', 1], ['Oxidation to sulphur trioxide', 1], ['Reaction with water', 1]],
  d: 2, c: 'application', t: [1],
}));
add('s3-nitric-eqs', short({
  marks: 3, wl: null,
  stem: 'Write balanced equations for (i) the formation of nitric oxide from the gases of the air, (ii) its change to nitrogen dioxide, and (iii) the formation of nitric acid from nitrogen dioxide, oxygen and water.',
  model: r`(i) $\ce{N2 + O2 ->[\text{high temperature}] 2NO}$ (ii) $\ce{2NO + O2 -> 2NO2}$ (iii) $\ce{4NO2 + O2 + 2H2O -> 4HNO3}$`,
  sol: 'Three balanced equations.',
  scheme: [['First equation', 1], ['Second equation', 1], ['Third equation', 1]],
  d: 3, c: 'application', t: [1],
}));
add('num-rmm', num({
  stem: 'Calculate the relative molecular mass of sulphurous acid, H₂SO₃. (H = 1, S = 32, O = 16)',
  value: K.M.H2SO3, unit: null,
  sol: `2 × 1 + 32 + 3 × 16 = ${K.M.H2SO3}.`,
  scheme: [[`${K.M.H2SO3}`, 1]],
  d: 1, c: 'application', t: [1],
}), (q) => q.answer.value === 82 || 'value');
add('num-pct-s', num({
  stem: 'Calculate the percentage of sulphur in sulphur dioxide, SO₂. (S = 32, O = 16)',
  value: K.P.S_in_SO2, unit: '%',
  sol: `32 ÷ ${K.M.SO2} × 100 = ${K.P.S_in_SO2}%.`,
  scheme: [[`${K.P.S_in_SO2}%`, 1]],
  d: 2, c: 'application', t: [1],
}), (q) => q.answer.value === 50 || 'value');
add('num-pct-n', num({
  stem: 'Calculate the percentage of nitrogen in nitrogen dioxide, NO₂, to one decimal place. (N = 14, O = 16)',
  value: K.P.N_in_NO2, unit: '%', tol: 0.05,
  sol: `14 ÷ ${K.M.NO2} × 100 = ${K.P.N_in_NO2}%.`,
  scheme: [[`${K.P.N_in_NO2}%`, 1]],
  d: 2, c: 'application', t: [1],
}), (q) => q.answer.value === 30.4 || 'value');
add('num-marble', num({
  stem: `A marble step loses ${K.MARBLE.mmYear} mm of its thickness each year in polluted air. How many millimetres does it lose in ${K.MARBLE.years} years?`,
  value: K.MARBLE_LOSS, unit: 'mm',
  sol: `${K.MARBLE.mmYear} × ${K.MARBLE.years} = ${K.MARBLE_LOSS} mm.`,
  scheme: [[`${K.MARBLE_LOSS} mm`, 1]],
  d: 1, c: 'application', t: [1],
}), (q) => q.answer.value === 20 || 'value');

// ---------------------------------------------------------------- t02 global warming
add('ghg-mcq1', mcq({
  stem: 'Which of these gases is not a greenhouse gas?',
  right: 'Oxygen', wrong: ['Carbon dioxide', 'Methane', 'Water vapour'],
  sol: 'Oxygen does not absorb the infrared radiation from the ground — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('ghg-mcq2', mcq({
  stem: 'Greenhouse gases help to keep the Earth warm because they',
  right: 'absorb infrared radiation from the ground and send part of it back', wrong: ['reflect all sunlight back into space', 'produce heat by reacting with ozone', 'stop visible light from reaching the ground'],
  sol: 'They trap some of the heat that the ground gives out — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('ghg-mcq3', mcq({
  stem: 'Nitrous oxide, a greenhouse gas, enters the air mainly from',
  right: 'fertilised farmland and burning fuels', wrong: ['photosynthesis in leaves', 'evaporation of seawater', 'cooling of lakes at night'],
  sol: 'Nitrogen fertilisers and fuel burning release nitrogen oxides — option (@K).',
  d: 2, c: 'recall', t: [2],
}));
add('ghg-mcq4', mcq({
  stem: 'A cement works heats limestone, CaCO₃, in a kiln. Which greenhouse gas is released by this reaction alone, apart from the fuel burnt?',
  right: 'Carbon dioxide', wrong: ['Methane', 'Water vapour', 'Nitrous oxide'],
  sol: 'CaCO₃ gives CaO and CO₂ on heating — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('ghg-mcq5', mcq({
  stem: 'Which pair of actions together would reduce the amount of carbon dioxide in the air the most?',
  right: 'Planting trees and replacing coal-fired power by wind power', wrong: ['Clearing forests and burning more coal', 'Using more petrol cars and planting trees', 'Burning wood in open fires and using more fertiliser'],
  sol: 'Trees take in carbon dioxide and wind power burns no fuel — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('ar-ghg', ar({
  a: 'Carbon dioxide is a greenhouse gas.',
  r: 'Carbon dioxide is released when fuels burn.',
  key: 'd',
  sol: 'Both are true, but burning fuels does not explain why carbon dioxide is a greenhouse gas; it absorbs infrared radiation — option (d).',
  d: 2, c: 'analysis', t: [2],
}));
add('term-ghgnames', term({
  stem: 'Name two greenhouse gases other than carbon dioxide.',
  model: '**Methane** and **water vapour** (or oxides of nitrogen).',
  sol: 'Two of methane, water vapour, oxides of nitrogen.', sch: 'Two gases',
  d: 1, c: 'recall', t: [2],
}));
add('tf-vapour', tf({
  stem: 'Water vapour is not a greenhouse gas.',
  key: 'f',
  sol: 'False. Water vapour is one of the greenhouse gases.',
  d: 2, c: 'recall', t: [2],
}));
add('s2-ghe', short({
  marks: 2,
  stem: 'Explain how greenhouse gases keep the Earth warmer than it would otherwise be.',
  model: 'Sunlight warms the ground, which gives out **infrared radiation**. The greenhouse gases **absorb part** of it and **send some back** towards the Earth, so less heat escapes to space.',
  sol: 'Ground gives out infrared; gases absorb and return part of it.',
  scheme: [['Ground gives out infrared radiation', 1], ['Greenhouse gases absorb and send part back', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('s2-reduce', short({
  marks: 2,
  stem: 'Suggest two ways in which a town could reduce the carbon dioxide it adds to the air.',
  model: 'It could **generate electricity from solar or wind power** instead of coal, and **plant trees** and improve **public transport** so that fewer fuel-burning vehicles are used.',
  sol: 'Cleaner energy; trees; public transport.',
  scheme: [['First measure', 1], ['Second measure', 1]],
  d: 1, c: 'application', t: [2],
}));
add('s3-ghg-sources', short({
  marks: 3, wl: [18, 70],
  stem: 'Name three greenhouse gases and give one source of each.',
  model: '1. **Carbon dioxide**: burning fossil fuels.\n2. **Methane**: cattle, wetlands or coal mines.\n3. **Nitrous oxide** (an oxide of nitrogen): fertilised farmland.',
  sol: 'Three gases with their sources.',
  scheme: [['First gas with source', 1], ['Second gas with source', 1], ['Third gas with source', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('num-city', num({
  stem: `The carbon dioxide at a bus stand was measured as ${IT.CITY2.before} parts per million before a new road opened and ${IT.CITY2.after} parts per million afterwards. (Imagined readings.) What was the percentage rise?`,
  value: IT.CITY2_PCT, unit: '%',
  sol: `Rise = ${IT.CITY2.after} − ${IT.CITY2.before} = ${IT.CITY2_RISE}; ${IT.CITY2_RISE} ÷ ${IT.CITY2.before} × 100 = ${IT.CITY2_PCT}%.`,
  scheme: [[`${IT.CITY2_PCT}%`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 20 || 'value');
add('num-commute', num({
  stem: `A car carrying one person gives out ${K.CAR_G_KM} g of carbon dioxide per km. (Illustrative figure.) How many kilograms does the car give out over a month in which it travels ${K.COMMUTE.km} km a day for ${K.COMMUTE.days} days?`,
  value: K.COMMUTE_KG, unit: 'kg',
  sol: `${K.CAR_G_KM} × ${K.COMMUTE.km} × ${K.COMMUTE.days} = ${K.COMMUTE_G} g = ${K.COMMUTE_KG} kg.`,
  scheme: [[`${K.COMMUTE_KG} kg`, 1]],
  d: 2, c: 'application', t: [2],
}), (q) => q.answer.value === 90 || 'value');
add('num-bus', num({
  stem: `A car carrying one person gives out ${K.CAR_G_KM} g of carbon dioxide per km. A bus gives out ${K.BUS.g_km} g per km and carries ${K.BUS.people} passengers. (Illustrative figures.) A commuter who travels ${K.COMMUTE.km} km a day for ${K.COMMUTE.days} days switches from the car to the bus. By what percentage does the commuter's carbon dioxide emission fall? Give the answer to one decimal place.`,
  value: K.COMMUTE_SAVED_PCT, unit: '%', tol: 0.05,
  sol: `Bus: ${K.BUS.g_km} ÷ ${K.BUS.people} = ${K.BUS_PER} g per passenger-km, so ${K.COMMUTE_BUS_KG} kg a month against ${K.COMMUTE_KG} kg by car. Saving = ${K.COMMUTE_SAVED_KG} ÷ ${K.COMMUTE_KG} × 100 = ${K.COMMUTE_SAVED_PCT}%.`,
  scheme: [[`${K.COMMUTE_SAVED_PCT}%`, 1]],
  d: 4, c: 'analysis', t: [2],
}), (q) => q.answer.value === 83.3 || 'value');

// ---------------------------------------------------------------- t03 ozone layer
add('ozone-mcq1', mcq({
  stem: 'Ozone is formed in the stratosphere when',
  right: 'ultraviolet radiation splits oxygen molecules into atoms that join other oxygen molecules', wrong: ['lightning splits nitrogen molecules', 'carbon dioxide reacts with water vapour', 'oxygen reacts with sulphur dioxide'],
  sol: 'Atoms from split oxygen molecules join oxygen molecules to form O₃ — option (@K).',
  d: 2, c: 'recall', t: [3],
}));
add('ozone-mcq2', mcq({
  stem: 'One molecule of ozone contains',
  right: 'three oxygen atoms', wrong: ['one oxygen atom', 'two oxygen atoms', 'four oxygen atoms'],
  sol: 'The formula of ozone is O₃ — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('ozone-mcq3', mcq({
  stem: 'Which of these is a chemical that depletes the ozone layer?',
  right: 'Chlorofluorocarbon', wrong: ['Argon', 'Methane', 'Water vapour'],
  sol: 'CFCs from refrigerators and sprays damage the ozone layer — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('ozone-mcq4', mcq({
  stem: 'People living where the ozone layer is thin are at greater risk of',
  right: 'skin cancer and eye cataracts', wrong: ['acid rain', 'Minamata disease', 'anaemia'],
  sol: 'More ultraviolet radiation reaches the ground — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('ozone-mcq5', mcq({
  stem: 'The ozone layer lies mainly in the',
  right: 'stratosphere', wrong: ['troposphere', 'ocean surface', 'soil'],
  sol: 'Most ozone is found in a band of the stratosphere — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('ar-ozone', ar({
  a: 'The ozone layer protects living things from harmful ultraviolet radiation.',
  r: 'Ozone is formed when ultraviolet radiation splits nitrogen molecules.',
  key: 'a',
  sol: 'The assertion is true. The reason is false: ultraviolet radiation splits oxygen molecules, which then form ozone — option (a).',
  d: 2, c: 'analysis', t: [3],
}));
add('eq-ozone', term({
  stem: 'Write a balanced equation for the formation of ozone from an oxygen atom and an oxygen molecule.',
  model: r`$\ce{O + O2 -> O3}$`, sol: 'O + O₂ gives O₃.', sch: 'Balanced equation',
  d: 2, c: 'recall', t: [3],
}));
add('term-cfc', term({
  stem: 'Name one group of chemicals that depletes the ozone layer.',
  model: '**Chlorofluorocarbons (CFCs)** (or halons).', sol: 'CFCs.', sch: 'A named group',
  d: 1, c: 'recall', t: [3],
}));
add('tf-cfc', tf({
  stem: 'Methane is the main chemical that depletes the ozone layer.',
  key: 'f',
  sol: 'False. Chlorofluorocarbons and halons deplete it; methane is a greenhouse gas.',
  d: 2, c: 'recall', t: [3],
}));
add('s2-ozone', short({
  marks: 2,
  stem: 'State the function of the ozone layer and one harmful effect on people if the layer becomes thinner.',
  model: 'It **absorbs harmful ultraviolet radiation** from the Sun. If it thins, more ultraviolet radiation reaches the ground and may cause **skin cancer** or eye cataracts.',
  sol: 'Absorbs ultraviolet; skin cancer or cataracts.',
  scheme: [['Absorbs harmful ultraviolet radiation', 1], ['An effect on people', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('s3-ozone-eqs', short({
  marks: 3, wl: null,
  stem: 'Write balanced equations for the two steps by which ozone is formed in the upper atmosphere, and state what supplies the energy for the first step.',
  model: r`(i) $\ce{O2 ->[UV] 2O}$ (ii) $\ce{O + O2 -> O3}$. The energy is supplied by **ultraviolet radiation** from the Sun.`,
  sol: 'Two equations; ultraviolet radiation.',
  scheme: [['First equation', 1], ['Second equation', 1], ['Ultraviolet radiation named', 1]],
  d: 2, c: 'application', t: [3],
}));
add('s3-ozone-hole', short({
  marks: 3, wl: [18, 70],
  stem: 'Name three chemicals that deplete the ozone layer and give one former use of any one of them.',
  model: '**Chlorofluorocarbons (CFCs)**, **halons** and **carbon tetrachloride** (or methyl bromide). CFCs were used in refrigerators and aerosol sprays (halons in fire extinguishers).',
  sol: 'Three names; one use.',
  scheme: [['First chemical', 1], ['Second and third chemicals', 1], ['A use', 1]],
  d: 1, c: 'recall', t: [3],
}));

// ---------------------------------------------------------------- t04 composition of water
add('water-mcq1', mcq({
  stem: 'Which of these dissolved substances do fish need to stay alive?',
  right: 'Oxygen', wrong: ['Mercury compounds', 'Pesticides', 'Plastic particles'],
  sol: 'Fish breathe the oxygen dissolved in water — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('water-mcq2', mcq({
  stem: 'Water at 30 °C holds less dissolved oxygen than water at 10 °C because',
  right: 'gases are less soluble in warm water', wrong: ['warm water contains more nitrogen', 'oxygen reacts with warm water', 'warm water is denser'],
  sol: 'The solubility of a gas falls as the temperature rises — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('water-mcq3', mcq({
  stem: 'Which dissolved minerals in drinking water help in building bones and teeth?',
  right: 'Calcium and magnesium salts', wrong: ['Lead and cadmium salts', 'Mercury salts', 'Nitrites'],
  sol: 'Calcium and magnesium are needed for bones and teeth — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('ar-water', ar({
  a: 'Water at 30 °C holds more dissolved oxygen than water at 10 °C.',
  r: 'The solubility of a gas in water falls as the temperature rises.',
  key: 'b',
  sol: 'The assertion is false because warm water holds less oxygen. The reason is true — option (b).',
  d: 2, c: 'analysis', t: [4],
}));
add('s2-do', short({
  marks: 2,
  stem: 'State two reasons why dissolved oxygen is important in a river.',
  model: 'Fish and other water animals **breathe** the dissolved oxygen, and **bacteria use it** to break down wastes in the water.',
  sol: 'Respiration of water animals; decomposition by bacteria.',
  scheme: [['Needed by fish and other animals to breathe', 1], ['Used by bacteria to break down waste', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('num-tank', num({
  stem: `An aquarium holds ${K.TANK.litres} litres of water with ${K.TANK.mgL} mg of dissolved oxygen per litre. (Imagined figures.) How many milligrams of oxygen are dissolved in the aquarium?`,
  value: K.TANK_MG, unit: 'mg',
  sol: `${K.TANK.mgL} × ${K.TANK.litres} = ${K.TANK_MG} mg.`,
  scheme: [[`${K.TANK_MG} mg`, 1]],
  d: 1, c: 'application', t: [4],
}), (q) => q.answer.value === 300 || 'value');
add('term-do', term({
  stem: 'Name two minerals, dissolved in drinking water, that the body needs.',
  model: '**Calcium** and **magnesium** (or sodium, potassium).', sol: 'Calcium and magnesium.', sch: 'Two minerals',
  d: 1, c: 'recall', t: [4],
}));

// ---------------------------------------------------------------- t05 harmful substances in water
add('harm-mcq1', mcq({
  stem: 'Minamata disease mainly affects the',
  right: 'nervous system', wrong: ['digestive system only', 'bones only', 'skin only'],
  sol: 'Methylmercury damages the nerves and brain — option (@K).',
  d: 2, c: 'recall', t: [5],
}));
add('harm-mcq2', mcq({
  stem: 'Mercury is found in much higher amounts in large fish than in plankton because',
  right: 'it builds up as it passes along the food chain', wrong: ['large fish live in warmer water', 'plankton remove it from the water completely', 'mercury is made inside the bodies of fish'],
  sol: 'Each feeding step adds to the amount stored — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('harm-mcq3', mcq({
  stem: 'Plastic bags thrown into a river are especially harmful because they',
  right: 'do not rot and can be swallowed by animals', wrong: ['dissolve and poison the water at once', 'increase the dissolved oxygen', 'are eaten by bacteria within a day'],
  sol: 'Plastics persist for a very long time — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('harm-mcq4', mcq({
  stem: 'Untreated sewage makes algae grow quickly in a lake because it adds',
  right: 'nitrates and phosphates', wrong: ['mercury compounds', 'ozone', 'chlorofluorocarbons'],
  sol: 'These nutrients feed the algae — option (@K).',
  d: 2, c: 'recall', t: [5],
}));
add('harm-mcq5', mcq({
  stem: 'Fish die in a lake after untreated sewage enters it. The main reason is that',
  right: 'bacteria decaying the waste use up the dissolved oxygen', wrong: ['sewage makes the water too cold', 'the sewage adds extra oxygen to the water', 'fish cannot swim in warm sewage'],
  sol: 'The oxygen is used up by decay — option (@K).',
  d: 3, c: 'application', t: [5],
}));
add('harm-mcq6', mcq({
  stem: 'A pesticide washed from a field kills fish in a stream. This shows that the pesticide',
  right: 'harms animals other than the pests it was meant to kill', wrong: ['stays only on the crop', 'is turned into oxygen by water', 'can only affect plants'],
  sol: 'Run-off carries it to water bodies and poisons other life — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('term-hg', term({
  stem: 'Name the toxic metal whose compounds caused Minamata disease.',
  model: '**Mercury.**', sol: 'Mercury.', sch: 'Mercury',
  d: 1, c: 'recall', t: [5],
}));
add('reason-plastic', term({
  stem: 'Give a reason: plastic bags should not be thrown into rivers and ponds.',
  model: 'They **do not rot**; they **block drains** and are **swallowed by animals** or tangle round them.',
  sol: 'Do not rot; harm animals.', sch: 'A valid reason',
  d: 2, c: 'understanding', t: [5],
}));
add('reason-sewage', term({
  stem: 'Give a reason: fish die in a lake that receives a lot of untreated sewage.',
  model: 'Bacteria that decay the waste and dead algae **use up the dissolved oxygen**.',
  sol: 'Dissolved oxygen is used up.', sch: 'A valid reason',
  d: 2, c: 'understanding', t: [5],
}));
add('s2-mina', short({
  marks: 2,
  stem: 'What caused Minamata disease and how did the poison reach the people who were affected?',
  model: 'It was caused by **mercury** in factory waste, changed to **methylmercury**, which built up in fish and shellfish that the people **ate**.',
  sol: 'Mercury waste; methylmercury in fish eaten by people.',
  scheme: [['Mercury (methylmercury) from waste', 1], ['Built up in fish and shellfish eaten by people', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('s2-plastic', short({
  marks: 2,
  stem: 'State two ways in which plastics harm water bodies.',
  model: 'Plastics **do not rot**, so they accumulate and **block drains**; animals **swallow them or get tangled** in them.',
  sol: 'Persist and block drains; animals swallow or tangle.',
  scheme: [['First harmful effect', 1], ['Second harmful effect', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('s3-sewage', short({
  marks: 3,
  stem: 'Describe how untreated sewage can lead to the death of fish in a lake.',
  model: 'Sewage adds **nitrates and phosphates**, so **algae grow quickly**. When the algae die, **bacteria decay them** and use up the **dissolved oxygen**, and the fish die for lack of oxygen.',
  sol: 'Nutrients; algal bloom; bacteria use oxygen.',
  scheme: [['Nutrients make algae grow', 1], ['Bacteria decay dead algae and waste', 1], ['Dissolved oxygen falls and fish die', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('s3-pest', short({
  marks: 3,
  stem: 'Describe three harmful effects of pesticides that are washed into a river.',
  model: '1. They **poison fish** and other water animals.\n2. They **kill animals that were not the pests** and the insects that fish feed on.\n3. They **build up along the food chain**, reaching harmful amounts in large animals.',
  sol: 'Poison fish; harm other animals; build up in food chains.',
  scheme: [['First effect', 1], ['Second effect', 1], ['Third effect', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('num-do', num({
  stem: `The dissolved oxygen in a lake was ${K.SEW.before} mg per litre before untreated sewage entered it and ${K.SEW.after} mg per litre after. (Imagined readings.) By what percentage did it fall? Give the answer to one decimal place.`,
  value: K.SEW_PCT, unit: '%', tol: 0.05,
  sol: `Fall = ${K.SEW.before} − ${K.SEW.after} = ${K.SEW_FALL}; ${K.SEW_FALL} ÷ ${K.SEW.before} × 100 = ${K.SEW_PCT}%.`,
  scheme: [[`${K.SEW_PCT}%`, 1]],
  d: 3, c: 'application', t: [4, 5],
}), (q) => q.answer.value === 62.5 || 'value');
add('num-bird', num({
  stem: `Mercury in a food chain (imagined figures, mg per kg): plankton ${K.CHAIN.plankton}, small fish ${K.CHAIN.small}, large fish ${K.CHAIN.large}, fish-eating bird ${K.CHAIN.bird}. How many times greater is the concentration in the bird than in the plankton?`,
  value: K.CHAIN_BIRD_X, unit: null,
  sol: `${K.CHAIN.bird} ÷ ${K.CHAIN.plankton} = ${K.CHAIN_BIRD_X}.`,
  scheme: [[`${K.CHAIN_BIRD_X}`, 1]],
  d: 3, c: 'application', t: [5],
}), (q) => q.answer.value === 625 || 'value');
add('num-hg', num({
  stem: `A sample of fish contains ${K.HG.found} mg of mercury per kg, but the limit set for food is ${K.HG.limit} mg per kg. (Imagined figures.) By what percentage of the limit does the sample exceed it?`,
  value: K.HG_PCT, unit: '%',
  sol: `Excess = ${K.HG.found} − ${K.HG.limit} = ${K.HG_OVER}; ${K.HG_OVER} ÷ ${K.HG.limit} × 100 = ${K.HG_PCT}%.`,
  scheme: [[`${K.HG_PCT}%`, 1]],
  d: 2, c: 'application', t: [5],
}), (q) => q.answer.value === 60 || 'value');

// ---------------------------------------------------------------- further application items
add('water-mcq4', mcq({
  stem: 'A village pond has only 3 mg of dissolved oxygen per litre, while the fish in it need at least about 5 mg per litre. Which step would most help the fish?',
  right: 'Stopping untreated sewage from entering the pond', wrong: ['Adding more fertiliser to the pond', 'Covering the pond with plastic sheets', 'Warming the water'],
  sol: 'Removing the source of waste stops bacteria from using up the oxygen — option (@K).',
  d: 2, c: 'application', t: [4, 5],
}));
add('id-no', term({
  stem: 'A colourless gas in vehicle exhaust turns brown when it meets the air. Name the colourless gas and the brown gas.',
  model: '**Nitric oxide** (colourless) and **nitrogen dioxide** (brown).', sol: 'Nitric oxide; nitrogen dioxide.', sch: 'Both gases named',
  d: 2, c: 'application', t: [1],
}));
add('eq-no2', term({
  stem: 'Write a balanced equation for the change of nitric oxide to nitrogen dioxide in the air.',
  model: r`$\ce{2NO + O2 -> 2NO2}$`, sol: '2NO + O₂ gives 2NO₂.', sch: 'Balanced equation',
  d: 2, c: 'application', t: [1],
}));
add('eq-so3', term({
  stem: 'Write a balanced equation for the oxidation of sulphur dioxide to sulphur trioxide by the oxygen of the air.',
  model: r`$\ce{2SO2 + O2 -> 2SO3}$`, sol: '2SO₂ + O₂ gives 2SO₃.', sch: 'Balanced equation',
  d: 2, c: 'application', t: [1],
}));
add('s2-litmus', short({
  marks: 2, wl: [10, 45],
  stem: 'A student bubbles sulphur dioxide into water and dips blue litmus paper into the solution. State what is seen and name the acid that has formed.',
  model: 'The blue litmus **turns red**, because the solution is acidic; the acid is **sulphurous acid**.',
  sol: 'Blue litmus turns red; sulphurous acid.',
  scheme: [['Blue litmus turns red', 1], ['Sulphurous acid named', 1]],
  d: 2, c: 'application', t: [1],
}));
add('num-plastic', num({
  stem: `A town throws away ${K.PLASTIC.tonnes} tonnes of plastic every day, and ${K.PLASTIC.collectedPct} per cent of it is collected for recycling. (Imagined figures.) How many tonnes are not collected and may reach drains and rivers?`,
  value: K.PLASTIC_LOST, unit: 'tonnes',
  sol: `Collected = ${K.PLASTIC.tonnes} × ${K.PLASTIC.collectedPct} ÷ 100 = ${K.PLASTIC_COLLECTED}; not collected = ${K.PLASTIC.tonnes} − ${K.PLASTIC_COLLECTED} = ${K.PLASTIC_LOST} tonnes.`,
  scheme: [[`${K.PLASTIC_LOST} tonnes`, 1]],
  d: 2, c: 'application', t: [5],
}), (q) => q.answer.value === 7.8 || 'value');
add('num-stream', num({
  stem: `A stretch of stream holds ${K.STREAM.litres / 1000000} million litres of water containing ${K.STREAM.mgL} mg of pesticide per litre. (Imagined figures.) How many grams of pesticide are in the water? (1 g = 1000 mg)`,
  value: K.STREAM_G, unit: 'g',
  sol: `${K.STREAM.mgL} × ${K.STREAM.litres} = ${K.STREAM_MG} mg = ${K.STREAM_G} g.`,
  scheme: [[`${K.STREAM_G} g`, 1]],
  d: 3, c: 'application', t: [5],
}), (q) => q.answer.value === 10 || 'value');

// ---------------------------------------------------------------- fill and match
add('fill-5', fill({
  marks: 5,
  stem: 'Complete the paragraph. Acid rain contains acids formed from oxides of (1) ____ and nitrogen. Sulphur dioxide dissolves in water to give (2) ____ acid. Carbon dioxide and methane are (3) ____ gases. The ozone layer absorbs harmful (4) ____ radiation. Mercury in fish caused (5) ____ disease.',
  acc: [['sulphur', 'sulfur'], ['sulphurous', 'sulfurous'], ['greenhouse'], ['ultraviolet', 'UV'], ['Minamata', 'minamata']],
  sol: 'Sulphur; sulphurous; greenhouse; ultraviolet; Minamata.',
  d: 1, c: 'recall', t: [1, 2, 3, 5],
}));
add('match-5', match({
  marks: 5,
  stem: 'Match each pollutant in Column A with its effect in Column B.',
  pairs: [
    ['Sulphur dioxide', 'Forms acid rain'],
    ['Chlorofluorocarbons', 'Thin the ozone layer'],
    ['Methylmercury', 'Damages the nervous system through fish'],
    ['Nitrates and phosphates from sewage', 'Cause algae to bloom'],
    ['Methane', 'Traps heat as a greenhouse gas'],
  ],
  order: [1, 4, 0, 3, 2],
  sol: 'Sulphur dioxide: acid rain; CFCs: ozone thinning; methylmercury: nerve damage; nitrates and phosphates: algal bloom; methane: heat trapping.',
  d: 2, c: 'understanding', t: [1, 2, 3, 5],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('acid-long', long({
  marks: 10, wl: null,
  stem: 'The diagram shows how acid rain forms and where it falls. Its parts are lettered A to E.\n\n(a) Name the parts A, B and E. [3]\n\n(b) Name the two gases from A that cause acid rain. [2]\n\n(c) Write balanced equations for the formation of sulphuric acid from sulphur dioxide in the air and in the cloud droplets. [3]\n\n(d) State one effect of acid rain on the soil at D and one on the lake at E. [2]',
  model: '**(a)** A: **chimney (factory) and vehicle**. B: **cloud**. E: **lake**.\n\n**(b)** **Sulphur dioxide** and **nitrogen dioxide** (oxides of nitrogen).\n\n**(c)** $\\ce{2SO2 + O2 -> 2SO3}$; $\\ce{SO3 + H2O -> H2SO4}$.\n\n**(d)** Soil: it **washes out nutrients** such as calcium and magnesium. Lake: the water becomes **too acidic for fish and plants**.',
  sol: 'Chimney and vehicle, cloud, lake; sulphur dioxide and nitrogen dioxide; two equations; effects on soil and lake.',
  scheme: [['A named', 1], ['B named', 1], ['E named', 1], ['First gas', 1], ['Second gas', 1], ['First equation balanced', 1], ['Second equation balanced', 1], ['Both formulae correct', 1], ['Effect on soil', 1], ['Effect on lake', 1]],
  d: 3, c: 'application', t: [1],
  assets: [acidFig],
}));
add('ghg-long', long({
  marks: 10, wl: null,
  stem: `The diagram shows the greenhouse effect. Its parts are lettered A to E.\n\n(a) Name the parts A, C and E. [3]\n\n(b) Explain how D helps to keep the Earth warm. [2]\n\n(c) Name two greenhouse gases that can be in D and give one source of each. [2]\n\n(d) A car carrying one person gives out ${K.CAR_G_KM} g of carbon dioxide per km. (Illustrative figure.) Calculate the mass, in kg, given out in a month in which it travels ${K.COMMUTE.km} km a day for ${K.COMMUTE.days} days. [2]\n\n(e) Suggest one way of reducing this emission. [1]`,
  model: `**(a)** A: **sunlight**. C: **infrared radiation from the ground**. E: **heat sent back to the Earth**.\n\n**(b)** The gases **absorb part of the infrared radiation** from the ground and **send some back**, so less heat escapes to space.\n\n**(c)** **Carbon dioxide** from burning fossil fuels; **methane** from cattle (or wetlands, coal mines).\n\n**(d)** ${K.CAR_G_KM} × ${K.COMMUTE.km} × ${K.COMMUTE.days} = ${K.COMMUTE_G} g = **${K.COMMUTE_KG} kg**.\n\n**(e)** Use **public transport** (or share the car, or use an electric vehicle charged from solar power).`,
  sol: `Sunlight, infrared from the ground, heat sent back; absorbs and returns infrared; two gases with sources; ${K.COMMUTE_KG} kg; public transport.`,
  scheme: [['A named', 1], ['C named', 1], ['E named', 1], ['Absorbs infrared radiation', 1], ['Sends part back', 1], ['First gas with source', 1], ['Second gas with source', 1], ['Working', 1], [`${K.COMMUTE_KG} kg`, 1], ['A measure', 1]],
  d: 3, c: 'application', t: [2],
  assets: [ghFig],
}), () => K.COMMUTE_KG === 90 || 'kg');
add('ozone-long', long({
  marks: 10, wl: null,
  stem: 'The diagram shows layers of the atmosphere and the ozone layer. Its parts are lettered A to E.\n\n(a) Name the parts A, B and D. [3]\n\n(b) Write balanced equations for the two steps in which ozone is formed from oxygen. [2]\n\n(c) State the function of B. [1]\n\n(d) Name two chemicals that deplete B. [2]\n\n(e) State two harmful effects on living things if B becomes thinner. [2]',
  model: '**(a)** A: **ultraviolet radiation** from the Sun. B: **ozone layer**. D: **troposphere**.\n\n**(b)** $\\ce{O2 ->[UV] 2O}$; $\\ce{O + O2 -> O3}$.\n\n**(c)** It **absorbs harmful ultraviolet radiation**.\n\n**(d)** **Chlorofluorocarbons (CFCs)** and **halons** (or carbon tetrachloride, methyl bromide).\n\n**(e)** More **skin cancer and eye cataracts** in people; **damage to crops** (or plankton).',
  sol: 'Ultraviolet radiation, ozone layer, troposphere; two equations; absorbs ultraviolet; CFCs and halons; skin cancer and crop damage.',
  scheme: [['A named', 1], ['B named', 1], ['D named', 1], ['First equation', 1], ['Second equation', 1], ['Function of B', 1], ['First chemical', 1], ['Second chemical', 1], ['First effect', 1], ['Second effect', 1]],
  d: 3, c: 'application', t: [3],
  assets: [ozFig],
}));
add('do-long', long({
  marks: 10, wl: null,
  stem: `A student finds in a reference table the oxygen that fresh water can hold at different temperatures (approximate values, in mg per litre).\n\n${tbl(['Temperature (°C)', ...K.DO.map((d) => String(d[0]))], [['Dissolved oxygen (mg per litre)', ...K.DO.map((d) => String(d[1]))]])}\n\n(a) State the trend shown by the table and give the reason for it. [2]\n\n(b) Calculate the percentage fall in the dissolved oxygen between 0 °C and 30 °C, to the nearest whole number. [2]\n\n(c) A pond holds ${IT.POND30.litres} litres of water saturated with oxygen at 30 °C. Calculate the mass of dissolved oxygen in grams. [2]\n\n(d) Why do fish in a warm, shallow pond come to the surface on a still day? [1]\n\n(e) State two reasons why dissolved oxygen, and two reasons why dissolved minerals, are needed by living things in water. [3]`,
  model: `**(a)** The dissolved oxygen **falls as the temperature rises**, because gases are **less soluble in warm water**.\n\n**(b)** Fall = ${K.DO[0][1]} − ${K.DO[3][1]} = ${K.DO_DROP_0_30}; ${K.DO_DROP_0_30} ÷ ${K.DO[0][1]} × 100 = **${K.DO_DROP_PCT}%**.\n\n**(c)** ${K.DO[3][1]} × ${IT.POND30.litres} = ${IT.POND30_MG} mg = **${IT.POND30_G} g**.\n\n**(d)** The warm water holds **less dissolved oxygen**, so they gasp for air at the surface.\n\n**(e)** Oxygen: fish **breathe** it and bacteria **use it** to break down wastes. Minerals: **calcium and magnesium** build bones, teeth and shells; **sodium and potassium** keep body fluids balanced (or nitrates and phosphates feed plants).`,
  sol: `Falls with temperature, less soluble gas; ${K.DO_DROP_PCT}%; ${IT.POND30_G} g; less oxygen in warm water; two reasons for oxygen and two for minerals.`,
  scheme: [['Trend', 1], ['Reason', 1], ['Working for the fall', 1], [`${K.DO_DROP_PCT}%`, 1], ['Working in mg', 1], [`${IT.POND30_G} g`, 1], ['Less oxygen in warm water', 1], ['Two reasons for oxygen', 1], ['First reason for minerals', 1], ['Second reason for minerals', 1]],
  d: 3, c: 'application', t: [4],
}), () => K.DO_DROP_PCT === 48 && IT.POND30_G === 38 || 'do');
add('mina-long', long({
  marks: 10, wl: null,
  stem: `A factory beside a coastal bay discharged waste containing mercury into the sea for many years. Fish from the bay were later tested; the mercury found (imagined figures, mg per kg) was ${K.CHAIN.plankton} in plankton, ${K.CHAIN.small} in small fish, ${K.CHAIN.large} in large fish and ${K.CHAIN.bird} in fish-eating birds. People who ate the fish fell ill.\n\n(a) Name the disease that affected the people and the form of mercury that caused it. [2]\n\n(b) Calculate how many times greater the concentration is in the birds than in the plankton. [2]\n\n(c) Explain what the figures show about how the mercury moves through the food chain. [2]\n\n(d) State two symptoms of the disease. [2]\n\n(e) Suggest two steps that should be taken to prevent a similar disaster. [2]`,
  model: `**(a)** **Minamata disease**, caused by **methylmercury**.\n\n**(b)** ${K.CHAIN.bird} ÷ ${K.CHAIN.plankton} = **${K.CHAIN_BIRD_X} times**.\n\n**(c)** The amount **increases at each step**, so mercury **builds up along the food chain** and is highest in the animals at the top.\n\n**(d)** **Numbness** and **loss of coordination** (or damage to speech, sight or hearing).\n\n**(e)** **Treat factory waste** and stop discharging mercury into water; **test fish** and **warn people** not to eat contaminated fish.`,
  sol: `Minamata disease and methylmercury; ${K.CHAIN_BIRD_X} times; builds up along the food chain; numbness and loss of coordination; treat waste, test fish.`,
  scheme: [['Disease named', 1], ['Methylmercury', 1], ['Working', 1], [`${K.CHAIN_BIRD_X} times`, 1], ['Increases at each step', 1], ['Builds up along the food chain', 1], ['First symptom', 1], ['Second symptom', 1], ['First preventive step', 1], ['Second preventive step', 1]],
  d: 3, c: 'application', t: [5],
}), () => K.CHAIN_BIRD_X === 625 || 'x');
add('lake-long', long({
  marks: 10, wl: null,
  stem: `A lake receives untreated sewage, run-off from fertilised fields and plastic waste from a town. After the monsoon the dissolved oxygen falls from ${K.SEW.before} mg per litre to ${K.SEW.after} mg per litre (imagined readings), and many fish die.\n\n(a) Calculate the percentage fall in dissolved oxygen, to one decimal place. [2]\n\n(b) Explain, in the correct order, how the sewage and run-off lead to the fall in dissolved oxygen. [3]\n\n(c) Name the two nutrients in sewage and fertiliser run-off that cause the algae to grow. [1]\n\n(d) State two ways in which the plastic waste harms the lake and its life. [2]\n\n(e) State two ways in which pesticides washed in from the fields could further harm the lake. [2]`,
  model: `**(a)** (${K.SEW.before} − ${K.SEW.after}) ÷ ${K.SEW.before} × 100 = **${K.SEW_PCT}%**.\n\n**(b)** **Nitrates and phosphates** make **algae multiply**; the algae die and **bacteria decay them**, using up the **dissolved oxygen**.\n\n**(c)** **Nitrates** and **phosphates**.\n\n**(d)** Plastics **do not rot** and **block drains**; animals **swallow them or get tangled** in them.\n\n**(e)** They **poison fish** and other animals and **build up along the food chain**.`,
  sol: `${K.SEW_PCT}%; nutrients, algae, bacteria, low oxygen; nitrates and phosphates; plastics persist and harm animals; pesticides poison and build up.`,
  scheme: [['Working', 1], [`${K.SEW_PCT}%`, 1], ['Nutrients make algae multiply', 1], ['Bacteria decay dead algae', 1], ['Dissolved oxygen is used up', 1], ['Nitrates and phosphates', 1], ['First effect of plastics', 1], ['Second effect of plastics', 1], ['First effect of pesticides', 1], ['Second effect of pesticides', 1]],
  d: 3, c: 'application', t: [4, 5],
}), () => K.SEW_PCT === 62.5 || 'pct');
