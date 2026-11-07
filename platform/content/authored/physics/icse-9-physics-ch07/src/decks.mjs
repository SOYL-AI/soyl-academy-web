// ICSE 9 Physics ch07 Heat and Energy. Deck 1: heat and temperature, the calorie, anomalous expansion of water, Hope's
// experiment and its consequences (t01, t02, t03). Deck 2: the greenhouse effect, global warming and energy degradation
// (t04, t05). Numbers come from calc.mjs; narration carries no digits, symbols or unit abbreviations.
import { sl, deck, table, flow, svgV, r } from '../../icse-9-physics-ch01/src/lib.mjs';
import { DENS_GRAPH, VOL_GRAPH, HOPE, HOPE_GRAPH, POND_FIG, GREENHOUSE, SANKEY_DECK } from './svgs.mjs';
import { D1, D1_J, D1_CONV, D1_ICE, D1_ICE_INC, D2_ENG, D2_BULB, V0, V4, V10, DV_0_4, DENS } from './calc.mjs';

export const V = {
  dens: svgV(DENS_GRAPH, 'Graph of the density of water against temperature from 0 to 10 degrees Celsius with the maximum at 4 degrees Celsius'),
  vol: svgV(VOL_GRAPH, 'Graph of the volume of one kilogram of water against temperature from 0 to 10 degrees Celsius with the minimum at 4 degrees Celsius'),
  hope: svgV(HOPE, 'Hope’s apparatus: a tall jar of water with a trough of freezing mixture round the middle and two thermometers'),
  hopeGraph: svgV(HOPE_GRAPH, 'Graph of the two thermometer readings in Hope’s experiment against time'),
  pond: svgV(POND_FIG, 'A frozen pond with ice at 0 degrees Celsius on top and water at 4 degrees Celsius at the bottom'),
  gh: svgV(GREENHOUSE, 'The greenhouse effect: sunlight reaches the ground, and the infrared from the ground is partly trapped by greenhouse gases'),
  sankey: svgV(SANKEY_DECK, 'Band diagram of a car engine: part of the energy from the fuel becomes useful motion and the rest spreads out as heat'),
};

export const deck1 = deck({
  part: 1,
  title: 'Heat and Energy — Part 1: Heat, temperature and the anomalous expansion of water',
  goals: [
    'Distinguish heat from temperature and convert between the calorie and the joule',
    'Describe the anomalous expansion of water and read its volume-temperature and density-temperature graphs',
    'Describe Hope’s experiment and explain how a pond freezes and why pipes burst in winter',
  ],
  slides: [
    sl('title', 'Hot, warm or cold: what is heat?', {
      b: 'Part 1 — heat is energy; temperature tells us how hot a body is. Water behaves oddly near freezing.',
      v: flow('LR', [['a', 'Hot body'], ['b', 'Heat flows'], ['c', 'Cold body']], [['a', 'b'], ['b', 'c']], 'Flow from a hot body to a cold body, with heat flowing between them'),
      n: 'A hot cup of tea cools down and a cold drink warms up. In both cases something flows between the drink and the room. That something is heat, and this chapter also shows why a frozen pond keeps fish alive.',
    }),
    sl('concept', 'Heat and temperature', {
      b: '**Heat** is a form of **energy**. It flows from a body at a **higher temperature** to one at a **lower temperature**. **Temperature** tells us **how hot or cold** a body is; it decides the **direction** in which heat flows.',
      v: table(['', 'Heat', 'Temperature'], [['Meaning', 'Energy that flows because of a temperature difference', 'Degree of hotness of a body'], ['SI unit', 'joule (J)', 'kelvin (K); also °C'], ['Measured with', 'A calorimeter', 'A thermometer'], ['Depends on mass?', 'Yes', 'No']], 'Table comparing heat and temperature by meaning, unit, instrument and dependence on mass'),
      n: 'Heat is energy on the move. Temperature is not energy at all; it is a measure of how hot something is. Heat always flows from the hotter body to the colder one, until their temperatures become equal.',
    }),
    sl('check', 'Quick check: which way does heat flow?', {
      b: 'Think about the temperatures, not the sizes, of the two blocks.',
      v: table(['Block', 'Temperature'], [['Block P', '80 °C'], ['Block Q', '30 °C']], 'Table of the temperatures of two blocks placed in contact'),
      chk: 'chk-flow',
      n: 'Two metal blocks, one hot and one cooler, are placed in contact. In which direction does heat flow?',
    }),
    sl('concept', 'Units of heat: joule and calorie', {
      b: 'The SI unit of heat is the **joule (J)**. The older unit, the **calorie (cal)**, is the heat needed to raise the temperature of **1 g of water by 1 °C**. **1 cal = 4.186 J**, and 1 kilocalorie (kcal) = 1000 cal.',
      v: table(['Unit', 'Symbol', 'Value'], [['joule', 'J', 'SI unit'], ['calorie', 'cal', '4.186 J'], ['kilocalorie', 'kcal', '1000 cal = 4186 J']], 'Table of the joule, the calorie and the kilocalorie'),
      m: [r`1\ \text{cal} = 4.186\ \text{J}`],
      n: 'The joule is the unit we use in science. The calorie comes from heating water: it is the heat that warms one gram of water by one degree Celsius. One calorie is about four point two joules.',
    }),
    sl('example', 'Worked example 1: heat in calories and joules', {
      b: r`**Problem.** How much heat is needed to raise the temperature of ${D1.m} g of water by ${D1.dt} °C? Give the answer in cal and in J. (1 cal = 4.186 J)

**Step 1.** 1 cal warms 1 g by 1 °C, so heat $= ${D1.m} \times ${D1.dt} = ${D1.cal}$ cal.

**Step 2.** $${D1.cal} \times 4.186 = ${D1_J}$ J.`,
      v: table(['Step', 'Working', 'Result'], [['Heat in calories', `${D1.m} × ${D1.dt}`, `${D1.cal} cal`], ['Heat in joules', `${D1.cal} × 4.186`, `${D1_J} J`]], 'Table of the working for the heat in calories and in joules'),
      n: 'Each gram needs one calorie for each degree. Multiply the mass by the rise in temperature to get the heat in calories. Then multiply by four point one eight six to change calories into joules.',
    }),
    sl('check', 'Quick check: calories to joules', {
      b: 'Multiply the number of calories by 4.186.',
      v: table(['Heat supplied', 'Conversion'], [['400 cal', '1 cal = 4.186 J']], 'Table of the heat supplied and the conversion factor'),
      chk: 'chk-conv',
      n: 'Four hundred calories of heat are supplied to a body. How many joules is this?',
    }),
    sl('concept', 'Most liquids expand on heating; water does not always', {
      b: 'Most liquids **expand** when heated and **contract** when cooled. Water is an exception between **0 °C and 4 °C**: when heated from 0 °C it **contracts** until 4 °C, and above 4 °C it **expands**. This is the **anomalous expansion of water**.',
      v: table(['Temperature range', 'Heating water causes', 'Volume', 'Density'], [['0 °C to 4 °C', 'Contraction', 'Decreases', 'Increases'], ['At 4 °C', '', 'Minimum', 'Maximum'], ['Above 4 °C', 'Expansion', 'Increases', 'Decreases']], 'Table of how the volume and density of water change on heating in different temperature ranges'),
      n: 'Warm a liquid and it normally swells. Water follows this rule above four degrees Celsius. Between zero and four degrees it does the opposite: it shrinks when heated. At four degrees its volume is smallest and its density is greatest.',
    }),
    sl('concept', 'Density against temperature', {
      b: 'The graph is drawn from measured values. Between **0 °C and 4 °C** the density **rises** and reaches its maximum, about **1000 kg m⁻³**, at **4 °C**; above 4 °C it **falls** again. The vertical scale is stretched, so the change looks bigger than it is.',
      v: V.dens,
      n: 'On the density graph the curve climbs from zero to four degrees Celsius and peaks at four. After that it falls. The peak marks the temperature at which water is densest. The vertical scale is stretched so that the small change can be seen.',
    }),
    sl('concept', 'Volume against temperature', {
      b: `The volume graph is the mirror image. A fixed mass of water has its **minimum volume at 4 °C**. For 1 kg of water the volume is about ${V0} cm³ at 0 °C, ${V4} cm³ at 4 °C and ${V10} cm³ at 10 °C: very small changes, so the scale is stretched.`,
      v: V.vol,
      n: 'The volume graph is a dip. A fixed mass of water takes up the least space at four degrees Celsius. On either side of that temperature the volume is a little larger. Because density is mass divided by volume, the two graphs are mirror images.',
    }),
    sl('check', 'Quick check: the temperature of maximum density', {
      b: 'Read the peak of the density graph.',
      v: table(['Temperature (°C)', 'Density (kg m⁻³)'], [['0', `${DENS[0]}`], ['4', `${DENS[4]}`], ['10', `${DENS[10]}`]], 'Table of the density of water at 0, 4 and 10 degrees Celsius'),
      chk: 'chk-4c',
      n: 'At which temperature is water at its greatest density?',
    }),
    sl('concept', 'Hope’s experiment: the apparatus', {
      b: 'A tall jar of water has a **trough of freezing mixture** (ice and salt) around its **middle**. A thermometer sits **above** the trough and another **below** it. The readings of both thermometers are noted as the water cools.',
      v: V.hope,
      n: 'In Hope’s experiment a tall jar of water is cooled in the middle by a freezing mixture. One thermometer reads the water near the top and the other reads the water near the bottom. Both readings are noted every few minutes.',
    }),
    sl('concept', 'Hope’s experiment: the readings', {
      b: 'The **lower thermometer** falls first and **stops at 4 °C**. Then the **upper thermometer** begins to fall and finally reaches **0 °C**. Water cooled in the middle is **denser**, so it sinks, until it reaches 4 °C, the greatest density. Colder water is **lighter** and stays on top.',
      v: V.hopeGraph,
      n: 'The cooled water in the middle gets denser and sinks, so the lower thermometer drops first. It stops at four degrees. Water cooler than that is lighter and stays above, so the upper thermometer falls later and ends at zero.',
    }),
    sl('concept', 'Consequences: a frozen pond', {
      b: 'In winter the **surface layer cools to 0 °C and freezes**. Ice is **less dense** than water, so it **floats** and shields the water below. The water at the **bottom stays at 4 °C**, so fish and plants **survive**. The pond freezes from the top downwards, not from the bottom.',
      v: V.pond,
      n: 'As the pond cools, the water at four degrees sinks to the bottom and the colder water rises to the surface and freezes. The floating ice is a poor conductor of heat, so the water beneath stays liquid and the fish stay alive.',
    }),
    sl('example', 'Worked example 2: water freezing in a pipe', {
      b: r`**Problem.** A closed pipe holds ${D1_ICE.v} cm³ of water. It freezes completely. Find the volume of the ice and the increase in volume. (Density of water 1000 kg m⁻³; of ice 900 kg m⁻³)

**Step 1.** Mass of water $= ${D1_ICE.v} \times 1 = ${D1_ICE.v}$ g. The mass stays the same when it freezes.

**Step 2.** Volume of ice $= \dfrac{${D1_ICE.v}}{0.9} = ${D1_ICE.vi}$ cm³, so the increase is $${D1_ICE.vi} - ${D1_ICE.v} = ${D1_ICE_INC}$ cm³.`,
      v: table(['Quantity', 'Working', 'Value'], [['Mass of water', `${D1_ICE.v} × 1 g cm⁻³`, `${D1_ICE.v} g`], ['Volume of ice', `${D1_ICE.v} ÷ 0.9`, `${D1_ICE.vi} cm³`], ['Increase', `${D1_ICE.vi} − ${D1_ICE.v}`, `${D1_ICE_INC} cm³`]], 'Table of the working for the volume of the ice and the increase in volume'),
      n: 'Freezing does not change the mass. Divide that mass by the smaller density of ice to find the larger volume. The extra space the ice needs pushes hard on the pipe, and a closed pipe can crack.',
    }),
    sl('concept', 'Why pipes burst and bottles crack', {
      b: 'Water **expands when it freezes**: ice takes up about **one-ninth more volume** than the water it came from. In a **closed pipe or sealed bottle** the ice has no room, so it exerts a very large force and the container **cracks**. That is why a full bottle should not be left in a freezer.',
      v: table(['Situation', 'What happens', 'Reason'], [['Water pipe in a freezing night', 'Pipe bursts', 'Ice needs more space than water'], ['Sealed bottle in a freezer', 'Bottle cracks', 'Water expands on freezing'], ['Rocks with water in cracks', 'Cracks widen', 'Ice expands on freezing']], 'Table of three situations in which expanding ice breaks the container'),
      n: 'When water turns to ice it takes up more space. If the pipe or bottle is full and closed, the ice pushes outwards with a huge force. The container cracks. The same thing slowly widens cracks in rocks on cold mountains.',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Heat is energy that flows from a hotter to a colder body; temperature tells how hot a body is.',
        'SI unit of heat: joule. 1 cal = 4.186 J; 1 kcal = 1000 cal.',
        'Water contracts from 0 °C to 4 °C and expands above 4 °C: its density is maximum and its volume minimum at 4 °C.',
        'Hope’s experiment: the lower thermometer stops at 4 °C, the upper falls to 0 °C. Ponds freeze from the top; the bottom stays at 4 °C. Closed pipes burst because ice occupies more volume.',
      ],
      v: table(['Quantity', 'Result'], [['Calorie', '4.186 J'], ['Maximum density of water', 'At 4 °C'], ['Bottom of a frozen pond', '4 °C']], 'Summary table of the calorie, the temperature of maximum density and the bottom of a frozen pond'),
      n: 'To sum up Part one. Heat is energy and flows from hot to cold. One calorie is four point one eight six joules. Water is densest at four degrees Celsius, which explains Hope’s experiment, frozen ponds and burst pipes.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Never say "temperature is heat": heat is energy, temperature is hotness.',
        'Write 1 cal = 4.186 J and show the multiplication in conversions.',
        'Label the 4 °C on both graphs: the density graph has a peak, the volume graph a dip.',
        'In Hope’s experiment, mention the lower thermometer first, and give the reason in terms of density.',
      ],
      v: table(['Slip', 'Fix'], [['Heat and temperature mixed up', 'Heat is energy; temperature is degree of hotness'], ['Water is lightest at 4 °C', 'It is densest at 4 °C'], ['The pond freezes from the bottom', 'It freezes from the top']], 'Table of three common slips and their fixes'),
      n: 'Exam tips. Keep heat and temperature apart. Show the factor four point one eight six in every conversion. Mark four degrees on both graphs. And in Hope’s experiment always give the reason using density.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Heat and Energy — Part 2: Greenhouse effect, global warming and energy degradation',
  goals: [
    'Explain the greenhouse effect, name the main greenhouse gases and distinguish it from global warming',
    'Describe the consequences of global warming and ways to reduce it',
    'Explain energy degradation with examples and do simple numerical problems on it',
  ],
  slides: [
    sl('title', 'Why is the Earth warm enough for life?', {
      b: 'Part 2 — a blanket of gases keeps the Earth warm; adding more makes it too warm. Useful energy also gets used up as heat.',
      v: flow('LR', [['a', 'Sunlight reaches the ground'], ['b', 'Ground gives out infrared'], ['c', 'Gases trap some of it']], [['a', 'b'], ['b', 'c']], 'Flow from sunlight reaching the ground to the ground giving out infrared and gases trapping some of it'),
      n: 'Without its atmosphere the Earth would be far too cold for life. Certain gases act like a blanket. This part explains how the blanket works, what happens when it grows thicker, and why energy loses its usefulness.',
    }),
    sl('concept', 'The greenhouse effect', {
      b: '**Sunlight** passes through the atmosphere and **warms the ground**. The warm ground gives out **infrared** radiation. **Greenhouse gases** absorb part of it and send some back to the ground, so the lower atmosphere stays **warmer than it would otherwise be**. This is the **greenhouse effect**.',
      v: V.gh,
      n: 'Sunlight easily passes through the air and warms the ground. The ground gives out heat as infrared waves. Greenhouse gases absorb some of these waves and send part of that energy back down, keeping the surface warm.',
    }),
    sl('concept', 'Greenhouse gases', {
      b: 'The main **greenhouse gases** are **carbon dioxide, methane, water vapour, nitrous oxide** and the **chlorofluorocarbons (CFCs)**. Nitrogen and oxygen, which make up most of the air, are **not** greenhouse gases.',
      v: table(['Gas', 'A common source'], [['Carbon dioxide', 'Burning coal, petrol and wood'], ['Methane', 'Paddy fields, cattle and rubbish dumps'], ['Water vapour', 'Evaporation from oceans and lakes'], ['Nitrous oxide', 'Fertilisers and some industries'], ['CFCs', 'Old refrigerators and aerosol sprays']], 'Table of five greenhouse gases and a common source of each'),
      n: 'Carbon dioxide, methane, water vapour, nitrous oxide and the chlorofluorocarbons all trap heat. Most of the air, nitrogen and oxygen, does not. Burning fuels, farming and rubbish all add greenhouse gases to the air.',
    }),
    sl('check', 'Quick check: which gases trap heat?', {
      b: 'Recall which gases absorb infrared radiation.',
      v: table(['Gas', 'Share of dry air'], [['Nitrogen', 'About 78%'], ['Oxygen', 'About 21%'], ['Carbon dioxide', 'A very small share']], 'Table of the shares of three gases in dry air'),
      chk: 'chk-gas',
      n: 'Some gases in the air absorb heat radiated by the Earth. Which pair of gases does this?',
    }),
    sl('concept', 'The natural greenhouse effect is useful', {
      b: 'Without the natural greenhouse effect the average temperature of the Earth’s surface would be about **−18 °C**, so oceans would freeze. With it, the average is about **15 °C**, which suits life. The trouble starts when **extra** greenhouse gases are added.',
      v: table(['Case', 'Average surface temperature (approx.)'], [['No greenhouse gases', '−18 °C'], ['With the natural greenhouse effect', '15 °C']], 'Table of the Earth’s average surface temperature without and with the natural greenhouse effect'),
      n: 'The natural greenhouse effect is helpful. It raises the average temperature of the Earth’s surface from about eighteen degrees below zero to about fifteen degrees above. The danger comes from adding extra greenhouse gases.',
    }),
    sl('concept', 'Global warming: causes', {
      b: '**Global warming** is the **rise in the average temperature of the Earth** caused by **extra greenhouse gases** added by human activity. **Causes:** burning **fossil fuels**, **cutting down forests** (fewer trees to absorb carbon dioxide), **farming and livestock**, and rubbish dumps. As of 2026, carbon dioxide in the air is above 420 parts per million, well above the level before industry.',
      v: table(['Human activity', 'Greenhouse gas added or removed'], [['Burning coal, oil and gas', 'Adds carbon dioxide'], ['Cutting down forests', 'Less carbon dioxide absorbed'], ['Cattle and paddy fields', 'Adds methane'], ['Rubbish dumps', 'Adds methane']], 'Table of four human activities and the effect of each on greenhouse gases'),
      n: 'Burning fuels, clearing forests, keeping cattle and growing paddy all add greenhouse gases or remove the trees that soak up carbon dioxide. As a result, the average temperature of the Earth has been rising.',
    }),
    sl('concept', 'Global warming: impact on life', {
      b: 'Rising temperatures **melt glaciers and polar ice**, which raises the **sea level** and floods coastal land. Other effects: **heat waves**, **droughts** and heavy rain, **harm to crops**, **bleaching of coral reefs** and loss of homes of animals. As of 2026, the Earth’s average temperature is roughly 1.1 to 1.3 °C above the level of the late 1800s.',
      v: table(['Effect', 'Result'], [['Melting ice', 'Higher sea level, coastal floods'], ['Hotter summers', 'Heat waves, water shortage'], ['Changed rainfall', 'Floods in some places, droughts in others'], ['Warmer oceans', 'Damage to coral reefs']], 'Table of four effects of global warming and their results'),
      n: 'A warmer Earth melts ice, so the sea rises and floods low coasts. It also brings heat waves, droughts, damaged crops and bleached coral reefs. Plants, animals and people all feel the change.',
    }),
    sl('check', 'Quick check: a result of global warming', {
      b: 'Think about what happens to ice when the Earth warms.',
      v: table(['Cause', 'Possible result'], [['More greenhouse gases', 'Higher average temperature']], 'Table linking more greenhouse gases to a higher average temperature'),
      chk: 'chk-warm',
      n: 'Which of these is a likely result of global warming?',
    }),
    sl('concept', 'What can we do?', {
      b: 'Burn **less fossil fuel**: use **solar, wind and hydro power**, save electricity, use **public transport** or cycle. **Plant trees** and protect forests. **Reduce, reuse and recycle** waste so that less rubbish rots in dumps. Everyone can help by switching off unused lights and fans.',
      v: table(['Action', 'Why it helps'], [['Solar and wind power', 'No carbon dioxide from burning fuel'], ['Planting trees', 'Trees absorb carbon dioxide'], ['Public transport', 'Fewer vehicles burning fuel'], ['Recycling', 'Less methane from rubbish dumps']], 'Table of four actions that reduce global warming and why each helps'),
      n: 'Using clean power, saving electricity, travelling together, planting trees and cutting waste all reduce the greenhouse gases we add. Small daily habits matter when millions of people share them.',
    }),
    sl('concept', 'Energy changes form and loses usefulness', {
      b: 'Energy is never destroyed, but in every change some of it turns into **heat that spreads into the surroundings** and cannot be fully collected for use again. The energy is still there but is **less useful**. This is **energy degradation**.',
      v: flow('LR', [['a', 'Fuel: chemical energy'], ['b', 'Engine'], ['c', 'Useful motion'], ['d', 'Heat and sound to the surroundings']], [['a', 'b'], ['b', 'c'], ['b', 'd']], 'Flow from the energy of the fuel through an engine to useful motion and heat and sound spread into the surroundings'),
      n: 'Fuel stored in a car holds useful energy. The engine changes it into motion, but also into heat and sound that spread into the air. That spread-out heat cannot be gathered again. The energy has been degraded.',
    }),
    sl('concept', 'Seeing degradation: a band diagram', {
      b: `The width of each band is **in proportion to the energy**. Of ${D2_ENG.in} J from the fuel, ${D2_ENG.useful} J becomes useful motion and ${D2_ENG.deg} J becomes **heat spread into the surroundings**. The total is the same: **energy is conserved**.`,
      v: V.sankey,
      n: 'The wide band on the left is the energy in. It splits into a narrow band of useful motion and a wider band of heat to the surroundings. The two outputs add up to the input, so no energy is lost, only made less useful.',
    }),
    sl('example', 'Worked example 1: a car engine', {
      b: r`**Problem.** A car engine takes ${D2_ENG.in} J of energy from the fuel and gives ${D2_ENG.useful} J of useful work. How much energy is degraded to heat? Give the answer in cal too. (1 cal = 4.186 J)

**Step 1.** Degraded energy $= ${D2_ENG.in} - ${D2_ENG.useful} = ${D2_ENG.deg}$ J.

**Step 2.** In calories: $\dfrac{${D2_ENG.deg}}{4.186} = ${D2_ENG.cal}$ cal (about).`,
      v: table(['Quantity', 'Working', 'Value'], [['Energy in', '', `${D2_ENG.in} J`], ['Useful work', '', `${D2_ENG.useful} J`], ['Degraded energy', `${D2_ENG.in} − ${D2_ENG.useful}`, `${D2_ENG.deg} J`], ['In calories', `${D2_ENG.deg} ÷ 4.186`, `${D2_ENG.cal} cal`]], 'Table of the working for the degraded energy of the car engine'),
      n: 'Subtract the useful work from the energy in to find the energy degraded into heat. To express it in calories, divide the joules by four point one eight six.',
    }),
    sl('check', 'Quick check: where does the rest go?', {
      b: 'Energy is conserved, but not all of it stays useful.',
      v: table(['Car engine', 'Energy'], [['Input from fuel', '20000 J'], ['Useful work', '5000 J']], 'Table of the energy input and useful work of a car engine'),
      chk: 'chk-degr',
      n: 'A car engine does less useful work than the energy of the fuel it burns. What happens to the rest?',
    }),
    sl('example', 'Worked example 2: an electric bulb', {
      b: r`**Problem.** A filament bulb takes ${D2_BULB.in} J of electrical energy and gives ${D2_BULB.light} J as light. Find the energy that becomes heat and the percentage of the input that is degraded to heat.

**Step 1.** Heat $= ${D2_BULB.in} - ${D2_BULB.light} = ${D2_BULB.heat}$ J.

**Step 2.** Percentage $= \dfrac{${D2_BULB.heat}}{${D2_BULB.in}} \times 100 = ${D2_BULB.pct}$ %.`,
      v: table(['Quantity', 'Working', 'Value'], [['Heat', `${D2_BULB.in} − ${D2_BULB.light}`, `${D2_BULB.heat} J`], ['Percentage as heat', `${D2_BULB.heat} ÷ ${D2_BULB.in} × 100`, `${D2_BULB.pct}%`]], 'Table of the working for the heat and the percentage of heat from the bulb'),
      n: 'Take the light away from the electrical energy to find the heat. Then divide the heat by the input and multiply by one hundred to get the percentage. Most of the energy of a filament bulb ends as heat.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Greenhouse effect: greenhouse gases absorb part of the infrared from the ground and send some back, keeping the Earth warm.',
        'Main greenhouse gases: carbon dioxide, methane, water vapour, nitrous oxide, CFCs.',
        'Global warming is the rise in average temperature due to extra greenhouse gases; it melts ice, raises sea level and upsets weather and ecosystems. Cut it by saving energy, using clean power and planting trees.',
        'Energy degradation: in every change some energy becomes heat that spreads into the surroundings and cannot be used again; total energy is conserved.',
      ],
      v: table(['Topic', 'Key point'], [['Greenhouse effect', 'Natural; keeps the Earth warm'], ['Global warming', 'Caused by extra greenhouse gases'], ['Energy degradation', 'Energy becomes less useful, not less in amount']], 'Summary table of the greenhouse effect, global warming and energy degradation'),
      n: 'To sum up Part two. The greenhouse effect is natural and useful. Adding extra greenhouse gases causes global warming. And when energy changes form, some is degraded to heat that cannot be reused, although the total stays the same.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Keep apart the greenhouse effect (natural, useful) and global warming (extra gases, harmful).',
        'Say that the ground gives out infrared, and the gases absorb and re-radiate it.',
        'Give two causes, two effects and two remedies for global warming.',
        'For degradation, say energy is conserved but becomes less useful.',
      ],
      v: table(['Slip', 'Fix'], [['The greenhouse effect is harmful', 'The natural effect keeps the Earth warm'], ['Energy is destroyed in a machine', 'It is changed into less useful forms'], ['Greenhouse gases trap sunlight', 'They trap infrared from the ground']], 'Table of three common slips and their fixes'),
      n: 'Exam tips. Separate the natural greenhouse effect from global warming. Name infrared as the radiation that is trapped. Give two causes, effects and remedies. And remember that degraded energy is not destroyed, only less useful.',
    }),
  ],
});
