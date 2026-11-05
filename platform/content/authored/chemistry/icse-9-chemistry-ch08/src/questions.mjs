// ICSE 9 Chemistry ch08 Chemical Bonding — question bank in ICSE school-examination style (ion formation, electron transfer,
// shared pairs, lone pairs, orbit structures, radicals, 10-mark structured questions in parts).
// AR keys use the ICSE option order: a = A true R false, b = A false R true, c = both true and R explains, d = both true and R does not explain.
import { mk, add, svgV, r } from '../../icse-9-chemistry-ch01/src/lib.mjs';
import { eq, cfg, outer, ion, NACL, MGCL2, CAO, NA2O, MGO, CACL2, MA, config } from './calc.mjs';
import { NACL_LETTERED, COV_AMMONIA_LETTERED } from './svgs.mjs';

const { mcq, ar, tf, fill, num, short, long, match } = mk;
const nacFig = svgV(NACL_LETTERED, 'Orbit structure diagram of the formation of an electrovalent compound with parts lettered A to E');
const nh3Fig = svgV(COV_AMMONIA_LETTERED, 'Orbit structure of a covalent molecule with parts lettered A to E');
const term = (o) => short({ marks: 1, wl: null, scheme: [[o.sch ?? 'Correct answer', 1]], ...o });
const sum = (c) => config(c).reduce((a, b) => a + b, 0);

// ---------------------------------------------------------------- deck-check items (not used in tests)
add('chk-anion', mcq({
  stem: 'An oxygen atom has the configuration 2, 6. When it forms an ion it',
  right: 'gains 2 electrons and forms O²⁻', wrong: ['loses 2 electrons and forms O²⁺', 'gains 6 electrons and forms O⁶⁻', 'loses 6 electrons and forms O⁶⁺'],
  sol: 'Two more electrons complete the octet, giving the oxide ion, option (@K).',
  d: 1, c: 'application', t: [1],
}), () => ion('O', false).charge === -2 || 'o');
add('chk-na', mcq({
  stem: 'A sodium atom (2, 8, 1) changes into a sodium ion. The ion has the electron arrangement',
  right: '2, 8', wrong: ['2, 8, 1', '2, 8, 2', '2, 8, 8'],
  sol: 'Loss of the single outer electron leaves 2, 8, option (@K).',
  d: 1, c: 'application', t: [1],
}), () => ion('Na', true).cfg === '2, 8' || 'na');
add('chk-mgcl2', mcq({
  stem: 'In magnesium chloride, the magnesium atom transfers its two outer electrons to',
  right: 'two chlorine atoms, one electron to each', wrong: ['one chlorine atom, two electrons', 'two chlorine atoms, two electrons to each', 'one chlorine atom, one electron'],
  sol: 'Each chlorine atom needs only one electron, so two chlorine atoms are used, option (@K).',
  d: 2, c: 'application', t: [2],
}), () => MGCL2.nNon === 2 && MGCL2.electrons === 2 || 'mgcl2');
add('chk-bond', mcq({
  stem: 'A nitrogen atom has the configuration 2, 5. Two nitrogen atoms in a nitrogen molecule share',
  right: '3 pairs of electrons', wrong: ['1 pair of electrons', '2 pairs of electrons', '5 pairs of electrons'],
  sol: 'Each atom needs 3 electrons for an octet, so 3 pairs are shared, option (@K).',
  d: 2, c: 'application', t: [3, 4],
}), () => MA.N2.pairs === 3 || 'n2');
add('chk-lone', mcq({
  stem: 'In an ammonia molecule the nitrogen atom keeps',
  right: '1 lone pair', wrong: ['no lone pair', '2 lone pairs', '3 lone pairs'],
  sol: 'Five outer electrons, three shared: two are left, which form one lone pair, option (@K).',
  d: 2, c: 'application', t: [4],
}), () => MA.NH3.lonePerAtom[0] === 1 || 'nh3');
add('chk-rad', mcq({
  stem: 'A chlorine molecule splits in sunlight into two chlorine radicals. Each radical has',
  right: 'an unpaired electron and no charge', wrong: ['a negative charge and a full octet', 'a positive charge and no unpaired electron', 'two unpaired electrons and a charge of 2−'],
  sol: 'Each atom keeps one of the two shared electrons, so it has 7 outer electrons, one unpaired, and no charge, option (@K).',
  d: 2, c: 'understanding', t: [5],
}));

// ---------------------------------------------------------------- t01 ion formation
add('e-mcq1', mcq({
  stem: 'Which of these atoms is the most likely to form a positive ion?',
  right: 'Calcium (2, 8, 8, 2)', wrong: ['Oxygen (2, 6)', 'Fluorine (2, 7)', 'Neon (2, 8)'],
  sol: 'Calcium has two outer electrons, which it loses easily to give Ca²⁺, option (@K).',
  d: 1, c: 'application', t: [1],
}));
add('e-mcq2', mcq({
  stem: 'A sulphur atom (2, 8, 6) forms a stable ion by',
  right: 'gaining 2 electrons', wrong: ['losing 2 electrons', 'losing 6 electrons', 'gaining 6 electrons'],
  sol: 'Two more electrons would give 2, 8, 8, so sulphur gains two, option (@K).',
  d: 2, c: 'application', t: [1],
}), () => ion('S', false).charge === -2 && outer('S') === 6 || 's');
add('e-mcq3', mcq({
  stem: 'Which ion has the same electron arrangement as an argon atom?',
  right: 'Potassium ion, K⁺', wrong: ['Sodium ion, Na⁺', 'Fluoride ion, F⁻', 'Lithium ion, Li⁺'],
  sol: 'K⁺ is 2, 8, 8, the same as argon; the other ions are 2, 8 or 2, option (@K).',
  d: 2, c: 'application', t: [1],
}), () => ion('K', true).cfg === '2, 8, 8' && ion('Na', true).cfg === '2, 8' && ion('F', false).cfg === '2, 8' && ion('Li', true).cfg === '2' || 'ar');
add('e-mcq4', mcq({
  stem: 'The atom of an element has the configuration 2, 8, 3. It is most likely to form an ion with the charge and arrangement',
  right: '3+ and 2, 8', wrong: ['3− and 2, 8, 6', '5+ and 2, 8', '3+ and 2, 8, 3'],
  sol: 'Loss of the three outer electrons gives a 3+ ion with the arrangement 2, 8, option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
add('e-mcq5', mcq({
  stem: 'In the formation of an electrovalent compound, the atom that gains electrons',
  right: 'becomes a negative ion', wrong: ['becomes a positive ion', 'remains neutral', 'shares the electrons with the other atom'],
  sol: 'More electrons than protons make the ion negative, option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('ar-ion', ar({
  a: 'A sodium atom changes into a sodium ion by losing one electron.',
  r: 'A sodium atom has one electron in its outermost shell.',
  key: 'c',
  sol: 'Losing the lone outer electron leaves a full shell beneath, so (R) explains (A), option (c).',
  d: 2, c: 'understanding', t: [1],
}));
add('e-tf', tf({
  stem: 'An electrovalent bond is formed by the sharing of a pair of electrons between two atoms.',
  key: 'f',
  sol: 'False. It is formed by the transfer of electrons; sharing gives a covalent bond.',
  d: 1, c: 'recall', t: [1],
}));
add('e-fill', fill({
  stem: 'An atom that gains electrons becomes a negatively charged ion called an ___.',
  acc: [['anion']],
  sol: 'An **anion**.',
  d: 1, c: 'recall', t: [1],
}));
add('e-term1', term({
  stem: 'Write the electronic configuration of the magnesium ion, Mg²⁺.',
  model: '**2, 8**', sol: 'Two, eight.', sch: '2, 8',
  d: 2, c: 'application', t: [1],
}), () => ion('Mg', true).cfg === '2, 8' || 'mg');
add('e-term2', term({
  stem: 'Write the equation for the formation of an oxide ion from an oxygen atom.',
  model: r`$\ce{O + 2e- -> O^2-}$`, sol: 'The atom gains two electrons.', sch: 'Equation with charge',
  d: 2, c: 'application', t: [1],
}));
add('e-num1', num({
  stem: 'A potassium atom has atomic number 19. How many electrons are present in a potassium ion, K⁺?',
  value: sum('K') - 1, tol: 0, unit: null,
  sol: `The atom has ${sum('K')} electrons; the ion has lost 1: ${sum('K')} − 1 = ${sum('K') - 1}.`,
  scheme: [['Atom has 19 electrons', 0.5], ['18', 0.5]],
  d: 2, c: 'application', t: [1],
}), () => eq(sum('K') - 1, 18, 'k+') === 18);
add('e-num2', num({
  stem: 'How many electrons are present in an oxide ion, O²⁻, formed from an oxygen atom of atomic number 8?',
  value: sum('O') + 2, tol: 0, unit: null,
  sol: `The atom has ${sum('O')} electrons and the ion has gained 2: ${sum('O')} + 2 = ${sum('O') + 2}.`,
  scheme: [['Atom has 8 electrons', 0.5], ['10', 0.5]],
  d: 2, c: 'application', t: [1],
}), () => eq(sum('O') + 2, 10, 'o2-') === 10);
add('e-short2a', short({
  marks: 2,
  stem: 'Define an electrovalent bond and name one compound that contains it.',
  wl: null,
  model: 'It is the bond formed by the **transfer of electrons** from one atom to another, the ions formed being held together by **electrostatic attraction**. An example is **magnesium oxide** (or sodium chloride).',
  sol: 'Transfer of electrons and attraction of ions; an example.',
  scheme: [['Definition', 1], ['Example', 1]],
  d: 1, c: 'recall', t: [1],
}));
add('e-short2b', short({
  marks: 2,
  stem: 'Explain why a sodium atom forms a positive ion but a chlorine atom forms a negative ion.',
  wl: null,
  model: 'Sodium has **one outer electron** (2, 8, 1) and loses it, leaving **more protons than electrons**. Chlorine has **seven** (2, 8, 7) and gains one to complete its octet, giving **more electrons than protons**.',
  sol: 'Sodium loses its one outer electron; chlorine gains one electron.',
  scheme: [['Sodium loses an electron, positive', 1], ['Chlorine gains an electron, negative', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('e-short3', short({
  marks: 3,
  stem: 'State the ion formed, and the number of electrons lost or gained, by (a) a lithium atom (2, 1), (b) a fluorine atom (2, 7) and (c) an aluminium atom (2, 8, 3).',
  wl: null,
  model: '**(a)** **Li⁺**; loses **1** electron.\n\n**(b)** **F⁻**; gains **1** electron.\n\n**(c)** **Al³⁺**; loses **3** electrons.',
  sol: 'Li⁺ loses 1; F⁻ gains 1; Al³⁺ loses 3.',
  scheme: [['(a) ion and number', 1], ['(b) ion and number', 1], ['(c) ion and number', 1]],
  d: 2, c: 'application', t: [1],
}), () => ion('Li', true).charge === 1 && ion('F', false).charge === -1 && outer('Al') === 3 || 'ions');

// ---------------------------------------------------------------- t02 NaCl, MgCl2, CaO
add('o-mcq1', mcq({
  stem: 'In the formation of sodium chloride the sodium ion has the same electron arrangement as',
  right: 'a neon atom', wrong: ['an argon atom', 'a helium atom', 'a chlorine atom'],
  sol: 'Na⁺ is 2, 8, the arrangement of neon, option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('o-mcq2', mcq({
  stem: 'Calcium (2, 8, 8, 2) gives two electrons to oxygen (2, 6). The formula of the compound is',
  right: 'CaO', wrong: ['Ca₂O', 'CaO₂', 'Ca₂O₂'],
  sol: 'Ca²⁺ and O²⁻ balance in the ratio 1 : 1, option (@K).',
  d: 2, c: 'application', t: [2],
}), () => CAO.nMetal === 1 && CAO.nNon === 1 || 'cao');
add('o-mcq3', mcq({
  stem: 'In an orbit structure of magnesium chloride, each chloride ion shows',
  right: '8 electrons in its outermost shell', wrong: ['7 electrons in its outermost shell', '2 electrons in its outermost shell', '1 electron in its outermost shell'],
  sol: 'Each chlorine atom gains one electron to give 2, 8, 8, an octet, option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('o-mcq4', mcq({
  stem: 'The total number of electrons transferred when one formula unit of magnesium chloride is formed from its atoms is',
  right: String(MGCL2.electrons), wrong: ['1', '3', '4'],
  sol: `Magnesium gives 2 electrons, one to each chlorine atom, so ${MGCL2.electrons} are transferred, option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => MGCL2.electrons === 2 || 'e');
add('o-mcq5', mcq({
  stem: 'Which of these ionic compounds has two positive ions for every negative ion?',
  right: 'Sodium oxide', wrong: ['Sodium chloride', 'Magnesium oxide', 'Calcium oxide'],
  sol: 'O²⁻ needs two Na⁺ to balance it, giving Na₂O; the others are 1 : 1, option (@K).',
  d: 3, c: 'analysis', t: [2],
}), () => NA2O.nMetal === 2 && NACL.nMetal === 1 && MGO.nMetal === 1 && CAO.nMetal === 1 || 'na2o');
add('o-tf', tf({
  stem: 'In magnesium chloride, one magnesium atom gives one electron to each of two chlorine atoms.',
  key: 't',
  sol: 'True. Each chlorine atom needs one electron and magnesium has two to give.',
  d: 2, c: 'understanding', t: [2],
}));
add('o-fill', fill({
  stem: 'In an electrovalent compound the total positive charge is equal to the total ___ charge.',
  acc: [['negative']],
  sol: 'The **negative** charge.',
  d: 1, c: 'recall', t: [2],
}));
add('o-term1', term({
  stem: 'Write the formula of the compound formed by sodium and oxygen.',
  model: r`$\ce{Na2O}$`, sol: 'Two sodium ions for one oxide ion.', sch: 'Na₂O',
  d: 2, c: 'application', t: [2],
}));
add('o-term2', term({
  stem: 'Name the force that holds the sodium ions and chloride ions together in sodium chloride.',
  model: '**Electrostatic attraction** between the oppositely charged ions.', sol: 'Electrostatic attraction.', sch: 'Electrostatic attraction',
  d: 1, c: 'recall', t: [2],
}));
add('o-num', num({
  stem: 'Sodium atoms give electrons to oxygen atoms to form sodium oxide. How many electrons are transferred in the formation of 10 formula units of sodium oxide?',
  value: 10 * NA2O.electrons, tol: 0, unit: null,
  sol: `Each formula unit needs ${NA2O.electrons} electrons (one from each of two sodium atoms): 10 × ${NA2O.electrons} = ${10 * NA2O.electrons}.`,
  scheme: [['2 electrons per formula unit', 0.5], ['20', 0.5]],
  d: 3, c: 'application', t: [2],
}), () => eq(10 * NA2O.electrons, 20, 'na2o') === 20);
add('o-short2a', short({
  marks: 2,
  stem: 'Write the equations for the formation of a magnesium ion from a magnesium atom and of a chloride ion from a chlorine atom.',
  wl: null,
  model: r`$\ce{Mg -> Mg^2+ + 2e-}$` + '\n\n' + r`$\ce{Cl + e- -> Cl-}$`,
  sol: 'Mg loses two electrons; Cl gains one.',
  scheme: [['Magnesium ion equation', 1], ['Chloride ion equation', 1]],
  d: 2, c: 'application', t: [2],
}));
add('o-short2b', short({
  marks: 2,
  stem: 'Explain why one magnesium atom combines with two chlorine atoms and not with one.',
  wl: null,
  model: 'A magnesium atom has **two outer electrons** to give, whereas a chlorine atom can take **only one** to complete its octet. So **two chlorine atoms** are needed to take the two electrons.',
  sol: 'Magnesium gives two; each chlorine takes one.',
  scheme: [['Magnesium has two electrons to give', 1], ['Each chlorine takes one, so two are needed', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('o-short2c', short({
  marks: 2,
  stem: 'Give the electron arrangement of a calcium ion and name the noble gas atom that has the same arrangement.',
  wl: null,
  model: 'The calcium ion, Ca²⁺, is **2, 8, 8**, the same as an **argon** atom.',
  sol: '2, 8, 8; argon.',
  scheme: [['2, 8, 8', 1], ['Argon', 1]],
  d: 2, c: 'application', t: [2],
}), () => ion('Ca', true).cfg === '2, 8, 8' || 'ca');
add('o-short3a', short({
  marks: 3,
  stem: 'Sodium (2, 8, 1) combines with oxygen (2, 6). (a) How many sodium atoms are needed for one oxygen atom? (b) Write the ions formed with their charges. (c) Write the formula of the compound.',
  wl: null,
  model: r`**(a)** **Two**, since oxygen takes 2 electrons and each sodium atom gives 1.` + '\n\n**(b)** Two **Na⁺** ions and one **O²⁻** ion.\n\n' + r`**(c)** $\ce{Na2O}$`,
  sol: 'Two Na atoms; 2 Na⁺ and O²⁻; Na₂O.',
  scheme: [['(a) two sodium atoms', 1], ['(b) ions with charges', 1], ['(c) formula', 1]],
  d: 3, c: 'application', t: [2],
}), () => NA2O.nMetal === 2 && NA2O.metal.charge === 1 && NA2O.nonmetal.charge === -2 || 'na2o');
add('o-short3b', short({
  marks: 3,
  stem: 'In the formation of calcium oxide from calcium (2, 8, 8, 2) and oxygen (2, 6), state (a) how many electrons are transferred, (b) the charge on the calcium ion and on the oxide ion, (c) the arrangement of the oxide ion.',
  wl: null,
  model: '**(a)** **Two** electrons.\n\n**(b)** Calcium ion **2+**; oxide ion **2−**.\n\n**(c)** **2, 8**.',
  sol: 'Two electrons; 2+ and 2−; 2, 8.',
  scheme: [['(a) two electrons', 1], ['(b) charges', 1], ['(c) 2, 8', 1]],
  d: 2, c: 'application', t: [2],
}), () => CAO.electrons === 2 && ion('O', false).cfg === '2, 8' || 'cao');

// ---------------------------------------------------------------- t03 covalent bond
add('v-mcq1', mcq({
  stem: 'A covalent bond is formed when two atoms',
  right: 'share one or more pairs of electrons', wrong: ['transfer electrons completely', 'attract each other as opposite ions', 'exchange protons'],
  sol: 'Sharing of electron pairs forms the covalent bond, option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('v-mcq2', mcq({
  stem: 'Which of these molecules contains a triple bond between its atoms?',
  right: 'Nitrogen', wrong: ['Oxygen', 'Chlorine', 'Hydrogen chloride'],
  sol: 'Each nitrogen atom needs three electrons, so three pairs are shared, option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('v-mcq3', mcq({
  stem: 'The number of electrons shared between the two atoms in a molecule of oxygen is',
  right: String(2 * MA.O2.pairs), wrong: ['2', '6', '8'],
  sol: `A double bond has two shared pairs, ${2 * MA.O2.pairs} electrons, option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => 2 * MA.O2.pairs === 4 || 'o2');
add('v-mcq4', mcq({
  stem: 'An atom X has the configuration 2, 8, 6. It combines with hydrogen to form a molecule in which X shares',
  right: '2 pairs, and the formula is H₂X', wrong: ['6 pairs, and the formula is H₆X', '1 pair, and the formula is HX', '2 pairs, and the formula is HX₂'],
  sol: 'X needs two electrons, so it shares two pairs, one with each of two hydrogen atoms, option (@K).',
  d: 3, c: 'analysis', t: [3],
}), () => MA.H2S.pairs === 2 || 'h2s');
add('v-mcq5', mcq({
  stem: 'Which pair of atoms is most likely to be joined by a covalent bond?',
  right: 'Carbon and chlorine', wrong: ['Sodium and chlorine', 'Magnesium and oxygen', 'Potassium and fluorine'],
  sol: 'Two non-metals share electrons; the other pairs are a metal with a non-metal, option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('v-mcq6', mcq({
  stem: 'When two hydrogen atoms form a hydrogen molecule, each atom attains the electron arrangement of',
  right: 'helium', wrong: ['neon', 'argon', 'lithium'],
  sol: 'Sharing one pair gives each hydrogen atom two electrons, as in helium, option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('ar-hcl', ar({
  a: 'Hydrogen chloride is a covalent compound.',
  r: 'Hydrogen chloride is a gas at room temperature.',
  key: 'd',
  sol: 'Both statements are true, but the bond is covalent because the atoms share a pair, not because the compound is a gas, option (d).',
  d: 3, c: 'analysis', t: [3, 4],
}));
add('v-tf', tf({
  stem: 'A double covalent bond involves four electrons shared between two atoms.',
  key: 't',
  sol: 'True. A double bond is two shared pairs.',
  d: 1, c: 'understanding', t: [3],
}));
add('v-fill', fill({
  stem: 'A covalent bond formed by sharing three pairs of electrons is called a ___ bond.',
  acc: [['triple']],
  sol: 'A **triple** bond.',
  d: 1, c: 'recall', t: [3],
}));
add('v-term1', term({
  stem: 'State the number of electrons shared in a triple covalent bond.',
  model: '**Six** (three pairs).', sol: 'Six.', sch: 'Six',
  d: 1, c: 'recall', t: [3],
}));
add('v-num', num({
  stem: 'How many electrons are shared between the two atoms in a nitrogen molecule?',
  value: 2 * MA.N2.pairs, tol: 0, unit: null,
  sol: `Three pairs are shared: 3 × 2 = ${2 * MA.N2.pairs}.`,
  scheme: [['3 pairs', 0.5], [`${2 * MA.N2.pairs}`, 0.5]],
  d: 1, c: 'application', t: [3],
}), () => 2 * MA.N2.pairs === 6 || 'n2');
add('v-short2a', short({
  marks: 2,
  stem: 'Define a covalent bond and name a molecule that has a double bond.',
  wl: null,
  model: 'A covalent bond is formed by the **sharing of a pair (or pairs) of electrons** between two atoms. The **oxygen** molecule has a double bond.',
  sol: 'Sharing of electron pairs; oxygen.',
  scheme: [['Definition', 1], ['Oxygen named', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('v-short2b', short({
  marks: 2,
  stem: 'State two differences between the way an electrovalent bond and a covalent bond are formed.',
  wl: null,
  model: 'In an **electrovalent** bond electrons are **transferred** from one atom to another, forming **ions**. In a **covalent** bond electron pairs are **shared**, forming **molecules**, and no ions are formed.',
  sol: 'Transfer against sharing; ions against molecules.',
  scheme: [['Transfer against sharing', 1], ['Ions against molecules', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('v-short3', short({
  marks: 3,
  stem: 'State the type of bond (single, double or triple) and the number of shared pairs in (a) a chlorine molecule, (b) an oxygen molecule and (c) a nitrogen molecule.',
  wl: null,
  model: `**(a)** Single bond; **${MA.Cl2.pairs}** pair.\n\n**(b)** Double bond; **${MA.O2.pairs}** pairs.\n\n**(c)** Triple bond; **${MA.N2.pairs}** pairs.`,
  sol: 'Cl₂ single, 1 pair; O₂ double, 2 pairs; N₂ triple, 3 pairs.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [3],
}));

// ---------------------------------------------------------------- t04 orbit structures of molecules
add('s-mcq1', mcq({
  stem: 'In an orbit structure of a water molecule, the oxygen atom has',
  right: '2 shared pairs and 2 lone pairs', wrong: ['2 shared pairs and no lone pair', '4 shared pairs and no lone pair', '1 shared pair and 3 lone pairs'],
  sol: 'Oxygen shares 2 of its 6 outer electrons with hydrogen; the other 4 form 2 lone pairs, option (@K).',
  d: 2, c: 'application', t: [4],
}), () => MA.H2O.lonePerAtom[0] === 2 && MA.H2O.pairs === 2 || 'h2o');
add('s-mcq2', mcq({
  stem: 'The number of shared pairs of electrons in one molecule of carbon tetrachloride is',
  right: String(MA.CCl4.pairs), wrong: ['1', '3', '8'],
  sol: `Carbon makes one single bond with each of the four chlorine atoms, ${MA.CCl4.pairs} pairs, option (@K).`,
  d: 2, c: 'application', t: [4],
}), () => MA.CCl4.pairs === 4 || 'ccl4');
add('s-mcq3', mcq({
  stem: 'Which molecule has no lone pair on its central atom?',
  right: 'Methane', wrong: ['Ammonia', 'Water', 'Hydrogen sulphide'],
  sol: 'All four outer electrons of carbon are shared in methane, while N, O and S in the others keep lone pairs, option (@K).',
  d: 3, c: 'analysis', t: [4],
}), () => MA.CH4.lonePerAtom[0] === 0 && MA.NH3.lonePerAtom[0] > 0 && MA.H2O.lonePerAtom[0] > 0 && MA.H2S.lonePerAtom[0] > 0 || 'ch4');
add('s-mcq4', mcq({
  stem: 'In a molecule made of two chlorine atoms, how many outer-shell electrons in all stay unshared, apart from the one shared pair?',
  right: String(2 * MA.Cl2.lone), wrong: ['6', '2', '14'],
  sol: `Two atoms have 14 outer electrons; 2 are shared, so ${2 * MA.Cl2.lone} are not, option (@K).`,
  d: 2, c: 'application', t: [4],
}), () => 2 * MA.Cl2.lone === 12 || 'cl2');
add('s-mcq5', mcq({
  stem: 'In a molecule of hydrogen chloride, the chlorine atom has how many electrons round it, counting the shared pair?',
  right: '8', wrong: ['2', '7', '9'],
  sol: 'Its seven outer electrons plus the one it shares make an octet, option (@K).',
  d: 2, c: 'application', t: [4],
}), () => outer('Cl') + 1 === 8 || 'hcl');
add('s-mcq6', mcq({
  stem: 'Which statement about the orbit structure of ammonia is correct?',
  right: 'Nitrogen shares three pairs and has one lone pair', wrong: ['Nitrogen shares five pairs and has no lone pair', 'Nitrogen shares one pair and has three lone pairs', 'Hydrogen has two lone pairs'],
  sol: 'Nitrogen (2, 5) shares one pair with each of three hydrogen atoms, leaving a lone pair, option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('ar-h2o', ar({
  a: 'In a water molecule the oxygen atom has two lone pairs.',
  r: 'An oxygen atom has four electrons in its outermost shell.',
  key: 'a',
  sol: 'Oxygen has six outer electrons (not four), two of them shared, so four remain as two lone pairs: (A) is true and (R) is false, option (a).',
  d: 3, c: 'analysis', t: [4],
}));
add('s-tf', tf({
  stem: 'In a molecule of carbon tetrachloride each chlorine atom has three lone pairs.',
  key: 't',
  sol: 'True. Chlorine has seven outer electrons and shares one.',
  d: 2, c: 'application', t: [4],
}));
add('s-fill', fill({
  stem: 'A pair of outer-shell electrons that is not shared with another atom is called a ___ pair.',
  acc: [['lone']],
  sol: 'A **lone** pair.',
  d: 1, c: 'recall', t: [4],
}));
add('s-term1', term({
  stem: 'Name the molecule in which one atom has three lone pairs and the other atom has none, with one shared pair between them.',
  model: '**Hydrogen chloride.**', sol: 'Hydrogen chloride.', sch: 'Hydrogen chloride',
  d: 3, c: 'analysis', t: [4],
}));
add('s-term2', term({
  stem: 'State the number of shared pairs in a molecule of methane.',
  model: `**${MA.CH4.pairs}.**`, sol: 'Four.', sch: 'Four',
  d: 1, c: 'recall', t: [4],
}));
add('s-num1', num({
  stem: 'Carbon has 4 outer electrons and each chlorine atom has 7. How many outer electrons are there altogether in the atoms of one molecule of carbon tetrachloride?',
  value: MA.CCl4.valence, tol: 0, unit: null,
  sol: `4 + 4 × 7 = 4 + 28 = ${MA.CCl4.valence}.`,
  scheme: [['4 + 4 × 7', 0.5], [`${MA.CCl4.valence}`, 0.5]],
  d: 2, c: 'application', t: [4],
}), () => MA.CCl4.valence === 32 || 'ccl4');
add('s-num2', num({
  stem: 'How many lone pairs are there in one molecule of carbon tetrachloride?',
  value: MA.CCl4.lone, tol: 0, unit: null,
  sol: `32 outer electrons − 8 shared electrons = 24 electrons = ${MA.CCl4.lone} lone pairs.`,
  scheme: [['24 non-bonding electrons', 0.5], [`${MA.CCl4.lone}`, 0.5]],
  d: 3, c: 'application', t: [4],
}), () => MA.CCl4.lone === 12 || 'ccl4lone');
add('s-short2a', short({
  marks: 2,
  stem: 'State two features of the orbit structure of a water molecule.',
  wl: null,
  model: 'The oxygen atom shares **one pair with each of two hydrogen atoms** (two single bonds) and keeps **two lone pairs**. Each hydrogen atom has a duplet and oxygen has an octet.',
  sol: 'Two shared pairs; two lone pairs; octet and duplet.',
  scheme: [['Two single bonds', 1], ['Two lone pairs on oxygen', 1]],
  d: 2, c: 'application', t: [4],
}));
add('s-short2b', short({
  marks: 2,
  stem: 'Using its electronic configuration, explain why carbon forms four covalent bonds in methane.',
  wl: null,
  model: 'Carbon is **2, 4**, so it has **four outer electrons** and needs **four more** to complete an octet. It therefore shares **four pairs**, one with each hydrogen atom.',
  sol: 'Four outer electrons; four needed; four shared pairs.',
  scheme: [['Configuration and four electrons needed', 1], ['Four pairs shared with hydrogen', 1]],
  d: 2, c: 'application', t: [4],
}));
add('s-short3a', short({
  marks: 3,
  stem: 'State the number of shared pairs and the number of lone pairs on the central atom in (a) a water molecule, (b) an ammonia molecule and (c) a methane molecule.',
  wl: null,
  model: `**(a)** ${MA.H2O.pairs} shared pairs; ${MA.H2O.lonePerAtom[0]} lone pairs.\n\n**(b)** ${MA.NH3.pairs} shared pairs; ${MA.NH3.lonePerAtom[0]} lone pair.\n\n**(c)** ${MA.CH4.pairs} shared pairs; no lone pair.`,
  sol: 'H₂O 2 and 2; NH₃ 3 and 1; CH₄ 4 and 0.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [4],
}));
add('s-short3b', short({
  marks: 3,
  stem: 'For hydrogen chloride, state (a) the number of outer electrons in a hydrogen atom and in a chlorine atom, (b) the number of pairs shared, (c) the number of lone pairs on chlorine.',
  wl: null,
  model: `**(a)** Hydrogen **1**; chlorine **7**.\n\n**(b)** **${MA.HCl.pairs}** pair.\n\n**(c)** **${MA.HCl.lonePerAtom[1]}** lone pairs.`,
  sol: '1 and 7; one pair; three lone pairs.',
  scheme: [['(a) both numbers', 1], ['(b) one shared pair', 1], ['(c) three lone pairs', 1]],
  d: 2, c: 'application', t: [4],
}));
add('bond-match', match({
  marks: 5,
  stem: 'Match each atom in Column A with the ion it forms in Column B.',
  pairs: [
    ['Magnesium atom, 2, 8, 2', 'Mg²⁺, 2, 8'],
    ['Oxygen atom, 2, 6', 'O²⁻, 2, 8'],
    ['Sodium atom, 2, 8, 1', 'Na⁺, 2, 8'],
    ['Chlorine atom, 2, 8, 7', 'Cl⁻, 2, 8, 8'],
    ['Calcium atom, 2, 8, 8, 2', 'Ca²⁺, 2, 8, 8'],
  ],
  order: [3, 0, 4, 1, 2],
  sol: 'Mg gives Mg²⁺; O gives O²⁻; Na gives Na⁺; Cl gives Cl⁻; Ca gives Ca²⁺.',
  d: 2, c: 'application', t: [1],
}));

// ---------------------------------------------------------------- t05 radicals
add('r-mcq1', mcq({
  stem: 'Radicals are formed when a covalent bond breaks in such a way that',
  right: 'each atom keeps one of the two shared electrons', wrong: ['one atom keeps both shared electrons', 'both atoms lose their electrons', 'the electrons are shared among three atoms'],
  sol: 'An even split of the shared pair leaves each atom with an unpaired electron, option (@K).',
  d: 1, c: 'recall', t: [5],
}));
add('r-mcq2', mcq({
  stem: 'Which of these species has an unpaired electron?',
  right: 'A chlorine radical', wrong: ['A chloride ion', 'An argon atom', 'A neon atom'],
  sol: 'A chlorine radical has seven outer electrons, one unpaired; the other species have full shells, option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('r-mcq3', mcq({
  stem: 'On breaking one carbon–hydrogen bond of methane so that each atom keeps one electron, the products are',
  right: 'a methyl radical and a hydrogen radical', wrong: ['a carbon ion and four hydrogen ions', 'a methyl ion and a hydride ion', 'carbon and hydrogen molecules'],
  sol: 'CH₃ and H each carry an unpaired electron, option (@K).',
  d: 2, c: 'application', t: [5],
}));
add('r-mcq4', mcq({
  stem: 'A chlorine radical differs from a chloride ion in that the radical has',
  right: '7 outer electrons and no charge', wrong: ['8 outer electrons and no charge', '7 outer electrons and a charge of 1−', '8 outer electrons and a charge of 1−'],
  sol: 'The radical has one unpaired electron among seven, with no charge; the ion has a complete octet and a 1− charge, option (@K).',
  d: 3, c: 'analysis', t: [5],
}));
add('ar-rad', ar({
  a: 'A radical carries a positive charge.',
  r: 'A radical has an unpaired electron.',
  key: 'b',
  sol: 'A radical is neutral, so (A) is false; it does have an unpaired electron, so (R) is true, option (b).',
  d: 2, c: 'analysis', t: [5],
}));
add('r-tf', tf({
  stem: 'The two chlorine radicals formed when a chlorine molecule splits each carry a charge.',
  key: 'f',
  sol: 'False. Each keeps one electron and has no charge.',
  d: 1, c: 'understanding', t: [5],
}));
add('r-fill', fill({
  stem: 'When a covalent bond breaks and each atom keeps one electron, ___ are formed.',
  acc: [['radicals', 'free radicals']],
  sol: '**Radicals**.',
  d: 1, c: 'recall', t: [5],
}));
add('r-term1', term({
  stem: 'Write the equation for the formation of radicals when a hydrogen molecule is split.',
  model: r`$\ce{H2 -> 2H.}$`, sol: 'Two hydrogen radicals.', sch: 'Equation',
  d: 2, c: 'application', t: [5],
}));
add('r-term2', term({
  stem: 'Name the radical of formula CH₃ formed from methane by breaking one carbon–hydrogen bond.',
  model: '**Methyl radical.**', sol: 'Methyl radical.', sch: 'Methyl radical',
  d: 1, c: 'recall', t: [5],
}));
add('r-short2a', short({
  marks: 2,
  stem: 'What is a radical? State one property of radicals.',
  wl: null,
  model: 'A radical is an **atom or group of atoms with an unpaired electron**, formed when a covalent bond breaks. Radicals are **very reactive** and neutral.',
  sol: 'Species with an unpaired electron; very reactive.',
  scheme: [['Definition', 1], ['One property', 1]],
  d: 1, c: 'recall', t: [5],
}));
add('r-short2b', short({
  marks: 2,
  stem: 'State two differences between a chlorine radical and a chloride ion.',
  wl: null,
  model: 'The radical has **no charge**, but the chloride ion has a **1− charge**. The radical has **seven** outer electrons, one unpaired, whereas the ion has a **complete octet**.',
  sol: 'No charge against 1−; seven outer electrons against eight.',
  scheme: [['Charge difference', 1], ['Outer electron difference', 1]],
  d: 3, c: 'analysis', t: [5],
}));
add('r-short3', short({
  marks: 3,
  stem: 'Write equations showing the formation of radicals from (a) a hydrogen molecule, (b) a chlorine molecule in sunlight and (c) a methane molecule (one C–H bond breaks).',
  wl: null,
  model: r`**(a)** $\ce{H2 -> 2H.}$` + '\n\n' + r`**(b)** $\ce{Cl2 ->[light] 2Cl.}$` + '\n\n' + r`**(c)** $\ce{CH4 -> CH3. + H.}$`,
  sol: 'H₂ gives 2H•; Cl₂ gives 2Cl•; CH₄ gives CH₃• and H•.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'application', t: [5],
}));

// ---------------------------------------------------------------- 10-mark structured questions
add('nacl-long', long({
  marks: 10, wl: null,
  stem: 'The diagram shows how an electrovalent compound is formed from two atoms. Its parts are lettered A to E. The atom A has the configuration 2, 8, 1 and the atom B has the configuration 2, 8, 7.\n\n(a) Name the particles A, B, C and D. [2]\n\n(b) What does the electron E show about how the bond is formed? [1]\n\n(c) Write the electron arrangement of C and of D. [2]\n\n(d) Write the equations for the formation of C from A and of D from B. [2]\n\n(e) Name the type of bond formed and state the force that holds the two ions together. [3]',
  model: '**(a)** **A** is a **sodium atom**, **B** a **chlorine atom**, **C** a **sodium ion** and **D** a **chloride ion**.\n\n**(b)** The electron **E** was **transferred** from the sodium atom to the chlorine atom.\n\n**(c)** **C:** 2, 8. **D:** 2, 8, 8.\n\n' + r`**(d)** $\ce{Na -> Na+ + e-}$` + '\n\n' + r`$\ce{Cl + e- -> Cl-}$` + '\n\n**(e)** An **electrovalent (ionic) bond**, formed by transfer of an electron; the ions are held by **electrostatic attraction** between opposite charges.',
  sol: 'Na, Cl, Na⁺, Cl⁻; transfer; 2, 8 and 2, 8, 8; two equations; electrovalent bond and electrostatic attraction.',
  scheme: [['A and B named', 1], ['C and D named', 1], ['Electron E transferred', 1], ['C arrangement', 1], ['D arrangement', 1], ['Equation for C', 1], ['Equation for D', 1], ['Electrovalent bond', 1], ['Formed by transfer', 1], ['Electrostatic attraction', 1]],
  d: 2, c: 'application', t: [1, 2],
  assets: [nacFig],
}), () => ion('Na', true).cfg === '2, 8' && ion('Cl', false).cfg === '2, 8, 8' || 'nacl');
add('cao-long', long({
  marks: 10, wl: null,
  stem: 'A student studies the formation of calcium oxide from calcium (atomic number 20) and oxygen (atomic number 8).\n\n(a) Draw an orbit structure diagram to show the formation of calcium oxide: draw both atoms, show the electrons transferred in a different style, and draw the two ions with their charges. [4]\n\n(b) Write the electron arrangement of each atom and of each ion. [2]\n\n(c) Explain why calcium loses two electrons rather than gaining six. [2]\n\n(d) Calcium also combines with chlorine. State the formula of calcium chloride and how many chlorine atoms combine with one calcium atom. [2]',
  model: '**(a)** A calcium atom **(2, 8, 8, 2)** and an oxygen atom **(2, 6)** drawn in shells; the **two outer electrons of calcium** shown as crosses moving to oxygen; then **[Ca]²⁺ (2, 8, 8)** and **[O]²⁻ (2, 8)** in brackets, the oxide ion showing 8 outer electrons, two of them crosses.\n\n**(b)** Ca **2, 8, 8, 2**; O **2, 6**; Ca²⁺ **2, 8, 8**; O²⁻ **2, 8**.\n\n**(c)** Losing two electrons is far easier than gaining six, and it leaves a **complete outer octet** (2, 8, 8).\n\n' + r`**(d)** $\ce{CaCl2}$` + '; **two** chlorine atoms, one electron to each.',
  sol: 'Orbit structure with two electrons moving; configurations; loss of two is easier; CaCl₂ with two chlorine atoms.',
  scheme: [['Both atoms in shells', 1], ['Transferred electrons in a different style', 1], ['Ions in brackets with charges', 1], ['8 outer electrons on the oxide ion', 1], ['Atom arrangements', 1], ['Ion arrangements', 1], ['Losing two is easier', 1], ['Complete octet is left', 1], ['CaCl₂', 1], ['Two chlorine atoms', 1]],
  d: 3, c: 'application', t: [2],
}), () => CAO.electrons === 2 && CACL2.nNon === 2 && sum('Ca') === 20 || 'cao');
add('ammonia-long', long({
  marks: 10, wl: null,
  stem: 'The diagram shows the orbit structure of a covalent molecule made from nitrogen (atomic number 7) and hydrogen. Its parts are lettered A to E.\n\n(a) Name the atoms A and B and the part D. [3]\n\n(b) What is C? How many such parts are there in the molecule? [2]\n\n(c) Using the configuration of nitrogen, explain why nitrogen forms three bonds. [2]\n\n(d) State the number of electrons round the nitrogen atom, counting the shared electrons, and the number round each hydrogen atom. [2]\n\n(e) Write the formula of the molecule. [1]',
  model: `**(a)** **A** is a **nitrogen atom**, **B** a **hydrogen atom** and **D** a **lone pair** of electrons on nitrogen.\n\n**(b)** **C** is a **shared pair** (one dot and one cross); there are **${MA.NH3.pairs}** in the molecule.\n\n**(c)** Nitrogen is **2, 5**, with five outer electrons, so it needs **three more** to complete an octet and shares three pairs.\n\n**(d)** Nitrogen has **8** electrons (3 shared pairs and 1 lone pair); each hydrogen has **2**.\n\n` + r`**(e)** $\ce{NH3}$`,
  sol: 'Nitrogen, hydrogen, lone pair; shared pair, three; nitrogen needs three electrons; 8 and 2; NH₃.',
  scheme: [['A nitrogen atom', 1], ['B hydrogen atom', 1], ['D lone pair', 1], ['C shared pair', 1], ['Three of them', 1], ['Nitrogen has five outer electrons', 1], ['Needs three more, shares three pairs', 1], ['Nitrogen has 8', 1], ['Hydrogen has 2', 1], ['NH₃', 1]],
  d: 3, c: 'application', t: [3, 4],
  assets: [nh3Fig],
}), () => MA.NH3.pairs === 3 && MA.NH3.lone === 1 || 'nh3');
add('multi-long', long({
  marks: 10, wl: null,
  stem: 'Chlorine (atomic number 17), oxygen (atomic number 8) and nitrogen (atomic number 7) each exist as molecules of two atoms.\n\n(a) For one atom of each element state the number of outer electrons and the number of electrons it needs to complete an octet. [3]\n\n(b) Give the number of shared pairs in each molecule and name the type of bond. [3]\n\n(c) State the number of lone pairs on each atom in each molecule. [2]\n\n(d) Draw the orbit structure of the molecule with the triple bond, showing the shared pairs and the lone pairs. [2]',
  model: `**(a)** Chlorine **${outer('Cl')}** outer electrons, needs **1**; oxygen **${outer('O')}**, needs **2**; nitrogen **${outer('N')}**, needs **3**.\n\n**(b)** Cl₂: **${MA.Cl2.pairs}** pair, single bond; O₂: **${MA.O2.pairs}** pairs, double bond; N₂: **${MA.N2.pairs}** pairs, triple bond.\n\n**(c)** Cl: **${MA.Cl2.lonePerAtom[0]}** lone pairs on each atom; O: **${MA.O2.lonePerAtom[0]}**; N: **${MA.N2.lonePerAtom[0]}**.\n\n**(d)** Two nitrogen atoms (2, 5) with overlapping outer shells; **three shared pairs** (six electrons, three dots and three crosses) in the overlap; **one lone pair** on each atom, so each atom has an octet.`,
  sol: 'Outer electrons 7, 6, 5; pairs 1, 2, 3; lone pairs 3, 2, 1; N₂ orbit structure.',
  scheme: [['Chlorine electrons', 1], ['Oxygen electrons', 1], ['Nitrogen electrons', 1], ['Shared pairs in each', 1.5], ['Bond types', 1.5], ['Lone pairs', 2], ['Orbit structure: three shared pairs', 1.5], ['Lone pairs drawn', 0.5]],
  d: 3, c: 'application', t: [3, 4],
}), () => [MA.Cl2.pairs, MA.O2.pairs, MA.N2.pairs, MA.Cl2.lonePerAtom[0], MA.O2.lonePerAtom[0], MA.N2.lonePerAtom[0]].join() === '1,2,3,3,2,1' || 'multi');
add('carbon-long', long({
  marks: 10, wl: null,
  stem: 'Carbon (atomic number 6) forms the compounds methane, CH₄, and carbon tetrachloride, CCl₄.\n\n(a) Write the electronic configuration of carbon and explain why it forms four bonds. [2]\n\n(b) Draw the orbit structure of methane showing the shared pairs. [3]\n\n(c) For carbon tetrachloride, find the total number of outer electrons in all the atoms, the number of shared pairs and the number of lone pairs. [3]\n\n(d) State the number of lone pairs on the carbon atom and on each chlorine atom in carbon tetrachloride. [2]',
  model: `**(a)** Carbon is **2, 4**: four outer electrons, so it needs **four more** and shares four pairs.\n\n**(b)** A carbon atom (2, 4) at the centre with **four hydrogen atoms** around it; the outer shells overlap and each overlap holds **one shared pair** (one dot and one cross), so **four shared pairs** in all; carbon has an octet and each hydrogen a duplet.\n\n**(c)** Outer electrons 4 + 4 × 7 = **${MA.CCl4.valence}**; shared pairs **${MA.CCl4.pairs}**; lone pairs (${MA.CCl4.valence} − ${2 * MA.CCl4.pairs}) ÷ 2 = **${MA.CCl4.lone}**.\n\n**(d)** Carbon has **no** lone pair; each chlorine has **${MA.CCl4.lonePerAtom[1]}** lone pairs.`,
  sol: '2, 4 so four pairs; drawing of CH₄; 32, 4 and 12; none on carbon and three on each chlorine.',
  scheme: [['Configuration 2, 4', 1], ['Four electrons needed', 1], ['Four hydrogen atoms around carbon', 1], ['Four shared pairs in the overlaps', 1], ['Octet and duplet shown', 1], ['32 outer electrons', 1], ['4 shared pairs', 1], ['12 lone pairs', 1], ['No lone pair on carbon', 1], ['Three on each chlorine', 1]],
  d: 4, c: 'analysis', t: [4],
}), () => MA.CCl4.valence === 32 && MA.CCl4.pairs === 4 && MA.CCl4.lone === 12 && MA.CCl4.lonePerAtom[1] === 3 && cfg('C') === '2, 4' || 'ccl4');
add('radical-long', long({
  marks: 10, wl: null,
  stem: 'A flask of chlorine gas is exposed to bright sunlight. Some of the chlorine molecules split into chlorine radicals. Later a mixture of chlorine and methane is also exposed to light.\n\n(a) Write the equation for the formation of chlorine radicals from a chlorine molecule. [2]\n\n(b) State what happens to the shared pair when the molecule splits. [1]\n\n(c) State two differences between a chlorine radical and a chloride ion. [3]\n\n(d) Write the equation for the breaking of one carbon–hydrogen bond of methane to give radicals, and name the radical that contains carbon. [3]\n\n(e) Give one reason why radicals are very reactive. [1]',
  model: r`**(a)** $\ce{Cl2 ->[light] 2Cl.}$` + '\n\n**(b)** The shared pair is **split**, one electron going to **each** atom.\n\n**(c)** The radical has **no charge**, the ion has a **1− charge**. The radical has **7 outer electrons**, one of them unpaired, whereas the ion has a **complete octet** with all electrons paired. (Either two of these differences.)\n\n' + r`**(d)** $\ce{CH4 -> CH3. + H.}$` + '; the **methyl radical**.\n\n**(e)** Each radical has an **unpaired electron** and tends to pair it up by reacting.',
  sol: 'Cl₂ gives 2Cl•; one electron to each atom; two differences; CH₄ gives CH₃• and H•; unpaired electron.',
  scheme: [['Reactant and products', 1], ['Condition light', 1], ['Pair split, one electron each', 1], ['Charge difference', 1.5], ['Outer electron difference', 1.5], ['Equation for methane', 2], ['Methyl radical', 1], ['Unpaired electron', 1]],
  d: 4, c: 'analysis', t: [5],
}), () => MA.CH4.pairs === 4 || 'radical');

// ---------------------------------------------------------------- additional recall and understanding items
add('e-mcq6', mcq({
  stem: 'A positively charged ion formed when an atom loses electrons is called a',
  right: 'cation', wrong: ['anion', 'radical', 'molecule'],
  sol: 'Loss of electrons gives a positive ion, a cation, option (@K).',
  d: 1, c: 'recall', t: [1],
}));
add('v-mcq7', mcq({
  stem: 'The number of electrons shared in one single covalent bond is',
  right: '2', wrong: ['1', '4', '6'],
  sol: 'A single bond is one shared pair, which is two electrons, option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('s-term3', term({
  stem: 'Name the type of covalent bond between the two atoms in a molecule of nitrogen.',
  model: '**Triple bond.**', sol: 'Triple bond.', sch: 'Triple bond',
  d: 1, c: 'recall', t: [3],
}));
add('r-mcq5', mcq({
  stem: 'Radicals are usually very reactive because each one',
  right: 'has an unpaired electron that it tends to pair up', wrong: ['carries a large positive charge', 'has a complete octet', 'contains no electrons'],
  sol: 'The unpaired electron makes the species eager to react, option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
