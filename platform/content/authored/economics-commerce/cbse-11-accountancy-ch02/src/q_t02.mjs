// t02: bases of accounting, accounting standards, GST. Imagined firms only. GST is described as of 2024, at imagined
// rates stated in each problem; no real rate is stated. Every derived amount is computed.
import { mcq, ar, tf, fb, match, ord, short, long } from '../../cbse-11-accountancy-ch01/src/lib.mjs';
import { same, sum, inr, rs, mdTable, gst } from './figures.mjs';
import { QQ, numQ, S2, S3, L5 } from './qq.mjs';

// ================================================================ multiple choice
QQ('m_cash_basis', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Under the cash basis of accounting, rent of ₹10,000 for March 2027 that an imagined firm pays on 5 April 2027 is recorded as an expense of',
  opts: ['April 2027, the month in which cash is paid', 'March 2027, the month to which the rent relates', 'March and April equally', 'neither month, since no benefit arises'],
  sol: 'On the cash basis an item is recorded when cash moves. Relating it to March is the accrual basis; splitting it has no basis in either method, and rent plainly gives a benefit.',
}));
QQ('m_accrual', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Which statement describes the accrual basis of accounting?',
  opts: ['Revenue is recorded when it is earned and expenses when they are incurred, whether or not cash moves', 'Revenue and expenses are recorded only when cash is received or paid', 'Revenue is recorded when earned, but expenses only when paid', 'Expenses are recorded when incurred, but revenue only when cash is received'],
  sol: 'Accrual accounting follows the earning of revenue and the incurring of expenses. The second option describes the cash basis and the last two mix the bases.',
}));
QQ('m_as_need', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Ravi Foods and Sneha Foods, two imagined companies, value their stock by different methods without saying so, and their profits cannot be compared. Which purpose of accounting standards would remove this difficulty?',
  opts: ['Reducing alternative treatments, so that accounts are comparable', 'Guaranteeing a profit to every company', 'Replacing the need for an audit', 'Fixing the selling price of goods'],
  sol: 'Standards narrow the choice of methods and ask for disclosure of the method used, so statements become comparable. They cannot guarantee profit, replace an audit, or fix prices.',
}));
QQ('m_icai', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'In India, accounting standards are issued by the',
  opts: ['Institute of Chartered Accountants of India, through its Accounting Standards Board', 'Reserve Bank of India, through its monetary policy committee', 'Goods and Services Tax Council, through its tax boards', 'Central Board of Direct Taxes, through its audit wing'],
  sol: 'The Institute of Chartered Accountants of India (ICAI) issues accounting standards through its Accounting Standards Board. The other bodies deal with money and credit, indirect tax rates and income tax.',
}));
QQ('m_indas', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Indian Accounting Standards (Ind AS) are described as being converged with',
  opts: ['International Financial Reporting Standards', 'the accounting rules of one single foreign country', 'the rules of the Income Tax Act', 'the cost accounting records of each firm'],
  sol: 'Ind AS are Indian standards brought into line with International Financial Reporting Standards. They are not copied from one country, nor are they tax rules or cost records.',
}));
QQ('m_gst_dest', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Goods and services tax is called a destination-based tax. This means that the tax',
  opts: ['accrues to the state where the goods or services are finally consumed', 'is collected only at the place where the goods are manufactured', 'is paid only by importers at the port of entry', 'is charged only on goods sent out of the country'],
  sol: 'In a destination-based tax the revenue goes to the place of consumption. The other options describe origin-based collection, import duty and export, none of which is the meaning.',
}));
QQ('m_igst', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Dev Hardware, an imagined firm in Jaipur (Rajasthan), sells goods to a trader in Surat (Gujarat). The goods and services tax charged on this supply is',
  opts: ['integrated goods and services tax (IGST)', 'central and state goods and services tax (CGST and SGST), half each', 'state goods and services tax (SGST) only', 'central goods and services tax (CGST) only'],
  sol: 'A supply from one state to another is an inter-state supply and attracts IGST. CGST and SGST together apply to supplies within one state, and neither alone is charged on an inter-state supply.',
}));
const ITC = { paid: 9000, collected: 14000 };
ITC.pay = same(ITC.collected - ITC.paid, 5000, 'm_itc payable');
QQ('m_itc', mcq({
  t: 2, d: 2, c: 'application',
  stem: `In a month, an imagined trader paid ${rs(ITC.paid)} as goods and services tax on purchases and collected ${rs(ITC.collected)} on sales. Using input tax credit, the tax payable to the government is`,
  opts: [rs(ITC.pay), rs(ITC.collected), rs(ITC.paid), rs(ITC.paid + ITC.collected)],
  sol: `Input tax credit sets the tax paid on purchases against the tax collected on sales: ${inr(ITC.collected)} − ${inr(ITC.paid)} = ${rs(ITC.pay)}. ${rs(ITC.collected)} ignores the credit, ${rs(ITC.paid)} is the credit itself, and ${rs(ITC.paid + ITC.collected)} adds the two.`,
}));
QQ('m_gstin', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'The goods and services tax identification number (GSTIN) of a registered taxpayer has',
  opts: ['15 characters, including the state code and the PAN of the taxpayer', '10 digits, being the mobile number of the owner', 'the same number for every taxpayer in a state', '5 characters chosen freely by the taxpayer'],
  sol: 'As of 2024 a GSTIN has 15 characters, beginning with a two-digit state code followed by the taxpayer\'s PAN. It is unique to the registration, not a mobile number, not shared, and not self-chosen.',
}));
QQ('m_gst_date', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Goods and services tax was introduced in India with effect from',
  opts: ['1 July 2017', '1 April 2010', '1 January 2020', '26 January 1950'],
  sol: 'GST came into force on 1 July 2017, replacing many earlier indirect taxes. The other dates do not mark its introduction.',
}));

// ================================================================ assertion-reason, true-false, fill, match, order
QQ('ar_itc', ar({
  t: 2, d: 2, c: 'understanding', verdict: 'both-true-explains',
  a: 'Input tax credit lowers the tax that a trader pays to the government.',
  r: 'Tax paid on purchases can be set off against the tax collected on sales.',
  sol: 'Both are true. Because the tax paid on inputs is deducted from the tax on outputs, the amount payable falls, so R explains A.',
}));
QQ('tf_indas', tf({
  t: 2, d: 1, c: 'recall', ans: true,
  stem: 'Indian Accounting Standards (Ind AS) are converged with International Financial Reporting Standards.',
  sol: 'Ind AS were framed by bringing Indian standards in line with the international ones.',
}));
QQ('tf_igst', tf({
  t: 2, d: 2, c: 'application', ans: false,
  stem: 'A sale of goods by an imagined firm in Jaipur to a customer in the same city attracts IGST.',
  sol: 'A sale within one state is an intra-state supply and attracts CGST and SGST. IGST applies to inter-state supplies.',
}));
QQ('fb_gst', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'On an intra-state supply, goods and services tax is split into ___ and ___, while an inter-state supply attracts ___.',
  acc: [['CGST', 'central goods and services tax'], ['SGST', 'state goods and services tax'], ['IGST', 'integrated goods and services tax']],
  sol: 'An intra-state supply carries CGST (to the Centre) and SGST (to the state); an inter-state supply carries IGST.',
}));
QQ('mt_gst', match({
  t: 2, d: 1, c: 'recall',
  stem: 'Match each goods and services tax term in column A with its description in column B.',
  pairs: [
    ['CGST', 'Charged by the Centre on an intra-state supply'],
    ['SGST', 'Charged by the state on an intra-state supply'],
    ['IGST', 'Charged on an inter-state supply'],
    ['GSTIN', 'Identification number of a registered taxpayer'],
  ],
  sol: 'Each term is matched with its description.',
}));
QQ('ord_itc', ord({
  t: 2, d: 2, c: 'application',
  stem: 'Arrange in the correct order the steps through which an imagined trader uses input tax credit.',
  items: ['Buy goods and pay the tax charged by the supplier (input tax)', 'Sell the goods and collect tax from the customer (output tax)', 'Deduct the input tax from the output tax', 'Deposit the balance with the government'],
  sol: 'Input tax is paid first, output tax is collected on the sale, the credit is set off, and the difference is paid.',
}));

// ================================================================ numericals
const RP = { recd: 62000, paid: 41000 };
RP.profit = same(RP.recd - RP.paid, 21000, 'n_cash_profit');
QQ('n_cash_profit', numQ({
  t: 2, d: 1, c: 'application', value: RP.profit, unit: '₹',
  stem: `During April 2027, Rishi Photo Studio, an imagined firm, received ${rs(RP.recd)} from customers and paid ${rs(RP.paid)} for its expenses. Keeping its accounts on the cash basis, find the profit for April 2027 (in ₹).`,
  sol: `On the cash basis, profit = receipts − payments = ${inr(RP.recd)} − ${inr(RP.paid)} = ${rs(RP.profit)}.`,
}));
const NT = { recd: 54000, adv: 6000, due: 9000, paid: 39000, prepaid: 4000, outst: 3000 };
NT.rev = same(NT.recd - NT.adv + NT.due, 57000, 'Nilam revenue');
NT.exp = same(NT.paid - NT.prepaid + NT.outst, 38000, 'Nilam expenses');
NT.profit = same(NT.rev - NT.exp, 19000, 'n_accrual_profit');
QQ('n_accrual_profit', numQ({
  t: 2, d: 3, c: 'application', value: NT.profit, unit: '₹',
  stem: `Nilam Tutorials, an imagined centre, received ${rs(NT.recd)} in fees in May 2027, of which ${rs(NT.adv)} is an advance for June. Fees of ${rs(NT.due)} earned in May are still to be received. Expenses paid in May were ${rs(NT.paid)}, which include ${rs(NT.prepaid)} for June, and a further ${rs(NT.outst)} of May expenses is outstanding. On the accrual basis, find the profit for May 2027 (in ₹).`,
  sol: `Revenue = ${inr(NT.recd)} − ${inr(NT.adv)} + ${inr(NT.due)} = ${rs(NT.rev)}. Expenses = ${inr(NT.paid)} − ${inr(NT.prepaid)} + ${inr(NT.outst)} = ${rs(NT.exp)}. Profit = ${inr(NT.rev)} − ${inr(NT.exp)} = ${rs(NT.profit)}.`,
}));
const AG = gst(50000, 18);
same(AG.cgst, 4500, 'n_cgst');
QQ('n_cgst', numQ({
  t: 2, d: 2, c: 'application', value: AG.cgst, unit: '₹',
  stem: 'Anmol Garments, an imagined firm in Indore (Madhya Pradesh), sells shirts worth ₹50,000 to a shop in Bhopal (Madhya Pradesh). Goods and services tax is charged at an imagined rate of 18%. Find the central goods and services tax (CGST) on this sale (in ₹).',
  sol: `Total tax = ${inr(50000)} × 18/100 = ${rs(AG.tax)}. The supply is within one state, so the tax is split equally: CGST = ${inr(AG.tax)} ÷ 2 = ${rs(AG.cgst)} and SGST = ${rs(AG.sgst)}.`,
}));
const VS = gst(360000, 5, { interState: true });
same(VS.igst, 18000, 'n_igst');
QQ('n_igst', numQ({
  t: 2, d: 2, c: 'application', value: VS.igst, unit: '₹',
  stem: 'Veena Spices, an imagined firm in Kochi (Kerala), sells goods worth ₹3,60,000 to a dealer in Chennai (Tamil Nadu). Goods and services tax is charged at an imagined rate of 5%. Find the IGST on this sale (in ₹).',
  sol: `The supply is inter-state, so the whole tax is IGST: ${inr(360000)} × 5/100 = ${rs(VS.igst)}.`,
}));
const NI = { sales: 250000, purch: 175000, rate: 12 };
NI.out = gst(NI.sales, NI.rate);
NI.in = gst(NI.purch, NI.rate);
NI.net = same(NI.out.tax - NI.in.tax, 9000, 'n_itc_net');
QQ('n_itc_net', numQ({
  t: 2, d: 3, c: 'application', value: NI.net, unit: '₹',
  stem: `Zoya Stores, an imagined firm, made intra-state sales of ${rs(NI.sales)} in a month and bought goods worth ${rs(NI.purch)} from suppliers in its own state. Goods and services tax is charged at an imagined rate of ${NI.rate}% on both. Using input tax credit, find the total tax payable to the government for the month (in ₹).`,
  sol: `Output tax = ${inr(NI.sales)} × ${NI.rate}/100 = ${rs(NI.out.tax)}. Input tax credit = ${inr(NI.purch)} × ${NI.rate}/100 = ${rs(NI.in.tax)}. Payable = ${inr(NI.out.tax)} − ${inr(NI.in.tax)} = ${rs(NI.net)}.`,
}));

// ================================================================ short answer, 2 marks
QQ('s2_cash_accr', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between the cash basis and the accrual basis of accounting on any two points.',
  model: '1. **Revenue:** on the cash basis it is recorded when cash is received; on the accrual basis when it is earned.\n2. **Expenses:** on the cash basis they are recorded when paid; on the accrual basis when incurred, so outstanding and prepaid items are adjusted.',
  sol: 'Any two points of difference.',
  scheme: [['First point with both bases', 1], ['Second point with both bases', 1]],
}));
QQ('s2_standards_two', short({
  t: 2, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State any two reasons why accounting standards are needed.',
  model: '1. **Comparability:** standards make statements of different firms and years comparable.\n2. **Reducing alternatives:** by narrowing the choice of methods, they limit the scope for presenting figures in a favourable way and make statements more reliable.',
  sol: 'Any two needs.',
  scheme: [['First need', 1], ['Second need', 1]],
}));
const RT = { paid: 4800, coll: 7200 };
RT.pay = same(RT.coll - RT.paid, 2400, 's2_itc');
QQ('s2_itc', short({
  t: 2, d: 2, c: 'application', marks: 2,
  stem: `Rina Traders, an imagined firm, paid ${rs(RT.paid)} as goods and services tax on its purchases and collected ${rs(RT.coll)} on its sales in a month. Explain input tax credit and find the tax payable for the month.`,
  model: `**Input tax credit** is the set-off of the tax paid on purchases (inputs) against the tax collected on sales (outputs), so that tax is paid only on the value added.\n\nTax payable = ${inr(RT.coll)} − ${inr(RT.paid)} = **${rs(RT.pay)}**.`,
  sol: 'Meaning of the credit and the net payable.',
  scheme: [['Meaning of input tax credit', 1], [`Tax payable ${rs(RT.pay)}`, 1]],
}));
QQ('s2_gstin', short({
  t: 2, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'What is a GSTIN? State two uses of it for a registered business.',
  model: 'The **GSTIN** (goods and services tax identification number) is the 15-character number given to each registered taxpayer in a state; it includes the state code and the taxpayer\'s PAN. It is used to issue tax invoices and to file returns and claim input tax credit.',
  sol: 'Meaning, then two uses.',
  scheme: [['Meaning: unique registration number', 1], ['Two uses, such as invoices, returns, input tax credit', 1]],
}));

// ================================================================ short answer, 3 marks
const BD = { recd: 48000, adv: 8000, due: 5000, paid: 30000, prepaid: 6000, outst: 2500 };
BD.cashProfit = same(BD.recd - BD.paid, 18000, 'Bhavya cash profit');
BD.rev = same(BD.recd - BD.adv + BD.due, 45000, 'Bhavya revenue');
BD.exp = same(BD.paid - BD.prepaid + BD.outst, 26500, 'Bhavya expenses');
BD.profit = same(BD.rev - BD.exp, 18500, 'Bhavya accrual profit');
BD.dRev = BD.recd - BD.rev;
BD.dExp = BD.paid - BD.exp;
same(BD.dRev, 3000, 'Bhavya revenue gap');
same(BD.dExp, 3500, 'Bhavya expense gap');
same(BD.profit - BD.cashProfit, 500, 'Bhavya profit gap');
QQ('s3_cash_accr_why', short({
  t: 2, d: 4, c: 'analysis', marks: 3,
  stem: `In March 2027, Bhavya Dance Academy, an imagined school, received ${rs(BD.recd)} in fees (including ${rs(BD.adv)} advance for April) and has ${rs(BD.due)} of March fees still due. It paid ${rs(BD.paid)} for expenses (including ${rs(BD.prepaid)} for April) and owes ${rs(BD.outst)} for March expenses. Find the profit on the cash basis and on the accrual basis, and explain why the two profits are so close although several items differ.`,
  model: `${mdTable(['Particulars', 'Cash basis (₹)', 'Accrual basis (₹)'], [
    ['Fees', inr(BD.recd), inr(BD.rev)],
    ['Expenses', inr(BD.paid), inr(BD.exp)],
    ['**Profit**', `**${inr(BD.cashProfit)}**`, `**${inr(BD.profit)}**`],
  ])}\n\nThe accrual revenue is lower by ${rs(BD.dRev)} (advance ${inr(BD.adv)} removed, fees due ${inr(BD.due)} added) and the accrual expenses are lower by ${rs(BD.dExp)} (prepaid ${inr(BD.prepaid)} removed, outstanding ${inr(BD.outst)} added). The two adjustments almost cancel, so profit differs only by ${rs(BD.profit - BD.cashProfit)}.`,
  sol: 'Compute both profits, then compare the adjustments to revenue and to expenses.',
  scheme: [['Cash basis profit', 1], ['Accrual basis profit', 1], ['Explanation through the offsetting adjustments', 1]],
}));
QQ('s3_standards', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Name the body that issues accounting standards in India, and say what Indian Accounting Standards (Ind AS) are. Give the year from which they were notified for specified companies (as of 2024).',
  model: 'In India, accounting standards are issued by the **Institute of Chartered Accountants of India** through its Accounting Standards Board, set up in 1977.\n\n**Indian Accounting Standards (Ind AS)** are standards converged with International Financial Reporting Standards. As of 2024, they were notified by the government in 2015 and became applicable from the 2016 financial year to specified companies, on the basis of conditions such as size.',
  sol: 'The body, the meaning of Ind AS, and the dates.',
  scheme: [['Institute of Chartered Accountants of India and its Board', 1], ['Ind AS converged with international standards', 1], ['Notified 2015, applicable from 2016 to specified companies', 1]],
}));
const SS = { buy: 80000, sell: 120000, rate: 12 };
SS.in = gst(SS.buy, SS.rate);
SS.out = gst(SS.sell, SS.rate);
SS.cg = same(SS.out.cgst - SS.in.cgst, 2400, 'Shreya CGST payable');
SS.sg = same(SS.out.sgst - SS.in.sgst, 2400, 'Shreya SGST payable');
SS.net = same(SS.cg + SS.sg, SS.out.tax - SS.in.tax, 'Shreya net');
QQ('s3_gst_itc', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `Shreya Stationers, an imagined firm, buys goods worth ${rs(SS.buy)} and sells goods worth ${rs(SS.sell)}, both within its own state, in a month. Goods and services tax is charged at an imagined rate of ${SS.rate}%. Show the CGST and SGST on the purchase and on the sale, and find the net CGST and SGST payable.`,
  model: `${mdTable(['', 'Value (₹)', 'CGST (₹)', 'SGST (₹)'], [
    ['Purchase (input tax)', inr(SS.buy), inr(SS.in.cgst), inr(SS.in.sgst)],
    ['Sale (output tax)', inr(SS.sell), inr(SS.out.cgst), inr(SS.out.sgst)],
    ['**Payable after credit**', '', `**${inr(SS.cg)}**`, `**${inr(SS.sg)}**`],
  ])}\n\nNet tax payable = ${inr(SS.cg)} + ${inr(SS.sg)} = **${rs(SS.net)}**.`,
  sol: 'Input credit of each tax is set against the output tax of the same tax.',
  scheme: [['Tax on the purchase split into CGST and SGST', 1], ['Tax on the sale split into CGST and SGST', 1], ['Net CGST, SGST and total payable', 1]],
}));
QQ('s3_gst_features', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'State any three features of goods and services tax (as of 2024).',
  model: '1. **Destination-based:** the tax accrues to the place where goods or services are consumed.\n2. **Dual structure:** CGST and SGST (UTGST in Union Territories) on intra-state supplies, and IGST on inter-state supplies.\n3. **Input tax credit:** tax paid on purchases is set off against tax on sales, so tax falls on value added.\n4. Introduced on 1 July 2017, each taxpayer is identified by a GSTIN.',
  sol: 'Any three features.',
  scheme: [['First feature', 1], ['Second feature', 1], ['Third feature', 1]],
}));

// ================================================================ long answer, 5 marks
const JY = { recd: 75000, adv: 10000, arrears: 5000, due: 9000, rentPaid: 36000, rentMonths: 4, wagesPaid: 20000, wagesPrior: 3000, wagesDue: 4000, elec: 2500 };
JY.cashOut = same(JY.rentPaid + JY.wagesPaid + JY.elec, 58500, 'Jiya cash payments');
JY.cashProfit = same(JY.recd - JY.cashOut, 16500, 'Jiya cash profit');
JY.rev = same(JY.recd - JY.adv - JY.arrears + JY.due, 69000, 'Jiya revenue');
JY.rent = same(JY.rentPaid / JY.rentMonths, 9000, 'Jiya rent');
JY.wages = same(JY.wagesPaid - JY.wagesPrior + JY.wagesDue, 21000, 'Jiya wages');
JY.exp = same(JY.rent + JY.wages + JY.elec, 32500, 'Jiya expenses');
JY.profit = same(JY.rev - JY.exp, 36500, 'Jiya accrual profit');
JY.diff = same(JY.profit - JY.cashProfit, 20000, 'Jiya difference');
QQ('l5_cash_accrual', long({
  t: 2, d: 4, c: 'analysis', marks: 5,
  stem: `Jiya Yoga Studio, an imagined studio, received ${rs(JY.recd)} in fees in November 2026, including ${rs(JY.adv)} advance for December and ${rs(JY.arrears)} arrears of October; fees of ${rs(JY.due)} for November are still to be received. It paid rent of ${rs(JY.rentPaid)} on 1 November for November to February, wages of ${rs(JY.wagesPaid)} (including ${rs(JY.wagesPrior)} of October), and electricity of ${rs(JY.elec)}; wages of ${rs(JY.wagesDue)} for November are due. Find the profit for November on the cash basis and on the accrual basis, and say which gives the better picture of the month.`,
  model: `**Cash basis:** receipts ${inr(JY.recd)} − payments (${inr(JY.rentPaid)} + ${inr(JY.wagesPaid)} + ${inr(JY.elec)} = ${inr(JY.cashOut)}) = **${rs(JY.cashProfit)}**.\n\n**Accrual basis:**\n\n${mdTable(['Particulars', '₹'], [
    [`Fees earned: ${inr(JY.recd)} − ${inr(JY.adv)} − ${inr(JY.arrears)} + ${inr(JY.due)}`, inr(JY.rev)],
    [`Less: rent of November (${inr(JY.rentPaid)} ÷ ${JY.rentMonths})`, inr(JY.rent)],
    [`Less: wages (${inr(JY.wagesPaid)} − ${inr(JY.wagesPrior)} + ${inr(JY.wagesDue)})`, inr(JY.wages)],
    ['Less: electricity', inr(JY.elec)],
    ['**Profit of November**', `**${inr(JY.profit)}**`],
  ])}\n\nThe profits differ by ${rs(JY.diff)}. The accrual profit gives the better picture of November, because it counts only the fees earned and the expenses incurred in the month; the cash profit is depressed by rent paid for three later months.`,
  sol: 'Both profits, then a reasoned judgement.',
  scheme: [['Cash basis profit', 1], ['Revenue of the month on the accrual basis', 1], ['Expenses of the month (rent, wages, electricity)', 1], ['Accrual basis profit', 1], ['Judgement with reason', 1]],
}));
const KC = { rate: 18, buyIn: 240000, sell: 400000, inter: 150000 };
KC.in = gst(KC.buyIn, KC.rate);
KC.out = gst(KC.sell, KC.rate);
KC.igst = gst(KC.inter, KC.rate, { interState: true });
KC.cg = same(KC.out.cgst - KC.in.cgst, 14400, 'Kabir CGST payable');
KC.sg = same(KC.out.sgst - KC.in.sgst, 14400, 'Kabir SGST payable');
same(KC.igst.igst, 27000, 'Kabir IGST');
QQ('l5_gst', long({
  t: 2, d: 3, c: 'application', marks: 5,
  stem: `Kabir Cycles, an imagined firm in Kota (Rajasthan), buys goods worth ${rs(KC.buyIn)} from a supplier in Rajasthan, sells goods worth ${rs(KC.sell)} to customers in Rajasthan, and separately sells goods worth ${rs(KC.inter)} to a dealer in Haryana in a month. Goods and services tax is charged at an imagined rate of ${KC.rate}% on every supply. Calculate (i) the CGST and SGST on the purchase, (ii) the CGST and SGST on the sales in Rajasthan, (iii) the net CGST and SGST payable after input tax credit, and (iv) the IGST on the sale to Haryana.`,
  model: `${mdTable(['', 'Value (₹)', 'CGST (₹)', 'SGST (₹)'], [
    ['Purchase in Rajasthan (input tax)', inr(KC.buyIn), inr(KC.in.cgst), inr(KC.in.sgst)],
    ['Sales in Rajasthan (output tax)', inr(KC.sell), inr(KC.out.cgst), inr(KC.out.sgst)],
    ['**Payable after credit**', '', `**${inr(KC.cg)}**`, `**${inr(KC.sg)}**`],
  ])}\n\nNet CGST and SGST payable = ${inr(KC.cg)} + ${inr(KC.sg)} = **${rs(KC.cg + KC.sg)}**.\n\nSale to Haryana is inter-state, so the whole tax is IGST: ${inr(KC.inter)} × ${KC.rate}/100 = **${rs(KC.igst.igst)}**.`,
  sol: 'Split each intra-state tax into two equal halves, set off like against like, and charge IGST on the inter-state sale.',
  scheme: [['Tax on the purchase: CGST and SGST', 1], ['Tax on the sales in Rajasthan: CGST and SGST', 1], ['Net CGST payable', 1], ['Net SGST payable', 1], ['IGST on the sale to Haryana', 1]],
}));
QQ('l5_standards', long({
  t: 2, d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the meaning and need of accounting standards, and state the benefits they bring. Name the body that issues them in India and state what Ind AS are (as of 2024).',
  model: [
    '**Meaning:** accounting standards are written statements of uniform accounting rules and policies for the treatment and disclosure of items in financial statements.',
    '**Need:** to make statements comparable, to make them reliable, and to reduce the alternative methods open to accountants.',
    '**Benefits:** uniform practice across firms; greater trust of users; easier work for auditors; information that investors and lenders can compare.',
    '**Issued by:** the Institute of Chartered Accountants of India, through its Accounting Standards Board (set up in 1977).',
    '**Ind AS:** Indian Accounting Standards, converged with International Financial Reporting Standards; notified by the government in 2015 for specified companies, applicable from 2016.',
  ].join('\n'),
  sol: 'Meaning, need, benefits, issuing body and Ind AS.',
  scheme: [['Meaning', 1], ['Need', 1], ['Benefits', 1], ['Issuing body', 1], ['Ind AS with date', 1]],
}));
void sum; void fb;
