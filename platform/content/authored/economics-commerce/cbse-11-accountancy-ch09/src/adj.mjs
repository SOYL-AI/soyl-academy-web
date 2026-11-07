// Adjustments helper for CBSE 11 Accountancy ch09 Financial Statements II. Every firm is imagined.
// adjFinals() takes one trial balance and a list of adjustments, applies the two effects of every adjustment to the
// Trading Account, the Profit and Loss Account and the Balance Sheet, and asserts that
//   - the trial balance agrees and every item of it is used exactly once;
//   - every adjustment is recorded in two places (closing stock outside the trial balance: Trading Account and Balance
//     Sheet; closing stock inside the trial balance: Balance Sheet only; an abnormal loss: up to three places);
//   - the Trading Account, the Profit and Loss Account and the Balance Sheet agree, and the capital shown in the Balance
//     Sheet equals opening capital plus interest on capital plus net profit less drawings, goods withdrawn and interest
//     on drawings.
// Chapter text pins every stated profit with same(computed, stated, what).
import { sum, check, same, whole, inr, rs, words, rupees, mdTable, journal, ledger, trialBalance, trading, profitLoss, balanceSheet } from '../../cbse-11-accountancy-ch01/src/acc.mjs';
export { sum, check, same, whole, inr, rs, words, rupees, mdTable, journal, ledger };

const DEBIT = ['os', 'pur', 'sret', 'dexp', 'iexp', 'draw', 'fa', 'inv', 'ca', 'deb', 'bd', 'cs'];
const CREDIT = ['sale', 'pret', 'inc', 'cap', 'ltl', 'cl', 'pdd', 'pdisc', 'gp'];
const isDr = (r) => DEBIT.includes(r);
const TRADING_ROLES = ['os', 'pur', 'sret', 'pret', 'sale', 'dexp'];
/** Title case for account names ("Opening stock" becomes "Opening Stock"). */
export const T = (s) => s.split(' ').map((w, i) => (i > 0 && ['and', 'of', 'in', 'on', 'to', 'at'].includes(w) ? w : w[0].toUpperCase() + w.slice(1))).join(' ');
const lc = (s) => s.toLowerCase();
const base = (s) => T(s.replace(/ received$/i, ''));
/** Per cent in words for narration: 10 becomes "ten per cent". */
export const pcw = (n) => `${words(n)} per cent`;

/** A whole-rupee percentage of an amount. */
export const pctOf = (amount, p) => whole((amount * p) / 100, `${p} per cent of ${amount}`);
/** Manager's commission on net profit before charging it (pct of profit) or after charging it (pct over 100 plus pct). */
export function commissionOn(np, p, basis) {
  check(basis === 'before' || basis === 'after', 'commission basis');
  return basis === 'before' ? whole((np * p) / 100, 'commission before charging') : whole((np * p) / (100 + p), 'commission after charging');
}

function provLedger(name, old, bdTotal, charge) {
  const dr = [...(bdTotal ? [['To Bad Debts A/c', bdTotal]] : []), ...(charge < 0 ? [['To Profit and Loss A/c', -charge]] : [])];
  const cr = charge > 0 ? [['By Profit and Loss A/c', charge]] : [];
  return ledger({ name, opening: old ? { side: 'cr', amount: old } : undefined, dr, cr });
}
/**
 * Bad debts, further bad debts, the provision for doubtful debts and the provision for discount on debtors.
 * New provision = pddPct of (debtors - further bad debts); provision for discount = discPct of the debtors left after the
 * provision for doubtful debts; the Profit and Loss charge is bad debts + further bad debts + new provision - old provision.
 */
export function debtsCalc({ debtors, bdTB = 0, further = 0, oldPdd = 0, pddPct = 0, discPct = 0, oldDisc = 0 }) {
  const after = debtors - further;
  const newPdd = pctOf(after, pddPct);
  const afterPdd = after - newPdd;
  const disc = pctOf(afterPdd, discPct);
  const bdTotal = bdTB + further;
  const charge = bdTotal + newPdd - oldPdd;
  const discChg = disc - oldDisc;
  const net = debtors - further - newPdd - disc;
  const pddLedger = newPdd || oldPdd || bdTotal ? provLedger('Provision for Doubtful Debts A/c', oldPdd, bdTotal, charge) : null;
  if (pddLedger) same(-pddLedger.balance, newPdd, 'provision for doubtful debts account closes at the new provision');
  const discLedger = disc || oldDisc ? provLedger('Provision for Discount on Debtors A/c', oldDisc, 0, discChg) : null;
  if (discLedger) same(-discLedger.balance, disc, 'provision for discount account closes at the new provision');
  return { debtors, bdTB, further, oldPdd, oldDisc, pddPct, discPct, after, newPdd, afterPdd, disc, bdTotal, charge, discChg, net, pddLedger, discLedger };
}

const EXPECT = { out: 2, pre: 2, acc: 2, adv: 2, dep: 2, debts: 2, intcap: 2, intdraw: 2, mgr: 2, goods: 2 };

/**
 * lines: [name, amount | null, role]; roles: os pur sret dexp iexp draw fa inv ca deb(debtors) bd(bad debts) cs(closing stock in
 * the trial balance) on the debit side and sale pret inc cap ltl cl pdd(old provision for doubtful debts) pdisc(old provision for
 * discount) gp(gross profit, in the trial balance when the Trading Account was already prepared) on the credit side. The capital
 * may be null (the balancing figure). closing = closing stock given outside the trial balance.
 * adj: [{ id, k, ... }] with k = out{on,amt} pre{on,amt} acc{on,amt} adv{on,amt} dep{on,pct} debts{further,pddPct,discPct}
 * intcap{pct} intdraw{pct|amt} mgr{pct,basis} goods{amt} loss{amt,claim}.
 */
export function adjFinals({ firm, date, lines, closing = null, adj = [] }) {
  const L = lines.map(([name, amt, role]) => ({ name, amt, role }));
  check(new Set(L.map((l) => l.name)).size === L.length, `${firm}: duplicate account name`);
  for (const l of L) check([...DEBIT, ...CREDIT].includes(l.role), `${firm}: bad role ${l.role} for ${l.name}`);
  const capL = L.filter((l) => l.role === 'cap');
  check(capL.length === 1, `${firm}: one capital line needed`);
  const netDr = sum(L.filter((l) => l.role !== 'cap').map((l) => (isDr(l.role) ? l.amt : -l.amt)));
  if (capL[0].amt == null) capL[0].amt = netDr;
  else same(capL[0].amt, netDr, `${firm}: capital is the balancing figure`);
  check(capL[0].amt > 0, `${firm}: capital positive`);
  const tb = trialBalance(L.map((l) => [l.name, isDr(l.role) ? l.amt : 0, isDr(l.role) ? 0 : l.amt]));

  const ids = adj.map((a) => a.id);
  check(ids.every(Boolean) && new Set(ids).size === ids.length, `${firm}: every adjustment needs a unique id`);
  const used = new Map();
  const take = (role) => { const xs = L.filter((l) => l.role === role); xs.forEach((l) => used.set(l.name, (used.get(l.name) ?? 0) + 1)); return xs; };
  const one = (role) => { const xs = take(role); check(xs.length <= 1, `${firm}: more than one ${role}`); return xs[0]?.amt ?? 0; };
  const has = (role) => L.some((l) => l.role === role);
  const inside = has('cs');
  if (inside) {
    check(closing === null && has('gp'), `${firm}: closing stock in the trial balance needs the gross profit in it and no closing stock outside`);
    for (const r of TRADING_ROLES) check(!has(r), `${firm}: trading item ${r} cannot be in a trial balance that carries the gross profit`);
  } else {
    check(typeof closing === 'number' && !has('gp'), `${firm}: closing stock outside the trial balance must be given`);
  }
  const os = one('os'), pur = one('pur'), pret = one('pret'), sale = one('sale'), sret = one('sret'), draw = one('draw'), capOpen = one('cap');
  const gpTB = one('gp'), csTB = one('cs'), bdTB = one('bd'), oldPdd = one('pdd'), oldDisc = one('pdisc');
  const dexp = take('dexp'), iexp = take('iexp'), inc = take('inc'), fa = take('fa'), inv = take('inv'), ca = take('ca'), ltl = take('ltl'), cl = take('cl'), deb = take('deb');
  check(deb.length <= 1, `${firm}: one debtors account`);
  check(L.every((l) => used.get(l.name) === 1), `${firm}: every trial balance item must be used exactly once`);

  const A = (k) => adj.filter((a) => a.k === k);
  const eff = [];
  const amounts = {};
  const log = (a, label, amt, effects) => { eff.push({ id: a.id, k: a.k, label, amt, effects }); amounts[a.id] = amt; };
  const lineOf = (name, roles) => { const l = L.find((x) => x.name === name); check(l && roles.includes(l.role), `${firm}: adjustment refers to ${name}, which is not a ${roles.join('/')} item`); return l; };

  // ---- closing stock
  if (inside) log({ id: 'closing', k: 'closing' }, 'Closing stock (in the trial balance)', csTB, [{ to: 'Balance Sheet', what: 'Current asset only' }]);
  else log({ id: 'closing', k: 'closing' }, 'Closing stock', closing, [{ to: 'Trading A/c', what: 'Credit side' }, { to: 'Balance Sheet', what: 'Current asset' }]);
  const closingAmt = inside ? csTB : closing;

  // ---- adjustments to expense and income lines
  const exAdj = new Map();
  const bump = (name, key, x) => { const o = exAdj.get(name) ?? { out: 0, pre: 0, acc: 0, adv: 0 }; o[key] += x; exAdj.set(name, o); };
  for (const a of A('out')) { const l = lineOf(a.on, ['dexp', 'iexp']); bump(a.on, 'out', a.amt); log(a, `Outstanding ${lc(a.on)}`, a.amt, [{ to: l.role === 'dexp' ? 'Trading A/c' : 'Profit and Loss A/c', what: `Added to ${lc(a.on)}` }, { to: 'Balance Sheet', what: 'Current liability' }]); }
  for (const a of A('pre')) { const l = lineOf(a.on, ['dexp', 'iexp']); bump(a.on, 'pre', a.amt); log(a, `Prepaid ${lc(a.on)}`, a.amt, [{ to: l.role === 'dexp' ? 'Trading A/c' : 'Profit and Loss A/c', what: `Deducted from ${lc(a.on)}` }, { to: 'Balance Sheet', what: 'Current asset' }]); }
  for (const a of A('acc')) { lineOf(a.on, ['inc']); bump(a.on, 'acc', a.amt); log(a, `Accrued ${lc(base(a.on))}`, a.amt, [{ to: 'Profit and Loss A/c', what: `Added to ${lc(a.on)}` }, { to: 'Balance Sheet', what: 'Current asset' }]); }
  for (const a of A('adv')) { lineOf(a.on, ['inc']); bump(a.on, 'adv', a.amt); log(a, `${T(a.on)} in advance`, a.amt, [{ to: 'Profit and Loss A/c', what: `Deducted from ${lc(a.on)}` }, { to: 'Balance Sheet', what: 'Current liability' }]); }
  const adjAmt = (name, sign) => { const o = exAdj.get(name) ?? { out: 0, pre: 0, acc: 0, adv: 0 }; return sign === 'exp' ? o.out - o.pre : o.acc - o.adv; };
  const expLine = (prefix, l) => {
    const o = exAdj.get(l.name) ?? { out: 0, pre: 0 };
    const parts = [`${rs(l.amt)}`, ...(o.out ? [`+ ${rs(o.out)} outstanding`] : []), ...(o.pre ? [`− ${rs(o.pre)} prepaid`] : [])];
    return [`${prefix} ${T(l.name)}${parts.length > 1 ? ` (${parts.join(' ')})` : ''}`, l.amt + o.out - o.pre];
  };
  const incLine = (l) => {
    const o = exAdj.get(l.name) ?? { acc: 0, adv: 0 };
    const parts = [`${rs(l.amt)}`, ...(o.acc ? [`+ ${rs(o.acc)} accrued`] : []), ...(o.adv ? [`− ${rs(o.adv)} in advance`] : [])];
    return [`By ${T(l.name)}${parts.length > 1 ? ` (${parts.join(' ')})` : ''}`, l.amt + o.acc - o.adv];
  };

  // ---- goods withdrawn, abnormal loss
  const goodsAmt = sum(A('goods').map((a) => a.amt));
  for (const a of A('goods')) log(a, 'Goods withdrawn for personal use', a.amt, [{ to: 'Trading A/c', what: 'Deducted from purchases' }, { to: 'Balance Sheet', what: 'Added to drawings (reduces capital)' }]);
  const lossA = A('loss');
  check(lossA.length <= 1 && A('goods').length <= 1 && A('debts').length <= 1 && A('intcap').length <= 1 && A('intdraw').length <= 1 && A('mgr').length <= 1, `${firm}: one adjustment of each of these kinds`);
  const lossCost = sum(lossA.map((a) => a.amt));
  const claim = sum(lossA.map((a) => a.claim ?? 0));
  const uninsured = lossCost - claim;
  check(uninsured >= 0, `${firm}: insurance claim above the loss`);
  for (const a of lossA) log(a, 'Loss of goods by fire (abnormal loss)', a.amt, [{ to: 'Trading A/c', what: 'Credit side: loss of goods' }, ...(uninsured ? [{ to: 'Profit and Loss A/c', what: `Debit side: uninsured loss ${rs(uninsured)}` }] : []), ...(claim ? [{ to: 'Balance Sheet', what: `Current asset: insurance claim ${rs(claim)}` }] : [])]);

  // ---- Trading Account
  let tr = null;
  let gp;
  if (inside) gp = gpTB;
  else {
    const netPur = pur - pret - goodsAmt;
    const purLabel = pret || goodsAmt ? `To Purchases (${rs(pur)})${pret ? ` less Returns (${rs(pret)})` : ''}${goodsAmt ? ` less Goods Withdrawn (${rs(goodsAmt)})` : ''}` : 'To Purchases';
    const trD = [...(os ? [['To Opening Stock', os]] : []), [purLabel, netPur], ...dexp.map((l) => expLine('To', l))];
    const trC = [[sret ? `By Sales (${rs(sale)}) less Returns (${rs(sret)})` : 'By Sales', sale - sret], ['By Closing Stock', closing], ...(lossCost ? [['By Abnormal Loss of Goods (fire)', lossCost]] : [])];
    tr = trading({ dr: trD, cr: trC });
    gp = tr.gp;
    same(gp, sale - sret + closing + lossCost - os - (pur - pret - goodsAmt) - sum(dexp.map((l) => l.amt + adjAmt(l.name, 'exp'))), `${firm}: gross profit by formula`);
  }

  // ---- adjustments that reach the Profit and Loss Account
  const depRows = [];
  const deps = {};
  for (const a of A('dep')) {
    const l = lineOf(a.on, ['fa']);
    const d = pctOf(l.amt, a.pct);
    deps[a.on] = d;
    depRows.push([`To Depreciation on ${T(a.on)} (${a.pct} per cent of ${rs(l.amt)})`, d]);
    log(a, `Depreciation on ${lc(a.on)}`, d, [{ to: 'Profit and Loss A/c', what: 'Debit side: depreciation' }, { to: 'Balance Sheet', what: `Deducted from ${lc(a.on)}` }]);
  }
  const debtor = deb[0];
  let dc = null;
  if (A('debts').length) {
    check(debtor, `${firm}: debts adjustment needs a debtors account`);
    const a = A('debts')[0];
    dc = debtsCalc({ debtors: debtor.amt, bdTB, further: a.further ?? 0, oldPdd, pddPct: a.pddPct ?? 0, discPct: a.discPct ?? 0, oldDisc });
    check(dc.charge >= 0 && dc.discChg >= 0, `${firm}: provision charge must not be negative`);
    log(a, 'Bad debts and provisions', dc.charge + dc.discChg, [{ to: 'Profit and Loss A/c', what: 'Debit side: bad debts and provisions' }, { to: 'Balance Sheet', what: 'Deducted from debtors' }]);
  }
  const icAmt = A('intcap').length ? pctOf(capOpen, A('intcap')[0].pct) : 0;
  for (const a of A('intcap')) log(a, 'Interest on capital', icAmt, [{ to: 'Profit and Loss A/c', what: 'Debit side: interest on capital' }, { to: 'Balance Sheet', what: 'Added to capital' }]);
  const idAmt = A('intdraw').length ? (A('intdraw')[0].amt ?? pctOf(draw, A('intdraw')[0].pct)) : 0;
  for (const a of A('intdraw')) log(a, 'Interest on drawings', idAmt, [{ to: 'Profit and Loss A/c', what: 'Credit side: interest on drawings' }, { to: 'Balance Sheet', what: 'Deducted from capital' }]);

  const plBase = (extra = []) => {
    const plD = [
      ...(gp < 0 ? [['To Gross Loss b/d', -gp]] : []),
      ...iexp.map((l) => expLine('To', l)),
      ...(dc ? [[`To Bad Debts${bdTB ? ` (${rs(bdTB)})` : ''}${dc.further ? ` + Further Bad Debts (${rs(dc.further)})` : ''}${dc.newPdd ? ` + New Provision (${rs(dc.newPdd)})` : ''}${oldPdd ? ` − Old Provision (${rs(oldPdd)})` : ''}`, dc.charge]] : bdTB ? [['To Bad Debts', bdTB]] : []),
      ...(dc && (dc.disc || oldDisc) ? [[`To Provision for Discount on Debtors (${rs(dc.disc)}${oldDisc ? ` − ${rs(oldDisc)} old` : ''})`, dc.discChg]] : []),
      ...depRows,
      ...(icAmt ? [[`To Interest on Capital (${A('intcap')[0].pct} per cent of ${rs(capOpen)})`, icAmt]] : []),
      ...(uninsured ? [['To Abnormal Loss, uninsured part', uninsured]] : []),
      ...extra,
    ];
    const plC = [...(gp > 0 ? [['By Gross Profit b/d', gp]] : []), ...inc.map(incLine), ...(idAmt ? [['By Interest on Drawings', idAmt]] : [])];
    return profitLoss({ dr: plD, cr: plC });
  };
  const plPre = plBase();
  let commission = 0;
  let pl = plPre;
  const npPre = plPre.np;
  if (A('mgr').length) {
    const a = A('mgr')[0];
    commission = commissionOn(npPre, a.pct, a.basis);
    const note = a.basis === 'before' ? `${a.pct} per cent of ${rs(npPre)}` : `${a.pct}/${100 + a.pct} of ${rs(npPre)}`;
    pl = plBase([[`To Manager's Commission (${note})`, commission]]);
    log(a, "Manager's commission", commission, [{ to: 'Profit and Loss A/c', what: "Debit side: manager's commission" }, { to: 'Balance Sheet', what: 'Current liability' }]);
    same(pl.np, npPre - commission, `${firm}: net profit after commission`);
    if (a.basis === 'before') same(commission, (npPre * a.pct) / 100, `${firm}: commission before charging`);
    else same(commission, ((npPre - commission) * a.pct) / 100, `${firm}: commission after charging is pct of the profit left`);
  }
  const np = pl.np;

  // ---- Balance Sheet
  const capClosing = capOpen + icAmt + np - draw - goodsAmt - idAmt;
  const capTerms = [`Capital (${rs(capOpen)})`, ...(icAmt ? [`+ Interest on Capital (${rs(icAmt)})`] : []), `${np >= 0 ? '+ Net Profit' : '− Net Loss'} (${rs(Math.abs(np))})`, `− Drawings (${rs(draw)})`, ...(goodsAmt ? [`− Goods Withdrawn (${rs(goodsAmt)})`] : []), ...(idAmt ? [`− Interest on Drawings (${rs(idAmt)})`] : [])];
  const capLabel = capTerms.join(' ');
  const capLine = [capLabel, capClosing];
  const faRows = fa.map((l) => (deps[l.name] ? [`${T(l.name)} (${rs(l.amt)}) less Depreciation (${rs(deps[l.name])})`, l.amt - deps[l.name]] : [T(l.name), l.amt]));
  const invRows = inv.map((l) => [T(l.name), l.amt]);
  const debtorRows = debtor
    ? [dc
      ? [`Debtors (${rs(dc.debtors)})${dc.further ? ` less Further Bad Debts (${rs(dc.further)})` : ''}${dc.newPdd ? ` less Provision for Doubtful Debts (${rs(dc.newPdd)})` : ''}${dc.disc ? ` less Provision for Discount (${rs(dc.disc)})` : ''}`, dc.net]
      : oldPdd || oldDisc ? [`Debtors (${rs(debtor.amt)}) less Provision (${rs(oldPdd + oldDisc)})`, debtor.amt - oldPdd - oldDisc] : ['Debtors', debtor.amt]]
    : [];
  if (!dc && (oldPdd || oldDisc)) check(debtor, `${firm}: an old provision needs debtors`);
  const stockRows = [[T('Closing stock'), closingAmt]];
  const caRows = ca.map((l) => [T(l.name), l.amt]);
  const preRows = A('pre').map((a) => [`Prepaid ${T(a.on)}`, a.amt]);
  const accRows = A('acc').map((a) => [`Accrued ${base(a.on)}`, a.amt]);
  const claimRows = claim ? [['Insurance Claim Receivable', claim]] : [];
  const assetsCur = [...stockRows, ...debtorRows, ...caRows, ...preRows, ...accRows, ...claimRows];
  const outRows = A('out').map((a) => [`Outstanding ${T(a.on)}`, a.amt]);
  const advRows = A('adv').map((a) => [`${T(a.on)} in Advance`, a.amt]);
  const mgrRows = commission ? [["Outstanding Manager's Commission", commission]] : [];
  const ltlRows = ltl.map((l) => [T(l.name), l.amt]);
  const clRows = [...cl.map((l) => [T(l.name), l.amt]), ...outRows, ...advRows, ...mgrRows];
  const liabFlat = [capLine, ...ltlRows, ...clRows];
  const assetsFlat = [...faRows, ...invRows, ...assetsCur];
  const bs = balanceSheet({ liabilities: liabFlat, assets: assetsFlat });
  const grp = (heads) => heads.filter(([, xs]) => xs.length).flatMap(([h, xs]) => [[`**${h}**`, null], ...xs]);
  const lg = grp([['Capital', [capLine]], ['Long-term liabilities', ltlRows], ['Current liabilities', clRows]]);
  const ag = grp([['Fixed assets', faRows], ['Investments', invRows], ['Current assets', assetsCur]]);
  const n = Math.max(lg.length, ag.length);
  const gRows = [];
  for (let i = 0; i < n; i++) gRows.push([lg[i]?.[0] ?? '', lg[i]?.[1] != null ? inr(lg[i][1]) : '', ag[i]?.[0] ?? '', ag[i]?.[1] != null ? inr(ag[i][1]) : '']);
  gRows.push(['**Total**', `**${inr(bs.total)}**`, '**Total**', `**${inr(bs.total)}**`]);
  const gHead = ['Liabilities', '₹', 'Assets', '₹'];
  const bsG = { headers: gHead, rows: gRows, md: mdTable(gHead, gRows), total: bs.total };
  same(bs.total, sum(assetsFlat.map(([, x]) => x)), `${firm}: balance sheet total`);

  // ---- the two-places rule
  for (const e of eff) {
    const places = new Set(e.effects.map((x) => x.to));
    if (e.k === 'closing') check(places.size === (inside ? 1 : 2), `${firm}: closing stock must appear ${inside ? 'once' : 'twice'}`);
    else if (e.k === 'loss') check(places.size === 1 + (uninsured ? 1 : 0) + (claim ? 1 : 0) && places.size >= 2, `${firm}: abnormal loss places`);
    else check(places.size === EXPECT[e.k], `${firm}: adjustment ${e.id} must be shown in two places, found ${places.size}`);
  }
  const adjTable = (() => {
    const headers = ['Adjustment', 'Amount (₹)', 'Trading or Profit and Loss Account', 'Balance Sheet'];
    const rows = eff.map((e) => [e.label, inr(e.amt), e.effects.filter((x) => x.to !== 'Balance Sheet').map((x) => `${x.to === 'Trading A/c' ? 'Trading A/c' : 'P and L A/c'}: ${x.what}`).join('; ') || 'Not shown', e.effects.filter((x) => x.to === 'Balance Sheet').map((x) => x.what).join('; ') || 'Not shown']);
    return { headers, rows, md: mdTable(headers, rows) };
  })();
  const adjList = (() => {
    const rows = eff.filter((e) => e.k !== 'closing').map((e, i) => [String(i + 1), e.label, inr(e.amt)]);
    return rows;
  })();

  // ---- adjusting journal entries
  const date2 = date;
  const E = [];
  const put = (dr, cr, note) => E.push({ date: date2, dr, cr, note });
  if (!inside) put([['Closing Stock A/c', closing]], [['Trading A/c', closing]], 'Being closing stock brought into the books');
  for (const a of A('out')) put([[`${T(a.on)} A/c`, a.amt]], [[`Outstanding ${T(a.on)} A/c`, a.amt]], `Being ${lc(a.on)} outstanding at the end of the year`);
  for (const a of A('pre')) put([[`Prepaid ${T(a.on)} A/c`, a.amt]], [[`${T(a.on)} A/c`, a.amt]], `Being ${lc(a.on)} paid in advance carried forward`);
  for (const a of A('acc')) put([[`Accrued ${base(a.on)} A/c`, a.amt]], [[`${T(a.on)} A/c`, a.amt]], `Being ${lc(base(a.on))} earned but not yet received`);
  for (const a of A('adv')) put([[`${T(a.on)} A/c`, a.amt]], [[`${T(a.on)} in Advance A/c`, a.amt]], `Being ${lc(a.on)} for the next year received in advance`);
  for (const a of A('dep')) put([['Depreciation A/c', deps[a.on]]], [[`${T(a.on)} A/c`, deps[a.on]]], `Being depreciation charged on ${lc(a.on)}`);
  if (dc) {
    if (dc.further) put([['Bad Debts A/c', dc.further]], [['Debtors A/c', dc.further]], 'Being further bad debts written off');
    if (oldPdd) put([['Provision for Doubtful Debts A/c', oldPdd]], [['Profit and Loss A/c', oldPdd]], 'Being the old provision for doubtful debts transferred to the Profit and Loss Account');
    if (dc.newPdd) put([['Profit and Loss A/c', dc.newPdd]], [['Provision for Doubtful Debts A/c', dc.newPdd]], 'Being new provision created for doubtful debts');
    if (oldDisc) put([['Provision for Discount on Debtors A/c', oldDisc]], [['Profit and Loss A/c', oldDisc]], 'Being the old provision for discount transferred to the Profit and Loss Account');
    if (dc.disc) put([['Profit and Loss A/c', dc.disc]], [['Provision for Discount on Debtors A/c', dc.disc]], 'Being provision created for discount on debtors');
  }
  if (icAmt) put([['Interest on Capital A/c', icAmt]], [['Capital A/c', icAmt]], 'Being interest on capital credited to the proprietor');
  if (idAmt) put([['Drawings A/c', idAmt]], [['Interest on Drawings A/c', idAmt]], 'Being interest charged on drawings');
  if (commission) put([["Manager's Commission A/c", commission]], [["Outstanding Manager's Commission A/c", commission]], "Being the manager's commission due for the year");
  if (goodsAmt) put([['Drawings A/c', goodsAmt]], [['Purchases A/c', goodsAmt]], 'Being goods withdrawn by the proprietor for personal use');
  if (lossCost) {
    put([['Abnormal Loss A/c', lossCost]], [['Purchases A/c', lossCost]], 'Being goods lost by fire');
    put([...(claim ? [['Insurance Claim A/c', claim]] : []), ...(uninsured ? [['Profit and Loss A/c', uninsured]] : [])], [['Abnormal Loss A/c', lossCost]], 'Being the insurance claim and the uninsured loss on the goods lost by fire');
  }
  const adjJournal = E.length ? journal(E) : null;

  const DEST = { os: 'Trading A/c, debit', pur: 'Trading A/c, debit', pret: 'Trading A/c, deducted from purchases', sret: 'Trading A/c, deducted from sales', sale: 'Trading A/c, credit', dexp: 'Trading A/c, debit', iexp: 'Profit and Loss A/c, debit', inc: 'Profit and Loss A/c, credit', draw: 'Balance Sheet, deducted from capital', cap: 'Balance Sheet, liabilities side', ltl: 'Balance Sheet, long-term liabilities', cl: 'Balance Sheet, current liabilities', fa: 'Balance Sheet, fixed assets', inv: 'Balance Sheet, investments', ca: 'Balance Sheet, current assets', deb: 'Balance Sheet, current assets', bd: 'Profit and Loss A/c, debit', cs: 'Balance Sheet, current assets', pdd: 'Provision account, replaced by the new provision', pdisc: 'Provision account, replaced by the new provision', gp: 'Profit and Loss A/c, credit' };
  const where = L.map((l) => [T(l.name), inr(l.amt), isDr(l.role) ? 'Debit' : 'Credit', DEST[l.role]]);

  return { firm, date, lines, closing, adj, L, tb, tr, pl, plPre, npPre, gp, np, bs, bsG, total: bs.total, capOpen, capClosing, capLabel, icAmt, idAmt, goodsAmt, lossCost, claim, uninsured, commission, dc, deps, amounts, eff, adjTable, adjList, adjJournal, journalEntries: E, where, os, pur, pret, sale, sret, draw, dexp, iexp, inc, fa, ca, cl, ltl, closingAmt, inside, debtor };
}

/** The effect of each adjustment alone on gross profit, net profit and the Balance Sheet total, against the same trial balance with none. */
export function impact(spec) {
  const baseF = adjFinals({ ...spec, adj: [] });
  const rows = [];
  const data = [];
  const sgn = (x) => (x === 0 ? 'No change' : `${x > 0 ? '+' : '−'}${inr(Math.abs(x))}`);
  for (const a of spec.adj) {
    const f = adjFinals({ ...spec, adj: [a] });
    const d = { id: a.id, gp: f.gp - baseF.gp, np: f.np - baseF.np, bs: f.total - baseF.total };
    data.push(d);
    rows.push([adjFinals({ ...spec, adj: [a] }).eff.find((e) => e.id === a.id).label, sgn(d.gp), sgn(d.np), sgn(d.bs)]);
  }
  const all = adjFinals(spec);
  const headers = ['Adjustment alone', 'Gross profit', 'Net profit', 'Balance Sheet total'];
  const full = [...rows, [spec.adj.some((a) => a.k === 'mgr') ? '**All together** (commission on the final profit)' : '**All together**', sgn(all.gp - baseF.gp), sgn(all.np - baseF.np), sgn(all.total - baseF.total)]];
  return { base: baseF, all, data, headers, rows: full, md: mdTable(headers, full), sgn };
}
