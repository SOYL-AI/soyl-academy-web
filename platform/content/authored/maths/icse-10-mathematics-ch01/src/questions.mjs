// ICSE 10 Mathematics ch01 Goods and Services Tax — practice bank. Every amount in a stem, option,
// solution or model answer is produced from integer-paise arithmetic in fin.mjs (which throws on any
// inexact percentage), and each item has a re-solve check that recomputes its key from the givens and
// asserts the GST identities (CGST = SGST, price + tax = amount, payables along a chain add up to the
// consumer's tax). Shops, firms and people are imagined.
import { Q, mk, table, flow } from './lib.mjs';
import { r, rs, rup, R, nm, pctOf, sale, disc, bill, invoice, chain, baseFrom, rateFrom, discFrom, listFrom, profitPct, withProfit, priceFromTax } from './fin.mjs';

/** MCQ whose four options are money amounts (paise); the check recomputes the target independently. */
function QM(key, o, vals, target, extra) {
  Q(key, mk.mcq({ ...o, opts: vals.map((v) => R(v)) }), (C) => { if (extra) extra(C); C.which(vals, target()); });
}
const pcs = (x) => `$${x}\\%$`;

// =============================================================== MCQ (18)
Q('m01', mk.mcq({ stem: 'Under GST, when a dealer sells goods to a buyer in the same state, the tax charged on the bill is', opts: ['CGST and SGST, in equal parts', 'IGST only', 'CGST only', 'SGST only'], key: 'a', sol: 'An intra-state supply is taxed by both governments: half the rate as central GST and half as state GST. IGST, option (b), is for supplies from one state to another.', d: 1, c: 'recall', t: [1], time: 30 }),
  (C) => { const s = sale(rs(1000), 18); C.assert(s.cgst === s.sgst && s.cgst + s.sgst === s.gst && s.igst === 0, 'intra-state: CGST = SGST, no IGST'); C.key('a'); });
Q('m02', mk.mcq({ stem: 'A geyser is sold by a shop in Shimla to a family in Shimla at a GST rate of 12%. The rate of central GST on the bill is', opts: [pcs(6), pcs(12), pcs(24), pcs(3)], key: 'a', sol: r`Intra-state: the $12\%$ is shared equally, so CGST is charged at $6\%$ and SGST at $6\%$. Option (b) is the full GST rate.`, d: 1, c: 'understanding', t: [1], time: 30 }),
  (C) => { C.assert(pctOf(rs(100), 12 / 2) === sale(rs(100), 12).cgst, 'CGST rate is half'); C.which([6, 12, 24, 3], 12 / 2); });
{
  const p = rs(2350), s = sale(p, 12);
  QM('m03', { stem: `A handicraft store in Shillong sells a cane chair for ${R(p)} to a buyer in Shillong. GST is charged at 12%. The SGST on the bill is`, key: 'a', sol: r`GST $= \dfrac{12}{100} \times ${nm(p)} = ${nm(s.gst)}$; SGST is half of it, ${R(s.sgst)}. Option (b) is the whole GST, and option (d) wrongly adds only the SGST to the price.`, d: 2, c: 'understanding', t: [1] },
    [s.sgst, s.gst, pctOf(p, 3), p + s.sgst], () => sale(rs(2350), 12).sgst, (C) => C.assert(s.cgst === s.sgst, 'CGST = SGST'));
}
{
  const p = rs(18600), s = sale(p, 5, { inter: true }), h = s.gst / 2;
  const o = [`IGST of ${R(s.igst)}`, `CGST of ${R(h)} and SGST of ${R(h)}`, `IGST of ${R(h)}`, `CGST of ${R(s.gst)} and SGST of ${R(s.gst)}`];
  Q('m04', mk.mcq({ stem: `A tea trader in Guwahati (Assam) sends tea packets priced at ${R(p)} to a buyer in Siliguri (West Bengal). GST is 5%. The tax on the invoice is`, opts: o, key: 'a', sol: r`Assam to West Bengal is an inter-state supply, so the full $5\%$ is charged as IGST: $\dfrac{5}{100} \times ${nm(p)} = ${nm(s.igst)}$. Option (b) would be right only for a sale inside Assam.`, d: 2, c: 'understanding', t: [1] }),
    (C) => { const t = sale(rs(18600), 5, { inter: true }); C.assert(t.cgst === 0 && t.igst === t.gst, 'inter-state: IGST only'); C.which(o, `IGST of ${R(t.igst)}`); });
}
{
  const inv = invoice([[rs(1850), 12], [rs(1250), 18]]);
  QM('m05', { stem: `A kitchenware shop in Mysuru bills a local customer for a pressure cooker at ${R(rs(1850))} (GST 12%) and an electric kettle at ${R(rs(1250))} (GST 18%). The total GST on the bill is`, key: 'a', sol: r`Tax each line at its own rate: $\dfrac{12}{100} \times 1850 = ${nm(inv.rows[0].gst)}$ and $\dfrac{18}{100} \times 1250 = ${nm(inv.rows[1].gst)}$, total ${R(inv.gst)}. Options (b) and (c) use one rate for both items; option (d) is the whole bill.`, d: 2, c: 'application', t: [1] },
    [inv.gst, pctOf(inv.price, 12), pctOf(inv.price, 18), inv.amount], () => pctOf(rs(1850), 12) + pctOf(rs(1250), 18));
}
{
  const b = bill(rs(5600), 10, 18);
  QM('m06', { stem: `An almirah has a list price of ${R(b.list)}. The shop gives a discount of 10% and then charges GST at 18%. The GST charged is`, key: 'a', sol: r`GST is charged on the reduced price: $5600 - ${nm(b.off)} = ${nm(b.sp)}$, and $\dfrac{18}{100} \times ${nm(b.sp)} = ${nm(b.gst)}$. Option (b) taxes the list price; option (d) is the amount paid.`, d: 2, c: 'understanding', t: [2] },
    [b.gst, pctOf(b.list, 18), pctOf(b.off, 18), b.amount], () => pctOf(disc(rs(5600), 10).sp, 18));
}
{
  const b = bill(rs(12500), 20, 28);
  QM('m07', { stem: `A split air conditioner listed at ${R(b.list)} is sold at a discount of 20%, and GST at 28% is added to the reduced price. The customer pays`, key: 'a', sol: r`Reduced price ${R(b.sp)}; GST $= \dfrac{28}{100} \times ${nm(b.sp)} = ${nm(b.gst)}$; amount ${R(b.amount)}. Option (b) treats it as "$8\%$ more than the list price", option (c) ignores the discount and option (d) ignores the tax.`, d: 2, c: 'application', t: [2] },
    [b.amount, b.list + pctOf(b.list, 8), b.list + pctOf(b.list, 28), b.sp], () => { const s = disc(rs(12500), 20).sp; return s + pctOf(s, 28); });
}
Q('m08', mk.mcq({ stem: 'When a shopkeeper gives a discount on the list price of an article and then charges GST, the GST is calculated on', opts: ['the price after the discount', 'the list price', 'the discount', 'the price the shopkeeper paid for the article'], key: 'a', sol: 'Tax is charged on the value of the sale, which is the price the buyer actually agrees to pay before tax: the list price minus the discount.', d: 1, c: 'recall', t: [2], time: 30 }),
  (C) => { const b = bill(rs(1000), 10, 18); C.assert(b.gst === pctOf(rs(900), 18) && b.gst !== pctOf(rs(1000), 18), 'GST on the reduced price'); C.key('a'); });
Q('m09', mk.mcq({ stem: 'Input tax credit under GST allows a registered dealer to', opts: ['deduct the GST paid on purchases from the GST collected on sales', 'add the GST paid on purchases to the selling price', 'avoid charging GST to the next buyer', 'collect GST twice on the same article'], key: 'a', sol: 'The dealer pays the government only the difference: GST collected on sales (output tax) minus GST already paid on purchases (input tax).', d: 1, c: 'recall', t: [3], time: 30 }),
  (C) => { const c = chain([rs(1000), rs(1200)], 18); C.assert(c.stages[1].pay === c.stages[1].out.gst - c.stages[0].out.gst, 'payable = output - input'); C.key('a'); });
{
  const out = rs(1440), inp = rs(1080);
  QM('m10', { stem: `In one month a dealer in Ranchi collected GST of ${R(out)} on sales and had paid GST of ${R(inp)} on purchases of the same goods. The net GST the dealer pays to the government is`, key: 'a', sol: r`Net GST $= ${nm(out)} - ${nm(inp)} = ${nm(out - inp)}$. Option (b) adds instead of subtracting; option (c) is only the central half of the net amount.`, d: 2, c: 'understanding', t: [3] },
    [out - inp, out + inp, (out - inp) / 2, out], () => rs(1440) - rs(1080));
}
{
  const c = chain([rs(8000), rs(9500)], 12), w = c.stages[1];
  QM('m11', { stem: `A wholesaler in Kanpur buys a consignment of school bags for ${R(rs(8000))} and sells it to a retailer in Lucknow (both in Uttar Pradesh) for ${R(rs(9500))}. GST is 12%. The CGST paid by the wholesaler to the government is`, key: 'a', sol: r`Output CGST $= 6\% \text{ of } 9500 = ${nm(w.out.cgst)}$; input CGST $= 6\% \text{ of } 8000 = ${nm(w.input.cgst)}$; CGST payable $= ${nm(w.out.cgst)} - ${nm(w.input.cgst)} = ${nm(w.cgstPay)}$. Option (b) is the total net GST, and option (c) forgets the input credit.`, d: 3, c: 'application', t: [3] },
    [w.cgstPay, w.pay, w.out.cgst, w.out.gst], () => pctOf(rs(9500) - rs(8000), 6), (C) => C.assert(w.cgstPay === w.sgstPay, 'CGST payable = SGST payable'));
}
{
  const c = chain([rs(24000), rs(27600), rs(31200)], 5);
  const outs = c.stages.reduce((s, x) => s + x.out.gst, 0);
  QM('m12', { stem: `Solar lanterns pass from a manufacturer to a wholesaler for ${R(rs(24000))}, from the wholesaler to a retailer for ${R(rs(27600))}, and from the retailer to a consumer for ${R(rs(31200))}, all within Odisha. GST is 5% at every stage. The total GST received by the government is`, key: 'a', sol: r`The net payments are $${nm(c.stages[0].pay)} + ${nm(c.stages[1].pay)} + ${nm(c.stages[2].pay)} = ${nm(c.total)}$, which is $5\%$ of the final price $31200$. Option (b) adds every output tax and so counts the same tax again and again.`, d: 3, c: 'application', t: [3] },
    [c.total, outs, c.stages[1].pay + c.stages[2].pay, c.stages[0].pay], () => pctOf(rs(31200), 5), (C) => C.assert(c.total === c.consumerTax, 'total = consumer tax'));
}
Q('m13', mk.mcq({ stem: 'Goods pass from a manufacturer through a wholesaler and a retailer to a consumer, all in one state, at a single GST rate, and every dealer sells for more than it paid. The total GST received by the government equals', opts: ['the GST paid by the consumer on the final price', 'the sum of the GST charged at every sale', 'the GST on the price charged by the manufacturer', 'zero, because every dealer claims input tax credit'], key: 'a', sol: 'Each dealer pays output tax minus input tax, so when the payments are added the intermediate taxes cancel and only the tax on the last sale is left. That tax is borne by the consumer.', d: 3, c: 'analysis', t: [3], time: 75 }),
  (C) => { const c = chain([rs(500), rs(650), rs(800)], 12); C.assert(c.total === pctOf(rs(800), 12) && c.total !== c.stages.reduce((s, x) => s + x.out.gst, 0), 'telescoping'); C.key('a'); });
{
  const sp = withProfit(rs(4000), 15), c = chain([rs(4000), sp], 18), w = c.stages[1];
  QM('m14', { stem: `A dealer in Jammu buys a sewing machine for ${R(rs(4000))} (before GST) and sells it to a customer in Jammu at a profit of 15%. GST is 18% on both sales. The net GST the dealer pays to the government is`, key: 'a', sol: r`Selling price $= ${nm(sp)}$. Output tax $= ${nm(w.out.gst)}$, input tax $= ${nm(w.input.gst)}$, net $= ${nm(w.pay)}$, which is $18\%$ of the profit ${R(sp - rs(4000))}. Option (d) is only the CGST part.`, d: 3, c: 'application', t: [3] },
    [w.pay, w.out.gst, w.input.gst, w.cgstPay], () => pctOf(pctOf(rs(4000), 15), 18));
}
{
  const a = rs(2124), b = baseFrom(a, 18);
  QM('m15', { stem: `A customer in Bhopal pays ${R(a)} for a set of bedsheets, including GST at 18%. The price of the bedsheets before GST is`, key: 'a', sol: r`Price $= ${nm(a)} \times \dfrac{100}{118} = ${nm(b)}$. Option (b) takes $18\%$ off the amount paid, which is wrong because the $18\%$ was added to the smaller price.`, d: 2, c: 'application', t: [4] },
    [b, pctOf(a, 82), a - rs(18), a - b], () => (rs(2124) * 100) / 118);
}
{
  const p = rs(3750), a = rs(4200), g = rateFrom(p, a);
  Q('m16', mk.mcq({ stem: `After a discount, a study lamp is priced at ${R(p)}. A customer pays ${R(a)} including GST. The rate of GST is`, opts: [pcs(g), pcs(18), pcs(28), pcs(5)], key: 'a', sol: r`GST $= ${nm(a)} - ${nm(p)} = ${nm(a - p)}$, and rate $= \dfrac{${nm(a - p)}}{${nm(p)}} \times 100 = ${g}$ percent. Divide by the price before tax, not by the amount paid.`, d: 3, c: 'application', t: [4] }),
    (C) => C.which([g, 18, 28, 5], ((rs(4200) - rs(3750)) / rs(3750)) * 100));
}
{
  const a = rs(6608), sp = baseFrom(a, 18), l = listFrom(sp, 20);
  QM('m17', { stem: `A customer pays ${R(a)} for a pair of running shoes after a discount of 20% on the list price and GST at 18% on the reduced price. The list price is`, key: 'a', sol: r`Reduced price $= ${nm(a)} \times \dfrac{100}{118} = ${nm(sp)}$; list price $= ${nm(sp)} \times \dfrac{100}{80} = ${nm(l)}$. Option (c) adds $20\%$ to the reduced price instead of dividing by $0.8$.`, d: 3, c: 'application', t: [4] },
    [l, sp, sp + pctOf(sp, 20), (a * 100) / 80], () => ((rs(6608) * 100) / 118) * (100 / 80));
}
{
  const t = rs(216), p = priceFromTax(t, 9);
  QM('m18', { stem: `On an intra-state sale, the SGST shown on the bill is ${R(t)}, charged at 9%. The price of the article before tax is`, key: 'a', sol: r`SGST at $9\%$: price $= ${nm(t)} \times \dfrac{100}{9} = ${nm(p)}$. Option (b) treats ${R(t)} as $18\%$ of the price.`, d: 2, c: 'understanding', t: [1, 4] },
    [p, priceFromTax(t, 18), p + t, 2 * p], () => (rs(216) * 100) / 9, (C) => C.assert(sale(p, 18).sgst === t, 'SGST of the price is 216'));
}

// =============================================================== assertion-reason (7), keys a d c a b c d
{
  const s = sale(rs(1000), 18);
  Q('ar1', mk.ar({ a: 'On a sale within a state at a GST rate of 18%, CGST is charged at 9% and SGST at 9%.', r: 'On an intra-state supply, GST is shared equally between the central government and the state government.', key: 'a', sol: 'R states the equal sharing, which is exactly why the 18% splits into 9% + 9%. Both are true and R explains A.', d: 1, c: 'understanding', t: [1] }),
    (C) => { C.assert(s.cgst === pctOf(rs(1000), 9) && s.sgst === s.cgst, '9% + 9%'); C.key('a'); });
}
{
  const s = sale(rs(10000), 12, { inter: true });
  Q('ar2', mk.ar({ a: `Goods priced at ${R(rs(10000))}, sent by a dealer in Pune (Maharashtra) to a buyer in Indore (Madhya Pradesh) at a GST rate of 12%, attract CGST of ${R(rs(600))} and SGST of ${R(rs(600))}.`, r: 'A supply of goods from one state to another attracts IGST at the full GST rate.', key: 'd', sol: `Pune to Indore crosses a state boundary, so the bill shows IGST of ${R(s.igst)}, not CGST and SGST. A is false; R is true.`, d: 2, c: 'understanding', t: [1] }),
    (C) => { C.assert(s.cgst === 0 && s.igst === rs(1200), 'IGST 1200'); C.key('d'); });
}
{
  const b = bill(rs(8000), 10, 10);
  Q('ar3', mk.ar({ a: `An article listed at ${R(b.list)} is sold at a discount of 10%, and GST at 10% is charged on the reduced price. The customer pays ${R(b.amount)}.`, r: 'A discount of x% followed by a tax of x% on the reduced price always brings the price back to the list price.', key: 'c', sol: r`A: $8000 \times 0.9 = ${nm(b.sp)}$ and $${nm(b.sp)} \times 1.1 = ${nm(b.amount)}$, true. R is false: the tax is a percentage of a smaller number, so the result is $(1 - x/100)(1 + x/100) = 1 - x^2/10000$ times the list price, always a little less.`, d: 3, c: 'analysis', t: [2] }),
    (C) => { C.assert(b.amount === rs(7920) && b.amount < b.list, '7920 < 8000'); C.key('c'); });
}
{
  const c = chain([rs(2000), rs(2500)], 12);
  Q('ar4', mk.ar({ a: `A retailer buys a toaster for ${R(rs(2000))} and sells it for ${R(rs(2500))}, both before GST, within the same state. GST is 12%. The retailer pays ${R(c.stages[1].pay)} to the government.`, r: 'Because of input tax credit, a dealer effectively pays GST only on the value it adds, that is, on its selling price minus its purchase price.', key: 'a', sol: r`$12\% \text{ of } (2500 - 2000) = 12\% \text{ of } 500 = ${nm(c.stages[1].pay)}$. Both true, and R is the reason the retailer's payment is so small.`, d: 2, c: 'understanding', t: [3] }),
    (C) => { C.assert(c.stages[1].pay === pctOf(rs(500), 12), '12% of 500'); C.key('a'); });
}
Q('ar5', mk.ar({ a: 'On an intra-state sale at a GST rate of 28%, central GST is charged at 14%.', r: 'A supply from one state to another attracts IGST.', key: 'b', sol: 'A is true: 28% is split as 14% CGST + 14% SGST. R is also true, but it is about inter-state sales, so it does not explain A.', d: 1, c: 'understanding', t: [1] }),
  (C) => { C.assert(sale(rs(100), 28).cgst === pctOf(rs(100), 14) && sale(rs(100), 28, { inter: true }).igst === pctOf(rs(100), 28), 'facts'); C.key('b'); });
{
  const a = rs(5900), b = baseFrom(a, 18);
  Q('ar6', mk.ar({ a: `If a customer pays ${R(a)} including GST at 18%, the price before GST is ${R(b)}.`, r: 'The price before GST is 82% of the amount paid.', key: 'c', sol: r`A: $5000 + 18\% \text{ of } 5000 = 5900$, true. R is false: $82\% \text{ of } 5900$ is ${R(pctOf(a, 82))}. The correct factor is $\dfrac{100}{118}$, because the $18\%$ was added to the price, not taken from the amount.`, d: 3, c: 'analysis', t: [4] }),
    (C) => { C.assert(b === rs(5000) && pctOf(a, 82) !== b, 'R false'); C.key('c'); });
}
{
  const c = chain([rs(5500), rs(5280)], 18);
  Q('ar7', mk.ar({ a: 'A dealer who sells an article for less than the price at which it was bought (both before GST, same rate) still has to pay a positive amount of GST on that sale.', r: 'The net GST payable by a dealer is the output tax minus the input tax.', key: 'd', sol: 'By R, a lower selling price means output tax smaller than input tax, so the net figure is negative: nothing is payable and the difference stays as credit. A is false, R is true.', d: 3, c: 'analysis', t: [3] }),
    (C) => { C.assert(c.stages[1].pay < 0, 'negative net GST at a loss'); C.key('d'); });
}

// =============================================================== true-false (5)
Q('tf1', mk.tf({ stem: 'True or false: on a sale within a state, central GST and state GST are each charged at half the GST rate.', key: 't', sol: 'True. The rate is shared equally, for example 5% = 2.5% + 2.5% and 18% = 9% + 9%.', d: 1, c: 'recall', t: [1] }),
  (C) => { for (const g of [5, 12, 18, 28]) C.assert(sale(rs(2000), g).cgst === pctOf(rs(2000), g / 2), `half of ${g}%`); C.key('t'); });
Q('tf2', mk.tf({ stem: 'True or false: GST is charged on the list price of an article even when the shop gives a discount on it.', key: 'f', sol: `False. GST is charged on the price after the discount. On a list price of ${R(rs(1500))} with 10% off at 12% GST, the tax is 12% of ${R(rs(1350))}, that is ${R(pctOf(rs(1350), 12))}.`, d: 1, c: 'understanding', t: [2] }),
  (C) => { C.assert(bill(rs(1500), 10, 12).gst === rs(162), 'tax on 1350'); C.key('f'); });
Q('tf3', mk.tf({ stem: 'True or false: when the GST rate is the same on its purchase and its sale, a retailer\'s net GST payable equals that rate applied to the retailer\'s margin (selling price minus purchase price, both before tax).', key: 't', sol: `True. Output minus input is r% of the selling price minus r% of the purchase price, which is r% of the margin. Example: buying at ${R(rs(3000))} and selling at ${R(rs(3600))} at 18% gives ${R(pctOf(rs(600), 18))}.`, d: 2, c: 'understanding', t: [3] }),
  (C) => { const c = chain([rs(3000), rs(3600)], 18); C.assert(c.stages[1].pay === pctOf(rs(600), 18), '18% of 600'); C.key('t'); });
Q('tf4', mk.tf({ stem: 'True or false: a consumer who buys a refrigerator for use at home can claim input tax credit for the GST paid on it.', key: 'f', sol: 'False. Input tax credit is available to a registered dealer who uses the goods in business and charges GST on sales. The consumer is at the end of the chain and bears the tax.', d: 2, c: 'understanding', t: [3] }),
  (C) => { const c = chain([rs(20000), rs(23000)], 18); C.assert(c.consumerTax === c.total, 'the consumer bears the total'); C.key('f'); });
Q('tf5', mk.tf({ stem: 'True or false: if an amount A includes GST at r%, the price before GST is A × (100 − r)/100.', key: 'f', sol: `False. The price is A × 100/(100 + r). For example, ${R(rs(1180))} at 18% comes from ${R(baseFrom(rs(1180), 18))}, while 82% of ${R(rs(1180))} is ${R(pctOf(rs(1180), 82))}.`, d: 2, c: 'understanding', t: [4] }),
  (C) => { C.assert(baseFrom(rs(1180), 18) === rs(1000) && pctOf(rs(1180), 82) !== rs(1000), 'counterexample'); C.key('f'); });

// =============================================================== fill in the blank (5)
Q('fb1', mk.fill({ stem: 'For a sale within one state at a GST rate of 18%, the rate of CGST is ____ %.', acc: [['9']], sol: 'Half of 18%: CGST 9% and SGST 9%. Blank: 9.', d: 1, c: 'recall', t: [1] }),
  (C) => C.blank(18 / 2));
{
  const s = sale(rs(7250), 12, { inter: true });
  Q('fb2', mk.fill({ stem: `A dealer in Chandigarh sells a water purifier priced at ${R(rs(7250))} to a shop in Shimla (Himachal Pradesh) at a GST rate of 12%. The IGST on the invoice is ₹ ____.`, acc: [[nm(s.igst), inr0(s.igst)]], sol: r`Inter-state, so IGST $= \dfrac{12}{100} \times 7250 = ${nm(s.igst)}$. Blank: ${nm(s.igst)}.`, d: 2, c: 'understanding', t: [1] }),
    (C) => C.blank(rup(pctOf(rs(7250), 12))));
}
{
  const b = bill(rs(960), 25, 5);
  Q('fb3', mk.fill({ stem: `A board game is listed at ${R(b.list)}. After a discount of 25% and GST of 5% on the reduced price, the customer pays ₹ ____.`, acc: [[nm(b.amount)]], sol: r`Reduced price $= ${nm(b.sp)}$; GST $= ${nm(b.gst)}$; amount $= ${nm(b.sp)} + ${nm(b.gst)} = ${nm(b.amount)}$. Blank: ${nm(b.amount)}.`, d: 2, c: 'application', t: [2] }),
    (C) => C.blank(rup(disc(rs(960), 25).sp * 1.05)));
}
Q('fb4', mk.fill({ stem: `A wholesaler of ceiling fans collected output GST of ${R(rs(2340))} and paid input GST of ${R(rs(1755))} on the same fans. The net GST payable is ₹ ____.`, acc: [[nm(rs(2340) - rs(1755))]], sol: r`Net $= 2340 - 1755 = ${nm(rs(2340) - rs(1755))}$. Blank: ${nm(rs(585))}.`, d: 1, c: 'understanding', t: [3] }),
  (C) => C.blank(2340 - 1755));
{
  const b = baseFrom(rs(3360), 12);
  Q('fb5', mk.fill({ stem: `A customer pays ${R(rs(3360))} for a mattress, including GST at 12%. The price before GST is ₹ ____.`, acc: [[nm(b), inr0(b)]], sol: r`Price $= 3360 \times \dfrac{100}{112} = ${nm(b)}$. Blank: ${nm(b)}.`, d: 2, c: 'application', t: [4] }),
    (C) => C.blank(3360 * 100 / 112));
}

// =============================================================== numerical (8)
{
  const s = sale(rs(3850), 28);
  Q('n01', mk.num({ stem: `A dealer in Vadodara sells a motorcycle helmet set priced at ${R(rs(3850))} to a customer in Vadodara. GST is 28%. Find the CGST in rupees.`, value: rup(s.cgst), unit: '₹', sol: r`CGST $= \dfrac{14}{100} \times 3850 = ${nm(s.cgst)}$.`, scheme: [[`CGST = ${nm(s.cgst)}`, 1]], d: 2, c: 'understanding', t: [1], time: 60 }),
    (C) => C.val(3850 * 0.14));
}
{
  const b = bill(rs(18400), 12.5, 18);
  Q('n02', mk.num({ stem: `A laptop listed at ${R(b.list)} is sold at a discount of 12.5%, and GST at 18% is charged on the reduced price. Find the amount the customer pays, in rupees.`, value: rup(b.amount), unit: '₹', sol: r`Reduced price $= ${nm(b.list)} - ${nm(b.off)} = ${nm(b.sp)}$; GST $= ${nm(b.gst)}$; amount $= ${nm(b.amount)}$.`, scheme: [[`Amount = ${nm(b.amount)}`, 1]], d: 3, c: 'application', t: [2], time: 120 }),
    (C) => C.val(18400 * 0.875 * 1.18, 1e-6));
}
{
  const P1 = bill(rs(7800), 15, 12), P2 = bill(rs(7500), 10, 12);
  Q('n03', mk.num({ stem: `The same model of washing machine is listed at ${R(P1.list)} with 15% off at shop P, and at ${R(P2.list)} with 10% off at shop Q, both in Kolkata. GST is 12% on the reduced price. How many rupees more does a customer pay at shop Q than at shop P?`, value: rup(P2.amount - P1.amount), unit: '₹', sol: r`Shop P: $${nm(P1.sp)} \times 1.12 = ${nm(P1.amount)}$. Shop Q: $${nm(P2.sp)} \times 1.12 = ${nm(P2.amount)}$. Difference $= ${nm(P2.amount - P1.amount)}$.`, scheme: [[`Difference = ${nm(P2.amount - P1.amount)}`, 1]], d: 3, c: 'application', t: [2], time: 150 }),
    (C) => C.val((7500 * 0.9 - 7800 * 0.85) * 1.12, 1e-6));
}
{
  const c = chain([rs(15000), rs(17250), rs(19800)], 12);
  Q('n04', mk.num({ stem: `Inside Tamil Nadu, a batch of steel cupboards is sold by the maker to a wholesaler for ${R(rs(15000))}, by the wholesaler to a retailer for ${R(rs(17250))} and by the retailer to a consumer for ${R(rs(19800))}. GST is 12% throughout. Find the total GST, in rupees, received by the government.`, value: rup(c.total), unit: '₹', sol: r`Payments $${nm(c.stages[0].pay)} + ${nm(c.stages[1].pay)} + ${nm(c.stages[2].pay)} = ${nm(c.total)}$, equal to $12\% \text{ of } 19800$.`, scheme: [[`Total = ${nm(c.total)}`, 1]], d: 2, c: 'understanding', t: [3], time: 120 }),
    (C) => C.val(19800 * 0.12, 1e-6));
}
{
  const c = chain([rs(6400), rs(7200)], 18), w = c.stages[1];
  Q('n05', mk.num({ stem: `A retailer in Mangaluru buys a gas stove for ${R(rs(6400))} and sells it to a customer in Mangaluru for ${R(rs(7200))}, both before GST. GST is 18%. Find the CGST, in rupees, that the retailer pays to the government.`, value: rup(w.cgstPay), unit: '₹', sol: r`CGST payable $= 9\% \text{ of } (7200 - 6400) = \dfrac{9}{100} \times 800 = ${nm(w.cgstPay)}$.`, scheme: [[`CGST payable = ${nm(w.cgstPay)}`, 1]], d: 2, c: 'understanding', t: [3], time: 90 }),
    (C) => C.val(800 * 0.09));
}
{
  const g = rateFrom(rs(4500), rs(4725));
  Q('n06', mk.num({ stem: `After a discount, a pack of millet flour bags is priced at ${R(rs(4500))}. The buyer pays ${R(rs(4725))} including GST. Find the rate of GST (as a percentage).`, value: g, unit: '%', sol: r`GST $= 4725 - 4500 = 225$; rate $= \dfrac{225}{4500} \times 100 = ${g}$.`, scheme: [[`Rate = ${g}%`, 1]], d: 2, c: 'application', t: [4], time: 90 }),
    (C) => C.val(((4725 - 4500) / 4500) * 100, 1e-9));
}
{
  const sp = baseFrom(rs(1932), 5), d = discFrom(rs(2000), sp);
  Q('n07', mk.num({ stem: `A jute rug is listed at ${R(rs(2000))}. GST is 5% on the price after discount, and a customer pays ${R(rs(1932))}. Find the rate of discount (as a percentage).`, value: d, unit: '%', sol: r`Price after discount $= 1932 \times \dfrac{100}{105} = ${nm(sp)}$; discount $= 2000 - ${nm(sp)} = ${nm(rs(2000) - sp)}$; rate $= \dfrac{${nm(rs(2000) - sp)}}{2000} \times 100 = ${d}$.`, scheme: [[`Discount = ${d}%`, 1]], d: 3, c: 'application', t: [2, 4], time: 150 }),
    (C) => C.val(((2000 - (1932 * 100) / 105) / 2000) * 100, 1e-9));
}
{
  const g = profitPct(rs(2400), rs(3000)), c = chain([rs(2400), rs(3000)], 12);
  Q('n08', mk.num({ stem: `A dealer buys a smartwatch for ${R(rs(2400))} plus GST at 12% and sells it for ${R(rs(3000))} plus GST at 12%. GST passes through the dealer's hands to the government. Find the dealer's profit percent.`, value: g, unit: '%', sol: r`GST collected is passed on (net ${R(c.stages[1].pay)} paid), so profit is on prices before tax: $\dfrac{3000 - 2400}{2400} \times 100 = ${g}$.`, scheme: [[`Profit = ${g}%`, 1]], d: 2, c: 'understanding', t: [3], time: 90 }),
    (C) => C.val(((3000 - 2400) / 2400) * 100));
}

// =============================================================== short answer, 2 marks (5)
{
  const s = sale(rs(2850), 18);
  Q('s201', mk.short({ marks: 2, stem: `A ceiling fan priced at ${R(s.price)} is sold by a shop in Varanasi to a customer in Varanasi. GST is 18%. Find the CGST, the SGST and the total amount on the bill.`, model: r`Intra-state sale: CGST $= \text{SGST} = 9\% \text{ of } 2850 = \dfrac{9}{100} \times 2850 = ${nm(s.cgst)}$.\n\nAmount $= 2850 + ${nm(s.cgst)} + ${nm(s.sgst)} = ${nm(s.amount)}$, that is ${R(s.amount)}.`, sol: 'Half the rate for each of CGST and SGST; add both to the price.', scheme: [[`CGST = SGST = ${nm(s.cgst)}`, 1], [`Amount ${nm(s.amount)}`, 1]], d: 1, c: 'understanding', t: [1], time: 150 }),
    (C) => { C.assert(s.cgst === s.sgst, 'equal'); C.model([2850 * 0.09, 2850 * 1.18]); });
}
{
  const p = rs(45000), i = sale(p, 18, { inter: true }), a = sale(p, 18);
  Q('s202', mk.short({ marks: 2, stem: `A software firm in Bengaluru (Karnataka) charges ${R(p)} for building a website. GST on the service is 18%. Write the tax on the invoice (i) if the client is in Hyderabad (Telangana); (ii) if the client is in Mysuru (Karnataka). Compare the amounts the two clients pay.`, model: r`(i) Inter-state: IGST $= \dfrac{18}{100} \times 45000 = ${nm(i.igst)}$; amount ${R(i.amount)}.\n\n(ii) Intra-state: CGST $= ${nm(a.cgst)}$ and SGST $= ${nm(a.sgst)}$; amount ${R(a.amount)}.\n\nBoth clients pay the same amount; only the way the tax is shared between governments differs.`, sol: 'Same rate, different heads of tax depending on where the client is.', scheme: [[`(i) IGST ${nm(i.igst)}`, 1], [`(ii) CGST = SGST = ${nm(a.cgst)}; amounts equal`, 1]], d: 2, c: 'application', t: [1], time: 150 }),
    (C) => { C.assert(i.amount === a.amount && i.igst === a.cgst + a.sgst, 'same total'); C.model([45000 * 0.18, 45000 * 0.09, 45000 * 1.18]); });
}
{
  const b = bill(rs(1480), 5, 12);
  Q('s203', mk.short({ marks: 2, stem: `A school uniform set is listed at ${R(b.list)}. The shop gives a discount of 5% and charges GST at 12% on the reduced price. Find the amount the customer pays.`, model: r`Discount $= \dfrac{5}{100} \times 1480 = ${nm(b.off)}$; reduced price $= ${nm(b.sp)}$.\n\nGST $= \dfrac{12}{100} \times ${nm(b.sp)} = ${nm(b.gst)}$; amount $= ${nm(b.sp)} + ${nm(b.gst)} = ${nm(b.amount)}$.`, sol: 'Discount first, then tax on the reduced price.', scheme: [[`Reduced price ${nm(b.sp)}`, 1], [`Amount ${nm(b.amount)}`, 1]], d: 2, c: 'understanding', t: [2], time: 150 }),
    (C) => C.model([1480 * 0.95, 1480 * 0.95 * 0.12, 1480 * 0.95 * 1.12]));
}
{
  const c = chain([rs(2400), rs(3000)], 18), w = c.stages[1];
  Q('s204', mk.short({ marks: 2, stem: `A retailer in Thrissur buys an induction cooktop for ${R(rs(2400))} from a wholesaler in Kochi and sells it to a customer in Thrissur for ${R(rs(3000))}, both before tax. GST is 18%. Find the input tax, the output tax and the CGST and SGST the retailer pays.`, model: r`Input tax $= \dfrac{18}{100} \times 2400 = ${nm(w.input.gst)}$; output tax $= \dfrac{18}{100} \times 3000 = ${nm(w.out.gst)}$.\n\nNet GST $= ${nm(w.out.gst)} - ${nm(w.input.gst)} = ${nm(w.pay)}$: CGST ${R(w.cgstPay)} and SGST ${R(w.sgstPay)}.`, sol: 'Output minus input, then halve.', scheme: [['Input and output tax', 1], [`CGST = SGST = ${nm(w.cgstPay)}`, 1]], d: 2, c: 'understanding', t: [3], time: 150 }),
    (C) => C.model([2400 * 0.18, 3000 * 0.18, 600 * 0.18, 600 * 0.09]));
}
{
  const a = rs(1416), b = baseFrom(a, 18), s = sale(b, 18);
  Q('s205', mk.short({ marks: 2, stem: `Kavya pays ${R(a)} for a pair of headphones bought in her own city, including GST at 18%. Find the price before GST and the CGST on the bill.`, model: r`Let the price be ₹$x$. Then $x + \dfrac{18}{100}x = 1416$, so $1.18x = 1416$ and $x = ${nm(b)}$.\n\nCGST $= 9\% \text{ of } ${nm(b)} = ${nm(s.cgst)}$.`, sol: 'Divide by 1.18, then take 9% for the central half.', scheme: [[`Price ${nm(b)}`, 1], [`CGST ${nm(s.cgst)}`, 1]], d: 2, c: 'application', t: [4], time: 150 }),
    (C) => C.model([1416 / 1.18, (1416 / 1.18) * 0.09]));
}

// =============================================================== short answer, 3 marks (5)
const kitRows = [['Cricket bat', rs(2600), 12], ['Sports shoes', rs(3200), 18], ['Steel water bottle', rs(450), 18]];
const kit = invoice(kitRows.map(([, p, g]) => [p, g]));
const kitTable = table(['Item', 'Price (₹)', 'GST rate'], kitRows.map(([n, p, g]) => [n, inr0(p), `${g}%`]), 'Table of a sports-shop bill: a cricket bat at 2,600 rupees taxed at 12 percent, sports shoes at 3,200 rupees taxed at 18 percent and a steel water bottle at 450 rupees taxed at 18 percent.', 'Items on the bill, before tax.');
Q('s301', mk.short({ marks: 3, stem: 'A sports shop in Bhopal sells the items in the table to a customer in Bhopal. Each item is taxed at the GST rate shown. Find the total CGST, the total SGST and the amount of the bill.', assets: [kitTable], model: r`GST: bat $\dfrac{12}{100} \times 2600 = ${nm(kit.rows[0].gst)}$; shoes $\dfrac{18}{100} \times 3200 = ${nm(kit.rows[1].gst)}$; bottle $\dfrac{18}{100} \times 450 = ${nm(kit.rows[2].gst)}$.\n\nTotal GST $= ${nm(kit.rows[0].gst)} + ${nm(kit.rows[1].gst)} + ${nm(kit.rows[2].gst)} = ${nm(kit.gst)}$, so CGST $= \text{SGST} = ${nm(kit.cgst)}$.\n\nAmount $= ${nm(kit.price)} + ${nm(kit.gst)} = ${nm(kit.amount)}$, that is ${R(kit.amount)}.`, sol: 'Tax each line at its own rate, add, then halve.', scheme: [['GST on each item', 1], [`CGST = SGST = ${nm(kit.cgst)}`, 1], [`Bill ${nm(kit.amount)}`, 1]], d: 2, c: 'application', t: [1], time: 240 }),
  (C) => { C.assert(kit.cgst === kit.sgst, 'equal halves'); C.model([2600 * 0.12, 3200 * 0.18, 450 * 0.18, (2600 * 0.12 + 3650 * 0.18) / 2, 6250 + 2600 * 0.12 + 3650 * 0.18]); });
{
  const b = bill(rs(26500), 8, 28);
  Q('s302', mk.short({ marks: 3, stem: `A two-door refrigerator is listed at ${R(b.list)}. A dealer in Indore gives a discount of 8% and charges GST at 28% on the reduced price to a customer in Indore. Find (i) the price after discount; (ii) the CGST; (iii) the amount the customer pays.`, model: r`(i) Discount $= \dfrac{8}{100} \times 26500 = ${nm(b.off)}$; price $= ${nm(b.sp)}$.\n\n(ii) CGST $= 14\% \text{ of } ${nm(b.sp)} = ${nm(b.cgst)}$ (SGST the same).\n\n(iii) Amount $= ${nm(b.sp)} + 2 \times ${nm(b.cgst)} = ${nm(b.amount)}$.`, sol: 'Reduce first; then 14% each for CGST and SGST.', scheme: [[`(i) ${nm(b.sp)}`, 1], [`(ii) ${nm(b.cgst)}`, 1], [`(iii) ${nm(b.amount)}`, 1]], d: 3, c: 'application', t: [2], time: 240 }),
    (C) => C.model([26500 * 0.92, 26500 * 0.92 * 0.14, 26500 * 0.92 * 1.28]));
}
{
  const c = chain([rs(12000), rs(13800)], 12), [m, w] = c.stages;
  Q('s303', mk.short({ marks: 3, stem: `A manufacturer in Nashik sells a lot of copper water jugs to a wholesaler in Pune (both in Maharashtra) for ${R(rs(12000))}. The wholesaler sells the lot to a retailer in Mumbai for ${R(rs(13800))}. GST is 12%. Find the GST paid to the government by the manufacturer and by the wholesaler, and show the wholesaler's payment as CGST and SGST.`, model: r`Manufacturer: $\dfrac{12}{100} \times 12000 = ${nm(m.pay)}$ (no input tax).\n\nWholesaler: output $\dfrac{12}{100} \times 13800 = ${nm(w.out.gst)}$; input $= ${nm(w.input.gst)}$; net $= ${nm(w.out.gst)} - ${nm(w.input.gst)} = ${nm(w.pay)}$.\n\nWholesaler's CGST $= \text{SGST} = ${nm(w.cgstPay)}$.`, sol: 'First seller pays the full tax; later sellers pay output minus input.', scheme: [[`Manufacturer ${nm(m.pay)}`, 1], [`Wholesaler ${nm(w.pay)}`, 1], [`CGST = SGST = ${nm(w.cgstPay)}`, 1]], d: 2, c: 'application', t: [3], time: 240 }),
    (C) => { C.assert(w.cgstPay === w.sgstPay, 'equal'); C.model([12000 * 0.12, 13800 * 0.12, 1800 * 0.12, 1800 * 0.06]); });
}
{
  const a = rs(9027), sp = baseFrom(a, 18), l = listFrom(sp, 15);
  Q('s304', mk.short({ marks: 3, stem: `During a sale, a customer pays ${R(a)} for a tablet computer. The shop allowed a discount of 15% on the list price and then charged GST at 18%. Find the list price.`, model: r`Let the price after discount be ₹$y$: $1.18y = 9027$, so $y = ${nm(sp)}$.\n\nLet the list price be ₹$x$: $x - \dfrac{15}{100}x = ${nm(sp)}$, so $0.85x = ${nm(sp)}$ and $x = ${nm(l)}$.\n\nCheck: $${nm(l)} \times 0.85 \times 1.18 = ${nm(a)}$.`, sol: 'Undo the tax, then undo the discount: divide by 1.18 and then by 0.85.', scheme: [[`Reduced price ${nm(sp)}`, 1], ['Equation 0.85x = reduced price', 1], [`List price ${nm(l)}`, 1]], d: 3, c: 'application', t: [4], time: 240 }),
    (C) => C.model([9027 / 1.18, 9027 / 1.18 / 0.85]));
}
{
  const sp = withProfit(rs(5500), -4), c = chain([rs(5500), sp], 18), w = c.stages[1];
  Q('s305', mk.short({ marks: 3, stem: `A dealer in Ajmer bought a stock of LED panels for ${R(rs(5500))} (before GST) and, when the model went out of fashion, sold it in Ajmer at a loss of 4%. GST is 18% on both sales. Find the selling price, the output tax and the net GST position of the dealer on this stock.`, model: r`Selling price $= 5500 - \dfrac{4}{100} \times 5500 = ${nm(sp)}$.\n\nOutput tax $= \dfrac{18}{100} \times ${nm(sp)} = ${nm(w.out.gst)}$; input tax $= \dfrac{18}{100} \times 5500 = ${nm(w.input.gst)}$.\n\nNet $= ${nm(w.out.gst)} - ${nm(w.input.gst)} = ${nm(w.pay)}$: negative, so the dealer pays nothing on this stock and ${R(-w.pay)} remains as input tax credit for later sales.`, sol: 'A sale below cost gives output tax less than input tax.', scheme: [[`Selling price ${nm(sp)}`, 1], ['Output and input tax', 1], [`Credit of ${nm(-w.pay)}, nothing payable`, 1]], d: 3, c: 'analysis', t: [3], time: 240 }),
    (C) => { C.assert(w.pay < 0, 'credit'); C.model([5500 * 0.96, 5500 * 0.96 * 0.18, 5500 * 0.18, 5500 * 0.18 - 5500 * 0.96 * 0.18]); });
}

// =============================================================== short answer, 4 marks (6)
{
  const X = bill(rs(48000), 12, 18), Y = bill(rs(46500), 9, 18);
  Q('s401', mk.short({ marks: 4, stem: `Two online sellers in Delhi quote for the same digital piano for a customer in Delhi. Seller X lists it at ${R(X.list)} with a discount of 12%; seller Y lists it at ${R(Y.list)} with a discount of 9%. Both charge GST at 18% on the reduced price. Which is the better offer, and by how much?`, model: r`Seller X: reduced price $= 48000 \times \dfrac{88}{100} = ${nm(X.sp)}$; GST $= ${nm(X.gst)}$; amount $= ${nm(X.amount)}$.\n\nSeller Y: reduced price $= 46500 \times \dfrac{91}{100} = ${nm(Y.sp)}$; GST $= ${nm(Y.gst)}$; amount $= ${nm(Y.amount)}$.\n\nSeller X is cheaper by $${nm(Y.amount)} - ${nm(X.amount)} = ${nm(Y.amount - X.amount)}$ rupees, even though its list price is higher.`, sol: 'Compare final amounts, not list prices or discount rates.', scheme: [[`X: reduced price ${nm(X.sp)}`, 1], [`X: amount ${nm(X.amount)}`, 1], [`Y: amount ${nm(Y.amount)}`, 1], [`X cheaper by ${nm(Y.amount - X.amount)}`, 1]], d: 3, c: 'analysis', t: [2], time: 300 }),
    (C) => { C.assert(X.amount < Y.amount, 'X cheaper'); C.model([48000 * 0.88 * 1.18, 46500 * 0.91 * 1.18, (46500 * 0.91 - 48000 * 0.88) * 1.18]); });
}
{
  const p1 = rs(16000), p2 = withProfit(p1, 20), p3 = withProfit(p2, 12.5), c = chain([p1, p2, p3], 5), [m, w, t] = c.stages;
  Q('s402', mk.short({ marks: 4, stem: `Within Bihar, a manufacturer of bamboo furniture sells a set to a wholesaler for ${R(p1)}. The wholesaler sells it to a retailer at a profit of 20%, and the retailer sells it to a customer at a profit of 12.5%. GST is 5% at each stage. Find the GST paid to the government by each of the three dealers, and show that the total equals the GST paid by the customer.`, model: r`Prices: wholesaler sells at $16000 \times 1.2 = ${nm(p2)}$; retailer sells at $${nm(p2)} \times 1.125 = ${nm(p3)}$.\n\nManufacturer pays $\dfrac{5}{100} \times 16000 = ${nm(m.pay)}$.\n\nWholesaler pays $${nm(w.out.gst)} - ${nm(w.input.gst)} = ${nm(w.pay)}$; retailer pays $${nm(t.out.gst)} - ${nm(t.input.gst)} = ${nm(t.pay)}$.\n\nTotal $= ${nm(m.pay)} + ${nm(w.pay)} + ${nm(t.pay)} = ${nm(c.total)}$, and the customer pays GST $= \dfrac{5}{100} \times ${nm(p3)} = ${nm(c.consumerTax)}$. They are equal.`, sol: 'Find each selling price, then output minus input at each stage.', scheme: [['Selling prices of wholesaler and retailer', 1], [`Manufacturer ${nm(m.pay)}`, 1], [`Wholesaler ${nm(w.pay)} and retailer ${nm(t.pay)}`, 1], [`Total ${nm(c.total)} = customer's GST`, 1]], d: 3, c: 'application', t: [3], time: 300 }),
    (C) => C.model([16000 * 1.2, 16000 * 1.2 * 1.125, 800, 3200 * 0.05, 2400 * 0.05, 21600 * 0.05]));
}
{
  const c = chain([rs(25000), rs(28500)], 12, [false, true]), [m, d] = c.stages;
  Q('s403', mk.short({ marks: 4, stem: `A distributor in Surat (Gujarat) buys textile printing ink from a maker in Surat for ${R(rs(25000))} and sells it to a printer in Nashik (Maharashtra) for ${R(rs(28500))}. GST is 12% on both sales. Find (i) the tax the distributor pays on the purchase, under each head; (ii) the tax charged on the sale to Nashik; (iii) the GST the distributor pays to the government.`, model: r`(i) Intra-state purchase: CGST $= 6\% \text{ of } 25000 = ${nm(m.out.cgst)}$ and SGST $= ${nm(m.out.sgst)}$, total input tax ${R(m.out.gst)}.\n\n(ii) Inter-state sale: IGST $= \dfrac{12}{100} \times 28500 = ${nm(d.out.igst)}$.\n\n(iii) The input CGST and SGST are set off against the output IGST: IGST payable $= ${nm(d.out.igst)} - ${nm(m.out.gst)} = ${nm(d.igstPay)}$.`, sol: 'Input under two heads, output under IGST; both input heads can be used against IGST.', scheme: [[`(i) CGST = SGST = ${nm(m.out.cgst)}`, 1], [`(ii) IGST ${nm(d.out.igst)}`, 1], ['(iii) set-off of input tax', 1], [`IGST payable ${nm(d.igstPay)}`, 1]], d: 3, c: 'application', t: [1, 3], time: 300 }),
    (C) => { C.assert(d.igstPay === d.pay && c.total === c.consumerTax, 'set-off'); C.model([25000 * 0.06, 28500 * 0.12, 3500 * 0.12]); });
}
{
  const sp = disc(rs(6000), 15).sp, g = rateFrom(sp, rs(5712)), s = sale(sp, g);
  Q('s404', mk.short({ marks: 4, stem: `An office chair is listed at ${R(rs(6000))}. A shop in Raipur gives a discount of 15%, and a customer in Raipur pays ${R(rs(5712))} including GST. Find the rate of GST and the CGST on the bill.`, model: r`Price after discount $= 6000 - \dfrac{15}{100} \times 6000 = ${nm(sp)}$.\n\nGST $= 5712 - ${nm(sp)} = ${nm(s.gst)}$, so rate $= \dfrac{${nm(s.gst)}}{${nm(sp)}} \times 100 = ${g}$ percent.\n\nCGST is charged at $${g / 2}\%$: $\dfrac{${g / 2}}{100} \times ${nm(sp)} = ${nm(s.cgst)}$.`, sol: 'GST is the amount paid minus the reduced price; divide by the reduced price.', scheme: [[`Reduced price ${nm(sp)}`, 1], [`GST ${nm(s.gst)}`, 1], [`Rate ${g}%`, 1], [`CGST ${nm(s.cgst)}`, 1]], d: 3, c: 'application', t: [4], time: 300 }),
    (C) => { const r0 = ((5712 - 5100) / 5100) * 100; C.model([5100, 612, r0, 5100 * r0 / 200]); });
}
{
  const sp = baseFrom(rs(17664), 28), d = discFrom(rs(15000), sp), s = sale(sp, 28);
  Q('s405', mk.short({ marks: 4, stem: `A dishwasher is listed at ${R(rs(15000))}. GST at 28% is charged on the price after discount, and a customer pays ${R(rs(17664))}. Find the rate of discount and the CGST paid by the customer.`, model: r`Let the price after discount be ₹$y$: $y \times \dfrac{128}{100} = 17664$, so $y = ${nm(sp)}$.\n\nDiscount $= 15000 - ${nm(sp)} = ${nm(rs(15000) - sp)}$; rate $= \dfrac{${nm(rs(15000) - sp)}}{15000} \times 100 = ${d}$ percent.\n\nCGST $= 14\% \text{ of } ${nm(sp)} = ${nm(s.cgst)}$.`, sol: 'Undo the tax first; the discount rate is on the list price.', scheme: [[`Price after discount ${nm(sp)}`, 1], [`Discount ${nm(rs(15000) - sp)}`, 1], [`Rate ${d}%`, 1], [`CGST ${nm(s.cgst)}`, 1]], d: 4, c: 'analysis', t: [4], time: 300 }),
    (C) => C.model([17664 / 1.28, 15000 - 17664 / 1.28, ((15000 - 17664 / 1.28) / 15000) * 100, (17664 / 1.28) * 0.14]));
}
{
  const cost = rs(7500), mp = withProfit(cost, 20), sp = disc(mp, 5).sp, c = chain([cost, sp], 12), w = c.stages[1], g = profitPct(cost, sp);
  Q('s406', mk.short({ marks: 4, stem: `A retailer in Agra buys a marble chessboard for ${R(cost)} (before GST, at 12%). He marks it 20% above his cost price, gives a customer in Agra a discount of 5% on the marked price and charges GST at 12%. Find (i) the selling price; (ii) the GST he pays to the government; (iii) the amount the customer pays; (iv) his profit percent.`, model: r`(i) Marked price $= 7500 \times 1.2 = ${nm(mp)}$; selling price $= ${nm(mp)} \times 0.95 = ${nm(sp)}$.\n\n(ii) Output tax $= \dfrac{12}{100} \times ${nm(sp)} = ${nm(w.out.gst)}$; input tax $= ${nm(w.input.gst)}$; GST paid $= ${nm(w.pay)}$.\n\n(iii) Customer pays $${nm(sp)} + ${nm(w.out.gst)} = ${nm(w.out.amount)}$.\n\n(iv) Profit $= ${nm(sp)} - 7500 = ${nm(sp - cost)}$, that is $\dfrac{${nm(sp - cost)}}{7500} \times 100 = ${g}$ percent (GST is not part of the profit).`, sol: 'Marked price, then discount; tax on the selling price; profit on prices before tax.', scheme: [[`(i) ${nm(sp)}`, 1], [`(ii) ${nm(w.pay)}`, 1], [`(iii) ${nm(w.out.amount)}`, 1], [`(iv) ${g}%`, 1]], d: 3, c: 'application', t: [2, 3], time: 300 }),
    (C) => C.model([7500 * 1.2 * 0.95, 7500 * 1.2 * 0.95 * 0.12 - 900, 7500 * 1.2 * 0.95 * 1.12, ((7500 * 1.2 * 0.95 - 7500) / 7500) * 100]));
}

// =============================================================== long answer, 10 marks (7), parts (a)(b)(c) = 3 + 3 + 4
{
  const inv = invoice([[rs(4200), 18], [rs(480), 12]]);
  const tv = bill(rs(32000), 12.5, 28);
  const a = rs(2832), sp = baseFrom(a, 18), l = listFrom(sp, 20), s = sale(sp, 18);
  Q('l01', mk.long({ marks: 10, stem: r`An electronics store in Kochi sells only to customers in Kerala.\n\n(a) A customer buys a mixer-grinder priced at ${R(rs(4200))} (GST 18%) and a pack of LED bulbs priced at ${R(rs(480))} (GST 12%). Find the CGST, the SGST and the total bill. [3]\n\n(b) A television listed at ${R(tv.list)} is sold at a discount of 12.5% with GST at 28% on the reduced price. Find the amount the customer pays. [3]\n\n(c) Another customer pays ${R(a)} for a microwave oven after a discount of 20% on its list price and GST at 18% on the reduced price. Find the list price of the oven and the CGST on this bill. [4]`, model: r`**(a)** GST: $\dfrac{18}{100} \times 4200 = ${nm(inv.rows[0].gst)}$ and $\dfrac{12}{100} \times 480 = ${nm(inv.rows[1].gst)}$; total ${R(inv.gst)}.\n\nCGST $= \text{SGST} = ${nm(inv.cgst)}$; bill $= 4680 + ${nm(inv.gst)} = ${nm(inv.amount)}$.\n\n**(b)** Discount $= \dfrac{12.5}{100} \times 32000 = ${nm(tv.off)}$; reduced price $= ${nm(tv.sp)}$.\n\nGST $= \dfrac{28}{100} \times ${nm(tv.sp)} = ${nm(tv.gst)}$; amount $= ${nm(tv.amount)}$.\n\n**(c)** Let the reduced price be ₹$y$: $1.18y = 2832$, so $y = ${nm(sp)}$.\n\nLet the list price be ₹$x$: $0.8x = ${nm(sp)}$, so $x = ${nm(l)}$.\n\nCGST $= 9\% \text{ of } ${nm(sp)} = ${nm(s.cgst)}$.`, sol: 'Line-by-line tax; discount before tax; undo tax then discount for the reverse part.', scheme: [['(a) GST on each item and the total', 1], [`(a) CGST = SGST = ${nm(inv.cgst)}; bill ${nm(inv.amount)}`, 2], [`(b) reduced price ${nm(tv.sp)}`, 1], [`(b) GST ${nm(tv.gst)}; amount ${nm(tv.amount)}`, 2], [`(c) reduced price ${nm(sp)}`, 2], [`(c) list price ${nm(l)}`, 1], [`(c) CGST ${nm(s.cgst)}`, 1]], d: 3, c: 'application', t: [1, 2, 4], time: 600 }),
    (C) => { C.assert(inv.cgst === inv.sgst, 'halves'); C.model([4200 * 0.18, 480 * 0.12, (4200 * 0.18 + 480 * 0.12) / 2, 4680 + 4200 * 0.18 + 480 * 0.12, 32000 * 0.875, 32000 * 0.875 * 1.28, 2832 / 1.18, 2832 / 1.18 / 0.8, (2832 / 1.18) * 0.09]); });
}
{
  const p1 = rs(6000), p2 = withProfit(p1, 15), p3 = withProfit(p2, 20), c = chain([p1, p2, p3], 12), [m, w, t] = c.stages;
  Q('l02', mk.long({ marks: 10, stem: r`A craft unit in Jodhpur sells a batch of brass lamps to a wholesaler in Jodhpur for ${R(p1)}. The wholesaler sells the batch to a retailer in Udaipur at a profit of 15%, and the retailer sells it to a customer in Udaipur at a profit of 20%. All three places are in Rajasthan, and GST is 12% at every sale.\n\n(a) Find the selling prices of the wholesaler and the retailer, and the GST charged at each of the three sales. [3]\n\n(b) Find the GST paid to the government by the wholesaler and by the retailer, each split into CGST and SGST. [3]\n\n(c) Find the total GST received by the government from the chain and the amount the customer pays. Explain why the total equals the GST on the last sale. [4]`, model: r`**(a)** Wholesaler's price $= 6000 \times 1.15 = ${nm(p2)}$; retailer's price $= ${nm(p2)} \times 1.2 = ${nm(p3)}$.\n\nGST charged: $\dfrac{12}{100} \times 6000 = ${nm(m.out.gst)}$; $\dfrac{12}{100} \times ${nm(p2)} = ${nm(w.out.gst)}$; $\dfrac{12}{100} \times ${nm(p3)} = ${nm(t.out.gst)}$.\n\n**(b)** Wholesaler: $${nm(w.out.gst)} - ${nm(w.input.gst)} = ${nm(w.pay)}$, that is CGST ${R(w.cgstPay)} and SGST ${R(w.sgstPay)}.\n\nRetailer: $${nm(t.out.gst)} - ${nm(t.input.gst)} = ${nm(t.pay)}$, that is CGST ${R(t.cgstPay)} and SGST ${R(t.sgstPay)}.\n\n**(c)** Total $= ${nm(m.pay)} + ${nm(w.pay)} + ${nm(t.pay)} = ${nm(c.total)}$.\n\nCustomer pays $${nm(p3)} + ${nm(t.out.gst)} = ${nm(c.consumerPays)}$.\n\nEach dealer pays its output tax minus its input tax, and each input tax is the previous seller's output tax, so in the sum every tax except the last one cancels. The total is the tax on the final sale, ${R(c.consumerTax)}, borne by the customer.`, sol: 'Prices by profit percent; output minus input at each stage; the sum telescopes.', scheme: [['(a) selling prices', 1], ['(a) GST at the three sales', 2], [`(b) wholesaler ${nm(w.pay)}`, 1], [`(b) retailer ${nm(t.pay)}`, 1], ['(b) each split equally into CGST and SGST', 1], [`(c) total ${nm(c.total)}`, 1], [`(c) customer pays ${nm(c.consumerPays)}`, 1], ['(c) reason: input taxes cancel', 2]], d: 3, c: 'application', t: [3], time: 600 }),
    (C) => C.model([6900, 8280, 720, 828, 993.6, 108, 54, 165.6, 82.8, 8280 * 1.12]));
}
{
  const c = chain([rs(50000), rs(56000), rs(62500)], 18, [false, true, false]), [a, b, cc] = c.stages;
  Q('l03', mk.long({ marks: 10, stem: r`A machine-tool maker A in Howrah (West Bengal) sells a lathe to dealer B in Kolkata (West Bengal) for ${R(rs(50000))}. Dealer B sells it to dealer C in Ranchi (Jharkhand) for ${R(rs(56000))}, and C sells it to a workshop owner in Ranchi for ${R(rs(62500))}. GST is 18% throughout.\n\n(a) Find the tax charged by A on the sale to B, under each head. [3]\n\n(b) Find the tax charged by B on the sale to C, and the tax B pays to the government. [3]\n\n(c) Find the tax charged by C to the workshop owner, the net tax C pays, and show that the total tax received by the governments equals the tax paid by the workshop owner. [4]`, model: r`**(a)** A to B is intra-state: CGST $= 9\% \text{ of } 50000 = ${nm(a.out.cgst)}$ and SGST $= ${nm(a.out.sgst)}$; A pays ${R(a.pay)} in all.\n\n**(b)** B to C is inter-state: IGST $= \dfrac{18}{100} \times 56000 = ${nm(b.out.igst)}$.\n\nB's input tax (CGST + SGST) is ${R(b.input.gst)}, set off against the IGST: B pays $${nm(b.out.igst)} - ${nm(b.input.gst)} = ${nm(b.pay)}$ as IGST.\n\n**(c)** C to the workshop is intra-state: CGST $= \text{SGST} = 9\% \text{ of } 62500 = ${nm(cc.out.cgst)}$, total ${R(cc.out.gst)}.\n\nC's input tax is the IGST of ${R(cc.input.gst)}, set off against its CGST and SGST: C pays $${nm(cc.out.gst)} - ${nm(cc.input.gst)} = ${nm(cc.pay)}$.\n\nTotal received $= ${nm(a.pay)} + ${nm(b.pay)} + ${nm(cc.pay)} = ${nm(c.total)}$, which is the tax paid by the workshop owner, ${R(c.consumerTax)}.`, sol: 'Decide intra- or inter-state at every sale; input credit of any head is set off before paying.', scheme: [[`(a) CGST = SGST = ${nm(a.out.cgst)}`, 3], [`(b) IGST ${nm(b.out.igst)}`, 1], [`(b) B pays ${nm(b.pay)}`, 2], [`(c) tax charged ${nm(cc.out.gst)}`, 1], [`(c) C pays ${nm(cc.pay)}`, 1], [`(c) total ${nm(c.total)} = tax paid by the owner`, 2]], d: 4, c: 'analysis', t: [1, 3], time: 600 }),
    (C) => { C.assert(b.igstPay === b.pay, 'B pays IGST'); C.model([4500, 56000 * 0.18, 56000 * 0.18 - 9000, 62500 * 0.09, 62500 * 0.18, 62500 * 0.18 - 56000 * 0.18, 62500 * 0.18]); });
}
{
  const a1 = rs(10620), b1 = baseFrom(a1, 18), s1 = sale(b1, 18);
  const g = rateFrom(rs(2750), rs(3080));
  const sp = baseFrom(rs(5443.2), 12), d = discFrom(rs(5400), sp);
  Q('l04', mk.long({ marks: 10, stem: r`Answer the following about bills at a furniture showroom in Bhubaneswar, where all customers are local.\n\n(a) A customer pays ${R(a1)} for a dining table, including GST at 18%. Find the price before GST and the CGST on the bill. [3]\n\n(b) A shoe rack is priced at ${R(rs(2750))} after a discount, and the customer pays ${R(rs(3080))}. Find the rate of GST. [3]\n\n(c) A bookshelf is listed at ${R(rs(5400))}. GST at 12% is charged on the price after discount, and the customer pays ${R(rs(5443.2))}. Find the rate of discount. [4]`, model: r`**(a)** Let the price be ₹$x$: $1.18x = 10620$, so $x = ${nm(b1)}$. CGST $= 9\% \text{ of } ${nm(b1)} = ${nm(s1.cgst)}$.\n\n**(b)** GST $= 3080 - 2750 = 330$; rate $= \dfrac{330}{2750} \times 100 = ${g}$ percent.\n\n**(c)** Price after discount: $1.12y = 5443.20$, so $y = ${nm(sp)}$.\n\nDiscount $= 5400 - ${nm(sp)} = ${nm(rs(5400) - sp)}$; rate $= \dfrac{${nm(rs(5400) - sp)}}{5400} \times 100 = ${d}$ percent.`, sol: 'Divide by (1 + rate) to undo tax; rate = tax ÷ price; discount rate on the list price.', scheme: [[`(a) price ${nm(b1)}`, 2], [`(a) CGST ${nm(s1.cgst)}`, 1], ['(b) GST 330', 1], [`(b) rate ${g}%`, 2], [`(c) price after discount ${nm(sp)}`, 2], [`(c) discount ${nm(rs(5400) - sp)}`, 1], [`(c) rate ${d}%`, 1]], d: 3, c: 'application', t: [4], time: 600 }),
    (C) => C.model([10620 / 1.18, (10620 / 1.18) * 0.09, 330, (330 / 2750) * 100, 5443.2 / 1.12, 5400 - 5443.2 / 1.12, ((5400 - 5443.2 / 1.12) / 5400) * 100]));
}
{
  const cost = rs(6000), mp = withProfit(cost, 30), sp = disc(mp, 10).sp, c = chain([cost, sp], 12), w = c.stages[1], g = profitPct(cost, sp);
  Q('l05', mk.long({ marks: 10, stem: r`A cycle dealer in Patna buys a geared bicycle from a distributor in Patna for ${R(cost)}, paying GST at 12% on it. He marks the bicycle 30% above his cost, gives a customer in Patna a discount of 10% on the marked price, and charges GST at 12%.\n\n(a) Find the marked price, the selling price and the dealer's profit percent. [3]\n\n(b) Find the GST charged to the customer and the amount the customer pays. [3]\n\n(c) Find the GST the dealer paid on his purchase, and the CGST and SGST he pays to the government on this sale. [4]`, model: r`**(a)** Marked price $= 6000 \times 1.3 = ${nm(mp)}$; selling price $= ${nm(mp)} \times 0.9 = ${nm(sp)}$.\n\nProfit $= ${nm(sp)} - 6000 = ${nm(sp - cost)}$, that is $\dfrac{${nm(sp - cost)}}{6000} \times 100 = ${g}$ percent.\n\n**(b)** GST $= \dfrac{12}{100} \times ${nm(sp)} = ${nm(w.out.gst)}$; amount $= ${nm(sp)} + ${nm(w.out.gst)} = ${nm(w.out.amount)}$.\n\n**(c)** Input tax $= \dfrac{12}{100} \times 6000 = ${nm(w.input.gst)}$.\n\nNet GST $= ${nm(w.out.gst)} - ${nm(w.input.gst)} = ${nm(w.pay)}$, paid as CGST ${R(w.cgstPay)} and SGST ${R(w.sgstPay)}.`, sol: 'Marked price → discount → selling price; tax on the selling price; net tax by input credit.', scheme: [['(a) marked and selling price', 2], [`(a) profit ${g}%`, 1], [`(b) GST ${nm(w.out.gst)}`, 2], [`(b) amount ${nm(w.out.amount)}`, 1], [`(c) input tax ${nm(w.input.gst)}`, 1], [`(c) net ${nm(w.pay)}`, 2], [`(c) CGST = SGST = ${nm(w.cgstPay)}`, 1]], d: 3, c: 'application', t: [2, 3], time: 600 }),
    (C) => C.model([7800, 7020, 17, 7020 * 0.12, 7020 * 1.12, 720, 7020 * 0.12 - 720, (7020 * 0.12 - 720) / 2]));
}
{
  const cat = sale(rs(84000), 5), hall = sale(rs(36000), 18), tot = cat.amount + hall.amount;
  const paid = rs(102900), base = baseFrom(paid, 5), plates = base / rs(350), s3 = sale(base, 5);
  Q('l06', mk.long({ marks: 10, stem: r`GST applies to services as well as goods. An events company in Chennai serves only clients in Tamil Nadu. It charges GST at 5% on catering and at 18% on hall rent.\n\n(a) For a wedding reception, the catering bill is ${R(rs(84000))} before tax. Find the CGST, the SGST and the amount of the catering bill. [3]\n\n(b) The same client also pays hall rent of ${R(rs(36000))} before tax. Find the GST on the rent and the total amount the client pays for catering and rent together. [3]\n\n(c) For another function, a client pays ${R(paid)} for catering only, including GST. The catering is charged at ${R(rs(350))} per plate before tax. Find the price before GST, the number of plates served and the CGST on the bill. [4]`, model: r`**(a)** CGST $= \text{SGST} = 2.5\% \text{ of } 84000 = ${nm(cat.cgst)}$; amount $= 84000 + ${nm(cat.gst)} = ${nm(cat.amount)}$.\n\n**(b)** GST on rent $= \dfrac{18}{100} \times 36000 = ${nm(hall.gst)}$ (CGST and SGST ${R(hall.cgst)} each).\n\nTotal $= ${nm(cat.amount)} + ${nm(hall.amount)} = ${nm(tot)}$, that is ${R(tot)}.\n\n**(c)** Price $= 102900 \times \dfrac{100}{105} = ${nm(base)}$.\n\nPlates $= \dfrac{${nm(base)}}{350} = ${plates}$.\n\nCGST $= 2.5\% \text{ of } ${nm(base)} = ${nm(s3.cgst)}$.`, sol: 'Services are taxed exactly like goods; undo the 5% tax before dividing by the plate rate.', scheme: [[`(a) CGST = SGST = ${nm(cat.cgst)}`, 2], [`(a) amount ${nm(cat.amount)}`, 1], [`(b) GST on rent ${nm(hall.gst)}`, 1], [`(b) total ${nm(tot)}`, 2], [`(c) price ${nm(base)}`, 2], [`(c) ${plates} plates`, 1], [`(c) CGST ${nm(s3.cgst)}`, 1]], d: 3, c: 'application', t: [1, 4], time: 600 }),
    (C) => { C.assert(Number.isInteger(plates), 'whole plates'); C.model([2100, 88200, 6480, 88200 + 42480, 98000, 280, 2450]); C.assert(102900 / 1.05 === 98000 && 98000 / 350 === 280, 'float cross-check'); });
}
{
  const pays = [rs(1350), rs(270), rs(324)], g = 18;
  const p1 = priceFromTax(pays[0], g), p2 = p1 + priceFromTax(pays[1], g), p3 = p2 + priceFromTax(pays[2], g), c = chain([p1, p2, p3], g);
  Q('l07', mk.long({ marks: 10, stem: r`An office printer passes from a manufacturer to a wholesaler, to a retailer and then to a customer, all within Odisha. GST is 18% at every sale. The GST paid to the government is ${R(pays[0])} by the manufacturer, ${R(pays[1])} by the wholesaler and ${R(pays[2])} by the retailer.\n\n(a) Find the price at which the manufacturer sold the printer. [3]\n\n(b) Find the prices at which the wholesaler and the retailer sold it. [3]\n\n(c) Find the amount the customer pays, and verify that the total GST received by the government equals the GST paid by the customer. [4]`, model: r`**(a)** The manufacturer has no input tax, so its payment is $18\%$ of its price: price $= 1350 \times \dfrac{100}{18} = ${nm(p1)}$.\n\n**(b)** The wholesaler pays $18\%$ of its margin: margin $= 270 \times \dfrac{100}{18} = ${nm(p2 - p1)}$, so its price $= ${nm(p1)} + ${nm(p2 - p1)} = ${nm(p2)}$.\n\nRetailer's margin $= 324 \times \dfrac{100}{18} = ${nm(p3 - p2)}$, so its price $= ${nm(p3)}$.\n\n**(c)** GST on the final sale $= \dfrac{18}{100} \times ${nm(p3)} = ${nm(c.consumerTax)}$; the customer pays $${nm(p3)} + ${nm(c.consumerTax)} = ${nm(c.consumerPays)}$.\n\nTotal received $= 1350 + 270 + 324 = ${nm(c.total)}$, the same as the customer's GST.`, sol: 'Each payment is 18% of that dealer\'s own value added; work forwards from the manufacturer.', scheme: [[`(a) ${nm(p1)}`, 3], [`(b) wholesaler ${nm(p2)}`, 1], [`(b) retailer ${nm(p3)}`, 2], [`(c) customer pays ${nm(c.consumerPays)}`, 2], [`(c) total ${nm(c.total)} verified`, 2]], d: 4, c: 'analysis', t: [3, 4], time: 600 }),
    (C) => { C.assert(c.stages.map((x) => x.pay).join() === pays.join(), 'payments reproduce the givens'); C.model([1350 / 0.18, 1350 / 0.18 + 270 / 0.18, 1350 / 0.18 + 270 / 0.18 + 324 / 0.18, 10800 * 1.18, 1944]); });
}

/** Indian-grouped rupees without the symbol (accepted blanks and table cells). */
function inr0(p) {
  return R(p).slice(1);
}
