// Question helpers for ISC 11 Mathematics ch18: value formatting, markdown tables and working text generated from the exact data,
// so that every number in a stem, solution or model answer comes from the same computation the check re-solves.
import { Q, mk } from './lib.mjs';
import { Fr, fr, T, tex, Dist, cls, sdTex, sdRound, cvRound, dirTable, shortTable, stepTable, mdTable, sums, combine, checkCombine, correct, checkCorrect, synth, surdOk } from './stat2.mjs';
import { freqMd, list } from './stat.mjs';

export { Q, mk, Fr, fr, T, tex, Dist, cls, sdTex, sdRound, cvRound, sums, combine, checkCombine, correct, checkCorrect, synth, freqMd, list, surdOk, dirTable, shortTable, stepTable, mdTable };
export const r = String.raw;
export const $ = (x) => `$${x}$`;
/** Option/inline text of a value: Fr -> $tex$, {tex} -> $tex$, string kept. */
export const ft = (v) => (v instanceof Fr ? $(tex(v)) : v && typeof v === 'object' && 'tex' in v ? $(v.tex) : String(v));
export const XB = r`\bar{x}`;
/** Markdown table from a {head, rows} working table. */
const absBars = (c) => c.replace(/\|([^|$]+?)\|/g, (m, g) => `\\lvert ${g}\\rvert`);
export const md = ({ head, rows }) => `| ${head.map(absBars).join(' | ')} |\n|${'---|'.repeat(head.length)}\n${rows.map((row) => `| ${row.map(absBars).join(' | ')} |`).join('\n')}`;
/** Wrap table cells that are plain numbers in $...$ so the markdown renders consistently (labels stay text). */
export const mdn = (t) => ({ head: t.head, rows: t.rows.map((row) => row.map((c) => (/^-?\d+(\.\d+)?$/.test(c) ? $(c) : c))) });
export const num = (x) => T(x);

/** Multiple-choice item whose first option is the key. vals = [[value, why-wrong]...]; sol = method sentence(s); ok = boolean re-solve; msg describes it. */
export function MQ(id, o) {
  const opts = o.vals.map(([v]) => ft(v));
  const why = o.vals.slice(1).map(([v, w]) => `The value ${ft(v)} ${w}.`).join(' ');
  Q(id, mk.mcq({ key: 'a', stem: o.stem, opts, sol: (o.stmt ? o.sol : undefined) ?? `${o.sol} ${why}`, d: o.d, c: o.c, t: o.t, time: o.time ?? 75 }), (C) => {
    C.assert(o.ok, o.msg);
    C.assert(new Set(opts).size === 4, 'four distinct option texts');
    if (o.truth !== undefined) C.which(opts, ft(o.truth));
    else C.key('a');
  });
}
/** Numeric answer text helper: an exact fraction as a decimal when terminating. */
export const dec = (x) => T(x);
export const sdAns = (v, dp = 2) => (fr(v).sqrt() ? T(fr(v).sqrt()) : sdRound(v, dp));
/** Working text for the mean deviation about the mean (raw, discrete or grouped). */
export function mdWork(d) {
  const m = d.mean;
  if (d.kind === 'raw') {
    const devs = d.x.map((x) => T(x.sub(m).abs())).join(' + ');
    const s = d.sumF((x) => x.sub(m).abs());
    return `$\\bar{x} = \\dfrac{${T(d.sumFx)}}{${T(d.n)}} = ${T(m)}$. The absolute deviations are $${devs} = ${T(s)}$, so the mean deviation is $\\dfrac{${T(s)}}{${T(d.n)}} = ${T(d.mdMean)}$.`;
  }
  const s = d.sumF((x) => x.sub(m).abs());
  return `Working table (class marks $x$ where the data are grouped):\n\n${md(mdn(mdTable(d, m, XB)))}\n\n$n = ${T(d.n)}$, $\\bar{x} = \\dfrac{${T(d.sumFx)}}{${T(d.n)}} = ${T(m)}$, and the mean deviation is $\\dfrac{\\sum f\\lvert x - \\bar{x}\\rvert}{n} = \\dfrac{${T(s)}}{${T(d.n)}} = ${T(d.mdMean)}$.`;
}
/** Working text for the variance and SD by the direct method. dp: places for a non-exact SD. */
export function dirWork(d, dp = 2) {
  const m = d.mean, ss = d.sumF((x) => x.sub(m).pow(2));
  const t = d.kind === 'raw' ? `Deviations $x - \\bar{x}$: ${d.x.map((x) => T(x.sub(m))).join(', ')}; squares: ${d.x.map((x) => T(x.sub(m).pow(2))).join(', ')}.` : md(mdn(dirTable(d)));
  return `$\\bar{x} = \\dfrac{${T(d.sumFx)}}{${T(d.n)}} = ${T(m)}$.\n\n${t}\n\n$\\sum${d.kind === 'raw' ? '' : ' f'}(x - \\bar{x})^2 = ${T(ss)}$, so $\\sigma^2 = \\dfrac{${T(ss)}}{${T(d.n)}} = ${T(d.variance)}$ and ${sdSentence(d.variance, dp)}`;
}
/** "$\sigma = ...$." sentence for a variance: exact value or surd with decimal. */
export function sdSentence(v, dp = 2) {
  v = fr(v);
  if (v.sqrt()) return `$\\sigma = \\sqrt{${T(v)}} = ${T(v.sqrt())}$.`;
  const plain = `\\sqrt{${T(v)}}`;
  if (sdTex(v) === plain) return `$\\sigma = ${plain} \\approx ${sdRound(v, dp)}$.`;
  return `$\\sigma = \\sqrt{${T(v)}} = ${sdTex(v)} \\approx ${sdRound(v, dp)}$.`;
}
/** Working text for the short-cut method with assumed mean A. */
export function shortWork(d, A, dp = 2) {
  const s = sums(d, A), n = d.n;
  const t = d.kind === 'raw' ? `Deviations $d = x - ${T(fr(A))}$: ${d.x.map((x) => T(x.sub(A))).join(', ')}; squares: ${d.x.map((x) => T(x.sub(A).pow(2))).join(', ')}.` : md(mdn(shortTable(d, A)));
  const v = s.sd2.div(n).sub(s.sd.div(n).pow(2));
  return `${d.kind === 'raw' ? '' : 'Working table:\n\n'}${t}\n\n$\\sum${d.kind === 'raw' ? ' ' : ' f'}d = ${T(s.sd)}$, $\\sum${d.kind === 'raw' ? ' ' : ' f'}d^2 = ${T(s.sd2)}$, $n = ${T(n)}$. Then $\\sigma^2 = \\dfrac{${T(s.sd2)}}{${T(n)}} - \\left(\\dfrac{${T(s.sd)}}{${T(n)}}\\right)^2 = ${T(s.sd2.div(n))} - ${T(s.sd.div(n).pow(2))} = ${T(v)}$ and ${sdSentence(v, dp)}`;
}
/** Working text for the step-deviation method. */
export function stepWork(d, A, h, dp = 2) {
  const s = sums(d, A, h), n = d.n, hh = fr(h);
  const v = hh.pow(2).mul(s.su2.div(n).sub(s.su.div(n).pow(2)));
  return `Working table:\n\n${md(mdn(stepTable(d, A, h)))}\n\n$\\sum fu = ${T(s.su)}$, $\\sum fu^2 = ${T(s.su2)}$, $n = ${T(n)}$. Then $\\sigma^2 = ${T(hh)}^2\\left[\\dfrac{${T(s.su2)}}{${T(n)}} - \\left(\\dfrac{${T(s.su)}}{${T(n)}}\\right)^2\\right] = ${T(hh.pow(2))} \\times ${T(s.su2.div(n).sub(s.su.div(n).pow(2)))} = ${T(v)}$ and ${sdSentence(v, dp)}`;
}
/** Combined statistics of two groups, as working text. */
export function combWork(g1, g2, dp = 2) {
  const c = combine(g1, g2);
  const n1 = fr(g1.n), n2 = fr(g2.n), m1 = fr(g1.mean), m2 = fr(g2.mean), v1 = fr(g1.var), v2 = fr(g2.var);
  const t1 = n1.mul(v1.add(c.d1.pow(2))), t2 = n2.mul(v2.add(c.d2.pow(2)));
  return `Combined mean $= \\dfrac{${T(n1)}(${T(m1)}) + ${T(n2)}(${T(m2)})}{${T(c.n)}} = \\dfrac{${T(n1.mul(m1).add(n2.mul(m2)))}}{${T(c.n)}} = ${T(c.mean)}$. Then $d_1 = ${T(m1)} - ${T(c.mean)} = ${T(c.d1)}$ and $d_2 = ${T(m2)} - ${T(c.mean)} = ${T(c.d2)}$.\n\n$\\sigma^2 = \\dfrac{${T(n1)}(${T(v1)} + ${T(c.d1.pow(2))}) + ${T(n2)}(${T(v2)} + ${T(c.d2.pow(2))})}{${T(c.n)}} = \\dfrac{${T(t1)} + ${T(t2)}}{${T(c.n)}} = ${T(c.var)}$, so ${sdSentence(c.var, dp)}`;
}
/** Working text for correcting one observation from n, wrong mean, wrong variance. */
export function corrWork(n, wm, wv, wrong, right, dp = 2) {
  const c = correct(n, wm, wv, wrong, right);
  return `$\\sum x = ${T(fr(n))} \\times ${T(fr(wm))} = ${T(c.sx)}$ and $\\sum x^2 = ${T(fr(n))}(${T(fr(wv))} + ${T(fr(wm).pow(2))}) = ${T(c.sx2)}$. Remove ${T(fr(wrong))} and add ${T(fr(right))}: $\\sum x = ${T(c.sx)} - ${T(fr(wrong))} + ${T(fr(right))} = ${T(c.nsx)}$ and $\\sum x^2 = ${T(c.sx2)} - ${T(fr(wrong).pow(2))} + ${T(fr(right).pow(2))} = ${T(c.nsx2)}$. The corrected mean is $\\dfrac{${T(c.nsx)}}{${T(fr(n))}} = ${T(c.mean)}$ and the corrected variance is $\\dfrac{${T(c.nsx2)}}{${T(fr(n))}} - ${T(c.mean.pow(2))} = ${T(c.var)}$, so ${sdSentence(c.var, dp)}`;
}
/** Frequency table markdown for a stem (discrete or grouped). */
export const ftab = (d, first, second = 'Frequency') => freqMd(d, { first, second });
