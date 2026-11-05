// ch07 Gravitation — question bank, part 4: long answers (5 marks) and case-based items (4 marks: 1 + 1 + 2 with an either/or part (c)).
import { mk, add, r, dec, sci, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { G, GM, RE, g, MOON, MARS, orbit2d, periodNumeric, reaches, xp } from './phys.mjs';

const { mcq, num, short, long, part } = mk;
const v3 = (x) => Number(dec(x, 3));
const X = (x, n = 3) => sci(x, n);
const mn = (x) => String(x).replace('-', '−');
void orbit2d;

// ================================================================ long answers
const ph = { r: 9.4e6, Th: 7.65 };
ph.T = ph.Th * 3600;
ph.M = (4 * Math.PI ** 2 * ph.r ** 3) / (G * ph.T ** 2);
add('phobos-long', long({
  stem: '(a) State Kepler’s law of orbits and law of periods. (b) A moon of mass m moves in a circular orbit of radius r about a planet of mass M. Derive the relation between its period T and r. (c) Phobos circles Mars in a nearly circular orbit of radius 9.4 × 10⁶ m with a period of 7.65 hours. Use G = 6.67 × 10⁻¹¹ N m² kg⁻² to find the mass of Mars, in units of 10²³ kg.',
  model: r`(a) **Orbits:** each planet moves in an ellipse with the Sun at one focus. **Periods:** the square of the period is proportional to the cube of the semi-major axis.

(b) Gravity supplies the centripetal force: $\dfrac{GMm}{r^2} = m\omega^2 r$ with $\omega = 2\pi/T$, giving $T^2 = \dfrac{4\pi^2}{GM}\,r^3$.

(c) $T = 7.65 \times 3600 = ${ph.T}$ s. Then $M = \dfrac{4\pi^2 r^3}{G T^2} = \dfrac{4\pi^2 \times (9.4 \times 10^6)^3}{6.67 \times 10^{-11} \times (${ph.T})^2} = ${X(ph.M)}$ kg. In units of $10^{23}$ kg: $M = ${v3(ph.M / 1e23)}$.`,
  sol: 'Statements; T² = 4π²r³/GM; M = 4π²r³/(GT²) ≈ 6.48 × 10²³ kg.',
  scheme: [['Law of orbits and law of periods stated', 1], ['GMm/r² = mω²r', 1], ['T² = 4π²r³/(GM)', 1], [`T = ${ph.T} s and M = 4π²r³/(GT²)`, 1], [`M = ${xp(ph.M)} kg`, 1]],
  d: 3, c: 'application', t: [1], wl: null,
}), () => near(periodNumeric(G * ph.M, ph.r), ph.T, 0.002) && near(ph.M, 6.48e23, 0.005) || 'phobos');
const gv = { eps: 0.01 };
gv.h = (gv.eps / 2) * RE;
gv.d = gv.eps * RE;
add('gvar-long', long({
  stem: '(a) Derive the acceleration due to gravity at a height h above the surface of the Earth and show that it is approximately g(1 − 2h/R) for h much smaller than R. (b) Derive the acceleration due to gravity at a depth d below the surface, taking the Earth to be of uniform density. (c) Taking R = 6.4 × 10⁶ m, find the height and the depth at which g is 1.0% less than its surface value, in km.',
  model: r`(a) At height $h$ the distance from the centre is $R + h$: $g' = \dfrac{GM}{(R+h)^2} = g\left(1 + \dfrac{h}{R}\right)^{-2} \approx g\left(1 - \dfrac{2h}{R}\right)$ for $h \ll R$.

(b) At depth $d$ only the sphere of radius $R - d$ attracts; its mass is $M(R-d)^3/R^3$, so $g' = \dfrac{GM(R-d)}{R^3} = g\left(1 - \dfrac{d}{R}\right)$.

(c) For a fall of 1.0%: $\dfrac{2h}{R} = 0.010$ gives $h = 0.0050 \times 6.4 \times 10^6 = ${X(gv.h)}$ m $= ${dec(gv.h / 1e3, 3)}$ km; and $\dfrac{d}{R} = 0.010$ gives $d = 0.010 \times 6.4 \times 10^6 = ${X(gv.d)}$ m $= ${dec(gv.d / 1e3, 3)}$ km, twice as far.`,
  sol: 'g′ = g(1 + h/R)⁻² ≈ g(1 − 2h/R); g′ = g(1 − d/R); h = 32 km, d = 64 km.',
  scheme: [['g′ = g(1 + h/R)⁻² ≈ g(1 − 2h/R)', 1], ['Only the inner sphere attracts at depth d', 1], ['g′ = g(1 − d/R)', 1], [`h = ${dec(gv.h / 1e3, 3)} km`, 1], [`d = ${dec(gv.d / 1e3, 3)} km`, 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => {
  const hx = RE * (1 / Math.sqrt(0.99) - 1);
  return near(hx / 1e3, 32.2, 0.01) && near(gv.h / 1e3, 32, 1e-9) && near(gv.d / 1e3, 64, 1e-9) || 'gvar';
});
const lp = { m: 1000 };
lp.W = lp.m * g * RE;
add('pe-long', long({
  stem: '(a) Derive the expression for the gravitational potential energy of a mass m at distance r from the centre of the Earth, taking the zero at infinity. (b) Show that the increase of potential energy in raising m from the surface to a height h is mgRh/(R + h), and that it reduces to mgh for small h. (c) Find the least work needed to take a 1000 kg satellite from the Earth’s surface to infinity, in GJ (g = 9.8 m/s², R = 6.4 × 10⁶ m).',
  model: r`(a) The work done by an external agent in bringing $m$ slowly from infinity to $r$ is $\int_\infty^r \dfrac{GMm}{x^2}\,dx = -\dfrac{GMm}{r}$; with $U(\infty) = 0$ this is $U(r) = -\dfrac{GMm}{r}$.

(b) $\Delta U = GMm\left(\dfrac{1}{R} - \dfrac{1}{R+h}\right) = \dfrac{GMm\,h}{R(R+h)} = \dfrac{mgRh}{R+h}$ using $GM = gR^2$. For $h \ll R$, $R + h \approx R$ and $\Delta U \approx mgh$.

(c) Taking the satellite to infinity needs $-U(R) = \dfrac{GMm}{R} = mgR = 1000 \times 9.8 \times 6.4 \times 10^6 = ${X(lp.W)}$ J $= ${v3(lp.W / 1e9)}$ GJ.`,
  sol: 'U = −GMm/r; ΔU = mgRh/(R + h) ≈ mgh; W = mgR = 62.7 GJ.',
  scheme: [['Work from infinity to r by an external agent', 1], ['U(r) = −GMm/r', 1], ['ΔU = GMm h/(R(R + h)) = mgRh/(R + h)', 1], ['ΔU ≈ mgh for h ≪ R', 1], [`W = mgR = ${v3(lp.W / 1e9)} GJ`, 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => near(lp.W / 1e9, 62.72, 1e-3) || 'pelong');
const se = { M: 4.8e24, R: 5.0e6 };
se.ve = Math.sqrt((2 * G * se.M) / se.R);
se.vo = Math.sqrt((G * se.M) / se.R);
add('escape-long', long({
  stem: '(a) Derive the expression for the escape speed from the surface of a planet of mass M and radius R. (b) Derive the orbital speed of a satellite skimming the surface of the same planet and find the ratio of the two speeds. (c) A planet has M = 4.8 × 10²⁴ kg and R = 5.0 × 10⁶ m. Find both speeds, in km/s (G = 6.67 × 10⁻¹¹ N m² kg⁻²).',
  model: r`(a) For escape the total energy must be at least zero: $\tfrac{1}{2}mv_e^2 - \dfrac{GMm}{R} = 0$, so $v_e = \sqrt{\dfrac{2GM}{R}}$.

(b) For a skimming orbit $\dfrac{mv_o^2}{R} = \dfrac{GMm}{R^2}$, so $v_o = \sqrt{\dfrac{GM}{R}}$ and $\dfrac{v_e}{v_o} = \sqrt{2}$.

(c) $v_e = \sqrt{\dfrac{2 \times 6.67 \times 10^{-11} \times 4.8 \times 10^{24}}{5.0 \times 10^6}} = ${dec(se.ve, 4)}$ m/s $= ${v3(se.ve / 1e3)}$ km/s, and $v_o = \dfrac{v_e}{\sqrt{2}} = ${dec(se.vo / 1e3, 3)}$ km/s.`,
  sol: 'v_e = √(2GM/R); v_o = √(GM/R); 11.3 and 8.00 km/s.',
  scheme: [['Energy condition ½mv² = GMm/R', 1], ['v_e = √(2GM/R)', 1], ['v_o = √(GM/R) from mv²/R = GMm/R²; ratio √2', 1], [`v_e = ${v3(se.ve / 1e3)} km/s`, 1], [`v_o = ${dec(se.vo / 1e3, 3)} km/s`, 1]],
  d: 3, c: 'application', t: [4], wl: null,
}), () => {
  const gm = G * se.M;
  return near(se.ve, se.vo * Math.SQRT2, 1e-9) && !reaches(gm, se.R, se.ve * 0.99, 1000 * se.R) && reaches(gm, se.R, se.ve * 1.01, 1000 * se.R) && near(periodNumeric(gm, se.R), (2 * Math.PI * se.R) / se.vo, 0.002) || 'esc';
});
const sg = { m: 1000, r: 9.0e6 };
sg.K = (GM * sg.m) / (2 * sg.r);
sg.U = (-GM * sg.m) / sg.r;
sg.E = sg.K + sg.U;
add('satenergy-long', long({
  stem: '(a) A satellite of mass m moves in a circular orbit of radius r about the Earth (mass M). Derive expressions for its kinetic energy, potential energy and total energy. (b) Explain the sign of the total energy and define the binding energy. (c) A 1000 kg satellite is in a circular orbit of radius 9.0 × 10⁶ m. Find K, U and E, in GJ (G = 6.67 × 10⁻¹¹ N m² kg⁻², M = 6.0 × 10²⁴ kg).',
  model: r`(a) From $\dfrac{mv^2}{r} = \dfrac{GMm}{r^2}$ we get $K = \tfrac{1}{2}mv^2 = \dfrac{GMm}{2r}$. With zero at infinity $U = -\dfrac{GMm}{r}$, so $E = K + U = -\dfrac{GMm}{2r} = -K$.

(b) $E < 0$ means the satellite is bound to the Earth. The binding energy is $|E| = \dfrac{GMm}{2r}$, the least extra energy needed to free it.

(c) $K = \dfrac{GMm}{2r} = \dfrac{${X(GM * sg.m)}}{${X(2 * sg.r)}} = ${X(sg.K)}$ J $= ${v3(sg.K / 1e9)}$ GJ; $U = -2K = ${v3(sg.U / 1e9)}$ GJ; $E = ${v3(sg.E / 1e9)}$ GJ.`,
  sol: 'K = GMm/2r, U = −GMm/r, E = −GMm/2r; K = 22.2, U = −44.5, E = −22.2 GJ.',
  scheme: [['K = GMm/2r from mv²/r = GMm/r²', 1], ['U = −GMm/r and E = −GMm/2r = −K', 1], ['Negative E: bound; binding energy |E|', 1], [`K = ${v3(sg.K / 1e9)} GJ and U = ${mn(v3(sg.U / 1e9))} GJ`, 1], [`E = ${mn(v3(sg.E / 1e9))} GJ`, 1]],
  d: 3, c: 'application', t: [4], wl: null,
}), () => near(sg.E, -sg.K, 1e-12) && near(sg.U, 2 * sg.E, 1e-12) && near(sg.K / 1e9, 22.233, 1e-3) || 'sg');

// ================================================================ case-based items
const mo = { rp: 3.82e6, ra: 8.04e7, vp: 4.6e3, MM: 6.4e23 };
mo.va = (mo.vp * mo.rp) / mo.ra;
mo.a = (mo.rp + mo.ra) / 2;
mo.gm = G * mo.MM;
mo.T = 2 * Math.PI * Math.sqrt(mo.a ** 3 / mo.gm);
mo.Tw = 2 * Math.PI * Math.sqrt(mo.rp ** 3 / mo.gm);
add('orbiter-case', mk.case({
  passage: 'An Indian orbiter goes round Mars in a long elliptical orbit with Mars at one focus. Its nearest point (periapsis) is 3.82 × 10⁶ m from the centre of Mars, where its speed is 4.6 km/s; its farthest point (apoapsis) is 8.04 × 10⁷ m from the centre. Take G = 6.67 × 10⁻¹¹ N m² kg⁻² and the mass of Mars as 6.4 × 10²³ kg.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Which statement about the orbiter’s motion is correct?',
      right: 'It is much slower at apoapsis than at periapsis, because the product of speed and distance from Mars is the same at the two points',
      wrong: ['Its speed is the same everywhere, because the pull of Mars is always central', 'It is faster at apoapsis, where Mars’s pull is weakest', 'Its speed changes only because of its mass'],
      sol: 'Gravity is central, so the angular momentum is conserved: at both extreme points v r is the same, so a larger r means a smaller v — option (@K).',
      d: 1, c: 'understanding', t: [1],
    })),
    part('b', num({
      stem: 'Find the speed of the orbiter at apoapsis, in m/s.',
      value: v3(mo.va), tol: 1, unit: 'm/s',
      sol: r`$v_a r_a = v_p r_p$, so $v_a = 4600 \times \dfrac{3.82 \times 10^6}{8.04 \times 10^7} = ${v3(mo.va)}$ m/s.`,
      scheme: [[`v_a = v_p r_p/r_a = ${v3(mo.va)} m/s`, 1]],
      d: 2, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'Find the period of the orbiter, in hours, using T² = 4π²a³/(GM) with a the semi-major axis.',
      model: r`The law of periods for an ellipse uses the semi-major axis, which is half the sum of the nearest and farthest distances: $a = \dfrac{r_p + r_a}{2} = ${X(mo.a)}$ m. Substituting in $T = 2\pi\sqrt{\dfrac{a^3}{GM}}$ with the mass of Mars gives $T = 2\pi\sqrt{\dfrac{(${X(mo.a)})^3}{${X(mo.gm)}}} = ${X(mo.T)}$ s $= ${dec(mo.T / 3600, 3)}$ hours.`,
      sol: 'a = (r_p + r_a)/2; T = 2π√(a³/GM) ≈ 73.0 h.',
      scheme: [[`a = (r_p + r_a)/2 = ${xp(mo.a)} m`, 1], [`T = ${dec(mo.T / 3600, 3)} h`, 1]],
      d: 3, c: 'application', t: [1],
    }), [
      short({
        marks: 2,
        stem: 'A learner says that, since T² ∝ r³, the period can be found by putting r = 3.82 × 10⁶ m (the periapsis distance) in the circular-orbit formula, giving about 2.0 hours. Evaluate this claim.',
        model: r`The claim is **wrong**. For an ellipse the law of periods uses the **semi-major axis** $a = ${X(mo.a)}$ m, not the nearest distance. Using $r_p$ gives $${dec(mo.Tw / 3600, 3)}$ hours, which would be the period of a circular orbit at periapsis; the true period is $${dec(mo.T / 3600, 3)}$ hours.`,
        sol: 'Use the semi-major axis, not r_p.',
        scheme: [['Claim wrong: T² ∝ a³ with a the semi-major axis', 1], [`${dec(mo.Tw / 3600, 3)} h is a circular orbit at r_p; true T = ${dec(mo.T / 3600, 3)} h`, 1]],
        d: 4, c: 'evaluation', t: [1],
      }),
    ]),
  ],
}), (q) => near(mo.va, 218.6, 0.002) && near(mo.T / 3600, 73.0, 0.002) && near(mo.Tw / 3600, 1.99, 0.01) && near(periodNumeric(mo.gm, mo.rp) * 1, mo.Tw, 0.002) && near(q.children[1].answer.value, 219, 0.003) || 'orbiter');
const mn2 = { d: 6.4e3 };
mn2.pct = (mn2.d / RE) * 100;
add('shaft-case', mk.case({
  passage: 'A geophysics class models the Earth as a sphere of uniform density, with g = 9.8 m/s² at the surface and R = 6.4 × 10⁶ m. They study a vertical mine shaft 6.4 km deep and a radio tower 6.4 km tall.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'At the bottom of the shaft, g is less than at the surface mainly because',
      right: 'only the part of the Earth inside the sphere of radius R − d attracts the miner; the shell above exerts no net force',
      wrong: ['the Earth’s mass has decreased by the depth of the shaft', 'the miner is farther from the centre than at the surface', 'the air in the shaft pushes upward on the miner'],
      sol: 'The shell outside radius R − d pulls with zero net force; the inner sphere has mass ∝ (R − d)³, so g′ = g(1 − d/R) — option (@K).',
      d: 2, c: 'understanding', t: [2],
    })),
    part('b', num({
      stem: 'Find the percentage by which g at the bottom of the shaft is less than the surface value.',
      value: v3(mn2.pct), tol: 0.005, unit: '%',
      sol: r`$g' = g\left(1 - \dfrac{d}{R}\right)$, so the fractional decrease is $\dfrac{d}{R} = \dfrac{6.4 \times 10^3}{6.4 \times 10^6} = 1.0 \times 10^{-3}$. Percentage: $\dfrac{d}{R} \times 100 = ${dec(mn2.pct, 3)}$ per cent.`,
      scheme: [['Δg/g = d/R', 1]],
      d: 2, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Using the small-height approximation, find the percentage by which g at the top of the 6.4 km tower is less than the surface value, and compare it with the shaft.',
      model: r`For a height $h \ll R$, $\dfrac{\Delta g}{g} \approx \dfrac{2h}{R} = \dfrac{2 \times 6.4 \times 10^3}{6.4 \times 10^6} = ${dec((2 * mn2.d) / RE, 3)}$, that is ${dec(2 * mn2.pct, 3)} per cent. This is **twice** the ${dec(mn2.pct, 3)} per cent fall at the bottom of the shaft of equal depth.`,
      sol: 'Δg/g = 2h/R = 0.200%; twice the shaft value.',
      scheme: [[`Δg/g ≈ 2h/R = ${dec(2 * mn2.pct, 3)} %`, 1], ['Twice the fall in the shaft (d/R)', 1]],
      d: 3, c: 'application', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'A learner says that g must be infinite at the centre of the Earth, because g = GM/r² and r = 0 there. Evaluate this claim.',
        model: r`The claim is **wrong**. The formula $GM/r^2$ uses the mass inside radius $r$, which for a uniform Earth is $M r^3/R^3$; this gives $g' = g\,r/R$, proportional to $r$. So $g' \to 0$ at the centre, where the pulls from all sides cancel.`,
        sol: 'Inner mass ∝ r³, so g′ ∝ r → 0.',
        scheme: [['Claim wrong: only the inner mass ∝ r³ counts', 1], ['g′ = g r/R → 0 at the centre', 1]],
        d: 4, c: 'evaluation', t: [2],
      }),
    ]),
  ],
}), (q) => near(mn2.pct, 0.1, 1e-9) && near(2 * mn2.pct, 0.2, 1e-9) && near(q.children[1].answer.value, 0.1, 1e-9) || 'shaft');
const lf = { m: 1200, h: 6.4e5 };
lf.dU = (lf.m * g * RE * lf.h) / (RE + lf.h);
lf.mgh = lf.m * g * lf.h;
lf.pct = ((lf.mgh - lf.dU) / lf.dU) * 100;
lf.U = (-lf.m * g * RE * RE) / (RE + lf.h);
add('lift-case', mk.case({
  passage: 'A mission planner raises a 1200 kg payload from the Earth’s surface to a height of 640 km before releasing it. Take g = 9.8 m/s² at the surface and R = 6.4 × 10⁶ m; the potential energy is taken as zero at infinity.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'As the payload is raised from the surface to 640 km, its gravitational potential energy',
      right: 'increases, because U = −GMm/r becomes less negative as r grows',
      wrong: ['decreases, because the pull weakens with height', 'stays constant, because the mass is unchanged', 'increases by exactly mgh at any height'],
      sol: 'U = −GMm/r rises towards zero as r increases; the exact increase is mgRh/(R + h), not mgh — option (@K).',
      d: 1, c: 'understanding', t: [3],
    })),
    part('b', num({
      stem: 'Find the exact increase in the payload’s potential energy, in GJ.',
      value: v3(lf.dU / 1e9), tol: 0.02, unit: 'GJ',
      sol: r`$\Delta U = \dfrac{m g R h}{R + h} = \dfrac{1200 \times 9.8 \times 6.4 \times 10^6 \times 6.4 \times 10^5}{7.04 \times 10^6} = ${X(lf.dU)}$ J $= ${v3(lf.dU / 1e9)}$ GJ.`,
      scheme: [[`ΔU = mgRh/(R + h) = ${v3(lf.dU / 1e9)} GJ`, 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'Find the value of mgh for this lift and the percentage by which it exceeds the exact increase.',
      model: r`Here $mgh = 1200 \times 9.8 \times 6.4 \times 10^5 = ${X(lf.mgh)}$ J $= ${dec(lf.mgh / 1e9, 3)}$ GJ, while the exact increase is ${dec(lf.dU / 1e9, 3)} GJ. The difference, as a percentage of the exact value, is $\dfrac{${dec(lf.mgh / 1e9, 4)} - ${dec(lf.dU / 1e9, 4)}}{${dec(lf.dU / 1e9, 4)}} \times 100 = ${dec(lf.pct, 3)}$ per cent: $mgh$ is too large because $g$ decreases as the payload rises.`,
      sol: 'mgh = 7.53 GJ, 10.0% above ΔU.',
      scheme: [[`mgh = ${dec(lf.mgh / 1e9, 3)} GJ`, 1], [`It exceeds ΔU by ${dec(lf.pct, 3)} %`, 1]],
      d: 3, c: 'application', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'A learner says that the potential energy of the payload at 640 km is +mgh = +7.5 GJ. Evaluate this claim.',
        model: r`The claim is **wrong**. $mgh$ is only the (approximate) increase from the surface. With the zero at infinity the potential energy at $r = R + h$ is $U = -\dfrac{GMm}{r} = -\dfrac{m g R^2}{R + h} = -${dec(-lf.U / 1e9, 3)}$ GJ, which is **negative**; at the surface it is $-mgR = -${dec((lf.m * g * RE) / 1e9, 3)}$ GJ.`,
        sol: 'U is negative; mgh is only the change.',
        scheme: [['Claim wrong: mgh is the change, not U (zero at infinity)', 1], [`U = −GMm/r = −${dec(-lf.U / 1e9, 3)} GJ, negative`, 1]],
        d: 4, c: 'evaluation', t: [3],
      }),
    ]),
  ],
}), (q) => near(lf.dU / 1e9, 6.842, 0.001) && near(lf.pct, 10, 1e-9) && near(lf.U / 1e9, -68.42, 0.001) && near(q.children[1].answer.value, 6.84, 0.002) || 'lift');
const lu = { h: 1.0e5 };
lu.r = MOON.R + lu.h;
lu.gm = G * MOON.M;
lu.v = Math.sqrt(lu.gm / lu.r);
lu.T = (2 * Math.PI * lu.r) / lu.v;
lu.ve = Math.SQRT2 * lu.v;
add('lunar-case', mk.case({
  passage: 'A lunar orbiter circles the Moon in a circular orbit 100 km above the surface. The Moon has mass 7.35 × 10²² kg and radius 1.74 × 10⁶ m; take G = 6.67 × 10⁻¹¹ N m² kg⁻² and ignore the Earth’s pull. The escape speed from the Moon’s surface is 2.37 km/s.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The orbital speed of the orbiter depends on',
      right: 'the mass of the Moon and the radius of the orbit, but not on the mass of the orbiter',
      wrong: ['the mass of the orbiter and the radius of the orbit, but not on the mass of the Moon', 'the mass of the orbiter and the mass of the Moon only', 'the radius of the Moon only'],
      sol: 'm v²/r = GMm/r² gives v = √(GM/r): M and r appear, m cancels — option (@K).',
      d: 1, c: 'understanding', t: [4],
    })),
    part('b', num({
      stem: 'Find the orbital speed of the orbiter, in km/s.',
      value: v3(lu.v / 1e3), tol: 0.01, unit: 'km/s',
      sol: r`$r = 1.74 \times 10^6 + 1.0 \times 10^5 = ${X(lu.r)}$ m. $v = \sqrt{\dfrac{GM}{r}} = \sqrt{\dfrac{6.67 \times 10^{-11} \times 7.35 \times 10^{22}}{${X(lu.r)}}} = ${dec(lu.v, 4)}$ m/s $= ${v3(lu.v / 1e3)}$ km/s.`,
      scheme: [[`v = √(GM/r) = ${v3(lu.v / 1e3)} km/s`, 1]],
      d: 2, c: 'application', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'Find the time the orbiter takes to complete one revolution, in minutes.',
      model: r`The orbiter covers one circumference $2\pi r$ at the orbital speed $v$, so the period is $T = \dfrac{2\pi r}{v} = \dfrac{2\pi \times ${X(lu.r)}}{${dec(lu.v, 4)}} = ${dec(lu.T, 4)}$ s $= ${dec(lu.T / 60, 3)}$ minutes, using the speed found in part (b). In one Earth day of 1440 minutes the orbiter therefore completes about ${dec(1440 / (lu.T / 60), 3)} revolutions of the Moon.`,
      sol: 'T = 2πr/v ≈ 118 minutes.',
      scheme: [['T = 2πr/v', 1], [`T = ${dec(lu.T / 60, 3)} min`, 1]],
      d: 3, c: 'application', t: [4],
    }), [
      short({
        marks: 2,
        stem: 'A learner says the orbiter must move at the Moon’s surface escape speed of 2.37 km/s to stay in this orbit. Evaluate this claim.',
        model: r`The claim is **wrong**. A circular orbit needs only $v = \sqrt{GM/r} = ${dec(lu.v / 1e3, 3)}$ km/s. At this radius the escape speed is $\sqrt{2}$ times larger, $${dec(lu.ve / 1e3, 3)}$ km/s, so a speed of 2.37 km/s is above it: the orbiter would **leave** the Moon rather than orbit.`,
        sol: 'Orbit needs 1.63 km/s; 2.37 km/s exceeds the escape speed at that radius, 2.31 km/s.',
        scheme: [[`Claim wrong: circular speed is ${dec(lu.v / 1e3, 3)} km/s`, 1], [`Escape speed at r is √2 × v = ${dec(lu.ve / 1e3, 3)} km/s < 2.37 km/s`, 1]],
        d: 4, c: 'evaluation', t: [4],
      }),
    ]),
  ],
}), (q) => near(lu.v / 1e3, 1.632, 0.002) && near(lu.T / 60, 118.05, 0.002) && lu.ve / 1e3 < 2.37 && near(periodNumeric(lu.gm, lu.r), lu.T, 0.002) && near(q.children[1].answer.value, 1.63, 0.003) || 'lunar');
void MARS;
