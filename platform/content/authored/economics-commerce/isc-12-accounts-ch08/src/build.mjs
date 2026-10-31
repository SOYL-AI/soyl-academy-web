// Build ISC 12 Accounts ch08 Redemption of Debentures. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-accounts-ch08/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';
import { rs, inr, check, sum, journal, tAccount, Ledger, drrNeeded, driNeeded, redeem, retained, instalmentPlan, KINDS, rw, words, SURPLUS, DRR, DRI, IDRI, GR, DH, BANK, PRD, PL } from './acc.mjs';

setUnit('isc-12-accounts-ch08', 'economics-commerce');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const eq = (a, b, what) => check(JSON.stringify(a) === JSON.stringify(b), `deck figure ${what}: got ${JSON.stringify(a)}, expected ${JSON.stringify(b)}`);
const jt = (entries, alt, caption) => {
  const j = journal(entries);
  return table(j.headers, j.rows, alt, caption);
};
const lt = (acc, alt, caption) => table(acc.headers, acc.rows, alt, caption);

// ---------------------------------------------------------------- deck figures (computed, never typed)
// Part 1 running company: Sarthebari Bell Metal Ltd, Sarthebari (imagined), an unlisted company with
// 20,000 9% debentures of ₹100 each, redeemable at par in one lump sum on 31 March 2027.
const SB = { n: 20000, nominal: 2000000, drrOpen: 50000, surplus: 900000 };
const SB1 = drrNeeded({ kind: 'unlisted', outstanding: SB.nominal, existing: SB.drrOpen });
eq([SB1.required, SB1.transfer], [200000, 150000], 'WE1');
check(SB1.transfer <= SB.surplus, 'WE1 surplus covers the transfer');
const SB1e = { date: '31 Mar 2026', dr: [[SURPLUS, SB1.transfer]], cr: [[DRR, SB1.transfer]], nar: 'profits transferred to bring the reserve up to ten per cent of the outstanding debentures' };
const SB1led = new Ledger().open(DRR, 'cr', SB.drrOpen, '1 Apr 2025').post([SB1e]);
const SB1ac = SB1led.render(DRR, '31 Mar 2026');
eq(-SB1ac.closing, 200000, 'WE1 reserve carried down');
// WE2: four imagined companies, each with ₹50,00,000 outstanding and ₹20,00,000 maturing in 2026-27.
const W2 = [
  ['Hajo Silk Reelers Ltd', 'listed'],
  ['Ponduru Khadi Mills Ltd', 'unlisted'],
  ['Mangalagiri Urban Bank Ltd', 'bank'],
  ['Gadwal Home Finance Ltd', 'nbfc'],
].map(([name, kind]) => ({ name, kind, drr: drrNeeded({ kind, outstanding: 5000000 }).required, dri: driNeeded({ kind, maturing: 2000000 }) }));
eq(W2.map((x) => [x.drr, x.dri]), [[0, 300000], [500000, 300000], [0, 0], [0, 0]], 'WE2');
// WE3: Sarthebari's investment for the debentures maturing in 2026-27.
const SB3 = driNeeded({ kind: 'unlisted', maturing: SB.nominal });
eq(SB3, 300000, 'WE3');
const SB3e = { date: '30 Apr 2026', dr: [[DRI, SB3]], cr: [[BANK, SB3]], nar: 'fifteen per cent of the debentures maturing in 2026-27 deposited with a scheduled bank' };
// WE4: had Sarthebari chosen to redeem wholly out of profits (surplus ₹26,00,000 on 1 April 2026).
const SB4 = { surplus: 2600000 };
SB4.stat = redeem({ n: SB.n, rate: 9, kind: 'unlisted', source: 'statutory', drrOpen: SB1.after, surplus: SB4.surplus });
SB4.prof = redeem({ n: SB.n, rate: 9, kind: 'unlisted', source: 'profits', drrOpen: SB1.after, surplus: SB4.surplus, dates: { drr: '1 Apr 2026', due: '31 Mar 2027' } });
eq([SB4.stat.transfer, SB4.stat.drrTotal, SB4.prof.transfer, SB4.prof.drrTotal, SB4.prof.driAmt], [0, 200000, 1800000, 2000000, 300000], 'WE4');
const SB4left = { stat: SB4.surplus - SB4.stat.transfer, prof: SB4.surplus - SB4.prof.transfer };
eq([SB4left.stat, SB4left.prof], [2600000, 800000], 'WE4 surplus left');
// WE5: Etikoppaka Lacquer Toys Ltd (imagined), listed, redeems out of capital.
const ET = redeem({ n: 8000, rate: 10, kind: 'listed', source: 'capital', driRate: 7, driMonths: 9, dates: { dri: '30 Apr 2025', due: '31 Jan 2026', close: '31 Mar 2026' } });
eq([ET.transfer, ET.driAmt, ET.interest, ET.repayable, ET.drrTotal], [0, 120000, 6300, 800000, 0], 'WE5');
const RET = ['capital', 'statutory', 'profits'].map((s) => [s, retained(SB.nominal, s)]);
eq(RET.map(([, v]) => v), [0, 200000, 2000000], 'retained bars');

// Part 2 running company: Pembarthi Brass Fittings Ltd, Pembarthi (imagined), unlisted: 10,000 10%
// debentures of ₹100 each, redeemable at par in one lump sum on 31 March 2026.
const PB = redeem({ n: 10000, rate: 10, kind: 'unlisted', drrOpen: 60000, surplus: 500000, bankOpen: 1200000, driRate: 8, driMonths: 11, dates: { open: '1 Apr 2025', drr: '1 Apr 2025', dri: '30 Apr 2025', due: '31 Mar 2026', close: '31 Mar 2026' } });
eq([PB.transfer, PB.drrTotal, PB.driAmt, PB.interest, PB.repayable, PB.bankClose], [40000, 100000, 150000, 11000, 1000000, 211000], 'WE6');
const PBdrr = PB.led.render(DRR);
const PBdh = PB.led.render(DH);
// WE7: Aranmula Mirror Works Ltd (imagined), unlisted, redeems at a premium of 5%.
const AM = redeem({ n: 6000, rate: 11, red: 5, kind: 'unlisted', drrOpen: 60000, driRate: 6, driMonths: 5, dates: { open: '1 Apr 2025', dri: '30 Apr 2025', due: '30 Sep 2025', close: '30 Sep 2025' } });
eq([AM.transfer, AM.redPremium, AM.repayable, AM.driAmt, AM.interest], [0, 30000, 630000, 90000, 2250], 'WE7');
// Instalment picture (concepts only): Bobbili Veena Makers Ltd (imagined), ₹8,00,000 in four draws.
const BV = instalmentPlan({ total: 800000, years: 4, first: 2027 });
eq(BV.rows.map((r) => [r.before, r.after, r.dri]), [[800000, 600000, 30000], [600000, 400000, 30000], [400000, 200000, 30000], [200000, 0, 30000]], 'instalment picture');

// ---------------------------------------------------------------- visuals: Part 1
const vRoute1 = flow('LR', ['Why debentures need planning for repayment', 'Debenture Redemption Reserve: who and how much', 'Debenture Redemption Investment: 15% by 30 April', 'Out of profits or out of capital'], 'Route map of Part 1: why repayment of debentures must be planned, who must keep a debenture redemption reserve and how much, the fifteen per cent investment made by the thirtieth of April, and redemption out of profits or out of capital', 'Part 1 at a glance');
const vMethods = flow('TB', ['Redemption: repaying the debentureholders', 'Method: one lump sum at maturity, or instalments by draw of lots', 'Source: out of capital, or (partly or wholly) out of profits', 'Safeguards: Debenture Redemption Reserve and Debenture Redemption Investment'], 'Flow of the ideas in redemption: redemption means repaying the debentureholders; the method is a lump sum at maturity or instalments by draw of lots; the source is capital or profits; the safeguards are the reserve and the investment', 'Redemption: method, source and safeguards');
const vWho = table(
  ['Class of company (Rule 18(7), as amended in 2019)', 'Debenture Redemption Reserve', 'Debenture Redemption Investment'],
  ['aifi', 'bank', 'nbfc', 'listed', 'unlisted'].map((k) => [KINDS[k].label, KINDS[k].drr ? '**10%** of outstanding debentures' : 'Not required', KINDS[k].dri ? '**15%** of debentures maturing in the year' : 'Not required']),
  'Table of who must keep the reserve and the investment: All India Financial Institutions, banking companies and unlisted non-banking or housing finance companies with privately placed debentures need neither; listed companies need no reserve but must make the fifteen per cent investment; other unlisted companies need a ten per cent reserve and the fifteen per cent investment',
  'Section 71(4): the reserve comes out of profits available for dividend and is used only for redemption.',
);
const vWE1 = jt([SB1e], `Journal of worked example one: Sarthebari Bell Metal transfers ${inr(SB1.transfer)} from its surplus to the debenture redemption reserve, raising it from ${inr(SB.drrOpen)} to ${inr(SB1.required)}, ten per cent of ${inr(SB.nominal)}`, `Sarthebari Bell Metal Ltd (imagined): minimum 10% × ${rs(SB.nominal)} = ${rs(SB1.required)}; held ${rs(SB.drrOpen)}.`);
const vDRRac = lt(SB1ac, `Debenture redemption reserve account of Sarthebari for the year: balance brought down ${inr(SB.drrOpen)}, by surplus ${inr(SB1.transfer)}, balance carried down ${inr(SB1.required)}`, 'Debenture Redemption Reserve Account, 2025-26');
const vWE2 = table(
  ['Imagined company', 'Class', 'Minimum reserve (₹)', 'Minimum investment by 30 April 2026 (₹)'],
  W2.map((x) => [x.name, KINDS[x.kind].label, x.drr ? inr(x.drr) : 'Nil', x.dri ? inr(x.dri) : 'Nil']),
  `Table of worked example two: four companies each with ${inr(5000000)} of debentures outstanding and ${inr(2000000)} maturing next year; the listed company keeps no reserve but invests ${inr(W2[0].dri)}; the unlisted company keeps a reserve of ${inr(W2[1].drr)} and invests ${inr(W2[1].dri)}; the bank and the housing finance company need neither`,
  'Reserve: 10% of ₹50,00,000 outstanding. Investment: 15% of the ₹20,00,000 maturing.',
);
const vForms = table(
  ['Rule', 'Debenture Redemption Investment'],
  [
    ['Who', 'Listed companies and other unlisted companies (not banks, All India Financial Institutions, or unlisted NBFCs and HFCs on private placement)'],
    ['How much', 'At least **15%** of the debentures **maturing during the year** ending on the next 31 March'],
    ['By when', 'On or before **30 April** of that year'],
    ['Where', 'Scheduled bank deposits free from charge or lien; unencumbered Central or State Government securities; unencumbered trust securities and notified bonds under the Indian Trusts Act, 1882'],
    ['Use', 'Only to redeem the debentures maturing that year; never below 15% of them'],
  ],
  'Table of the investment rule: listed and ordinary unlisted companies must invest at least fifteen per cent of the debentures maturing in the year, by the thirtieth of April, in bank deposits free from charge, government securities or trust securities, and use it only to redeem those debentures',
);
const vWE3 = jt([SB3e], `Journal of worked example three: on the thirtieth of April twenty twenty-six Sarthebari deposits ${inr(SB3)}, fifteen per cent of its ${inr(SB.nominal)} of debentures maturing in that year`, `15% × ${rs(SB.nominal)} = ${rs(SB3)}.`);
const vBars = (() => {
  const s = new Svg(640, 230);
  const X0 = 210, W = 380, max = SB.nominal;
  const rows = [['9% Debentures outstanding', SB.nominal, 'fill'], ['Reserve (10%): profit kept back', SB1.required, 'yellow'], ['Investment (15%): money set aside', SB3, 'green']];
  s.text(320, 24, 'Sarthebari Bell Metal Ltd: the two safeguards beside the debt', { size: 14, bold: true });
  rows.forEach(([label, v, color], i) => {
    const y = 50 + i * 55;
    const w = (W * v) / max;
    check(w > 0 && w <= W, 'bar width within the frame');
    s.text(X0 - 10, y + 18, label, { size: 12, anchor: 'end' });
    s.rect(X0, y, w, 36, { fill: color, color: 'accent', sw: 1.5, rx: 2 });
    s.text(X0 + w + 8, y + 18, rs(v), { size: 12, bold: true, anchor: 'start' });
  });
  check(SB1.required * 10 === SB.nominal && SB3 * 100 === SB.nominal * 15, 'bars at ten and fifteen per cent');
  s.text(320, 215, 'The reserve sits in equity; the investment is an asset that can be encashed.', { size: 12, muted: true });
  return s.visual(`Three horizontal bars for Sarthebari: debentures of ${rw(SB.nominal)} at full length, the reserve of ${rw(SB1.required)} at one tenth of it, and the investment of ${rw(SB3)} at fifteen hundredths of it`, 'Bar lengths are computed from the figures.');
})();
const vDiff = table(
  ['Point', 'Debenture Redemption Reserve', 'Debenture Redemption Investment'],
  [
    ['What it is', 'Profit kept back (a reserve)', 'Money deposited or invested (an asset)'],
    ['Amount', '10% of outstanding debentures', '15% of debentures maturing in the year'],
    ['Entry', 'Surplus Dr. To Debenture Redemption Reserve', 'Debenture Redemption Investment Dr. To Bank'],
    ['Balance Sheet', 'Reserves and Surplus', 'Current investments'],
    ['After redemption', 'Transferred to General Reserve', 'Encashed to pay the holders'],
  ],
  'Table contrasting the reserve and the investment: the reserve is profit kept back, ten per cent of outstanding debentures, shown in reserves and surplus and moved to general reserve after redemption; the investment is money set aside, fifteen per cent of debentures maturing in the year, shown as a current investment and encashed to pay the holders',
);
const vSources = table(
  ['Source', 'Transfer before redemption', 'Who may use it', 'After redemption'],
  [
    ['Out of capital', 'None', 'A company exempt from the reserve (e.g. a listed company)', 'Nothing to transfer'],
    ['Partly out of profits', 'Statutory minimum: 10% of outstanding debentures', 'Any company; the minimum for an unlisted company', 'Reserve → General Reserve'],
    ['Wholly out of profits', 'Up to the full face value to be redeemed', 'Any company that chooses it', 'Reserve → General Reserve'],
  ],
  'Table of the sources of redemption: out of capital with no transfer, open to a company exempt from the reserve; partly out of profits with the ten per cent minimum; wholly out of profits with a transfer up to the full face value; in both profit cases the reserve goes to general reserve after redemption',
);
const vWE4 = table(
  ['Sarthebari, 1 April 2026', 'Partly out of profits (statutory)', 'Wholly out of profits'],
  [
    ['Reserve already held', inr(SB1.after), inr(SB1.after)],
    ['Further transfer from surplus', SB4.stat.transfer ? inr(SB4.stat.transfer) : 'Nil', inr(SB4.prof.transfer)],
    ['Reserve before redemption', inr(SB4.stat.drrTotal), inr(SB4.prof.drrTotal)],
    ['Surplus left for dividend', inr(SB4left.stat), inr(SB4left.prof)],
    ['To General Reserve after redemption', inr(SB4.stat.drrTotal), inr(SB4.prof.drrTotal)],
    ['Investment by 30 April 2026', inr(SB4.stat.driAmt), inr(SB4.prof.driAmt)],
  ],
  `Table of worked example four comparing Sarthebari's two choices with a surplus of ${inr(SB4.surplus)}: partly out of profits needs no further transfer and leaves the whole surplus; wholly out of profits needs a further ${inr(SB4.prof.transfer)}, leaving ${inr(SB4left.prof)}; the general reserve later receives ${inr(SB4.stat.drrTotal)} or ${inr(SB4.prof.drrTotal)}; the investment is ${inr(SB4.prof.driAmt)} either way`,
  `Wholly out of profits: ${SURPLUS} Dr. To Debenture Redemption Reserve A/c ${rs(SB4.prof.transfer)}.`,
);
const vWE5 = jt(ET.entries, `Journal of worked example five: Etikoppaka Lacquer Toys, a listed company, deposits ${inr(ET.driAmt)}, encashes it with ${inr(ET.interest)} interest, repays ${inr(ET.repayable)} to its debentureholders and closes the interest; no reserve is created`, 'Etikoppaka Lacquer Toys Ltd (imagined, listed): 8,000 10% debentures redeemed at par on 31 January 2026, out of capital.');
const vRetained = (() => {
  const s = new Svg(640, 260);
  const base = 210, H = 150, X0 = 90, gap = 170, bw = 110;
  const label = { capital: 'Out of capital', statutory: 'Partly out of profits', profits: 'Wholly out of profits' };
  s.text(320, 22, `Profit kept back before repaying ${rs(SB.nominal)} of debentures`, { size: 14, bold: true });
  s.line(40, base, 600, base, { sw: 1.4 });
  RET.forEach(([src, v], i) => {
    const h = (H * v) / SB.nominal;
    const x = X0 + i * gap;
    if (h) s.rect(x, base - h, bw, h, { fill: i === 2 ? 'blue' : 'yellow', color: 'accent', sw: 1.4, rx: 2 });
    s.text(x + bw / 2, base - h - 12, v ? rs(v) : 'Nil', { size: 12, bold: true });
    s.text(x + bw / 2, base + 18, label[src], { size: 12 });
  });
  check(RET[2][1] === SB.nominal && RET[1][1] * 10 === SB.nominal, 'retained bars scale');
  s.text(320, 248, 'After redemption, whatever was kept back moves to General Reserve.', { size: 12, muted: true });
  return s.visual(`Three columns for debentures of ${rw(SB.nominal)}: nothing kept back out of capital, ${rw(RET[1][1])} kept back partly out of profits, and the full ${rw(RET[2][1])} kept back wholly out of profits`, 'Column heights are computed from the figures.');
})();
const vSummary1 = table(
  ['Idea', 'Rule'],
  [
    ['Section 71(4)', 'Reserve out of profits available for dividend; used only to redeem debentures'],
    ['Reserve (unlisted companies)', '**10%** of outstanding debentures; none for listed companies, banks, AIFIs, unlisted NBFCs/HFCs on private placement'],
    ['Investment', '**15%** of debentures maturing in the year, by **30 April**; listed and other unlisted companies'],
    ['Out of capital', 'No transfer from profits; only for companies exempt from the reserve'],
    ['Out of profits', 'Partly: the 10%; wholly: up to the full face value; reserve → General Reserve after redemption'],
  ],
  'Summary table of Part 1: the reserve comes out of profits available for dividend and is used only for redemption; ten per cent for unlisted companies; fifteen per cent investment by the thirtieth of April for listed and other unlisted companies; out of capital means no transfer; out of profits means the ten per cent or the full face value, later moved to general reserve',
);

// ---------------------------------------------------------------- visuals: Part 2
const vRoute2 = flow('LR', ['Lump sum at par: the full year of entries', 'Closing every account', 'Lump sum at a premium', 'Instalments by draw of lots (concepts)', 'Balance Sheet placement'], 'Route map of Part 2: a full year of entries for a lump-sum redemption at par, closing every account, redemption at a premium, the idea of instalments by draw of lots, and where the items appear in the balance sheet', 'Part 2 at a glance');
const vSteps = flow('TB', ['Before redemption: top up the reserve (Surplus → Debenture Redemption Reserve)', 'By 30 April: invest 15% (Debenture Redemption Investment ← Bank)', 'On maturity: encash the investment with interest', "Debentures (and any premium) → Debentureholders' Account; pay them", 'Reserve → General Reserve; interest → Statement of Profit and Loss'], 'Flow of a lump-sum redemption: top up the reserve, invest fifteen per cent by the thirtieth of April, encash it with interest on maturity, transfer the debentures and any premium to the debentureholders and pay them, then move the reserve to general reserve and the interest to the statement of profit and loss', 'Lump-sum redemption, step by step');
const vEntries = table(
  ['Step', 'Journal entry'],
  [
    ['Transfer to reserve', `${SURPLUS} Dr. To Debenture Redemption Reserve A/c`],
    ['Investment made', 'Debenture Redemption Investment A/c Dr. To Bank A/c'],
    ['Investment encashed', 'Bank A/c Dr. To Debenture Redemption Investment A/c, Interest on Debenture Redemption Investment A/c'],
    ['Amount due', "Debentures A/c Dr. (Premium on Redemption of Debentures A/c Dr.) To Debentureholders' A/c"],
    ['Payment', "Debentureholders' A/c Dr. To Bank A/c"],
    ['Reserve released', 'Debenture Redemption Reserve A/c Dr. To General Reserve A/c'],
    ['Interest closed', 'Interest on Debenture Redemption Investment A/c Dr. To Statement of Profit and Loss'],
  ],
  'Table of the seven journal entries of a lump-sum redemption: transfer to the reserve, investment made, investment encashed with interest, amount due to the debentureholders, payment, reserve released to general reserve, and interest closed to the statement of profit and loss',
);
const vWE6a = jt([PB.e.transfer, PB.e.invest], `Journal of worked example six, first part: Pembarthi transfers ${inr(PB.transfer)} to raise its reserve from ${inr(PB.drrOpen)} to ${inr(PB.drrTotal)}, and deposits ${inr(PB.driAmt)} with a scheduled bank on the thirtieth of April`, `Pembarthi Brass Fittings Ltd (imagined): 10,000 10% debentures of ₹100, redeemable at par on 31 March 2026.`);
const vWE6b = jt([PB.e.encash, PB.e.due, PB.e.paid, PB.e.toGR, PB.e.toPL], `Journal of worked example six, second part: the deposit returns with interest of ${inr(PB.interest)}, ${inr(PB.repayable)} falls due to the debentureholders and is paid, the reserve of ${inr(PB.drrTotal)} goes to general reserve and the interest is closed`, `Interest: ${rs(PB.driAmt)} × 8% × 11/12 = ${rs(PB.interest)}.`);
const sideAmt = (b) => (b > 0 ? `Dr ${inr(b)}` : b < 0 ? `Cr ${inr(-b)}` : 'Nil');
const openOf = (led, name) => {
  const a = led.acs.get(name);
  return sum(a.dr.filter((r) => r[1] === 'Balance b/d').map((r) => r[2])) - sum(a.cr.filter((r) => r[1] === 'Balance b/d').map((r) => r[2]));
};
const CLOSE = [PB.deb, DRR, DRI, DH, GR, BANK].map((name) => [name, openOf(PB.led, name), PB.led.bal(name)]);
eq(CLOSE.map(([, o, c]) => [o, c]), [[-1000000, 0], [-60000, 0], [0, 0], [0, 0], [0, -100000], [1200000, 211000]], 'closing table');
const vClose = table(
  ['Account', '1 April 2025', '31 March 2026'],
  CLOSE.map(([name, o, c]) => [name.replace(/ A\/c$/, ''), sideAmt(o), sideAmt(c)]),
  `Table of Pembarthi's accounts at the start and end of the year: the debentures, the reserve, the investment and the debentureholders all end at nil; general reserve ends with a credit of ${inr(PB.drrTotal)}; the bank falls from ${inr(1200000)} to ${inr(PB.bankClose)}`,
  'Every account the redemption touches closes as it should; the build asserts each balance.',
);
const vDRRac2 = lt(PBdrr, `Debenture redemption reserve account of Pembarthi: balance brought down ${inr(PB.drrOpen)} and ${inr(PB.transfer)} from surplus on the credit side; ${inr(PB.drrTotal)} to general reserve on the debit side`, 'Debenture Redemption Reserve Account, 2025-26');
const vWaterfall = (() => {
  const s = new Svg(640, 270);
  const steps = [['Opening', 1200000], ['Invested', -PB.driAmt], ['Encashed with interest', PB.driAmt + PB.interest], ['Holders paid', -PB.repayable]];
  const top = 1300000, Y0 = 220, H = 170, X0 = 40, bw = 100, gap = 120;
  const Y = (v) => Y0 - (H * v) / top;
  s.text(320, 20, 'Pembarthi: bank balance through the redemption year', { size: 14, bold: true });
  s.line(30, Y0, 620, Y0, { sw: 1.4 });
  let run = 0;
  steps.forEach(([label, v], i) => {
    const from = i === 0 ? 0 : run;
    const to = i === 0 ? v : run + v;
    check(to >= 0 && to <= top, 'bank stays within the chart and never overdrawn');
    const x = X0 + i * gap;
    s.rect(x, Y(Math.max(from, to)), bw, Math.abs(Y(from) - Y(to)), { fill: v >= 0 ? 'green' : 'red', color: 'accent', sw: 1.2, rx: 2 });
    s.text(x + bw / 2, Y(Math.max(from, to)) - 10, i === 0 ? rs(v) : `${v > 0 ? '+' : '−'}${rs(Math.abs(v))}`, { size: 11, bold: true });
    s.text(x + bw / 2, Y0 + 16, label, { size: 11 });
    run = to;
  });
  check(run === PB.bankClose, 'waterfall ends at the closing bank balance');
  const x = X0 + steps.length * gap;
  s.rect(x, Y(run), bw, Y0 - Y(run), { fill: 'blue', color: 'accent', sw: 1.2, rx: 2 });
  s.text(x + bw / 2, Y(run) - 10, rs(run), { size: 11, bold: true });
  s.text(x + bw / 2, Y0 + 16, 'Closing', { size: 11 });
  s.text(320, 258, `Net change = interest ${rs(PB.interest)} − repayment ${rs(PB.repayable)}`, { size: 12, muted: true });
  return s.visual(`Waterfall of Pembarthi's bank balance: it opens at ${rw(1200000)}, falls by ${rw(PB.driAmt)} when the investment is made, rises by ${rw(PB.driAmt + PB.interest)} when it is encashed with interest, falls by ${rw(PB.repayable)} when the holders are paid, and closes at ${rw(PB.bankClose)}`, 'Bar positions are computed from the bank movements.');
})();
const vPrem = table(
  ['When', 'Entry'],
  [
    ['At issue (chapter 7)', 'Loss on Issue of Debentures A/c Dr. To Premium on Redemption of Debentures A/c'],
    ['Until redemption', 'Premium on Redemption shown as a liability (other long-term liabilities)'],
    ['On maturity', "Debentures A/c Dr., Premium on Redemption of Debentures A/c Dr. To Debentureholders' A/c"],
    ['Payment', "Debentureholders' A/c Dr. To Bank A/c (face value + premium)"],
  ],
  'Table of how a premium on redemption is handled: it is credited to premium on redemption as a liability when the debentures are issued, and on maturity both the debentures and the premium are debited and the holders credited with the total, which is then paid',
);
const vWE7 = jt(AM.entries, `Journal of worked example seven: Aranmula Mirror Works deposits ${inr(AM.driAmt)}, encashes it with ${inr(AM.interest)} interest, debits the debentures ${inr(AM.nominal)} and premium on redemption ${inr(AM.redPremium)}, pays the holders ${inr(AM.repayable)}, releases its reserve of ${inr(AM.drrTotal)} and closes the interest`, 'Aranmula Mirror Works Ltd (imagined): 6,000 11% debentures redeemed at a premium of 5% on 30 September 2025.');
const vDH = lt(PBdh, `Debentureholders account of Pembarthi: credited with ${inr(PB.repayable)} for the debentures due and debited with the same amount when paid, closing at nil`, "Debentureholders' Account, 2025-26 (Pembarthi)");
const vLots = flow('TB', ['Each year a fixed part of the issue is due', 'Debenture numbers chosen by lot (a fair draw)', 'Holders drawn: repaid in full; others keep earning interest', 'Investment of 15% renewed for each year’s instalment', 'After the last draw: reserve → General Reserve'], 'Flow of redemption by draw of lots: each year a fixed part falls due, the debentures are chosen by a fair draw, those drawn are repaid in full while the rest keep earning interest, the fifteen per cent investment is renewed for each instalment, and after the last draw the reserve goes to general reserve', 'Redemption in instalments by draw of lots (concepts only)');
const vPlan = (() => {
  const s = new Svg(640, 270);
  const Y0 = 200, H = 140, X0 = 70, bw = 90, gap = 140;
  const Y = (v) => Y0 - (H * v) / BV.rows[0].before;
  s.text(320, 20, `Bobbili Veena Makers Ltd: ${rs(800000)} repaid in four draws`, { size: 14, bold: true });
  s.line(40, Y0, 610, Y0, { sw: 1.4 });
  BV.rows.forEach((r, i) => {
    const x = X0 + i * gap;
    if (r.after) s.rect(x, Y(r.before), bw, Y(r.after) - Y(r.before), { fill: 'yellow', color: 'accent', sw: 1.2, rx: 2 });
    s.rect(x, Y(r.after), bw, Y0 - Y(r.after), { fill: 'fill', color: 'accent', sw: 1.2, rx: 2 });
    if (!r.after) s.rect(x, Y(r.before), bw, Y0 - Y(r.before), { fill: 'yellow', color: 'accent', sw: 1.2, rx: 2 });
    s.text(x + bw / 2, Y(r.before) - 10, `drawn ${rs(r.instalment)}`, { size: 11, bold: true });
    s.text(x + bw / 2, Y0 + 16, `${r.year - 1}-${String(r.year).slice(2)}`, { size: 12 });
    s.text(x + bw / 2, Y0 + 34, `investment ${rs(r.dri)}`, { size: 11, muted: true });
  });
  check(BV.rows.every((r) => r.dri * 100 === r.instalment * 15), 'investment is fifteen per cent of each instalment');
  s.text(320, 258, 'Yellow: debentures drawn and repaid that year. Grey: still outstanding after the draw.', { size: 11, muted: true });
  return s.visual(`Four columns, one for each year of redemption, shrinking from ${rw(800000)} outstanding; in each year ${rw(BV.each)} is drawn and repaid, and the investment kept for that year is ${rw(BV.rows[0].dri)}, fifteen per cent of the instalment`, 'Concept picture: column heights are computed from the plan.');
})();
const vWhere = table(
  ['Item', 'Balance Sheet (Schedule III Part I)'],
  [
    ['Debenture Redemption Reserve', "Shareholders' funds → Reserves and Surplus"],
    ['Debenture Redemption Investment', 'Current assets → Current investments'],
    ['Debentures due within 12 months', 'Current liabilities → Short-term borrowings (current maturities)'],
    ['Premium on Redemption of Debentures', 'Other long-term liabilities (other current liabilities in the final year)'],
    ['General Reserve after redemption', "Shareholders' funds → Reserves and Surplus"],
  ],
  'Table of where the redemption items appear in the balance sheet: the reserve and later the general reserve under reserves and surplus; the investment under current investments; debentures due within twelve months as current maturities under short-term borrowings; premium on redemption as another liability',
);
const vSummary2 = table(
  ['Idea', 'Rule'],
  [
    ['Lump sum', 'Whole series repaid on one date; investment of 15% encashed on that date'],
    ['Amount due', "Debentures (+ Premium on Redemption) Dr. To Debentureholders' A/c; then paid"],
    ['After redemption', 'Debentures, Premium on Redemption, Debentureholders and the investment all close at nil'],
    ['Reserve released', 'Debenture Redemption Reserve → General Reserve'],
    ['Interest on the investment', 'Income: closed to the Statement of Profit and Loss'],
    ['Draw of lots', 'Debentures chosen by lot each year; investment renewed for each instalment'],
  ],
  'Summary table of Part 2: in a lump sum the whole series is repaid on one date; the debentures and any premium are transferred to the holders and paid; all the related accounts close at nil; the reserve goes to general reserve; interest on the investment is income; under draw of lots the debentures are chosen by lot and the investment is renewed each year',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Redemption of Debentures — Part 1: Reserve, Investment and Sources of Redemption',
  goals: [
    'Decide whether a company must keep a Debenture Redemption Reserve and calculate the 10% minimum',
    'Calculate and record the Debenture Redemption Investment of 15% of debentures maturing in the year',
    'Identify companies exempt from both the reserve and the investment',
    'Distinguish redemption out of profits from redemption out of capital and pass the entries',
  ],
  slides: [
    sl('title', 'Redemption of Debentures', {
      b: 'Part 1 — the **reserve**, the **investment** and the **source** of the money. Every company and figure in this chapter is imagined.',
      v: vRoute1,
      n: 'Debentures are borrowed money, and one day they must be repaid. Repaying them is called redemption. The law makes many companies prepare for that day in two ways: by keeping back profit in a reserve, and by setting money aside in a safe investment. In this part we learn who must do what, how much, and how the source of the repayment changes the entries.',
    }),
    sl('concept', 'Redemption: method, source and safeguards', {
      v: vMethods,
      bl: ['**Method:** one lump sum at maturity, or instalments chosen by draw of lots.', '**Source:** out of capital, or partly or wholly out of profits.'],
      n: 'Three questions frame every redemption. How is the money repaid: all at once at maturity, or in instalments chosen by draw of lots? Where does it come from: out of capital, or out of profits kept back for the purpose? And what safeguards does the law demand: a debenture redemption reserve and a debenture redemption investment.',
    }),
    sl('concept', 'Who must keep a Debenture Redemption Reserve?', {
      v: vWho,
      b: 'Section 71(4) of the **Companies Act, 2013**, with Rule 18(7) as amended in 2019.',
      n: 'The Companies Act says the reserve must be created out of profits available for dividend, and used only to redeem debentures. Since the amendment of twenty nineteen, only ordinary unlisted companies must keep it, at ten per cent of outstanding debentures. Listed companies, banks, financial institutions, and unlisted finance companies with privately placed debentures are spared the reserve.',
    }),
    sl('check', 'Quick check: a listed company', {
      b: 'Reserve or no reserve?',
      chk: 'tf_listed_drr',
      n: 'Apply the twenty nineteen rule to a listed manufacturing company.',
    }),
    sl('example', 'Worked example 1: topping up the reserve', {
      b: `Sarthebari Bell Metal Ltd, Sarthebari (imagined), an unlisted company, has ${inr(SB.n)} 9% debentures of ₹100 each, redeemable at par on 31 March 2027. Its reserve was ${rs(SB.drrOpen)} on 1 April 2025; its surplus is ${rs(SB.surplus)}.`,
      v: vWE1,
      n: `Ten per cent of ${rw(SB.nominal)} is ${rw(SB1.required)}. The reserve already holds ${rw(SB.drrOpen)}, so Sarthebari transfers ${rw(SB1.transfer)} from its surplus. The surplus is debited because the reserve is an appropriation of profit, not an expense.`,
    }),
    sl('example', 'Worked example 1 (continued): the reserve account', {
      b: 'The reserve is carried forward until the debentures are repaid.',
      v: vDRRac,
      n: `Here is the reserve account for the year. It opens with ${rw(SB.drrOpen)}, receives ${rw(SB1.transfer)} from the surplus, and is carried down at ${rw(SB1.required)}, the statutory minimum. It will stay there until the debentures are redeemed.`,
    }),
    sl('check', 'Quick check: the shortfall', {
      b: 'Ten per cent, less what is held.',
      chk: 'n_drr_short',
      n: 'Find ten per cent of the outstanding debentures and take away the balance already in the reserve.',
    }),
    sl('concept', 'The Debenture Redemption Investment', {
      v: vForms,
      b: 'A reserve keeps profit back; the **investment** actually sets **money** aside.',
      n: 'A reserve is only a book entry, so the rules add a second safeguard. By the thirtieth of April each year, listed companies and ordinary unlisted companies must invest or deposit at least fifteen per cent of the debentures maturing during that year, in safe forms such as a bank deposit free from any charge, or government securities. The money may be used only to repay those debentures.',
    }),
    sl('example', 'Worked example 2: four companies, four answers', {
      b: `Four imagined companies, each with ${rs(5000000)} of debentures outstanding, of which ${rs(2000000)} mature during 2026-27.`,
      v: vWE2,
      n: `Classify first, then calculate. The listed company keeps no reserve but must invest ${rw(W2[0].dri)}. The unlisted company needs both: a reserve of ${rw(W2[1].drr)} and an investment of ${rw(W2[1].dri)}. The bank and the housing finance company with privately placed debentures are exempt from both.`,
    }),
    sl('example', 'Worked example 3: Sarthebari invests', {
      b: `Sarthebari's debentures mature on 31 March 2027, in the year ending that day.`,
      v: vWE3,
      n: `Because the debentures mature during the year ending on the thirty-first of March twenty twenty-seven, the investment is due by the thirtieth of April twenty twenty-six. Fifteen per cent of ${rw(SB.nominal)} is ${rw(SB3)}, deposited with a scheduled bank. The bank account is credited because real money leaves it.`,
    }),
    sl('diagram', 'Two safeguards beside the debt', {
      v: vBars,
      b: 'The reserve is profit kept back; the investment is money set aside.',
      n: 'Compare the two safeguards with the debt itself. The reserve is a tenth of the debentures and sits with the owners funds. The investment is fifteen per cent of what matures this year and is a real asset that can be turned into cash on the redemption date.',
    }),
    sl('check', 'Quick check: the deadline', {
      b: 'Fill in the month.',
      chk: 'fb_dri_date',
      n: 'Recall the date by which the investment must be made each year.',
    }),
    sl('concept', 'Reserve and investment side by side', {
      v: vDiff,
      n: 'Keep the two apart. The reserve is profit kept back, ten per cent of all outstanding debentures, shown in reserves and surplus, and moved to general reserve after redemption. The investment is money set aside, fifteen per cent of what matures this year, shown as a current investment, and encashed to pay the holders.',
    }),
    sl('concept', 'Out of capital or out of profits?', {
      v: vSources,
      n: 'The source of redemption tells us how much profit is kept back first. Out of capital, none is kept back, and only a company exempt from the reserve can do this. Partly out of profits means the statutory ten per cent. Wholly out of profits means keeping back an amount equal to the full face value. Whatever is kept back goes to general reserve after redemption.',
    }),
    sl('example', 'Worked example 4: Sarthebari weighs its choice', {
      b: `By 1 April 2026 Sarthebari's surplus is ${rs(SB4.surplus)}. Compare keeping the statutory reserve with redeeming wholly out of profits.`,
      v: vWE4,
      n: `With the statutory reserve, nothing more is transferred and the whole surplus stays available for dividend. Wholly out of profits, a further ${rw(SB4.prof.transfer)} goes to the reserve, leaving only ${rw(SB4left.prof)}. In both cases the investment is ${rw(SB4.prof.driAmt)}, and the reserve later becomes general reserve.`,
    }),
    sl('example', 'Worked example 5: a listed company, out of capital', {
      b: `Etikoppaka Lacquer Toys Ltd (imagined), a listed company, redeems ${inr(ET.n)} 10% debentures of ₹100 at par on 31 January 2026. It deposited the minimum at 7% a year on 30 April 2025.`,
      v: vWE5,
      n: `As a listed company, Etikoppaka keeps no reserve, so its redemption is out of capital. It still deposits fifteen per cent, ${rw(ET.driAmt)}, and encashes it with nine months of interest, ${rw(ET.interest)}. The holders are paid ${rw(ET.repayable)}, and the interest is income for the year.`,
    }),
    sl('diagram', 'How much profit is kept back?', {
      v: vRetained,
      b: 'The source decides the transfer; General Reserve receives it afterwards.',
      n: 'For the same debentures, the three sources keep back very different amounts of profit. Out of capital keeps back nothing. Partly out of profits keeps back the statutory tenth. Wholly out of profits keeps back the full face value, so resources equal to the whole debt stay in the business after the holders are paid.',
    }),
    sl('check', 'Quick check: sources and profits', {
      b: 'Match each source with its effect.',
      chk: 'match_source',
      n: 'For each way of redeeming, ask how much profit is kept back first, and what happens to it afterwards.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up: the reserve comes out of profits available for dividend and is used only for redemption. Ordinary unlisted companies keep ten per cent. Listed and ordinary unlisted companies invest fifteen per cent of debentures maturing in the year by the thirtieth of April. Out of capital means no transfer; out of profits means the tenth or the full face value.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Classify the company **first** (listed, unlisted, bank, NBFC or HFC): the rule follows from the class.',
        'Reserve = 10% of **outstanding** debentures; investment = 15% of debentures **maturing in the year**.',
        'Debit **Surplus** (not Bank) for the reserve; debit the **investment** and credit Bank when money is set aside.',
        'Wholly out of profits: transfer the **face value less the reserve already held**.',
        'Write the working for every percentage: it carries a step mark.',
      ],
      n: 'Start by classifying the company, because the rules follow from its class. Take ten per cent of outstanding debentures for the reserve, and fifteen per cent of those maturing this year for the investment. Debit the surplus for the reserve, but credit the bank when the investment is made. When redeeming wholly out of profits, transfer only what the reserve still lacks. And always show your working.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Redemption of Debentures — Part 2: Lump-Sum Redemption, Draw of Lots and Disclosure',
  goals: [
    'Pass the full set of entries for redeeming debentures in one lump sum at par',
    'Close the Debentures, Debentureholders, investment and reserve accounts and move the reserve to General Reserve',
    'Record redemption at a premium provided for at issue',
    'Explain redemption in instalments by draw of lots and how the investment is kept at 15% of each instalment',
  ],
  slides: [
    sl('title', 'Lump-sum redemption, draw of lots and disclosure', {
      b: 'Part 2 — a full year of **entries**, **closing** every account, **premium** on redemption, **draw of lots** and the **Balance Sheet**.',
      v: vRoute2,
      n: 'Now we follow a redemption from start to finish. Our running company is Pembarthi Brass Fittings, which repays all its debentures on one day. We record the year in order, check that every account closes, handle a premium on redemption, look at the idea of repaying by draw of lots, and see where each item sits in the balance sheet.',
    }),
    sl('concept', 'A lump-sum redemption, step by step', {
      v: vSteps,
      n: 'A lump-sum redemption follows a set order. First the reserve is topped up from the surplus. By the thirtieth of April the fifteen per cent investment is made. On maturity the investment is encashed with interest, the debentures are transferred to the holders account, and the holders are paid. Finally the reserve goes to general reserve, and the interest is closed to profit and loss.',
    }),
    sl('concept', 'The seven entries', {
      v: vEntries,
      b: 'Learn them in order; most exam problems use five to seven of them.',
      n: 'Here are the entries in that order. Notice the two accounts that link everything: the debentureholders account, which receives what is owed and is cleared by payment, and the investment account, which is opened in April and closed when the money comes back.',
    }),
    sl('example', 'Worked example 6: Pembarthi prepares', {
      b: `Pembarthi Brass Fittings Ltd, Pembarthi (imagined), unlisted: ${inr(PB.n)} 10% debentures of ₹100 each, redeemable at par on 31 March 2026. On 1 April 2025: reserve ${rs(PB.drrOpen)}, surplus ${rs(500000)}, bank ${rs(1200000)}. Deposit at 8% a year.`,
      v: vWE6a,
      n: `The minimum reserve is ${rw(PB.drrTotal)}, so Pembarthi transfers ${rw(PB.transfer)} at the start of the year. On the thirtieth of April it deposits fifteen per cent, ${rw(PB.driAmt)}, with a scheduled bank.`,
    }),
    sl('example', 'Worked example 6 (continued): redemption day', {
      b: 'On 31 March 2026 the deposit is encashed with 11 months of interest and the debentures are repaid.',
      v: vWE6b,
      n: `On the thirty-first of March the deposit returns with ${rw(PB.interest)} of interest. The debentures of ${rw(PB.repayable)} are transferred to the holders and paid. The reserve of ${rw(PB.drrTotal)} has done its job and goes to general reserve, and the interest is closed to the statement of profit and loss.`,
    }),
    sl('check', 'Quick check: what the investment is for', {
      b: 'True or false?',
      chk: 'tf_dri_encash',
      n: 'Decide what happens to the investment on the redemption date.',
    }),
    sl('example', 'Worked example 6: every account closes', {
      v: vClose,
      b: 'Debentures, reserve, investment and debentureholders: all **nil**.',
      n: `Check the year by looking at each account. The debentures, the reserve, the investment and the debentureholders all end at nil. General reserve gains ${rw(PB.drrTotal)}. The bank falls from ${rw(1200000)} to ${rw(PB.bankClose)}. If any of the first four shows a balance, an entry is missing.`,
    }),
    sl('example', 'Worked example 6: the reserve account', {
      v: vDRRac2,
      b: 'Built up before redemption, released in full once the holders are paid.',
      n: `The reserve account shows the whole story of the reserve: the opening ${rw(PB.drrOpen)} and the top-up of ${rw(PB.transfer)} on the credit side, and the transfer of ${rw(PB.drrTotal)} to general reserve on the debit side.`,
    }),
    sl('example', "Worked example 6: the Debentureholders' Account", {
      v: vDH,
      b: 'A personal account that opens and closes on redemption day.',
      n: `The debentureholders' account is credited with ${rw(PB.repayable)} when the debentures fall due and debited with the same amount when they are paid, so it closes at nil on the same day. Never debit the debentures account straight to the bank.`,
    }),
    sl('check', 'Quick check: after redemption', {
      b: 'Where does the reserve go?',
      chk: 'fb_drr_gr',
      n: 'Recall the account that receives the reserve once all the debentures are repaid.',
    }),
    sl('diagram', 'The bank through the year', {
      v: vWaterfall,
      b: 'The investment goes out and comes back; only the interest and the repayment change the bank.',
      n: 'Follow the bank. The deposit leaves in April and returns in March with interest, so on its own it costs nothing. What really moves the bank is the repayment to the holders, softened a little by the interest earned.',
    }),
    sl('concept', 'Redemption at a premium', {
      v: vPrem,
      b: 'The premium was provided for **at issue**, so on maturity it is **debited**, not charged afresh.',
      n: 'When debentures are repayable at a premium, the premium was recorded as a liability on the day they were issued, as we saw in the previous chapter. On maturity both the debentures and the premium on redemption are debited, and the holders are credited with the total. Nothing new is charged to profit at this stage.',
    }),
    sl('example', 'Worked example 7: Aranmula pays a premium', {
      b: `Aranmula Mirror Works Ltd (imagined), unlisted, redeems ${inr(AM.n)} 11% debentures of ₹100 each at a premium of 5% on 30 September 2025. Its reserve already holds ${rs(AM.drrOpen)}. It deposited the minimum at 6% a year on 30 April 2025.`,
      v: vWE7,
      n: `The reserve is already ten per cent, so no transfer is needed. Fifteen per cent, ${rw(AM.driAmt)}, comes back with ${rw(AM.interest)} of interest. The holders are owed the face value plus ${rw(AM.redPremium)} of premium, ${rw(AM.repayable)} in all, and are paid. Then the reserve goes to general reserve.`,
    }),
    sl('check', 'Quick check: paying at a premium', {
      b: 'Face value plus premium.',
      chk: 'n_holders_paid',
      n: 'Add the premium on redemption to the face value of the debentures redeemed.',
    }),
    sl('concept', 'Redemption in instalments by draw of lots', {
      v: vLots,
      b: 'In the ISC 2027 syllabus this method is studied as a **concept**.',
      n: "Some companies repay a fixed part of the issue each year. The debentures to be repaid are chosen by a fair draw of lots. Holders whose debentures are drawn are repaid in full; the others keep earning interest until a later draw. The fifteen per cent investment is made afresh for each year, based on that year's instalment.",
    }),
    sl('diagram', 'Picturing the draws', {
      v: vPlan,
      b: 'The investment follows each year’s instalment; the reserve waits for the last draw.',
      n: "Picture an issue repaid in four equal draws. Each year a quarter is drawn and repaid, and the debentures still outstanding shrink. The investment for each year is fifteen per cent of that year's draw, so it is renewed every year. The reserve stays until the last draw, and then goes to general reserve.",
    }),
    sl('check', 'Quick check: drawn and not drawn', {
      b: 'True or false?',
      chk: 'tf_lots',
      n: 'Think about what happens to holders whose debentures are not drawn in a particular year.',
    }),
    sl('concept', 'Where the items appear in the Balance Sheet', {
      v: vWhere,
      n: 'Schedule three gives each item its place. The reserve, and later the general reserve, sit in reserves and surplus. The investment is a current investment. Debentures due within twelve months move to short-term borrowings as current maturities, and any premium on redemption is another liability until it is paid.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up: in a lump-sum redemption, top up the reserve, make the investment by the thirtieth of April, encash it on maturity, transfer the debentures and any premium to the holders and pay them, then release the reserve to general reserve. Under draw of lots, debentures are chosen by lot each year and the investment is renewed for each instalment.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Write the entries in **date order**: transfer, investment, encashment, amount due, payment, reserve released.',
        "Use the **Debentureholders' Account**: never debit the Debentures Account straight to Bank.",
        'A premium on redemption provided at issue is **debited** on maturity; it is not a new expense.',
        'Interest on the investment is **income**: credit its own account, then close it to the Statement of Profit and Loss.',
        'Check that the Debentures, reserve, investment and holders accounts all close at **nil**.',
      ],
      n: 'Write the entries in date order. Always pass the debentures through the holders account before paying them. Remember that a premium on redemption was provided at issue, so it is simply debited on maturity. Treat interest on the investment as income. And finish by checking that every related account has closed at nil.',
    }),
  ],
});

// Narration house rules on top of lib.mjs: no digits, no rupee sign, no slashes, ampersands or per-cent signs, no capitals runs.
for (const d of [part1, part2])
  for (const s of d.slides) {
    const m = /\d|₹|[\/&%]|\b[A-Z]{2,}\b/.exec(s.narration);
    check(!m, `narration of part ${d.part} ${s.id} has "${m?.[0]}"`);
  }

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Redemption of Debentures — Notes',
  sections: [
    {
      h: '1. Redemption: meaning, methods and sources',
      t: [3, 4, 5],
      b: "**Redemption** of debentures is the repayment of the amount due to the debentureholders, which discharges the company's liability.\n\n- **Methods in the ISC 2027 syllabus:** (a) in **one lump sum** at the end of the stated period, at par or at a premium; (b) in **annual instalments by draw of lots** (concepts only).\n- **Sources:** out of **capital** (no profit kept back), **partly out of profits** (the statutory reserve) or **wholly out of profits** (a reserve equal to the face value redeemed).\n- **Safeguards:** the **Debenture Redemption Reserve** (profit kept back) and the **Debenture Redemption Investment** (money set aside).\n\nNot in the ISC 2027 syllabus: calculation of ex-interest and cum-interest prices, and numerical problems on redemption by draw of lots.",
      terms: [
        ['Redemption of debentures', 'Repayment of the amount due on debentures, which discharges the liability.'],
        ['Lump-sum redemption', 'Repayment of a whole series on one date, usually at the end of its term.'],
      ],
      v: vMethods,
      vs: [vRoute1],
    },
    {
      h: '2. Debenture Redemption Reserve: who and how much',
      t: 1,
      b: `**Section 71(4), Companies Act, 2013:** a company issuing debentures creates a Debenture Redemption Reserve **out of profits available for payment of dividend**; the amount credited may be used **only for redeeming debentures**.\n\n**Rule 18(7), as amended in 2019:**\n- **Other unlisted companies:** reserve of at least **10% of the value of outstanding debentures**.\n- **Not required:** listed companies; All India Financial Institutions and banking companies; unlisted NBFCs and housing finance companies (HFCs) for privately placed debentures.\n\n**Entry:** ${SURPLUS} Dr. To Debenture Redemption Reserve A/c.\n\n**Further transfer** = 10% × outstanding debentures − balance already in the reserve (nil if already enough).`,
      terms: [
        ['Debenture Redemption Reserve', 'A reserve created out of profits available for dividend, used only for redeeming debentures.'],
        ['Profits available for dividend', 'The surplus in the Statement of Profit and Loss and free reserves that the company could lawfully distribute.'],
      ],
      v: vWho,
      vs: [vWE1, vDRRac],
    },
    {
      h: '3. Debenture Redemption Investment',
      t: 2,
      b: "**Rule 18(7):** on or before **30 April** each year, a listed company or an unlisted company (other than the exempt classes) must invest or deposit at least **15% of the debentures maturing during the year ending on the next 31 March**.\n\n- **Permitted forms:** deposits with a scheduled bank free from any charge or lien; unencumbered securities of the Central or a State Government; unencumbered trust securities and notified bonds under the Indian Trusts Act, 1882.\n- **Use:** only for redeeming the debentures maturing that year; it must never fall below 15% of them.\n\n**Entries:** made: Debenture Redemption Investment A/c Dr. To Bank A/c; encashed: Bank A/c Dr. To Debenture Redemption Investment A/c, Interest on Debenture Redemption Investment A/c; interest closed: Interest on Debenture Redemption Investment A/c Dr. To Statement of Profit and Loss.",
      terms: [
        ['Debenture Redemption Investment', 'Money of at least 15% of the debentures maturing in the year, deposited or invested by 30 April in permitted forms.'],
        ['Scheduled bank', 'A bank listed in the Second Schedule to the Reserve Bank of India Act, 1934.'],
      ],
      v: vForms,
      vs: [vWE3, vBars],
    },
    {
      h: '4. Who is exempt, and reserve versus investment',
      t: [1, 2],
      b: '| Class of company | Reserve (10%) | Investment (15%) |\n|---|---|---|\n| Other unlisted company | Required | Required |\n| Listed company | Not required | Required |\n| Bank, All India Financial Institution | Not required | Not required |\n| Unlisted NBFC or HFC (private placement) | Not required | Not required |\n\n**Exempt from both:** banking companies, All India Financial Institutions regulated by the Reserve Bank of India, and unlisted NBFCs and HFCs for privately placed debentures.\n\nThe **reserve** keeps profit back (equity side); the **investment** puts money aside (assets side). One does not replace the other.',
      terms: [
        ['Listed company', 'A company any of whose securities are listed on a recognised stock exchange.'],
        ['NBFC / HFC', 'A non-banking financial company registered with the Reserve Bank of India / a housing finance company registered with the National Housing Bank.'],
      ],
      v: vWE2,
      vs: [vDiff],
    },
    {
      h: '5. Redemption out of profits and out of capital',
      t: 3,
      b: `- **Out of capital:** no profit is transferred to a reserve; the funds paid out are not replaced by retained profit. Open only to a company exempt from the reserve (for example a listed company, which still makes the 15% investment).\n- **Partly out of profits:** the statutory reserve (10% of outstanding debentures) is kept; after redemption it goes to General Reserve.\n- **Wholly out of profits:** an amount equal to the **face value redeemed** is kept in the reserve before redemption: further transfer = face value − reserve already held. After redemption it goes to General Reserve, so resources equal to the debt repaid stay in the business.\n\n**Entries:** ${SURPLUS} Dr. To Debenture Redemption Reserve A/c (before); Debenture Redemption Reserve A/c Dr. To General Reserve A/c (after).`,
      terms: [
        ['Redemption out of capital', 'Repayment without keeping back any profit in a reserve for the purpose.'],
        ['Redemption out of profits', 'Repayment after keeping back profit in the Debenture Redemption Reserve: the statutory 10% (partly) or the full face value (wholly).'],
      ],
      v: vSources,
      vs: [vWE4, vWE5, vRetained],
    },
    {
      h: '6. Redemption in a lump sum at par',
      t: 4,
      b: "**Order of entries for the year of redemption**\n1. Transfer to reserve (if it is short of the minimum).\n2. Investment made by 30 April.\n3. Investment encashed with interest on maturity.\n4. Debentures A/c Dr. To Debentureholders' A/c (amount due).\n5. Debentureholders' A/c Dr. To Bank A/c (payment).\n6. Debenture Redemption Reserve A/c Dr. To General Reserve A/c.\n7. Interest on the investment closed to the Statement of Profit and Loss.\n\n**Check:** Debentures, Debentureholders, the investment and the reserve all close at **nil**; the bank changes by interest earned − amount repaid.",
      terms: [
        ["Debentureholders' Account", 'A personal account credited with the amount due on redemption and debited when the holders are paid.'],
        ['General Reserve', 'A free reserve; it receives the Debenture Redemption Reserve once the debentures are repaid.'],
      ],
      v: vSteps,
      vs: [vEntries, vWE6a, vWE6b, vClose, vDRRac2, vDH, vWaterfall],
    },
    {
      h: '7. Redemption at a premium, and the Balance Sheet',
      t: [1, 2, 4],
      b: "When debentures are redeemable at a premium, the premium is credited to **Premium on Redemption of Debentures A/c** at issue (with Loss on Issue debited; chapter 7). On maturity:\n\nDebentures A/c Dr., Premium on Redemption of Debentures A/c Dr. To Debentureholders' A/c (face value + premium); then Debentureholders' A/c Dr. To Bank A/c.\n\n**Schedule III Part I:** Debenture Redemption Reserve and General Reserve under Reserves and Surplus; the investment under current investments; debentures due within 12 months as current maturities under short-term borrowings; premium on redemption under other long-term liabilities (current in the final year).",
      terms: [
        ['Premium on redemption', 'The amount above face value payable on redemption; a liability from the date of issue.'],
        ['Current maturities of long-term borrowings', 'Debentures repayable within twelve months of the Balance Sheet date, shown under short-term borrowings.'],
      ],
      v: vPrem,
      vs: [vWE7, vWhere],
    },
    {
      h: '8. Redemption in instalments by draw of lots (concepts only)',
      t: 5,
      b: '- A fixed part of the issue is redeemed each year; the debenture numbers to be repaid are chosen by **draw of lots**.\n- Holders whose debentures are drawn are repaid **in full**; the rest continue to earn interest until drawn.\n- **Reserve:** the 10% minimum is built before redemption begins and transferred to General Reserve after the last instalment.\n- **Investment:** by 30 April of each year, at least **15% of that year’s instalment** is invested; it is encashed for that instalment and made again for the next.',
      terms: [
        ['Draw of lots', 'A fair random draw that selects which debentures are redeemed in a given year.'],
        ['Instalment', 'The part of the issue redeemed in one year under a redemption spread over several years.'],
      ],
      v: vLots,
      vs: [vPlan],
    },
  ],
  tips: "**Common mistakes**\n- Debiting **Bank** instead of the surplus when creating the reserve.\n- Taking 15% of **all** debentures for the investment: it is 15% of those **maturing in the year**.\n- Asking a **listed** company for a reserve (none since 2019), or forgetting that it still makes the **investment**.\n- Transferring the reserve to **Capital Reserve** after redemption; it goes to **General Reserve**.\n- Debiting the Debentures Account straight to Bank, skipping the **Debentureholders' Account**.\n- Charging the premium on redemption to profit at maturity; it was provided for **at issue**.\n- Treating interest on the investment as part of the investment; it is **income**.\n\n**How marks are usually awarded (SOYL chapter tests on the ISC default pattern)**\n- 1 mark: objective items.\n- 2 marks: one or two entries with the working, or two points of difference.\n- 3 marks: a set of redemption entries, a ledger account or a comparison table.\n- 5 marks in parts, e.g. (a) 3 + (b) 2: entries for the year and the ledger accounts or an explanation.\n- Full practical (practice, 8 marks): entries about 5, ledger accounts or notes about 3. The ISC 2027 weightage for Issue and Redemption of Debentures in Paper I is 8 marks.\n\n**Figures in SOYL practice** are imagined; your board paper will give its own.",
});

// ---------------------------------------------------------------- flashcards
const FC = cards([
  ['**Redemption of debentures**', 'Repayment of the amount due on debentures, discharging the liability.', 'definition', 3],
  ['Methods of redemption in the ISC 2027 syllabus', 'One lump sum at maturity; annual instalments by draw of lots (concepts only).', 'fact', 4],
  ['Section 71(4), Companies Act, 2013', 'Reserve created out of profits available for dividend; used only for redeeming debentures.', 'fact', 1],
  ['Minimum Debenture Redemption Reserve (other unlisted companies)', '**10%** of the value of outstanding debentures.', 'fact', 1],
  ['Does a listed company need a Debenture Redemption Reserve?', 'No (since the 2019 amendment); it must still make the 15% investment.', 'fact', 1],
  ['Entry to create the reserve', 'Surplus, i.e., Balance in Statement of Profit and Loss Dr. To Debenture Redemption Reserve A/c.', 'fact', 1],
  ['Further transfer to the reserve', '10% × outstanding debentures − balance already held.', 'exam-tip', 1],
  ['**Debenture Redemption Investment**', 'At least 15% of debentures maturing in the year, invested or deposited in permitted forms.', 'definition', 2],
  ['Deadline for the investment', 'On or before **30 April** of the year in which the debentures mature.', 'fact', 2],
  ['Investment is 15% of…', 'The debentures **maturing during the year** ending on the next 31 March, not all debentures.', 'exam-tip', 2],
  ['Permitted forms of the investment', 'Scheduled bank deposits free from charge or lien; unencumbered Central or State Government securities; trust securities and notified bonds.', 'fact', 2],
  ['Exempt from both reserve and investment', 'Banks, All India Financial Institutions, unlisted NBFCs and HFCs on privately placed debentures.', 'fact', 2],
  ['Entry when the investment is made', 'Debenture Redemption Investment A/c Dr. To Bank A/c.', 'fact', 2],
  ['Entry when the investment is encashed with interest', 'Bank A/c Dr. To Debenture Redemption Investment A/c, Interest on Debenture Redemption Investment A/c.', 'fact', 2],
  ['Reserve versus investment', 'Reserve: profit kept back (equity side). Investment: money set aside (assets side).', 'concept', 2],
  ['**Redemption out of capital**', 'No profit kept back in a reserve; only for companies exempt from the reserve.', 'definition', 3],
  ['**Redemption wholly out of profits**', 'Reserve raised to the full face value redeemed before repayment.', 'definition', 3],
  ['Partly out of profits', 'Only the statutory 10% is kept back.', 'concept', 3],
  ['Effect of redeeming out of profits', 'Less profit available for dividend; resources equal to the reserve stay in the business.', 'concept', 3],
  ['Amount due on redemption at par', "Debentures A/c Dr. To Debentureholders' A/c.", 'fact', 4],
  ['Amount due on redemption at a premium', "Debentures A/c Dr., Premium on Redemption of Debentures A/c Dr. To Debentureholders' A/c.", 'fact', 4],
  ['Payment to the holders', "Debentureholders' A/c Dr. To Bank A/c.", 'fact', 4],
  ['Reserve after all debentures are repaid', 'Debenture Redemption Reserve A/c Dr. To **General Reserve** A/c.', 'fact', 4],
  ['Interest on the investment', 'Income: closed to the Statement of Profit and Loss.', 'concept', 4],
  ['Accounts that must close at nil after redemption', 'Debentures, Premium on Redemption, Debentureholders, the investment and the reserve.', 'exam-tip', 4],
  ['Bank change over a lump-sum redemption', 'Interest earned − amount repaid (the investment goes out and comes back).', 'exam-tip', 4],
  ['**Draw of lots**', 'A fair draw choosing which debentures are redeemed in a year; those drawn are repaid in full.', 'definition', 5],
  ['Investment under redemption by instalments', 'At least 15% of each year’s instalment, made by 30 April and renewed every year.', 'fact', 5],
  ['Reserve under redemption by instalments', 'Kept until the last instalment is paid, then moved to General Reserve.', 'concept', 5],
  ['Debenture Redemption Reserve in the Balance Sheet', 'Reserves and Surplus.', 'fact', 1],
  ['Debenture Redemption Investment in the Balance Sheet', 'Current investments.', 'fact', 2],
]);

// ---------------------------------------------------------------- tests (ISC class defaults, item for item)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Redemption of Debentures',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A - Objective (5 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_drr_unlisted_amt', 'm_dri_amt', 'm_out_of_capital', 'm_premium_entry', 'ar_drr_dividend'] },
    { id: 'B', title: 'Section B - Short answer (4 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s2_drr_entry', { attempt: 1, keys: ['s2_dri_entries', 's2_premium_redeem'] }] },
    { id: 'C', title: 'Section C - Short answer (6 marks)', instr: 'Answer both questions. Internal choice in the second question. Show your working.', items: ['s3_out_of_profits', { attempt: 1, keys: ['s3_lump_par_full', 's3_ledger_drr'] }] },
    { id: 'D', title: 'Section D - Long answer (5 marks)', instr: 'Answer the question. It is set in parts (3 + 2 marks); show your working.', items: ['l5_lump_ledgers'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Redemption of Debentures',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A - Objective (12 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_drr_section', 'm_drr_nbfc', 'm_lots_meaning', 'm_dri_pct', 'm_dri_date', 'm_dri_forms', 'm_who_capital', 'm_lump_entry', 'm_dri_realise', 'm_bank_total', 'ar_dri_vs_drr', 'ar_profits_gr'] },
    { id: 'B', title: 'Section B - Short answer (6 marks)', instr: 'Answer all three questions. Internal choice in the last question.', items: ['s2_drr_vs_dri', 's2_listed_capital', { attempt: 1, keys: ['s2_lump_par', 's2_lots_explain'] }] },
    { id: 'C', title: 'Section C - Short answer (12 marks)', instr: 'Answer all four questions. Internal choice in the last question. Show your working.', items: ['s3_four_companies', 's3_dri_interest', 's3_compare_sources', { attempt: 1, keys: ['s3_lump_premium', 's3_drr_topup'] }] },
    { id: 'D', title: 'Section D - Long answer (10 marks)', instr: 'Answer both questions. Internal choice in the second question. Each is set in parts (3 + 2 marks).', items: ['l5_premium_cycle', { attempt: 1, keys: ['l5_compare', 'l5_unlisted_full'] }] },
  ],
});

// Deck checks never appear in the tests.
const inTests = new Set([T_SHORT, T_LONG].flatMap((t) => t.sections.flatMap((s) => s.items.map((i) => i.question_id))));
for (const d of [part1, part2]) for (const s of d.slides) if (s.check_question_id) check(!inTests.has(s.check_question_id), `deck check ${s.check_question_id} is also in a test`);

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: FC,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of isc-12-accounts-ch08 only (Debenture Redemption Reserve and the 10% rule; Debenture Redemption Investment of 15% by 30 April and the exemptions; redemption out of profits and out of capital; redemption in a lump sum at par or premium with the reserve moved to General Reserve; redemption by draw of lots as concepts only). Ex-interest and cum-interest prices and numerical problems on draw of lots are left out (one note in notes section 1); purchase in the open market and conversion are not in the ISC 2027 syllabus and are not covered.',
    originality: 'every company and figure is imagined and labelled as such; no textbook illustration or exercise and no CISCE specimen or past-paper item is reused; companies and set-ups differ from the CBSE 12 Accountancy chapters and ISC ch01–ch07',
    data: 'every reserve, investment, interest, redemption and balance figure is computed by acc.mjs and asserted: entries balance, the reserve reaches 10% of outstanding debentures (or the full face value wholly out of profits) without exceeding the surplus, the investment is at least 15% of debentures maturing in the year, and after redemption the Debentures, Premium on Redemption, Debentureholders, investment and reserve accounts close at nil while the bank moves by interest less the amount repaid and is never overdrawn',
    accounting: 'Section 71(4) of the Companies Act, 2013 and Rule 18(7) of the Companies (Share Capital and Debentures) Rules, 2014 as amended in 2019: reserve only for other unlisted companies; investment for listed and other unlisted companies; banks, All India Financial Institutions and unlisted NBFCs/HFCs on private placement exempt from both; premium on redemption provided at issue (chapter 7); reserve to General Reserve after redemption',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
