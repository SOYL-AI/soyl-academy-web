// ch04 Exploring Mixtures and their Separation — two decks: Part 1 (t01–t03) mixtures, solutions, suspensions, colloids,
// concentration and solubility; Part 2 (t04) separation techniques and the Indian traditional practices.
import { sl, deck, table, flow, svgV, r, near, dec } from './lib.mjs';
import { SIZE_SCALE, TYNDALL, DISTILL, CHROMATO, SOLUBILITY, CENTRIFUGE, KNO3, interp } from './svgs.mjs';

const must = (ok, msg) => {
  if (!ok) throw new Error(`deck check failed: ${msg}`);
};

// ---- worked-example numbers (computed once, then interpolated)
const e2 = (() => {
  const solute = 36, water = 164;
  const solution = solute + water;
  return { solute, water, solution, pct: (solute / solution) * 100 };
})();
must(e2.solution === 200 && near(e2.pct, 18, 1e-9), 'e2 mass percentage');
const e3 = (() => {
  const vs = 12, vsol = 80, ms = 9, vol = 150;
  return { vs, vsol, vpct: (vs / vsol) * 100, ms, vol, mv: (ms / vol) * 100 };
})();
must(near(e3.vpct, 15, 1e-9) && near(e3.mv, 6, 1e-9), 'e3 volume percentage and mass by volume');
const e4 = (() => {
  const water = 200;
  const hot = (interp(KNO3, 60) * water) / 100;
  const cold = (interp(KNO3, 30) * water) / 100;
  return { water, hot, cold, crystals: hot - cold, s60: interp(KNO3, 60), s30: interp(KNO3, 30) };
})();
must(near(e4.hot, 220, 1e-9) && near(e4.cold, 92, 1e-9) && near(e4.crystals, 128, 1e-9), 'e4 crystals on cooling');
const e5 = (() => {
  const base = 3.6, front = 9.0, base2 = 6.3;
  return { d1: base, d2: base2, front, rf1: base / front, rf2: base2 / front };
})();
must(near(e5.rf1, 0.4, 1e-9) && near(e5.rf2, 0.7, 1e-9), 'e5 Rf');

export const V = {
  size: svgV(SIZE_SCALE, 'A logarithmic particle size scale: solutions have particles under 1 nanometre, colloids 1 to 1000 nanometres and suspensions over 1000 nanometres', 'Particle size decides the type of mixture.'),
  tyndall: svgV(TYNDALL, 'A torch beam through salt solution (not visible), dilute milk (visible path) and muddy water (cloudy, mud settles)', 'The Tyndall effect: colloids and suspensions scatter light, solutions do not.'),
  solub: svgV(SOLUBILITY, 'Solubility curves of potassium nitrate and sodium chloride between 0 and 80 degrees Celsius, with 78 grams of crystals read off for cooling from 60 to 20 degrees', 'Approximate, illustrative solubility curves.'),
  distill: svgV(DISTILL, 'Simple distillation apparatus with flask, thermometer, Liebig condenser with water in at the lower end, and receiver', 'Simple distillation.'),
  chromato: svgV(CHROMATO, 'A chromatography strip with dyes P, Q, R and an ink X, showing the spot heights and Rf values of 0.30, 0.60 and 0.80', 'Paper chromatography and Rf.'),
  centrifuge: svgV(CENTRIFUGE, 'A centrifuge rotor with four tubes in opposite pairs, and a tube before and after spinning with sediment at the bottom', 'Centrifugation.'),
};

// =====================================================================================================================
export const deck1 = deck({
  part: 1,
  title: 'Exploring Mixtures and their Separation — Part 1: Mixtures, solutions and concentration',
  goals: [
    'Classify mixtures as homogeneous or heterogeneous',
    'Distinguish solutions, suspensions and colloids by particle size, stability, filtration and the Tyndall effect',
    'Calculate concentration as mass percentage, volume percentage and mass by volume',
    'Interpret solubility graphs and explain crystallisation on cooling',
  ],
  slides: [
    sl('title', 'Exploring Mixtures and their Separation', {
      b: 'Part 1: what is a mixture, how a solution differs from a suspension and a colloid, how strong a solution is, and how much of a solid water can hold.',
      v: table(['Everyday material', 'Pure substance or mixture?'], [['Distilled water', 'pure substance'], ['Sea water', 'mixture'], ['Iron nail', 'pure substance (mostly iron)'], ['Milk', 'mixture'], ['Air', 'mixture of gases'], ['Sugar crystals', 'pure substance']], 'Table of six everyday materials sorted into pure substances and mixtures'),
      n: 'Almost everything around us, from the tea in a cup to the air in a classroom, is a mixture. In this part we learn how to sort mixtures, how to tell a solution from a suspension and a colloid, how to say how strong a solution is, and how the amount of a solid that dissolves changes with temperature.',
    }),
    sl('concept', 'Pure substances and mixtures', {
      b: r`A **pure substance** has a fixed composition and fixed properties, such as a sharp melting point. Elements and compounds are pure substances. A **mixture** has two or more substances mixed **physically**, in **any proportion**, and each keeps its own properties. A mixture can be separated by physical means.`,
      v: flow('TB', [['m', 'Matter'], ['p', 'Pure substance'], ['x', 'Mixture'], ['e', 'Element'], ['c', 'Compound'], ['h', 'Homogeneous mixture'], ['g', 'Heterogeneous mixture']], [['m', 'p'], ['m', 'x'], ['p', 'e'], ['p', 'c'], ['x', 'h'], ['x', 'g']], 'Flow chart: matter divides into pure substances (elements and compounds) and mixtures (homogeneous and heterogeneous)', 'Classification of matter'),
      n: 'Matter can be a pure substance or a mixture. A pure substance has a fixed makeup, like gold or distilled water. It may be an element or a compound. A mixture has two or more substances mixed in any proportion without a chemical change, so each one keeps its own properties. Because of that, we can separate the parts of a mixture by simple physical methods.',
    }),
    sl('concept', 'Homogeneous and heterogeneous mixtures', {
      b: r`In a **homogeneous mixture** the composition is uniform throughout, so you cannot see separate parts. In a **heterogeneous mixture** the composition varies from place to place and the parts can often be seen. Brass, an alloy of copper and zinc, is a homogeneous mixture: it is a **solid solution**.`,
      v: table(['Mixture', 'Type', 'Why'], [['Sugar dissolved in water', 'homogeneous', 'uniform, one clear liquid'], ['Air without dust', 'homogeneous', 'gases mixed evenly'], ['Brass', 'homogeneous', 'solid solution of copper and zinc'], ['Muddy river water', 'heterogeneous', 'mud particles can be seen and settle'], ['Sand and iron filings', 'heterogeneous', 'two solids visible'], ['Oil in water', 'heterogeneous', 'two layers']], 'Table classifying six mixtures as homogeneous or heterogeneous with the reason'),
      n: 'In a homogeneous mixture the makeup is the same everywhere. Sugar syrup, air without dust and brass are examples. In a heterogeneous mixture the makeup changes from place to place, and often you can see the parts. Muddy river water, sand mixed with iron filings, and oil floating on water are examples. Brass is a solid solution of copper and zinc.',
    }),
    sl('check', 'Quick check: classifying a mixture', {
      b: 'Decide whether a uniform-looking alloy is a compound or a mixture, and of which kind.',
      n: 'Quick check. Think about whether a uniform looking metal made by melting two metals together is a compound or a mixture, and of which kind.',
      chk: 'chk-mix',
    }),
    sl('diagram', 'How big are the particles?', {
      b: r`The three kinds of liquid mixtures differ mainly in **particle size**. In a true **solution** the particles are smaller than about 1 nm. In a **colloid** they are between about 1 nm and 1000 nm. In a **suspension** they are bigger than about 1000 nm, large enough to see and to settle.`,
      v: V.size,
      n: 'The main difference between a solution, a colloid and a suspension is the size of the particles. In a true solution, they are smaller than about one nanometre, so small that they never settle and cannot be seen. In a colloid they lie between one nanometre and one thousand nanometres. In a suspension, they are bigger still, so they can be seen and slowly settle.',
    }),
    sl('concept', 'Solution, suspension and colloid compared', {
      b: r`A **solution** is clear and stable. A **suspension** is cloudy, its particles settle on standing and are caught by filter paper. A **colloid** looks uniform, is stable and does not settle, passes through ordinary filter paper (but not through very fine membranes such as parchment) and scatters light.`,
      v: table(['Property', 'Solution', 'Colloid', 'Suspension'], [['Particle size', 'below 1 nm', '1 to 1000 nm', 'above 1000 nm'], ['Looks', 'clear, uniform', 'uniform, may be milky', 'cloudy, particles visible'], ['Settles on standing?', 'no', 'no', 'yes'], ['Passes through filter paper?', 'yes', 'yes', 'no, a residue stays'], ['Tyndall effect?', 'no', 'yes', 'yes, if the liquid is not too opaque']], 'Table comparing solutions, colloids and suspensions on five properties'),
      n: 'Here is the comparison. A solution is clear, never settles, and passes through filter paper. A suspension is cloudy, its particles settle on standing, and filter paper holds them back as a residue. A colloid looks uniform and does not settle. It also passes through ordinary filter paper, but it scatters a beam of light, and that is how we recognise it.',
    }),
    sl('diagram', 'The Tyndall effect', {
      b: r`When a beam of light passes through a colloid, the particles are big enough to **scatter** it, so the path of the beam shows up. This is the **Tyndall effect**. A true solution does not scatter light. The sunbeams you see slanting through a forest on a misty morning are the same effect: tiny water droplets and dust scatter the sunlight.`,
      v: V.tyndall,
      n: 'Shine a torch through three beakers. In the salt solution the beam passes without being seen inside the liquid. In dilute milk, the path of the beam shines clearly, because the colloid particles scatter the light. This is the Tyndall effect. Sunbeams slanting through a misty forest show the same thing, with tiny water droplets and dust scattering the light.',
    }),
    sl('concept', 'Colloids in everyday life', {
      b: r`Colloids are named by what is spread (the **dispersed phase**) and what it is spread in (the **dispersion medium**). Common kinds at this level are **aerosols**, **foams**, **emulsions**, **sols** and **gels**.`,
      v: table(['Type', 'Dispersed in medium', 'Examples'], [['Aerosol', 'liquid or solid in gas', 'fog, mist, smoke'], ['Foam', 'gas in liquid', 'shaving cream, whipped cream'], ['Emulsion', 'liquid in liquid', 'milk, face cream'], ['Sol', 'solid in liquid', 'ink, paint, starch in water'], ['Gel', 'liquid in solid', 'jelly, cheese']], 'Table of five colloid types with what is dispersed in what and two examples each'),
      n: 'Colloids are named by what is spread and what it is spread in. Fog and smoke are aerosols, with tiny drops or specks in air. Shaving cream is a foam, with gas bubbles in liquid. Milk and face cream are emulsions, with liquid spread in liquid. Ink and paint are sols, solid in liquid. Jelly and cheese are gels, with liquid held in a solid.',
    }),
    sl('check', 'Quick check: the Tyndall effect', {
      b: 'Decide in which tumbler a torch beam would be visible and why.',
      n: 'Quick check. Think about which of two tumblers, one with clear sugar solution and one with a little starch in water, will show the path of a torch beam.',
      chk: 'chk-tyn',
    }),
    sl('example', 'Worked example: what kind of mixture is it?', {
      b: r`**Problem.** Three liquids A, B and C are tested. Identify each.

**Step 1.** A is clear, never settles, leaves nothing on the filter paper and shows no beam: a **solution**.

**Step 2.** B is cloudy, settles in an hour and leaves a residue on the filter paper: a **suspension**.

**Step 3.** C looks uniform, does not settle, passes through the filter paper but shows a bright beam: a **colloid**.`,
      v: table(['Liquid', 'Settles?', 'Residue on filter paper?', 'Beam path seen?', 'Verdict'], [['A', 'no', 'no', 'no', 'solution'], ['B', 'yes', 'yes', 'yes (cloudy)', 'suspension'], ['C', 'no', 'no', 'yes (clear path)', 'colloid']], 'Table of three liquids and the results of settling, filtering and beam tests with the verdict for each'),
      n: 'Let us test three liquids. Liquid A is clear, does not settle, leaves nothing on the filter paper and shows no beam, so it is a solution. Liquid B is cloudy, settles in an hour and leaves a residue, so it is a suspension. Liquid C looks uniform, does not settle and passes through the paper, but it shows a bright beam, so it is a colloid.',
    }),
    sl('concept', 'How strong is a solution?', {
      b: r`The **solute** dissolves in the **solvent** to make the **solution**. The **concentration** says how much solute is present. At this level there are three common ways.

$$\text{mass percentage} = \dfrac{\text{mass of solute}}{\text{mass of solution}} \times 100$$
$$\text{volume percentage} = \dfrac{\text{volume of solute}}{\text{volume of solution}} \times 100$$
$$\text{mass by volume percentage} = \dfrac{\text{mass of solute (g)}}{\text{volume of solution (mL)}} \times 100$$`,
      v: table(['Way of stating', 'Best used when', 'Typical example'], [['Mass percentage', 'solute and solution are weighed', 'sugar syrup, brine'], ['Volume percentage', 'both are liquids', 'ethanol in a hand rub'], ['Mass by volume percentage', 'a solid is dissolved to a measured volume', 'saline in a hospital drip']], 'Table of three ways of stating concentration, when each is used and an example'),
      n: 'The solute dissolves in the solvent to make the solution. To say how strong a solution is, we state its concentration. Mass percentage is the mass of solute divided by the mass of the whole solution, times one hundred. Volume percentage does the same with volumes, for liquids. Mass by volume uses grams of solute in a measured volume of solution, in millilitres.',
    }),
    sl('example', 'Worked example: mass percentage', {
      b: r`**Problem.** A sweet seller dissolves ${e2.solute} g of sugar in ${e2.water} g of water. Find the mass percentage of sugar.

**Step 1: mass of solution** $= ${e2.solute} + ${e2.water} = ${e2.solution}$ g.

**Step 2:** $\dfrac{${e2.solute}}{${e2.solution}} \times 100 = ${dec(e2.pct, 2)}\ \%$.`,
      v: table(['Quantity', 'Value'], [['Mass of sugar (solute)', `${e2.solute} g`], ['Mass of water (solvent)', `${e2.water} g`], ['Mass of solution', `${e2.solution} g`], ['Mass percentage', `${dec(e2.pct, 2)} %`]], 'Table of the masses of sugar, water and solution and the mass percentage'),
      n: 'A sweet seller dissolves thirty six grams of sugar in one hundred and sixty four grams of water. First find the mass of the solution, by adding solute and solvent. That is two hundred grams. Then divide the mass of sugar by the mass of solution and multiply by one hundred. We get eighteen percent. Do not divide by the mass of water alone.',
    }),
    sl('example', 'Worked example: volume percentage and mass by volume', {
      b: r`**Problem.** (a) A student makes ${e3.vsol} mL of a drink using ${e3.vs} mL of lemon juice. Find the volume percentage. (b) ${e3.ms} g of salt is dissolved to make ${e3.vol} mL of solution. Find the mass by volume percentage.

**(a)** $\dfrac{${e3.vs}}{${e3.vsol}} \times 100 = ${dec(e3.vpct, 2)}\ \%$.

**(b)** $\dfrac{${e3.ms}}{${e3.vol}} \times 100 = ${dec(e3.mv, 2)}\ \%$ (mass by volume).`,
      v: table(['Case', 'Solute', 'Solution', 'Concentration'], [['(a) lemon drink', `${e3.vs} mL`, `${e3.vsol} mL`, `${dec(e3.vpct, 2)} % by volume`], ['(b) salt solution', `${e3.ms} g`, `${e3.vol} mL`, `${dec(e3.mv, 2)} % mass by volume`]], 'Table of the two worked cases with solute, solution and concentration'),
      n: 'Two quick cases. In the first, twelve millilitres of lemon juice make eighty millilitres of drink, so the volume percentage is twelve divided by eighty, times one hundred, which is fifteen percent. In the second, nine grams of salt make one hundred and fifty millilitres of solution, so the mass by volume percentage is six percent.',
    }),
    sl('concept', 'Solubility, saturated and unsaturated solutions', {
      b: r`The **solubility** of a substance is the maximum mass of it that dissolves in **100 g of solvent** at a given temperature. A solution that can still dissolve more solute at that temperature is **unsaturated**. One that holds the maximum is **saturated**: any extra solute stays undissolved.`,
      v: table(['State', 'What it means', 'Test'], [['Unsaturated', 'can dissolve more solute', 'a pinch of solute added dissolves'], ['Saturated', 'has the maximum dissolved at that temperature', 'extra solute settles undissolved'], ['Solubility', 'grams that saturate 100 g of water', 'read from a solubility curve']], 'Table explaining unsaturated and saturated solutions and solubility'),
      n: 'Solubility is the largest mass of a substance that dissolves in one hundred grams of solvent at a given temperature. A solution that can still take more solute is unsaturated. A solution that already holds the largest amount is saturated, and any extra solute you add just stays at the bottom. Solubility depends on the substance, the solvent and the temperature.',
    }),
    sl('diagram', 'Reading solubility curves', {
      b: r`A **solubility curve** plots solubility against temperature. The values here are **approximate and illustrative**. Potassium nitrate rises steeply with temperature, while sodium chloride is nearly flat. Any point **on** a curve is a saturated solution, a point **below** it is unsaturated.`,
      v: V.solub,
      n: 'Look at the curves. The red curve shows potassium nitrate. Its solubility rises steeply as the water gets hotter. The blue curve shows common salt, which hardly changes with temperature. A point on a curve means a saturated solution. A point below the curve means an unsaturated solution. These values are approximate and used only for practice in reading graphs.',
    }),
    sl('example', 'Worked example: crystals on cooling', {
      b: r`**Problem.** A saturated solution of potassium nitrate is made with ${e4.water} g of water at 60 °C and cooled to 30 °C. How much crystallises? Use the curve.

**Step 1.** At 60 °C: $${dec(e4.s60, 3)} \times 2 = ${dec(e4.hot, 3)}$ g dissolve in ${e4.water} g of water.

**Step 2.** At 30 °C: $${dec(e4.s30, 2)} \times 2 = ${dec(e4.cold, 2)}$ g can stay dissolved.

**Step 3.** Crystals $= ${dec(e4.hot, 3)} - ${dec(e4.cold, 2)} = ${dec(e4.crystals, 3)}$ g.`,
      v: table(['Temperature', 'Dissolved in 100 g water', 'Dissolved in 200 g water'], [['60 °C', `${e4.s60} g`, `${e4.hot} g`], ['30 °C', `${e4.s30} g`, `${e4.cold} g`], ['Difference', `${e4.s60 - e4.s30} g`, `${e4.crystals} g crystallises`]], 'Table of the mass of potassium nitrate dissolved at 60 and 30 degrees Celsius for 100 and 200 grams of water and the difference'),
      n: 'We make a saturated solution with two hundred grams of water at sixty degrees Celsius and cool it to thirty degrees. From the curve, one hundred grams of water holds one hundred and ten grams at sixty degrees and forty six grams at thirty degrees. For two hundred grams of water, double these. The difference, one hundred and twenty eight grams, comes out as crystals.',
    }),
    sl('concept', 'Temperature, gases and crystallisation', {
      b: r`For most solids, solubility **rises** with temperature, so a hot saturated solution gives crystals when it **cools**: this is **crystallisation**, used to get pure copper sulphate or alum crystals. For **gases** it is the opposite: solubility **falls** when the temperature rises. This is why warm water holds less dissolved oxygen for fish, and why a warm fizzy drink loses its gas quickly.`,
      v: table(['Substance', 'Effect of heating', 'Everyday sign'], [['Most solids (sugar, potassium nitrate)', 'solubility rises', 'more sugar dissolves in hot tea'], ['Sodium chloride', 'rises very little', 'cooling brine gives few crystals'], ['Gases (oxygen, carbon dioxide)', 'solubility falls', 'bubbles escape from warm soda']], 'Table showing how heating affects the solubility of most solids, sodium chloride and gases with an everyday sign'),
      n: 'For most solids, solubility rises with temperature, so a hot saturated solution gives crystals as it cools. That is crystallisation. Common salt is an exception, because its solubility barely changes. For gases, the effect is the opposite. Warm water holds less dissolved gas. That is why bubbles escape from a warm fizzy drink, and why fish struggle in very warm ponds.',
    }),
    sl('check', 'Quick check: concentration', {
      b: 'Decide what a label of five percent mass by mass tells you.',
      n: 'Quick check. Think about what the label five percent mass by mass tells you about how much solute is in how much solution.',
      chk: 'chk-conc',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'A pure substance has fixed composition; a mixture has variable composition and is separable by physical means.',
        'Homogeneous mixtures are uniform; heterogeneous mixtures show visible parts.',
        'Solutions (below 1 nm) are clear and stable; colloids (1 to 1000 nm) scatter light; suspensions (above 1000 nm) settle and are filtered off.',
        'Mass percentage uses the mass of the whole solution; volume percentage and mass by volume use volumes.',
        'Solubility is grams per 100 g of solvent; most solids dissolve more in hot water, so cooling a saturated solution gives crystals.',
      ],
      v: table(['Idea', 'Key point'], [['Mixture', 'physical, any proportion'], ['Colloid test', 'Tyndall effect'], ['Concentration', 'solute divided by solution times 100'], ['Saturated', 'maximum dissolved at that temperature'], ['Crystallisation', 'cool a hot saturated solution']], 'Table summarising the key point for five ideas of Part 1'),
      n: 'To sum up. A mixture has variable makeup and can be separated by physical means. Solutions are clear and stable, colloids scatter light and do not settle, and suspensions settle. Concentration is solute divided by solution, times one hundred. Solubility is the grams that saturate one hundred grams of solvent, and cooling a hot saturated solution gives crystals.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Divide by the mass of the whole solution, not the mass of the solvent.',
        'Write the formula, then the numbers with units, then the percentage sign.',
        'To identify a colloid, quote the Tyndall effect and that it does not settle.',
        'When reading a curve, draw dashed guide lines to the axes and quote both values.',
        'Say whether a point lies on a curve (saturated) or below it (unsaturated).',
      ],
      n: 'Some exam tips. When you find a percentage, divide by the mass of the whole solution, not just the solvent. Write the formula first, then substitute with units. To prove a liquid is a colloid, mention that it does not settle and that it scatters a beam of light. On a solubility graph, draw guide lines to both axes and read both values.',
    }),
  ],
});

// =====================================================================================================================
export const deck2 = deck({
  part: 2,
  title: 'Exploring Mixtures and their Separation — Part 2: Separation techniques',
  goals: [
    'Explain evaporation, crystallisation, distillation, chromatography and centrifugation',
    'Choose a method from the property that differs between the components',
    'Relate the methods to salt pans, butter churning, winnowing, attars and jaggery',
  ],
  slides: [
    sl('title', 'Separation techniques', {
      b: 'Part 2: a mixture can be split into its parts by physical methods. The skill is to pick the property that differs.',
      v: table(['Mixture', 'Property that differs', 'Method'], [['Salt and water', 'salt does not evaporate', 'evaporation'], ['Water and acetone', 'boiling point', 'distillation'], ['Dyes in ink', 'speed up the paper', 'chromatography'], ['Cream in milk', 'density', 'centrifugation'], ['Grain and husk', 'weight', 'winnowing']], 'Table of five mixtures, the property that differs and the method used'),
      n: 'To separate a mixture we must find a property in which its parts differ. Salt does not evaporate but water does. Two liquids may boil at different temperatures. Dyes travel at different speeds on paper. Cream is lighter than skim milk, and husk is lighter than grain. Each difference leads us to a method, and we will meet them all in this part.',
    }),
    sl('concept', 'Choosing a method', {
      b: r`Ask three questions. **Is it a solid in a liquid?** If the solid has settled or is a suspension, use decantation or filtration; if it is dissolved, use evaporation or crystallisation. **Are both liquids?** If they mix, use distillation; if they form layers, use a separating funnel. **Are both solids?** Use a property such as magnetism, sublimation, size or weight.`,
      v: flow('TB', [['s', 'What is the mixture?'], ['a', 'Solid in liquid: evaporation, crystallisation, filtration, decantation, centrifugation'], ['b', 'Two liquids: distillation or separating funnel'], ['c', 'Solid with solid: magnet, sublimation, sieving, winnowing'], ['d', 'Many dyes or pigments: chromatography']], [['s', 'a'], ['s', 'b'], ['s', 'c'], ['s', 'd']], 'Flow chart of the kind of mixture leading to a group of separation methods', 'Choosing a method'),
      n: 'First ask what kind of mixture it is. A solid mixed in a liquid may need evaporation, crystallisation, filtration or centrifugation. Two liquids need distillation if they mix, or a separating funnel if they form layers. Two solids need a property that differs, such as magnetism, sublimation, size or weight. And a mixture of many dyes is a job for chromatography.',
    }),
    sl('concept', 'Evaporation and the salt pans of Gujarat', {
      b: r`**Evaporation** separates a **dissolved solid** from its liquid: heat or sunshine turns the liquid into vapour and the solid is left behind. On the Gujarat coast, sea water is led into wide shallow pans. Sun and wind evaporate the water over days, and common salt is left as a crust, which is then raked up and washed. Salt pans use sunlight, so no fuel is needed.`,
      v: table(['Stage in a salt pan', 'What happens'], [['1. Sea water is let in', 'shallow pans fill from the sea'], ['2. Sun and wind', 'water evaporates and the brine gets stronger'], ['3. Crust forms', 'salt separates as the brine becomes saturated'], ['4. Harvest and wash', 'salt is raked, washed and dried']], 'Table of four stages of salt making in a salt pan'),
      n: 'Evaporation separates a dissolved solid from its liquid. On the Gujarat coast, sea water is let into wide shallow pans. Sun and wind slowly evaporate the water, and the brine becomes stronger. When it is saturated, common salt separates as a crust. It is raked up, washed and dried. The method needs no fuel, only sunlight, wind and patience.',
    }),
    sl('concept', 'Crystallisation, and jaggery', {
      b: r`Heating a solution until **all** the water evaporates can spoil the solid and leave impurities in it. **Crystallisation** is better: evaporate part of the water to get a hot, nearly saturated solution, then let it **cool slowly**. Pure crystals form and the impurities stay in the liquid. Sugar cane juice is boiled to thicken it, and as the thick syrup cools, sugar crystals form: this is how traditional **jaggery** is set.`,
      v: table(['Point', 'Evaporation to dryness', 'Crystallisation'], [['Water removed', 'all of it', 'only part'], ['Impurities', 'stay mixed with the solid', 'mostly stay in the liquid'], ['Heat-sensitive solid (sugar)', 'may char', 'avoided'], ['Result', 'a powder', 'well-shaped crystals']], 'Table comparing evaporation to dryness and crystallisation on four points'),
      n: 'If we boil away all the water, the solid may char and impurities remain mixed in it. Crystallisation is gentler. We evaporate only part of the water, then let the hot solution cool slowly. Pure crystals form while impurities stay in the liquid. Sugar cane juice is boiled and thickened, and as the syrup cools, sugar crystals form, giving jaggery.',
    }),
    sl('check', 'Quick check: salt from sea water', {
      b: 'Decide which process makes salt in a coastal salt pan.',
      n: 'Quick check. Think about how salt is obtained when sea water is let into shallow pans on a sunny coast.',
      chk: 'chk-evap',
    }),
    sl('diagram', 'Simple distillation', {
      b: r`**Distillation** separates two liquids, or a liquid from a dissolved solid, using a difference in **boiling point**. The mixture is heated. The more volatile part boils first, its vapour passes through a **condenser** cooled by water entering at the **lower** end, and the liquid, the **distillate**, drips into the receiver. The thermometer bulb is level with the side arm to read the temperature of the vapour.`,
      v: V.distill,
      n: 'In simple distillation the mixture is heated in a flask. The part with the lower boiling point turns to vapour first. The vapour passes into a condenser, where cold water flowing in at the lower end cools it back into liquid. The liquid, called the distillate, drips into the receiving flask. The thermometer bulb sits level with the side arm, so it reads the temperature of the vapour.',
    }),
    sl('example', 'Worked example: separating acetone and water', {
      b: r`**Problem.** A mixture of acetone (boiling point 56 °C) and water (boiling point 100 °C) is distilled. Describe what happens.

**Step 1.** Heat slowly. Acetone boils first, so the thermometer stays near **56 °C** while acetone vapour passes into the condenser.

**Step 2.** The first distillate is nearly pure acetone. When it is mostly gone, the temperature **rises** towards 100 °C.

**Step 3.** Change the receiver. What now distils is mainly water. The large gap of 44 °C makes **simple distillation** enough.`,
      v: table(['Stage', 'Thermometer reads', 'Distillate'], [['Early', 'about 56 °C, steady', 'mainly acetone'], ['Middle', 'rises quickly', 'a mixture, change the receiver'], ['Late', 'about 100 °C', 'mainly water']], 'Table of the thermometer reading and the distillate at three stages of distilling acetone and water'),
      n: 'Suppose we distil a mixture of acetone and water. Acetone boils at fifty six degrees Celsius and water at one hundred. On heating, the thermometer stays near fifty six while acetone vapour is condensed. Then the temperature rises. We change the receiver, and later water distils at about one hundred degrees. A gap of forty four degrees is large enough for simple distillation.',
    }),
    sl('concept', 'Fractional distillation', {
      b: r`When the boiling points are **close**, simple distillation is not enough. A **fractionating column**, packed with glass beads, is fitted between the flask and the condenser. Vapour condenses and re-evaporates again and again on the beads, and each time it becomes richer in the more volatile liquid. Examples: ethanol and water, the gases of **liquefied air**, and the fractions of **petroleum**.`,
      v: table(['Mixture', 'Why fractional distillation', 'Parts obtained'], [['Ethanol (78 °C) and water (100 °C)', 'boiling points fairly close', 'ethanol-rich liquid first'], ['Liquefied air', 'gases boil at very low temperatures', 'nitrogen first, then oxygen'], ['Petroleum', 'many liquids with different boiling ranges', 'petrol, kerosene, diesel and others']], 'Table of three mixtures separated by fractional distillation with the reason and the parts obtained'),
      n: 'If two liquids have close boiling points, simple distillation is not enough. We then use a fractionating column between the flask and the condenser. Vapour condenses and evaporates again and again inside it, becoming richer in the more volatile liquid each time. This method separates ethanol from water, the gases in liquefied air, and the different fractions of petroleum.',
    }),
    sl('concept', 'Attars of Kannauj: the deg and bhapka', {
      b: r`In Kannauj, attar makers distil fragrant flowers by a traditional method. Flower petals and water are heated in a large copper pot, the **deg**. The scented vapour travels through a bamboo pipe into a copper receiver, the **bhapka**, standing in a cool water tank, where it condenses. Oils from the flowers are then collected, traditionally in a base of sandalwood oil. It is the same idea as distillation: heat, vapour, cool, collect.`,
      v: table(['Traditional part', 'Modern laboratory part', 'Job'], [['Deg (copper pot)', 'distillation flask', 'holds flowers and water, is heated'], ['Bamboo pipe (chonga)', 'delivery tube', 'carries the vapour'], ['Bhapka in a water tank', 'condenser and receiver', 'cools vapour and collects distillate']], 'Table matching the deg, bamboo pipe and bhapka of attar making with the flask, delivery tube and condenser of a laboratory'),
      n: 'In Kannauj, attar makers distil fragrant flowers. Petals and water are heated in a large copper pot called a deg. The scented vapour travels through a bamboo pipe into a copper receiver called a bhapka, which stands in cool water. There the vapour condenses. This traditional method works on the same idea as a laboratory distillation: heat, vapour, cool and collect.',
    }),
    sl('check', 'Quick check: close boiling points', {
      b: 'Decide which distillation method suits two liquids with close boiling points.',
      n: 'Quick check. Think about which distillation method to use when two liquids that mix have boiling points only a few degrees apart.',
      chk: 'chk-distil',
    }),
    sl('diagram', 'Paper chromatography', {
      b: r`**Chromatography** separates substances that move at **different speeds**. A spot of the sample is placed on a **pencil** base line on paper, and the paper stands in a solvent. The solvent rises, carrying each substance a different distance. Compare spots with known dyes, and compute the $R_f$ value.

$$R_f = \dfrac{\text{distance moved by the substance}}{\text{distance moved by the solvent front}}$$`,
      v: V.chromato,
      n: 'In paper chromatography, we place a spot of the sample on a pencil line near the bottom of a paper strip, and stand the paper in a solvent. The solvent rises and carries each substance a different distance. We compare the spots with known dyes. The R f value is the distance moved by the substance divided by the distance moved by the solvent front. It has no unit and is always less than one.',
    }),
    sl('example', 'Worked example: Rf values', {
      b: r`**Problem.** The solvent front rose ${dec(e5.front, 2)} cm. Two spots of a leaf extract rose ${e5.d1} cm and ${e5.d2} cm. Find the $R_f$ of each.

**Step 1.** $R_f = \dfrac{${e5.d1}}{${dec(e5.front, 2)}} = ${dec(e5.rf1, 2)}$.

**Step 2.** $R_f = \dfrac{${e5.d2}}{${dec(e5.front, 2)}} = ${dec(e5.rf2, 2)}$.

Both are between 0 and 1. The substance with the larger $R_f$ travelled faster.`,
      v: table(['Spot', 'Distance moved (cm)', 'Solvent front (cm)', 'Rf'], [['First', `${e5.d1}`, dec(e5.front, 2), dec(e5.rf1, 2)], ['Second', `${e5.d2}`, dec(e5.front, 2), dec(e5.rf2, 2)]], 'Table of two spots with distance moved, solvent front distance and the Rf value of each'),
      n: 'The solvent front rose nine centimetres. The first spot of a leaf extract rose three point six centimetres, so its R f is three point six divided by nine, which is zero point four. The second spot rose six point three centimetres, so its R f is zero point seven. Both lie between zero and one, and the second pigment moved faster.',
    }),
    sl('diagram', 'Centrifugation', {
      b: r`A **centrifuge** spins a mixture fast. The heavier, denser particles are flung to the **bottom** of the tube as **sediment**, and the lighter liquid stays above. It separates fine suspended particles that settle too slowly or pass through filter paper. Uses: blood cells from plasma in a pathology lab, and **cream from milk** in a cream separator. Tubes are always placed in opposite pairs so that the rotor stays balanced.`,
      v: V.centrifuge,
      n: 'A centrifuge spins tubes very fast. The denser particles are flung outward, to the bottom of each tube, where they collect as sediment. The lighter liquid stays above. Hospitals use it to separate blood cells from plasma. A cream separator uses it on milk. Tubes are always placed in opposite pairs, so that the rotor spins steadily without wobbling.',
    }),
    sl('concept', 'Butter from curd and cream from milk', {
      b: r`Milk is an emulsion of fat droplets in water. In a **cream separator**, the milk is spun fast and the lighter fat-rich cream collects towards the axis, leaving skim milk. In the traditional kitchen, curd or cream is **churned** with a wooden churner. The whirling motion makes fat droplets join into lumps of **butter**, which float, leaving buttermilk. The idea is like centrifugation: spinning and lighter fat.`,
      v: table(['Method', 'What is spun', 'Lighter part', 'Heavier part'], [['Cream separator', 'whole milk', 'cream', 'skim milk'], ['Churning curd', 'curd or cream', 'butter', 'buttermilk'], ['Blood centrifuge', 'blood sample', 'plasma', 'blood cells']], 'Table comparing a cream separator, churning of curd and a blood centrifuge with the lighter and heavier parts'),
      n: 'Milk is an emulsion of tiny fat droplets in water. In a cream separator, the milk is spun fast, and the lighter cream collects near the middle, leaving skim milk. In a kitchen, curd is churned with a wooden churner. The whirling makes fat droplets join into butter, which floats on buttermilk. The idea is similar to centrifugation, though churning joins the droplets together.',
    }),
    sl('concept', 'Sublimation, separating funnel and magnet', {
      b: r`**Sublimation:** some solids, such as ammonium chloride, camphor, naphthalene and iodine, turn straight into vapour on heating. Heat the mixture and the vapour re-forms as a solid on a cool surface. **Separating funnel:** two liquids that do not mix, such as oil and water, form layers; the denser lower layer is run off through the tap. **Magnetic separation:** a magnet pulls iron out of a mixture, as an electromagnet does in a scrap yard.`,
      v: table(['Method', 'Property used', 'Example'], [['Sublimation', 'one solid turns to vapour on heating', 'camphor from sand'], ['Separating funnel', 'liquids do not mix and differ in density', 'kerosene and water'], ['Magnetic separation', 'iron is attracted by a magnet', 'iron filings from sand']], 'Table of sublimation, separating funnel and magnetic separation with the property used and an example'),
      n: 'Some solids, like camphor and ammonium chloride, change directly into vapour on heating. This is sublimation, and the vapour turns back into a solid on a cool surface. A separating funnel separates two liquids that do not mix, such as oil and water. The denser layer is run off through the tap. A magnet pulls out iron from a mixture, as in a scrap yard.',
    }),
    sl('concept', 'Winnowing, sieving and decantation', {
      b: r`**Winnowing:** a farmer tosses threshed grain into a breeze, and the lighter husk is blown away while heavier grain falls. **Sieving:** a sieve lets small particles through and keeps larger ones, as when atta is separated from coarse bran. **Sedimentation and decantation:** let a muddy mixture stand, the heavier solid settles, and then **pour off** the clear liquid above it.`,
      v: table(['Method', 'Property used', 'Everyday example'], [['Winnowing', 'weight, with the help of wind', 'wheat and husk on a Punjab threshing floor'], ['Sieving', 'particle size', 'atta from coarse bran'], ['Decantation', 'solid settles under gravity', 'clear water poured off from muddy water']], 'Table of winnowing, sieving and decantation with the property used and an everyday example'),
      n: 'In winnowing, a farmer tosses threshed grain into the breeze. The lighter husk is blown away and the heavier grain falls down. A sieve keeps large particles and lets small ones through, as when fine atta is separated from coarse bran. In sedimentation and decantation, we let a muddy mixture stand until the solid settles, and then we pour off the clear liquid.',
    }),
    sl('check', 'Quick check: winnowing', {
      b: 'Decide on what property winnowing depends.',
      n: 'Quick check. Think about what property of the grain and the husk lets a breeze separate them when a farmer tosses them into the air.',
      chk: 'chk-sep',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Choose the method from the property that differs between the parts.',
        'Evaporation leaves a dissolved solid behind (salt pans); crystallisation gives purer crystals on cooling (jaggery).',
        'Simple distillation separates liquids with well-separated boiling points; fractional distillation needs a fractionating column.',
        'Rf equals the distance moved by the substance divided by the distance moved by the solvent front.',
        'Centrifugation, separating funnel, sublimation, magnet, winnowing, sieving and decantation use density, immiscibility, vapour, magnetism, weight, size and settling.',
      ],
      v: table(['Method', 'Property that differs'], [['Evaporation', 'volatility of solvent'], ['Distillation', 'boiling point'], ['Chromatography', 'speed on paper'], ['Centrifugation', 'density'], ['Sublimation', 'turns directly to vapour'], ['Magnet, winnowing, sieving', 'magnetism, weight, size']], 'Table summarising the property that differs for each separation method'),
      n: 'To sum up. Always choose a method from a property that differs. Evaporation leaves a dissolved solid, and crystallisation gives purer crystals on cooling. Simple distillation separates liquids with well separated boiling points, and fractional distillation uses a column when they are close. Chromatography uses speed on paper, and centrifugation uses density. Other methods use magnetism, weight, size and settling.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Draw distillation neatly: cold water enters at the lower end of the condenser and leaves at the upper end.',
        'Always name the property that differs before naming the method.',
        'Draw the chromatography base line with a pencil and give Rf the formula, with no unit.',
        'Do not call churning pure centrifugation: say it is similar and that fat droplets join.',
        'For traditional practices, link each step to a laboratory method.',
      ],
      n: 'Some exam tips. When you draw a distillation set up, show cold water entering the lower end of the condenser. Always name the property that differs before you name the method. In chromatography, draw the base line with a pencil and remember that R f has no unit. For traditional practices, link each step to its laboratory method, and be careful with the words you use.',
    }),
  ],
});
