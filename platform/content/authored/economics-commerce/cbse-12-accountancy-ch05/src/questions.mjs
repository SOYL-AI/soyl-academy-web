// CBSE 12 Accountancy, ch05 Dissolution of a Partnership Firm — question bank. Every firm, partner
// and figure is imagined by SOYL; no NCERT illustration or exercise and no CBSE sample/past-paper
// item is reused. Every amount is computed by acc.mjs from the givens and every statement is checked
// there (journal entries balance, Realisation, capital, loan and Bank/Cash accounts balance, opening
// balance sheets total, every asset is disposed of and every liability settled, the Bank/Cash Account
// closes at nil), so a figure in a key or model answer is never typed by hand.
// Scope 2026-27: piecemeal distribution, sale of the firm to a company and insolvency of partners are
// not in the syllabus and are not examined here.
import { Q, mcq, ar, tf, fb, match, num, short, long } from './lib.mjs';
import { F, fig, rs, sum, shares, ratioOf, split, pctOf, journal, realisation, dissolve, check } from './acc.mjs';

export const cap = (p) => `${p}'s Capital A/c`;
const bsTitle = (firm, date) => `**Balance Sheet of ${firm} as at ${date}**`;
const accounts = (D, { loan = false } = {}) =>
  `**Realisation Account**\n\n${D.RA.md}\n\n**Partners' Capital Accounts**\n\n${D.CA.md}\n\n${loan ? Object.entries(D.LOANS).map(([p, l]) => `**${p}'s Loan Account**\n\n${l.md}\n\n`).join('') : ''}**${D.B.replace(' A/c', '')} Account**\n\n${D.BANK.md}`;
const resultWords = (RA) => `${RA.result > 0 ? 'profit' : 'loss'} on realisation ${rs(Math.abs(RA.result))}`;

// ================================================================ t01 Modes of dissolution
Q('m_firm_meaning', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Dissolution of a partnership firm means that',
  opts: ['the business of the firm is closed and the relationship among all the partners comes to an end', 'one partner leaves and the remaining partners carry on the business', 'a new partner joins and the profit-sharing ratio changes', 'the partners change their profit-sharing ratio and carry on the business'],
  sol: 'When the firm itself is dissolved, the business is wound up: assets are realised, liabilities are paid and the partners are settled. The other three are reconstitutions, in which only the partnership changes and the firm survives.',
}));

Q('m_partnership_only', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which of the following results in the dissolution of the partnership but **not** in the dissolution of the firm?',
  opts: ['Retirement of a partner, the others carrying on the business', 'The business of the firm becoming unlawful', 'All the partners agreeing to close the business', 'A court order winding up the firm on a partner’s suit'],
  sol: 'On retirement the old agreement ends but the remaining partners continue the same business, so only the partnership is reconstituted. The other three end the business itself.',
}));

Q('m_compulsory_illegal', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'An imagined firm in Kozhikode imports a herbal product. A new law bans all trade in that product. The firm will be dissolved',
  opts: ['compulsorily, because its business has become unlawful', 'only if all the partners agree to it', 'only if the court orders it on a partner’s suit', 'only when the term of the partnership expires'],
  sol: 'Section 41 dissolves a firm automatically, whatever the partners want, when its business becomes illegal; no agreement, notice or court order is needed.',
}));

Q('m_contingency_term', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Shalini and Vikas formed an imagined firm in Madurai for a fixed period of three years to run a crafts kiosk. Nothing else is agreed. When the three years end, the firm is dissolved',
  opts: ['on the happening of a contingency, the expiry of its fixed term', 'by notice', 'compulsorily, because the business has become unlawful', 'by the court'],
  sol: 'Section 42 lists events that dissolve a firm unless the partners agree otherwise: expiry of a fixed term, completion of the venture, and death of a partner, among others.',
}));

Q('m_notice_at_will', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'A partner can dissolve a firm simply by giving notice to the other partners only when',
  opts: ['the partnership is at will', 'the partnership is for a fixed term', 'the partnership deed forbids dissolution', 'the court has already ordered dissolution'],
  sol: 'Section 43 allows dissolution by notice only in a partnership at will, that is, one with no fixed period or particular venture. The notice must be in writing to all the other partners.',
}));

Q('m_court_ground', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'On which of the following grounds may the court dissolve a firm when a partner files a suit?',
  opts: ['A partner has become permanently incapable of performing his duties as a partner', 'All the partners have agreed to close the business', 'A new law has made the business of the firm unlawful', 'The partners wish to change their profit-sharing ratio'],
  sol: 'Permanent incapacity is one of the Section 44 grounds. Closing by consent is dissolution by agreement; an unlawful business is dissolved compulsorily without the court; a change of ratio is only a reconstitution.',
}));

Q('ar_firm_partnership', ar({
  t: 1, d: 2, c: 'understanding', key: 'a',
  a: 'Dissolution of a firm always involves dissolution of the partnership.',
  r: 'When a firm is dissolved, its business is closed and the relationship among all the partners comes to an end.',
  sol: 'Both are true. Since every partner’s relationship ends when the firm closes, the partnership necessarily ends too; R explains A. The reverse is not true: a partnership can be dissolved while the firm continues.',
}));

Q('ar_retire', ar({
  t: 1, d: 3, c: 'analysis', key: 'd',
  a: 'The retirement of a partner always results in the dissolution of the firm.',
  r: 'On the retirement of a partner, the partnership among the partners is reconstituted.',
  sol: 'A is false: the continuing partners normally carry on the business, so the firm survives. R is true: the old agreement ends and a new one takes its place.',
}));

Q('ar_illegal', ar({
  t: 1, d: 3, c: 'understanding', key: 'b',
  a: 'A firm is compulsorily dissolved when its business becomes unlawful.',
  r: 'A partner may ask the court to dissolve a firm when another partner becomes of unsound mind.',
  sol: 'Both statements are true, but they describe two different modes. R is a ground for dissolution by the court; it does not explain why an unlawful business ends the firm automatically.',
}));

Q('tf_court_illegal', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? A firm whose business becomes illegal can be dissolved only by an order of the court.',
  sol: 'An unlawful business is a case of compulsory dissolution under Section 41: the firm ends by law without any court order.',
}));

Q('tf_notice_writing', tf({
  t: 1, d: 1, c: 'recall', ans: true,
  stem: 'True or false? In a partnership at will, the notice of dissolution given by a partner must be in writing.',
  sol: 'Section 43 requires written notice to all the other partners; the firm stands dissolved from the date mentioned in it or, if none, from the date of communication.',
}));

Q('fb_notice', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'A partnership at will may be dissolved by any partner giving notice in ___ to all the other partners.',
  acc: [['writing']],
  sol: 'The notice must be given in writing.',
}));

Q('mt_modes', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each situation in column A with the mode of dissolution in column B.',
  pairs: [
    ['The business of the firm becomes unlawful', 'Compulsory dissolution'],
    ['All the partners consent to close the firm', 'Dissolution by agreement'],
    ['A partner in a partnership at will writes to the others ending the firm', 'Dissolution by notice'],
    ['A partner becomes permanently incapable of working, and another partner sues', 'Dissolution by the court'],
  ],
  sol: 'Unlawful business: Section 41. Mutual consent: Section 40. Written notice in a partnership at will: Section 43. Permanent incapacity on a partner’s suit: Section 44.',
}));

Q('s3_partnership_vs_firm', short({
  t: 1, d: 2, c: 'understanding', marks: 3,
  stem: 'Distinguish between dissolution of partnership and dissolution of a partnership firm on any three bases.',
  model: [
    '| Basis | Dissolution of partnership | Dissolution of the firm |',
    '| --- | --- | --- |',
    '| Business | Continues under the reconstituted firm | Is closed |',
    '| Relationship | Ends between the outgoing partner and the others; the rest continue | Ends among all the partners |',
    '| Books of account | Are kept going; assets and liabilities are revalued | Are closed; assets are realised and liabilities paid |',
    '| Role of the court | No court order is involved | The firm may be dissolved by the court |',
    '| Link | Need not lead to dissolution of the firm | Always means dissolution of the partnership too |',
  ].join('\n'),
  sol: 'Any three bases with both columns correct earn the marks.',
  scheme: [['First basis, both sides', 1], ['Second basis, both sides', 1], ['Third basis, both sides', 1]],
}));

Q('s3_court_grounds', short({
  t: 1, d: 2, c: 'recall', marks: 3,
  stem: 'State any three grounds on which the court may order the dissolution of a partnership firm on the suit of a partner.',
  model: 'Any three of the following (Section 44):\n\n1. A partner has become of **unsound mind**.\n2. A partner has become **permanently incapable** of performing his duties as a partner.\n3. A partner is guilty of **misconduct** likely to harm the carrying on of the business.\n4. A partner **wilfully or persistently breaches** the partnership agreement, or behaves so that the others cannot reasonably carry on the business with him.\n5. A partner has **transferred his whole interest** in the firm to a third party.\n6. The business **cannot be carried on except at a loss**.\n7. Any other ground on which the court finds dissolution **just and equitable**.',
  sol: 'One mark for each correct ground, up to three.',
  scheme: [['First ground', 1], ['Second ground', 1], ['Third ground', 1]],
}));

Q('s3_modes_case', short({
  t: 1, d: 3, c: 'application', marks: 3,
  stem: 'Identify, with reason, the mode of dissolution in each case:\n\n(a) Nirmala, Joseph and Pritam formed an imagined firm in Panaji only to organise a single beach festival. The festival is over.\n(b) Rafiq and Lalita run an imagined firm in Agra that trades in ivory carvings. A new law prohibits all trade in ivory.\n(c) Kamal and Suraj have a partnership at will in an imagined shop in Ajmer. Kamal writes to Suraj that the firm will close from 1 June.',
  model: '(a) **On the happening of a contingency** (Section 42): a firm formed for a particular venture ends when the venture is completed, unless the partners agree otherwise.\n\n(b) **Compulsory dissolution** (Section 41): the business has become unlawful, so the firm ends by law.\n\n(c) **Dissolution by notice** (Section 43): in a partnership at will any partner may end the firm by written notice; it is dissolved from the date stated.',
  sol: 'Look for the trigger in each case: the venture completed, the law changed, or a written notice in a partnership at will.',
  scheme: [['(a) contingency, with reason', 1], ['(b) compulsory, with reason', 1], ['(c) by notice, with reason', 1]],
}));

Q('l4_modes', long({
  t: 1, d: 2, c: 'understanding', marks: 4,
  stem: 'Explain any four modes by which a partnership firm may be dissolved.',
  model: 'Any four of the following, each explained:\n\n1. **By agreement (Section 40):** the firm is dissolved with the consent of all the partners, or in accordance with a contract between them.\n2. **Compulsory dissolution (Section 41):** the firm ends by operation of law, whatever the partners wish, for example when its business becomes unlawful.\n3. **On the happening of certain contingencies (Section 42):** unless the partners agree otherwise, the firm is dissolved on events such as the expiry of its fixed term, the completion of the venture for which it was formed, or the death of a partner.\n4. **By notice (Section 43):** in a partnership at will, any partner may dissolve the firm by giving written notice to all the others.\n5. **By the court (Section 44):** on a partner’s suit, on grounds such as unsound mind or permanent incapacity of a partner, misconduct, persistent breach of the agreement, transfer of a partner’s whole interest, a business that can run only at a loss, or any just and equitable ground.',
  sol: 'One mark for each mode named and correctly explained, up to four.',
  scheme: [['First mode', 1], ['Second mode', 1], ['Third mode', 1], ['Fourth mode', 1]],
}));

Q('l4_situations', long({
  t: 1, d: 3, c: 'analysis', marks: 4,
  stem: 'For each situation, state whether it is a dissolution of the partnership only or a dissolution of the firm, and name the mode where the firm is dissolved:\n\n(a) Ruby retires from an imagined bakery in Kolkata; Sohan and Tina continue the business.\n(b) The three partners of an imagined travel firm in Leh all agree to close it after a poor season.\n(c) In an imagined transport firm in Ranchi, Ujjal keeps breaking the partnership agreement; Varun sues, and the court orders the firm to be wound up.\n(d) An imagined firm in Bhuj was formed only to build one community hall, and the hall has been handed over.',
  model: '(a) **Dissolution of the partnership only.** The firm is reconstituted: Sohan and Tina carry on the same business, so its books continue.\n\n(b) **Dissolution of the firm, by agreement** (Section 40): all the partners consent to close the business.\n\n(c) **Dissolution of the firm, by the court** (Section 44): persistent breach of the agreement is a ground on which the court may dissolve the firm on a partner’s suit.\n\n(d) **Dissolution of the firm on the happening of a contingency** (Section 42): the venture for which it was formed is complete.',
  sol: 'First ask whether the business goes on; if it stops, find what caused it to stop.',
  scheme: [['(a) partnership only, reason', 1], ['(b) firm, by agreement', 1], ['(c) firm, by the court', 1], ['(d) firm, contingency', 1]],
}));

// ================================================================ t02 Settlement of accounts: order of payment
Q('m_s48_first', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Under Section 48 of the Indian Partnership Act 1932, the assets of a dissolved firm, including any sums contributed by partners to make up deficiencies, are first used to pay',
  opts: ['the debts of the firm to third parties', 'loans given to the firm by partners', 'the partners’ capitals', 'any surplus to the partners in their profit-sharing ratio'],
  sol: 'Outsiders come first; then partners’ advances (loans) rateably; then partners’ capitals rateably; and any residue is shared in the profit-sharing ratio.',
}));

Q('m_loan_order', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Besides her capital, Esha has lent money to her firm. When the firm is dissolved, her loan is repaid',
  opts: ['after the outside liabilities but before any partner’s capital', 'before the outside liabilities', 'after all the partners’ capitals', 'through her capital account along with her capital'],
  sol: 'Section 48 puts a partner’s advances after third-party debts and ahead of capital. The loan is settled directly from the bank: Esha’s Loan A/c Dr, To Bank A/c.',
}));

Q('ar_loan', ar({
  t: 2, d: 2, c: 'understanding', key: 'a',
  a: 'On dissolution, a partner’s loan to the firm is paid before the capitals of the partners are returned.',
  r: 'Section 48 ranks advances made by partners, as distinguished from capital, ahead of amounts due to them on account of capital.',
  sol: 'Both are true, and R states the very rule of the Act that produces A.',
}));

Q('fb_s48', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'Under Section 48, after paying the debts of the firm to third parties, the firm’s assets are used to repay partners’ ___ before returning their capitals.',
  acc: [['loans', 'loan', 'advances']],
  sol: 'Partners’ loans (advances) come next, before capital.',
}));

Q('s3_order_s48', short({
  t: 2, d: 2, c: 'understanding', marks: 3,
  stem: 'Explain the order in which the accounts of a firm are settled on its dissolution under Section 48 of the Indian Partnership Act 1932, in the absence of any agreement among the partners.',
  model: '**(a) Losses:** losses, including deficiencies of capital, are met first out of profits, next out of capital and, lastly, if necessary, by the partners individually in their profit-sharing ratio.\n\n**(b) Application of assets** (including sums contributed by partners to make up deficiencies), in this order:\n1. Debts of the firm to **third parties** (outside liabilities).\n2. **Advances (loans)** made by each partner, rateably.\n3. Amounts due to each partner on account of **capital**, rateably.\n4. The **residue**, if any, divided among the partners in their **profit-sharing ratio**.',
  sol: 'Rule (a) is about bearing losses; rule (b) is about the order of payments out of the assets.',
  scheme: [['Rule for losses', 1], ['Outside debts first, then partners’ loans', 1], ['Capitals, then the residue in the profit-sharing ratio', 1]],
}));

// l4: Section 48 applied (Prakash, Qureshi, Ruchi)
const S48 = { names: ['Prakash', 'Qureshi', 'Ruchi'], parts: [2, 2, 1], cash: 305000, creditors: 120000, bankLoan: 50000, loan: 25000, capitals: { Prakash: 80000, Qureshi: 60000, Ruchi: 30000 } };
const S48sh = shares(S48.names, S48.parts);
const S48claims = S48.creditors + S48.bankLoan + S48.loan + sum(Object.values(S48.capitals));
const S48loss = S48claims - S48.cash;
const S48lossSh = split(S48loss, S48sh);
const S48pay = Object.fromEntries(S48.names.map((p) => [p, S48.capitals[p] - S48lossSh[p]]));
check(S48loss === 60000 && S48pay.Prakash === 56000 && S48pay.Ruchi === 18000 && S48.creditors + S48.bankLoan + S48.loan + sum(Object.values(S48pay)) === S48.cash, 'S48');
Q('l4_s48', long({
  t: 2, d: 3, c: 'application', marks: 4,
  stem: `Prakash, Qureshi and Ruchi share the profits of an imagined printing unit in Kanpur in the ratio 2:2:1. The firm is dissolved. After every asset has been sold and the realisation expenses paid, the firm has ${rs(S48.cash)} at the bank. It owes creditors ${rs(S48.creditors)} and a bank loan of ${rs(S48.bankLoan)}; Ruchi has also lent the firm ${rs(S48.loan)}. The capitals stand at Prakash ${rs(S48.capitals.Prakash)}, Qureshi ${rs(S48.capitals.Qureshi)} and Ruchi ${rs(S48.capitals.Ruchi)}, and there are no reserves. Find the loss to be borne by the partners and show how the bank balance is paid out under Section 48.`,
  model: `**Loss:** total claims = ${fig(S48.creditors)} + ${fig(S48.bankLoan)} + ${fig(S48.loan)} + ${fig(sum(Object.values(S48.capitals)))} = ${fig(S48claims)}; cash available ${fig(S48.cash)}; shortfall = **${fig(S48loss)}**, borne 2:2:1: Prakash ${fig(S48lossSh.Prakash)}, Qureshi ${fig(S48lossSh.Qureshi)}, Ruchi ${fig(S48lossSh.Ruchi)}.\n\n| Order (Section 48) | Paid to | ₹ |\n| --- | --- | ---: |\n| 1. Outside liabilities | Creditors | ${fig(S48.creditors)} |\n| 1. Outside liabilities | Bank loan | ${fig(S48.bankLoan)} |\n| 2. Partner’s loan | Ruchi | ${fig(S48.loan)} |\n| 3. Capitals (after the loss) | Prakash ${fig(S48.capitals.Prakash)} − ${fig(S48lossSh.Prakash)} | ${fig(S48pay.Prakash)} |\n| 3. Capitals (after the loss) | Qureshi ${fig(S48.capitals.Qureshi)} − ${fig(S48lossSh.Qureshi)} | ${fig(S48pay.Qureshi)} |\n| 3. Capitals (after the loss) | Ruchi ${fig(S48.capitals.Ruchi)} − ${fig(S48lossSh.Ruchi)} | ${fig(S48pay.Ruchi)} |\n| **Total** | | **${fig(S48.cash)}** |`,
  sol: 'The loss comes out of capital in the profit-sharing ratio; the bank balance is then used in the Section 48 order and is exactly used up.',
  scheme: [[`Loss ${rs(S48loss)} and its shares`, 1], ['Outside liabilities first', 1], ['Ruchi’s loan next', 1], ['Capitals net of loss', 1]],
}));

// ================================================================ t02 Realisation Account: what goes in
Q('m_not_ra', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which of the following is **not** transferred to the Realisation Account when a firm is dissolved?',
  opts: ['A partner’s loan to the firm', 'Bills payable', 'Provision for doubtful debts', 'Machinery'],
  sol: 'A partner’s loan is paid directly from the bank after outside liabilities. Machinery goes to the debit side; bills payable and the provision go to the credit side.',
}));

Q('m_provision_ra', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'On dissolution, the Provision for Doubtful Debts appearing in the balance sheet is',
  opts: ['credited to the Realisation Account, the debtors being debited at their gross amount', 'debited to the Realisation Account', 'credited to the partners’ capital accounts in their profit-sharing ratio', 'ignored, because debtors are transferred at their net amount'],
  sol: 'Debtors go to the debit side at their full book amount and the provision against them goes to the credit side, so the net effect equals the net book value.',
}));

Q('ar_provision', ar({
  t: 2, d: 3, c: 'analysis', key: 'c',
  a: 'Provision for Doubtful Debts is credited to the Realisation Account on the dissolution of a firm.',
  r: 'Debtors are transferred to the Realisation Account at their net value after deducting the provision.',
  sol: 'A is true. R is false: debtors are transferred at their gross figure, and that is precisely why the provision has to be credited separately.',
}));

Q('tf_cash_ra', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? On dissolution, the bank balance of the firm is transferred to the debit side of the Realisation Account along with the other assets.',
  sol: 'Cash and bank are not realised: they are already money. They stay in the Cash or Bank Account, which records every receipt and payment and finally closes at nil.',
}));

Q('fb_nominal', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'Realisation Account is a ___ account, prepared to find the profit or loss on the sale of assets and the payment of liabilities.',
  acc: [['nominal']],
  sol: 'It is a nominal account: it records gains and losses.',
}));

Q('m_gr', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'A General Reserve appearing in the balance sheet at the time of dissolution is',
  opts: ['credited to the partners’ capital accounts in their profit-sharing ratio', 'credited to the Realisation Account', 'debited to the Realisation Account', 'credited to the partners’ capital accounts in their capital ratio'],
  sol: 'A reserve is undistributed profit, so it belongs to the partners in the ratio in which they share profits; it never passes through realisation.',
}));

Q('m_pl_debit', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'A debit balance of the Profit and Loss Account shown on the assets side of a firm’s balance sheet at the time of dissolution is',
  opts: ['debited to the partners’ capital accounts in their profit-sharing ratio', 'debited to the Realisation Account', 'credited to the partners’ capital accounts', 'transferred to the Bank Account'],
  sol: 'An accumulated loss is a fictitious asset that cannot be sold; it is written off against the partners’ capitals in their profit-sharing ratio.',
}));

const RES = { names: ['Kunal', 'Lekha'], parts: [2, 1], gr: 18000, pl: 6000, adv: 3000, loan: 12000 };
const RESsh = shares(RES.names, RES.parts);
const J_RES = journal([
  { dr: [['General Reserve A/c', RES.gr]], cr: Object.entries(split(RES.gr, RESsh)).map(([p, v]) => [cap(p), v]), nar: 'general reserve distributed in the ratio 2:1' },
  { dr: Object.entries(split(RES.pl + RES.adv, RESsh)).map(([p, v]) => [cap(p), v]), cr: [['Profit and Loss A/c', RES.pl], ['Advertisement Suspense A/c', RES.adv]], nar: 'accumulated loss and deferred advertisement expenditure written off in the ratio 2:1' },
  { dr: [["Lekha's Loan A/c", RES.loan]], cr: [['Bank A/c', RES.loan]], nar: "Lekha's loan repaid" },
]);
Q('s3_reserves_close', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `Kunal and Lekha share profits 2:1 in an imagined two-wheeler workshop in Solapur, which they dissolve. Their balance sheet shows a General Reserve of ${rs(RES.gr)}, a debit balance of ${rs(RES.pl)} in the Profit and Loss Account, an Advertisement Suspense (deferred advertisement expenditure) of ${rs(RES.adv)} and a loan of ${rs(RES.loan)} from Lekha. Pass the journal entries for these items, assuming the loan is repaid in full.`,
  model: `${J_RES.md}\n\nNone of these items passes through the Realisation Account.`,
  sol: 'Reserves are credited and fictitious assets debited to capitals in the profit-sharing ratio; the partner’s loan is paid straight from the bank.',
  scheme: [['General reserve entry', 1], ['Loss and advertisement suspense written off', 1], ['Loan repaid', 1]],
}));

// ================================================================ t02 Realisation entries
Q('m_takeover_entry', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'On dissolution, Kiran, a partner, takes over the firm’s car at an agreed value. The entry is',
  opts: ['Kiran’s Capital A/c Dr, To Realisation A/c', 'Realisation A/c Dr, To Kiran’s Capital A/c', 'Car A/c Dr, To Kiran’s Capital A/c', 'Kiran’s Capital A/c Dr, To Car A/c'],
  sol: 'The car is already on the debit of Realisation, so its value is now credited there; Kiran receives the car instead of money, so his capital is debited.',
}));

Q('m_assumed_liab', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Ramesh, a partner, agrees to pay off the firm’s bills payable himself. The entry on dissolution is',
  opts: ['Realisation A/c Dr, To Ramesh’s Capital A/c', 'Ramesh’s Capital A/c Dr, To Realisation A/c', 'Bills Payable A/c Dr, To Ramesh’s Capital A/c', 'Realisation A/c Dr, To Bank A/c'],
  sol: 'Bills payable are already on the credit of Realisation; discharging them is a debit to Realisation, and Ramesh, who pays, is credited.',
}));

Q('ar_takeover', ar({
  t: 2, d: 3, c: 'analysis', key: 'd',
  a: 'When a partner takes over an asset of the firm on dissolution, the agreed value is credited to his capital account.',
  r: 'Taking over an asset reduces the amount finally payable to that partner.',
  sol: 'A is false: his capital account is debited, not credited. R is true, and it is the reason the debit is correct.',
}));

const UNP = 2500;
Q('m_unrecorded_taken', mcq({
  t: 2, d: 3, c: 'application',
  stem: `An old printer, fully written off and not shown in the books, is taken over by Sapna, a partner, at ${rs(UNP)} when the firm is dissolved. The entry is`,
  opts: [`Sapna's Capital A/c Dr ${rs(UNP)}, To Realisation A/c ${rs(UNP)}`, `Realisation A/c Dr ${rs(UNP)}, To Sapna's Capital A/c ${rs(UNP)}`, `Printer A/c Dr ${rs(UNP)}, To Sapna's Capital A/c ${rs(UNP)}`, 'No entry, because the printer is not in the books'],
  sol: 'An unrecorded asset taken over by a partner is a gain on realisation: credit Realisation and debit the partner’s capital with the agreed value.',
}));

Q('tf_unrecorded_liab', tf({
  t: 2, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? An unrecorded liability paid by the firm at the time of dissolution is debited to the Realisation Account.',
  sol: 'Paying it is an extra cost of closing the firm, so Realisation is debited and Bank credited.',
}));

Q('m_creditor_asset', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'A creditor of an imagined firm accepts a machine in full settlement of his claim. The machine and the creditor have both been transferred to the Realisation Account already. The entry is',
  opts: ['no entry is passed', 'Creditors A/c Dr, To Machinery A/c', 'Realisation A/c Dr, To Machinery A/c', 'Creditors A/c Dr, To Realisation A/c'],
  sol: 'Both items are already in Realisation, and no cash moves, so nothing more needs recording; the difference between them is reflected in the realisation result automatically.',
}));

Q('m_expense_by_partner', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Yusuf, a partner, pays the realisation expenses out of his own pocket on behalf of the firm, and the firm is to bear them. The entry is',
  opts: ['Realisation A/c Dr, To Yusuf’s Capital A/c', 'Yusuf’s Capital A/c Dr, To Realisation A/c', 'Realisation A/c Dr, To Bank A/c', 'no entry is needed'],
  sol: 'The expense belongs to the firm, so Realisation is debited; the firm now owes Yusuf, so his capital is credited.',
}));

const REM = { fee: 6000, spent: 4500 };
Q('m_calc_remuneration', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: `Bindu, a partner, is to receive ${rs(REM.fee)} for carrying out the dissolution of an imagined firm and is to bear all realisation expenses. The actual expenses of ${rs(REM.spent)} are paid by the firm. The amount debited to the Realisation Account for the dissolution work is`,
  opts: [rs(REM.fee), rs(REM.spent), rs(REM.fee + REM.spent), rs(REM.fee - REM.spent)],
  sol: `Only the agreed remuneration of ${fig(REM.fee)} is the firm’s cost (Realisation Dr, To Bindu’s Capital). The ${fig(REM.spent)} is Bindu’s own burden: Bindu’s Capital Dr, To Bank.`,
}));

const CB = 7000;
Q('m_cash_brought', mcq({
  t: 2, d: 3, c: 'application',
  stem: `After every adjustment on dissolution, Arvind's capital account shows a debit balance of ${rs(CB)}. The entry to settle it is`,
  opts: [`Bank A/c Dr ${rs(CB)}, To Arvind's Capital A/c ${rs(CB)}`, `Arvind's Capital A/c Dr ${rs(CB)}, To Bank A/c ${rs(CB)}`, `Realisation A/c Dr ${rs(CB)}, To Arvind's Capital A/c ${rs(CB)}`, `Arvind's Capital A/c Dr ${rs(CB)}, To Realisation A/c ${rs(CB)}`],
  sol: 'A debit balance means Arvind owes the firm; he brings in cash, so Bank is debited and his capital account is credited, which closes it.',
}));

// m: realisation result with a provision, a takeover and expenses
const MP = { assets: 180000, prov: 5000, cred: 40000, cash: 160000, car: 25000, credPaid: 38000, exp: 3000 };
const MPra = realisation([['Assets', MP.assets], ['Bank (creditors paid)', MP.credPaid], ['Bank (expenses)', MP.exp]], [['Provision', MP.prov], ['Creditors', MP.cred], ['Bank (assets realised)', MP.cash], ['Partner (car)', MP.car]], shares(['X', 'Y'], [1, 1]));
const MPnoProv = MPra.result - MP.prov;
const MPnoCar = MPra.result - MP.car;
const MPnoExp = MPra.result + MP.exp;
check(MPra.result === 9000 && MPnoProv === 4000 && MPnoCar === -16000 && MPnoExp === 12000, 'MP');
const pl = (v) => `${v > 0 ? 'Profit' : 'Loss'} of ${rs(Math.abs(v))}`;
Q('m_calc_profit', mcq({
  t: 2, d: 3, c: 'application',
  stem: `On the dissolution of an imagined firm, assets of ${rs(MP.assets)} (book value, debtors at their gross figure) and a provision for doubtful debts of ${rs(MP.prov)} are transferred to the Realisation Account, along with creditors of ${rs(MP.cred)}. Assets realise ${rs(MP.cash)} in cash, a partner takes over the car at ${rs(MP.car)}, creditors are paid ${rs(MP.credPaid)} and expenses are ${rs(MP.exp)}. The result on realisation is`,
  opts: [pl(MPra.result), pl(MPnoProv), pl(MPnoCar), pl(MPnoExp)],
  sol: `Credit side: ${fig(MP.prov)} + ${fig(MP.cred)} + ${fig(MP.cash)} + ${fig(MP.car)} = ${fig(MPra.crTotal)}. Debit side: ${fig(MP.assets)} + ${fig(MP.credPaid)} + ${fig(MP.exp)} = ${fig(MPra.drTotal)}. Profit = ${fig(MPra.result)}.`,
}));

Q('mt_entries', match({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each transaction on dissolution in column A with its journal entry in column B.',
  pairs: [
    ['An asset is taken over by a partner', 'Partner’s Capital A/c Dr, To Realisation A/c'],
    ['A liability is taken over by a partner', 'Realisation A/c Dr, To Partner’s Capital A/c'],
    ['An asset is sold for cash', 'Bank A/c Dr, To Realisation A/c'],
    ['A creditor is paid in cash', 'Realisation A/c Dr, To Bank A/c'],
  ],
  sol: 'Money or value coming in for assets is credited to Realisation; settling liabilities is debited to it; the partner or Bank is the other side.',
}));

// numericals
const NRL = { assets: 320000, cred: 80000, cash: 290000, credPaid: 76000, exp: 3000 };
const NRLra = realisation([['Assets', NRL.assets], ['Bank (creditors)', NRL.credPaid], ['Bank (expenses)', NRL.exp]], [['Creditors', NRL.cred], ['Bank (assets)', NRL.cash]], shares(['P', 'Q'], [1, 1]));
check(NRLra.result === -29000, 'NRL');
Q('n_real_loss', num({
  t: 2, d: 3, c: 'application', marks: 2, value: -NRLra.result, unit: '₹',
  stem: `An imagined firm is dissolved. Its assets other than bank, ${rs(NRL.assets)} at book value, and its creditors of ${rs(NRL.cred)} are transferred to the Realisation Account. The assets realise ${rs(NRL.cash)}; the creditors accept ${rs(NRL.credPaid)} in full settlement; realisation expenses are ${rs(NRL.exp)}. Find the loss on realisation (in ₹).`,
  sol: `Credits ${fig(NRL.cred)} + ${fig(NRL.cash)} = ${fig(NRLra.crTotal)}; debits ${fig(NRL.assets)} + ${fig(NRL.credPaid)} + ${fig(NRL.exp)} = ${fig(NRLra.drTotal)}. Loss = ${fig(NRLra.drTotal)} − ${fig(NRLra.crTotal)} = ${fig(-NRLra.result)}. So ₹${fig(-NRLra.result)}.`,
  scheme: [['Both sides totalled', 1], [`Loss ${rs(-NRLra.result)}`, 1]],
}));

const NCC = { cred: 75000, machine: 30000, disc: 4 };
const NCCcash = pctOf(100 - NCC.disc, NCC.cred - NCC.machine);
check(NCCcash === 43200, 'NCC');
Q('n_creditors_cash', num({
  t: 2, d: 3, c: 'application', marks: 2, value: NCCcash, unit: '₹',
  stem: `On the dissolution of an imagined firm in Ujjain, creditors of ${rs(NCC.cred)} agree to take over machinery at an agreed value of ${rs(NCC.machine)} and to accept the rest of their claim in cash at a discount of ${NCC.disc}%. How much cash is paid to the creditors (in ₹)?`,
  sol: `Balance of the claim = ${fig(NCC.cred)} − ${fig(NCC.machine)} = ${fig(NCC.cred - NCC.machine)}. Cash at ${100 - NCC.disc}% of it = ${fig(NCCcash)}. So ₹${fig(NCCcash)}.`,
  scheme: [['Balance after the machinery', 1], [`Cash ${rs(NCCcash)}`, 1]],
}));

const NDC = { debtors: 60000, bad: 4000, disc: 5 };
const NDCcash = pctOf(100 - NDC.disc, NDC.debtors - NDC.bad);
check(NDCcash === 53200, 'NDC');
Q('n_debtors_cash', num({
  t: 2, d: 3, c: 'application', marks: 2, value: NDCcash, unit: '₹',
  stem: `An imagined firm being dissolved has debtors of ${rs(NDC.debtors)}. Of these, ${rs(NDC.bad)} prove bad, and the rest are collected at a discount of ${NDC.disc}%. What amount is credited to the Realisation Account for debtors realised (in ₹)?`,
  sol: `Good debtors = ${fig(NDC.debtors)} − ${fig(NDC.bad)} = ${fig(NDC.debtors - NDC.bad)}. Collected at ${100 - NDC.disc}% = ${fig(NDCcash)}. So ₹${fig(NDCcash)}.`,
  scheme: [['Good debtors', 1], [`Amount realised ${rs(NDCcash)}`, 1]],
}));

const NCB = { cap: 20000, gr: 4000, loss: 18000, stock: 9000 };
const NCBbal = NCB.cap + NCB.gr - NCB.loss - NCB.stock;
check(NCBbal === -3000, 'NCB');
Q('n_cash_brought', num({
  t: 2, d: 3, c: 'application', marks: 2, value: -NCBbal, unit: '₹',
  stem: `On dissolution, Rohit's capital account has a credit balance of ${rs(NCB.cap)}. His share of the General Reserve is ${rs(NCB.gr)} and his share of the loss on realisation is ${rs(NCB.loss)}. He also takes over stock at ${rs(NCB.stock)}. How much cash must Rohit bring in to close his account (in ₹)?`,
  sol: `Balance = ${fig(NCB.cap)} + ${fig(NCB.gr)} − ${fig(NCB.loss)} − ${fig(NCB.stock)} = ${fig(NCBbal)}, a debit balance. He brings in ${fig(-NCBbal)}. So ₹${fig(-NCBbal)}.`,
  scheme: [['Balance worked out', 1], [`Cash brought in ${rs(-NCBbal)}`, 1]],
}));

const NPF = { cap: 50000, plDebit: 3000, profit: 4500, furniture: 12000, exp: 1500 };
const NPFpay = NPF.cap - NPF.plDebit + NPF.profit - NPF.furniture + NPF.exp;
check(NPFpay === 41000, 'NPF');
Q('n_partner_final', num({
  t: 2, d: 3, c: 'application', marks: 2, value: NPFpay, unit: '₹',
  stem: `Kamala's capital in an imagined firm being dissolved is ${rs(NPF.cap)}. Her share of the debit balance of the Profit and Loss Account is ${rs(NPF.plDebit)} and her share of the profit on realisation is ${rs(NPF.profit)}. She takes over furniture at ${rs(NPF.furniture)} and paid realisation expenses of ${rs(NPF.exp)} on behalf of the firm. What amount is finally paid to her (in ₹)?`,
  sol: `${fig(NPF.cap)} − ${fig(NPF.plDebit)} + ${fig(NPF.profit)} − ${fig(NPF.furniture)} + ${fig(NPF.exp)} = ${fig(NPFpay)}. So ₹${fig(NPFpay)}.`,
  scheme: [['Credits and debits to her capital', 1], [`Final payment ${rs(NPFpay)}`, 1]],
}));

const NLS = { dr: 410000, cr: 374000 };
const NLSra = realisation([['Debits before the result', NLS.dr]], [['Credits before the result', NLS.cr]], shares(['Xavier', 'Yash', 'Zoya'], [5, 3, 1]));
check(NLSra.part.Zoya === 4000, 'NLS');
Q('n_loss_share', num({
  t: 2, d: 2, c: 'application', marks: 1, value: NLSra.part.Zoya, unit: '₹',
  stem: `Before the result is transferred, the debit side of the Realisation Account of an imagined firm totals ${rs(NLS.dr)} and the credit side ${rs(NLS.cr)}. Xavier, Yash and Zoya share profits 5:3:1. What is Zoya's share of the result (in ₹)?`,
  sol: `Loss = ${fig(NLS.dr)} − ${fig(NLS.cr)} = ${fig(-NLSra.result)}. Zoya bears 1/9 of it = ${fig(NLSra.part.Zoya)}. So ₹${fig(NLSra.part.Zoya)} (a loss).`,
}));

// s3: takeovers
const TK = { stock: 20000, stockAt: 18000, bp: 12000, laptop: 7000 };
const J_TK = journal([
  { dr: [["Dev's Capital A/c", TK.stockAt]], cr: [['Realisation A/c', TK.stockAt]], nar: 'stock taken over by Dev' },
  { dr: [['Realisation A/c', TK.bp]], cr: [["Ekta's Capital A/c", TK.bp]], nar: 'bills payable taken over by Ekta' },
  { dr: [["Dev's Capital A/c", TK.laptop]], cr: [['Realisation A/c', TK.laptop]], nar: 'unrecorded laptop taken over by Dev' },
]);
Q('s3_takeover_entries', short({
  t: 2, d: 2, c: 'application', marks: 3,
  stem: `Dev and Ekta are dissolving their imagined screen-printing firm in Ahmedabad. Assets and outside liabilities have already been transferred to the Realisation Account. Pass journal entries for the following:\n\n(a) Dev takes over stock, whose book value is ${rs(TK.stock)}, at ${rs(TK.stockAt)}.\n(b) Ekta agrees to pay the bills payable of ${rs(TK.bp)}.\n(c) A laptop not recorded in the books is taken over by Dev at ${rs(TK.laptop)}.`,
  model: `${J_TK.md}\n\nIn (a) the agreed value, not the book value, is recorded; the difference shows up in the realisation result.`,
  sol: 'Taking over an asset: partner debited, Realisation credited. Taking over a liability: Realisation debited, partner credited.',
  scheme: [['(a) stock taken over at the agreed value', 1], ['(b) liability taken over', 1], ['(c) unrecorded asset taken over', 1]],
}));

// s3: creditors settled in three ways
const CS = { c1: 15000, stock: 14000, c2: 30000, machine: 24000, c3: 15000, disc: 2 };
const CSm = CS.c2 - CS.machine;
const CS3 = pctOf(100 - CS.disc, CS.c3);
check(CSm === 6000 && CS3 === 14700, 'CS');
const J_CS = journal([
  { dr: [['Realisation A/c', CSm]], cr: [['Bank A/c', CSm]], nar: 'balance paid to creditors who accepted machinery' },
  { dr: [['Realisation A/c', CS3]], cr: [['Bank A/c', CS3]], nar: `remaining creditors paid at a discount of ${CS.disc}%` },
]);
Q('s3_creditor_settle', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `An imagined cement agency in Sambalpur is dissolved; its creditors of ${rs(CS.c1 + CS.c2 + CS.c3)} have been transferred to the Realisation Account. They are settled as follows:\n\n(a) A creditor for ${rs(CS.c1)} accepts stock (book value ${rs(CS.stock)}) in full settlement.\n(b) Creditors for ${rs(CS.c2)} take over machinery at ${rs(CS.machine)} and are paid the rest of their claim in cash.\n(c) The remaining creditors are paid in cash at a discount of ${CS.disc}%.\n\nPass the journal entries.`,
  model: `(a) **No entry.** The stock and the creditor are both already in the Realisation Account and no cash is paid.\n\n(b) and (c):\n\n${J_CS.md}\n\nWorkings: (b) ${fig(CS.c2)} − ${fig(CS.machine)} = ${fig(CSm)}; (c) remaining creditors ${fig(CS.c3)} less ${CS.disc}% = ${fig(CS3)}.`,
  sol: 'Only the cash that leaves the firm is recorded; the asset handed over needs no entry.',
  scheme: [['(a) no entry, with reason', 1], [`(b) ${rs(CSm)}`, 1], [`(c) ${rs(CS3)}`, 1]],
}));

// s3: remuneration with expenses paid by the firm
const RM = { fee: 7000, spent: 5200 };
const J_RM = journal([
  { dr: [['Realisation A/c', RM.fee]], cr: [["Farhan's Capital A/c", RM.fee]], nar: 'remuneration allowed to Farhan for carrying out the dissolution' },
  { dr: [["Farhan's Capital A/c", RM.spent]], cr: [['Bank A/c', RM.spent]], nar: 'realisation expenses, to be borne by Farhan, paid by the firm' },
]);
Q('s3_expense_remun', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `Farhan, a partner in an imagined travel firm in Vijayawada, is appointed to complete the dissolution. He is to get a remuneration of ${rs(RM.fee)} and to bear all realisation expenses himself. The expenses come to ${rs(RM.spent)}, which the firm pays on his behalf. Pass the journal entries and state the net effect on Farhan's capital account.`,
  model: `${J_RM.md}\n\nNet effect: Farhan's capital rises by ${fig(RM.fee)} − ${fig(RM.spent)} = **${fig(RM.fee - RM.spent)}**. The Realisation Account bears only the agreed ${fig(RM.fee)}.`,
  sol: 'The remuneration is the firm’s cost; the expenses are the partner’s own, even when the firm pays them.',
  scheme: [['Remuneration entry', 1], ['Expenses charged to Farhan', 1], [`Net effect ${rs(RM.fee - RM.spent)}`, 1]],
}));

// s3: unrecorded items
const UR = { inv: 7500, bill: 2400, tw: 1500 };
const J_UR = journal([
  { dr: [['Bank A/c', UR.inv]], cr: [['Realisation A/c', UR.inv]], nar: 'unrecorded investments sold' },
  { dr: [['Realisation A/c', UR.bill]], cr: [['Bank A/c', UR.bill]], nar: 'unrecorded electricity bill paid' },
  { dr: [["Jagdish's Capital A/c", UR.tw]], cr: [['Realisation A/c', UR.tw]], nar: 'unrecorded typewriter taken over by Jagdish' },
]);
Q('s3_unrecorded', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `Harini and Jagdish are closing an imagined seed business in Hospet. Pass journal entries for these items, none of which appears in the books:\n\n(a) Investments are sold for ${rs(UR.inv)}.\n(b) An electricity bill of ${rs(UR.bill)} is paid.\n(c) An old typewriter is taken over by Jagdish at ${rs(UR.tw)}.`,
  model: `${J_UR.md}\n\nUnrecorded assets bring a gain (credit Realisation); unrecorded liabilities bring a loss (debit Realisation).`,
  sol: 'Treat each item as if it had been in the books: what comes in is credited to Realisation, what goes out is debited.',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1]],
}));

// l4: journal for four separate transactions (Hooghly Jute Works)
const JM = { vanBook: 40000, van: 36000, cred: 25000, furn: 22000, clock: 4500, exp: 2700 };
const J_JM_a = journal([{ dr: [["Ravi's Capital A/c", JM.van]], cr: [['Realisation A/c', JM.van]], nar: 'delivery van taken over by Ravi' }]);
const J_JM_c = journal([{ dr: [['Bank A/c', JM.clock]], cr: [['Realisation A/c', JM.clock]], nar: 'unrecorded wall clock sold' }]);
const J_JM_d = journal([{ dr: [['Realisation A/c', JM.exp]], cr: [["Seema's Capital A/c", JM.exp]], nar: 'realisation expenses paid by Seema on behalf of the firm' }]);
Q('l4_journal_mixed', long({
  t: 2, d: 3, c: 'application', marks: 4,
  stem: `Ravi, Seema and Zubin are dissolving their imagined jute-bag business in Howrah. Pass journal entries for each of the following separate transactions:\n\n(a) Ravi takes over the delivery van (book value ${rs(JM.vanBook)}) at ${rs(JM.van)}.\n(b) A creditor for ${rs(JM.cred)} accepts furniture valued at ${rs(JM.furn)} in full settlement.\n(c) An antique wall clock, never recorded in the books, is sold for ${rs(JM.clock)}.\n(d) Realisation expenses of ${rs(JM.exp)} are paid by Seema on behalf of the firm.`,
  model: `**(a)**\n\n${J_JM_a.md}\n\n**(b) No entry**: the furniture and the creditor are both in the Realisation Account already and no cash changes hands.\n\n**(c)**\n\n${J_JM_c.md}\n\n**(d)**\n\n${J_JM_d.md}`,
  sol: 'Ask in each case who gives value and who receives it; Realisation is always one side, except when nothing moves.',
  scheme: [['(a)', 1], ['(b) no entry', 1], ['(c)', 1], ['(d)', 1]],
}));

// l4: realisation expenses in four cases
const EXC = 3500;
const EXCrem = 5000;
const J_EX = {
  a: journal([{ dr: [['Realisation A/c', EXC]], cr: [['Bank A/c', EXC]], nar: 'realisation expenses paid by the firm' }]),
  b: journal([{ dr: [['Realisation A/c', EXC]], cr: [["Anil's Capital A/c", EXC]], nar: 'realisation expenses paid by Anil on behalf of the firm' }]),
  c: journal([{ dr: [["Anil's Capital A/c", EXC]], cr: [['Bank A/c', EXC]], nar: 'expenses to be borne by Anil paid by the firm' }]),
  d: journal([{ dr: [['Realisation A/c', EXCrem]], cr: [["Anil's Capital A/c", EXCrem]], nar: 'remuneration allowed to Anil' }]),
};
Q('l4_expenses_cases', long({
  t: 2, d: 4, c: 'analysis', marks: 4,
  stem: `Realisation expenses on the dissolution of an imagined firm in Thanjavur amount to ${rs(EXC)}. Pass the journal entry or entries in each of these separate cases:\n\n(a) The expenses are paid by the firm.\n(b) The expenses are paid by Anil, a partner, on behalf of the firm.\n(c) Anil has agreed to bear the expenses, but the firm pays them.\n(d) Anil is to receive a remuneration of ${rs(EXCrem)} for completing the dissolution and is to bear the expenses; he pays them himself.`,
  model: `**(a)**\n\n${J_EX.a.md}\n\n**(b)**\n\n${J_EX.b.md}\n\n**(c)** The firm does not bear the cost, so Realisation is untouched:\n\n${J_EX.c.md}\n\n**(d)** Only the remuneration is recorded; the expenses Anil pays himself need **no entry**:\n\n${J_EX.d.md}`,
  sol: 'Decide two things each time: who bears the expense (firm or partner) and who pays it (firm or partner).',
  scheme: [['(a)', 1], ['(b)', 1], ['(c)', 1], ['(d)', 1]],
}));

// ================================================================ t02 Full dissolutions (computed by dissolve())
// l4: Realisation Account only (Akhil and Bina, imagined optician, Varanasi)
const GO = dissolve({
  names: ['Akhil', 'Bina'], sh: shares(['Akhil', 'Bina'], [1, 1]), bank: 14200,
  assets: [['Fixtures', 40000], ['Stock', 36000], ['Debtors', 24000]],
  provisions: [['Provision for Doubtful Debts', 1200, 'Debtors']],
  liabilities: [['Creditors', 30000], ['Bills Payable', 8000]],
  capitals: { Akhil: 45000, Bina: 30000 },
  takenOver: [['Stock', 'Akhil', 33000]],
  sold: [['Fixtures', 31000], ['Debtors', 21000]],
  paid: [['Creditors', 28500], ['Bills Payable', 8000]],
  assumed: [['realisation expenses', 'Bina', 1800, 'realisation expenses paid']],
});
check(GO.RA.result === -14100 && GO.BS.total === 113000, 'GO');
Q('l4_realisation', long({
  t: 2, d: 3, c: 'application', marks: 4,
  stem: `Akhil and Bina, sharing profits equally, run an imagined optician's shop in Varanasi and decide to dissolve it on 31 March 2026.\n\n${bsTitle('Akhil and Bina', '31 March 2026')}\n\n${GO.BS.md}\n\nAkhil takes over the stock at ${rs(33000)}. Fixtures realise ${rs(31000)} and debtors ${rs(21000)}. Creditors are paid ${rs(28500)} in full settlement and bills payable in full. Bina pays the realisation expenses of ${rs(1800)} on behalf of the firm. Prepare the Realisation Account.`,
  model: `**Realisation Account**\n\n${GO.RA.md}\n\nResult: ${resultWords(GO.RA)}, borne equally.`,
  sol: 'Debit the assets at gross book value and every payment for liabilities and expenses; credit the provision, the liabilities and everything received in cash or kind.',
  scheme: [['Assets and provision transferred', 1], ['Liabilities transferred and paid', 1], ['Takeover, realisations and expenses by Bina', 1], [`Loss ${rs(-GO.RA.result)} shared equally`, 1]],
}));

// l4: capital and bank accounts from a finished Realisation Account (Chetan and Divya, Nagpur)
const PT = dissolve({
  names: ['Chetan', 'Divya'], sh: shares(['Chetan', 'Divya'], [3, 2]), bank: 15000,
  assets: [['Timber Stock', 80000], ['Car', 35000], ['Sawmill Machinery', 60000]],
  liabilities: [['Creditors', 40000]],
  loans: { Divya: 20000 }, reserves: [['General Reserve', 10000]],
  capitals: { Chetan: 70000, Divya: 50000 },
  takenOver: [['Car', 'Chetan', 30000]],
  sold: [['Timber Stock', 82000], ['Sawmill Machinery', 54000]],
  paid: [['Creditors', 40000], ['realisation expenses', 1000]],
});
check(PT.RA.result === -10000 && PT.CA.pay.Chetan === 40000 && PT.CA.pay.Divya === 50000, 'PT');
Q('l4_capital_bank', long({
  t: 2, d: 3, c: 'application', marks: 4,
  stem: `Chetan and Divya share the profits of an imagined timber yard in Nagpur in the ratio 3:2 and dissolve it on 31 March 2026.\n\n${bsTitle('Chetan and Divya', '31 March 2026')}\n\n${PT.BS.md}\n\nThe Realisation Account has already been prepared. It shows a loss of ${rs(-PT.RA.result)}. Chetan took over the car at ${rs(30000)}; the other assets realised ${rs(PT.soldTotal)}; creditors were paid ${rs(40000)} and realisation expenses ${rs(1000)}. Prepare the partners' capital accounts and the Bank Account.`,
  model: `**Partners' Capital Accounts**\n\n${PT.CA.md}\n\n**Bank Account**\n\n${PT.BANK.md}`,
  sol: 'Start the capitals from the balance sheet, add the reserve, charge the loss and the car, and close by payment; the Bank Account then closes at nil.',
  scheme: [['Reserve and loss in 3:2', 1], ['Car taken over; capitals closed', 1], ['Bank Account receipts', 1], ['Loan, payments and nil balance', 1]],
}));

// s3: Bank Account (Mohit and Nidhi, Erode)
const BV = dissolve({
  names: ['Mohit', 'Nidhi'], sh: shares(['Mohit', 'Nidhi'], [1, 1]), bank: 12000,
  assets: [['Shop Fittings', 50000], ['Stock', 70000], ['Debtors', 40000]],
  liabilities: [['Creditors', 58000]], loans: { Mohit: 15000 },
  capitals: { Mohit: 70000, Nidhi: 29000 },
  takenOver: [['Stock', 'Nidhi', 66000]],
  sold: [['Shop Fittings', 37000], ['Debtors', 37000]],
  paid: [['Creditors', 58000], ['realisation expenses', 2000]],
});
check(BV.CA.pay.Mohit === 59000 && BV.CA.bring.Nidhi === 48000 && BV.BANK.total === 134000, 'BV');
Q('s3_bank_close', short({
  t: 2, d: 3, c: 'application', marks: 3,
  stem: `Mohit and Nidhi are dissolving their imagined sweet shop in Erode. The bank balance on the date of dissolution is ${rs(12000)}. Assets realise ${rs(BV.soldTotal)} in cash; creditors of ${rs(58000)} are paid in full and realisation expenses of ${rs(2000)} are paid. Mohit's loan of ${rs(15000)} is repaid. After all adjustments, Mohit's capital account shows a credit balance of ${rs(BV.CA.pay.Mohit)} and Nidhi's a debit balance of ${rs(BV.CA.bring.Nidhi)}. Prepare the Bank Account.`,
  model: `**Bank Account**\n\n${BV.BANK.md}\n\nNidhi's cash must come in before Mohit can be paid; the account closes at nil.`,
  sol: 'Receipts on the debit side, payments on the credit side in the Section 48 order; the two sides must agree.',
  scheme: [['Receipts including cash brought in by Nidhi', 1], ['Liabilities, expenses and loan', 1], ['Payment to Mohit; nil balance', 1]],
}));

// l6 (a): Dhruv, Esha, Faisal — imagined electrical-goods firm, Surat
const TP = { int: 1000, loanBank: 30000 };
const TAP = dissolve({
  names: ['Dhruv', 'Esha', 'Faisal'], sh: shares(['Dhruv', 'Esha', 'Faisal'], [2, 2, 1]), bank: 18000,
  assets: [['Plant', 150000], ['Investments', 25000], ['Stock', 60000], ['Debtors', 60000]],
  provisions: [['Provision for Doubtful Debts', 3000, 'Debtors']],
  liabilities: [['Creditors', 45000], ['Bank Loan', TP.loanBank]],
  loans: { Esha: 20000 }, reserves: [['General Reserve', 15000]],
  capitals: { Dhruv: 90000, Esha: 70000, Faisal: 40000 },
  takenOver: [['Investments', 'Dhruv', 22000]],
  sold: [['Plant', 138000], ['Stock', 55000], ['Debtors', 54000]],
  paid: [['Creditors', 43000], ['Bank Loan', TP.loanBank + TP.int, 'Bank A/c (Bank Loan repaid with interest)'], ['unrecorded repair bill', 2000], ['realisation expenses', 3000]],
});
check(TAP.RA.result === -27000 && TAP.CA.pay.Dhruv === 63200 && TAP.CA.pay.Esha === 65200 && TAP.CA.pay.Faisal === 37600 && TAP.BANK.total === 265000, 'TAP');
Q('l6_tapti', long({
  t: 2, d: 3, c: 'application', marks: 6,
  stem: `Dhruv, Esha and Faisal share the profits of an imagined electrical-goods firm in Surat in the ratio 2:2:1. They dissolve the firm on 31 March 2026.\n\n${bsTitle('Dhruv, Esha and Faisal', '31 March 2026')}\n\n${TAP.BS.md}\n\n1. Dhruv takes over the investments at ${rs(22000)}.\n2. Plant realises ${rs(138000)}, stock ${rs(55000)} and debtors ${rs(54000)}.\n3. Creditors accept ${rs(43000)} in full settlement; the bank loan is repaid with interest of ${rs(TP.int)}.\n4. A repair bill of ${rs(2000)}, not recorded in the books, is paid.\n5. Realisation expenses are ${rs(3000)}.\n\nPrepare the Realisation Account, the partners' capital accounts and the Bank Account.`,
  model: `${accounts(TAP)}\n\nEsha's loan of ${fig(20000)} is paid after the outside liabilities and before any capital (Section 48).`,
  sol: 'Close Realisation first; its loss and the investments taken over go to the capitals; the Bank Account pays outsiders, then Esha’s loan, then capitals, and closes at nil.',
  scheme: [[`Realisation Account (loss ${rs(-TAP.RA.result)})`, 3], ["Partners' capital accounts", 2], ['Bank Account closing at nil', 1]],
}));

// l6 (b): Gita and Hemant — fixed capitals, Cash Account, imagined handicrafts firm, Puri
const KON = dissolve({
  names: ['Gita', 'Hemant'], sh: shares(['Gita', 'Hemant'], [3, 2]), bank: 7000, bankName: 'Cash',
  assets: [['Motor Van', 40000], ['Furniture', 20000], ['Stock', 45000], ['Debtors', 30000]],
  liabilities: [['Creditors', 36000], ['Bills Payable', 14000]],
  capitals: { Gita: 60000, Hemant: 40000 }, currents: { Gita: 8000, Hemant: -6000 },
  losses: [['Profit and Loss', 10000, 'Profit and Loss (debit balance)']],
  takenOver: [['Motor Van', 'Gita', 34000], ['Furniture', 'Hemant', 15000]],
  sold: [['Stock', 38000], ['Debtors', 27000]],
  paid: [['Creditors', 36000]],
  assumed: [['Bills Payable', 'Hemant', 14000, 'bills payable taken over'], ['realisation expenses', 'Gita', 2500, 'realisation expenses paid']],
});
check(KON.RA.result === -23500 && KON.CA.pay.Gita === 16400 && KON.CA.pay.Hemant === 19600 && KON.BS.total === 158000, 'KON');
Q('l6_konark', long({
  t: 2, d: 4, c: 'analysis', marks: 6,
  stem: `Gita and Hemant share profits 3:2 in an imagined handicrafts firm in Puri and keep fixed capitals. The firm is dissolved on 31 March 2026.\n\n${bsTitle('Gita and Hemant', '31 March 2026')}\n\n${KON.BS.md}\n\n1. Gita takes over the motor van at ${rs(34000)} and Hemant the furniture at ${rs(15000)}.\n2. Stock is sold for ${rs(38000)} and debtors realise ${rs(27000)}.\n3. Creditors are paid in full; Hemant agrees to discharge the bills payable himself.\n4. Gita pays the realisation expenses of ${rs(2500)} on behalf of the firm.\n\nPrepare the Realisation Account, the partners' capital accounts (after transferring the current accounts) and the Cash Account.`,
  model: `${accounts(KON)}\n\nThe current accounts are closed first by transfer to the capital accounts; the Profit and Loss debit balance is written off 3:2.`,
  sol: 'With fixed capitals, transfer the current balances to capital first; then proceed as usual and close the Cash Account at nil.',
  scheme: [[`Realisation Account (loss ${rs(-KON.RA.result)})`, 2.5], ['Current balances and accumulated loss in the capital accounts', 1.5], ['Capital accounts closed', 1], ['Cash Account at nil', 1]],
}));

// l6 (c): Jatin, Kusum, Lalit — creditors accept stock, remuneration, cash brought in; Bhubaneswar
const CHI = dissolve({
  names: ['Jatin', 'Kusum', 'Lalit'], sh: shares(['Jatin', 'Kusum', 'Lalit'], [1, 1, 1]), bank: 6000,
  assets: [['Cold-storage Equipment', 90000], ['Vehicles', 45000], ['Stock', 28000], ['Debtors', 22000]],
  liabilities: [['Creditors', 72000], ['Outstanding Rent', 6000]],
  loans: { Kusum: 15000 },
  capitals: { Jatin: 50000, Kusum: 40000, Lalit: 8000 },
  toCreditor: [['Stock', 'Creditors', 40000]],
  sold: [['Cold-storage Equipment', 75000], ['Debtors', 18000]],
  takenOver: [['Vehicles', 'Jatin', 33000]],
  paid: [['Outstanding Rent', 6000]],
  assumed: [['remuneration', 'Lalit', 6000, 'remuneration for dissolution']],
  charged: [['realisation expenses borne by Lalit', 'Lalit', 4200]],
});
check(CHI.RA.result === -33000 && CHI.CA.bring.Lalit === 1200 && CHI.CA.pay.Jatin === 6000 && CHI.CA.pay.Kusum === 29000 && CHI.BS.total === 191000, 'CHI');
Q('l6_chilika', long({
  t: 2, d: 4, c: 'analysis', marks: 6,
  stem: `Jatin, Kusum and Lalit share equally in an imagined seafood-export firm in Bhubaneswar. They dissolve it on 31 March 2026.\n\n${bsTitle('Jatin, Kusum and Lalit', '31 March 2026')}\n\n${CHI.BS.md}\n\n1. The creditors accept the whole stock and ${rs(40000)} in cash in full settlement of their claim.\n2. The cold-storage equipment is sold for ${rs(75000)}; debtors realise ${rs(18000)}.\n3. Jatin takes over the vehicles at ${rs(33000)}. Outstanding rent is paid in full.\n4. Lalit is to manage the dissolution for a remuneration of ${rs(6000)} and is to bear its expenses. The expenses, ${rs(4200)}, are paid by the firm.\n5. Any partner whose capital account shows a debit balance brings in cash.\n\nPrepare the Realisation Account, the partners' capital accounts and the Bank Account.`,
  model: `${accounts(CHI)}\n\nNo entry is needed for the stock handed to the creditors; only the ${fig(40000)} paid in cash is recorded. Lalit's expenses are charged to his capital, not to Realisation.`,
  sol: 'Record only the cash paid to creditors; put the remuneration through Realisation and the expenses through Lalit’s capital; settle Lalit’s debit balance before paying the others.',
  scheme: [[`Realisation Account (loss ${rs(-CHI.RA.result)})`, 2.5], ['Remuneration and expenses correctly treated', 1], [`Lalit brings in ${rs(CHI.CA.bring.Lalit)}`, 1], ['Bank Account: Kusum’s loan, payments, nil balance', 1.5]],
}));

// l6 (d): Manish and Nandini — journal entries; imagined farm-tools firm, Satara
const SAH = dissolve({
  names: ['Manish', 'Nandini'], sh: shares(['Manish', 'Nandini'], [3, 1]), bank: 19000,
  assets: [['Machinery', 60000], ['Stock', 30000], ['Debtors', 25000]],
  losses: [['Advertisement Suspense', 4000]],
  liabilities: [['Creditors', 40000]], loans: { Manish: 10000 }, reserves: [['General Reserve', 8000]],
  capitals: { Manish: 50000, Nandini: 30000 },
  takenOver: [['Stock', 'Nandini', 27000], ['unrecorded scooter', 'Manish', 3000]],
  sold: [['Machinery', 52000], ['Debtors', 24000]],
  paid: [['Creditors', 39000], ['realisation expenses', 2000]],
});
check(SAH.RA.result === -10000 && SAH.CA.pay.Manish === 42500 && SAH.CA.pay.Nandini === 1500 && SAH.BS.total === 138000, 'SAH');
Q('l6_sahyadri', long({
  t: 2, d: 3, c: 'application', marks: 6,
  stem: `Manish and Nandini share profits 3:1 in an imagined farm-tools firm in Satara and dissolve it on 31 March 2026.\n\n${bsTitle('Manish and Nandini', '31 March 2026')}\n\n${SAH.BS.md}\n\n1. Nandini takes over the stock at ${rs(27000)}.\n2. Machinery is sold for ${rs(52000)} and debtors realise ${rs(24000)}.\n3. Creditors are paid ${rs(39000)} in full settlement.\n4. An old scooter, not recorded in the books, is taken over by Manish at ${rs(3000)}.\n5. Realisation expenses of ${rs(2000)} are paid.\n\nPass the journal entries to close the books of the firm.`,
  model: `${SAH.J.md}\n\nCheck: ${resultWords(SAH.RA)}; final payments Manish ${fig(SAH.CA.pay.Manish)} and Nandini ${fig(SAH.CA.pay.Nandini)}, which use up the bank balance exactly.`,
  sol: 'Follow the usual order: transfers, realisation, takeovers, payments, reserve and suspense, result, loan, final settlement.',
  scheme: [['Transfer of assets and liabilities', 1], ['Realisation, takeovers and payments', 1.5], ['Reserve and advertisement suspense', 1], [`Loss ${rs(-SAH.RA.result)} shared 3:1`, 1], ['Loan and final payments', 1.5]],
}));

// l6 (e): Pankaj, Rashmi, Sudha — creditors taken over by a partner, overdraft, Cash Account; Indore
const MAL = dissolve({
  names: ['Pankaj', 'Rashmi', 'Sudha'], sh: shares(['Pankaj', 'Rashmi', 'Sudha'], [5, 3, 2]), bank: 50000, bankName: 'Cash',
  assets: [['Land', 120000], ['Investments', 30000], ['Stock', 55000], ['Debtors', 45000]],
  provisions: [['Provision for Doubtful Debts', 5000, 'Debtors']],
  liabilities: [['Creditors', 50000], ['Bills Payable', 15000], ['Bank Overdraft', 20000]],
  reserves: [['Profit and Loss', 30000, 'Profit and Loss (credit balance)']],
  capitals: { Pankaj: 80000, Rashmi: 60000, Sudha: 40000 },
  sold: [['Land', 150000], ['Stock', 48000], ['Debtors', 41000]],
  takenOver: [['Investments', 'Rashmi', 27000]],
  assumed: [['Creditors', 'Pankaj', 48000, 'creditors taken over']],
  paid: [['Bills Payable', 15000], ['Bank Overdraft', 20000], ['unrecorded claim for damages', 6000]],
  charged: [['realisation expenses borne by Sudha', 'Sudha', 4000]],
});
check(MAL.RA.result === 17000 && MAL.CA.pay.Pankaj === 151500 && MAL.CA.pay.Rashmi === 47100 && MAL.CA.pay.Sudha === 45400 && MAL.BS.total === 295000, 'MAL');
Q('l6_malwa', long({
  t: 2, d: 4, c: 'analysis', marks: 6,
  stem: `Pankaj, Rashmi and Sudha share profits 5:3:2 in an imagined fabrics business in Indore, which they dissolve on 31 March 2026.\n\n${bsTitle('Pankaj, Rashmi and Sudha', '31 March 2026')}\n\n${MAL.BS.md}\n\n1. Land is sold for ${rs(150000)}, stock for ${rs(48000)}, and debtors realise ${rs(41000)}.\n2. Rashmi takes over the investments at ${rs(27000)}.\n3. Pankaj agrees to discharge the creditors, and the partners agree to credit him ${rs(48000)} for doing so.\n4. Bills payable and the bank overdraft are paid in full.\n5. A claim for damages of ${rs(6000)}, not provided for in the books, is paid.\n6. Sudha has agreed to bear the realisation expenses; the firm pays them, ${rs(4000)}.\n\nPrepare the Realisation Account, the partners' capital accounts and the Cash Account.`,
  model: `${accounts(MAL)}\n\nSudha's expenses go to her capital account, not to Realisation; Pankaj is credited with the agreed ${fig(48000)} for the creditors he takes over.`,
  sol: 'A partner who takes over a liability is credited through Realisation; an expense the partner must bear never touches Realisation.',
  scheme: [[`Realisation Account (profit ${rs(MAL.RA.result)})`, 2.5], ['Accumulated profit and takeovers in the capital accounts', 1.5], ['Sudha charged with the expenses', 0.5], ['Cash Account closing at nil', 1.5]],
}));

// l6 (f): Vani, Waseem, Yamini — part takeovers, discounts, remuneration, cash brought in; Rajahmundry (d5)
const GV = { stock: 80000, partPct: 40, below: 10, above: 5, debtors: 50000, bad: 3000, disc: 4, cred: 64000, credFurn: 20000, credDisc: 5 };
const GVpart = pctOf(GV.partPct, GV.stock);
const GVtake = pctOf(100 - GV.below, GVpart);
const GVsold = pctOf(100 + GV.above, GV.stock - GVpart);
const GVdebt = pctOf(100 - GV.disc, GV.debtors - GV.bad);
const GVcred = pctOf(100 - GV.credDisc, GV.cred - GV.credFurn);
const GOD = dissolve({
  names: ['Vani', 'Waseem', 'Yamini'], sh: shares(['Vani', 'Waseem', 'Yamini'], [2, 1, 1]), bank: 29000,
  assets: [['Machinery', 110000], ['Furniture', 20000], ['Stock', GV.stock], ['Debtors', GV.debtors]],
  provisions: [['Provision for Doubtful Debts', 4000, 'Debtors']],
  liabilities: [['Creditors', GV.cred]], loans: { Vani: 25000 }, reserves: [['General Reserve', 16000]],
  capitals: { Vani: 100000, Waseem: 50000, Yamini: 30000 },
  toCreditor: [['Furniture', 'Creditors', 0]],
  paid: [['Creditors', GVcred, 'Bank A/c (remaining creditors paid at a discount)']],
  takenOver: [['Stock', 'Yamini', GVtake]],
  sold: [['Stock', GVsold, 'Bank A/c (rest of the stock sold)'], ['Debtors', GVdebt], ['Machinery', 92000]],
  assumed: [['remuneration', 'Waseem', 5000, 'remuneration for dissolution']],
});
check(GVtake === 28800 && GVsold === 50400 && GVdebt === 45120 && GVcred === 41800 && GOD.RA.result === -22480 && GOD.CA.bring.Yamini === 420 && GOD.BANK.total === 216940, 'GOD');
Q('l6_godavari', long({
  t: 2, d: 5, c: 'analysis', marks: 6,
  stem: `Vani, Waseem and Yamini share profits 2:1:1 in an imagined spice-trading firm in Rajahmundry and dissolve it on 31 March 2026.\n\n${bsTitle('Vani, Waseem and Yamini', '31 March 2026')}\n\n${GOD.BS.md}\n\n1. A creditor for ${rs(GV.credFurn)} accepts the furniture in full settlement; the other creditors are paid at a discount of ${GV.credDisc}%.\n2. Yamini takes over ${GV.partPct}% of the stock at ${GV.below}% below its book value; the rest of the stock is sold at ${GV.above}% above book value.\n3. Debtors of ${rs(GV.bad)} prove bad; the rest are collected at a discount of ${GV.disc}%.\n4. Machinery is sold for ${rs(92000)}.\n5. Waseem is to receive ${rs(5000)} for managing the dissolution and to bear its expenses; he pays the expenses, ${rs(3600)}, himself.\n\nPrepare the Realisation Account, the partners' capital accounts and the Bank Account.`,
  model: `Workings: stock taken by Yamini = ${GV.partPct}% of ${fig(GV.stock)} = ${fig(GVpart)}, at ${100 - GV.below}% = ${fig(GVtake)}; rest of the stock ${fig(GV.stock - GVpart)} at ${100 + GV.above}% = ${fig(GVsold)}; debtors (${fig(GV.debtors)} − ${fig(GV.bad)}) at ${100 - GV.disc}% = ${fig(GVdebt)}; other creditors (${fig(GV.cred)} − ${fig(GV.credFurn)}) at ${100 - GV.credDisc}% = ${fig(GVcred)}. The furniture given to a creditor and the expenses Waseem pays himself need no entry.\n\n${accounts(GOD)}`,
  sol: 'Work out each realised figure first; record only cash or value that moves; settle the debit balance before the final payments.',
  scheme: [['Workings for stock, debtors and creditors', 1.5], [`Realisation Account (loss ${rs(-GOD.RA.result)})`, 2], [`Capital accounts; Yamini brings in ${rs(GOD.CA.bring.Yamini)}`, 1.5], ['Bank Account at nil, Vani’s loan before capitals', 1]],
}));

export const FACTS = [
  `Akhil/Bina realisation loss ${fig(-GO.RA.result)}`,
  `Chetan/Divya bank ${fig(PT.BANK.total)}`,
  `Mohit/Nidhi bank ${fig(BV.BANK.total)} with ${fig(BV.CA.bring.Nidhi)} brought in`,
  `Dhruv/Esha/Faisal loss ${fig(-TAP.RA.result)}, bank ${fig(TAP.BANK.total)}`,
  `Gita/Hemant loss ${fig(-KON.RA.result)}, opening balance sheet ${fig(KON.BS.total)}`,
  `Jatin/Kusum/Lalit loss ${fig(-CHI.RA.result)}, Lalit brings ${fig(CHI.CA.bring.Lalit)}`,
  `Manish/Nandini loss ${fig(-SAH.RA.result)}`,
  `Pankaj/Rashmi/Sudha profit ${fig(MAL.RA.result)}`,
  `Vani/Waseem/Yamini loss ${fig(-GOD.RA.result)}, bank ${fig(GOD.BANK.total)}`,
  `Section 48 example: loss ${fig(S48loss)}, ${fig(S48.cash)} paid out`,
];
export { F, ratioOf };
