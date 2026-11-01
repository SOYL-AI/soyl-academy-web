// LaTeX working lines for shares-and-dividends problems, generated from the exact arithmetic in fin.mjs.
// Keys and final values are typed as literals in questions.mjs and build.mjs; the checks compare those
// literals with fin.mjs and with the numbers inside these generated lines.
import { invest, dps, income, proceeds, sharesFor, sharesForIncome, returnQ, mvForReturn, rateForReturn, marketValue, quote, sellReinvest, inr, pctTex, money, mul, div, whole } from './fin.mjs';

const r = String.raw;
/** A number for use inside $...$: plain digits below one lakh (so the arithmetic lint can read it), grouped above. */
export const tm = (x) => (Math.abs(x) < 100000 ? String(+x.toFixed(2) === Math.round(x) ? Math.round(x) : x.toFixed(2)) : inr(x, { tex: true }));
/** A rupee amount in prose: ₹12,345 or ₹3.75. */
export const rs = (x) => `₹${inr(x)}`;
/** A rate for use inside $...$ (no trailing zeros). */
const rt = (x) => String(+(+x).toFixed(4));

/** "Market value = FV + p/100 x FV = MV" (premium or discount given as a per cent of the face value). */
export function MVpctLine(FV, { premiumPct, discountPct }) {
  const p = premiumPct ?? discountPct;
  const m = marketValue(FV, premiumPct !== undefined ? { premiumPct } : { discountPct });
  return r`\text{MV} = ${tm(FV)} ${premiumPct !== undefined ? '+' : '-'} \dfrac{${rt(p)}}{100} \times ${tm(FV)} = ${tm(m)}`;
}
/** "Dividend on one share = FV x r/100 = d" */
export const DPSline = (FV, rate) => r`\text{Dividend on one share} = ${tm(FV)} \times \dfrac{${rt(rate)}}{100} = ${tm(dps(FV, rate))}`;
/** "Number of shares = investment / MV = n" */
export const Nline = (inv, MV) => r`\text{Number of shares} = \dfrac{${tm(inv)}}{${tm(MV)}} = ${sharesFor(inv, MV)}`;
/** "Investment = n x MV = I" */
export const INVline = (n, MV) => r`\text{Investment} = ${n} \times ${tm(MV)} = ${tm(money(mul(whole(n), MV)))}`;
/** "Income = n x FV x r/100 = A" */
export const INCline = (n, FV, rate, label = 'Income') => r`\text{${label}} = ${n} \times ${tm(FV)} \times \dfrac{${rt(rate)}}{100} = ${tm(income(n, FV, rate))}`;
/** "Return = income / investment x 100% = R%" */
export const RETline = (inc, inv) => r`\text{Return} = \dfrac{${tm(inc)}}{${tm(inv)}} \times 100\% = ${pctTex(mul(div(inc, inv), 100))}\%`;
/** "Return = dividend on one share / MV x 100% = R%" */
export const RETshare = (FV, rate, MV) => r`\text{Return} = \dfrac{${tm(dps(FV, rate))}}{${tm(MV)}} \times 100\% = ${pctTex(returnQ(FV, rate, MV))}\%`;
/** "Sale proceeds = n x price = P" */
export const PROCline = (n, price) => r`\text{Sale proceeds} = ${n} \times ${tm(price)} = ${tm(proceeds(n, price))}`;

/** Working for a purchase: number of shares, dividend on one share, income, optionally the return. */
export function buyLines({ investment, n, FV, MV, rate, ret = false }) {
  const v = invest({ investment, n, FV, MV, rate });
  const lines = [];
  lines.push(investment !== undefined ? `$${Nline(investment, MV)}$.` : `$${INVline(n, MV)}$.`);
  lines.push(`$${DPSline(FV, rate)}$, so $${INCline(v.n, FV, rate)}$.`);
  if (ret) lines.push(`$${RETline(v.income, v.investment)}$.`);
  return { v, lines };
}
/** Working for selling and reinvesting. */
export function sellLines(o) {
  const s = sellReinvest(o);
  const lines = [
    `$${INCline(o.n, o.FV1, o.rate1, 'Old income')}$.`,
    `$${PROCline(o.n, o.sellAt)}$.`,
    `$${Nline(s.proceeds, o.MV2)}$ new shares.`,
    `$${INCline(s.n2, o.FV2, o.rate2, 'New income')}$.`,
    s.change === 0 ? `Change in income $= ${tm(s.after)} - ${tm(s.before)} = 0$: no change.` : `Change in income $= ${tm(s.after)} - ${tm(s.before)} = ${tm(s.change)}$: ${s.change > 0 ? 'an increase' : 'a decrease'} of ${rs(Math.abs(s.change))}.`,
  ];
  return { s, lines };
}
/** Working for the number of shares (and investment) needed for a target income. */
export function incomeTargetLines(target, FV, rate, MV) {
  const n = sharesForIncome(target, FV, rate);
  const lines = [`$${DPSline(FV, rate)}$.`, r`$\text{Number of shares} = \dfrac{${tm(target)}}{${tm(dps(FV, rate))}} = ${n}$.`];
  if (MV !== undefined) lines.push(`$${INVline(n, MV)}$.`);
  return { n, lines };
}
/** Working for the market value that gives a stated return. */
export function mvForReturnLines(FV, rate, ret) {
  const m = mvForReturn(FV, rate, ret);
  return { MV: m, lines: [`$${DPSline(FV, rate)}$.`, r`For a return of $${rt(ret)}\%$: $\dfrac{${tm(dps(FV, rate))}}{\text{MV}} \times 100 = ${rt(ret)}$, so $\text{MV} = \dfrac{${tm(dps(FV, rate))} \times 100}{${rt(ret)}} = ${tm(m)}$.`] };
}
/** Working for the rate of dividend that gives a stated return at a market value. */
export function rateForReturnLines(FV, MV, ret) {
  const x = rateForReturn(FV, MV, ret);
  const d = money(div(mul(ret, MV), 100));
  return { rate: x, lines: [r`Return $${rt(ret)}\%$ on ₹$${tm(MV)}$ means a dividend of $${tm(MV)} \times \dfrac{${rt(ret)}}{100} = ${tm(d)}$ on each share.`, r`So $${tm(FV)} \times \dfrac{r}{100} = ${tm(d)}$, giving $r = \dfrac{${tm(d)} \times 100}{${tm(FV)}} = ${rt(x)}$.`] };
}
/** Description of a quote. */
export function quoteWords(FV, MV) {
  const q = quote(FV, MV);
  return q.status === 'par' ? 'at par' : `at a ${q.status} of ${rs(q.amount)} (${rt(q.pct)}% of the face value)`;
}
