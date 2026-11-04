// ch07 Redox Reactions — question bank. MCQ keys are placed by the builder (balanced); AR keys planned: a b c d a c.
// Every numerical is computed here, interpolated into stem and solution, and re-solved by the check passed to add().
import { mk, add, r, dec, sci, near } from './lib.mjs';
import { onOf } from './svgs.mjs';

const { mcq, ar, tf, fill, match, num, short, long, part } = mk;
const j = (x, n = 3) => dec(x, n);
const S = (x, n = 3) => sci(x, n);
const NA = 6.022e23;

// ---------------------------------------------------------------- numbers
const n1 = { S: onOf([[2, 1], [6, -2], [2, -1]], 0, 2) }; // Na2S2O8 with one peroxide link
const n2 = { Pb: onOf([[4, -2]], 0, 3) }; // Pb3O4
const n3 = { m: 2.7, M: 27.0 };
n3.n = n3.m / n3.M;
n3.e = n3.n * 3;
n3.N = n3.e * NA;
const n4 = { c: 0.02, v: 18.4, V: 25.0 };
n4.nMn = (n4.c * n4.v) / 1000;
n4.nFe = 5 * n4.nMn;
n4.M = (n4.nFe / n4.V) * 1000;
const n5 = { m: 0.268, M: 2 * 22.99 + 2 * 12.01 + 4 * 16.0, c: 0.02 };
n5.n = n5.m / n5.M;
n5.nMn = (2 / 5) * n5.n;
n5.V = (n5.nMn / n5.c) * 1000;
const n6 = { c: 0.02, v: 22.0, V: 10.0, Mr: 34.0 };
n6.nMn = (n6.c * n6.v) / 1000;
n6.nH = 2.5 * n6.nMn;
n6.M = (n6.nH / n6.V) * 1000;
n6.g = n6.M * n6.Mr;
const t = { rough: 21.4, a: 19.6, b: 19.5, c: 19.7 };
t.mean = (t.a + t.b + t.c) / 3;
t.nMn = (0.02 * t.mean) / 1000;
t.nFe = 5 * t.nMn;
t.M = (t.nFe / 20.0) * 1000;
t.g = t.M * 55.85;

// ================================================================ t01 oxidation, reduction, oxidation number
add('p-on-mcq', mcq({
  stem: r`In magnesium pyrophosphate, $\ce{Mg2P2O7}$, the oxidation number of phosphorus is:`,
  right: '+5',
  wrong: ['+3', '+4', '+7'],
  sol: r`Let P be $x$: $2(+2) + 2x + 7(-2) = 0$, so $2x = 10$ and $x = +5$ — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => onOf([[2, 2], [7, -2]], 0, 2) === 5 || 'P');
add('agent-mcq', mcq({
  stem: r`In the reaction $\ce{2H2S + SO2 -> 3S + 2H2O}$ the oxidising agent is:`,
  right: 'SO₂, because the oxidation number of sulfur falls from +4 to 0',
  wrong: ['H₂S, because the oxidation number of sulfur falls from −2 to 0', 'SO₂, because the oxidation number of sulfur rises from +4 to +6', 'H₂O, because oxygen is gained'],
  sol: 'Sulfur in H₂S rises from −2 to 0 (oxidised, so H₂S is the reducing agent). Sulfur in SO₂ falls from +4 to 0 (reduced, so SO₂ is the oxidising agent) — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('highest-mcq', mcq({
  stem: 'Manganese forms the species Mn²⁺, MnO₂, MnO₄²⁻ and MnO₄⁻. Which of them cannot act as a reducing agent?',
  right: 'MnO₄⁻',
  wrong: ['Mn²⁺', 'MnO₂', 'MnO₄²⁻'],
  sol: 'Manganese in MnO₄⁻ is at +7, its highest oxidation state, so it cannot lose more electrons. Mn²⁺ (+2), MnO₂ (+4) and MnO₄²⁻ (+6) can all be oxidised further — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('frac-on-mcq', mcq({
  stem: r`The average oxidation number of iron in magnetite, $\ce{Fe3O4}$, is $+8/3$. This is consistent with a mixture of $\ce{Fe^2+}$ and $\ce{Fe^3+}$ ions in the ratio $\ce{Fe^2+}:\ce{Fe^3+}$ of:`,
  right: '1 : 2',
  wrong: ['2 : 1', '1 : 1', '3 : 1'],
  sol: 'For three iron atoms the total is +8. One Fe²⁺ and two Fe³⁺ give 2 + 6 = 8 — option (@K). A ratio of 2 : 1 would give 4 + 3 = 7.',
  d: 3, c: 'analysis', t: [1],
}), () => 2 * 1 + 3 * 2 === 8 || 'ratio');
add('peroxide-mcq', mcq({
  stem: r`The oxidation numbers of oxygen in $\ce{BaO2}$, $\ce{KO2}$, $\ce{OF2}$ and $\ce{O3}$, in that order, are:`,
  right: '−1, −½, +2, 0',
  wrong: ['−2, −1, +2, 0', '−1, −½, −2, 0', '−2, −½, +1, 0'],
  sol: 'BaO₂ is a peroxide (O at −1); KO₂ is a superoxide, with two O sharing −1 (−½ each); in OF₂ fluorine is more electronegative, so O is +2; ozone is an element, so 0 — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('redox-id-mcq', mcq({
  stem: 'Which of the following changes is NOT a redox reaction?',
  right: r`$\ce{BaCl2 + Na2SO4 -> BaSO4 + 2NaCl}$`,
  wrong: [r`$\ce{3Mg + N2 -> Mg3N2}$`, r`$\ce{CuO + H2 -> Cu + H2O}$`, r`$\ce{2KClO3 -> 2KCl + 3O2}$`],
  sol: 'The precipitation of barium sulfate changes no oxidation numbers (Ba +2, Cl −1, Na +1, S +6, O −2 throughout). In the other three equations Mg, N, Cu, H, Cl and O change oxidation number — option (@K).',
  d: 2, c: 'understanding', t: [1, 2],
}));
add('s2o3-mcq', mcq({
  stem: r`In the reaction $\ce{2S2O3^2- + I2 -> S4O6^2- + 2I-}$, the average oxidation number of sulfur changes from +2 to:`,
  right: '+2.5',
  wrong: ['+2', '+3', '+4'],
  sol: r`In $\ce{S4O6^2-}$: $4x + 6(-2) = -2$, so $4x = 10$ and $x = +2.5$ — option (@K). Sulfur rises, so thiosulfate is the reducing agent and iodine is the oxidising agent.`,
  d: 3, c: 'application', t: [1],
}), () => onOf([[6, -2]], -2, 4) === 2.5 || 'S4O6');
add('disp-mcq', mcq({
  stem: r`When nitrogen dioxide dissolves in water, $\ce{3NO2 + H2O -> 2HNO3 + NO}$. Which statement is correct?`,
  right: 'Nitrogen is both oxidised (+4 to +5) and reduced (+4 to +2): this is disproportionation',
  wrong: ['Nitrogen is only reduced, from +4 to +2', 'Nitrogen is only oxidised, from +4 to +5', 'Water is the oxidising agent because its hydrogen is reduced'],
  sol: 'In HNO₃ nitrogen is +5 (a rise of 1) and in NO it is +2 (a fall of 2). One element in one species goes both up and down, so NO₂ disproportionates; water\'s hydrogen (+1) and oxygen (−2) do not change — option (@K).',
  d: 3, c: 'understanding', t: [2],
}));
add('nfactor-mcq', mcq({
  stem: r`The number of moles of electrons accepted when $1\ \text{mol}$ of $\ce{Cr2O7^2-}$ is reduced to $\ce{Cr^3+}$ in acidic solution is:`,
  right: '6',
  wrong: ['3', '2', '7'],
  sol: 'Each chromium falls from +6 to +3, gaining 3 electrons; two chromium atoms in each Cr₂O₇²⁻ gain 2 × 3 = 6 electrons — option (@K). The value 3 is for one chromium atom.',
  d: 2, c: 'understanding', t: [2],
}), () => 2 * (6 - 3) === 6 || 'e');
add('daniell-mcq', mcq({
  stem: 'In a Daniell cell with a zinc rod in zinc sulfate solution and a copper rod in copper sulfate solution, which statement is correct?',
  right: 'Electrons flow from the zinc rod to the copper rod through the external wire, and zinc is the anode',
  wrong: ['Electrons flow from the copper rod to the zinc rod through the wire, and copper is the anode', 'Electrons flow through the salt bridge from zinc to copper', 'Zinc ions are reduced to zinc at the anode'],
  sol: 'Zinc is the more reactive metal and is oxidised, so it supplies the electrons: Zn → Zn²⁺ + 2e⁻ at the anode. The electrons travel through the wire to the copper cathode where Cu²⁺ is reduced. The salt bridge carries ions, not electrons — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('series-mcq', mcq({
  stem: 'Four metals A, B, C and D were tested with solutions of each other’s sulfates. A displaced C, C displaced B and B displaced D. D did not displace A. The metals in decreasing order of reactivity are:',
  right: 'A > C > B > D',
  wrong: ['D > B > C > A', 'A > B > C > D', 'C > A > B > D'],
  sol: 'Each displacement tells us that the displacing metal is more reactive: A > C, C > B, B > D. Joining the links gives A > C > B > D — option (@K). The failed attempt of D on A agrees with this.',
  d: 3, c: 'analysis', t: [2],
}));
add('h2o2-mcq', mcq({
  stem: r`Hydrogen peroxide decolourises acidified permanganate solution (oxygen gas is released) but also turns colourless iodide solution brown (iodine forms). These two observations show that:`,
  right: 'oxygen in H₂O₂ is at an intermediate oxidation state (−1), so H₂O₂ can act as a reducing agent or an oxidising agent',
  wrong: ['oxygen in H₂O₂ is at its lowest oxidation state, so H₂O₂ can only reduce', 'oxygen in H₂O₂ is at its highest oxidation state, so H₂O₂ can only oxidise', 'H₂O₂ is neither oxidised nor reduced in these reactions'],
  sol: 'Towards permanganate H₂O₂ gives O₂ (oxygen rises from −1 to 0: reducing agent); towards iodide it gives H₂O (oxygen falls from −1 to −2: oxidising agent). Oxygen at −1 lies between −2 and 0 — option (@K).',
  d: 3, c: 'analysis', t: [1, 2],
}));
add('stock-mcq', mcq({
  stem: 'Which formula and Stock name pair is correct?',
  right: r`$\ce{Fe2O3}$, iron(III) oxide`,
  wrong: [r`$\ce{FeO}$, iron(III) oxide`, r`$\ce{SnCl4}$, tin(II) chloride`, r`$\ce{Cu2O}$, copper(II) oxide`],
  sol: 'In Fe₂O₃ iron is +3 (2x = 6). FeO has Fe(II), SnCl₄ has Sn(IV) and Cu₂O has Cu(I) — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('kmno4-mcq', mcq({
  stem: r`In acidic solution, $\ce{2MnO4- + 5C2O4^2- + 16H+ -> 2Mn^2+ + 10CO2 + 8H2O}$. The amount of permanganate needed to react completely with $0.0050\ \text{mol}$ of ethanedioate (oxalate) ions is:`,
  right: r`$0.0020\ \text{mol}$`,
  wrong: [r`$0.0050\ \text{mol}$`, r`$0.0125\ \text{mol}$`, r`$0.0010\ \text{mol}$`],
  sol: r`The ratio is 2 mol $\ce{MnO4-}$ to 5 mol $\ce{C2O4^2-}$, so $n(\text{MnO}_4^-) = \dfrac{2}{5} \times 0.0050 = 0.0020\ \text{mol}$ — option (@K).`,
  d: 3, c: 'application', t: [2],
}), () => near((2 / 5) * 0.005, 0.002, 1e-9) || 'ratio');
add('clo-mcq', mcq({
  stem: r`In which of the following does chlorine have the highest oxidation number?`,
  right: r`$\ce{Cl2O7}$`,
  wrong: [r`$\ce{ClO3-}$`, r`$\ce{ClO2-}$`, r`$\ce{ClO-}$`],
  sol: r`$\ce{Cl2O7}$: $2x - 14 = 0$, so $x = +7$. $\ce{ClO3-}$ is +5, $\ce{ClO2-}$ is +3 and $\ce{ClO-}$ is +1 — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => onOf([[7, -2]], 0, 2) === 7 || 'Cl');
add('e-count-mcq', mcq({
  stem: r`For $\ce{2Al + 3Cu^2+ -> 2Al^3+ + 3Cu}$, the total number of electrons transferred from the reducing agent to the oxidising agent is:`,
  right: '6',
  wrong: ['2', '3', '12'],
  sol: 'Each Al atom loses 3 electrons, so 2 Al lose 6; each Cu²⁺ gains 2, so 3 Cu²⁺ gain 6. The transfer is 6 electrons — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('decomp-mcq', mcq({
  stem: 'Which of the following decomposition reactions is also a redox reaction?',
  right: r`$\ce{2HgO -> 2Hg + O2}$`,
  wrong: [r`$\ce{CaCO3 -> CaO + CO2}$`, r`$\ce{Mg(OH)2 -> MgO + H2O}$`, r`$\ce{NH4Cl -> NH3 + HCl}$`],
  sol: 'Only in HgO decomposition do oxidation numbers change (Hg +2 to 0 and O −2 to 0). In the other three, every element keeps its oxidation number — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('rust-mcq', mcq({
  stem: r`At a damp iron surface, rusting involves $\ce{Fe -> Fe^2+ + 2e-}$ and $\ce{O2 + 2H2O + 4e- -> 4OH-}$. Which statement is correct?`,
  right: 'Iron is oxidised and oxygen is reduced; two iron atoms supply the electrons that one oxygen molecule accepts',
  wrong: ['Iron is reduced and oxygen is oxidised', 'Oxygen is the reducing agent and iron is the oxidising agent', 'Four iron atoms are needed for each oxygen molecule'],
  sol: 'Fe loses electrons (oxidised, the reducing agent) and O₂ gains four electrons (reduced, the oxidising agent). Each Fe gives 2 electrons, so 2 Fe supply the 4 electrons taken by one O₂ — option (@K).',
  d: 3, c: 'application', t: [1, 2],
}));

add('displacement-mcq', mcq({
  stem: 'Using the activity series (Mg > Zn > Fe > Cu > Ag), which of the following displacement reactions will occur?',
  right: r`$\ce{Fe + CuSO4 -> FeSO4 + Cu}$`,
  wrong: [r`$\ce{Cu + ZnSO4 -> CuSO4 + Zn}$`, r`$\ce{2Ag + CuSO4 -> Ag2SO4 + Cu}$`, r`$\ce{Cu + MgCl2 -> CuCl2 + Mg}$`],
  sol: 'Only a metal higher in the series displaces one lower down. Iron is above copper, so it displaces copper. Copper is below zinc and magnesium, and silver is below copper, so the other three reactions do not occur — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('half-mcq', mcq({
  stem: r`Chlorate ions are reduced to chloride ions in acid: $\ce{ClO3- + 6H+ -> Cl- + 3H2O}$ (atoms balanced). To balance the charge, how many electrons must be added, and on which side?`,
  right: '6 electrons on the left side',
  wrong: ['6 electrons on the right side', '3 electrons on the left side', '5 electrons on the left side'],
  sol: 'The left side has charge −1 + 6 = +5 and the right side has −1. Adding 6 electrons (−6) to the left brings it to −1, and a reduction takes electrons in on the reactant side — option (@K).',
  d: 3, c: 'application', t: [2],
}), () => -1 + 6 - 6 === -1 || 'charge');
add('titre-mcq', mcq({
  stem: 'Iron(II) solution is acidified with dilute sulfuric acid, not hydrochloric acid, before titration with potassium permanganate. The reason is that:',
  right: 'chloride ions would also be oxidised by permanganate, so extra permanganate would be used and the titre would be too high',
  wrong: ['hydrochloric acid is too weak to supply hydrogen ions', 'sulfate ions act as the indicator at the end point', 'chloride ions would reduce the iron(III) formed back to iron(II)'],
  sol: 'Permanganate oxidises Cl⁻ to Cl₂, consuming titrant that was not used on Fe²⁺, so the titre is too high. Sulfate is not oxidised — option (@K). Sulfate plays no part as an indicator, since permanganate is self-indicating.',
  d: 3, c: 'analysis', t: [2],
}));
add('ondiff-mcq', mcq({
  stem: r`Sulfur occurs in $\ce{H2S}$, $\ce{S8}$, $\ce{SO2}$ and $\ce{H2SO4}$. The oxidation numbers of sulfur in these, in that order, are:`,
  right: '−2, 0, +4, +6',
  wrong: ['+2, 0, +4, +6', '−2, 0, +2, +6', '−2, 0, +4, +4'],
  sol: 'H₂S: 2 + x = 0 gives −2. S₈ is an element, so 0. SO₂: x − 4 = 0 gives +4. H₂SO₄: 2 + x − 8 = 0 gives +6 — option (@K).',
  d: 2, c: 'application', t: [1],
}), () => onOf([[2, 1]], 0) === -2 && onOf([[2, -2]], 0) === 4 && onOf([[2, 1], [4, -2]], 0) === 6 || 'S');
add('zno-ar', ar({
  a: 'Carbon acts as a reducing agent when heated with zinc oxide to give zinc vapour and carbon monoxide.',
  r: 'The oxidation number of carbon increases from 0 to +2 in this reaction.',
  key: 'a',
  sol: 'Carbon is oxidised (0 to +2), so it is the reducing agent: A is true. R is also true and is exactly why A holds — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('nah-ar', ar({
  a: 'The oxidation number of hydrogen in sodium hydride, NaH, is −1.',
  r: 'Hydrogen has oxidation number +1 in hydrogen chloride.',
  key: 'b',
  sol: 'A is true: sodium (+1) is less electronegative than hydrogen, so hydrogen is −1. R is also true, but the +1 state in HCl is a different case and does not explain the −1 in NaH — option (b).',
  d: 3, c: 'analysis', t: [1],
}));
add('br-ar', ar({
  a: 'Chlorine is reduced when it reacts with potassium bromide solution.',
  r: 'The oxidation number of chlorine increases from 0 to −1 in this reaction.',
  key: 'c',
  sol: 'A is true: chlorine goes from 0 to −1 and is reduced, displacing bromine. R is false, because going from 0 to −1 is a decrease, not an increase — option (c).',
  d: 3, c: 'understanding', t: [2],
}));
add('k2mno4-ar', ar({
  a: 'The oxidation number of manganese in potassium manganate, K₂MnO₄, is +7.',
  r: 'The oxidation numbers of all atoms in a neutral compound add up to zero.',
  key: 'd',
  sol: 'In K₂MnO₄: 2(+1) + x + 4(−2) = 0, so x = +6, not +7: A is false. R is a true statement of the sum rule — option (d).',
  d: 2, c: 'understanding', t: [1],
}));
add('mn-ar', ar({
  a: 'Potassium permanganate cannot behave as a reducing agent.',
  r: 'Manganese in permanganate is in its highest oxidation state, +7.',
  key: 'a',
  sol: 'Manganese at +7 has no higher state to move to, so it cannot be oxidised: A is true and R explains it — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('cell-ar', ar({
  a: 'In a Daniell cell the zinc electrode is the anode.',
  r: 'In the external circuit, electrons flow from the copper electrode to the zinc electrode.',
  key: 'c',
  sol: 'Oxidation occurs at zinc, so zinc is the anode: A is true. Electrons flow from zinc to copper in the wire, so R is false — option (c).',
  d: 2, c: 'understanding', t: [2],
}));

add('cro5-tf', tf({
  stem: r`In $\ce{CrO5}$, which has two peroxide (O–O) groups, chromium has an oxidation number of +10.`,
  key: 'f',
  sol: 'False. Four oxygens are at −1 (two peroxide groups) and one at −2: x + 4(−1) + (−2) = 0, so chromium is +6; +10 would exceed the number of valence electrons.',
  d: 3, c: 'application', t: [1],
}));
add('decomp-tf', tf({
  stem: 'Every decomposition reaction is a redox reaction.',
  key: 'f',
  sol: 'False. The decomposition of calcium carbonate into calcium oxide and carbon dioxide changes no oxidation number, so it is not redox; decomposition is redox only when oxidation numbers change.',
  d: 1, c: 'understanding', t: [2],
}));
add('balance-tf', tf({
  stem: 'In a redox reaction the total number of electrons lost by the reducing agent equals the total number gained by the oxidising agent.',
  key: 't',
  sol: 'True. Electrons are neither created nor destroyed, so the half-reactions are multiplied until the electrons match.',
  d: 1, c: 'recall', t: [1],
}));

add('hplus-fill', fill({
  stem: 'In the half-reaction method for an acidic solution, hydrogen atoms are balanced by adding ___ ions.',
  acc: [['H+', 'hydrogen', 'H⁺', 'hydrogen ion', 'hydrogen ions']],
  sol: 'Oxygen is balanced with water and hydrogen with **H+** (hydrogen ions).',
  d: 1, c: 'recall', t: [2],
}));
add('disp-fill', fill({
  stem: 'In a disproportionation reaction the same element is simultaneously ___ and reduced.',
  acc: [['oxidised', 'oxidized']],
  sol: 'One element in one species is both **oxidised** and reduced.',
  d: 1, c: 'recall', t: [2],
}));
add('ko2-fill', fill({
  stem: 'The oxidation number of oxygen in potassium superoxide, KO₂, is ___.',
  acc: [['−1/2', '-1/2', '−½', '-½', '−0.5', '-0.5']],
  sol: 'In KO₂ potassium is +1, so the two oxygen atoms share −1: each is **−1/2**.',
  d: 2, c: 'application', t: [1],
}));

add('on-match', match({
  stem: 'Match each atom with its oxidation number in the species given.',
  pairs: [
    ['N in hydrazine, N₂H₄', '−2'],
    ['S in sodium thiosulfate, Na₂S₂O₃ (average)', '+2'],
    ['P in phosphorous acid, H₃PO₃', '+3'],
    ['Cl in perchloric acid, HClO₄', '+7'],
  ],
  order: [0, 1, 2, 3],
  sol: 'N₂H₄: 2x + 4 = 0, so −2. Na₂S₂O₃: 2 + 2x − 6 = 0, so +2. H₃PO₃: 3 + x − 6 = 0, so +3. HClO₄: 1 + x − 8 = 0, so +7.',
  d: 2, c: 'application', t: [1],
}), () => onOf([[4, 1]], 0, 2) === -2 && onOf([[2, 1], [3, -2]], 0, 2) === 2 && onOf([[3, 1], [3, -2]], 0) === 3 && onOf([[1, 1], [4, -2]], 0) === 7 || 'ON');
add('type-match', match({
  stem: 'Match each of these four redox reactions (of nitrogen, sodium nitrate, chlorine and hydrogen peroxide) with the type of redox reaction it shows.',
  pairs: [
    [r`$\ce{N2 + O2 -> 2NO}$`, 'Combination'],
    [r`$\ce{2NaNO3 -> 2NaNO2 + O2}$`, 'Decomposition'],
    [r`$\ce{Cl2 + 2KI -> 2KCl + I2}$`, 'Displacement'],
    [r`$\ce{2H2O2 -> 2H2O + O2}$`, 'Disproportionation'],
  ],
  order: [0, 1, 2, 3],
  sol: 'Nitrogen and oxygen combine; sodium nitrate decomposes to nitrite and oxygen; chlorine displaces iodine; in hydrogen peroxide oxygen goes from −1 to both −2 and 0.',
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- numericals
add('peroxo-num', num({
  stem: r`Sodium peroxodisulfate, $\ce{Na2S2O8}$, contains one peroxide (O–O) linkage. Calculate the oxidation number of sulfur in it.`,
  value: n1.S, tol: 0, unit: null,
  sol: r`Six oxygen atoms are at $-2$ and the two peroxide oxygens are at $-1$: $2(+1) + 2x + 6(-2) + 2(-1) = 0$, so $2x = 12$ and $x = ${n1.S}$. (Assuming all eight oxygens are $-2$ would wrongly give $+7$.)`,
  scheme: [['Four-term sum with two O at −1', 1], ['x = +6', 1]],
  marks: 2, d: 4, c: 'application', t: [1],
}), () => onOf([[2, 1], [6, -2], [2, -1]], 0, 2) === 6 || 'S');
add('pb3o4-num', num({
  stem: r`Red lead, $\ce{Pb3O4}$, contains lead in the oxidation states +2 and +4. Calculate the average oxidation number of lead.`,
  value: Number(j(n2.Pb, 3)), tol: 0.01, unit: null,
  sol: r`$3x + 4(-2) = 0$, so $3x = 8$ and $x = \dfrac{8}{3} = ${j(n2.Pb, 4)} \approx ${j(n2.Pb, 3)}$. (It is a mixture of two Pb²⁺ and one Pb⁴⁺: $(2 \times 2 + 4)/3$.)`,
  scheme: [['3x − 8 = 0', 1], ['x = 2.67', 1]],
  marks: 2, d: 2, c: 'application', t: [1],
}), () => near((2 * 2 + 4) / 3, 8 / 3, 1e-9) || 'Pb');
add('al-e-num', num({
  stem: r`A strip of aluminium of mass $${dec(n3.m, 3)}\ \text{g}$ dissolves completely in acid to form $\ce{Al^3+}$ ions ($M(\text{Al}) = ${dec(n3.M, 3)}\ \text{g mol}^{-1}$, $N_A = 6.022 \times 10^{23}\ \text{mol}^{-1}$). Calculate the number of electrons lost by the aluminium, in units of $10^{23}$.`,
  value: Number((n3.N / 1e23).toPrecision(3)), tol: 0.02, unit: '× 10²³',
  sol: r`$n(\text{Al}) = ${dec(n3.m, 3)}/${dec(n3.M, 3)} = ${j(n3.n)}\ \text{mol}$. Each atom loses 3 electrons, so $n(e^-) = ${j(n3.n)} \times 3 = ${j(n3.e)}\ \text{mol}$ and the number of electrons is $${j(n3.e)} \times 6.022 = ${j(n3.N / 1e23, 3)}$ in units of $10^{23}$, that is $${S(n3.N, 3)}$ electrons.`,
  scheme: [['Moles of Al = 0.100', 1], ['3 electrons per atom: 0.300 mol', 1], ['1.81 × 10²³ electrons', 1]],
  marks: 3, d: 3, c: 'application', t: [1, 2],
}), () => near(2.7 / 27 * 3 * 6.022e23, 1.81e23, 0.005) || 'N');
add('fe-titr-num', num({
  stem: r`$${dec(n4.V, 3)}\ \text{mL}$ of an acidified iron(II) sulfate solution needs $${n4.v}\ \text{mL}$ of $${dec(n4.c, 3)}\ \text{mol L}^{-1}$ potassium permanganate to reach the end point. Calculate the molarity of the iron(II) solution. ($\ce{MnO4- + 8H+ + 5Fe^2+ -> Mn^2+ + 5Fe^3+ + 4H2O}$)`,
  value: Number(j(n4.M, 3)), tol: 0.0005, unit: 'mol L⁻¹',
  sol: r`$n(\text{MnO}_4^-) = ${dec(n4.c, 3)} \times ${n4.v}/1000 = ${S(n4.nMn, 3)}\ \text{mol}$. From the equation, $n(\text{Fe}^{2+}) = 5 \times ${S(n4.nMn, 3)} = ${S(n4.nFe, 3)}\ \text{mol}$. $c = ${S(n4.nFe, 3)}/(${dec(n4.V, 3)}/1000) = ${j(n4.M, 3)}\ \text{mol L}^{-1}$.`,
  scheme: [['Moles of MnO₄⁻ used', 1], ['× 5 for Fe²⁺', 1], ['0.0736 mol L⁻¹', 1]],
  marks: 3, d: 3, c: 'application', t: [2],
}), () => near(5 * 0.02 * 18.4 / 25.0, 0.0736, 0.001) || 'M');
add('oxalate-num', num({
  stem: r`A student weighs $${n5.m}\ \text{g}$ of sodium ethanedioate, $\ce{Na2C2O4}$ ($M = ${j(n5.M, 4)}\ \text{g mol}^{-1}$), dissolves it in dilute sulfuric acid and titrates it with $${dec(n5.c, 3)}\ \text{mol L}^{-1}$ permanganate. ($\ce{2MnO4- + 5C2O4^2- + 16H+ -> 2Mn^2+ + 10CO2 + 8H2O}$) Calculate the volume of permanganate needed, in mL.`,
  value: Number(j(n5.V, 3)), tol: 0.2, unit: 'mL',
  sol: r`$n(\text{C}_2\text{O}_4^{2-}) = ${n5.m}/${j(n5.M, 4)} = ${S(n5.n, 3)}\ \text{mol}$. $n(\text{MnO}_4^-) = \dfrac{2}{5} \times ${S(n5.n, 3)} = ${S(n5.nMn, 3)}\ \text{mol}$. $V = ${S(n5.nMn, 3)}/${dec(n5.c, 3)} = ${j(n5.V / 1000, 3)}\ \text{L}$, so $V = ${j(n5.V, 3)}$ mL.`,
  scheme: [['Moles of ethanedioate', 1], ['× 2/5 for permanganate', 1], ['V = 40.0 mL', 1]],
  marks: 3, d: 3, c: 'application', t: [2],
}), () => near(((0.268 / 134.0) * 0.4) / 0.02 * 1000, 40.0, 0.005) || 'V');
add('h2o2-num', num({
  stem: r`A $${dec(n6.V, 3)}\ \text{mL}$ sample of hydrogen peroxide solution, acidified with dilute sulfuric acid, needs $${dec(n6.v, 3)}\ \text{mL}$ of $${dec(n6.c, 3)}\ \text{mol L}^{-1}$ permanganate. ($\ce{2MnO4- + 5H2O2 + 6H+ -> 2Mn^2+ + 5O2 + 8H2O}$) Calculate the molarity of the hydrogen peroxide.`,
  value: Number(j(n6.M, 3)), tol: 0.001, unit: 'mol L⁻¹',
  sol: r`$n(\text{MnO}_4^-) = ${dec(n6.c, 3)} \times ${dec(n6.v, 3)}/1000 = ${S(n6.nMn, 3)}\ \text{mol}$. The ratio is 2 : 5, so $n(\text{H}_2\text{O}_2) = \dfrac{5}{2} \times ${S(n6.nMn, 3)} = ${S(n6.nH, 3)}\ \text{mol}$. $c = ${S(n6.nH, 3)}/(${dec(n6.V, 3)}/1000) = ${j(n6.M, 3)}\ \text{mol L}^{-1}$.`,
  scheme: [['Moles of permanganate', 1], ['× 5/2 for H₂O₂', 1], ['0.110 mol L⁻¹', 1]],
  marks: 3, d: 3, c: 'application', t: [2],
}), () => near((2.5 * 0.02 * 22.0) / 10.0, 0.11, 0.002) || 'M');

// ---------------------------------------------------------------- short answers
add('oxidant-short', short({
  marks: 2,
  stem: 'A copper wire is dipped in silver nitrate solution; a grey deposit forms and the solution slowly turns blue. Name the oxidising agent and the reducing agent, and write the half-reaction in which copper is involved.',
  model: r`Silver ions are the oxidising agent, because they gain electrons and are reduced to silver. Copper is the reducing agent, because it loses electrons. The copper half-reaction is $\ce{Cu -> Cu^2+ + 2e-}$, and the Cu²⁺ ions give the blue colour.`,
  sol: 'Ag⁺ oxidising agent; Cu reducing agent; Cu to Cu²⁺ + 2e⁻.',
  scheme: [['Both agents named with reason', 1], ['Copper half-reaction', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('salt-bridge-short', short({
  marks: 2,
  stem: 'What is the function of the salt bridge in a Daniell cell? What would happen to the current if it were removed?',
  model: 'The salt bridge allows ions to move between the two half-cells, which keeps each solution electrically neutral and completes the circuit. Without it, charge would build up in each beaker, the circuit would be broken and the current would stop almost at once.',
  sol: 'Ion movement completes the circuit; without it the current stops.',
  scheme: [['Ion movement keeps neutrality and completes the circuit', 1], ['Current stops without it', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('fluorine-short', short({
  marks: 2,
  stem: 'Fluorine never shows a positive oxidation number in its compounds, but chlorine can show +1, +3, +5 and +7. Give reasons.',
  model: 'Fluorine is the most electronegative element, so in every compound it attracts the bonding electrons and has oxidation number −1. Chlorine is less electronegative and, when bonded to more electronegative oxygen or fluorine, it can have positive oxidation numbers, up to +7 with its seven valence electrons.',
  sol: 'F most electronegative; Cl positive with O and F.',
  scheme: [['Fluorine most electronegative, always −1', 1], ['Chlorine positive with more electronegative atoms', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('disprop-def-short', short({
  marks: 2,
  stem: 'Define disproportionation. Show with oxidation numbers that the decomposition of hydrogen peroxide into water and oxygen is an example.',
  model: r`Disproportionation is a redox reaction in which one element in a single species is both oxidised and reduced. In $\ce{2H2O2 -> 2H2O + O2}$ oxygen is −1 in H₂O₂, falls to −2 in water (reduced) and rises to 0 in oxygen gas (oxidised).`,
  sol: 'Same element oxidised and reduced; O: −1 to −2 and 0.',
  scheme: [['Definition', 1], ['Oxygen −1 to −2 and 0', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('valence-short', short({
  marks: 2,
  stem: 'Carbon has a valence of 4 in both methane and methanal, but its oxidation numbers are different. Calculate them and state how the two terms differ.',
  model: 'In methane, x + 4(+1) = 0 gives −4; in methanal, x + 2(+1) + (−2) = 0 gives 0. Valence is the number of bonds formed and has no sign, so it is 4 in both. Oxidation number is the charge assigned by electronegativity, carries a sign and can be zero or fractional.',
  sol: 'CH₄: −4; HCHO: 0; valence is unsigned bond count.',
  scheme: [['Oxidation numbers −4 and 0', 1], ['Valence versus oxidation number', 1]],
  d: 3, c: 'understanding', t: [1],
}));
add('zncu-short', short({
  marks: 2,
  stem: 'A zinc granule is dropped into blue copper sulfate solution. The blue colour fades and a reddish-brown solid forms. Explain using half-reactions.',
  model: r`Zinc loses electrons, $\ce{Zn -> Zn^2+ + 2e-}$, and goes into solution as colourless Zn²⁺. The blue Cu²⁺ ions gain these electrons, $\ce{Cu^2+ + 2e- -> Cu}$, and deposit as reddish-brown copper, so the blue colour fades. Zinc is more reactive than copper.`,
  sol: 'Zn oxidised, Cu²⁺ reduced.',
  scheme: [['Oxidation half-reaction', 1], ['Reduction half-reaction and observation', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('h2o2-short', short({
  marks: 2,
  stem: 'Hydrogen peroxide can be used both as a bleach and to remove excess chlorine. Explain with oxidation numbers how the same compound can do both.',
  model: 'Oxygen in H₂O₂ is at −1, between its lowest state (−2) and 0. As a bleach, it is reduced to water (−2) and so oxidises the dye. With chlorine, it is oxidised to oxygen gas (0) and so reduces Cl₂ to chloride. An intermediate oxidation state allows both.',
  sol: 'O at −1 can fall to −2 or rise to 0.',
  scheme: [['O at −1 is intermediate', 1], ['Reduced to −2 as bleach; oxidised to 0 with Cl₂', 1]],
  d: 3, c: 'analysis', t: [1, 2],
}));

add('zn-hno3-short3', short({
  marks: 3,
  stem: r`Balance $\ce{Zn + HNO3 -> Zn(NO3)2 + N2O + H2O}$ (zinc with dilute nitric acid) by the oxidation-number method.`,
  model: r`Zn rises from 0 to +2, a rise of 2 per atom. N falls from +5 to +1 in N₂O, a fall of 4 per N, so 8 for the two N atoms in one N₂O. Equalising, 4 Zn (rise 8) go with 1 N₂O (fall 8): 4Zn + … → 4Zn(NO₃)₂ + N₂O. Eight nitrate ions go into the salt and two N into N₂O, so ten HNO₃ are used, and hydrogen balance gives five water molecules: $\ce{4Zn + 10HNO3 -> 4Zn(NO3)2 + N2O + 5H2O}$.`,
  sol: 'Rise 2 per Zn; fall 8 per N₂O; 4 : 1; balance N, then H and O.',
  scheme: [['ON changes of Zn and N', 1], ['Multipliers 4 Zn and 1 N₂O', 1], ['Final balanced equation', 1]],
  d: 3, c: 'application', t: [2],
}), () => 4 * 2 === 2 * 4 && 4 * 2 + 2 === 10 && 10 / 2 === 5 || 'balance');
add('classify-short3', short({
  marks: 3,
  stem: r`Classify each as combination, decomposition, displacement, disproportionation or not redox, giving oxidation-number evidence: (i) $\ce{CaO + SiO2 -> CaSiO3}$; (ii) $\ce{2Al + Fe2O3 -> Al2O3 + 2Fe}$; (iii) $\ce{4KClO3 -> 3KClO4 + KCl}$.`,
  model: r`(i) No oxidation number changes (Ca +2, Si +4, O −2), so it is not redox: a combination of two oxides. (ii) Al rises from 0 to +3 and Fe falls from +3 to 0: a displacement, as aluminium displaces iron. (iii) Chlorine goes from +5 to +7 in KClO₄ and to −1 in KCl: disproportionation, because one element is oxidised and reduced.`,
  sol: 'Not redox; displacement; disproportionation.',
  scheme: [['(i) not redox with evidence', 1], ['(ii) displacement with ON change', 1], ['(iii) disproportionation with ON change', 1]],
  d: 3, c: 'application', t: [2],
}));
add('br2-short3', short({
  marks: 3,
  stem: r`Balance the disproportionation of bromine in basic solution, $\ce{Br2 -> Br- + BrO3-}$, by the half-reaction method.`,
  model: r`Write the reduction half-reaction first: $\ce{Br2 + 2e- -> 2Br-}$. The oxidation half-reaction, balanced with hydroxide ions because the medium is basic, is $\ce{Br2 + 12OH- -> 2BrO3- + 6H2O + 10e-}$. Multiply the reduction by 5 so that ten electrons are gained and ten are lost, then add the halves: $\ce{6Br2 + 12OH- -> 10Br- + 2BrO3- + 6H2O}$. Every coefficient can be divided by 2 to give $\ce{3Br2 + 6OH- -> 5Br- + BrO3- + 3H2O}$, and the charge is −6 on both sides.`,
  sol: 'Two half-reactions; 5 : 1; halve.',
  scheme: [['Both half-reactions balanced', 1], ['Electrons equalised and added', 1], ['Simplified equation checked for charge', 1]],
  d: 4, c: 'application', t: [2],
}), () => -6 === -5 + -1 && 12 - 6 === 6 || 'Br');
add('titr-reason-short3', short({
  marks: 3,
  stem: 'In the titration of iron(II) ions with potassium permanganate, (i) why is no indicator added, and (ii) why is the flask acidified with dilute sulfuric acid rather than hydrochloric or nitric acid?',
  model: 'Permanganate is purple and is reduced to almost colourless Mn²⁺, so the first excess drop gives a faint permanent pink: it is its own indicator. Hydrochloric acid cannot be used because chloride ions are oxidised by permanganate, wasting titrant. Nitric acid is itself an oxidising agent. Sulfate ions are not oxidised, so sulfuric acid is used.',
  sol: 'Self-indicator; HCl oxidised; HNO₃ oxidant.',
  scheme: [['Self-indicating colour change', 1], ['HCl is oxidised by permanganate', 1], ['HNO₃ is an oxidising agent', 1]],
  d: 3, c: 'analysis', t: [2],
}));
add('p4-short3', short({
  marks: 3,
  stem: r`White phosphorus reacts with hot aqueous alkali: $\ce{P4 + 3OH- + 3H2O -> PH3 + 3H2PO2-}$. Show with oxidation numbers that this is a disproportionation, and name the two products formed from phosphorus.`,
  model: r`In P₄ phosphorus is 0. In phosphine, PH₃, it is −3, so it is reduced. In the hypophosphite ion, H₂PO₂⁻, x + 2(+1) + 2(−2) = −1 gives +1, so it is oxidised. One element in one species is both oxidised and reduced. The products are phosphine and hypophosphite ions.`,
  sol: 'P: 0 to −3 and +1.',
  scheme: [['ON of P in PH₃ is −3', 1], ['ON of P in H₂PO₂⁻ is +1', 1], ['Same element both ways; products named', 1]],
  d: 3, c: 'application', t: [2],
}), () => onOf([[3, 1]], 0) === -3 && onOf([[2, 1], [2, -2]], -1) === 1 || 'P');

// ---------------------------------------------------------------- long answers
add('rules-long', long({
  stem: '(a) State any four rules used to assign oxidation numbers.\n\n' + r`(b) Calculate the oxidation number of nitrogen in each ion of $\ce{NH4NO3}$ and of chromium in $\ce{K2Cr2O7}$.`,
  model: r`(a) An atom in an element has oxidation number 0; a simple ion has its charge; the numbers in a species add up to its overall charge; oxygen is usually −2 and hydrogen usually +1. (b) In NH₄⁺: x + 4(+1) = +1, so N is −3. In NO₃⁻: x + 3(−2) = −1, so N is +5. In K₂Cr₂O₇: 2(+1) + 2x + 7(−2) = 0, so 2x = 12 and Cr is +6.`,
  sol: 'Four rules; N −3 and +5; Cr +6.',
  scheme: [['(a) Four rules', 2], ['(b) N in NH₄⁺ = −3 and in NO₃⁻ = +5', 2], ['(b) Cr = +6', 1]],
  d: 2, c: 'application', t: [1],
}), () => onOf([[4, 1]], 1) === -3 && onOf([[3, -2]], -1) === 5 && onOf([[2, 1], [7, -2]], 0, 2) === 6 || 'ON');
add('half-acid-long', long({
  stem: r`Balance $\ce{Cr2O7^2- + SO3^2- -> Cr^3+ + SO4^2-}$ in acidic medium by the half-reaction method. Show each step.`,
  model: r`Reduction half-reaction: balance the two chromium atoms, then add seven water molecules for the seven oxygen atoms, then fourteen hydrogen ions for the hydrogen, and finally six electrons so the charge is +6 on both sides: $\ce{Cr2O7^2- + 14H+ + 6e- -> 2Cr^3+ + 7H2O}$. Oxidation half-reaction: $\ce{SO3^2- + H2O -> SO4^2- + 2H+ + 2e-}$. Multiply the oxidation by 3 so that six electrons are lost, and add the halves. After cancelling six hydrogen ions and three water molecules we obtain $\ce{Cr2O7^2- + 3SO3^2- + 8H+ -> 2Cr^3+ + 3SO4^2- + 4H2O}$, with charge zero on both sides.`,
  sol: 'Two half-reactions; multiply by 3; add; check charge.',
  scheme: [['Reduction half-reaction balanced', 1.5], ['Oxidation half-reaction balanced', 1.5], ['Electrons equalised and added', 1], ['Final equation checked for atoms and charge', 1]],
  d: 3, c: 'application', t: [2],
}), () => (-2 + 14 + -6) === 6 && (-2 - 6 + 8) === 0 && 2 * 3 + 3 * -2 === 0 || 'charge');
add('half-basic-long', long({
  stem: r`Balance $\ce{ClO- + CrO2- -> Cl- + CrO4^2-}$ in basic medium by the half-reaction method. Show each step.`,
  model: r`Reduction half-reaction: hypochlorite is reduced to chloride, and in basic medium water is placed on the left and hydroxide on the right: $\ce{ClO- + H2O + 2e- -> Cl- + 2OH-}$. Oxidation half-reaction: $\ce{CrO2- + 4OH- -> CrO4^2- + 2H2O + 3e-}$, balanced first as in acid and then made basic by adding hydroxide ions to cancel the hydrogen ions. Multiply the reduction by 3 and the oxidation by 2 so that six electrons are exchanged, and add the halves. Cancelling three water molecules and six hydroxide ions gives $\ce{3ClO- + 2CrO2- + 2OH- -> 3Cl- + 2CrO4^2- + H2O}$, and the charge is −7 on both sides.`,
  sol: 'Two half-reactions in base; × 3 and × 2; cancel.',
  scheme: [['Reduction half-reaction in base', 1.5], ['Oxidation half-reaction in base', 1.5], ['Multipliers and addition', 1], ['Cancellation and charge check', 1]],
  d: 4, c: 'application', t: [2],
}), () => 3 * -1 + 2 * -1 + 2 * -1 === 3 * -1 + 2 * -2 && 3 + 4 + 2 === 2 * 4 + 1 || 'balance');
add('daniell-long', long({
  stem: r`Describe the Daniell cell: (a) the two electrodes and solutions, (b) the half-reaction at each electrode, (c) the direction of electron flow and (d) the role of the salt bridge.`,
  model: r`(a) A zinc rod dips in zinc sulfate solution and a copper rod in copper sulfate solution. (b) At the zinc anode, oxidation occurs: $\ce{Zn -> Zn^2+ + 2e-}$. At the copper cathode, reduction occurs: $\ce{Cu^2+ + 2e- -> Cu}$. (c) Electrons flow from zinc to copper through the external wire, because zinc is the stronger reducing agent. (d) The salt bridge lets ions migrate between the beakers, keeping the solutions neutral and completing the circuit.`,
  sol: 'Electrodes; two half-reactions; zinc to copper; ions through bridge.',
  scheme: [['(a) Electrodes and solutions', 1], ['(b) Both half-reactions', 2], ['(c) Direction of electron flow with reason', 1], ['(d) Salt bridge', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('types-long', long({
  stem: r`Name the four types of redox reaction. Give one balanced example of each, and show from oxidation numbers why $\ce{CaCO3 -> CaO + CO2}$ is not redox.`,
  model: r`The four types are combination, decomposition, displacement and disproportionation. Combination: $\ce{N2 + 3H2 -> 2NH3}$, where nitrogen falls to −3 and hydrogen rises to +1. Decomposition: $\ce{2KClO3 -> 2KCl + 3O2}$, where chlorine falls from +5 to −1 and oxygen rises to 0. Displacement: $\ce{Zn + CuSO4 -> ZnSO4 + Cu}$, where zinc is oxidised and copper is reduced. Disproportionation: $\ce{2H2O2 -> 2H2O + O2}$, where oxygen goes both down to −2 and up to 0. In calcium carbonate, calcium stays +2, carbon stays +4 and oxygen stays −2 in reactants and products, so no electrons are transferred and the reaction is not redox.`,
  sol: 'Four types with examples; no ON change in CaCO₃.',
  scheme: [['Four types named', 1], ['Four balanced examples', 2], ['ON change identified in each', 1], ['CaCO₃ not redox with ON evidence', 1]],
  d: 3, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- case-based
add('titration-case', mk.case({
  passage: r`A student titrates $20.0\ \text{mL}$ portions of an iron(II) ammonium sulfate solution, acidified with dilute sulfuric acid, against $0.0200\ \text{mol L}^{-1}$ potassium permanganate from a burette.

| Titration | Burette reading (mL) |
|---|---|
| Rough | ${t.rough} |
| 1 | ${t.a} |
| 2 | ${t.b} |
| 3 | ${t.c} |

Titrations 1 to 3 were concordant. The equation is $\ce{MnO4- + 8H+ + 5Fe^2+ -> Mn^2+ + 5Fe^3+ + 4H2O}$.`.replace('${t.rough}', t.rough).replace('${t.a}', t.a).replace('${t.b}', t.b).replace('${t.c}', t.c),
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'How does the student recognise the end point?',
      right: 'The solution in the flask turns a faint pink that persists for about half a minute',
      wrong: ['The purple colour of the permanganate disappears completely', 'The solution turns from colourless to deep blue', 'A brown precipitate of manganese dioxide forms'],
      sol: 'Permanganate is its own indicator: once all the Fe²⁺ has reacted, one extra drop leaves an excess of purple MnO₄⁻, which shows as a faint, persistent pink — option (@K).',
      d: 1, c: 'understanding', t: [2],
    })),
    part('b', short({
      marks: 1, wl: null,
      stem: 'Calculate the mean titre of titrations 1 to 3.',
      model: r`$(${t.a} + ${t.b} + ${t.c})/3 = ${j(t.mean, 3)}\ \text{mL}$.`,
      sol: 'Mean of three readings.',
      scheme: [['19.6 mL', 1]],
      d: 1, c: 'application', t: [2],
    }), []),
    part('c', short({
      marks: 2, wl: null,
      stem: 'Calculate the molarity of the iron(II) solution.',
      model: r`$n(\text{MnO}_4^-) = 0.0200 \times ${j(t.mean, 3)}/1000 = ${S(t.nMn, 3)}\ \text{mol}$; $n(\text{Fe}^{2+}) = 5 \times ${S(t.nMn, 3)} = ${S(t.nFe, 3)}\ \text{mol}$; $c = ${S(t.nFe, 3)}/0.0200 = ${j(t.M, 3)}\ \text{mol L}^{-1}$.`,
      sol: r`$c = 5 \times 0.0200 \times 19.6/20.0 = ${j(t.M, 3)}\ \text{mol L}^{-1}$.`,
      scheme: [['Moles of Fe²⁺ = 5 × moles of MnO₄⁻', 1], ['0.0980 mol L⁻¹', 1]],
      d: 3, c: 'application', t: [2],
    }), [
      short({
        marks: 2, wl: null,
        stem: r`Calculate the mass of iron(II) ions in one litre of the solution ($M(\text{Fe}) = 55.85\ \text{g mol}^{-1}$).`,
        model: r`$c = ${j(t.M, 3)}\ \text{mol L}^{-1}$, so the mass is $${j(t.M, 3)} \times 55.85 = ${j(t.g, 3)}\ \text{g}$ per litre.`,
        sol: r`$${j(t.M, 3)} \times 55.85 = ${j(t.g, 3)}\ \text{g L}^{-1}$.`,
        scheme: [['Molarity 0.0980', 1], ['5.47 g per litre', 1]],
        d: 3, c: 'application', t: [2],
      }),
    ]),
  ],
}), () => near(t.mean, 19.6, 1e-9) && near(t.M, 0.098, 0.001) && near(t.g, 5.473, 0.002) || 'titr');
add('bleach-case', mk.case({
  passage: r`Chlorine gas is passed into aqueous sodium hydroxide under two conditions.

| Conditions | Products containing chlorine |
|---|---|
| Cold, dilute alkali | Sodium chloride and sodium hypochlorite |
| Hot, concentrated alkali | Sodium chloride and sodium chlorate |

The first solution is used as a household bleach.`,
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Which statement about chlorine in cold dilute alkali is correct?',
      right: 'Chlorine is oxidised to hypochlorite (+1) and reduced to chloride (−1)',
      wrong: ['Chlorine is only oxidised, to hypochlorite', 'Chlorine is only reduced, to chloride', 'Chlorine is oxidised to chlorate (+5) and reduced to hypochlorite'],
      sol: 'Cl₂ (0) gives Cl⁻ (−1, reduction) and ClO⁻ (+1, oxidation) at the same time, so chlorine disproportionates — option (@K).',
      d: 2, c: 'application', t: [2],
    })),
    part('b', short({
      marks: 1, wl: null,
      stem: 'State the oxidation number of chlorine in the hypochlorite ion and in the chlorate ion.',
      model: r`ClO⁻: $x - 2 = -1$, so +1. ClO₃⁻: $x - 6 = -1$, so +5.`,
      sol: '+1 and +5.',
      scheme: [['+1 and +5', 1]],
      d: 2, c: 'application', t: [1],
    }), []),
    part('c', short({
      marks: 2, wl: null,
      stem: r`Write the balanced equation for chlorine with hot concentrated alkali, giving chloride and chlorate, and state the total electrons lost by the chlorine that is oxidised.`,
      model: r`$\ce{3Cl2 + 6OH- -> 5Cl- + ClO3- + 3H2O}$. One chlorine rises from 0 to +5 and loses 5 electrons; these are gained by the five chlorine atoms that fall from 0 to −1.`,
      sol: r`$\ce{3Cl2 + 6OH- -> 5Cl- + ClO3- + 3H2O}$; 5 electrons lost.`,
      scheme: [['Balanced equation', 1], ['5 electrons lost and gained', 1]],
      d: 3, c: 'application', t: [2],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'Explain why chlorine must start in an intermediate oxidation state to disproportionate, and why fluorine cannot do the same in alkali.',
        model: 'To be both oxidised and reduced, an atom must be able to go up and down from its starting number. Chlorine at 0 can go to −1 and to positive values. Fluorine has no positive oxidation number and cannot go above 0 in its compounds, so it cannot be oxidised in this way.',
        sol: 'Intermediate state allows both; F has no positive state.',
        scheme: [['Both directions needed', 1], ['Fluorine has no positive oxidation number', 1]],
        d: 4, c: 'evaluation', t: [1, 2],
      }),
    ]),
  ],
}));
add('reactivity-case', mk.case({
  passage: r`A student places a clean strip of each of four metals in solutions of the salts of the other three metals. A tick means a deposit formed; a dash means no change.

| Metal strip | Zn²⁺ solution | Fe²⁺ solution | Cu²⁺ solution | Ag⁺ solution |
|---|---|---|---|---|
| Zn | not used | tick | tick | tick |
| Fe | dash | not used | tick | tick |
| Cu | dash | dash | not used | tick |
| Ag | dash | dash | dash | not used |`,
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'Which metal is the strongest reducing agent in this set?',
      right: 'Zinc',
      wrong: ['Iron', 'Copper', 'Silver'],
      sol: 'Zinc displaces all three other metals from their solutions, so it loses electrons most readily — option (@K).',
      d: 2, c: 'analysis', t: [2],
    })),
    part('b', short({
      marks: 1, wl: null,
      stem: 'Write the four metals in decreasing order of reactivity.',
      model: 'Zn > Fe > Cu > Ag.',
      sol: 'Zn > Fe > Cu > Ag.',
      scheme: [['Zn > Fe > Cu > Ag', 1]],
      d: 2, c: 'analysis', t: [2],
    }), []),
    part('c', short({
      marks: 2, wl: null,
      stem: r`Write the ionic equation for the reaction of copper with silver ions, and name the oxidising agent.`,
      model: r`$\ce{Cu + 2Ag+ -> Cu^2+ + 2Ag}$. The silver ion gains electrons and is reduced, so Ag⁺ is the oxidising agent.`,
      sol: r`$\ce{Cu + 2Ag+ -> Cu^2+ + 2Ag}$; Ag⁺ is the oxidising agent.`,
      scheme: [['Balanced ionic equation', 1], ['Ag⁺ named as oxidising agent', 1]],
      d: 2, c: 'application', t: [2],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'Write the two half-reactions for the reaction of iron with copper(II) solution, and state which is oxidation.',
        model: r`Oxidation: $\ce{Fe -> Fe^2+ + 2e-}$. Reduction: $\ce{Cu^2+ + 2e- -> Cu}$. Iron loses electrons, so iron is oxidised.`,
        sol: r`Oxidation: $\ce{Fe -> Fe^2+ + 2e-}$; reduction: $\ce{Cu^2+ + 2e- -> Cu}$.`,
        scheme: [['Both half-reactions', 1], ['Oxidation identified', 1]],
        d: 2, c: 'application', t: [2],
      }),
    ]),
  ],
}));
add('carbon-case', mk.case({
  passage: r`Methanol can be oxidised in steps, for example by acidified dichromate solution: $\ce{CH3OH}$ to $\ce{HCHO}$ to $\ce{HCOOH}$ to $\ce{CO2}$. Each step removes electrons from carbon, although the carbon atom keeps four bonds throughout.`,
  d: 3, c: 'analysis',
  children: [
    part('a', mcq({
      stem: 'The oxidation number of carbon in methanal, HCHO, is:',
      right: '0',
      wrong: ['−2', '+2', '+4'],
      sol: 'x + 2(+1) + (−2) = 0, so x = 0 — option (@K). (@1) is the value in methanol.',
      d: 2, c: 'application', t: [1],
    })),
    part('b', short({
      marks: 1, wl: null,
      stem: 'How many electrons does each carbon atom lose when methanol is oxidised to methanoic acid?',
      model: r`From $-2$ to $+2$: a rise of 4, so 4 electrons.`,
      sol: 'Rise of 4: four electrons.',
      scheme: [['4 electrons', 1]],
      d: 2, c: 'application', t: [1],
    }), []),
    part('c', short({
      marks: 2, wl: null,
      stem: 'Is the conversion of methanal to methanoic acid oxidation or reduction? Give the oxidation numbers of carbon and the electrons involved.',
      model: 'It is oxidation. Carbon rises from 0 in methanal to +2 in methanoic acid, so each carbon atom loses 2 electrons. The oxidising agent is reduced in the same step.',
      sol: 'Oxidation: 0 to +2, two electrons.',
      scheme: [['Oxidation with ON 0 to +2', 1], ['Two electrons lost per carbon', 1]],
      d: 3, c: 'application', t: [1],
    }), [
      short({
        marks: 2, wl: null,
        stem: 'Methane to methanol raises carbon from −4 to −2. Is this oxidation or reduction, and how many electrons per carbon are involved?',
        model: 'It is oxidation, because the oxidation number rises from −4 to −2. Two electrons are lost per carbon atom, and an oxygen atom has been added in place of a hydrogen.',
        sol: 'Oxidation: −4 to −2, two electrons.',
        scheme: [['Oxidation (ON rises)', 1], ['Two electrons per carbon', 1]],
        d: 3, c: 'application', t: [1],
      }),
    ]),
  ],
}), () => onOf([[2, 1], [1, -2]], 0) === 0 || 'C');
