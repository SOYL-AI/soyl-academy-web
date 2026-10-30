// ISC 12 Physics ch01 Electric Charges and Fields — two decks: Part 1 (t01–t04) charge, Coulomb's law, superposition and
// the electric field; Part 2 (t05–t07) field lines, the electric dipole and its field, and a dipole in a uniform field.
// Worked-example numbers are computed here.
import { sl, deck, table, flow, svgV, plot, r, sci, dec, K, QE } from './lib.mjs';
import * as G from './svgs.mjs';

export const G_N = 6.67e-11;
export const MP = 1.67e-27;

// ---------------------------------------------------------------- worked-example numbers
const ex1 = { q: 2.4e-19, Q: -3.2e-9 };
ex1.n = ex1.q / QE;
ex1.N = Math.abs(ex1.Q) / QE;
const ex2 = { q1: 2e-6, q2: -5e-6, r: 0.15, K: 2.5 };
ex2.F = (K * ex2.q1 * Math.abs(ex2.q2)) / ex2.r ** 2;
ex2.Fm = ex2.F / ex2.K;
const ex3 = {};
ex3.Fe = (K * QE * QE) / 1;
ex3.Fg = (G_N * MP * MP) / 1;
ex3.ratio = ex3.Fe / ex3.Fg;
const ex4 = { ...G.SUPER_DATA };
const ex5 = { q1: 8e-9, q2: 2e-9, d: 0.3 };
ex5.x = (ex5.d * Math.sqrt(ex5.q1)) / (Math.sqrt(ex5.q1) + Math.sqrt(ex5.q2));
ex5.Emid = (K * (ex5.q1 - ex5.q2)) / (ex5.d / 2) ** 2;
const ex6 = { q: 5e-9, d: 4e-3, r: 0.2 };
ex6.p = ex6.q * ex6.d;
ex6.Eax = (2 * K * ex6.p) / ex6.r ** 3;
ex6.Eeq = (K * ex6.p) / ex6.r ** 3;
const ex7 = { q: 2e-9, a: 0.01, r: 0.03 };
ex7.p = ex7.q * 2 * ex7.a;
ex7.exact = (2 * K * ex7.p * ex7.r) / (ex7.r ** 2 - ex7.a ** 2) ** 2;
ex7.short = (2 * K * ex7.p) / ex7.r ** 3;
ex7.ratio = ex7.exact / ex7.short;
const ex8 = { q: 2e-6, d: 3e-3, E: 5e4, th: 30 };
ex8.p = ex8.q * ex8.d;
ex8.tau = ex8.p * ex8.E * Math.sin((ex8.th * Math.PI) / 180);
ex8.max = ex8.p * ex8.E;
export const EX = { ex1, ex2, ex3, ex4, ex5, ex6, ex7, ex8 };

export const V = {
  forces: svgV(G.FORCES, 'Like charges repel and unlike charges attract along the line joining them'),
  super: svgV(G.SUPER, 'Two Coulomb forces on one charge added by the parallelogram rule', 'Drawn to scale (90 px per newton); the resultant direction is checked.'),
  pos: svgV(G.LINES_POS, 'Radial field lines of a positive point charge', 'Traced numerically from Coulomb’s law.'),
  neg: svgV(G.LINES_NEG, 'Radial field lines ending on a negative point charge'),
  dipole: svgV(G.LINES_DIPOLE, 'Field lines of an electric dipole', 'Traced numerically; arrowheads checked against the computed field.'),
  like: svgV(G.LINES_LIKE, 'Field lines of two equal positive charges with a neutral point between them'),
  geom: svgV(G.DIPOLE_GEOM, 'Fields of the two charges of a dipole at an axial point and at an equatorial point'),
  torque: svgV(G.TORQUE, 'Couple acting on a dipole held at an angle to a uniform field'),
};
export const inverseSq = plot(
  {
    x: { min: 0.5, max: 4, label: 'distance r (in units of r₀)' },
    y: { min: 0, max: 4.2, label: 'E / E₀' },
    functions: [{ expr: '1/x^2', label: 'point charge: E ∝ 1/r²', domain: [0.5, 4] }],
  },
  'Field strength of a point charge against distance: it falls as one over r squared, to a quarter when the distance doubles',
  'Doubling r divides E by 4; tripling r divides it by 9.',
);
export const dipolePlot = plot(
  {
    x: { min: 1.5, max: 6, label: 'r / a (distance in half-separations)' },
    y: { min: 0, max: 1.6, label: 'E (exact) / E (short-dipole formula)' },
    functions: [{ expr: 'x^4/(x^2 - 1)^2', label: 'axial point: exact ÷ approximate', domain: [1.5, 6] }],
    hlines: [{ y: 1, dashed: true }],
  },
  'Ratio of the exact axial field of a dipole to the short-dipole formula against distance: well above 1 close to the dipole, and within a few per cent of 1 once r is several times a',
  'The short-dipole result 2kp/r³ is reliable only when r ≫ a.',
);
const densTable = table(
  ['Density', 'Symbol and definition', 'SI unit'],
  [
    ['Linear', 'λ = dq/dl (charge per unit length)', 'C m⁻¹'],
    ['Surface', 'σ = dq/dA (charge per unit area)', 'C m⁻²'],
    ['Volume', 'ρ = dq/dV (charge per unit volume)', 'C m⁻³'],
  ],
  'Table of linear, surface and volume charge densities with their definitions and SI units',
);

export const deck1 = deck({
  part: 1,
  title: 'Electric Charges and Fields — Part 1: Charge, Coulomb’s law and the electric field',
  goals: [
    'Explain charging by friction, quantisation and conservation of charge',
    'Use Coulomb’s law in vacuum and in a medium, and add forces by superposition',
    'Calculate the electric field of point charges and define charge densities',
  ],
  slides: [
    sl('title', 'Electric Charges and Fields', {
      b: 'Part 1 — where electric charge comes from, how charges push and pull, and the field that carries the push.',
      v: V.forces,
      n: 'Pull a woollen jumper over your head on a dry winter evening and you hear crackles and may see tiny sparks. Those sparks come from electric charge moved from one material to another. In this part we look at what charge is, the law that gives the force between two charges, how several forces combine, and the idea of an electric field filling the space around a charge.',
    }),
    sl('concept', 'Frictional electricity', {
      b: 'Rubbing two different materials together transfers **electrons** from one to the other:',
      ul: ['The material that **gains** electrons becomes **negative**; the one that **loses** them becomes equally **positive**.', 'A glass rod rubbed with silk becomes positive; an ebonite rod rubbed with fur becomes negative.', 'Only electrons move: the positive nuclei stay fixed in the materials.'],
      v: V.forces,
      n: 'When two materials rub, electrons near the surface of one are held more loosely than in the other, and some cross over. Glass rubbed with silk loses electrons and becomes positive, while the silk becomes negative by exactly the same amount. Ebonite rubbed with fur gains electrons. Nothing is created: charge is only moved, and it is always the light electrons that move, never the nuclei.',
    }),
    sl('concept', 'Conductors, insulators and two kinds of charge', {
      b: 'Charges are of **two kinds**, positive and negative: like charges **repel**, unlike charges **attract**.',
      ul: ['**Conductors** (metals, the human body, salt water) have charges free to move through them.', '**Insulators** (glass, plastic, dry air) hold their charges in place where they are put.', 'A charged rod picks up bits of paper because it pulls their charges slightly apart (polarises them) and then attracts the nearer, opposite side.'],
      v: V.forces,
      n: 'There are only two kinds of charge. Two positive or two negative charges push apart; a positive and a negative pull together. In a metal, electrons wander freely, so charge spreads over it at once: a conductor. In plastic or glass, charge stays where it is rubbed on: an insulator. A charged comb attracts scraps of paper by separating their charges a little and pulling on the nearer, opposite side.',
    }),
    sl('concept', 'Quantisation and conservation of charge', {
      b: r`**Quantisation:** every charge is a whole-number multiple of the electronic charge,
$$q = n e,\qquad e = 1.6 \times 10^{-19}\ \text{C},\quad n = 0, \pm 1, \pm 2, \dots$$
**Conservation:** the total charge of an isolated system never changes; charge is only transferred.`,
      ul: ['Because e is tiny, everyday charges contain huge numbers of electrons, so charge seems continuous.', 'In pair production a photon becomes an electron and a positron: total charge stays zero.'],
      v: table(['Property', 'Meaning'], [['Quantised', 'q = n e, n an integer'], ['Conserved', 'Total charge of an isolated system is constant'], ['Additive', 'Total charge is the algebraic sum'], ['Invariant', 'Same in every frame of reference']], 'Table of four properties of charge: quantised, conserved, additive and invariant'),
      n: 'Charge comes in lumps. Every charge ever measured is a whole number times one point six times ten to the minus nineteen coulomb, the charge on an electron. A charge of a microcoulomb contains about six million million of these lumps, so in everyday life charge looks smooth. And charge is conserved: rubbing, reactions and even the creation of new particles always leave the total unchanged.',
    }),
    sl('example', 'Worked example 1: is that charge possible?', {
      b: r`(a) Can a body carry a charge of $2.4 \times 10^{-19}$ C? (b) A plastic rod gains a charge of $-3.2$ nC by rubbing. How many electrons did it gain?`,
      ul: [
        r`(a) $n = \dfrac{q}{e} = \dfrac{2.4 \times 10^{-19}}{1.6 \times 10^{-19}} = ${dec(ex1.n, 2)}$: not a whole number, so **impossible**.`,
        r`(b) $n = \dfrac{|q|}{e} = \dfrac{3.2 \times 10^{-9}}{1.6 \times 10^{-19}} = ${sci(ex1.N, 2)}$ electrons.`,
      ],
      v: table(['Charge', 'q/e', 'Possible?'], [['2.4 × 10⁻¹⁹ C', '1.5', 'No'], ['−3.2 nC', '−2.0 × 10¹⁰', 'Yes']], 'Worked table: 2.4 times ten to the minus nineteen coulomb is one and a half electronic charges, impossible; minus 3.2 nanocoulombs is twenty billion electrons'),
      n: 'Divide the charge by the electronic charge. Two point four times ten to the minus nineteen gives one and a half, and no object can carry half an electron’s charge, so that value is impossible. The rod’s charge of minus three point two nanocoulombs means it gained twenty billion extra electrons, a huge number, yet its mass changed by an amount far too small to weigh.',
    }),
    sl('check', 'Quick check: quantisation', {
      b: 'Choose the correct option.',
      v: null,
      chk: 'quant-mcq',
      n: 'Test each value: divide by the electronic charge and look for a whole number.',
    }),
    sl('concept', 'Coulomb’s law', {
      b: r`The force between two point charges is along the line joining them, proportional to the product of the charges and inversely proportional to the square of their separation:
$$F = \dfrac{1}{4\pi\varepsilon_0}\dfrac{q_1q_2}{r^2},\qquad \dfrac{1}{4\pi\varepsilon_0} = 9 \times 10^{9}\ \text{N m}^2\,\text{C}^{-2}$$`,
      ul: ['$\\varepsilon_0 = 8.85 \\times 10^{-12}$ C² N⁻¹ m⁻² is the **permittivity of free space**.', 'One **coulomb** is the charge that exerts $9 \\times 10^{9}$ N on an equal charge 1 m away in vacuum.', 'Vector form: $\\vec F_{12} = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{q_1q_2}{r^2}\\hat r_{12}$, where $\\hat r_{12}$ points from $q_1$ to $q_2$ (force on $q_2$).'],
      v: V.forces,
      n: 'Coulomb measured the force between small charged spheres with a delicate torsion balance. The force grows with each charge and falls off as the square of the distance, just like gravity. The constant one over four pi epsilon nought is nine times ten to the nine in SI units, so two charges of one coulomb a metre apart would push with nine billion newtons. Real charges are far smaller.',
    }),
    sl('two-column', 'In a medium, and compared with gravity', {
      b: r`In a medium of relative permittivity (dielectric constant) $K = \varepsilon/\varepsilon_0$, the force is reduced: $F_m = \dfrac{F_\text{vacuum}}{K}$.`,
      cols: [
        '**Coulomb force**\n- Acts between charges\n- Attractive or repulsive\n- Depends on the medium\n- Very strong',
        '**Gravitational force**\n- Acts between masses\n- Always attractive\n- Independent of the medium\n- Very weak',
      ],
      v: table(['Medium', 'K (approx.)'], [['Vacuum', '1'], ['Air', '1.0006'], ['Transformer oil', '2.5'], ['Glass', '5–10'], ['Water', '80']], 'Table of approximate dielectric constants: vacuum 1, air just above 1, transformer oil 2.5, glass 5 to 10, water 80'),
      n: 'Put the charges in oil or water and the force drops by the dielectric constant K, because the medium’s molecules line up and partly cancel the field. In water, with K about eighty, salts dissolve because the attraction between their ions is cut eighty times. Both Coulomb’s law and Newton’s law of gravitation are inverse-square laws, but the electric force can repel as well as attract and is enormously stronger.',
    }),
    sl('example', 'Worked example 2: in air and in oil', {
      b: r`Charges of $+2.0\ \mu$C and $-5.0\ \mu$C are 15 cm apart. Find the force between them in vacuum and in transformer oil ($K = 2.5$).`,
      ul: [
        r`Step 1 — $F = \dfrac{9 \times 10^{9} \times 2.0 \times 10^{-6} \times 5.0 \times 10^{-6}}{(0.15)^2} = ${dec(ex2.F, 2)}$ N, attractive.`,
        r`Step 2 — $F_m = \dfrac{F}{K} = \dfrac{${dec(ex2.F, 2)}}{2.5} = ${dec(ex2.Fm, 2)}$ N, still attractive.`,
      ],
      v: V.forces,
      n: 'Multiply nine times ten to the nine by the two charges, ten times ten to the minus twelve together, and divide by the square of point one five metre. The result is four newtons, an attraction because the charges are unlike. In the oil the force is divided by two point five, giving one point six newtons. The direction is unchanged; only the size falls.',
    }),
    sl('example', 'Worked example 3: electric versus gravitational force', {
      b: r`Compare the electrostatic repulsion and the gravitational attraction between two protons at any separation ($m_p = 1.67 \times 10^{-27}$ kg, $G = 6.67 \times 10^{-11}$ N m² kg⁻²).`,
      ul: [
        r`Step 1 — both forces are $\propto 1/r^2$, so $\dfrac{F_e}{F_g} = \dfrac{ke^2}{Gm_p^2}$, independent of $r$.`,
        r`Step 2 — $\dfrac{F_e}{F_g} = \dfrac{9 \times 10^{9} \times (1.6 \times 10^{-19})^2}{6.67 \times 10^{-11} \times (1.67 \times 10^{-27})^2} \approx ${sci(ex3.ratio, 2)}$.`,
      ],
      v: table(['Force between two protons', 'Ratio'], [['Electric : gravitational', `≈ ${sci(ex3.ratio, 2).replace(' \\times 10^{36}', ' × 10³⁶')}`]], 'Worked table: the electric repulsion between two protons is about 1.2 times ten to the thirty six times their gravitational attraction'),
      n: 'Since both forces fall off as the square of the distance, their ratio does not depend on how far apart the protons are. Putting in the numbers, the electric push is about a million million million million million million times the gravitational pull. Gravity matters for planets only because large bodies are almost exactly neutral, so their electric forces cancel.',
    }),
    sl('check', 'Quick check: Coulomb’s law', {
      b: 'Choose the correct option.',
      v: V.forces,
      chk: 'halve-mcq',
      n: 'Change each quantity in Coulomb’s law and see how the force responds.',
    }),
    sl('diagram', 'Superposition of forces', {
      b: 'The force between two charges is not affected by other charges nearby. The **net force** on a charge is the **vector sum** of the forces from all the others:',
      m: [r`\vec F_0 = \vec F_{01} + \vec F_{02} + \dots + \vec F_{0n}`],
      v: V.super,
      n: 'When several charges act on one charge, each pair interacts exactly as if the others were absent. To find the total, add the individual forces as vectors, taking account of their directions. For two forces at right angles, use Pythagoras for the size and a tangent for the direction. For more forces, resolve each into components along two axes and add the components.',
    }),
    sl('example', 'Worked example 4: resultant of two forces', {
      b: r`A charge $q_0 = +2\ \mu$C sits at O, with $q_1 = +3\ \mu$C 0.20 m above it and $q_2 = -4\ \mu$C 0.30 m to its right. Find the net force on $q_0$.`,
      ul: [
        r`Step 1 — $F_1 = \dfrac{9 \times 10^{9} \times 3 \times 10^{-6} \times 2 \times 10^{-6}}{(0.20)^2} = ${dec(ex4.F1, 3)}$ N, downwards (repulsion).`,
        r`Step 2 — $F_2 = \dfrac{9 \times 10^{9} \times 4 \times 10^{-6} \times 2 \times 10^{-6}}{(0.30)^2} = ${dec(ex4.F2, 2)}$ N, towards $q_2$ (attraction).`,
        r`Step 3 — $F = \sqrt{${dec(ex4.F1, 3)}^2 + ${dec(ex4.F2, 2)}^2} \approx ${dec(ex4.F, 3)}$ N at $\tan^{-1}\dfrac{1.35}{0.80} \approx ${dec(ex4.angle, 3)}°$ below the line OQ₂.`,
      ],
      v: V.super,
      n: 'The positive charge above pushes q nought straight down with one point three five newtons. The negative charge to the right pulls it sideways with point eight newton. These are at right angles, so the resultant is the square root of the sum of squares, about one point five seven newtons, pointing down and to the right at roughly fifty nine degrees below the horizontal line.',
    }),
    sl('concept', 'The electric field', {
      b: r`The **electric field** at a point is the force per unit positive test charge placed there:
$$\vec E = \lim_{q_0 \to 0}\dfrac{\vec F}{q_0},\qquad \text{unit N C}^{-1}\ (= \text{V m}^{-1})$$
Point charge: $E = \dfrac{1}{4\pi\varepsilon_0}\dfrac{q}{r^2}$, radially outward for $q > 0$. A charge $q$ in a field feels $\vec F = q\vec E$.`,
      ul: ['The test charge is kept tiny so that it does not disturb the charges producing the field.', 'Fields of several charges add as vectors (superposition).'],
      v: inverseSq,
      n: 'Instead of thinking of one charge reaching across space to push another, we say every charge sets up an electric field around it. The field at a point is the force a tiny positive test charge would feel there, per coulomb. For a point charge it falls off as one over r squared. Any charge placed in the field then feels a force q times E.',
    }),
    sl('example', 'Worked example 5: where is the field zero?', {
      b: r`Charges of $+8$ nC and $+2$ nC are 0.30 m apart. Find (a) the point between them where the field is zero, (b) the field at the midpoint.`,
      ul: [
        r`(a) At distance $x$ from the 8 nC charge: $\dfrac{8}{x^2} = \dfrac{2}{(0.30 - x)^2}$, so $\dfrac{0.30 - x}{x} = \dfrac{1}{2}$ and $x = ${dec(ex5.x, 2)}$ m.`,
        r`(b) $E = \dfrac{9 \times 10^{9}(8 - 2) \times 10^{-9}}{(0.15)^2} = ${dec(ex5.Emid, 2)}$ N C$^{-1}$, pointing away from the 8 nC charge.`,
      ],
      v: V.like,
      n: 'Between two positive charges their fields point in opposite directions, so somewhere they cancel. Setting the two field sizes equal and taking square roots, the neutral point is twice as far from the big charge as from the small one: twenty centimetres from the eight nanocoulomb charge. At the midpoint the bigger charge wins, leaving a net field of two thousand four hundred newtons per coulomb.',
    }),
    sl('concept', 'Charge densities', {
      b: 'For charge spread continuously over a body, we describe how densely it is spread:',
      v: densTable,
      ul: ['A wire 2.0 m long carrying 6.0 μC has λ = 3.0 μC m⁻¹ (if uniform).', 'The field of such a distribution is found by adding (integrating) the fields of tiny elements dq.'],
      n: 'A charged wire, plate or ball is made of so many charges that we treat the charge as spread smoothly. Along a wire we use the linear density lambda, charge per metre. Over a surface we use sigma, charge per square metre. Through a volume we use rho, charge per cubic metre. In the next chapter, Gauss’s theorem lets us find the fields of such distributions easily.',
    }),
    sl('check', 'Quick check: electric field', {
      b: 'Calculate the field.',
      v: inverseSq,
      chk: 'Epoint-num',
      n: 'Use the point-charge formula with the distance in metres.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Charging by friction', 'Electrons move from one material to the other'],
          ['Quantisation', '$q = n e$, $e = 1.6 \\times 10^{-19}$ C'],
          ['Coulomb’s law', '$F = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{q_1q_2}{r^2}$; in a medium $F/K$'],
          ['Superposition', 'Net force = vector sum of pair forces'],
          ['Electric field', '$\\vec E = \\vec F/q_0$; point charge $kq/r^2$'],
          ['Charge densities', 'λ (C m⁻¹), σ (C m⁻²), ρ (C m⁻³)'],
        ],
        'Summary table of charging by friction, quantisation, Coulomb’s law, superposition, the electric field and charge densities',
      ),
      n: 'To sum up: rubbing moves electrons, and charge is quantised and conserved. Coulomb’s law gives an inverse-square force, reduced by the dielectric constant in a medium and vastly stronger than gravity. Forces from several charges add as vectors. The electric field is force per unit test charge, k q over r squared for a point charge, and charge spread over bodies is described by line, surface and volume densities.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'Convert μC and nC to coulombs and cm to metres before substituting.',
        'In superposition problems draw a diagram with each force arrow, then add components.',
        'State directions: attraction or repulsion, and “away from” or “towards” for fields.',
        'For a null point between like charges, take square roots of the charges’ ratio.',
      ],
      v: table(['Asked', 'Key point'], [['Is 1.2 × 10⁻¹⁹ C possible?', 'No: not a multiple of e'], ['Force in water?', 'Divided by K ≈ 80'], ['Unit of E?', 'N C⁻¹ or V m⁻¹']], 'Table of common questions and the key point for each'),
      n: 'Most slips come from units, so convert micro and nano coulombs and centimetres before you start. In problems with several charges, sketch the forces first, then add components. Always state the direction of a force or field, not just its size. And when looking for a point of zero field between two like charges, taking the square root of their ratio gets you there quickly.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Electric Charges and Fields — Part 2: Field lines and the electric dipole',
  goals: [
    'State the properties of electric field lines and sketch standard patterns',
    'Derive the field of a dipole on its axial and equatorial lines',
    'Derive and use the torque on a dipole in a uniform field',
  ],
  slides: [
    sl('title', 'Field lines and dipoles', {
      b: 'Part 2 — drawing fields with lines, and the simplest charge arrangement that appears everywhere in chemistry and physics: the dipole.',
      v: V.dipole,
      n: 'Faraday pictured the space round charges as filled with lines of force, and the picture is still the best way to see a field. In this part we learn the rules those lines obey and the patterns they make. Then we study the electric dipole, a pair of equal and opposite charges, find its field along two special directions, and see how it behaves in a uniform field.',
    }),
    sl('concept', 'Properties of electric lines of force', {
      b: 'An electric line of force is a curve whose **tangent** at every point gives the direction of $\\vec E$ there.',
      ul: ['Lines start on **positive** charges and end on **negative** charges (or at infinity).', '**Two lines never intersect**: at a crossing the field would have two directions at once.', 'Lines are **closer together** where the field is **stronger**.', 'Electrostatic field lines **never form closed loops**, and they meet a conductor’s surface at right angles.'],
      v: V.pos,
      n: 'A line of force is drawn so that at every point its direction shows the way the field points. The rules are simple. Lines leave positive charges and arrive at negative ones. They never cross, because a field can point only one way at a point. Where lines crowd together the field is strong, and where they spread out it is weak. And electrostatic field lines never close on themselves.',
    }),
    sl('diagram', 'Patterns: point charges and parallel plates', {
      b: 'Standard patterns:',
      ul: ['Isolated positive charge: radial lines outward; negative charge: radial lines inward.', 'Two oppositely charged parallel plates: **straight, parallel, equally spaced** lines between them — a **uniform field** — with some bending (fringing) at the edges.'],
      v: V.neg,
      n: 'Round a single positive charge the lines spread straight outwards like spokes, and round a negative charge they point straight in. Between two large parallel plates with opposite charges, the lines run straight across from the positive plate to the negative one, evenly spaced: the field there is the same everywhere, a uniform field. Only near the edges do the lines bulge outwards.',
    }),
    sl('diagram', 'Patterns: a dipole and two like charges', {
      b: 'Two equal and opposite charges: lines curve from + to −. Two equal like charges: lines bend away from each other, leaving a **neutral point** midway where $E = 0$.',
      v: V.like,
      n: 'For a positive and a negative charge, lines leave the positive one and curve round to end on the negative one, crowded together between them. For two equal positive charges the lines from each are pushed away from the other, and right in the middle there is a point with no field at all, called the neutral point. A small test charge placed there would feel no force.',
    }),
    sl('check', 'Quick check: field lines', {
      b: 'Judge the assertion and the reason.',
      v: V.dipole,
      chk: 'cross-ar',
      n: 'What would it mean for the field if two lines crossed?',
    }),
    sl('concept', 'The electric dipole', {
      b: r`Two equal and opposite charges $+q$ and $-q$ a small distance $2a$ apart form an **electric dipole**. Its **dipole moment** is
$$\vec p = q \times 2a\,\hat p,\qquad \text{directed from } -q \text{ to } +q,\ \text{unit C m}$$`,
      ul: ['Net charge zero, yet it produces a field because the two charges are at different places.', 'Many molecules (H₂O, HCl) are permanent dipoles; others become dipoles in a field.'],
      v: V.dipole,
      n: 'An electric dipole is a pair of equal and opposite charges a small distance apart. Its strength is measured by the dipole moment, the charge times the separation, pointing from the negative charge to the positive one. A water molecule is a natural dipole, because its oxygen end is slightly negative and its hydrogen end slightly positive. The total charge is zero, but the field is not.',
    }),
    sl('diagram', 'Field on the axial line', {
      b: r`At P on the axis, distance $r$ from the centre: $E_+ = \dfrac{kq}{(r - a)^2}$ along $\vec p$, $E_- = \dfrac{kq}{(r + a)^2}$ opposite. So
$$E_\text{axial} = kq\left[\dfrac{1}{(r - a)^2} - \dfrac{1}{(r + a)^2}\right] = \dfrac{1}{4\pi\varepsilon_0}\dfrac{2pr}{(r^2 - a^2)^2}$$
For $r \gg a$: $E_\text{axial} = \dfrac{1}{4\pi\varepsilon_0}\dfrac{2p}{r^3}$, along $\vec p$.`,
      v: V.geom,
      n: 'At a point on the axis beyond the positive charge, the positive charge is nearer, so its outward field beats the inward field of the negative charge. Subtracting the two and simplifying gives two p r over the square of r squared minus a squared. Far away, a squared is negligible beside r squared and the field becomes two k p over r cubed, pointing along the dipole moment.',
    }),
    sl('diagram', 'Field on the equatorial line', {
      b: r`At Q on the perpendicular bisector, distance $r$: both fields have size $\dfrac{kq}{r^2 + a^2}$; their components along the bisector cancel and those parallel to the axis add:
$$E_\text{eq} = 2\dfrac{kq}{r^2 + a^2}\cdot\dfrac{a}{\sqrt{r^2 + a^2}} = \dfrac{1}{4\pi\varepsilon_0}\dfrac{p}{(r^2 + a^2)^{3/2}}$$
For $r \gg a$: $E_\text{eq} = \dfrac{1}{4\pi\varepsilon_0}\dfrac{p}{r^3}$, **opposite** to $\vec p$.`,
      v: V.geom,
      n: 'On the line perpendicular to the dipole through its centre, both charges are the same distance away, so their fields are equal in size. Their sideways parts cancel and their parts parallel to the axis add, pointing from plus towards minus. The result is p over the cube of root r squared plus a squared, which becomes k p over r cubed far away, opposite to p and half the axial value.',
    }),
    sl('example', 'Worked example 6: fields of a small dipole', {
      b: r`Charges of $\pm 5.0$ nC are 4.0 mm apart. Find the field 0.20 m from the centre (a) on the axis, (b) on the equatorial line.`,
      ul: [
        r`Step 1 — $p = 5.0 \times 10^{-9} \times 4.0 \times 10^{-3} = ${sci(ex6.p, 2)}$ C m; since $0.20 \gg 0.002$, use the short-dipole forms.`,
        r`(a) $E_\text{ax} = \dfrac{2kp}{r^3} = \dfrac{2 \times 9 \times 10^{9} \times ${sci(ex6.p, 2)}}{(0.20)^3} = ${dec(ex6.Eax, 2)}$ N C$^{-1}$, along $\vec p$.`,
        r`(b) $E_\text{eq} = \dfrac{kp}{r^3} = ${dec(ex6.Eeq, 3)}$ N C$^{-1}$, opposite to $\vec p$.`,
      ],
      v: V.geom,
      n: 'The dipole moment is the charge times the separation, two times ten to the minus eleven coulomb metre. The point is a hundred times farther than the half-separation, so the short-dipole formulas are fine. On the axis, two k p over r cubed gives forty five newtons per coulomb along p. On the equatorial line the field is exactly half, twenty two and a half, pointing the opposite way.',
    }),
    sl('example', 'Worked example 7: when is a dipole “short”?', {
      b: r`For charges $\pm 2.0$ nC 2.0 cm apart ($a = 1.0$ cm), compare the exact axial field at $r = 3.0$ cm with the short-dipole formula.`,
      ul: [
        r`Step 1 — $p = 2.0 \times 10^{-9} \times 0.020 = ${sci(ex7.p, 2)}$ C m.`,
        r`Step 2 — exact: $\dfrac{2kpr}{(r^2 - a^2)^2} = \dfrac{2 \times 9 \times 10^{9} \times ${sci(ex7.p, 2)} \times 0.030}{(0.0009 - 0.0001)^2} \approx ${sci(ex7.exact, 3)}$ N C$^{-1}$.`,
        r`Step 3 — short-dipole: $\dfrac{2kp}{r^3} \approx ${sci(ex7.short, 3)}$ N C$^{-1}$; the exact value is ${dec(ex7.ratio, 3)} times larger, so the approximation fails at $r = 3a$.`,
      ],
      v: dipolePlot,
      n: 'At only three times the half-separation, the exact axial field comes out about twenty seven per cent bigger than the short-dipole formula. The graph shows how the ratio approaches one as you move away: by about ten times a, the error is down to a couple of per cent. Use the simple formula only when the point is far from the dipole compared with its length.',
    }),
    sl('check', 'Quick check: axial and equatorial', {
      b: 'Choose the correct option.',
      v: V.geom,
      chk: 'ratio-mcq',
      n: 'Compare the short-dipole formulas for the two positions at equal distance.',
    }),
    sl('diagram', 'Dipole in a uniform field', {
      b: r`In a uniform field $\vec E$, the forces $+q\vec E$ and $-q\vec E$ are equal and opposite: **net force zero**, but they form a **couple**:
$$\tau = qE \times 2a\sin\theta = pE\sin\theta,\qquad \vec\tau = \vec p \times \vec E$$`,
      ul: ['The torque turns $\\vec p$ towards $\\vec E$; it is maximum ($pE$) at θ = 90° and zero at 0° and 180°.', 'In a **non-uniform** field there is also a net force, so the dipole moves as well as turns.'],
      v: V.torque,
      n: 'Put a dipole at an angle in a uniform field. The positive end is pushed along the field and the negative end the other way with an equal force, so the dipole as a whole does not move off. But the two forces act along different lines, forming a couple that twists the dipole towards the field direction. The torque is p E sine theta, the cross product of p and E.',
    }),
    sl('example', 'Worked example 8: twisting a dipole', {
      b: r`A dipole of charges $\pm 2.0\ \mu$C, 3.0 mm apart, is placed at 30° to a uniform field of $5.0 \times 10^{4}$ N C$^{-1}$. Find the torque on it and the maximum torque possible.`,
      ul: [
        r`Step 1 — $p = 2.0 \times 10^{-6} \times 3.0 \times 10^{-3} = ${sci(ex8.p, 2)}$ C m.`,
        r`Step 2 — $\tau = pE\sin 30° = ${sci(ex8.p, 2)} \times 5.0 \times 10^{4} \times 0.5 = ${sci(ex8.tau, 2)}$ N m.`,
        r`Step 3 — maximum at 90°: $\tau_\text{max} = pE = ${sci(ex8.max, 2)}$ N m.`,
      ],
      v: V.torque,
      n: 'First the dipole moment: two microcoulombs times three millimetres, six times ten to the minus nine coulomb metre. Multiply by the field and by sine thirty degrees, one half, to get a torque of one point five times ten to the minus four newton metre. Turned to ninety degrees, where the sine is one, the torque would double to three times ten to the minus four.',
    }),
    sl('check', 'Quick check: dipole in a uniform field', {
      b: 'Decide whether the statement is true or false.',
      v: V.torque,
      chk: 'uniform-tf',
      n: 'Add the two forces on the charges and compare their lines of action.',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Field lines', 'From + to −; never cross; denser where E is larger; no closed loops'],
          ['Dipole moment', '$\\vec p = q(2a)$, from −q to +q'],
          ['Axial field', '$\\dfrac{2pr}{4\\pi\\varepsilon_0(r^2 - a^2)^2} \\to \\dfrac{2p}{4\\pi\\varepsilon_0 r^3}$, along $\\vec p$'],
          ['Equatorial field', '$\\dfrac{p}{4\\pi\\varepsilon_0(r^2 + a^2)^{3/2}} \\to \\dfrac{p}{4\\pi\\varepsilon_0 r^3}$, opposite $\\vec p$'],
          ['Uniform field', 'Net force 0; $\\vec\\tau = \\vec p \\times \\vec E$'],
        ],
        'Summary table of field-line properties, dipole moment, axial and equatorial fields and the torque in a uniform field',
      ),
      n: 'To sum up: field lines run from positive to negative charges, never cross and crowd together where the field is strong. A dipole’s moment points from minus to plus. Far away its axial field, two k p over r cubed along p, is twice its equatorial field, which points opposite to p. In a uniform field a dipole feels no net force but a torque p cross E that lines it up with the field.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'Derivations: draw the dipole with −q, +q, $\\vec p$, the point and the separate fields before writing equations.',
        'Write the exact result first, then the approximation for $r \\gg a$.',
        'Torque: give both $\\tau = pE\\sin\\theta$ and $\\vec\\tau = \\vec p \\times \\vec E$, and state the zero net force.',
        'Field-line sketches: arrows on every line; none crossing.',
      ],
      v: table(['Asked', 'Key point'], [['Why do lines not cross?', 'Unique direction of E'], ['E_axial : E_eq (short dipole)?', '2 : 1'], ['When is τ maximum?', 'θ = 90°']], 'Table of common questions and the key point for each'),
      n: 'In the dipole derivations, a clear labelled diagram earns marks before any algebra. Always derive the exact expression and then show the approximation for a distant point. For the torque, mention that the net force is zero in a uniform field and give the vector form. And in field-line sketches, put arrows on every line and make sure no two lines ever cross.',
    }),
  ],
});
