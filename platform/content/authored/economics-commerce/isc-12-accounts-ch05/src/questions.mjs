// ISC 12 Accounts, ch05 Dissolution of a Partnership Firm — question bank.
// Every firm, person and figure is imagined by SOYL and labelled as such; no textbook illustration or
// exercise and no CISCE specimen or past-paper item is reused. Every amount and statement is computed
// with acc.mjs from the givens and checked (entries balance, accounts close, balance sheets total, every
// capital account and the Bank/Cash Account close at nil); the expected values pinned below (hand-checked)
// catch any drift in the figures. ISC 2027 rules applied throughout: related funds and provisions go to
// the Realisation Account; bank overdraft through the Bank/Cash Account and bank loan through Realisation;
// silent tangible assets at book value, silent intangibles, accrued income and prepaid expenses at nil,
// silent liabilities in full; partner's loan repaid in cash even against a debit capital; loan to a
// partner debited to his capital; current accounts closed to capitals.
import { Q, mcq, ar, tf, fb, match, num, short, long } from './lib.mjs';
import { rs, inr, check, sum, pct, journal, tAccount, balanceSheet, settleCapitals, splitRatio, section48, realisation, dissolve, mdTable } from './acc.mjs';

const C = (n) => `${n}'s Capital A/c`;
const DATE = '31 March 2026';
const eq = (a, b, what) => check(JSON.stringify(a) === JSON.stringify(b), `${what}: got ${JSON.stringify(a)}, expected ${JSON.stringify(b)}`);
const nl = (lines) => lines.map((l, i) => `${i + 1}. ${l}`).join('\n');
const bsHead = (who) => `**Balance Sheet of ${who} as at ${DATE}**`;

// ================================================================ t01 Meaning; Section 48
Q('m_firm_vs_pship', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which of these events at Tulunadu Cashew Processors, an imagined three-partner firm at Bantwal, brings the firm itself to an end, and not merely the old partnership agreement?',
  opts: ['All three partners agree to close the cashew business, sell its assets and settle its accounts', 'One partner retires and the other two carry on the cashew business', 'A fourth partner is admitted and the business continues', 'The three partners change their profit-sharing ratio from the next year'],
  sol: 'Retirement, admission and a change in ratio only reconstitute the firm, which carries on with adjusted books. When the business is closed and every account settled, the firm itself is dissolved.',
}));

Q('m_s48_order', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'When Hoysala Granite Polishers, an imagined firm at Belur, is wound up, the cash left after selling every asset is applied under Section 48 of the Indian Partnership Act, 1932. Immediately after the debts owed to third parties, it goes to pay',
  opts: ["each partner rateably what is due to him for advances (loans) to the firm, as distinct from capital", "each partner rateably what is due to him on account of capital", 'the realisation expenses of the firm', 'the residue to the partners in their profit-sharing ratio'],
  sol: 'The order is: debts to third parties; then partners\' advances (loans) rateably; then partners\' capitals rateably; and any residue is divided in the profit-sharing ratio.',
}));

Q('m_s48_loss', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Under Section 48 of the Indian Partnership Act, 1932, the losses of Gopalpur Prawn Farms, an imagined firm being dissolved, including any deficiency of capital, are met',
  opts: ['first out of profits, next out of capital, and lastly by the partners individually in their profit-sharing ratio', 'first out of capital, next out of profits, and lastly by the partners in their capital ratio', 'by the partners equally, whatever the deed says about sharing profits', 'out of the partners\' loans to the firm before anything else'],
  sol: 'Section 48(a) uses profits first, then capital, and then calls on the partners individually in the proportion in which they were entitled to share profits.',
}));

Q('ar_firm', ar({
  t: 1, d: 2, c: 'understanding', key: 'a',
  a: 'When the partners of Bhitarkanika Boat Tours, an imagined firm, close the business and settle all its accounts, the partnership among them also comes to an end.',
  r: 'Dissolution of the firm ends the relation of partnership among all the partners, not just between some of them.',
  sol: 'Both statements are true. Because dissolving the firm ends the relation among every partner, the partnership necessarily ends with it, so R explains A.',
}));

Q('ar_loan_rank', ar({
  t: [1, 4], d: 3, c: 'analysis', key: 'c',
  a: 'On the dissolution of Satpura Safari Lodge, an imagined firm, a loan given to the firm by one of its partners is repaid before any amount is paid to the partners on account of capital.',
  r: "A partner's loan to the firm is an outside liability, so it is transferred to the Realisation Account along with the creditors.",
  sol: "A is true: Section 48 places partners' advances after third-party debts but before capital. R is false: a partner's loan is not an outside liability and never passes through the Realisation Account; it is repaid through the Bank or Cash Account.",
}));

Q('tf_reconstitution', tf({
  t: 1, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? When one of the three partners of Lachung Orchid Nursery, an imagined firm, retires and the other two carry on the nursery, the firm is dissolved and its books are closed.',
  sol: 'Only the old partnership agreement ends. The firm continues under a new agreement between the two continuing partners, so its books are adjusted for the retirement, not closed.',
}));

Q('fb_s48', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'The order in which the cash of Sarangpur Brassware, an imagined firm being wound up, is paid out to creditors, to partners for loans and to partners for capital is laid down in Section ___ of the Indian Partnership Act, 1932.',
  acc: [['48', 'forty-eight']],
  sol: 'Section 48 of the Act sets the mode of settlement of accounts between partners after dissolution.',
}));

const NSP = section48({ cash: 186000, outside: 80000, loans: { Farhana: 20000 }, capitals: { Farhana: 60000, Jigme: 50000 }, ratio: [1, 1] });
eq([NSP.loss, NSP.capPay], [24000, { Farhana: 48000, Jigme: 38000 }], 'n_s48_payout');
Q('n_s48_payout', num({
  t: 1, d: 3, c: 'application', value: NSP.capPay.Jigme, unit: '₹',
  stem: `Farhana and Jigme, equal partners in Gulmarg Ski Rentals, an imagined firm, close it down. After every asset has been sold, the firm holds ${rs(NSP.cash)} in cash. It owes outside creditors ${rs(NSP.outside)} and owes Farhana ${rs(NSP.loans.Farhana)} on a loan; the capitals are Farhana ${rs(NSP.capitals.Farhana)} and Jigme ${rs(NSP.capitals.Jigme)}. How much is finally paid to Jigme on account of his capital (in ₹)?`,
  sol: `Claims ${inr(NSP.claims)} − cash ${inr(NSP.cash)} = loss ${inr(NSP.loss)}, borne equally (${inr(NSP.part.Jigme)} each). Jigme receives ${inr(NSP.capitals.Jigme)} − ${inr(NSP.part.Jigme)} = ${rs(NSP.capPay.Jigme)}.`,
}));

Q('s2_distinguish', short({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Using Amarkantak Trail Guides, an imagined firm of three partners, as the setting, give two points of difference between dissolution of the partnership and dissolution of the firm.',
  model: '| Basis | Dissolution of partnership | Dissolution of the firm |\n|---|---|---|\n| Business | Continues: e.g. one guide retires and the other two carry on | Comes to an end: the trail-guide business is closed |\n| Books of account | Not closed; adjusted through revaluation, goodwill and capital entries | Closed: assets are realised, liabilities paid and every account settled through the Realisation Account |',
  sol: 'Contrast what happens to the business and to the books in the two cases.',
  scheme: [['Difference based on the business continuing or closing', 1], ['Difference based on the books being adjusted or closed', 1]],
}));

Q('s3_s48_rules', short({
  t: 1, d: 2, c: 'recall', marks: 3,
  stem: 'Majhauli Leather Works, an imagined firm, is being wound up and its partners ask how the final settlement will run. State the rules for settling accounts between partners after dissolution under Section 48 of the Indian Partnership Act, 1932.',
  model: '**(a) Losses**, including deficiencies of capital, are paid first out of profits, next out of capital and lastly, if necessary, by the partners individually in the proportions in which they were entitled to share profits.\n\n**(b) Assets** of the firm, including any sums contributed by partners to make up deficiencies of capital, are applied in this order:\n1. in paying the debts of the firm to third parties;\n2. in paying to each partner rateably what is due to him from the firm for advances (loans) as distinguished from capital;\n3. in paying to each partner rateably what is due to him on account of capital;\n4. the residue, if any, is divided among the partners in the proportions in which they were entitled to share profits.',
  sol: 'Write the loss rule first, then the four-step order in which the assets are applied.',
  scheme: [['Rule for losses (profits, then capital, then partners in the profit-sharing ratio)', 1], ['Third-party debts first, then partners\' loans rateably', 1], ['Capitals rateably, then residue in the profit-sharing ratio', 1]],
}));

const SSC = section48({ cash: 310000, outside: 130000, loans: { Imtiaz: 25000 }, capitals: { Hetal: 80000, Imtiaz: 60000, Jumana: 40000 }, ratio: [2, 2, 1] });
eq([SSC.loss, SSC.part, SSC.capPay], [25000, { Hetal: 10000, Imtiaz: 10000, Jumana: 5000 }, { Hetal: 70000, Imtiaz: 50000, Jumana: 35000 }], 's3_s48_calc');
Q('s3_s48_calc', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: `Hetal, Imtiaz and Jumana share profits 2 : 2 : 1 in Pachpadra Salt Works, an imagined firm, which they wind up. After all assets are sold and the realisation expenses paid, ${rs(SSC.cash)} is left. Creditors and outstanding wages together amount to ${rs(SSC.outside)}; Imtiaz has lent the firm ${rs(SSC.loans.Imtiaz)}. Capitals stand at Hetal ${rs(SSC.capitals.Hetal)}, Imtiaz ${rs(SSC.capitals.Imtiaz)} and Jumana ${rs(SSC.capitals.Jumana)}; there are no reserves. Find the loss and show how the ${rs(SSC.cash)} is paid out under Section 48.`,
  model: `**Loss** = total claims − cash = (${inr(SSC.outside)} + ${inr(SSC.loanTotal)} + ${inr(sum(Object.values(SSC.capitals)))}) − ${inr(SSC.cash)} = ${inr(SSC.claims)} − ${inr(SSC.cash)} = **${rs(SSC.loss)}**, shared 2 : 2 : 1: Hetal ${rs(SSC.part.Hetal)}, Imtiaz ${rs(SSC.part.Imtiaz)}, Jumana ${rs(SSC.part.Jumana)}.\n\n${mdTable(['Order (Section 48)', 'Paid to', '₹'], [['1', 'Creditors and outstanding wages', inr(SSC.outside)], ['2', "Imtiaz's loan", inr(SSC.loans.Imtiaz)], ['3', `Hetal's capital (${inr(SSC.capitals.Hetal)} − ${inr(SSC.part.Hetal)})`, inr(SSC.capPay.Hetal)], ['3', `Imtiaz's capital (${inr(SSC.capitals.Imtiaz)} − ${inr(SSC.part.Imtiaz)})`, inr(SSC.capPay.Imtiaz)], ['3', `Jumana's capital (${inr(SSC.capitals.Jumana)} − ${inr(SSC.part.Jumana)})`, inr(SSC.capPay.Jumana)], ['', '**Total = cash available**', `**${inr(SSC.cash)}**`]], [2])}`,
  sol: 'Find the shortfall against all claims, share it in the profit-sharing ratio, then pay in the statutory order.',
  scheme: [['Loss and its 2 : 2 : 1 split', 1], ['Outside liabilities, then Imtiaz\'s loan', 1], ['Capitals net of loss, totalling the cash', 1]],
}));

const LSF = section48({ cash: 222000, outside: 90000, loans: { Nishikant: 12000 }, capitals: { Malhar: 84000, Nishikant: 52000 }, ratio: [3, 1] });
eq([LSF.loss, LSF.part, LSF.capPay], [16000, { Malhar: 12000, Nishikant: 4000 }, { Malhar: 72000, Nishikant: 48000 }], 'l5_s48');
Q('l5_s48', long({
  t: 1, d: 3, c: 'application', marks: 5,
  stem: `Malhar and Nishikant share profits 3 : 1 in Ajanta Cave Tours, an imagined travel firm.\n\n(a) Malhar wants to retire while Nishikant carries on the business; a month later they instead decide to close the business altogether. Explain which of these is a dissolution of the partnership and which a dissolution of the firm, giving one reason each. [2]\n\n(b) On closure, every asset is sold and ${rs(LSF.cash)} is available. Creditors are owed ${rs(LSF.outside)}, Nishikant's loan to the firm is ${rs(LSF.loans.Nishikant)}, and the capitals are Malhar ${rs(LSF.capitals.Malhar)} and Nishikant ${rs(LSF.capitals.Nishikant)}. Calculate the loss and show the payments in the order required by Section 48. [3]`,
  model: `**(a)** Malhar's retirement with Nishikant carrying on would be a **dissolution of the partnership** only: the old agreement ends, but the firm and its books continue with adjustments. Closing the business altogether is a **dissolution of the firm**: the relation between both partners ends, assets are realised, liabilities paid and the books closed.\n\n**(b)** Loss = (${inr(LSF.outside)} + ${inr(LSF.loanTotal)} + ${inr(LSF.capitals.Malhar)} + ${inr(LSF.capitals.Nishikant)}) − ${inr(LSF.cash)} = **${rs(LSF.loss)}**, borne 3 : 1: Malhar ${rs(LSF.part.Malhar)}, Nishikant ${rs(LSF.part.Nishikant)}.\n\n${mdTable(['Order', 'Payment', '₹'], [['1', 'Creditors', inr(LSF.outside)], ['2', "Nishikant's loan", inr(LSF.loans.Nishikant)], ['3', "Malhar's capital", inr(LSF.capPay.Malhar)], ['3', "Nishikant's capital", inr(LSF.capPay.Nishikant)], ['', '**Total**', `**${inr(LSF.cash)}**`]], [2])}`,
  sol: 'Part (a) turns on whether the business continues; part (b) finds the shortfall, shares it 3 : 1 and pays in the statutory order.',
  scheme: [['(a) Retirement: dissolution of partnership, with reason', 1], ['(a) Closure: dissolution of the firm, with reason', 1], ['(b) Loss calculated', 1], ['(b) Loss shared 3 : 1', 1], ['(b) Payments in Section 48 order, totalling the cash', 1]],
}));

// ================================================================ t02 Realisation Account
Q('m_ra_nature', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Bhadrachalam Bamboo Crafts, an imagined firm, opens a Realisation Account on the day it is dissolved. This account is',
  opts: ['a nominal account that shows the profit or loss on selling the assets and paying the outside liabilities', 'a personal account of the partners that shows their final capitals', 'a real account that records the cash received from the assets', 'a memorandum statement kept outside the double-entry books'],
  sol: 'Like a profit and loss account for the winding up, it collects book values, realised values and payments; its balance is the profit or loss on realisation, shared by the partners.',
}));

Q('m_ra_excluded', mcq({
  t: [2, 4], d: 2, c: 'understanding',
  stem: 'Under the ISC syllabus, which balance in the books of Contai Rope Makers, an imagined firm being dissolved, is NOT transferred to the Realisation Account?',
  opts: ['Bank overdraft', 'Bank loan', 'Provision for doubtful debts', 'Trade creditors'],
  sol: 'The ISC note sends a bank overdraft to the Bank/Cash Account; a bank loan, creditors and a provision against debtors all go to the Realisation Account.',
}));

Q('m_iff', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The balance sheet of Panchgani Strawberry Farms, an imagined firm being dissolved, shows investments of ₹50,000 and an Investment Fluctuation Fund of ₹6,000. Following the ISC syllabus, the fund is',
  opts: ['credited to the Realisation Account, because the investments it relates to are taken to that account', "credited to the partners' capital accounts in their profit-sharing ratio", 'debited to the Realisation Account as a loss', 'deducted from the cash realised from the investments, without any entry'],
  sol: 'The ISC note says that when an asset or liability is taken to the Realisation Account, any related fund or reserve goes there too, not to the capital accounts.',
}));

Q('tf_iff_capitals', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Under the ISC syllabus, the provision for depreciation on machinery in the books of Niphad Grape Crushers, an imagined firm being dissolved, is divided among the partners\' capital accounts, while the machinery goes to the Realisation Account.',
  sol: 'A provision related to an asset follows the asset: it is credited to the Realisation Account when the machinery is transferred there at its gross figure.',
}));

Q('ar_reserve', ar({
  t: [2, 4], d: 2, c: 'understanding', key: 'd',
  a: 'The general reserve of Wayanad Pepper Growers, an imagined firm being dissolved, which is not set aside for any particular asset or liability, is credited to the Realisation Account.',
  r: "A reserve related to no asset or liability belongs to the partners and is credited to their capital accounts in the profit-sharing ratio.",
  sol: 'A is false: an unrelated reserve does not pass through the Realisation Account. R is true and states the correct treatment.',
}));

Q('fb_nominal', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'The Realisation Account opened when Ladakh Apricot Driers, an imagined firm, is wound up is a ___ account, and its balance is closed to the partners\' capital accounts.',
  acc: [['nominal']],
  sol: 'It is a nominal account: it measures a gain or loss (on realisation) and is closed to the capital accounts.',
}));

const SIL = { furniture: 26000, patents: 14000, prepaid: 3000, salary: 9000 };
Q('m_silent_tangible', mcq({
  t: 2, d: 2, c: 'application',
  stem: `Nothing is said in the dissolution terms of Unakoti Cane Furniture, an imagined firm, about the furniture, which stands in the books at ${rs(SIL.furniture)}. Following the ISC syllabus, the entry for the furniture after its transfer to the Realisation Account is`,
  opts: [`Bank A/c Dr. To Realisation A/c ${rs(SIL.furniture)} (realised at book value)`, 'No entry: the furniture realises nothing', `Partners' Capital A/cs Dr. To Realisation A/c ${rs(SIL.furniture)}`, `Realisation A/c Dr. To Bank A/c ${rs(SIL.furniture)}`],
  sol: 'When the question is silent about a tangible asset or an investment, ISC assumes it is realised at its book value.',
}));

Q('m_silent_intangible', mcq({
  t: 2, d: 2, c: 'application',
  stem: `Patents of ${rs(SIL.patents)} and prepaid rent of ${rs(SIL.prepaid)} appear in the balance sheet of Chavara Coir Mats, an imagined firm being dissolved, and the terms say nothing about either. Under the ISC syllabus, the amount realised from these two items is`,
  opts: ['nil: an intangible asset and a prepaid expense not mentioned are taken to realise nothing', `${rs(SIL.patents + SIL.prepaid)}: both are realised at book value`, `${rs(SIL.patents)} for the patents only`, `${rs(SIL.prepaid)} for the prepaid rent only`],
  sol: 'ISC treats intangible assets, accrued income and prepaid expenses that the question is silent about as realising nothing (nil value).',
}));

Q('tf_prepaid', tf({
  t: 2, d: 2, c: 'application', ans: true,
  stem: 'True or false? Following the ISC syllabus, accrued commission shown as an asset by Dhubri Jute Twine, an imagined firm being dissolved, is taken to realise nothing if the question does not mention it.',
  sol: 'Accrued income, prepaid expenses and intangible assets that the question is silent about are taken at nil value.',
}));

Q('m_silent_liab', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `On the dissolution of Jharsuguda Steel Scrap Traders, an imagined firm, outstanding salaries of ${rs(SIL.salary)} appear in the balance sheet, but the terms say nothing about them. Under the ISC syllabus, they are`,
  opts: [`paid in full: Realisation A/c Dr. To Bank A/c ${rs(SIL.salary)}`, 'ignored, because no payment is stated', `credited to the partners' capital accounts`, `paid at a discount agreed with the staff`],
  sol: 'If the question is silent about the payment of a liability, ISC requires it to be paid out in full.',
}));

const BBK = { land: 150000, tm: 20000, accrued: 3000, wages: 8000 };
Q('s2_silent', short({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: `Bokaro Brick Kilns, an imagined firm, is dissolved. Its assets and liabilities have been transferred to the Realisation Account. The terms are silent about land (book value ${rs(BBK.land)}), a trademark (${rs(BBK.tm)}), accrued interest (${rs(BBK.accrued)}) and outstanding wages (${rs(BBK.wages)}). Pass the journal entries for the realisation of these items under the ISC assumptions, and state where no entry is needed.`,
  model: `${journal([
    { dr: [['Bank A/c', BBK.land]], cr: [['Realisation A/c', BBK.land]], nar: 'land realised at book value, as the terms are silent' },
    { dr: [['Realisation A/c', BBK.wages]], cr: [['Bank A/c', BBK.wages]], nar: 'outstanding wages paid in full, as the terms are silent' },
  ]).md}\n\nNo entry for the trademark (intangible) or the accrued interest (accrued income): when the question is silent they realise nothing, so the Realisation Account bears their full book value as a loss.`,
  sol: 'Apply the four ISC assumptions: tangible at book value, intangible and accrued items nil, liabilities in full.',
  scheme: [['Land at book value and wages paid in full (entries)', 1], ['Trademark and accrued interest: nil, no entry', 1]],
}));

const IFE = { inv: 60000, iff: 9000, taken: 52000 };
Q('s2_iff_entry', short({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: `Sundarnagar Seed Bank, an imagined firm, holds investments of ${rs(IFE.inv)} against which an Investment Fluctuation Fund of ${rs(IFE.iff)} stands in the books. On dissolution, Yashasvi, a partner, takes over the investments at ${rs(IFE.taken)}. Pass the journal entries for the investments and the fund under the ISC syllabus.`,
  model: journal([
    { dr: [['Realisation A/c', IFE.inv]], cr: [['Investments A/c', IFE.inv]], nar: 'investments transferred to the Realisation Account' },
    { dr: [['Investment Fluctuation Fund A/c', IFE.iff]], cr: [['Realisation A/c', IFE.iff]], nar: 'related fund transferred to the Realisation Account (ISC note)' },
    { dr: [[C('Yashasvi'), IFE.taken]], cr: [['Realisation A/c', IFE.taken]], nar: 'investments taken over by Yashasvi' },
  ]).md,
  sol: 'The fund follows its asset into the Realisation Account; the takeover is charged to the partner\'s capital.',
  scheme: [['Investments and the fund transferred to Realisation', 1], ["Takeover debited to Yashasvi's capital", 1]],
}));

Q('m_takeover_entry', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'On the dissolution of Vasco Fishing Nets, an imagined firm, Wilfred, a partner, takes over the delivery van (already transferred to the Realisation Account) at an agreed value of ₹48,000. The entry is',
  opts: ["Wilfred's Capital A/c Dr. To Realisation A/c ₹48,000", "Realisation A/c Dr. To Wilfred's Capital A/c ₹48,000", "Wilfred's Capital A/c Dr. To Delivery Van A/c ₹48,000", "Bank A/c Dr. To Realisation A/c ₹48,000"],
  sol: 'An asset taken over by a partner reduces what the firm owes him, so his capital is debited and the Realisation Account credited with the agreed value.',
}));

Q('m_partner_assumes', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Rukhsar, a partner of Bidar Bidriware, an imagined firm being dissolved, agrees to discharge the firm\'s bills payable of ₹15,000 herself. The bills payable have already been transferred to the Realisation Account. The entry is',
  opts: ["Realisation A/c Dr. To Rukhsar's Capital A/c ₹15,000", "Rukhsar's Capital A/c Dr. To Realisation A/c ₹15,000", "Bills Payable A/c Dr. To Rukhsar's Capital A/c ₹15,000", 'No entry, as no cash leaves the firm'],
  sol: 'By paying a firm\'s liability out of her own pocket, Rukhsar increases what the firm owes her: the Realisation Account bears the payment and her capital is credited.',
}));

const MCA = { cred: 40000, stockBook: 27000, agreed: 25000 };
const MCAcash = MCA.cred - MCA.agreed;
eq(MCAcash, 15000, 'm_creditor_asset');
Q('m_creditor_asset', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Creditors of ${rs(MCA.cred)} of Kanker Lac Bangles, an imagined firm being dissolved, accept its stock (book value ${rs(MCA.stockBook)}) at an agreed value of ${rs(MCA.agreed)} and the balance of their claim in cash. Both the stock and the creditors have already been transferred to the Realisation Account. The entry now required is`,
  opts: [`Realisation A/c Dr. To Bank A/c ${rs(MCAcash)}`, `Creditors A/c Dr. To Bank A/c ${rs(MCAcash)}`, `Realisation A/c Dr. To Bank A/c ${rs(MCA.cred)}`, `Creditors A/c Dr. To Stock A/c ${rs(MCA.agreed)} and To Bank A/c ${rs(MCAcash)}`],
  sol: `The stock passing to the creditors needs no entry; only the cash paid, ${inr(MCA.cred)} − ${inr(MCA.agreed)} = ${inr(MCAcash)}, is recorded, through the Realisation Account.`,
}));

const MRR = { assets: 240000, prov: 6000, cred: 50000, cash: 210000, credPaid: 48000, exp: 2500 };
const MRRloss = MRR.assets + MRR.credPaid + MRR.exp - (MRR.prov + MRR.cred + MRR.cash);
eq(MRRloss, 24500, 'm_ra_result');
Q('m_ra_result', mcq({
  t: 2, d: 3, c: 'application',
  stem: `At the dissolution of Irinjalakuda Bell Metal Works, an imagined firm, assets other than cash with a book value of ${rs(MRR.assets)} (debtors at their gross figure), a provision for doubtful debts of ${rs(MRR.prov)} and creditors of ${rs(MRR.cred)} are transferred to the Realisation Account. The assets realise ${rs(MRR.cash)}, the creditors accept ${rs(MRR.credPaid)} in full settlement and realisation expenses of ${rs(MRR.exp)} are paid. The result on realisation is`,
  opts: [`a loss of ${rs(MRRloss)}`, `a loss of ${rs(MRRloss + MRR.prov)}`, `a loss of ${rs(MRRloss + MRR.cred - MRR.credPaid)}`, `a loss of ${rs(MRRloss - MRR.exp)}`],
  sol: `Debit side ${inr(MRR.assets)} + ${inr(MRR.credPaid)} + ${inr(MRR.exp)} = ${inr(MRR.assets + MRR.credPaid + MRR.exp)}; credit side ${inr(MRR.prov)} + ${inr(MRR.cred)} + ${inr(MRR.cash)} = ${inr(MRR.prov + MRR.cred + MRR.cash)}; loss ${rs(MRRloss)}.`,
}));

const KPP = { stock: 40000, furn: 25000, debt: 35000, inv: 20000, iff: 2000, cred: 30000, stockR: 36000, debtR: 32000, invT: 17000, credP: 29000, exp: 1500 };
const NRL = { dr: [['Stock A/c', KPP.stock], ['Furniture A/c', KPP.furn], ['Debtors A/c', KPP.debt], ['Investments A/c', KPP.inv], ['Bank A/c (creditors paid)', KPP.credP], ['Bank A/c (realisation expenses)', KPP.exp]], cr: [['Investment Fluctuation Fund A/c', KPP.iff], ['Creditors A/c', KPP.cred], ['Bank A/c (stock realised)', KPP.stockR], ['Bank A/c (furniture realised at book value)', KPP.furn], ['Bank A/c (debtors realised)', KPP.debtR], ["Uddalak's Capital A/c (investments taken over)", KPP.invT]] };
const NRLr = realisation(NRL.dr, NRL.cr, ['Uddalak', 'Vibhavari'], [1, 1]);
eq(NRLr.result, -8500, 'n_ra_loss');
Q('n_ra_loss', num({
  t: 2, d: 3, c: 'application', value: -NRLr.result, unit: '₹',
  stem: `Uddalak and Vibhavari dissolve Valparai Plum Preserves, an imagined firm. Transferred to the Realisation Account: stock ${rs(KPP.stock)}, furniture ${rs(KPP.furn)}, debtors ${rs(KPP.debt)}, investments ${rs(KPP.inv)}, an Investment Fluctuation Fund of ${rs(KPP.iff)} and creditors of ${rs(KPP.cred)}. Stock realises ${rs(KPP.stockR)} and debtors ${rs(KPP.debtR)}; nothing is said about the furniture; Uddalak takes over the investments at ${rs(KPP.invT)}; creditors are paid ${rs(KPP.credP)} in full settlement and realisation expenses of ${rs(KPP.exp)} are paid. Following the ISC assumptions, find the loss on realisation (in ₹).`,
  sol: `Furniture is taken at its book value. Debit total ${inr(NRLr.drTotal)}; credit total ${inr(NRLr.crTotal)}; loss = ${rs(-NRLr.result)}.`,
}));

const NCC = { cred: 72000, furn: 18000, disc: 5 };
const NCCcash = pct(100 - NCC.disc, NCC.cred - NCC.furn);
eq(NCCcash, 51300, 'n_creditor_cash');
Q('n_creditor_cash', num({
  t: 2, d: 3, c: 'application', value: NCCcash, unit: '₹',
  stem: `Creditors of ${rs(NCC.cred)} of Sambhal Brass Lamps, an imagined firm being dissolved, take over its furniture at an agreed value of ${rs(NCC.furn)} and accept the rest of their claim in cash at a discount of ${NCC.disc}%. How much cash is paid to the creditors (in ₹)?`,
  sol: `Claim left = ${inr(NCC.cred)} − ${inr(NCC.furn)} = ${inr(NCC.cred - NCC.furn)}; cash = ${100 - NCC.disc}% of it = ${rs(NCCcash)}.`,
}));

const NDB = { debtors: 64000, bad: 4000, disc: 3 };
const NDBcash = pct(100 - NDB.disc, NDB.debtors - NDB.bad);
eq(NDBcash, 58200, 'n_debtors');
Q('n_debtors', num({
  t: 2, d: 2, c: 'application', value: NDBcash, unit: '₹',
  stem: `Debtors of Bargarh Ikat House, an imagined firm being dissolved, stand at ${rs(NDB.debtors)}. Of these, ${rs(NDB.bad)} prove irrecoverable and the rest are collected at a discount of ${NDB.disc}%. What amount is credited to the Realisation Account for debtors realised (in ₹)?`,
  sol: `Good debts ${inr(NDB.debtors - NDB.bad)}; collected at ${100 - NDB.disc}% = ${rs(NDBcash)}.`,
}));

const ACW = { jeepBook: 45000, jeep: 38000, bp: 12000 };
Q('s2_takeover', short({
  t: 2, d: 2, c: 'application', marks: 2,
  stem: `Ashwin and Bindiya are closing Bageshwar Copperware, an imagined firm; its assets and outside liabilities are already in the Realisation Account. Pass journal entries: (a) Ashwin takes over the firm's jeep, book value ${rs(ACW.jeepBook)}, at ${rs(ACW.jeep)}; (b) Bindiya agrees to discharge the firm's bills payable of ${rs(ACW.bp)} herself.`,
  model: journal([
    { dr: [[C('Ashwin'), ACW.jeep]], cr: [['Realisation A/c', ACW.jeep]], nar: 'jeep taken over by Ashwin at the agreed value' },
    { dr: [['Realisation A/c', ACW.bp]], cr: [[C('Bindiya'), ACW.bp]], nar: 'bills payable to be discharged by Bindiya' },
  ]).md,
  sol: 'An asset taken over is charged to the partner at the agreed value; a liability she assumes is credited to her.',
  scheme: [['(a) Ashwin debited at the agreed value', 1], ['(b) Bindiya credited with the bills payable', 1]],
}));

const SCR = { a: 20000, aStock: 22000, b: 30000, bMach: 18000, c: 40000, disc: 2.5 };
const SCRb = SCR.b - SCR.bMach;
const SCRc = SCR.c - (SCR.c * SCR.disc) / 100;
check(Number.isInteger(SCRc), 's3_creditors discount whole');
eq([SCRb, SCRc], [12000, 39000], 's3_creditors');
Q('s3_creditors', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `The creditors of Kinnal Toy Works, an imagined firm being dissolved, total ${rs(SCR.a + SCR.b + SCR.c)} and have been transferred to the Realisation Account. They are settled as follows. Pass the journal entries, or state "no entry" with a reason.\n\n(a) A creditor for ${rs(SCR.a)} accepts stock, book value ${rs(SCR.aStock)}, in full settlement.\n(b) Creditors for ${rs(SCR.b)} take over a lathe at an agreed ${rs(SCR.bMach)} and are paid the balance in cash.\n(c) The remaining creditors, ${rs(SCR.c)}, are paid in cash at a discount of ${SCR.disc}%.`,
  model: `**(a)** No entry: the stock and the creditor are both already in the Realisation Account, and no cash moves.\n\n${journal([
    { dr: [['Realisation A/c', SCRb]], cr: [['Bank A/c', SCRb]], nar: `balance of ${inr(SCR.b)} − ${inr(SCR.bMach)} paid in cash after the lathe was accepted` },
    { dr: [['Realisation A/c', SCRc]], cr: [['Bank A/c', SCRc]], nar: `creditors of ${inr(SCR.c)} paid at a ${SCR.disc}% discount` },
  ]).md}\n\nEntries (i) and (ii) answer parts (b) and (c).`,
  sol: 'Only cash actually paid to creditors is entered; an asset accepted by a creditor needs no entry.',
  scheme: [['(a) No entry, with reason', 1], ['(b) Balance paid in cash', 1], ['(c) Payment after discount', 1]],
}));

const DCC = { tricycle: 3500, claim: 6000, camera: 4000 };
Q('s3_unrecorded', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `Gopika and Hrishabh are winding up Dwarka Conch Crafts, an imagined firm. Pass journal entries for these items, none of which appears in the books: (a) a fully written-off delivery tricycle is sold for ${rs(DCC.tricycle)}; (b) compensation of ${rs(DCC.claim)} claimed by a former employee, not provided for, is paid; (c) a camera, never recorded, is taken over by Hrishabh at ${rs(DCC.camera)}.`,
  model: journal([
    { dr: [['Bank A/c', DCC.tricycle]], cr: [['Realisation A/c', DCC.tricycle]], nar: 'unrecorded tricycle sold' },
    { dr: [['Realisation A/c', DCC.claim]], cr: [['Bank A/c', DCC.claim]], nar: 'unrecorded compensation claim paid' },
    { dr: [[C('Hrishabh'), DCC.camera]], cr: [['Realisation A/c', DCC.camera]], nar: 'unrecorded camera taken over by Hrishabh' },
  ]).md,
  sol: 'Unrecorded items are never transferred; only their realisation or payment passes through the Realisation Account.',
  scheme: [['(a) Bank Dr. To Realisation', 1], ['(b) Realisation Dr. To Bank', 1], ["(c) Hrishabh's Capital Dr. To Realisation", 1]],
}));

const MKS = { mach: 80000, stock: 30000, debt: 25000, prov: 1000, cred: 28000, bp: 7000, machR: 72000, debtR: 23500, stockT: 27000, credP: 27000, exp: 2000 };
const SRA = realisation(
  [['Machinery A/c', MKS.mach], ['Stock A/c', MKS.stock], ['Debtors A/c', MKS.debt], ['Bank A/c (creditors and bills payable paid)', MKS.credP + MKS.bp], ['Bank A/c (realisation expenses)', MKS.exp]],
  [['Provision for Doubtful Debts A/c', MKS.prov], ['Creditors A/c', MKS.cred], ['Bills Payable A/c', MKS.bp], ['Bank A/c (machinery realised)', MKS.machR], ['Bank A/c (debtors realised)', MKS.debtR], ["Kamalakar's Capital A/c (stock taken over)", MKS.stockT]],
  ['Kamalakar', 'Leelavati'], [3, 2],
);
eq([SRA.result, SRA.part], [-12500, { Kamalakar: 7500, Leelavati: 5000 }], 's3_ra');
Q('s3_ra', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `Kamalakar and Leelavati share profits 3 : 2 in Mandu Weavers' Store, an imagined firm, and dissolve it. Transferred to the Realisation Account: machinery ${rs(MKS.mach)}, stock ${rs(MKS.stock)}, debtors ${rs(MKS.debt)}, provision for doubtful debts ${rs(MKS.prov)}, creditors ${rs(MKS.cred)} and bills payable ${rs(MKS.bp)}. Machinery realises ${rs(MKS.machR)} and debtors ${rs(MKS.debtR)}; Kamalakar takes over the stock at ${rs(MKS.stockT)}; creditors accept ${rs(MKS.credP)} in full settlement; nothing is said about the bills payable; realisation expenses of ${rs(MKS.exp)} are paid. Prepare the Realisation Account.`,
  model: `Bills payable are paid in full (${rs(MKS.bp)}) as the question is silent.\n\n**Realisation Account**\n\n${SRA.md}`,
  sol: 'Book values and payments on the debit side; provision, liabilities and realisations on the credit side; the balance is shared 3 : 2.',
  scheme: [['Transfers of assets, provision and liabilities', 1], ['Realisations, takeover and payments (bills payable in full)', 1], [`Loss ${inr(-SRA.result)} shared 3 : 2`, 1]],
}));

const NLE = { inv: 50000, iff: 5000, mach: 120000, dep: 30000, gr: 18000, invR: 46000, machR: 85000 };
const NLEgr = splitRatio(NLE.gr, ['Rajarshi', 'Sakina'], [2, 1]);
eq(NLEgr, { Rajarshi: 12000, Sakina: 6000 }, 's3_related');
Q('s3_related', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `Rajarshi and Sakina share profits 2 : 1 in Narsapur Lace Exports, an imagined firm, and dissolve it. Its books show investments ${rs(NLE.inv)} with an Investment Fluctuation Fund of ${rs(NLE.iff)}; machinery ${rs(NLE.mach)} with a provision for depreciation of ${rs(NLE.dep)}; and a general reserve of ${rs(NLE.gr)}. The investments realise ${rs(NLE.invR)} and the machinery ${rs(NLE.machR)}. Following the ISC syllabus, pass the journal entries for these assets, their related fund and provision, the realisations and the general reserve.`,
  model: journal([
    { dr: [['Realisation A/c', NLE.inv + NLE.mach]], cr: [['Investments A/c', NLE.inv], ['Machinery A/c', NLE.mach]], nar: 'investments and machinery transferred at book (gross) value' },
    { dr: [['Investment Fluctuation Fund A/c', NLE.iff], ['Provision for Depreciation A/c', NLE.dep]], cr: [['Realisation A/c', NLE.iff + NLE.dep]], nar: 'related fund and provision transferred with their assets (ISC note)' },
    { dr: [['Bank A/c', NLE.invR + NLE.machR]], cr: [['Realisation A/c', NLE.invR + NLE.machR]], nar: `investments ${rs(NLE.invR)} and machinery ${rs(NLE.machR)} realised` },
    { dr: [['General Reserve A/c', NLE.gr]], cr: [[C('Rajarshi'), NLEgr.Rajarshi], [C('Sakina'), NLEgr.Sakina]], nar: 'general reserve, related to no asset, distributed 2 : 1' },
  ]).md,
  sol: 'Related funds and provisions follow their assets into the Realisation Account; the unrelated general reserve goes to the capitals.',
  scheme: [['Assets transferred gross, with related fund and provision credited to Realisation', 1], ['Realisations recorded', 1], ['General reserve to capitals 2 : 1', 1]],
}));

const BDC = { furn: 18000, stock: 42000, debt: 36000, prov: 2000, inv: 24000, iff: 3000, gw: 15000, cred: 33000, bp: 9000, stockR: 39000, debtR: 33000, invT: 21000, credP: 32000, exp: 1800 };
const BDCa = [['Furniture A/c', BDC.furn], ['Stock A/c', BDC.stock], ['Debtors A/c', BDC.debt], ['Investments A/c', BDC.inv], ['Goodwill A/c', BDC.gw]];
const BDCl = [['Provision for Doubtful Debts A/c', BDC.prov], ['Investment Fluctuation Fund A/c', BDC.iff], ['Creditors A/c', BDC.cred], ['Bills Payable A/c', BDC.bp]];
const LRA = realisation(
  [...BDCa, ['Bank A/c (creditors and bills payable paid)', BDC.credP + BDC.bp], ["Lopamudra's Capital A/c (realisation expenses paid)", BDC.exp]],
  [...BDCl, ['Bank A/c (furniture realised at book value)', BDC.furn], ['Bank A/c (stock realised)', BDC.stockR], ['Bank A/c (debtors realised)', BDC.debtR], ["Kumud's Capital A/c (investments taken over)", BDC.invT]],
  ['Kumud', 'Lopamudra'], [2, 1],
);
eq([LRA.result, LRA.part], [-19800, { Kumud: 13200, Lopamudra: 6600 }], 'l5_ra');
Q('l5_ra', long({
  t: [2, 3], d: 3, c: 'application', marks: 5,
  stem: `Kumud and Lopamudra share profits 2 : 1 in Kondagaon Dhokra Crafts, an imagined metal-casting firm, and dissolve it on ${DATE}. Its books show furniture ${rs(BDC.furn)}, stock ${rs(BDC.stock)}, debtors ${rs(BDC.debt)} with a provision for doubtful debts of ${rs(BDC.prov)}, investments ${rs(BDC.inv)} with an Investment Fluctuation Fund of ${rs(BDC.iff)}, goodwill ${rs(BDC.gw)}, creditors ${rs(BDC.cred)} and bills payable ${rs(BDC.bp)}.\n\nStock realises ${rs(BDC.stockR)} and debtors ${rs(BDC.debtR)}. Kumud takes over the investments at ${rs(BDC.invT)}. Creditors accept ${rs(BDC.credP)} in full settlement. Lopamudra pays the realisation expenses of ${rs(BDC.exp)} on behalf of the firm. Nothing is said about the furniture, the goodwill or the bills payable.\n\n(a) Pass the two journal entries that transfer the balances to the Realisation Account. [2]\n\n(b) Prepare the Realisation Account under the ISC assumptions. [3]`,
  model: `**(a)**\n\n${journal([
    { dr: [['Realisation A/c', sum(BDCa.map(([, v]) => v))]], cr: BDCa, nar: 'assets transferred to the Realisation Account at book value' },
    { dr: BDCl, cr: [['Realisation A/c', sum(BDCl.map(([, v]) => v))]], nar: 'related provision and fund, and outside liabilities, transferred to the Realisation Account' },
  ]).md}\n\n**(b)** Assumptions: furniture realised at book value (tangible); goodwill realises nothing (intangible); bills payable paid in full.\n\n**Realisation Account**\n\n${LRA.md}`,
  sol: 'Transfer gross values and related balances first; then apply the three ISC assumptions before balancing the account.',
  scheme: [['(a) Assets transferred', 1], ['(a) Provision, fund and liabilities transferred', 1], ['(b) Realisations incl. furniture at book value, goodwill nil', 1], ["(b) Payments incl. bills payable in full and Lopamudra's expenses", 1], [`(b) Loss ${inr(-LRA.result)} shared 2 : 1`, 1]],
}));

Q('match_entries', match({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each event in the winding up of Sivasagar Muga Silk House, an imagined firm, with the journal entry it needs.',
  pairs: [
    ['A partner takes over the stock', "Partner's Capital A/c Dr. To Realisation A/c"],
    ['An unrecorded typewriter is sold for cash', 'Bank A/c Dr. To Realisation A/c'],
    ['A partner agrees to pay the creditors himself', "Realisation A/c Dr. To Partner's Capital A/c"],
    ['Outstanding rent is paid', 'Realisation A/c Dr. To Bank A/c'],
  ],
  sol: 'Ask who gives and who receives: the firm\'s bank, a partner or an outside party; the Realisation Account always takes the other side.',
}));

Q('s2_ra_vs_reval', short({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'A student at Khandala Chikki Makers, an imagined firm, says the Realisation Account it opens on closing is the same as the Revaluation Account it opened when a partner retired last year. Give two points of difference between the two accounts.',
  model: '| Basis | Revaluation Account | Realisation Account |\n|---|---|---|\n| When prepared | On reconstitution (admission, retirement, death, change in ratio); the firm continues | On dissolution of the firm; the business ends |\n| What it records | Only changes in the values of assets and liabilities, which stay in the books at revised figures | All assets (other than cash and bank) and outside liabilities at book value, then their sale and payment; the accounts are closed |',
  sol: 'Compare the occasion and the items each account deals with.',
  scheme: [['Occasion of preparation', 1], ['Items recorded and what happens to the accounts', 1]],
}));

// ================================================================ t03 Realisation expenses
Q('m_exp_firm', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Realisation expenses of ₹4,000 incurred in winding up Bicholim Cashew Feni Traders, an imagined firm, are paid by the firm out of its bank account. The entry is',
  opts: ['Realisation A/c Dr. To Bank A/c ₹4,000', "Partners' Capital A/cs Dr. To Bank A/c ₹4,000", 'Bank A/c Dr. To Realisation A/c ₹4,000', 'Realisation Expenses A/c Dr. To Realisation A/c ₹4,000'],
  sol: 'Expenses of realisation are a cost of winding up, so they go to the debit of the Realisation Account.',
}));

Q('m_exp_partner_paid', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Niranjan, a partner of Karkala Temple Lamps, an imagined firm being dissolved, pays the realisation expenses of ₹3,200 out of his own pocket on behalf of the firm. The entry is',
  opts: ["Realisation A/c Dr. To Niranjan's Capital A/c ₹3,200", "Niranjan's Capital A/c Dr. To Realisation A/c ₹3,200", "Niranjan's Capital A/c Dr. To Bank A/c ₹3,200", 'No entry is required'],
  sol: 'The expenses are the firm\'s, but Niranjan paid them, so the Realisation Account is debited and his capital credited.',
}));

Q('m_exp_borne_himself', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'Under the dissolution terms of Ranthambore Jeep Safaris, an imagined firm, Om, a partner, is to bear all realisation expenses, and he pays the ₹5,000 of expenses himself. No remuneration is agreed. The entry in the firm\'s books is',
  opts: ['No entry, because the expenses are neither the firm\'s cost nor paid from its funds', "Realisation A/c Dr. To Om's Capital A/c ₹5,000", "Om's Capital A/c Dr. To Bank A/c ₹5,000", 'Realisation A/c Dr. To Bank A/c ₹5,000'],
  sol: 'The cost is Om\'s own, and no money of the firm is used, so nothing is recorded.',
}));

Q('m_exp_borne_firm_pays', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'Paromita, a partner of Mandvi Bandhani Prints, an imagined firm being dissolved, has agreed to bear the realisation expenses, but the firm pays them, ₹2,600, from its bank account. The entry is',
  opts: ["Paromita's Capital A/c Dr. To Bank A/c ₹2,600", 'Realisation A/c Dr. To Bank A/c ₹2,600', "Realisation A/c Dr. To Paromita's Capital A/c ₹2,600", "Bank A/c Dr. To Paromita's Capital A/c ₹2,600"],
  sol: 'The expenses are Paromita\'s responsibility, so the firm\'s payment is charged to her capital; the Realisation Account is not touched.',
}));

Q('m_exp_asset', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: 'Ravindra, a partner of Hubli Cotton Ginners, an imagined firm being dissolved, pays the realisation expenses of ₹4,500, and the firm reimburses him by letting him take its office printer (already in the Realisation Account) at an agreed value of ₹4,500. Which pair of entries records this?',
  opts: ["Realisation Dr. To Ravindra's Capital; then Ravindra's Capital Dr. To Realisation (₹4,500 each)", "Realisation Dr. To Bank; then Ravindra's Capital Dr. To Bank (₹4,500 each)", "Ravindra's Capital Dr. To Printer, ₹4,500 only", "Realisation Dr. To Printer, ₹4,500 only"],
  sol: 'The expenses are credited to Ravindra as paid by him, and the printer he takes is charged to him; his capital is unchanged on balance, while the Realisation Account bears the expenses and is credited with the printer\'s value.',
}));

Q('tf_exp_remun', tf({
  t: 3, d: 3, c: 'understanding', ans: false,
  stem: 'True or false? At Nandyal Stone Quarry Supplies, an imagined firm being dissolved, a partner who had agreed to bear the realisation expenses lets the firm pay them; the payment is debited to the Realisation Account.',
  sol: 'Because the partner must bear the expenses, the firm\'s payment is debited to his capital account, not to the Realisation Account.',
}));

Q('ar_exp', ar({
  t: 3, d: 3, c: 'analysis', key: 'b',
  a: 'When a partner of Karaikal Paper Kites, an imagined firm, is allowed a fixed remuneration for completing its dissolution and bears the realisation expenses himself, only the remuneration is debited to the Realisation Account.',
  r: 'The Realisation Account is a nominal account prepared to find the profit or loss on realising assets and settling liabilities.',
  sol: 'Both are true. A holds because the firm\'s cost is the remuneration, the expenses being the partner\'s own; R only describes the nature of the account and does not explain this.',
}));

Q('match_exp', match({
  t: 3, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each arrangement for the realisation expenses of Bijapur Pomegranate Growers, an imagined firm being dissolved, with its entry.',
  pairs: [
    ['Paid by the firm', 'Realisation A/c Dr. To Bank A/c'],
    ['Paid by a partner on behalf of the firm', "Realisation A/c Dr. To Partner's Capital A/c"],
    ['To be borne by a partner, but paid by the firm', "Partner's Capital A/c Dr. To Bank A/c"],
    ['Borne and paid by a partner, no remuneration', 'No entry'],
  ],
  sol: 'Decide whose cost the expenses are and whose money pays them; only the firm\'s cost reaches the Realisation Account.',
}));

const NRM = { fee: 7000, spent: 5200 };
const NRMnet = NRM.fee - NRM.spent;
eq(NRMnet, 1800, 'n_remun');
Q('n_remun', num({
  t: 3, d: 4, c: 'analysis', value: NRMnet, unit: '₹',
  stem: `Zubeda, a partner, is to receive ${rs(NRM.fee)} for completing the dissolution of Drass Apricot Oil, an imagined firm, and is to bear all realisation expenses. The expenses, ${rs(NRM.spent)}, are paid by the firm. By how much does her capital account rise, on balance, from these two items (in ₹)?`,
  sol: `Her capital is credited with the remuneration ${inr(NRM.fee)} (Realisation Dr.) and debited with the expenses ${inr(NRM.spent)} paid for her (Bank Cr.); net rise ${rs(NRMnet)}.`,
}));

const MCS = 4000;
Q('s2_exp_cases', short({
  t: 3, d: 2, c: 'application', marks: 2,
  stem: `Realisation expenses of ${rs(MCS)} are incurred in winding up Mussoorie Pine Furniture, an imagined firm. Pass the journal entry in each separate case: (a) Vinayak, a partner, pays them on behalf of the firm; (b) Vinayak had agreed to bear them, but the firm pays them.`,
  model: `**(a)**\n\n${journal([{ dr: [['Realisation A/c', MCS]], cr: [[C('Vinayak'), MCS]], nar: 'realisation expenses paid by Vinayak on behalf of the firm' }]).md}\n\n**(b)**\n\n${journal([{ dr: [[C('Vinayak'), MCS]], cr: [['Bank A/c', MCS]], nar: 'expenses to be borne by Vinayak paid by the firm' }]).md}`,
  sol: 'Case (a) is the firm\'s cost paid by a partner; case (b) is the partner\'s cost paid by the firm.',
  scheme: [['(a) Realisation Dr. To Vinayak\'s Capital', 1], ['(b) Vinayak\'s Capital Dr. To Bank', 1]],
}));

const KHM = { exp: 3800, fee: 5000 };
Q('s3_exp_cases', short({
  t: 3, d: 4, c: 'analysis', marks: 3,
  stem: `Realisation expenses of Payyanur Handloom Mill, an imagined firm being dissolved, come to ${rs(KHM.exp)}. Pass the journal entries in each separate case:\n\n(a) Qaiser, a partner, is to receive ${rs(KHM.fee)} for managing the dissolution and to bear the expenses; he pays them himself.\n(b) Rupa, a partner, pays the expenses and the firm reimburses her by giving her its display cabinet (already in the Realisation Account) at an agreed ${rs(KHM.exp)}.\n(c) Sanjiv, a partner, had agreed to bear the expenses, but the firm pays them.`,
  model: `**(a)** Only the remuneration is the firm's cost; the expenses are Qaiser's own.\n\n${journal([{ dr: [['Realisation A/c', KHM.fee]], cr: [[C('Qaiser'), KHM.fee]], nar: 'remuneration allowed to Qaiser for completing the dissolution' }]).md}\n\n**(b)**\n\n${journal([
    { dr: [['Realisation A/c', KHM.exp]], cr: [[C('Rupa'), KHM.exp]], nar: 'realisation expenses paid by Rupa' },
    { dr: [[C('Rupa'), KHM.exp]], cr: [['Realisation A/c', KHM.exp]], nar: 'display cabinet given to Rupa in reimbursement' },
  ]).md}\n\n**(c)**\n\n${journal([{ dr: [[C('Sanjiv'), KHM.exp]], cr: [['Bank A/c', KHM.exp]], nar: 'expenses to be borne by Sanjiv paid by the firm' }]).md}`,
  sol: 'Separate the firm\'s cost (remuneration or expenses) from what a partner bears, and record an asset given in reimbursement as a takeover.',
  scheme: [['(a) Remuneration only, credited to Qaiser', 1], ['(b) Expenses credited and cabinet debited to Rupa', 1], ["(c) Sanjiv's Capital Dr. To Bank", 1]],
}));

const LEX = { exp: 6000, fee: 8000 };
Q('l5_expenses', long({
  t: 3, d: 4, c: 'analysis', marks: 5,
  stem: `Pritha and Quddus dissolve Panchmura Terracotta Studio, an imagined firm. The realisation expenses come to ${rs(LEX.exp)}.\n\n(a) Pass the journal entry or entries in each separate case: (i) the firm pays the expenses; (ii) Pritha pays them on behalf of the firm; (iii) Quddus has agreed to bear them, but the firm pays them. [3]\n\n(b) Instead, Quddus is to receive ${rs(LEX.fee)} for completing the dissolution and is to bear its expenses, which the firm pays for him. Pass the entries and state the net effect on Quddus's capital account. [2]`,
  model: `**(a)**\n\n${journal([
    { dr: [['Realisation A/c', LEX.exp]], cr: [['Bank A/c', LEX.exp]], nar: '(i) realisation expenses paid by the firm' },
    { dr: [['Realisation A/c', LEX.exp]], cr: [[C('Pritha'), LEX.exp]], nar: '(ii) realisation expenses paid by Pritha on behalf of the firm' },
    { dr: [[C('Quddus'), LEX.exp]], cr: [['Bank A/c', LEX.exp]], nar: '(iii) expenses to be borne by Quddus paid by the firm' },
  ]).md}\n\n**(b)**\n\n${journal([
    { dr: [['Realisation A/c', LEX.fee]], cr: [[C('Quddus'), LEX.fee]], nar: 'remuneration allowed to Quddus' },
    { dr: [[C('Quddus'), LEX.exp]], cr: [['Bank A/c', LEX.exp]], nar: 'expenses borne by Quddus paid by the firm on his behalf' },
  ]).md}\n\nNet effect: Quddus's capital rises by ${inr(LEX.fee)} − ${inr(LEX.exp)} = ${rs(LEX.fee - LEX.exp)}; the Realisation Account bears only the remuneration.`,
  sol: 'In each case decide whose cost it is and whose money pays it; in (b) the remuneration is the firm\'s cost and the expenses are Quddus\'s.',
  scheme: [['(a)(i) Realisation Dr. To Bank', 1], ['(a)(ii) Realisation Dr. To Pritha\'s Capital', 1], ['(a)(iii) Quddus\'s Capital Dr. To Bank', 1], ['(b) Remuneration and expense entries', 1], ['(b) Net effect stated', 1]],
}));

// ================================================================ t04 Memorandum Balance Sheet, loans, capitals, Bank/Cash
Q('m_memo_bs', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'Before closing its books, Phalodi Salt Traders, an imagined firm, lists every balance on the date of dissolution in a Memorandum Balance Sheet. Such a statement',
  opts: ['shows the assets, liabilities and capitals to be closed and is not itself part of the double entry', 'shows the realised values of the assets after the dissolution', 'replaces the Realisation Account in the ISC format', 'records the final payments made to the partners'],
  sol: 'It is the starting picture for the winding up, often used to find a missing balance such as cash or a capital; the accounts themselves are then closed through the ledger.',
}));

Q('fb_memo', fb({
  t: 4, d: 1, c: 'recall',
  stem: 'The horizontal balance sheet that Pokaran Camel Leather, an imagined firm, draws up on its date of dissolution, only to set out the balances that must now be closed, is called a ___ Balance Sheet.',
  acc: [['Memorandum']],
  sol: 'It is a Memorandum Balance Sheet: a record of balances, not an account in the books.',
}));

const MEM = { liab: [['Creditors', 46000], ['Capital: Tirthankar', 70000], ['Capital: Uttara', 50000], ['General Reserve', 12000]], assets: [['Stock', 38000], ['Debtors', 40000], ['Furniture', 25000], ['Machinery', 60000]] };
const MEMbank = sum(MEM.liab.map(([, v]) => v)) - sum(MEM.assets.map(([, v]) => v));
const MEMbs = balanceSheet(MEM.liab, [...MEM.assets, ['Bank (balancing figure)', MEMbank]]);
eq([MEMbank, MEMbs.total], [15000, 178000], 's2_memo_bs');
Q('s2_memo_bs', short({
  t: 4, d: 2, c: 'application', marks: 2,
  stem: `Tirthankar and Uttara close Balotra Applique Works, an imagined firm, on ${DATE}. On that date its ledger shows: creditors ₹46,000; capitals Tirthankar ₹70,000 and Uttara ₹50,000; general reserve ₹12,000; stock ₹38,000; debtors ₹40,000; furniture ₹25,000; machinery ₹60,000; and a bank balance that has not been recorded in the list. Prepare the Memorandum Balance Sheet and find the bank balance.`,
  model: `**Memorandum Balance Sheet of Tirthankar and Uttara as at ${DATE}**\n\n${MEMbs.md}\n\nBank balance = ${inr(MEMbs.total)} − ${inr(sum(MEM.assets.map(([, v]) => v)))} = **${rs(MEMbank)}**.`,
  sol: 'Total the liabilities and capitals; the assets side falls short by the bank balance.',
  scheme: [['Memorandum Balance Sheet in horizontal form', 1], [`Bank balance ${inr(MEMbank)} as balancing figure`, 1]],
}));

Q('m_overdraft_entry', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Kalka Toy Train Souvenirs, an imagined firm, has a bank overdraft of ₹12,000 on the date it is dissolved. Following the ISC syllabus, the overdraft appears',
  opts: ['as the opening credit balance (By Balance b/d) in the Bank Account and is cleared from the cash realised, with no transfer to the Realisation Account', 'on the credit side of the Realisation Account with the other liabilities', "on the debit side of the partners' capital accounts", 'on the debit side of the Bank Account as Balance b/d'],
  sol: 'ISC sends a bank overdraft to the Bank/Cash Account: it starts the Bank Account on the credit side and is paid off out of the realisations.',
}));

Q('ar_overdraft', ar({
  t: [2, 4], d: 2, c: 'understanding', key: 'a',
  a: 'Under the ISC syllabus, the bank overdraft of Kotagiri Tea Estates Supply, an imagined firm being dissolved, is not transferred to the Realisation Account, although its bank loan is.',
  r: "An overdraft is the credit balance of the firm's own Bank Account, so it is cleared within that account out of the cash realised.",
  sol: 'Both are true, and R explains A: an overdraft is already a balance of the Bank Account, while a bank loan is an outside liability to be settled through Realisation.',
}));

const PBM = { loan: 40000, od: 15000 };
Q('s2_overdraft', short({
  t: [2, 4], d: 2, c: 'understanding', marks: 2,
  stem: `On the date of dissolution, Samalkha Blanket Mills, an imagined firm, owes its bank ${rs(PBM.loan)} on a term loan and also has an overdraft of ${rs(PBM.od)} on its current account. Both are to be paid in full. Explain, with entries, how each is dealt with under the ISC syllabus.`,
  model: `**Bank loan** (an outside liability) goes through the Realisation Account:\n\n${journal([
    { dr: [['Bank Loan A/c', PBM.loan]], cr: [['Realisation A/c', PBM.loan]], nar: 'bank loan transferred to the Realisation Account' },
    { dr: [['Realisation A/c', PBM.loan]], cr: [['Bank A/c', PBM.loan]], nar: 'bank loan repaid' },
  ]).md}\n\n**Bank overdraft** is not transferred to the Realisation Account. It is the opening credit balance of the Bank Account ("By Balance b/d ${rs(PBM.od)}") and is wiped out by the cash realised; no journal entry is passed for it.`,
  sol: 'Separate the term loan (an outside liability) from the overdraft (a balance of the Bank Account itself).',
  scheme: [['Bank loan: transfer and repayment entries', 1], ['Overdraft: credit side of Bank Account, no transfer or entry', 1]],
}));

Q('m_loan_to_partner', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'The assets of Sirsi Areca Traders, an imagined firm being dissolved, include a loan of ₹10,000 given by the firm to Wajid, a partner. Following the ISC syllabus, the entry for this loan is',
  opts: ["Wajid's Capital A/c Dr. To Loan to Wajid A/c ₹10,000", "Realisation A/c Dr. To Loan to Wajid A/c ₹10,000", "Bank A/c Dr. To Loan to Wajid A/c ₹10,000", "Loan to Wajid A/c Dr. To Wajid's Capital A/c ₹10,000"],
  sol: 'ISC requires a loan given to a partner to be transferred (debited) to that partner\'s capital account; it does not pass through the Realisation Account.',
}));

Q('tf_loan_to', tf({
  t: 4, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? A loan given by Kalpetta Coffee Curers, an imagined firm, to one of its partners is settled on dissolution by debiting that partner\'s capital account, not by sending it to the Realisation Account.',
  sol: 'The ISC note says a loan given to a partner is transferred (debited) to his capital account.',
}));

Q('m_partner_loan_debit', mcq({
  t: 4, d: 4, c: 'analysis',
  stem: "On the dissolution of Melukote Silk Weavers, an imagined firm, Sharmistha's capital account shows a debit balance of ₹6,000 after all adjustments, and she had lent the firm ₹20,000. Under the ISC syllabus, the firm",
  opts: ['repays her loan of ₹20,000 in full through the Bank Account, and she brings in ₹6,000 in cash to clear her capital account', 'sets off the ₹6,000 against the loan and pays her ₹14,000 only', 'transfers the loan to the Realisation Account and pays her nothing on capital', 'transfers the loan to her capital account, leaving a credit of ₹14,000 to be paid'],
  sol: 'A loan taken from a partner is passed through the Cash or Bank Account even if that partner\'s capital account is in debit; the debit balance is made good separately in cash.',
}));

Q('ar_partner_loan', ar({
  t: 4, d: 3, c: 'analysis', key: 'd',
  a: "If Saurav's capital account in Saundatti Tile Works, an imagined firm being dissolved, ends in debit, his loan to the firm is set off against it and only the net amount is settled.",
  r: "Under the ISC syllabus, a loan taken from a partner is paid through the Cash or Bank Account even when that partner's capital account has a debit balance.",
  sol: 'A is false under the ISC rule, which forbids the set-off; R is true and gives the rule.',
}));

const GPP = { to: 10000, from: 25000 };
Q('s2_loans', short({
  t: 4, d: 2, c: 'understanding', marks: 2,
  stem: `Gadag Printing Press, an imagined firm, is dissolved. Its books show a loan of ${rs(GPP.to)} given by the firm to Vrinda, a partner, and a loan of ${rs(GPP.from)} taken by the firm from Yaqub, another partner. Pass the journal entries for both loans under the ISC syllabus.`,
  model: journal([
    { dr: [[C('Vrinda'), GPP.to]], cr: [['Loan to Vrinda A/c', GPP.to]], nar: 'loan given to Vrinda transferred to her capital account' },
    { dr: [["Yaqub's Loan A/c", GPP.from]], cr: [['Bank A/c', GPP.from]], nar: "Yaqub's loan repaid through the Bank Account" },
  ]).md,
  sol: 'A loan to a partner is debited to his capital; a loan from a partner is repaid in cash, after outside liabilities and before capitals.',
  scheme: [['Loan to Vrinda debited to her capital', 1], ["Yaqub's loan repaid through Bank", 1]],
}));

Q('m_current_fixed', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'The partners of Kangra Miniature Arts, an imagined firm, keep fixed capitals with separate current accounts. On dissolution, under the ISC syllabus, the current-account balances are',
  opts: ['transferred to the capital accounts, and every later adjustment is made in the capital accounts', 'kept open, and the realisation profit or loss is posted to the current accounts', 'transferred to the Realisation Account', 'paid off in cash before the creditors'],
  sol: 'ISC requires the current-account balances to be transferred to the capital accounts; no adjustments pass through the current accounts on dissolution.',
}));

const KRA = { capC: 50000, capD: 40000, curC: 6000, curD: 4000, loss: 15000, scooter: 12000 };
const SCU = settleCapitals(['Chandrima', 'Dhairya'], {
  dr: [['Current A/c (debit balance)', { Dhairya: KRA.curD }], ['Realisation A/c (scooter taken over)', { Dhairya: KRA.scooter }], ['Realisation A/c (loss)', splitRatio(KRA.loss, ['Chandrima', 'Dhairya'], [3, 2])]],
  cr: [['Balance b/d', { Chandrima: KRA.capC, Dhairya: KRA.capD }], ['Current A/c', { Chandrima: KRA.curC }]],
});
eq(SCU.pay, { Chandrima: 47000, Dhairya: 18000 }, 's3_current');
Q('s3_current', short({
  t: 4, d: 3, c: 'application', marks: 3,
  stem: `Chandrima and Dhairya share profits 3 : 2 in Nirona Rogan Art, an imagined firm, and keep fixed capitals of ${rs(KRA.capC)} and ${rs(KRA.capD)}. On dissolution their current accounts show Chandrima ${rs(KRA.curC)} (credit) and Dhairya ${rs(KRA.curD)} (debit). The Realisation Account shows a loss of ${rs(KRA.loss)}, and Dhairya has taken over a scooter at ${rs(KRA.scooter)}. Prepare the partners' capital accounts as required by the ISC syllabus.`,
  model: `The current-account balances are first transferred to the capital accounts; the loss is shared 3 : 2.\n\n**Partners' Capital Accounts**\n\n${SCU.md}`,
  sol: 'Close the current accounts into the capitals, then post the takeover, the loss and the final payment.',
  scheme: [['Current balances transferred (credit and debit)', 1], ['Scooter and loss (3 : 2) posted', 1], [`Final payments ${inr(SCU.pay.Chandrima)} and ${inr(SCU.pay.Dhairya)}`, 1]],
}));

// Ujjwala and Vikrant, Naukuchiatal Candle Studio (imagined): capital and Bank accounts from a finished Realisation Account.
const BHCx = { exp: 2000 };
const BHC = dissolve({
  names: ['Ujjwala', 'Vikrant'], ratio: [1, 1], bank: 14000,
  assets: [['Machinery', 80000], ['Stock', 30000], ['Debtors', 30000]],
  liabilities: [['Creditors', 36000]], loans: { Vikrant: 10000 },
  capitals: { Ujjwala: 60000, Vikrant: 40000 }, reserves: [['General Reserve', 8000]],
  sold: [['Machinery', 66000], ['Stock', 26000], ['Debtors', 28000]], paidInFull: ['Creditors'], paid: [['realisation expenses', BHCx.exp]],
});
eq([BHC.RA.result, BHC.CA.pay, BHC.soldTotal, BHC.BANK.total], [-22000, { Ujjwala: 53000, Vikrant: 33000 }, 120000, 134000], 's3_capital_bank');
Q('s3_capital_bank', short({
  t: 4, d: 3, c: 'application', marks: 3,
  stem: `Ujjwala and Vikrant, equal partners in Naukuchiatal Candle Studio, an imagined firm, dissolve it on ${DATE}.\n\n${bsHead('Ujjwala and Vikrant')}\n\n${BHC.BS.md}\n\nThe Realisation Account has been prepared: the assets realised ${rs(BHC.soldTotal)} in cash, creditors were paid in full, realisation expenses of ${rs(BHCx.exp)} were paid, and the loss on realisation was ${rs(-BHC.RA.result)}. Prepare the partners' capital accounts and the Bank Account.`,
  model: `**Partners' Capital Accounts**\n\n${BHC.CA.md}\n\n**Bank Account**\n\n${BHC.BANK.md}`,
  sol: "Post the reserve and the loss equally; in the Bank Account repay outside liabilities and Vikrant's loan before the capitals.",
  scheme: [['Capital accounts: reserve and loss shared equally', 1], ["Bank Account: realisations, creditors, expenses and Vikrant's loan", 1], ['Final payments; both accounts close', 1]],
}));

// Eknoor, Fehmida and Gurbaksh, Pranpur Handloom House (imagined): overdraft, bank loan, P&L debit, cash brought in.
const CHHx = { od: 15000, cred: 52000, loan: 40000, exp: 3000, fLoan: 20000 };
const CHH = dissolve({
  names: ['Eknoor', 'Fehmida', 'Gurbaksh'], ratio: [2, 2, 1], overdraft: CHHx.od,
  assets: [['Looms', 110000], ['Stock', 55000], ['Debtors', 50000]],
  liabilities: [['Creditors', CHHx.cred], ['Bank Loan', CHHx.loan]], loans: { Fehmida: CHHx.fLoan },
  capitals: { Eknoor: 60000, Fehmida: 40000, Gurbaksh: 8000 }, losses: [['Profit and Loss', 20000, 'Profit and Loss (debit balance)']],
  sold: [['Looms', 98000], ['Stock', 47000], ['Debtors', 45000]], paidInFull: ['Creditors', 'Bank Loan'], paid: [['realisation expenses', CHHx.exp]],
});
eq([CHH.RA.result, CHH.CA.pay, CHH.CA.bring, CHH.BANK.total], [-28000, { Eknoor: 40800, Fehmida: 20800 }, { Gurbaksh: 1600 }, 191600], 's3_bank_account');
Q('s3_bank_account', short({
  t: 4, d: 4, c: 'application', marks: 3,
  stem: `Pranpur Handloom House, an imagined firm of Eknoor, Fehmida and Gurbaksh, is dissolved. On that date the firm has a bank overdraft of ${rs(CHHx.od)}. The assets realise ${rs(CHH.soldTotal)}; creditors of ${rs(CHHx.cred)} and a bank loan of ${rs(CHHx.loan)} are paid in full; realisation expenses are ${rs(CHHx.exp)}; Fehmida's loan of ${rs(CHHx.fLoan)} is repaid. After all adjustments, the capital accounts show credit balances of ${rs(CHH.CA.pay.Eknoor)} (Eknoor) and ${rs(CHH.CA.pay.Fehmida)} (Fehmida) and a debit balance of ${rs(CHH.CA.bring.Gurbaksh)} (Gurbaksh), which he makes good in cash. Prepare the Bank Account under the ISC syllabus.`,
  model: `**Bank Account**\n\n${CHH.BANK.md}\n\nThe overdraft opens the account on the credit side and is not taken to the Realisation Account; the bank loan is paid through the Realisation Account.`,
  sol: 'Start with the overdraft on the credit side; receipts on the debit side include Gurbaksh\'s cash; the account must close at nil.',
  scheme: [['Overdraft as opening credit balance', 1], ['Realisations and cash brought in by Gurbaksh', 1], ['Payments in order: liabilities, expenses, loan, capitals; totals agree', 1]],
}));

// Ilavarasan and Jharna, Kuttanad Boat Fittings (imagined): loan to a partner, partner's loan with a debit capital.
const KBFx = { equip: 78000, debt: 27000, stock: 25000, cred: 39000, exp: 2400, jLoan: 25000 };
const KBF = dissolve({
  names: ['Ilavarasan', 'Jharna'], ratio: [3, 1], bank: 6000,
  assets: [['Equipment', 100000], ['Stock', 28000], ['Debtors', 30000]],
  liabilities: [['Creditors', 40000]], loans: { Jharna: KBFx.jLoan }, loansTo: { Ilavarasan: 9000 },
  capitals: { Ilavarasan: 90000, Jharna: 2000 }, reserves: [['General Reserve', 16000]],
  sold: [['Equipment', KBFx.equip], ['Debtors', KBFx.debt]], takenOver: [['Stock', 'Ilavarasan', KBFx.stock]],
  paid: [['Creditors', KBFx.cred], ['realisation expenses', KBFx.exp]],
});
eq([KBF.RA.result, KBF.RA.part, KBF.CA.pay, KBF.CA.bring, KBF.BANK.total], [-29400, { Ilavarasan: 22050, Jharna: 7350 }, { Ilavarasan: 45950 }, { Jharna: 1350 }, 112350], 'l5_caps_bank');
Q('l5_caps_bank', long({
  t: [2, 4], d: 4, c: 'analysis', marks: 5,
  stem: `Ilavarasan and Jharna share profits 3 : 1 in Kuttanad Boat Fittings, an imagined firm, and dissolve it on ${DATE}.\n\n${bsHead('Ilavarasan and Jharna')}\n\n${KBF.BS.md}\n\nEquipment realises ${rs(KBFx.equip)} and debtors ${rs(KBFx.debt)}. Ilavarasan takes over the stock at ${rs(KBFx.stock)}. Creditors accept ${rs(KBFx.cred)} in full settlement. Realisation expenses of ${rs(KBFx.exp)} are paid by the firm.\n\n(a) Prepare the Realisation Account. [2]\n\n(b) Prepare the partners' capital accounts and the Bank Account, following the ISC rules for loans to and from partners. [3]`,
  model: `**(a) Realisation Account**\n\n${KBF.RA.md}\n\n**(b) Partners' Capital Accounts**\n\n${KBF.CA.md}\n\n**Bank Account**\n\n${KBF.BANK.md}\n\nThe loan to Ilavarasan is debited to his capital account. Jharna's loan of ${rs(KBFx.jLoan)} is repaid in full through the Bank Account even though her capital account ends in debit; she brings in ${rs(KBF.CA.bring.Jharna)} separately.`,
  sol: 'Find the loss first; then close the capitals with the reserve, the loan to Ilavarasan, the takeover and the loss; the Bank Account repays Jharna\'s loan without set-off.',
  scheme: [['(a) Transfers, realisations and payments', 1], [`(a) Loss ${inr(-KBF.RA.result)} shared 3 : 1`, 1], ['(b) Loan to Ilavarasan and takeover debited to his capital', 1], ["(b) Jharna's debit balance made good in cash", 1], ["(b) Bank Account: Jharna's loan repaid in full; closes at nil", 1]],
}));

// Mridul and Nabanita, Biswanath Tea Crates (imagined): journal entries to close the books.
const TTCx = { mach: 46000, stock: 18000, exp: 1000, cred: 24000 };
const TTC = dissolve({
  names: ['Mridul', 'Nabanita'], ratio: [1, 1], bank: 20000,
  assets: [['Machinery', 50000], ['Stock', 20000], ['Prepaid Rent', 4000]],
  liabilities: [['Creditors', TTCx.cred]], capitals: { Mridul: 40000, Nabanita: 30000 },
  sold: [['Machinery', TTCx.mach]], takenOver: [['Stock', 'Mridul', TTCx.stock]], worthless: ['Prepaid Rent'],
  paidInFull: ['Creditors'], paid: [['realisation expenses', TTCx.exp]],
});
eq([TTC.RA.result, TTC.CA.pay, TTC.J.entries.length], [-11000, { Mridul: 16500, Nabanita: 24500 }, 8], 'l5_journal');
const TTCa = journal(TTC.J.entries.slice(0, 6));
const TTCb = journal(TTC.J.entries.slice(6));
Q('l5_journal', long({
  t: [2, 4], d: 3, c: 'application', marks: 5,
  stem: `Mridul and Nabanita, equal partners in Biswanath Tea Crates, an imagined firm, dissolve it on ${DATE}.\n\n${bsHead('Mridul and Nabanita')}\n\n${TTC.BS.md}\n\nMachinery realises ${rs(TTCx.mach)}. Mridul takes over the stock at ${rs(TTCx.stock)}. Realisation expenses of ${rs(TTCx.exp)} are paid. Nothing is said about the prepaid rent or the creditors.\n\n(a) Pass the journal entries up to and including the payment of realisation expenses. [3]\n\n(b) Pass the entries for the result on realisation and the final settlement with the partners. [2]`,
  model: `ISC assumptions: prepaid rent realises nothing; creditors are paid in full (${rs(TTCx.cred)}).\n\n**(a)**\n\n${TTCa.md}\n\n**(b)**\n\n${TTCb.md}\n\nLoss on realisation ${rs(-TTC.RA.result)}; final payments Mridul ${rs(TTC.CA.pay.Mridul)}, Nabanita ${rs(TTC.CA.pay.Nabanita)}.`,
  sol: 'Transfer, realise, settle liabilities and expenses, then share the loss and pay the partners; prepaid rent gives nothing and creditors are paid in full.',
  scheme: [['(a) Transfer entries', 1], ['(a) Machinery realised and stock taken over', 1], ['(a) Creditors in full and expenses paid', 1], [`(b) Loss ${inr(-TTC.RA.result)} shared equally`, 1], ['(b) Final payments to partners', 1]],
}));

const NFP = { cap: 75000, gr: 9000, loss: 6500, car: 22000, exp: 1500, loanTo: 5000 };
const NFPv = NFP.cap + NFP.gr - NFP.loss - NFP.car + NFP.exp - NFP.loanTo;
eq(NFPv, 52000, 'n_final_payment');
Q('n_final_payment', num({
  t: 4, d: 4, c: 'analysis', value: NFPv, unit: '₹',
  stem: `On the dissolution of Murshidabad Silk Prints, an imagined firm, Aarti's capital is ${rs(NFP.cap)}. Her share of the general reserve is ${rs(NFP.gr)} and of the loss on realisation ${rs(NFP.loss)}. She takes over the firm's car at ${rs(NFP.car)}, paid realisation expenses of ${rs(NFP.exp)} on behalf of the firm, and owes the firm ${rs(NFP.loanTo)} on a loan it gave her. What amount is finally paid to her (in ₹)?`,
  sol: `${inr(NFP.cap)} + ${inr(NFP.gr)} − ${inr(NFP.loss)} − ${inr(NFP.car)} + ${inr(NFP.exp)} − ${inr(NFP.loanTo)} = ${rs(NFPv)}.`,
}));

// ================================================================ full practicals (8 marks, practice only)
// Anwesha, Bodhisattwa and Chayanika, Sualkuchi Silk Looms (imagined): fixed capitals, overdraft, related fund
// and provision, loan to a partner, creditor taking furniture, unrecorded asset, expenses charged to a partner.
const SSL = { cred: 60000, credFurn: 20000, disc: 2, bld: 172000, stock: 71000, debt: 54000, inv: 27000, comp: 6000, exp: 3500 };
SSL.credOther = SSL.cred - SSL.credFurn;
const SSLcash = pct(100 - SSL.disc, SSL.credOther);
const SUA = dissolve({
  names: ['Anwesha', 'Bodhisattwa', 'Chayanika'], ratio: [2, 2, 1], overdraft: 18000,
  assets: [['Buildings', 150000], ['Furniture', 22000], ['Investments', 30000], ['Stock', 79000], ['Debtors', 56000]],
  provisions: [['Provision for Doubtful Debts', 3000, 'Debtors']], funds: [['Investment Fluctuation Fund', 4000]],
  liabilities: [['Creditors', SSL.cred], ['Bills Payable', 14000]], loansTo: { Chayanika: 10000 },
  capitals: { Anwesha: 110000, Bodhisattwa: 92000, Chayanika: 40000 }, currents: { Anwesha: 8000, Chayanika: -7000 },
  reserves: [['General Reserve', 15000]], losses: [['Advertisement Suspense', 10000]],
  sold: [['Buildings', SSL.bld], ['Stock', SSL.stock], ['Debtors', SSL.debt]],
  takenOver: [['Investments', 'Anwesha', SSL.inv], ['unrecorded computer', 'Bodhisattwa', SSL.comp]],
  toCreditor: [['Furniture', 'Creditors', SSLcash]], paidInFull: ['Bills Payable'],
  charged: [['realisation expenses', 'Chayanika', SSL.exp]],
});
eq([SSLcash, SUA.RA.result, SUA.RA.part, SUA.CA.pay, SUA.BANK.total, SUA.BS.total], [39200, 20800, { Anwesha: 8320, Bodhisattwa: 8320, Chayanika: 4160 }, { Anwesha: 101320, Bodhisattwa: 96320, Chayanika: 24660 }, 297000, 361000], 'l8_sualkuchi');
Q('l8_sualkuchi', long({
  t: [2, 3, 4], d: 5, c: 'analysis', marks: 8,
  stem: `Anwesha, Bodhisattwa and Chayanika share profits 2 : 2 : 1 in Sualkuchi Silk Looms, an imagined firm, and keep fixed capitals with current accounts. They dissolve the firm on ${DATE}.\n\n${bsHead('Anwesha, Bodhisattwa and Chayanika')}\n\n${SUA.BS.md}\n\n${nl([
    `Buildings realise ${rs(SSL.bld)}, stock ${rs(SSL.stock)} and debtors ${rs(SSL.debt)}.`,
    `Anwesha takes over the investments at ${rs(SSL.inv)}.`,
    `Creditors for ${rs(SSL.credFurn)} accept the furniture in full settlement; the other creditors are paid at a discount of ${SSL.disc}%.`,
    `A computer, not recorded in the books, is taken over by Bodhisattwa at ${rs(SSL.comp)}.`,
    `Chayanika has agreed to bear the realisation expenses; the firm pays them, ${rs(SSL.exp)}.`,
  ])}\n\nPrepare the Realisation Account, the partners' capital accounts and the Bank Account, following the ISC syllabus.`,
  model: `**Working notes:** the Investment Fluctuation Fund and the provision for doubtful debts go to the Realisation Account with their assets; bills payable are paid in full (silent); creditors' cash = ${SSL.disc}% less on ${inr(SSL.credOther)} = ${rs(SSLcash)}; current accounts are transferred to capitals; the loan to Chayanika is debited to her capital; the overdraft opens the Bank Account.\n\n**Realisation Account**\n\n${SUA.RA.md}\n\n**Partners' Capital Accounts**\n\n${SUA.CA.md}\n\n**Bank Account**\n\n${SUA.BANK.md}`,
  sol: 'Apply the ISC rules one by one (related fund and provision, overdraft, current accounts, loan to a partner, silent liability), then balance the three accounts in order.',
  scheme: [['Realisation: transfers incl. fund and provision', 1], ['Realisation: realisations, takeovers, creditors and bills payable', 1], [`Realisation: profit ${inr(SUA.RA.result)} shared 2 : 2 : 1`, 1], ['Capitals: current accounts and general reserve, advertisement suspense', 1], ['Capitals: loan to Chayanika, takeovers, expenses charged', 1], ['Capitals: closing payments', 1], ['Bank: overdraft and receipts', 1], ['Bank: payments; closes at nil', 1]],
}));

// Damayanti and Eknath, Ilkal Saree Dyers (imagined): Cash Account, bank loan, partner's loan with a debit capital,
// unrecorded liability, goodwill silent, stock silent, expenses reimbursed with a firm's asset.
const ISDx = { plant: 72000, debt: 25000, cred: 43500, claim: 4000, exp: 3000, stock: 32000 };
const ISD = dissolve({
  names: ['Damayanti', 'Eknath'], ratio: [3, 2], bankName: 'Cash', bank: 12000,
  assets: [['Goodwill', 10000], ['Dyeing Plant', 90000], ['Stock', ISDx.stock], ['Debtors', 28000], ['Printer', 3000]],
  liabilities: [['Creditors', 45000], ['Bank Loan', 30000]], loans: { Eknath: 15000 },
  capitals: { Damayanti: 70000, Eknath: 5000 }, reserves: [['Profit and Loss', 10000, 'Profit and Loss (credit balance)']],
  sold: [['Dyeing Plant', ISDx.plant], ['Debtors', ISDx.debt]], atBook: ['Stock'], worthless: ['Goodwill'],
  takenOver: [['Printer', 'Eknath', ISDx.exp]],
  paid: [['Creditors', ISDx.cred], ['unrecorded claim for damages', ISDx.claim]], paidInFull: ['Bank Loan'],
  assumed: [['realisation expenses', 'Eknath', ISDx.exp, 'realisation expenses paid']],
});
eq([ISD.RA.result, ISD.RA.part, ISD.CA.pay, ISD.CA.bring, ISD.BANK.total, ISD.BS.total], [-36500, { Damayanti: 21900, Eknath: 14600 }, { Damayanti: 54100 }, { Eknath: 5600 }, 146600, 175000], 'l8_ilkal');
Q('l8_ilkal', long({
  t: [2, 3, 4], d: 5, c: 'analysis', marks: 8,
  stem: `Damayanti and Eknath share profits 3 : 2 in Ilkal Saree Dyers, an imagined firm, and dissolve it on ${DATE}.\n\n${bsHead('Damayanti and Eknath')}\n\n${ISD.BS.md}\n\n${nl([
    `The dyeing plant realises ${rs(ISDx.plant)} and debtors ${rs(ISDx.debt)}. Nothing is said about the stock or the goodwill.`,
    `Creditors accept ${rs(ISDx.cred)} in full settlement; nothing is said about the bank loan.`,
    `A claim for damages of ${rs(ISDx.claim)}, not recorded in the books, is paid.`,
    `Eknath pays the realisation expenses of ${rs(ISDx.exp)}; the firm reimburses him by letting him take the printer at an agreed ${rs(ISDx.exp)}.`,
  ])}\n\nPrepare the Realisation Account, the partners' capital accounts, Eknath's Loan Account and the Cash Account, following the ISC syllabus.`,
  model: `**Working notes:** stock is realised at book value (${rs(ISDx.stock)}) and goodwill at nil (silent); the bank loan is paid in full through Realisation; Eknath is credited with the expenses he paid and debited with the printer he takes; his loan is repaid in full even though his capital ends in debit.\n\n**Realisation Account**\n\n${ISD.RA.md}\n\n**Partners' Capital Accounts**\n\n${ISD.CA.md}\n\n**Eknath's Loan Account**\n\n${ISD.LOANS.Eknath.md}\n\n**Cash Account**\n\n${ISD.BANK.md}`,
  sol: 'Apply the silent-item assumptions, record the reimbursement as two entries through Eknath\'s capital, and keep his loan separate from his capital.',
  scheme: [['Realisation: transfers and silent assets (stock at book, goodwill nil)', 1], ['Realisation: creditors, bank loan in full, unrecorded claim', 1], ['Realisation: expenses and printer through Eknath', 1], [`Realisation: loss ${inr(-ISD.RA.result)} shared 3 : 2`, 1], ['Capitals: profit and loss credit balance and loss', 1], ["Capitals: Eknath's debit balance made good in cash", 1], ["Eknath's Loan Account repaid in full", 1], ['Cash Account closes at nil', 1]],
}));

