// ISC 12 Accounts, ch09 Final Accounts of Companies — question bank.
// Every company and figure is imagined by SOYL and labelled as such; no textbook illustration or exercise
// and no CISCE specimen or past-paper item is reused. Every classification key comes from the one table in
// acc.mjs (CLASSIFY), and every amount is computed there from the givens: trial balances agree, every
// adjustment is posted to the profit and to one balance sheet line, notes add up, balance sheets total.
// The expected values pinned below (hand-checked) catch any drift. ISC 2027 scope: the Balance Sheet as
// per Schedule III Part I with notes to accounts, from a trial balance with adjustments; profit is given
// or worked out in one working (the Statement of Profit and Loss, Part II, is not required).
import { Q, mcq, ar, tf, fb, match, num, short, long } from './lib.mjs';
import { inr, rs, pct, check, md, given, classOf, headOf, subOf, where, classTable, shareNote, shareNoteTable, subNote, bs, finalAccounts, working, noteOf, contingentNote, NOTE_HEADERS, CONTINGENT } from './acc.mjs';

const eq = (a, b, what) => check(JSON.stringify(a) === JSON.stringify(b), `${what}: got ${JSON.stringify(a)}, expected ${JSON.stringify(b)}`);
const list = (xs) => xs.map((x, i) => `${i + 1}. ${x}`).join('\n');
const adjList = (xs) => xs.map((x, i) => `(${['i', 'ii', 'iii', 'iv', 'v', 'vi', 'vii', 'viii', 'ix', 'x'][i]}) ${x}`).join('\n');
const D = '31 March 2026';
const O = '1 April 2025';

// ================================================================ t01 Schedule III Part I: heads and sub-heads
Q('m_part1', mcq({
  t: 1, d: 1, c: 'recall',
  stem: "The accountant of Dudhsagar Rail Snacks Ltd, an imagined caterer at Collem, is drawing up the company's Balance Sheet as at 31 March 2026. Under Section 129 of the Companies Act, 2013, the form of that Balance Sheet is the one set out in",
  opts: ['Part I of Schedule III to the Act', 'Part II of Schedule III to the Act', 'Table F of Schedule I to the Act', 'Schedule II to the Act'],
  sol: 'Part I of Schedule III gives the form of the balance sheet and Part II the Statement of Profit and Loss; Schedule I holds model articles (Table F) and Schedule II the useful lives used for depreciation.',
}));

Q('m_calls_adv', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A shareholder of Athirapally Coir Geotextiles Ltd, an imagined company at Chalakudy, sent ₹6,000 for the second call together with his first-call money. The directors had not made the second call by 31 March 2026. In the Balance Sheet on that date the ₹6,000 appears under',
  opts: [where('Calls in advance'), "Shareholders' Funds — Share Capital, added to subscribed capital", where('Securities premium'), where('Bank overdraft')],
  sol: 'Until the call is made the money is owed back to the shareholder, so it is a current liability; it becomes capital only when the call falls due.',
}));
check(classOf('Calls in advance').key === 'ocl', 'calls in advance');

Q('m_loose_tools', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Chitrakote Terracotta Tiles Ltd, an imagined company at Lohandiguda, keeps a stock of moulds, trowels and cutting wires that wear out within a season. In its Balance Sheet these loose tools are shown under',
  opts: [where('Loose tools'), where('Plant and machinery'), where('Capital work-in-progress'), where('Prepaid expenses')],
  sol: 'Schedule III lists loose tools among inventories: they are small items, used up or lost quickly and valued afresh each year.',
}));

Q('m_bills_payable', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Nohkalikai Orange Squash Ltd, an imagined company at Sohra, accepted bills drawn on it by the farmers who supply its oranges. At the year end the bills not yet met are shown under',
  opts: [where('Bills payable'), where('Bank overdraft'), where('Advance received from customers'), where('Long-term loan from a bank')],
  sol: 'The bills arose from buying oranges on credit in the normal course of business, so they are trade payables, a current liability.',
}));

Q('m_unpaid_div', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Barehipani Honey Ltd, an imagined company at Jashipur, paid its last dividend in September 2025, but dividend warrants for ₹3,200 had not been encashed by 31 March 2026. The ₹3,200 is shown under',
  opts: [where('Unpaid dividend'), where('Provision for tax'), where('General reserve'), where('Sundry creditors')],
  sol: 'It is a definite sum owed to known shareholders and payable on demand: an other current liability, not an estimate (provision) and not an amount owed to suppliers.',
}));

Q('m_op_cycle', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: 'Kempty Teak Boats Ltd, an imagined boat-builder near Mussoorie, seasons teak planks before they go into a hull; its normal operating cycle is 22 months. Planks bought in February 2026 will be used in about 16 months. In the Balance Sheet as at 31 March 2026 the planks are',
  opts: ['a current asset under Inventories, as they will be used within the normal operating cycle', 'a non-current asset, as they will be used after more than twelve months', 'Capital Work-in-Progress, as the boats are not yet built', 'a non-current investment, as seasoned teak gains in value'],
  sol: 'An asset held for use within the normal operating cycle is current even when that cycle is longer than twelve months; the twelve-month test decides only for items outside the cycle.',
}));

Q('m_prem_red', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Bhagsu Slate Roofing Ltd, an imagined company at Dharamshala, has debentures outstanding that it will redeem in 2029 at a premium of 5%. On 31 March 2026 the balance of its Premium on Redemption of Debentures Account is shown under',
  opts: [where('Premium on redemption of debentures'), where('Securities premium'), where('Interest accrued on debentures'), 'Non-current Assets — Other Non-current Assets'],
  sol: 'The premium is owed to the debentureholders on redemption, more than twelve months away, so it is a non-current liability other than a borrowing.',
}));

Q('m_warranty', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'Shivanasamudra Water Pumps Ltd, an imagined company at Malavalli, sells pumps with a three-year free-repair promise. It estimates ₹48,000 of repair claims that it expects to meet only after 31 March 2027. On 31 March 2026 this estimate is shown under',
  opts: [where('Provision for warranty claims payable after twelve months'), where('Provision for tax'), where('Outstanding expenses'), where('General reserve')],
  sol: 'An estimated liability is a provision; as it will be settled after twelve months, it is a long-term provision.',
}));

Q('m_sapa', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'Unchalli Areca Plates Ltd, an imagined company at Siddapur, received ₹1,50,000 of application money for shares in March 2026; the shares will be allotted on 10 April 2026 and no part of the money is refundable. On 31 March 2026 the ₹1,50,000 is shown',
  opts: [`as the separate head ${headOf('Share application money pending allotment')}, in the Equity and Liabilities part`, 'under Share Capital as subscribed capital', `under ${subOf('Calls in advance')}`, `under ${subOf('Securities premium')}`],
  sol: "Before allotment the applicants hold no shares, so the money is not share capital; as it will not be refunded it is not a current liability either. Schedule III gives it a head of its own between Shareholders' Funds and Non-current Liabilities.",
}));

Q('m_cce', mcq({
  t: 1, d: 1, c: 'recall',
  stem: "On 31 March 2026 Talakona Herbal Teas Ltd, an imagined company at Tirupati, holds a customer's cheque for ₹9,500 that it will deposit on 1 April. In its Balance Sheet the cheque is part of",
  opts: [subOf('Cheques in hand'), subOf('Bills receivable'), subOf('Advance to suppliers'), subOf('Current investments')],
  sol: 'A cheque in hand is as good as cash, so it is shown with cash in hand and balances with banks.',
}));

Q('m_capital_adv', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Courtallam Spice Oils Ltd, an imagined company at Tenkasi, paid ₹2,00,000 in March 2026 as an advance to the maker of a distillation unit that will be delivered and installed in August 2026. The advance is shown under',
  opts: [where('Capital advances'), where('Advance to suppliers'), where('Capital work-in-progress'), where('Prepaid expenses')],
  sol: 'An advance paid for a fixed asset is a capital advance: it will turn into a non-current asset, so it goes to long-term loans and advances, not with advances for goods.',
}));

Q('ar_calls_adv', ar({
  t: 1, d: 2, c: 'understanding', key: 'a',
  a: 'Kakolat Litchi Juice Ltd, an imagined company at Nawada, shows ₹7,500 received from shareholders on a call not yet made under Other Current Liabilities, and not in its note on Share Capital.',
  r: 'Money paid on a call before the directors make it is a debt the company owes to those shareholders until the call falls due.',
  sol: 'Both are true, and R explains A: until the call is made the money is not capital but an amount owed back, payable within the year.',
}));

Q('ar_noncurrent', ar({
  t: 1, d: 2, c: 'understanding', key: 'a',
  a: 'Ethipothala Granite Slabs Ltd, an imagined company at Macherla, shows its 9% debentures redeemable in 2032 under Non-current Liabilities.',
  r: 'A liability that is not due for settlement within twelve months after the reporting date, nor within the operating cycle, is a non-current liability.',
  sol: 'Both are true, and R is the very test that places the 2032 debentures among non-current liabilities, as Long-term Borrowings.',
}));

Q('tf_cwip', tf({
  t: 1, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Krang Suri Cold Storage Ltd, an imagined company at Amlarem, is still building a new cold chamber on 31 March 2026; the ₹4,20,000 spent on it so far is shown as Capital Work-in-Progress.',
  sol: 'An asset under construction is not yet ready for use; Schedule III shows it as capital work-in-progress within the property, plant and equipment group.',
}));
check(classOf('Capital work-in-progress').key === 'cwip', 'cwip');

Q('tf_overdraft', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? The ₹38,000 overdraft that Kiliyur Coffee Roasters Ltd, an imagined company at Yercaud, owes its bank on 31 March 2026 is shown under Trade Payables, because it is payable within a year.',
  sol: `An overdraft is borrowed money, not an amount owed to suppliers of goods or services: it is shown under ${subOf('Bank overdraft')}.`,
}));

Q('fb_twelve', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Langshiang Mushroom Farms Ltd, an imagined company at Nongstoin, grows several crops and cannot identify a single normal operating cycle. For sorting its assets and liabilities into current and non-current, Schedule III then takes its operating cycle to be ___ months.',
  acc: [['12', 'twelve']],
  sol: 'Where the normal operating cycle cannot be identified, it is assumed to be twelve months.',
}));

const MT_LIAB = ['Calls in advance', 'Provision for tax', 'Bank overdraft', 'Premium on redemption of debentures'];
check(new Set(MT_LIAB.map(subOf)).size === MT_LIAB.length, 'mt_liab distinct');
Q('mt_liab', match({
  t: 1, d: 2, c: 'application', marks: 2,
  stem: 'Match each liability in the books of Mallalli Cardamom Auctions Ltd, an imagined company at Shanivarasanthe, with the sub-head of its Balance Sheet under which it is shown.',
  pairs: MT_LIAB.map((x) => [x, subOf(x)]),
  sol: 'Money paid early on a call is owed back within the year; tax is an estimate payable within the year; an overdraft is a loan repayable on demand; the redemption premium is payable years later.',
}));

const MT_ASSETS = ['Loose tools', 'Trademarks', 'Bills receivable', 'Capital advances'];
check(new Set(MT_ASSETS.map(subOf)).size === MT_ASSETS.length, 'mt_assets distinct');
Q('mt_assets', match({
  t: 1, d: 2, c: 'application', marks: 2,
  stem: 'Hebbe Arecanut Driers Ltd, an imagined company at Kemmangundi, lists four assets on 31 March 2026. Match each of its assets with the sub-head of the Balance Sheet in which it appears.',
  pairs: [['Loose tools used in the drying sheds', subOf('Loose tools')], ['Its registered trademark', subOf('Trademarks')], ['Bills receivable from areca merchants', subOf('Bills receivable')], ['Advance paid for a new drying kiln', subOf('Capital advances')]],
  sol: 'Loose tools go with inventories; a trademark is an intangible right; bills arise from credit sales; an advance for a fixed asset is a capital advance.',
}));

Q('n_curr_liab', (() => {
  const items = [['Sundry creditors', 120000], ['Bills payable', 30000], ['Provision for tax', 55000], ['Bank overdraft', 40000], ['10% Debentures (redeemable in 2030)', 400000, 'Debentures'], ['Outstanding salaries', 18000, 'Outstanding expenses'], ['Provision for gratuity payable after twelve months', 26000], ['Calls in advance', 2000]];
  const B = bs({ date: D, items, only: 'el' });
  const cl = B.headTotal.cl;
  eq(cl, 265000, 'n_curr_liab');
  const picked = items.filter(([l, , c = l]) => headOf(c) === 'Current Liabilities');
  return num({
    t: 1, d: 3, c: 'application', value: cl, unit: '₹',
    stem: `From the following balances of Agaya Gangai Silk Ltd, an imagined company in the Kolli Hills, find the total of Current Liabilities in its Balance Sheet as at 31 March 2026 (in ₹):\n\n${given(items.map(([l, v]) => [l, v]))}`,
    sol: `Current liabilities: ${picked.map(([l, v]) => `${l.toLowerCase()} ${inr(v)}`).join(', ')}; total = ${picked.map(([, v]) => inr(v)).join(' + ')} = ${inr(cl)}, that is ₹${inr(cl)}. The debentures and the gratuity provision are non-current.`,
  });
})());

Q('s2_classify4', (() => {
  const items = ['Unpaid dividend', 'Stores and spares', 'Premium on redemption of debentures', 'Interest accrued on investments'];
  return short({
    t: 1, d: 2, c: 'application', marks: 2,
    stem: `Sathodi Cane Baskets Ltd, an imagined company at Kalache, has the following balances on 31 March 2026. State the major head and the sub-head under which each is shown in its Balance Sheet as per Schedule III Part I: (i) ${items[0]}; (ii) ${items[1]}; (iii) ${items[2]}; (iv) ${items[3]}.`,
    model: classTable(items).md,
    sol: 'Decide first whether each balance is owned or owed, then whether it is current, then its sub-head.',
    scheme: [[`(i) and (ii): ${subOf(items[0])}; ${subOf(items[1])}`, 1], [`(iii) and (iv): ${subOf(items[2])}; ${subOf(items[3])}`, 1]],
  });
})());

Q('s2_current_def', short({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'The new accountant of Magod Wild Honey Ltd, an imagined company at Yellapur, is unsure when a liability should be called current. State any two conditions under which Schedule III Part I treats a liability as current, and apply one of them to a creditor for honey jars payable in 45 days.',
  model: "A liability is **current** if it satisfies any one of these conditions:\n1. it is expected to be settled in the company's normal operating cycle;\n2. it is held primarily for trading;\n3. it is due to be settled within twelve months after the reporting date; or\n4. the company has no unconditional right to defer its settlement for at least twelve months after the reporting date.\n\nThe creditor for honey jars is payable in 45 days, within twelve months (and within the operating cycle), so it is a current liability under **Trade Payables**.",
  sol: 'Quote two of the Schedule III conditions, then test the creditor against one of them.',
  scheme: [['Any two conditions stated', 1], ['Applied to the creditor: current, Trade Payables', 1]],
}));
check(subOf('Sundry creditors') === 'Trade Payables', 'creditor sub-head');

const S3C = [['Advance received from customers', 'Advance received from customers'], ['Building under construction for a new office', 'Capital work-in-progress'], ['Calls in arrears', 'Calls in arrears'], ['Cash credit from a bank', 'Cash credit from a bank'], ['Provision for gratuity payable after twelve months', 'Provision for gratuity payable after twelve months'], ['Units of a liquid mutual fund to be sold in two months', 'Current investments']];
Q('s3_classify6', short({
  t: 1, d: 2, c: 'application', marks: 3,
  stem: `While finalising its accounts, Abbi Coffee Pulpers Ltd, an imagined company at Madikeri, has to place six balances in its Balance Sheet. State the major head and the sub-head (if any) of each:\n\n${list(S3C.map(([l]) => l))}`,
  model: classTable(S3C).md,
  sol: 'Name each balance in accounting terms first (advance, asset under construction, unpaid call, borrowing, estimate, short-term holding), then place it.',
  scheme: [['Items 1 and 2', 1], ['Items 3 and 4', 1], ['Items 5 and 6', 1]],
}));

Q('s3_op_cycle', short({
  t: 1, d: 4, c: 'analysis', marks: 3,
  stem: 'Dabbe Aged Basmati Ltd, an imagined rice mill at Sagara, stores paddy for about fourteen months before milling and selling it; its normal operating cycle is sixteen months. On 31 March 2026 it has: (a) aged rice in its godowns that will be sold in fifteen months; (b) money owed to farmers for paddy, payable in thirteen months as part of the usual crop-to-cash cycle; (c) a bank loan for a new silo, repayable in one sum in fourteen months. Classify each item as current or non-current, with the sub-head and a reason.',
  model: `- **(a) Aged rice:** to be sold within the normal operating cycle of sixteen months, so it is a **current asset** under ${subOf('Finished goods')}, although the sale is more than twelve months away.\n- **(b) Amount owed to farmers:** expected to be settled within the normal operating cycle, so it is a **current liability** under ${subOf('Sundry creditors')}.\n- **(c) Silo loan:** a borrowing that is not part of the operating cycle; it is due after more than twelve months, so it is **non-current**, under ${subOf('Long-term loan from a bank')}.`,
  sol: 'Items inside the operating cycle are tested against the cycle; the loan, outside it, against the twelve-month rule.',
  scheme: [['(a) current, Inventories, reason', 1], ['(b) current, Trade Payables, reason', 1], ['(c) non-current, Long-term Borrowings, reason', 1]],
}));

const L5C = [['Bills payable to flour suppliers', 'Bills payable'], ['Ovens under installation in a new bakery unit', 'Capital work-in-progress'], ['Provision for tax for the year', 'Provision for tax'], ['Recipe software bought from a developer', 'Computer software'], ['Interest accrued on 8% debentures', 'Interest accrued on debentures'], ['Security deposit paid to the landlord of the bakery', 'Security deposits paid']];
Q('l5_classify', long({
  t: 1, d: 3, c: 'analysis', marks: 5,
  stem: `Pandavkada Bakery Ovens Ltd, an imagined company at Kharghar, is preparing its Balance Sheet as at 31 March 2026.\n\n(a) State the major head and the sub-head of each of the following balances: ${L5C.map(([l], i) => `(${['i', 'ii', 'iii', 'iv', 'v', 'vi'][i]}) ${l}`).join('; ')}. [3]\n\n(b) The company also owes a bank ₹5,00,000 on a term loan repayable in five equal yearly instalments, the next one on 15 February 2027. Show how the loan is presented, and explain the rule you applied. [2]`,
  model: `**(a)**\n\n${classTable(L5C).md}\n\n**(b)** Each instalment is ₹5,00,000 ÷ 5 = ₹1,00,000. The instalment due on 15 February 2027 falls within twelve months of the Balance Sheet date, so ₹1,00,000 is shown under **Current Liabilities — Short-term Borrowings** as current maturities of long-term borrowings; the remaining ₹4,00,000 stays under **Non-current Liabilities — Long-term Borrowings**. Rule: under the amended Schedule III, the part of a long-term borrowing repayable within twelve months is a current maturity and is shown under Short-term Borrowings.`,
  sol: 'Part (a) classifies item by item; part (b) splits the loan at the twelve-month line.',
  scheme: [['(a) items (i) and (ii)', 1], ['(a) items (iii) and (iv)', 1], ['(a) items (v) and (vi)', 1], ['(b) split ₹1,00,000 and ₹4,00,000', 1], ['(b) amended rule stated', 1]],
}));
check(subOf('Current maturities of long-term borrowings') === 'Short-term Borrowings' && 500000 / 5 === 100000, 'l5_classify loan');

// ================================================================ t02 Notes to accounts
// --- share capital
const MPU = shareNote({ fv: 10, authorised: 100000, issued: 75000, full: 73000, part: { n: 2000, called: 10, arrears: 6000 } });
eq([MPU.called, MPU.amount], [750000, 744000], 'm_paidup');
Q('m_paidup', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Meenmutty Rubber Mats Ltd, an imagined company at Kalpetta, has 75,000 equity shares of ₹10 each subscribed and fully called up. The holders of 2,000 shares have not paid the final call of ₹3 per share. The amount shown against Share Capital on the face of its Balance Sheet is',
  opts: [rs(MPU.amount), rs(MPU.called), rs(MPU.called + MPU.arrears), rs(MPU.called - 2000 * 10)],
  sol: `Called-up capital = 75,000 × ₹10 = ${rs(MPU.called)}; calls in arrears = 2,000 × ₹3 = ${rs(MPU.arrears)}; share capital = ${inr(MPU.called)} − ${inr(MPU.arrears)} = ${inr(MPU.amount)}.`,
}));

Q('m_forfeit', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Vantawng Ginger Candy Ltd, an imagined company at Thenzawl, forfeited 400 shares on which ₹2,400 had been received, and has not reissued them by 31 March 2026. The ₹2,400 in its Share Forfeiture Account is shown',
  opts: ['in the note on Share Capital, added to the subscribed capital', 'under Reserves and Surplus as a capital reserve', 'under Other Current Liabilities, as it is owed to the former holders', 'as income in the Statement of Profit and Loss'],
  sol: 'Until the shares are reissued, the amount received on them stays with share capital and is added in the note; only a surplus left after reissue goes to capital reserve.',
}));

Q('ar_forfeit', ar({
  t: 2, d: 3, c: 'analysis', key: 'c',
  a: 'Thusharagiri Teak Doors Ltd, an imagined company at Kodenchery, adds the ₹3,600 standing in its Share Forfeiture Account to share capital in the note on Share Capital, as the forfeited shares have not been reissued.',
  r: 'The balance of the Share Forfeiture Account is always shown under Reserves and Surplus as a capital reserve.',
  sol: 'A is true. R is false: forfeited amounts stay in the share capital note until reissue; only the gain left after reissue is transferred to capital reserve.',
}));

Q('tf_arrears', tf({
  t: 2, d: 1, c: 'recall', ans: true,
  stem: 'True or false? Calls in arrears of ₹5,000 on the shares of Catherine Falls Woollens Ltd, an imagined company at Kotagiri, are deducted from the called-up capital in its note on Share Capital.',
  sol: 'Paid-up capital is the called-up amount less calls unpaid, and the deduction is shown inside the share capital note.',
}));
check(classOf('Calls in arrears').key === 'sc', 'arrears in share capital');

const NPU = shareNote({ fv: 10, authorised: 80000, issued: 50000, full: 48900, part: { n: 800, called: 10, arrears: 3200 }, forfeited: { n: 300, amount: 1800 } });
eq([NPU.called, NPU.amount], [497000, 495600], 'n_paidup');
Q('n_paidup', num({
  t: 2, d: 3, c: 'application', value: NPU.amount, unit: '₹',
  stem: 'Suruli Banana Chips Ltd, an imagined company at Cumbum, issued 50,000 equity shares of ₹10 each, all called up. It forfeited 300 shares on which ₹6 per share had been paid; they are not yet reissued. The holders of 800 of the remaining shares have not paid the final call of ₹4 per share. What amount does it show as Share Capital in its Balance Sheet (in ₹)?',
  sol: `Subscribed capital = 49,700 × ₹10 = ${inr(NPU.called)}; less calls in arrears 800 × ₹4 = ${inr(NPU.arrears)}; add forfeited shares 300 × ₹6 = ${inr(NPU.forfeited)}; share capital = ${inr(NPU.called)} − ${inr(NPU.arrears)} + ${inr(NPU.forfeited)} = ${inr(NPU.amount)}, that is ₹${inr(NPU.amount)}.`,
}));

const KS2 = shareNote({ fv: 10, authorised: 200000, issued: 150000, full: 145000 });
eq(KS2.amount, 1450000, 's2_share_simple');
Q('s2_share_simple', short({
  t: 2, d: 2, c: 'application', marks: 2,
  stem: 'Kynrem Pineapple Candy Ltd, an imagined company at Thangkharang, is registered with 2,00,000 equity shares of ₹10 each. It offered 1,50,000 shares to the public; 1,45,000 were applied for and allotted, and all the money has been received. Prepare the note on Share Capital for its Balance Sheet as at 31 March 2026.',
  model: `${shareNoteTable(KS2).md}\n\nAuthorised and issued capital are shown for information; only the subscribed capital, ${rs(KS2.amount)}, is carried to the Balance Sheet.`,
  sol: 'Authorised, issued and subscribed capital are three different figures; only the last is added.',
  scheme: [['Authorised and issued capital shown', 1], [`Subscribed and fully paid ${rs(KS2.amount)} as the total`, 1]],
}));

const TP2 = shareNote({ fv: 10, authorised: 100000, issued: 60500, full: 58800, part: { n: 1200, called: 10, arrears: 2400 }, forfeited: { n: 500, amount: 3500 } });
eq([TP2.called, TP2.amount], [600000, 601100], 's2_arrears_forfeit');
Q('s2_arrears_forfeit', short({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: 'Tamdhan Paper Lanterns Ltd, an imagined company at Seijosa, has an authorised capital of 1,00,000 equity shares of ₹10 each. It issued 60,500 shares and called up the full amount. It forfeited 500 shares on which ₹7 per share had been received; they have not been reissued. Of the other 60,000 shares, the holders of 1,200 shares have not paid the final call of ₹2 per share. Prepare the note on Share Capital as at 31 March 2026.',
  model: shareNoteTable(TP2).md,
  sol: 'Separate fully paid shares from those with calls unpaid, then add back what was received on the forfeited shares.',
  scheme: [[`Fully paid and not fully paid shares, arrears ${rs(TP2.arrears)} deducted`, 1], [`Forfeited shares ${rs(TP2.forfeited)} added; total ${rs(TP2.amount)}`, 1]],
}));

const SR3 = shareNote({ fv: 10, authorised: 200000, issued: 150000, part: { n: 148000, called: 8, arrears: 9000 }, forfeited: { n: 2000, amount: 10000 } });
eq([SR3.called, SR3.amount], [1184000, 1185000], 's3_share_note');
Q('s3_share_note', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: 'Sirimane Ragi Malt Ltd, an imagined company at Kigga, has an authorised capital of 2,00,000 equity shares of ₹10 each, of which 1,50,000 were issued. ₹8 per share has been called up so far. The company forfeited 2,000 shares on which ₹5 per share had been received; they are not reissued. On the remaining 1,48,000 shares, calls in arrears amount to ₹9,000 (the second call of ₹3 on 3,000 shares). Show the share capital in the Balance Sheet as at 31 March 2026 and prepare the note to accounts.',
  model: `${bs({ title: 'Balance Sheet of Sirimane Ragi Malt Ltd as at 31 March 2026 (extract)', date: D, share: SR3, only: 'el' }).md}\n\n**Notes to Accounts**\n\n${shareNoteTable(SR3).md}\n\nWorking: called up 1,48,000 × ₹8 = ${inr(SR3.called)}; less arrears ${inr(SR3.arrears)}; add forfeited 2,000 × ₹5 = ${inr(SR3.forfeited)}; share capital = ${inr(SR3.amount)}.`,
  sol: 'Called-up capital less arrears, plus the amount received on forfeited shares not yet reissued.',
  scheme: [['Authorised, issued and subscribed capital in the note', 1], [`Called up less arrears: ${rs(SR3.paidUp)}`, 1], [`Forfeited shares added; ${rs(SR3.amount)} on the face of the Balance Sheet`, 1]],
}));

// --- reserves and surplus
const DS = subNote(2, [['Surplus, i.e. balance in the Statement of Profit and Loss', [['Balance on 1 April 2025', 45000], ['Add: Profit for the year', 210000], ['Transfer to general reserve', -50000]]]]);
eq(DS.total, 205000, 'm_surplus');
Q('m_surplus', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Dassam Lac Bangles Ltd, an imagined company at Taimara, had a credit balance of ₹45,000 in its Statement of Profit and Loss on 1 April 2025. Its profit for 2025-26 is ₹2,10,000, out of which the directors transfer ₹50,000 to General Reserve. The surplus shown in its note on Reserves and Surplus on 31 March 2026 is',
  opts: [rs(DS.total), rs(45000 + 210000), rs(210000 - 50000), rs(210000)],
  sol: `Surplus = 45,000 + 2,10,000 − 50,000 = ${inr(DS.total)}; the ₹50,000 moves to General Reserve within the same note.`,
}));

const TM = subNote(2, [['General reserve', 80000], ['Statement of Profit and Loss (debit balance)', 130000, 'Debit balance of the Statement of Profit and Loss']]);
eq(TM.total, -50000, 'm_debit_pl');
Q('m_debit_pl', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'After two poor years, Tirathgarh Mahua Oil Ltd, an imagined company in the Kanger valley, has a debit balance of ₹1,30,000 in its Statement of Profit and Loss, a General Reserve of ₹80,000 and no other reserve. In its Balance Sheet as at 31 March 2026, the debit balance is',
  opts: [`deducted within Reserves and Surplus, which is then shown as a negative figure of ${rs(-TM.total)}`, 'shown on the assets side under Other Non-current Assets', 'deducted from Share Capital in the note on Share Capital', 'shown under Current Liabilities as a provision for losses'],
  sol: `An accumulated loss is not an asset; it is deducted in Reserves and Surplus even if the head turns negative: 80,000 − 1,30,000 = ${inr(TM.total)}.`,
}));

Q('fb_surplus', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'In the note on Reserves and Surplus of Chunchanakatte Silk Reeling Ltd, an imagined company at Krishnarajanagara, the credit balance of the Statement of Profit and Loss carried forward is shown under the caption "___, i.e. balance in the Statement of Profit and Loss".',
  acc: [['Surplus']],
  sol: 'Schedule III calls the balance carried forward the Surplus, i.e. balance in the Statement of Profit and Loss; it is the last item of Reserves and Surplus.',
}));

const KN = shareNote({ fv: 10, authorised: 150000, issued: 120000, full: 118000, part: { n: 2000, called: 10, arrears: 8000 } });
const KNrs = subNote(2, [['Securities premium', 150000], ['General reserve', 200000], ['Statement of Profit and Loss (debit balance)', 90000, 'Debit balance of the Statement of Profit and Loss']]);
const KNsf = KN.amount + KNrs.total;
eq([KN.amount, KNrs.total, KNsf], [1192000, 260000, 1452000], 'n_sf');
Q('n_sf', num({
  t: 2, d: 2, c: 'application', value: KNsf, unit: '₹',
  stem: `Kalhatty Carrot Farms Ltd, an imagined company near Kalhatty, has 1,20,000 equity shares of ₹10 each, fully called up; calls in arrears are ₹8,000. Its other balances on 31 March 2026 are:\n\n${given([['Securities premium', 150000], ['General reserve', 200000], ['Statement of Profit and Loss (debit balance)', 90000], ['9% Debentures', 500000]])}\n\nFind the total of its Shareholders' Funds (in ₹).`,
  sol: `Share capital = 12,00,000 − 8,000 = ${inr(KN.amount)}; reserves and surplus = 1,50,000 + 2,00,000 − 90,000 = ${inr(KNrs.total)}; shareholders' funds = ${inr(KN.amount)} + ${inr(KNrs.total)} = ${inr(KNsf)}, that is ₹${inr(KNsf)}. The debentures are a non-current liability.`,
}));

const CS = subNote(2, [['General reserve', [['Balance on 1 April 2025', 100000], ['Add: Transfer from surplus', 30000]]], ['Surplus, i.e. balance in the Statement of Profit and Loss', [['Debit balance on 1 April 2025', -20000], ['Add: Profit for the year', 140000], ['Transfer to general reserve', -30000]]]]);
eq(CS.total, 220000, 's2_surplus_note');
Q('s2_surplus_note', short({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: 'Chachai Lime Pickles Ltd, an imagined company at Sirmour, had a General Reserve of ₹1,00,000 and a debit balance of ₹20,000 in its Statement of Profit and Loss on 1 April 2025. Its profit for 2025-26 is ₹1,40,000, and the directors transfer ₹30,000 to General Reserve. Prepare the note on Reserves and Surplus as at 31 March 2026.',
  model: `${CS.md}\n\nThe opening debit balance is set off against this year's profit before the transfer: 1,40,000 − 20,000 − 30,000 = 90,000 remains as surplus.`,
  sol: 'Show the general reserve with its transfer, and the surplus as opening balance, profit and transfer.',
  scheme: [['General reserve 1,30,000 with the transfer', 1], [`Surplus 90,000 after the opening debit balance; total ${rs(CS.total)}`, 1]],
}));
check(140000 - 20000 - 30000 === 90000, 'Chachai surplus');

const HG = subNote(2, [['Capital reserve', 30000], ['Securities premium', 120000], ['General reserve', [['Balance on 1 April 2025', 250000], ['Add: Transfer from surplus', 60000]]], ['Surplus, i.e. balance in the Statement of Profit and Loss', [['Balance on 1 April 2025', 75000], ['Add: Profit for the year', 310000], ['Transfer to general reserve', -60000]]]]);
eq(HG.total, 785000, 's3_rs_note');
Q('s3_rs_note', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: 'Hanumana Gundi Areca Ltd, an imagined company at Kalasa, had the following on 1 April 2025: Capital Reserve ₹30,000; Securities Premium ₹1,20,000; General Reserve ₹2,50,000; credit balance of the Statement of Profit and Loss ₹75,000. Its profit for 2025-26 is ₹3,10,000, and the Board transfers ₹60,000 to General Reserve. Prepare the note on Reserves and Surplus as at 31 March 2026.',
  model: HG.md,
  sol: 'List capital reserve and securities premium as they stand, then show the general reserve and the surplus with their movements.',
  scheme: [['Capital reserve and securities premium', 1], ['General reserve 3,10,000 after the transfer', 1], [`Surplus 3,25,000; total ${rs(HG.total)}`, 1]],
}));
check(75000 + 310000 - 60000 === 325000 && 250000 + 60000 === 310000, 'Hanumana Gundi');

const KUitems = [['Securities premium', 60000], ['General reserve', 40000], ['Surplus, i.e. balance in the Statement of Profit and Loss (debit balance)', [['Debit balance on 1 April 2025', -150000], ['Add: Profit for the year', 30000]], 'Debit balance of the Statement of Profit and Loss']];
const KU = subNote(2, KUitems);
const KUsc = shareNote({ fv: 10, authorised: 60000, issued: 50000, full: 50000 });
const KUb = bs({ title: "Balance Sheet of Kune Strawberry Crush Ltd as at 31 March 2026 (Shareholders' Funds)", date: D, share: KUsc, items: KUitems, only: 'el' });
const KUsf = KUb.total;
eq([KU.total, KUb.subTotal.rs, KUsf], [-20000, -20000, 480000], 's3_debit_surplus');
Q('s3_debit_surplus', short({
  t: 2, d: 4, c: 'analysis', marks: 3,
  stem: 'Kune Strawberry Crush Ltd, an imagined company near Lonavala, has 50,000 equity shares of ₹10 each, fully paid. On 1 April 2025 it had a Securities Premium of ₹60,000, a General Reserve of ₹40,000 and a debit balance of ₹1,50,000 in its Statement of Profit and Loss. Its profit for 2025-26 is ₹30,000. Prepare the note on Reserves and Surplus as at 31 March 2026 and show the Shareholders\' Funds.',
  model: `${KUb.md}\n\n**Notes to Accounts**\n\n${KUb.notesMd}\n\nThe year's profit reduces the debit balance to ₹1,20,000, which is still larger than the reserves, so Reserves and Surplus is **negative, ${rs(KU.total)}**, and shareholders' funds fall to ${rs(KUsf)}. The loss is never shown as an asset.`,
  sol: 'Set the profit against the opening loss first; let Reserves and Surplus go negative rather than show the loss as an asset.',
  scheme: [['Closing debit balance ₹1,20,000', 1], [`Reserves and Surplus ${rs(KU.total)} (negative)`, 1], [`Shareholders' funds ${rs(KUsf)}`, 1]],
}));
check(-150000 + 30000 === -120000 && 60000 + 40000 - 120000 === KU.total, 'Kune');

// --- borrowings
const TH = bs({ date: D, only: 'el', items: [['9% Debentures (8,000 of ₹100 each)', [['9% Debentures (8,000 of ₹100 each)', 800000], ['Current maturities shown under Short-term Borrowings', -200000]], 'Debentures'], ['Term loan from a bank', [['Term loan from a bank', 500000], ['Current maturities shown under Short-term Borrowings', -100000]], 'Long-term loan from a bank'], ['Public deposits repayable in 2028', 150000, 'Public deposits repayable after twelve months'], ['Current maturities of long-term borrowings', 300000]] });
eq([TH.subTotal.ltb, TH.subTotal.stb], [1150000, 300000], 'n_ltb');
Q('n_ltb', num({
  t: 2, d: 3, c: 'application', value: TH.subTotal.ltb, unit: '₹',
  stem: 'On 31 March 2026 Thalaiyar Spice Garden Resorts Ltd, an imagined company near Kodaikanal, owes: 9% debentures of ₹8,00,000, of which ₹2,00,000 are to be redeemed on 31 December 2026; a term loan of ₹5,00,000 from a bank, of which an instalment of ₹1,00,000 falls due on 30 September 2026; and public deposits of ₹1,50,000 repayable in 2028. Find the amount shown as Long-term Borrowings (in ₹).',
  sol: `Long-term part: debentures 8,00,000 − 2,00,000 = 6,00,000; loan 5,00,000 − 1,00,000 = 4,00,000; public deposits 1,50,000; total = 6,00,000 + 4,00,000 + 1,50,000 = ${inr(TH.subTotal.ltb)}, that is ₹${inr(TH.subTotal.ltb)}. The ${inr(TH.subTotal.stb)} due within twelve months is a current maturity.`,
}));

const AB = bs({ date: D, only: 'el', items: [['10% Debentures (secured on the factory building)', [['10% Debentures (secured on the factory building)', 600000], ['Current maturities shown under Short-term Borrowings', -100000]], 'Debentures'], ['Term loan from a bank (secured on machinery)', [['Term loan from a bank (secured on machinery)', 400000], ['Current maturities shown under Short-term Borrowings', -80000]], 'Long-term loan from a bank'], ['Public deposits repayable in 2028', 120000, 'Public deposits repayable after twelve months'], ['Current maturities of long-term borrowings (debentures due 30 September 2026)', 100000, 'Current maturities of long-term borrowings'], ['Current maturities of long-term borrowings (loan instalment due 31 January 2027)', 80000, 'Current maturities of long-term borrowings'], ['Bank overdraft', 35000]] });
eq([AB.subTotal.ltb, AB.subTotal.stb, AB.noteNo.ltb, AB.noteNo.stb], [940000, 215000, 1, 2], 's3_borrowings');
Q('s3_borrowings', short({
  t: [2, 3], d: 3, c: 'application', marks: 3,
  stem: 'Arisinagundi Rubber Boots Ltd, an imagined company at Kollur, has the following borrowings on 31 March 2026: 10% debentures of ₹6,00,000 secured on the factory building, of which ₹1,00,000 are due for redemption on 30 September 2026; a term loan of ₹4,00,000 from a bank secured on machinery, with an instalment of ₹80,000 due on 31 January 2027; public deposits of ₹1,20,000 repayable in 2028; and a bank overdraft of ₹35,000. Prepare the notes on Long-term Borrowings and Short-term Borrowings.',
  model: `${md(NOTE_HEADERS, AB.notesRows, [2, 3])}\n\nIn the Balance Sheet: Long-term Borrowings ${rs(AB.subTotal.ltb)} (Note 1) under Non-current Liabilities; Short-term Borrowings ${rs(AB.subTotal.stb)} (Note 2) under Current Liabilities.`,
  sol: 'Move every amount repayable within twelve months out of the long-term note and into the short-term one.',
  scheme: [[`Long-term borrowings ${rs(AB.subTotal.ltb)} with the security stated`, 1], ['Current maturities of the debentures and the loan identified', 1], [`Short-term borrowings ${rs(AB.subTotal.stb)} with the overdraft`, 1]],
}));

const PG = { loan: 900000, n: 6 };
const PGi = PG.loan / PG.n;
const PGout = PG.loan - 2 * PGi;
const PGb = bs({ title: 'Balance Sheet of Purwa Ginger Paste Ltd as at 31 March 2026 (extract)', date: D, only: 'el', items: [['Term loan from a bank', [['Term loan from a bank', PGout], ['Current maturities shown under Short-term Borrowings', -PGi]], 'Long-term loan from a bank'], ['Current maturities of long-term borrowings (instalment due 31 January 2027)', PGi, 'Current maturities of long-term borrowings']] });
eq([PGi, PGout, PGb.subTotal.ltb, PGb.subTotal.stb], [150000, 600000, 450000, 150000], 's2_curmat');
Q('s2_curmat', short({
  t: [2, 3], d: 3, c: 'application', marks: 2,
  stem: 'On 1 April 2024 Purwa Ginger Paste Ltd, an imagined company at Semariya, borrowed ₹9,00,000 from a bank, repayable in six equal yearly instalments on 31 January, the first on 31 January 2025. Both instalments due so far were paid on time. Show how the loan appears in the Balance Sheet as at 31 March 2026.',
  model: `Instalment = 9,00,000 ÷ 6 = ${inr(PGi)}. Outstanding on 31 March 2026 = 9,00,000 − 2 × ${inr(PGi)} = ${inr(PGout)}. The instalment due on 31 January 2027 is within twelve months.\n\n${PGb.md}\n\n**Notes to Accounts**\n\n${PGb.notesMd}`,
  sol: 'Find the balance outstanding, then split it at the twelve-month line.',
  scheme: [[`Outstanding ${rs(PGout)} and the current instalment ${rs(PGi)}`, 1], [`Long-term ${rs(PGb.subTotal.ltb)}; current maturity under Short-term Borrowings`, 1]],
}));

Q('m_curmat', mcq({
  t: [2, 3], d: 3, c: 'application',
  stem: 'Soochipara Cardamom Dryers Ltd, an imagined company at Meppadi, has 9% debentures of ₹6,00,000 outstanding on 31 March 2026. Debentures of ₹1,50,000 are to be redeemed on 31 December 2026 and the rest in 2029. Under the amended Schedule III, the amount shown under Short-term Borrowings for these debentures is',
  opts: [rs(150000), rs(450000), rs(600000), 'nil, because debentures are always long-term borrowings'],
  sol: `The part repayable within twelve months is a current maturity of a long-term borrowing, so ${rs(150000)} goes to Short-term Borrowings; 6,00,000 − 1,50,000 = ${inr(450000)} stays under Long-term Borrowings.`,
}));

Q('ar_curmat', ar({
  t: [2, 3], d: 3, c: 'analysis', key: 'd',
  a: 'Muthyala Turmeric Exports Ltd, an imagined company at Bhupalpally, shows the instalment of its term loan due in December 2026 under Long-term Borrowings in its Balance Sheet as at 31 March 2026.',
  r: 'Under the amended Schedule III, current maturities of long-term borrowings are shown under Short-term Borrowings.',
  sol: 'A is false: the December 2026 instalment falls due within twelve months, so it must be moved to Short-term Borrowings. R is true and states the rule.',
}));

// --- property, plant and equipment
const JR = subNote(1, [['Plant and machinery', [['Plant and machinery', 900000], ['Accumulated depreciation (1,80,000 + 90,000 for the year)', -270000]]]]);
eq([pct(10, 900000), JR.total], [90000, 630000], 'm_ppe_net');
Q('m_ppe_net', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'The trial balance of Jonha Rice Flakes Ltd, an imagined mill near Ranchi, shows Plant and machinery at cost ₹9,00,000 and Accumulated depreciation on it ₹1,80,000. Depreciation for 2025-26 is to be charged at 10% on cost. The amount for plant and machinery included in Property, Plant and Equipment on 31 March 2026 is',
  opts: [rs(JR.total), rs(900000 - 180000), rs(900000 - 90000), rs(900000)],
  sol: `Depreciation = 10% of 9,00,000 = ${inr(90000)}; accumulated depreciation = 1,80,000 + 90,000 = 2,70,000; net = 9,00,000 − 2,70,000 = ${inr(JR.total)}.`,
}));

const KB = subNote(1, [['Land', 400000], ['Buildings', [['Buildings', 800000], ['Accumulated depreciation (1,60,000 + 40,000 for the year)', -200000]]], ['Furniture and fittings', [['Furniture and fittings', 150000], ['Depreciation for the year', -15000]]]]);
eq([pct(5, 800000), pct(10, 150000), KB.total], [40000, 15000, 1135000], 'n_ppe');
Q('n_ppe', num({
  t: 2, d: 3, c: 'application', value: KB.total, unit: '₹',
  stem: 'Kumbakkarai Jute Bags Ltd, an imagined company at Periyakulam, has these balances on 31 March 2026 before depreciation for the year: Land ₹4,00,000; Buildings at cost ₹8,00,000 with accumulated depreciation ₹1,60,000; Furniture and fittings at book value ₹1,50,000; Patents ₹60,000. Depreciation is 5% on the cost of buildings and 10% on the book value of furniture. Find the amount shown against Property, Plant and Equipment (in ₹).',
  sol: `Buildings 8,00,000 − (1,60,000 + 40,000) = 6,00,000; furniture 1,50,000 − 15,000 = 1,35,000; property, plant and equipment = 4,00,000 + 6,00,000 + 1,35,000 = ${inr(KB.total)}, that is ₹${inr(KB.total)}. Patents are an intangible asset, shown separately.`,
}));

const KTp = subNote(1, [['Land', 500000], ['Buildings', [['Buildings', 900000], ['Accumulated depreciation (1,80,000 + 45,000 for the year)', -225000]]], ['Plant and machinery', [['Plant and machinery', 600000], ['Accumulated depreciation (1,50,000 + 60,000 for the year)', -210000]]]]);
const KTi = subNote(2, [['Patents', [['Patents', 120000], ['Amortisation for the year', -20000]]]]);
eq([pct(5, 900000), pct(10, 600000), KTp.total, KTi.total], [45000, 60000, 1565000, 100000], 's3_ppe_note');
Q('s3_ppe_note', short({
  t: [2, 3], d: 3, c: 'application', marks: 3,
  stem: 'Kudlu Theertha Rosewood Crafts Ltd, an imagined company at Hebri, shows in its trial balance on 31 March 2026: Land ₹5,00,000; Buildings ₹9,00,000; Plant and machinery ₹6,00,000; Accumulated depreciation on buildings ₹1,80,000 and on plant and machinery ₹1,50,000; Patents ₹1,20,000. For 2025-26, charge depreciation at 5% on the cost of buildings and 10% on the cost of plant and machinery, and write off ₹20,000 of patents. Prepare the notes on Property, Plant and Equipment and on Intangible Assets.',
  model: `${md(NOTE_HEADERS, [...KTp.rows, ...KTi.rows], [2, 3])}\n\nOn the face of the Balance Sheet, under Non-current Assets, (a) Property, Plant and Equipment and Intangible Assets: (i) Property, Plant and Equipment ${rs(KTp.total)}; (ii) Intangible Assets ${rs(KTi.total)}.`,
  sol: 'Add this year\'s charge to the accumulated depreciation before deducting it from cost; patents go to a separate note.',
  scheme: [['Buildings net 6,75,000', 1], [`Plant net 3,90,000; Property, Plant and Equipment ${rs(KTp.total)}`, 1], [`Intangible Assets ${rs(KTi.total)} in a separate note`, 1]],
}));

const KD = subNote(1, [['Sundry debtors', [['Sundry debtors', 320000], ['Provision for doubtful debts', -16000]]], ['Bills receivable', 40000]]);
eq([pct(5, 320000), KD.total], [16000, 344000], 'm_pdd');
Q('m_pdd', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Khandadhar Steel Buckets Ltd, an imagined company at Bonai, has sundry debtors of ₹3,20,000, bills receivable of ₹40,000 and an old provision for doubtful debts of ₹6,000. The provision is to be kept at 5% of debtors on 31 March 2026. Trade Receivables in its Balance Sheet amount to',
  opts: [rs(KD.total), rs(320000 - 6000 + 40000), rs(320000 + 40000), rs(320000 - 16000)],
  sol: `Provision required = 5% of 3,20,000 = 16,000 (not the old 6,000); trade receivables = 3,20,000 − 16,000 + 40,000 = ${inr(KD.total)}.`,
}));

const DM = subNote(1, [['Sundry debtors', [['Sundry debtors', 280000], ['Provision for doubtful debts', -14000]]], ['Bills receivable', 35000]]);
eq([pct(5, 280000), DM.total], [14000, 301000], 's2_receivables');
Q('s2_receivables', short({
  t: 2, d: 2, c: 'application', marks: 2,
  stem: 'Duduma Millet Snacks Ltd, an imagined company at Lamtaput, has sundry debtors of ₹2,80,000 and bills receivable of ₹35,000 on 31 March 2026. Its provision for doubtful debts stands at ₹8,000 and is to be raised to 5% of debtors. Prepare the note on Trade Receivables.',
  model: `${DM.md}\n\nThe provision is ₹14,000 (5% of 2,80,000); the increase of ₹6,000 is charged against this year's profit.`,
  sol: 'Deduct the provision required at the year end, not the old balance, from the debtors.',
  scheme: [['Provision of ₹14,000 deducted from debtors', 1], [`Bills receivable added; total ${rs(DM.total)}`, 1]],
}));

// --- why notes; profit working; other current liabilities
Q('s2_why_notes', short({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'A shareholder of Dhuandhar Marble Crafts Ltd, an imagined company at Bhedaghat, asks why its Balance Sheet shows only one figure against Share Capital and sends him to "Note 1". Give two reasons why Schedule III requires notes to accounts, using the share capital note as an example.',
  model: '1. **To keep the Balance Sheet short and readable:** the face of the Balance Sheet shows only the total of each sub-head (one figure for Share Capital), and the details are moved to a numbered note.\n2. **To give the details the law requires:** the note on Share Capital discloses the authorised, issued and subscribed capital, the number and face value of shares, shares fully paid and not fully paid, calls in arrears and forfeited shares, which a reader needs to judge the capital structure.',
  sol: 'One reason about the face of the Balance Sheet, one about the disclosure the note provides.',
  scheme: [['Balance Sheet kept brief; totals on the face, details in notes', 1], ['Required disclosure explained with the share capital example', 1]],
}));

const BH = working('Working: profit for the year', [['Profit for the year before adjustments (given)', 420000], ['Less: Depreciation on machinery', -65000], ['Less: Provision for doubtful debts raised from 4,000 to 11,000', -7000], ['Less: Outstanding rent', -9000], ['Add: Prepaid insurance', 5000], ['Less: Interest accrued on debentures', -18000], ['Less: Provision for tax', -80000]], 'Profit for the year');
const BHs = subNote(2, [['Surplus, i.e. balance in the Statement of Profit and Loss', [['Balance on 1 April 2025', 34000], ['Add: Profit for the year', BH.total], ['Transfer to general reserve', -50000]]]]);
eq([BH.total, BHs.total], [246000, 230000], 's3_profit_working');
Q('s3_profit_working', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: 'Benne Hole Ginger Ltd, an imagined company at Hulekal, has a profit of ₹4,20,000 for 2025-26 before the following adjustments: (i) depreciation on machinery ₹65,000; (ii) the provision for doubtful debts, now ₹4,000, to be raised to ₹11,000; (iii) rent of ₹9,000 outstanding; (iv) insurance of ₹5,000 prepaid; (v) interest of ₹18,000 accrued on debentures; (vi) provision for tax ₹80,000. Its surplus on 1 April 2025 was ₹34,000, and ₹50,000 is to be transferred to General Reserve. Compute the profit for the year and the surplus carried to the note on Reserves and Surplus.',
  model: `${BH.md}\n\n${BHs.md}`,
  sol: 'Each adjustment changes the profit once; then the surplus is opening balance plus profit less the transfer.',
  scheme: [['Depreciation and the increase in provision deducted', 1], [`Other adjustments; profit ${rs(BH.total)}`, 1], [`Surplus ${rs(BHs.total)} after the transfer`, 1]],
}));

const RP = { deb: 400000, rate: 9 };
const RPint = (RP.deb * RP.rate) / 100 / 2;
const RPocl = subNote(1, [['Outstanding salaries', 22000, 'Outstanding expenses'], ['Interest accrued on 9% debentures (half-year to 31 March 2026)', RPint, 'Interest accrued on debentures'], ['Calls in advance', 5000], ['Unpaid dividend', 3000]]);
const RPstp = subNote(2, [['Provision for tax', 70000]]);
eq([RPint, RPocl.total, RPstp.total], [18000, 48000, 70000], 's3_ocl');
Q('s3_ocl', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: 'Randha Paper Plates Ltd, an imagined company at Bhandardara, has 9% debentures of ₹4,00,000 on which interest is paid half-yearly; the interest for the half-year to 31 March 2026 has not been paid or recorded. Its other balances include: sundry creditors ₹90,000; outstanding salaries ₹22,000; calls in advance ₹5,000; unpaid dividend ₹3,000; provision for tax ₹70,000. Prepare the notes on Other Current Liabilities and Short-term Provisions as at 31 March 2026.',
  model: `Interest accrued = 4,00,000 × 9% × 6/12 = ${inr(RPint)}.\n\n${md(NOTE_HEADERS, [...RPocl.rows, ...RPstp.rows], [2, 3])}\n\nSundry creditors (₹90,000) belong to Trade Payables, not to either note.`,
  sol: 'Work out the half-year interest first; then sort the dues: definite amounts other than to suppliers are other current liabilities, the estimated tax a provision.',
  scheme: [[`Interest accrued ${rs(RPint)}`, 1], [`Other Current Liabilities ${rs(RPocl.total)}`, 1], [`Short-term Provisions ${rs(RPstp.total)}; creditors excluded`, 1]],
}));

// --- equity and liabilities extract
const BK = shareNote({ fv: 10, authorised: 150000, issued: 100000, full: 100000 });
const BKel = bs({ title: 'Balance Sheet of Burude Kokum Butter Ltd as at 31 March 2026 (Equity and Liabilities)', date: D, share: BK, only: 'el', items: [['Securities premium', 100000], ['General reserve', 180000], ['Surplus, i.e. balance in the Statement of Profit and Loss', 95000], ['10% Debentures (redeemable in 2031)', 300000, 'Debentures'], ['Provision for gratuity payable after twelve months', 45000], ['Sundry creditors', 160000], ['Bills payable', 30000], ['Outstanding wages', 12000, 'Outstanding expenses'], ['Provision for tax', 65000]] });
eq(BKel.total, 1987000, 's3_el_extract');
Q('s3_el_extract', short({
  t: [1, 2], d: 3, c: 'application', marks: 3,
  stem: `Burude Kokum Butter Ltd, an imagined company at Kodkani, has 1,00,000 equity shares of ₹10 each, fully paid, out of an authorised 1,50,000 shares. Its other credit balances on 31 March 2026 are:\n\n${given([['Securities premium', 100000], ['General reserve', 180000], ['Surplus, i.e. balance in the Statement of Profit and Loss', 95000], ['10% Debentures (redeemable in 2031)', 300000], ['Provision for gratuity payable after twelve months', 45000], ['Sundry creditors', 160000], ['Bills payable', 30000], ['Outstanding wages', 12000], ['Provision for tax', 65000]])}\n\nPrepare the Equity and Liabilities part of its Balance Sheet as per Schedule III, with notes.`,
  model: `${BKel.md}\n\n**Notes to Accounts**\n\n${BKel.notesMd}`,
  sol: 'Group each balance under its sub-head, give a note where a sub-head has more than one item, and total the part.',
  scheme: [["Shareholders' Funds with the share capital and reserves notes", 1], ['Non-current Liabilities: borrowings and long-term provision', 1], [`Current Liabilities with the trade payables note; total ${rs(BKel.total)}`, 1]],
}));

// --- full balance sheet without adjustments
const LM = shareNote({ fv: 10, authorised: 100000, issued: 80000, full: 80000 });
const LMbs = bs({ title: 'Balance Sheet of Lingmala Leather Sandals Ltd as at 31 March 2026', date: D, share: LM, items: [['General reserve', 150000], ['Surplus, i.e. balance in the Statement of Profit and Loss', 70000], ['9% Debentures', 250000, 'Debentures'], ['Sundry creditors', 115000], ['Provision for tax', 45000], ['Land and buildings', 720000], ['Plant and machinery', [['Plant and machinery', 360000], ['Accumulated depreciation', -90000]]], ['Raw materials (leather and soles)', 140000, 'Raw materials'], ['Finished goods', 110000], ['Sundry debtors', 125000], ['Cash at bank', 55000], ['Prepaid expenses', 10000]] });
eq([LMbs.total, LMbs.subTotal.ppe], [1430000, 990000], 'l5_bs_small');
Q('l5_bs_small', long({
  t: [1, 2], d: 3, c: 'application', marks: 5,
  stem: `Lingmala Leather Sandals Ltd, an imagined company at Mahabaleshwar, has an authorised capital of 1,00,000 equity shares of ₹10 each, of which 80,000 are issued, subscribed and fully paid. Its other balances on 31 March 2026 are:\n\n${given([['General reserve', 150000], ['Surplus, i.e. balance in the Statement of Profit and Loss', 70000], ['9% Debentures', 250000], ['Sundry creditors', 115000], ['Provision for tax', 45000], ['Land and buildings', 720000], ['Plant and machinery (cost)', 360000], ['Accumulated depreciation on plant and machinery', 90000], ['Raw materials (leather and soles)', 140000], ['Finished goods', 110000], ['Sundry debtors', 125000], ['Cash at bank', 55000], ['Prepaid expenses', 10000]])}\n\n(a) Prepare the notes to accounts. [3]\n\n(b) Prepare the Balance Sheet as per Schedule III Part I. [2]`,
  model: `**(a) Notes to Accounts**\n\n${LMbs.notesMd}\n\n**(b)**\n\n${LMbs.md}`,
  sol: 'Notes first (share capital, reserves, fixed assets, inventories), then carry the note totals to the face and check both parts agree.',
  scheme: [['(a) Share capital and reserves notes', 1], ['(a) Property, plant and equipment note', 1], ['(a) Inventories note', 1], ['(b) Equity and Liabilities part', 1], [`(b) Assets part; both totals ${rs(LMbs.total)}`, 1]],
}));

// --- assets side
const DP = bs({ title: 'Balance Sheet of Dabhosa Plywood Ltd as at 31 March 2026 (Assets)', date: D, only: 'as', items: [['Factory buildings', [['Factory buildings', 700000], ['Accumulated depreciation (1,40,000 + 35,000 for the year)', -175000]], 'Buildings'], ['Plant and machinery', [['Plant and machinery', 500000], ['Accumulated depreciation (1,00,000 + 50,000 for the year)', -150000]]], ['Goodwill', 80000], ['Non-current investments', 120000], ['Raw materials (veneer logs)', 160000, 'Raw materials'], ['Finished goods', 140000], ['Sundry debtors', [['Sundry debtors', 240000], ['Provision for doubtful debts', -12000]]], ['Bills receivable', 26000], ['Cash at bank', 74000], ['Cash in hand', 6000], ['Prepaid insurance', 8000, 'Prepaid expenses']] });
eq([DP.subTotal.ppe, DP.subTotal.tr, DP.total], [875000, 254000, 1717000], 'l5_assets');
Q('l5_assets', long({
  t: 2, d: 3, c: 'application', marks: 5,
  stem: `Dabhosa Plywood Ltd, an imagined company at Jawhar, extracts these asset balances on 31 March 2026 before the year-end adjustments:\n\n${given([['Factory buildings (cost)', 700000], ['Accumulated depreciation on factory buildings', 140000], ['Plant and machinery (cost)', 500000], ['Accumulated depreciation on plant and machinery', 100000], ['Goodwill', 80000], ['Non-current investments', 120000], ['Raw materials (veneer logs)', 160000], ['Finished goods', 140000], ['Sundry debtors', 240000], ['Bills receivable', 26000], ['Cash at bank', 74000], ['Cash in hand', 6000], ['Insurance paid for April to June 2026, included in expenses', 8000]])}\n\nAdjustments: depreciate buildings at 5% and plant and machinery at 10% on cost; create a provision for doubtful debts at 5% of debtors; the insurance paid in advance is to be carried forward.\n\n(a) Prepare the notes on Property, Plant and Equipment and Trade Receivables. [3]\n\n(b) Prepare the Assets part of the Balance Sheet as per Schedule III. [2]`,
  model: `**(a) Notes to Accounts**\n\n${DP.notesMd}\n\n**(b)**\n\n${DP.md}\n\nDepreciation: buildings 5% of 7,00,000 = 35,000; plant 10% of 5,00,000 = 50,000. Provision: 5% of 2,40,000 = 12,000. Prepaid insurance ₹8,000 is an Other Current Asset.`,
  sol: 'Bring each adjustment into the asset it touches; notes carry the working, the face only the totals.',
  scheme: [['(a) Buildings and plant net of accumulated depreciation', 1], [`(a) Property, Plant and Equipment ${rs(DP.subTotal.ppe)}`, 1], [`(a) Trade Receivables ${rs(DP.subTotal.tr)}`, 1], ['(b) Non-current assets with goodwill and investments', 1], [`(b) Current assets with prepaid insurance; total ${rs(DP.total)}`, 1]],
}));
check(pct(5, 700000) === 35000 && pct(10, 500000) === 50000 && pct(5, 240000) === 12000, 'Dabhosa adjustments');

// --- trial balance with adjustments (5 marks)
const VJsc = shareNote({ fv: 10, authorised: 100000, issued: 60000, full: 60000 });
const VJ = finalAccounts({
  title: 'Balance Sheet of Vajrai Silk Cocoons Ltd as at 31 March 2026', date: D, opening: O, share: VJsc,
  tb: [
    ['Land and buildings', 'dr', 450000],
    ['Machinery', 'dr', 300000, 'Plant and machinery'],
    ['Stock of silk yarn', 'dr', 120000, 'Finished goods'],
    ['Sundry debtors', 'dr', 90000],
    ['Cash at bank', 'dr', 70000],
    ['Equity share capital (60,000 shares of ₹10 each, fully paid)', 'cr', 600000, 'Equity share capital'],
    ['General reserve', 'cr', 80000],
    ['Statement of Profit and Loss (1 April 2025)', 'cr', 30000, 'SURPLUS'],
    ['Profit for the year before the adjustments below', 'cr', 160000, 'PROFIT'],
    ['Sundry creditors', 'cr', 160000],
  ],
  adj: { dep: [['Machinery', 30000]], tax: 35000, toGR: 25000, contingent: [['Proposed dividend at 10% on paid-up capital (subject to approval at the annual general meeting)', pct(10, 600000)]] },
});
eq([VJ.profit, VJ.surplus, VJ.total, VJ.tb.total], [95000, 100000, 1000000, 1030000], 'l5_tb_adjust');
Q('l5_tb_adjust', long({
  t: [2, 3], d: 4, c: 'application', marks: 5,
  stem: `The trial balance of Vajrai Silk Cocoons Ltd, an imagined company at Bhambavli, after its profit for the year has been worked out, is given below. The authorised capital is 1,00,000 equity shares of ₹10 each.\n\n${VJ.tb.md}\n\nAdjustments: ${adjList(['depreciate machinery by ₹30,000;', 'provide ₹35,000 for tax;', 'transfer ₹25,000 to General Reserve;', 'the directors propose a dividend of 10% on the paid-up capital.']).replace(/\n/g, ' ')}\n\n(a) Work out the profit for the year and prepare the note on Reserves and Surplus. [2]\n\n(b) Prepare the Balance Sheet as at 31 March 2026 with the other notes. [3]`,
  model: `**(a)**\n\n${VJ.profitWorking}\n\n${noteOf(VJ, 'rs')}\n\n**(b)**\n\n${VJ.md}\n\n**Notes to Accounts**\n\n${VJ.notesMd}\n\nThe proposed dividend (${rs(pct(10, 600000))}) is not deducted anywhere: it is disclosed as a contingent liability.`,
  sol: 'Adjust the profit, carry it to the surplus with the transfer, and keep the proposed dividend out of the figures.',
  scheme: [[`(a) Profit for the year ${rs(VJ.profit)}`, 1], [`(a) Reserves and Surplus ${rs(VJ.subTotal.rs)}`, 1], ['(b) Liabilities with provision for tax', 1], ['(b) Assets with machinery net of depreciation', 1], [`(b) Totals ${rs(VJ.total)} and proposed dividend as a contingent liability`, 1]],
}));

// --- practice: full ISC-style practical (8 marks)
const SKsc = shareNote({ fv: 10, authorised: 200000, issued: 120000, full: 120000 });
const SK = finalAccounts({
  title: 'Balance Sheet of Sahastrakund Soya Chunks Ltd as at 31 March 2026', date: D, opening: O, share: SKsc,
  tb: [
    ['Land', 'dr', 400000],
    ['Factory buildings', 'dr', 800000, 'Buildings'],
    ['Plant and machinery', 'dr', 900000],
    ['Computer software', 'dr', 60000],
    ['Non-current investments', 'dr', 150000],
    ['Raw materials (soybean)', 'dr', 210000, 'Raw materials'],
    ['Finished goods', 'dr', 230000],
    ['Sundry debtors', 'dr', 300000],
    ['Bills receivable', 'dr', 45000],
    ['Cash at bank', 'dr', 182000],
    ['Cash in hand', 'dr', 8000],
    ['Equity share capital (1,20,000 shares of ₹10 each, fully paid)', 'cr', 1200000, 'Equity share capital'],
    ['Securities premium', 'cr', 150000],
    ['General reserve', 'cr', 220000],
    ['Statement of Profit and Loss (1 April 2025)', 'cr', 55000, 'SURPLUS'],
    ['Profit for the year before the adjustments below', 'cr', 420000, 'PROFIT'],
    ['9% Debentures (6,000 of ₹100 each)', 'cr', 600000, 'Debentures'],
    ['Sundry creditors', 'cr', 185000],
    ['Bills payable', 'cr', 40000],
    ['Accumulated depreciation on factory buildings', 'cr', 160000, 'Accumulated depreciation', 'Factory buildings'],
    ['Accumulated depreciation on plant and machinery', 'cr', 245000, 'Accumulated depreciation', 'Plant and machinery'],
    ['Provision for doubtful debts', 'cr', 10000],
  ],
  adj: {
    dep: [['Factory buildings', pct(5, 800000)], ['Plant and machinery', pct(10, 900000)], ['Computer software', 12000]],
    pdd: pct(5, 300000),
    outstanding: [['Outstanding wages', 16000]],
    prepaid: [['Prepaid insurance', 7000]],
    debInterest: ['Interest accrued on 9% debentures (half-year to 31 March 2026)', pct(9, 600000) / 2],
    tax: 70000,
    toGR: 40000,
    curMat: [['9% Debentures (6,000 of ₹100 each)', 150000, '1,500 debentures due for redemption on 31 August 2026']],
    contingent: [['Proposed final dividend at 12% on the paid-up equity capital, subject to approval at the annual general meeting', pct(12, 1200000)]],
  },
});
eq([SK.tb.total, SK.profit, SK.surplus, SK.subTotal.rs, SK.total], [3285000, 167000, 182000, 592000, 2730000], 'l8_full1');
Q('l8_full1', long({
  t: [1, 2, 3], d: 4, c: 'application', marks: 8,
  stem: `The following trial balance of Sahastrakund Soya Chunks Ltd, an imagined company at Kinwat, was extracted on 31 March 2026 after the profit for the year (before the adjustments below) had been found. Its authorised capital is 2,00,000 equity shares of ₹10 each.\n\n${SK.tb.md}\n\nAdjustments:\n\n${adjList(['Depreciate factory buildings at 5% and plant and machinery at 10% on cost; amortise computer software by ₹12,000.', 'Raise the provision for doubtful debts to 5% of debtors.', 'Wages of ₹16,000 are outstanding and insurance of ₹7,000 is prepaid.', 'Interest on the 9% debentures for the half-year ended 31 March 2026 is unpaid and not yet recorded.', 'Provide ₹70,000 for tax and transfer ₹40,000 to General Reserve.', '1,500 of the debentures are to be redeemed on 31 August 2026.', 'The directors propose a final dividend of 12% on the paid-up capital.'])}\n\nPrepare the Balance Sheet of the company as at 31 March 2026 as per Schedule III Part I, with notes to accounts and a working for the profit for the year.`,
  model: `**Working**\n\n${SK.profitWorking}\n\n${SK.md}\n\n**Notes to Accounts**\n\n${SK.notesMd}`,
  sol: 'Each adjustment is posted twice: once in the profit working and once in a note; the totals then agree.',
  scheme: [[`Profit for the year ${rs(SK.profit)}`, 2], [`Share capital and Reserves and Surplus ${rs(SK.subTotal.rs)}`, 1], ['Borrowings split with current maturities', 1], ['Other current liabilities and provision for tax', 1], ['Fixed assets net of depreciation and amortisation', 1], ['Current assets with the provision and prepaid insurance', 1], [`Totals ${rs(SK.total)} and the contingent-liability note`, 1]],
}));

// ================================================================ t03 Recent amendments
Q('m_propdiv', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'On 20 May 2026 the Board of Nuranang Kiwi Jams Ltd, an imagined company at Jang, recommends a final dividend for 2025-26 that the shareholders will vote on in August. In the Balance Sheet as at 31 March 2026, the ISC syllabus requires this proposed dividend to be',
  opts: ['disclosed in the notes under contingent liabilities and commitments, with no amount in the Balance Sheet', 'shown under Short-term Provisions as a liability', 'deducted from the surplus in Reserves and Surplus', 'shown under Other Current Liabilities as unpaid dividend'],
  sol: 'Until the members approve it at the annual general meeting there is no obligation to pay, so it is not provided for; it is disclosed as a contingent liability.',
}));

const KL = { shares: 80000, fv: 10, rate: 12 };
const KLd = pct(KL.rate, KL.shares * KL.fv);
eq(KLd, 96000, 'm_div_amt');
Q('m_div_amt', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'Keoti Lime Kilns Ltd, an imagined company at Rewa, has an authorised capital of ₹10,00,000 and a paid-up capital of 80,000 equity shares of ₹10 each, fully paid. For 2025-26 its directors propose a dividend of 12% on the paid-up capital. In the final accounts as at 31 March 2026 the proposed dividend is',
  opts: [`${rs(KLd)}, disclosed in the notes as a contingent liability`, `${rs(KLd)}, shown under Short-term Provisions`, `${rs(pct(12, 1000000))}, disclosed in the notes as a contingent liability`, `${rs(KLd)}, deducted from the surplus in Reserves and Surplus`],
  sol: `Dividend = 12% of 8,00,000 = ${inr(KLd)}, calculated on the paid-up (not the authorised) capital; it is only disclosed until the shareholders approve it.`,
}));

Q('m_iaud', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'Palaruvi Tapioca Starch Ltd, an imagined company at Punalur, has spent ₹3,40,000 so far on production-planning software that its own team is still writing; it will be ready in October 2026. On 31 March 2026 this cost is shown under',
  opts: [subOf('Intangible assets under development'), subOf('Computer software'), subOf('Capital work-in-progress'), subOf('Prepaid expenses')],
  sol: 'The amended Schedule III keeps an intangible still being developed apart from finished intangibles and from capital work-in-progress, which is for tangible assets under construction.',
}));

Q('m_secprem', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Bahuti Mustard Oil Ltd, an imagined company at Mauganj, issued shares at a premium in 2024. In its Balance Sheet as at 31 March 2026, the amended Schedule III shows the premium received as',
  opts: ['Securities Premium, under Reserves and Surplus', 'Securities Premium Reserve, under Other Long-term Liabilities', 'part of Share Capital, added to subscribed capital', 'Capital Reserve, under Other Current Liabilities'],
  sol: 'The item in Reserves and Surplus now reads "Securities Premium" (it used to be "Securities Premium Reserve"); it is a capital receipt belonging to the shareholders, not a liability.',
}));
check(classOf('Securities premium').key === 'rs', 'securities premium');

Q('ar_propdiv', ar({
  t: 3, d: 3, c: 'understanding', key: 'c',
  a: 'Lodh Tomato Ketchup Ltd, an imagined company at Netarhat, discloses the final dividend proposed by its Board for 2025-26 as a contingent liability in the notes, instead of providing for it.',
  r: 'A proposed dividend becomes a liability of the company on the date the Board of Directors recommends it.',
  sol: 'A is true. R is false: the dividend becomes an obligation only when the shareholders declare it at the annual general meeting, which is why it is not provided for at the year end.',
}));

Q('ar_ppe', ar({
  t: 3, d: 3, c: 'understanding', key: 'b',
  a: 'Bhimlat Sandstone Ltd, an imagined quarrying company at Bundi, shows its stone-cutting machines under Property, Plant and Equipment at cost less accumulated depreciation.',
  r: 'The amended Schedule III uses the caption "Property, Plant and Equipment" where the earlier version said "Tangible Assets".',
  sol: 'Both are true, but R only explains the name of the caption; the machines are shown net because the note presents fixed assets at cost less the depreciation charged so far.',
}));

Q('tf_propdiv', tf({
  t: 3, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Bogatha Jaggery Ltd, an imagined company at Wazeedu, must show the 10% dividend proposed by its directors for 2025-26 under Short-term Provisions in its Balance Sheet as at 31 March 2026.',
  sol: 'A proposed dividend is not a liability until the shareholders approve it; the ISC syllabus has it disclosed under contingent liabilities in the notes.',
}));

Q('fb_contingent', fb({
  t: 3, d: 2, c: 'recall',
  stem: 'The final dividend proposed by the directors of Iruppu Pepper Graders Ltd, an imagined company at Kutta, is not provided for in its accounts as at 31 March 2026; it is disclosed in the notes under ___ liabilities and commitments.',
  acc: [['Contingent', 'contingent']],
  sol: 'It goes under contingent liabilities and commitments (to the extent not provided for), because the shareholders have not yet approved it.',
}));

Q('mt_amend', match({
  t: 3, d: 2, c: 'understanding', marks: 2,
  stem: 'Barkana Kokum Syrups Ltd, an imagined company at Mastikatte, is redrafting its Balance Sheet under the amended Schedule III. Match each of its items with the way the amended Schedule III (as applied in the ISC syllabus) presents it.',
  pairs: [
    ['Its syrup plant and godowns, owned and in use', 'Property, Plant and Equipment (the former "Tangible Assets")'],
    ['Premium received on its last share issue', 'Securities Premium, under Reserves and Surplus'],
    ['Final dividend recommended by its Board after the year end', 'Contingent liabilities and commitments, in the notes'],
    ['Instalment of its term loan due within twelve months', 'Current maturities of long-term borrowings, under Short-term Borrowings'],
  ],
  sol: 'Each pair is one of the amendments named in the syllabus: the new caption for tangible fixed assets, the shorter name for the premium, the proposed dividend as a contingent liability, and current maturities among short-term borrowings.',
}));

const PY = { shares: 70000, fv: 10, rate: 15 };
const PYd = pct(PY.rate, PY.shares * PY.fv);
eq(PYd, 105000, 'n_div');
Q('n_div', num({
  t: 3, d: 2, c: 'application', value: PYd, unit: '₹',
  stem: 'Pykara Eucalyptus Oil Ltd, an imagined distillery near Pykara, has 70,000 equity shares of ₹10 each, fully paid. Its directors propose a dividend of 15% for 2025-26. Find the amount disclosed as a contingent liability in its notes to accounts as at 31 March 2026 (in ₹).',
  sol: `Paid-up capital = 70,000 × ₹10 = ₹7,00,000; proposed dividend = 15% of 7,00,000 = ${inr(PYd)}, that is ₹${inr(PYd)}. It is disclosed, not provided for.`,
}));

const VZ = { paid: 500000, rate: 10 };
const VZd = pct(VZ.rate, VZ.paid);
eq(VZd, 50000, 's2_propdiv');
Q('s2_propdiv', short({
  t: 3, d: 2, c: 'understanding', marks: 2,
  stem: 'After the year end, the Board of Vazhachal Bamboo Rafts Ltd, an imagined company at Athirappilly, recommends a dividend of 10% on its paid-up capital of ₹5,00,000 for 2025-26. The accountant wants to create a Proposed Dividend Account under Short-term Provisions. Explain whether this is correct, and show how the dividend should appear in the final accounts as at 31 March 2026.',
  model: `**Not correct.** A dividend proposed by the Board becomes an obligation only when the shareholders declare it at the annual general meeting, after the Balance Sheet date. On 31 March 2026 there is no present obligation, so no provision is made and the surplus is not reduced. It is disclosed in the notes:\n\n${contingentNote([['Proposed dividend at 10% on paid-up capital of ₹5,00,000, subject to approval at the annual general meeting', VZd]])}`,
  sol: 'Explain why there is no liability yet, then disclose the amount in the contingent-liabilities note.',
  scheme: [['Not a provision: approval by shareholders needed', 1], [`Disclosed as a contingent liability, ${rs(VZd)}`, 1]],
}));

Q('s2_amend', short({
  t: 3, d: 2, c: 'understanding', marks: 2,
  stem: 'Hogenakkal Coracle Tours Ltd, an imagined company at Pennagaram, owns coracles and a booking office, has bought a reservation app and is building a new boating jetty. Explain two changes made by the amended Schedule III Part I to the way these fixed assets are presented.',
  model: `1. **New caption:** the old "Fixed assets: Tangible assets / Intangible assets" heading is replaced by **${'Property, Plant and Equipment and Intangible Assets'}**, with sub-heads (i) Property, Plant and Equipment (the coracles and office), (ii) Intangible Assets (the reservation app), (iii) Capital Work-in-Progress (the jetty under construction) and (iv) Intangible Assets under Development.\n2. **Separate lines for work in progress:** an asset still being built (the jetty) is shown as Capital Work-in-Progress, and an intangible still being developed would be shown as Intangible Assets under Development, so that finished assets in use are not mixed with incomplete ones.`,
  sol: 'Name the new caption with its sub-heads, then show where the incomplete assets go.',
  scheme: [['Property, Plant and Equipment caption with its sub-heads', 1], ['Capital work-in-progress / intangible assets under development explained', 1]],
}));
check(subOf('Capital work-in-progress').startsWith('Property, Plant and Equipment and Intangible Assets'), 'cwip group');

const LG = { paid: 750000, rate: 10, claim: 40000 };
const LGd = pct(LG.rate, LG.paid);
Q('s3_contingent', short({
  t: 3, d: 3, c: 'understanding', marks: 3,
  stem: 'On 31 March 2026 Lalguli Sugarcane Juice Ltd, an imagined company at Mainalli, has two matters pending: (i) its Board will propose a dividend of 10% on the paid-up capital of ₹7,50,000 at its meeting in May 2026; (ii) a former employee has filed a claim of ₹40,000 for wrongful dismissal, which the company denies and expects to defeat. Explain why neither is provided for, and prepare the note on contingent liabilities.',
  model: `- **(i) Proposed dividend:** it becomes payable only when the shareholders declare it at the annual general meeting; at the Balance Sheet date there is no obligation, so it is disclosed, not provided for (the ISC syllabus places it under contingent liabilities).\n- **(ii) Claim not acknowledged as a debt:** whether the company must pay depends on a future court decision it expects to win; a possible obligation of this kind is disclosed, not recorded.\n\n${contingentNote([['Claim by a former employee not acknowledged as a debt', LG.claim], ['Proposed dividend at 10% on paid-up capital, subject to approval at the annual general meeting', LGd]])}`,
  sol: 'Both are possible obligations that depend on a future event; disclose each with its amount.',
  scheme: [['(i) proposed dividend: no obligation until declared', 1], ['(ii) claim: depends on an uncertain future event', 1], [`Note with both amounts (${rs(LGd)} and ${rs(LG.claim)})`, 1]],
}));
eq(LGd, 75000, 's3_contingent');

const AJ = { deb: 1000000, rate: 11, red: 5, cur: 200000 };
const AJprem = pct(AJ.red, AJ.deb);
const AJint = pct(AJ.rate, AJ.deb) / 2;
const AJb = bs({ title: 'Balance Sheet of Amboli Jackfruit Papad Ltd as at 31 March 2026 (extract)', date: D, only: 'el', items: [['11% Debentures (10,000 of ₹100 each, redeemable at a premium of 5%)', [['11% Debentures (10,000 of ₹100 each, redeemable at a premium of 5%)', AJ.deb], ['Current maturities shown under Short-term Borrowings', -AJ.cur]], 'Debentures'], ['Premium on redemption of debentures', AJprem], ['Current maturities of long-term borrowings (2,000 debentures due on 31 January 2027)', AJ.cur, 'Current maturities of long-term borrowings'], ['Interest accrued on debentures (half-year to 31 March 2026)', AJint, 'Interest accrued on debentures']] });
eq([AJprem, AJint, AJb.subTotal.ltb, AJb.total], [50000, 55000, 800000, 1105000], 'l5_debentures');
Q('l5_debentures', long({
  t: [2, 3], d: 4, c: 'application', marks: 5,
  stem: 'Amboli Jackfruit Papad Ltd, an imagined company at Sawantwadi, issued 10,000 11% debentures of ₹100 each at par in 2023, redeemable at a premium of 5%: 2,000 debentures on 31 January 2027 and the rest in 2030. The full premium on redemption was credited to Premium on Redemption of Debentures Account when the debentures were issued. Interest is paid on 30 September and 31 March; the interest due on 31 March 2026 was still unpaid on that date.\n\n(a) Prepare the extract of the Equity and Liabilities part of the Balance Sheet as at 31 March 2026 with the notes for these items. [3]\n\n(b) Explain the two presentation rules of the amended Schedule III that you applied to the debentures. [2]',
  model: `**(a)**\n\n${AJb.md}\n\n**Notes to Accounts**\n\n${AJb.notesMd}\n\nWorkings: premium on redemption 5% of 10,00,000 = ${inr(AJprem)}; half-year interest 10,00,000 × 11% × 6/12 = ${inr(AJint)}.\n\n**(b)** (1) The 2,000 debentures due on 31 January 2027 fall due within twelve months, so ${rs(AJ.cur)} is taken out of Long-term Borrowings and shown as **current maturities of long-term borrowings under Short-term Borrowings**. (2) The debentures still payable after twelve months stay under **Long-term Borrowings**, with the nature of the security and the terms of redemption stated in the note; the premium payable on redemption is not a borrowing and goes to **Other Long-term Liabilities**.`,
  sol: 'Split the debentures at twelve months, keep the redemption premium as another long-term liability, and record the unpaid interest as a current liability.',
  scheme: [[`(a) Long-term Borrowings ${rs(AJb.subTotal.ltb)} and Short-term Borrowings ${rs(AJ.cur)}`, 1], [`(a) Premium on redemption ${rs(AJprem)} under Other Long-term Liabilities`, 1], [`(a) Interest accrued ${rs(AJint)} under Other Current Liabilities`, 1], ['(b) current maturities rule', 1], ['(b) long-term part, security and the redemption premium explained', 1]],
}));

const BW = working('Working: profit for the year', [['Profit for the year before adjustments (given)', 360000], ['Less: Depreciation on plant', -48000], ['Less: Outstanding electricity charges', -7000], ['Less: Provision for tax', -75000]], 'Profit for the year');
const BWrs = subNote(2, [['General reserve', [['Balance on 1 April 2025', 140000], ['Add: Transfer from surplus', 50000]]], ['Surplus, i.e. balance in the Statement of Profit and Loss', [['Balance on 1 April 2025', 26000], ['Add: Profit for the year', BW.total], ['Transfer to general reserve', -50000]]]]);
const BWd = pct(15, 900000);
eq([BW.total, BWrs.total, BWd], [230000, 396000, 135000], 'l5_dividend');
Q('l5_dividend', long({
  t: [2, 3], d: 4, c: 'analysis', marks: 5,
  stem: 'Bhivpuri Banana Wafers Ltd, an imagined company at Karjat, has a paid-up capital of 90,000 equity shares of ₹10 each. Its profit for 2025-26 before adjustments is ₹3,60,000. Still to be recorded: depreciation on plant ₹48,000, outstanding electricity charges ₹7,000 and provision for tax ₹75,000. On 1 April 2025 it had a General Reserve of ₹1,40,000 and a surplus of ₹26,000. The directors transfer ₹50,000 to General Reserve and propose a dividend of 15% on the paid-up capital.\n\n(a) Compute the profit for the year and prepare the note on Reserves and Surplus as at 31 March 2026. [3]\n\n(b) The accountant wants to deduct the proposed dividend from the surplus. Explain why this is wrong and how the dividend is shown. [2]',
  model: `**(a)**\n\n${BW.md}\n\n${BWrs.md}\n\n**(b)** The dividend is only a recommendation of the Board; it becomes a liability when the shareholders declare it at the annual general meeting, after 31 March 2026. Deducting it now would understate the surplus and show a liability that does not yet exist. It is disclosed in the notes under ${CONTINGENT.toLowerCase()}: proposed dividend at 15% on 9,00,000 = ${rs(BWd)}.`,
  sol: 'Adjust the profit, then build the reserves note with the transfer; the proposed dividend never enters the figures.',
  scheme: [[`(a) Profit for the year ${rs(BW.total)}`, 1], ['(a) General reserve 1,90,000 after the transfer', 1], [`(a) Surplus 2,06,000; total ${rs(BWrs.total)}`, 1], ['(b) No obligation until declared by shareholders', 1], [`(b) Disclosed as a contingent liability, ${rs(BWd)}`, 1]],
}));
check(26000 + BW.total - 50000 === 206000, 'Bhivpuri surplus');

// --- practice: second full practical (8 marks)
const PPsc = shareNote({ fv: 10, authorised: 150000, issued: 100000, full: 97700, part: { n: 1500, called: 10, arrears: 4500 }, forfeited: { n: 800, amount: 4800 } });
const PP = finalAccounts({
  title: 'Balance Sheet of Patalpani Potato Wafers Ltd as at 31 March 2026', date: D, opening: O, share: PPsc,
  tb: [
    ['Buildings', 'dr', 650000],
    ['Plant and machinery', 'dr', 480000],
    ['Trademarks', 'dr', 90000],
    ['Packing line under installation', 'dr', 120000, 'Capital work-in-progress'],
    ['Advance paid for a new slicer', 'dr', 35000, 'Capital advances'],
    ['Stock of potatoes and oil', 'dr', 95000, 'Raw materials'],
    ['Stock of wafers', 'dr', 140000, 'Finished goods'],
    ['Sundry debtors', 'dr', 160000],
    ['Cash at bank', 'dr', 98000],
    ['Calls in arrears', 'dr', 4500],
    ['Equity share capital (99,200 shares of ₹10 each, fully called up)', 'cr', 992000, 'Equity share capital'],
    ['Share forfeiture', 'cr', 4800, 'Forfeited shares'],
    ['Capital reserve', 'cr', 25000],
    ['Profit for the year before the adjustments below', 'cr', 158000, 'PROFIT'],
    ['Term loan from a bank', 'cr', 400000, 'Long-term loan from a bank'],
    ['Sundry creditors', 'cr', 150400],
    ['Advance received from customers', 'cr', 12000],
    ['Accumulated depreciation on buildings', 'cr', 65000, 'Accumulated depreciation', 'Buildings'],
    ['Accumulated depreciation on plant and machinery', 'cr', 96000, 'Accumulated depreciation', 'Plant and machinery'],
    ['Statement of Profit and Loss (1 April 2025, debit balance)', 'dr', 30700, 'SURPLUS'],
  ],
  adj: {
    dep: [['Buildings', pct(5, 650000)], ['Plant and machinery', pct(10, 480000)]],
    pdd: pct(5, 160000),
    outstanding: [['Outstanding salaries', 9000]],
    tax: 18000,
    curMat: [['Term loan from a bank', 60000, 'instalment due on 30 June 2026']],
    contingent: [['Claim by a transporter not acknowledged as a debt', 22000]],
  },
});
eq([PPsc.amount, PP.tb.total, PP.profit, PP.surplus, PP.subTotal.rs, PP.total], [992300, 1903200, 42500, 11800, 36800, 1618500], 'l8_full2');
Q('l8_full2', long({
  t: [1, 2, 3], d: 5, c: 'analysis', marks: 8,
  stem: `Patalpani Potato Wafers Ltd, an imagined company at Mhow, has an authorised capital of 1,50,000 equity shares of ₹10 each; 1,00,000 shares were issued and fully called up. 800 shares, on which ₹6 per share had been received, were forfeited and have not been reissued; on 1,500 of the remaining shares the final call of ₹3 per share is unpaid. Its trial balance on 31 March 2026, after the profit for the year (before the adjustments below) had been found, is:\n\n${PP.tb.md}\n\nAdjustments:\n\n${adjList(['Depreciate buildings at 5% and plant and machinery at 10% on cost.', 'Create a provision for doubtful debts at 5% of debtors.', 'Salaries of ₹9,000 are outstanding; provide ₹18,000 for tax.', 'An instalment of ₹60,000 of the term loan falls due on 30 June 2026.', 'A transporter has claimed ₹22,000 for damaged goods; the company disputes the claim.'])}\n\nPrepare the Balance Sheet as at 31 March 2026 as per Schedule III Part I, with notes to accounts and a working for the profit for the year.`,
  model: `**Working**\n\n${PP.profitWorking}\n\n${PP.md}\n\n**Notes to Accounts**\n\n${PP.notesMd}\n\nThe opening debit balance of ${rs(30700)} is set off against this year's profit, leaving a surplus of ${rs(PP.surplus)}.`,
  sol: 'Work the share capital note from the shares, arrears and forfeiture; set this year\'s profit against the old loss; then post each adjustment twice.',
  scheme: [[`Share capital note ${rs(PPsc.amount)}`, 1], [`Profit for the year ${rs(PP.profit)} and surplus ${rs(PP.surplus)}`, 2], ['Term loan split with the current maturity', 1], ['Other current liabilities and short-term provision', 1], ['Fixed assets, capital work-in-progress and capital advance', 1], ['Current assets with the provision', 1], [`Totals ${rs(PP.total)} and the disputed claim as a contingent liability`, 1]],
}));

export const FACTS = { MPU, NPU, KN, KNsf, PY, PYd };
