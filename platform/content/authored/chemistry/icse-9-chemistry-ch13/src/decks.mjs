// ICSE 9 Chemistry ch13 Atmospheric and Environmental Chemistry. Part 1 (t01, t02): acid rain and global warming.
// Part 2 (t03, t04, t05): the ozone layer, dissolved oxygen and minerals, and harmful substances in water.
import { sl, deck, table, flow, svgV, plot, chem, r } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import { ACID, GREENHOUSE, OZONE } from './svgs.mjs';
import * as K from './calc.mjs';

const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
/** Numbers (whole and simple decimals) in words for the narration. */
export const W = (n) => {
  if (!Number.isInteger(n)) {
    const [a, b] = String(n).split('.');
    return `${W(Number(a))} point ${b.split('').map((d) => ONES[Number(d)]).join(' ')}`;
  }
  if (n < 20) return ONES[n];
  if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? ' ' + ONES[n % 10] : '');
  if (n < 1000) return ONES[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' and ' + W(n % 100) : '');
  return W(Math.floor(n / 1000)) + ' thousand' + (n % 1000 ? ' ' + W(n % 1000) : '');
};

const N1 = K.side(K.EQ.noform.r);
const N2 = K.side(K.EQ.no2form.r);
const N3 = K.side(K.EQ.nitric.r);

export const V = {
  acid: svgV(ACID, 'Acid rain scene: a chimney and vehicle release gases, which dissolve in cloud droplets and fall as acid rain on soil, trees and a lake'),
  greenhouse: svgV(GREENHOUSE, 'Greenhouse effect: sunlight reaches the ground, infrared radiation rises, and a layer of greenhouse gases sends some of it back'),
  ozone: svgV(OZONE, 'Layers of the atmosphere with the ozone layer inside the stratosphere absorbing ultraviolet radiation while visible light passes through'),
  doPlot: plot(
    {
      x: { min: 0, max: 45, label: 'Temperature of water (°C)' },
      y: { min: 0, max: 16, label: 'Dissolved oxygen at saturation (mg per litre)' },
      series: [{ label: 'Oxygen dissolved in fresh water', kind: 'line', points: K.DO }],
    },
    'Graph of the oxygen that water can hold against its temperature: a falling line from about fourteen at zero degrees to about six and a half at forty degrees',
    'Approximate textbook values for fresh water in contact with air at sea-level pressure; books differ slightly.',
  ),
};

export const deck1 = deck({
  part: 1,
  title: 'Atmospheric and Environmental Chemistry — Part 1: Acid rain and global warming',
  goals: [
    'Write equations showing how oxides of sulphur and nitrogen make acids in rainwater, and describe the effects of acid rain',
    'Name the main greenhouse gases and their sources',
    'Suggest measures that reduce emissions of greenhouse gases and the gases that cause acid rain',
  ],
  slides: [
    sl('title', 'Air, Rain and a Warming World', {
      b: 'Part 1 — how burning fuels changes the rain and the climate.',
      v: flow('LR', [['f', 'Burning fuels'], ['g', 'Gases in the air'], ['a', 'Acid rain'], ['w', 'Global warming']], [['f', 'g'], ['g', 'a'], ['g', 'w']], 'Flow: burning fuels, gases in the air, acid rain and global warming'),
      n: 'Every car, power station and furnace sends gases into the air. Some of these gases turn rain acidic. Others trap heat and warm the planet. This part follows both stories, from the chimney to the consequences.',
    }),
    sl('concept', 'Where the gases come from', {
      v: table(['Gas', 'Main human sources', 'Natural sources'], [['Sulphur dioxide', 'Burning coal and oil that contain sulphur; roasting sulphide ores; refineries', 'Volcanoes'], ['Nitrogen oxides', 'Petrol and diesel engines; furnaces and power stations at very high temperature', 'Lightning']], 'Table of sources of sulphur dioxide and nitrogen oxides'),
      n: 'Sulphur dioxide comes mainly from burning coal and oil that contain sulphur, and from refining and roasting ores. Nitrogen oxides come from the very hot flames in engines and furnaces, where nitrogen and oxygen of the air combine. Volcanoes and lightning add some naturally.',
    }),
    sl('concept', 'Sulphur oxides: from fuel to acid', {
      b: 'Burning sulphur in fuel gives **sulphur dioxide**, which reacts with water to give **sulphurous acid**. Some is oxidised in the air to **sulphur trioxide**, which gives **sulphuric acid**.',
      v: table(['Step', 'Equation'], [['Sulphur burns', 'S + O₂ → SO₂'], ['Sulphurous acid forms', 'SO₂ + H₂O → H₂SO₃'], ['Oxidation in air', '2SO₂ + O₂ → 2SO₃'], ['Sulphuric acid forms', 'SO₃ + H₂O → H₂SO₄']], 'Table of four equations from sulphur to sulphuric acid'),
      n: 'Sulphur in fuel burns to form sulphur dioxide. In the damp air it dissolves to give sulphurous acid. Some sulphur dioxide is oxidised to sulphur trioxide, and that dissolves in water to give sulphuric acid, a strong acid.',
    }),
    sl('diagram', 'How acid rain forms and where it falls', {
      b: 'Follow the gases from the chimney to the cloud and down to soil and lake.',
      v: V.acid,
      n: 'Smoke and exhaust carry sulphur dioxide and nitrogen dioxide upward. In a cloud they dissolve in the water droplets and form acids. When the rain falls, it carries the acids to soil, trees, rivers and lakes, and to buildings.',
    }),
    sl('check', 'Quick check: sulphuric acid', {
      b: 'Which equation shows the formation of sulphuric acid from sulphur trioxide?',
      chk: 'chk-so2eq',
      n: 'Sulphur trioxide must react with water.',
    }),
    sl('concept', 'Nitrogen oxides: from air to nitric acid', {
      b: 'In very hot engines and furnaces, nitrogen and oxygen of the air combine. **Nitric oxide** is oxidised to **nitrogen dioxide**, which dissolves in water and oxygen to give **nitric acid**.',
      v: table(['Step', 'Equation'], [['At very high temperature', 'N₂ + O₂ → 2NO'], ['Oxidation in air', '2NO + O₂ → 2NO₂'], ['In rainwater', '4NO₂ + O₂ + 2H₂O → 4HNO₃']], 'Table of three equations from nitrogen to nitric acid'),
      n: 'Nitrogen and oxygen do not react at normal temperatures, but in a very hot engine they form nitric oxide. In air this becomes nitrogen dioxide, a brown gas. Nitrogen dioxide, with oxygen and rainwater, gives nitric acid.',
    }),
    sl('example', 'Worked example 1: following the nitrogen', {
      b: 'Show that each step that turns nitrogen of the air into nitric acid is balanced.',
      ul: [`Step 1: N₂ + O₂ → 2NO: ${N1.N} nitrogen and ${N1.O} oxygen atoms on each side.`, `Step 2: 2NO + O₂ → 2NO₂: ${N2.N} nitrogen and ${N2.O} oxygen atoms on each side.`, `Step 3: 4NO₂ + O₂ + 2H₂O → 4HNO₃: ${N3.N} nitrogen, ${N3.O} oxygen and ${N3.H} hydrogen atoms on each side.`, `Check the masses of step 3: the left side totals ${K.mass(K.EQ.nitric.r)} and the right side ${K.mass(K.EQ.nitric.p)}.`],
      v: flow('LR', [['a', 'N₂ in air'], ['b', 'NO'], ['c', 'NO₂'], ['d', 'HNO₃ in rain']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow: nitrogen, nitric oxide, nitrogen dioxide, nitric acid'),
      n: `Count atoms in each step. In the first, ${W(N1.N)} nitrogen and ${W(N1.O)} oxygen atoms appear on both sides. In the second, ${W(N2.N)} nitrogen and ${W(N2.O)} oxygen atoms. In the third, ${W(N3.N)} nitrogen, ${W(N3.O)} oxygen and ${W(N3.H)} hydrogen atoms. All three balance.`,
    }),
    sl('check', 'Quick check: nitric acid', {
      b: 'The brown gas that dissolves in rainwater to form nitric acid is…',
      chk: 'chk-nitric',
      n: 'Which oxide of nitrogen is brown?',
    }),
    sl('concept', 'Effects of acid rain', {
      v: table(['Where', 'Effect'], [['Soil', 'Washes out nutrients such as calcium and magnesium; harms plants and soil organisms'], ['Lakes and rivers', 'Water becomes too acidic for fish eggs, fish and many water plants'], ['Buildings and statues', 'Marble and limestone are eaten away: CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂']], 'Table of the effects of acid rain on soil, water and buildings'),
      n: 'Acid rain washes nutrients from the soil and weakens trees and crops. In lakes it makes the water too acidic for fish and plants. It also attacks marble and limestone, because calcium carbonate reacts with the acids, so statues and monuments lose their surface.',
    }),
    sl('concept', 'Reducing acid rain', {
      v: flow('LR', [['a', 'Use fuels with less sulphur'], ['b', 'Remove SO₂ from chimney gases'], ['c', 'Fit catalytic converters to vehicles'], ['d', 'Use cleaner energy sources']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of ways to reduce acid rain'),
      n: 'To stop acid rain, cut the gases at the source. Use fuels with less sulphur, remove sulphur dioxide from chimney gases, fit catalytic converters to vehicles, and use cleaner sources of energy. As of 2026, India supplies petrol and diesel under the Bharat Stage six standard, which has very low sulphur.',
    }),
    sl('diagram', 'The greenhouse effect', {
      b: 'Greenhouse gases let sunlight in but **hold back some of the heat** that the ground gives out.',
      v: V.greenhouse,
      n: 'Sunlight passes through the air and warms the ground. The ground gives out heat as infrared radiation. Some of it escapes to space, but greenhouse gases absorb part of it and send it back down. This natural effect keeps the Earth warm enough for life.',
    }),
    sl('concept', 'Greenhouse gases and their sources', {
      v: table(['Greenhouse gas', 'Chief sources'], [['Water vapour', 'Evaporation from oceans, lakes and plants'], ['Carbon dioxide', 'Burning fossil fuels, cement making, clearing forests'], ['Methane', 'Wetlands, cattle, coal mining, leaks of natural gas, waste dumps'], ['Oxides of nitrogen (nitrous oxide)', 'Fertilised farmland, burning fuels, vehicle engines']], 'Table of greenhouse gases and their sources'),
      n: 'The main greenhouse gases are water vapour, carbon dioxide, methane and oxides of nitrogen. Water vapour comes from evaporation. Carbon dioxide comes mostly from burning fossil fuels and clearing forests. Methane comes from wetlands, cattle and coal mines, and nitrogen oxides from fertilisers and fuels.',
    }),
    sl('check', 'Quick check: a source', {
      b: 'Burning coal in a power station mainly adds which greenhouse gas to the air?',
      chk: 'chk-ghg-source',
      n: 'Coal is mostly carbon.',
    }),
    sl('example', 'Worked example 2: a rise in carbon dioxide', {
      b: `The carbon dioxide at a busy roadside was ${K.CITY.before} parts per million before a new flyover opened and ${K.CITY.after} parts per million after. (Imagined readings.) Find the percentage rise.`,
      ul: [`Step 1: rise = ${K.CITY.after} − ${K.CITY.before} = ${K.CITY_RISE} parts per million.`, `Step 2: percentage rise = ${K.CITY_RISE} ÷ ${K.CITY.before} × 100 = **${K.CITY_PCT}%**.`, 'Step 3: the extra gas came mostly from vehicles burning fuel: C + O₂ → CO₂ (carbon from the fuel).'],
      v: table(['Reading', 'Carbon dioxide (parts per million)'], [['Before the flyover', `${K.CITY.before}`], ['After the flyover', `${K.CITY.after}`], ['Rise', `${K.CITY_RISE} (${K.CITY_PCT}%)`]], 'Worked table of roadside carbon dioxide before and after'),
      n: `Subtract the first reading from the second to get the rise, which is ${W(K.CITY_RISE)} parts per million. Divide the rise by the first reading and multiply by one hundred. The rise is ${W(K.CITY_PCT)} per cent. The extra carbon dioxide comes from fuel burning in vehicles.`,
    }),
    sl('concept', 'Reducing greenhouse gas emissions', {
      v: flow('LR', [['a', 'Save energy at home and in industry'], ['b', 'Use solar, wind and hydro power'], ['c', 'Use public transport and share journeys'], ['d', 'Plant trees; stop forest clearing'], ['e', 'Manage waste and fertilisers']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow of measures to reduce greenhouse gas emissions'),
      n: 'To limit warming, use less energy, switch to solar, wind and hydro power, share journeys or use public transport, plant trees and protect forests, and manage waste and fertilisers so that less methane and nitrous oxide escape.',
    }),
    sl('check', 'Quick check: a measure', {
      b: 'True or false: planting trees helps to reduce the carbon dioxide in the air.',
      chk: 'chk-reduce',
      n: 'What do green plants take in for photosynthesis?',
    }),
    sl('summary', 'Summary', {
      ul: ['Sulphur dioxide and nitrogen oxides from fuels dissolve in rain to make sulphurous, sulphuric and nitric acids.', 'Acid rain harms soil, lakes and marble buildings.', 'Greenhouse gases (water vapour, carbon dioxide, methane, oxides of nitrogen) trap heat and cause global warming.', 'Fewer fossil fuels, cleaner energy, trees and better waste management reduce both problems.'],
      v: table(['Problem', 'Gases', 'Main cause'], [['Acid rain', 'SO₂, NO₂', 'Fuels containing sulphur; hot engines and furnaces'], ['Global warming', 'CO₂, CH₄, N₂O, water vapour', 'Fossil fuels, forest clearing, farming and waste']], 'Summary table of acid rain and global warming'),
      n: 'To recap. Sulphur dioxide and nitrogen oxides make acid rain, which harms soil, water and buildings. Greenhouse gases such as carbon dioxide and methane trap heat and warm the planet. Cleaner fuels and energy, more trees and better waste management help with both.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Write **balanced** equations and name each acid: sulphurous, sulphuric, nitric.', 'Give **two effects** of acid rain on soil and on aquatic life.', 'Link each greenhouse gas with a **source** and a way to **reduce** it.', 'Do not confuse the **greenhouse effect** (heat trapping) with the **ozone hole** (ultraviolet).'],
      n: 'Exam tips. Balance every equation and name the acids. Give effects on soil and on aquatic life. Match each greenhouse gas with a source and a remedy. And do not mix up the greenhouse effect with the ozone hole, which is a different problem.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Atmospheric and Environmental Chemistry — Part 2: The ozone layer and the chemistry of water',
  goals: [
    'Write equations for the formation of ozone and explain the role of the ozone layer',
    'Name the chemicals that deplete the ozone layer',
    'Explain why dissolved oxygen and minerals matter, and how heavy metals, plastics, sewage and pesticides harm water bodies',
  ],
  slides: [
    sl('title', 'The Ozone Layer and Our Water', {
      b: 'Part 2 — a shield high above us, and the substances in water that help or harm.',
      v: flow('LR', [['o', 'Ozone layer'], ['d', 'Dissolved substances'], ['p', 'Pollutants']], [['o', 'd'], ['d', 'p']], 'Flow: ozone layer, dissolved substances, pollutants'),
      n: 'High above us, a thin layer of ozone shields life from harmful sunlight. Down below, water carries oxygen and minerals that life needs, and sometimes poisons that it does not. This part covers both.',
    }),
    sl('diagram', 'The ozone layer in the atmosphere', {
      b: 'Most ozone lies in a band inside the **stratosphere**. It absorbs **harmful ultraviolet radiation** while visible light passes through.',
      v: V.ozone,
      n: 'The stratosphere sits above the layer of air where we live. Inside it is a band rich in ozone. This band absorbs the most harmful ultraviolet rays from the Sun, while ordinary light reaches the ground.',
    }),
    sl('concept', 'How ozone is formed', {
      b: 'In the upper atmosphere, **ultraviolet radiation** splits oxygen molecules into atoms. An atom joins a molecule of oxygen to form **ozone**.',
      v: table(['Step', 'Equation'], [['Ultraviolet splits oxygen', 'O₂ → O + O (ultraviolet radiation)'], ['Atom joins a molecule', 'O + O₂ → O₃'], ['Overall', '3O₂ → 2O₃']], 'Table of the equations for the formation of ozone'),
      n: 'Ultraviolet radiation splits an oxygen molecule into two oxygen atoms. Each atom then joins an oxygen molecule to make a molecule of ozone, which has three atoms. Overall, three molecules of oxygen make two of ozone.',
    }),
    sl('example', 'Worked example 1: counting atoms in ozone formation', {
      b: 'Show that the overall equation for ozone formation balances.',
      ul: ['Step 1: ultraviolet radiation splits one oxygen molecule into two atoms: $\\ce{O2 ->[UV] 2O}$.', 'Step 2: each atom joins a further oxygen molecule: $\\ce{O + O2 -> O3}$, twice over, using two more molecules of oxygen.', `Step 3: add up: three molecules of oxygen (${3 * 2} atoms) give two molecules of ozone (${2 * 3} atoms), so **3O₂ → 2O₃**.`, `Check the masses: 3 × ${K.M.O2} = ${3 * K.M.O2}; 2 × ${K.M.O3} = ${2 * K.M.O3}.`],
      v: chem(r`3O2 -> 2O3`, 'Overall equation: three oxygen molecules give two ozone molecules', 'Overall change; ultraviolet energy is needed'),
      n: `Count oxygen atoms. Three molecules of oxygen contain six atoms. Two molecules of ozone also contain six atoms, so the equation balances. The masses also match at ${W(3 * K.M.O2)} on each side.`,
    }),
    sl('check', 'Quick check: forming ozone', {
      b: 'Which equation shows an oxygen atom joining an oxygen molecule to form ozone?',
      chk: 'chk-ozone-eq',
      n: 'Ozone has three oxygen atoms.',
    }),
    sl('concept', 'Why the ozone layer matters', {
      v: table(['Without enough ozone, more ultraviolet reaches the ground', 'Result'], [['Human health', 'More skin cancer and eye cataracts'], ['Crops and plants', 'Reduced growth and yield'], ['Water life', 'Damage to tiny plankton that feed other life']], 'Table of effects of extra ultraviolet radiation'),
      n: 'The ozone layer absorbs harmful ultraviolet rays. If it thins, more rays reach the ground, causing skin cancer and eye cataracts in people, damage to crops, and harm to the tiny plankton that feed life in the oceans.',
    }),
    sl('concept', 'What damages the ozone layer', {
      b: 'Certain man-made chemicals rise to the stratosphere and **destroy ozone faster than it is made**. Only their **names** are needed at this level.',
      v: table(['Ozone-depleting chemical', 'Where it was used'], [['Chlorofluorocarbons (CFCs)', 'Refrigerators, air conditioners, aerosol sprays, foam'], ['Halons', 'Fire extinguishers'], ['Carbon tetrachloride', 'Cleaning solvent'], ['Methyl bromide', 'Soil fumigant for pests']], 'Table of ozone-depleting chemicals and their former uses'),
      n: 'The main ozone-depleting chemicals are chlorofluorocarbons, halons, carbon tetrachloride and methyl bromide. They were used in refrigeration, sprays, fire extinguishers, cleaning and farming. Under an international agreement, their use has been phased out, and as of 2026 the ozone layer is slowly recovering.',
    }),
    sl('check', 'Quick check: the shield', {
      b: 'The ozone layer is important to living things because it…',
      chk: 'chk-ozone-role',
      n: 'Think about which radiation it removes.',
    }),
    sl('concept', 'Dissolved oxygen and minerals in water', {
      v: table(['Dissolved substance', 'Why it is needed'], [['Oxygen', 'Fish and other water animals breathe it; bacteria use it to break down wastes'], ['Carbon dioxide', 'Water plants use it in photosynthesis'], ['Calcium and magnesium salts', 'Build bones, teeth and shells'], ['Sodium and potassium salts', 'Keep body fluids balanced and help nerves work'], ['Nitrates and phosphates (small amounts)', 'Plant nutrients for water plants']], 'Table of dissolved substances in natural water and why each is needed'),
      n: 'Natural water is not just water. Dissolved oxygen lets fish breathe. Dissolved carbon dioxide feeds water plants. Calcium and magnesium build bones, teeth and shells. Sodium and potassium keep body fluids balanced. Small amounts of nitrates and phosphates feed plants.',
    }),
    sl('diagram', 'Warm water holds less oxygen', {
      b: 'The amount of oxygen that water can hold **falls as the temperature rises**.',
      v: V.doPlot,
      n: 'Cold water can hold much more oxygen than warm water. At zero degrees, fresh water can hold about fourteen milligrams per litre, but at thirty degrees only about seven and a half. This is why fish suffer in hot, still water.',
    }),
    sl('example', 'Worked example 2: oxygen in a pond', {
      b: `A pond holds ${K.POND.litres} litres of water with ${K.POND.mgL} mg of dissolved oxygen per litre. (Imagined figures.) Find the mass of dissolved oxygen in grams.`,
      ul: [`Step 1: total in mg = ${K.POND.mgL} × ${K.POND.litres} = ${K.POND_MG} mg.`, `Step 2: 1000 mg = 1 g, so ${K.POND_MG} ÷ 1000 = **${K.POND_G} g**.`, 'Step 3: this is a tiny fraction of the water, but it is enough for fish and bacteria to survive.'],
      v: table(['Quantity', 'Value'], [['Oxygen per litre', `${K.POND.mgL} mg`], ['Volume of the pond', `${K.POND.litres} litres`], ['Total oxygen', `${K.POND_G} g`]], 'Worked table for the oxygen in a pond'),
      n: `Multiply the oxygen in each litre by the number of litres to get ${W(K.POND_MG)} milligrams. Then divide by one thousand to change to grams. The pond holds ${W(K.POND_G)} grams of dissolved oxygen.`,
    }),
    sl('check', 'Quick check: dissolved oxygen', {
      b: 'On a hot, still day fish in a shallow pond come to the surface gasping because…',
      chk: 'chk-do',
      n: 'Remember what temperature does to dissolved gases.',
    }),
    sl('concept', 'A toxic heavy metal: Minamata disease', {
      b: 'A factory at Minamata Bay in Japan discharged waste containing **mercury**. Microbes changed it to **methylmercury**, which built up along the food chain and poisoned people who ate the fish.',
      v: flow('LR', [['f', 'Factory waste with mercury'], ['m', 'Microbes make methylmercury'], ['p', 'Plankton and small fish absorb it'], ['b', 'Large fish: higher amounts'], ['h', 'People: nerve damage']], [['f', 'm'], ['m', 'p'], ['p', 'b'], ['b', 'h']], 'Flow showing how mercury reached people through the food chain at Minamata'),
      n: 'Minamata disease was first recognised in the nineteen fifties in Japan. Mercury from a factory entered the bay. Microbes turned it into methylmercury, which built up in fish and shellfish. People who ate them suffered numbness, loss of coordination and damage to speech, sight and hearing. As of 2026, an international treaty controls mercury.',
    }),
    sl('concept', 'Plastics, sewage and pesticides', {
      v: table(['Pollutant', 'Effect on water bodies'], [['Plastics', 'Do not rot; block drains; animals swallow or get tangled in them; break into tiny pieces'], ['Untreated sewage', 'Carries disease germs; adds nutrients that cause algae to bloom; bacteria then use up the dissolved oxygen'], ['Pesticides', 'Wash in from fields; poison fish and other animals; build up along food chains']], 'Table of the effects of plastics, sewage and pesticides on water bodies'),
      n: 'Plastics do not rot, so they block drains and harm animals that swallow them. Untreated sewage carries germs and feeds algae. When the algae die, bacteria use up dissolved oxygen and fish die. Pesticides washed from fields poison water life and build up in food chains.',
    }),
    sl('concept', 'Sewage and the loss of oxygen', {
      v: flow('LR', [['s', 'Sewage and fertiliser run-off'], ['n', 'Extra nitrates and phosphates'], ['a', 'Algae bloom on the surface'], ['d', 'Algae die; bacteria decay them'], ['o', 'Dissolved oxygen falls; fish die']], [['s', 'n'], ['n', 'a'], ['a', 'd'], ['d', 'o']], 'Flow showing how sewage and fertiliser run-off lead to the loss of dissolved oxygen'),
      n: 'Sewage and fertiliser run-off add nutrients to a lake. Algae grow quickly and cover the surface. When they die, bacteria decay them and use up the dissolved oxygen. Without oxygen, fish and other animals die.',
    }),
    sl('check', 'Quick check: Minamata', {
      b: 'Minamata disease was caused by compounds of which toxic metal?',
      chk: 'chk-mina',
      n: 'The metal is a liquid at room temperature.',
    }),
    sl('summary', 'Summary', {
      ul: ['Ozone forms from oxygen under ultraviolet radiation: O₂ → O + O, then O + O₂ → O₃. It absorbs harmful ultraviolet radiation.', 'Chlorofluorocarbons, halons, carbon tetrachloride and methyl bromide deplete it.', 'Dissolved oxygen and minerals are essential in water; warm water holds less oxygen.', 'Mercury (Minamata disease), plastics, sewage and pesticides harm water life and people.'],
      v: table(['Topic', 'Key point'], [['Ozone layer', 'Absorbs harmful ultraviolet radiation'], ['Dissolved oxygen', 'Needed by fish; falls as water warms or is polluted'], ['Mercury', 'Builds up in the food chain'], ['Sewage', 'Nutrients, then loss of oxygen']], 'Summary table of the ozone layer and water pollution'),
      n: 'To recap. Ozone forms from oxygen and shields us from ultraviolet radiation. Chlorofluorocarbons and similar chemicals damage it. Water needs dissolved oxygen and minerals. Mercury, plastics, sewage and pesticides pollute water and harm living things.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Write the ozone equations as **O₂ → O + O** then **O + O₂ → O₃** (UV needed).', 'For the ozone layer give the **function** (absorbs ultraviolet) and **names** of depleting chemicals only.', 'Explain Minamata disease with **mercury**, **food chain** and **nerve damage**.', 'For sewage, give the **sequence**: nutrients, algae, bacteria, low oxygen.'],
      n: 'Exam tips. Write the two ozone equations and mention ultraviolet radiation. Give the function of the ozone layer and name the chemicals that damage it. For Minamata, mention mercury, the food chain and nerve damage. For sewage, give the sequence from nutrients to low oxygen.',
    }),
  ],
});
