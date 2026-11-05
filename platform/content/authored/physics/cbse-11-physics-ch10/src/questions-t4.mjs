// ch10 question bank, part 3: t04 Newton's law of cooling.
import { mk, add, r, dec, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { C_METAL, root, coolExact, coolNumeric } from './phys.mjs';

const { mcq, ar, tf, fill, num, short } = mk;
const v3 = (x) => Number(dec(x, 3));
const v4 = (x) => Number(dec(x, 4));

add('curve-mcq', mcq({
  stem: 'A cup of tea left on a table cools in a room. Which description of its temperature–time graph agrees with Newton’s law of cooling?',
  right: 'A curve that falls steeply at first, then more and more gently, approaching the room temperature without crossing it',
  wrong: ['A straight line sloping down to the room temperature and carrying on below it', 'A curve that falls slowly at first and then faster', 'A horizontal line at the room temperature from the start'],
  sol: 'The rate of fall is proportional to the excess temperature, so it is greatest at the start and decreases as the tea approaches the room temperature: an exponential curve that never crosses it — option (@K).',
  d: 1, c: 'understanding', t: [4],
}));
const rt = { ex1: 60, rate1: 1.5, ex2: 30 };
rt.rate2 = (rt.rate1 * rt.ex2) / rt.ex1;
add('rate-mcq', mcq({
  stem: 'A hot steel plate whose temperature is 60 K above its surroundings is cooling at 1.5 K per minute. By Newton’s law of cooling, when its temperature is 30 K above its surroundings it will cool at about',
  right: `${rt.rate2} K per minute`,
  wrong: ['1.5 K per minute', '3.0 K per minute', '0.38 K per minute'],
  sol: r`The rate of cooling is proportional to the excess temperature: $\dfrac{(dT/dt)_2}{(dT/dt)_1} = \dfrac{30}{60}$, so the rate is $1.5 \times \dfrac{30}{60} = ${rt.rate2}$ K per minute — option (@K).`,
  d: 2, c: 'application', t: [4],
}), () => near(rt.rate2, 0.75, 1e-9) || 'rate');
add('halving-mcq', mcq({
  stem: 'The excess temperature of a cooling metal ball over its surroundings halves in every 6.0 minutes. After 18.0 minutes the excess will be',
  right: '1/8 of its original value',
  wrong: ['1/6 of its original value', '1/4 of its original value', '1/3 of its original value'],
  sol: r`The excess decays exponentially, so it halves in each equal interval: after $\dfrac{18}{6} = 3$ intervals it is $\left(\dfrac{1}{2}\right)^3 = \dfrac{1}{8}$ of the original — option (@K).`,
  d: 3, c: 'application', t: [4],
}), () => near(0.5 ** (18 / 6), 1 / 8, 1e-12) || 'halving');
add('lid-mcq', mcq({
  stem: 'A student wraps a hot steel mug in a thick woollen cloth and puts a lid on it. Compared with the bare mug in the same room, the cooling constant k of the wrapped mug',
  right: 'is smaller, because the mug now loses heat to the surroundings more slowly',
  wrong: ['is larger, because the cloth holds more heat', 'is unchanged, because k depends only on the temperature difference', 'is zero, because the mug is now insulated'],
  sol: 'k depends on the surface and the way heat leaves it. Wool and a lid reduce the loss, so for the same excess the mug cools more slowly: k decreases (it is not zero, since some heat still escapes) — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('newton-ar', ar({
  a: 'A cup of tea at 90 °C in a 25 °C room loses temperature faster in its first minute than in its tenth minute.',
  r: 'According to Newton’s law of cooling, the rate of fall of temperature is proportional to the excess of the body’s temperature over that of its surroundings.',
  key: 'a',
  sol: 'Both are true, and R explains A: the excess, and so the rate of cooling, is largest at the start and shrinks as the tea cools — option (a).',
  d: 2, c: 'understanding', t: [4],
}));
add('below-tf', tf({
  stem: 'According to Newton’s law of cooling, a cup of tea left in a 30 °C room will, if given long enough, cool to a temperature below 30 °C.',
  key: 'f',
  sol: 'False. As T approaches 30 °C the excess T − T₀ tends to zero, and so does the rate of cooling: the tea approaches 30 °C but never goes below it.',
  d: 2, c: 'understanding', t: [4],
}));
add('excess-fill', fill({
  stem: 'Newton’s law of cooling states that, for small differences, the rate of fall of temperature of a body is proportional to the ___ of its temperature over that of the surroundings.',
  acc: [['excess', 'difference']],
  sol: 'The **excess** (difference) of its temperature over the surroundings.',
  d: 1, c: 'recall', t: [4],
}));
const kf = { T1: 120, T2: 90, T0: 30, t: 5.0 };
kf.k = Math.log((kf.T1 - kf.T0) / (kf.T2 - kf.T0)) / kf.t;
add('kfind-num', num({
  stem: 'An iron plate cools from 120 °C to 90 °C in 5.0 minutes in a workshop at 30 °C. Assuming Newton’s law of cooling in its exponential form, find the cooling constant k, in min⁻¹.',
  value: v3(kf.k), tol: 0.0006, unit: 'min⁻¹',
  sol: r`$T - T_0 = (T_1 - T_0)e^{-kt}$ gives $${kf.T2 - kf.T0} = ${kf.T1 - kf.T0}\,e^{-5.0k}$, so $k = \dfrac{1}{5.0}\ln\dfrac{${kf.T1 - kf.T0}}{${kf.T2 - kf.T0}} = \dfrac{\ln ${dec((kf.T1 - kf.T0) / (kf.T2 - kf.T0), 3)}}{5.0} = ${dec(kf.k, 3)}$ min$^{-1}$.`,
  scheme: [['Excess falls by e^(−kt): 60 = 90 e^(−5.0k)', 1], [`k = ln(1.5)/5.0 = ${dec(kf.k, 3)} min⁻¹`, 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), (q) => near(coolNumeric(kf.T1, kf.T0, q.answer.value, kf.t), kf.T2, 2e-3) || 'kfind');
const ct = { T0: 25, T1: 85, k: 0.06, t: 10 };
ct.T = ct.T0 + (ct.T1 - ct.T0) * Math.exp(-ct.k * ct.t);
add('cooltemp-num', num({
  stem: 'Tea at 85 °C is left in a room at 25 °C and cools according to Newton’s law with a cooling constant k = 0.060 min⁻¹. Find its temperature after 10 minutes, in °C.',
  value: v3(ct.T), tol: 0.1, unit: '°C',
  sol: r`$T = T_0 + (T_1 - T_0)e^{-kt} = ${ct.T0} + ${ct.T1 - ct.T0}\,e^{-0.060 \times 10} = ${ct.T0} + ${ct.T1 - ct.T0} \times ${dec(Math.exp(-ct.k * ct.t), 4)} = ${dec(ct.T, 4)}$ °C.`,
  scheme: [['T = T₀ + (T₁ − T₀)e^(−kt)', 1], [`e^(−0.60) = ${dec(Math.exp(-0.6), 4)}; T = ${dec(ct.T, 4)} °C`, 1]],
  marks: 2, d: 2, c: 'application', t: [4],
}), (q) => near(coolNumeric(ct.T1, ct.T0, ct.k, ct.t), q.answer.value, 2e-3) || 'cooltemp');
const ml = { T0: 28, Ta: 76, Tb: 68, Tc: 60, t1: 4.0 };
ml.k = (ml.Ta - ml.Tb) / ml.t1 / ((ml.Ta + ml.Tb) / 2 - ml.T0);
ml.t2 = (ml.Tb - ml.Tc) / (ml.k * ((ml.Tb + ml.Tc) / 2 - ml.T0));
ml.exact = Math.log((ml.Tb - ml.T0) / (ml.Tc - ml.T0)) / (Math.log((ml.Ta - ml.T0) / (ml.Tb - ml.T0)) / ml.t1);
add('milk-num', num({
  stem: 'A glass of hot milk cools from 76 °C to 68 °C in 4.0 minutes in a room at 28 °C. Using the average-temperature form of Newton’s law of cooling, find the time, in minutes, it takes to cool from 68 °C to 60 °C.',
  value: v3(ml.t2), tol: 0.05, unit: 'min',
  sol: r`First fall: $\dfrac{76 - 68}{4.0} = k\left[\dfrac{76 + 68}{2} - 28\right] = k \times ${(ml.Ta + ml.Tb) / 2 - ml.T0}$, so $k = \dfrac{2.0}{${(ml.Ta + ml.Tb) / 2 - ml.T0}} = ${dec(ml.k, 3)}$ min$^{-1}$. Second fall: $\dfrac{68 - 60}{t} = k\left[\dfrac{68 + 60}{2} - 28\right] = ${dec(ml.k, 4)} \times ${(ml.Tb + ml.Tc) / 2 - ml.T0}$, so $t = \dfrac{${ml.Tb - ml.Tc}}{${dec(ml.k, 4)} \times ${(ml.Tb + ml.Tc) / 2 - ml.T0}} = ${dec(ml.t2, 3)}$ min.`,
  scheme: [[`k = 2.0/${(ml.Ta + ml.Tb) / 2 - ml.T0} = ${dec(ml.k, 3)} min⁻¹`, 1], [`8/t = k × ${(ml.Tb + ml.Tc) / 2 - ml.T0}`, 1], [`t = ${dec(ml.t2, 3)} min`, 1]],
  marks: 3, d: 3, c: 'application', t: [4],
}), (q) => near(ml.exact, q.answer.value, 6e-3) || 'milk');
const rw = { m: 0.5, c: C_METAL.aluminium, T: 70, T0: 30, k: 0.03 };
rw.C = rw.m * rw.c;
rw.dTdt = (rw.k * (rw.T - rw.T0)) / 60; // K s^-1
rw.P = rw.C * rw.dTdt;
add('lossrate-num', num({
  stem: 'A 0.50 kg aluminium pan (c = 900 J kg⁻¹ K⁻¹) at 70 °C sits in a kitchen at 30 °C, and its cooling constant is k = 0.030 min⁻¹. Find the rate at which it loses heat at this instant, in W.',
  value: v3(rw.P), tol: 0.05, unit: 'W',
  sol: r`Heat capacity $C = mc = ${rw.m} \times ${rw.c} = ${rw.C}$ J K$^{-1}$. Rate of fall of temperature $= k(T - T_0) = 0.030 \times ${rw.T - rw.T0} = ${dec(rw.k * (rw.T - rw.T0), 3)}$ K min$^{-1}$ $= ${dec(rw.dTdt, 3)}$ K s$^{-1}$. Rate of loss of heat $= C \times ${dec(rw.dTdt, 3)} = ${dec(rw.P, 3)}$ W.`,
  scheme: [[`C = mc = ${rw.C} J K⁻¹`, 1], [`Rate of loss = C k (T − T₀) = ${dec(rw.P, 3)} W`, 1]],
  marks: 2, d: 3, c: 'application', t: [2, 4],
}), (q) => near((rw.C * (coolExact(rw.T, rw.T0, rw.k, 1e-6) - rw.T)) / (-1e-6 * 60), q.answer.value, 1e-3) || 'lossrate');
const fr = { T1: 80, Ta: 70, Tb: 62, dt: 2.0 };
fr.T0 = root((x) => (fr.Ta - x) ** 2 - (fr.T1 - x) * (fr.Tb - x), 0, 60);
add('findroom-num', num({
  stem: 'A metal ball cools from 80 °C to 70 °C in the first 2.0 minutes and from 70 °C to 62 °C in the next 2.0 minutes, in a room at an unknown steady temperature. Using the exponential form of Newton’s law of cooling, find the room temperature, in °C.',
  value: v3(fr.T0), tol: 0.2, unit: '°C',
  sol: r`In equal times the excess is multiplied by the same factor $e^{-kt}$: $\dfrac{70 - T_0}{80 - T_0} = \dfrac{62 - T_0}{70 - T_0}$. So $(70 - T_0)^2 = (80 - T_0)(62 - T_0)$: $4900 - 140\,T_0 = 4960 - 142\,T_0$, which gives $2\,T_0 = 60$ and $T_0 = ${dec(fr.T0, 3)}$ °C.`,
  scheme: [['Equal factor in equal times: (70 − T₀)/(80 − T₀) = (62 − T₀)/(70 − T₀)', 1], ['(70 − T₀)² = (80 − T₀)(62 − T₀)', 1], [`T₀ = ${dec(fr.T0, 3)} °C`, 1]],
  marks: 3, d: 4, c: 'analysis', t: [4],
}), (q) => {
  const T0 = q.answer.value;
  const f1 = (fr.Ta - T0) / (fr.T1 - T0);
  const f2 = (fr.Tb - T0) / (fr.Ta - T0);
  return near(f1, f2, 1e-3) || 'findroom';
});
add('nl-short2', short({
  marks: 2,
  stem: 'State Newton’s law of cooling and write it as an equation, defining each symbol. Mention the condition for it to hold.',
  model: 'The rate of fall of temperature of a body is proportional to the excess of its temperature over that of the surroundings: dT/dt = −k(T − T₀), where T is the body’s temperature, T₀ that of the surroundings and k a positive constant. It holds when the excess of temperature is small.',
  sol: 'dT/dt = −k(T − T₀); small excess.',
  scheme: [['Statement: rate of cooling ∝ excess temperature; dT/dt = −k(T − T₀)', 1], ['Symbols and the small-excess condition', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('fastfirst-short2', short({
  marks: 2,
  stem: 'A cup of tea in a stall cools quickly when first poured but takes a long time to go from lukewarm to room temperature. Explain with Newton’s law of cooling.',
  model: 'By Newton’s law the rate of cooling is proportional to the excess temperature T − T₀. Just after pouring the excess is large, so the tea cools fast. As the tea cools the excess becomes smaller, so the rate becomes smaller and the temperature approaches the room temperature ever more slowly.',
  sol: 'Rate ∝ excess; excess shrinks.',
  scheme: [['Rate of cooling is proportional to T − T₀', 1], ['Large excess early: fast; small excess later: slow', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('derive-short3', short({
  marks: 3,
  stem: 'Starting from dT/dt = −k(T − T₀), derive the expression for the temperature T of a cooling body at time t, if its temperature at t = 0 is T₁.',
  model: 'Separate the variables: dT/(T − T₀) = −k dt. Integrating from T₁ to T and from 0 to t gives ln[(T − T₀)/(T₁ − T₀)] = −kt. Taking the exponential, T − T₀ = (T₁ − T₀)e^(−kt), so T = T₀ + (T₁ − T₀)e^(−kt).',
  sol: 'Integrate dT/(T − T₀) = −k dt.',
  scheme: [['Separate variables: dT/(T − T₀) = −k dt', 1], ['Integrate: ln[(T − T₀)/(T₁ − T₀)] = −kt', 1], ['T = T₀ + (T₁ − T₀)e^(−kt)', 1]],
  d: 3, c: 'understanding', t: [4],
}), () => {
  const T = coolNumeric(95, 25, 0.04, 17);
  return near(T, coolExact(95, 25, 0.04, 17), 1e-6) || 'derive';
});
add('kfactors-short3', short({
  marks: 3,
  stem: 'On what factors does the cooling constant k of a body depend? Give two practical ways of making a flask of hot soup cool more slowly.',
  model: 'k depends on the exposed surface area of the body, on the nature of its surface (dull surfaces lose heat faster than shiny ones), and on the surroundings, for example whether air is moving past it. To cool more slowly one can wrap the flask in a poor conductor such as wool, or cover it with a lid, which reduce k.',
  sol: 'Area, surface, surroundings; lagging, lid.',
  scheme: [['Depends on exposed area, nature of surface and surroundings', 1], ['Wrapping in a poor conductor', 1], ['Covering with a lid / shiny surface', 1]],
  d: 2, c: 'understanding', t: [4],
}));
void v4;
