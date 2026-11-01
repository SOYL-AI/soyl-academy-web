// ISC 12 Physics ch10 Electromagnetic Induction — two decks: Part 1 (t01–t03) flux, Faraday's and Lenz's laws, motional
// emf and eddy currents; Part 2 (t04–t06) self-induction, mutual induction and the transformer. Numbers computed here.
import { sl, deck, table, flow, svgV, plot, r, sci, dec } from '../../isc-12-physics-ch01/src/lib.mjs';
import * as G from './svgs.mjs';

export const MU0 = 4 * Math.PI * 1e-7;

// ---------------------------------------------------------------- worked-example numbers
const ex1 = { N: 50, A: 80e-4, B1: 0.1, B2: 0.5, t: 0.08, R: 5 };
ex1.dPhi = (ex1.B2 - ex1.B1) * ex1.A;
ex1.emf = (ex1.N * ex1.dPhi) / ex1.t;
ex1.I = ex1.emf / ex1.R;
ex1.Q = (ex1.N * ex1.dPhi) / ex1.R;
const ex3 = { l: 0.5, B: 0.4, v: 4, R: 0.8 };
ex3.emf = ex3.B * ex3.l * ex3.v;
ex3.I = ex3.emf / ex3.R;
ex3.F = ex3.B * ex3.I * ex3.l;
ex3.P = ex3.F * ex3.v;
const ex4 = { N: 500, l: 0.25, A: 4e-4, I: 3, t: 1e-3 };
ex4.L = (MU0 * ex4.N ** 2 * ex4.A) / ex4.l;
ex4.emf = (ex4.L * ex4.I) / ex4.t;
const ex5 = { n1: 1200, n2: 800, r1: 0.01, l: 0.6, rate: 50 };
ex5.M = MU0 * ex5.n1 * ex5.n2 * Math.PI * ex5.r1 ** 2 * ex5.l;
ex5.emf = ex5.M * ex5.rate;
const ex6 = { Np: 460, Vp: 230, Vs: 6, Is: 1.15 };
ex6.Ns = (ex6.Np * ex6.Vs) / ex6.Vp;
ex6.Ip = (ex6.Vs * ex6.Is) / ex6.Vp;
const ex7 = { P: 500e3, R: 5, V1: 11e3, V2: 33e3 };
ex7.I1 = ex7.P / ex7.V1;
ex7.I2 = ex7.P / ex7.V2;
ex7.L1 = ex7.I1 ** 2 * ex7.R;
ex7.L2 = ex7.I2 ** 2 * ex7.R;
export const EX = { ex1, ex3, ex4, ex5, ex6, ex7 };

export const V = {
  flux: svgV(G.FLUX, 'Coil tilted in a uniform field, with its normal at 60 degrees to the field'),
  lenz: svgV(G.LENZ_MAGNET, 'South pole of a magnet pulled away from a solenoid whose near face becomes a north pole'),
  rod: svgV(G.ROD, 'Bar moving on rails in a field out of the page, with the induced current and the opposing force'),
  eddy: svgV(G.EDDY, 'Eddy currents in a solid core and in a laminated core'),
  sol: svgV(G.SOLENOID, 'Long solenoid with a uniform field inside'),
  coax: svgV(G.COAXIAL, 'Two coaxial solenoids of the same length'),
  trans: svgV(G.TRANSFORMER, 'Step-up transformer on a laminated core'),
};
export const fluxPlot = plot(
  {
    x: { min: 0, max: 4, label: 'time t (s)' },
    y: { min: 0, max: 3.6, label: 'flux through one turn Φ (mWb)' },
    functions: [
      { expr: '2x', label: 'rising: slope 2.0 mWb s⁻¹', domain: [0, 1.5] },
      { expr: '3', label: 'steady: slope zero', domain: [1.5, 3] },
      { expr: '21 - 6x', label: 'falling: slope −6.0 mWb s⁻¹', domain: [3, 3.5] },
    ],
  },
  'Flux through one turn of a coil against time: it rises steadily to 3 milliwebers in one and a half seconds, stays level for one and a half seconds, then falls to zero in half a second',
  'The emf per turn is the slope: 2.0 mV, then zero, then 6.0 mV in the opposite sense.',
);
export const powerPlot = plot(
  {
    x: { min: 0, max: 8, label: 'speed of the bar v (m s⁻¹)' },
    y: { min: 0, max: 3.4, label: 'mechanical power needed P (W)' },
    functions: [{ expr: '0.05x^2', label: 'P = (Blv)²/R for B = 0.40 T, l = 0.50 m, R = 0.80 Ω' }],
    points: [{ at: [4, 0.8], label: 'worked example: 0.80 W at 4.0 m s⁻¹' }],
  },
  'Power needed to keep a bar moving on rails against magnetic drag, against its speed: a parabola, so doubling the speed needs four times the power',
  'P ∝ v²: the emf, the current and the drag force each grow in proportion to v.',
);
export const lossPlot = plot(
  {
    x: { min: 5, max: 40, label: 'transmission voltage (kV)' },
    y: { min: 0, max: 55, label: 'power lost in the line (kW)' },
    functions: [{ expr: '1250/x^2', label: 'loss = (P/V)²R for P = 500 kW, R = 5.0 Ω', domain: [5, 40] }],
  },
  'Power wasted as heat in a 5 ohm line carrying 500 kilowatts, against the transmission voltage: the loss falls as one over the voltage squared, from 50 kilowatts at 5 kilovolts to under one kilowatt at 40 kilovolts',
  'Tripling the voltage from 11 kV to 33 kV cuts the loss nine times.',
);
const faradayTable = table(
  ['What is done', 'Galvanometer'],
  [
    ['Magnet pushed into the coil', 'deflects one way'],
    ['Magnet held still inside the coil', 'no deflection'],
    ['Magnet pulled out', 'deflects the other way'],
    ['Magnet moved faster', 'larger deflection'],
    ['Current switched on in a nearby coil', 'brief kick'],
  ],
  'Table of Faraday’s observations: a galvanometer connected to a coil deflects only while the flux through the coil is changing, more for a faster change, and in opposite directions for opposite changes',
);
const lenzFlow = flow(
  'LR',
  [
    ['a', 'Loop pushed into a field pointing into the page'],
    ['b', 'Inward flux through the loop grows'],
    ['c', 'Induced field must point out of the page'],
    ['d', 'Current anticlockwise, seen from the front'],
  ],
  [['a', 'b'], ['b', 'c'], ['c', 'd']],
  'Four steps of finding the direction of an induced current: the loop enters a field pointing into the page, the inward flux grows, so the induced field must point outward, which needs an anticlockwise current seen from the front',
);
const eddyTable = table(
  ['Use or effect', 'How eddy currents act'],
  [
    ['Induction furnace, induction cooktop', 'Large eddy currents heat the metal itself'],
    ['Electromagnetic brakes (metro trains)', 'Force on a moving disc or rail opposes the motion'],
    ['Dead-beat galvanometer', 'Currents in the metal frame damp the swinging coil'],
    ['Speedometer, energy meter disc', 'Drag on a moving disc grows with its speed'],
    ['Transformer and motor cores (unwanted)', 'Heating loss, reduced by laminating the core'],
  ],
  'Table of uses and effects of eddy currents: furnaces and cooktops, electromagnetic brakes, dead-beat galvanometers, speedometers and meter discs, and the unwanted heating of cores that lamination reduces',
);
const backTable = table(
  ['Moment', 'Back emf', 'Effect'],
  [
    ['Switch closed', 'Opposes the rising current', 'Current grows gradually'],
    ['Steady current', 'Zero', 'Coil acts as a plain resistance'],
    ['Switch opened', 'Large, tries to keep the current going', 'Spark at the switch'],
  ],
  'Table of the back emf of a coil when a switch is closed, when the current is steady and when the switch is opened',
);
const lossesTable = table(
  ['Loss', 'Cause', 'How it is reduced'],
  [
    ['Copper loss', 'I²R heating of the windings', 'Thick copper wire'],
    ['Eddy-current loss', 'Induced currents in the core', 'Laminated core (insulated sheets)'],
    ['Hysteresis loss', 'Core magnetised back and forth each cycle', 'Soft iron or silicon steel core'],
    ['Flux leakage', 'Not all primary flux links the secondary', 'Coils wound one over the other'],
  ],
  'Table of the four energy losses in a transformer, their causes and their remedies: copper loss, eddy-current loss, hysteresis loss and flux leakage',
);
const gridFlow = flow(
  'LR',
  [
    ['g', 'Generator, about 11 kV'],
    ['u', 'Step-up transformer'],
    ['l', 'Long-distance line, 220 kV or more'],
    ['d', 'Step-down substations'],
    ['h', 'Homes, 230 V, 50 Hz'],
  ],
  [['g', 'u'], ['u', 'l'], ['l', 'd'], ['d', 'h']],
  'Flow of electrical power from a generator at about 11 kilovolts, through a step-up transformer, along a long-distance line at 220 kilovolts or more, through step-down substations, to homes at 230 volts',
);

export const deck1 = deck({
  part: 1,
  title: 'Electromagnetic Induction — Part 1: Flux, Faraday, Lenz and motional emf',
  goals: [
    'Calculate magnetic flux and use Faraday’s laws to find induced emf, current and charge',
    'Apply Lenz’s law and relate it to conservation of energy; derive E = Blv and the power (Blv)²/R',
    'Explain the causes, effects and uses of eddy currents',
  ],
  slides: [
    sl('title', 'Electromagnetic Induction', {
      b: 'Part 1 — a changing magnetic flux drives a current: Faraday’s and Lenz’s laws, motional emf and eddy currents.',
      v: V.flux,
      n: 'Every power station, every transformer on an electric pole and every induction cooktop runs on one discovery: a changing magnetic field can drive a current. In this part we define magnetic flux, state Faraday’s laws, find the direction of the induced current with Lenz’s law, work out the emf across a moving rod, and see the currents that swirl inside solid metal.',
    }),
    sl('concept', 'Magnetic flux', {
      b: r`For a flat coil of area $A$ in a uniform field $B$, the **magnetic flux** through it is
$$\Phi = \vec B \cdot \vec A = BA\cos\theta$$
where $\theta$ is the angle between $\vec B$ and the **normal** to the coil. Unit: **weber** (1 Wb = 1 T m²). For $N$ turns the **flux linkage** is $N\Phi$.`,
      ul: ['Largest (BA) when the plane of the coil is perpendicular to B; zero when the plane is parallel to B.', 'Careful: an angle given between the field and the PLANE of the coil must be changed to 90° minus that angle.'],
      v: V.flux,
      n: 'Magnetic flux measures how much field passes through a surface. For a flat coil it is the field times the area times the cosine of the angle between the field and the normal to the coil. The unit is the weber, one tesla square metre. Watch the angle: in the diagram the plane of the coil is at thirty degrees to the field, so the normal is at sixty degrees, and the flux is half of B A.',
    }),
    sl('concept', 'Faraday’s laws of electromagnetic induction', {
      b: r`**First law:** whenever the magnetic flux linked with a circuit changes, an emf is induced in it; it lasts only while the change continues.
**Second law:** the induced emf equals the rate of change of flux linkage:
$$\varepsilon = -N\,\dfrac{d\Phi}{dt}$$`,
      ul: ['The flux can change through B, through A or through the angle θ.', 'The minus sign is Lenz’s law (next slides). Induced current $I = \\varepsilon/R$.'],
      v: faradayTable,
      n: 'Faraday found that a galvanometer joined to a coil deflects only while something changes: a magnet moving in or out, or a current switched on in a nearby coil. Hold the magnet still and the needle returns to zero. Move it faster and the kick is bigger. His second law makes this exact: the emf equals the rate of change of flux linkage, N times d phi by d t, with a minus sign we will meet soon.',
    }),
    sl('example', 'Worked example 1: emf, current and charge', {
      b: r`A coil of 50 turns, each of area 80 cm², lies with its plane perpendicular to a field that rises steadily from 0.10 T to 0.50 T in 0.080 s. The circuit resistance is 5.0 Ω. Find the emf, the current and the charge that flows.`,
      ul: [
        r`Step 1 — change of flux per turn: $\Delta\Phi = \Delta B\,A = 0.40 \times 80 \times 10^{-4} = ${sci(ex1.dPhi, 2)}$ Wb.`,
        r`Step 2 — $\varepsilon = \dfrac{N\Delta\Phi}{\Delta t} = \dfrac{50 \times ${sci(ex1.dPhi, 2)}}{0.080} = ${dec(ex1.emf, 2)}$ V; $I = \dfrac{\varepsilon}{R} = ${dec(ex1.I, 2)}$ A.`,
        r`Step 3 — $q = I\Delta t = \dfrac{N\Delta\Phi}{R} = \dfrac{50 \times ${sci(ex1.dPhi, 2)}}{5.0} = ${dec(ex1.Q, 2)}$ C, the same however fast the change.`,
      ],
      v: table(['Quantity', 'Value'], [['Change of flux per turn', '3.2 mWb'], ['Induced emf', '2.0 V'], ['Current', '0.40 A'], ['Charge', '0.032 C']], 'Worked table: flux change 3.2 milliwebers per turn, emf 2 volts, current 0.4 amperes, charge 0.032 coulombs'),
      n: 'Each turn gains three point two milliwebers of flux. Fifty turns, in eight hundredths of a second, give an emf of two volts, and with five ohms the current is point four amperes. The charge is the current times the time, point zero three two coulombs. Notice that it equals N times the flux change over R: the time cancels, so a slow change moves the same charge as a quick one.',
    }),
    sl('diagram', 'Reading a flux–time graph', {
      b: r`The emf per turn is the **slope** of the $\Phi$–$t$ graph (with a minus sign):`,
      ul: ['0 to 1.5 s: slope 2.0 mWb s⁻¹, so 2.0 mV per turn.', '1.5 s to 3.0 s: flux steady, so **no emf**, however large the flux.', '3.0 s to 3.5 s: slope −6.0 mWb s⁻¹, so 6.0 mV per turn in the **opposite** sense.'],
      v: fluxPlot,
      n: 'On a graph of flux against time, the induced emf is the slope, not the height. While the flux climbs steadily, each turn has two millivolts. While the flux sits at its largest value, the emf is zero, because nothing is changing. When the flux drops to zero in half a second, the slope is three times as steep and of the opposite sign, so the emf is six millivolts per turn, reversed.',
    }),
    sl('check', 'Quick check: steady flux', {
      b: 'Choose the correct option.',
      v: fluxPlot,
      chk: 'steady-mcq',
      n: 'Is the emf set by the size of the flux, or by how fast it changes?',
    }),
    sl('diagram', 'Lenz’s law', {
      b: '**Lenz’s law:** the induced current flows in the direction that **opposes the change** of flux that produces it.',
      ul: ['Flux increasing: the induced field points **against** the existing field.', 'Flux decreasing: the induced field points **along** the existing field, trying to keep it.', 'Pulling a south pole away from a coil makes the near face a **north** pole, which attracts the magnet back.'],
      v: V.lenz,
      n: 'Lenz’s law gives the direction. The induced current always opposes the change that causes it, not the field itself. In the picture a south pole is being pulled away from a solenoid. The flux it sends through the coil is shrinking, so the induced current tries to keep it, turning the near face into a north pole. That north pole attracts the departing south pole, holding it back.',
    }),
    sl('concept', 'Lenz’s law and conservation of energy', {
      b: 'Because the induced current always opposes the motion or change, **work must be done** to keep the flux changing. That work is the source of the electrical energy (heat in the circuit).',
      ul: ['If the induced current aided the motion, a small push would make the magnet speed up by itself, producing energy from nothing.', 'So Lenz’s law is a consequence of the **conservation of energy**.'],
      v: V.lenz,
      n: 'Why must the current oppose the change? Suppose it helped instead. A magnet nudged towards a coil would be pulled in faster, which would induce more current and pull harder still, heating the coil with no one doing any work. That would create energy from nothing. Because the current opposes, you must push the magnet, and the work you do is exactly what appears as electrical energy.',
    }),
    sl('example', 'Worked example 2: which way does the current flow?', {
      b: 'A square loop in the plane of the page is pushed into a region where a uniform field points into the page. Find the direction of the induced current while it enters, and while it moves wholly inside.',
      ul: ['Entering: the inward flux grows, so the induced field must point **out of the page**: current **anticlockwise** (seen from the front).', 'Wholly inside a uniform field: the flux is constant, so there is **no induced current**.', 'Leaving: the inward flux falls, so the current is **clockwise**, keeping the inward field.'],
      v: lenzFlow,
      n: 'Work it in steps. As the loop enters, more field points into the page through it, so the change is an increase inward. The induced field must point outward, and by the right-hand rule that needs an anticlockwise current as you look at the page. Once the loop is wholly inside the uniform field, the flux stops changing and the current stops. As it leaves, the current turns clockwise.',
    }),
    sl('check', 'Quick check: a loop leaving a field', {
      b: 'Choose the correct option.',
      v: lenzFlow,
      chk: 'pullout-mcq',
      n: 'Is the flux through the loop growing or shrinking, and which way does it point?',
    }),
    sl('diagram', 'Motional emf: E = Blv', {
      b: r`A bar of length $l$ moves with speed $v$ along rails in a field $B$ normal to their plane. If it is a distance $x$ from the closed end, the flux through the circuit is $\Phi = Blx$, so
$$\varepsilon = \dfrac{d\Phi}{dt} = Bl\dfrac{dx}{dt} = Blv$$`,
      ul: ['Same result from forces: each free charge feels $qvB$ along the bar; charges separate until $qE = qvB$, so $\\varepsilon = El = Blv$.', 'Direction from Lenz’s law or from $q\\vec v \\times \\vec B$.'],
      v: V.rod,
      n: 'Now move a conductor through a field. As the bar slides, the area of the circuit grows, so the flux grows at the rate B times l times v. That is the motional emf. The same answer comes from forces: the moving free charges in the bar are pushed along it by the magnetic force until the electric field from the separated charges balances them. Here, with the field out of the page, the current flows down the bar.',
    }),
    sl('diagram', 'Force, current and power', {
      b: r`With circuit resistance $R$: $I = \dfrac{Blv}{R}$. The field exerts a force $F = BIl = \dfrac{B^2l^2v}{R}$ on the bar, **opposing** its motion. To keep $v$ constant, an equal force must be applied, supplying power
$$P = Fv = \dfrac{(Blv)^2}{R} = I^2R$$`,
      ul: ['Mechanical power in = electrical power out as heat in R: energy is conserved.', 'Doubling v doubles the emf, the current and the force, and multiplies the power by four.'],
      v: V.rod,
      n: 'The induced current in the bar sits in the magnetic field, so it feels a force B I l, and Lenz’s law says this force points backwards. To keep the bar moving steadily, you must push with an equal force. Your power, force times speed, is B l v squared over R, exactly the rate at which heat appears in the resistor. Mechanical energy is turned into electrical energy, and none is created.',
    }),
    sl('example', 'Worked example 3: power to move a bar', {
      b: r`A bar 0.50 m long moves at 4.0 m s⁻¹ along rails in a perpendicular field of 0.40 T. The circuit resistance is 0.80 Ω. Find the emf, the current, the force needed and the power.`,
      ul: [
        r`Step 1 — $\varepsilon = Blv = 0.40 \times 0.50 \times 4.0 = ${dec(ex3.emf, 2)}$ V; $I = \dfrac{${dec(ex3.emf, 2)}}{0.80} = ${dec(ex3.I, 2)}$ A.`,
        r`Step 2 — $F = BIl = 0.40 \times ${dec(ex3.I, 2)} \times 0.50 = ${dec(ex3.F, 2)}$ N.`,
        r`Step 3 — $P = Fv = ${dec(ex3.F, 2)} \times 4.0 = ${dec(ex3.P, 2)}$ W; check: $(Blv)^2/R = ${dec(ex3.emf, 2)}^2/0.80 = ${dec(ex3.emf ** 2 / ex3.R, 2)}$ W.`,
      ],
      v: powerPlot,
      n: 'The emf is point four times point five times four, point eight volts, and with point eight ohms the current is one ampere. The drag on the bar is B I l, a fifth of a newton, so the pushing force must be the same. The power is force times speed, point eight watts, which matches the emf squared over the resistance. On the graph, the power grows as the square of the speed.',
    }),
    sl('diagram', 'Eddy currents', {
      b: 'When the flux through a **bulk piece of metal** changes (the metal moves in a field, or the field changes), induced currents circulate in closed loops inside it: **eddy currents**.',
      ul: ['Effects: **heating** of the metal and a **force opposing** the relative motion (Lenz’s law).', 'In transformer and motor cores they waste energy; **lamination** (thin sheets insulated by varnish) breaks the loops into small ones and cuts the loss.', 'Treated qualitatively in the ISC syllabus.'],
      v: V.eddy,
      n: 'In a solid block of metal there are no wires to guide the induced current, so it swirls in closed loops inside the metal, like eddies in a stream. These eddy currents heat the metal and, by Lenz’s law, resist any motion of the metal through the field. In machines this heating is wasted energy, so cores are built from thin sheets insulated from one another, which leaves room only for small, weak loops.',
    }),
    sl('concept', 'Putting eddy currents to work', {
      b: 'The same heating and opposing forces are useful:',
      v: eddyTable,
      ul: ['Faster changes give larger eddy currents, so magnetic braking is strongest at high speed and fades smoothly as the vehicle slows.'],
      n: 'Engineers use eddy currents on purpose. An induction furnace or cooktop heats metal by making large eddy currents flow in it. Metro trains brake by switching on electromagnets near a metal disc or rail. A galvanometer coil wound on a metal frame stops swinging quickly. Speedometers and old energy meters use the drag on a spinning disc. Only in cores are they a nuisance, tamed by lamination.',
    }),
    sl('check', 'Quick check: eddy currents', {
      b: 'Decide whether the statement is true or false.',
      v: V.eddy,
      chk: 'eddy-tf',
      n: 'Does the metal have to move, or is a changing flux enough?',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Flux', '$\\Phi = BA\\cos\\theta$ (θ from the normal); weber'],
          ['Faraday', '$\\varepsilon = -N\\,d\\Phi/dt$; $q = N\\Delta\\Phi/R$'],
          ['Lenz', 'Induced current opposes the change; follows from energy conservation'],
          ['Motional emf', '$\\varepsilon = Blv$; $I = Blv/R$'],
          ['Force and power', '$F = B^2l^2v/R$; $P = (Blv)^2/R$'],
          ['Eddy currents', 'Heating and damping; reduced by laminating cores'],
        ],
        'Summary table of flux, Faraday’s law, Lenz’s law, motional emf, the force and power on a moving bar, and eddy currents',
      ),
      n: 'To sum up: flux is B A cos theta, with theta measured from the normal. The induced emf is the rate of change of flux linkage, and the charge that flows depends only on the change. Lenz’s law gives the direction and follows from conservation of energy. A moving bar has an emf B l v, and the power to drive it is B l v squared over R. Eddy currents heat and damp, and laminated cores reduce them.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'Check whether the angle is given from the plane or from the normal.',
        'For direction questions: decide the change of flux first, then the induced field, then the current.',
        'In the derivation of $\\varepsilon = Blv$, write $\\Phi = Blx$ and differentiate.',
        'Eddy currents are qualitative in ISC: explain causes, uses and lamination.',
      ],
      v: table(['Asked', 'Key point'], [['Flux steady but large?', 'emf zero'], ['Charge through a coil?', 'NΔΦ/R, time does not matter'], ['Speed of the bar doubled?', 'Power × 4']], 'Table of common questions and the key point for each'),
      n: 'Read every angle carefully: is it from the plane or from the normal? For direction questions, work in three steps: what change happens to the flux, which way the induced field must point, and then which way the current flows. In the motional emf derivation, write the flux as B l x and differentiate. And keep eddy-current answers descriptive: causes, effects, uses and lamination.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Electromagnetic Induction — Part 2: Self-induction, mutual induction and the transformer',
  goals: [
    'Define self-inductance, derive L for a long solenoid and explain back emf',
    'Define mutual inductance and derive M for two coaxial solenoids',
    'Explain the working, relations, efficiency and losses of a transformer and why power is transmitted at high voltage',
  ],
  slides: [
    sl('title', 'Inductance and the transformer', {
      b: 'Part 2 — a coil that resists changes in its own current, two coils that talk through their shared flux, and the transformer.',
      v: V.sol,
      n: 'A coil does not like its current to change. Switch it on and the current creeps up; switch it off and it fights back with a spark. In this part we measure that stubbornness as self-inductance, see how one coil can induce an emf in its neighbour through mutual inductance, and use the idea to build the transformer, the device that makes long-distance power lines possible.',
    }),
    sl('concept', 'Self-induction', {
      b: r`The current $I$ in a coil sets up a flux through its own turns. The flux linkage is proportional to the current:
$$N\Phi = LI,\qquad \varepsilon = -L\,\dfrac{dI}{dt}$$
$L$ is the **self-inductance**. Unit: **henry** (1 H = 1 V s A⁻¹ = 1 Wb A⁻¹).`,
      ul: ['A coil has 1 H if a current changing at 1 A s⁻¹ induces 1 V across it.', 'L depends on the number of turns, the size and shape of the coil and the core, not on the current.'],
      v: V.sol,
      n: 'The field of a coil passes through its own turns. If the current changes, that flux changes, and an emf is induced in the very same coil. The flux linkage is proportional to the current, and the constant of proportionality is the self-inductance L, measured in henries. One henry means that a current changing by one ampere every second induces one volt.',
    }),
    sl('diagram', 'Self-inductance of a long solenoid', {
      b: r`A long solenoid: $N$ turns, length $l$, area $A$, $n = N/l$. Inside, $B = \mu_0 nI = \dfrac{\mu_0NI}{l}$, so the flux linkage is
$$N\Phi = N\cdot\dfrac{\mu_0NI}{l}\cdot A = LI \;\Rightarrow\; L = \dfrac{\mu_0N^2A}{l} = \mu_0n^2Al$$`,
      ul: ['L ∝ N²: twice the turns on the same length, four times the inductance.', 'With an iron core of relative permeability $\\mu_r$: $L = \\mu_0\\mu_rN^2A/l$.'],
      v: V.sol,
      n: 'For a long solenoid the field inside is mu nought N I over l. Each of the N turns has this field through its area A, so the flux linkage is mu nought N squared A I over l. Dividing by the current gives the self-inductance, mu nought N squared A over l. It grows as the square of the number of turns, and an iron core multiplies it by the relative permeability.',
    }),
    sl('example', 'Worked example 4: a solenoid and its back emf', {
      b: r`An air-cored solenoid 25 cm long has 500 turns, each of area 4.0 cm². Find its self-inductance, and the average back emf when a current of 3.0 A through it is switched off in 1.0 ms.`,
      ul: [
        r`Step 1 — $L = \dfrac{\mu_0N^2A}{l} = \dfrac{4\pi \times 10^{-7} \times 500^2 \times 4.0 \times 10^{-4}}{0.25} = ${sci(ex4.L, 3)}$ H (about 0.50 mH).`,
        r`Step 2 — $\varepsilon = L\dfrac{\Delta I}{\Delta t} = ${sci(ex4.L, 3)} \times \dfrac{3.0}{1.0 \times 10^{-3}} = ${dec(ex4.emf, 3)}$ V.`,
      ],
      v: table(['Quantity', 'Value'], [['Self-inductance', '0.503 mH'], ['Rate of fall of current', '3000 A s⁻¹'], ['Average back emf', '1.51 V']], 'Worked table: self-inductance 0.503 millihenry, current falling at 3000 amperes per second, back emf about 1.5 volts'),
      n: 'Put the numbers into mu nought N squared A over l: about half a millihenry, a small inductance because the coil has no iron. Switching off three amperes in a thousandth of a second is a fall of three thousand amperes per second, so the back emf is about one and a half volts. With an iron core, or a faster switch, it could be hundreds of times larger.',
    }),
    sl('concept', 'Back emf', {
      b: r`The induced emf $-L\,dI/dt$ in a coil is called the **back emf**: it opposes the **change** of current, not the current itself.`,
      v: backTable,
      ul: ['Self-inductance acts like inertia in mechanics: it resists changes of current as mass resists changes of velocity.'],
      n: 'This emf is called the back emf. When the switch is closed, it opposes the rising current, so the current grows gradually. When the current is steady, it is zero. When the switch is opened, the current tries to fall to zero at once, the back emf becomes very large in the direction that keeps the current going, and a spark may jump across the switch. Inductance behaves like inertia for current.',
    }),
    sl('check', 'Quick check: a stretched solenoid', {
      b: 'Choose the correct option.',
      v: V.sol,
      chk: 'stretch-mcq',
      n: 'Which quantities in mu nought N squared A over l change?',
    }),
    sl('concept', 'Mutual induction', {
      b: r`A current $I_1$ in coil 1 sends flux through coil 2. The flux linkage of coil 2 is proportional to $I_1$:
$$N_2\Phi_2 = MI_1,\qquad \varepsilon_2 = -M\,\dfrac{dI_1}{dt}$$
$M$ is the **mutual inductance** (henry); for a given pair $M_{12} = M_{21}$.`,
      ul: ['M is larger for more turns, larger area, closer coils sharing an axis, and an iron core through both.', 'A steady current in coil 1 induces nothing in coil 2.'],
      v: V.coax,
      n: 'Now take two coils. A current in the first sends some of its flux through the second. If that current changes, an emf appears in the second coil, equal to M times the rate of change of the first current. M is the mutual inductance, also measured in henries, and it is the same whichever coil carries the current. It depends on the turns, the areas, how the coils are placed, and any iron core.',
    }),
    sl('diagram', 'Mutual inductance of two coaxial solenoids', {
      b: r`Inner solenoid: radius $r_1$, $n_1$ turns per metre; outer: $n_2$ turns per metre; common length $l$. A current $I_2$ in the outer gives $B_2 = \mu_0n_2I_2$ through the inner one’s area $\pi r_1^2$. Its $n_1l$ turns link
$$N_1\Phi_1 = (n_1l)(\mu_0n_2I_2)(\pi r_1^2) = MI_2 \;\Rightarrow\; M = \mu_0n_1n_2\pi r_1^2l$$`,
      ul: ['Current $I_1$ in the inner solenoid gives the same linkage with the outer one, so $M_{12} = M_{21}$.', 'Only the inner area $\\pi r_1^2$ counts: outside the inner solenoid its field is zero.'],
      v: V.coax,
      n: 'Pass a current through the wide outer solenoid. Its field, mu nought n two I two, fills the narrow inner one, whose cross-section is pi r one squared. The inner coil has n one l turns, so its flux linkage is the product of all these. Dividing by the current gives the mutual inductance, mu nought n one n two pi r one squared l. Reversing the roles gives the same answer.',
    }),
    sl('example', 'Worked example 5: coaxial solenoids', {
      b: r`An inner solenoid of radius 1.0 cm has 1200 turns per metre; the outer one has 800 turns per metre; both are 60 cm long. Find M, and the emf in the inner solenoid when the outer current changes at 50 A s⁻¹.`,
      ul: [
        r`Step 1 — $M = \mu_0n_1n_2\pi r_1^2l = 4\pi \times 10^{-7} \times 1200 \times 800 \times \pi \times (0.010)^2 \times 0.60 = ${sci(ex5.M, 3)}$ H.`,
        r`Step 2 — $\varepsilon = M\dfrac{dI}{dt} = ${sci(ex5.M, 3)} \times 50 = ${sci(ex5.emf, 3)}$ V (about 11 mV).`,
      ],
      v: V.coax,
      n: 'Multiplying mu nought by the two turn densities, the inner cross-section and the length gives about point two three millihenry. When the current in the outer solenoid changes by fifty amperes every second, the inner one has an emf of about eleven millivolts. Small coils without iron give small mutual inductances; transformers use iron cores and many turns.',
    }),
    sl('check', 'Quick check: flux from mutual inductance', {
      b: 'Calculate the flux.',
      v: V.coax,
      chk: 'Mflux-num',
      n: 'The flux linkage of the second coil is M times the first current.',
    }),
    sl('diagram', 'The transformer', {
      b: 'Two coils, the **primary** (Np turns) and the **secondary** (Ns turns), are wound on a common **laminated soft-iron core**.',
      ul: ['An alternating voltage in the primary drives an alternating current, which sets up an **alternating flux** in the core.', 'The same changing flux links the secondary and induces an alternating emf in it (**mutual induction**).', 'A transformer works only with **changing** current: on steady DC the secondary emf is zero.'],
      v: V.trans,
      n: 'A transformer is two coils on one iron core. An alternating voltage across the primary drives an alternating current, which magnetises the core first one way and then the other. The iron carries this alternating flux round to the secondary coil, where it induces an alternating emf. Nothing flows from one coil to the other; the energy is carried by the changing flux. With steady direct current, nothing would be induced.',
    }),
    sl('concept', 'Ideal transformer relations', {
      b: r`No flux leakage: the same $d\Phi/dt$ in every turn, so $\varepsilon_p = N_p\,d\Phi/dt$ and $\varepsilon_s = N_s\,d\Phi/dt$. No losses: $V_pI_p = V_sI_s$.
$$\dfrac{V_s}{V_p} = \dfrac{N_s}{N_p} = \dfrac{I_p}{I_s}$$`,
      ul: ['**Step-up** ($N_s > N_p$): voltage up, current down.', '**Step-down** ($N_s < N_p$): voltage down, current up.', 'A transformer cannot increase power.'],
      v: V.trans,
      n: 'If every turn of both coils carries the same changing flux, each turn has the same emf, so the voltages are in the ratio of the turns. If no energy is lost, the power in equals the power out, so the currents are in the inverse ratio. A step-up transformer raises the voltage and lowers the current; a step-down transformer does the opposite. Neither gives more power than it takes.',
    }),
    sl('example', 'Worked example 6: a doorbell transformer', {
      b: r`An ideal transformer with 460 primary turns steps 230 V mains down to 6.0 V for a doorbell that draws 1.15 A. Find the number of secondary turns and the primary current.`,
      ul: [
        r`Step 1 — $N_s = N_p\dfrac{V_s}{V_p} = 460 \times \dfrac{6.0}{230} = ${dec(ex6.Ns, 2)}$ turns.`,
        r`Step 2 — $I_p = \dfrac{V_sI_s}{V_p} = \dfrac{6.0 \times 1.15}{230} = ${dec(ex6.Ip, 2)}$ A (30 mA).`,
      ],
      v: table(['Winding', 'Turns', 'Voltage', 'Current'], [['Primary', '460', '230 V', '0.030 A'], ['Secondary', '12', '6.0 V', '1.15 A']], 'Worked table: primary 460 turns, 230 volts, 0.03 amperes; secondary 12 turns, 6 volts, 1.15 amperes'),
      n: 'The voltage falls by a factor of two hundred and thirty over six, so the secondary needs only twelve turns. The power in the secondary is about six point nine watts, and the primary must supply the same at two hundred and thirty volts, which is only thirty milliamperes. The current is stepped up in exactly the ratio the voltage is stepped down.',
    }),
    sl('concept', 'Efficiency and energy losses', {
      b: r`Efficiency $\eta = \dfrac{\text{output power}}{\text{input power}} = \dfrac{V_sI_s}{V_pI_p}$; large transformers reach 95–99%.`,
      v: lossesTable,
      ul: ['Most losses appear as heat, which is why large transformers are cooled with oil.'],
      n: 'Real transformers are not quite ideal, though large ones come close. Energy is lost as heat in the resistance of the windings, in eddy currents in the core, and in magnetising the core back and forth every cycle, called hysteresis. A little flux also leaks past the secondary. Thick copper wire, a laminated core of soft iron, and coils wound one over the other keep these losses small.',
    }),
    sl('diagram', 'Power transmission', {
      b: r`A line of resistance $R$ carrying power $P$ at voltage $V$ has current $I = P/V$ and wastes
$$P_{loss} = I^2R = \dfrac{P^2R}{V^2}$$`,
      ul: ['Raising V by a factor k cuts the loss by $k^2$; so power is stepped **up** for transmission and **down** near the users for safety.', 'This needs AC: transformers do not work on steady DC.'],
      v: gridFlow,
      n: 'Long power lines have resistance, and the heat they waste is I squared R. For a fixed power, the current is power divided by voltage, so the loss falls as one over the voltage squared. That is why generators feed a step-up transformer, the line runs at hundreds of kilovolts, and step-down transformers bring it to two hundred and thirty volts near homes, where it is safe to use.',
    }),
    sl('example', 'Worked example 7: why high voltage?', {
      b: r`A town takes 500 kW through lines of total resistance 5.0 Ω. Compare the power lost at 11 kV and at 33 kV.`,
      ul: [
        r`At 11 kV: $I = \dfrac{500\,000}{11\,000} = ${dec(ex7.I1, 3)}$ A; loss $= I^2R = ${dec(ex7.L1 / 1e3, 3)}$ kW (about 2% of the power).`,
        r`At 33 kV: $I = ${dec(ex7.I2, 3)}$ A; loss $= ${dec(ex7.L2 / 1e3, 3)}$ kW: **nine times smaller**.`,
      ],
      v: lossPlot,
      n: 'At eleven kilovolts the line carries about forty five amperes and wastes about ten kilowatts, two parts in a hundred of the power. At thirty three kilovolts the current is a third as large, and the loss falls to about one point one five kilowatts, nine times smaller. The graph shows the loss falling steeply as the voltage rises.',
    }),
    sl('check', 'Quick check: turns ratio', {
      b: 'Calculate the number of turns.',
      v: V.trans,
      chk: 'turns-num',
      n: 'The voltages are in the ratio of the turns.',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Self-induction', '$N\\Phi = LI$; $\\varepsilon = -L\\,dI/dt$; henry'],
          ['Long solenoid', '$L = \\mu_0N^2A/l = \\mu_0n^2Al$'],
          ['Mutual induction', '$N_2\\Phi_2 = MI_1$; $\\varepsilon_2 = -M\\,dI_1/dt$'],
          ['Coaxial solenoids', '$M = \\mu_0n_1n_2\\pi r_1^2l$'],
          ['Ideal transformer', '$V_s/V_p = N_s/N_p = I_p/I_s$'],
          ['Transmission', 'Loss $= P^2R/V^2$: transmit at high voltage'],
        ],
        'Summary table of self-induction, the solenoid formula, mutual induction, coaxial solenoids, the ideal transformer and power transmission',
      ),
      n: 'To sum up: a coil’s flux linkage is L times its current, and a changing current gives a back emf, minus L d I by d t. A long solenoid has L equal to mu nought N squared A over l. Two coils share a mutual inductance M, which for coaxial solenoids is mu nought n one n two pi r one squared l. A transformer uses mutual induction to change voltage in the ratio of the turns, and high-voltage transmission cuts line losses.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'Back emf depends on dI/dt, not on I: it can be large when I is zero.',
        'In the M derivation, use the area of the INNER solenoid.',
        'Transformer numericals: turns ratio for V, inverse ratio for I, efficiency for real ones.',
        'Losses: name the loss and its remedy as a pair.',
      ],
      v: table(['Asked', 'Key point'], [['Turns doubled, same length?', 'L × 4'], ['Transformer on a battery?', 'No output once steady'], ['Voltage of a line tripled?', 'Loss ÷ 9']], 'Table of common questions and the key point for each'),
      n: 'Remember that a back emf depends on how fast the current changes, not on how large it is. In the coaxial derivation, always use the cross-section of the inner solenoid. In transformer problems, voltages follow the turns ratio and currents the inverse ratio, with the efficiency included for a real transformer. And when asked about losses, give each loss together with how it is reduced.',
    }),
  ],
});
