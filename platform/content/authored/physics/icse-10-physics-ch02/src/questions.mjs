// ICSE 10 Physics ch02 Work, Energy and Power — question bank (ICSE 2027 specimen style).
// Every numerical value is computed here and asserted by a re-solve check. MCQ keys are placed by the builder. g = 10 m s⁻².
import { mk, add, r, near } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const f = (x, n = 3) => String(Number(x.toPrecision(n)));
const g = 10;

// ---------------------------------------------------------------- t01 work
add('work-mcq', mcq({
  stem: 'A porter carries a 20 kg suitcase on his head and walks 50 m along a level platform at steady speed. The work he does against gravity on the suitcase is:',
  right: 'zero',
  wrong: ['10 000 J', '1000 J', '200 J'],
  sol: 'His upward force is perpendicular to the horizontal displacement: W = F s cos 90° = 0 — option (@K).',
  d: 2, c: 'application', t: [1],
}));
const w1 = 25 * 4 * Math.cos(Math.PI / 3);
add('angle-mcq', mcq({
  stem: 'A force of 25 N pulls a sledge 4 m along level snow through a rope at 60° to the ground. The work done by the force is:',
  right: `${f(w1)} J`,
  wrong: ['100 J', '86.6 J', '25 J'],
  sol: `$W = F s \\cos\\theta = 25 \\times 4 \\times 0.5 = ${f(w1)}$ J — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => near(w1, 50) || 'W');
add('neg-mcq', mcq({
  stem: 'A book slides across a table and comes to rest. The work done on it by friction is:',
  right: 'negative, because friction acts opposite to the displacement',
  wrong: ['positive, because friction acts along the displacement', 'zero, because the book stops', 'zero, because friction is perpendicular to the motion'],
  sol: 'θ = 180°, cos θ = −1 — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('orbit-mcq', mcq({
  stem: 'A satellite moves in a circular orbit round the Earth. The work done on it by the Earth’s gravitational pull in one revolution is:',
  right: 'zero, because the pull is always perpendicular to the satellite’s motion',
  wrong: ['positive, because gravity pulls it inwards', 'negative, because gravity slows it down', 'equal to its kinetic energy'],
  sol: 'Centripetal force ⟂ velocity at every instant — option (@K).',
  d: 3, c: 'analysis', t: [1],
}));
const w2 = 5 * g * 2;
add('lift-num', num({
  stem: 'A 5 kg bag of rice is lifted from the floor onto a shelf 2 m high. How much work (in J) is done against gravity? (g = 10 m s⁻²)',
  value: w2, tol: 0, unit: 'J',
  sol: `$W = mgh = 5 \\times 10 \\times 2 = ${w2}$ J.`,
  scheme: [[`${w2} J`, 1]],
  d: 1, c: 'application', t: [1],
}), () => w2 === 100 || 'W');
const w3 = 200 * 3 * Math.cos((60 * Math.PI) / 180);
add('mower-num', num({
  stem: 'A gardener pushes a lawn mower with a force of 200 N along its handle, which makes 60° with the ground, and moves it 3 m. Find the work done (in J).',
  value: w3, tol: 0.5, unit: 'J',
  sol: `$W = F s \\cos 60^\\circ = 200 \\times 3 \\times 0.5 = ${f(w3)}$ J.`,
  scheme: [[`${f(w3)} J`, 1]],
  d: 2, c: 'application', t: [1],
}), () => near(w3, 300) || 'W');
add('work-ar', ar({
  a: 'A boy pushing hard against a wall that does not move does no work on the wall.',
  r: 'Work is done only when the point of application of a force moves.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 1, c: 'understanding', t: [1],
}));
add('work-tf', tf({
  stem: 'Work is a vector quantity because force and displacement are both vectors.',
  key: 'f',
  sol: 'False: work is a scalar (product of force, displacement and cos θ).',
  d: 2, c: 'understanding', t: [1],
}));
add('work-fill', fill({
  stem: 'No work is done when the force acts at an angle of ___ degrees to the displacement.',
  acc: [['90', 'ninety']],
  sol: '**90°**.',
  d: 1, c: 'recall', t: [1],
}));
add('work-short2', short({
  marks: 2,
  stem: 'State the formula for work done when a force F acts at an angle θ to the displacement s. Hence explain why a coolie carrying a load on his head along a level road does no work against gravity.',
  model: r`$W = F s \cos\theta$. His upward force on the load is vertical while the displacement is horizontal, so $\theta = 90^\circ$, $\cos 90^\circ = 0$ and the work against gravity is zero.`,
  sol: 'W = F s cos θ; θ = 90°.',
  scheme: [['Formula', 1], ['Explanation', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 energy and units
add('unit-mcq', mcq({
  stem: 'An electricity meter shows that a household used 5 kW h in a day. This energy in joules is:',
  right: '1.8 × 10⁷ J',
  wrong: ['5000 J', '3.6 × 10⁶ J', '1.8 × 10⁴ J'],
  sol: r`$5 \times 3.6 \times 10^{6} = 1.8 \times 10^{7}$ J — option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => near(5 * 3.6e6, 1.8e7) || 'kWh');
add('erg-mcq', mcq({
  stem: 'How many ergs are there in 0.5 J?',
  right: '5 × 10⁶ erg',
  wrong: ['5 × 10⁷ erg', '5 × 10⁵ erg', '50 erg'],
  sol: r`$0.5 \times 10^{7} = 5 \times 10^{6}$ erg — option (@K).`,
  d: 1, c: 'application', t: [2],
}), () => 0.5 * 1e7 === 5e6 || 'erg');
add('ev-mcq', mcq({
  stem: 'Which unit is most convenient for the energy of a single electron in an atom?',
  right: 'Electron volt',
  wrong: ['Kilowatt hour', 'Calorie', 'Horsepower'],
  sol: '1 eV = 1.6 × 10⁻¹⁹ J, the right size for atoms; horsepower is not even a unit of energy — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
const cal = 2100 / 4.2;
add('cal-num', num({
  stem: 'A snack bar label lists 2100 J of energy. Express this in calories (1 cal = 4.2 J).',
  value: cal, tol: 0, unit: 'cal',
  sol: `Calories $= 2100 \\div 4.2 = ${f(cal)}$ cal.`,
  scheme: [[`${f(cal)} cal`, 1]],
  d: 1, c: 'application', t: [2],
}), () => near(cal, 500) || 'cal');
const kwh = 7.2e6 / 3.6e6;
add('kwh-num', num({
  stem: 'An electric oven uses 7 200 000 J of energy. How many kilowatt hours is this? (1 kW h = 3 600 000 J)',
  value: kwh, tol: 0, unit: 'kW h',
  sol: `Energy $= 7200000 \\div 3600000 = ${f(kwh)}$ kW h.`,
  scheme: [[`${f(kwh)} kW h`, 1]],
  d: 2, c: 'application', t: [2],
}), () => kwh === 2 || 'kWh');
add('unit-ar', ar({
  a: 'The kilowatt hour is a unit of power.',
  r: 'A kilowatt hour is the energy used by a 1 kW appliance in one hour.',
  key: 'd',
  sol: 'A is false (kW h is a unit of energy); R is true — option (d).',
  d: 2, c: 'understanding', t: [2, 3],
}));
add('unit-tf', tf({
  stem: 'One joule is equal to ten million ergs.',
  key: 't',
  sol: 'True: 1 J = 10⁷ erg.',
  d: 1, c: 'recall', t: [2],
}));
add('ev-fill', fill({
  stem: 'One electron volt is equal to 1.6 × 10⁻¹⁹ ___.',
  acc: [['joule', 'J', 'joules']],
  sol: '**Joule**.',
  d: 1, c: 'recall', t: [2],
}));
add('energy-short1', short({
  marks: 1,
  stem: 'Define energy.',
  model: 'Energy is the capacity (ability) of a body to do work.',
  sol: 'Capacity to do work.',
  scheme: [['Definition', 1]],
  d: 1, c: 'recall', t: [2],
}));
add('conv-short2', short({
  marks: 2,
  stem: 'Convert (a) 1.5 kW h into joules and (b) 4.8 × 10⁻¹⁹ J into electron volts.',
  model: r`(a) $1.5 \times 3.6 \times 10^{6} = 5.4 \times 10^{6}$ J. (b) Divide by the energy of 1 eV: the ratio of the powers of ten cancels, and $4.8 \div 1.6 = 3$, so the energy is 3 eV.`,
  sol: '5.4 × 10⁶ J; 3 eV.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'application', t: [2],
}), () => near(1.5 * 3.6e6, 5.4e6) && near(4.8e-19 / 1.6e-19, 3) || 'conv');

// ---------------------------------------------------------------- t03 power
const p1 = (60 * g * 4.5) / 9;
add('power-mcq', mcq({
  stem: 'A 60 kg student runs up a staircase 4.5 m high in 9 s. Her power is (g = 10 m s⁻²):',
  right: `${f(p1)} W`,
  wrong: ['30 W', '2700 W', '540 W'],
  sol: `$P = mgh/t = 60 \\times 10 \\times 4.5 \\div 9 = ${f(p1)}$ W — option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => near(p1, 300) || 'P');
add('hp-mcq', mcq({
  stem: 'A water pump is rated at 2 hp. Its power in watts is:',
  right: '1492 W',
  wrong: ['2000 W', '746 W', '373 W'],
  sol: '2 × 746 = 1492 W — option (@K).',
  d: 1, c: 'application', t: [3],
}), () => 2 * 746 === 1492 || 'hp');
add('compare-mcq', mcq({
  stem: 'Two boys of equal mass climb the same hill, one in 10 minutes and the other in 15 minutes. Which statement is correct?',
  right: 'Both do the same work; the first develops more power',
  wrong: ['The first does more work and develops more power', 'The second does more work because he takes longer', 'Both develop the same power'],
  sol: 'Same mgh, less time → more power — option (@K).',
  d: 2, c: 'analysis', t: [3],
}));
const pump = (500 * g * 12) / 60;
add('pump-num', num({
  stem: 'A motor lifts 500 kg of water to a tank 12 m high in 1 minute. Find its useful power output in watts. (g = 10 m s⁻²)',
  value: pump, tol: 0, unit: 'W',
  sol: `$P = mgh/t = 500 \\times 10 \\times 12 \\div 60 = ${f(pump)}$ W.`,
  scheme: [[`${f(pump)} W`, 1]],
  d: 2, c: 'application', t: [3],
}), () => near(pump, 1000) || 'P');
const tt = 4500 / 150;
add('time-num', num({
  stem: 'A 150 W machine does 4500 J of work. How long (in s) does it take?',
  value: tt, tol: 0, unit: 's',
  sol: `$t = W/P = 4500 \\div 150 = ${f(tt)}$ s.`,
  scheme: [[`${f(tt)} s`, 1]],
  d: 1, c: 'application', t: [3],
}), () => tt === 30 || 't');
add('power-tf', tf({
  stem: 'One horsepower is equal to 746 watts.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [3],
}));
add('power-fill', fill({
  stem: 'The rate of doing work is called ___.',
  acc: [['power']],
  sol: '**Power**.',
  d: 1, c: 'recall', t: [3],
}));
add('gw-fill', fill({
  stem: 'A power station of 2 GW produces ___ megawatts. (Write a number.)',
  acc: [['2000']],
  sol: '**2000** MW.',
  d: 2, c: 'application', t: [3],
}));
add('power-short2', short({
  marks: 2,
  stem: 'Distinguish between energy and power, giving the SI unit of each.',
  model: 'Energy is the capacity to do work (total work that can be done); SI unit joule. Power is the rate at which work is done or energy is transferred; SI unit watt (J s⁻¹).',
  sol: 'Energy: capacity, J. Power: rate, W.',
  scheme: [['Difference', 1], ['Units', 1]],
  d: 1, c: 'understanding', t: [2, 3],
}));
const crane = (800 * g * 15) / 20;
add('crane-short3', short({
  marks: 3,
  stem: 'A crane lifts a load of 800 kg through 15 m in 20 s. Calculate (a) the work done against gravity, (b) the power of the crane in kW and (c) its power in hp. (g = 10 m s⁻²; 1 hp = 746 W)',
  model: `(a) $W = mgh = 800 \\times 10 \\times 15 = ${800 * g * 15}$ J. (b) $P = ${800 * g * 15} \\div 20 = ${crane}$ W $= ${crane / 1000}$ kW. (c) $${crane} \\div 746 \\approx ${f(crane / 746)}$ hp.`,
  sol: `${800 * g * 15} J; ${crane / 1000} kW; about ${f(crane / 746)} hp.`,
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [1, 3],
}), () => crane === 6000 || 'P');

// ---------------------------------------------------------------- t04 potential and kinetic energy
const ke1 = 0.5 * 1000 * 20 ** 2;
add('ke-mcq', mcq({
  stem: 'A car’s speed increases from 10 m s⁻¹ to 20 m s⁻¹. Its kinetic energy becomes:',
  right: 'four times as large',
  wrong: ['twice as large', 'half as large', 'eight times as large'],
  sol: 'K ∝ v²; (20/10)² = 4 — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('pe-mcq', mcq({
  stem: 'A 3 kg flowerpot rests on a balcony 8 m above the ground. Its gravitational potential energy relative to the ground is (g = 10 m s⁻²):',
  right: '240 J',
  wrong: ['24 J', '2400 J', '80 J'],
  sol: r`$U = mgh = 3 \times 10 \times 8 = 240$ J — option (@K).`,
  d: 1, c: 'application', t: [4],
}), () => 3 * g * 8 === 240 || 'U');
add('forms-mcq', mcq({
  stem: 'The kinetic energy of the blades of a spinning ceiling fan, which stays fixed in place, is:',
  right: 'rotational kinetic energy',
  wrong: ['translational kinetic energy', 'vibrational kinetic energy', 'gravitational potential energy'],
  sol: 'The blades turn about an axis without moving along — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('car-num', num({
  stem: 'Find the kinetic energy, in J, of a 1000 kg car moving at 20 m s⁻¹.',
  value: ke1, tol: 0, unit: 'J',
  sol: `$K = \\tfrac{1}{2}mv^{2} = 0.5 \\times 1000 \\times 400 = ${ke1}$ J.`,
  scheme: [[`${ke1} J`, 1]],
  d: 1, c: 'application', t: [4],
}), () => ke1 === 200000 || 'K');
const v2 = Math.sqrt((2 * 400) / 2);
add('speed-num', num({
  stem: 'A 2 kg ball has 400 J of kinetic energy. What is its speed in m s⁻¹?',
  value: v2, tol: 0, unit: 'm s⁻¹',
  sol: `$v = \\sqrt{2K/m} = \\sqrt{2 \\times 400 \\div 2} = \\sqrt{400} = ${f(v2)}$ m s⁻¹.`,
  scheme: [[`${f(v2)} m s⁻¹`, 1]],
  d: 2, c: 'application', t: [4],
}), () => v2 === 20 || 'v');
add('ke-ar', ar({
  a: 'If the speed of a body is doubled, its kinetic energy is doubled.',
  r: 'Kinetic energy is directly proportional to the square of the speed.',
  key: 'd',
  sol: 'A is false (K becomes four times); R is true — option (d).',
  d: 2, c: 'understanding', t: [4],
}));
add('pe-tf', tf({
  stem: 'A stretched rubber band has potential energy because of its configuration.',
  key: 't',
  sol: 'True: elastic potential energy.',
  d: 1, c: 'understanding', t: [4],
}));
add('ke-fill', fill({
  stem: 'The energy possessed by a body by virtue of its motion is called ___ energy.',
  acc: [['kinetic']],
  sol: '**Kinetic**.',
  d: 1, c: 'recall', t: [4],
}));
add('derive-short2', short({
  marks: 2,
  stem: 'Show that the gravitational potential energy of a body of mass m raised to a height h is mgh.',
  model: 'To raise the body slowly, an upward force equal to its weight mg must act through the height h. Work done = force × displacement = mg × h. This work is stored in the body as potential energy, so U = mgh.',
  sol: 'Force mg through height h.',
  scheme: [['Force equals weight mg', 1], ['W = mgh stored as U', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('kederive-short3', short({
  marks: 3,
  stem: 'A constant force F acts on a body of mass m initially at rest, and it attains a speed v after moving through a distance s. Derive the expression for its kinetic energy.',
  model: r`Acceleration $a = F/m$. From $v^{2} = u^{2} + 2as$ with $u = 0$: $s = v^{2}/2a$. Work done $W = F \times s = ma \times \dfrac{v^{2}}{2a} = \tfrac{1}{2}mv^{2}$. This work appears as kinetic energy: $K = \tfrac{1}{2}mv^{2}$.`,
  sol: 'Using W = F s and v² = 2as.',
  scheme: [['Equation of motion', 1], ['Substitution in W = F s', 1], ['Result', 1]],
  d: 3, c: 'understanding', t: [4],
}));
add('mom-short2', short({
  marks: 2,
  stem: 'A 0.2 kg stone and a 0.8 kg stone are moving with the same kinetic energy of 10 J. Calculate the speed of each.',
  model: r`$v = \sqrt{2K/m}$. Light stone: $\sqrt{2 \times 10 \div 0.2} = \sqrt{100} = 10$ m s⁻¹. Heavy stone: $\sqrt{2 \times 10 \div 0.8} = \sqrt{25} = 5$ m s⁻¹.`,
  sol: '10 m s⁻¹; 5 m s⁻¹.',
  scheme: [['Light stone', 1], ['Heavy stone', 1]],
  d: 3, c: 'application', t: [4],
}), () => Math.sqrt(20 / 0.2) === 10 && Math.sqrt(20 / 0.8) === 5 || 'v');

// ---------------------------------------------------------------- t05 conversions
add('convert-mcq', mcq({
  stem: 'In a microphone at a school assembly, the main energy change is:',
  right: 'sound energy to electrical energy',
  wrong: ['electrical energy to sound energy', 'chemical energy to sound energy', 'light energy to electrical energy'],
  sol: 'A microphone turns sound vibrations into electrical signals; a loudspeaker does the reverse — option (@K).',
  d: 1, c: 'understanding', t: [5],
}));
add('solar-mcq', mcq({
  stem: 'A solar-powered garden lamp charges a battery during the day and lights up at night. The sequence of energy changes is:',
  right: 'light → electrical → chemical → electrical → light',
  wrong: ['light → chemical → light', 'heat → electrical → light', 'chemical → light → electrical → light'],
  sol: 'Solar cell, battery charging, battery discharging, lamp — option (@K).',
  d: 3, c: 'analysis', t: [5],
}));
add('convert-tf', tf({
  stem: 'An electric iron converts electrical energy mainly into heat energy.',
  key: 't',
  sol: 'True.',
  d: 1, c: 'recall', t: [5],
}));
add('cell-fill', fill({
  stem: 'A dry cell converts ___ energy into electrical energy.',
  acc: [['chemical']],
  sol: '**Chemical**.',
  d: 1, c: 'recall', t: [5],
}));
add('convert-short2', short({
  marks: 2,
  stem: 'State the energy change in (a) a loudspeaker, (b) a solar cell, (c) an electric heater and (d) a steam engine.',
  model: '(a) Electrical → sound. (b) Light → electrical. (c) Electrical → heat. (d) Heat → mechanical (kinetic).',
  sol: 'Four conversions.',
  scheme: [['(a) and (b)', 1], ['(c) and (d)', 1]],
  d: 1, c: 'recall', t: [5],
}));

// ---------------------------------------------------------------- t06 conservation of energy
const vg = Math.sqrt(2 * g * 45);
add('conserve-mcq', mcq({
  stem: 'A coconut falls from a tree 45 m high. Neglecting air resistance, its speed just before hitting the ground is (g = 10 m s⁻²):',
  right: `${f(vg)} m s⁻¹`,
  wrong: ['45 m s⁻¹', '900 m s⁻¹', '15 m s⁻¹'],
  sol: `$mgh = \\tfrac{1}{2}mv^{2}$, so $v = \\sqrt{2 \\times 10 \\times 45} = ${f(vg)}$ m s⁻¹ — option (@K).`,
  d: 3, c: 'application', t: [6],
}), () => vg === 30 || 'v');
add('pend-mcq', mcq({
  stem: 'A pendulum bob is released from one extreme position. At the mean position its:',
  right: 'kinetic energy is maximum and potential energy is minimum',
  wrong: ['potential energy is maximum and kinetic energy is zero', 'kinetic and potential energy are both maximum', 'total energy is greatest'],
  sol: 'It is lowest and fastest at the mean position — option (@K).',
  d: 1, c: 'understanding', t: [6],
}));
add('half-mcq', mcq({
  stem: 'A ball is dropped from height H. At what height above the ground are its kinetic and potential energies equal (no air resistance)?',
  right: 'H/2',
  wrong: ['H/4', '3H/4', 'H'],
  sol: 'U = mgh and K = mg(H − h); equal when h = H/2 — option (@K).',
  d: 4, c: 'analysis', t: [6],
}));
const K3 = 3 * g * (25 - 10);
add('half-num', num({
  stem: 'A 3 kg stone is dropped from 25 m. What is its kinetic energy (in J) when it is 10 m above the ground? (g = 10 m s⁻²; no air resistance)',
  value: K3, tol: 0, unit: 'J',
  sol: `Loss of PE $= mg(25 - 10) = 3 \\times 10 \\times 15 = ${K3}$ J, which equals the kinetic energy.`,
  scheme: [[`${K3} J`, 1]],
  d: 2, c: 'application', t: [6],
}), () => K3 === 450 || 'K');
add('pend-ar', ar({
  a: 'The amplitude of a pendulum swinging in air slowly decreases.',
  r: 'Mechanical energy of the pendulum is slowly converted into heat by air resistance.',
  key: 'a',
  sol: 'Both are true, and R explains A — option (a).',
  d: 2, c: 'understanding', t: [6],
}));
add('cons-ar', ar({
  a: 'The total mechanical energy of a freely falling body is the same at every height.',
  r: 'The potential energy of the body is the same at every height.',
  key: 'c',
  sol: 'A is true; R is false (potential energy decreases as it falls) — option (c).',
  d: 2, c: 'understanding', t: [6],
}));
add('cons-tf', tf({
  stem: 'Energy can be created in a power station.',
  key: 'f',
  sol: 'False: a power station only converts energy from one form to another.',
  d: 1, c: 'understanding', t: [6],
}));
add('cons-fill', fill({
  stem: 'At the extreme position of a swinging pendulum, the energy of the bob is wholly ___ energy.',
  acc: [['potential']],
  sol: '**Potential**.',
  d: 1, c: 'recall', t: [6],
}));
add('cons-short1', short({
  marks: 1,
  stem: 'State the principle of conservation of energy.',
  model: 'Energy can neither be created nor destroyed; it can only be changed from one form into another, so the total energy of an isolated system remains constant.',
  sol: 'Statement.',
  scheme: [['Statement', 1]],
  d: 1, c: 'recall', t: [6],
}));
const vc = Math.sqrt(2 * g * 20);
add('fall-short3', short({
  marks: 3,
  stem: 'A 0.5 kg ball is dropped from a window 20 m above the ground. Calculate (a) its potential energy at the window, (b) its kinetic energy just before it lands and (c) its speed just before it lands. (g = 10 m s⁻²; neglect air resistance)',
  model: `(a) $U = 0.5 \\times 10 \\times 20 = ${0.5 * g * 20}$ J. (b) By conservation of energy, $K = ${0.5 * g * 20}$ J. (c) $\\tfrac{1}{2} \\times 0.5 \\times v^{2} = ${0.5 * g * 20}$, so $v = ${f(vc)}$ m s⁻¹.`,
  sol: `${0.5 * g * 20} J; ${0.5 * g * 20} J; ${f(vc)} m s⁻¹.`,
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [4, 6],
}), () => vc === 20 || 'v');
add('pend-short2', short({
  marks: 2,
  stem: 'Describe the energy changes during one complete oscillation of a simple pendulum released from an extreme position A, through the mean position B, to the other extreme C and back.',
  model: 'At A: all potential energy (bob at rest at its highest). A → B: potential energy changes to kinetic; at B all kinetic (fastest). B → C: kinetic changes back to potential; at C all potential. The same changes occur on the way back; the total stays constant (apart from slow loss to air resistance).',
  sol: 'PE → KE → PE, total constant.',
  scheme: [['Extremes and mean described', 1], ['Conversions and constant total', 1]],
  d: 2, c: 'understanding', t: [6],
}));

// ---------------------------------------------------------------- match items
add('unit-match', match({
  marks: 2,
  stem: 'Match each quantity in Column A with its value in joules in Column B.',
  pairs: [
    ['1 kW h', '3.6 × 10⁶ J'],
    ['1 calorie', 'about 4.2 J'],
    ['1 erg', '10⁻⁷ J'],
    ['1 eV', '1.6 × 10⁻¹⁹ J'],
  ],
  order: [2, 0, 3, 1],
  sol: 'kW h → 3.6 × 10⁶ J; cal → 4.2 J; erg → 10⁻⁷ J; eV → 1.6 × 10⁻¹⁹ J.',
  d: 1, c: 'recall', t: [2],
}));
add('device-match', match({
  marks: 2,
  stem: 'Match each device in Column A with its main energy conversion in Column B.',
  pairs: [
    ['Electric motor', 'Electrical → mechanical'],
    ['Generator', 'Mechanical → electrical'],
    ['Electric bulb', 'Electrical → light'],
    ['Cell', 'Chemical → electrical'],
  ],
  order: [3, 1, 0, 2],
  sol: 'Motor → electrical to mechanical; generator → mechanical to electrical; bulb → electrical to light; cell → chemical to electrical.',
  d: 1, c: 'recall', t: [5],
}));

// ---------------------------------------------------------------- 10-mark structured questions
const lw = 40 * 5 * 0.5;
add('work-long', long({
  stem: '(a) Define work and state its SI unit. When is the work done by a force (i) zero and (ii) negative? [3]\n\n(b) A trolley is pulled 5 m along a corridor by a force of 40 N applied through a handle at 60° to the floor. Calculate the work done. What would the work be if the same force acted along the floor? [3]\n\n(c) A 45 kg girl climbs a 6 m flight of stairs in 12 s. Calculate (i) the work she does against gravity, (ii) her power, and (iii) her power in hp. (g = 10 m s⁻²; 1 hp = 746 W) [4]',
  model: `(a) Work is done when a force moves its point of application; $W = F s \\cos\\theta$; unit joule. (i) Zero when the displacement is zero or perpendicular to the force. (ii) Negative when the force opposes the displacement (θ = 180°), e.g. friction.\n\n(b) $W = 40 \\times 5 \\times \\cos 60^\\circ = ${lw}$ J. Along the floor: $40 \\times 5 = 200$ J.\n\n(c) (i) $45 \\times 10 \\times 6 = ${45 * g * 6}$ J. (ii) $${45 * g * 6} \\div 12 = ${45 * g * 6 / 12}$ W. (iii) $${45 * g * 6 / 12} \\div 746 \\approx ${f(225 / 746, 2)}$ hp.`,
  sol: 'Definition and cases; work at an angle; stairs.',
  scheme: [['(a) definition and unit', 1], ['(a)(i)', 1], ['(a)(ii)', 1], ['(b) at 60°', 2], ['(b) along floor', 1], ['(c)(i)', 2], ['(c)(ii)', 1], ['(c)(iii)', 1]],
  d: 3, c: 'application', t: [1, 3],
}), () => lw === 100 && 45 * g * 6 / 12 === 225 || 'work');
add('energy-long', long({
  stem: '(a) Define kinetic energy and derive the expression K = ½mv². [3]\n\n(b) A 1200 kg car slows from 25 m s⁻¹ to 15 m s⁻¹. Calculate (i) the initial kinetic energy, (ii) the final kinetic energy and (iii) the work done by the brakes. [3]\n\n(c) Name the forms of kinetic energy, with one example each, and state which form appears in the car example. [4]',
  model: `(a) Energy of a body due to its motion. A force F accelerates m from rest to v over s: $v^{2} = 2as$, $W = Fs = ma \\cdot v^{2}/2a = \\tfrac{1}{2}mv^{2}$, stored as K.\n\n(b) (i) $\\tfrac{1}{2} \\times 1200 \\times 625 = ${0.5 * 1200 * 625}$ J. (ii) $\\tfrac{1}{2} \\times 1200 \\times 225 = ${0.5 * 1200 * 225}$ J. (iii) Work by brakes $= -(${0.5 * 1200 * 625} - ${0.5 * 1200 * 225}) = -${0.5 * 1200 * 400}$ J (negative work).\n\n(c) Translational (a moving car), rotational (a spinning wheel or fan), vibrational (atoms in a hot solid, a vibrating string). The car’s energy that is calculated here is translational (its wheels also rotate).`,
  sol: 'Derivation; KE change; forms.',
  scheme: [['(a)', 3], ['(b)(i)', 1], ['(b)(ii)', 1], ['(b)(iii)', 1], ['(c) three forms with examples', 3], ['(c) car', 1]],
  d: 3, c: 'application', t: [4],
}), () => 0.5 * 1200 * 400 === 240000 || 'KE');
const Hb = 80;
add('fall-long', long({
  stem: '(a) State the principle of conservation of energy. [3]\n\n(b) A 2 kg ball is dropped from a height of 80 m. Calculate its potential energy, kinetic energy and total energy (i) at the top, (ii) after falling 30 m and (iii) just before it reaches the ground. (g = 10 m s⁻²) [3]\n\n(c) (i) Find the speed of the ball just before it lands. (ii) At what height are its kinetic and potential energies equal? (iii) Sketch how U, K and U + K vary with height. [4]',
  model: `(a) Energy can neither be created nor destroyed; it only changes form, and the total energy of an isolated system remains constant.\n\n(b) (i) $U = 2 \\times 10 \\times 80 = ${2 * g * Hb}$ J, $K = 0$, total ${2 * g * Hb} J. (ii) At 50 m: $U = ${2 * g * 50}$ J, $K = ${2 * g * 30}$ J, total ${2 * g * Hb} J. (iii) $U = 0$, $K = ${2 * g * Hb}$ J, total ${2 * g * Hb} J.\n\n(c) (i) $v = \\sqrt{2gH} = \\sqrt{1600} = ${Math.sqrt(2 * g * Hb)}$ m s⁻¹. (ii) At 40 m. (iii) U falls linearly with decreasing height, K rises linearly, U + K is a horizontal line at ${2 * g * Hb} J.`,
  sol: 'Principle; energies at three points; speed and equal-energy height.',
  scheme: [['(a)', 3], ['(b)(i)', 1], ['(b)(ii)', 1], ['(b)(iii)', 1], ['(c)(i)', 2], ['(c)(ii)', 1], ['(c)(iii)', 1]],
  d: 3, c: 'application', t: [6],
}), () => Math.sqrt(2 * g * Hb) === 40 || 'v');
add('units-long', long({
  stem: '(a) Define (i) the joule and (ii) the watt. [3]\n\n(b) Convert (i) 3 kW h into joules, (ii) 4.2 × 10⁵ J into kilocalories (1 cal = 4.2 J) and (iii) 2 hp into kW. [3]\n\n(c) A 1.5 kW heater runs for 4 hours a day for 30 days. (i) Find the energy used in kW h. (ii) Express it in joules. (iii) Find the cost at ₹7 per kW h. (iv) Why is the kW h used on bills rather than the joule? [4]',
  model: `(a) (i) One joule is the work done when a force of 1 N moves its point of application through 1 m in its own direction. (ii) One watt is the power of a device that does 1 J of work per second.\n\n(b) (i) $3 \\times 3.6 \\times 10^{6} = 1.08 \\times 10^{7}$ J. (ii) $4.2 \\times 10^{5} \\div 4.2 = 10^{5}$ cal $= 100$ kcal. (iii) $2 \\times 746 = 1492$ W $= 1.492$ kW.\n\n(c) (i) $1.5 \\times 4 \\times 30 = ${1.5 * 4 * 30}$ kW h. (ii) $${1.5 * 4 * 30} \\times 3.6 \\times 10^{6} = 6.48 \\times 10^{8}$ J. (iii) $${1.5 * 4 * 30} \\times 7 =${1.5 * 4 * 30 * 7}$, that is ₹${1.5 * 4 * 30 * 7}. (iv) The joule is too small for household amounts.`,
  sol: 'Definitions; conversions; bill.',
  scheme: [['(a)(i)', 2], ['(a)(ii)', 1], ['(b)(i)', 1], ['(b)(ii)', 1], ['(b)(iii)', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(c)(iv)', 1]],
  d: 2, c: 'application', t: [2, 3],
}), () => 1.5 * 4 * 30 === 180 && near(180 * 3.6e6, 6.48e8) || 'kWh');
add('pend-long', long({
  stem: '(a) What is potential energy? Derive U = mgh. [3]\n\n(b) A pendulum bob of mass 0.1 kg is pulled aside so that it rises 5 cm above its lowest point, and released. (i) Find its potential energy at the extreme position. (ii) Find its speed at the mean position. (iii) Where is its speed zero? (g = 10 m s⁻²) [3]\n\n(c) (i) Name the energy changes in a hydroelectric power station. (ii) Why does a swinging pendulum eventually stop? (iii) Is energy lost when it stops? Explain. [4]',
  model: `(a) Energy possessed by a body because of its position or configuration. Lifting m through h needs an upward force mg acting through h: W = mgh, stored as U = mgh.\n\n(b) (i) $U = 0.1 \\times 10 \\times 0.05 = ${f(0.1 * g * 0.05)}$ J. (ii) $\\tfrac{1}{2} \\times 0.1 \\times v^{2} = ${f(0.1 * g * 0.05)}$, so $v = 1$ m s⁻¹. (iii) At the two extreme positions.\n\n(c) (i) Potential energy of stored water → kinetic energy of falling water → kinetic energy of the turbine → electrical energy. (ii) Air resistance and friction at the support convert its mechanical energy into heat. (iii) No: it is converted into heat (internal energy of the air and support); the total is conserved.`,
  sol: 'Definition and derivation; pendulum energies; conversions.',
  scheme: [['(a)', 3], ['(b)(i)', 1], ['(b)(ii)', 1], ['(b)(iii)', 1], ['(c)(i)', 2], ['(c)(ii)', 1], ['(c)(iii)', 1]],
  d: 4, c: 'analysis', t: [4, 5, 6],
}), () => near(Math.sqrt((2 * 0.1 * g * 0.05) / 0.1), 1) || 'v');
