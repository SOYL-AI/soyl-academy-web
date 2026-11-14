// ISC 11 Chemistry ch16 Redox Reactions: objective items (mcq, assertion-reason, true-false, fill-blank, match, numerical).
// Atomic masses: H 1, C 12, N 14, O 16, Na 23, S 32, Cl 35.5, K 39, Cr 52, Mn 55, Fe 56. Every balanced equation is also checked for atoms and charge (data.mjs).
// Assertion-reason keys: a b c d a b.
import { mk, add, r, near } from './lib.mjs';
import { ON, EQ, sg, solveON, checkEq } from './data.mjs';

const { mcq, ar, tf, fill, match, num } = mk;

// ---------------------------------------------------------------- t01 oxidation and reduction
add('chk-agent-mcq', mcq({
  stem: 'A railway workshop welds broken tracks with the thermite mixture. The reaction is $\\ce{2Al + Fe2O3 -> Al2O3 + 2Fe}$. Which statement is correct?',
  right: 'Aluminium is the reducing agent, because it loses electrons and is oxidised',
  wrong: ['Aluminium is the oxidising agent, because it gains oxygen', 'Iron(III) oxide is the reducing agent, because it loses oxygen', 'Both aluminium and iron are reduced'],
  sol: String.raw`Al goes from 0 to $+3$ (oxidised), so it is the reducing agent; Fe goes from $+3$ to 0 (reduced), so $\ce{Fe2O3}$ is the oxidising agent — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => checkEq('2Al + Fe2O3 -> Al2O3 + 2Fe') === true || 'chk-agent');
add('oxid-mcq', mcq({
  stem: 'Which of the following changes of a species, written as a half-reaction, is an oxidation?',
  right: 'S²⁻ → S + 2e⁻',
  wrong: ['Cl₂ + 2e⁻ → 2Cl⁻', 'Fe³⁺ + e⁻ → Fe²⁺', 'Cu²⁺ + 2e⁻ → Cu'],
  sol: 'Oxidation is loss of electrons, with electrons on the right-hand side: S²⁻ loses 2 electrons (ON −2 to 0). The others gain electrons and are reductions — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('hyd-agent-mcq', mcq({
  stem: 'In a gas-works the reaction $\\ce{H2S + Cl2 -> 2HCl + S}$ is used to remove sulphur compounds. Which species is the reducing agent?',
  right: 'H₂S, because sulphur rises from −2 to 0',
  wrong: ['Cl₂, because chlorine rises from 0 to −1', 'HCl, because it is a product', 'S, because it is a solid product'],
  sol: String.raw`In $\ce{H2S}$, S is $-2$ and in the product S is 0: it loses electrons, so $\ce{H2S}$ is oxidised and is the reducing agent; chlorine goes from 0 to $-1$ and is reduced — option (@K).`,
  d: 2, c: 'application', t: [1, 2],
}), () => checkEq('H2S + Cl2 -> 2HCl + S') === true || 'hyd-agent');
add('e-count-mcq', (() => {
  const m = 2.8;
  const n = m / 56;
  const ne = 3 * n;
  return mcq({
    stem: `A strip of iron of mass ${m} g (M = 56 g mol⁻¹) is completely oxidised to Fe³⁺ ions by an excess of an oxidising agent. The amount of electrons lost by the iron is:`,
    right: `${ne.toFixed(2)} mol`,
    wrong: [`${n.toFixed(2)} mol`, `${(2 * n).toFixed(2)} mol`, `${(m * 3).toFixed(2)} mol`],
    sol: String.raw`Moles of Fe $= ${m}/56 = ${n.toFixed(2)}$; each Fe loses 3 electrons ($\ce{Fe -> Fe^3+ + 3e-}$), so electrons lost $= 3 \times ${n.toFixed(2)} = ${ne.toFixed(2)}$ mol — option (@K).`,
    d: 3, c: 'application', t: [1],
  });
})(), () => near(3 * 2.8 / 56, 0.15, 1e-9) || 'e-count');
add('red-h-mcq', mcq({
  stem: 'In the Haber process $\\ce{N2 + 3H2 -> 2NH3}$, nitrogen is converted to ammonia. In terms of hydrogen and oxidation numbers, nitrogen is:',
  right: 'reduced, because it gains hydrogen and its oxidation number falls from 0 to −3',
  wrong: ['oxidised, because it gains hydrogen and its oxidation number rises', 'reduced, because its oxidation number rises from 0 to +3', 'neither oxidised nor reduced, because no oxygen is involved'],
  sol: 'Gain of hydrogen is reduction. In NH₃, N is −3 (3 × (+1) + x = 0), so its ON falls from 0 to −3 — option (@K).',
  d: 2, c: 'understanding', t: [1, 2],
}));

// ---------------------------------------------------------------- t02 oxidation numbers
add('on-cr-mcq', mcq({
  stem: 'The orange crystals of potassium dichromate, K₂Cr₂O₇, are used in a school titration. The oxidation number of chromium in this compound is:',
  right: sg(ON.K2Cr2O7.Cr),
  wrong: ['+3', '+7', '+12'],
  sol: String.raw`$2(+1) + 2x + 7(-2) = 0$, so $2x = +12$ and $x = ${sg(ON.K2Cr2O7.Cr)}$ — option (@K). (+12 is the total for two atoms.)`,
  d: 2, c: 'understanding', t: [2],
}));
add('chk-on-mcq', (() => {
  const p = solveON(0, [[4, +1], [7, -2]], 2);
  return mcq({
    stem: 'A chemist in a detergent factory analyses diphosphoric acid, H₄P₂O₇. The oxidation number of phosphorus in it is:',
    right: sg(p),
    wrong: ['+3', '+7', '+2.5'],
    sol: String.raw`$4(+1) + 2x + 7(-2) = 0$, so $2x = 10$ and $x = ${sg(p)}$ — option (@K).`,
    d: 2, c: 'understanding', t: [2],
  });
})(), () => solveON(0, [[4, 1], [7, -2]], 2) === 5 || 'chk-on');
add('on-s2o3-mcq', mcq({
  stem: 'Sodium thiosulphate, Na₂S₂O₃, is used as a photographic fixer. The oxidation number of sulphur in the thiosulphate ion, S₂O₃²⁻, is:',
  right: sg(ON.S2O3.S),
  wrong: ['+4', '+6', '+1'],
  sol: String.raw`For the ion the sum equals the charge: $2x + 3(-2) = -2$, so $x = ${sg(ON.S2O3.S)}$ — option (@K).`,
  d: 2, c: 'understanding', t: [2],
}));
add('on-ch3oh-mcq', mcq({
  stem: 'Carbon is present in methane, methanol, methanal and carbon dioxide. In methanol, CH₃OH, the oxidation number of carbon is:',
  right: sg(ON.CH3OH.C),
  wrong: ['0', '+2', '−4'],
  sol: String.raw`$x + 4(+1) + (-2) = 0$ gives $x = ${sg(ON.CH3OH.C)}$ — option (@K).`,
  d: 2, c: 'understanding', t: [2],
}));
add('on-delta-mcq', (() => {
  const c0 = solveON(0, [[4, +1]]);
  const c1 = solveON(0, [[2, -2]]);
  return mcq({
    stem: 'A gas cooker burns methane: $\\ce{CH4 + 2O2 -> CO2 + 2H2O}$. The total change in the oxidation number of carbon, and its direction, are:',
    right: `an increase of ${c1 - c0}, from ${sg(c0)} to ${sg(c1)}`,
    wrong: [`a decrease of ${c1 - c0}, from ${sg(c1)} to ${sg(c0)}`, `an increase of ${c1}, from 0 to ${sg(c1)}`, 'no change, because carbon is tetravalent in both'],
    sol: String.raw`In $\ce{CH4}$: $x + 4 = 0$, so C is $${sg(c0)}$; in $\ce{CO2}$: $x - 4 = 0$, so C is $${sg(c1)}$. The increase is $${c1 - c0}$ — option (@K).`,
    d: 3, c: 'application', t: [2],
  });
})(), () => checkEq('CH4 + 2O2 -> CO2 + 2H2O') === true || 'on-delta');
add('on-hyd-mcq', mcq({
  stem: 'Calcium hydride is used to dry solvents: $\\ce{CaH2 + 2H2O -> Ca(OH)2 + 2H2}$. Which statement about this reaction is correct?',
  right: 'Water is the oxidising agent, because hydrogen in H₂O falls from +1 to 0',
  wrong: ['Water is the reducing agent, because oxygen is unchanged', 'CaH₂ is the oxidising agent, because hydrogen in it is +1', 'It is not a redox reaction, because no element changes its oxidation number'],
  sol: 'In CaH₂ hydrogen is −1 (hydride); in H₂O it is +1; in H₂ it is 0. Hydrogen in water falls from +1 to 0 (reduced, so water is the oxidising agent), while hydride rises from −1 to 0 — option (@K).',
  d: 3, c: 'analysis', t: [1, 2],
}), () => checkEq('CaH2 + 2H2O -> Ca(OH)2 + 2H2') === true || 'on-hyd');
add('on-redox-mcq', mcq({
  stem: 'A student mixes solutions of lead(II) nitrate and potassium iodide and a yellow solid forms. Which description of this reaction is correct?',
  right: 'It is not a redox reaction, because no oxidation number changes',
  wrong: ['It is a redox reaction, because a precipitate forms', 'It is a redox reaction, because iodide is oxidised to iodine', 'It is a redox reaction, because lead is reduced to the metal'],
  sol: String.raw`$\ce{Pb(NO3)2 + 2KI -> PbI2 + 2KNO3}$: Pb stays $+2$, I stays $-1$, K $+1$, N $+5$ and O $-2$. With no change in any oxidation number the reaction is not redox — option (@K).`,
  d: 2, c: 'understanding', t: [2],
}), () => checkEq('Pb(NO3)2 + 2KI -> PbI2 + 2KNO3') === true || 'on-redox');
add('on-clo3-mcq', mcq({
  stem: 'Potassium chlorate, KClO₃, is used in safety matches. Chlorine has the same oxidation number in it as in which of the following?',
  right: 'Cl₂O₅, dichlorine pentoxide',
  wrong: ['ClO₄⁻, the perchlorate ion', 'ClO⁻, the hypochlorite ion', 'Cl₂, chlorine gas'],
  sol: String.raw`In $\ce{KClO3}$: $+1 + x - 6 = 0$, $x = ${sg(ON.ClO3.Cl)}$. In $\ce{Cl2O5}$: $2x - 10 = 0$, so chlorine is also ${sg(ON.ClO3.Cl)}. In $\ce{ClO4-}$ chlorine is ${sg(ON.ClO4.Cl)}, in $\ce{ClO-}$ it is ${sg(ON.ClO.Cl)} and in $\ce{Cl2}$ it is 0 — option (@K).`,
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 balancing
add('bal-coef-mcq', mcq({
  stem: 'In the balanced ionic equation for dichromate ions oxidising iron(II) ions in acidic solution, the coefficient of H⁺ and the number of electrons gained by one Cr₂O₇²⁻ ion are, respectively:',
  right: '14 and 6',
  wrong: ['7 and 6', '14 and 3', '8 and 5'],
  sol: String.raw`Reduction half: $\ce{${EQ.hCr}}$ — 14 H⁺ and 6 electrons (2 × (+6 to +3)) — option (@K).`,
  d: 3, c: 'application', t: [3],
}));
add('bal-e-mcq', mcq({
  stem: 'In the reduction of nitrate to nitrogen monoxide in acid, the skeletal half-reaction is $\\ce{NO3- -> NO}$. The number of electrons appearing in the balanced half-reaction, and on which side, is:',
  right: '3, on the left (reactant) side',
  wrong: ['3, on the right (product) side', '5, on the left (reactant) side', '2, on the left (reactant) side'],
  sol: String.raw`N goes from $+5$ to $+2$, so 3 electrons are gained: $\ce{NO3- + 4H+ + 3e- -> NO + 2H2O}$ with electrons on the left — option (@K).`,
  d: 3, c: 'application', t: [3],
}), () => checkEq(EQ.hNO3) === true && ON.HNO3.N === 5 || 'bal-e');
add('chk-basic-mcq', mcq({
  stem: 'Permanganate is reduced to manganese dioxide by iodide in basic medium; the balanced equation is $\\ce{2MnO4- + 6I- + 4H2O -> 2MnO2 + 3I2 + 8OH-}$. Which statement is correct?',
  right: 'The hydroxide ions appear on the right-hand side, and the charge is −8 on each side',
  wrong: ['Hydrogen ions appear on the left-hand side, with charge +8', 'Hydroxide ions appear on the left-hand side, with charge −8', 'The charge is −2 on the left and −8 on the right'],
  sol: String.raw`Left: $2(-1) + 6(-1) = -8$; right: $8(-1) = -8$. Basic-medium equations contain $\ce{OH-}$, here on the product side, and no $\ce{H+}$ — option (@K).`,
  d: 3, c: 'application', t: [3],
}), () => checkEq(EQ.MnI) === true || 'chk-basic');
add('bal-ratio-mcq', mcq({
  stem: 'Copper dissolves in dilute nitric acid: $\\ce{3Cu + 2NO3- + 8H+ -> 3Cu^2+ + 2NO + 4H2O}$. What is the ratio of the amounts of copper and nitrate ions that react, and the number of electrons transferred in all?',
  right: '3 : 2, with 6 electrons transferred in all',
  wrong: ['2 : 3, with 6 electrons transferred in all', '3 : 2, with 3 electrons transferred in all', '1 : 1, with 2 electrons transferred in all'],
  sol: String.raw`Cu rises by 2 per atom, N falls by 3 per atom. Total rise $= 3 \times 2 = 6$, total fall $= 2 \times 3 = 6$, so the ratio Cu : $\ce{NO3-}$ is 3 : 2 and 6 electrons are transferred — option (@K).`,
  d: 4, c: 'analysis', t: [3],
}), () => checkEq(EQ.CuNO3) === true || 'bal-ratio');
add('bal-water-mcq', mcq({
  stem: 'While balancing the reduction half-reaction $\\ce{MnO4- -> Mn^2+}$ in acidic medium by the ion-electron method, the four oxygen atoms on the left are balanced by adding:',
  right: '4 H₂O to the right-hand side',
  wrong: ['4 OH⁻ to the left-hand side', '8 H⁺ to the right-hand side', '4 O₂ to the right-hand side'],
  sol: 'Oxygen is balanced with water in either medium: add 4 H₂O on the right, then balance the hydrogen with 8 H⁺ on the left and the charge with 5 electrons — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('bal-moles-mcq', (() => {
  const nCr = 0.020;
  const nFe = 6 * nCr;
  return mcq({
    stem: `A mass of potassium dichromate containing ${nCr.toFixed(3)} mol of Cr₂O₇²⁻ is added to an acidified iron(II) solution. The amount of Fe²⁺ that can be oxidised completely is:`,
    right: `${nFe.toFixed(2)} mol`,
    wrong: [`${(nCr * 3).toFixed(2)} mol`, `${(nCr * 2).toFixed(2)} mol`, `${(nCr * 14).toFixed(2)} mol`],
    sol: String.raw`Each $\ce{Cr2O7^2-}$ gains 6 electrons and each $\ce{Fe^2+}$ loses 1, so $n(\ce{Fe^2+}) = 6 \times ${nCr.toFixed(3)} = ${nFe.toFixed(2)}$ mol — option (@K).`,
    d: 3, c: 'application', t: [3],
  });
})(), () => near(6 * 0.02, 0.12, 1e-9) || 'bal-moles');

// ---------------------------------------------------------------- t04 types
add('chk-type-mcq', mcq({
  stem: 'Which of the following is a disproportionation reaction?',
  right: 'Cl₂ + 2OH⁻ → Cl⁻ + ClO⁻ + H₂O',
  wrong: ['Cl₂ + 2NaBr → 2NaCl + Br₂', '2Na + Cl₂ → 2NaCl', '2HgO → 2Hg + O₂'],
  sol: 'In Cl₂ + 2OH⁻ → Cl⁻ + ClO⁻ + H₂O, chlorine goes from 0 to −1 and to +1: one element is both reduced and oxidised. The others are displacement, combination and decomposition — option (@K).',
  d: 2, c: 'understanding', t: [4],
}), () => checkEq(EQ.Cl2cold) === true || 'chk-type');
add('type-decomp-mcq', mcq({
  stem: 'On heating, each of the following decomposes. Which decomposition is also a redox reaction?',
  right: 'Mercury(II) oxide, forming mercury and oxygen',
  wrong: ['Calcium carbonate, forming calcium oxide and carbon dioxide', 'Calcium hydroxide, forming calcium oxide and water', 'Ammonium chloride, forming ammonia and hydrogen chloride'],
  sol: String.raw`$\ce{2HgO -> 2Hg + O2}$: Hg $+2 \to 0$ and O $-2 \to 0$, so oxidation numbers change. In the others every oxidation number is unchanged — option (@K).`,
  d: 3, c: 'analysis', t: [4],
}), () => checkEq(EQ.HgO) === true || 'type-decomp');
add('type-displ-mcq', mcq({
  stem: 'A student places strips of zinc, silver, gold and mercury (in the order of the activity series zinc > copper > mercury > silver > gold) in separate beakers of blue copper(II) sulphate solution. In which beaker does the colour fade and a red-brown solid form?',
  right: 'Zinc, because it is more reactive and displaces copper',
  wrong: ['Silver, because it is a good conductor', 'Gold, because it is a noble metal', 'Mercury, because it is a liquid metal'],
  sol: String.raw`Only a metal above copper in the activity series displaces it: $\ce{Zn + Cu^2+ -> Zn^2+ + Cu}$ (Zn $0 \to +2$, Cu $+2 \to 0$) — option (@K).`,
  d: 3, c: 'application', t: [4],
}));
add('type-comb-mcq', mcq({
  stem: 'In an engine cylinder at very high temperature, nitrogen and oxygen combine: $\\ce{N2 + O2 -> 2NO}$. This reaction is best described as:',
  right: 'a combination reaction that is also redox, since N rises from 0 to +2 and O falls from 0 to −2',
  wrong: ['a combination reaction that is not redox, since the elements are in their standard states', 'a displacement reaction, since one element replaces another', 'a disproportionation reaction, since both products are oxides'],
  sol: String.raw`Two elements join to form one compound (combination), and the oxidation numbers change: N $0 \to +2$ (oxidised) and O $0 \to -2$ (reduced) — option (@K).`,
  d: 2, c: 'understanding', t: [4],
}), () => checkEq(EQ.N2O2) === true || 'type-comb');
add('type-disp3-mcq', mcq({
  stem: 'In dilute sulphuric acid, copper(I) ions are unstable and change to copper metal and copper(II) ions: $\\ce{2Cu+ -> Cu^2+ + Cu}$. This is a case of:',
  right: 'disproportionation, because Cu⁺ is both oxidised (+1 to +2) and reduced (+1 to 0)',
  wrong: ['displacement, because copper replaces copper', 'decomposition, because one species gives two products with no change in oxidation number', 'combination, because two copper species form a single product'],
  sol: String.raw`The single species $\ce{Cu+}$ ($+1$) forms $\ce{Cu^2+}$ ($+2$, oxidised) and $\ce{Cu}$ (0, reduced): the same element rises and falls — option (@K).`,
  d: 3, c: 'application', t: [4],
}), () => checkEq(EQ.CuDisp) === true || 'type-disp3');

// ---------------------------------------------------------------- assertion-reason (a b c d a b)
add('ar-zn', ar({
  a: 'A zinc granule dropped into copper(II) sulphate solution is oxidised, and the blue colour fades.',
  r: 'The oxidation number of zinc rises from 0 to +2 while that of copper falls from +2 to 0.',
  key: 'a',
  sol: 'Both statements are true. Zinc loses electrons (ON 0 to +2) and Cu²⁺ gains them (ON +2 to 0), so the blue colour of Cu²⁺ fades; Reason explains Assertion — option (a).',
  d: 2, c: 'understanding', t: [1, 2],
}));
add('ar-cl2', ar({
  a: 'Chlorine undergoes disproportionation when it reacts with cold dilute sodium hydroxide.',
  r: 'Chlorine gas is greenish yellow in colour and has a pungent smell.',
  key: 'b',
  sol: 'Both statements are true, but the Reason is unrelated to the Assertion: disproportionation occurs because chlorine, in an intermediate state (0), can be both oxidised (to +1) and reduced (to −1) — option (b).',
  d: 3, c: 'analysis', t: [2, 4],
}));
add('ar-of2', ar({
  a: 'The oxidation number of oxygen in oxygen difluoride, OF₂, is +2.',
  r: 'Oxygen is more electronegative than fluorine, so it attracts the shared electrons more strongly.',
  key: 'c',
  sol: 'The Assertion is true: F is −1, so O is +2. The Reason is false: fluorine is more electronegative than oxygen, and this is why oxygen is positive — option (c).',
  d: 3, c: 'understanding', t: [2],
}));
add('ar-agcl', ar({
  a: 'When silver nitrate solution is added to sodium chloride solution, silver is reduced to silver metal.',
  r: 'In the product silver chloride, the oxidation number of silver is 0.',
  key: 'd',
  sol: 'Both statements are false. Ag is +1 in silver nitrate and still +1 in AgCl, so no oxidation number changes and no reduction occurs; this is a precipitation reaction, not a redox reaction — option (d).',
  d: 2, c: 'understanding', t: [2],
}));
add('ar-h2o2', ar({
  a: 'Hydrogen peroxide can act both as an oxidising agent and as a reducing agent.',
  r: 'Oxygen in hydrogen peroxide has the oxidation number −1, which lies between −2 and 0.',
  key: 'a',
  sol: 'Both statements are true. Oxygen at −1 can fall to −2 (H₂O₂ oxidising) or rise to 0 (H₂O₂ reducing), because −1 is intermediate; Reason explains Assertion — option (a).',
  d: 3, c: 'analysis', t: [2, 4],
}));
add('ar-mn', ar({
  a: 'In acidic medium the permanganate ion is reduced to the manganese(II) ion.',
  r: 'Crystals of potassium permanganate are dark purple.',
  key: 'b',
  sol: 'Both statements are true, but the Reason is unrelated to the Assertion: the reduction product depends on the medium (Mn²⁺ in acid, MnO₂ in neutral or basic medium), not on the colour of the crystals — option (b).',
  d: 3, c: 'analysis', t: [3],
}));

// ---------------------------------------------------------------- true-false, fill-blank, match
add('chk-redox-tf', tf({
  stem: 'The reaction of barium chloride solution with sodium sulphate solution, which gives a white precipitate of barium sulphate, is a redox reaction because a new solid is formed.',
  key: 'f',
  sol: 'False. Ba stays +2, S stays +6 and Cl stays −1; with no change in any oxidation number it is a precipitation reaction, not a redox reaction.',
  d: 2, c: 'understanding', t: [2],
}), () => checkEq(EQ.BaSO4) === true || 'chk-redox');
add('tf-half', tf({
  stem: 'In the reduction half-reaction written for the ion-electron method, the electrons appear on the product side.',
  key: 'f',
  sol: 'False. In a reduction half-reaction electrons are gained, so they appear on the reactant (left) side; they appear on the right in an oxidation half-reaction.',
  d: 1, c: 'recall', t: [3],
}));
add('tf-fraction', tf({
  stem: 'The average oxidation number of sulphur in the tetrathionate ion S₄O₆²⁻ is +2.5, a fraction, because its sulphur atoms do not all have the same oxidation number.',
  key: 't',
  sol: String.raw`True. $4x + 6(-2) = -2$ gives $x = +2.5$ as an average; the S atoms are in two different environments, so the average is not a whole number.`,
  d: 3, c: 'understanding', t: [2],
}));
add('fill-elem', fill({
  stem: 'The oxidation number of an atom in a free element, such as sulphur in S₈, is ___.',
  acc: [['zero', 'Zero', '0']],
  sol: 'An atom in an uncombined element has oxidation number zero.',
  d: 1, c: 'recall', t: [2],
}));
add('fill-water', fill({
  stem: 'In the ion-electron method, in either acidic or basic medium, oxygen atoms are balanced by adding ___ molecules.',
  acc: [['water', 'Water', 'H2O', 'H₂O']],
  sol: 'Oxygen is balanced with H₂O molecules; hydrogen is then balanced with H⁺ (acid) or OH⁻ (base).',
  d: 1, c: 'recall', t: [3],
}));
add('fill-clo4', fill({
  stem: 'The oxidation number of chlorine in the perchlorate ion, ClO₄⁻, is ___.',
  acc: [['+7', '7', 'plus 7', 'plus seven']],
  sol: String.raw`$x + 4(-2) = -1$ gives $x = +7$.`,
  d: 2, c: 'understanding', t: [2],
}));
add('match-agent', match({
  stem: 'Match each reaction (column I) with its oxidising agent (column II).',
  pairs: [['2Al + Fe₂O₃ → Al₂O₃ + 2Fe', 'Fe₂O₃'], ['Cl₂ + 2KI → 2KCl + I₂', 'Cl₂'], ['Zn + 2H⁺ → Zn²⁺ + H₂', 'H⁺'], ['Cu + 2Ag⁺ → Cu²⁺ + 2Ag', 'Ag⁺']],
  order: [0, 1, 2, 3],
  sol: 'The oxidising agent is the species that is reduced: Fe in Fe₂O₃ (+3 to 0), Cl₂ (0 to −1), H⁺ (+1 to 0) and Ag⁺ (+1 to 0).',
  d: 2, c: 'application', t: [1],
}), () => checkEq(EQ.Thermite) === true && checkEq(EQ.ClKI) === true && checkEq(EQ.ZnH) === true && checkEq(EQ.CuAg) === true || 'match-agent');
add('match-on', match({
  stem: 'Match each species or atom (column I) with its oxidation number (column II).',
  pairs: [['Cr in K₂Cr₂O₇', '+6'], ['S in S₂O₃²⁻', '+2'], ['Average S in Na₂S₄O₆', '+2.5'], ['O in H₂O₂', '−1']],
  order: [0, 1, 2, 3],
  sol: 'K₂Cr₂O₇: +6; S₂O₃²⁻: +2; Na₂S₄O₆: +2.5 (average); H₂O₂: oxygen −1 (peroxide).',
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- numericals
add('chk-bal-num', (() => {
  const e = 2 * (ON.Cr2O7.Cr - 3);
  return num({
    stem: 'In acidic solution the dichromate ion is reduced to chromium(III) ions. Calculate the number of electrons gained by one Cr₂O₇²⁻ ion.',
    value: e, tol: 0, unit: null,
    sol: String.raw`Cr changes from $${sg(ON.Cr2O7.Cr)}$ to $+3$: a fall of ${ON.Cr2O7.Cr - 3} per atom. There are 2 Cr atoms in $\ce{Cr2O7^2-}$, so electrons gained $= 2 \times ${ON.Cr2O7.Cr - 3} = ${e}$.`,
    scheme: [['Fall of 3 per Cr atom (+6 to +3)', 0.5], ['Two Cr atoms: 2 × 3 = 6 electrons', 0.5]],
    marks: 1, d: 3, c: 'understanding', t: [3],
  });
})(), (q) => q.answer.value === 6 || 'chk-bal-num');
add('num-dichrom', (() => {
  const nFe = 0.03;
  const nCr = nFe / 6;
  const M = 2 * 39 + 2 * 52 + 7 * 16;
  const m = nCr * M;
  return num({
    stem: `A student in a quality-control laboratory must oxidise ${nFe.toFixed(4)} mol of Fe²⁺ in acidic solution with potassium dichromate (M = ${M} g mol⁻¹). Calculate the mass of K₂Cr₂O₇ required, in grams.`,
    value: Number(m.toFixed(2)), tol: 0.02, unit: 'g',
    sol: String.raw`$\ce{Cr2O7^2- + 14H+ + 6Fe^2+ -> 2Cr^3+ + 7H2O + 6Fe^3+}$: 1 mol dichromate oxidises 6 mol Fe²⁺. Moles dichromate $= ${nFe.toFixed(4)}/6 = ${nCr.toFixed(4)}$ mol. Mass $= ${nCr.toFixed(4)} \times ${M} = ${m.toFixed(2)}$ g.`,
    scheme: [['Mole ratio 1 : 6 from the balanced equation', 1], ['Moles 0.0050 and mass 0.0050 × 294 = 1.47 g', 1]],
    marks: 2, d: 3, c: 'application', t: [3],
  });
})(), (q) => near(0.03 / 6 * 294, 1.47, 1e-9) && q.answer.value === 1.47 || 'num-dichrom');
add('num-avgS', (() => {
  const x = solveON(0, [[2, +1], [6, -2]], 4);
  return num({
    stem: 'Sodium tetrathionate, Na₂S₄O₆, forms when thiosulphate is oxidised by iodine in a titration. Calculate the average oxidation number of sulphur in it.',
    value: x, tol: 0, unit: null,
    sol: String.raw`$2(+1) + 4x + 6(-2) = 0$, so $4x = 10$ and $x = +2.5$.`,
    scheme: [['2(+1) + 4x + 6(−2) = 0', 0.5], ['x = +2.5 (average)', 0.5]],
    marks: 1, d: 2, c: 'understanding', t: [2],
  });
})(), (q) => q.answer.value === 2.5 || 'num-avgS');
add('num-vol', (() => {
  const V = 40.0;
  const cF = 0.05;
  const cM = 0.02;
  const nF = (V / 1000) * cF;
  const nM = nF / 5;
  const v = (nM / cM) * 1000;
  return num({
    stem: `A technician titrates ${V.toFixed(1)} mL of an acidified 0.0500 M iron(II) sulphate solution with 0.0200 M potassium permanganate. Calculate the volume of the permanganate solution needed to reach the end point, in mL.`,
    value: Number(v.toFixed(1)), tol: 0.1, unit: 'mL',
    sol: String.raw`$\ce{MnO4- + 8H+ + 5Fe^2+ -> Mn^2+ + 4H2O + 5Fe^3+}$: 1 mol permanganate per 5 mol Fe²⁺. $n(\ce{Fe^2+}) = 0.0400 \times 0.0500 = ${nF.toFixed(4)}$ mol; $n(\ce{MnO4-}) = ${nF.toFixed(4)}/5 = ${nM.toFixed(4)}$ mol; $V = ${nM.toFixed(4)}/0.0200 = ${(nM / cM).toFixed(3)}$ L $= ${v.toFixed(1)}$ mL.`,
    scheme: [['Ratio MnO₄⁻ : Fe²⁺ = 1 : 5', 0.5], ['n(Fe²⁺) = 2.00 × 10⁻³ mol and n(MnO₄⁻) = 4.00 × 10⁻⁴ mol', 0.5], ['V = 0.0200 L = 20.0 mL', 1]],
    marks: 2, d: 3, c: 'application', t: [3],
  });
})(), (q) => near(0.04 * 0.05 / 5 / 0.02 * 1000, 20.0, 1e-9) && q.answer.value === 20 || 'num-vol');
add('num-cl2', (() => {
  const m = 3.55;
  const n = m / 71;
  const ne = 2 * n;
  return num({
    stem: `A water-treatment plant uses ${m} g of chlorine (M = 71 g mol⁻¹), all of which is reduced to chloride ions. Calculate the amount of electrons gained, in mol.`,
    value: Number(ne.toFixed(2)), tol: 0.005, unit: 'mol',
    sol: String.raw`$\ce{Cl2 + 2e- -> 2Cl-}$. Moles of $\ce{Cl2} = ${m}/71 = ${n.toFixed(2)}$; electrons $= 2 \times ${n.toFixed(2)} = ${ne.toFixed(2)}$ mol.`,
    scheme: [['n(Cl₂) = 0.050 mol', 0.5], ['Electrons = 2 × 0.050 = 0.10 mol', 0.5]],
    marks: 1, d: 3, c: 'application', t: [1],
  });
})(), (q) => near(2 * 3.55 / 71, 0.1, 1e-9) && q.answer.value === 0.1 || 'num-cl2');
