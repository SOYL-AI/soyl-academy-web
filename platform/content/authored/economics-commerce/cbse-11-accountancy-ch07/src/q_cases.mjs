// Case-based items (4 marks: 1 + 1 + 2, part (c) with an either/or), all on imagined businesses with computed figures.
import { mcq, short, caseQ, child } from '../../cbse-11-accountancy-ch01/src/lib.mjs';
import { same, check, inr, rs, fleet, compare, allocate } from './figures.mjs';
import { QQ } from './qq.mjs';

// ---------------------------------------------------------------- Kavya Plastics: straight line, part-year purchase, direct method
{
  const F = fleet({
    rate: 15, method: 'slm', years: 1, fy0: 2026,
    items: [{ id: 'P', label: 'Machine P', cost: 200000, year: 1, months: 12, date: '1 April 2026' }, { id: 'Q', label: 'Machine Q', cost: 120000, year: 1, months: 6, date: '1 October 2026' }],
  });
  const y = F.years[0];
  const dP = F.per[0].rows[0].dep;
  const dQ = F.per[1].rows[0].dep;
  same(dQ, 9000, 'Kavya Plastics Machine Q depreciation');
  same(y.dep, 39000, 'Kavya Plastics total depreciation');
  same(y.closingBV, 281000, 'Kavya Plastics closing book value');
  QQ('cb_slm', caseQ({
    t: [1, 2], d: 3, c: 'application', origin: 'soyl-original',
    stem: 'Read the passage on Kavya Plastics and its machines and answer the questions that follow.',
    passage: `**Kavya Plastics (imagined)**\n\nKavya Plastics, an imagined firm in the imagined town of Madhupur, bought Machine P for ${rs(200000)} on 1 April 2026 and Machine Q for ${rs(120000)} on 1 October 2026. It charges depreciation at 15% a year on cost by the straight line method, directly to the asset account, and closes its books on 31 March.`,
    parts: [
      child('a', mcq({ t: 2, d: 2, c: 'application', stem: 'For the year ended 31 March 2027, depreciation on Machine Q is charged for', opts: ['6 months', '12 months', '5 months', '9 months'], sol: 'Machine Q was bought on 1 October 2026, so it was in use from 1 October to 31 March, which is six months. Twelve months would charge it for a period before it was bought, and five and nine months count the period wrongly.' })),
      child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Find the total depreciation of Kavya Plastics for the year ended 31 March 2027.', model: `Machine P: ${inr(200000)} × 15% = ${inr(dP)}. Machine Q: ${inr(120000)} × 15% × 6/12 = ${inr(dQ)}. Total = **${rs(y.dep)}**.`, sol: 'A full year on P and six months on Q.', scheme: [[`${rs(y.dep)}`, 1]] })),
      child('c', short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Pass the journal entries for the depreciation of the year and for its transfer to the Profit and Loss A/c.', model: `Depreciation A/c Dr. ${rs(y.dep)} To Machinery A/c ${rs(y.dep)} (being depreciation for the year charged to the asset).\n\nProfit and Loss A/c Dr. ${rs(y.dep)} To Depreciation A/c ${rs(y.dep)} (being depreciation transferred to Profit and Loss A/c).`, sol: 'Depreciation is debited and the asset credited; then the expense is moved to profit and loss.', scheme: [['Depreciation entry for the year', 1], ['Transfer entry', 1]] }), [
        short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Show the book value of the machinery of Kavya Plastics on 31 March 2027, and say how it would have been shown had a Provision for Depreciation A/c been kept.', model: `Cost of the machines = ${inr(y.closingCost)} and depreciation of the year = ${inr(y.dep)}, so the book value on 31 March 2027 is **${rs(y.closingBV)}**. With a provision account, the machinery would be shown at cost, ${rs(y.closingCost)}, less the provision of ${rs(y.closingAcc)}, giving the same ${rs(y.closingCost - y.closingAcc)}.`, sol: 'Book value found directly; the provision method shows cost less provision.', scheme: [['Book value of the machinery', 1], ['Cost less provision presentation', 1]] }),
      ]),
    ],
  }));
  same(y.closingCost, 320000, 'Kavya Plastics cost of machines');
}

// ---------------------------------------------------------------- Jyoti Foods: provision method, sale of a machine at a loss
{
  const F = fleet({
    rate: 10, method: 'slm', years: 2, fy0: 2025,
    items: [{ id: 'A', label: 'Machine A', cost: 300000, year: 1, months: 12, date: '1 April 2025' }, { id: 'B', label: 'Machine B', cost: 100000, year: 1, months: 12, date: '1 April 2025' }],
    sale: { id: 'B', year: 2, months: 6, value: 70000, date: '1 October 2026' },
  });
  const y = F.years[1];
  const s = y.sold;
  same(s.bv, 85000, 'Jyoti Foods book value at sale');
  same(s.result, -15000, 'Jyoti Foods loss on sale');
  same(y.closingAcc, 60000, 'Jyoti Foods provision after the sale');
  const bal = F.years[1].prov.provision.balance;
  QQ('cb_prov', caseQ({
    t: 2, d: 4, c: 'application', origin: 'soyl-original',
    stem: 'Read the passage on Jyoti Foods and its machines and answer the questions that follow.',
    passage: `**Jyoti Foods (imagined)**\n\nJyoti Foods, an imagined firm in the imagined town of Ramnagar, bought Machine A for ${rs(300000)} and Machine B for ${rs(100000)}, both on 1 April 2025. It provides depreciation at 10% a year on cost through a Provision for Depreciation A/c and closes its books on 31 March. On 1 October 2026 it sold Machine B for ${rs(70000)}.`,
    parts: [
      child('a', mcq({ t: 2, d: 3, c: 'application', stem: 'The book value of Machine B on the date of sale is', opts: [rs(s.bv), rs(s.cost - s.value), rs(s.cost - s.dep), rs(s.cost)], sol: `Depreciation on Machine B is ${inr(F.per[1].rows[0].dep)} for 2025–26 and ${inr(s.dep)} for the six months of 2026–27, ${inr(s.acc)} in all, so the book value is ${inr(s.cost)} − ${inr(s.acc)} = ${inr(s.bv)}. The figure ${rs(s.cost - s.value)} compares cost with the sale price, ${rs(s.cost - s.dep)} deducts only the last part-year, and ${rs(s.cost)} ignores depreciation altogether.` })),
      child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: 'State whether Jyoti Foods made a profit or a loss on the sale of Machine B, and the amount.', model: `Sale price ${inr(s.value)} − book value ${inr(s.bv)} = **a loss of ${rs(-s.result)}**.`, sol: 'Sale price less book value.', scheme: [[`Loss of ${rs(-s.result)}`, 1]] })),
      child('c', short({ t: 2, d: 4, c: 'application', marks: 2, stem: '**Either** (i): Prepare the Asset Disposal A/c.', model: `${y.prov.disposal.md}`, sol: 'Cost on the debit side; accumulated depreciation, sale proceeds and the loss on the credit side.', scheme: [['Cost debited; accumulated depreciation and sale proceeds credited', 1], ['Loss on sale shown and the account balanced', 1]] }), [
        short({ t: 2, d: 4, c: 'application', marks: 2, stem: '**Or** (ii): Find the balance of the Provision for Depreciation A/c on 31 March 2027 and pass the entry that transfers the loss on sale to the Profit and Loss A/c.', model: `${y.prov.provision.md}\n\nBalance on 31 March 2027: **${rs(y.closingAcc)}**, the accumulated depreciation on Machine A alone.\n\nProfit and Loss A/c Dr. ${rs(-s.result)} To Asset Disposal A/c ${rs(-s.result)} (being loss on sale of Machine B transferred to Profit and Loss A/c).`, sol: 'The provision account loses the share of the machine sold; the loss is moved to profit and loss.', scheme: [['Provision account balance after the transfer', 1], ['Entry transferring the loss', 1]] }),
      ]),
    ],
  }));
  void bal;
}

// ---------------------------------------------------------------- Lakshmi Foods: a provision, then a general reserve
{
  const A = allocate({ before: 300000, provisions: [['provision for repairs', 30000]], reserves: [['transfer to general reserve', 10]] });
  same(A.net, 270000, 'Lakshmi Foods net profit');
  same(A.resTotal, 27000, 'Lakshmi Foods reserve');
  same(A.left, 243000, 'Lakshmi Foods profit retained');
  QQ('cb_reserve', caseQ({
    t: 3, d: 3, c: 'application', origin: 'soyl-original',
    stem: 'Read the passage on Lakshmi Foods and its profit and answer the questions that follow.',
    passage: `**Lakshmi Foods (imagined)**\n\nLakshmi Foods, an imagined firm in the imagined town of Bhimpur, earned a profit of ${rs(300000)} for the year ended 31 March 2028 before making any provision. Its accountant charged ${rs(30000)} as a provision for repairs of its ovens, which will be needed next year but whose exact cost is not known, and then transferred 10% of the net profit to a general reserve.`,
    parts: [
      child('a', mcq({ t: 3, d: 2, c: 'understanding', stem: 'The amount of ₹30,000 charged for the repairs of the ovens is a', opts: ['provision', 'general reserve', 'capital reserve', 'secret reserve'], sol: 'It is charged against profit for a known expense whose exact amount is not known, which makes it a provision. The three reserves are all kept out of profit that has already been found.' })),
      child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Find the net profit of Lakshmi Foods after charging the provision.', model: `${inr(300000)} − ${inr(30000)} = **${rs(A.net)}**.`, sol: 'Profit before the provision less the provision.', scheme: [[`${rs(A.net)}`, 1]] })),
      child('c', short({ t: 3, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Find the amount transferred to general reserve and the profit left in the business.', model: `${A.md}\n\nThe general reserve is **${rs(A.resTotal)}** and the profit retained in the business is **${rs(A.left)}**.`, sol: 'The reserve is a per cent of the net profit after the provision.', scheme: [['General reserve found on the net profit', 1], ['Profit retained found', 1]] }), [
        short({ t: 3, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Explain why the provision for repairs reduced the profit of Lakshmi Foods, while the transfer to general reserve did not reduce the profit earned.', model: `The provision is a charge against profit, so it is deducted in finding the net profit of ${rs(A.net)}. The transfer to general reserve is made out of that net profit after it has been found, so the profit earned stays ${rs(A.net)} and the transfer only decides how much of it is retained.`, sol: 'A provision is charged before profit is found; a reserve is an appropriation after it is found.', scheme: [['The provision is a charge deducted in finding the profit', 1], ['The reserve is an appropriation made after the profit is found', 1]] }),
      ]),
    ],
  }));
}

// ---------------------------------------------------------------- Vivek Fabricators: choosing a method of depreciation
{
  const C = compare({ cost: 600000, ratePct: 10, years: 3 });
  const diff = same(C.s[2].dep - C.w[2].dep, 11400, 'Vivek Fabricators third-year difference');
  same(C.w[2].dep, 48600, 'Vivek Fabricators WDV third-year charge');
  QQ('cb_method', caseQ({
    t: 1, d: 4, c: 'analysis', origin: 'soyl-original',
    stem: 'Read the passage on Vivek Fabricators and its machine and answer the questions that follow.',
    passage: `**Vivek Fabricators (imagined)**\n\nVivek Fabricators, an imagined firm in the imagined town of Kishanpur, bought a cutting machine for ${rs(600000)} on 1 April 2026. The repair bills of such machines are small in the first year and rise every year after that. The partners are choosing between the straight line method and the written down value method, each at 10% a year.`,
    parts: [
      child('a', mcq({ t: 1, d: 3, c: 'application', stem: 'Under the written down value method, the depreciation for the year ended 31 March 2029 is', opts: [rs(C.w[2].dep), rs(C.s[2].dep), rs(C.w[1].dep), rs(C.w[2].closing)], sol: `Year 1: ${inr(C.w[0].dep)}; year 2: 10% of ${inr(C.w[1].opening)} = ${inr(C.w[1].dep)}; year 3: 10% of ${inr(C.w[2].opening)} = ${inr(C.w[2].dep)}. The figure ${rs(C.s[2].dep)} is the straight line charge, ${rs(C.w[1].dep)} belongs to the second year, and ${rs(C.w[2].closing)} is the book value at the end of the third year.` })),
      child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: 'By how much is the straight line charge for the year ended 31 March 2029 higher than the written down value charge?', model: `${inr(C.s[2].dep)} − ${inr(C.w[2].dep)} = **${rs(diff)}**.`, sol: 'Difference of the two third-year charges.', scheme: [[`${rs(diff)}`, 1]] })),
      child('c', short({ t: 1, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Which method would you advise Vivek Fabricators to adopt, given its repair bills? Give two reasons.', model: `The **written down value method**. (1) It charges more depreciation in the early years, ${inr(C.w[0].dep)} against ${inr(C.w[2].dep)} in the third year, when repairs are small. (2) It charges less in the later years, when repairs are higher, so the total of depreciation and repairs is more even from year to year.`, sol: 'The method whose charge falls as repairs rise.', scheme: [['Written down value method advised', 1], ['Reason based on the pattern of depreciation against repairs', 1]] }), [
        short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: '**Or** (ii): Compare the total depreciation charged over the three years under the two methods and give one reason for the difference.', model: `Straight line: ${inr(C.totalSlm)}. Written down value: ${inr(C.totalWdv)}. The written down value total is lower by ${inr(C.totalSlm - C.totalWdv)}, because its rate is applied to a book value that falls each year, while the straight line rate is applied to the full cost every year.`, sol: 'Totals under each method and the reason for the gap.', scheme: [['Totals under the two methods', 1], ['Reason: rate on the falling book value against rate on cost', 1]] }),
      ]),
    ],
  }));
}

void check;
