// ISC 11 Chemistry ch05 Quantum Mechanical Model and Electronic Configuration: notes and flashcards.
import { T, table, unit, PROV, r } from './lib.mjs';
import { V } from './decks.mjs';
import { shortU, unp } from './data.mjs';

const fm = (latex, label) => ({ latex, label });
const kt = (term, definition_md) => ({ term, definition_md });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Quantum Mechanical Model and Electronic Configuration — Notes',
  language: 'en',
  sections: [
    sec(
      '1. The wave equation, ψ and ψ², and the idea of an orbital',
      r`The uncertainty principle rules out a definite orbit, so the electron is described by a **wave function ψ**, obtained by solving the **Schrödinger equation** $\hat{H}\psi = E\psi$ (the derivation is not required). Acceptable solutions exist only for certain energies and are labelled by quantum numbers. The equation can be solved exactly for hydrogen and only approximately for many-electron atoms.

ψ itself has **no direct physical meaning**. **ψ²** at a point is the **probability density**; ψ² multiplied by a small volume is the probability of finding the electron in that volume; the sum over all space is 1. Where ψ² is zero the electron is never found. An **orbital** is a one-electron wave function with its own energy, size and shape; a **boundary surface diagram** encloses about 90% of the probability, since ψ² never falls exactly to zero. The **radial probability** $4\pi r^2\psi^2$ (probability in a thin spherical shell) is zero at the nucleus and peaks at a most probable distance (1 a₀ for 1s).`,
      [kt('Wave function (ψ)', 'The mathematical function that describes the electron as a wave; it has no direct physical meaning.'), kt('Probability density (ψ²)', 'The probability per unit volume of finding the electron at a point.'), kt('Orbital', 'A one-electron wave function; a region around the nucleus where the electron is most probably found, holding at most two electrons.'), kt('Boundary surface', 'The surface enclosing about 90% of the electron probability of an orbital.')],
      [fm(r`\hat{H}\psi = E\psi`, 'Schrödinger wave equation (no derivation)'), fm(r`\text{radial probability} = 4\pi r^2\psi^2\,dr`, 'Probability of finding the electron in a thin shell at distance r')],
      V.density,
      [1],
    ),
    sec(
      '2. The four quantum numbers',
      r`Three quantum numbers arise from the wave equation, and a fourth describes spin. **Principal** $n = 1, 2, 3\ldots$ fixes the shell, the size and the energy. **Azimuthal** $l = 0, 1, \ldots, n-1$ fixes the subshell and shape ($l = 0, 1, 2, 3$ are s, p, d, f). **Magnetic** $m_l = -l, \ldots, 0, \ldots, +l$ fixes the orientation; a subshell has $2l+1$ orbitals. **Spin** $m_s = +\tfrac12$ or $-\tfrac12$. An electron is described fully by its set $(n, l, m_l, m_s)$.

An allowed set must satisfy $l \le n-1$ and $|m_l| \le l$. For example $(2, 2, 0, +\tfrac12)$ is not allowed because $l$ cannot equal $n$.`,
      [kt('Principal quantum number (n)', 'Whole number 1, 2, 3 … labelling the shell; fixes size and energy.'), kt('Azimuthal quantum number (l)', 'Takes values 0 to n − 1; labels the subshell and fixes the shape of the orbital.'), kt('Magnetic quantum number (mₗ)', 'Takes values −l to +l; fixes the orientation of the orbital in space.'), kt('Spin quantum number (mₛ)', '+½ or −½; the two possible spin directions of an electron.')],
      [fm(r`l = 0, 1, \ldots, (n-1)`, 'Allowed values of l'), fm(r`m_l = -l, \ldots, +l \quad (2l+1\ \text{values})`, 'Allowed values of mₗ')],
      table(['n', 'Allowed l', 'Subshells', 'Orbitals in shell', 'Electrons in shell'], [['1', '0', '1s', '1', '2'], ['2', '0, 1', '2s, 2p', '4', '8'], ['3', '0, 1, 2', '3s, 3p, 3d', '9', '18'], ['4', '0, 1, 2, 3', '4s, 4p, 4d, 4f', '16', '32']], 'Table of allowed values of l, subshells, orbitals and electron capacity for shells n = 1 to 4'),
      [2],
    ),
    sec(
      '3. What the quantum numbers tell us; counting orbitals and electrons',
      r`**Distance and size:** a larger $n$ means the electron is on average farther from the nucleus and the orbital is larger. **Energy:** the energy of a shell rises with $n$; in a hydrogen atom it depends on $n$ alone, but in a many-electron atom on $n$ and $l$ (s < p < d < f within a shell). **Shape:** $l$. **Orientation:** $m_l$. **Spin:** $m_s$.

**Counting:** an orbital holds 2 electrons; a subshell has $2l+1$ orbitals and holds $2(2l+1)$ electrons; a shell has $n^2$ orbitals and holds $2n^2$ electrons. The s, p, d, f subshells hold 2, 6, 10 and 14 electrons.`,
      [kt('Subshell', 'The set of orbitals with the same n and l (for example 3p).'), kt('Shell', 'The set of orbitals with the same n.')],
      [fm(r`\text{orbitals in shell } n = n^2`, 'Orbitals in a shell'), fm(r`\text{electrons in shell } n = 2n^2`, 'Electron capacity of a shell'), fm(r`\text{electrons in a subshell} = 2(2l+1)`, 'Electron capacity of a subshell')],
      V.shells,
      [2],
    ),
    sec(
      '4. Shapes, size and orientation of s, p and d orbitals',
      r`An **s orbital** ($l=0$) is spherical and non-directional. A **p orbital** ($l=1$) has two lobes of opposite sign on either side of the nucleus separated by a **nodal plane**; the three p orbitals $p_x$, $p_y$, $p_z$ point along the axes ($m_l = -1, 0, +1$). A **d orbital** ($l=2$) comes in five orientations ($m_l = -2$ to $+2$): $d_{xy}$, $d_{yz}$, $d_{xz}$ have four lobes between the axes; $d_{x^2-y^2}$ has four lobes along the axes; $d_{z^2}$ has two lobes along z and a ring in the xy plane.

**Size** increases with $n$ for the same type (1s < 2s < 3s; 2p < 3p). For the same $n$, an s electron is on average slightly nearer the nucleus because it penetrates it more.`,
      [kt('Nodal plane', 'A plane through the nucleus on which ψ² = 0 (an angular node).'), kt('Dumbbell shape', 'The two-lobed shape of a p orbital.')],
      [],
      V.sp,
      [3],
      [V.d],
    ),
    sec(
      '5. Nodes and radial probability curves',
      r`A **node** is a place where ψ² = 0. **Radial nodes** (spherical surfaces) number $n-l-1$; **angular nodes** (planes or cones through the nucleus) number $l$; the **total** is $n-1$. So 1s has none, 2s has one radial node, 2p has one nodal plane, 3s has two radial nodes, 3p has one radial node and one plane, and 3d has two angular nodes and no radial node.

In a **radial probability curve** the number of peaks is one more than the number of radial nodes. The hydrogen values for the most probable distance are ${ '1 a₀ (1s), 4 a₀ (2p) and 9 a₀ (3d)' }; 2s has a small inner peak and a large outer peak separated by a node at 2 a₀.`,
      [kt('Radial node', 'A spherical surface at fixed distance from the nucleus where ψ² = 0; there are n − l − 1 of them.'), kt('Angular node', 'A plane or cone through the nucleus where ψ² = 0; there are l of them.')],
      [fm(r`\text{radial nodes} = n - l - 1`, 'Radial nodes'), fm(r`\text{angular nodes} = l`, 'Angular nodes'), fm(r`\text{total nodes} = n - 1`, 'Total nodes')],
      V.radial,
      [3],
    ),
    sec(
      '6. Aufbau principle, (n + l) rule, Pauli’s principle and Hund’s rule',
      r`**Aufbau:** in the ground state electrons fill the lowest-energy vacant orbitals first. **(n + l) rule:** subshells fill in order of increasing $(n+l)$; if two have the same value the one with the lower $n$ fills first. This gives 1s, 2s, 2p, 3s, 3p, 4s, 3d, 4p, 5s, 4d, 5p, 6s, 4f, 5d, 6p, 7s, 5f, 6d, 7p.

**Pauli’s exclusion principle:** no two electrons in an atom have the same four quantum numbers, so an orbital holds at most two electrons of opposite spin. **Hund’s rule of maximum multiplicity:** in equal-energy orbitals electrons occupy separate orbitals with parallel spins before pairing, giving the maximum number of unpaired electrons and the least repulsion.`,
      [kt('Aufbau principle', 'Electrons fill orbitals in order of increasing energy.'), kt('Pauli’s exclusion principle', 'No two electrons in an atom can have the same set of four quantum numbers.'), kt('Hund’s rule', 'Orbitals of equal energy are occupied singly, with parallel spins, before any is doubly occupied.'), kt('Unpaired electron', 'An electron alone in an orbital.')],
      [fm(r`\text{lower } (n+l) \text{ fills first; tie: lower } n`, '(n + l) rule')],
      V.aufbau,
      [4],
      [V.boxes],
    ),
    sec(
      '7. Configurations of elements and ions; stability of half-filled and filled subshells',
      r`Write configurations by filling in Aufbau order and grouping by shell, for example sulfur $1s^2\,2s^2\,2p^6\,3s^2\,3p^4$ or $[\text{Ne}]\,3s^2\,3p^4$. **Chromium** is $[\text{Ar}]\,3d^5\,4s^1$ (not $3d^4\,4s^2$) and **copper** is $[\text{Ar}]\,3d^{10}\,4s^1$ (not $3d^9\,4s^2$): **half-filled** ($d^5$) and **completely filled** ($d^{10}$) subshells are extra stable because of **symmetrical distribution** of electrons and greater **exchange energy**, and 4s and 3d lie close in energy.

**Ions:** a cation loses electrons from the **outermost (highest n) shell first**, so 4s electrons go before 3d: Fe is $[\text{Ar}]\,3d^6\,4s^2$, Fe²⁺ is $[\text{Ar}]\,3d^6$, Fe³⁺ is $[\text{Ar}]\,3d^5$. An anion adds electrons to the next vacant subshell: Cl⁻ is $[\text{Ne}]\,3s^2\,3p^6$, like argon. Species with equal numbers of electrons are **isoelectronic**.`,
      [kt('Half-filled subshell', 'A subshell with one electron in each orbital, such as d⁵; extra stable.'), kt('Isoelectronic species', 'Atoms or ions with the same number of electrons.')],
      [],
      table(['Species', 'Configuration', 'Unpaired electrons'], [['Cr', shortU(24), String(unp(24))], ['Cu', shortU(29), String(unp(29))], ['Fe', shortU(26), String(unp(26))], ['Fe²⁺', shortU(26, 2), String(unp(26, 2))], ['Fe³⁺', shortU(26, 3), String(unp(26, 3))], ['Cl⁻', shortU(17, -1), String(unp(17, -1))]], 'Table of the configurations of Cr, Cu, Fe, Fe2+, Fe3+ and Cl minus with unpaired electrons'),
      [5],
    ),
  ],
  exam_tips_md: `**Common mistakes**
- Treating ψ as a probability; it is ψ² that is the probability density.
- Allowing l = n, or a value of mₗ outside −l to +l, in a set of quantum numbers.
- Counting n orbitals in a shell instead of n², or forgetting the factor 2 for electrons.
- Radial nodes n − l instead of n − l − 1.
- Ordering subshells by n alone, or breaking an (n + l) tie by the larger n.
- Writing Cr as 3d⁴ 4s² and Cu as 3d⁹ 4s².
- Removing 3d electrons before 4s when forming a transition-metal cation.

**How marks are usually awarded**
- Definitions (orbital, node, Pauli, Hund): one mark each, with the key phrase.
- Quantum-number sets: one mark for correct n and l, one for mₗ and mₛ.
- Configurations: one mark per correct configuration; one mark for the half-filled or filled reason.
- Node calculations: formula, substitution, and the numbers for radial, angular and total.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What does the Schrödinger equation do?', 'It describes the electron as a matter wave: Ĥψ = Eψ, with acceptable ψ only for certain E.', 'concept', 1),
    fc(2, 'What does ψ² mean?', 'The probability density: probability per unit volume of finding the electron at a point.', 'definition', 1),
    fc(3, 'Does ψ itself have physical meaning?', 'No. Only ψ² can be interpreted (as probability density).', 'concept', 1),
    fc(4, 'What is an orbital?', 'A one-electron wave function; the region where the electron is most probably found. It holds at most 2 electrons.', 'definition', 1),
    fc(5, 'What is a boundary surface diagram?', 'A surface enclosing about 90% of the electron probability of an orbital.', 'definition', 1),
    fc(6, 'Radial probability of a shell at r?', r`$4\pi r^2\psi^2\,dr$; zero at the nucleus, peak at the most probable distance.`, 'formula', 1),
    fc(7, 'Most probable distance of the 1s electron?', 'One Bohr radius, a₀ = 52.9 pm.', 'fact', 1),
    fc(8, 'Allowed values of n?', 'Whole numbers 1, 2, 3 …; they fix shell, size and energy.', 'definition', 2),
    fc(9, 'Allowed values of l?', 'l = 0, 1, … , n − 1; 0, 1, 2, 3 are s, p, d, f.', 'definition', 2),
    fc(10, 'Allowed values of mₗ?', '−l to +l, that is 2l + 1 values; they fix orientation.', 'definition', 2),
    fc(11, 'Allowed values of mₛ?', '+½ or −½ (two spin directions).', 'definition', 2),
    fc(12, 'Orbitals in subshell s, p, d, f?', '1, 3, 5, 7.', 'fact', 2),
    fc(13, 'Orbitals and electrons in shell n?', 'n² orbitals; 2n² electrons.', 'formula', 2),
    fc(14, 'Electron capacity of s, p, d, f subshells?', '2, 6, 10, 14.', 'fact', 2),
    fc(15, 'Which quantum number tells the shape of an orbital?', 'The azimuthal quantum number l.', 'concept', 2),
    fc(16, 'Which quantum number gives orientation?', 'The magnetic quantum number mₗ.', 'concept', 2),
    fc(17, 'Why is (2, 2, 0, +½) not allowed?', 'l must be less than n, so l = 2 is impossible for n = 2.', 'example', 2),
    fc(18, 'Shape of s and p orbitals?', 's: sphere; p: two lobes (dumbbell) with a nodal plane.', 'fact', 3),
    fc(19, 'Shapes of d orbitals?', 'dxy, dyz, dxz: four lobes between axes; dx²−y²: four lobes along axes; dz²: two lobes and a ring.', 'fact', 3),
    fc(20, 'How does orbital size change with n?', 'It increases: 1s < 2s < 3s and 2p < 3p.', 'concept', 3),
    fc(21, 'What is a node?', 'A place where ψ² = 0, so the electron is never found there.', 'definition', 3),
    fc(22, 'Number of radial nodes?', 'n − l − 1.', 'formula', 3),
    fc(23, 'Number of angular nodes?', 'l (planes or cones through the nucleus).', 'formula', 3),
    fc(24, 'Total nodes in an orbital?', 'n − 1.', 'formula', 3),
    fc(25, 'What is the Aufbau principle?', 'Electrons fill orbitals in order of increasing energy.', 'definition', 4),
    fc(26, 'State the (n + l) rule.', 'Lower (n + l) fills first; if equal, lower n fills first.', 'definition', 4),
    fc(27, 'Pauli’s exclusion principle?', 'No two electrons in an atom have the same four quantum numbers; an orbital holds at most two electrons of opposite spin.', 'definition', 4),
    fc(28, 'Hund’s rule?', 'Equal-energy orbitals are filled singly with parallel spins before pairing.', 'definition', 4),
    fc(29, 'Configuration of chromium and why?', '[Ar] 3d⁵ 4s¹: half-filled 3d is extra stable.', 'fact', 5),
    fc(30, 'Configuration of copper and why?', '[Ar] 3d¹⁰ 4s¹: completely filled 3d is extra stable.', 'fact', 5),
    fc(31, 'Which electrons does a transition-metal atom lose first?', 'The outermost 4s electrons, before 3d.', 'concept', 5),
    fc(32, 'What are isoelectronic species?', 'Atoms or ions with the same number of electrons, such as Na⁺ and F⁻.', 'definition', 5),
  ],
  status: 'draft',
  provenance: PROV,
};
