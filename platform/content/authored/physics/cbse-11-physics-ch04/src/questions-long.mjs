// ch04 Laws of Motion — question bank, part 3: long answers (5 marks) and case-based items (4 marks, with part (c) either/or).
import { mk, add, r, near, sig } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { g, rad, deg, solveLin, bankLimit, tablePulley, integ } from './phys.mjs';
import { p3, Q3 } from './questions.mjs';

const { mcq, num, short, long, part } = mk;
const S = Math.sin;
const C = Math.cos;
const Tn = Math.tan;

// ---------------------------------------------------------------- long: conservation of momentum, sticking collision
const cl = { m1: 2.0, u1: 5.0, m2: 3.0 };
cl.V = (cl.m1 * cl.u1) / (cl.m1 + cl.m2);
cl.K0 = 0.5 * cl.m1 * cl.u1 ** 2;
cl.K1 = 0.5 * (cl.m1 + cl.m2) * cl.V ** 2;
cl.loss = cl.K0 - cl.K1;
add('cons-long', long({
  stem: '(a) State the law of conservation of linear momentum and derive it for two bodies that interact only with each other. (b) A 2.0 kg trolley moving at 5.0 m/s on a smooth track strikes a stationary 3.0 kg trolley and the two stick together. Find their common speed and the loss of kinetic energy. (c) Momentum is conserved in this collision but kinetic energy is not. Explain why.',
  model: r`(a) **Law:** if no net external force acts on a system, its total momentum stays constant. For bodies A and B: $d\vec p_A/dt = \vec F_{BA}$ and $d\vec p_B/dt = \vec F_{AB}$; the third law gives $\vec F_{AB} = -\vec F_{BA}$, so $d(\vec p_A + \vec p_B)/dt = 0$.

(b) $m_1 u_1 = (m_1 + m_2)V$, so $V = \dfrac{2.0 \times 5.0}{5.0} = ${p3(cl.V)}$ m/s. Kinetic energy before $= \tfrac{1}{2}(2.0)(5.0)^2 = ${p3(cl.K0)}$ J; after $= \tfrac{1}{2}(5.0)(${p3(cl.V)})^2 = ${p3(cl.K1)}$ J; loss $= ${p3(cl.loss)}$ J.

(c) The internal forces that make the bodies stick do work in deforming them; this energy becomes heat and sound, so kinetic energy falls, while the external force remains zero and momentum is conserved.`,
  sol: 'Derivation from the second and third laws; V = 2.0 m/s; loss 15 J; deformation energy.',
  scheme: [['Statement of the law', 1], ['Derivation: second law for each body plus the third law', 1], [`V = m₁u₁/(m₁ + m₂) = ${p3(cl.V)} m s⁻¹`, 1], [`Loss of kinetic energy = ${p3(cl.K0)} − ${p3(cl.K1)} = ${p3(cl.loss)} J`, 1], ['Energy goes into deformation, heat and sound; no external force, so momentum is conserved', 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => near(cl.V, 2.0, 1e-12) && near(cl.loss, 15, 1e-12) || 'cons-long');

// ---------------------------------------------------------------- long: impulse of a kick and a catch
const p4 = (x) => String(sig(x, 4));
const fb = { m: 0.45, v: 25, tk: 0.008, tc: 0.10 };
fb.J = fb.m * fb.v;
fb.Fk = fb.J / fb.tk;
fb.Fc = fb.J / fb.tc;
add('impulse-long', long({
  stem: '(a) Define impulse and show that it equals the change in momentum of the body. (b) A footballer kicks a stationary 0.45 kg ball so that it leaves her boot at 25 m/s; the contact lasts 8.0 ms. Find the impulse and the average force on the ball. (c) A goalkeeper catches the same ball moving at 25 m/s, bringing it to rest over 0.10 s. Find the average force on the ball, and explain why it is so much smaller than the force in (b).',
  model: r`(a) **Impulse** is $\vec J = \int \vec F\,dt$, the area under the F–t graph. Since $\vec F = d\vec p/dt$, $\vec J = \int (d\vec p/dt)\,dt = \vec p_2 - \vec p_1 = \Delta\vec p$.

(b) $J = \Delta p = 0.45 \times 25 = ${p4(fb.J)}$ N s. $F_\text{av} = \dfrac{J}{\Delta t} = \dfrac{${p4(fb.J)}}{0.008} = ${p4(fb.Fk)}$ N.

(c) The change of momentum has the same size, ${p4(fb.J)} kg m/s, so $F_\text{av} = \dfrac{${p4(fb.J)}}{0.10} = ${p4(fb.Fc)}$ N. For the same impulse, a contact time ${p4(fb.tc / fb.tk)} times longer gives an average force ${p4(fb.tc / fb.tk)} times smaller.`,
  sol: 'Impulse = ∫F dt = Δp; J = 11.25 N s; kick ≈ 1.41 kN; catch 112.5 N.',
  scheme: [['Impulse defined as ∫F dt (area under F–t)', 1], ['Using F = dp/dt to show J = Δp', 1], [`J = ${p4(fb.J)} N s and F = ${p4(fb.Fk)} N for the kick`, 1], [`F = ${p4(fb.Fc)} N for the catch`, 1], ['Same Δp, contact time longer by the factor 12.5, so the force is smaller by that factor', 1]],
  d: 3, c: 'application', t: [1], wl: null,
}), () => near(integ(() => fb.Fk, 0, fb.tk) , fb.J, 1e-9) && near(fb.Fk / fb.Fc, 12.5, 1e-9) || 'impulse-long');

// ---------------------------------------------------------------- long: block on a rough incline
const ic = { m: 8.0, th: 35, mus: 0.50, muk: 0.30, t: 2.0 };
ic.tan = Tn(rad(ic.th));
ic.a = g * (S(rad(ic.th)) - ic.muk * C(rad(ic.th)));
ic.v = ic.a * ic.t;
ic.fk = ic.muk * ic.m * g * C(rad(ic.th));
add('incline-long', long({
  stem: '(a) A block of mass m rests on a rough plane inclined at angle θ. Show the forces on it and prove that it stays at rest only if tan θ ≤ μs. (b) An 8.0 kg block is released on a plane inclined at 35°, with μs = 0.50 and μk = 0.30. Show that it slides, and find its acceleration and its speed 2.0 s after release. (g = 9.8 m/s²; sin 35° = 0.574, cos 35° = 0.819.)',
  model: r`(a) The forces are the weight $mg$, the normal reaction $N$ and the friction $f$ up the slope. At rest, $N = mg\cos\theta$ and $f = mg\sin\theta$; since $f \le \mu_s N$, we need $\tan\theta \le \mu_s$.

(b) $\tan 35^\circ = ${p3(ic.tan)} > \mu_s = 0.50$, so the block slides. Kinetic friction $f_k = \mu_k N = 0.30 \times ${ic.m} \times ${g} \times ${p3(C(rad(ic.th)))} = ${p3(ic.fk)}$ N. Along the slope $mg\sin\theta - f_k = ma$, so $a = g(\sin\theta - \mu_k\cos\theta) = ${p3(ic.a)}$ m/s$^2$. Starting from rest, $v = at = ${p3(ic.a)} \times ${ic.t} = ${p3(ic.v)}$ m/s.`,
  sol: 'Resolve; tan 35° = 0.70 > 0.50; a ≈ 3.2 m/s²; v ≈ 6.4 m/s.',
  scheme: [['Forces named: mg, N perpendicular, f up the slope', 1], ['N = mg cos θ, f = mg sin θ and f ≤ μs N give tan θ ≤ μs', 1], [`tan 35° = ${p3(ic.tan)} > 0.50: it slides`, 1], [`a = g(sin θ − μk cos θ) = ${p3(ic.a)} m s⁻²`, 1], [`v = at = ${p3(ic.v)} m s⁻¹`, 1]],
  d: 4, c: 'application', t: [3], wl: null,
}), () => { const m = ic.m; const [a] = solveLin([[m]], [m * g * S(rad(ic.th)) - ic.muk * m * g * C(rad(ic.th))]); return near(a, ic.a, 1e-9) && ic.tan > ic.mus || 'incline-long'; });

// ---------------------------------------------------------------- long: banked road with friction
const bl = { r: 80, th: 12, mu: 0.35 };
bl.v0 = Math.sqrt(bl.r * g * Tn(rad(bl.th)));
bl.vmax = bankLimit(bl.th, bl.mu, bl.r, 'max');
bl.t = Tn(rad(bl.th));
bl.num = bl.r * g * (bl.mu + bl.t);
bl.den = 1 - bl.mu * bl.t;
add('bank-long', long({
  stem: '(a) A car moves on a circular road of radius r banked at angle θ, with coefficient of friction μs. Draw (describe) the forces on the car and derive the greatest speed at which it can go round without skidding outward. (b) For r = 80 m, θ = 12° and μs = 0.35, find this speed and the speed at which no friction is needed. (g = 9.8 m/s², tan 12° = 0.2126.)',
  model: r`(a) The forces are the weight $mg$, the normal reaction $N$ perpendicular to the road and friction $f = \mu_s N$ down the slope (the car tends to skid outward and up). Vertically: $N\cos\theta - \mu_s N\sin\theta = mg$. Horizontally, towards the centre: $N\sin\theta + \mu_s N\cos\theta = mv^2/r$. Dividing, $v_\text{max}^2 = rg\,\dfrac{\mu_s + \tan\theta}{1 - \mu_s\tan\theta}$.

(b) $v_\text{max}^2 = ${bl.r} \times ${g} \times \dfrac{${p3(bl.mu + bl.t)}}{${p3(bl.den)}} = ${p3(bl.vmax ** 2)}$, so $v_\text{max} = ${p3(bl.vmax)}$ m/s. With no friction, $v_0 = \sqrt{rg\tan\theta} = \sqrt{${bl.r} \times ${g} \times ${p3(bl.t)}} = ${p3(bl.v0)}$ m/s.`,
  sol: 'Resolve N and f vertically and horizontally; divide; evaluate.',
  scheme: [['Forces: mg, N, and f down the slope at the limit', 1], ['N cos θ − μN sin θ = mg and N sin θ + μN cos θ = mv²/r', 1], ['v max² = rg(μ + tan θ)/(1 − μ tan θ)', 1], [`v max = ${p3(bl.vmax)} m s⁻¹`, 1], [`v₀ = √(rg tan θ) = ${p3(bl.v0)} m s⁻¹`, 1]],
  d: 4, c: 'application', t: [4], wl: null,
}), () => near(Math.sqrt(bl.num / bl.den), bl.vmax, 1e-9) && bl.vmax > bl.v0 || 'bank-long');

// ---------------------------------------------------------------- long: blocks with friction and a pulley
const cn = { m1: 4.0, m2: 6.0, mu: 0.25 };
Object.assign(cn, tablePulley(cn.m1, cn.m2, cn.mu));
const cs = tablePulley(cn.m1, cn.m2, 0);
add('conn-long', long({
  stem: '(a) A block of mass m₁ on a rough horizontal table (coefficient of kinetic friction μ) is joined by a light string over a smooth pulley to a hanging block of mass m₂. Write the equation of motion of each block and obtain the acceleration and the tension. (b) For m₁ = 4.0 kg, m₂ = 6.0 kg and μ = 0.25, find a and T, and the acceleration if the table were smooth. (g = 9.8 m/s².)',
  model: r`(a) Table block: $T - \mu m_1 g = m_1 a$. Hanging block: $m_2 g - T = m_2 a$ (same $T$ and $a$ for a light string over a smooth pulley). Adding, $a = \dfrac{(m_2 - \mu m_1)g}{m_1 + m_2}$ and $T = m_1(a + \mu g)$.

(b) $a = \dfrac{(6.0 - 0.25 \times 4.0) \times ${g}}{10.0} = ${p3(cn.a)}$ m/s$^2$ and $T = 4.0 \times (${p3(cn.a)} + ${p3(cn.mu * g)}) = ${p3(cn.T)}$ N. On a smooth table $a = \dfrac{6.0 \times ${g}}{10.0} = ${p3(cs.a)}$ m/s$^2$, larger because friction no longer opposes the motion.`,
  sol: 'Two equations; add; evaluate; compare.',
  scheme: [['T − μ m₁ g = m₁ a for the table block', 1], ['m₂ g − T = m₂ a for the hanging block', 1], [`a = (m₂ − μ m₁)g/(m₁ + m₂) = ${p3(cn.a)} m s⁻²`, 1], [`T = m₁(a + μ g) = ${p3(cn.T)} N`, 1], [`Smooth table: a = ${p3(cs.a)} m s⁻², larger`, 1]],
  d: 4, c: 'application', t: [1, 3], wl: null,
}), () => near(cn.a, 4.9, 1e-9) && near(cn.T, 29.4, 1e-9) && near(cs.a, 5.88, 1e-9) || 'conn-long');

// ---------------------------------------------------------------- case 1: lift (t01)
const ln = { m: 55, a: 1.2 };
ln.W = ln.m * g;
ln.up = ln.m * (g + ln.a);
ln.down = ln.m * (g - ln.a);
add('lift-case', mk.case({
  passage: `A nurse of mass ${ln.m} kg stands on a bathroom scale in the lift of a hospital in Kolkata. The scale shows the force that it exerts on her feet, in newtons. The lift starts from the ground floor with an upward acceleration of ${ln.a.toFixed(1)} m/s², then rises at a steady speed, and finally slows down with a magnitude of ${ln.a.toFixed(1)} m/s² as it reaches the top floor. Take g = ${g} m/s².`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'While the lift rises at a steady speed, the scale reads',
      right: `${p3(ln.W)} N, equal to her weight`,
      wrong: [`${p3(ln.up)} N`, `${p3(ln.down)} N`, '0 N'],
      sol: `With no acceleration, N = mg = ${ln.m} × ${g} = ${p3(ln.W)} N — option (@K).`,
      d: 1, c: 'understanding', t: [1],
    })),
    part('b', mk.num({
      stem: 'Find the reading of the scale while the lift accelerates upward from the ground floor, in N.',
      value: Q3(ln.up), tol: 1, unit: 'N',
      sol: r`$N - mg = ma$, so $N = m(g + a) = ${ln.m} \times (${g} + ${ln.a}) = ${p3(ln.up)}$ N.`,
      scheme: [[`N = m(g + a) = ${p3(ln.up)} N`, 1]],
      d: 2, c: 'application', t: [1],
    })),
    part('c', short({
      marks: 2,
      stem: 'State the direction of the lift’s acceleration as it slows down near the top while still moving upward, and find the scale reading then.',
      model: r`The velocity is upward and decreasing, so the acceleration is **downward**. Taking up as positive, $N - mg = m(-a)$, so $N = m(g - a) = ${ln.m} \times (${g} - ${ln.a}) = ${p3(ln.down)}$ N, which is less than her weight because the lift is slowing down while it still moves up.`,
      sol: 'Acceleration downward; N = m(g − a).',
      scheme: [['Acceleration is downward (velocity up and decreasing)', 1], [`N = m(g − a) = ${p3(ln.down)} N`, 1]],
      d: 3, c: 'application', t: [1],
    }), [
      short({
        marks: 2,
        stem: `Her friend says: “Her weight increases to ${p3(ln.up)} N while the lift speeds up, because the scale shows a larger number.” Evaluate this statement.`,
        model: r`The statement is **not correct**. Her weight $mg = ${p3(ln.W)}$ N, the gravitational pull on her, does not change. The scale shows the normal reaction $N$, which rises to ${p3(ln.up)} N because she is accelerating upward ($N - mg = ma$). It is her *apparent* weight that is larger.`,
        sol: 'Weight is mg; the scale shows N.',
        scheme: [['Claim wrong: the weight mg stays 539 N', 1], ['The scale reads the normal reaction N = m(g + a)', 1]],
        d: 4, c: 'evaluation', t: [1],
      }),
    ]),
  ],
}), (q) => near(ln.up, 605, 1e-9) && near(ln.down, 473, 1e-9) && near(q.children[1].answer.value, 605, 1e-9) || 'lift-case');

// ---------------------------------------------------------------- case 2: recoil of a boat (t02)
const bo = { mb: 195, ma: 5.0, v: 8.0 };
bo.p = bo.ma * bo.v;
bo.V = bo.p / bo.mb;
add('recoil-case', mk.case({
  passage: `A fisherman sits in a small boat that floats at rest on a calm backwater near Kochi. The boat together with the fisherman has a mass of ${bo.mb} kg. He throws a ${bo.ma.toFixed(1)} kg anchor horizontally off the stern at ${bo.v.toFixed(1)} m/s (relative to the water). Treat the water as exerting no horizontal force during the throw.`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The total momentum of boat, fisherman and anchor just before the throw is',
      right: 'zero',
      wrong: [`${p3(bo.p)} kg m/s forward`, `${p3(bo.mb * 0.1)} kg m/s backward`, 'not defined, because the boat floats'],
      sol: 'Everything is at rest, so the total momentum is zero — option (@K).',
      d: 1, c: 'understanding', t: [2],
    })),
    part('b', mk.num({
      stem: 'Find the speed with which the boat moves in the opposite direction, in m/s.',
      value: Q3(bo.V), tol: 0.005, unit: 'm/s',
      sol: r`Momentum is conserved: $M V = m v$, so $V = \dfrac{m v}{M} = \dfrac{${bo.ma} \times ${bo.v}}{${bo.mb}} = ${p3(bo.V)}$ m/s.`,
      scheme: [[`V = mv/M = ${p3(bo.V)} m/s`, 1]],
      d: 3, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2,
      stem: 'Explain why the boat would recoil more slowly if he threw the same anchor with a smaller speed.',
      model: r`The boat’s momentum must be equal and opposite to the anchor’s, $MV = mv$, so $V = mv/M$ is proportional to the throwing speed $v$. A smaller $v$ means a smaller momentum of the anchor and therefore a smaller recoil speed for the same boat mass.`,
      sol: 'V = mv/M, proportional to v.',
      scheme: [['MV = mv: equal and opposite momenta', 1], ['V ∝ v, so a smaller throwing speed gives a smaller recoil', 1]],
      d: 3, c: 'understanding', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'A student says: “Momentum is not conserved, because the boat was at rest and now it is moving.” Evaluate this statement.',
        model: r`The statement is **wrong**. The system is boat, fisherman *and* anchor. Before the throw the total momentum is zero; afterwards the anchor has $+${p3(bo.p)}$ kg m/s and the boat $-${p3(bo.p)}$ kg m/s, giving a total of zero again. The boat gains momentum only because the anchor gains the opposite amount.`,
        sol: 'Include the anchor; total stays zero.',
        scheme: [['Claim wrong: the system must include the anchor', 1], ['Anchor +40 and boat −40 kg m s⁻¹ add to zero', 1]],
        d: 4, c: 'evaluation', t: [2],
      }),
    ]),
  ],
}), (q) => near(bo.V, 0.2051, 1e-3) && near(bo.mb * bo.V - bo.ma * bo.v, 0, 1e-9) && near(q.children[1].answer.value, 0.205, 1e-9) || 'recoil-case');

// ---------------------------------------------------------------- case 3: sack on a ramp (t03)
const rm = { m: 30, th: 20, mus: 0.45, muk: 0.35, th2: 30 };
rm.f = rm.m * g * S(rad(rm.th));
rm.lim = rm.mus * rm.m * g * C(rad(rm.th));
rm.a = g * (S(rad(rm.th2)) - rm.muk * C(rad(rm.th2)));
add('incline-case', mk.case({
  passage: `At a Surat godown, a loader keeps a ${rm.m} kg sack of grain at rest on a plank ramp that rises at ${rm.th}° to the horizontal. The coefficients of friction between sack and plank are μs = ${rm.mus.toFixed(2)} and μk = ${rm.muk.toFixed(2)}. Take g = ${g} m/s².`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The sack at the 20° ramp',
      right: `stays at rest, because tan ${rm.th}° = ${p3(Tn(rad(rm.th)))} is less than μs`,
      wrong: [`slides down, because its weight exceeds the friction ${p3(rm.lim)} N`, 'slides down, because μk is less than μs', 'stays at rest, because the normal reaction equals its weight'],
      sol: `The sack stays if tan θ ≤ μs: tan ${rm.th}° = ${p3(Tn(rad(rm.th)))} < ${rm.mus.toFixed(2)} — option (@K).`,
      d: 2, c: 'application', t: [3],
    })),
    part('b', mk.num({
      stem: 'Find the friction force on the sack while it is at rest on the 20° ramp, in N.',
      value: Q3(rm.f), tol: 1, unit: 'N',
      sol: r`At rest the friction balances the component of the weight along the ramp: $f = mg\sin ${rm.th}^\circ = ${rm.m} \times ${g} \times ${p3(S(rad(rm.th)))} = ${p3(rm.f)}$ N.`,
      scheme: [[`f = mg sin θ = ${p3(rm.f)} N`, 1]],
      d: 3, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2,
      stem: 'The ramp is now raised to 30°. Show that the sack slides, and find its acceleration down the ramp.',
      model: r`$\tan 30^\circ = ${p3(Tn(rad(rm.th2)))} > \mu_s = ${rm.mus}$, so the sack slides down the ramp, because the weight component along the ramp now exceeds the largest friction. Its acceleration is $a = g(\sin\theta - \mu_k\cos\theta) = ${g} \times (${p3(S(rad(rm.th2)))} - ${rm.muk} \times ${p3(C(rad(rm.th2)))}) = ${p3(rm.a)}$ m/s$^2$.`,
      sol: 'tan 30° exceeds μs; a = g(sin θ − μk cos θ).',
      scheme: [[`tan 30° = ${p3(Tn(rad(rm.th2)))} > 0.45: it slides`, 1], [`a = g(sin θ − μk cos θ) = ${p3(rm.a)} m s⁻²`, 1]],
      d: 3, c: 'application', t: [3],
    }), [
      short({
        marks: 2,
        stem: `The loader says: “At 20° the friction on the sack is μs m g cos 20° = ${p3(rm.lim)} N.” Evaluate this statement.`,
        model: r`The statement is **wrong**. $\mu_s N = ${p3(rm.lim)}$ N is only the *largest* friction available (the limiting value). While the sack is at rest the static friction adjusts itself to balance the weight component, $mg\sin ${rm.th}^\circ = ${p3(rm.f)}$ N, which is smaller than the limit.`,
        sol: 'Static friction equals mg sin θ, not the limiting value.',
        scheme: [['Claim wrong: μs N is the limit, not the actual friction', 1], [`Actual friction = mg sin 20° = ${p3(rm.f)} N`, 1]],
        d: 4, c: 'evaluation', t: [3],
      }),
    ]),
  ],
}), (q) => near(rm.f, 100.4, 5e-3) && near(rm.a, 1.93, 1e-2) && rm.f < rm.lim || 'incline-case');

// ---------------------------------------------------------------- case 4: banked expressway ramp (t04)
const eb = { r: 120, th: 8, mu: 0.35 };
eb.t = Tn(rad(eb.th));
eb.v0 = Math.sqrt(eb.r * g * eb.t);
eb.kmh = eb.v0 * 3.6;
eb.vmax = bankLimit(eb.th, eb.mu, eb.r, 'max');
add('bank-case', mk.case({
  passage: `A curved exit ramp of an expressway near Bengaluru has radius ${eb.r} m and is banked at ${eb.th}° to the horizontal. The engineers chose the banking so that vehicles at the design speed need no sideways friction. On a wet day the coefficient of static friction between tyres and road drops to ${eb.mu.toFixed(2)}. Take g = ${g} m/s².`,
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'A car takes the ramp at exactly the design speed. The friction needed from the road is',
      right: 'zero, because the horizontal part of the normal reaction supplies all the centripetal force',
      wrong: ['equal to mg sin θ, down the slope', 'equal to mv²/r, towards the centre', 'zero, because the car is moving at constant speed'],
      sol: 'At v = √(rg tan θ) the components N cos θ = mg and N sin θ = mv²/r are satisfied by N alone, so no friction is needed — option (@K).',
      d: 2, c: 'understanding', t: [4],
    })),
    part('b', mk.num({
      stem: 'Find the design speed of the ramp, in km/h.',
      value: Q3(eb.kmh), tol: 0.2, unit: 'km/h',
      sol: r`$v_0 = \sqrt{rg\tan\theta} = \sqrt{${eb.r} \times ${g} \times ${p3(eb.t)}} = ${p3(eb.v0)}$ m/s. In km/h: $${p3(eb.v0)} \times 3.6 = ${p3(eb.kmh)}$ km/h.`,
      scheme: [[`v₀ = ${p3(eb.v0)} m s⁻¹ = ${p3(eb.kmh)} km h⁻¹`, 1]],
      d: 3, c: 'application', t: [4],
    })),
    part('c', short({
      marks: 2,
      stem: 'Find the greatest speed at which a car can take the wet ramp without skidding outward, in m/s.',
      model: r`$v_\text{max}^2 = rg\,\dfrac{\mu_s + \tan\theta}{1 - \mu_s\tan\theta} = ${eb.r} \times ${g} \times \dfrac{${p3(eb.mu + eb.t)}}{${p3(1 - eb.mu * eb.t)}} = ${p3(eb.vmax ** 2)}$, so $v_\text{max} = ${p3(eb.vmax)}$ m/s. This is the greatest speed with friction acting down the slope, and it exceeds the design speed of ${p3(eb.v0)} m/s, so the wet road still allows the design speed.`,
      sol: 'v max² = rg(μ + tan θ)/(1 − μ tan θ).',
      scheme: [['v max² = rg(μ + tan θ)/(1 − μ tan θ)', 1], [`v max = ${p3(eb.vmax)} m s⁻¹`, 1]],
      d: 4, c: 'application', t: [4],
    }), [
      short({
        marks: 2,
        stem: 'A student says: “A loaded truck, with twice the mass of a car, must keep below a lower speed on this ramp.” Evaluate this statement.',
        model: r`The statement is **wrong**. In $\tan\theta = v^2/rg$ and in $v_\text{max}^2 = rg(\mu_s + \tan\theta)/(1 - \mu_s\tan\theta)$ the mass has cancelled: both the centripetal force and the friction limit are proportional to $m$. The truck and the car have the same limiting speeds, ${p3(eb.v0)} m/s for no friction and ${p3(eb.vmax)} m/s at most when wet.`,
        sol: 'Mass cancels in the speed limits.',
        scheme: [['Claim wrong: mass cancels from the equations', 1], [`Same limits for both vehicles (${p3(eb.v0)} and ${p3(eb.vmax)} m s⁻¹)`, 1]],
        d: 4, c: 'evaluation', t: [4],
      }),
    ]),
  ],
}), (q) => near(eb.v0, 12.86, 1e-3) && near(Math.sqrt(eb.r * g * (eb.mu + eb.t) / (1 - eb.mu * eb.t)), eb.vmax, 1e-9) && near(q.children[1].answer.value, 46.3, 1e-9) || 'bank-case');
