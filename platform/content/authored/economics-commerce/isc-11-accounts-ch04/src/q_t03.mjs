// t03: adjusting and closing journal entries at the introductory depth of this chapter (full final accounts are
// Chapters 12 and 13). Imagined firms; entries come from acc.mjs journal() (every entry balances) and closingEntries()
// of fig.mjs, which asserts the profits against trading() and profitLoss().
import { mcq, ar, tf, fb, short, long } from './lib.mjs';
import { same, check, inr, rs, mdTable, journal, postD, acct, postedOnly, closingEntries, E1 } from './fig.mjs';
import { QQ, numQ } from './qq.mjs';

// ================================================================ multiple choice
QQ('m_adjust_meaning', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Entries passed at the end of the period by Koraput Spices, an imagined firm, to bring in items such as expenses due, expenses paid in advance and income earned but not yet received, so that the accounts show the true position, are called',
  opts: ['adjusting entries', 'opening entries', 'compound entries', 'closing entries'],
  sol: 'These entries adjust the figures of the period for accruals and prepayments. Opening entries start the new books, compound entries have more than two accounts, and closing entries transfer nominal balances.',
}));
QQ('m_close_sales', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Hojai Textiles, an imagined firm, has a credit balance in its Sales A/c at the year end. The closing entry that transfers it to the Trading Account is',
  opts: ['Sales A/c Dr To Trading A/c', 'Trading A/c Dr To Sales A/c', 'Sales A/c Dr To Profit and Loss A/c', 'Profit and Loss A/c Dr To Sales A/c'],
  sol: 'A credit balance is cleared by debiting the account, and the Trading Account is credited. The second entry would double the sales, and sales belong to the Trading Account, not the Profit and Loss Account.',
}));
QQ('m_close_purchases', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'At the year end the Purchases A/c of Yavatmal Foods, an imagined firm, shows a debit balance of ₹3,10,000. The closing entry is',
  opts: ['Trading A/c Dr ₹3,10,000 To Purchases A/c ₹3,10,000', 'Purchases A/c Dr ₹3,10,000 To Trading A/c ₹3,10,000', 'Profit and Loss A/c Dr ₹3,10,000 To Purchases A/c ₹3,10,000', 'Capital A/c Dr ₹3,10,000 To Purchases A/c ₹3,10,000'],
  sol: 'A debit balance is cleared by crediting the account, and purchases are a charge to the Trading Account. The second entry reverses the direction, and neither the Profit and Loss Account nor the Capital Account takes purchases.',
}));
QQ('m_outstanding_entry', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'On 31 March 2028 the wages of ₹6,000 for the last week of the year are due but unpaid at Dharwad Sweets, an imagined firm. The adjusting entry is',
  opts: ['Wages A/c Dr To Outstanding Wages A/c', 'Outstanding Wages A/c Dr To Wages A/c', 'Wages A/c Dr To Cash A/c', 'Profit and Loss A/c Dr To Cash A/c'],
  sol: 'The expense of the year is increased by debiting Wages, and the amount owed is a liability credited to Outstanding Wages. The second entry is the reverse, and the last two assume a payment that has not been made.',
}));
QQ('m_prepaid_entry', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Of the insurance premium paid during the year by Basti Looms, an imagined firm, ₹2,400 relates to the next year. The adjusting entry at the year end is',
  opts: ['Prepaid Insurance A/c Dr To Insurance A/c', 'Insurance A/c Dr To Prepaid Insurance A/c', 'Insurance A/c Dr To Cash A/c', 'Prepaid Insurance A/c Dr To Cash A/c'],
  sol: 'The unused premium becomes an asset, so Prepaid Insurance is debited and the expense is reduced by crediting Insurance. The other entries reverse that or suppose another payment.',
}));
QQ('m_accrued_entry', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Commission of ₹5,000 earned by Latur Agencies, an imagined firm, in the last month of the year has not been received. The adjusting entry is',
  opts: ['Accrued Commission A/c Dr To Commission Received A/c', 'Commission Received A/c Dr To Accrued Commission A/c', 'Cash A/c Dr To Commission Received A/c', 'Accrued Commission A/c Dr To Cash A/c'],
  sol: 'The income is earned, so Commission Received is credited, and the amount due to the firm is an asset debited as Accrued Commission. No cash has moved, so Cash cannot appear.',
}));
QQ('m_depr_entry', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Sagar Rice Mill, an imagined firm, charges depreciation of ₹36,000 on its machinery for the year, writing it off directly from the asset. The adjusting entry is',
  opts: ['Depreciation A/c Dr To Machinery A/c', 'Machinery A/c Dr To Depreciation A/c', 'Depreciation A/c Dr To Cash A/c', 'Profit and Loss A/c Dr To Cash A/c'],
  sol: 'Depreciation is an expense of the year, debited, and the asset is reduced by crediting Machinery. No cash is paid, so the last two are wrong, and the second would raise the asset.',
}));
QQ('m_adjust_effect', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'Rampur Mills, an imagined firm, has not recorded the electricity used in the last month of the year, and the bill is unpaid. After the adjustment is made, its net profit',
  opts: ['decreases, and a liability appears in the balance sheet', 'increases, and an asset appears in the balance sheet', 'decreases, and an asset appears in the balance sheet', 'is unchanged, and the liabilities rise'],
  sol: 'An unrecorded expense of the year lowers profit, and the amount unpaid is owed, a liability. The profit cannot rise, and an unpaid bill is not an asset.',
}));
QQ('m_direct_exp', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'At the year end Kasaragod Rubber, an imagined firm, closes its expense accounts. The pair that is transferred to the Trading Account is',
  opts: ['wages and carriage inwards', 'rent and salaries', 'interest received and commission received', 'depreciation and audit fees'],
  sol: 'Wages and carriage inwards are direct expenses incurred in bringing goods to a saleable state. Rent, salaries, depreciation and audit fees are indirect expenses, and the received items are incomes of the Profit and Loss Account.',
}));
QQ('m_chk_adjust', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Of the ₹18,000 paid as insurance during the year by Mokokchung Crafts, an imagined firm, ₹4,500 covers the next year. For the year just ended, the insurance charged to the Profit and Loss Account is',
  opts: [rs(13500), rs(18000), rs(22500), rs(4500)],
  sol: `Insurance of the year = ${inr(18000)} − ${inr(4500)} = ${inr(13500)}. The full payment, the payment increased by the prepaid part and the prepaid part alone are the wrong ways of using the figures.`,
}));

// ================================================================ assertion-reason
QQ('ar_outstanding', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'Wages that are due but unpaid at the year end of an imagined firm are shown as a liability in its balance sheet.',
  r: 'Wages is a direct expense and is closed by transfer to the Trading Account.',
  sol: 'Both are true, yet the reason does not explain the assertion: the liability arises because the amount is owed, whatever account the wages are closed to.',
}));
QQ('ar_closing', ar({
  t: 3, d: 4, c: 'analysis', verdict: 'both-false',
  a: 'To close the Sales A/c of an imagined firm, the Trading A/c is debited and the Sales A/c is credited.',
  r: 'Sales A/c is a nominal account that normally has a debit balance at the year end.',
  sol: 'Both are false. Sales normally has a credit balance, so it is debited to close it and the Trading A/c is credited.',
}));

// ================================================================ true-false, fill-blank
QQ('tf_chk_closing', tf({
  t: 3, d: 1, c: 'understanding', ans: true,
  stem: 'A closing entry of an imagined firm transfers the balance of a nominal account, such as Rent, to the Trading Account or the Profit and Loss Account at the end of the period.',
  sol: 'Closing entries clear the nominal accounts, and the transfer is made to the Trading or the Profit and Loss Account as the nature of the item requires.',
}));
QQ('tf_outstanding_asset', tf({
  t: 3, d: 2, c: 'understanding', ans: false,
  stem: 'Salaries due but unpaid at the year end are an asset of Banda Printers, an imagined firm, and are recorded by debiting Outstanding Salaries A/c.',
  sol: 'Outstanding salaries are owed by the firm, so they are a liability, and the entry credits Outstanding Salaries and debits Salaries.',
}));
QQ('fb_closing_np', fb({
  t: 3, d: 2, c: 'recall',
  stem: 'The closing entry that transfers a net profit debits the ______ A/c and credits the ______ A/c.',
  acc: [['Profit and Loss'], ['Capital']],
  sol: 'Net profit moves from the Profit and Loss Account to the Capital Account.',
}));
QQ('fb_outstanding', fb({
  t: 3, d: 2, c: 'recall',
  stem: 'In the balance sheet, an expense that is due but unpaid is shown as a ______, while an expense paid in advance is shown as an ______.',
  acc: [['liability'], ['asset']],
  sol: 'An unpaid expense is a liability and a prepaid expense is an asset.',
}));

// ================================================================ numerical
const TT = {
  date: '31 Mar 2028',
  tradingDr: [['Opening Stock A/c', 60000], ['Purchases A/c', 320000], ['Sales Return A/c', 10000], ['Wages A/c', 38000]],
  tradingCr: [['Sales A/c', 460000], ['Purchases Return A/c', 12000], ['Closing Stock A/c', 75000]],
  plDr: [['Rent A/c', 30000], ['Salaries A/c', 36000], ['Depreciation A/c', 8000]],
  plCr: [['Commission Received A/c', 6000]],
};
const TTc = closingEntries(TT);
same(TTc.gp, 119000, 'Tamluk gross profit');
same(TTc.np, 51000, 'Tamluk net profit');
QQ('n_gross_profit', numQ({
  t: 3, d: 4, c: 'application', value: TTc.gp,
  stem: 'At the year end Tamluk Textiles, an imagined firm, has opening stock ₹60,000, purchases ₹3,20,000, purchases return ₹12,000, sales ₹4,60,000, sales return ₹10,000, wages ₹38,000 and closing stock ₹75,000. Closing the accounts to the Trading Account, the gross profit is (in ₹)',
  sol: `Debit side = ${inr(60000)} + ${inr(320000)} + ${inr(10000)} + ${inr(38000)} = ${inr(428000)}; credit side = ${inr(460000)} + ${inr(12000)} + ${inr(75000)} = ${inr(547000)}; gross profit = ${inr(547000)} − ${inr(428000)} = ${rs(TTc.gp)}.`,
}));
QQ('n_net_profit', numQ({
  t: 3, d: 4, c: 'application', value: TTc.np,
  stem: 'Tamluk Textiles, an imagined firm, earned a gross profit of ₹1,19,000 in the year. It paid rent ₹30,000 and salaries ₹36,000, provided depreciation of ₹8,000 and received commission of ₹6,000. After the closing entries to the Profit and Loss Account, the net profit transferred to Capital A/c is (in ₹)',
  sol: `Credit side = ${inr(119000)} + ${inr(6000)} = ${inr(125000)}; debit side = ${inr(30000)} + ${inr(36000)} + ${inr(8000)} = ${inr(74000)}; net profit = ${inr(125000)} − ${inr(74000)} = ${rs(TTc.np)}.`,
}));
const DP = { cost: 240000, pct: 15 };
DP.amt = (DP.cost * DP.pct) / 100;
same(DP.amt, 36000, 'depreciation amount');
QQ('n_depr_amount', numQ({
  t: 3, d: 2, c: 'application', value: DP.amt,
  stem: 'Shimoga Weaves, an imagined firm, has a loom of ₹2,40,000 and charges depreciation of 15 per cent for the year. The amount debited to Depreciation A/c in the adjusting entry is (in ₹)',
  sol: `Depreciation = ${inr(240000)} × 15 ÷ 100 = ${rs(DP.amt)}.`,
}));
const EX = { insPaid: 30000, insPre: 7500, elecPaid: 20000, elecDue: 3000 };
EX.total = EX.insPaid - EX.insPre + EX.elecPaid + EX.elecDue;
same(EX.total, 45500, 'expenses adjusted');
QQ('n_expense_adjusted', numQ({
  t: 3, d: 3, c: 'application', value: EX.total,
  stem: 'Insurance paid during the year by Dausa Printers, an imagined firm, was ₹30,000, of which ₹7,500 covers the next year. Electricity paid was ₹20,000, and the bill of ₹3,000 for the last month is still unpaid. After adjustments, the two expenses together debited to the Profit and Loss Account are (in ₹)',
  sol: `Insurance = ${inr(30000)} − ${inr(7500)} = ${inr(22500)}; electricity = ${inr(20000)} + ${inr(3000)} = ${inr(23000)}; together = ${inr(22500)} + ${inr(23000)} = ${rs(EX.total)}.`,
}));
const IN = { recd: 48000, adv: 6000, acc: 9000 };
IN.total = IN.recd - IN.adv + IN.acc;
same(IN.total, 51000, 'income adjusted');
QQ('n_income_adjusted', numQ({
  t: 3, d: 3, c: 'application', value: IN.total,
  stem: 'Cuddalore Brokers, an imagined firm, received commission of ₹48,000 during the year. Of this, ₹6,000 was received in advance for the next year, and commission of ₹9,000 earned in the year has not yet been received. The commission credited to the Profit and Loss Account is (in ₹)',
  sol: `Commission of the year = ${inr(48000)} − ${inr(6000)} + ${inr(9000)} = ${rs(IN.total)}.`,
}));

// ================================================================ short answer, 2 marks
QQ('s2_adjusting_meaning', short({
  t: 3, d: 2, c: 'understanding', marks: 2,
  stem: 'What are adjusting entries? Why are they passed before the final accounts are prepared?',
  model: '**Adjusting entries** are journal entries passed at the end of the accounting period to record items that have not yet been entered or that belong to another period, such as closing stock, outstanding and prepaid expenses, accrued income, income received in advance and depreciation.\n\nThey are passed so that the expenses and incomes of the period are correctly stated, and the assets and liabilities show the true position, before profit is found.',
  sol: 'Meaning with examples, then the purpose.',
  scheme: [['Meaning: entries at the end of the period for items not yet recorded or belonging to another period, with an example', 1], ['Purpose: correct expenses, incomes, assets and liabilities, hence correct profit', 1]],
}));
QQ('s2_closing_meaning', short({
  t: 3, d: 2, c: 'understanding', marks: 2,
  stem: 'What are closing entries? Name the two accounts to which the nominal accounts are transferred.',
  model: '**Closing entries** are journal entries passed at the end of the period to transfer the balances of nominal accounts, such as purchases, sales and expenses, so that those accounts are closed and start the next period with no balance.\n\nThe balances are transferred to the **Trading Account** and the **Profit and Loss Account**.',
  sol: 'Meaning, then the two accounts.',
  scheme: [['Meaning: entries transferring nominal account balances at the end of the period', 1], ['Trading Account and Profit and Loss Account named', 1]],
}));
const PI = [E1([['Prepaid Insurance A/c', 6000]], [['Insurance A/c', 6000]], 'Being insurance paid in advance for the next year', '31 Mar 2028')];
journal(PI);
QQ('s2_prepaid_entry', short({
  t: 3, d: 2, c: 'application', marks: 2,
  stem: 'Of the insurance premium of ₹24,000 paid during the year, Churu Carpets, an imagined firm, finds that ₹6,000 relates to the next year. Pass the adjusting entry and state where Prepaid Insurance appears in the balance sheet.',
  model: `${journal(PI).md}\n\nInsurance charged to the year = ${inr(24000)} − ${inr(6000)} = ${inr(18000)}. Prepaid Insurance is an **asset**, shown on the assets side of the balance sheet.`,
  sol: 'The unused part becomes an asset and the expense falls.',
  scheme: [['Prepaid Insurance A/c debited and Insurance A/c credited with ₹6,000', 1], ['Shown as an asset in the balance sheet', 1]],
}));
const AC = [E1([['Accrued Commission A/c', 5000]], [['Commission Received A/c', 5000]], 'Being commission earned but not yet received', '31 Mar 2028')];
QQ('s2_accrued_entry', short({
  t: 3, d: 2, c: 'application', marks: 2,
  stem: 'Commission of ₹5,000 earned by Jhansi Agents, an imagined firm, in March is received only in April. Pass the adjusting entry at 31 March and say whether Accrued Commission is an asset or a liability.',
  model: `${journal(AC).md}\n\nThe commission is an income of the year just ended, and Accrued Commission is an **asset**, because the amount is due to the firm.`,
  sol: 'Earned income is credited, the amount due is an asset.',
  scheme: [['Accrued Commission A/c debited and Commission Received A/c credited', 1], ['Accrued Commission identified as an asset', 1]],
}));

// ================================================================ short answer, 3 marks
const WC = [
  E1([['Purchases Return A/c', 5000]], [['Trading A/c', 5000]], 'Being Purchases Return transferred to Trading Account', '31 Mar 2028'),
  E1([['Trading A/c', 140000]], [['Purchases A/c', 140000]], 'Being Purchases transferred to Trading Account', '31 Mar 2028'),
  E1([['Sales A/c', 210000]], [['Trading A/c', 210000]], 'Being Sales transferred to Trading Account', '31 Mar 2028'),
  E1([['Trading A/c', 12000]], [['Wages A/c', 12000]], 'Being Wages transferred to Trading Account', '31 Mar 2028'),
];
QQ('s3_closing_entries', short({
  t: 3, d: 3, c: 'application', marks: 3,
  stem: 'On 31 March 2028 the ledger of Wardha Cycles, an imagined firm, shows Purchases ₹1,40,000, Purchases Return ₹5,000, Sales ₹2,10,000 and Wages ₹12,000. Pass the closing entries to transfer these accounts to the Trading Account.',
  model: `${journal(WC).md}`,
  sol: 'Debit balances are credited to close them, credit balances are debited.',
  scheme: [['Purchases closed by crediting it and debiting Trading A/c', 1], ['Purchases Return and Sales debited and Trading A/c credited', 1], ['Wages closed by crediting it and debiting Trading A/c, with narrations', 1]],
}));
const IT = [
  E1([['Rent A/c', 8000]], [['Outstanding Rent A/c', 8000]], 'Being rent due for the last month', '31 Mar 2028'),
  E1([['Prepaid Insurance A/c', 2400]], [['Insurance A/c', 2400]], 'Being insurance paid in advance', '31 Mar 2028'),
  E1([['Accrued Commission A/c', 5000]], [['Commission Received A/c', 5000]], 'Being commission earned but not received', '31 Mar 2028'),
];
QQ('s3_adjusting_three', short({
  t: 3, d: 3, c: 'application', marks: 3,
  stem: 'Itanagar Printers, an imagined firm, finds at the year end that (i) rent of ₹8,000 for the last month is unpaid, (ii) ₹2,400 of the insurance paid belongs to the next year and (iii) commission of ₹5,000 has been earned but not received. Pass the adjusting entries.',
  model: `${journal(IT).md}`,
  sol: 'One entry for each adjustment, each with the right asset or liability.',
  scheme: [['Outstanding rent: Rent A/c Dr, Outstanding Rent A/c Cr', 1], ['Prepaid insurance: Prepaid Insurance A/c Dr, Insurance A/c Cr', 1], ['Accrued commission: Accrued Commission A/c Dr, Commission Received A/c Cr', 1]],
}));
const SR = { cost: 360000, pct: 10 };
SR.dep = (SR.cost * SR.pct) / 100;
same(SR.dep, 36000, 'Sagar dep');
const SRj = [
  E1([['Depreciation A/c', SR.dep]], [['Machinery A/c', SR.dep]], 'Being depreciation at 10 per cent charged', '31 Mar 2028'),
  E1([['Profit and Loss A/c', SR.dep]], [['Depreciation A/c', SR.dep]], 'Being Depreciation transferred to Profit and Loss Account', '31 Mar 2028'),
];
QQ('s3_depr_adj', short({
  t: 3, d: 3, c: 'application', marks: 3,
  stem: 'Sagar Rice Mill, an imagined firm, has machinery costing ₹3,60,000 and charges depreciation of 10 per cent for the year, writing it off from the machinery account. Pass the adjusting entry and the closing entry for depreciation, and state the value at which the machinery appears in the balance sheet.',
  model: `${journal(SRj).md}\n\nMachinery in the balance sheet = ${inr(360000)} − ${inr(36000)} = ${rs(324000)}.`,
  sol: 'Depreciation is first charged, then closed to the Profit and Loss Account.',
  scheme: [['Adjusting entry: Depreciation A/c Dr, Machinery A/c Cr ₹36,000', 1], ['Closing entry: Profit and Loss A/c Dr, Depreciation A/c Cr', 1], ['Machinery shown at ₹3,24,000', 1]],
}));
const TR = { recd: 120000, adv: 20000 };
const TRj = [E1([['Rent Received A/c', TR.adv]], [['Rent Received in Advance A/c', TR.adv]], 'Being rent received for the next year', '31 Mar 2028')];
QQ('s3_income_advance', short({
  t: 3, d: 3, c: 'application', marks: 3,
  stem: 'During the year Tezpur Rentals, an imagined firm, received rent of ₹1,20,000, of which ₹20,000 is for the next year. Pass the adjusting entry, find the rent that belongs to the year, and say how the amount received in advance appears in the balance sheet.',
  model: `${journal(TRj).md}\n\nRent of the year = ${inr(120000)} − ${inr(20000)} = ${rs(100000)}. Rent Received in Advance is a **liability**, because the firm owes the service or the amount for the next year.`,
  sol: 'The advance leaves the income and becomes a liability.',
  scheme: [['Entry: Rent Received A/c Dr, Rent Received in Advance A/c Cr ₹20,000', 1], ['Rent of the year ₹1,00,000', 1], ['Liability in the balance sheet', 1]],
}));
const PG = [E1([['Closing Stock A/c', 68000]], [['Trading A/c', 68000]], 'Being closing stock brought into the Trading Account', '31 Mar 2028')];
QQ('s3_closing_stock_effect', short({
  t: 3, d: 2, c: 'understanding', marks: 3,
  stem: 'Pali Garments, an imagined firm, finds by physical count that its closing stock on 31 March 2028 is worth ₹68,000. Pass the entry to bring it into the books and state where it appears in the Trading Account and in the balance sheet.',
  model: `${journal(PG).md}\n\nIn the Trading Account the closing stock is shown on the **credit side**, since it reduces the cost of goods sold. In the balance sheet it appears as a **current asset**, and its balance of ${rs(68000)} is brought down on the next day.`,
  sol: 'Debit the asset, credit Trading, then say where each end of the entry appears.',
  scheme: [['Entry: Closing Stock A/c Dr and Trading A/c Cr for ₹68,000', 1], ['Credit side of the Trading Account', 1], ['Current asset in the balance sheet', 1]],
}));

// ================================================================ long answer, 5 marks
const KK = {
  date: '31 Mar 2028',
  tradingDr: [['Opening Stock A/c', 48000], ['Purchases A/c', 270000], ['Sales Return A/c', 9000], ['Wages A/c', 22000], ['Carriage Inwards A/c', 5000]],
  tradingCr: [['Sales A/c', 390000], ['Purchases Return A/c', 6000], ['Closing Stock A/c', 52000]],
  plDr: [['Rent A/c', 24000], ['Salaries A/c', 30000]],
  plCr: [['Commission Received A/c', 8000]],
  drawings: ['Drawings A/c', 15000],
};
const KKc = closingEntries(KK);
same(KKc.gp, 94000, 'Kuppam gross profit');
same(KKc.np, 48000, 'Kuppam net profit');
const KKj = journal(KKc.entries);
QQ('l5_closing_entries', long({
  t: 3, d: 4, c: 'application', marks: 5,
  stem: 'On 31 March 2028 the ledger of Kuppam Kitchenware, an imagined firm, shows: opening stock ₹48,000, purchases ₹2,70,000, purchases return ₹6,000, sales ₹3,90,000, sales return ₹9,000, wages ₹22,000, carriage inwards ₹5,000, rent ₹24,000, salaries ₹30,000, commission received ₹8,000 and drawings ₹15,000. Closing stock is valued at ₹52,000. Pass the closing journal entries (a) for the accounts that go to the Trading Account, including closing stock [2], (b) for the gross profit [1], (c) for the accounts that go to the Profit and Loss Account [1] and (d) for the net profit and the drawings [1].',
  model: `${KKj.md}\n\nGross profit = ${inr(448000)} − ${inr(354000)} = ${rs(KKc.gp)}; net profit = ${inr(94000)} + ${inr(8000)} − ${inr(54000)} = ${rs(KKc.np)}.`,
  sol: 'Debit-balance accounts are credited, credit-balance accounts are debited, then the profits move on.',
  scheme: [['Opening stock, purchases, sales return, wages and carriage inwards transferred to Trading A/c', 1], ['Sales, purchases return and closing stock brought to the credit of Trading A/c', 1], ['Gross profit ₹94,000 transferred to Profit and Loss A/c', 1], ['Rent and salaries debited and commission credited to Profit and Loss A/c', 1], ['Net profit ₹48,000 and drawings ₹15,000 transferred to Capital A/c', 1]],
}));
const AF = [
  E1([['Closing Stock A/c', 85000]], [['Trading A/c', 85000]], 'Being closing stock brought into the Trading Account', '31 Mar 2028'),
  E1([['Wages A/c', 6000]], [['Outstanding Wages A/c', 6000]], 'Being wages due but unpaid', '31 Mar 2028'),
  E1([['Prepaid Insurance A/c', 3000]], [['Insurance A/c', 3000]], 'Being insurance paid in advance', '31 Mar 2028'),
  E1([['Accrued Commission A/c', 4500]], [['Commission Received A/c', 4500]], 'Being commission earned but not received', '31 Mar 2028'),
  E1([['Depreciation A/c', 30000]], [['Plant A/c', 30000]], 'Being depreciation at 15 per cent on plant', '31 Mar 2028'),
];
same((200000 * 15) / 100, 30000, 'Ambur plant depreciation');
QQ('l5_adjusting', long({
  t: 3, d: 3, c: 'application', marks: 5,
  stem: 'At the year end, 31 March 2028, the books of Ambur Footwear, an imagined firm, require these adjustments: (i) closing stock ₹85,000; (ii) wages of ₹6,000 are due but unpaid; (iii) insurance of ₹3,000 has been paid for the next year; (iv) commission of ₹4,500 has been earned but not received; (v) depreciation at 15 per cent is to be charged on plant of ₹2,00,000. Pass the journal entries for the adjustments, with narrations.',
  model: `${journal(AF).md}\n\nOutstanding Wages is a liability; Prepaid Insurance and Accrued Commission are assets; the plant stands at ${rs(170000)} after depreciation of ${rs(30000)}.`,
  sol: 'One entry for each adjustment; the asset or liability account is named.',
  scheme: [['Closing stock: Closing Stock A/c Dr, Trading A/c Cr', 1], ['Wages due: Wages A/c Dr, Outstanding Wages A/c Cr', 1], ['Prepaid insurance entered correctly', 1], ['Accrued commission entered correctly', 1], ['Depreciation ₹30,000 charged to the plant', 1]],
}));
const LM = {
  date: '31 Mar 2028',
  tradingDr: [['Opening Stock A/c', 36000], ['Purchases A/c', 180000], ['Sales Return A/c', 6000], ['Carriage Inwards A/c', 3500], ['Wages A/c', 20000]],
  tradingCr: [['Sales A/c', 290000], ['Purchases Return A/c', 4000], ['Closing Stock A/c', 41000]],
  plDr: [['Salaries A/c', 28000], ['Rent A/c', 18000], ['Depreciation A/c', 6000]],
  plCr: [['Interest Received A/c', 5500]],
};
const LMc = closingEntries(LM);
same(LMc.gp, 89500, 'Lohardaga gross profit');
same(LMc.np, 43000, 'Lohardaga net profit');
const LML = postD(LMc.entries);
same(LML['Trading A/c'].balance, 0, 'Lohardaga Trading closes');
same(LML['Profit and Loss A/c'].balance, 0, 'Lohardaga P&L closes');
QQ('l5_tpl_ledgers', long({
  t: 3, d: 5, c: 'evaluation', marks: 5,
  stem: 'After the adjusting entries, the nominal accounts of Lohardaga Metals, an imagined firm, show on 31 March 2028: opening stock ₹36,000, purchases ₹1,80,000, purchases return ₹4,000, sales ₹2,90,000, sales return ₹6,000, carriage inwards ₹3,500, wages ₹20,000, salaries ₹28,000, rent ₹18,000, depreciation ₹6,000 and interest received ₹5,500. Closing stock is ₹41,000. Prepare the Trading Account and the Profit and Loss Account in ledger form after the closing entries, showing (a) the gross profit transferred [2], (b) the net profit transferred to Capital A/c [2] and (c) the check that both accounts close with no balance [1].',
  model: `**(a)**\n\n${postedOnly(LML['Trading A/c']).md}\n\nGross profit = ${inr(335000)} − ${inr(245500)} = ${rs(89500)}.\n\n**(b)**\n\n${postedOnly(LML['Profit and Loss A/c']).md}\n\nNet profit = ${inr(89500)} + ${inr(5500)} − ${inr(52000)} = ${rs(43000)}, transferred to the Capital A/c.\n\n**(c)** Each account has equal totals on its two sides after the transfers (${inr(LML['Trading A/c'].total)} and ${inr(LML['Profit and Loss A/c'].total)}), so neither has a balance to carry down.`,
  sol: 'Debit the expenses and cost items, credit the incomes, income of sales and stock; the gap is the profit.',
  scheme: [['Trading A/c debit side: opening stock, purchases, sales return, carriage and wages', 1], ['Trading A/c credit side and gross profit ₹89,500', 1], ['Profit and Loss A/c: expenses debited and gross profit and interest credited', 1], ['Net profit ₹43,000 transferred to Capital A/c', 1], ['Equal totals and no balance in both accounts', 1]],
}));
void check; void mdTable; void acct;
