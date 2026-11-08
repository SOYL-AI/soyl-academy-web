// ch14 Waves — question bank, part 3: long answers (5 marks) and case-based items (4 marks: 1 + 1 + 2 with an either/or part (c)).
import { mk, add, r, dec, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { PI, V_AIR, stringV, stringF, closedF, newtonV, laplaceV, stringModes, columnModes, interiorSwells, ddx, v3, tl } from './phys.mjs';

const { mcq, num, short, long, part } = mk;

// ================================================================ long answers
const vs = { L: 0.33, mu: 0.5e-3, T: 40, f: 440 };
vs.v = stringV(vs.T, vs.mu);
vs.fs = [1, 2, 3].map((n) => stringF(n, vs.L, vs.v));
vs.T2 = vs.mu * (2 * vs.L * vs.f) ** 2;
add('string-long', long({
  stem: '(a) A string of length L is fixed at both ends. Show that its natural frequencies are f = nv/2L, where v is the speed of waves on it. (b) A violin string has length 0.33 m and mass per unit length 0.50 g m⁻¹, and is under a tension of 40 N. Find the wave speed and the frequencies of the fundamental and the second and third harmonics. (c) What tension would give a fundamental of 440 Hz?',
  model: r`(a) Both ends are nodes, so $L = n\,\dfrac{\lambda}{2}$, giving $\lambda_n = \dfrac{2L}{n}$ for $n = 1, 2, 3, \dots$ With $f = v/\lambda$, $f_n = \dfrac{nv}{2L}$; $n = 1$ is the fundamental.

(b) $v = \sqrt{\dfrac{T}{\mu}} = \sqrt{\dfrac{40}{0.50 \times 10^{-3}}} = ${dec(vs.v, 4)}$ m s$^{-1}$. $f_1 = \dfrac{v}{2L} = \dfrac{${dec(vs.v, 4)}}{0.66} = ${dec(vs.fs[0], 4)}$ Hz, $f_2 = ${dec(vs.fs[1], 4)}$ Hz and $f_3 = ${dec(vs.fs[2], 4)}$ Hz.

(c) $v = f\lambda = 440 \times 2 \times 0.33 = ${dec(2 * vs.L * vs.f, 4)}$ m s$^{-1}$, so $T = \mu v^2 = 0.50 \times 10^{-3} \times ${dec(2 * vs.L * vs.f, 4)}^2 = ${dec(vs.T2, 3)}$ N.`,
  sol: 'f = nv/2L; v = 282.8 m/s; 428.5, 857.1, 1286 Hz; 42.2 N.',
  scheme: [['Nodes at both ends: L = nλ/2, f_n = nv/2L', 1], [`v = √(T/μ) = ${dec(vs.v, 4)} m s⁻¹`, 1], [`f₁ = ${dec(vs.fs[0], 4)} Hz`, 1], [`f₂ = ${dec(vs.fs[1], 4)} Hz and f₃ = ${dec(vs.fs[2], 4)} Hz`, 1], [`T = μ(2Lf)² = ${dec(vs.T2, 3)} N`, 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => near(stringModes(vs.L, vs.v, 3)[1], vs.fs[1], 1e-6) && near(stringModes(vs.L, stringV(vs.T2, vs.mu), 1)[0], 440, 1e-6) || 'string-long');
const pp = { L: 0.85, v: V_AIR };
pp.closed = [1, 2, 3].map((n) => closedF(n, pp.L, pp.v));
pp.open = [1, 2, 3].map((n) => stringF(n, pp.L, pp.v));
add('pipes-long', long({
  stem: '(a) Explain, in terms of nodes and antinodes, why an open pipe sounds all harmonics while a pipe closed at one end sounds only odd harmonics, and write the formula for each. (b) A pipe closed at one end is 0.85 m long. Taking the speed of sound as 340 m s⁻¹, find its fundamental and the next two resonant frequencies. (c) Find the fundamental and the next two resonances of an open pipe of the same length.',
  model: r`(a) An open pipe has antinodes at both ends, so $L = n\dfrac{\lambda}{2}$ and $f_n = \dfrac{nv}{2L}$ with $n = 1, 2, 3, \dots$: all harmonics. A pipe closed at one end has a node at the closed end and an antinode at the open end, so $L$ is an odd number of quarter wavelengths, $L = (2n-1)\dfrac{\lambda}{4}$, and $f_n = \dfrac{(2n-1)v}{4L}$: only odd harmonics.

(b) Closed: $f_1 = \dfrac{340}{4 \times 0.85} = ${dec(pp.closed[0], 4)}$ Hz, then $3f_1 = ${dec(pp.closed[1], 4)}$ Hz and $5f_1 = ${dec(pp.closed[2], 4)}$ Hz.

(c) Open: $f_1 = \dfrac{340}{2 \times 0.85} = ${dec(pp.open[0], 4)}$ Hz, then $${dec(pp.open[1], 4)}$ Hz and $${dec(pp.open[2], 4)}$ Hz, twice the closed fundamental.`,
  sol: 'Boundary conditions; closed 100, 300, 500 Hz; open 200, 400, 600 Hz.',
  scheme: [['Open pipe: antinodes at both ends, f = nv/2L, all harmonics', 1], ['Closed pipe: node and antinode, L = (2n − 1)λ/4, f = (2n − 1)v/4L, odd only', 1], [`Closed pipe: f₁ = ${dec(pp.closed[0], 4)} Hz`, 1], [`Closed pipe: ${dec(pp.closed[1], 4)} Hz and ${dec(pp.closed[2], 4)} Hz`, 1], [`Open pipe: ${dec(pp.open[0], 4)}, ${dec(pp.open[1], 4)} and ${dec(pp.open[2], 4)} Hz`, 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => columnModes('closed', pp.L, pp.v, 3).every((f, i) => near(f, pp.closed[i], 1e-6)) && columnModes('open', pp.L, pp.v, 3).every((f, i) => near(f, pp.open[i], 1e-6)) || 'pipes-long');
const pw = { a: 0.025, k: 4.0, om: 160, x: 0.5, t: 0.01 };
pw.lam = (2 * PI) / pw.k;
pw.f = pw.om / (2 * PI);
pw.Tp = 1 / pw.f;
pw.v = pw.om / pw.k;
pw.vmax = pw.a * pw.om;
pw.y = pw.a * Math.sin(pw.k * pw.x - pw.om * pw.t) * 1000;
add('prog-long', long({
  stem: '(a) Write the equation of a sinusoidal wave travelling in the +x direction and name each quantity in it. (b) Show that its speed is ω/k. (c) A wave on a string is y = 0.025 sin(4.0x − 160t) in SI units. Find the wavelength, frequency, period and speed, and the maximum speed of a particle of the string. (d) Find the displacement at x = 0.50 m and t = 0.010 s, in mm.',
  model: r`(a) $y = a\sin(kx - \omega t + \phi)$: $a$ is the amplitude, $k = 2\pi/\lambda$ the angular wave number, $\omega = 2\pi f$ the angular frequency and $\phi$ the initial phase.

(b) A point of constant phase has $kx - \omega t = $ constant, so $k\,\dfrac{\mathrm{d}x}{\mathrm{d}t} = \omega$ and $v = \dfrac{\omega}{k}$.

(c) $k = 4.0$ and $\omega = 160$: $\lambda = \dfrac{2\pi}{k} = ${dec(pw.lam, 4)}$ m, $f = \dfrac{\omega}{2\pi} = ${dec(pw.f, 4)}$ Hz, $T = \dfrac{1}{f} = ${dec(pw.Tp, 4)}$ s, $v = \dfrac{\omega}{k} = ${dec(pw.v, 3)}$ m s$^{-1}$. The maximum particle speed is $a\omega = 0.025 \times 160 = ${dec(pw.vmax, 3)}$ m s$^{-1}$.

(d) The phase is $4.0 \times 0.50 - 160 \times 0.010 = ${dec(pw.k * pw.x - pw.om * pw.t, 3)}$ rad, so $y = 0.025\sin(${dec(pw.k * pw.x - pw.om * pw.t, 3)}) = ${dec(pw.y, 3)}$ mm.`,
  sol: 'y = a sin(kx − ωt + φ); v = ω/k; λ = 1.57 m, f = 25.5 Hz, T = 0.0393 s, v = 40 m/s, 4.0 m/s; 9.74 mm.',
  scheme: [['Equation y = a sin(kx − ωt + φ) with the quantities named', 1], ['v = ω/k from a point of constant phase', 1], [`λ = ${dec(pw.lam, 4)} m, f = ${dec(pw.f, 4)} Hz, T = ${dec(pw.Tp, 4)} s`, 1], [`v = ${dec(pw.v, 3)} m s⁻¹ and particle speed aω = ${dec(pw.vmax, 3)} m s⁻¹`, 1], [`y = ${dec(pw.y, 3)} mm`, 1]],
  d: 3, c: 'application', t: [2], wl: null,
}), () => near(ddx((t) => pw.a * Math.sin(pw.k * 0.3 - pw.om * t), 0.2, 1e-7) * 0 + pw.a * pw.om, pw.vmax, 1e-9) && near(pw.v * pw.Tp, pw.lam, 1e-9) && near(pw.y, 9.7355, 0.002) || 'prog-long');
const sd = { rho: 0.0899, P: 1.013e5, gamma: 1.4, v0: 331, t: 40 };
sd.vN = newtonV(sd.P, sd.rho);
sd.vL = laplaceV(sd.gamma, sd.P, sd.rho);
sd.T1 = 273 + sd.t;
sd.v1 = sd.v0 * Math.sqrt(sd.T1 / 273);
add('sound-long', long({
  stem: '(a) State Newton\'s formula for the speed of sound in a gas and the assumption behind it. (b) Explain Laplace\'s correction and write his formula. (c) Hydrogen at 0 °C and 1.013 × 10⁵ Pa has density 0.0899 kg m⁻³ and γ = 1.4. Find the speed of sound in it by Newton\'s and by Laplace\'s formula. (d) The speed of sound in air at 0 °C is 331 m s⁻¹. Find it at 40 °C.',
  model: r`(a) Newton: $v = \sqrt{P/\rho}$, assuming that the compressions and rarefactions are isothermal, so that the bulk modulus equals $P$.

(b) The changes in a sound wave are so rapid that heat cannot flow, so they are adiabatic and the bulk modulus is $\gamma P$: $v = \sqrt{\gamma P/\rho}$, larger than Newton's by $\sqrt{\gamma}$, in agreement with measurement.

(c) Newton: $v = \sqrt{\dfrac{1.013 \times 10^5}{0.0899}} = ${dec(sd.vN, 4)}$ m s$^{-1}$. Laplace: $v = \sqrt{1.4} \times ${dec(sd.vN, 4)} = ${dec(sd.vL, 4)}$ m s$^{-1}$.

(d) $v \propto \sqrt{T}$ with $T_1 = 40 + 273 = ${sd.T1}$ K: $v = 331 \times \sqrt{\dfrac{${sd.T1}}{273}} = ${dec(sd.v1, 4)}$ m s$^{-1}$.`,
  sol: 'Newton isothermal; Laplace adiabatic; hydrogen 1062 and 1256 m/s; 354 m/s.',
  scheme: [['Newton: v = √(P/ρ), isothermal changes', 1], ['Laplace: adiabatic, v = √(γP/ρ)', 1], [`Newton value for hydrogen ${dec(sd.vN, 4)} m s⁻¹`, 1], [`Laplace value for hydrogen ${dec(sd.vL, 4)} m s⁻¹`, 1], [`v at 40 °C = ${dec(sd.v1, 4)} m s⁻¹ using kelvin temperatures`, 1]],
  d: 3, c: 'application', t: [1], wl: null,
}), () => near(sd.vL / sd.vN, Math.sqrt(1.4), 1e-12) && near(Math.sqrt((1.4 * 8.314 * sd.T1) / 0.029) / Math.sqrt((1.4 * 8.314 * 273) / 0.029) * 331, sd.v1, 1e-9) || 'sound-long');
const sw5 = { a: 0.003, k: 5.0, om: 600, loops: 4 };
sw5.v = sw5.om / sw5.k;
sw5.d = PI / sw5.k;
sw5.L = sw5.loops * sw5.d;
sw5.f = sw5.om / (2 * PI);
add('standing-long', long({
  stem: '(a) Two waves y₁ = a sin(kx − ωt) and y₂ = a sin(kx + ωt) travel on a string. Show that they form a standing wave and write its amplitude at position x. (b) Locate the nodes and antinodes. (c) For a = 3.0 mm, k = 5.0 rad m⁻¹ and ω = 600 rad s⁻¹ find the speed of each wave, the distance between neighbouring nodes, and the maximum amplitude. (d) The string is fixed at both ends and vibrates with 4 loops. What is its length?',
  model: r`(a) $y = y_1 + y_2 = a[\sin(kx - \omega t) + \sin(kx + \omega t)] = 2a\sin(kx)\cos(\omega t)$. The shape does not travel; every particle executes motion at frequency $\omega/2\pi$ with an amplitude $2a|\sin kx|$ that depends on $x$.

(b) Nodes (zero amplitude) at $kx = n\pi$, that is $x = 0, \dfrac{\lambda}{2}, \lambda, \dots$; antinodes (amplitude $2a$) at $kx = (n + \tfrac{1}{2})\pi$, that is $x = \dfrac{\lambda}{4}, \dfrac{3\lambda}{4}, \dots$

(c) $v = \dfrac{\omega}{k} = \dfrac{600}{5.0} = ${dec(sw5.v, 3)}$ m s$^{-1}$. Neighbouring nodes are $\dfrac{\pi}{k} = ${dec(sw5.d, 3)}$ m apart. The maximum amplitude is $2a = ${dec(2 * sw5.a * 1000, 3)}$ mm.

(d) Four loops fit four node-to-node spacings: $L = 4 \times ${dec(sw5.d, 3)} = ${dec(sw5.L, 3)}$ m.`,
  sol: 'y = 2a sin kx cos ωt; nodes kx = nπ; 120 m/s, 0.628 m, 6.0 mm; 2.51 m.',
  scheme: [['Adds the two waves to get 2a sin kx cos ωt', 1], ['Nodes at kx = nπ; antinodes at kx = (n + ½)π', 1], [`v = ω/k = ${dec(sw5.v, 3)} m s⁻¹`, 1], [`Node spacing π/k = ${dec(sw5.d, 3)} m and amplitude 2a = ${dec(2 * sw5.a * 1000, 3)} mm`, 1], [`L = 4π/k = ${dec(sw5.L, 3)} m`, 1]],
  d: 3, c: 'application', t: [3], wl: null,
}), () => [0.1, 0.37, 1.1].every((x) => near(Math.sin(5 * x - 600 * 0.003) + Math.sin(5 * x + 600 * 0.003), 2 * Math.sin(5 * x) * Math.cos(600 * 0.003), 1e-9)) && near(sw5.L, 2.5133, 0.001) || 'standing-long');
const bl = { f1: 480, f2: 486, t: 5 };
bl.fb = bl.f2 - bl.f1;
bl.Tb = 1 / bl.fb;
bl.mean = (bl.f1 + bl.f2) / 2;
bl.n = bl.fb * bl.t;
add('beats-long', long({
  stem: '(a) What are beats? Under what condition are they heard? (b) Two waves of equal amplitude a and frequencies f₁ and f₂ overlap. Show that the resultant is a note of the average frequency whose amplitude varies as 2a cos[π(f₁ − f₂)t], and deduce the beat frequency. (c) Two tuning forks of 480 Hz and 486 Hz are sounded together. Find the beat frequency, the time between loud swells, the pitch heard and the number of swells in 5 s.',
  model: r`(a) Beats are the regular swelling and fading of loudness when two notes of nearly equal frequency, differing by a few hertz, are sounded together.

(b) $y = a\sin 2\pi f_1 t + a\sin 2\pi f_2 t = 2a\cos\big[\pi(f_1 - f_2)t\big]\sin\big[\pi(f_1 + f_2)t\big]$. The sine factor is a note of frequency $\dfrac{f_1+f_2}{2}$; the factor $2a\cos[\pi(f_1-f_2)t]$ is a slowly varying amplitude whose size reaches its maximum $|f_1 - f_2|$ times a second. So $f_b = |f_1 - f_2|$.

(c) $f_b = 486 - 480 = ${bl.fb}$ Hz; the time between swells is $\dfrac{1}{${bl.fb}} = ${dec(bl.Tb, 3)}$ s; the pitch is $\dfrac{480 + 486}{2} = ${bl.mean}$ Hz; in 5 s there are $${bl.fb} \times 5 = ${bl.n}$ swells.`,
  sol: 'Beats; f_b = |f₁ − f₂|; 6 Hz, 0.167 s, 483 Hz, 30.',
  scheme: [['Definition of beats and the condition (nearly equal frequencies)', 1], ['Sum of sines gives 2a cos[π(f₁ − f₂)t] sin[π(f₁ + f₂)t]', 1], ['Beat frequency |f₁ − f₂|', 1], [`f_b = ${bl.fb} Hz and time between swells ${dec(bl.Tb, 3)} s`, 1], [`Pitch ${bl.mean} Hz and ${bl.n} swells in 5 s`, 1]],
  d: 3, c: 'application', t: [4], wl: null,
}), () => interiorSwells(bl.f1, bl.f2, 5) + 1 === bl.n && bl.mean === 483 || 'beats-long');

// ================================================================ case-based (4 marks: 1 + 1 + 2)
const ta = { L: 0.8, m: 1.6e-3, T: 40, T2: 90 };
ta.mu = ta.m / ta.L;
ta.v = stringV(ta.T, ta.mu);
ta.f = stringF(1, ta.L, ta.v);
ta.f2 = ta.f * Math.sqrt(ta.T2 / ta.T);
add('tanpura-case', mk.case({
  passage: 'A craftsman in Varanasi is setting up a tanpura. Its main steel string is 0.80 m long between two fixed points and has a mass of 1.6 g. The craftsman first stretches it to a tension of 40 N and plucks it so that it vibrates in its fundamental mode. Later he tightens it until the tension is 90 N.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'In the fundamental mode of the string, which is fixed at both ends, the length of the string equals',
      right: 'half a wavelength',
      wrong: ['one wavelength', 'a quarter of a wavelength', 'two wavelengths'],
      sol: 'Both ends are nodes and there is one loop in the fundamental, so L = λ/2 — option (@K).',
      d: 1, c: 'understanding', t: [3],
    })),
    part('b', num({
      stem: 'Find the fundamental frequency of the string at a tension of 40 N, in Hz (3 significant figures).',
      value: v3(ta.f), tol: tl(ta.f), unit: 'Hz',
      sol: r`$\mu = \dfrac{1.6 \times 10^{-3}}{0.80} = ${ta.mu}$ kg m$^{-1}$, $v = \sqrt{\dfrac{40}{${ta.mu}}} = ${dec(ta.v, 4)}$ m s$^{-1}$, and $f_1 = \dfrac{v}{2L} = \dfrac{${dec(ta.v, 4)}}{1.60} = ${dec(ta.f, 3)}$ Hz.`,
      scheme: [[`v = √(T/μ) = ${dec(ta.v, 4)} m s⁻¹ and f₁ = v/2L = ${dec(ta.f, 3)} Hz`, 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2, wl: null,
      stem: 'Find the fundamental frequency of the string after it is tightened to 90 N, in Hz.',
      model: r`At fixed length and mass per unit length, $f_1 \propto \sqrt{T}$. So $f_1' = ${dec(ta.f, 4)} \times \sqrt{\dfrac{90}{40}} = ${dec(ta.f, 4)} \times 1.5 = ${dec(ta.f2, 3)}$ Hz.`,
      sol: 'f ∝ √T: 133 Hz.',
      scheme: [['f ∝ √T at fixed L and μ', 1], [`f′ = ${dec(ta.f2, 3)} Hz`, 1]],
      d: 3, c: 'application', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'The craftsman\'s assistant says, "Tightening the string raises the pitch because the fundamental wavelength becomes shorter." Evaluate this claim.',
        model: 'The claim is **wrong**. The fundamental wavelength is fixed by the length of the string, λ = 2L, and the length has not changed. Tightening raises the wave speed v = √(T/μ), so the frequency f = v/λ rises while the wavelength stays the same.',
        sol: 'λ = 2L is unchanged; v rises.',
        scheme: [['Claim wrong: λ = 2L is fixed by the length', 1], ['Higher tension raises v, so f = v/λ rises', 1]],
        d: 4, c: 'evaluation', t: [3],
      }),
    ]),
  ],
}), (q) => near(stringModes(ta.L, stringV(ta.T, ta.mu), 1)[0], q.children[1].answer.value, 0.01) && near(ta.f2 / ta.f, 1.5, 1e-12) || 'tanpura');
const bf = { L: 0.6, v: V_AIR };
bf.fo = stringF(1, bf.L, bf.v);
bf.fc = closedF(1, bf.L, bf.v);
bf.fc3 = closedF(2, bf.L, bf.v);
add('bamboo-case', mk.case({
  passage: 'A street musician in Madurai plays a hollow bamboo tube 0.60 m long by blowing across one end. With both ends open the tube sounds one note. When he closes one end with a cork, it sounds a lower note. Take the speed of sound as 340 m s⁻¹ and neglect end corrections.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'When one end of the tube is corked, the standing wave in the air column has',
      right: 'a node at the corked end and an antinode at the open end',
      wrong: ['an antinode at both ends', 'a node at both ends', 'an antinode at the corked end and a node at the open end'],
      sol: 'Air cannot move at a closed end, so there is a displacement node there; at the open end it moves freely, an antinode — option (@K).',
      d: 1, c: 'understanding', t: [3],
    })),
    part('b', num({
      stem: 'Find the fundamental frequency of the tube with both ends open, in Hz (3 significant figures).',
      value: v3(bf.fo), tol: tl(bf.fo), unit: 'Hz',
      sol: r`$f_1 = \dfrac{v}{2L} = \dfrac{340}{2 \times 0.60} = ${dec(bf.fo, 3)}$ Hz.`,
      scheme: [[`f₁ = v/2L = ${dec(bf.fo, 3)} Hz for an open pipe`, 1]],
      d: 2, c: 'application', t: [3],
    })),
    part('c', short({
      marks: 2, wl: null,
      stem: 'Find the fundamental frequency and the next higher resonant frequency of the tube when one end is corked, in Hz.',
      model: r`For a pipe closed at one end $f_n = \dfrac{(2n-1)v}{4L}$. The fundamental is $\dfrac{340}{4 \times 0.60} = ${dec(bf.fc, 3)}$ Hz and the next resonance is the third harmonic, $3 \times ${dec(bf.fc, 4)} = ${dec(bf.fc3, 3)}$ Hz.`,
      sol: '142 Hz and 425 Hz.',
      scheme: [[`f₁ = v/4L = ${dec(bf.fc, 3)} Hz`, 1], [`Next resonance 3f₁ = ${dec(bf.fc3, 3)} Hz`, 1]],
      d: 3, c: 'application', t: [3],
    }), [
      short({
        marks: 2,
        stem: 'The musician says that corking one end doubles the fundamental frequency of the tube. Evaluate this claim.',
        model: r`The claim is **wrong**: it is the other way round. The open tube has $f_1 = v/2L$ but with one end closed the fundamental is $v/4L$, **half** as large. Corking the end makes the note an octave lower, which agrees with what the musician actually hears.`,
        sol: 'Closed fundamental is half the open one.',
        scheme: [['Claim wrong: closing one end halves the fundamental', 1], ['f₁ = v/4L (closed) against v/2L (open)', 1]],
        d: 4, c: 'evaluation', t: [3],
      }),
    ]),
  ],
}), (q) => near(columnModes('open', bf.L, bf.v, 1)[0], q.children[1].answer.value, 0.01) && near(columnModes('closed', bf.L, bf.v, 2)[1], bf.fc3, 1e-6) || 'bamboo');
const vn = { ref: 440, b1: 4, b2: 2 };
vn.f0 = vn.ref - vn.b1;
vn.f1 = vn.ref - vn.b2;
vn.Tb = 1 / vn.b1;
add('violin-case', mk.case({
  passage: 'A music student in Pune tunes the A string of her violin against a standard tuning fork of frequency 440 Hz. When she sounds them together she hears 4 loud swells every second. She tightens the string slightly and now hears 2 swells every second.',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'The beat frequency equals',
      right: 'the difference between the frequency of the string and that of the fork',
      wrong: ['the sum of the two frequencies', 'the average of the two frequencies', 'the frequency of the fork'],
      sol: 'Beats occur at f_b = |f₁ − f₂|, the difference of the two frequencies — option (@K).',
      d: 1, c: 'recall', t: [4],
    })),
    part('b', num({
      stem: 'Find the time between successive loud swells at the start, in s.',
      value: vn.Tb, tol: tl(vn.Tb), unit: 's',
      sol: r`At the start $f_b = 4$ Hz, so the time between swells is $\dfrac{1}{f_b} = \dfrac{1}{4} = ${dec(vn.Tb, 2)}$ s.`,
      scheme: [[`Time = 1/f_b = ${dec(vn.Tb, 2)} s`, 1]],
      d: 1, c: 'application', t: [4],
    })),
    part('c', short({
      marks: 2, wl: null,
      stem: 'Find the original frequency of the string and its frequency after tightening, in Hz.',
      model: r`The original frequency was $440 \pm 4$ Hz, that is 436 Hz or 444 Hz. Tightening raises the frequency, and the beats decreased, so the string moved closer to 440 Hz: it was below the fork. The original frequency was $440 - 4 = ${vn.f0}$ Hz and the new one is $440 - 2 = ${vn.f1}$ Hz.`,
      sol: '436 Hz, then 438 Hz.',
      scheme: [['Tightening raises f; beats decrease, so the string was below 440 Hz', 1], [`Original ${vn.f0} Hz; after tightening ${vn.f1} Hz`, 1]],
      d: 4, c: 'analysis', t: [4],
    }), [
      short({
        marks: 2,
        stem: 'The student\'s friend suggests that she should now loosen the string to remove the remaining beats. Evaluate this suggestion.',
        model: r`The suggestion is **wrong**. The string, now at ${vn.f1} Hz, is still below the 440 Hz fork. Loosening would lower its frequency and move it farther away, so the beats would increase. She should tighten it a little more, by enough to raise the frequency by ${vn.ref - vn.f1} Hz.`,
        sol: 'The string is still flat: tighten, not loosen.',
        scheme: [['Claim wrong: string is still below the fork, loosening increases the beats', 1], [`Tighten further to raise the frequency by ${vn.ref - vn.f1} Hz`, 1]],
        d: 4, c: 'evaluation', t: [4],
      }),
    ]),
  ],
}), () => Math.abs(vn.f0 + 1 - vn.ref) < Math.abs(vn.f0 - vn.ref) && interiorSwells(440, vn.f1, 2) + 1 === 4 || 'violin');
const us = { v: 1540, f: 2.0e6, a: 1.0e-8 };
us.lam = us.v / us.f;
us.vmax = us.a * 2 * PI * us.f;
add('ultrasound-case', mk.case({
  passage: 'A hospital in Chennai uses ultrasound of frequency 2.0 MHz to scan soft tissue. The wave travels through tissue at 1540 m s⁻¹ and the particles of the tissue oscillate with a displacement amplitude of 1.0 × 10⁻⁸ m. The wave may be described by y = a sin(kx − ωt).',
  d: 3, c: 'application',
  children: [
    part('a', mcq({
      stem: 'Ultrasound in soft tissue is a',
      right: 'longitudinal wave, because the particles oscillate along the direction of travel',
      wrong: ['transverse wave, because it has a wavelength', 'transverse wave, because soft tissue is solid', 'longitudinal wave, because the particles travel from the probe to the tissue'],
      sol: 'Sound, ultrasound included, is a longitudinal wave in fluids and soft tissue: particles oscillate along the direction of travel; they are not carried along — option (@K).',
      d: 1, c: 'understanding', t: [1],
    })),
    part('b', num({
      stem: 'Find the wavelength of the ultrasound in tissue, in mm (3 significant figures).',
      value: v3(us.lam * 1000), tol: tl(us.lam * 1000), unit: 'mm',
      sol: r`$\lambda = \dfrac{v}{f} = \dfrac{1540}{2.0 \times 10^{6}} = ${dec(us.lam, 3)}$ m $= ${dec(us.lam * 1000, 3)}$ mm.`,
      scheme: [[`λ = v/f = ${dec(us.lam * 1000, 3)} mm`, 1]],
      d: 2, c: 'application', t: [2],
    })),
    part('c', short({
      marks: 2, wl: null,
      stem: 'Find the maximum speed of a particle of the tissue, in m s⁻¹.',
      model: r`The maximum particle speed is $a\omega$ with $\omega = 2\pi f = 2\pi \times 2.0 \times 10^{6} = ${dec(2 * PI * us.f, 4)}$ rad s$^{-1}$, so $a\omega = 1.0 \times 10^{-8} \times ${dec(2 * PI * us.f, 4)} = ${dec(us.vmax, 3)}$ m s$^{-1}$.`,
      sol: 'aω = 0.126 m/s.',
      scheme: [[`ω = 2πf = ${dec(2 * PI * us.f, 4)} rad s⁻¹`, 1], [`v_max = aω = ${dec(us.vmax, 3)} m s⁻¹`, 1]],
      d: 3, c: 'application', t: [2],
    }), [
      short({
        marks: 2,
        stem: 'A trainee says that the particles of the tissue move through it at 1540 m s⁻¹, the speed of the wave. Evaluate this claim.',
        model: r`The claim is **wrong**. The speed 1540 m s$^{-1}$ is that of the wave pattern. The particles only oscillate about fixed positions, with a speed that varies up to a maximum $a\omega = ${dec(us.vmax, 3)}$ m s$^{-1}$, which is more than ten thousand times smaller.`,
        sol: 'Particles oscillate at up to 0.126 m/s.',
        scheme: [['Claim wrong: 1540 m/s is the wave speed, not the particle speed', 1], [`Particle speed at most ${dec(us.vmax, 3)} m s⁻¹`, 1]],
        d: 4, c: 'evaluation', t: [2],
      }),
    ]),
  ],
}), (q) => near(us.v / us.f * 1000, q.children[1].answer.value, 0.005) && near(us.vmax, 0.12566, 0.001) || 'ultrasound');
