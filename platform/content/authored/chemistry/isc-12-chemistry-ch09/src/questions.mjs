// ISC 12 Chemistry ch09 Potassium Permanganate and Potassium Dichromate — question bank (ISC style). Stems name
// their own reagents and data. MCQ keys are placed by the builder; AR keys planned: a b c a d. Numericals re-solved.
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const near = (a, b, rel = 0.005) => Math.abs(a - b) <= Math.max(1e-9, Math.abs(b) * rel);

// ---------------------------------------------------------------- t01 KMnO₄: structure and preparation
add('prep-mcq', mcq({
  stem: 'In the first stage of making KMnO₄, pyrolusite is fused with potassium hydroxide in air. The manganese-containing product is:',
  right: 'green K₂MnO₄, with manganese in the +6 state',
  wrong: ['purple KMnO₄, with manganese in the +7 state', 'brown Mn₂O₃, with manganese in the +3 state', 'colourless MnSO₄, with manganese in the +2 state'],
  sol: '2MnO₂ + 4KOH + O₂ → 2K₂MnO₄ + 2H₂O: green manganate, Mn +6 — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('shape-mcq', mcq({
  stem: 'The permanganate ion, MnO₄⁻, in a crystal of potassium permanganate has which shape?',
  right: 'Tetrahedral',
  wrong: ['Square planar', 'Octahedral', 'Trigonal pyramidal'],
  sol: 'Four oxygen atoms surround Mn tetrahedrally — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('ct-mcq', mcq({
  stem: 'A dilute solution of potassium permanganate is intensely purple, although Mn(VII) has no d electrons. The colour arises from:',
  right: 'charge transfer, in which an electron moves from oxygen to manganese on absorbing light',
  wrong: ['a d–d transition of a manganese 3d electron', 'an f–f transition', 'emission of light by excited potassium ions'],
  sol: 'With d⁰ there can be no d–d transition; the colour is due to ligand-to-metal charge transfer — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('heat-mcq', mcq({
  stem: 'Crystals of KMnO₄ are heated to about 513 K in a dry test tube; the gas evolved rekindles a glowing splint. The gas and the solid residue are:',
  right: 'oxygen; a mixture of K₂MnO₄ and MnO₂',
  wrong: ['chlorine; MnCl₂', 'oxygen; pure manganese metal', 'hydrogen; K₂O and MnO'],
  sol: '2KMnO₄ → K₂MnO₄ + MnO₂ + O₂ — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('electrolytic-mcq', mcq({
  stem: 'On an industrial scale, the green potassium manganate obtained from pyrolusite is converted into potassium permanganate by:',
  right: 'electrolytic oxidation in alkaline solution',
  wrong: ['reduction with hydrogen gas', 'heating with carbon', 'treatment with dilute hydrochloric acid'],
  sol: 'At the anode MnO₄²⁻ → MnO₄⁻ + e⁻; no manganese is wasted as MnO₂ — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('magnet-ar', ar({
  a: 'Potassium manganate is paramagnetic, whereas potassium permanganate is diamagnetic.',
  r: 'Manganese in manganate has one 3d electron, while manganese in permanganate has none.',
  key: 'a',
  sol: 'Both are true; one unpaired d electron (Mn +6, d¹) gives paramagnetism, d⁰ (Mn +7) gives diamagnetism — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('disprop-tf', tf({
  stem: 'When green potassium manganate solution is acidified, one-third of the manganese is converted into manganese dioxide.',
  key: 't',
  sol: 'True. 3MnO₄²⁻ + 4H⁺ → 2MnO₄⁻ + MnO₂ + 2H₂O: one of every three Mn becomes MnO₂.',
  d: 2, c: 'application', t: [1],
}));
add('mn6-fill', fill({
  stem: 'When pyrolusite is fused with potassium hydroxide in air, the oxidation state of manganese rises from +4 to +___.',
  acc: [['6', 'six']],
  sol: 'MnO₂ (+4) → K₂MnO₄ (**+6**).',
  d: 1, c: 'application', t: [1],
}));
add('kmno4-mass-num', num({
  marks: 2,
  stem: r`Acidified potassium manganate disproportionates: $\ce{3MnO4^2- + 4H+ -> 2MnO4- + MnO2 + 2H2O}$. What mass of KMnO₄ ($M = 158$) can be obtained from $0.45\ \text{mol}$ of K₂MnO₄ by this method?`,
  value: 47.4, tol: 0.2, unit: 'g',
  sol: r`$n(\ce{MnO4-}) = 0.45 \times 2 \div 3 = 0.30\ \text{mol}$; mass $= 0.30 \times 158 = 47.4\ \text{g}$.`,
  scheme: [['0.30 mol', 1], ['47.4 g', 1]],
  d: 3, c: 'application', t: [1],
}), () => near((0.45 * 2) / 3 * 158, 47.4) || 'mass');
add('prep-short', short({
  marks: 2,
  stem: 'Write balanced equations for the two stages in converting pyrolusite into potassium permanganate, using electrolytic oxidation in the second stage.',
  model: r`Stage 1 (fusion with KOH in air): $\ce{2MnO2 + 4KOH + O2 -> 2K2MnO4 + 2H2O}$. Stage 2 (electrolytic oxidation at the anode): $\ce{MnO4^2- -> MnO4- + e-}$ (hydrogen is evolved at the cathode: $\ce{2H2O + 2e- -> H2 + 2OH-}$).`,
  sol: 'Fusion; anodic oxidation.',
  scheme: [['Stage 1 equation', 1], ['Stage 2 equation', 1]],
  d: 2, c: 'application', t: [1],
}));
add('struct-short', short({
  marks: 2,
  stem: 'Compare the manganate and permanganate ions with respect to (a) the oxidation state and number of d electrons of manganese, and (b) their colours and the origin of the permanganate colour.',
  model: '(a) Manganate MnO₄²⁻: Mn +6, 3d¹. Permanganate MnO₄⁻: Mn +7, 3d⁰. (b) Manganate is dark green; permanganate is purple. The permanganate colour is due to charge transfer from oxygen to manganese, as there is no d electron for a d–d transition.',
  sol: '+6 d¹ green; +7 d⁰ purple by charge transfer.',
  scheme: [['(a) States and d counts', 1], ['(b) Colours and charge transfer', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('disprop-short3', short({
  marks: 3,
  stem: 'Potassium manganate solution is acidified with dilute sulphuric acid. (a) Write the balanced ionic equation. (b) Using oxidation states, explain why the reaction is a disproportionation. (c) Why does industry prefer electrolytic oxidation for this conversion?',
  model: r`(a) $\ce{3MnO4^2- + 4H+ -> 2MnO4- + MnO2 + 2H2O}$. (b) Mn in MnO₄²⁻ is +6; it becomes +7 in MnO₄⁻ (oxidised) and +4 in MnO₂ (reduced): the same species is both oxidised and reduced. (c) In disproportionation one-third of the manganese is lost as MnO₂; electrolytic oxidation converts all the manganate to permanganate.`,
  sol: 'Equation; +6 → +7 and +4; no waste in electrolysis.',
  scheme: [['(a) Balanced equation', 1], ['(b) Oxidation states', 1], ['(c) One-third wasted', 1]],
  d: 3, c: 'analysis', t: [1],
}));

// ---------------------------------------------------------------- t02 KMnO₄: oxidising action and titrations
add('medium-mcq', mcq({
  stem: 'Acidified KMnO₄ and neutral KMnO₄ are each added to an excess of a reducing agent. The manganese products are respectively:',
  right: 'Mn²⁺ and MnO₂',
  wrong: ['MnO₂ and Mn²⁺', 'MnO₄²⁻ and Mn²⁺', 'Mn²⁺ and MnO₄²⁻'],
  sol: 'Acid: 5 e⁻ → Mn²⁺; neutral: 3 e⁻ → MnO₂ — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('indicator-mcq', mcq({
  stem: 'In the titration of Mohr’s salt with KMnO₄ in dilute sulphuric acid, the end point is marked by:',
  right: 'the first permanent pale pink colour, as excess MnO₄⁻ is no longer reduced',
  wrong: ['a blue colour with starch', 'the disappearance of a green colour', 'the appearance of a yellow precipitate'],
  sol: 'Mn²⁺ is almost colourless, so the first excess drop of purple MnO₄⁻ gives a pale pink — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('hcl-mcq', mcq({
  stem: 'A student acidifies a KMnO₄ titration of iron(II) with hydrochloric acid instead of sulphuric acid. The titre obtained will be:',
  right: 'too high, because some permanganate oxidises chloride ions to chlorine',
  wrong: ['too low, because chloride ions reduce iron(III) back to iron(II)', 'unchanged, because HCl is a strong acid', 'zero, because no reaction occurs'],
  sol: 'Part of the KMnO₄ is used up oxidising Cl⁻, so more is needed — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('oxalic-warm-mcq', mcq({
  stem: 'In the titration of warm oxalic acid with KMnO₄, the first few drops are decolourised slowly but later drops are decolourised almost instantly. This is because:',
  right: 'Mn²⁺ ions formed in the reaction catalyse it (autocatalysis)',
  wrong: ['the solution cools as the titration proceeds', 'oxalic acid is used up', 'sulphuric acid catalyses the reaction only after some time'],
  sol: 'A product, Mn²⁺, acts as catalyst — option (@K).',
  d: 3, c: 'understanding', t: [2],
}));
add('alk-ki-mcq', mcq({
  stem: 'Hot alkaline potassium permanganate converts potassium iodide into a salt containing iodine in the +5 state. That salt is:',
  right: 'KIO₃',
  wrong: ['KIO₄', 'KI₃', 'KIO'],
  sol: '2MnO₄⁻ + I⁻ + H₂O → 2MnO₂ + IO₃⁻ + 2OH⁻: iodate, I +5 — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('h2s-mcq', mcq({
  stem: 'Hydrogen sulphide gas is bubbled through neutral KMnO₄ solution. A pale yellow solid and a brown precipitate form. These are:',
  right: 'sulphur and manganese dioxide',
  wrong: ['sulphur and manganese(II) sulphide', 'potassium sulphate and Mn²⁺', 'sulphur dioxide and manganate'],
  sol: '2MnO₄⁻ + 3H₂S → 2MnO₂ + 3S + 2OH⁻ + 2H₂O — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('acid-ar', ar({
  a: 'Permanganate titrations are carried out in dilute sulphuric acid.',
  r: 'Sulphuric acid is a dibasic acid.',
  key: 'b',
  sol: 'Both are true, but H₂SO₄ is chosen because it is neither oxidised (unlike HCl) nor an oxidant (unlike HNO₃), not because it is dibasic — option (b).',
  d: 3, c: 'analysis', t: [2],
}));
add('self-tf', tf({
  stem: 'A standard solution of potassium permanganate can be made by direct weighing, because the solid is available in a very pure state.',
  key: 'f',
  sol: 'False. KMnO₄ usually contains some MnO₂ and its solutions slowly decompose; it is standardised against oxalic acid or Mohr’s salt.',
  d: 2, c: 'understanding', t: [2],
}));
add('mn-e-fill', fill({
  stem: 'In neutral or faintly alkaline solution, each permanganate ion that oxidises hydrogen sulphide gains ___ electrons.',
  acc: [['3', 'three']],
  sol: 'MnO₄⁻ (+7) → MnO₂ (+4): **3** electrons.',
  d: 2, c: 'application', t: [2],
}));
add('medium-match', match({
  stem: 'Match each reaction of potassium permanganate with its main products.',
  pairs: [
    ['Acidified, with ferrous sulphate', 'Fe³⁺ and Mn²⁺'],
    ['Acidified, with oxalic acid', 'CO₂ and Mn²⁺'],
    ['Alkaline, with potassium iodide', 'IO₃⁻ and MnO₂'],
    ['Neutral, with hydrogen sulphide', 'S and MnO₂'],
  ],
  order: [2, 0, 3, 1],
  sol: 'FeSO₄ → Fe³⁺ + Mn²⁺; oxalic acid → CO₂ + Mn²⁺; alkaline KI → IO₃⁻ + MnO₂; H₂S → S + MnO₂.',
  d: 2, c: 'application', t: [2],
}));
add('oxalic-num', num({
  marks: 2,
  stem: r`$15.0\ \text{mL}$ of $0.050\ \text{M}$ oxalic acid is titrated, warm and in dilute H₂SO₄, with $0.020\ \text{M}$ KMnO₄. Calculate the volume of KMnO₄ needed, in mL.`,
  value: 15.0, tol: 0.1, unit: 'mL',
  sol: r`$n(\ce{H2C2O4}) = 0.050 \times 0.0150 = 7.5 \times 10^{-4}$; $n(\ce{MnO4-}) = 7.5 \times 10^{-4} \times 2 \div 5 = 3.0 \times 10^{-4}$; $V = 3.0 \times 10^{-4} \div 0.020 \times 1000 = 15.0\ \text{mL}$.`,
  scheme: [['Moles and 2 : 5 ratio', 1], ['15.0 mL', 1]],
  d: 2, c: 'application', t: [2],
}), () => near(((0.05 * 0.015 * 2) / 5 / 0.02) * 1000, 15.0) || 'v');
add('mohr-num', num({
  marks: 2,
  stem: r`What mass of Mohr’s salt, $\ce{FeSO4.(NH4)2SO4.6H2O}$ ($M = 392$), is oxidised by $15.0\ \text{mL}$ of $0.020\ \text{M}$ KMnO₄ in acid?`,
  value: 0.588, tol: 0.003, unit: 'g',
  sol: r`$n(\ce{MnO4-}) = 0.020 \times 0.0150 = 3.0 \times 10^{-4}$; $n(\ce{Fe^2+}) = 5 \times 3.0 \times 10^{-4} = 1.5 \times 10^{-3}$; mass $= 1.5 \times 10^{-3} \times 392 = 0.588\ \text{g}$.`,
  scheme: [['1 : 5 ratio and moles', 1], ['0.588 g', 1]],
  d: 3, c: 'application', t: [2],
}), () => near(0.02 * 0.015 * 5 * 392, 0.588) || 'mass');
add('eqmass-num', num({
  marks: 1,
  stem: r`Calculate the equivalent mass of KMnO₄ ($M = 158$) when it acts as an oxidising agent in acidic medium.`,
  value: 31.6, tol: 0.1, unit: null,
  sol: r`In acid each MnO₄⁻ gains 5 electrons: equivalent mass $= 158 \div 5 = 31.6$.`,
  scheme: [['31.6', 1]],
  d: 2, c: 'application', t: [2],
}), () => near(158 / 5, 31.6) || 'eq');
add('iodine-num', num({
  marks: 2,
  stem: r`$10.0\ \text{mL}$ of $0.020\ \text{M}$ KMnO₄ is added to excess potassium iodide in dilute sulphuric acid. Calculate the mass of iodine liberated. (I₂ = 254)`,
  value: 0.127, tol: 0.001, unit: 'g',
  sol: r`$\ce{2MnO4- + 10I- + 16H+ -> 2Mn^2+ + 5I2 + 8H2O}$. $n(\ce{MnO4-}) = 2.0 \times 10^{-4}$; $n(\ce{I2}) = 2.0 \times 10^{-4} \times 5 \div 2 = 5.0 \times 10^{-4}$; mass $= 5.0 \times 10^{-4} \times 254 = 0.127\ \text{g}$.`,
  scheme: [['2 : 5 ratio', 1], ['0.127 g', 1]],
  d: 3, c: 'application', t: [2],
}), () => near(((0.02 * 0.01 * 5) / 2) * 254, 0.127) || 'i2');
add('hcl-short', short({
  marks: 2,
  stem: 'Explain why titrations with KMnO₄ are carried out in dilute sulphuric acid rather than in hydrochloric acid or nitric acid.',
  model: 'Hydrochloric acid: KMnO₄ oxidises Cl⁻ to Cl₂, so part of the permanganate is consumed and the titre is too high. Nitric acid: it is itself an oxidising agent and may oxidise the reducing agent, giving a low titre. Dilute H₂SO₄ is neither oxidised nor an oxidant under these conditions.',
  sol: 'HCl oxidised; HNO₃ oxidant.',
  scheme: [['HCl: Cl⁻ oxidised to Cl₂', 1], ['HNO₃ is an oxidant', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('neutral-short', short({
  marks: 2,
  stem: 'Write balanced ionic equations for the oxidation of (a) potassium iodide by alkaline KMnO₄ and (b) hydrogen sulphide by neutral KMnO₄.',
  model: r`(a) $\ce{2MnO4- + I- + H2O -> 2MnO2 + IO3- + 2OH-}$. (b) $\ce{2MnO4- + 3H2S -> 2MnO2 + 3S + 2OH- + 2H2O}$.`,
  sol: 'Two balanced equations.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'application', t: [2],
}));
add('autocat-short', short({
  marks: 2,
  stem: 'Explain why the titration of oxalic acid with KMnO₄ is carried out at about 333 K, and why the decolourisation becomes faster as the titration proceeds.',
  model: 'At room temperature the reaction between MnO₄⁻ and oxalic acid is very slow, so the solution is warmed to about 333 K to increase the rate. Once some Mn²⁺ has formed, it catalyses the reaction (autocatalysis), so later drops are decolourised almost instantly.',
  sol: 'Slow at room temperature; Mn²⁺ autocatalysis.',
  scheme: [['Warm: slow reaction otherwise', 1], ['Mn²⁺ autocatalysis', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('purity-short3', short({
  marks: 3,
  stem: 'A 0.50 g sample of impure green vitriol, FeSO₄·7H₂O (M = 278), dissolved in dilute sulphuric acid, required 15.0 mL of 0.020 M KMnO₄. Calculate the percentage purity of the sample.',
  model: r`$n(\ce{MnO4-}) = 0.020 \times 0.0150 = 3.0 \times 10^{-4}$ mol. $n(\ce{Fe^2+}) = 5 \times 3.0 \times 10^{-4} = 1.5 \times 10^{-3}$ mol. Mass of FeSO₄·7H₂O $= 1.5 \times 10^{-3} \times 278 = 0.417$ g. Purity $= 0.417 \div 0.50 \times 100 \approx 83.4\%$.`,
  sol: 'About 83.4%.',
  scheme: [['Moles of MnO₄⁻ and Fe²⁺', 1], ['Mass 0.417 g', 1], ['83.4%', 1]],
  d: 4, c: 'application', t: [2],
}));
add('media-short3', short({
  marks: 3,
  stem: 'Compare the action of KMnO₄ as an oxidising agent in acidic, neutral and strongly alkaline media. For each, give the reduction half-equation and the number of electrons gained.',
  model: r`Acidic: $\ce{MnO4- + 8H+ + 5e- -> Mn^2+ + 4H2O}$ — 5 electrons. Neutral or faintly alkaline: $\ce{MnO4- + 2H2O + 3e- -> MnO2 + 4OH-}$ — 3 electrons. Strongly alkaline: $\ce{MnO4- + e- -> MnO4^2-}$ — 1 electron.`,
  sol: '5, 3 and 1 electrons.',
  scheme: [['Acidic', 1], ['Neutral', 1], ['Strongly alkaline', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('acid-eq-short3', short({
  marks: 3,
  stem: 'Write balanced ionic equations for the oxidation by acidified KMnO₄ of (a) iodide ions to iodine, (b) sulphur dioxide to sulphate ions, and (c) nitrite ions to nitrate ions.',
  model: r`(a) $\ce{2MnO4- + 10I- + 16H+ -> 2Mn^2+ + 5I2 + 8H2O}$. (b) $\ce{2MnO4- + 5SO2 + 2H2O -> 2Mn^2+ + 5SO4^2- + 4H+}$. (c) $\ce{2MnO4- + 5NO2- + 6H+ -> 2Mn^2+ + 5NO3- + 3H2O}$.`,
  sol: 'Three balanced equations.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'application', t: [2],
}));

// ---------------------------------------------------------------- t03 K₂Cr₂O₇: structure and preparation
add('chromite-mcq', mcq({
  stem: 'When chromite, FeCr₂O₄, is roasted with sodium carbonate in a current of air, the oxidation state of chromium changes from:',
  right: '+3 to +6',
  wrong: ['+2 to +6', '+3 to +7', '+6 to +3'],
  sol: 'In FeCr₂O₄ (Fe +2) Cr is +3; in Na₂CrO₄ it is +6 — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('kcl-mcq', mcq({
  stem: 'Potassium chloride is added to sodium dichromate solution in the last step of making K₂Cr₂O₇ because:',
  right: 'K₂Cr₂O₇ is less soluble than Na₂Cr₂O₇ and crystallises out',
  wrong: ['KCl oxidises chromium to the +6 state', 'KCl removes iron impurities as FeCl₃', 'sodium dichromate decomposes on heating'],
  sol: 'Double decomposition; the less soluble potassium salt crystallises on cooling — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('bridge-mcq', mcq({
  stem: 'In the dichromate ion, Cr₂O₇²⁻, how many oxygen atoms bridge the two chromium atoms?',
  right: '1',
  wrong: ['2', '0', '3'],
  sol: 'Two CrO₄ tetrahedra share one corner oxygen — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('fe2o3-mcq', mcq({
  stem: 'During the roasting of chromite with sodium carbonate in air, the iron of the ore ends up as:',
  right: 'insoluble iron(III) oxide, Fe₂O₃',
  wrong: ['soluble sodium ferrate', 'iron metal', 'iron(II) carbonate'],
  sol: '4FeCr₂O₄ + 8Na₂CO₃ + 7O₂ → 8Na₂CrO₄ + 2Fe₂O₃ + 8CO₂; Fe₂O₃ is filtered off — option (@K).',
  d: 2, c: 'recall', t: [3],
}));
add('chromite-ar', ar({
  a: 'Potassium dichromate, rather than sodium dichromate, is used as a primary standard.',
  r: 'Potassium dichromate is more soluble in water than sodium dichromate.',
  key: 'c',
  sol: 'A is true (the sodium salt is hygroscopic). R is false: the potassium salt is less soluble, which is why it crystallises — option (c).',
  d: 3, c: 'analysis', t: [3],
}));
add('bond-tf', tf({
  stem: 'In the dichromate ion, all seven chromium–oxygen bonds have the same length.',
  key: 'f',
  sol: 'False. The six terminal Cr–O bonds are equal (about 163 pm); the two bonds to the bridging oxygen are longer (about 179 pm).',
  d: 2, c: 'understanding', t: [3],
}));
add('angle-fill', fill({
  stem: 'The Cr–O–Cr bond angle at the bridging oxygen in the dichromate ion is about ___ degrees.',
  acc: [['126']],
  sol: 'About **126°**.',
  d: 1, c: 'recall', t: [3],
}));
add('oxygen-num', num({
  marks: 1,
  stem: r`In the roasting $\ce{4FeCr2O4 + 8Na2CO3 + 7O2 -> 8Na2CrO4 + 2Fe2O3 + 8CO2}$, how many moles of oxygen are needed to roast $2.0\ \text{mol}$ of chromite?`,
  value: 3.5, tol: 0.01, unit: 'mol',
  sol: r`$n(\ce{O2}) = 2.0 \times 7 \div 4 = 3.5\ \text{mol}$.`,
  scheme: [['3.5 mol', 1]],
  d: 2, c: 'application', t: [3],
}), () => near((2 * 7) / 4, 3.5) || 'o2');
add('prep2-short', short({
  marks: 2,
  stem: 'Write balanced equations for converting sodium chromate into potassium dichromate, naming the reagent in each step.',
  model: r`Step 1 (dilute sulphuric acid): $\ce{2Na2CrO4 + H2SO4 -> Na2Cr2O7 + Na2SO4 + H2O}$. Step 2 (potassium chloride): $\ce{Na2Cr2O7 + 2KCl -> K2Cr2O7 + 2NaCl}$.`,
  sol: 'Acidify; add KCl.',
  scheme: [['Acidification equation', 1], ['KCl equation', 1]],
  d: 2, c: 'application', t: [3],
}));
add('struct2-short', short({
  marks: 2,
  stem: 'Describe the shapes of the chromate and dichromate ions and state the oxidation state of chromium in each.',
  model: 'Chromate CrO₄²⁻: tetrahedral, Cr at the centre of four O. Dichromate Cr₂O₇²⁻: two CrO₄ tetrahedra sharing one corner (bridging) oxygen, Cr–O–Cr about 126°. Chromium is +6 in both.',
  sol: 'Tetrahedral; two tetrahedra sharing O; +6.',
  scheme: [['Shapes', 1], ['+6 in both', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('chromite-short3', short({
  marks: 3,
  stem: 'The roasting of chromite is represented by: FeCr₂O₄ + Na₂CO₃ + O₂ → Na₂CrO₄ + Fe₂O₃ + CO₂. (a) Balance the equation. (b) How is the iron(III) oxide separated from the sodium chromate? (c) Which elements are oxidised and which is reduced?',
  model: r`(a) $\ce{4FeCr2O4 + 8Na2CO3 + 7O2 -> 8Na2CrO4 + 2Fe2O3 + 8CO2}$. (b) The roasted mass is extracted with water: sodium chromate dissolves and the insoluble Fe₂O₃ is filtered off. (c) Iron (+2 → +3) and chromium (+3 → +6) are oxidised; oxygen (0 → −2) is reduced.`,
  sol: 'Balanced; water extraction and filtration; Fe and Cr oxidised, O₂ reduced.',
  scheme: [['(a) Balanced', 1], ['(b) Leach with water, filter', 1], ['(c) Fe, Cr oxidised; O reduced', 1]],
  d: 3, c: 'analysis', t: [3],
}));

// ---------------------------------------------------------------- t04 K₂Cr₂O₇: oxidising action, titrations, pH
add('ph-mcq', mcq({
  stem: 'A few drops of sodium hydroxide solution are added to orange potassium dichromate solution. The solution turns:',
  right: 'yellow, as chromate ions form; chromium stays +6',
  wrong: ['green, as Cr³⁺ ions form', 'colourless, as Cr²⁺ ions form', 'purple, as permanganate-like ions form'],
  sol: 'Cr₂O₇²⁻ + 2OH⁻ → 2CrO₄²⁻ + H₂O: an acid–base change, not redox — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('cr-electrons-mcq', mcq({
  stem: 'When acidified K₂Cr₂O₇ oxidises sulphur dioxide to sulphate, each dichromate ion:',
  right: 'gains six electrons and forms two Cr³⁺ ions',
  wrong: ['gains three electrons and forms one Cr³⁺ ion', 'loses six electrons and forms CrO₄²⁻', 'gains five electrons and forms Cr²⁺'],
  sol: 'Cr₂O₇²⁻ + 14H⁺ + 6e⁻ → 2Cr³⁺ + 7H₂O — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('standard-mcq', mcq({
  stem: 'Which statement correctly compares K₂Cr₂O₇ with KMnO₄ as a volumetric reagent?',
  right: 'K₂Cr₂O₇ is a primary standard but needs an indicator; KMnO₄ is its own indicator but is not a primary standard',
  wrong: ['Both are primary standards and both are self-indicators', 'KMnO₄ is a primary standard; K₂Cr₂O₇ is its own indicator', 'Neither can be used in acidic solution'],
  sol: 'Option (@K).',
  d: 3, c: 'understanding', t: [4],
}));
add('so2-mcq', mcq({
  stem: 'Filter paper soaked in acidified potassium dichromate turns from orange to green when held in a gas. The gas is most likely:',
  right: 'sulphur dioxide',
  wrong: ['carbon dioxide', 'oxygen', 'nitrogen'],
  sol: 'SO₂ reduces Cr₂O₇²⁻ to green Cr³⁺ and is oxidised to sulphate — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('fe-ratio-mcq', mcq({
  stem: 'How many moles of Fe²⁺ ions are oxidised by 0.50 mol of Cr₂O₇²⁻ ions in acidic solution?',
  right: '3.0 mol',
  wrong: ['0.50 mol', '1.5 mol', '6.0 mol'],
  sol: 'Ratio 1 : 6, so 0.50 × 6 = 3.0 mol — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('diphenyl-mcq', mcq({
  stem: 'In the estimation of Fe²⁺ with standard K₂Cr₂O₇, diphenylamine is added because:',
  right: 'the green colour of the Cr³⁺ formed hides the colour change, so an internal indicator is needed',
  wrong: ['it catalyses the reaction between Fe²⁺ and dichromate', 'it prevents the oxidation of chloride ions', 'it converts Fe³⁺ back to Fe²⁺'],
  sol: 'Dichromate is not a self-indicator; diphenylamine gives a sharp violet colour at the end point — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('redox-ar', ar({
  a: 'The conversion of yellow chromate into orange dichromate on adding acid is not a redox reaction.',
  r: 'Chromium has the oxidation state +6 in both the chromate and the dichromate ion.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [4],
}));
add('strength-ar', ar({
  a: 'Acidified potassium dichromate is a stronger oxidising agent than acidified potassium permanganate.',
  r: 'The standard potential of Cr₂O₇²⁻/Cr³⁺ (+1.33 V) is lower than that of MnO₄⁻/Mn²⁺ (+1.52 V).',
  key: 'd',
  sol: 'A is false: the lower potential means dichromate is the weaker oxidant. R is true — option (d).',
  d: 3, c: 'analysis', t: [4],
}));
add('hcl-tf', tf({
  stem: 'Hydrochloric acid may be used to acidify a potassium dichromate titration of iron(II).',
  key: 't',
  sol: 'True. Under titration conditions dichromate does not oxidise chloride ions.',
  d: 2, c: 'understanding', t: [4],
}));
add('green-fill', fill({
  stem: 'When acidified potassium dichromate oxidises iron(II), the orange colour changes to green because ___ ions are formed.',
  acc: [['Cr³⁺', 'Cr3+', 'chromium(III)', 'chromium (III)', 'chromium']],
  sol: 'Green **Cr³⁺** (chromium(III)) ions.',
  d: 1, c: 'recall', t: [4],
}));
add('molarity-num', num({
  marks: 2,
  stem: r`$4.90\ \text{g}$ of potassium dichromate ($M = 294$) is dissolved in water and made up to $500\ \text{mL}$. Calculate the molarity of the solution.`,
  value: 0.0333, tol: 0.0002, unit: 'M',
  sol: r`$n = 4.90 \div 294 \approx 0.01667\ \text{mol}$; molarity $= 4.90 \div 294 \div 0.500 \approx 0.0333\ \text{M}$.`,
  scheme: [['Moles', 1], ['0.0333 M', 1]],
  d: 2, c: 'application', t: [4],
}), () => near(4.9 / 294 / 0.5, 0.0333, 0.002) || 'M');
add('eq-cr-num', num({
  marks: 1,
  stem: r`Calculate the equivalent mass of potassium dichromate ($M = 294$) when it acts as an oxidising agent in acidic solution.`,
  value: 49, tol: 0.1, unit: null,
  sol: r`Each Cr₂O₇²⁻ gains 6 electrons: equivalent mass $= 294 \div 6 = 49$.`,
  scheme: [['49', 1]],
  d: 2, c: 'application', t: [4],
}), () => near(294 / 6, 49) || 'eq');
add('fe-cr-num', num({
  marks: 2,
  stem: r`What volume of $0.0200\ \text{M}$ K₂Cr₂O₇ is needed to oxidise $30.0\ \text{mL}$ of $0.100\ \text{M}$ FeSO₄ in acid? Give your answer in mL.`,
  value: 25.0, tol: 0.1, unit: 'mL',
  sol: r`$n(\ce{Fe^2+}) = 0.100 \times 0.0300 = 3.0 \times 10^{-3}$; $n(\ce{Cr2O7^2-}) = 3.0 \times 10^{-3} \div 6 = 5.0 \times 10^{-4}$; $V = 5.0 \times 10^{-4} \div 0.0200 \times 1000 = 25.0\ \text{mL}$.`,
  scheme: [['1 : 6 ratio and moles', 1], ['25.0 mL', 1]],
  d: 2, c: 'application', t: [4],
}), () => near((0.1 * 0.03) / 6 / 0.02 * 1000, 25.0) || 'v');
add('ph-short', short({
  marks: 2,
  stem: 'A solution of chromium(VI) is yellow at pH 10 but orange at pH 3. Write the equilibrium involved and use Le Chatelier’s principle to explain the colour change.',
  model: r`$\ce{2CrO4^2- + 2H+ <=> Cr2O7^2- + H2O}$ (yellow ⇌ orange). At pH 3 the high [H⁺] shifts the equilibrium to the right, giving orange dichromate. At pH 10, OH⁻ removes H⁺, shifting it to the left, so yellow chromate predominates. Chromium stays +6.`,
  sol: 'Equilibrium; H⁺ shifts right, OH⁻ shifts left.',
  scheme: [['Equilibrium equation', 1], ['Le Chatelier explanation', 1]],
  d: 2, c: 'application', t: [4],
}));
add('so2-short', short({
  marks: 2,
  stem: 'Write the balanced ionic equation for the reaction of acidified potassium dichromate with sulphur dioxide, and state the colour change seen.',
  model: r`$\ce{Cr2O7^2- + 3SO2 + 2H+ -> 2Cr^3+ + 3SO4^2- + H2O}$. Orange changes to green.`,
  sol: 'Equation; orange → green.',
  scheme: [['Balanced equation', 1], ['Orange to green', 1]],
  d: 2, c: 'application', t: [4],
}));
add('cr-eq-short3', short({
  marks: 3,
  stem: 'Write balanced ionic equations for the oxidation by acidified K₂Cr₂O₇ of (a) hydrogen sulphide, (b) tin(II) ions and (c) nitrite ions.',
  model: r`(a) $\ce{Cr2O7^2- + 3H2S + 8H+ -> 2Cr^3+ + 3S + 7H2O}$. (b) $\ce{Cr2O7^2- + 3Sn^2+ + 14H+ -> 2Cr^3+ + 3Sn^4+ + 7H2O}$. (c) $\ce{Cr2O7^2- + 3NO2- + 8H+ -> 2Cr^3+ + 3NO3- + 4H2O}$.`,
  sol: 'Three balanced equations.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'application', t: [4],
}));
add('compare-short3', short({
  marks: 3,
  stem: 'Give three differences between potassium permanganate and potassium dichromate as volumetric reagents in acidic solution.',
  model: '(i) KMnO₄ gains 5 e⁻ per ion (→ Mn²⁺); K₂Cr₂O₇ gains 6 e⁻ per ion (→ 2Cr³⁺). (ii) KMnO₄ is a self-indicator; K₂Cr₂O₇ needs an indicator such as diphenylamine. (iii) K₂Cr₂O₇ is a primary standard; KMnO₄ must be standardised. (Also: HCl cannot be used with KMnO₄ but can with K₂Cr₂O₇; KMnO₄ is the stronger oxidant.)',
  sol: 'Electrons, indicator, primary standard.',
  scheme: [['Difference 1', 1], ['Difference 2', 1], ['Difference 3', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('fe-wire-short3', short({
  marks: 3,
  stem: '2.00 g of an iron alloy was dissolved in dilute acid (all iron as Fe²⁺) and made up to 250 mL. 25.0 mL of this solution required 18.0 mL of 0.0200 M K₂Cr₂O₇. Calculate the percentage of iron in the alloy. (Fe = 56)',
  model: r`$n(\ce{Cr2O7^2-}) = 0.0200 \times 0.0180 = 3.6 \times 10^{-4}$ mol. $n(\ce{Fe^2+})$ in 25.0 mL $= 6 \times 3.6 \times 10^{-4} = 2.16 \times 10^{-3}$ mol; in 250 mL $= 2.16 \times 10^{-2}$ mol. Mass $= 2.16 \times 10^{-2} \times 56 \approx 1.21$ g. Percentage $= 1.21 \div 2.00 \times 100 \approx 60.5\%$.`,
  sol: 'About 60.5%.',
  scheme: [['Moles of dichromate and Fe²⁺', 1], ['Scale to 250 mL; mass', 1], ['≈ 60.5%', 1]],
  d: 4, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- long answers
add('kmno4-long', long({
  stem: '(a) Name the ore from which potassium permanganate is made and write equations for its preparation, showing the conversion of manganate to permanganate by disproportionation. [2]\n\n(b) State the shape of the permanganate ion and explain its colour. [1]\n\n(c) Write the reduction half-equations of permanganate in acidic and in neutral solution, and calculate the equivalent mass of KMnO₄ (M = 158) in each medium. [2]',
  model: r`(a) Pyrolusite, MnO₂. $\ce{2MnO2 + 4KOH + O2 -> 2K2MnO4 + 2H2O}$; then $\ce{3MnO4^2- + 4H+ -> 2MnO4- + MnO2 + 2H2O}$.

(b) Tetrahedral. Mn(VII) is d⁰, so the intense purple colour is due to charge transfer from oxygen to manganese.

(c) Acid: $\ce{MnO4- + 8H+ + 5e- -> Mn^2+ + 4H2O}$; equivalent mass $= 158 \div 5 = 31.6$. Neutral: $\ce{MnO4- + 2H2O + 3e- -> MnO2 + 4OH-}$; equivalent mass $= 158 \div 3 \approx 52.7$.`,
  sol: 'Pyrolusite; tetrahedral, charge transfer; 31.6 and 52.7.',
  scheme: [['(a) Ore and two equations', 2], ['(b) Shape and charge transfer', 1], ['(c) Half-equations', 1], ['(c) 31.6 and 52.7', 1]],
  d: 3, c: 'application', t: [1, 2],
}));
add('titr-long', long({
  stem: '(a) Explain why KMnO₄ needs no indicator and why dilute sulphuric acid is used to acidify the titration. [1½]\n\n(b) 1.26 g of oxalic acid dihydrate, H₂C₂O₄·2H₂O (M = 126), is dissolved and made up to 250 mL. 25.0 mL of this solution, warmed and acidified, required 20.0 mL of a KMnO₄ solution. Calculate the molarity of the KMnO₄ solution. [2½]\n\n(c) What is autocatalysis? Illustrate with this titration. [1]',
  model: r`(a) Mn²⁺ is almost colourless, so the first excess drop of purple MnO₄⁻ gives a permanent pink at the end point. Dilute H₂SO₄ is used because HCl would be oxidised to Cl₂ and HNO₃ is itself an oxidant.

(b) $n$(oxalic acid) $= 1.26 \div 126 = 0.0100$ mol in 250 mL, i.e. 0.0400 M. In 25.0 mL: $1.00 \times 10^{-3}$ mol. $n(\ce{MnO4-}) = 1.00 \times 10^{-3} \times 2 \div 5 = 4.0 \times 10^{-4}$ mol. Molarity $= 4.0 \times 10^{-4} \div 0.0200 = 0.020$ M.

(c) Catalysis of a reaction by one of its own products: Mn²⁺ formed from MnO₄⁻ speeds up the reaction with oxalic acid, so decolourisation becomes faster as the titration proceeds.`,
  sol: 'Self-indicator; H₂SO₄; 0.020 M; Mn²⁺ autocatalysis.',
  scheme: [['(a) Self-indicator and acid choice', 1.5], ['(b) Moles of oxalic acid', 1], ['(b) Ratio 2 : 5', 0.5], ['(b) 0.020 M', 1], ['(c) Autocatalysis', 1]],
  d: 4, c: 'application', t: [2],
}));
add('k2cr2o7-long', long({
  stem: '(a) Write balanced equations for the three stages by which potassium dichromate is obtained from chromite, naming the condition or reagent of each stage. [3]\n\n(b) Why is potassium dichromate, and not sodium dichromate, used as a primary standard? [1]\n\n(c) State the shape around each chromium atom and the Cr–O–Cr angle in the dichromate ion. [1]',
  model: r`(a) Roasting with sodium carbonate in air: $\ce{4FeCr2O4 + 8Na2CO3 + 7O2 -> 8Na2CrO4 + 2Fe2O3 + 8CO2}$. Acidification with dilute H₂SO₄: $\ce{2Na2CrO4 + H2SO4 -> Na2Cr2O7 + Na2SO4 + H2O}$. Adding KCl: $\ce{Na2Cr2O7 + 2KCl -> K2Cr2O7 + 2NaCl}$.

(b) Sodium dichromate is hygroscopic, so it cannot be weighed accurately; potassium dichromate is pure, non-hygroscopic and gives stable solutions.

(c) Each Cr is tetrahedrally surrounded by four O atoms; the two tetrahedra share one O, with a Cr–O–Cr angle of about 126°.`,
  sol: 'Three equations; Na salt hygroscopic; tetrahedral, 126°.',
  scheme: [['(a) Roasting', 1], ['(a) Acidification', 1], ['(a) KCl', 1], ['(b) Hygroscopic sodium salt', 1], ['(c) Tetrahedral, 126°', 1]],
  d: 2, c: 'application', t: [3],
}));
add('cr-long', long({
  stem: '(a) Write the equilibrium between chromate and dichromate ions and explain the effect of adding acid and alkali. [1½]\n\n(b) Write the two half-equations and the overall ionic equation for the oxidation of iron(II) by acidified dichromate. [1½]\n\n(c) 0.392 g of Mohr’s salt, FeSO₄·(NH₄)₂SO₄·6H₂O (M = 392), is dissolved in dilute acid. What volume of 0.0100 M K₂Cr₂O₇ is required to oxidise it completely? [2]',
  model: r`(a) $\ce{2CrO4^2- + 2H+ <=> Cr2O7^2- + H2O}$. Acid shifts the equilibrium right (yellow → orange); alkali removes H⁺ and shifts it left (orange → yellow). Cr remains +6.

(b) $\ce{Cr2O7^2- + 14H+ + 6e- -> 2Cr^3+ + 7H2O}$; $\ce{Fe^2+ -> Fe^3+ + e-}$ (× 6). Overall: $\ce{Cr2O7^2- + 6Fe^2+ + 14H+ -> 2Cr^3+ + 6Fe^3+ + 7H2O}$.

(c) $n(\ce{Fe^2+}) = 0.392 \div 392 = 1.00 \times 10^{-3}$ mol. $n(\ce{Cr2O7^2-}) = 1.00 \times 10^{-3} \div 6 \approx 1.67 \times 10^{-4}$ mol. $V = 1.67 \times 10^{-4} \div 0.0100 \approx 0.0167$ L, about 16.7 mL.`,
  sol: 'Equilibrium; half-equations; about 16.7 mL.',
  scheme: [['(a) Equilibrium and effect of pH', 1.5], ['(b) Half-equations and overall', 1.5], ['(c) Moles', 1], ['(c) ≈ 16.7 mL', 1]],
  d: 3, c: 'application', t: [4],
}));
add('compare-long', long({
  stem: '(a) Tabulate five differences between KMnO₄ and K₂Cr₂O₇: colour, oxidation state of the metal, electrons gained per ion in acid, indicator needed, and whether a primary standard. [2½]\n\n(b) Calculate the equivalent mass of each in acidic medium (KMnO₄ = 158, K₂Cr₂O₇ = 294). [1]\n\n(c) Why must a KMnO₄ solution be standardised before use, and against what? [1½]',
  model: '(a) KMnO₄: purple; Mn +7; 5 e⁻ (→ Mn²⁺); self-indicator; not a primary standard. K₂Cr₂O₇: orange; Cr +6; 6 e⁻ (→ 2Cr³⁺); diphenylamine indicator; primary standard.\n\n(b) KMnO₄: 158 ÷ 5 = 31.6. K₂Cr₂O₇: 294 ÷ 6 = 49.\n\n(c) Solid KMnO₄ usually contains some MnO₂, and its solutions slowly decompose (in light and on contact with organic matter), so the exact concentration is not known from the mass weighed. It is standardised against a primary standard such as oxalic acid or Mohr’s salt.',
  sol: 'Table; 31.6 and 49; MnO₂ impurity, decomposition; oxalic acid.',
  scheme: [['(a) Five differences', 2.5], ['(b) 31.6 and 49', 1], ['(c) Reason and standard', 1.5]],
  d: 2, c: 'understanding', t: [2, 4],
}));
