// ICSE 10 Physics ch02 Work, Energy and Power — two decks: Part 1 (t01–t03) work, units of work and energy, power;
// Part 2 (t04–t06) potential and kinetic energy with derivations, other forms and conversions, conservation of energy
// (free fall, simple pendulum). Numbers in worked examples are computed here.
import { sl, deck, table, flow, svgV, plot, r } from './lib.mjs';
import { FORCE_ANGLE, PENDULUM } from './svgs.mjs';

const f = (x, n = 3) => String(Number(x.toPrecision(n)));
const V = {
  angle: svgV(FORCE_ANGLE, 'A box pulled by a force at an angle, resolved into a horizontal component that does work and a vertical component that does none'),
  pend: svgV(PENDULUM, 'A simple pendulum with all potential energy at the two extreme positions and all kinetic energy at the mean position'),
};
// Free fall of 2 kg from 20 m, g = 10: U = 20h, K = 400 − 20h, total 400 J.
const m = 2;
const H = 20;
const g = 10;
const E = m * g * H;
const fallPlot = plot(
  {
    x: { min: 0, max: H, label: 'height above ground h (m)' },
    y: { min: 0, max: 450, label: 'energy (J)' },
    functions: [
      { expr: `${m * g}x`, label: 'potential energy U = mgh' },
      { expr: `${E} - ${m * g}x`, label: 'kinetic energy K' },
      { expr: `${E}`, label: 'total U + K' },
    ],
  },
  'Energy of a 2 kilogram ball falling from 20 metres against height: potential energy falls in a straight line from 400 joules at the top to zero at the ground, kinetic energy rises from zero to 400 joules, and their total stays at 400 joules',
  'U + K = 400 J at every height (air resistance neglected).',
);

export const deck1 = deck({
  part: 1,
  title: 'Work, Energy and Power — Part 1: Work, units and power',
  goals: [
    'Calculate work done using W = F s cos θ',
    'Explain when no work is done',
    'Convert between joule, erg, calorie, kilowatt hour and electron volt',
    'Calculate power and convert between watt and horsepower',
  ],
  slides: [
    sl('title', 'Hard work or no work?', {
      b: 'Part 1 — in physics, work is done only when a force moves its point of application. Holding a heavy bag still may tire you, but it does no work on the bag.',
      v: table(['Situation', 'Work done on the object?'], [['Lifting a bucket from a well', 'Yes'], ['Holding a bag still at shoulder height', 'No (no displacement)'], ['Carrying a bag along a level corridor', 'No (force ⟂ displacement)'], ['Pushing a stalled car that moves 5 m', 'Yes']], 'Table of four everyday situations and whether work is done'),
      n: 'Namaste! In everyday speech, work means effort. In physics, work is done only when a force makes something move in the direction of the force. Holding a heavy bag still tires your arms, but because the bag does not move, no work is done on it. In this part we learn to calculate work, energy and power.',
    }),
    sl('diagram', 'Work done by a force', {
      b: r`**Work** is done when a force displaces a body: $W = F\,s\cos\theta$, where $\theta$ is the angle between the force and the displacement. Only the component $F\cos\theta$ along the displacement does work. **Special cases:** $\theta = 0^\circ$: $W = Fs$ (maximum); $\theta = 90^\circ$: $W = 0$ (a coolie carrying a load on his head across a level platform does no work against gravity); $\theta = 180^\circ$: $W = -Fs$ (friction does negative work). **Work against gravity:** lifting a mass $m$ through height $h$: $W = mgh$. Work is a scalar.`,
      v: V.angle,
      n: 'Work equals the force times the displacement times the cosine of the angle between them. Only the part of the force along the motion does work. If the force is along the motion, the work is simply force times distance. If the force is at right angles to the motion, no work is done. And when you lift a mass, the work done against gravity is mass times g times height.',
    }),
    sl('example', 'Worked example: pulling at an angle', {
      b: r`**Problem.** A child pulls a toy cart 8 m along the floor with a force of 15 N along a string at $60^\circ$ to the floor. Find the work done. How much work would the same force do if the string were horizontal?

**At $60^\circ$:** $W = F s \cos\theta = 15 \times 8 \times \cos 60^\circ = 15 \times 8 \times 0.5 = ${f(15 * 8 * 0.5)}\ \text{J}$.

**Horizontal:** $W = 15 \times 8 = ${15 * 8}\ \text{J}$ — the pull at an angle wastes part of the force lifting rather than moving the cart.`,
      v: table(['Angle of string', 'cos θ', 'Work (J)'], [['0°', '1', String(15 * 8)], ['60°', '0.5', f(15 * 8 * 0.5)], ['90°', '0', '0']], 'Table of work done by a 15 newton force over 8 metres at three angles'),
      n: 'Only the part of the pull along the floor does work. At sixty degrees that part is half the force, so the work is fifteen times eight times one half, which is sixty joules. With the string flat along the floor, the whole force acts along the motion and the work doubles to a hundred and twenty joules.',
    }),
    sl('check', 'Quick check: work', {
      b: 'Decide whether, and how much, work is done.',
      n: 'Quick check. Work needs a displacement with a component along the force.',
      chk: 'work-mcq',
    }),
    sl('concept', 'Energy and its units', {
      b: r`**Energy** is the capacity to do work; it is measured in the same units as work. **Joule (J):** work done when a force of 1 N moves its point of application 1 m along the force. **Erg** (cgs): 1 dyne × 1 cm; $1\ \text{J} = 10^{7}\ \text{erg}$. **Calorie:** $1\ \text{cal} \approx 4.2\ \text{J}$. **Kilowatt hour (kW h):** energy used by a 1 kW device in 1 h; $1\ \text{kW h} = 3.6 \times 10^{6}\ \text{J}$. **Electron volt (eV):** energy gained by an electron through 1 V; $1\ \text{eV} = 1.6 \times 10^{-19}\ \text{J}$.`,
      v: table(['Unit', 'In joules', 'Used for'], [['1 erg', '10⁻⁷ J', 'Tiny amounts (cgs)'], ['1 calorie', '4.2 J', 'Heat, food energy'], ['1 kW h', '3.6 × 10⁶ J', 'Electricity bills'], ['1 eV', '1.6 × 10⁻¹⁹ J', 'Atoms and electrons']], 'Table of units of energy with their values in joules and typical uses'),
      n: 'Energy is the ability to do work, so it has the same units as work. The joule is the SI unit. Smaller units include the erg, a ten millionth of a joule, and the electron volt, used for atoms. Larger units include the calorie for heat and the kilowatt hour, which appears on electricity bills and equals three point six million joules.',
    }),
    sl('example', 'Worked example: converting units', {
      b: r`**Problem.** Convert (a) 2.5 kW h into joules, (b) 840 J into calories, and (c) 0.3 J into ergs.

**(a)** $2.5 \times 3.6 \times 10^{6} = ${f(2.5 * 3.6, 2)} \times 10^{6}\ \text{J}$.

**(b)** $840 \div 4.2 = ${f(840 / 4.2)}\ \text{cal}$.

**(c)** $0.3 \times 10^{7} = 3 \times 10^{6}\ \text{erg}$.`,
      v: flow('LR', [['a', 'kW h'], ['b', 'J'], ['c', 'erg'], ['d', 'cal']], [['a', 'b', '× 3.6 × 10⁶'], ['b', 'c', '× 10⁷'], ['b', 'd', '÷ 4.2']], 'Flow of conversion factors from kilowatt hours to joules and from joules to ergs and calories'),
      n: 'Always go through joules. Two and a half kilowatt hours is two and a half times three point six million, which is nine million joules. Eight hundred and forty joules divided by four point two gives two hundred calories. And nought point three joules times ten million gives three million ergs.',
    }),
    sl('check', 'Quick check: units of energy', {
      b: 'Convert between units of energy.',
      n: 'Quick check. One kilowatt hour is three point six million joules.',
      chk: 'unit-mcq',
    }),
    sl('concept', 'Power', {
      b: r`**Power** is the rate of doing work: $P = \dfrac{W}{t}$. SI unit: **watt (W)** = 1 J s⁻¹. Bigger units: $1\ \text{kW} = 10^{3}\ \text{W}$, $1\ \text{MW} = 10^{6}\ \text{W}$, $1\ \text{GW} = 10^{9}\ \text{W}$. **Horsepower:** $1\ \text{hp} = 746\ \text{W}$. **Energy vs power:** two students of equal weight climbing the same stairs do the same work (gain the same energy), but the one who climbs faster has more power.`,
      v: table(['Quantity', 'Meaning', 'SI unit'], [['Work / energy', 'How much is done', 'Joule'], ['Power', 'How fast it is done', 'Watt'], ['kW h', 'Energy (power × time)', '3.6 × 10⁶ J'], ['Horsepower', 'Power', '746 W']], 'Table comparing work, energy and power and their units'),
      n: 'Power tells us how quickly work is done. It equals work divided by time and is measured in watts, where one watt is one joule per second. Engines are sometimes rated in horsepower, which is seven hundred and forty six watts. Two equal-weight students climbing the same stairs do the same work, but the faster one develops more power.',
    }),
    sl('example', 'Worked example: climbing stairs', {
      b: r`**Problem.** Riya (mass 50 kg) climbs 30 steps, each 0.2 m high, in 15 s. Take $g = 10\ \text{m s}^{-2}$. Find (a) the work done against gravity, (b) her power, and (c) her power in horsepower.

**(a)** $h = 30 \times 0.2 = ${f(30 * 0.2)}\ \text{m}$; $W = mgh = 50 \times 10 \times ${f(30 * 0.2)} = ${50 * 10 * 6}\ \text{J}$.

**(b)** $P = W/t = ${50 * 10 * 6} \div 15 = ${f(3000 / 15)}\ \text{W}$.

**(c)** $${f(3000 / 15)} \div 746 = ${f(200 / 746, 2)}\ \text{hp}$.`,
      v: table(['Quantity', 'Value'], [['Height climbed', '6 m'], ['Work done', '3000 J'], ['Power', '200 W'], ['Power in hp', 'about 0.27 hp']], 'Table of the stair-climbing results'),
      n: 'Thirty steps of nought point two metres take Riya six metres up. The work against gravity is her mass times g times height: fifty times ten times six, which is three thousand joules. Doing this in fifteen seconds means a power of two hundred watts, a little over a quarter of a horsepower.',
    }),
    sl('check', 'Quick check: power', {
      b: 'Calculate or compare power.',
      n: 'Quick check. Power is work divided by time.',
      chk: 'power-mcq',
    }),
    sl('summary', 'Summary: Part 1', {
      ul: [
        'W = F s cos θ; W = 0 when θ = 90°; W = mgh against gravity.',
        'Energy = capacity to do work; units J, erg, cal, kW h, eV.',
        '1 J = 10⁷ erg; 1 cal ≈ 4.2 J; 1 kW h = 3.6 × 10⁶ J; 1 eV = 1.6 × 10⁻¹⁹ J.',
        'P = W/t; 1 W = 1 J s⁻¹; 1 hp = 746 W.',
      ],
      v: table(['Quantity', 'Formula'], [['Work', 'F s cos θ'], ['Work against gravity', 'mgh'], ['Power', 'W / t']], 'Summary table of formulae in Part 1'),
      n: 'Let us sum up Part 1. Work equals force times displacement times the cosine of the angle between them, and no work is done when they are at right angles. Energy is the ability to do work and has several units, all convertible to joules. Power is the rate of doing work, measured in watts.',
    }),
    sl('exam-tips', 'Exam tips: Part 1', {
      ul: [
        'Write the formula, substitute with units, then give the answer with its unit.',
        'Convert grams to kilograms and centimetres to metres first.',
        'kW h is a unit of energy, not power.',
        'For “no work done”, give the reason: zero displacement or force perpendicular to displacement.',
      ],
      v: table(['Slip', 'Fix'], [['kW h is a unit of power', 'It is a unit of energy'], ['Work = F × s at any angle', 'Use F s cos θ'], ['1 hp = 1000 W', '1 hp = 746 W']], 'Table of three common slips in Part 1 and their fixes'),
      n: 'Some tips. In every calculation, write the formula, substitute with units and give the unit of the answer. Change grams to kilograms and centimetres to metres first. Remember that the kilowatt hour measures energy, not power. And when no work is done, say why: either nothing moved, or the force was at right angles to the motion.',
    }),
  ],
});

export const deck2 = deck({
  part: 2,
  title: 'Work, Energy and Power — Part 2: Mechanical energy and its conservation',
  goals: [
    'Derive U = mgh and K = ½mv²',
    'Solve problems on potential and kinetic energy',
    'Identify energy conversions in everyday devices',
    'Show that U + K is constant for a freely falling body and describe a pendulum’s energy changes',
  ],
  slides: [
    sl('title', 'Stored and moving energy', {
      b: 'Part 2 — a raised hammer stores energy because of its position; a moving hammer has energy because of its motion. Energy changes form, but the total stays the same.',
      v: table(['Object', 'Main form of mechanical energy'], [['Water held behind a dam', 'Potential energy'], ['A moving cricket ball', 'Kinetic energy'], ['A wound spring of a toy car', 'Potential (elastic) energy'], ['A swinging pendulum', 'Changes between both']], 'Table of four objects and their main form of mechanical energy'),
      n: 'Water held high behind a dam can turn turbines when released; it has energy because of its position. A cricket ball flying through the air has energy because of its motion. In this part we calculate these two forms of mechanical energy and see that, as one turns into the other, the total stays constant.',
    }),
    sl('concept', 'Potential energy: U = mgh', {
      b: r`**Potential energy** is the energy a body has because of its **position or configuration** (a raised stone, a stretched bow). **Gravitational potential energy** of a mass $m$ at height $h$: the work done to raise it against its weight $mg$ is $W = F \times s = mg \times h$, and this work is stored, so $U = mgh$. It is measured from a chosen reference level (usually the ground).`,
      v: table(['Mass', 'Height', 'U = mgh (g = 10 m s⁻²)'], [['2 kg', '5 m', '100 J'], ['0.5 kg', '20 m', '100 J'], ['60 kg', '3 m', '1800 J']], 'Table of three masses at different heights and their gravitational potential energies'),
      n: 'Potential energy is energy stored because of position or shape, like a raised stone or a stretched bow. To lift a mass through a height, you must push up with a force equal to its weight, mass times g, through that height. The work done, mass times g times height, is stored as gravitational potential energy.',
    }),
    sl('concept', 'Kinetic energy: K = ½mv²', {
      b: r`**Kinetic energy** is the energy of a body **due to its motion**. **Derivation:** a force $F$ accelerates a mass $m$ from rest to speed $v$ over distance $s$. From $v^{2} = u^{2} + 2as$ with $u = 0$: $s = \dfrac{v^{2}}{2a}$. Work done $W = F s = ma \times \dfrac{v^{2}}{2a} = \tfrac{1}{2}mv^{2}$, stored as $K = \tfrac{1}{2}mv^{2}$. Doubling $v$ makes $K$ four times as large. Forms: **translational** (moving along), **rotational** (spinning wheel), **vibrational** (atoms in a solid).`,
      v: table(['Change', 'Effect on K'], [['Mass doubled', 'K doubled'], ['Speed doubled', 'K × 4'], ['Speed halved', 'K ÷ 4']], 'Table of how kinetic energy changes when mass or speed changes'),
      n: 'Kinetic energy is the energy of motion. If a steady force speeds a mass up from rest, the work it does turns out to be half times mass times speed squared, and this becomes the kinetic energy. Because speed is squared, doubling the speed makes the kinetic energy four times larger. A body can move along, spin or vibrate, giving three forms of kinetic energy.',
    }),
    sl('example', 'Worked example: potential and kinetic energy', {
      b: r`**Problem.** A 0.15 kg cricket ball is thrown at 20 m s⁻¹. (a) Find its kinetic energy. (b) How much would its kinetic energy be at 10 m s⁻¹? (c) To what height could this kinetic energy (at 20 m s⁻¹) raise the ball if it all became potential energy? ($g = 10\ \text{m s}^{-2}$)

**(a)** $K = \tfrac{1}{2} \times 0.15 \times 20^{2} = ${f(0.5 * 0.15 * 400)}\ \text{J}$.

**(b)** Speed halved, so $K = ${f(0.5 * 0.15 * 400)} \div 4 = ${f(0.5 * 0.15 * 100)}\ \text{J}$.

**(c)** $mgh = 30$, so $h = 30 \div (0.15 \times 10) = ${f(30 / 1.5)}\ \text{m}$.`,
      v: table(['Quantity', 'Value'], [['K at 20 m s⁻¹', '30 J'], ['K at 10 m s⁻¹', '7.5 J'], ['Height reached', '20 m']], 'Table of the cricket ball results'),
      n: 'Half times nought point one five times twenty squared gives thirty joules of kinetic energy. At half the speed the kinetic energy is a quarter, seven and a half joules. If all thirty joules became potential energy, the ball could rise until mass times g times height equals thirty, which is twenty metres.',
    }),
    sl('check', 'Quick check: kinetic energy', {
      b: 'Predict how kinetic energy changes.',
      n: 'Quick check. Kinetic energy depends on the square of the speed.',
      chk: 'ke-mcq',
    }),
    sl('concept', 'Other forms of energy and conversions', {
      b: 'Besides mechanical energy there are **heat, light, sound, chemical, electrical, nuclear** and **magnetic** energy. Devices **convert** energy from one form to another; some is always wasted, usually as heat.',
      v: table(['Device', 'Energy in', 'Useful energy out'], [['Cell / battery', 'Chemical', 'Electrical'], ['Loudspeaker', 'Electrical', 'Sound'], ['Solar cell', 'Light', 'Electrical'], ['Electric heater', 'Electrical', 'Heat'], ['Microphone', 'Sound', 'Electrical'], ['Electric motor', 'Electrical', 'Mechanical']], 'Table of six devices with their input and useful output energy'),
      n: 'Energy comes in many forms: heat, light, sound, chemical, electrical and nuclear, besides mechanical. Devices change energy from one form to another. A battery turns chemical energy into electrical energy; a loudspeaker turns electrical energy into sound; a solar cell turns light into electrical energy; and a heater turns electrical energy into heat.',
    }),
    sl('example', 'Worked example: tracing energy changes', {
      b: '**Problem.** Trace the energy changes in (a) a hydroelectric power station, (b) a torch, and (c) a person climbing stairs after eating.\n\n**(a)** Potential energy of stored water → kinetic energy of falling water → kinetic energy of turbine → electrical energy.\n\n**(b)** Chemical (cells) → electrical → light (and some heat).\n\n**(c)** Chemical (food) → mechanical (muscles) → potential energy of the body (and heat).',
      v: flow('LR', [['a', 'PE of water'], ['b', 'KE of water'], ['c', 'KE of turbine'], ['d', 'Electrical energy']], [['a', 'b'], ['b', 'c'], ['c', 'd']], 'Flow of energy changes in a hydroelectric power station'),
      n: 'Follow the energy step by step. Water stored high in a dam has potential energy, which becomes kinetic energy as it falls, spins the turbine, and is turned into electrical energy by the generator. In a torch, chemical energy in the cells becomes electrical energy and then light. When you climb stairs, energy from food is turned into potential energy of your body.',
    }),
    sl('check', 'Quick check: energy conversions', {
      b: 'Identify the energy change in a device.',
      n: 'Quick check. Ask what form goes in and what useful form comes out.',
      chk: 'convert-mcq',
    }),
    sl('concept', 'Conservation of energy; free fall', {
      b: r`**Principle of conservation of energy:** energy can neither be created nor destroyed; it can only change from one form to another, and the total energy of an isolated system stays constant. **Free fall** (air resistance neglected): as a body falls, $U$ decreases and $K$ increases by the same amount, so $U + K = mgH$ at every height. A 2 kg ball dropped from 20 m: total $= ${E}\ \text{J}$ throughout.`,
      v: fallPlot,
      n: 'Energy cannot be made or destroyed, only changed from one form to another. For a falling ball, potential energy is lost and exactly the same amount of kinetic energy is gained. So the total stays the same at every height. A two kilogram ball dropped from twenty metres has four hundred joules at the top, all potential, and four hundred joules just before landing, all kinetic.',
    }),
    sl('example', 'Worked example: energy at three heights', {
      b: r`**Problem.** A 2 kg ball is dropped from 20 m ($g = 10\ \text{m s}^{-2}$). Find $U$, $K$ and $U + K$ (a) at the top, (b) after falling 5 m, (c) just before it hits the ground, and its speed at (c).

**(a)** $U = 2 \times 10 \times 20 = ${E}\ \text{J}$, $K = 0$; total ${E} J.

**(b)** $h = 15\ \text{m}$: $U = ${m * g * 15}\ \text{J}$; $v^{2} = 2 \times 10 \times 5 = 100$, $K = \tfrac{1}{2} \times 2 \times 100 = ${0.5 * 2 * 100}\ \text{J}$; total ${m * g * 15 + 100} J.

**(c)** $U = 0$, $K = ${E}\ \text{J}$; $\tfrac{1}{2} \times 2 \times v^{2} = ${E}$, so $v = ${f(Math.sqrt(E))}\ \text{m s}^{-1}$.`,
      v: table(['Position', 'U (J)', 'K (J)', 'U + K (J)'], [['Top (20 m)', String(E), '0', String(E)], ['15 m', String(m * g * 15), '100', String(E)], ['Ground', '0', String(E), String(E)]], 'Table of potential, kinetic and total energy of the falling ball at three heights'),
      n: 'At the top the ball has four hundred joules, all potential. After falling five metres it is at fifteen metres, with three hundred joules of potential energy; its speed squared is a hundred, so it has a hundred joules of kinetic energy. The total is still four hundred. Just before landing all four hundred joules are kinetic, so the speed is twenty metres per second.',
    }),
    sl('diagram', 'The simple pendulum', {
      b: 'In a swinging pendulum, at the **extreme positions** the bob is momentarily at rest at its highest point: energy is **all potential**. At the **mean position** it is lowest and fastest: energy is **all kinetic**. In between it is partly each. The total stays constant; in practice air resistance slowly converts it to heat, so the swings die away.',
      v: V.pend,
      n: 'A pendulum shows energy changing back and forth. At either end of its swing, the bob stops for an instant at its highest point, so all its energy is potential. At the middle it is lowest and moving fastest, so all its energy is kinetic. In a real pendulum, air resistance slowly turns the energy into heat, and the swings get smaller.',
    }),
    sl('check', 'Quick check: conservation of energy', {
      b: 'Apply conservation of mechanical energy.',
      n: 'Quick check. Potential energy lost equals kinetic energy gained.',
      chk: 'conserve-mcq',
    }),
    sl('summary', 'Summary: Part 2', {
      ul: [
        'U = mgh (energy of position); K = ½mv² (energy of motion); both derived from W = F s.',
        'Kinetic energy: translational, rotational, vibrational.',
        'Devices convert energy; some is always lost as heat.',
        'Conservation of energy: total constant; for free fall U + K = mgH.',
        'Pendulum: all PE at the extremes, all KE at the mean position.',
      ],
      v: table(['Formula', 'Meaning'], [['U = mgh', 'Potential energy'], ['K = ½mv²', 'Kinetic energy'], ['U + K = constant', 'Free fall, no air resistance']], 'Summary table of formulae in Part 2'),
      n: 'Let us sum up Part 2. Potential energy, mass times g times height, depends on position; kinetic energy, half mass times speed squared, depends on motion. Devices change energy from one form to another. The total energy is always conserved, so for a falling body potential plus kinetic energy stays constant, and a pendulum trades one for the other.',
    }),
    sl('exam-tips', 'Exam tips: Part 2', {
      ul: [
        'Square the speed before multiplying in K = ½mv².',
        'For “speed on reaching the ground”, use mgh = ½mv² — the mass cancels.',
        'In derivations, state the starting formula (W = F s) and the equation of motion used.',
        'Only translational K and U are examined numerically.',
      ],
      v: table(['Slip', 'Fix'], [['K = ½ × 2 × 20 = 20 J', 'K = ½ × 2 × 20² = 400 J'], ['Total energy rises as the ball falls', 'It stays constant'], ['Pendulum fastest at the ends', 'Fastest at the mean position']], 'Table of three common slips in Part 2 and their fixes'),
      n: 'Final tips. Always square the speed in the kinetic energy formula. To find the speed of a falling body at the ground, equate mass times g times height to half mass times speed squared; the mass cancels. In derivations, show which equation you start from. And remember that only translational kinetic and potential energy are asked in numericals.',
    }),
  ],
});
