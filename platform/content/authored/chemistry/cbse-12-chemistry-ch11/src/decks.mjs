// ch11 Surface Chemistry (formative assessment only) — two decks: Part 1 (t01) adsorption; Part 2 (t02) colloids,
// emulsions and coagulation.
import { sl, deck, table, flow, plot, svgV, r } from './lib.mjs';
import { TYNDALL, CHARGED } from './svgs.mjs';

const ps = [0, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10];
// Freundlich-type curves x/m = k p^(1/n), illustrative: k 1.2 (low T) and 0.7 (high T), n 2.
export const isothermPlot = plot(
  {
    x: { min: 0, max: 10, label: 'Pressure of gas, p (bar)' },
    y: { min: 0, max: 4, label: 'Mass adsorbed per gram, x/m (g/g)' },
    series: [
      { label: 'Lower temperature', kind: 'line', points: ps.map((p) => [p, +(1.2 * Math.sqrt(p)).toFixed(3)]) },
      { label: 'Higher temperature', kind: 'line', points: ps.map((p) => [p, +(0.7 * Math.sqrt(p)).toFixed(3)]) },
    ],
  },
  'Adsorption isotherms: the mass of gas adsorbed per gram of adsorbent rises steeply at low pressure and then more slowly; the curve for the higher temperature lies below the curve for the lower temperature',
  'Illustrative Freundlich curves with 1/n = 0.5.',
);
export const logPlot = plot(
  {
    x: { min: -0.4, max: 1.2, label: 'log p' },
    y: { min: -0.4, max: 1.0, label: 'log (x/m)' },
    series: [{ label: 'Freundlich plot', kind: 'line', points: [[-0.4, -0.12], [0, 0.08], [0.4, 0.28], [0.8, 0.48], [1.2, 0.68]] }],
    points: [{ at: [0, 0.08], label: 'intercept = log k', on_curve: true }],
  },
  'A straight line of log of x over m against log p, with a positive slope of one half and an intercept of log k on the vertical axis',
  'Slope = 1/n; intercept = log k (illustrative: 1/n = 0.5, k = 1.2).',
);
export const tempPlot = plot(
  {
    x: { min: 200, max: 800, label: 'Temperature (K)' },
    y: { min: 0, max: 10, label: 'Extent of adsorption (arbitrary units)' },
    series: [
      { label: 'Physisorption', kind: 'line', points: [[200, 9], [250, 7.2], [300, 5.6], [350, 4.2], [400, 3.0], [500, 1.5], [600, 0.7], [800, 0.2]] },
      { label: 'Chemisorption', kind: 'line', points: [[200, 0.3], [300, 1.0], [400, 3.0], [500, 6.5], [550, 7.4], [600, 7.0], [700, 4.6], [800, 2.6]] },
    ],
  },
  'Extent of adsorption against temperature: physisorption falls steadily as temperature rises, while chemisorption first rises to a maximum and then falls',
  'Illustrative curves at constant pressure.',
);

export const V = {
  tyndall: svgV(TYNDALL, 'A light beam invisible in a true solution but visible as a bright path in a colloidal sol, seen from the side'),
  charged: svgV(CHARGED, 'A ferric oxide sol particle with adsorbed iron(III) ions giving a positive charge and an outer layer of chloride ions'),
};

export const deck1 = deck({
  part: 1,
  title: 'Surface Chemistry — Part 1: Adsorption',
  goals: [
    'Distinguish adsorption from absorption and name the adsorbate and adsorbent',
    'Compare physisorption and chemisorption',
    'Explain how the nature of the gas, surface area, pressure and temperature affect adsorption of gases on solids',
    'Describe applications of adsorption',
  ],
  slides: [
    sl('title', 'Surface Chemistry', {
      b: 'Part 1 — adsorption: why molecules stick to surfaces. (This chapter is for formative assessment; it is not tested in the board exam.)',
      v: table(['Where you meet it', 'What is happening'], [['Silica gel packet in a shoe box', 'Water vapour adsorbed on silica gel'], ['Charcoal in a water filter', 'Colour and smell molecules adsorbed'], ['Milk, fog, ink', 'Colloids'], ['Smoke settling in a chimney precipitator', 'Charged colloidal particles neutralised']], 'Table of everyday examples of adsorption and colloids'),
      n: 'Namaste! Surface chemistry is about what happens at the boundary between two phases, such as a gas touching a solid. The little silica gel packet in a new shoe box and the charcoal in a water filter both work because molecules stick to surfaces. In this part we study adsorption; in the next, colloids like milk, fog and ink. This chapter is assessed in school, not in the board exam.',
    }),
    sl('concept', 'Adsorption and absorption', {
      b: '**Adsorption** is the accumulation of molecules at the **surface** of a solid or liquid, so their concentration there is higher than in the bulk. The substance adsorbed is the **adsorbate**; the surface is the **adsorbent**. In **absorption** the substance spreads **throughout** the bulk. Removing an adsorbed substance is **desorption**; when both happen together we say **sorption**.',
      v: table(['Feature', 'Adsorption', 'Absorption'], [['Where', 'Surface only', 'Throughout the bulk'], ['Concentration', 'Higher at the surface than inside', 'Uniform'], ['Rate', 'Fast at first, then slows', 'Steady'], ['Example', 'Water vapour on silica gel', 'Water vapour in anhydrous CaCl₂']], 'Table comparing adsorption and absorption'),
      n: 'Atoms at a surface are not surrounded on all sides, so they have unbalanced attractive forces. They attract molecules from the gas or liquid around them, and those molecules collect on the surface. This is adsorption. In absorption, as when a sponge soaks up water, the substance spreads through the whole material. Silica gel adsorbs water vapour, while anhydrous calcium chloride absorbs it.',
    }),
    sl('concept', 'Why adsorption is exothermic', {
      b: 'Adsorption lowers the residual surface forces, so it **releases heat**: $\\Delta H$ is **negative**. The adsorbed molecules lose freedom of movement, so $\\Delta S$ is also negative. For adsorption to be spontaneous ($\\Delta G < 0$), the heat released must outweigh the entropy loss, i.e. $|\\Delta H| > T|\\Delta S|$. As adsorption proceeds, $|\\Delta H|$ falls; when $\\Delta H = T\\Delta S$, equilibrium is reached.',
      m: [r`\Delta G = \Delta H - T\Delta S < 0 \quad\text{with } \Delta H < 0,\ \Delta S < 0`],
      v: table(['Quantity', 'Sign for adsorption', 'Reason'], [['ΔH', 'Negative', 'Attractions form; heat released'], ['ΔS', 'Negative', 'Molecules lose freedom on the surface'], ['ΔG', 'Negative (spontaneous)', '|ΔH| > T|ΔS|']], 'Table of the signs of enthalpy, entropy and Gibbs energy change for adsorption'),
      n: 'When a gas molecule settles on a surface, new attractions form and heat is given out, so the enthalpy change is negative. But the molecule also loses freedom to move, so the entropy change is negative too. Adsorption happens on its own only while the heat released outweighs the loss of entropy. As the surface fills up, less heat is released, and eventually the process reaches equilibrium.',
    }),
    sl('concept', 'Physisorption and chemisorption', {
      b: '**Physisorption** (physical adsorption): weak **van der Waals** forces. **Chemisorption** (chemical adsorption): **chemical bonds** form between adsorbate and surface.',
      v: table(['Feature', 'Physisorption', 'Chemisorption'], [['Forces', 'van der Waals', 'Chemical bonds'], ['Enthalpy of adsorption', 'Low, about 20–40 kJ/mol', 'High, about 80–240 kJ/mol'], ['Specificity', 'Not specific', 'Highly specific'], ['Reversibility', 'Reversible', 'Usually irreversible'], ['Effect of temperature', 'Falls as T rises', 'Rises, then falls (needs activation energy)'], ['Layers', 'Multimolecular', 'Unimolecular (one layer)'], ['Example', 'N₂ on charcoal at low T', 'H₂ on nickel (forms Ni–H bonds)']], 'Table comparing physisorption and chemisorption'),
      n: 'There are two kinds of adsorption. In physisorption, molecules are held by weak van der Waals forces, the same forces that hold liquids together. Little heat is released, the gas can be removed easily, and many layers can build up. In chemisorption, real chemical bonds form between the gas and the surface, so much more heat is released, the process is specific and hard to reverse, and only one layer forms.',
    }),
    sl('diagram', 'Effect of temperature', {
      b: 'Physisorption, being exothermic and needing no activation, **decreases** as temperature rises (Le Chatelier). Chemisorption needs **activation energy**, so it first **increases** with temperature, then decreases at high temperature. A gas may be physisorbed at low temperature and chemisorbed at higher temperature.',
      v: tempPlot,
      n: 'Look at how temperature changes the two kinds of adsorption. Physisorption gives out heat and needs no activation, so by Le Chatelier’s principle it falls steadily as the temperature rises. Chemisorption is like a chemical reaction: it needs activation energy, so at first it speeds up as the temperature rises, reaches a maximum, and then falls. Hydrogen, for example, is physisorbed on nickel at low temperature and chemisorbed when warmer.',
    }),
    sl('example', 'Worked example: which kind of adsorption?', {
      b: r`**Problem.** Classify each as physisorption or chemisorption: (a) the enthalpy of adsorption is $-25\ \text{kJ mol}^{-1}$ and the gas comes off when pressure is lowered; (b) oxygen on tungsten forms a single layer that can be removed only as tungsten oxide; (c) adsorption of a gas on charcoal decreases from 200 K to 300 K.

**(a)** Physisorption — low enthalpy, reversible.

**(b)** Chemisorption — a chemical bond (W–O) forms; one layer; irreversible.

**(c)** Physisorption — it falls as temperature rises.`,
      v: table(['Case', 'Key clue', 'Type'], [['(a)', 'Low |ΔH|, reversible', 'Physisorption'], ['(b)', 'Bond formed, one layer', 'Chemisorption'], ['(c)', 'Falls on heating', 'Physisorption']], 'Table of three cases, the clue in each and the type of adsorption'),
      n: 'Use the clues in the table of differences. A small enthalpy of adsorption that is easily reversed points to physisorption. Oxygen that can only be removed from tungsten as an oxide must have formed chemical bonds, so that is chemisorption, and it forms just one layer. Adsorption that falls steadily on warming from low temperatures is physisorption.',
    }),
    sl('check', 'Quick check: physisorption or chemisorption', {
      b: 'Pick the property that belongs to chemisorption.',
      n: 'Quick check. Think about the strength of the forces involved and how many layers can form.',
      chk: 'chemisorption-mcq',
    }),
    sl('concept', 'Factors: nature of the gas and surface area', {
      b: '**Nature of the gas:** in physisorption, gases that liquefy easily (high **critical temperature**) have stronger van der Waals forces and are adsorbed more. **Surface area:** finely divided or porous adsorbents (activated charcoal, silica gel, finely divided metals) adsorb more, because more surface is available.',
      v: table(['Gas', 'Critical temperature (K)', 'Adsorbed on 1 g charcoal (relative)'], [['SO₂', '430', 'Most'], ['NH₃', '406', 'High'], ['CO₂', '304', 'Moderate'], ['CH₄', '190', 'Low'], ['H₂', '33', 'Least']], 'Table of gases with their critical temperatures and the relative amount adsorbed on charcoal'),
      n: 'Not all gases are adsorbed equally. In physisorption, gases that are easy to liquefy, such as sulfur dioxide and ammonia, have strong van der Waals attractions and are adsorbed much more than hydrogen or methane. A useful guide is the critical temperature: the higher it is, the more the gas is adsorbed. The adsorbent matters too: powdered or porous solids with huge surface areas, like activated charcoal, adsorb far more.',
    }),
    sl('diagram', 'Effect of pressure: adsorption isotherms', {
      b: 'At constant temperature, the extent of adsorption $x/m$ (mass of gas $x$ adsorbed on mass $m$ of adsorbent) **increases with pressure**, steeply at first and then more slowly, approaching saturation. A curve of $x/m$ against $p$ at constant temperature is an **adsorption isotherm**. At higher temperature, less is adsorbed at every pressure.',
      v: isothermPlot,
      n: 'Raising the pressure of a gas pushes more of it onto the surface. At low pressure the amount adsorbed rises quickly; at higher pressure the surface begins to fill up, so it rises more slowly towards a limit. A graph of the amount adsorbed per gram against pressure, at a fixed temperature, is called an adsorption isotherm. The lower curve, at a higher temperature, shows that heating reduces physisorption.',
    }),
    sl('concept', 'The Freundlich adsorption isotherm', {
      b: 'Freundlich proposed an empirical relation for adsorption of a gas at constant temperature, where $k$ and $n$ depend on the gas, adsorbent and temperature, with $n > 1$. Taking logarithms gives a straight line: plotting $\log (x/m)$ against $\log p$ gives slope $1/n$ and intercept $\log k$. It works over a limited range of pressure.',
      m: [r`\dfrac{x}{m} = k\,p^{1/n} \quad (n > 1)`, r`\log \dfrac{x}{m} = \log k + \dfrac{1}{n}\log p`],
      v: logPlot,
      n: 'Freundlich found a simple equation that fits many isotherms: the amount adsorbed per gram equals a constant times the pressure raised to a power less than one. Taking logarithms turns this into a straight line. So if you plot the log of the amount adsorbed against the log of the pressure, the slope gives one over n, and the intercept gives the log of k. The equation works only over a limited range of pressure.',
    }),
    sl('example', 'Worked example: using the Freundlich equation', {
      b: r`**Problem.** For adsorption of a gas on charcoal at 300 K, a plot of $\log (x/m)$ against $\log p$ is a straight line of slope $0.5$ and intercept $0.30$. Find $x/m$ at $p = 4\ \text{bar}$.

**Step 1.** Intercept $= \log k = 0.30$, so $k = 10^{0.30} = 2.0$.

**Step 2.** Slope $= 1/n = 0.5$.

**Step 3.** $x/m = k\,p^{1/n} = 2.0 \times 4^{0.5} = 2.0 \times 2 = 4.0$ (in the units of $k$, here g of gas per g of charcoal).`,
      v: table(['Quantity', 'Value'], [['log k', '0.30'], ['k', '2.0'], ['1/n', '0.5'], ['x/m at 4 bar', '4.0']], 'Table of the Freundlich constants and the calculated extent of adsorption'),
      n: 'Read the two constants from the straight line. The intercept is the log of k, so k is ten to the power nought point three, which is about two. The slope is one over n, which is one half. Then put the pressure into the equation: two times the square root of four gives four. With straight-line data, Freundlich problems come down to reading slope and intercept carefully.',
    }),
    sl('check', 'Quick check: the Freundlich plot', {
      b: 'Interpret the slope or intercept of a Freundlich plot.',
      n: 'Quick check. Remember which constant comes from the slope and which from the intercept of the log plot.',
      chk: 'freundlich-mcq',
    }),
    sl('concept', 'Adsorption from solution', {
      b: 'Solids also adsorb solutes from solution. Activated charcoal shaken with ethanoic acid solution lowers its concentration; the extent of adsorption falls with temperature and rises with concentration and surface area, much as for gases.',
      v: table(['Observation', 'Explanation'], [['Charcoal decolourises raw sugar solution', 'Coloured impurities adsorbed'], ['Ethanoic acid concentration falls after shaking with charcoal', 'Acid molecules adsorbed on charcoal'], ['Mg(OH)₂ precipitate turns blue with magneson dye', 'Dye adsorbed on the precipitate (a test for Mg²⁺)']], 'Table of examples of adsorption from solution and their explanations'),
      n: 'Adsorption is not limited to gases. If you shake charcoal with a solution of ethanoic acid and then filter it, titration shows that the acid concentration has fallen, because acid molecules have stuck to the charcoal. Sugar factories use charcoal to remove coloured impurities from raw sugar solution. Like gas adsorption, adsorption from solution increases with concentration and surface area and decreases with temperature.',
    }),
    sl('example', 'Worked example: adsorption of ethanoic acid', {
      b: r`**Problem.** $50.0\ \text{mL}$ of $0.50\ \text{M}$ ethanoic acid is shaken with $2.0\ \text{g}$ of activated charcoal. After filtering, the concentration is $0.42\ \text{M}$. Find the mass of acid adsorbed per gram of charcoal ($M = 60$).

**Step 1.** Fall in concentration $= 0.50 - 0.42 = 0.08\ \text{M}$.

**Step 2.** Moles adsorbed $= 0.08 \times 0.0500 = 0.004\ \text{mol}$; mass $= 0.004 \times 60 = 0.24\ \text{g}$.

**Step 3.** $x/m = 0.24 \div 2.0 = 0.12\ \text{g per g}$.`,
      v: table(['Quantity', 'Value'], [['Moles of acid before', '0.025 mol'], ['Moles after', '0.021 mol'], ['Moles adsorbed', '0.004 mol'], ['x/m', '0.12 g per g']], 'Table of moles of acid before and after adsorption and the mass adsorbed per gram'),
      n: 'The acid that disappears from the solution is the acid adsorbed on the charcoal. The concentration fell by nought point nought eight moles per litre in fifty millilitres, which is four thousandths of a mole. Multiplying by the molar mass gives nought point two four grams. Dividing by the two grams of charcoal gives nought point one two grams of acid adsorbed per gram of charcoal.',
    }),
    sl('concept', 'Applications of adsorption', {
      b: 'Adsorption is used to remove unwanted substances, to control humidity and in catalysis and analysis.',
      v: table(['Application', 'How adsorption helps'], [['Gas masks', 'Activated charcoal adsorbs poisonous gases'], ['Humidity control', 'Silica gel and alumina adsorb moisture'], ['Removing colour', 'Charcoal decolourises solutions (sugar refining)'], ['Heterogeneous catalysis', 'Reactants adsorbed on Fe, Ni, Pt surfaces (Haber process, hydrogenation of oils)'], ['High vacuum', 'Cooled charcoal adsorbs remaining gas'], ['Chromatography', 'Components separated by differing adsorption'], ['Froth flotation', 'Ore particles adsorb pine oil and float']], 'Table of applications of adsorption'),
      n: 'Adsorption has many uses. Gas masks contain activated charcoal that traps poisonous gases. Silica gel keeps medicines and electronics dry. Charcoal removes colour from sugar solutions. Many industrial catalysts, like iron in the Haber process and nickel for hardening oils, work because reactant molecules are adsorbed on their surfaces. Chromatography separates mixtures because different substances are adsorbed to different extents.',
    }),
    sl('check', 'Quick check: factors and applications', {
      b: 'Predict which gas is adsorbed most, or explain an application.',
      n: 'Quick check. Recall the link between how easily a gas liquefies and how strongly it is adsorbed.',
      chk: 'gas-order-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Adsorption: surface accumulation; adsorbate and adsorbent; differs from absorption.',
        'Exothermic (ΔH < 0) with ΔS < 0; spontaneous while |ΔH| > T|ΔS|.',
        'Physisorption: van der Waals, low ΔH, reversible, multilayer, falls with T.',
        'Chemisorption: chemical bonds, high ΔH, specific, one layer, rises then falls with T.',
        'More adsorption with easily liquefied gases, larger surface area and higher pressure.',
        'Freundlich: x/m = k p^(1/n); log plot slope 1/n, intercept log k.',
      ],
      v: table(['Factor raised', 'Physisorption'], [['Pressure', 'Increases'], ['Temperature', 'Decreases'], ['Surface area', 'Increases'], ['Critical temperature of gas', 'Increases']], 'Summary table of how factors affect physisorption'),
      n: 'Let us sum up Part 1. Adsorption is the build-up of molecules on a surface and is exothermic. Physisorption uses weak forces and is reversible, while chemisorption forms chemical bonds and is specific. More gas is adsorbed when the gas liquefies easily, the surface area is large and the pressure is high. The Freundlich equation describes how adsorption depends on pressure.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Do not mix up adsorption (surface) and absorption (bulk).',
        'Physisorption decreases with temperature; chemisorption first increases.',
        'In the Freundlich log plot, slope = 1/n and intercept = log k.',
        'Higher critical temperature → more physisorption.',
      ],
      v: table(['Slip', 'Fix'], [['Adsorption is endothermic', 'It is exothermic'], ['Chemisorption is multilayer', 'It is one layer'], ['Slope of log plot = n', 'Slope = 1/n']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'A few tips. Keep adsorption and absorption apart. Remember the opposite effects of temperature on the two kinds of adsorption at low temperatures. In Freundlich problems, the slope of the log plot is one over n, not n. And when comparing gases, the one with the higher critical temperature is adsorbed more.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Surface Chemistry — Part 2: Colloids, emulsions and coagulation',
  goals: [
    'Distinguish true solutions, colloids and suspensions by particle size and properties',
    'Classify colloids by phases and by the interaction between dispersed phase and medium (lyophilic and lyophobic)',
    'Explain the Tyndall effect, Brownian movement, charge on sols, electrophoresis and coagulation (Hardy–Schulze rule)',
    'Describe types of emulsions and everyday uses of colloids',
  ],
  slides: [
    sl('title', 'Colloids', {
      b: 'Part 2 — mixtures between true solutions and suspensions.',
      v: flow('LR', [['a', 'True solution (< 1 nm)'], ['b', 'Colloid (1–1000 nm)'], ['c', 'Suspension (> 1000 nm)']], [['a', 'b', 'larger particles'], ['b', 'c', 'larger still']], 'Flow from true solution through colloid to suspension as particle size increases'),
      n: 'Milk looks uniform, yet it is not a true solution, and it does not settle like muddy water either. It is a colloid, a mixture whose particles are bigger than ordinary molecules but too small to see or to settle. In this part we look at how colloids are classified, why they scatter light and carry charge, how they can be made to settle, and how emulsions such as milk and butter are built.',
    }),
    sl('concept', 'True solutions, colloids and suspensions', {
      b: 'The three kinds of mixture differ in **particle size**, which controls their properties.',
      v: table(['Property', 'True solution', 'Colloid', 'Suspension'], [['Particle size', '< 1 nm', '1–1000 nm', '> 1000 nm'], ['Appearance', 'Clear, homogeneous', 'Looks homogeneous; actually heterogeneous', 'Heterogeneous'], ['Passes through filter paper?', 'Yes', 'Yes', 'No'], ['Passes through parchment membrane?', 'Yes', 'No', 'No'], ['Settles on standing?', 'No', 'No (only on centrifuging)', 'Yes'], ['Scatters light (Tyndall)?', 'No', 'Yes', 'Yes, if not opaque'], ['Example', 'Salt in water', 'Milk, starch sol, fog', 'Sand in water']], 'Table comparing true solutions, colloids and suspensions'),
      n: 'Particle size is the key. In a true solution, like salt in water, particles are smaller than about one nanometre. In a suspension, like sand in water, they are larger than about a thousand nanometres and settle out. Colloidal particles lie in between: they pass through filter paper and do not settle, but they cannot pass through a parchment membrane, and they scatter light.',
    }),
    sl('example', 'Worked example: solution, colloid or suspension?', {
      b: r`**Problem.** Classify each mixture and give one test that supports your answer: (a) copper sulfate solution; (b) dilute milk; (c) chalk powder shaken in water; (d) a sol whose particles are $50\ \text{nm}$ across.

**(a)** True solution — clear, passes through parchment, no Tyndall effect.

**(b)** Colloid (emulsion) — beam visible from the side (Tyndall), does not settle.

**(c)** Suspension — chalk settles on standing and is held back by filter paper.

**(d)** Colloid — particle size lies between 1 nm and 1000 nm.`,
      v: table(['Mixture', 'Type', 'Supporting test'], [['Copper sulfate solution', 'True solution', 'No Tyndall effect'], ['Dilute milk', 'Colloid', 'Tyndall effect; no settling'], ['Chalk in water', 'Suspension', 'Settles; held by filter paper'], ['50 nm particles', 'Colloid', 'Size between 1 and 1000 nm']], 'Table classifying four mixtures with a supporting test for each'),
      n: 'Use particle size and simple tests. Copper sulfate solution is clear and shows no beam, so it is a true solution. Dilute milk scatters a beam of light but does not settle, so it is a colloid. Chalk in water settles and is caught by filter paper, so it is a suspension. And particles fifty nanometres across fall within the colloidal range.',
    }),
    sl('concept', 'Dispersed phase and dispersion medium', {
      b: 'A colloid has a **dispersed phase** (the particles) spread in a **dispersion medium**. Either can be solid, liquid or gas (except gas in gas, which always forms a true solution), giving eight types.',
      v: table(['Dispersed phase', 'Medium', 'Name', 'Example'], [['Solid', 'Liquid', 'Sol', 'Paint, ferric hydroxide sol'], ['Solid', 'Gas', 'Aerosol', 'Smoke, dust'], ['Solid', 'Solid', 'Solid sol', 'Coloured glass, gemstones'], ['Liquid', 'Liquid', 'Emulsion', 'Milk, hair cream'], ['Liquid', 'Gas', 'Aerosol', 'Fog, mist, cloud'], ['Liquid', 'Solid', 'Gel', 'Cheese, butter, jelly'], ['Gas', 'Liquid', 'Foam', 'Soap lather, whipped cream'], ['Gas', 'Solid', 'Solid foam', 'Pumice, foam rubber']], 'Table of the eight types of colloid by dispersed phase and medium with examples'),
      n: 'Every colloid has two parts: the dispersed phase, which is the tiny particles, and the dispersion medium they are spread through. Either can be a solid, a liquid or a gas. Solid in liquid gives a sol, such as paint. Liquid in liquid gives an emulsion, such as milk. Liquid in gas gives fog, and gas in liquid gives foam. Gases always mix completely, so there is no gas-in-gas colloid.',
    }),
    sl('concept', 'Lyophilic and lyophobic sols', {
      b: '**Lyophilic** (solvent-loving) sols form directly by mixing (gum, starch, gelatin, proteins in water); they are **reversible** and **stable**. **Lyophobic** (solvent-hating) sols (metals, sulfides, hydroxides in water) need special methods to make; they are **irreversible** and are easily **coagulated** by a little electrolyte.',
      v: table(['Feature', 'Lyophilic', 'Lyophobic'], [['Affinity for medium', 'Strong', 'Little'], ['Preparation', 'Simple mixing', 'Special methods'], ['Reversible after evaporation?', 'Yes', 'No'], ['Stability', 'Stable (solvation layer)', 'Unstable; needs charge'], ['Effect of a little electrolyte', 'Little effect', 'Coagulates'], ['Examples', 'Starch, gum, gelatin', 'Gold, As₂S₃, Fe(OH)₃ sols']], 'Table comparing lyophilic and lyophobic sols'),
      n: 'Sols are also classified by how much the particles like the medium. Starch, gum and gelatin are attracted to water and dissolve to form lyophilic sols just by warming and stirring. These are stable, and if dried they re-form a sol when water is added. Metals and metal sulfides have little attraction for water, giving lyophobic sols. These must be made by special methods, cannot be re-formed once dried, and are destroyed by small amounts of salt.',
    }),
    sl('concept', 'Multimolecular, macromolecular and associated colloids', {
      b: '**Multimolecular:** many small atoms or molecules aggregate to colloidal size (gold sol, sulfur sol). **Macromolecular:** single large molecules are already colloidal in size (starch, proteins, nylon in solution). **Associated colloids (micelles):** soaps and detergents behave as ordinary electrolytes at low concentration but form aggregates called **micelles** above the **critical micelle concentration** (CMC) and above the **Kraft temperature**.',
      v: table(['Type', 'Particle', 'Example'], [['Multimolecular', 'Aggregate of many small units', 'Gold sol, sulfur sol'], ['Macromolecular', 'One giant molecule', 'Starch, proteins'], ['Associated (micelle)', 'Aggregate of ions above CMC', 'Soap in water']], 'Table of the three types of colloid by particle type with examples'),
      n: 'Colloidal particles can be made in three ways. Many small atoms can cluster together, as in a gold sol. A single giant molecule, like starch or a protein, can already be large enough. And soap ions in water, above a certain concentration and temperature, gather into balls called micelles, with their oily tails inside and their charged heads facing the water. Micelles trap grease, which is how soap cleans.',
    }),
    sl('check', 'Quick check: types of colloids', {
      b: 'Classify a mixture as a true solution, colloid or suspension, or name a colloid type.',
      n: 'Quick check. Use particle size and the names of the phases to decide.',
      chk: 'colloid-type-mcq',
    }),
    sl('concept', 'Preparing and purifying colloids', {
      b: '**Preparation:** chemical methods (double decomposition, oxidation, reduction, hydrolysis), e.g. ferric chloride hydrolysed in boiling water; **Bredig’s arc** (metal sols); **peptisation** (a precipitate dispersed by a little electrolyte). **Purification:** **dialysis** removes dissolved ions through a parchment or cellophane membrane; electrodialysis speeds it up.',
      m: [r`\ce{FeCl3 + 3H2O ->[boil] Fe(OH)3 (sol) + 3HCl}`, r`\ce{As2O3 + 3H2S -> As2S3 (sol) + 3H2O}`],
      v: table(['Method', 'Example'], [['Hydrolysis', 'FeCl₃ in boiling water → Fe(OH)₃ sol'], ['Double decomposition', 'As₂O₃ + H₂S → As₂S₃ sol'], ['Bredig’s arc', 'Gold or platinum sol'], ['Peptisation', 'Fresh Fe(OH)₃ precipitate + a little FeCl₃'], ['Dialysis', 'Removes excess ions from a sol']], 'Table of methods for preparing and purifying colloids with examples'),
      n: 'Lyophobic sols are made by special methods. Adding ferric chloride drop by drop to boiling water hydrolyses it into a red-brown ferric hydroxide sol. An electric arc between metal wires under water gives a metal sol. A freshly formed precipitate can be broken up into a sol by shaking it with a little electrolyte, called peptisation. Excess ions are then removed by dialysis through a membrane that lets small ions pass but holds back colloidal particles.',
    }),
    sl('diagram', 'Tyndall effect and Brownian movement', {
      b: 'Colloidal particles **scatter light**, so a beam passing through a sol is visible from the side: the **Tyndall effect**. Viewed under a microscope, the particles move in **zigzag paths** (**Brownian movement**) because molecules of the medium strike them unevenly; this helps keep sols from settling.',
      v: V.tyndall,
      n: 'Shine a narrow beam of light through a true solution and you see nothing from the side. Through a sol, the beam shows up as a bright path, because the particles scatter light. This is the Tyndall effect, the same reason sunbeams show up in a dusty room or headlights in fog. Under a microscope, colloidal particles also jiggle about in zigzags, pushed by molecules of the liquid. This Brownian movement helps stop them settling.',
    }),
    sl('diagram', 'Charge on colloidal particles', {
      b: 'Sol particles carry a **charge**, usually from **preferential adsorption** of ions common to the particle. All particles in a sol carry the **same** charge, so they repel and stay dispersed. A fixed layer of charge and a diffuse layer of opposite charge form an **electrical double layer**.',
      v: V.charged,
      n: 'Colloidal particles are electrically charged. A ferric hydroxide sol made from ferric chloride adsorbs iron three plus ions and becomes positive; an arsenious sulfide sol adsorbs sulfide ions and becomes negative. Around the fixed charged layer is a looser layer of oppositely charged ions. Because every particle in a sol carries the same charge, the particles repel each other, which keeps the sol stable.',
    }),
    sl('concept', 'Positive and negative sols; electrophoresis', {
      b: 'Under an electric field, sol particles move towards the electrode of opposite charge: **electrophoresis**. This shows the sign of their charge.',
      v: table(['Positive sols', 'Negative sols'], [['Hydrated metal oxides: Fe₂O₃·xH₂O, Al₂O₃·xH₂O', 'Metal sols: Au, Ag, Cu'], ['Basic dyes: methylene blue', 'Metal sulfides: As₂S₃'], ['Haemoglobin (blood)', 'Starch, gum, clay, charcoal'], ['TiO₂ sol', 'Acid dyes: eosin, Congo red']], 'Table listing common positive and negative sols'),
      n: 'How do we know which way a sol is charged? In electrophoresis, a sol is placed in an electric field. Positively charged particles, such as ferric hydroxide, drift towards the negative electrode, and negatively charged particles, such as gold or arsenious sulfide, drift towards the positive electrode. When they reach the electrode, they lose their charge and settle out.',
    }),
    sl('check', 'Quick check: charge and electrophoresis', {
      b: 'Predict the direction a sol moves or the sign of its charge.',
      n: 'Quick check. Think about which ions the particles adsorb from the solution in which they were made.',
      chk: 'electrophoresis-mcq',
    }),
    sl('concept', 'Coagulation and the Hardy–Schulze rule', {
      b: '**Coagulation** (flocculation) is the settling of a sol when its charge is neutralised. It is caused by electrophoresis, by mixing two oppositely charged sols, by boiling, or by adding an **electrolyte**. **Hardy–Schulze rule:** the ion carrying charge **opposite** to the sol causes coagulation, and the **higher its charge, the greater its coagulating power**. The minimum concentration (millimoles per litre) of electrolyte needed to coagulate a sol in two hours is its **coagulation value**: the smaller the value, the greater the power.',
      v: table(['Sol', 'Coagulating ion', 'Order of coagulating power'], [['Negative (As₂S₃)', 'Cations', 'Al³⁺ > Ba²⁺ > Na⁺'], ['Positive (Fe(OH)₃)', 'Anions', '[Fe(CN)₆]⁴⁻ > PO₄³⁻ > SO₄²⁻ > Cl⁻']], 'Table of the Hardy–Schulze order of coagulating power for negative and positive sols'),
      n: 'A sol stays dispersed only while its particles repel each other. Add an electrolyte, and ions of the opposite charge neutralise the particles, which then clump together and settle. This is coagulation. The Hardy and Schulze rule says that the ion with the opposite charge does the work, and the higher its charge, the more powerful it is. So aluminium ions coagulate a negative sol far better than sodium ions.',
    }),
    sl('example', 'Worked example: comparing coagulating power', {
      b: r`**Problem.** (a) Which of NaCl, BaCl₂ and AlCl₃ coagulates a negatively charged arsenious sulfide sol most effectively? (b) Arrange Na₂SO₄, Na₃PO₄ and NaCl in decreasing coagulating power for a positively charged ferric hydroxide sol.

**(a)** The cations act: Al³⁺ has the highest charge, so **AlCl₃** is most effective (smallest coagulation value).

**(b)** The anions act: PO₄³⁻ > SO₄²⁻ > Cl⁻, so **Na₃PO₄ > Na₂SO₄ > NaCl**.`,
      v: table(['Sol charge', 'Effective ion', 'Best of the three'], [['Negative', 'Cation', 'AlCl₃ (Al³⁺)'], ['Positive', 'Anion', 'Na₃PO₄ (PO₄³⁻)']], 'Table of the effective ions and best coagulants for the two sols'),
      n: 'First decide which ion matters: it is the one with the charge opposite to the sol. For a negative sol, look at the cations, and the aluminium ion with three positive charges wins. For a positive sol, look at the anions, and phosphate with three negative charges is most powerful, followed by sulfate and then chloride. The sodium ions in these salts do not matter for a positive sol.',
    }),
    sl('concept', 'Protecting lyophobic sols', {
      b: 'A **lyophilic** colloid added to a lyophobic sol forms a protective layer around its particles, so the sol is not easily coagulated. Such colloids are **protective colloids** (e.g. gelatin in ice cream, gum in ink).',
      v: table(['Protective colloid', 'Where used'], [['Gelatin', 'Ice cream (stops ice crystals and fat separating)'], ['Gum arabic', 'Ink'], ['Casein', 'Milk fat droplets'], ['Starch', 'Silver halide sols in photography']], 'Table of protective colloids and their uses'),
      n: 'Lyophobic sols are fragile, but they can be protected. If a lyophilic colloid such as gelatin or gum is added, it coats the particles with a solvated layer that shields them from electrolytes. That is why gelatin is added to ice cream, and gum to inks: they keep the fine particles from clumping together and settling out.',
    }),
    sl('concept', 'Emulsions', {
      b: 'An **emulsion** is a colloid of one liquid dispersed in another with which it does not mix. **Oil in water (O/W):** milk, vanishing cream. **Water in oil (W/O):** butter, cold cream. Emulsions separate unless an **emulsifying agent** is added: proteins and gums for O/W, long-chain alcohols and heavy-metal soaps for W/O. Soaps clean by emulsifying oily dirt into water.',
      v: table(['Type', 'Dispersed phase', 'Medium', 'Examples', 'Typical emulsifier'], [['O/W', 'Oil', 'Water', 'Milk, vanishing cream', 'Proteins, gums, soaps'], ['W/O', 'Water', 'Oil', 'Butter, cold cream', 'Long-chain alcohols, heavy-metal soaps']], 'Table of the two types of emulsion with examples and emulsifiers'),
      n: 'An emulsion is one liquid spread as droplets through another that it does not mix with. In milk, tiny fat droplets are spread through water, so milk is an oil-in-water emulsion. In butter it is the other way round: water droplets in fat. Left alone, most emulsions separate into layers, so an emulsifying agent, such as the protein casein in milk, is needed to keep the droplets apart.',
    }),
    sl('concept', 'Colloids around us', {
      b: 'Many natural and industrial processes involve colloids.',
      v: table(['Phenomenon or use', 'Colloid idea'], [['Blue sky', 'Scattering of light by dust and water droplets'], ['Delta at a river mouth', 'Clay sol coagulated by salts in sea water'], ['Alum stops bleeding from a cut', 'Al³⁺ coagulates the negatively charged blood colloid'], ['Cottrell precipitator in chimneys', 'Charged smoke particles neutralised at an electrode'], ['Rain from clouds', 'Charged droplets coagulate'], ['Purifying drinking water with alum', 'Coagulates suspended clay particles']], 'Table of everyday phenomena and uses explained by colloid chemistry'),
      n: 'Colloid chemistry explains many things around us. Where a river meets the sea, the salts in sea water coagulate clay particles carried by the river, building a delta. Alum stops bleeding from a small cut by coagulating blood. Cottrell precipitators in factory chimneys remove smoke by neutralising the charged particles on an electrode. And alum added to muddy water makes the clay settle, purifying it.',
    }),
    sl('check', 'Quick check: coagulation and emulsions', {
      b: 'Pick the most effective coagulant, or classify an emulsion.',
      n: 'Quick check. Apply the Hardy and Schulze rule: first find which ion matters, then compare charges.',
      chk: 'coagulate-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Particle size: true solution < 1 nm; colloid 1–1000 nm; suspension > 1000 nm.',
        'Eight types by phases: sol, gel, emulsion, foam, aerosol, solid sol, solid foam.',
        'Lyophilic (reversible, stable) vs lyophobic (irreversible, need charge); multimolecular, macromolecular and associated colloids.',
        'Tyndall effect; Brownian movement; charge by preferential adsorption; electrophoresis.',
        'Coagulation by electrolytes: Hardy–Schulze rule; protective colloids.',
        'Emulsions O/W and W/O with emulsifying agents.',
      ],
      v: table(['Property', 'Shows'], [['Tyndall effect', 'Heterogeneous nature, particle size'], ['Electrophoresis', 'Sign of charge'], ['Coagulation by electrolyte', 'Charge is what stabilises lyophobic sols']], 'Summary table of colloid properties and what each shows'),
      n: 'Let us sum up Part 2. Colloids have particles between one and a thousand nanometres across. They are classified by their phases and by how much the particles like the medium. Colloidal particles scatter light, show Brownian movement and carry charge, which keeps lyophobic sols stable. Electrolytes neutralise that charge and cause coagulation, more strongly for highly charged ions. Emulsions are liquid-in-liquid colloids held together by emulsifiers.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Give particle-size ranges with units (nm).',
        'For Hardy–Schulze questions, first identify the ion with charge opposite to the sol.',
        'Smaller coagulation value = greater coagulating power.',
        'Milk is O/W; butter is W/O.',
      ],
      v: table(['Slip', 'Fix'], [['Na⁺ is best for coagulating a positive sol', 'Anions coagulate positive sols'], ['Lyophilic sols are irreversible', 'They are reversible'], ['Fog is a foam', 'Fog is an aerosol (liquid in gas)']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Final tips. Always state particle sizes in nanometres. In coagulation questions, decide first which ion counts, then compare charges, and remember that a smaller coagulation value means a more powerful coagulant. Learn the phase names: fog is an aerosol and lather is a foam. Milk is oil in water, and butter is water in oil.',
    }),
  ],
});
