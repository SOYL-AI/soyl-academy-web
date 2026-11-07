// ICSE 10 Chemistry ch04 Analytical Chemistry — question bank (ICSE 2027 specimen style: objective items, 1-mark
// equations / observations / names, a bracket completion, matches and 10-mark structured questions). Stems name their
// own salts, solutions, masses and set-ups. MCQ keys are placed by the builder; AR keys planned: a c b d a.
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const near = (a, b, tol = 1e-6) => Math.abs(a - b) <= tol;

// ---------------------------------------------------------------- t01 colours of salts and solutions
add('colour-mcq', mcq({
  stem: 'A few crystals of iron(III) chloride are dissolved in distilled water. The colour of the solution is:',
  right: 'yellowish brown',
  wrong: ['pale green', 'blue', 'colourless'],
  sol: 'Iron(III) salts give yellowish-brown solutions; pale green is the colour of iron(II) solutions — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('crystal-mcq', mcq({
  stem: 'Four bottles hold solutions of copper(II) nitrate, iron(II) sulphate, iron(III) chloride and zinc sulphate. The only colourless solution is that of:',
  right: 'zinc sulphate',
  wrong: ['copper(II) nitrate', 'iron(II) sulphate', 'iron(III) chloride'],
  sol: 'Zinc salts are white and dissolve to colourless solutions; the others are blue, pale green and yellowish brown — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('leadcolour-mcq', mcq({
  stem: 'Which lead compound is correctly matched with its colour?',
  right: 'Red lead, Pb₃O₄ — bright red',
  wrong: ['Lead(IV) oxide, PbO₂ — white', 'Lead nitrate crystals — blue', 'Lead(II) hydroxide — reddish brown'],
  sol: 'Pb₃O₄ is bright red; PbO₂ is dark brown, lead nitrate is white and Pb(OH)₂ is white — option (@K).',
  d: 2, c: 'recall', t: [1],
}));
add('colour-tf', tf({
  stem: 'Solutions of zinc sulphate and lead nitrate in water are colourless.',
  key: 't',
  sol: 'True: zinc and lead salts are white and give colourless solutions.',
  d: 1, c: 'recall', t: [1],
}));
add('colour-short1', short({
  marks: 1,
  stem: 'State the colour of the solution formed when crystals of copper(II) nitrate dissolve in water.',
  model: 'Blue.',
  sol: 'Copper(II) salts give blue solutions.',
  scheme: [['Blue', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('colour-match', match({
  stem: 'Match each substance in Column A with its colour in Column B.',
  pairs: [
    ['Iron(II) sulphate crystals', 'Pale green'],
    ['Iron(III) chloride solution', 'Yellowish brown'],
    ['Copper(II) oxide', 'Black'],
    ['Zinc oxide, while hot', 'Yellow'],
    ['Red lead, Pb₃O₄', 'Bright red'],
  ],
  order: [2, 4, 0, 3, 1],
  sol: 'Iron(II) sulphate crystals → pale green; iron(III) chloride solution → yellowish brown; copper(II) oxide → black; zinc oxide while hot → yellow (white when cold); red lead → bright red.',
  d: 1, c: 'recall', t: [1],
}));

// ---------------------------------------------------------------- t02 sodium hydroxide on salt solutions
add('fe2-chk-mcq', mcq({
  stem: 'A few drops of sodium hydroxide solution are added to a freshly prepared pale green solution of iron(II) sulphate, and then more alkali is added. The observations are:',
  right: 'a dirty green precipitate that does not dissolve in excess',
  wrong: ['a reddish-brown precipitate that dissolves in excess', 'a white precipitate that dissolves in excess', 'a pale blue precipitate that does not dissolve in excess'],
  sol: 'FeSO₄ + 2NaOH → Fe(OH)₂ + Na₂SO₄; iron(II) hydroxide is dirty green and insoluble in excess — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('fe3-mcq', mcq({
  stem: 'Sodium hydroxide solution is added drop by drop to a yellowish-brown solution of iron(III) chloride. The precipitate formed is:',
  right: 'Fe(OH)₃, reddish brown',
  wrong: ['Fe(OH)₂, dirty green', 'Fe(OH)₃, dirty green', 'Fe(OH)₂, reddish brown'],
  sol: 'FeCl₃ + 3NaOH → Fe(OH)₃ + 3NaCl; iron(III) hydroxide is reddish brown — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('cu-naoh-mcq', mcq({
  stem: 'Sodium hydroxide solution is added a little at a time, and then in excess, to a blue solution of copper(II) nitrate. What is seen?',
  right: 'A pale blue precipitate forms and stays in excess',
  wrong: ['A pale blue precipitate forms and dissolves in excess to a deep blue solution', 'A white precipitate forms and dissolves in excess', 'No precipitate forms; the blue colour only deepens'],
  sol: 'Cu(NO₃)₂ + 2NaOH → Cu(OH)₂ + 2NaNO₃; copper(II) hydroxide does not dissolve in excess sodium hydroxide (it is excess ammonium hydroxide that gives the deep blue solution) — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('whiteppt-mcq', mcq({
  stem: 'Sodium hydroxide solution is added drop by drop, and then in excess, to two colourless solutions: lead nitrate in tube 1 and zinc sulphate in tube 2. Which statement is correct?',
  right: 'Both tubes give white precipitates that dissolve in excess',
  wrong: ['Only tube 1 gives a precipitate that dissolves in excess', 'Only tube 2 gives a precipitate that dissolves in excess', 'Neither tube gives a precipitate'],
  sol: 'Pb(OH)₂ and Zn(OH)₂ are both white and amphoteric; they dissolve in excess NaOH as sodium plumbite and sodium zincate — option (@K).',
  d: 2, c: 'analysis', t: [2],
}));
add('ca-naoh-mcq', mcq({
  stem: 'A colourless solution gives a white precipitate with a few drops of sodium hydroxide solution, and the precipitate does not dissolve when more alkali is added. The solution could be:',
  right: 'calcium nitrate',
  wrong: ['zinc nitrate', 'lead nitrate', 'iron(II) sulphate'],
  sol: 'Zinc and lead hydroxides dissolve in excess NaOH; iron(II) gives a dirty green precipitate from a pale green solution. Calcium hydroxide is white and stays — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('fe-oxid-mcq', mcq({
  stem: 'The dirty green precipitate obtained from iron(II) sulphate and sodium hydroxide is left in an open test tube. After some time its surface turns reddish brown. This is because:',
  right: 'iron(II) hydroxide is oxidised by air to iron(III) hydroxide',
  wrong: ['iron(II) hydroxide dissolves in the excess alkali', 'iron(III) hydroxide is reduced by air to iron(II) hydroxide', 'sodium hydroxide reduces the precipitate to iron'],
  sol: 'Oxygen of the air oxidises Fe(OH)₂ (dirty green) to Fe(OH)₃ (reddish brown) — option (@K).',
  d: 3, c: 'understanding', t: [2],
}));
add('fe-ar', ar({
  a: 'A solution of iron(II) sulphate can be told apart from a solution of iron(III) chloride by adding sodium hydroxide solution.',
  r: 'Iron(II) hydroxide and iron(III) hydroxide both dissolve in excess sodium hydroxide solution.',
  key: 'a',
  sol: 'A is true: the precipitates differ in colour (dirty green and reddish brown). R is false: neither hydroxide dissolves in excess NaOH — option (a).',
  d: 2, c: 'application', t: [2],
}));
add('zincate-ar', ar({
  a: 'When sodium hydroxide solution is added in excess to zinc sulphate solution, the white precipitate first formed disappears.',
  r: 'Zinc hydroxide reacts with sodium hydroxide to form sodium zincate, which is soluble in water.',
  key: 'c',
  sol: 'Both are true, and R explains A: Zn(OH)₂ + 2NaOH → Na₂ZnO₂ + 2H₂O — option (c).',
  d: 2, c: 'understanding', t: [2, 5],
}));
add('naoh-tf', tf({
  stem: 'Copper(II) hydroxide dissolves in excess sodium hydroxide solution, giving a deep blue solution.',
  key: 'f',
  sol: 'False: the pale blue precipitate does not dissolve in excess sodium hydroxide. The deep blue solution forms with excess ammonium hydroxide.',
  d: 2, c: 'understanding', t: [2],
}));
add('precip-fill', fill({
  stem: 'Sodium hydroxide solution added to a pale green solution of iron(II) sulphate gives a ___ green precipitate.',
  acc: [['dirty']],
  sol: 'A **dirty** green precipitate of iron(II) hydroxide.',
  d: 1, c: 'recall', t: [2],
}));
add('fe2-short1', short({
  marks: 1,
  stem: 'Write the balanced equation for the reaction between iron(II) sulphate solution and sodium hydroxide solution.',
  model: 'FeSO₄ + 2NaOH → Fe(OH)₂ + Na₂SO₄.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 1, c: 'application', t: [2],
}));
add('pb-short1', short({
  marks: 1,
  stem: 'Write the balanced equation for the reaction of lead nitrate solution with a few drops of sodium hydroxide solution.',
  model: 'Pb(NO₃)₂ + 2NaOH → Pb(OH)₂ + 2NaNO₃.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 1, c: 'application', t: [2],
}));
add('cu-obs-short1', short({
  marks: 1,
  stem: 'State one observation when sodium hydroxide solution is added drop by drop to copper(II) chloride solution.',
  model: 'A pale blue precipitate (of copper(II) hydroxide) is formed.',
  sol: 'Pale blue precipitate.',
  scheme: [['Pale blue precipitate', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('excess-short1', short({
  marks: 1,
  stem: 'Name the soluble salt formed when the white precipitate of zinc hydroxide dissolves in excess sodium hydroxide solution.',
  model: 'Sodium zincate, Na₂ZnO₂.',
  sol: 'Sodium zincate.',
  scheme: [['Sodium zincate', 1]],
  d: 1, c: 'recall', t: [2, 5],
}));
add('naoh-num', num({
  stem: 'What mass of sodium hydroxide, in grams, is needed to precipitate all the copper, as copper(II) hydroxide, from a solution containing 15.95 g of anhydrous copper(II) sulphate? (Cu = 63.5, S = 32, O = 16, Na = 23, H = 1)',
  value: 8, tol: 0.01, unit: 'g',
  sol: r`$\ce{CuSO4 + 2NaOH -> Cu(OH)2 + Na2SO4}$: one mole of copper(II) sulphate needs two moles of sodium hydroxide. Molar mass of $\ce{CuSO4} = 63.5 + 32 + 4 \times 16 = 159.5$. Moles $= \dfrac{15.95}{159.5} = 0.1$. Moles of NaOH $= 2 \times 0.1 = 0.2$. Mass of NaOH $= 0.2 \times 40 = 8$, so 8 g.`,
  scheme: [['Moles of CuSO₄ and 1 : 2 ratio', 1], ['8 g', 1]],
  marks: 2,
  d: 3, c: 'application', t: [2],
}), () => near((15.95 / 159.5) * 2 * 40, 8) || 'naoh');
add('naoh-short2', short({
  marks: 2,
  stem: 'Sodium hydroxide solution is added drop by drop, and then in excess, to zinc sulphate solution. Write the balanced equation for each stage.',
  model: 'A few drops: ZnSO₄ + 2NaOH → Zn(OH)₂ + Na₂SO₄ (white gelatinous precipitate). In excess: Zn(OH)₂ + 2NaOH → Na₂ZnO₂ + 2H₂O (the precipitate dissolves).',
  sol: 'Precipitation, then sodium zincate.',
  scheme: [['First equation', 1], ['Second equation', 1]],
  d: 2, c: 'application', t: [2, 5],
}));
add('fe-short2', short({
  marks: 2,
  stem: 'How would you distinguish between iron(II) sulphate solution and iron(III) chloride solution using sodium hydroxide solution? State the observation for each.',
  model: 'Add sodium hydroxide solution to each. Iron(II) sulphate gives a dirty green precipitate (Fe(OH)₂); iron(III) chloride gives a reddish-brown precipitate (Fe(OH)₃). Neither dissolves in excess.',
  sol: 'Dirty green against reddish brown.',
  scheme: [['Iron(II): dirty green', 1], ['Iron(III): reddish brown', 1]],
  d: 2, c: 'analysis', t: [2],
}));
add('cazn-short2', short({
  marks: 2,
  stem: 'Calcium nitrate solution and zinc nitrate solution are both colourless. Explain how you would distinguish them using sodium hydroxide solution.',
  model: 'Add sodium hydroxide solution drop by drop and then in excess to each. Both give a white precipitate at first. The precipitate from zinc nitrate (zinc hydroxide) dissolves in excess to a colourless solution; the precipitate from calcium nitrate (calcium hydroxide) does not dissolve.',
  sol: 'Excess NaOH dissolves only the zinc precipitate.',
  scheme: [['Zinc: precipitate dissolves in excess', 1], ['Calcium: precipitate stays', 1]],
  d: 2, c: 'analysis', t: [2],
}));
add('naoh-short3', short({
  marks: 3,
  stem: 'A student adds sodium hydroxide solution to a freshly prepared iron(II) sulphate solution, and also to an old sample of the same solution that has stood open for some weeks and turned yellowish brown. (a) State the colour of the precipitate from the fresh solution. (b) State the colour of the precipitate from the old sample and explain the difference. (c) Write the balanced equation for the reaction in (b), taking the old sample to contain iron(III) sulphate.',
  model: '(a) Dirty green. (b) Reddish brown. On standing in air, iron(II) sulphate is oxidised to an iron(III) salt, which gives iron(III) hydroxide. (c) Fe₂(SO₄)₃ + 6NaOH → 2Fe(OH)₃ + 3Na₂SO₄.',
  sol: 'Fresh: Fe²⁺; old: oxidised to Fe³⁺.',
  scheme: [['(a)', 1], ['(b) colour and reason', 1], ['(c)', 1]],
  d: 3, c: 'analysis', t: [1, 2],
}));

// ---------------------------------------------------------------- t03 ammonium hydroxide on salt solutions
add('cu-excess-chk-mcq', mcq({
  stem: 'Ammonium hydroxide is added drop by drop to copper(II) nitrate solution in a boiling tube until no further change occurs. The final appearance is:',
  right: 'a clear, deep (inky) blue solution',
  wrong: ['a pale blue precipitate under a colourless liquid', 'a colourless solution', 'a reddish-brown precipitate'],
  sol: 'The pale blue Cu(OH)₂ first formed dissolves in excess ammonium hydroxide to give a deep blue complex salt — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('znpb-mcq', mcq({
  stem: 'Which reagent can be used to tell zinc nitrate solution from lead nitrate solution?',
  right: 'Ammonium hydroxide solution, added in excess',
  wrong: ['Sodium hydroxide solution, added in excess', 'Sodium hydroxide solution, a few drops only', 'Distilled water'],
  sol: 'Both give white precipitates with a little alkali, and both dissolve in excess NaOH; only zinc hydroxide dissolves in excess NH₄OH — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('same-mcq', mcq({
  stem: 'Excess sodium hydroxide solution is added to one sample of a salt solution, and excess ammonium hydroxide to another sample of the same solution. For which solution are the two final observations the same?',
  right: 'Iron(II) sulphate: a dirty green precipitate remains in both',
  wrong: ['Copper(II) sulphate: a pale blue precipitate remains in both', 'Lead nitrate: the white precipitate dissolves in both', 'Iron(III) chloride: the reddish-brown precipitate dissolves in both'],
  sol: 'Copper(II) hydroxide dissolves only in excess NH₄OH; lead hydroxide only in excess NaOH; iron(III) hydroxide dissolves in neither. Iron(II) hydroxide stays in both — option (@K).',
  d: 4, c: 'analysis', t: [2, 3],
}));
add('nh4oh-chk-mcq', mcq({
  stem: 'Ammonium hydroxide is added drop by drop, and then in excess, to lead nitrate solution. The observation is:',
  right: 'a white chalky precipitate that does not dissolve in excess',
  wrong: ['a white precipitate that dissolves in excess', 'a deep blue solution', 'no precipitate at any stage'],
  sol: 'Pb(NO₃)₂ + 2NH₄OH → Pb(OH)₂ + 2NH₄NO₃; lead hydroxide is insoluble in excess ammonium hydroxide — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('brown-ar', ar({
  a: 'The precipitate formed by adding ammonium hydroxide to iron(III) chloride solution does not dissolve in excess.',
  r: 'Iron(III) hydroxide is reddish brown in colour.',
  key: 'd',
  sol: 'Both statements are true, but the colour of the precipitate does not explain why it is insoluble in excess — option (d).',
  d: 2, c: 'understanding', t: [3],
}));
add('inky-fill', fill({
  stem: 'When ammonium hydroxide is added in excess to copper(II) nitrate solution, the pale blue precipitate dissolves to give a ___ blue solution.',
  acc: [['deep', 'inky', 'deep (inky)']],
  sol: 'A **deep** (inky) blue solution of the tetraamminecopper(II) complex.',
  d: 1, c: 'recall', t: [3],
}));
add('cu-nh4-short1', short({
  marks: 1,
  stem: 'Name the compound responsible for the deep blue colour formed when ammonium hydroxide is added in excess to copper(II) sulphate solution.',
  model: 'Tetraamminecopper(II) sulphate, [Cu(NH₃)₄]SO₄.',
  sol: 'Tetraamminecopper(II) sulphate.',
  scheme: [['Tetraamminecopper(II) sulphate', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('zn-nh4-short1', short({
  marks: 1,
  stem: 'Write the balanced equation for the reaction of zinc nitrate solution with a few drops of ammonium hydroxide.',
  model: 'Zn(NO₃)₂ + 2NH₄OH → Zn(OH)₂ + 2NH₄NO₃.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 1, c: 'application', t: [3],
}));
add('cu-short3', short({
  marks: 3,
  stem: 'Two test tubes contain copper(II) sulphate solution. Sodium hydroxide solution is added to the first until in excess, and ammonium hydroxide to the second until in excess. (a) Describe the final appearance of each tube. (b) Write the balanced equation for the formation of the precipitate in the first tube. (c) Explain why the result in the second tube is different.',
  model: '(a) First tube: a pale blue precipitate remains (under an almost colourless liquid). Second tube: a clear, deep (inky) blue solution. (b) CuSO₄ + 2NaOH → Cu(OH)₂ + Na₂SO₄. (c) Copper(II) hydroxide does not react with sodium hydroxide, but with excess ammonium hydroxide it forms a soluble deep blue complex salt, tetraamminecopper(II) sulphate.',
  sol: 'Precipitate stays with NaOH; soluble complex with NH₄OH.',
  scheme: [['(a) both tubes', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'analysis', t: [2, 3],
}));

// ---------------------------------------------------------------- t04 sodium hydroxide on ammonium salts
add('nh4-chk-mcq', mcq({
  stem: 'A white crystalline salt is warmed with sodium hydroxide solution, and the gas given off turns moist red litmus paper blue. The salt must contain:',
  right: 'ammonium ions',
  wrong: ['zinc ions', 'lead ions', 'calcium ions'],
  sol: 'An alkaline gas on warming with NaOH is ammonia, which comes only from an ammonium salt — option (@K).',
  d: 1, c: 'application', t: [4],
}));
add('nh4-mcq', mcq({
  stem: 'Crystals of ammonium nitrate are warmed with sodium hydroxide solution, and a glass rod dipped in concentrated hydrochloric acid is held at the mouth of the test tube. The observation is:',
  right: 'dense white fumes of ammonium chloride',
  wrong: ['reddish-brown fumes of nitrogen dioxide', 'a greenish-yellow gas', 'a white precipitate in the test tube'],
  sol: 'NH₄NO₃ + NaOH → NaNO₃ + H₂O + NH₃; then NH₃ + HCl → NH₄Cl, seen as dense white fumes — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('nh3-ar', ar({
  a: 'Ammonia is given off when ammonium sulphate is warmed with sodium hydroxide solution.',
  r: 'Sodium hydroxide is a stronger base than ammonia and displaces it from its salt.',
  key: 'c',
  sol: 'Both are true, and R explains A — option (c).',
  d: 2, c: 'understanding', t: [4],
}));
add('nh4-tf', tf({
  stem: 'Ammonium chloride gives off ammonia only when it is heated with an acid.',
  key: 'f',
  sol: 'False: ammonia is given off when an ammonium salt is warmed with an alkali such as sodium hydroxide.',
  d: 1, c: 'understanding', t: [4],
}));
add('nh4-short1', short({
  marks: 1,
  stem: 'Write the balanced equation for the reaction when ammonium chloride is warmed with sodium hydroxide solution.',
  model: 'NH₄Cl + NaOH → NaCl + H₂O + NH₃.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 1, c: 'application', t: [4],
}));
add('nh3-test-short1', short({
  marks: 1,
  stem: 'Name the gas given off when ammonium sulphate is warmed with caustic soda solution, and state one test for it.',
  model: 'Ammonia; it turns moist red litmus paper blue (or gives dense white fumes with a rod dipped in concentrated hydrochloric acid).',
  sol: 'Ammonia; litmus or HCl test.',
  scheme: [['Ammonia with one test', 1]],
  d: 1, c: 'understanding', t: [4],
}));
add('nh4-num', num({
  stem: 'A sample of 8.0 g of ammonium nitrate is warmed with excess sodium hydroxide solution until no more gas is given off. What volume of ammonia, measured at STP, is obtained? Give the answer in litres. (N = 14, H = 1, O = 16; one mole of a gas occupies 22.4 L at STP)',
  value: 2.24, tol: 0.01, unit: 'L',
  sol: r`$\ce{NH4NO3 + NaOH -> NaNO3 + H2O + NH3}$: one mole of ammonium nitrate gives one mole of ammonia. Molar mass of $\ce{NH4NO3} = 2 \times 14 + 4 \times 1 + 3 \times 16 = 80$. Moles $= \dfrac{8.0}{80} = 0.1$. Volume of ammonia $= 0.1 \times 22.4 = 2.24$, so 2.24 L.`,
  scheme: [['Moles of NH₄NO₃ and 1 : 1 ratio', 1], ['2.24 L', 1]],
  marks: 2,
  d: 2, c: 'application', t: [4],
}), () => near((8.0 / 80) * 22.4, 2.24) || 'nh4');
add('nh4-short2', short({
  marks: 2,
  stem: 'Describe how you would show that a sample of white crystals contains ammonium ions. Write the balanced equation if the crystals are ammonium chloride.',
  model: 'Warm a little of the crystals with sodium hydroxide solution and hold moist red litmus paper at the mouth of the tube: it turns blue (a pungent gas, ammonia, is given off). NH₄Cl + NaOH → NaCl + H₂O + NH₃.',
  sol: 'Warm with NaOH; ammonia turns moist red litmus blue.',
  scheme: [['Test and observation', 1], ['Equation', 1]],
  d: 2, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- t05 amphoteric nature
add('amph-chk-mcq', mcq({
  stem: 'A white powder dissolves in dilute nitric acid and also in hot sodium hydroxide solution, forming a salt and water each time. The powder could be:',
  right: 'zinc oxide',
  wrong: ['calcium oxide', 'magnesium oxide', 'sodium oxide'],
  sol: 'Zinc oxide is amphoteric: it reacts with acids and with alkalis. The others are basic oxides and do not react with NaOH — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('al-mcq', mcq({
  stem: 'A strip of aluminium foil is warmed with sodium hydroxide solution. The gas given off and the salt formed are:',
  right: 'hydrogen and sodium aluminate',
  wrong: ['oxygen and sodium aluminate', 'hydrogen and aluminium hydroxide', 'ammonia and sodium aluminate'],
  sol: '2Al + 2NaOH + 2H₂O → 2NaAlO₂ + 3H₂ — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('pbo-mcq', mcq({
  stem: 'Yellow lead(II) oxide dissolves when it is boiled with concentrated sodium hydroxide solution. The products are:',
  right: 'sodium plumbite and water',
  wrong: ['sodium plumbite and hydrogen', 'lead(II) hydroxide and sodium oxide', 'lead and sodium peroxide'],
  sol: 'PbO + 2NaOH → Na₂PbO₂ + H₂O; an oxide gives water, not hydrogen — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('alkali-mcq', mcq({
  stem: 'Pieces of four metals are boiled separately with concentrated sodium hydroxide solution. Which metal gives no hydrogen?',
  right: 'Copper',
  wrong: ['Zinc', 'Aluminium', 'Lead'],
  sol: 'Aluminium, zinc and lead are amphoteric metals that react with hot caustic alkali; copper does not — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('koh-mcq', mcq({
  stem: 'Zinc granules are boiled with concentrated potassium hydroxide solution, and a gas is given off. The salt left in solution is:',
  right: 'potassium zincate, K₂ZnO₂',
  wrong: ['zinc hydroxide, Zn(OH)₂', 'potassium aluminate, KAlO₂', 'zinc oxide, ZnO'],
  sol: 'Zn + 2KOH → K₂ZnO₂ + H₂ — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('al2o3-ar', ar({
  a: 'Aluminium oxide is a purely basic oxide.',
  r: 'Aluminium oxide reacts with hydrochloric acid and with sodium hydroxide to form a salt and water.',
  key: 'b',
  sol: 'A is false: aluminium oxide is amphoteric. R is true, and it is exactly why the oxide is amphoteric — option (b).',
  d: 2, c: 'understanding', t: [5],
}));
add('amph-tf', tf({
  stem: 'Lead reacts with hot, concentrated sodium hydroxide solution, giving off hydrogen.',
  key: 't',
  sol: 'True: Pb + 2NaOH → Na₂PbO₂ + H₂ (sodium plumbite).',
  d: 2, c: 'recall', t: [5],
}));
add('aluminate-fill', fill({
  stem: 'Aluminium dissolves in hot sodium hydroxide solution, forming hydrogen and sodium ___.',
  acc: [['aluminate', 'meta-aluminate']],
  sol: 'Sodium **aluminate**, NaAlO₂.',
  d: 1, c: 'recall', t: [5],
}));
add('amph-fill', fill({
  stem: 'Complete each sentence by choosing the correct word or words from the bracket.\n\n(a) Lead(II) oxide is ___ (basic / amphoteric).\n\n(b) Excess ammonium hydroxide dissolves copper(II) hydroxide to form a ___ (deep blue / colourless) solution.\n\n(c) When an ammonium salt is warmed with sodium hydroxide solution, ___ (ammonia / hydrogen) is given off.',
  acc: [['amphoteric'], ['deep blue'], ['ammonia']],
  sol: '(a) **amphoteric**; (b) **deep blue**; (c) **ammonia**.',
  d: 1, c: 'recall', t: [3, 4, 5],
}));
add('reag-match', match({
  stem: 'Each substance in Column A is warmed with sodium hydroxide solution. Match it with the products in Column B.',
  pairs: [
    ['Aluminium (with water)', 'Sodium aluminate and hydrogen'],
    ['Zinc oxide', 'Sodium zincate and water'],
    ['Lead(II) hydroxide', 'Sodium plumbite and water'],
    ['Ammonium chloride', 'Sodium chloride, water and ammonia'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Aluminium → sodium aluminate and hydrogen; zinc oxide → sodium zincate and water; lead(II) hydroxide → sodium plumbite and water; ammonium chloride → sodium chloride, water and ammonia.',
  d: 2, c: 'application', t: [4, 5],
}));
add('amph-short1', short({
  marks: 1,
  stem: 'What is meant by an amphoteric oxide?',
  model: 'An oxide that reacts with both acids and bases to form a salt and water (for example zinc oxide).',
  sol: 'Definition.',
  scheme: [['Reacts with acids and bases to give salt and water', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('al-short1', short({
  marks: 1,
  stem: 'Write the balanced equation for the reaction of aluminium with sodium hydroxide solution.',
  model: '2Al + 2NaOH + 2H₂O → 2NaAlO₂ + 3H₂.',
  sol: 'Equation.',
  scheme: [['Balanced equation (with water)', 1]],
  d: 2, c: 'application', t: [5],
}));
add('pbmetal-short1', short({
  marks: 1,
  stem: 'Write the balanced equation for the action of hot, concentrated caustic soda solution on lead.',
  model: 'Pb + 2NaOH → Na₂PbO₂ + H₂.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 2, c: 'application', t: [5],
}));
add('al-num', num({
  stem: 'Aluminium powder weighing 5.4 g is warmed with excess sodium hydroxide solution until it has all dissolved. What volume of hydrogen, measured at STP, is given off? Give the answer in litres. (Al = 27; one mole of a gas occupies 22.4 L at STP)',
  value: 6.72, tol: 0.01, unit: 'L',
  sol: r`$\ce{2Al + 2NaOH + 2H2O -> 2NaAlO2 + 3H2}$: two moles of aluminium give three moles of hydrogen. Moles of Al $= \dfrac{5.4}{27} = 0.2$. Moles of hydrogen $= 0.2 \times \dfrac{3}{2} = 0.3$. Volume of hydrogen $= 0.3 \times 22.4 = 6.72$, so 6.72 L.`,
  scheme: [['Moles of Al and 2 : 3 ratio', 1], ['6.72 L', 1]],
  marks: 2,
  d: 3, c: 'application', t: [5],
}), () => near((5.4 / 27) * 1.5 * 22.4, 6.72) || 'al');
add('amph-short2', short({
  marks: 2,
  stem: 'Write balanced equations to show that aluminium hydroxide is amphoteric.',
  model: 'With an acid: Al(OH)₃ + 3HCl → AlCl₃ + 3H₂O. With an alkali: Al(OH)₃ + NaOH → NaAlO₂ + 2H₂O. It forms a salt and water with both.',
  sol: 'One equation with an acid and one with an alkali.',
  scheme: [['With acid', 1], ['With alkali', 1]],
  d: 2, c: 'application', t: [5],
}));
add('amph-short3', short({
  marks: 3,
  stem: 'A light, silvery metal M dissolves in hot sodium hydroxide solution, giving a gas that burns with a pop. A solution of the chloride of M gives a white gelatinous precipitate with sodium hydroxide that dissolves in excess, but the white precipitate it gives with ammonium hydroxide does not dissolve in excess. (a) Identify M and the gas. (b) Write the balanced equation for the action of sodium hydroxide solution on M. (c) Write the balanced equation for the white precipitate dissolving in excess sodium hydroxide, and name the salt formed.',
  model: '(a) M is aluminium; the gas is hydrogen. (b) 2Al + 2NaOH + 2H₂O → 2NaAlO₂ + 3H₂. (c) Al(OH)₃ + NaOH → NaAlO₂ + 2H₂O; sodium aluminate.',
  sol: 'A light metal whose hydroxide dissolves in NaOH but not in NH₄OH: aluminium.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'analysis', t: [5],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('naoh-long', long({
  stem: '(a) State the colour of (i) a solution of iron(II) sulphate and (ii) the precipitate formed when a few drops of sodium hydroxide solution are added to it. [2]\n\n(b) Write balanced equations for the reactions of sodium hydroxide solution, added drop by drop, with (i) iron(III) chloride solution and (ii) copper(II) sulphate solution. [2]\n\n(c) Sodium hydroxide solution is added, first a little and then in excess, to lead nitrate solution. (i) State the observations. (ii) Write the balanced equation for each stage. [3]\n\n(d) Calculate the mass of sodium hydroxide needed to precipitate all the iron, as iron(III) hydroxide, from a solution containing 32.5 g of iron(III) chloride. (Fe = 56, Cl = 35.5, Na = 23, O = 16, H = 1) [3]',
  model: r`(a) (i) Pale green. (ii) Dirty green.

(b) (i) FeCl₃ + 3NaOH → Fe(OH)₃ + 3NaCl. (ii) CuSO₄ + 2NaOH → Cu(OH)₂ + Na₂SO₄.

(c) (i) A white chalky precipitate forms, which dissolves in excess to give a colourless solution. (ii) Pb(NO₃)₂ + 2NaOH → Pb(OH)₂ + 2NaNO₃; Pb(OH)₂ + 2NaOH → Na₂PbO₂ + 2H₂O.

(d) FeCl₃ + 3NaOH → Fe(OH)₃ + 3NaCl: one mole of iron(III) chloride needs three moles of sodium hydroxide. Molar mass of iron(III) chloride $= 56 + 3 \times 35.5 = 162.5$. Moles $= \dfrac{32.5}{162.5} = 0.2$. Moles of NaOH $= 3 \times 0.2 = 0.6$. Mass $= 0.6 \times 40 = 24$, that is 24 g.`,
  sol: 'Colours; two equations; observations and two equations; mole ratio 1 : 3.',
  scheme: [['(a)(i)', 1], ['(a)(ii)', 1], ['(b)(i)', 1], ['(b)(ii)', 1], ['(c)(i)', 1], ['(c)(ii) first equation', 1], ['(c)(ii) second equation', 1], ['(d) moles of FeCl₃', 1], ['(d) 1 : 3 ratio', 1], ['(d) 24 g', 1]],
  d: 3, c: 'application', t: [1, 2],
}), () => near((32.5 / 162.5) * 3 * 40, 24) || 'naoh-long');
add('nh4oh-long', long({
  stem: '(a) A few drops of ammonium hydroxide are added to (i) iron(II) sulphate solution and (ii) zinc nitrate solution. State the colour of the precipitate in each case. [2]\n\n(b) Write balanced equations for the reaction of ammonium hydroxide with (i) lead nitrate solution and (ii) iron(III) chloride solution. [2]\n\n(c) Ammonium hydroxide is added drop by drop, until in excess, to copper(II) sulphate solution. (i) State two observations. (ii) Name the compound responsible for the final colour. [3]\n\n(d) Using ammonium hydroxide alone, explain how you would distinguish between solutions of (i) zinc nitrate and lead nitrate and (ii) copper(II) sulphate and iron(II) sulphate. [3]',
  model: '(a) (i) Dirty green. (ii) White (gelatinous).\n\n(b) (i) Pb(NO₃)₂ + 2NH₄OH → Pb(OH)₂ + 2NH₄NO₃. (ii) FeCl₃ + 3NH₄OH → Fe(OH)₃ + 3NH₄Cl.\n\n(c) (i) A pale blue precipitate forms first; in excess it dissolves to give a deep (inky) blue solution. (ii) Tetraamminecopper(II) sulphate, [Cu(NH₃)₄]SO₄.\n\n(d) (i) Add ammonium hydroxide in excess: the white precipitate from zinc nitrate dissolves, while that from lead nitrate does not. (ii) Add ammonium hydroxide in excess: copper(II) sulphate gives a pale blue precipitate that dissolves to a deep blue solution, while iron(II) sulphate gives a dirty green precipitate that stays.',
  sol: 'Colours; equations; copper with excess NH₄OH; two distinctions.',
  scheme: [['(a)(i)', 1], ['(a)(ii)', 1], ['(b)(i)', 1], ['(b)(ii)', 1], ['(c)(i) pale blue precipitate', 1], ['(c)(i) deep blue solution', 1], ['(c)(ii)', 1], ['(d)(i)', 1.5], ['(d)(ii)', 1.5]],
  d: 3, c: 'application', t: [3],
}));
add('nh4salt-long', long({
  stem: '(a) Write the balanced equation for the reaction when ammonium sulphate is warmed with sodium hydroxide solution, and name the gas evolved. [2]\n\n(b) State two tests, with observations, that identify this gas. [2]\n\n(c) A white salt S dissolves to give a colourless solution. With sodium hydroxide solution it gives a white precipitate that dissolves in excess; with ammonium hydroxide it gives a white precipitate that does not dissolve in excess. When S is warmed with sodium hydroxide, no gas is given off. (i) Identify the cation in S. (ii) Why does its precipitate dissolve in excess sodium hydroxide? (iii) Write the balanced equation for this dissolving. [3]\n\n(d) 13.2 g of ammonium sulphate is warmed with excess sodium hydroxide solution. Calculate the volume of ammonia given off at STP. (N = 14, H = 1, S = 32, O = 16; molar volume 22.4 L) [3]',
  model: r`(a) (NH₄)₂SO₄ + 2NaOH → Na₂SO₄ + 2H₂O + 2NH₃; the gas is ammonia.

(b) It turns moist red litmus paper blue; it gives dense white fumes with a glass rod dipped in concentrated hydrochloric acid.

(c) (i) Lead ion, Pb²⁺. (ii) Lead(II) hydroxide is amphoteric, so it reacts with the alkali to form a soluble salt, sodium plumbite. (iii) Pb(OH)₂ + 2NaOH → Na₂PbO₂ + 2H₂O.

(d) One mole of ammonium sulphate gives two moles of ammonia. Molar mass $= 2 \times 14 + 8 \times 1 + 32 + 4 \times 16 = 132$. Moles $= \dfrac{13.2}{132} = 0.1$. Moles of ammonia $= 2 \times 0.1 = 0.2$. Volume $= 0.2 \times 22.4 = 4.48$, that is 4.48 L.`,
  sol: 'Equation; two tests; lead identified from the two alkalis; mole ratio 1 : 2.',
  scheme: [['(a) equation', 1], ['(a) ammonia', 1], ['(b) first test', 1], ['(b) second test', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(d) molar mass and moles', 1], ['(d) 1 : 2 ratio', 1], ['(d) 4.48 L', 1]],
  d: 3, c: 'application', t: [2, 3, 4],
}), () => near((13.2 / 132) * 2 * 22.4, 4.48) || 'nh4salt-long');
add('amph-long', long({
  stem: '(a) What is an amphoteric hydroxide? Name two amphoteric hydroxides. [2]\n\n(b) Write balanced equations for the reaction of aluminium oxide with (i) dilute hydrochloric acid and (ii) sodium hydroxide solution. [2]\n\n(c) Zinc granules are boiled with concentrated sodium hydroxide solution. (i) Write the balanced equation. (ii) Name the salt formed. (iii) State how you would test the gas given off. [3]\n\n(d) 13 g of zinc dissolves completely in hot sodium hydroxide solution. Calculate (i) the volume of hydrogen formed at STP and (ii) the mass of the sodium salt formed. (Zn = 65, Na = 23, O = 16; molar volume 22.4 L) [3]',
  model: r`(a) A hydroxide that reacts with both acids and bases to form a salt and water. Examples: zinc hydroxide, lead(II) hydroxide (or aluminium hydroxide).

(b) (i) Al₂O₃ + 6HCl → 2AlCl₃ + 3H₂O. (ii) Al₂O₃ + 2NaOH → 2NaAlO₂ + H₂O.

(c) (i) Zn + 2NaOH → Na₂ZnO₂ + H₂. (ii) Sodium zincate. (iii) Bring a burning splint to the gas: it burns with a pop (hydrogen).

(d) One mole of zinc gives one mole of hydrogen and one mole of sodium zincate. Moles of zinc $= \dfrac{13}{65} = 0.2$. (i) Volume of hydrogen $= 0.2 \times 22.4 = 4.48$, that is 4.48 L. (ii) Molar mass of sodium zincate $= 2 \times 23 + 65 + 2 \times 16 = 143$; mass $= 0.2 \times 143 = 28.6$, that is 28.6 g.`,
  sol: 'Definition; equations for an amphoteric oxide; zinc with NaOH; 1 : 1 : 1 mole ratio.',
  scheme: [['(a) definition', 1], ['(a) two examples', 1], ['(b)(i)', 1], ['(b)(ii)', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(d) moles of zinc', 1], ['(d)(i) 4.48 L', 1], ['(d)(ii) 28.6 g', 1]],
  d: 3, c: 'application', t: [5],
}), () => (near(0.2 * 22.4, 4.48) && near(0.2 * 143, 28.6) && near(13 / 65, 0.2)) || 'amph-long');
add('ident-long', long({
  stem: 'Five solutions, A to E, each contain one of the cations Fe²⁺, Fe³⁺, Cu²⁺, Zn²⁺ and Pb²⁺. The observations are:\n\n- A: colourless; a white precipitate with sodium hydroxide that dissolves in excess; a white precipitate with ammonium hydroxide that does not dissolve in excess.\n- B: blue; a pale blue precipitate with sodium hydroxide that does not dissolve in excess.\n- C: yellowish brown; a reddish-brown precipitate with sodium hydroxide.\n- D: colourless; a white precipitate that dissolves in excess sodium hydroxide and also in excess ammonium hydroxide.\n- E: pale green; a dirty green precipitate with sodium hydroxide.\n\n(a) Identify the cations in B, C and E. [3]\n\n(b) Identify the cations in A and D, and explain how the test with ammonium hydroxide decides between them. [3]\n\n(c) (i) What would be seen if ammonium hydroxide were added to B until in excess? (ii) Taking D to be zinc sulphate, write the balanced equations for its reaction with a little sodium hydroxide and with excess sodium hydroxide. (iii) The precipitate from E is left to stand in air for a day. What change is seen, and why? [4]',
  model: '(a) B: Cu²⁺. C: Fe³⁺. E: Fe²⁺.\n\n(b) A: Pb²⁺. D: Zn²⁺. Both hydroxides are white and amphoteric, so both dissolve in excess sodium hydroxide; but only zinc hydroxide dissolves in excess ammonium hydroxide (forming a soluble complex), so the solution whose precipitate dissolves is zinc and the one whose precipitate stays is lead.\n\n(c) (i) A pale blue precipitate forms, which dissolves in excess to give a deep (inky) blue solution. (ii) ZnSO₄ + 2NaOH → Zn(OH)₂ + Na₂SO₄; Zn(OH)₂ + 2NaOH → Na₂ZnO₂ + 2H₂O. (iii) The dirty green precipitate turns reddish brown, because iron(II) hydroxide is oxidised by the air to iron(III) hydroxide.',
  sol: 'Colours identify B, C and E; the two alkalis separate A and D; equations and oxidation.',
  scheme: [['(a) B', 1], ['(a) C', 1], ['(a) E', 1], ['(b) A', 1], ['(b) D', 1], ['(b) explanation', 1], ['(c)(i)', 1], ['(c)(ii) first equation', 1], ['(c)(ii) second equation', 1], ['(c)(iii)', 1]],
  d: 4, c: 'analysis', t: [1, 2, 3],
}));
