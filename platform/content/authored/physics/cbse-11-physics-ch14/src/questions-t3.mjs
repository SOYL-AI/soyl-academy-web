// ch14 Waves — question bank, part 2: t03 (superposition, reflection, standing waves, pipes) and t04 (beats).
import { mk, add, r, dec, near } from '../../cbse-11-physics-ch01/src/lib.mjs';
import { PI, V_AIR, closedF, stringF, stringV, columnModes, stringModes, interiorSwells, v3, tl } from './phys.mjs';

const { mcq, ar, tf, fill, num, short } = mk;

// ================================================================ t03 superposition, reflection, standing waves
add('super-mcq', mcq({
  stem: 'Two pulses on a rope overlap at one point. Alone, one pulse would displace that point 3.0 cm upward and the other 5.0 cm downward. At that instant the displacement of the point is',
  right: '2.0 cm downward',
  wrong: ['8.0 cm upward', '2.0 cm upward', '4.0 cm downward'],
  sol: 'By the principle of superposition the displacements add as signed quantities: +3.0 + (−5.0) = −2.0 cm, that is 2.0 cm downward — option (@K).',
  d: 1, c: 'application', t: [3],
}), () => 3 - 5 === -2 || 'super');
add('fixed-mcq', mcq({
  stem: 'A transverse pulse travelling along a string reaches the end where the string is clamped to a wall. The reflected pulse',
  right: 'is inverted, because the clamped end cannot move',
  wrong: ['has the same shape and the same way up, because the speed does not change', 'is inverted and also travels more slowly than the incident pulse', 'does not appear, because the wall absorbs the energy of the pulse'],
  sol: 'The displacement at a fixed end must remain zero at all times, which needs a reflected pulse of opposite sign (a phase change of π). Speed and shape are unchanged — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
const cf = { f1: 150, v: V_AIR };
add('closedodd-mcq', mcq({
  stem: 'A pipe closed at one end has a fundamental frequency of 150 Hz. Which of the following frequencies cannot be sounded by this pipe?',
  right: '300 Hz',
  wrong: ['450 Hz', '750 Hz', '1050 Hz'],
  sol: 'A pipe closed at one end sounds only odd multiples of its fundamental: 150, 450, 750, 1050 Hz and so on. 300 Hz is twice the fundamental, an even harmonic — option (@K).',
  d: 2, c: 'application', t: [3],
}), () => [450, 750, 1050].every((f) => Number.isInteger(f / cf.f1) && (f / cf.f1) % 2 === 1) && (300 / cf.f1) % 2 === 0 || 'closedodd');
add('openclosed-mcq', mcq({
  stem: 'An open pipe and a pipe closed at one end have the same length. The ratio of the fundamental frequency of the open pipe to that of the closed pipe is',
  right: '2 : 1',
  wrong: ['1 : 2', '1 : 1', '4 : 1'],
  sol: r`Open: $f_1 = v/2L$. Closed: $f_1 = v/4L$. The ratio is $\dfrac{v/2L}{v/4L} = 2$, so 2 : 1 — option (@K).`,
  d: 2, c: 'application', t: [3],
}), () => near(columnModes('open', 1, 1, 1)[0] / columnModes('closed', 1, 1, 1)[0], 2, 1e-6) || 'openclosed');
add('tuning-mcq', mcq({
  stem: 'Turning the peg of a sarod string so that its tension rises, with its length unchanged, raises the pitch of its fundamental because',
  right: 'the wave speed on the string increases while the wavelength of the fundamental, 2L, stays the same',
  wrong: ['the wave speed is unchanged but the wavelength of the fundamental becomes shorter', 'the wavelength of the fundamental increases and the wave speed increases by the same factor', 'the amplitude of the vibration increases'],
  sol: r`The fundamental has $\lambda = 2L$, fixed by the length. Since $f = v/\lambda$ and $v = \sqrt{T/\mu}$ rises with $T$, the frequency rises — option (@K).`,
  d: 3, c: 'understanding', t: [3],
}));
add('harmonic-mcq', mcq({
  stem: 'A string fixed at both ends vibrates in its third harmonic. The number of nodes (counting the two ends) and the number of antinodes are',
  right: '4 nodes and 3 antinodes',
  wrong: ['3 nodes and 4 antinodes', '2 nodes and 3 antinodes', '4 nodes and 4 antinodes'],
  sol: 'The nth harmonic has n loops, that is n antinodes, and n + 1 nodes including the ends. For n = 3: 3 antinodes and 4 nodes — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('overtone-mcq', mcq({
  stem: 'The first overtone, the next note above the fundamental, that a pipe closed at one end can sound has a frequency that is',
  right: 'three times the fundamental',
  wrong: ['twice the fundamental', 'four times the fundamental', 'one and a half times the fundamental'],
  sol: 'A closed pipe has only odd harmonics, f₁, 3f₁, 5f₁, …, so the next note after the fundamental is the third harmonic, 3f₁ — option (@K).',
  d: 2, c: 'understanding', t: [3],
}));
add('loopphase-mcq', mcq({
  stem: 'In a standing wave on a string, two particles lie in the same loop (between the same pair of adjacent nodes) at different distances from the nodes. They vibrate',
  right: 'in phase, but with different amplitudes',
  wrong: ['in phase, with the same amplitude', 'in opposite phase, with different amplitudes', 'with a phase difference that grows steadily along the loop, as in a travelling wave'],
  sol: r`In $y = 2a\sin(kx)\cos(\omega t)$ every particle has the same time factor $\cos\omega t$, so all particles of a loop move together, while the amplitude $2a|\sin kx|$ varies with position — option (@K).`,
  d: 3, c: 'understanding', t: [3],
}));
add('node-tf', tf({
  stem: 'In a standing wave on a string, a node is a point whose displacement is zero at every instant.',
  key: 't',
  sol: 'True. A node is a point where the incident and reflected waves always cancel, so it never moves.',
  d: 1, c: 'recall', t: [3],
}));
const ce = { L: 0.5, v: V_AIR };
add('closedeven-tf', tf({
  stem: 'A pipe closed at one end, 0.50 m long, can be made to resonate at 340 Hz when the speed of sound is 340 m s⁻¹.',
  key: 'f',
  sol: r`False. The resonances are $f = \dfrac{(2n-1)v}{4L} = (2n-1) \times 170$ Hz, that is 170, 510, 850 Hz, and so on. 340 Hz would be the second harmonic, which a closed pipe does not sound.`,
  d: 2, c: 'application', t: [3],
}), () => closedF(1, ce.L, ce.v) === 170 && [1, 2, 3].every((n) => closedF(n, ce.L, ce.v) !== 340) || 'closedeven');
add('antinode-fill', fill({
  stem: 'At the open end of an organ pipe the vibrating air has a displacement ___, while at a closed end it has a node.',
  acc: [['antinode', 'Antinode']],
  sol: 'An open end is a displacement **antinode**: the air there moves freely.',
  d: 1, c: 'recall', t: [3],
}));
add('fund-fill', fill({
  stem: 'The lowest natural frequency of a stretched string that is fixed at both ends is called its ___ frequency.',
  acc: [['fundamental', 'Fundamental', 'first harmonic']],
  sol: 'It is the **fundamental** (first harmonic); the other natural frequencies are whole-number multiples of it.',
  d: 1, c: 'recall', t: [3],
}));
add('fret-ar', ar({
  a: 'Pressing a guitar string against a fret raises the fundamental frequency of the vibrating part.',
  r: 'The speed of a transverse wave on a string depends on the tension in it.',
  key: 'b',
  sol: 'Both are true, but R does not explain A. Pressing the string shortens the vibrating length, so the fundamental wavelength 2L falls and f = v/2L rises at the same tension — option (b).',
  d: 3, c: 'understanding', t: [3],
}));

const fu = { L: 0.75, v: 210 };
fu.f3 = stringF(3, fu.L, fu.v);
add('fund-num', num({
  stem: 'A stretched string of length 0.75 m is fixed at both ends, and waves travel along it at 210 m s⁻¹. Find the frequency of its third harmonic, in Hz.',
  value: fu.f3, tol: tl(fu.f3), unit: 'Hz',
  sol: r`$f_n = \dfrac{n v}{2L}$, so $f_3 = \dfrac{3 \times ${fu.v}}{2 \times ${fu.L}} = ${dec(fu.f3, 3)}$ Hz.`,
  scheme: [['f_n = nv/2L for a string fixed at both ends', 1], [`f₃ = ${dec(fu.f3, 3)} Hz`, 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(stringModes(fu.L, fu.v, 3)[2], q.answer.value, 0.01) || 'fund');
const gt = { L: 0.65, mu: 0.8e-3, f: 330 };
gt.v = 2 * gt.L * gt.f;
gt.T = gt.mu * gt.v ** 2;
add('guitar-num', num({
  stem: 'A guitar string of length 0.65 m and mass per unit length 0.80 g m⁻¹ is to be tuned to a fundamental frequency of 330 Hz. Find the tension required, in N (3 significant figures).',
  value: v3(gt.T), tol: tl(gt.T), unit: 'N',
  sol: r`For the fundamental, $\lambda = 2L$, so $v = f\lambda = 330 \times 2 \times 0.65 = ${dec(gt.v, 4)}$ m s$^{-1}$. Then $T = \mu v^2 = 0.80 \times 10^{-3} \times ${dec(gt.v, 4)}^2 = ${dec(gt.T, 3)}$ N.`,
  scheme: [['λ = 2L and v = fλ', 1], [`v = ${dec(gt.v, 4)} m s⁻¹`, 1], [`T = μv² = ${dec(gt.T, 3)} N`, 1]],
  marks: 3, d: 3, c: 'application', t: [3],
}), (q) => near(stringModes(gt.L, stringV(q.answer.value, gt.mu), 1)[0], gt.f, 0.01) || 'guitar');
const cp = { L: 0.34, v: V_AIR };
cp.f = closedF(2, cp.L, cp.v);
add('closed-num', num({
  stem: 'A pipe closed at one end is 0.34 m long. Taking the speed of sound as 340 m s⁻¹, find the frequency of its second resonance (the third harmonic), in Hz.',
  value: cp.f, tol: tl(cp.f), unit: 'Hz',
  sol: r`For a closed pipe $f_n = \dfrac{(2n-1)v}{4L}$. The second resonance has $n = 2$: $f = \dfrac{3 \times 340}{4 \times 0.34} = ${dec(cp.f, 3)}$ Hz.`,
  scheme: [['f_n = (2n − 1)v/4L; second resonance is n = 2 (three times the fundamental)', 1], [`f = ${dec(cp.f, 3)} Hz`, 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(columnModes('closed', cp.L, cp.v, 2)[1], q.answer.value, 0.01) || 'closed');
const op = { f: 512, v: V_AIR };
op.L = op.v / (2 * op.f);
add('open-num', num({
  stem: 'An open organ pipe is to sound a fundamental of frequency 512 Hz. Taking the speed of sound as 340 m s⁻¹, find the length of the pipe in cm (3 significant figures).',
  value: v3(op.L * 100), tol: tl(op.L * 100), unit: 'cm',
  sol: r`For an open pipe $f_1 = \dfrac{v}{2L}$, so $L = \dfrac{v}{2f_1} = \dfrac{340}{2 \times 512} = ${dec(op.L, 3)}$ m $= ${dec(op.L * 100, 3)}$ cm.`,
  scheme: [['L = v/2f₁ for an open pipe', 1], [`L = ${dec(op.L * 100, 3)} cm`, 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(columnModes('open', q.answer.value / 100, op.v, 1)[0], op.f, 0.01) || 'open');
const cl = { f3: 1020, v: V_AIR };
cl.L = (3 * cl.v) / (4 * cl.f3);
add('closedlen-num', num({
  stem: 'The third harmonic of a pipe closed at one end has a frequency of 1020 Hz. Taking the speed of sound as 340 m s⁻¹, find the length of the pipe in m.',
  value: cl.L, tol: tl(cl.L), unit: 'm',
  sol: r`The third harmonic of a closed pipe is $f = \dfrac{3v}{4L}$, so $L = \dfrac{3v}{4f} = \dfrac{3 \times 340}{4 \times 1020} = ${dec(cl.L, 3)}$ m.`,
  scheme: [['Third harmonic of a closed pipe: f = 3v/4L', 1], [`L = 3v/4f = ${dec(cl.L, 3)} m`, 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(columnModes('closed', q.answer.value, cl.v, 2)[1], cl.f3, 0.01) || 'closedlen');
const lp = { L: 1.5, n: 5, v: 120 };
lp.f = stringF(lp.n, lp.L, lp.v);
add('loops-num', num({
  stem: 'A string 1.50 m long and fixed at both ends vibrates in a standing wave with 5 loops when waves travel on it at 120 m s⁻¹. Find the frequency of the vibration, in Hz.',
  value: lp.f, tol: tl(lp.f), unit: 'Hz',
  sol: r`Five loops means the fifth harmonic, with $L = 5\lambda/2$, so $\lambda = \dfrac{2L}{5} = ${dec((2 * lp.L) / lp.n, 3)}$ m. Then $f = \dfrac{v}{\lambda} = \dfrac{${lp.v}}{${dec((2 * lp.L) / lp.n, 3)}} = ${dec(lp.f, 3)}$ Hz.`,
  scheme: [['n = 5 loops: L = 5λ/2, λ = 2L/5', 1], [`f = v/λ = ${dec(lp.f, 3)} Hz`, 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(stringModes(lp.L, lp.v, 5)[4], q.answer.value, 0.01) || 'loops');
const sw = { k: 10 };
sw.d = PI / sw.k;
add('stand-num', num({
  stem: 'A standing wave on a string is described by y = 0.0060 sin(10x) cos(400t) in SI units. Find the distance between neighbouring nodes, in m (3 significant figures).',
  value: v3(sw.d), tol: tl(sw.d), unit: 'm',
  sol: r`Nodes occur where $\sin(kx) = 0$, i.e. $kx = n\pi$, so neighbouring nodes differ in $x$ by $\Delta x = \dfrac{\pi}{k} = \dfrac{\pi}{10} = ${dec(sw.d, 3)}$ m (half a wavelength).`,
  scheme: [['Nodes where sin kx = 0, kx = nπ, with k = 10 rad m⁻¹', 1], [`Spacing π/k = ${dec(sw.d, 3)} m`, 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(2 * q.answer.value, (2 * PI) / sw.k, 0.01) || 'stand');
const pr = { L: 0.5, f: 220, f2: 330 };
pr.L2 = (pr.L * pr.f) / pr.f2;
add('press-num', num({
  stem: 'A taut string 0.50 m long, fixed at both ends, vibrates in its fundamental at 220 Hz. At what distance from one end must it be pressed so that the vibrating part gives a fundamental of 330 Hz? The wave speed is unchanged. Give the answer in m (3 significant figures).',
  value: v3(pr.L2), tol: tl(pr.L2), unit: 'm',
  sol: r`With $v$ fixed, $f_1 = \dfrac{v}{2L}$ gives $f \propto \dfrac{1}{L}$. So $L' = L\,\dfrac{f_1}{f'} = 0.50 \times \dfrac{${pr.f}}{${pr.f2}} = ${dec(pr.L2, 3)}$ m.`,
  scheme: [['f ∝ 1/L at constant wave speed', 1], [`L′ = L f/f′ = ${dec(pr.L2, 3)} m`, 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(stringModes(q.answer.value, 2 * pr.L * pr.f, 1)[0], pr.f2, 0.01) || 'press');
const nd = { L: 0.9, n: 3 };
nd.x = nd.L / nd.n;
add('node-num', num({
  stem: 'A string 0.90 m long, fixed at both ends, vibrates in its third harmonic. Find the distance of the nearest interior node from one end, in m.',
  value: v3(nd.x), tol: tl(nd.x), unit: 'm',
  sol: r`In the third harmonic the nodes divide the string into three equal loops, each of length $\dfrac{\lambda}{2} = \dfrac{L}{3}$. The nearest interior node is at $x = \dfrac{0.90}{3} = ${dec(nd.x, 2)}$ m.`,
  scheme: [[`Loops of length L/3, so first interior node at x = ${dec(nd.x, 2)} m`, 1]],
  marks: 1, d: 2, c: 'application', t: [3],
}), (q) => near(q.answer.value * nd.n, nd.L, 0.01) || 'node');
add('standing-short', short({
  marks: 2,
  stem: 'How is a standing wave formed on a string that is fixed at both ends? Define a node and an antinode.',
  model: 'A wave sent along the string is reflected at the fixed end, and the reflected wave travels back and superposes on the incident wave. For certain frequencies the superposition gives a pattern that does not travel. A **node** is a point that never moves; an **antinode** is a point of the greatest amplitude, halfway between neighbouring nodes.',
  sol: 'Incident plus reflected wave; node and antinode defined.',
  scheme: [['Incident and reflected waves of equal amplitude and frequency superpose', 1], ['Node: never moves; antinode: maximum amplitude', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('closedodd-short', short({
  marks: 2,
  stem: 'Explain why a pipe that is closed at one end can sound only the odd harmonics of its fundamental.',
  model: 'The closed end must be a displacement node and the open end an antinode. A node and the nearest antinode are a quarter wavelength apart, so the length must be an **odd** number of quarter wavelengths, L = (2n − 1)λ/4. Hence f = (2n − 1)v/4L: f₁, 3f₁, 5f₁ and so on.',
  sol: 'Node at closed end, antinode at open end: L is an odd number of quarter wavelengths.',
  scheme: [['Node at the closed end and antinode at the open end', 1], ['L = (2n − 1)λ/4, so only odd multiples of f₁', 1]],
  d: 3, c: 'understanding', t: [3],
}));
add('reflect-short', short({
  marks: 2,
  stem: 'Describe what happens to a pulse travelling on a string when it is reflected (i) at a fixed end and (ii) at a free end.',
  model: '(i) At a **fixed** end the displacement must stay zero, so the pulse is reflected with its sign reversed: it returns inverted, a phase change of π. (ii) At a **free** end the string can move, so the pulse returns the same way up, with no phase change. In both cases speed and wavelength are unchanged.',
  sol: 'Fixed end: inverted. Free end: upright.',
  scheme: [['Fixed end: reflected pulse inverted (phase change π)', 1], ['Free end: reflected pulse not inverted; speed unchanged', 1]],
  d: 2, c: 'understanding', t: [3],
}));
add('stringmodes-short3', short({
  marks: 3,
  stem: 'A string of length L is fixed at both ends. Show that its natural frequencies are f = nv/2L, where v is the wave speed, and name the lowest one.',
  model: r`Both ends are nodes, so the length must hold a whole number of half wavelengths: $L = n\,\dfrac{\lambda}{2}$, giving $\lambda_n = \dfrac{2L}{n}$ with $n = 1, 2, 3, \dots$ Since $f = v/\lambda$, the natural frequencies are $f_n = \dfrac{nv}{2L}$. The lowest, $n = 1$, $f_1 = \dfrac{v}{2L}$, is the **fundamental** (first harmonic); the others are its multiples.`,
  sol: 'Nodes at both ends: L = nλ/2, f = nv/2L.',
  scheme: [['Nodes at both ends, so L = nλ/2', 1], ['λ = 2L/n and f = v/λ = nv/2L', 1], ['n = 1 is the fundamental (first harmonic)', 1]],
  wl: null, d: 3, c: 'understanding', t: [3],
}));
add('pipes-short3', short({
  marks: 3,
  stem: 'Compare the harmonics present in an open pipe and in a pipe closed at one end, both of length L, and write the frequencies of each in terms of v and L.',
  model: r`An **open** pipe has an antinode at both ends, $L = n\lambda/2$, so it sounds all harmonics, $f_n = \dfrac{nv}{2L}$ ($f_1, 2f_1, 3f_1, \dots$). A pipe **closed** at one end has a node at the closed end and an antinode at the open end, $L = (2n-1)\lambda/4$, so it sounds only odd harmonics, $f_n = \dfrac{(2n-1)v}{4L}$ ($f_1, 3f_1, 5f_1, \dots$), with a fundamental half that of the open pipe.`,
  sol: 'Open: all harmonics nv/2L. Closed: odd harmonics (2n−1)v/4L.',
  scheme: [['Open pipe: all harmonics, f = nv/2L', 1], ['Closed pipe: only odd harmonics, f = (2n − 1)v/4L', 1], ['Closed fundamental is half the open fundamental of the same length', 1]],
  d: 3, c: 'understanding', t: [3],
}));
const pk = { f: 330 };
add('pluck-short3', short({
  marks: 3,
  stem: 'A guitarist wants to double the fundamental frequency of a string without changing its length or its mass per unit length. By what factor must the tension be changed? Give your reasoning, and say how else the frequency could be doubled.',
  model: r`The fundamental is $f_1 = \dfrac{1}{2L}\sqrt{\dfrac{T}{\mu}}$, so at fixed $L$ and $\mu$, $f_1 \propto \sqrt{T}$. To double $f_1$ the tension must be multiplied by $2^2 = 4$. Alternatively, at the original tension the frequency is inversely proportional to $L$, so halving the vibrating length, by pressing the string at its middle, also doubles the frequency.`,
  sol: 'f ∝ √T so T × 4; or halve L.',
  scheme: [['f₁ = (1/2L)√(T/μ), so f ∝ √T at fixed L and μ', 1], ['Doubling f needs T × 4', 1], ['Or halve the length (f ∝ 1/L)', 1]],
  d: 3, c: 'application', t: [3],
}), () => near(Math.sqrt(4), 2, 1e-12) && near(stringModes(0.5, stringV(4 * 100, 0.001), 1)[0] / stringModes(0.5, stringV(100, 0.001), 1)[0], 2, 1e-6) || 'pluck');
void pk;

// ================================================================ t04 beats
add('beatf-mcq', mcq({
  stem: 'Two tuning forks of frequencies 256 Hz and 260 Hz are sounded together. The number of beats heard per second is',
  right: '4',
  wrong: ['2', '258', '516'],
  sol: 'The beat frequency is the difference of the two frequencies: 260 − 256 = 4 per second. 258 Hz is the pitch heard, and 516 Hz is the sum — option (@K).',
  d: 1, c: 'application', t: [4],
}), () => interiorSwells(256, 260, 1) + 1 === 4 || 'beatf');
add('beatcond-mcq', mcq({
  stem: 'Beats are clearly heard when two notes sounded together have',
  right: 'frequencies that differ by only a few hertz',
  wrong: ['frequencies that differ by several hundred hertz', 'exactly equal frequencies', 'frequencies in the ratio 2 : 1'],
  sol: 'Beats need a slow, regular swelling of loudness, which happens only when the frequencies are nearly equal, so the beat frequency is a few hertz. Equal frequencies give no beats, and widely different frequencies are heard as separate notes — option (@K).',
  d: 2, c: 'understanding', t: [4],
}));
add('beatamp-mcq', mcq({
  stem: 'Two sources of equal amplitude a emit notes of nearly equal frequency. During a beat, the amplitude of the resultant sound heard varies between',
  right: '2a at the loudest instant and nearly zero at the quietest',
  wrong: ['a at the loudest instant and nearly zero at the quietest', '2a at the loudest instant and a at the quietest', 'a√2 at the loudest instant and a√2 at the quietest, with no change'],
  sol: r`The resultant is $2a\cos\big(\pi(f_1 - f_2)t\big)\sin\big(\pi(f_1+f_2)t\big)$: the amplitude factor $2a\cos(\dots)$ swells to $2a$ and fades to zero — option (@K).`,
  d: 3, c: 'understanding', t: [4],
}));
const wx = { f0: 400, fb: 5 };
add('wax-mcq', mcq({
  stem: 'A tuning fork X sounded with a standard fork of 400 Hz gives 5 beats per second. When a little wax is stuck on a prong of X, which lowers its frequency, the number of beats per second increases. The original frequency of X was',
  right: '395 Hz',
  wrong: ['405 Hz', '400 Hz', '5 Hz'],
  sol: 'X was either 395 Hz or 405 Hz. Loading X lowers its frequency. If it had been 405 Hz it would move closer to 400 Hz and the beats would decrease. They increase, so X moved farther away: it was 395 Hz and became lower still — option (@K).',
  d: 4, c: 'analysis', t: [4],
}), () => Math.abs(395 - 1 - wx.f0) > Math.abs(395 - wx.f0) && Math.abs(405 - 1 - wx.f0) < Math.abs(405 - wx.f0) || 'wax');
add('beat-tf', tf({
  stem: 'Two waves of exactly the same frequency but different amplitudes, sounded together, give beats.',
  key: 'f',
  sol: 'False. Beats need two waves of slightly different frequencies; waves of the same frequency give a steady resultant amplitude.',
  d: 1, c: 'recall', t: [4],
}));
const b1 = { f1: 523, f2: 528 };
b1.fb = Math.abs(b1.f2 - b1.f1);
b1.T = 1 / b1.fb;
add('beat-num1', num({
  stem: 'Two flutes sound notes of frequencies 523 Hz and 528 Hz together. Find the time between successive loud swells, in s.',
  value: b1.T, tol: tl(b1.T), unit: 's',
  sol: r`The beat frequency is $f_b = |528 - 523| = ${b1.fb}$ Hz. The time between successive swells is $\dfrac{1}{f_b} = \dfrac{1}{${b1.fb}} = ${dec(b1.T, 2)}$ s.`,
  scheme: [[`f_b = |f₁ − f₂| = ${b1.fb} Hz`, 1], [`Time = 1/f_b = ${dec(b1.T, 2)} s`, 1]],
  marks: 2, d: 2, c: 'application', t: [4],
}), (q) => near(2 / (interiorSwells(b1.f1, b1.f2, 2) + 1), q.answer.value, 0.01) || 'beat-num1');
const bp = { L1: 0.6, L2: 0.62, v: V_AIR };
bp.f1 = stringF(1, bp.L1, bp.v);
bp.f2 = stringF(1, bp.L2, bp.v);
bp.fb = bp.f1 - bp.f2;
add('beatpipe-num', num({
  stem: 'Two open pipes of lengths 0.60 m and 0.62 m sound their fundamentals together. Taking the speed of sound as 340 m s⁻¹, find the beat frequency in Hz (3 significant figures).',
  value: v3(bp.fb), tol: tl(bp.fb), unit: 'Hz',
  sol: r`For an open pipe $f_1 = \dfrac{v}{2L}$: $f_1 = \dfrac{340}{2 \times 0.60} = ${dec(bp.f1, 5)}$ Hz and $f_2 = \dfrac{340}{2 \times 0.62} = ${dec(bp.f2, 5)}$ Hz. The beat frequency is $f_1 - f_2 = ${dec(bp.fb, 3)}$ Hz.`,
  scheme: [[`f = v/2L for each pipe: ${dec(bp.f1, 5)} Hz and ${dec(bp.f2, 5)} Hz`, 2], [`f_b = f₁ − f₂ = ${dec(bp.fb, 3)} Hz`, 1]],
  marks: 3, d: 3, c: 'application', t: [3, 4],
}), (q) => near(columnModes('open', bp.L1, bp.v, 1)[0] - columnModes('open', bp.L2, bp.v, 1)[0], q.answer.value, 0.01) || 'beatpipe');
const bu = { fork: 384, fb: 6 };
bu.f = bu.fork + bu.fb;
add('beat-unknown-num', num({
  stem: 'A string of a sitar gives 6 beats per second with a tuning fork of 384 Hz. When the string is tightened slightly, the number of beats per second increases. Find the original frequency of the string, in Hz.',
  value: bu.f, tol: tl(bu.f), unit: 'Hz',
  sol: r`The string's frequency was either $384 + 6 = 390$ Hz or $384 - 6 = 378$ Hz. Tightening raises the frequency. If it had been 378 Hz it would approach 384 Hz and the beats would decrease; they increase, so the string was higher than the fork: $f = 384 + 6 = ${bu.f}$ Hz.`,
  scheme: [['Two possibilities, 390 Hz or 378 Hz', 1], [`Tightening raises f; beats increase, so the string was above the fork: f = ${bu.f} Hz`, 1]],
  marks: 2, d: 4, c: 'analysis', t: [4],
}), () => Math.abs(bu.f + 1 - bu.fork) > Math.abs(bu.f - bu.fork) && Math.abs(378 + 1 - bu.fork) < Math.abs(378 - bu.fork) || 'beat-unknown');
const bc = { f1: 340, f2: 346, t: 12 };
bc.n = Math.abs(bc.f2 - bc.f1) * bc.t;
add('beatcount-num', num({
  stem: 'Two sources of frequencies 340 Hz and 346 Hz are sounded together for 12 s. How many loud swells are heard in this time?',
  value: bc.n, tol: 0, unit: null,
  sol: r`The beat frequency is $|346 - 340| = 6$ Hz, that is 6 swells per second, so in 12 s the number of swells is $6 \times 12 = ${bc.n}$.`,
  scheme: [[`f_b = 6 Hz, so 6 × 12 = ${bc.n} swells`, 1]],
  marks: 1, d: 1, c: 'application', t: [4],
}), (q) => interiorSwells(bc.f1, bc.f2, 2) + 1 === 12 && q.answer.value === 72 || 'beatcount');
add('beats-short', short({
  marks: 2,
  stem: 'What are beats? Write the expression for the beat frequency of two notes of frequencies f₁ and f₂.',
  model: 'When two notes of nearly equal frequency are sounded together, the loudness of the sound swells and fades at regular intervals; each swell is a **beat**. The number of beats per second, the beat frequency, equals the difference of the two frequencies: f_b = |f₁ − f₂|.',
  sol: 'Periodic swell and fade; f_b = |f₁ − f₂|.',
  scheme: [['Beats: periodic variation in loudness from two nearly equal frequencies', 1], ['f_b = |f₁ − f₂|', 1]],
  d: 1, c: 'recall', t: [4],
}));
add('beatsderive-short3', short({
  marks: 3,
  stem: 'Two waves y₁ = a sin 2πf₁t and y₂ = a sin 2πf₂t reach a point together. Show that the resultant is 2a cos[π(f₁ − f₂)t] sin[π(f₁ + f₂)t], and deduce the beat frequency.',
  model: r`By superposition $y = a\left(\sin 2\pi f_1 t + \sin 2\pi f_2 t\right)$. With $\sin A + \sin B = 2\sin\dfrac{A+B}{2}\cos\dfrac{A-B}{2}$ this is $y = 2a\cos\big[\pi(f_1 - f_2)t\big]\sin\big[\pi(f_1+f_2)t\big]$: a note of frequency $\dfrac{f_1+f_2}{2}$ with a slowly varying amplitude $2a\cos[\pi(f_1-f_2)t]$. The loudness is greatest $|f_1 - f_2|$ times per second, so $f_b = |f_1 - f_2|$.`,
  sol: 'Sum of sines; amplitude 2a cos[π(f₁−f₂)t]; f_b = |f₁−f₂|.',
  scheme: [['y = y₁ + y₂ by superposition', 1], ['Uses sin A + sin B = 2 sin((A+B)/2) cos((A−B)/2) to reach the result', 1], ['The amplitude has maxima |f₁ − f₂| times per second: f_b = |f₁ − f₂|', 1]],
  wl: null, d: 3, c: 'understanding', t: [4],
}), () => { const f1 = 256, f2 = 262; return [0.013, 0.071, 0.2].every((t) => near(Math.sin(2 * PI * f1 * t) + Math.sin(2 * PI * f2 * t), 2 * Math.cos(PI * (f1 - f2) * t) * Math.sin(PI * (f1 + f2) * t), 1e-9)) || 'beatsderive'; });
add('beat-ar', ar({
  a: 'Two tuning forks of frequencies 256 Hz and 258 Hz sounded together are heard to swell in loudness twice every second.',
  r: 'The two waves are always in phase, so they always add up to the same large amplitude.',
  key: 'c',
  sol: 'A is true: the beat frequency is 258 − 256 = 2 per second. R is false: because the frequencies differ, the phase difference changes continuously, so the waves alternately add and cancel — option (c).',
  d: 3, c: 'understanding', t: [4],
}));
