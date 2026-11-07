// ICSE 10 Chemistry ch11 Study of Compounds: Nitric Acid — question bank (ICSE 2027 specimen style: objective items,
// 1-mark equations / observations / names, a bracket completion, matches and 10-mark structured questions). Stems name
// their own substances, masses and set-ups. MCQ keys are placed by the builder; AR keys planned: a c b d a.
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const near = (a, b, tol = 1e-6) => Math.abs(a - b) <= tol;

// ---------------------------------------------------------------- t01 laboratory preparation
add('glass-chk-mcq', mcq({
  stem: 'The apparatus used to prepare nitric acid from potassium nitrate and concentrated sulphuric acid is made entirely of glass. The main reason is that:',
  right: 'nitric acid vapour attacks cork and rubber',
  wrong: ['glass conducts heat better than cork', 'rubber would absorb the potassium nitrate', 'glass catalyses the reaction'],
  sol: 'Hot nitric acid vapour is highly corrosive and attacks cork and rubber, so a glass retort with a glass stopper is used — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('yellow-chk-mcq', mcq({
  stem: 'A colourless sample of concentrated nitric acid, left in a clear glass bottle on a sunny window sill, slowly turns yellow. This is because:',
  right: 'light decomposes some of the acid, and the nitrogen dioxide formed dissolves in it',
  wrong: ['the acid absorbs moisture from the air', 'the acid reacts with the glass to form a yellow silicate', 'oxygen from the air dissolves in the acid'],
  sol: '4HNO₃ → 4NO₂ + 2H₂O + O₂; the reddish-brown NO₂ dissolves and colours the acid yellow — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('volatile-mcq', mcq({
  stem: 'Nitric acid is prepared by heating potassium nitrate with concentrated sulphuric acid. This works because sulphuric acid is:',
  right: 'less volatile than nitric acid',
  wrong: ['more volatile than nitric acid', 'a stronger oxidising agent than nitric acid', 'a dehydrating agent'],
  sol: 'The higher-boiling, less volatile acid displaces the more volatile nitric acid, which distils off — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('khso4-mcq', mcq({
  stem: 'Sodium nitrate is heated gently with concentrated sulphuric acid, keeping the temperature below 200 °C. The products are:',
  right: 'sodium hydrogen sulphate and nitric acid',
  wrong: ['sodium sulphate and nitric acid', 'sodium hydrogen sulphate and nitrogen dioxide', 'sodium sulphate and nitrogen dioxide'],
  sol: 'NaNO₃ + H₂SO₄ → NaHSO₄ + HNO₃; the normal salt forms only at much higher temperatures — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('temp-mcq', mcq({
  stem: 'Which of the following is NOT a reason for keeping the temperature below 200 °C when preparing nitric acid in the laboratory?',
  right: 'No nitric acid at all is formed above 200 °C',
  wrong: ['Nitric acid would start to decompose', 'The glass retort could crack', 'A hard crust of potassium sulphate would form'],
  sol: 'Nitric acid still forms at higher temperatures (KNO₃ + KHSO₄ → K₂SO₄ + HNO₃), but the other three effects make strong heating undesirable — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('storage-mcq', mcq({
  stem: 'Concentrated nitric acid is stored in dark brown bottles because:',
  right: 'light decomposes it',
  wrong: ['it reacts with clear glass', 'it absorbs moisture from the air', 'brown glass catalyses its formation'],
  sol: 'Brown glass keeps out light, which would decompose the acid to NO₂, water and oxygen — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('glass-ar', ar({
  a: 'In the laboratory preparation of nitric acid, the apparatus has no rubber or cork parts.',
  r: 'Nitric acid vapour attacks rubber and cork.',
  key: 'c',
  sol: 'Both are true, and R explains A — option (c).',
  d: 1, c: 'understanding', t: [1],
}));
add('brown-ar', ar({
  a: 'Concentrated nitric acid kept in a clear bottle in sunlight turns yellow.',
  r: 'Nitric acid is a weak acid.',
  key: 'a',
  sol: 'A is true (light decomposes it, giving dissolved NO₂); R is false: nitric acid is a strong acid — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('kno3-tf', tf({
  stem: 'Potassium sulphate is formed when potassium nitrate is heated with concentrated sulphuric acid below 200 °C.',
  key: 'f',
  sol: 'False: below 200 °C the product is potassium hydrogen sulphate, KHSO₄.',
  d: 1, c: 'recall', t: [1],
}));
add('brown-fill', fill({
  stem: 'Concentrated nitric acid is stored in ___ bottles to protect it from light.',
  acc: [['brown', 'dark brown', 'amber', 'dark']],
  sol: 'In **brown** (dark) bottles.',
  d: 1, c: 'recall', t: [1],
}));
add('cool-fill', fill({
  stem: 'In the laboratory preparation of nitric acid, the receiver is cooled with ___ so that the acid vapour condenses.',
  acc: [['water', 'cold water', 'running water', 'ice']],
  sol: 'Cold running **water** (or ice) cools the receiver.',
  d: 1, c: 'recall', t: [1],
}));
add('lab-short1', short({
  marks: 1,
  stem: 'Write the balanced equation for the laboratory preparation of nitric acid from sodium nitrate.',
  model: 'NaNO₃ + H₂SO₄ → NaHSO₄ + HNO₃ (below 200 °C).',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 1, c: 'application', t: [1],
}));
add('decomp-short1', short({
  marks: 1,
  stem: 'Write the balanced equation for the decomposition of nitric acid by sunlight.',
  model: '4HNO₃ → 4NO₂ + 2H₂O + O₂.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 2, c: 'application', t: [1],
}));
add('kno3-num', num({
  stem: 'What mass of nitric acid, in grams, is obtained when 20.2 g of potassium nitrate is heated with excess concentrated sulphuric acid below 200 °C? (K = 39, N = 14, O = 16, H = 1)',
  value: 12.6, tol: 0.01, unit: 'g',
  sol: r`$\ce{KNO3 + H2SO4 -> KHSO4 + HNO3}$: one mole of potassium nitrate gives one mole of nitric acid. Molar mass of $\ce{KNO3} = 39 + 14 + 3 \times 16 = 101$. Moles $= \dfrac{20.2}{101} = 0.2$. Molar mass of $\ce{HNO3} = 1 + 14 + 3 \times 16 = 63$. Mass of nitric acid $= 0.2 \times 63 = 12.6$, so 12.6 g.`,
  scheme: [['Moles of KNO₃ and 1 : 1 ratio', 1], ['12.6 g', 1]],
  marks: 2,
  d: 2, c: 'application', t: [1],
}), () => near((20.2 / 101) * 63, 12.6) || 'kno3');
add('yellow-short2', short({
  marks: 2,
  stem: 'Concentrated nitric acid in the laboratory is often yellow. (a) Explain why. (b) How can the yellow colour be removed?',
  model: '(a) Heat or light decomposes some of the acid (4HNO₃ → 4NO₂ + 2H₂O + O₂); the reddish-brown nitrogen dioxide dissolves in the acid and colours it yellow. (b) By bubbling dry air (or carbon dioxide) through the warm acid, which drives out the NO₂, or by adding water.',
  sol: 'Dissolved NO₂; blow air through warm acid.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('temp-short2', short({
  marks: 2,
  stem: 'Give two reasons why the temperature is kept below 200 °C in the laboratory preparation of nitric acid.',
  model: 'Any two: at higher temperatures nitric acid decomposes (giving NO₂); the glass apparatus may crack; a hard crust of potassium sulphate forms that is difficult to remove; more fuel is wasted for little extra acid.',
  sol: 'Two reasons.',
  scheme: [['First reason', 1], ['Second reason', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 Ostwald's process
add('pt-chk-mcq', mcq({
  stem: 'In the first step of Ostwald’s process, ammonia is oxidised to nitric oxide. The catalyst and the approximate temperature are:',
  right: 'platinum gauze, about 800 °C',
  wrong: ['iron with molybdenum, about 450 °C', 'vanadium pentoxide, about 450 °C', 'nickel, about 200 °C'],
  sol: '4NH₃ + 5O₂ → 4NO + 6H₂O over platinum at about 800 °C — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('step2-mcq', mcq({
  stem: 'In Ostwald’s process, the colourless gas leaving the platinum gauze is cooled and mixed with more air. The gas formed is:',
  right: 'reddish-brown nitrogen dioxide',
  wrong: ['colourless nitrous oxide', 'reddish-brown nitric oxide', 'pale yellow nitrogen'],
  sol: '2NO + O₂ → 2NO₂; nitric oxide is colourless and nitrogen dioxide is reddish brown — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('absorb-mcq', mcq({
  stem: 'The last step of Ostwald’s process, which produces nitric acid, needs:',
  right: 'nitrogen dioxide, water and oxygen',
  wrong: ['nitric oxide and water only', 'ammonia and water', 'nitrogen dioxide and sulphuric acid'],
  sol: '4NO₂ + 2H₂O + O₂ → 4HNO₃ — option (@K).',
  d: 2, c: 'recall', t: [2],
}));
add('nh3air-mcq', mcq({
  stem: 'In the first step of Ostwald’s process, dry ammonia is mixed with air in the ratio, by volume, of about:',
  right: '1 : 10',
  wrong: ['1 : 3', '10 : 1', '2 : 1'],
  sol: 'Ammonia and air are mixed in about 1 : 10 by volume — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('ostwald-ar', ar({
  a: 'In Ostwald’s process, the platinum gauze stays red-hot without outside heating once the reaction has started.',
  r: 'Platinum is a good conductor of electricity.',
  key: 'd',
  sol: 'Both are true, but the gauze stays hot because the oxidation of ammonia is exothermic, not because platinum conducts electricity — option (d).',
  d: 2, c: 'understanding', t: [2],
}));
add('pt-tf', tf({
  stem: 'Platinum is the catalyst for the oxidation of ammonia in Ostwald’s process.',
  key: 't',
  sol: 'True: a platinum gauze at about 800 °C.',
  d: 1, c: 'recall', t: [2],
}));
add('ostwald3-short1', short({
  marks: 1,
  stem: 'Write the balanced equation for the conversion of nitrogen dioxide into nitric acid in Ostwald’s process.',
  model: '4NO₂ + 2H₂O + O₂ → 4HNO₃.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 2, c: 'application', t: [2],
}));
add('ostwald-short3', short({
  marks: 3,
  stem: 'For Ostwald’s process: (a) name the catalyst and the temperature used in the first step; (b) write the balanced equations for the second and third steps; (c) explain why extra air is supplied in the third step.',
  model: '(a) Platinum gauze; about 800 °C. (b) 2NO + O₂ → 2NO₂; 4NO₂ + 2H₂O + O₂ → 4HNO₃. (c) Oxygen is a reactant in the third step: without it, nitrogen dioxide and water alone would not convert all the nitrogen into nitric acid.',
  sol: 'Pt, 800 °C; two equations; oxygen needed.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 oxidising agent
add('cuconc-chk-mcq', mcq({
  stem: 'A few drops of concentrated nitric acid are poured onto copper turnings in a test tube. The gas given off is:',
  right: 'nitrogen dioxide, reddish brown',
  wrong: ['hydrogen, colourless', 'nitric oxide, colourless throughout', 'oxygen, colourless'],
  sol: 'Cu + 4HNO₃ → Cu(NO₃)₂ + 2H₂O + 2NO₂ — option (@K).',
  d: 1, c: 'application', t: [3],
}));
add('carbon-chk-mcq', mcq({
  stem: 'Powdered charcoal is heated with concentrated nitric acid. The products are:',
  right: 'carbon dioxide, water and nitrogen dioxide',
  wrong: ['carbon monoxide, water and nitric oxide', 'carbon dioxide and hydrogen', 'carbonic acid and ammonia'],
  sol: 'C + 4HNO₃ → CO₂ + 2H₂O + 4NO₂ — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('cudil-mcq', mcq({
  stem: 'Copper turnings are warmed with nitric acid diluted 1 : 1 with water. A colourless gas forms inside the tube, but reddish-brown fumes appear at its mouth. The colourless gas is:',
  right: 'nitric oxide, NO',
  wrong: ['nitrogen dioxide, NO₂', 'hydrogen, H₂', 'oxygen, O₂'],
  sol: '3Cu + 8HNO₃ → 3Cu(NO₃)₂ + 4H₂O + 2NO; at the mouth 2NO + O₂ → 2NO₂ — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('sulphur-mcq', mcq({
  stem: 'Sulphur powder is heated with concentrated nitric acid. The sulphur is converted into:',
  right: 'sulphuric acid',
  wrong: ['sulphur dioxide', 'hydrogen sulphide', 'sulphur trioxide'],
  sol: 'S + 6HNO₃ → H₂SO₄ + 2H₂O + 6NO₂ — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('ratio-mcq', mcq({
  stem: 'In the reaction 3Cu + 8HNO₃ → 3Cu(NO₃)₂ + 4H₂O + 2NO, how many of the eight nitric acid molecules act as an oxidising agent (that is, have their nitrogen changed into nitric oxide)?',
  right: '2',
  wrong: ['6', '8', '3'],
  sol: 'Only 2 nitrogen atoms end up in NO; the other 6 stay as nitrate ions in 3Cu(NO₃)₂ and act only as an acid — option (@K).',
  d: 4, c: 'analysis', t: [3],
}));
add('nitrate-ar', ar({
  a: 'Reddish-brown fumes appear at the mouth of a test tube in which copper is reacting with dilute nitric acid.',
  r: 'The nitric oxide formed in the tube combines with oxygen of the air to form nitrogen dioxide.',
  key: 'c',
  sol: 'Both are true, and R explains A: 2NO + O₂ → 2NO₂ — option (c).',
  d: 3, c: 'analysis', t: [3],
}));
add('h2-ar', ar({
  a: 'Copper gives hydrogen gas with concentrated nitric acid.',
  r: 'Nitric acid is a strong oxidising agent.',
  key: 'b',
  sol: 'A is false: copper gives nitrogen dioxide, not hydrogen. R is true — option (b).',
  d: 2, c: 'application', t: [3],
}));
add('cuconc-short1', short({
  marks: 1,
  stem: 'Write the balanced equation for the reaction of copper with concentrated nitric acid.',
  model: 'Cu + 4HNO₃ → Cu(NO₃)₂ + 2H₂O + 2NO₂.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 2, c: 'application', t: [3],
}));
add('carbon-short1', short({
  marks: 1,
  stem: 'Write the balanced equation for the action of hot concentrated nitric acid on charcoal.',
  model: 'C + 4HNO₃ → CO₂ + 2H₂O + 4NO₂.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 2, c: 'application', t: [3],
}));
add('sulphur-short1', short({
  marks: 1,
  stem: 'Write the balanced equation for the oxidation of sulphur by hot concentrated nitric acid.',
  model: 'S + 6HNO₃ → H₂SO₄ + 2H₂O + 6NO₂.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 2, c: 'application', t: [3],
}));
add('obs-short1', short({
  marks: 1,
  stem: 'State one observation when concentrated nitric acid is added to copper turnings.',
  model: 'Reddish-brown fumes are given off (or: the copper dissolves and the solution turns green, then blue on dilution).',
  sol: 'Brown fumes.',
  scheme: [['One correct observation', 1]],
  d: 1, c: 'understanding', t: [3],
}));
add('cuno2-num', num({
  stem: 'Copper turnings weighing 12.7 g dissolve completely in excess concentrated nitric acid. What volume of nitrogen dioxide, measured at STP, is given off? Give the answer in litres. (Cu = 63.5; one mole of a gas occupies 22.4 L at STP)',
  value: 8.96, tol: 0.01, unit: 'L',
  sol: r`$\ce{Cu + 4HNO3 -> Cu(NO3)2 + 2H2O + 2NO2}$: one mole of copper gives two moles of nitrogen dioxide. Moles of Cu $= \dfrac{12.7}{63.5} = 0.2$. Moles of $\ce{NO2} = 2 \times 0.2 = 0.4$. Volume $= 0.4 \times 22.4 = 8.96$, so 8.96 L.`,
  scheme: [['Moles of Cu and 1 : 2 ratio', 1], ['8.96 L', 1]],
  marks: 2,
  d: 3, c: 'application', t: [3],
}), () => near((12.7 / 63.5) * 2 * 22.4, 8.96) || 'cuno2');
add('cuno-num', num({
  stem: 'Copper weighing 9.525 g dissolves completely in dilute nitric acid. What volume of nitric oxide, measured at STP, is formed? Give the answer in litres. (Cu = 63.5; one mole of a gas occupies 22.4 L at STP)',
  value: 2.24, tol: 0.01, unit: 'L',
  sol: r`$\ce{3Cu + 8HNO3 -> 3Cu(NO3)2 + 4H2O + 2NO}$: three moles of copper give two moles of nitric oxide. Moles of Cu $= \dfrac{9.525}{63.5} = 0.15$. Moles of NO $= 0.15 \times \dfrac{2}{3} = 0.1$. Volume $= 0.1 \times 22.4 = 2.24$, so 2.24 L.`,
  scheme: [['Moles of Cu and 3 : 2 ratio', 1], ['2.24 L', 1]],
  marks: 2,
  d: 3, c: 'application', t: [3],
}), () => near((9.525 / 63.5) * (2 / 3) * 22.4, 2.24) || 'cuno');
add('cu2-short2', short({
  marks: 2,
  stem: 'Compare the action of concentrated and dilute nitric acid on copper by writing the balanced equation for each.',
  model: 'Concentrated: Cu + 4HNO₃ → Cu(NO₃)₂ + 2H₂O + 2NO₂ (reddish-brown gas). Dilute: 3Cu + 8HNO₃ → 3Cu(NO₃)₂ + 4H₂O + 2NO (colourless gas).',
  sol: 'Two equations.',
  scheme: [['Concentrated', 1], ['Dilute', 1]],
  d: 2, c: 'application', t: [3],
}));
add('nonmetal-short3', short({
  marks: 3,
  stem: 'Hot concentrated nitric acid is added separately to charcoal and to sulphur. (a) Write a balanced equation for each reaction. (b) Name the gas given off in both, and state its colour. (c) Which property of nitric acid do both reactions show? Give a reason.',
  model: '(a) C + 4HNO₃ → CO₂ + 2H₂O + 4NO₂; S + 6HNO₃ → H₂SO₄ + 2H₂O + 6NO₂. (b) Nitrogen dioxide, reddish brown. (c) Nitric acid acts as an oxidising agent: it gives oxygen that oxidises carbon to carbon dioxide and sulphur to sulphuric acid, and is itself reduced to NO₂.',
  sol: 'Equations; NO₂; oxidising agent.',
  scheme: [['(a) both equations', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'analysis', t: [3],
}));

// ---------------------------------------------------------------- t04 acidic properties
add('mg-mcq', mcq({
  stem: 'A clean magnesium ribbon is dropped into very dilute nitric acid (about 1%). The gas given off is:',
  right: 'hydrogen',
  wrong: ['nitrogen dioxide', 'nitric oxide', 'oxygen'],
  sol: 'Mg + 2HNO₃ → Mg(NO₃)₂ + H₂: very dilute acid gives hydrogen with magnesium — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('monobasic-mcq', mcq({
  stem: 'Nitric acid forms only one kind of salt, sodium nitrate, with sodium hydroxide. This shows that nitric acid is:',
  right: 'monobasic',
  wrong: ['dibasic', 'tribasic', 'a weak acid'],
  sol: 'One replaceable hydrogen per molecule, so only normal salts (nitrates) form — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('sulphite-mcq', mcq({
  stem: 'Dilute nitric acid is added to sodium hydrogen sulphite. The gas given off, and a test for it, are:',
  right: 'sulphur dioxide, which turns orange acidified potassium dichromate solution green',
  wrong: ['carbon dioxide, which turns lime water milky', 'hydrogen sulphide, which turns lead acetate paper black', 'hydrogen, which burns with a pop'],
  sol: 'NaHSO₃ + HNO₃ → NaNO₃ + H₂O + SO₂ — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('basic-mcq', mcq({
  stem: 'Black copper(II) oxide is warmed with dilute nitric acid. The observation is:',
  right: 'the black solid dissolves to give a blue solution',
  wrong: ['reddish-brown fumes are given off', 'a white precipitate forms', 'hydrogen is given off'],
  sol: 'CuO + 2HNO₃ → Cu(NO₃)₂ + H₂O; copper(II) nitrate solution is blue — option (@K).',
  d: 1, c: 'application', t: [4],
}));
add('feh2-tf', tf({
  stem: 'Iron filings give hydrogen with moderately dilute nitric acid just as they do with dilute hydrochloric acid.',
  key: 'f',
  sol: 'False: nitric acid oxidises the hydrogen to water; only very dilute nitric acid gives hydrogen, and only with magnesium or manganese.',
  d: 2, c: 'understanding', t: [4],
}));
add('mn-fill', fill({
  stem: 'Besides magnesium, the metal ___ gives hydrogen with very dilute nitric acid.',
  acc: [['manganese', 'Mn']],
  sol: '**Manganese**: Mn + 2HNO₃ → Mn(NO₃)₂ + H₂.',
  d: 1, c: 'recall', t: [4],
}));
add('mn-short1', short({
  marks: 1,
  stem: 'Name the two metals that give hydrogen with very dilute nitric acid.',
  model: 'Magnesium and manganese.',
  sol: 'Mg and Mn.',
  scheme: [['Both metals', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('zno-short1', short({
  marks: 1,
  stem: 'Write the balanced equation for the reaction of zinc oxide with dilute nitric acid.',
  model: 'ZnO + 2HNO₃ → Zn(NO₃)₂ + H₂O.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 1, c: 'application', t: [4],
}));
add('khco3-short1', short({
  marks: 1,
  stem: 'Write the balanced equation for the action of dilute nitric acid on potassium hydrogencarbonate.',
  model: 'KHCO₃ + HNO₃ → KNO₃ + H₂O + CO₂.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 1, c: 'application', t: [4],
}));
add('naoh-short1', short({
  marks: 1,
  stem: 'Write the balanced equation for the neutralisation of sodium hydroxide solution by dilute nitric acid.',
  model: 'NaOH + HNO₃ → NaNO₃ + H₂O.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 1, c: 'application', t: [4],
}));
add('h2-short2', short({
  marks: 2,
  stem: 'Explain why only very dilute nitric acid gives hydrogen with metals, and write the balanced equation for its reaction with manganese.',
  model: 'Nitric acid is a strong oxidising agent, so it normally oxidises any hydrogen formed to water. In very dilute acid (about 1%) its oxidising power is weak, and with very reactive metals such as magnesium and manganese some hydrogen escapes. Mn + 2HNO₃ → Mn(NO₃)₂ + H₂.',
  sol: 'Oxidising power; equation.',
  scheme: [['Reason', 1], ['Equation', 1]],
  d: 3, c: 'analysis', t: [4],
}));
add('distinguish-short2', short({
  marks: 2,
  stem: 'How would you distinguish dilute nitric acid from dilute hydrochloric acid using copper turnings? State the observation for each.',
  model: 'Warm each acid with copper turnings. Dilute nitric acid reacts: the solution turns blue and a colourless gas forms that turns reddish brown at the mouth of the tube (NO, then NO₂). Dilute hydrochloric acid does not react with copper: no change.',
  sol: 'Copper reacts only with nitric acid.',
  scheme: [['Nitric acid: blue solution and brown fumes at the mouth', 1], ['Hydrochloric acid: no reaction', 1]],
  d: 2, c: 'analysis', t: [3, 4],
}));

// ---------------------------------------------------------------- t05 tests
add('ring-chk-mcq', mcq({
  stem: 'In the brown ring test for a nitrate, the test solution is first mixed with:',
  right: 'freshly prepared iron(II) sulphate solution, before concentrated sulphuric acid is poured down the side',
  wrong: ['copper(II) sulphate solution, before dilute hydrochloric acid is added', 'iron(III) chloride solution, before sodium hydroxide is added', 'silver nitrate solution, before dilute nitric acid is added'],
  sol: 'Fresh FeSO₄ solution, then concentrated H₂SO₄ layered underneath; the brown ring forms at the junction — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('test-mcq', mcq({
  stem: 'A colourless liquid is warmed with copper turnings and gives reddish-brown fumes and a bluish-green solution. The liquid is most likely:',
  right: 'concentrated nitric acid',
  wrong: ['concentrated hydrochloric acid', 'dilute sulphuric acid', 'sodium hydroxide solution'],
  sol: 'Only nitric acid oxidises copper with brown NO₂ fumes — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('ring-tf', tf({
  stem: 'In the brown ring test, the brown ring forms at the top surface of the liquid in the test tube.',
  key: 'f',
  sol: 'False: it forms at the junction of the heavy sulphuric acid layer and the upper layer of test solution and iron(II) sulphate.',
  d: 1, c: 'recall', t: [5],
}));
add('ring-short1', short({
  marks: 1,
  stem: 'In the brown ring test, why is concentrated sulphuric acid poured slowly down the side of the test tube?',
  model: 'So that the heavy acid sinks to form a separate layer below the solution, and the brown ring forms at the junction of the two layers.',
  sol: 'Forms a separate lower layer.',
  scheme: [['Separate layer, ring at the junction', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('unknown-short3', short({
  marks: 3,
  stem: 'A colourless liquid X turns blue litmus red. When warmed with copper turnings it gives reddish-brown fumes; with sodium carbonate it effervesces; and it gives a brown ring in the brown ring test. (a) Identify X. (b) Write the balanced equation for its reaction with sodium carbonate. (c) Name the gas given off with copper and write the balanced equation.',
  model: '(a) Concentrated nitric acid. (b) Na₂CO₃ + 2HNO₃ → 2NaNO₃ + H₂O + CO₂. (c) Nitrogen dioxide: Cu + 4HNO₃ → Cu(NO₃)₂ + 2H₂O + 2NO₂.',
  sol: 'Acid; brown fumes with copper and a brown ring: nitric acid.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'analysis', t: [3, 4, 5],
}));

// ---------------------------------------------------------------- matches and the bracket completion
add('ostwald-fill', fill({
  stem: 'Complete each sentence by choosing the correct word from the bracket.\n\n(a) In Ostwald’s process, ammonia is oxidised over a ___ (platinum / iron) gauze.\n\n(b) Nitric oxide is a ___ (colourless / reddish-brown) gas.\n\n(c) Pure nitric acid is ___ (colourless / yellow).',
  acc: [['platinum'], ['colourless'], ['colourless']],
  sol: '(a) **platinum**; (b) **colourless**; (c) **colourless**.',
  d: 1, c: 'recall', t: [1, 2, 3],
}));
add('cond-match', match({
  stem: 'Match each process or test in Column A with the condition or reagent in Column B.',
  pairs: [
    ['Laboratory preparation of nitric acid', 'Gentle heating below 200 °C in an all-glass apparatus'],
    ['Storing concentrated nitric acid', 'Dark brown bottles'],
    ['Removing the yellow colour of the acid', 'Dry air bubbled through the warm acid'],
    ['Brown ring test', 'Fresh iron(II) sulphate solution and concentrated sulphuric acid'],
    ['Collecting nitric acid vapour', 'Receiver cooled by running water'],
  ],
  order: [3, 0, 4, 1, 2],
  sol: 'Laboratory preparation → below 200 °C, all glass; storing → brown bottles; removing yellow colour → dry air through warm acid; brown ring test → fresh FeSO₄ and conc. H₂SO₄; collecting the vapour → cooled receiver.',
  d: 2, c: 'recall', t: [1, 5],
}));
add('gas-match', match({
  stem: 'Match each pair of reactants in Column A with the gas given off in Column B.',
  pairs: [
    ['Copper and concentrated nitric acid', 'Nitrogen dioxide'],
    ['Copper and dilute nitric acid', 'Nitric oxide'],
    ['Magnesium and very dilute nitric acid', 'Hydrogen'],
    ['Sodium hydrogencarbonate and dilute nitric acid', 'Carbon dioxide'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Copper and conc. acid → NO₂; copper and dil. acid → NO; magnesium and very dilute acid → H₂; sodium hydrogencarbonate → CO₂.',
  d: 2, c: 'application', t: [3, 4],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('prep-long', long({
  stem: '(a) Name the two reactants used to prepare nitric acid in the laboratory, and write the balanced equation. [2]\n\n(b) Explain why (i) the apparatus is made entirely of glass and (ii) the receiver is cooled. [2]\n\n(c) Give three reasons why the reaction mixture is not heated above 200 °C. [3]\n\n(d) Calculate (i) the mass of potassium nitrate needed to prepare 25.2 g of nitric acid and (ii) the mass of potassium hydrogen sulphate formed at the same time. (K = 39, N = 14, O = 16, H = 1, S = 32) [3]',
  model: r`(a) Potassium nitrate and concentrated sulphuric acid. KNO₃ + H₂SO₄ → KHSO₄ + HNO₃.

(b) (i) Nitric acid vapour attacks cork and rubber. (ii) To condense the nitric acid vapour into a liquid.

(c) Nitric acid would decompose; the glass retort could crack; a hard crust of potassium sulphate would form (any three, with wasted fuel also accepted).

(d) One mole of nitric acid needs one mole of potassium nitrate and gives one mole of potassium hydrogen sulphate. Moles of nitric acid $= \dfrac{25.2}{63} = 0.4$. (i) Mass of potassium nitrate $= 0.4 \times 101 = 40.4$, that is 40.4 g. (ii) Molar mass of potassium hydrogen sulphate $= 39 + 1 + 32 + 4 \times 16 = 136$; mass $= 0.4 \times 136 = 54.4$, that is 54.4 g.`,
  sol: 'Reactants and equation; reasons; three reasons; 1 : 1 : 1 mole ratio.',
  scheme: [['(a) reactants', 1], ['(a) equation', 1], ['(b)(i)', 1], ['(b)(ii)', 1], ['(c) three reasons', 3], ['(d) moles of HNO₃', 1], ['(d)(i) 40.4 g', 1], ['(d)(ii) 54.4 g', 1]],
  d: 3, c: 'application', t: [1],
}), () => (near((25.2 / 63) * 101, 40.4) && near(0.4 * 136, 54.4)) || 'prep-long');
add('ostwald-long', long({
  stem: '(a) Write the balanced equation for the first step of Ostwald’s process and state the catalyst and temperature. [2]\n\n(b) Write the balanced equations for the second and third steps. [2]\n\n(c) (i) Why does the catalyst stay red-hot once the reaction has started? (ii) Why does concentrated nitric acid often look yellow? (iii) How can this colour be removed? [3]\n\n(d) Calculate the volumes, at STP, of (i) oxygen needed and (ii) nitric oxide formed when 8.5 g of ammonia is oxidised in the first step. (N = 14, H = 1; molar volume 22.4 L) [3]',
  model: r`(a) 4NH₃ + 5O₂ → 4NO + 6H₂O; platinum gauze, about 800 °C.

(b) 2NO + O₂ → 2NO₂; 4NO₂ + 2H₂O + O₂ → 4HNO₃.

(c) (i) The oxidation of ammonia is exothermic; the heat given out keeps the gauze hot. (ii) Some acid decomposes, and the nitrogen dioxide formed dissolves in it. (iii) Bubble dry air (or carbon dioxide) through the warm acid, or add water.

(d) Moles of ammonia $= \dfrac{8.5}{17} = 0.5$. From the equation, 4 moles of ammonia need 5 moles of oxygen and give 4 moles of nitric oxide. (i) Moles of oxygen $= 0.5 \times \dfrac{5}{4} = 0.625$; volume $= 0.625 \times 22.4 = 14$, that is 14 L. (ii) Moles of nitric oxide $= 0.5$; volume $= 0.5 \times 22.4 = 11.2$, that is 11.2 L.`,
  sol: 'Equations with conditions; reasons; 4 : 5 : 4 mole ratio.',
  scheme: [['(a) equation', 1], ['(a) conditions', 1], ['(b) step 2', 1], ['(b) step 3', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(d) moles of NH₃', 1], ['(d)(i) 14 L', 1], ['(d)(ii) 11.2 L', 1]],
  d: 3, c: 'application', t: [1, 2],
}), () => (near((8.5 / 17) * (5 / 4) * 22.4, 14) && near((8.5 / 17) * 22.4, 11.2)) || 'ostwald-long');
add('oxid-long', long({
  stem: '(a) Explain why nitric acid acts as an oxidising agent, and name the gas formed from the acid when (i) concentrated and (ii) dilute nitric acid reacts with copper. [2]\n\n(b) Write the balanced equations for the reaction of copper with (i) concentrated and (ii) dilute nitric acid. [2]\n\n(c) Write the balanced equations for the action of hot concentrated nitric acid on (i) carbon and (ii) sulphur, and state one observation common to both. [3]\n\n(d) 19.05 g of copper dissolves completely in dilute nitric acid. Calculate (i) the volume of nitric oxide formed at STP and (ii) the mass of copper(II) nitrate formed. (Cu = 63.5, N = 14, O = 16; molar volume 22.4 L) [3]',
  model: r`(a) It decomposes easily to give oxygen, which oxidises other substances. (i) Nitrogen dioxide. (ii) Nitric oxide.

(b) (i) Cu + 4HNO₃ → Cu(NO₃)₂ + 2H₂O + 2NO₂. (ii) 3Cu + 8HNO₃ → 3Cu(NO₃)₂ + 4H₂O + 2NO.

(c) (i) C + 4HNO₃ → CO₂ + 2H₂O + 4NO₂. (ii) S + 6HNO₃ → H₂SO₄ + 2H₂O + 6NO₂. Reddish-brown fumes are given off in both.

(d) Moles of copper $= \dfrac{19.05}{63.5} = 0.3$. Three moles of copper give two moles of nitric oxide and three moles of copper(II) nitrate. (i) Moles of nitric oxide $= 0.3 \times \dfrac{2}{3} = 0.2$; volume $= 0.2 \times 22.4 = 4.48$, that is 4.48 L. (ii) Molar mass of copper(II) nitrate $= 63.5 + 2 \times 14 + 6 \times 16 = 187.5$; mass $= 0.3 \times 187.5 = 56.25$, that is 56.25 g.`,
  sol: 'Oxygen from decomposition; two copper equations; carbon and sulphur; 3 : 2 and 1 : 1 ratios.',
  scheme: [['(a) reason', 1], ['(a) both gases', 1], ['(b)(i)', 1], ['(b)(ii)', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c) observation', 1], ['(d) moles of Cu', 1], ['(d)(i) 4.48 L', 1], ['(d)(ii) 56.25 g', 1]],
  d: 3, c: 'application', t: [3],
}), () => (near((19.05 / 63.5) * (2 / 3) * 22.4, 4.48) && near(0.3 * 187.5, 56.25) && near(63.5 + 28 + 96, 187.5)) || 'oxid-long');
add('acid-long', long({
  stem: '(a) What is meant by saying that nitric acid is monobasic? Name the normal salt it forms with potassium hydroxide. [2]\n\n(b) A magnesium ribbon is placed in very dilute nitric acid. Write the balanced equation, and explain why more concentrated nitric acid does not give this gas. [2]\n\n(c) Write the balanced equations for the reactions of dilute nitric acid with (i) copper(II) oxide, (ii) sodium carbonate and (iii) sodium hydrogen sulphite. [3]\n\n(d) Dilute nitric acid is added to three test tubes holding sodium hydrogencarbonate, sodium sulphite and copper(II) oxide. State one observation for each tube, naming any gas given off. [3]',
  model: '(a) Each molecule has one replaceable hydrogen atom, so it forms only one kind of salt (a normal salt). Potassium nitrate, KNO₃.\n\n(b) Mg + 2HNO₃ → Mg(NO₃)₂ + H₂. More concentrated nitric acid is a strong oxidising agent and oxidises the hydrogen to water.\n\n(c) (i) CuO + 2HNO₃ → Cu(NO₃)₂ + H₂O. (ii) Na₂CO₃ + 2HNO₃ → 2NaNO₃ + H₂O + CO₂. (iii) NaHSO₃ + HNO₃ → NaNO₃ + H₂O + SO₂.\n\n(d) Sodium hydrogencarbonate: brisk effervescence of carbon dioxide (turns lime water milky). Sodium sulphite: effervescence of sulphur dioxide, with a smell of burning sulphur (turns acidified potassium dichromate green). Copper(II) oxide: the black solid dissolves to a blue solution; no gas.',
  sol: 'Basicity; hydrogen only from very dilute acid; three equations; three observations.',
  scheme: [['(a) meaning', 1], ['(a) KNO₃', 1], ['(b) equation', 1], ['(b) reason', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(d) NaHCO₃', 1], ['(d) Na₂SO₃', 1], ['(d) CuO', 1]],
  d: 3, c: 'analysis', t: [4],
}));
add('test-long', long({
  stem: 'Three unlabelled bottles, P, Q and R, contain dilute nitric acid, dilute hydrochloric acid and dilute sulphuric acid, in some order.\n\n(a) Copper turnings are warmed with a sample from each bottle. Only the sample from P reacts. Identify P, state two observations and write the balanced equation. [3]\n\n(b) Describe how the brown ring test is carried out on a sample from P, and state where the brown ring appears. [3]\n\n(c) Suggest one reagent that distinguishes Q from R. State the observation with each acid, and write the balanced equation for the reaction that gives a visible change. [4]',
  model: '(a) P is dilute nitric acid. The solution turns blue, and a colourless gas forms that turns reddish brown at the mouth of the tube. 3Cu + 8HNO₃ → 3Cu(NO₃)₂ + 4H₂O + 2NO.\n\n(b) Mix the sample with freshly prepared iron(II) sulphate solution in a test tube. Tilt the tube and pour concentrated sulphuric acid slowly down the side so that it forms a separate layer at the bottom. A brown ring appears at the junction of the two layers.\n\n(c) Barium chloride solution. Dilute sulphuric acid gives a white precipitate of barium sulphate (insoluble in dilute hydrochloric acid); dilute hydrochloric acid gives no precipitate. H₂SO₄ + BaCl₂ → BaSO₄ + 2HCl. (Silver nitrate is also accepted: a curdy white precipitate with hydrochloric acid only.)',
  sol: 'Copper reacts only with nitric acid; brown ring procedure; barium chloride for sulphate.',
  scheme: [['(a) P identified', 1], ['(a) two observations', 1], ['(a) equation', 1], ['(b) fresh FeSO₄', 1], ['(b) conc. H₂SO₄ down the side', 1], ['(b) ring at the junction', 1], ['(c) reagent', 1], ['(c) sulphuric acid observation', 1], ['(c) hydrochloric acid observation', 1], ['(c) equation', 1]],
  d: 4, c: 'analysis', t: [3, 5],
}));
