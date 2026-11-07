// ICSE 10 Chemistry ch03 Acids, Bases and Salts — question bank (ICSE 2027 specimen style). Stems name their own
// acids, salts and data. MCQ keys are placed by the builder; AR keys planned: a c c a c a.
import { mk, add } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;

// ---------------------------------------------------------------- t01 acids, bases and alkalis
add('define-mcq', mcq({
  stem: 'Which substance, dissolved in water, gives hydronium ions as the only positive ions?',
  right: 'Nitric acid, HNO₃',
  wrong: ['Sodium hydrogen sulphate, NaHSO₄', 'Ammonium chloride, NH₄Cl', 'Potassium hydroxide, KOH'],
  sol: 'NaHSO₄ also gives Na⁺ ions, NH₄Cl gives NH₄⁺, and KOH gives K⁺ and OH⁻ — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('dibasic-mcq', mcq({
  stem: 'Sulphuric acid is called a dibasic acid because one molecule:',
  right: 'can give two hydronium ions in water',
  wrong: ['contains two oxygen atoms', 'reacts with two different bases', 'contains two sulphur atoms'],
  sol: 'H₂SO₄ has two replaceable hydrogen atoms, released in two ionisation steps — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('alkali-mcq', mcq({
  stem: 'Which of these bases is NOT an alkali?',
  right: 'Copper(II) oxide',
  wrong: ['Potassium hydroxide', 'Ammonium hydroxide', 'Sodium hydroxide'],
  sol: 'Copper(II) oxide is insoluble in water, so it is a base but not an alkali — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('weak-mcq', mcq({
  stem: 'Ethanoic acid solution conducts electricity less well than hydrochloric acid of the same concentration because ethanoic acid:',
  right: 'is only partly ionised in water',
  wrong: ['does not contain hydrogen', 'is a base', 'is a strong acid'],
  sol: 'A weak acid produces fewer ions — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('alkali-ar', ar({
  a: 'All alkalis are bases, but all bases are not alkalis.',
  r: 'An alkali is a base that is soluble in water.',
  key: 'c',
  sol: 'Both are true, and R explains A — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('ionise-tf', tf({
  stem: 'Hydrogen chloride ionises when it dissolves in water, but solid potassium hydroxide dissociates.',
  key: 't',
  sol: 'True: covalent HCl forms ions only by reacting with water; ionic KOH already contains ions.',
  d: 2, c: 'understanding', t: [1],
}));
add('ionise-short1', short({
  marks: 1,
  stem: 'Write the equation for the ionisation of nitric acid in water.',
  model: 'HNO₃ + H₂O → H₃O⁺ + NO₃⁻.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('dissoc-short1', short({
  marks: 1,
  stem: 'Write the equation for the dissociation of potassium hydroxide in water.',
  model: 'KOH → K⁺ + OH⁻.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('h2so4-short2', short({
  marks: 2,
  stem: 'Write the two steps by which sulphuric acid ionises in water, and use them to explain why it is called dibasic.',
  model: 'H₂SO₄ + H₂O → H₃O⁺ + HSO₄⁻; HSO₄⁻ + H₂O → H₃O⁺ + SO₄²⁻. One molecule can give two hydronium ions (it has two replaceable hydrogen atoms), so it is dibasic.',
  sol: 'Two steps; two H₃O⁺.',
  scheme: [['Both steps', 1], ['Explanation', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('def-short3', short({
  marks: 3,
  stem: '(a) Define an alkali in terms of ions. (b) Name one base that is not an alkali and say why. (c) Explain why sodium hydrogen sulphate is not called an acid by this definition, although its solution turns blue litmus red.',
  model: '(a) A base which dissolves in water and gives hydroxide ions as the only negative ions. (b) Copper(II) oxide (or iron(III) hydroxide): it does not dissolve in water. (c) In water it gives Na⁺ as well as H₃O⁺, so hydronium ions are not the only positive ions; it is an acid salt.',
  sol: 'Definition; insoluble base; acid salt.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'analysis', t: [1, 3],
}));

// ---------------------------------------------------------------- t02 indicators and pH
add('indicator-mcq', mcq({
  stem: 'A few drops of methyl orange are added to dilute potassium hydroxide solution. The colour seen is:',
  right: 'yellow',
  wrong: ['pink', 'orange', 'colourless'],
  sol: 'Methyl orange is yellow in alkali — option (@K).',
  d: 1, c: 'application', t: [2],
}));
add('ph-mcq', mcq({
  stem: 'Universal indicator added to a sample of rainwater turns orange-yellow, corresponding to pH 5. The rainwater is:',
  right: 'weakly acidic',
  wrong: ['strongly acidic', 'neutral', 'weakly alkaline'],
  sol: 'pH 5 is just below 7 — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('phen-mcq', mcq({
  stem: 'Phenolphthalein is added to a solution of pH 12, and then dilute nitric acid is added slowly until the pH is 4. The colour changes from:',
  right: 'pink to colourless',
  wrong: ['colourless to pink', 'yellow to pink', 'blue to red'],
  sol: 'Pink in alkali, colourless once the solution is neutral or acidic — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('ph-ar', ar({
  a: 'A solution of pH 2 turns blue litmus red.',
  r: 'A solution of pH 2 contains more hydroxide ions than hydronium ions.',
  key: 'a',
  sol: 'A is true (strongly acidic); R is false: an acidic solution has more H₃O⁺ than OH⁻ — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('litmus-tf', tf({
  stem: 'Neutral litmus solution is purple.',
  key: 't',
  sol: 'True: red in acid, blue in alkali, purple when neutral.',
  d: 1, c: 'recall', t: [2],
}));
add('indicator-fill', fill({
  stem: 'Complete each sentence by choosing the correct word from the bracket.\n\n(a) Phenolphthalein in a solution of lime water is ___ (colourless / pink).\n\n(b) A solution of pH 9 is ___ (acidic / alkaline).\n\n(c) A salt that still contains replaceable hydrogen is called an ___ salt (acid / basic).',
  acc: [['pink'], ['alkaline'], ['acid']],
  sol: '(a) **pink**; (b) **alkaline**; (c) **acid**.',
  d: 1, c: 'recall', t: [2, 3],
}));
add('ph-short1', short({
  marks: 1,
  stem: 'Name the indicator that is pink in acidic solution and yellow in alkaline solution.',
  model: 'Methyl orange.',
  sol: 'Methyl orange.',
  scheme: [['Methyl orange', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('ph2-short1', short({
  marks: 1,
  stem: 'A sample of soil solution has pH 6. Is it acidic, neutral or alkaline?',
  model: 'Weakly acidic.',
  sol: 'Below 7.',
  scheme: [['Weakly acidic', 1]],
  d: 1, c: 'application', t: [2],
}));
add('ph-short2', short({
  marks: 2,
  stem: 'Solutions A, B and C have pH values 3, 7 and 13. (a) Which turns phenolphthalein pink? (b) Which has the highest concentration of hydronium ions? (c) Which could be distilled water? (d) What colour is litmus in A?',
  model: '(a) C. (b) A. (c) B. (d) Red.',
  sol: 'Read the scale.',
  scheme: [['(a) and (b)', 1], ['(c) and (d)', 1]],
  d: 2, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 kinds of salts
add('salttype-mcq', mcq({
  stem: 'Basic lead chloride, Pb(OH)Cl, is an example of a:',
  right: 'basic salt',
  wrong: ['normal salt', 'acid salt', 'complex salt'],
  sol: 'It still contains hydroxide from the base Pb(OH)₂ — option (@K).',
  d: 1, c: 'application', t: [3],
}));
add('acidsalt-mcq', mcq({
  stem: 'Which acid can form an acid salt with sodium hydroxide?',
  right: 'Carbonic acid, H₂CO₃',
  wrong: ['Hydrochloric acid, HCl', 'Nitric acid, HNO₃', 'Hydrobromic acid, HBr'],
  sol: 'Only an acid with more than one replaceable hydrogen can form an acid salt (NaHCO₃) — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('complex-mcq', mcq({
  stem: 'Potassium ferrocyanide, K₄Fe(CN)₆, does not give a test for iron(II) ions in solution. This is because it is a:',
  right: 'complex salt whose complex ion does not break up in water',
  wrong: ['basic salt', 'normal salt of a weak acid', 'covalent compound'],
  sol: 'The Fe(CN)₆⁴⁻ ion stays intact — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('salt-ar', ar({
  a: 'Sodium hydrogen carbonate is an acid salt.',
  r: 'Sodium hydrogen carbonate solution is strongly acidic.',
  key: 'a',
  sol: 'A is true (it contains replaceable H); R is false: its solution is weakly alkaline (pH about 8) — option (a).',
  d: 3, c: 'analysis', t: [3],
}));
add('salt-tf', tf({
  stem: 'Potassium nitrate, KNO₃, is a normal salt.',
  key: 't',
  sol: 'True: the single replaceable hydrogen of nitric acid is replaced.',
  d: 1, c: 'application', t: [3],
}));
add('salt-fill', fill({
  stem: 'A salt formed by the complete replacement of the replaceable hydrogen of an acid by a metal is called a ___ salt.',
  acc: [['normal']],
  sol: '**Normal** salt.',
  d: 1, c: 'recall', t: [3],
}));
add('salt-short1', short({
  marks: 1,
  stem: 'Classify sodium hydrogen sulphate, NaHSO₄, as a normal, acid, basic or complex salt.',
  model: 'Acid salt.',
  sol: 'It contains replaceable hydrogen.',
  scheme: [['Acid salt', 1]],
  d: 1, c: 'application', t: [3],
}));
add('nahso4-short1', short({
  marks: 1,
  stem: 'Write the equation for the reaction of sodium hydroxide with sulphuric acid in the ratio 1 : 1.',
  model: 'NaOH + H₂SO₄ → NaHSO₄ + H₂O.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 2, c: 'application', t: [3],
}));
add('salt-match', match({
  stem: 'Match each salt in Column A with its kind or property in Column B.',
  pairs: [
    ['Sodium sulphate', 'Normal salt'],
    ['Sodium hydrogen sulphate', 'Acid salt'],
    ['Basic lead chloride', 'Basic salt'],
    ['Potassium ferrocyanide', 'Complex salt'],
    ['Barium sulphate', 'Insoluble salt made by precipitation'],
  ],
  order: [3, 0, 4, 1, 2],
  sol: 'Na₂SO₄ → normal; NaHSO₄ → acid; Pb(OH)Cl → basic; K₄Fe(CN)₆ → complex; BaSO₄ → insoluble, by precipitation.',
  d: 2, c: 'application', t: [3, 5],
}));

// ---------------------------------------------------------------- t04 dilute acids on carbonates, sulphites, sulphides
add('gas-mcq', mcq({
  stem: 'Dilute hydrochloric acid is poured on crystals of sodium sulphite. The gas given off:',
  right: 'turns acidified potassium dichromate paper from orange to green',
  wrong: ['turns lead acetate paper black', 'burns with a pop', 'relights a glowing splint'],
  sol: 'Sulphite + acid gives SO₂ — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('marble-mcq', mcq({
  stem: 'Chips of marble (calcium carbonate) are dropped into dilute nitric acid. The products are:',
  right: 'calcium nitrate, water and carbon dioxide',
  wrong: ['calcium nitrate and hydrogen', 'calcium oxide and nitrogen dioxide', 'calcium hydroxide and carbon dioxide'],
  sol: 'CaCO₃ + 2HNO₃ → Ca(NO₃)₂ + H₂O + CO₂ — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('h2s-mcq', mcq({
  stem: 'Iron(II) sulphide is treated with dilute sulphuric acid. A gas with a smell of rotten eggs is evolved. It is identified by:',
  right: 'lead acetate paper turning silvery black',
  wrong: ['lime water turning milky', 'moist red litmus turning blue', 'a burning splint going out with a pop'],
  sol: 'H₂S forms black PbS — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('so2co2-mcq', mcq({
  stem: 'A gas turns lime water milky. To show that it is carbon dioxide and not sulphur dioxide, the gas should be passed through:',
  right: 'acidified potassium dichromate, which stays orange',
  wrong: ['more lime water', 'lead acetate solution', 'blue litmus solution'],
  sol: 'SO₂ would turn the dichromate green; CO₂ does not — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('gas-ar', ar({
  a: 'Both sodium carbonate and sodium sulphite give a gas that turns lime water milky when treated with dilute hydrochloric acid.',
  r: 'Carbon dioxide and sulphur dioxide both form insoluble calcium salts with lime water.',
  key: 'c',
  sol: 'Both are true, and R explains A (CaCO₃ and CaSO₃ precipitates) — option (c).',
  d: 3, c: 'analysis', t: [4],
}));
add('effer-tf', tf({
  stem: 'Potassium hydrogen carbonate gives brisk effervescence with dilute sulphuric acid.',
  key: 't',
  sol: 'True: carbon dioxide is evolved.',
  d: 1, c: 'application', t: [4],
}));
add('co2-short1', short({
  marks: 1,
  stem: 'Write a balanced equation for the action of dilute hydrochloric acid on sodium hydrogen sulphite.',
  model: 'NaHSO₃ + HCl → NaCl + H₂O + SO₂.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 2, c: 'recall', t: [4],
}));
add('zns-short1', short({
  marks: 1,
  stem: 'Write a balanced equation for the action of dilute sulphuric acid on zinc sulphide.',
  model: 'ZnS + H₂SO₄ → ZnSO₄ + H₂S.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('obs-short1', short({
  marks: 1,
  stem: 'State one observation when the gas from dilute acid on potassium sulphite is passed through acidified potassium permanganate solution.',
  model: 'The pink (purple) solution becomes colourless.',
  sol: 'Decolourised.',
  scheme: [['Pink → colourless', 1]],
  d: 2, c: 'application', t: [4],
}));
add('carb-num', num({
  marks: 2,
  stem: 'What volume of carbon dioxide, measured at STP, is given off when 10 g of calcium carbonate reacts completely with dilute hydrochloric acid? (Ca = 40, C = 12, O = 16; molar volume at STP = 22.4 L)',
  value: 2.24, tol: 0.01, unit: 'L',
  sol: 'CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂. Moles of CaCO₃ = 10 ÷ 100 = 0.1; volume of CO₂ = 0.1 × 22.4 = 2.24 L.',
  scheme: [['0.1 mol CaCO₃ → 0.1 mol CO₂', 1], ['2.24 L', 1]],
  d: 3, c: 'application', t: [4],
}), () => Math.abs((10 / 100) * 22.4 - 2.24) < 1e-9 || 'volume');
add('gas-short2', short({
  marks: 2,
  stem: 'Describe one test each to identify (a) sulphur dioxide and (b) hydrogen sulphide, giving the observation.',
  model: '(a) Pass the gas through acidified potassium dichromate solution (or over dichromate paper): orange turns green. (b) Hold a strip of lead acetate paper in the gas: it turns silvery black.',
  sol: 'Dichromate; lead acetate.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('unknown-short3', short({
  marks: 3,
  stem: 'Three white solids P, Q and R are sodium salts. With dilute sulphuric acid: P gives a colourless, odourless gas that turns lime water milky; Q gives a gas with a choking smell that turns acidified potassium dichromate green; R gives a gas that blackens lead acetate paper. (a) Identify the anion in each. (b) Write the equation for Q if it is sodium sulphite. (c) Name the gas from R.',
  model: '(a) P: carbonate (or hydrogen carbonate); Q: sulphite (or hydrogen sulphite); R: sulphide. (b) Na₂SO₃ + H₂SO₄ → Na₂SO₄ + H₂O + SO₂. (c) Hydrogen sulphide.',
  sol: 'Gas tests → anions; equation; H₂S.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 4, c: 'analysis', t: [4],
}));

// ---------------------------------------------------------------- t05 direct combination, displacement, precipitation
add('method-mcq', mcq({
  stem: 'The most suitable method for preparing lead(II) chloride in the laboratory is:',
  right: 'precipitation from lead nitrate solution and sodium chloride solution',
  wrong: ['lead metal with dilute hydrochloric acid', 'titration of lead hydroxide with hydrochloric acid', 'direct combination of lead and chlorine at room temperature'],
  sol: 'PbCl₂ is insoluble in cold water, so it is precipitated — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('fecl3-mcq', mcq({
  stem: 'Iron(III) chloride is made by passing dry chlorine over heated iron, rather than by reacting iron with dilute hydrochloric acid, because the acid gives:',
  right: 'iron(II) chloride instead',
  wrong: ['no reaction at all', 'iron(III) oxide', 'chlorine gas'],
  sol: 'Fe + 2HCl → FeCl₂ + H₂ — option (@K).',
  d: 3, c: 'analysis', t: [5],
}));
add('baso4-mcq', mcq({
  stem: 'Which pair of solutions, when mixed, gives a white precipitate of barium sulphate?',
  right: 'Barium chloride and sodium sulphate',
  wrong: ['Barium chloride and sodium nitrate', 'Barium nitrate and sodium chloride', 'Sodium sulphate and potassium chloride'],
  sol: 'BaCl₂ + Na₂SO₄ → BaSO₄ + 2NaCl — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('method-ar', ar({
  a: 'Zinc sulphate can be prepared by adding zinc granules to dilute sulphuric acid.',
  r: 'Zinc is below hydrogen in the activity series.',
  key: 'a',
  sol: 'A is true; R is false: zinc is above hydrogen in the activity series, which is why it displaces hydrogen — option (a).',
  d: 2, c: 'understanding', t: [5],
}));
add('precip-tf', tf({
  stem: 'Silver chloride is prepared by adding dilute hydrochloric acid to silver metal.',
  key: 'f',
  sol: 'False: silver does not react with dilute HCl; AgCl is precipitated from silver nitrate solution and a soluble chloride.',
  d: 2, c: 'application', t: [5],
}));
add('fecl3-short1', short({
  marks: 1,
  stem: 'Write a balanced equation for the preparation of iron(III) chloride by direct combination.',
  model: '2Fe + 3Cl₂ → 2FeCl₃.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('pbcl2-short1', short({
  marks: 1,
  stem: 'Write a balanced equation for the preparation of lead chloride from lead nitrate solution.',
  model: 'Pb(NO₃)₂ + 2NaCl → PbCl₂ + 2NaNO₃ (or with dilute HCl).',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('method-short2', short({
  marks: 2,
  stem: 'Name the method you would use to prepare (a) barium sulphate and (b) zinc sulphate, and give a reason for each choice.',
  model: '(a) Precipitation: barium sulphate is insoluble in water. (b) Displacement (zinc with dilute sulphuric acid): zinc sulphate is soluble and zinc is above hydrogen in the activity series.',
  sol: 'Precipitation; displacement.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'application', t: [5],
}));

// ---------------------------------------------------------------- t06 insoluble base, titration, carbonates
add('titration-mcq', mcq({
  stem: 'Potassium sulphate is prepared by titrating potassium hydroxide with dilute sulphuric acid, and not by adding excess base and filtering, because:',
  right: 'potassium hydroxide is soluble, so excess could not be removed by filtration',
  wrong: ['potassium sulphate is insoluble', 'potassium hydroxide does not react with sulphuric acid', 'the reaction is too slow without an indicator'],
  sol: 'A soluble base cannot be filtered off — option (@K).',
  d: 2, c: 'understanding', t: [6],
}));
add('cuso4-mcq', mcq({
  stem: 'Black copper(II) oxide is added to warm dilute sulphuric acid until some remains undissolved. The mixture is filtered. The filtrate is:',
  right: 'blue copper(II) sulphate solution',
  wrong: ['colourless copper(II) sulphate solution', 'black copper(II) oxide suspension', 'dilute sulphuric acid only'],
  sol: 'CuO + H₂SO₄ → CuSO₄ + H₂O; excess CuO stays on the filter paper — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('nh4-mcq', mcq({
  stem: 'Which salt is best prepared by the titration method?',
  right: 'Ammonium nitrate',
  wrong: ['Copper(II) sulphate', 'Lead(II) chloride', 'Barium sulphate'],
  sol: 'Ammonium hydroxide and ammonium nitrate are both soluble — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('cuo-ar', ar({
  a: 'Excess copper(II) oxide is used when preparing copper(II) sulphate from dilute sulphuric acid.',
  r: 'Excess copper(II) oxide makes sure all the acid is used up, and it can be removed by filtration.',
  key: 'c',
  sol: 'Both are true, and R explains A — option (c).',
  d: 2, c: 'understanding', t: [6],
}));
add('carbsalt-tf', tf({
  stem: 'Zinc sulphate can be prepared by adding zinc carbonate to dilute sulphuric acid.',
  key: 't',
  sol: 'True: ZnCO₃ + H₂SO₄ → ZnSO₄ + H₂O + CO₂.',
  d: 1, c: 'application', t: [6],
}));
add('cuso4-short1', short({
  marks: 1,
  stem: 'Write a balanced equation for preparing copper(II) sulphate from copper(II) oxide.',
  model: 'CuO + H₂SO₄ → CuSO₄ + H₂O.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 1, c: 'recall', t: [6],
}));
add('kno3-short1', short({
  marks: 1,
  stem: 'Name the method used to prepare potassium nitrate from potassium hydroxide and nitric acid.',
  model: 'Titration (neutralisation of an alkali by an acid).',
  sol: 'Titration.',
  scheme: [['Titration', 1]],
  d: 1, c: 'recall', t: [6],
}));
add('cuso4-num', num({
  marks: 2,
  stem: 'What mass of copper(II) oxide is needed to react exactly with 4.9 g of sulphuric acid? (Cu = 64, O = 16, H = 1, S = 32)',
  value: 4, tol: 0.02, unit: 'g',
  sol: 'CuO + H₂SO₄ → CuSO₄ + H₂O (1 : 1). Moles of H₂SO₄ = 4.9 ÷ 98 = 0.05; mass of CuO = 0.05 × 80 = 4 g.',
  scheme: [['0.05 mol', 1], ['4 g', 1]],
  d: 3, c: 'application', t: [6],
}), () => Math.abs((4.9 / 98) * 80 - 4) < 1e-9 || 'mass');
add('titr-short2', short({
  marks: 2,
  stem: 'Explain why (a) titration is used to prepare sodium chloride, and (b) an indicator is used in the first titration but not when the salt is finally made.',
  model: '(a) Both sodium hydroxide and sodium chloride are soluble, so excess alkali could not be removed; exact volumes of acid and alkali must be mixed. (b) The indicator finds the exact volumes; repeating without it gives a salt solution free from the indicator.',
  sol: 'Soluble base; pure product.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 3, c: 'analysis', t: [6],
}));
add('prep-short3', short({
  marks: 3,
  stem: 'Write balanced equations for preparing (a) sodium sulphate by titration, (b) calcium nitrate from calcium carbonate and (c) zinc sulphate from zinc oxide.',
  model: '(a) 2NaOH + H₂SO₄ → Na₂SO₄ + 2H₂O. (b) CaCO₃ + 2HNO₃ → Ca(NO₃)₂ + H₂O + CO₂. (c) ZnO + H₂SO₄ → ZnSO₄ + H₂O.',
  sol: 'Three equations.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [6],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('ions-long', long({
  stem: '(a) Define (i) an acid and (ii) an alkali in terms of the ions they produce in water. [2]\n\n(b) Write the ionisation equation for hydrochloric acid and the dissociation equation for sodium hydroxide. [2]\n\n(c) Give the colour of (i) litmus, (ii) methyl orange and (iii) phenolphthalein in a solution of pH 12. [3]\n\n(d) Solutions X, Y and Z have pH 2, 6 and 9. (i) Which is weakly acidic? (ii) Which contains more hydroxide ions than hydronium ions? (iii) Which would react most vigorously with magnesium ribbon? [3]',
  model: '(a) (i) A compound which in water gives hydronium ions as the only positive ions. (ii) A soluble base which in water gives hydroxide ions as the only negative ions.\n\n(b) HCl + H₂O → H₃O⁺ + Cl⁻; NaOH → Na⁺ + OH⁻.\n\n(c) (i) Blue. (ii) Yellow. (iii) Pink.\n\n(d) (i) Y. (ii) Z. (iii) X (highest concentration of hydronium ions).',
  sol: 'Definitions; equations; colours; pH reasoning.',
  scheme: [['(a)(i)', 1], ['(a)(ii)', 1], ['(b) HCl', 1], ['(b) NaOH', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(d)(i)', 1], ['(d)(ii)', 1], ['(d)(iii)', 1]],
  d: 2, c: 'application', t: [1, 2],
}));
add('salts-long', long({
  stem: '(a) What is a salt? Distinguish between a normal salt and an acid salt with one example of each. [3]\n\n(b) Why does hydrochloric acid not form an acid salt, while sulphuric acid does? [2]\n\n(c) Classify (i) Pb(OH)Cl, (ii) K₄Fe(CN)₆ and (iii) KNO₃. [3]\n\n(d) Write the equation for the formation of an acid salt from sodium hydroxide and sulphuric acid, and state the mole ratio used. [2]',
  model: '(a) A compound formed when the hydrogen ion of an acid is replaced, partly or completely, by a metal or ammonium ion. Normal salt: all replaceable H replaced (Na₂SO₄). Acid salt: only part replaced, so replaceable H remains (NaHSO₄).\n\n(b) HCl has only one replaceable hydrogen (monobasic); H₂SO₄ has two, so one can be left unreplaced.\n\n(c) (i) Basic salt. (ii) Complex salt. (iii) Normal salt.\n\n(d) NaOH + H₂SO₄ → NaHSO₄ + H₂O; NaOH : H₂SO₄ = 1 : 1.',
  sol: 'Definitions; basicity; classification; equation.',
  scheme: [['(a) definition', 1], ['(a) normal and acid with examples', 2], ['(b)', 2], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(d)', 2]],
  d: 2, c: 'understanding', t: [3],
}));
add('gases-long', long({
  stem: '(a) Write balanced equations for the action of dilute hydrochloric acid on (i) sodium carbonate and (ii) sodium sulphite. [2]\n\n(b) Both gases in (a) turn lime water milky. Describe one test that distinguishes them. [2]\n\n(c) Iron(II) sulphide is warmed with dilute sulphuric acid. (i) Write the equation. (ii) State the smell of the gas. (iii) Name the paper used to identify it and its colour change. [3]\n\n(d) 10.6 g of sodium carbonate reacts completely with dilute hydrochloric acid. Calculate (i) the moles of sodium carbonate, (ii) the volume of carbon dioxide at STP and (iii) the mass of sodium chloride formed. (Na = 23, C = 12, O = 16, Cl = 35.5; molar volume 22.4 L) [3]',
  model: '(a) (i) Na₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂. (ii) Na₂SO₃ + 2HCl → 2NaCl + H₂O + SO₂.\n\n(b) Pass each gas through acidified potassium dichromate: SO₂ turns it from orange to green; CO₂ has no effect.\n\n(c) (i) FeS + H₂SO₄ → FeSO₄ + H₂S. (ii) Rotten eggs. (iii) Lead acetate paper turns silvery black.\n\n(d) (i) M(Na₂CO₃) = 106; moles = 10.6 ÷ 106 = 0.1. (ii) CO₂ = 0.1 × 22.4 = 2.24 L. (iii) NaCl = 0.2 mol × 58.5 = 11.7 g.',
  sol: 'Equations; dichromate test; H₂S; calculation.',
  scheme: [['(a)(i)', 1], ['(a)(ii)', 1], ['(b)', 2], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(d)(i)', 1], ['(d)(ii)', 1], ['(d)(iii)', 1]],
  d: 3, c: 'application', t: [4],
}));
add('prep-long', long({
  stem: '(a) Name the method of preparation you would use for each salt and give a reason: (i) barium sulphate, (ii) iron(III) chloride. [2]\n\n(b) Write balanced equations for the preparations in (a). [2]\n\n(c) (i) Name a soluble salt prepared by displacement. (ii) Write the equation. (iii) Why cannot copper sulphate be made in the same way? [3]\n\n(d) Explain why lead chloride is prepared by precipitation and not by adding lead to dilute hydrochloric acid. Write the equation for the precipitation. [3]',
  model: '(a) (i) Precipitation: BaSO₄ is insoluble. (ii) Direct combination: iron with dilute HCl would give FeCl₂, not FeCl₃.\n\n(b) (i) BaCl₂ + Na₂SO₄ → BaSO₄ + 2NaCl. (ii) 2Fe + 3Cl₂ → 2FeCl₃.\n\n(c) (i) Zinc sulphate (or magnesium sulphate). (ii) Zn + H₂SO₄ → ZnSO₄ + H₂. (iii) Copper is below hydrogen in the activity series and does not displace hydrogen from dilute acids.\n\n(d) Lead chloride is insoluble in cold water, so it would coat the lead and stop the reaction; lead also reacts only very slowly with dilute HCl. Pb(NO₃)₂ + 2HCl → PbCl₂ + 2HNO₃ (or with NaCl).',
  sol: 'Methods and reasons; equations; displacement; precipitation.',
  scheme: [['(a)(i)', 1], ['(a)(ii)', 1], ['(b)(i)', 1], ['(b)(ii)', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(d) reason', 2], ['(d) equation', 1]],
  d: 4, c: 'analysis', t: [5],
}));
add('neutral-long', long({
  stem: '(a) Describe briefly how copper(II) sulphate solution is prepared from copper(II) oxide, and write the equation. [3]\n\n(b) Explain why potassium sulphate cannot be prepared in the same way. Name the method used instead. [3]\n\n(c) Write balanced equations for preparing (i) sodium chloride from sodium hydrogen carbonate and (ii) magnesium sulphate from magnesium carbonate. [2]\n\n(d) A student needs pure crystals of potassium nitrate. Suggest the reactants and explain the role of the indicator. [2]',
  model: '(a) Add black CuO a little at a time to warm dilute sulphuric acid until some remains undissolved (excess); filter off the excess; evaporate and crystallise. CuO + H₂SO₄ → CuSO₄ + H₂O.\n\n(b) Potassium hydroxide is soluble, so excess base cannot be filtered off and would contaminate the salt. Titration is used: exact volumes of KOH and H₂SO₄ are found and then mixed.\n\n(c) (i) NaHCO₃ + HCl → NaCl + H₂O + CO₂. (ii) MgCO₃ + H₂SO₄ → MgSO₄ + H₂O + CO₂.\n\n(d) Potassium hydroxide solution and dilute nitric acid; the indicator shows the exact neutralisation point in a trial titration, after which the same volumes are mixed without indicator and the solution is crystallised.',
  sol: 'Excess base; titration; carbonate routes; indicator.',
  scheme: [['(a) method', 2], ['(a) equation', 1], ['(b) reason', 2], ['(b) method', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(d)', 2]],
  d: 3, c: 'application', t: [6],
}));
