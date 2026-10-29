// ch05 Magnetism and Matter — two decks: Part 1 (t01–t02) the bar magnet, its field lines, the equivalent solenoid and a
// magnetic dipole in a uniform field (qualitative, as the syllabus asks); Part 2 (t03) magnetic properties of materials.
// Worked-example numbers are computed here.
import { sl, deck, table, flow, svgV, plot, r, sci, dec } from '../../cbse-12-physics-ch01/src/lib.mjs';
import * as G from './svgs.mjs';

export const MU0 = 4 * Math.PI * 1e-7;

// ---------------------------------------------------------------- worked-example numbers
const ex1 = { m: 400 * 1.5 * 2.0e-4 };
const ex3 = { tau: 0.12 * 0.05 * 0.5 };
const ex4 = { M: 8 / 1e-5 };
const ex5 = (() => {
  const H = 1000 * 2;
  const mur = 500;
  return { H, B: MU0 * mur * H, M: (mur - 1) * H };
})();
const ex6 = { c150: (3.0e-4 * 300) / 150, c600: (3.0e-4 * 300) / 600 };
export const EX = { ex1, ex3, ex4, ex5, ex6 };

export const V = {
  bar: svgV(G.BAR, 'Closed field lines of a bar magnet running outside from N to S and inside from S to N', 'Traced numerically from the equivalent solenoid (Biot–Savart over its circular turns).'),
  sol: svgV(G.SOLENOID, 'Field lines of a short solenoid, the same pattern as a bar magnet', 'Same calculation as the bar-magnet figure, with the turns drawn.'),
  pos: svgV(G.POSITIONS, 'Axial and equatorial points of a bar magnet with the field direction at each'),
  torque: svgV(G.MAGNET_TORQUE, 'Bar magnet at an angle in a uniform field with equal and opposite forces on its poles'),
  materials: svgV(G.MATERIALS, 'Field lines through diamagnetic, paramagnetic and ferromagnetic samples', 'Exact field of a long cylinder of relative permeability 0.6, 1.5 and 30 in a uniform field.'),
  domains: svgV(G.DOMAINS, 'Random domains in an unmagnetised ferromagnet and aligned domains when magnetised'),
};
export const curiePlot = plot(
  {
    x: { min: 50, max: 600, label: 'T (K)' },
    y: { min: 0, max: 6.2, label: 'χ / χ(300 K)' },
    functions: [{ expr: '300/x', label: 'paramagnet: χ = C/T (Curie law)' }],
  },
  'Susceptibility of a paramagnet against absolute temperature, falling as one over T: halving the temperature doubles the susceptibility',
  'Curie law: χ ∝ 1/T.',
);
export const ferroPlot = plot(
  {
    x: { min: 0, max: 1.5, label: 'T / T_C' },
    y: { min: 0, max: 1.1, label: 'spontaneous magnetisation (relative)' },
    functions: [
      { expr: 'sqrt(1 - x)', label: 'ferromagnetic below T_C', domain: [0, 1] },
      { expr: '0', label: 'paramagnetic above T_C', domain: [1, 1.5] },
    ],
    vlines: [{ x: 1, label: 'Curie temperature', dashed: true }],
  },
  'Spontaneous magnetisation of a ferromagnet falling to zero at the Curie temperature, above which the material is only paramagnetic',
  'Shape only: the domains disappear at T_C.',
);

export const deck1 = deck({
  part: 1,
  title: 'Magnetism and Matter — Part 1: The bar magnet as a magnetic dipole',
  goals: [
    'Describe the field lines of a bar magnet and compare them with electric field lines',
    'Explain why a bar magnet behaves like an equivalent solenoid',
    'Describe the field of a magnetic dipole on its axis and equatorial line, and the torque on it in a uniform field (qualitatively)',
  ],
  slides: [
    sl('title', 'Magnetism and Matter', {
      b: 'Part 1 — the bar magnet seen as a tiny current loop: its field lines, its field at different points and its behaviour in a uniform field.',
      v: flow('LR', [['b', 'Bar magnet'], ['l', 'Field lines'], ['s', 'Equivalent solenoid'], ['f', 'Axial and equatorial field'], ['t', 'Torque in a field']], [['b', 'l'], ['l', 's'], ['s', 'f'], ['f', 't']], 'Flow of the part: bar magnet, field lines, equivalent solenoid, axial and equatorial field, torque in a field'),
      n: 'A fridge magnet, a compass needle and a motor’s magnet all behave in the same way. In this part we look at the bar magnet as a magnetic dipole. We describe its field lines, see why it behaves exactly like a small current-carrying solenoid, compare its field at different points, and find out what a uniform field does to it.',
    }),
    sl('concept', 'Properties of a bar magnet', {
      b: 'A freely suspended bar magnet settles roughly north–south. Its two ends are its **north (N)** and **south (S)** poles.',
      ul: ['Like poles repel; unlike poles attract.', 'Breaking a magnet gives two smaller magnets, each with N and S: **isolated poles (monopoles) are not found**.', 'The **magnetic moment** $\\vec m$ points from S to N inside the magnet (unit A m²).'],
      v: table(['Property', 'Observation'], [['Directive', 'Hangs roughly north–south'], ['Poles', 'Attraction is strongest near the ends'], ['Pairs', 'N and S always come together'], ['Breaking', 'Each piece is a complete magnet']], 'Table of bar-magnet properties: directive, poles, poles in pairs and breaking into complete magnets'),
      n: 'Hang a bar magnet freely and it turns until it points roughly north and south. The end pointing north is called its north pole. Iron filings cling most strongly near the two ends. Like poles repel and unlike poles attract. And however many times you break a magnet, every piece has both a north and a south pole: no one has found an isolated magnetic pole.',
    }),
    sl('diagram', 'Field lines of a bar magnet', {
      b: 'Magnetic field lines form **continuous closed loops**: outside the magnet they run from N to S, and inside from S to N.',
      ul: ['The tangent gives the direction of $\\vec B$; crowding shows strength.', 'Field lines never cross.', 'They do not start or end anywhere, because there are no monopoles.'],
      v: V.bar,
      n: 'Sprinkle iron filings round a bar magnet and they trace out its field lines. Outside the magnet the lines run from the north pole round to the south pole. Unlike electric field lines, they do not stop there: they carry on inside the magnet from south back to north, so every line is a closed loop. This is the picture of a magnetic dipole.',
    }),
    sl('two-column', 'Magnetic and electric field lines compared', {
      b: 'Both describe a field, but with one key difference:',
      cols: [
        '**Electric field lines (dipole)**\n\n- Start on + charges, end on − charges\n- Never form closed loops\n- Between the charges they point from + to −',
        '**Magnetic field lines (bar magnet)**\n\n- No start or end: closed loops\n- Inside the magnet they run S → N\n- Net magnetic flux through any closed surface is zero',
      ],
      v: V.bar,
      n: 'Electric field lines begin on positive charges and end on negative charges. Magnetic field lines have nowhere to begin or end, because there are no magnetic charges, so they always close on themselves. A consequence is that the total magnetic flux out of any closed surface is zero: every line that leaves also comes back in. Outside the magnets the two dipole patterns look alike.',
    }),
    sl('check', 'Quick check: magnetic field lines', {
      b: 'Decide whether the statement is true or false.',
      v: null,
      chk: 'loops-tf',
      n: 'Think about where magnetic field lines could begin or end, if there are no isolated magnetic poles.',
    }),
    sl('diagram', 'The bar magnet as an equivalent solenoid', {
      b: r`A current-carrying solenoid produces the **same field pattern** as a bar magnet: its end where the current looks anticlockwise is a north pole. Its magnetic moment is
$$m = NIA$$
for $N$ turns of area $A$ carrying current $I$. In a magnet, the circulating electrons in its atoms play the part of the turns.`,
      v: V.sol,
      n: 'Compare this picture with the bar magnet. A short solenoid carrying a current makes exactly the same pattern of closed field lines, with a north pole at one end and a south pole at the other. Its magnetic moment is N I A. Inside a real magnet, electrons circulating and spinning in the atoms act like countless tiny current loops all lined up, which is why a magnet behaves like a solenoid.',
    }),
    sl('example', 'Worked example 1: matching a magnet with a solenoid', {
      b: r`A solenoid of 400 turns, each of area 2.0 cm², carries 1.5 A. What is its magnetic moment? A bar magnet with the same moment would produce the same field far away.`,
      ul: [
        r`Step 1 — $A = 2.0 \times 10^{-4}$ m².`,
        r`Step 2 — $m = NIA = 400 \times 1.5 \times 2.0 \times 10^{-4} = ${dec(ex1.m, 2)}$ A m².`,
        'Step 3 — direction: along the axis, towards the end where the current appears anticlockwise (the N end).',
      ],
      v: V.sol,
      n: 'Convert two square centimetres to two times ten to the minus four square metre. Multiply turns, current and area to get a magnetic moment of zero point one two ampere square metre, along the axis towards the end that acts as a north pole. Far from it, a bar magnet with this same moment would produce an identical field, which is what equivalent means.',
    }),
    sl('concept', 'Field of a bar magnet at axial and equatorial points', {
      b: 'By analogy with the electric dipole (treated qualitatively), at a large distance $r$:',
      ul: [
        r`**Axial point:** field along $\vec m$, size $\dfrac{\mu_0}{4\pi}\dfrac{2m}{r^3}$.`,
        r`**Equatorial point:** field opposite to $\vec m$, size $\dfrac{\mu_0}{4\pi}\dfrac{m}{r^3}$ — half the axial value at the same distance.`,
        'Both fall as $1/r^3$, much faster than the field of a single pole would.',
      ],
      v: V.pos,
      n: 'The field of a bar magnet far away has the same shape as that of an electric dipole, with mu nought over four pi in place of one over four pi epsilon nought and m in place of p. On the axis the field points along the magnetic moment; on the equatorial line it points the opposite way and is half as strong at the same distance. Both weaken as the cube of the distance.',
    }),
    sl('example', 'Worked example 2: comparing fields by ratio', {
      b: 'A short bar magnet produces a field $B$ at a point on its axis 20 cm away. Find, qualitatively and by ratio, the field (a) on its equatorial line 20 cm away, (b) on its axis 40 cm away.',
      ul: [
        'Step 1 — same distance: equatorial field is half the axial field, so (a) $B/2$, pointing opposite to $\\vec m$.',
        'Step 2 — doubling the distance divides a $1/r^3$ field by $2^3 = 8$, so (b) $B/8$, along $\\vec m$.',
        'Check — the field 40 cm away on the equator would be $B/16$.',
      ],
      v: V.pos,
      n: 'Ratios answer most questions here without any constants. At the same distance, the equatorial field is half the axial field and points the other way. Doubling the distance makes the field eight times weaker because it falls as one over r cubed. Combine the two and a point forty centimetres away on the equator has one sixteenth of the original axial field.',
    }),
    sl('check', 'Quick check: halving the distance', {
      b: 'Choose how the field changes.',
      v: V.pos,
      chk: 'halfr-mcq',
      n: 'The far field of a magnetic dipole varies as one over r cubed. Work out the factor for half the distance.',
    }),
    sl('diagram', 'A bar magnet in a uniform field', {
      b: r`In a uniform field the forces on the two poles are equal and opposite: **no net force**, but a **couple**:
$$\vec\tau = \vec m \times \vec B,\qquad \tau = mB\sin\theta$$
It turns the magnet to line up with $\vec B$ — which is how a compass needle works.`,
      v: V.torque,
      n: 'Place a bar magnet at an angle in a uniform field. Its north pole is pushed along the field and its south pole the opposite way, with equal forces, so the magnet does not move off, but it turns. The torque is m B sine theta, exactly as for a current loop. It turns the magnet into line with the field, and that is all a compass needle is doing when it points north.',
    }),
    sl('concept', 'Equilibrium and oscillation', {
      b: 'Like the current loop and the electric dipole:',
      ul: [
        '**Stable** equilibrium: $\\vec m$ along $\\vec B$ ($\\theta = 0$), lowest potential energy $-mB$.',
        '**Unstable** equilibrium: $\\vec m$ opposite to $\\vec B$ ($\\theta = 180^\\circ$), highest energy $+mB$.',
        'Displaced slightly from the stable position, a freely pivoted magnet **oscillates** about the field direction; a stronger field makes it oscillate faster.',
      ],
      v: table(['Orientation', 'Torque', 'Energy', 'Equilibrium'], [['m along B', '0', '−mB (lowest)', 'Stable'], ['m ⟂ B', 'mB (largest)', '0', 'None'], ['m opposite to B', '0', '+mB (highest)', 'Unstable']], 'Table of orientations of a magnet in a field with torque, energy and type of equilibrium'),
      n: 'A magnet pointing along the field is in stable equilibrium: nudge it and the torque pulls it back, so it swings to and fro about the field direction. Pointing exactly against the field it is balanced but unstable. The potential energy is lowest, minus m B, when aligned and highest, plus m B, when reversed. In a stronger field the restoring torque is larger, so the oscillations are faster.',
    }),
    sl('example', 'Worked example 3: torque on a magnet', {
      b: r`A bar magnet of moment 0.12 A m² is placed at $30^\circ$ to a uniform field of 0.050 T. Find the torque on it. In which position would the torque be largest?`,
      ul: [
        r`Step 1 — $\tau = mB\sin\theta = 0.12 \times 0.050 \times 0.5 = ${sci(ex3.tau, 2)}$ N m.`,
        'Step 2 — the torque is largest when the magnet is at right angles to the field ($\\sin 90^\\circ = 1$): $6.0 \\times 10^{-3}$ N m.',
        'Step 3 — the torque turns the magnet towards the field direction; the net force is zero.',
      ],
      v: V.torque,
      n: 'Multiply the moment by the field and by sine thirty degrees, one half: three times ten to the minus three newton metre. At right angles the torque would double to its largest value. Whatever the angle, the torque tries to bring the magnet into line with the field, and because the field is uniform there is no overall push or pull on the magnet.',
    }),
    sl('check', 'Quick check: force on a magnet in a uniform field', {
      b: 'Judge the assertion and the reason.',
      v: null,
      chk: 'uniformF-ar',
      n: 'Compare the forces on the two poles in a uniform field and ask whether they also form a couple.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key ideas:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Field lines', 'Closed loops: outside N → S, inside S → N'],
          ['No monopoles', 'Poles always in pairs; net flux through a closed surface is 0'],
          ['Equivalent solenoid', '$m = NIA$, same field pattern'],
          ['Far field', 'Axial $\\propto 2m/r^3$ along m; equatorial $\\propto m/r^3$ opposite to m'],
          ['Uniform field', '$\\vec\\tau = \\vec m \\times \\vec B$; no net force; stable when aligned'],
        ],
        'Summary table of field lines, monopoles, equivalent solenoid, far field and behaviour in a uniform field',
      ),
      n: 'To sum up: a bar magnet is a magnetic dipole. Its field lines are closed loops, running outside from north to south and inside from south to north, because there are no isolated poles. It is equivalent to a solenoid with moment N I A. Far away its field falls as one over r cubed, twice as strong on the axis as on the equator. In a uniform field it feels a torque m cross B but no net force.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'Draw field lines as **closed loops** with arrows, including inside the magnet (S → N).',
        'Ratio questions: $1/r^3$ for distance, factor 2 between axial and equatorial points.',
        'Say “no net force but a torque” for a magnet in a uniform field.',
        'The treatment is qualitative: explain with the solenoid analogy rather than pole formulas.',
      ],
      v: table(['Change', 'Effect on far field'], [['Distance doubled', '÷ 8'], ['Axial → equatorial (same r)', '÷ 2, direction reversed'], ['Moment doubled', '× 2']], 'Table of how the far field of a bar magnet changes with distance, position and moment'),
      n: 'In field-line diagrams, examiners look for closed loops with arrows, continuing inside the magnet from south to north. Use ratios for comparison questions: a factor of eight for doubling the distance, and a factor of two between axial and equatorial points. For a magnet in a uniform field, always say there is a torque but no net force.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Magnetism and Matter — Part 2: Magnetic properties of materials',
  goals: [
    'Define magnetisation, magnetic intensity, susceptibility and relative permeability',
    'Classify materials as diamagnetic, paramagnetic and ferromagnetic, with examples',
    'Explain the effect of temperature on magnetic properties (Curie law, Curie temperature)',
  ],
  slides: [
    sl('title', 'Magnetic properties of materials', {
      b: 'Part 2 — why iron is pulled strongly into a magnetic field, aluminium only slightly, and bismuth is pushed out.',
      v: flow('LR', [['m', 'Magnetisation M'], ['h', 'Intensity H'], ['c', 'χ and μr'], ['k', 'Dia, para, ferro'], ['t', 'Temperature']], [['m', 'h'], ['h', 'c'], ['c', 'k'], ['k', 't']], 'Flow of the part: magnetisation, magnetic intensity, susceptibility and permeability, three classes of material, effect of temperature'),
      n: 'Every material responds to a magnetic field, though most so weakly that we never notice. In this part we describe that response with magnetisation, magnetic intensity and susceptibility, sort materials into diamagnetic, paramagnetic and ferromagnetic, and see how temperature changes their behaviour, including why a hot iron nail stops sticking to a magnet.',
    }),
    sl('concept', 'Magnetisation, intensity, susceptibility', {
      b: r`**Magnetisation** $\vec M$: net magnetic moment per unit volume (A m$^{-1}$). For a material in an applied field:
$$\vec B = \mu_0(\vec H + \vec M),\qquad \vec M = \chi\vec H,\qquad \vec B = \mu_0\mu_r\vec H,\qquad \mu_r = 1 + \chi$$
$\vec H$ (**magnetic intensity**, A m$^{-1}$) is set by the free currents, e.g. $H = nI$ in a solenoid.`,
      v: table(['Quantity', 'Symbol', 'Unit', 'Meaning'], [['Magnetisation', 'M', 'A m⁻¹', 'Moment per unit volume'], ['Magnetic intensity', 'H', 'A m⁻¹', 'Set by free currents'], ['Susceptibility', 'χ', 'none', 'M/H'], ['Relative permeability', 'μr', 'none', '1 + χ']], 'Table of magnetisation, magnetic intensity, susceptibility and relative permeability with symbols, units and meanings'),
      n: 'A material placed in a field becomes magnetised: its atoms’ tiny moments add up to a net moment per unit volume, the magnetisation M. The field from free currents, such as the turns of a solenoid, is described by the magnetic intensity H. For most materials M is proportional to H, and the constant is the susceptibility chi. The total field is mu nought times H plus M, which is mu nought mu r H, with mu r equal to one plus chi.',
    }),
    sl('example', 'Worked example 4: magnetisation of a bar', {
      b: r`An iron bar 10 cm × 1.0 cm × 1.0 cm has a magnetic moment of 8.0 A m². Find its magnetisation.`,
      ul: [
        r`Step 1 — volume $V = 0.10 \times 0.010 \times 0.010 = 1.0 \times 10^{-5}$ m³.`,
        r`Step 2 — $M = \dfrac{m}{V} = \dfrac{8.0}{1.0 \times 10^{-5}} = ${sci(ex4.M, 2)}$ A m$^{-1}$.`,
        'Comment — a strongly magnetised ferromagnet; the same volume of a paramagnet in a lab field would have M millions of times smaller.',
      ],
      v: table(['Quantity', 'Value'], [['Volume', '$1.0 \\times 10^{-5}$ m³'], ['Moment', '8.0 A m²'], ['Magnetisation', `$${sci(ex4.M, 2)}$ A m$^{-1}$`]], 'Worked table: a volume of ten to the minus five cubic metre and a moment of 8 ampere square metre give a magnetisation of 8 times ten to the five amperes per metre'),
      n: 'Find the volume in cubic metres first: one times ten to the minus five. Divide the magnetic moment by the volume to get the magnetisation, eight times ten to the five amperes per metre. This is typical of a magnetised piece of iron. A paramagnetic material in an ordinary laboratory field would show a magnetisation millions of times smaller.',
    }),
    sl('diagram', 'Three kinds of magnetic material', {
      b: 'In a uniform field, field lines are pushed out of a **diamagnetic** sample, drawn slightly into a **paramagnetic** one and strongly into a **ferromagnetic** one.',
      v: V.materials,
      n: 'The three figures show the same uniform field with three different samples placed in it. Lines spread out round the diamagnetic sample, so the field inside is weaker. They crowd a little into the paramagnetic sample and very strongly into the ferromagnetic one, where the field inside is much larger than outside. These pictures come from the exact calculation for a long cylinder.',
    }),
    sl('concept', 'Diamagnetism', {
      b: r`Diamagnetic materials are **weakly magnetised opposite** to the applied field: $\chi$ small and **negative**, $\mu_r$ slightly less than 1.`,
      ul: [
        'Cause: the field changes the orbital motion of electrons so that the induced moments **oppose** it (all materials show this; it is masked when stronger effects exist).',
        'Examples: bismuth, copper, lead, silicon, water, nitrogen gas, sodium chloride.',
        'Move from stronger to **weaker** field regions; a diamagnetic rod sets **perpendicular** to the field.',
        'Superconductors are perfect diamagnets ($\\chi = -1$): they expel the field completely (Meissner effect) — used in maglev trains.',
      ],
      v: V.materials,
      n: 'In a diamagnetic material the atoms have no net moment of their own. An applied field slightly alters the electrons’ orbits, producing small moments that oppose the field. So chi is small and negative, and the sample is gently pushed towards weaker parts of a field. Bismuth, copper and water behave like this. A superconductor is the extreme case: it expels the field entirely and can float above a magnet.',
    }),
    sl('concept', 'Paramagnetism', {
      b: r`Paramagnetic materials are **weakly magnetised along** the field: $\chi$ small and **positive**, $\mu_r$ slightly more than 1.`,
      ul: [
        'Cause: atoms have **permanent** magnetic moments; the field partly lines them up, while thermal motion keeps them random.',
        'Examples: aluminium, sodium, calcium, oxygen gas, copper chloride.',
        'Move from weaker to **stronger** field regions; a paramagnetic rod sets **along** the field.',
        'Effect of temperature (Curie law): $\\chi = \\dfrac{C}{T}$ — cooling makes alignment easier.',
      ],
      v: curiePlot,
      n: 'In a paramagnetic material each atom already has a small magnetic moment, but thermal jostling points them in random directions. An applied field lines them up slightly, giving a small magnetisation along the field, so chi is small and positive. Such materials are gently pulled into stronger fields. Because heat fights the alignment, the susceptibility falls as the temperature rises: Curie’s law says chi equals C over T.',
    }),
    sl('check', 'Quick check: classify the material', {
      b: 'Use the sign and size of the susceptibility.',
      v: null,
      chk: 'classify-mcq',
      n: 'Negative susceptibility means diamagnetic; small positive means paramagnetic; very large positive means ferromagnetic.',
    }),
    sl('diagram', 'Ferromagnetism and domains', {
      b: r`Ferromagnetic materials are **strongly magnetised** along the field: $\chi$ and $\mu_r$ very large (hundreds to many thousands).`,
      ul: [
        'Atomic moments line up spontaneously in small regions called **domains** (about 1 mm or less).',
        'Unmagnetised: domains point randomly. In a field, favourable domains grow and others rotate, so the sample becomes strongly magnetised.',
        'Examples: iron, cobalt, nickel, gadolinium and alloys such as alnico.',
        '**Soft** ferromagnets (soft iron) lose magnetisation easily — electromagnet cores; **hard** ones (steel, alnico) retain it — permanent magnets.',
      ],
      v: V.domains,
      n: 'In iron, cobalt and nickel, neighbouring atomic moments line up with each other spontaneously, forming domains, each one fully magnetised. In an ordinary piece of iron the domains point every which way and cancel. Put it in a field and the domains pointing along the field grow while others turn, so the whole sample becomes strongly magnetised. Soft iron loses this easily; steel keeps it, making a permanent magnet.',
    }),
    sl('two-column', 'Comparing the three classes', {
      b: 'Quick comparison:',
      cols: [
        '**Diamagnetic**\n\n- χ: small, negative (about −10⁻⁵)\n- μr: slightly < 1\n- Moves to weaker field\n- Little change with temperature\n\n**Paramagnetic**\n\n- χ: small, positive (10⁻⁵ to 10⁻³)\n- μr: slightly > 1\n- Moves to stronger field\n- χ = C/T',
        '**Ferromagnetic**\n\n- χ: very large, positive (10² to 10⁵)\n- μr: ≫ 1\n- Strongly attracted into strong fields\n- Becomes paramagnetic above the Curie temperature',
      ],
      v: table(['Class', 'χ', 'Example'], [['Diamagnetic', '≈ −1.7 × 10⁻⁵', 'Bismuth'], ['Paramagnetic', '≈ +2.3 × 10⁻⁵', 'Aluminium'], ['Ferromagnetic', '≈ 10³ to 10⁵', 'Iron']], 'Table of typical susceptibilities: bismuth about minus 1.7 times ten to the minus five, aluminium about plus 2.3 times ten to the minus five, iron about a thousand to a hundred thousand'),
      n: 'The susceptibility sorts the three classes. Diamagnets have a tiny negative chi and are pushed to weaker fields. Paramagnets have a tiny positive chi, are pulled gently into stronger fields, and follow Curie’s law. Ferromagnets have an enormous positive chi and are pulled in strongly, until they are heated above their Curie temperature, when they become paramagnetic.',
    }),
    sl('example', 'Worked example 5: an iron-cored solenoid', {
      b: r`A long solenoid has 1000 turns per metre and carries 2.0 A. Its core is iron with $\mu_r = 500$. Find $H$, $B$ in the core, and the magnetisation $M$.`,
      ul: [
        r`Step 1 — $H = nI = 1000 \times 2.0 = ${ex5.H}$ A m$^{-1}$ (set by the current alone).`,
        r`Step 2 — $B = \mu_0\mu_r H = 4\pi \times 10^{-7} \times 500 \times 2000 \approx ${dec(ex5.B, 3)}$ T.`,
        r`Step 3 — $M = (\mu_r - 1)H = 499 \times 2000 \approx ${sci(ex5.M, 3)}$ A m$^{-1}$.`,
        'Comment — without the core $B$ would be only about 2.5 mT: the iron multiplies it 500 times.',
      ],
      v: V.domains,
      n: 'H depends only on the free current: one thousand turns per metre times two amperes is two thousand amperes per metre. With iron of relative permeability five hundred, B is mu nought times five hundred times two thousand, about one point two six tesla. The magnetisation is mu r minus one times H, about a million amperes per metre. This is why electromagnets always have iron cores.',
    }),
    sl('concept', 'Materials in a non-uniform field', {
      b: 'The response is easy to see in a non-uniform field:',
      ul: [
        'A **paramagnetic** liquid (copper chloride solution) in one arm of a U-tube placed between magnet poles **rises** into the strong field.',
        'A **diamagnetic** liquid (water) in the same set-up is **depressed** slightly.',
        'A small rod hung between the poles sets **along** the field if para- or ferromagnetic, **across** it if diamagnetic.',
      ],
      v: V.materials,
      n: 'Put a little liquid in a U-tube with one arm between the poles of a strong magnet. A paramagnetic solution, such as copper chloride, creeps up into the strong field. Water, which is diamagnetic, is pushed down very slightly. Hang a small rod between the poles and it turns along the field if it is paramagnetic or ferromagnetic, but across the field if it is diamagnetic.',
    }),
    sl('check', 'Quick check: the U-tube', {
      b: 'Predict what happens to the liquid level.',
      v: null,
      chk: 'utube-mcq',
      n: 'Ask whether the liquid is attracted into or pushed out of the strong field, based on the sign of its susceptibility.',
    }),
    sl('diagram', 'Effect of temperature', {
      b: 'Temperature fights the alignment of atomic moments:',
      ul: [
        'Diamagnetism: almost independent of temperature.',
        'Paramagnetism: $\\chi = C/T$ (Curie law).',
        'Ferromagnetism: above the **Curie temperature** $T_C$ the domains break up and the material becomes paramagnetic (iron: about 1043 K; nickel: about 631 K).',
      ],
      v: ferroPlot,
      n: 'Heating shakes the atomic moments about. Diamagnetism hardly notices, because it does not rely on aligning permanent moments. Paramagnetic susceptibility falls in proportion to one over the absolute temperature. A ferromagnet keeps its domains only below its Curie temperature: above it, alignment is lost and it becomes merely paramagnetic. Heat a magnetised iron nail red-hot and it stops sticking to a magnet.',
    }),
    sl('example', 'Worked example 6: using Curie’s law', {
      b: r`A paramagnetic salt has $\chi = 3.0 \times 10^{-4}$ at 300 K. Find its susceptibility at 150 K and at 600 K.`,
      ul: [
        r`Step 1 — $\chi T$ is constant: $\chi T = 3.0 \times 10^{-4} \times 300 = 0.09$ K.`,
        r`Step 2 — at 150 K: $\chi = 0.09/150 = ${sci(ex6.c150, 2)}$.`,
        r`Step 3 — at 600 K: $\chi = 0.09/600 = ${sci(ex6.c600, 2)}$.`,
      ],
      v: curiePlot,
      n: 'Curie’s law says chi times the absolute temperature stays constant, here zero point zero nine kelvin. Halving the temperature to one hundred and fifty kelvin doubles the susceptibility to six times ten to the minus four. Doubling it to six hundred kelvin halves it to one point five times ten to the minus four. Always use kelvin, never degrees Celsius, in Curie’s law.',
    }),
    sl('check', 'Quick check: heating a ferromagnet', {
      b: 'Choose what happens above the Curie temperature.',
      v: ferroPlot,
      chk: 'curieT-mcq',
      n: 'Think about what happens to the domains when thermal motion becomes strong enough.',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Field in a material', '$B = \\mu_0(H + M) = \\mu_0\\mu_r H$'],
          ['Susceptibility', '$\\chi = M/H$; $\\mu_r = 1 + \\chi$'],
          ['Diamagnetic', 'χ small, negative; pushed to weaker field'],
          ['Paramagnetic', 'χ small, positive; χ = C/T'],
          ['Ferromagnetic', 'χ very large; domains; paramagnetic above $T_C$'],
        ],
        'Summary table of the field in a material, susceptibility and the three classes of magnetic material',
      ),
      n: 'To sum up: a material in a field acquires a magnetisation M, and the total field is mu nought times H plus M. The susceptibility chi, M over H, classifies materials: small and negative for diamagnets, small and positive for paramagnets, and enormous for ferromagnets, which owe their strength to domains. Paramagnetic chi falls as one over T, and a ferromagnet becomes paramagnetic above its Curie temperature.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'Give **examples** for each class; examiners expect at least two.',
        'Use kelvin in Curie’s law; $\\chi T$ is constant.',
        '$H$ depends on free currents only ($nI$); $B$ and $M$ depend on the material.',
        'Explain ferromagnetism with domains, and the Curie temperature as the loss of domain alignment.',
      ],
      v: table(['Asked', 'Key point'], [['Why diamagnets are repelled', 'Induced moments oppose B'], ['Why χ of paramagnet falls with T', 'Thermal motion randomises moments'], ['Why iron loses magnetism when hot', 'Domains break up above T_C']], 'Table of common questions and the key point for each'),
      n: 'Always give examples when you classify materials. In Curie’s law use absolute temperature, and remember chi times T is constant. Keep H and B apart: H comes only from the free currents, while B and M depend on the material inside. When asked about ferromagnetism or the Curie temperature, explain in terms of domains.',
    }),
  ],
});
