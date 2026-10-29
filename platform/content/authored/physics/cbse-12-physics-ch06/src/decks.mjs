// ch06 Electromagnetic Induction — two decks: Part 1 (t01–t02) flux, Faraday's law and Lenz's law; Part 2 (t03–t04)
// motional emf, self-inductance and mutual inductance. Eddy currents are deleted from the 2026-27 syllabus and not used.
// Worked-example numbers are computed here.
import { sl, deck, table, flow, svgV, plot, r, sci, dec } from '../../cbse-12-physics-ch01/src/lib.mjs';
import * as G from './svgs.mjs';

export const MU0 = 4 * Math.PI * 1e-7;

// ---------------------------------------------------------------- worked-example numbers
const ex1 = { e: (200 * 0.01 * 0.2) / 0.05 };
const ex2 = { e: 6 * 2 + 2 };
const ex4 = (() => {
  const B = 0.3;
  const l = 0.5;
  const v = 4;
  const R = 2;
  const e = B * l * v;
  const I = e / R;
  const F = I * l * B;
  return { e, I, F, P: F * v, PR: I * I * R };
})();
const ex5 = { e: 0.5 * 0.4 * 20 * 1 ** 2 };
const ex6 = (() => {
  const N = 500;
  const l = 0.25;
  const A = 4e-4;
  const L = (MU0 * N * N * A) / l;
  return { L, e: L * (2 / 0.01) };
})();
const ex7 = { e: 0.15 * (4 / 0.02) };
export const EX = { ex1, ex2, ex4, ex5, ex6, ex7 };

export const V = {
  lenz: svgV(G.LENZ_LOOP, 'Loop in a growing inward field with an anticlockwise induced current'),
  magnet: svgV(G.MAGNET_COIL, 'North pole of a magnet moving towards a coil whose near face becomes a north pole'),
  rod: svgV(G.ROD, 'Rod sliding on rails in a magnetic field, with induced current and the opposing magnetic force', 'Directions checked with q v × B and I l × B.'),
  self: svgV(G.SELF, 'Coil with an increasing current and an opposing back emf'),
  mutual: svgV(G.MUTUAL, 'Primary coil with a cell and switch beside a secondary coil with a galvanometer'),
};
export const fluxPlot = plot(
  {
    x: { min: 0, max: 6, label: 't (s)' },
    y: { min: -6, max: 12, label: 'Φ (mWb) and ε (mV)' },
    series: [
      { label: 'flux Φ (mWb)', kind: 'line', points: [[0, 0], [2, 10], [4, 10], [5, 0], [6, 0]] },
      { label: 'emf ε = −dΦ/dt (mV)', kind: 'line', points: [[0, -5], [2, -5], [2, 0], [4, 0], [4, 10], [5, 10], [5, 0], [6, 0]] },
    ],
    hlines: [{ y: 0, dashed: true }],
  },
  'Flux through a single loop rising steadily for 2 seconds, staying constant for 2 seconds and falling to zero in 1 second, with the induced emf: minus 5 millivolts, then zero, then plus 10 millivolts',
  'The emf is minus the slope of the flux graph: steady flux gives no emf.',
);

export const deck1 = deck({
  part: 1,
  title: 'Electromagnetic Induction — Part 1: Faraday’s law and Lenz’s law',
  goals: [
    'Define magnetic flux and state Faraday’s laws of electromagnetic induction',
    'Calculate the induced emf from a changing flux',
    'Use Lenz’s law to find the direction of an induced current, and relate it to conservation of energy',
  ],
  slides: [
    sl('title', 'Electromagnetic Induction', {
      b: 'Part 1 — how a changing magnetic flux produces an emf, how big it is, and which way the induced current flows.',
      v: flow('LR', [['e', 'Experiments'], ['f', 'Magnetic flux'], ['F', 'Faraday’s law'], ['L', 'Lenz’s law'], ['c', 'Energy conservation']], [['e', 'f'], ['f', 'F'], ['F', 'L'], ['L', 'c']], 'Flow of the part: experiments, magnetic flux, Faraday’s law, Lenz’s law, conservation of energy'),
      n: 'Almost every watt of electricity in India’s grid comes from electromagnetic induction in power-station generators. In 1831 Faraday found that a changing magnetic field can drive a current in a closed coil with no battery at all. In this part we define magnetic flux, state Faraday’s law for the size of the induced emf, and use Lenz’s law to find its direction.',
    }),
    sl('concept', 'Faraday’s experiments', {
      b: 'A coil connected to a galvanometer shows a current only while something is **changing**:',
      ul: ['A magnet moved towards or away from the coil (faster motion, bigger deflection; reversing the motion reverses the current).', 'The coil moved near a stationary magnet: only relative motion matters.', 'The current in a nearby coil switched on or off, or varied.'],
      v: table(['Action', 'Galvanometer'], [['Magnet held still in the coil', 'No deflection'], ['N pole pushed in', 'Deflects one way'], ['N pole pulled out', 'Deflects the other way'], ['Nearby circuit switched on / off', 'Brief kicks in opposite directions']], 'Table of Faraday’s observations: no deflection with a still magnet, opposite deflections for pushing in and pulling out, brief kicks when a nearby circuit is switched'),
      n: 'Faraday’s experiments all had one thing in common. A magnet resting inside a coil gives no current at all. Push its north pole in and the galvanometer kicks one way; pull it out and it kicks the other way, more strongly if you move faster. Moving the coil instead of the magnet works just as well. Switching a current on or off in a neighbouring coil also gives a brief kick. Change is what matters.',
    }),
    sl('concept', 'Magnetic flux', {
      b: r`The **magnetic flux** through a plane area $A$ in a uniform field $B$ is
$$\Phi_B = \vec B\cdot\vec A = BA\cos\theta$$
where $\theta$ is the angle between $\vec B$ and the normal to the area. SI unit: **weber** (Wb) $= 1$ T m². For $N$ turns the **flux linkage** is $N\Phi_B$.`,
      ul: ['Flux can change by changing $B$, the area $A$, or the angle $\\theta$.', 'For a non-uniform field: $\\Phi_B = \\int \\vec B\\cdot d\\vec A$.'],
      v: table(['Orientation of the coil', 'θ', 'Flux'], [['Face-on to B', '0°', 'BA (largest)'], ['Tilted', 'θ', 'BA cos θ'], ['Edge-on to B', '90°', '0']], 'Table of flux for a coil face-on, tilted and edge-on to the field'),
      n: 'Magnetic flux measures how much field passes through an area: B times A times cos theta, where theta is between the field and the normal to the area. Its unit is the weber, one tesla square metre. A coil of N turns links N times this flux. The flux can be changed in three ways: change the field, change the area, or turn the coil. Each of these induces an emf.',
    }),
    sl('concept', 'Faraday’s law of induction', {
      b: r`The magnitude of the induced emf equals the **rate of change of magnetic flux linkage**:
$$\varepsilon = -N\dfrac{d\Phi_B}{dt}$$
The minus sign expresses Lenz’s law (direction). The induced current is $I = \varepsilon/R$ in a circuit of resistance $R$.`,
      ul: ['A steady flux, however large, induces no emf.', 'Faster change, larger emf; more turns, larger emf.'],
      v: fluxPlot,
      n: 'Faraday’s law says the induced emf equals the rate at which the flux linkage changes. The graph shows it clearly: while the flux rises steadily, there is a constant emf; while the flux stays the same, there is none, even though the flux is large; when the flux falls quickly, the emf is larger and opposite in sign. The minus sign in the law carries the direction, which is Lenz’s law.',
    }),
    sl('example', 'Worked example 1: a field switched off', {
      b: r`A coil of 200 turns and area 0.010 m² lies face-on in a field of 0.20 T. The field falls steadily to zero in 0.050 s. Find the induced emf.`,
      ul: [
        r`Step 1 — change in flux per turn: $\Delta\Phi = 0.20 \times 0.010 - 0 = 2.0 \times 10^{-3}$ Wb.`,
        r`Step 2 — $|\varepsilon| = N\dfrac{\Delta\Phi}{\Delta t} = \dfrac{200 \times 2.0 \times 10^{-3}}{0.050} = ${dec(ex1.e, 2)}$ V.`,
        'Step 3 — the direction is such that the induced current tries to keep the flux from falling (Lenz).',
      ],
      v: fluxPlot,
      n: 'Each turn loses a flux of B times A, two milliweber. Two hundred turns lose two hundred times that, and it all happens in one twentieth of a second, so the emf is eight volts. The induced current flows so as to oppose the decrease, trying to keep the original flux going. Doing the same change more slowly would give a smaller emf for a longer time.',
    }),
    sl('example', 'Worked example 2: flux given as a function of time', {
      b: r`The flux through a single loop is $\Phi = (3t^2 + 2t)$ mWb, with $t$ in seconds. Find the induced emf at $t = 2$ s.`,
      ul: [
        r`Step 1 — $\dfrac{d\Phi}{dt} = 6t + 2$ mWb s$^{-1}$.`,
        r`Step 2 — at $t = 2$ s: $6 \times 2 + 2 = ${ex2.e}$ mWb s$^{-1}$.`,
        r`Step 3 — $|\varepsilon| = ${ex2.e}$ mV (1 mWb s$^{-1}$ = 1 mV).`,
      ],
      v: table(['t (s)', 'dΦ/dt (mWb/s)', '|ε| (mV)'], [['0', '2', '2'], ['1', '8', '8'], ['2', '14', '14']], 'Worked table: the rate of change of flux and the emf at 0, 1 and 2 seconds: 2, 8 and 14 millivolts'),
      n: 'When the flux is given as a formula, differentiate it. The rate of change is six t plus two milliweber per second, so at two seconds it is fourteen. One milliweber per second is one millivolt, so the emf is fourteen millivolts. Because the flux grows faster and faster, the emf keeps rising with time.',
    }),
    sl('check', 'Quick check: steady flux', {
      b: 'Decide whether the statement is true or false.',
      v: null,
      chk: 'steady-tf',
      n: 'Recall what Faraday’s law depends on: the flux itself, or its rate of change?',
    }),
    sl('diagram', 'Lenz’s law', {
      b: 'The induced current flows in a direction such that its own magnetic field **opposes the change in flux** that produces it.',
      ul: ['Inward flux increasing → induced current makes outward field (here anticlockwise).', 'Inward flux decreasing → induced current makes inward field (clockwise).', 'It opposes the **change**, not the flux itself.'],
      v: V.lenz,
      n: 'Lenz’s law gives the direction. The induced current always flows so that its own magnetic field fights the change. Here the field into the page is growing, so the loop’s current flows anticlockwise, making a field out of the page that partly cancels the increase. If the inward field were shrinking, the current would flow clockwise to prop it up. It opposes the change, not the field.',
    }),
    sl('diagram', 'Lenz’s law with a moving magnet', {
      b: 'Push the N pole of a magnet towards a coil: the near face of the coil becomes a **north** pole and **repels** the magnet. Pull it away: the near face becomes a **south** pole and **attracts** it.',
      v: V.magnet,
      n: 'Try it with a magnet and a coil. As the north pole approaches, the induced current makes the near face of the coil a north pole too, so the coil pushes back on the magnet. As you pull the magnet away, the near face becomes a south pole and pulls it back. Either way, you have to do work against the coil to move the magnet, and that work becomes the electrical energy of the current.',
    }),
    sl('concept', 'Lenz’s law and conservation of energy', {
      b: 'If the induced current **helped** the change instead of opposing it, the magnet would be pulled in faster, inducing a bigger current, pulling harder still — energy from nothing. Opposition means **work must be done** to keep the change going, and that work appears as electrical energy (and heat in the circuit).',
      v: table(['If the induced current…', 'Then…'], [['opposes the change (Lenz)', 'work is needed; energy is conserved'], ['helped the change', 'motion would speed up by itself: perpetual motion, impossible']], 'Table contrasting an induced current that opposes the change, which conserves energy, with one that helps it, which would give perpetual motion'),
      n: 'Lenz’s law is really conservation of energy. Suppose the induced current helped the motion instead. The magnet would be pulled in faster, the current would grow, and the pull would grow too: you would get ever-increasing electrical energy from nothing. Because the induced current opposes the change, you must keep doing work to move the magnet, and exactly that work becomes the energy in the circuit.',
    }),
    sl('example', 'Worked example 3: finding the direction', {
      b: 'A rectangular loop lies flat on a table, seen from above, in a vertical magnetic field pointing **upwards** (towards you). The field is **decreasing**. Find the direction of the induced current as seen from above.',
      ul: [
        'Step 1 — flux: upwards (towards the viewer), decreasing.',
        'Step 2 — Lenz: the induced field must point **upwards** to oppose the decrease.',
        'Step 3 — right-hand rule: an upward field at the centre needs an **anticlockwise** current as seen from above.',
      ],
      v: V.lenz,
      n: 'Work in three steps. First, which way is the flux and is it growing or shrinking? Here it is upwards and shrinking. Second, Lenz’s law: the induced field must try to keep it, so it points upwards too. Third, the right-hand rule: for a field towards you at the centre, curl your fingers anticlockwise. So the current is anticlockwise when seen from above.',
    }),
    sl('check', 'Quick check: pulling a magnet away', {
      b: 'Choose the behaviour of the coil.',
      v: V.magnet,
      chk: 'pull-mcq',
      n: 'The induced current opposes the change. If the magnet is moving away, what must the coil do to oppose that?',
    }),
    sl('check', 'Quick check: emf from a changing field', {
      b: 'Calculate the induced emf.',
      v: null,
      chk: 'emf-num',
      n: 'Multiply the number of turns, the area and the rate of change of the field.',
    }),
    sl('summary', 'Summary — Part 1', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Magnetic flux', '$\\Phi_B = BA\\cos\\theta$ (Wb)'],
          ['Faraday’s law', '$\\varepsilon = -N\\,d\\Phi_B/dt$'],
          ['Ways to change flux', 'Change B, A or θ'],
          ['Lenz’s law', 'Induced current opposes the change in flux'],
          ['Why', 'Conservation of energy'],
        ],
        'Summary table of magnetic flux, Faraday’s law, ways to change flux and Lenz’s law',
      ),
      n: 'To sum up: magnetic flux is B A cos theta, measured in webers. Whenever the flux linked with a circuit changes, an emf is induced equal to the rate of change of flux linkage. A steady flux induces nothing. The direction is given by Lenz’s law: the induced current opposes the change that causes it, which is a consequence of conservation of energy.',
    }),
    sl('exam-tips', 'Exam tips — Part 1', {
      ul: [
        'Write the flux first, $BA\\cos\\theta$, with θ measured from the **normal** to the coil.',
        'For direction questions use three steps: flux direction, increasing or decreasing, then the right-hand rule.',
        'Say “opposes the **change** in flux”, not “opposes the flux”.',
        'Convert cm² and mWb before substituting.',
      ],
      v: table(['Change', 'Induced field', 'Coil face facing the magnet'], [['N pole approaching', 'Opposes the approach', 'N (repels)'], ['N pole receding', 'Opposes the retreat', 'S (attracts)']], 'Table of Lenz’s law for an approaching and a receding north pole'),
      n: 'Start every induction problem by writing the flux, and measure the angle from the normal to the coil. For directions, go step by step: which way is the flux, is it growing or shrinking, and which current makes an opposing field. Be careful with the wording: the induced current opposes the change in flux, not the flux itself.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Electromagnetic Induction — Part 2: Motional emf and inductance',
  goals: [
    'Derive the emf induced in a rod moving through a magnetic field',
    'Define self-inductance and state the factors it depends on',
    'Define mutual inductance and state the factors it depends on',
  ],
  slides: [
    sl('title', 'Motional emf and inductance', {
      b: 'Part 2 — the emf in a moving conductor, and how coils induce emfs in themselves and in each other.',
      v: flow('LR', [['m', 'Motional emf'], ['r', 'Rotating rod'], ['s', 'Self-inductance'], ['M', 'Mutual inductance']], [['m', 'r'], ['r', 's'], ['s', 'M']], 'Flow of the part: motional emf, rotating rod, self-inductance, mutual inductance'),
      n: 'A conductor moving through a magnetic field has an emf across it, because its free charges are pushed by the magnetic force. That is the principle of every generator. In this part we derive the motional emf, look at a rotating rod, and then meet inductance: the property that makes a coil oppose changes in its own current, and lets one coil induce an emf in another.',
    }),
    sl('diagram', 'Motional emf in a sliding rod', {
      b: r`A rod of length $l$ slides with speed $v$ on rails, perpendicular to a uniform field $B$. The area of the circuit grows at rate $lv$, so
$$\varepsilon = \dfrac{d\Phi}{dt} = \dfrac{d(Blx)}{dt} = Blv$$`,
      ul: ['Charge picture: each free charge in the rod feels $q\\vec v \\times \\vec B$ along the rod, which drives the current.', 'With resistance $R$: $I = Blv/R$.'],
      v: V.rod,
      n: 'A rod sliding along a pair of rails in a magnetic field makes a circuit whose area keeps growing. If the rod is a distance x from the end, the flux is B l x, so its rate of change is B l times dx by dt, which is B l v. Equivalently, every free charge in the moving rod feels a magnetic force q v cross B along the rod, and this force pumps the charges round the circuit.',
    }),
    sl('example', 'Worked example 4: rod, current and force', {
      b: r`A rod 0.50 m long slides at 4.0 m s$^{-1}$ on rails in a field of 0.30 T; the circuit resistance is 2.0 Ω. Find the emf, the current, the force needed to keep the rod moving steadily, and the power.`,
      ul: [
        r`Step 1 — $\varepsilon = Blv = 0.30 \times 0.50 \times 4.0 = ${dec(ex4.e, 2)}$ V; $I = \dfrac{0.60}{2.0} = ${dec(ex4.I, 2)}$ A.`,
        r`Step 2 — magnetic force on the rod $IlB = 0.30 \times 0.50 \times 0.30 = ${dec(ex4.F, 2)}$ N, opposing the motion, so the same push is needed.`,
        r`Step 3 — mechanical power $Fv = 0.045 \times 4.0 = ${dec(ex4.P, 2)}$ W $= I^2R = ${dec(ex4.PR, 2)}$ W.`,
      ],
      v: V.rod,
      n: 'The emf is B l v, zero point six volts, driving zero point three amperes through two ohms. The current in the rod feels a magnetic force I l B of zero point zero four five newton, pointing backwards, so you must push with that force to keep it moving steadily. Your mechanical power, force times speed, is zero point one eight watt, exactly the heat produced in the resistance: energy is conserved.',
    }),
    sl('concept', 'A rotating rod', {
      b: r`A rod of length $l$ rotates with angular speed $\omega$ about one end, in a plane perpendicular to a uniform field $B$. A small element at distance $r$ moves at speed $\omega r$, so
$$\varepsilon = \int_0^l B\,\omega r\,dr = \dfrac{1}{2}B\omega l^2$$`,
      ul: ['The emf is between the centre and the rim (or the ends of the rod).', 'A spinning metal wheel works the same way, each spoke an emf $\\tfrac12 B\\omega l^2$ in parallel.'],
      v: table(['Quantity', 'Effect on ε'], [['ω doubled', '× 2'], ['l doubled', '× 4'], ['B doubled', '× 2']], 'Table of how the emf of a rotating rod changes when angular speed, length or field is doubled'),
      n: 'Now spin a rod about one end in a field at right angles to its plane. Different parts of the rod move at different speeds: the end at omega l and the centre not at all. Adding up B times speed times length for each small piece gives one half B omega l squared. Note the l squared: doubling the length makes the emf four times larger.',
    }),
    sl('example', 'Worked example 5: a rotating rod', {
      b: r`A metal rod 1.0 m long rotates about one end at 20 rad s$^{-1}$ in a plane perpendicular to a uniform field of 0.40 T. Find the emf between its ends.`,
      ul: [
        r`Step 1 — $\varepsilon = \dfrac{1}{2}B\omega l^2 = 0.5 \times 0.40 \times 20 \times 1.0^2 = ${dec(ex5.e, 2)}$ V.`,
        'Step 2 — the average speed of the rod is $\\omega l/2 = 10$ m s$^{-1}$, so $\\varepsilon = B l v_\\text{avg}$ gives the same answer.',
      ],
      v: V.rod,
      n: 'Substitute in one half B omega l squared: half of zero point four times twenty times one gives four volts. A neat check: the average speed along the rod is half the tip speed, ten metres per second, and B l times the average speed also gives four volts.',
    }),
    sl('check', 'Quick check: motional emf', {
      b: 'Find the emf of a moving rod.',
      v: V.rod,
      chk: 'rod-num',
      n: 'Use emf equals B l v with all quantities in SI units.',
    }),
    sl('diagram', 'Self-induction', {
      b: r`When the current in a coil changes, its own flux changes and an emf is induced in it that **opposes the change in current** (a back emf):
$$N\Phi = LI,\qquad \varepsilon = -L\dfrac{dI}{dt}$$
$L$ is the **self-inductance**, unit **henry** (H) $= 1$ V s A$^{-1}$.`,
      v: V.self,
      n: 'A coil links its own magnetic flux. If its current changes, that flux changes, so the coil induces an emf in itself, opposing the change in current. The flux linkage is proportional to the current, N phi equals L I, and the back emf is minus L d I by dt. The constant L is the self-inductance, measured in henries. Inductance acts like inertia for current.',
    }),
    sl('concept', 'Inductance of a long solenoid', {
      b: r`For a long solenoid of $N$ turns, length $l$, cross-section $A$ ($n = N/l$), field $B = \mu_0 nI$, flux linkage $N BA$:
$$L = \dfrac{\mu_0 N^2 A}{l} = \mu_0 n^2 A l$$
With a core of relative permeability $\mu_r$: $L = \mu_r\mu_0 n^2 A l$.`,
      ul: ['L depends only on geometry (turns, area, length) and the core, not on the current.', 'Energy stored: $U = \\tfrac12 LI^2$ (in the magnetic field).'],
      v: table(['Change', 'Effect on L'], [['Turns doubled (same length)', '× 4'], ['Area doubled', '× 2'], ['Iron core of μr', '× μr']], 'Table of how the self-inductance of a solenoid changes with turns, area and core'),
      n: 'For a long solenoid, multiply the field mu nought n I by the area and the number of turns to get the flux linkage, then divide by I. The result is mu nought N squared A over l. Self-inductance depends only on how the coil is built and what is inside it: doubling the turns makes it four times larger, and an iron core multiplies it by the relative permeability. The current does not affect L.',
    }),
    sl('example', 'Worked example 6: a solenoid’s back emf', {
      b: r`An air-cored solenoid has 500 turns, length 25 cm and cross-section 4.0 cm². Find its self-inductance, and the back emf when its current rises steadily from 0 to 2.0 A in 0.010 s.`,
      ul: [
        r`Step 1 — $L = \dfrac{\mu_0 N^2 A}{l} = \dfrac{4\pi \times 10^{-7} \times 500^2 \times 4.0 \times 10^{-4}}{0.25} \approx ${sci(ex6.L, 3)}$ H (about 0.50 mH).`,
        r`Step 2 — $|\varepsilon| = L\dfrac{\Delta I}{\Delta t} = 5.03 \times 10^{-4} \times \dfrac{2.0}{0.010} \approx ${dec(ex6.e, 2)}$ V.`,
      ],
      v: V.self,
      n: 'Put the numbers in mu nought N squared A over l, converting four square centimetres to four times ten to the minus four square metre and the length to zero point two five metre. The inductance is about half a millihenry. The current rises by two amperes in a hundredth of a second, two hundred amperes per second, so the back emf is about zero point one volt.',
    }),
    sl('diagram', 'Mutual induction', {
      b: r`A changing current in one coil induces an emf in a nearby coil. The flux linked with coil 2 is proportional to the current in coil 1:
$$N_2\Phi_2 = M I_1,\qquad \varepsilon_2 = -M\dfrac{dI_1}{dt}$$
$M$ is the **mutual inductance** (henry); $M_{12} = M_{21}$.`,
      v: V.mutual,
      n: 'Place two coils side by side. A changing current in the first changes the flux through the second, so an emf appears in the second coil. The flux linked with coil two is proportional to the current in coil one, with the constant M, the mutual inductance. The emf in coil two is minus M times the rate of change of current in coil one. The same M works the other way round.',
    }),
    sl('concept', 'What mutual inductance depends on', {
      b: r`For a short solenoid (radius $r_1$, $n_1$ turns per metre) inside a long one ($n_2$ turns per metre), over a common length $l$:
$$M = \mu_0 n_1 n_2 \pi r_1^2 l$$`,
      ul: ['Number of turns of both coils.', 'Their sizes and **separation**, and their **relative orientation** (coaxial gives the most linkage; perpendicular axes give little).', 'The core: an iron core multiplies M by $\\mu_r$.'],
      v: table(['Arrangement', 'Mutual inductance'], [['Coaxial, close together', 'Large'], ['Far apart', 'Small'], ['Axes at right angles', 'Very small'], ['Common iron core', 'Very large (× μr)']], 'Table of mutual inductance for different arrangements of two coils'),
      n: 'For one solenoid wound inside another, all the flux of the inner coil’s area links both, and M is mu nought n one n two times the inner area times the common length. In general, mutual inductance grows with the numbers of turns and the area shared, falls as the coils are moved apart or turned so that their axes are at right angles, and is multiplied greatly by a common iron core, as in a transformer.',
    }),
    sl('example', 'Worked example 7: an emf in the secondary', {
      b: r`Two coils have a mutual inductance of 0.15 H. The current in the first falls steadily from 4.0 A to zero in 0.020 s. Find the emf induced in the second.`,
      ul: [
        r`Step 1 — $\dfrac{\Delta I_1}{\Delta t} = \dfrac{4.0}{0.020} = 200$ A s$^{-1}$.`,
        r`Step 2 — $|\varepsilon_2| = M\dfrac{\Delta I_1}{\Delta t} = 0.15 \times 200 = ${dec(ex7.e, 2)}$ V.`,
        'Step 3 — direction: the induced current in coil 2 tries to keep the flux from falling (Lenz).',
      ],
      v: V.mutual,
      n: 'The current falls by four amperes in two hundredths of a second, a rate of two hundred amperes per second. Multiply by the mutual inductance, zero point one five henry, to get thirty volts. A fast change in a coupled coil can produce large voltages, which is why switching off big inductive circuits can cause sparks.',
    }),
    sl('check', 'Quick check: doubling the turns', {
      b: 'How does the self-inductance change?',
      v: null,
      chk: 'Lturns-mcq',
      n: 'Self-inductance of a solenoid is proportional to the square of the number of turns, for a fixed length and area.',
    }),
    sl('check', 'Quick check: emf in a coupled coil', {
      b: 'Judge the assertion and the reason.',
      v: V.mutual,
      chk: 'steadyM-ar',
      n: 'Think about what happens in the second coil when the current in the first coil is steady.',
    }),
    sl('summary', 'Summary — Part 2', {
      b: 'Key results:',
      v: table(
        ['Idea', 'Result'],
        [
          ['Sliding rod', '$\\varepsilon = Blv$; force $IlB$ opposes motion'],
          ['Rotating rod', '$\\varepsilon = \\tfrac12 B\\omega l^2$'],
          ['Self-inductance', '$N\\Phi = LI$, $\\varepsilon = -L\\,dI/dt$'],
          ['Solenoid', '$L = \\mu_0 n^2 Al$ ($\\times \\mu_r$ with a core)'],
          ['Mutual inductance', '$N_2\\Phi_2 = MI_1$, $\\varepsilon_2 = -M\\,dI_1/dt$'],
          ['Coaxial solenoids', '$M = \\mu_0 n_1 n_2 \\pi r_1^2 l$'],
        ],
        'Summary table of motional emf, rotating rod, self-inductance, solenoid inductance and mutual inductance',
      ),
      n: 'To sum up: a rod moving through a field has an emf B l v, and the magnetic force on the induced current opposes the motion, so the work done becomes electrical energy. A rotating rod gives one half B omega l squared. A coil opposes changes in its own current with a back emf minus L d I by dt, and one coil induces an emf in another through the mutual inductance M. Both depend on turns, size, arrangement and core.',
    }),
    sl('exam-tips', 'Exam tips — Part 2', {
      ul: [
        'Motional-emf derivation: write $\\Phi = Blx$, differentiate, get $Blv$; mention the opposing force for Lenz.',
        'Rotating rod: integrate $B\\omega r\\,dr$ from 0 to $l$.',
        'L and M depend on geometry and core, **not** on the current.',
        'Units: henry = V s A⁻¹ = Wb A⁻¹.',
      ],
      v: table(['Asked', 'Write'], [['Motional emf', 'Φ = Blx → ε = Blv'], ['Factors for L', 'N², A, l, μr'], ['Factors for M', 'Turns, area, separation, orientation, core']], 'Table of quick answer patterns for motional emf and the factors for self and mutual inductance'),
      n: 'Examiners like the motional-emf derivation from the changing area, followed by the remark that the magnetic force opposes the motion. For the rotating rod, show the integration. When asked what inductance depends on, list the geometry and the core, and say clearly that it does not depend on the current. And remember a henry is a volt second per ampere.',
    }),
  ],
});
