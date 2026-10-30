// ch11 Surface Chemistry — question bank. MCQ keys are placed by the builder (balanced); AR keys planned: a c b a c d.
// Every numerical is re-solved by the check function passed to add().
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);

// ---------------------------------------------------------------- t01 adsorption
add('chemisorption-mcq', mcq({
  stem: 'Which property belongs to chemisorption but not to physisorption?',
  right: 'It forms only a single layer of adsorbate',
  wrong: ['It is caused by van der Waals forces', 'It decreases steadily as temperature rises', 'It is easily reversed by lowering the pressure'],
  sol: 'Chemical bonds form with surface atoms, so only one layer can be held — option (@K). The other three describe physisorption.',
  d: 2, c: 'understanding', t: [1],
}));
add('freundlich-mcq', mcq({
  stem: r`In a Freundlich plot of $\log (x/m)$ against $\log p$, the slope of the straight line equals:`,
  right: '1/n',
  wrong: ['n', 'log k', 'k'],
  sol: r`$\log (x/m) = \log k + (1/n)\log p$, so the slope is $1/n$ — option (@K); $\log k$ is the intercept (@2).`,
  d: 2, c: 'understanding', t: [1],
}));
add('gas-order-mcq', mcq({
  stem: 'Equal volumes of four gases are passed over the same mass of activated charcoal at room temperature. Which gas is adsorbed most?',
  right: 'SO₂ (critical temperature 430 K)',
  wrong: ['H₂ (critical temperature 33 K)', 'CH₄ (critical temperature 190 K)', 'CO₂ (critical temperature 304 K)'],
  sol: 'The most easily liquefied gas, with the highest critical temperature, has the strongest van der Waals attraction and is physisorbed most — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('absorption-mcq', mcq({
  stem: 'Which of these is an example of absorption rather than adsorption?',
  right: 'Water vapour taken up by anhydrous calcium chloride',
  wrong: ['Water vapour taken up by silica gel', 'A dye taken up on the surface of charcoal', 'Hydrogen held on the surface of finely divided nickel'],
  sol: 'CaCl₂ takes water into its bulk (forming a hydrate) — option (@K). The others are surface processes.',
  d: 1, c: 'understanding', t: [1],
}));
add('enthalpy-mcq', mcq({
  stem: 'During adsorption of a gas on a solid, which statement about the changes in enthalpy (ΔH) and entropy (ΔS) is correct?',
  right: 'ΔH is negative and ΔS is negative',
  wrong: ['ΔH is positive and ΔS is negative', 'ΔH is negative and ΔS is positive', 'ΔH is positive and ΔS is positive'],
  sol: 'Attractions form (heat released) and the gas loses freedom on the surface — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('temp-mcq', mcq({
  stem: 'A gas is adsorbed on a metal. The extent of adsorption increases when the temperature is raised from 300 K to 450 K. The adsorption is most likely:',
  right: 'chemisorption, which needs activation energy',
  wrong: ['physisorption, which is endothermic', 'physisorption, which always increases with temperature', 'absorption into the bulk of the metal'],
  sol: 'Physisorption falls with temperature; an increase on warming shows an activated process, chemisorption — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('pressure-mcq', mcq({
  stem: 'At constant temperature, as the pressure of a gas over an adsorbent is increased to high values, the extent of adsorption x/m:',
  right: 'increases and then levels off towards a limiting value',
  wrong: ['increases in direct proportion to pressure without limit', 'decreases steadily', 'stays constant at all pressures'],
  sol: 'More pressure pushes more gas onto the surface until it is nearly saturated — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('surface-mcq', mcq({
  stem: 'One gram of charcoal is used as a single lump, and another gram is ground into a fine powder. The powder adsorbs much more gas because:',
  right: 'its surface area is much larger',
  wrong: ['its mass is larger', 'grinding makes the adsorption endothermic', 'powdered charcoal forms chemical bonds with every gas'],
  sol: 'Adsorption is a surface phenomenon, so more surface per gram means more adsorption — option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('catalysis-mcq', mcq({
  stem: 'In the hardening of vegetable oils, hydrogen is passed through hot oil containing finely divided nickel. The role of adsorption here is that:',
  right: 'hydrogen and oil molecules are adsorbed on the nickel surface, where they react more easily',
  wrong: ['nickel absorbs all the oil into its bulk', 'nickel adsorbs water and removes it from the oil', 'adsorption raises the activation energy of the reaction'],
  sol: 'In heterogeneous catalysis, reactants are adsorbed on the catalyst surface, which weakens bonds and brings them together — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('ads-tf', tf({
  stem: 'Physisorption of a gas on charcoal increases when the temperature is raised.',
  key: 'f',
  sol: 'False. Physisorption is exothermic, so by Le Chatelier’s principle it decreases as temperature rises.',
  d: 1, c: 'understanding', t: [1],
}));
add('adsorbate-fill', fill({
  stem: 'The substance that accumulates on a surface during adsorption is called the ___.',
  acc: [['adsorbate']],
  sol: 'The **adsorbate**; the surface is the adsorbent.',
  d: 1, c: 'recall', t: [1],
}));
add('use-match', match({
  stem: 'Match each application with the adsorbent used.',
  pairs: [
    ['Gas masks', 'Activated charcoal'],
    ['Keeping medicines dry', 'Silica gel'],
    ['Haber process for ammonia', 'Finely divided iron'],
    ['Hydrogenation of oils', 'Finely divided nickel'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Gas mask → charcoal; drying → silica gel; Haber → iron; hydrogenation → nickel.',
  d: 1, c: 'recall', t: [1],
}));
add('chemisorption-ar', ar({
  a: 'Chemisorption is highly specific.',
  r: 'Chemisorption takes place only if chemical bonds can form between the adsorbate and the adsorbent.',
  key: 'a',
  sol: 'Both are true, and the need to form bonds explains the specificity (e.g. O₂ chemisorbs on metals but not on noble gases) — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('temp-ar', ar({
  a: 'Physisorption decreases with increase in temperature.',
  r: 'Physisorption is an endothermic process.',
  key: 'c',
  sol: 'A is true; R is false — physisorption is exothermic, which is why heating reduces it — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('gas-ar', ar({
  a: 'Ammonia is adsorbed on charcoal much more than hydrogen at room temperature.',
  r: 'Hydrogen molecules are smaller than ammonia molecules.',
  key: 'b',
  sol: 'Both are true, but size is not the reason: ammonia has a much higher critical temperature (stronger van der Waals forces) — option (b).',
  d: 3, c: 'analysis', t: [1],
}));
add('freundlich-num', num({
  marks: 2,
  stem: r`For the adsorption of a gas on charcoal at 300 K, a plot of $\log (x/m)$ against $\log p$ is a straight line with slope $0.25$ and intercept $0.48$. Using $k = 10^{0.48} = 3.0$, find $x/m$, in g of gas per g of charcoal, at $p = 16\ \text{bar}$.`,
  value: 6, tol: 0.05, unit: 'g/g',
  sol: r`$1/n = 0.25$ and $k = 3.0$. $x/m = k\,p^{1/n} = 3.0 \times 16^{0.25} = 3.0 \times 2 = 6$, so $6.0$ g per g.`,
  scheme: [['k = 3.0 and 1/n = 0.25', 1], ['x/m = 6.0', 1]],
  d: 3, c: 'application', t: [1],
}), () => near(3.0 * Math.pow(16, 0.25), 6) || 'freundlich');
add('n-num', num({
  stem: r`The Freundlich plot for adsorption of a gas has a slope of $0.40$. What is the value of $n$?`,
  value: 2.5, tol: 0.01, unit: null,
  sol: r`Slope $= 1/n = 0.40$, so $n = 1 \div 0.40 = 2.5$.`,
  scheme: [['n = 2.5', 1]],
  d: 2, c: 'application', t: [1],
}), () => near(1 / 0.4, 2.5) || 'n');
add('acid-num', num({
  marks: 2,
  stem: r`$100\ \text{mL}$ of $0.60\ \text{M}$ ethanoic acid ($M = 60$) is shaken with $3.0\ \text{g}$ of activated charcoal. After filtering, the acid concentration is $0.45\ \text{M}$. What mass of acid, in grams, is adsorbed per gram of charcoal?`,
  value: 0.3, tol: 0.005, unit: 'g/g',
  sol: r`Fall $= 0.60 - 0.45 = 0.15\ \text{M}$; moles adsorbed $= 0.15 \times 0.100 = 0.015$; mass $= 0.015 \times 60 = 0.90\ \text{g}$; per gram $= 0.90 \div 3.0 = 0.30$, so $0.30$ g per g.`,
  scheme: [['0.015 mol (0.90 g) adsorbed', 1], ['0.30 g per g', 1]],
  d: 3, c: 'application', t: [1],
}), () => near(((0.6 - 0.45) * 0.1 * 60) / 3, 0.3) || 'acid');
add('ratio-num', num({
  stem: r`For a gas obeying the Freundlich isotherm with $1/n = 0.5$, by what factor does $x/m$ increase when the pressure is increased from $2$ bar to $8$ bar at constant temperature?`,
  value: 2, tol: 0.01, unit: null,
  sol: r`Ratio $= (8/2)^{0.5} = 4^{0.5} = 2$.`,
  scheme: [['Factor 2', 1]],
  d: 3, c: 'application', t: [1],
}), () => near(Math.pow(8 / 2, 0.5), 2) || 'ratio');
add('ads-short', short({
  marks: 2,
  stem: 'Explain why adsorption is always exothermic, and why it stops increasing after some time even though gas is still present.',
  model: 'Surface particles have unbalanced attractive forces; when gas molecules are adsorbed, attractions form and energy is released as heat, so adsorption is exothermic. As the surface fills, less heat is released per molecule while the entropy loss continues; when ΔH becomes equal to TΔS, ΔG becomes zero and equilibrium is reached.',
  sol: 'Residual forces satisfied; equilibrium when ΔH = TΔS.',
  scheme: [['Residual surface forces satisfied, heat released', 1], ['Equilibrium when ΔH = TΔS (ΔG = 0)', 1]],
  d: 3, c: 'understanding', t: [1],
}));
add('compare-short3', short({
  marks: 3,
  stem: 'Give three differences between physisorption and chemisorption.',
  model: 'Physisorption is caused by weak van der Waals forces, while chemisorption involves the formation of chemical bonds between adsorbate and surface. The enthalpy of physisorption is low (about 20–40 kJ mol⁻¹), while that of chemisorption is high (about 80–240 kJ mol⁻¹). Physisorption is reversible, non-specific and forms several layers, while chemisorption is usually irreversible, specific and forms a single layer.',
  sol: 'Forces, enthalpy, reversibility/specificity/layers.',
  scheme: [['Forces', 1], ['Enthalpy', 1], ['Reversibility, specificity or layers', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('lab-short', short({
  marks: 2,
  stem: 'A student wants to show that charcoal adsorbs ethanoic acid from solution. Describe what she should do and what result she should expect.',
  model: 'She should titrate a known volume of ethanoic acid solution with standard NaOH, shake an equal volume of the same solution with a weighed amount of activated charcoal, filter, and titrate the filtrate in the same way. The filtrate needs less alkali, showing that the acid concentration has fallen because acid was adsorbed on the charcoal.',
  sol: 'Titrate before and after shaking with charcoal.',
  scheme: [['Titration before and after shaking with charcoal', 1], ['Smaller titre after, showing adsorption', 1]],
  d: 3, c: 'application', t: [1],
}));
add('vacuum-short', short({
  marks: 2,
  stem: 'Explain why (a) a small packet of silica gel is kept in a new camera bag, and (b) a gas is adsorbed more on charcoal cooled with liquid nitrogen than at room temperature.',
  model: '(a) Silica gel has a very large surface area and adsorbs water vapour, keeping the air in the bag dry so the camera does not get damp or mouldy. (b) Physisorption is exothermic, so cooling shifts the equilibrium towards adsorption and more gas is held.',
  sol: 'Moisture adsorption; exothermic physisorption favoured at low temperature.',
  scheme: [['(a) Adsorbs moisture', 1], ['(b) Exothermic, favoured by cooling', 1]],
  d: 2, c: 'application', t: [1],
}));
add('factors-short3', short({
  marks: 3,
  stem: 'Hydrogen and sulfur dioxide are each passed over powdered charcoal at room temperature, first at 1 bar and then at 5 bar. Predict which gas is adsorbed more and how raising the pressure affects each, giving reasons. How would warming the charcoal change the results?',
  model: 'Sulfur dioxide is adsorbed far more, because it is easily liquefied (high critical temperature) and so has much stronger van der Waals attractions to the charcoal than hydrogen. Raising the pressure from 1 to 5 bar increases the amount of each gas adsorbed, though not in direct proportion, as described by the Freundlich isotherm. Warming the charcoal decreases the adsorption of both gases, because physisorption is exothermic.',
  sol: 'SO₂ more (critical temperature); more with pressure; less on warming.',
  scheme: [['SO₂ more, with reason', 1], ['Pressure increases adsorption (not linearly)', 1], ['Warming decreases physisorption', 1]],
  d: 3, c: 'application', t: [1],
}));
add('ads-long', long({
  stem: '(a) Distinguish between adsorption and absorption with an example of each.\n\n(b) Explain, using ΔH and ΔS, why adsorption is spontaneous at first and then reaches equilibrium.\n\n(c) State the Freundlich adsorption isotherm and explain how its constants can be found from experimental data.',
  model: 'In adsorption a substance collects only at the surface, for example water vapour on silica gel; in absorption it spreads uniformly through the bulk, as water vapour in anhydrous calcium chloride. Adsorption releases heat, so ΔH is negative, but the adsorbed molecules lose freedom, so ΔS is negative. ΔG = ΔH − TΔS is negative while |ΔH| exceeds T|ΔS|, so adsorption is spontaneous at first. As the surface fills, |ΔH| falls; when ΔH = TΔS, ΔG = 0 and equilibrium is reached. Freundlich proposed x/m = k p^(1/n), with n greater than 1, at constant temperature. Taking logarithms, log(x/m) = log k + (1/n) log p. Plotting log(x/m) against log p gives a straight line whose slope is 1/n and whose intercept is log k.',
  sol: 'Definitions; ΔH, ΔS, ΔG; Freundlich and log plot.',
  scheme: [['(a) Distinction with examples', 1], ['(b) Signs of ΔH and ΔS and spontaneity', 1], ['(b) Equilibrium when ΔH = TΔS', 1], ['(c) Equation and linear form', 1], ['(c) Slope and intercept', 1]],
  d: 3, c: 'understanding', t: [1],
}));
add('types-long', long({
  stem: '(a) Compare physisorption and chemisorption under four headings.\n\n(b) Sketch and explain how the extent of each varies with temperature.\n\n(c) Explain the role of adsorption in heterogeneous catalysis with one example.',
  model: 'Physisorption involves van der Waals forces, has a low enthalpy (20–40 kJ mol⁻¹), is reversible and non-specific, and forms multimolecular layers. Chemisorption involves chemical bonds, has a high enthalpy (80–240 kJ mol⁻¹), is usually irreversible and specific, and forms one layer. The extent of physisorption falls steadily with rising temperature because it is exothermic. Chemisorption needs activation energy, so its extent first rises with temperature to a maximum and then falls. In heterogeneous catalysis, reactant molecules are adsorbed on the catalyst surface, which raises their concentration there and weakens their bonds, lowering the activation energy. For example, in the Haber process nitrogen and hydrogen are adsorbed on iron, react, and ammonia desorbs.',
  sol: 'Comparison; temperature graphs; catalysis.',
  scheme: [['(a) Four differences', 2], ['(b) Physisorption curve and reason', 0.5], ['(b) Chemisorption curve and reason', 1], ['(c) Role and example', 1.5]],
  d: 3, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 colloids
add('colloid-type-mcq', mcq({
  stem: 'Fog is a colloid in which:',
  right: 'liquid droplets are dispersed in a gas (an aerosol)',
  wrong: ['gas bubbles are dispersed in a liquid (a foam)', 'a liquid is dispersed in a solid (a gel)', 'solid particles are dispersed in a liquid (a sol)'],
  sol: 'Fog is water droplets in air — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('electrophoresis-mcq', mcq({
  stem: 'A ferric hydroxide sol is made by adding ferric chloride to boiling water. When an electric field is applied, the sol particles move towards:',
  right: 'the cathode, because they adsorb Fe³⁺ ions and are positively charged',
  wrong: ['the anode, because they adsorb Cl⁻ ions and are negatively charged', 'neither electrode, because colloidal particles are neutral', 'both electrodes equally, because of Brownian movement'],
  sol: 'The particles preferentially adsorb Fe³⁺ (an ion common to them), so they are positive and move to the negative electrode — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('coagulate-mcq', mcq({
  stem: 'Which electrolyte coagulates a negatively charged arsenious sulfide sol most effectively?',
  right: 'AlCl₃',
  wrong: ['NaCl', 'BaCl₂', 'Na₃PO₄'],
  sol: 'For a negative sol the cation acts; Al³⁺ has the highest charge (Hardy–Schulze rule) — option (@K). Na₃PO₄ supplies only Na⁺ as cation (@3).',
  d: 2, c: 'application', t: [2],
}));
add('size-mcq', mcq({
  stem: 'A mixture passes through filter paper but not through a parchment membrane, does not settle on standing, and shows the Tyndall effect. Its particles are most likely in the size range:',
  right: '1 nm to 1000 nm',
  wrong: ['less than 1 nm', 'greater than 1000 nm', 'exactly 1 nm'],
  sol: 'These are the properties of a colloid — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('lyophilic-mcq', mcq({
  stem: 'Which of these forms a lyophilic sol in water?',
  right: 'Starch',
  wrong: ['Gold', 'Arsenious sulfide', 'Ferric hydroxide'],
  sol: 'Starch has a strong affinity for water and forms a sol on warming — option (@K). The others form lyophobic sols.',
  d: 1, c: 'recall', t: [2],
}));
add('emulsion-mcq', mcq({
  stem: 'Butter is an example of:',
  right: 'a water-in-oil emulsion',
  wrong: ['an oil-in-water emulsion', 'a foam', 'an aerosol'],
  sol: 'In butter, water droplets are dispersed in fat — option (@K). Milk is oil-in-water (@1).',
  d: 1, c: 'recall', t: [2],
}));
add('tyndall-mcq', mcq({
  stem: 'Headlight beams are clearly visible on a foggy night but hardly visible on a clear night. This is because:',
  right: 'fog droplets of colloidal size scatter the light (Tyndall effect)',
  wrong: ['fog absorbs all the light', 'light travels faster through fog', 'air molecules on a clear night are larger than fog droplets'],
  sol: 'Colloidal droplets scatter light, making the beam path visible — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('positive-mcq', mcq({
  stem: 'Which sol is positively charged?',
  right: 'Methylene blue sol',
  wrong: ['Gold sol', 'Starch sol', 'Arsenious sulfide sol'],
  sol: 'Basic dyes such as methylene blue, and hydrated metal oxides, form positive sols — option (@K).',
  d: 2, c: 'recall', t: [2],
}));
add('anion-mcq', mcq({
  stem: 'Which anion has the greatest coagulating power for a positively charged ferric hydroxide sol?',
  right: '[Fe(CN)₆]⁴⁻',
  wrong: ['PO₄³⁻', 'SO₄²⁻', 'Cl⁻'],
  sol: 'For a positive sol the anion acts; the highest charge, 4−, is most powerful — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('alum-mcq', mcq({
  stem: 'A barber rubs a block of alum on a small cut to stop the bleeding. Alum works because:',
  right: 'Al³⁺ ions coagulate the negatively charged colloidal particles in blood',
  wrong: ['alum adsorbs all the water in blood', 'sulfate ions coagulate positively charged blood particles', 'alum forms an emulsion with blood'],
  sol: 'Blood is a negatively charged colloid; the highly charged Al³⁺ ion coagulates it — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('delta-mcq', mcq({
  stem: 'Deltas form where rivers meet the sea. The best explanation is that:',
  right: 'salts in sea water coagulate the charged clay particles carried by the river',
  wrong: ['sea water is denser, so clay floats on it', 'clay particles dissolve in sea water', 'tides push sand upstream'],
  sol: 'River water carries a clay sol; electrolytes in sea water neutralise its charge and it settles — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('dialysis-mcq', mcq({
  stem: 'A freshly prepared ferric hydroxide sol contains excess HCl. The best way to remove it is:',
  right: 'dialysis through a cellophane bag placed in running water',
  wrong: ['filtering through ordinary filter paper', 'adding a little NaCl', 'boiling until the sol coagulates'],
  sol: 'Small ions pass through the membrane but colloidal particles do not — option (@K). Filter paper lets both through (@1); electrolyte or boiling would coagulate the sol.',
  d: 2, c: 'application', t: [2],
}));
add('micelle-tf', tf({
  stem: 'Soap forms micelles in water at all concentrations and temperatures.',
  key: 'f',
  sol: 'False. Micelles form only above the critical micelle concentration (CMC) and above the Kraft temperature.',
  d: 2, c: 'understanding', t: [2],
}));
add('lyophobic-tf', tf({
  stem: 'A lyophobic sol, once coagulated and dried, re-forms a sol simply on adding the dispersion medium.',
  key: 'f',
  sol: 'False. Lyophobic sols are irreversible; it is lyophilic sols that re-form on adding the medium.',
  d: 1, c: 'understanding', t: [2],
}));
add('tyndall-fill', fill({
  stem: 'A torch beam shone through a glass of diluted milk shows up as a bright path when seen from the side, but not through a glass of salt water. This is the ___ effect.',
  acc: [['Tyndall']],
  sol: 'The **Tyndall** effect: milk droplets are of colloidal size and scatter light; dissolved ions are too small.',
  d: 1, c: 'application', t: [2],
}));
add('peptisation-fill', fill({
  stem: 'Converting a freshly prepared precipitate into a colloidal sol by shaking it with a small amount of an electrolyte is called ___.',
  acc: [['peptisation', 'peptization']],
  sol: '**Peptisation**.',
  d: 1, c: 'recall', t: [2],
}));
add('type-match', match({
  stem: 'Match each everyday material with its type of colloid.',
  pairs: [
    ['Soap lather', 'Foam'],
    ['Cheese', 'Gel'],
    ['Smoke', 'Aerosol (solid in gas)'],
    ['Pumice stone', 'Solid foam'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Lather → foam; cheese → gel; smoke → aerosol; pumice → solid foam.',
  d: 2, c: 'understanding', t: [2],
}));
add('property-match', match({
  stem: 'Match each observation with the property of colloids it illustrates.',
  pairs: [
    ['Sunbeam visible in a dusty room', 'Tyndall effect'],
    ['Particles seen jiggling under a microscope', 'Brownian movement'],
    ['Sol particles drifting to an electrode', 'Electrophoresis'],
    ['Clay settling where a river meets the sea', 'Coagulation'],
  ],
  order: [2, 3, 1, 0],
  sol: 'Sunbeam → Tyndall; jiggling → Brownian; drifting → electrophoresis; delta → coagulation.',
  d: 1, c: 'application', t: [2],
}));
add('stability-ar', ar({
  a: 'A lyophobic sol is coagulated by adding a small amount of electrolyte.',
  r: 'The ions of opposite charge neutralise the charge on the colloidal particles, which then aggregate.',
  key: 'a',
  sol: 'Both are true and R explains A — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('brownian-ar', ar({
  a: 'Brownian movement helps keep colloidal particles from settling.',
  r: 'Colloidal particles are too heavy to be moved by molecules of the dispersion medium.',
  key: 'c',
  sol: 'A is true; R is false — the particles are small enough to be knocked about by unequal bombardment from medium molecules — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('nacl-ar', ar({
  a: 'NaCl coagulates a positively charged ferric hydroxide sol more effectively than Na₂SO₄.',
  r: 'For a positively charged sol, the coagulating power of an anion increases with the magnitude of its charge.',
  key: 'd',
  sol: 'A is false: SO₄²⁻ (charge 2−) is a stronger coagulant than Cl⁻ for a positive sol, which is exactly what R (a true statement of the Hardy–Schulze rule) predicts — option (d).',
  d: 3, c: 'analysis', t: [2],
}));
add('coagvalue-num', num({
  stem: 'A sol needs 52 mmol L⁻¹ of NaCl but only 0.65 mmol L⁻¹ of BaCl₂ for coagulation. How many times greater is the coagulating power of BaCl₂ than that of NaCl? (Coagulating power is inversely proportional to coagulation value.)',
  value: 80, tol: 0.5, unit: null,
  sol: r`Ratio $= 52 \div 0.65 = 80$.`,
  scheme: [['80 times', 1]],
  d: 2, c: 'application', t: [2],
}), () => near(52 / 0.65, 80) || 'coag');
add('sizeconv-num', num({
  stem: 'A colloidal gold particle has a diameter of 2.5 × 10⁻⁸ m. What is its diameter in nanometres?',
  value: 25, tol: 0.1, unit: 'nm',
  sol: r`$1\ \text{nm} = 10^{-9}\ \text{m}$; diameter $= 2.5 \times 10^{-8} \div 10^{-9} = 25$, so $25\ \text{nm}$ (within the colloidal range).`,
  scheme: [['25 nm', 1]],
  d: 1, c: 'application', t: [2],
}), () => near(2.5e-8 / 1e-9, 25) || 'size');
add('lyo-short', short({
  marks: 2,
  stem: 'Give two differences between lyophilic and lyophobic sols, with one example of each.',
  model: 'Lyophilic sols, such as starch in water, have strong affinity between particles and medium, form simply by mixing, and are reversible and stable. Lyophobic sols, such as gold or arsenious sulfide in water, have little affinity, need special methods to prepare, are irreversible, and are coagulated by small amounts of electrolyte.',
  sol: 'Affinity, preparation, reversibility, stability; examples.',
  scheme: [['Two differences', 1], ['One example of each', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('emulsion-short', short({
  marks: 2,
  stem: 'Oil and vinegar salad dressing separates on standing, but mayonnaise, which also contains egg yolk, does not. Explain, and say what type of emulsion mayonnaise is.',
  model: 'Oil and vinegar are immiscible, so droplets formed by shaking soon join up and the layers separate. Egg yolk contains proteins and lecithin that act as an emulsifying agent, forming a film around the oil droplets and keeping them apart. Mayonnaise is an oil-in-water emulsion.',
  sol: 'Emulsifier from egg yolk; O/W.',
  scheme: [['Egg yolk acts as an emulsifying agent', 1], ['Oil-in-water emulsion', 1]],
  d: 3, c: 'application', t: [2],
}));
add('charge-short', short({
  marks: 2,
  stem: 'Explain how a ferric hydroxide sol acquires a positive charge and why this charge keeps the sol stable.',
  model: 'When FeCl₃ is hydrolysed in hot water, the hydrated ferric oxide particles preferentially adsorb Fe³⁺ ions, which are common to them, so they become positively charged and are surrounded by a layer of Cl⁻ ions. Since every particle carries the same positive charge, the particles repel one another and cannot come together to form larger particles that would settle.',
  sol: 'Preferential adsorption of Fe³⁺; mutual repulsion.',
  scheme: [['Preferential adsorption of Fe³⁺', 1], ['Like charges repel, preventing aggregation', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('water-short', short({
  marks: 2,
  stem: 'In a village, muddy river water is purified by stirring in a little potash alum and leaving it to stand. Explain the chemistry.',
  model: 'The fine clay particles in muddy water form a negatively charged colloid that does not settle. Alum supplies Al³⁺ ions, whose high positive charge neutralises the charge on the clay particles (Hardy–Schulze rule). The neutral particles aggregate and settle, leaving clearer water above.',
  sol: 'Al³⁺ coagulates negative clay sol.',
  scheme: [['Clay is a negatively charged colloid', 1], ['Al³⁺ neutralises charge; particles coagulate and settle', 1]],
  d: 2, c: 'application', t: [2],
}));
add('compare-short3b', short({
  marks: 3,
  stem: 'Three liquids are tested: salt water, starch solution and muddy water. Predict, with reasons, how each behaves (a) when filtered through filter paper, (b) on standing for a day, and (c) when a narrow beam of light is passed through it.',
  model: 'Salt water is a true solution with particles smaller than 1 nm: it passes through filter paper, does not settle and shows no Tyndall effect. Starch solution is a colloid with particles of 1–1000 nm: it passes through filter paper, does not settle, but scatters light so the beam is visible. Muddy water is a suspension with particles larger than 1000 nm: the mud is held back by filter paper and settles on standing; the cloudy liquid also scatters light.',
  sol: 'True solution, colloid, suspension.',
  scheme: [['Salt water: three behaviours', 1], ['Starch: three behaviours', 1], ['Muddy water: three behaviours', 1]],
  d: 3, c: 'application', t: [2],
}));
add('hardy-short3', short({
  marks: 3,
  stem: 'State the Hardy–Schulze rule. Arrange (a) NaCl, AlCl₃, MgCl₂ for coagulating an arsenious sulfide sol and (b) KCl, K₂SO₄, K₃[Fe(CN)₆] for coagulating a ferric hydroxide sol, in decreasing order of coagulating power.',
  model: 'Hardy–Schulze rule: the ion carrying a charge opposite to that of the sol particles causes coagulation, and the greater the charge on that ion, the greater its coagulating power. (a) Arsenious sulfide is a negative sol, so cations act: AlCl₃ > MgCl₂ > NaCl. (b) Ferric hydroxide is a positive sol, so anions act: K₃[Fe(CN)₆] > K₂SO₄ > KCl.',
  sol: 'Rule; cations for negative sol; anions for positive sol.',
  scheme: [['Statement of the rule', 1], ['(a) Order', 1], ['(b) Order', 1]],
  d: 3, c: 'application', t: [2],
}));
add('colloid-long', long({
  stem: '(a) Distinguish between true solutions, colloids and suspensions on the basis of particle size and two other properties.\n\n(b) Classify colloids on the basis of the physical state of the phases, giving four examples.\n\n(c) What are associated colloids? Explain the formation of micelles.',
  model: 'In a true solution particles are smaller than 1 nm, in a colloid 1–1000 nm, and in a suspension larger than 1000 nm. True solutions and colloids pass through filter paper, but suspensions do not; colloids and suspensions scatter light, but true solutions do not; suspensions settle on standing. A colloid has a dispersed phase in a dispersion medium: solid in liquid gives a sol (paint), liquid in gas an aerosol (fog), liquid in liquid an emulsion (milk), and gas in liquid a foam (lather). Associated colloids behave as normal electrolytes at low concentration but form aggregated particles at higher concentration. Soap anions, RCOO⁻, have a long non-polar tail and a polar head. Above the critical micelle concentration and Kraft temperature, they cluster with tails inward and heads outward, forming spherical micelles of colloidal size.',
  sol: 'Size and properties; phases with examples; micelles.',
  scheme: [['(a) Sizes and two properties', 2], ['(b) Four types with examples', 1.5], ['(c) Associated colloids and micelles', 1.5]],
  d: 3, c: 'understanding', t: [2],
}));
add('props-long', long({
  stem: '(a) Explain the Tyndall effect and Brownian movement.\n\n(b) How do colloidal particles acquire charge? How is the sign of the charge found?\n\n(c) What is coagulation? Give three ways of coagulating a lyophobic sol and explain how lyophilic colloids protect lyophobic sols.',
  model: 'When light passes through a sol, colloidal particles scatter it, so the path of the beam is visible from the side; this is the Tyndall effect. Under a microscope, colloidal particles move in zigzag paths because molecules of the medium strike them unequally; this is Brownian movement. Particles acquire charge mainly by preferential adsorption of ions common to them, such as Fe³⁺ on ferric hydroxide. In electrophoresis, the sol is placed in an electric field; the direction in which the particles move shows their charge. Coagulation is the aggregation and settling of colloidal particles when their charge is neutralised. It can be caused by adding electrolytes, by electrophoresis, by mixing oppositely charged sols, or by boiling. A lyophilic colloid forms a protective solvated layer around the lyophobic particles, preventing their coagulation.',
  sol: 'Tyndall, Brownian; charge and electrophoresis; coagulation and protection.',
  scheme: [['(a) Tyndall effect and Brownian movement', 1.5], ['(b) Origin and detection of charge', 1.5], ['(c) Coagulation, three methods, protection', 2]],
  d: 3, c: 'understanding', t: [2],
}));
add('uses-long', long({
  stem: 'Use ideas from colloid chemistry to explain: (a) the formation of a delta at a river mouth; (b) how a Cottrell precipitator cleans chimney smoke; (c) why the sky appears blue; (d) how soap removes oily dirt from cloth; (e) why gelatin is added when making ice cream.',
  model: '(a) River water carries negatively charged colloidal clay; electrolytes in sea water neutralise the charge, so the clay coagulates and settles, building a delta. (b) Smoke contains charged carbon particles; in the precipitator they pass between highly charged electrodes, lose their charge, coagulate and fall, while clean gas escapes. (c) Dust and water droplets of colloidal size in the air scatter blue light more than red, so scattered light from the sky looks blue. (d) Soap anions form micelles: their hydrocarbon tails dissolve in the grease and their charged heads face the water, so oily dirt is emulsified and washed away. (e) Gelatin is a protective lyophilic colloid; it coats fine particles and stops ice crystals and fat separating, keeping ice cream smooth.',
  sol: 'Five applications.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1], ['(d)', 1], ['(e)', 1]],
  d: 3, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- case-based
add('charcoal-case', mk.case({
  passage: 'A water-treatment start-up in Pune tests activated charcoal for removing a dye from wastewater. In each trial, 100 mL of dye solution is shaken with 1.0 g of charcoal for 30 minutes at 300 K, filtered, and the remaining dye measured. Results: starting concentration 0.50 g L⁻¹, final concentration 0.10 g L⁻¹. When the trial is repeated at 330 K, the final concentration is 0.22 g L⁻¹. When finely powdered charcoal is used at 300 K, the final concentration is 0.02 g L⁻¹.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Why is less dye removed at 330 K?',
      right: 'Adsorption is exothermic, so it decreases as temperature rises',
      wrong: ['Adsorption is endothermic', 'The charcoal dissolves at 330 K', 'The dye forms chemical bonds only at high temperature'],
      sol: 'Raising the temperature shifts the exothermic adsorption equilibrium back — option (@K).',
      d: 2, c: 'understanding', t: [1],
    })),
    part('b', num({
      stem: 'What mass of dye, in milligrams, is adsorbed per gram of charcoal in the first trial at 300 K?',
      value: 40, tol: 0.5, unit: 'mg/g',
      sol: r`Fall in concentration $= 0.50 - 0.10 = 0.40\ \text{g L}^{-1}$; in $0.100\ \text{L}$: $0.40 \times 0.100 = 0.040\ \text{g} = 40\ \text{mg}$; per gram $= 40 \div 1.0 = 40$, so 40 mg per g.`,
      scheme: [['40 mg per g', 1]],
      d: 2, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why the powdered charcoal removes much more dye, and suggest one other change that would remove more dye.',
      model: 'Powdering greatly increases the surface area per gram, and adsorption takes place only at the surface, so more dye is adsorbed. More dye could also be removed by using more charcoal, by working at a lower temperature, or by allowing more contact time.',
      sol: 'Surface area; more charcoal or lower temperature.',
      scheme: [['Larger surface area', 1], ['A valid further change', 1]],
      d: 2, c: 'application', t: [1],
    }), [
      short({
        marks: 2,
        stem: 'Is the dye most likely physisorbed or chemisorbed on charcoal? Give two pieces of evidence from the trials.',
        model: 'Physisorbed. Adsorption decreases when the temperature is raised from 300 K to 330 K, as expected for physisorption (chemisorption would increase at first), and charcoal is a non-specific adsorbent that holds many dyes by van der Waals forces; the amount depends strongly on surface area.',
        sol: 'Physisorption: falls on warming; non-specific.',
        scheme: [['Physisorption', 1], ['Evidence: decrease with temperature and non-specific surface adsorption', 1]],
        d: 3, c: 'analysis', t: [1],
      }),
    ]),
  ],
}), () => near((0.5 - 0.1) * 0.1 * 1000, 40) || 'charcoal');
add('river-case', mk.case({
  passage: 'Students from a school near the Hooghly river collect muddy water and leave it in a jar; after a day it is still cloudy. They shine a laser pointer through it and the beam is clearly visible from the side. In an electrophoresis tube, the fine clay particles move towards the positive electrode. Their teacher gives them three salts, NaCl, MgSO₄ and AlCl₃, and asks which will clear the water fastest.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'What is the charge on the clay particles?',
      right: 'Negative',
      wrong: ['Positive', 'Zero', 'Positive on some particles and negative on others'],
      sol: 'They move towards the positive electrode, so they are negatively charged — option (@K).',
      d: 1, c: 'application', t: [2],
    })),
    part('b', mcq({
      stem: 'Which salt will clear the water fastest?',
      right: 'AlCl₃',
      wrong: ['NaCl', 'MgSO₄', 'All three equally'],
      sol: 'For a negative colloid the cation acts; Al³⁺ has the highest charge — option (@K).',
      d: 2, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'What do the cloudiness after a day and the visible laser beam tell you about the size of the clay particles? Explain.',
      model: 'The particles do not settle in a day and they scatter light strongly, so most are of colloidal size, about 1–1000 nm: too small to settle under gravity (they show Brownian movement) but large enough to scatter light (Tyndall effect).',
      sol: 'Colloidal size: no settling, Tyndall effect.',
      scheme: [['Not settling: colloidal, Brownian movement', 1], ['Visible beam: Tyndall effect, 1–1000 nm', 1]],
      d: 2, c: 'application', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'Why is it better to add alum than common salt when purifying such water for drinking?',
        model: 'Alum provides Al³⁺, whose charge of +3 makes it many times more effective than Na⁺ at neutralising the negative clay particles, so a very small amount is needed and the water does not become salty. The coagulated particles settle quickly and can be removed.',
        sol: 'Higher charge, small amount, no saltiness.',
        scheme: [['Al³⁺ far more effective (Hardy–Schulze)', 1], ['Small quantity needed; water not made salty', 1]],
        d: 3, c: 'analysis', t: [2],
      }),
    ]),
  ],
}));
add('cream-case', mk.case({
  passage: 'A cosmetics workshop makes two creams. Cream P (a vanishing cream) feels light and washes off easily with water. Cream Q (a cold cream) feels greasy and does not wash off easily. A drop of each is placed on a glass slide with a drop of water: cream P mixes with the water, but cream Q does not. Both creams stay smooth for months because emulsifying agents are added.',
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Cream P is most likely:',
      right: 'an oil-in-water emulsion',
      wrong: ['a water-in-oil emulsion', 'a foam', 'a true solution'],
      sol: 'It mixes with water, so water is the continuous medium — option (@K).',
      d: 2, c: 'application', t: [2],
    })),
    part('b', mcq({
      stem: 'Which type of emulsifier suits cream Q?',
      right: 'A long-chain alcohol or heavy-metal soap',
      wrong: ['A protein such as casein', 'Gum arabic dissolved in water', 'Sodium chloride'],
      sol: 'W/O emulsions are stabilised by oil-soluble emulsifiers such as long-chain alcohols — option (@K).',
      d: 3, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain the role of the emulsifying agent and what would happen without it.',
      model: 'The emulsifying agent forms a thin film around the dispersed droplets, lowering the interfacial tension and stopping the droplets from joining. Without it, the droplets would gradually coalesce and the cream would separate into an oily layer and a watery layer.',
      sol: 'Film around droplets; separation without it.',
      scheme: [['Film around droplets prevents coalescence', 1], ['Without it, layers separate', 1]],
      d: 2, c: 'understanding', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'Suggest a simple test, other than mixing with water, to tell an O/W emulsion from a W/O emulsion, and the expected result.',
        model: 'Add a few drops of an oil-soluble dye, such as Sudan red: in a W/O emulsion the continuous oil phase is coloured throughout, while in an O/W emulsion only the droplets are coloured. Alternatively, test conductance: O/W conducts electricity because water is continuous; W/O hardly conducts.',
        sol: 'Dye test or conductance test.',
        scheme: [['A suitable test', 1], ['Correct expected results', 1]],
        d: 3, c: 'analysis', t: [2],
      }),
    ]),
  ],
}));
add('gas-case', mk.case({
  passage: 'A student studies the adsorption of nitrogen on a sample of silica at 77 K and records the mass adsorbed per gram (x/m) at different pressures. Plotting log(x/m) against log p gives a straight line of slope 0.50 and intercept −0.30. At a much higher temperature the adsorption becomes very small. In another experiment, hydrogen on nickel is adsorbed more at 400 K than at 200 K. (log 2 = 0.30)',
  d: 4, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'What is the value of n in the Freundlich equation for the nitrogen data?',
      right: '2',
      wrong: ['0.5', '0.3', '1'],
      sol: 'Slope = 1/n = 0.50, so n = 2 — option (@K).',
      d: 2, c: 'application', t: [1],
    })),
    part('b', num({
      stem: 'Using the intercept, what is the value of k?',
      value: 0.5, tol: 0.01, unit: null,
      sol: r`$\log k = -0.30$, so $k = 10^{-0.30} = 1 \div 2 = 0.5$.`,
      scheme: [['k = 0.5', 1]],
      d: 3, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why nitrogen adsorption on silica is small at high temperature, while hydrogen adsorption on nickel increases from 200 K to 400 K.',
      model: 'Nitrogen on silica is physisorbed by weak van der Waals forces; this exothermic process decreases as temperature rises. Hydrogen on nickel is chemisorbed (Ni–H bonds form); chemisorption needs activation energy, so its extent increases with temperature over this range.',
      sol: 'Physisorption vs activated chemisorption.',
      scheme: [['N₂: physisorption, falls with temperature', 1], ['H₂ on Ni: chemisorption, needs activation energy', 1]],
      d: 4, c: 'analysis', t: [1],
    }), [
      short({
        marks: 2,
        stem: 'Using the Freundlich constants found, calculate x/m for nitrogen at p = 4 (in the units of the experiment), and state one limitation of the Freundlich isotherm.',
        model: 'x/m = k p^(1/n) = 0.5 × 4^0.5 = 0.5 × 2 = 1.0. The Freundlich isotherm is empirical and holds only over a limited range of pressure; at high pressure x/m approaches a limit and the equation fails.',
        sol: 'x/m = 1.0; limited pressure range.',
        scheme: [['x/m = 1.0', 1], ['Limitation', 1]],
        d: 3, c: 'application', t: [1],
      }),
    ]),
  ],
}), () => near(Math.pow(10, -0.3), 0.5, 0.01) || 'k');
