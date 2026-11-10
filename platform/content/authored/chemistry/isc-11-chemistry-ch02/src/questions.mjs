// ISC 11 ch02 Mole Concept, Concentration and Stoichiometry — question bank (numerical-heavy).
// MCQ keys are placed by the builder (balanced); AR keys: a c d a b c (ar-mole, ar-amu, ar-eq, ar-kmno4, ar-norm, ar-limit).
// Every numerical is computed here, interpolated into stem and solution, and re-solved by the check passed to add().
import { mk, add, r, near, dec, sci } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const NA = 6.022e23;
const VM = 22.4; // L per mole at STP (stated in stems)

// ================================================================ t01 atomic and molecular masses, mole, molar volume
add('mole-chk', (() => {
  const m = 4.9;
  const Mm = 98;
  const n = m / Mm;
  const O = n * 4 * NA;
  return mcq({
    stem: `A pharmacist weighs out ${m.toFixed(2)} g of sulfuric acid, H₂SO₄ (molar mass ${Mm} g mol⁻¹), for a laboratory reagent. The number of oxygen atoms in this sample is closest to:`,
    right: r`$1.20 \times 10^{23}$`,
    wrong: [r`$3.01 \times 10^{22}$`, r`$1.20 \times 10^{24}$`, r`$6.02 \times 10^{23}$`],
    sol: r`$n = ${m} / ${Mm} = ${n.toFixed(2)}$ mol of molecules, and each molecule has 4 oxygen atoms, so the atoms are $${n.toFixed(2)} \times 4 \times 6.022 \times 10^{23} = ${sci(O, 3)}$ — option (@K). (@1) counts molecules only; (@2) is ten times too large.`,
    d: 2, c: 'application', t: [1],
  });
})(), () => near(0.05 * 4 * NA, 1.2044e23, 0.001) || 'atoms');
add('avgmass-mcq', (() => {
  const a = { m: 6.015, p: 0.075 };
  const b = { m: 7.016, p: 0.925 };
  const avg = a.m * a.p + b.m * b.p;
  return mcq({
    stem: 'Natural lithium is 7.5 % lithium-6 (isotopic mass 6.015 u) and 92.5 % lithium-7 (isotopic mass 7.016 u). Its average atomic mass is:',
    right: '6.94 u',
    wrong: ['6.52 u', '7.02 u', '6.02 u'],
    sol: r`Average mass $= 0.075 \times ${a.m} + 0.925 \times ${b.m} = ${avg.toFixed(3)} \approx 6.94$ u — option (@K). (@1) is the simple mean of 6.015 and 7.016, which ignores the abundances.`,
    d: 2, c: 'application', t: [1],
  });
})(), () => near(0.075 * 6.015 + 0.925 * 7.016, 6.94, 0.001) || 'average');
add('stp-mcq', (() => {
  const m = 6.4;
  const Mm = 64;
  const n = m / Mm;
  const V = n * VM;
  return mcq({
    stem: `A sample of sulfur dioxide gas (molar mass ${Mm} g mol⁻¹) collected from a furnace flue has a mass of ${m} g. Taking the molar volume as ${VM} L at STP, its volume at STP is:`,
    right: `${V.toFixed(2)} L`,
    wrong: [`${VM.toFixed(1)} L`, `${(V / 10).toFixed(3)} L`, `${(2 * V).toFixed(2)} L`],
    sol: r`$n = ${m} / ${Mm} = ${n.toFixed(1)}$ mol, so $V = ${n.toFixed(1)} \times ${VM} = ${V.toFixed(2)}$ L — option (@K). (@1) is the volume of one whole mole.`,
    d: 1, c: 'understanding', t: [1],
  });
})(), () => near((6.4 / 64) * 22.4, 2.24, 1e-6) || 'volume');
add('amu-mcq', mcq({
  stem: 'The atomic mass unit, u, is defined as:',
  right: 'one twelfth of the mass of a carbon-12 atom',
  wrong: ['the mass of one hydrogen atom', 'one twelfth of the average mass of a carbon atom of natural carbon', 'the mass of one proton plus one electron'],
  sol: 'By definition 1 u is exactly one twelfth of the mass of a carbon-12 atom (about 1.66 × 10⁻²⁷ kg) — option (@K). The mass of a hydrogen atom is close to, but not exactly, 1 u, and natural carbon contains some carbon-13.',
  d: 1, c: 'recall', t: [1],
}));
add('count-mcq', (() => {
  const items = [
    { t: '16 g of methane, CH₄', atoms: (16 / 16) * 5 },
    { t: '36 g of water, H₂O', atoms: (36 / 18) * 3 },
    { t: '22.4 L of neon at STP', atoms: 1 },
    { t: '11.2 L of ammonia, NH₃, at STP', atoms: 0.5 * 4 },
  ];
  return mcq({
    stem: 'Four samples are prepared in a school laboratory. Which sample contains the greatest number of atoms?',
    right: items[1].t,
    wrong: [items[0].t, items[2].t, items[3].t],
    sol: r`Atoms in units of $N_\text{A}$: methane $1 \times 5 = ${items[0].atoms}$; water $2 \times 3 = ${items[1].atoms}$; neon $1 \times 1 = ${items[2].atoms}$; ammonia $0.5 \times 4 = ${items[3].atoms}$. Water has the most — option (@K).`,
    d: 3, c: 'analysis', t: [1],
  });
})(), () => (36 / 18) * 3 > (16 / 16) * 5 || 'atoms');
add('ar-mole', ar({
  a: 'One mole of any gas occupies 22.4 L at STP, whether the gas is hydrogen or chlorine.',
  r: 'Equal volumes of gases at the same temperature and pressure contain equal numbers of molecules.',
  key: 'a',
  sol: 'A is true: the molar volume is the same for all (ideal) gases at STP. R is Avogadro’s law, which is exactly why one mole (a fixed number of molecules) occupies the same volume — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('ar-amu', ar({
  a: 'The relative atomic mass of chlorine is 35.5.',
  r: 'Every chlorine atom has a mass of 35.5 u.',
  key: 'c',
  sol: 'A is true: 35.5 is the weighted average of chlorine-35 and chlorine-37 over their natural abundances. R is false: individual atoms have masses of about 35 u or 37 u; no single atom weighs 35.5 u — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('stp-tf', tf({
  stem: 'One mole of hydrogen gas occupies only 11.2 L at STP, because hydrogen is the lightest of all gases.',
  key: 'f',
  sol: 'False. One mole of any ideal gas, including hydrogen, occupies 22.4 L at STP. The molar volume depends on temperature and pressure, not on the mass of the molecules.',
  d: 1, c: 'understanding', t: [1],
}));
add('na-fill', fill({
  stem: 'The number of atoms in exactly 12 g of carbon-12, 6.022 × 10²³, is known as the ___ number.',
  acc: [['Avogadro', 'Avogadro’s', 'Avogadro constant']],
  sol: 'The number of atoms in 12 g of carbon-12 is the **Avogadro** number (constant).',
  d: 1, c: 'recall', t: [1],
}));
add('dens-num', (() => {
  const rho = 1.96;
  const Mm = rho * VM;
  return num({
    stem: `A gas collected from fermenting waste has a density of ${rho} g L⁻¹ at STP. Taking the molar volume as ${VM} L, find its molar mass in g mol⁻¹, to three significant figures.`,
    value: Number(Mm.toPrecision(3)), tol: 0.1, unit: 'g mol⁻¹',
    sol: r`$M = \rho \times V_\text{m} = ${rho} \times ${VM} = ${Mm.toFixed(2)} \approx ${dec(Mm, 3)}$ g mol⁻¹ (the gas is carbon dioxide).`,
    scheme: [['Mass of 22.4 L = density × molar volume', 1], ['43.9 g mol⁻¹', 1]],
    marks: 2, d: 2, c: 'understanding', t: [1],
  });
})(), (q) => near(1.96 * 22.4, 43.9, 0.001) && q.answer.value === 43.9 || 'molar mass');
add('amu-short', short({
  marks: 2,
  stem: 'Define the atomic mass unit. Chlorine has an atomic mass of 35.5 u although no chlorine atom has this mass. Explain.',
  model: 'One atomic mass unit is one twelfth of the mass of a carbon-12 atom. Chlorine has two isotopes, chlorine-35 (about 75.8 %) and chlorine-37 (about 24.2 %). The value 35.5 u is the average of their masses weighted by natural abundance, so it is not the mass of any single atom.',
  sol: 'Definition of u; weighted average of isotopes.',
  scheme: [['u defined as 1/12 of the mass of a carbon-12 atom', 1], ['Weighted average of two isotopes explains 35.5', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('mole-short', (() => {
  const m = 3.6;
  const n = m / 18;
  const mol = n * NA;
  const H = 2 * mol;
  return short({
    marks: 2,
    stem: `A student pours ${m} g of water into a flask. Find the number of water molecules and the number of hydrogen atoms in the flask (molar mass of water 18 g mol⁻¹, $N_\\text{A} = 6.022 \\times 10^{23}\\ \\text{mol}^{-1}$).`,
    model: r`$n = ${m} / 18 = ${n.toFixed(1)}$ mol, so molecules $= ${n.toFixed(1)} \times 6.022 \times 10^{23} = ${sci(mol, 3)}$. Each molecule has two hydrogen atoms, so hydrogen atoms $= 2 \times ${sci(mol, 3)} = ${sci(H, 3)}$.`,
    sol: 'Moles, then molecules, then atoms.',
    scheme: [['0.2 mol and 1.20 × 10²³ molecules', 1], ['2.41 × 10²³ hydrogen atoms', 1]],
    d: 2, c: 'understanding', t: [1],
  });
})(), () => near(0.2 * NA, 1.2044e23, 0.001) || 'molecules');
add('mole3-short3', (() => {
  const V = 5.6;
  const n = V / VM;
  const m = n * 16;
  const H = n * 4 * NA;
  return short({
    marks: 3,
    stem: `A gas jar holds ${V} L of methane, CH₄, at STP (molar volume ${VM} L, molar mass 16 g mol⁻¹). Calculate (i) the amount of methane in moles, (ii) its mass and (iii) the number of hydrogen atoms present.`,
    model: r`(i) $n = ${V} / ${VM} = ${n.toFixed(2)}$ mol. (ii) $m = ${n.toFixed(2)} \times 16 = ${m.toFixed(1)}$ g. (iii) Each molecule has 4 hydrogen atoms: $${n.toFixed(2)} \times 4 \times 6.022 \times 10^{23} = ${sci(H, 3)}$ atoms.`,
    sol: 'Moles from volume; mass from moles; atoms from moles.',
    scheme: [['(i) 0.25 mol', 1], ['(ii) 4.0 g', 1], ['(iii) 6.02 × 10²³ hydrogen atoms', 1]],
    d: 2, c: 'application', t: [1],
  });
})(), () => near((5.6 / 22.4) * 4 * NA, 6.022e23, 0.001) || 'atoms');
add('mole-long', (() => {
  const m = 10.6;
  const Mm = 106;
  const n = m / Mm;
  const fu = n * NA;
  const na = 2 * fu;
  const oAt = 3 * fu;
  const tot = 6 * fu;
  return long({
    stem: `(a) Define the mole and state the value of the Avogadro constant. [2]\n\n(b) A sample of anhydrous sodium carbonate, Na₂CO₃ (molar mass ${Mm} g mol⁻¹), has a mass of ${m} g. Calculate (i) the amount in moles, (ii) the number of sodium ions, and (iii) the total number of atoms in the sample. [3]`,
    model: r`(a) The mole is the amount of substance that contains as many elementary entities as there are atoms in exactly 12 g of carbon-12; the Avogadro constant is $6.022 \times 10^{23}\ \text{mol}^{-1}$. (b) (i) $n = ${m} / ${Mm} = ${n.toFixed(3)}$ mol. (ii) Each formula unit gives 2 sodium ions: $2 \times ${n.toFixed(3)} \times 6.022 \times 10^{23} = ${sci(na, 3)}$. (iii) Each formula unit has $2 + 1 + 3 = 6$ atoms: $6 \times ${n.toFixed(3)} \times 6.022 \times 10^{23} = ${sci(tot, 3)}$.`,
    sol: 'Definition; moles; ions; atoms.',
    scheme: [['(a) Mole defined by carbon-12', 1], ['(a) 6.022 × 10²³ mol⁻¹', 1], ['(b)(i) 0.100 mol', 1], ['(b)(ii) 1.20 × 10²³ sodium ions', 1], ['(b)(iii) 3.61 × 10²³ atoms', 1]],
    d: 3, c: 'application', t: [1],
  });
})(), () => near(6 * 0.1 * NA, 3.613e23, 0.001) && near(2 * 0.1 * NA, 1.2044e23, 0.001) || 'counts');

// ================================================================ t02 percentage composition, empirical and molecular formulae
add('formula-chk', (() => {
  const w = { Na: 43.4, C: 11.3, O: 45.3 };
  const nNa = w.Na / 23;
  const nC = w.C / 12;
  const nO = w.O / 16;
  return mcq({
    stem: `An unlabelled white powder from a chemical store is analysed and found to contain ${w.Na} % sodium, ${w.C} % carbon and ${w.O} % oxygen by mass. Its empirical formula is:`,
    right: r`$\ce{Na2CO3}$`,
    wrong: [r`$\ce{NaCO3}$`, r`$\ce{Na2CO4}$`, r`$\ce{NaC2O3}$`],
    sol: r`In 100 g: Na $= ${w.Na}/23 = ${nNa.toFixed(2)}$ mol, C $= ${w.C}/12 = ${nC.toFixed(2)}$ mol, O $= ${w.O}/16 = ${nO.toFixed(2)}$ mol. Dividing by the smallest (${nC.toFixed(2)}) gives $${(nNa / nC).toFixed(2)} : 1 : ${(nO / nC).toFixed(2)} \approx 2 : 1 : 3$, so the formula is $\ce{Na2CO3}$ — option (@K).`,
    d: 3, c: 'application', t: [2],
  });
})(), () => near(43.4 / 23 / (11.3 / 12), 2, 0.01) && near(45.3 / 16 / (11.3 / 12), 3, 0.01) || 'ratio');
add('pctcomp-mcq', (() => {
  const Mm = 12 + 16 + 2 * (14 + 2);
  const p = ((2 * 14) / Mm) * 100;
  return mcq({
    stem: r`The fertiliser urea has the formula $\ce{CO(NH2)2}$. Its percentage of nitrogen by mass is:`,
    right: `${p.toFixed(1)} %`,
    wrong: [`${(p / 2).toFixed(1)} %`, `${((2 * 14) / (Mm + 2) * 100).toFixed(1)} %`, `${((12 / Mm) * 100).toFixed(1)} %`],
    sol: r`Molar mass $= 12 + 16 + 2(14 + 2) = ${Mm}$ g mol⁻¹. Two nitrogen atoms contribute 28 g, so $\%\ \text{N} = 28 / ${Mm} \times 100 = ${p.toFixed(1)}$ % — option (@K). (@1) counts one nitrogen atom only.`,
    d: 2, c: 'understanding', t: [2],
  });
})(), () => near((28 / 60) * 100, 46.67, 0.001) || 'percent');
add('molform-mcq', (() => {
  const emp = 12 + 2 + 16;
  const Mm = 90;
  const k = Mm / emp;
  return mcq({
    stem: `A compound found in sour milk has the empirical formula CH₂O and a molar mass of ${Mm} g mol⁻¹. Its molecular formula is:`,
    right: r`$\ce{C3H6O3}$`,
    wrong: [r`$\ce{CH2O}$`, r`$\ce{C2H4O2}$`, r`$\ce{C6H12O6}$`],
    sol: r`Empirical formula mass $= 12 + 2 + 16 = ${emp}$. $n = ${Mm} / ${emp} = ${k}$, so the molecular formula is $(\ce{CH2O})_${k} = \ce{C3H6O3}$ — option (@K).`,
    d: 2, c: 'understanding', t: [2],
  });
})(), () => 90 / 30 === 3 || 'multiplier');
add('samefml-mcq', mcq({
  stem: 'A student compares molecular formulae from a hydrocarbon data sheet. In which pair do the two compounds reduce to one and the same empirical formula?',
  right: 'ethene (C₂H₄) and propene (C₃H₆)',
  wrong: ['methane (CH₄) and ethane (C₂H₆)', 'ethyne (C₂H₂) and ethene (C₂H₄)', 'benzene (C₆H₆) and cyclohexane (C₆H₁₂)'],
  sol: 'Ethene and propene both reduce to CH₂ — option (@K). Methane and ethane reduce to CH₄ and CH₃; ethyne and ethene to CH and CH₂; benzene and cyclohexane to CH and CH₂.',
  d: 2, c: 'understanding', t: [2],
}));
add('hydrate-mcq', (() => {
  const anh = 63.5 + 32 + 64;
  const w = 5 * 18;
  const p = (w / (anh + w)) * 100;
  return mcq({
    stem: r`Blue vitriol is $\ce{CuSO4.5H2O}$ (Cu = 63.5, S = 32, O = 16, H = 1). Its percentage of water of crystallisation by mass is:`,
    right: `${p.toFixed(1)} %`,
    wrong: [`${((18 / (anh + w)) * 100).toFixed(1)} %`, `${((w / anh) * 100).toFixed(1)} %`, `${((anh / (anh + w)) * 100).toFixed(1)} %`],
    sol: r`Molar mass $= ${anh} + 5 \times 18 = ${anh + w}$ g mol⁻¹. Water $= 90$ g, so $\% = 90 / ${anh + w} \times 100 = ${p.toFixed(1)}$ % — option (@K). (@1) uses one water molecule, (@2) divides by the anhydrous mass.`,
    d: 3, c: 'application', t: [2],
  });
})(), () => near((90 / 249.5) * 100, 36.07, 0.001) || 'percent');
add('pct-num', (() => {
  const Mm = 3 * 40 + 2 * (31 + 4 * 16);
  const p = ((3 * 40) / Mm) * 100;
  return num({
    stem: `Calcium phosphate, Ca₃(PO₄)₂, is the mineral part of bone (Ca = 40, P = 31, O = 16). Find its percentage of calcium by mass, to three significant figures.`,
    value: Number(p.toPrecision(3)), tol: 0.1, unit: '%',
    sol: r`Molar mass $= 3 \times 40 + 2(31 + 64) = ${Mm}$ g mol⁻¹; calcium $= 120$ g, so $\% = 120 / ${Mm} \times 100 = ${p.toFixed(2)} \approx ${dec(p, 3)}$ %.`,
    scheme: [['Molar mass 310 g mol⁻¹', 1], ['38.7 %', 1]],
    marks: 2, d: 2, c: 'understanding', t: [2],
  });
})(), (q) => near((120 / 310) * 100, 38.71, 0.001) && q.answer.value === 38.7 || 'percent');
add('emp-short', (() => {
  const Fe = 69.9;
  const O = 30.1;
  const nFe = Fe / 56;
  const nO = O / 16;
  return short({
    marks: 2,
    stem: `A rust-coloured oxide of iron obtained from a mine contains ${Fe} % iron and ${O} % oxygen by mass (Fe = 56, O = 16). Find its empirical formula.`,
    model: r`In 100 g: Fe $= ${Fe}/56 = ${nFe.toFixed(3)}$ mol and O $= ${O}/16 = ${nO.toFixed(3)}$ mol. Dividing by the smaller: Fe : O $= 1 : ${(nO / nFe).toFixed(2)}$. The ratio 1 : 1.5 is multiplied by 2 to give whole numbers, 2 : 3. The empirical formula is $\ce{Fe2O3}$.`,
    sol: 'Moles, ratio 1 : 1.5, multiply by 2.',
    scheme: [['Moles of Fe and O, ratio 1 : 1.5', 1], ['Multiplies by 2: Fe2O3', 1]],
    d: 3, c: 'application', t: [2],
  });
})(), () => near(30.1 / 16 / (69.9 / 56), 1.507, 0.005) || 'ratio');
add('molform-short3', (() => {
  const C = 80.0;
  const H = 20.0;
  const nC = C / 12;
  const nH = H / 1;
  const vd = 15;
  const Mm = 2 * vd;
  return short({
    marks: 3,
    stem: `A gaseous hydrocarbon from natural gas contains ${C.toFixed(1)} % carbon and ${H.toFixed(1)} % hydrogen by mass. Its vapour density is ${vd}. Find (i) its empirical formula, (ii) its molar mass and (iii) its molecular formula.`,
    model: r`(i) In 100 g: C $= ${C}/12 = ${nC.toFixed(2)}$ mol, H $= ${H}/1 = ${nH.toFixed(1)}$ mol; ratio $1 : ${(nH / nC).toFixed(0)}$, so the empirical formula is $\ce{CH3}$ (mass 15). (ii) Molar mass $= 2 \times \text{vapour density} = 2 \times ${vd} = ${Mm}$ g mol⁻¹. (iii) $n = ${Mm}/15 = 2$, so the molecular formula is $\ce{C2H6}$.`,
    sol: 'Empirical CH3; M = 2 × VD = 30; molecular C2H6.',
    scheme: [['(i) Empirical formula CH3', 1], ['(ii) Molar mass 30 g mol⁻¹', 1], ['(iii) C2H6', 1]],
    d: 3, c: 'application', t: [2],
  });
})(), () => near(20 / 1 / (80 / 12), 3, 0.001) || 'ratio');
add('hydrate-short3', (() => {
  const hyd = 2.5;
  const anh = 1.6;
  const wat = hyd - anh;
  const nW = wat / 18;
  const nS = anh / 159.5;
  const x = nW / nS;
  return short({
    marks: 3,
    stem: `A 2.50 g crystal of hydrated copper(II) sulfate, CuSO₄·xH₂O, is heated until all the water is driven off, leaving ${anh} g of anhydrous salt (CuSO₄ = 159.5 g mol⁻¹, H₂O = 18 g mol⁻¹). Calculate the value of x.`,
    model: r`Mass of water $= ${hyd} - ${anh} = ${wat.toFixed(2)}$ g, so $n(\ce{H2O}) = ${wat.toFixed(2)}/18 = ${nW.toFixed(3)}$ mol. $n(\ce{CuSO4}) = ${anh}/159.5 = ${nS.toFixed(4)}$ mol. $x = ${nW.toFixed(3)} / ${nS.toFixed(4)} = ${x.toFixed(2)} \approx 5$.`,
    sol: 'Moles of water divided by moles of CuSO4.',
    scheme: [['Mass of water 0.90 g', 1], ['Moles 0.050 and 0.0100', 1], ['x = 5', 1]],
    d: 3, c: 'application', t: [2],
  });
})(), () => near((0.9 / 18) / (1.6 / 159.5), 4.98, 0.005) || 'x');
add('form-long', (() => {
  const C = 54.5;
  const H = 9.1;
  const O = 36.4;
  const nC = C / 12;
  const nH = H / 1;
  const nO = O / 16;
  const Mm = 88;
  const emp = 12 * 2 + 4 + 16;
  const k = Mm / emp;
  const mO = (4.4 * O) / 100;
  return long({
    stem: `A fragrant liquid used as a solvent contains ${C} % carbon, ${H} % hydrogen and ${O} % oxygen by mass. Its molar mass is ${Mm} g mol⁻¹.\n\n(a) Calculate its empirical formula. [3]\n\n(b) Find its molecular formula. [1]\n\n(c) Calculate the mass of oxygen in 4.40 g of the liquid. [1]`,
    model: r`(a) In 100 g: C $= ${C}/12 = ${nC.toFixed(2)}$ mol, H $= ${H}/1 = ${nH.toFixed(1)}$ mol, O $= ${O}/16 = ${nO.toFixed(2)}$ mol. Dividing by the smallest (${nO.toFixed(2)}): $${(nC / nO).toFixed(2)} : ${(nH / nO).toFixed(2)} : 1 \approx 2 : 4 : 1$, so the empirical formula is $\ce{C2H4O}$ (mass ${emp}). (b) $n = ${Mm}/${emp} = ${k}$, so the molecular formula is $\ce{C4H8O2}$. (c) Mass of oxygen $= 4.40 \times 36.4/100 = ${mO.toFixed(2)}$ g.`,
    sol: 'Moles, ratio 2 : 4 : 1; n = 2; mass fraction.',
    scheme: [['(a) Moles of C, H and O', 1], ['(a) Ratio 2 : 4 : 1', 1], ['(a) Empirical formula C2H4O', 1], ['(b) C4H8O2', 1], ['(c) 1.60 g', 1]],
    d: 3, c: 'application', t: [2],
  });
})(), () => near(54.5 / 12 / (36.4 / 16), 2, 0.01) && near(9.1 / (36.4 / 16) / 1, 4, 0.01) || 'ratio');

// ================================================================ t03 chemical equivalents
add('equiv-chk', (() => {
  const Mm = 98;
  const E = Mm / 3;
  return mcq({
    stem: r`Phosphoric acid (molar mass 98 g mol⁻¹) is completely neutralised by sodium hydroxide: $\ce{H3PO4 + 3NaOH -> Na3PO4 + 3H2O}$. Its equivalent weight in this reaction is:`,
    right: `${E.toFixed(1)} g eq⁻¹`,
    wrong: ['98.0 g eq⁻¹', '49.0 g eq⁻¹', '24.5 g eq⁻¹'],
    sol: r`All three replaceable hydrogen atoms react, so the n-factor (basicity used) is 3 and $E = M/n = ${Mm}/3 = ${E.toFixed(1)}$ g eq⁻¹ — option (@K). (@2) would apply if only two hydrogens were replaced.`,
    d: 2, c: 'application', t: [3],
  });
})(), () => near(98 / 3, 32.67, 0.001) || 'E');
add('eqca-mcq', (() => {
  const Mm = 40 + 2 * 17;
  return mcq({
    stem: 'Lime water is a solution of calcium hydroxide, Ca(OH)₂ (Ca = 40, O = 16, H = 1). The equivalent weight of calcium hydroxide as a base is:',
    right: `${Mm / 2} g eq⁻¹`,
    wrong: ['74 g eq⁻¹', '18.5 g eq⁻¹', '24.7 g eq⁻¹'],
    sol: r`Molar mass $= 40 + 2 \times 17 = ${Mm}$ g mol⁻¹. Calcium hydroxide is diacidic (two OH⁻ per formula unit), so $E = ${Mm}/2 = ${Mm / 2}$ g eq⁻¹ — option (@K).`,
    d: 2, c: 'understanding', t: [3],
  });
})(), () => (40 + 34) / 2 === 37 || 'E');
add('eqsalt-mcq', (() => {
  const Mm = 2 * 27 + 3 * (32 + 64);
  const E = Mm / 6;
  return mcq({
    stem: r`The equivalent weight of the salt aluminium sulfate, $\ce{Al2(SO4)3}$ (Al = 27, S = 32, O = 16), is:`,
    right: `${E.toFixed(0)} g eq⁻¹`,
    wrong: [`${(Mm / 3).toFixed(0)} g eq⁻¹`, `${(Mm / 2).toFixed(0)} g eq⁻¹`, `${Mm} g eq⁻¹`],
    sol: r`Molar mass $= 54 + 3 \times 96 = ${Mm}$ g mol⁻¹. The total positive charge is $2 \times 3 = 6$, so $E = ${Mm}/6 = ${E.toFixed(0)}$ g eq⁻¹ — option (@K). (@1) uses 3, the valency of aluminium only.`,
    d: 3, c: 'application', t: [3],
  });
})(), () => near(342 / 6, 57, 1e-9) || 'E');
add('eqox-mcq', (() => {
  const Mm = 2 * 39 + 2 * 52 + 7 * 16;
  const E = Mm / 6;
  return mcq({
    stem: r`In acidic solution the dichromate ion, $\ce{Cr2O7^2-}$, is reduced to two chromium(III) ions, so each ion gains 6 electrons. The equivalent weight of potassium dichromate, $\ce{K2Cr2O7}$ (K = 39, Cr = 52, O = 16), as an oxidising agent is:`,
    right: `${E.toFixed(1)} g eq⁻¹`,
    wrong: [`${(Mm / 2).toFixed(1)} g eq⁻¹`, `${(Mm / 3).toFixed(1)} g eq⁻¹`, `${Mm.toFixed(1)} g eq⁻¹`],
    sol: r`Molar mass $= 78 + 104 + 112 = ${Mm}$ g mol⁻¹. For an oxidising agent $E = M/(\text{electrons gained per formula unit}) = ${Mm}/6 = ${E.toFixed(1)}$ g eq⁻¹ — option (@K).`,
    d: 3, c: 'understanding', t: [3],
  });
})(), () => near(294 / 6, 49, 1e-9) || 'E');
add('eqvar-mcq', (() => {
  const M = 158;
  const acid = M / 5;
  const neutral = M / 3;
  return mcq({
    stem: 'Potassium permanganate, KMnO₄, is reduced to Mn²⁺ (5 electrons gained) in acidic solution and to MnO₂ (3 electrons gained) in neutral solution. The ratio of its equivalent weight in acidic solution to that in neutral solution is:',
    right: '3 : 5',
    wrong: ['5 : 3', '1 : 5', '5 : 1'],
    sol: r`$E = M/n$, so $E_\text{acid} : E_\text{neutral} = M/5 : M/3 = 3 : 5$ (numerically $${acid.toFixed(1)} : ${neutral.toFixed(1)}$) — option (@K). More electrons gained means a smaller equivalent weight.`,
    d: 3, c: 'analysis', t: [3],
  });
})(), () => near(158 / 5 / (158 / 3), 0.6, 1e-9) || 'ratio');
add('eqrel-mcq', mcq({
  stem: 'A divalent metal has an equivalent weight of 20.0 g eq⁻¹. Its atomic mass is:',
  right: '40.0',
  wrong: ['10.0', '20.0', '60.0'],
  sol: r`Equivalent weight $= \text{atomic mass}/\text{valency}$, so atomic mass $= 20.0 \times 2 = 40.0$ — option (@K). The metal is calcium.`,
  d: 2, c: 'understanding', t: [3],
}), () => 20 * 2 === 40 || 'mass');
add('ar-eq', ar({
  a: 'The equivalent weight of every acid is equal to half of its molar mass.',
  r: 'All acids are dibasic.',
  key: 'd',
  sol: 'Both statements are false. The equivalent weight of an acid is its molar mass divided by its basicity (number of replaceable H⁺ in the reaction): hydrochloric acid is monobasic, so its equivalent weight equals its molar mass, and phosphoric acid can be tribasic — option (d).',
  d: 2, c: 'understanding', t: [3],
}));
add('ar-kmno4', ar({
  a: 'The equivalent weight of potassium permanganate is different in acidic, neutral and alkaline media.',
  r: 'Manganese is reduced to different oxidation states (+2, +4 and +6) in these media, so the number of electrons gained per formula unit differs.',
  key: 'a',
  sol: 'A is true (31.6, 52.7 and 158 g eq⁻¹ respectively). R is true and explains A: E = M/n and n is 5, 3 and 1 because Mn(+7) goes to Mn(+2), Mn(+4) and Mn(+6) — option (a).',
  d: 3, c: 'analysis', t: [3],
}));
add('eq-fill', fill({
  stem: 'The equivalent weight of an acid is its molar mass divided by its ___.',
  acc: [['basicity', 'n-factor', 'n factor', 'valency']],
  sol: 'Equivalent weight of an acid = molar mass ÷ **basicity** (the number of replaceable hydrogen ions, the n-factor).',
  d: 1, c: 'recall', t: [3],
}));
add('eq-match', match({
  stem: 'A chemist tabulates substances used in neutralisation titrations (H = 1, C = 12, O = 16, Na = 23, S = 32). Pair each substance with its equivalent weight in g eq⁻¹.',
  pairs: [
    ['Sulfuric acid, H₂SO₄', '49.0'],
    ['Sodium hydroxide, NaOH', '40.0'],
    ['Sodium carbonate, Na₂CO₃ (complete neutralisation)', '53.0'],
    ['Calcium hydroxide, Ca(OH)₂ (Ca = 40)', '37.0'],
  ],
  order: [3, 1, 2, 0],
  sol: r`$98/2 = 49.0$; NaOH is monoacidic: $40/1 = 40.0$; $\ce{Na2CO3}$ has total positive charge 2: $106/2 = 53.0$; $\ce{Ca(OH)2}$ is diacidic: $74/2 = 37.0$.`,
  d: 2, c: 'application', t: [3],
}));
add('eq-short', short({
  marks: 2,
  stem: 'Define equivalent weight and gram equivalent weight, and state how the equivalent weight of an acid is related to its molar mass.',
  model: 'The equivalent weight of a substance is the number of parts by mass of it that combine with, replace or react with 1 part by mass of hydrogen (8 parts of oxygen); expressed in grams it is the gram equivalent weight. For an acid, equivalent weight = molar mass divided by basicity (the number of replaceable hydrogen ions).',
  sol: 'Definition; E = M ÷ basicity.',
  scheme: [['Equivalent weight and gram equivalent weight defined', 1], ['E = M / basicity for acids', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('var-short', (() => {
  const M = 158;
  return short({
    marks: 2,
    stem: 'Why does potassium permanganate have more than one equivalent weight? Give its equivalent weight in acidic and in alkaline solution (K = 39, Mn = 55, O = 16).',
    model: r`The equivalent weight of an oxidising agent is $M/n$ with $n$ the electrons gained per formula unit, and $n$ depends on the medium. In acidic solution $\ce{MnO4-}$ is reduced to $\ce{Mn^2+}$ ($n = 5$), so $E = ${M}/5 = ${(M / 5).toFixed(1)}$ g eq⁻¹. In alkaline solution it is reduced to manganate(VI) ($n = 1$), so $E = ${M}/1 = ${M}$ g eq⁻¹.`,
    sol: 'E = M/n with n varying with the medium.',
    scheme: [['Reason: the number of electrons gained depends on the medium', 1], ['31.6 g eq⁻¹ (acidic) and 158 g eq⁻¹ (alkaline)', 1]],
    d: 3, c: 'application', t: [3],
  });
})(), () => near(158 / 5, 31.6, 1e-9) || 'E');
add('eqcalc-short3', (() => {
  const ba = (137 + 34) / 2;
  const hno3 = 1 + 14 + 48;
  const fe = 56 + 32 + 64;
  return short({
    marks: 3,
    stem: r`Calculate the equivalent weight of (i) barium hydroxide, $\ce{Ba(OH)2}$, (ii) nitric acid, $\ce{HNO3}$, and (iii) iron(II) sulfate, $\ce{FeSO4}$, acting as a reducing agent when $\ce{Fe^2+}$ is oxidised to $\ce{Fe^3+}$ (Ba = 137, Fe = 56, S = 32, N = 14).`,
    model: r`(i) $\ce{Ba(OH)2}$: $M = 137 + 34 = 171$, acidity 2, so $E = 171/2 = ${ba}$ g eq⁻¹. (ii) $\ce{HNO3}$: $M = 63$, basicity 1, so $E = ${hno3}$ g eq⁻¹. (iii) $\ce{FeSO4}$: $M = ${fe}$; each Fe²⁺ loses 1 electron, so $E = ${fe}/1 = ${fe}$ g eq⁻¹.`,
    sol: 'E = M/n with n = acidity, basicity, electrons lost.',
    scheme: [['(i) 85.5 g eq⁻¹', 1], ['(ii) 63 g eq⁻¹', 1], ['(iii) 152 g eq⁻¹', 1]],
    d: 2, c: 'application', t: [3],
  });
})(), () => (171 / 2 === 85.5 && 63 === 63 && 152 === 152) || 'E');
add('eqrel-short3', (() => {
  const E = 20.0;
  const v = 2;
  const A = E * v;
  const clM = A + 2 * 35.5;
  const pct = ((2 * 35.5) / clM) * 100;
  return short({
    marks: 3,
    stem: `A metal M has an equivalent weight of ${E.toFixed(1)} g eq⁻¹ and forms a chloride in which it is divalent (Cl = 35.5). (i) State the relation between equivalent weight, atomic mass and valency. (ii) Find the atomic mass of M. (iii) Find the percentage of chlorine in its chloride.`,
    model: r`(i) Equivalent weight $= \text{atomic mass}/\text{valency}$. (ii) Atomic mass $= ${E.toFixed(1)} \times ${v} = ${A.toFixed(1)}$. (iii) The chloride is $\ce{MCl2}$ with molar mass $${A.toFixed(1)} + 71 = ${clM.toFixed(1)}$ g mol⁻¹, so $\%\ \text{Cl} = 71/${clM.toFixed(1)} \times 100 = ${pct.toFixed(1)}$ %.`,
    sol: 'A = E × valency; MCl2 composition.',
    scheme: [['(i) Relation stated', 1], ['(ii) 40.0', 1], ['(iii) 64.0 %', 1]],
    d: 3, c: 'application', t: [3],
  });
})(), () => near((71 / 111) * 100, 63.96, 0.001) || 'percent');
add('eq-long', (() => {
  const M = 98;
  const Es = [M / 1, M / 2, M / 3];
  const n = 9.8 / M;
  const ge = [n * 1, n * 2, n * 3];
  return long({
    stem: `Phosphoric acid (molar mass ${M} g mol⁻¹) reacts with sodium hydroxide in three different ways:\n\n(1) $\\ce{H3PO4 + NaOH -> NaH2PO4 + H2O}$\n(2) $\\ce{H3PO4 + 2NaOH -> Na2HPO4 + 2H2O}$\n(3) $\\ce{H3PO4 + 3NaOH -> Na3PO4 + 3H2O}$\n\n(a) Calculate the equivalent weight of phosphoric acid in each reaction and explain why it is variable. [3]\n\n(b) Find the number of gram equivalents in 9.8 g of phosphoric acid in each reaction. [2]`,
    model: r`(a) The equivalent weight is $M/\text{basicity}$, and the basicity is the number of hydrogens replaced in the reaction: (1) $${M}/1 = ${Es[0].toFixed(1)}$; (2) $${M}/2 = ${Es[1].toFixed(1)}$; (3) $${M}/3 = ${Es[2].toFixed(1)}$ g eq⁻¹. It is variable because the same acid can lose one, two or three H⁺ depending on the amount of base. (b) $n = 9.8/98 = ${n.toFixed(2)}$ mol, so the gram equivalents are $${n.toFixed(2)} \times 1 = ${ge[0].toFixed(2)}$, $${n.toFixed(2)} \times 2 = ${ge[1].toFixed(2)}$ and $${n.toFixed(2)} \times 3 = ${ge[2].toFixed(2)}$.`,
    sol: 'E = 98, 49, 32.7; gram equivalents 0.10, 0.20, 0.30.',
    scheme: [['(a) 98.0, 49.0 and 32.7 g eq⁻¹', 1.5], ['(a) Reason: variable number of replaceable H⁺', 1.5], ['(b) 0.10, 0.20 and 0.30 gram equivalents', 2]],
    d: 3, c: 'application', t: [3],
  });
})(), () => near(98 / 3, 32.67, 0.001) && near((9.8 / 98) * 3, 0.3, 1e-9) || 'E');

// ================================================================ t04 concentration terms, N1V1 = N2V2
add('conc-chk', (() => {
  const m = 4.0;
  const w = 250;
  const n = m / 40;
  const mm = n / (w / 1000);
  return mcq({
    stem: `A technician dissolves ${m} g of sodium hydroxide (molar mass 40 g mol⁻¹) in ${w} g of water to make a cleaning solution. The molality of the solution is:`,
    right: `${mm.toFixed(2)} mol kg⁻¹`,
    wrong: ['0.10 mol kg⁻¹', '0.025 mol kg⁻¹', '0.39 mol kg⁻¹'],
    sol: r`$n = ${m}/40 = ${n.toFixed(2)}$ mol; mass of solvent $= 0.250$ kg. Molality $= ${n.toFixed(2)}/0.250 = ${mm.toFixed(2)}$ mol kg⁻¹ — option (@K). (@1) divides by 1 kg and (@3) uses the mass of the solution.`,
    d: 2, c: 'application', t: [4],
  });
})(), () => near(0.1 / 0.25, 0.4, 1e-9) || 'molality');
add('molarity-mcq', (() => {
  const m = 9.8;
  const V = 0.25;
  const c = m / 98 / V;
  return mcq({
    stem: `A reagent bottle is prepared by dissolving ${m} g of phosphoric acid (molar mass 98 g mol⁻¹) in water and making the volume up to 250 mL. The molarity of the solution is:`,
    right: `${c.toFixed(2)} M`,
    wrong: ['0.10 M', '1.60 M', '0.040 M'],
    sol: r`$n = ${m}/98 = 0.100$ mol; $V = 0.250$ L. Molarity $= 0.100/0.250 = ${c.toFixed(2)}$ mol L⁻¹ — option (@K). (@1) divides by 1 L instead of 0.250 L.`,
    d: 2, c: 'understanding', t: [4],
  });
})(), () => near(9.8 / 98 / 0.25, 0.4, 1e-9) || 'molarity');
add('normality-mcq', (() => {
  const M = 0.2;
  const nf = 3;
  return mcq({
    stem: r`A 0.20 M solution of phosphoric acid is used to prepare sodium phosphate, $\ce{H3PO4 + 3NaOH -> Na3PO4 + 3H2O}$. The normality of the acid solution for this reaction is:`,
    right: `${(M * nf).toFixed(2)} N`,
    wrong: ['0.067 N', '0.20 N', '0.40 N'],
    sol: r`Normality $= \text{molarity} \times \text{n-factor} = 0.20 \times 3 = ${(M * nf).toFixed(2)}$ N — option (@K). (@3) would be the value if only two hydrogens were replaced.`,
    d: 2, c: 'understanding', t: [4],
  });
})(), () => near(0.2 * 3, 0.6, 1e-9) || 'N');
add('molfrac-mcq', (() => {
  const e = 23 / 46;
  const w = 36 / 18;
  const x = e / (e + w);
  return mcq({
    stem: 'A disinfectant is made by mixing 23 g of ethanol (molar mass 46 g mol⁻¹) with 36 g of water (molar mass 18 g mol⁻¹). The mole fraction of ethanol in the mixture is:',
    right: x.toFixed(2),
    wrong: ['0.50', '0.39', '0.80'],
    sol: r`$n(\text{ethanol}) = 23/46 = ${e.toFixed(1)}$ mol; $n(\text{water}) = 36/18 = ${w.toFixed(1)}$ mol. $x = ${e.toFixed(1)}/(${e.toFixed(1)} + ${w.toFixed(1)}) = ${x.toFixed(2)}$ — option (@K). (@3) is the mole fraction of water.`,
    d: 2, c: 'application', t: [4],
  });
})(), () => near(0.5 / 2.5, 0.2, 1e-9) || 'mole fraction');
add('dilution-mcq', (() => {
  const M1 = 12.0;
  const M2 = 0.6;
  const V2 = 250;
  const V1 = (M2 * V2) / M1;
  return mcq({
    stem: `A laboratory attendant has concentrated hydrochloric acid of molarity ${M1.toFixed(1)} M. The volume of it needed to prepare ${V2} mL of ${M2.toFixed(3)} M acid is:`,
    right: `${V1.toFixed(1)} mL`,
    wrong: ['0.0125 mL', '5.0 mL', '50 mL'],
    sol: r`$M_1V_1 = M_2V_2$, so $V_1 = ${M2.toFixed(3)} \times ${V2} / ${M1.toFixed(1)} = ${V1.toFixed(1)}$ mL — option (@K).`,
    d: 2, c: 'understanding', t: [4],
  });
})(), () => near((0.6 * 250) / 12, 12.5, 1e-9) || 'V1');
add('ar-norm', ar({
  a: 'The normality of a 0.10 M solution of sulfuric acid is 0.20 N.',
  r: 'Sulfuric acid is a strong acid.',
  key: 'b',
  sol: 'A is true: normality = molarity × n-factor = 0.10 × 2 = 0.20 N. R is also true, but the strength of an acid has nothing to do with the n-factor; the factor 2 comes from the two replaceable hydrogen ions — option (b).',
  d: 2, c: 'understanding', t: [4],
}));
add('molal-tf', tf({
  stem: 'The molality of a solution changes when the temperature is changed, because the volume of the solution changes.',
  key: 'f',
  sol: 'False. Molality is moles of solute per kilogram of solvent. Mass does not change with temperature, so molality is temperature independent; it is molarity (which uses volume) that changes.',
  d: 2, c: 'understanding', t: [4],
}));
add('conc-match', match({
  stem: 'A chemistry notebook lists concentration terms and their definitions in a jumbled order. Pair each term with its definition.',
  pairs: [
    ['Molarity', 'moles of solute per litre of solution'],
    ['Molality', 'moles of solute per kilogram of solvent'],
    ['Normality', 'gram equivalents of solute per litre of solution'],
    ['Mole fraction', 'moles of one component divided by total moles of all components'],
  ],
  order: [3, 0, 2, 1],
  sol: 'Molarity uses litres of solution; molality uses kilograms of solvent; normality uses gram equivalents per litre of solution; mole fraction is a ratio of moles.',
  d: 1, c: 'recall', t: [4],
}));
add('normality-num', (() => {
  const m = 4.9;
  const E = 49;
  const V = 0.5;
  const N = m / E / V;
  return num({
    stem: `A 500 mL solution contains ${m} g of sulfuric acid (equivalent weight ${E} g eq⁻¹). Find its normality.`,
    value: Number(N.toPrecision(3)), tol: 0.005, unit: 'N',
    sol: r`Gram equivalents $= ${m}/${E} = ${(m / E).toFixed(2)}$; $N = ${(m / E).toFixed(2)}/0.500 = ${N.toFixed(2)}$ N.`,
    scheme: [['0.100 gram equivalent', 1], ['0.200 N', 1]],
    marks: 2, d: 2, c: 'understanding', t: [4],
  });
})(), (q) => near(4.9 / 49 / 0.5, 0.2, 1e-9) && q.answer.value === 0.2 || 'N');
add('dil-short', (() => {
  const M1 = 0.5;
  const V1 = 20.0;
  const M2 = 0.1;
  const V2 = (M1 * V1) / M2;
  return short({
    marks: 2,
    stem: `A student has ${V1.toFixed(1)} mL of ${M1.toFixed(3)} M copper(II) sulfate solution and wants a ${M2.toFixed(3)} M solution. What total volume must be reached, and how much water must be added?`,
    model: r`$M_1V_1 = M_2V_2$, so $V_2 = ${M1} \times ${V1} / ${M2} = ${V2.toFixed(1)}$ mL. Water to add $= ${V2.toFixed(1)} - ${V1.toFixed(1)} = ${(V2 - V1).toFixed(1)}$ mL.`,
    sol: 'M1V1 = M2V2.',
    scheme: [['Final volume 100.0 mL', 1], ['80.0 mL of water added', 1]],
    d: 2, c: 'application', t: [4],
  });
})(), () => near((0.5 * 20) / 0.1, 100, 1e-9) || 'V2');
add('wvconv-short', (() => {
  const m = 4.0;
  const V = 250;
  const wv = (m / V) * 100;
  const c = m / 40 / (V / 1000);
  return short({
    marks: 2,
    stem: `A bottle of liquid soap contains ${m} g of sodium hydroxide dissolved in ${V} mL of solution (molar mass 40 g mol⁻¹, equivalent weight 40 g eq⁻¹). Express its concentration as percent w/v and as molarity.`,
    model: r`Percent w/v $= ${m}/${V} \times 100 = ${wv.toFixed(1)}$ %. Moles $= ${m}/40 = 0.100$ mol in 0.250 L, so molarity $= 0.100/0.250 = ${c.toFixed(2)}$ M (and since the n-factor is 1, the normality is also ${c.toFixed(2)} N).`,
    sol: 'Percent w/v and molarity.',
    scheme: [['1.6 % w/v', 1], ['0.40 M', 1]],
    d: 2, c: 'application', t: [4],
  });
})(), () => near((4 / 250) * 100, 1.6, 1e-9) || 'wv');
add('mix-short3', (() => {
  const m = 6.0;
  const Mu = 60;
  const w = 120;
  const n = m / Mu;
  const mm = n / (w / 1000);
  const nw = w / 18;
  const x = n / (n + nw);
  const pc = (m / (m + w)) * 100;
  return short({
    marks: 3,
    stem: `A farmer dissolves ${m} g of urea (molar mass ${Mu} g mol⁻¹) in ${w} g of water. Calculate (i) the molality, (ii) the mole fraction of urea and (iii) the mass percent of urea.`,
    model: r`(i) $n = ${m}/${Mu} = ${n.toFixed(2)}$ mol; molality $= ${n.toFixed(2)}/0.120 = ${mm.toFixed(3)}$ mol kg⁻¹. (ii) $n(\ce{H2O}) = ${w}/18 = ${nw.toFixed(2)}$ mol; $x = ${n.toFixed(2)}/(${n.toFixed(2)} + ${nw.toFixed(2)}) = ${x.toFixed(4)}$. (iii) Mass percent $= ${m}/(${m} + ${w}) \times 100 = ${pc.toFixed(2)}$ %.`,
    sol: 'Moles of both components and mass of solution.',
    scheme: [['(i) 0.833 mol kg⁻¹', 1], ['(ii) 0.0148', 1], ['(iii) 4.76 %', 1]],
    d: 3, c: 'application', t: [4],
  });
})(), () => near(0.1 / 0.12, 0.8333, 0.001) && near(0.1 / (0.1 + 120 / 18), 0.01478, 0.005) || 'terms');
add('titr-short3', (() => {
  const V1 = 20.0;
  const V2 = 22.5;
  const N2 = 0.1;
  const N1 = (N2 * V2) / V1;
  const M1 = N1 / 2;
  const g = M1 * 106;
  return short({
    marks: 3,
    stem: `${V1.toFixed(1)} mL of a sodium carbonate solution is exactly neutralised by ${V2} mL of ${N2.toFixed(3)} N hydrochloric acid. Find (i) the normality of the sodium carbonate solution, (ii) its molarity (n-factor 2) and (iii) its strength in g L⁻¹ (molar mass 106 g mol⁻¹).`,
    model: r`(i) $N_1V_1 = N_2V_2$, so $N_1 = ${N2} \times ${V2} / ${V1} = ${N1.toFixed(4)}$ N. (ii) $M = N/2 = ${M1.toFixed(5)}$ M. (iii) Strength $= ${M1.toFixed(5)} \times 106 = ${g.toFixed(2)}$ g L⁻¹.`,
    sol: 'Normality equation, then M = N/2, then M × molar mass.',
    scheme: [['(i) 0.1125 N', 1], ['(ii) 0.05625 M', 1], ['(iii) 5.96 g L⁻¹', 1]],
    d: 3, c: 'application', t: [4],
  });
})(), () => near((0.1 * 22.5) / 20, 0.1125, 1e-9) || 'N');
add('blend-short3', (() => {
  const a = { M: 0.5, V: 200 };
  const b = { M: 1.0, V: 300 };
  const tot = a.M * a.V + b.M * b.V;
  const Vt = a.V + b.V;
  const M = tot / Vt;
  return short({
    marks: 3,
    stem: `A stores assistant mixes ${a.V} mL of ${a.M.toFixed(2)} M hydrochloric acid with ${b.V} mL of ${b.M.toFixed(2)} M hydrochloric acid. Assuming the volumes add, find (i) the total amount of HCl in moles, (ii) the final volume in litres, and (iii) the molarity of the mixture.`,
    model: r`(i) $n = (${a.M} \times ${a.V} + ${b.M} \times ${b.V})/1000 = ${(tot / 1000).toFixed(2)}$ mol. (ii) $V = ${Vt}$ mL $= ${(Vt / 1000).toFixed(3)}$ L. (iii) $M = ${(tot / 1000).toFixed(2)}/${(Vt / 1000).toFixed(3)} = ${M.toFixed(2)}$ M.`,
    sol: 'Add the moles, add the volumes.',
    scheme: [['(i) 0.40 mol', 1], ['(ii) 0.500 L', 1], ['(iii) 0.80 M', 1]],
    d: 3, c: 'application', t: [4],
  });
})(), () => near((0.5 * 200 + 1.0 * 300) / 500, 0.8, 1e-9) || 'M');
add('conc-long', (() => {
  const w = 36.5;
  const rho = 1.18;
  const M = 36.5;
  const c = (10 * w * rho) / M;
  const solv = 100 - w;
  const mm = (w / M) / (solv / 1000);
  const nw = solv / 18;
  const x = w / M / (w / M + nw);
  return long({
    stem: `(a) Define molality and normality. State, with a reason, which of molarity and molality is independent of temperature. [2]\n\n(b) A bottle of concentrated hydrochloric acid is labelled "36.5 % w/w, density ${rho} g mL⁻¹" (molar mass of HCl 36.5 g mol⁻¹; water 18 g mol⁻¹). For this acid calculate (i) the molarity, (ii) the molality and (iii) the mole fraction of HCl. [3]`,
    model: r`(a) Molality is the number of moles of solute per kilogram of solvent; normality is the number of gram equivalents of solute per litre of solution. Molality is temperature independent because masses do not change with temperature, whereas molarity depends on volume, which changes. (b) Take 100 g of acid: 36.5 g HCl is 1.00 mol and 63.5 g is water. (i) Volume $= 100/${rho} = ${(100 / rho).toFixed(1)}$ mL, so molarity $= 1.00/0.0847 = ${c.toFixed(1)}$ M (equivalently $10 \times 36.5 \times ${rho} / 36.5 = ${c.toFixed(1)}$). (ii) Molality $= 1.00/0.0635 = ${mm.toFixed(2)}$ mol kg⁻¹. (iii) $n(\ce{H2O}) = 63.5/18 = ${nw.toFixed(2)}$ mol, so $x = 1.00/(1.00 + ${nw.toFixed(2)}) = ${x.toFixed(3)}$.`,
    sol: 'Definitions; take 100 g of solution; molarity, molality, mole fraction.',
    scheme: [['(a) Molality and normality defined', 1], ['(a) Molality temperature independent, with reason', 1], ['(b)(i) 11.8 M', 1], ['(b)(ii) 15.75 mol kg⁻¹', 1], ['(b)(iii) 0.221', 1]],
    d: 4, c: 'analysis', t: [4],
  });
})(), () => near((10 * 36.5 * 1.18) / 36.5, 11.8, 1e-9) && near(1 / 0.0635, 15.75, 0.001) || 'conc');
add('titr-long', (() => {
  const m = 1.325;
  const E = 53;
  const V = 0.25;
  const N = m / E / V;
  const M = N / 2;
  const Va = 25.0;
  const Vh = 20.8;
  const Nh = (N * Va) / Vh;
  const g = Nh * 36.5;
  return long({
    stem: `A student dissolves ${m} g of anhydrous sodium carbonate (equivalent weight ${E} g eq⁻¹) in water and makes the volume up to 250 mL.\n\n(a) Calculate the normality and the molarity of the sodium carbonate solution. [2]\n\n(b) ${Va.toFixed(1)} mL of this solution requires ${Vh} mL of dilute hydrochloric acid for complete neutralisation (methyl orange indicator). Find the normality and the strength in g L⁻¹ of the acid (HCl = 36.5). [3]`,
    model: r`(a) Gram equivalents $= ${m}/${E} = ${(m / E).toFixed(3)}$, so $N = ${(m / E).toFixed(3)}/0.250 = ${N.toFixed(3)}$ N; the n-factor of sodium carbonate is 2, so $M = ${N.toFixed(3)}/2 = ${M.toFixed(4)}$ M. (b) $N_1V_1 = N_2V_2$: $N_\text{acid} = ${N.toFixed(3)} \times ${Va} / ${Vh} = ${Nh.toFixed(4)}$ N. For HCl the n-factor is 1, so the molarity is ${Nh.toFixed(4)} M and the strength is $${Nh.toFixed(4)} \times 36.5 = ${g.toFixed(2)}$ g L⁻¹.`,
    sol: 'N = geq/V; N1V1 = N2V2; strength = N × E.',
    scheme: [['(a) 0.100 N', 1], ['(a) 0.0500 M', 1], ['(b) Normality equation set up', 1], ['(b) 0.120 N', 1], ['(b) 4.39 g L⁻¹', 1]],
    d: 4, c: 'application', t: [4],
  });
})(), () => near(1.325 / 53 / 0.25, 0.1, 1e-9) && near((0.1 * 25) / 20.8, 0.1202, 0.001) || 'N');

// ================================================================ t05 stoichiometry and limiting reagent
add('stoich-chk', (() => {
  const V = 4.48;
  const n = V / VM;
  const m = n * 65;
  return mcq({
    stem: r`Zinc granules react with dilute hydrochloric acid: $\ce{Zn + 2HCl -> ZnCl2 + H2}$. The mass of zinc (Zn = 65) needed to liberate ${V} L of hydrogen at STP (molar volume ${VM} L) is:`,
    right: `${m.toFixed(1)} g`,
    wrong: ['6.5 g', '26.0 g', '65.0 g'],
    sol: r`$n(\ce{H2}) = ${V}/${VM} = ${n.toFixed(2)}$ mol. The equation gives 1 mol Zn per mol $\ce{H2}$, so $n(\ce{Zn}) = ${n.toFixed(2)}$ mol and $m = ${n.toFixed(2)} \times 65 = ${m.toFixed(1)}$ g — option (@K).`,
    d: 2, c: 'application', t: [5],
  });
})(), () => near((4.48 / 22.4) * 65, 13, 1e-9) || 'mass');
add('limit-chk', (() => {
  const nh3 = 3.4 / 17;
  const o2 = 4.0 / 32;
  const q1 = nh3 / 4;
  const q2 = o2 / 5;
  const no = (o2 / 5) * 4;
  return mcq({
    stem: r`In the first step of nitric acid manufacture, $\ce{4NH3 + 5O2 -> 4NO + 6H2O}$, a pilot reactor is charged with 3.4 g of ammonia and 4.0 g of oxygen (N = 14, O = 16, H = 1). The limiting reagent and the mass of nitrogen monoxide formed are:`,
    right: 'oxygen; 3.0 g',
    wrong: ['ammonia; 3.0 g', 'oxygen; 6.0 g', 'ammonia; 6.0 g'],
    sol: r`$n(\ce{NH3}) = 3.4/17 = ${nh3.toFixed(3)}$ mol and $n(\ce{O2}) = 4.0/32 = ${o2.toFixed(3)}$ mol. Dividing by the coefficients: ammonia ${q1.toFixed(3)}, oxygen ${q2.toFixed(3)}; oxygen is smaller, so it is limiting. $n(\ce{NO}) = ${q2.toFixed(3)} \times 4 = ${no.toFixed(2)}$ mol, mass $= ${no.toFixed(2)} \times 30 = ${(no * 30).toFixed(1)}$ g — option (@K). (@3) would follow from using ammonia.`,
    d: 3, c: 'application', t: [5],
  });
})(), () => near(((4 / 32) / 5) * 4 * 30, 3.0, 1e-9) || 'NO');
add('massmass-mcq', (() => {
  const m = 25.0;
  const n = m / 100;
  const cao = n * 56;
  return mcq({
    stem: r`A lime kiln decomposes limestone: $\ce{CaCO3 -> CaO + CO2}$ (Ca = 40, C = 12, O = 16). The mass of quicklime, CaO, obtained from ${m} g of pure calcium carbonate is:`,
    right: `${cao.toFixed(1)} g`,
    wrong: ['25.0 g', '11.0 g', '56.0 g'],
    sol: r`$n(\ce{CaCO3}) = ${m}/100 = ${n.toFixed(2)}$ mol, which gives ${n.toFixed(2)} mol of CaO; $m = ${n.toFixed(2)} \times 56 = ${cao.toFixed(1)}$ g — option (@K). (@2) is the mass of carbon dioxide formed.`,
    d: 2, c: 'application', t: [5],
  });
})(), () => near(0.25 * 56, 14, 1e-9) || 'CaO');
add('vv-mcq', (() => {
  const but = 2.8;
  const o2 = (13 / 2) * but;
  return mcq({
    stem: r`A camping stove burns butane: $\ce{2C4H10 + 13O2 -> 8CO2 + 10H2O}$. At STP, ${but} L of butane vapour requires what volume of oxygen at STP for complete combustion?`,
    right: `${o2.toFixed(1)} L`,
    wrong: ['2.8 L', '36.4 L', '14.0 L'],
    sol: r`At the same temperature and pressure, volumes are in the ratio of coefficients: $V(\ce{O2}) = ${but} \times 13/2 = ${o2.toFixed(1)}$ L — option (@K). (@1) assumes equal volumes, (@2) multiplies by 13 instead of 13/2 and (@3) is five times the volume of butane.`,
    d: 3, c: 'understanding', t: [5],
  });
})(), () => near(2.8 * 6.5, 18.2, 1e-9) || 'volume');
add('excess-mcq', (() => {
  const mg = 4.8;
  const hcl = 9.13;
  const nMg = mg / 24;
  const nH = hcl / 36.5;
  const used = nH / 2;
  const left = (nMg - used) * 24;
  return mcq({
    stem: r`${mg} g of magnesium ribbon (Mg = 24) is added to a flask containing ${hcl} g of hydrogen chloride in solution (HCl = 36.5): $\ce{Mg + 2HCl -> MgCl2 + H2}$. The mass of magnesium left unreacted is:`,
    right: `${left.toFixed(1)} g`,
    wrong: ['0.0 g', '3.0 g', '4.8 g'],
    sol: r`$n(\ce{Mg}) = ${mg}/24 = ${nMg.toFixed(2)}$ mol and $n(\ce{HCl}) = ${hcl}/36.5 = ${nH.toFixed(2)}$ mol, which needs only ${used.toFixed(3)} mol of Mg. HCl is limiting, and Mg left $= (${nMg.toFixed(2)} - ${used.toFixed(3)}) \times 24 = ${left.toFixed(1)}$ g — option (@K).`,
    d: 3, c: 'application', t: [5],
  });
})(), () => near((4.8 / 24 - 9.13 / 36.5 / 2) * 24, 1.8, 0.01) || 'left');
add('ar-limit', ar({
  a: 'The limiting reagent decides the amount of product formed in a reaction.',
  r: 'The limiting reagent is the reactant that is present in the smallest mass.',
  key: 'c',
  sol: 'A is true: the product stops forming when the limiting reagent is used up. R is false: the limiting reagent is the one with the smallest value of moles divided by its coefficient; a reactant present in a small mass may still be in excess — option (c).',
  d: 3, c: 'analysis', t: [5],
}));
add('lim-tf', tf({
  stem: 'In any reaction, the reactant present in the smallest mass is always the limiting reagent.',
  key: 'f',
  sol: 'False. The limiting reagent is found from amounts in moles divided by the stoichiometric coefficients, not from masses; a light reactant with a small molar mass may be present in more moles than a heavy one.',
  d: 2, c: 'understanding', t: [5],
}));
add('lim-fill', fill({
  stem: 'The reactant that is completely consumed first and so decides the amount of product is called the ___ reagent.',
  acc: [['limiting']],
  sol: 'It is the **limiting** reagent; the other reactant is in excess.',
  d: 1, c: 'recall', t: [5],
}));
add('fe-num', (() => {
  const m = 5.6;
  const n = m / 56;
  const ox = (n / 4) * 2 * 160;
  return num({
    stem: r`A blacksmith heats ${m} g of iron (Fe = 56) in excess oxygen: $\ce{4Fe + 3O2 -> 2Fe2O3}$. Find the mass of iron(III) oxide formed (Fe₂O₃ = 160 g mol⁻¹).`,
    value: Number(ox.toFixed(2)), tol: 0.05, unit: 'g',
    sol: r`$n(\ce{Fe}) = ${m}/56 = ${n.toFixed(2)}$ mol; from the equation $n(\ce{Fe2O3}) = ${n.toFixed(2)} \times 2/4 = ${(n / 2).toFixed(2)}$ mol; $m = ${(n / 2).toFixed(2)} \times 160 = ${ox.toFixed(1)}$ g.`,
    scheme: [['0.050 mol of Fe2O3 from the 4 : 2 ratio', 1], ['8.0 g', 1]],
    marks: 2, d: 2, c: 'application', t: [5],
  });
})(), (q) => near((5.6 / 56 / 2) * 160, 8.0, 1e-9) && q.answer.value === 8 || 'mass');
add('stoich-short', (() => {
  const m = 10.0;
  const n = m / 100;
  const co2 = n * 44;
  const V = n * VM;
  return short({
    marks: 2,
    stem: r`Marble chips react with dilute hydrochloric acid: $\ce{CaCO3 + 2HCl -> CaCl2 + H2O + CO2}$. Calculate the mass and the volume at STP of carbon dioxide produced from ${m} g of pure calcium carbonate (molar mass 100 g mol⁻¹).`,
    model: r`$n(\ce{CaCO3}) = ${m}/100 = ${n.toFixed(2)}$ mol, which gives ${n.toFixed(2)} mol of $\ce{CO2}$. Mass $= ${n.toFixed(2)} \times 44 = ${co2.toFixed(2)}$ g; volume at STP $= ${n.toFixed(2)} \times ${VM} = ${V.toFixed(2)}$ L.`,
    sol: 'One mole of CaCO3 gives one mole of CO2.',
    scheme: [['4.40 g of carbon dioxide', 1], ['2.24 L at STP', 1]],
    d: 2, c: 'application', t: [5],
  });
})(), () => near(0.1 * 44, 4.4, 1e-9) || 'mass');
add('vol-short', (() => {
  const m = 14.0;
  const n = m / 28;
  const nh3 = 2 * n;
  const V = nh3 * VM;
  const H = 3 * n * VM;
  return short({
    marks: 2,
    stem: r`In a Haber-process plant, ${m} g of nitrogen (molar mass 28 g mol⁻¹) reacts completely with hydrogen: $\ce{N2 + 3H2 -> 2NH3}$. Find the volume of ammonia formed and the volume of hydrogen consumed, both at STP (molar volume ${VM} L).`,
    model: r`$n(\ce{N2}) = ${m}/28 = ${n.toFixed(1)}$ mol. Ammonia: $2 \times ${n.toFixed(1)} = ${nh3.toFixed(1)}$ mol, so $V = ${nh3.toFixed(1)} \times ${VM} = ${V.toFixed(1)}$ L. Hydrogen: $3 \times ${n.toFixed(1)} = ${(3 * n).toFixed(1)}$ mol, so $V = ${H.toFixed(1)}$ L.`,
    sol: 'Mole ratio 1 : 3 : 2, then × 22.4 L.',
    scheme: [['22.4 L of ammonia', 1], ['33.6 L of hydrogen', 1]],
    d: 2, c: 'application', t: [5],
  });
})(), () => near(2 * 0.5 * 22.4, 22.4, 1e-9) || 'volume');
add('limit-short3', (() => {
  const ch4 = 8.0;
  const o2 = 8.0;
  const nC = ch4 / 16;
  const nO = o2 / 32;
  const ext = Math.min(nC / 1, nO / 2);
  const co2 = ext * 44;
  const left = (nC - ext) * 16;
  return short({
    marks: 3,
    stem: r`${ch4} g of methane is burnt in ${o2} g of oxygen in a closed combustion cell: $\ce{CH4 + 2O2 -> CO2 + 2H2O}$ (C = 12, H = 1, O = 16). Find (i) the limiting reagent, (ii) the mass of carbon dioxide formed and (iii) the mass of the excess reagent left over.`,
    model: r`$n(\ce{CH4}) = ${ch4}/16 = ${nC.toFixed(2)}$ mol and $n(\ce{O2}) = ${o2}/32 = ${nO.toFixed(2)}$ mol. (i) Moles ÷ coefficient: methane ${nC.toFixed(2)}, oxygen ${(nO / 2).toFixed(3)}; oxygen is smaller, so oxygen is the limiting reagent. (ii) $n(\ce{CO2}) = ${(nO / 2).toFixed(3)}$ mol, so $m = ${(nO / 2).toFixed(3)} \times 44 = ${co2.toFixed(1)}$ g. (iii) Methane used $= ${(nO / 2).toFixed(3)}$ mol, so left $= (${nC.toFixed(2)} - ${(nO / 2).toFixed(3)}) \times 16 = ${left.toFixed(1)}$ g.`,
    sol: 'Moles ÷ coefficient identifies the limiting reagent.',
    scheme: [['(i) Oxygen is limiting', 1], ['(ii) 5.5 g of CO2', 1], ['(iii) 6.0 g of methane left', 1]],
    d: 3, c: 'application', t: [5],
  });
})(), () => near(0.25 / 2 * 44, 5.5, 1e-9) && near((0.5 - 0.125) * 16, 6, 1e-9) || 'values');
add('massvol-short3', (() => {
  const V = 6.72;
  const nO = V / VM;
  const nK = (2 / 3) * nO;
  const m = nK * 122.5;
  const kcl = nK * 74.5;
  return short({
    marks: 3,
    stem: r`A student wants 6.72 L of oxygen at STP by heating potassium chlorate: $\ce{2KClO3 -> 2KCl + 3O2}$ (KClO₃ = 122.5 g mol⁻¹, KCl = 74.5 g mol⁻¹). Calculate (i) the amount of oxygen needed, (ii) the mass of potassium chlorate to be heated and (iii) the mass of potassium chloride left.`,
    model: r`(i) $n(\ce{O2}) = ${V}/${VM} = ${nO.toFixed(2)}$ mol. (ii) $n(\ce{KClO3}) = ${nO.toFixed(2)} \times 2/3 = ${nK.toFixed(2)}$ mol, so $m = ${nK.toFixed(2)} \times 122.5 = ${m.toFixed(1)}$ g. (iii) $n(\ce{KCl}) = ${nK.toFixed(2)}$ mol, so $m = ${nK.toFixed(2)} \times 74.5 = ${kcl.toFixed(1)}$ g.`,
    sol: 'Mole ratio 2 : 3 between KClO3 and O2.',
    scheme: [['(i) 0.300 mol', 1], ['(ii) 24.5 g', 1], ['(iii) 14.9 g', 1]],
    d: 3, c: 'application', t: [5],
  });
})(), () => near((0.3 * 2) / 3 * 122.5, 24.5, 1e-9) || 'mass');
add('limit-long', (() => {
  const N2 = 28.0;
  const H2 = 4.0;
  const nN = N2 / 28;
  const nH = H2 / 2;
  const ext = Math.min(nN, nH / 3);
  const nh3 = 2 * ext;
  const mNH3 = nh3 * 17;
  const left = (nN - ext) * 28;
  const V = nh3 * VM;
  return long({
    stem: r`A reactor is charged with ${N2.toFixed(1)} g of nitrogen and ${H2.toFixed(1)} g of hydrogen (N = 14, H = 1): $\ce{N2 + 3H2 -> 2NH3}$.

(a) Show by calculation which reactant is the limiting reagent. [2]

(b) Calculate (i) the mass of ammonia formed, (ii) the mass of the excess reagent left, and (iii) the volume of ammonia at STP (molar volume ${VM} L). [3]`,
    model: r`(a) $n(\ce{N2}) = ${N2}/28 = ${nN.toFixed(2)}$ mol; $n(\ce{H2}) = ${H2}/2 = ${nH.toFixed(2)}$ mol. Moles ÷ coefficient: nitrogen ${nN.toFixed(2)}, hydrogen ${(nH / 3).toFixed(3)}. Hydrogen is smaller, so hydrogen is the limiting reagent. (b)(i) $n(\ce{NH3}) = ${nH.toFixed(2)} \times 2/3 = ${nh3.toFixed(3)}$ mol, so $m = ${nh3.toFixed(3)} \times 17 = ${mNH3.toFixed(1)}$ g. (ii) Nitrogen used $= ${ext.toFixed(3)}$ mol, so nitrogen left $= (${nN.toFixed(2)} - ${ext.toFixed(3)}) \times 28 = ${left.toFixed(2)}$ g. (iii) $V = ${nh3.toFixed(3)} \times ${VM} = ${V.toFixed(1)}$ L.`,
    sol: 'Moles ÷ coefficient; hydrogen limiting; yield from hydrogen.',
    scheme: [['(a) Moles of N2 and H2', 1], ['(a) Hydrogen identified as limiting with the comparison', 1], ['(b)(i) 22.7 g of NH3', 1], ['(b)(ii) 9.33 g of N2 left', 1], ['(b)(iii) 29.9 L of NH3', 1]],
    d: 4, c: 'application', t: [5],
  });
})(), () => near((2 * 2 / 3) * 17, 22.67, 0.001) && near((1 - 2 / 3) * 28, 9.33, 0.001) || 'values');
