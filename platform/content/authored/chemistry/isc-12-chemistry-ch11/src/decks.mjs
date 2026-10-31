// ISC 12 Chemistry ch11 Bonding in Coordination Compounds — two decks: Part 1 (t01) valence bond theory: inner and
// outer orbital complexes, shapes, high and low spin, magnetism; Part 2 (t02–t04) crystal field theory, colour and
// magnetism, stability constants and the importance of coordination compounds.
import { sl, deck, table, flow, svgV, r } from './lib.mjs';
import { SPLIT } from './svgs.mjs';

export const V = {
  split: svgV(SPLIT, 'Splitting of the five d orbitals: in an octahedral field into a lower t2g set and an upper eg set separated by delta-o; in a tetrahedral field into a lower e set and an upper t2 set separated by a smaller delta-t', 'Schematic energy levels; delta-t is about four-ninths of delta-o.'),
};

export const deck1 = deck({
  part: 1,
  title: 'Bonding in Coordination Compounds — Part 1: Valence bond theory',
  goals: [
    'State the main ideas of valence bond theory for complexes',
    'Predict the hybridisation, shape and magnetic behaviour of a complex',
    'Distinguish inner and outer orbital (low and high spin) complexes',
    'State the limitations of valence bond theory',
  ],
  slides: [
    sl('title', 'How do ligands bond to metals?', {
      b: 'Part 1 — valence bond theory: hybrid orbitals, shapes and magnetism of complexes.',
      v: flow('LR', [['a', 'Metal ion: count d electrons'], ['b', 'Ligand strong or weak?'], ['c', 'Pairing and empty orbitals'], ['d', 'Hybridisation → shape'], ['e', 'Unpaired electrons → magnetism']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow of the valence bond approach to a complex'),
      n: 'Namaste! Two iron two plus complexes, one with water and one with cyanide, behave completely differently in a magnetic field: one is strongly attracted, the other not at all. In this part we use valence bond theory, built on the hybrid orbitals you met in Class 11, to predict the shape and magnetic behaviour of complexes, and we see where this simple theory runs out.',
    }),
    sl('concept', 'Main ideas of valence bond theory', {
      b: '(1) The central metal ion provides a number of **empty orbitals** equal to its coordination number. (2) These orbitals **hybridise** to give equivalent orbitals of definite direction. (3) Each ligand donates a **lone pair** into one hybrid orbital, forming a coordinate (σ) bond. (4) **Strong-field** ligands (CN⁻, CO, NH₃ with Co³⁺) can force d electrons to **pair**, freeing inner (n−1)d orbitals; **weak-field** ligands (F⁻, Cl⁻, H₂O) cannot.',
      v: table(['CN', 'Hybridisation', 'Shape'], [['2', 'sp', 'Linear'], ['4', 'sp³', 'Tetrahedral'], ['4', 'dsp²', 'Square planar'], ['6', 'd²sp³ (inner orbital)', 'Octahedral'], ['6', 'sp³d² (outer orbital)', 'Octahedral']], 'Table of hybridisations and shapes for coordination numbers two, four and six'),
      n: 'In valence bond theory the metal ion offers as many empty orbitals as there are ligands. These mix to form hybrid orbitals pointing in definite directions, and each ligand pushes a lone pair into one of them. Two hybrid orbitals give a linear complex, four give a tetrahedron or a square, and six give an octahedron. Strong ligands can make the metal’s d electrons pair up, freeing inner d orbitals.',
    }),
    sl('concept', 'Inner and outer orbital complexes', {
      b: r`For CN 6, if two **inner 3d** orbitals are used ($d^2sp^3$), the complex is **inner orbital** (low spin, fewer unpaired electrons). If two **outer 4d** orbitals are used ($sp^3d^2$), it is **outer orbital** (high spin). Magnetic moment ($\mu = \sqrt{n(n+2)}$ BM) tells us which.`,
      m: [r`\mu = \sqrt{n(n+2)}\ \text{BM}`],
      v: table(['Feature', 'Inner orbital', 'Outer orbital'], [['Hybridisation', 'd²sp³', 'sp³d²'], ['d orbitals used', '(n−1)d', 'nd'], ['Ligands', 'Strong field', 'Weak field'], ['Unpaired electrons', 'Fewer (low spin)', 'More (high spin)'], ['Example', '[Fe(CN)₆]⁴⁻', '[Fe(H₂O)₆]²⁺']], 'Table comparing inner and outer orbital octahedral complexes'),
      n: 'An octahedral complex can use two inner three d orbitals, making it an inner-orbital complex, or two outer four d orbitals, making it an outer-orbital complex. Inner-orbital complexes form with strong ligands that pair electrons, so they have fewer unpaired electrons and are low spin. Measuring the magnetic moment tells us how many unpaired electrons there are, and hence which kind we have.',
    }),
    sl('example', 'Worked example: two iron(II) complexes', {
      b: r`**Problem.** Explain why $\ce{[Fe(CN)6]^4-}$ is diamagnetic but $\ce{[Fe(H2O)6]^2+}$ has a moment of about 4.9 BM.

**Step 1.** $\ce{Fe^2+}$: [Ar]3d⁶, four unpaired electrons in the free ion.

**Step 2.** CN⁻ is strong field: the six 3d electrons pair into three orbitals, leaving two 3d orbitals empty → $d^2sp^3$, inner orbital, octahedral, **0 unpaired**: diamagnetic.

**Step 3.** H₂O is weak field: no pairing; 4s, 4p and two 4d orbitals used → $sp^3d^2$, outer orbital, **4 unpaired**: $\mu = \sqrt{24} \approx 4.90$ BM.`,
      v: table(['Complex', 'Hybridisation', 'Unpaired e⁻', 'μ / BM'], [['[Fe(CN)₆]⁴⁻', 'd²sp³', '0', '0'], ['[Fe(H₂O)₆]²⁺', 'sp³d²', '4', '4.90']], 'Table comparing the two iron two plus complexes'),
      n: 'Iron two plus has six d electrons, four of them unpaired. Cyanide is a strong ligand and forces all six to pair in three d orbitals, leaving two inner d orbitals for d two s p three hybridisation: an inner-orbital, diamagnetic complex. Water is weak, so no pairing occurs, the outer four d orbitals are used, and four unpaired electrons give a moment of about four point nine.',
    }),
    sl('example', 'Worked example: Ni(0) and Ni(II) four-coordinate complexes', {
      b: r`**Problem.** Predict the hybridisation, shape and magnetism of $\ce{[Ni(CO)4]}$ and $\ce{[Ni(CN)4]^2-}$. (Ni, Z = 28)

**(a)** $\ce{[Ni(CO)4]}$: Ni(0) is 3d⁸4s². CO (strong) pushes the 4s electrons into 3d → 3d¹⁰, 4s and 4p empty → $sp^3$, **tetrahedral, diamagnetic**.

**(b)** $\ce{[Ni(CN)4]^2-}$: Ni²⁺ is 3d⁸. CN⁻ pairs the two unpaired electrons, freeing one 3d orbital → $dsp^2$, **square planar, diamagnetic**.`,
      v: table(['Complex', 'Ni configuration used', 'Hybridisation', 'Shape'], [['[Ni(CO)₄]', '3d¹⁰', 'sp³', 'Tetrahedral'], ['[Ni(CN)₄]²⁻', '3d⁸ (paired)', 'dsp²', 'Square planar']], 'Table comparing two four-coordinate nickel complexes'),
      n: 'Both complexes have four ligands, yet they have different shapes. In nickel tetracarbonyl, nickel is in the zero state; carbon monoxide pushes its two four s electrons into three d, giving a full three d ten, so four s and four p hybridise to a tetrahedron. In the cyanide complex, nickel two plus pairs its eight d electrons, leaving one three d orbital free for d s p two hybridisation and a square planar shape.',
    }),
    sl('check', 'Quick check: hybridisation and shape', {
      b: 'Predict the hybridisation and shape of a complex.',
      n: 'Quick check. Find the oxidation state and d count, decide whether the ligand pairs electrons, then count the empty orbitals.',
      chk: 'vbt-mcq',
    }),
    sl('example', 'Worked example: from magnetic moment to bonding', {
      b: r`**Problem.** $\ce{[MnBr4]^2-}$ has a measured moment of 5.9 BM. Deduce the number of unpaired electrons, the hybridisation and the shape. (Mn, Z = 25)

**Step 1.** $\sqrt{n(n+2)} = 5.9$ gives $n(n+2) \approx 35$, so $n = 5$.

**Step 2.** Mn²⁺ is 3d⁵ with 5 unpaired electrons: no pairing, so the 3d orbitals are not available.

**Step 3.** 4s and three 4p orbitals are used → $sp^3$, **tetrahedral**, high spin.`,
      v: table(['Data', 'Deduction'], [['μ = 5.9 BM', 'n = 5'], ['Mn²⁺ = 3d⁵', 'No pairing; all 3d occupied'], ['CN = 4', 'sp³, tetrahedral']], 'Table of deductions from the magnetic moment of tetrabromidomanganate two'),
      n: 'Work backwards from the measured moment. Five point nine Bohr magnetons means five unpaired electrons, exactly the number in free manganese two plus. So bromide has not paired any electrons, and every three d orbital holds one electron. For four ligands the metal must use the four s and three four p orbitals: sp three hybridisation and a tetrahedral, high-spin complex.',
    }),
    sl('concept', 'Magnetic behaviour summarised', {
      b: 'The same metal ion can give paramagnetic or diamagnetic complexes depending on the ligand. Strong-field ligands lower the number of unpaired electrons.',
      v: table(['Complex', 'd count', 'Hybridisation', 'Unpaired e⁻', 'Magnetism'], [['[Cr(NH₃)₆]³⁺', '3', 'd²sp³', '3', 'Paramagnetic'], ['[Co(NH₃)₆]³⁺', '6', 'd²sp³', '0', 'Diamagnetic'], ['[CoF₆]³⁻', '6', 'sp³d²', '4', 'Paramagnetic'], ['[NiCl₄]²⁻', '8', 'sp³', '2', 'Paramagnetic'], ['[Zn(NH₃)₄]²⁺', '10', 'sp³', '0', 'Diamagnetic']], 'Table of complexes with d count, hybridisation, unpaired electrons and magnetism'),
      n: 'Here is a summary table. Chromium three plus, with three d electrons, uses two empty inner d orbitals whatever the ligand and stays paramagnetic. Cobalt three plus is diamagnetic with ammonia but paramagnetic with fluoride. Nickel two plus with chloride is tetrahedral and paramagnetic. Zinc two plus, with a full d subshell, uses s and p orbitals and is always diamagnetic.',
    }),
    sl('check', 'Quick check: magnetism', {
      b: 'Decide whether a complex is paramagnetic or diamagnetic.',
      n: 'Quick check. Count unpaired electrons after deciding whether the ligand pairs them.',
      chk: 'magnet-mcq',
    }),
    sl('concept', 'Limitations of valence bond theory', {
      b: 'VBT explains shapes and magnetism, but: (1) it cannot explain the **colour** of complexes; (2) it does not explain **why** some ligands are strong field and others weak; (3) it cannot predict whether a 4-coordinate complex is tetrahedral or square planar without magnetic data; (4) it gives no quantitative interpretation of magnetic or thermodynamic data; (5) it does not explain the temperature dependence of magnetism.',
      v: table(['VBT explains', 'VBT cannot explain'], [['Shape from hybridisation', 'Colour'], ['Paramagnetic vs diamagnetic', 'Strong vs weak ligands'], ['Inner vs outer orbital', 'Tetrahedral vs square planar in advance']], 'Table of what valence bond theory can and cannot explain'),
      n: 'Valence bond theory gives a simple picture of shapes and magnetism, but it has gaps. It cannot explain why complexes are coloured. It treats strong and weak ligands as given facts without explaining them. It cannot tell in advance whether a four-coordinate complex will be tetrahedral or square planar. These gaps are filled by crystal field theory, the subject of Part 2.',
    }),
    sl('check', 'Quick check: VBT limitations', {
      b: 'Identify something valence bond theory cannot explain.',
      n: 'Quick check. Think about colour and the strength of ligands.',
      chk: 'limit-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'VBT: empty metal orbitals hybridise and accept ligand lone pairs.',
        'sp³ tetrahedral; dsp² square planar; d²sp³ inner orbital (low spin) and sp³d² outer orbital (high spin) octahedral.',
        'Strong-field ligands (CN⁻, CO) pair electrons; weak-field (F⁻, Cl⁻, H₂O) do not.',
        'μ = √(n(n+2)) BM tells the number of unpaired electrons.',
        'Limitations: no colour, no reason for ligand strength, no quantitative data.',
      ],
      v: table(['Complex', 'Hybridisation', 'Magnetism'], [['[Fe(CN)₆]⁴⁻', 'd²sp³', 'Diamagnetic'], ['[Fe(H₂O)₆]²⁺', 'sp³d²', '4 unpaired'], ['[Ni(CN)₄]²⁻', 'dsp²', 'Diamagnetic'], ['[MnBr₄]²⁻', 'sp³', '5 unpaired']], 'Summary table of key complexes'),
      n: 'Let us sum up Part 1. In valence bond theory the metal’s empty orbitals hybridise to accept lone pairs from the ligands, and the hybridisation fixes the shape. Strong ligands pair electrons and give inner-orbital, low-spin complexes; weak ligands give outer-orbital, high-spin ones. The magnetic moment tells us the number of unpaired electrons. But the theory cannot explain colour.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Start from the oxidation state and d count of the metal ion.',
        'Show the orbital (box) diagram: d electrons, then ligand pairs in hybrid orbitals.',
        'State hybridisation, shape, inner/outer orbital and magnetism — each earns a mark.',
        'For Ni(0) in carbonyls, remember the 4s electrons move into 3d.',
      ],
      v: table(['Slip', 'Fix'], [['Using the atom’s configuration', 'Use the ion’s'], ['[Fe(H₂O)₆]²⁺ called d²sp³', 'Water is weak: sp³d²'], ['[Ni(CO)₄] square planar', 'Tetrahedral (sp³)']], 'Table of three common slips in Part 1 and fixes'),
      n: 'Some tips. Begin from the metal ion’s oxidation state and d count. Draw the orbital boxes, showing which orbitals receive ligand lone pairs. State the hybridisation, shape, type of complex and magnetic behaviour, because each usually carries a mark. And remember that in nickel tetracarbonyl the four s electrons move into the three d subshell.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Bonding in Coordination Compounds — Part 2: Crystal field theory, stability and importance',
  goals: [
    'Draw d-orbital splitting diagrams for octahedral and tetrahedral complexes',
    'Explain colour and magnetism of complexes using crystal field splitting and ligand strength',
    'Compare the stabilities of complexes from their stability constants',
    'Give examples of complexes in qualitative analysis, metal extraction and living systems',
  ],
  slides: [
    sl('title', 'Splitting the d orbitals', {
      b: 'Part 2 — crystal field theory, colour, stability constants and why complexes matter.',
      v: flow('LR', [['a', 'Ligands as point charges'], ['b', 'd orbitals split'], ['c', 'High or low spin'], ['d', 'Colour'], ['e', 'Stability and uses']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Flow of Part 2 topics'),
      n: 'Crystal field theory takes a different view. Instead of hybrid orbitals, it treats the ligands as point charges that repel the metal’s d electrons, so the five d orbitals no longer have the same energy. This simple idea explains colour as well as magnetism. We then see how stable complexes are, and how they are used in the laboratory, in industry and in our bodies.',
    }),
    sl('diagram', 'Octahedral and tetrahedral splitting', {
      b: r`Ligands are **point charges** (anions) or **point dipoles** (neutral molecules); bonding is treated as **purely electrostatic**. In an **octahedral** field, $d_{x^2-y^2}$ and $d_{z^2}$ point at the ligands and are raised ($e_g$); $d_{xy}$, $d_{yz}$, $d_{xz}$ lie between the axes and are lowered ($t_{2g}$). The gap is $\Delta_o$: $t_{2g}$ lies $0.4\Delta_o$ below and $e_g$ $0.6\Delta_o$ above the average. In a **tetrahedral** field the order reverses ($e$ below $t_2$) and $\Delta_t \approx \tfrac{4}{9}\Delta_o$.`,
      v: V.split,
      n: 'In an octahedral complex, the six ligands sit on the x, y and z axes. The two d orbitals pointing along the axes feel the most repulsion and rise in energy; the three pointing between the axes fall. The energy gap is delta o. In a tetrahedral complex none of the orbitals points directly at a ligand, the order is reversed, and the gap is only about four ninths as large.',
    }),
    sl('concept', 'Spectrochemical series; high and low spin', {
      b: 'Ligands ranked by the splitting they produce (weak → strong):',
      m: [r`\ce{I-} < \ce{Br-} < \ce{SCN-} < \ce{Cl-} < \ce{F-} < \ce{OH-} < \ce{C2O4^2-} < \ce{H2O} < \ce{NCS-} < \ce{NH3} < \text{en} < \ce{CN-} < \ce{CO}`],
      v: table(['Case', 'Filling for d⁴–d⁷', 'Result'], [['Δo < P (weak field)', 'e_g filled before pairing in t₂g', 'High spin'], ['Δo > P (strong field)', 't₂g filled and paired first', 'Low spin'], ['d⁵ weak field', 't₂g³e_g²', '5 unpaired'], ['d⁵ strong field', 't₂g⁵e_g⁰', '1 unpaired']], 'Table of high-spin and low-spin filling'),
      n: 'The order of ligands by splitting power is called the spectrochemical series: iodide and bromide are weak, water is in the middle, and cyanide and carbon monoxide are strong. For four to seven d electrons, an electron must choose between pairing in the lower set, costing the pairing energy P, or entering the upper set, costing delta o. If delta o is smaller, we get high spin; if larger, low spin.',
    }),
    sl('example', 'Worked example: Mn(II) in weak and strong fields', {
      b: r`**Problem.** Write the $t_{2g}/e_g$ configuration and the number of unpaired electrons for $\ce{[Mn(H2O)6]^2+}$ and $\ce{[Mn(CN)6]^4-}$, and calculate their spin-only moments. (Mn, Z = 25)

**Step 1.** Mn²⁺ is d⁵.

**Step 2.** H₂O (weak, $\Delta_o < P$): $t_{2g}^3e_g^2$, 5 unpaired, $\mu = \sqrt{35} \approx 5.92$ BM.

**Step 3.** CN⁻ (strong, $\Delta_o > P$): $t_{2g}^5e_g^0$, 1 unpaired, $\mu = \sqrt{3} \approx 1.73$ BM.`,
      v: table(['Complex', 'Configuration', 'Unpaired e⁻', 'μ / BM'], [['[Mn(H₂O)₆]²⁺', 't₂g³e_g²', '5', '5.92'], ['[Mn(CN)₆]⁴⁻', 't₂g⁵e_g⁰', '1', '1.73']], 'Table of the two manganese two plus complexes'),
      n: 'Manganese two plus has five d electrons. With water, a weak ligand, the splitting is small, so one electron goes into each of the five orbitals: five unpaired electrons and a moment of about five point nine. With cyanide, a strong ligand, the splitting is large, so all five crowd into the lower set, pairing up and leaving only one unpaired electron.',
    }),
    sl('concept', 'Tetrahedral complexes and magnetism', {
      b: r`Since $\Delta_t \approx \tfrac{4}{9}\Delta_o$ is small, it is almost always **less than the pairing energy**: tetrahedral complexes are practically always **high spin**. Crystal field theory therefore explains magnetism by the number of electrons in $e_g$ (or $t_2$) versus paired in the lower set.`,
      v: table(['Feature', 'Octahedral', 'Tetrahedral'], [['Lower set', 't₂g (3)', 'e (2)'], ['Upper set', 'e_g (2)', 't₂ (3)'], ['Splitting', 'Δo', 'Δt ≈ (4/9)Δo'], ['Spin', 'High or low', 'Almost always high']], 'Table comparing octahedral and tetrahedral splitting'),
      n: 'Because the tetrahedral splitting is only about four ninths of the octahedral splitting for the same metal and ligand, it is almost never large enough to beat the pairing energy. So tetrahedral complexes are practically always high spin. Crystal field theory explains magnetism simply by asking whether the splitting or the pairing energy is larger.',
    }),
    sl('check', 'Quick check: high or low spin', {
      b: 'Predict whether a complex is high spin or low spin.',
      n: 'Quick check. Place the ligand in the spectrochemical series and compare the splitting with the pairing energy.',
      chk: 'spin-mcq',
    }),
    sl('concept', 'Colour of complexes', {
      b: 'A complex absorbs visible light whose energy equals the splitting, promoting an electron from $t_{2g}$ to $e_g$ (a **d–d transition**); we see the **complementary colour**. Stronger ligands give a larger $\\Delta_o$, so higher-energy (shorter-wavelength) light is absorbed. With no ligands, or with d⁰/d¹⁰ ions, there is no d–d transition.',
      m: [r`\Delta_o = \dfrac{N_A h c}{\lambda}`],
      v: table(['Complex', 'Light absorbed', 'Colour seen'], [['[Ti(H₂O)₆]³⁺', 'Blue-green (≈ 498 nm)', 'Violet'], ['[Cu(H₂O)₄]²⁺', 'Orange-red', 'Blue'], ['[Cu(NH₃)₄]²⁺', 'Yellow-orange', 'Deep blue-violet'], ['[Co(NH₃)₆]³⁺', 'Blue-violet', 'Yellow-orange'], ['[Zn(H₂O)₆]²⁺', 'None (d¹⁰)', 'Colourless']], 'Table of light absorbed and colour seen for complexes'),
      n: 'Colour comes from d to d transitions. When white light passes through a complex, light of the energy matching delta o is absorbed, an electron jumps from the lower to the upper set, and we see the complementary colour. Replacing water by ammonia around copper increases delta o, so the colour deepens. Zinc two plus, with a full d subshell, has no such transition and is colourless.',
    }),
    sl('example', 'Worked example: Δo from the colour of [Ti(H₂O)₆]³⁺', {
      b: r`**Problem.** $\ce{[Ti(H2O)6]^3+}$ absorbs most strongly at 498 nm. Calculate $\Delta_o$ in kJ mol⁻¹. ($N_A = 6.022 \times 10^{23}$, $h = 6.626 \times 10^{-34}$ J s, $c = 3.0 \times 10^{8}$ m s⁻¹)

**Step 1.** Ti³⁺ is d¹: the single electron is promoted $t_{2g} \to e_g$, so the photon energy equals $\Delta_o$.

**Step 2.** $\Delta_o = \dfrac{6.022 \times 10^{23} \times 6.626 \times 10^{-34} \times 3.0 \times 10^{8}}{498 \times 10^{-9}} \approx 2.40 \times 10^{5}\ \text{J mol}^{-1}$, about **240 kJ mol⁻¹**.`,
      v: table(['Quantity', 'Value'], [['λ absorbed', '498 nm (blue-green)'], ['Colour seen', 'Violet'], ['Δo', '≈ 240 kJ mol⁻¹']], 'Table of the titanium aqua ion calculation'),
      n: 'Titanium three plus has a single d electron, so its absorption corresponds exactly to the jump across delta o. Multiply Avogadro’s constant, Planck’s constant and the speed of light, and divide by the wavelength in metres. The answer, about two hundred and forty kilojoules per mole, is the crystal field splitting. The violet colour we see is complementary to the blue-green light absorbed.',
    }),
    sl('check', 'Quick check: colour', {
      b: 'Relate ligand strength to the light absorbed and the colour seen.',
      n: 'Quick check. A stronger ligand gives a larger splitting, so shorter-wavelength light is absorbed.',
      chk: 'colour-mcq',
    }),
    sl('concept', 'Stability constants', {
      b: r`Complex formation occurs stepwise: $\ce{M + L <=> ML}$ ($K_1$), $\ce{ML + L <=> ML2}$ ($K_2$), … The **overall stability constant** $\beta_n = K_1 K_2 \cdots K_n$. **Larger β → more stable complex.** The reciprocal, $1/\beta$, is the **instability constant**. Stability increases with charge on the metal, with chelation, and with the basicity or π-acceptor strength of the ligand.`,
      m: [r`\ce{M + 4L <=> ML4}\qquad \beta_4 = \dfrac{[\ce{ML4}]}{[\ce{M}][\ce{L}]^4} = K_1K_2K_3K_4`],
      v: table(['Complex', 'log β (approx.)'], [['[Ag(NH₃)₂]⁺', '7.2'], ['[Ni(NH₃)₆]²⁺', '8.6'], ['[Cu(NH₃)₄]²⁺', '13.1'], ['[Ni(en)₃]²⁺', '18.3'], ['[Ag(CN)₂]⁻', '21.1'], ['[Fe(CN)₆]³⁻', '43.6']], 'Table of approximate overall stability constants'),
      n: 'Complexes form step by step, each step with its own equilibrium constant. Multiplying the stepwise constants gives the overall stability constant, beta. The larger beta is, the more stable the complex. Notice that the ethane-1,2-diamine complex of nickel is ten billion times more stable than the ammonia complex: the chelate effect in numbers. Cyanide complexes are among the most stable known.',
    }),
    sl('example', 'Worked example: comparing and calculating β', {
      b: r`**Problem.** (a) For silver ammine, $K_1 = 2.0 \times 10^3$ and $K_2 = 8.0 \times 10^3$. Calculate $\beta_2$. (b) Explain why AgCl dissolves in aqueous ammonia, and why [Ag(NH₃)₂]⁺ is converted into [Ag(CN)₂]⁻ by cyanide ions.

**(a)** $\beta_2 = K_1 K_2 = 2.0 \times 10^3 \times 8.0 \times 10^3 = 1.6 \times 10^7$.

**(b)** Ag⁺ forms a stable ammine complex, lowering [Ag⁺] below the solubility product of AgCl. $\beta$ for [Ag(CN)₂]⁻ (about $10^{21}$) is far larger than for [Ag(NH₃)₂]⁺ (about $10^{7}$), so cyanide displaces ammonia.`,
      v: table(['Complex', 'β', 'Relative stability'], [['[Ag(NH₃)₂]⁺', '≈ 1.6 × 10⁷', 'Less stable'], ['[Ag(CN)₂]⁻', '≈ 10²¹', 'Much more stable']], 'Table comparing silver complexes'),
      n: 'The overall constant is the product of the stepwise constants: two thousand times eight thousand gives one point six times ten to the seven. Silver chloride dissolves in ammonia because the ammine complex holds the silver ions, keeping their concentration very low. Cyanide forms a far more stable complex, with a beta about ten to the twenty one, so it readily displaces ammonia.',
    }),
    sl('check', 'Quick check: stability', {
      b: 'Use stability constants to compare complexes.',
      n: 'Quick check. The larger the overall stability constant, the more stable the complex.',
      chk: 'stability-mcq',
    }),
    sl('concept', 'Importance of coordination compounds', {
      b: 'Complexes are used in **qualitative and quantitative analysis**, **extraction of metals** and are essential in **living systems**.',
      v: table(['Area', 'Example'], [['Test for Ni²⁺', 'Red precipitate with dimethylglyoxime, [Ni(dmg)₂]'], ['Test for Cu²⁺', 'Deep blue [Cu(NH₃)₄]²⁺ with excess ammonia'], ['Test for Fe³⁺', 'Blood-red [Fe(SCN)(H₂O)₅]²⁺ with thiocyanate; Prussian blue with K₄[Fe(CN)₆]'], ['Hardness of water', 'EDTA titration of Ca²⁺ and Mg²⁺'], ['Extraction of Ag and Au', 'Leaching as [Ag(CN)₂]⁻ and [Au(CN)₂]⁻, then displacement by Zn'], ['Purification of Ni', 'Mond process via volatile [Ni(CO)₄]'], ['Biology', 'Haemoglobin (Fe), chlorophyll (Mg), vitamin B12 (Co)'], ['Medicine', 'Cisplatin (anticancer); EDTA for lead poisoning']], 'Table of uses of coordination compounds in analysis, metallurgy and biology'),
      n: 'Coordination compounds are vital. In qualitative analysis, nickel gives a red precipitate with dimethylglyoxime, copper a deep blue colour with ammonia, and iron three a blood-red colour with thiocyanate. Gold and silver are leached from their ores as cyanide complexes, and nickel is purified as its volatile carbonyl. In living things, haemoglobin, chlorophyll and vitamin B twelve are all complexes of metal ions.',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'CFT: octahedral t₂g (−0.4Δo) below e_g (+0.6Δo); tetrahedral e below t₂, Δt ≈ (4/9)Δo.',
        'Spectrochemical series: I⁻ < Br⁻ < Cl⁻ < F⁻ < H₂O < NH₃ < en < CN⁻ < CO.',
        'Δo > P → low spin; Δo < P → high spin; tetrahedral complexes high spin.',
        'Colour from d–d transitions; complementary colour seen; Δo = N_A hc/λ.',
        'β = K₁K₂…Kn; larger β, more stable; chelates and cyanides very stable.',
        'Uses: analysis (dmg, NH₃, SCN⁻, EDTA), metallurgy (CN⁻, Mond), biology (Hb, chlorophyll, B12).',
      ],
      v: table(['Idea', 'Key point'], [['Low spin', 'Strong-field ligand, Δo > P'], ['Colour', 'd–d transition'], ['Stability', 'Larger β']], 'Summary table of Part 2'),
      n: 'Let us sum up Part 2. Crystal field theory splits the d orbitals into two sets, and the spectrochemical series ranks ligands by how much they split them. Comparing the splitting with the pairing energy decides high or low spin. The light absorbed in a d to d transition gives complexes their colours. Stability constants measure how stable complexes are, and complexes are used widely in analysis, metallurgy and living systems.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Label t₂g, e_g and Δo (and the 0.4/0.6 positions) on splitting diagrams.',
        'Write configurations as t₂gˣe_gʸ and count unpaired electrons.',
        'Colour seen is complementary to the colour absorbed.',
        'β is the product of stepwise constants; compare β, not individual K values.',
      ],
      v: table(['Slip', 'Fix'], [['t₂g above e_g in octahedral', 't₂g lower'], ['Low-spin tetrahedral complexes', 'Almost always high spin'], ['β = K₁ + K₂', 'β = K₁ × K₂']], 'Table of three common slips in Part 2 and fixes'),
      n: 'Final tips. Label every splitting diagram fully, with delta o. Write configurations in the t two g, e g form and count the unpaired electrons. Remember that the colour seen is complementary to the colour absorbed. And the overall stability constant is the product, not the sum, of the stepwise constants.',
    }),
  ],
});
