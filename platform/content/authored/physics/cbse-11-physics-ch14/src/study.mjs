// ch14 notes and flashcards.
import { T, unit, PROV, r, dec } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { V, EX, plotStringV, plotSoundT, plotSuper, plotStand, TABLES } from './decks.mjs';

const kt = (term, definition_md) => ({ term, definition_md });
const fm = (latex, label) => ({ latex, label });
const sec = (heading, body_md, key_terms, formulas, visual, topics, visuals = []) => ({ heading, body_md, key_terms, formulas, visual, visuals, topic_ids: topics.map(T) });
const { ex1, ex2, ex3, ex4, ex6, ex7, ex8, ex9, ex10, ex11, ex12, ex13, ex14 } = EX;

export const notes = {
  unit: unit(),
  version: 1,
  title: 'Waves — Notes',
  language: 'en',
  sections: [
    sec(
      '1. Transverse and longitudinal waves; speed of a wave',
      r`- A **mechanical wave** is a disturbance that travels through a medium, carrying energy and momentum without carrying the medium along; each particle only oscillates about its mean position.
- In a **transverse** wave the particles move at right angles to the direction of travel (crests and troughs; strings, solids). In a **longitudinal** wave they move along it (compressions and rarefactions; solids, liquids, gases, e.g. sound in air). The wavelength $\lambda$ is the distance between neighbouring crests or compressions.
- The speed is set by the medium: on a stretched string $v = \sqrt{T/\mu}$ with $\mu = m/L$; in a solid rod $v = \sqrt{Y/\rho}$; in a fluid $v = \sqrt{B/\rho}$.
- **Sound in a gas.** Newton assumed isothermal changes, $B = P$, $v = \sqrt{P/\rho}$, giving about 280 m s$^{-1}$ for air at 0 °C. Laplace saw that the changes are adiabatic, $B = \gamma P$, $v = \sqrt{\gamma P/\rho}$ with $\gamma = 1.4$: about 331 m s$^{-1}$, as measured. For an ideal gas $v = \sqrt{\gamma R T/M} \propto \sqrt{T}$, and changing the pressure at constant temperature does not change $v$ (the density changes in proportion). Speed of sound in air at room temperature: about 340 m s$^{-1}$.
- Examples: a string of ${ex1.m * 1000} g and ${ex1.L} m at ${ex1.T} N has $\mu = ${ex1.mu}$ kg m$^{-1}$ and $v = ${dec(ex1.v, 4)}$ m s$^{-1}$. For air at 0 °C Newton gives $${dec(ex2.vN, 4)}$ and Laplace $${dec(ex2.vL, 4)}$ m s$^{-1}$. From $${ex3.v0}$ m s$^{-1}$ at 0 °C the speed at ${ex3.t1} °C is $${dec(ex3.v1, 4)}$ m s$^{-1}$.
- Not treated in this chapter: the effect of humidity on the speed of sound, and the Doppler effect.`,
      [kt('Mechanical wave', 'A disturbance that travels through a material medium by the elastic coupling of its particles; it carries energy but not matter.'), kt('Transverse wave', 'A wave in which particles oscillate at right angles to the direction of travel.'), kt('Longitudinal wave', 'A wave in which particles oscillate along the direction of travel, forming compressions and rarefactions.'), kt('Adiabatic change', 'A change so rapid that no heat flows in or out; sound in air is adiabatic (Laplace).')],
      [fm(r`v = \sqrt{T/\mu}`, 'Speed of a wave on a string'), fm(r`v = \sqrt{\gamma P/\rho} = \sqrt{\gamma R T/M}`, 'Speed of sound in a gas (Laplace)'), fm(r`\dfrac{v_2}{v_1} = \sqrt{\dfrac{T_2}{T_1}}`, 'Speed of sound and temperature')],
      V.types,
      [1],
      [plotStringV, plotSoundT, TABLES.TTYPES, TABLES.TSTRING, TABLES.TSOUND],
    ),
    sec(
      '2. The displacement relation for a progressive wave',
      r`- A wave moving along $+x$: $y(x,t) = a\sin(kx - \omega t + \phi)$; along $-x$: $y = a\sin(kx + \omega t + \phi)$. Here $a$ is the amplitude, $k = 2\pi/\lambda$ the angular wave number, $\omega = 2\pi f = 2\pi/T$ the angular frequency and $\phi$ the initial phase.
- A point of constant phase moves with speed $v = \omega/k = f\lambda$.
- The **particle velocity** is $\partial y/\partial t = -a\omega\cos(kx - \omega t + \phi)$, at most $a\omega$ and zero at crests and troughs; it is different from the wave speed.
- **Phase difference:** $\Delta\phi = k\,\Delta x = 2\pi\,\Delta x/\lambda$ for two points at one instant, and $\omega\,\Delta t$ for one point at two instants. Points a wavelength apart are in phase; half a wavelength apart, in opposite phase.
- Examples: $y = 0.0050\sin(8.0x - 2400t)$ has $\lambda = ${dec(ex4.lam, 4)}$ m, $f = ${dec(ex4.f, 4)}$ Hz, $v = ${ex4.v}$ m s$^{-1}$ along $+x$, and a maximum particle speed $a\omega = ${ex4.vmax}$ m s$^{-1}$. Points ${ex6.dx} m apart differ in phase by $${dec(ex6.dphi, 3)}$ rad. A ${ex7.f} Hz sound wave at ${ex7.v} m s$^{-1}$ has $k = ${dec(ex7.k, 4)}$ rad m$^{-1}$.`,
      [kt('Angular wave number', 'k = 2π/λ, the phase change per unit length along the wave.'), kt('Phase', 'The argument kx − ωt + φ of the sine; it fixes the stage of the oscillation.'), kt('Wave speed', 'The speed at which the wave pattern moves, v = ω/k = fλ.')],
      [fm(r`y = a\sin(kx - \omega t + \phi)`, 'Progressive wave along +x'), fm(r`v = \dfrac{\omega}{k} = f\lambda`, 'Wave speed'), fm(r`\Delta\phi = \dfrac{2\pi}{\lambda}\,\Delta x`, 'Phase difference for a path difference')],
      V.snap,
      [2],
      [V.pvel, TABLES.TSYM, TABLES.TPHASE],
    ),
    sec(
      '3. Superposition, reflection and standing waves',
      r`- **Principle of superposition:** where waves overlap, the resultant displacement is the sum of the individual displacements; the waves then pass on unchanged. Two waves of one frequency with amplitudes $a_1$, $a_2$ and phase difference $\phi$ give amplitude $\sqrt{a_1^2 + a_2^2 + 2a_1a_2\cos\phi}$ (from $a_1 + a_2$ in phase to $|a_1 - a_2|$ in opposite phase).
- **Reflection:** at a fixed end the reflected pulse is inverted (phase change $\pi$); at a free end it is not inverted. Speed and wavelength are unchanged.
- **Standing waves** (incident plus reflected wave): $y = 2a\sin(kx)\cos(\omega t)$. Nodes at $x = 0, \lambda/2, \lambda, \dots$; antinodes (amplitude $2a$) halfway between; spacing $\lambda/2$. No net energy flows.
- **String fixed at both ends:** nodes at both ends, $L = n\lambda/2$, $f_n = nv/2L = (n/2L)\sqrt{T/\mu}$ for $n = 1, 2, 3, \dots$ (fundamental or first harmonic, then higher harmonics); the nth mode has $n$ loops.
- **Open pipe:** antinodes at both ends, $f_n = nv/2L$, all harmonics. **Pipe closed at one end:** node at the closed end, antinode at the open end, $L = (2n - 1)\lambda/4$, $f_n = (2n-1)v/4L$: odd harmonics only, fundamental half that of an open pipe of equal length. End corrections are ignored.
- Examples: a ${ex9.L} m rope with $\mu = ${ex9.mu}$ kg m$^{-1}$ at ${ex9.T} N returns a pulse in $${dec(ex9.t, 3)}$ s. A guitar string (${ex10.L} m, ${ex10.T} N, ${ex10.mu * 1000} g m$^{-1}$) has $f_1 = ${dec(ex10.f[0], 4)}$ Hz. Two ${ex11.L} m pipes with $v = ${ex11.v}$ m s$^{-1}$: open $${ex11.open.map((f) => dec(f, 4)).join(', ')}$ Hz; closed $${ex11.closed.map((f) => dec(f, 4)).join(', ')}$ Hz. A closed pipe with $f_1 = ${ex12.f1}$ Hz is $${dec(ex12.L, 3)}$ m long. Amplitudes ${ex8.a1} mm and ${ex8.a2} mm at $90^\circ$ combine to $${dec(ex8.R, 3)}$ mm.`,
      [kt('Principle of superposition', 'The resultant displacement of overlapping waves is the sum of the displacements of the separate waves.'), kt('Node and antinode', 'A node is a point of a standing wave that never moves; an antinode is a point of maximum amplitude.'), kt('Fundamental and harmonics', 'The fundamental is the lowest normal mode; harmonics are modes of frequency n times the fundamental that the system supports.'), kt('Normal mode', 'A standing-wave pattern that fits the boundary conditions of a string or air column.')],
      [fm(r`y = 2a\sin(kx)\cos(\omega t)`, 'Standing wave'), fm(r`f_n = \dfrac{nv}{2L}`, 'String fixed at both ends, open pipe'), fm(r`f_n = \dfrac{(2n-1)v}{4L}`, 'Pipe closed at one end')],
      V.modes,
      [3],
      [V.reflect, V.pipes, plotSuper, plotStand, TABLES.TSUPER, TABLES.TSTAND, TABLES.TCOMPARE],
    ),
    sec(
      '4. Beats',
      r`- When two waves of nearly equal frequencies $f_1$ and $f_2$ and equal amplitude $a$ reach a point together, $y = 2a\cos\big(\pi(f_1 - f_2)t\big)\sin\big(\pi(f_1 + f_2)t\big)$: a note of the average frequency whose amplitude swells and fades between $2a$ and $0$.
- The loudness peaks $|f_1 - f_2|$ times each second: the **beat frequency** is $f_b = |f_1 - f_2|$; the time between swells is $1/f_b$. Beats are heard only when the frequencies differ by a few hertz.
- Tuning: loading a fork or tightening a string changes one frequency; whether $f_b$ rises or falls shows which frequency was higher.
- Examples: forks of ${ex13.f1} Hz and ${ex13.f2} Hz give $f_b = ${ex13.fb}$ Hz (a swell every ${ex13.Tb} s, pitch ${ex13.mean} Hz). Closed pipes of ${ex14.L1} m and ${ex14.L2} m, $v = ${ex14.v}$ m s$^{-1}$, give fundamentals $${dec(ex14.f1, 4)}$ and $${dec(ex14.f2, 4)}$ Hz and $f_b = ${dec(ex14.fb, 3)}$ Hz.`,
      [kt('Beats', 'The periodic swelling and fading of loudness when two notes of nearly equal frequency are sounded together.'), kt('Beat frequency', 'The number of loud swells per second, equal to the difference of the two frequencies.')],
      [fm(r`f_b = |f_1 - f_2|`, 'Beat frequency')],
      V.beats,
      [4],
      [TABLES.TBEAT],
    ),
  ],
  exam_tips_md: `- A wave's speed is fixed by the medium: v = √(T/μ) on a string, v = √(γP/ρ) = √(γRT/M) for sound in a gas (use kelvin; pressure alone does not matter).
- Read k and ω from y = a sin(kx − ωt + φ): λ = 2π/k, f = ω/2π, v = ω/k; the particle speed is up to aω.
- Phase difference: Δφ = kΔx = 2πΔx/λ = ωΔt.
- String and open pipe: f = nv/2L (all harmonics). Closed pipe: f = (2n − 1)v/4L (odd only). Say what is at each end.
- Fixed-end reflection inverts; free-end reflection does not.
- Beat frequency = |f₁ − f₂|; the pitch heard is the average.`,
  status: 'draft',
  provenance: PROV,
};

const fc = (n, front_md, back_md, tag, t) => ({ id: `f${String(n).padStart(2, '0')}`, front_md, back_md, tag, topic_id: T(t) });
export const flashcards = {
  unit: unit(),
  version: 1,
  language: 'en',
  cards: [
    fc(1, 'What is carried from place to place by a mechanical wave, and what is not?', 'Energy (and momentum) is carried; the particles of the medium only oscillate about their mean positions.', 'concept', 1),
    fc(2, 'How do particles move in a transverse wave?', 'At right angles to the direction in which the wave travels (crests and troughs).', 'concept', 1),
    fc(3, 'How do particles move in a longitudinal wave?', 'Along the direction of travel, forming compressions and rarefactions.', 'concept', 1),
    fc(4, 'Which of the two wave types can travel through the bulk of a gas?', 'Only longitudinal waves (a gas cannot resist shear).', 'concept', 1),
    fc(5, 'Speed of a wave on a stretched string?', '$v = \\sqrt{T/\\mu}$ with $\\mu$ the mass per unit length.', 'formula', 1),
    fc(6, 'If the tension of a string is made 9 times as large, what happens to the wave speed?', 'It becomes 3 times as large ($v \\propto \\sqrt{T}$).', 'concept', 1),
    fc(7, 'Speed of a longitudinal wave in a solid rod and in a fluid?', '$v = \\sqrt{Y/\\rho}$ and $v = \\sqrt{B/\\rho}$.', 'formula', 1),
    fc(8, 'What did Newton assume about sound in air, and what formula resulted?', 'Isothermal changes, so $B = P$ and $v = \\sqrt{P/\\rho}$ (about 280 m/s, too low).', 'concept', 1),
    fc(9, 'What did Laplace correct?', 'Sound changes in air are adiabatic, so $B = \\gamma P$ and $v = \\sqrt{\\gamma P/\\rho}$ (about 331 m/s at 0 °C).', 'concept', 1),
    fc(10, 'How does the speed of sound in air depend on temperature and on pressure alone?', '$v \\propto \\sqrt{T}$ (kelvin); a change of pressure at constant temperature does not change it.', 'concept', 1),
    fc(11, 'Write the equation of a sine wave travelling along $+x$.', '$y = a\\sin(kx - \\omega t + \\phi)$.', 'formula', 2),
    fc(12, 'Define the angular wave number k and the angular frequency ω.', '$k = 2\\pi/\\lambda$ (rad per metre) and $\\omega = 2\\pi f = 2\\pi/T$ (rad per second).', 'formula', 2),
    fc(13, 'Give two expressions for the wave speed.', '$v = \\omega/k = f\\lambda$.', 'formula', 2),
    fc(14, 'In $y = a\\sin(kx + \\omega t)$, which way does the wave travel?', 'Towards $-x$ (the signs of $kx$ and $\\omega t$ agree).', 'concept', 2),
    fc(15, 'What is the maximum speed of a particle of a wave of amplitude a and angular frequency ω?', '$a\\omega$, reached at the rest position; zero at a crest or trough.', 'formula', 2),
    fc(16, 'What is the phase difference between two points a distance Δx apart?', '$\\Delta\\phi = k\\,\\Delta x = 2\\pi\\,\\Delta x/\\lambda$.', 'formula', 2),
    fc(17, 'What phase difference corresponds to half a wavelength?', '$\\pi$ radians: the particles move in opposite directions.', 'fact', 2),
    fc(18, 'The phase difference between two instants Δt apart at one point?', '$\\Delta\\phi = \\omega\\,\\Delta t$.', 'formula', 2),
    fc(19, 'State the principle of superposition.', 'At any point the resultant displacement of overlapping waves is the sum of the displacements of the separate waves.', 'concept', 3),
    fc(20, 'Resultant amplitude of two waves of one frequency with amplitudes a₁, a₂ and phase difference φ?', '$\\sqrt{a_1^2 + a_2^2 + 2a_1a_2\\cos\\phi}$.', 'formula', 3),
    fc(21, 'What happens to a pulse reflected at a fixed end and at a free end?', 'Fixed end: inverted (phase change π). Free end: not inverted.', 'concept', 3),
    fc(22, 'Write the standing wave formed by two equal waves moving in opposite directions.', '$y = 2a\\sin(kx)\\cos(\\omega t)$.', 'formula', 3),
    fc(23, 'How far apart are neighbouring nodes of a standing wave?', 'Half a wavelength, λ/2.', 'fact', 3),
    fc(24, 'Frequencies of a string of length L fixed at both ends?', '$f_n = nv/2L = (n/2L)\\sqrt{T/\\mu}$, $n = 1, 2, 3, \\dots$', 'formula', 3),
    fc(25, 'Frequencies of an open organ pipe, and of a pipe closed at one end?', 'Open: $f_n = nv/2L$ (all harmonics). Closed: $f_n = (2n-1)v/4L$ (odd harmonics only).', 'formula', 3),
    fc(26, 'What is at the open and at the closed end of a pipe?', 'A displacement antinode at an open end and a node at a closed end.', 'concept', 3),
    fc(27, 'A closed pipe and an open pipe have equal lengths. Compare their fundamentals.', 'The closed pipe\'s fundamental is half the open pipe\'s (it sounds an octave lower).', 'concept', 3),
    fc(28, 'What are beats?', 'Periodic swells in loudness when two notes of nearly equal frequency are sounded together.', 'concept', 4),
    fc(29, 'Beat frequency of two notes of frequencies f₁ and f₂?', '$f_b = |f_1 - f_2|$.', 'formula', 4),
    fc(30, 'Exam tip: what pitch is heard during beats?', 'The average frequency $(f_1 + f_2)/2$, with the loudness varying at $f_b$.', 'exam-tip', 4),
  ],
  status: 'draft',
  provenance: PROV,
};
