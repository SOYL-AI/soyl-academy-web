// ISC 11 Chemistry ch16 Redox Reactions: written items (2-mark, 3-mark and 5-mark long items set in parts).
// Every balanced equation quoted in a model answer is asserted for atoms AND charge in data.mjs (bal) or by checkEq in the re-solve checks.
// Atomic masses used: H 1, C 12, N 14, O 16, Na 23, S 32, Cl 35.5, K 39, Mn 55. Skeletal equations appear only in stems that say "skeletal".
import { mk, add, near } from './lib.mjs';
import { ON, EQ, sg, solveON, checkEq } from './data.mjs';

const { short, long } = mk;
const ok = (...eqs) => () => eqs.every((e) => checkEq(e) === true) || `unbalanced: ${eqs.find((e) => checkEq(e) !== true)}`;

// ---------------------------------------------------------------- 2-mark
add('s2-define', short({
  marks: 2,
  stem: 'In a physics-laboratory demonstration, a piece of potassium burns in bromine vapour: 2K + Br₂ → 2KBr. In terms of electron transfer, write the two half-reactions and name the substance that is oxidised and the oxidising agent.',
  model: String.raw`Oxidation half: $\ce{K -> K+ + e-}$ (potassium loses an electron). Reduction half: $\ce{Br2 + 2e- -> 2Br-}$ (bromine gains electrons). Potassium is oxidised (it is the reducing agent); bromine is reduced, so bromine is the oxidising agent.`,
  sol: 'K → K⁺ + e⁻ (oxidised); Br₂ + 2e⁻ → 2Br⁻; Br₂ is the oxidising agent.',
  scheme: [['Both half-reactions with electrons on the correct sides', 1], ['Potassium oxidised; bromine is the oxidising agent', 1]],
  d: 2, c: 'understanding', t: [1],
}), ok('K -> K+ + e-', 'Br2 + 2e- -> 2Br-', EQ.KBr));
add('s2-oh', short({
  marks: 2,
  stem: 'A metallurgy student heats black copper(II) oxide in a stream of hydrogen and obtains red copper and steam: CuO + H₂ → Cu + H₂O. Using the oxygen and hydrogen definitions, state which substance is oxidised and which is reduced, and name both agents.',
  model: 'Copper(II) oxide loses oxygen, so it is reduced and is the oxidising agent. Hydrogen gains oxygen (it forms water), so it is oxidised and is the reducing agent.',
  sol: 'CuO loses oxygen: reduced, oxidising agent. H₂ gains oxygen: oxidised, reducing agent.',
  scheme: [['CuO reduced (loss of oxygen) and H₂ oxidised (gain of oxygen)', 1], ['CuO is the oxidising agent and H₂ the reducing agent', 1]],
  d: 2, c: 'understanding', t: [1],
}), ok(EQ.CuOH2));
add('s2-exc', short({
  marks: 2,
  stem: 'Oxygen has the oxidation number −2 in most of its compounds. State its oxidation number in (a) hydrogen peroxide and (b) oxygen difluoride, with the reason in each case.',
  model: String.raw`(a) In $\ce{H2O2}$ there is an O–O bond, and H is $+1$: $2(+1) + 2x = 0$, so $x = ${sg(ON.H2O2.O)}$ (peroxide). (b) In $\ce{OF2}$ fluorine is more electronegative than oxygen and is $-1$: $x + 2(-1) = 0$, so $x = ${sg(ON.OF2.O)}$.`,
  sol: 'H₂O₂: O is −1 (peroxide); OF₂: O is +2 (F is more electronegative).',
  scheme: [['(a) −1 with the sum equation or the O–O bond', 1], ['(b) +2 because fluorine is more electronegative (F = −1)', 1]],
  d: 2, c: 'understanding', t: [2],
}), () => ON.H2O2.O === -1 && ON.OF2.O === 2 || 's2-exc');
add('s2-on-fe', short({
  marks: 2,
  stem: 'Magnetite, Fe₃O₄, is the black magnetic ore of iron. Calculate the average oxidation number of iron in it, and show that the value fits a mixture of Fe²⁺ and Fe³⁺ ions in the ratio 1 : 2.',
  model: String.raw`$3x + 4(-2) = 0$, so $x = \dfrac{8}{3} = ${sg(ON.Fe3O4.Fe)}$ (average). A mixture of one $\ce{Fe^2+}$ and two $\ce{Fe^3+}$ gives $(2 + 3 + 3)/3 = 8/3$, the same average.`,
  sol: 'Average ON of Fe = +8/3 = +2.67, equal to (2 + 3 + 3)/3.',
  scheme: [['3x + 4(−2) = 0 gives x = +8/3', 1], ['(1 × 2 + 2 × 3)/3 = 8/3 for Fe²⁺ : Fe³⁺ = 1 : 2', 1]],
  d: 3, c: 'application', t: [2],
}), () => near(ON.Fe3O4.Fe, 8 / 3, 1e-9) || 's2-on-fe');
add('s2-redox-fe', short({
  marks: 2,
  stem: 'A student adds tin(II) chloride solution to a yellow solution of iron(III) chloride until the colour fades: 2FeCl₃ + SnCl₂ → 2FeCl₂ + SnCl₄. Using oxidation numbers, show that this is a redox reaction and name the reducing agent.',
  model: String.raw`Fe falls from $+3$ to $+2$ (reduced); Sn rises from $+2$ to $+4$ (oxidised); Cl stays $-1$. Because oxidation numbers change, it is a redox reaction, and tin(II) chloride (Sn²⁺), which is oxidised, is the reducing agent.`,
  sol: 'Fe +3 → +2, Sn +2 → +4: redox; SnCl₂ is the reducing agent.',
  scheme: [['Fe +3 → +2 and Sn +2 → +4, so redox', 1], ['SnCl₂ (Sn²⁺) is the reducing agent', 1]],
  d: 2, c: 'application', t: [1, 2],
}), ok(EQ.FeSn));
add('s2-neut', short({
  marks: 2,
  stem: 'A chemistry teacher neutralises dilute nitric acid with potassium hydroxide: HNO₃ + KOH → KNO₃ + H₂O. Write the oxidation number of every element on the two sides and say whether the reaction is a redox reaction.',
  model: String.raw`H $+1$ on both sides, N $+5$ on both sides, O $-2$ on both sides and K $+1$ on both sides. No oxidation number changes, so it is not a redox reaction.`,
  sol: 'H +1, N +5, O −2, K +1 on both sides: not redox.',
  scheme: [['Oxidation numbers H +1, N +5, O −2, K +1 on both sides', 1], ['No change, so not a redox reaction', 1]],
  d: 1, c: 'understanding', t: [2],
}), () => checkEq(EQ.Neut) === true && ON.HNO3.N === 5 || 's2-neut');
add('s2-cond', short({
  marks: 2,
  stem: 'State the two conditions that a correctly balanced ionic redox equation must satisfy. Why do free electrons not appear in the final equation?',
  model: 'The atoms of every element must be equal on both sides, and the total charge must be equal on both sides (the electrons lost by the reducing agent equal those gained by the oxidising agent, so the total rise in oxidation number equals the total fall). Electrons are cancelled when the two half-reactions are added, because those lost in the oxidation half are exactly those gained in the reduction half.',
  sol: 'Atoms and charge balance; the electrons cancel between the two halves.',
  scheme: [['Atoms and total charge equal on both sides', 1], ['Electrons lost equal electrons gained, so they cancel on adding the halves', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('s2-types', short({
  marks: 2,
  stem: 'Classify each reaction as combination, decomposition, displacement or disproportionation, with the oxidation number evidence: (a) PCl₃ + Cl₂ → PCl₅; (b) 2NaNO₃ → 2NaNO₂ + O₂ on strong heating.',
  model: String.raw`(a) Combination: two substances give one; P rises from $+3$ to $+5$ and Cl falls from 0 to $-1$. (b) Decomposition: one compound gives two substances; N falls from $+5$ to $+3$ and O rises from $-2$ to 0, so it is also a redox reaction.`,
  sol: '(a) combination (P +3 → +5, Cl 0 → −1); (b) decomposition (N +5 → +3, O −2 → 0).',
  scheme: [['(a) Combination with P +3 → +5 and Cl 0 → −1', 1], ['(b) Decomposition with N +5 → +3 and O −2 → 0', 1]],
  d: 3, c: 'application', t: [4],
}), ok(EQ.PCl, EQ.NaNO3));
add('s2-basic', short({
  marks: 2,
  stem: 'Balance the half-reaction MnO₄⁻ → MnO₂ (basic medium) by the ion-electron method, and state the number of electrons gained by one MnO₄⁻ ion. This is a skeletal half-reaction.',
  model: String.raw`Mn falls from $+7$ to $+4$. Balance O with water: $\ce{MnO4- -> MnO2 + 2H2O}$; balance H with $\ce{H+}$ and then turn them into water with $\ce{OH-}$ (basic medium). Balance the charge with electrons: $\ce{MnO4- + 2H2O + 3e- -> MnO2 + 4OH-}$. Three electrons are gained.`,
  sol: 'MnO₄⁻ + 2H₂O + 3e⁻ → MnO₂ + 4OH⁻: three electrons.',
  scheme: [['Balances O and H with H₂O and OH⁻ (basic medium)', 1], ['Balances charge: 3e⁻ on the left of MnO₄⁻ + 2H₂O → MnO₂ + 4OH⁻', 1]],
  d: 3, c: 'application', t: [3],
}), ok(EQ.hMnB2));

// ---------------------------------------------------------------- 3-mark
add('s3-agents', short({
  marks: 3,
  stem: 'For each reaction, identify the substance oxidised, the substance reduced and the reducing agent, quoting the oxidation numbers: (a) 2Mg + CO₂ → 2MgO + C; (b) Cu + 2Ag⁺ → Cu²⁺ + 2Ag; (c) Cu + 2H₂SO₄ → CuSO₄ + SO₂ + 2H₂O (hot, concentrated acid).',
  model: String.raw`(a) Mg rises $0 \to +2$ (oxidised, the reducing agent); C falls $+4 \to 0$ (CO₂ is reduced). (b) Cu rises $0 \to +2$ (oxidised, the reducing agent); Ag⁺ falls $+1 \to 0$ (reduced). (c) Cu rises $0 \to +2$ (oxidised, the reducing agent); S falls from $+6$ in H₂SO₄ to $+4$ in SO₂ (the acid is reduced).`,
  sol: 'Mg, Cu and Cu are oxidised (reducing agents); CO₂, Ag⁺ and H₂SO₄ are reduced.',
  scheme: [['(a) Mg 0 → +2 oxidised, C +4 → 0 reduced', 1], ['(b) Cu 0 → +2 oxidised, Ag⁺ +1 → 0 reduced', 1], ['(c) Cu 0 → +2 oxidised, S +6 → +4 reduced', 1]],
  d: 3, c: 'application', t: [1, 2],
}), ok(EQ.MgCO2b, EQ.Cu2, EQ.CuS2));
add('s3-on-n', (() => {
  const a = solveON(+1, [[4, +1]]);
  const b = solveON(0, [[1, +1], [2, -2]]);
  const c = solveON(0, [[1, +1], [3, -2]]);
  return short({
    marks: 3,
    stem: 'A fertiliser chemist compares three nitrogen compounds. Calculate the oxidation number of nitrogen in (a) the ammonium ion, NH₄⁺, (b) sodium nitrite, NaNO₂, and (c) nitric acid, HNO₃.',
    model: String.raw`(a) $x + 4(+1) = +1$, so $x = ${sg(a)}$. (b) $(+1) + x + 2(-2) = 0$, so $x = ${sg(b)}$. (c) $(+1) + x + 3(-2) = 0$, so $x = ${sg(c)}$.`,
    sol: `N is ${sg(a)} in NH₄⁺, ${sg(b)} in NaNO₂ and ${sg(c)} in HNO₃.`,
    scheme: [['(a) x + 4 = +1 gives −3', 1], ['(b) +1 + x − 4 = 0 gives +3', 1], ['(c) +1 + x − 6 = 0 gives +5', 1]],
    d: 2, c: 'understanding', t: [2],
  });
})(), () => ON.NH4.N === -3 && ON.NaNO2.N === 3 && ON.HNO3.N === 5 || 's3-on-n');
add('s3-tetra', short({
  marks: 3,
  stem: 'Sodium tetrathionate, Na₂S₄O₆, is formed when thiosulphate is oxidised by iodine. Calculate the average oxidation number of sulphur in the S₄O₆²⁻ ion and explain why it is not a whole number. In the ion the two middle sulphur atoms carry no oxygen and the two end sulphur atoms each carry three oxygen atoms; state the oxidation number of each kind of sulphur atom.',
  model: String.raw`$4x + 6(-2) = -2$, so $x = ${sg(ON.Na2S4O6.S)}$ (average). The sulphur atoms are not all alike, so the oxidation number is an average. Each end SO₃ group is a unit of charge $-1$: $x + 3(-2) = -1$, so each end S is $+5$; the two middle S atoms (bonded only to sulphur) are 0. Check: $(5 + 5 + 0 + 0)/4 = 2.5$.`,
  sol: 'Average +2.5; end S atoms +5, middle S atoms 0.',
  scheme: [['4x + 6(−2) = −2 gives +2.5', 1], ['A fraction is an average over atoms in different environments', 1], ['End S = +5 and middle S = 0, with the check (5 + 5 + 0 + 0)/4', 1]],
  d: 3, c: 'analysis', t: [2],
}), () => near(solveON(-2, [[6, -2]], 4), 2.5, 1e-9) && near((5 + 5 + 0 + 0) / 4, 2.5, 1e-9) || 's3-tetra');
add('s3-zn', short({
  marks: 3,
  stem: 'Zinc reduces very dilute nitric acid to the ammonium ion. Balance the skeletal equation Zn + NO₃⁻ → Zn²⁺ + NH₄⁺ (acidic medium) by the oxidation number method.',
  model: String.raw`Zn rises from 0 to $+2$ (rise 2); N falls from $+5$ to $-3$ (fall 8). Total rise = total fall needs 4 Zn per N: $\ce{4Zn + NO3- -> 4Zn^2+ + NH4+}$. Charge: left $-1$, right $+9$, so add $10\ \ce{H+}$ on the left. O: 3 on the left, so $3\ \ce{H2O}$ on the right, and H is then 10 on each side: $\ce{4Zn + NO3- + 10H+ -> 4Zn^2+ + NH4+ + 3H2O}$.`,
  sol: '4Zn + NO₃⁻ + 10H⁺ → 4Zn²⁺ + NH₄⁺ + 3H₂O.',
  scheme: [['Zn rise 2, N fall 8, so 4 Zn per N', 1], ['Charge balanced with 10 H⁺ on the left', 1], ['3 H₂O on the right and the check of atoms and charge', 1]],
  d: 3, c: 'application', t: [3],
}), ok(EQ.ZnNH4));
add('s3-cri', short({
  marks: 3,
  stem: 'A chemist titrates iodide ions with acidified dichromate. Balance the skeletal equation Cr₂O₇²⁻ + I⁻ → Cr³⁺ + I₂ (acidic medium) by the ion-electron method.',
  model: String.raw`Reduction: $\ce{Cr2O7^2- + 14H+ + 6e- -> 2Cr^3+ + 7H2O}$. Oxidation: $\ce{2I- -> I2 + 2e-}$. Multiply the oxidation half by 3 to equalise the 6 electrons and add: $\ce{Cr2O7^2- + 14H+ + 6I- -> 2Cr^3+ + 7H2O + 3I2}$. Charge: $-2 + 14 - 6 = +6$ and $2(+3) = +6$.`,
  sol: 'Cr₂O₇²⁻ + 14H⁺ + 6I⁻ → 2Cr³⁺ + 7H₂O + 3I₂.',
  scheme: [['Reduction half Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O', 1], ['Oxidation half 2I⁻ → I₂ + 2e⁻ multiplied by 3', 1], ['Final equation with the charge check +6 on each side', 1]],
  d: 3, c: 'application', t: [3],
}), ok(EQ.hCr, EQ.hI, EQ.CrI));
add('s3-oxal', short({
  marks: 3,
  stem: 'Permanganate oxidises oxalate ions in basic medium, giving manganese dioxide and carbonate ions. Balance the skeletal equation MnO₄⁻ + C₂O₄²⁻ → MnO₂ + CO₃²⁻ (basic medium) by the ion-electron method.',
  model: String.raw`Reduction: $\ce{MnO4- + 2H2O + 3e- -> MnO2 + 4OH-}$. Oxidation: $\ce{C2O4^2- + 4OH- -> 2CO3^2- + 2H2O + 2e-}$. Multiply the reduction half by 2 and the oxidation half by 3 (6 electrons) and add; cancel 4 H₂O and 8 OH⁻ that appear on both sides: $\ce{3C2O4^2- + 2MnO4- + 4OH- -> 6CO3^2- + 2MnO2 + 2H2O}$. Charge: $-6 - 2 - 4 = -12$ on the left and $-12$ on the right.`,
  sol: '3C₂O₄²⁻ + 2MnO₄⁻ + 4OH⁻ → 6CO₃²⁻ + 2MnO₂ + 2H₂O.',
  scheme: [['Reduction half MnO₄⁻ + 2H₂O + 3e⁻ → MnO₂ + 4OH⁻', 1], ['Oxidation half C₂O₄²⁻ + 4OH⁻ → 2CO₃²⁻ + 2H₂O + 2e⁻', 1], ['Multipliers 2 and 3, cancellation and the final equation with charge −12', 1]],
  d: 4, c: 'application', t: [3],
}), ok(EQ.hMnB2, EQ.hOxal, EQ.OxalMn));
add('s3-types', short({
  marks: 3,
  stem: 'Identify the type of each reaction, with the change in oxidation number as evidence: (a) 2Al + Fe₂O₃ → Al₂O₃ + 2Fe; (b) 2H₂O₂ → 2H₂O + O₂; (c) CaCO₃ → CaO + CO₂ (say whether it is a redox reaction at all).',
  model: String.raw`(a) Displacement: Al rises $0 \to +3$ and Fe falls $+3 \to 0$ (aluminium displaces iron). (b) Decomposition that is also disproportionation: oxygen at $-1$ falls to $-2$ in H₂O and rises to 0 in O₂. (c) Decomposition that is not redox: Ca $+2$, C $+4$ and O $-2$ are unchanged.`,
  sol: '(a) displacement; (b) disproportionation (O −1 → −2 and 0); (c) decomposition, not redox.',
  scheme: [['(a) Displacement: Al 0 → +3, Fe +3 → 0', 1], ['(b) Disproportionation: O −1 → −2 and 0', 1], ['(c) Not redox: no oxidation number changes', 1]],
  d: 3, c: 'analysis', t: [4],
}), ok(EQ.Thermite, EQ.H2O2disp, EQ.CaCO3));
add('s3-error', short({
  marks: 3,
  stem: 'A student balances the skeletal equation MnO₄⁻ + Fe²⁺ → Mn²⁺ + Fe³⁺ in acid as MnO₄⁻ + Fe²⁺ + 8H⁺ → Mn²⁺ + Fe³⁺ + 4H₂O, and finds that Mn, Fe, O and H all balance. Show by counting charge that the equation is wrong, and give the correct equation with the reason.',
  model: String.raw`Charge on the left: $-1 + 2 + 8 = +9$; on the right: $+2 + 3 = +5$. The charges differ, so the equation is wrong. Mn falls by 5 while each Fe rises by 1, so 5 Fe²⁺ are needed per MnO₄⁻ to make total rise equal total fall: $\ce{MnO4- + 8H+ + 5Fe^2+ -> Mn^2+ + 4H2O + 5Fe^3+}$ (charge $+17$ on each side).`,
  sol: 'Charge +9 on the left but +5 on the right; correct: MnO₄⁻ + 8H⁺ + 5Fe²⁺ → Mn²⁺ + 4H₂O + 5Fe³⁺.',
  scheme: [['Charge +9 on the left against +5 on the right', 1], ['Mn falls by 5, Fe rises by 1, so 5 Fe²⁺ are needed', 1], ['Correct equation with charge +17 on each side', 1]],
  d: 3, c: 'analysis', t: [3],
}), () => checkEq('MnO4- + Fe^2+ + 8H+ -> Mn^2+ + Fe^3+ + 4H2O') !== true && checkEq(EQ.MnFe) === true || 's3-error');
add('s3-h2o2', short({
  marks: 3,
  stem: 'Hydrogen peroxide acts as an oxidising agent towards iron(II) ions in acid, but as a reducing agent towards chlorine. Using oxidation numbers, explain why it can do both, and write one equation for each action.',
  model: String.raw`Oxygen in H₂O₂ is $-1$, which lies between $-2$ (in water or oxides) and 0 (in O₂), so it can fall or rise. As an oxidising agent oxygen falls to $-2$: $\ce{2Fe^2+ + H2O2 + 2H+ -> 2Fe^3+ + 2H2O}$. As a reducing agent oxygen rises to 0: $\ce{H2O2 + Cl2 -> 2HCl + O2}$.`,
  sol: 'O is −1 (intermediate); 2Fe²⁺ + H₂O₂ + 2H⁺ → 2Fe³⁺ + 2H₂O; H₂O₂ + Cl₂ → 2HCl + O₂.',
  scheme: [['O at −1 lies between −2 and 0, so it can be reduced or oxidised', 1], ['Oxidising action with a balanced equation (O −1 → −2)', 1], ['Reducing action with a balanced equation (O −1 → 0)', 1]],
  d: 3, c: 'analysis', t: [1, 2],
}), ok(EQ.FeH2O2, EQ.H2O2Cl2));
add('s3-titr', (() => {
  const M = 2 * 23 + 32 + 3 * 16;
  const m = 1.26;
  const n = m / M;
  const nMn = (2 / 5) * n;
  const v = (nMn / 0.02) * 1000;
  return short({
    marks: 3,
    stem: `A pharmacy laboratory oxidises ${m.toFixed(2)} g of sodium sulphite, Na₂SO₃ (M = ${M} g mol⁻¹), in acid with 0.0200 M potassium permanganate; permanganate is reduced to Mn²⁺ and sulphite becomes sulphate. (a) From the changes in oxidation number, show that 2 mol of MnO₄⁻ oxidise 5 mol of SO₃²⁻. (b) Calculate the volume of the permanganate solution needed, in mL.`,
    model: String.raw`(a) Mn falls from $+7$ to $+2$ (fall 5); S rises from $+4$ to $+6$ (rise 2). Total rise = total fall: $2 \times 5 = 5 \times 2$, so 2 MnO₄⁻ react with 5 SO₃²⁻. (b) $n(\ce{SO3^2-}) = ${m.toFixed(2)}/${M} = ${n.toFixed(4)}$ mol; $n(\ce{MnO4-}) = \tfrac25 \times ${n.toFixed(4)} = ${nMn.toFixed(4)}$ mol; $V = ${nMn.toFixed(4)}/0.0200 = ${(nMn / 0.02).toFixed(3)}$ L $= ${v.toFixed(0)}$ mL.`,
    sol: `${v.toFixed(0)} mL of permanganate.`,
    scheme: [['(a) Mn falls by 5, S rises by 2, so the ratio is 2 : 5', 1], ['(b) n(SO₃²⁻) = 0.0100 mol and n(MnO₄⁻) = 0.00400 mol', 1], ['V = 0.00400/0.0200 = 0.200 L = 200 mL', 1]],
    d: 3, c: 'application', t: [3],
  });
})(), () => near((2 / 5) * (1.26 / 126) / 0.02 * 1000, 200, 1e-9) && checkEq('5SO3^2- + 2MnO4- + 6H+ -> 5SO4^2- + 2Mn^2+ + 3H2O') === true || 's3-titr');

// ---------------------------------------------------------------- long (5 marks, set in parts)
add('long-onbasic', long({
  stem: `Chromium(III) hydroxide is oxidised by chlorate ions in basic solution to chromate ions, and the chlorate ion is reduced to chloride ions. The skeletal equation is Cr(OH)₃ + ClO₃⁻ → CrO₄²⁻ + Cl⁻ (basic medium).

(a) Find the oxidation numbers of Cr and Cl on each side, the change per atom, and the ratio in which Cr(OH)₃ and ClO₃⁻ react. [2]

(b) Balance the equation by the oxidation number method, adding OH⁻ and H₂O where needed, and show that atoms and charge balance. [3]`,
  model: String.raw`(a) Cr in Cr(OH)₃: $x + 3(-1) = 0$, so $+3$; in CrO₄²⁻: $+6$ (rise 3 per Cr). Cl in ClO₃⁻: $+5$; in Cl⁻: $-1$ (fall 6 per Cl). Total rise = total fall needs 2 Cr for each Cl, so $\ce{Cr(OH)3}$ : $\ce{ClO3-}$ $= 2 : 1$.

(b) $\ce{2Cr(OH)3 + ClO3- -> 2CrO4^2- + Cl-}$. Charge: left $-1$, right $-4 - 1 = -5$, so add $4\ \ce{OH-}$ on the left. H: left $6 + 4 = 10$, so $5\ \ce{H2O}$ on the right. $\ce{2Cr(OH)3 + ClO3- + 4OH- -> 2CrO4^2- + Cl- + 5H2O}$. Check: Cr 2, Cl 1, O $6 + 3 + 4 = 13 = 8 + 5$, H $6 + 4 = 10 = 10$; charge $-5$ on each side.`,
  sol: '2Cr(OH)₃ + ClO₃⁻ + 4OH⁻ → 2CrO₄²⁻ + Cl⁻ + 5H₂O.',
  scheme: [['(a) Cr +3 → +6 (rise 3) and Cl +5 → −1 (fall 6)', 1], ['(a) Ratio Cr(OH)₃ : ClO₃⁻ = 2 : 1', 1], ['(b) Balances charge with 4 OH⁻ on the left', 1], ['(b) Balances H and O with 5 H₂O on the right', 1], ['(b) Final equation with the check of atoms and charge (−5 on each side)', 1]],
  d: 3, c: 'application', t: [3],
}), () => checkEq(EQ.CrOH3) === true && solveON(0, [[3, -1]]) === 3 && solveON(-2, [[4, -2]]) === 6 && solveON(-1, [[3, -2]]) === 5 || 'long-onbasic');
add('long-ie-acid', long({
  stem: `Acidified permanganate oxidises oxalate ions to carbon dioxide. The skeletal equation is MnO₄⁻ + C₂O₄²⁻ → Mn²⁺ + CO₂ (acidic medium).

(a) Write the balanced oxidation half-reaction and the balanced reduction half-reaction. [2]

(b) Equalise the electrons and write the balanced ionic equation. [2]

(c) Show that the charge is balanced in your equation. [1]`,
  model: String.raw`(a) Oxidation: $\ce{C2O4^2- -> 2CO2 + 2e-}$. Reduction: $\ce{MnO4- + 8H+ + 5e- -> Mn^2+ + 4H2O}$.

(b) Multiply the oxidation half by 5 and the reduction half by 2 (10 electrons each) and add: $\ce{5C2O4^2- + 2MnO4- + 16H+ -> 10CO2 + 2Mn^2+ + 8H2O}$.

(c) Charge on the left: $5(-2) + 2(-1) + 16 = +4$. Charge on the right: $2(+2) = +4$ (CO₂ and H₂O are neutral). Atoms also balance: C 10, O 28, Mn 2, H 16.`,
  sol: '5C₂O₄²⁻ + 2MnO₄⁻ + 16H⁺ → 10CO₂ + 2Mn²⁺ + 8H₂O.',
  scheme: [['(a) Oxidation half C₂O₄²⁻ → 2CO₂ + 2e⁻', 1], ['(a) Reduction half MnO₄⁻ + 8H⁺ + 5e⁻ → Mn²⁺ + 4H₂O', 1], ['(b) Multipliers 5 and 2 so that 10 electrons cancel', 1], ['(b) Final balanced equation', 1], ['(c) Charge +4 on each side', 1]],
  d: 3, c: 'application', t: [3],
}), ok(EQ.hOxA, EQ.hMn, EQ.OxalAcid));
add('long-h2o2', (() => {
  const vMn = 16.0;
  const cMn = 0.02;
  const vH = 20.0;
  const nMn = (vMn / 1000) * cMn;
  const nH = (5 / 2) * nMn;
  const cH = nH / (vH / 1000);
  const gL = cH * 34;
  return long({
    stem: `A pharmacist checks a bottle of hydrogen peroxide by titration. A ${vH.toFixed(1)} mL sample is acidified and needs ${vMn.toFixed(1)} mL of 0.0200 M potassium permanganate to reach the end point. The balanced equation is 2MnO₄⁻ + 5H₂O₂ + 6H⁺ → 2Mn²⁺ + 5O₂ + 8H₂O.

(a) State the change in oxidation number of manganese and of oxygen, and name the oxidising agent and the reducing agent. [2]

(b) Calculate the molarity of the hydrogen peroxide solution. [2]

(c) Calculate its concentration in g L⁻¹ (M = 34 g mol⁻¹). [1]`,
    model: String.raw`(a) Mn falls from $+7$ to $+2$; O in H₂O₂ rises from $-1$ to 0. Permanganate is the oxidising agent (it is reduced) and hydrogen peroxide is the reducing agent (it is oxidised).

(b) $n(\ce{MnO4-}) = 0.0160 \times 0.0200 = ${nMn.toExponential(2).replace('e-4', '\\times10^{-4}')}$ mol. From the equation $n(\ce{H2O2}) = \tfrac52 \times ${nMn.toExponential(2).replace('e-4', '\\times10^{-4}')} = ${nH.toExponential(2).replace('e-4', '\\times10^{-4}')}$ mol in 0.0200 L, so $c = ${nH.toExponential(2).replace('e-4', '\\times10^{-4}')}/0.0200 = ${cH.toFixed(4)}$ mol L⁻¹.

(c) Mass concentration $= ${cH.toFixed(4)} \times 34 = ${gL.toFixed(2)}$ g L⁻¹.`,
    sol: `c = ${cH.toFixed(4)} mol per litre, ${gL.toFixed(2)} g per litre.`,
    scheme: [['(a) Mn +7 → +2 and O −1 → 0', 1], ['(a) Permanganate is the oxidising agent and H₂O₂ the reducing agent', 1], ['(b) n(MnO₄⁻) = 3.20 × 10⁻⁴ mol and n(H₂O₂) = 8.00 × 10⁻⁴ mol', 1], ['(b) c = 8.00 × 10⁻⁴/0.0200 = 0.0400 mol L⁻¹', 1], ['(c) 0.0400 × 34 = 1.36 g L⁻¹', 1]],
    d: 3, c: 'application', t: [1, 3],
  });
})(), () => checkEq(EQ.MnH2O2) === true && near((5 / 2) * 0.016 * 0.02 / 0.02, 0.04, 1e-9) && near(0.04 * 34, 1.36, 1e-9) || 'long-h2o2');
add('long-disp', long({
  stem: `Nitrous acid is unstable in solution and changes to nitric acid and nitrogen monoxide: 3HNO₂ → HNO₃ + 2NO + H₂O.

(a) Define disproportionation. [1]

(b) Using oxidation numbers, show that this reaction is a disproportionation and that the electrons lost equal the electrons gained. [2]

(c) Explain why nitrous acid can disproportionate but nitric acid cannot. [2]`,
  model: String.raw`(a) A redox reaction in which the same element in one substance is both oxidised and reduced.

(b) N in HNO₂ is $+3$. In HNO₃ it is $+5$ (rise 2, one N atom lost 2 electrons). In NO it is $+2$ (fall 1 per N, two N atoms gain 2 electrons). The same element rises and falls, and $2 = 2$ electrons lost and gained.

(c) N in HNO₂ is at $+3$, an intermediate value between its highest $+5$ and lower values, so it can rise to $+5$ and fall to $+2$. In HNO₃ nitrogen is already at its highest oxidation number $+5$, so it can only fall (be reduced) and cannot also rise.`,
  sol: 'Same element oxidised and reduced; N +3 → +5 and +2; HNO₃ has N at its maximum +5.',
  scheme: [['(a) Same element simultaneously oxidised and reduced', 1], ['(b) N +3 → +5 (rise 2) and N +3 → +2 (fall 1 for each of two N)', 1], ['(b) Electrons lost 2 = electrons gained 2', 1], ['(c) HNO₂: N at intermediate +3 can rise and fall', 1], ['(c) HNO₃: N at the highest +5 can only fall', 1]],
  d: 3, c: 'analysis', t: [4],
}), () => checkEq(EQ.HNO2) === true && ON.HNO3.N === 5 && solveON(0, [[1, +1], [2, -2]]) === 3 || 'long-disp');
add('long-class', long({
  stem: `A student studies three reactions: (i) CaO + H₂O → Ca(OH)₂; (ii) 2Mg + O₂ → 2MgO; (iii) 2Na₂S₂O₃ + I₂ → Na₂S₄O₆ + 2NaI.

(a) State, with oxidation numbers, which of the three are redox reactions. [3]

(b) For reaction (iii), name the oxidising agent and the reducing agent and give the oxidation number of sulphur on each side. [2]`,
  model: String.raw`(a) (i) Ca $+2$, O $-2$ and H $+1$ on both sides: no change, so not redox. (ii) Mg rises $0 \to +2$ and O falls $0 \to -2$: redox. (iii) S rises from $+2$ to $+2.5$ (average) and I falls from 0 to $-1$: redox.

(b) Iodine is reduced, so I₂ is the oxidising agent; thiosulphate is oxidised, so S₂O₃²⁻ is the reducing agent. S is $+2$ in thiosulphate and an average of $+2.5$ in tetrathionate.`,
  sol: '(ii) and (iii) are redox; I₂ oxidising agent, S₂O₃²⁻ reducing agent; S +2 → +2.5.',
  scheme: [['(i) No oxidation number changes: not redox', 1], ['(ii) Mg 0 → +2 and O 0 → −2: redox', 1], ['(iii) S +2 → +2.5 and I 0 → −1: redox', 1], ['(b) I₂ oxidising agent; S₂O₃²⁻ reducing agent', 1], ['(b) S +2 on the left and +2.5 (average) on the right', 1]],
  d: 3, c: 'analysis', t: [1, 2],
}), () => checkEq(EQ.CaOH2) === true && checkEq(EQ.Thermite) === true && checkEq(EQ.Thio) === true && ON.S2O3.S === 2 && ON.Na2S4O6.S === 2.5 || 'long-class');
add('long-ie-basic', long({
  stem: `In basic solution aluminium reduces nitrate ions to ammonia, and the aluminium forms aluminate ions, AlO₂⁻. The skeletal equation is Al + NO₃⁻ → AlO₂⁻ + NH₃ (basic medium).

(a) Balance the oxidation half-reaction and the reduction half-reaction in basic medium. [3]

(b) Combine the two halves and give the final balanced equation, cancelling the species common to both sides. [2]`,
  model: String.raw`(a) Oxidation: $\ce{Al + 4OH- -> AlO2- + 2H2O + 3e-}$ (Al $0 \to +3$). Reduction: $\ce{NO3- + 6H2O + 8e- -> NH3 + 9OH-}$ (N $+5 \to -3$).

(b) Multiply the oxidation half by 8 and the reduction half by 3 (24 electrons each) and add: $\ce{8Al + 32OH- + 3NO3- + 18H2O -> 8AlO2- + 16H2O + 3NH3 + 27OH-}$. Cancel 16 H₂O and 27 OH⁻: $\ce{8Al + 5OH- + 3NO3- + 2H2O -> 8AlO2- + 3NH3}$. Charge: $-5 - 3 = -8$ on the left and $8(-1) = -8$ on the right.`,
  sol: '8Al + 5OH⁻ + 3NO₃⁻ + 2H₂O → 8AlO₂⁻ + 3NH₃.',
  scheme: [['(a) Oxidation half Al + 4OH⁻ → AlO₂⁻ + 2H₂O + 3e⁻', 1.5], ['(a) Reduction half NO₃⁻ + 6H₂O + 8e⁻ → NH₃ + 9OH⁻', 1.5], ['(b) Multipliers 8 and 3 so that 24 electrons cancel', 1], ['(b) Cancellation giving 8Al + 5OH⁻ + 3NO₃⁻ + 2H₂O → 8AlO₂⁻ + 3NH₃ with charge −8', 1]],
  d: 4, c: 'application', t: [3],
}), ok(EQ.hAl, EQ.hNO3b, EQ.AlNO3));
