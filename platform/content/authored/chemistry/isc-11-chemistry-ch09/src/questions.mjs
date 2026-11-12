// ISC 11 Chemistry ch09 Molecular Orbital Theory, Coordinate Bonds, Resonance and Hydrogen Bonding: question bank (ISC style).
// Bond orders, unpaired-electron counts and orderings come from fillMO() in data.mjs (Aufbau, Pauli, Hund). Constant: N_A = 6.022 × 10²³
// mol⁻¹. Assertion-reason keys: a b c d a b.
import { mk, add, r, near } from './lib.mjs';
import { MO, SP, ORD_1S, fillMO, fmtBO, LEN, BP, resBO, clDative, clLonePairs, q23, NA } from './data.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const bo = (k) => MO[k].bo;
const up = (k) => MO[k].unpaired;
const nm = (k) => MO[k].name;
const f1 = (x) => x.toFixed(1);

// ---------------------------------------------------------------- t01 molecular orbital theory of homonuclear diatomics
add('mo-bonding-mcq', mcq({
  stem: 'A student follows what happens when the 1s orbitals of two hydrogen atoms are combined in phase to give a molecular orbital. Which description of the new orbital is correct?',
  right: 'It is a bonding orbital: electron density builds up between the two nuclei and its energy is lower than that of either 1s orbital',
  wrong: ['It is an antibonding orbital: there is a node between the nuclei and its energy is higher than that of either 1s orbital', 'It is a non-bonding orbital: it has the same energy as a 1s orbital and no density between the nuclei', 'It is a bonding orbital with a node between the nuclei and an energy higher than that of a 1s orbital'],
  sol: 'Addition (in phase) of the two 1s wave functions piles up electron density between the nuclei, which attracts both nuclei and lowers the energy. Subtraction gives the antibonding orbital with a node — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('n2-order-mcq', mcq({
  stem: 'A lecturer writes the filled valence molecular orbitals of the nitrogen molecule on the board. In order of increasing energy they are:',
  right: 'σ2s, σ*2s, π2p (two orbitals), σ2pz',
  wrong: ['σ2s, σ*2s, σ2pz, π2p (two orbitals)', 'σ2s, σ2pz, π2p (two orbitals), σ*2s', 'σ*2s, σ2s, π2p (two orbitals), σ2pz'],
  sol: 'For molecules up to N₂, s–p mixing lowers the π2p pair below σ2pz, so the filled valence MOs of N₂ run σ2s < σ*2s < π2p < σ2pz — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('o2-order-mcq', mcq({
  stem: 'In the energy-level diagram of the oxygen molecule used in class, the orbital that lies immediately below the degenerate π2p pair is:',
  right: 'σ2pz',
  wrong: ['σ*2s', 'π*2p', 'σ*2pz'],
  sol: 'In O₂ (and F₂) there is no s–p mixing, so σ2pz lies below π2p: the order is σ2s < σ*2s < σ2pz < π2p < π*2p < σ*2pz — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('be2-mcq', mcq({
  stem: `Beryllium vapour is made of single atoms. Using MO theory, the hypothetical molecule Be₂ would have ${SP.Be2.ev} valence-MO electrons, and its bond order would be:`,
  right: `${fmtBO(bo('Be2'))}, because the two bonding and the two antibonding electrons cancel`,
  wrong: ['1, because the σ2s orbital is filled', '2, because Be has two valence electrons each', '0.5, because one antibonding electron is unpaired'],
  sol: `Be₂ has 4 valence-MO electrons: σ2s² σ*2s². Bond order = (2 − 2)/2 = ${fmtBO(bo('Be2'))}, so no stable molecule forms — option (@K).`,
  d: 3, c: 'application', t: [1],
}), () => bo('Be2') === 0 || 'be2');
add('c2-mcq', mcq({
  stem: 'Spectra of a carbon arc show the C₂ molecule. Using the energy order for light diatomic molecules (π2p below σ2pz), its bond order and magnetic behaviour are:',
  right: `bond order ${fmtBO(bo('C2'))}, diamagnetic, with both π2p orbitals full`,
  wrong: ['bond order 2, paramagnetic, with two unpaired electrons in π2p', 'bond order 1, diamagnetic, with σ2s and σ*2s full', 'bond order 3, diamagnetic, with σ2pz full'],
  sol: `C₂ has 8 valence-MO electrons: σ2s² σ*2s² π2p⁴. Bond order = (6 − 2)/2 = ${fmtBO(bo('C2'))}; every electron is paired, so it is diamagnetic — option (@K).`,
  d: 3, c: 'application', t: [1],
}), () => bo('C2') === 2 && up('C2') === 0 || 'c2');
add('he2plus-mcq', (() => {
  const m = fillMO(ORD_1S, 3);
  return mcq({
    stem: 'The helium molecular ion He₂⁺ has been detected in a discharge tube. The bond order calculated from MO theory and the conclusion about its existence are:',
    right: `${fmtBO(m.bo)}, so the ion can exist`,
    wrong: ['0, so the ion cannot exist', '1, so the ion is as stable as H₂', '1.5, so the ion is more stable than H₂'],
    sol: `He₂⁺ has 3 electrons: σ1s² σ*1s¹. Bond order = (2 − 1)/2 = ${fmtBO(m.bo)} > 0, so a weakly bound ion exists — option (@K).`,
    d: 3, c: 'application', t: [1],
  });
})(), () => fillMO(ORD_1S, 3).bo === 0.5 || 'he2+');
add('mixing-mcq', mcq({
  stem: 'Why does nitrogen have its π2p orbitals below σ2pz, while in oxygen σ2pz lies below π2p?',
  right: 'In nitrogen the 2s–2p energy gap is small, so mixing of σ2s and σ2pz pushes σ2pz up; in oxygen the gap is large and there is no such mixing',
  wrong: ['Nitrogen has fewer electrons, so the π2p orbitals repel less', 'In oxygen the 2s orbital lies above the 2p orbitals, so σ2pz is lowered', 'Nitrogen forms a triple bond and oxygen a double bond, which reverses the order'],
  sol: 'The 2s and 2p levels are close for B, C and N, so σ2s and σ2pz (same symmetry) mix and σ2pz moves above π2p. From O onwards the gap is large and the mixing is negligible — option (@K).',
  d: 3, c: 'understanding', t: [1],
}));
add('bo-li-b-mcq', mcq({
  stem: `A data sheet compares Li₂ and B₂. Applying MO theory, which statement is correct?`,
  right: `Both have bond order ${fmtBO(bo('Li2'))}; Li₂ is diamagnetic and B₂ is paramagnetic`,
  wrong: ['Both have bond order 1 and both are diamagnetic', 'Li₂ has bond order 1 and B₂ has bond order 2', 'Both have bond order 1; Li₂ is paramagnetic and B₂ is diamagnetic'],
  sol: `Li₂: σ2s², bond order (2 − 0)/2 = ${fmtBO(bo('Li2'))}, no unpaired electron. B₂: σ2s² σ*2s² π2p¹π2p¹, bond order (4 − 2)/2 = ${fmtBO(bo('B2'))}, with one unpaired electron in each π2p orbital — option (@K).`,
  d: 3, c: 'application', t: [1],
}), () => bo('Li2') === 1 && bo('B2') === 1 && up('B2') === 2 && up('Li2') === 0 || 'li-b');

// ---------------------------------------------------------------- t02 paramagnetism of O2, stabilities
add('o2-para-mcq', mcq({
  stem: 'A drop of liquid oxygen poured between the poles of a strong magnet is held there. In the MO picture this happens because O₂ has:',
  right: 'two unpaired electrons, one in each of the two π*2p orbitals',
  wrong: ['no unpaired electrons, because all the bonding orbitals are full', 'one unpaired electron in the σ*2pz orbital', 'four unpaired electrons in the π2p orbitals'],
  sol: 'The 12 valence-MO electrons of O₂ fill σ2s, σ*2s, σ2pz and π2p; the last two enter the two degenerate π*2p orbitals singly (Hund). Unpaired electrons make O₂ paramagnetic — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('o2plus-mcq', mcq({
  stem: 'A student searches this list of species for one that is paramagnetic and has a bond order of 2.5: O₂⁺, N₂, O₂²⁻, F₂.',
  right: `${nm('O2+')}, which has ${up('O2+')} unpaired electron and bond order ${fmtBO(bo('O2+'))}`,
  wrong: [`${nm('N2')}, which has bond order ${fmtBO(bo('N2'))} and no unpaired electron`, `${nm('O2 2-')}, which has bond order ${fmtBO(bo('O2 2-'))} and no unpaired electron`, `${nm('F2')}, which has bond order ${fmtBO(bo('F2'))} and no unpaired electron`],
  sol: `O₂⁺ (11 valence-MO electrons) has σ2s² σ*2s² σ2pz² π2p⁴ π*2p¹: bond order (8 − 3)/2 = ${fmtBO(bo('O2+'))} and one unpaired electron. N₂ is 3, O₂²⁻ is 1 and F₂ is 1, all diamagnetic — option (@K).`,
  d: 3, c: 'application', t: [2],
}), () => bo('O2+') === 2.5 && up('O2+') === 1 && bo('N2') === 3 && bo('O2 2-') === 1 && bo('F2') === 1 || 'o2plus');
add('o2-lengths-mcq', mcq({
  stem: 'Superoxides, peroxides and dioxygenyl salts contain O₂⁻, O₂²⁻ and O₂⁺. For the four species O₂⁺, O₂, O₂⁻ and O₂²⁻ the order of increasing O–O bond length is:',
  right: `${nm('O2+')} < ${nm('O2')} < ${nm('O2-')} < ${nm('O2 2-')}`,
  wrong: [`${nm('O2 2-')} < ${nm('O2-')} < ${nm('O2')} < ${nm('O2+')}`, `${nm('O2')} < ${nm('O2+')} < ${nm('O2 2-')} < ${nm('O2-')}`, `${nm('O2-')} < ${nm('O2')} < ${nm('O2+')} < ${nm('O2 2-')}`],
  sol: `Bond orders are ${['O2+', 'O2', 'O2-', 'O2 2-'].map((k) => fmtBO(bo(k))).join(', ')}. A higher bond order means a shorter bond, so the lengths increase in the order O₂⁺ (${LEN['O2+']} pm) < O₂ (${LEN.O2}) < O₂⁻ (${LEN['O2-']}) < O₂²⁻ (${LEN['O2 2-']} pm) — option (@K).`,
  d: 3, c: 'application', t: [2],
}), () => bo('O2+') > bo('O2') && bo('O2') > bo('O2-') && bo('O2-') > bo('O2 2-') || 'o2len');
add('n2-same-mcq', mcq({
  stem: 'Two nitrogen-based ions, formed by removing or adding one electron to N₂, are compared in a stability table. They have:',
  right: `the same bond order, ${fmtBO(bo('N2+'))}, and are both paramagnetic`,
  wrong: ['the same bond order, 2.5, and are both diamagnetic', 'bond orders 3 and 2, and are both paramagnetic', 'bond orders 2.5 and 3.5, and are both paramagnetic'],
  sol: `N₂⁺ (9 valence-MO electrons) is σ2s² σ*2s² π2p⁴ σ2pz¹: bond order (7 − 2)/2 = ${fmtBO(bo('N2+'))}. N₂⁻ (11) is …σ2pz² π*2p¹: bond order (8 − 3)/2 = ${fmtBO(bo('N2-'))}. Each has one unpaired electron — option (@K).`,
  d: 3, c: 'application', t: [2],
}), () => bo('N2+') === 2.5 && bo('N2-') === 2.5 && up('N2+') === 1 && up('N2-') === 1 || 'n2same');
add('n2-para-mcq', mcq({
  stem: `A researcher lists N₂, N₂⁺, N₂⁻ and N₂²⁻ and counts the unpaired electrons in each using MO theory. The species with the largest number of unpaired electrons is:`,
  right: `${nm('N2 2-')}, with ${up('N2 2-')} unpaired electrons in the two π*2p orbitals`,
  wrong: [`${nm('N2')}, with ${up('N2')} unpaired electrons`, `${nm('N2+')}, with 2 unpaired electrons in π2p`, `${nm('N2-')}, with 3 unpaired electrons`],
  sol: `N₂²⁻ has 12 valence-MO electrons: …σ2pz² π*2p², and by Hund's rule the two π* electrons occupy separate orbitals with parallel spins: ${up('N2 2-')} unpaired. N₂ has ${up('N2')}, N₂⁺ and N₂⁻ have ${up('N2+')} each — option (@K).`,
  d: 3, c: 'application', t: [2],
}), () => up('N2 2-') === 2 && up('N2') === 0 && up('N2+') === 1 && up('N2-') === 1 || 'n2para');
add('n2plus-tf', tf({
  stem: 'The nitrogen molecular ion N₂⁺ is paramagnetic.',
  key: 't',
  sol: `True. N₂⁺ has 9 valence-MO electrons, and the last one occupies σ2pz alone, so it has ${up('N2+')} unpaired electron.`,
  d: 2, c: 'understanding', t: [2],
}), () => up('N2+') === 1 || 'n2plus');
add('antibond-tf', tf({
  stem: 'An antibonding molecular orbital has lower energy than the atomic orbitals from which it is formed.',
  key: 'f',
  sol: 'False. An antibonding orbital has higher energy than the atomic orbitals (and a node between the nuclei); it is the bonding orbital that is lower in energy.',
  d: 1, c: 'recall', t: [1],
}));
add('o2-unpaired-fill', fill({
  stem: 'The number of unpaired electrons in an oxygen molecule is ___.',
  acc: [['2', 'two', 'Two']],
  sol: `One electron sits in each of the two π*2p orbitals, so O₂ has ${up('O2')} unpaired electrons.`,
  d: 1, c: 'recall', t: [2],
}), () => up('O2') === 2 || 'o2up');
add('species-match', match({
  stem: 'Match each species with its bond order from MO theory.',
  pairs: [['O₂⁺', `${fmtBO(bo('O2+'))}`], ['O₂', `${fmtBO(bo('O2'))}`], ['O₂⁻', `${fmtBO(bo('O2-'))}`], ['O₂²⁻', `${fmtBO(bo('O2 2-'))}`]],
  order: [2, 1, 0, 3],
  sol: `O₂⁺ → ${fmtBO(bo('O2+'))}, O₂ → ${fmtBO(bo('O2'))}, O₂⁻ → ${fmtBO(bo('O2-'))}, O₂²⁻ → ${fmtBO(bo('O2 2-'))}: each added electron enters an antibonding π*2p orbital and lowers the bond order by 0.5.`,
  d: 3, c: 'application', t: [2],
}));

// ---- t01/t02 numericals
add('bo-num', num({
  stem: 'Potassium superoxide, KO₂, contains the ion O₂⁻. Fill its valence molecular orbitals in the order σ2s, σ*2s, σ2pz, π2p, π*2p, σ*2pz and find the bond order of O₂⁻.',
  value: bo('O2-'), tol: 0, unit: null,
  sol: r`O₂⁻ has $12 + 1 = 13$ valence-MO electrons: $\sigma 2s^2\ \sigma^*2s^2\ \sigma 2p_z^2\ \pi 2p^4\ \pi^*2p^3$. Bonding electrons $= 2 + 2 + 4 = 8$; antibonding electrons $= 2 + 3 = 5$. Bond order $= \dfrac{8 - 5}{2} = ${fmtBO(bo('O2-'))}$.`,
  scheme: [['Counts 13 valence-MO electrons and fills correctly', 0.5], ['8 bonding and 5 antibonding electrons', 0.5]],
  marks: 1, d: 3, c: 'application', t: [2],
}), (q) => bo('O2-') === 1.5 && q.answer.value === 1.5 && MO['O2-'].nb === 8 && MO['O2-'].na === 5 || 'bo-num');
add('unpaired-num', num({
  stem: 'Gaseous diboron, B₂, forms in a high-temperature furnace. Using the energy order in which π2p lies below σ2pz, how many unpaired electrons does B₂ have?',
  value: up('B2'), tol: 0, unit: null,
  sol: r`B₂ has $2 \times 3 = 6$ valence-MO electrons: $\sigma 2s^2\ \sigma^*2s^2$ and then two electrons for the degenerate $\pi 2p$ pair. By Hund's rule they enter separate orbitals, so the number of unpaired electrons $= ${up('B2')}$.`,
  scheme: [['6 valence-MO electrons, 4 in σ2s and σ*2s', 0.5], ['Last two enter separate π2p orbitals: 2', 0.5]],
  marks: 1, d: 3, c: 'application', t: [2],
}), (q) => up('B2') === 2 && q.answer.value === 2 || 'unpaired-num');

// ---- t01/t02 short answers
add('s2-bond-order', short({
  marks: 2,
  stem: 'Define bond order in molecular orbital theory. State how a higher bond order affects the stability and the bond length of a diatomic molecule.',
  model: 'Bond order is half the difference between the number of electrons in bonding molecular orbitals and the number in antibonding orbitals: bond order = (Nb − Na)/2. A molecule is stable if the bond order is positive. The higher the bond order, the more stable the molecule, the shorter the bond and the larger the bond enthalpy.',
  sol: 'Bond order = (Nb − Na)/2; higher means more stable, shorter bond.',
  scheme: [['Definition (Nb − Na)/2', 1], ['Higher bond order: more stable and shorter bond', 1]],
  d: 1, c: 'understanding', t: [1, 2],
}));
add('s2-bonding-anti', short({
  marks: 2,
  stem: 'Compare a bonding and an antibonding molecular orbital formed from two 1s atomic orbitals, in terms of electron density between the nuclei and of energy.',
  model: 'In the bonding orbital the two 1s wave functions add, so electron density is high between the nuclei and the energy is lower than that of the atomic orbitals. In the antibonding orbital they subtract, giving a node between the nuclei (little or no density), and the energy is higher than that of the atomic orbitals.',
  sol: 'Bonding: density between nuclei, lower energy; antibonding: node, higher energy.',
  scheme: [['Bonding: density between nuclei, lower energy', 1], ['Antibonding: node, higher energy', 1]],
  d: 2, c: 'understanding', t: [1],
}));
add('s2-paramag', short({
  marks: 2,
  stem: 'The Lewis structure O=O shows every electron paired, yet a stream of oxygen gas bends towards a magnet. Explain this with the molecular orbital configuration of O₂.',
  model: 'The Lewis structure suggests no unpaired electrons, but in MO theory O₂ has 12 valence-MO electrons: σ2s² σ*2s² σ2pz² π2p⁴ π*2p². The last two electrons go into the two degenerate π*2p orbitals one each (Hund\'s rule), with parallel spins. These two unpaired electrons make O₂ paramagnetic.',
  sol: 'π*2p² in two orbitals, one electron each: two unpaired electrons, paramagnetic.',
  scheme: [['Configuration σ2s² σ*2s² σ2pz² π2p⁴ π*2p²', 1], ['Two unpaired electrons in π*2p, so paramagnetic', 1]],
  d: 3, c: 'application', t: [2],
}));
add('s3-mo-config', short({
  marks: 3,
  stem: 'Write the valence molecular orbital configuration of N₂, calculate its bond order and state whether it is paramagnetic or diamagnetic.',
  model: `The valence-MO electrons of N₂ (10) fill the orbitals in the order σ2s < σ*2s < π2p < σ2pz, giving σ2s² σ*2s² π2p⁴ σ2pz². Bonding electrons Nb = 2 + 4 + 2 = 8 and antibonding electrons Na = 2, so bond order = (8 − 2)/2 = ${fmtBO(bo('N2'))}, a triple bond. All electrons are paired, so N₂ is diamagnetic.`,
  sol: `σ2s² σ*2s² π2p⁴ σ2pz²; bond order ${fmtBO(bo('N2'))}; diamagnetic.`,
  scheme: [['Configuration σ2s² σ*2s² π2p⁴ σ2pz²', 1], [`Bond order (8 − 2)/2 = ${fmtBO(bo('N2'))}`, 1], ['Diamagnetic (no unpaired electrons)', 1]],
  d: 2, c: 'application', t: [1, 2],
}), () => bo('N2') === 3 && up('N2') === 0 || 's3-mo-config');
add('s3-species-o', short({
  marks: 3,
  stem: 'Arrange O₂⁺, O₂, O₂⁻ and O₂²⁻ in decreasing order of bond order, giving the bond orders. State which species are paramagnetic and which has the longest O–O bond.',
  model: `The bond orders are O₂⁺ ${fmtBO(bo('O2+'))}, O₂ ${fmtBO(bo('O2'))}, O₂⁻ ${fmtBO(bo('O2-'))} and O₂²⁻ ${fmtBO(bo('O2 2-'))}, so the order is O₂⁺ > O₂ > O₂⁻ > O₂²⁻ (each extra electron enters an antibonding π*2p orbital). O₂⁺ (1 unpaired electron), O₂ (2) and O₂⁻ (1) are paramagnetic; O₂²⁻ has all electrons paired and is diamagnetic. O₂²⁻ has the lowest bond order and therefore the longest O–O bond.`,
  sol: `O₂⁺ ${fmtBO(bo('O2+'))} > O₂ ${fmtBO(bo('O2'))} > O₂⁻ ${fmtBO(bo('O2-'))} > O₂²⁻ ${fmtBO(bo('O2 2-'))}; first three paramagnetic; O₂²⁻ longest bond.`,
  scheme: [['Order with the four bond orders', 1], ['Paramagnetic species identified', 1], ['O₂²⁻ has the longest bond (lowest bond order)', 1]],
  d: 3, c: 'analysis', t: [2],
}), () => ['O2+', 'O2', 'O2-', 'O2 2-'].map(bo).join() === '2.5,2,1.5,1' || 's3-species-o');
add('s3-n2-species', short({
  marks: 3,
  stem: 'A table lists the species N₂, N₂⁺, N₂⁻ and N₂²⁻. Calculate the bond order of each from its valence-MO electrons and say which are paramagnetic.',
  model: `With 10, 9, 11 and 12 valence-MO electrons the bond orders are N₂ ${fmtBO(bo('N2'))}, N₂⁺ ${fmtBO(bo('N2+'))}, N₂⁻ ${fmtBO(bo('N2-'))} and N₂²⁻ ${fmtBO(bo('N2 2-'))}. N₂ is diamagnetic. N₂⁺ (one unpaired electron in σ2pz) and N₂⁻ (one in π*2p) are paramagnetic, and N₂²⁻ is paramagnetic with two unpaired electrons in the π*2p orbitals.`,
  sol: `N₂ ${fmtBO(bo('N2'))}; N₂⁺ ${fmtBO(bo('N2+'))}; N₂⁻ ${fmtBO(bo('N2-'))}; N₂²⁻ ${fmtBO(bo('N2 2-'))}; all but N₂ paramagnetic.`,
  scheme: [['Electron counts 10, 9, 11, 12', 0.5], ['Four bond orders 3, 2.5, 2.5, 2', 1.5], ['Paramagnetic species identified', 1]],
  d: 3, c: 'application', t: [2],
}), () => ['N2', 'N2+', 'N2-', 'N2 2-'].map(bo).join() === '3,2.5,2.5,2' || 's3-n2-species');
add('long-a', long({
  stem: `(a) Write the valence molecular orbital configuration of O₂ and calculate its bond order. [2]

(b) Explain why O₂ is paramagnetic, and compare the stability and bond length of O₂ with those of O₂⁺ and O₂²⁻. [3]`,
  model: `(a) The 12 valence-MO electrons give σ2s² σ*2s² σ2pz² π2p⁴ π*2p². Bonding electrons = 2 + 2 + 4 = 8 and antibonding electrons = 2 + 2 = 4, so bond order = (8 − 4)/2 = ${fmtBO(bo('O2'))}.

(b) The last two electrons occupy the two degenerate π*2p orbitals singly (Hund's rule), so O₂ has two unpaired electrons and is paramagnetic. O₂⁺ has one electron fewer in π*2p (bond order ${fmtBO(bo('O2+'))}), so it is more stable with a shorter bond (${LEN['O2+']} pm against ${LEN.O2} pm); O₂²⁻ has two more electrons in π*2p (bond order ${fmtBO(bo('O2 2-'))}), so it is less stable with a longer bond (${LEN['O2 2-']} pm), and it is diamagnetic.`,
  sol: `σ2s² σ*2s² σ2pz² π2p⁴ π*2p²; bond order ${fmtBO(bo('O2'))}; two unpaired electrons; O₂⁺ more stable, O₂²⁻ less stable.`,
  scheme: [['(a) Configuration', 1], [`(a) Bond order (8 − 4)/2 = ${fmtBO(bo('O2'))}`, 1], ['(b) Two unpaired electrons in π*2p, so paramagnetic', 1], ['(b) O₂⁺: higher bond order, more stable, shorter bond', 1], ['(b) O₂²⁻: lower bond order, less stable, longer bond', 1]],
  d: 3, c: 'application', t: [2],
}), () => bo('O2') === 2 && up('O2') === 2 || 'long-a');
add('long-species', long({
  stem: `Bond orders and magnetic data for some species are required.

(a) Calculate the bond order of N₂, N₂⁺ and N₂²⁻ from their valence-MO electrons (10, 9 and 12) using the energy order in which π2p lies below σ2pz. [3]

(b) Which of the three is the most stable, and which has two unpaired electrons? Give reasons. [2]`,
  model: `(a) N₂: σ2s² σ*2s² π2p⁴ σ2pz², Nb = 8, Na = 2, bond order = ${fmtBO(bo('N2'))}. N₂⁺: …σ2pz¹, Nb = 7, Na = 2, bond order = ${fmtBO(bo('N2+'))}. N₂²⁻: σ2s² σ*2s² π2p⁴ σ2pz² π*2p², Nb = 8, Na = 4, bond order = ${fmtBO(bo('N2 2-'))}.

(b) N₂ is the most stable because it has the highest bond order (3), a triple bond with all electrons paired. N₂²⁻ has two unpaired electrons, one in each of the two degenerate π*2p orbitals (Hund's rule).`,
  sol: `Bond orders ${fmtBO(bo('N2'))}, ${fmtBO(bo('N2+'))}, ${fmtBO(bo('N2 2-'))}; N₂ most stable; N₂²⁻ has two unpaired electrons.`,
  scheme: [['(a) N₂: (8 − 2)/2 = 3', 1], ['(a) N₂⁺: (7 − 2)/2 = 2.5', 1], ['(a) N₂²⁻: (8 − 4)/2 = 2', 1], ['(b) N₂ most stable: highest bond order', 1], ['(b) N₂²⁻: two electrons in separate π*2p orbitals', 1]],
  d: 4, c: 'analysis', t: [2],
}), () => bo('N2') === 3 && bo('N2+') === 2.5 && bo('N2 2-') === 2 && up('N2 2-') === 2 || 'long-species');

// ---------------------------------------------------------------- t03 coordinate bond
add('dative-def-mcq', mcq({
  stem: 'A coordinate (dative) covalent bond differs from an ordinary covalent bond in that it is formed when:',
  right: 'one atom supplies both electrons of the shared pair, from a lone pair, to an atom that has a vacant orbital',
  wrong: ['each atom supplies one electron to the shared pair, and the bond is weaker than a normal bond', 'one atom completely transfers an electron to another atom, forming ions', 'two atoms with vacant orbitals share the electrons of a third atom equally'],
  sol: 'The donor atom has a lone pair and the acceptor a vacant orbital; the pair is shared, and the bond is drawn as an arrow from donor to acceptor. Once formed it is like any other covalent bond — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('nh4-mcq', mcq({
  stem: 'In the ammonium ion of a fertiliser, one N–H bond forms by donation of the nitrogen lone pair to an H⁺ ion. Which statement about the four N–H bonds is correct?',
  right: 'All four are identical in length and strength, because once formed the coordinate bond cannot be told apart',
  wrong: ['The coordinate N–H bond is longer and weaker than the other three', 'The coordinate N–H bond is shorter and stronger than the other three', 'The coordinate bond is ionic, so the ion contains one ionic and three covalent bonds'],
  sol: 'In NH₄⁺ the four N–H bonds are equivalent (tetrahedral, equal bond lengths); the origin of the shared pair does not affect the bond — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('h3o-mcq', mcq({
  stem: 'Hydronium ions are present in every acid solution. In H₃O⁺ the oxygen atom carries:',
  right: 'one lone pair, and one of its three O–H bonds is a coordinate bond',
  wrong: ['two lone pairs, and all three O–H bonds are ordinary covalent bonds', 'one lone pair, and all three O–H bonds are ordinary covalent bonds', 'no lone pair, and two of the three O–H bonds are coordinate bonds'],
  sol: 'Oxygen has 6 valence electrons: two O–H bonds use two of them, and one lone pair is donated to H⁺ to make the third bond; one lone pair remains (6 + 3 − 1 = 8 electrons) — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('hclo4-mcq', mcq({
  stem: 'Perchloric acid is drawn with one O–H group and the chlorine atom bonded to the remaining oxygen atoms. The number of coordinate bonds from chlorine in HClO₄, and the oxidation state of chlorine, are respectively:',
  right: `${clDative(4)} coordinate bonds and +${2 * 4 - 1}`,
  wrong: ['4 coordinate bonds and +7', '3 coordinate bonds and +5', '1 coordinate bond and +7'],
  sol: `Chlorine has 7 valence electrons: one forms the Cl–O(H) bond and the three lone pairs are donated to three oxygen atoms (Cl → O), giving ${clDative(4)} coordinate bonds and no lone pair on Cl. Oxidation state: 1 + x − 8 = 0, x = +7 — option (@K).`,
  d: 3, c: 'application', t: [3],
}), () => clDative(4) === 3 && clLonePairs(4) === 0 || 'hclo4');
add('hno3-mcq', mcq({
  stem: 'In the structure of nitric acid that shows a coordinate bond, nitrogen is bonded as follows:',
  right: 'one single bond to OH, one double bond to O and one coordinate bond to the third O, with no lone pair on N',
  wrong: ['one single bond to OH and two double bonds to O, with one lone pair on N', 'three single bonds to oxygen and one coordinate bond to hydrogen', 'one triple bond to O and two single bonds to OH, with no lone pair on N'],
  sol: 'HO–N(=O)→O: nitrogen has 5 valence electrons; 3 are used in the single bond and the double bond, and its lone pair is donated to the third oxygen atom. N therefore has no lone pair left — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('s2-coordinate', short({
  marks: 2,
  stem: 'State the conditions for the formation of a coordinate bond and show, with the ammonia–proton reaction, how the ammonium ion is formed.',
  model: r`A coordinate bond needs a donor atom with a lone pair and an acceptor with a vacant orbital. In $\ce{NH3 + H+ -> NH4+}$ the nitrogen of NH₃ donates its lone pair to the vacant 1s orbital of H⁺ to give N → H; in NH₄⁺ all four N–H bonds are then identical.`,
  sol: 'Donor lone pair and acceptor vacant orbital; N → H in NH₄⁺.',
  scheme: [['Conditions: lone pair on donor, vacant orbital on acceptor', 1], ['N → H bond formed in NH₄⁺ (equation or diagram)', 1]],
  d: 1, c: 'understanding', t: [3],
}));
add('s3-cl-oxy', short({
  marks: 3,
  stem: 'Draw the structures of chloric acid, HClO₃, and perchloric acid, HClO₄, showing the coordinate bonds as arrows. State the number of coordinate bonds and the number of lone pairs left on chlorine in each.',
  model: `HClO₃: H–O–Cl with Cl → O arrows to two oxygen atoms: ${clDative(3)} coordinate bonds and ${clLonePairs(3)} lone pair left on chlorine. HClO₄: H–O–Cl with Cl → O arrows to three oxygen atoms: ${clDative(4)} coordinate bonds and ${clLonePairs(4)} lone pairs on chlorine. Chlorine has one electron for the single bond to OH and three lone pairs (6 electrons) to donate, so each coordinate bond uses up one lone pair.`,
  sol: `HClO₃: ${clDative(3)} coordinate bonds, ${clLonePairs(3)} lone pair; HClO₄: ${clDative(4)} coordinate bonds, ${clLonePairs(4)} lone pairs.`,
  scheme: [['HClO₃ structure with 2 arrows', 1], ['HClO₄ structure with 3 arrows', 1], ['Lone pairs left on Cl: 1 and 0', 1]],
  d: 3, c: 'application', t: [3],
}), () => clDative(3) === 2 && clLonePairs(3) === 1 && clDative(4) === 3 && clLonePairs(4) === 0 || 's3-cl-oxy');
add('s3-o3', short({
  marks: 3,
  stem: 'Draw the structure of ozone showing a coordinate bond and state the numbers of lone pairs on each oxygen atom. Why are the two O–O bonds of ozone found to be equal in length?',
  model: 'Structure: O=O → O (bent, 117°). The oxygen at the double-bond end has 2 lone pairs, the central oxygen has 1 lone pair (one double bond and one coordinate bond), and the oxygen at the coordinate end has 3 lone pairs (18 electrons in all). The two O–O bonds are equal (128 pm) because ozone is a resonance hybrid of two equivalent structures, O=O → O and O ← O=O, in which the double and the coordinate bond exchange places, so each bond has an order of 1.5.',
  sol: 'O=O→O with lone pairs 2, 1, 3; resonance hybrid, bond order 1.5, bonds equal.',
  scheme: [['Structure with the coordinate bond', 1], ['Lone pairs 2, 1 and 3', 1], ['Equal bonds: resonance hybrid, bond order 1.5', 1]],
  d: 3, c: 'application', t: [3, 4],
}));
add('s3-hno3', short({
  marks: 3,
  stem: 'Show by an electron-dot or line structure that nitric acid contains one coordinate bond. Count the valence electrons used in the structure to check it.',
  model: 'HO–N(=O)→O. Valence electrons: H 1 + N 5 + 3 × O 6 = 24. In the structure there are 5 bonding pairs (H–O, O–N, N=O counted as two, N→O) and 7 lone pairs (2 on the OH oxygen, 2 on the double-bonded oxygen, 3 on the coordinate oxygen), which is 12 pairs = 24 electrons. Nitrogen has no lone pair left because it donated one pair to the third oxygen.',
  sol: '24 electrons = 12 pairs; one N → O bond.',
  scheme: [['Correct structure', 1], ['Coordinate bond identified', 1], ['Electron count of 24', 1]],
  d: 3, c: 'application', t: [3],
}));
add('long-coord', long({
  stem: `(a) Draw the structures of the ammonium ion and the hydronium ion, showing the coordinate bonds as arrows from donor to acceptor. [3]

(b) Why do all four N–H bonds in NH₄⁺ have the same length although one of them was formed as a coordinate bond? [2]`,
  model: `(a) NH₄⁺: N with three N–H lines and one arrow N → H (no lone pair on N); H₃O⁺: O with two O–H lines, one arrow O → H and one lone pair on O. In each case the donor lone pair is shared with the vacant 1s orbital of H⁺.

(b) Once the pair has been shared, the bond is simply a shared pair of electrons between N and H; the nitrogen uses equivalent sp³ hybrid orbitals in all four bonds (tetrahedral ion), so the coordinate bond cannot be distinguished from the others by length or strength.`,
  sol: 'N → H and O → H shown; shared pair is the same wherever it came from; sp³ tetrahedral.',
  scheme: [['(a) NH₄⁺ with N → H', 1.5], ['(a) H₃O⁺ with O → H and one lone pair', 1.5], ['(b) Shared pair identical once formed', 1], ['(b) Equivalent sp³ orbitals, tetrahedral', 1]],
  d: 3, c: 'application', t: [3],
}));
add('ar-nh4', ar({
  a: 'The ammonium ion contains a coordinate bond.',
  r: 'The coordinate N–H bond in NH₄⁺ is longer and weaker than the other three N–H bonds.',
  key: 'c',
  sol: 'Assertion is true: one N–H bond is formed by donation of the lone pair of nitrogen to H⁺. Reason is false: all four N–H bonds in NH₄⁺ are identical — option (c).',
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t04 resonance
add('res-def-mcq', mcq({
  stem: 'A chemist writes two or more Lewis structures for the same molecule that differ only in the positions of electrons. In resonance theory the actual molecule is:',
  right: 'a single resonance hybrid, more stable than any one of the contributing structures',
  wrong: ['a rapidly interconverting equilibrium mixture of the contributing structures', 'the most stable of the contributing structures only', 'an average of the structures in which the atoms also change their positions'],
  sol: 'The contributing structures are imaginary; only the hybrid exists, with electrons delocalised, and its energy is lower than that of any single structure. It is not an equilibrium, and the atoms keep fixed positions — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('co3-mcq', mcq({
  stem: 'Washing soda contains the carbonate ion, CO₃²⁻. All three C–O bonds are found by X-ray work to be 129 pm long, between a C=O bond (122 pm) and a C–O bond (143 pm). This is explained by:',
  right: 'resonance among three equivalent structures, giving each C–O bond a bond order of 4/3',
  wrong: ['one C=O and two C–O bonds that rotate so quickly that they cannot be measured separately', 'ionic bonding between C⁴⁺ and three O²⁻ ions with no covalent character', 'two C=O double bonds and one C–O single bond, giving an average order of 1.67'],
  sol: `Each of the three structures has one C=O and two C–O bonds; the double bond occupies each position in turn, so each bond has order (2 + 1 + 1)/3 = ${(resBO('CO3')).toFixed(2)}, between 1 and 2, and a length between 143 and 122 pm — option (@K).`,
  d: 3, c: 'application', t: [4],
}), () => near(resBO('CO3'), 4 / 3, 1e-9) || 'co3');
add('no3-mcq', mcq({
  stem: 'In the nitrate ion, NO₃⁻, three equivalent resonance structures can be drawn. In the hybrid, the charge on each oxygen atom is:',
  right: `−1/3 (about ${(q23(-1, 3)).toFixed(2)})`,
  wrong: ['−1 on one oxygen and 0 on the other two', '−2/3 on each oxygen', '+1/3 on each oxygen'],
  sol: 'The single negative charge of the ion is shared equally over the three equivalent oxygen atoms: −1/3 on each (the nitrogen carries +1 and each structure has two O⁻ and one neutral O) — option (@K).',
  d: 3, c: 'application', t: [4],
}), () => near(q23(-1, 3), -1 / 3, 1e-9) || 'no3');
add('o3bond-mcq', mcq({
  stem: 'The O–O bond lengths are 121 pm in O₂ (double bond) and 148 pm in H₂O₂ (single bond), both given. In ozone both O–O bonds are 128 pm long. The best explanation is that ozone:',
  right: `is a resonance hybrid in which each O–O bond has an order of ${resBO('O3')}`,
  wrong: ['has one O=O bond of 121 pm and one O–O bond of 148 pm, averaged by the experiment', 'is held together only by ionic bonds between O⁺ and O⁻', 'has two O=O double bonds, each of order 2'],
  sol: `The two equivalent structures O=O–O and O–O=O share one double and one single bond over two positions, so each bond has order (2 + 1)/2 = ${resBO('O3')}, giving a length (128 pm) between 121 and 148 pm — option (@K).`,
  d: 3, c: 'application', t: [4],
}), () => resBO('O3') === 1.5 || 'o3bond');
add('res-num', num({
  stem: 'The carbonate ion has three equivalent resonance structures, each with one C=O double bond and two C–O single bonds. What is the bond order of each C–O bond in the hybrid?',
  value: Number(resBO('CO3').toFixed(2)), tol: 0.01, unit: null,
  sol: r`Each structure has $2 + 1 + 1 = 4$ bonds shared over 3 equal positions, so the bond order $= \dfrac{4}{3} = ${resBO('CO3').toFixed(2)}$.`,
  scheme: [['Total of 4 bonds over 3 positions', 0.5], ['1.33', 0.5]],
  marks: 1, d: 2, c: 'application', t: [4],
}), (q) => near(resBO('CO3'), 1.3333, 1e-3) && q.answer.value === 1.33 || 'res-num');
add('res-fill', fill({
  stem: 'In the resonance hybrid of the carbonate ion the three C–O bonds are ___ in length.',
  acc: [['equal', 'the same', 'identical']],
  sol: 'The hybrid has three equivalent C–O bonds of bond order 4/3, so all three are equal in length (129 pm).',
  d: 1, c: 'recall', t: [4],
}));
add('s2-resonance', short({
  marks: 2,
  stem: 'What is meant by resonance? State why the resonance hybrid of a molecule such as ozone is more stable than any one of its contributing structures.',
  model: 'Resonance is the representation of one molecule by two or more Lewis structures that differ only in the arrangement of electrons, the real molecule being a hybrid of them. In ozone the electrons are delocalised over all three oxygen atoms, which lowers the energy, so the hybrid is more stable than any single structure (the difference is the resonance energy).',
  sol: 'Several structures differing in electron positions; delocalisation lowers energy (resonance energy).',
  scheme: [['Definition of resonance', 1], ['Delocalisation gives lower energy / resonance energy', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('s2-co2', short({
  marks: 2,
  stem: 'Write the three resonance structures of carbon dioxide and state which is the main contributor.',
  model: 'The structures are O=C=O, ⁻O–C≡O⁺ and ⁺O≡C–O⁻. The main contributor is O=C=O, because it has no separation of charge and each atom has an octet; the other two are minor contributors.',
  sol: 'O=C=O (main); ⁻O–C≡O⁺ and ⁺O≡C–O⁻ (minor).',
  scheme: [['Three structures drawn', 1], ['O=C=O identified as main (no charge separation)', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('s3-res-co3', short({
  marks: 3,
  stem: 'Draw the three resonance structures of the carbonate ion, calculate the bond order of each C–O bond in the hybrid, and explain why all C–O bonds are equal in length.',
  model: `The three structures each have one C=O double bond and two C–O⁻ single bonds (the double bond occupies each position in turn), with a charge of −1 on each of two oxygens. The bond order of each C–O bond in the hybrid is (2 + 1 + 1)/3 = ${resBO('CO3').toFixed(2)}. The ion is a single resonance hybrid, not a mixture, so the three bonds are identical, with the same length (129 pm), between a C=O and a C–O single bond.`,
  sol: `Three structures; bond order = 4/3 = ${resBO('CO3').toFixed(2)}; equal bonds in the hybrid.`,
  scheme: [['Three structures with C=O in each position', 1], [`Bond order 4/3 = ${resBO('CO3').toFixed(2)}`, 1], ['Equal lengths: hybrid, equivalent bonds', 1]],
  d: 3, c: 'application', t: [4],
}), () => near(resBO('CO3'), 1.3333, 1e-3) || 's3-res-co3');
add('long-res', long({
  stem: `The nitrate ion and the ozone molecule are both described by resonance.

(a) Draw the three resonance structures of NO₃⁻ and the two of O₃ (formal charges shown). [2]

(b) Calculate the N–O bond order in the nitrate hybrid and the O–O bond order in the ozone hybrid, and state the charge on each oxygen atom of NO₃⁻. [3]`,
  model: `(a) NO₃⁻: three structures, each with N⁺ bonded to one O by a double bond and to two O⁻ by single bonds; the double bond is on a different oxygen in each. O₃: O=O⁺–O⁻ and ⁻O–O⁺=O, the formal charges +1 on the central atom and −1 on one end.

(b) N–O bond order = (2 + 1 + 1)/3 = ${resBO('NO3').toFixed(2)}; O–O bond order = (2 + 1)/2 = ${resBO('O3')}; each oxygen of NO₃⁻ carries −1/3 of the ion's charge (about ${q23(-1, 3).toFixed(2)}).`,
  sol: `N–O ${resBO('NO3').toFixed(2)}; O–O ${resBO('O3')}; −1/3 on each O.`,
  scheme: [['(a) Three structures of NO₃⁻', 1], ['(a) Two structures of O₃ with formal charges', 1], [`(b) N–O bond order 4/3 = ${resBO('NO3').toFixed(2)}`, 1], [`(b) O–O bond order ${resBO('O3')}`, 1], ['(b) −1/3 on each oxygen', 1]],
  d: 3, c: 'application', t: [4],
}), () => near(resBO('NO3'), 4 / 3, 1e-9) && resBO('O3') === 1.5 || 'long-res');
add('ar-resonance', ar({
  a: 'The carbonate ion has two C–O single bonds and one C=O double bond of different lengths.',
  r: 'The three resonance structures of the carbonate ion interconvert rapidly, so the ion is an equilibrium mixture of them.',
  key: 'd',
  sol: 'Assertion is false: X-ray work shows three equal C–O bonds (129 pm), and the hybrid has bond order 4/3 for each. Reason is false: the structures are not real, they do not interconvert, and the ion is a single hybrid, not a mixture — option (d).',
  d: 3, c: 'analysis', t: [4],
}));

// ---------------------------------------------------------------- t05 hydrogen bonding
add('hbond-cond-mcq', mcq({
  stem: 'A student lists molecules that may form hydrogen bonds with each other. Which condition must be met for a hydrogen bond to form between two molecules?',
  right: 'Hydrogen is covalently bonded to a small, highly electronegative atom (F, O or N) and is attracted to a lone pair on such an atom of a neighbouring molecule',
  wrong: ['Hydrogen is bonded to any non-metal, and the neighbouring molecule needs a vacant d orbital', 'Both molecules must be ionic and must carry full opposite charges', 'Hydrogen is bonded to carbon, and the neighbouring molecule is non-polar'],
  sol: 'A hydrogen bond needs H attached to F, O or N (small, strongly electronegative, so H is strongly δ⁺), and a lone pair on F, O or N of a neighbour — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('hbond-bp-mcq', mcq({
  stem: `The boiling points of the group 16 hydrides are H₂O ${BP[16][0][1]} K, H₂S ${BP[16][1][1]} K, H₂Se ${BP[16][2][1]} K and H₂Te ${BP[16][3][1]} K. The unusually high value for water is best explained by:`,
  right: 'hydrogen bonding between water molecules, which H₂S, H₂Se and H₂Te cannot form to any significant extent',
  wrong: ['the larger molecular mass of water compared with H₂S', 'the weaker O–H covalent bond, which makes water molecules break up on heating', 'the larger atomic size of oxygen, which increases van der Waals forces'],
  sol: 'Without hydrogen bonding the boiling points would fall from H₂Te to H₂O with decreasing molar mass. O is small and highly electronegative, so water molecules form hydrogen bonds, which need extra energy to break — option (@K).',
  d: 2, c: 'application', t: [5],
}), () => BP[16][0][1] > BP[16][3][1] || 'bp16');
add('ice-mcq', mcq({
  stem: 'In a cold lake, a layer of ice floats on the water below it. Which statement about the structure of ice explains this?',
  right: 'Each H₂O is hydrogen bonded to four others in an open hexagonal arrangement with empty space, so ice is less dense than water',
  wrong: ['Ice has no hydrogen bonds, so its molecules are far apart', 'Each H₂O in ice is bonded to six others in a close-packed arrangement', 'The O–H covalent bonds in ice are longer than in water, which lowers its mass'],
  sol: 'In ice each water molecule forms four hydrogen bonds (tetrahedrally) in an open cage-like lattice; on melting, part of the structure collapses, so liquid water (1.00 g cm⁻³ at 4 °C) is denser than ice (0.92 g cm⁻³) — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('onitro-mcq', mcq({
  stem: 'A mixture of o-nitrophenol and p-nitrophenol is distilled with steam. The compound that distils over with the steam is:',
  right: 'o-nitrophenol, because intramolecular hydrogen bonding makes its molecules less associated and more volatile',
  wrong: ['p-nitrophenol, because its molecules form hydrogen bonds with water and carry it over', 'o-nitrophenol, because it forms strong intermolecular hydrogen bonds with water', 'neither, because both are held by the same extent of hydrogen bonding'],
  sol: 'In o-nitrophenol the OH forms a hydrogen bond with the neighbouring NO₂ group within the same molecule (chelation), so molecules are not linked to each other and the compound is steam volatile. p-Nitrophenol molecules are linked by intermolecular hydrogen bonds — option (@K).',
  d: 3, c: 'application', t: [5],
}));
add('hf-short2', short({
  marks: 2,
  stem: 'Hydrogen fluoride exists as zigzag chains in the solid state. Name the interaction between the HF molecules and say why it forms for fluorine, but not for chlorine.',
  model: 'The molecules are linked by hydrogen bonds, H–F···H–F. Fluorine is small and the most electronegative element, so the H–F bond is strongly polarised (H is δ⁺) and the lone pairs on F attract the H of a neighbour. Chlorine is larger and less electronegative, so HCl forms no significant hydrogen bonds.',
  sol: 'Hydrogen bonds; F small and most electronegative, Cl not.',
  scheme: [['Hydrogen bond H–F···H–F', 1], ['F small and highly electronegative; Cl larger and less so', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('s2-hbond-types', short({
  marks: 2,
  stem: 'Distinguish between intermolecular and intramolecular hydrogen bonding, giving one example of each.',
  model: 'Intermolecular hydrogen bonds are formed between two or more separate molecules (for example in water, HF or ethanol) and associate the molecules, raising the boiling point. Intramolecular hydrogen bonds are formed within one molecule, between an H and a neighbouring electronegative atom in the same molecule (for example in o-nitrophenol), and form a ring that stops the molecules from associating.',
  sol: 'Between molecules (water/HF/ethanol) against within one molecule (o-nitrophenol).',
  scheme: [['Intermolecular: between molecules, with example', 1], ['Intramolecular: within one molecule, with example', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('s2-onitro', short({
  marks: 2,
  stem: 'o-Nitrophenol melts at 318 K while p-nitrophenol melts at 387 K. Explain the difference using the kind of hydrogen bonding in each.',
  model: 'In o-nitrophenol the OH group and the NO₂ group are adjacent, so the O–H···O bond closes a ring inside the molecule (intramolecular); the molecules are not linked to each other and little energy is needed to separate them. In p-nitrophenol the groups are far apart, so the O–H of one molecule bonds to the NO₂ of another (intermolecular), associating the molecules, and more energy is needed to melt it.',
  sol: 'Ortho: intramolecular, lower mp; para: intermolecular, higher mp.',
  scheme: [['o-isomer: intramolecular H-bond, molecules not associated', 1], ['p-isomer: intermolecular H-bond, higher melting point', 1]],
  d: 3, c: 'application', t: [5],
}));
add('s2-water-effects', short({
  marks: 2,
  stem: 'State two effects of hydrogen bonding on the physical properties of water, with a reason for each.',
  model: 'Water has a high boiling point (373 K, against 213 K for H₂S), because extra energy is needed to break the hydrogen bonds between its molecules. Ice is less dense than liquid water, because hydrogen bonding holds the molecules in an open hexagonal lattice with empty space. (Also acceptable: high surface tension and viscosity, and high solubility of alcohols and sugars in water.)',
  sol: 'High boiling point; ice less dense than water.',
  scheme: [['One effect with reason', 1], ['A second effect with reason', 1]],
  d: 1, c: 'understanding', t: [5],
}));
add('s3-ice', short({
  marks: 3,
  stem: 'Describe the arrangement of water molecules in ice and use it to explain why ice floats on water and why a full bottle of water may burst in a freezer.',
  model: 'In ice each oxygen is bonded to two H atoms by covalent bonds and to two more H atoms by hydrogen bonds, so each H₂O is linked tetrahedrally to four neighbours. The result is an open lattice of hexagonal rings with large empty spaces. When ice melts, some hydrogen bonds break and the molecules move into the spaces, so liquid water is denser (1.00 g cm⁻³ at 4 °C) than ice (0.92 g cm⁻³), and ice floats. On freezing, water expands by about 9 %, so a full sealed bottle can burst.',
  sol: 'Open hexagonal lattice, four H-bonds per molecule; ice less dense; water expands on freezing.',
  scheme: [['Tetrahedral four H-bonds, open hexagonal lattice', 1], ['Ice less dense (0.92 against 1.00 g cm⁻³), floats', 1], ['Expansion on freezing bursts a full bottle', 1]],
  d: 2, c: 'analysis', t: [5],
}), () => near(1 / 0.92, 1.087, 0.005) || 's3-ice');
add('s3-bp-trend', short({
  marks: 3,
  stem: `The boiling points of the group 17 hydrides are HF ${BP[17][0][1]} K, HCl ${BP[17][1][1]} K, HBr ${BP[17][2][1]} K and HI ${BP[17][3][1]} K. Explain the trend from HCl to HI and the unexpected value for HF.`,
  model: `From HCl to HI the boiling point rises (${BP[17][1][1]} → ${BP[17][2][1]} → ${BP[17][3][1]} K) because the molecules become larger and heavier, so the dispersion forces between them increase. If this trend continued, HF should boil lowest, at about 160 K; its actual value (${BP[17][0][1]} K) is far higher, about ${BP[17][0][1] - 160} K more, because the small, highly electronegative fluorine atom gives strong hydrogen bonds H–F···H–F between molecules, and extra energy is needed to break them.`,
  sol: `Heavier molecules, stronger dispersion forces from HCl to HI; HF hydrogen bonded, so far above the trend.`,
  scheme: [['Rising trend from larger, heavier molecules', 1], ['HF would be expected to be lowest', 1], ['Hydrogen bonding explains the high boiling point of HF', 1]],
  d: 3, c: 'analysis', t: [5],
}));
add('hbonds-num', (() => {
  const mol = 9.0 / 18;
  const nb = mol * NA * 2;
  return num({
    stem: 'A 9.0 g piece of ice is warmed from a freezer. Each water molecule in ice makes four hydrogen bonds, and each bond is shared between two molecules. Taking H₂O = 18 g mol⁻¹ and N_A = 6.022 × 10²³ mol⁻¹, how many hydrogen bonds does the sample contain, in units of 10²³?',
    value: Number((nb / 1e23).toFixed(1)), tol: 0.1, unit: '× 10²³',
    sol: r`Amount of water $= \dfrac{9.0}{18} = ${mol.toFixed(2)}$ mol, so molecules $= ${mol.toFixed(2)} \times 6.022 \times 10^{23} = ${(mol * NA / 1e23).toFixed(3)} \times 10^{23}$. Bonds per molecule $= 4 \div 2 = 2$, so hydrogen bonds $= 2 \times ${(mol * NA / 1e23).toFixed(3)} \times 10^{23} = ${(nb / 1e23).toFixed(1)} \times 10^{23}$. In units of $10^{23}$ the answer is $= ${(nb / 1e23).toFixed(1)}$.`,
    scheme: [['0.50 mol and 3.011 × 10²³ molecules', 0.5], ['2 bonds per molecule: 6.0 × 10²³', 0.5]],
    marks: 1, d: 3, c: 'application', t: [5],
  });
})(), (q) => near((9 / 18) * 6.022e23 * 2, 6.022e23, 1e-9) && q.answer.value === 6.0 || 'hbonds-num');
add('long-hbond', long({
  stem: `The table gives the boiling points of the group 16 hydrides: H₂O ${BP[16][0][1]} K, H₂S ${BP[16][1][1]} K, H₂Se ${BP[16][2][1]} K, H₂Te ${BP[16][3][1]} K.

(a) Explain the trend from H₂S to H₂Te and why water does not follow it. [3]

(b) Explain, using hydrogen bonding, why ice is less dense than water and why ethanol (351 K) boils much higher than its isomer dimethyl ether, CH₃OCH₃ (249 K). [2]`,
  model: `(a) From H₂S to H₂Te the boiling point rises (${BP[16][1][1]} → ${BP[16][2][1]} → ${BP[16][3][1]} K) as the molecules become larger and heavier and dispersion forces grow. Water, with the lightest molecule, would be expected to boil lowest, but its value (${BP[16][0][1]} K) is highest, because oxygen is small and highly electronegative, so water molecules form strong hydrogen bonds, each needing extra energy to break.

(b) Ice has each molecule hydrogen bonded to four others in an open lattice with empty space, so it is less dense than liquid water. Ethanol has an O–H group, so its molecules are linked by O–H···O hydrogen bonds; dimethyl ether has no O–H and only weak dipole forces, so it boils lower.`,
  sol: 'Dispersion forces rise down the group; water hydrogen bonded; ice open lattice; ethanol H-bonded, ether not.',
  scheme: [['(a) Rising trend: larger molecules, stronger dispersion forces', 1], ['(a) Water expected to be lowest', 1], ['(a) Hydrogen bonding in water', 1], ['(b) Ice: open lattice, lower density', 1], ['(b) Ethanol has O–H and H-bonds; ether has none', 1]],
  d: 4, c: 'analysis', t: [5],
}));
add('ar-ice', ar({
  a: 'Ice floats on liquid water.',
  r: 'In ice the water molecules are held by hydrogen bonds in an open hexagonal structure, which makes ice less dense than water.',
  key: 'a',
  sol: 'Both statements are true. The open structure with empty space gives ice a lower density (0.92 g cm⁻³) than water, so it floats; R explains A — option (a).',
  d: 2, c: 'understanding', t: [5],
}));

// ---------------------------------------------------------------- remaining assertion-reason items
add('ar-he2', ar({
  a: 'The helium molecule, He₂, does not exist as a stable species.',
  r: 'Its four electrons fill both the σ1s and the σ*1s orbitals, so the bond order is zero.',
  key: 'a',
  sol: 'Both statements are true. Bond order = (2 − 2)/2 = 0, so there is no net bonding and R explains A — option (a).',
  d: 2, c: 'understanding', t: [1],
}), () => bo('He2') === 0 || 'he2');
add('ar-mix', ar({
  a: 'In the nitrogen molecule the σ2pz orbital lies at higher energy than the π2p orbitals.',
  r: 'The atomic number of nitrogen is 7.',
  key: 'b',
  sol: 'Both statements are true, but the atomic number is not the reason. The order arises from s–p mixing, which is strong because the 2s–2p gap in nitrogen is small — option (b).',
  d: 3, c: 'analysis', t: [1],
}));
add('ar-o2', ar({
  a: 'The oxygen molecule is paramagnetic.',
  r: 'There is a double bond between the two oxygen atoms.',
  key: 'b',
  sol: 'Both statements are true. But paramagnetism comes from the two unpaired electrons in the π*2p orbitals, not from the double bond — option (b).',
  d: 3, c: 'analysis', t: [2],
}));

// ---------------------------------------------------------------- remaining matches
add('hbond-match', match({
  stem: 'Match each substance with the hydrogen-bonded structure it shows.',
  pairs: [['HF (solid)', 'zigzag chains of molecules'], ['Ice', 'open hexagonal lattice, four bonds per molecule'], ['Ethanol (liquid)', 'O–H···O links forming chains'], ['o-Nitrophenol', 'ring closed inside one molecule']],
  order: [1, 3, 0, 2],
  sol: 'HF → zigzag chains; ice → open hexagonal lattice with four bonds per molecule; ethanol → O–H···O chains; o-nitrophenol → ring closed inside one molecule (intramolecular).',
  d: 2, c: 'understanding', t: [5],
}));
add('hbond-fill', fill({
  stem: 'Hydrogen bonds are formed only when hydrogen is bonded to fluorine, oxygen or ___.',
  acc: [['nitrogen', 'Nitrogen', 'N']],
  sol: 'F, O and N are small and highly electronegative atoms with lone pairs, so hydrogen bonds form with nitrogen as well.',
  d: 1, c: 'recall', t: [5],
}));
add('coord-tf', tf({
  stem: 'In the hydronium ion, the O–H bond formed by donation of an oxygen lone pair to H⁺ cannot be distinguished from the other two O–H bonds.',
  key: 't',
  sol: 'True. After the pair is shared the three O–H bonds are equivalent, so the ion has three identical bonds.',
  d: 2, c: 'understanding', t: [3],
}));
