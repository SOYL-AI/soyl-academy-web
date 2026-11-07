// Numerical, short-answer and long-answer items for ch08. Every derived amount is computed with figures.mjs and asserted.
import { short, long } from '../../cbse-11-accountancy-ch01/src/lib.mjs';
import { journal } from '../../cbse-11-accountancy-ch01/src/acc.mjs';
import { same, check, sum, inr, rs, mdTable, gpOf, npOf, list, classify, FT, GB, IG, JE, OP } from './figures.mjs';
import { QQ, numQ, S2, S3, L5 } from './qq.mjs';

// ================================================================ numericals
{
  const price = 240000, carr = 6000, inst = 9000, repair = 4000;
  const cost = same(price + carr + inst, 255000, 'n_capcost_chk cost of the machine');
  QQ('n_capcost_chk', numQ({
    t: 1, d: 2, c: 'application', value: cost, unit: '₹',
    stem: `Meena Looms, an imagined firm, bought a new weaving machine for ${rs(price)}, paid ${rs(carr)} as carriage to bring it to the factory and ${rs(inst)} as fitting charges, and in the same month paid ${rs(repair)} to repair an old machine. Find the amount to be debited to the Machinery A/c (in ₹).`,
    sol: `The cost of the new machine includes the price, the carriage and the fitting charges: ${inr(price)} + ${inr(carr)} + ${inr(inst)} = ${rs(cost)}. The ${rs(repair)} spent on repairing the old machine is revenue expenditure and goes to the Profit and Loss Account.`,
  }));
}
{
  const g = { os: 25000, pur: 180000, dexp: [12000], sale: 260000, cs: 35000 };
  const gp = same(gpOf(g), 78000, 'n_gp_chk');
  QQ('n_gp_chk', numQ({
    t: 2, d: 2, c: 'application', value: gp, unit: '₹',
    stem: `Anil Stores, an imagined shop, had opening stock of ${rs(g.os)}, purchases of ${rs(g.pur)}, wages of ${rs(g.dexp[0])}, sales of ${rs(g.sale)} and closing stock of ${rs(g.cs)} for the year ended 31 March 2026. There were no returns. Find its gross profit (in ₹).`,
    sol: `Credit side: sales ${inr(g.sale)} + closing stock ${inr(g.cs)} = ${inr(g.sale + g.cs)}. Debit side before profit: ${inr(g.os)} + ${inr(g.pur)} + ${inr(g.dexp[0])} = ${inr(g.os + g.pur + g.dexp[0])}. Gross profit = ${rs(gp)}.`,
  }));
}
{
  const gp0 = 135000, iexp = [['Salaries', 48000], ['Rent', 21000]], inc = [['Interest received', 6000]];
  const np = same(npOf({ gp: gp0, inc: inc.map(([, x]) => x), iexp: iexp.map(([, x]) => x) }), 72000, 'n_np_chk');
  QQ('n_np_chk', numQ({
    t: 2, d: 2, c: 'application', value: np, unit: '₹',
    stem: `Bimal Stores, an imagined shop, has a gross profit of ${rs(gp0)} for the year ended 31 March 2026. In the same year it paid ${list(iexp)} and received ${list(inc)}. Find its net profit (in ₹).`,
    sol: `Credit side of the Profit and Loss Account: ${inr(gp0)} + ${inr(6000)} = ${inr(gp0 + 6000)}. Debit side: ${inr(48000)} + ${inr(21000)} = ${inr(69000)}. Net profit = ${inr(gp0 + 6000)} − ${inr(69000)} = ${rs(np)}.`,
  }));
}
{
  const pur = 385000, pret = 15000, carr = 8000;
  const net = same(pur - pret, 370000, 'n_netpur');
  QQ('n_netpur', numQ({
    t: 2, d: 1, c: 'application', value: net, unit: '₹',
    stem: `Chitra Cloth House, an imagined shop, bought goods worth ${rs(pur)} during the year, returned goods worth ${rs(pret)} to suppliers and paid ${rs(carr)} as carriage inwards. Find the net purchases to be shown in the Trading Account (in ₹), not counting the carriage.`,
    sol: `Net purchases = purchases less purchases returns = ${inr(pur)} − ${inr(pret)} = ${rs(net)}. The carriage inwards of ${rs(carr)} is a separate direct expense on the debit side.`,
  }));
}
{
  const cap = 310000, np = 95000, dr = 55000;
  const close = same(cap + np - dr, 350000, 'n_closing_cap');
  QQ('n_closing_cap', numQ({
    t: 2, d: 2, c: 'application', value: close, unit: '₹',
    stem: `Dilip Dairy, an imagined firm, began the year ended 31 March 2026 with capital of ${rs(cap)}, earned a net profit of ${rs(np)} and had drawings of ${rs(dr)}. Find the capital to be shown in its Balance Sheet (in ₹).`,
    sol: `Closing capital = ${inr(cap)} + ${inr(np)} − ${inr(dr)} = ${rs(close)}.`,
  }));
}
QQ('n_np_jatin', numQ({
  t: 2, d: 4, c: 'application', value: same(JE.np, 134000, 'n_np_jatin'), unit: '₹',
  stem: `The trial balance of Jatin Electricals, an imagined firm, on 31 March 2026 is:\n\n${JE.tb.md}\n\nClosing stock on that date is ${rs(JE.closing)}. Find the net profit for the year (in ₹).`,
  sol: `Trading Account: gross profit ${inr(JE.gp)}. Profit and Loss Account: indirect expenses ${inr(JE.indirect)} against gross profit and discount received ${inr(JE.incomes)}. Net profit = ${inr(JE.gp)} + ${inr(JE.incomes)} − ${inr(JE.indirect)} = ${rs(JE.np)}.`,
}));
{
  const C = classify([
    ['Purchase of a delivery van', 350000, 'cap', 'A fixed asset'],
    ['Petrol used by the van', 14000, 'rev', 'Used up in the year'],
    ['Repairs to the loom to keep it running', 7500, 'rev', 'Maintains the asset'],
    ['Carriage on cloth bought for resale', 4200, 'rev', 'Cost of goods'],
    ['Legal fees for registering the showroom purchased', 10000, 'cap', 'Cost of acquiring the asset'],
    ['Wages paid to own workers who built shelves in the showroom', 18000, 'cap', 'Cost of creating an asset'],
  ]);
  same(C.rev, 25700, 'n_rev_total');
  QQ('n_rev_total', numQ({
    t: 1, d: 3, c: 'application', value: C.rev, unit: '₹',
    stem: `Farhan Textiles, an imagined firm, made these payments in the year: delivery van ${rs(350000)}; petrol for the van ${rs(14000)}; repairs to a loom to keep it working ${rs(7500)}; carriage on cloth bought for resale ${rs(4200)}; legal fees for registering a showroom it bought ${rs(10000)}; and wages ${rs(18000)} paid to its own workers who built shelves in the showroom. Find the total revenue expenditure (in ₹).`,
    sol: `Petrol ${inr(14000)}, repairs ${inr(7500)} and carriage on goods ${inr(4200)} are revenue expenditure: ${rs(C.rev)}. The van, the legal fees and the shelf-building wages, ${inr(C.cap)} in all, are capital expenditure.`,
  }));
}
{
  const np0 = 82000, fit = 9000, rep = 5000;
  const np = same(np0 + fit - rep, 86000, 'n_corrected_np');
  QQ('n_corrected_np', numQ({
    t: 1, d: 4, c: 'application', value: np, unit: '₹',
    stem: `Lalit Printers, an imagined press, reported a net profit of ${rs(np0)} for the year ended 31 March 2026. Later it found that ${rs(fit)} of fitting charges on a new press had been debited to Wages A/c and ${rs(rep)} of repairs had been debited to Machinery A/c. Find the correct net profit (in ₹).`,
    sol: `The fitting charges are capital, so wages were overstated and profit understated by ${inr(fit)}. The repairs are revenue, so expenses were understated and profit overstated by ${inr(rep)}. Correct profit = ${inr(np0)} + ${inr(fit)} − ${inr(rep)} = ${rs(np)}.`,
  }));
}
{
  const g = { os: IG.os, pur: IG.pur, pret: IG.pret, dexp: IG.dexp.map((l) => l.amt), sale: IG.sale, cs: IG.closing };
  const gl = same(-gpOf(g), 15000, 'n_gl');
  same(gl, -IG.gp, 'n_gl agrees with the Ila Garments statements');
  QQ('n_gl', numQ({
    t: 2, d: 3, c: 'application', value: gl, unit: '₹',
    stem: `For the year ended 31 March 2026, Ila Garments, an imagined firm, had opening stock ${rs(g.os)}, purchases ${rs(g.pur)}, purchases returns ${rs(g.pret)}, carriage inwards ${rs(IG.dexp[0].amt)}, wages ${rs(IG.dexp[1].amt)}, sales ${rs(g.sale)} and closing stock ${rs(g.cs)}. Find the gross loss (in ₹).`,
    sol: `Debit side: ${inr(g.os)} + (${inr(g.pur)} − ${inr(g.pret)}) + ${inr(IG.dexp[0].amt)} + ${inr(IG.dexp[1].amt)} = ${inr(g.os + g.pur - g.pret + sum(g.dexp))}. Credit side: ${inr(g.sale)} + ${inr(g.cs)} = ${inr(g.sale + g.cs)}. The debit side is higher, so there is a gross loss of ${rs(gl)}.`,
  }));
}
{
  const first = JE.E[0];
  const amt = same(first.dr[0][1], 589000, 'n_close_dr');
  QQ('n_close_dr', numQ({
    t: 3, d: 3, c: 'application', value: amt, unit: '₹',
    stem: `Using the trial balance of Jatin Electricals, an imagined firm, on 31 March 2026 (opening stock ${rs(JE.os)}, purchases ${rs(JE.pur)}, wages ${rs(JE.dexp[0].amt)}, carriage inwards ${rs(JE.dexp[1].amt)}, customs duty ${rs(JE.dexp[2].amt)}), find the amount debited to the Trading Account in the closing entry that transfers the opening stock, purchases and direct expenses (in ₹).`,
    sol: `The Trading Account is debited with the total of the items closed: ${inr(JE.os)} + ${inr(JE.pur)} + ${inr(JE.dexp[0].amt)} + ${inr(JE.dexp[1].amt)} + ${inr(JE.dexp[2].amt)} = ${rs(amt)}.`,
  }));
}
{
  const tot = same(OP.opening.total, 178000, 'n_open_total');
  QQ('n_open_total', numQ({
    t: 3, d: 3, c: 'application', value: tot, unit: '₹',
    stem: `The Balance Sheet of Omkar Paints, an imagined firm, on 31 March 2027 shows assets: furniture ${rs(OP.fa[0].amt)}, closing stock ${rs(OP.closing)}, debtors ${rs(OP.ca[0].amt)} and cash at bank ${rs(OP.ca[1].amt)}. The only liability is creditors of ${rs(OP.cl[0].amt)}. Find the total of the opening entry passed on 1 April 2027 (in ₹).`,
    sol: `The opening entry debits every asset: ${inr(OP.fa[0].amt)} + ${inr(OP.closing)} + ${inr(OP.ca[0].amt)} + ${inr(OP.ca[1].amt)} = ${rs(tot)}. The credits, the capital of ${inr(OP.capClosing)} and the creditors of ${inr(OP.cl[0].amt)}, give the same total.`,
  }));
}
QQ('n_bs_jatin', numQ({
  t: 2, d: 4, c: 'application', value: same(JE.total, 668000, 'n_bs_jatin'), unit: '₹',
  stem: `For Jatin Electricals, an imagined firm, the trial balance on 31 March 2026 shows capital ${rs(JE.capOpen)}, drawings ${rs(JE.draw)}, bank loan ${rs(JE.ltl[0].amt)} and creditors ${rs(JE.cl[0].amt)} among its balances, and the net profit for the year is ${rs(JE.np)}. Find the total of its Balance Sheet (in ₹).`,
  sol: `Closing capital = ${inr(JE.capOpen)} + ${inr(JE.np)} − ${inr(JE.draw)} = ${inr(JE.capClosing)}. Total of the liabilities side = ${inr(JE.capClosing)} + ${inr(JE.ltl[0].amt)} + ${inr(JE.cl[0].amt)} = ${rs(JE.total)}, and the assets side has the same total.`,
}));

// ================================================================ short answer, 2 marks
const S2Q = (key, o) => QQ(key, short({ marks: 2, wl: S2, ...o }));
S2Q('s2_cap_features', {
  t: 1, d: 1, c: 'recall',
  stem: 'State any two features of capital expenditure, with one example, in the context of Hetal Engineering, an imagined workshop.',
  model: 'Capital expenditure gives a benefit for more than one accounting year, and it is incurred to acquire a fixed asset or to increase its earning capacity or life. It is not repeated every year. Example: the purchase of a lathe machine for the workshop.',
  sol: 'Two features and one example.',
  scheme: [['Any two features', 1], ['One suitable example', 1]],
});
S2Q('s2_deferred', {
  t: 1, d: 2, c: 'understanding',
  stem: 'Explain what is meant by deferred revenue expenditure, using the example of a heavy advertising campaign paid for by Isha Cosmetics, an imagined firm.',
  model: 'Deferred revenue expenditure is a revenue expense whose benefit is expected to last for several years, so only a part is charged to the current year and the rest is carried forward. A heavy advertising campaign to launch a new range is an example.',
  sol: 'Meaning with the example.',
  scheme: [['Meaning: revenue item, benefit over several years, balance carried forward', 1], ['Example linked to the campaign', 1]],
});
S2Q('s2_receipts', {
  t: 1, d: 2, c: 'understanding',
  stem: 'Distinguish a capital receipt from a revenue receipt by meaning, with one example of each from the business of Jai Furniture, an imagined firm.',
  model: 'A capital receipt comes from a source such as the proprietor, a loan or the sale of a fixed asset and does not arise from the normal course of trading; example: sale of an old almirah. A revenue receipt arises from the day-to-day trading and incomes; example: sale of furniture to customers.',
  sol: 'Meaning and example of each kind of receipt.',
  scheme: [['Capital receipt with example', 1], ['Revenue receipt with example', 1]],
});
S2Q('s2_direct_ind', {
  t: 2, d: 2, c: 'understanding',
  stem: 'Give two examples each of direct expenses and of indirect expenses of Kishore Foods, an imagined food-processing firm, and say in which account each kind is shown.',
  model: 'Direct expenses, such as wages and carriage inwards, are incurred in getting goods ready for sale and are debited to the Trading Account. Indirect expenses, such as office salaries and carriage outwards, are the operating costs of the business and are debited to the Profit and Loss Account.',
  sol: 'Two examples of each with the accounts.',
  scheme: [['Direct expenses: examples and Trading Account', 1], ['Indirect expenses: examples and Profit and Loss Account', 1]],
});
S2Q('s2_trading', {
  t: 2, d: 1, c: 'recall',
  stem: 'State the purpose of the Trading Account of Latha Hardware, an imagined firm, and name the balancing figure it ends with.',
  model: 'The Trading Account is prepared to find the gross profit or gross loss, which is the result of buying and selling goods before any indirect expense is charged. The balancing figure is the gross profit, or the gross loss, which is carried down to the Profit and Loss Account.',
  sol: 'Purpose and the balancing figure.',
  scheme: [['Purpose: to find the gross result of trading', 1], ['Balancing figure: gross profit or gross loss', 1]],
});
S2Q('s2_grouping', {
  t: 2, d: 2, c: 'understanding',
  stem: 'Distinguish between grouping and marshalling of the items in the Balance Sheet of Madhu Agencies, an imagined firm.',
  model: 'Grouping means putting items of the same nature under one head, for example debtors, stock and cash under current assets. Marshalling means arranging those groups, and the items in them, in a definite order, either by liquidity or by permanence.',
  sol: 'Grouping is by nature; marshalling is by order.',
  scheme: [['Grouping explained with an example', 1], ['Marshalling explained: order of liquidity or permanence', 1]],
});
S2Q('s2_why_close', {
  t: 3, d: 2, c: 'understanding',
  stem: 'Give two reasons why Nalini Spices, an imagined firm, passes closing entries at the end of the year.',
  model: 'Closing entries transfer the balances of all the nominal accounts to the Trading and Profit and Loss Accounts, so that the accounts of the next year start with no balances of income or expense. They also carry the net profit and the drawings to the capital account.',
  sol: 'Closing nominal accounts and updating capital.',
  scheme: [['Nominal accounts closed so the next year starts afresh', 1], ['Profit or loss and drawings transferred to capital', 1]],
});
S2Q('s2_opening', {
  t: 3, d: 2, c: 'understanding',
  stem: 'What is an opening entry? Name the accounts debited and credited in the opening entry that Om Optics, an imagined firm, passes on the first day of the new year.',
  model: 'An opening entry is the journal entry passed on the first day of a new year to bring forward the balances of assets, liabilities and capital from the last Balance Sheet. All assets are debited, and the liabilities and the capital account are credited.',
  sol: 'Meaning with the accounts debited and credited.',
  scheme: [['Meaning of an opening entry', 1], ['Assets debited; liabilities and capital credited', 1]],
});
S2Q('s2_stake', {
  t: 2, d: 2, c: 'understanding',
  stem: 'Name two stakeholders who read the financial statements of Pratap Printers, an imagined firm, and state what each of them looks for.',
  model: 'The proprietor looks at profit and the value of capital to judge how well the business is doing. A creditor or a bank looks at the assets and liabilities to judge whether the firm can pay its dues on time, and the tax authorities look at the profit to assess tax.',
  sol: 'Two stakeholders with their information needs.',
  scheme: [['First stakeholder with information need', 1], ['Second stakeholder with information need', 1]],
});

// ================================================================ short answer, 3 marks
const S3Q = (key, o) => QQ(key, short({ marks: 3, ...o }));
{
  const C = classify([
    ['A new computer for the office', 48000, 'cap', 'A fixed asset'],
    ['Electricity bill of the workshop', 6200, 'rev', 'Used up in the year'],
    ['Cost of a van for deliveries', 420000, 'cap', 'A fixed asset'],
    ['Repairs to the delivery van', 5800, 'rev', 'Maintains the asset'],
    ['Salaries to the staff', 90000, 'rev', 'Used up in the year'],
    ['Cost of extending the workshop', 150000, 'cap', 'Adds to a fixed asset'],
  ]);
  same(C.cap, 618000, 's3_classify capital');
  same(C.rev, 102000, 's3_classify revenue');
  S3Q('s3_classify', {
    t: 1, d: 2, c: 'application',
    stem: `Naveen Metals, an imagined firm, made these payments during the year: new computer for the office ${rs(48000)}; electricity bill of the workshop ${rs(6200)}; cost of a delivery van ${rs(420000)}; repairs to the van ${rs(5800)}; staff salaries ${rs(90000)}; cost of extending the workshop ${rs(150000)}. Classify each as capital or revenue expenditure and find the total of each class.`,
    model: `${C.md}\n\nTotal capital expenditure = ${inr(48000)} + ${inr(420000)} + ${inr(150000)} = **${rs(C.cap)}**. Total revenue expenditure = ${inr(6200)} + ${inr(5800)} + ${inr(90000)} = **${rs(C.rev)}**.`,
    sol: 'Asset-creating payments are capital; payments used up in the year are revenue.',
    scheme: [['Capital items identified (computer, van, extension)', 1], ['Revenue items identified', 1], ['Both totals correct', 1]],
  });
}
{
  const np0 = 64000, inst = 7000, rep = 3000;
  const np = same(np0 + inst - rep, 68000, 's3_wrong corrected profit');
  const H = ['Item', 'Wrong treatment', 'Effect on profit', 'Effect on the asset'];
  const rows = [[`Fitting charges ${rs(inst)}`, 'Debited to Wages A/c', `Understated by ${rs(inst)}`, `Machinery understated by ${rs(inst)}`], [`Repairs ${rs(rep)}`, 'Debited to Furniture A/c', `Overstated by ${rs(rep)}`, `Furniture overstated by ${rs(rep)}`]];
  S3Q('s3_wrong', {
    t: 1, d: 4, c: 'analysis',
    stem: `Manoj Stores, an imagined firm, reported a net profit of ${rs(np0)}. It was then found that ${rs(inst)} paid as fitting charges on a new machine had been debited to Wages A/c, and ${rs(rep)} paid for repairs to furniture had been debited to Furniture A/c. State the effect of each error on the profit and on the value of the asset, and find the correct net profit.`,
    model: `${mdTable(H, rows)}\n\nCorrect net profit = ${inr(np0)} + ${inr(inst)} − ${inr(rep)} = **${rs(np)}**.`,
    sol: 'A capital item charged to expenses understates profit and the asset; a revenue item added to an asset overstates both.',
    scheme: [['Effect of the first error on profit and on the asset', 1], ['Effect of the second error on profit and on the asset', 1], [`Correct net profit ${rs(np)}`, 1]],
  });
}
S3Q('s3_gross_loss', {
  t: 2, d: 3, c: 'application',
  stem: `Prepare the Trading Account of Ila Garments, an imagined firm, for the year ended 31 March 2026 from these figures: opening stock ${rs(IG.os)}; purchases ${rs(IG.pur)}; purchases returns ${rs(IG.pret)}; carriage inwards ${rs(IG.dexp[0].amt)}; wages ${rs(IG.dexp[1].amt)}; sales ${rs(IG.sale)}; closing stock ${rs(IG.closing)}.`,
  model: `**Trading Account of Ila Garments for the year ended 31 March 2026**\n\n${IG.tr.md}`,
  sol: 'The debit side is larger than the credit side, so the balancing figure is a gross loss.',
  scheme: [['Debit side items with net purchases', 1], ['Credit side items with closing stock', 1], [`Gross loss ${rs(-IG.gp)} as the balancing figure`, 1]],
});
S3Q('s3_np_loss', {
  t: 2, d: 3, c: 'application',
  stem: `Prepare the Profit and Loss Account of Gauri Bakery, an imagined bakery, for the year ended 31 March 2025 from these figures: gross profit ${rs(GB.gp)}; salaries ${rs(GB.iexp[0].amt)}; rent ${rs(GB.iexp[1].amt)}; interest on loan ${rs(GB.iexp[2].amt)}; commission received ${rs(GB.inc[0].amt)}.`,
  model: `**Gauri Bakery: Profit and Loss Account, year ended 31 March 2025**\n\n${GB.pl.md}\n\nThe result is a net loss of ${rs(-GB.np)}, which is transferred to the Capital Account.`,
  sol: 'Indirect expenses exceed the gross profit and commission, so there is a net loss.',
  scheme: [['Debit side: the three indirect expenses', 1], ['Credit side: gross profit and commission', 1], [`Net loss ${rs(-GB.np)} shown as the balancing figure`, 1]],
});
{
  const e = (k) => OP.E.find((x) => x.step === k);
  const three = [e(4), e(7), e(8)];
  const jr = journal(three.map((x) => ({ ...x })));
  S3Q('s3_close3', {
    t: 3, d: 3, c: 'application',
    stem: `Omkar Paints, an imagined firm, finds on 31 March 2027 a gross profit of ${rs(OP.gp)} in its Trading Account, a net profit of ${rs(OP.np)} in its Profit and Loss Account, and a debit balance of ${rs(OP.draw)} in its Drawings A/c. Pass the three closing entries that transfer the gross profit, the net profit and the drawings.`,
    model: jr.md,
    sol: 'Gross profit to the Profit and Loss Account, net profit to capital, drawings against capital.',
    scheme: [['Entry for the gross profit', 1], ['Entry for the net profit', 1], ['Entry for the drawings', 1]],
  });
}
{
  S3Q('s3_cap_calc', {
    t: 2, d: 3, c: 'application',
    stem: `Ila Garments, an imagined firm, began the year ended 31 March 2026 with capital of ${rs(IG.capOpen)}, suffered a net loss of ${rs(-IG.np)} and had drawings of ${rs(IG.draw)}. It owes a bank loan of ${rs(IG.ltl[0].amt)} repayable after four years and creditors of ${rs(IG.cl[0].amt)}. Show the liabilities side of its Balance Sheet, in the order of permanence, and find its total.`,
    model: `Closing capital = ${inr(IG.capOpen)} − ${inr(-IG.np)} − ${inr(IG.draw)} = **${rs(IG.capClosing)}**.\n\n${mdTable(['Liabilities', '₹'], [[IG.capLabel, inr(IG.capClosing)], [IG.ltl[0].name === 'Bank loan' ? 'Bank Loan (long-term)' : IG.ltl[0].name, inr(IG.ltl[0].amt)], ['Creditors (current)', inr(IG.cl[0].amt)], ['**Total**', `**${inr(IG.total)}**`]])}`,
    sol: 'Capital first, then the long-term loan, then current liabilities.',
    scheme: [[`Closing capital ${rs(IG.capClosing)}`, 1], ['Items in the order of permanence', 1], [`Total ${rs(IG.total)}`, 1]],
  });
}

// ================================================================ long answer, 5 marks
const tbRows = (f) => f.tb.md;
QQ('l5_stmts', long({
  t: [2], d: 4, c: 'application', marks: 5,
  stem: `From the following trial balance of Jatin Electricals, an imagined firm, on 31 March 2026, prepare the Trading Account and the Profit and Loss Account for the year ended on that date, and the Balance Sheet as on that date. Closing stock is ${rs(JE.closing)}.\n\n${tbRows(JE)}`,
  model: `**Trading Account for the year ended 31 March 2026**\n\n${JE.tr.md}\n\n**Profit and Loss Account for the year ended 31 March 2026**\n\n${JE.pl.md}\n\n**Balance Sheet as on 31 March 2026**\n\n${JE.bsPerm.md}`,
  sol: `Gross profit ${rs(JE.gp)}; net profit ${rs(JE.np)}; closing capital ${rs(JE.capClosing)}; Balance Sheet total ${rs(JE.total)}.`,
  scheme: [[`Trading Account: debit and credit items with closing stock; gross profit ${rs(JE.gp)}`, 2], [`Profit and Loss Account: indirect expenses and discount received; net profit ${rs(JE.np)}`, 1], [`Balance Sheet: capital adjusted for profit and drawings (${rs(JE.capClosing)}); both totals ${rs(JE.total)}`, 2]],
}));
QQ('l5_close', long({
  t: 3, d: 4, c: 'application', marks: 5,
  stem: `The trial balance of Gauri Bakery, an imagined bakery, on 31 March 2025 shows: ${list(GB.L.filter((l) => ['os', 'pur', 'sret', 'dexp', 'iexp', 'draw'].includes(l.role)).map((l) => [l.name, l.amt]))} on the debit side, and ${list(GB.L.filter((l) => ['sale', 'pret', 'inc'].includes(l.role)).map((l) => [l.name, l.amt]))} on the credit side. Closing stock is ${rs(GB.closing)}. Pass the closing entries for the year.`,
  model: GB.closingJournal.md,
  sol: `Gross profit ${rs(GB.gp)}; net loss ${rs(-GB.np)} transferred to capital; drawings ${rs(GB.draw)} transferred to capital.`,
  scheme: [['Entries transferring the debit items and the sales and returns to the Trading Account', 1], ['Closing stock and gross profit entries', 1], ['Entries transferring the indirect expenses and the income to the Profit and Loss Account', 1], [`Net loss ${rs(-GB.np)} transferred to Capital A/c`, 1], [`Drawings ${rs(GB.draw)} transferred to Capital A/c`, 1]],
}));
QQ('l5_bs2', long({
  t: 2, d: 4, c: 'application', marks: 5,
  stem: `Farhan Textiles, an imagined firm, has these items at 31 March 2026: capital at the start of the year ${rs(FT.capOpen)}, net profit for the year ${rs(FT.np)}, drawings ${rs(FT.draw)}, bank loan ${rs(FT.ltl[0].amt)}, creditors ${rs(FT.cl[0].amt)}, machinery ${rs(FT.fa[0].amt)}, furniture ${rs(FT.fa[1].amt)}, investments ${rs(FT.inv[0].amt)}, closing stock ${rs(FT.closing)}, debtors ${rs(FT.ca[0].amt)} and cash at bank ${rs(FT.ca[1].amt)}. Prepare its Balance Sheet (i) in the order of permanence and (ii) in the order of liquidity.`,
  model: `Closing capital = ${inr(FT.capOpen)} + ${inr(FT.np)} − ${inr(FT.draw)} = ${rs(FT.capClosing)}.\n\n**(i) Order of permanence**\n\n${FT.bsGrouped.md}\n\n**(ii) Order of liquidity**\n\n${FT.bsLiq.md}`,
  sol: `Total of each Balance Sheet ${rs(FT.total)}.`,
  scheme: [[`Closing capital ${rs(FT.capClosing)}`, 1], ['Permanence order: liabilities side with groups', 1], ['Permanence order: assets side with groups', 1], ['Liquidity order: assets from cash to machinery', 1], [`Liquidity order: liabilities side; both totals ${rs(FT.total)}`, 1]],
}));
QQ('l5_distinction', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Distinguish between capital expenditure and revenue expenditure on four points, giving two examples of each, with reference to the transactions of a manufacturing firm such as Rohan Steel Works, an imagined firm.',
  model: 'Capital expenditure gives a benefit for more than one year, whereas revenue expenditure is used up within the year. Capital expenditure is incurred to acquire or improve a fixed asset, whereas revenue expenditure is incurred to run the business or to maintain assets. Capital expenditure is non-recurring, whereas revenue expenditure recurs. Capital expenditure appears as an asset in the Balance Sheet, whereas revenue expenditure is charged to the Trading or Profit and Loss Account. Examples of capital expenditure: purchase of a furnace, cost of installing it. Examples of revenue expenditure: wages, repairs to the furnace.',
  sol: 'Four points of difference with two examples of each.',
  scheme: [['Benefit period', 1], ['Purpose', 1], ['Recurring or non-recurring', 1], ['Where shown in the books', 1], ['Two examples of each', 1]],
}));
{
  const C = classify([
    ['Purchase of a refrigerator for the shop', 28000, 'cap', 'A fixed asset'],
    ['Transport of the refrigerator to the shop', 1500, 'cap', 'Cost of bringing the asset to its place'],
    ['Wages paid to the shop assistants', 36000, 'rev', 'Used up in the year'],
    ['Servicing of the refrigerator after one year', 900, 'rev', 'Maintains the asset'],
    ['Purchase of goods for resale', 160000, 'rev', 'Cost of goods sold'],
    ['Cost of building a new storeroom', 75000, 'cap', 'Adds to a fixed asset'],
    ['Heavy advertising for the launch of a new line, benefit over three years', 45000, 'def', 'A revenue item benefiting several years'],
    ['Rent of the shop', 24000, 'rev', 'Used up in the year'],
    ['Legal fees paid for registering the shop purchased', 6000, 'cap', 'Cost of acquiring the asset'],
    ['Electricity charges', 4800, 'rev', 'Used up in the year'],
  ]);
  same(C.cap, 110500, 'l5_classify capital');
  QQ('l5_classify', long({
    t: 1, d: 3, c: 'application', marks: 5,
    stem: `Classify the following payments of Sheela Provisions, an imagined store, as capital expenditure, revenue expenditure or deferred revenue expenditure, giving a reason for each: (1) purchase of a refrigerator for the shop ${rs(28000)}; (2) transport of the refrigerator to the shop ${rs(1500)}; (3) wages of the shop assistants ${rs(36000)}; (4) servicing of the refrigerator after one year ${rs(900)}; (5) purchase of goods for resale ${rs(160000)}; (6) cost of building a new storeroom ${rs(75000)}; (7) heavy advertising for the launch of a new line, benefit over three years ${rs(45000)}; (8) rent of the shop ${rs(24000)}; (9) legal fees for registering the shop that was purchased ${rs(6000)}; (10) electricity charges ${rs(4800)}.`,
    model: `${C.md}\n\nTotal capital expenditure = **${rs(C.cap)}**; revenue expenditure = **${rs(C.rev)}**; deferred revenue expenditure = **${rs(C.def)}**.`,
    sol: 'Each class with its reason, and the three totals.',
    scheme: [['Items 1 and 2 classified with reasons', 1], ['Items 3 and 4 classified with reasons', 1], ['Items 5 and 6 classified with reasons', 1], ['Items 7 to 9 classified with reasons', 1], ['Item 10 and the three totals', 1]],
  }));
}
{
  const np0 = 126000, items = [['Cost of fitting a new boiler', 12000, 'Wages A/c', 'cap'], ['Repairs to the old boiler', 4500, 'Boiler A/c', 'rev'], ['Heavy cost of replacing the roof of the godown, which will last twenty years', 38000, 'Repairs A/c', 'cap']];
  const eff = items.map(([, x, , c]) => (c === 'cap' ? x : -x));
  const np = same(np0 + sum(eff), 171500, 'l5_wrong corrected profit');
  const H = ['Item', 'Debited to', 'Correct class', 'Effect on reported profit', 'Effect on assets'];
  const rows = items.map(([t, x, a, c], i) => [`${t} ${rs(x)}`, a, c === 'cap' ? 'Capital' : 'Revenue', c === 'cap' ? `Understated by ${rs(x)}` : `Overstated by ${rs(x)}`, c === 'cap' ? `Understated by ${rs(x)}` : `Overstated by ${rs(x)}`]);
  void rows;
  QQ('l5_wrong', long({
    t: 1, d: 5, c: 'evaluation', marks: 5,
    stem: `Parveen Chemicals, an imagined firm, reported a net profit of ${rs(np0)} for the year ended 31 March 2026. Its auditor then found three items wrongly treated: ${rs(12000)} spent on fitting a new boiler was debited to Wages A/c; ${rs(4500)} spent on repairs to the old boiler was debited to Boiler A/c; and ${rs(38000)} spent on replacing the roof of the godown, which will last twenty years, was debited to Repairs A/c. Evaluate each treatment, find the correct net profit, and say whether the assets in the Balance Sheet were understated or overstated overall.`,
    model: `${mdTable(H, rows)}\n\nCorrect net profit = ${inr(np0)} + ${inr(12000)} − ${inr(4500)} + ${inr(38000)} = **${rs(np)}**. Net effect on the assets: understated by ${inr(12000)} + ${inr(38000)} = ${inr(50000)} and overstated by ${inr(4500)}, so the assets were understated by **${rs(45500)}** overall.`,
    sol: 'The two capital items were charged to expenses, so profit and assets were understated; the revenue item was added to an asset, so profit and assets were overstated.',
    scheme: [['Boiler fitting: capital item charged to wages, with the effect', 1], ['Boiler repairs: revenue item added to the asset, with the effect', 1], ['Roof replacement: capital item charged to repairs, with the effect', 1], [`Correct net profit ${rs(np)}`, 1], [`Net understatement of assets ${rs(45500)}`, 1]],
  }));
  same(50000 - 4500, 45500, 'l5_wrong net asset effect');
}
void check;
