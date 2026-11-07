// ICSE 10 Chemistry ch09 Study of Compounds: Hydrogen Chloride — question bank (ICSE 2027 specimen style: objective
// items, 1-mark equations / observations / names, a bracket completion, matches and 10-mark structured questions).
// Stems name their own substances, masses and set-ups. MCQ keys are placed by the builder; AR keys planned: a a b d c.
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const near = (a, b, tol = 1e-6) => Math.abs(a - b) <= tol;

// ---------------------------------------------------------------- t01 laboratory preparation
add('dry-mcq', mcq({
  stem: 'Hydrogen chloride made from rock salt and concentrated sulphuric acid is passed through a wash bottle before collection. The drying agent in the wash bottle is:',
  right: 'concentrated sulphuric acid',
  wrong: ['quicklime (calcium oxide)', 'solid sodium hydroxide', 'slaked lime (calcium hydroxide)'],
  sol: 'The other three are bases and would react with the acidic gas — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('collect-mcq', mcq({
  stem: 'Hydrogen chloride is collected in an upright gas jar by upward displacement of air because it is:',
  right: 'heavier than air and very soluble in water',
  wrong: ['lighter than air and insoluble in water', 'heavier than air and insoluble in water', 'lighter than air and very soluble in water'],
  sol: 'It sinks to the bottom of the jar, pushing air out, and cannot be collected over water because it dissolves — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('below200-mcq', mcq({
  stem: 'A flask of sodium chloride and concentrated sulphuric acid is heated far above 200 °C. Besides hydrogen chloride, the product formed is:',
  right: 'sodium sulphate, which forms a hard crust that sticks to the flask',
  wrong: ['sodium hydrogensulphate, which stays liquid and is easy to pour out', 'sodium hydroxide, which absorbs the gas', 'chlorine, which colours the gas greenish-yellow'],
  sol: 'At high temperature: 2NaCl + H₂SO₄ → Na₂SO₄ + 2HCl; sodium sulphate forms a hard crust, more fuel is used and the glass may crack — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('full-mcq', mcq({
  stem: 'A student collecting hydrogen chloride wants to know when the gas jar is full. The best test at the mouth of the jar is:',
  right: 'a glass rod dipped in ammonia solution gives dense white fumes',
  wrong: ['a burning splint makes the gas burn with a pop', 'a drop of lime water turns milky', 'moist red litmus paper turns blue'],
  sol: 'NH₃ + HCl → NH₄Cl (white fumes) as soon as the gas reaches the mouth (moist blue litmus turning red also works) — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('dry-ar', ar({
  a: 'Concentrated sulphuric acid is used to dry hydrogen chloride gas.',
  r: 'Concentrated sulphuric acid is a dibasic acid.',
  key: 'd',
  sol: 'Both are true, but it is used because it absorbs water and does not react with hydrogen chloride, not because it is dibasic — option (d).',
  d: 3, c: 'analysis', t: [1],
}));
add('collect-ar', ar({
  a: 'Hydrogen chloride is not collected over water.',
  r: 'Hydrogen chloride is extremely soluble in water.',
  key: 'c',
  sol: 'Both are true, and R explains A — option (c).',
  d: 1, c: 'understanding', t: [1],
}));
add('eq-short1', short({
  marks: 1,
  stem: 'Write the balanced equation, with the condition, for the laboratory preparation of hydrogen chloride from sodium chloride.',
  model: 'NaCl + H₂SO₄ → NaHSO₄ + HCl (conc. acid, heated below 200 °C).',
  sol: 'Equation with condition.',
  scheme: [['Balanced equation with temperature', 1]],
  d: 1, c: 'application', t: [1],
}));
add('dryname-short1', short({
  marks: 1,
  stem: 'Why is quicklime not used to dry hydrogen chloride gas?',
  model: 'Quicklime is a basic oxide and reacts with the acidic gas: CaO + 2HCl → CaCl₂ + H₂O.',
  sol: 'It reacts with HCl.',
  scheme: [['Reacts with HCl (basic)', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('collect-short2', short({
  marks: 2,
  stem: 'Explain why hydrogen chloride is (a) collected by upward displacement of air and (b) never collected over water.',
  model: '(a) It is heavier than air (vapour density 18.25 against about 14.4 for air), so it sinks to the bottom of the upright jar and pushes the air out. (b) It is extremely soluble in water, so it would dissolve instead of collecting.',
  sol: 'Density; solubility.',
  scheme: [['(a) heavier than air', 1], ['(b) highly soluble', 1]],
  d: 2, c: 'understanding', t: [1, 2],
}));
add('temp-short2', short({
  marks: 2,
  stem: 'In the laboratory preparation of hydrogen chloride, the flask is heated gently and kept below 200 °C. Give two reasons why a higher temperature is avoided.',
  model: 'Above 200 °C the reaction goes further, 2NaCl + H₂SO₄ → Na₂SO₄ + 2HCl, and (1) the sodium sulphate forms a hard crust that sticks to the flask and is difficult to remove; (2) the glass flask may crack, and more fuel is wasted.',
  sol: 'Crust of sodium sulphate; cracking and fuel.',
  scheme: [['Reason 1', 1], ['Reason 2', 1]],
  d: 3, c: 'analysis', t: [1],
}));
add('nacl-num', num({
  stem: 'What mass of sodium chloride, in grams, is needed to prepare 7.3 g of hydrogen chloride by the reaction NaCl + H₂SO₄ → NaHSO₄ + HCl? (Na = 23, Cl = 35.5, H = 1)',
  value: 11.7, tol: 0.05, unit: 'g',
  sol: r`Molar masses: NaCl $= 23 + 35.5 = 58.5$; HCl $= 1 + 35.5 = 36.5$. One mole of NaCl gives one mole of HCl, so mass of NaCl $= \dfrac{58.5}{36.5} \times 7.3 = 11.7$, that is 11.7 g.`,
  scheme: [['Molar masses and 1 : 1 ratio', 1], ['11.7 g', 1]],
  marks: 2,
  d: 2, c: 'application', t: [1],
}), () => near((58.5 / 36.5) * 7.3, 11.7, 1e-9) || 'nacl');

// ---------------------------------------------------------------- t02 density, solubility, fountain experiment
add('pour-mcq', mcq({
  stem: 'A gas jar of hydrogen chloride is tilted over an open jar of air, as if pouring water. A glass rod dipped in ammonia solution is then held inside the lower jar, and dense white fumes appear. This shows that hydrogen chloride:',
  right: 'is heavier than air',
  wrong: ['is lighter than air', 'is a neutral gas', 'does not dissolve in water'],
  sol: 'The gas flowed down into the lower jar, like a liquid — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('fountain-mcq', mcq({
  stem: 'In the fountain experiment, water coloured with blue litmus rushes up a jet tube into a flask of dry hydrogen chloride and turns red. Together these observations show that hydrogen chloride is:',
  right: 'highly soluble in water and acidic',
  wrong: ['lighter than air and basic', 'insoluble in water and neutral', 'highly soluble in water and basic'],
  sol: 'The fountain shows high solubility; the red colour shows the solution is acidic — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('jet-mcq', mcq({
  stem: 'In the fountain experiment with hydrogen chloride, water is forced up the jet tube into the flask because:',
  right: 'the gas dissolves in the first drops of water, the pressure inside falls and the outside air pushes water in',
  wrong: ['hydrogen chloride reacts with glass and draws water after it', 'the flask is heated, so the gas expands', 'water is lighter than hydrogen chloride and floats upwards'],
  sol: 'A partial vacuum forms as the very soluble gas dissolves; atmospheric pressure drives the water up — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('density-ar', ar({
  a: 'Hydrogen chloride is heavier than air.',
  r: 'The vapour density of hydrogen chloride (18.25) is greater than the average vapour density of air (about 14.4).',
  key: 'c',
  sol: 'Both are true, and R explains A — option (c).',
  d: 2, c: 'application', t: [2],
}));
add('lighter-tf', tf({
  stem: 'Hydrogen chloride is lighter than air.',
  key: 'f',
  sol: 'False: its vapour density is 18.25, greater than that of air (about 14.4), so it is heavier than air.',
  d: 1, c: 'recall', t: [2],
}));
add('fountain-fill', fill({
  stem: 'In the fountain experiment with hydrogen chloride, the blue litmus solution turns ___ as it enters the flask.',
  acc: [['red']],
  sol: 'It turns **red**, because the solution formed is acidic.',
  d: 1, c: 'recall', t: [2],
}));
add('fountainobs-short1', short({
  marks: 1,
  stem: 'State what is seen inside the flask in the fountain experiment when the trough holds water coloured with blue litmus.',
  model: 'Water rushes up the tube as a fountain, and the blue colour turns red.',
  sol: 'Red fountain.',
  scheme: [['Fountain, blue to red', 1]],
  d: 1, c: 'application', t: [2],
}));
add('heavy-short2', short({
  marks: 2,
  stem: 'Describe a simple experiment, with the observation, to show that hydrogen chloride is heavier than air.',
  model: 'Hold an open jar of hydrogen chloride over an open jar of air and tilt it as if pouring a liquid. Then hold a glass rod dipped in ammonia solution inside the lower jar: dense white fumes of ammonium chloride form, showing that the gas has flowed down into it.',
  sol: 'Pouring the gas; white fumes in the lower jar.',
  scheme: [['Procedure', 1], ['Observation and conclusion', 1]],
  d: 2, c: 'application', t: [2],
}));
add('vd-num', num({
  stem: 'Calculate the vapour density of hydrogen chloride. (H = 1, Cl = 35.5)',
  value: 18.25, tol: 0.01,
  sol: r`Relative molecular mass of HCl $= 1 + 35.5 = 36.5$. Vapour density $= \dfrac{36.5}{2} = 18.25$.`,
  scheme: [['M = 36.5', 0.5], ['VD = 18.25', 0.5]],
  d: 1, c: 'application', t: [2],
}), () => near(36.5 / 2, 18.25) || 'vd');
add('fountain-short3', short({
  marks: 3,
  stem: 'In the fountain experiment with hydrogen chloride: (a) why must the flask and the gas be completely dry? (b) explain why the water rises into the flask as a fountain; (c) name the two properties of hydrogen chloride shown by the experiment.',
  model: '(a) If water were present, some gas would dissolve before the experiment and the pressure difference would be too small for a good fountain. (b) The first drops of water dissolve so much gas that the pressure inside the flask falls far below atmospheric pressure; the outside air pressure on the trough pushes water up the jet. (c) It is highly soluble in water, and its solution is acidic (turns blue litmus red).',
  sol: 'Dryness; pressure difference; solubility and acidity.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'analysis', t: [2],
}));

// ---------------------------------------------------------------- t03 hydrochloric acid and back suction
add('funnel-mcq', mcq({
  stem: 'Hydrogen chloride is dissolved in water through an inverted funnel whose rim just dips below the water surface. This arrangement:',
  right: 'prevents back suction and gives a large surface for absorbing the gas',
  wrong: ['dries the gas before it dissolves', 'removes chlorine from the gas', 'cools the gas until it becomes a liquid'],
  sol: 'Option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('rim-mcq', mcq({
  stem: 'While hydrogen chloride is being absorbed through an inverted funnel, water suddenly rises inside the funnel. The level in the beaker falls below the rim. What happens next?',
  right: 'Air enters the funnel, the pressure is equalised and the water inside falls back into the beaker',
  wrong: ['Water is sucked back into the generating flask', 'The gas stops dissolving permanently', 'The funnel fills completely with acid and overflows'],
  sol: 'Once the rim is uncovered, air enters and breaks the suction — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('funnel-fill', fill({
  stem: 'Water is prevented from being sucked back into the hot generating flask by using an inverted ___ arrangement.',
  acc: [['funnel']],
  sol: 'An inverted **funnel**.',
  d: 1, c: 'recall', t: [3],
}));
add('backsuction-short2', short({
  marks: 2,
  stem: 'Explain how the inverted funnel arrangement prevents back suction when hydrogen chloride is dissolved in water.',
  model: 'The rim of the inverted funnel just touches the water. If the gas dissolves fast and water rises into the funnel, the water level in the beaker falls below the rim; air then enters the funnel, the pressure is equalised and the water drops back. So water is never sucked back into the generating flask.',
  sol: 'Rim uncovered; air enters; water falls back.',
  scheme: [['Level falls below the rim', 1], ['Air enters and water falls back', 1]],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 reactions
add('zinc-mcq', mcq({
  stem: 'Granulated zinc is dropped into dilute hydrochloric acid. The gas evolved and the salt formed are:',
  right: 'hydrogen and zinc chloride',
  wrong: ['chlorine and zinc oxide', 'hydrogen chloride and zinc hydroxide', 'oxygen and zinc chloride'],
  sol: 'Zn + 2HCl → ZnCl₂ + H₂ — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('nh3fume-mcq', mcq({
  stem: 'A jar of hydrogen chloride is held mouth-down over an open bottle of concentrated ammonia solution. The dense white fumes seen are of:',
  right: 'ammonium chloride',
  wrong: ['ammonium hydroxide', 'chlorine', 'nitrogen'],
  sol: 'NH₃ + HCl → NH₄Cl, a white solid formed as fine particles — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('sulphide-mcq', mcq({
  stem: 'Dilute hydrochloric acid is poured onto lumps of iron(II) sulphide. The gas given off is:',
  right: 'hydrogen sulphide, which smells of rotten eggs',
  wrong: ['sulphur dioxide, which has a choking smell', 'hydrogen, which is odourless', 'chlorine, which is greenish-yellow'],
  sol: 'FeS + 2HCl → FeCl₂ + H₂S — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('sulphite-mcq', mcq({
  stem: 'Which pair of substances gives a gas that turns orange acidified potassium dichromate paper green?',
  right: 'Sodium sulphite and dilute hydrochloric acid',
  wrong: ['Sodium carbonate and dilute hydrochloric acid', 'Zinc and dilute hydrochloric acid', 'Copper(II) oxide and dilute hydrochloric acid'],
  sol: 'Na₂SO₃ + 2HCl → 2NaCl + H₂O + SO₂; sulphur dioxide reduces dichromate (orange) to a green chromium compound. The others give CO₂, H₂ or no gas — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('copper-mcq', mcq({
  stem: 'Copper turnings are left in dilute hydrochloric acid for an hour, and no gas is seen. The reason is that copper:',
  right: 'is below hydrogen in the activity series',
  wrong: ['is above hydrogen in the activity series', 'forms a protective coat of copper chloride at once', 'reacts only with concentrated nitric acid in the cold'],
  sol: 'Metals below hydrogen cannot displace it from dilute acids — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('bicarb-mcq', mcq({
  stem: 'Which equation correctly shows the reaction of dilute hydrochloric acid with baking soda (sodium hydrogencarbonate)?',
  right: 'NaHCO₃ + HCl → NaCl + H₂O + CO₂',
  wrong: ['NaHCO₃ + 2HCl → NaCl + H₂O + CO₂', 'NaHCO₃ + HCl → NaCl + H₂ + CO₂', '2NaHCO₃ + HCl → Na₂CO₃ + NaCl + H₂O'],
  sol: 'Only the first is balanced and gives the right products — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('copper-ar', ar({
  a: 'Copper reacts with dilute hydrochloric acid to give hydrogen.',
  r: 'Copper is below hydrogen in the activity series.',
  key: 'b',
  sol: 'A is false (there is no reaction); R is true — option (b).',
  d: 2, c: 'understanding', t: [4],
}));
add('fumes-short1', short({
  marks: 1,
  stem: 'Write the balanced equation for the reaction between hydrogen chloride and ammonia gas.',
  model: 'NH₃ + HCl → NH₄Cl.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 1, c: 'application', t: [4],
}));
add('mg-short1', short({
  marks: 1,
  stem: 'A strip of magnesium fizzes when dropped into dilute hydrochloric acid. Write the balanced equation for this change.',
  model: 'Mg + 2HCl → MgCl₂ + H₂.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 1, c: 'application', t: [4],
}));
add('caoh-short1', short({
  marks: 1,
  stem: 'Write the balanced equation for the neutralisation of calcium hydroxide by dilute hydrochloric acid.',
  model: 'Ca(OH)₂ + 2HCl → CaCl₂ + 2H₂O.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 1, c: 'application', t: [4],
}));
add('fes-short1', short({
  marks: 1,
  stem: 'Write the balanced equation for the action of dilute hydrochloric acid on iron(II) sulphide.',
  model: 'FeS + 2HCl → FeCl₂ + H₂S.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 1, c: 'application', t: [4],
}));
add('na2so3-short1', short({
  marks: 1,
  stem: 'Write the balanced equation for the action of dilute hydrochloric acid on sodium sulphite.',
  model: 'Na₂SO₃ + 2HCl → 2NaCl + H₂O + SO₂.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 2, c: 'application', t: [4],
}));
add('marble-short1', short({
  marks: 1,
  stem: 'State one observation when dilute hydrochloric acid is poured onto marble chips.',
  model: 'Brisk effervescence: a colourless, odourless gas (carbon dioxide) is given off, which turns lime water milky.',
  sol: 'Effervescence of CO₂.',
  scheme: [['Effervescence (CO₂)', 1]],
  d: 1, c: 'application', t: [4],
}));
add('bicarb-short2', short({
  marks: 2,
  stem: 'Baking soda (sodium hydrogencarbonate) and black copper(II) oxide are each added to dilute hydrochloric acid. Write a balanced equation for each reaction: (a) baking soda; (b) copper(II) oxide.',
  model: '(a) NaHCO₃ + HCl → NaCl + H₂O + CO₂. (b) CuO + 2HCl → CuCl₂ + H₂O.',
  sol: 'Two equations.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'application', t: [4],
}));
add('acidprops-short3', short({
  marks: 3,
  stem: 'Write balanced equations for the reactions of dilute hydrochloric acid with (a) iron filings, (b) sodium carbonate and (c) potassium hydroxide solution.',
  model: '(a) Fe + 2HCl → FeCl₂ + H₂. (b) Na₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂. (c) KOH + HCl → KCl + H₂O.',
  sol: 'Three equations.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [4],
}));
add('zn-num', num({
  stem: 'What volume of hydrogen, measured at STP, is given off when 6.5 g of zinc reacts completely with excess dilute hydrochloric acid? Give the answer in litres. (Zn = 65; one mole of a gas occupies 22.4 L at STP)',
  value: 2.24, tol: 0.01, unit: 'L',
  sol: r`$\ce{Zn + 2HCl -> ZnCl2 + H2}$: one mole of zinc gives one mole of hydrogen. Moles of zinc $= \dfrac{6.5}{65} = 0.1$. Volume of hydrogen $= 0.1 \times 22.4 = 2.24$, so 2.24 L.`,
  scheme: [['Moles of zinc', 1], ['2.24 L', 1]],
  marks: 2,
  d: 2, c: 'application', t: [4],
}), () => near((6.5 / 65) * 22.4, 2.24) || 'zn');

// ---------------------------------------------------------------- t05 aqua regia, precipitation, tests
add('aqua-mcq', mcq({
  stem: 'Aqua regia is prepared by mixing:',
  right: 'three volumes of concentrated hydrochloric acid with one volume of concentrated nitric acid',
  wrong: ['one volume of concentrated hydrochloric acid with three volumes of concentrated nitric acid', 'three volumes of concentrated hydrochloric acid with one volume of concentrated sulphuric acid', 'equal volumes of concentrated hydrochloric acid and water'],
  sol: 'Option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('ppt-mcq', mcq({
  stem: 'A few drops of dilute hydrochloric acid are added to silver nitrate solution. The observation is:',
  right: 'a curdy white precipitate that does not dissolve in dilute nitric acid',
  wrong: ['a yellow precipitate that dissolves in dilute nitric acid', 'a pale blue precipitate', 'a white precipitate that dissolves in dilute nitric acid'],
  sol: 'AgNO₃ + HCl → AgCl + HNO₃; silver chloride is insoluble in dilute nitric acid — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('leadppt-mcq', mcq({
  stem: 'Dilute hydrochloric acid is added to lead nitrate solution. A white precipitate forms, which dissolves when the mixture is heated. The precipitate is:',
  right: 'lead chloride',
  wrong: ['lead hydroxide', 'lead oxide', 'lead sulphate'],
  sol: 'Pb(NO₃)₂ + 2HCl → PbCl₂ + 2HNO₃; lead chloride is soluble in hot water — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('gold-mcq', mcq({
  stem: 'Gold does not dissolve in concentrated hydrochloric acid or in concentrated nitric acid alone, but it dissolves in aqua regia. This is because aqua regia produces:',
  right: 'nascent chlorine',
  wrong: ['nascent hydrogen', 'oxygen gas', 'ammonia gas'],
  sol: 'HNO₃ + 3HCl → NOCl + 2H₂O + 2Cl; the nascent chlorine converts gold into a soluble chloride — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('aqua-ar', ar({
  a: 'Aqua regia dissolves gold.',
  r: 'Aqua regia contains three volumes of concentrated nitric acid to one volume of concentrated hydrochloric acid.',
  key: 'a',
  sol: 'A is true; R is false: the ratio is three volumes of hydrochloric acid to one of nitric acid — option (a).',
  d: 2, c: 'recall', t: [5],
}));
add('litmus-tf', tf({
  stem: 'Hydrogen chloride gas turns moist blue litmus paper red.',
  key: 't',
  sol: 'True: in the moisture it forms hydrochloric acid.',
  d: 1, c: 'recall', t: [5],
}));
add('pbcl2-tf', tf({
  stem: 'Lead chloride is insoluble in hot water.',
  key: 'f',
  sol: 'False: lead chloride is insoluble in cold water but dissolves in hot water.',
  d: 2, c: 'recall', t: [5],
}));
add('agcl-tf', tf({
  stem: 'The white precipitate of silver chloride dissolves in excess ammonium hydroxide solution.',
  key: 't',
  sol: 'True: silver chloride is insoluble in dilute nitric acid but soluble in excess ammonium hydroxide.',
  d: 2, c: 'recall', t: [5],
}));
add('aqua-fill', fill({
  stem: 'Aqua regia is a mixture of concentrated hydrochloric acid and concentrated ___ acid in the ratio 3 : 1 by volume.',
  acc: [['nitric']],
  sol: 'Concentrated **nitric** acid.',
  d: 1, c: 'recall', t: [5],
}));
add('agno3-short1', short({
  marks: 1,
  stem: 'Write the balanced equation for the reaction of dilute hydrochloric acid with silver nitrate solution.',
  model: 'AgNO₃ + HCl → AgCl + HNO₃.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 1, c: 'application', t: [5],
}));
add('pbno3-short1', short({
  marks: 1,
  stem: 'Write the balanced equation for the reaction of dilute hydrochloric acid with lead nitrate solution.',
  model: 'Pb(NO₃)₂ + 2HCl → PbCl₂ + 2HNO₃.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 2, c: 'application', t: [5],
}));
add('aquause-short1', short({
  marks: 1,
  stem: 'State one use of aqua regia.',
  model: 'To dissolve noble metals such as gold and platinum (for example, in testing or purifying gold).',
  sol: 'Dissolving gold or platinum.',
  scheme: [['One use', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('distinguish-short2', short({
  marks: 2,
  stem: 'Two unlabelled bottles hold dilute hydrochloric acid and dilute nitric acid. Explain how silver nitrate solution can be used to tell them apart, with an equation.',
  model: 'Add silver nitrate solution to a little of each acid. Hydrochloric acid gives a curdy white precipitate of silver chloride, insoluble in dilute nitric acid: AgNO₃ + HCl → AgCl + HNO₃. Nitric acid gives no precipitate.',
  sol: 'White precipitate only with hydrochloric acid.',
  scheme: [['Observations for both acids', 1], ['Balanced equation', 1]],
  d: 2, c: 'analysis', t: [5],
}));
add('unknown-short3', short({
  marks: 3,
  stem: 'A colourless gas X fumes in moist air, turns moist blue litmus red and gives dense white fumes with a rod dipped in ammonia solution. A solution of X in water gives a curdy white precipitate with silver nitrate solution. (a) Identify X. (b) Write the equation for the white fumes. (c) Write the equation for the precipitate.',
  model: '(a) X is hydrogen chloride. (b) NH₃ + HCl → NH₄Cl. (c) AgNO₃ + HCl → AgCl + HNO₃.',
  sol: 'HCl; two equations.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'analysis', t: [4, 5],
}));
add('aqua-short3', short({
  marks: 3,
  stem: '(a) State the composition of aqua regia. (b) Write the equation that shows how aqua regia produces nascent chlorine. (c) Why can aqua regia dissolve gold when neither acid alone can?',
  model: '(a) Three volumes of concentrated hydrochloric acid and one volume of concentrated nitric acid. (b) HNO₃ + 3HCl → NOCl + 2H₂O + 2Cl. (c) Nitric acid oxidises hydrochloric acid to nascent (atomic) chlorine, which is very reactive and converts gold into soluble gold(III) chloride.',
  sol: 'Composition; equation; nascent chlorine.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'understanding', t: [5],
}));
add('hcl-fill', fill({
  stem: 'Complete each sentence by choosing the correct word or words from the bracket.\n\n(a) Hydrogen chloride is collected by ___ (upward / downward) displacement of air.\n\n(b) Hydrogen chloride is dried by passing it through ___ (concentrated sulphuric acid / quicklime).\n\n(c) Hydrogen chloride and ammonia form dense white fumes of ___ (ammonium chloride / ammonium nitrate).',
  acc: [['upward'], ['concentrated sulphuric acid', 'conc. sulphuric acid', 'sulphuric acid'], ['ammonium chloride']],
  sol: '(a) **upward**; (b) **concentrated sulphuric acid**; (c) **ammonium chloride**.',
  d: 1, c: 'recall', t: [1, 4],
}));
add('reagent-match', match({
  stem: 'Dilute hydrochloric acid is added to each substance in Column A. Match each with the gas in Column B that identifies the reaction.',
  pairs: [
    ['Zinc granules', 'Hydrogen, which burns with a pop'],
    ['Sodium carbonate', 'Carbon dioxide, which turns lime water milky'],
    ['Iron(II) sulphide', 'Hydrogen sulphide, which smells of rotten eggs'],
    ['Sodium sulphite', 'Sulphur dioxide, which turns acidified potassium dichromate green'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Zinc → hydrogen; sodium carbonate → carbon dioxide; iron(II) sulphide → hydrogen sulphide; sodium sulphite → sulphur dioxide.',
  d: 2, c: 'application', t: [4, 5],
}));
add('obs-match', match({
  stem: 'Match each test in Column A with the observation in Column B.',
  pairs: [
    ['Moist blue litmus paper held in hydrogen chloride', 'Turns red'],
    ['Dilute HCl added to lead nitrate solution, then the mixture heated', 'White precipitate that dissolves on heating'],
    ['Dilute HCl added to silver nitrate solution, then dilute nitric acid added', 'Curdy white precipitate that does not dissolve'],
    ['Dilute HCl warmed with black copper(II) oxide', 'Solid dissolves to give a blue-green solution'],
    ['Dilute HCl poured onto copper turnings', 'No visible change'],
  ],
  order: [3, 0, 4, 1, 2],
  sol: 'Litmus → turns red; lead nitrate → white precipitate soluble on heating; silver nitrate → white precipitate insoluble in nitric acid; copper(II) oxide → blue-green solution of copper(II) chloride; copper → no change (copper is below hydrogen).',
  d: 2, c: 'application', t: [4, 5],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('prep-long', long({
  stem: '(a) Write the balanced equation for the laboratory preparation of hydrogen chloride from sodium chloride, and state the temperature condition. [2]\n\n(b) Name the drying agent used, and give a reason why quicklime is not used. [2]\n\n(c) Name the method of collecting the gas, give a reason for it, and state how you would know that the gas jar is full. [3]\n\n(d) Hydrogen chloride is dissolved in water to make hydrochloric acid. Describe the arrangement used, and explain how it prevents back suction. [3]',
  model: '(a) NaCl + H₂SO₄ → NaHSO₄ + HCl; the mixture is heated below 200 °C.\n\n(b) Concentrated sulphuric acid. Quicklime is basic and reacts with hydrogen chloride (CaO + 2HCl → CaCl₂ + H₂O).\n\n(c) Upward displacement of air, because the gas is heavier than air (and too soluble to collect over water). A rod dipped in ammonia solution held at the mouth gives dense white fumes (or moist blue litmus turns red).\n\n(d) The gas is led into an inverted funnel whose rim just dips below the water in a beaker. If water rises into the funnel, the level in the beaker falls below the rim, air enters and the water falls back, so it cannot be sucked into the generating flask. The funnel also gives a large surface for absorption.',
  sol: 'Equation and condition; drying agent; collection and test; inverted funnel.',
  scheme: [['(a) equation', 1], ['(a) below 200 °C', 1], ['(b) drying agent', 1], ['(b) reason', 1], ['(c) method', 1], ['(c) reason', 1], ['(c) test', 1], ['(d) arrangement', 1], ['(d) explanation', 2]],
  d: 2, c: 'understanding', t: [1, 3],
}));
add('fountain-long', long({
  stem: '(a) State two physical properties of hydrogen chloride (other than colour). [2]\n\n(b) Describe an experiment to show that hydrogen chloride is heavier than air. [2]\n\n(c) Describe the fountain experiment, stating what you would see if the water in the trough contained blue litmus. [3]\n\n(d) A gas jar of hydrogen chloride is opened in moist air. (i) State what is seen at its mouth. (ii) Explain the observation. (iii) What does this show about the solubility of the gas? [3]',
  model: '(a) It is heavier than air (vapour density 18.25); it is extremely soluble in water; it has a pungent, choking smell and fumes in moist air (any two).\n\n(b) Tilt an open jar of hydrogen chloride over an open jar of air, as if pouring a liquid; a rod dipped in ammonia solution held in the lower jar then gives dense white fumes.\n\n(c) A dry flask filled with dry hydrogen chloride is fitted with a cork and a long jet tube and clamped upside down with the tube dipping into water containing blue litmus. A few drops of water entering dissolve much gas, the pressure inside falls, and atmospheric pressure forces the water up the tube as a fountain; the blue litmus turns red.\n\n(d) (i) Misty white fumes. (ii) The gas dissolves in the water vapour of the air, forming tiny droplets of hydrochloric acid. (iii) Hydrogen chloride is very soluble in water.',
  sol: 'Two properties; pouring experiment; fountain; fuming in moist air.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c) set-up', 1], ['(c) explanation', 1], ['(c) observation', 1], ['(d)(i)', 1], ['(d)(ii)', 1], ['(d)(iii)', 1]],
  d: 3, c: 'application', t: [2, 4],
}));
add('reactions-long', long({
  stem: '(a) Write balanced equations for the reactions of dilute hydrochloric acid with (i) zinc and (ii) iron. [2]\n\n(b) Write balanced equations for the reactions of dilute hydrochloric acid with (i) calcium carbonate and (ii) sodium hydrogencarbonate. [2]\n\n(c) Write the balanced equation for the action of dilute hydrochloric acid on sodium sulphite, and give one test for the gas formed. [3]\n\n(d) (i) Explain why silver does not react with dilute hydrochloric acid. (ii) Calculate the volume of hydrogen at STP given off when 3.25 g of zinc reacts with excess dilute hydrochloric acid. (Zn = 65; molar volume 22.4 L) [3]',
  model: r`(a) (i) Zn + 2HCl → ZnCl₂ + H₂. (ii) Fe + 2HCl → FeCl₂ + H₂.

(b) (i) CaCO₃ + 2HCl → CaCl₂ + H₂O + CO₂. (ii) NaHCO₃ + HCl → NaCl + H₂O + CO₂.

(c) Na₂SO₃ + 2HCl → 2NaCl + H₂O + SO₂. Sulphur dioxide turns orange acidified potassium dichromate paper green (or decolourises acidified potassium permanganate).

(d) (i) Silver is below hydrogen in the activity series, so it cannot displace hydrogen from the acid. (ii) One mole of zinc gives one mole of hydrogen. Moles of zinc $= \dfrac{3.25}{65} = 0.05$; volume of hydrogen $= 0.05 \times 22.4 = 1.12$, that is 1.12 L.`,
  sol: 'Six equations and a test; activity series; 1.12 L of hydrogen.',
  scheme: [['(a)(i)', 1], ['(a)(ii)', 1], ['(b)(i)', 1], ['(b)(ii)', 1], ['(c) equation', 2], ['(c) test', 1], ['(d)(i)', 1], ['(d)(ii) moles', 1], ['(d)(ii) 1.12 L', 1]],
  d: 3, c: 'application', t: [4],
}));
add('tests-long', long({
  stem: '(a) State the composition of aqua regia and one use of it. [2]\n\n(b) Write the balanced equation for the reaction of dilute hydrochloric acid with silver nitrate solution, and state the observation. [2]\n\n(c) Dilute hydrochloric acid is added to lead nitrate solution. (i) State the observation. (ii) Write the balanced equation. (iii) What happens when the mixture is heated? [3]\n\n(d) Give one test, with the result, to identify each of: (i) hydrogen chloride gas; (ii) hydrochloric acid; (iii) chloride ions in a solution of sodium chloride. [3]',
  model: '(a) Three volumes of concentrated hydrochloric acid and one volume of concentrated nitric acid; used to dissolve gold and platinum.\n\n(b) AgNO₃ + HCl → AgCl + HNO₃; a curdy white precipitate forms, insoluble in dilute nitric acid.\n\n(c) (i) A white precipitate. (ii) Pb(NO₃)₂ + 2HCl → PbCl₂ + 2HNO₃. (iii) The precipitate dissolves, because lead chloride is soluble in hot water.\n\n(d) (i) A rod dipped in ammonia solution gives dense white fumes (or moist blue litmus turns red). (ii) It turns blue litmus red and gives a curdy white precipitate with silver nitrate solution, insoluble in dilute nitric acid. (iii) Acidify with dilute nitric acid and add silver nitrate solution: a curdy white precipitate, soluble in excess ammonium hydroxide.',
  sol: 'Aqua regia; silver nitrate; lead nitrate; three tests.',
  scheme: [['(a) composition', 1], ['(a) use', 1], ['(b) equation', 1], ['(b) observation', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(d)(i)', 1], ['(d)(ii)', 1], ['(d)(iii)', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('unknown-long', long({
  stem: 'Four test tubes, A, B, C and D, contain sodium carbonate, iron(II) sulphide, zinc granules and sodium sulphite, not in that order. Dilute hydrochloric acid is added to each.\n\n(a) The gas from A burns with a pop. Identify A and write the equation. [2]\n\n(b) The gas from B turns lime water milky but has no smell. Identify B and write the equation. [2]\n\n(c) C and D both give gases with a smell. The gas from C turns lead acetate paper black; the gas from D turns acidified potassium dichromate green but not lead acetate paper. Identify C and D and name both gases. [3]\n\n(d) Silver nitrate solution is added to the liquid left in B after the reaction. State the observation, write the equation for it, and explain why dilute nitric acid is added before the silver nitrate in such tests. [3]',
  model: '(a) A is zinc: Zn + 2HCl → ZnCl₂ + H₂.\n\n(b) B is sodium carbonate: Na₂CO₃ + 2HCl → 2NaCl + H₂O + CO₂.\n\n(c) C is iron(II) sulphide, giving hydrogen sulphide; D is sodium sulphite, giving sulphur dioxide.\n\n(d) A curdy white precipitate: NaCl + AgNO₃ → AgCl + NaNO₃. Dilute nitric acid removes carbonate (and sulphite) ions, which would otherwise also give a white precipitate with silver nitrate; silver chloride alone stays undissolved in it.',
  sol: 'Identify from the gases; chloride test.',
  scheme: [['(a) identity', 1], ['(a) equation', 1], ['(b) identity', 1], ['(b) equation', 1], ['(c) C and its gas', 1.5], ['(c) D and its gas', 1.5], ['(d) observation', 1], ['(d) equation', 1], ['(d) reason', 1]],
  d: 4, c: 'analysis', t: [4, 5],
}));
