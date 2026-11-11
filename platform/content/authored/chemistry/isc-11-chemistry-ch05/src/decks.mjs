// ISC 11 Chemistry ch05 Quantum Mechanical Model and Electronic Configuration: two decks. Part 1 (t01-t03) wave function,
// quantum numbers, shapes, nodes and radial probability; Part 2 (t04-t05) Aufbau, (n + l), Pauli, Hund, configurations
// of atoms and ions, half-filled and filled stability.
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { DENSITY, RADIAL, ORB_SP, ORB_D, SHELLS, AUFBAU, BOXES } from './svgs.mjs';
import { config, shortU, unp, nodes, byEnergy, orbitalsInShell, electronsInShell, mlValues, lValues, countL } from './data.mjs';
import { RADIAL_INFO } from './svgs.mjs';

const f1 = (x) => x.toFixed(1);
const ri = RADIAL_INFO;

export const V = {
  density: svgV(DENSITY, 'Dot picture of the 1s electron with the 90 percent boundary surface, and curves of the density psi squared and the radial probability against distance', 'The density is largest at the nucleus, the radial probability peaks at 1 a₀.'),
  radial: svgV(RADIAL, 'Radial probability curves for 1s, 2s, 3s, 2p, 3p and 3d showing radial nodes as dashed red lines', 'Radial nodes = n − l − 1.'),
  sp: svgV(ORB_SP, 'Nested s orbitals and p orbitals growing with n, and the three p orbitals along the x, y and z axes with their nodal planes', 'Size grows with n; three p orbitals along three axes.'),
  d: svgV(ORB_D, 'Cross-sections of the five d orbitals with their nodal planes and cones shown dashed', 'Five d orbitals, two angular nodes each.'),
  shells: svgV(SHELLS, 'Boxes for the orbitals in shells n = 1 to 4, with the number of orbitals and electrons in each shell', 'n² orbitals and 2n² electrons in shell n.'),
  aufbau: svgV(AUFBAU, 'Aufbau diagram of the 19 subshells numbered in order of filling with arrows joining subshells of equal n + l', 'Fill by increasing n + l; for a tie, lower n first.'),
  boxes: svgV(BOXES, 'Orbital box diagrams of P, Fe, Fe3+, Cr and Cu showing paired and unpaired electrons', 'Hund: singly first. Pauli: two per box at most.'),
};

// ---- worked-example data (all computed)
const q3p = [];
for (const ml of mlValues(1)) for (const ms of ['+½', '−½']) q3p.push(`(3, 1, ${ml > 0 ? '+' : ml < 0 ? '−' : ''}${Math.abs(ml)}, ${ms})`);
const nd = (n, l) => nodes(n, l);
const n4d = nd(4, 2);
const n5p = nd(5, 1);
const n3s = nd(3, 0);
const ord = byEnergy(['4f', '5s', '6s', '4d', '5p']);
const cfgRow = (z, name) => [name, String(z), shortU(z), String(unp(z))];
const d3 = [[21, 'Sc'], [22, 'Ti'], [23, 'V'], [24, 'Cr'], [25, 'Mn'], [26, 'Fe'], [27, 'Co'], [28, 'Ni'], [29, 'Cu'], [30, 'Zn']];

export const deck1 = deck({
  part: 1,
  title: 'Quantum Mechanical Model and Electronic Configuration — Part 1: wave function, quantum numbers and orbitals',
  goals: [
    'Explain what the wave function ψ and ψ² mean and what is meant by an orbital',
    'Use the four quantum numbers to describe an electron and count shells, subshells, orbitals and electrons',
    'Describe the shapes, sizes and orientations of s, p and d orbitals and calculate their radial and angular nodes',
  ],
  slides: [
    sl('title', 'The quantum mechanical model of the atom', {
      b: 'Part 1: how a wave equation replaces the orbit, what the quantum numbers say, and what orbitals look like.',
      v: V.density,
      n: 'Welcome. Bohr pictured the electron as a particle on a fixed circular path, but the uncertainty principle showed that cannot be right. In this part we meet the wave equation that replaced it, the four quantum numbers that come out of it, and the shapes and nodes of the orbitals.',
    }),
    sl('concept', 'From orbit to orbital', {
      b: 'A **Bohr orbit** is a fixed circular path. An **orbital** is a region of space around the nucleus where the electron is **most likely to be found**, described by a **wave function**. The new model treats the electron as a wave and gives only **probabilities**.',
      v: table(['Feature', 'Bohr orbit', 'Quantum mechanical orbital'], [['Electron treated as', 'Particle on a circular path', 'Wave described by a wave function ψ'], ['Position', 'Exact radius', 'Only a probability of being found'], ['Numbers needed', 'One: n', 'Three, n, l and mₗ, plus spin'], ['Atoms covered', 'One-electron species only', 'All atoms, exactly for hydrogen']], 'Table comparing a Bohr orbit with a quantum mechanical orbital'),
      n: 'An orbit is a fixed circular path. An orbital is quite different. It is a region of space around the nucleus in which the electron is most likely to be found, and it is described by a wave function. The model gives only probabilities, needs three quantum numbers instead of one, and applies to every atom.',
    }),
    sl('concept', 'The Schrödinger wave equation (no derivation)', {
      b: 'Schrödinger wrote an equation that treats the electron as a matter wave: $$\\hat{H}\\psi = E\\psi$$ Here $\\hat{H}$ is the **Hamiltonian operator** (kinetic plus potential energy), $E$ is the **energy** and $\\psi$ is the **wave function**. It has acceptable solutions only for **certain values of $E$**. For hydrogen it can be solved exactly; for many-electron atoms only approximately.',
      v: flow('LR', [['a', 'Write the equation for the electron in the field of the nucleus'], ['b', 'Solve it: only some energies E give acceptable wave functions'], ['c', 'Each solution ψ is labelled by n, l and mₗ'], ['d', 'Each ψ is one orbital with its own energy and shape']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow chart from the Schrödinger equation to the allowed wave functions labelled by quantum numbers'),
      n: 'Schrödinger wrote one equation for the electron as a matter wave. It links the wave function to the energy through the Hamiltonian operator. Acceptable solutions exist only for certain energies, and each solution is labelled by whole numbers called quantum numbers. We do not derive it. Exact solutions exist for hydrogen, and approximate ones for larger atoms.',
    }),
    sl('concept', 'What ψ and ψ² mean', {
      b: 'The wave function $\\psi$ has **no direct physical meaning**. The **square of its magnitude, $\\psi^2$**, at a point is the **probability density**: the probability of finding the electron in a tiny volume there is $\\psi^2 \\times$ volume. Over all space the total probability is **1**. Where $\\psi^2 = 0$, the electron is **never** found.',
      v: table(['Quantity', 'Meaning', 'Can be negative?'], [['ψ', 'Amplitude of the electron wave', 'Yes (sign of the wave)'], ['ψ²', 'Probability density at a point', 'No, it is a square'], ['ψ² × volume', 'Probability of finding the electron in that volume', 'No'], ['4πr²ψ² dr', 'Probability in a thin shell at distance r', 'No']], 'Table of the meaning of ψ, ψ², probability in a volume and radial probability'),
      n: 'The wave function itself has no direct physical meaning. Its square does. At any point, the square of the wave function is the probability density, so multiplying it by a small volume gives the chance of finding the electron there. The total probability over all space is one, and where the square is zero the electron is never found.',
    }),
    sl('diagram', 'Seeing the probability: the 1s electron', {
      b: 'The dots crowd where **ψ² is large**, close to the nucleus. The **radial probability** $4\\pi r^2\\psi^2$ includes the growing volume of each shell, so it is zero at the nucleus and peaks at **$1\\,a_0$**. A **boundary surface** encloses about **90%** of the probability.',
      v: V.density,
      n: 'Each dot is one snapshot of where the electron might be. They crowd near the nucleus where the density is greatest, and thin out with distance. On the right, the density falls steadily, while the radial probability starts at zero, peaks at one Bohr radius and falls. The dashed circle is a boundary surface holding ninety percent of the probability.',
    }),
    sl('check', 'Quick check: what ψ² tells us', {
      b: 'Decide what the square of the wave function gives at a point.',
      n: 'Quick check. Remember that the wave function itself is only an amplitude and may be positive or negative. Think about which quantity can be interpreted as a probability per unit volume, and which quantity can never be negative, then choose the statement that matches.',
      chk: 'psi2-mcq',
    }),
    sl('concept', 'Orbital and boundary surface', {
      b: 'An **orbital** is the wave function of one electron in an atom; each orbital has its own **energy, shape and size**. Because ψ² never drops exactly to zero, a **boundary surface diagram** is drawn to contain about **90% of the probability**. An orbital holds **at most two electrons**.',
      v: table(['Idea', 'Statement'], [['Orbital', 'One-electron wave function ψ, with fixed energy'], ['Orbital picture', 'Region where the electron is found about 90% of the time'], ['Why 90%?', 'ψ² falls off with distance but never becomes exactly zero'], ['Capacity', 'Two electrons of opposite spin']], 'Table summarising the idea of an orbital and the boundary surface'),
      n: 'An orbital is the wave function of one electron, and each orbital has its own energy, shape and size. Because the probability fades away with distance but never reaches exactly zero, we draw a boundary surface that contains about ninety percent of the probability. Each orbital can hold at most two electrons.',
    }),
    sl('concept', 'The four quantum numbers', {
      b: 'Solving the wave equation gives three quantum numbers; a fourth describes **spin**. $n$ = 1, 2, 3 … ; $l$ = 0 to $n-1$; $m_l$ = $-l$ to $+l$ (that is $2l+1$ values); $m_s$ = $+\\tfrac12$ or $-\\tfrac12$. No two electrons in an atom can have the same four.',
      v: table(['Quantum number', 'Symbol', 'Allowed values', 'Tells us'], [['Principal', 'n', '1, 2, 3 …', 'Shell: size and energy'], ['Azimuthal', 'l', '0 to n − 1', 'Subshell: shape of the orbital'], ['Magnetic', 'mₗ', '−l to +l', 'Orientation of the orbital'], ['Spin', 'mₛ', '+½ or −½', 'Direction of electron spin']], 'Table of the four quantum numbers with symbol, allowed values and meaning'),
      n: 'There are four quantum numbers. The principal quantum number n labels the shell and fixes its size and energy. The azimuthal number l runs from zero to n minus one and labels the subshell and the shape. The magnetic number runs from minus l to plus l and gives the orientation. The spin number is plus or minus one half.',
    }),
    sl('diagram', 'Shells, subshells and orbitals', {
      b: 'Each value of $l$ is a subshell: $l = 0, 1, 2, 3$ are **s, p, d, f**. A subshell has $2l+1$ orbitals: **1, 3, 5, 7**. Shell $n$ has **$n^2$ orbitals** and holds **$2n^2$ electrons**.',
      v: V.shells,
      n: 'Here are the first four shells. The first shell has only an s orbital. The second has an s and three p orbitals. The third adds five d orbitals, and the fourth adds seven f orbitals. Shell number n therefore contains n squared orbitals, and since each holds two electrons, it holds up to two n squared electrons.',
    }),
    sl('example', 'Worked example: quantum numbers of the 3p electrons', {
      b: r`**Problem.** List every set of $(n, l, m_l, m_s)$ for the electrons that can occupy the $3p$ subshell, and say how many electrons it holds.

For $3p$: $n = 3$, $l = 1$, so $m_l = -1, 0, +1$ (three orbitals). Each orbital takes $m_s = +\tfrac12$ or $-\tfrac12$.

Sets: ${q3p.join(', ')}.

Number of electrons $= 2(2l+1) = 2 \times 3 = ${q3p.length}$.`,
      v: table(['n', 'l', 'mₗ values', 'Orbitals', 'Electrons'], [['3', '1', '−1, 0, +1', '3', String(q3p.length)]], 'Table of the quantum numbers and electron capacity of the 3p subshell'),
      n: 'For three p, n is three and l is one. So the magnetic quantum number can be minus one, zero or plus one, which means three orbitals. Each orbital can hold an electron with spin plus one half and another with spin minus one half. That gives six distinct sets of four quantum numbers, and six electrons in the subshell.',
    }),
    sl('concept', 'What the quantum numbers tell us', {
      b: '**Distance and size:** a larger $n$ means the electron is **farther from the nucleus** on average and the orbital is **larger**. **Energy:** rises with $n$ (in many-electron atoms also with $l$). **Shape:** $l$. **Orientation:** $m_l$. **Electrons:** orbital 2, subshell $2(2l+1)$, shell $2n^2$.',
      v: table(['Quantity', 'Given by', 'Rule'], [['Average distance, orbital size', 'n', 'Larger n, larger orbital'], ['Energy of a shell', 'n', 'Rises with n'], ['Shape of orbital', 'l', 's sphere, p dumbbell, d clover'], ['Orientation in space', 'mₗ', '2l + 1 orientations'], ['Electrons in a shell', 'n', '2n²'], ['Electrons in a subshell', 'l', '2(2l + 1)']], 'Table of what each quantum number tells about distance, energy, shape, orientation and electron count'),
      n: 'Each quantum number tells us something. A larger principal quantum number means the electron is on average farther from the nucleus, the orbital is larger and the energy is higher. The azimuthal number gives the shape and the magnetic number the orientation. Counting rules then give the electrons: two in an orbital, and two n squared in a shell.',
    }),
    sl('check', 'Quick check: allowed quantum numbers', {
      b: 'Test each set against the rules for n, l, mₗ and mₛ.',
      n: 'Quick check. For each set, first confirm that l is smaller than n. Then check that the magnetic number lies between minus l and plus l. Finally check that the spin number is plus or minus one half. Only a set that passes all three tests is allowed, so look for the single flaw in the wrong sets.',
      chk: 'qn-set-mcq',
    }),
    sl('concept', 'Shapes of s and p orbitals; size and orientation', {
      b: 'An **s orbital** ($l = 0$) is **spherical**. A **p orbital** ($l = 1$) has **two lobes** of opposite sign with a **nodal plane** through the nucleus; the three p orbitals point along **x, y and z**. For the same type, a higher shell means a **larger** orbital (3p > 2p, 3s > 2s > 1s).',
      v: V.sp,
      n: 'An s orbital is a sphere, and it gets larger as n increases. A p orbital has two lobes, one on each side of the nucleus, separated by a nodal plane where the electron is never found. The three p orbitals of a shell lie along the three axes at right angles, which is why there are exactly three of them.',
    }),
    sl('diagram', 'The five d orbitals', {
      b: 'A **d orbital** ($l = 2$) has **two angular nodes**. Four of the five have **four lobes**: $d_{xy}$, $d_{yz}$, $d_{xz}$ lie **between** the axes and $d_{x^2-y^2}$ lies **along** the axes. $d_{z^2}$ has **two lobes on the z axis and a ring** in the xy plane.',
      v: V.d,
      n: 'Here are the five d orbitals. Three of them, d x y, d y z and d x z, have four lobes lying between the axes. The d x squared minus y squared orbital has four lobes along the x and y axes. The d z squared orbital has two lobes on the z axis and a ring around the middle. Each has two angular nodes.',
    }),
    sl('concept', 'Nodes: radial and angular', {
      b: 'A **node** is a place where $\\psi^2 = 0$. **Radial nodes** are spherical surfaces at fixed distances: **$n - l - 1$**. **Angular nodes** are planes or cones through the nucleus: **$l$**. **Total nodes** $= (n - l - 1) + l = $ **$n - 1$**.',
      v: table(['Orbital', 'n', 'l', 'Radial nodes (n − l − 1)', 'Angular nodes (l)', 'Total (n − 1)'], [['1s', '1', '0', '0', '0', '0'], ['2s', '2', '0', '1', '0', '1'], ['2p', '2', '1', '0', '1', '1'], ['3s', '3', '0', String(nd(3, 0).radial), '0', '2'], ['3p', '3', '1', String(nd(3, 1).radial), '1', '2'], ['3d', '3', '2', String(nd(3, 2).radial), '2', '2']], 'Table of radial, angular and total nodes for 1s, 2s, 2p, 3s, 3p and 3d'),
      n: 'A node is a place where the probability of finding the electron is exactly zero. Radial nodes are spherical surfaces, and their number is n minus l minus one. Angular nodes are planes or cones through the nucleus, and their number equals l. Adding the two gives the total number of nodes, which is always n minus one.',
    }),
    sl('diagram', 'Radial probability curves', {
      b: `Each **peak** is a region of high probability; each **dip to zero** is a radial node. The most probable distances are **${f1(ri['1s'].rMax)}** ($1s$), **${f1(ri['2p'].rMax)}** ($2p$) and **${f1(ri['3d'].rMax)}** ($3d$) in units of $a_0$. Number of peaks $=$ radial nodes $+ 1$.`,
      v: V.radial,
      n: 'These curves show the chance of finding the electron at each distance from the nucleus. Where a curve touches zero, there is a radial node. The one s curve has no node and one peak. Two s has one node and two peaks. Three s has two nodes and three peaks. The number of peaks is always the number of radial nodes plus one.',
    }),
    sl('example', 'Worked example: counting nodes', {
      b: r`**Problem.** Find the radial, angular and total nodes of the $4d$, $5p$ and $3s$ orbitals.

**$4d$:** $n = 4$, $l = 2$. Radial $= 4 - 2 - 1 = ${n4d.radial}$; angular $= ${n4d.angular}$; total $= 4 - 1 = ${n4d.total}$.

**$5p$:** radial $= 5 - 1 - 1 = ${n5p.radial}$; angular $= ${n5p.angular}$; total $= ${n5p.total}$.

**$3s$:** radial $= 3 - 0 - 1 = ${n3s.radial}$; angular $= ${n3s.angular}$; total $= ${n3s.total}$.`,
      v: table(['Orbital', 'Radial', 'Angular', 'Total'], [['4d', String(n4d.radial), String(n4d.angular), String(n4d.total)], ['5p', String(n5p.radial), String(n5p.angular), String(n5p.total)], ['3s', String(n3s.radial), String(n3s.angular), String(n3s.total)]], 'Table of the nodes of 4d, 5p and 3s orbitals'),
      n: 'Use the rule that radial nodes equal n minus l minus one, and angular nodes equal l. For four d, that is one radial and two angular nodes, three in all. For five p it is three radial and one angular, four in all. For three s there are two radial nodes and no angular node, two in all.',
    }),
    sl('check', 'Quick check: nodes in an orbital', {
      b: 'Use radial nodes = n − l − 1 and angular nodes = l.',
      n: 'Quick check. Read off the shell number and the subshell letter from the orbital name, and convert the letter into a value of l. Then apply the rule for radial nodes, and add the angular nodes if the question asks for the total. Check that your total equals n minus one.',
      chk: 'nodes-num',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'ψ has no physical meaning; ψ² is the probability density; an orbital is a one-electron wave function holding at most two electrons.',
        'Quantum numbers: n (size, energy), l = 0 to n − 1 (shape), mₗ = −l to +l (orientation), mₛ = ±½ (spin).',
        'Shell n: n² orbitals, 2n² electrons. Subshell: 2l + 1 orbitals, 2(2l + 1) electrons.',
        'Nodes: radial n − l − 1, angular l, total n − 1.',
      ],
      v: table(['Subshell', 'l', 'Shape', 'Orbitals', 'Electrons'], [['s', '0', 'Sphere', '1', '2'], ['p', '1', 'Dumbbell', '3', '6'], ['d', '2', 'Four lobes or lobes and ring', '5', '10'], ['f', '3', 'Complex', '7', '14']], 'Summary table of subshells with shape, number of orbitals and electron capacity'),
      n: 'Summing up Part 1. The wave function has no direct meaning but its square is a probability density. An orbital is a one-electron wave function. The four quantum numbers fix size, shape, orientation and spin. A shell has n squared orbitals and two n squared electrons, and the number of radial and angular nodes follows from n and l.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Say "probability density" for ψ²; never say that ψ itself is a probability.',
        'Always check l < n and −l ≤ mₗ ≤ +l before accepting a set of quantum numbers.',
        'Radial nodes n − l − 1, angular nodes l, total n − 1: show the substitution.',
        'Sketch p orbitals as two lobes with the nodal plane marked, and label the axis.',
        'Do not call an orbital an orbit: an orbital is a region of probability.',
      ],
      v: table(['Slip', 'Fix'], [['Giving l = n as allowed', 'l runs from 0 to n − 1'], ['Counting n orbitals in shell n', 'There are n² orbitals'], ['Forgetting the spin number in a set', 'Write all four numbers'], ['Radial nodes = n − l', 'Radial nodes = n − l − 1']], 'Table of common slips in Part 1 and how to fix them'),
      n: 'Some exam tips. Describe the square of the wave function as a probability density. Before you accept a set of quantum numbers, check that l is less than n and that the magnetic number lies between minus l and plus l. Show the substitution when counting nodes, and never confuse an orbital with an orbit.',
    }),
  ],
});

// Part 2 data
const nlVals = byEnergy(['4s', '3d', '4p', '5s']);
const sCfg = config(16, 0);
const coRows = [[27, 0], [27, 2], [27, 3]].map(([z, q]) => [`Co${q ? (q === 2 ? '²⁺' : '³⁺') : ''}`, shortU(z, q), String(unp(z, q))]);
const ionRows = [[11, 1, 'Na⁺'], [12, 2, 'Mg²⁺'], [13, 3, 'Al³⁺'], [7, -3, 'N³⁻'], [8, -2, 'O²⁻'], [9, -1, 'F⁻'], [17, -1, 'Cl⁻'], [20, 2, 'Ca²⁺']].map(([z, q, nm]) => [nm, String(z - q), shortU(z, q), z - q === 10 ? 'Ne' : 'Ar']);

export const deck2 = deck({
  part: 2,
  title: 'Quantum Mechanical Model and Electronic Configuration — Part 2: filling orbitals and electronic configurations',
  goals: [
    'Arrange subshells in order of energy using the (n + l) rule and apply the Aufbau principle',
    'Apply Pauli’s exclusion principle and Hund’s rule to draw orbital diagrams',
    'Write the configurations of atoms up to Z = 30 and of their ions, and explain the cases of chromium and copper',
  ],
  slides: [
    sl('title', 'Filling the orbitals', {
      b: 'Part 2: in which order electrons fill subshells, the rules that decide how they occupy orbitals, and the configurations of atoms and ions.',
      v: V.aufbau,
      n: 'Welcome to Part Two. Now that we know the orbitals, we can ask how electrons are placed in them. Three rules decide the ground state of an atom: the Aufbau principle for the order of energy, Pauli’s principle for how many electrons an orbital holds, and Hund’s rule for how electrons spread over equal orbitals.',
    }),
    sl('concept', 'Aufbau principle', {
      b: 'The German word *Aufbau* means building up. In the **ground state**, electrons occupy the **lowest-energy orbitals available first**. In a many-electron atom the energy depends on **both $n$ and $l$**, so a subshell of a higher shell can lie below one of a lower shell (4s below 3d).',
      v: flow('LR', [['a', 'Take the next electron of the atom'], ['b', 'Find the vacant subshell of lowest energy'], ['c', 'Place the electron there, obeying Pauli and Hund'], ['d', 'Repeat until all Z electrons are placed']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow chart of the Aufbau procedure for filling electrons one at a time into the lowest vacant orbital'),
      n: 'Aufbau is a German word meaning building up. In the ground state, electrons go into the lowest-energy orbitals that are free. In a hydrogen atom the energy depends only on n, but in a many-electron atom it depends on n and l together, so a subshell of a higher shell can sit below a subshell of a lower shell.',
    }),
    sl('concept', 'The (n + l) rule', {
      b: 'Subshells fill in order of **increasing $(n + l)$**. If two subshells have the **same $(n + l)$**, the one with the **lower $n$** fills first.',
      v: table(['Subshell', 'n', 'l', 'n + l', 'Fills'], [['4s', '4', '0', '4', 'First'], ['3d', '3', '2', '5', 'Second (lower n)'], ['4p', '4', '1', '5', 'Third'], ['5s', '5', '0', '5', 'Fourth']], 'Table applying the (n + l) rule to 4s, 3d, 4p and 5s'),
      n: 'The n plus l rule says that subshells fill in order of increasing value of n plus l. When two subshells have the same value, the one with the lower n fills first. So four s, with a value of four, fills before three d, which has five. Three d then fills before four p, and four p before five s.',
    }),
    sl('diagram', 'The order of filling', {
      b: 'Reading the numbers in the boxes gives the order: **1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s, 5f, 6d, 7p**. Arrows join subshells of equal $(n + l)$.',
      v: V.aufbau,
      n: 'This diagram lists the subshells by shell and type. The numbers show the order of filling, which follows the n plus l rule. Each coloured arrow joins subshells with the same n plus l, and electrons go first to the one at the top of the arrow. This is the sequence you should learn for writing configurations.',
    }),
    sl('example', 'Worked example: arranging subshells by energy', {
      b: r`**Problem.** Arrange $4f$, $5s$, $6s$, $4d$ and $5p$ in order of increasing energy.

$(n+l)$ values: $4f = 4+3 = 7$; $5s = 5+0 = 5$; $6s = 6+0 = 6$; $4d = 4+2 = 6$; $5p = 5+1 = 6$.

$5s$ has the lowest value. $4d$, $5p$, $6s$ all have 6, so they go by $n$: $4d < 5p < 6s$. $4f$ (7) is highest.

Order: ${ord.join(' < ')}.`,
      v: table(['Subshell', 'n + l', 'Tie-break by n', 'Rank'], [['5s', '5', '', '1'], ['4d', '6', 'n = 4', '2'], ['5p', '6', 'n = 5', '3'], ['6s', '6', 'n = 6', '4'], ['4f', '7', '', '5']], 'Table ranking 5s, 4d, 5p, 6s and 4f by the (n + l) rule'),
      n: 'Calculate n plus l for each. Five s gives five, so it is lowest. Four d, five p and six s all give six, so they are ordered by n: four d first, then five p, then six s. Four f gives seven and is highest. The order is five s, four d, five p, six s, four f.',
    }),
    sl('check', 'Quick check: the order of subshells', {
      b: 'Work out n + l for each subshell and use n to break ties.',
      n: 'Quick check. Write n plus l next to each subshell in the question. Put the smallest value first. If two subshells share a value, put the one with the smaller shell number first. Then compare the order you have found with the options, one at a time.',
      chk: 'nl-order-mcq',
    }),
    sl('concept', 'Pauli’s exclusion principle', {
      b: 'No two electrons in an atom can have **all four quantum numbers the same**. Two electrons in one orbital share $n$, $l$, $m_l$, so they must differ in $m_s$: **an orbital holds at most two electrons, with opposite spins**. This gives shell capacity $2n^2$.',
      v: table(['Level', 'Orbitals', 'Maximum electrons'], [['Orbital', '1', '2'], ['s subshell', '1', '2'], ['p subshell', '3', '6'], ['d subshell', '5', '10'], ['f subshell', '7', '14'], ['Shell n', 'n²', '2n²']], 'Table of the maximum number of electrons in an orbital, subshells and a shell from Pauli’s principle'),
      n: 'Pauli’s exclusion principle says that no two electrons in an atom can have all four quantum numbers the same. Two electrons in the same orbital already share the first three, so they must have opposite spins, and a third electron cannot fit. That is why an orbital holds two electrons and a shell holds two n squared.',
    }),
    sl('concept', 'Hund’s rule of maximum multiplicity', {
      b: 'In a subshell of **equal-energy orbitals**, electrons occupy **separate orbitals with parallel spins first**; pairing begins only when every orbital has one electron. Singly filled orbitals keep electrons apart (**less repulsion**) and give the **greatest number of unpaired electrons**.',
      v: table(['Electrons in p subshell', 'Box diagram', 'Unpaired'], [['p¹', '↑ _ _', '1'], ['p²', '↑ ↑ _', '2'], ['p³', '↑ ↑ ↑', '3'], ['p⁴', '↑↓ ↑ ↑', '2'], ['p⁶', '↑↓ ↑↓ ↑↓', '0']], 'Table showing Hund’s rule for one to six electrons in a p subshell with the number of unpaired electrons'),
      n: 'Hund’s rule applies when a subshell has several orbitals of equal energy. Electrons go into separate orbitals with parallel spins first, and pair up only when every orbital in the subshell already holds one electron. This keeps the electrons apart, lowers the repulsion, and gives the largest number of unpaired electrons.',
    }),
    sl('diagram', 'Orbital box diagrams', {
      b: 'Phosphorus: $3s^2\\,3p^3$ gives **three unpaired** electrons (Hund). Iron has **four**; Fe³⁺ has **five** (half-filled 3d). Chromium has **six** and copper **one**. Each box holds an up-arrow and a down-arrow at most (Pauli).',
      v: V.boxes,
      n: 'In these diagrams each box is an orbital and each arrow an electron. Phosphorus has three unpaired electrons in its three p boxes, as Hund’s rule requires. Iron has four unpaired. The iron three plus ion has five. Chromium has six and copper just one. No box ever holds more than two arrows, as Pauli requires.',
    }),
    sl('example', 'Worked example: orbital diagram of sulfur', {
      b: r`**Problem.** Write the configuration of sulfur ($Z = 16$), draw the $3p$ boxes, and give the number of unpaired electrons and a set of quantum numbers for the last electron.

Configuration: $${sCfg.map(([s, k]) => `${s}^{${k}}`).join('\\,')}$, or $[\text{Ne}]\,3s^2\,3p^4$.

$3p^4$: three boxes get one electron each, the fourth electron pairs in the first box: $\uparrow\downarrow\ \uparrow\ \uparrow$, so **${unp(16)} unpaired**.

Last electron (by convention $m_l = -1$ fills first, then pairs): $(3, 1, -1, -\tfrac12)$.`,
      v: table(['Subshell', 'Electrons', 'Boxes', 'Unpaired'], [['3s', '2', '↑↓', '0'], ['3p', '4', '↑↓ ↑ ↑', String(unp(16))]], 'Table of the orbital filling of sulfur in 3s and 3p'),
      n: 'Sulfur has sixteen electrons, so after the neon core it has two in three s and four in three p. The first three p electrons go singly into the three boxes. The fourth must pair with the first. That leaves two unpaired electrons. By convention the last electron has n three, l one, magnetic number minus one, and spin minus one half.',
    }),
    sl('check', 'Quick check: unpaired electrons', {
      b: 'Write the configuration, then apply Hund’s rule to the outer subshell.',
      n: 'Quick check. Write the full configuration of the atom or ion first, using the order of filling. Identify the outermost partly filled subshell and draw its boxes. Place electrons singly before pairing them, then count how many boxes hold a single arrow. Complete subshells contribute no unpaired electrons.',
      chk: 'unpaired-mcq',
    }),
    sl('concept', 'Writing electronic configurations', {
      b: 'Fill subshells in the **Aufbau order** until Z electrons are placed, then write them in order of **increasing $n$** (3d before 4s). The **noble-gas core** shortens the notation: $[\\text{Ar}]\\,3d^6\\,4s^2$. Elements **Z = 21 to 30** show the 3d series; **Cr and Cu** are exceptions.',
      v: table(['Element', 'Z', 'Configuration', 'Unpaired'], d3.map(([z, nm]) => cfgRow(z, nm)), 'Table of the configurations of the elements from scandium to zinc with unpaired electrons'),
      n: 'To write a configuration, fill the subshells in the order of increasing n plus l until you have placed all the electrons, and then write them grouped by shell. A noble gas symbol in brackets can replace the inner core. The table shows scandium to zinc. Notice that chromium and copper do not follow the simple order.',
    }),
    sl('concept', 'Chromium and copper: extra stability', {
      b: 'Cr should be $3d^4\\,4s^2$ but is **$3d^5\\,4s^1$**; Cu should be $3d^9\\,4s^2$ but is **$3d^{10}\\,4s^1$**. **Half-filled** ($d^5$) and **completely filled** ($d^{10}$) subshells are **extra stable**: symmetrical distribution and **greater exchange energy**, and 4s and 3d are close in energy so one 4s electron shifts.',
      v: table(['Atom', 'Expected', 'Actual', 'Why'], [['Cr (24)', '[Ar] 3d⁴ 4s²', shortU(24), 'Half-filled 3d⁵'], ['Cu (29)', '[Ar] 3d⁹ 4s²', shortU(29), 'Filled 3d¹⁰']], 'Table comparing the expected and actual configurations of chromium and copper'),
      n: 'Chromium and copper are the two exceptions up to zinc. Chromium would be three d four, four s two, but moves one electron to give three d five, four s one. Copper moves one electron to give a full three d ten. Half-filled and completely filled subshells are extra stable, because of symmetry and greater exchange energy.',
    }),
    sl('example', 'Worked example: cobalt and its ions', {
      b: r`**Problem.** Write the configurations of Co ($Z = 27$), Co²⁺ and Co³⁺, and give the unpaired electrons.

**Co:** ${shortU(27)}, ${unp(27)} unpaired.

Cations lose electrons from the **outermost shell first**, so the $4s$ electrons go before $3d$.

**Co²⁺:** remove both $4s$: ${shortU(27, 2)}, ${unp(27, 2)} unpaired. **Co³⁺:** remove one $3d$: ${shortU(27, 3)}, ${unp(27, 3)} unpaired.`,
      v: table(['Species', 'Configuration', 'Unpaired'], coRows, 'Table of the configurations and unpaired electrons of Co, Co2+ and Co3+'),
      n: 'Cobalt has twenty-seven electrons: argon core, three d seven, four s two, with three unpaired. When it forms a cation, the electrons leave the outermost shell first, so the two four s electrons go first and give cobalt two plus, three d seven. Losing a third electron comes from three d, giving three d six with four unpaired electrons.',
    }),
    sl('concept', 'Configurations of ions', {
      b: 'A **cation** loses electrons from the **highest-$n$ shell first**; an **anion** adds electrons to the **next vacant subshell** of the Aufbau order. Many ions reach a **noble-gas configuration**, and species with the same electron count are **isoelectronic**.',
      v: table(['Ion', 'Electrons', 'Configuration', 'Isoelectronic with'], ionRows, 'Table of ions with their electrons, configurations and the noble gas they match'),
      n: 'Cations lose electrons from the outermost shell first. Anions add electrons to the next vacant subshell. Look at the table: sodium, magnesium and aluminium positive ions, and nitride, oxide and fluoride ions, all have ten electrons and match neon. Chloride and calcium ions match argon. Species with the same number of electrons are called isoelectronic.',
    }),
    sl('check', 'Quick check: electrons in a transition-metal ion', {
      b: 'Remove the electrons from the outermost shell first, then count unpaired electrons.',
      n: 'Quick check. Write the configuration of the neutral atom, remembering any exception. Remove electrons from the shell with the highest n first, which means the four s electrons come off before the three d electrons. Then distribute the remaining three d electrons singly among the five boxes and count the unpaired ones.',
      chk: 'ion-unp-num',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'Aufbau: lowest energy first; order of increasing (n + l), lower n first when tied.',
        'Pauli: no two electrons with the same four quantum numbers; an orbital holds two electrons of opposite spin.',
        'Hund: single occupancy with parallel spins before pairing in equal-energy orbitals.',
        'Cr is [Ar] 3d⁵ 4s¹ and Cu is [Ar] 3d¹⁰ 4s¹: half-filled and filled subshells are extra stable.',
        'Cations lose the outermost (highest n) electrons first.',
      ],
      v: table(['Principle', 'What it decides'], [['Aufbau', 'Order in which subshells are filled'], ['Pauli', 'At most two electrons per orbital'], ['Hund', 'How electrons spread over equal orbitals']], 'Summary table of the three filling principles'),
      n: 'Summing up Part Two. Subshells fill by increasing n plus l, with lower n first on a tie. An orbital holds two electrons of opposite spin, and electrons spread over equal orbitals singly before pairing. Chromium and copper take extra stability from half-filled and filled d subshells, and cations lose their outermost electrons first.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Write n + l for each subshell before ordering; break ties with lower n.',
        'Write configurations in the order of filling, then regroup by shell for the final answer.',
        'For Cr and Cu, state the exception and give the half-filled or filled reason.',
        'For cations, remove 4s electrons before 3d; for anions, add to the next subshell.',
        'Draw boxes for unpaired-electron questions: singly first, then pair.',
      ],
      v: table(['Slip', 'Fix'], [['Removing 3d electrons before 4s in Fe²⁺', 'Remove 4s first'], ['Writing Cr as 3d⁴ 4s²', '3d⁵ 4s¹ (half-filled)'], ['Pairing electrons in p³', 'Three unpaired (Hund)'], ['Ordering subshells by n alone', 'Use n + l']], 'Table of common slips in Part 2 and how to fix them'),
      n: 'Some exam tips. Write n plus l for each subshell before you order them. Give configurations in the order of filling and then regroup by shell. For chromium and copper, name the exception and give the reason. For cations remove four s electrons before three d, and for unpaired electron questions draw the boxes and fill them singly first.',
    }),
  ],
});
void lValues;
void orbitalsInShell;
void electronsInShell;
void countL;
void nlVals;
