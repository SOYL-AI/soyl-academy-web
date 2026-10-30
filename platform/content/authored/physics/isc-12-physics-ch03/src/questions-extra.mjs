// ISC 12 Physics ch03 — application items added in the verifier pass (competency balance). Imported last.
import { mk, add, r, sci, dec, near, K, QE } from '../../isc-12-physics-ch01/src/lib.mjs';

const { mcq, num } = mk;
const deg = (d) => (d * Math.PI) / 180;

add('protonK-mcq', mcq({
  stem: 'A proton is accelerated from rest through a potential difference of 2.0 kV. The kinetic energy it gains is',
  right: '2.0 keV, or 3.2 × 10⁻¹⁶ J',
  wrong: ['2.0 eV, or 3.2 × 10⁻¹⁹ J', '1.0 keV, because the proton is heavy', '2.0 keV, or 2.0 × 10³ J'],
  sol: 'K = qV = e × 2000 V = 2000 eV = 2000 × 1.6 × 10⁻¹⁹ J = 3.2 × 10⁻¹⁶ J; the mass does not matter — option (@K).',
  d: 2, c: 'application', t: [4],
}));
const al = { V: 1000 };
al.K = 2 * QE * al.V;
add('alphaK-num', num({
  stem: 'An alpha particle (charge +2e) starting from rest is accelerated through 1000 V. Find its kinetic energy, in units of 10⁻¹⁶ J.',
  value: Number(dec(al.K / 1e-16, 2)), tol: 0.02, unit: '× 10⁻¹⁶ J',
  sol: r`$K = qV = 2 \times 1.6 \times 10^{-19} \times 1000 = ${sci(al.K, 2)}$ J (2000 eV), i.e. $\dfrac{${sci(al.K, 2)}}{10^{-16}} = ${dec(al.K / 1e-16, 2)}$.`,
  scheme: [['q = 2e', 1], ['K = 3.2 × 10⁻¹⁶ J', 1]],
  marks: 2, d: 2, c: 'application', t: [4],
}), (q) => near(al.K, 3.2e-16) || 'al');
const gr = { VA: 50, E: 200, dx: 0.15 };
gr.VB = gr.VA - gr.E * gr.dx;
add('gridV-num', num({
  stem: 'A uniform field of 200 V m⁻¹ points along +x. The potential at point A is 50 V. Point B is 15 cm from A along +x and 10 cm along +y. Find the potential at B, in volts.',
  value: gr.VB, tol: 0.3, unit: 'V',
  sol: r`Only the displacement along E changes V: $V_B = V_A - E\Delta x = 50 - 200 \times 0.15 = ${dec(gr.VB, 2)}$ V.`,
  scheme: [['ΔV = −EΔx; y-displacement irrelevant', 1], ['V_B = 20 V', 1]],
  marks: 2, d: 4, c: 'analysis', t: [1],
}), (q) => near(gr.VB, 20) || 'gr');
const tv = (K * 5e-9) / 0.1 + (K * -3e-9) / 0.3;
add('twoV-num', num({
  stem: 'A point P is 10 cm from a charge of +5.0 nC and 30 cm from a charge of −3.0 nC. Find the potential at P, in volts.',
  value: Number(dec(tv, 3)), tol: 1, unit: 'V',
  sol: r`$V = \dfrac{9 \times 10^{9} \times 5.0 \times 10^{-9}}{0.10} + \dfrac{9 \times 10^{9} \times (-3.0 \times 10^{-9})}{0.30} = 450 - 90 = ${dec(tv, 3)}$ V.`,
  scheme: [['Algebraic sum of kq/r', 1], ['360 V', 1]],
  marks: 2, d: 2, c: 'application', t: [3],
}), (q) => near(tv, 360) || 'tv');
const cl = { K: 1000 * QE };
cl.r = (K * QE * QE) / cl.K;
add('approach-num', num({
  stem: 'A proton with kinetic energy 1.0 keV moves straight towards another proton held fixed, starting very far away. Find the distance of closest approach, in units of 10⁻¹² m (3 significant figures).',
  value: Number(dec(cl.r / 1e-12, 3)), tol: 0.02, unit: '× 10⁻¹² m',
  sol: r`At closest approach all the kinetic energy has become potential energy: $\dfrac{ke^2}{r} = K$, so $r = \dfrac{9 \times 10^{9} \times (1.6 \times 10^{-19})^2}{1.0 \times 10^{3} \times 1.6 \times 10^{-19}} = ${sci(cl.r, 3)}$ m, i.e. $\dfrac{${sci(cl.r, 3)}}{10^{-12}} = ${dec(cl.r / 1e-12, 3)}$.`,
  scheme: [['K = ke²/r at closest approach', 1], ['r = 1.44 × 10⁻¹² m', 1]],
  marks: 2, d: 4, c: 'analysis', t: [4],
}), (q) => near(cl.r, 1.44e-12) || 'cl');
add('turn60-mcq', mcq({
  stem: 'A dipole of moment p in a uniform field E is turned from 60° to 120° with the field. The work done by the external agent is',
  right: 'pE',
  wrong: ['zero', 'pE/2', '2pE'],
  sol: 'W = pE(cos 60° − cos 120°) = pE(0.5 + 0.5) = pE — option (@K).',
  d: 3, c: 'application', t: [5],
}), () => near(Math.cos(deg(60)) - Math.cos(deg(120)), 1) || 'turn');
