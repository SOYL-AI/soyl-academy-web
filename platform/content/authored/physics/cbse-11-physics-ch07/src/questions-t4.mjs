// ch07 Gravitation — question bank, part 3: t04 escape speed, orbital speed and energy of satellites.
import { mk, add, r, dec, sci, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { G, GM, RE, g, MOON, orbit2d, periodNumeric, reaches } from './phys.mjs';

const { mcq, ar, tf, fill, num, short } = mk;
const v3 = (x) => Number(dec(x, 3));
const X = (x, n = 3) => sci(x, n);
const mn = (x) => String(x).replace('-', '−');

const mv = { M: MOON.M, R: MOON.R };
mv.ve = Math.sqrt((2 * G * mv.M) / mv.R);
add('moon-ve-num', num({
  stem: 'The Moon has mass 7.35 × 10²² kg and radius 1.74 × 10⁶ m. Taking G = 6.67 × 10⁻¹¹ N m² kg⁻², find the speed needed to escape from the Moon’s surface, in km/s (ignore the Earth’s pull).',
  value: v3(mv.ve / 1e3), tol: 0.01, unit: 'km/s',
  sol: r`$v_e = \sqrt{\dfrac{2GM}{R}} = \sqrt{\dfrac{2 \times 6.67 \times 10^{-11} \times 7.35 \times 10^{22}}{1.74 \times 10^6}} = \sqrt{${X(mv.ve ** 2)}} = ${dec(mv.ve, 4)}$ m/s $= ${v3(mv.ve / 1e3)}$ km/s.`,
  scheme: [['v_e = √(2GM/R)', 1], [`v_e = ${v3(mv.ve / 1e3)} km/s`, 1]],
  marks: 2, d: 2, c: 'application', t: [4],
}), (q) => {
  const gm = G * mv.M;
  const v = q.answer.value * 1e3;
  return (!reaches(gm, mv.R, v * 0.99, 1000 * mv.R) && reaches(gm, mv.R, v * 1.01, 1000 * mv.R)) || 'mv';
});
const vo = { v: Math.sqrt(g * RE) };
add('vo-num', num({
  stem: 'A satellite skims just above the surface of the Earth, so that its orbit radius is R = 6.4 × 10⁶ m. With g = 9.8 m/s², find its orbital speed, in km/s.',
  value: v3(vo.v / 1e3), tol: 0.01, unit: 'km/s',
  sol: r`Gravity supplies the centripetal force: $m g = \dfrac{m v^2}{R}$, so $v = \sqrt{gR} = \sqrt{9.8 \times 6.4 \times 10^6} = ${dec(vo.v, 4)}$ m/s $= ${v3(vo.v / 1e3)}$ km/s.`,
  scheme: [['mg = mv²/R', 1]],
  d: 2, c: 'application', t: [4],
}), (q) => {
  const gm = g * RE * RE;
  const tr = orbit2d({ gm, x: RE, y: 0, vx: 0, vy: q.answer.value * 1e3 }, 6000, 0.5, { every: 100 });
  return Math.max(...tr.map((p) => Math.abs(Math.hypot(p.x, p.y) - RE))) < 2e-3 * RE || 'vo';
});
const ts = { T: (2 * Math.PI * Math.sqrt(RE / g)) / 60 };
add('Tsurf-num', num({
  stem: 'A satellite skims just above the Earth’s surface (R = 6.4 × 10⁶ m, g = 9.8 m/s²). Find the time it takes to complete one revolution, in minutes.',
  value: v3(ts.T), tol: 0.1, unit: 'min',
  sol: r`$T = 2\pi\sqrt{\dfrac{R}{g}} = 2\pi\sqrt{\dfrac{6.4 \times 10^6}{9.8}} = 2\pi \times ${dec(Math.sqrt(RE / g), 4)} = ${dec(ts.T * 60, 4)}$ s $= ${v3(ts.T)}$ min.`,
  scheme: [['T = 2π√(R/g)', 1], [`T = ${v3(ts.T)} min`, 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), (q) => near(periodNumeric(g * RE * RE, RE) / 60, q.answer.value, 0.002) || 'ts');
const s6 = { h: 6.0e5 };
s6.r = RE + s6.h;
s6.v = Math.sqrt(GM / s6.r);
s6.T = (2 * Math.PI * s6.r) / s6.v;
add('v600-num', num({
  stem: 'An Earth-observation satellite is in a circular orbit 600 km above the Earth’s surface. Take G = 6.67 × 10⁻¹¹ N m² kg⁻², M = 6.0 × 10²⁴ kg and R = 6.4 × 10⁶ m. Find its orbital speed, in km/s.',
  value: v3(s6.v / 1e3), tol: 0.01, unit: 'km/s',
  sol: r`The orbit radius is $r = R + h = 6.4 \times 10^6 + 6.0 \times 10^5 = ${X(s6.r)}$ m. Then $v = \sqrt{\dfrac{GM}{r}} = \sqrt{\dfrac{6.67 \times 10^{-11} \times 6.0 \times 10^{24}}{7.0 \times 10^6}} = ${dec(s6.v, 4)}$ m/s $= ${v3(s6.v / 1e3)}$ km/s.`,
  scheme: [['r = R + h = 7.0 × 10⁶ m', 1], [`v = √(GM/r) = ${v3(s6.v / 1e3)} km/s`, 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), (q) => {
  const tr = orbit2d({ gm: GM, x: s6.r, y: 0, vx: 0, vy: q.answer.value * 1e3 }, 6000, 0.5, { every: 100 });
  return Math.max(...tr.map((p) => Math.abs(Math.hypot(p.x, p.y) - s6.r))) < 3e-3 * s6.r || 'v600';
});
add('T600-num', num({
  stem: 'A remote-sensing satellite moves in a circular orbit of radius 7.0 × 10⁶ m about the Earth (G = 6.67 × 10⁻¹¹ N m² kg⁻², M = 6.0 × 10²⁴ kg). Find the time for one revolution, in minutes.',
  value: v3(s6.T / 60), tol: 0.2, unit: 'min',
  sol: r`$T = 2\pi\sqrt{\dfrac{r^3}{GM}} = 2\pi\sqrt{\dfrac{(7.0 \times 10^6)^3}{6.67 \times 10^{-11} \times 6.0 \times 10^{24}}} = ${dec(s6.T, 4)}$ s $= ${v3(s6.T / 60)}$ min.`,
  scheme: [['T = 2π√(r³/GM)', 1], [`T = ${v3(s6.T / 60)} min`, 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), (q) => near(periodNumeric(GM, s6.r) / 60, q.answer.value, 0.003) || 'T600');
const et = { m: 500 };
et.E = (-GM * et.m) / (2 * s6.r);
add('Etot-num', num({
  stem: 'A 500 kg satellite is in a circular orbit of radius 7.0 × 10⁶ m about the Earth. With the potential energy zero at infinity, find its total mechanical energy, in GJ. Use G = 6.67 × 10⁻¹¹ N m² kg⁻² and M = 6.0 × 10²⁴ kg. Give the sign.',
  value: v3(et.E / 1e9), tol: 0.05, unit: 'GJ',
  sol: r`$E = -\dfrac{GMm}{2r} = -\dfrac{6.67 \times 10^{-11} \times 6.0 \times 10^{24} \times 500}{2 \times 7.0 \times 10^6} = ${X(et.E)}$ J. In GJ: $E = ${v3(et.E / 1e9)}$. (The sign is negative: the satellite is bound.)`,
  scheme: [['E = −GMm/2r', 1], [`E = ${mn(v3(et.E / 1e9))} GJ`, 1]],
  marks: 2, d: 3, c: 'application', t: [4],
}), (q) => {
  const K = 0.5 * et.m * s6.v ** 2;
  const U = (-GM * et.m) / s6.r;
  return near((K + U) / 1e9, q.answer.value, 0.003) || 'et';
});
const er = { m: 500, r1: 7.0e6, r2: 1.0e7 };
er.dE = ((GM * er.m) / 2) * (1 / er.r1 - 1 / er.r2);
add('Eraise-num', num({
  stem: 'A 500 kg satellite is moved from a circular orbit of radius 7.0 × 10⁶ m to a circular orbit of radius 1.0 × 10⁷ m about the Earth. Find the extra energy that must be supplied, in GJ (G = 6.67 × 10⁻¹¹ N m² kg⁻², M = 6.0 × 10²⁴ kg).',
  value: v3(er.dE / 1e9), tol: 0.02, unit: 'GJ',
  sol: r`$E = -\dfrac{GMm}{2r}$ in each orbit, so $\Delta E = \dfrac{GMm}{2}\left(\dfrac{1}{r_1} - \dfrac{1}{r_2}\right) = \dfrac{6.67 \times 10^{-11} \times 6.0 \times 10^{24} \times 500}{2} \times \left(\dfrac{1}{7.0 \times 10^6} - \dfrac{1}{1.0 \times 10^7}\right) = ${X(er.dE)}$ J $= ${v3(er.dE / 1e9)}$ GJ.`,
  scheme: [['E = −GMm/2r in both orbits', 1], [`ΔE = E₂ − E₁ = ${v3(er.dE / 1e9)} GJ`, 1]],
  marks: 2, d: 4, c: 'analysis', t: [4],
}), (q) => {
  const e = (rr) => 0.5 * er.m * (GM / rr) - (GM * er.m) / rr;
  return near((e(er.r2) - e(er.r1)) / 1e9, q.answer.value, 0.003) || 'er';
});
add('escheight-mcq', mcq({
  stem: 'The escape speed from the surface of the Earth is 11.2 km/s. The escape speed of a body at a height equal to the Earth’s radius above the surface, measured from that point, is about',
  right: '7.9 km/s',
  wrong: ['11.2 km/s', '5.6 km/s', '15.8 km/s'],
  sol: 'v_e = √(2GM/r) with r = 2R is 1/√2 of the surface value: 11.2/1.414 = 7.9 km/s — option (@K).',
  d: 3, c: 'application', t: [4],
}), () => near(11.2 / Math.SQRT2, 7.92, 0.001) || 'esc');
add('vratio-mcq', mcq({
  stem: 'For a satellite orbiting very close to a planet’s surface, the ratio of the planet’s escape speed to the satellite’s orbital speed is',
  right: '√2',
  wrong: ['1/√2', '2', '1'],
  sol: 'v_e = √(2GM/R) and v_o = √(GM/R), so v_e/v_o = √2 — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('massindep-mcq', mcq({
  stem: 'Two satellites of masses 100 kg and 400 kg circle the Earth in orbits of the same radius. The ratio of their orbital speeds and the ratio of their kinetic energies (lighter : heavier) are',
  right: 'speeds 1 : 1 and kinetic energies 1 : 4',
  wrong: ['speeds 2 : 1 and kinetic energies 1 : 4', 'speeds 1 : 2 and kinetic energies 1 : 2', 'speeds 1 : 1 and kinetic energies 1 : 1'],
  sol: 'v = √(GM/r) does not depend on the satellite’s mass, so the speeds are equal; K = ½mv² is proportional to m, so 100 : 400 = 1 : 4 — option (@K).',
  d: 2, c: 'application', t: [4],
}));
add('drag-mcq', mcq({
  stem: 'Thin air removes energy from a satellite in a low circular orbit very slowly. The satellite then',
  right: 'moves in a slightly smaller orbit with a slightly larger speed',
  wrong: ['moves in a slightly smaller orbit with a slightly smaller speed', 'moves in a slightly larger orbit with a slightly smaller speed', 'stays in the same orbit because GM does not change'],
  sol: 'E = −GMm/2r becomes more negative, so r decreases; v = √(GM/r) then increases (kinetic energy rises while the potential energy falls twice as much) — option (@K).',
  d: 3, c: 'analysis', t: [4],
}));
add('satratio-mcq', mcq({
  stem: 'Two satellites circle the Earth at distances 2R and 8R from its centre. The ratio of the orbital speed of the nearer to that of the farther is',
  right: '2 : 1',
  wrong: ['4 : 1', '1 : 2', '16 : 1'],
  sol: 'v ∝ 1/√r, so v₁/v₂ = √(8R/2R) = √4 = 2 — option (@K).',
  d: 3, c: 'application', t: [4],
}), () => near(Math.sqrt(8 / 2), 2, 1e-12) || 'sat');
add('planetve-mcq', mcq({
  stem: 'A planet has the same mean density as the Earth but twice its radius. Given that the Earth’s escape speed is 11.2 km/s, the escape speed of this planet is',
  right: '22.4 km/s',
  wrong: ['11.2 km/s', '15.8 km/s', '44.8 km/s'],
  sol: 'M ∝ R³ at equal density, so v_e = √(2GM/R) ∝ √(R²) = R. Doubling R doubles v_e: 22.4 km/s — option (@K).',
  d: 3, c: 'application', t: [4],
}));
add('moonatm-ar', ar({
  a: 'The speed needed to escape from the Moon’s surface is much smaller than from the Earth’s surface.',
  r: 'The Moon has almost no atmosphere.',
  key: 'b',
  sol: 'A is true (the Moon’s v_e is about 2.4 km/s because of its small mass and radius) and R is true, but the lack of atmosphere is not why v_e is small: option (b).',
  d: 2, c: 'understanding', t: [4],
}));
add('orbit-ar', ar({
  a: 'A satellite in a lower circular orbit moves faster than one in a higher circular orbit.',
  r: 'The orbital speed of a satellite increases as its orbit radius increases.',
  key: 'c',
  sol: 'A is true, since v = √(GM/r) falls as r grows. R says the opposite, so it is false — option (c).',
  d: 2, c: 'understanding', t: [4],
}));
add('ve-fill', fill({
  stem: 'For a probe leaving an Indian launch site for deep space, the least speed at which it must be launched to reach infinity with no speed left over (air drag ignored) is called the ___ speed of the Earth.',
  acc: [['escape']],
  sol: 'It is the **escape** speed, √(2GM/R) ≈ 11.2 km/s.',
  d: 1, c: 'recall', t: [4],
}));
add('energy-fill', fill({
  stem: 'For a satellite in a circular orbit, the total energy is ___ (positive or negative) and equal in magnitude to its kinetic energy.',
  acc: [['negative', 'minus']],
  sol: 'E = K + U = −GMm/2r = −K, so the total energy is **negative**: the satellite is bound.',
  d: 2, c: 'understanding', t: [4],
}));
add('satmass-tf', tf({
  stem: 'At a fixed orbit radius, a satellite of larger mass must move at a higher speed in order to stay in a circular orbit.',
  key: 'f',
  sol: 'False. From mv²/r = GMm/r², the mass cancels: v = √(GM/r) is the same for every satellite at that radius.',
  d: 2, c: 'understanding', t: [4],
}));
add('veindep-short', short({
  marks: 2,
  stem: 'State, with reasons, whether the escape speed from a planet’s surface depends on (i) the mass of the projectile and (ii) the direction in which it is launched (ignoring air drag and obstacles).',
  model: r`Neither. (i) The condition is $\tfrac{1}{2}mv^2 - GMm/R = 0$: $m$ cancels, so $v_e = \sqrt{2GM/R}$. (ii) Energy is a scalar and the potential energy depends only on distance, so the direction of launch does not matter.`,
  sol: 'm cancels; energy is scalar.',
  scheme: [['(i) m cancels from ½mv² = GMm/R', 1], ['(ii) Energy is a scalar; direction is irrelevant', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('drag-short', short({
  marks: 2,
  stem: 'Air drag does negative work on a satellite in a low orbit, yet its speed increases as it sinks. Explain this apparent paradox.',
  model: r`The total energy $E = -GMm/2r$ decreases, so the orbit radius shrinks. Kinetic energy is $K = GMm/2r$, which grows as $r$ falls. The fall in potential energy is twice the fall in $E$, so gravity’s positive work exceeds the work lost to drag and the speed rises.`,
  sol: 'E decreases, r decreases, K = −E increases.',
  scheme: [['E = −GMm/2r decreases so r decreases', 1], ['K = −E = GMm/2r increases: potential-energy loss exceeds drag loss', 1]],
  d: 3, c: 'analysis', t: [4],
}));
add('negE-short', short({
  marks: 2,
  stem: 'What does the negative sign of the total energy of an orbiting satellite tell us, and what is meant by its binding energy?',
  model: r`Negative total energy means the satellite is **bound**: it has less energy than a body at rest at infinity and cannot leave unaided. Its binding energy is the extra energy $|E| = GMm/2r$ that must be supplied to take it to infinity with zero speed.`,
  sol: 'Bound state; binding energy |E| = GMm/2r.',
  scheme: [['Negative E: bound to the planet', 1], ['Binding energy = |E| = GMm/2r', 1]],
  d: 2, c: 'understanding', t: [4],
}));
add('ve-derive-short3', short({
  marks: 3,
  stem: 'Derive an expression for the escape speed from the surface of a planet of mass M and radius R, and show that it equals √(2gR). Evaluate it for the Earth (g = 9.8 m/s², R = 6.4 × 10⁶ m).',
  model: r`To escape, the body must just reach infinity with zero kinetic energy, where the potential energy is also zero, so its total energy at launch must be zero: $\tfrac{1}{2}mv_e^2 - \dfrac{GMm}{R} = 0$. This gives $v_e = \sqrt{2GM/R}$ and, with $GM = gR^2$, $v_e = \sqrt{2gR}$. For the Earth this is $\sqrt{2 \times 9.8 \times 6.4 \times 10^6} = 11200$ m/s $= ${dec(Math.sqrt(2 * g * RE) / 1e3, 3)}$ km/s.`,
  sol: 'Total energy zero; GM = gR².',
  scheme: [['Energy at the surface and at infinity set equal', 1], ['v_e = √(2GM/R) = √(2gR) using GM = gR²', 1], [`${dec(Math.sqrt(2 * g * RE) / 1e3, 3)} km/s for the Earth`, 1]],
  d: 3, c: 'application', t: [4],
}), () => near(Math.sqrt(2 * g * RE), 11200, 1e-9) || 've');
add('vo-derive-short3', short({
  marks: 3,
  stem: 'A satellite circles the Earth at a height h above the surface. Derive expressions for its orbital speed and its period in terms of G, M, R and h.',
  model: r`The satellite’s orbit radius is $r = R + h$. Gravity alone supplies the centripetal force, so $\dfrac{GMm}{r^2} = \dfrac{mv^2}{r}$ and the mass of the satellite cancels. The orbital speed is therefore $v = \sqrt{\dfrac{GM}{R+h}}$. One revolution covers a distance $2\pi r$ at speed $v$, so $T = \dfrac{2\pi r}{v} = 2\pi\sqrt{\dfrac{(R+h)^3}{GM}}$, which does not depend on the satellite’s mass either.`,
  sol: 'Equate gravity and mv²/r.',
  scheme: [['r = R + h; GMm/r² = mv²/r', 1], ['v = √(GM/(R + h))', 1], ['T = 2πr/v = 2π√((R + h)³/GM)', 1]],
  d: 3, c: 'understanding', t: [4],
}));
