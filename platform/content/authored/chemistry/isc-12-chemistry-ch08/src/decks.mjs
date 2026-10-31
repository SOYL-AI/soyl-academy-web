// ISC 12 Chemistry ch08 Inner Transition (f-Block) Elements: Lanthanoids and Actinoids — two decks: Part 1 (t01–t02)
// lanthanoids: configuration, radii, oxidation states, colour, complexes, alloys and the lanthanoid contraction;
// Part 2 (t03–t04) chemical reactivity of lanthanoids, actinoids and their comparison with lanthanoids.
import { sl, deck, table, flow, svgV, plot, r } from './lib.mjs';
import { BLOCKS } from './svgs.mjs';

export const V = {
  blocks: svgV(BLOCKS, 'Periodic table outline showing the s-block on the left, the p-block on the right, the d-block in the middle and the f-block as two separate rows of fourteen at the bottom', 'Schematic: the two bottom rows are the lanthanoids (4f) and the actinoids (5f).'),
};

// Ionic radii of Ln³⁺ (pm, approximate, six-coordinate).
const LN3 = [[57, 103], [58, 101], [59, 99], [60, 98], [62, 96], [63, 95], [64, 94], [65, 92], [66, 91], [67, 90], [68, 89], [69, 88], [70, 87], [71, 86]];
export const lnPlot = plot(
  {
    x: { min: 57, max: 71, label: 'Atomic number (La = 57 to Lu = 71)' },
    y: { min: 80, max: 110, label: 'Radius of Ln³⁺ ion (pm)' },
    series: [{ label: 'Ln³⁺ ionic radius', kind: 'line', points: LN3 }],
  },
  'Ionic radius of the tripositive lanthanoid ions falling smoothly and steadily from about 103 picometres for lanthanum to about 86 for lutetium',
  'Approximate values; the steady fall is the lanthanoid contraction.',
);
// Range of oxidation states: number of states shown by early actinoids vs lanthanoids (illustrative maxima).
export const oxPlot = plot(
  {
    x: { min: 90, max: 97, label: 'Atomic number (Th = 90 to Bk = 97)' },
    y: { min: 2, max: 8, label: 'Highest oxidation state' },
    series: [{ label: 'Highest oxidation state of actinoid', kind: 'line', points: [[90, 4], [91, 5], [92, 6], [93, 7], [94, 7], [95, 6], [96, 4], [97, 4]] }],
  },
  'Highest oxidation state of the early actinoids rising from plus four for thorium to plus seven for neptunium and plutonium, then falling again to plus four for curium and berkelium',
  'Compare: almost every lanthanoid has a highest state of only +3 or +4.',
);

export const deck1 = deck({
  part: 1,
  title: 'Inner Transition Elements — Part 1: The lanthanoids and the lanthanoid contraction',
  goals: [
    'Write the general electronic configuration of the lanthanoids and of their tripositive ions',
    'Explain the stability of the +3 state and the occurrence of +2 and +4 states',
    'Describe the colour, complex formation and alloys of lanthanoids',
    'Explain the cause of the lanthanoid contraction and its consequences',
  ],
  slides: [
    sl('title', 'The f-block elements', {
      b: 'Part 1 — the lanthanoids: fourteen elements that are almost chemical twins.',
      v: V.blocks,
      n: 'Namaste! The two rows printed separately at the bottom of the periodic table are the inner transition elements. The lanthanoids are found in the magnets of electric motors, the phosphors of screens and the flints of lighters. In this part we study how their electrons are arranged, why they are so alike, and the famous lanthanoid contraction.',
    }),
    sl('concept', 'Lanthanoids and actinoids: position', {
      b: 'In the **f-block**, electrons enter an **(n−2)f** subshell. The **lanthanoids** are the fourteen elements **cerium (58) to lutetium (71)** that follow lanthanum and fill **4f**; the **actinoids**, thorium (90) to lawrencium (103), fill **5f**. Lanthanum and actinium are usually studied with them. Lanthanoids belong to group 3, period 6.',
      v: table(['Series', 'Elements', 'Subshell filled', 'Period'], [['Lanthanoids', 'Ce (58) to Lu (71)', '4f', '6'], ['Actinoids', 'Th (90) to Lr (103)', '5f', '7']], 'Table of the two f-block series'),
      n: 'The f-block has two series of fourteen. The lanthanoids, from cerium to lutetium, follow lanthanum and fill the four f subshell. The actinoids, from thorium to lawrencium, follow actinium and fill five f. Because the f subshell lies two shells inside the outermost one, adding f electrons changes the outer electrons very little, which is why each series is so uniform.',
    }),
    sl('concept', 'Electronic configurations of the lanthanoids', {
      b: r`General configuration $[\text{Xe}]4f^{1\text{–}14}5d^{0\text{–}1}6s^2$. The 4f and 5d levels are close in energy; a 5d electron appears only in **La, Ce, Gd and Lu**, where it keeps the 4f subshell empty, half-filled or full (Gd 4f⁷5d¹, Lu 4f¹⁴5d¹).`,
      v: table(['Element', 'Configuration', 'Element', 'Configuration'], [['La (57)', '[Xe]5d¹6s²', 'Gd (64)', '[Xe]4f⁷5d¹6s²'], ['Ce (58)', '[Xe]4f¹5d¹6s²', 'Tb (65)', '[Xe]4f⁹6s²'], ['Pr (59)', '[Xe]4f³6s²', 'Dy (66)', '[Xe]4f¹⁰6s²'], ['Nd (60)', '[Xe]4f⁴6s²', 'Er (68)', '[Xe]4f¹²6s²'], ['Sm (62)', '[Xe]4f⁶6s²', 'Yb (70)', '[Xe]4f¹⁴6s²'], ['Eu (63)', '[Xe]4f⁷6s²', 'Lu (71)', '[Xe]4f¹⁴5d¹6s²']], 'Table of the electronic configurations of selected lanthanoids'),
      n: 'All the lanthanoids have two six s electrons outside a xenon core, and their four f subshells fill from one to fourteen. Because four f and five d are close in energy, a five d electron appears only in a few cases, such as gadolinium and lutetium, where it keeps the four f subshell exactly half-filled or completely full.',
    }),
    sl('example', 'Worked example: configurations of Ln³⁺ ions', {
      b: r`**Rule.** To form Ln³⁺, remove the two 6s electrons and then one 5d electron (if present), otherwise one 4f electron.

**Problem.** Write the configurations of Nd³⁺ (Nd = 60), Gd³⁺ (Gd = 64), Tm³⁺ (Tm = 69) and Lu³⁺ (Lu = 71).

**Step 1.** Nd [Xe]4f⁴6s² → Nd³⁺ [Xe]4f³. Gd [Xe]4f⁷5d¹6s² → Gd³⁺ [Xe]4f⁷.

**Step 2.** Tm [Xe]4f¹³6s² → Tm³⁺ [Xe]4f¹². Lu [Xe]4f¹⁴5d¹6s² → Lu³⁺ [Xe]4f¹⁴.`,
      v: table(['Ion', 'Configuration', 'Unpaired f electrons'], [['Nd³⁺', '4f³', '3'], ['Gd³⁺', '4f⁷', '7'], ['Tm³⁺', '4f¹²', '2'], ['Lu³⁺', '4f¹⁴', '0']], 'Table of Ln three plus configurations and unpaired electrons'),
      n: 'To form a tripositive ion, take away the two six s electrons first, and then a five d electron if there is one; otherwise take a four f electron. Neodymium three plus is four f three. Gadolinium loses its five d electron and keeps a half-filled four f seven. Thulium three plus is four f twelve, and lutetium three plus has a full four f fourteen.',
    }),
    sl('check', 'Quick check: Ln³⁺ configuration', {
      b: 'Choose the configuration of a tripositive lanthanoid ion.',
      n: 'Quick check. Remove the two outer s electrons, then a five d electron if there is one, otherwise a four f electron.',
      chk: 'ln3-mcq',
    }),
    sl('concept', 'Oxidation states', {
      b: 'The **+3** state is common to all lanthanoids (three ionisation enthalpies are balanced by high lattice and hydration enthalpies of Ln³⁺). Some show **+2** or **+4** when this gives an **empty (f⁰), half-filled (f⁷) or full (f¹⁴)** subshell, or is close to it.',
      v: table(['Ion', 'Configuration', 'Behaviour in water'], [['Ce⁴⁺', '4f⁰', 'Strong oxidising agent (returns to Ce³⁺)'], ['Tb⁴⁺', '4f⁷', 'Oxidising agent'], ['Eu²⁺', '4f⁷', 'Reducing agent (goes to Eu³⁺)'], ['Yb²⁺', '4f¹⁴', 'Reducing agent'], ['Sm²⁺', '4f⁶', 'Strong reducing agent']], 'Table of lanthanoid ions in the plus two and plus four states'),
      n: 'Every lanthanoid forms a plus three ion. The energy spent removing three electrons is repaid by the large lattice and hydration enthalpies of the small, highly charged ion. A few also show plus two or plus four, usually where this gives an empty, half-filled or full four f subshell. But since plus three is the most stable, these ions tend to change back to it.',
    }),
    sl('example', 'Worked example: Ce⁴⁺ and Eu²⁺', {
      b: r`**Problem.** Explain why (a) Ce⁴⁺ is a good oxidising agent in aqueous solution, and (b) Eu²⁺ is a good reducing agent. ($E^\circ_{\ce{Ce^4+/Ce^3+}} = +1.74\ \text{V}$; $E^\circ_{\ce{Eu^3+/Eu^2+}} = -0.35\ \text{V}$)

**(a)** Ce⁴⁺ (4f⁰) is stabilised by its noble-gas core, but +3 is the most stable state of cerium, so Ce⁴⁺ readily gains an electron. Its high positive potential confirms this.

**(b)** Eu²⁺ (4f⁷) has a half-filled subshell, but Eu³⁺ is more stable in water, so Eu²⁺ readily loses an electron; the negative potential confirms this.`,
      v: flow('LR', [['a', 'Ce⁴⁺ (f⁰)'], ['b', 'Ln³⁺: most stable state'], ['c', 'Eu²⁺ (f⁷)']], [['a', 'b'], ['c', 'b']], 'Flow showing cerium four plus gaining an electron and europium two plus losing an electron to reach the stable plus three state'),
      n: 'Cerium four plus has the stable xenon core, which explains why it can exist. But for lanthanoids the plus three state is the most stable, so cerium four plus takes an electron and is a strong oxidising agent, with a large positive electrode potential. Europium two plus has a half-filled four f subshell, yet it gives up an electron easily to become europium three plus, so it acts as a reducing agent.',
    }),
    sl('check', 'Quick check: oxidation states', {
      b: 'Decide whether a lanthanoid ion is oxidising or reducing.',
      n: 'Quick check. Remember that the plus three state is the most stable, and look for empty, half-filled or full four f subshells.',
      chk: 'ce4-mcq',
    }),
    sl('concept', 'Colour, magnetism, complexes and alloys', {
      b: 'Many Ln³⁺ ions are **coloured** because of **f–f transitions**; ions with **f⁰** (La³⁺, Ce⁴⁺) or **f¹⁴** (Lu³⁺, Yb²⁺) are colourless. Ions with unpaired f electrons are **paramagnetic**. Lanthanoids form **few complexes** (large ions, low charge density; 4f not available for bonding), mostly with O- and N-donor ligands. **Mischmetall** (about 95% lanthanoid metals, 5% iron, traces of S, C, Ca, Al) is used in lighter flints and in magnesium alloys for shells and bullets.',
      v: table(['Ion', 'Configuration', 'Colour'], [['La³⁺', '4f⁰', 'Colourless'], ['Pr³⁺', '4f²', 'Green'], ['Nd³⁺', '4f³', 'Lilac'], ['Sm³⁺', '4f⁵', 'Yellow'], ['Gd³⁺', '4f⁷', 'Colourless'], ['Er³⁺', '4f¹¹', 'Pink'], ['Lu³⁺', '4f¹⁴', 'Colourless']], 'Table of colours of some tripositive lanthanoid ions'),
      n: 'Many lanthanoid ions are coloured, because an f electron absorbs visible light and moves to another f level. Praseodymium three plus is green and neodymium three plus lilac, while lanthanum and lutetium three plus, with empty and full f subshells, are colourless. Lanthanoid ions are large, so they form fewer complexes than the d-block. Mischmetall, mostly lanthanoids with some iron, makes lighter flints.',
    }),
    sl('diagram', 'The lanthanoid contraction', {
      b: 'From La to Lu, atomic and **Ln³⁺ ionic radii decrease steadily**: the **lanthanoid contraction**. **Cause:** each added electron enters the 4f subshell, whose diffuse shape **shields poorly**, so the effective nuclear charge on the outer electrons rises steadily.',
      v: lnPlot,
      n: 'Across the lanthanoids the tripositive ions shrink smoothly, from about one hundred and three picometres for lanthanum to about eighty six for lutetium. Each step adds one proton and one four f electron. The four f orbitals are spread out and shield the outer electrons poorly, so the extra nuclear charge pulls the outer shell a little closer each time. This steady shrinking is the lanthanoid contraction.',
    }),
    sl('concept', 'Consequences of the lanthanoid contraction', {
      b: 'The contraction cancels the size increase expected on going from the 4d to the 5d series, and makes lanthanoid properties change only very gradually.',
      v: table(['Consequence', 'Illustration'], [['4d and 5d elements of a group have almost the same radius', 'Zr 160 pm, Hf 159 pm; Nb and Ta; Mo and W'], ['These pairs have very similar chemistry', 'Zr and Hf occur together and are very hard to separate'], ['Basic character of Ln(OH)₃ decreases from La to Lu', 'Smaller Ln³⁺ holds OH⁻ more covalently'], ['Lanthanoids are hard to separate', 'Ion exchange or fractional crystallisation needed'], ['5d metals are dense', 'Same size as 4d but much heavier (e.g. Os, Ir)']], 'Table of the consequences of the lanthanoid contraction'),
      n: 'The lanthanoid contraction reaches beyond the f-block. Elements of the third transition series come after the lanthanoids, and the contraction cancels the extra shell, so pairs such as zirconium and hafnium, or niobium and tantalum, are nearly the same size and almost identical chemically. Within the series, hydroxides become less basic as the ions shrink, and the elements are very hard to separate.',
    }),
    sl('example', 'Worked example: using the contraction', {
      b: r`**Problem.** (a) Arrange La(OH)₃, Gd(OH)₃ and Lu(OH)₃ in order of decreasing basic strength. (b) Explain why the density of hafnium (13.3 g cm⁻³) is nearly double that of zirconium (6.5 g cm⁻³).

**(a)** Ln³⁺ radius: La³⁺ > Gd³⁺ > Lu³⁺. A smaller cation polarises OH⁻ more, so the Ln–OH bond is more covalent and less OH⁻ is released: **La(OH)₃ > Gd(OH)₃ > Lu(OH)₃**.

**(b)** Hf and Zr have almost the same radius (lanthanoid contraction), but Hf (178.5 u) is nearly twice as heavy as Zr (91.2 u), so the same volume holds about twice the mass.`,
      v: table(['Hydroxide', 'Ln³⁺ radius / pm', 'Basic strength'], [['La(OH)₃', '103', 'Highest'], ['Gd(OH)₃', '94', 'Intermediate'], ['Lu(OH)₃', '86', 'Lowest']], 'Table relating Ln three plus radius to the basic strength of the hydroxide'),
      n: 'For the hydroxides, follow the size of the ion. Lanthanum three plus is largest, so its hydroxide is the most ionic and most basic; lutetium three plus is smallest, holds hydroxide most covalently and gives the least basic hydroxide. For hafnium and zirconium, the atoms are almost the same size, but hafnium is about twice as heavy, so its density is about twice as great.',
    }),
    sl('check', 'Quick check: lanthanoid contraction', {
      b: 'Use the lanthanoid contraction to explain a property.',
      n: 'Quick check. Think of poor shielding by four f electrons and its effect on size.',
      chk: 'basicity-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Lanthanoids Ce–Lu fill 4f: [Xe]4f¹⁻¹⁴5d⁰⁻¹6s²; 5d¹ only in La, Ce, Gd, Lu.',
        '+3 is the common, most stable state; Ce⁴⁺ and Tb⁴⁺ oxidising, Eu²⁺, Yb²⁺, Sm²⁺ reducing.',
        'Colour from f–f transitions; f⁰ and f¹⁴ colourless; few complexes; mischmetall.',
        'Lanthanoid contraction: steady fall in size from La to Lu due to poor 4f shielding.',
        'Consequences: Zr ≈ Hf, decreasing basicity of Ln(OH)₃, difficult separation.',
      ],
      v: table(['Idea', 'Key point'], [['Configuration', '4f fills; 6s² throughout'], ['Oxidation state', '+3 most stable'], ['Contraction', 'Poor 4f shielding']], 'Summary table of Part 1'),
      n: 'Let us sum up Part 1. The lanthanoids fill the four f subshell and all keep two six s electrons. Plus three is their most stable state, with a few plus two and plus four ions that are reducing or oxidising. Their ions are often coloured because of f to f transitions. Poor shielding by four f electrons causes the lanthanoid contraction, which makes zirconium and hafnium twins.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Give the cause of the lanthanoid contraction as poor shielding by 4f electrons, not just "size decreases".',
        'For +2 and +4 ions, say whether they are oxidising or reducing and why.',
        'Name two consequences of the contraction with examples.',
        'When forming Ln³⁺, remove 6s electrons first, then 5d, then 4f.',
      ],
      v: table(['Slip', 'Fix'], [['Ce⁴⁺ is reducing', 'Ce⁴⁺ is oxidising (→ Ce³⁺)'], ['La(OH)₃ least basic', 'La(OH)₃ most basic'], ['Contraction due to more shells', 'Due to poor 4f shielding']], 'Table of three common slips in Part 1 and fixes'),
      n: 'Some tips. Always explain the lanthanoid contraction through poor shielding by four f electrons. For unusual oxidation states, say whether the ion is oxidising or reducing and link it to the stability of plus three. Learn two consequences of the contraction with examples, and remember the order for removing electrons when forming a tripositive ion.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Inner Transition Elements — Part 2: Reactivity of lanthanoids, and the actinoids',
  goals: [
    'Write the products formed when lanthanoids react with oxygen, hydrogen, halogens, sulphur, nitrogen, carbon, water and acids',
    'Describe the configurations and oxidation states of the actinoids',
    'Compare actinoids with lanthanoids and explain the wider range of actinoid oxidation states',
  ],
  slides: [
    sl('title', 'Reactive metals and radioactive cousins', {
      b: 'Part 2 — how lanthanoids react, and how the actinoids differ.',
      v: flow('LR', [['a', 'Lanthanoid metal (Ln)'], ['b', 'Reacts like calcium'], ['c', 'Gives Ln³⁺ compounds'], ['d', 'Actinoids: more varied']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow from lanthanoid metals reacting like calcium to plus three compounds and then to the more varied actinoids'),
      n: 'The lanthanoids are silvery, reactive metals that tarnish in air and behave rather like calcium. Almost all of their compounds contain the tripositive ion. In this part we write the equations for their reactions with common non-metals and with water, and then meet the actinoids: radioactive, more varied, and the fuel of nuclear power stations.',
    }),
    sl('concept', 'General reactivity of the lanthanoids', {
      b: r`Lanthanoids are **soft, silvery, highly electropositive metals** ($E^\circ_{\ce{Ln^3+/Ln}}$ about −2.2 to −2.4 V). Early members (La, Ce) are about as reactive as **calcium**; reactivity falls slightly towards Lu as the size decreases. They tarnish quickly in moist air and usually react on heating.`,
      v: table(['Property', 'Lanthanoid metals'], [['Appearance', 'Silvery white, tarnish in air'], ['Hardness', 'Soft; harder from La to Lu'], ['Reducing power', 'Strong (E° about −2.3 V)'], ['Comparison', 'Early members similar to calcium']], 'Table of general properties of lanthanoid metals'),
      n: 'Lanthanoid metals are soft and silvery, and they quickly lose their shine in moist air. Their standard electrode potentials are around minus two point three volts, so they are strong reducing agents, rather like calcium. Reactivity falls a little across the series as the atoms become smaller. Most of their reactions with non-metals need heating.',
    }),
    sl('concept', 'Reactions with non-metals', {
      b: 'Ln = any lanthanoid metal. Products contain Ln³⁺.',
      v: table(['Reagent', 'Condition', 'Product (general)'], [['Oxygen', 'Burn', 'Ln₂O₃ (Ce gives CeO₂)'], ['Hydrogen', 'Heat', 'LnH₂ and LnH₃'], ['Halogens (X₂)', 'Heat', 'LnX₃'], ['Sulphur', 'Heat', 'Ln₂S₃'], ['Nitrogen', 'Heat', 'LnN'], ['Carbon', '2773 K', 'Carbides Ln₃C, Ln₂C₃, LnC₂']], 'Table of reactions of lanthanoid metals with oxygen, hydrogen, halogens, sulphur, nitrogen and carbon'),
      m: [r`\ce{4La + 3O2 -> 2La2O3}`, r`\ce{2Nd + 3Cl2 -> 2NdCl3}`, r`\ce{2Pr + N2 -> 2PrN}`],
      n: 'When heated, the lanthanoids combine directly with most non-metals. They burn in oxygen to give oxides of formula Ln two O three, though cerium gives cerium dioxide. With hydrogen they give hydrides, with halogens trihalides, with sulphur sulphides, and with nitrogen nitrides. At very high temperature, about two thousand seven hundred and seventy three kelvin, they combine with carbon to form carbides.',
    }),
    sl('concept', 'Reactions with water and acids', {
      b: 'Lanthanoids react **slowly with cold water and faster with hot water**, giving the hydroxide and hydrogen. With **dilute acids** they liberate hydrogen.',
      m: [r`\ce{2La + 6H2O -> 2La(OH)3 + 3H2}`, r`\ce{2Ce + 6HCl -> 2CeCl3 + 3H2}`],
      v: table(['Reagent', 'Products'], [['Cold water', 'Ln(OH)₃ + H₂ (slow)'], ['Hot water', 'Ln(OH)₃ + H₂ (faster)'], ['Dilute acids', 'Ln³⁺ salt + H₂']], 'Table of reactions of lanthanoids with water and dilute acids'),
      n: 'Like calcium, the lanthanoids react with water to release hydrogen and form a hydroxide; the reaction is slow in cold water and faster in hot water. With dilute acids, such as hydrochloric acid, they dissolve to give the tripositive salt and hydrogen gas. The hydroxides are ionic and basic, but basicity falls across the series, as we saw in Part 1.',
    }),
    sl('example', 'Worked example: writing lanthanoid equations', {
      b: r`**Problem.** Write balanced equations for: (a) samarium burning in oxygen; (b) heating gadolinium with sulphur; (c) europium(III) chloride formed from the metal and chlorine; (d) lanthanum heated with carbon to give the dicarbide.

**(a)** $\ce{4Sm + 3O2 -> 2Sm2O3}$

**(b)** $\ce{2Gd + 3S -> Gd2S3}$

**(c)** $\ce{2Eu + 3Cl2 -> 2EuCl3}$

**(d)** $\ce{La + 2C -> LaC2}$`,
      v: table(['Reaction', 'Product formula', 'Lanthanoid state'], [['Sm + O₂', 'Sm₂O₃', '+3'], ['Gd + S', 'Gd₂S₃', '+3'], ['Eu + Cl₂', 'EuCl₃', '+3'], ['La + C', 'LaC₂', 'Carbide']], 'Table of products for the worked example'),
      n: 'Start with the formula of the product, using the plus three state: samarium oxide is Sm two O three, gadolinium sulphide Gd two S three, europium chloride EuCl three. Then balance the atoms. Four samarium atoms need three oxygen molecules, two gadolinium atoms need three sulphur atoms, and two europium atoms need three chlorine molecules. Lanthanum and carbon give the dicarbide.',
    }),
    sl('check', 'Quick check: lanthanoid reactions', {
      b: 'Predict the product of a lanthanoid reacting with a non-metal or water.',
      n: 'Quick check. Use the plus three state to write the formula of the product.',
      chk: 'react-mcq',
    }),
    sl('concept', 'The actinoids', {
      b: r`Actinoids, **thorium (90) to lawrencium (103)**, fill the **5f** subshell: general configuration $[\text{Rn}]5f^{1\text{–}14}6d^{0\text{–}1}7s^2$. **All are radioactive**; only Th and U occur in significant amounts in nature, and the elements after uranium (**transuranium elements**) are made artificially. There is an **actinoid contraction**, greater than the lanthanoid contraction because 5f electrons shield even more poorly.`,
      v: table(['Element', 'Configuration', 'Element', 'Configuration'], [['Th (90)', '[Rn]6d²7s²', 'Np (93)', '[Rn]5f⁴6d¹7s²'], ['Pa (91)', '[Rn]5f²6d¹7s²', 'Pu (94)', '[Rn]5f⁶7s²'], ['U (92)', '[Rn]5f³6d¹7s²', 'Am (95)', '[Rn]5f⁷7s²']], 'Table of configurations of the early actinoids'),
      n: 'The actinoids run from thorium to lawrencium and fill the five f subshell. Every one of them is radioactive. Thorium and uranium occur in ores, but the elements beyond uranium, called transuranium elements, are made in nuclear reactors and accelerators, often in tiny amounts. The actinoids also shrink across the series, and this actinoid contraction is even greater than the lanthanoid one.',
    }),
    sl('diagram', 'Oxidation states of the actinoids', {
      b: 'Actinoids show a **much wider range of oxidation states** than lanthanoids. The maximum rises from +4 (Th) to **+7 (Np, Pu)** and then falls; later actinoids are mainly +3. **Reason:** 5f, 6d and 7s levels are **close in energy**, and 5f orbitals extend further out than 4f, so more electrons can take part in bonding.',
      v: oxPlot,
      n: 'Here is the big difference. Thorium reaches plus four, protactinium plus five, uranium plus six, and neptunium and plutonium plus seven, before the maximum falls again. The five f, six d and seven s levels are very close in energy, and the five f orbitals reach out further than four f, so many more electrons can be used in bonding than in the lanthanoids.',
    }),
    sl('example', 'Worked example: uranium oxidation states', {
      b: r`**Problem.** Find the oxidation state of uranium in (a) UF₆, used to enrich uranium, (b) the uranyl ion UO₂²⁺, and (c) UO₂, nuclear fuel. Which lanthanoid could show the same highest state?

**(a)** $x + 6(-1) = 0$, so $x = +6$.

**(b)** $x + 2(-2) = +2$, so $x = +6$.

**(c)** $x + 2(-2) = 0$, so $x = +4$.

No lanthanoid reaches +6 (the maximum is +4), showing the wider range of the actinoids.`,
      v: table(['Compound', 'Uranium oxidation state'], [['UF₆', '+6'], ['UO₂²⁺', '+6'], ['UO₂', '+4']], 'Table of uranium oxidation states in the worked example'),
      n: 'Use the usual rules: fluorine minus one, oxygen minus two, and the total equal to the charge. In uranium hexafluoride, uranium is plus six. In the uranyl ion, two oxygens contribute minus four and the ion carries plus two, so uranium is again plus six. In uranium dioxide it is plus four. No lanthanoid gets beyond plus four, which shows how much wider the actinoid range is.',
    }),
    sl('two-column', 'Lanthanoids and actinoids compared', {
      b: 'Both fill f orbitals and both contract across the series, but the **5f orbitals are less shielded and less buried** than 4f.',
      cols: [
        '**Lanthanoids (4f)**\n\n- Mainly +3; at most +4\n- Only promethium radioactive\n- Smaller contraction\n- Less complex formation\n- Hydroxides and oxides basic',
        '**Actinoids (5f)**\n\n- +3 to +7\n- All radioactive\n- Greater contraction\n- Greater complex formation (e.g. UO₂²⁺ complexes)\n- Oxides and hydroxides less basic',
      ],
      v: table(['Feature', 'Lanthanoids', 'Actinoids'], [['Subshell filled', '4f', '5f'], ['Oxidation states', 'Mainly +3', '+3 to +7'], ['Radioactivity', 'Only Pm', 'All'], ['Contraction', 'Smaller', 'Greater'], ['Complex formation', 'Less', 'More']], 'Table comparing lanthanoids and actinoids'),
      n: 'Let us compare the two series side by side. Both fill an f subshell and both contract, but the five f orbitals are less deeply buried. So actinoids show more oxidation states, a larger contraction and a greater tendency to form complexes. Apart from promethium, lanthanoids are not radioactive, whereas every actinoid is, which makes actinoid chemistry difficult to study.',
    }),
    sl('check', 'Quick check: actinoids', {
      b: 'Explain a difference between actinoids and lanthanoids.',
      n: 'Quick check. Think about how close the five f, six d and seven s levels are in energy.',
      chk: 'actinoid-mcq',
    }),
    sl('concept', 'Uses of f-block elements', {
      b: 'Lanthanoids and actinoids have important modern uses.',
      v: table(['Element or material', 'Use'], [['Mischmetall', 'Lighter flints; Mg alloy for bullets and shells'], ['Neodymium (Nd₂Fe₁₄B)', 'Powerful permanent magnets in motors and headphones'], ['Europium and terbium compounds', 'Red and green phosphors in screens and lamps'], ['Cerium(IV) oxide', 'Glass polishing; catalytic converters'], ['Uranium, plutonium', 'Nuclear fuel'], ['Thorium', 'Possible future nuclear fuel (India’s thorium programme)']], 'Table of uses of f-block elements'),
      n: 'The f-block elements are part of daily life. Neodymium magnets drive electric vehicle motors and headphones. Europium and terbium compounds give the red and green light in screens and lamps. Cerium oxide polishes glass, and mischmetall makes lighter flints. Uranium and plutonium fuel nuclear reactors, and India, with large thorium reserves, is developing thorium as a future fuel.',
    }),
    sl('check', 'Quick check: comparing the series', {
      b: 'Identify a property that is true of actinoids but not of lanthanoids.',
      n: 'Quick check. Recall radioactivity, oxidation states and complex formation.',
      chk: 'compare-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Lanthanoids are reactive like Ca: O₂ → Ln₂O₃; H₂ → LnH₂/LnH₃; X₂ → LnX₃; S → Ln₂S₃; N₂ → LnN; C → carbides; water → Ln(OH)₃ + H₂.',
        'Actinoids Th–Lr fill 5f; all radioactive; transuranium elements are synthetic.',
        'Actinoids show +3 to +7 because 5f, 6d and 7s are close in energy.',
        'Actinoid contraction is greater; actinoids form more complexes.',
      ],
      v: table(['Reagent', 'Lanthanoid product'], [['O₂', 'Ln₂O₃'], ['Halogen', 'LnX₃'], ['N₂', 'LnN'], ['Water', 'Ln(OH)₃ + H₂']], 'Summary table of lanthanoid reactions'),
      n: 'Let us sum up Part 2. Lanthanoids are reactive metals, like calcium, combining with oxygen, hydrogen, halogens, sulphur, nitrogen and carbon, and releasing hydrogen from water and acids, always forming tripositive compounds. The actinoids are all radioactive and show many more oxidation states, because their five f, six d and seven s levels are so close in energy.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Write products with the +3 state: Ln₂O₃, LnX₃, Ln₂S₃, LnN, Ln(OH)₃.',
        'Explain the wider actinoid range by closeness of 5f, 6d and 7s energies.',
        'In comparisons, give at least three clear points in a table.',
        'Balance metal-water equations: 2Ln + 6H₂O → 2Ln(OH)₃ + 3H₂.',
      ],
      v: table(['Slip', 'Fix'], [['LnO as the oxide', 'Ln₂O₃'], ['All lanthanoids radioactive', 'Only promethium'], ['Actinoids mainly +3 like lanthanoids', 'Early actinoids reach +7']], 'Table of three common slips in Part 2 and fixes'),
      n: 'Final tips. Write every lanthanoid product with the plus three state. Explain the wide range of actinoid oxidation states by the closeness of five f, six d and seven s energies. Present comparisons as a clear table with at least three points. And always balance the water equation: two metal atoms with six water molecules give two hydroxides and three hydrogen molecules.',
    }),
  ],
});
