// ICSE 10 Chemistry ch14 Hydrocarbons: Alkanes, Alkenes and Alkynes — question bank (ICSE 2027 specimen style:
// objective items, 1-mark equations/observations/names, bracket completions, matches and 10-mark structured
// questions). Stems name their own compounds and data. MCQ keys are placed by the builder; AR keys planned: a b c d a.
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;

// ---------------------------------------------------------------- t01 alkanes, methane as a greenhouse gas, preparation
add('greenhouse-mcq', mcq({
  stem: 'Methane released from flooded paddy fields, cattle and landfill sites is a concern for the climate because methane:',
  right: 'traps heat radiated by the Earth, and molecule for molecule traps far more heat than carbon dioxide',
  wrong: ['destroys the ozone layer by releasing chlorine atoms', 'causes acid rain by forming sulphuric acid in clouds', 'is poisonous and is absorbed by green plants'],
  sol: 'Methane is a greenhouse gas that absorbs infrared radiation from the Earth; per molecule it is much stronger than CO₂ — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('sodalime-mcq', mcq({
  stem: 'In the laboratory preparation of methane, sodium ethanoate is heated with soda lime. Soda lime is a mixture of:',
  right: 'sodium hydroxide and calcium oxide',
  wrong: ['sodium carbonate and calcium hydroxide', 'sodium chloride and calcium carbonate', 'sodium oxide and calcium carbonate'],
  sol: 'Soda lime is NaOH with CaO — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('salt-mcq', mcq({
  stem: 'Sodium propanoate, C₂H₅COONa, is heated with soda lime. The alkane formed is:',
  right: 'ethane',
  wrong: ['propane', 'methane', 'butane'],
  sol: 'Decarboxylation removes one carbon as Na₂CO₃: three carbons in the salt, two in the alkane — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('collect-mcq', mcq({
  stem: 'Methane prepared in the laboratory is collected by the downward displacement of water because methane is:',
  right: 'nearly insoluble in water',
  wrong: ['heavier than air', 'very soluble in water', 'an acidic gas'],
  sol: 'A gas that hardly dissolves in water can be collected over water — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('iodo-mcq', mcq({
  stem: 'Iodomethane, CH₃I, is warmed with a zinc–copper couple and ethanol. The organic product is:',
  right: 'methane',
  wrong: ['ethane', 'methanol', 'ethene'],
  sol: 'Nascent hydrogen replaces the iodine atom by hydrogen: CH₃I + 2[H] → CH₄ + HI — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('greenhouse-tf', tf({
  stem: 'Methane is a greenhouse gas, but carbon dioxide is not.',
  key: 'f',
  sol: 'False: both trap heat radiated by the Earth; both are greenhouse gases (methane is stronger per molecule).',
  d: 1, c: 'recall', t: [1],
}));
add('propanoate-tf', tf({
  stem: 'Ethane can be prepared by heating sodium propanoate with soda lime.',
  key: 't',
  sol: 'True: C₂H₅COONa + NaOH → C₂H₆ + Na₂CO₃ (decarboxylation).',
  d: 1, c: 'recall', t: [1],
}));
add('cao-ar', ar({
  a: 'Calcium oxide is mixed with sodium hydroxide in the soda lime used to prepare methane.',
  r: 'Calcium oxide keeps the sodium hydroxide dry and prevents it from attacking the glass of the test tube.',
  key: 'a',
  sol: 'Both are true, and R gives the purpose of calcium oxide stated in A — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('decarb-short1', short({
  marks: 1,
  stem: 'Write a balanced equation for the preparation of methane from sodium ethanoate.',
  model: r`$\ce{CH3COONa + NaOH ->[CaO][heat] CH4 + Na2CO3}$`,
  sol: 'Decarboxylation with soda lime.',
  scheme: [['Balanced equation with condition', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('propanoate-short1', short({
  marks: 1,
  stem: 'Write a balanced equation, with the condition, for the preparation of ethane from sodium propanoate.',
  model: r`$\ce{C2H5COONa + NaOH ->[CaO][heat] C2H6 + Na2CO3}$ (heated with soda lime).`,
  sol: 'Decarboxylation.',
  scheme: [['Balanced equation with condition', 1]],
  d: 1, c: 'application', t: [1],
}));
add('bromoethane-short1', short({
  marks: 1,
  stem: 'Write a balanced equation for the conversion of bromoethane into ethane, and name the reducing agent used.',
  model: r`$\ce{C2H5Br + 2[H] -> C2H6 + HBr}$; nascent hydrogen from a zinc–copper couple and ethanol.`,
  sol: 'Reduction of an alkyl halide.',
  scheme: [['Equation and reducing agent', 1]],
  d: 2, c: 'application', t: [1],
}));
add('greenhouse-short2', short({
  marks: 2,
  stem: '(a) Name two sources of methane in the atmosphere. (b) Why is methane described as a greenhouse gas of concern?',
  model: '(a) Any two: flooded paddy fields; cattle; landfills and sewage; coal mines; leaks of natural gas. (b) Methane absorbs the heat (infrared radiation) given off by the Earth and so keeps the atmosphere warm; molecule for molecule it traps far more heat than carbon dioxide, adding to global warming.',
  sol: 'Two sources; traps heat.',
  scheme: [['(a) two sources', 1], ['(b) traps heat, stronger than CO₂', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('saltmass-num', num({
  stem: 'Calculate the mass of methane obtained when 16.4 g of sodium ethanoate, CH₃COONa, is heated with excess soda lime. (C = 12, H = 1, O = 16, Na = 23)',
  value: 3.2, tol: 0.05, unit: 'g',
  sol: r`$\ce{CH3COONa + NaOH -> CH4 + Na2CO3}$: 1 mol of salt gives 1 mol of methane. Molar mass of the salt $= 2 \times 12 + 3 \times 1 + 2 \times 16 + 23 = 82$ g. Moles $= \frac{16.4}{82} = 0.2$. Mass of methane $= 0.2 \times 16 = 3.2$ g.`,
  scheme: [['Molar mass 82 and 0.2 mol', 0.5], ['3.2 g', 0.5]],
  d: 3, c: 'analysis', t: [1],
}), () => Math.abs((16.4 / (2 * 12 + 3 + 2 * 16 + 23)) * 16 - 3.2) < 1e-9 || 'mass');

// ---------------------------------------------------------------- t02 combustion and substitution
add('co-mcq', mcq({
  stem: 'A methane heater is used in a small room with the windows shut, so the supply of air is limited. A poisonous gas that may form is:',
  right: 'carbon monoxide',
  wrong: ['carbon dioxide', 'hydrogen', 'ozone'],
  sol: 'Incomplete combustion: 2CH₄ + 3O₂ → 2CO + 4H₂O — option (@K).',
  d: 1, c: 'application', t: [2],
}));
add('subst-mcq', mcq({
  stem: 'Chloromethane, CH₃Cl, reacts further with chlorine in diffused sunlight. The organic product of this next step is:',
  right: 'dichloromethane, CH₂Cl₂',
  wrong: ['trichloromethane, CHCl₃', 'chloroethane, C₂H₅Cl', 'tetrachloromethane, CCl₄'],
  sol: 'Each step replaces one more H by Cl: CH₃Cl + Cl₂ → CH₂Cl₂ + HCl — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('chloroform-mcq', mcq({
  stem: 'Trichloromethane, CHCl₃, is one product of the reaction of methane with chlorine. Its common name is:',
  right: 'chloroform',
  wrong: ['carbon tetrachloride', 'methyl chloride', 'methylene chloride'],
  sol: 'CHCl₃ is chloroform; CCl₄ is carbon tetrachloride, CH₃Cl methyl chloride and CH₂Cl₂ methylene chloride — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('dark-mcq', mcq({
  stem: 'A gas jar containing a mixture of ethane and chlorine is kept in a dark cupboard for a day. What happens?',
  right: 'No reaction takes place',
  wrong: ['Chloroethane forms slowly', 'The mixture explodes', 'Ethene and hydrogen chloride form'],
  sol: 'Substitution of alkanes by chlorine needs light (diffused sunlight) — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('co-ar', ar({
  a: 'Burning methane in a closed room with poor ventilation is dangerous.',
  r: 'In a limited supply of air, methane burns incompletely to form carbon monoxide, a poisonous gas.',
  key: 'a',
  sol: 'Both are true, and R explains the danger in A — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('combustion-tf', tf({
  stem: 'In the complete combustion of ethane, every two molecules of ethane react with seven molecules of oxygen.',
  key: 't',
  sol: 'True: 2C₂H₆ + 7O₂ → 4CO₂ + 6H₂O.',
  d: 2, c: 'application', t: [2],
}));
add('combust-short1', short({
  marks: 1,
  stem: 'Write a balanced equation for the complete combustion of ethane.',
  model: r`$\ce{2C2H6 + 7O2 -> 4CO2 + 6H2O}$`,
  sol: 'Balanced equation.',
  scheme: [['Balanced equation', 1]],
  d: 1, c: 'application', t: [2],
}));
add('ccl4-short1', short({
  marks: 1,
  stem: 'Name the final organic product formed when methane reacts with excess chlorine in diffused sunlight, and give its formula.',
  model: 'Tetrachloromethane (carbon tetrachloride), CCl₄.',
  sol: 'All four H replaced.',
  scheme: [['Tetrachloromethane, CCl₄', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('subst-short2', short({
  marks: 2,
  stem: '(a) Write balanced equations for the first two steps of the reaction of methane with chlorine in diffused sunlight. (b) Name the type of reaction.',
  model: r`(a) $\ce{CH4 + Cl2 -> CH3Cl + HCl}$ and $\ce{CH3Cl + Cl2 -> CH2Cl2 + HCl}$. (b) Substitution.`,
  sol: 'Two equations; substitution.',
  scheme: [['(a) two balanced equations', 1], ['(b) substitution', 1]],
  d: 2, c: 'application', t: [2],
}));
add('volume-num', num({
  stem: 'What volume of oxygen is needed to burn 30 cm³ of ethane completely? All volumes are measured at the same temperature and pressure.',
  value: 105, tol: 0, unit: 'cm³',
  sol: r`$\ce{2C2H6 + 7O2 -> 4CO2 + 6H2O}$. By Gay-Lussac's law, 2 volumes of ethane need 7 volumes of oxygen, so the oxygen needed $= 30 \times \frac{7}{2} = 105$ cm³.`,
  scheme: [['Ratio 2 : 7', 0.5], ['105 cm³', 0.5]],
  d: 3, c: 'application', t: [2],
}), () => (30 * 7) / 2 === 105 || 'volume');
add('co2mass-num', num({
  stem: 'What mass of carbon dioxide is formed when 8 g of methane burns completely in oxygen? (C = 12, H = 1, O = 16)',
  value: 22, tol: 0, unit: 'g',
  sol: r`$\ce{CH4 + 2O2 -> CO2 + 2H2O}$: 1 mol (16 g) of methane gives 1 mol (44 g) of CO₂. Moles of methane $= \frac{8}{16} = 0.5$, so mass of CO₂ $= 0.5 \times 44 = 22$ g.`,
  scheme: [['0.5 mol', 0.5], ['22 g', 0.5]],
  d: 2, c: 'application', t: [2],
}), () => (8 / 16) * 44 === 22 || 'mass');

// ---------------------------------------------------------------- t03 ethene
add('dehydro-mcq', mcq({
  stem: 'Bromoethane is boiled with a concentrated solution of potassium hydroxide in ethanol. The gas given off is:',
  right: 'ethene',
  wrong: ['ethane', 'ethyne', 'methane'],
  sol: 'Alcoholic KOH removes HBr (dehydrohalogenation): C₂H₅Br + KOH → C₂H₄ + KBr + H₂O — option (@K).',
  d: 1, c: 'application', t: [3],
}));
add('h2so4-mcq', mcq({
  stem: 'Ethene is prepared by heating ethanol with excess concentrated sulphuric acid at about 170 °C. The sulphuric acid acts as a:',
  right: 'dehydrating agent',
  wrong: ['reducing agent', 'source of hydrogen ions that add to ethanol', 'substance that adds water to ethanol'],
  sol: 'It removes a molecule of water from each molecule of ethanol — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('wash-mcq', mcq({
  stem: 'In the preparation of ethene from ethanol and concentrated sulphuric acid, the gas is bubbled through sodium hydroxide solution before it is collected. This removes:',
  right: 'sulphur dioxide and carbon dioxide formed as impurities',
  wrong: ['ethene that has not reacted', 'hydrogen formed in the reaction', 'ethane formed as an impurity'],
  sol: 'Some acid oxidises ethanol and is reduced to SO₂; CO₂ also forms. These acidic gases are absorbed by the alkali — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('koh-ar', ar({
  a: 'Ethene can be prepared by boiling bromoethane with aqueous potassium hydroxide.',
  r: 'Alcoholic potassium hydroxide removes a hydrogen atom and a bromine atom from neighbouring carbon atoms of bromoethane.',
  key: 'd',
  sol: 'A is false: aqueous KOH replaces Br by OH and gives ethanol. R is true: alcoholic KOH gives ethene — option (d).',
  d: 3, c: 'analysis', t: [3],
}));
add('dehydro-fill', fill({
  stem: 'The removal of a molecule of hydrogen bromide from bromoethane to form ethene is called ___.',
  acc: [['dehydrohalogenation', 'dehydrobromination']],
  sol: '**Dehydrohalogenation** (here, dehydrobromination).',
  d: 2, c: 'recall', t: [3],
}));
add('dehydro-short1', short({
  marks: 1,
  stem: 'Write a balanced equation for the preparation of ethene from bromoethane, stating the condition.',
  model: r`$\ce{C2H5Br + KOH ->[{alcohol, heat}] C2H4 + KBr + H2O}$ (boiled with alcoholic KOH).`,
  sol: 'Dehydrohalogenation.',
  scheme: [['Balanced equation with alcoholic KOH', 1]],
  d: 1, c: 'application', t: [3],
}));
add('dehydr-short1', short({
  marks: 1,
  stem: 'Write a balanced equation for the dehydration of ethanol to ethene, stating the reagent and the temperature.',
  model: r`$\ce{C2H5OH ->[{conc. H2SO4, 170 °C}] C2H4 + H2O}$ (excess concentrated sulphuric acid at about 170 °C).`,
  sol: 'Dehydration.',
  scheme: [['Equation, reagent and temperature', 1]],
  d: 1, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- t04 ethyne
add('carbide-mcq', mcq({
  stem: 'Water is dripped onto calcium carbide in a flask. The gas formed and the other product left in the flask are:',
  right: 'ethyne and calcium hydroxide',
  wrong: ['ethene and calcium oxide', 'methane and calcium carbonate', 'ethyne and calcium carbonate'],
  sol: 'CaC₂ + 2H₂O → C₂H₂ + Ca(OH)₂ — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('dibromo-mcq', mcq({
  stem: '1,2-dibromoethane, CH₂Br–CH₂Br, is boiled with alcoholic potassium hydroxide. The number of molecules of HBr removed from each molecule, and the final product, are:',
  right: 'two; ethyne',
  wrong: ['one; ethene', 'two; ethene', 'one; ethyne'],
  sol: 'Two HBr are removed in turn, leaving a triple bond: C₂H₄Br₂ + 2KOH → C₂H₂ + 2KBr + 2H₂O — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('ethyne-ar', ar({
  a: 'Ethyne decolourises bromine water.',
  r: 'Ethyne contains a carbon–carbon double bond.',
  key: 'c',
  sol: 'A is true (bromine adds across the multiple bond). R is false: ethyne has a triple bond — option (c).',
  d: 2, c: 'understanding', t: [4, 5],
}));
add('carbide-short1', short({
  marks: 1,
  stem: 'Write a balanced equation for the action of water on calcium carbide.',
  model: r`$\ce{CaC2 + 2H2O -> C2H2 + Ca(OH)2}$`,
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('dibromo-short1', short({
  marks: 1,
  stem: 'Write a balanced equation for the preparation of ethyne from 1,2-dibromoethane.',
  model: r`$\ce{C2H4Br2 + 2KOH ->[{alcohol, heat}] C2H2 + 2KBr + 2H2O}$ (boiled with alcoholic KOH).`,
  sol: 'Double dehydrohalogenation.',
  scheme: [['Balanced equation with alcoholic KOH', 1]],
  d: 2, c: 'application', t: [4],
}));
add('ethynelab-short3', short({
  marks: 3,
  stem: 'In the laboratory preparation of ethyne from calcium carbide: (a) why is the water added drop by drop? (b) why is ethyne collected over water? (c) why does the gas often smell of garlic?',
  model: '(a) The reaction is fast and gives out a lot of heat; adding water slowly controls the rate. (b) Ethyne is only slightly soluble in water, and its density is close to that of air (molecular mass 26 against about 29), so collecting it by displacing air would not work well. (c) Commercial calcium carbide contains impurities that give phosphine (and hydrogen sulphide); pure ethyne is almost odourless.',
  sol: 'Rate and heat; solubility and density; impurities.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'analysis', t: [4],
}));

// ---------------------------------------------------------------- t05 addition reactions and test for unsaturation
add('h2-mcq', mcq({
  stem: 'A mixture of ethene and hydrogen is passed over finely divided nickel at about 300 °C. The product is:',
  right: 'ethane',
  wrong: ['ethyne', 'methane', 'ethanol'],
  sol: 'Hydrogen adds across C=C: C₂H₄ + H₂ → C₂H₆ — option (@K).',
  d: 1, c: 'application', t: [5],
}));
add('br2-mcq', mcq({
  stem: 'Orange-brown bromine water is shaken separately with ethane, ethene and ethyne. The colour disappears with:',
  right: 'ethene and ethyne only',
  wrong: ['ethane only', 'all three gases', 'ethene only'],
  sol: 'Only unsaturated hydrocarbons add bromine — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('tetrabromo-mcq', mcq({
  stem: 'Ethyne is bubbled into excess bromine dissolved in tetrachloromethane. The final organic product is:',
  right: '1,1,2,2-tetrabromoethane, CHBr₂–CHBr₂',
  wrong: ['1,2-dibromoethane, CH₂Br–CH₂Br', '1,2-dibromoethene, CHBr=CHBr', 'bromoethane, CH₃–CH₂Br'],
  sol: 'Ethyne adds two molecules of bromine: C₂H₂ + 2Br₂ → C₂H₂Br₄ — option (@K).',
  d: 3, c: 'analysis', t: [5],
}));
add('cl2add-mcq', mcq({
  stem: 'Chlorine gas is bubbled into ethene at room temperature in the dark. The product is:',
  right: '1,2-dichloroethane',
  wrong: ['chloroethane', 'chloroethene', '1,1-dichloroethane'],
  sol: 'Addition puts one Cl on each carbon of the double bond: C₂H₄ + Cl₂ → CH₂Cl–CH₂Cl — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('bromine-ar', ar({
  a: 'Ethane does not decolourise bromine water in the dark.',
  r: 'Ethane has a higher molecular mass than methane.',
  key: 'b',
  sol: 'Both are true, but R does not explain A; ethane does not react because it is saturated and has no multiple bond for bromine to add to — option (b).',
  d: 2, c: 'understanding', t: [5],
}));
add('addition-tf', tf({
  stem: 'Ethene decolourises a solution of bromine in tetrachloromethane without needing sunlight.',
  key: 't',
  sol: 'True: addition across C=C takes place readily at room temperature, with no light needed.',
  d: 2, c: 'understanding', t: [5],
}));
add('iodine-fill', fill({
  stem: 'Ethene reacts with iodine to form ___ (name the product).',
  acc: [['1,2-diiodoethane', 'diiodoethane']],
  sol: '**1,2-diiodoethane**, C₂H₄I₂ (CH₂I–CH₂I).',
  d: 2, c: 'application', t: [5],
}));
add('addition-fill', fill({
  stem: 'Complete each sentence by choosing the correct word from the bracket.\n\n(a) Ethene adds hydrogen in the presence of ___ (nickel / iron) as the catalyst.\n\n(b) The reaction of ethene with bromine is an ___ (addition / substitution) reaction.\n\n(c) One molecule of ethyne can add ___ (one / two) molecules of bromine.',
  acc: [['nickel'], ['addition'], ['two']],
  sol: '(a) **nickel**; (b) **addition**; (c) **two**.',
  d: 1, c: 'recall', t: [5],
}));
add('h2-short1', short({
  marks: 1,
  stem: 'Write a balanced equation for the complete hydrogenation of ethyne, stating the catalyst.',
  model: r`$\ce{C2H2 + 2H2 ->[{Ni, about 300 °C}] C2H6}$ (nickel catalyst).`,
  sol: 'Two molecules of hydrogen add.',
  scheme: [['Balanced equation with nickel', 1]],
  d: 2, c: 'application', t: [5],
}));
add('br-short1', short({
  marks: 1,
  stem: 'Write a balanced equation for the reaction of ethene with bromine, and name the product.',
  model: r`$\ce{C2H4 + Br2 -> C2H4Br2}$; 1,2-dibromoethane (CH₂Br–CH₂Br).`,
  sol: 'Addition.',
  scheme: [['Equation and name', 1]],
  d: 1, c: 'application', t: [5],
}));
add('test-short1', short({
  marks: 1,
  stem: 'State one observation when ethene is bubbled through bromine water.',
  model: 'The orange-brown colour of the bromine water disappears (the solution becomes colourless).',
  sol: 'Decolourised.',
  scheme: [['Orange-brown to colourless', 1]],
  d: 1, c: 'application', t: [5],
}));
add('test-short2', short({
  marks: 2,
  stem: 'Describe a chemical test to distinguish between ethane and ethene, giving the observation in each case.',
  model: 'Bubble each gas through bromine water (or bromine in tetrachloromethane). Ethene: the orange-brown colour disappears, because bromine adds across the double bond. Ethane: the colour remains, because ethane is saturated and does not react.',
  sol: 'Reagent; two observations.',
  scheme: [['Reagent', 1], ['Both observations', 1]],
  d: 2, c: 'analysis', t: [5],
}));
add('ethynecl-short2', short({
  marks: 2,
  stem: 'Write balanced equations for the two steps in which chlorine adds to ethyne, and name the final product.',
  model: r`$\ce{C2H2 + Cl2 -> C2H2Cl2}$ (1,2-dichloroethene), then $\ce{C2H2Cl2 + Cl2 -> C2H2Cl4}$. Final product: 1,1,2,2-tetrachloroethane, CHCl₂–CHCl₂.`,
  sol: 'Two additions.',
  scheme: [['Two equations', 1], ['Name', 1]],
  d: 3, c: 'application', t: [5],
}));
add('unsat-short3', short({
  marks: 3,
  stem: 'A gaseous hydrocarbon X has a molecular mass of 28 and decolourises bromine water. (a) Identify X. (b) Write a balanced equation for its reaction with bromine. (c) Write a balanced equation for its reaction with hydrogen, stating the condition. (C = 12, H = 1)',
  model: r`(a) X is ethene, C₂H₄ ($2 \times 12 + 4 \times 1 = 28$; an unsaturated hydrocarbon). (b) $\ce{C2H4 + Br2 -> C2H4Br2}$. (c) $\ce{C2H4 + H2 ->[{Ni, about 300 °C}] C2H6}$.`,
  sol: 'Ethene; addition of bromine; hydrogenation.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'analysis', t: [5],
}));
add('compare-short3', short({
  marks: 3,
  stem: 'Ethane and ethene both react with chlorine. (a) Write a balanced equation for each reaction. (b) Name the type of each reaction. (c) Which of the two reactions needs diffused sunlight?',
  model: r`(a) Ethane: $\ce{C2H6 + Cl2 -> C2H5Cl + HCl}$. Ethene: $\ce{C2H4 + Cl2 -> C2H4Cl2}$. (b) Ethane: substitution; ethene: addition. (c) The reaction of ethane (substitution) needs diffused sunlight; ethene adds chlorine without light.`,
  sol: 'Equations; substitution and addition; light.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'analysis', t: [2, 5],
}));
add('dibromomass-num', num({
  stem: 'What mass of 1,2-dibromoethane is formed when 5.6 g of ethene reacts completely with bromine? (C = 12, H = 1, Br = 80)',
  value: 37.6, tol: 0.1, unit: 'g',
  sol: r`$\ce{C2H4 + Br2 -> C2H4Br2}$: 1 mol of ethene gives 1 mol of product. Moles of ethene $= \frac{5.6}{28} = 0.2$. Molar mass of C₂H₄Br₂ $= 2 \times 12 + 4 \times 1 + 2 \times 80 = 188$ g. Mass formed $= 0.2 \times 188 = 37.6$ g.`,
  scheme: [['0.2 mol and 188', 0.5], ['37.6 g', 0.5]],
  d: 4, c: 'analysis', t: [5],
}), () => Math.abs((5.6 / 28) * (24 + 4 + 160) - 37.6) < 1e-9 || 'mass');

// ---------------------------------------------------------------- t06 uses
add('weld-mcq', mcq({
  stem: 'The very hot flame used in a workshop to weld and cut steel sheets is obtained by burning:',
  right: 'ethyne in oxygen',
  wrong: ['ethene in air', 'methane in oxygen', 'ethane in chlorine'],
  sol: 'The oxy-acetylene flame (about 3000 °C) — option (@K).',
  d: 1, c: 'recall', t: [6],
}));
add('polythene-mcq', mcq({
  stem: 'Which hydrocarbon is the raw material for polythene and is also produced naturally by ripening fruit?',
  right: 'Ethene',
  wrong: ['Ethane', 'Methane', 'Ethyne'],
  sol: 'Ethene is polymerised to polythene and is a plant hormone that ripens fruit — option (@K).',
  d: 1, c: 'recall', t: [6],
}));
add('uses-match', match({
  stem: 'Match each hydrocarbon in Column A with one of its uses in Column B.',
  pairs: [
    ['Methane', 'Main fuel in CNG and biogas'],
    ['Ethane', 'Cracked in industry to make ethene'],
    ['Ethene', 'Making polythene'],
    ['Ethyne', 'Welding and cutting metals'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Methane → CNG and biogas; ethane → cracked to make ethene; ethene → polythene; ethyne → welding and cutting.',
  d: 1, c: 'recall', t: [6],
}));
add('prep-match', match({
  stem: 'Match each change in Column A with the reagent and condition in Column B.',
  pairs: [
    ['Sodium ethanoate → methane', 'Soda lime, heat'],
    ['Bromoethane → ethane', 'Zinc–copper couple and ethanol'],
    ['Bromoethane → ethene', 'Alcoholic potassium hydroxide, boil'],
    ['Ethanol → ethene', 'Excess concentrated sulphuric acid, about 170 °C'],
    ['Ethene → ethane', 'Hydrogen over nickel, about 300 °C'],
  ],
  order: [3, 0, 4, 1, 2],
  sol: 'Sodium ethanoate → methane: soda lime, heat; bromoethane → ethane: Zn–Cu couple and ethanol (nascent hydrogen); bromoethane → ethene: alcoholic KOH; ethanol → ethene: conc. H₂SO₄ at about 170 °C; ethene → ethane: H₂ over Ni at about 300 °C.',
  d: 2, c: 'application', t: [1, 3, 5],
}));
add('uses-short1', short({
  marks: 1,
  stem: 'Give one use of ethyne.',
  model: 'In the oxy-acetylene flame for welding and cutting metals (or making plastics such as PVC).',
  sol: 'Welding.',
  scheme: [['One correct use', 1]],
  d: 1, c: 'recall', t: [6],
}));
add('uses-short2', short({
  marks: 2,
  stem: 'Give one use each of (a) methane and (b) ethene, and state the property of each that makes it suitable for that use.',
  model: '(a) Methane: fuel (CNG, biogas), because it burns with a clean flame and releases much heat. (b) Ethene: making polythene, because its double bond lets many molecules add together (or ripening fruit, as it is a plant hormone).',
  sol: 'Uses with reasons.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'understanding', t: [6],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('methane-long', long({
  stem: '(a) Name the two substances heated together to prepare methane in the laboratory, and write the balanced equation. [2]\n\n(b) Give a reason: (i) methane is collected over water; (ii) calcium oxide is used along with sodium hydroxide. [2]\n\n(c) Write balanced equations for (i) the complete combustion of methane and (ii) its incomplete combustion forming carbon monoxide. (iii) Why is incomplete combustion dangerous indoors? [3]\n\n(d) Methane reacts with chlorine in diffused sunlight. (i) Name the type of reaction. (ii) Write the equation for the first step. (iii) Name the final product when chlorine is in excess. [3]',
  model: r`(a) Sodium ethanoate and soda lime. $\ce{CH3COONa + NaOH ->[CaO][heat] CH4 + Na2CO3}$

(b) (i) Methane is nearly insoluble in water. (ii) CaO keeps the NaOH dry and stops it attacking the glass.

(c) (i) $\ce{CH4 + 2O2 -> CO2 + 2H2O}$ (ii) $\ce{2CH4 + 3O2 -> 2CO + 4H2O}$ (iii) Carbon monoxide is poisonous: it combines with haemoglobin and reduces the oxygen carried by the blood.

(d) (i) Substitution. (ii) $\ce{CH4 + Cl2 -> CH3Cl + HCl}$ (iii) Tetrachloromethane (carbon tetrachloride), CCl₄.`,
  sol: 'Reactants and equation; reasons; combustion; substitution.',
  scheme: [['(a) reactants', 1], ['(a) equation', 1], ['(b)(i)', 1], ['(b)(ii)', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(d)(i)', 1], ['(d)(ii)', 1], ['(d)(iii)', 1]],
  d: 3, c: 'application', t: [1, 2],
}));
add('ethane-long', long({
  stem: '(a) Write balanced equations, with conditions, for the preparation of ethane from (i) sodium propanoate and (ii) bromoethane. [2]\n\n(b) (i) Write the balanced equation for the complete combustion of ethane. (ii) What volume of oxygen is needed to burn 40 cm³ of ethane completely, all volumes at the same temperature and pressure? [2]\n\n(c) (i) Write the equation for the reaction of ethane with chlorine to form chloroethane, and state the condition. (ii) Name the type of reaction. (iii) Why does ethane not decolourise bromine water? [3]\n\n(d) (i) Give one use of ethane. (ii) Give two reasons why leaks of methane from gas pipelines harm the environment and the people nearby. [3]',
  model: r`(a) (i) $\ce{C2H5COONa + NaOH ->[CaO][heat] C2H6 + Na2CO3}$ (ii) $\ce{C2H5Br + 2[H] ->[Zn/Cu][ethanol] C2H6 + HBr}$

(b) (i) $\ce{2C2H6 + 7O2 -> 4CO2 + 6H2O}$ (ii) Oxygen $= 40 \times \frac{7}{2} = 140$ cm³.

(c) (i) $\ce{C2H6 + Cl2 -> C2H5Cl + HCl}$, in diffused sunlight. (ii) Substitution. (iii) It is saturated: it has no double or triple bond across which bromine could add.

(d) (i) Fuel, or cracking to make ethene. (ii) Methane is a strong greenhouse gas that adds to global warming; it is highly inflammable, so a leak can cause a fire or explosion.`,
  sol: 'Two preparations; combustion volume; substitution; uses and hazards.',
  scheme: [['(a)(i)', 1], ['(a)(ii)', 1], ['(b)(i)', 1], ['(b)(ii)', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(d)(i)', 1], ['(d)(ii)', 2]],
  d: 3, c: 'application', t: [1, 2, 6],
}));
add('ethene-long', long({
  stem: '(a) Ethene is prepared from ethanol. (i) Name the reagent and state the temperature. (ii) Write the balanced equation. (iii) Why is the gas passed through sodium hydroxide solution? [3]\n\n(b) Ethene can also be prepared from bromoethane. (i) Name the reagent. (ii) Write the balanced equation. (iii) Name the type of reaction. [3]\n\n(c) Write balanced equations for the reaction of ethene with (i) hydrogen, stating the catalyst, (ii) bromine, stating the observation, and (iii) iodine, naming the product. (iv) Name the type of reaction in (c). [4]',
  model: r`(a) (i) Excess concentrated sulphuric acid, about 170 °C. (ii) $\ce{C2H5OH ->[{conc. H2SO4, 170 °C}] C2H4 + H2O}$ (iii) To remove the acidic impurities sulphur dioxide and carbon dioxide.

(b) (i) Alcoholic potassium hydroxide. (ii) $\ce{C2H5Br + KOH ->[{alcohol, heat}] C2H4 + KBr + H2O}$ (iii) Dehydrohalogenation (elimination of HBr).

(c) (i) $\ce{C2H4 + H2 ->[{Ni, about 300 °C}] C2H6}$ (ii) $\ce{C2H4 + Br2 -> C2H4Br2}$: the orange-brown colour of bromine disappears. (iii) $\ce{C2H4 + I2 -> C2H4I2}$, 1,2-diiodoethane. (iv) Addition.`,
  sol: 'Dehydration; dehydrohalogenation; three additions.',
  scheme: [['(a)(i)', 1], ['(a)(ii)', 1], ['(a)(iii)', 1], ['(b)(i)', 1], ['(b)(ii)', 1], ['(b)(iii)', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(c)(iv)', 1]],
  d: 3, c: 'application', t: [3, 5],
}));
add('ethyne-long', long({
  stem: '(a) Write the balanced equation for the action of water on calcium carbide, and state how the gas is collected. [2]\n\n(b) Name the reagent used to convert 1,2-dibromoethane into ethyne, and write the balanced equation. [2]\n\n(c) Ethyne is passed with hydrogen over heated nickel. (i) Write the equation for the first step and name its product. (ii) Write the equation for the second step. (iii) How many molecules of hydrogen add to one molecule of ethyne in all? [3]\n\n(d) (i) Write the balanced equation for the reaction of ethyne with excess bromine and name the product. (ii) State one observation. (iii) Give one use of ethyne. [3]',
  model: r`(a) $\ce{CaC2 + 2H2O -> C2H2 + Ca(OH)2}$. Ethyne is collected over water (downward displacement of water).

(b) Alcoholic potassium hydroxide. $\ce{C2H4Br2 + 2KOH -> C2H2 + 2KBr + 2H2O}$

(c) (i) $\ce{C2H2 + H2 -> C2H4}$, ethene. (ii) $\ce{C2H4 + H2 -> C2H6}$ (ethane). (iii) Two.

(d) (i) $\ce{C2H2 + 2Br2 -> C2H2Br4}$, 1,1,2,2-tetrabromoethane. (ii) The orange-brown colour of bromine disappears. (iii) Oxy-acetylene flame for welding and cutting metals.`,
  sol: 'Carbide; dibromoethane; two-step hydrogenation; bromination and use.',
  scheme: [['(a) equation', 1], ['(a) collection', 1], ['(b) reagent', 1], ['(b) equation', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(d)(i)', 1], ['(d)(ii)', 1], ['(d)(iii)', 1]],
  d: 3, c: 'application', t: [4, 5, 6],
}));
add('abc-long', long({
  stem: 'Three gases A, B and C are methane, ethene and ethyne, but not necessarily in that order. A does not decolourise bromine water. One molecule of B adds one molecule of bromine. One molecule of C adds two molecules of bromine.\n\n(a) Identify A, B and C, giving a reason for each. [3]\n\n(b) Write balanced equations for (i) the reaction of B with bromine and (ii) the complete hydrogenation of C. (iii) Name the catalyst used in (ii). [3]\n\n(c) (i) Calculate the volume of hydrogen, at the same temperature and pressure, needed to convert 20 cm³ of C completely into ethane. (ii) Calculate the mass of bromine that reacts with 0.56 g of B. (C = 12, H = 1, Br = 80) [4]',
  model: r`(a) A is methane: it is saturated and cannot add bromine. B is ethene: one C=C bond adds one Br₂. C is ethyne: one C≡C bond adds two Br₂.

(b) (i) $\ce{C2H4 + Br2 -> C2H4Br2}$ (ii) $\ce{C2H2 + 2H2 -> C2H6}$ (iii) Nickel (at about 300 °C).

(c) (i) 1 volume of ethyne needs 2 volumes of hydrogen: $20 \times 2 = 40$ cm³. (ii) Moles of ethene $= \frac{0.56}{28} = 0.02$; mass of bromine $= 0.02 \times 160 = 3.2$ g.`,
  sol: 'Identification; equations; volume and mass.',
  scheme: [['(a) A', 1], ['(a) B', 1], ['(a) C', 1], ['(b)(i)', 1], ['(b)(ii)', 1], ['(b)(iii)', 1], ['(c)(i)', 2], ['(c)(ii)', 2]],
  d: 4, c: 'analysis', t: [2, 5],
}));
