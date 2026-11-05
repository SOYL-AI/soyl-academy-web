// CBSE 11 Business Studies, ch04 Business Services: question bank. Every bank, firm, shopkeeper, ship and warehouse is
// imagined and written by SOYL; no NCERT example, exercise or board/sample-paper item is reused (D-036).
// Time-sensitive facts (payment systems, regulators, postal services) are dated "as of 2024" and carry no rates, charges or limits.
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child } from '../../cbse-11-business-studies-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
export const fmt = (n) => n.toLocaleString('en-IN');

// ---- computed figures used in stems, solutions and slides -------------------------------------------------
// Overdraft: balance, limit, cheques issued.
export const OD = { balance: 10000, limit: 50000, cheques: 45000 };
OD.over = OD.cheques - OD.balance; // 35,000 overdrawn
OD.room = OD.limit - OD.over; // 15,000 still available
// Discounting a bill of exchange.
export const BILL = { face: 120000, discount: 3000 };
BILL.paid = BILL.face - BILL.discount; // 1,17,000
// Recurring deposit instalments.
export const RD = { monthly: 2000, months: 12 };
RD.total = RD.monthly * RD.months; // 24,000
// Risk pooling.
export const POOL = { members: 2000, premium: 1500, claims: 20, claim: 100000 };
POOL.fund = POOL.members * POOL.premium; // 30,00,000
POOL.paid = POOL.claims * POOL.claim; // 20,00,000
POOL.left = POOL.fund - POOL.paid; // 10,00,000
// Indemnity.
export const FIRE = { insured: 500000, loss: 350000, bigLoss: 720000 };
// Contribution between two insurers.
export const CONT = { a: 300000, b: 200000, loss: 250000 };
CONT.sum = CONT.a + CONT.b;
CONT.partA = (CONT.loss * CONT.a) / CONT.sum; // 1,50,000
CONT.partB = (CONT.loss * CONT.b) / CONT.sum; // 1,00,000
// Subrogation.
export const SUB = { paid: 400000 };
// Warehouse: consolidation and a loan against a receipt.
export const CONS = { lots: [400, 350, 250], truck: 1000 };
CONS.total = CONS.lots.reduce((a, b) => a + b, 0);
export const RECEIPT = { stock: 600000, advance: 420000 };
RECEIPT.margin = RECEIPT.stock - RECEIPT.advance; // 1,80,000
if (OD.over !== 35000 || OD.room !== 15000 || BILL.paid !== 117000 || RD.total !== 24000 || POOL.fund !== 3000000 || POOL.left !== 1000000 || CONT.partA !== 150000 || CONT.partB !== 100000 || CONS.total !== CONS.truck || RECEIPT.margin !== 180000) throw new Error('figure check failed');

// ================================================================ t01 Banking and e-banking
Q('mc_service_feature', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Which of the following is NOT a characteristic of a business service such as banking?`,
  opts: [
    `It can be produced in advance and kept in stock until a customer arrives`,
    `It cannot be touched or held, so it is intangible`,
    `It is produced and consumed at the same time, so the two cannot be separated`,
    `The customer usually has to take part in the process`,
  ],
  sol: `A service cannot be stored, so the first statement is the one that does not fit. Intangibility, inseparability of production and consumption, and customer involvement are all standard characteristics.`,
}));
Q('mc_bank_foreign', mcq({
  t: 1, d: 2, c: 'application',
  stem: `Westmark Bank, an imagined institution with its head office abroad, opens three branches in imagined Ranipur to serve companies and traders. In which group of commercial banks does it fall?`,
  opts: [`Foreign banks`, `Public sector banks`, `Private sector banks`, `Cooperative banks`],
  sol: `A commercial bank whose head office is outside the country but which works through branches here is a foreign bank. Public sector banks are those where the government holds the majority stake, private sector banks are owned by private shareholders based in the country, and cooperative banks are owned by their members.`,
}));
Q('mc_bank_coop', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Seventy handloom weavers of imagined Pushpagiri set up their own bank. Each weaver is a member and part-owner, the bank lends mainly to members, and surplus is meant to serve them. This is a`,
  opts: [`cooperative bank`, `specialised bank`, `foreign bank`, `central bank`],
  sol: `A bank owned and run by its members for their benefit is a cooperative bank. A specialised bank serves one sector such as foreign trade, a foreign bank has its head office abroad, and the central bank regulates the whole system rather than lending to weavers.`,
}));
Q('mc_bank_special', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Bharat Niryat Bank, an imagined institution, exists only to give finance and guidance to firms that sell goods abroad. It is best described as a`,
  opts: [`specialised bank`, `commercial bank for savers`, `cooperative bank`, `central bank`],
  sol: `A bank set up to serve one sector, here foreign trade, is a specialised bank. A commercial bank takes deposits from the public for general lending, a cooperative bank is member-owned, and the central bank is the country's top monetary authority.`,
}));
Q('mc_rbi_role', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Which statement about the Reserve Bank of India, as the central bank, is correct?`,
  opts: [
    `It acts as banker to the government and to other banks, and regulates the banking system`,
    `It competes with commercial banks for the savings accounts of households`,
    `It lends only to farmers and small industry`,
    `It is owned by the customers of cooperative banks`,
  ],
  sol: `The central bank keeps the government's accounts, holds the accounts of other banks and supervises them. It does not compete for household savings, it is not confined to one sector, and its ownership is not with cooperative bank customers.`,
}));
Q('mc_deposit_farida', mcq({
  t: 1, d: 2, c: 'application',
  stem: `Farida Khan, an imagined shopkeeper in imagined Nilgiri Nagar, deposits her day's takings and writes several cheques to suppliers every week. Which deposit account suits her purpose best?`,
  opts: [`Current account`, `Fixed deposit account`, `Recurring deposit account`, `Savings account meant for a household`],
  sol: `A business with frequent deposits and withdrawals suits a current account, which has no tight cap on transactions. A fixed deposit locks money for a term, a recurring deposit collects fixed monthly instalments, and a household savings account limits frequent business withdrawals.`,
}));
Q('mc_recurring', mcq({
  t: 1, d: 2, c: 'application',
  stem: `Salma Jacob, an imagined clerk, puts Rs ${fmt(RD.monthly)} into her bank every month for ${RD.months} months to build a fund for her daughter's fees. This is a`,
  opts: [`recurring deposit`, `fixed deposit`, `current deposit`, `bank overdraft`],
  sol: `Fixed monthly instalments over a chosen period are the mark of a recurring deposit, which after ${RD.months} months holds Rs ${fmt(RD.total)} of her own money plus interest. A fixed deposit is one lump sum, a current account serves traders, and an overdraft is a borrowing facility.`,
}));
Q('mc_overdraft', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Taruni Stores, an imagined business, has Rs ${fmt(OD.balance)} in its current account and an overdraft limit of Rs ${fmt(OD.limit)} agreed with its bank. It issues cheques worth Rs ${fmt(OD.cheques)}. How much is overdrawn, and is it within the limit?`,
  opts: [
    `Rs ${fmt(OD.over)}, within the limit`,
    `Rs ${fmt(OD.cheques)}, above the limit`,
    `Rs ${fmt(OD.room)}, within the limit`,
    `Nothing is overdrawn, because cheques cannot exceed the balance`,
  ],
  sol: `The overdrawn amount is the cheques minus the balance, that is ${fmt(OD.cheques)} minus ${fmt(OD.balance)}, which is ${fmt(OD.over)}, and that is below the limit of ${fmt(OD.limit)}. Rs ${fmt(OD.room)} is the room still left, not the overdrawn amount, and an overdraft facility exists precisely to allow payment beyond the balance.`,
}));
Q('mc_discounting', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Surya Fabrics, an imagined seller, holds a bill of exchange for Rs ${fmt(BILL.face)} that falls due in two months. It hands the bill to its bank, which pays Rs ${fmt(BILL.paid)} at once and collects the full amount from the buyer on the due date. This service is called`,
  opts: [`discounting of a bill of exchange`, `a fixed deposit`, `a bank draft`, `a locker service`],
  sol: `The bank pays the bill's value less a deduction (Rs ${fmt(BILL.discount)} here) before the due date, which is discounting. A fixed deposit and a draft involve different flows of money, and a locker is a safekeeping service.`,
}));
Q('mc_neft', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `As of 2024, which description fits National Electronic Funds Transfer?`,
  opts: [
    `Transfers are collected and settled in batches rather than one by one`,
    `Every payment is settled one at a time in real time, meant for large amounts`,
    `It is a card that draws on the holder's own balance`,
    `It is a mobile app that links to a virtual payment address`,
  ],
  sol: `Batch-wise settlement is the feature of this system. Individual real-time settlement for large amounts describes real time gross settlement, a card drawing on the balance is a debit card, and a virtual payment address belongs to the unified payments interface.`,
}));
Q('mc_rtgs_amount', mcq({
  t: 1, d: 3, c: 'application',
  stem: `A builder in imagined Kasturi Nagar must send a very large payment to a steel supplier and wants each payment settled individually, with no waiting for a batch. As of 2024, which channel is meant for this?`,
  opts: [`Real time gross settlement`, `A debit card at a shop counter`, `A recurring deposit`, `Collection of a cheque`],
  sol: `Real time gross settlement is the system designed for large-value payments settled one by one. A debit card suits shop purchases, a recurring deposit is a savings product and a cheque collection takes more time and is not real time.`,
}));
Q('mc_upi', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Meghna Das, an imagined college student, pays a canteen owner by scanning a code on her phone, using an app linked to her bank account, and the money moves within moments. As of 2024, which system is she using?`,
  opts: [`Unified payments interface`, `Real time gross settlement`, `A bank draft`, `A credit card`],
  sol: `A phone app linked to a bank account for instant payment is the unified payments interface, launched in two thousand sixteen. Real time gross settlement is for large amounts, a draft is a paper instrument, and a credit card uses borrowed credit rather than the bank balance.`,
}));
Q('mc_card', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Pavan Joshi, an imagined traveller, buys a bag using a plastic card and the amount is taken straight from his own savings balance. He is using a`,
  opts: [`debit card`, `credit card`, `bank draft`, `locker key`],
  sol: `A debit card draws on the holder's own balance, so the money leaves the account at once. A credit card is a loan from the bank that the holder repays later, and a draft and a locker key are not payment cards.`,
}));
Q('mc_otp', mcq({
  t: 1, d: 2, c: 'application',
  stem: `A caller claiming to be from imagined Nilgiri Mercantile Bank asks Rohan Iyer for the one time password just sent to his phone, to stop a block on his account. The sensible response is to`,
  opts: [
    `refuse and never share it, because a bank does not need the password from the customer`,
    `give it quickly so that the account is not blocked`,
    `share it only if the caller knows his name`,
    `share it, then change his personal identification number`,
  ],
  sol: `A one time password is a secret meant only for the customer's own transaction, and genuine staff never ask for it. Giving it away, even to someone who knows personal details, allows a fraudster to complete a transfer before any later change can help.`,
}));

// ================================================================ t02 Insurance
Q('mc_good_faith', mcq({
  t: 2, d: 3, c: 'application',
  stem: `While buying a life policy, Kamlesh Rao, an imagined applicant, hides the fact that he has had a serious heart ailment. Years later the insurer finds out. Which principle has been broken?`,
  opts: [`Utmost good faith`, `Subrogation`, `Contribution`, `Indemnity`],
  sol: `The applicant must disclose every material fact, and hiding a heart ailment breaks utmost good faith, so the insurer can refuse the claim. Subrogation concerns recovery from third parties, contribution concerns sharing among insurers, and indemnity concerns the amount of compensation.`,
}));
Q('mc_insurable_interest', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Pooja Hegde, an imagined tenant, wants to insure the shop of a neighbour in imagined Ranipur against fire, though she has no connection with it. Her policy would fail for lack of`,
  opts: [`insurable interest`, `proximate cause`, `mitigation`, `subrogation`],
  sol: `She would not suffer a financial loss if the shop burnt, so she has no insurable interest, which is needed to make the contract valid. The other principles apply only once a valid policy and a loss exist.`,
}));
Q('mc_indemnity_amt', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Anand Foods Storage, an imagined firm, insured its stock against fire for Rs ${fmt(FIRE.insured)}. A fire destroys stock whose real value was Rs ${fmt(FIRE.loss)}. On the principle of indemnity, the insurer pays`,
  opts: [`Rs ${fmt(FIRE.loss)}, the actual loss`, `Rs ${fmt(FIRE.insured)}, the full sum insured`, `Rs ${fmt(FIRE.insured + FIRE.loss)}, as a bonus`, `nothing, because indemnity is not part of fire insurance`],
  sol: `Indemnity means putting the insured back where he was, no better, so compensation is limited to the actual loss, which is below the sum insured. Paying the whole sum or a bonus would give a profit, and indemnity is in fact the basis of a fire policy.`,
}));
Q('mc_proximate', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: `An imagined godown in Ranipur is insured against fire only. A flood washes goods away, and the policy is then claimed. The insurer refuses because, under the principle of proximate cause,`,
  opts: [
    `the nearest effective cause of the loss was flood, which is not an insured risk`,
    `any loss must be reported within a day`,
    `flood and fire are always the same peril`,
    `the insured failed to give notice of a second policy`,
  ],
  sol: `The effective cause decides the claim; the policy covers fire and the real cause here was flood. The other statements either invent a rule, wrongly equate two perils or refer to something that never happened in the case.`,
}));
Q('mc_subrogation', mcq({
  t: 2, d: 3, c: 'application',
  stem: `An imagined insurer pays Rs ${fmt(SUB.paid)} for a shop damaged by a contractor's carelessness, and then recovers Rs ${fmt(SUB.paid)} from the contractor. This follows the principle of`,
  opts: [`subrogation`, `utmost good faith`, `insurable interest`, `mitigation of loss`],
  sol: `After paying, the insurer steps into the shoes of the insured and recovers from the party at fault, so the insured cannot profit twice. The other three principles deal with disclosure, financial stake and the duty to limit damage.`,
}));
Q('mc_contribution', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Same stock, two policies: an imagined insurer A covers Rs ${fmt(CONT.a)} and an imagined insurer B covers Rs ${fmt(CONT.b)}. A loss of Rs ${fmt(CONT.loss)} occurs. Under the principle of contribution, how is it shared?`,
  opts: [
    `A pays Rs ${fmt(CONT.partA)} and B pays Rs ${fmt(CONT.partB)}`,
    `A pays Rs ${fmt(CONT.loss)} and B pays nothing`,
    `Each pays Rs ${fmt(CONT.loss)}`,
    `B pays Rs ${fmt(CONT.partA)} and A pays Rs ${fmt(CONT.partB)}`,
  ],
  sol: `The insurers share in the ratio of the sums they cover, ${CONT.a / 100000} to ${CONT.b / 100000}, which gives Rs ${fmt(CONT.partA)} and Rs ${fmt(CONT.partB)}. Paying twice would let the insured profit, and reversing the figures ignores the ratio.`,
}));
Q('mc_life_kind', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: `Ishwar Menon, an imagined father in imagined Nilgiri Nagar, buys a policy so that his two young daughters receive a lump sum when they reach college age. This kind of life policy is a`,
  opts: [`children's policy`, `joint life policy`, `annuity`, `whole life policy only`],
  sol: `A policy aimed at funding a child's future needs is a children's policy. A joint life policy covers two lives together, an annuity pays regular amounts, and a whole life policy pays on death without a fixed term.`,
}));
Q('mc_marine_interest', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Orion Spices, an imagined exporter, owns the cargo loaded on an imagined ship when a storm sinks it. Under marine insurance, its insurable interest must be present`,
  opts: [`at the time of the loss`, `only at the time of buying the policy`, `neither at purchase nor at loss`, `only after the claim is paid`],
  sol: `For marine policies the insurable interest must exist when the loss occurs, and Orion owned the cargo then. Requiring it only at purchase describes life insurance, and a claim paid before the interest exists makes no sense.`,
}));
Q('mc_irdai', mcq({
  t: 2, d: 2, c: 'recall',
  stem: `As of 2024, which body regulates and promotes the development of the insurance business in India?`,
  opts: [
    `Insurance Regulatory and Development Authority of India`,
    `Securities and Exchange Board of India`,
    `Registrar of Companies`,
    `National Small Industries Corporation`,
  ],
  sol: `The authority named first was set up for exactly this purpose. The securities regulator looks after the securities market, the Registrar handles company registration and the small industries corporation supports small enterprises.`,
}));

// ================================================================ t03 Communication and warehousing
Q('mc_post_service', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: `Leela Prasad, an imagined seller of pickles in imagined Ranipur, wants proof that her parcel was delivered and wants it to travel faster than ordinary post. As of 2024, which kind of mail service in general suits this?`,
  opts: [`Speed post with a tracking record`, `An ordinary letter`, `A postal savings scheme`, `A locker at a bank`],
  sol: `Speed post is a faster mail service that gives a record of delivery. An ordinary letter is slower, a savings scheme is a postal financial service and a locker is a bank service.`,
}));
Q('mc_courier', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: `A boutique owner in imagined Kasturi Nagar wants a dress delivered right to a buyer's door the next day, with the parcel tracked on a phone. Which service is the natural choice?`,
  opts: [`A private courier service`, `A bonded warehouse`, `A cooperative bank`, `A postal savings scheme`],
  sol: `Private courier firms specialise in fast door-to-door delivery with tracking. A bonded warehouse stores goods awaiting customs duty, a cooperative bank is a financial body and a savings scheme is a financial service.`,
}));
Q('mc_warehouse_bonded', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Rangoli Imports, an imagined firm, brings machine parts from abroad but does not wish to pay customs duty until it knows how many parts it will sell. Where can the goods wait in the meantime?`,
  opts: [`A bonded warehouse`, `A private warehouse owned by a competitor`, `A cooperative warehouse for farmers`, `A locker at a bank`],
  sol: `A bonded warehouse is licensed to hold imported goods until the duty is paid. A competitor's private warehouse would not be bonded, a cooperative warehouse serves its farmer members, and a bank locker is for valuables.`,
}));
Q('mc_warehouse_public', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: `Gita Mehra, an imagined small grain trader, has no storage of her own and rents space in a licensed warehouse that is open to anyone for a fee. Her warehouse is a`,
  opts: [`public warehouse`, `private warehouse`, `bonded warehouse`, `cooperative warehouse`],
  sol: `A warehouse open to all on payment of charges is a public warehouse. A private warehouse belongs to a firm for its own goods, a bonded warehouse holds goods pending duty and a cooperative one is owned by a society for its members.`,
}));
Q('mc_warehouse_function', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Harvest Mart, an imagined buyer, stores onions in a warehouse during the plentiful season and releases them when the market is short, so that prices do not swing sharply. Which warehousing function is this?`,
  opts: [`Price stabilisation`, `Consolidation`, `Break-bulk`, `Value-added service`],
  sol: `Releasing stock when supply is short and holding it when supply is plentiful evens out prices. Consolidation joins small lots into one, break-bulk splits a large lot into small ones, and a value-added service such as grading changes the goods.`,
}));

// ---- assertion-reason
Q('ar_deposit_lending', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: `A commercial bank is able to give loans to businesses and households.`,
  r: `A commercial bank accepts deposits from the public.`,
  sol: `Both are true. The money that depositors place with the bank is the main fund from which it lends, so R explains A.`,
}));
Q('ar_rtgs', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: `As of 2024, real time gross settlement is meant for payments of large amounts.`,
  r: `Each payment under this system is settled individually, in real time, rather than in a batch.`,
  sol: `Both are true. Because every payment is settled on its own without waiting, it is suitable where large sums need prompt, final settlement; R explains A.`,
}));
Q('ar_life', ar({
  t: 2, d: 4, c: 'analysis', verdict: 'A-false-R-true',
  a: `A life insurance policy is a contract of indemnity.`,
  r: `The sum payable under a life policy is fixed in advance and does not depend on the measured value of a loss.`,
  sol: `A is false: a human life cannot be valued in money, so life insurance is a contract of guarantee, not indemnity. R is true and in fact shows why indemnity does not apply.`,
}));
Q('ar_fire', ar({
  t: 2, d: 4, c: 'analysis', verdict: 'A-false-R-true',
  a: `A fire insurer must pay for any loss to the stock, whatever the cause.`,
  r: `In fire insurance, fire must be the proximate cause of the loss.`,
  sol: `A is false: only losses whose proximate cause is the insured peril, fire, are covered. R is true and is exactly the rule that limits the insurer's liability.`,
}));
Q('ar_warehouse', ar({
  t: 3, d: 4, c: 'analysis', verdict: 'both-true-not-explains',
  a: `Warehouses help to even out the prices of seasonal goods.`,
  r: `A warehouse receipt can be offered to a lender as security for a loan.`,
  sol: `Both are true. Price stabilisation arises from releasing stock at the right time, whereas the receipt's use as security is the separate financing function; R does not explain A.`,
}));
Q('ar_ebank', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: `E-banking can lower the cost of providing a service for a bank.`,
  r: `A customer must visit a branch for every transaction made through e-banking.`,
  sol: `A is true because many transactions can be handled without branch staff or paper. R is false: the point of e-banking is that the customer can act through electronic channels without visiting a branch.`,
}));

// ---- true-false, fill in the blanks, match, ordering
Q('tf_life', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: `A life insurance policy is a contract of indemnity in which the insurer repays only the exact loss suffered.`,
  sol: `Life insurance is a contract of guarantee: the sum is fixed in advance because the value of a human life cannot be measured.`,
}));
Q('tf_marine_interest', tf({
  t: 2, d: 2, c: 'recall', ans: true,
  stem: `In marine insurance, the insured must have an insurable interest in the subject matter at the time the loss occurs.`,
  sol: `That is the rule for marine policies; it is not required at the time the policy is taken.`,
}));
Q('tf_otp', tf({
  t: 1, d: 1, c: 'understanding', ans: false,
  stem: `It is safe to tell a caller the one time password sent to your phone if he says that he is a bank employee.`,
  sol: `A bank never needs the customer's one time password, so sharing it invites fraud.`,
}));
Q('tf_bonded', tf({
  t: 3, d: 2, c: 'recall', ans: true,
  stem: `A bonded warehouse holds imported goods until the customs duty on them has been paid or the goods have been re-exported.`,
  sol: `Duty becomes due when the goods are released for sale at home; re-exported goods generally leave without home-market duty, as of 2024.`,
}));
Q('fb_upi', fb({
  t: 1, d: 2, c: 'recall',
  stem: `The unified payments interface was launched in the year ___, and it lets a person move money instantly from a ___ app linked to a bank account.`,
  acc: [['2016', 'two thousand sixteen'], ['mobile', 'phone', 'smartphone']],
  sol: `It was launched in 2016 and works through a mobile app, as of 2024.`,
}));
Q('fb_deposits', fb({
  t: 1, d: 1, c: 'recall',
  stem: `The four kinds of deposit accounts are current, savings, ___ and ___.`,
  acc: [['fixed', 'term', 'fixed deposit'], ['recurring', 'recurring deposit']],
  sol: `The other two are fixed (term) deposits and recurring deposits.`,
}));
Q('fb_marine', fb({
  t: 2, d: 2, c: 'recall',
  stem: `The three kinds of marine insurance are ___ insurance, cargo insurance and ___ insurance.`,
  acc: [['hull'], ['freight']],
  sol: `Hull, cargo and freight are the three kinds of marine insurance.`,
}));
Q('mt_lending', match({
  t: 1, d: 3, c: 'application',
  stem: `Match each borrowing arrangement of an imagined business with the bank facility it describes.`,
  pairs: [
    [`Taruni Stores may pay out more than its balance, up to an agreed limit, and pays interest only on the amount overdrawn`, `Overdraft`],
    [`Anil Traders may draw funds as needed against its stock of goods, up to a sanctioned limit`, `Cash credit`],
    [`Nirmal Dairy receives a single sum for a stated purpose and repays it in fixed instalments`, `Loan`],
    [`Surya Fabrics receives cash today for a bill that falls due later, less a deduction`, `Discounting of a bill of exchange`],
  ],
  sol: `Each facility is identified by how the money is drawn and repaid: beyond balance, against stock, in instalments, or against a bill not yet due.`,
}));
Q('mt_ebank', match({
  t: 1, d: 2, c: 'understanding',
  stem: `As of 2024, match each electronic banking channel with its general description.`,
  pairs: [
    [`National Electronic Funds Transfer`, `Transfers settled in batches`],
    [`Real time gross settlement`, `Large payments settled one by one at once`],
    [`Immediate payment service`, `Instant transfer between bank accounts`],
    [`Unified payments interface`, `Instant payment through a mobile app linked to a bank account`],
  ],
  sol: `Batch settlement, individual real-time settlement of large amounts, instant account-to-account transfer and app-based instant payment distinguish the four systems.`,
}));
Q('mt_principles', match({
  t: 2, d: 3, c: 'application',
  stem: `Match each imagined situation with the principle of insurance it illustrates.`,
  pairs: [
    [`A proposer hides a past illness while filling the form`, `Utmost good faith`],
    [`A policy-holder pays no more than the loss he actually suffered`, `Indemnity`],
    [`Two insurers divide one loss between them`, `Contribution`],
    [`After a fire, the owner calls the fire service at once to save the rest of the stock`, `Mitigation of loss`],
  ],
  sol: `Disclosure, compensation limited to loss, sharing between insurers and the duty to limit damage each point to one principle.`,
}));
Q('mt_warehouse', match({
  t: 3, d: 2, c: 'understanding',
  stem: `Match each type of warehouse with its description.`,
  pairs: [
    [`Private warehouse`, `Owned by a firm for storing its own goods`],
    [`Public warehouse`, `Licensed storage open to all on payment of charges`],
    [`Bonded warehouse`, `Holds imported goods until customs duty is paid`],
    [`Cooperative warehouse`, `Owned by a society and used by its members`],
  ],
  sol: `Ownership and purpose separate the four types.`,
}));
Q('od_epay', ord({
  t: 1, d: 3, c: 'understanding',
  stem: `Arrange these steps of an electronic fund transfer from Farida's account to a supplier in the order in which they happen.`,
  items: [`Farida enters the payee details and confirms with her secret code`, `Her bank checks the request and debits her account`, `The payment message passes through the payment system`, `The supplier's bank credits the supplier's account`],
  sol: `The customer instructs and authorises, the bank checks and debits, the payment system carries the message, and the beneficiary's bank credits the account.`,
}));
Q('od_receipt', ord({
  t: 3, d: 3, c: 'understanding',
  stem: `Arrange these steps in which an imagined grain farmer borrows against stored grain.`,
  items: [`The farmer stores the grain in a licensed warehouse`, `The warehouse issues a receipt for the stored grain`, `The farmer offers the receipt to a lender as security`, `The lender advances a loan against the receipt`],
  sol: `Storage comes first, then the receipt, then its use as security and finally the loan.`,
}));

// ================================================================ short answers (2 marks)
Q('s2_rbi', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: `State any two roles of the Reserve Bank of India as the central bank.`,
  model: `It acts as banker to the government, managing its accounts and borrowing. It also acts as banker to other banks, holding their balances, and it regulates and supervises the banking system so that depositors are protected and credit is orderly.`,
  sol: `Any two roles.`,
  scheme: [[`First role`, 1], [`Second role`, 1]],
}));
Q('s2_cur_sav', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `Distinguish between a current deposit account and a savings deposit account.`,
  model: `A current account is for traders and companies who make many deposits and withdrawals, and it usually pays no interest. A savings account is for individuals who want to save a little regularly, it pays interest and the number of withdrawals is usually restricted.`,
  sol: `Contrast on users, transactions and interest.`,
  scheme: [[`Current account described`, 1], [`Savings account described and contrasted`, 1]],
}));
Q('s2_od_cc', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: `How is an overdraft different from a cash credit facility?`,
  model: `An overdraft lets a current account holder withdraw more than the balance up to an agreed limit, and interest is charged only on the amount overdrawn. A cash credit is a limit sanctioned against the security of goods, such as stock, from which the borrower draws as the business needs.`,
  sol: `Contrast the basis on which the facility is allowed.`,
  scheme: [[`Overdraft explained`, 1], [`Cash credit explained against security`, 1]],
}));
Q('s2_neft_rtgs', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: `As of 2024, distinguish between National Electronic Funds Transfer and real time gross settlement.`,
  model: `As of 2024, National Electronic Funds Transfer collects payments and settles them batch by batch, so a transfer may wait for the next batch. Real time gross settlement settles each payment individually at once, and is meant for large amounts.`,
  sol: `Batch settlement against individual real-time settlement.`,
  scheme: [[`Batch-wise settlement`, 1], [`Individual real-time settlement for large amounts`, 1]],
}));
Q('s2_debit_credit', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `Distinguish between a debit card and a credit card.`,
  model: `A debit card spends the holder's own money, because the amount is deducted from the bank balance at once. A credit card gives the holder a loan from the bank up to a limit, and the holder repays the bank later for what was spent.`,
  sol: `Own money against borrowed money.`,
  scheme: [[`Debit card uses own balance`, 1], [`Credit card is borrowing repaid later`, 1]],
}));
Q('s2_precautions', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `Rohan Iyer, an imagined customer, uses internet banking. State two precautions he should take.`,
  model: `First, he should never share his personal identification number, password or one time password with anyone, including callers who claim to be from the bank. Second, he should log in only through the bank's own app or website and log out after each use.`,
  sol: `Any two sensible precautions.`,
  scheme: [[`First precaution`, 1], [`Second precaution`, 1]],
}));
Q('s2_indemnity', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: `A fire destroys goods of an insured trader worth Rs ${fmt(FIRE.loss)}, while the policy is for Rs ${fmt(FIRE.insured)}. Apply the principle of indemnity to say what the insurer pays.`,
  model: `Indemnity means the insured is restored to his earlier position but not made better off. So the insurer pays Rs ${fmt(FIRE.loss)}, the actual loss, because compensation cannot exceed the loss even though the sum insured is higher.`,
  sol: `State the principle and the amount.`,
  scheme: [[`Meaning of indemnity`, 1], [`Amount payable is the actual loss`, 1]],
}));
Q('s2_proximate', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: `A shop, insured against fire only, is flooded and its goods are ruined. Explain whether the insurer must pay, using the principle of proximate cause.`,
  model: `The principle says the insurer is liable only when the nearest effective cause of the loss is an insured peril. The policy covers fire, but flood caused the loss, so the insurer need not pay.`,
  sol: `Principle applied to the case.`,
  scheme: [[`Principle of proximate cause stated`, 1], [`Applied: flood is not insured, so no payment`, 1]],
}));
Q('s2_bonded', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `What is a bonded warehouse and who uses it?`,
  model: `A bonded warehouse is one licensed by the customs authorities to store imported goods until the customs duty on them is paid. Importers use it when they want to delay payment of duty, and exporters or traders use it for goods that may be re-exported.`,
  sol: `Meaning and users.`,
  scheme: [[`Stores goods until duty is paid`, 1], [`Importers or traders who gain by delaying duty`, 1]],
}));
Q('s2_courier', short({
  t: 3, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: `Why might an imagined online jewellery seller prefer a private courier service to ordinary post for its orders? Give two reasons.`,
  model: `A courier gives door-to-door delivery, so the buyer need not collect the parcel. It is generally faster and lets the seller and buyer track the parcel at each stage, which builds trust for costly items.`,
  sol: `Any two advantages linked to the seller.`,
  scheme: [[`Door-to-door and speed`, 1], [`Tracking linked to trust`, 1]],
}));

// ================================================================ short answers (3 marks)
Q('s3_bank_functions', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: `Explain any three functions of a commercial bank.`,
  model: `1. Accepting deposits: it takes money from the public in current, savings, fixed and recurring accounts.\n2. Lending: it gives overdrafts, cash credit and loans, and discounts bills of exchange.\n3. Remittance of funds: it moves money between places through drafts and electronic transfers. Allied services such as lockers and bill payment are further functions.`,
  sol: `Any three functions, each with a line.`,
  scheme: [[`First function`, 1], [`Second function`, 1], [`Third function`, 1]],
}));
Q('s3_ebank_benefits', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: `State any three benefits of e-banking to customers.`,
  model: `1. Round-the-clock access: services can be used at any hour, so customers need not wait for branch hours.\n2. Convenience and lower cost: payments and statements are managed from home, saving time and travel.\n3. A record of transactions: every payment leaves an electronic trail, and less cash needs to be handled.`,
  sol: `Any three benefits.`,
  scheme: [[`First benefit`, 1], [`Second benefit`, 1], [`Third benefit`, 1]],
}));
Q('s3_ebank_risks', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `Meghna Das, an imagined customer, has started paying all her bills online. Explain three risks she faces and one way to reduce each.`,
  model: `1. Fraud through phishing messages: she should never click unknown links.\n2. Theft of the personal identification number or password: she should keep them secret and change them regularly.\n3. Sharing the one time password with a fake caller: she should treat it as private and report suspicious calls to the bank.`,
  sol: `Three risks with a precaution each.`,
  scheme: [[`First risk with remedy`, 1], [`Second risk with remedy`, 1], [`Third risk with remedy`, 1]],
}));
Q('s3_marine', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `Explain the three kinds of marine insurance, using an imagined shipping company, Sagar Lines, and an imagined exporter.`,
  model: `1. Hull insurance: Sagar Lines insures the body of its ship against damage at sea.\n2. Cargo insurance: the exporter insures the goods loaded on the ship against loss or damage.\n3. Freight insurance: the carrier insures the freight it would otherwise lose if the cargo is lost and the fee cannot be collected.`,
  sol: `Hull, cargo and freight, each illustrated.`,
  scheme: [[`Hull insurance illustrated`, 1], [`Cargo insurance illustrated`, 1], [`Freight insurance illustrated`, 1]],
}));
Q('s3_warehouse_functions', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `Three small pickle makers send ${CONS.lots.join(', ')} cartons to one warehouse, and a truck can carry ${fmt(CONS.truck)}. Name the warehousing function this shows, and explain two more functions of a warehouse.`,
  model: `The lots of ${CONS.lots.join(', ')} cartons total ${fmt(CONS.total)}, one full truckload, so the function is consolidation. Another is break-bulk, where a large lot is split into small orders for retailers. A third is stockpiling, holding seasonal goods until demand rises.`,
  sol: `Consolidation identified from the figures, plus two functions.`,
  scheme: [[`Consolidation identified with the total`, 1], [`Second function explained`, 1], [`Third function explained`, 1]],
}));
Q('s3_life_kinds', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: `Describe any three kinds of life insurance policy.`,
  model: `1. Whole life policy: the sum is paid to the nominee after the death of the insured, whenever it comes.\n2. Endowment policy: the sum is paid on death or on the end of a fixed term, whichever is earlier.\n3. Annuity: the insurer makes regular payments to the insured for a period or for life. Joint life and children's policies are other kinds.`,
  sol: `Any three kinds.`,
  scheme: [[`First kind`, 1], [`Second kind`, 1], [`Third kind`, 1]],
}));
Q('s3_postal', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: `As of 2024, describe in general terms the financial and mail services offered by the postal department.`,
  model: `As of 2024, the postal department offers financial services such as postal savings schemes and money transfer. Its mail services include parcels, registered post for proof of posting and delivery, speed post for faster delivery and insured post for valuable articles.`,
  sol: `Financial services and mail services named.`,
  scheme: [[`Savings schemes and money transfer`, 1], [`Parcel and registered post`, 1], [`Speed post and insured post`, 1]],
}));

// ================================================================ long answers (5 marks)
Q('l_types_banks', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: `Explain the different types of banks in India.`,
  model: `1. Commercial banks accept deposits and give loans. They are public sector banks, where the government has the major holding, private sector banks, and foreign banks with head offices abroad.\n2. Cooperative banks are owned by members and serve farmers and small borrowers.\n3. Specialised banks work for a single sector, for example foreign trade, agriculture or small industry.\n4. The central bank, the Reserve Bank of India, acts as banker to the government and to banks and regulates the system.`,
  sol: `Four groups, commercial banks with their three kinds.`,
  scheme: [[`Commercial banks defined`, 1], [`Public, private and foreign banks`, 1], [`Cooperative banks`, 1], [`Specialised banks`, 1], [`Central bank and its roles`, 1]],
}));
Q('l_bank_functions', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: `Explain the functions of a commercial bank under five heads.`,
  model: `1. Deposits: current, savings, fixed and recurring accounts, to suit different needs.\n2. Lending: overdraft, cash credit, loans and advances, and discounting of bills of exchange.\n3. Cheques and other payment instruments, which let customers pay without carrying cash.\n4. Remittance: bank drafts and transfers carry money from one place to another.\n5. Allied services: lockers for valuables, payment of bills and collection of cheques.`,
  sol: `Five functions, each with illustrations.`,
  scheme: [[`Deposits`, 1], [`Lending`, 1], [`Cheques and payment instruments`, 1], [`Remittance`, 1], [`Allied services`, 1]],
}));
Q('l_ebank', long({
  t: 1, d: 3, c: 'application', marks: 5, wl: L5,
  stem: `As of 2024, explain the main channels of e-banking available to a customer such as an imagined shopkeeper, Farida.`,
  model: `1. Internet banking and mobile banking let Farida manage her accounts from a computer or phone.\n2. Automated teller machines give cash and balance details at any hour.\n3. Debit and credit cards pay shops from her balance or on credit.\n4. Fund transfers: batch-wise transfer, real time gross settlement for large sums, and immediate payment service.\n5. The unified payments interface, launched in two thousand sixteen, gives instant payments through a mobile app.`,
  sol: `Five channels, dated as of 2024.`,
  scheme: [[`Internet and mobile banking`, 1], [`Automated teller machines`, 1], [`Debit and credit cards`, 1], [`Batch, real-time and instant transfer systems`, 1], [`Unified payments interface, dated`, 1]],
}));
Q('l_ebank_eval', long({
  t: 1, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: `Imagined Nilgiri Mercantile Bank wants all its customers to use e-banking only. Weigh the benefits against the risks, and give your view.`,
  model: `Benefits: customers get access at any hour, pay lower costs, find transactions easy and recorded, and need less cash. The bank saves staff and branch costs. Risks: fraud, theft of passwords or one time passwords, and customers who are less familiar with technology may be left out. On balance, e-banking should be encouraged, but with security education and a branch option for those who need it.`,
  sol: `Benefits, risks and a reasoned view.`,
  scheme: [[`Benefits to customers`, 1], [`Benefit to the bank`, 1], [`Risks of fraud and security`, 1], [`Customers left out`, 1], [`A reasoned conclusion`, 1]],
}));
Q('l_principles', long({
  t: 2, d: 4, c: 'application', marks: 5, wl: L5,
  stem: `Explain any five principles of insurance, giving an imagined example of each.`,
  model: `1. Utmost good faith: Kamlesh must disclose a heart ailment when buying a policy.\n2. Insurable interest: a shop owner may insure her shop, but a stranger may not.\n3. Indemnity: a loss of Rs ${fmt(FIRE.loss)} on a policy for Rs ${fmt(FIRE.insured)} brings a payment of Rs ${fmt(FIRE.loss)} only.\n4. Proximate cause: a policy against fire does not cover a flood.\n5. Subrogation: after paying, the insurer recovers from the careless contractor who caused the loss.`,
  sol: `Any five principles, each with an example.`,
  scheme: [[`Utmost good faith with example`, 1], [`Insurable interest with example`, 1], [`Indemnity with example`, 1], [`Proximate cause with example`, 1], [`Subrogation, contribution or mitigation with example`, 1]],
}));
Q('l_life_fire_marine', long({
  t: 2, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: `Distinguish among life, fire and marine insurance on any five points.`,
  model: `1. Nature: life insurance is a contract of guarantee; fire and marine insurance are contracts of indemnity.\n2. Insurable interest: needed at the time of the contract in life insurance; at the time of contract and loss in fire insurance; at the time of loss in marine insurance.\n3. Subject matter: a person's life, buildings and stock, and ships, cargo and freight respectively.\n4. Compensation: fixed sum in life insurance; actual loss up to the sum insured in the others.\n5. Cause: fire must be the proximate cause in fire insurance.`,
  sol: `Five points of difference.`,
  scheme: [[`Nature of the contract`, 1], [`Insurable interest`, 1], [`Subject matter`, 1], [`Compensation`, 1], [`Cause of loss or another valid point`, 1]],
}));
Q('l_warehouse_functions', long({
  t: 3, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: `Explain the functions of a warehouse.`,
  model: `1. Consolidation: small lots from many sellers are joined into full loads.\n2. Break-bulk: a large lot is split into small orders for retailers.\n3. Stockpiling: goods are held until they are needed, especially seasonal goods.\n4. Value-added services: grading, packing and labelling are done on the premises.\n5. Price stabilisation and financing: stock is released to steady prices, and the receipt is accepted as security for a loan.`,
  sol: `Five functions.`,
  scheme: [[`Consolidation`, 1], [`Break-bulk`, 1], [`Stockpiling`, 1], [`Value-added services`, 1], [`Price stabilisation and financing`, 1]],
}));

// ================================================================ case-based
Q('cb_farida', caseQ({
  t: [1], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined shop, bank and person.)*`,
  passage: `**Farida General Store (imagined), Nilgiri Nagar**\n\nFarida Khan opened an account at the Nilgiri Mercantile Bank, an imagined private sector bank, to deposit the daily takings of her shop and to pay suppliers by cheque several times a week. Her bank agreed to an overdraft limit of Rs ${fmt(OD.limit)}. One week the balance stood at Rs ${fmt(OD.balance)} when she issued cheques for Rs ${fmt(OD.cheques)} in all. She now pays small suppliers with a payment app on her phone, entering a secret code each time, and keeps her wedding jewellery in a locker of the same bank.`,
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'application', stem: `Which kind of deposit account did Farida open for her daily takings?`, opts: [`Current account`, `Recurring deposit`, `Fixed deposit`, `Savings account for a household`], sol: `A business with many deposits and withdrawals uses a current account. A recurring deposit and a fixed deposit are saving products, and a household savings account suits personal saving.` })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: `Quote the words that show an allied service of the bank.`, model: `"**keeps her wedding jewellery in a locker of the same bank**": a locker is an allied service.`, sol: `The line about the locker.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: 1, d: 3, c: 'application', marks: 2, stem: `**Either** (i): Find the amount overdrawn that week and say whether it was within the limit.`, model: `The cheques of Rs ${fmt(OD.cheques)} exceeded the balance of Rs ${fmt(OD.balance)} by Rs ${fmt(OD.over)}, so Rs ${fmt(OD.over)} was overdrawn. This is below the limit of Rs ${fmt(OD.limit)}, so it was allowed.`, sol: `Subtract the balance from the cheques and compare with the limit.`, scheme: [[`Overdrawn amount found`, 1], [`Compared with the limit`, 1]] }), [
      short({ t: 1, d: 3, c: 'application', marks: 2, stem: `**Or** (ii): Name two e-banking features Farida uses, and say how each helps her.`, model: `She uses a mobile payment app, which lets her pay suppliers without visiting the bank. She also uses a secret code for each payment, which protects her account from misuse.`, sol: `Two features, each with a benefit.`, scheme: [[`First feature with benefit`, 1], [`Second feature with benefit`, 1]] }),
    ]),
  ],
}));
Q('cb_upi_fraud', caseQ({
  t: [1], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined person and bank.)*`,
  passage: `**Rohan Iyer's phone call (imagined)**\n\nRohan Iyer, an imagined resident of Kasturi Nagar, pays most bills through his bank's mobile app and appreciates that it works at any hour. One evening a caller said he was from Nilgiri Mercantile Bank and that Rohan's account would be blocked unless he read out the one time password just received. Rohan hesitated, remembered that the bank had advised never to share it, ended the call and reported the number to the bank next morning.`,
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'application', stem: `Which risk of e-banking does the caller's attempt illustrate?`, opts: [`Fraud and the need for security`, `Limited access in the evening`, `Higher cost of every payment`, `Lack of any record of transactions`], sol: `The caller was trying to trick Rohan into revealing a secret, which is fraud. The case shows access at any hour as a benefit, and e-banking creates records, so the other options do not fit.` })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: `Quote the words that show a benefit of e-banking.`, model: `"**works at any hour**": round-the-clock access.`, sol: `The line about any hour.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: `**Either** (i): State two precautions that Rohan followed or should follow.`, model: `He refused to share the one time password, which is meant only for him. He also reported the suspicious number to the bank, and he should keep his personal identification number secret and use only the official app.`, sol: `Two precautions.`, scheme: [[`First precaution`, 1], [`Second precaution`, 1]] }), [
      short({ t: 1, d: 4, c: 'evaluation', marks: 2, stem: `**Or** (ii): Rohan's neighbour says he should give up e-banking after such calls. Do you agree? Give two reasons.`, model: `No. The risk can be managed by care, since a secret code is never needed by genuine bank staff. E-banking also gives round-the-clock access, a record of every payment and less cash handling, which are valuable.`, sol: `A view with two reasons.`, scheme: [[`A view supported by risk management`, 1], [`A benefit that remains`, 1]] }),
    ]),
  ],
}));
Q('cb_fire', caseQ({
  t: [2], d: 4, c: 'application', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined warehouse, insurer and contractor.)*`,
  passage: `**Anand Foods Storage (imagined), Ranipur**\n\nAnand Foods Storage insured the stock in its godown against fire with the imagined Surakshit General Insurance for Rs ${fmt(FIRE.insured)}. A fire began when a contractor's welding spark landed on packing material. The staff called the fire service at once and moved the unburnt bags out. The stock destroyed was worth Rs ${fmt(FIRE.loss)}. After settling the claim, the insurer asked the careless contractor to pay for the damage.`,
  parts: [
    child('a', mcq({ t: 2, d: 3, c: 'application', stem: `The insurer will pay only for the actual loss and not the full sum insured. Which principle is applied?`, opts: [`Indemnity`, `Utmost good faith`, `Contribution`, `Insurable interest`], sol: `Indemnity limits compensation to the real loss. The other principles concern disclosure, sharing between insurers and the financial stake in the property.` })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: `Quote the words that show mitigation of loss.`, model: `"**The staff called the fire service at once and moved the unburnt bags out**".`, sol: `The line about the fire service.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: 2, d: 4, c: 'application', marks: 2, stem: `**Either** (i): How much will the insurer pay, and why not the sum insured?`, model: `The insurer will pay Rs ${fmt(FIRE.loss)}, the value of the stock destroyed. Under indemnity the insured must not gain, so compensation stops at the actual loss, which is below the sum of Rs ${fmt(FIRE.insured)}.`, sol: `Amount and reason.`, scheme: [[`Rs ${fmt(FIRE.loss)} identified`, 1], [`Reason: indemnity`, 1]] }), [
      short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: `**Or** (ii): Name the principle that lets the insurer ask the contractor for payment, and explain it.`, model: `It is subrogation. After paying the claim, the insurer steps into the shoes of the insured and can recover the amount from the contractor whose carelessness caused the loss, so the insured does not gain twice.`, sol: `Subrogation with meaning.`, scheme: [[`Subrogation named`, 1], [`Explained with the contractor`, 1]] }),
    ]),
  ],
}));
Q('cb_ship', caseQ({
  t: [2], d: 4, c: 'application', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined ship, exporter and shipping company.)*`,
  passage: `**Meenakshi Tea Exporters and the Lakshmi Star (imagined)**\n\nSagar Lines, an imagined shipping company, insured the body of its ship, the Lakshmi Star, against damage at sea. Meenakshi Tea Exporters insured the tea chests it had loaded on board, and Sagar Lines also insured the freight it expected to earn on the voyage. A storm sank the ship, and Meenakshi's cargo, owned by it throughout the voyage, was lost.`,
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'application', stem: `The insurance taken by Sagar Lines on the body of the ship is`, opts: [`hull insurance`, `cargo insurance`, `freight insurance`, `life insurance`], sol: `Cover on the ship itself is hull insurance. Cargo is the goods on board, freight is the shipping fee, and life insurance covers persons.` })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: `Quote the words that show cargo insurance.`, model: `"**Meenakshi Tea Exporters insured the tea chests it had loaded on board**".`, sol: `The line about the tea chests.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: 2, d: 4, c: 'application', marks: 2, stem: `**Either** (i): Name the three kinds of marine insurance in the passage and say who took each.`, model: `Hull insurance was taken by Sagar Lines on the ship. Cargo insurance was taken by Meenakshi on the tea chests. Freight insurance was taken by Sagar Lines on the fee it expected to earn.`, sol: `Three kinds with the person who took each.`, scheme: [[`Hull and cargo with who took them`, 1], [`Freight with who took it`, 1]] }), [
      short({ t: 2, d: 4, c: 'application', marks: 2, stem: `**Or** (ii): When must insurable interest be present in marine insurance, and did Meenakshi satisfy this?`, model: `In marine insurance, insurable interest must be present at the time of the loss. Meenakshi owned the cargo throughout the voyage, so it had an interest when the storm struck and could claim.`, sol: `Time of loss, applied.`, scheme: [[`At the time of loss`, 1], [`Applied to Meenakshi`, 1]] }),
    ]),
  ],
}));
Q('cb_exporter', caseQ({
  t: [3], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined firm and warehouses.)*`,
  passage: `**Bhavani Trading Company (imagined), Kasturi Nagar**\n\nBhavani Trading Company brings electronic parts from abroad. To avoid paying customs duty before it knows what it will sell, it keeps the parts in a bonded warehouse, paying the duty only when parts are released for sale at home. Part of the stock is later sold to a buyer abroad and, as of 2024, leaves the bonded warehouse without any home-market duty being paid. Meanwhile the firm stores its finished goods, worth Rs ${fmt(RECEIPT.stock)}, in a licensed public warehouse and borrows Rs ${fmt(RECEIPT.advance)} from a lender against the warehouse receipt.`,
  parts: [
    child('a', mcq({ t: 3, d: 2, c: 'application', stem: `Where does Bhavani keep its imported parts until the duty is paid?`, opts: [`In a bonded warehouse`, `In a cooperative warehouse`, `In a private warehouse of its buyer`, `In a bank locker`], sol: `Imported goods awaiting duty are kept in a bonded warehouse. The other places are for members' goods, for a buyer's own use or for valuables.` })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: `Quote the words that show warehouse financing.`, model: `"**borrows Rs ${fmt(RECEIPT.advance)} from a lender against the warehouse receipt**".`, sol: `The line about the loan.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: 3, d: 4, c: 'analysis', marks: 2, stem: `**Either** (i): Explain two ways in which the bonded warehouse helps Bhavani.`, model: `It lets the firm defer the duty until parts are released for sale at home, so cash is not locked up early. It also lets part of the stock be sold abroad without home-market duty, as of 2024, saving cost.`, sol: `Two ways with reasons.`, scheme: [[`Delay of duty and cash benefit`, 1], [`Re-export without home duty`, 1]] }), [
      short({ t: 3, d: 4, c: 'analysis', marks: 2, stem: `**Or** (ii): Find how much of the stock's value is not covered by the loan, and explain the warehouse function shown.`, model: `The stock is worth Rs ${fmt(RECEIPT.stock)} and the loan is Rs ${fmt(RECEIPT.advance)}, so Rs ${fmt(RECEIPT.margin)} is not covered. The function is financing: the warehouse receipt serves as security for a loan.`, sol: `Subtract, then name the function.`, scheme: [[`Rs ${fmt(RECEIPT.margin)} found`, 1], [`Financing explained`, 1]] }),
    ]),
  ],
}));
