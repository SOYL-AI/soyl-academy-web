// ch13 notes and flashcards.
import { T, unit, PROV, r, dec } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { V, EX, plotX, plotPhase, plotKin, plotTspring, plotEx, plotEt, plotPend, TABLES } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });
const { ex1, ex2, ex3, ex4, ex5, ex6, ex7, ex8, ex9, ex10, ex11 } = EX;

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Oscillations — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Periodic motion and simple harmonic motion',
      r`- A motion that repeats after equal intervals is **periodic**; if it goes to and fro about a mean position it is **oscillatory**. The **period** $T$ is the time for one oscillation, the **frequency** is $f = 1/T$ (unit hertz) and the **angular frequency** is $\omega = 2\pi/T = 2\pi f$.
- **Simple harmonic motion (SHM):** $x = A\cos(\omega t + \phi)$, where $A$ is the amplitude, $\omega t + \phi$ the phase and $\phi$ the phase constant, fixed by $x$ and $v$ at $t = 0$ (the position alone gives two values of $\phi$; the direction of motion chooses one). The graph is a sinusoidal curve; changing $\phi$ only shifts it along the time axis.
- **Reference circle:** the foot of the perpendicular from a particle moving uniformly on a circle of radius $A$ at angular speed $\omega$ onto a diameter performs SHM with amplitude $A$, angular frequency $\omega$ and phase constant equal to the starting angle.
- **Velocity and acceleration:** $v = -A\omega\sin(\omega t + \phi) = \pm\omega\sqrt{A^2 - x^2}$, maximum $A\omega$ at $x = 0$ and zero at $x = \pm A$; $a = -A\omega^2\cos(\omega t + \phi) = -\omega^2 x$, maximum $A\omega^2$ at $x = \pm A$ and zero at $x = 0$. The velocity leads the displacement by $\pi/2$; the acceleration is opposite in phase to the displacement. The relation $a = -\omega^2 x$ identifies SHM.
- Examples: a pulse of ${ex1.beats} beats per minute has $T = ${dec(ex1.T, 3)}$ s and $f = ${dec(ex1.f, 3)}$ Hz. For $x = 0.12\cos(4\pi t + \pi/3)$ m the initial values are $x = ${dec(ex2.x0, 3)}$ m, $v = ${dec(ex2.v0, 4)}$ m s$^{-1}$ and $a = ${dec(ex2.a0, 4)}$ m s$^{-2}$. The projection of a particle going round a circle of radius ${ex3.A} m at ${ex3.f} revolutions per second takes $${dec(ex3.t, 4)}$ s to go from $x = A$ to $x = A/2$. With $A = ${ex4.A}$ m and $T = ${ex4.T}$ s, $v_\text{max} = ${dec(ex4.vmax, 4)}$ m s$^{-1}$, $a_\text{max} = ${dec(ex4.amax, 4)}$ m s$^{-2}$, and at $x = ${ex4.x}$ m the speed is $${dec(ex4.v, 4)}$ m s$^{-1}$. A particle at $x = ${ex5.x0}$ m, $A = ${ex5.A}$ m, moving towards $+x$, has $\phi = 4\pi/3 = ${dec(ex5.phi, 4)}$ rad.
- Damped and forced oscillations and resonance are not covered in this course.`,
      [kt('Period and frequency', 'The period T is the time for one complete oscillation; the frequency f = 1/T is the number of oscillations per second (hertz).'), kt('Simple harmonic motion', 'Motion whose acceleration is proportional to the displacement from a fixed point and directed towards it, a = −ω²x; x = A cos(ωt + φ).'), kt('Phase constant', 'The phase φ at t = 0; it is fixed by the displacement and the direction of motion at t = 0.'), kt('Reference circle', 'The circle on which a particle in uniform circular motion has a projection that performs SHM.')],
      [fm(r`x = A\cos(\omega t + \phi)`, 'Displacement in SHM'), fm(r`\omega = \dfrac{2\pi}{T} = 2\pi f`, 'Angular frequency'), fm(r`v = \pm\omega\sqrt{A^2 - x^2}, \quad v_\text{max} = A\omega`, 'Velocity'), fm(r`a = -\omega^2 x, \quad a_\text{max} = A\omega^2`, 'Acceleration')],
      plotX,
      [1],
      [plotPhase, V.ref, plotKin, TABLES.TPERIODIC, TABLES.TPHASE],
    ),
    sec(
      '2. Force law, energy and the loaded spring',
      r`- **Force law:** SHM needs a restoring force $F = -kx$ (towards the mean position, proportional to the displacement); then $a = -(k/m)x$ and $\omega = \sqrt{k/m}$. Here $k = m\omega^2$ is the force constant (N m$^{-1}$).
- **Loaded spring:** a block of mass $m$ on a smooth table, joined to a light spring of force constant $k$, has $T = 2\pi\sqrt{m/k}$. The period does not depend on the amplitude; $T \propto \sqrt{m}$ and $T \propto 1/\sqrt{k}$. For $m = ${ex6.m}$ kg and $k = ${ex6.k}$ N m$^{-1}$, $T = ${dec(ex6.T, 4)}$ s. A ${ex7.m} kg glider that completes ${ex7.n} oscillations in ${dec(ex7.secs, 3)} s has $k = 4\pi^2 m/T^2 = ${dec(ex7.k, 5)}$ N m$^{-1}$, and a mass of $${dec(ex7.m2, 3)}$ kg would give a period of ${ex7.T2} s.
- **Energy:** $\text{PE} = \tfrac{1}{2}kx^2$ and $\text{KE} = \tfrac{1}{2}mv^2 = \tfrac{1}{2}k(A^2 - x^2)$, so $E = \tfrac{1}{2}kA^2 = \tfrac{1}{2}m\omega^2A^2$ is constant and proportional to $A^2$. It is all potential at $x = \pm A$, all kinetic at $x = 0$; KE = PE at $x = \pm A/\sqrt{2}$; at $x = \pm A/2$ one quarter is potential and three quarters kinetic. With time, $\text{KE} = E\sin^2\omega t$ and $\text{PE} = E\cos^2\omega t$ (starting from $x = A$): each varies with period $T/2$ and each averages $E/2$.
- Example: for $m = ${ex8.m}$ kg, $k = ${ex8.k}$ N m$^{-1}$ and $A = ${ex8.A}$ m, $E = ${dec(ex8.total, 3)}$ J; at $x = ${ex8.x}$ m, PE $= ${dec(ex8.pe, 3)}$ J, KE $= ${dec(ex8.ke, 3)}$ J and $v = ${dec(ex8.v, 4)}$ m s$^{-1}$; $v_\text{max} = ${dec(ex8.vmax, 4)}$ m s$^{-1}$. For $A = ${ex9.A}$ m, KE = PE at $x = ${dec(ex9.xEq, 3)}$ m, and at $x = ${ex9.x}$ m a fraction $${dec(ex9.keFrac, 3)}$ of $E$ is kinetic.`,
      [kt('Restoring force', 'A force that always points towards the equilibrium (mean) position; F = −kx gives SHM.'), kt('Force constant', 'k in F = −kx: the force per unit displacement, in newton per metre; k = mω².'), kt('Total energy of SHM', 'E = ½kA², constant, shared between kinetic ½k(A² − x²) and potential ½kx².')],
      [fm(r`F = -kx`, 'Force law of SHM'), fm(r`T = 2\pi\sqrt{\dfrac{m}{k}}`, 'Period of a loaded spring'), fm(r`E = \tfrac{1}{2}kA^2 = \tfrac{1}{2}kx^2 + \tfrac{1}{2}mv^2`, 'Total energy')],
      V.spring,
      [2],
      [plotTspring, V.ebars, plotEx, plotEt, TABLES.TFORCE, TABLES.TENERGY],
    ),
    sec(
      '3. The simple pendulum',
      r`- A **simple pendulum** is a small heavy bob on a light inextensible string of length $L$. At angle $\theta$ the tension balances $mg\cos\theta$ along the string and the **restoring force along the arc** is $F = -mg\sin\theta$.
- For small $\theta$ (in radian), $\sin\theta \approx \theta = s/L$, so $F \approx -(mg/L)s$: SHM with effective force constant $mg/L$ and $\omega^2 = g/L$. Hence $T = 2\pi\sqrt{L/g}$.
- The period is **independent of the mass** of the bob (the restoring force and the inertia are both proportional to $m$) and of the amplitude, for swings of a few degrees; $T \propto \sqrt{L}$ and $T \propto 1/\sqrt{g}$. At larger angles the true period is a little longer. A **seconds pendulum** has $T = 2$ s.
- Examples: a seconds pendulum with $g = 9.8$ m s$^{-2}$ has $L = ${dec(ex10.L, 4)}$ m, and on the Moon ($g = ${ex10.gM}$ m s$^{-2}$) its period is $${dec(ex10.TM, 4)}$ s. If the pendulum of a clock with $T = ${ex11.T}$ s lengthens by ${ex11.up * 100}%, the clock loses $${dec(ex11.lag, 3)}$ s per day.
- A spring oscillator keeps its period on the Moon; a pendulum does not, because the restoring force of the pendulum is gravitational.`,
      [kt('Simple pendulum', 'A point-like bob on a light inextensible string; for small angles it is a simple harmonic oscillator.'), kt('Small-angle approximation', 'sin θ ≈ θ (θ in radian); it makes the restoring force proportional to the displacement.'), kt('Seconds pendulum', 'A pendulum with a time period of 2 s; its length is about 0.99 m where g = 9.8 m s⁻².')],
      [fm(r`F = -mg\sin\theta \approx -\dfrac{mg}{L}\,s`, 'Restoring force of a pendulum'), fm(r`T = 2\pi\sqrt{\dfrac{L}{g}}`, 'Period of a simple pendulum')],
      V.pend,
      [3],
      [plotPend, TABLES.TSIN, TABLES.TCOMPARE],
    ),
  ],
  exam_tips_md: `- Compare an equation with x = A cos(ωt + φ) to read A, ω, φ; keep the calculator in radian mode.
- v = ω√(A² − x²), |a| = ω²x; maxima Aω (at x = 0) and Aω² (at x = ±A).
- Find φ from x(0) and the sign of v(0); one equation alone leaves two angles.
- E = ½kA² is the same at every position; PE = ½kx², KE = E − PE.
- Spring: T = 2π√(m/k). Pendulum: T = 2π√(L/g), small angles only, independent of the mass.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'Define the period and the frequency of an oscillation, and the relation between them.', 'The period T is the time for one complete oscillation; the frequency f is the number of oscillations per second, $f = 1/T$ (unit hertz).', 'concept', 1),
    fc(2, 'How is the angular frequency related to the period?', '$\\omega = 2\\pi/T = 2\\pi f$, in radian per second.', 'formula', 1),
    fc(3, 'Write the displacement of simple harmonic motion and name each symbol.', '$x = A\\cos(\\omega t + \\phi)$: amplitude $A$, angular frequency $\\omega$, phase $\\omega t + \\phi$, phase constant $\\phi$.', 'formula', 1),
    fc(4, 'What fixes the phase constant of a given SHM?', 'The displacement and the direction of the velocity at $t = 0$.', 'concept', 1),
    fc(5, 'Is every periodic motion simple harmonic?', 'No. Only motion with $a = -\\omega^2 x$ (a single sine or cosine in time) is SHM; a bouncing ball is periodic but not SHM.', 'concept', 1),
    fc(6, 'How does the reference circle give SHM?', 'The foot of the perpendicular from a particle in uniform circular motion (radius $A$, angular speed $\\omega$) on a diameter moves with $x = A\\cos(\\omega t + \\phi)$.', 'concept', 1),
    fc(7, 'Write the velocity of SHM as a function of position.', '$v = \\pm\\omega\\sqrt{A^2 - x^2}$.', 'formula', 1),
    fc(8, 'Where is the speed greatest in SHM, and what is it?', 'At the mean position, $v_\\text{max} = A\\omega$, where the acceleration is zero.', 'fact', 1),
    fc(9, 'Write the acceleration of SHM in terms of the displacement.', '$a = -\\omega^2 x$: proportional to $x$ and directed towards the mean position.', 'formula', 1),
    fc(10, 'Where is the acceleration greatest in SHM, and what is it?', 'At the extremes $x = \\pm A$: $a_\\text{max} = A\\omega^2$, where the speed is zero.', 'fact', 1),
    fc(11, 'By what phase does the velocity lead the displacement in SHM?', 'By $\\pi/2$, a quarter of a period.', 'fact', 1),
    fc(12, 'What is the phase relation between acceleration and displacement?', 'Opposite in phase (difference $\\pi$).', 'fact', 1),
    fc(13, 'Exam tip: you are given a sine form $x = A\\sin\\omega t$. How do you compare it with the cosine form?', 'Use $\\sin\\omega t = \\cos(\\omega t - \\pi/2)$: the phase constant is $-\\pi/2$.', 'exam-tip', 1),
    fc(14, 'State the force law of simple harmonic motion.', '$F = -kx$: a restoring force proportional to the displacement, with $k = m\\omega^2$.', 'formula', 2),
    fc(15, 'What is the SI unit of the force constant $k$?', 'Newton per metre (N m⁻¹).', 'fact', 2),
    fc(16, 'Write the time period of a block of mass $m$ on a spring of force constant $k$.', '$T = 2\\pi\\sqrt{m/k}$.', 'formula', 2),
    fc(17, 'Does the period of a spring oscillator depend on the amplitude?', 'No. It depends only on $m$ and $k$.', 'concept', 2),
    fc(18, 'The mass on a spring is quadrupled. What happens to the period?', 'It doubles, since $T \\propto \\sqrt{m}$.', 'concept', 2),
    fc(19, 'Write the potential energy, the kinetic energy and the total energy of SHM.', '$\\tfrac{1}{2}kx^2$; $\\tfrac{1}{2}k(A^2 - x^2)$; $E = \\tfrac{1}{2}kA^2$.', 'formula', 2),
    fc(20, 'Where is the energy of SHM all kinetic, and where all potential?', 'All kinetic at the mean position; all potential at the extremes $x = \\pm A$.', 'concept', 2),
    fc(21, 'The amplitude is doubled. What happens to the total energy and to the maximum speed?', 'The energy becomes four times as large; $v_\\text{max} = A\\omega$ doubles.', 'concept', 2),
    fc(22, 'At what displacement are the kinetic and potential energies equal?', '$x = \\pm A/\\sqrt{2}$.', 'formula', 2),
    fc(23, 'How fast do the kinetic and potential energies oscillate compared with the displacement?', 'At twice the frequency (period $T/2$); each averages $E/2$.', 'concept', 2),
    fc(24, 'Why is the spring oscillator\'s period unchanged on the Moon?', 'The restoring force comes from the spring, not from gravity; $m$ and $k$ do not change.', 'concept', 2),
    fc(25, 'What is the restoring force on a simple pendulum bob at angle $\\theta$?', '$F = -mg\\sin\\theta$, along the arc towards the lowest point.', 'formula', 3),
    fc(26, 'Which approximation makes the pendulum motion simple harmonic?', '$\\sin\\theta \\approx \\theta$ (in radian), valid for small angles.', 'concept', 3),
    fc(27, 'Write the time period of a simple pendulum.', '$T = 2\\pi\\sqrt{L/g}$.', 'formula', 3),
    fc(28, 'Why does the period of a pendulum not depend on the mass of the bob?', 'The restoring force $mg\\sin\\theta$ and the inertia $m$ are both proportional to $m$, so it cancels.', 'concept', 3),
    fc(29, 'What is a seconds pendulum, and how long is it near the Earth\'s surface?', 'One with $T = 2$ s; $L = gT^2/4\\pi^2 \\approx 0.99$ m for $g = 9.8$ m s⁻².', 'fact', 3),
    fc(30, 'Exam tip: a pendulum clock runs slow after a rise in temperature. Which change explains it?', 'The rod lengthens, so $L$ increases and $T \\propto \\sqrt{L}$ increases.', 'exam-tip', 3),
  ],
  status: 'draft',
  provenance: PROV,
};
void dec;
