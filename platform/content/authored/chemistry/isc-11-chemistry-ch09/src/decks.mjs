// ISC 11 Chemistry ch09 Molecular Orbital Theory, Coordinate Bonds, Resonance and Hydrogen Bonding: two decks. Part 1 (t01-t02)
// molecular orbital theory, bond order, magnetism and stability of homonuclear diatomics; Part 2 (t03-t05) coordinate bonds,
// resonance, hydrogen bonding.
import { sl, deck, table, svgV, r } from './lib.mjs';
import { MO_SHAPES, MO_H2, MO_ORDERS, MO_N2, MO_O2, MO_SERIES, DATIVE_IONS, CL_OXY, HNO3_O3, RESON_A, RESON_B, HBOND_HF_WATER, ICE_RING, HBOND_ORG, BP_HYDRIDES } from './svgs.mjs';
import { MO, config, fmtBO, magnet, LEN, ENTH, resBO, q23, clDative, clLonePairs, clOxState, BP, NA } from './data.mjs';

export const V = {
  shapes: svgV(MO_SHAPES, 'Bonding and antibonding molecular orbitals formed from two 1s orbitals and from two parallel 2p orbitals', 'In phase: bonding. Out of phase: antibonding with a node.'),
  h2: svgV(MO_H2, 'Molecular orbital diagrams of H2 with bond order 1 and He2 with bond order 0', 'H₂ exists; He₂ does not.'),
  orders: svgV(MO_ORDERS, 'The two energy orderings of molecular orbitals: pi 2p below sigma 2pz up to N2, and sigma 2pz below pi 2p for O2 and F2', 'The order changes after nitrogen.'),
  n2: svgV(MO_N2, 'Molecular orbital diagram of N2 with ten valence electrons, bond order 3, diamagnetic', 'N₂: σ2s² σ*2s² π2p⁴ σ2pz².'),
  o2: svgV(MO_O2, 'Molecular orbital diagram of O2 with twelve valence electrons, bond order 2, two unpaired electrons', 'O₂: …σ2pz² π2p⁴ π*2p², paramagnetic.'),
  series: svgV(MO_SERIES, 'Bar chart of bond orders of the oxygen species and the nitrogen species with magnetic behaviour', 'Bond order falls as electrons enter π*2p.'),
  dative: svgV(DATIVE_IONS, 'Formation of NH4 plus from NH3 and H plus, and H3O plus from H2O and H plus, with dative arrows', 'Donor lone pair, acceptor vacant orbital.'),
  clOxy: svgV(CL_OXY, 'Structures of HOCl, HOClO, HOClO2 and HOClO3 with dative bonds from chlorine to oxygen', 'n − 1 dative bonds in HClOₙ.'),
  hno3: svgV(HNO3_O3, 'Structures of nitric acid and ozone with a coordinate bond', 'Coordinate bonds in HNO₃ and O₃.'),
  resA: svgV(RESON_A, 'Resonance structures of ozone and carbon dioxide', 'O₃: two structures; CO₂: one main and two minor.'),
  resB: svgV(RESON_B, 'Resonance structures of the carbonate and nitrate ions with their hybrids', 'Three equivalent structures each; bond order 4/3.'),
  hfWater: svgV(HBOND_HF_WATER, 'Hydrogen bonding in a zigzag chain of HF and in water', 'H···F and O–H···O hydrogen bonds.'),
  ice: svgV(ICE_RING, 'Hexagonal ring structure of ice and density comparison with water', 'Ice: 0.92 g cm⁻³; water at 4 °C: 1.00 g cm⁻³.'),
  hOrg: svgV(HBOND_ORG, 'Intermolecular hydrogen bonds in ethanol and p-nitrophenol and the intramolecular hydrogen bond in o-nitrophenol', 'Inter- and intramolecular hydrogen bonds.'),
  bp: svgV(BP_HYDRIDES, 'Boiling points of the hydrides of groups 14 to 17 showing the high values for NH3, H2O and HF', 'Hydrogen bonding raises the first member.'),
};

const e = (k) => MO[k];
const bo = (k) => fmtBO(MO[k].bo);
const spRows = ['H2', 'He2', 'Li2', 'Be2', 'B2', 'C2', 'N2', 'O2', 'F2', 'Ne2'].map((k) => [e(k).name, String(e(k).ev), bo(k), e(k).bo === 0 ? 'does not exist' : magnet(k), LEN[k] ? String(LEN[k]) : '–', ENTH[k] ? String(ENTH[k]) : '–']);
const molIce = 27 / 18;
const bondsIce = molIce * NA * 2;

export const deck1 = deck({
  part: 1,
  title: 'Molecular Orbital Theory, Coordinate Bonds, Resonance and Hydrogen Bonding — Part 1: Molecular orbitals of diatomic molecules',
  goals: [
    'Describe bonding and antibonding molecular orbitals and fill the MO energy diagrams of H₂ to Ne₂ in the correct order',
    'Calculate bond order and predict stability, bond length and magnetic behaviour of homonuclear diatomic molecules',
    'Explain the paramagnetism of O₂ and compare the stabilities of the oxygen and nitrogen species',
  ],
  slides: [
    sl('title', 'Molecular orbitals: one wave function for the whole molecule', {
      b: 'Part 1: when atoms bond, their atomic orbitals **combine into molecular orbitals** that belong to the whole molecule. This explains **bond order, stability and magnetism** in a way Lewis structures cannot.',
      v: V.shapes,
      n: 'Welcome. In Part One we look at bonding in a new way. Instead of lines between atoms, we let the atomic orbitals combine into molecular orbitals that spread over the whole molecule. Using them we can find bond order, predict stability, and explain why oxygen is attracted by a magnet.',
    }),
    sl('concept', 'Bonding and antibonding orbitals', {
      b: 'Two atomic orbitals combine to give **two** molecular orbitals. **In phase**, the wave functions add: a **bonding** MO with density between the nuclei and **lower energy**. **Out of phase**, they subtract: an **antibonding** MO (marked *) with a **node** between the nuclei and **higher energy**. Orbitals are filled by the **Aufbau principle, Pauli exclusion principle and Hund’s rule**.',
      v: table(['Property', 'Bonding MO', 'Antibonding MO'], [['Combination', 'In phase (addition)', 'Out of phase (subtraction)'], ['Density between nuclei', 'High', 'Node: very low'], ['Energy', 'Lower than the AOs', 'Higher than the AOs'], ['Effect of electrons', 'Hold the atoms together', 'Push the atoms apart']], 'Table comparing bonding and antibonding molecular orbitals'),
      n: 'Two atomic orbitals always give two molecular orbitals. When their wave functions add, we get a bonding orbital, with electron density between the nuclei and lower energy. When they subtract, we get an antibonding orbital with a node between the nuclei and higher energy. Electrons fill these orbitals following the same three rules as in atoms.',
    }),
    sl('diagram', 'The simplest cases: hydrogen and helium', {
      b: '**H₂:** two electrons fill σ1s, so bond order $= (2 - 0)/2 = 1$. **He₂:** four electrons fill σ1s **and** σ*1s, so bond order $= (2 - 2)/2 = 0$: the molecule **does not exist**.',
      v: V.h2,
      n: 'In the hydrogen molecule, both electrons go into the bonding orbital, and the bond order is one. In helium, there would be four electrons, two in the bonding orbital and two in the antibonding orbital. The effects cancel, the bond order is zero, and helium exists only as single atoms.',
    }),
    sl('concept', 'Bond order and what it tells us', {
      b: r`**Bond order** $= \dfrac{N_b - N_a}{2}$, where $N_b$ and $N_a$ are the numbers of electrons in bonding and antibonding MOs. A molecule is **stable only if bond order > 0**. A higher bond order means a **more stable molecule, a shorter bond and a larger bond enthalpy**. **Diamagnetic:** all electrons paired; **paramagnetic:** at least one unpaired electron.`,
      v: table(['Bond order', 'Meaning', 'Example'], [['0', 'No bond: molecule does not exist', 'He₂, Be₂, Ne₂'], ['0.5', 'Weak one-electron bond', 'H₂⁺, He₂⁺'], ['1', 'Single bond', 'H₂, Li₂, F₂'], ['2', 'Double bond', 'O₂, C₂'], ['3', 'Triple bond', 'N₂']], 'Table of bond order values with their meaning and examples'),
      n: 'Bond order is half the difference between the number of bonding electrons and the number of antibonding electrons. If it is zero the molecule does not exist. A higher bond order gives a more stable molecule, a shorter bond, and a larger bond enthalpy. A molecule with unpaired electrons is paramagnetic, and one with all electrons paired is diamagnetic.',
    }),
    sl('diagram', 'Two energy orders for the second-period diatomics', {
      b: 'For **Li₂ to N₂**: σ2s < σ*2s < **π2p < σ2pz** < π*2p < σ*2pz, because **s–p mixing** pushes σ2pz up. For **O₂, F₂ and Ne₂** the 2s–2p gap is larger, there is no mixing, and **σ2pz < π2p**. The two π orbitals are **degenerate** (equal in energy).',
      v: V.orders,
      n: 'There are two energy orders for the second period diatomic molecules. Up to nitrogen, the two pi orbitals lie below the sigma orbital made from the p orbitals along the axis, because of mixing between s and p orbitals. From oxygen onwards, this mixing is negligible, and the sigma orbital drops below the pi pair.',
    }),
    sl('diagram', 'Nitrogen: ten valence electrons, bond order three', {
      b: `Fill from the bottom: σ2s², σ*2s², π2p⁴, σ2pz². $N_b = 8$, $N_a = 2$, so bond order $= (8 - 2)/2 = ${bo('N2')}$ and **all electrons are paired**: N₂ is **diamagnetic**. Its bond enthalpy, ${ENTH.N2} kJ mol⁻¹, is among the largest known.`,
      v: V.n2,
      n: 'Here is nitrogen. Ten valence electrons fill the orbitals one after another, two in each of the sigma two s and sigma star two s, four in the two pi orbitals, and two in the sigma orbital. Eight bonding and two antibonding electrons give a bond order of three, and every electron is paired, so nitrogen is diamagnetic.',
    }),
    sl('example', 'Worked example: diboron, B₂', {
      b: r`**Problem.** Write the valence MO configuration of B₂, find its bond order and say whether it is paramagnetic. Use the order in which π2p lies below σ2pz.

B has 3 valence electrons, so B₂ has 6: ${config(e('B2'))}. The two π2p electrons go into the two degenerate orbitals **singly** (Hund's rule).

$N_b = 2 + 2 = 4$, $N_a = 2$, so bond order $= \dfrac{4 - 2}{2} = ${bo('B2')}$. Two unpaired electrons: **paramagnetic**.`,
      v: table(['Orbital', 'Electrons', 'Type'], [['σ2s', '2', 'bonding'], ['σ*2s', '2', 'antibonding'], ['π2p (two orbitals)', '1 + 1', 'bonding'], ['σ2pz', '0', 'bonding'], ['Result', `bond order ${bo('B2')}`, `${e('B2').unpaired} unpaired: ${magnet('B2')}`]], 'Table of the electron filling of B2 and its bond order and magnetic behaviour'),
      n: 'Diboron has six valence electrons. Four fill the sigma two s and sigma star two s orbitals. The last two go into the pair of degenerate pi orbitals, one in each, because of Hunds rule. Bonding electrons number four and antibonding two, so the bond order is one, and with two unpaired electrons the molecule is paramagnetic.',
    }),
    sl('diagram', 'Oxygen: twelve valence electrons, two unpaired', {
      b: `With no mixing: σ2s², σ*2s², σ2pz², π2p⁴, **π*2p²** with the last two electrons in **separate** π* orbitals. $N_b = 8$, $N_a = 4$, bond order $= ${bo('O2')}$. **Two unpaired electrons: O₂ is paramagnetic**, which a single Lewis structure O=O cannot explain.`,
      v: V.o2,
      n: 'Now oxygen. Twelve valence electrons fill the orbitals in the order without mixing. The last two electrons enter the two degenerate antibonding pi orbitals one at a time, with parallel spins. The bond order is two, and the two unpaired electrons make oxygen paramagnetic. A single Lewis structure with all electrons paired cannot explain this.',
    }),
    sl('check', 'Quick check: the order of orbitals in oxygen', {
      b: 'Remember that there is no s–p mixing from oxygen onwards.',
      n: 'Quick check. Recall that in oxygen there is no mixing between s and p orbitals. Think about where the sigma orbital made from the p orbitals along the axis lies, compared with the pair of pi orbitals, and choose the orbital that is just below that pair.',
      chk: 'o2-order-mcq',
    }),
    sl('concept', 'Homonuclear diatomic molecules from H₂ to Ne₂', {
      b: 'Fill each molecule in turn. **Bond order rises to 3 at N₂ and then falls**, because extra electrons go into antibonding orbitals. **B₂ and O₂ are paramagnetic**; the others that exist are diamagnetic. (Bond lengths and enthalpies are textbook values.)',
      v: table(['Molecule', 'Valence-MO e⁻', 'Bond order', 'Magnetic behaviour', 'Length (pm)', 'Enthalpy (kJ mol⁻¹)'], spRows, 'Table of valence-MO electrons, bond order, magnetic behaviour, bond length and bond enthalpy for H2 to Ne2'),
      n: 'Filling each molecule in turn gives a clear pattern. The bond order climbs to three at nitrogen, then falls again because the extra electrons enter antibonding orbitals. Helium, beryllium and neon molecules have bond order zero and do not exist. Only diboron and oxygen are paramagnetic among the molecules that do exist.',
    }),
    sl('diagram', 'Bond order of the oxygen and nitrogen species', {
      b: 'Adding an electron to O₂ puts it into π*2p and **lowers** the bond order; removing one **raises** it. **Order:** O₂⁺ (2.5) > O₂ (2) > O₂⁻ (1.5) > O₂²⁻ (1). **N₂ (3) > N₂⁺ = N₂⁻ (2.5) > N₂²⁻ (2).**',
      v: V.series,
      n: 'This chart shows the bond orders. For oxygen, adding electrons fills the antibonding pi orbitals and lowers the bond order, from two and a half in the positive ion to one in the peroxide ion. For nitrogen, the molecule itself is best, with bond order three, and both the positive and negative ions have two and a half.',
    }),
    sl('example', 'Worked example: the superoxide ion, O₂⁻', {
      b: r`**Problem.** Find the bond order, unpaired electrons and relative bond length of O₂⁻ compared with O₂.

O₂⁻ has $12 + 1 = 13$ valence-MO electrons: ${config(e('O2-'))}. $N_b = 8$, $N_a = 2 + 3 = 5$.

Bond order $= \dfrac{8 - 5}{2} = ${bo('O2-')}$. The three π* electrons give **one unpaired** electron (paramagnetic). Lower bond order than O₂ (2), so the bond is **longer** (about ${LEN['O2-']} pm against ${LEN.O2} pm) and weaker.`,
      v: table(['Species', 'N_b', 'N_a', 'Bond order', 'Unpaired e⁻', 'O–O length (pm)'], [['O₂⁺', String(e('O2+').nb), String(e('O2+').na), bo('O2+'), String(e('O2+').unpaired), String(LEN['O2+'])], ['O₂', String(e('O2').nb), String(e('O2').na), bo('O2'), String(e('O2').unpaired), String(LEN.O2)], ['O₂⁻', String(e('O2-').nb), String(e('O2-').na), bo('O2-'), String(e('O2-').unpaired), String(LEN['O2-'])], ['O₂²⁻', String(e('O2 2-').nb), String(e('O2 2-').na), bo('O2 2-'), String(e('O2 2-').unpaired), String(LEN['O2 2-'])]], 'Table of electron counts, bond order, unpaired electrons and bond length for the oxygen species'),
      n: 'The superoxide ion has thirteen valence electrons in molecular orbitals, one more than oxygen. The extra electron enters an antibonding pi orbital. Eight bonding and five antibonding electrons give a bond order of one and a half. One electron is unpaired, so it is paramagnetic, and the bond is longer and weaker than in oxygen.',
    }),
    sl('concept', 'Why oxygen is attracted by a magnet', {
      b: 'The Lewis structure O=O has every electron paired and would predict a **diamagnetic** molecule. MO theory places the last two electrons singly in the degenerate **π*2p** pair, so O₂ has **two unpaired electrons**: **paramagnetic**, as liquid oxygen shows by clinging to the poles of a strong magnet.',
      v: table(['Species', 'Unpaired electrons', 'Magnetic behaviour'], [['O₂⁺', String(e('O2+').unpaired), magnet('O2+')], ['O₂', String(e('O2').unpaired), magnet('O2')], ['O₂⁻', String(e('O2-').unpaired), magnet('O2-')], ['O₂²⁻', String(e('O2 2-').unpaired), magnet('O2 2-')], ['N₂', String(e('N2').unpaired), magnet('N2')]], 'Table of unpaired electrons and magnetic behaviour of O2 species and N2'),
      n: 'The electron dot structure of oxygen shows every electron paired, and would suggest that oxygen is not attracted by a magnet. Molecular orbital theory places the last two electrons singly in the two degenerate antibonding pi orbitals. Two unpaired electrons make oxygen paramagnetic, which is why liquid oxygen clings to the poles of a strong magnet.',
    }),
    sl('check', 'Quick check: counting unpaired electrons', {
      b: 'Fill the orbitals, then use Hund’s rule on the degenerate pair.',
      n: 'Quick check. Count the valence electrons, fill the orbitals in the order in which the pi orbitals lie below the sigma orbital, and place electrons in a degenerate pair one at a time before pairing them. Then count the unpaired electrons.',
      chk: 'unpaired-num',
    }),
    sl('concept', 'Stability of N₂, N₂⁺, N₂⁻ and N₂²⁻', {
      b: '**N₂⁺** loses a σ2pz electron (bonding): bond order falls to 2.5. **N₂⁻** gains a π*2p electron: bond order also 2.5. **N₂²⁻** has two π* electrons: bond order 2. **N₂ is the most stable** and the only diamagnetic one.',
      v: table(['Species', 'Valence-MO e⁻', 'Configuration (last orbitals)', 'Bond order', 'Magnetic'], [['N₂', String(e('N2').ev), 'π2p⁴ σ2pz²', bo('N2'), magnet('N2')], ['N₂⁺', String(e('N2+').ev), 'π2p⁴ σ2pz¹', bo('N2+'), magnet('N2+')], ['N₂⁻', String(e('N2-').ev), 'σ2pz² π*2p¹', bo('N2-'), magnet('N2-')], ['N₂²⁻', String(e('N2 2-').ev), 'σ2pz² π*2p²', bo('N2 2-'), magnet('N2 2-')]], 'Table of the nitrogen species with bond order and magnetic behaviour'),
      n: 'Removing an electron from nitrogen takes it from a bonding orbital, so the bond order falls to two and a half. Adding an electron puts it in an antibonding pi orbital, which also gives two and a half. Adding two electrons gives a bond order of two. So nitrogen itself is the most stable, and the only diamagnetic one.',
    }),
    sl('check', 'Quick check: magnetism of a nitrogen ion', {
      b: 'Count the electrons and see whether the last one is paired.',
      n: 'Quick check. Work out the number of valence electrons in the ion, fill the orbitals up to the last electron, and decide whether that last electron is paired with another one. An unpaired electron means the species is paramagnetic.',
      chk: 'n2plus-tf',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'Two atomic orbitals give a bonding MO (in phase, lower energy) and an antibonding MO (out of phase, node, higher energy).',
        'Bond order = (Nb − Na)/2; positive means stable; higher means shorter and stronger. He₂, Be₂ and Ne₂ have bond order 0.',
        'Order up to N₂: π2p below σ2pz (s–p mixing). For O₂ and F₂: σ2pz below π2p.',
        'N₂ has bond order 3 (diamagnetic); O₂ has bond order 2 with two unpaired electrons in π*2p (paramagnetic).',
        'O₂⁺ 2.5 > O₂ 2 > O₂⁻ 1.5 > O₂²⁻ 1; N₂ 3 > N₂⁺ = N₂⁻ 2.5 > N₂²⁻ 2.',
      ],
      v: table(['Idea', 'Key fact'], [['Bond order', '(Nb − Na)/2'], ['Mixing', 'π2p below σ2pz up to N₂'], ['O₂', 'two unpaired electrons: paramagnetic'], ['N₂', 'bond order 3: diamagnetic']], 'Summary table of the key ideas of Part 1'),
      n: 'Let us sum up Part One. Bonding orbitals are lower in energy and antibonding orbitals are higher. Bond order is half the difference between bonding and antibonding electrons. The order of orbitals changes after nitrogen. Nitrogen has bond order three and is diamagnetic, and oxygen has bond order two and is paramagnetic, with two unpaired electrons.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Count only the valence-MO electrons and state the configuration in order before finding the bond order.',
        'Use the right energy order: π2p below σ2pz for B₂, C₂, N₂ and their ions; σ2pz below π2p for O₂, F₂ and their ions.',
        'Fill a degenerate pair one electron each before pairing (Hund), then count the unpaired electrons.',
        'Quote bond order, then link it to stability and bond length, and say paramagnetic or diamagnetic.',
        'Adding an electron to a molecule such as O₂ or N₂ puts it in an antibonding orbital; removing one takes it from the highest filled orbital.',
      ],
      v: table(['Slip', 'Fix'], [['Writing O₂ as diamagnetic', 'Two unpaired electrons in π*2p: paramagnetic'], ['Using the N₂ order for O₂', 'No mixing for O₂: σ2pz below π2p'], ['Pairing π* electrons at once', 'Hund: one in each π* orbital first']], 'Table of common slips in Part 1 and their fixes'),
      n: 'Some exam tips. Write the configuration in the correct order before you calculate the bond order. Use the order with pi below sigma only up to nitrogen. Fill degenerate orbitals one electron at a time. And always link bond order to stability, bond length and magnetic behaviour in your answer.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Molecular Orbital Theory, Coordinate Bonds, Resonance and Hydrogen Bonding — Part 2: Coordinate bonds, resonance and hydrogen bonding',
  goals: [
    'Show the coordinate bonds in NH₄⁺, H₃O⁺, the oxyacids of chlorine, HNO₃ and O₃',
    'Draw resonance structures of O₃, CO₂, CO₃²⁻ and NO₃⁻ and calculate the bond order of the hybrid',
    'Explain hydrogen bonding, its two types and its effect on boiling points, ice and organic molecules',
  ],
  slides: [
    sl('title', 'Sharing a pair that one atom supplies', {
      b: 'Part 2: the **coordinate bond**, the idea of **resonance** for molecules that one structure cannot describe, and the **hydrogen bond** that gives water its special properties.',
      v: V.dative,
      n: 'Welcome to Part Two. We start with the coordinate bond, in which one atom supplies both electrons of the shared pair. Then we meet resonance, which describes molecules that no single structure can represent, and finish with the hydrogen bond, which explains the surprising properties of water and ice.',
    }),
    sl('concept', 'The coordinate (dative) bond', {
      b: 'A coordinate bond forms when a **donor** atom with a **lone pair** shares it with an **acceptor** with a **vacant orbital**. It is drawn as an **arrow from donor to acceptor**. Once formed, it is **identical** to any other covalent bond. $\\ce{NH3 + H+ -> NH4+}$ and $\\ce{H2O + H+ -> H3O+}$.',
      v: table(['Donor', 'Acceptor', 'Product', 'Coordinate bond'], [['NH₃ (lone pair on N)', 'H⁺ (vacant 1s)', 'NH₄⁺', 'N → H'], ['H₂O (lone pair on O)', 'H⁺ (vacant 1s)', 'H₃O⁺', 'O → H'], ['Cl in HOCl (lone pair)', 'O atom', 'HOClO', 'Cl → O'], ['N in HNO₃ (lone pair)', 'O atom', 'HNO₃', 'N → O']], 'Table of donors, acceptors and the coordinate bonds in four species'),
      n: 'A coordinate bond needs two things. The donor atom must have a lone pair, and the acceptor must have a vacant orbital. The bond is drawn as an arrow from donor to acceptor. In the ammonium ion and the hydronium ion, the lone pair on nitrogen or oxygen is shared with a hydrogen ion. After formation, the bond is just like any other covalent bond.',
    }),
    sl('diagram', 'Oxyacids of chlorine', {
      b: 'In HOCl chlorine uses one electron for the Cl–O bond and keeps three lone pairs. Each further oxygen is attached by a **Cl → O coordinate bond** from one lone pair. So **HClOₙ has n − 1 coordinate bonds**, and chlorine shows oxidation states **+1, +3, +5, +7**.',
      v: V.clOxy,
      n: 'Chlorine has seven valence electrons. One is used in the bond to the oxygen of the hydroxyl group, and the remaining six form three lone pairs. Each lone pair can be donated to another oxygen atom as a coordinate bond. So hypochlorous acid has none, chlorous acid one, chloric acid two, and perchloric acid three.',
    }),
    sl('example', 'Worked example: coordinate bonds in HClOₙ', {
      b: r`**Problem.** For HClO₃ and HClO₄, find the number of coordinate bonds and of lone pairs left on Cl, and the oxidation state of Cl.

HClO$_n$: coordinate bonds $= n - 1$; lone pairs left $= 3 - (n - 1)$; oxidation state $= 2n - 1$.

HClO₃: ${clDative(3)} coordinate bonds, ${clLonePairs(3)} lone pair, oxidation state $+${clOxState(3)}$. HClO₄: ${clDative(4)} coordinate bonds, ${clLonePairs(4)} lone pairs, oxidation state $+${clOxState(4)}$.`,
      v: table(['Acid', 'n', 'Coordinate bonds', 'Lone pairs on Cl', 'Oxidation state of Cl'], [1, 2, 3, 4].map((n) => [['HOCl', 'HOClO', 'HOClO₂', 'HOClO₃'][n - 1], String(n), String(clDative(n)), String(clLonePairs(n)), `+${clOxState(n)}`]), 'Table of coordinate bonds, lone pairs on chlorine and oxidation state in the oxyacids of chlorine'),
      n: 'Let us count. For an acid with n oxygen atoms, one oxygen is in the hydroxyl group, and the other oxygens are joined by coordinate bonds. So the number of coordinate bonds is n minus one, and the lone pairs left on chlorine are three minus that number. Chloric acid has two bonds and one lone pair, and perchloric acid has three bonds and none.',
    }),
    sl('diagram', 'Nitric acid and ozone', {
      b: 'In **HNO₃** nitrogen forms one single bond to OH, one double bond to O and **donates its lone pair** to the third oxygen (N → O); N is left with no lone pair. In **O₃** the central oxygen forms a double bond to one oxygen and a **coordinate bond** to the other.',
      v: V.hno3,
      n: 'In nitric acid, nitrogen forms a single bond to the hydroxyl group and a double bond to one oxygen. Its lone pair is donated to the third oxygen, as a coordinate bond. In ozone, the central oxygen forms a double bond to one end oxygen and a coordinate bond to the other end, and the molecule is bent.',
    }),
    sl('check', 'Quick check: bonding in nitric acid', {
      b: 'Count the electrons nitrogen can use: five valence electrons.',
      n: 'Quick check. Nitrogen has five valence electrons. Think about how many are used in the single bond to the hydroxyl group and in the double bond, and what happens to the remaining lone pair on nitrogen when the third oxygen is attached.',
      chk: 'hno3-mcq',
    }),
    sl('concept', 'Resonance: more than one Lewis structure', {
      b: 'Sometimes one Lewis structure cannot show the observed equal bond lengths. The molecule is then a **resonance hybrid** of two or more structures that differ **only in the positions of electrons**. The structures are **not real** and do not interconvert; the **hybrid is more stable** than any one of them (**resonance energy**).',
      v: V.resA,
      n: 'Sometimes one electron dot structure cannot explain the facts. In ozone, the two oxygen oxygen bonds are equal in length, although one structure shows a double bond and a single bond. The molecule is a hybrid of two structures that differ only in the positions of electrons. The structures are not real, and the hybrid is more stable than either.',
    }),
    sl('diagram', 'Carbonate and nitrate ions', {
      b: 'Each ion has **three equivalent structures** with one double bond and two single bonds, the double bond taking each position in turn. The hybrid has **three equal bonds of bond order 4/3**, and the negative charge is shared over the oxygen atoms.',
      v: V.resB,
      n: 'The carbonate ion and the nitrate ion each have three equivalent structures. In each structure, one bond to oxygen is double and two are single, and the double bond occupies each position in turn. In the hybrid all three bonds are equal, each has a bond order of four thirds, and the negative charge is spread over the oxygen atoms.',
    }),
    sl('example', 'Worked example: bond order and charge in NO₃⁻ and CO₃²⁻', {
      b: r`**Problem.** Find the N–O and C–O bond orders in the hybrids and the charge on each oxygen.

Each structure has $2 + 1 + 1 = 4$ bonds shared over 3 equal positions: bond order $= \dfrac{4}{3} = ${resBO('NO3').toFixed(2)}$ in both ions.

Charge on each O: NO₃⁻ $= -1/3$ ($\approx ${q23(-1, 3).toFixed(2)}$); CO₃²⁻ $= -2/3$ ($\approx ${q23(-2, 3).toFixed(2)}$). Observed C–O: 129 pm, between 122 pm (C=O) and 143 pm (C–O).`,
      v: table(['Ion', 'Bonds per structure', 'Positions', 'Bond order', 'Charge on each O'], [['NO₃⁻', '2 + 1 + 1 = 4', '3', resBO('NO3').toFixed(2), q23(-1, 3).toFixed(2)], ['CO₃²⁻', '2 + 1 + 1 = 4', '3', resBO('CO3').toFixed(2), q23(-2, 3).toFixed(2)], ['O₃', '2 + 1 = 3', '2', String(resBO('O3')), '−0.5 on each end O']], 'Table of bond order and charge on oxygen in the resonance hybrids of nitrate, carbonate and ozone'),
      n: 'To find the bond order of the hybrid, add up the bonds in one structure and divide by the number of equal positions. In each structure of the nitrate and carbonate ions, there are four bonds to share over three positions, so the bond order is four thirds. The charge on the ion is shared equally by the three oxygen atoms.',
    }),
    sl('check', 'Quick check: bond lengths in the carbonate ion', {
      b: 'Think of the hybrid, not of any single structure.',
      n: 'Quick check. Think about the resonance hybrid of the carbonate ion, and not about any one of its three contributing structures. What can you say about the lengths of the three carbon oxygen bonds in the real ion?',
      chk: 'res-fill',
    }),
    sl('concept', 'Hydrogen bonding: conditions and strength', {
      b: 'A **hydrogen bond** is the attraction between an **H atom bonded to a small, highly electronegative atom (F, O or N)** and a **lone pair on F, O or N** of a neighbouring molecule. It is written X–H···Y. It is much **weaker than a covalent bond** (about 10–40 kJ mol⁻¹) but much **stronger than dispersion forces** between similar molecules.',
      v: V.hfWater,
      n: 'A hydrogen bond forms when a hydrogen atom bonded to fluorine, oxygen or nitrogen is attracted by a lone pair on fluorine, oxygen or nitrogen of a neighbouring molecule. It is far weaker than a covalent bond, but much stronger than ordinary forces between molecules. Hydrogen fluoride forms zigzag chains, and each water molecule can form up to four hydrogen bonds.',
    }),
    sl('diagram', 'Water and ice', {
      b: 'In **ice** each H₂O is hydrogen bonded **tetrahedrally to four others**, giving an **open hexagonal lattice with empty space**. On melting, part of the lattice collapses, so ice (**0.92 g cm⁻³**) is **less dense** than water (**1.00 g cm⁻³** at 4 °C) and floats.',
      v: V.ice,
      n: 'In ice, every water molecule is hydrogen bonded to four others, which holds the molecules in an open lattice of hexagonal rings with empty space inside. When ice melts, part of this lattice collapses, and the molecules pack more closely. So ice is less dense than liquid water, and floats on it.',
    }),
    sl('diagram', 'Boiling points of the hydrides', {
      b: 'Down groups 15, 16 and 17 the boiling points of the hydrides rise with molar mass, **except NH₃, H₂O and HF**, which are far higher because of **hydrogen bonding**. Group 14 hydrides (CH₄ …) follow the regular trend.',
      v: V.bp,
      n: 'Look at the boiling points of the hydrides. In group fourteen the boiling point rises steadily down the group. In groups fifteen, sixteen and seventeen, the first member, ammonia, water and hydrogen fluoride, boils far higher than the trend predicts, because their molecules are linked by hydrogen bonds, which take extra energy to break.',
    }),
    sl('diagram', 'Intermolecular and intramolecular hydrogen bonds', {
      b: '**Intermolecular:** between different molecules, as in water, HF and **ethanol** (which boils at 351 K, against 249 K for its isomer CH₃OCH₃). **Intramolecular:** within one molecule, as in **o-nitrophenol**, which closes a ring; it is **steam volatile** and melts lower than **p-nitrophenol**, whose molecules are linked to each other.',
      v: V.hOrg,
      n: 'Hydrogen bonds can link different molecules, or lie within one molecule. In ethanol they join molecules into chains, so ethanol boils much higher than its isomer, dimethyl ether. In ortho nitrophenol the hydrogen bond closes a ring within the molecule, so the molecules are not linked to each other, and the compound is volatile in steam.',
    }),
    sl('example', 'Worked example: hydrogen bonds in a sample of ice', {
      b: r`**Problem.** How many hydrogen bonds are present in 27 g of ice? Each water molecule makes 4, each bond shared by 2 molecules. ($N_A = 6.022 \times 10^{23}$ mol⁻¹; H₂O = 18 g mol⁻¹)

Amount $= \dfrac{27}{18} = ${molIce.toFixed(2)}$ mol; molecules $= ${molIce.toFixed(2)} \times 6.022 \times 10^{23} = ${((molIce * NA) / 1e23).toFixed(3)} \times 10^{23}$.

Bonds per molecule $= 4/2 = 2$, so hydrogen bonds $= 2 \times ${((molIce * NA) / 1e23).toFixed(3)} \times 10^{23} = ${(bondsIce / 1e23).toFixed(2)} \times 10^{23}$.`,
      v: table(['Step', 'Value'], [['Amount of H₂O', `${molIce.toFixed(2)} mol`], ['Molecules', `${((molIce * NA) / 1e23).toFixed(3)} × 10²³`], ['Hydrogen bonds per molecule (shared)', '2'], ['Hydrogen bonds in the sample', `${(bondsIce / 1e23).toFixed(2)} × 10²³`]], 'Table of the steps in counting hydrogen bonds in 27 grams of ice'),
      n: 'First find the amount of water, which is one and a half moles, and from it the number of molecules. Each molecule forms four hydrogen bonds, but each bond is shared between two molecules, so the average is two bonds per molecule. Multiplying gives the total number of hydrogen bonds in the sample.',
    }),
    sl('check', 'Quick check: ice on water', {
      b: 'Decide whether both statements are true and whether the second explains the first.',
      n: 'Quick check. Read both statements carefully. First decide whether each one is true. Then decide whether the second statement gives the reason for the first, thinking about the arrangement of the molecules in ice compared with the liquid.',
      chk: 'ar-ice',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Coordinate bond: donor lone pair + acceptor vacant orbital (NH₄⁺, H₃O⁺); once formed, identical to other bonds.',
        'HClOₙ has n − 1 coordinate bonds; HNO₃ has one N → O; O₃ has one O → O.',
        'Resonance: hybrid of structures differing only in electron positions; the hybrid is more stable; O₃ bond order 1.5; CO₃²⁻ and NO₃⁻ 4/3.',
        'Hydrogen bond: H on F, O or N attracted to a lone pair on F, O or N; ice is an open lattice (0.92 g cm⁻³), so it floats.',
        'Intermolecular H-bonds raise boiling points (water, HF, ethanol); intramolecular H-bonds (o-nitrophenol) give volatility.',
      ],
      v: table(['Idea', 'Key fact'], [['Coordinate bond', 'Arrow from donor to acceptor'], ['Resonance hybrid', 'Bond order = bonds ÷ positions'], ['Hydrogen bond', 'F, O or N: X–H···Y'], ['Ice', 'Open lattice, lower density']], 'Summary table of the key ideas of Part 2'),
      n: 'Let us sum up Part Two. A coordinate bond is a shared pair supplied by one atom, drawn as an arrow. Resonance describes a molecule as a hybrid, with equal bonds and a bond order that is an average. A hydrogen bond forms when hydrogen on fluorine, oxygen or nitrogen is attracted to a lone pair on a neighbour, and it explains the properties of water, ice and many organic compounds.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Draw coordinate bonds as arrows from donor to acceptor, and check the total number of valence electrons in your structure.',
        'For resonance, show all structures with a double-headed arrow, and say that the hybrid is a single real structure, not an equilibrium.',
        'Bond order of the hybrid = total number of bonds in one structure ÷ number of equal positions.',
        'For hydrogen bonding, name the atoms (F, O or N), show X–H···Y, and state the effect on boiling point or density.',
        'Compare o- and p-nitrophenol by the type of hydrogen bond: intramolecular gives volatility, intermolecular gives a higher melting point.',
      ],
      v: table(['Slip', 'Fix'], [['Calling a coordinate bond longer or weaker', 'Once formed it is identical to the others'], ['Saying resonance structures interconvert', 'Only the hybrid exists'], ['Hydrogen bond with C–H', 'Only F, O or N']], 'Table of common slips in Part 2 and their fixes'),
      n: 'Some exam tips for Part Two. Draw coordinate bonds as arrows from donor to acceptor. In resonance, use a double headed arrow, and remember that the hybrid is the only real structure. Work out bond order by dividing the total bonds by the number of equal positions. And for hydrogen bonds, always name fluorine, oxygen or nitrogen and state the effect on boiling point.',
    }),
  ],
});
