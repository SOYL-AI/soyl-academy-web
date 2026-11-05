// ICSE 9 Chemistry ch01 Symbols, Valency, Radicals and Formulae — question bank in ICSE school-examination style
// (10-mark structured questions in parts). Numbers come from calc.mjs. AR keys use the ICSE option order:
// a = A true R false, b = A false R true, c = both true and R explains, d = both true and R does not explain.
import { mk, add, svgV, r } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import { VAL, UV, TOT, formula, binary, CONFIG, arrangement, total } from './calc.mjs';
import { SHELLS_LETTERED, CRISS_LETTERED } from './svgs.mjs';

const { mcq, ar, tf, fill, short, long, match } = mk;
const shellsFig = svgV(SHELLS_LETTERED, 'Four atoms A, B, C and D drawn with their electron shells');
const crissFig = svgV(CRISS_LETTERED, 'The criss-cross method drawn for calcium and phosphate with five parts lettered A to E');
const term = (o) => short({ marks: 1, wl: null, scheme: [[o.sch ?? 'Correct answer', 1]], ...o });

// ---------------------------------------------------------------- deck-check items (not used in tests)
add('chk-symbol', mcq({
  stem: 'A label on a jar of metal pieces reads Pb. The element is',
  right: 'lead, from plumbum', wrong: ['potassium, from kalium', 'silver, from argentum', 'phosphorus, from phosphorum'],
  sol: 'Pb comes from the Latin plumbum, which is lead, so option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('chk-valency', mcq({
  stem: 'An aluminium atom has the electron arrangement 2, 8, 3. It is',
  right: 'a trivalent metal', wrong: ['a divalent metal', 'a trivalent non-metal', 'a pentavalent non-metal'],
  sol: 'Three outer electrons are lost, so aluminium is a trivalent metal, option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('chk-radical', mcq({
  stem: 'Which of these is a compound radical?',
  right: 'Nitrate', wrong: ['Oxide', 'Sodium', 'Chloride'],
  sol: 'Nitrate is a group of nitrogen and oxygen atoms with one negative charge, option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('chk-formula', mcq({
  stem: 'The formula of calcium phosphate, from the valencies 2 and 3, is',
  right: 'Ca₃(PO₄)₂', wrong: ['Ca₂(PO₄)₃', 'CaPO₄', 'Ca₃PO₄₂'],
  sol: 'Crossing 2 and 3 gives Ca₃(PO₄)₂, option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('chk-bracket', mcq({
  stem: 'The formula of iron(III) hydroxide is',
  right: 'Fe(OH)₃', wrong: ['FeOH₃', 'Fe₃(OH)', 'Fe₃OH'],
  sol: 'Iron(III) has valency 3 and hydroxide has valency 1, so hydroxide appears three times in brackets, option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('chk-name', mcq({
  stem: 'The compound (NH₄)₂SO₄ is named',
  right: 'ammonium sulphate', wrong: ['ammonium sulphite', 'ammonia sulphate', 'nitrogen hydrogen sulphate'],
  sol: 'The radicals are ammonium and sulphate, option (@K).',
  d: 1, c: 'recall', t: [5],
}));

// ---------------------------------------------------------------- t01 symbols
add('sym-mcq1', mcq({
  stem: 'Which pair gives an element and a symbol that comes from its Latin name?',
  right: 'Lead, Pb', wrong: ['Tin, Ti', 'Gold, Go', 'Mercury, Me'],
  sol: 'Lead is plumbum, so Pb; the other symbols are not made from Latin names.',
  d: 1, c: 'recall', t: [1],
}));
add('sym-mcq2', mcq({
  stem: 'A student writes CO as the symbol of the element cobalt. This is wrong because CO',
  right: 'is the formula of a compound of carbon and oxygen', wrong: ['has no meaning in chemistry', 'is the symbol of copper', 'is written with a small first letter'],
  sol: 'Both letters are capitals, so CO means carbon and oxygen together; cobalt is Co, option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('sym-quant', mcq({
  stem: 'Quantitatively, the symbol Mg stands for',
  right: 'one atom of magnesium', wrong: ['one molecule of magnesium', 'any amount of magnesium', 'two atoms of magnesium'],
  sol: 'A symbol stands for one atom of the element, option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('sym-tf', tf({
  stem: 'The symbol Fe for iron comes from the English name of the metal.',
  key: 'f',
  sol: 'False. Fe comes from the Latin name ferrum.',
  d: 1, c: 'recall', t: [1],
}));
add('sym-fill', fill({
  stem: 'The symbols Na, K and Cu are taken from the ___ names of the elements.',
  acc: [['Latin', 'latin']],
  sol: 'The **Latin** names.',
  d: 1, c: 'recall', t: [1],
}));
add('sym-term1', term({
  stem: 'Name the element whose symbol is Ag and the Latin word it comes from.',
  model: '**Silver**, from **argentum**.', sol: 'Silver; argentum.', sch: 'Silver and argentum',
  d: 1, c: 'recall', t: [1],
}));
add('sym-term2', term({
  stem: 'Write the symbols of the elements potassium and mercury.',
  model: 'Potassium is **K** and mercury is **Hg**.', sol: 'K and Hg.', sch: 'K and Hg',
  d: 1, c: 'recall', t: [1],
}));
add('sym-short2', short({
  marks: 2,
  wl: null,
  stem: 'A jar in the school laboratory is marked N. State the qualitative and the quantitative meaning of this symbol.',
  model: '**Qualitatively** N names the element **nitrogen**. **Quantitatively** it stands for **one atom** of nitrogen.',
  sol: 'Element nitrogen; one atom.',
  scheme: [['Qualitative: the element nitrogen', 1], ['Quantitative: one atom of it', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('sym-short3', short({
  marks: 3,
  stem: 'Copper wire is used in electrical cables. (a) Give the symbol of copper and the Latin word from which it is taken. (b) State what the symbol stands for quantitatively. (c) Write the symbols of gold and lead.',
  wl: null,
  model: '**(a)** The symbol is **Cu**, from the Latin **cuprum**.\n\n**(b)** It stands for **one atom** of copper.\n\n**(c)** Gold is **Au** and lead is **Pb**.',
  sol: 'Cu, cuprum; one atom; Au and Pb.',
  scheme: [['Cu and cuprum', 1], ['One atom', 1], ['Au and Pb', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 valency
add('val-mcq1', mcq({
  stem: 'An element X has the electron arrangement 2, 8, 6. It is',
  right: 'a divalent non-metal', wrong: ['a hexavalent metal', 'a divalent metal', 'a trivalent non-metal'],
  sol: `Six outer electrons mean two are needed to complete the octet: valency 8 − 6 = ${VAL.S}, a non-metal, option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => VAL.S === 2 || 'S');
add('val-mcq2', mcq({
  stem: 'A compound of element Z with hydrogen has the formula ZH₂. The element Z could be',
  right: 'oxygen', wrong: ['chlorine', 'nitrogen', 'carbon'],
  sol: `Two hydrogen atoms combine with one atom of Z, so its valency is 2; oxygen has valency ${VAL.O}, option (@K).`,
  d: 2, c: 'application', t: [2],
}));
add('val-mcq3', mcq({
  stem: 'A potassium atom has 19 electrons arranged as 2, 8, 8, 1. Its valency is',
  right: 'one', wrong: ['two', 'eight', 'nine'],
  sol: `The single outer electron is lost, valency ${VAL.K}, option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => VAL.K === 1 || 'K');
add('val-mcq4', mcq({
  stem: 'The outer shells of two atoms P and Q hold 3 and 7 electrons. Which statement is correct?',
  right: 'P has valency 3 and Q has valency 1', wrong: ['P has valency 5 and Q has valency 7', 'P has valency 3 and Q has valency 7', 'P has valency 5 and Q has valency 1'],
  sol: 'P loses 3 electrons (valency 3); Q needs 8 − 7 = 1 more electron (valency 1), option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('val-mcq5', mcq({
  stem: 'Which atom is tetravalent?',
  right: 'The atom with the electron arrangement 2, 4', wrong: ['The atom with the electron arrangement 2, 8, 3', 'The atom with the electron arrangement 2, 6', 'The atom with the electron arrangement 2, 8, 5'],
  sol: 'Four outer electrons give valency 4. The others have valencies 3, 2 and 3, option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('val-mcq6', mcq({
  stem: 'Iron(II) chloride and iron(III) chloride are two different compounds because iron',
  right: 'shows two different valencies', wrong: ['has two different symbols', 'is a non-metal in one of them', 'loses electrons in only one of them'],
  sol: 'Iron can have valency 2 or 3; the number in the name says which one, option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('ar-val', ar({
  a: 'The valency of oxygen is 2.',
  r: 'An oxygen atom has two electrons in its outer shell.',
  key: 'a',
  sol: 'Oxygen has six outer electrons (2, 6) and needs two more to complete its octet; (A) is true and (R) is false, option (a).',
  d: 2, c: 'analysis', t: [2],
}));
add('ar-mg', ar({
  a: 'Magnesium has a valency of 2.',
  r: 'Magnesium is a silvery metal that burns with a dazzling white flame.',
  key: 'd',
  sol: 'Valency 2 comes from the two outer electrons, not from the flame; both statements are true but (R) does not explain (A), option (d).',
  d: 3, c: 'analysis', t: [2],
}));
add('val-term', term({
  stem: 'Write the electron arrangement and the valency of a calcium atom, which has 20 electrons.',
  model: `Arrangement **${arrangement('Ca')}**; valency **${VAL.Ca}**.`, sol: `${arrangement('Ca')}; ${VAL.Ca}.`, sch: 'Arrangement and valency',
  d: 2, c: 'application', t: [2],
}), () => CONFIG.Ca.reduce((a, b) => a + b, 0) === 20 || 'Ca');
add('val-short2', short({
  marks: 2,
  stem: 'Name the hydride of each element and state its valency: (a) nitrogen (b) carbon.',
  wl: null,
  model: `**(a)** Ammonia, NH₃: valency **${VAL.N}**.\n\n**(b)** Methane, CH₄: valency **${VAL.C}**.`,
  sol: 'Ammonia 3; methane 4.',
  scheme: [['Nitrogen: NH₃, valency 3', 1], ['Carbon: CH₄, valency 4', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('val-short3', short({
  marks: 3,
  stem: 'An element Q has the electron arrangement 2, 8, 5. (a) What is meant by valency? (b) Find the valency of Q and say whether it is a metal or a non-metal. (c) Write the formula of its compound with hydrogen, using Q as its symbol.',
  wl: null,
  model: `**(a)** Valency is the **combining power** of an atom, that is how many hydrogen atoms one atom can combine with.\n\n**(b)** It needs three electrons to complete an octet, so valency is 8 − 5 = **${VAL.P}**; it is a **non-metal**.\n\n**(c)** **QH₃**.`,
  sol: 'Combining power; 3, non-metal; QH₃.',
  scheme: [['Valency defined', 1], ['Valency 3 and non-metal with reason', 1], ['QH₃', 1]],
  d: 3, c: 'application', t: [2],
}));
add('val-tf', tf({
  stem: 'The valency of every metal is equal to the number of electrons in its outer shell.',
  key: 't',
  sol: 'True for metals with one, two or three outer electrons, which lose them (the few with variable valency are exceptions).',
  d: 3, c: 'analysis', t: [2],
}));

// ---------------------------------------------------------------- t03 radicals
add('rad-mcq1', mcq({
  stem: 'Which of these is a negative compound radical?',
  right: 'Carbonate', wrong: ['Ammonium', 'Magnesium', 'Chloride'],
  sol: 'Carbonate, CO₃²⁻, is a group of atoms with a negative charge, option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('rad-mcq2', mcq({
  stem: r`Nitric acid ionises as $\ce{HNO3 -> H+ + NO3^-}$. The nitrate radical therefore carries`,
  right: 'one negative charge', wrong: ['two negative charges', 'one positive charge', 'no charge'],
  sol: 'One hydrogen ion is given out, so nitrate has valency 1 and carries one negative charge, option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('rad-mcq3', mcq({
  stem: 'Which list contains only positive radicals?',
  right: 'Zn²⁺, NH₄⁺, Fe³⁺', wrong: ['Zn²⁺, NO₃⁻, Fe³⁺', 'Cl⁻, NH₄⁺, Fe³⁺', 'Zn²⁺, NH₄⁺, SO₄²⁻'],
  sol: 'Each of Zn²⁺, NH₄⁺ and Fe³⁺ carries a positive charge, option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('rad-mcq4', mcq({
  stem: 'A simple radical has 10 electrons and carries a charge of 2−. The atom it came from had 8 electrons. The radical is',
  right: 'oxide', wrong: ['sulphide', 'magnesium', 'nitride'],
  sol: 'An atom with 8 electrons is oxygen; it gains 2 electrons to give 10 and becomes the oxide radical, option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('rad-tf', tf({
  stem: 'Hydroxide is a simple radical because it contains only one kind of charge.',
  key: 'f',
  sol: 'False. Hydroxide, OH⁻, is a compound radical made of two atoms.',
  d: 2, c: 'understanding', t: [3],
}));
add('rad-term1', term({
  stem: 'Name the positive compound radical NH₄⁺.',
  model: '**Ammonium.**', sol: 'Ammonium.', sch: 'Ammonium',
  d: 1, c: 'recall', t: [3],
}));
add('rad-term2', term({
  stem: 'State the valency of the phosphate radical.',
  model: '**Three** (it carries three negative charges).', sol: 'Three.', sch: '3',
  d: 1, c: 'recall', t: [3],
}));
add('rad-short2', short({
  marks: 2,
  stem: 'Distinguish a simple radical from a compound radical, giving one example of each.',
  wl: null,
  model: 'A **simple radical** is a **single charged atom**, for example Na⁺. A **compound radical** is a **group of atoms** with one charge that acts as a unit, for example SO₄²⁻.',
  sol: 'One atom against a group, with examples.',
  scheme: [['Simple: single atom, with example', 1], ['Compound: group of atoms, with example', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('rad-short2b', short({
  marks: 2,
  stem: r`Sulphuric acid ionises as $\ce{H2SO4 -> 2H+ + SO4^2-}$. Use this to state the valency of sulphate and the charge on it.`,
  wl: null,
  model: 'Two hydrogen ions are released, so sulphate has **valency 2** and carries **two negative charges**.',
  sol: 'Valency 2; charge 2−.',
  scheme: [['Valency 2', 1], ['Charge two negative', 1]],
  d: 2, c: 'application', t: [3],
}));
add('rad-short3', short({
  marks: 3,
  stem: 'Ammonium sulphate contains the radicals NH₄⁺ and SO₄²⁻. (a) Which radical is positive? (b) State the valency of each. (c) Say why both are called compound radicals.',
  wl: null,
  model: '**(a)** **Ammonium**, NH₄⁺.\n\n**(b)** Ammonium **1**; sulphate **2**.\n\n**(c)** Each is a **group of atoms** that carries a charge and moves as one unit.',
  sol: 'Ammonium; 1 and 2; groups of atoms.',
  scheme: [['Ammonium is positive', 1], ['Valencies 1 and 2', 1], ['Groups of atoms with a charge', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('ar-rad', ar({
  a: 'The valency of the sulphate radical is 2.',
  r: 'A molecule of sulphuric acid gives two hydrogen ions in water.',
  key: 'c',
  sol: 'The valency of an acid radical equals the number of hydrogen ions the acid gives, so (R) explains (A), option (c).',
  d: 2, c: 'analysis', t: [3],
}));
add('rad-match', match({
  marks: 5,
  stem: 'Match each radical in Column A with its name in Column B.',
  pairs: [
    ['NH₄⁺', 'Ammonium'],
    ['SO₃²⁻', 'Sulphite'],
    ['N³⁻', 'Nitride'],
    ['HCO₃⁻', 'Hydrogencarbonate'],
    ['Fe³⁺', 'Iron(III)'],
  ],
  order: [3, 0, 4, 1, 2],
  sol: 'NH₄⁺ ammonium; SO₃²⁻ sulphite; N³⁻ nitride; HCO₃⁻ hydrogencarbonate; Fe³⁺ iron(III).',
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 radicals in the atmosphere
add('atm-mcq1', mcq({
  stem: 'A free radical in polluted air is very reactive mainly because it has',
  right: 'an unpaired electron', wrong: ['a complete octet', 'no electrons in the outer shell', 'a charge of 2−'],
  sol: 'An unpaired electron makes the fragment eager to react, option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('atm-mcq2', mcq({
  stem: 'Which step would help a busy city to cut down the formation of harmful radicals in its air?',
  right: 'Fitting catalytic converters to vehicles', wrong: ['Burning dry leaves in open ground', 'Running diesel generators through the day', 'Using more aerosol sprays'],
  sol: 'Cleaner exhaust means fewer pollutants for sunlight to break into radicals, option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('atm-term', term({
  stem: 'Name the very reactive particle that has an unpaired electron and forms when a bond in a pollutant molecule breaks.',
  model: 'A **free radical**.', sol: 'Free radical.', sch: 'Free radical',
  d: 1, c: 'recall', t: [4],
}));
add('atm-reason', term({
  stem: 'Give a reason why the free radicals in polluted air are not the same as the radicals Na⁺ and Cl⁻ written in formulae.',
  wl: null,
  model: 'A free radical has an **unpaired electron** and is **very reactive**, whereas Na⁺ and Cl⁻ are **stable charged particles** with complete outer shells.', sol: 'Unpaired electron against stable ions.', sch: 'Unpaired electron or stability contrast',
  d: 2, c: 'understanding', t: [4],
}));
add('ar-free', ar({
  a: 'Free radicals in polluted air have a complete outer shell of electrons.',
  r: 'Free radicals are very reactive.',
  key: 'b',
  sol: 'A free radical has an unpaired electron, so (A) is false; (R) is true, option (b).',
  d: 3, c: 'analysis', t: [4],
}));
add('atm-short2', short({
  marks: 2,
  stem: 'State two harmful effects of free radicals in polluted air on living organisms.',
  wl: null,
  model: 'They **irritate the eyes and lungs** and **damage body cells**. (They also help form smog that harms plants.)',
  sol: 'Irritation of eyes and lungs; cell damage.',
  scheme: [['First effect', 1], ['Second effect', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('atm-short3', short({
  marks: 3,
  stem: 'Sunlight falls on air that is full of vehicle fumes. (a) State what happens to some molecules in the fumes. (b) Name the particles that form. (c) Suggest one way to reduce their formation.',
  wl: null,
  model: '**(a)** Bonds in the molecules **break**, each part keeping one electron.\n\n**(b)** **Free radicals**, which have an unpaired electron.\n\n**(c)** **Reduce vehicle emissions**, for example with catalytic converters.',
  sol: 'Bonds break; free radicals; cut emissions.',
  scheme: [['Bonds break', 1], ['Free radicals', 1], ['A suitable step', 1]],
  d: 2, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- t05 formulae and names
add('form-mcq1', mcq({
  stem: 'The formula of zinc nitrate is',
  right: 'Zn(NO₃)₂', wrong: ['ZnNO₃', 'Zn₂(NO₃)', 'Zn(NO₂)₃'],
  sol: 'Zn²⁺ and NO₃⁻ cross over to give Zn(NO₃)₂, option (@K).',
  d: 2, c: 'application', t: [5],
}), () => formula('Zn', 'NO3').f === 'Zn(NO3)2' || 'zn');
add('form-mcq2', mcq({
  stem: 'The formula of iron(III) sulphate is',
  right: 'Fe₂(SO₄)₃', wrong: ['Fe₃(SO₄)₂', 'FeSO₄', 'Fe(SO₄)₃'],
  sol: 'Valencies 3 and 2 cross over, option (@K).',
  d: 2, c: 'application', t: [5],
}), () => formula('Fe3', 'SO4').f === 'Fe2(SO4)3' || 'fe');
add('form-mcq3', mcq({
  stem: 'A student writes the formula of calcium carbonate as Ca₂(CO₃)₂. The mistake is that she',
  right: 'did not divide the subscripts by their common factor', wrong: ['used the wrong valency for calcium', 'wrote the symbol of carbon wrongly', 'put the negative radical first'],
  sol: 'Crossing 2 and 2 gives Ca₂(CO₃)₂, which must be divided by 2 to give CaCO₃, option (@K).',
  d: 3, c: 'analysis', t: [5],
}));
add('form-mcq4', mcq({
  stem: `The total number of atoms in one unit of the formula Mg(OH)₂ is`,
  right: `${TOT['Cu(OH)2']}`, wrong: ['4', '6', '3'],
  sol: 'One Mg, two O and two H make 5 atoms, option (@K).',
  d: 2, c: 'application', t: [5],
}), () => total('Mg(OH)2') === 5 || 'mg');
add('form-mcq5', mcq({
  stem: 'The compound FeCl₂ is named',
  right: 'iron(II) chloride', wrong: ['iron(III) chloride', 'iron dichlorate', 'iron(II) chlorate'],
  sol: 'Two chloride radicals, each valency 1, mean iron has valency 2, option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('form-mcq6', mcq({
  stem: 'The valency of the metal M in the compound M₂(SO₄)₃ is',
  right: 'three', wrong: ['two', 'six', 'one'],
  sol: 'Three sulphate radicals carry 6 negative charges, shared by two atoms of M, so each has valency 3, option (@K).',
  d: 3, c: 'analysis', t: [5],
}));
add('form-mcq7', mcq({
  stem: 'Atom X has the arrangement 2, 8, 3 and atom Y has the arrangement 2, 6. The formula of their compound is',
  right: 'X₂Y₃', wrong: ['X₃Y₂', 'XY', 'X₂Y'],
  sol: `X has valency ${VAL.Al} and Y has valency ${VAL.O}; crossing over gives X₂Y₃, option (@K).`,
  d: 3, c: 'analysis', t: [2, 5],
}), () => binary('Al', 'O') === 'Al2O3' || 'xy');
add('form-tf', tf({
  stem: 'The formula of aluminium chloride is Al₃Cl.',
  key: 'f',
  sol: 'False. Aluminium has valency 3 and chlorine 1, so the formula is AlCl₃.',
  d: 2, c: 'application', t: [5],
}));
add('form-fill', fill({
  stem: 'In the criss-cross method the valency of one radical becomes the ___ of the other.',
  acc: [['subscript', 'subscripts', 'small number']],
  sol: 'The **subscript**.',
  d: 1, c: 'recall', t: [5],
}));
add('form-term1', term({
  stem: 'Write the formula of magnesium nitride.',
  model: '**Mg₃N₂.**', sol: 'Mg₃N₂.', sch: 'Mg₃N₂',
  d: 2, c: 'application', t: [5],
}), () => formula('Mg', 'N').f === 'Mg3N2' || 'mg3n2');
add('form-term2', term({
  stem: 'Write the formula of calcium hydrogencarbonate.',
  model: '**Ca(HCO₃)₂.**', sol: 'Ca(HCO₃)₂.', sch: 'Ca(HCO₃)₂',
  d: 2, c: 'application', t: [5],
}), () => formula('Ca', 'HCO3').f === 'Ca(HCO3)2' || 'cahco3');
add('form-term3', term({
  stem: 'Name the compound with the formula Na₂SO₃.',
  model: '**Sodium sulphite.**', sol: 'Sodium sulphite.', sch: 'Sodium sulphite',
  d: 2, c: 'application', t: [5],
}));
add('form-short2a', short({
  marks: 2,
  stem: 'Write the formulae of (a) aluminium hydroxide and (b) lead(II) chloride.',
  wl: null,
  model: `**(a)** **${formula('Al', 'OH').f.replace(/\d/g, (d) => '₀₁₂₃₄₅₆₇₈₉'[d])}**\n\n**(b)** **PbCl₂**`,
  sol: 'Al(OH)₃ and PbCl₂.',
  scheme: [['Al(OH)₃', 1], ['PbCl₂', 1]],
  d: 2, c: 'application', t: [5],
}));
add('form-short2b', short({
  marks: 2,
  stem: 'Name the compounds (a) K₂S and (b) Fe₂O₃.',
  wl: null,
  model: '**(a)** **Potassium sulphide.**\n\n**(b)** **Iron(III) oxide.**',
  sol: 'Potassium sulphide; iron(III) oxide.',
  scheme: [['Potassium sulphide', 1], ['Iron(III) oxide', 1]],
  d: 2, c: 'application', t: [5],
}));
add('form-short2c', short({
  marks: 2,
  stem: 'Explain why the formula of calcium oxide is CaO and not Ca₂O₂.',
  wl: null,
  model: 'Calcium and oxygen both have **valency 2**, so crossing over gives Ca₂O₂. The subscripts have the **common factor 2**, so they are divided to give the simplest formula **CaO**.',
  sol: 'Equal valencies; subscripts divided by 2.',
  scheme: [['Both valencies 2', 1], ['Common factor removed', 1]],
  d: 3, c: 'analysis', t: [5],
}));
add('form-short3a', short({
  marks: 3,
  stem: 'Write the formula of (a) barium sulphate, (b) silver sulphide and (c) iron(III) hydroxide, showing the valencies you used.',
  wl: null,
  model: '**(a)** Ba 2, SO₄ 2: **BaSO₄** after dividing by 2.\n\n**(b)** Ag 1, S 2: **Ag₂S**.\n\n**(c)** Fe 3, OH 1: **Fe(OH)₃**.',
  sol: 'BaSO₄; Ag₂S; Fe(OH)₃.',
  scheme: [['BaSO₄ with valencies', 1], ['Ag₂S with valencies', 1], ['Fe(OH)₃ with valencies', 1]],
  d: 3, c: 'application', t: [5],
}));
add('form-short3b', short({
  marks: 3,
  stem: 'Show, step by step, how the criss-cross method gives the formula of magnesium phosphate.',
  wl: null,
  model: '**Step 1.** Magnesium **Mg²⁺** has valency 2 and phosphate **PO₄³⁻** has valency 3.\n\n**Step 2.** Cross over: Mg gets 3 and PO₄ gets 2, and there is no common factor.\n\n**Step 3.** PO₄ is a compound radical used twice, so it goes in brackets: **Mg₃(PO₄)₂**.',
  sol: 'Valencies 2 and 3; crossing; brackets.',
  scheme: [['Valencies 2 and 3', 1], ['Crossing over', 1], ['Mg₃(PO₄)₂ with brackets', 1]],
  d: 3, c: 'application', t: [5],
}), () => formula('Mg', 'PO4').f === 'Mg3(PO4)2' || 'mgpo4');

// ---------------------------------------------------------------- 10-mark structured questions
add('criss-long', long({
  marks: 10, wl: null,
  stem: 'The diagram shows the criss-cross method for writing a formula. Its parts are lettered A to E.\n\n(a) Name the parts A, B, C, D and E. [5]\n\n(b) State why no common factor had to be removed in this example. [1]\n\n(c) Using the same method, write the formula of magnesium phosphate and name the two radicals in it. [2]\n\n(d) Count the atoms of each element in one unit of the formula in the diagram. [2]',
  model: '**(a)** **A** is the symbol of the metal (calcium); **B** is its valency; **C** the crossing arrows; **D** the compound radical (phosphate); **E** the final formula.\n\n**(b)** The valencies 2 and 3 have **no common factor** other than 1.\n\n**(c)** **Mg₃(PO₄)₂**, from magnesium and phosphate radicals.\n\n**(d)** Ca 3, P 2 and O 8, **13 atoms** in all.',
  sol: 'Symbol, valency, arrows, radical, formula; 2 and 3 share no factor; Mg₃(PO₄)₂; 3 Ca, 2 P, 8 O.',
  scheme: [['A and B named', 2], ['C named', 1], ['D and E named', 2], ['No common factor', 1], ['Mg₃(PO₄)₂', 1], ['Radicals named', 1], ['Ca 3, P 2, O 8', 2]],
  d: 3, c: 'application', t: [5],
  assets: [crissFig],
}), () => total('Ca3(PO4)2') === 13 || 'ca3');
add('shells-long', long({
  marks: 10, wl: null,
  stem: 'The diagram shows four atoms A, B, C and D. The letters are not the symbols of the elements.\n\n(a) Write the valency of each atom. [4]\n\n(b) State which atoms are metals and give a reason. [2]\n\n(c) Write the formula of the compound formed between (i) A and B, (ii) C and B, using the letters as symbols. [2]\n\n(d) Write the formula of the compound of D with hydrogen. [2]',
  model: `**(a)** A **${UV.A}**, B **${UV.B}**, C **${UV.C}**, D **${UV.D}**.\n\n**(b)** **A and C** are metals, because they have **few outer electrons (3 and 1) that they lose**.\n\n**(c)** (i) **A₂B₃**; (ii) **C₂B**.\n\n**(d)** **DH₄**.`,
  sol: 'A 3, B 2, C 1, D 4; A and C metals; A₂B₃ and C₂B; DH₄.',
  scheme: [['A valency 3', 1], ['B valency 2', 1], ['C valency 1', 1], ['D valency 4', 1], ['A and C named', 1], ['Reason: few outer electrons lost', 1], ['A₂B₃', 1], ['C₂B', 1], ['DH₄', 2]],
  d: 4, c: 'analysis', t: [2, 5],
  assets: [shellsFig],
}), () => UV.A === 3 && UV.B === 2 && UV.C === 1 && UV.D === 4 || 'uv');
add('salts-long', long({
  marks: 10, wl: null,
  stem: 'A school store has labels to be written for four salts made from these radicals: Zn²⁺, Fe³⁺, NH₄⁺, NO₃⁻, SO₄²⁻ and PO₄³⁻.\n\n(a) Write the formulae of zinc nitrate, iron(III) sulphate, zinc phosphate and ammonium nitrate. [4]\n\n(b) Which of the four formulae contains the largest number of atoms in one unit? Give that number. [2]\n\n(c) Show, by adding charges, that the formula you wrote for iron(III) sulphate is electrically neutral. [2]\n\n(d) Give two reasons why the name iron(III) sulphate carries the number III. [2]',
  model: `**(a)** **Zn(NO₃)₂**, **Fe₂(SO₄)₃**, **Zn₃(PO₄)₂**, **NH₄NO₃**.\n\n**(b)** **Fe₂(SO₄)₃**, with **${TOT['Fe2(SO4)3']} atoms** (2 Fe, 3 S, 12 O).\n\n**(c)** Two Fe³⁺ give 2 × 3 = **+6**; three SO₄²⁻ give 3 × 2 = **−6**; the total is **zero**.\n\n**(d)** Iron has **more than one valency** (2 and 3), so the number says **which one** is present, here valency 3.`,
  sol: 'Four formulae; Fe₂(SO₄)₃ with 17 atoms; +6 and −6; variable valency.',
  scheme: [['Zn(NO₃)₂', 1], ['Fe₂(SO₄)₃', 1], ['Zn₃(PO₄)₂', 1], ['NH₄NO₃', 1], ['Fe₂(SO₄)₃ named', 1], ['17 atoms', 1], ['+6', 1], ['−6 and zero', 1], ['Iron has more than one valency', 1], ['Number gives the valency used', 1]],
  d: 3, c: 'application', t: [3, 5],
}), () => TOT['Fe2(SO4)3'] === 17 && formula('Zn', 'PO4').f === 'Zn3(PO4)2' || 'salts');
add('valency-long', long({
  marks: 10, wl: null,
  stem: 'A student studies the elements fluorine, oxygen, nitrogen and carbon, which have 9, 8, 7 and 6 electrons in their atoms. Their hydrides are HF, H₂O, NH₃ and CH₄.\n\n(a) Write the electron arrangement of each of the four elements. [4]\n\n(b) State the valency of each element and show how it is connected to the number of outer electrons. [2]\n\n(c) Write the formula of the compound of carbon with fluorine. [2]\n\n(d) Explain why the valency rises from 1 to 4 as the outer electrons fall from 7 to 4. [2]',
  model: `**(a)** F **${arrangement('F')}**; O **${arrangement('O')}**; N **${arrangement('N')}**; C **${arrangement('C')}**.\n\n**(b)** F **${VAL.F}**, O **${VAL.O}**, N **${VAL.N}**, C **${VAL.C}**. Each is **8 minus the outer electrons** (for carbon, equal to them).\n\n**(c)** **${binary('C', 'F')}**.\n\n**(d)** The fewer the electrons already in the outer shell, the **more electrons must be gained or shared** to reach eight, so the valency grows.`,
  sol: '2,7; 2,6; 2,5; 2,4; valencies 1 to 4; CF₄; octet argument.',
  scheme: [['F 2, 7', 1], ['O 2, 6', 1], ['N 2, 5', 1], ['C 2, 4', 1], ['Valencies 1, 2, 3, 4', 1], ['Link with 8 minus outer electrons', 1], ['CF₄ with working', 2], ['Fewer outer electrons, more needed', 1], ['Octet completed', 1]],
  d: 3, c: 'application', t: [2, 5],
}), () => binary('C', 'F') === 'CF4' || 'cf4');
add('atmos-long', long({
  marks: 10, wl: null,
  stem: 'A town beside a busy highway has a brick kiln and a rubbish dump where waste is burnt in the open. On sunny afternoons residents complain of burning eyes and cough.\n\n(a) Explain what a free radical is and how free radicals form in the air of this town. [3]\n\n(b) State two harmful effects of these radicals on living organisms. [2]\n\n(c) Suggest four steps the town can take to reduce the formation of harmful radicals. [4]\n\n(d) State one difference between a free radical in the air and the sulphate radical in a formula. [1]',
  model: '**(a)** A free radical is a **very reactive particle with an unpaired electron**. **Sunlight and heat break bonds** in pollutant molecules from fumes and smoke, and the pieces formed are radicals.\n\n**(b)** They **irritate the eyes and lungs** and **damage body cells** (they also help form smog that harms plants).\n\n**(c)** **Fit catalytic converters**, **cut kiln and vehicle emissions**, **stop open burning of waste**, and **plant trees** (or use cleaner fuels).\n\n**(d)** A free radical has an **unpaired electron** and reacts at once; sulphate is a **stable charged group** of atoms.',
  sol: 'Unpaired electron, bonds broken by sunlight; irritation and cell damage; four steps; unpaired electron versus stable group.',
  scheme: [['Reactive particle with unpaired electron', 1], ['Sunlight or heat breaks bonds', 1], ['Pollutants named as source', 1], ['First effect', 1], ['Second effect', 1], ['First step', 1], ['Second step', 1], ['Third step', 1], ['Fourth step', 1], ['Difference stated', 1]],
  d: 2, c: 'application', t: [4],
}));
add('name-long', long({
  marks: 10, wl: null,
  stem: 'A chemist\'s notebook lists these compounds by formula: K₂S, Cu(OH)₂, (NH₄)₂CO₃ and Fe(NO₃)₂.\n\n(a) Name the four compounds. [4]\n\n(b) For Cu(OH)₂, write the two radicals with their charges and show that the compound is neutral. [2]\n\n(c) Write the formula of lead(II) chloride and give the number of atoms in one unit. [2]\n\n(d) Sodium sulphite and sodium sulphate have different formulae although their radicals have the same valency. State how the formulae differ. [2]',
  model: `**(a)** **Potassium sulphide**; **copper(II) hydroxide**; **ammonium carbonate**; **iron(II) nitrate**.\n\n**(b)** **Cu²⁺** and **OH⁻**: one Cu²⁺ gives +2 and two OH⁻ give −2, so the total is **zero**.\n\n**(c)** **PbCl₂**, with **${TOT.PbCl2} atoms** (1 Pb and 2 Cl).\n\n**(d)** Sulphite is **SO₃²⁻** and sulphate is **SO₄²⁻**: the sulphate radical has **one more oxygen atom**, so the formulae are **Na₂SO₃** and **Na₂SO₄**.`,
  sol: 'Four names; Cu²⁺ and OH⁻ neutral; PbCl₂ with 3 atoms; sulphite has one oxygen fewer.',
  scheme: [['Potassium sulphide', 1], ['Copper(II) hydroxide', 1], ['Ammonium carbonate', 1], ['Iron(II) nitrate', 1], ['Cu²⁺ and OH⁻', 1], ['Charges add to zero', 1], ['PbCl₂', 1], ['3 atoms', 1], ['Na₂SO₃ and Na₂SO₄', 1], ['One oxygen atom more in sulphate', 1]],
  d: 3, c: 'application', t: [5],
}), () => TOT.PbCl2 === 3 || 'pb');
