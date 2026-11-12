// ISC 11 Chemistry ch05 Quantum Mechanical Model and Electronic Configuration: question bank (ISC style). Schrödinger
// equation is not derived (ISC scope); every count, node number and configuration is computed in data.mjs and re-solved.
// Assertion-reason keys (862 order, no "A false, R true"): a c d b a c.
import { mk, add, r, near } from './lib.mjs';
import {
  config, shortU, cfgU, unp, nodes, validSet, byEnergy, electronsInShell, orbitalsInShell, mlValues, lValues, countL, ORDER_NAMES, orbitalsIn, LETTER,
} from './data.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const nd = nodes;
const ok = (c, m) => c || m;

// ================================================================ t01 wave equation, psi and psi squared, orbital
add('psi2-mcq', mcq({
  stem: r`A student plotting the 1s orbital of hydrogen finds that $\psi^2$ is about $0.30$ (in suitable units) at a point very close to the nucleus and about $0.02$ at a point much farther out. She concludes correctly that the electron is:`,
  right: 'more likely to be found in a small volume near the nucleus than in an equal volume at the farther point',
  wrong: ['moving faster near the nucleus than it does at the farther point', 'found only at the first point and never at the second', 'travelling in a circular path that passes through both points'],
  sol: r`$\psi^2$ is the probability density, so the larger value near the nucleus means a greater chance of finding the electron in a given small volume there — option (@K). A density says nothing about speed or about a path.`,
  d: 2, c: 'understanding', t: [1],
}));
add('wavefn-mcq', mcq({
  stem: 'Which statement about the wave function ψ of an electron in an atom is correct?',
  right: 'ψ has no direct physical meaning, but ψ² at a point is the probability density there',
  wrong: ['ψ is the probability of finding the electron at a point', 'ψ must be positive at every point of space', 'ψ is zero everywhere except on a circle round the nucleus'],
  sol: r`Only the square of the wave function is interpreted, as probability density; $\psi$ itself can be positive or negative — option (@K).`,
  d: 1, c: 'recall', t: [1],
}));
add('orbital-mcq', mcq({
  stem: 'In the quantum mechanical model of the atom, an orbital is best described as:',
  right: 'a one-electron wave function, associated with a region where the electron is most probably found',
  wrong: ['a circular path in which the electron revolves at a fixed speed', 'a pair of electrons with opposite spins in the same shell', 'the surface on which the electron is certain to be found'],
  sol: 'An orbital is the wave function of a single electron; its ψ² maps the region of high probability — option (@K). It is neither a path nor a certain location.',
  d: 1, c: 'recall', t: [1],
}));
add('schro-tf', tf({
  stem: 'The Schrödinger equation can be solved exactly for the hydrogen atom, but for atoms with more than one electron only approximate solutions are possible.',
  key: 't',
  sol: 'True. The electron–electron repulsion in many-electron atoms makes an exact solution impossible, so approximations are used.',
  d: 1, c: 'recall', t: [1],
}));
add('wave-fill', fill({
  stem: 'The square of the wave function, ψ², at a point gives the electron ___ at that point.',
  acc: [['probability density', 'the probability density', 'density']],
  sol: 'ψ² is the probability density.',
  d: 1, c: 'recall', t: [1],
}));
add('psi-ar', ar({
  a: 'An electron in the 2s orbital of hydrogen is never found at a distance of exactly 2 a₀ from the nucleus.',
  r: 'At that distance ψ² is zero, so the probability density there is zero.',
  key: 'a',
  sol: 'Both are true. The 2s orbital has a radial node at 2 a₀, where ψ² = 0, so R explains A — option (a).',
  d: 3, c: 'analysis', t: [1, 3],
}));
add('psi-short2', short({
  marks: 2,
  stem: 'A chemistry teacher says that "ψ tells us nothing directly, but ψ² does". What does ψ² represent for an electron in an atom, and why is no meaning given to ψ itself?',
  model: 'ψ² at a point is the probability density: its product with a small volume gives the probability of finding the electron in that volume. The wave function ψ is only the amplitude of the electron wave, which may be positive or negative, and no measurable quantity corresponds to it directly.',
  sol: 'ψ² is probability density; ψ is only an amplitude.',
  scheme: [['ψ² as probability density (probability per unit volume)', 1], ['ψ is only an amplitude with no direct physical meaning', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('orbit-orbital-short2', short({
  marks: 2,
  stem: 'Give two differences between the orbit of Bohr’s model and the orbital of the quantum mechanical model.',
  model: 'A Bohr orbit is a definite circular path of fixed radius, whereas an orbital is a region of space in which the electron is most probably found, described by a wave function. An orbit can hold any number of electrons by the model’s rules for shells, but an orbital holds at most two electrons of opposite spin; also, an orbit gives an exact position, an orbital gives only a probability.',
  sol: 'Fixed path versus probability region; exact position versus probability; capacity of two electrons.',
  scheme: [['First correct difference (path versus region of probability)', 1], ['Second correct difference', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('boundary-short2', short({
  marks: 2,
  stem: 'Why is an orbital drawn as a boundary surface that contains about 90% of the electron probability, instead of a surface that contains 100%?',
  model: 'The probability density ψ² falls steadily with distance but never becomes exactly zero, so a surface that encloses all of the probability would have to extend to infinity. A boundary surface holding about 90% shows the region where the electron is mostly found and has a definite size and shape.',
  sol: 'ψ² never reaches zero, so 100% needs an infinite surface.',
  scheme: [['ψ² decreases with distance but never becomes zero', 1], ['A 100% surface would be infinite; 90% gives a definite shape and size', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ================================================================ t02 quantum numbers
add('qn-set-mcq', (() => {
  const right = [3, 2, -2, 0.5];
  const wrong = [[2, 2, 0, -0.5], [3, 1, -2, 0.5], [4, 3, 1, 0]];
  const fmt = (s) => `(${s[0]}, ${s[1]}, ${s[2] > 0 ? '+' : s[2] < 0 ? '−' : ''}${Math.abs(s[2])}, ${s[3] === 0 ? '0' : s[3] > 0 ? '+½' : '−½'})`;
  return mcq({
    stem: r`Four sets of quantum numbers $(n, l, m_l, m_s)$ were proposed for electrons in different atoms. Which set is allowed?`,
    right: fmt(right),
    wrong: wrong.map(fmt),
    sol: r`For $(3, 2, -2, +\tfrac12)$: $l = 2 \le n-1$, $|m_l| = 2 \le l$ and $m_s = +\tfrac12$ — option (@K) is allowed. Option (@1) has $l = n$; option (@2) has $|m_l| = 2 > l = 1$; option (@3) has $m_s = 0$, which is not $\pm\tfrac12$.`,
    d: 2, c: 'application', t: [2],
  });
})(), () => ok(validSet(3, 2, -2, 0.5) && !validSet(2, 2, 0, -0.5) && !validSet(3, 1, -2, 0.5) && !validSet(4, 3, 1, 0), 'qn-set'));
add('shell-mcq', (() => {
  const v = orbitalsInShell(4);
  return mcq({
    stem: 'A teacher prepares a wall chart showing every orbital of the shell with n = 4. The chart must show how many orbitals?',
    right: String(v),
    wrong: ['4', '8', String(electronsInShell(4))],
    sol: r`Orbitals in shell $n$ $= n^2 = 4^2 = ${v}$ ($1 + 3 + 5 + 7$) — option (@K). 8 and 32 count electrons or confuse $n^2$ with $2n^2$.`,
    d: 1, c: 'understanding', t: [2],
  });
})(), () => ok(orbitalsInShell(4) === 16 && [0, 1, 2, 3].reduce((a, l) => a + orbitalsIn(l), 0) === 16, 'shell'));
add('lval-mcq', mcq({
  stem: 'For electrons in the shell with n = 3, which list gives all the permitted values of the azimuthal quantum number l?',
  right: '0, 1 and 2',
  wrong: ['1, 2 and 3', '0, 1, 2 and 3', '0 and 1 only'],
  sol: r`$l$ runs from $0$ to $n-1 = 2$, so $l = 0, 1, 2$ — option (@K).`,
  d: 1, c: 'understanding', t: [2],
}));
add('mldiff-mcq', mcq({
  stem: 'Two orbitals of a ground-state atom have the same values of n and l but different values of mₗ. They differ in:',
  right: 'their orientation in space',
  wrong: ['their average distance from the nucleus', 'their shape', 'the number of nodes they possess'],
  sol: 'n fixes size, l fixes shape (and node numbers), and mₗ fixes orientation, so orbitals differing only in mₗ differ only in orientation — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('mshalf-mcq', (() => {
  const v = electronsInShell(4) / 2;
  return mcq({
    stem: r`How many electrons in an atom can have the quantum numbers $n = 4$ and $m_s = +\tfrac12$?`,
    right: String(v),
    wrong: ['32', '8', '4'],
    sol: r`The shell $n = 4$ holds $2n^2 = ${electronsInShell(4)}$ electrons; each of its $n^2 = 16$ orbitals has exactly one electron with $m_s = +\tfrac12$, so the number is $${v}$ — option (@K).`,
    d: 3, c: 'analysis', t: [2],
  });
})(), () => ok(electronsInShell(4) / 2 === 16 && orbitalsInShell(4) === 16, 'ms half'));
add('f-mcq', mcq({
  stem: 'An electron in a 4f orbital has an azimuthal quantum number l and the subshell has a number of possible mₗ values equal to, respectively:',
  right: '3 and 7',
  wrong: ['4 and 7', '3 and 3', '4 and 9'],
  sol: r`For an f subshell $l = 3$, so $m_l$ has $2l + 1 = 7$ values — option (@K).`,
  d: 2, c: 'understanding', t: [2],
}));
add('qn-ar', ar({
  a: 'The shell with n = 3 contains nine orbitals.',
  r: 'For each value of l there are (l + 1) possible values of mₗ.',
  key: 'c',
  sol: 'A is true: 1 + 3 + 5 = 9 = n². R is false: mₗ has (2l + 1) values for each l, not (l + 1) — option (c).',
  d: 3, c: 'analysis', t: [2],
}));
add('shell5-num', (() => {
  const v = electronsInShell(5);
  return num({
    stem: r`A student builds a model of the O shell, the shell with $n = 5$, as a set of boxes holding two electrons each. What is the maximum number of electrons the shell can accommodate?`,
    value: v, tol: 0, unit: 'electrons',
    sol: r`Electrons in shell $n$ $= 2n^2 = 2 \times 5^2 = ${v}$.`,
    scheme: [['Uses 2n²', 0.5], ['50', 0.5]],
    marks: 1, d: 1, c: 'understanding', t: [2],
  });
})(), (q) => ok(q.answer.value === 2 * 25, 'shell5'));
add('sublvl-fill', fill({
  stem: 'A subshell with azimuthal quantum number l = 2 contains ___ orbitals.',
  acc: [['5', 'five']],
  sol: 'A subshell has 2l + 1 orbitals, which is 5 for l = 2.',
  d: 1, c: 'recall', t: [2],
}));
add('qn-match', match({
  stem: 'Match each quantum number with the property of the electron or orbital that it fixes.',
  pairs: [['Principal quantum number n', 'Size and energy of the shell'], ['Azimuthal quantum number l', 'Shape of the orbital'], ['Magnetic quantum number mₗ', 'Orientation of the orbital in space'], ['Spin quantum number mₛ', 'Direction of electron spin']],
  order: [1, 3, 0, 2],
  sol: 'n → q (size and energy); l → s (shape); mₗ → p (orientation); mₛ → r (spin direction).',
  d: 1, c: 'recall', t: [2],
}));
add('na-short2', (() => {
  const occ = config(11);
  return short({
    marks: 2,
    stem: 'Give a set of the four quantum numbers (n, l, mₗ, mₛ) for the single outermost electron of a ground-state sodium atom, Z = 11, and name the subshell it occupies.',
    model: `The configuration is ${cfgU(11)}, so the outermost electron is in the 3s subshell. For it n = 3, l = 0, mₗ = 0 and mₛ = +½ (or −½), that is (3, 0, 0, +½).`,
    sol: 'Outermost electron in 3s; (3, 0, 0, +½).',
    scheme: [['Configuration found, subshell 3s', 1], ['(3, 0, 0, +½) or (3, 0, 0, −½)', 1]],
    d: 2, c: 'application', t: [2],
  });
})(), () => ok(config(11).at(-1)[0] === '3s', 'na'));
add('d4-short2', short({
  marks: 2,
  stem: 'For the 4d subshell, state the values of n and l, list the possible values of mₗ and give the maximum number of electrons it can hold.',
  model: 'For 4d: n = 4 and l = 2. mₗ can be −2, −1, 0, +1 and +2, which are five values, so there are five orbitals. The subshell holds at most 2 × 5 = 10 electrons.',
  sol: 'n = 4, l = 2; mₗ = −2 to +2; 10 electrons.',
  scheme: [['n = 4, l = 2 and the five values of mₗ', 1], ['5 orbitals × 2 = 10 electrons', 1]],
  d: 2, c: 'application', t: [2],
}), () => ok(mlValues(2).length === 5 && 2 * mlValues(2).length === 10, 'd4'));
add('ml-short3', (() => {
  const ls = lValues(3);
  const orbs = ls.map((l) => orbitalsIn(l));
  const sum = orbs.reduce((a, b) => a + b, 0);
  return short({
    marks: 3,
    stem: 'A student lists the subshells of the third shell, n = 3. Give the allowed values of l, name each subshell, state the number of orbitals in each, and give the maximum number of electrons in the shell.',
    model: `For n = 3, l = 0, 1 and 2, giving the subshells 3s, 3p and 3d. They contain ${orbs.join(', ')} orbitals respectively, ${sum} in all (n² = 9). With two electrons per orbital the shell holds ${2 * sum} electrons (2n² = 18).`,
    sol: `l = 0, 1, 2; 3s, 3p, 3d; ${orbs.join(', ')} orbitals; ${2 * sum} electrons.`,
    scheme: [['l = 0, 1, 2 and the subshells 3s, 3p, 3d', 1], ['1, 3 and 5 orbitals', 1], ['18 electrons', 1]],
    d: 2, c: 'application', t: [2],
  });
})(), () => ok(lValues(3).join() === '0,1,2' && 2 * orbitalsInShell(3) === 18, 'ml'));
add('qn-short3', short({
  marks: 3,
  stem: 'State the four quantum numbers by name and give, for each, the allowed values and the property of the electron that it describes.',
  model: 'The principal quantum number n (1, 2, 3 …) gives the shell, and so the size and energy. The azimuthal quantum number l (0 to n − 1) gives the subshell and the shape of the orbital. The magnetic quantum number mₗ (−l to +l) gives the orientation of the orbital, and the spin quantum number mₛ (+½ or −½) gives the direction of spin of the electron.',
  sol: 'n, l, mₗ, mₛ with their values and meanings.',
  scheme: [['n and l with values and meanings', 1], ['mₗ with values and meaning', 1], ['mₛ with values and meaning', 1]],
  d: 1, c: 'recall', t: [2],
}));

// ================================================================ t03 shapes, nodes, radial probability
add('radnode-mcq', (() => {
  const v = nd(5, 0).radial;
  return mcq({
    stem: 'A teacher draws the radial probability curve of the 5s orbital of an atom. Not counting r = 0, how many times does the curve touch zero between the nucleus and infinity?',
    right: String(v),
    wrong: ['3', '5', '1'],
    sol: r`These zero points are the radial nodes: $n - l - 1 = 5 - 0 - 1 = ${v}$ — option (@K).`,
    d: 2, c: 'application', t: [3],
  });
})(), () => ok(nd(5, 0).radial === 4, 'radnode'));
add('dxy-mcq', mcq({
  stem: 'Which description of the dxy orbital is correct?',
  right: 'Four lobes lying between the x and y axes, with the xz and yz planes as nodal planes',
  wrong: ['Four lobes lying along the x and y axes, with the xz and yz planes as nodal planes', 'Four lobes lying between the x and y axes, with the xy plane as the only nodal plane', 'Two lobes along the z axis with a ring in the xy plane'],
  sol: 'The dxy orbital has its four lobes between the axes, and its two nodal planes are the xz and yz planes — option (@K). Lobes along the axes belong to dx²−y²; lobes with a ring belong to dz².',
  d: 2, c: 'understanding', t: [3],
}));
add('pz-mcq', mcq({
  stem: 'The probability of finding a pz electron is zero everywhere in the:',
  right: 'xy plane',
  wrong: ['xz plane', 'yz plane', 'surface of a sphere centred on the nucleus'],
  sol: 'The pz lobes point along the z axis, and the nodal plane is perpendicular to them, the xy plane — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('size-mcq', mcq({
  stem: 'Which of the following orbitals of a hydrogen atom is, on average, the largest?',
  right: '4s',
  wrong: ['3d', '3p', '2s'],
  sol: 'Orbital size increases with the principal quantum number; 4s has the largest n of the four, so it is the largest — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('peaks-mcq', mcq({
  stem: 'The radial probability curve of an orbital shows three peaks separated by two points where it falls to zero. The orbital is:',
  right: '3s',
  wrong: ['3p', '2s', '4d'],
  sol: r`Peaks = radial nodes + 1, so two nodes need $n - l - 1 = 2$. For 3s: $3 - 0 - 1 = 2$ — option (@K). 3p has 1 node, 2s has 1 and 4d has 1.`,
  d: 3, c: 'application', t: [3],
}), () => ok(nd(3, 0).radial === 2 && nd(3, 1).radial === 1 && nd(2, 0).radial === 1 && nd(4, 2).radial === 1, 'peaks'));
add('dz2-mcq', mcq({
  stem: 'Which orbital consists of two lobes along one axis together with a ring-shaped region of opposite sign in the plane perpendicular to that axis?',
  right: 'dz²',
  wrong: ['dxy', 'dx²−y²', 'pz'],
  sol: 'The dz² orbital has two lobes along the z axis and a ring in the xy plane — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('nodes-ar', ar({
  a: 'The 3p orbital has no radial node.',
  r: 'The number of radial nodes of an orbital is equal to (n − l).',
  key: 'd',
  sol: 'Both are false. The number of radial nodes is n − l − 1 = 1 for 3p, so A is false; and R omits the − 1, so R is false — option (d).',
  d: 3, c: 'analysis', t: [3],
}));
add('pnode-tf', tf({
  stem: 'The nucleus lies on the nodal plane of every p orbital, so the probability density of a p electron at the nucleus is zero.',
  key: 't',
  sol: 'True. The nodal plane of a p orbital passes through the nucleus and ψ² = 0 everywhere on it.',
  d: 2, c: 'understanding', t: [3],
}));
add('nodes-num', (() => {
  const v = nd(6, 2).radial;
  return num({
    stem: 'A computer plot of the 6d orbital of an atom is to be marked with its radial nodes. How many radial nodes must be drawn?',
    value: v, tol: 0, unit: 'nodes',
    sol: r`Radial nodes $= n - l - 1 = 6 - 2 - 1 = ${v}$.`,
    scheme: [['Uses n − l − 1 with l = 2', 0.5], ['3', 0.5]],
    marks: 1, d: 2, c: 'application', t: [3],
  });
})(), (q) => ok(q.answer.value === 3, 'nodes'));
add('nodes-match', (() => {
  const names = [['2p', 2, 1], ['3s', 3, 0], ['3d', 3, 2], ['4p', 4, 1]];
  const txt = ([, n, l]) => `${nd(n, l).radial} radial and ${nd(n, l).angular} angular`;
  return match({
    stem: 'Match each orbital with the numbers of its radial and angular nodes.',
    pairs: names.map((x) => [x[0], txt(x)]),
    order: [2, 0, 3, 1],
    sol: 'Radial = n − l − 1 and angular = l: 2p → r (0 radial, 1 angular); 3s → p (2, 0); 3d → s (0, 2); 4p → q (2, 1).',
    d: 2, c: 'application', t: [3],
  });
})());
add('nodal-short2', short({
  marks: 2,
  stem: 'Define a node. Calculate the numbers of radial and angular nodes of the 3p orbital.',
  model: 'A node is a region where ψ² = 0, so the probability of finding the electron there is zero. For 3p (n = 3, l = 1): radial nodes = n − l − 1 = 1 and angular nodes = l = 1.',
  sol: 'Node: ψ² = 0. 3p: 1 radial and 1 angular.',
  scheme: [['Node: ψ² = 0, zero probability', 1], ['1 radial and 1 angular node with the rules', 1]],
  d: 2, c: 'application', t: [3],
}));
add('dorb-short2', short({
  marks: 2,
  stem: 'Name the five d orbitals and say which one has four lobes lying along the axes.',
  model: 'The five d orbitals are dxy, dyz, dxz, dx²−y² and dz². The orbital dx²−y² has its four lobes along the x and y axes; the dxy, dyz and dxz orbitals have lobes between the axes.',
  sol: 'dxy, dyz, dxz, dx²−y², dz²; dx²−y² has lobes along the axes.',
  scheme: [['All five names', 1], ['dx²−y² along the axes', 1]],
  d: 1, c: 'recall', t: [3],
}));
add('nodes-short3', (() => {
  const a = nd(4, 0);
  const b = nd(3, 2);
  return short({
    marks: 3,
    stem: 'For the 4s and 3d orbitals, calculate the number of radial nodes, angular nodes and total nodes, and say which of the two orbitals has the larger number of radial nodes.',
    model: `Radial nodes = n − l − 1, angular nodes = l and total nodes = n − 1. For 4s: radial ${a.radial}, angular ${a.angular}, total ${a.total}. For 3d: radial ${b.radial}, angular ${b.angular}, total ${b.total}. The 4s orbital has more radial nodes (${a.radial} against ${b.radial}).`,
    sol: `4s: ${a.radial}, ${a.angular}, ${a.total}; 3d: ${b.radial}, ${b.angular}, ${b.total}; 4s has more radial nodes.`,
    scheme: [['4s: 3 radial, 0 angular, 3 total', 1], ['3d: 0 radial, 2 angular, 2 total', 1], ['4s has more radial nodes', 1]],
    d: 3, c: 'application', t: [3],
  });
})(), () => ok(nd(4, 0).radial === 3 && nd(3, 2).radial === 0 && nd(3, 2).angular === 2, 'nodes3'));
add('shape-short3', short({
  marks: 3,
  stem: 'Describe the shape of a 2p orbital. State how the three 2p orbitals are oriented, and how the size of a 3p orbital compares with that of a 2p orbital.',
  model: 'A 2p orbital has two lobes of opposite sign on either side of the nucleus (dumbbell shape), with a nodal plane through the nucleus perpendicular to the axis of the lobes. The three 2p orbitals, 2pₓ, 2p_y and 2p_z, lie along the x, y and z axes at right angles (mₗ = −1, 0, +1). A 3p orbital is larger than a 2p orbital, because size increases with n.',
  sol: 'Two lobes with a nodal plane; three axes; 3p larger than 2p.',
  scheme: [['Two lobes with a nodal plane through the nucleus', 1], ['Three orbitals along x, y and z', 1], ['3p larger than 2p because n is larger', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('radial-short3', short({
  marks: 3,
  stem: 'The radial probability curve of the 2s orbital shows two peaks, while that of the 2p orbital shows only one. Explain this using the number of radial nodes, and say which of the two has its main peak at the smaller distance.',
  model: 'The number of peaks is one more than the number of radial nodes. The 2s orbital has n − l − 1 = 1 radial node, so its curve has two peaks, a small one close to the nucleus and a large outer one. The 2p orbital has n − l − 1 = 0 radial nodes, so its curve has a single peak. For hydrogen the main peak of 2p is at about 4 a₀ and that of 2s at about 5.2 a₀, so 2p has its main peak at the smaller distance.',
  sol: 'Peaks = nodes + 1; 2s has 1 radial node, 2p has none; 2p peak nearer.',
  scheme: [['Peaks = radial nodes + 1', 1], ['2s: 1 node, two peaks; 2p: no node, one peak', 1], ['2p main peak at smaller distance (4 a₀ against 5.2 a₀)', 1]],
  d: 4, c: 'analysis', t: [3],
}));
add('nodes-long', (() => {
  const a = nd(5, 0);
  const b = nd(4, 1);
  const c = nd(3, 2);
  return long({
    stem: `(a) Calculate the number of radial nodes, angular nodes and total nodes in each of the 5s, 4p and 3d orbitals. [3]

(b) The radial probability curves of 2s and 2p are drawn on the same axes. State the number of peaks in each and explain how this is related to the number of radial nodes. [2]`,
    model: `(a) Radial = n − l − 1, angular = l, total = n − 1. 5s: radial ${a.radial}, angular ${a.angular}, total ${a.total}. 4p: radial ${b.radial}, angular ${b.angular}, total ${b.total}. 3d: radial ${c.radial}, angular ${c.angular}, total ${c.total}.

(b) The 2s curve has two peaks and the 2p curve has one. The number of peaks is one more than the number of radial nodes: 2s has one radial node and 2p has none.`,
    sol: 'Node numbers from the three rules; peaks equal radial nodes plus one.',
    scheme: [['(a) 5s: 4, 0, 4', 1], ['(a) 4p: 2, 1, 3', 1], ['(a) 3d: 0, 2, 2', 1], ['(b) Two peaks for 2s and one for 2p', 1], ['(b) Peaks = radial nodes + 1 with 1 and 0 nodes', 1]],
    d: 3, c: 'application', t: [3],
  });
})(), () => ok(nd(5, 0).radial === 4 && nd(4, 1).radial === 2 && nd(4, 1).total === 3 && nd(3, 2).total === 2, 'nodes-long'));

// ================================================================ t04 Aufbau, (n + l), Pauli, Hund
add('nl-order-mcq', (() => {
  const right = byEnergy(['3d', '4p', '4s', '5s']);
  return mcq({
    stem: 'Using the (n + l) rule, which sequence arranges the subshells 3d, 4p, 4s and 5s in order of increasing energy?',
    right: right.join(' < '),
    wrong: ['3d < 4s < 4p < 5s', '4s < 4p < 3d < 5s', '4s < 3d < 5s < 4p'],
    sol: r`$(n+l)$: $4s = 4$, $3d = 5$, $4p = 5$, $5s = 5$. The tie at 5 is broken by lower $n$: $3d < 4p < 5s$. So $4s < 3d < 4p < 5s$ — option (@K).`,
    d: 2, c: 'application', t: [4],
  });
})(), () => ok(byEnergy(['3d', '4p', '4s', '5s']).join() === '4s,3d,4p,5s', 'nl-order'));
add('pauli-mcq', mcq({
  stem: 'The statement that an orbital cannot hold more than two electrons, and that these two must have opposite spins, follows from:',
  right: 'Pauli’s exclusion principle',
  wrong: ['Hund’s rule of maximum multiplicity', 'the Aufbau principle', 'the (n + l) rule'],
  sol: 'No two electrons can have all four quantum numbers equal; in one orbital n, l and mₗ are shared, so mₛ must differ — Pauli’s exclusion principle, option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('hund-mcq', mcq({
  stem: 'The ground-state atom of an element has three electrons in its 4p subshell. According to Hund’s rule these three electrons:',
  right: 'occupy the three 4p orbitals singly, with parallel spins',
  wrong: ['occupy one 4p orbital as a pair and one as a single electron', 'occupy the three 4p orbitals singly, with opposite spins', 'occupy a single 4p orbital with the same spin'],
  sol: 'Orbitals of equal energy are filled singly with parallel spins before any pairing, so the three electrons sit in separate 4p orbitals with parallel spins — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('hund-viol-mcq', mcq({
  stem: 'A student writes the configuration of carbon as 1s² 2s² 2p² but draws both 2p electrons as a pair in one orbital, leaving the other two 2p orbitals empty. This diagram violates:',
  right: 'Hund’s rule',
  wrong: ['Pauli’s exclusion principle', 'the Aufbau principle', 'the (n + l) rule'],
  sol: 'The two electrons have opposite spins in one orbital, which Pauli allows, and the order of filling is right; but equal-energy orbitals must be filled singly first — Hund’s rule, option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('unpaired-mcq', (() => {
  const v = unp(34);
  return mcq({
    stem: r`How many unpaired electrons are there in a ground-state selenium atom, $Z = 34$, with configuration $[\text{Ar}]\,3d^{10}\,4s^2\,4p^4$?`,
    right: String(v),
    wrong: ['0', '4', '6'],
    sol: r`Only $4p^4$ is partly filled: three boxes take one electron each and the fourth pairs with the first, leaving ${v} unpaired electrons — option (@K). Filled 3d and 4s contribute none.`,
    d: 2, c: 'application', t: [4],
  });
})(), () => ok(unp(34) === 2 && countL(34, 0, 1) === 16, 'unpaired'));
add('capacity-mcq', (() => {
  const i = ORDER_NAMES.indexOf('5p');
  const v = ORDER_NAMES[i + 1];
  return mcq({
    stem: 'In building up the elements, after the 5p subshell has been completely filled, the next electron enters the:',
    right: v,
    wrong: ['4f', '5d', '6p'],
    sol: r`The order is ... 5s, 4d, 5p, 6s, 4f ...; $6s$ ($n+l = 6$) comes before $4f$ ($7$), $5d$ ($7$) and $6p$ ($7$) — option (@K).`,
    d: 2, c: 'application', t: [4],
  });
})(), () => ok(ORDER_NAMES[ORDER_NAMES.indexOf('5p') + 1] === '6s', 'capacity'));
add('order-tf', tf({
  stem: 'The 3d subshell is filled before the 4s subshell because the 3d subshell has the smaller principal quantum number.',
  key: 'f',
  sol: 'False. The (n + l) value is 4 for 4s but 5 for 3d, so 4s fills first, even though 3d has the smaller n.',
  d: 2, c: 'understanding', t: [4],
}));
add('mult-fill', fill({
  stem: 'Hund’s rule is also called the rule of maximum ___.',
  acc: [['multiplicity', 'spin multiplicity']],
  sol: 'Hund’s rule of maximum multiplicity.',
  d: 1, c: 'recall', t: [4],
}));
add('pauli-ar', ar({
  a: 'The 3d subshell can hold a maximum of ten electrons.',
  r: 'In the Aufbau order the 3d subshell is filled after the 4s subshell.',
  key: 'b',
  sol: 'Both are true. A: 3d has five orbitals (2l + 1 = 5), each holding two electrons by Pauli’s principle, so ten. R: by the (n + l) rule 4s (4 + 0 = 4) fills before 3d (3 + 2 = 5). But the filling order says nothing about how many electrons the subshell can hold, so R does not explain A — option (b).',
  d: 3, c: 'analysis', t: [4],
}));
add('pauli-short2', short({
  marks: 2,
  stem: 'State Pauli’s exclusion principle and use it to find the maximum number of electrons in the 4d subshell.',
  model: 'No two electrons in an atom can have the same set of all four quantum numbers, so an orbital holds at most two electrons, of opposite spin. The 4d subshell has five orbitals, so it holds at most 5 × 2 = 10 electrons.',
  sol: 'Statement; 5 orbitals × 2 = 10 electrons.',
  scheme: [['Correct statement of the principle', 1], ['5 orbitals × 2 = 10', 1]],
  d: 1, c: 'understanding', t: [4],
}));
add('hund-short2', short({
  marks: 2,
  stem: 'State Hund’s rule and give one reason why electrons stay unpaired in the 2p subshell of nitrogen.',
  model: 'Hund’s rule: in a subshell of orbitals of equal energy, electrons occupy separate orbitals with parallel spins before any pairing begins. In nitrogen (2p³) the three electrons stay in separate 2p orbitals because electrons in different orbitals are farther apart, so the repulsion between them is smaller.',
  sol: 'Hund statement; less repulsion when apart.',
  scheme: [['Statement of the rule', 1], ['Less repulsion between electrons in separate orbitals', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('nl-short3', (() => {
  const ord = byEnergy(['3d', '4s', '4p', '5s', '4d']);
  return short({
    marks: 3,
    stem: 'Arrange the subshells 4d, 5s, 3d, 4p and 4s in increasing order of energy, giving the (n + l) value of each and stating how you decided the order of those with equal values.',
    model: `(n + l): 4s = 4; 3d = 5; 4p = 5; 5s = 5; 4d = 6. Subshells with equal (n + l) are arranged by lower n first, so 3d (n = 3) < 4p (n = 4) < 5s (n = 5). The order is ${ord.join(' < ')}.`,
    sol: `${ord.join(' < ')}`,
    scheme: [['The five (n + l) values', 1], ['Tie broken by lower n', 1], ['4s < 3d < 4p < 5s < 4d', 1]],
    d: 2, c: 'application', t: [4],
  });
})(), () => ok(byEnergy(['3d', '4s', '4p', '5s', '4d']).join() === '4s,3d,4p,5s,4d', 'nl3'));
add('box-short3', (() => {
  const p = unp(15);
  const s = unp(16);
  return short({
    marks: 3,
    stem: 'Draw the orbital box diagram of the 3p subshell of phosphorus (Z = 15) and of sulfur (Z = 16). State the number of unpaired electrons in each and the rule that decides the arrangement.',
    model: `Phosphorus 3p³: ↑ ↑ ↑ (three boxes, one electron each), ${p} unpaired. Sulfur 3p⁴: ↑↓ ↑ ↑ (the fourth electron pairs in the first box), ${s} unpaired. The arrangement follows Hund’s rule: the orbitals are occupied singly with parallel spins before any pairing.`,
    sol: `P: ${p} unpaired; S: ${s} unpaired; Hund’s rule.`,
    scheme: [['Phosphorus box diagram with 3 unpaired', 1], ['Sulfur box diagram with 2 unpaired', 1], ['Hund’s rule named and stated', 1]],
    d: 3, c: 'application', t: [4],
  });
})(), () => ok(unp(15) === 3 && unp(16) === 2, 'box3'));
add('rules-long', (() => {
  const s = config(16);
  return long({
    stem: `(a) State the Aufbau principle, Pauli's exclusion principle and Hund's rule of maximum multiplicity. [3]

(b) Write the electronic configuration of the element of atomic number 16, draw the box diagram of its outer subshell and say how many of its electrons are unpaired. [2]`,
    model: `(a) Aufbau: electrons occupy the lowest-energy orbitals available first. Pauli: no two electrons in an atom can have all four quantum numbers the same, so an orbital holds at most two electrons of opposite spin. Hund: equal-energy orbitals are occupied singly with parallel spins before pairing begins.

(b) ${s.map(([x, k]) => `${x}${k}`).join(' ')} (sulfur), [Ne] 3s² 3p⁴. Outer 3p box diagram: ↑↓ ↑ ↑, with ${unp(16)} unpaired electrons.`,
    sol: 'Three principles; sulfur configuration, boxes, 2 unpaired.',
    scheme: [['(a) Aufbau principle', 1], ['(a) Pauli’s exclusion principle', 1], ['(a) Hund’s rule', 1], ['(b) Configuration 1s² 2s² 2p⁶ 3s² 3p⁴', 1], ['(b) Box diagram and 2 unpaired electrons', 1]],
    d: 3, c: 'understanding', t: [4, 5],
  });
})(), () => ok(unp(16) === 2 && shortU(16) === '[Ne] 3s² 3p⁴', 'rules-long'));

// ================================================================ t05 configurations of elements and ions
add('ni-cfg-mcq', mcq({
  stem: 'The ground-state electronic configuration of nickel, Z = 28, is:',
  right: shortU(28),
  wrong: ['[Ar] 3d⁹ 4s¹', '[Ar] 3d¹⁰', '[Ar] 3d⁶ 4s² 4p²'],
  sol: r`Nickel follows the Aufbau order with no exception: 2 electrons in 4s, then 8 in 3d, giving $[\text{Ar}]\,3d^8\,4s^2$ — option (@K). Only Cr and Cu among Z = 21–30 are exceptions.`,
  d: 1, c: 'recall', t: [5],
}), () => ok(shortU(28) === '[Ar] 3d⁸ 4s²', 'ni'));
add('mn-cation-mcq', mcq({
  stem: 'A sample of manganese(II) sulfate is analysed. The ground-state configuration of the Mn²⁺ ion (Z = 25) is:',
  right: shortU(25, 2),
  wrong: ['[Ar] 3d³ 4s²', '[Ar] 3d⁴ 4s¹', '[Ar] 3d⁷'],
  sol: r`Mn is $[\text{Ar}]\,3d^5\,4s^2$. The cation loses the two outermost $4s$ electrons first, leaving $[\text{Ar}]\,3d^5$ — option (@K).`,
  d: 2, c: 'application', t: [5],
}), () => ok(shortU(25, 2) === '[Ar] 3d⁵', 'mn'));
add('iso-mcq', (() => {
  const e = (z, q) => z - q;
  return mcq({
    stem: 'Which pair of species is isoelectronic?',
    right: 'S²⁻ and Ca²⁺',
    wrong: ['Na⁺ and Cl⁻', 'O²⁻ and Mg', 'F⁻ and K⁺'],
    sol: `S²⁻ has ${e(16, -2)} electrons and Ca²⁺ has ${e(20, 2)}, both [Ne] 3s² 3p⁶ — option (@K). Na⁺ has ${e(11, 1)} but Cl⁻ has ${e(17, -1)}; O²⁻ has ${e(8, -2)} but Mg has ${e(12, 0)}; F⁻ has ${e(9, -1)} but K⁺ has ${e(19, 1)}.`,
    d: 2, c: 'application', t: [5],
  });
})(), () => ok(16 + 2 === 20 - 2 && 11 - 1 !== 17 + 1 && 8 + 2 !== 12 && 9 + 1 !== 19 - 1, 'iso'));
add('cu-mcq', mcq({
  stem: 'Which statement best explains why a copper atom has the configuration [Ar] 3d¹⁰ 4s¹ and not [Ar] 3d⁹ 4s²?',
  right: 'A completely filled 3d subshell is extra stable, because of symmetrical distribution of electrons and greater exchange energy',
  wrong: ['The 4s orbital in copper can hold only one electron', 'The 3d subshell has a lower energy than the 1s subshell in copper', 'Copper has one electron fewer than the Aufbau order requires'],
  sol: 'Shifting one 4s electron into 3d completes the d subshell, which has extra stability from symmetry and exchange energy — option (@K). The 4s orbital can hold two electrons; the other statements are false.',
  d: 2, c: 'understanding', t: [5],
}));
add('unpion-mcq', (() => {
  const set = [['Fe³⁺', 26, 3], ['Cr³⁺', 24, 3], ['Zn²⁺', 30, 2], ['Cu⁺', 29, 1]];
  const vals = set.map(([, z, q]) => unp(z, q));
  return mcq({
    stem: 'Among the ions Cr³⁺, Fe³⁺, Zn²⁺ and Cu⁺ of the first transition series, which has the greatest number of unpaired electrons in its ground state?',
    right: 'Fe³⁺',
    wrong: ['Cr³⁺', 'Zn²⁺', 'Cu⁺'],
    sol: `Fe³⁺ is [Ar] 3d⁵ with ${vals[0]} unpaired electrons; Cr³⁺ is [Ar] 3d³ with ${vals[1]}; Zn²⁺ is 3d¹⁰ with ${vals[2]}; Cu⁺ is 3d¹⁰ with ${vals[3]} — option (@K).`,
    d: 3, c: 'analysis', t: [5],
  });
})(), () => ok(unp(26, 3) === 5 && unp(24, 3) === 3 && unp(30, 2) === 0 && unp(29, 1) === 0, 'unpion'));
add('ion-unp-num', (() => {
  const v = unp(23, 2);
  return num({
    stem: 'A vanadium(II) salt is dissolved in water. Z = 23 for vanadium. How many unpaired electrons does the V²⁺ ion have in its ground state?',
    value: v, tol: 0, unit: 'unpaired electrons',
    sol: r`V is $[\text{Ar}]\,3d^3\,4s^2$; V²⁺ loses the two $4s$ electrons to give $[\text{Ar}]\,3d^3$, with three singly occupied $3d$ orbitals: ${v} unpaired electrons.`,
    scheme: [['V²⁺ = [Ar] 3d³', 0.5], ['3', 0.5]],
    marks: 1, d: 2, c: 'application', t: [5],
  });
})(), (q) => ok(q.answer.value === 3 && shortU(23, 2) === '[Ar] 3d³', 'ion-unp'));
add('pcount-num', (() => {
  const v = countL(17, 0, 1);
  return num({
    stem: 'A chlorine atom has atomic number 17. Using its ground-state configuration, find the total number of electrons it has in p orbitals of all shells.',
    value: v, tol: 0, unit: 'electrons',
    sol: r`Chlorine is $1s^2\,2s^2\,2p^6\,3s^2\,3p^5$: $2p^6$ and $3p^5$ give $6 + 5 = ${v}$ electrons in p orbitals.`,
    scheme: [['2p⁶ and 3p⁵', 0.5], ['11', 0.5]],
    marks: 1, d: 2, c: 'application', t: [5],
  });
})(), (q) => ok(q.answer.value === 11 && cfgU(17) === '1s² 2s² 2p⁶ 3s² 3p⁵', 'pcount'));
add('cr-ar', ar({
  a: 'The ground-state configuration of chromium is [Ar] 3d⁵ 4s¹.',
  r: 'A half-filled d subshell has extra stability because of symmetrical distribution and greater exchange energy.',
  key: 'a',
  sol: 'Both are true, and the extra stability of the half-filled 3d subshell is why one 4s electron moves to 3d, so R explains A — option (a).',
  d: 2, c: 'understanding', t: [5],
}));
add('cr6-ar', ar({
  a: 'A ground-state chromium atom has six unpaired electrons.',
  r: 'The ground-state configuration of chromium is [Ar] 3d⁴ 4s².',
  key: 'c',
  sol: 'A is true: [Ar] 3d⁵ 4s¹ has five singly filled 3d orbitals and one 4s electron, six unpaired. R is false: the configuration [Ar] 3d⁴ 4s² would give four unpaired electrons and is not the actual configuration — option (c).',
  d: 3, c: 'analysis', t: [5, 4],
}), () => ok(unp(24) === 6, 'cr6'));
add('cu-short3', short({
  marks: 3,
  stem: 'Write the ground-state configurations of copper (Z = 29) and of the Cu²⁺ ion, and explain why the copper atom does not have the configuration predicted by the Aufbau order.',
  model: `Copper: ${shortU(29)}; Cu²⁺: ${shortU(29, 2)}, the outer 4s electron and one 3d electron having been lost. The Aufbau order predicts [Ar] 3d⁹ 4s², but one 4s electron moves into 3d so that the 3d subshell is completely filled; a filled subshell is extra stable because of symmetrical distribution of charge and greater exchange energy.`,
  sol: `Cu ${shortU(29)}; Cu²⁺ ${shortU(29, 2)}; filled 3d is extra stable.`,
  scheme: [['Cu: [Ar] 3d¹⁰ 4s¹', 1], ['Cu²⁺: [Ar] 3d⁹', 1], ['Filled 3d subshell: extra stability (symmetry, exchange energy)', 1]],
  d: 3, c: 'application', t: [5],
}), () => ok(shortU(29, 2) === '[Ar] 3d⁹', 'cu3'));
add('mn-short3', short({
  marks: 3,
  stem: 'Write the configurations of manganese (Z = 25) and of Mn²⁺, and explain why Mn²⁺ is more stable than Mn³⁺ in terms of the 3d subshell.',
  model: `Manganese: ${shortU(25)}; Mn²⁺: ${shortU(25, 2)}. Mn³⁺ is ${shortU(25, 3)}. Mn²⁺ has a half-filled 3d subshell (five unpaired electrons), which has extra stability from symmetrical distribution and exchange energy, so it is more stable than Mn³⁺, which has the less stable 3d⁴ arrangement.`,
  sol: `Mn ${shortU(25)}; Mn²⁺ ${shortU(25, 2)}; half-filled 3d is stable.`,
  scheme: [['Mn: [Ar] 3d⁵ 4s²', 1], ['Mn²⁺: [Ar] 3d⁵ (half-filled)', 1], ['Reason: extra stability of half-filled subshell', 1]],
  d: 3, c: 'analysis', t: [5],
}), () => ok(shortU(25) === '[Ar] 3d⁵ 4s²' && shortU(25, 3) === '[Ar] 3d⁴', 'mn3'));
add('iso-short3', (() => {
  const rows = [[7, -3, 'N³⁻'], [9, -1, 'F⁻'], [12, 2, 'Mg²⁺']];
  return short({
    marks: 3,
    stem: 'Write the configurations of N³⁻, F⁻ and Mg²⁺ (atomic numbers 7, 9 and 12), state how many electrons each has, and say what these three ions have in common.',
    model: `${rows.map(([z, q, nm]) => `${nm}: ${cfgU(z, q)}`).join('; ')}. Each has ${7 + 3} = ${9 + 1} = ${12 - 2} = 10 electrons and the neon configuration, so they are isoelectronic.`,
    sol: 'All have 10 electrons, 1s² 2s² 2p⁶; isoelectronic with neon.',
    scheme: [['Three correct configurations', 1], ['10 electrons each', 1], ['Isoelectronic with neon', 1]],
    d: 2, c: 'application', t: [5],
  });
})(), () => ok(cfgU(7, -3) === cfgU(9, -1) && cfgU(9, -1) === cfgU(12, 2) && cfgU(12, 2) === '1s² 2s² 2p⁶', 'iso3'));
add('cr-long', (() => {
  const cr3 = shortU(24, 3);
  return long({
    stem: `(a) Write the electronic configurations of chromium (Z = 24) and copper (Z = 29), and explain why each differs from the order predicted by the Aufbau principle. [3]

(b) Write the configuration of the Cr³⁺ ion and give the number of its unpaired electrons. [2]`,
    model: `(a) Cr: ${shortU(24)}; Cu: ${shortU(29)}. The Aufbau principle predicts [Ar] 3d⁴ 4s² and [Ar] 3d⁹ 4s². One 4s electron moves into 3d in each, giving a half-filled d⁵ subshell in Cr and a completely filled d¹⁰ subshell in Cu, which are extra stable because of symmetrical distribution of electrons and greater exchange energy; 4s and 3d are close in energy.

(b) Cr³⁺: ${cr3} (both 4s electrons and one 3d electron are lost), with ${unp(24, 3)} unpaired electrons in the three 3d orbitals.`,
    sol: 'Cr and Cu configurations with reasons; Cr³⁺ is [Ar] 3d³, 3 unpaired.',
    scheme: [['(a) Cr and Cu configurations', 1], ['(a) Predicted configurations differ; one 4s electron moves to 3d', 1], ['(a) Half-filled and filled subshell stability', 1], ['(b) Cr³⁺: [Ar] 3d³', 1], ['(b) 3 unpaired electrons', 1]],
    d: 3, c: 'application', t: [5],
  });
})(), () => ok(shortU(24, 3) === '[Ar] 3d³' && unp(24, 3) === 3, 'cr-long'));
add('xion-long', (() => {
  return long({
    stem: `An element X in the first transition series forms a 2+ ion whose 3d subshell is exactly half filled. Its atom has the configuration with two electrons in the 4s subshell.

(a) Find the atomic number of X by writing the configuration of the X²⁺ ion and of the atom. [2]

(b) Give the symbol of X, the number of unpaired electrons in its atom and in the X³⁺ ion. [2]

(c) State the electrons that are lost first when X forms its cations and why. [1]`,
    model: `(a) A half-filled 3d subshell is 3d⁵, so X²⁺ is [Ar] 3d⁵. Adding back the two 4s electrons gives the atom [Ar] 3d⁵ 4s², which has 18 + 5 + 2 = 25 electrons, so Z = 25.

(b) X is manganese, Mn. The Mn atom, [Ar] 3d⁵ 4s², has ${unp(25)} unpaired electrons (five 3d and none in the paired 4s); Mn³⁺ is [Ar] 3d⁴ with ${unp(25, 3)} unpaired electrons.

(c) The outermost 4s electrons are lost first, because they belong to the shell with the highest n, which is the outermost shell.`,
    sol: 'Z = 25 (Mn); 5 and 4 unpaired; 4s lost first.',
    scheme: [['(a) X²⁺ = [Ar] 3d⁵', 1], ['(a) Atom [Ar] 3d⁵ 4s², Z = 25', 1], ['(b) Mn, 5 unpaired in the atom', 1], ['(b) Mn³⁺ with 4 unpaired', 1], ['(c) 4s electrons lost first, outermost shell', 1]],
    d: 4, c: 'analysis', t: [5, 4],
  });
})(), () => ok(unp(25) === 5 && unp(25, 3) === 4 && 18 + 5 + 2 === 25, 'xion'));
add('qnset-long', (() => {
  const ml = mlValues(1);
  return long({
    stem: `(a) For the electrons in the 3p subshell, write the values of n and l and list the possible values of mₗ. [2]

(b) How many different sets of the four quantum numbers (n, l, mₗ, mₛ) are possible for the 3p subshell? Write any two of them. [2]

(c) Show that the same subshell in the n = 2 shell, 2p, has the same number of sets, and say what quantum number distinguishes the electrons of 2p from those of 3p. [1]`,
    model: `(a) n = 3 and l = 1; mₗ = ${ml.map((x) => (x > 0 ? `+${x}` : x < 0 ? `−${-x}` : '0')).join(', ')}.

(b) 3 values of mₗ × 2 values of mₛ = 6 sets, for example (3, 1, −1, +½) and (3, 1, 0, −½).

(c) 2p also has l = 1 with three mₗ values and two mₛ values, so 6 sets; they are distinguished by the principal quantum number n (2 against 3).`,
    sol: '3p: n = 3, l = 1, mₗ = −1, 0, +1; six sets; 2p differs by n.',
    scheme: [['(a) n = 3, l = 1', 1], ['(a) mₗ = −1, 0, +1', 1], ['(b) 6 sets', 1], ['(b) Two valid sets written', 1], ['(c) 6 sets for 2p; n distinguishes them', 1]],
    d: 2, c: 'application', t: [2],
  });
})(), () => ok(mlValues(1).length * 2 === 6, 'qnset'));
add('wave-long', (() => {
  return long({
    stem: `(a) What is the Schrödinger wave equation, and what do ψ and ψ² stand for? [2]

(b) For the 1s orbital of hydrogen, the radial probability is zero at the nucleus and has a single maximum. Explain why the radial probability is zero at the nucleus although ψ² is largest there. [3]`,
    model: `(a) It is an equation, Ĥψ = Eψ, that describes the electron as a wave; its acceptable solutions are the wave functions ψ. ψ has no physical meaning by itself, and ψ² at a point is the probability density.

(b) The radial probability is the probability of finding the electron in a thin spherical shell, 4πr²ψ² dr. At the nucleus r = 0, so the volume of the shell, which is proportional to r², is zero, and the probability is zero even though the density ψ² is greatest there. As r increases ψ² falls but the shell volume rises, so the product passes through a maximum at about 1 a₀ and then decreases.`,
    sol: 'Ĥψ = Eψ; ψ² is density; radial probability includes the r² volume factor, so is zero at r = 0 with a maximum at 1 a₀.',
    scheme: [['(a) Equation describing the electron wave, solutions ψ', 1], ['(a) ψ² as probability density; ψ no meaning', 1], ['(b) Radial probability = 4πr²ψ² dr, shell volume ∝ r²', 1], ['(b) Zero at the nucleus although ψ² is largest', 1], ['(b) Maximum where falling ψ² and rising volume balance (about 1 a₀)', 1]],
    d: 4, c: 'analysis', t: [1],
  });
})());
