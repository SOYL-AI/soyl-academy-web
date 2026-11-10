// ISC 11 Chemistry ch10 Thermodynamics: Systems and the First Law: question bank (ISC style).
// Every numerical is computed from data.mjs and re-solved by a check. Sign convention: delta U = q + w, work done ON the system is positive,
// so w = -p_ext delta V. Constants: R = 8.314 J K-1 mol-1, 1 L atm = 101.3 J, 2.303 = ln 10. Assertion-reason keys: a b c d a b.
import { mk, add, r, near } from './lib.mjs';
import { R, RL, LATM, LN10, CMP, PATHS, CYC, MONO, wIrrev, wIrrevLatm, wRev, wIsobaric, dHfromU, dUfromH, CpFromCv, qHeat } from './data.mjs';

const { mcq, ar, tf, fill, match, num, short, long } = mk;
const f0 = (x) => Math.round(x).toString();
const f1 = (x) => x.toFixed(1);
const f2 = (x) => x.toFixed(2);
const f3 = (x) => x.toFixed(3);
const sgn = (x, fmt = f0, u = ' J') => `${x < 0 ? '−' : '+'}${fmt(Math.abs(x))}${u}`;

// ---------------------------------------------------------------- t01 systems, properties, state functions
add('sys-bottle-mcq', mcq({
  stem: 'A hospital pharmacist stores a sealed, unopened bottle of glucose saline in a refrigerator. If the saline in the bottle is taken as the system, the system is best called:',
  right: 'closed, because heat can cross the glass but no matter can',
  wrong: ['open, because the cold air of the refrigerator surrounds the bottle', 'isolated, because the bottle is sealed', 'open, because heat is exchanged with the refrigerator'],
  sol: 'The glass is sealed, so no matter crosses the boundary, but heat flows freely through it. A system that exchanges energy but not matter is closed — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('chk-open-mcq', mcq({
  stem: 'A student boils water in an uncovered steel pan on a gas stove and takes the water in the pan as the system. Which description is correct?',
  right: 'Open: steam leaves the pan and heat enters from the flame',
  wrong: ['Closed: heat enters from the flame but matter stays in the pan', 'Isolated: the pan is made of steel', 'Closed: matter can leave the system only in the form of heat'],
  sol: 'Steam (matter) leaves and heat enters, so both matter and energy cross the boundary: an open system — option (@K).',
  d: 1, c: 'understanding', t: [1],
}));
add('flask-mcq', mcq({
  stem: 'A hiker pours hot soup into a vacuum flask and screws the stopper on tightly. For the next hour the soup is taken as the system. Which statement is closest to the truth?',
  right: 'The system is nearly isolated: very little heat and no matter cross the boundary',
  wrong: ['The system is open, because the soup can be poured out later', 'The system is closed, because heat flows freely through the vacuum wall', 'The system is open, because the soup is hotter than the surroundings'],
  sol: 'The vacuum wall prevents conduction and convection and the stopper prevents loss of matter, so almost no heat and no matter cross the boundary. The system is nearly isolated — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('split-mcq', mcq({
  stem: 'A chemist divides 500 mL of brine at 25 °C into two equal portions in separate beakers. Which property has the same value for each portion as for the original 500 mL sample?',
  right: 'Density',
  wrong: ['Mass', 'Volume', 'Total heat capacity'],
  sol: 'Mass, volume and heat capacity depend on the amount of brine, so each halves (extensive). Density is a ratio of two extensive properties and does not depend on the amount (intensive) — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('path-mcq', mcq({
  stem: 'A gas is taken from the same initial state to the same final state by two different routes, one quick and one slow. Which quantity has exactly the same value for the two routes?',
  right: 'The change in internal energy',
  wrong: ['The heat absorbed by the gas', 'The work done on the gas', 'Both the heat absorbed and the work done'],
  sol: 'Internal energy is a state function, so its change depends only on the initial and final states. Heat and work depend on the route — option (@K).',
  d: 2, c: 'understanding', t: [1],
}));
add('route-mcq', (() => {
  const qX = 300;
  const wByX = 120;
  const wByY = 200;
  const dU = qX - wByX;
  const qY = dU + wByY;
  return mcq({
    stem: `A gas goes from state A to state B along route X, absorbing ${qX} J of heat and doing ${wByX} J of work. Along route Y between the same two states the gas does ${wByY} J of work. How much heat does the gas absorb along route Y?`,
    right: `${qY} J`,
    wrong: [`${dU} J`, `${qX} J`, `${dU - wByY} J`.replace('-', '−')],
    sol: `Internal energy is a state function, so ΔU is the same on both routes. Route X: ΔU = q + w = ${qX} − ${wByX} = ${dU} J. Route Y: ${dU} = q + (−${wByY}), so q = ${dU} + ${wByY} = ${qY} J — option (@K).`,
    d: 3, c: 'analysis', t: [1, 3],
  });
})(), (q) => 300 - 120 + 200 === 380 || 'route-mcq');
add('heat-tf', tf({
  stem: 'The heat absorbed by a gas in going from one given state to another is the same by every route, because heat is a state function.',
  key: 'f',
  sol: 'False. Heat is a path function: it depends on the route taken. Only quantities such as U, H, p, V and T are state functions.',
  d: 1, c: 'understanding', t: [1],
}));
add('state-fill', fill({
  stem: 'A property whose change depends only on the initial and final states of the system, and not on the path, is called a ___ function.',
  acc: [['state', 'State']],
  sol: 'Such a property is a state function (for example internal energy or enthalpy).',
  d: 1, c: 'recall', t: [1],
}));
add('intens-fill', fill({
  stem: 'The ratio of two extensive properties, such as mass divided by volume, is an ___ property.',
  acc: [['intensive', 'Intensive']],
  sol: 'The amount of substance cancels in the ratio, so the result does not depend on the size of the sample: it is an intensive property.',
  d: 1, c: 'recall', t: [1],
}));
add('s2-types', short({
  marks: 2,
  stem: 'Name the type of system (open, closed or isolated) in each case, with a reason: (a) water boiling in an uncovered pan; (b) a stoppered flask of ethanol warming in the sunshine.',
  model: '(a) Open: steam (matter) leaves the pan and heat enters, so matter and energy are both exchanged. (b) Closed: the stopper prevents matter from leaving, but heat from the sunshine crosses the glass.',
  sol: 'Pan: open (matter and energy); flask: closed (energy only).',
  scheme: [['(a) Open, with matter and energy exchanged', 1], ['(b) Closed, with energy but no matter exchanged', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('s2-intext', short({
  marks: 2,
  stem: 'Classify each of the following as an intensive or an extensive property: density, enthalpy, molar volume, mass.',
  model: 'Density: intensive. Enthalpy: extensive. Molar volume: intensive (volume per mole). Mass: extensive.',
  sol: 'Density and molar volume intensive; enthalpy and mass extensive.',
  scheme: [['Density intensive', 0.5], ['Enthalpy extensive', 0.5], ['Molar volume intensive', 0.5], ['Mass extensive', 0.5]],
  d: 1, c: 'recall', t: [1],
}));
add('s2-state', short({
  marks: 2,
  stem: 'Define a state function. Name one state function and one path function.',
  model: 'A state function is a property whose value depends only on the present state of the system, so that its change depends only on the initial and final states and not on how the change was brought about. Internal energy (or enthalpy, pressure, volume, temperature) is a state function; heat (or work) is a path function.',
  sol: 'Depends only on the state, not the path; U or H; q or w.',
  scheme: [['Definition: depends only on initial and final states, not on the path', 1], ['One state function and one path function', 1]],
  d: 1, c: 'understanding', t: [1],
}));
add('long-class', long({
  stem: `A student studies a few everyday systems and properties.

(a) Classify each system as open, closed or isolated: (i) a lit candle burning in a room, (ii) a sealed ampoule of vaccine kept in an ice box, (iii) a tightly stoppered vacuum flask of hot water, (iv) a green leaf in sunlight. [2]

(b) Classify each property as intensive or extensive, and as a state function or a path function: temperature, work, enthalpy, density. [2]

(c) State, with a reason, why the heat absorbed by a system cannot be called a state function. [1]`,
  model: `(a) (i) Open: the candle takes in oxygen and gives out gases and heat. (ii) Closed: it exchanges heat with the ice but no matter. (iii) Isolated, to a very good approximation: neither matter nor heat crosses the boundary. (iv) Open: it exchanges gases, water and energy with the surroundings.

(b) Temperature: intensive, state function. Work: depends on the amount and on the path; it is a path function (extensive). Enthalpy: extensive, state function. Density: intensive, state function.

(c) The heat absorbed depends on how the change is carried out (the path); the same initial and final states can be joined by routes in which different amounts of heat are exchanged.`,
  sol: 'Open, closed, isolated, open; classification of four properties; heat depends on the path.',
  scheme: [['(a) Four systems, 0.5 each', 2], ['(b) Four properties, 0.5 each', 2], ['(c) Heat depends on the path, not just the states', 1]],
  d: 2, c: 'understanding', t: [1],
}));

// ---------------------------------------------------------------- t02 processes
add('proc-cyl-mcq', mcq({
  stem: 'A sample of gas sealed in a rigid steel cylinder is warmed on a burner. This process is best described as:',
  right: 'isochoric',
  wrong: ['isobaric', 'isothermal', 'adiabatic'],
  sol: 'A rigid cylinder cannot change its volume, so the volume is constant: an isochoric process, in which the gas does no p–V work — option (@K).',
  d: 1, c: 'understanding', t: [2],
}));
add('chk-adiab-tf', tf({
  stem: 'An adiabatic process is one in which the temperature of the system stays constant.',
  key: 'f',
  sol: 'False. In an adiabatic process no heat is exchanged (q = 0). The temperature usually changes, because work changes the internal energy. Constant temperature is called isothermal.',
  d: 1, c: 'understanding', t: [2],
}));
add('adiab-pump-mcq', mcq({
  stem: 'A cyclist pumps a tyre so quickly that no heat escapes from the barrel, and the barrel becomes warm. Taking the air in the barrel as the system, which statement is correct?',
  right: 'q = 0 and w > 0, so ΔU > 0 and the air warms',
  wrong: ['q > 0 and w = 0, so ΔU > 0 and the air warms', 'ΔU = 0, because no heat is exchanged', 'q = 0 and w < 0, so ΔU < 0 and the air cools'],
  sol: 'No heat escapes, so q = 0. The plunger does work on the air, so w is positive. Then ΔU = q + w = w > 0 and the temperature rises — option (@K).',
  d: 3, c: 'application', t: [2, 3],
}));
add('rev-sand-mcq', mcq({
  stem: 'An engineer models the slow lifting of a piston by removing tiny grains of sand, one at a time, from its top. The expansion is treated as reversible because:',
  right: 'the opposing pressure is always only infinitesimally smaller than the gas pressure, so the system stays in equilibrium',
  wrong: ['the gas does no work during the expansion', 'the temperature of the gas falls steadily', 'the change takes place at constant volume'],
  sol: 'Removing the sand grain by grain keeps the driving force infinitesimal, so the gas is in equilibrium at every stage and the change could be reversed by an infinitesimal change — option (@K).',
  d: 2, c: 'understanding', t: [2],
}));
add('equil-mcq', mcq({
  stem: 'A system is said to be in thermodynamic equilibrium when it is simultaneously in:',
  right: 'thermal, mechanical and chemical equilibrium',
  wrong: ['thermal equilibrium only', 'mechanical equilibrium and phase equilibrium only', 'chemical equilibrium only'],
  sol: 'Thermodynamic equilibrium needs equal temperature throughout (thermal), no unbalanced forces (mechanical) and no net change in composition (chemical) — option (@K).',
  d: 1, c: 'recall', t: [2],
}));
add('cyc-loop-mcq', mcq({
  stem: 'An ideal gas is carried round a closed loop on a p–V diagram and finally comes back to its starting state. Which quantity is certainly zero for the complete loop?',
  right: 'The change in internal energy',
  wrong: ['The heat absorbed', 'The work done', 'Both the heat absorbed and the work done'],
  sol: 'Internal energy is a state function, so over a cycle that returns to the initial state its change is zero. Then q = −w, and neither q nor w is zero unless the loop encloses no area — option (@K).',
  d: 2, c: 'understanding', t: [2, 3],
}));
add('proc-match', match({
  stem: 'Match each laboratory situation with the thermodynamic process it represents.',
  pairs: [['A tyre pump is squeezed so fast that no heat escapes', 'Adiabatic'], ['Water boils in an open pan at atmospheric pressure', 'Isobaric'], ['Gas in a sealed rigid can is placed on a stove', 'Isochoric'], ['Gas in a cylinder is compressed slowly while the cylinder sits in a large water bath', 'Isothermal']],
  order: [2, 0, 3, 1],
  sol: 'No heat exchanged: adiabatic; open to the atmosphere: constant pressure, isobaric; rigid can: constant volume, isochoric; large water bath: constant temperature, isothermal.',
  d: 2, c: 'application', t: [2],
}));
add('s2-isoth', short({
  marks: 2,
  stem: 'Distinguish between an isothermal process and an adiabatic process, stating what is constant or zero in each.',
  model: 'In an isothermal process the temperature of the system stays constant (ΔT = 0); heat can flow in or out to keep it so. In an adiabatic process no heat is exchanged with the surroundings (q = 0); the temperature of the system generally changes.',
  sol: 'Isothermal: T constant, heat may flow; adiabatic: q = 0, T changes.',
  scheme: [['Isothermal: ΔT = 0, heat can be exchanged', 1], ['Adiabatic: q = 0, temperature changes', 1]],
  d: 1, c: 'understanding', t: [2],
}));
add('s2-rev', short({
  marks: 2,
  stem: 'What is meant by a reversible process? Why can no real process be exactly reversible?',
  model: 'A reversible process is carried out infinitely slowly through a series of equilibrium states, with the driving force only infinitesimally greater than the opposing force, so that it can be reversed by an infinitesimal change. A real process proceeds in finite time with a finite driving force, so the system is not in equilibrium at every stage.',
  sol: 'Infinitely slow, equilibrium at every stage; real processes have finite driving force and finite speed.',
  scheme: [['Infinitely slow, through equilibrium states, infinitesimal driving force', 1], ['Real processes: finite driving force and speed, so not reversible', 1]],
  d: 2, c: 'understanding', t: [2],
}));
add('s3-process', short({
  marks: 3,
  stem: 'A cylinder fitted with a piston holds a gas. Name the process, and give the simplified form of the first law, when (a) the piston is clamped and the gas is heated; (b) the piston moves freely under the constant pressure of the atmosphere while the gas is heated; (c) the cylinder is perfectly insulated and the piston is pushed in.',
  model: '(a) Isochoric (V constant): no p–V work, so ΔU = q. (b) Isobaric (p constant): the heat absorbed equals the enthalpy change, q = ΔH (and ΔU = q + w with w = −p ΔV). (c) Adiabatic (q = 0): ΔU = w, which is positive, so the gas warms.',
  sol: 'Isochoric ΔU = q; isobaric q = ΔH; adiabatic ΔU = w.',
  scheme: [['(a) Isochoric, ΔU = q', 1], ['(b) Isobaric, q = ΔH', 1], ['(c) Adiabatic, ΔU = w', 1]],
  d: 2, c: 'application', t: [2],
}));
add('s2-cyclic', short({
  marks: 2,
  stem: 'Explain why the change in internal energy is zero for a cyclic process, and write the relation between q and w for one complete cycle.',
  model: 'Internal energy is a state function, so its change depends only on the initial and final states. In a cyclic process these are the same state, so ΔU = 0. Then ΔU = q + w = 0 gives q = −w: the net heat absorbed equals the net work done by the system.',
  sol: 'U is a state function and the final state equals the initial state; q = −w.',
  scheme: [['U is a state function and final state = initial state, so ΔU = 0', 1], ['q + w = 0, so q = −w', 1]],
  d: 2, c: 'understanding', t: [3],
}));

// ---------------------------------------------------------------- t03 first law
add('chk-sign-mcq', (() => {
  const q = -28;
  const w = 64;
  const d = q + w;
  return mcq({
    stem: `A student squeezes a gas in a syringe: the plunger does ${w} J of work on the gas while the gas gives out ${-q} J of heat to the room. Using ΔU = q + w, the change in internal energy of the gas is:`,
    right: sgn(d),
    wrong: [sgn(w - q), sgn(-d), sgn(-(w - q))],
    sol: `Work is done on the gas, so w = +${w} J. Heat leaves the gas, so q = −${-q} J. ΔU = q + w = −${-q} + ${w} = ${sgn(d)} — option (@K).`,
    d: 2, c: 'application', t: [3],
  });
})(), () => 64 - 28 === 36 || 'chk-sign');
add('iso-reactor-mcq', mcq({
  stem: 'A reacting mixture is sealed in a rigid, perfectly insulated vessel, and the contents are taken as the system. The first law for this system gives:',
  right: 'ΔU = 0, because neither heat nor work crosses the boundary',
  wrong: ['ΔU = q, because the volume is fixed', 'ΔU = w, because heat cannot cross the walls', 'ΔU > 0, because the reaction releases energy'],
  sol: 'The vessel is insulated (q = 0) and rigid (w = 0), so the system is isolated and ΔU = q + w = 0. The energy released by the reaction only raises the temperature of the contents — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('dU-burner-mcq', (() => {
  const q = 560;
  const w = -210;
  const d = q + w;
  return mcq({
    stem: `A gas absorbs ${q} J of heat from a burner and, in expanding, does ${-w} J of work on a piston. By how much does the internal energy of the gas change?`,
    right: sgn(d),
    wrong: [sgn(q - w), sgn(-d), sgn(-(q - w))],
    sol: `Heat is absorbed, so q = +${q} J. The gas does work, so w = −${-w} J. ΔU = q + w = ${q} − ${-w} = ${sgn(d)} — option (@K).`,
    d: 2, c: 'application', t: [3],
  });
})(), () => 560 - 210 === 350 || 'dU-burner');
add('isoth-bath-mcq', mcq({
  stem: 'One mole of an ideal gas in a cylinder, immersed in a large water bath at 310 K, is allowed to expand slowly while its temperature stays at 310 K. Which row gives the correct signs of ΔU, q and w for the gas?',
  right: 'ΔU = 0, q > 0, w < 0',
  wrong: ['ΔU > 0, q > 0, w < 0', 'ΔU = 0, q < 0, w > 0', 'ΔU < 0, q = 0, w < 0'],
  sol: 'The internal energy of an ideal gas depends only on temperature, so ΔU = 0. The gas expands, so w < 0. Then q = −w > 0: the gas absorbs heat from the bath — option (@K).',
  d: 3, c: 'application', t: [3],
}));
add('iso-tf', tf({
  stem: 'The internal energy of an isolated system remains constant.',
  key: 't',
  sol: 'True. An isolated system exchanges neither heat nor work with its surroundings, so q = 0, w = 0 and ΔU = 0.',
  d: 1, c: 'recall', t: [3],
}));
add('firstlaw-match', match({
  stem: 'Match each situation with the form that the first law takes.',
  pairs: [['Isolated system', 'ΔU = 0'], ['Adiabatic change', 'ΔU = w'], ['Constant volume, no p–V work', 'ΔU = q'], ['Isothermal change of an ideal gas', 'q = −w']],
  order: [2, 0, 3, 1],
  sol: 'Isolated: ΔU = 0; adiabatic: ΔU = w; constant volume: ΔU = q; isothermal ideal gas: ΔU = 0, so q = −w.',
  d: 2, c: 'understanding', t: [3],
}));
add('cycle-num', (() => {
  const qh = 820;
  const qc = 530;
  const wby = qh - qc;
  return num({
    stem: `In a model heat engine, a gas absorbs ${qh} J of heat from a hot source and releases ${qc} J to a cold sink during one complete cycle. What is the net work, in joules, done by the gas in one cycle?`,
    value: wby, tol: 0, unit: 'J',
    sol: r`Net heat absorbed $q = ${qh} - ${qc} = ${wby}$ J. For a cycle $\Delta U = 0$, so $q + w = 0$ and $w = -${wby}$ J on the gas. The work done by the gas $= ${wby}$ J.`,
    scheme: [['q = 820 − 530 = 290 J', 0.5], ['ΔU = 0 so work done by the gas = 290 J', 0.5]],
    marks: 1, d: 2, c: 'application', t: [3],
  });
})(), (q) => q.answer.value === 820 - 530 || 'cycle-num');
add('adiab-num', (() => {
  const n = 0.5;
  const Cv = 12.5;
  const w = -340;
  const dT = w / (n * Cv);
  return num({
    stem: `A monatomic ideal gas (C_V = ${Cv} J K⁻¹ mol⁻¹), ${n} mol in all, expands adiabatically in a thermally insulated cylinder and does ${-w} J of work. Calculate the change in its temperature, in kelvin.`,
    value: Number(f1(dT)), tol: 0.1, unit: 'K',
    sol: r`Adiabatic: $q = 0$, so $\Delta U = w = ${w}$ J (the gas does the work). With $\Delta U = nC_V\Delta T$: $\Delta T = \dfrac{${w}}{${n} \times ${Cv}} = ${f1(dT)}$ K.`,
    scheme: [['q = 0, so ΔU = w = −340 J', 1], ['ΔT = ΔU/(n C_V) = −54.4 K', 1]],
    marks: 2, d: 4, c: 'analysis', t: [2, 3],
  });
})(), (q) => near(-340 / (0.5 * 12.5), -54.4, 0.002) && q.answer.value === -54.4 || 'adiab-num');
add('ar-iso', ar({
  a: 'The internal energy of an isolated system remains constant.',
  r: 'An isolated system exchanges neither heat nor work with its surroundings.',
  key: 'a',
  sol: 'Both statements are true. With q = 0 and w = 0, the first law gives ΔU = 0, so Reason explains Assertion — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('s3-signs', short({
  marks: 3,
  stem: 'For the gas in each case, state whether q, w and ΔU are positive, negative or zero: (a) an ideal gas is compressed slowly by a piston while the cylinder stays in a thermostat bath; (b) a gas expands adiabatically against the atmosphere; (c) a gas is heated in a rigid sealed cylinder.',
  model: '(a) Isothermal compression of an ideal gas: ΔU = 0, w > 0 (work done on the gas), so q < 0 (heat flows out to the bath). (b) Adiabatic expansion: q = 0, w < 0 (the gas does work), so ΔU < 0 and the gas cools. (c) Rigid vessel: w = 0, q > 0, so ΔU = q > 0.',
  sol: '(a) ΔU = 0, w +, q −; (b) q = 0, w −, ΔU −; (c) w = 0, q +, ΔU +.',
  scheme: [['(a) ΔU = 0, w positive, q negative', 1], ['(b) q = 0, w negative, ΔU negative', 1], ['(c) w = 0, q positive, ΔU positive', 1]],
  d: 3, c: 'application', t: [3],
}));
add('s3-adiab', short({
  marks: 3,
  stem: 'A sample of an ideal gas expands rapidly inside a perfectly insulated cylinder, pushing a piston outwards. Using the first law and ΔU = n C_V ΔT, explain why its temperature falls.',
  model: 'The cylinder is insulated, so the change is adiabatic: q = 0. The gas pushes the piston out, so the gas does work and w is negative. Hence ΔU = q + w = w < 0, the internal energy falls. For an ideal gas ΔU = n C_V ΔT with n and C_V positive, so ΔT is negative: the temperature falls.',
  sol: 'q = 0, w < 0, so ΔU < 0 and ΔT = ΔU/(n C_V) < 0.',
  scheme: [['Adiabatic: q = 0', 1], ['Gas does work: w negative, ΔU = w < 0', 1], ['ΔU = n C_V ΔT so ΔT < 0', 1]],
  d: 3, c: 'analysis', t: [2, 3],
}));
add('long-law', (() => {
  const qh = 1.4;
  const qc = 0.95;
  const net = qh - qc;
  return long({
    stem: `(a) State the first law of thermodynamics and write its mathematical form, stating clearly the sign conventions for q and w. [2]

(b) In one complete cycle a gas absorbs ${f2(qh)} kJ of heat from a hot reservoir and gives ${f2(qc)} kJ to a cold reservoir. Calculate ΔU for the cycle and the net work, and state whether it is done on or by the gas. [3]`,
    model: r`(a) Energy can be neither created nor destroyed: the change in the internal energy of a closed system equals the heat exchanged plus the work done. $\Delta U = q + w$, where $q$ is positive when heat is absorbed by the system and $w$ is positive when work is done on the system.

(b) The final state is the initial state and $U$ is a state function, so $\Delta U = 0$. Net heat absorbed $q = ${f2(qh)} - ${f2(qc)} = ${f2(net)}$ kJ. From $\Delta U = q + w = 0$, $w = -${f2(net)}$ kJ. The work is negative, so ${f2(net)} kJ (${f0(net * 1000)} J) of work is done by the gas.`,
    sol: 'First law, ΔU = q + w; ΔU = 0; net w = −0.45 kJ, done by the gas.',
    scheme: [['(a) Statement of the law', 1], ['(a) ΔU = q + w with the sign convention', 1], ['(b) ΔU = 0 for a cycle', 1], ['(b) Net q = 0.45 kJ and w = −0.45 kJ', 1], ['(b) Work done by the gas', 1]],
    d: 3, c: 'application', t: [3],
  });
})(), () => near(1.4 - 0.95, 0.45, 1e-9) || 'long-law');
add('long-adia', (() => {
  const n = 1.0;
  const Cv = 12.5;
  const T1 = 300;
  const w = 800;
  const dT = w / (n * Cv);
  const T2 = T1 + dT;
  return long({
    stem: `(a) What is meant by an adiabatic process, and what form does the first law take for it? [1]

(b) One mole of a monatomic ideal gas (C_V = ${Cv} J K⁻¹ mol⁻¹) at ${T1} K is compressed rapidly in an insulated cylinder, the surroundings doing ${w} J of work on it. Calculate ΔU, q, the temperature rise and the final temperature. [3]

(c) What would be the sign of ΔU if the same gas expanded adiabatically? Give a reason. [1]`,
    model: r`(a) An adiabatic process is one in which no heat is exchanged with the surroundings, $q = 0$, so $\Delta U = w$.

(b) $q = 0$ and $w = +${w}$ J (work done on the gas), so $\Delta U = ${w}$ J. $\Delta T = \dfrac{\Delta U}{nC_V} = \dfrac{${w}}{${n} \times ${Cv}} = ${f1(dT)}$ K, so $T_2 = ${T1} + ${f1(dT)} = ${f0(T2)}$ K.

(c) $\Delta U$ would be negative: the gas does work ($w < 0$) and $q = 0$, so $\Delta U = w < 0$ and the gas cools.`,
    sol: 'q = 0, ΔU = w = +800 J, ΔT = 64.0 K, T2 = 364 K; expansion gives ΔU < 0.',
    scheme: [['(a) Definition q = 0 and ΔU = w', 1], ['(b) q = 0 and ΔU = +800 J', 1], ['(b) ΔT = ΔU/(n C_V) = 64.0 K', 1], ['(b) T2 = 364 K', 1], ['(c) ΔU negative, since w < 0 and q = 0', 1]],
    d: 3, c: 'analysis', t: [2, 3],
  });
})(), () => near(300 + 800 / 12.5, 364, 1e-9) || 'long-adia');

// ---------------------------------------------------------------- t04 work of expansion
add('wirr-mcq', (() => {
  const p = 1.6;
  const V1 = 4.0;
  const V2 = 9.0;
  const w = wIrrev(p, V1, V2);
  return mcq({
    stem: `In a school demonstration, ${V1} L of gas trapped under a light piston swells to ${V2} L while the atmosphere pushes back with a steady ${p} atm. Taking 1 L atm = 101.3 J, the work done on the gas is about:`,
    right: sgn(w),
    wrong: [sgn(-w), `−${f1(p * (V2 - V1))} J`, sgn(wIrrev(p, 0, V1 + V2))],
    sol: `$w = -p_\\text{ext}\\Delta V = -${p} \\times (${V2} - ${V1}) = -${f1(p * (V2 - V1))}$ L atm $= -${f1(p * (V2 - V1))} \\times 101.3 = ${sgn(w)}$. The sign is negative because the gas does the work — option (@K).`,
    d: 3, c: 'application', t: [4],
  });
})(), (q) => near(wIrrev(1.6, 4, 9), -810.4, 0.001) || 'wirr-mcq');
add('revmax-mcq', mcq({
  stem: 'An ideal gas expands isothermally between the same two states, once in a single step against a constant external pressure and once reversibly. The work done by the gas is:',
  right: 'greater in the reversible expansion, because the opposing pressure stays close to the gas pressure throughout',
  wrong: ['greater in the single step, because the pressure difference driving the change is larger', 'the same in both, because the initial and final states are the same', 'zero in both, because the temperature does not change'],
  sol: 'Work is the area under the p–V curve. In the single step the opposing pressure is the low final pressure, giving a small rectangle. The reversible path keeps p_ext just below the gas pressure, giving the larger area under the isotherm — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('chk-work-num', (() => {
  const p = 1.5;
  const V1 = 2.0;
  const V2 = 5.0;
  const w = wIrrev(p, V1, V2);
  return num({
    stem: `A gas in a cylinder pushes a piston out against a constant external pressure of ${p} atm, and its volume grows from ${V1} L to ${V2} L. Calculate the work done on the gas in joules. (1 L atm = 101.3 J)`,
    value: Number(f0(w)), tol: 1, unit: 'J',
    sol: r`$w = -p_\text{ext}\Delta V = -${p} \times (${V2} - ${V1}) = ${f1(wIrrevLatm(p, V1, V2))}$ L atm $= ${f1(wIrrevLatm(p, V1, V2))} \times 101.3 = ${f0(w)}$ J.`,
    scheme: [['w = −p_ext ΔV = −4.5 L atm', 0.5], ['−456 J', 0.5]],
    marks: 1, d: 2, c: 'application', t: [4],
  });
})(), (q) => q.answer.value === -456 || 'chk-work-num');
add('wirr-num', (() => {
  const p = 1.2;
  const V1 = 3.0;
  const V2 = 8.0;
  const w = wIrrev(p, V1, V2);
  return num({
    stem: `The gas in the cylinder of a small air compressor grows in volume from ${V1} L to ${V2} L, the opposing pressure staying at ${p} atm throughout. Calculate the work done on the gas, in joules. (1 L atm = 101.3 J)`,
    value: Number(f0(w)), tol: 1, unit: 'J',
    sol: r`$\Delta V = ${V2} - ${V1} = ${f1(V2 - V1)}$ L. $w = -p_\text{ext}\Delta V = -${p} \times ${f1(V2 - V1)} = ${f1(wIrrevLatm(p, V1, V2))}$ L atm. In joules: $${f1(wIrrevLatm(p, V1, V2))} \times 101.3 = ${f0(w)}$ J.`,
    scheme: [['ΔV = 5.0 L and w = −6.0 L atm', 1], ['−608 J', 1]],
    marks: 2, d: 3, c: 'application', t: [4],
  });
})(), (q) => q.answer.value === -608 || 'wirr-num');
add('wrev-num', (() => {
  const n = 1.5;
  const T = 298;
  const V1 = 6.0;
  const V2 = 24.0;
  const w = wRev(n, T, V1, V2);
  const lg = Math.log10(V2 / V1);
  return num({
    stem: `A research student lets ${n} mol of an ideal gas expand reversibly and isothermally at ${T} K from ${V1} L to ${V2} L. Calculate the work done on the gas, in joules. (R = 8.314 J K⁻¹ mol⁻¹)`,
    value: Number(f0(w)), tol: 5, unit: 'J',
    sol: r`$w = -2.303\,nRT\log_{10}\dfrac{V_2}{V_1} = -2.303 \times ${n} \times 8.314 \times ${T} \times \log_{10}${V2 / V1} = -2.303 \times ${n} \times 8.314 \times ${T} \times ${f3(lg)} = ${f0(w)}$ J.`,
    scheme: [['log(V2/V1) = log 4 = 0.602', 0.5], ['Substitution in −2.303 nRT log(V2/V1)', 0.5], ['−5153 J (about −5.15 kJ)', 1]],
    marks: 2, d: 3, c: 'application', t: [4],
  });
})(), (q) => near(-2.303 * 1.5 * 8.314 * 298 * Math.log10(4), q.answer.value, 0.002) || 'wrev-num');
add('ar-isoth', ar({
  a: 'A gas that expands isothermally and reversibly absorbs heat from its surroundings.',
  r: 'During an isothermal change of an ideal gas no heat is exchanged with the surroundings.',
  key: 'c',
  sol: 'The Assertion is true: ΔU = 0 for the ideal gas and w < 0, so q = −w > 0. The Reason is false: in an isothermal change heat flows in (or out) to hold the temperature constant; it is an adiabatic change that has q = 0 — option (c).',
  d: 3, c: 'analysis', t: [4],
}));
add('ar-irrev', ar({
  a: 'In an expansion between the same two states, an irreversible process delivers more work than the reversible process.',
  r: 'In an irreversible expansion the opposing pressure is always equal to the pressure of the gas.',
  key: 'd',
  sol: 'Both statements are false. A reversible expansion delivers the maximum work, and it is in the reversible process that the opposing pressure is (nearly) equal to the gas pressure at every stage — option (d).',
  d: 3, c: 'analysis', t: [4],
}));
add('s2-free', short({
  marks: 2,
  stem: 'A gas is released into an evacuated, insulated vessel and fills it (free expansion). State the work done and the value of ΔU for an ideal gas, with reasons.',
  model: 'The external pressure is zero, so w = −p_ext ΔV = 0. The vessel is insulated, so q = 0. Therefore ΔU = q + w = 0, and for an ideal gas (U depends only on T) the temperature does not change.',
  sol: 'p_ext = 0 so w = 0; q = 0; ΔU = 0.',
  scheme: [['w = −p_ext ΔV = 0 because p_ext = 0', 1], ['q = 0 (insulated), so ΔU = 0', 1]],
  d: 3, c: 'application', t: [4],
}));
add('s3-path', (() => {
  const A = { p: 6.0, V: 1.0 };
  const B = { p: 2.0, V: 4.0 };
  const wI = wIrrevLatm(B.p, A.V, B.V);
  const wII = wIrrevLatm(A.p, A.V, B.V);
  return short({
    marks: 3,
    stem: `A gas is taken from state A (${A.p} atm, ${A.V} L) to state B (${B.p} atm, ${B.V} L) by two routes. Route I: the gas is cooled at ${A.V} L until the pressure is ${B.p} atm, then expanded at ${B.p} atm to ${B.V} L. Route II: it is first expanded at ${A.p} atm to ${B.V} L, then cooled at ${B.V} L to ${B.p} atm. Calculate the work done on the gas along each route in L atm, and say what the results show about work and about the change in internal energy.`,
    model: `Route I: only the expansion at ${B.p} atm does work: w = −${B.p} × (${B.V} − ${A.V}) = ${f1(wI)} L atm. Route II: only the expansion at ${A.p} atm does work: w = −${A.p} × (${B.V} − ${A.V}) = ${f1(wII)} L atm. The work is different for the two routes between the same end states, so work is a path function. The end states are the same, so ΔU (a state function) is the same for both.`,
    sol: `w(I) = ${f1(wI)} L atm; w(II) = ${f1(wII)} L atm; work depends on path, ΔU does not.`,
    scheme: [[`Route I: w = ${f1(wI)} L atm`, 1], [`Route II: w = ${f1(wII)} L atm`, 1], ['Work is a path function; ΔU is the same (state function)', 1]],
    d: 4, c: 'analysis', t: [1, 4],
  });
})(), () => near(wIrrevLatm(2, 1, 4), -6, 1e-9) && near(wIrrevLatm(6, 1, 4), -18, 1e-9) || 's3-path');
add('s3-revirrev', short({
  marks: 3,
  stem: 'State three differences between a reversible process and an irreversible process.',
  model: 'A reversible process proceeds infinitely slowly, an irreversible process at a finite rate. In a reversible process the system is in equilibrium at every stage; in an irreversible process it is not. A reversible process is driven by an infinitesimal difference of force or pressure and can be reversed by an infinitesimal change, while an irreversible one has a finite driving force and cannot. A reversible expansion gives the maximum work; an irreversible one gives less.',
  sol: 'Speed, equilibrium at every stage, driving force, and work obtained.',
  scheme: [['Infinitely slow against finite rate', 1], ['Equilibrium at every stage against not', 1], ['Maximum work against less work (or infinitesimal against finite driving force)', 1]],
  d: 2, c: 'understanding', t: [2, 4],
}));
add('s3-pvgraph', short({
  marks: 3,
  stem: 'An ideal gas at 300 K expands isothermally from pressure p₁ to a lower pressure p₂. On one p–V graph the one-step expansion against p₂ and the reversible expansion are both drawn from the same starting point. Which area is larger, and why? Say what each area represents.',
  model: 'In the one-step expansion the opposing pressure is p₂ throughout, so the work is the area of the rectangle of height p₂ under the horizontal line from V₁ to V₂. In the reversible expansion the opposing pressure follows the isotherm pV = constant, and the work is the area under that curve between V₁ and V₂. The isotherm lies above the horizontal line p₂ at every volume before V₂, so the area under it is larger: the reversible expansion gives the maximum work.',
  sol: 'Area under the isotherm exceeds the rectangle under p₂, so reversible work is larger.',
  scheme: [['Each area is the magnitude of the work for that route', 1], ['The isotherm lies above the line at p₂ until V₂', 1], ['So reversible area (maximum work) is larger', 1]],
  d: 3, c: 'analysis', t: [4],
}));
add('long-steps', (() => {
  const { n, T, p1, p2, pm, V1, Vm, V2, w1, w2, wr } = CMP;
  return long({
    stem: `One mole of an ideal gas at ${T} K is held at ${p1} atm in a cylinder and allowed to expand isothermally to ${p2} atm. (R = 0.0821 L atm K⁻¹ mol⁻¹ for volumes; R = 8.314 J K⁻¹ mol⁻¹; 1 L atm = 101.3 J)

(a) Calculate the initial and final volumes, and the work done on the gas when it expands in one step against a constant external pressure of ${p2} atm. [2]

(b) The same change is now carried out in two steps: first against ${pm} atm until the pressure of the gas has fallen to ${pm} atm, then against ${p2} atm. Calculate the total work done on the gas. [1.5]

(c) Calculate the work for the reversible isothermal expansion between the same states, and arrange the three values in order of the work obtained. [1.5]`,
    model: r`(a) $V = nRT/p$: $V_1 = \dfrac{1 \times 0.0821 \times 300}{${p1}} = ${f2(V1)}$ L and $V_2 = \dfrac{0.0821 \times 300}{${p2}} = ${f2(V2)}$ L. $w = -p_\text{ext}\Delta V = -${p2} \times (${f2(V2)} - ${f2(V1)}) = ${f1(w1 / LATM)}$ L atm $= ${f0(w1)}$ J.

(b) The gas reaches $${pm}$ atm at $V_m = ${f2(Vm)}$ L. Step 1: $w = -${pm} \times (${f2(Vm)} - ${f2(V1)}) = ${f1(CMP.wa / LATM)}$ L atm. Step 2: $w = -${p2} \times (${f2(V2)} - ${f2(Vm)}) = ${f1(CMP.wb / LATM)}$ L atm. Total $= ${f1(w2 / LATM)}$ L atm $= ${f0(w2)}$ J.

(c) $w_\text{rev} = -2.303\,nRT\log_{10}(V_2/V_1) = -2.303 \times 1 \times 8.314 \times 300 \times \log_{10}4 = ${f0(wr)}$ J. Work obtained: reversible (${f0(-wr)} J) > two steps (${f0(-w2)} J) > one step (${f0(-w1)} J).`,
    sol: `One step ${f0(w1)} J; two steps ${f0(w2)} J; reversible ${f0(wr)} J; more steps give more work.`,
    scheme: [['(a) V1 = 3.08 L and V2 = 12.3 L', 1], [`(a) w = ${f0(w1)} J`, 1], ['(b) Two correct steps (Vm = 6.16 L)', 1], [`(b) Total ${f0(w2)} J`, 0.5], [`(c) w_rev = ${f0(wr)} J`, 1], ['(c) Order reversible > two steps > one step', 0.5]],
    d: 4, c: 'analysis', t: [4],
  });
})(), () => near(CMP.w1, -1871, 0.002) && near(CMP.w2, -2495, 0.002) && near(CMP.wr, -3458, 0.002) || 'long-steps');

// ---------------------------------------------------------------- t05 enthalpy and heat capacity
add('chk-dn-mcq', mcq({
  stem: 'Which of the following reactions has ΔH smaller (more negative) than ΔU at the same temperature?',
  right: r`$\ce{2SO2(g) + O2(g) -> 2SO3(g)}$`,
  wrong: [r`$\ce{N2(g) + O2(g) -> 2NO(g)}$`, r`$\ce{CaCO3(s) -> CaO(s) + CO2(g)}$`, r`$\ce{H2(g) + Cl2(g) -> 2HCl(g)}$`],
  sol: r`$\Delta H = \Delta U + \Delta n_g RT$. For $\ce{2SO2 + O2 -> 2SO3}$, $\Delta n_g = 2 - 3 = -1$, so $\Delta H < \Delta U$. The reactions with $\Delta n_g = 0$ have $\Delta H = \Delta U$, and $\Delta n_g = +1$ for the decomposition of calcium carbonate gives $\Delta H > \Delta U$ — option (@K).`,
  d: 2, c: 'application', t: [5],
}));
add('dn-ethene-mcq', (() => {
  const dn = 2 - 4;
  const T = 300;
  const d = (dn * R * T) / 1000;
  return mcq({
    stem: String.raw`For $\ce{C2H4(g) + 3O2(g) -> 2CO2(g) + 2H2O(l)}$ at ${T} K, the difference $\Delta H - \Delta U$ is closest to ($R = 8.314\ \text{J K}^{-1}\text{mol}^{-1}$):`,
    right: `−${f2(-d)} kJ`,
    wrong: [`+${f2(-d)} kJ`, `−${f2(-d / 2)} kJ`, '0 kJ'],
    sol: String.raw`Only gases count: products 2 mol, reactants $1 + 3 = 4$ mol, so $\Delta n_g = ${dn}$. $\Delta H - \Delta U = \Delta n_g RT = (${dn}) \times 8.314 \times ${T} = ${f0(dn * R * T)}$ J $= ${f2(d)}$ kJ — option (@K).`,
    d: 3, c: 'application', t: [5],
  });
})(), () => near(-2 * 8.314 * 300 / 1000, -4.988, 0.001) || 'dn-ethene');
add('H-def-mcq', mcq({
  stem: 'Enthalpy is defined by H = U + pV. Which statement about enthalpy is correct?',
  right: 'It is an extensive state function, and its change at constant pressure equals the heat exchanged',
  wrong: ['It is a path function, because it contains the product pV', 'It is an intensive state function, because pressure is intensive', 'Its change equals the heat exchanged at constant volume'],
  sol: 'U, p and V are state properties, so H is a state function; U and V depend on the amount, so H is extensive. At constant pressure q_p = ΔU + pΔV = ΔH; at constant volume the heat equals ΔU — option (@K).',
  d: 1, c: 'understanding', t: [5],
}));
add('qp-beaker-mcq', mcq({
  stem: 'A reaction in an open beaker releases 56 kJ as heat to the surroundings while the pressure stays at atmospheric pressure. The 56 kJ of heat transferred equals:',
  right: 'ΔH of the reaction, which is −56 kJ',
  wrong: ['ΔU of the reaction, which is −56 kJ', 'ΔH of the reaction, which is +56 kJ', 'zero ΔH, because the pressure is constant'],
  sol: 'At constant pressure the heat exchanged is the enthalpy change, q_p = ΔH. Heat leaves the system, so ΔH = −56 kJ — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('cv-argon-mcq', (() => {
  const Cv = 12.5;
  const Cp = 20.8;
  const dT = 50;
  const dU = Cv * dT;
  return mcq({
    stem: `One mole of argon (C_V = ${Cv} J K⁻¹ mol⁻¹, C_p = ${Cp} J K⁻¹ mol⁻¹) is heated from 300 K to 350 K at constant pressure. Treating it as an ideal gas, the change in its internal energy is:`,
    right: `${f0(dU)} J`,
    wrong: [`${f0(Cp * dT)} J`, `${f0(R * dT)} J`, `${f0(dU + Cp * dT)} J`],
    sol: `For an ideal gas ΔU = n C_V ΔT whatever the process. ΔU = 1 × ${Cv} × ${dT} = ${f0(dU)} J. (The heat absorbed is n C_p ΔT = ${f0(Cp * dT)} J, which also includes the work of expansion.) — option (@K).`,
    d: 3, c: 'application', t: [5],
  });
})(), () => 12.5 * 50 === 625 || 'cv-argon');
add('cpcv-mcq', mcq({
  stem: 'For one mole of an ideal gas, C_p exceeds C_V by 8.314 J K⁻¹ mol⁻¹. This difference represents:',
  right: 'the work done against the surroundings when one mole expands on being heated by 1 K at constant pressure',
  wrong: ['the heat lost to the surroundings by radiation', 'the extra internal energy stored per kelvin at constant pressure', 'the energy needed to overcome the attractions between the molecules'],
  sol: 'At constant pressure the gas expands as it is heated and does work p ΔV = R ΔT, which at ΔT = 1 K per mole is R. This extra heat is the difference C_p − C_V = R — option (@K).',
  d: 2, c: 'understanding', t: [5],
}));
add('molar-cap-mcq', (() => {
  const n = 0.4;
  const q = 1200;
  const dT = 100;
  const Cm = q / (n * dT);
  return mcq({
    stem: `In a rigid sealed vessel, ${f1(n)} mol of an ideal gas absorbs ${q} J of heat and its temperature rises by ${dT} K. The molar heat capacity of the gas at constant volume is:`,
    right: `${f0(Cm)} J K⁻¹ mol⁻¹`,
    wrong: [`${f0(q / dT)} J K⁻¹ mol⁻¹`, `${f0(q / n)} J mol⁻¹`, `${f1(n * (q / dT))} J K⁻¹ mol⁻¹`],
    sol: `The vessel is rigid, so q = ΔU = n C_V ΔT. C_V = q/(n ΔT) = ${q}/(${f1(n)} × ${dT}) = ${f0(Cm)} J K⁻¹ mol⁻¹. (${f0(q / dT)} J K⁻¹ is the heat capacity of the whole sample, not per mole.) — option (@K).`,
    d: 3, c: 'application', t: [5],
  });
})(), () => 1200 / (0.4 * 100) === 30 || 'molar-cap-mcq');
add('dH-num', (() => {
  const dUkJ = 175.0;
  const dn = 1;
  const T = 1100;
  const dH = dHfromU(dUkJ, dn, T);
  return num({
    stem: String.raw`In a kiln at ${T} K, the decomposition $\ce{CaCO3(s) -> CaO(s) + CO2(g)}$ has $\Delta U = +${f1(dUkJ)}$ kJ per mole of CaCO₃ (illustrative value, given). Calculate $\Delta H$ in kJ. ($R = 8.314\ \text{J K}^{-1}\text{mol}^{-1}$)`,
    value: Number(f1(dH)), tol: 0.1, unit: 'kJ',
    sol: String.raw`Only the gas counts: $\Delta n_g = 1 - 0 = ${dn}$. $\Delta n_g RT = ${dn} \times 8.314 \times 10^{-3} \times ${T} = ${f2((dn * R * T) / 1000)}$ kJ. $\Delta H = \Delta U + \Delta n_g RT = ${f1(dUkJ)} + ${f2((dn * R * T) / 1000)} = ${f1(dH)}$ kJ.`,
    scheme: [['Δn_g = +1 and Δn_g RT = 9.15 kJ', 1], ['ΔH = 184.1 kJ', 1]],
    marks: 2, d: 3, c: 'application', t: [5],
  });
})(), (q) => near(175 + (8.314 * 1100) / 1000, 184.1, 0.001) && q.answer.value === 184.1 || 'dH-num');
add('isobar-num', (() => {
  const n = 0.5;
  const dT = 100;
  const w = wIsobaric(n, dT);
  return num({
    stem: `A sealed piston holds ${n} mol of an ideal gas which is warmed from 300 K to 400 K at the constant pressure of the laboratory. Calculate the work done on the gas, in joules. (R = 8.314 J K⁻¹ mol⁻¹)`,
    value: Number(f0(w)), tol: 1, unit: 'J',
    sol: r`At constant pressure $w = -p\Delta V = -nR\Delta T = -${n} \times 8.314 \times ${dT} = ${f0(w)}$ J (the gas expands and does work).`,
    scheme: [['p ΔV = n R ΔT for an ideal gas', 0.5], ['−416 J', 0.5]],
    marks: 1, d: 3, c: 'application', t: [4, 5],
  });
})(), (q) => q.answer.value === -416 || 'isobar-num');
add('spec-num', (() => {
  const m = 250;
  const c = 4.18;
  const dT = 65.0 - 20.0;
  const q = qHeat(m, c, dT) / 1000;
  return num({
    stem: `A student warms ${m} g of water from 20.0 °C to 65.0 °C in a beaker. Taking the specific heat of water as ${c} J g⁻¹ K⁻¹, calculate the heat absorbed, in kJ.`,
    value: Number(f1(q)), tol: 0.1, unit: 'kJ',
    sol: r`$q = mc\Delta T = ${m} \times ${c} \times (65.0 - 20.0) = ${m} \times ${c} \times ${dT} = ${f0(qHeat(m, c, dT))}$ J $= ${f1(q)}$ kJ.`,
    scheme: [['ΔT = 45.0 K', 0.5], ['47.0 kJ', 0.5]],
    marks: 1, d: 1, c: 'understanding', t: [5],
  });
})(), (q) => near(250 * 4.18 * 45 / 1000, 47.0, 0.002) && q.answer.value === 47.0 || 'spec-num');
add('ar-enth', ar({
  a: 'Enthalpy is a state function.',
  r: 'Enthalpy is an extensive property.',
  key: 'b',
  sol: 'Both statements are true. Enthalpy is a state function because it is defined from U, p and V, which are all state properties. Being extensive is a separate property and does not explain why it is a state function — option (b).',
  d: 2, c: 'understanding', t: [5],
}));
add('chk-cpcv-ar', ar({
  a: 'Heating one mole of an ideal gas by 1 K at constant pressure needs R joules more heat than heating it by 1 K at constant volume.',
  r: 'At constant pressure part of the heat is used by the gas to push back the surroundings as it expands.',
  key: 'a',
  sol: 'Both statements are true. At constant volume all the heat raises U; at constant pressure the gas also does work p ΔV = R ΔT, which needs the extra R joules — Reason explains Assertion, option (a).',
  d: 2, c: 'understanding', t: [5],
}));
add('ar-shc', ar({
  a: 'The specific heat of a substance is an intensive property.',
  r: 'Water has a larger specific heat than most common liquids.',
  key: 'b',
  sol: 'Both statements are true (water 4.18 J g⁻¹ K⁻¹). Specific heat is heat per gram per kelvin, so the amount of substance cancels and it is intensive; how large water’s value is has nothing to do with that — option (b).',
  d: 2, c: 'understanding', t: [5],
}));
add('s2-H', short({
  marks: 2,
  stem: 'Define enthalpy. Under what condition is the heat absorbed by a system equal to its change in enthalpy?',
  model: 'Enthalpy is the state function H = U + pV, the sum of the internal energy and the product of pressure and volume. The heat absorbed equals ΔH when the change takes place at constant pressure (with only p–V work).',
  sol: 'H = U + pV; heat equals ΔH at constant pressure.',
  scheme: [['H = U + pV (state function)', 1], ['At constant pressure q_p = ΔH', 1]],
  d: 2, c: 'understanding', t: [5],
}));
add('s2-cpcv', short({
  marks: 2,
  stem: 'Why is C_p greater than C_V for a gas, while for a solid the two are almost equal?',
  model: 'At constant volume all the heat raises the internal energy. At constant pressure a gas expands on heating and does work against the surroundings, so extra heat is needed for the same rise in temperature. A solid expands very little, so almost no p–V work is done and the two heat capacities are nearly equal.',
  sol: 'Gas does expansion work at constant pressure; a solid hardly expands.',
  scheme: [['Constant p: extra heat goes into expansion work of the gas', 1], ['A solid expands very little, so little work and C_p ≈ C_V', 1]],
  d: 3, c: 'application', t: [5],
}));
add('s3-dHdU', (() => {
  const rx = [
    [String.raw`$\ce{H2(g) + I2(g) -> 2HI(g)}$`, 2 - 2],
    [String.raw`$\ce{2KClO3(s) -> 2KCl(s) + 3O2(g)}$`, 3 - 0],
    [String.raw`$\ce{C2H4(g) + H2(g) -> C2H6(g)}$`, 1 - 2],
  ];
  const word = (dn) => (dn === 0 ? 'ΔH = ΔU' : dn > 0 ? 'ΔH > ΔU' : 'ΔH < ΔU');
  return short({
    marks: 3,
    stem: `Find Δn_g for each reaction and state whether ΔH is equal to, greater than or smaller than ΔU at the same temperature: (a) ${rx[0][0]}; (b) ${rx[1][0]}; (c) ${rx[2][0]}.`,
    model: `Using ΔH = ΔU + Δn_g RT with only gases counted: (a) Δn_g = 2 − 2 = 0, so ΔH = ΔU. (b) Δn_g = 3 − 0 = +3, so ΔH > ΔU (by 3RT). (c) Δn_g = 1 − 2 = −1, so ΔH < ΔU (by RT).`,
    sol: `${rx.map(([, d]) => word(d)).join('; ')}.`,
    scheme: [['(a) Δn_g = 0, ΔH = ΔU', 1], ['(b) Δn_g = +3, ΔH > ΔU', 1], ['(c) Δn_g = −1, ΔH < ΔU', 1]],
    d: 3, c: 'application', t: [5],
  });
})(), () => true);
add('s3-derive', short({
  marks: 3,
  stem: 'Starting from H = U + pV, show that the heat absorbed by a system at constant pressure is equal to ΔH. Assume that only pressure–volume work is done.',
  model: 'At constant pressure, ΔH = ΔU + pΔV. By the first law ΔU = q + w, and for p–V work at constant pressure w = −pΔV, so ΔU = q_p − pΔV. Substituting, ΔH = (q_p − pΔV) + pΔV = q_p. The heat absorbed at constant pressure equals the enthalpy change.',
  sol: 'ΔH = ΔU + pΔV; ΔU = q_p − pΔV; so ΔH = q_p.',
  scheme: [['ΔH = ΔU + pΔV at constant p', 1], ['ΔU = q_p + w = q_p − pΔV', 1], ['Substitution gives ΔH = q_p', 1]],
  d: 3, c: 'understanding', t: [5],
}));
add('s3-heatcap', (() => {
  const m = 200;
  const c = 0.385;
  const M = 63.5;
  const q = 1540;
  const C = m * c;
  const dT = q / C;
  const Cm = c * M;
  return short({
    marks: 3,
    stem: `A copper block of mass ${m} g (specific heat ${c} J g⁻¹ K⁻¹; molar mass ${M} g mol⁻¹) absorbs ${f2(q / 1000)} kJ of heat. Calculate (a) the heat capacity of the block, (b) its rise in temperature, (c) the molar heat capacity of copper.`,
    model: `(a) C = m c = ${m} × ${c} = ${f1(C)} J K⁻¹. (b) ΔT = q/C = ${q}/${f1(C)} = ${f1(dT)} K. (c) C_m = c × M = ${c} × ${M} = ${f1(Cm)} J K⁻¹ mol⁻¹.`,
    sol: `C = ${f1(C)} J/K; ΔT = ${f1(dT)} K; C_m = ${f1(Cm)} J/K/mol.`,
    scheme: [[`(a) C = ${f1(C)} J K⁻¹`, 1], [`(b) ΔT = ${f1(dT)} K`, 1], [`(c) C_m = ${f1(Cm)} J K⁻¹ mol⁻¹`, 1]],
    d: 3, c: 'application', t: [5],
  });
})(), () => near(200 * 0.385, 77, 1e-9) && near(1540 / 77, 20, 1e-9) && near(0.385 * 63.5, 24.45, 0.001) || 's3-heatcap');
add('long-H', (() => {
  const dHkJ = -2600;
  const dn = 4 - 7;
  const T = 298;
  const dU = dUfromH(dHkJ, dn, T);
  const term = (dn * R * T) / 1000;
  return long({
    stem: String.raw`(a) Starting from $H = U + pV$, derive the relation $\Delta H = \Delta U + \Delta n_g RT$ for a reaction involving ideal gases at constant temperature and pressure. [3]

(b) For $\ce{2C2H2(g) + 5O2(g) -> 4CO2(g) + 2H2O(l)}$ at ${T} K, $\Delta H = ${dHkJ}$ kJ (rounded, given). Calculate $\Delta n_g$ and $\Delta U$. ($R = 8.314\ \text{J K}^{-1}\text{mol}^{-1}$) [2]`,
    model: String.raw`(a) At constant pressure $\Delta H = \Delta U + p\Delta V$. For gases treated as ideal, $pV = nRT$, so at constant $T$ and $p$, $p\Delta V = \Delta n_g RT$, where $\Delta n_g$ is the change in the number of moles of gas. Hence $\Delta H = \Delta U + \Delta n_g RT$. (Solids and liquids have negligible $p\Delta V$.)

(b) Gaseous products: 4 mol CO₂; gaseous reactants: $2 + 5 = 7$ mol, so $\Delta n_g = 4 - 7 = ${dn}$. $\Delta n_g RT = (${dn}) \times 8.314 \times 10^{-3} \times ${T} = ${f2(term)}$ kJ. $\Delta U = \Delta H - \Delta n_g RT = ${dHkJ} - (${f2(term)}) = ${f1(dU)}$ kJ.`,
    sol: `Δn_g = ${dn}; ΔU = ΔH − Δn_g RT = ${f1(dU)} kJ.`,
    scheme: [['(a) ΔH = ΔU + pΔV at constant p', 1], ['(a) pΔV = Δn_g RT from pV = nRT', 1], ['(a) Result ΔH = ΔU + Δn_g RT', 1], ['(b) Δn_g = −3', 1], [`(b) ΔU = ${f1(dU)} kJ`, 1]],
    d: 3, c: 'application', t: [5],
  });
})(), () => near(dUfromH(-2600, -3, 298), -2592.6, 0.0005) || 'long-H');
add('long-cv', (() => {
  const n = 2.0;
  const Cv = 21.0;
  const dT = 25;
  const Cp = CpFromCv(Cv);
  const dU = n * Cv * dT;
  const qp = n * Cp * dT;
  const w = dU - qp;
  return long({
    stem: `(a) Show that C_p − C_V = R for one mole of an ideal gas. [3]

(b) ${f1(n)} mol of an ideal gas with C_V = ${Cv} J K⁻¹ mol⁻¹ is heated by ${dT} K at constant pressure. Calculate the heat absorbed, the change in internal energy and the work done on the gas. (R = 8.314 J K⁻¹ mol⁻¹) [2]`,
    model: String.raw`(a) For one mole, $H = U + pV = U + RT$. Differentiating with respect to $T$: $\dfrac{dH}{dT} = \dfrac{dU}{dT} + R$. Since $C_p = dH/dT$ and $C_V = dU/dT$ (for an ideal gas $U$ depends only on $T$), $C_p - C_V = R$.

(b) $C_p = ${Cv} + 8.314 = ${f2(Cp)}$ J K⁻¹ mol⁻¹. $q_p = nC_p\Delta T = ${f1(n)} \times ${f2(Cp)} \times ${dT} = ${f0(qp)}$ J. $\Delta U = nC_V\Delta T = ${f1(n)} \times ${Cv} \times ${dT} = ${f0(dU)}$ J. $w = \Delta U - q_p = ${f0(dU)} - ${f0(qp)} = ${f0(w)}$ J (work done by the gas, $-nR\Delta T$).`,
    sol: `Cp − Cv = R; q_p = ${f0(qp)} J, ΔU = ${f0(dU)} J, w = ${f0(w)} J.`,
    scheme: [['(a) H = U + RT per mole', 1], ['(a) Differentiate: dH/dT = dU/dT + R', 1], ['(a) Cp − Cv = R', 1], [`(b) q_p = ${f0(qp)} J and ΔU = ${f0(dU)} J`, 1], [`(b) w = ${f0(w)} J`, 1]],
    d: 3, c: 'application', t: [5],
  });
})(), () => near(2 * 29.314 * 25, 1465.7, 0.001) && near(2 * 21 * 25, 1050, 1e-9) || 'long-cv');
