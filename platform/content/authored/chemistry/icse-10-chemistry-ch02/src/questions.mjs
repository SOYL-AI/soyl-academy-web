// ICSE 10 Chemistry ch02 Chemical Bonding — question bank (ICSE 2027 specimen style). Stems name their own atoms,
// compounds and data. MCQ keys are placed by the builder; AR keys planned: a b c d a.
import { mk, add, r } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;

// ---------------------------------------------------------------- t01 electrovalent bonding
add('transfer-mcq', mcq({
  stem: 'When calcium (2, 8, 8, 2) combines with oxygen (2, 6) to form calcium oxide, the electrons transferred are:',
  right: 'two, from each calcium atom to an oxygen atom',
  wrong: ['two, from each oxygen atom to a calcium atom', 'one, from each calcium atom to an oxygen atom', 'none — the atoms share two pairs'],
  sol: 'Ca loses its two valence electrons; O gains two to complete its octet — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('formula-mcq', mcq({
  stem: 'Element E forms the ion E³⁺ and element G forms the ion G²⁻. The formula of the compound formed between them is:',
  right: 'E₂G₃',
  wrong: ['E₃G₂', 'EG', 'E₂G'],
  sol: '2 × (+3) = +6 balances 3 × (−2) = −6 — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('condition-mcq', mcq({
  stem: 'An electrovalent bond is most likely to form between an atom with:',
  right: 'low ionisation potential and an atom with high electron affinity',
  wrong: ['high ionisation potential and an atom with low electron affinity', 'equal electronegativities', 'four valence electrons and an atom with four valence electrons'],
  sol: 'One atom must lose electrons easily and the other gain them readily — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('mgion-mcq', mcq({
  stem: 'In magnesium chloride, the electronic configuration of the magnesium ion is:',
  right: '2, 8',
  wrong: ['2, 8, 2', '2, 8, 8', '2, 8, 1'],
  sol: 'Mg (2, 8, 2) loses two electrons to form Mg²⁺ (2, 8), like neon — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('lioxide-mcq', mcq({
  stem: 'Lithium (atomic number 3) reacts with nitrogen (atomic number 7) to form an ionic nitride. Its formula is:',
  right: 'Li₃N',
  wrong: ['LiN₃', 'LiN', 'Li₂N₃'],
  sol: 'Li⁺ (loses 1) and N³⁻ (gains 3): three Li⁺ per N³⁻ — option (@K).',
  d: 3, c: 'application', t: [1],
}));
add('transfer-ar', ar({
  a: 'Sodium and chlorine combine by transfer of an electron rather than by sharing.',
  r: 'Sodium has a low ionisation potential and chlorine has a high electron affinity.',
  key: 'c',
  sol: 'Both are true, and R explains A — option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('ion-tf', tf({
  stem: 'In forming calcium oxide, the oxygen atom gains two electrons and becomes the oxide ion, O²⁻, with the configuration 2, 8.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'understanding', t: [1],
}));
add('electrovalency-fill', fill({
  stem: 'The number of electrons an atom loses or gains when it forms an ionic bond is called its ___.',
  acc: [['electrovalency', 'electro-valency', 'electrovalence']],
  sol: '**Electrovalency**.',
  d: 1, c: 'recall', t: [1],
}));
add('cao-short1', short({
  marks: 1,
  stem: 'Write the electronic configurations of the two ions present in calcium oxide.',
  model: 'Ca²⁺: 2, 8, 8; O²⁻: 2, 8.',
  sol: 'Both configurations.',
  scheme: [['Both correct', 1]],
  d: 2, c: 'application', t: [1],
}));
add('ionname-short1', short({
  marks: 1,
  stem: 'Name the type of bond present in potassium bromide, KBr.',
  model: 'Electrovalent (ionic) bond.',
  sol: 'Electrovalent.',
  scheme: [['Electrovalent', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('mgcl2-short2', short({
  marks: 2,
  stem: 'Element A (atomic number 12) combines with element B (atomic number 17). (a) How many electrons does each A atom lose and each B atom gain? (b) Write the formula of the compound and name the type of bonding.',
  model: '(a) A (2, 8, 2) loses 2 electrons; each B (2, 8, 7) gains 1 electron. (b) AB₂ (MgCl₂); electrovalent bonding.',
  sol: 'Electron counts; AB₂, ionic.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'application', t: [1],
}));
add('ionic-short3', short({
  marks: 3,
  stem: 'Draw electron dot diagrams to show the formation of calcium oxide from calcium (atomic number 20) and oxygen (atomic number 8). Show the charges on the ions formed.',
  model: 'Ca with two crosses in its outer shell; O with six dots. Both crosses move to O. Product: [Ca]²⁺ with an empty outer shell shown as brackets, and [O with six dots and two crosses]²⁻ in square brackets.',
  sol: 'Atoms with outer electrons; transfer of two electrons; ions in brackets with charges.',
  scheme: [['Atoms with correct outer electrons', 1], ['Transfer of two electrons shown', 1], ['Ions with brackets and charges', 1]],
  d: 2, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t02 properties of electrovalent compounds
add('ionicprop-mcq', mcq({
  stem: 'Potassium chloride crystals do not conduct electricity, but a hot melt of potassium chloride does. This is because in the melt:',
  right: 'the K⁺ and Cl⁻ ions are free to move',
  wrong: ['free electrons are released from the potassium', 'covalent bonds break to form molecules', 'the chlorine is given off as a gas before conduction starts'],
  sol: 'Ions are fixed in the solid lattice but mobile in the melt — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('mp-mcq', mcq({
  stem: 'Magnesium oxide melts at about 2850 °C. The main reason for this very high melting point is:',
  right: 'strong electrostatic attraction between Mg²⁺ and O²⁻ ions in the lattice',
  wrong: ['weak forces between MgO molecules', 'the presence of free electrons', 'a triple covalent bond between Mg and O'],
  sol: 'Ions with double charges attract very strongly — option (@K).',
  d: 3, c: 'analysis', t: [2],
}));
add('solvent-mcq', mcq({
  stem: 'A crystalline white solid melts at 770 °C, dissolves in water and is insoluble in kerosene. The solid is most probably:',
  right: 'an electrovalent compound',
  wrong: ['a non-polar covalent compound', 'a polar covalent gas', 'a metal'],
  sol: 'High melting point and solubility in water, not in organic solvents — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('electrolysis-ar', ar({
  a: 'Molten calcium chloride is decomposed when a current is passed through it.',
  r: 'Calcium chloride is a covalent compound.',
  key: 'a',
  sol: 'A is true (electrolysis of the free ions); R is false: calcium chloride is electrovalent — option (a).',
  d: 2, c: 'understanding', t: [2],
}));
add('solid-tf', tf({
  stem: 'Crystals of lithium fluoride conduct electricity because they contain ions.',
  key: 'f',
  sol: 'False: the ions in the crystal are fixed and cannot move; only the melt or solution conducts.',
  d: 2, c: 'understanding', t: [2],
}));
add('dissoc-short1', short({
  marks: 1,
  stem: 'Write the equation for the dissociation of molten calcium chloride into its ions.',
  model: 'CaCl₂ → Ca²⁺ + 2Cl⁻.',
  sol: 'Equation.',
  scheme: [['Balanced equation with charges', 1]],
  d: 1, c: 'application', t: [2],
}));
add('kero-short1', short({
  marks: 1,
  stem: 'Name one solvent in which sodium chloride does not dissolve.',
  model: 'Kerosene (or petrol, benzene).',
  sol: 'An organic solvent.',
  scheme: [['Any organic solvent', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('prop-short2', short({
  marks: 2,
  stem: 'Give reasons: (a) electrovalent compounds are hard and have high melting points; (b) they conduct electricity in aqueous solution.',
  model: '(a) Their ions are held in a rigid lattice by strong electrostatic forces, which need much energy to overcome. (b) In solution the compound dissociates into ions that are free to move and carry charge.',
  sol: 'Strong forces in a lattice; free ions.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'understanding', t: [2],
}));

// ---------------------------------------------------------------- t03 covalent bonding, non-polar molecules
add('triple-mcq', mcq({
  stem: 'In a molecule of oxygen, O₂, the number of shared pairs of electrons and the number of lone pairs on each oxygen atom are:',
  right: '2 shared pairs; 2 lone pairs on each atom',
  wrong: ['1 shared pair; 3 lone pairs on each atom', '3 shared pairs; 1 lone pair on each atom', '2 shared pairs; 3 lone pairs on each atom'],
  sol: 'O (2, 6) needs two electrons: a double bond, leaving 4 electrons (2 lone pairs) on each O — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('ccl4-mcq', mcq({
  stem: 'Carbon tetrachloride, CCl₄, contains four C–Cl bonds but the molecule is non-polar because:',
  right: 'the four bonds point symmetrically to the corners of a tetrahedron, so their polarities cancel',
  wrong: ['carbon and chlorine have the same electronegativity', 'it contains no lone pairs', 'its bonds are ionic'],
  sol: 'Symmetry cancels the bond polarities — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('lonecount-mcq', mcq({
  stem: 'The total number of lone pairs in one molecule of chlorine, Cl₂, is:',
  right: '6',
  wrong: ['3', '2', '8'],
  sol: 'Each Cl keeps three lone pairs after sharing one pair: 2 × 3 = 6 — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('h2-mcq', mcq({
  stem: 'In a hydrogen molecule, H₂, each hydrogen atom attains the stable configuration of:',
  right: 'helium (a duplet)',
  wrong: ['neon (an octet)', 'lithium', 'argon'],
  sol: 'The shared pair gives each H two electrons — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('covalent-ar', ar({
  a: 'In a molecule of nitrogen, each nitrogen atom has one lone pair.',
  r: 'Each nitrogen atom contributes three electrons to the shared pairs.',
  key: 'd',
  sol: 'Both are true; R explains the triple bond, but A follows from 5 − 3 = 2 unshared electrons (one lone pair) — option (d).',
  d: 3, c: 'analysis', t: [3],
}));
add('ch4-tf', tf({
  stem: 'Methane is a non-polar molecule even though the C–H bonds are slightly polar.',
  key: 't',
  sol: 'True: the tetrahedral shape is symmetrical.',
  d: 2, c: 'understanding', t: [3],
}));
add('bondtype-fill', fill({
  stem: 'Complete each sentence by choosing the correct word from the bracket.\n\n(a) The bond between the two atoms in a nitrogen molecule is a ___ bond (double / triple).\n\n(b) A molecule of carbon tetrachloride is ___ (polar / non-polar).\n\n(c) In the ammonium ion, the lone pair of nitrogen forms a ___ bond with H⁺ (coordinate / electrovalent).',
  acc: [['triple'], ['non-polar', 'nonpolar'], ['coordinate', 'dative']],
  sol: '(a) **triple**; (b) **non-polar**; (c) **coordinate**.',
  d: 1, c: 'recall', t: [3, 6],
}));
add('pairs-num', num({
  stem: 'How many electrons in total are shared between the carbon atom and the chlorine atoms in one molecule of carbon tetrachloride, CCl₄?',
  value: 8, tol: 0,
  sol: 'Four single bonds, each a pair of electrons: total shared electrons = 4 × 2 = 8.',
  scheme: [['8', 1]],
  d: 2, c: 'application', t: [3],
}), () => 4 * 2 === 8 || 'count');
add('lone-num', num({
  stem: 'How many lone pairs of electrons are present in one molecule of carbon tetrachloride, CCl₄?',
  value: 12, tol: 0,
  sol: 'Each Cl keeps 3 lone pairs; carbon has none: lone pairs = 4 × 3 = 12.',
  scheme: [['12', 1]],
  d: 2, c: 'application', t: [3],
}), () => 4 * 3 === 12 || 'count');
add('n2-short1', short({
  marks: 1,
  stem: 'State the number of lone pairs on each nitrogen atom in a nitrogen molecule.',
  model: 'One.',
  sol: 'One lone pair.',
  scheme: [['One', 1]],
  d: 2, c: 'application', t: [3],
}));
add('ch4-short1', short({
  marks: 1,
  stem: 'Name the type of bond formed between carbon and hydrogen in methane.',
  model: 'Single covalent bond (non-polar enough to give a non-polar molecule).',
  sol: 'Covalent.',
  scheme: [['Covalent (single)', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('ccl4-short2', short({
  marks: 2,
  stem: 'Draw the electron dot structure of carbon tetrachloride, CCl₄, and state why it is a non-polar molecule.',
  model: 'C in the centre with four shared pairs (one dot and one cross each) to four Cl atoms, each Cl with three lone pairs. Non-polar: the four C–Cl bonds are arranged symmetrically (tetrahedral), so the bond polarities cancel.',
  sol: 'Structure; symmetry.',
  scheme: [['Structure', 1], ['Reason', 1]],
  d: 2, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- t04 polar covalent molecules
add('polar-mcq', mcq({
  stem: 'In a molecule of hydrogen chloride, the chlorine atom carries a partial negative charge because:',
  right: 'chlorine is more electronegative than hydrogen and pulls the shared pair towards itself',
  wrong: ['chlorine gives one electron to hydrogen', 'hydrogen has more protons than chlorine', 'chlorine has a lower electron affinity'],
  sol: 'Unequal sharing in a polar bond — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('nh3lone-mcq', mcq({
  stem: 'The number of bond pairs and lone pairs on the nitrogen atom of an ammonia molecule is:',
  right: '3 bond pairs and 1 lone pair',
  wrong: ['4 bond pairs and no lone pair', '3 bond pairs and 2 lone pairs', '2 bond pairs and 2 lone pairs'],
  sol: 'N (2, 5) shares 3 electrons with 3 H and keeps one pair — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('watershape-mcq', mcq({
  stem: 'Which molecule is polar?',
  right: 'Water, H₂O',
  wrong: ['Methane, CH₄', 'Chlorine, Cl₂', 'Carbon tetrachloride, CCl₄'],
  sol: 'Water has polar O–H bonds and a bent shape, so the polarities do not cancel — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('polar-ar', ar({
  a: 'Ammonia is a polar molecule.',
  r: 'The ammonia molecule has a lone pair of electrons on nitrogen and is not symmetrical.',
  key: 'c',
  sol: 'Both are true, and R explains A — option (c).',
  d: 3, c: 'analysis', t: [4],
}));
add('dpolar-tf', tf({
  stem: 'In a water molecule, the oxygen atom carries a partial positive charge.',
  key: 'f',
  sol: 'False: oxygen is more electronegative and carries δ−; each hydrogen is δ+.',
  d: 1, c: 'understanding', t: [4],
}));
add('h2o-short1', short({
  marks: 1,
  stem: 'State the number of lone pairs on the oxygen atom in a water molecule.',
  model: 'Two.',
  sol: 'Two.',
  scheme: [['Two', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('hcl-short2', short({
  marks: 2,
  stem: 'Draw the electron dot structure of hydrogen chloride and mark the partial charges. Explain why the bond is polar.',
  model: 'H : Cl with one shared pair (one dot, one cross) and three lone pairs on Cl; H is δ+ and Cl is δ−. Chlorine is more electronegative than hydrogen, so the shared pair is pulled closer to chlorine.',
  sol: 'Structure with charges; electronegativity.',
  scheme: [['Structure with δ+ and δ−', 1], ['Reason', 1]],
  d: 2, c: 'application', t: [4],
}));
add('polar-short3', short({
  marks: 3,
  stem: 'Compare the molecules NH₃ and CH₄ with respect to (a) the number of lone pairs on the central atom, (b) shape and (c) polarity, giving a reason for (c).',
  model: '(a) NH₃: one lone pair on N; CH₄: none on C. (b) NH₃ pyramidal; CH₄ tetrahedral. (c) NH₃ is polar (polar N–H bonds with an unsymmetrical shape); CH₄ is non-polar (symmetrical, so bond polarities cancel).',
  sol: 'Lone pairs; shape; polarity.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'analysis', t: [3, 4],
}));

// ---------------------------------------------------------------- t05 comparison of compounds
add('compare-mcq', mcq({
  stem: 'Substance Z is a liquid that boils at 77 °C, does not conduct electricity and mixes with petrol but not with water. Z is most probably:',
  right: 'a non-polar covalent compound such as CCl₄',
  wrong: ['an electrovalent compound such as KCl', 'a metal', 'a polar compound that ionises in water'],
  sol: 'Low boiling point, non-conducting, soluble in organic solvents — option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('hclconduct-mcq', mcq({
  stem: 'Dry liquid hydrogen chloride does not conduct electricity, but its solution in water conducts well. This is because:',
  right: 'in water HCl ionises to H₃O⁺ and Cl⁻ ions',
  wrong: ['water itself is a good conductor', 'HCl is an electrovalent compound', 'liquid HCl contains free electrons'],
  sol: 'HCl + H₂O → H₃O⁺ + Cl⁻ — option (@K).',
  d: 3, c: 'analysis', t: [5],
}));
add('covlow-mcq', mcq({
  stem: 'Most covalent compounds have low melting and boiling points because:',
  right: 'the forces between their molecules are weak',
  wrong: ['the covalent bonds inside the molecules are weak', 'they contain ions', 'they are always gases'],
  sol: 'Only weak intermolecular forces are overcome on melting or boiling — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('compare-short1', short({
  marks: 1,
  stem: 'Write the equation for the ionisation of hydrogen chloride in water.',
  model: 'HCl + H₂O → H₃O⁺ + Cl⁻.',
  sol: 'Equation.',
  scheme: [['Balanced equation', 1]],
  d: 2, c: 'application', t: [5],
}));
add('compare-short2', short({
  marks: 2,
  stem: 'State two differences between sodium chloride and carbon tetrachloride other than the type of bonding.',
  model: 'Sodium chloride is a hard crystalline solid with a high melting point; carbon tetrachloride is a volatile liquid with a low boiling point. Sodium chloride conducts when molten or dissolved; carbon tetrachloride does not conduct. (Also: NaCl dissolves in water, CCl₄ in organic solvents.)',
  sol: 'Any two property differences.',
  scheme: [['First difference', 1], ['Second difference', 1]],
  d: 2, c: 'analysis', t: [5],
}));
add('class-match', match({
  stem: 'Match each substance in Column A with the description in Column B.',
  pairs: [
    ['Magnesium oxide', 'Electrovalent; very high melting point'],
    ['Carbon tetrachloride', 'Non-polar covalent liquid'],
    ['Hydrogen chloride', 'Polar covalent; ionises in water'],
    ['Ammonium ion', 'Contains a coordinate bond'],
    ['Nitrogen', 'Triple covalent bond'],
  ],
  order: [4, 2, 0, 3, 1],
  sol: 'MgO → electrovalent, high melting point; CCl₄ → non-polar liquid; HCl → polar, ionises in water; NH₄⁺ → coordinate bond; N₂ → triple bond.',
  d: 2, c: 'application', t: [2, 3, 4, 5, 6],
}));

// ---------------------------------------------------------------- t06 coordinate bonding
add('coord-mcq', mcq({
  stem: 'When ammonia gas meets hydrogen ions to form the ammonium ion, NH₄⁺, the new bond is formed by:',
  right: 'the lone pair on nitrogen being donated to the hydrogen ion',
  wrong: ['transfer of an electron from hydrogen to nitrogen', 'sharing one electron from nitrogen and one from the hydrogen ion', 'transfer of an electron from nitrogen to the hydrogen ion'],
  sol: 'H⁺ has no electrons; both electrons come from nitrogen — a coordinate bond — option (@K).',
  d: 2, c: 'understanding', t: [6],
}));
add('h3o-mcq', mcq({
  stem: 'In the hydronium ion, H₃O⁺, the numbers of ordinary covalent bonds and coordinate bonds are:',
  right: '2 covalent and 1 coordinate',
  wrong: ['3 covalent and no coordinate', '1 covalent and 2 coordinate', '2 covalent and 2 coordinate'],
  sol: 'Water has two O–H bonds; the third forms when a lone pair on O is donated to H⁺ — option (@K).',
  d: 2, c: 'application', t: [6],
}));
add('acceptor-mcq', mcq({
  stem: 'Which particle can only act as an acceptor in forming a coordinate bond?',
  right: 'H⁺',
  wrong: ['NH₃', 'H₂O', 'Cl⁻'],
  sol: 'A hydrogen ion has no electrons to donate — option (@K).',
  d: 2, c: 'understanding', t: [6],
}));
add('coord-ar', ar({
  a: 'Methane does not form a coordinate bond with a hydrogen ion.',
  r: 'Methane has no lone pair on its carbon atom.',
  key: 'c',
  sol: 'Both are true, and R explains A — option (c).',
  d: 3, c: 'analysis', t: [6],
}));
add('coord-ar2', ar({
  a: 'All four N–H bonds in the ammonium ion are different from one another once the ion is formed.',
  r: 'One N–H bond in the ammonium ion is formed by a lone pair donated by nitrogen.',
  key: 'b',
  sol: 'A is false: once formed, the coordinate bond is identical to the others; R is true — option (b).',
  d: 4, c: 'evaluation', t: [6],
}));
add('coord-tf', tf({
  stem: 'In a coordinate bond, both electrons of the shared pair are supplied by the same atom.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [6],
}));
add('lone-fill', fill({
  stem: 'A pair of valence electrons that is not shared with another atom is called a ___ pair.',
  acc: [['lone']],
  sol: '**Lone** pair.',
  d: 1, c: 'recall', t: [6],
}));
add('h3o-short1', short({
  marks: 1,
  stem: 'Write the equation for the formation of the hydronium ion from water.',
  model: 'H₂O + H⁺ → H₃O⁺.',
  sol: 'Equation.',
  scheme: [['Equation', 1]],
  d: 1, c: 'application', t: [6],
}));
add('selfion-short1', short({
  marks: 1,
  stem: 'Write the equation that shows how pure water produces hydronium and hydroxide ions.',
  model: 'H₂O + H₂O ⇌ H₃O⁺ + OH⁻.',
  sol: 'Equation.',
  scheme: [['Equation', 1]],
  d: 2, c: 'application', t: [6],
}));
add('nh4-short2', short({
  marks: 2,
  stem: 'Draw electron dot diagrams to show the formation of the ammonium ion from ammonia and a hydrogen ion. Label the coordinate bond.',
  model: 'NH₃ with three shared pairs to H and one lone pair on N; H⁺ with no electrons. The lone pair on N becomes the shared pair to the new H, giving [NH₄]⁺ with four shared pairs; the bond from the donated pair is labelled coordinate.',
  sol: 'NH₃ with lone pair; NH₄⁺ with label.',
  scheme: [['NH₃ and H⁺ correct', 1], ['NH₄⁺ with coordinate bond labelled and charge', 1]],
  d: 2, c: 'application', t: [6],
}));
add('coord-short3', short({
  marks: 3,
  stem: '(a) Define a coordinate bond. (b) Explain why water and ammonia can form coordinate bonds with H⁺ but methane cannot. (c) Name the ion formed when water accepts H⁺.',
  model: '(a) A covalent bond in which both electrons of the shared pair are donated by one atom. (b) Oxygen in water (two lone pairs) and nitrogen in ammonia (one lone pair) have lone pairs to donate; the carbon in methane has none. (c) Hydronium ion, H₃O⁺.',
  sol: 'Definition; lone pairs; hydronium.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'understanding', t: [6],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('ionic-long', long({
  stem: '(a) What is meant by an electrovalent bond? State the conditions that favour its formation. [2]\n\n(b) Draw electron dot diagrams to show the formation of sodium chloride from sodium (11) and chlorine (17). [2]\n\n(c) Element X has atomic number 12 and element Y has atomic number 9. (i) Write their configurations. (ii) Write the formula of the compound XY₂ in terms of ions. (iii) Name the bond. [3]\n\n(d) Give reasons: (i) solid sodium bromide does not conduct but its solution does; (ii) magnesium oxide has a higher melting point than sodium chloride; (iii) sodium chloride dissolves in water but not in petrol. [3]',
  model: '(a) A bond formed by complete transfer of electrons from one atom to another; the ions are held by electrostatic attraction. Favoured by low ionisation potential of one atom (a metal) and high electron affinity of the other (a non-metal).\n\n(b) Na with one cross in the outer shell; Cl with seven dots; the cross moves to Cl, giving [Na]⁺ and [Cl with seven dots and one cross]⁻ in brackets.\n\n(c) (i) X: 2, 8, 2; Y: 2, 7. (ii) X²⁺(Y⁻)₂ (MgF₂). (iii) Electrovalent.\n\n(d) (i) In the solid the ions are fixed; in solution they are free to move. (ii) Mg²⁺ and O²⁻ carry double charges, so the attraction in MgO is much stronger. (iii) Water attracts and separates the ions; petrol, a non-polar solvent, does not.',
  sol: 'Definition and conditions; dot diagram; configurations and formula; reasons.',
  scheme: [['(a) definition', 1], ['(a) conditions', 1], ['(b)', 2], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(d)(i)', 1], ['(d)(ii)', 1], ['(d)(iii)', 1]],
  d: 3, c: 'application', t: [1, 2],
}));
add('covalent-long', long({
  stem: '(a) What is a covalent bond? How does a double bond differ from a single bond? [2]\n\n(b) Draw electron dot structures of (i) a nitrogen molecule and (ii) methane. [2]\n\n(c) (i) Name a non-polar molecule that contains polar bonds. (ii) Explain why it is non-polar. (iii) State its shape. [3]\n\n(d) State three properties of covalent compounds such as tetrachloromethane and explain any one of them. [3]',
  model: '(a) A bond formed by sharing a pair of electrons, one from each atom. A single bond is one shared pair; a double bond is two shared pairs (as in O₂).\n\n(b) (i) N≡N: three shared pairs between the N atoms and one lone pair on each N. (ii) C at the centre sharing one pair with each of four H atoms.\n\n(c) (i) CCl₄ (or CH₄). (ii) The bond polarities cancel because the bonds are arranged symmetrically. (iii) Tetrahedral.\n\n(d) Low melting and boiling points; insoluble in water but soluble in organic solvents; do not conduct electricity. Explanation (any one): e.g. low boiling point — only weak forces between molecules have to be overcome.',
  sol: 'Definition; two structures; non-polar molecule; properties.',
  scheme: [['(a)', 2], ['(b)(i)', 1], ['(b)(ii)', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(d) three properties', 2], ['(d) explanation', 1]],
  d: 3, c: 'understanding', t: [3, 5],
}));
add('polar-long', long({
  stem: '(a) Define electronegativity and explain how a difference in electronegativity makes a covalent bond polar. [2]\n\n(b) Draw the electron dot structure of water and mark the partial charges. [2]\n\n(c) Compare HCl and NaCl with respect to (i) the type of bond, (ii) the particles present in the pure substance and (iii) electrical conductivity of the pure liquid. [3]\n\n(d) Hydrogen chloride gas dissolves in water and the solution turns blue litmus red. (i) Write the equation for the ionisation. (ii) Name the positive ion formed. (iii) Explain why the pure liquid does not conduct but the solution does. [3]',
  model: '(a) Electronegativity is the tendency of an atom in a molecule to attract the shared pair towards itself. When the two atoms differ, the pair lies closer to the more electronegative atom, which becomes δ− while the other becomes δ+.\n\n(b) O with two shared pairs to two H atoms and two lone pairs; O δ−, each H δ+.\n\n(c) (i) HCl: polar covalent; NaCl: electrovalent. (ii) HCl: molecules; NaCl: ions. (iii) Liquid HCl does not conduct; molten NaCl conducts.\n\n(d) (i) HCl + H₂O → H₃O⁺ + Cl⁻. (ii) Hydronium ion. (iii) Pure liquid HCl contains only molecules; in water it ionises, giving free ions that carry charge.',
  sol: 'Electronegativity; water structure; comparison; ionisation.',
  scheme: [['(a)', 2], ['(b)', 2], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(d)(i)', 1], ['(d)(ii)', 1], ['(d)(iii)', 1]],
  d: 3, c: 'analysis', t: [4, 5],
}));
add('coord-long', long({
  stem: '(a) Define (i) a lone pair and (ii) a coordinate bond. [2]\n\n(b) Draw an electron dot diagram for the formation of the hydronium ion from water and a hydrogen ion. [2]\n\n(c) (i) How many lone pairs are present on the nitrogen of ammonia? (ii) Write the equation for the formation of the ammonium ion. (iii) How many coordinate bonds are present in the ammonium ion? [3]\n\n(d) Explain (i) why methane does not form CH₅⁺ in the same way, (ii) why water contains a small number of H₃O⁺ and OH⁻ ions, and (iii) why the four N–H bonds of NH₄⁺ cannot be told apart once it has formed. [3]',
  model: '(a) (i) A pair of valence electrons on an atom not used in bonding. (ii) A covalent bond in which both shared electrons come from one atom.\n\n(b) H₂O with two shared pairs and two lone pairs on O; H⁺ with no electrons; one lone pair of O shared with H⁺, giving [H₃O]⁺ with three shared pairs and one lone pair.\n\n(c) (i) One. (ii) NH₃ + H⁺ → NH₄⁺. (iii) One.\n\n(d) (i) Carbon in methane has no lone pair to donate. (ii) A lone pair on one water molecule accepts H⁺ from another: H₂O + H₂O ⇌ H₃O⁺ + OH⁻. (iii) Once formed, a coordinate bond is a shared pair just like the others.',
  sol: 'Definitions; hydronium diagram; ammonium; reasons.',
  scheme: [['(a)(i)', 1], ['(a)(ii)', 1], ['(b)', 2], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(d)(i)', 1], ['(d)(ii)', 1], ['(d)(iii)', 1]],
  d: 3, c: 'understanding', t: [6],
}));
add('unknown-long', long({
  stem: 'Elements P, Q and R have atomic numbers 19, 8 and 1.\n\n(a) Write the electronic configurations of P, Q and R. [2]\n\n(b) (i) Name the type of bond formed between P and Q and write the formula of the compound. (ii) Name the type of bond formed between Q and R and write the formula of the compound. [2]\n\n(c) For the compound of Q and R: (i) state the number of lone pairs on Q, (ii) state whether the molecule is polar, and (iii) name the ion formed when it accepts H⁺. [3]\n\n(d) Predict, with reasons, which of the two compounds in (b) (i) has the higher melting point, (ii) conducts when molten and (iii) dissolves in kerosene. [3]',
  model: '(a) P: 2, 8, 8, 1; Q: 2, 6; R: 1.\n\n(b) (i) Electrovalent; P₂Q (K₂O). (ii) Covalent (polar); R₂Q (H₂O).\n\n(c) (i) Two. (ii) Polar. (iii) Hydronium ion, H₃O⁺.\n\n(d) (i) P₂Q — ions held by strong electrostatic forces. (ii) P₂Q — its ions become free to move in the melt; water is molecular. (iii) Neither readily: P₂Q is ionic (insoluble in non-polar solvents) and water is polar and does not mix with kerosene.',
  sol: 'Configurations; bond types and formulae; water; predictions.',
  scheme: [['(a)', 2], ['(b)(i)', 1], ['(b)(ii)', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(d)(i)', 1], ['(d)(ii)', 1], ['(d)(iii)', 1]],
  d: 4, c: 'analysis', t: [1, 2, 4, 5, 6],
}));
