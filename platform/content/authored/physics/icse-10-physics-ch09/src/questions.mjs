// ICSE 10 Physics ch09 Electrical Power, Energy and Household Circuits — question bank (ICSE 2027 specimen style).
// Every numerical value is computed here and asserted by a re-solve check. MCQ keys are placed by the builder.
import { mk, add, r, near } from './lib.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const f = (x, n = 3) => String(Number(x.toPrecision(n)));

// ---------------------------------------------------------------- t01 electrical energy and power; power rating
const Rh = 220 ** 2 / 2200;
add('heater-mcq', mcq({
  stem: 'A room heater is marked 2200 W, 220 V. The resistance of its element when working normally is:',
  right: `${f(Rh)} Ω`,
  wrong: ['10 Ω', '100 Ω', '0.045 Ω'],
  sol: `$R = \\dfrac{V^{2}}{P} = \\dfrac{220 \\times 220}{2200} = ${f(Rh)}$ Ω — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => near(Rh, 22) || 'R');
const Pdrop = 800 * (176 / 220) ** 2;
add('drop-mcq', mcq({
  stem: 'A rice cooker rated 800 W, 220 V is used on a day when the supply falls to 176 V. Assuming its resistance does not change, its power is:',
  right: `${f(Pdrop)} W`,
  wrong: ['640 W', '800 W', '1000 W'],
  sol: `$P' = P \\times \\left(\\dfrac{176}{220}\\right)^{2} = 800 \\times 0.64 = ${f(Pdrop)}$ W — option (@K).`,
  d: 3, c: 'application', t: [1],
}), () => near(Pdrop, 512) || 'P');
add('rating-mcq', mcq({
  stem: 'A ceiling fan is marked “75 W, 220 V”. This means that the fan:',
  right: 'converts 75 J of electrical energy every second when connected to a 220 V supply',
  wrong: ['uses 75 J of energy every hour on any supply', 'can safely carry a current of at most 75 A', 'has a resistance of 75 Ω'],
  sol: 'Power is energy per second at the rated voltage — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('notenergy-mcq', mcq({
  stem: 'A current I flows for a time t through a resistor R that has a p.d. V across it. Which expression does NOT give the electrical energy converted?',
  right: 'IRt',
  wrong: ['VIt', 'I²Rt', 'V²t/R'],
  sol: 'IR is a voltage, so IRt has the unit volt second, not joule; the other three are equal to W — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
const RA = 220 ** 2 / 500;
const RB = 220 ** 2 / 1000;
add('coils-mcq', mcq({
  stem: 'Heater coil A is rated 500 W, 220 V and coil B is rated 1000 W, 220 V. Which statement about their resistances is correct?',
  right: 'A has twice the resistance of B',
  wrong: ['B has twice the resistance of A', 'Both have the same resistance', 'A has four times the resistance of B'],
  sol: `$R = V^{2}/P$: $R_{A} = ${f(RA)}$ Ω and $R_{B} = ${f(RB)}$ Ω, so $R_{A} = 2R_{B}$ — option (@K).`,
  d: 3, c: 'analysis', t: [1],
}), () => near(RA / RB, 2) || 'ratio');
const Wcar = 12 * 5 * 600;
add('energy-mcq', mcq({
  stem: 'The 12 V battery of a parked car supplies 5 A to its headlights for 10 minutes. The electrical energy supplied is:',
  right: `${Wcar} J`,
  wrong: ['600 J', '3600 J', '360000 J'],
  sol: `$W = VIt = 12 \\times 5 \\times 600 = ${Wcar}$ J — option (@K).`,
  d: 2, c: 'application', t: [1],
}), () => Wcar === 36000 || 'W');
add('power-ar', ar({
  a: 'A 2000 W heater has a lower resistance than a 1000 W heater made for the same voltage.',
  r: 'At a fixed voltage the power P = V²/R is inversely proportional to the resistance.',
  key: 'a',
  sol: 'Both are true; since R = V²/P, doubling the power halves the resistance — option (a).',
  d: 2, c: 'analysis', t: [1],
}));
add('heat-tf', tf({
  stem: 'For a fixed current, the heat produced each second in a wire is directly proportional to its resistance.',
  key: 't',
  sol: 'True: heat per second is I²R, which is proportional to R when I is fixed.',
  d: 2, c: 'understanding', t: [1],
}));
add('watt-fill', fill({
  stem: 'One watt is the power of an appliance that converts one ___ of electrical energy every second.',
  acc: [['joule', 'J']],
  sol: '**Joule** (1 W = 1 J s⁻¹).',
  d: 1, c: 'recall', t: [1],
}));
const Hs = 2 ** 2 * 60 * 300;
add('heat-num', num({
  stem: 'The 60 Ω element of a soldering iron carries 2 A for 5 minutes. Find the heat produced, in kJ.',
  value: Hs / 1000, tol: 0.01, unit: 'kJ',
  sol: r`$H = I^{2}Rt = 2 \times 2 \times 60 \times 300 = 72000$ J, that is $H = 72$ kJ.`,
  scheme: [['72 kJ', 1]],
  d: 2, c: 'application', t: [1],
}), () => Hs === 72000 || 'H');
const Rrc = 220 ** 2 / 550;
add('rcooker-num', num({
  stem: 'Find the resistance, in ohms, of the heating plate of a 550 W, 220 V sandwich maker when it works normally.',
  value: Rrc, tol: 0.01, unit: 'Ω',
  sol: r`$R = \dfrac{V^{2}}{P} = \dfrac{220 \times 220}{550} = 88$ Ω.`,
  scheme: [['88 Ω', 1]],
  d: 2, c: 'application', t: [1],
}), () => near(Rrc, 88) || 'R');
const Imw = 1320 / 220;
add('micro-num', num({
  stem: 'A microwave oven rated 1320 W is used on the 220 V mains. Find the current it draws, in amperes.',
  value: Imw, tol: 0.001, unit: 'A',
  sol: r`$I = \dfrac{P}{V} = \dfrac{1320}{220} = 6$ A.`,
  scheme: [['6 A', 1]],
  d: 1, c: 'application', t: [1],
}), () => near(Imw, 6) || 'I');
add('rating-short1', short({
  marks: 1,
  stem: 'What does the marking “1.5 kW” on an electric kettle tell you?',
  model: 'Working at its rated voltage, the kettle converts 1500 joules of electrical energy into heat each second.',
  sol: '1500 J per second at the rated voltage.',
  scheme: [['Energy per second at rated voltage', 1]],
  d: 1, c: 'understanding', t: [1],
}));
const Ri = 220 ** 2 / 1100;
const Pi = 198 ** 2 / Ri;
add('drop-short2', short({
  marks: 2,
  stem: 'An electric iron is rated 1100 W, 220 V. (a) Find the resistance of its element. (b) Find its power when the supply voltage falls to 198 V.',
  model: r`(a) $R = \dfrac{220 \times 220}{1100} = 44$ Ω. (b) $P = \dfrac{198 \times 198}{44} = 891$ W.`,
  sol: '44 Ω; 891 W.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'application', t: [1],
}), () => near(Ri, 44) && near(Pi, 891) || 'P');
const Rlamp = 220 ** 2 / 110;
add('lamp-short3', short({
  marks: 3,
  stem: 'A halogen desk lamp is rated 110 W, 220 V. Calculate (a) its resistance when lit, (b) the current it draws and (c) the energy, in kWh, it uses in 5 hours.',
  model: r`(a) $R = \dfrac{220 \times 220}{110} = 440$ Ω. (b) $I = \dfrac{110}{220} = 0.5$ A. (c) $0.11 \times 5 = 0.55$ kWh.`,
  sol: '440 Ω; 0.5 A; 0.55 kWh.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 2, c: 'application', t: [1, 2],
}), () => near(Rlamp, 440) && near(110 / 220, 0.5) && near(0.11 * 5, 0.55) || 'lamp');

// ---------------------------------------------------------------- t02 kilowatt hour and bills
const Emx = 0.5 * 2;
add('kwh-mcq', mcq({
  stem: 'A 500 W mixer-grinder is used for a total of 2 hours. The electrical energy it uses is:',
  right: `${f(Emx)} kWh`,
  wrong: ['1000 kWh', '250 kWh', '0.25 kWh'],
  sol: `Energy $= 0.5 \\times 2 = ${f(Emx)}$ kWh — option (@K).`,
  d: 1, c: 'application', t: [2],
}), () => near(Emx, 1) || 'E');
const cost = 2 * 0.5 * 30 * 7;
add('cost-mcq', mcq({
  stem: 'A 2 kW geyser is used for 30 minutes every day. At ₹7 per unit, the cost of running it for 30 days is:',
  right: `₹${cost}`,
  wrong: ['₹420', '₹105', '₹7'],
  sol: `Units $= 2 \\times 0.5 \\times 30 = 30$ kWh; cost $= 30 \\times 7 = ${cost}$, that is ₹${cost} — option (@K).`,
  d: 2, c: 'application', t: [2],
}), () => cost === 210 || 'cost');
const uses = { heater: 2 * 0.25, tv: 0.1 * 4, iron: 1 * (20 / 60), fan: 0.06 * 10 };
add('compare-mcq', mcq({
  stem: 'Which of these uses the most electrical energy?',
  right: 'A 60 W fan running for 10 hours',
  wrong: ['A 2000 W heater running for 15 minutes', 'A 100 W television running for 4 hours', 'A 1000 W iron running for 20 minutes'],
  sol: 'Fan $0.06 \\times 10 = 0.6$ kWh; heater $2 \\times 0.25 = 0.5$ kWh; television $0.1 \\times 4 = 0.4$ kWh; iron about 0.33 kWh — option (@K).',
  d: 3, c: 'analysis', t: [2],
}), () => Object.values(uses).every((u) => u <= uses.fan) || 'fan');
add('kwh-fill', fill({
  stem: 'The energy consumed by a 1 kW appliance working for one ___ is 1 kWh.',
  acc: [['hour']],
  sol: '**Hour**.',
  d: 1, c: 'recall', t: [2],
}));
add('meter-fill', fill({
  stem: 'The meter that records the electrical energy used in a house, in units, is called the ___ meter.',
  acc: [['kilowatt hour', 'kWh', 'energy', 'kilowatt-hour']],
  sol: '**Kilowatt hour** (kWh, energy) meter.',
  d: 1, c: 'recall', t: [2, 3],
}));
add('unit-tf', tf({
  stem: 'A 100 W lamp kept on for 10 hours uses one unit of electrical energy.',
  key: 't',
  sol: 'True: $0.1 \\times 10 = 1$ kWh, which is one unit.',
  d: 2, c: 'application', t: [2],
}));
const Epump = 0.75 * 2 * 30;
add('pump-num', num({
  stem: 'A 750 W water pump on a terrace runs for 2 hours a day. Find the energy it uses in 30 days, in kWh.',
  value: Epump, tol: 0.01, unit: 'kWh',
  sol: r`Energy $= 0.75 \times 2 \times 30 = 45$ kWh.`,
  scheme: [['45 kWh', 1]],
  d: 1, c: 'application', t: [2],
}), () => near(Epump, 45) || 'E');
const daily = 1.5 * 4 + 0.2 * 3 + 4 * 0.01 * 5;
const billCost = daily * 30 * 8;
add('bill-num', num({
  stem: 'In a flat, a 1.5 kW air conditioner runs 4 hours a day, a 200 W television 3 hours a day and four 10 W LED bulbs 5 hours a day. At ₹8 per unit, find the cost, in rupees, for 30 days.',
  value: billCost, tol: 0.5, unit: '₹',
  sol: r`Daily: $1.5 \times 4 + 0.2 \times 3 + 4 \times 0.01 \times 5 = 6.8$ kWh; 30 days: $6.8 \times 30 = 204$ kWh; cost $= 204 \times 8 = 1632$, that is ₹1632.`,
  scheme: [['Daily units', 0.5], ['₹1632', 0.5]],
  d: 3, c: 'application', t: [2],
}), () => near(daily, 6.8) && near(billCost, 1632) || 'bill');
const MJ = (2.5 * 3.6e6) / 1e6;
add('mj-num', num({
  stem: 'A family’s solar panels supplied 2.5 kWh in a cloudy day. Express this energy in megajoules (1 MJ = 10⁶ J).',
  value: MJ, tol: 0.01, unit: 'MJ',
  sol: r`$2.5 \times 3.6 \times 10^{6} = 9 \times 10^{6}$ J, so the energy is $E = 9$ MJ.`,
  scheme: [['9 MJ', 1]],
  d: 2, c: 'application', t: [2],
}), () => near(MJ, 9) || 'MJ');
add('kwh-short1', short({
  marks: 1,
  stem: 'Why is household electrical energy sold in kilowatt hours rather than in joules?',
  model: 'A joule is far too small: a single day’s use would run into millions of joules, so the larger kWh (3.6 × 10⁶ J) is convenient.',
  sol: 'The joule is too small a unit.',
  scheme: [['Joule too small', 1]],
  d: 1, c: 'understanding', t: [2],
}));
const wm = 1.2 * 0.75 * 30;
add('bill-short2', short({
  marks: 2,
  stem: 'A 1.2 kW washing machine is used for 45 minutes a day. Find (a) the energy it uses in 30 days and (b) the cost at ₹6.50 per unit.',
  model: r`(a) $1.2 \times 0.75 \times 30 = 27$ kWh. (b) $27 \times 6.5 = 175.5$, that is ₹175.50.`,
  sol: '27 kWh; ₹175.50.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 2, c: 'application', t: [2],
}), () => near(wm, 27) && near(wm * 6.5, 175.5) || 'bill');
const saved = ((40 - 18) * 10 * 10 * 30) / 1000;
add('led-short2', short({
  marks: 2,
  stem: 'A stationery shop replaces ten 40 W tube lights by ten 18 W LED tubes. The lights are on 10 hours a day. (a) How many units are saved in 30 days? (b) Why does the LED tube give about the same light for less power?',
  model: r`(a) Saving per tube $= 40 - 18 = 22$ W; units saved $= \dfrac{22 \times 10 \times 10 \times 30}{1000} = 66$ kWh. (b) An LED converts a much larger fraction of its electrical energy into light and wastes less as heat.`,
  sol: '66 kWh; more efficient.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 3, c: 'application', t: [2],
}), () => near(saved, 66) || 'saved');

// ---------------------------------------------------------------- t03 distribution, house wiring, fuse, MCB, ring main
add('fuse-mcq', mcq({
  stem: 'A 660 W juicer is used on the 220 V mains. Which fuse is most suitable for it?',
  right: '5 A',
  wrong: ['1 A', '2 A', '30 A'],
  sol: '$I = \\dfrac{660}{220} = 3$ A, so the fuse must be rated a little above 3 A: 5 A. A 1 A or 2 A fuse would melt in normal use; a 30 A fuse would not protect — option (@K).',
  d: 2, c: 'application', t: [3],
}), () => near(660 / 220, 3) || 'I');
add('live-mcq', mcq({
  stem: 'Electricians place the switch and the fuse of every circuit in the live wire. The main reason is that:',
  right: 'when the switch is off or the fuse has blown, the appliance is cut off from the high potential of the supply',
  wrong: ['the live wire carries more current than the neutral wire', 'the neutral wire is at a higher potential than the live wire', 'a fuse in the live wire uses less energy'],
  sol: 'In the live wire, opening the circuit leaves the appliance at earth potential, so it is safe to touch — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('mcb-mcq', mcq({
  stem: 'In a new flat, rewireable fuses are replaced by miniature circuit breakers (MCBs). An MCB differs from a fuse because it:',
  right: 'can simply be switched on again after it trips, once the fault is removed',
  wrong: ['must be replaced each time it operates', 'is connected in the neutral wire', 'never switches off a circuit'],
  sol: 'An MCB is an automatic switch that is reset by hand — option (@K).',
  d: 1, c: 'understanding', t: [3],
}));
add('ring-mcq', mcq({
  stem: 'In the ring main system of a house, the socket outlets are connected:',
  right: 'in parallel, along a cable loop that starts and ends at the distribution board',
  wrong: ['in series, one after another along a single cable', 'in parallel, each by a separate cable from the electric pole', 'in series with the main switch only'],
  sol: 'The ring leaves the board and returns to it; sockets are tapped off in parallel — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('distrib-mcq', mcq({
  stem: 'Power from a hydroelectric station is sent to a city 200 km away at 132 kV instead of 11 kV. This is done mainly to:',
  right: 'reduce the current, and so the heat lost in the transmission lines',
  wrong: ['increase the current so that more power arrives', 'make the electricity flow faster along the lines', 'change the alternating current into direct current'],
  sol: 'For the same power, P = VI: a higher V means a smaller I, and the loss I²R falls — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('mainswitch-mcq', mcq({
  stem: 'The main switch fitted after the electricity meter of a house is a double-pole switch. When it is turned off, it:',
  right: 'breaks both the live and the neutral wires at the same time',
  wrong: ['breaks only the neutral wire', 'breaks only the earth wire', 'connects the live wire to the earth wire'],
  sol: 'A double-pole switch opens both supply wires together — option (@K).',
  d: 1, c: 'recall', t: [3],
}));
add('order-mcq', mcq({
  stem: 'Which is the correct order of parts, starting from the electric pole, in the supply to a house?',
  right: 'Company fuse, kWh meter, main switch, distribution board',
  wrong: ['kWh meter, company fuse, distribution board, main switch', 'Main switch, distribution board, kWh meter, company fuse', 'Distribution board, main switch, company fuse, kWh meter'],
  sol: 'The sealed company fuse comes first, then the meter, then the main switch, then the board — option (@K).',
  d: 2, c: 'recall', t: [3],
}));
add('fuse-ar', ar({
  a: 'A fuse wire is connected in series with the live wire of the circuit it protects.',
  r: 'A fuse wire is made of a material with a low melting point.',
  key: 'b',
  sol: 'Both are true, but R explains why the fuse melts, not why it is placed in series in the live wire — option (b).',
  d: 3, c: 'analysis', t: [3],
}));
add('ring-ar', ar({
  a: 'The cable of a ring main can be thinner than a single cable feeding the same sockets from one end.',
  r: 'In a ring main, current reaches each socket along two paths.',
  key: 'a',
  sol: 'Both are true; sharing the current between two paths means each part of the cable carries less — option (a).',
  d: 3, c: 'analysis', t: [3],
}));
add('trans-ar', ar({
  a: 'Electric power is transmitted over long distances at low voltage to reduce the energy lost.',
  r: 'The heat lost in a transmission line is I²R, where I is the current in the line.',
  key: 'd',
  sol: 'A is false: power is sent at high voltage, so that the current, and the I²R loss, is small. R is true — option (d).',
  d: 2, c: 'analysis', t: [3],
}));
add('mcb-tf', tf({
  stem: 'A miniature circuit breaker must be replaced with a new one every time it trips.',
  key: 'f',
  sol: 'False: an MCB is reset by switching it on again after the fault is cleared.',
  d: 1, c: 'recall', t: [3],
}));
add('fuse-fill', fill({
  stem: 'The fuse of a circuit is always connected in the ___ wire.',
  acc: [['live', 'phase']],
  sol: '**Live** wire.',
  d: 1, c: 'recall', t: [3],
}));
add('ring-fill', fill({
  stem: 'In a ring main system, the ring circuit is usually protected by a fuse or MCB of ___ A.',
  acc: [['30', '30 A']],
  sol: '**30** A.',
  d: 1, c: 'recall', t: [3],
}));
const Pmax = 16 * 220;
add('load-num', num({
  stem: 'A bedroom circuit on the 220 V mains is protected by a 16 A MCB. What is the largest total power, in watts, that can be switched on before it trips?',
  value: Pmax, tol: 1, unit: 'W',
  sol: r`$P = VI = 220 \times 16 = 3520$ W.`,
  scheme: [['3520 W', 1]],
  d: 2, c: 'application', t: [3],
}), () => Pmax === 3520 || 'P');
const ratio = (132 / 11) ** 2;
add('distrib-short2', short({
  marks: 2,
  stem: 'The same power is sent along a line first at 11 kV and then at 132 kV. (a) By what factor is the current reduced? (b) By what factor is the heat lost in the line reduced?',
  model: r`(a) $I = P/V$, so the current falls by $\dfrac{132}{11} = 12$ times. (b) Loss $= I^{2}R$, so it falls by $12 \times 12 = 144$ times.`,
  sol: '12; 144.',
  scheme: [['(a)', 1], ['(b)', 1]],
  d: 3, c: 'analysis', t: [3],
}), () => near(ratio, 144) || 'ratio');
add('livesw-short2', short({
  marks: 2,
  stem: 'An electrician wires the fuse of a kitchen circuit into the neutral wire. Explain the danger if the fuse then blows because of a fault.',
  model: 'The appliances stop working, but they are still joined to the live wire at 220 V. Anyone touching a faulty appliance, believing the circuit dead, can get an electric shock through the body to earth.',
  sol: 'Appliance stays live.',
  scheme: [['Still connected to live', 1], ['Shock risk explained', 1]],
  d: 3, c: 'evaluation', t: [3],
}));
add('order-short3', short({
  marks: 3,
  stem: 'List, in order from the electric pole, the four parts through which the mains supply passes before it reaches the circuits of a house. State the job of (a) the kWh meter and (b) the main switch.',
  model: 'Company fuse → kWh meter → main switch → distribution board. (a) The kWh meter records the electrical energy used, in units. (b) The main switch cuts off both the live and the neutral wires so that the whole house can be disconnected, for example during repairs.',
  sol: 'Order; two jobs.',
  scheme: [['Order', 1], ['(a)', 1], ['(b)', 1]],
  d: 2, c: 'recall', t: [3],
}));
add('mcb-short1', short({
  marks: 1,
  stem: 'Name the device in a modern distribution board that switches off a circuit automatically on overload and can be reset.',
  model: 'A miniature circuit breaker (MCB).',
  sol: 'MCB.',
  scheme: [['MCB', 1]],
  d: 1, c: 'recall', t: [3],
}));

// ---------------------------------------------------------------- t04 two-way switch, plug, earthing, colour code, safety
add('earthpin-mcq', mcq({
  stem: 'The earth pin of a three-pin plug is made longer than the live and neutral pins so that:',
  right: 'the appliance is earthed before it connects to the live supply and stays earthed until after it disconnects',
  wrong: ['it carries the larger current of the appliance', 'the plug stays firmly in the socket', 'it can be inserted into the live hole when the earth hole is blocked'],
  sol: 'Being longer, it enters first and leaves last — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('colour-mcq', mcq({
  stem: 'In the new international colour code used for house wiring, the insulation of the live wire is:',
  right: 'brown',
  wrong: ['light blue', 'green or green-yellow', 'black'],
  sol: 'Live brown, neutral light blue, earth green-yellow — option (@K).',
  d: 1, c: 'recall', t: [4],
}));
add('staircase-mcq', mcq({
  stem: 'A staircase lamp is controlled by two two-way switches, and it is now on. If either switch is flipped:',
  right: 'the lamp goes off, whichever switch is flipped',
  wrong: ['the lamp stays on unless both switches are flipped', 'the lamp goes off only if the lower switch is flipped', 'the fuse blows'],
  sol: 'The lamp is on only when both levers rest on the same strap wire; flipping either one breaks the path — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('earthfault-mcq', mcq({
  stem: 'Inside a steel-bodied washing machine, a loose live wire touches the body. The body is properly earthed. What happens?',
  right: 'A large current flows to earth and the fuse melts, cutting off the live supply',
  wrong: ['The machine keeps running and its body stays at 220 V', 'The current flows back through the neutral and nothing changes', 'The earth wire melts instead of the fuse'],
  sol: 'The earth path has a very low resistance, so the fault current is large and the fuse blows — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('thickpin-mcq', mcq({
  stem: 'The earth pin of a three-pin plug is also made thicker than the other two pins. This is so that:',
  right: 'it cannot be pushed into the live or the neutral hole of a socket by mistake',
  wrong: ['it has a high resistance', 'it melts first during a fault', 'it can carry the full load current'],
  sol: 'A thick pin fits only the large earth hole — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
add('earth-ar', ar({
  a: 'The metal body of an electric oven is connected to the earth wire.',
  r: 'The earth wire carries the working current of the oven during normal use.',
  key: 'c',
  sol: 'A is true; R is false: in normal use the earth wire carries no current — it carries current only during a fault — option (c).',
  d: 2, c: 'understanding', t: [4],
}));
add('twoway-tf', tf({
  stem: 'With a pair of two-way switches, a corridor lamp can be switched on or off from either end of the corridor.',
  key: 't',
  sol: 'True: flipping either two-way switch changes the state of the lamp.',
  d: 1, c: 'understanding', t: [4],
}));
add('colour-tf', tf({
  stem: 'In the new colour code, the earth wire has brown insulation.',
  key: 'f',
  sol: 'False: brown is live; the earth wire is green or green-yellow.',
  d: 1, c: 'recall', t: [4],
}));
add('earth-fill', fill({
  stem: 'To protect the user, the metal body of an electric iron is connected to the ___ wire.',
  acc: [['earth']],
  sol: '**Earth** wire.',
  d: 1, c: 'recall', t: [4],
}));
add('twoway-fill', fill({
  stem: 'A staircase lamp is controlled from both floors using two ___ switches.',
  acc: [['two-way', 'two way']],
  sol: '**Two-way** switches.',
  d: 1, c: 'recall', t: [4],
}));
const Ifault = 220 / (0.3 + 0.7);
add('fault-num', num({
  stem: 'The live wire of a water cooler touches its metal body. The live wiring up to the fault has a resistance of 0.3 Ω and the earth path from the body has 0.7 Ω. Find the fault current, in amperes, on the 220 V mains.',
  value: Ifault, tol: 0.5, unit: 'A',
  sol: r`$I = \dfrac{220}{0.3 + 0.7} = 220$ A, far more than any fuse rating, so the fuse melts at once.`,
  scheme: [['220 A', 1]],
  d: 3, c: 'application', t: [4],
}), () => near(Ifault, 220) || 'I');
add('colour-short1', short({
  marks: 1,
  stem: 'State the colours of the live, neutral and earth wires in the new colour code.',
  model: 'Live: brown; neutral: light blue; earth: green or green-yellow.',
  sol: 'Brown; light blue; green-yellow.',
  scheme: [['All three', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('earthing-short2', short({
  marks: 2,
  stem: 'Explain how earthing protects a person using a room heater with a metal body if a loose live wire touches the body.',
  model: 'The body is joined by a thick earth wire to a buried plate, a path of very low resistance. When the live wire touches the body, a large current flows to earth through this path instead of through a person; it melts the fuse (or trips the MCB) and the live supply is cut off.',
  sol: 'Low-resistance path; fuse blows.',
  scheme: [['Low-resistance path to earth', 1], ['Large current blows fuse, supply cut', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('pin-short2', short({
  marks: 2,
  stem: 'Give two reasons for the special shape of the earth pin of a three-pin plug.',
  model: 'It is longer, so it connects to earth before the live and neutral pins connect and disconnects after them. It is thicker, so it cannot be fitted into the live or neutral hole by mistake.',
  sol: 'Longer; thicker.',
  scheme: [['Longer: reason', 1], ['Thicker: reason', 1]],
  d: 1, c: 'understanding', t: [4],
}));
add('safety-short2', short({
  marks: 2,
  stem: 'Rina’s family is moving into an old house. State four precautions they should take with the electrical wiring and appliances.',
  model: 'Use fuses of the correct rating and never replace them with thick copper wire; earth all metal-bodied appliances and use three-pin plugs; switch off the main switch before any repair; do not overload sockets with adaptors; replace worn or cracked insulation; never handle switches with wet hands.',
  sol: 'Any four precautions.',
  scheme: [['Two precautions', 1], ['Two more precautions', 1]],
  d: 2, c: 'application', t: [4],
}));
add('twoway-short3', short({
  marks: 3,
  stem: 'A lamp on a staircase is to be controlled from the bottom and from the top of the stairs. (a) What kind of switch is used? (b) Describe how the two switches and the lamp are connected to the live and neutral wires. (c) State when the lamp is on.',
  model: '(a) Two two-way switches. (b) The live wire goes to the common terminal of the first switch; the two contacts of the first switch are joined to the two contacts of the second switch by two strap wires; the common terminal of the second switch goes to the lamp, and the lamp to the neutral. (c) The lamp is on when both switch levers rest on the same strap wire; flipping either switch then turns it off.',
  sol: 'Two-way switches; connections; condition.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
  d: 3, c: 'application', t: [4],
}));

// ---------------------------------------------------------------- match items
add('part-match', match({
  marks: 2,
  stem: 'Match each item in Column A with its function in Column B.',
  pairs: [
    ['Fuse', 'Melts and breaks the circuit when the current is too large'],
    ['MCB', 'Trips on overload and can be reset'],
    ['Earth wire', 'Gives a fault current a safe path to the ground'],
    ['kWh meter', 'Records the electrical energy used'],
  ],
  order: [3, 1, 0, 2],
  sol: 'Fuse → melts; MCB → trips and resets; earth wire → safe path to ground; kWh meter → records energy.',
  d: 1, c: 'recall', t: [2, 3, 4],
}));
add('quantity-match', match({
  marks: 2,
  stem: 'Match each item in Column A with the correct entry in Column B.',
  pairs: [
    ['Electric power', 'watt'],
    ['Commercial unit of energy', 'kilowatt hour'],
    ['Heat produced in a resistor', 'I²Rt'],
    ['Resistance of a 1000 W, 220 V element', '48.4 Ω'],
  ],
  order: [2, 0, 3, 1],
  sol: 'Power → watt; commercial unit → kWh; heat → I²Rt; 220² ÷ 1000 = 48.4 Ω.',
  d: 2, c: 'application', t: [1, 2],
}), () => near(220 ** 2 / 1000, 48.4) || 'R');

// ---------------------------------------------------------------- 10-mark structured questions
const Rk = 220 ** 2 / 1210;
const Ik = 1210 / 220;
const Pk = 200 ** 2 / Rk;
add('power-long', long({
  stem: '(a) Define electrical power and state its SI unit. Starting from P = VI, show that P = I²R and P = V²/R. [3]\n\n(b) An electric kettle is rated 1210 W, 220 V. Find (i) the resistance of its element, (ii) the current it draws normally and (iii) its power when the supply is only 200 V. [3]\n\n(c) A heater has two identical coils, each of resistance 55 Ω, and is used on 220 V. Find its power with (i) one coil, (ii) both coils in series and (iii) both coils in parallel. (iv) Which setting warms a room fastest? Give a reason. [4]',
  model: r`(a) Electrical power is the electrical energy converted per second; SI unit the watt (W). Since $V = IR$, $P = VI = I \times IR = I^{2}R$; since $I = V/R$, $P = V \times \dfrac{V}{R} = \dfrac{V^{2}}{R}$.

(b) (i) $R = \dfrac{220 \times 220}{1210} = 40$ Ω. (ii) $I = \dfrac{1210}{220} = 5.5$ A. (iii) $P = \dfrac{200 \times 200}{40} = 1000$ W.

(c) (i) $\dfrac{220 \times 220}{55} = 880$ W. (ii) $\dfrac{220 \times 220}{110} = 440$ W. (iii) $\dfrac{220 \times 220}{27.5} = 1760$ W. (iv) The parallel setting: it has the lowest resistance, so on the fixed mains voltage it converts the most energy per second.`,
  sol: 'Definition and derivation; kettle; three heater settings.',
  scheme: [['(a) definition and unit', 1], ['(a) both forms', 2], ['(b)(i)', 1], ['(b)(ii)', 1], ['(b)(iii)', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(c)(iv)', 1]],
  d: 3, c: 'application', t: [1],
}), () => near(Rk, 40) && near(Ik, 5.5) && near(Pk, 1000) && near(220 ** 2 / 55, 880) && near(220 ** 2 / 110, 440) && near(220 ** 2 / 27.5, 1760) || 'power');
const dayU = 1.6 * 5 + 0.25 * 24 + 2 * 0.05 * 8;
const monthU = dayU * 30;
const ledSave = (6 * (60 - 9) * 5 * 30) / 1000;
add('bill-long', long({
  stem: '(a) Define one kilowatt hour and express it in joules, showing your working. How does a kilowatt differ from a kilowatt hour? [3]\n\n(b) A household uses a 1.6 kW air conditioner for 5 hours a day, a 250 W refrigerator for 24 hours a day and two 50 W fans for 8 hours a day. Find (i) the units used per day, (ii) the units used in 30 days and (iii) the cost at ₹7 per unit. [3]\n\n(c) The same household replaces six 60 W filament bulbs by six 9 W LED lamps, each used 5 hours a day. (i) Find the power saved. (ii) Find the units saved in 30 days. (iii) Find the money saved at ₹7 per unit. (iv) The refrigerator has a lower power than the air conditioner. Why does it still use a large share of the units? [4]',
  model: r`(a) One kilowatt hour is the energy consumed by a 1 kW appliance in 1 hour: $1000 \times 3600 = 3600000$ J, that is $3.6 \times 10^{6}$ J. A kilowatt is a unit of power (energy per second); a kilowatt hour is a unit of energy.

(b) (i) $1.6 \times 5 + 0.25 \times 24 + 2 \times 0.05 \times 8 = 14.8$ kWh. (ii) $14.8 \times 30 = 444$ kWh. (iii) $444 \times 7 = 3108$, that is ₹3108.

(c) (i) $6 \times (60 - 9) = 306$ W. (ii) $\dfrac{306 \times 5 \times 30}{1000} = 45.9$ kWh. (iii) $45.9 \times 7 = 321.3$, that is about ₹321. (iv) It runs for all 24 hours, and energy depends on power and on time.`,
  sol: 'Definition and conversion; monthly bill; savings.',
  scheme: [['(a) definition and conversion', 2], ['(a) difference', 1], ['(b)(i)', 1], ['(b)(ii)', 1], ['(b)(iii)', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(c)(iv)', 1]],
  d: 3, c: 'application', t: [2],
}), () => near(dayU, 14.8) && near(monthU, 444) && near(monthU * 7, 3108) && near(ledSave, 45.9) || 'bill');
add('wiring-long', long({
  stem: '(a) Describe the stages by which electric power travels from a power station to a house, giving the voltage at each stage. Why is it transmitted at a high voltage? [3]\n\n(b) Name, in order, the parts between the electric pole and the circuits of a house, and state the function of the distribution board. [3]\n\n(c) (i) Describe the ring main system. (ii) State the rating of the fuse that protects it. (iii) Give two advantages of the ring main. (iv) Why are household appliances connected in parallel? [4]',
  model: '(a) Generated at about 11 kV; stepped up to about 132 kV and carried on transmission lines; stepped down at substations to 33 kV and then 11 kV; finally to 220 V at a local transformer. A high voltage means a small current for the same power, so less energy is lost as heat in the lines.\n\n(b) Company fuse, kWh meter, main switch, distribution board. The distribution board divides the supply into separate circuits, each protected by its own fuse or MCB.\n\n(c) (i) A cable with live, neutral and earth starts from the distribution board, runs round the rooms and returns to the board; sockets are connected in parallel along it. (ii) 30 A. (iii) Current reaches each socket by two paths, so a thinner cable is enough; new sockets can be added easily. (iv) Each appliance gets the full 220 V and can be switched on or off without affecting the others.',
  sol: 'Distribution; order of parts; ring main.',
  scheme: [['(a) stages', 2], ['(a) reason', 1], ['(b) order', 2], ['(b) function', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(c)(iv)', 1]],
  d: 2, c: 'understanding', t: [3],
}));
const Ik1 = (1500 + 1800 + 660) / 220;
const Ik2 = (1500 + 1800 + 660 + 1000) / 220;
add('fuse-long', long({
  stem: '(a) What is a fuse? State the property of its material and how it is connected in a circuit. [3]\n\n(b) A kitchen circuit on 220 V is protected by a 20 A MCB. A 1500 W oven, an 1800 W induction cooktop and a 660 W toaster are on together. (i) Find the total power. (ii) Find the current. (iii) Will the MCB trip if a 1000 W kettle is also switched on? Show your working. [3]\n\n(c) Fuses of 3 A, 5 A and 15 A are available. (i) Choose a fuse for a 330 W juicer. (ii) Choose a fuse for a 2.75 kW room heater. (iii) Why would a 15 A fuse be unsafe for the juicer? (iv) Why must a blown fuse never be replaced by a thick copper wire? [4]',
  model: r`(a) A fuse is a short, thin wire that melts and breaks the circuit when the current exceeds a safe value. Its material (an alloy such as tin–lead) has a low melting point. It is connected in series in the live wire.

(b) (i) $1500 + 1800 + 660 = 3960$ W. (ii) $I = \dfrac{3960}{220} = 18$ A. (iii) $I = \dfrac{3960 + 1000}{220} \approx 22.5$ A, more than 20 A, so the MCB trips.

(c) (i) $I = \dfrac{330}{220} = 1.5$ A: the 3 A fuse. (ii) $I = \dfrac{2750}{220} = 12.5$ A: the 15 A fuse. (iii) A fault current of several amperes could overheat the juicer’s thin wires or start a fire without melting a 15 A fuse. (iv) Copper has a high melting point and a thick wire carries a large current without melting, so the circuit would have no protection.`,
  sol: 'Fuse; MCB load; fuse choices.',
  scheme: [['(a) definition', 1], ['(a) property', 1], ['(a) connection', 1], ['(b)(i)', 1], ['(b)(ii)', 1], ['(b)(iii)', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(c)(iv)', 1]],
  d: 4, c: 'analysis', t: [3],
}), () => near(Ik1, 18) && Ik2 > 20 && near(Ik2, 22.55, 0.01) && near(330 / 220, 1.5) && near(2750 / 220, 12.5) || 'fuse');
const If2 = 220 / (0.2 + 0.9);
add('safety-long', long({
  stem: '(a) Name the three pins of a three-pin plug. Give one reason why the earth pin is longer and one why it is thicker. [3]\n\n(b) (i) What is earthing? (ii) The live wire of a geyser touches its earthed metal body. The live wiring has a resistance of 0.2 Ω and the earth path 0.9 Ω. Find the fault current on 220 V. (iii) What happens to the 15 A fuse? [3]\n\n(c) (i) Describe how two two-way switches control a staircase lamp. (ii) State the colours of the live, neutral and earth wires in the new code. (iii) and (iv) State two safety precautions in using electricity at home. [4]',
  model: r`(a) Live, neutral and earth. Longer: it makes contact first and breaks contact last, so the appliance is always earthed while it is live. Thicker: it cannot be pushed into the live or neutral hole.

(b) (i) Joining the metal body of an appliance to a plate buried in the earth through a thick wire. (ii) $I = \dfrac{220}{0.2 + 0.9} = 200$ A. (iii) This current is far above 15 A, so the fuse melts and cuts off the live supply.

(c) (i) Live goes to the common terminal of one switch; two strap wires join its contacts to the contacts of the other switch; the common terminal of the second switch goes through the lamp to neutral. The lamp is on when both levers are on the same strap wire. (ii) Live brown, neutral light blue, earth green or green-yellow. (iii) Switch off the main switch before a repair. (iv) Do not overload a socket with several high-power appliances.`,
  sol: 'Plug; earthing with fault current; staircase wiring, colours and precautions.',
  scheme: [['(a)', 3], ['(b)(i)', 1], ['(b)(ii)', 1], ['(b)(iii)', 1], ['(c)(i)', 1], ['(c)(ii)', 1], ['(c)(iii)', 1], ['(c)(iv)', 1]],
  d: 2, c: 'understanding', t: [4],
}), () => near(If2, 200) || 'I');
