// ch06 further items added in the verifier pass (bank size and competency balance). Imported last by questions.mjs.
import { mk, add, r, near } from '../../cbse-12-physics-ch01/src/lib.mjs';

const { mcq, tf, num } = mk;

add('turnsloop-mcq', mcq({
  stem: 'A length of wire is bent into a single circular loop and placed face-on in a magnetic field that is increasing steadily. The same wire is then bent into a two-turn circular coil and placed in the same way. The emf in the two-turn coil, compared with the single loop, is',
  right: 'half as large',
  wrong: ['twice as large', 'the same', 'four times as large'],
  sol: r`With two turns the radius halves, so each turn has a quarter of the area. Flux linkage $\propto N A = 2 \times \dfrac{1}{4} = \dfrac{1}{2}$ of the single loop’s, so the emf is halved — option (@K).`,
  d: 4, c: 'application', t: [1],
}), () => near(2 * 0.25, 0.5) || 'turns');
add('flip-mcq', mcq({
  stem: 'A coil of N turns and area A faces a uniform field B. It is flipped over through 180° in time t. The average induced emf is',
  right: '$2NBA/t$',
  wrong: ['$NBA/t$', 'zero', '$NBA/2t$'],
  sol: r`The flux per turn changes from $+BA$ to $-BA$, a change of $2BA$, so $|\varepsilon| = 2NBA/t$ — option (@K).`,
  d: 3, c: 'application', t: [1],
}));
add('south-mcq', mcq({
  stem: 'The SOUTH pole of a bar magnet is pushed towards a coil. Seen from the side of the magnet, the current induced in the near face of the coil flows',
  right: 'clockwise, making that face a south pole',
  wrong: ['anticlockwise, making that face a north pole', 'clockwise, making that face a north pole', 'anticlockwise, making that face a south pole'],
  sol: 'To oppose the approaching S pole, the near face must become an S pole; a face looks like an S pole when its current is clockwise as seen by the viewer — option (@K).',
  d: 3, c: 'application', t: [2],
}));
add('jumpring-mcq', mcq({
  stem: 'An aluminium ring rests on top of a vertical solenoid with an iron core, around the core. When the current in the solenoid is suddenly switched on, the ring',
  right: 'jumps upwards',
  wrong: ['is pulled down onto the solenoid', 'stays where it is', 'starts spinning about the core'],
  sol: 'The growing flux induces a current in the ring opposite to that in the solenoid; antiparallel currents repel, so the ring is thrown up (Lenz) — option (@K).',
  d: 3, c: 'application', t: [2],
}));
const rv = { I: 0.25, R: 0.8, B: 0.5, l: 0.4 };
rv.v = (rv.I * rv.R) / (rv.B * rv.l);
add('railspeed-num', num({
  stem: 'A rod 40 cm long slides on rails in a uniform field of 0.50 T perpendicular to the rails; the circuit resistance is 0.80 Ω. At what speed must the rod move for a current of 0.25 A to flow? Answer in m s⁻¹.',
  value: rv.v, tol: 0.02, unit: 'm s⁻¹',
  sol: r`Required emf $\varepsilon = IR = 0.25 \times 0.80 = 0.2$ V. Then $v = \dfrac{\varepsilon}{Bl} = \dfrac{0.2}{0.50 \times 0.40} = 1$ m s$^{-1}$.`,
  scheme: [['ε = IR = 0.20 V', 1], ['v = ε/Bl = 1.0 m s⁻¹', 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(rv.v, q.answer.value) || 'v');
const rf = { B: 0.4, l: 0.3, v: 5, R: 1.2 };
rf.F = (rf.B ** 2 * rf.l ** 2 * rf.v) / rf.R;
add('railforce-num', num({
  stem: 'A rod 30 cm long is pulled at a steady 5.0 m s⁻¹ along rails in a perpendicular field of 0.40 T; the circuit resistance is 1.2 Ω. Find the pulling force needed, in newtons.',
  value: Number(rf.F.toFixed(3)), tol: 0.002, unit: 'N',
  sol: r`$\varepsilon = Blv = 0.40 \times 0.30 \times 5.0 = 0.6$ V; $I = \dfrac{0.6}{1.2} = 0.5$ A; $F = IlB = 0.5 \times 0.30 \times 0.40 = 0.06$ N (equal to the opposing magnetic force).`,
  scheme: [['ε and I', 1], ['F = IlB = 0.060 N', 1]],
  marks: 2, d: 3, c: 'application', t: [3],
}), (q) => near(rf.F, q.answer.value) || 'F');
add('Lfrom-num', num({
  stem: 'An emf of 6.0 V is induced in a coil when the current through it rises steadily from 2.0 A to 5.0 A in 0.10 s. Find the self-inductance of the coil, in henry.',
  value: 0.2, tol: 0.005, unit: 'H',
  sol: r`$L = \dfrac{|\varepsilon|}{\Delta I/\Delta t} = \dfrac{6.0}{3.0/0.10} = \dfrac{6.0}{30} = 0.2$ H.`,
  scheme: [['ΔI/Δt = 30 A s⁻¹', 0.5], ['L = 0.20 H', 0.5]],
  d: 2, c: 'application', t: [4],
}), (q) => near(6 / (3 / 0.1), q.answer.value) || 'L');
add('fluxturn-mcq', mcq({
  stem: 'A coil of 200 turns has a self-inductance of 0.50 H and carries a steady current of 2.0 A. The magnetic flux through each turn is',
  right: r`$5.0 \times 10^{-3}$ Wb`,
  wrong: ['1.0 Wb', r`$2.5 \times 10^{-3}$ Wb`, '200 Wb'],
  sol: r`$N\Phi = LI$, so $\Phi = \dfrac{LI}{N} = \dfrac{0.50 \times 2.0}{200} = 5.0 \times 10^{-3}$ Wb — option (@K).`,
  d: 3, c: 'application', t: [4],
}), () => near((0.5 * 2) / 200, 5e-3) || 'phi');
add('reciprocal-mcq', mcq({
  stem: 'When the current in coil 2 changes at 10 A s⁻¹, an emf of 0.30 V is induced in coil 1. If instead the current in coil 1 changes at 5.0 A s⁻¹, the emf induced in coil 2 is',
  right: '0.15 V',
  wrong: ['0.30 V', '0.60 V', '1.5 V'],
  sol: r`$M = 0.30/10 = 0.03$ H, and $M_{12} = M_{21}$, so the emf is $0.03 \times 5.0 = 0.15$ V — option (@K).`,
  d: 3, c: 'application', t: [4],
}), () => near((0.3 / 10) * 5, 0.15) || 'M');
add('inside-tf', tf({
  stem: 'A flat loop moving at constant velocity while staying entirely inside a region of uniform magnetic field has no induced emf.',
  key: 't',
  sol: 'True. The flux through the loop stays constant (same B, same area, same orientation), so there is no induced emf.',
  d: 2, c: 'understanding', t: [1, 3],
}));
