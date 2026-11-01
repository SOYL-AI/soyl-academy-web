// ICSE 10 Chemistry ch02 Chemical Bonding — two decks: Part 1 (t01–t02) electrovalent bonding (NaCl, MgCl2, CaO) and
// properties of electrovalent compounds; Part 2 (t03–t06) covalent bonding (H2, Cl2, O2, N2, CH4, CCl4), polar molecules
// (HCl, H2O, NH3), comparison of the two kinds of compound, coordinate bonding (H3O+, NH4+).
import { sl, deck, table, flow, svgV } from './lib.mjs';
import { IONIC, COVALENT, POLAR } from './svgs.mjs';

const V = {
  ionic: svgV(IONIC, 'Electron dot diagrams showing electron transfer in the formation of sodium chloride, magnesium chloride and calcium oxide'),
  covalent: svgV(COVALENT, 'Electron dot diagrams of chlorine, oxygen, nitrogen and methane showing single, double and triple shared pairs'),
  polar: svgV(POLAR, 'Electron dot diagrams of water and ammonia with lone pairs, and the formation of hydronium and ammonium ions by coordinate bonds'),
};

export const deck1 = deck({
  part: 1,
  title: 'Chemical Bonding — Part 1: Electrovalent (ionic) bonding',
  goals: [
    'Explain why atoms combine, using the octet and duplet rules',
    'Draw electron dot diagrams for the formation of NaCl, MgCl₂ and CaO',
    'State the conditions that favour an electrovalent bond',
    'Explain the properties of electrovalent compounds',
  ],
  slides: [
    sl('title', 'Why do atoms join?', {
      b: 'Part 1 — atoms bond to reach a stable arrangement of electrons like a noble gas. One way is to **transfer** electrons and form ions.',
      v: table(['Noble gas', 'Configuration', 'Outer shell'], [['Helium', '2', 'Duplet (2 electrons)'], ['Neon', '2, 8', 'Octet'], ['Argon', '2, 8, 8', 'Octet']], 'Table of helium, neon and argon with their stable duplet or octet configurations'),
      n: 'Namaste! Noble gases hardly react at all, because their outer shells are full: two electrons for helium, eight for neon and argon. Other atoms react so that they too end up with a full outer shell. They can do this by giving and taking electrons, which we study in this part, or by sharing electrons, which comes in Part 2.',
    }),
    sl('concept', 'Octet rule and the electrovalent bond', {
      b: 'Atoms tend to gain, lose or share electrons to get **eight electrons in the outer shell** (an **octet**), or two in the first shell (a **duplet**, as for H, Li). An **electrovalent (ionic) bond** forms when one atom **transfers** electrons to another: the atom that loses electrons becomes a **cation**, the one that gains becomes an **anion**, and the opposite charges attract strongly. The number of electrons lost or gained is the **electrovalency**.',
      v: flow('LR', [['a', 'Metal atom (1–3 valence e⁻)'], ['b', 'Loses e⁻ → cation'], ['c', 'Non-metal atom (5–7 valence e⁻)'], ['d', 'Gains e⁻ → anion'], ['e', 'Electrostatic attraction = ionic bond']], [['a', 'b'], ['c', 'd'], ['b', 'e'], ['d', 'e']], 'Flow showing a metal atom losing electrons and a non-metal atom gaining them, the ions attracting to form an ionic bond'),
      n: 'Atoms try to reach eight electrons in their outer shell, or two if they have only one shell. In an electrovalent bond, a metal atom with only a few outer electrons hands them over to a non-metal atom that needs only a few more. The metal becomes a positive ion and the non-metal a negative ion, and the strong attraction between them is the ionic bond.',
    }),
    sl('diagram', 'Electron dot diagrams: NaCl, MgCl₂ and CaO', {
      b: '**NaCl:** Na (2, 8, 1) gives 1 electron to Cl (2, 8, 7) → Na⁺ (2, 8) and Cl⁻ (2, 8, 8). **MgCl₂:** Mg (2, 8, 2) gives 1 electron to each of 2 Cl atoms → Mg²⁺ and 2Cl⁻. **CaO:** Ca (2, 8, 8, 2) gives 2 electrons to O (2, 6) → Ca²⁺ (2, 8, 8) and O²⁻ (2, 8). Show the metal’s electrons as crosses and the non-metal’s as dots, and put each ion in square brackets with its charge.',
      v: V.ionic,
      n: 'Here are the three compounds named in the syllabus. A sodium atom passes its single outer electron to a chlorine atom, so both end up with complete octets. A magnesium atom has two outer electrons, so it needs two chlorine atoms, one for each electron. A calcium atom gives both its outer electrons to one oxygen atom. Crosses show the metal’s electrons and dots the non-metal’s, so you can see where each electron went.',
    }),
    sl('example', 'Worked example: predicting an ionic formula', {
      b: '**Problem.** Element X (atomic number 19) reacts with element Y (atomic number 8). (a) Write their configurations. (b) Which loses and which gains electrons, and how many? (c) Write the formula of the compound and its ions.\n\n**(a)** X: 2, 8, 8, 1; Y: 2, 6.\n\n**(b)** X loses 1 electron (→ X⁺); Y gains 2 electrons (→ Y²⁻).\n\n**(c)** Two X⁺ balance one Y²⁻: formula **X₂Y** (potassium oxide, K₂O).',
      v: table(['Element', 'Configuration', 'Change', 'Ion'], [['X (19)', '2, 8, 8, 1', 'Loses 1 e⁻', 'X⁺'], ['Y (8)', '2, 6', 'Gains 2 e⁻', 'Y²⁻'], ['Compound', '', '2 × (+1) + (−2) = 0', 'X₂Y']], 'Table predicting the ions and formula of the compound of elements 19 and 8'),
      n: 'Start with the configurations. X has one outer electron, which it loses easily, forming a plus one ion. Y has six outer electrons and gains two, forming a minus two ion. The charges must balance, so two X ions are needed for each Y ion, giving X two Y. The real compound is potassium oxide.',
    }),
    sl('check', 'Quick check: electron transfer', {
      b: 'Decide how many electrons are transferred and what ions form.',
      n: 'Quick check. Count the outer electrons of each atom, then balance the charges.',
      chk: 'transfer-mcq',
    }),
    sl('concept', 'When does an electrovalent bond form?', {
      b: 'Electron transfer is easy when one atom has a **low ionisation potential** (loses electrons easily: metals of groups 1 and 2) and the other has a **high electron affinity** (gains electrons readily: non-metals of groups 16 and 17). A **large difference in electronegativity** between the two atoms also favours ionic bonding. So sodium and chlorine bond ionically, but carbon and chlorine share electrons.',
      v: table(['Pair', 'Ionisation potential of first', 'Electron affinity of second', 'Bond'], [['Na and Cl', 'Low', 'High', 'Electrovalent'], ['Ca and O', 'Low', 'High', 'Electrovalent'], ['C and Cl', 'High', 'High', 'Covalent']], 'Table of three pairs of elements showing that low ionisation potential plus high electron affinity favours an electrovalent bond'),
      n: 'An ionic bond forms easily when one atom gives up electrons readily, which means a low ionisation potential, and the other accepts them readily, which means a high electron affinity. Metals on the left of the table and non-metals on the right fit this perfectly. Carbon, in the middle, holds its electrons too tightly to give them away, so it shares them instead.',
    }),
    sl('concept', 'Properties of electrovalent compounds', {
      b: 'In the solid, ions are held in a regular **crystal lattice** by strong electrostatic forces, so electrovalent compounds are **hard crystalline solids** with **high melting and boiling points** (NaCl melts at 801 °C). They are usually **soluble in water** but **insoluble in organic solvents** such as kerosene. They **do not conduct as solids** (ions fixed in place) but **conduct when molten or in solution**, where the ions are free to move — they **dissociate** into ions, and the current decomposes them (**electrolysis**).',
      v: table(['State of NaCl', 'Are ions free to move?', 'Conducts?'], [['Solid crystal', 'No (fixed in lattice)', 'No'], ['Molten (above 801 °C)', 'Yes', 'Yes'], ['Aqueous solution', 'Yes', 'Yes']], 'Table of sodium chloride as a solid, melt and solution, showing it conducts only when its ions can move'),
      n: 'In a crystal of salt, millions of sodium and chloride ions are locked together by strong attractions, so the crystal is hard and melts only at a very high temperature. Salt dissolves in water, but not in kerosene. Solid salt does not conduct electricity because its ions cannot move. Once it is melted or dissolved, the ions move freely and carry the current, and the compound is broken down by electrolysis.',
    }),
    sl('example', 'Worked example: explaining conductivity', {
      b: '**Problem.** Solid magnesium chloride does not conduct electricity, but molten magnesium chloride does. (a) Explain. (b) Write the dissociation equation. (c) What happens at the electrodes?\n\n**(a)** In the solid the ions are fixed in the lattice; in the melt they are free to move to the electrodes.\n\n**(b)** MgCl₂ → Mg²⁺ + 2Cl⁻.\n\n**(c)** Mg²⁺ ions move to the cathode and Cl⁻ ions to the anode, where they are discharged: the compound is electrolysed into magnesium and chlorine.',
      v: flow('LR', [['a', 'Solid MgCl₂: ions fixed'], ['b', 'Heat to melt'], ['c', 'Mg²⁺ and Cl⁻ free'], ['d', 'Current flows; Mg and Cl₂ formed']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow from solid magnesium chloride to molten ions that conduct and are electrolysed'),
      n: 'A current is simply moving charge. In solid magnesium chloride the ions are held in place, so no charge can move. When it melts, the lattice breaks up into free magnesium ions and chloride ions. The positive ions drift to the cathode and the negative ions to the anode, carrying the current, and there they are converted into magnesium metal and chlorine gas.',
    }),
    sl('check', 'Quick check: ionic properties', {
      b: 'Explain a property of an electrovalent compound.',
      n: 'Quick check. Ask whether the ions in the substance are fixed or free to move.',
      chk: 'ionicprop-mcq',
    }),
    sl('concept', 'Writing formulae from electrovalency', {
      b: 'The electrovalency of an ion is the number of electrons its atom lost or gained. Combine ions so that **total positive charge = total negative charge**.',
      v: table(['Cation', 'Anion', 'Formula'], [['Na⁺', 'O²⁻', 'Na₂O'], ['Mg²⁺', 'N³⁻', 'Mg₃N₂'], ['Al³⁺', 'O²⁻', 'Al₂O₃'], ['Ca²⁺', 'Cl⁻', 'CaCl₂']], 'Table of four cation and anion pairs with the formulae of their compounds'),
      n: 'Once you know the charges on the ions, the formula follows. Add ions until the positive and negative charges cancel. Two sodium ions balance one oxide ion. Three magnesium ions, with six positive charges, balance two nitride ions. Two aluminium ions balance three oxide ions.',
    }),
    sl('check', 'Quick check: formulae', {
      b: 'Write the formula of an ionic compound from its ions.',
      n: 'Quick check. Balance the total positive and negative charges.',
      chk: 'formula-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Atoms bond to reach an octet (or a duplet).',
        'Electrovalent bond: electron transfer from metal to non-metal; ions held by electrostatic attraction.',
        'Favoured by low ionisation potential of one atom and high electron affinity of the other.',
        'NaCl, MgCl₂ and CaO: show crosses for metal electrons, dots for non-metal electrons, brackets and charges.',
        'Electrovalent compounds: hard solids, high melting points, soluble in water, conduct only when molten or dissolved.',
      ],
      v: table(['Compound', 'Ions'], [['NaCl', 'Na⁺, Cl⁻'], ['MgCl₂', 'Mg²⁺, 2Cl⁻'], ['CaO', 'Ca²⁺, O²⁻']], 'Summary table of three ionic compounds and their ions'),
      n: 'Let us sum up Part 1. Atoms bond to reach a full outer shell. In an electrovalent bond, a metal hands electrons to a non-metal and the ions attract one another. This happens most easily between atoms with a low ionisation potential and atoms with a high electron affinity. Electrovalent compounds are hard, high melting solids that conduct only when their ions can move.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'In dot diagrams, show only outer-shell electrons, use two different symbols, and put brackets and charges on the ions.',
        'Say “ions are free to move” (not “electrons are free”) to explain conduction in the melt.',
        'For MgCl₂, draw two separate chlorine atoms, each receiving one electron.',
        'Check that the charges in a formula add up to zero.',
      ],
      v: table(['Slip', 'Fix'], [['Solid NaCl conducts', 'Only molten or dissolved NaCl conducts'], ['CaO: Ca gains electrons', 'Ca loses 2 electrons'], ['MgCl₂ drawn with one Cl₂ molecule', 'Two separate Cl atoms']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some tips. In electron dot diagrams, draw only the outer electrons, use dots for one atom and crosses for the other, and put square brackets and charges on the ions. When you explain conduction, say that ions are free to move. For magnesium chloride, draw two separate chlorine atoms, each taking one electron.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Chemical Bonding — Part 2: Covalent, polar and coordinate bonds',
  goals: [
    'Draw electron dot structures of H₂, Cl₂, O₂, N₂, CH₄ and CCl₄',
    'Explain polar bonds in HCl, H₂O and NH₃ using electronegativity',
    'Compare electrovalent and covalent compounds',
    'Show the formation of H₃O⁺ and NH₄⁺ by coordinate bonds',
  ],
  slides: [
    sl('title', 'Sharing instead of giving', {
      b: 'Part 2 — when neither atom will give up electrons, they **share** pairs of electrons: the covalent bond.',
      v: table(['Molecule', 'Shared pairs', 'Bond'], [['H₂, Cl₂', '1', 'Single'], ['O₂', '2', 'Double'], ['N₂', '3', 'Triple']], 'Table of hydrogen, chlorine, oxygen and nitrogen molecules with their numbers of shared pairs'),
      n: 'Two chlorine atoms both want one more electron, and neither will give one up. Instead, each puts one electron into a shared pair, and both atoms count that pair as their own. This sharing is a covalent bond. In this part we draw covalent molecules, see why some are polar, and meet a special kind of shared pair called a coordinate bond.',
    }),
    sl('diagram', 'Covalent bonds: single, double and triple', {
      b: 'A **covalent bond** is formed by **sharing a pair of electrons**, each atom contributing one. **H₂:** one shared pair gives each H a duplet. **Cl₂:** one shared pair (single bond) completes both octets. **O₂:** two shared pairs (**double bond**). **N₂:** three shared pairs (**triple bond**). **CH₄:** carbon shares one pair with each of four H atoms. **CCl₄:** the same, with four Cl atoms. Unshared pairs on an atom are **lone pairs**.',
      v: V.covalent,
      n: 'In a covalent bond each atom gives one electron to a shared pair. Hydrogen and chlorine molecules share one pair, a single bond. Oxygen atoms need two more electrons each, so they share two pairs, a double bond. Nitrogen atoms share three pairs, a triple bond. In methane, carbon shares a pair with each of four hydrogen atoms, and carbon tetrachloride is the same with four chlorine atoms.',
    }),
    sl('concept', 'Non-polar molecules', {
      b: 'When two **identical atoms** share a pair (H₂, Cl₂, O₂, N₂), the pair is shared **equally**: the bond is **non-polar**. CH₄ and CCl₄ contain bonds between different atoms, but the four bonds point symmetrically to the corners of a **tetrahedron**, so their effects **cancel** and the molecules are **non-polar** overall.',
      v: table(['Molecule', 'Bonds', 'Shape', 'Polarity of molecule'], [['Cl₂', 'Cl–Cl (identical atoms)', 'Linear', 'Non-polar'], ['CH₄', '4 C–H', 'Tetrahedral', 'Non-polar (symmetrical)'], ['CCl₄', '4 C–Cl (polar bonds)', 'Tetrahedral', 'Non-polar (effects cancel)']], 'Table of chlorine, methane and carbon tetrachloride showing why each molecule is non-polar'),
      n: 'If both atoms in a bond are the same, they pull equally on the shared pair, so the bond is non-polar. Methane and carbon tetrachloride are more interesting: each carbon to chlorine bond is slightly uneven, but the four bonds point to the corners of a tetrahedron, so their pulls cancel out and the molecule as a whole is non-polar.',
    }),
    sl('example', 'Worked example: drawing a covalent molecule', {
      b: '**Problem.** Draw the electron dot structure of carbon tetrachloride, CCl₄, and state the number of shared pairs and lone pairs.\n\n**Step 1.** C (2, 4) has 4 valence electrons; each Cl (2, 8, 7) has 7.\n\n**Step 2.** C shares one pair with each Cl: **4 shared pairs** (single bonds).\n\n**Step 3.** Each Cl keeps 3 lone pairs: **12 lone pairs** in all; carbon has none.\n\nEvery atom now has an octet.',
      v: table(['Atom', 'Valence e⁻', 'Shared pairs', 'Lone pairs'], [['C', '4', '4', '0'], ['Each Cl', '7', '1', '3'], ['Whole molecule', '32', '4', '12']], 'Table counting valence electrons, shared pairs and lone pairs in carbon tetrachloride'),
      n: 'Carbon has four outer electrons, so it can share one with each of four chlorine atoms. Each chlorine has seven outer electrons; after sharing one pair, it keeps three lone pairs. That gives four shared pairs and twelve lone pairs in total, and every atom ends up with eight electrons around it.',
    }),
    sl('check', 'Quick check: covalent bonds', {
      b: 'Count shared pairs in a molecule.',
      n: 'Quick check. Each shared pair is one bond; a double bond has two pairs.',
      chk: 'triple-mcq',
    }),
    sl('diagram', 'Polar molecules: HCl, H₂O and NH₃', {
      b: 'When two **different atoms** share a pair, the **more electronegative** atom pulls the pair closer and gets a **partial negative charge (δ−)**; the other gets **δ+**. Such a bond is **polar**. **HCl:** Cl is δ−, H is δ+. **H₂O:** O shares two pairs with H atoms and has **two lone pairs**; the molecule is bent and polar. **NH₃:** N shares three pairs and has **one lone pair**; the molecule is pyramidal and polar.',
      v: V.polar,
      n: 'If the two atoms are different, the more electronegative one pulls the shared pair closer and becomes slightly negative, while the other becomes slightly positive. Hydrogen chloride is polar in this way. Water has two lone pairs on oxygen and a bent shape, and ammonia has one lone pair on nitrogen and a pyramid shape, so both molecules are polar.',
    }),
    sl('concept', 'Covalent compounds compared with electrovalent compounds', {
      b: 'Covalent compounds are made of **molecules** held together only by **weak forces**, so most are gases, liquids or soft solids with **low melting and boiling points**. Most are **insoluble in water** but **soluble in organic solvents**, and they **do not conduct** electricity. Some **polar** covalent compounds such as **HCl** **ionise in water**: HCl + H₂O → H₃O⁺ + Cl⁻, so hydrochloric acid conducts.',
      v: table(['Property', 'Electrovalent', 'Covalent'], [['Particles', 'Ions', 'Molecules'], ['State', 'Hard crystalline solids', 'Gases, liquids, soft solids'], ['Melting and boiling points', 'High', 'Low'], ['Solubility', 'Water', 'Organic solvents'], ['Conductivity', 'Molten or aqueous: yes', 'Usually no (except some polar ones in water)']], 'Table comparing electrovalent and covalent compounds in particles, state, melting point, solubility and conductivity'),
      n: 'Covalent compounds are made of separate molecules, and the forces between the molecules are weak. That is why many are gases or liquids, with low melting and boiling points. They usually dissolve in organic solvents rather than water and do not conduct. A few polar ones, like hydrogen chloride, react with water to form ions, so their solutions do conduct.',
    }),
    sl('example', 'Worked example: classifying from properties', {
      b: '**Problem.** Substance P melts at 770 °C and conducts when molten. Substance Q boils at −85 °C, does not conduct as a liquid, but its solution in water conducts. Identify the type of bonding in each and explain Q’s behaviour.\n\n**P:** high melting point, conducts when molten → **electrovalent** (for example KCl).\n\n**Q:** very low boiling point, non-conducting liquid → **covalent molecules**. It is **polar** and ionises in water, like HCl: HCl + H₂O → H₃O⁺ + Cl⁻.',
      v: table(['Clue', 'P', 'Q'], [['Melting / boiling point', 'High (770 °C)', 'Low (−85 °C)'], ['Pure liquid conducts?', 'Yes', 'No'], ['Water solution conducts?', '—', 'Yes'], ['Bonding', 'Electrovalent', 'Polar covalent']], 'Table of clues used to classify substances P and Q'),
      n: 'A very high melting point and conduction in the melt point to ions, so P is electrovalent. Q boils far below zero and its liquid does not conduct, so it is made of covalent molecules. Its solution conducts because the polar molecules react with water to form ions, exactly as hydrogen chloride does.',
    }),
    sl('check', 'Quick check: comparing compounds', {
      b: 'Classify a substance from its properties.',
      n: 'Quick check. High melting point and conduction when molten mean ions.',
      chk: 'compare-mcq',
    }),
    sl('concept', 'Coordinate bonds: H₃O⁺ and NH₄⁺', {
      b: 'A **lone pair** is a pair of valence electrons not used in bonding. In a **coordinate (dative) bond**, **both electrons of the shared pair come from one atom** (the donor); the acceptor has an empty place. Once formed it is the same as any covalent bond. **H₃O⁺:** a lone pair on the O of water is donated to H⁺: H₂O + H⁺ → H₃O⁺. **NH₄⁺:** the lone pair on N of ammonia is donated to H⁺: NH₃ + H⁺ → NH₄⁺. Water itself contains a few H₃O⁺ and OH⁻ ions, because one water molecule’s lone pair takes H⁺ from another: H₂O + H₂O ⇌ H₃O⁺ + OH⁻.',
      v: table(['Ion', 'Donor (lone pair)', 'Acceptor', 'Bonds in the ion'], [['H₃O⁺', 'O of H₂O', 'H⁺', '2 covalent + 1 coordinate'], ['NH₄⁺', 'N of NH₃', 'H⁺', '3 covalent + 1 coordinate']], 'Table of the hydronium and ammonium ions with donor, acceptor and types of bond'),
      n: 'A lone pair is a pair of outer electrons that is not used in a bond. In a coordinate bond, one atom supplies both electrons of the shared pair. The oxygen in water has lone pairs, and a hydrogen ion has none at all, so the oxygen donates a lone pair to make the hydronium ion. Ammonia does the same with its lone pair to make the ammonium ion.',
    }),
    sl('check', 'Quick check: coordinate bonds', {
      b: 'Identify the donor and acceptor in a coordinate bond.',
      n: 'Quick check. The donor has a lone pair; the hydrogen ion has none.',
      chk: 'coord-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Covalent bond: a shared pair, one electron from each atom; single, double, triple bonds.',
        'Non-polar: H₂, Cl₂, O₂, N₂; CH₄ and CCl₄ (symmetrical).',
        'Polar: HCl, H₂O (two lone pairs), NH₃ (one lone pair); δ− on the more electronegative atom.',
        'Covalent compounds: low melting points, soluble in organic solvents, non-conductors (HCl ionises in water).',
        'Coordinate bond: both shared electrons from one atom; H₃O⁺ and NH₄⁺.',
      ],
      v: table(['Bond type', 'Electrons come from'], [['Electrovalent', 'Transferred from metal to non-metal'], ['Covalent', 'One from each atom'], ['Coordinate', 'Both from the donor atom']], 'Summary table of where the bonding electrons come from in each bond type'),
      n: 'Let us sum up Part 2. A covalent bond is a shared pair, with one electron from each atom. Bonds between identical atoms are non-polar, and symmetrical molecules like methane are non-polar overall. Water, ammonia and hydrogen chloride are polar. Covalent compounds have low melting points and usually do not conduct. In a coordinate bond, one atom donates both electrons, as in the hydronium and ammonium ions.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Show lone pairs in H₂O (two) and NH₃ (one); examiners look for them.',
        'Draw N₂ with three shared pairs and one lone pair on each N.',
        'For a coordinate bond, name the donor and the acceptor, or show an arrow from donor to acceptor.',
        'Explain why HCl solution conducts: it ionises in water.',
      ],
      v: table(['Slip', 'Fix'], [['CCl₄ is polar', 'Non-polar (symmetrical)'], ['O₂ has a single bond', 'Double bond'], ['NH₄⁺ has four ordinary covalent bonds from the start', 'One forms as a coordinate bond']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Final tips. Always show the lone pairs on water and ammonia. Draw nitrogen with a triple bond and a lone pair on each atom. In coordinate bond questions, name the donor and the acceptor, or draw an arrow from the donor. And explain the conductivity of hydrochloric acid by saying that hydrogen chloride ionises in water.',
    }),
  ],
});
