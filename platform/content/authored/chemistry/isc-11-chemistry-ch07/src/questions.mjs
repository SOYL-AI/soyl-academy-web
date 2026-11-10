// ISC 11 Chemistry ch07 Ionic Bonding: question bank (ISC style). Enthalpies in kJ per mole from data.mjs (standard textbook
// Born-Haber data); every numerical is computed in JS and re-solved by a check. Assertion-reason keys are set per item.
import { mk, add, r, near } from './lib.mjs';
import { ELEM, ionic, BH, bhSteps, bhSum, bhLattice, bhHf, LATT, RAD, EN } from './data.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const mn = (x) => String(x).replace('-', '−'); // typographic minus for display
const kj = (x) => `${mn(x)} kJ mol⁻¹`;

// ---------------------------------------------------------------- t01 valence electrons, Kossel-Lewis, octet rule
add('valence-mcq', mcq({
  stem: 'A water-treatment chemist is told that the sample contains the non-metal of atomic number 16. How many valence electrons does an atom of this element have?',
  right: '6',
  wrong: ['2', '4', '8'],
  sol: 'Z = 16 gives the configuration 2, 8, 6, so the outermost (valence) shell holds 6 electrons — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('kossel-mcq', mcq({
  stem: 'Which statement agrees with the Kossel–Lewis explanation of why atoms of most elements join to form compounds?',
  right: 'Atoms transfer or share electrons so that each acquires the outer-shell arrangement of the nearest noble gas',
  wrong: ['Atoms join so that each nucleus gains extra protons from its neighbour', 'Atoms join so that the number of neutrons in each nucleus becomes equal', 'Atoms join to lose their valence electrons completely and become neutral again'],
  sol: 'Kossel and Lewis proposed that the stability of the noble gases comes from their full outer shells, and that other atoms reach such an arrangement by gaining, losing or sharing electrons — option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('duplet-mcq', mcq({
  stem: 'A student studying battery and fertiliser materials works out the electron arrangements of four ions found in them. Which of these ions does NOT have eight electrons in its outermost occupied shell?',
  right: 'Li⁺',
  wrong: ['Mg²⁺', 'Cl⁻', 'O²⁻'],
  sol: 'Li⁺ has 3 − 1 = 2 electrons, arranged (2), a duplet like helium, not an octet. Mg²⁺ (2, 8), Cl⁻ (2, 8, 8) and O²⁻ (2, 8) each have 8 electrons in the outer shell — option (@K).',
  d: 2, c: 'application', t: [1],
}));
add('lewissymbol-mcq', mcq({
  stem: 'The Lewis (electron-dot) symbol of the element in Group 15 of the periodic table, drawn for a fertiliser-chemistry class, shows:',
  right: 'five dots round the symbol, one pair and three single dots',
  wrong: ['three dots round the symbol, all single', 'five dots round the symbol, all single', 'eight dots round the symbol, four pairs'],
  sol: 'A Group 15 atom has 5 valence electrons. Dots are placed singly on the four sides first and then paired, giving one pair and three single dots — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('noble-tf', tf({
  stem: 'A helium atom is stable because its outermost shell holds an octet of eight electrons.',
  key: 'f',
  sol: 'False. Helium has only the first shell, which is complete with 2 electrons (a duplet); its stability does not come from an octet.',
  d: 1, c: 'understanding', t: [1],
}));
add('alkaline-fill', fill({
  stem: 'The Lewis symbol of any alkaline earth metal shows ___ dots.',
  acc: [['2', 'two']],
  sol: 'Alkaline earth metals (Group 2) have two valence electrons, so their Lewis symbols show two dots.',
  d: 1, c: 'recall', t: [1],
}));
add('noble-ar', ar({
  a: 'Neon and argon take part in very few chemical reactions.',
  r: 'The outermost shell of each of these atoms already holds eight electrons.',
  key: 'a',
  sol: 'Both statements are true, and the full outer shell is the reason for the low reactivity, so R explains A — option (a).',
  d: 1, c: 'understanding', t: [1],
}));
add('octet-short2', short({
  marks: 2,
  stem: 'State the octet rule. Why do hydrogen and lithium form stable ions or molecules with only two electrons in the outer shell?',
  model: 'Atoms tend to enter into chemical combination, by losing, gaining or sharing electrons, so that each acquires eight electrons in its outermost shell, the arrangement of a noble gas. Hydrogen and lithium have only the first shell as the nearest filled shell (helium), which is complete with two electrons, so they attain a duplet instead of an octet.',
  sol: 'Octet statement; duplet like helium.',
  scheme: [['Octet rule stated', 1], ['Duplet: first shell complete with two electrons, like helium', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('kossel-short3', short({
  marks: 3,
  stem: 'Give three ideas of the Kossel–Lewis approach to chemical bonding.',
  model: 'First, in every atom the valence electrons, those of the outermost shell, take part in bonding. Second, the noble gases are stable (inert) because their outer shells are complete, 8 electrons (2 for helium). Third, other atoms form bonds, by transfer of electrons (electrovalent bond) or by sharing electrons (covalent bond), so as to reach this noble gas arrangement of eight electrons, the octet rule.',
  sol: 'Valence electrons; noble gas stability; transfer or sharing to an octet.',
  scheme: [['Valence electrons take part in bonding', 1], ['Stability of noble gas shells', 1], ['Transfer or sharing to complete the octet', 1]],
  d: 1, c: 'recall', t: [1],
}));

// ---------------------------------------------------------------- t02 ionic bond, electron-dot structures, conditions
add('nacl-mcq', mcq({
  stem: 'During the formation of sodium chloride from its atoms, the electron arrangements of sodium and chlorine change from (2, 8, 1) and (2, 8, 7) to:',
  right: '(2, 8) for the sodium ion and (2, 8, 8) for the chloride ion',
  wrong: ['(2, 8, 2) for the sodium ion and (2, 8, 6) for the chloride ion', '(2, 8) for the sodium ion and (2, 8, 6) for the chloride ion', '(2, 8, 8) for the sodium ion and (2, 8) for the chloride ion'],
  sol: 'Na gives its single outer electron to Cl: Na⁺ is (2, 8) and Cl⁻ is (2, 8, 8) — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('li2o-mcq', mcq({
  stem: 'In the electron-dot structure of lithium oxide used in a ceramics lab, which description is correct?',
  right: 'Two Li⁺ ions with no outer electrons and one O²⁻ ion with eight dots in brackets',
  wrong: ['One Li⁺ ion and one O⁻ ion, each with eight dots', 'Two Li⁺ ions each with eight dots and one O²⁻ ion with six dots', 'Two Li atoms each sharing one pair of dots with an oxygen atom'],
  sol: 'Each of two Li atoms transfers one electron to O, which then has 6 + 2 = 8 outer electrons. Li⁺ has no outer electrons (it is a helium duplet) — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('formula-mcq', (() => {
  const c = ionic('Al', 'O');
  return mcq({
    stem: 'A refractory brick is made from the compound of aluminium (three valence electrons) and oxygen (six valence electrons). Predicting the formula by electron transfer, the compound is:',
    right: r`$\ce{Al2O3}$, with ${c.lost} electrons transferred in all`,
    wrong: [r`$\ce{AlO}$, with 3 electrons transferred in all`, r`$\ce{Al3O2}$, with 9 electrons transferred in all`, r`$\ce{Al2O}$, with 6 electrons transferred in all`],
    sol: r`Al gives 3 electrons, O takes 2, so the least common multiple is 6: 2 Al and 3 O, $\ce{Al2O3}$, with ${c.lost} electrons transferred in all — option (@K).`,
    d: 3, c: 'application', t: [2],
  });
})(), () => ionic('Al', 'O').formula === 'Al₂O₃' && ionic('Al', 'O').lost === 6 || 'al2o3');
add('ca3n2-mcq', (() => {
  const c = ionic('Ca', 'N');
  return mcq({
    stem: 'Calcium metal burns in nitrogen to form a nitride. In forming one formula unit of the product, the total number of electrons transferred from calcium atoms to nitrogen atoms is:',
    right: String(c.lost),
    wrong: ['2', '3', '9'],
    sol: r`Ca gives 2 electrons and N takes 3, so the formula is $\ce{Ca3N2}$: 3 Ca lose $3 \times 2 = ${c.lost}$ and 2 N gain $2 \times 3 = ${c.gained}$ — option (@K).`,
    d: 3, c: 'application', t: [2],
  });
})(), () => ionic('Ca', 'N').lost === 6 && ionic('Ca', 'N').formula === 'Ca₃N₂' || 'ca3n2');
add('conditions-mcq', mcq({
  stem: 'Which set of properties of the two reacting elements most favours the formation of a stable ionic compound?',
  right: 'A low ionisation enthalpy for the metal, a large negative electron gain enthalpy for the non-metal and a high lattice enthalpy of the product',
  wrong: ['A high ionisation enthalpy for the metal, a small electron gain enthalpy for the non-metal and a low lattice enthalpy', 'A low ionisation enthalpy for the metal, a positive electron gain enthalpy for the non-metal and a low lattice enthalpy', 'A high ionisation enthalpy for the metal, a large negative electron gain enthalpy for the non-metal and a high lattice enthalpy'],
  sol: 'The metal must lose electrons easily (low IE), the non-metal must gain them easily (large negative EGE) and the energy released when the ions pack into a lattice must be high — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('en-mcq', (() => {
  const pairs = [['K', 'Cl'], ['C', 'O'], ['H', 'Br'], ['N', 'Cl']];
  const d = pairs.map(([a, b]) => Math.round((EN[b] - EN[a]) * 10) / 10);
  return mcq({
    stem: `Pauling electronegativities (given) are K ${EN.K}, Cl ${EN.Cl}, C ${EN.C}, O ${EN.O}, H ${EN.H}, Br ${EN.Br} and N ${EN.N}. Which pair of atoms is most likely to form an ionic bond in the solid state?`,
    right: `K and Cl (difference ${d[0].toFixed(1)})`,
    wrong: [`C and O (difference ${d[1].toFixed(1)})`, `H and Br (difference ${d[2].toFixed(1)})`, `N and Cl (difference ${d[3].toFixed(1)})`],
    sol: `The differences are ${d.map((x) => x.toFixed(1)).join(', ')}. Only K–Cl, between a very electropositive metal and a very electronegative non-metal, has a large enough difference (well above 1.7) for electron transfer — option (@K).`,
    d: 2, c: 'application', t: [2],
  });
})(), () => near(EN.Cl - EN.K, 2.2, 0.01) && EN.Cl - EN.K > EN.O - EN.C || 'en');
add('mgf2-mcq', mcq({
  stem: 'A dentist’s fluoride varnish contains magnesium fluoride. In its electron-dot structure the charges and the numbers of the ions are:',
  right: 'one Mg²⁺ ion and two F⁻ ions, each F⁻ with eight dots',
  wrong: ['two Mg²⁺ ions and one F²⁻ ion', 'one Mg⁺ ion and one F⁻ ion', 'one Mg²⁺ ion and two F⁻ ions, each F⁻ with seven dots'],
  sol: 'Mg gives 2 electrons; each F takes 1 and then has 7 + 1 = 8 outer electrons, so one Mg²⁺ pairs with two F⁻ — option (@K).',
  d: 2, c: 'application', t: [2],
}));
add('na2s-tf', tf({
  stem: 'In the formation of sodium sulfide, the sulfur atom gains two electrons, one from each of two sodium atoms.',
  key: 't',
  sol: 'True. Sulfur has 6 valence electrons and needs 2 more for an octet; each sodium atom gives one, so the formula is Na₂S.',
  d: 1, c: 'understanding', t: [2],
}));
add('mgo-ar', ar({
  a: 'Two electrons are transferred from a magnesium atom to an oxygen atom when magnesium oxide forms.',
  r: 'Magnesium oxide is a white solid with a very high melting point.',
  key: 'b',
  sol: 'Mg has two valence electrons and O needs two, so A is true; R is also a true property of MgO, but it says nothing about the number of electrons transferred, so it is not the explanation — option (b).',
  d: 2, c: 'analysis', t: [2],
}));
add('ege-ar', ar({
  a: 'Chlorine releases energy when a gaseous atom gains one electron.',
  r: 'The electron gain enthalpy of chlorine is large and positive.',
  key: 'c',
  sol: 'A is true: the first electron gain enthalpy of Cl is about −349 kJ mol⁻¹ (energy is released). R is false because the value is negative — option (c).',
  d: 2, c: 'understanding', t: [2],
}));
add('only-halogen-ar', ar({
  a: 'An ionic compound can be formed only between a Group 1 metal and a halogen.',
  r: 'Every metal-to-non-metal combination involves the transfer of exactly one electron.',
  key: 'd',
  sol: 'A is false: MgO, CaO and Na₂S, for example, are ionic. R is false: electrons transferred range from one to three or more — option (d).',
  d: 2, c: 'analysis', t: [2],
}));
add('lewis-match', match({
  stem: 'Match each ionic compound with the ions that appear in its electron-dot structure.',
  pairs: [['Li₂O', 'two Li⁺ and one O²⁻'], ['MgO', 'one Mg²⁺ and one O²⁻'], ['MgF₂', 'one Mg²⁺ and two F⁻'], ['Na₂S', 'two Na⁺ and one S²⁻']],
  order: [2, 0, 3, 1],
  sol: 'Li₂O → r (two Li⁺ and one O²⁻); MgO → p (one Mg²⁺ and one O²⁻); MgF₂ → s (one Mg²⁺ and two F⁻); Na₂S → q (two Na⁺ and one S²⁻).',
  d: 2, c: 'understanding', t: [2],
}));
add('cao-short2', short({
  marks: 2,
  stem: 'Show by electron-dot structures how calcium oxide is formed from a calcium atom and an oxygen atom. Give the number of electrons in the outer shell of each ion formed.',
  model: 'A calcium atom (2, 8, 8, 2) has two valence electrons, drawn as two dots; an oxygen atom (2, 6) has six. Calcium transfers both electrons to oxygen: Ca• • + O (six dots) → [Ca]²⁺ [O with eight dots]²⁻. The Ca²⁺ ion has the argon arrangement, 8 electrons in the outer shell, and the O²⁻ ion has the neon arrangement, also 8.',
  sol: 'Two electrons from Ca to O; Ca²⁺ (2, 8, 8) and O²⁻ (2, 8).',
  scheme: [['Transfer of two electrons from Ca to O shown', 1], ['Ions in brackets with charges and eight outer electrons each', 1]],
  d: 2, c: 'application', t: [2],
}));
add('cond-short2', short({
  marks: 2,
  stem: 'Name two factors that favour the formation of an ionic bond between a metal and a non-metal, and say how each acts.',
  model: 'A low ionisation enthalpy of the metal favours the loss of electrons to give the cation, so less energy has to be supplied. A large negative electron gain enthalpy of the non-metal favours formation of the anion. (A high lattice enthalpy, and a large difference in electronegativity, also favour it: the energy released when the ions pack into a crystal pays for the energy needed to form them.)',
  sol: 'Low ionisation enthalpy; large negative electron gain enthalpy (or high lattice enthalpy).',
  scheme: [['First factor with its effect', 1], ['Second factor with its effect', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('compare-short3', short({
  marks: 3,
  stem: 'Sodium and magnesium each burn in chlorine. Write the formula of each product, show the electrons transferred, and explain why one magnesium atom needs two chlorine atoms.',
  model: r`Sodium gives one electron to one Cl atom: $\ce{Na -> Na+ + e-}$, $\ce{Cl + e- -> Cl-}$, giving $\ce{NaCl}$. Magnesium has two valence electrons and gives both: $\ce{Mg -> Mg^2+ + 2e-}$. Each chlorine atom has seven valence electrons and can take only one, $\ce{Cl + e- -> Cl-}$, so two Cl atoms are needed to take the two electrons, giving $\ce{MgCl2}$. The total positive charge equals the total negative charge in each formula.`,
  sol: 'NaCl; MgCl₂; two electrons need two one-electron acceptors.',
  scheme: [['NaCl with the transfer of one electron', 1], ['MgCl₂ with the transfer of two electrons', 1], ['Reason: each Cl accepts only one electron', 1]],
  d: 3, c: 'application', t: [2],
}));
add('en-short3', (() => {
  const set = [['Cs', 0.7, 'F', 4.0], ['C', 2.5, 'Cl', 3.0], ['Ca', 1.0, 'O', 3.5]];
  const d = set.map(([, a, , b]) => Math.round((b - a) * 10) / 10);
  return short({
    marks: 3,
    stem: `A student is given the electronegativities (illustrative) Cs ${set[0][1]}, F ${set[0][3]}, C ${set[1][1]}, Cl ${set[1][3]}, Ca ${set[2][1]} and O ${set[2][3]}. Calculate the difference for each of the bonds Cs–F, C–Cl and Ca–O, and decide which bond is the most ionic and which is the least ionic.`,
    model: `Differences: Cs–F = ${set[0][3]} − ${set[0][1]} = ${d[0].toFixed(1)}; C–Cl = ${set[1][3]} − ${set[1][1]} = ${d[1].toFixed(1)}; Ca–O = ${set[2][3]} − ${set[2][1]} = ${d[2].toFixed(1)}. The Cs–F bond has the largest difference, so it is the most ionic; the C–Cl bond has the smallest difference (0.5), so it is the least ionic (it is covalent).`,
    sol: `Cs–F ${d[0].toFixed(1)}; C–Cl ${d[1].toFixed(1)}; Ca–O ${d[2].toFixed(1)}; most ionic Cs–F, least C–Cl.`,
    scheme: [['Three differences calculated: 3.3, 0.5, 2.5', 1.5], ['Most ionic: Cs–F', 1], ['Least ionic: C–Cl', 0.5]],
    d: 2, c: 'application', t: [2],
  });
})(), () => near(4.0 - 0.7, 3.3, 0.01) && near(3.5 - 1.0, 2.5, 0.01) && near(0.5, 3.0 - 2.5, 0.01) || 'en-short3');
add('mgf2-long', long({
  stem: `(a) With the help of electron-dot structures, show how magnesium fluoride is formed from magnesium and fluorine atoms, giving the electronic configuration of each ion formed. [3]

(b) Explain why the formula is MgF₂ and not MgF, and name the noble gas atom to which both ions are isoelectronic. [2]`,
  model: `(a) A magnesium atom (2, 8, 2) has two valence electrons; a fluorine atom (2, 7) has seven. Mg transfers one electron to each of two F atoms: Mg(••) + 2 F(seven dots) → [Mg]²⁺ 2 [F with eight dots]⁻. Mg²⁺ is (2, 8) and each F⁻ is (2, 8), with a full octet.

(b) Magnesium must lose two electrons, but each fluorine atom can accept only one to reach its octet, so two F atoms are needed to take both and the total charge is zero: 2+ and 2 × (1−). Mg²⁺ and F⁻ each have 10 electrons and are isoelectronic with neon.`,
  sol: 'Transfer of 1 electron to each of two F; Mg²⁺ (2, 8) and F⁻ (2, 8); neon.',
  scheme: [['(a) Electron transfer shown with dot structures', 1], ['(a) Ions in brackets with charges', 1], ['(a) Configurations of the ions', 1], ['(b) Two F atoms, each accepting one electron', 1], ['(b) Neon', 1]],
  d: 3, c: 'application', t: [2],
}));
add('cond-long', (() => {
  const dE = BH.NaCl.ie[0] + BH.NaCl.ege;
  return long({
    stem: `(a) Name three factors that favour the formation of an ionic bond. [3]

(b) The ionisation enthalpy of sodium is ${BH.NaCl.ie[0]} kJ mol⁻¹ and the electron gain enthalpy of chlorine is ${mn(BH.NaCl.ege)} kJ mol⁻¹. Calculate the enthalpy change for $\\ce{Na(g) + Cl(g) -> Na+(g) + Cl-(g)}$ and explain why sodium chloride still forms readily. [2]`,
    model: `(a) (i) a low ionisation enthalpy of the metal, (ii) a large negative electron gain enthalpy of the non-metal, (iii) a high lattice enthalpy, the energy released when the gaseous ions form the crystal (a large electronegativity difference also favours the transfer).

(b) ΔH = IE + EGE = ${BH.NaCl.ie[0]} + (${mn(BH.NaCl.ege)}) = +${dE} kJ mol⁻¹. The formation of the ions from the atoms absorbs energy, but when the ions pack into the lattice a large amount of energy (the lattice enthalpy, −788 kJ mol⁻¹) is released, much more than ${dE} kJ, so the process as a whole is strongly exothermic.`,
    sol: `Three factors; +${dE} kJ mol⁻¹ offset by the lattice enthalpy.`,
    scheme: [['(a) Low ionisation enthalpy', 1], ['(a) Large negative electron gain enthalpy', 1], ['(a) High lattice enthalpy', 1], [`(b) +${dE} kJ mol⁻¹`, 1], ['(b) Lattice enthalpy outweighs it', 1]],
    d: 3, c: 'application', t: [2],
  });
})(), () => BH.NaCl.ie[0] + BH.NaCl.ege === 147 || 'cond-long');

// ---------------------------------------------------------------- t03 cations, anions, variable electrovalency
add('cation-mcq', mcq({
  stem: 'Sodium forms Na⁺ readily but never Na²⁺ in chemical reactions. The main reason is that:',
  right: 'removing a second electron means breaking into the stable (2, 8) neon-like core, which needs far more energy',
  wrong: ['sodium has only one electron in its whole atom', 'the second electron of sodium is held less strongly than the first', 'a Na²⁺ ion would be larger than the Na atom'],
  sol: 'After the single 3s electron goes, the ion has the stable neon core (2, 8); a second ionisation enthalpy (about 4560 kJ mol⁻¹ against 496) is far too large to be paid by lattice formation — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('fe-mcq', mcq({
  stem: 'A sample of iron(II) chloride slowly turns into iron(III) chloride on exposure to chlorine. The extra stability of the Fe³⁺ ion is best explained by its:',
  right: 'half-filled 3d⁵ arrangement, which is especially stable',
  wrong: ['completely empty 4s and 3d orbitals', 'completely filled 3d¹⁰ arrangement', 'noble gas arrangement of eight outer electrons'],
  sol: 'Fe is [Ar] 3d⁶ 4s². Fe²⁺ is 3d⁶ and Fe³⁺ is 3d⁵, a half-filled d subshell, which adds to its stability — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('pb-mcq', mcq({
  stem: 'Lead(II) compounds are generally more stable than lead(IV) compounds, while carbon prefers the +4 state. The better explanation for lead is:',
  right: 'the two 6s electrons are held tightly and do not take part in bonding (inert pair effect)',
  wrong: ['lead has only two valence electrons in its outer shell', 'lead(IV) ions are too small to exist in crystals', 'lead has no p electrons that could be lost'],
  sol: 'Lead has 6s² 6p². The 6p electrons are lost to give Pb²⁺, but the 6s² pair, poorly shielded and drawn close to the nucleus, resists loss (the inert pair effect) — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('sn-mcq', (() => {
  const z = 50;
  const e2 = z - 2;
  const e4 = z - 4;
  return mcq({
    stem: `Tin (Z = ${z}) has the outer arrangement 5s² 5p². In the Sn²⁺ ion and in the Sn⁴⁺ ion, the numbers of electrons present are respectively:`,
    right: `${e2} and ${e4}`,
    wrong: [`${e4} and ${e2}`, `${z + 2} and ${z + 4}`, `2 and 4`],
    sol: `Sn²⁺ has ${z} − 2 = ${e2} electrons (the 5p² electrons are lost, 5s² is kept); Sn⁴⁺ has ${z} − 4 = ${e4} (the 5s² pair is lost too) — option (@K).`,
    d: 2, c: 'application', t: [3],
  });
})(), () => 50 - 2 === 48 && 50 - 4 === 46 || 'sn');
add('tl-mcq', mcq({
  stem: 'Thallium (Group 13, outer arrangement 6s² 6p¹) forms mainly the Tl⁺ ion rather than Tl³⁺. Which statement about the Tl⁺ ion is correct?',
  right: 'It has lost only its 6p electron and keeps the 6s² inert pair',
  wrong: ['It has lost both 6s electrons and kept the 6p electron', 'It has lost all three outer electrons', 'It has gained one electron into the 6p subshell'],
  sol: 'Tl⁺ forms by loss of the single 6p¹ electron; the 6s² pair is held back by the inert pair effect, so Tl⁺ is more stable than Tl³⁺ — option (@K).',
  d: 3, c: 'analysis', t: [3],
}));
add('unstable-core-mcq', mcq({
  stem: 'Variable electrovalency of a metal such as iron (Fe²⁺ and Fe³⁺) is linked to an "unstable core". This phrase means that, after the outer electrons are removed:',
  right: 'the remaining inner shell, with an incomplete d subshell, is not a stable noble gas core and can lose further electrons',
  wrong: ['the remaining core is a noble gas arrangement that will not react further', 'the outer s electrons are held strongly and cannot be removed', 'the nucleus becomes unstable and decays'],
  sol: 'Fe²⁺ has 3d⁶, not a noble gas core, so one more electron can be lost to give the half-filled Fe³⁺ — option (@K).',
  d: 3, c: 'understanding', t: [3],
}));
add('electrons-num', (() => {
  const z = 82;
  return num({
    stem: `A battery-recycling plant handles lead(IV) oxide, which contains the Pb⁴⁺ ion. How many electrons are present in one Pb⁴⁺ ion (atomic number of lead = ${z})?`,
    value: z - 4, tol: 0, unit: null,
    sol: `A neutral Pb atom has ${z} electrons; Pb⁴⁺ has lost four: ${z} − 4 = ${z - 4}.`,
    scheme: [['Subtracts the charge from Z', 0.5], ['78 electrons', 0.5]],
    marks: 1, d: 1, c: 'understanding', t: [3],
  });
})(), (q) => q.answer.value === 78 || 'pb4+');
add('lead-tf', tf({
  stem: 'In its compounds, lead is more stable in the +4 state than in the +2 state.',
  key: 'f',
  sol: 'False. Because of the inert pair effect the +2 state of lead is more stable; lead(IV) compounds such as PbO₂ are oxidising agents.',
  d: 2, c: 'understanding', t: [3],
}));
add('tl-ar', ar({
  a: 'Thallium shows the +1 state in most of its compounds.',
  r: 'The 6s² electrons of thallium are reluctant to take part in bonding.',
  key: 'a',
  sol: 'Both true. The inert 6s² pair stays behind and only the 6p¹ electron is lost, so R explains A — option (a).',
  d: 3, c: 'analysis', t: [3],
}));
add('inert-short2', short({
  marks: 2,
  stem: 'What is meant by the inert pair effect? Give one metal that shows it and the two oxidation states it commonly has.',
  model: 'In heavy p-block elements the two ns electrons are held strongly by the nucleus (poorly shielded by the d and f electrons) and do not take part in bonding, so the lower oxidation state, two less than the group valence, becomes more stable. Lead (6s² 6p²) shows +2 and +4, with +2 the more stable; thallium (+1 and +3) and tin (+2 and +4) are other examples.',
  sol: 'ns² pair not used; Pb +2 and +4.',
  scheme: [['Statement of the effect', 1], ['Example with its two oxidation states', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('fe-short2', short({
  marks: 2,
  stem: 'Write the electronic configurations of Fe²⁺ and Fe³⁺ (atomic number of Fe = 26) and say which ion is the more stable towards further change, giving the reason.',
  model: 'Fe: [Ar] 3d⁶ 4s². Fe²⁺: [Ar] 3d⁶. Fe³⁺: [Ar] 3d⁵. Fe³⁺ is the more stable, because its 3d subshell is exactly half-filled (five unpaired electrons), which gives extra stability.',
  sol: 'Fe²⁺ 3d⁶; Fe³⁺ 3d⁵, half-filled, more stable.',
  scheme: [['Both configurations', 1], ['Fe³⁺ more stable: half-filled 3d⁵', 1]],
  d: 3, c: 'application', t: [3],
}));
add('ion-short2', short({
  marks: 2,
  stem: 'Why is a cation always smaller than its parent atom, and an anion always larger? Answer for Mg and Mg²⁺ and for Cl and Cl⁻.',
  model: 'Mg²⁺ has lost the whole outer shell (n = 3), and its 12 protons now hold only 10 electrons more strongly, so the ion is smaller than the atom. In Cl⁻ one extra electron is added to the same shell, so the electron–electron repulsion rises while the nuclear charge (17+) is unchanged; the electron cloud expands and the ion is larger than the atom.',
  sol: 'Cation: fewer shells and more pull per electron; anion: more repulsion, same nuclear charge.',
  scheme: [['Cation smaller with the reason', 1], ['Anion larger with the reason', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('variable-short3', short({
  marks: 3,
  stem: 'Tin (outer arrangement 5s² 5p²) forms SnCl₂ and SnCl₄. Give the oxidation state of tin in each, explain how each ion arises and say which state is the more stable for tin, in view of the inert pair effect.',
  model: 'In SnCl₂ tin is +2 (Sn²⁺) and in SnCl₄ it is +4 (Sn⁴⁺). Sn²⁺ arises when the two 5p electrons are lost, keeping the 5s² pair; Sn⁴⁺ needs the 5s² pair to be lost as well. For tin the 5s² pair is only partly inert, so both states are known (SnCl₂ is a reducing agent, and Sn⁴⁺ compounds are common), but the +2 state becomes steadily more stable going down the group to lead.',
  sol: 'Sn +2 (5p lost) and +4 (5s also lost); inert pair favours +2 down the group.',
  scheme: [['Oxidation states +2 and +4 assigned', 1], ['Electrons lost in each ion', 1], ['Comment on inert pair and stability', 1]],
  d: 3, c: 'application', t: [3],
}));
add('core-short3', short({
  marks: 3,
  stem: 'Explain, with reference to the "unstable core", why iron forms Fe²⁺ and Fe³⁺ but sodium forms only Na⁺.',
  model: 'Sodium loses its single 3s electron and the ion is left with the stable noble gas core (2, 8); removing a further electron would break into this core and needs a very large energy, so only Na⁺ forms. Iron loses its two 4s electrons to give Fe²⁺ ([Ar] 3d⁶), but this core is not a noble gas arrangement: it has an incomplete 3d subshell, so a 3d electron can be lost relatively easily to give Fe³⁺ ([Ar] 3d⁵, half-filled and stable). The unstable core therefore leads to variable electrovalency.',
  sol: 'Na: stable neon core; Fe: incomplete d core, loses a d electron for half-filled d⁵.',
  scheme: [['Na⁺ keeps the stable core', 1], ['Fe²⁺ core is unstable, d electron lost', 1], ['Fe³⁺ half-filled and stable', 1]],
  d: 3, c: 'analysis', t: [3],
}));
add('lead-oxides-short3', short({
  marks: 3,
  stem: 'Red lead is Pb₃O₄, a mixed oxide that contains lead in two oxidation states. Using the inert pair effect, state the two oxidation states, say in which ratio they occur in the formula, and name the electrons lost in the higher state.',
  model: 'The oxidation states are +2 and +4: Pb₃O₄ is 2 PbO · PbO₂, so two Pb²⁺ and one Pb⁴⁺ balance four O²⁻ (2 × 2 + 4 = 8). In Pb²⁺ only the 6p² electrons are lost, the 6s² pair being inert. The Pb⁴⁺ ion has lost the 6s² pair as well as the 6p² electrons.',
  sol: 'Pb²⁺ : Pb⁴⁺ = 2 : 1; Pb⁴⁺ has also lost the 6s² pair.',
  scheme: [['Oxidation states +2 and +4', 1], ['Ratio 2 : 1 with charge balance', 1], ['6s² pair lost in Pb⁴⁺', 1]],
  d: 4, c: 'analysis', t: [3],
}));
add('electrovalency-long', long({
  stem: `(a) What is meant by variable electrovalency? Give two examples of elements that show it. [2]

(b) Explain the variable electrovalency of (i) iron and (ii) lead, writing the configurations of the ions concerned. [3]`,
  model: `(a) Variable electrovalency is the ability of an element to form more than one stable cation, that is, to show more than one electrovalency in its compounds. Examples are iron (Fe²⁺ and Fe³⁺) and lead (Pb²⁺ and Pb⁴⁺).

(b) (i) Iron is [Ar] 3d⁶ 4s². It loses the two 4s electrons to give Fe²⁺ ([Ar] 3d⁶); this core is not a stable noble gas core (unstable core), and a 3d electron is lost to give Fe³⁺ ([Ar] 3d⁵), which is half-filled and stable. (ii) Lead is [Xe] 4f¹⁴ 5d¹⁰ 6s² 6p². Loss of the two 6p electrons gives Pb²⁺ (6s²); the 6s² pair is held tightly (inert pair effect), so Pb²⁺ is stable, but if the pair is lost too, Pb⁴⁺ is formed.`,
  sol: 'Definition with two examples; Fe from the unstable core; Pb from the inert pair.',
  scheme: [['(a) Definition', 1], ['(a) Two examples', 1], ['(b)(i) Iron: configurations and unstable core', 1.5], ['(b)(ii) Lead: configurations and inert pair', 1.5]],
  d: 3, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 lattice enthalpy, Born-Haber cycle, characteristics
add('latt-def-mcq', mcq({
  stem: 'The lattice enthalpy of a crystalline ionic compound such as sodium chloride is the enthalpy change when:',
  right: 'one mole of the solid is formed from its gaseous ions, a process that releases energy',
  wrong: ['one mole of the solid is formed from its elements in their standard states', 'one mole of the solid dissolves in a large volume of water', 'one mole of the solid is formed from its gaseous atoms'],
  sol: r`Lattice enthalpy: $\ce{Na+(g) + Cl-(g) -> NaCl(s)}$, one mole of solid from gaseous ions, with a negative sign for the formation convention — option (@K).`,
  d: 1, c: 'recall', t: [4],
}));
add('latt-trend-mcq', (() => {
  const ks = ['NaCl', 'KCl', 'MgO', 'CaO'];
  const v = ks.map((k) => LATT[k]);
  return mcq({
    stem: `A materials student compares the lattice enthalpies of NaCl, KCl, MgO and CaO (formation from gaseous ions; values in kJ mol⁻¹: ${ks.map((k, i) => `${k} ${mn(v[i])}`).join(', ')}). The largest magnitude belongs to MgO because:`,
    right: 'both ions carry a double charge and the ions are small, so the attraction is strongest',
    wrong: ['both ions carry a single charge and the ions are large', 'it has the largest ionic radii of the four', 'it contains the smallest number of ions in the lattice'],
    sol: `MgO (${mn(LATT.MgO)}) has Mg²⁺ and O²⁻, ions of high charge and small radius, so the electrostatic attraction (and the energy released on forming the lattice) is the greatest — option (@K).`,
    d: 3, c: 'analysis', t: [4],
  });
})(), () => Math.min(...['NaCl', 'KCl', 'MgO', 'CaO'].map((k) => LATT[k])) === LATT.MgO || 'latt');
add('latt-order-mcq', (() => {
  const x = ['F-', 'Cl-', 'Br-', 'I-'];
  const rr = x.map((k) => RAD[k]);
  return mcq({
    stem: `The sodium halides NaF, NaCl, NaBr and NaI contain the anions F⁻, Cl⁻, Br⁻ and I⁻ with radii ${rr.join(', ')} pm. The order of the magnitude of their lattice enthalpies is:`,
    right: 'NaF > NaCl > NaBr > NaI',
    wrong: ['NaI > NaBr > NaCl > NaF', 'NaCl > NaF > NaI > NaBr', 'all four are equal, since the cation is the same'],
    sol: 'The same cation, but the anions get larger from F⁻ to I⁻, so the distance between ion centres grows and the attraction falls: NaF > NaCl > NaBr > NaI (−923, −788, −752, −700 kJ mol⁻¹) — option (@K).',
    d: 3, c: 'application', t: [4],
  });
})(), () => rrOrder() || 'order');
function rrOrder() {
  return LATT.NaF < LATT.NaCl && LATT.NaCl < LATT.NaBr && LATT.NaBr < LATT.NaI;
}
add('bh-step-mcq', mcq({
  stem: 'In the Born–Haber cycle for sodium chloride, which of the following steps is exothermic?',
  right: r`$\ce{Cl(g) + e- -> Cl-(g)}$, the electron gain by chlorine`,
  wrong: [r`$\ce{Na(s) -> Na(g)}$, the sublimation of sodium`, r`$\ce{Na(g) -> Na+(g) + e-}$, the ionisation of sodium`, r`$\ce{Cl(g) -> Cl+(g) + e-}$, the ionisation of chlorine`],
  sol: 'Sublimation and ionisation absorb energy; the electron gain by chlorine (−349 kJ mol⁻¹) releases it (besides the lattice formation) — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('prop-mcq', mcq({
  stem: 'A technician tests four white crystalline solids. Which observation is NOT expected for a typical ionic compound?',
  right: 'low melting point and a soft, waxy texture',
  wrong: ['high melting point and hardness', 'brittleness when struck with a hammer', 'good electrical conduction when molten'],
  sol: 'Strong electrostatic forces give ionic solids high melting points, hardness and brittleness, and the melt conducts. A low melting point and waxy softness suggest weak forces, so it is not typical — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('conduct-mcq', mcq({
  stem: 'A white solid does not conduct electricity when dry, but conducts when melted and when dissolved in water. The solid is most likely:',
  right: 'an ionic compound, whose ions are free to move in the melt and in solution',
  wrong: ['a metal, whose delocalised electrons are free only in the melt', 'a covalent network solid, whose atoms become free in water', 'a non-polar molecular solid, whose molecules ionise in the melt'],
  sol: 'In the solid, ions are fixed in the lattice. In the melt and in solution they move, carrying current — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('brittle-mcq', mcq({
  stem: 'A crystal of sodium chloride shatters when struck sharply with a hammer. The best explanation is that:',
  right: 'a shift of one layer brings ions of like charge face to face, and their repulsion splits the crystal',
  wrong: ['the ions are held by very weak forces and slide apart easily', 'the crystal contains free electrons that heat up on impact', 'the ions are attracted more strongly when the layers shift'],
  sol: 'Displacing a layer by one ion width puts Na⁺ opposite Na⁺ and Cl⁻ opposite Cl⁻; repulsion splits the crystal along that plane, so ionic solids are brittle — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('solubility-tf', tf({
  stem: 'Most ionic compounds dissolve in water because the polar water molecules surround the ions and the energy released on hydration helps to overcome the lattice enthalpy.',
  key: 't',
  sol: 'True. Hydration of the ions releases energy that compensates for the energy needed to separate them from the lattice; non-polar solvents cannot do this.',
  d: 2, c: 'understanding', t: [4],
}));
add('mp-fill', fill({
  stem: 'Ionic solids have high melting points because of the strong ___ forces between the oppositely charged ions in the lattice.',
  acc: [['electrostatic', 'electrostatic attraction', 'coulombic', 'Coulomb']],
  sol: 'Strong electrostatic (coulombic) attraction between the ions must be overcome to melt the solid.',
  d: 1, c: 'recall', t: [4],
}));
add('bh-ar', ar({
  a: 'Sodium chloride forms readily from sodium and chlorine even though the formation of gaseous Na⁺ and Cl⁻ ions from atoms absorbs energy.',
  r: 'The energy released when the gaseous ions pack into the lattice is larger than the energy absorbed in making them.',
  key: 'a',
  sol: 'Both are true: Na(g) + Cl(g) → Na⁺(g) + Cl⁻(g) needs +147 kJ mol⁻¹, but the lattice enthalpy, −788 kJ mol⁻¹, outweighs it. R explains A — option (a).',
  d: 3, c: 'analysis', t: [4],
}));
add('prop-match', match({
  stem: 'Match each property of sodium chloride with the feature of its structure that accounts for it.',
  pairs: [['High melting point', 'strong electrostatic attraction between ions'], ['Brittleness', 'like ions meet when layers slide'], ['Conducts when molten', 'ions become free to move'], ['Does not conduct as a solid', 'ions fixed in the lattice']],
  order: [3, 0, 1, 2],
  sol: 'High melting point → s; brittleness → p; conducts when molten → q; no conduction as a solid → r.',
  d: 2, c: 'understanding', t: [4],
}));
// ---- Born-Haber numericals
add('kcl-lattice-num', (() => {
  const d = BH.KCl;
  const s = bhSteps(d);
  const U = bhLattice(d);
  return num({
    stem: `A thermochemistry student builds the Born–Haber cycle for potassium chloride. The data (kJ mol⁻¹) are: enthalpy of formation of KCl(s) ${mn(d.hf)}, sublimation of K ${d.sub}, dissociation of Cl₂ ${d.bde} (per mole of Cl₂), first ionisation enthalpy of K ${d.ie[0]}, electron gain enthalpy of Cl ${mn(d.ege)}. Calculate the lattice enthalpy of KCl in kJ mol⁻¹.`,
    value: U, tol: 1, unit: 'kJ mol⁻¹',
    sol: r`$\Delta H_\text{f} = \Delta H_\text{sub} + \tfrac12 D(\ce{Cl-Cl}) + \text{IE} + \text{EGE} + U$, so $U = ${d.hf} - (${s.sub} + ${s.diss} + ${s.ie} - ${-s.ege}) = ${d.hf} - ${bhSum(d)} = ${U}$ kJ mol⁻¹.`,
    scheme: [['Uses ½ of the Cl–Cl dissociation enthalpy: 121', 0.5], ['Sum of the four steps: +280', 0.5], ['U = −717 kJ mol⁻¹', 1]],
    marks: 2, d: 3, c: 'application', t: [4],
  });
})(), (q) => q.answer.value === -437 - (89 + 121 + 419 - 349) && q.answer.value === -717 || 'kcl-lattice');
add('naf-hf-num', (() => {
  const d = BH.NaF;
  const s = bhSteps(d);
  const hf = bhHf(d, d.lattice);
  return num({
    stem: `A fluoride-toothpaste researcher needs the enthalpy of formation of sodium fluoride. Data (kJ mol⁻¹): sublimation of Na ${d.sub}, dissociation of F₂ ${d.bde} (per mole of F₂), ionisation enthalpy of Na ${d.ie[0]}, electron gain enthalpy of F ${mn(d.ege)}, lattice enthalpy of NaF ${mn(d.lattice)}. Calculate the enthalpy of formation of NaF(s).`,
    value: hf, tol: 1, unit: 'kJ mol⁻¹',
    sol: r`$\Delta H_\text{f} = ${s.sub} + ${s.diss} + ${s.ie} + (${s.ege}) + (${d.lattice}) = ${hf}$ kJ mol⁻¹ (the half of ${d.bde} is ${s.diss}).`,
    scheme: [['½ × 158 = 79 for the dissociation step', 0.5], ['Adds all five terms with signs', 0.5], ['−568 kJ mol⁻¹', 1]],
    marks: 2, d: 3, c: 'application', t: [4],
  });
})(), (q) => q.answer.value === 108 + 79 + 496 - 328 - 923 && q.answer.value === -568 || 'naf-hf');
add('ege-num', (() => {
  const d = BH.NaBr;
  const s = bhSteps(d);
  const E = d.hf - d.lattice - (s.sub + s.diss + s.ie);
  return num({
    stem: `The Born–Haber cycle for sodium bromide has the data (kJ mol⁻¹): enthalpy of formation ${mn(d.hf)}, lattice enthalpy ${mn(d.lattice)}, sublimation of Na ${d.sub}, enthalpy of atomisation of ½Br₂(l) to Br(g) ${s.diss}, ionisation enthalpy of Na ${d.ie[0]}. Calculate the electron gain enthalpy of bromine.`,
    value: E, tol: 1, unit: 'kJ mol⁻¹',
    sol: r`$\text{EGE} = \Delta H_\text{f} - U - (\Delta H_\text{sub} + \Delta H_\text{atom} + \text{IE}) = ${d.hf} - (${d.lattice}) - (${s.sub} + ${s.diss} + ${s.ie}) = ${d.hf - d.lattice} - ${s.sub + s.diss + s.ie} = ${E}$ kJ mol⁻¹.`,
    scheme: [['Rearranged cycle for EGE', 1], ['−325 kJ mol⁻¹', 1]],
    marks: 2, d: 4, c: 'analysis', t: [4],
  });
})(), (q) => q.answer.value === -361 + 752 - (108 + 112 + 496) && q.answer.value === -325 || 'ege');
add('bh-def-short2', short({
  marks: 2,
  stem: 'Define the lattice enthalpy of an ionic solid. On which law is the Born–Haber cycle based?',
  model: r`The lattice enthalpy is the enthalpy change when one mole of the crystalline solid is formed from its constituent gaseous ions, e.g. $\ce{Na+(g) + Cl-(g) -> NaCl(s)}$, $\Delta H = -788$ kJ mol⁻¹ (it is the energy released). The Born–Haber cycle is based on Hess's law: the enthalpy of formation is the same whether the compound is made directly from its elements or by the stepwise route through atoms, ions and the lattice.`,
  sol: 'Gaseous ions to one mole of solid; Hess’s law.',
  scheme: [['Definition of lattice enthalpy', 1], ['Hess’s law', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('char-short2', short({
  marks: 2,
  stem: 'Give two characteristics of ionic compounds and relate each to the structure of the solid.',
  model: 'Ionic compounds have high melting and boiling points, since a lot of energy is needed to overcome the strong electrostatic attractions between the oppositely charged ions in the lattice. They conduct electricity when molten or dissolved but not as solids, since the ions are free to move only in the melt or solution, and are fixed in the lattice in the solid.',
  sol: 'High melting point from strong attractions; conduction only when ions are free.',
  scheme: [['First property with the structural reason', 1], ['Second property with the structural reason', 1]],
  d: 1, c: 'understanding', t: [4],
}));
add('mp-short2', short({
  marks: 2,
  stem: 'Magnesium oxide melts at about 2850 °C, but sodium chloride melts at about 800 °C. Explain the difference in terms of the charges and sizes of the ions.',
  model: 'Both have the same type of lattice, but MgO contains Mg²⁺ and O²⁻, ions with double charges, and the ions are smaller (72 and 140 pm) than the Na⁺ and Cl⁻ ions (102 and 181 pm). The attraction between ions, proportional to the product of the charges and falling with distance, is therefore much stronger in MgO (lattice enthalpy about −3791 kJ mol⁻¹ against −788 kJ mol⁻¹), so far more energy is needed to melt it.',
  sol: 'Higher charges and smaller ions: much larger lattice enthalpy for MgO.',
  scheme: [['Charges 2+/2− against 1+/1−; smaller radii', 1], ['Stronger attraction, larger lattice enthalpy, higher melting point', 1]],
  d: 3, c: 'analysis', t: [4],
}));
add('bh-steps-short3', short({
  marks: 3,
  stem: 'List the five steps of the Born–Haber cycle for the formation of NaCl(s) from Na(s) and Cl₂(g), writing an equation for each step and naming the enthalpy change.',
  model: r`(1) Sublimation of sodium: $\ce{Na(s) -> Na(g)}$ (sublimation enthalpy). (2) Dissociation of chlorine: $\ce{1/2 Cl2(g) -> Cl(g)}$ (half the bond dissociation enthalpy). (3) Ionisation of sodium: $\ce{Na(g) -> Na+(g) + e-}$ (ionisation enthalpy). (4) Electron gain by chlorine: $\ce{Cl(g) + e- -> Cl-(g)}$ (electron gain enthalpy). (5) Formation of the lattice: $\ce{Na+(g) + Cl-(g) -> NaCl(s)}$ (lattice enthalpy). By Hess's law the sum of steps 1–5 equals the enthalpy of formation of NaCl(s).`,
  sol: 'Five steps with equations; sum = ΔHf.',
  scheme: [['Steps 1 and 2 with equations', 1], ['Steps 3 and 4 with equations', 1], ['Step 5 and the Hess’s law statement', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('mgcl2-short3', (() => {
  const d = BH.MgCl2;
  const s = bhSteps(d);
  const U = bhLattice(d);
  return short({
    marks: 3,
    stem: `In a Born–Haber cycle for magnesium chloride the data (kJ mol⁻¹) are: ΔHf of MgCl₂(s) ${mn(d.hf)}; sublimation of Mg ${d.sub}; dissociation of Cl₂ ${d.bde}; first and second ionisation enthalpies of Mg ${d.ie[0]} and ${d.ie[1]}; electron gain enthalpy of Cl ${mn(d.ege)}. Calculate the lattice enthalpy of MgCl₂.`,
    model: r`Atoms of Cl needed: 2, from 1 mol of Cl₂: dissociation $= ${s.diss}$. Electron gain: $2 \times (${d.ege}) = ${s.ege}$. Sum of steps $= ${s.sub} + ${s.diss} + ${d.ie[0]} + ${d.ie[1]} + (${s.ege}) = ${bhSum(d)}$ kJ mol⁻¹. $U = \Delta H_\text{f} - ${bhSum(d)} = ${d.hf} - ${bhSum(d)} = ${U}$ kJ mol⁻¹.`,
    sol: r`Sum of steps $= ${bhSum(d)}$ kJ mol⁻¹; $U = ${U}$ kJ mol⁻¹.`,
    scheme: [['Two Cl atoms: 242 for dissociation and 2 × (−349) for electron gain', 1], ['Sum of steps = +1881 kJ mol⁻¹', 1], ['U = −2522 kJ mol⁻¹', 1]],
    d: 3, c: 'application', t: [4],
  });
})(), () => bhLattice(BH.MgCl2) === -641 - (148 + 242 + 738 + 1451 - 698) && bhLattice(BH.MgCl2) === -2522 || 'mgcl2');
add('latt-trend-short3', (() => {
  const a = LATT.LiF;
  const b = LATT.NaF;
  const c = LATT.KCl;
  return short({
    marks: 3,
    stem: `The lattice enthalpies (kJ mol⁻¹) of LiF, NaF and KCl are ${mn(a)}, ${mn(b)} and ${mn(c)}. Arrange them in order of magnitude and explain the order using the sizes of the ions (Li⁺ ${RAD['Li+']}, Na⁺ ${RAD['Na+']}, K⁺ ${RAD['K+']}, F⁻ ${RAD['F-']}, Cl⁻ ${RAD['Cl-']} pm).`,
    model: `The order of magnitude is LiF (${mn(a)}) > NaF (${mn(b)}) > KCl (${mn(c)}). All three have ions of single charge, so the difference depends on the distance between the ion centres. The distances are Li⁺ + F⁻ = ${RAD['Li+'] + RAD['F-']} pm, Na⁺ + F⁻ = ${RAD['Na+'] + RAD['F-']} pm, K⁺ + Cl⁻ = ${RAD['K+'] + RAD['Cl-']} pm. The shorter the distance, the stronger the attraction and the larger the lattice enthalpy.`,
    sol: `LiF > NaF > KCl; ion-centre distances ${RAD['Li+'] + RAD['F-']}, ${RAD['Na+'] + RAD['F-']}, ${RAD['K+'] + RAD['Cl-']} pm.`,
    scheme: [['Order of magnitude', 1], ['Sum of radii for each compound', 1], ['Shorter distance, stronger attraction', 1]],
    d: 3, c: 'analysis', t: [4],
  });
})(), () => LATT.LiF < LATT.NaF && LATT.NaF < LATT.KCl && RAD['Li+'] + RAD['F-'] < RAD['Na+'] + RAD['F-'] && RAD['Na+'] + RAD['F-'] < RAD['K+'] + RAD['Cl-'] || 'latt-trend3');
add('char-short3', short({
  marks: 3,
  stem: 'Sodium chloride is hard and brittle, has a high melting point and conducts electricity only in the molten or dissolved state. Explain each observation.',
  model: 'High melting point and hardness: the oppositely charged ions are held in a regular lattice by strong electrostatic forces, which need a large amount of energy to overcome. Brittleness: a blow shifts a layer so that ions of like charge come face to face and repel, splitting the crystal. Conduction: in the solid the ions are fixed and cannot carry current; when melted or dissolved the ions are free to move, so the liquid conducts.',
  sol: 'Strong lattice forces; like-ion repulsion on slipping; free ions in melt or solution.',
  scheme: [['High melting point and hardness explained', 1], ['Brittleness explained', 1], ['Conduction explained', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('kcl-long', (() => {
  const d = BH.KCl;
  const s = bhSteps(d);
  const U = bhLattice(d);
  return long({
    stem: `(a) Draw, or describe in steps with equations, the Born–Haber cycle for the formation of potassium chloride from solid potassium and chlorine gas. [3]

(b) Use the data (kJ mol⁻¹): ΔHf of KCl(s) ${mn(d.hf)}, sublimation of K ${d.sub}, ½ × Cl–Cl dissociation ${s.diss}, ionisation of K ${d.ie[0]}, electron gain of Cl ${mn(d.ege)}, to calculate the lattice enthalpy of KCl. [2]`,
    model: r`(a) $\ce{K(s) -> K(g)}$ (sublimation); $\ce{1/2 Cl2(g) -> Cl(g)}$ (dissociation); $\ce{K(g) -> K+(g) + e-}$ (ionisation); $\ce{Cl(g) + e- -> Cl-(g)}$ (electron gain); $\ce{K+(g) + Cl-(g) -> KCl(s)}$ (lattice formation). By Hess's law the sum of these five enthalpy changes equals the enthalpy of formation of KCl(s) from K(s) and ½Cl₂(g).

(b) $${d.hf} = ${s.sub} + ${s.diss} + ${s.ie} + (${s.ege}) + U$, so $U = ${d.hf} - ${bhSum(d)} = ${U}$ kJ mol⁻¹.`,
    sol: `Five steps (Hess's law); U = ${U} kJ mol⁻¹.`,
    scheme: [['(a) Atomisation steps with equations', 1], ['(a) Ionisation and electron gain with equations', 1], ['(a) Lattice formation and Hess’s law', 1], ['(b) Sum of the four steps +280', 1], ['(b) U = −717 kJ mol⁻¹', 1]],
    d: 3, c: 'application', t: [4],
  });
})(), () => bhLattice(BH.KCl) === -717 || 'kcl-long');
add('char-long', long({
  stem: `(a) State three characteristics of electrovalent (ionic) compounds and relate each to the structure of the crystal. [3]

(b) A student finds that a white solid melts at 770 °C, is hard and brittle, and its aqueous solution conducts, but the dry solid does not. Is it ionic? Say what the data tell about the ions in the solid and in solution. [2]`,
  model: `(a) (i) High melting and boiling points: strong electrostatic attraction between the ions in the lattice must be overcome. (ii) Brittle and hard: the lattice is rigid; a shift of a layer brings like charges together and the crystal splits. (iii) Conduct electricity only when molten or dissolved: the ions are fixed in the solid and free to move in the melt or in solution. (Also soluble in polar solvents such as water, insoluble in non-polar solvents.)

(b) Yes, the evidence points to an ionic solid. The ions are held in fixed positions in the lattice (no conduction, high melting point and brittleness), but when dissolved in water they are surrounded by water molecules and move freely, so the solution conducts.`,
  sol: 'Three properties with structural reasons; the data indicate an ionic solid.',
  scheme: [['(a) Melting point with reason', 1], ['(a) Brittleness or hardness with reason', 1], ['(a) Conduction with reason', 1], ['(b) Identified as ionic', 1], ['(b) Fixed ions in the solid, free ions in solution', 1]],
  d: 2, c: 'analysis', t: [4],
}));
add('energy-long', (() => {
  const d = BH.NaCl;
  const s = bhSteps(d);
  return long({
    stem: `(a) The data (kJ mol⁻¹) for sodium chloride are: sublimation of Na ${d.sub}, ½ × Cl–Cl dissociation ${s.diss}, ionisation of Na ${d.ie[0]}, electron gain of Cl ${mn(d.ege)}, lattice enthalpy ${mn(d.lattice)}. Calculate the standard enthalpy of formation of NaCl(s). [3]

(b) Which of the steps in (a) is the largest in magnitude, and why must it be so large for the compound to be stable? [2]`,
    model: `(a) ΔHf = ${s.sub} + ${s.diss} + ${s.ie} + (${mn(s.ege)}) + (${mn(d.lattice)}) = ${s.sub + s.diss + s.ie + s.ege} + (${mn(d.lattice)}) = ${mn(bhHf(d, d.lattice))} kJ mol⁻¹.

(b) The lattice enthalpy (${mn(d.lattice)} kJ mol⁻¹) is the largest in magnitude. The steps that make the ions from the atoms absorb ${bhSum(d)} kJ mol⁻¹, so the energy released when the ions form the lattice must exceed this for the compound to be more stable than the elements.`,
    sol: `ΔHf = ${mn(bhHf(d, d.lattice))} kJ mol⁻¹; the lattice enthalpy is largest and pays for the endothermic steps.`,
    scheme: [['(a) Sum of the four steps +376', 1], ['(a) Adds the lattice enthalpy', 1], ['(a) −412 kJ mol⁻¹', 1], ['(b) Lattice enthalpy is the largest step', 1], ['(b) Must outweigh the +376 kJ mol⁻¹ absorbed', 1]],
    d: 3, c: 'application', t: [4],
  });
})(), () => bhHf(BH.NaCl, BH.NaCl.lattice) === -412 || 'energy-long');
