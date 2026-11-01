// ICSE 10 Chemistry ch10 Study of Compounds: Ammonia — question bank (ICSE 2027 specimen style: objective items,
// 1-mark equations / observations / names, a bracket completion, matches and 10-mark structured questions). Stems name
// their own substances, masses, volumes and set-ups. MCQ keys are placed by the builder; AR keys planned: a a b d c.
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const near = (a, b, tol = 1e-6) => Math.abs(a - b) <= tol;

// ---------------------------------------------------------------- t01 laboratory preparation
add('dryagent-mcq', mcq({
  stem: 'Ammonia made from ammonium chloride and slaked lime is passed through a drying tower before collection. The tower is packed with:',
  right: 'quicklime (calcium oxide)',
  wrong: ['concentrated sulphuric acid', 'phosphorus pentoxide', 'anhydrous calcium chloride'],
  sol: 'The other three react with ammonia — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('tilt-mcq', mcq({
  stem: 'In the laboratory preparation of ammonia, the round-bottomed flask is clamped in a slanting position with its mouth slightly lower than its base. This is done so that:',
  right: 'the water formed does not run back onto the hot part of the flask and crack it',
  wrong: ['the ammonia, being heavy, flows out more easily', 'quicklime can be added through the mouth during heating', 'the solid mixture melts evenly'],
  sol: '2NH₄Cl + Ca(OH)₂ → CaCl₂ + 2H₂O + 2NH₃ produces water, which would condense near the mouth — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('cacl2-ar', ar({
  a: 'Anhydrous calcium chloride is not used to dry ammonia.',
  r: 'Anhydrous calcium chloride combines with ammonia to form an addition compound.',
  key: 'a',
  sol: 'Both are true, and R explains A (CaCl₂·8NH₃ is formed) — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('prep-short1', short({
  marks: 1,
  stem: 'Write the balanced equation for the laboratory preparation of ammonia from ammonium chloride and slaked lime.',
  model: '2NH₄Cl + Ca(OH)₂ → CaCl₂ + 2H₂O + 2NH₃ (on heating).',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 2, c: 'application', t: [1],
}));
add('p2o5-short1', short({
  marks: 1,
  stem: 'Why is phosphorus pentoxide not used to dry ammonia?',
  model: 'Phosphorus pentoxide is an acidic oxide and reacts with the basic gas ammonia (forming ammonium phosphate).',
  sol: 'Acidic; reacts with ammonia.',
  scheme: [['Reacts with ammonia (acidic oxide)', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('drying-short2', short({
  marks: 2,
  stem: 'Ammonia is dried over quicklime. Give a reason why each of these cannot be used instead: (a) concentrated sulphuric acid; (b) anhydrous calcium chloride.',
  model: '(a) Concentrated sulphuric acid reacts with ammonia: 2NH₃ + H₂SO₄ → (NH₄)₂SO₄. (b) Anhydrous calcium chloride combines with ammonia to form the addition compound CaCl₂·8NH₃.',
  sol: 'Each reacts with ammonia.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('nh3vol-num', num({
  stem: 'A mixture of 10.7 g of ammonium chloride and excess slaked lime is heated until no more gas comes off. What volume of ammonia, measured at STP, is obtained? Give the answer in litres. (N = 14, H = 1, Cl = 35.5; one mole of a gas occupies 22.4 L at STP)',
  value: 4.48, tol: 0.01, unit: 'L',
  sol: r`$\ce{2NH4Cl + Ca(OH)2 -> CaCl2 + 2H2O + 2NH3}$: one mole of ammonium chloride gives one mole of ammonia. Molar mass of $\ce{NH4Cl} = 14 + 4 + 35.5 = 53.5$. Moles $= \dfrac{10.7}{53.5} = 0.2$. Volume of ammonia $= 0.2 \times 22.4 = 4.48$, so 4.48 L.`,
  scheme: [['Moles of NH₄Cl and 1 : 1 ratio', 1], ['4.48 L', 1]],
  marks: 2,
  d: 3, c: 'application', t: [1],
}), () => near((10.7 / 53.5) * 22.4, 4.48) || 'nh3vol');

// ---------------------------------------------------------------- t02 nitrides and ammonium salts
add('nitride-mcq', mcq({
  stem: 'Warm water is poured onto magnesium nitride, Mg₃N₂. The products are:',
  right: 'magnesium hydroxide and ammonia',
  wrong: ['magnesium oxide and nitrogen', 'magnesium hydroxide and nitrogen', 'magnesium and ammonia'],
  sol: 'Mg₃N₂ + 6H₂O → 3Mg(OH)₂ + 2NH₃ — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('alkali-mcq', mcq({
  stem: 'Which pair of substances gives ammonia when warmed together?',
  right: 'Ammonium sulphate and sodium hydroxide solution',
  wrong: ['Ammonium chloride and dilute hydrochloric acid', 'Sodium nitrate and water', 'Ammonium nitrate and dilute sulphuric acid'],
  sol: 'An ammonium salt warmed with an alkali gives ammonia: (NH₄)₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O + 2NH₃ — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('salt-ar', ar({
  a: 'Ammonium nitrate gives ammonia when it is warmed with potassium hydroxide solution.',
  r: 'A strong alkali displaces the weaker base, ammonia, from an ammonium salt.',
  key: 'a',
  sol: 'Both are true, and R explains A: NH₄NO₃ + KOH → KNO₃ + H₂O + NH₃ — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('nitride-tf', tf({
  stem: 'Aluminium nitride gives ammonia when it is warmed with water.',
  key: 't',
  sol: 'True: AlN + 3H₂O → Al(OH)₃ + NH₃.',
  d: 1, c: 'recall', t: [2],
}));
add('mg3n2-short1', short({
  marks: 1,
  stem: 'Write the balanced equation for the action of warm water on magnesium nitride.',
  model: 'Mg₃N₂ + 6H₂O → 3Mg(OH)₂ + 2NH₃.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 2, c: 'application', t: [2],
}));
add('aln-short1', short({
  marks: 1,
  stem: 'A sample of aluminium nitride is warmed with water and a pungent gas is given off. Name the gas and write the balanced equation.',
  model: 'Ammonia: AlN + 3H₂O → Al(OH)₃ + NH₃.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 1, c: 'application', t: [2],
}));
add('nh4salt-short2', short({
  marks: 2,
  stem: 'Write balanced equations for the formation of ammonia when (a) ammonium sulphate is warmed with sodium hydroxide solution and (b) ammonium nitrate is warmed with potassium hydroxide solution.',
  model: '(a) (NH₄)₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O + 2NH₃. (b) NH₄NO₃ + KOH → KNO₃ + H₂O + NH₃.',
  sol: 'Two equations.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 Haber's process
add('catalyst-mcq', mcq({
  stem: "In Haber's process for making ammonia, the catalyst and the promoter used are:",
  right: 'finely divided iron, with molybdenum as promoter',
  wrong: ['platinum gauze, with rhodium as promoter', 'vanadium pentoxide, with iron as promoter', 'nickel powder, with copper as promoter'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('ratio-mcq', mcq({
  stem: "Nitrogen and hydrogen are fed into the converter in Haber's process in the ratio, by volume, of:",
  right: '1 : 3',
  wrong: ['3 : 1', '1 : 1', '2 : 3'],
  sol: 'N₂ + 3H₂ ⇌ 2NH₃ — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('pressure-mcq', mcq({
  stem: "Haber's process is run at a high pressure (200–900 atm). High pressure favours the formation of ammonia because:",
  right: 'four volumes of reacting gases give only two volumes of ammonia',
  wrong: ['ammonia is lighter than air', 'the iron catalyst works only under pressure', 'high pressure makes the reaction endothermic'],
  sol: 'N₂ + 3H₂ ⇌ 2NH₃: 1 + 3 = 4 volumes become 2 volumes, so raising the pressure pushes the change towards ammonia — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('haber-ar', ar({
  a: "In Haber's process, the gas mixture leaving the catalyst chamber is cooled.",
  r: "Finely divided iron is the catalyst in Haber's process.",
  key: 'b',
  sol: 'Both are true, but the mixture is cooled so that ammonia liquefies and separates from unreacted nitrogen and hydrogen; the catalyst is not the reason — option (b).',
  d: 2, c: 'analysis', t: [3],
}));
add('haber-short1', short({
  marks: 1,
  stem: "Write the balanced equation for Haber's process, with the conditions.",
  model: 'N₂ + 3H₂ ⇌ 2NH₃ (+ heat); 450–500 °C, 200–900 atm, finely divided iron with molybdenum as promoter.',
  sol: 'Equation with conditions.',
  scheme: [['Balanced reversible equation with conditions', 1]],
  d: 1, c: 'application', t: [3],
}));
add('haber-short2', short({
  marks: 2,
  stem: "In Haber's process, how is ammonia separated from the unreacted gases, and what is done with these gases?",
  model: 'The gas mixture is cooled (under pressure), so ammonia, which liquefies much more easily, condenses and is drawn off. The unreacted nitrogen and hydrogen are mixed with fresh gases and recirculated over the catalyst.',
  sol: 'Cooling and liquefaction; recycling.',
  scheme: [['Ammonia liquefied by cooling', 1], ['Unreacted gases recycled', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('haber-num', num({
  stem: "In Haber's process, 60 L of hydrogen reacts completely with nitrogen. What volume of ammonia is formed, all volumes measured at the same temperature and pressure? Give the answer in litres.",
  value: 40, tol: 0.1, unit: 'L',
  sol: r`$\ce{N2 + 3H2 <=> 2NH3}$: 3 volumes of hydrogen give 2 volumes of ammonia (Gay-Lussac's law). Volume of ammonia $= 60 \times \dfrac{2}{3} = 40$, so 40 L.`,
  scheme: [['Volume ratio 3 : 2', 1], ['40 L', 1]],
  marks: 2,
  d: 2, c: 'application', t: [3],
}), () => near(60 * (2 / 3), 40) || 'haber');

// ---------------------------------------------------------------- t04 density, solubility, burning, catalytic oxidation
add('fountain-mcq', mcq({
  stem: 'In the fountain experiment, a flask of dry ammonia is inverted over water coloured with red litmus. The fountain that forms inside the flask is:',
  right: 'blue, because the solution of ammonia is alkaline',
  wrong: ['red, because ammonia is acidic', 'colourless, because ammonia bleaches litmus', 'green, because ammonia reacts with litmus'],
  sol: 'Ammonia is very soluble and forms ammonium hydroxide, an alkali — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('burn-mcq', mcq({
  stem: 'A jet of ammonia is lit in a jar of oxygen. It burns with:',
  right: 'a greenish-yellow flame, forming nitrogen and water vapour',
  wrong: ['a blue flame, forming nitric oxide and water', 'a lilac flame, forming nitrogen dioxide', 'no flame, because ammonia cannot burn in oxygen'],
  sol: '4NH₃ + 3O₂ → 2N₂ + 6H₂O — option (@K).',
  d: 2, c: 'recall', t: [4],
}));
add('pt-mcq', mcq({
  stem: 'A red-hot platinum coil is held just above concentrated ammonia solution in a conical flask while oxygen is bubbled through. The coil keeps glowing and reddish-brown fumes appear. The best explanation is that:',
  right: 'the catalytic oxidation of ammonia gives out heat, and the nitric oxide formed reacts with oxygen to form nitrogen dioxide',
  wrong: ['ammonia burns to nitrogen, which is reddish-brown', 'platinum reacts with ammonia to form a brown nitride', 'the coil heats the solution until ammonia decomposes to hydrogen'],
  sol: '4NH₃ + 5O₂ → 4NO + 6H₂O is exothermic, keeping the platinum hot; 2NO + O₂ → 2NO₂ gives the brown fumes — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('solub-ar', ar({
  a: 'Ammonia is collected over water.',
  r: 'Ammonia is extremely soluble in water.',
  key: 'd',
  sol: 'A is false: because it is extremely soluble, ammonia is collected by downward displacement of air. R is true — option (d).',
  d: 2, c: 'understanding', t: [4],
}));
add('burn-ar', ar({
  a: 'Ammonia burns in oxygen with a greenish-yellow flame.',
  r: 'Ammonia is a good supporter of combustion.',
  key: 'c',
  sol: 'A is true; R is false: ammonia neither burns in air nor supports combustion — option (c).',
  d: 2, c: 'understanding', t: [4],
}));
add('lighter-tf', tf({
  stem: 'Ammonia is lighter than air.',
  key: 't',
  sol: 'True: its vapour density is 8.5 (17 ÷ 2), less than about 14.4 for air.',
  d: 1, c: 'recall', t: [4],
}));
add('pink-fill', fill({
  stem: 'In the fountain experiment with ammonia, if the water in the trough contains a few drops of phenolphthalein, the fountain is ___ in colour.',
  acc: [['pink']],
  sol: 'The fountain is **pink**, because ammonia solution is alkaline.',
  d: 1, c: 'application', t: [4],
}));
add('catox-short1', short({
  marks: 1,
  stem: 'Write the balanced equation, with the conditions, for the catalytic oxidation of ammonia.',
  model: '4NH₃ + 5O₂ → 4NO + 6H₂O (platinum catalyst, about 800 °C).',
  sol: 'Equation with Pt and 800 °C.',
  scheme: [['Balanced equation with conditions', 1]],
  d: 2, c: 'application', t: [4],
}));
add('catox-short2', short({
  marks: 2,
  stem: 'Compare the burning of ammonia in oxygen with its catalytic oxidation, giving the balanced equation for each.',
  model: 'Burning (ammonia lit in oxygen, no catalyst): 4NH₃ + 3O₂ → 2N₂ + 6H₂O, with a greenish-yellow flame; nitrogen is formed. Catalytic oxidation (over platinum at about 800 °C): 4NH₃ + 5O₂ → 4NO + 6H₂O; nitric oxide is formed, the first step in making nitric acid.',
  sol: 'Different products and conditions.',
  scheme: [['Burning with equation', 1], ['Catalytic oxidation with equation', 1]],
  d: 3, c: 'analysis', t: [4],
}));
add('fountain-short3', short({
  marks: 3,
  stem: 'In the fountain experiment with ammonia: (a) how is the flask filled with ammonia, and why must it be dry? (b) why does the water rise into the flask? (c) what colour is the fountain if the water contains phenolphthalein, and why?',
  model: '(a) The flask is held upside down over the delivery tube and filled by downward displacement of air; it must be dry, because any water would dissolve the ammonia before the experiment. (b) A few drops of water dissolve a large volume of ammonia, the pressure in the flask falls, and the outside air pressure pushes the water up the jet. (c) Pink, because ammonia dissolves to form ammonium hydroxide, which is alkaline.',
  sol: 'Filling; pressure; alkaline solution.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- t05 reducing and other reactions
add('cuo-mcq', mcq({
  stem: 'Dry ammonia is passed over heated copper(II) oxide in a hard-glass tube. The observation is:',
  right: 'the black solid turns reddish-brown and droplets of water form in the cooler part of the tube',
  wrong: ['the black solid turns white and brown fumes of nitrogen dioxide appear', 'the black solid turns blue and dense white fumes appear', 'there is no change, because ammonia is not a reducing agent'],
  sol: '3CuO + 2NH₃ → 3Cu + 3H₂O + N₂ — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('excessnh3-mcq', mcq({
  stem: 'Chlorine gas is passed into an excess of ammonia. The products are:',
  right: 'ammonium chloride and nitrogen',
  wrong: ['nitrogen trichloride and hydrogen chloride', 'ammonium chloride and hydrogen', 'nitrogen and hydrogen chloride only'],
  sol: '8NH₃ + 3Cl₂ → 6NH₄Cl + N₂: the hydrogen chloride formed combines with the excess ammonia — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('excesscl-mcq', mcq({
  stem: 'When ammonia reacts with an excess of chlorine, a yellow, highly explosive liquid is formed. It is:',
  right: 'nitrogen trichloride',
  wrong: ['ammonium chloride', 'nitrogen dioxide', 'hydrogen chloride'],
  sol: 'NH₃ + 3Cl₂ → NCl₃ + 3HCl — option (@K).',
  d: 2, c: 'recall', t: [5],
}));
add('reduce-tf', tf({
  stem: 'In the reaction of ammonia with hot copper(II) oxide, ammonia acts as an oxidising agent.',
  key: 'f',
  sol: 'False: ammonia removes oxygen from copper(II) oxide, so it is a reducing agent (it is itself oxidised to nitrogen).',
  d: 2, c: 'understanding', t: [5],
}));
add('cuo-short1', short({
  marks: 1,
  stem: 'Write the balanced equation for the reaction of ammonia with heated copper(II) oxide.',
  model: '3CuO + 2NH₃ → 3Cu + 3H₂O + N₂.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 2, c: 'application', t: [5],
}));
add('pbo2-short1', short({
  marks: 1,
  stem: 'Write the balanced equation for the reduction of heated lead(IV) oxide by ammonia.',
  model: '3PbO₂ + 4NH₃ → 3Pb + 6H₂O + 2N₂.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 3, c: 'application', t: [5],
}));
add('cl2excess-short1', short({
  marks: 1,
  stem: 'Write the balanced equation for the reaction of ammonia with an excess of chlorine.',
  model: 'NH₃ + 3Cl₂ → NCl₃ + 3HCl.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 2, c: 'application', t: [5],
}));
add('ncl3-fill', fill({
  stem: 'When ammonia reacts with excess chlorine, the yellow explosive liquid formed is ___.',
  acc: [['nitrogen trichloride', 'NCl3', 'NCl₃']],
  sol: '**Nitrogen trichloride**, NCl₃.',
  d: 1, c: 'recall', t: [5],
}));
add('chlorine-short2', short({
  marks: 2,
  stem: 'Ammonia reacts with chlorine in two different ways. Write the balanced equation for the reaction when (a) ammonia is in excess and (b) chlorine is in excess, and name the main product in each case.',
  model: '(a) 8NH₃ + 3Cl₂ → 6NH₄Cl + N₂; dense white fumes of ammonium chloride (and nitrogen). (b) NH₃ + 3Cl₂ → NCl₃ + 3HCl; nitrogen trichloride, a yellow explosive liquid.',
  sol: 'Two equations and products.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 3, c: 'analysis', t: [5],
}));
add('cuo-num', num({
  stem: 'Dry ammonia is passed over 7.95 g of heated copper(II) oxide until the reaction is complete. What mass of copper, in grams, is formed? (Cu = 63.5, O = 16)',
  value: 6.35, tol: 0.01, unit: 'g',
  sol: r`$\ce{3CuO + 2NH3 -> 3Cu + 3H2O + N2}$: one mole of CuO gives one mole of Cu. Molar mass of CuO $= 63.5 + 16 = 79.5$. Moles $= \dfrac{7.95}{79.5} = 0.1$. Mass of copper $= 0.1 \times 63.5 = 6.35$, so 6.35 g.`,
  scheme: [['Moles of CuO', 1], ['6.35 g', 1]],
  marks: 2,
  d: 2, c: 'application', t: [5],
}), () => near((7.95 / 79.5) * 63.5, 6.35) || 'cuo');
add('reduce-short3', short({
  marks: 3,
  stem: 'Dry ammonia is passed over heated copper(II) oxide. (a) State two observations. (b) Write the balanced equation. (c) Name the gas that passes out of the tube and state the property of ammonia shown by this reaction.',
  model: '(a) The black copper(II) oxide turns reddish-brown (copper), and droplets of a colourless liquid (water) collect in the cooler part of the tube. (b) 3CuO + 2NH₃ → 3Cu + 3H₂O + N₂. (c) Nitrogen; ammonia acts as a reducing agent.',
  sol: 'Observations; equation; nitrogen and reducing nature.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [5],
}));

// ---------------------------------------------------------------- t06 aqueous ammonia
add('fecl3-mcq', mcq({
  stem: 'Which salt solution gives a reddish-brown precipitate, insoluble in excess, when ammonium hydroxide is added?',
  right: 'Iron(III) chloride',
  wrong: ['Iron(II) sulphate', 'Zinc nitrate', 'Lead nitrate'],
  sol: 'FeCl₃ + 3NH₄OH → Fe(OH)₃ + 3NH₄Cl; iron(III) hydroxide is reddish-brown — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('zinc-mcq', mcq({
  stem: 'Ammonium hydroxide is added drop by drop to a colourless salt solution: a white gelatinous precipitate forms, which dissolves in excess to give a colourless solution. The salt is most likely:',
  right: 'zinc nitrate',
  wrong: ['lead nitrate', 'iron(II) sulphate', 'copper sulphate'],
  sol: 'Zinc hydroxide dissolves in excess ammonium hydroxide; lead hydroxide does not; the iron and copper compounds are coloured — option (@K).',
  d: 3, c: 'analysis', t: [6],
}));
add('pb-tf', tf({
  stem: 'The white precipitate of lead hydroxide dissolves in excess ammonium hydroxide.',
  key: 'f',
  sol: 'False: lead hydroxide is insoluble in excess ammonium hydroxide; zinc hydroxide dissolves.',
  d: 2, c: 'recall', t: [6],
}));
add('neutral-short1', short({
  marks: 1,
  stem: 'Write the balanced equation for the neutralisation of dilute sulphuric acid by ammonium hydroxide.',
  model: '2NH₄OH + H₂SO₄ → (NH₄)₂SO₄ + 2H₂O.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 2, c: 'application', t: [6],
}));
add('pbno3-short1', short({
  marks: 1,
  stem: 'Write the balanced equation for the reaction of ammonium hydroxide with lead nitrate solution.',
  model: 'Pb(NO₃)₂ + 2NH₄OH → Pb(OH)₂ + 2NH₄NO₃.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 2, c: 'application', t: [6],
}));
add('cu-short2', short({
  marks: 2,
  stem: 'Ammonium hydroxide is added to copper sulphate solution, first a little and then in excess. State the observation at each stage and write the equation for the first stage.',
  model: 'A little: a pale blue precipitate of copper(II) hydroxide: CuSO₄ + 2NH₄OH → Cu(OH)₂ + (NH₄)₂SO₄. In excess: the precipitate dissolves to give a deep (inky) blue solution of tetraamminecopper(II) sulphate.',
  sol: 'Pale blue precipitate; deep blue solution.',
  scheme: [['Observations at both stages', 1], ['Equation', 1]],
  d: 3, c: 'application', t: [6],
}));
add('identify-short3', short({
  marks: 3,
  stem: 'Ammonium hydroxide is added drop by drop and then in excess to three solutions. P gives a reddish-brown precipitate that does not dissolve; Q gives a white precipitate that dissolves in excess; R gives a pale blue precipitate that dissolves to form a deep blue solution. (a) Name the cation present in each solution. (b) Write the balanced equation for the precipitate formed by P, taking P to be a chloride.',
  model: '(a) P: iron(III), Fe³⁺; Q: zinc, Zn²⁺; R: copper(II), Cu²⁺. (b) FeCl₃ + 3NH₄OH → Fe(OH)₃ + 3NH₄Cl.',
  sol: 'Identify from colours and solubility in excess.',
  scheme: [['(a) P and Q', 1], ['(a) R', 1], ['(b)', 1]],
  d: 3, c: 'analysis', t: [6],
}));
add('ppt-match', match({
  stem: 'Ammonium hydroxide is added, first a little and then in excess, to each solution in Column A. Match each with the observation in Column B.',
  pairs: [
    ['Iron(III) chloride', 'Reddish-brown precipitate, insoluble in excess'],
    ['Iron(II) sulphate', 'Dirty green precipitate, insoluble in excess'],
    ['Lead nitrate', 'Chalky white precipitate, insoluble in excess'],
    ['Zinc nitrate', 'White gelatinous precipitate, soluble in excess'],
    ['Copper sulphate', 'Pale blue precipitate that dissolves to a deep blue solution'],
  ],
  order: [3, 0, 4, 1, 2],
  sol: 'Iron(III) → reddish-brown Fe(OH)₃; iron(II) → dirty green Fe(OH)₂; lead → chalky white Pb(OH)₂; zinc → white Zn(OH)₂ that dissolves; copper → pale blue Cu(OH)₂ that dissolves to a deep blue solution.',
  d: 2, c: 'application', t: [6],
}));

// ---------------------------------------------------------------- t07 uses, refrigerants, tests
add('refrig-mcq', mcq({
  stem: 'Liquid ammonia is used as the refrigerant in ice plants and cold stores because it:',
  right: 'absorbs a large amount of heat from its surroundings when it evaporates',
  wrong: ['is a good conductor of electricity', 'is heavier than air and sinks', 'does not dissolve in water'],
  sol: 'Its high latent heat of vaporisation cools the surroundings — option (@K).',
  d: 2, c: 'understanding', t: [7],
}));
add('cfc-mcq', mcq({
  stem: 'Chlorofluorocarbons (CFCs) are being replaced as refrigerants mainly because they:',
  right: 'release chlorine in the upper atmosphere, which destroys the ozone layer',
  wrong: ['spoil the food stored in refrigerators', 'are too costly to liquefy', 'react with the copper pipes of the cooling coil'],
  sol: 'CFCs are ozone-depleting; ozone-safe refrigerants such as HFCs, hydrocarbons or ammonia are used instead — option (@K).',
  d: 2, c: 'understanding', t: [7],
}));
add('test-mcq', mcq({
  stem: 'A colourless gas with a pungent smell is suspected to be ammonia. Which result confirms it?',
  right: 'Moist red litmus turns blue, and a rod dipped in concentrated hydrochloric acid gives dense white fumes',
  wrong: ['Lime water turns milky, and moist blue litmus turns red', 'A burning splint is put out with a pop', 'Acidified potassium dichromate paper turns from orange to green'],
  sol: 'Ammonia is the common alkaline gas, and NH₃ + HCl → NH₄Cl — option (@K).',
  d: 1, c: 'recall', t: [7],
}));
add('fertiliser-mcq', mcq({
  stem: 'Which of these is NOT a fertiliser made from ammonia?',
  right: 'Calcium carbonate',
  wrong: ['Urea', 'Ammonium sulphate', 'Ammonium nitrate'],
  sol: 'Calcium carbonate contains no nitrogen — option (@K).',
  d: 1, c: 'application', t: [7],
}));
add('use-fill', fill({
  stem: "Ammonia is oxidised in Ostwald's process to manufacture ___ acid.",
  acc: [['nitric']],
  sol: '**Nitric** acid.',
  d: 1, c: 'recall', t: [7],
}));
add('use-short1', short({
  marks: 1,
  stem: 'Name one nitrogenous fertiliser made from ammonia, and give its formula.',
  model: 'Ammonium sulphate, (NH₄)₂SO₄ (or urea, CO(NH₂)₂; ammonium nitrate, NH₄NO₃).',
  sol: 'One fertiliser.',
  scheme: [['Fertiliser and formula', 1]],
  d: 1, c: 'recall', t: [7],
}));
add('cfc-short2', short({
  marks: 2,
  stem: 'Why are chlorofluorocarbons no longer used as refrigerants? Name one refrigerant used in their place.',
  model: 'CFCs rise to the upper atmosphere, where sunlight breaks them down and the chlorine released destroys the ozone layer, which protects us from ultraviolet rays. They are replaced by non-ozone-depleting refrigerants such as hydrofluorocarbons (HFCs), hydrocarbons, or ammonia itself.',
  sol: 'Ozone depletion; one alternative.',
  scheme: [['Reason', 1], ['Alternative', 1]],
  d: 2, c: 'understanding', t: [7],
}));
add('gas-fill', fill({
  stem: 'Complete each sentence by choosing the correct word from the bracket.\n\n(a) Ammonia is collected by ___ (upward / downward) displacement of air.\n\n(b) Ammonia is dried by passing it over ___ (quicklime / phosphorus pentoxide).\n\n(c) A solution of ammonia turns phenolphthalein ___ (pink / colourless).',
  acc: [['downward'], ['quicklime', 'calcium oxide'], ['pink']],
  sol: '(a) **downward**; (b) **quicklime**; (c) **pink**.',
  d: 1, c: 'recall', t: [1, 4],
}));
add('reaction-match', match({
  stem: 'Match each reaction of ammonia in Column A with its products in Column B.',
  pairs: [
    ['Ammonia with excess chlorine', 'Nitrogen trichloride and hydrogen chloride'],
    ['Excess ammonia with chlorine', 'Ammonium chloride and nitrogen'],
    ['Ammonia and oxygen over platinum at 800 °C', 'Nitric oxide and water'],
    ['Ammonia burnt in oxygen', 'Nitrogen and water'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Excess chlorine → NCl₃ + HCl; excess ammonia → NH₄Cl + N₂; catalytic oxidation → NO + H₂O; burning → N₂ + H₂O.',
  d: 3, c: 'analysis', t: [4, 5],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('prep-long', long({
  stem: '(a) Write the balanced equation for the laboratory preparation of ammonia from ammonium chloride. [2]\n\n(b) Why is the flask clamped with its mouth slightly downwards, and why is the gas passed over quicklime? [2]\n\n(c) Name the method of collecting ammonia, give a reason for it, and state how you would know that the gas jar is full. [3]\n\n(d) Write balanced equations for the formation of ammonia from (i) magnesium nitride and warm water, (ii) aluminium nitride and warm water, (iii) ammonium sulphate and sodium hydroxide solution. [3]',
  model: '(a) 2NH₄Cl + Ca(OH)₂ → CaCl₂ + 2H₂O + 2NH₃ (on heating).\n\n(b) Water formed in the reaction must not run back onto the hot part of the flask and crack it. Quicklime dries the gas without reacting with it (the gas is basic).\n\n(c) Downward displacement of air (inverted jar), because ammonia is lighter than air (vapour density 8.5) and is too soluble to collect over water. Moist red litmus held at the mouth turns blue (or a rod dipped in concentrated hydrochloric acid gives dense white fumes).\n\n(d) (i) Mg₃N₂ + 6H₂O → 3Mg(OH)₂ + 2NH₃. (ii) AlN + 3H₂O → Al(OH)₃ + NH₃. (iii) (NH₄)₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O + 2NH₃.',
  sol: 'Equation; slanting flask and drying; collection and test; three equations.',
  scheme: [['(a) formulae', 1], ['(a) balancing', 1], ['(b) slanting flask', 1], ['(b) quicklime', 1], ['(c) method', 1], ['(c) reason', 1], ['(c) test', 1], ['(d)(i)', 1], ['(d)(ii)', 1], ['(d)(iii)', 1]],
  d: 2, c: 'application', t: [1, 2],
}));
add('haber-long', long({
  stem: "(a) Write the balanced equation for Haber's process and state whether the forward reaction is exothermic or endothermic. [2]\n\n(b) State the temperature and pressure used. [2]\n\n(c) Name the catalyst and the promoter, and state the ratio by volume in which nitrogen and hydrogen are mixed. [3]\n\n(d) Explain how ammonia is separated from the gas mixture leaving the converter, what happens to the unreacted gases, and why high pressure favours the yield of ammonia. [3]",
  model: '(a) N₂ + 3H₂ ⇌ 2NH₃; the forward reaction is exothermic (heat is given out).\n\n(b) About 450–500 °C and 200–900 atm.\n\n(c) Catalyst: finely divided iron; promoter: molybdenum; N₂ : H₂ = 1 : 3 by volume.\n\n(d) The mixture is cooled, so ammonia liquefies and is removed. The unreacted nitrogen and hydrogen are recirculated over the catalyst with fresh gases. Four volumes of reactants give two volumes of ammonia, so high pressure favours the side with fewer gas molecules.',
  sol: 'Equation and heat change; conditions; catalyst, promoter, ratio; separation, recycling, pressure.',
  scheme: [['(a) equation', 1], ['(a) exothermic', 1], ['(b) temperature', 1], ['(b) pressure', 1], ['(c) catalyst', 1], ['(c) promoter', 1], ['(c) ratio', 1], ['(d) separation', 1], ['(d) recycling', 1], ['(d) pressure', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('oxid-long', long({
  stem: '(a) Describe what is seen in the fountain experiment with ammonia when the water contains red litmus, and name the two properties of ammonia it shows. [2]\n\n(b) Write the balanced equation for the burning of ammonia in oxygen, and state the colour of the flame. [2]\n\n(c) Write the balanced equation for the catalytic oxidation of ammonia, with its conditions, and explain why the platinum catalyst keeps glowing once the reaction has started. [3]\n\n(d) 40 L of ammonia undergoes complete catalytic oxidation. Calculate (i) the volume of oxygen used and (ii) the volume of nitric oxide formed, all volumes at the same temperature and pressure. State the law you used. [3]',
  model: r`(a) Water rushes up into the flask as a fountain, and the red litmus turns blue. Ammonia is extremely soluble in water, and its solution is alkaline.

(b) 4NH₃ + 3O₂ → 2N₂ + 6H₂O; a greenish-yellow flame.

(c) 4NH₃ + 5O₂ → 4NO + 6H₂O, over platinum at about 800 °C. The reaction is exothermic, so the heat it gives out keeps the platinum red-hot.

(d) By Gay-Lussac's law of combining volumes, 4 volumes of ammonia use 5 volumes of oxygen and give 4 volumes of nitric oxide. (i) Volume of oxygen $= 40 \times \dfrac{5}{4} = 50$, that is 50 L. (ii) Volume of nitric oxide $= 40 \times \dfrac{4}{4} = 40$, that is 40 L.`,
  sol: 'Fountain; burning; catalytic oxidation; volumes from the 4 : 5 : 4 ratio.',
  scheme: [['(a) observation', 1], ['(a) properties', 1], ['(b) equation', 1], ['(b) flame', 1], ['(c) equation', 1], ['(c) conditions', 1], ['(c) exothermic', 1], ['(d)(i) 50 L', 1], ['(d)(ii) 40 L', 1], ['(d) law', 1]],
  d: 3, c: 'application', t: [4],
}));
add('reduce-long', long({
  stem: '(a) Write the balanced equation for the reaction of ammonia with heated copper(II) oxide, and state the colour change. [2]\n\n(b) Which property of ammonia does this reaction show? Name the gas that is collected at the end of the apparatus. [2]\n\n(c) Write balanced equations for the reaction of ammonia with chlorine when (i) ammonia is in excess and (ii) chlorine is in excess, and state one observation for (i). [3]\n\n(d) 23.85 g of copper(II) oxide is completely reduced by ammonia. Calculate (i) the mass of copper formed and (ii) the volume of nitrogen formed at STP. (Cu = 63.5, O = 16; molar volume 22.4 L) [3]',
  model: r`(a) 3CuO + 2NH₃ → 3Cu + 3H₂O + N₂; the black solid turns reddish-brown.

(b) Ammonia is a reducing agent. Nitrogen.

(c) (i) 8NH₃ + 3Cl₂ → 6NH₄Cl + N₂; dense white fumes of ammonium chloride. (ii) NH₃ + 3Cl₂ → NCl₃ + 3HCl.

(d) Molar mass of CuO $= 63.5 + 16 = 79.5$; moles of CuO $= \dfrac{23.85}{79.5} = 0.3$. (i) Mass of copper $= 0.3 \times 63.5 = 19.05$, that is 19.05 g. (ii) 3 moles of CuO give 1 mole of N₂, so moles of nitrogen $= \dfrac{0.3}{3} = 0.1$ and volume $= 0.1 \times 22.4 = 2.24$, that is 2.24 L.`,
  sol: 'Reduction of CuO; reducing agent; chlorine reactions; 19.05 g Cu and 2.24 L N₂.',
  scheme: [['(a) equation', 1], ['(a) colour change', 1], ['(b) reducing agent', 1], ['(b) nitrogen', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c) observation', 1], ['(d) moles of CuO', 1], ['(d)(i) 19.05 g', 1], ['(d)(ii) 2.24 L', 1]],
  d: 4, c: 'application', t: [5],
}));
add('aqueous-long', long({
  stem: '(a) Write balanced equations for the neutralisation of (i) dilute nitric acid and (ii) dilute hydrochloric acid by ammonium hydroxide. [2]\n\n(b) Ammonium hydroxide is added to iron(III) chloride solution. State the observation and write the balanced equation. [2]\n\n(c) Ammonium hydroxide is added to copper sulphate solution, first a little and then in excess. State the observation at each stage, and write the equation for the first stage. [3]\n\n(d) You are given solutions of zinc nitrate and lead nitrate. Explain how ammonium hydroxide can be used to tell them apart, and write the equation for the precipitate formed with zinc nitrate. [3]',
  model: '(a) (i) NH₄OH + HNO₃ → NH₄NO₃ + H₂O. (ii) NH₄OH + HCl → NH₄Cl + H₂O.\n\n(b) A reddish-brown precipitate of iron(III) hydroxide: FeCl₃ + 3NH₄OH → Fe(OH)₃ + 3NH₄Cl.\n\n(c) A little: a pale blue precipitate. In excess: it dissolves to give a deep (inky) blue solution. First stage: CuSO₄ + 2NH₄OH → Cu(OH)₂ + (NH₄)₂SO₄.\n\n(d) Add ammonium hydroxide a little at a time, then in excess. Both give white precipitates at first; the zinc hydroxide dissolves in excess ammonium hydroxide to a colourless solution, but the lead hydroxide does not. Zn(NO₃)₂ + 2NH₄OH → Zn(OH)₂ + 2NH₄NO₃.',
  sol: 'Neutralisation; iron(III) hydroxide; copper hydroxide and its solution in excess; zinc versus lead.',
  scheme: [['(a)(i)', 1], ['(a)(ii)', 1], ['(b) observation', 1], ['(b) equation', 1], ['(c) first stage', 1], ['(c) excess', 1], ['(c) equation', 1], ['(d) method and observations', 2], ['(d) equation', 1]],
  d: 3, c: 'analysis', t: [6],
}));
