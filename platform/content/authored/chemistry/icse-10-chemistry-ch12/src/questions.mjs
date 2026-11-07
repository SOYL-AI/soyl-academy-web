// ICSE 10 Chemistry ch12 Study of Compounds: Sulphuric Acid — question bank (ICSE 2027 specimen style: objective items,
// 1-mark equations / observations / names, a bracket completion, matches and 10-mark structured questions). Stems name
// their own substances, masses and set-ups. MCQ keys are placed by the builder; AR keys planned: a c b d a.
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const near = (a, b, tol = 1e-6) => Math.abs(a - b) <= tol;

// ---------------------------------------------------------------- t01 Contact process
add('v2o5-chk-mcq', mcq({
  stem: 'In the Contact process, sulphur dioxide is oxidised to sulphur trioxide. The catalyst and the approximate temperature are:',
  right: 'vanadium pentoxide, about 450 °C',
  wrong: ['platinum gauze, about 800 °C', 'finely divided iron, about 500 °C', 'nickel, about 200 °C'],
  sol: '2SO₂ + O₂ ⇌ 2SO₃ over V₂O₅ at about 450 °C and 1–2 atm — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('oleum-chk-mcq', mcq({
  stem: 'In the Contact process, sulphur trioxide is not passed directly into water. The reason is that:',
  right: 'the reaction is so exothermic that a dense mist of acid forms, which is hard to condense',
  wrong: ['sulphur trioxide does not dissolve in water at all', 'water would poison the vanadium pentoxide catalyst', 'water converts sulphur trioxide back into sulphur dioxide'],
  sol: 'SO₃ is absorbed in concentrated H₂SO₄ instead, giving oleum, which is then diluted — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('contact-temp-mcq', mcq({
  stem: 'The reaction 2SO₂ + O₂ ⇌ 2SO₃ is exothermic, so a lower temperature would give more SO₃ at equilibrium. Yet the Contact process runs at about 450 °C. The best reason is that:',
  right: 'at much lower temperatures the reaction is too slow, even with the catalyst',
  wrong: ['the reaction is endothermic, so heat must be supplied', 'vanadium pentoxide only exists above 450 °C', 'sulphur trioxide decomposes completely below 450 °C'],
  sol: 'About 450 °C is a compromise: fast enough with V₂O₅, while still giving a good yield — option (@K).',
  d: 4, c: 'analysis', t: [1],
}));
add('oleum-mcq', mcq({
  stem: 'Sulphur trioxide dissolved in concentrated sulphuric acid forms:',
  right: 'oleum, H₂S₂O₇',
  wrong: ['dilute sulphuric acid', 'sulphurous acid, H₂SO₃', 'sulphur dioxide'],
  sol: 'SO₃ + H₂SO₄ → H₂S₂O₇ (fuming sulphuric acid) — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('pyrite-mcq', mcq({
  stem: 'Sulphur dioxide for the Contact process can be obtained by burning sulphur or by roasting:',
  right: 'iron pyrites, FeS₂',
  wrong: ['bauxite', 'haematite', 'limestone'],
  sol: 'Iron pyrites is a sulphide ore; roasting it in air gives SO₂ — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('contact-ar', ar({
  a: 'In the Contact process, sulphur trioxide is absorbed in concentrated sulphuric acid rather than in water.',
  r: 'Sulphur trioxide reacts with water so exothermically that a dense acid mist forms, which is difficult to condense.',
  key: 'c',
  sol: 'Both are true, and R explains A — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('v2o5-tf', tf({
  stem: 'In the Contact process, sulphur dioxide is oxidised to sulphur trioxide over a platinum catalyst at about 800 °C.',
  key: 'f',
  sol: 'False: the catalyst is vanadium pentoxide at about 450 °C (platinum at 800 °C is used in Ostwald’s process).',
  d: 1, c: 'recall', t: [1],
}));
add('oleum-fill', fill({
  stem: 'Sulphur trioxide dissolves in concentrated sulphuric acid to form ___, which is then diluted with water.',
  acc: [['oleum', 'fuming sulphuric acid', 'pyrosulphuric acid', 'H₂S₂O₇']],
  sol: '**Oleum** (fuming sulphuric acid), H₂S₂O₇.',
  d: 1, c: 'recall', t: [1],
}));
add('step2-short1', short({
  marks: 1,
  stem: 'Write the balanced equation, with the catalyst and temperature, for the conversion of sulphur dioxide to sulphur trioxide in the Contact process.',
  model: '2SO₂ + O₂ ⇌ 2SO₃ (vanadium pentoxide, about 450 °C).',
  sol: 'Equation with conditions.',
  scheme: [['Equation with V₂O₅ and 450 °C', 1]],
  d: 1, c: 'application', t: [1],
}));
add('oleum-short1', short({
  marks: 1,
  stem: 'Write the balanced equations for the formation of oleum and for its dilution to sulphuric acid.',
  model: 'SO₃ + H₂SO₄ → H₂S₂O₇; H₂S₂O₇ + H₂O → 2H₂SO₄.',
  sol: 'Two equations.',
  scheme: [['Both equations', 1]],
  d: 2, c: 'application', t: [1],
}));
add('s-num', num({
  stem: 'What mass of sulphuric acid, in grams, can be made from 16 g of sulphur by the Contact process, assuming complete conversion? (S = 32, H = 1, O = 16)',
  value: 49, tol: 0.1, unit: 'g',
  sol: r`Every sulphur atom ends up in one molecule of sulphuric acid ($\ce{S -> SO2 -> SO3 -> H2SO4}$), so one mole of sulphur gives one mole of acid. Moles of S $= \dfrac{16}{32} = 0.5$. Molar mass of $\ce{H2SO4} = 2 \times 1 + 32 + 4 \times 16 = 98$. Mass of acid $= 0.5 \times 98 = 49$, so 49 g.`,
  scheme: [['Moles of S and 1 : 1 ratio', 1], ['49 g', 1]],
  marks: 2,
  d: 2, c: 'application', t: [1],
}), () => near((16 / 32) * 98, 49) || 's');
add('water-short2', short({
  marks: 2,
  stem: 'Why is sulphur trioxide not dissolved directly in water in the Contact process? How is it converted into sulphuric acid instead?',
  model: 'Its reaction with water is so exothermic that a dense mist (fog) of acid droplets forms, which does not condense easily. Instead it is absorbed in concentrated sulphuric acid to form oleum (SO₃ + H₂SO₄ → H₂S₂O₇), which is diluted with the right amount of water (H₂S₂O₇ + H₂O → 2H₂SO₄).',
  sol: 'Acid mist; oleum, then dilution.',
  scheme: [['Reason', 1], ['Oleum route', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('contact-short3', short({
  marks: 3,
  stem: 'For the Contact process: (a) write the equation for the burning of sulphur; (b) state the catalyst, temperature and pressure used to oxidise sulphur dioxide; (c) explain why excess air is used in the catalytic step.',
  model: '(a) S + O₂ → SO₂. (b) Vanadium pentoxide; about 450 °C; 1–2 atm. (c) Extra oxygen pushes the reversible reaction 2SO₂ + O₂ ⇌ 2SO₃ forward, so that more sulphur dioxide is converted to sulphur trioxide.',
  sol: 'Equation; conditions; excess oxygen favours SO₃.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 dilute acid: a dibasic acid
add('acidsalt-chk-mcq', mcq({
  stem: 'A solution containing 1 mole of sodium hydroxide is mixed with a solution containing 1 mole of sulphuric acid. The salt formed is:',
  right: 'sodium hydrogen sulphate, NaHSO₄, an acid salt',
  wrong: ['sodium sulphate, Na₂SO₄, a normal salt', 'sodium sulphite, Na₂SO₃, a normal salt', 'sodium hydrogen sulphite, NaHSO₃, an acid salt'],
  sol: 'NaOH + H₂SO₄ → NaHSO₄ + H₂O: only one of the two hydrogens is replaced — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('dibasic-mcq', mcq({
  stem: 'Sulphuric acid is described as dibasic because:',
  right: 'each molecule can give two hydrogen ions',
  wrong: ['it reacts with two different bases at once', 'it contains two oxygen atoms that can be replaced', 'its solutions have a pH of 2'],
  sol: 'H₂SO₄ → 2H⁺ + SO₄²⁻: two replaceable hydrogens — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('fe-mcq', mcq({
  stem: 'Iron filings are added to dilute sulphuric acid. The products are:',
  right: 'iron(II) sulphate and hydrogen',
  wrong: ['iron(III) sulphate and hydrogen', 'iron(II) sulphate and sulphur dioxide', 'iron(III) oxide and water'],
  sol: 'Fe + H₂SO₄ → FeSO₄ + H₂ — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('marble-mcq', mcq({
  stem: 'Marble chips are dropped into dilute sulphuric acid. Fizzing starts at once but soon stops, although plenty of marble and acid remain. This is because:',
  right: 'slightly soluble calcium sulphate forms a coating on the marble',
  wrong: ['the carbon dioxide dissolves in the acid', 'dilute sulphuric acid is a weak acid', 'marble is an amphoteric substance'],
  sol: 'CaCO₃ + H₂SO₄ → CaSO₄ + H₂O + CO₂; the CaSO₄ layer keeps the acid away from the carbonate — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('sulphide-mcq', mcq({
  stem: 'Dilute sulphuric acid is poured onto zinc sulphide. The gas given off is:',
  right: 'hydrogen sulphide, which smells of rotten eggs',
  wrong: ['sulphur dioxide, which smells of burning sulphur', 'hydrogen, which burns with a pop', 'sulphur trioxide, which forms white fumes'],
  sol: 'ZnS + H₂SO₄ → ZnSO₄ + H₂S — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('bisulphite-mcq', mcq({
  stem: 'Which equation correctly shows the reaction of dilute sulphuric acid with sodium hydrogen sulphite?',
  right: '2NaHSO₃ + H₂SO₄ → Na₂SO₄ + 2H₂O + 2SO₂',
  wrong: ['NaHSO₃ + H₂SO₄ → Na₂SO₄ + H₂O + SO₂', '2NaHSO₃ + H₂SO₄ → Na₂SO₄ + 2H₂ + 2SO₃', 'NaHSO₃ + H₂SO₄ → NaHSO₄ + H₂S + O₂'],
  sol: 'Sulphur dioxide and water are formed, and the equation must balance: Na 2, H 4, S 3, O 10 on each side — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('dibasic-ar', ar({
  a: 'Sulphuric acid forms two kinds of salts with sodium hydroxide.',
  r: 'Sulphuric acid is a monobasic acid.',
  key: 'a',
  sol: 'A is true (NaHSO₄ and Na₂SO₄); R is false: sulphuric acid is dibasic — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('copper-ar', ar({
  a: 'Dilute sulphuric acid reacts with copper to give hydrogen.',
  r: 'Copper is below hydrogen in the activity series.',
  key: 'b',
  sol: 'A is false: copper does not displace hydrogen from dilute acids. R is true — option (b).',
  d: 2, c: 'application', t: [2],
}));
add('nahso4-tf', tf({
  stem: 'Sodium hydrogen sulphate is an acid salt.',
  key: 't',
  sol: 'True: it still contains one replaceable hydrogen.',
  d: 1, c: 'recall', t: [2],
}));
add('salt-fill', fill({
  stem: 'When sodium hydroxide and sulphuric acid react in a 1 : 1 mole ratio, the salt formed is sodium ___ sulphate.',
  acc: [['hydrogen', 'hydrogen sulphate', 'bi']],
  sol: 'Sodium **hydrogen** sulphate, NaHSO₄ (an acid salt).',
  d: 1, c: 'recall', t: [2],
}));
add('nahso4-short1', short({
  marks: 1,
  stem: 'Write the balanced equation for the reaction of sodium hydroxide with sulphuric acid in which an acid salt is formed.',
  model: 'NaOH + H₂SO₄ → NaHSO₄ + H₂O.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 1, c: 'application', t: [2],
}));
add('mg-short1', short({
  marks: 1,
  stem: 'Write the balanced equation for the reaction of magnesium ribbon with dilute sulphuric acid.',
  model: 'Mg + H₂SO₄ → MgSO₄ + H₂.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 1, c: 'application', t: [2],
}));
add('na2so3-short1', short({
  marks: 1,
  stem: 'Write the balanced equation for the action of dilute sulphuric acid on sodium sulphite.',
  model: 'Na₂SO₃ + H₂SO₄ → Na₂SO₄ + H₂O + SO₂.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 1, c: 'application', t: [2],
}));
add('fes-short1', short({
  marks: 1,
  stem: 'Write the balanced equation for the action of dilute sulphuric acid on iron(II) sulphide.',
  model: 'FeS + H₂SO₄ → FeSO₄ + H₂S.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 1, c: 'application', t: [2],
}));
add('cuo-short1', short({
  marks: 1,
  stem: 'Write the balanced equation for black copper(II) oxide dissolving in warm dilute sulphuric acid.',
  model: 'CuO + H₂SO₄ → CuSO₄ + H₂O.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 1, c: 'application', t: [2],
}));
add('baso4-num', num({
  stem: 'Excess barium chloride solution is added to a solution containing 9.8 g of sulphuric acid. What mass of barium sulphate, in grams, is precipitated? (Ba = 137, S = 32, O = 16, H = 1)',
  value: 23.3, tol: 0.05, unit: 'g',
  sol: r`$\ce{BaCl2 + H2SO4 -> BaSO4 + 2HCl}$: one mole of acid gives one mole of barium sulphate. Moles of acid $= \dfrac{9.8}{98} = 0.1$. Molar mass of $\ce{BaSO4} = 137 + 32 + 4 \times 16 = 233$. Mass $= 0.1 \times 233 = 23.3$, so 23.3 g.`,
  scheme: [['Moles of H₂SO₄ and 1 : 1 ratio', 1], ['23.3 g', 1]],
  marks: 2,
  d: 2, c: 'application', t: [2, 5],
}), () => near((9.8 / 98) * 233, 23.3) || 'baso4');
add('dibasic-short2', short({
  marks: 2,
  stem: 'Explain why sulphuric acid is called dibasic. Write the balanced equations for its reactions with potassium hydroxide that form (a) an acid salt and (b) a normal salt.',
  model: 'Each molecule has two replaceable hydrogen atoms (H₂SO₄ → 2H⁺ + SO₄²⁻). (a) KOH + H₂SO₄ → KHSO₄ + H₂O. (b) 2KOH + H₂SO₄ → K₂SO₄ + 2H₂O.',
  sol: 'Two replaceable hydrogens; two equations.',
  scheme: [['Reason and (a)', 1], ['(b)', 1]],
  d: 2, c: 'application', t: [2],
}));
add('dist-short2', short({
  marks: 2,
  stem: 'How would you distinguish dilute sulphuric acid from dilute hydrochloric acid using barium chloride solution? State the observation for each.',
  model: 'Add barium chloride solution to each. Dilute sulphuric acid gives a white precipitate of barium sulphate that does not dissolve in dilute hydrochloric acid; dilute hydrochloric acid gives no precipitate.',
  sol: 'White precipitate only with sulphuric acid.',
  scheme: [['Sulphuric acid: white precipitate', 1], ['Hydrochloric acid: no change', 1]],
  d: 2, c: 'analysis', t: [2, 5],
}));

// ---------------------------------------------------------------- t03 oxidising agent
add('carbon-chk-mcq', mcq({
  stem: 'Charcoal is heated with concentrated sulphuric acid. The gases given off are:',
  right: 'carbon dioxide and sulphur dioxide',
  wrong: ['carbon monoxide and hydrogen', 'carbon dioxide and nitrogen dioxide', 'sulphur trioxide and hydrogen'],
  sol: 'C + 2H₂SO₄ → CO₂ + 2H₂O + 2SO₂ — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('sulphur-oxid-mcq', mcq({
  stem: 'Sulphur is heated with concentrated sulphuric acid. The products are:',
  right: 'sulphur dioxide and water only',
  wrong: ['hydrogen sulphide and water', 'sulphur trioxide and hydrogen', 'sulphuric acid and nitrogen dioxide'],
  sol: 'S + 2H₂SO₄ → 3SO₂ + 2H₂O — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('oxid-mcq', mcq({
  stem: 'In the reaction C + 2H₂SO₄ → CO₂ + 2H₂O + 2SO₂, sulphuric acid acts as:',
  right: 'an oxidising agent',
  wrong: ['a dehydrating agent', 'a reducing agent', 'a drying agent'],
  sol: 'It supplies oxygen to carbon and is itself reduced to SO₂ — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('s-short1', short({
  marks: 1,
  stem: 'Write the balanced equation for the action of hot concentrated sulphuric acid on sulphur.',
  model: 'S + 2H₂SO₄ → 3SO₂ + 2H₂O.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 2, c: 'application', t: [3],
}));
add('c-num', num({
  stem: 'Charcoal weighing 3 g is heated with excess concentrated sulphuric acid until it has all reacted. What volume of sulphur dioxide, measured at STP, is formed? Give the answer in litres. (C = 12; one mole of a gas occupies 22.4 L at STP)',
  value: 11.2, tol: 0.01, unit: 'L',
  sol: r`$\ce{C + 2H2SO4 -> CO2 + 2H2O + 2SO2}$: one mole of carbon gives two moles of sulphur dioxide. Moles of C $= \dfrac{3}{12} = 0.25$. Moles of $\ce{SO2} = 2 \times 0.25 = 0.5$. Volume $= 0.5 \times 22.4 = 11.2$, so 11.2 L.`,
  scheme: [['Moles of C and 1 : 2 ratio', 1], ['11.2 L', 1]],
  marks: 2,
  d: 3, c: 'application', t: [3],
}), () => near((3 / 12) * 2 * 22.4, 11.2) || 'c');

// ---------------------------------------------------------------- t04 dehydrating agent; drying
add('dehyd-chk-mcq', mcq({
  stem: 'A few spoonfuls of sugar in a beaker are treated with concentrated sulphuric acid. The sugar blackens and a spongy black mass rises out of the beaker. The property of the acid shown is its:',
  right: 'dehydrating property',
  wrong: ['acidic property', 'non-volatile nature', 'drying property'],
  sol: 'The acid removes the elements of water: C₁₂H₂₂O₁₁ → 12C + 11H₂O — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('cuso4-mcq', mcq({
  stem: 'Concentrated sulphuric acid is added to blue crystals of copper(II) sulphate in a test tube. The crystals:',
  right: 'turn white, as the water of crystallisation is removed',
  wrong: ['turn black, as copper metal is formed', 'dissolve to give a deep blue solution', 'turn green, as copper(II) carbonate forms'],
  sol: 'CuSO₄·5H₂O → CuSO₄ + 5H₂O; anhydrous copper(II) sulphate is white — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('dry-mcq', mcq({
  stem: 'Concentrated sulphuric acid can be used to dry:',
  right: 'sulphur dioxide',
  wrong: ['ammonia', 'hydrogen sulphide', 'both ammonia and hydrogen sulphide'],
  sol: 'Ammonia reacts to form ammonium sulphate and hydrogen sulphide is oxidised to sulphur; sulphur dioxide does not react — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('drydehyd-mcq', mcq({
  stem: 'Which of these is drying, not dehydration?',
  right: 'Passing moist chlorine through concentrated sulphuric acid',
  wrong: ['Concentrated sulphuric acid charring cane sugar', 'Concentrated sulphuric acid turning blue vitriol white', 'Concentrated sulphuric acid blackening a strip of paper'],
  sol: 'Only the chlorine is unchanged; it merely loses moisture. The others remove the elements of water from compounds — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('sugar-ar', ar({
  a: 'Concentrated sulphuric acid chars cane sugar.',
  r: 'Concentrated sulphuric acid is a non-volatile acid.',
  key: 'd',
  sol: 'Both are true, but charring is due to the dehydrating property, not to the acid being non-volatile — option (d).',
  d: 2, c: 'understanding', t: [4, 5],
}));
add('drying-ar', ar({
  a: 'Concentrated sulphuric acid is not used to dry ammonia gas.',
  r: 'Ammonia, a base, reacts with sulphuric acid to form ammonium sulphate.',
  key: 'c',
  sol: 'Both are true, and R explains A: 2NH₃ + H₂SO₄ → (NH₄)₂SO₄ — option (c).',
  d: 2, c: 'application', t: [4],
}));
add('dry-tf', tf({
  stem: 'Removing the water of crystallisation from blue copper(II) sulphate with concentrated sulphuric acid is an example of drying.',
  key: 'f',
  sol: 'False: it is dehydration; the blue crystals become a different substance, white anhydrous copper(II) sulphate.',
  d: 2, c: 'understanding', t: [4],
}));
add('char-fill', fill({
  stem: 'The black mass left when concentrated sulphuric acid acts on sugar is mainly ___.',
  acc: [['carbon', 'C', 'sugar charcoal']],
  sol: 'Mainly **carbon** (sugar charcoal).',
  d: 1, c: 'recall', t: [4],
}));
add('sugar-short1', short({
  marks: 1,
  stem: 'State one observation when concentrated sulphuric acid is added to cane sugar in a beaker.',
  model: 'The sugar turns black and a spongy black mass of carbon rises (with steam, and the beaker becomes hot).',
  sol: 'Black spongy mass.',
  scheme: [['One correct observation', 1]],
  d: 1, c: 'understanding', t: [4],
}));
add('cuso4-short1', short({
  marks: 1,
  stem: 'State the colour change when concentrated sulphuric acid is added to crystals of hydrated copper(II) sulphate.',
  model: 'Blue to white.',
  sol: 'Blue to white.',
  scheme: [['Blue to white', 1]],
  d: 1, c: 'understanding', t: [4],
}));
add('dry-short2', short({
  marks: 2,
  stem: 'Distinguish between drying and dehydration, giving one example of each using concentrated sulphuric acid.',
  model: 'Drying removes moisture that is merely present, without changing the substance: moist chlorine (or SO₂, HCl) passed through concentrated sulphuric acid. Dehydration removes the elements of water (H and O in the ratio 2 : 1) from a compound, forming a new substance: the acid charring sugar (C₁₂H₂₂O₁₁ → 12C + 11H₂O) or turning blue vitriol white.',
  sol: 'Definitions with an example each.',
  scheme: [['Drying with example', 1], ['Dehydration with example', 1]],
  d: 2, c: 'analysis', t: [4],
}));
add('cuso4-short2', short({
  marks: 2,
  stem: 'Concentrated sulphuric acid is added to blue vitriol. (a) State the observation. (b) Write the equation and name the property of the acid shown.',
  model: '(a) The blue crystals turn into a white powder. (b) CuSO₄·5H₂O → CuSO₄ + 5H₂O; dehydrating property.',
  sol: 'Blue to white; dehydration.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('sugar-short3', short({
  marks: 3,
  stem: 'Concentrated sulphuric acid is added to sugar in a beaker. (a) State two observations. (b) Write the balanced equation for the reaction. (c) Name the property of the acid shown, and explain why the process is called charring.',
  model: '(a) Any two: the sugar turns yellow, brown and then black; a black spongy mass rises out of the beaker; steam is given off; the beaker becomes very hot. (b) C₁₂H₂₂O₁₁ → 12C + 11H₂O (conc. H₂SO₄). (c) Dehydrating property. The acid removes hydrogen and oxygen as water, leaving black carbon, like the charcoal left when something is burnt.',
  sol: 'Observations; equation; dehydration.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'analysis', t: [4],
}));

// ---------------------------------------------------------------- t05 non-volatile nature; tests
add('baso4-chk-mcq', mcq({
  stem: 'Barium chloride solution is added to dilute sulphuric acid, and then dilute hydrochloric acid is added. The observation is:',
  right: 'a white precipitate that does not dissolve in the hydrochloric acid',
  wrong: ['a white precipitate that dissolves in the hydrochloric acid', 'a yellow precipitate', 'no change at any stage'],
  sol: 'BaCl₂ + H₂SO₄ → BaSO₄ + 2HCl; barium sulphate is insoluble in dilute acids — option (@K).',
  d: 1, c: 'application', t: [5],
}));
add('nonvol-mcq', mcq({
  stem: 'Concentrated sulphuric acid is used to prepare hydrogen chloride from sodium chloride mainly because sulphuric acid is:',
  right: 'non-volatile, with a high boiling point',
  wrong: ['a dehydrating agent', 'an oxidising agent', 'dibasic'],
  sol: 'The non-volatile acid drives the volatile HCl out of its salt — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('pbso4-mcq', mcq({
  stem: 'Dilute sulphuric acid is added to lead nitrate solution. The observation is:',
  right: 'a white precipitate of lead sulphate',
  wrong: ['a yellow precipitate of lead iodide', 'a white precipitate of lead chloride', 'brown fumes of nitrogen dioxide'],
  sol: 'Pb(NO₃)₂ + H₂SO₄ → PbSO₄ + 2HNO₃ — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('ba-tf', tf({
  stem: 'The white precipitate formed by barium chloride with a sulphate dissolves in dilute hydrochloric acid.',
  key: 'f',
  sol: 'False: barium sulphate is insoluble in dilute hydrochloric acid; that is what confirms a sulphate.',
  d: 1, c: 'recall', t: [5],
}));
add('kcl-short1', short({
  marks: 1,
  stem: 'Write the balanced equation for the reaction of concentrated sulphuric acid with potassium chloride that shows its non-volatile nature.',
  model: 'KCl + H₂SO₄ → KHSO₄ + HCl (below 200 °C).',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 2, c: 'application', t: [5],
}));
add('bacl2-short1', short({
  marks: 1,
  stem: 'Name the reagent used to test for a sulphate ion in solution, and state the observation.',
  model: 'Barium chloride solution: a white precipitate, insoluble in dilute hydrochloric acid.',
  sol: 'BaCl₂; white precipitate.',
  scheme: [['Reagent and observation', 1]],
  d: 1, c: 'understanding', t: [5],
}));
add('unknown-short3', short({
  marks: 3,
  stem: 'A colourless, oily liquid X chars a strip of paper. A dilute solution of X gives a white precipitate with barium chloride solution that does not dissolve in dilute hydrochloric acid. When concentrated X is heated with charcoal, the gas mixture formed turns acidified potassium dichromate solution green and lime water milky. (a) Identify X. (b) Write the balanced equation for the reaction with barium chloride. (c) Write the balanced equation for the reaction with charcoal.',
  model: '(a) Concentrated sulphuric acid. (b) BaCl₂ + H₂SO₄ → BaSO₄ + 2HCl. (c) C + 2H₂SO₄ → CO₂ + 2H₂O + 2SO₂.',
  sol: 'Charring, sulphate test and SO₂ with CO₂ point to sulphuric acid.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'analysis', t: [3, 4, 5],
}));

// ---------------------------------------------------------------- the bracket completion and matches
add('contact-fill', fill({
  stem: 'Complete each sentence by choosing the correct word or words from the bracket.\n\n(a) The catalyst used to oxidise sulphur dioxide in the Contact process is ___ (vanadium pentoxide / platinum).\n\n(b) Concentrated sulphuric acid turns sugar ___ (black / white).\n\n(c) Barium sulphate is ___ (soluble / insoluble) in dilute hydrochloric acid.',
  acc: [['vanadium pentoxide'], ['black'], ['insoluble']],
  sol: '(a) **vanadium pentoxide**; (b) **black**; (c) **insoluble**.',
  d: 1, c: 'recall', t: [1, 4, 5],
}));
add('prop-match', match({
  stem: 'Match each property of sulphuric acid in Column A with the change in Column B that shows it.',
  pairs: [
    ['Dibasic acid', 'Forms both NaHSO₄ and Na₂SO₄ with sodium hydroxide'],
    ['Oxidising agent', 'Hot concentrated acid turns charcoal into carbon dioxide'],
    ['Dehydrating agent', 'Concentrated acid turns cane sugar into black carbon'],
    ['Drying agent', 'Moist chlorine bubbled through the concentrated acid comes out dry'],
    ['Typical acid', 'The dilute acid turns blue litmus red'],
  ],
  order: [4, 2, 0, 1, 3],
  sol: 'Dibasic → NaHSO₄ and Na₂SO₄; oxidising agent → charcoal to CO₂; dehydrating agent → sugar to carbon; drying agent → moist chlorine dried; typical acid → blue litmus turns red.',
  d: 2, c: 'application', t: [2, 3, 4],
}));
add('conc-match', match({
  stem: 'Concentrated sulphuric acid is heated with each substance in Column A. Match it with the product in Column B that leaves as a gas or vapour.',
  pairs: [
    ['Charcoal', 'Carbon dioxide and sulphur dioxide'],
    ['Sulphur', 'Sulphur dioxide only'],
    ['Sodium chloride', 'Hydrogen chloride'],
    ['Potassium nitrate', 'Nitric acid vapour'],
  ],
  order: [1, 3, 0, 2],
  sol: 'Charcoal → CO₂ and SO₂; sulphur → SO₂ only; sodium chloride → HCl; potassium nitrate → HNO₃ vapour.',
  d: 2, c: 'application', t: [3, 5],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('contact-long', long({
  stem: '(a) Write the balanced equations for (i) the burning of sulphur and (ii) the catalytic oxidation of sulphur dioxide, stating the catalyst and temperature for (ii). [2]\n\n(b) The oxidation of sulphur dioxide is reversible and exothermic. Why is excess air used, and why is the pressure only 1–2 atm? [2]\n\n(c) (i) Why is sulphur trioxide not absorbed directly in water? (ii) Write the equation for the formation of oleum. (iii) Write the equation for the conversion of oleum into sulphuric acid. [3]\n\n(d) 12.8 g of sulphur is completely converted into sulphuric acid. Calculate (i) the mass of sulphuric acid formed and (ii) the total volume of oxygen at STP used in the first two steps. (S = 32, H = 1, O = 16; molar volume 22.4 L) [3]',
  model: r`(a) (i) S + O₂ → SO₂. (ii) 2SO₂ + O₂ ⇌ 2SO₃; vanadium pentoxide, about 450 °C.

(b) Excess oxygen pushes the reversible reaction forward, converting more SO₂ to SO₃. A good conversion is already obtained at 1–2 atm, so costly high pressure is not needed.

(c) (i) The reaction is violently exothermic and forms a dense acid mist that does not condense easily. (ii) SO₃ + H₂SO₄ → H₂S₂O₇. (iii) H₂S₂O₇ + H₂O → 2H₂SO₄.

(d) Moles of sulphur $= \dfrac{12.8}{32} = 0.4$. (i) One mole of sulphur gives one mole of sulphuric acid: mass $= 0.4 \times 98 = 39.2$, that is 39.2 g. (ii) Step 1 uses one mole of oxygen per mole of sulphur and step 2 half a mole more, so moles of oxygen $= 0.4 \times 1.5 = 0.6$; volume $= 0.6 \times 22.4 = 13.44$, that is 13.44 L.`,
  sol: 'Equations with conditions; reasons; oleum route; 1 : 1 and 1 : 1.5 ratios.',
  scheme: [['(a)(i)', 1], ['(a)(ii) with conditions', 1], ['(b) excess air', 1], ['(b) pressure', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(d) moles of S', 1], ['(d)(i) 39.2 g', 1], ['(d)(ii) 13.44 L', 1]],
  d: 3, c: 'application', t: [1],
}), () => (near((12.8 / 32) * 98, 39.2) && near((12.8 / 32) * 1.5 * 22.4, 13.44)) || 'contact-long');
add('dilute-long', long({
  stem: '(a) What is meant by a dibasic acid? Write the equation for the complete ionisation of sulphuric acid in water. [2]\n\n(b) Write the balanced equations for the reaction of sodium hydroxide with sulphuric acid to form (i) an acid salt and (ii) a normal salt. [2]\n\n(c) Write the balanced equations for dilute sulphuric acid with (i) sodium carbonate, (ii) sodium hydrogen sulphite and (iii) sodium sulphide. [3]\n\n(d) (i) Explain why dilute sulphuric acid is not used with marble chips to prepare carbon dioxide. (ii) Calculate the mass of sodium hydroxide needed to neutralise 4.9 g of sulphuric acid completely. (Na = 23, O = 16, H = 1, S = 32) [3]',
  model: r`(a) An acid with two replaceable hydrogen atoms per molecule. H₂SO₄ → 2H⁺ + SO₄²⁻.

(b) (i) NaOH + H₂SO₄ → NaHSO₄ + H₂O. (ii) 2NaOH + H₂SO₄ → Na₂SO₄ + 2H₂O.

(c) (i) Na₂CO₃ + H₂SO₄ → Na₂SO₄ + H₂O + CO₂. (ii) 2NaHSO₃ + H₂SO₄ → Na₂SO₄ + 2H₂O + 2SO₂. (iii) Na₂S + H₂SO₄ → Na₂SO₄ + H₂S.

(d) (i) Calcium sulphate formed is only slightly soluble; it coats the marble chips and stops the reaction. (ii) Complete neutralisation: 2NaOH + H₂SO₄ → Na₂SO₄ + 2H₂O. Moles of acid $= \dfrac{4.9}{98} = 0.05$; moles of NaOH $= 2 \times 0.05 = 0.1$; mass $= 0.1 \times 40 = 4$, that is 4 g.`,
  sol: 'Basicity; two salts; three equations; coating; 1 : 2 ratio.',
  scheme: [['(a) meaning', 1], ['(a) ionisation', 1], ['(b)(i)', 1], ['(b)(ii)', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(d)(i)', 1], ['(d)(ii) moles', 1], ['(d)(ii) 4 g', 1]],
  d: 3, c: 'application', t: [2],
}), () => near((4.9 / 98) * 2 * 40, 4) || 'dilute-long');
add('conc-long', long({
  stem: '(a) Write the balanced equations for the action of hot concentrated sulphuric acid on (i) carbon and (ii) sulphur. [2]\n\n(b) Concentrated sulphuric acid is added to cane sugar. State two observations and write the balanced equation. [2]\n\n(c) (i) What is seen when concentrated sulphuric acid is added to blue vitriol? (ii) Is this drying or dehydration? Give a reason. (iii) Name one gas that concentrated sulphuric acid can dry and one it cannot. [3]\n\n(d) 34.2 g of cane sugar (C₁₂H₂₂O₁₁) is completely charred by concentrated sulphuric acid. Calculate the mass of (i) carbon and (ii) water formed. (C = 12, H = 1, O = 16) [3]',
  model: r`(a) (i) C + 2H₂SO₄ → CO₂ + 2H₂O + 2SO₂. (ii) S + 2H₂SO₄ → 3SO₂ + 2H₂O.

(b) The sugar turns black and a black spongy mass rises out of the beaker; steam is given off and the beaker becomes hot. C₁₂H₂₂O₁₁ → 12C + 11H₂O.

(c) (i) The blue crystals turn white. (ii) Dehydration: the water of crystallisation is removed and a new substance, anhydrous copper(II) sulphate, forms. (iii) Can dry: chlorine (or SO₂, HCl, CO₂). Cannot dry: ammonia (or hydrogen sulphide).

(d) Molar mass of sugar $= 12 \times 12 + 22 \times 1 + 11 \times 16 = 342$. Moles $= \dfrac{34.2}{342} = 0.1$. (i) Mass of carbon $= 0.1 \times 12 \times 12 = 14.4$, that is 14.4 g. (ii) Mass of water $= 0.1 \times 11 \times 18 = 19.8$, that is 19.8 g.`,
  sol: 'Oxidation equations; charring; dehydration of blue vitriol; 1 : 12 : 11 mole ratio.',
  scheme: [['(a)(i)', 1], ['(a)(ii)', 1], ['(b) observations', 1], ['(b) equation', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(d) moles of sugar', 1], ['(d)(i) 14.4 g', 1], ['(d)(ii) 19.8 g', 1]],
  d: 3, c: 'application', t: [3, 4],
}), () => (near((34.2 / 342) * 144, 14.4) && near(0.1 * 11 * 18, 19.8) && near(144 + 22 + 176, 342)) || 'conc-long');
add('nonvol-long', long({
  stem: '(a) What is meant by saying that sulphuric acid is non-volatile? Write the balanced equation for its action on potassium nitrate below 200 °C. [2]\n\n(b) Write the balanced equation for the action of concentrated sulphuric acid on sodium chloride, and explain why the concentrated acid, not the dilute acid, is used. [2]\n\n(c) Describe a test that shows that a solution contains sulphate ions: name the reagent, state the observation and write the balanced equation for sodium sulphate. [3]\n\n(d) Excess barium chloride solution is added to a solution of 7.1 g of sodium sulphate. Calculate the mass of barium sulphate formed. (Na = 23, S = 32, O = 16, Ba = 137) [3]',
  model: r`(a) It has a high boiling point (about 338 °C) and does not readily form vapour. KNO₃ + H₂SO₄ → KHSO₄ + HNO₃.

(b) NaCl + H₂SO₄ → NaHSO₄ + HCl. The concentrated acid supplies little water, so the hydrogen chloride escapes as a gas instead of staying dissolved.

(c) Add barium chloride solution: a white precipitate forms that does not dissolve in dilute hydrochloric acid. Na₂SO₄ + BaCl₂ → BaSO₄ + 2NaCl.

(d) Molar mass of sodium sulphate $= 2 \times 23 + 32 + 4 \times 16 = 142$. Moles $= \dfrac{7.1}{142} = 0.05$. One mole gives one mole of barium sulphate, molar mass $137 + 32 + 4 \times 16 = 233$. Mass $= 0.05 \times 233 = 11.65$, that is 11.65 g.`,
  sol: 'Non-volatile; HCl preparation; barium chloride test; 1 : 1 ratio.',
  scheme: [['(a) meaning', 1], ['(a) equation', 1], ['(b) equation', 1], ['(b) reason', 1], ['(c) reagent', 1], ['(c) observation', 1], ['(c) equation', 1], ['(d) moles of Na₂SO₄', 1], ['(d) molar mass of BaSO₄', 1], ['(d) 11.65 g', 1]],
  d: 3, c: 'application', t: [5],
}), () => near((7.1 / 142) * 233, 11.65) || 'nonvol-long');
add('ident-long', long({
  stem: 'Three colourless liquids, X, Y and Z, are concentrated sulphuric acid, dilute sulphuric acid and dilute hydrochloric acid, in some order.\n\n(a) A drop of X on a sugar crystal turns it black. Identify X and name the property shown. Why would X not be used to dry ammonia? [3]\n\n(b) Barium chloride solution gives a white precipitate with Y but not with Z. Identify Y and Z, and write the balanced equation for the reaction of Y. [3]\n\n(c) (i) Y is added to sodium sulphite. Write the balanced equation and name the gas. (ii) X is heated with sulphur. Write the balanced equation. (iii) Z is added to marble chips and keeps fizzing, whereas Y soon stops. Explain. [4]',
  model: '(a) X is concentrated sulphuric acid; dehydrating property. Ammonia is a base and reacts with it: 2NH₃ + H₂SO₄ → (NH₄)₂SO₄.\n\n(b) Y is dilute sulphuric acid and Z is dilute hydrochloric acid. BaCl₂ + H₂SO₄ → BaSO₄ + 2HCl.\n\n(c) (i) Na₂SO₃ + H₂SO₄ → Na₂SO₄ + H₂O + SO₂; sulphur dioxide. (ii) S + 2H₂SO₄ → 3SO₂ + 2H₂O. (iii) With hydrochloric acid the calcium chloride formed is very soluble, so the acid keeps reaching the marble. With sulphuric acid, slightly soluble calcium sulphate coats the chips and stops the reaction.',
  sol: 'Charring identifies X; the sulphate test separates Y and Z; reactions and the marble difference.',
  scheme: [['(a) X', 1], ['(a) property', 1], ['(a) ammonia', 1], ['(b) Y and Z', 2], ['(b) equation', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 2]],
  d: 4, c: 'analysis', t: [2, 3, 4, 5],
}));
