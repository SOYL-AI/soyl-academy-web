// ch01 Electric Charges and Fields — two decks: Part 1 (t01–t02) charge, Coulomb's law, superposition, field and field
// lines; Part 2 (t03–t06) dipole, continuous charge, flux, Gauss's law and its applications.
// Every number in a worked example is computed here (EX), not typed.
import { sl, deck, table, flow, svgV, plot, r, K, sci, dec, sig } from './lib.mjs';
import * as G from './svgs.mjs';

// ---------------------------------------------------------------- worked-example numbers
const ex1 = (() => {
  const q1 = 3e-6;
  const q2 = -5e-6;
  const d = 0.15;
  const F = (K * Math.abs(q1 * q2)) / d ** 2;
  return { F, Fd: F / 4 };
})();
const ex2 = G.SUPER_DATA;
const ex3 = (() => {
  const q = 2e-6;
  const d = 0.2;
  const E1 = (K * q) / (d / 2) ** 2;
  return { E1, E: 2 * E1 };
})();
const ex4 = (() => {
  const q = 2e-9;
  const s = 4e-3;
  const p = q * s;
  const r0 = 0.2;
  const Eax = (2 * K * p) / r0 ** 3;
  const Eeq = (K * p) / r0 ** 3;
  return { p, Eax, Eeq };
})();
const ex5 = (() => {
  const q = 5e-6;
  const s = 2e-3;
  const p = q * s;
  const E = 2e5;
  const tau = p * E * Math.sin(Math.PI / 6);
  return { p, E, tau };
})();
const ex6 = (() => {
  const lam = 2e-6;
  const rr = 0.09;
  const E = (2 * K * lam) / rr;
  return { E };
})();
export const EX = { ex1, ex2, ex3, ex4, ex5, ex6 };

export const V = {
  forces: svgV(G.FORCES, 'Like charges repel and unlike charges attract, with equal and opposite forces along the line joining them'),
  super: svgV(G.SUPER, 'Worked example: two forces on q0, 0.40 newton downwards and 0.30 newton to the right, add to 0.50 newton', 'Forces drawn to scale (300 pixels per newton); the resultant is the diagonal of the rectangle.'),
  pos: svgV(G.LINES_POS, 'Radial field lines pointing outwards from a positive charge'),
  neg: svgV(G.LINES_NEG, 'Radial field lines pointing inwards to a negative charge'),
  dipoleLines: svgV(G.LINES_DIPOLE, 'Field lines of a dipole running from the positive to the negative charge', 'Traced numerically from Coulomb’s law; arrows checked against the computed field.'),
  likeLines: svgV(G.LINES_LIKE, 'Field lines of two equal positive charges with a neutral point midway', 'Traced numerically; no line passes through the neutral point N.'),
  dipoleGeom: svgV(G.DIPOLE_GEOM, 'Dipole with an axial point P and an equatorial point Q, showing the fields of each charge and the resultant'),
  torque: svgV(G.TORQUE, 'Dipole at angle theta in a uniform field with a couple of forces q E and minus q E'),
  flux: svgV(G.FLUX, 'Flat area in a uniform field, area vector at angle theta to the field'),
  gauss: svgV(G.GAUSS, 'Closed surface enclosing q1 and q2 with q3 outside'),
  gaussApps: svgV(G.GAUSS_APPS, 'Gaussian cylinder round a wire, pillbox through a sheet, and spheres inside and outside a shell'),
  continuous: svgV(G.CONTINUOUS, 'A small element dq of a charged line producing a field dE at point P'),
};

export const shellPlot = plot(
  {
    x: { min: 0, max: 4, label: 'r / R' },
    y: { min: 0, max: 1.2, label: 'E / (kq/R²)' },
    functions: [
      { expr: '0', label: 'inside: E = 0', domain: [0, 1] },
      { expr: '1/x^2', label: 'outside: E = kq/r²', domain: [1, 4] },
    ],
    vlines: [{ x: 1, label: 'r = R', dashed: true }],
  },
  'Graph of field against distance for a charged thin shell: zero for r less than R, jumping to k q over R squared at the surface and then falling as one over r squared',
  'Field of a uniformly charged thin spherical shell of radius R.',
);
export const wirePlot = plot(
  {
    x: { min: 0.25, max: 4, label: 'r (arbitrary units)' },
    y: { min: 0, max: 4.2, label: 'E (arbitrary units)' },
    functions: [
      { expr: '1/x', label: 'long wire: E ∝ 1/r' },
      { expr: '1/x^2', label: 'point charge: E ∝ 1/r²' },
      { expr: '1', label: 'plane sheet: E constant' },
    ],
  },
  'Field against distance: a point charge falls as one over r squared, a long wire as one over r, and an infinite sheet stays constant',
  'Same value at r = 1 for comparison.',
);

const propsTable = table(
  ['Property', 'What it means', 'Example'],
  [
    ['Two kinds', 'Positive and negative; like repel, unlike attract', 'Glass rubbed with silk is positive; the silk is negative'],
    ['Additivity', 'Total charge is the algebraic sum', '$+3\\,\\mu\\text{C}$, $-5\\,\\mu\\text{C}$ and $+1\\,\\mu\\text{C}$ give $-1\\,\\mu\\text{C}$'],
    ['Conservation', 'Charge is neither created nor destroyed in an isolated system', 'Rubbing only transfers electrons'],
    ['Quantisation', '$q = n e$, with $n$ an integer and $e = 1.6 \\times 10^{-19}$ C', 'No body carries $0.8 \\times 10^{-19}$ C'],
  ],
  'Table of the four basic properties of charge: two kinds, additivity, conservation and quantisation, with an example of each',
);

export const deck1 = deck({
  part: 1,
  title: 'Electric Charges and Fields — Part 1: Charge, Coulomb’s law and the electric field',
  goals: [
    'State the basic properties of electric charge and explain charging by induction',
    'Apply Coulomb’s law in vector form and the principle of superposition',
    'Calculate the electric field of a point charge and of a system of charges',
    'Sketch and interpret electric field-line patterns',
  ],
  slides: [
    sl('title', 'Electric Charges and Fields', {
      b: 'Part 1 — what charge is, how charges push and pull, and how the idea of a **field** describes that push and pull at every point in space.',
      v: flow('LR', [['c', 'Charge'], ['f', 'Coulomb force'], ['s', 'Superposition'], ['e', 'Electric field'], ['l', 'Field lines']], [['c', 'f'], ['f', 's'], ['s', 'e'], ['e', 'l']], 'Flow of the part: charge, Coulomb force, superposition, electric field, field lines'),
      n: 'Pull off a woollen sweater on a dry winter evening in Delhi and you hear crackles and may even see sparks. That is electrostatics at work. In this part we describe charge, find the force between charges with Coulomb’s law, add forces from many charges, and then replace the force picture with the idea of an electric field that exists at every point around a charge.',
    }),
    sl('concept', 'Properties of electric charge', {
      b: 'Charge is a basic property of matter, measured in **coulombs (C)**. Four properties matter for every problem in this chapter.',
      v: propsTable,
      n: 'There are two kinds of charge. Like charges repel and unlike charges attract. Charges add like ordinary numbers with signs, so a body with three positive and five negative units has two negative units in total. Charge is conserved: rubbing a rod only moves electrons from one body to the other. And charge comes in whole-number multiples of the electronic charge, which is about one point six times ten to the minus nineteen coulomb.',
    }),
    sl('concept', 'Quantisation in practice', {
      b: r`Since $q = n e$, the number of electrons transferred is $n = q/e$. A body charged to $-1.0\,\mu\text{C}$ has gained $n = \dfrac{1.0 \times 10^{-6}}{1.6 \times 10^{-19}} = 6.25 \times 10^{12}$ extra electrons.`,
      ul: [
        'Everyday charges are huge multiples of $e$, so charge looks continuous at the large scale.',
        'A positively charged body has **lost** electrons; its mass decreases very slightly.',
        'Quantisation matters at the atomic scale, for example in Millikan-style oil-drop experiments.',
      ],
      v: table(['Charge on body', 'Electrons gained or lost'], [['$-1.0\\,\\mu\\text{C}$', '$6.25 \\times 10^{12}$ gained'], ['$+3.2 \\times 10^{-18}$ C', '20 lost'], ['$+1.6 \\times 10^{-19}$ C', '1 lost']], 'Table of three charges and the number of electrons gained or lost: minus one microcoulomb is six point two five times ten to the twelve electrons gained'),
      n: 'To find how many electrons moved, divide the charge by the electronic charge. A body at minus one microcoulomb has gained more than six million million electrons. Numbers this large are why charge seems continuous in daily life. Remember the direction too: a positive body has lost electrons, a negative body has gained them. Protons do not move when we charge solids by rubbing.',
    }),
    sl('diagram', 'Charging by induction', {
      b: 'A charged rod can charge a neutral conductor **without touching it**. The induced charge is opposite in sign to the rod.',
      v: flow('LR', [['a', 'Bring a negative rod near a metal sphere'], ['b', 'Electrons pushed to the far side; near side becomes positive'], ['c', 'Earth the sphere: far-side electrons flow to earth'], ['d', 'Remove the earth wire, then the rod'], ['e', 'Sphere left positively charged, spread uniformly']], [['a', 'b'], ['b', 'c'], ['c', 'd'], ['d', 'e']], 'Five steps of charging a metal sphere by induction with a negative rod, ending with a positively charged sphere'),
      n: 'Bring a negatively charged rod close to an insulated metal sphere. The free electrons in the sphere are pushed to the far side, so the near side is left positive. Now connect the far side to earth: electrons flow away to the ground. Break the earth connection first, and only then take the rod away. The sphere keeps a positive charge, which spreads evenly over its surface. The order of the last two steps matters.',
    }),
    sl('check', 'Quick check: quantisation', {
      b: 'Which of these could be the charge on an oil drop?',
      v: null,
      chk: 'quant-mcq',
      n: 'Use quantisation. A possible charge must be a whole-number multiple of one point six times ten to the minus nineteen coulomb. Divide each option by that value and see which gives a whole number.',
    }),
    sl('concept', 'Coulomb’s law', {
      b: r`The force between two point charges $q_1$ and $q_2$ a distance $r$ apart in vacuum acts along the line joining them and has magnitude
$$F = \dfrac{1}{4\pi\varepsilon_0}\,\dfrac{|q_1 q_2|}{r^2} = k\,\dfrac{|q_1 q_2|}{r^2},\qquad k = 9 \times 10^{9}\ \text{N m}^2\,\text{C}^{-2}$$`,
      ul: ['$\\varepsilon_0 = 8.85 \\times 10^{-12}\\ \\text{C}^2\\,\\text{N}^{-1}\\,\\text{m}^{-2}$ is the permittivity of free space.', 'The forces on the two charges are equal and opposite (Newton’s third law).', 'Double the distance and the force becomes one quarter.'],
      v: V.forces,
      n: 'Coulomb found that the force between two small charged bodies is proportional to the product of the charges and inversely proportional to the square of the distance between them. The constant k is about nine times ten to the nine in SI units. The force acts along the line joining the charges, repulsive for like charges and attractive for unlike ones. Each charge pulls or pushes the other with the same size of force.',
    }),
    sl('two-column', 'Coulomb’s law in vector form and in a medium', {
      b: 'Directions matter, so write the law as a vector.',
      cols: [
        r`**Vector form**

Force on $q_2$ due to $q_1$:
$$\vec F_{21} = k\,\dfrac{q_1 q_2}{r^2}\,\hat r_{12}$$
where $\hat r_{12}$ is the unit vector **from $q_1$ to $q_2$**. If $q_1 q_2 > 0$ the force on $q_2$ points away from $q_1$ (repulsion); if $q_1 q_2 < 0$ it points towards $q_1$. Also $\vec F_{12} = -\vec F_{21}$.`,
        r`**In a medium**

In a medium of permittivity $\varepsilon = \varepsilon_0 \varepsilon_r$ (dielectric constant $\varepsilon_r$):
$$F_\text{medium} = \dfrac{F_\text{vacuum}}{\varepsilon_r}$$
Water has $\varepsilon_r \approx 80$, so ionic forces in water are about 80 times weaker — one reason salt dissolves.`,
      ],
      v: table(['Medium', 'Dielectric constant (approx.)', 'Force compared with vacuum'], [['Vacuum (air nearly)', '1', 'Same'], ['Glass', '5 to 10', '1/5 to 1/10'], ['Water', '80', '1/80']], 'Table of dielectric constants: vacuum 1, glass 5 to 10, water 80, and how much the force is reduced'),
      n: 'In vector form, the force on charge two points along the unit vector from charge one to charge two, multiplied by the product of the charges with their signs. A positive product gives repulsion and a negative product gives attraction, automatically. In a material medium the force is smaller by the dielectric constant. Water reduces the force about eighty times, which helps it pull salt crystals apart.',
    }),
    sl('example', 'Worked example 1: force between two charges', {
      b: r`Two small spheres carry $+3.0\,\mu\text{C}$ and $-5.0\,\mu\text{C}$ and are $15$ cm apart in air. Find the force between them. What is it if the distance is doubled?`,
      ul: [
        r`Step 1 — SI units: $q_1 = 3.0 \times 10^{-6}$ C, $q_2 = -5.0 \times 10^{-6}$ C, $r = 0.15$ m.`,
        r`Step 2 — $F = \dfrac{9 \times 10^{9} \times 3.0 \times 10^{-6} \times 5.0 \times 10^{-6}}{0.15^2} = ${dec(ex1.F, 2)}$ N.`,
        'Step 3 — unlike charges, so the force is **attractive**, along the line joining them.',
        r`Step 4 — doubling $r$ divides $F$ by 4: $F' = ${dec(ex1.Fd, 2)}$ N.`,
      ],
      v: table(['Quantity', 'Value'], [['$|q_1 q_2|$', '$1.5 \\times 10^{-11}\\ \\text{C}^2$'], ['$r^2$', '$0.0225\\ \\text{m}^2$'], ['$F$', `$${dec(ex1.F, 2)}$ N (attractive)`], ["$F'$ at 30 cm", `$${dec(ex1.Fd, 2)}$ N`]], 'Worked table: the product of charges, r squared, the force of six newtons and one point five newtons at double the distance'),
      n: 'Convert microcoulombs and centimetres to SI units first; this is where most marks are lost. Put the magnitudes into Coulomb’s law and get six newtons, a large force for such small charges. The signs tell you the direction: unlike charges attract. Doubling the distance makes the force a quarter, so one and a half newtons. Always state the direction as well as the size.',
    }),
    sl('check', 'Quick check: changing distance and charge', {
      b: 'Both charges are doubled and the distance between them is also doubled. What happens to the force?',
      v: null,
      chk: 'double-mcq',
      n: 'Think in ratios. Doubling both charges multiplies the product of the charges by four. Doubling the distance divides the force by four. Combine the two effects.',
    }),
    sl('diagram', 'Superposition of forces', {
      b: r`The force on a charge due to several others is the **vector sum** of the forces due to each one acting alone:
$$\vec F_0 = \vec F_{01} + \vec F_{02} + \dots + \vec F_{0n}$$
Each pair force follows Coulomb’s law and is unaffected by the other charges.`,
      v: V.super,
      n: 'When many charges act on one charge, work out each force separately as if the others were not there. Then add the forces as vectors, not as plain numbers. In the diagram, one force acts straight down and the other acts to the right, so the resultant is the diagonal of the rectangle they make. This principle of superposition is the key to every multi-charge problem.',
    }),
    sl('example', 'Worked example 2: resultant force on a charge', {
      b: r`$q_0 = +1.0\,\mu\text{C}$ is at O. $q_1 = +4.0\,\mu\text{C}$ is $0.30$ m above O and $q_2 = -3.0\,\mu\text{C}$ is $0.30$ m to the right of O. Find the net force on $q_0$.`,
      ul: [
        r`Step 1 — due to $q_1$ (repulsion, downwards): $F_1 = \dfrac{9 \times 10^{9} \times 4.0 \times 10^{-6} \times 1.0 \times 10^{-6}}{0.30^2} = ${dec(ex2.F1, 2)}$ N.`,
        r`Step 2 — due to $q_2$ (attraction, to the right): $F_2 = \dfrac{9 \times 10^{9} \times 3.0 \times 10^{-6} \times 1.0 \times 10^{-6}}{0.30^2} = ${dec(ex2.F2, 2)}$ N.`,
        r`Step 3 — perpendicular, so $F = \sqrt{0.40^2 + 0.30^2} = ${dec(ex2.F, 2)}$ N.`,
        r`Step 4 — direction: $\tan\theta = 0.40/0.30$, so $\theta \approx ${Math.round(ex2.angle)}^\circ$ below the line from O towards $q_2$.`,
      ],
      v: V.super,
      n: 'Find each force alone, with its direction from the signs. The four microcoulomb charge pushes the test charge downwards with zero point four newton. The negative charge pulls it to the right with zero point three newton. These two are at right angles, so use Pythagoras to get zero point five newton, and the tangent of the angle to get about fifty three degrees below the horizontal line.',
    }),
    sl('concept', 'The electric field', {
      b: r`The **electric field** at a point is the force per unit positive test charge placed there:
$$\vec E = \lim_{q_0 \to 0}\dfrac{\vec F}{q_0}, \qquad \text{unit N C}^{-1}$$
For a point charge $q$: $\;\vec E = k\,\dfrac{q}{r^2}\,\hat r$, pointing away from $q$ if $q > 0$ and towards it if $q < 0$.`,
      ul: ['The test charge is kept tiny so it does not disturb the charges that produce the field.', 'Once $\\vec E$ is known, the force on any charge $q$ placed there is $\\vec F = q\\vec E$.', 'A negative charge feels a force opposite to $\\vec E$.'],
      v: V.pos,
      n: 'Instead of asking what force one charge puts on another, we say a charge sets up an electric field all around it. The field at a point is the force that a tiny positive test charge would feel there, divided by its charge. For a point charge the field falls off as one over r squared and points radially outward for a positive charge. Then any charge placed there feels a force equal to charge times field.',
    }),
    sl('diagram', 'Field lines of single charges', {
      b: 'A **field line** is a curve whose tangent at each point gives the direction of $\\vec E$ there.',
      ul: ['Positive charge: lines point radially **outwards**.', 'Negative charge: lines point radially **inwards**.', 'Lines are crowded near the charge, where the field is strong.'],
      v: V.neg,
      n: 'Field lines are a picture of the field. Draw them leaving a positive charge and entering a negative charge. Where lines are close together the field is strong, and where they spread apart it is weak. For a single charge the lines are straight and radial, and the number of lines crossing a sphere round the charge is the same whatever the radius, which matches the inverse square law.',
    }),
    sl('example', 'Worked example 3: field of two charges', {
      b: r`Charges $+2.0\,\mu\text{C}$ and $-2.0\,\mu\text{C}$ are $20$ cm apart. Find the field at the midpoint M.`,
      ul: [
        r`Step 1 — each charge is $0.10$ m from M: $E_1 = \dfrac{9 \times 10^{9} \times 2.0 \times 10^{-6}}{0.10^2} = ${sci(ex3.E1, 2)}$ N C$^{-1}$.`,
        'Step 2 — directions: the field of $+q$ points away from it, towards $-q$; the field of $-q$ points towards $-q$. **Both point the same way.**',
        r`Step 3 — add: $E = 2 \times 1.8 \times 10^{6} = ${sci(ex3.E, 2)}$ N C$^{-1}$, from the positive towards the negative charge.`,
      ],
      v: V.dipoleLines,
      n: 'At the midpoint each charge is ten centimetres away, so each gives one point eight times ten to the six newtons per coulomb. Now look at directions. The positive charge’s field points away from it, which is towards the negative charge. The negative charge’s field points towards itself. Both are in the same direction, so they add to three point six million newtons per coulomb, pointing from plus to minus.',
    }),
    sl('diagram', 'Field lines of a pair of charges', {
      b: 'For two equal **like** charges the lines bend away from each other. Midway between them the two fields cancel: this is a **neutral point**, where no field line passes.',
      v: V.likeLines,
      n: 'Compare this picture with the dipole on the previous slide. With two equal positive charges, lines from each charge are pushed away from the other, and no line crosses the region between them. Exactly midway the two fields are equal and opposite, so the field is zero. A charge placed at this neutral point feels no force. Far away the pattern looks like that of a single charge of two q.',
    }),
    sl('concept', 'Properties of electric field lines', {
      b: 'Rules worth memorising for sketches and one-mark questions:',
      ul: [
        'Start on positive charges and end on negative charges (or go to or come from infinity).',
        'Never cross: at a crossing the field would have two directions at one point.',
        'Electrostatic field lines never form closed loops (the field is conservative).',
        'Crowded lines mean a strong field; evenly spaced parallel lines mean a uniform field.',
        'Lines meet the surface of a conductor at right angles.',
      ],
      v: table(['Pattern', 'What it tells you'], [['Parallel, equally spaced', 'Uniform field (same size and direction)'], ['Lines spreading out', 'Field getting weaker'], ['No lines in a region', 'Field zero there (for example a neutral point)']], 'Table linking field-line patterns to the field: parallel equally spaced lines mean a uniform field, spreading lines a weakening field, no lines a zero field'),
      n: 'Field lines follow a short list of rules. They begin on positive charges and end on negative charges. They never cross, because the field at any point has only one direction. Electrostatic field lines never close on themselves. Their crowding shows the strength of the field, and parallel, equally spaced lines show a uniform field, like the one between two large charged plates.',
    }),
    sl('check', 'Quick check: field lines', {
      b: 'Decide whether the statement is true or false.',
      v: null,
      chk: 'cross-tf',
      n: 'Use the definition of a field line: its tangent gives the direction of the field at each point. Ask what a crossing would mean for the field at that point.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Quantisation', '$q = n e$, $e = 1.6 \\times 10^{-19}$ C'],
          ['Coulomb’s law', '$F = k\\dfrac{|q_1 q_2|}{r^2}$, $k = 9 \\times 10^{9}\\ \\text{N m}^2\\,\\text{C}^{-2}$'],
          ['In a medium', '$F = F_0/\\varepsilon_r$'],
          ['Superposition', 'Add forces (or fields) as vectors'],
          ['Field of a point charge', '$E = k\\dfrac{q}{r^2}$, radial'],
          ['Force from field', '$\\vec F = q\\vec E$'],
        ],
        'Summary table of quantisation, Coulomb’s law, the medium rule, superposition, the field of a point charge and force from field',
      ),
      n: 'To sum up: charge is quantised and conserved, and like charges repel. Coulomb’s law gives the force between point charges, weakened in a medium by the dielectric constant. Forces and fields from many charges add as vectors. A point charge has a radial field that falls off as one over r squared, and field lines give a picture of the field’s direction and strength.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'Convert $\\mu$C, nC and cm to C and m **before** substituting.',
        'Use magnitudes in Coulomb’s law; decide the direction from the signs and draw it.',
        'For superposition, draw every force (or field) vector on a diagram first; add components.',
        'Field-line sketches: arrows on every line, lines never cross, more lines near larger charges.',
        'For a neutral point between **like** charges look between them; between **unlike** charges look outside, near the smaller one.',
      ],
      v: table(['Common slip', 'Fix'], [['Adding forces as numbers', 'Add as vectors'], ['Forgetting to square r', 'Write $r^2$ in the formula line'], ['Arrows missing on field lines', 'Every line needs an arrow']], 'Table of common slips and fixes: add as vectors, square r, put arrows on field lines'),
      n: 'Most lost marks in this part come from units and directions. Convert everything to coulombs and metres first. Put magnitudes into the formula and decide directions from the signs, drawing a clear diagram. When there are several charges, add vectors by components. In field-line sketches, remember the arrows and never let lines cross. For neutral points, think about where the two fields can point opposite ways.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Electric Charges and Fields — Part 2: Dipoles, flux and Gauss’s law',
  goals: [
    'Find the field of a dipole on its axis and on its equatorial line',
    'Calculate the torque on a dipole in a uniform field',
    'Describe continuous charge distributions with λ, σ and ρ',
    'Define electric flux, state Gauss’s law and use it to find the field of a wire, a sheet and a shell',
  ],
  slides: [
    sl('title', 'Dipoles, flux and Gauss’s law', {
      b: 'Part 2 — a pair of opposite charges, charge spread over lines and surfaces, and a powerful law that turns hard integrals into one-line results.',
      v: flow('LR', [['d', 'Electric dipole'], ['t', 'Torque in a field'], ['c', 'Continuous charge'], ['f', 'Flux'], ['g', 'Gauss’s law'], ['a', 'Wire, sheet, shell']], [['d', 't'], ['t', 'c'], ['c', 'f'], ['f', 'g'], ['g', 'a']], 'Flow of the part: dipole, torque, continuous charge, flux, Gauss’s law and its three applications'),
      n: 'Many molecules, such as water, behave like a tiny pair of opposite charges called a dipole. We will find the field of a dipole and the turning effect a field has on it, which is how a microwave oven shakes water molecules. Then we move to charge spread over lines and surfaces, define electric flux, and use Gauss’s law to find fields of wires, sheets and shells in a few lines.',
    }),
    sl('concept', 'The electric dipole', {
      b: r`Two equal and opposite charges $\pm q$ separated by $2a$ form an **electric dipole**. Its **dipole moment** is
$$\vec p = q \times 2a\,\hat p, \qquad \text{unit C m},$$
directed from $-q$ to $+q$. The total charge is zero, but the field is not.`,
      ul: ['Polar molecules (H₂O, HCl) have permanent dipole moments.', 'Non-polar molecules get an **induced** dipole moment in an external field.', 'A point dipole: $2a \\to 0$, $q \\to \\infty$ with $p$ fixed.'],
      v: V.dipoleGeom,
      n: 'A dipole is a positive and a negative charge of the same size, held a small distance apart. Its strength is measured by the dipole moment, the charge times the separation, pointing from the negative to the positive charge. Even though the total charge is zero, the two charges are at different places, so their fields do not cancel. Water molecules are natural dipoles, which explains many of water’s properties.',
    }),
    sl('two-column', 'Field of a dipole: axis and equatorial line', {
      b: 'Let the point be at distance $r$ from the centre of the dipole.',
      cols: [
        r`**On the axis** (P)
$$E_\text{axis} = \dfrac{1}{4\pi\varepsilon_0}\,\dfrac{2pr}{(r^2 - a^2)^2} \approx \dfrac{1}{4\pi\varepsilon_0}\,\dfrac{2p}{r^3}$$
for $r \gg a$; direction **along** $\vec p$.

The nearer charge ($+q$ for P beyond $+q$) gives the larger field.`,
        r`**On the equatorial line** (Q)
$$E_\text{eq} = \dfrac{1}{4\pi\varepsilon_0}\,\dfrac{p}{(r^2 + a^2)^{3/2}} \approx \dfrac{1}{4\pi\varepsilon_0}\,\dfrac{p}{r^3}$$
for $r \gg a$; direction **opposite** to $\vec p$.

The components along the bisector cancel; those parallel to the axis add.`,
      ],
      v: V.dipoleGeom,
      n: 'On the axis, the two charges are at different distances, so their fields do not cancel. The difference gives two p r over the square of r squared minus a squared, which becomes two p over r cubed far away, along the dipole moment. On the equatorial line, both charges are at the same distance. The sideways parts cancel and the parts parallel to the axis add, giving p over r cubed far away, opposite to the dipole moment.',
    }),
    sl('concept', 'Deriving the axial field', {
      b: r`At P on the axis, distance $r$ from the centre (beyond $+q$):`,
      m: [
        r`E_{+q} = \dfrac{1}{4\pi\varepsilon_0}\,\dfrac{q}{(r-a)^2}\ \text{(along } \hat p\text{)}, \qquad E_{-q} = \dfrac{1}{4\pi\varepsilon_0}\,\dfrac{q}{(r+a)^2}\ \text{(against } \hat p\text{)}`,
        r`E = \dfrac{q}{4\pi\varepsilon_0}\left[\dfrac{1}{(r-a)^2} - \dfrac{1}{(r+a)^2}\right] = \dfrac{q}{4\pi\varepsilon_0}\,\dfrac{4ar}{(r^2-a^2)^2} = \dfrac{1}{4\pi\varepsilon_0}\,\dfrac{2pr}{(r^2-a^2)^2}`,
      ],
      ul: ['Far away ($r \\gg a$): $E \\approx \\dfrac{2p}{4\\pi\\varepsilon_0 r^3}$.', 'The dipole field falls as $1/r^3$, faster than the $1/r^2$ of a single charge.'],
      v: null,
      n: 'This derivation is a favourite board question. Write the field of each charge at P with its direction. The positive charge is nearer, so its field is larger and points along the dipole moment. Subtract the two, combine the fractions, and use p equals q times two a. For a far point drop a squared next to r squared. Notice the one over r cubed: the two charges nearly cancel, so the field dies away faster.',
    }),
    sl('example', 'Worked example 4: field of a small dipole', {
      b: r`Charges $\pm 2.0$ nC are $4.0$ mm apart. Find the dipole moment and the field $20$ cm from the centre (a) on the axis, (b) on the equatorial line.`,
      ul: [
        r`Step 1 — $p = q \times 2a = 2.0 \times 10^{-9} \times 4.0 \times 10^{-3} = ${sci(ex4.p, 2)}$ C m.`,
        r`Step 2 — $r = 0.20$ m $\gg a$, so use the short-dipole results.`,
        r`Step 3 — axis: $E = \dfrac{2 \times 9 \times 10^{9} \times 8.0 \times 10^{-12}}{0.20^3} = ${dec(ex4.Eax, 2)}$ N C$^{-1}$, along $\vec p$.`,
        r`Step 4 — equator: $E = \dfrac{9 \times 10^{9} \times 8.0 \times 10^{-12}}{0.20^3} = ${dec(ex4.Eeq, 2)}$ N C$^{-1}$, opposite to $\vec p$.`,
      ],
      v: table(['Point (r = 20 cm)', 'Field', 'Direction'], [['Axis', `$${dec(ex4.Eax, 2)}$ N C$^{-1}$`, 'Along $\\vec p$'], ['Equatorial line', `$${dec(ex4.Eeq, 2)}$ N C$^{-1}$`, 'Opposite to $\\vec p$']], 'Worked table: eighteen newtons per coulomb on the axis along p and nine on the equatorial line opposite to p'),
      n: 'First get the dipole moment: two nanocoulombs times four millimetres, which is eight times ten to the minus twelve coulomb metre. Twenty centimetres is fifty times the separation, so the short-dipole formulas are fine. On the axis the field is eighteen newtons per coulomb along p. On the equatorial line it is exactly half, nine, and points the other way. That factor of two is a common one-mark question.',
    }),
    sl('check', 'Quick check: dipole field ratio', {
      b: 'Compare the axial and equatorial fields of a short dipole at the same large distance.',
      v: table(['Point', 'Short-dipole field'], [['Axis', '$2kp/r^3$'], ['Equatorial line', '$kp/r^3$']], 'Reminder table of the short-dipole fields on the axis and on the equatorial line'),
      chk: 'ratio-mcq',
      n: 'Compare the two formulas in the table at the same distance. Then think about what happens when the distance is doubled for either point.',
    }),
    sl('diagram', 'Dipole in a uniform field', {
      b: r`In a uniform field the forces $+q\vec E$ and $-q\vec E$ are equal and opposite: **net force zero**. They form a couple with torque
$$\vec\tau = \vec p \times \vec E, \qquad \tau = pE\sin\theta$$`,
      ul: ['$\\theta = 0^\\circ$: $\\tau = 0$, **stable** equilibrium (p along E).', '$\\theta = 180^\\circ$: $\\tau = 0$, **unstable** equilibrium.', '$\\theta = 90^\\circ$: torque is maximum, $pE$.', 'In a **non-uniform** field there is also a net force.'],
      v: V.torque,
      n: 'Put a dipole in a uniform field. The positive end is pushed along the field and the negative end the opposite way, with forces of the same size. So the dipole does not move as a whole, but it turns. The torque is p E sine theta, and it tries to line the dipole up with the field. Aligned with the field it is stable; pointing exactly against the field it is balanced but unstable.',
    }),
    sl('example', 'Worked example 5: torque on a dipole', {
      b: r`A dipole of charges $\pm 5.0\,\mu\text{C}$ separated by $2.0$ mm is placed at $30^\circ$ to a uniform field of $2.0 \times 10^{5}$ N C$^{-1}$. Find the torque. At what angle is the torque largest?`,
      ul: [
        r`Step 1 — $p = 5.0 \times 10^{-6} \times 2.0 \times 10^{-3} = ${sci(ex5.p, 2)}$ C m.`,
        r`Step 2 — $\tau = pE\sin 30^\circ = 1.0 \times 10^{-8} \times 2.0 \times 10^{5} \times 0.5 = ${sci(ex5.tau, 2)}$ N m.`,
        r`Step 3 — largest at $90^\circ$: $\tau_\text{max} = pE = ${sci(ex5.p * ex5.E, 2)}$ N m.`,
        'Check — the net force is zero because the field is uniform.',
      ],
      v: V.torque,
      n: 'Find the dipole moment: five microcoulombs times two millimetres gives one times ten to the minus eight coulomb metre. Multiply by the field and by sine thirty degrees, which is one half, to get one times ten to the minus three newton metre. The torque is largest when the dipole is at right angles to the field, and then it is double this value. The field is uniform, so the net force is zero.',
    }),
    sl('concept', 'Continuous charge distributions', {
      b: 'When charge is spread out, divide it into small elements $dq$, use the point-charge field for each, and add (integrate) the vectors:',
      m: [r`\vec E = \dfrac{1}{4\pi\varepsilon_0}\int \dfrac{dq}{r^2}\,\hat r`],
      v: table(
        ['Distribution', 'Density', 'Element', 'SI unit'],
        [
          ['Along a line', '$\\lambda = \\dfrac{\\Delta q}{\\Delta l}$', '$dq = \\lambda\\,dl$', 'C m$^{-1}$'],
          ['Over a surface', '$\\sigma = \\dfrac{\\Delta q}{\\Delta S}$', '$dq = \\sigma\\,dS$', 'C m$^{-2}$'],
          ['Through a volume', '$\\rho = \\dfrac{\\Delta q}{\\Delta V}$', '$dq = \\rho\\,dV$', 'C m$^{-3}$'],
        ],
        'Table of linear, surface and volume charge density with their elements and SI units',
      ),
      n: 'Real charged objects are not points. Charge on a wire is described by a linear charge density, lambda, in coulombs per metre. Charge on a sheet uses a surface density, sigma, and charge in a volume uses rho. To find the field, split the object into tiny pieces, treat each piece as a point charge, and add all their fields as vectors. For symmetric shapes, Gauss’s law does this much faster.',
    }),
    sl('diagram', 'Setting up the field of a charged line', {
      b: 'Each element $dq = \\lambda\\,dl$ gives $d\\vec E = \\dfrac{1}{4\\pi\\varepsilon_0}\\dfrac{\\lambda\\,dl}{r^2}\\hat r$ at P, along the line from the element to P. Different elements give different directions, so add components.',
      v: V.continuous,
      n: 'Here is how the set-up looks for a charged line. Pick a small piece of length d l, with charge lambda d l. It acts like a point charge, giving a small field at P along the line joining them. Every piece is at a different distance and direction, so you add components. The board syllabus asks you to set up this sum, not to evaluate hard integrals.',
    }),
    sl('concept', 'Electric flux', {
      b: r`Flux measures how much field passes through a surface. For a small area $\Delta \vec S$ (vector normal to the area):
$$\Delta\phi = \vec E \cdot \Delta\vec S = E\,\Delta S\cos\theta, \qquad \phi = \oint \vec E \cdot d\vec S \ \text{(closed surface)}$$
Unit: N m² C$^{-1}$ (or V m). Flux is a **scalar**.`,
      ul: ['$\\theta = 0^\\circ$: flux maximum, $E\\Delta S$.', '$\\theta = 90^\\circ$: field along the surface, flux zero.', 'For a closed surface, outward normals are positive: flux out is positive, flux in is negative.'],
      v: V.flux,
      n: 'Electric flux is like the amount of field that passes through a surface. Represent a small area by a vector at right angles to it. Flux is the dot product of the field and this area vector, E delta S cos theta. Face the area straight into the field and the flux is largest. Tilt it until the field runs along the surface and the flux is zero. For closed surfaces we always take the outward normal.',
    }),
    sl('concept', 'Gauss’s law', {
      b: r`The total flux through **any closed surface** equals the net charge enclosed divided by $\varepsilon_0$:
$$\oint_S \vec E \cdot d\vec S = \dfrac{q_\text{enc}}{\varepsilon_0}$$`,
      ul: [
        'Holds for any shape and size of closed surface.',
        '$\\vec E$ on the surface is due to **all** charges, inside and outside; but only enclosed charge gives net flux.',
        'Choose a Gaussian surface through the point where you want $\\vec E$, matching the symmetry; it should not pass through a point charge.',
      ],
      v: V.gauss,
      n: 'Gauss’s law links flux and charge. Draw any closed surface. The total outward flux through it equals the charge inside divided by epsilon nought. Charges outside change the field on the surface, but every line from an outside charge that enters also leaves, so their net flux is zero. The law is always true, but it is useful for finding the field only when symmetry makes the field constant over the surface.',
    }),
    sl('check', 'Quick check: flux through a closed surface', {
      b: 'A charge sits at the centre of a cube. Find the flux through one face.',
      v: V.gauss,
      chk: 'cube-num',
      n: 'Use Gauss’s law for the whole cube first. Then use symmetry: the charge is at the centre, so every face is equivalent.',
    }),
    sl('diagram', 'Choosing Gaussian surfaces', {
      b: 'Pick the surface so that on each part $\\vec E$ is either **parallel** to $d\\vec S$ with constant size, or **perpendicular** to it (no flux).',
      v: V.gaussApps,
      n: 'The art of Gauss’s law is choosing the surface. For a long straight wire, use a cylinder around it: the field is radial, so only the curved side has flux. For a large flat sheet, use a pillbox crossing the sheet: the field is perpendicular to the sheet, so only the two flat ends have flux. For a spherical shell, use a concentric sphere: the field is radial and the same everywhere on it.',
    }),
    sl('two-column', 'Field of a long wire and of a plane sheet', {
      b: 'Gauss’s law with the surfaces from the previous slide:',
      cols: [
        r`**Infinitely long straight wire** (charge per length $\lambda$), cylinder radius $r$, length $l$:
$$E \cdot 2\pi r l = \dfrac{\lambda l}{\varepsilon_0} \ \Rightarrow\ E = \dfrac{\lambda}{2\pi\varepsilon_0 r}$$
Radially outward for $\lambda > 0$; $E \propto 1/r$.`,
        r`**Infinite plane sheet** (charge per area $\sigma$), pillbox with end area $A$:
$$2EA = \dfrac{\sigma A}{\varepsilon_0} \ \Rightarrow\ E = \dfrac{\sigma}{2\varepsilon_0}$$
Perpendicular to the sheet, away from it for $\sigma > 0$; **independent of distance**.`,
      ],
      v: wirePlot,
      n: 'For the wire, the flux through the curved side is E times two pi r l, and the charge inside is lambda l. So the field is lambda over two pi epsilon nought r, falling as one over r. For the sheet, flux leaves through both ends, two E A, and the charge inside is sigma A. So the field is sigma over two epsilon nought, the same at every distance. The graph compares these with a point charge.',
    }),
    sl('concept', 'Field of a uniformly charged thin spherical shell', {
      b: r`Shell of radius $R$ and charge $q$ ($\sigma = q/4\pi R^2$). Use a concentric Gaussian sphere of radius $r$:`,
      ul: [
        r`**Outside** ($r > R$): $E \cdot 4\pi r^2 = \dfrac{q}{\varepsilon_0}$, so $E = \dfrac{1}{4\pi\varepsilon_0}\dfrac{q}{r^2}$ — as if all the charge were at the centre.`,
        r`**On the surface** ($r = R$): $E = \dfrac{q}{4\pi\varepsilon_0 R^2} = \dfrac{\sigma}{\varepsilon_0}$.`,
        r`**Inside** ($r < R$): no charge is enclosed, so $E = 0$ everywhere inside.`,
      ],
      v: shellPlot,
      n: 'For a thin shell, draw a sphere of radius r with the same centre. Outside the shell the sphere encloses all the charge, so the field is exactly that of a point charge at the centre. Inside the shell the sphere encloses no charge, and by symmetry the field must be zero everywhere inside. The graph shows the field jumping from zero to its largest value at the surface and then falling as one over r squared.',
    }),
    sl('example', 'Worked example 6: field near a charged wire', {
      b: r`A long straight wire carries $2.0\,\mu\text{C}$ per metre. Find the field $9.0$ cm from it. At what distance is the field half as large?`,
      ul: [
        r`Step 1 — $E = \dfrac{\lambda}{2\pi\varepsilon_0 r} = \dfrac{2k\lambda}{r}$, since $\dfrac{1}{2\pi\varepsilon_0} = 2k$.`,
        r`Step 2 — $E = \dfrac{2 \times 9 \times 10^{9} \times 2.0 \times 10^{-6}}{0.090} = ${sci(ex6.E, 2)}$ N C$^{-1}$, radially outward.`,
        'Step 3 — $E \\propto 1/r$, so the field halves at double the distance: **18 cm**.',
      ],
      v: wirePlot,
      n: 'A neat trick: one over two pi epsilon nought equals two k, so you can reuse nine times ten to the nine. Put in two microcoulombs per metre and nine centimetres to get four times ten to the five newtons per coulomb, pointing away from the wire. The field of a wire falls as one over r, not one over r squared, so it halves at twice the distance, eighteen centimetres.',
    }),
    sl('check', 'Quick check: inside a shell', {
      b: 'Judge the assertion and the reason about a charged shell.',
      v: shellPlot,
      chk: 'shell-ar',
      n: 'Recall the Gaussian sphere drawn inside the shell. What charge does it enclose, and what does symmetry say about the field on it?',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['System', 'Field'],
        [
          ['Short dipole, axis', '$\\dfrac{2kp}{r^3}$ along $\\vec p$'],
          ['Short dipole, equatorial line', '$\\dfrac{kp}{r^3}$ opposite to $\\vec p$'],
          ['Dipole in uniform field', '$\\vec\\tau = \\vec p \\times \\vec E$, net force 0'],
          ['Gauss’s law', '$\\oint \\vec E\\cdot d\\vec S = q_\\text{enc}/\\varepsilon_0$'],
          ['Long wire', '$\\dfrac{\\lambda}{2\\pi\\varepsilon_0 r}$'],
          ['Plane sheet', '$\\dfrac{\\sigma}{2\\varepsilon_0}$'],
          ['Thin shell', '$\\dfrac{kq}{r^2}$ outside, 0 inside'],
        ],
        'Summary table of dipole fields, torque on a dipole, Gauss’s law and the fields of a wire, a sheet and a shell',
      ),
      n: 'To sum up: a dipole’s field falls as one over r cubed, twice as strong on the axis as on the equatorial line. In a uniform field a dipole feels a torque but no net force. Flux is E dot d S, and Gauss’s law says the total flux out of a closed surface is the enclosed charge over epsilon nought. With symmetry it gives the fields of a wire, a sheet and a shell.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'Derivations: draw the figure, mark both fields with directions, then combine; state the $r \\gg a$ approximation.',
        'Gauss’s law answers: name the Gaussian surface, say where the flux is zero and why, then write the one-line result.',
        'Flux through a closed surface depends only on the charge inside, not on its shape or the position of the charge inside.',
        'Dipole direction: from $-q$ to $+q$. Stable when $\\vec p$ is along $\\vec E$.',
      ],
      v: table(['Asked', 'Write'], [['Field of a sheet', 'Pillbox, flux through 2 ends: $E = \\sigma/2\\varepsilon_0$'], ['Field inside a shell', 'Gaussian sphere encloses 0 charge: $E = 0$'], ['Torque on a dipole', '$\\tau = pE\\sin\\theta$, max at $90^\\circ$']], 'Table of quick answer patterns: sheet, inside a shell and torque on a dipole'),
      n: 'In derivations, examiners give marks for a clear diagram, the direction of each field, the combination step and the far-field approximation. In Gauss’s law answers, always name the surface and explain why some parts carry no flux. Remember that flux through a closed surface depends only on the enclosed charge. And keep the dipole direction straight: from minus to plus, stable when it points along the field.',
    }),
  ],
});
