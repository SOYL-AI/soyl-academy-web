// ICSE 9 Chemistry ch12 Study of Gas Laws. Part 1 (t01, t02): molecules and Boyle's law. Part 2 (t03, t04, t05): Charles's law,
// the kelvin scale, absolute zero, the combined gas equation and STP.
import { sl, deck, table, flow, svgV, plot, r } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import { MOTION, APPARATUS, SCALES } from './svgs.mjs';
import * as K from './calc.mjs';

const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
/** Whole numbers (and simple tenths) in words for the narration. */
export const W = (n) => {
  if (n < 0) return 'minus ' + W(-n);
  if (!Number.isInteger(n)) {
    const [a, b] = String(n).split('.');
    return `${W(Number(a))} point ${b.split('').map((d) => ONES[Number(d)]).join(' ')}`;
  }
  if (n < 20) return ONES[n];
  if (n < 100) return TENS[Math.floor(n / 10)] + (n % 10 ? ' ' + ONES[n % 10] : '');
  if (n < 1000) return ONES[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' and ' + W(n % 100) : '');
  return W(Math.floor(n / 1000)) + ' thousand' + (n % 1000 ? ' ' + W(n % 1000) : '');
};

const MINUS = '−';
export const V = {
  motion: svgV(MOTION, 'Three cylinders with a piston: gas at volume V, the piston pushed in to half the volume with molecules hitting the walls more often, and a heated gas with faster molecules pushing the piston up'),
  apparatus: svgV(APPARATUS, 'Apparatus: gas trapped under a loaded piston in a cylinder standing in a water bath, with a thermometer and a pressure gauge'),
  scales: svgV(SCALES, 'Celsius and kelvin scales one above the other with absolute zero, melting ice and boiling water marked'),
  boylePV: plot(
    {
      x: { min: 0, max: 110, label: 'Volume V (cm³)' },
      y: { min: 0, max: 700, label: 'Pressure P (mm Hg)' },
      functions: [{ expr: `${K.BOYLE_K}/x`, label: 'P × V is constant', domain: [18, 110] }],
      points: K.BOYLE_V.map((v, i) => ({ at: [v, K.BOYLE_P[i]], label: `${v}, ${K.BOYLE_P[i]}` })),
    },
    'Graph of pressure against volume at constant temperature: a falling curve through the points twenty and six hundred, forty and three hundred, one hundred and one hundred and twenty, that never touches either axis',
    'Boyle experiment readings (imagined). P against V is a curve (a rectangular hyperbola).',
  ),
  boyleP1V: plot(
    {
      x: { min: 0, max: 6, label: 'Reciprocal of volume, 100 ÷ V' },
      y: { min: 0, max: 700, label: 'Pressure P (mm Hg)' },
      functions: [{ expr: `${K.BOYLE_K / 100}x`, label: 'Straight line through the origin', domain: [0, 5.6] }],
      points: K.BOYLE_V.map((v, i) => ({ at: [K.BOYLE_U[i], K.BOYLE_P[i]], label: `${K.BOYLE_U[i]}, ${K.BOYLE_P[i]}` })),
    },
    'Graph of pressure against the reciprocal of volume: the same five readings fall on a straight line that passes through the origin',
    'The same readings plotted as P against 1/V (here 100 divided by V). The straight line through the origin shows that P is proportional to 1/V.',
  ),
  charlesC: plot(
    {
      x: { min: -300, max: 150, label: 'Temperature t (°C)' },
      y: { min: 0, max: 220, label: 'Volume V (cm³)' },
      functions: [{ expr: `${K.CH_SLOPE}(x+${K.ZERO})`, label: 'Volume of the gas at constant pressure', domain: [-273, 140] }],
      points: [...K.CH_C.map((c, i) => ({ at: [c, K.CH_V[i]], label: `${c}, ${K.CH_V[i]}` })), { at: [-273, 0], label: 'Extrapolated: V = 0 at −273 °C' }],
      vlines: [{ x: -273, label: 'Absolute zero', dashed: true }],
    },
    'Graph of volume against Celsius temperature at constant pressure: a straight line rising through four measured points; extended backwards it reaches zero volume at minus two hundred and seventy three degrees Celsius',
    'Imagined readings at constant pressure. The line is extended (extrapolated) below the lowest reading.',
  ),
  charlesK: plot(
    {
      x: { min: 0, max: 450, label: 'Temperature T (K)' },
      y: { min: 0, max: 250, label: 'Volume V (cm³)' },
      functions: [{ expr: `${K.CH_SLOPE}x`, label: 'V is proportional to T', domain: [0, 420] }],
      points: K.CH_K.map((t, i) => ({ at: [t, K.CH_V[i]], label: `${t}, ${K.CH_V[i]}` })),
    },
    'Graph of volume against kelvin temperature at constant pressure: a straight line through the origin passing through the four points',
    'The same readings on the kelvin scale: a straight line through the origin.',
  ),
};

export const deck1 = deck({
  part: 1,
  title: "Study of Gas Laws — Part 1: Gas molecules in motion and Boyle's law",
  goals: [
    'Explain gas pressure and the effect of heating on a gas using the motion of its molecules',
    "State Boyle's law, write it in symbols and sketch the graphs of P against V and of P against 1/V",
    "Solve simple problems using P1V1 = P2V2 at constant temperature",
  ],
  slides: [
    sl('title', 'Study of Gas Laws', {
      b: "Part 1 — what a gas does when it is squeezed or heated, and Boyle's law.",
      v: flow('LR', [['m', 'Moving molecules'], ['p', 'Pressure and volume'], ['b', "Boyle's law"]], [['m', 'p'], ['p', 'b']], "Flow: moving molecules, pressure and volume, Boyle's law"),
      n: 'Pump up a tyre and it feels firm. Leave a closed bottle in the sun and it bulges. Both are the work of gas molecules, which never stop moving. This part explains why, and ends with the first gas law.',
    }),
    sl('concept', 'Molecules of a gas in motion', {
      v: table(['Feature of a gas', 'What the molecules are doing'], [['No fixed shape or volume', 'Molecules are far apart and free to move anywhere in the container'], ['Fills its container', 'Molecules move in straight lines until they collide'], ['Easily squeezed', 'There is a great deal of empty space between the molecules'], ['Exerts pressure on all walls', 'Molecules keep hitting the walls']], 'Table of properties of gases and the molecular explanation'),
      n: 'In a gas the molecules are far apart and move at random in straight lines, bouncing off each other and off the walls. That is why a gas has no fixed shape, fills its container and can be squeezed into a smaller space.',
    }),
    sl('diagram', 'Gas molecules in a cylinder', {
      b: 'The same six molecules in three situations.',
      v: V.motion,
      n: 'On the left, a gas in a cylinder. In the middle, the piston is pushed in, so the same molecules are crowded into half the space and hit the walls more often. On the right, the gas is heated, the molecules move faster and push the piston up.',
    }),
    sl('concept', 'What is gas pressure?', {
      b: 'The **pressure** of a gas is the force its molecules exert on each unit area of the container wall. It is caused by their **constant collisions** with the wall.',
      v: flow('LR', [['a', 'Molecule hits the wall'], ['b', 'A tiny push on the wall'], ['c', 'Billions of hits every second'], ['d', 'Steady pressure']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow: a molecule hits the wall, a tiny push, billions of hits, steady pressure'),
      n: 'Each molecule that strikes the wall gives it a tiny push. There are so many collisions every second that the pushes blend into one steady force on each unit of area. That steady push is the pressure of the gas.',
    }),
    sl('check', 'Quick check: the cause of pressure', {
      b: 'A gas in a sealed flask presses on the walls because its molecules…',
      chk: 'chk-motion',
      n: 'Think about what the molecules are doing all the time.',
    }),
    sl('concept', 'Heating a gas', {
      v: table(['Situation', 'What happens', 'Why, in terms of molecules'], [['Gas in a closed rigid vessel is heated', 'Pressure rises', 'Molecules move faster, so they hit the wall harder and more often'], ['Gas under a free-moving piston is heated', 'Volume increases', 'Faster molecules push the piston up until the hits per unit area are back to the outside pressure'], ['Gas is cooled', 'Pressure or volume falls', 'Slower molecules hit the wall less hard and less often']], 'Table of the effect of heating and cooling a gas explained by molecular motion'),
      n: 'Heat makes the molecules move faster. In a rigid closed vessel they hit the walls harder and more often, so the pressure rises. Under a free piston the faster molecules push it up, so the volume grows. Cooling does the opposite.',
    }),
    sl('concept', "Boyle's law", {
      b: "**Boyle's law:** at constant temperature, the volume of a fixed mass of gas is **inversely proportional** to its pressure.",
      m: [r`V \propto \dfrac{1}{P}`, r`PV = \text{constant}`, r`P_1V_1 = P_2V_2`],
      n: "Boyle's law says that if you keep the temperature and the amount of gas fixed, then doubling the pressure halves the volume. The product of pressure and volume stays the same. So the first pressure times the first volume equals the second pressure times the second volume.",
    }),
    sl('diagram', "Testing Boyle's law", {
      b: 'Load on the piston is changed; the bath keeps the temperature steady; pressure and volume are noted each time.',
      v: V.apparatus,
      n: 'A fixed amount of gas is trapped under a piston in a water bath, which keeps the temperature constant. Adding load raises the pressure, which the gauge shows. The volume of the gas is read from the cylinder each time.',
    }),
    sl('concept', 'Readings from an experiment', {
      b: 'Imagined readings for a trapped gas at constant temperature. The last column is the product P × V.',
      v: table(['Volume V (cm³)', 'Pressure P (mm Hg)', 'P × V'], K.BOYLE_V.map((v, i) => [`${v}`, `${K.BOYLE_P[i]}`, `${K.BOYLE_PV[i]}`]), 'Table of five volume and pressure readings with their products all equal to twelve thousand'),
      n: `As the volume falls, the pressure rises. Multiply each pair of readings and the product is always the same, ${W(K.BOYLE_K)}. That constant product is the evidence for Boyle's law.`,
    }),
    sl('check', 'Quick check: reading a table', {
      b: 'In a Boyle experiment the readings are 30 cm³ at 400 mm Hg and 60 cm³ at an unknown pressure. What is the unknown pressure?',
      chk: 'chk-boyle-table',
      n: 'The product of pressure and volume must stay the same.',
    }),
    sl('diagram', 'Graph of P against V', {
      b: 'A fixed mass of gas at constant temperature gives a **curve** that falls as V rises and never meets either axis.',
      v: V.boylePV,
      n: 'Plot pressure on the vertical axis and volume on the horizontal axis. The points fall on a smooth curve that drops steeply at first and then flattens. It never touches either axis, because the volume cannot be zero and the pressure cannot be zero.',
    }),
    sl('diagram', 'Graph of P against 1/V', {
      b: 'Plotting pressure against the **reciprocal of the volume** turns the curve into a **straight line through the origin**.',
      v: V.boyleP1V,
      n: 'Now plot pressure against one divided by the volume. The five points fall on a straight line that passes through the origin. A straight line through the origin means the two quantities are directly proportional, so pressure is proportional to one over the volume.',
    }),
    sl('check', 'Quick check: which graph?', {
      b: "Which graph for a fixed mass of gas at constant temperature is a straight line through the origin?",
      chk: 'chk-boyle-graph',
      n: 'Remember that the straight line comes from the reciprocal of the volume.',
    }),
    sl('example', 'Worked example 1: a bicycle pump', {
      b: `A pump holds ${K.PUMP.V1} cm³ of air at ${K.PUMP.P1} mm Hg. The outlet is blocked and the air is pushed into ${K.PUMP.V2} cm³ with the temperature unchanged. Find the final pressure.`,
      ul: [`Step 1: P₁ = ${K.PUMP.P1} mm Hg, V₁ = ${K.PUMP.V1} cm³, V₂ = ${K.PUMP.V2} cm³, P₂ = ?`, 'Step 2: write P₁V₁ = P₂V₂, so P₂ = P₁V₁ ÷ V₂.', `Step 3: P₂ = ${K.PUMP.P1} × ${K.PUMP.V1} ÷ ${K.PUMP.V2} = **${K.PUMP_P2} mm Hg**.`, `Check: the volume fell to a quarter, so the pressure rose ${W(K.PUMP_RATIO)}-fold.`],
      v: table(['Given', 'Value'], [['Initial pressure', `${K.PUMP.P1} mm Hg`], ['Initial volume', `${K.PUMP.V1} cm³`], ['Final volume', `${K.PUMP.V2} cm³`], ['Final pressure', `${K.PUMP_P2} mm Hg`]], 'Worked table for the pump'),
      n: `Write down what is given, then use the Boyle's law equation. Seven hundred and sixty times four hundred divided by one hundred gives ${W(K.PUMP_P2)} millimetres of mercury. The volume fell to a quarter, so the pressure became four times larger. That makes sense.`,
    }),
    sl('example', 'Worked example 2: nitrogen expands', {
      b: `${K.NEXP.V1} cm³ of nitrogen at ${K.NEXP.P1} mm Hg expands at constant temperature until the pressure is ${K.NEXP.P2} mm Hg. Find the new volume.`,
      ul: [`Step 1: P₁ = ${K.NEXP.P1}, V₁ = ${K.NEXP.V1}, P₂ = ${K.NEXP.P2}, V₂ = ?`, 'Step 2: V₂ = P₁V₁ ÷ P₂.', `Step 3: V₂ = ${K.NEXP.P1} × ${K.NEXP.V1} ÷ ${K.NEXP.P2} = **${K.NEXP_V2} cm³**.`, 'Check: the pressure fell, so the volume must rise. It did.'],
      v: table(['Quantity', 'Initial', 'Final'], [['Pressure (mm Hg)', `${K.NEXP.P1}`, `${K.NEXP.P2}`], ['Volume (cm³)', `${K.NEXP.V1}`, `${K.NEXP_V2}`]], 'Worked table: pressure falls and volume rises'),
      n: `This time the pressure falls, so the volume must rise. Six hundred times seven hundred and fifty divided by four hundred and fifty gives ${W(K.NEXP_V2)} cubic centimetres. Always check that your answer moves in the right direction.`,
    }),
    sl('check', 'Quick check: compressing hydrogen', {
      b: `${K.H3.V1} cm³ of hydrogen at ${K.H3.P1} mm Hg is compressed at constant temperature to one third of its volume. Find the final pressure in mm Hg.`,
      chk: 'chk-boyle-num',
      n: 'If the volume falls to one third, what happens to the pressure?',
    }),
    sl('summary', 'Summary', {
      ul: ['A gas exerts pressure because its molecules keep hitting the walls.', 'Heating makes molecules faster: pressure rises in a closed vessel, volume rises under a free piston.', "Boyle's law: at constant temperature P × V is constant for a fixed mass of gas.", 'P against V is a curve; P against 1/V is a straight line through the origin.'],
      v: table(['Quantity', 'Boyle\'s law'], [['Kept constant', 'Temperature and mass of gas'], ['Relation', 'P × V = constant'], ['Use', 'P₁V₁ = P₂V₂'], ['Graph of P against 1/V', 'Straight line through the origin']], "Summary table of Boyle's law"),
      n: "To recap. Gas pressure comes from molecular collisions. Heating speeds the molecules up. Boyle's law says that at constant temperature the product of pressure and volume is constant, so one equation links the first and second states. The graph of pressure against reciprocal volume is a straight line through the origin.",
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ["State **constant temperature** and **fixed mass** in Boyle's law.", 'Use the same units for both volumes and both pressures.', 'Give the graph shapes: a **curve** for P against V; a **straight line through the origin** for P against 1/V.', 'Explain with molecules: smaller volume means **more collisions per unit area**.'],
      n: "Exam tips. When you state Boyle's law, say constant temperature and fixed mass. Keep the units the same on both sides. Describe the graph shapes correctly. And explain pressure changes with molecules: a smaller space means more collisions on each unit of wall area.",
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: "Study of Gas Laws — Part 2: Charles's law, absolute zero, the gas equation and STP",
  goals: [
    'Convert temperatures between degrees Celsius and kelvin and explain absolute zero from the V-T graph',
    "State Charles's law and solve problems using V1/T1 = V2/T2",
    "Derive and use P1V1/T1 = P2V2/T2, including reduction of a gas volume to STP",
  ],
  slides: [
    sl('title', "Charles's Law and the Gas Equation", {
      b: 'Part 2 — what heating does to the volume of a gas, the coldest possible temperature, and one equation for everything.',
      v: flow('LR', [['t', 'Temperature scales'], ['c', "Charles's law"], ['g', 'Gas equation and STP']], [['t', 'c'], ['c', 'g']], "Flow: temperature scales, Charles's law, gas equation and STP"),
      n: 'A balloon left in a warm car swells; in a freezer it shrinks. Part two studies this effect, finds the lowest temperature anything can reach, and joins the two gas laws into a single equation.',
    }),
    sl('concept', 'Heating a gas at constant pressure', {
      b: 'When a fixed mass of gas is heated under a **free piston**, the pressure stays at the outside value. The faster molecules push the piston up and the **volume rises**; on cooling it **falls**.',
      v: flow('LR', [['h', 'Gas is heated'], ['f', 'Molecules move faster'], ['p', 'Piston is pushed up'], ['v', 'Volume increases at constant pressure']], [['h', 'f'], ['f', 'p'], ['p', 'v']], 'Flow: heating, faster molecules, piston pushed up, volume increases'),
      n: 'Heat the gas and the molecules speed up. They push harder on the piston, which rises until the push per unit area balances the outside air again. The pressure is the same as before, but the volume is larger.',
    }),
    sl('diagram', 'Celsius and kelvin scales', {
      b: 'The **kelvin** (absolute) scale starts at the lowest possible temperature, **0 K**. A kelvin degree is the same size as a Celsius degree.',
      v: V.scales,
      n: 'The Celsius scale puts zero at the melting point of ice. The kelvin scale puts zero at absolute zero, which is two hundred and seventy three degrees below that. To change Celsius to kelvin, add two hundred and seventy three.',
    }),
    sl('example', 'Worked example 1: changing scales', {
      b: 'Convert (i) 27 °C to kelvin, (ii) −73 °C to kelvin, (iii) 350 K to °C.',
      ul: [`Step 1: kelvin = Celsius + 273.`, `(i) 27 + 273 = **${K.CONV.roomK} K**.`, `(ii) ${MINUS}73 + 273 = **${K.CONV.coldK} K**.`, `(iii) Celsius = kelvin − 273 = 350 − 273 = **${K.CONV.kToC} °C**.`],
      v: table(['Celsius (°C)', 'Kelvin (K)'], [[`${K.CONV.roomC}`, `${K.CONV.roomK}`], [`${MINUS}73`, `${K.CONV.coldK}`], [`${K.CONV.kToC}`, `${K.CONV.kToC_from}`]], 'Table of three conversions between degrees Celsius and kelvin'),
      n: 'To go from Celsius to kelvin, add two hundred and seventy three. Twenty seven becomes three hundred. Minus seventy three becomes two hundred. To go back, subtract two hundred and seventy three, so three hundred and fifty kelvin is seventy seven degrees Celsius.',
    }),
    sl('check', 'Quick check: a kelvin temperature', {
      b: 'What is 47 °C on the kelvin scale?',
      chk: 'chk-kelvin',
      n: 'Add two hundred and seventy three.',
    }),
    sl('concept', "Charles's law", {
      b: "**Charles's law:** at constant pressure, the volume of a fixed mass of gas is **directly proportional to its absolute (kelvin) temperature**. Temperatures must be in kelvin.",
      m: [r`V \propto T`, r`\dfrac{V}{T} = \text{constant}`, r`\dfrac{V_1}{T_1} = \dfrac{V_2}{T_2}`],
      n: "Charles's law says that at constant pressure the volume of a fixed mass of gas is directly proportional to its temperature on the kelvin scale. Doubling the kelvin temperature doubles the volume. You must always change degrees Celsius to kelvin before using it.",
    }),
    sl('diagram', 'Graph of V against Celsius temperature', {
      b: 'A straight line, but **not** through the origin. Extend it backwards (**extrapolate**): it reaches **zero volume at −273 °C**.',
      v: V.charlesC,
      n: 'The volume rises steadily with temperature, giving a straight line. Extend the line backwards beyond the lowest reading, and it meets the zero volume level at minus two hundred and seventy three degrees Celsius. This is a way of finding absolute zero from measurements.',
    }),
    sl('concept', 'Absolute zero', {
      b: `On the kelvin scale the same line passes through the **origin**. **Absolute zero** is 0 K, or ${MINUS}273 °C, the lowest possible temperature. A real gas turns into a liquid before it gets there, so the line is an extrapolation.`,
      v: V.charlesK,
      n: 'On the kelvin scale the same line passes through the origin, so volume is directly proportional to kelvin temperature. Absolute zero is zero kelvin. In practice, real gases liquefy before reaching it, so the zero volume point is found only by extending the line.',
    }),
    sl('check', 'Quick check: the V–t line', {
      b: 'Extrapolating the straight-line graph of volume against Celsius temperature to zero volume gives a temperature of…',
      chk: 'chk-abs0',
      n: 'This is the temperature called absolute zero.',
    }),
    sl('example', "Worked example 2: Charles's law", {
      b: `${K.CA.V1} cm³ of hydrogen at ${K.CA.T1C} °C is heated at constant pressure to ${K.CA.T2C} °C. Find the new volume.`,
      ul: [`Step 1: T₁ = ${K.CA.T1C} + 273 = ${K.toK(K.CA.T1C)} K; T₂ = ${K.CA.T2C} + 273 = ${K.toK(K.CA.T2C)} K.`, 'Step 2: V₂ = V₁ × T₂ ÷ T₁.', `Step 3: V₂ = ${K.CA.V1} × ${K.toK(K.CA.T2C)} ÷ ${K.toK(K.CA.T1C)} = **${K.CA_V2} cm³**.`, 'Check: the gas was heated, so the volume rose.'],
      v: table(['Quantity', 'Initial', 'Final'], [['Volume', `${K.CA.V1} cm³`, `${K.CA_V2} cm³`], ['Temperature (°C)', `${K.CA.T1C}`, `${K.CA.T2C}`], ['Temperature (K)', `${K.toK(K.CA.T1C)}`, `${K.toK(K.CA.T2C)}`]], 'Worked table for the Charles law example'),
      n: `First change both temperatures to kelvin, which gives two hundred and ninety and three hundred and fifty. Then multiply the volume by the ratio of the final to the initial temperature. Five hundred and eighty times three hundred and fifty divided by two hundred and ninety is ${W(K.CA_V2)} cubic centimetres.`,
    }),
    sl('concept', 'The combined gas equation', {
      b: "Change the pressure and the temperature together: first apply **Boyle's law** at the first temperature, then **Charles's law** at the final pressure.",
      m: [r`\text{Boyle: } V' = \dfrac{P_1V_1}{P_2}`, r`\text{Charles: } \dfrac{V'}{T_1} = \dfrac{V_2}{T_2}`, r`\dfrac{P_1V_1}{T_1} = \dfrac{P_2V_2}{T_2}`],
      v: flow('LR', [['s', 'State 1: P₁, V₁, T₁'], ['b', 'Boyle at T₁: V₁ becomes V′ at P₂'], ['c', 'Charles at P₂: V′ becomes V₂ at T₂'], ['e', 'State 2: P₂, V₂, T₂']], [['s', 'b'], ['b', 'c'], ['c', 'e']], 'Flow showing the two steps that lead to the combined gas equation'),
      n: 'Take a gas from the first state to the second in two steps. First change the pressure at the original temperature, using Boyle. Then change the temperature at the new pressure, using Charles. Putting the two steps together gives one equation: pressure times volume over temperature stays constant. Temperatures must be in kelvin.',
    }),
    sl('example', 'Worked example 3: the combined equation', {
      b: `${K.SA.V1} cm³ of carbon dioxide at ${K.SA.P1} mm Hg and ${K.SA.T1C} °C is taken to ${K.SA.P2} mm Hg and ${K.SA.T2C} °C. Find the new volume.`,
      ul: [`Step 1: T₁ = ${K.toK(K.SA.T1C)} K, T₂ = ${K.toK(K.SA.T2C)} K.`, 'Step 2: V₂ = P₁V₁T₂ ÷ (T₁P₂).', `Step 3: V₂ = ${K.SA.P1} × ${K.SA.V1} × ${K.toK(K.SA.T2C)} ÷ (${K.toK(K.SA.T1C)} × ${K.SA.P2}) = **${K.SA_V2} cm³**.`, 'Check: the pressure rise shrinks the gas and the temperature rise expands it; the net result is a small rise.'],
      v: table(['', 'State 1', 'State 2'], [['P (mm Hg)', `${K.SA.P1}`, `${K.SA.P2}`], ['V (cm³)', `${K.SA.V1}`, `${K.SA_V2}`], ['T (K)', `${K.toK(K.SA.T1C)}`, `${K.toK(K.SA.T2C)}`]], 'Worked table for the combined gas equation'),
      n: `Write both states, with the temperatures in kelvin. Pressure goes up, which shrinks the gas. Temperature goes up, which expands it. Multiply seven hundred and sixty by three hundred by four hundred, and divide by three hundred times nine hundred and fifty. The new volume is ${W(K.SA_V2)} cubic centimetres.`,
    }),
    sl('check', 'Quick check: pressure and temperature', {
      b: `A gas at 300 K, ${K.TF.P1} mm Hg and ${K.TF.V1} cm³ is compressed to ${K.TF.V2} cm³ at ${K.TF.P2} mm Hg. What is the final temperature in kelvin?`,
      chk: 'chk-comb',
      n: 'Rearrange the combined equation for the second temperature.',
    }),
    sl('concept', 'Standard temperature and pressure', {
      b: 'Gas volumes change with temperature and pressure, so chemists compare gases at **standard temperature and pressure (STP)**.',
      v: table(['Standard', 'Value'], [['Standard temperature', `${K.STP_T} K (0 °C)`], ['Standard pressure', `${K.STP_P} mm Hg (1 atmosphere)`]], 'Table of the values of standard temperature and pressure'),
      m: [r`V_0 = \dfrac{P_1V_1 \times 273}{T_1 \times 760}`],
      n: 'Standard temperature is two hundred and seventy three kelvin, which is zero degrees Celsius. Standard pressure is seven hundred and sixty millimetres of mercury, which is one atmosphere. To reduce a volume to standard conditions, put those values in as the second state of the gas equation.',
    }),
    sl('example', 'Worked example 4: reduction to STP', {
      b: `A gas has volume ${K.ST1.V1} cm³ at ${K.ST1.P1} mm Hg and ${K.ST1.T1C} °C. Find its volume at STP.`,
      ul: [`Step 1: T₁ = ${K.ST1.T1C} + 273 = ${K.toK(K.ST1.T1C)} K; STP: P₂ = ${K.STP_P} mm Hg, T₂ = ${K.STP_T} K.`, 'Step 2: V₂ = P₁V₁T₂ ÷ (T₁P₂).', `Step 3: V₂ = ${K.ST1.P1} × ${K.ST1.V1} × ${K.STP_T} ÷ (${K.toK(K.ST1.T1C)} × ${K.STP_P}) = **${K.ST1_V0} cm³**.`],
      v: table(['', 'Given', 'At STP'], [['Pressure (mm Hg)', `${K.ST1.P1}`, `${K.STP_P}`], ['Temperature (K)', `${K.toK(K.ST1.T1C)}`, `${K.STP_T}`], ['Volume (cm³)', `${K.ST1.V1}`, `${K.ST1_V0}`]], 'Worked table for the reduction to standard temperature and pressure'),
      n: `The first temperature in kelvin is three hundred and sixty four. Substitute the standard values for the second state. The volume at standard temperature and pressure comes to ${W(K.ST1_V0)} cubic centimetres.`,
    }),
    sl('check', 'Quick check: to STP', {
      b: `${K.ST3.V1} dm³ of a gas at ${K.ST3.P1} mm Hg and ${K.ST3.T1C} °C is reduced to STP. Find its volume in dm³.`,
      chk: 'chk-stp',
      n: 'Change the temperature to kelvin first.',
    }),
    sl('summary', 'Summary', {
      ul: ['Kelvin = Celsius + 273; absolute zero is 0 K or −273 °C.', "Charles's law: at constant pressure V ∝ T (kelvin), V₁/T₁ = V₂/T₂.", 'Extrapolating the V–t line gives zero volume at −273 °C.', 'Combined equation: P₁V₁/T₁ = P₂V₂/T₂, always with T in kelvin.', 'STP is 273 K and 760 mm Hg.'],
      v: table(['Law', 'Constant', 'Equation'], [["Boyle's", 'Temperature', 'P₁V₁ = P₂V₂'], ["Charles's", 'Pressure', 'V₁/T₁ = V₂/T₂'], ['Combined', 'Mass of gas only', 'P₁V₁/T₁ = P₂V₂/T₂']], 'Summary table of the gas laws'),
      n: 'To recap. Temperatures for gas laws are always in kelvin. Charles law says volume is proportional to kelvin temperature at constant pressure. Extending the graph shows absolute zero. Boyle and Charles combine into one equation, which lets us reduce any gas volume to standard temperature and pressure.',
    }),
    sl('exam-tips', 'Exam tips', {
      ul: ['Convert to **kelvin** before using any gas-law equation with temperature.', "State **constant pressure** in Charles's law and **constant temperature** in Boyle's law.", 'For STP write **273 K and 760 mm Hg**, then substitute in the gas equation.', 'Show the working: given, formula, substitution, answer with unit.'],
      n: 'Exam tips. Change temperatures to kelvin first. Say which quantity is constant in each law. For standard conditions, use two hundred and seventy three kelvin and seven hundred and sixty millimetres of mercury. And always show your working with units.',
    }),
  ],
});
