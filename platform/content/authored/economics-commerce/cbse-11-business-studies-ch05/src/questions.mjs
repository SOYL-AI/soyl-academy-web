// CBSE 11 Business Studies, ch05 Emerging Modes of Business: question bank. Every firm, website, cooperative, buyer and
// customer is imagined and written by SOYL; no NCERT example, exercise or board/sample-paper item is reused (D-036).
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child } from '../../cbse-11-business-studies-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
export const fmt = (n) => n.toLocaleString('en-IN');

// ---- computed figures used in stems, solutions and slides -------------------------------------------------
// Pustak Ghar order (Rs).
export const ORD = { three: 240, one: 350, discPct: 10, ship: 40 };
ORD.sub = 3 * ORD.three + ORD.one; // 1070
ORD.disc = (ORD.sub * ORD.discPct) / 100; // 107
ORD.pay = ORD.sub - ORD.disc + ORD.ship; // 1003
// Monthly cost of a shop against an online store (Rs).
export const SHOP = { rent: 45000, online: 12000 };
SHOP.save = SHOP.rent - SHOP.online; // 33000
SHOP.year = SHOP.save * 12; // 396000
// Outsourcing payroll for an imagined firm (Rs per month).
export const PAY = { staff: 3, salary: 28000, software: 16000, workers: 400, fee: 150 };
PAY.inhouse = PAY.staff * PAY.salary + PAY.software; // 100000
PAY.vendor = PAY.workers * PAY.fee; // 60000
PAY.save = PAY.inhouse - PAY.vendor; // 40000
PAY.year = PAY.save * 12; // 480000
// Export order of an imagined cooperative (Rs).
export const KALA = { order: 1200000, advPct: 40 };
KALA.adv = (KALA.order * KALA.advPct) / 100; // 480000
KALA.bal = KALA.order - KALA.adv; // 720000
if (ORD.sub !== 1070 || ORD.disc !== 107 || ORD.pay !== 1003 || SHOP.save !== 33000 || SHOP.year !== 396000 || PAY.inhouse !== 100000 || PAY.vendor !== 60000 || PAY.save !== 40000 || PAY.year !== 480000 || KALA.adv !== 480000 || KALA.bal !== 720000) throw new Error('figure check failed');

// ================================================================ t01 E-business: scope and benefits
Q('mc_eb_def', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Which statement best describes e-business?`,
  opts: [
    `Carrying out the processes of industry, trade and commerce with the help of computer networks`,
    `Selling goods only through a firm's own website`,
    `Advertising a product on a screen and collecting payment in a shop`,
    `Buying shares through a broker's office on paper forms`,
  ],
  sol: `E-business covers all business processes run over computer networks, not only selling. A website-only sale is too narrow, an advertisement with a shop payment is not carried out over a network, and paper share forms use no network.`,
}));
Q('mc_ec_part', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: `Which statement correctly relates e-commerce to e-business?`,
  opts: [
    `E-commerce is one part of e-business, because e-business also includes processes inside the firm`,
    `E-commerce is wider than e-business and includes every network process`,
    `The two are exactly the same and can never be told apart`,
    `E-business covers only dealings with customers, while e-commerce covers suppliers`,
  ],
  sol: `E-commerce is buying and selling online, with the dealings with customers and suppliers around it. E-business is the wider idea, which also covers internal processes such as staff records. The other statements reverse the relation, erase the difference, or divide the parties wrongly.`,
}));
Q('mc_b2b_id', mcq({
  t: 1, d: 2, c: 'application',
  stem: `Pustak Ghar, an imagined online book store, orders a thousand copies of a title from the imagined publisher Lekhani Prakashan through the publisher's trade portal. This dealing falls under`,
  opts: [`business to business`, `business to customer`, `customer to customer`, `intra-business`],
  sol: `Both parties are firms, so it is business to business. A business to customer dealing has an individual buyer, a customer to customer dealing has two individuals, and intra-business stays inside one firm.`,
}));
Q('mc_b2c_id', mcq({
  t: 1, d: 2, c: 'application',
  stem: `Meena, a student, orders a novel and a geometry box from the website of Pustak Ghar, an imagined online store. Which kind of e-business dealing is this?`,
  opts: [`Business to customer`, `Business to business`, `Customer to customer`, `Intra-business`],
  sol: `A firm sells to an individual buyer, which is business to customer. Business to business needs a firm as the buyer, customer to customer needs the seller also to be a private person, and intra-business happens inside one firm.`,
}));
Q('mc_intrab_id', mcq({
  t: 1, d: 3, c: 'application',
  stem: `The staff of Madhuvan Tools, an imagined firm, apply for leave, view pay slips and book training seats on a network that only the firm's own people can open. This use of e-business is`,
  opts: [`intra-business`, `business to customer`, `customer to customer`, `business to business`],
  sol: `The network joins the departments and employees of one firm, which is intra-business. The other three types involve parties outside the firm.`,
}));
Q('mc_c2c_id', mcq({
  t: 1, d: 3, c: 'application',
  stem: `On Purani Kitab Bazaar, an imagined classified portal, Rohan lists his old guidebooks and Zainab buys them directly from him. The portal only displays the listing. This dealing is`,
  opts: [`customer to customer`, `business to customer`, `business to business`, `intra-business`],
  sol: `Both the seller and the buyer are private persons, so the dealing is customer to customer. The portal is only a meeting place; neither party is a trading firm, which rules out the business types, and the dealing crosses firms, not departments.`,
}));
Q('mc_24', mcq({
  t: 1, d: 2, c: 'application',
  stem: `At two in the morning on a holiday, Sneha placed an order on the imagined site of Pustak Ghar and received a confirmation at once. Which benefit of e-business does this show?`,
  opts: [`Convenience, with business open at any time`, `Paperless working`, `Ease of formation`, `Global reach`],
  sol: `Orders at any hour of any day show round-the-clock convenience. The scene says nothing about avoiding paper, about setting up the firm, or about buyers in other countries.`,
}));
Q('mc_global', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Sundar Kala Cooperative, an imagined handicraft cooperative of the imagined town of Sundarpur, put pictures of its cane baskets on a website and received enquiries from an imagined importer in the imagined country of Altaria. Which benefit of e-business is shown?`,
  opts: [`Global reach and access`, `Low personal touch`, `Resistance from people`, `Ethical fallouts`],
  sol: `Reaching an importer in another country through a website is global reach. The other three options are limitations, not benefits.`,
}));
Q('mc_formation', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Tanvi began Pustak Ghar as an online store from her home, with a website, a stock room and a courier tie-up, and did not rent a shop in the market. Which benefit does this show?`,
  opts: [`Ease of formation and lower investment`, `A move towards a paperless society`, `Speed in delivery`, `Freedom from all competition`],
  sol: `Starting without costly shop premises means a lower investment and an easier start. The scene does not mention paperless working or delivery speed, and no business is free from competition.`,
}));
Q('mc_lim_touch', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Before buying a wedding sari from an imagined online shop, Latha wished to feel the cloth and to talk to a salesperson, but could do neither on the site. Which limitation of e-business does this show?`,
  opts: [`Low personal touch`, `Risk from anonymity`, `Need for technical competence by all parties`, `Opposition in home countries`],
  sol: `Not being able to touch the goods or talk face to face is the low personal touch of online business. Anonymity concerns who is on the other side, competence concerns skill with the technology, and opposition in home countries belongs to outsourcing.`,
}));
Q('mc_lim_speed', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Pustak Ghar's site confirms an order within seconds, but the books take nine days to reach the buyer because the courier is short of vehicles. Which limitation does this show?`,
  opts: [
    `Incongruence between the speed of order-taking and the speed of delivery`,
    `Low personal touch`,
    `Ethical fallout from monitoring staff`,
    `People's resistance to change`,
  ],
  sol: `Fast order-taking with slow delivery is the mismatch between the two speeds. The other options describe a missing human contact, staff monitoring and resistance, which the scene does not show.`,
}));
Q('mc_lim_ethic', mcq({
  t: 1, d: 3, c: 'application',
  stem: `An imagined firm, Vanya Textiles, installs software that records every key its clerks press and reads their personal messages without telling them. Which limitation of e-business does this show?`,
  opts: [`Ethical fallouts`, `Incongruence of speeds`, `Low investment`, `Convenience at any time`],
  sol: `Secret monitoring of staff is an ethical fallout of e-business. The other options concern delivery speed, a benefit of lower investment and a benefit of round-the-clock service.`,
}));

// ================================================================ t02 Online transactions and security
Q('mc_stage_pre', mcq({
  t: 2, d: 2, c: 'application',
  stem: `Veda browses the catalogue of Pustak Ghar, reads a banner about a school-book sale and compares prices, but has not yet registered. Which stage of an online transaction is she in?`,
  opts: [`Pre-purchase or pre-sale stage`, `Purchase or sale stage`, `Delivery stage`, `After-payment stage`],
  sol: `Seeking information and seeing advertisements belong to the pre-purchase stage. Registration, order and payment belong to the purchase stage, and delivery comes after payment.`,
}));
Q('mc_stage_buy', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: `Which list gives the usual steps of the purchase or sale stage of an online transaction in order?`,
  opts: [
    `Registration, placing the order in the shopping cart, payment`,
    `Payment, registration, delivery`,
    `Advertising, delivery, registration`,
    `Delivery, placing the order, payment`,
  ],
  sol: `The buyer first registers, then places the order through the cart, then pays. Putting payment or delivery first, or including advertising, mixes this stage with the other two stages.`,
}));
Q('mc_cod', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Harpreet orders a lamp from an imagined craft site and hands Rs ${fmt(ORD.pay)} in cash to the courier when the parcel arrives. Which payment mechanism is this?`,
  opts: [`Cash on delivery`, `Net banking transfer`, `Digital cash`, `Payment by cheque`],
  sol: `Paying cash to the courier at the doorstep is cash on delivery. Net banking and digital cash move money electronically, and a cheque is a written instrument on a bank account.`,
}));
Q('mc_netbank', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Farhan logs in to his bank's website with a user name and password and transfers the price of a gift to an imagined store's bank account. As of 2024, this is called`,
  opts: [`net banking transfer`, `cash on delivery`, `payment by a postdated cheque`, `an e-wallet top-up`],
  sol: `Moving money from one account to another through the bank's website is a net banking transfer. Cash on delivery uses notes, a cheque is a paper instrument, and an e-wallet holds a prepaid balance.`,
}));
Q('mc_card', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: `As of 2024, how does paying by a debit card differ from paying by a credit card?`,
  opts: [
    `A debit card takes the amount from the holder's bank balance, while a credit card allows payment later within a limit`,
    `A credit card takes the amount at once from the bank balance, while a debit card allows payment later`,
    `Both can be used only in a shop and never online`,
    `Neither needs a bank or a card issuer`,
  ],
  sol: `A debit card draws on money already in the account, while a credit card gives a limit and the amount is paid later. Both can be used online, and both are issued through banks or similar institutions.`,
}));
Q('mc_wallet', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Imran loads Rs 500 onto a prepaid balance kept inside an app of an imagined firm and uses it to pay for several small online purchases. This payment mechanism, as of 2024, is called`,
  opts: [`digital cash or an e-wallet`, `cash on delivery`, `a cheque`, `a bank draft`],
  sol: `A prepaid stored balance used for payments is digital cash or an e-wallet. Cash on delivery and the paper instruments do not use a stored electronic balance.`,
}));
Q('mc_upi', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Anjali pays an imagined street vendor by choosing his payment address on her phone and approving the amount, and the money moves from her bank account to his in moments. As of 2024, this is an example of`,
  opts: [`a unified payments interface transfer`, `cash on delivery`, `a cheque deposit`, `a credit card instalment`],
  sol: `An instant account-to-account transfer started from a phone is the pattern of the unified payments interface. The other options involve notes, paper deposits or borrowed card credit.`,
}));
Q('mc_risk_trans', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Pustak Ghar delivered an order of Rs ${fmt(ORD.pay)}, but the buyer, who had promised to pay by transfer, never paid. This is a`,
  opts: [`transaction risk, a default on payment`, `data storage risk, a virus attack`, `risk to intellectual property`, `risk to privacy`],
  sol: `Not paying after delivery is a default on payment, which is a transaction risk. A virus harms stored data, and the last two options concern copying and exposure of information, not unpaid dues.`,
}));
Q('mc_risk_data', mcq({
  t: 2, d: 3, c: 'application',
  stem: `A virus enters the computer of Nilgiri Tea Mart, an imagined online shop, and corrupts the file that stores customer orders. Which kind of risk is this?`,
  opts: [`A data storage and transmission risk`, `A transaction risk of default on delivery`, `A risk to intellectual property`, `A risk from cash on delivery`],
  sol: `Damage to stored files by a virus is a data storage risk. Default on delivery concerns unmet promises, intellectual property concerns copying of creations, and cash on delivery is a payment mechanism.`,
}));
Q('mc_risk_ip', mcq({
  t: 2, d: 4, c: 'analysis',
  stem: `A rival copies the photographs and descriptions that Sundar Kala Cooperative took years to create and uses them on its own site. Which risk of e-business does this show?`,
  opts: [`A risk to intellectual property`, `A risk of virus attack`, `A risk of default on delivery`, `A risk of cash handling`],
  sol: `Copying original pictures and text is an infringement of intellectual property, so it is the risk named in the first option. A virus damages files, default on delivery means goods are not sent, and cash handling is not involved.`,
}));
Q('mc_encrypt', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Before sending a card number over the internet, a site of an imagined store scrambles it so that only the bank, which holds the right key, can read it. This security measure is`,
  opts: [`encryption`, `a firewall`, `a digital certificate`, `a spreadsheet`],
  sol: `Scrambling data so that only the key-holder can read it is encryption. A firewall filters traffic, and a certificate proves identity; a spreadsheet is not a security measure.`,
}));
Q('mc_digsig', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: `As of 2024, which statement about a digital signature under the Information Technology Act 2000 is correct?`,
  opts: [
    `It helps to prove who sent an electronic record, and the Act gives it legal recognition`,
    `It is a scanned picture of a hand-written name and has no legal standing`,
    `It is a password that the receiver chooses for the sender`,
    `It makes the record impossible to read for anyone`,
  ],
  sol: `A digital signature links a record to its sender, and the Act gives legal recognition to electronic records and digital signatures. A picture of a name is not that, a password is not chosen by the receiver, and making a record unreadable is the job of encryption.`,
}));
Q('mc_firewall', mcq({
  t: 2, d: 3, c: 'application',
  stem: `The network of Nilgiri Tea Mart has a barrier that checks every packet going between its internal computers and the internet and blocks anything that breaks its rules. This is a`,
  opts: [`firewall`, `digital certificate`, `one-time password`, `cash on delivery`],
  sol: `A barrier that filters traffic between a private network and the internet is a firewall. A certificate proves identity, a one-time password is used once for a login, and cash on delivery is a payment mode.`,
}));
Q('mc_otp', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Before an online card payment of Rs ${fmt(ORD.pay)} is accepted, Divya receives a code on her phone that works for this payment only and soon expires. This code is`,
  opts: [`a one-time password`, `a digital certificate`, `a firewall rule`, `an encryption key held by the shop`],
  sol: `A code valid for a single transaction is a one-time password. A certificate is issued to prove a party's identity, a firewall rule filters traffic, and the code is not a key kept by the shop.`,
}));
Q('mc_resource', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Pustak Ghar has an attractive site and a safe payment page, but it has no tie-up for packing, carrying and tracking its parcels. Which resource for successful e-business is missing?`,
  opts: [`Logistics`, `A well-designed website`, `Payment systems`, `Security infrastructure`],
  sol: `Packing, carrying and tracking of goods are logistics. The scene says the site and payment page already exist.`,
}));

// ================================================================ t03 Outsourcing
Q('mc_out_def', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: `Which statement best defines outsourcing?`,
  opts: [
    `Contracting out some activities of a firm to outside specialists`,
    `Closing down a department and selling its machines`,
    `Hiring more staff to do all work inside the firm`,
    `Selling the whole firm to a competitor`,
  ],
  sol: `Outsourcing means handing a firm's activities to outside specialists by contract. Closing a department, hiring more staff and selling the firm do not involve a contract with a specialist.`,
}));
Q('mc_bpo_id', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Vistar Broadband, an imagined firm, gives the running of its customer helpline to Sampark Call Services, an imagined specialist, which answers complaints by phone for a fee. This arrangement is`,
  opts: [`business process outsourcing`, `knowledge process outsourcing`, `intra-business`, `customer to customer`],
  sol: `A routine business process, the helpline, is handed to a specialist, which is business process outsourcing. Knowledge process outsourcing involves work needing expert analysis, and the last two options are e-business types.`,
}));
Q('mc_kpo_id', mcq({
  t: 3, d: 4, c: 'application',
  stem: `An imagined firm pays a specialist agency to study patent records, analyse market trends and prepare research reports that guide its design decisions. This is closest to`,
  opts: [`knowledge process outsourcing`, `business process outsourcing of routine call handling`, `cash on delivery`, `a joint venture`],
  sol: `Work that needs expert analysis and research is knowledge process outsourcing. Routine call handling is business process outsourcing, and the last two options are not outsourcing at all.`,
}));
Q('mc_out_pay', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Madhuvan Tools, an imagined firm, hands the calculation of salaries, deductions and pay slips of its ${PAY.workers} workers to a specialist firm. Which area of outsourcing is this?`,
  opts: [`Finance and accounting`, `Advertising`, `Courier and logistics`, `Production and manufacturing`],
  sol: `Payroll is part of finance and accounting work. Advertising, courier work and manufacturing are different areas of outsourcing.`,
}));
Q('mc_out_cost', mcq({
  t: 3, d: 3, c: 'application',
  stem: `A specialist payroll firm handles the pay of many clients with one team and one software, so its fee per worker is lower than what each client would spend alone. Which need for outsourcing does this explain?`,
  opts: [`Cost reduction through the economies of scale of specialists`, `Opposition in the home country`, `Fear about confidentiality`, `Sweatshop exploitation`],
  sol: `Serving many clients spreads the fixed costs and lowers the cost per unit, which is the economies of scale of specialists. The other options are concerns about outsourcing, not a need for it.`,
}));
Q('mc_out_core', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Kalpa Biscuits, an imagined maker of biscuits, gives its transport and warehousing to a specialist so that its managers can spend their time on recipes, quality and brands. Which need for outsourcing is this?`,
  opts: [`Focus on the core business`, `Quest for a lower tax bill`, `Opposition in the home country`, `Dependence on a single customer`],
  sol: `Handing non-core work to a specialist leaves the managers free for the main business, which is focus on the core. The other options are not the reason given in the scene.`,
}));
Q('mc_out_confid', mcq({
  t: 3, d: 3, c: 'application',
  stem: `An imagined insurance agent worries that if his customer lists and phone numbers are given to an outside call centre, they may be leaked or sold. Which concern about outsourcing is this?`,
  opts: [`Confidentiality`, `Economies of scale`, `Focus on the core business`, `Knowledge sharing`],
  sol: `The fear of leaking private information is the concern of confidentiality. The other three are advantages of outsourcing.`,
}));

// ---- assertion-reason
Q('ar_ecom_part', ar({
  t: 1, d: 4, c: 'analysis', verdict: 'both-true-explains',
  a: `Every e-commerce transaction is part of e-business, but not every e-business process is e-commerce.`,
  r: `E-business also covers processes such as keeping staff records on an internal network, which involve no buying or selling.`,
  sol: `Both are true. Internal processes with no sale are e-business but not e-commerce, so R explains A.`,
}));
Q('ar_speed', ar({
  t: 1, d: 4, c: 'analysis', verdict: 'both-true-explains',
  a: `A website that confirms orders in seconds can still leave buyers dissatisfied.`,
  r: `The speed of taking orders may not match the speed of delivering goods.`,
  sol: `Both are true. A quick confirmation followed by a slow parcel disappoints buyers, so R explains A.`,
}));
Q('ar_intrab', ar({
  t: 1, d: 4, c: 'analysis', verdict: 'both-true-not-explains',
  a: `Intra-business e-business uses computer networks inside a single firm.`,
  r: `In customer to customer e-business, private persons sell goods to one another.`,
  sol: `Both are true, but the way private persons deal with one another does not explain why intra-business stays inside one firm, so R does not explain A.`,
}));
Q('ar_digsig', ar({
  t: 2, d: 4, c: 'analysis', verdict: 'A-true-R-false',
  a: `A digital signature can help to show who sent an electronic message.`,
  r: `A digital signature scrambles the message so that nobody can read it.`,
  sol: `A is true. R is false, because scrambling a message is encryption; a signature links the message to its sender.`,
}));
Q('ar_firewall', ar({
  t: 2, d: 4, c: 'analysis', verdict: 'A-false-R-true',
  a: `A firewall alone is enough to protect an online store from every kind of risk.`,
  r: `A firewall filters the traffic between a firm's network and the internet.`,
  sol: `A is false: risks such as default on payment or theft of passwords need other measures too. R is true, because filtering traffic is what a firewall does.`,
}));
Q('ar_outsource', ar({
  t: 3, d: 4, c: 'analysis', verdict: 'both-true-explains',
  a: `Outsourcing its payroll can reduce the cost of a firm.`,
  r: `A specialist vendor serves many clients and gains economies of scale.`,
  sol: `Both are true. Because the vendor spreads its fixed costs over many clients, it can charge less than the in-house cost, so R explains A.`,
}));

// ---- true-false, fill in the blanks, match, ordering
Q('tf_ecom_wider', tf({
  t: 1, d: 3, c: 'understanding', ans: false,
  stem: `E-commerce is a wider idea than e-business, because e-business is only a small part of e-commerce.`,
  sol: `The relation is the reverse: e-commerce is a part of e-business, which also covers internal processes.`,
}));
Q('tf_otp', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: `A one-time password can be reused for many payments over a month.`,
  sol: `A one-time password is valid for a single transaction or login and soon expires.`,
}));
Q('tf_out', tf({
  t: 3, d: 2, c: 'recall', ans: true,
  stem: `In outsourcing, a firm contracts some of its activities to outside specialists instead of doing them itself.`,
  sol: `That is the meaning of outsourcing: the work is done by an outside specialist under a contract.`,
}));
Q('fb_eb_types', fb({
  t: 1, d: 2, c: 'recall',
  stem: `The scope of e-business includes business to business, business to ___, intra-business and ___ to customer dealings.`,
  acc: [['customer', 'consumer'], ['customer']],
  sol: `The four are business to business, business to customer, intra-business and customer to customer.`,
}));
Q('fb_stages', fb({
  t: 2, d: 2, c: 'recall',
  stem: `The three stages of an online transaction are the pre-purchase stage, the ___ stage and the ___ stage.`,
  acc: [['purchase', 'purchase or sale', 'sale'], ['delivery']],
  sol: `The stages are pre-purchase or pre-sale, purchase or sale, and delivery.`,
}));
Q('fb_it_act', fb({
  t: 2, d: 2, c: 'recall',
  stem: `As of 2024, the Information Technology Act of ___ gives legal recognition to electronic records and ___ signatures.`,
  acc: [['2000', 'two thousand'], ['digital']],
  sol: `The Information Technology Act of 2000 gives legal recognition to electronic records and digital signatures, as of 2024.`,
}));
Q('mt_scope', match({
  t: 1, d: 3, c: 'application',
  stem: `Match each imagined dealing with the type of e-business it belongs to.`,
  pairs: [
    [`Lekhani Prakashan, a publisher, sells books in bulk to Pustak Ghar through a trade portal`, `Business to business`],
    [`Pustak Ghar sells a dictionary to Meena from its website`, `Business to customer`],
    [`The staff of Pustak Ghar book their leave on the firm's own network`, `Intra-business`],
    [`Rohan sells his old atlas to Zainab on a classified portal`, `Customer to customer`],
  ],
  sol: `Firm to firm is business to business; firm to individual buyer is business to customer; inside one firm is intra-business; one private person to another is customer to customer.`,
}));
Q('mt_security', match({
  t: 2, d: 3, c: 'application',
  stem: `Match each security measure of an imagined online store with the work it does.`,
  pairs: [
    [`Encryption`, `Scrambles data so that only the key-holder can read it`],
    [`Firewall`, `Filters traffic between the internal network and the internet`],
    [`One-time password`, `A code that is valid for one transaction only`],
    [`Digital certificate`, `Shows that a public key belongs to a named party`],
  ],
  sol: `Encryption protects the content, the firewall filters traffic, the one-time password limits a code to one use, and a digital certificate vouches for an identity.`,
}));
Q('od_stages', ord({
  t: 2, d: 3, c: 'understanding',
  stem: `Arrange these events of one online purchase from Pustak Ghar in the usual order.`,
  items: [`Veda reads about a school-book sale on the site`, `Veda registers on the site`, `Veda places the books in the shopping cart and confirms the order`, `Veda pays and the courier delivers the parcel`],
  sol: `Information comes first, then registration, then the order through the cart, then payment and delivery.`,
}));
Q('od_outsource', ord({
  t: 3, d: 3, c: 'understanding',
  stem: `Arrange these steps for an imagined firm that wishes to outsource its payroll in a sensible order.`,
  items: [`The firm identifies payroll as a non-core activity`, `The firm shortlists and selects a specialist vendor`, `A contract with fees and confidentiality terms is signed`, `The firm reviews the vendor's work against the contract`],
  sol: `Identify the activity, choose the vendor, sign the contract, and then monitor the performance.`,
}));

// ================================================================ short answers
Q('s2_eb_def', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: `Define e-business. State one process other than buying and selling that it covers.`,
  model: `E-business is the conduct of industrial, trading and commercial processes over computer networks. Besides buying and selling, it covers processes such as maintaining staff records or ordering raw materials on a network inside the firm.`,
  sol: `Meaning and one other process.`,
  scheme: [[`Meaning of e-business`, 1], [`One other process`, 1]],
}));
Q('s2_eb_vs_ec', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: `Give two points of difference between e-business and e-commerce.`,
  model: `1. E-business covers all business processes done over networks, while e-commerce covers only buying and selling online with its dealings.\n2. E-commerce is a part of e-business, so e-business is the wider idea.`,
  sol: `Any two points.`,
  scheme: [[`First point of difference`, 1], [`Second point of difference`, 1]],
}));
Q('s2_anon', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: `Meera paid an advance to an unknown seller on an imagined portal and never received the goods. Name the limitation of e-business and explain it.`,
  model: `This is the risk from the anonymity of parties. In online dealings the buyer and the seller may never meet or verify each other, so a dishonest party can take the money and disappear, as happened to Meera.`,
  sol: `Limitation named and explained with the case.`,
  scheme: [[`Anonymity of parties named`, 1], [`Explained with the case`, 1]],
}));
Q('s2_paper', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `What is meant by a move towards a paperless society as a benefit of e-business? Give one example.`,
  model: `It means that records and documents are created, sent and stored electronically instead of on paper. For example, an online store emails the invoice and the receipt to a buyer, and nothing is printed.`,
  sol: `Meaning and an example.`,
  scheme: [[`Documents handled electronically`, 1], [`One example`, 1]],
}));
Q('s2_cart', short({
  t: 2, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: `What is a shopping cart in an online purchase? In which stage of the transaction is it used?`,
  model: `A shopping cart is a facility on a website in which a buyer collects the items she wishes to buy and then confirms the order. It is used in the purchase or sale stage, after registration and before payment.`,
  sol: `Meaning and the stage.`,
  scheme: [[`Meaning of the shopping cart`, 1], [`Purchase or sale stage`, 1]],
}));
Q('s2_encrypt', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `Explain encryption as a security measure for an online store.`,
  model: `Encryption is the scrambling of data, such as a card number, into a coded form before it is sent over the internet. Only the party with the correct key can turn it back into readable form, so a thief who intercepts it gains nothing.`,
  sol: `Meaning and how it protects.`,
  scheme: [[`Scrambling of data with a key`, 1], [`How it protects the data`, 1]],
}));
Q('s2_upi', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: `Explain the unified payments interface as a payment mechanism, as of 2024.`,
  model: `As of 2024, the unified payments interface lets a person send money from one bank account to another instantly, using a mobile phone and a payment address instead of account details. The payer approves the amount, so no cash or card is needed.`,
  sol: `Meaning and one feature.`,
  scheme: [[`Instant transfer between bank accounts by phone`, 1], [`Payment address or approval, no cash needed`, 1]],
}));
Q('s2_ip', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: `Sundar Kala Cooperative finds its basket designs and photographs on a rival's site. Name the risk and say why it matters.`,
  model: `This is a risk to intellectual property. The cooperative spent effort and money creating the designs, and when others copy them freely it loses its distinct identity and the income that the original work should earn.`,
  sol: `Risk named and why it matters.`,
  scheme: [[`Risk to intellectual property named`, 1], [`Why it matters to the cooperative`, 1]],
}));
Q('s2_bpo_kpo', short({
  t: 3, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: `Distinguish business process outsourcing from knowledge process outsourcing.`,
  model: `Business process outsourcing hands routine business processes, such as a customer helpline or payroll, to a specialist. Knowledge process outsourcing hands work that needs expert knowledge and analysis, such as research or data analysis.`,
  sol: `Both described.`,
  scheme: [[`Business process outsourcing described`, 1], [`Knowledge process outsourcing described`, 1]],
}));
Q('s2_out_def', short({
  t: 3, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: `What is outsourcing? Name one activity that a firm may outsource.`,
  model: `Outsourcing means that a firm contracts some of its activities to outside specialists who carry them out for a fee. A firm may outsource, for example, its customer support through a call centre or its courier work.`,
  sol: `Meaning and one activity.`,
  scheme: [[`Contracting activities to outside specialists`, 1], [`One activity named`, 1]],
}));

Q('s3_benefits', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: `Explain any three benefits of e-business to a firm such as Pustak Ghar.`,
  model: `1. Lower investment: the store needs no costly shop premises, so it is easy to start.\n2. Convenience: orders are accepted at any hour of any day.\n3. Global reach: a buyer in any city or country can find the site and place an order. Speed and paperless working are other benefits.`,
  sol: `Any three benefits.`,
  scheme: [[`First benefit`, 1], [`Second benefit`, 1], [`Third benefit`, 1]],
}));
Q('s3_limits', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: `Explain any three limitations of e-business.`,
  model: `1. Low personal touch: buyers cannot see, touch or discuss goods face to face.\n2. Mismatch of speeds: orders are taken in seconds but delivery may take days.\n3. Need for competence: all the parties must have the technology and skill to use it. Resistance from people and anonymity are other limits.`,
  sol: `Any three limitations.`,
  scheme: [[`First limitation`, 1], [`Second limitation`, 1], [`Third limitation`, 1]],
}));
Q('s3_payment', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: `Explain any three payment mechanisms used in online transactions, as of 2024.`,
  model: `1. Cash on delivery: the buyer pays the courier in cash when the goods arrive.\n2. Net banking transfer: the buyer moves money from her account through the bank's website.\n3. Cards: a debit card uses the balance in the account, while a credit card allows payment later within a limit. Wallets and the unified payments interface are other means.`,
  sol: `Any three mechanisms.`,
  scheme: [[`First mechanism`, 1], [`Second mechanism`, 1], [`Third mechanism`, 1]],
}));
Q('s3_security', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `Nilgiri Tea Mart, an imagined online shop, wishes to protect its customers' payment details. Suggest any three security measures.`,
  model: `1. Encryption: card details are scrambled before they travel over the internet.\n2. One-time passwords: each payment needs a fresh code sent to the customer's phone.\n3. A firewall at the network edge blocks unauthorised traffic. A secure website with https is also useful.`,
  sol: `Any three measures applied to the shop.`,
  scheme: [[`First measure`, 1], [`Second measure`, 1], [`Third measure`, 1]],
}));
Q('s3_resources', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: `State three resources that a firm needs in order to succeed in e-business.`,
  model: `1. A well-designed website that is easy to use and shows goods clearly.\n2. Technology and security infrastructure, such as servers, networks and protection against hacking.\n3. Logistics to pack and deliver goods, and payment systems that let customers pay safely.`,
  sol: `Any three resources.`,
  scheme: [[`Website`, 1], [`Technology and security`, 1], [`Logistics or payment systems`, 1]],
}));
Q('s3_out_need', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: `Explain any three reasons why firms outsource some of their activities.`,
  model: `1. Focus on the core business: managers spend time on the main work of the firm.\n2. Cost reduction: specialists gain economies of scale and can charge less than in-house work costs.\n3. Excellence: specialists do the task better. Knowledge sharing and a boost to economic development are other reasons.`,
  sol: `Any three reasons.`,
  scheme: [[`First reason`, 1], [`Second reason`, 1], [`Third reason`, 1]],
}));
Q('s3_out_concerns', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: `Explain any three concerns that people have about outsourcing.`,
  model: `1. Confidentiality: private data given to an outside party may be leaked.\n2. Sweatshop exploitation: workers at the vendor may face long hours and low pay.\n3. Opposition in home countries: people fear that jobs will move elsewhere. Wider ethical concerns also arise.`,
  sol: `Any three concerns.`,
  scheme: [[`First concern`, 1], [`Second concern`, 1], [`Third concern`, 1]],
}));

// ================================================================ long answers
Q('l_scope', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: `Explain the scope of e-business with an imagined example of each type.`,
  model: `1. Business to business: a firm deals with another firm, as when Pustak Ghar orders books from a publisher on a trade portal.\n2. Business to customer: a firm sells to an individual buyer, such as a student ordering from the Pustak Ghar website.\n3. Intra-business: processes within one firm, such as staff applying for leave on its own network.\n4. Customer to customer: private persons deal directly, such as one student selling an old atlas to another.\n5. Together they show that e-business covers dealings outside and inside the firm.`,
  sol: `Four types with examples and a closing point.`,
  scheme: [[`Business to business with example`, 1], [`Business to customer with example`, 1], [`Intra-business with example`, 1], [`Customer to customer with example`, 1], [`Overall scope explained`, 1]],
}));
Q('l_benlim', long({
  t: 1, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: `Explain any three benefits and two limitations of e-business, and say which one you think is the most serious limitation for a small firm.`,
  model: `Benefits: 1. Ease of formation and lower investment, as no shop is needed. 2. Convenience, as orders arrive at any hour. 3. Global reach, as buyers can be in distant places.\nLimitations: 1. Low personal touch, as buyers cannot handle the goods. 2. Mismatch between the speed of order-taking and delivery.\nOpinion: for a small firm the mismatch of speeds may be most serious, because late delivery loses customers and the firm may not control the courier.`,
  sol: `Three benefits, two limitations and a reasoned opinion.`,
  scheme: [[`Two benefits`, 1], [`Third benefit`, 1], [`First limitation`, 1], [`Second limitation`, 1], [`A reasoned opinion`, 1]],
}));
Q('l_stages', long({
  t: 2, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: `Explain the stages of an online transaction, using the imagined store Pustak Ghar to illustrate.`,
  model: `1. Pre-purchase or pre-sale stage: the buyer finds information and sees advertisements, such as a banner on a school-book sale.\n2. Purchase or sale stage, registration: the buyer registers on the site with name, address and phone.\n3. Placing the order: the books are put in the shopping cart and the order is confirmed.\n4. Payment: the buyer pays by cash on delivery, a card, net banking or the unified payments interface, as of 2024.\n5. Delivery stage: the parcel is packed and sent, and the buyer receives it.`,
  sol: `Three stages and the steps of the purchase stage.`,
  scheme: [[`Pre-purchase stage`, 1], [`Registration`, 1], [`Placing the order`, 1], [`Payment`, 1], [`Delivery stage`, 1]],
}));
Q('l_secmeasures', long({
  t: 2, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `Explain any five measures that an online business can take to protect its transactions and data.`,
  model: `1. Encryption: data such as card numbers are scrambled so that only the key-holder can read them.\n2. Digital signatures and certificates: they identify the sender, and the Information Technology Act 2000 gives legal recognition to electronic records and digital signatures, as of 2024.\n3. Passwords and one-time passwords: only authorised users get access, and a code is valid for a single use.\n4. Firewalls: they filter traffic between the firm's network and the internet.\n5. Secure websites: an encrypted connection, shown by https, protects data in transit.`,
  sol: `Five measures with one line of explanation each.`,
  scheme: [[`Encryption`, 1], [`Digital signatures and certificates`, 1], [`Passwords and one-time passwords`, 1], [`Firewalls`, 1], [`Secure websites`, 1]],
}));
Q('l_out_need', long({
  t: 3, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: `Explain the need for outsourcing in any five points.`,
  model: `1. Focus on the core business: the firm leaves non-core work to others and spends its effort on the main activity.\n2. Quest for excellence: a specialist does the task with greater skill and quality.\n3. Cost reduction: a specialist serves many clients, gains economies of scale and charges less.\n4. Knowledge sharing: working with outside firms brings new ideas and collaboration.\n5. Economic development: outsourcing creates jobs and skills in the places where the work is done.`,
  sol: `Five needs.`,
  scheme: [[`Focus on the core business`, 1], [`Quest for excellence`, 1], [`Cost reduction`, 1], [`Knowledge sharing`, 1], [`Catalyst for economic development`, 1]],
}));
Q('l_out_scope', long({
  t: 3, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: `Describe any three areas of outsourcing and explain two concerns about outsourcing.`,
  model: `Areas: 1. Finance and accounting, such as handing payroll and bookkeeping to a specialist firm. 2. Customer support, where a call centre answers the complaints and questions of customers. 3. Courier and logistics, where a carrier packs, moves and tracks the goods. Production and advertising are other areas.\nConcerns: 1. Confidentiality: private data given to the vendor may leak or be misused. 2. Sweatshop exploitation: the vendor's workers may face long hours and poor pay, which raises ethical questions.`,
  sol: `Three areas and two concerns.`,
  scheme: [[`First area`, 1], [`Second area`, 1], [`Third area`, 1], [`First concern`, 1], [`Second concern`, 1]],
}));

// ================================================================ case-based
Q('cb_pustak', caseQ({
  t: [1, 2], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined online store.)*`,
  passage: `**Pustak Ghar (imagined), an online bookshop in the imagined city of Granthpur**\n\nTanvi started Pustak Ghar from a rented stock room, because a shop in the main market would have cost Rs ${fmt(SHOP.rent)} a month against Rs ${fmt(SHOP.online)} for the room. Customers browse the catalogue, register, put books in a cart and pay. Last Sunday at two in the morning, Rahul bought three books at Rs ${ORD.three} each and one at Rs ${ORD.one}, used a coupon for ${ORD.discPct} per cent off the book total, and paid a delivery charge of Rs ${ORD.ship}. The site confirmed the order in a minute, but the courier took eight days to deliver it.`,
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'application', stem: `The dealing between Pustak Ghar and Rahul is an example of`, opts: [`business to customer e-business`, `business to business e-business`, `customer to customer e-business`, `intra-business`], sol: `A firm selling to an individual buyer is business to customer. The other types need a firm buyer, two private persons or a dealing inside a firm.` })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: `Quote the line that shows a limitation of e-business.`, model: `"**The site confirmed the order in a minute, but the courier took eight days to deliver it**": the speed of order-taking does not match the speed of delivery.`, sol: `The line on the confirmation and the delivery.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: 2, d: 4, c: 'application', marks: 2, stem: `**Either** (i): Find the amount Rahul paid, showing the steps.`, model: `The book total is 3 times Rs ${ORD.three} plus Rs ${ORD.one}, which is Rs ${fmt(ORD.sub)}. The discount of ${ORD.discPct} per cent is Rs ${ORD.disc}, which leaves Rs ${fmt(ORD.sub - ORD.disc)}. With the delivery charge of Rs ${ORD.ship}, he pays Rs ${fmt(ORD.pay)}.`, sol: `Book total, discount and delivery charge.`, scheme: [[`Book total Rs ${fmt(ORD.sub)} and discount Rs ${ORD.disc}`, 1], [`Final payable Rs ${fmt(ORD.pay)}`, 1]] }), [
      short({ t: 1, d: 4, c: 'analysis', marks: 2, stem: `**Or** (ii): Find how much Tanvi saves each month and in a year by using the stock room, and name the benefit this shows.`, model: `The monthly saving is Rs ${fmt(SHOP.rent)} minus Rs ${fmt(SHOP.online)}, which is Rs ${fmt(SHOP.save)}, and in a year it is Rs ${fmt(SHOP.year)}. The benefit shown is a lower investment, which makes the start easy.`, sol: `Compute the saving and name the benefit.`, scheme: [[`Saving Rs ${fmt(SHOP.save)} a month and Rs ${fmt(SHOP.year)} a year`, 1], [`Lower investment named`, 1]] }),
    ]),
  ],
}));
Q('cb_kala', caseQ({
  t: [1, 2], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined cooperative and buyer.)*`,
  passage: `**Sundar Kala Cooperative (imagined), Sundarpur**\n\nSundar Kala Cooperative, an imagined handicraft cooperative of the imagined town of Sundarpur, put pictures of its cane furniture on a website. Nordvik Interiors, an imagined buyer in the imagined country of Altaria, found the site and placed an order worth Rs ${fmt(KALA.order)}, with ${KALA.advPct} per cent to be paid in advance. The members of the cooperative worry that the buyer may refuse the balance after the goods are shipped, and that a rival may copy their designs from the site. The cooperative has therefore asked its bank to use encrypted payment pages and digital signatures on the order papers.`,
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'application', stem: `The dealing between the cooperative and Nordvik Interiors is an example of`, opts: [`business to business e-business`, `business to customer e-business`, `customer to customer e-business`, `intra-business`], sol: `Both parties are trading firms, so it is business to business. A business to customer deal has an individual buyer, and the other two types involve private persons or one firm.` })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: `Quote the line that shows a transaction risk.`, model: `"**the buyer may refuse the balance after the goods are shipped**": a default on payment is a transaction risk.`, sol: `The line on the refusal of the balance.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: 2, d: 4, c: 'application', marks: 2, stem: `**Either** (i): Find the advance and the balance of the order.`, model: `The advance is ${KALA.advPct} per cent of Rs ${fmt(KALA.order)}, which is Rs ${fmt(KALA.adv)}. The balance is Rs ${fmt(KALA.order)} minus Rs ${fmt(KALA.adv)}, which is Rs ${fmt(KALA.bal)}.`, sol: `Advance and balance.`, scheme: [[`Advance Rs ${fmt(KALA.adv)}`, 1], [`Balance Rs ${fmt(KALA.bal)}`, 1]] }), [
      short({ t: 2, d: 4, c: 'analysis', marks: 2, stem: `**Or** (ii): Name the two security measures that the cooperative has asked its bank to use and say what each does.`, model: `Encrypted payment pages scramble the payment data so that only the bank can read it. Digital signatures on the order papers show who sent them and that they were not altered, and the Information Technology Act 2000 gives them legal recognition, as of 2024.`, sol: `Two measures with the work of each.`, scheme: [[`Encryption and its work`, 1], [`Digital signatures and their work`, 1]] }),
    ]),
  ],
}));
Q('cb_shield', caseQ({
  t: 2, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined online shop.)*`,
  passage: `**Nilgiri Tea Mart (imagined), an online tea shop in the imagined town of Chaibagh**\n\nNilgiri Tea Mart accepts orders on its website and keeps the names, addresses and phone numbers of its customers on one office computer. Its staff share a single simple password and the computer has no firewall. Last month an outsider entered the computer, copied the customer list and sent messages in the shop's name asking customers for card details. Many customers lost trust in the shop, and several orders were cancelled.`,
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'application', stem: `The copying of the customer list is mainly a`, opts: [`data storage and privacy risk`, `risk of default on delivery`, `risk of cash on delivery`, `benefit of e-business`], sol: `An outsider entering the computer and taking customer information is a data storage and privacy risk. Default on delivery concerns unsent goods, cash on delivery is a payment mode, and the event is not a benefit.` })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: `Quote the line that shows a weakness in the shop's security.`, model: `"**Its staff share a single simple password and the computer has no firewall**": weak passwords and the absence of a firewall left the data exposed.`, sol: `The line on the shared password and no firewall.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: 2, d: 4, c: 'application', marks: 2, stem: `**Either** (i): Suggest two security measures that would have lowered the risk, and say why.`, model: `1. A firewall would have filtered the traffic and blocked the outsider.\n2. Separate strong passwords, with one-time passwords for sensitive access, would have stopped easy entry.`, sol: `Two measures with reasons.`, scheme: [[`Firewall with reason`, 1], [`Passwords with reason`, 1]] }), [
      short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: `**Or** (ii): Explain how encryption of the stored customer list would have limited the damage.`, model: `If the list had been encrypted, the outsider would have copied only scrambled data that cannot be read without the key. The names and phone numbers would not have been usable, so customers would have been better protected.`, sol: `Encryption and its effect.`, scheme: [[`Encryption scrambles stored data`, 1], [`Copied data stays unreadable`, 1]] }),
    ]),
  ],
}));
Q('cb_payroll', caseQ({
  t: 3, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined firm and vendor.)*`,
  passage: `**Madhuvan Tools (imagined), an imagined engineering firm of Madhupur**\n\nMadhuvan Tools has ${PAY.workers} workers. Its payroll work needs ${PAY.staff} clerks, each paid Rs ${fmt(PAY.salary)} a month, and software that costs Rs ${fmt(PAY.software)} a month. The firm has decided to hand its payroll to Gana Payroll Services, an imagined specialist, which charges Rs ${PAY.fee} per worker a month. The managers are happy to spend their time on design and sales, but the union fears that the workers' pay details may be shared with others.`,
  parts: [
    child('a', mcq({ t: 3, d: 2, c: 'application', stem: `Handing the payroll to Gana Payroll Services is an example of`, opts: [`outsourcing in the area of finance and accounting`, `a joint venture`, `business to customer e-business`, `intra-business`], sol: `Contracting payroll work to an outside specialist is outsourcing in finance and accounting. A joint venture shares ownership, and the e-business types describe online dealings.` })),
    child('b', short({ t: 3, d: 3, c: 'application', marks: 1, stem: `Quote the line that shows a concern about outsourcing.`, model: `"**the union fears that the workers' pay details may be shared with others**": this is the concern of confidentiality.`, sol: `The line on the union's fear.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: 3, d: 4, c: 'application', marks: 2, stem: `**Either** (i): Find the monthly cost of payroll inside the firm, the monthly fee of the vendor and the yearly saving.`, model: `In-house cost is ${PAY.staff} times Rs ${fmt(PAY.salary)} plus Rs ${fmt(PAY.software)}, which is Rs ${fmt(PAY.inhouse)}. The vendor charges ${PAY.workers} times Rs ${PAY.fee}, which is Rs ${fmt(PAY.vendor)}. The monthly saving is Rs ${fmt(PAY.save)}, and the yearly saving is Rs ${fmt(PAY.year)}.`, sol: `Compute the two costs and the saving.`, scheme: [[`Costs Rs ${fmt(PAY.inhouse)} and Rs ${fmt(PAY.vendor)}`, 1], [`Saving Rs ${fmt(PAY.save)} a month, Rs ${fmt(PAY.year)} a year`, 1]] }), [
      short({ t: 3, d: 4, c: 'evaluation', marks: 2, stem: `**Or** (ii): Which need for outsourcing is shown by the managers' wish to spend time on design and sales, and what step could ease the union's fear?`, model: `The managers' wish shows the need to focus on the core business. The fear can be eased by a contract with strict confidentiality terms and penalties if the vendor leaks the data.`, sol: `The need and a safeguard.`, scheme: [[`Focus on the core business`, 1], [`Confidentiality terms in the contract`, 1]] }),
    ]),
  ],
}));
Q('cb_callcentre', caseQ({
  t: 3, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined firm and vendor.)*`,
  passage: `**Vistar Broadband (imagined) and Sampark Call Services (imagined)**\n\nVistar Broadband, an imagined internet provider, gave its complaint helpline to Sampark Call Services, an imagined vendor in the imagined country of Altaria. Sampark serves several firms with one large team, so Vistar pays far less than its own call centre would have cost. A newspaper in Vistar's home country reported that Sampark's agents work long night shifts for low pay, and a local group asked the firm to bring the work back home to protect local jobs.`,
  parts: [
    child('a', mcq({ t: 3, d: 2, c: 'application', stem: `The helpline arrangement is an example of`, opts: [`business process outsourcing`, `knowledge process outsourcing`, `a departmental undertaking`, `customer to customer e-business`], sol: `Handing a routine process to a specialist is business process outsourcing. The work is not research that needs expert analysis, and the other options are a public enterprise form and an e-business type.` })),
    child('b', short({ t: 3, d: 3, c: 'application', marks: 1, stem: `Quote the line that shows the cost advantage of outsourcing.`, model: `"**Sampark serves several firms with one large team, so Vistar pays far less than its own call centre would have cost**": specialists' economies of scale lower the cost.`, sol: `The line on the large team and the lower payment.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: 3, d: 4, c: 'analysis', marks: 2, stem: `**Either** (i): Identify two concerns about outsourcing that appear in the passage.`, model: `1. Sweatshop exploitation: the agents work long night shifts for low pay.\n2. Opposition in the home country: a local group wants the work to come back to protect local jobs.`, sol: `Two concerns with evidence.`, scheme: [[`Sweatshop exploitation with evidence`, 1], [`Opposition in the home country with evidence`, 1]] }), [
      short({ t: 3, d: 4, c: 'evaluation', marks: 2, stem: `**Or** (ii): Suggest one step Vistar could take to answer the concern about the agents, and one benefit it keeps by outsourcing.`, model: `Vistar could require in its contract that Sampark pays fair wages and limits night shifts, and could check this by visits. It would still keep a lower cost, since the vendor's economies of scale remain.`, sol: `A step and a benefit.`, scheme: [[`A suitable step`, 1], [`A benefit that remains`, 1]] }),
    ]),
  ],
}));
