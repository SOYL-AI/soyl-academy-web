// Numerical, short-answer and long-answer items for ch09. Every derived amount is computed with figures.mjs and asserted.
import { short, long } from '../../cbse-11-accountancy-ch01/src/lib.mjs';
import { same, check, sum, inr, rs, mdTable, journal, pctOf, commissionOn, debtsCalc, sgn, NC, NC_SPEC, QC_SPEC, QC0, QCb, QCa, RK, RK_SPEC, SS, SS_SPEC, impact } from './figures.mjs';
import { QQ, numQ, S2, S3, L5 } from './qq.mjs';

const adjOf = (spec) => Object.fromEntries(spec.adj.map((x) => [x.id, x]));
const NCa = adjOf(NC_SPEC), QCa_ = adjOf(QC_SPEC), RKa = adjOf(RK_SPEC), SSa = adjOf(SS_SPEC);
const RK_IMPACT = impact(RK_SPEC);
same(sum(RK_IMPACT.data.map((d) => d.np)), RK_IMPACT.all.np - RK_IMPACT.base.np, 'Rani Kitchenware: effects of single adjustments add up to the total');
same(sum(RK_IMPACT.data.map((d) => d.bs)), RK_IMPACT.all.total - RK_IMPACT.base.total, 'Rani Kitchenware: Balance Sheet effects add up');
same(NC.np, 58050, 'Nisha Crafts net profit');
same(NC.gp, 166000, 'Nisha Crafts gross profit');
same(NC.total, 480200, 'Nisha Crafts Balance Sheet total');
same(QCb.commission, 13200, 'Qadir Cycles commission before charging');
same(QCa.commission, 12000, 'Qadir Cycles commission after charging');
same(SS.np, 69850, 'Suhana Stores net profit');

// ================================================================ numericals
{
  const paid = 48000, out = 6000;
  const v = same(paid + out, 54000, 'n_out_chk');
  QQ('n_out_chk', numQ({
    t: 1, d: 2, c: 'application', value: v, unit: '₹',
    stem: `Rohit Roofing, an imagined firm, paid wages of ${rs(paid)} during the year ended 31 March 2026. Wages of ${rs(out)} for March 2026 remained unpaid on that date. Find the wages to be charged to the Trading Account for the year (in ₹).`,
    sol: `Outstanding wages are added to the wages paid: ${inr(paid)} + ${inr(out)} = ${rs(v)}. The ${rs(out)} is shown as a current liability in the Balance Sheet.`,
  }));
}
{
  const prem = 24000, expired = 6, v = same((prem * expired) / 12, 12000, 'n_pre_chk share of the premium');
  QQ('n_pre_chk', numQ({
    t: 1, d: 3, c: 'application', value: v, unit: '₹',
    stem: `Sunil Stores, an imagined shop, paid an insurance premium of ${rs(prem)} on 1 October 2025 for twelve months. Find the insurance to be charged to the Profit and Loss Account for the year ended 31 March 2026 (in ₹).`,
    sol: `Only six months, October 2025 to March 2026, fall in the year: ${inr(prem)} × 6 ÷ 12 = ${rs(v)}. The remaining ${rs(prem - v)} is a prepaid expense, shown as a current asset.`,
  }));
}
{
  const cost = 240000, r = 15, d = pctOf(cost, r), v = same(cost - d, 204000, 'n_dep_chk');
  QQ('n_dep_chk', numQ({
    t: 1, d: 2, c: 'application', value: v, unit: '₹',
    stem: `Tanvi Tailors, an imagined firm, has machinery of ${rs(cost)} in its trial balance on 31 March 2026 and charges depreciation at ${r} per cent for the year. Find the value at which the machinery is shown in the Balance Sheet (in ₹).`,
    sol: `Depreciation = ${r} per cent of ${inr(cost)} = ${rs(d)}. Value in the Balance Sheet = ${inr(cost)} − ${inr(d)} = ${rs(v)}.`,
  }));
}
{
  const D = debtsCalc({ debtors: 80000, bdTB: 2000, further: 3000, pddPct: 5 });
  same(D.charge, 8850, 'n_prov_chk charge');
  QQ('n_prov_chk', numQ({
    t: 1, d: 3, c: 'application', value: D.charge, unit: '₹',
    stem: `Usha Umbrellas, an imagined firm, has debtors of ${rs(D.debtors)} and bad debts of ${rs(D.bdTB)} in its trial balance on 31 March 2026. Further bad debts are ${rs(D.further)}, and a provision for doubtful debts of ${D.pddPct} per cent on the debtors is to be created; there is no old provision. Find the amount charged to the Profit and Loss Account for bad debts and the provision (in ₹).`,
    sol: `New provision = ${D.pddPct} per cent of (${inr(D.debtors)} − ${inr(D.further)}) = ${rs(D.newPdd)}. Charge = ${inr(D.bdTB)} + ${inr(D.further)} + ${inr(D.newPdd)} = ${rs(D.charge)}.`,
  }));
}
{
  const D = debtsCalc({ debtors: 90000, further: 2000, pddPct: 5, discPct: 2 });
  same(D.disc, 1672, 'n_disc_chk');
  QQ('n_disc_chk', numQ({
    t: 1, d: 3, c: 'application', value: D.disc, unit: '₹',
    stem: `Vimal Vessels, an imagined firm, has debtors of ${rs(D.debtors)} on 31 March 2026. Further bad debts are ${rs(D.further)}. A provision for doubtful debts at ${D.pddPct} per cent and then a provision for discount on debtors at ${D.discPct} per cent are to be made. Find the provision for discount on debtors (in ₹).`,
    sol: `Debtors after further bad debts: ${inr(D.after)}. Provision for doubtful debts = ${D.pddPct} per cent = ${inr(D.newPdd)}, leaving ${inr(D.afterPdd)}. Provision for discount = ${D.discPct} per cent of ${inr(D.afterPdd)} = ${rs(D.disc)}.`,
  }));
}
{
  const np = 132000, p = 10, c = commissionOn(np, p, 'after');
  same(c, 12000, 'n_comm_chk');
  QQ('n_comm_chk', numQ({
    t: 1, d: 3, c: 'application', value: c, unit: '₹',
    stem: `The net profit of Sohan Sports, an imagined firm, for the year ended 31 March 2026 is ${rs(np)} before charging the manager's commission. The manager is entitled to ${p} per cent of the net profit after charging the commission. Find the manager's commission (in ₹).`,
    sol: `Commission = ${inr(np)} × ${p} ÷ ${100 + p} = ${rs(c)}. Net profit after the commission = ${inr(np)} − ${inr(c)} = ${inr(np - c)}, and ${p} per cent of that is ${inr(pctOf(np - c, p))}, the same amount.`,
  }));
}
{
  const cost = 36000, claim = 28000, v = same(cost - claim, 8000, 'n_loss_chk');
  QQ('n_loss_chk', numQ({
    t: 1, d: 2, c: 'application', value: v, unit: '₹',
    stem: `Meghna Mills, an imagined firm, lost goods costing ${rs(cost)} in a fire on 12 March 2026. The insurance company admitted a claim of ${rs(claim)}. Find the amount debited to the Profit and Loss Account for the loss (in ₹).`,
    sol: `The Trading Account is credited with the whole loss of ${inr(cost)}. The claim of ${inr(claim)} is a current asset. The uninsured loss = ${inr(cost)} − ${inr(claim)} = ${rs(v)} is debited to the Profit and Loss Account.`,
  }));
}
{
  const D = debtsCalc({ debtors: 150000, further: 6000, pddPct: 4 });
  same(D.net, 138240, 'n_debtors_bs');
  QQ('n_debtors_bs', numQ({
    t: 1, d: 3, c: 'application', value: D.net, unit: '₹',
    stem: `Nalini Novelties, an imagined firm, has debtors of ${rs(D.debtors)} on 31 March 2026. Further bad debts are ${rs(D.further)} and a provision for doubtful debts of ${D.pddPct} per cent is to be created on the remaining debtors. Find the amount at which the debtors are shown in the Balance Sheet (in ₹).`,
    sol: `Debtors after further bad debts: ${inr(D.debtors)} − ${inr(D.further)} = ${inr(D.after)}. Provision = ${D.pddPct} per cent = ${inr(D.newPdd)}. Debtors shown = ${inr(D.after)} − ${inr(D.newPdd)} = ${rs(D.net)}.`,
  }));
}
{
  const cap = 240000, ic = pctOf(cap, 6), np = 60000, dr = 36000, id = pctOf(dr, 5);
  const v = same(cap + ic + np - dr - id, 276600, 'n_capital');
  QQ('n_capital', numQ({
    t: 1, d: 4, c: 'application', value: v, unit: '₹',
    stem: `Omprakash Oils, an imagined firm, began the year ended 31 March 2026 with capital of ${rs(cap)}. It allows interest on capital at 6 per cent and charges interest on drawings at 5 per cent. Drawings were ${rs(dr)}, and the net profit for the year, after all adjustments including both interests, is ${rs(np)}. Find the capital shown in the Balance Sheet (in ₹).`,
    sol: `Interest on capital = ${inr(ic)} (added); interest on drawings = ${inr(id)} (deducted). Closing capital = ${inr(cap)} + ${inr(ic)} + ${inr(np)} − ${inr(dr)} − ${inr(id)} = ${rs(v)}.`,
  }));
}
{
  const np = 90000, p = 5, c = commissionOn(np, p, 'before');
  same(c, 4500, 'n_comm_before');
  QQ('n_comm_before', numQ({
    t: 1, d: 2, c: 'application', value: c, unit: '₹',
    stem: `The net profit of Parag Paints, an imagined firm, for the year ended 31 March 2026 is ${rs(np)} before charging the manager's commission. The manager gets ${p} per cent of the net profit before charging the commission. Find the commission (in ₹).`,
    sol: `Commission = ${p} per cent of ${inr(np)} = ${rs(c)}. The net profit after charging it is ${inr(np - c)}.`,
  }));
}
{
  const g = { os: 30000, pur: 210000, goods: 6000, wages: 20000, out: 2000, sale: 330000, cs: 40000 };
  const gp = same(g.sale + g.cs - g.os - (g.pur - g.goods) - (g.wages + g.out), 114000, 'n_gp_nc');
  QQ('n_gp_nc', numQ({
    t: 1, d: 3, c: 'application', value: gp, unit: '₹',
    stem: `For the year ended 31 March 2026, Bhavna Brushes, an imagined firm, shows opening stock ${rs(g.os)}, purchases ${rs(g.pur)}, wages ${rs(g.wages)} and sales ${rs(g.sale)}. Adjustments: closing stock ${rs(g.cs)}; wages outstanding ${rs(g.out)}; the proprietor took goods costing ${rs(g.goods)} for personal use, not yet recorded. Find the gross profit (in ₹).`,
    sol: `Debit side: ${inr(g.os)} + (${inr(g.pur)} − ${inr(g.goods)}) + (${inr(g.wages)} + ${inr(g.out)}) = ${inr(g.os + g.pur - g.goods + g.wages + g.out)}. Credit side: ${inr(g.sale)} + ${inr(g.cs)} = ${inr(g.sale + g.cs)}. Gross profit = ${rs(gp)}.`,
  }));
}
QQ('n_np_ss', numQ({
  t: 1, d: 4, c: 'application', value: SS.np, unit: '₹',
  stem: `The trial balance of Suhana Stores, an imagined shop, on 31 March 2026, drawn up after its Trading Account was prepared, is:\n\n${SS.tb.md}\n\nAdjustments: salaries outstanding ${rs(SSa.out.amt)}; rent paid in advance ${rs(SSa.pre.amt)}; depreciation on furniture at ${SSa.dep.pct} per cent; further bad debts ${rs(SSa.debts.further)} and a provision for doubtful debts at ${SSa.debts.pddPct} per cent on the remaining debtors; interest on capital at ${SSa.intcap.pct} per cent. Find the net profit for the year (in ₹).`,
  sol: `Gross profit from the trial balance ${inr(SS.gp)}. Charges: salaries ${inr(SS.iexp[0].amt + SSa.out.amt)}, rent ${inr(SS.iexp[1].amt - SSa.pre.amt)}, bad debts and provision ${inr(SS.dc.charge)}, depreciation ${inr(SS.deps.Furniture)}, interest on capital ${inr(SS.icAmt)}. Net profit = ${rs(SS.np)}.`,
}));
{
  const np0 = 95000, rent = 5000, ins = 2000, intr = 3000, dep = 8000;
  const np = same(np0 - rent + ins + intr - dep, 87000, 'n_corrected_np');
  QQ('n_corrected_np', numQ({
    t: 1, d: 4, c: 'application', value: np, unit: '₹',
    stem: `Ramesh Radios, an imagined firm, prepared its accounts for the year ended 31 March 2026 and reported a net profit of ${rs(np0)}. Four adjustments had been left out: rent outstanding ${rs(rent)}; insurance prepaid ${rs(ins)}; interest accrued but not received ${rs(intr)}; depreciation on machinery ${rs(dep)}. Find the correct net profit (in ₹).`,
    sol: `Outstanding rent lowers profit by ${inr(rent)} and depreciation by ${inr(dep)}; prepaid insurance raises it by ${inr(ins)} and accrued interest by ${inr(intr)}. Correct net profit = ${inr(np0)} − ${inr(rent)} + ${inr(ins)} + ${inr(intr)} − ${inr(dep)} = ${rs(np)}.`,
  }));
}
{
  const gp0 = 145000, g = 7000, gp = same(gp0 + g, 152000, 'n_goods_gp');
  QQ('n_goods_gp', numQ({
    t: 1, d: 3, c: 'application', value: gp, unit: '₹',
    stem: `Satish Saris, an imagined shop, calculated a gross profit of ${rs(gp0)} for the year ended 31 March 2026. It then found that the proprietor had taken goods costing ${rs(g)} for personal use and that no entry had been made. Find the correct gross profit (in ₹).`,
    sol: `The goods are deducted from purchases, so the cost of goods sold falls by ${inr(g)} and the gross profit rises: ${inr(gp0)} + ${inr(g)} = ${rs(gp)}. The ${inr(g)} is also added to drawings.`,
  }));
}

// ================================================================ short answer, 2 marks
const S2Q = (key, o) => QQ(key, short({ marks: 2, wl: S2, ...o }));
S2Q('s2_adj_need', {
  t: 1, d: 1, c: 'recall',
  stem: 'State two reasons why Ritu Rugs, an imagined firm, makes adjustments in its trial balance figures before preparing its final accounts.',
  model: 'Adjustments make the accounts follow the matching concept, which sets the expenses of the year against the income of the year, and the accrual basis, which records items when they are earned or incurred rather than when cash moves. Without them the profit and the Balance Sheet would be wrong.',
  sol: 'Matching concept and the accrual basis.',
  scheme: [['Matching of expenses with income of the year', 1], ['Accrual basis: earned or incurred, not paid or received', 1]],
});
S2Q('s2_closing', {
  t: 1, d: 2, c: 'understanding',
  stem: 'Explain how the closing stock of Sanjay Spares, an imagined firm, is shown in the final accounts when it is (i) given outside the trial balance and (ii) already in the trial balance.',
  model: 'When it is given outside the trial balance it is credited in the Trading Account and shown as a current asset, so it appears twice. When it is already in the trial balance the Trading Account has been prepared, so it is shown only as a current asset in the Balance Sheet.',
  sol: 'Two places outside the trial balance; one place inside.',
  scheme: [['Outside the trial balance: Trading Account credit and Balance Sheet', 1], ['Inside the trial balance: Balance Sheet only', 1]],
});
S2Q('s2_out_pre', {
  t: 1, d: 2, c: 'understanding',
  stem: 'Distinguish an outstanding expense from a prepaid expense by their treatment in the final accounts of Tarun Travels, an imagined firm, giving one example of each.',
  model: 'An outstanding expense, such as salaries for March paid in April, is added to the expense and shown as a current liability. A prepaid expense, such as insurance paid for the next year, is deducted from the expense and shown as a current asset.',
  sol: 'Added and liability, against deducted and asset.',
  scheme: [['Outstanding expense: added; current liability; example', 1], ['Prepaid expense: deducted; current asset; example', 1]],
});
S2Q('s2_acc_adv', {
  t: 1, d: 2, c: 'understanding',
  stem: 'Distinguish accrued income from income received in advance, with the treatment of each in the final accounts of Urmila Uniforms, an imagined firm.',
  model: 'Accrued income is income earned but not yet received; it is added to the income and shown as a current asset. Income received in advance is received for a later period; it is deducted from the income and shown as a current liability.',
  sol: 'Added and asset, against deducted and liability.',
  scheme: [['Accrued income: meaning, added to income, current asset', 1], ['Income in advance: meaning, deducted from income, current liability', 1]],
});
S2Q('s2_dep', {
  t: 1, d: 2, c: 'understanding',
  stem: 'State the two effects of charging depreciation on the machinery of Vasant Valves, an imagined firm, in its final accounts, and say why it is charged even though no cash is paid.',
  model: 'Depreciation is debited to the Profit and Loss Account and deducted from the machinery in the Balance Sheet. It is charged because the machinery loses value as it is used, and the cost of that use is an expense of the year even though no cash leaves the business.',
  sol: 'Profit and Loss debit; asset reduced; use of the asset is a cost.',
  scheme: [['Debit to Profit and Loss Account; deduction from the asset', 1], ['Reason: cost of using the asset belongs to the year', 1]],
});
S2Q('s2_provision', {
  t: 1, d: 2, c: 'understanding',
  stem: 'What is a provision for doubtful debts? Why does Waheed Wholesalers, an imagined firm, create it at the end of the year?',
  model: 'A provision for doubtful debts is an amount set aside out of profit for debtors who may not pay. It is created because the loss from such debts is likely to arise from this year\'s sales, so the matching concept requires it to be charged to this year\'s profit.',
  sol: 'Meaning and the matching reason.',
  scheme: [['Meaning: amount set aside for debtors who may not pay', 1], ['Reason: charge the likely loss to the year of the sales', 1]],
});
S2Q('s2_mgr', {
  t: 1, d: 3, c: 'understanding',
  stem: 'A manager of Xena Exports, an imagined firm, is paid a commission on net profit. Distinguish the commission worked out on the net profit before charging it from the commission on the net profit after charging it, with the formula for each.',
  model: 'On the net profit before charging it, the commission is the rate per cent of that profit. On the net profit after charging it, the commission is the rate divided by 100 plus the rate, multiplied by the profit before commission, because the commission is itself deducted first.',
  sol: 'Rate over 100, against rate over 100 plus rate.',
  scheme: [['Before charging: rate × profit ÷ 100', 1], ['After charging: rate × profit ÷ (100 + rate)', 1]],
});
S2Q('s2_goods', {
  t: 1, d: 3, c: 'understanding',
  stem: 'The proprietor of Yash Yarns, an imagined firm, took goods for personal use during the year without any entry. State the two effects of this adjustment in the final accounts.',
  model: 'The cost of the goods is deducted from purchases in the Trading Account, which raises the gross profit, because the goods were not bought for sale. It is also added to the drawings, which reduces the capital in the Balance Sheet.',
  sol: 'Lower purchases, higher drawings.',
  scheme: [['Deducted from purchases in the Trading Account', 1], ['Added to drawings, reducing capital', 1]],
});
S2Q('s2_loss', {
  t: 1, d: 3, c: 'understanding',
  stem: 'Goods of Zarina Zari Works, an imagined firm, were destroyed by fire, and the insurance company admitted a claim for only a part of their cost. How is the loss treated in the final accounts?',
  model: 'The Trading Account is credited with the full cost of the goods lost. The claim admitted is shown as a current asset, and the uninsured part, which is the difference, is debited to the Profit and Loss Account as an abnormal loss.',
  sol: 'Credit Trading; claim as asset; uninsured part to Profit and Loss.',
  scheme: [['Trading Account credited with the cost of goods lost', 1], ['Claim as a current asset; uninsured part to the Profit and Loss Account', 1]],
});

// ================================================================ short answer, 3 marks
const S3Q = (key, o) => QQ(key, short({ marks: 3, ...o }));
{
  const rent = 36000, rout = 3000, ins = 15000, ipre = 4000, com = 12000, cadv = 2000;
  const rv = same(rent + rout, 39000, 's3_exp rent'), iv = same(ins - ipre, 11000, 's3_exp insurance'), cv = same(com - cadv, 10000, 's3_exp commission');
  const H = ['Item', 'Paid or received', 'Adjustment', 'Shown in the Profit and Loss Account', 'Balance Sheet'];
  const rows = [['Rent', rs(rent), `+ ${rs(rout)} outstanding`, `Debit ${rs(rv)}`, `Current liability ${rs(rout)}`], ['Insurance', rs(ins), `− ${rs(ipre)} prepaid`, `Debit ${rs(iv)}`, `Current asset ${rs(ipre)}`], ['Commission received', rs(com), `− ${rs(cadv)} in advance`, `Credit ${rs(cv)}`, `Current liability ${rs(cadv)}`]];
  S3Q('s3_exp', {
    t: 1, d: 3, c: 'application',
    stem: `Anand Associates, an imagined firm, has these items in its trial balance on 31 March 2026: rent paid ${rs(rent)}; insurance paid ${rs(ins)}; commission received ${rs(com)}. Rent for March 2026 of ${rs(rout)} is unpaid; insurance of ${rs(ipre)} relates to 2026-27; commission of ${rs(cadv)} was received for April 2026. Show the amount to be shown in the Profit and Loss Account for each item and the Balance Sheet treatment of each adjustment.`,
    model: mdTable(H, rows),
    sol: 'Outstanding expenses are added; prepaid expenses and income in advance are deducted.',
    scheme: [[`Rent ${rs(rv)} with a current liability`, 1], [`Insurance ${rs(iv)} with a current asset`, 1], [`Commission ${rs(cv)} with a current liability`, 1]],
  });
}
{
  const D = debtsCalc({ debtors: 60000, bdTB: 1500, further: 2000, oldPdd: 3000, pddPct: 10 });
  same(D.charge, 6300, 's3_debts charge');
  same(D.net, 52200, 's3_debts net');
  S3Q('s3_debts', {
    t: 1, d: 3, c: 'application',
    stem: `Balwant Boards, an imagined firm, has debtors of ${rs(D.debtors)}, bad debts of ${rs(D.bdTB)} and a provision for doubtful debts of ${rs(D.oldPdd)} in its trial balance on 31 March 2026. Further bad debts of ${rs(D.further)} are to be written off and the provision is to be kept at ${D.pddPct} per cent of the remaining debtors. Find the amount charged to the Profit and Loss Account and the debtors to be shown in the Balance Sheet.`,
    model: `New provision = ${D.pddPct} per cent of (${inr(D.debtors)} − ${inr(D.further)}) = ${rs(D.newPdd)}.\n\nCharge to the Profit and Loss Account = ${inr(D.bdTB)} + ${inr(D.further)} + ${inr(D.newPdd)} − ${inr(D.oldPdd)} = **${rs(D.charge)}**.\n\nDebtors in the Balance Sheet = ${inr(D.debtors)} − ${inr(D.further)} − ${inr(D.newPdd)} = **${rs(D.net)}**.`,
    sol: 'Work out the new provision on the remaining debtors, then set the old provision against it.',
    scheme: [[`New provision ${rs(D.newPdd)}`, 1], [`Charge ${rs(D.charge)}`, 1], [`Debtors in the Balance Sheet ${rs(D.net)}`, 1]],
  });
}
{
  const sal = 8000, ins = 2500, fur = 50000, dep = pctOf(fur, 10);
  const J = journal([
    { date: '31 March 2026', dr: [['Salaries A/c', sal]], cr: [['Outstanding Salaries A/c', sal]], note: 'Being salaries outstanding at the end of the year' },
    { date: '31 March 2026', dr: [['Prepaid Insurance A/c', ins]], cr: [['Insurance A/c', ins]], note: 'Being insurance paid in advance carried forward' },
    { date: '31 March 2026', dr: [['Depreciation A/c', dep]], cr: [['Furniture A/c', dep]], note: 'Being depreciation charged on furniture' },
  ]);
  S3Q('s3_entries', {
    t: 1, d: 3, c: 'application',
    stem: `Chetan Chairs, an imagined firm, closes its books on 31 March 2026. Pass the adjusting journal entries for: salaries outstanding ${rs(sal)}; insurance paid in advance ${rs(ins)}; depreciation on furniture of ${rs(fur)} at 10 per cent.`,
    model: J.md,
    sol: 'Each entry records the adjustment in the books so that both its effects follow.',
    scheme: [['Entry for outstanding salaries', 1], ['Entry for prepaid insurance', 1], [`Entry for depreciation ${rs(dep)}`, 1]],
  });
}
{
  const g = 5000, dep = 12000, out = 4000;
  const H = ['Adjustment', 'Gross profit', 'Net profit', 'Balance Sheet total'];
  const rows = [[`Goods withdrawn ${rs(g)}`, sgn(g), sgn(g), 'No change: capital +' + inr(g) + ' and drawings −' + inr(g)], [`Depreciation ${rs(dep)}`, 'No change', sgn(-dep), sgn(-dep)], [`Salaries outstanding ${rs(out)}`, 'No change', sgn(-out), 'No change: liability +' + inr(out) + ' and capital −' + inr(out)]];
  S3Q('s3_effect', {
    t: 1, d: 4, c: 'analysis',
    stem: `Dhruv Dyes, an imagined firm, makes three adjustments for the year ended 31 March 2026: the proprietor took goods costing ${rs(g)} for personal use; depreciation of ${rs(dep)} is charged on machinery; salaries of ${rs(out)} are outstanding. State the effect of each, taken alone, on the gross profit, the net profit and the total of the Balance Sheet.`,
    model: mdTable(H, rows),
    sol: 'Goods withdrawn change the gross profit; the other two change only the net profit.',
    scheme: [['Goods withdrawn: gross profit and net profit up', 1], ['Depreciation: net profit and Balance Sheet total down', 1], ['Salaries outstanding: net profit down, total unchanged', 1]],
  });
}
{
  const np = 88000, p = 10, cb = commissionOn(np, p, 'before'), ca = commissionOn(np, p, 'after');
  same(cb, 8800, 's3_comm before');
  same(ca, 8000, 's3_comm after');
  const H = ['Basis', 'Commission', 'Net profit after commission'];
  const rows = [[`Before charging: ${p} per cent of ${inr(np)}`, rs(cb), rs(np - cb)], [`After charging: ${inr(np)} × ${p} ÷ ${100 + p}`, rs(ca), rs(np - ca)]];
  S3Q('s3_comm', {
    t: 1, d: 3, c: 'application',
    stem: `The net profit of Tanmay Tiles, an imagined firm, for the year ended 31 March 2026 is ${rs(np)} before charging the commission of its manager, who gets ${p} per cent. Find the commission and the net profit after commission if it is calculated (i) on the net profit before charging it and (ii) on the net profit after charging it.`,
    model: mdTable(H, rows),
    sol: 'The second basis gives a smaller commission because the commission is itself part of the profit it is based on.',
    scheme: [[`Commission before charging ${rs(cb)}`, 1], [`Commission after charging ${rs(ca)}`, 1], ['Net profit after commission on each basis', 1]],
  });
}

S3Q('s3_interest', {
  t: 1, d: 3, c: 'understanding',
  stem: 'Vinod Variety Store, an imagined shop, allows interest on the capital of its proprietor and charges interest on his drawings. Explain, with the two effects of each in the final accounts, why the business treats the first as an expense and the second as an income.',
  model: 'Interest on capital is a reward to the proprietor for the money he has invested, so the business treats it as an expense: it is debited to the Profit and Loss Account and added to capital in the Balance Sheet. Interest on drawings is a charge on the proprietor for taking money out early, so the business treats it as an income: it is credited to the Profit and Loss Account and deducted from capital in the Balance Sheet.',
  sol: 'Interest on capital: debit and added to capital; interest on drawings: credit and deducted from capital.',
  scheme: [['Interest on capital: reason and expense treatment', 1], ['Interest on drawings: reason and income treatment', 1], ['Balance Sheet effect of both: capital increased and reduced', 1]],
});

// ================================================================ long answer, 5 marks
const adjText = [
  `closing stock ${rs(NC.closing)}`,
  `wages outstanding ${rs(NCa.out.amt)}`,
  `insurance paid in advance ${rs(NCa.pre.amt)}`,
  `commission earned but not yet received ${rs(NCa.acc.amt)}`,
  `depreciation on machinery at ${NCa.dep.pct} per cent`,
  `further bad debts ${rs(NCa.debts.further)}, and the provision for doubtful debts to be ${NCa.debts.pddPct} per cent of the remaining debtors`,
  `interest on capital at ${NCa.intcap.pct} per cent`,
  `goods costing ${rs(NCa.goods.amt)} taken by the proprietor for personal use, not yet recorded`,
].map((t, i) => `(${i + 1}) ${t}`).join('; ');
QQ('l5_nc', long({
  t: 1, d: 4, c: 'application', marks: 5,
  stem: `The trial balance of Nisha Crafts, an imagined firm, on 31 March 2026 is given below.\n\n${NC.tb.md}\n\nAdjustments: ${adjText}.\n\nPrepare the Trading Account and the Profit and Loss Account for the year ended 31 March 2026 and the Balance Sheet as on that date.`,
  model: `**Trading Account for the year ended 31 March 2026**\n\n${NC.tr.md}\n\n**Profit and Loss Account for the year ended 31 March 2026**\n\n${NC.pl.md}\n\n**Balance Sheet as on 31 March 2026**\n\n${NC.bsG.md}`,
  sol: `Gross profit ${rs(NC.gp)}; net profit ${rs(NC.np)}; closing capital ${rs(NC.capClosing)}; Balance Sheet total ${rs(NC.total)}.`,
  scheme: [[`Trading Account: closing stock, outstanding wages, goods withdrawn; gross profit ${rs(NC.gp)}`, 1], [`Profit and Loss Account: prepaid insurance, accrued commission, bad debts with provision, depreciation, interest on capital; net profit ${rs(NC.np)}`, 2], [`Balance Sheet: capital ${rs(NC.capClosing)}, adjusted debtors and machinery, outstanding wages, prepaid and accrued items; totals ${rs(NC.total)}`, 2]],
}));
QQ('l5_qc', long({
  t: 1, d: 4, c: 'application', marks: 5,
  stem: `The trial balance of Qadir Cycles, an imagined firm, on 31 March 2026 is:\n\n${QC0.tb.md}\n\nAdjustments: (1) closing stock ${rs(QC0.closing)}; (2) salaries outstanding ${rs(QCa_.out.amt)}; (3) rent paid in advance ${rs(QCa_.pre.amt)}; (4) rent received in advance ${rs(QCa_.adv.amt)}; (5) depreciation on machinery at ${QCa_.dep.pct} per cent; (6) goods costing ${rs(QCa_.goods.amt)} taken by the proprietor, not yet recorded. The manager is entitled to a commission of 10 per cent. Find the net profit before the commission, the commission if it is calculated (i) on the net profit before charging it and (ii) on the net profit after charging it, and prepare the Profit and Loss Account on basis (ii).`,
  model: `Gross profit = **${rs(QC0.gp)}**. Net profit before the manager's commission = **${rs(QC0.np)}**.\n\n(i) Before charging: 10 per cent of ${inr(QC0.np)} = **${rs(QCb.commission)}**.\n\n(ii) After charging: ${inr(QC0.np)} × 10 ÷ 110 = **${rs(QCa.commission)}**.\n\n**Profit and Loss Account for the year ended 31 March 2026 (basis ii)**\n\n${QCa.pl.md}`,
  sol: `Net profit before commission ${rs(QC0.np)}; commission ${rs(QCb.commission)} on the first basis and ${rs(QCa.commission)} on the second; net profit after commission ${rs(QCa.np)}.`,
  scheme: [[`Trading Account working: gross profit ${rs(QC0.gp)}`, 1], [`Net profit before commission ${rs(QC0.np)}`, 1], [`Commission on basis (i) ${rs(QCb.commission)}`, 1], [`Commission on basis (ii) ${rs(QCa.commission)}`, 1], [`Profit and Loss Account on basis (ii), net profit ${rs(QCa.np)}`, 1]],
}));
{
  const D = debtsCalc({ debtors: 120000, bdTB: 4000, further: 6000, oldPdd: 8000, pddPct: 5, discPct: 2 });
  same(D.newPdd, 5700, 'l5_prov new provision');
  same(D.disc, 2166, 'l5_prov discount');
  same(D.charge, 7700, 'l5_prov charge');
  const H = ['Item', 'Working', 'Amount (₹)'];
  const pl = mdTable(H, [['Bad debts', '', inr(D.bdTB)], ['Further bad debts', '', inr(D.further)], ['New provision for doubtful debts', `5 per cent of ${inr(D.after)}`, inr(D.newPdd)], ['Less: old provision', '', `(${inr(D.oldPdd)})`], ['**Charge for bad debts and doubtful debts**', '', `**${inr(D.charge)}**`], ['Provision for discount on debtors', `2 per cent of ${inr(D.afterPdd)}`, inr(D.disc)]]);
  QQ('l5_prov', long({
    t: 1, d: 4, c: 'application', marks: 5,
    stem: `Gopal Gaskets, an imagined firm, has these balances in its trial balance on 31 March 2026: debtors ${rs(D.debtors)}; bad debts ${rs(D.bdTB)}; provision for doubtful debts ${rs(D.oldPdd)}. Adjustments: further bad debts ${rs(D.further)}; the provision for doubtful debts is to be ${D.pddPct} per cent of the remaining debtors; a provision for discount on debtors is to be made at ${D.discPct} per cent on the debtors after that provision. Prepare the Provision for Doubtful Debts Account, show the charges to the Profit and Loss Account and show how the debtors appear in the Balance Sheet.`,
    model: `**Provision for Doubtful Debts Account**\n\n${D.pddLedger.md}\n\n**Charges to the Profit and Loss Account**\n\n${pl}\n\n**Balance Sheet (assets side):** Debtors ${inr(D.debtors)} less further bad debts ${inr(D.further)} less provision for doubtful debts ${inr(D.newPdd)} less provision for discount ${inr(D.disc)} = **${rs(D.net)}**.`,
    sol: `New provision ${rs(D.newPdd)}; charge ${rs(D.charge)}; discount provision ${rs(D.disc)}; debtors shown ${rs(D.net)}.`,
    scheme: [[`Provision for Doubtful Debts Account: bad debts ${inr(D.bdTotal)} and balance c/d ${inr(D.newPdd)} on the debit side`, 2], [`Profit and Loss charge ${rs(D.charge)}`, 1], [`Provision for discount ${rs(D.disc)}`, 1], [`Debtors in the Balance Sheet ${rs(D.net)}`, 1]],
  }));
}
{
  const adjR = [
    `(1) salaries outstanding ${rs(RKa.out.amt)}`,
    `(2) depreciation on plant at ${RKa.dep.pct} per cent`,
    `(3) further bad debts ${rs(RKa.debts.further)}, a provision for doubtful debts at ${RKa.debts.pddPct} per cent of the remaining debtors, and a provision for discount at ${RKa.debts.discPct} per cent on the debtors after that provision`,
    `(4) interest on capital at ${RKa.intcap.pct} per cent`,
    `(5) interest on drawings at ${RKa.intdraw.pct} per cent`,
    `(6) goods costing ${rs(RKa.loss.amt)} destroyed by fire, for which the insurance company admitted a claim of ${rs(RKa.loss.claim)}`,
  ].join('; ');
  QQ('l5_effect', long({
    t: 1, d: 5, c: 'analysis', marks: 5,
    stem: `The trial balance of Rani Kitchenware, an imagined firm, on 31 March 2026 is given below, with closing stock of ${rs(RK.closing)} (after the fire).\n\n${RK.tb.md}\n\nAdjustments: ${adjR}.\n\nTaking each adjustment alone against the trial balance, state its effect on the gross profit, the net profit and the total of the Balance Sheet, and find the net profit after all the adjustments.`,
    model: `${RK_IMPACT.md}\n\nNet profit after all the adjustments = **${rs(RK.np)}**; the effects on net profit add up: ${inr(RK_IMPACT.base.np)} ${sgn(RK.np - RK_IMPACT.base.np)} = ${inr(RK.np)}.`,
    sol: `Gross profit rises only through the loss of goods; net profit after all adjustments ${rs(RK.np)}.`,
    scheme: [['Salaries outstanding and depreciation: effects stated', 1], ['Bad debts and both provisions: effects stated', 1], ['Interest on capital and on drawings: effects stated', 1], ['Loss of goods by fire: gross profit, net profit and insurance claim', 1], [`Net profit after all adjustments ${rs(RK.np)}`, 1]],
  }));
}
QQ('l5_theory', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain why adjustments are made at the end of the year in the books of Neelam Nurseries, an imagined firm, and state the two effects of any four adjustments in its final accounts.',
  model: 'Adjustments are made so that the accounts follow the matching concept and the accrual basis: the expenses and incomes of the year are recorded whether or not cash has moved. Outstanding expenses are added to the expense and shown as a current liability. Prepaid expenses are deducted from the expense and shown as a current asset. Accrued income is added to the income and shown as a current asset. Depreciation is debited to the Profit and Loss Account and deducted from the asset.',
  sol: 'Reason with the matching concept and the accrual basis, then four adjustments with two effects each.',
  scheme: [['Reason: matching concept and accrual basis', 1], ['First adjustment with both effects', 1], ['Second adjustment with both effects', 1], ['Third adjustment with both effects', 1], ['Fourth adjustment with both effects', 1]],
}));
{
  const np0 = 126000, out = 6000, pre = 3000, adv = 2500, dep = 9000, goods = 5000;
  const np = same(np0 - out + pre - adv - dep + goods, 116500, 'l5_omit corrected profit');
  const H = ['Omitted item', 'Effect on net profit', 'Effect on gross profit'];
  const rows = [[`Wages outstanding ${rs(out)}`, `Lower by ${rs(out)}`, `Lower by ${rs(out)}`], [`Rent prepaid ${rs(pre)}`, `Higher by ${rs(pre)}`, 'No change'], [`Commission received in advance ${rs(adv)}`, `Lower by ${rs(adv)}`, 'No change'], [`Depreciation ${rs(dep)}`, `Lower by ${rs(dep)}`, 'No change'], [`Goods withdrawn ${rs(goods)}`, `Higher by ${rs(goods)}`, `Higher by ${rs(goods)}`]];
  QQ('l5_omit', long({
    t: 1, d: 5, c: 'evaluation', marks: 5,
    stem: `Preeti Pens, an imagined firm, reported a net profit of ${rs(np0)} for the year ended 31 March 2026. The accountant had left out five adjustments: wages outstanding ${rs(out)}, wages being a direct expense; rent paid in advance ${rs(pre)}; commission received in advance ${rs(adv)}; depreciation on machinery ${rs(dep)}; and goods costing ${rs(goods)} taken by the proprietor for personal use. State the effect of each omission on the net profit and on the gross profit, find the correct net profit and say whether the reported profit was overstated or understated.`,
    model: `${mdTable(H, rows)}\n\nCorrect net profit = ${inr(np0)} − ${inr(out)} + ${inr(pre)} − ${inr(adv)} − ${inr(dep)} + ${inr(goods)} = **${rs(np)}**. The reported profit of ${inr(np0)} was overstated by ${rs(np0 - np)}.`,
    sol: 'Four of the five omissions lower the profit, and the goods and prepaid rent raise it; the net effect is a fall.',
    scheme: [['Effect of the omitted outstanding wages and depreciation', 1], ['Effect of the prepaid rent and commission in advance', 1], ['Effect of the goods withdrawn on the gross profit and net profit', 1], [`Correct net profit ${rs(np)}`, 1], [`Reported profit overstated by ${rs(np0 - np)}`, 1]],
  }));
}
void check;
