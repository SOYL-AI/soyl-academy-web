// ch07 Gravitation — question bank, part 2: t03 gravitational potential energy and gravitational potential.
import { mk, add, r, dec, sci, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { G, GM, RE, g, pull, integ, infallSpeed } from './phys.mjs';

const { mcq, ar, tf, num, short } = mk;
const v3 = (x) => Number(dec(x, 3));
const X = (x, n = 3) => sci(x, n);
const mn = (x) => String(x).replace('-', '−');

add('pe-mcq', mcq({
  stem: 'A satellite of mass m circles the Earth in an orbit of radius 2R, where R is the Earth’s radius and g is the surface value. With the zero of potential energy at infinite separation, its gravitational potential energy is',
  right: '−mgR/2',
  wrong: ['+mgR/2', '−mgR', '−2mgR'],
  sol: 'U = −GMm/r with r = 2R and GM = gR²: U = −m g R²/(2R) = −mgR/2 — option (@K).',
  d: 2, c: 'application', t: [3],
}));
add('pe-increase-mcq', mcq({
  stem: 'A space probe is carried radially outwards from a planet, from distance r to a larger distance r′. Taking the potential energy as zero at infinity, the gravitational potential energy of the probe–planet system',
  right: 'increases, becoming less negative, because work must be done against the pull',
  wrong: ['decreases, because the pull on the probe weakens', 'stays the same, because the masses are unchanged', 'becomes positive as soon as the probe leaves the surface'],
  sol: 'U = −GMm/r rises towards zero as r grows; an outside agent has to supply the work — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('mgh-mcq', mcq({
  stem: 'A student uses mgh for the work done in lifting a satellite from the ground to a height h. This is accurate only when',
  right: 'h is much smaller than the radius of the Earth, so that g stays nearly constant',
  wrong: ['the mass of the satellite is much smaller than the mass of the Earth', 'h is measured from the centre of the Earth', 'the satellite is lifted at constant velocity'],
  sol: 'The exact change is mgRh/(R + h), which reduces to mgh when R + h ≈ R, that is h ≪ R — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
const us = { m: 2.0 };
us.U = (-GM * us.m) / RE;
add('Usurf-num', num({
  stem: 'Taking the potential energy to be zero at infinity, find the gravitational potential energy of a 2.0 kg object on the surface of the Earth, in units of 10⁸ J. Use G = 6.67 × 10⁻¹¹ N m² kg⁻², M = 6.0 × 10²⁴ kg and R = 6.4 × 10⁶ m. Give the sign.',
  value: v3(us.U / 1e8), tol: 0.01, unit: '10⁸ J',
  sol: r`$U = -\dfrac{G M m}{R} = -\dfrac{6.67 \times 10^{-11} \times 6.0 \times 10^{24} \times 2.0}{6.4 \times 10^6} = ${X(us.U)}$ J. In units of $10^8$ J: $U = ${v3(us.U / 1e8)}$.`,
  scheme: [['U = −GMm/R with the given values', 1], [`U = ${mn(v3(us.U / 1e8))} × 10⁸ J (negative)`, 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => {
  const w = integ((x) => (G * 6.0e24 * us.m) / (x * x), RE, 1e4 * RE, 200000) + (G * 6.0e24 * us.m) / (1e4 * RE);
  return near(-w / 1e8, q.answer.value, 0.005) || 'us';
});
const wk = { m: 1500, h: 1.6e6 };
wk.W = (wk.m * g * RE * wk.h) / (RE + wk.h);
add('work-num', num({
  stem: 'An agency lifts a 1500 kg satellite from the Earth’s surface to a height of 1600 km, where it is released. Take g = 9.8 m/s² and R = 6.4 × 10⁶ m. Find the minimum work done against gravity, in GJ (1 GJ = 10⁹ J).',
  value: v3(wk.W / 1e9), tol: 0.05, unit: 'GJ',
  sol: r`$W = \Delta U = \dfrac{m g R h}{R + h} = \dfrac{1500 \times 9.8 \times 6.4 \times 10^6 \times 1.6 \times 10^6}{8.0 \times 10^6} = ${X(wk.W)}$ J $= ${v3(wk.W / 1e9)}$ GJ. (The simple $mgh$ would give ${dec((wk.m * g * wk.h) / 1e9, 3)} GJ, which is too large because $g$ decreases with height.)`,
  scheme: [['ΔU = mgRh/(R + h) (exact, since h is not ≪ R)', 1], [`W = ${v3(wk.W / 1e9)} GJ`, 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => {
  const gm = g * RE * RE;
  const w = integ((x) => (gm * wk.m) / (x * x), RE, RE + wk.h, 20000);
  return near(w / 1e9, q.answer.value, 0.003) || 'wk';
});
const pm = { m: 4.0, d: 1.0 };
pm.V = -2 * G * pm.m / (pm.d / 2);
add('potmid-num', num({
  stem: 'Two identical spheres of mass 4.0 kg have their centres 1.0 m apart in free space. Find the gravitational potential at the midpoint of the line joining them, in units of 10⁻⁹ J/kg (G = 6.67 × 10⁻¹¹ N m² kg⁻²). Give the sign.',
  value: v3(pm.V / 1e-9), tol: 0.01, unit: '10⁻⁹ J/kg',
  sol: r`Each sphere is 0.50 m from the midpoint, and potentials add as scalars: $V = -2\,\dfrac{G m}{0.50} = -2 \times \dfrac{6.67 \times 10^{-11} \times 4.0}{0.50} = ${X(pm.V)}$ J/kg. In units of $10^{-9}$ J/kg: $V = ${v3(pm.V / 1e-9)}$. (The gravitational field there is zero, but the potential is not.)`,
  scheme: [['V = −Gm/0.50 for each sphere, added as scalars', 1], [`V = ${mn(v3(pm.V / 1e-9))} × 10⁻⁹ J/kg`, 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near((-G * 4 / 0.5) * 2 / 1e-9, q.answer.value, 0.003) || 'pm');
const sp = { m: 10, a: 0.5 };
sp.U = (-3 * G * sp.m * sp.m) / sp.a;
add('sysPE-num', num({
  stem: 'Three identical 10 kg spheres are placed at the corners of an equilateral triangle of side 0.50 m. With the potential energy zero when they are infinitely far apart, find the gravitational potential energy of the system, in units of 10⁻⁸ J (G = 6.67 × 10⁻¹¹ N m² kg⁻²).',
  value: v3(sp.U / 1e-8), tol: 0.02, unit: '10⁻⁸ J',
  sol: r`There are three pairs, each at 0.50 m: $U = -3\,\dfrac{G m^2}{a} = -3 \times \dfrac{6.67 \times 10^{-11} \times 100}{0.50} = ${X(sp.U)}$ J. In units of $10^{-8}$ J: $U = ${dec(sp.U / 1e-8, 3)}$.`,
  scheme: [['Three pairs, each −Gm²/a', 1], [`U = ${dec(sp.U / 1e-8, 3)} × 10⁻⁸ J`, 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => {
  const pairs = [[0, 1], [0, 2], [1, 2]];
  const u = pairs.reduce((s) => s - (G * sp.m * sp.m) / sp.a, 0);
  return near(u / 1e-8, q.answer.value, 0.003) || 'sp';
});
const fl = { R: RE };
fl.v = Math.sqrt(g * fl.R);
add('infall-num', num({
  stem: 'A meteoroid, at rest relative to the Earth at a height equal to the Earth’s radius above the surface, falls straight down. Neglecting air drag and the Earth’s rotation, with g = 9.8 m/s² and R = 6.4 × 10⁶ m, find its speed on reaching the surface, in km/s.',
  value: v3(fl.v / 1e3), tol: 0.02, unit: 'km/s',
  sol: r`Energy conservation between $r = 2R$ and $r = R$: $\tfrac{1}{2}v^2 = GM\left(\dfrac{1}{R} - \dfrac{1}{2R}\right) = \dfrac{GM}{2R} = \dfrac{gR}{2}$, so $v = \sqrt{gR} = \sqrt{9.8 \times 6.4 \times 10^6} = ${dec(fl.v, 4)}$ m/s $= ${v3(fl.v / 1e3)}$ km/s.`,
  scheme: [['½v² = GM(1/R − 1/2R) = gR/2', 1], [`v = √(gR) = ${v3(fl.v / 1e3)} km/s`, 1]],
  marks: 2, d: 4, c: 'analysis', t: [3],
}), (q) => near(infallSpeed(g * RE * RE, 2 * RE, RE) / 1e3, q.answer.value, 0.003) || 'fl');
const mp = { h: 1.28e6 };
mp.pct = (1 - RE / (RE + mp.h)) * 100;
add('mghpct-num', num({
  stem: 'A probe is raised from the Earth’s surface to a height of 1280 km. By what percentage is the exact increase in its gravitational potential energy smaller than the value mgh? Take R = 6.4 × 10⁶ m, and give the percentage of mgh.',
  value: v3(mp.pct), tol: 0.1, unit: '%',
  sol: r`Exact $\Delta U = \dfrac{m g R h}{R + h}$, so $\dfrac{\Delta U}{mgh} = \dfrac{R}{R + h} = \dfrac{6.4 \times 10^6}{7.68 \times 10^6} = ${dec(RE / (RE + mp.h), 4)}$. The exact value is smaller than $mgh$ by the fraction $1 - ${dec(RE / (RE + mp.h), 4)} = ${dec(mp.pct / 100, 4)}$ of $mgh$, so in per cent of $mgh$: $\left(1 - ${dec(RE / (RE + mp.h), 4)}\right) \times 100 = ${v3(mp.pct)}$.`,
  scheme: [['ΔU/mgh = R/(R + h)', 1], [`Smaller by ${v3(mp.pct)} % of mgh`, 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near((100 * mp.h) / (RE + mp.h), q.answer.value, 0.005) || 'mp');
add('pe-neg-ar', ar({
  a: 'The gravitational potential energy of the Earth and a satellite orbiting it is negative.',
  r: 'The zero of potential energy is taken at infinite separation, and gravity does positive work as the satellite comes in from infinity.',
  key: 'a',
  sol: 'Both statements are true, and R explains A: U(∞) = 0 and U falls as the satellite is brought in — option (a).',
  d: 2, c: 'understanding', t: [3],
}));
add('pe-pos-tf', tf({
  stem: 'With the zero of potential energy at infinite separation, two masses at a finite separation have positive gravitational potential energy, because the force between them is attractive.',
  key: 'f',
  sol: 'False. Attraction means gravity does positive work as the masses come together from infinity, so U is **negative**: U = −Gm₁m₂/r.',
  d: 2, c: 'understanding', t: [3],
}));
add('potential-short', short({
  marks: 2,
  stem: 'Define the gravitational potential at a point and give its SI unit. How does it differ from the gravitational potential energy of a body placed at that point?',
  model: r`Gravitational potential is the potential energy per unit mass at the point (equal to $-GM/r$, with zero at infinity); its unit is J kg$^{-1}$. Potential energy $U = mV$ belongs to a particular body of mass $m$ there, while potential describes the point and is independent of the mass placed there.`,
  sol: 'V = U/m = −GM/r; unit J/kg.',
  scheme: [['V = U/m; unit J kg⁻¹', 1], ['U = mV depends on the body; V depends only on the point', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('conserv-short', short({
  marks: 2,
  stem: 'A satellite is lifted from the ground to a high orbit along two different routes. Explain why the work done against gravity is the same for both routes.',
  model: r`Gravity is a conservative force: the work it does depends only on the initial and final positions, not on the path, and over a closed path it is zero. The work done against gravity equals the gain in potential energy $U_f - U_i$, fixed by the end points alone.`,
  sol: 'Conservative force: work depends only on end points.',
  scheme: [['Gravity is conservative: path-independent work', 1], ['Work = U_f − U_i, fixed by the end points', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('U-derive-short3', short({
  marks: 3,
  stem: 'Derive the expression for the gravitational potential energy of a mass m at a distance r from the centre of the Earth (mass M), taking the potential energy to be zero at infinity.',
  model: r`An external agent moves $m$ in from infinity to $r$ at constant speed, applying a force equal and opposite to gravity, of magnitude $GMm/x^2$ directed away from $M$. The work done is $W = \int_{\infty}^{r} \dfrac{GMm}{x^2}\,dx = GMm\left[-\dfrac{1}{x}\right]_{\infty}^{r} = -\dfrac{GMm}{r}$. Since $U(\infty) = 0$, and gravity is conservative so that only the end points matter, this work is the potential energy: $U(r) = -\dfrac{GMm}{r}$.`,
  sol: 'Integrate the force from infinity: U = −GMm/r.',
  scheme: [['Force on m at x is GMm/x² towards M', 1], ['Work from ∞ to r by the external agent: integral of the force', 1], ['U(r) = −GMm/r', 1]],
  d: 3, c: 'understanding', t: [3],
}));
void pull; void mcq; void GM;
