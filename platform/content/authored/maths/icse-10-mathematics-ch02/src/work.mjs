// LaTeX working lines for recurring-deposit problems, generated from the exact arithmetic in fin.mjs.
// Keys and final values are typed as literals in questions.mjs and build.mjs; the checks compare those
// literals with fin.mjs and with the numbers inside these generated lines.
import { rd, tri, qualifyingSum, instalmentFromMV, instalmentFromI, rateFromI, monthsFromMV, monthsFromI, inr } from './fin.mjs';

const r = String.raw;
/** A number for use inside $…$: plain digits below one lakh (so the arithmetic lint can read it), grouped above. */
export const tm = (x) => (Math.abs(x) < 100000 ? String(+x.toFixed(2) === Math.round(x) ? Math.round(x) : x.toFixed(2)) : inr(x, { tex: true }));
/** A rupee amount in prose: ₹12,345 or ₹6,243.75. */
export const rs = (x) => `₹${inr(x)}`;
const dec = (x) => {
  const v = +x.toFixed(6);
  if (Math.abs(v - x) > 1e-9) throw new Error(`work: ${x} does not terminate`);
  return String(v);
};
export const NN = (n) => r`\dfrac{${n} \times ${n + 1}}{2 \times 12}`;
export const RR = (x) => r`\dfrac{${x}}{100}`;

/** "I = P × n(n+1)/(2×12) × r/100 = value" */
export function Iline(P, n, x) {
  return r`I = ${tm(P)} \times ${NN(n)} \times ${RR(x)} = ${tm(rd(P, n, x).I)}`;
}
/** "MV = P × n + I = deposit + I = MV" */
export function MVline(P, n, x) {
  const v = rd(P, n, x);
  return r`\text{MV} = ${tm(P)} \times ${n} + ${tm(v.I)} = ${tm(v.deposit)} + ${tm(v.I)} = ${tm(v.MV)}`;
}
/** Qualifying sum line: "P × n(n+1)/2 = S" */
export function Sline(P, n) {
  return r`${tm(P)} \times \dfrac{${n} \times ${n + 1}}{2} = ${tm(P)} \times ${tri(n)} = ${tm(qualifyingSum(P, n))}`;
}

/** Working for the monthly instalment from the maturity value (lines of markdown with inline maths). */
export function findP(MV, n, x) {
  const k = tri(n) * x / 1200; // interest per rupee of instalment
  const { P, exact } = instalmentFromMV(MV, n, x);
  if (!exact) throw new Error('work: findP inexact');
  return {
    P,
    k: +dec(k),
    lines: [
      r`Let the monthly instalment be ₹$P$. Then $I = P \times ${NN(n)} \times ${RR(x)} = ${dec(k)}P$.`,
      r`$\text{MV} = P \times ${n} + ${dec(k)}P = ${dec(n + k)}P$.`,
      r`So $${dec(n + k)}P = ${tm(MV)}$, giving $P = \dfrac{${tm(MV)}}{${dec(n + k)}} = ${tm(P)}$.`,
    ],
  };
}
/** Working for the instalment from the interest. */
export function findPfromI(I, n, x) {
  const k = tri(n) * x / 1200;
  const { P, exact } = instalmentFromI(I, n, x);
  if (!exact) throw new Error('work: findPfromI inexact');
  return {
    P,
    k: +dec(k),
    lines: [
      r`$I = P \times ${NN(n)} \times ${RR(x)} = ${dec(k)}P$.`,
      r`So $${dec(k)}P = ${tm(I)}$, giving $P = \dfrac{${tm(I)}}{${dec(k)}} = ${tm(P)}$.`,
    ],
  };
}
/** Working for the rate from the interest (or from MV via I = MV − Pn). */
export function findR(P, n, I, MV = null) {
  const k = P * tri(n) / 1200; // interest per 1 % p.a.
  const { r: x, exact } = rateFromI(P, n, I);
  if (!exact) throw new Error('work: findR inexact');
  const lines = [];
  if (MV !== null) lines.push(r`Total deposited $= ${tm(P)} \times ${n} = ${tm(P * n)}$, so $I = ${tm(MV)} - ${tm(P * n)} = ${tm(I)}$.`);
  lines.push(r`$I = ${tm(P)} \times ${NN(n)} \times \dfrac{r}{100} = ${dec(k)}r$.`);
  lines.push(r`So $${dec(k)}r = ${tm(I)}$, giving $r = \dfrac{${tm(I)}}{${dec(k)}} = ${dec(x)}$.`);
  return { r: x, k: +dec(k), lines };
}
/** Working for the number of months from the maturity value: quadratic, factorised, negative root rejected. */
export function findN(P, x, MV) {
  const q = monthsFromMV(P, x, MV);
  if (q.a !== 1) throw new Error('work: findN needs a monic reduced quadratic');
  const k = P * x / 2400; // coefficient of n(n+1)
  const m = -q.roots[0];
  return {
    ...q,
    k: +dec(k),
    lines: [
      r`$\text{MV} = P \times n + P \times \dfrac{n(n+1)}{2 \times 12} \times \dfrac{r}{100}$, so $${tm(MV)} = ${tm(P)}n + ${tm(P)} \times \dfrac{n(n+1)}{24} \times ${RR(x)}$.`,
      r`$${tm(MV)} = ${tm(P)}n + ${dec(k)}n(n+1)$, that is $${dec(k)}n^2 + ${dec(P + k)}n - ${tm(MV)} = 0$.`,
      r`Dividing by $${dec(k)}$: $n^2 + ${q.b}n - ${-q.c} = 0$.`,
      r`$(n - ${q.n})(n + ${m}) = 0$, so $n = ${q.n}$ or $n = -${m}$. The number of months cannot be negative, so $n = ${q.n}$.`,
    ],
  };
}
/** Working for the number of months from the interest: n(n+1) = 2400 I / (P r). */
export function findNfromI(P, x, I) {
  const q = monthsFromI(P, x, I);
  const K = -q.c;
  return {
    ...q,
    K,
    lines: [
      r`$${tm(I)} = ${tm(P)} \times \dfrac{n(n+1)}{2 \times 12} \times ${RR(x)}$, so $n(n+1) = \dfrac{${tm(I)} \times 2400}{${tm(P)} \times ${x}} = ${K}$.`,
      r`$n^2 + n - ${K} = 0 \Rightarrow (n - ${q.n})(n + ${q.n + 1}) = 0$, so $n = ${q.n}$ (the root $-${q.n + 1}$ is rejected).`,
    ],
  };
}
