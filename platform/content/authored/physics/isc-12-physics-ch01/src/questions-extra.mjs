// ISC 12 Physics ch01 — application items added in the verifier pass (competency balance). Imported last.
import { mk, add, r, sci, dec, near, K, QE, ME } from './lib.mjs';

const { mcq, num } = mk;

add('fieldfall-mcq', mcq({
  stem: 'The electric field 2.0 cm from a small charged sphere is 900 N C⁻¹. The field 6.0 cm from the centre of the sphere is',
  right: '100 N C⁻¹',
  wrong: ['300 N C⁻¹', '450 N C⁻¹', '30 N C⁻¹'],
  sol: 'E ∝ 1/r²: tripling the distance divides the field by 9, so 900/9 = 100 N C⁻¹ — option (@K).',
  d: 2, c: 'application', t: [4],
}));
const pf = { E: 360, r: 0.1 };
pf.p = (pf.E * pf.r ** 3) / (2 * K);
add('pfind-num', num({
  stem: 'The electric field at a point on the axis of a short dipole, 10 cm from its centre, is 360 N C⁻¹. Find the dipole moment, in units of 10⁻¹¹ C m.',
  value: Number(dec(pf.p / 1e-11, 2)), tol: 0.02, unit: '× 10⁻¹¹ C m',
  sol: r`$E = \dfrac{2kp}{r^3} \Rightarrow p = \dfrac{Er^3}{2k} = \dfrac{360 \times (0.10)^3}{2 \times 9 \times 10^{9}} = ${sci(pf.p, 2)}$ C m, i.e. $\dfrac{${sci(pf.p, 2)}}{10^{-11}} = ${dec(pf.p / 1e-11, 2)}$.`,
  scheme: [['Rearrange E = 2kp/r³', 1], ['p = 2.0 × 10⁻¹¹ C m', 1]],
  marks: 2, d: 3, c: 'application', t: [6],
}), (q) => near(pf.p, 2e-11) && near(q.answer.value, 2) || 'pf');
add('pe-mcq', mcq({
  stem: 'A proton and an electron are released from rest in the same uniform electric field. Compared with the proton, the electron has',
  right: 'an acceleration about 1840 times larger, in the opposite direction',
  wrong: ['the same acceleration in the opposite direction', 'an acceleration about 1840 times smaller', 'the same acceleration in the same direction'],
  sol: 'Both feel force of size eE, in opposite directions; a = eE/m, and m_p/mₑ ≈ 1.67 × 10⁻²⁷/9.1 × 10⁻³¹ ≈ 1840 — option (@K).',
  d: 3, c: 'application', t: [4],
}), () => near(1.67e-27 / ME, 1835) || 'pe');
const ms = { r: 0.4, K: 4 };
ms.rm = ms.r / Math.sqrt(ms.K);
add('mediumsep-num', num({
  stem: 'Two charges 40 cm apart in air are moved into an oil of dielectric constant 4. At what separation, in metres, will the force between them be the same as it was in air?',
  value: ms.rm, tol: 0.003, unit: 'm',
  sol: r`$\dfrac{kq_1q_2}{r^2} = \dfrac{kq_1q_2}{Kr'^2} \Rightarrow r' = \dfrac{r}{\sqrt{K}} = \dfrac{0.40}{\sqrt{4}} = ${dec(ms.rm, 2)}$ m.`,
  scheme: [['Equate the forces: r′ = r/√K', 1], ['r′ = 0.20 m', 1]],
  marks: 2, d: 4, c: 'analysis', t: [2],
}), (q) => near(ms.rm, 0.2) && near(q.answer.value, 0.2) || 'ms');
