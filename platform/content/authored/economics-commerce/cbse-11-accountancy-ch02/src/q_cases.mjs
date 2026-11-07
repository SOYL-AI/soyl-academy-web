// Case-based items (4 marks: 1 + 1 + 2, part (c) with an either/or), all on imagined businesses.
import { mcq, short, caseQ, child } from '../../cbse-11-accountancy-ch01/src/lib.mjs';
import { same, inr, rs, mdTable, gst, lcnrv } from './figures.mjs';
import { QQ } from './qq.mjs';

// ---------------------------------------------------------------- Kiran Cycle Mart: entity, cost, matching
const KM = { repair: 3500, rack: 60000, offer: 75000, premium: 12000, months: 12, used: 3 };
KM.rise = same(KM.offer - KM.rack, 15000, 'Kiran rack rise');
KM.charge = same((KM.premium * KM.used) / KM.months, 3000, 'Kiran insurance charge');
KM.prepaid = same(KM.premium - KM.charge, 9000, 'Kiran prepaid insurance');
QQ('cb_kiran', caseQ({
  t: [1], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(An imagined cycle shop, written for practice.)*',
  passage: `**Kiran Cycle Mart (imagined)**\n\nOn 2 April 2026 Kiran Joshi, the owner of Kiran Cycle Mart in the imagined town of Ranipur, paid ${rs(KM.repair)} for the repair of his own scooter out of the shop's cash box. In 2024 the shop had bought a display rack for ${rs(KM.rack)}; a dealer would now pay ${rs(KM.offer)} for a similar rack. On 1 January 2027 the shop paid an insurance premium of ${rs(KM.premium)} for twelve months from that day. The shop closes its books on 31 March every year.`,
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'application', stem: 'The payment for the scooter repair is recorded in the books of the shop as', opts: ['drawings by the owner', 'repairs expense of the shop', 'an asset of the shop', 'a liability of the shop'], sol: 'The shop is a separate entity from Kiran, so his personal payment is drawings. It is not a business expense, and it neither creates an asset nor a liability for the shop.' })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'State the amount at which the display rack appears in the books and name the concept.', model: `**${rs(KM.rack)}**, under the cost concept: the asset is recorded at the price paid, not the offer of ${rs(KM.offer)}.`, sol: 'The rack stays at its cost.', scheme: [['Cost amount with the concept', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Find the insurance premium charged to the year ended 31 March 2027 and the amount carried forward, and name the concept applied.', model: `Charge for the year = ${inr(KM.premium)} × ${KM.used}/${KM.months} = **${rs(KM.charge)}** (January to March). Carried forward = ${inr(KM.premium)} − ${inr(KM.charge)} = **${rs(KM.prepaid)}** as prepaid insurance. The concept is **matching**.`, sol: 'Three months charged, nine months carried forward.', scheme: [[`Charge ${rs(KM.charge)} and prepaid ${rs(KM.prepaid)}`, 1], ['Matching concept named', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Give two reasons why the shop does not raise the rack to the dealer\'s offer in its books.', model: `1. The rise of ${rs(KM.offer)} − ${rs(KM.rack)} = ${rs(KM.rise)} is not realised; the rack has not been sold, and the cost concept records only the price actually paid.\n2. The cost is objective and verifiable from the bill, while an offer is an opinion that can change.`, sol: 'The gain is unrealised, and cost is objective.', scheme: [['First reason', 1], ['Second reason', 1]] }),
    ]),
  ],
}));

// ---------------------------------------------------------------- Lakshya Bags: conservatism
const LB = lcnrv([['Backpacks', 28000, 33000], ['Trolley bags', 36000, 27000], ['Wallets', 10000, 10000]]);
same(LB.total, 65000, 'Lakshya stock');
same(LB.writeDown, 9000, 'Lakshya write-down');
QQ('cb_stock', caseQ({
  t: [1], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(An imagined bag shop, written for practice.)*',
  passage: `**Lakshya Bags (imagined)**\n\nAt the year end, the accountant of Lakshya Bags in the imagined city of Devpur lists three lots of closing stock. Backpacks: cost ${rs(28000)}, net realisable value ${rs(33000)}. Trolley bags: cost ${rs(36000)}, net realisable value ${rs(27000)} because a competitor has cut prices. Wallets: cost ${rs(10000)}, net realisable value ${rs(10000)}. The accountant values each lot at the lower of its cost and its net realisable value.`,
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'understanding', stem: 'Valuing each lot at the lower of cost and net realisable value follows the concept of', opts: ['conservatism', 'going concern', 'money measurement', 'business entity'], sol: 'Conservatism asks that a possible loss be provided for while a possible gain is not recorded. The other concepts do not deal with the valuation of stock.' })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'State the value at which the trolley bags appear in closing stock.', model: `**${rs(27000)}**, the net realisable value, which is lower than the cost of ${rs(36000)}.`, sol: 'Lower of the two values.', scheme: [[`${rs(27000)}`, 1]] })),
    child('c', short({ t: 1, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Find the total value of closing stock and the write-down compared with cost.', model: `${mdTable(['Lot', 'Cost (₹)', 'Net realisable value (₹)', 'Valued at (₹)'], [...LB.rows, ['**Total**', `**${inr(LB.costT)}**`, `**${inr(LB.nrvT)}**`, `**${inr(LB.total)}**`]])}\n\nClosing stock = **${rs(LB.total)}**; write-down = ${inr(LB.costT)} − ${inr(LB.total)} = **${rs(LB.writeDown)}**.`, sol: 'Lot by lot, then total and write-down.', scheme: [[`Closing stock ${rs(LB.total)}`, 1], [`Write-down ${rs(LB.writeDown)}`, 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Explain why the backpacks are not valued at their net realisable value of ₹33,000.', model: `The expected gain of ${rs(33000)} − ${rs(28000)} = ${rs(33000 - 28000)} has not yet been earned, because the backpacks have not been sold. Conservatism does not allow an anticipated profit to be recorded; the gain will be recognised when the sale is made.`, sol: 'Anticipated gain is not recorded until the sale.', scheme: [['Gain not yet earned', 1], ['Conservatism and recognition on sale', 1]] }),
    ]),
  ],
}));

// ---------------------------------------------------------------- Pragati Art Classes: cash and accrual
const PA = { recd: 40000, adv: 8000, due: 6000, rentPaid: 12000, rentMonths: 2, sal: 15000, salDue: 2000, other: 3000 };
PA.cashProfit = same(PA.recd - (PA.rentPaid + PA.sal + PA.other), 10000, 'Pragati cash profit');
PA.rev = same(PA.recd - PA.adv + PA.due, 38000, 'Pragati revenue');
PA.rent = same(PA.rentPaid / PA.rentMonths, 6000, 'Pragati rent');
PA.salary = same(PA.sal + PA.salDue, 17000, 'Pragati salary');
PA.exp = same(PA.rent + PA.salary + PA.other, 26000, 'Pragati expenses');
PA.profit = same(PA.rev - PA.exp, 12000, 'Pragati accrual profit');
QQ('cb_accrual', caseQ({
  t: [2], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(An imagined art school, written for practice.)*',
  passage: `**Pragati Art Classes (imagined)**\n\nPragati Art Classes, an imagined school in the town of Seemapur, received ${rs(PA.recd)} in fees in January 2027, including ${rs(PA.adv)} paid in advance for February. Fees of ${rs(PA.due)} earned in January are still to be received. The school paid rent of ${rs(PA.rentPaid)} on 1 January for January and February, salaries of ${rs(PA.sal)} and other expenses of ${rs(PA.other)}. Salaries of ${rs(PA.salDue)} for January are still unpaid. The owner first wants the profit of January from the cash received and paid.`,
  parts: [
    child('a', mcq({ t: 2, d: 1, c: 'understanding', stem: 'A profit worked out from only the cash received and cash paid in the month is a profit on the', opts: ['cash basis', 'accrual basis', 'going concern basis', 'cost basis'], sol: 'Using only cash movements is the cash basis. The accrual basis adjusts for amounts earned or incurred but not yet received or paid; going concern and cost are not bases of recording profit.' })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Find the profit of January 2027 on the cash basis.', model: `Profit = ${inr(PA.recd)} − (${inr(PA.rentPaid)} + ${inr(PA.sal)} + ${inr(PA.other)}) = **${rs(PA.cashProfit)}**.`, sol: 'Receipts less payments.', scheme: [[`${rs(PA.cashProfit)}`, 1]] })),
    child('c', short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Find the profit of January 2027 on the accrual basis.', model: `Revenue = ${inr(PA.recd)} − ${inr(PA.adv)} + ${inr(PA.due)} = ${rs(PA.rev)}. Expenses = rent ${inr(PA.rent)} + salaries (${inr(PA.sal)} + ${inr(PA.salDue)} = ${inr(PA.salary)}) + other ${inr(PA.other)} = ${rs(PA.exp)}. Profit = ${inr(PA.rev)} − ${inr(PA.exp)} = **${rs(PA.profit)}**.`, sol: 'Revenue earned less expenses incurred.', scheme: [[`Revenue ${rs(PA.rev)} and expenses ${rs(PA.exp)}`, 1], [`Profit ${rs(PA.profit)}`, 1]] }), [
      short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Give two reasons why the accrual-basis profit differs from the cash-basis profit here.', model: `1. The advance of ${rs(PA.adv)} was received in January but is revenue of February, and the fees of ${rs(PA.due)} were earned in January but not yet received, so revenue differs.\n2. Half the rent, ${rs(PA.rentPaid - PA.rent)}, belongs to February, and salaries of ${rs(PA.salDue)} belong to January but are unpaid, so expenses differ.`, sol: 'One reason about revenue and one about expenses.', scheme: [['Reason about revenue', 1], ['Reason about expenses', 1]] }),
    ]),
  ],
}));

// ---------------------------------------------------------------- Rahul Traders: GST
const RH = { buy: 60000, sell: 90000, rate: 12 };
RH.in = gst(RH.buy, RH.rate);
RH.out = gst(RH.sell, RH.rate);
RH.inter = gst(RH.sell, RH.rate, { interState: true });
RH.cg = same(RH.out.cgst - RH.in.cgst, 1800, 'Rahul CGST payable');
RH.sg = same(RH.out.sgst - RH.in.sgst, 1800, 'Rahul SGST payable');
RH.net = same(RH.cg + RH.sg, 3600, 'Rahul net payable');
same(RH.in.tax, 7200, 'Rahul input tax');
same(RH.inter.igst, 10800, 'Rahul IGST if inter-state');
QQ('cb_gst', caseQ({
  t: [2], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(An imagined trading firm and imagined rates, written for practice.)*',
  passage: `**Rahul Traders (imagined)**\n\nRahul Traders, an imagined firm in Gwalior (Madhya Pradesh), bought goods worth ${rs(RH.buy)} from a supplier in Gwalior and sold goods worth ${rs(RH.sell)} to a customer in Bhopal (Madhya Pradesh) in a month. Goods and services tax is charged at an imagined rate of ${RH.rate}% on both supplies. The firm has a GSTIN and claims input tax credit on its purchase.`,
  parts: [
    child('a', mcq({ t: 2, d: 1, c: 'application', stem: 'The goods and services tax charged on the purchase from the Gwalior supplier consists of', opts: ['CGST and SGST', 'IGST only', 'SGST only', 'CGST only'], sol: 'Both parties are in Madhya Pradesh, so the supply is intra-state and carries CGST and SGST in equal halves. IGST is for inter-state supplies, and neither tax alone is charged on an intra-state supply.' })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Find the total input tax credit available to the firm on its purchase.', model: `Input tax = ${inr(RH.buy)} × ${RH.rate}/100 = **${rs(RH.in.tax)}** (CGST ${inr(RH.in.cgst)} + SGST ${inr(RH.in.sgst)}).`, sol: 'Tax paid on the purchase.', scheme: [[`${rs(RH.in.tax)}`, 1]] })),
    child('c', short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Find the CGST and SGST payable to the government for the month after input tax credit.', model: `Output CGST ${inr(RH.out.cgst)} − input CGST ${inr(RH.in.cgst)} = **${rs(RH.cg)}**; output SGST ${inr(RH.out.sgst)} − input SGST ${inr(RH.in.sgst)} = **${rs(RH.sg)}**; total ${rs(RH.net)}.`, sol: 'Set off like against like.', scheme: [[`CGST ${rs(RH.cg)}`, 1], [`SGST ${rs(RH.sg)}`, 1]] }), [
      short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Had the ₹90,000 sale been to a customer in another state at the same imagined rate, which tax would apply and how much would it be? Give the reason.', model: `IGST would apply, because the supply would be inter-state. IGST = ${inr(RH.sell)} × ${RH.rate}/100 = **${rs(RH.inter.igst)}**, charged as a single tax instead of CGST and SGST.`, sol: 'Inter-state supply attracts IGST.', scheme: [['IGST named with reason', 1], [`Amount ${rs(RH.inter.igst)}`, 1]] }),
    ]),
  ],
}));
