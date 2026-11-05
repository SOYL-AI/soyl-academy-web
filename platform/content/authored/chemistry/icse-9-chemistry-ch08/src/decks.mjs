// ICSE 9 Chemistry ch08 Chemical Bonding — Part 1 (t01–t02: electrovalent bond, NaCl, MgCl2, CaO),
// Part 2 (t03–t05: covalent bond, orbit structures of molecules, radicals).
import { sl, deck, table, flow, chem, svgV, r } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import { NACL, MGCL2, CAO, COV_SINGLE, COV_MULTI, COV_WATER, COV_METHANE, RADICALS } from './svgs.mjs';
import { MA, compound, NACL as NACL_C, MGCL2 as MG_C, CAO as CAO_C, NA2O, KCL, MGO } from './calc.mjs';

export const V = {
  nacl: svgV(NACL, 'Orbit structure diagram for the formation of sodium chloride by transfer of one electron'),
  mgcl2: svgV(MGCL2, 'Orbit structure diagram for the formation of magnesium chloride'),
  cao: svgV(CAO, 'Orbit structure diagram for the formation of calcium oxide'),
  single: svgV(COV_SINGLE, 'Orbit structures of hydrogen, chlorine and hydrogen chloride molecules'),
  multi: svgV(COV_MULTI, 'Orbit structures of oxygen with a double bond and nitrogen with a triple bond'),
  water: svgV(COV_WATER, 'Orbit structures of water and ammonia molecules'),
  methane: svgV(COV_METHANE, 'Orbit structures of methane and carbon tetrachloride molecules'),
  radicals: svgV(RADICALS, 'Formation of hydrogen and chlorine radicals when a covalent bond breaks'),
};
const sup = (c) => (c > 0 ? `${c > 1 ? c : ''}+` : `${c < -1 ? -c : ''}−`);
const ratio = (c) => `${c.nMetal} : ${c.nNon}`;

export const deck1 = deck({
  part: 1,
  title: 'Chemical Bonding — Part 1: The electrovalent bond',
  goals: [
    'Explain the formation of cations and anions by loss and gain of electrons',
    'Define the electrovalent bond and draw orbit structures for sodium chloride, magnesium chloride and calcium oxide',
  ],
  slides: [
    sl('title', 'Giving and taking', {
      b: 'Part 1 — atoms bond to reach a **stable outer shell**. In an **electrovalent bond** one atom gives electrons and another takes them.',
      v: flow('LR', [['a', 'Metal atom loses electrons'], ['b', 'Positive ion'], ['c', 'Non-metal atom gains electrons'], ['d', 'Negative ion'], ['e', 'Attraction: ionic compound']], [['a', 'b'], ['c', 'd'], ['b', 'e'], ['d', 'e']], 'Flow from a metal atom losing electrons and a non-metal atom gaining electrons to an ionic compound'),
      n: 'Most atoms are not stable on their own. They bond to complete the outer shell. In this part, one kind of atom gives away electrons and another takes them, and the ions formed attract each other.',
    }),
    sl('concept', 'Why atoms bond', {
      b: 'An atom with a full outer shell, a **duplet** or an **octet**, is stable. Other atoms **lose, gain or share** electrons to get one.',
      v: table(['Atom', 'Configuration', 'Outer electrons', 'Easier route to a full shell'], [['Sodium', '2, 8, 1', '1', 'Lose 1 electron'], ['Magnesium', '2, 8, 2', '2', 'Lose 2 electrons'], ['Oxygen', '2, 6', '6', 'Gain 2 electrons'], ['Chlorine', '2, 8, 7', '7', 'Gain 1 electron']], 'Table of four atoms and the easier way each reaches a full outer shell'),
      n: 'Compare each atom with its nearest full shell. Sodium has one outer electron, so losing it is easy. Chlorine has seven, so gaining one is easy. Metals tend to lose electrons and non-metals tend to gain them.',
    }),
    sl('concept', 'Cations and anions', {
      b: 'An atom that **loses** electrons becomes a positive ion, a **cation**. An atom that **gains** electrons becomes a negative ion, an **anion**.',
      v: table(['Atom', 'Change', 'Ion', 'Ion configuration'], [['Sodium', 'Loses 1 electron', 'Na⁺', '2, 8'], ['Magnesium', 'Loses 2 electrons', 'Mg²⁺', '2, 8'], ['Chlorine', 'Gains 1 electron', 'Cl⁻', '2, 8, 8'], ['Oxygen', 'Gains 2 electrons', 'O²⁻', '2, 8']], 'Table of four atoms, the electrons lost or gained, the ion formed and its configuration'),
      n: 'Losing electrons leaves more protons than electrons, so the ion is positive. Gaining electrons leaves more electrons than protons, so the ion is negative. Notice that each ion now has a full outer shell.',
    }),
    sl('example', 'Worked example 1: potassium and fluorine ions', {
      b: r`**Problem.** Show how a potassium atom (atomic number 19) and a fluorine atom (atomic number 9) form ions.

**Step 1.** Potassium: **2, 8, 8, 1**. It loses its 1 outer electron: $\ce{K -> K^+ + e-}$, ion **2, 8, 8**.

**Step 2.** Fluorine: **2, 7**. It gains 1 electron: $\ce{F + e- -> F-}$, ion **2, 8**.`,
      v: table(['Atom', 'Before', 'After', 'Ion'], [['Potassium', '2, 8, 8, 1', '2, 8, 8', 'K⁺'], ['Fluorine', '2, 7', '2, 8', 'F⁻']], 'Table showing the electron arrangement of potassium and fluorine before and after ion formation'),
      n: 'Potassium has one electron in its outer fourth shell. Losing it leaves the stable arrangement two, eight, eight. Fluorine has seven outer electrons and gains one to complete its octet. So potassium makes a positive ion and fluorine a negative ion.',
    }),
    sl('check', 'Quick check: ion charge', {
      b: 'How many electrons does oxygen need?',
      v: table(['Atom', 'Configuration'], [['Oxygen', '2, 6']], 'Configuration of an oxygen atom'),
      chk: 'chk-anion',
      n: 'An oxygen atom has the configuration two, six. What ion does it form?',
    }),
    sl('concept', 'The electrovalent bond', {
      b: 'The **electrovalent (ionic) bond** is formed by the **complete transfer** of electrons from one atom to another. The oppositely charged ions are held together by **electrostatic attraction**.',
      v: flow('LR', [['a', 'Atom A gives electrons'], ['b', 'Cation A⁺'], ['c', 'Attraction between opposite charges'], ['d', 'Anion B⁻'], ['e', 'Atom B takes electrons']], [['a', 'b'], ['b', 'c'], ['d', 'c'], ['e', 'd']], 'Flow showing atoms becoming ions that attract each other in an electrovalent bond'),
      n: 'In an electrovalent bond electrons are transferred completely, not shared. The metal atom becomes a positive ion and the non-metal atom a negative ion. The strong attraction between these opposite charges is the bond.',
    }),
    sl('diagram', 'Sodium chloride', {
      b: 'A sodium atom (2, 8, 1) gives **one** electron to a chlorine atom (2, 8, 7). Both ions have a full outer shell.',
      v: V.nacl,
      n: 'Look at the orbit structure. The crosses are electrons of sodium and the dots are electrons of chlorine. Sodium gives its single outer electron to chlorine. The sodium ion has two, eight and the chloride ion has two, eight, eight. They attract each other to form sodium chloride.',
    }),
    sl('example', 'Worked example 2: sodium oxide', {
      b: r`**Problem.** Sodium (2, 8, 1) reacts with oxygen (2, 6). Find the ions and the formula.

**Step 1.** Oxygen needs **2** electrons. Each sodium atom gives only **1**, so **2** sodium atoms are needed.

**Step 2.** Ions: 2 $\ce{Na^+}$ and 1 $\ce{O^2-}$; charges: $2 \times (+1) + (-2) = 0$.

**Step 3.** Formula **${NA2O.nMetal === 2 ? 'Na₂O' : ''}**.`,
      v: table(['Atom', 'Gives or takes', 'Ion', 'Atoms needed'], [['Sodium', 'Gives 1 each', 'Na⁺', `${NA2O.nMetal}`], ['Oxygen', 'Takes 2', 'O²⁻', `${NA2O.nNon}`]], 'Table showing the atoms needed to make sodium oxide'),
      n: 'Oxygen has to take two electrons, but each sodium atom can give only one. So two sodium atoms are needed for every oxygen atom. Two positive charges balance two negative charges, and the formula has two sodium for every oxygen.',
    }),
    sl('check', 'Quick check: sodium ion', {
      b: 'What happens to the outer shell?',
      v: table(['Atom', 'Configuration'], [['Sodium', '2, 8, 1']], 'Configuration of a sodium atom'),
      chk: 'chk-na',
      n: 'When a sodium atom changes into a sodium ion, what is the electron arrangement of the ion?',
    }),
    sl('diagram', 'Magnesium chloride', {
      b: 'A magnesium atom (2, 8, 2) has **two** electrons to give, but each chlorine atom takes only **one**, so **two** chlorine atoms are needed.',
      v: V.mgcl2,
      n: 'Magnesium has two outer electrons. One goes to each of two chlorine atoms. The magnesium ion carries two positive charges, and each chloride ion carries one negative charge. The formula is magnesium chloride, with one magnesium for every two chlorine.',
    }),
    sl('diagram', 'Calcium oxide', {
      b: 'A calcium atom (2, 8, 8, 2) gives **two** electrons to one oxygen atom (2, 6). The charges, 2+ and 2−, balance in the ratio **1 : 1**.',
      v: V.cao,
      n: 'Calcium gives both its outer electrons to oxygen. The calcium ion has two, eight, eight and carries two positive charges. The oxide ion has two, eight and carries two negative charges. One calcium ion balances one oxide ion.',
    }),
    sl('concept', 'The ratio of ions', {
      v: table(['Compound', 'Cation', 'Anion', 'Ratio of ions', 'Electrons moved per formula unit'], [['Sodium chloride', 'Na⁺', 'Cl⁻', ratio(NACL_C), `${NACL_C.electrons}`], ['Magnesium chloride', 'Mg²⁺', 'Cl⁻', ratio(MG_C), `${MG_C.electrons}`], ['Calcium oxide', 'Ca²⁺', 'O²⁻', ratio(CAO_C), `${CAO_C.electrons}`], ['Magnesium oxide', 'Mg²⁺', 'O²⁻', ratio(MGO), `${MGO.electrons}`], ['Potassium chloride', 'K⁺', 'Cl⁻', ratio(KCL), `${KCL.electrons}`]], 'Table of five electrovalent compounds with their ions and ratios'),
      n: 'The total positive charge must equal the total negative charge. So sodium chloride has a one to one ratio, and magnesium chloride has one magnesium to two chloride. Count the electrons given by the metal; they are the electrons taken by the non-metal.',
    }),
    sl('check', 'Quick check: magnesium chloride', {
      b: 'Count the electrons given and taken.',
      v: table(['Compound', 'Question'], [['Magnesium chloride', 'Chlorine atoms per magnesium atom?']], 'The number of chlorine atoms needed for one magnesium atom'),
      chk: 'chk-mgcl2',
      n: 'In magnesium chloride, how many chlorine atoms receive electrons from one magnesium atom?',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Metals lose electrons to form cations; non-metals gain electrons to form anions.',
        'An electrovalent bond is formed by transfer of electrons; the ions attract each other.',
        'Sodium chloride: 1 electron moves. Magnesium chloride: 2 electrons move to two chlorine atoms. Calcium oxide: 2 electrons move.',
        'The total positive charge equals the total negative charge in the formula.',
      ],
      v: table(['Compound', 'Ions'], [['Sodium chloride', 'Na⁺ and Cl⁻'], ['Magnesium chloride', 'Mg²⁺ and two Cl⁻'], ['Calcium oxide', 'Ca²⁺ and O²⁻']], 'Summary table of the ions in three electrovalent compounds'),
      n: 'To sum up Part 1. Metals give electrons and become positive ions. Non-metals take electrons and become negative ions. The attraction between them is the electrovalent bond, and the charges must balance in the formula.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Draw the ions with brackets and write the charge outside the top right.',
        'Show the electrons that were transferred in a different colour or symbol.',
        'Write the configuration of both atoms and both ions.',
        'State that the bond is formed by transfer of electrons.',
      ],
      v: table(['Slip', 'Fix'], [['Showing magnesium giving 2 electrons to one chlorine atom', 'Each chlorine takes one: two chlorine atoms'], ['Leaving out the charge on the ion', 'Write 2+ or 1− outside the bracket'], ['Saying the electron is shared', 'In an ionic bond it is transferred']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Exam tips. Use brackets and charges for ions. Mark the transferred electrons clearly. Give the electron arrangement before and after. And say that electrons are transferred, not shared.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Chemical Bonding — Part 2: The covalent bond and radicals',
  goals: [
    'Explain covalent bonding as sharing of electron pairs to complete a duplet or an octet',
    'Draw orbit structures of the prescribed molecules showing shared pairs',
    'Explain how breaking a covalent bond forms radicals',
  ],
  slides: [
    sl('title', 'Sharing and splitting', {
      b: 'Part 2 — atoms of non-metals can **share** pairs of electrons. We then see what happens when a shared pair **breaks**.',
      v: flow('LR', [['a', 'Two atoms need electrons'], ['b', 'Share a pair'], ['c', 'Molecule'], ['d', 'Bond breaks'], ['e', 'Radicals']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow from atoms sharing a pair to a molecule and then radicals when the bond breaks'),
      n: 'Two non-metal atoms both need electrons, so neither can give any away. They solve this by sharing. Later we see what happens when the shared pair is broken.',
    }),
    sl('concept', 'The covalent bond', {
      b: 'A **covalent bond** is formed by the **sharing of a pair of electrons** between two atoms. Each atom counts the shared electrons towards its own duplet or octet.',
      v: table(['Atom', 'Outer electrons', 'Needs', 'Shares'], [['Hydrogen', `1`, '1 for a duplet', '1 pair'], ['Chlorine', '7', '1', '1 pair'], ['Oxygen', '6', '2', '2 pairs'], ['Nitrogen', '5', '3', '3 pairs'], ['Carbon', '4', '4', '4 pairs']], 'Table showing how many electrons each atom needs and how many pairs it shares'),
      n: 'Each atom shares as many electrons as it needs to complete its outer shell. Hydrogen needs one and shares one pair. Oxygen needs two, nitrogen three, and carbon four. The shared electrons count for both atoms.',
    }),
    sl('concept', 'Single, double and triple bonds', {
      v: table(['Bond', 'Shared pairs', 'Shared electrons', 'Example'], [['Single', '1', '2', 'Hydrogen H–H'], ['Double', '2', '4', 'Oxygen O=O'], ['Triple', '3', '6', 'Nitrogen N≡N']], 'Table of single, double and triple covalent bonds with the shared pairs and an example of each'),
      n: 'One shared pair makes a single bond, two shared pairs make a double bond and three make a triple bond. Hydrogen has a single bond, oxygen has a double bond, and nitrogen has a triple bond.',
    }),
    sl('diagram', 'Single bonds: hydrogen, chlorine and hydrogen chloride', {
      b: 'In each molecule one pair is shared. Chlorine keeps **three lone pairs**: seven outer electrons, one shared.',
      v: V.single,
      n: 'Hydrogen atoms share one pair, so each has a duplet. In chlorine, each atom shares one pair and keeps three lone pairs, so each has an octet. In hydrogen chloride, hydrogen gets its duplet and chlorine gets its octet.',
    }),
    sl('diagram', 'Double and triple bonds: oxygen and nitrogen', {
      b: 'Oxygen shares **two** pairs; each atom keeps **two** lone pairs. Nitrogen shares **three** pairs; each atom keeps **one** lone pair.',
      v: V.multi,
      n: 'Each oxygen atom has six outer electrons and shares two of them in two pairs, making a double bond. Each nitrogen atom has five outer electrons and shares three, making a triple bond. Both atoms end up with an octet.',
    }),
    sl('example', 'Worked example 1: the oxygen molecule', {
      b: r`**Problem.** Show how two oxygen atoms form an $\ce{O2}$ molecule.

**Step 1.** Each oxygen atom has **6** outer electrons (2, 6) and needs **2** more.

**Step 2.** Each atom contributes **2** electrons to the shared region: **${MA.O2.pairs}** shared pairs (${2 * MA.O2.pairs} electrons), a double bond.

**Step 3.** Each atom: 6 + 2 = **8**, an octet. Remaining electrons: ${MA.O2.lonePerAtom[0]} lone pairs on each atom.`,
      v: table(['Atom', 'Own outer electrons', 'Shared', 'Total round the atom', 'Lone pairs'], [['Oxygen 1', '6', '2', '8', `${MA.O2.lonePerAtom[0]}`], ['Oxygen 2', '6', '2', '8', `${MA.O2.lonePerAtom[1]}`]], 'Table showing the electrons round each atom in an oxygen molecule'),
      n: 'Each oxygen atom has six outer electrons and needs two more. The atoms share two pairs, which is four electrons, forming a double bond. Each atom now has eight electrons round it, with two lone pairs each.',
    }),
    sl('check', 'Quick check: shared pairs', {
      b: 'How many electrons does nitrogen need?',
      v: table(['Atom', 'Configuration'], [['Nitrogen', '2, 5']], 'Configuration of a nitrogen atom'),
      chk: 'chk-bond',
      n: 'A nitrogen atom has the configuration two, five. How many pairs of electrons do two nitrogen atoms share in a nitrogen molecule?',
    }),
    sl('diagram', 'Water and ammonia', {
      b: 'In water, oxygen shares **two** pairs and keeps **two** lone pairs. In ammonia, nitrogen shares **three** pairs and keeps **one** lone pair.',
      v: V.water,
      n: 'In water, the oxygen atom shares one pair with each of two hydrogen atoms and keeps two lone pairs. In ammonia, the nitrogen atom shares one pair with each of three hydrogen atoms and keeps a single lone pair.',
    }),
    sl('diagram', 'Methane and carbon tetrachloride', {
      b: 'Carbon has four outer electrons and shares **four** pairs. Methane has four hydrogen atoms and carbon tetrachloride has four chlorine atoms.',
      v: V.methane,
      n: 'Carbon shares four pairs, one with each atom around it. In methane there is no lone pair on carbon. In carbon tetrachloride each chlorine atom also keeps three lone pairs, so every atom has an octet.',
    }),
    sl('example', 'Worked example 2: counting electrons in carbon tetrachloride', {
      b: r`**Problem.** Find the total outer electrons, shared pairs and lone pairs in one molecule of $\ce{CCl4}$.

**Step 1.** Outer electrons: carbon 4 + four chlorine atoms 4 × 7 = 28, total **${MA.CCl4.valence}**.

**Step 2.** Four single bonds: **${MA.CCl4.pairs}** shared pairs = ${2 * MA.CCl4.pairs} electrons.

**Step 3.** Left over: ${MA.CCl4.valence} − ${2 * MA.CCl4.pairs} = ${MA.CCl4.valence - 2 * MA.CCl4.pairs} electrons = **${MA.CCl4.lone}** lone pairs (3 on each chlorine).`,
      v: table(['Quantity', 'Value'], [['Outer electrons in all atoms', `${MA.CCl4.valence}`], ['Shared pairs', `${MA.CCl4.pairs}`], ['Lone pairs', `${MA.CCl4.lone}`]], 'Table of the outer electrons, shared pairs and lone pairs in a carbon tetrachloride molecule'),
      n: 'Carbon contributes four outer electrons and each of the four chlorine atoms contributes seven, which gives thirty two. Eight of them are in four shared pairs. The remaining twenty four electrons form twelve lone pairs, three on each chlorine atom.',
    }),
    sl('check', 'Quick check: lone pairs', {
      b: 'Count the outer electrons of nitrogen.',
      v: table(['Molecule', 'Question'], [['Ammonia', 'Lone pairs on nitrogen?']], 'The lone pairs on the nitrogen atom of an ammonia molecule'),
      chk: 'chk-lone',
      n: 'Nitrogen has five outer electrons and shares three of them in an ammonia molecule. How many lone pairs does the nitrogen atom keep?',
    }),
    sl('concept', 'Breaking a covalent bond: radicals', {
      b: 'When a shared pair breaks so that **each atom keeps one electron**, two **radicals** form. A radical is an atom or group with an **unpaired electron**. Radicals are very reactive.',
      v: flow('LR', [['a', 'Atom : atom (shared pair)'], ['b', 'Bond breaks, one electron to each'], ['c', 'Two radicals, each with an unpaired electron']], [['a', 'b'], ['b', 'c']], 'Flow showing a shared pair splitting so that each atom keeps one electron to form two radicals'),
      n: 'A covalent bond can break in such a way that each atom takes one of the two shared electrons. The pieces are called radicals. Each has one unpaired electron, and that is why radicals are so reactive.',
    }),
    sl('diagram', 'Radicals from hydrogen and chlorine', {
      b: r`$\ce{H2 -> 2H.}$ and $\ce{Cl2 ->[light] 2Cl.}$ A radical is **neutral**: it has an unpaired electron but no charge.`,
      v: V.radicals,
      n: 'When a hydrogen molecule splits, each hydrogen atom keeps one electron. When a chlorine molecule splits in light, each chlorine atom keeps one electron and has an unpaired electron among its seven. These radicals carry no charge.',
    }),
    sl('example', 'Worked example 3: methane to radicals', {
      b: r`**Problem.** A carbon–hydrogen bond of methane breaks so that each atom keeps one electron. Name the radicals and write the equation.

**Step 1.** The shared pair is split: the hydrogen atom takes **1** electron and the carbon part takes **1**.

**Step 2.** The products are a hydrogen radical and a **methyl radical**: $\ce{CH4 -> CH3. + H.}$

**Step 3.** Check atoms: C 1 = 1; H 4 = 3 + 1.`,
      v: chem(r`CH4 -> CH3. + H.`, 'Methane splits into a methyl radical and a hydrogen radical', 'One shared pair splits; each product has an unpaired electron.'),
      n: 'One of the four bonds in methane breaks, and each atom keeps one electron. The carbon part with three hydrogen atoms is called a methyl radical. The other piece is a hydrogen radical. Both have an unpaired electron.',
    }),
    sl('check', 'Quick check: radicals', {
      b: 'Think about the electrons after the bond breaks.',
      v: table(['Change', 'Products'], [['Chlorine molecule in light', 'Two chlorine radicals']], 'The products when a chlorine molecule splits in light'),
      chk: 'chk-rad',
      n: 'A chlorine molecule splits in sunlight into two chlorine radicals. What does each radical have?',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'A covalent bond is formed by sharing a pair of electrons: single, double or triple.',
        'Prescribed molecules: H₂, Cl₂, HCl (single); O₂ (double); N₂ (triple); H₂O, NH₃, CH₄, CCl₄ (single).',
        'Count outer electrons, shared pairs and lone pairs for each molecule.',
        'Breaking a covalent bond, one electron to each atom, gives radicals with an unpaired electron.',
      ],
      v: table(['Molecule', 'Shared pairs', 'Lone pairs'], [['Hydrogen', `${MA.H2.pairs}`, `${MA.H2.lone}`], ['Chlorine', `${MA.Cl2.pairs}`, `${MA.Cl2.lone}`], ['Oxygen', `${MA.O2.pairs}`, `${MA.O2.lone}`], ['Nitrogen', `${MA.N2.pairs}`, `${MA.N2.lone}`], ['Water', `${MA.H2O.pairs}`, `${MA.H2O.lone}`], ['Ammonia', `${MA.NH3.pairs}`, `${MA.NH3.lone}`], ['Methane', `${MA.CH4.pairs}`, `${MA.CH4.lone}`]], 'Summary table of the shared pairs and lone pairs in seven molecules'),
      n: 'To sum up Part 2. Covalent bonds are formed by sharing electron pairs, and the bond may be single, double or triple. Count shared and lone pairs for each molecule. When a bond breaks with one electron to each atom, radicals form.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Draw the shared electrons in the overlap of the two outer shells, one dot and one cross per pair.',
        'Show every lone pair, so that each atom has an octet (a duplet for hydrogen).',
        'Do not draw charges on covalent molecules.',
        'A radical has an unpaired electron and no charge: do not confuse it with an ion.',
      ],
      v: table(['Slip', 'Fix'], [['Drawing 2 shared pairs in the chlorine molecule', 'Chlorine shares only one pair'], ['Forgetting the lone pairs on oxygen in water', 'Oxygen keeps two lone pairs'], ['Writing a charge on a radical', 'A radical is neutral']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Exam tips. Put shared electrons in the overlap. Show all the lone pairs so that each atom has an octet. Do not put charges on molecules or radicals. And remember that a radical has an unpaired electron.',
    }),
  ],
});
