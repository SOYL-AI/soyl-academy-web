// ISC 11 Chemistry ch14 Ionic Equilibrium: Acids, Bases and pH: question bank (ISC style). Constants (298 K): Ka(CH3COOH) 1.8e-5, Kb(NH3) 1.8e-5, Kw 1.0e-14;
// Ka(HCOOH) 1.8e-4, Ka(HNO2) 4.5e-4, Ka(C6H5COOH) 6.5e-5, Ka(HCN) 4.9e-10; H3PO4 Ka1 7.5e-3, Ka2 6.2e-8, Ka3 4.8e-13; Kw 5.5e-14 at 323 K, 5.1e-13 at 373 K.
// Indicator ranges: methyl orange 3.1-4.4, methyl red 4.4-6.2, bromothymol blue 6.0-7.6, phenolphthalein 8.3-10.0. Hydrolysis, buffers and Ksp belong to ch15.
// Assertion-reason keys: a b c d c a.
import { mk, add, r } from './lib.mjs';
import { KA, KB, PHOS, KW_T, alphaApprox, alphaExact, hExact, hApprox, phWASB, phSASB, phWBSA, near, f0, f1, f2, f3, f4, ex, log10 } from './data.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const pH = (h) => -log10(h);

// ================================================================ t01 electrolytes, degree of ionisation
add('elec-mcq', mcq({
  stem: 'A student tests the conductivity of four 0.1 mol L⁻¹ aqueous solutions with a bulb and battery. Which solute is a non-electrolyte, so that the bulb stays dark?',
  right: 'urea (carbamide)',
  wrong: ['sodium chloride', 'ethanoic acid', 'ammonium hydroxide'],
  sol: 'Urea dissolves as molecules and gives no ions, so the solution does not conduct. Sodium chloride is a strong electrolyte; ethanoic acid and ammonium hydroxide are weak electrolytes that give a few ions — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('weak-mcq', mcq({
  stem: 'Which pair consists of one strong electrolyte and one weak electrolyte in water?',
  right: 'nitric acid and aqueous ammonia',
  wrong: ['sodium hydroxide and potassium chloride', 'ethanoic acid and carbonic acid', 'glucose and urea'],
  sol: 'Nitric acid is completely ionised (strong); aqueous ammonia is only slightly ionised (weak). The other pairs are strong + strong, weak + weak, and non-electrolyte + non-electrolyte — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('alpha-mcq', (() => {
  const h = 0.10 * 0.015;
  return mcq({
    stem: 'A 0.10 mol L⁻¹ solution of a weak monobasic acid in a school laboratory is found to be 1.5% ionised. The hydrogen ion concentration is:',
    right: `${ex(h, 2)} mol L⁻¹`,
    wrong: ['1.5 × 10⁻² mol L⁻¹', '1.5 × 10⁻⁴ mol L⁻¹', '0.10 mol L⁻¹'],
    sol: `[H⁺] = Cα = 0.10 × 0.015 = ${ex(h, 2)} mol L⁻¹ — option (@K).`,
    d: 2, c: 'understanding', t: [1],
  });
})(), () => near(0.1 * 0.015, 1.5e-3) || 'alpha-mcq');
add('alphaup-mcq', mcq({
  stem: 'The degree of ionisation of a weak electrolyte such as ethanoic acid in water increases when:',
  right: 'the solution is diluted at constant temperature',
  wrong: ['the solution is cooled at constant concentration', 'more of the acid is dissolved in the same volume', 'the pressure above the solution is raised'],
  sol: 'On dilution there is more solvent per molecule of acid, and a larger fraction ionises (Ostwald\'s dilution law, α ∝ 1/√C). More acid in the same volume lowers α, cooling lowers it slightly, and pressure has no effect on a solution — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('elec-ar', ar({
  a: 'At the same concentration, aqueous hydrochloric acid is a better conductor of electricity than aqueous ethanoic acid.',
  r: 'Hydrochloric acid is completely ionised in water and so gives many more ions per litre.',
  key: 'a',
  sol: 'Both statements are true. Conductance depends on the number of ions; HCl is a strong electrolyte (α ≈ 1) while ethanoic acid is weak (α ≈ 0.01 at 0.1 mol L⁻¹), and R explains A — option (a).',
  d: 2, c: 'understanding', t: [1],
}));
add('sugar-tf', tf({
  stem: 'An aqueous solution of glucose conducts electricity because glucose molecules ionise in water to a small extent.',
  key: 'f',
  sol: 'False. Glucose is a non-electrolyte: it dissolves as neutral molecules and gives no ions, so its solution does not conduct.',
  d: 1, c: 'understanding', t: [1],
}));
add('elec-short2', short({
  marks: 2,
  stem: 'Distinguish between a strong electrolyte and a weak electrolyte in water, giving one example of each.',
  model: 'A strong electrolyte is completely (or almost completely) ionised in aqueous solution, so there are no molecules of it in solution (for example HCl, NaOH, NaCl). A weak electrolyte is ionised only to a small extent, so molecules and ions are in equilibrium (for example CH₃COOH, NH₄OH).',
  sol: 'Strong: fully ionised (HCl); weak: partly ionised, equilibrium with molecules (CH₃COOH).',
  scheme: [['Strong electrolyte: complete ionisation, with an example', 1], ['Weak electrolyte: partial ionisation and equilibrium, with an example', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('alpha-short3', short({
  marks: 3,
  stem: 'Define the degree of ionisation of a weak electrolyte. State three factors on which it depends, and say how it changes with each.',
  model: 'The degree of ionisation α is the fraction of the total number of moles of the electrolyte that is present as ions at equilibrium (α = moles ionised / moles dissolved). It depends on (i) the nature of the electrolyte (a stronger acid has a larger α), (ii) the concentration: α increases on dilution, and (iii) the temperature: α increases as the temperature rises. The nature of the solvent also matters (a solvent of high dielectric constant such as water increases α).',
  sol: 'α = fraction ionised; depends on nature, concentration (increases on dilution), temperature (increases).',
  scheme: [['Definition of α as a fraction', 1], ['Dilution increases α, with the reason or the law', 1], ['Nature of the electrolyte and temperature effects', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('electrolyte-long', (() => {
  const C = 0.050, a = 0.020, ka = (C * a * a) / (1 - a), h = C * a;
  return long({
    stem: String.raw`(a) A student has aqueous solutions of HCl, glucose, NH₄OH, NaOH, CH₃COOH, urea and KNO₃. Classify them as strong electrolytes, weak electrolytes and non-electrolytes. [2]

(b) Define the degree of ionisation and state two factors that change it. [1]

(c) A 0.050 mol L⁻¹ solution of a weak monobasic acid HA is 2.0% ionised (given). Calculate $[\text{H}^+]$ and the ionisation constant $K_a$, using $K_a = \dfrac{C\alpha^2}{1-\alpha}$. [2]`,
    model: `(a) Strong: HCl, NaOH, KNO₃. Weak: NH₄OH, CH₃COOH. Non-electrolytes: glucose, urea.

(b) The degree of ionisation is the fraction of the dissolved electrolyte present as ions at equilibrium; it depends on the nature of the electrolyte, the concentration (increases on dilution) and the temperature.

(c) [H⁺] = Cα = 0.050 × 0.020 = ${ex(h, 2)} mol L⁻¹. K_a = Cα² / (1 − α) = 0.050 × (0.020)² / 0.98 = ${ex(ka, 2)} (about 2.0 × 10⁻⁵ using 1 − α ≈ 1).`,
    sol: `(c) [H⁺] = ${ex(h, 2)} mol L⁻¹; K_a = ${ex(ka, 2)}.`,
    scheme: [['(a) Strong electrolytes correctly placed', 1], ['(a) Weak electrolytes and non-electrolytes correctly placed', 1], ['(b) Definition and two factors', 1], ['(c) [H⁺] = Cα = 1.0 × 10⁻³ mol L⁻¹', 1], ['(c) K_a ≈ 2.0 × 10⁻⁵', 1]],
    d: 2, c: 'application', t: [1, 3],
  });
})(), () => near((0.05 * 0.02 ** 2) / 0.98, 2.04e-5, 0.01) || 'electrolyte-long');

// ================================================================ t02 acid-base concepts
add('conj-mcq', mcq({
  stem: 'In an aqueous solution of sodium carbonate, the carbonate ion accepts a proton from water. The conjugate acid of the carbonate ion is:',
  right: String.raw`$\ce{HCO3-}$`,
  wrong: [String.raw`$\ce{H2CO3}$`, String.raw`$\ce{CO2}$`, String.raw`$\ce{OH-}$`],
  sol: 'The conjugate acid of a base is the species formed when the base gains one proton: CO₃²⁻ + H⁺ gives HCO₃⁻ — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('wateracid-mcq', mcq({
  stem: 'In which of the following reactions in water does water act as a Brønsted acid?',
  right: String.raw`$\ce{NH3 + H2O <=> NH4+ + OH-}$`,
  wrong: [String.raw`$\ce{HCl + H2O -> H3O+ + Cl-}$`, String.raw`$\ce{CH3COOH + H2O <=> CH3COO- + H3O+}$`, String.raw`$\ce{H2S + H2O <=> HS- + H3O+}$`],
  sol: 'A Brønsted acid donates a proton. In NH₃ + H₂O ⇌ NH₄⁺ + OH⁻ water gives a proton to NH₃. In the other three reactions water accepts a proton to form H₃O⁺, so it is a base — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('lewis-mcq', mcq({
  stem: String.raw`Anhydrous aluminium chloride dissolves in an inert, dry organic solvent that contains chloride ions: $\ce{AlCl3 + Cl- -> AlCl4-}$. In this reaction aluminium chloride acts as:`,
  right: 'a Lewis acid, since it accepts an electron pair from the chloride ion',
  wrong: ['a Lewis base, since it donates an electron pair to the chloride ion', 'a Brønsted acid, since it donates a proton to the chloride ion', 'a Brønsted base, since it accepts a proton from the chloride ion'],
  sol: 'AlCl₃ has an incomplete octet on aluminium and accepts a lone pair from Cl⁻, forming a coordinate bond. An electron-pair acceptor is a Lewis acid; no proton is transferred, so the Brønsted terms do not apply — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('arrh-mcq', mcq({
  stem: 'A student reads that ammonia is a base although its molecule contains no hydroxide group. This is a limitation of the:',
  right: 'Arrhenius concept, which defines a base as a substance giving OH⁻ ions in water',
  wrong: ['Brønsted–Lowry concept, which defines a base as a proton acceptor', 'Lewis concept, which defines a base as an electron-pair donor', 'Brønsted–Lowry concept, which requires the base to contain hydrogen'],
  sol: 'The Arrhenius definition needs OH⁻ to be produced by the base itself, and is limited to aqueous solutions. Ammonia is a Brønsted base (accepts H⁺) and a Lewis base (donates a lone pair) — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('conjstr-mcq', mcq({
  stem: String.raw`Consider the bases $\ce{Cl-}$, $\ce{CH3COO-}$, $\ce{CN-}$ and $\ce{OH-}$. Their conjugate acids are HCl (strong), CH₃COOH ($K_a = 1.8 \times 10^{-5}$), HCN ($K_a = 4.9 \times 10^{-10}$) and water. The weakest of these bases is:`,
  right: String.raw`$\ce{Cl-}$`,
  wrong: [String.raw`$\ce{CH3COO-}$`, String.raw`$\ce{CN-}$`, String.raw`$\ce{OH-}$`],
  sol: 'The stronger the acid, the weaker its conjugate base. HCl is a strong acid, so Cl⁻ has almost no tendency to take a proton back and is the weakest base — option (@K).',
  d: 2, c: 'application', t: [2, 3],
}));
add('bl-ar', ar({
  a: 'Water can act both as a Brønsted acid and as a Brønsted base.',
  r: 'Water has a high specific heat capacity, about 4.18 J g⁻¹ K⁻¹.',
  key: 'b',
  sol: 'Both statements are true. Water donates a proton to NH₃ and accepts one from HCl, so it is amphiprotic. Its specific heat capacity is a true property of water but has nothing to do with proton transfer, so R does not explain A — option (b).',
  d: 3, c: 'analysis', t: [2, 4],
}));
add('lewis-ar', ar({
  a: 'Boron trifluoride, BF₃, behaves as a Lewis acid.',
  r: 'BF₃ has a lone pair of electrons that it donates to a Lewis base.',
  key: 'c',
  sol: 'A is true: boron has only six electrons in BF₃ and accepts a pair from donors such as NH₃. R is false: BF₃ has no lone pair on boron to donate; it accepts one — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('fill-acc', fill({
  stem: 'According to the Brønsted–Lowry concept, a base is a substance that can ___ a proton.',
  acc: [['accept', 'accepts', 'gain', 'gains', 'take up']],
  sol: 'A Brønsted–Lowry base is a proton acceptor.',
  d: 1, c: 'recall', t: [2],
}));
add('conj-match', match({
  stem: 'Match each Brønsted acid in Column I with its conjugate base in Column II.',
  pairs: [['NH₄⁺', 'NH₃'], ['HSO₄⁻', 'SO₄²⁻'], ['H₂O', 'OH⁻'], ['H₃O⁺', 'H₂O']],
  order: [3, 0, 2, 1],
  sol: 'The conjugate base is formed by removing one proton from the acid: NH₄⁺ → NH₃, HSO₄⁻ → SO₄²⁻, H₂O → OH⁻, H₃O⁺ → H₂O.',
  d: 1, c: 'understanding', t: [2],
}));
add('conj-short2', short({
  marks: 2,
  stem: String.raw`Ethanoic acid dissolves in water: $\ce{CH3COOH + H2O <=> CH3COO- + H3O+}$. Identify the two conjugate acid–base pairs.`,
  model: 'CH₃COOH (acid) and CH₃COO⁻ (its conjugate base) form one pair; H₂O (base, it accepts a proton) and H₃O⁺ (its conjugate acid) form the other. The members of each pair differ by one proton.',
  sol: 'CH₃COOH / CH₃COO⁻ and H₃O⁺ / H₂O.',
  scheme: [['CH₃COOH / CH₃COO⁻ pair', 1], ['H₃O⁺ / H₂O pair, with roles', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('amph-short2', short({
  marks: 2,
  stem: 'Explain, with one equation for each behaviour, why water is described as amphiprotic.',
  model: String.raw`Water can donate a proton and so act as an acid: $\ce{NH3 + H2O <=> NH4+ + OH-}$ (acid, with conjugate base OH⁻). It can accept a proton and so act as a base: $\ce{HCl + H2O -> H3O+ + Cl-}$ (base, with conjugate acid H₃O⁺). A substance that can behave as both a Brønsted acid and a Brønsted base is amphiprotic.`,
  sol: 'Acid with NH₃, base with HCl: amphiprotic.',
  scheme: [['Acid behaviour with a balanced equation', 1], ['Base behaviour with a balanced equation', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('lewis-short3', short({
  marks: 3,
  stem: String.raw`Classify $\ce{AlCl3}$, $\ce{NH3}$, $\ce{H+}$ and $\ce{CN-}$ as Lewis acids or Lewis bases, giving the reason for each, and write the equation for the reaction between $\ce{H+}$ and $\ce{NH3}$.`,
  model: String.raw`AlCl₃ is a Lewis acid (incomplete octet; accepts an electron pair). H⁺ is a Lewis acid (empty 1s orbital; accepts a pair). NH₃ is a Lewis base (lone pair on nitrogen to donate). CN⁻ is a Lewis base (lone pair on carbon). $\ce{H+ + NH3 -> NH4+}$: NH₃ donates its lone pair to H⁺, forming a coordinate bond.`,
  sol: 'Acids: AlCl₃, H⁺; bases: NH₃, CN⁻; H⁺ + NH₃ → NH₄⁺.',
  scheme: [['AlCl₃ and H⁺ as acceptors, with reasons', 1], ['NH₃ and CN⁻ as donors, with reasons', 1], ['Balanced equation H⁺ + NH₃ → NH₄⁺', 1]],
  d: 3, c: 'application', t: [2],
}));
add('conj3-short3', short({
  marks: 3,
  stem: String.raw`For each reaction in water, name the two conjugate acid–base pairs: (i) $\ce{HSO4- + H2O <=> H3O+ + SO4^2-}$, (ii) $\ce{CH3NH2 + H2O <=> CH3NH3+ + OH-}$, (iii) $\ce{HS- + H2O <=> H2S + OH-}$. State the role of water in each.`,
  model: '(i) HSO₄⁻ (acid) / SO₄²⁻ (base) and H₃O⁺ (acid) / H₂O (base); water is a base. (ii) CH₃NH₃⁺ (acid) / CH₃NH₂ (base) and H₂O (acid) / OH⁻ (base); water is an acid. (iii) H₂S (acid) / HS⁻ (base) and H₂O (acid) / OH⁻ (base); water is an acid (HS⁻ is the base).',
  sol: 'Water is a base in (i) and an acid in (ii) and (iii).',
  scheme: [['(i) Both pairs and the role of water', 1], ['(ii) Both pairs and the role of water', 1], ['(iii) Both pairs and the role of water', 1]],
  d: 3, c: 'application', t: [2],
}));
add('acidbase-long', long({
  stem: String.raw`(a) State how an acid and a base are defined in the Arrhenius, Brønsted–Lowry and Lewis concepts. [3]

(b) For $\ce{HNO2 + H2O <=> NO2- + H3O+}$ identify the two conjugate acid–base pairs and name one species in the equation that is amphiprotic. [2]`,
  model: `(a) Arrhenius: an acid gives H⁺ (H₃O⁺) in water; a base gives OH⁻ in water. Brønsted–Lowry: an acid is a proton donor; a base is a proton acceptor. Lewis: an acid is an electron-pair acceptor; a base is an electron-pair donor.

(b) HNO₂ (acid) / NO₂⁻ (conjugate base), and H₃O⁺ (conjugate acid) / H₂O (base). Water is amphiprotic (it accepts a proton here and can donate one in other reactions).`,
  sol: 'Three definitions of acid and base; pairs HNO₂/NO₂⁻ and H₃O⁺/H₂O; water amphiprotic.',
  scheme: [['(a) Arrhenius definitions', 1], ['(a) Brønsted–Lowry definitions', 1], ['(a) Lewis definitions', 1], ['(b) Both conjugate pairs', 1], ['(b) Water named as amphiprotic with reason', 1]],
  d: 2, c: 'understanding', t: [2],
}));

// ================================================================ t03 Ostwald's dilution law, Ka and strength, polybasic acids
add('ostw-mcq', mcq({
  stem: 'A weak monobasic acid is very slightly ionised in a solution of concentration C. The solution is diluted with water to one quarter of this concentration at constant temperature. The degree of ionisation becomes about:',
  right: 'twice its original value',
  wrong: ['four times its original value', 'one half of its original value', 'unchanged'],
  sol: 'For a weak acid α = √(K_a / C). When C falls to C/4, α becomes √(4K_a / C) = 2 × √(K_a / C): the degree of ionisation doubles — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('ka-mcq', (() => {
  const ratio = Math.sqrt(KA.nitrous / KA.benzoic);
  return mcq({
    stem: String.raw`At 298 K, nitrous acid has $K_a = 4.5 \times 10^{-4}$ and benzoic acid has $K_a = 6.5 \times 10^{-5}$. In 0.10 mol L⁻¹ solutions of each, the ratio $[\text{H}^+]$(nitrous acid) to $[\text{H}^+]$(benzoic acid) is about:`,
    right: f2(ratio),
    wrong: ['6.9', '0.38', '48'],
    sol: `For a weak acid [H⁺] = √(K_a C), so at equal C the ratio is √(K_a1 / K_a2) = √(4.5 × 10⁻⁴ / 6.5 × 10⁻⁵) = √${f2(KA.nitrous / KA.benzoic)} = ${f2(ratio)} — option (@K).`,
    d: 3, c: 'application', t: [3],
  });
})(), () => near(Math.sqrt(4.5e-4 / 6.5e-5), 2.63, 0.005) || 'ka-mcq');
add('polyb-mcq', mcq({
  stem: String.raw`For phosphoric acid, $K_{a1} = 7.5 \times 10^{-3}$, $K_{a2} = 6.2 \times 10^{-8}$ and $K_{a3} = 4.8 \times 10^{-13}$. The steady fall in the successive values is mainly due to the fact that:`,
  right: 'it is harder to remove a proton from a negatively charged ion than from a neutral molecule',
  wrong: ['each step has a higher temperature', 'the first proton is held by a covalent bond and the others by ionic bonds', 'water is used up in the first step'],
  sol: 'Each later proton must leave an anion (H₂PO₄⁻, then HPO₄²⁻) that attracts it electrostatically more strongly than the neutral H₃PO₄ molecule does, so K_a1 ≫ K_a2 ≫ K_a3 — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('hpo4-mcq', mcq({
  stem: 'A chemist prepares a 0.10 mol L⁻¹ solution of phosphoric acid in water. Which species are present in appreciable concentrations?',
  right: String.raw`$\ce{H3PO4}$, $\ce{H2PO4-}$ and $\ce{H+}$, with only traces of $\ce{HPO4^2-}$ and $\ce{PO4^3-}$`,
  wrong: [String.raw`$\ce{H3PO4}$, $\ce{HPO4^2-}$ and $\ce{H+}$, with only traces of $\ce{H2PO4-}$`, String.raw`$\ce{H2PO4-}$, $\ce{HPO4^2-}$, $\ce{PO4^3-}$ and $\ce{H+}$ in equal amounts, with no $\ce{H3PO4}$`, String.raw`$\ce{PO4^3-}$ and $\ce{H+}$ only`],
  sol: 'K_a1 is much larger than K_a2 and K_a3, so mostly the first ionisation takes place: H₃PO₄ ⇌ H₂PO₄⁻ + H⁺. HPO₄²⁻ and PO₄³⁻ are present only in traces — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('poly-tf', tf({
  stem: 'In a 0.10 mol L⁻¹ solution of phosphoric acid, nearly all the hydrogen ions come from the first stage of ionisation.',
  key: 't',
  sol: 'True. K_a1 (7.5 × 10⁻³) is about 10⁵ times K_a2, so the second and third stages add a negligible amount of H⁺.',
  d: 2, c: 'understanding', t: [3],
}));
add('ostw-ar', ar({
  a: 'The degree of ionisation of a weak acid increases when its concentration is increased at constant temperature.',
  r: 'The ionisation constant K_a of a weak acid increases on dilution.',
  key: 'd',
  sol: 'Both statements are false. α = √(K_a / C) falls when C is increased, and K_a depends only on temperature, not on the concentration — option (d).',
  d: 3, c: 'analysis', t: [3],
}));
add('fill-pkw', fill({
  stem: 'At 298 K, the pH and pOH of any dilute aqueous solution add up to ___.',
  acc: [['14', '14.0', 'fourteen']],
  sol: 'pH + pOH = pK_w = 14 at 298 K.',
  d: 1, c: 'recall', t: [4],
}));
add('alpha-num', (() => {
  const a = alphaApprox(KA.formic, 0.10);
  return num({
    stem: String.raw`Methanoic acid, HCOOH, has $K_a = 1.8 \times 10^{-4}$ at 298 K. Using Ostwald's dilution law with the approximation $\alpha = \sqrt{K_a/C}$, calculate the degree of ionisation of a 0.10 mol L⁻¹ solution.`,
    value: Number(f3(a)), tol: 0.001, unit: null,
    sol: String.raw`$\alpha = \sqrt{\dfrac{K_a}{C}} = \sqrt{\dfrac{1.8 \times 10^{-4}}{0.10}} = \sqrt{1.8 \times 10^{-3}} = ${f3(a)}$ (about 4.2%).`,
    scheme: [['α = √(K_a / C) with values substituted', 1], ['α = 0.042', 1]],
    marks: 2, d: 2, c: 'understanding', t: [3],
  });
})(), (q) => near(Math.sqrt(1.8e-4 / 0.1), 0.0424, 0.005) && q.answer.value === 0.042 || 'alpha-num');
add('ostw-state-short2', short({
  marks: 2,
  stem: "State Ostwald's dilution law for a weak electrolyte and write the expression that shows how the degree of ionisation depends on the concentration when α is very small.",
  model: String.raw`Ostwald's dilution law: the degree of ionisation of a weak electrolyte increases on dilution; quantitatively $K = \dfrac{C\alpha^2}{1-\alpha}$, which for $\alpha \ll 1$ gives $\alpha = \sqrt{K/C}$, so α is inversely proportional to the square root of the concentration (directly proportional to √V).`,
  sol: 'K = Cα² / (1 − α); α = √(K/C) for small α.',
  scheme: [['Statement: α increases on dilution', 1], ['α = √(K/C) for α ≪ 1', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('ka-order-short2', short({
  marks: 2,
  stem: String.raw`Arrange the acids HCN ($K_a = 4.9 \times 10^{-10}$), CH₃COOH ($K_a = 1.8 \times 10^{-5}$) and HNO₂ ($K_a = 4.5 \times 10^{-4}$) in increasing order of strength, and say which of them has the lowest degree of ionisation at equal concentration.`,
  model: 'A larger K_a means a stronger acid (more ionisation). So the order of increasing strength is HCN < CH₃COOH < HNO₂. At equal concentration α = √(K_a / C), so HCN has the lowest degree of ionisation.',
  sol: 'HCN < CH₃COOH < HNO₂; HCN has the lowest α.',
  scheme: [['Correct order from K_a values', 1], ['HCN has the lowest α, using α = √(K_a/C)', 1]],
  d: 2, c: 'application', t: [3],
}));
add('polyb-short2', short({
  marks: 2,
  stem: 'Give two reasons why the second ionisation constant of a polybasic acid is much smaller than the first.',
  model: 'First, the second proton has to be removed from a negatively charged ion, which holds the proton more strongly through electrostatic attraction than the neutral molecule does. Second, the H⁺ ions formed in the first step lower the extent of the second ionisation (the first step has already supplied H⁺ to the solution, so the second step is held back).',
  sol: 'Proton removal from an anion is harder; H⁺ from the first step suppresses the second step.',
  scheme: [['Electrostatic attraction in the anion', 1], ['Suppression by H⁺ already present', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('h3po4-short3', short({
  marks: 3,
  stem: String.raw`Write the three stages of ionisation of phosphoric acid in water with their ionisation constants ($7.5 \times 10^{-3}$, $6.2 \times 10^{-8}$ and $4.8 \times 10^{-13}$), and explain which stage supplies almost all the hydrogen ions.`,
  model: String.raw`$\ce{H3PO4 <=> H+ + H2PO4-}$, $K_{a1} = 7.5 \times 10^{-3}$; $\ce{H2PO4- <=> H+ + HPO4^2-}$, $K_{a2} = 6.2 \times 10^{-8}$; $\ce{HPO4^2- <=> H+ + PO4^3-}$, $K_{a3} = 4.8 \times 10^{-13}$. Since $K_{a1} \gg K_{a2} \gg K_{a3}$ (each about 10⁵ times smaller), the first stage supplies almost all the hydrogen ions; the later stages add a negligible amount.`,
  sol: 'Three stages with K_a1 ≫ K_a2 ≫ K_a3; first stage gives nearly all H⁺.',
  scheme: [['First stage equation with K_a1', 1], ['Second and third stages with their constants', 1], ['First stage gives nearly all H⁺ because K_a1 ≫ K_a2 ≫ K_a3', 1]],
  d: 2, c: 'application', t: [3],
}));
add('ostw-short3', (() => {
  const a1 = alphaApprox(KA.acetic, 0.040), a2 = alphaApprox(KA.acetic, 0.010);
  return short({
    marks: 3,
    stem: 'Ethanoic acid (Ka = 1.8 × 10⁻⁵ at 298 K) is prepared at 0.040 mol L⁻¹ and then diluted four-fold to 0.010 mol L⁻¹. Calculate its degree of ionisation in each solution using α = √(Ka/C), and state what the ratio shows.',
    model: `At 0.040 mol L⁻¹: α = √(1.8 × 10⁻⁵ / 0.040) = √(4.5 × 10⁻⁴) = ${f4(a1)}. At 0.010 mol L⁻¹: α = √(1.8 × 10⁻⁵ / 0.010) = √(1.8 × 10⁻³) = ${f4(a2)}. The ratio is ${f2(a2 / a1)}: a four-fold dilution doubles α, since α ∝ 1/√C.`,
    sol: `α = ${f4(a1)} and ${f4(a2)}; ratio ${f2(a2 / a1)}.`,
    scheme: [[`α = ${f4(a1)} at 0.040 mol L⁻¹`, 1], [`α = ${f4(a2)} at 0.010 mol L⁻¹`, 1], ['Ratio 2 means α ∝ 1/√C', 1]],
    d: 3, c: 'application', t: [3],
  });
})(), () => near(alphaApprox(1.8e-5, 0.01) / alphaApprox(1.8e-5, 0.04), 2, 0.001) || 'ostw-short3');
add('ostw-long', (() => {
  const C = 0.040, a = alphaApprox(KA.benzoic, C), h = C * a;
  return long({
    stem: String.raw`(a) For a weak monobasic acid HA of concentration C mol L⁻¹ and degree of ionisation α, derive Ostwald's dilution law $K_a = \dfrac{C\alpha^2}{1-\alpha}$ and the simplified form for a very weak acid. [3]

(b) Calculate the degree of ionisation and the hydrogen ion concentration of 0.040 mol L⁻¹ benzoic acid ($K_a = 6.5 \times 10^{-5}$). [2]`,
    model: String.raw`(a) $\ce{HA <=> H+ + A-}$. Initially C of HA; at equilibrium HA: $C(1-\alpha)$, H⁺: $C\alpha$, A⁻: $C\alpha$.
$K_a = \dfrac{[\text{H}^+][\text{A}^-]}{[\text{HA}]} = \dfrac{C\alpha \cdot C\alpha}{C(1-\alpha)} = \dfrac{C\alpha^2}{1-\alpha}$.
For a very weak acid α ≪ 1, so $1 - \alpha \approx 1$, $K_a = C\alpha^2$ and $\alpha = \sqrt{K_a/C}$. So α decreases as C increases (increases on dilution).

(b) $\alpha = \sqrt{6.5 \times 10^{-5}/0.040} = \sqrt{1.625 \times 10^{-3}} = ${f4(a)}$; $[\text{H}^+] = C\alpha = 0.040 \times ${f4(a)} = ${ex(h, 2)}$ mol L⁻¹.`,
    sol: `(b) α = ${f4(a)}; [H⁺] = ${ex(h, 2)} mol L⁻¹.`,
    scheme: [['(a) Equilibrium amounts C(1 − α), Cα, Cα', 1], ['(a) K_a = Cα² / (1 − α)', 1], ['(a) α ≪ 1 gives α = √(K_a/C)', 1], [`(b) α = ${f3(a)}`, 1], [`(b) [H⁺] = ${ex(h, 2)} mol L⁻¹`, 1]],
    d: 3, c: 'understanding', t: [3],
  });
})(), () => near(Math.sqrt(6.5e-5 / 0.04), 0.0403, 0.005) || 'ostw-long');
add('polyb-long', (() => {
  const C = 0.10, K1 = PHOS.k1;
  const x = (-K1 + Math.sqrt(K1 * K1 + 4 * K1 * C)) / 2;
  const p = pH(x);
  return long({
    stem: String.raw`(a) Write the three stages of ionisation of phosphoric acid and the expression for $K_{a1}$. [2]

(b) For a 0.10 mol L⁻¹ solution, $K_{a1} = 7.5 \times 10^{-3}$, $K_{a2} = 6.2 \times 10^{-8}$ (given as before). Calculate $[\text{H}^+]$ from the first stage alone, by solving $\dfrac{x^2}{0.10 - x} = K_{a1}$, and the pH. [2]

(c) Explain why the second stage may be neglected. [1]`,
    model: String.raw`(a) $\ce{H3PO4 <=> H+ + H2PO4-}$, $\ce{H2PO4- <=> H+ + HPO4^2-}$, $\ce{HPO4^2- <=> H+ + PO4^3-}$; $K_{a1} = \dfrac{[\text{H}^+][\text{H}_2\text{PO}_4^-]}{[\text{H}_3\text{PO}_4]}$.

(b) $x^2 + 7.5 \times 10^{-3}x - 7.5 \times 10^{-4} = 0$, so $x = ${f4(x)}$ mol L⁻¹ = [H⁺]; pH = −log(${f4(x)}) = ${f2(p)}.

(c) $K_{a2}$ is about 10⁵ times smaller than $K_{a1}$, so the extra [H⁺] from the second stage (about 6 × 10⁻⁸ mol L⁻¹) is negligible beside ${f3(x)} mol L⁻¹.`,
    sol: `(b) [H⁺] = ${f4(x)} mol L⁻¹; pH = ${f2(p)}.`,
    scheme: [['(a) Three equations', 1], ['(a) K_a1 expression', 1], ['(b) Quadratic solved: x = 0.0239 mol L⁻¹', 1], [`(b) pH = ${f2(p)}`, 1], ['(c) K_a2 ≪ K_a1, so the second stage adds negligible H⁺', 1]],
    d: 3, c: 'application', t: [3],
  });
})(), () => { const x = (-7.5e-3 + Math.sqrt(7.5e-3 ** 2 + 4 * 7.5e-3 * 0.1)) / 2; return near(x * x / (0.1 - x), 7.5e-3, 0.001) && near(pH(x), 1.62, 0.005) || 'polyb-long'; });

// ================================================================ t04 Kw, pH, pOH
add('kwT-mcq', (() => {
  const h = Math.sqrt(KW_T[323]), p = pH(h);
  return mcq({
    stem: String.raw`The ionic product of water is $K_w = 5.5 \times 10^{-14}$ at 323 K (given). The pH of pure water at 323 K, and its nature, are:`,
    right: `${f2(p)}, neutral`,
    wrong: [`${f2(p)}, acidic`, '7.00, neutral', '7.00, acidic'],
    sol: `In pure water [H⁺] = [OH⁻] = √K_w = √(5.5 × 10⁻¹⁴) = ${ex(h, 2)} mol L⁻¹, so pH = ${f2(p)}. Since [H⁺] = [OH⁻] the water is still neutral; neutrality is at pH = ½ pK_w, not always 7 — option (@K).`,
    d: 3, c: 'analysis', t: [4],
  });
})(), () => near(pH(Math.sqrt(5.5e-14)), 6.63, 0.002) || 'kwT-mcq');
add('phdil-mcq', (() => {
  const c = 0.10 * 0.010 / 1.0;
  return mcq({
    stem: 'In a laboratory, 10.0 mL of 0.10 mol L⁻¹ hydrochloric acid is made up to 1.0 L with water. The pH of the diluted solution at 298 K is:',
    right: f2(pH(c)),
    wrong: ['1.00', '2.00', '4.00'],
    sol: `Moles of HCl = 0.10 × 0.0100 = 1.0 × 10⁻³ mol in 1.0 L, so [H⁺] = 1.0 × 10⁻³ mol L⁻¹ and pH = −log(1.0 × 10⁻³) = ${f2(pH(c))} — option (@K).`,
    d: 2, c: 'application', t: [4],
  });
})(), () => near(pH(1e-3), 3, 0.001) || 'phdil');
add('phsulf-mcq', mcq({
  stem: 'Sulphuric acid solution of concentration 0.0050 mol L⁻¹ is taken, and both protons are assumed to be completely ionised. The pH at 298 K is:',
  right: '2.00',
  wrong: ['2.30', '3.00', '2.70'],
  sol: '[H⁺] = 2 × 0.0050 = 0.010 mol L⁻¹, so pH = −log(1.0 × 10⁻²) = 2.00 — option (@K).',
  d: 2, c: 'understanding', t: [4],
}), () => near(-Math.log10(2 * 0.005), 2, 0.001) || 'phsulf');
add('poh-mcq', mcq({
  stem: 'A solution of hydrochloric acid has a concentration of 1.0 × 10⁻³ mol L⁻¹ at 298 K. Its pOH is:',
  right: '11',
  wrong: ['3', '10', '14'],
  sol: 'pH = −log(1.0 × 10⁻³) = 3, and pH + pOH = 14 at 298 K, so pOH = 11 — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('mixph-mcq', (() => {
  const exc = (25 * 0.2 - 25 * 0.1) / 50;
  return mcq({
    stem: 'Mixing 25.0 mL of 0.200 mol L⁻¹ hydrochloric acid with 25.0 mL of 0.100 mol L⁻¹ sodium hydroxide solution gives a mixture whose pH at 298 K is:',
    right: f2(pH(exc)),
    wrong: ['7.00', '1.00', '0.70'],
    sol: `n(H⁺) = 25.0 × 0.200 = 5.00 mmol and n(OH⁻) = 25.0 × 0.100 = 2.50 mmol. The excess H⁺ is 2.50 mmol in 50.0 mL, so [H⁺] = ${f3(exc)} mol L⁻¹ and pH = ${f2(pH(exc))} — option (@K).`,
    d: 3, c: 'application', t: [4],
  });
})(), () => near(pH(0.05), 1.30, 0.003) || 'mixph');
add('phweak-mcq', (() => {
  const h = hApprox(KA.acetic, 0.050), p = pH(h);
  return mcq({
    stem: 'The pH of a 0.050 mol L⁻¹ solution of ethanoic acid (Ka = 1.8 × 10⁻⁵ at 298 K), assuming α is small, is about:',
    right: f2(p),
    wrong: ['1.30', '4.05', '2.52'],
    sol: `[H⁺] = √(K_a C) = √(1.8 × 10⁻⁵ × 0.050) = √(9.0 × 10⁻⁷) = ${ex(h, 2)} mol L⁻¹, so pH = ${f2(p)} — option (@K).`,
    d: 3, c: 'application', t: [4],
  });
})(), () => near(pH(Math.sqrt(9e-7)), 3.02, 0.003) || 'phweak');
add('phratio-mcq', mcq({
  stem: 'Lemon juice has a pH of 2.5 and milk has a pH of 6.5. The hydrogen ion concentration of the lemon juice is how many times that of milk?',
  right: '10⁴',
  wrong: ['4', '10', '10⁻⁴'],
  sol: 'A difference of 4 pH units is a factor of 10⁴ in [H⁺] because pH is a logarithmic scale: the ratio of [H⁺] in lemon juice to [H⁺] in milk is 10^(6.5 − 2.5) = 10⁴ — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('ph-ar', ar({
  a: 'The pH of 1.0 × 10⁻³ mol L⁻¹ hydrochloric acid at 298 K is 3.0.',
  r: 'pH is defined as the negative of the natural logarithm of the hydrogen ion concentration.',
  key: 'c',
  sol: 'A is true: [H⁺] = 1.0 × 10⁻³ mol L⁻¹ gives pH 3.0. R is false: pH is defined with the logarithm to base 10 (pH = −log₁₀[H⁺]), not the natural logarithm — option (c).',
  d: 2, c: 'understanding', t: [4],
}));
add('neutral-tf', tf({
  stem: 'A neutral aqueous solution has a pH of exactly 7 at every temperature.',
  key: 'f',
  sol: 'False. A solution is neutral when [H⁺] = [OH⁻]. Since K_w changes with temperature, so does the pH of neutrality (for example 6.63 at 323 K).',
  d: 3, c: 'analysis', t: [4],
}));
add('ph-num', (() => {
  const oh = 2 * 0.020, p = 14 - -Math.log10(oh);
  return num({
    stem: String.raw`A technician prepares a 0.020 mol L⁻¹ solution of barium hydroxide, a strong base that is completely ionised, at 298 K. Calculate its pH.`,
    value: Number(f2(p)), tol: 0.02, unit: null,
    sol: String.raw`$\ce{Ba(OH)2 -> Ba^2+ + 2OH-}$, so $[\text{OH}^-] = 2 \times 0.020 = 0.040$ mol L⁻¹. pOH $= -\log 0.040 = ${f2(-Math.log10(oh))}$, so pH $= 14 - ${f2(-Math.log10(oh))} = ${f2(p)}$.`,
    scheme: [['[OH⁻] = 0.040 mol L⁻¹ (two OH⁻ per formula unit)', 1], ['pOH = 1.40 and pH = 12.60', 1]],
    marks: 2, d: 2, c: 'application', t: [4],
  });
})(), (q) => near(14 + Math.log10(0.04), 12.602, 0.001) && q.answer.value === 12.6 || 'ph-num');
add('mix-num', (() => {
  const exc = (40 * 0.15 - 25 * 0.2) / 65, p = pH(exc);
  return num({
    stem: 'In an acid–base experiment, 40.0 mL of 0.150 mol L⁻¹ hydrochloric acid and 25.0 mL of 0.200 mol L⁻¹ sodium hydroxide are mixed at 298 K. Calculate the pH of the mixture.',
    value: Number(f2(p)), tol: 0.02, unit: null,
    sol: `n(H⁺) = 40.0 × 0.150 = 6.00 mmol; n(OH⁻) = 25.0 × 0.200 = 5.00 mmol. Excess H⁺ = 1.00 mmol in 65.0 mL, so [H⁺] = ${ex(exc, 3)} mol L⁻¹ and pH = ${f2(p)}.`,
    scheme: [['Moles of H⁺ and OH⁻; excess 1.00 mmol', 1], ['[H⁺] = 0.0154 mol L⁻¹ and pH = 1.81', 1]],
    marks: 2, d: 3, c: 'application', t: [4],
  });
})(), (q) => near(pH(1 / 65), 1.813, 0.002) && q.answer.value === 1.81 || 'mix-num');
add('weakbase-num', (() => {
  const oh = hApprox(KB.ammonia, 0.30), p = 14 - pH(oh);
  return num({
    stem: 'A cleaning solution in a Pune laboratory contains aqueous ammonia at 0.30 mol L⁻¹. Taking Kb = 1.8 × 10⁻⁵ at 298 K and α ≪ 1, calculate the pH of the solution.',
    value: Number(f2(p)), tol: 0.02, unit: null,
    sol: `[OH⁻] = √(K_b C) = √(1.8 × 10⁻⁵ × 0.30) = ${ex(oh, 3)} mol L⁻¹. pOH = ${f2(pH(oh))}, so pH = 14 − ${f2(pH(oh))} = ${f2(p)}.`,
    scheme: [['[OH⁻] = √(K_b C) = 2.32 × 10⁻³ mol L⁻¹', 1], ['pOH = 2.63 and pH = 11.37', 1]],
    marks: 2, d: 3, c: 'application', t: [4],
  });
})(), (q) => near(14 + Math.log10(Math.sqrt(5.4e-6)), 11.366, 0.002) && q.answer.value === 11.37 || 'weakbase-num');
add('neutral323-num', (() => {
  const p = pH(Math.sqrt(KW_T[323]));
  return num({
    stem: 'The ionic product of water is 5.5 × 10⁻¹⁴ mol² L⁻² at 323 K (given). Calculate the pH of pure water at 323 K.',
    value: Number(f2(p)), tol: 0.01, unit: null,
    sol: `In pure water [H⁺] = √K_w = √(5.5 × 10⁻¹⁴) = ${ex(Math.sqrt(5.5e-14), 3)} mol L⁻¹, so pH = ${f2(p)}.`,
    scheme: [['[H⁺] = √K_w = 2.35 × 10⁻⁷ mol L⁻¹', 1], ['pH = 6.63', 1]],
    marks: 2, d: 3, c: 'understanding', t: [4],
  });
})(), (q) => near(-Math.log10(Math.sqrt(5.5e-14)), 6.630, 0.002) && q.answer.value === 6.63 || 'neutral323');
add('kw-short2', short({
  marks: 2,
  stem: 'Define the ionic product of water and state its value at 298 K. Why does it increase with temperature?',
  model: String.raw`The ionic product of water is $K_w = [\text{H}^+][\text{OH}^-]$, the product of the molar concentrations of hydrogen and hydroxide ions in water or any dilute aqueous solution; at 298 K, $K_w = 1.0 \times 10^{-14}$ mol² L⁻². The self-ionisation of water is endothermic, so a rise in temperature favours ionisation and increases K_w.`,
  sol: 'K_w = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ at 298 K; increases because ionisation is endothermic.',
  scheme: [['Definition and value 1.0 × 10⁻¹⁴ at 298 K', 1], ['Endothermic ionisation: increases with temperature', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('ph-short2', (() => {
  const p = pH(3.2e-4);
  return short({
    marks: 2,
    stem: 'Define pH. A sample of rainwater has a hydrogen ion concentration of 3.2 × 10⁻⁴ mol L⁻¹ at 298 K; calculate its pH and pOH.',
    model: `pH is the negative logarithm (to base 10) of the hydrogen ion concentration in mol L⁻¹: pH = −log[H⁺]. For the rainwater pH = −log(3.2 × 10⁻⁴) = ${f2(p)}, and pOH = 14 − ${f2(p)} = ${f2(14 - p)}.`,
    sol: `pH = ${f2(p)}; pOH = ${f2(14 - p)}.`,
    scheme: [['Definition pH = −log[H⁺]', 1], [`pH = ${f2(p)} and pOH = ${f2(14 - p)}`, 1]],
    d: 2, c: 'application', t: [4],
  });
})(), () => near(-Math.log10(3.2e-4), 3.495, 0.002) || 'ph-short2');
add('mix-short3', (() => {
  const exc = (30 * 0.25 - 20 * 0.3) / 50, p = 14 + Math.log10(exc);
  return short({
    marks: 3,
    stem: 'A student mixes 30.0 mL of 0.250 mol L⁻¹ sodium hydroxide with 20.0 mL of 0.300 mol L⁻¹ hydrochloric acid at 298 K. Find the pH of the mixture and say whether it is acidic, basic or neutral.',
    model: `n(OH⁻) = 30.0 × 0.250 = 7.50 mmol; n(H⁺) = 20.0 × 0.300 = 6.00 mmol. Excess OH⁻ = 1.50 mmol in 50.0 mL, so [OH⁻] = ${f3(exc)} mol L⁻¹, pOH = ${f2(-Math.log10(exc))} and pH = 14 − ${f2(-Math.log10(exc))} = ${f2(p)}. The mixture is basic.`,
    sol: `pH = ${f2(p)}; basic.`,
    scheme: [['Moles of OH⁻ and H⁺ with the excess (1.50 mmol)', 1], [`[OH⁻] = ${f3(exc)} mol L⁻¹ and pOH = ${f2(-Math.log10(exc))}`, 1], [`pH = ${f2(p)}, basic`, 1]],
    d: 3, c: 'application', t: [4],
  });
})(), () => near(14 + Math.log10(0.03), 12.477, 0.002) || 'mix-short3');
add('kwT-short3', (() => {
  const Kw = KW_T[373], h = Math.sqrt(Kw), p = pH(h), pKw = -Math.log10(Kw), pNaOH = pKw - 2;
  return short({
    marks: 3,
    stem: 'At 373 K the ionic product of water is 5.1 × 10⁻¹³ (given). (i) Calculate the pH of pure water at this temperature and justify that it is still neutral. (ii) Calculate the pH of 0.010 mol L⁻¹ sodium hydroxide at 373 K.',
    model: `(i) [H⁺] = [OH⁻] = √(5.1 × 10⁻¹³) = ${ex(h, 2)} mol L⁻¹, so pH = ${f2(p)}. The concentrations of H⁺ and OH⁻ are equal, so the water is neutral although its pH is below 7. (ii) pK_w = ${f2(pKw)}; pOH = 2.00, so pH = pK_w − pOH = ${f2(pKw)} − 2.00 = ${f2(pNaOH)}.`,
    sol: `(i) pH = ${f2(p)}; (ii) pH = ${f2(pNaOH)}.`,
    scheme: [[`(i) pH = ${f2(p)} from √K_w`, 1], ['(i) [H⁺] = [OH⁻], so neutral', 1], [`(ii) pH = pK_w − 2 = ${f2(pNaOH)}`, 1]],
    d: 4, c: 'analysis', t: [4],
  });
})(), () => near(-Math.log10(Math.sqrt(5.1e-13)), 6.146, 0.002) && near(-Math.log10(5.1e-13) - 2, 10.292, 0.002) || 'kwT-short3');
add('weakacid-short3', (() => {
  const C = 0.25, a = alphaApprox(KA.nitrous, C), h = C * a, p = pH(h);
  return short({
    marks: 3,
    stem: 'Calculate the degree of ionisation and the pH of a 0.25 mol L⁻¹ solution of nitrous acid (Ka = 4.5 × 10⁻⁴ at 298 K), using α = √(Ka/C).',
    model: `α = √(4.5 × 10⁻⁴ / 0.25) = √(1.8 × 10⁻³) = ${f4(a)}. [H⁺] = Cα = 0.25 × ${f4(a)} = ${ex(h, 2)} mol L⁻¹. pH = −log(${ex(h, 2)}) = ${f2(p)}.`,
    sol: `α = ${f4(a)}; pH = ${f2(p)}.`,
    scheme: [[`α = ${f3(a)}`, 1], [`[H⁺] = ${ex(h, 2)} mol L⁻¹`, 1], [`pH = ${f2(p)}`, 1]],
    d: 3, c: 'application', t: [3, 4],
  });
})(), () => near(-Math.log10(0.25 * Math.sqrt(1.8e-3)), 1.973, 0.003) || 'weakacid-short3');
add('dil-short3', (() => {
  const c0 = 0.50, c1 = (0.5 * 0.020) / 1.0, p0 = 14 + Math.log10(c0), p1 = 14 + Math.log10(c1);
  return short({
    marks: 3,
    stem: 'A 20.0 mL portion of 0.50 mol L⁻¹ sodium hydroxide solution is diluted with water to a total volume of 1.0 L at 298 K. Calculate the pH of the solution before and after dilution, and the factor by which [OH⁻] falls.',
    model: `Before: [OH⁻] = 0.50 mol L⁻¹, pOH = ${f2(-Math.log10(c0))}, pH = ${f2(p0)}. After: n(OH⁻) = 0.50 × 0.0200 = 0.010 mol in 1.0 L, so [OH⁻] = 0.010 mol L⁻¹, pOH = 2.00 and pH = ${f2(p1)}. [OH⁻] falls by a factor of 50 (0.50 / 0.010), but the pH changes by only ${f2(p0 - p1)} units.`,
    sol: `pH ${f2(p0)} before, ${f2(p1)} after; factor 50.`,
    scheme: [[`Before: pH = ${f2(p0)}`, 1], [`After: [OH⁻] = 0.010 mol L⁻¹, pH = ${f2(p1)}`, 1], ['Factor of 50 and the logarithmic scale', 1]],
    d: 3, c: 'application', t: [4],
  });
})(), () => near(14 + Math.log10(0.01), 12, 0.001) && near(14 + Math.log10(0.5), 13.699, 0.001) || 'dil-short3');
add('ph-long', (() => {
  const oh = 2 * 0.0020, p1 = 14 + Math.log10(oh), h = hApprox(KA.acetic, 0.020), p2 = pH(h);
  return long({
    stem: String.raw`(a) Write the relation between pH, pOH and pK_w, and give the value of pK_w at 298 K. [1]

(b) Calculate the pH at 298 K of a 0.0020 mol L⁻¹ solution of barium hydroxide, which is completely ionised. [2]

(c) Calculate the pH of a 0.020 mol L⁻¹ solution of ethanoic acid ($K_a = 1.8 \times 10^{-5}$), assuming $\alpha \ll 1$. [2]`,
    model: `(a) pH + pOH = pK_w, where pK_w = −log K_w = 14.00 at 298 K.

(b) [OH⁻] = 2 × 0.0020 = 0.0040 mol L⁻¹; pOH = ${f2(-Math.log10(oh))}; pH = 14 − ${f2(-Math.log10(oh))} = ${f2(p1)}.

(c) [H⁺] = √(K_a C) = √(1.8 × 10⁻⁵ × 0.020) = √(3.6 × 10⁻⁷) = ${ex(h, 2)} mol L⁻¹; pH = ${f2(p2)}.`,
    sol: `(b) pH = ${f2(p1)}; (c) pH = ${f2(p2)}.`,
    scheme: [['(a) pH + pOH = pK_w = 14.00', 1], ['(b) [OH⁻] = 0.0040 mol L⁻¹ from two OH⁻ per formula unit', 1], [`(b) pH = ${f2(p1)}`, 1], [`(c) [H⁺] = ${ex(h, 2)} mol L⁻¹`, 1], [`(c) pH = ${f2(p2)}`, 1]],
    d: 3, c: 'application', t: [4],
  });
})(), () => near(14 + Math.log10(0.004), 11.602, 0.002) && near(-Math.log10(Math.sqrt(3.6e-7)), 3.222, 0.002) || 'ph-long');

// ================================================================ t05 indicators
add('ind-theory-mcq', mcq({
  stem: 'An acid–base indicator is a weak organic acid HIn whose un-ionised form and ion In⁻ have different colours. Its colour changes over a narrow range because:',
  right: 'the ratio [In⁻]/[HIn] changes from about 1/10 to 10 over roughly one pH unit on each side of its pK',
  wrong: ['the indicator reacts completely with the first drop of acid', 'the indicator ionises completely at pH 7 in all solutions', 'the indicator changes the pH of the solution by two units'],
  sol: 'In HIn ⇌ H⁺ + In⁻ the ratio of the two coloured forms depends on [H⁺]. One colour dominates when the ratio is 10 or more, the other when it is 0.1 or less, so the visible change takes place over about 2 pH units around pK_In — option (@K).',
  d: 3, c: 'understanding', t: [5],
}));
add('ind-wasb-mcq', mcq({
  stem: 'A student titrates 25.0 mL of 0.100 mol L⁻¹ ethanoic acid against 0.100 mol L⁻¹ sodium hydroxide. The best indicator for the end point is:',
  right: 'phenolphthalein (pH range 8.3–10.0)',
  wrong: ['methyl orange (pH range 3.1–4.4)', 'methyl red (pH range 4.4–6.2)', 'litmus paper alone, since it gives a clear colour'],
  sol: 'The solution at the equivalence point contains the sodium salt of a weak acid and its pH is about 8.7, above 7. Phenolphthalein, which changes between pH 8.3 and 10.0, changes colour sharply at this point — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('ind-sawb-mcq', mcq({
  stem: 'A student titrates 0.1 mol L⁻¹ hydrochloric acid against 0.1 mol L⁻¹ aqueous ammonia and looks for a suitable indicator. The best choice is:',
  right: 'methyl orange (pH range 3.1–4.4) or methyl red (pH range 4.4–6.2)',
  wrong: ['phenolphthalein (pH range 8.3–10.0)', 'bromothymol blue (pH range 6.0–7.6) only', 'any indicator, since the pH change is vertical over the whole range'],
  sol: 'The equivalence point lies at a pH below 7, so the indicator must change colour in the acidic range, near pH 3–6.5. Methyl orange and methyl red do; phenolphthalein would change colour only after the equivalence point had been passed by a large margin — option (@K).',
  d: 3, c: 'application', t: [5],
}));
add('ind-sasb-mcq', mcq({
  stem: 'In the titration of 0.1 mol L⁻¹ hydrochloric acid against 0.1 mol L⁻¹ sodium hydroxide, the pH changes sharply from about 4 to about 10 near the equivalence point. This means that:',
  right: 'both methyl orange and phenolphthalein can be used, since their ranges lie within the steep part of the curve',
  wrong: ['only phenolphthalein can be used', 'only methyl orange can be used', 'no indicator can be used'],
  sol: 'Methyl orange (3.1–4.4) and phenolphthalein (8.3–10.0) change colour within a tiny volume of titrant on the near-vertical section of the curve, so either gives an accurate end point — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('ind-range-mcq', mcq({
  stem: 'Methyl orange is red below pH 3.1 and yellow above pH 4.4. Its colour in a solution of pH 8 is:',
  right: 'yellow',
  wrong: ['red', 'orange', 'colourless'],
  sol: 'pH 8 is well above the upper end (4.4) of the colour-change range, so only the yellow (basic) form is seen — option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('wawb-mcq', mcq({
  stem: 'It is found that no ordinary indicator gives a sharp end point in the titration of a weak acid against a weak base because:',
  right: 'the pH changes only gradually near the equivalence point, with no steep rise',
  wrong: ['the equivalence point lies exactly at pH 14', 'weak acids and bases react only in the presence of a catalyst', 'the pH at equivalence is below zero'],
  sol: 'In a weak acid–weak base titration there is no sharp vertical jump in the curve, so the colour of an indicator changes over many millilitres of titrant instead of one drop — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('ind-ar', ar({
  a: 'Phenolphthalein is a suitable indicator for the titration of ethanoic acid with sodium hydroxide.',
  r: 'At the equivalence point the solution is basic, with a pH within the colour-change range of phenolphthalein.',
  key: 'a',
  sol: 'Both statements are true. The equivalence point is at about pH 8.7, which lies in the range 8.3–10.0 of phenolphthalein, and R gives the reason for A — option (a).',
  d: 3, c: 'application', t: [5],
}));
add('ind-short2', short({
  marks: 2,
  stem: 'What is an acid–base indicator? Why is only a few drops of it added in a titration?',
  model: 'An indicator is a weak organic acid or base whose ionised and un-ionised forms have different colours, so its colour changes over a narrow pH range (about pK ± 1) near the end point. Only a few drops are used because the indicator is itself an acid or base and would use up some of the titrant, causing an error in the end point.',
  sol: 'Weak acid or base with two colours; few drops because it consumes titrant.',
  scheme: [['Definition: two coloured forms, change over a narrow pH range', 1], ['Few drops: otherwise it uses up titrant', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('titr-short3', short({
  marks: 3,
  stem: 'Hydrochloric acid is titrated with aqueous ammonia. Which indicator would you choose between methyl orange (3.1–4.4) and phenolphthalein (8.3–10.0)? Give two reasons, referring to the pH at the equivalence point.',
  model: 'Methyl orange. The end point of a strong acid–weak base titration lies below pH 7 (about 5.3 for 0.1 mol L⁻¹ solutions), so the indicator must change colour in the acidic range; methyl orange changes at 3.1–4.4, close to the steep part of the curve. Phenolphthalein changes at 8.3–10.0, which is far above the equivalence point on a curve that is nearly flat there, so it would give an end point that is not sharp and has a large error.',
  sol: 'Methyl orange: end point at pH below 7; phenolphthalein is unsuitable.',
  scheme: [['Methyl orange chosen', 1], ['Equivalence point pH below 7 matches the range 3.1–4.4', 1], ['Phenolphthalein would not give a sharp end point', 1]],
  d: 3, c: 'analysis', t: [5],
}));
add('titr-long', (() => {
  const pts = [0, 12.5, 24.9, 25.0, 25.1].map((v) => [v, phWASB(KA.acetic, 0.1, 25, 0.1, v)]);
  return long({
    stem: String.raw`A student titrates 25.0 mL of 0.100 mol L⁻¹ ethanoic acid with 0.100 mol L⁻¹ sodium hydroxide and calculates the following pH values (data given):

| Volume of NaOH / mL | 0 | 12.5 | 24.9 | 25.0 | 25.1 |
|---|---|---|---|---|---|
| pH | ${f2(pts[0][1])} | ${f2(pts[1][1])} | ${f2(pts[2][1])} | ${f2(pts[3][1])} | ${f2(pts[4][1])} |

(a) Calculate the volume of sodium hydroxide at the equivalence point and say, from the table, whether the solution there is acidic, basic or neutral. [2]

(b) Between which pH values does the curve rise steeply, and which indicator, methyl orange (3.1–4.4), bromothymol blue (6.0–7.6) or phenolphthalein (8.3–10.0), would you use? [2]

(c) Explain why methyl orange would be unsuitable. [1]`,
    model: `(a) The equivalence point is at 25.0 mL of NaOH (equal moles of acid and base, 25.0 × 0.100 = 2.50 mmol each). The pH there is ${f2(pts[3][1])}, so the solution is basic.

(b) The curve rises steeply from about ${f1(pts[2][1])} (24.9 mL) to about ${f1(pts[4][1])} (25.1 mL). Phenolphthalein (8.3–10.0) changes colour within this steep part, so it is used.

(c) Methyl orange changes colour at pH 3.1–4.4, well before the equivalence point, on the gently sloping part of the curve where the pH changes slowly (it would change over many millilitres), so the end point would be seen too early and not sharply.`,
    sol: `(a) 25.0 mL; pH ${f2(pts[3][1])}; basic. (b) phenolphthalein.`,
    scheme: [['(a) Equivalence volume 25.0 mL', 1], [`(a) pH ${f2(pts[3][1])}, basic`, 1], ['(b) Steep rise read from the table', 1], ['(b) Phenolphthalein chosen, range within the steep part', 1], ['(c) Methyl orange changes before equivalence, on the gentle part', 1]],
    d: 4, c: 'analysis', t: [5],
  });
})(), () => { const v = [24.9, 25.0, 25.1].map((x) => phWASB(1.8e-5, 0.1, 25, 0.1, x)); return v[0] > 7 && v[0] < 8 && near(v[1], 8.72, 0.005) && v[2] > 9.5 || `titr-long ${v}`; });
