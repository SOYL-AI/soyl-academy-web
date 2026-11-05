// ch11 Thermodynamics — question bank, part 3: t04 the second law, reversible and irreversible processes, heat engines and refrigerators.
import { mk, add, r, dec, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { R6 } from './phys.mjs';

const { mcq, ar, tf, fill, num, short } = mk;
const v3 = (x) => Number(dec(x, 3));

add('ks-mcq', mcq({
  stem: 'An inventor displays a machine that, working in a cycle, draws 800 J of heat from a boiler and turns all of it into 800 J of work, with no heat rejected anywhere. Which statement is correct?',
  right: 'It violates the second law (Kelvin–Planck statement), although it does not violate energy conservation',
  wrong: ['It violates the first law, because energy would not be conserved', 'It violates the zeroth law, because the boiler and the machine are not in equilibrium', 'It violates no law; it is simply a very efficient engine'],
  sol: 'Energy is conserved (800 J in, 800 J out), so the first law is satisfied. But converting all the heat from one reservoir into work in a cycle is forbidden by the Kelvin–Planck statement — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('clausius-mcq', mcq({
  stem: 'A box with no power supply and no moving parts is claimed to keep its inside at 5 °C while standing in a room at 30 °C, simply by moving heat out of its interior. This claim would break',
  right: 'the Clausius statement of the second law',
  wrong: ['the Kelvin–Planck statement alone, but not the Clausius statement', 'the first law, because heat cannot be conserved', 'the zeroth law, because the box and the room are not in thermal equilibrium'],
  sol: 'Heat would flow from a colder region to a hotter one with no work input and no other effect, which the Clausius statement rules out — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
const poss = [
  { Q1: 800, W: 300, Q2: 500 },
  { Q1: 600, W: 600, Q2: 0 },
  { Q1: 500, W: 200, Q2: 400 },
  { Q1: 700, W: 250, Q2: 400 },
];
const fmt = (p) => `Q₁ = ${p.Q1}, W = ${p.W}, Q₂ = ${p.Q2}`;
add('possible-mcq', mcq({
  stem: 'Four inventors report data for engines working in cycles: heat absorbed Q₁, work done W and heat rejected Q₂ per cycle, all in J. Which set can be consistent with both the first and the second law?',
  right: fmt(poss[0]),
  wrong: [fmt(poss[1]), fmt(poss[2]), fmt(poss[3])],
  sol: `Over a cycle W = Q₁ − Q₂ (first law), and Q₂ must be greater than 0 (second law). ${fmt(poss[0])} gives 800 − 500 = 300 with Q₂ > 0: allowed. The set ${fmt(poss[1])} has Q₂ = 0 (violates the second law); ${fmt(poss[2])} has 500 − 400 = 100 ≠ 200 and ${fmt(poss[3])} has 700 − 400 = 300 ≠ 250 (both violate the first law) — option (@K).`,
  d: 4, c: 'analysis', t: [4],
}), () => poss[0].Q1 - poss[0].Q2 === poss[0].W && poss[0].Q2 > 0 && poss[1].Q2 === 0 && poss[2].Q1 - poss[2].Q2 !== poss[2].W && poss[3].Q1 - poss[3].Q2 !== poss[3].W || 'poss');
add('rev-mcq', mcq({
  stem: 'Which of the following processes comes closest to being reversible?',
  right: 'A gas expands extremely slowly against a frictionless piston while in contact with a large reservoir at the same temperature',
  wrong: ['A balloon bursts and its gas rushes out into the air', 'A block slides across a rough floor and comes to rest', 'Hot water is poured into cold water in a bucket and stirred'],
  sol: 'A reversible process must be quasi-static and free of friction and of heat flow across a finite temperature difference. Only the slow, frictionless expansion in contact with a reservoir approaches this; the other three involve sudden expansion, friction and finite-temperature mixing — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
const rc = { Q2: 1200, WX: 300, WY: 400 };
rc.cx = R6(rc.Q2 / rc.WX);
rc.cy = R6(rc.Q2 / rc.WY);
add('cop-mcq', mcq({
  stem: 'Two refrigerators X and Y each remove 1200 J of heat from their cold spaces in a given time. X needs 300 J of work for this and Y needs 400 J. Which is the better refrigerator, and why?',
  right: `X, because its coefficient of performance is ${rc.cx} against ${rc.cy} for Y`,
  wrong: ['Y, because it uses more work and so cools more strongly', 'They are equally good, because each removes 1200 J', `X, because its coefficient of performance is ${rc.cy} and Y’s is ${rc.cx}`],
  sol: r`$\text{COP} = Q_2/W$: for X, $1200/300 = ${rc.cx}$; for Y, $1200/400 = ${rc.cy}$. A larger COP means more heat removed per joule of work — option (@K).`,
  d: 3, c: 'application', t: [4],
}), () => rc.cx === 4 && rc.cy === 3 || 'cop');
add('effone-tf', tf({
  stem: 'A heat engine that turned all the heat it absorbed from a single reservoir into work in every cycle would break the first law of thermodynamics.',
  key: 'f',
  sol: 'False. Such an engine would conserve energy (heat in = work out), so the first law is satisfied; it would break the second law (Kelvin–Planck statement).',
  d: 3, c: 'understanding', t: [4],
}));
add('fridge-ar', ar({
  a: 'The coefficient of performance of a refrigerator can be greater than 1.',
  r: 'The work supplied to a refrigerator is always larger than the heat it removes from its cold space.',
  key: 'c',
  sol: 'A is true: COP = Q₂/W is commonly above 2 for a domestic refrigerator. R is false: W is usually much smaller than Q₂, which is why the COP is large — option (c).',
  d: 3, c: 'understanding', t: [4],
}));
add('refheat-ar', ar({
  a: 'A refrigerator running in a closed kitchen releases more heat into the room than it removes from its cold compartment.',
  r: 'The heat released to the room equals the heat removed from the cold compartment plus the work supplied to the compressor.',
  key: 'a',
  sol: 'Over a cycle ΔU = 0, so Q₁ = Q₂ + W. Because W > 0, Q₁ > Q₂; R states the energy balance and so explains A — option (a).',
  d: 3, c: 'understanding', t: [4],
}));
add('cop-fill', fill({
  stem: 'For a refrigerator, the heat removed from the cold space divided by the work supplied is called its coefficient of ___.',
  acc: [['performance']],
  sol: 'It is the coefficient of **performance**, COP = Q₂/W.',
  d: 1, c: 'recall', t: [4],
}));
const ef = { Q1: 750, Q2: 540 };
ef.W = ef.Q1 - ef.Q2;
ef.eta = R6((ef.W / ef.Q1) * 100);
add('eff-num', num({
  stem: 'In each cycle a diesel generator set absorbs 750 kJ of heat from burning fuel and rejects 540 kJ to the exhaust and cooling water. Find its efficiency, in per cent.',
  value: ef.eta, tol: 0.2, unit: '%',
  sol: r`$W = Q_1 - Q_2 = ${ef.Q1} - ${ef.Q2} = ${ef.W}$ kJ per cycle, so $\eta = \dfrac{W}{Q_1} \times 100 = \dfrac{${ef.W}}{${ef.Q1}} \times 100 = ${ef.eta}\%$.`,
  scheme: [[`W = Q₁ − Q₂ = ${ef.W} kJ`, 1]],
  d: 1, c: 'application', t: [4],
}), (q) => near((1 - 540 / 750) * 100, q.answer.value, 1e-9) || 'eff');
const rj = { eta: 0.30, W: 600 };
rj.Q1 = R6(rj.W / rj.eta);
rj.Q2 = R6(rj.Q1 - rj.W);
add('rej-num', num({
  stem: 'A heat engine of efficiency 30% delivers 600 J of work in each cycle. Find the heat it rejects to the cold reservoir in each cycle, in J.',
  value: rj.Q2, tol: 2, unit: 'J',
  sol: r`$\eta = W/Q_1$, so $Q_1 = \dfrac{${rj.W}}{${rj.eta}} = ${rj.Q1}$ J. Then $Q_2 = Q_1 - W = ${rj.Q1} - ${rj.W} = ${rj.Q2}$ J.`,
  scheme: [[`Q₁ = W/η = ${rj.W}/${rj.eta} = ${rj.Q1} J`, 1], [`Q₂ = Q₁ − W = ${rj.Q2} J`, 1]],
  marks: 2, d: 2, c: 'application', t: [4],
}), (q) => near(600 * (1 / 0.3 - 1), q.answer.value, 1e-9) && near(q.answer.value, 600 * (1 - 0.3) / 0.3, 1e-9) || 'rej');
const cp = { Q2: 2.7, W: 0.6 };
cp.cop = R6(cp.Q2 / cp.W);
add('cop-num', num({
  stem: 'In one hour a domestic refrigerator removes 2.7 MJ of heat from its cold space while its compressor supplies 0.60 MJ of work. Find its coefficient of performance.',
  value: cp.cop, tol: 0.05, unit: null,
  sol: r`$\text{COP} = \dfrac{Q_2}{W} = \dfrac{${cp.Q2}}{${cp.W}} = ${cp.cop}$.`,
  scheme: [['COP = Q₂/W', 1], [`2.7/0.60 = ${cp.cop}`, 1]],
  marks: 2, d: 2, c: 'application', t: [4],
}), (q) => near(2.7 / 0.6, q.answer.value, 1e-9) || 'cop');
const ap = { cop: 3.2, P: 1.5 };
ap.Q2 = R6(ap.cop * ap.P);
ap.Q1 = R6(ap.Q2 + ap.P);
add('ac-num', num({
  stem: 'A window air-conditioner has a coefficient of performance of 3.2 and its compressor takes 1.5 kW of power, all of it used as work. Find the rate at which it releases heat to the outdoors, in kW.',
  value: ap.Q1, tol: 0.05, unit: 'kW',
  sol: r`Heat removed from the room per second $Q_2 = \text{COP} \times W = ${ap.cop} \times ${ap.P} = ${ap.Q2}$ kW. Heat released outdoors $Q_1 = Q_2 + W = ${ap.Q2} + ${ap.P} = ${ap.Q1}$ kW.`,
  scheme: [[`Q₂ = COP × W = ${ap.Q2} kW`, 1], [`Q₁ = Q₂ + W = ${ap.Q1} kW`, 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), (q) => near(1.5 * (3.2 + 1), q.answer.value, 1e-9) || 'ac');
const pw = { eta: 0.24, Q1: 2500, f: 40 };
pw.W = R6(pw.eta * pw.Q1);
pw.P = R6((pw.W * pw.f) / 1000);
add('power-num', num({
  stem: 'A heat engine of efficiency 24% takes in 2500 J of heat from the hot reservoir in each cycle and completes 40 cycles every second. Find the power it delivers, in kW.',
  value: pw.P, tol: 0.1, unit: 'kW',
  sol: r`Work per cycle $W = \eta Q_1 = ${pw.eta} \times ${pw.Q1} = ${pw.W}$ J. Power $= ${pw.W} \times ${pw.f}$ J/s $= ${pw.W * pw.f}$ W, so $P = ${pw.P}$ kW.`,
  scheme: [[`W = ηQ₁ = ${pw.W} J per cycle`, 1], [`Power = ${pw.W} × ${pw.f} = ${pw.W * pw.f} W = ${pw.P} kW`, 1]],
  marks: 2, d: 2, c: 'application', t: [4],
}), (q) => near(2500 * 0.24 * 40 / 1000, q.answer.value, 1e-9) || 'power');
add('ks-short', short({
  marks: 2,
  stem: 'State the Kelvin–Planck statement of the second law of thermodynamics and say what it implies for the efficiency of a heat engine.',
  model: 'No cyclic device can absorb heat from a **single reservoir** and convert **all** of it into work with no other effect. Hence every heat engine must reject some heat to a colder body, so its efficiency η = W/Q₁ = 1 − Q₂/Q₁ is always **less than 1**.',
  sol: 'Statement; some heat must be rejected, η < 1.',
  scheme: [['Kelvin–Planck statement: complete conversion of heat from one reservoir into work in a cycle is impossible', 1], ['So Q₂ > 0 and η < 1', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('rev-short', short({
  marks: 2,
  stem: 'What is a reversible process? Give one example of a process that is irreversible and state why it is so.',
  model: 'A **reversible process** can be retraced exactly, so that both the system and its surroundings return to their initial states; it must be quasi-static and free of friction and of heat flow across a finite temperature difference. Example of an irreversible process: a gas rushing into an evacuated chamber, which never collects itself back into one chamber.',
  sol: 'Definition with conditions; example with reason.',
  scheme: [['Reversible: retraced exactly, quasi-static, no friction or finite-temperature heat flow', 1], ['An irreversible example with its reason', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('irrev-short3', short({
  marks: 3,
  stem: 'A hot spoon placed in cold tea cools while the tea warms. Explain why this process is irreversible, how the Clausius statement shows that the spoon cannot spontaneously reheat itself at the tea’s expense, and whether such a reverse process would break the first law.',
  model: 'Heat flows across a finite temperature difference from the spoon to the tea, and this flow is one-way. The Clausius statement forbids heat from passing from the colder tea to the hotter spoon as the only result. The reverse process would conserve energy, so it would **not** break the first law; it would break the second law.',
  sol: 'One-way heat flow; Clausius forbids reverse; first law is not violated.',
  scheme: [['Heat flows across a finite temperature gap; the process is one-way (irreversible)', 1], ['Clausius: heat cannot pass from cold to hot as the only result', 1], ['The reverse conserves energy, so it breaks the second law, not the first', 1]],
  d: 3, c: 'analysis', t: [4],
}));
add('engine-short3', short({
  marks: 3,
  stem: 'Describe how a heat engine works, using the heat Q₁ absorbed, the heat Q₂ rejected and the work W done in a cycle. Obtain its efficiency and explain why it cannot be 1.',
  model: r`The engine absorbs heat $Q_1$ from a hot reservoir, converts part of it into useful work $W$ and rejects the remaining heat $Q_2$ to a cold reservoir. Over a complete cycle $\Delta U = 0$, so $W = Q_1 - Q_2$, and the efficiency is the fraction of the absorbed heat turned into work: $\eta = \dfrac{W}{Q_1} = 1 - \dfrac{Q_2}{Q_1}$. For $\eta = 1$ we would need $Q_2 = 0$, which the Kelvin–Planck statement forbids.`,
  sol: 'W = Q₁ − Q₂; η = 1 − Q₂/Q₁; η = 1 forbidden.',
  scheme: [['Q₁ in, W out, Q₂ rejected; W = Q₁ − Q₂ (ΔU = 0)', 1], ['η = W/Q₁ = 1 − Q₂/Q₁', 1], ['η = 1 needs Q₂ = 0, which the second law forbids', 1]],
  d: 3, c: 'understanding', t: [4],
}));
