// ISC 11 Chemistry ch14 Ionic Equilibrium: Acids, Bases and pH: two decks.
// Part 1 (t01-t03): electrolytes and degree of ionisation, three concepts of acids and bases, conjugate pairs, Ostwald's dilution law (derivation), Ka and Kb, polybasic acids.
// Part 2 (t04-t05): Kw, pH, pOH, calculations (strong and weak, mixtures, other temperatures), indicators and their choice in titrations.
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { SPECIES, LEWIS, OSTWALD, PHOSPH, TITR } from './svgs.mjs';
import { KA, KB, PHOS, alphaApprox, hApprox, phWASB, phWBSA, pH, f1, f2, f3, f4, ex, exL, log10 } from './data.mjs';

export const V = {
  species: svgV(SPECIES, 'Three boxes of particles with a bulb above each: all ions for a strong electrolyte, a few ions among molecules for a weak electrolyte and molecules only for a non-electrolyte', 'Brightness of the bulb shows how many ions are present (schematic).'),
  lewis: svgV(LEWIS, 'Ammonia donating its lone pair to boron trifluoride to form a coordinate bond', 'NH3 is the Lewis base and BF3 the Lewis acid.'),
  ostwald: svgV(OSTWALD, 'Degree of ionisation of methanoic acid and ethanoic acid against concentration on a logarithmic axis, rising on dilution', 'The weaker acid has the smaller degree of ionisation at every concentration.'),
  phosph: svgV(PHOSPH, 'Number line of pKa with the three ionisation steps of phosphoric acid at 2.12, 7.21 and 12.32', 'Each step is about a hundred thousand times weaker than the one before.'),
  titr: svgV(TITR, 'Titration curves of strong acid with strong base, ethanoic acid with sodium hydroxide and ammonia with hydrochloric acid, with shaded pH ranges of four indicators', 'Choose an indicator whose range lies on the steep part of the curve.'),
};

// ---- worked-example data (computed)
const aAc = alphaApprox(KA.acetic, 0.1), hAc = hApprox(KA.acetic, 0.1), pAc = pH(hAc);
const strong = [['HNO₂', KA.nitrous], ['HCOOH', KA.formic], ['C₆H₅COOH', KA.benzoic], ['CH₃COOH', KA.acetic], ['HCN', KA.hcn]];
const kwRows = [['273 K', 1.1e-15], ['298 K', 1.0e-14], ['310 K', 2.4e-14], ['333 K', 9.6e-14]].map(([t, k]) => [t, ex(k, 2), f2(-log10(k)), f2(-log10(Math.sqrt(k)))]);
const ohCa = 2 * 0.0030, pohCa = -log10(ohCa), phCa = 14 - pohCa;
const ohMa = hApprox(KB.methylamine, 0.2), pohMa = -log10(ohMa), phMa = 14 - pohMa, aMa = ohMa / 0.2;
const nH = 30.0 * 0.120, nOH = 20.0 * 0.060, excess = nH - nOH, hMix = excess / 50.0, phMix = pH(hMix);
const eqWA = phWASB(KA.acetic, 0.1, 25, 0.1, 25), eqWB = phWBSA(KB.ammonia, 0.1, 25, 0.1, 25);
const pk = [PHOS.k1, PHOS.k2, PHOS.k3].map((k) => -log10(k));

export const deck1 = deck({
  part: 1,
  title: 'Ionic Equilibrium — Part 1: Electrolytes, acid–base concepts, Ostwald\'s dilution law',
  goals: [
    'Classify substances as strong, weak or non-electrolytes and explain the degree of ionisation',
    'Apply the Arrhenius, Brønsted–Lowry and Lewis concepts and identify conjugate acid–base pairs',
    "Derive Ostwald's dilution law, use Ka and Kb to compare strengths, and write the stages of ionisation of a polybasic acid",
  ],
  slides: [
    sl('title', 'Why does one acid conduct better than another?', {
      b: 'Part 1: some solutes fill water with ions and others give almost none. We classify **electrolytes**, meet three **concepts of acids and bases**, and derive **Ostwald\'s dilution law**.',
      v: flow('LR', [['a', 'Strong and weak electrolytes'], ['b', 'Degree of ionisation'], ['c', 'Arrhenius, Brønsted–Lowry, Lewis'], ['d', 'Conjugate pairs'], ['e', "Ostwald's dilution law"], ['f', 'Ka, Kb, polybasic acids']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e'], ['e', 'f']], 'Flow chart of the topics of Part 1'),
      n: 'Welcome to Part One of ionic equilibrium. Some substances fill water with ions, while others give almost none, and that decides how well the solution conducts. We classify electrolytes, study three ways of defining acids and bases, derive the dilution law of Ostwald, and compare the strengths of acids and bases.',
    }),
    sl('concept', 'Strong, weak and non-electrolytes', {
      b: 'An **electrolyte** conducts electricity in solution through its **ions**. A **strong electrolyte** is almost completely ionised; a **weak electrolyte** is only slightly ionised, so **molecules and ions are in equilibrium**; a **non-electrolyte** gives no ions.',
      v: table(['Class', 'Ionisation', 'Examples', 'Bulb'], [['Strong electrolyte', 'practically complete', 'HCl, HNO₃, NaOH, KNO₃', 'bright'], ['Weak electrolyte', 'partial, reversible (⇌)', 'CH₃COOH, NH₄OH, H₂CO₃', 'dim'], ['Non-electrolyte', 'none', 'glucose, sucrose, urea', 'dark']], 'Table of strong, weak and non-electrolytes with examples'),
      n: 'An electrolyte conducts electricity in solution because of its ions. A strong electrolyte, such as hydrochloric acid or sodium hydroxide, is almost completely ionised. A weak electrolyte, such as ethanoic acid, is only slightly ionised, so molecules and ions stay in equilibrium. A non-electrolyte, such as glucose, forms no ions at all.',
    }),
    sl('diagram', 'What a bulb tells us', {
      b: 'Conductance depends on the **number of ions per litre**. In the strong electrolyte every unit is ionised; in the weak one only a small fraction is; the non-electrolyte stays as **neutral molecules**.',
      v: V.species,
      n: 'Compare the three boxes of particles. In the strong electrolyte every particle is an ion, so the bulb is bright. In the weak electrolyte nearly all particles are still molecules, with only one ion pair, so the bulb is dim. In the non-electrolyte there are no ions, and the bulb stays dark.',
    }),
    sl('concept', 'Degree of ionisation', {
      b: 'The **degree of ionisation** α is the **fraction of the dissolved electrolyte present as ions**: α = amount ionised ÷ amount dissolved. For strong electrolytes α ≈ 1; for weak ones α is small. A weak electrolyte HA gives $[\\text{H}^+] = C\\alpha$ at concentration C.',
      v: table(['Factor', 'Effect on α of a weak electrolyte'], [['Nature of the electrolyte', 'a stronger acid or base has a larger α'], ['Concentration', 'α increases on dilution'], ['Temperature', 'α increases as temperature rises'], ['Solvent', 'a solvent of high dielectric constant (water) favours ionisation']], 'Table of the factors that affect the degree of ionisation'),
      n: 'The degree of ionisation is the fraction of the dissolved electrolyte that is present as ions. For a strong electrolyte it is close to one, and for a weak one it is small. It depends on the nature of the electrolyte and the solvent, it rises with temperature, and it increases when the solution is diluted.',
    }),
    sl('check', 'Quick check: degree of ionisation', {
      b: 'Think about how the fraction ionised changes when more solvent is added.',
      n: 'Quick check. A weak acid such as ethanoic acid is dissolved in water. Decide which change makes a larger fraction of its molecules ionise. Think about what happens to the amount of solvent available for each molecule of acid.',
      chk: 'alphaup-mcq',
    }),
    sl('concept', 'Three concepts of acids and bases', {
      b: 'The **Arrhenius** concept needs water: an acid gives H⁺, a base gives OH⁻. **Brønsted–Lowry** widens it: an acid is a **proton donor** and a base a **proton acceptor**. **Lewis** widens it further: an acid is an **electron-pair acceptor** and a base an **electron-pair donor**.',
      v: table(['Concept', 'Acid', 'Base', 'Limitation'], [['Arrhenius', 'gives H⁺ in water', 'gives OH⁻ in water', 'only aqueous solutions; NH₃ has no OH group'], ['Brønsted–Lowry', 'proton donor', 'proton acceptor', 'needs a proton transfer'], ['Lewis', 'electron-pair acceptor', 'electron-pair donor', 'includes acids with no hydrogen (BF₃, AlCl₃)']], 'Table comparing the Arrhenius, Bronsted-Lowry and Lewis concepts of acids and bases'),
      n: 'There are three concepts of acids and bases. Arrhenius says an acid gives hydrogen ions in water and a base gives hydroxide ions, which limits it to water. Brønsted and Lowry say an acid donates a proton and a base accepts one. Lewis goes furthest: an acid accepts an electron pair and a base donates one.',
    }),
    sl('concept', 'Conjugate acid–base pairs', {
      b: 'When an acid donates a proton, what remains is its **conjugate base**; when a base accepts a proton, it becomes its **conjugate acid**. The two members of a pair differ by **one proton**. The **stronger** the acid, the **weaker** its conjugate base. **Water** is **amphiprotic**: it can act as acid or base.',
      v: table(['Acid', 'Conjugate base', 'Base', 'Conjugate acid'], [['HCl', 'Cl⁻', 'NH₃', 'NH₄⁺'], ['H₂O', 'OH⁻', 'H₂O', 'H₃O⁺'], ['HSO₄⁻', 'SO₄²⁻', 'CO₃²⁻', 'HCO₃⁻'], ['CH₃COOH', 'CH₃COO⁻', 'CH₃NH₂', 'CH₃NH₃⁺']], 'Table of acids with their conjugate bases and bases with their conjugate acids'),
      n: 'When an acid gives away a proton, the species left behind is its conjugate base. When a base takes up a proton, it becomes its conjugate acid. The two members of a pair differ by exactly one proton. The stronger the acid, the weaker its conjugate base. Water can act as an acid or as a base, so it is amphiprotic.',
    }),
    sl('example', 'Worked example: conjugate pairs in a reaction', {
      b: r`**Problem.** Identify the two conjugate acid–base pairs in $\ce{H2S + NH3 <=> HS- + NH4+}$.

$\ce{H2S}$ donates a proton, so it is the acid and $\ce{HS-}$ is its conjugate base. $\ce{NH3}$ accepts a proton, so it is the base and $\ce{NH4+}$ is its conjugate acid.`,
      v: table(['Species', 'Role in the forward reaction', 'Pair'], [['H₂S', 'acid (donates H⁺)', 'H₂S / HS⁻'], ['HS⁻', 'conjugate base of H₂S', 'H₂S / HS⁻'], ['NH₃', 'base (accepts H⁺)', 'NH₄⁺ / NH₃'], ['NH₄⁺', 'conjugate acid of NH₃', 'NH₄⁺ / NH₃']], 'Table of the two conjugate acid-base pairs in the reaction of hydrogen sulphide with ammonia'),
      n: 'Look for the species that loses a proton. Hydrogen sulphide gives away a proton, so it is the acid, and what remains, the hydrosulphide ion, is its conjugate base. Ammonia gains a proton, so it is the base, and the ammonium ion is its conjugate acid. Each pair differs by one proton.',
    }),
    sl('check', 'Quick check: limits of a definition', {
      b: 'Which concept defines a base as a substance that produces hydroxide ions?',
      n: 'Quick check. Ammonia is a base even though its molecule has no hydroxide group. Decide which definition of a base this fact contradicts, and which other definitions still include ammonia as a base.',
      chk: 'arrh-mcq',
    }),
    sl('diagram', 'A Lewis acid and a Lewis base', {
      b: 'In **NH₃ + BF₃** the lone pair on nitrogen is **donated** to boron, which has only six electrons. A **coordinate bond** forms and no proton is transferred, so this is a **Lewis** reaction but not a Brønsted one.',
      v: V.lewis,
      n: 'Here ammonia donates its lone pair of electrons to boron trifluoride. Boron has only six electrons, so it can accept the pair. The result is an adduct held by a coordinate bond in which both electrons came from nitrogen. Ammonia is the Lewis base, boron trifluoride is the Lewis acid, and no proton moves.',
    }),
    sl('concept', 'Lewis acids and Lewis bases', {
      b: 'A **Lewis acid** has an empty orbital or incomplete octet; a **Lewis base** has a lone pair. Every Brønsted base is also a Lewis base, because it must donate a lone pair to the proton, but **Lewis acids include species with no hydrogen**.',
      v: table(['Lewis acids (pair acceptors)', 'Lewis bases (pair donors)'], [['H⁺', 'NH₃'], ['BF₃, AlCl₃ (incomplete octet)', 'H₂O, OH⁻'], ['Cu²⁺, Fe³⁺ (empty d orbitals)', 'Cl⁻, CN⁻']], 'Table of examples of Lewis acids and Lewis bases'),
      n: 'A Lewis acid has an empty orbital or an incomplete octet, and so it accepts an electron pair. A Lewis base has a lone pair to donate. A proton, boron trifluoride, aluminium chloride and metal ions are Lewis acids. Ammonia, water, hydroxide, chloride and cyanide ions are Lewis bases.',
    }),
    sl('concept', "Ostwald's dilution law: derivation", {
      b: 'For $\\text{HA} \\rightleftharpoons \\text{H}^+ + \\text{A}^-$ at concentration C and degree of ionisation α, the equilibrium amounts are **C(1 − α), Cα, Cα**. So $K_a = \\dfrac{C\\alpha^2}{1-\\alpha}$. For a **weak** acid α ≪ 1, so **Ka = Cα²** and **α = √(Ka/C)**. Then $[\\text{H}^+] = C\\alpha = \\sqrt{K_aC}$. A weak base gives $\\alpha = \\sqrt{K_b/C}$.',
      v: flow('LR', [['a', 'HA ⇌ H⁺ + A⁻'], ['b', 'Equilibrium: C(1 − α), Cα, Cα'], ['c', 'Ka = Cα² / (1 − α)'], ['d', 'α ≪ 1: α = √(Ka / C)'], ['e', 'α increases on dilution']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow chart of the derivation of Ostwald dilution law'),
      n: 'Start with the acid at concentration C and degree of ionisation alpha. At equilibrium the acid is C times one minus alpha, and each ion is C times alpha. Putting these in the expression gives the ionisation constant as C alpha squared over one minus alpha. For a weak acid alpha is small, so alpha equals the square root of the constant over C.',
    }),
    sl('diagram', 'Degree of ionisation against concentration', {
      b: 'The curves follow $\\alpha = \\sqrt{K_a/C}$ (exact quadratic used). On **dilution α increases**, and at any concentration the acid with the **larger Ka** has the **larger α**. α tends to 1 only at very high dilution.',
      v: V.ostwald,
      n: 'This graph shows the degree of ionisation of two acids on a logarithmic concentration axis. Both curves rise as the solution becomes more dilute, which is the dilution law in action. At every concentration the acid with the larger ionisation constant, methanoic acid, has the larger degree of ionisation than ethanoic acid.',
    }),
    sl('example', 'Worked example: degree of ionisation of ethanoic acid', {
      b: r`**Problem.** Find α, $[\text{H}^+]$ and pH of 0.10 mol L⁻¹ ethanoic acid, $K_a = 1.8 \times 10^{-5}$.

$\alpha = \sqrt{K_a/C} = \sqrt{1.8 \times 10^{-5}/0.10} = ${f4(aAc)}$ (about ${f1(aAc * 100)}%); $[\text{H}^+] = C\alpha = ${exL(hAc, 3)}$ mol L⁻¹; pH $= ${f2(pAc)}$.`,
      v: table(['Step', 'Working', 'Result'], [['α = √(Ka / C)', '√(1.8 × 10⁻⁵ / 0.10)', f4(aAc)], ['[H⁺] = Cα', `0.10 × ${f4(aAc)}`, `${ex(hAc, 3)} mol L⁻¹`], ['pH = −log [H⁺]', `−log (${ex(hAc, 3)})`, f2(pAc)]], 'Table of the calculation of the degree of ionisation and pH of ethanoic acid'),
      n: 'Divide the ionisation constant by the concentration and take the square root, which gives a degree of ionisation of about one point three percent. Multiply by the concentration to get the hydrogen ion concentration, about one point three times ten to the minus three. The pH is the negative logarithm of that, about two point nine.',
    }),
    sl('check', 'Quick check: dilution law', {
      b: 'Use α = √(Ka/C): what happens to α when C is divided by 4?',
      n: 'Quick check. A weak monobasic acid is diluted to a quarter of its concentration at constant temperature. Use the square root relation between the degree of ionisation and the concentration to decide by what factor the degree of ionisation changes.',
      chk: 'ostw-mcq',
    }),
    sl('concept', 'Ka, Kb and the strength of acids and bases', {
      b: 'A **larger Ka** means a **stronger acid**, a larger α at the same concentration and a **smaller pKa** (pKa = −log Ka). The same holds for **Kb** and bases. At equal concentration $[\\text{H}^+] = \\sqrt{K_aC}$, so the strength order follows the order of Ka.',
      v: table(['Acid (298 K)', 'Ka', 'pKa', 'α at 0.10 mol L⁻¹ (approx.)'], strong.map(([n, k]) => [n, ex(k, 2), f2(-log10(k)), k > 1e-6 ? f3(alphaApprox(k, 0.1)) : ex(alphaApprox(k, 0.1), 1)]), 'Table of the ionisation constants, pKa and degrees of ionisation of five weak acids'),
      n: 'A larger ionisation constant means a stronger acid. Such an acid has a smaller value of the negative logarithm of its constant, and a larger degree of ionisation at the same concentration. Nitrous acid is the strongest in this table and hydrocyanic acid is the weakest. The same reasoning applies to the ionisation constants of bases.',
    }),
    sl('concept', 'Polybasic acids ionise in stages', {
      b: 'A **polybasic acid** gives up its protons **one stage at a time**, each with its own constant: **Ka1 ≫ Ka2 ≫ Ka3**. The next proton must leave a **negative ion**, which holds it more strongly, and H⁺ already present holds back further ionisation.',
      v: table(['Stage', 'Equation', 'Ka (298 K)'], [['1', 'H₃PO₄ ⇌ H⁺ + H₂PO₄⁻', ex(PHOS.k1, 2)], ['2', 'H₂PO₄⁻ ⇌ H⁺ + HPO₄²⁻', ex(PHOS.k2, 2)], ['3', 'HPO₄²⁻ ⇌ H⁺ + PO₄³⁻', ex(PHOS.k3, 2)]], 'Table of the three stages of ionisation of phosphoric acid'),
      n: 'A polybasic acid gives up its protons in stages, and each stage has its own ionisation constant. Phosphoric acid has three stages. Each constant is far smaller than the one before, because a proton must leave an ion that is already negatively charged, and because hydrogen ions from the first stage hold back the next. So the first stage supplies almost all the hydrogen ions.',
    }),
    sl('diagram', 'Phosphoric acid on a pKa scale', {
      b: `The pKa values are **${f2(pk[0])}, ${f2(pk[1])} and ${f2(pk[2])}**. Each step is about **10⁵ times weaker** than the previous one, so in a solution of H₃PO₄ the species present in quantity are **H₃PO₄, H₂PO₄⁻ and H⁺**; HPO₄²⁻ and PO₄³⁻ are present only in traces.`,
      v: V.phosph,
      n: 'This number line places the three ionisation steps of phosphoric acid by their pKa values. The larger the pKa, the weaker the acid. The steps are spread far apart, each about one hundred thousand times weaker than the one before. That is why only the first stage matters when we count hydrogen ions in a phosphoric acid solution.',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Strong electrolytes are fully ionised, weak ones partly (equilibrium), non-electrolytes give no ions; α is the fraction ionised.',
        'Arrhenius: H⁺ and OH⁻ in water; Brønsted–Lowry: proton donor and acceptor; Lewis: electron-pair acceptor and donor.',
        'Conjugate pairs differ by one proton; the stronger the acid, the weaker its conjugate base.',
        "Ostwald: Ka = Cα² / (1 − α); for weak electrolytes α = √(Ka/C), so α rises on dilution; [H⁺] = √(KaC).",
        'Polybasic acids ionise in stages with Ka1 ≫ Ka2 ≫ Ka3.',
      ],
      v: table(['Idea', 'Key fact'], [['Degree of ionisation', 'α = fraction ionised'], ['Conjugate pair', 'differ by one H⁺'], ['Dilution law', 'α = √(Ka / C)'], ['Acid strength', 'larger Ka, smaller pKa']], 'Summary table of the key ideas of Part 1'),
      n: 'Let us sum up Part One. Strong electrolytes are completely ionised and weak ones only partly. We met three definitions of acids and bases, and conjugate pairs that differ by one proton. The dilution law of Ostwald shows that for a weak electrolyte the degree of ionisation equals the square root of the constant over the concentration. Polybasic acids ionise stage by stage.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'In the derivation write the three equilibrium amounts first, then Ka, then the approximation α ≪ 1.',
        'Name both members of a conjugate pair and say which is the acid and which the base; water can be either.',
        'Use α = √(Ka/C) only for weak electrolytes with small α; otherwise solve Ka = Cα² / (1 − α).',
        'For a polybasic acid write each stage separately with its own Ka.',
        'Classify BF₃ and AlCl₃ as Lewis acids and NH₃ and CN⁻ as Lewis bases, with the electron-pair reason.',
      ],
      v: table(['Slip', 'Fix'], [['Saying α decreases on dilution', 'α increases; the ionisation constant stays the same'], ['Ka changes with concentration', 'Ka depends only on temperature'], ['Writing H₃PO₄ → 3H⁺ + PO₄³⁻ in one step', 'write three stages'], ['Calling every acid a proton donor', 'Lewis acids accept an electron pair']], 'Table of common slips in Part 1 and their fixes'),
      n: 'Some exam tips. In the derivation, write the equilibrium amounts first, then the constant, then the approximation for a small degree of ionisation. Name both members of each conjugate pair. Use the square root relation only for weak electrolytes. Write every stage of a polybasic acid separately, and give the electron pair reason when naming a Lewis acid or base.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Ionic Equilibrium — Part 2: Kw, pH and pOH, indicators and titrations',
  goals: [
    'Use the ionic product of water, pH, pOH and pKw, also at temperatures other than 298 K',
    'Calculate the pH of strong and weak acids and bases and of mixtures of a strong acid and a strong base',
    'Explain how indicators work and choose a suitable indicator for each type of titration',
  ],
  slides: [
    sl('title', 'How acidic is a solution?', {
      b: 'Part 2: water itself ionises a little. That fact gives the **ionic product Kw**, the **pH scale**, and a way to choose an **indicator** for a titration.',
      v: flow('LR', [['a', 'Ionic product of water'], ['b', 'pH, pOH, pKw'], ['c', 'Strong and weak solutions'], ['d', 'Mixtures'], ['e', 'Indicators'], ['f', 'Titration curves']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e'], ['e', 'f']], 'Flow chart of the topics of Part 2'),
      n: 'Welcome to Part Two. Pure water ionises very slightly, and this fact leads to the ionic product of water and the pH scale. We calculate the pH of strong and weak acids and bases, and of mixtures. Then we study indicators and learn how to choose the right one for each kind of titration.',
    }),
    sl('concept', 'Ionic product of water and temperature', {
      b: r`Water ionises slightly: $\ce{2H2O <=> H3O+ + OH-}$. The **ionic product** is $K_w = [\text{H}^+][\text{OH}^-]$, **1.0 × 10⁻¹⁴ mol² L⁻² at 298 K**. The ionisation is **endothermic**, so Kw **rises with temperature**. Pure water is always **neutral** ([H⁺] = [OH⁻]) but its pH is not always 7.`,
      v: table(['Temperature', 'Kw / mol² L⁻²', 'pKw', 'pH of pure water'], kwRows, 'Table of the ionic product of water, pKw and the pH of pure water at four temperatures'),
      n: 'Water ionises slightly, and the product of the hydrogen and hydroxide ion concentrations is the ionic product, which is one times ten to the minus fourteen at room temperature. The ionisation absorbs heat, so the product rises with temperature. Pure water stays neutral because the two concentrations are equal, but its pH falls below seven when it is warm.',
    }),
    sl('concept', 'pH, pOH and pKw', {
      b: '**pH = −log [H⁺]**, **pOH = −log [OH⁻]** and **pKw = −log Kw**, so **pH + pOH = pKw** (14.00 at 298 K). Each unit of pH is a **factor of 10** in [H⁺]. At 298 K a solution is acidic below pH 7 and basic above.',
      v: table(['pH', '[H⁺] / mol L⁻¹', '[OH⁻] / mol L⁻¹', 'Nature at 298 K'], [['1', '1 × 10⁻¹', '1 × 10⁻¹³', 'strongly acidic'], ['3', '1 × 10⁻³', '1 × 10⁻¹¹', 'acidic'], ['7', '1 × 10⁻⁷', '1 × 10⁻⁷', 'neutral'], ['11', '1 × 10⁻¹¹', '1 × 10⁻³', 'basic'], ['13', '1 × 10⁻¹³', '1 × 10⁻¹', 'strongly basic']], 'Table linking pH with the hydrogen and hydroxide ion concentrations'),
      n: 'The pH is the negative logarithm of the hydrogen ion concentration, and the pOH is the same for hydroxide ions. Together they add up to the negative logarithm of the ionic product, which is fourteen at room temperature. Each step of one pH unit means the hydrogen ion concentration changes by a factor of ten.',
    }),
    sl('check', 'Quick check: the logarithmic scale', {
      b: 'A difference of n pH units is a factor of 10ⁿ in [H⁺].',
      n: 'Quick check. Two liquids differ in pH by a few units. Because the scale is logarithmic, the ratio of their hydrogen ion concentrations is ten raised to the difference. Work out the ratio for the two liquids in the question and choose the matching option.',
      chk: 'phratio-mcq',
    }),
    sl('example', 'Worked example: pH of a strong base', {
      b: r`**Problem.** Find the pH of 0.0030 mol L⁻¹ calcium hydroxide at 298 K (completely ionised).

$\ce{Ca(OH)2 -> Ca^2+ + 2OH-}$, so $[\text{OH}^-] = 2 \times 0.0030 = ${f3(ohCa)}$ mol L⁻¹; pOH $= ${f2(pohCa)}$; pH $= 14.00 - ${f2(pohCa)} = ${f2(phCa)}$.`,
      v: table(['Step', 'Working', 'Result'], [['[OH⁻]', '2 × 0.0030', `${f3(ohCa)} mol L⁻¹`], ['pOH', `−log ${f3(ohCa)}`, f2(pohCa)], ['pH', `14.00 − ${f2(pohCa)}`, f2(phCa)]], 'Table of the calculation of the pH of calcium hydroxide solution'),
      n: 'Calcium hydroxide is a strong base that releases two hydroxide ions per formula unit, so the hydroxide concentration is twice the concentration of the base. Take the negative logarithm to get the pOH, which is about two point two. Subtract it from fourteen to obtain a pH of about eleven point eight.',
    }),
    sl('concept', 'pH of weak acids and weak bases', {
      b: 'For a weak monobasic acid, $[\\text{H}^+] = C\\alpha = \\sqrt{K_aC}$; for a weak base, $[\\text{OH}^-] = \\sqrt{K_bC}$, then pOH and pH = 14 − pOH. This needs **α ≪ 1**. Do **not** treat a weak electrolyte as fully ionised.',
      v: table(['Solute', 'Constant (298 K)', 'Formula', 'Used for'], [['CH₃COOH', 'Ka = 1.8 × 10⁻⁵', '[H⁺] = √(Ka C)', 'pH of the acid'], ['HNO₂', 'Ka = 4.5 × 10⁻⁴', '[H⁺] = √(Ka C)', 'pH of the acid'], ['NH₃(aq)', 'Kb = 1.8 × 10⁻⁵', '[OH⁻] = √(Kb C)', 'pOH, then pH'], ['CH₃NH₂(aq)', 'Kb = 4.4 × 10⁻⁴', '[OH⁻] = √(Kb C)', 'pOH, then pH']], 'Table of formulas for the pH of weak acids and weak bases'),
      n: 'For a weak acid the hydrogen ion concentration is the square root of the ionisation constant times the concentration, provided the degree of ionisation is small. For a weak base the same expression gives the hydroxide ion concentration, and we then find the pOH and subtract from fourteen to get the pH.',
    }),
    sl('example', 'Worked example: pH of a weak base', {
      b: r`**Problem.** Find the pH of 0.20 mol L⁻¹ methylamine, $K_b = 4.4 \times 10^{-4}$ at 298 K, taking α ≪ 1.

$[\text{OH}^-] = \sqrt{K_bC} = \sqrt{4.4 \times 10^{-4} \times 0.20} = ${exL(ohMa, 3)}$ mol L⁻¹; pOH $= ${f2(pohMa)}$; pH $= ${f2(phMa)}$. (α = ${f3(aMa)}, small enough.)`,
      v: table(['Step', 'Working', 'Result'], [['[OH⁻] = √(Kb C)', '√(4.4 × 10⁻⁴ × 0.20)', `${ex(ohMa, 3)} mol L⁻¹`], ['pOH', `−log (${ex(ohMa, 3)})`, f2(pohMa)], ['pH', `14.00 − ${f2(pohMa)}`, f2(phMa)]], 'Table of the calculation of the pH of methylamine solution'),
      n: 'Multiply the base ionisation constant by the concentration and take the square root, giving a hydroxide ion concentration of about nine point four times ten to the minus three. Its negative logarithm is the pOH, about two. Subtract from fourteen to get a pH of about twelve. The degree of ionisation is under five percent, so the approximation holds.',
    }),
    sl('check', 'Quick check: pH of a weak acid', {
      b: 'Square root of Ka times C, then the negative logarithm.',
      n: 'Quick check. For a weak acid assume the degree of ionisation is small. Multiply the ionisation constant by the concentration, take the square root to get the hydrogen ion concentration, and then the negative logarithm. Match your answer with the options.',
      chk: 'phweak-mcq',
    }),
    sl('concept', 'Mixing a strong acid with a strong base', {
      b: 'Compare the **moles** of H⁺ and OH⁻ (concentration × volume), not the concentrations. The **excess** is divided by the **total volume**. If H⁺ is in excess, pH = −log [H⁺]; if OH⁻ is in excess, find pOH, then pH = 14 − pOH.',
      v: flow('LR', [['a', 'n(H⁺) and n(OH⁻) in mmol'], ['b', 'Subtract: find the excess'], ['c', 'Divide by total volume'], ['d', 'pH or pOH; use pH + pOH = 14']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow chart of the steps for the pH of a mixture of a strong acid and a strong base'),
      n: 'To find the pH of a mixture of a strong acid and a strong base, first work out the moles of each ion. Subtract the smaller from the larger to find the excess. Divide the excess by the total volume of the mixture. Then take the negative logarithm, and if the base is in excess, subtract the pOH from fourteen.',
    }),
    sl('example', 'Worked example: a mixture', {
      b: r`**Problem.** Find the pH when 30.0 mL of 0.120 mol L⁻¹ nitric acid is mixed with 20.0 mL of 0.060 mol L⁻¹ potassium hydroxide at 298 K.

$n(\text{H}^+) = ${f1(nH)}$ mmol, $n(\text{OH}^-) = ${f1(nOH)}$ mmol; excess H⁺ $= ${f1(excess)}$ mmol in 50.0 mL, so $[\text{H}^+] = ${f3(hMix)}$ mol L⁻¹ and pH $= ${f2(phMix)}$.`,
      v: table(['Quantity', 'Working', 'Result'], [['n(H⁺)', '30.0 × 0.120', `${f1(nH)} mmol`], ['n(OH⁻)', '20.0 × 0.060', `${f1(nOH)} mmol`], ['Excess H⁺', `${f1(nH)} − ${f1(nOH)}`, `${f1(excess)} mmol`], ['[H⁺]', `${f1(excess)} / 50.0`, `${f3(hMix)} mol L⁻¹`], ['pH', `−log ${f3(hMix)}`, f2(phMix)]], 'Table of the calculation of the pH of a mixture of nitric acid and potassium hydroxide'),
      n: 'First the moles. The acid supplies three point six millimoles of hydrogen ions and the base supplies one point two millimoles of hydroxide ions. The acid is in excess by two point four millimoles. Dividing by the total volume of fifty millilitres gives a hydrogen ion concentration of about forty eight thousandths, so the pH is about one point three.',
    }),
    sl('concept', 'Acid–base indicators', {
      b: 'An **indicator** is a weak organic acid or base whose **ionised and un-ionised forms have different colours**. The colour changes over a **narrow pH range** of about two units; only a **few drops** are used, since the indicator itself consumes a little acid or alkali.',
      v: table(['Indicator', 'pH range', 'Colour in acid', 'Colour in alkali'], [['Methyl orange', '3.1–4.4', 'red', 'yellow'], ['Methyl red', '4.4–6.2', 'red', 'yellow'], ['Bromothymol blue', '6.0–7.6', 'yellow', 'blue'], ['Phenolphthalein', '8.3–10.0', 'colourless', 'pink']], 'Table of the pH ranges and colours of four indicators'),
      n: 'An indicator is a weak organic acid or base whose ionised and un-ionised forms have different colours. Its colour changes over a narrow range of pH, about two units wide. Methyl orange changes in acid, bromothymol blue near neutral, and phenolphthalein in alkaline solution. Only a few drops are added, because the indicator itself uses up some acid or alkali.',
    }),
    sl('diagram', 'Titration curves and indicator ranges', {
      b: 'Each curve shows pH against titrant added to **25.0 mL of 0.100 mol L⁻¹** solution; the **shaded bands** are indicator ranges. An indicator is suitable if its band lies on the **steep rise** of the curve. The strong acid–strong base rise spans pH 4 to 10; the other two rises are shorter and lie above or below 7.',
      v: V.titr,
      n: 'Here are three titration curves, with shaded bands for the ranges of four indicators. For a strong acid with a strong base the pH jumps steeply from about four to ten, so several indicators work. For a weak acid the steep part lies above seven, and for a weak base it lies below seven. An indicator must change colour on the steep part.',
    }),
    sl('concept', 'Choosing an indicator', {
      b: `Use the **pH at the equivalence point**: strong acid–strong base is 7, weak acid–strong base is above 7 (about ${f1(eqWA)} here), strong acid–weak base is below 7 (about ${f1(eqWB)}). A weak acid with a weak base shows **no sharp rise**, so no ordinary indicator works.`,
      v: table(['Titration', 'pH at equivalence (0.1 mol L⁻¹)', 'Suitable indicator'], [['Strong acid – strong base', '7.0', 'any of the four'], ['Weak acid – strong base (CH₃COOH – NaOH)', `${f1(eqWA)}`, 'phenolphthalein'], ['Strong acid – weak base (HCl – NH₃)', `${f1(eqWB)}`, 'methyl orange or methyl red'], ['Weak acid – weak base', 'no steep rise', 'none gives a sharp end point']], 'Table of the choice of indicator for four types of titration'),
      n: 'Choose the indicator by the pH at the equivalence point. For a strong acid and a strong base, any of the common indicators works. A weak acid with a strong base ends above seven, so phenolphthalein is the right choice. A strong acid with a weak base ends below seven, so methyl orange or methyl red is used. For a weak acid with a weak base, no indicator gives a sharp change.',
    }),
    sl('check', 'Quick check: strong acid against a weak base', {
      b: 'Is the equivalence point above or below pH 7 for hydrochloric acid and ammonia?',
      n: 'Quick check. Hydrochloric acid is titrated against aqueous ammonia. Decide whether the solution at the equivalence point is acidic, neutral or basic. Then pick the indicator whose colour change range lies in the right part of the pH scale.',
      chk: 'ind-sawb-mcq',
    }),
    sl('example', 'Worked example: reading indicator colours', {
      b: '**Problem.** A solution has pH 5.0. State the colour shown by each indicator, using the ranges in the table.',
      v: table(['Indicator', 'Range', 'Where pH 5.0 lies', 'Colour seen'], [['Methyl orange', '3.1–4.4', 'above the range', 'yellow'], ['Methyl red', '4.4–6.2', 'inside the range', 'orange (mixture of red and yellow)'], ['Bromothymol blue', '6.0–7.6', 'below the range', 'yellow'], ['Phenolphthalein', '8.3–10.0', 'below the range', 'colourless']], 'Table of the colours of four indicators in a solution of pH five'),
      n: 'Compare the pH with each range. Five is above the range of methyl orange, so it shows its alkaline colour, yellow. It lies inside the range of methyl red, which shows an in between orange. It is below the range of bromothymol blue, which stays yellow, and below the range of phenolphthalein, which stays colourless.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Kw = [H⁺][OH⁻] = 1.0 × 10⁻¹⁴ at 298 K and increases with temperature; pure water is neutral at pH = ½ pKw.',
        'pH = −log [H⁺]; pOH = −log [OH⁻]; pH + pOH = pKw.',
        'Strong: take the full concentration (count the OH⁻ of Ca(OH)₂); weak: [H⁺] = √(KaC) or [OH⁻] = √(KbC).',
        'Mixtures: find the excess moles, divide by the total volume, then take the logarithm.',
        'Indicator: its range must lie on the steep part of the curve; none suits a weak acid with a weak base.',
      ],
      v: table(['Titration', 'Indicator'], [['Strong acid – strong base', 'any'], ['Weak acid – strong base', 'phenolphthalein'], ['Strong acid – weak base', 'methyl orange / methyl red'], ['Weak acid – weak base', 'none']], 'Summary table of the choice of indicator'),
      n: 'To sum up Part Two. The ionic product of water rises with temperature, and pure water is neutral when the two ion concentrations are equal. The pH and pOH add up to the negative logarithm of the ionic product. We calculated the pH of strong and weak solutions and of mixtures, and chose indicators by the steep part of the titration curve.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Check the temperature before using pH + pOH = 14; otherwise use pKw for that temperature.',
        'For bases such as Ca(OH)₂ and Ba(OH)₂ double the concentration to get [OH⁻].',
        'In mixtures use moles (mL × mol L⁻¹) and divide by the total volume.',
        'State the pH at the equivalence point when justifying an indicator.',
        'Give two decimal places for pH and show the log step.',
      ],
      v: table(['Slip', 'Fix'], [['pH 7 for pure water at every temperature', 'neutral means [H⁺] = [OH⁻]'], ['Dividing by the volume of one solution only', 'use the total volume of the mixture'], ['Using √(KaC) for a strong acid', 'a strong acid is fully ionised: [H⁺] = C'], ['Phenolphthalein for HCl against NH₃', 'use methyl orange or methyl red']], 'Table of common slips in Part 2 and their fixes'),
      n: 'Some exam tips. Check the temperature before using fourteen as the sum of pH and pOH. Double the concentration for bases that release two hydroxide ions. In mixtures use moles and divide by the total volume. When you justify an indicator, state the pH at the equivalence point. Give the pH to two decimal places and show the logarithm step.',
    }),
  ],
});
