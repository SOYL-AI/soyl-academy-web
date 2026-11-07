// Objective items for ch09: multiple choice, assertion-reason, true-false, fill-blank, match, ordering.
// Every firm and person is imagined; every derived amount is computed and asserted. Every item is topic t01.
import { mcq, ar, tf, fb, match, ord } from '../../cbse-11-accountancy-ch01/src/lib.mjs';
import { same, inr, rs, pctOf, commissionOn, debtsCalc } from './figures.mjs';
import { QQ } from './qq.mjs';

// ================================================================ multiple choice
QQ('m_why_adj', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Ishaan Traders, an imagined firm, closes its books on 31 March each year and records some expenses only when paid. Adjustments are made before its final accounts are prepared mainly because',
  opts: ['the accounts must show the income and expenses that belong to the year, whether or not cash has moved', 'the trial balance never agrees without them', 'the tax authorities require every account to be adjusted', 'cash received and paid must be recorded in the cash book'],
  sol: 'The matching concept and the accrual basis require each year to carry its own income and its own expenses. A trial balance can agree and still leave out outstanding or prepaid items, tax rules do not decide the need for adjustments, and recording cash in the cash book is done during the year, not at its end.',
}));
QQ('m_accrual', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Under the accrual basis of accounting, Sapna Stationers, an imagined shop, records rent for March 2026 in the year ended 31 March 2026 even though the landlord is paid only in April 2026, because',
  opts: ['an expense belongs to the period in which it is incurred, not the period in which it is paid', 'a payment made in April can never belong to the year ended in March', 'rent is a capital expenditure of the year', 'the landlord asks that the amount be recorded early'],
  sol: 'On the accrual basis an expense is recognised when it is incurred, so the rent for March belongs to the year ended in March. Cash paid later does not change the period of the expense, rent is a revenue item, and the landlord has no say in how the tenant keeps its books.',
}));
QQ('m_stock_chk', mcq({
  t: 1, d: 2, c: 'application',
  stem: `Kabir Hardware, an imagined shop, gives closing stock of ${rs(46000)} as an item outside its trial balance for the year ended 31 March 2026. In the final accounts the closing stock is shown`,
  opts: ['on the credit side of the Trading Account and as a current asset in the Balance Sheet', 'only on the credit side of the Trading Account', 'only as a current asset in the Balance Sheet', 'on the debit side of the Trading Account and as a current liability'],
  sol: 'A closing stock given outside the trial balance has not yet been entered in any account, so it is credited in the Trading Account and also shown as an asset still owned. Showing it in one place only would leave either the gross profit or the Balance Sheet wrong, and it is never a debit item or a liability.',
}));
QQ('m_stock_inside', mcq({
  t: 1, d: 3, c: 'application',
  stem: `The trial balance of Divya Dairy, an imagined firm, drawn up after the Trading Account was prepared, shows closing stock ${rs(38000)} on the debit side and gross profit ${rs(120000)} on the credit side. Closing stock is shown`,
  opts: ['only as a current asset in the Balance Sheet', 'on the credit side of the Trading Account and in the Balance Sheet', 'on the debit side of the Profit and Loss Account', 'as a deduction from purchases in the Trading Account'],
  sol: 'When closing stock already stands in the trial balance, the Trading Account has been completed and the stock has been recorded, so only the Balance Sheet is left to show it. Crediting it again would count it twice, and it is not an expense of the Profit and Loss Account.',
}));
QQ('m_out_exp', mcq({
  t: 1, d: 2, c: 'application',
  stem: `Tara Printers, an imagined press, paid wages of ${rs(54000)} during the year ended 31 March 2026, and wages of ${rs(5000)} for March 2026 were still unpaid on that date. The amount of wages debited to the Trading Account and the treatment of the ${rs(5000)} are`,
  opts: [`${rs(54000 + 5000)}; the ${rs(5000)} is shown as a current liability`, `${rs(54000 - 5000)}; the ${rs(5000)} is shown as a current asset`, `${rs(54000)}; the ${rs(5000)} is ignored until it is paid`, `${rs(54000 + 5000)}; the ${rs(5000)} is shown as a current asset`],
  sol: `An outstanding expense is added to the amount paid, so the year bears ${inr(54000 + 5000)} of wages, and the unpaid part is a liability to the workers. Deducting it, ignoring it or calling it an asset all mismatch the cost with the year or hide an amount the firm owes.`,
}));
QQ('m_prepaid', mcq({
  t: 1, d: 2, c: 'application',
  stem: `Umesh Optics, an imagined shop, paid an insurance premium of ${rs(18000)} on 1 January 2026 for one year. In the accounts for the year ended 31 March 2026 the amount for the period after 31 March 2026 is`,
  opts: ['deducted from insurance in the Profit and Loss Account and shown as a current asset', 'added to insurance in the Profit and Loss Account and shown as a current liability', 'charged in full to the Profit and Loss Account', 'shown as a fixed asset because insurance lasts a year'],
  sol: 'Nine of the twelve months fall after 31 March, so that part is a prepaid expense: it is taken out of the year\'s charge and carried forward as a current asset. Charging it in full or adding it ignores the matching of cost with period, and a prepayment is current, not fixed.',
}));
QQ('m_accrued', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Vandana Estates, an imagined firm, earned commission of ${rs(6000)} for March 2026 which it received only in April 2026. At 31 March 2026 this amount is`,
  opts: ['accrued income, added to commission received and shown as a current asset', 'income received in advance, shown as a current liability', 'deducted from commission received in the Profit and Loss Account', 'ignored, because it was not received in cash during the year'],
  sol: 'Income earned but not yet received belongs to the year in which it was earned, so it is added to the income and the amount due is a current asset. A liability and a deduction describe income received in advance, and ignoring the amount would understate the year\'s profit.',
}));
QQ('m_advance', mcq({
  t: 1, d: 2, c: 'application',
  stem: `Yogesh Rentals, an imagined firm, has rent received of ${rs(30000)} in its trial balance, of which ${rs(4000)} is for April 2026. The treatment of the ${rs(4000)} in the final accounts of the year ended 31 March 2026 is`,
  opts: ['deducted from rent received and shown as a current liability', 'added to rent received and shown as a current asset', 'left in rent received because the cash has been received', 'shown as drawings of the proprietor'],
  sol: 'Rent for April belongs to the next year, so it is taken out of this year\'s income and shown as a liability, because the firm owes the tenant the use of the premises. Adding it or leaving it in would overstate the income, and it has nothing to do with drawings.',
}));
QQ('m_dep_effect', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Zoya Weavers, an imagined firm, charges depreciation on its looms at the end of the year. The two effects of this adjustment are',
  opts: ['a debit in the Profit and Loss Account and a deduction from the loom in the Balance Sheet', 'a credit in the Profit and Loss Account and an addition to the loom in the Balance Sheet', 'a debit in the Trading Account and a current liability', 'a debit in the Profit and Loss Account and a current liability'],
  sol: 'Depreciation is a loss of value that is an expense of the year, so it is debited to the Profit and Loss Account, and the asset is shown at its reduced value. It is neither an income nor an amount owed to anyone, so a credit, an addition or a liability does not describe it.',
}));
QQ('m_bd_further', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Aman Agencies, an imagined firm, has debtors of ${rs(90000)} in its trial balance and finds that a debtor owing ${rs(6000)} is insolvent and the whole amount cannot be recovered. In the Balance Sheet the debtors, before any provision, are shown at`,
  opts: [rs(90000 - 6000), rs(90000 + 6000), rs(90000), rs(6000)],
  sol: `A further bad debt is written off, so it reduces the debtors, giving ${inr(90000 - 6000)}, and it is charged to the Profit and Loss Account. Showing ${inr(90000)} ignores the loss, ${inr(90000 + 6000)} adds the bad debt, and ${inr(6000)} is only the amount written off.`,
}));
QQ('m_prov_base', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Bhavik Bearings, an imagined firm, has debtors of ${rs(100000)}, further bad debts of ${rs(4000)} and wants a provision for doubtful debts at 5 per cent of its debtors. The provision is calculated on`,
  opts: [rs(100000 - 4000), rs(100000), rs(100000 + 4000), rs(4000)],
  sol: `Debts already written off cannot be doubtful again, so the provision is worked out on the debtors left after the further bad debts, which is ${inr(100000 - 4000)}. Using ${inr(100000)} includes a debt that has gone, and the other figures are not the balance of good debtors.`,
}));
QQ('m_pdd_charge', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'Charu Chemicals, an imagined firm, has bad debts in its trial balance, further bad debts, an old provision for doubtful debts and a new provision. The amount charged to the Profit and Loss Account for these items is',
  opts: ['bad debts + further bad debts + new provision − old provision', 'bad debts + further bad debts + old provision − new provision', 'bad debts + new provision + old provision', 'further bad debts + new provision − bad debts'],
  sol: 'The year bears every bad debt written off and the provision it now needs, but the old provision was created by earlier charges and already stands as a credit, so it is set against the new one. Adding the old provision or leaving out a bad debt gives the wrong charge.',
}));
QQ('m_disc_base', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Dev Distributors, an imagined firm, has debtors of ${rs(80000)} after writing off further bad debts, a provision for doubtful debts of ${rs(4000)}, and wants a provision for discount on debtors at 2 per cent. The provision for discount is`,
  opts: [rs(pctOf(80000 - 4000, 2)), rs(pctOf(80000, 2)), rs(pctOf(4000, 2)), rs(pctOf(80000 + 4000, 2))],
  sol: `Discount will be allowed only on the debtors who are expected to pay, so it is worked out on the debtors after the provision for doubtful debts, which is ${inr(80000 - 4000)}. Using ${inr(80000)} applies discount to doubtful debts, and the other bases are not the balance of good debtors.`,
}));
QQ('m_intcap', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Esha Enterprises, an imagined sole proprietorship, allows interest on the capital of its proprietor. Its two effects are',
  opts: ['a debit in the Profit and Loss Account and an addition to capital in the Balance Sheet', 'a credit in the Profit and Loss Account and a deduction from capital', 'a debit in the Trading Account and a current liability', 'a debit in the Profit and Loss Account and a current liability'],
  sol: 'Interest on capital is treated as an expense of the business and as a gain of the proprietor, so the Profit and Loss Account is debited and the capital grows. It is not a credit item, nor a liability to an outsider.',
}));
QQ('m_intdraw', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Falguni Fabrics, an imagined firm, charges interest on the drawings of its proprietor. In the final accounts this interest is',
  opts: ['credited to the Profit and Loss Account and deducted from capital in the Balance Sheet', 'debited to the Profit and Loss Account and added to capital', 'credited to the Trading Account and added to drawings', 'debited to the Profit and Loss Account and deducted from capital'],
  sol: 'Interest on drawings is a gain for the business and a further charge on the proprietor, so it is an income in the Profit and Loss Account and it reduces capital. A debit would treat it as an expense, and it is not part of the Trading Account.',
}));
QQ('m_mgr_after', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Girish Glass, an imagined firm, pays its manager a commission of 10 per cent of net profit after charging the commission. The net profit before charging it is ${rs(66000)}. The commission is`,
  opts: [rs(commissionOn(66000, 10, 'after')), rs(commissionOn(66000, 10, 'before')), rs(66000 - commissionOn(66000, 10, 'after')), rs(66000 + commissionOn(66000, 10, 'after'))],
  sol: `When the commission is a percentage of the profit left after charging it, it is 10 over 110 of the profit before commission, which is ${inr(commissionOn(66000, 10, 'after'))}. ${inr(commissionOn(66000, 10, 'before'))} is the commission on the profit before charging it, and the other figures are the profit after commission or a sum with no meaning.`,
}));
QQ('m_mgr_bs', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'At 31 March 2026 the manager of Hari Hardware, an imagined shop, has not yet been paid the commission for the year. In the Balance Sheet the commission due is shown as',
  opts: ['a current liability', 'a current asset', 'a deduction from capital', 'a fixed asset'],
  sol: 'The commission has been earned by the manager and is payable within a year, so it is an amount the firm owes. It cannot be an asset, and it is an expense of the Profit and Loss Account rather than a deduction from capital.',
}));
QQ('m_goods', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Indu Imports, an imagined firm, shows purchases of ${rs(300000)} in its trial balance. The proprietor took goods costing ${rs(8000)} for personal use during the year without any entry. In the final accounts`,
  opts: [`purchases in the Trading Account are shown at ${rs(300000 - 8000)} and the ${rs(8000)} is added to drawings`, `purchases are shown at ${rs(300000 + 8000)} and the ${rs(8000)} is added to drawings`, `purchases are shown at ${rs(300000 - 8000)} and the ${rs(8000)} is added to capital`, `purchases stay at ${rs(300000)} and the ${rs(8000)} is a Profit and Loss expense`],
  sol: `Goods taken by the proprietor are not goods bought for sale, so they come off purchases, giving ${inr(300000 - 8000)}, and they are drawings that reduce capital. Adding them to purchases or capital moves the entry the wrong way, and goods taken by the proprietor are not an expense of the business.`,
}));
QQ('m_loss', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Jaya Jewellers, an imagined firm, lost goods costing ${rs(20000)} in a fire; the insurance company admitted a claim of ${rs(15000)}. In the final accounts the loss is`,
  opts: [`credited to the Trading Account at ${rs(20000)}, with ${rs(20000 - 15000)} debited to the Profit and Loss Account and ${rs(15000)} shown as a current asset`, `debited to the Trading Account at ${rs(20000)} and ${rs(15000)} shown as a current liability`, `debited to the Profit and Loss Account at ${rs(20000)} with no entry in the Trading Account`, `credited to the Trading Account at ${rs(15000)} with ${rs(20000)} shown as an asset`],
  sol: `The goods that were lost are taken out of the cost of the goods sold by a credit in the Trading Account at their full cost. The claim the insurer will pay is an amount receivable, and only the uninsured ${inr(20000 - 15000)} is a loss of the year. The other treatments either leave the Trading Account overstated in cost or call the claim a liability.`,
}));
QQ('m_omit_out', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'The accountant of Kamini Kitchens, an imagined firm, forgot to record outstanding rent at the end of the year. As a result, for that year,',
  opts: ['net profit is overstated and current liabilities are understated', 'net profit is understated and current liabilities are overstated', 'net profit is overstated and current assets are understated', 'net profit is understated and current assets are overstated'],
  sol: 'Leaving out an outstanding expense makes the expenses too low, so profit is too high, and the amount the firm owes is missing from the liabilities. The other options reverse the effect on profit or attach it to assets, which this adjustment does not touch.',
}));
QQ('m_omit_pre', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'Lalit Laboratories, an imagined firm, charged the whole premium paid on a policy to insurance and did not record the prepaid part. For that year,',
  opts: ['net profit is understated and current assets are understated', 'net profit is overstated and current assets are overstated', 'net profit is understated and current liabilities are overstated', 'net profit is overstated and current assets are understated'],
  sol: 'Charging the prepaid part to the year makes the expense too high, so profit is too low, and the asset that the prepayment represents is missing from the Balance Sheet. A liability is not involved, and profit cannot be overstated by an extra charge.',
}));
QQ('m_omit_dep', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'Manish Motors, an imagined firm, did not charge depreciation on its delivery van for the year. The Balance Sheet then shows',
  opts: ['net profit overstated and the van overstated', 'net profit understated and the van overstated', 'net profit overstated and the van understated', 'net profit understated and the van understated'],
  sol: 'Without the charge the expenses are too low, so profit is too high, and the van is still shown at its old value, which is too high. An understated profit or an understated van would need an extra charge, not a missing one.',
}));
QQ('m_where_out', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Neha Nurseries, an imagined firm, has outstanding rent of ' + rs(3000) + ' at the end of the year. Where does the outstanding rent appear in the final accounts?',
  opts: ['in the Profit and Loss Account, added to rent, and as a current liability in the Balance Sheet', 'in the Trading Account, as a credit, and as a current asset', 'only in the Balance Sheet, as a current asset', 'only in the Profit and Loss Account, as an income'],
  sol: 'An adjustment is shown in two places: the expense is increased in the Profit and Loss Account and the unpaid amount is a liability in the Balance Sheet. Rent is not a trading item, and an amount owed is never an asset or an income.',
}));
QQ('m_two_chk', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'Omkar Organics, an imagined firm, makes several adjustments at the end of the year. Which one of them changes the gross profit and not only the net profit?',
  opts: ['goods withdrawn by the proprietor for personal use', 'depreciation on machinery', 'interest on capital', 'a provision for doubtful debts'],
  sol: 'Goods withdrawn are deducted from purchases in the Trading Account, so they raise the gross profit. Depreciation, interest on capital and a provision for doubtful debts all go to the Profit and Loss Account and change the net profit only.',
}));
QQ('m_dep_bs', mcq({
  t: 1, d: 2, c: 'application',
  stem: `Pooja Plastics, an imagined firm, has furniture of ${rs(60000)} in its trial balance and charges depreciation at 10 per cent for the year. In the Balance Sheet the furniture is shown at`,
  opts: [rs(60000 - pctOf(60000, 10)), rs(60000), rs(60000 + pctOf(60000, 10)), rs(pctOf(60000, 10))],
  sol: `Depreciation of ${inr(pctOf(60000, 10))} is deducted from the furniture, so it is shown at ${inr(60000 - pctOf(60000, 10))}. Showing ${inr(60000)} ignores the charge, ${inr(60000 + pctOf(60000, 10))} adds it, and ${inr(pctOf(60000, 10))} is the charge itself, not the value of the furniture.`,
}));
QQ('m_acc_inc_pl', mcq({
  t: 1, d: 2, c: 'application',
  stem: `Qamar Quilts, an imagined firm, has interest received of ${rs(8000)} in its trial balance and interest accrued but not received of ${rs(1500)}. The interest credited to the Profit and Loss Account is`,
  opts: [rs(8000 + 1500), rs(8000 - 1500), rs(8000), rs(1500)],
  sol: `Accrued income is added to the income received, so the year is credited with ${inr(8000 + 1500)}. Subtracting it treats it as income in advance, ${inr(8000)} leaves it out, and ${inr(1500)} is only the accrued part.`,
}));

// ================================================================ assertion-reason
QQ('ar_closing', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'both-true-explains',
  a: 'Closing stock given outside the trial balance of Rekha Retail, an imagined firm, appears on the credit side of the Trading Account and in the Balance Sheet.',
  r: 'The goods in stock at the end of the year are not part of the cost of the goods sold, and the firm still owns them.',
  sol: 'Both statements are true and the reason explains the assertion: the credit in the Trading Account removes the unsold goods from the cost of sales, and the goods are an asset owned on the closing date.',
}));
QQ('ar_wages', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'both-true-not-explains',
  a: 'Outstanding wages of Sudhir Spinners, an imagined firm, are added to wages in the Trading Account.',
  r: 'Wages are a direct expense of the goods produced.',
  sol: 'Both statements are true, but the reason does not explain the assertion: wages are shown in the Trading Account because they are direct, whereas outstanding wages are added because the wages of the year, paid or not, belong to the year.',
}));
QQ('ar_dep', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'A-true-R-false',
  a: 'Depreciation on the machinery of Tejas Tools, an imagined firm, is debited to the Profit and Loss Account.',
  r: 'Depreciation is a payment of cash made to the supplier of the machinery at the end of each year.',
  sol: 'The assertion is true, but the reason is false: depreciation is the spreading of the cost of the machinery over its life and involves no payment at the year end, which is why it is an expense without a cash outflow.',
}));
QQ('ar_intdraw', ar({
  t: 1, d: 4, c: 'analysis', verdict: 'A-false-R-true',
  a: 'Interest on drawings charged to the proprietor of Usha Utensils, an imagined firm, is debited to the Profit and Loss Account.',
  r: 'Interest on drawings is a gain for the firm that is charged to the proprietor.',
  sol: 'The assertion is false because the interest is credited to the Profit and Loss Account, not debited. The reason is true: it is an income of the firm and a deduction from the proprietor\'s capital.',
}));
QQ('ar_prov', ar({
  t: 1, d: 4, c: 'understanding', verdict: 'both-true-explains',
  a: 'The provision for doubtful debts of Vikram Valves, an imagined firm, is calculated on the debtors left after deducting further bad debts.',
  r: 'A debt that has already been written off as bad cannot be expected to become doubtful again.',
  sol: 'Both statements are true and the reason explains the assertion: debtors written off are no longer debtors, so the provision is worked out only on those who remain.',
}));
QQ('ar_mgr', ar({
  t: 1, d: 4, c: 'understanding', verdict: 'both-true-explains',
  a: 'A manager of Waman Wires, an imagined firm, gets a commission of 10 per cent on net profit after charging the commission, and it is worked out as 10 over 110 of the profit before charging it.',
  r: 'The commission is itself an expense that is deducted before the profit on which it is calculated is arrived at.',
  sol: 'Both statements are true and the reason explains the assertion: because the commission forms part of the profit it is based on, the profit before commission is 110 parts to the manager\'s 10.',
}));

// ================================================================ true-false, fill-blank, match, ordering
QQ('tf_prepaid_liab', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'A prepaid expense of Xavier Xerox, an imagined firm, such as insurance paid for the next year, is shown as a current liability in the Balance Sheet.',
  sol: 'A prepaid expense is a benefit the firm has paid for and not yet used, so it is a current asset, and the expense of the year is reduced by it.',
}));
QQ('tf_goods', tf({
  t: 1, d: 3, c: 'understanding', ans: true,
  stem: 'When the proprietor of Yamini Yarns, an imagined firm, takes goods for personal use, the goods are deducted from purchases in the Trading Account and added to drawings.',
  sol: 'The two effects are a lower purchase figure, which raises the gross profit, and a higher drawings figure, which reduces the capital.',
}));
QQ('fb_bs_chk', fb({
  t: 1, d: 2, c: 'understanding',
  stem: 'In the Balance Sheet of Zubin Zip Works, an imagined firm, outstanding expenses are shown as a current ______ and prepaid expenses as a current ______.',
  acc: [['liability', 'liabilities'], ['asset', 'assets']],
  sol: 'Outstanding expenses are owed, so they are a liability, and prepaid expenses are a benefit the firm holds, so they are an asset.',
}));
QQ('fb_prov', fb({
  t: 1, d: 3, c: 'understanding',
  stem: 'The Profit and Loss charge of Anita Auto Parts, an imagined firm, for bad debts is bad debts plus ______ bad debts plus new provision minus ______ provision.',
  acc: [['further'], ['old']],
  sol: 'The blanks are further and old. Bad debts written off during the year and further bad debts found later are both charged, and the old provision that was already carried is set against the new provision.',
}));
QQ('mt_two', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each year-end adjustment of Nandini Lamps, an imagined firm, in Column A with its treatment in Column B.',
  pairs: [['Outstanding expense', 'Added to the expense; shown as a current liability'], ['Prepaid expense', 'Deducted from the expense; shown as a current asset'], ['Accrued income', 'Added to the income; shown as a current asset'], ['Income received in advance', 'Deducted from the income; shown as a current liability']],
  sol: 'Expenses and incomes are adjusted to the amounts that belong to the year, and the balance of each adjustment goes to the Balance Sheet.',
}));
QQ('mt_owner', match({
  t: 1, d: 3, c: 'understanding', marks: 2,
  stem: 'Match each adjustment in the books of Kiran Kirana, an imagined general store, in Column A with its effect in Column B.',
  pairs: [['Depreciation', 'Debit to the Profit and Loss Account; deducted from the asset'], ['Interest on capital', 'Debit to the Profit and Loss Account; added to capital'], ['Interest on drawings', 'Credit to the Profit and Loss Account; deducted from capital'], ['Goods withdrawn', 'Deducted from purchases; added to drawings']],
  sol: 'Each of these adjustments has one effect on the final accounts and one on the asset or on capital.',
}));
QQ('ord_prov_chk', ord({
  t: 1, d: 3, c: 'application', marks: 2,
  stem: 'Arrange in order the steps by which Brinda Bakers, an imagined firm, works out the Profit and Loss charge for bad debts and the provision for doubtful debts.',
  items: ['Deduct the further bad debts from the debtors', 'Calculate the new provision on the debtors that remain', 'Add bad debts, further bad debts and the new provision', 'Deduct the old provision to find the charge to the Profit and Loss Account'],
  sol: 'The base of the provision must be found first, then the provision, then the total and last the set-off of the old provision.',
}));
void same; void inr; void debtsCalc;
