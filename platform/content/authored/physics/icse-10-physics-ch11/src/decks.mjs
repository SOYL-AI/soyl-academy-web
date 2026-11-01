// ICSE 10 Physics ch11 Calorimetry — two decks: Part 1 (t01–t03) heat and temperature, heat capacity and specific heat
// capacity, the method of mixtures, the high specific heat capacity of water; Part 2 (t04–t05) change of state, the heating
// curve of water, specific latent heat of fusion, everyday effects of latent heat. Numbers are computed here.
import { sl, deck, table, flow, svgV, plot, r } from './lib.mjs';
import { BREEZES, MIXTURE, HEATING_POINTS, C_WATER, L_FUSION } from './svgs.mjs';

const f = (x, n = 3) => String(Number(x.toPrecision(n)));
const V = {
  breeze: svgV(BREEZES, 'Sea breeze by day and land breeze at night, caused by the different specific heat capacities of land and water'),
  mix: svgV(MIXTURE, 'A hot metal in water in a calorimeter: heat lost by the metal equals heat gained by the water and calorimeter'),
};
const heatPlot = plot(
  {
    x: { min: 0, max: 1000, label: 'time (s), heater power 1000 W' },
    y: { min: -20, max: 120, label: 'temperature (°C)' },
    series: [{ label: '1 kg of ice at −10 °C heated steadily', points: HEATING_POINTS, kind: 'line' }],
    hlines: [{ y: 0, label: 'melting point 0 °C', dashed: true }, { y: 100, label: 'boiling point 100 °C', dashed: true }],
  },
  'Heating curve of one kilogram of ice heated at a steady one kilowatt: the temperature rises from minus ten to zero degrees in 21 seconds, stays at zero for 336 seconds while the ice melts, rises to one hundred degrees in the next 420 seconds, and then stays at one hundred while the water boils',
  'Flat parts: change of state at constant temperature (latent heat). Sloping parts: temperature rise (Q = mcΔT).',
);
// worked examples
const Q1 = 2 * C_WATER * 50;
const Tmix = (0.5 * 80 + 1.5 * 20) / 2;
const cMetal = (0.6 * C_WATER * 5) / (0.4 * 70);
const Qmelt = 0.25 * L_FUSION;
const Tice = (0.2 * C_WATER * 40 - 0.05 * L_FUSION) / (0.2 * C_WATER + 0.05 * C_WATER);

export const deck1 = deck({
  part: 1,
  title: 'Calorimetry — Part 1: Specific heat capacity and mixtures',
  goals: [
    'Distinguish heat from temperature and state their units',
    'Use Q = mcΔT and relate heat capacity to specific heat capacity',
    'Apply the principle of mixtures to find a final temperature or a specific heat capacity',
    'Explain effects of the high specific heat capacity of water',
  ],
  slides: [
    sl('title', 'Why is the sand hot and the sea cool?', {
      b: 'Part 1 — on a sunny afternoon the beach sand is too hot to walk on, yet the sea stays cool. Different materials need different amounts of heat to warm up.',
      v: table(['Substance', 'Specific heat capacity (J kg⁻¹ K⁻¹)'], [['Water', '4200'], ['Ice', '2100'], ['Aluminium', '900'], ['Copper', '400'], ['Lead', '130']], 'Table of specific heat capacities of five substances'),
      n: 'Namaste! On a hot day at the beach, the sand burns your feet but the sea feels cool, even though both receive the same sunshine. Water needs far more heat than sand to warm up by the same amount. In this part we measure this property, called specific heat capacity, and use it to predict temperatures when hot and cold things mix.',
    }),
    sl('concept', 'Heat and temperature', {
      b: '**Heat** is a form of energy that flows from a hotter body to a colder one; SI unit **joule (J)**; also the **calorie** (1 cal ≈ 4.2 J), the heat needed to warm 1 g of water by 1 °C. **Temperature** is the degree of hotness that decides the direction of heat flow; SI unit **kelvin (K)**, commonly **degree Celsius (°C)**; a change of 1 °C equals a change of 1 K. A bucket of warm water holds more heat than a cup of boiling water, though its temperature is lower.',
      v: table(['Feature', 'Heat', 'Temperature'], [['What it is', 'Energy in transfer', 'Degree of hotness'], ['SI unit', 'Joule', 'Kelvin'], ['Measured with', 'Calorimeter', 'Thermometer'], ['Depends on mass?', 'Yes', 'No']], 'Table comparing heat and temperature'),
      n: 'Heat is energy that flows from a hotter body to a colder one, and it is measured in joules. Temperature tells us how hot something is, and it decides which way heat will flow; it is measured in kelvin or degrees Celsius. A bucket of warm water contains more heat energy than a cup of boiling water, even though its temperature is lower.',
    }),
    sl('concept', 'Heat capacity and specific heat capacity', {
      b: r`**Heat capacity** $C$ of a body: heat needed to raise its temperature by 1 °C (1 K); unit **J K⁻¹**. **Specific heat capacity** $c$ of a substance: heat needed to raise the temperature of **1 kg** of it by 1 K; unit **J kg⁻¹ K⁻¹** (also J g⁻¹ °C⁻¹). Relation: $C = mc$. Heat absorbed or given out: $Q = mc\,\Delta T$. Water has a very high value, $c = ${C_WATER}\ \text{J kg}^{-1}\ \text{K}^{-1}$ (4.2 J g⁻¹ °C⁻¹).`,
      v: table(['Quantity', 'Symbol', 'Depends on', 'SI unit'], [['Heat capacity', 'C', 'Material and mass', 'J K⁻¹'], ['Specific heat capacity', 'c', 'Material only', 'J kg⁻¹ K⁻¹']], 'Table comparing heat capacity and specific heat capacity'),
      n: 'The heat capacity of a body is the heat needed to raise its temperature by one degree, and it depends on how much material there is. Specific heat capacity is the heat needed for one kilogram of a substance, so it depends only on what the substance is. Heat capacity equals mass times specific heat capacity, and the heat taken in is mass times specific heat capacity times the rise in temperature.',
    }),
    sl('example', 'Worked example: using Q = mcΔT', {
      b: r`**Problem.** How much heat is needed to warm 2 kg of water from 25 °C to 75 °C? What is the heat capacity of this water? ($c = ${C_WATER}\ \text{J kg}^{-1}\ \text{K}^{-1}$)

**Heat:** $Q = mc\,\Delta T = 2 \times ${C_WATER} \times 50 = ${Q1}\ \text{J}$ ($${f(Q1 / 1000)}\ \text{kJ}$).

**Heat capacity:** $C = mc = 2 \times ${C_WATER} = ${2 * C_WATER}\ \text{J K}^{-1}$.`,
      v: table(['Quantity', 'Value'], [['Mass', '2 kg'], ['Rise in temperature', '50 °C'], ['Heat needed', `${Q1} J`], ['Heat capacity', `${2 * C_WATER} J K⁻¹`]], 'Table of values for heating two kilograms of water'),
      n: 'Multiply mass, specific heat capacity and temperature rise: two times four thousand two hundred times fifty gives four hundred and twenty thousand joules. The heat capacity of this water is its mass times its specific heat capacity, eight thousand four hundred joules per kelvin, which is the heat needed for each one degree rise.',
    }),
    sl('check', 'Quick check: specific heat capacity', {
      b: 'Calculate heat or compare specific heat capacities.',
      n: 'Quick check. Heat equals mass times specific heat capacity times temperature change.',
      chk: 'qmc-mcq',
    }),
    sl('diagram', 'Principle of method of mixtures', {
      b: r`When a hot body and a cold body are mixed and **no heat is lost to the surroundings**, **heat lost by the hot body = heat gained by the cold body**, until both reach the same final temperature $T$. For a hot body (mass $m_1$, specific heat $c_1$, temperature $T_1$) and a cold one ($m_2$, $c_2$, $T_2$): $m_1c_1(T_1 - T) = m_2c_2(T - T_2)$. A **calorimeter** (a polished copper vessel in an insulating jacket, with a stirrer and thermometer) reduces heat loss.`,
      v: V.mix,
      n: 'When a hot object is put into cold water, heat flows from the hot object to the water until they reach the same temperature. If no heat escapes to the surroundings, the heat lost by the hot object equals the heat gained by the water. A calorimeter, a polished copper can kept in an insulating jacket, is used to keep heat losses small.',
    }),
    sl('example', 'Worked example: mixing hot and cold water', {
      b: r`**Problem.** 0.5 kg of water at 80 °C is mixed with 1.5 kg of water at 20 °C. Find the final temperature, assuming no heat is lost.

**Heat lost** $= 0.5 \times c \times (80 - T)$; **heat gained** $= 1.5 \times c \times (T - 20)$.

Equate (the $c$ cancels): $40 - 0.5T = 1.5T - 30$, so $2T = 70$ and $T = ${f(Tmix)}\ ^\circ\text{C}$.`,
      v: table(['Water', 'Mass', 'Initial temperature', 'Change'], [['Hot', '0.5 kg', '80 °C', `falls by ${f(80 - Tmix)} °C`], ['Cold', '1.5 kg', '20 °C', `rises by ${f(Tmix - 20)} °C`]], 'Table of the hot and cold water in the mixing example'),
      n: 'Write heat lost equal to heat gained. Both are water, so the specific heat capacity cancels. Half a kilogram falls from eighty degrees to the final temperature, while one and a half kilograms rises from twenty. Solving gives thirty five degrees Celsius. Notice that the smaller hot mass changes temperature three times as much as the larger cold mass.',
    }),
    sl('example', 'Worked example: specific heat capacity of a metal', {
      b: r`**Problem.** A 0.4 kg metal block at 100 °C is dropped into 0.6 kg of water at 25 °C. The final temperature is 30 °C. Ignoring the calorimeter, find the specific heat capacity of the metal.

**Heat gained by water** $= 0.6 \times ${C_WATER} \times 5 = ${0.6 * C_WATER * 5}\ \text{J}$.

**Heat lost by metal** $= 0.4 \times c \times 70 = 28c$.

$28c = ${0.6 * C_WATER * 5}$, so $c = ${f(cMetal)}\ \text{J kg}^{-1}\ \text{K}^{-1}$, a value typical of iron or steel.`,
      v: table(['Body', 'Mass', 'ΔT', 'Heat'], [['Water', '0.6 kg', '5 °C (gain)', `${0.6 * C_WATER * 5} J`], ['Metal', '0.4 kg', '70 °C (loss)', `${0.6 * C_WATER * 5} J`]], 'Table of heat gained by water and heat lost by the metal'),
      n: 'The water warms by five degrees, so it gains twelve thousand six hundred joules. The metal cools by seventy degrees and must lose the same heat. Dividing twelve thousand six hundred by nought point four times seventy gives four hundred and fifty joules per kilogram per kelvin, a value typical of iron or steel.',
    }),
    sl('check', 'Quick check: method of mixtures', {
      b: 'Find a final temperature by the method of mixtures.',
      n: 'Quick check. Heat lost by the hot body equals heat gained by the cold body.',
      chk: 'mix-mcq',
    }),
    sl('diagram', 'Water’s high specific heat capacity', {
      b: 'Water warms up and cools down slowly because its specific heat capacity is very high. Effects and uses: **sea and land breezes**; **coastal places have a moderate climate**; **water as a coolant** in car radiators and power stations; **hot-water bottles** stay warm for long; **farmers flood fields** on frosty nights so the water gives out heat and protects crops; the **human body** (mostly water) resists sudden temperature changes.',
      v: V.breeze,
      n: 'Water has an unusually high specific heat capacity, so it heats and cools slowly. By day the land heats faster than the sea and a cool sea breeze blows inland; at night the land cools faster and a land breeze blows out to sea. Water is used to cool car engines and in hot water bottles, and farmers flood fields on frosty nights to protect their crops.',
    }),
    sl('check', 'Quick check: uses of water', {
      b: 'Explain an effect of the high specific heat capacity of water.',
      n: 'Quick check. Water takes in or gives out a lot of heat for a small temperature change.',
      chk: 'water-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Heat: energy in transfer (J, cal); temperature: degree of hotness (K, °C).',
        'Heat capacity C = mc (J K⁻¹); specific heat capacity c (J kg⁻¹ K⁻¹); Q = mcΔT.',
        'Method of mixtures: heat lost = heat gained (no loss to surroundings).',
        'Water: c = 4200 J kg⁻¹ K⁻¹; sea breezes, moderate coastal climate, coolant, hot-water bottles.',
      ],
      v: table(['Formula', 'Use'], [['Q = mcΔT', 'Heat for a temperature change'], ['C = mc', 'Heat capacity'], ['m₁c₁(T₁ − T) = m₂c₂(T − T₂)', 'Mixtures']], 'Summary table of formulae in Part 1'),
      n: 'Let us sum up Part 1. Heat is energy in transfer and temperature is the degree of hotness. The heat to warm a body is mass times specific heat capacity times temperature rise. When things mix, heat lost equals heat gained. And because water has such a high specific heat capacity, it moderates climate and makes an excellent coolant.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Convert grams to kilograms when c is in J kg⁻¹ K⁻¹.',
        'In mixtures, write “heat lost = heat gained” and keep each ΔT positive.',
        'Include the calorimeter’s heat if its mass and c are given.',
        'State the assumption: no heat lost to the surroundings.',
      ],
      v: table(['Slip', 'Fix'], [['Q = 200 × 4200 × 10 for 200 g', 'Use 0.2 kg'], ['ΔT negative in heat lost', 'Use (T₁ − T) for the hot body'], ['Ignoring the calorimeter', 'Add m_cal c_cal ΔT when given']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some tips. Convert grams to kilograms when the specific heat capacity is per kilogram. In mixture problems, write heat lost equals heat gained and keep each temperature change positive. Include the calorimeter when its mass and specific heat are given. And state that no heat is lost to the surroundings.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Calorimetry — Part 2: Change of state and latent heat of fusion',
  goals: [
    'Interpret the heating curve of ice to steam',
    'Define specific latent heat of fusion and use Q = mL',
    'Solve mixture problems involving melting ice',
    'Explain everyday effects of the latent heat of fusion',
  ],
  slides: [
    sl('title', 'Heat that does not raise the temperature', {
      b: 'Part 2 — when ice melts, it absorbs heat but its temperature stays at 0 °C until all of it has melted. Where does that heat go?',
      v: table(['Change of state', 'Name', 'Heat'], [['Solid → liquid', 'Melting (fusion)', 'Absorbed'], ['Liquid → solid', 'Freezing', 'Given out'], ['Liquid → gas', 'Boiling (vaporisation)', 'Absorbed'], ['Gas → liquid', 'Condensation', 'Given out']], 'Table of four changes of state and whether heat is absorbed or given out'),
      n: 'Put a thermometer in melting ice and keep heating it. The temperature stays at zero degrees until all the ice has gone, even though heat keeps flowing in. That heat is used to change solid ice into liquid water, not to make it hotter. In this part we measure this hidden or latent heat.',
    }),
    sl('concept', 'Change of state and latent heat', {
      b: r`A **change of state** (melting, boiling) happens at a **fixed temperature** for a pure substance at a given pressure. During melting, heat is absorbed to **separate the molecules from their fixed positions**, not to raise the temperature. **Specific latent heat of fusion** $L$: heat needed to change **1 kg** of a solid at its melting point into liquid at the same temperature; unit **J kg⁻¹**. For ice, $L = ${L_FUSION}\ \text{J kg}^{-1}$ (336 J g⁻¹). Heat to melt mass $m$: $Q = mL$. The same heat is **given out** when the liquid freezes.`,
      v: table(['Quantity', 'Formula', 'Unit'], [['Heat for temperature change', 'Q = mcΔT', 'J'], ['Heat for melting', 'Q = mL', 'J'], ['Specific latent heat of fusion of ice', '336 000', 'J kg⁻¹']], 'Table of the two heat formulae and the latent heat of fusion of ice'),
      n: 'A pure substance melts at a fixed temperature. While it melts, the heat it absorbs breaks the molecules free from their fixed positions instead of making it hotter. The heat needed to melt one kilogram at its melting point is called the specific latent heat of fusion. For ice it is three hundred and thirty six thousand joules per kilogram. When water freezes, the same heat is given out.',
    }),
    sl('diagram', 'Heating curve of ice to steam', {
      b: r`Heating 1 kg of ice from −10 °C at a steady 1000 W: **AB** ice warms to 0 °C ($Q = mc_{\text{ice}}\Delta T$, 21 s); **BC** ice melts at 0 °C ($Q = mL$, 336 s) — flat; **CD** water warms to 100 °C ($Q = mc_{\text{water}}\Delta T$, 420 s); **DE** water boils at 100 °C — flat. The flat parts show **latent heat**: heat absorbed with no change in temperature. The melting part is much longer than the ice-warming part.`,
      v: heatPlot,
      n: 'This graph shows one kilogram of ice heated steadily. First the ice warms from minus ten to zero degrees. Then the line is flat while the ice melts, for over five minutes, because all the heat goes into melting. Then the water warms up to one hundred degrees, and the line is flat again while it boils. The flat parts are where latent heat is absorbed.',
    }),
    sl('check', 'Quick check: the heating curve', {
      b: 'Read the flat and sloping parts of a heating curve.',
      n: 'Quick check. Flat parts mean a change of state at constant temperature.',
      chk: 'curve-mcq',
    }),
    sl('example', 'Worked example: melting ice', {
      b: r`**Problem.** (a) How much heat is needed to melt 250 g of ice at 0 °C? (b) How much more to warm the melted water to 30 °C? ($L = ${L_FUSION}\ \text{J kg}^{-1}$, $c = ${C_WATER}\ \text{J kg}^{-1}\ \text{K}^{-1}$)

**(a)** $Q_1 = mL = 0.25 \times ${L_FUSION} = ${Qmelt}\ \text{J}$.

**(b)** $Q_2 = mc\,\Delta T = 0.25 \times ${C_WATER} \times 30 = ${0.25 * C_WATER * 30}\ \text{J}$.

**Total** $= ${Qmelt + 0.25 * C_WATER * 30}\ \text{J}$.`,
      v: flow('LR', [['a', 'Ice at 0 °C'], ['b', 'Water at 0 °C'], ['c', 'Water at 30 °C']], [['a', 'b', `mL = ${Qmelt} J`], ['b', 'c', `mcΔT = ${0.25 * C_WATER * 30} J`]], 'Flow of heat needed to melt ice and then warm the water'),
      n: 'Melting needs mass times latent heat: a quarter of a kilogram times three hundred and thirty six thousand gives eighty four thousand joules. Warming the melted water by thirty degrees needs mass times specific heat times temperature rise, thirty one thousand five hundred joules. Melting takes much more heat than warming, even for a thirty degree rise.',
    }),
    sl('check', 'Quick check: latent heat', {
      b: 'Calculate the heat needed to melt ice.',
      n: 'Quick check. Heat to melt equals mass times specific latent heat of fusion.',
      chk: 'melt-mcq',
    }),
    sl('example', 'Worked example: ice in a drink', {
      b: r`**Problem.** 50 g of ice at 0 °C is added to 200 g of water at 40 °C. Find the final temperature $T$, assuming no heat loss.

**Heat gained by ice:** melting $0.05 \times ${L_FUSION} = ${0.05 * L_FUSION}\ \text{J}$, then warming $0.05 \times ${C_WATER} \times T = ${0.05 * C_WATER}T$.

**Heat lost by water:** $0.2 \times ${C_WATER} \times (40 - T) = ${0.2 * C_WATER * 40} - ${0.2 * C_WATER}T$.

**Equate:** $${0.05 * L_FUSION} + ${0.05 * C_WATER}T = ${0.2 * C_WATER * 40} - ${0.2 * C_WATER}T$, so $${0.25 * C_WATER}T = ${0.2 * C_WATER * 40 - 0.05 * L_FUSION}$ and $T = ${f(Tice)}\ ^\circ\text{C}$.`,
      v: table(['Step', 'Heat (J)'], [['Ice melts', String(0.05 * L_FUSION)], ['Melted ice warms to T', `${0.05 * C_WATER}T`], ['Water cools from 40 °C to T', `${0.2 * C_WATER}(40 − T)`]], 'Table of the heat terms in the ice-in-water example'),
      n: 'The ice gains heat twice: first to melt, sixteen thousand eight hundred joules, then to warm the melted water up to the final temperature. The warm water loses heat as it cools from forty degrees. Setting heat gained equal to heat lost and solving gives a final temperature of sixteen degrees Celsius.',
    }),
    sl('example', 'Worked example: heat given out on freezing', {
      b: r`**Problem.** An ice tray holds 0.15 kg of water at 20 °C. How much heat must the freezer remove to turn it into ice at 0 °C?

**Cooling the water to 0 °C:** $Q_1 = mc\,\Delta T = 0.15 \times ${C_WATER} \times 20 = ${0.15 * C_WATER * 20}\ \text{J}$.

**Freezing at 0 °C:** $Q_2 = mL = 0.15 \times ${L_FUSION} = ${0.15 * L_FUSION}\ \text{J}$.

**Total removed** $= ${0.15 * C_WATER * 20 + 0.15 * L_FUSION}\ \text{J}$ — most of it latent heat.`,
      v: table(['Stage', 'Heat removed (J)'], [['Water 20 °C → 0 °C', String(0.15 * C_WATER * 20)], ['Water → ice at 0 °C', String(0.15 * L_FUSION)], ['Total', String(0.15 * C_WATER * 20 + 0.15 * L_FUSION)]], 'Table of heat removed in cooling and freezing water in an ice tray'),
      n: 'First the freezer must cool the water from twenty degrees down to zero, removing about twelve thousand six hundred joules. Then it must remove the latent heat, fifty thousand four hundred joules, to turn the water into ice at zero degrees. Freezing takes four times as much heat as the cooling, which is why ice trays take a long time to freeze.',
    }),
    sl('concept', 'Ice at 0 °C cools better than water at 0 °C', {
      b: 'Each kilogram of ice at 0 °C must **first absorb 336 000 J to melt** before it can warm up, while water at 0 °C starts warming at once. So ice takes much more heat from a drink: it cools better. Other effects of the latent heat of fusion: **snow on hills melts slowly**, keeping rivers flowing through summer; **frozen lakes thaw slowly**; ponds freeze slowly, because a lot of heat must be removed from the water before it turns to ice; **ice-cream** and **frozen foods** stay cold for long.',
      v: table(['Coolant (same mass)', 'Heat it can absorb before reaching 10 °C (per kg)'], [['Water at 0 °C', `${C_WATER * 10} J`], ['Ice at 0 °C', `${L_FUSION + C_WATER * 10} J`]], 'Table comparing the heat absorbed by water at zero degrees and ice at zero degrees in warming to ten degrees'),
      n: 'Ice at zero degrees cools a drink much better than ice-cold water at zero degrees. Before the ice can even start to warm up, every kilogram must take in three hundred and thirty six thousand joules to melt, and that heat comes from the drink. Latent heat also explains why snow on mountains melts slowly through the summer, keeping rivers flowing.',
    }),
    sl('check', 'Quick check: everyday latent heat', {
      b: 'Explain an everyday effect of latent heat of fusion.',
      n: 'Quick check. Ice must absorb its latent heat before its temperature can rise.',
      chk: 'icecool-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Change of state happens at constant temperature; heat goes into separating molecules.',
        'Specific latent heat of fusion L: heat to melt 1 kg at its melting point; ice 336 000 J kg⁻¹; Q = mL.',
        'Heating curve: sloping parts Q = mcΔT, flat parts Q = mL.',
        'Ice at 0 °C cools better than water at 0 °C; snow and frozen lakes melt slowly.',
      ],
      v: table(['Part of curve', 'What happens', 'Formula'], [['Sloping', 'Temperature rises', 'Q = mcΔT'], ['Flat', 'State changes', 'Q = mL']], 'Summary table of heating curve parts'),
      n: 'Let us sum up Part 2. A pure substance changes state at a fixed temperature, and the heat absorbed, the latent heat, does not raise its temperature. To melt a mass of ice takes mass times three hundred and thirty six thousand joules per kilogram. On a heating curve, the flat parts are changes of state. That is why ice at zero cools a drink better than water at zero.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Write separate terms: melting (mL) and then warming (mcΔT) of the melted ice.',
        'Latent heat of fusion of ice: 336 J g⁻¹ = 336 000 J kg⁻¹ — keep units consistent.',
        'Explain flat parts of a heating curve as “change of state at constant temperature”.',
        'Only fusion numericals are examined; vaporisation is qualitative.',
      ],
      v: table(['Slip', 'Fix'], [['Forgetting to warm the melted ice', 'Add m c T for it'], ['Temperature rises while ice melts', 'It stays at 0 °C'], ['Mixing g and kg', 'Use one system throughout']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Final tips. When ice is added to warm water, remember two steps for the ice: melting, then warming the melted water. Keep your units consistent, grams with joules per gram, or kilograms with joules per kilogram. Describe the flat parts of a heating curve as changes of state at constant temperature. Only latent heat of fusion is examined with numbers.',
    }),
  ],
});
