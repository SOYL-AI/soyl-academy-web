// CBSE 11 Business Studies, ch10 International Business: question bank. Every firm, country, importer and exporter is
// imagined and written by SOYL; no NCERT example, exercise or board/sample-paper item is reused (D-036). Every amount is
// computed below from imagined orders and an imagined exchange rate; no real fee, duty rate or member count is stated.
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child } from '../../cbse-11-business-studies-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
export const fmt = (n) => n.toLocaleString('en-IN');

// Indian-style number words for narration (lakh, crore).
const ONES = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
const TENS = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
const w2 = (n) => (n < 20 ? ONES[n] : TENS[Math.floor(n / 10)] + (n % 10 ? ' ' + ONES[n % 10] : ''));
const w3 = (n) => (n >= 100 ? ONES[Math.floor(n / 100)] + ' hundred' + (n % 100 ? ' and ' + w2(n % 100) : '') : w2(n));
export const W = (n) => {
  if (n === 0) return 'zero';
  const parts = [];
  const cr = Math.floor(n / 10000000); n %= 10000000;
  const lk = Math.floor(n / 100000); n %= 100000;
  const th = Math.floor(n / 1000); n %= 1000;
  if (cr) parts.push(w2(cr) + ' crore');
  if (lk) parts.push(w2(lk) + ' lakh');
  if (th) parts.push(w2(th) + ' thousand');
  if (n) parts.push(w3(n));
  return parts.join(' ');
};

// ---- computed figures used in stems, solutions and slides ---------------------------------------------------
// Kanchan Textiles, an imagined exporter of cotton sarees, and its imagined order from Harbour Fabrics (Rs).
export const EX = { n: 2000, usd: 25, rate: 80, cost: 1400, cap: 5000, dom: 3000, prePct: 60, insPct: 110, rate2: 84 };
EX.usdTotal = EX.n * EX.usd; // 50,000 US dollars
EX.inr = EX.usdTotal * EX.rate; // 40,00,000
EX.costTot = EX.n * EX.cost; // 28,00,000
EX.margin = EX.inr - EX.costTot; // 12,00,000
EX.pre = (EX.inr * EX.prePct) / 100; // 24,00,000
EX.insured = (EX.inr * EX.insPct) / 100; // 44,00,000
EX.inr2 = EX.usdTotal * EX.rate2; // 42,00,000
EX.gain2 = EX.inr2 - EX.inr; // 2,00,000
EX.util0 = (EX.dom * 100) / EX.cap; // 60
EX.util1 = ((EX.dom + EX.n) * 100) / EX.cap; // 100
// Tarini Engineering, an imagined importer of a packaging machine from Berghof Machines (imagined), at an imagined rate and duty.
export const IM = { machine: 12000, fr: 1500, rate: 82, dutyPct: 10 };
IM.cifUsd = IM.machine + IM.fr; // 13,500
IM.mInr = IM.machine * IM.rate; // 9,84,000
IM.cif = IM.cifUsd * IM.rate; // 11,07,000
IM.duty = (IM.cif * IM.dutyPct) / 100; // 1,10,700
IM.landed = IM.cif + IM.duty; // 12,17,700
IM.wrong = IM.mInr + (IM.mInr * IM.dutyPct) / 100; // 10,82,400
// Tesoria and Kolmark, two imagined countries with 100 workers each.
export const TS = { w: 100, teaT: 30, clT: 10, teaK: 10, clK: 20 };
TS.tea0 = (TS.w / 2) * TS.teaT + (TS.w / 2) * TS.teaK; // 2,000
TS.cl0 = (TS.w / 2) * TS.clT + (TS.w / 2) * TS.clK; // 1,500
TS.tea1 = TS.w * TS.teaT; // 3,000
TS.cl1 = TS.w * TS.clK; // 2,000
// Lumen Apparel, an imagined brand, with contract manufacturing (Rs).
export const CM = { n: 10000, contract: 300, own: 380 };
CM.cCost = CM.n * CM.contract; // 30,00,000
CM.oCost = CM.n * CM.own; // 38,00,000
CM.saving = CM.oCost - CM.cCost; // 8,00,000
// Orchid Beverages, an imagined licensor, and Brisk Bites, an imagined franchiser (Rs).
export const LI = { sales: 20000000, pct: 5 };
LI.royalty = (LI.sales * LI.pct) / 100; // 10,00,000
export const FR = { fee: 300000, monthly: 600000, pct: 4 };
FR.share = (FR.monthly * FR.pct) / 100; // 24,000
FR.year1 = FR.fee + FR.share * 12; // 5,88,000
// Dhanvantari Foods, an imagined joint venture, and Suryakiran Solar, a second imagined joint venture (Rs).
export const J1 = { cost: 5000000, a: 60, b: 40, profit: 800000 };
J1.aCap = (J1.cost * J1.a) / 100; // 30,00,000
J1.bCap = (J1.cost * J1.b) / 100; // 20,00,000
J1.aProfit = (J1.profit * J1.a) / 100; // 4,80,000
J1.bProfit = (J1.profit * J1.b) / 100; // 3,20,000
export const J2 = { cost: 50000000, a: 55, b: 45, profit: 9000000 };
J2.aCap = (J2.cost * J2.a) / 100; // 2,75,00,000
J2.bCap = (J2.cost * J2.b) / 100; // 2,25,00,000
J2.aProfit = (J2.profit * J2.a) / 100; // 49,50,000
J2.bProfit = (J2.profit * J2.b) / 100; // 40,50,000
// Meera Spices, an imagined spice exporter, selling through Rasa Exports, an imagined export house (Rs).
export const EH = { cons: 600000, pct: 5 };
EH.comm = (EH.cons * EH.pct) / 100; // 30,000
EH.net = EH.cons - EH.comm; // 5,70,000
if (EX.usdTotal !== 50000 || EX.inr !== 4000000 || EX.costTot !== 2800000 || EX.margin !== 1200000 || EX.pre !== 2400000 || EX.insured !== 4400000 ||
  EX.inr2 !== 4200000 || EX.gain2 !== 200000 || EX.util0 !== 60 || EX.util1 !== 100 ||
  IM.cifUsd !== 13500 || IM.mInr !== 984000 || IM.cif !== 1107000 || IM.duty !== 110700 || IM.landed !== 1217700 || IM.wrong !== 1082400 ||
  TS.tea0 !== 2000 || TS.cl0 !== 1500 || TS.tea1 !== 3000 || TS.cl1 !== 2000 ||
  CM.cCost !== 3000000 || CM.oCost !== 3800000 || CM.saving !== 800000 ||
  LI.royalty !== 1000000 || FR.share !== 24000 || FR.year1 !== 588000 ||
  J1.aCap !== 3000000 || J1.bCap !== 2000000 || J1.aProfit !== 480000 || J1.bProfit !== 320000 ||
  J2.aCap !== 27500000 || J2.bCap !== 22500000 || J2.aProfit !== 4950000 || J2.bProfit !== 4050000 ||
  EH.comm !== 30000 || EH.net !== 570000) throw new Error('figure check failed');

// ================================================================ t01 Nature, scope and benefits; modes of entry
Q('mc_ib_def', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Which statement best describes international business?`,
  opts: [
    `All business activities, such as trade, investment and production, that are carried on across the boundaries of countries`,
    `Only the buying and selling of goods between two countries`,
    `Business that a firm carries on inside one state of its own country`,
    `A business that is owned by the government of one country`,
  ],
  sol: `International business covers every business activity that crosses national boundaries, including making goods abroad and investing abroad, and not only trade. The second option is too narrow, the third describes domestic business, and the fourth is about ownership and not about crossing borders.`,
}));
Q('mc_it_part', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Which statement correctly relates international trade to international business?`,
  opts: [
    `International trade, the exchange of goods and services across borders, is one part of international business`,
    `International business is one part of international trade`,
    `The two terms mean exactly the same and nothing else is included`,
    `International trade means trade inside the boundaries of one country`,
  ],
  sol: `Trade across borders is one part of the wider activity called international business, which also includes investment and the licensing of know-how. The second option reverses the relation, the third wrongly equates the two, and the fourth describes internal trade.`,
}));
Q('mc_why_prod', mcq({
  t: 1, d: 4, c: 'application',
  stem: `In the imagined countries of Tesoria and Kolmark, a worker of Tesoria grows ${TS.teaT} kg of tea or weaves ${TS.clT} metres of cloth in a season, while a worker of Kolmark grows ${TS.teaK} kg of tea or weaves ${TS.clK} metres. Each country has ${TS.w} workers, split equally between the two goods. Now Tesoria puts all its workers on tea and Kolmark puts all its workers on cloth, and the two countries trade. Taken together, their output changes as follows:`,
  opts: [
    `Tea rises from ${fmt(TS.tea0)} kg to ${fmt(TS.tea1)} kg and cloth from ${fmt(TS.cl0)} metres to ${fmt(TS.cl1)} metres`,
    `Tea stays at ${fmt(TS.tea0)} kg and cloth stays at ${fmt(TS.cl0)} metres, because trade only moves goods`,
    `Tea rises to ${fmt(TS.tea1)} kg but cloth falls to ${fmt(TS.cl0 - 500)} metres`,
    `Tea falls to ${fmt(TS.tea0 - 500)} kg and cloth rises to ${fmt(TS.cl1)} metres`,
  ],
  sol: `Before, tea is 50 workers at ${TS.teaT} kg plus 50 at ${TS.teaK} kg, which is ${fmt(TS.tea0)} kg, and cloth is 50 at ${TS.clT} metres plus 50 at ${TS.clK} metres, which is ${fmt(TS.cl0)} metres. After specialising, Tesoria makes ${fmt(TS.tea1)} kg of tea and Kolmark makes ${fmt(TS.cl1)} metres of cloth, so both totals rise. The other options ignore the gain from specialisation or mis-state one of the totals.`,
}));
Q('mc_serv_exp', mcq({
  t: 1, d: 2, c: 'application',
  stem: `Pixel Path, an imagined software firm of the imagined city of Chandrapur, writes an accounts program for a hospital group abroad and is paid in foreign currency. This activity falls under the scope of international business as`,
  opts: [`a service export`, `a merchandise export`, `foreign investment`, `the licensing of a brand`],
  sol: `Writing a program for a foreign client and being paid in foreign currency is the export of a service. Merchandise exports are goods that are shipped, nothing is invested abroad, and no brand or know-how is licensed.`,
}));
Q('mc_capacity', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Kanchan Textiles, an imagined firm of the imagined town of Sutrapur, can weave ${fmt(EX.cap)} sarees a month but sells only ${fmt(EX.dom)} at home, so its looms run at ${EX.util0} per cent. A foreign order for ${fmt(EX.n)} sarees raises the use of its capacity to ${EX.util1} per cent. Which benefit to a firm does this show?`,
  opts: [`Better utilisation of capacity`, `A way out of intense competition at home`, `Improved business vision`, `A higher standard of living for the nation`],
  sol: `Looms that were partly idle now work to full capacity, which is better capacity utilisation. Escaping competition and a broader vision are other firm-level benefits that the case does not describe, and a standard of living is a benefit to a nation and not to one firm.`,
}));
Q('mc_indirect', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Meera Spices, an imagined firm of the imagined town of Elapur, hands its cardamom to Rasa Exports, an imagined export house, which finds the foreign buyers and ships the goods. Meera Spices has entered international business through`,
  opts: [`indirect exporting`, `direct exporting`, `contract manufacturing`, `a wholly owned foreign subsidiary`],
  sol: `Selling through an intermediary in the home country is indirect exporting. In direct exporting the firm itself finds the buyers and ships, no foreign firm makes the goods in contract manufacturing, and no overseas company is owned here.`,
}));
Q('mc_contract_id', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Lumen Apparel, an imagined brand, designs shirts and has Sutra Garments, an imagined maker in the imagined country of Ostria, produce ${fmt(CM.n)} shirts to its specification. Lumen Apparel then sells them under its own label. This mode of entry is`,
  opts: [`contract manufacturing`, `licensing`, `a joint venture`, `exporting by an export house`],
  sol: `Having a foreign firm make goods to your specification and selling them yourself is contract manufacturing. Licensing grants the right to use know-how for a fee, a joint venture is a business owned together, and an export house is an exporting intermediary.`,
}));
Q('mc_franchise', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Brisk Bites, an imagined cafe brand, lets a local owner in an imagined foreign city run a cafe under its name, menu and way of working, against an initial fee and a share of monthly sales. This is`,
  opts: [`franchising`, `contract manufacturing`, `a wholly owned foreign subsidiary`, `indirect exporting`],
  sol: `Letting another party run an outlet under a brand and system for a fee and a share of sales is franchising. Nobody manufactures to order here, the brand does not own the cafe, and no goods are exported.`,
}));
Q('mc_royalty_calc', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Orchid Beverages, an imagined firm, licenses its recipe and brand to Sagar Drinks, an imagined firm abroad, for a royalty of ${LI.pct} per cent of sales. If Sagar Drinks sells goods worth Rs ${fmt(LI.sales)} in a year, the royalty due is`,
  opts: [`Rs ${fmt(LI.royalty)}`, `Rs ${fmt(LI.royalty / 10)}`, `Rs ${fmt(LI.sales / 5)}`, `Rs ${fmt(LI.sales - LI.royalty)}`],
  sol: `${LI.pct} per cent of Rs ${fmt(LI.sales)} is Rs ${fmt(LI.royalty)}. The second value moves the decimal point, the third takes one fifth of sales, and the fourth is what remains after the royalty.`,
}));
Q('mc_jv_share', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Dhanvantari Foods, an imagined Indian firm, and Lindqvist Dairies, an imagined firm abroad, build a joint plant that costs Rs ${fmt(J1.cost)}, with capital in the ratio ${J1.a} to ${J1.b} and profit shared in the same ratio. If the plant earns a profit of Rs ${fmt(J1.profit)} in its first year, the share of Dhanvantari Foods is`,
  opts: [`Rs ${fmt(J1.aProfit)}`, `Rs ${fmt(J1.bProfit)}`, `Rs ${fmt(J1.profit / 2)}`, `Rs ${fmt(J1.aCap)}`],
  sol: `${J1.a} per cent of Rs ${fmt(J1.profit)} is Rs ${fmt(J1.aProfit)}. The second value is the share of the foreign partner, the third splits the profit equally although the capital is not equal, and the fourth is the capital put in by Dhanvantari Foods.`,
}));
Q('mc_wos_lim', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Vega Labs, an imagined drug maker, puts all the capital into a plant in the imagined country of Ostria and owns every share of it. If the plant fails, Vega Labs alone bears the loss. Which limitation of a wholly owned foreign subsidiary does this show?`,
  opts: [`Heavy investment with the whole risk borne by the parent`, `Having to share profits with a local partner`, `Loss of control over quality`, `Dependence on an export house`],
  sol: `Owning everything means putting in all the capital and bearing all the risk. Sharing profit is a feature of a joint venture, loss of control is a worry with licensing and contract manufacturing, and an export house belongs to indirect exporting.`,
}));
Q('mc_lic_lim', mcq({
  t: 1, d: 4, c: 'application',
  stem: `Two years after Orchid Beverages licensed its recipe to Sagar Drinks, an imagined firm abroad, Sagar Drinks begins to sell a similar drink under its own name. Which limitation of licensing does this show?`,
  opts: [`The licensee may learn the know-how and become a competitor`, `The licensor has to invest heavily in a plant abroad`, `The licensor has no income from the arrangement`, `The licensor has full control over the licensee`],
  sol: `A licensee that copies the know-how and sells on its own is the risk of creating a competitor. A licensor does not invest in a plant abroad, it earns a royalty, and it has limited control over the licensee, not full control.`,
}));

// ================================================================ t02 Export and import procedures and documents
Q('mc_proforma', mcq({
  t: 2, d: 2, c: 'application',
  stem: `Harbour Fabrics, an imagined importer in the imagined country of Valmora, asks Kanchan Textiles for the price of cotton sarees. Kanchan Textiles replies with a document that lists the goods, the price and the terms offered, and that does not ask for payment. The document is a`,
  opts: [`proforma invoice`, `commercial invoice`, `bill of lading`, `certificate of origin`],
  sol: `A reply that sets out the goods, price and terms offered, without demanding payment, is a proforma invoice. A commercial invoice is the seller's bill that goes with the shipment, a bill of lading comes from the shipping company, and a certificate of origin names the country where goods were made.`,
}));
Q('mc_indent', mcq({
  t: 2, d: 2, c: 'application',
  stem: `Tarini Engineering, an imagined firm of the imagined town of Ranipur, sends a detailed order for a packaging machine, giving the make, the quantity, the price and the delivery terms. Such an order is called`,
  opts: [`an indent`, `a bill of entry`, `a mate's receipt`, `a proforma invoice`],
  sol: `A detailed order for goods is an indent. A bill of entry is filed with customs, a mate's receipt is given by the ship's officer, and a proforma invoice is the seller's quotation and not the buyer's order.`,
}));
Q('mc_lc_purpose', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Before Kanchan Textiles begins weaving, the bank of Harbour Fabrics undertakes in writing to pay Kanchan Textiles when the shipping documents match the agreed terms. This undertaking is a`,
  opts: [`letter of credit`, `bill of exchange`, `shipping bill`, `packing list`],
  sol: `A bank's written promise to pay the seller against conforming documents is a letter of credit. A bill of exchange is the seller's order to the buyer to pay, a shipping bill goes to customs, and a packing list describes the contents of packages.`,
}));
Q('mc_preship_fin', mcq({
  t: 2, d: 3, c: 'application',
  stem: `On the strength of a confirmed export order of Rs ${fmt(EX.inr)}, Kanchan Textiles borrows Rs ${fmt(EX.pre)} from its bank to buy yarn and pay weavers before the sarees are shipped. This step is`,
  opts: [`obtaining pre-shipment finance`, `securing payment`, `retirement of import documents`, `payment of freight`],
  sol: `Funds borrowed to produce and pack goods before they are shipped are pre-shipment finance. Securing payment comes after shipment, retirement of import documents is an importer's step, and freight is paid to the carrier.`,
}));
Q('mc_coo', mcq({
  t: 2, d: 3, c: 'application',
  stem: `The customs of Valmora charge a lower duty on sarees made in India, and ask Kanchan Textiles for a paper proving where its sarees were made. The paper that Kanchan Textiles must obtain is a`,
  opts: [`certificate of origin`, `mate's receipt`, `bill of entry`, `marine insurance policy`],
  sol: `A paper that proves the country in which goods were made is a certificate of origin. A mate's receipt shows that goods were loaded, a bill of entry is filed by an importer, and a marine insurance policy covers loss in transit.`,
}));
Q('mc_mates', mcq({
  t: 2, d: 3, c: 'application',
  stem: `When the sarees of Kanchan Textiles are loaded on the ship, the captain hands the exporter a receipt that confirms the goods have come on board. This receipt is`,
  opts: [`the mate's receipt`, `the bill of lading`, `the shipping bill`, `the bill of exchange`],
  sol: `The receipt that the ship's captain gives when goods are loaded is the mate's receipt. The bill of lading is issued by the shipping company after freight is paid, the shipping bill goes to customs, and the bill of exchange is an order to pay.`,
}));
Q('mc_bol_airway', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: `Which statement about a bill of lading is correct?`,
  opts: [
    `It is issued by the shipping company after freight is paid, and it serves as a receipt and as a document of title to the goods`,
    `It is issued by customs to allow an importer to clear the goods`,
    `It is the exporter's written order to the importer to pay a sum`,
    `It is a bank's promise to pay the exporter`,
  ],
  sol: `The shipping company issues it after freight is paid, and it acts as a receipt, as evidence of the contract of carriage and as a document of title. For goods sent by air a similar receipt is the airway bill. The other options describe a bill of entry, a bill of exchange and a letter of credit.`,
}));
Q('mc_shipbill_entry', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Kanchan Textiles files a document with customs to obtain permission to export its sarees, and Tarini Engineering files a document with customs to clear its imported machine. The two documents are, in that order,`,
  opts: [`a shipping bill and a bill of entry`, `a bill of entry and a shipping bill`, `a mate's receipt and a bill of lading`, `a packing list and a commercial invoice`],
  sol: `An exporter files a shipping bill and an importer files a bill of entry. The second option reverses them, and the last two pairs are not filed with customs as the main declaration for clearance.`,
}));
Q('mc_landed_cost', mcq({
  t: 2, d: 4, c: 'application',
  stem: `Tarini Engineering buys a machine for ${fmt(IM.machine)} US dollars from Berghof Machines, an imagined foreign maker, and pays ${fmt(IM.fr)} US dollars for freight and insurance. At an imagined rate of Rs ${IM.rate} to one US dollar, it must also pay an imagined customs duty of ${IM.dutyPct} per cent on the total value in rupees. The total cost to Tarini Engineering is`,
  opts: [`Rs ${fmt(IM.landed)}`, `Rs ${fmt(IM.cif)}`, `Rs ${fmt(IM.wrong)}`, `Rs ${fmt(IM.duty)}`],
  sol: `The value in rupees is ${fmt(IM.cifUsd)} times ${IM.rate}, which is Rs ${fmt(IM.cif)}. Duty at ${IM.dutyPct} per cent is Rs ${fmt(IM.duty)}, so the total is Rs ${fmt(IM.landed)}. The second value leaves out the duty, the third takes duty on the machine alone, and the fourth is the duty only.`,
}));
Q('mc_ex_value', mcq({
  t: 2, d: 2, c: 'application',
  stem: `Harbour Fabrics, an imagined importer, orders ${fmt(EX.n)} sarees from Kanchan Textiles at ${EX.usd} US dollars each. At an imagined rate of Rs ${EX.rate} to one US dollar, the value of the order in rupees is`,
  opts: [`Rs ${fmt(EX.inr)}`, `Rs ${fmt(EX.usdTotal)}`, `Rs ${fmt(EX.n * EX.rate)}`, `Rs ${fmt(EX.usd * EX.rate)}`],
  sol: `The order is ${fmt(EX.n)} times ${EX.usd}, which is ${fmt(EX.usdTotal)} US dollars, and at Rs ${EX.rate} each that is Rs ${fmt(EX.inr)}. The second value is the amount in US dollars, the third forgets the price, and the fourth is the price of one saree.`,
}));
Q('mc_retire', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Tarini Engineering pays the bill drawn on it and takes over the shipping documents from its bank so that it can claim the machine. Which step of the import procedure is this?`,
  opts: [`Retirement of import documents`, `Receipt of shipment advice`, `Arranging foreign exchange`, `Placing the order`],
  sol: `Paying or accepting the bill and taking the documents from the bank is the retirement of import documents. Shipment advice is a notice from the exporter, foreign exchange is arranged before the order, and the order is placed before shipping.`,
}));

// ================================================================ t03 The WTO and trade bodies
Q('mc_wto_year', mcq({
  t: 3, d: 2, c: 'recall',
  stem: `The World Trade Organization was established on`,
  opts: [`1 January 1995`, `1 January 1948`, `1 January 1965`, `1 January 2005`],
  sol: `The World Trade Organization began on 1 January 1995. The date 1948 belongs to the General Agreement on Tariffs and Trade, which the Organization succeeded, and the other dates are not linked to either.`,
}));
Q('mc_gatt', mcq({
  t: 3, d: 2, c: 'recall',
  stem: `The World Trade Organization succeeded an earlier arrangement that came into force in 1948. That arrangement was the`,
  opts: [`General Agreement on Tariffs and Trade`, `International Monetary Fund`, `United Nations Conference on Trade and Development`, `International Bank for Reconstruction and Development`],
  sol: `The General Agreement on Tariffs and Trade of 1948 was the forerunner of the World Trade Organization. The other three are separate bodies and were not replaced by it.`,
}));
Q('mc_wto_dispute', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Brenmark, an imagined member country, says that a new tax on its tea by Altavia, another imagined member, breaks agreed trade rules. Talks fail, and Brenmark takes the matter to the World Trade Organization. Which function of the Organization is used?`,
  opts: [`Settling trade disputes between members`, `Giving short-term loans to cover a payments gap`, `Lending for development projects`, `Fixing the exchange rate of a currency`],
  sol: `Using agreed procedures to resolve a complaint between members is dispute settlement. Short-term loans are an International Monetary Fund function, project loans are a World Bank function, and the Organization does not fix exchange rates.`,
}));
Q('mc_wto_objective', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: `Which of the following is an objective of the World Trade Organization?`,
  opts: [`Expanding the trade in goods and services`, `Fixing the prices at which members must sell their exports`, `Financing the building of roads and dams`, `Setting the exchange rate for every currency`],
  sol: `Expanding the trade in goods and services is one of its stated objectives. It does not fix export prices, project finance is the work of the World Bank, and exchange rates are not set by it.`,
}));
Q('mc_imf', mcq({
  t: 3, d: 3, c: 'application',
  stem: `The central bank of Ostria, an imagined country, faces a short-term gap in its payments to the rest of the world. It receives a loan from a body that also works to keep exchange arrangements stable among members. This body is`,
  opts: [`the International Monetary Fund`, `the World Bank`, `the United Nations Conference on Trade and Development`, `the World Trade Organization`],
  sol: `Short-term help for payment gaps and the promotion of exchange stability are the work of the International Monetary Fund. The World Bank lends for development projects, the conference body works on trade and development issues of developing countries, and the Trade Organization deals with trade rules.`,
}));
Q('mc_wb', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: `Which body lends to member countries for reconstruction and development projects?`,
  opts: [`The World Bank (International Bank for Reconstruction and Development)`, `The International Monetary Fund`, `The World Trade Organization`, `The General Agreement on Tariffs and Trade`],
  sol: `Lending for reconstruction and development projects is the work of the World Bank. The International Monetary Fund gives short-term help for payment gaps, the Trade Organization looks after trade rules, and the General Agreement was the older trade arrangement.`,
}));
Q('mc_unctad', mcq({
  t: 3, d: 2, c: 'recall',
  stem: `UNCTAD is the short form of`,
  opts: [`United Nations Conference on Trade and Development`, `United Nations Council for Tariffs and Duties`, `Union of National Chambers for Trade and Development`, `United Nations Committee on Trade and Defence`],
  sol: `UNCTAD stands for the United Nations Conference on Trade and Development, which helps developing countries to gain from trade and investment. The other names do not belong to any such body.`,
}));

// ---- assertion-reason
Q('ar_spec', ar({
  t: 1, d: 3, c: 'understanding', verdict: 'both-true-explains',
  a: `Two countries that differ in resources and in worker productivity can both gain by trading with each other.`,
  r: `Each country can concentrate on the goods it makes at the lower cost and obtain the other goods through trade.`,
  sol: `Both are true. Concentrating on what each makes best raises the total output, and trade then shares the gain, so R explains A.`,
}));
Q('ar_franchise', ar({
  t: 1, d: 4, c: 'analysis', verdict: 'both-true-explains',
  a: `Franchising lets a firm enter a foreign market with little investment of its own.`,
  r: `The local franchisee puts up most of the capital and runs the outlet under the brand and system of the franchiser.`,
  sol: `Both are true. Because the franchisee provides the capital and runs the outlet, the franchiser invests little, so R explains A.`,
}));
Q('ar_jv', ar({
  t: 1, d: 4, c: 'analysis', verdict: 'both-true-not-explains',
  a: `A joint venture lets two firms share the investment and the risk of a foreign project.`,
  r: `Licensing and franchising are also modes of entry into international business.`,
  sol: `Both are true, but the existence of other modes does not explain why a joint venture spreads investment and risk, so R does not explain A.`,
}));
Q('ar_wos', ar({
  t: 1, d: 4, c: 'analysis', verdict: 'A-false-R-true',
  a: `A wholly owned foreign subsidiary gives the parent less control than a licensing agreement does.`,
  r: `In a wholly owned subsidiary the parent firm owns all of the equity capital.`,
  sol: `A is false, because full ownership gives the parent more control than licensing, in which the licensee runs its own operations. R is true, because the parent owns all the equity.`,
}));
Q('ar_lc', ar({
  t: 2, d: 4, c: 'analysis', verdict: 'A-true-R-false',
  a: `A letter of credit protects an exporter against the risk that the importer will not pay.`,
  r: `Under a letter of credit the exporter promises the importer's bank to pay for the goods if the importer fails to do so.`,
  sol: `A is true, because the importer's bank undertakes to pay against conforming documents. R is false, because the promise to pay is made by the bank and not by the exporter.`,
}));
Q('ar_bol_mates', ar({
  t: 2, d: 4, c: 'analysis', verdict: 'both-true-not-explains',
  a: `In the export sequence the mate's receipt is obtained before the bill of lading.`,
  r: `Customs clearance of export goods is done through a shipping bill.`,
  sol: `Both are true, but the use of a shipping bill for customs does not explain why the mate's receipt comes before the bill of lading, so R does not explain A.`,
}));
Q('ar_wto', ar({
  t: 3, d: 3, c: 'understanding', verdict: 'both-true-explains',
  a: `The World Trade Organization helps its members to settle trade disputes.`,
  r: `It provides agreed procedures through which a member can bring a complaint against another member.`,
  sol: `Both are true. The agreed procedures are the means by which the Organization settles disputes, so R explains A.`,
}));

// ---- true-false, fill in the blanks, match, ordering
Q('tf_trade_part', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: `International business covers only the export and import of goods.`,
  sol: `It also covers service exports and imports, licensing and franchising, and foreign investment.`,
}));
Q('tf_lc_order', tf({
  t: 2, d: 3, c: 'application', ans: true,
  stem: `Kanchan Textiles checks the creditworthiness of Harbour Fabrics and secures a letter of credit after it receives the order and before it starts to produce the sarees.`,
  sol: `In the textbook sequence, the exporter checks the credit standing of the importer and secures the letter of credit before production begins.`,
}));
Q('tf_bill_entry', tf({
  t: 2, d: 3, c: 'application', ans: false,
  stem: `Tarini Engineering, the importer of a packaging machine, clears the machine through customs by filing a shipping bill.`,
  sol: `An importer files a bill of entry. A shipping bill is filed by an exporter.`,
}));
Q('tf_india_wto', tf({
  t: 3, d: 2, c: 'recall', ans: true,
  stem: `India is one of the founding members of the World Trade Organization.`,
  sol: `India was a member from the start, when the Organization came into being on 1 January 1995 (as of 2024).`,
}));
Q('fb_contract', fb({
  t: 1, d: 2, c: 'recall',
  stem: `When a firm has another firm abroad make goods to its specification and then sells them under its own name, the mode of entry is called ___ manufacturing.`,
  acc: [['contract']],
  sol: `This is contract manufacturing.`,
}));
Q('fb_docs', fb({
  t: 2, d: 3, c: 'recall',
  stem: `When goods are loaded, the ship's captain issues the ___, and after freight is paid the shipping company issues the ___.`,
  acc: [[`mate's receipt`, `mates receipt`, `mate receipt`], [`bill of lading`]],
  sol: `The mate's receipt comes first, and the bill of lading follows after freight is paid.`,
}));
Q('fb_wto', fb({
  t: 3, d: 2, c: 'recall',
  stem: `The World Trade Organization began work in the year ___ and succeeded the ___.`,
  acc: [['1995'], ['gatt', 'general agreement on tariffs and trade']],
  sol: `It began in 1995 and succeeded the General Agreement on Tariffs and Trade (GATT) of 1948.`,
}));
Q('mt_modes', match({
  t: 1, d: 3, c: 'application',
  stem: `Match each imagined firm with the mode of entry into international business that it uses.`,
  pairs: [
    [`Meera Spices sells cardamom through the export house Rasa Exports`, `Indirect exporting`],
    [`Lumen Apparel has Sutra Garments make its shirts`, `Contract manufacturing`],
    [`Brisk Bites lets a local owner run a cafe under its name and system`, `Franchising`],
    [`Vega Labs owns every share of its plant in Ostria`, `Wholly owned subsidiary`],
  ],
  sol: `Selling through an export house is indirect exporting, having shirts made by another firm is contract manufacturing, letting another party run a cafe under the brand is franchising, and owning every share of a foreign plant is a wholly owned subsidiary.`,
}));
Q('mt_docs', match({
  t: 2, d: 3, c: 'understanding',
  stem: `Match each document with its purpose.`,
  pairs: [
    [`Commercial invoice`, `The seller's bill giving the goods, quantity and price`],
    [`Packing list`, `The details of what is inside each package`],
    [`Certificate of origin`, `Proof of the country where the goods were made`],
    [`Marine insurance policy`, `Cover against loss or damage in transit`],
  ],
  sol: `The invoice is the seller's bill, the packing list shows the contents of each package, the certificate of origin proves where goods were made, and the policy covers loss in transit.`,
}));
Q('mt_bodies', match({
  t: 3, d: 2, c: 'understanding',
  stem: `Match each international body with its main role.`,
  pairs: [
    [`International Monetary Fund`, `Short-term help for payment gaps and exchange stability`],
    [`World Bank`, `Loans for reconstruction and development`],
    [`UNCTAD`, `Helping developing countries to gain from trade and investment`],
    [`World Trade Organization`, `Trade rules, negotiations and settlement of disputes`],
  ],
  sol: `Payment gaps and exchange stability belong to the International Monetary Fund, development loans to the World Bank, support for developing countries to UNCTAD, and trade rules and disputes to the World Trade Organization.`,
}));
Q('od_export_a', ord({
  t: 2, d: 3, c: 'understanding',
  stem: `Arrange these early steps of an export, from the first to the last, in the textbook order.`,
  items: [
    `The exporter replies to an enquiry with a quotation`,
    `The importer places an order, called an indent`,
    `The exporter checks the importer's creditworthiness and obtains a letter of credit`,
    `The exporter obtains pre-shipment finance`,
    `The goods are produced or procured`,
  ],
  sol: `A quotation answers the enquiry, the order follows, then the credit check and letter of credit, then the finance, and then production.`,
}));
Q('od_export_b', ord({
  t: 2, d: 3, c: 'understanding',
  stem: `Arrange these closing steps of an export, from the first to the last, in the textbook order.`,
  items: [
    `Customs clears the goods against a shipping bill`,
    `The ship's captain issues the mate's receipt`,
    `Freight is paid and the bill of lading is issued`,
    `The exporter prepares the invoice`,
    `Payment is secured through documents sent via a bank against a bill of exchange`,
  ],
  sol: `Customs clearance comes first, then the mate's receipt, then freight and the bill of lading, then the invoice, and last the payment through the bank.`,
}));
Q('od_import', ord({
  t: 2, d: 3, c: 'understanding',
  stem: `Arrange these steps of an import, from the first to the last, in the textbook order.`,
  items: [
    `The importer obtains a letter of credit`,
    `The importer receives the shipment advice`,
    `The import documents are retired`,
    `The goods arrive`,
    `Customs clears the goods against a bill of entry and releases them`,
  ],
  sol: `The letter of credit comes before shipment, then the advice, then the retirement of documents, then the arrival of goods, and last the customs clearance and release.`,
}));

// ================================================================ short answers (2 marks)
Q('s2_ib_def', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: `What is international business? Name any two forms in which it is carried on.`,
  model: `International business means business activities, such as manufacturing, trade and investment, that are carried on across the boundaries of countries. Two forms are merchandise exports and imports, and the licensing and franchising of know-how or brands.`,
  sol: `Meaning and two forms.`,
  scheme: [[`Meaning of international business`, 1], [`Two forms named`, 1]],
}));
Q('s2_it_vs_ib', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: `Distinguish international trade from international business.`,
  model: `International trade is the exchange of goods and services between countries, such as exports and imports. International business is wider: it includes trade and also manufacturing abroad, licensing and franchising, and investment in other countries.`,
  sol: `One line on trade and one on the wider scope of business.`,
  scheme: [[`International trade is exchange across borders`, 1], [`International business is wider and includes investment and production`, 1]],
}));
Q('s2_why', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: `State two reasons why countries trade with one another.`,
  model: `Countries differ in natural resources, so one may lack what another has in plenty. They also differ in labour productivity and cost of production, so each gains by specialising in what it makes best and buying the rest.`,
  sol: `Two reasons stated.`,
  scheme: [[`Unequal natural resources`, 1], [`Differences in productivity and cost, with specialisation`, 1]],
}));
Q('s2_nat_benefit', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `Explain any two benefits of international business to a nation.`,
  model: `A nation earns foreign exchange, which it can use to pay for imports. International business also allows a more efficient use of resources and creates growth and jobs, which can raise the standard of living of the people.`,
  sol: `Any two benefits explained.`,
  scheme: [[`First benefit explained`, 1], [`Second benefit explained`, 1]],
}));
Q('s2_contract', short({
  t: 1, d: 4, c: 'application', marks: 2, wl: S2,
  stem: `Lumen Apparel has Sutra Garments, a firm abroad, make its shirts to its own design. Name this mode of entry and state one limitation that Lumen Apparel faces.`,
  model: `The mode is contract manufacturing. One limitation is that Lumen Apparel cannot supervise quality directly, so poor workmanship at Sutra Garments can harm its brand, and its designs may also be copied.`,
  sol: `Mode named and one limitation applied.`,
  scheme: [[`Contract manufacturing named`, 1], [`One limitation stated`, 1]],
}));
Q('s2_jv', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: `What is a joint venture? State one of its merits.`,
  model: `A joint venture is a business that two or more firms, often from different countries, set up together and own jointly. One merit is that the partners share the investment and the risk, and a local partner brings knowledge of the market.`,
  sol: `Meaning and one merit.`,
  scheme: [[`Meaning of a joint venture`, 1], [`One merit`, 1]],
}));
Q('s2_proforma', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: `What is a proforma invoice, and why does an exporter send it?`,
  model: `A proforma invoice is a document that lists the goods, price and terms an exporter offers, and it is not a demand for payment. The exporter sends it in reply to an enquiry, so that the importer can decide whether to place an order.`,
  sol: `Meaning and purpose.`,
  scheme: [[`Meaning of a proforma invoice`, 1], [`Purpose: reply to an enquiry`, 1]],
}));
Q('s2_bol', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: `State any two functions of a bill of lading.`,
  model: `A bill of lading is a receipt that the shipping company gives for the goods it has accepted. It is also evidence of the contract to carry them and a document of title, so the holder can claim the goods at the port of arrival.`,
  sol: `Any two functions stated.`,
  scheme: [[`First function`, 1], [`Second function`, 1]],
}));
Q('s2_ship_entry', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: `Distinguish a shipping bill from a bill of entry.`,
  model: `A shipping bill is filed by an exporter with customs to obtain permission to export the goods. A bill of entry is filed by an importer with customs to obtain clearance of the imported goods and their release from the port.`,
  sol: `One line on each document.`,
  scheme: [[`Shipping bill: exporter, permission to export`, 1], [`Bill of entry: importer, clearance and release`, 1]],
}));
Q('s2_wto_func', short({
  t: 3, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: `State any two functions of the World Trade Organization.`,
  model: `The Organization administers the trade agreements among its members and acts as a forum for trade negotiations. It also settles disputes between members, reviews their trade policies and cooperates with the International Monetary Fund and the World Bank.`,
  sol: `Any two functions stated.`,
  scheme: [[`First function`, 1], [`Second function`, 1]],
}));

// ================================================================ short answers (3 marks)
Q('s3_scope', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: `Explain any three forms in which international business is carried on.`,
  model: `1. Merchandise exports and imports: the shipping of goods to and from other countries.\n2. Service exports and imports: services such as software work or transport sold across borders.\n3. Licensing and franchising: the grant of rights to use know-how or a brand abroad for a fee. Foreign investment is a fourth form.`,
  sol: `Any three forms explained.`,
  scheme: [[`First form`, 1], [`Second form`, 1], [`Third form`, 1]],
}));
Q('s3_firm_benefit', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: `Explain any three benefits of international business to firms.`,
  model: `1. Prospects of higher profits: foreign markets may pay better prices than the home market.\n2. Better capacity utilisation: surplus output can be sold abroad, so plant does not lie idle.\n3. A way out of intense competition at home, and improved business vision from learning about foreign markets.`,
  sol: `Any three benefits explained.`,
  scheme: [[`First benefit`, 1], [`Second benefit`, 1], [`Third benefit`, 1]],
}));
Q('s3_lic_fr', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: `Explain licensing and franchising as modes of entry, with two merits and one limitation of licensing.`,
  model: `In licensing, a firm grants a foreign party the right to use its patent, trademark or know-how for a fee. In franchising, a firm lets a foreign party run a business under its brand and system. Licensing needs little capital and gives quick entry, but the licensee may become a competitor.`,
  sol: `Meaning of both modes, plus merits and a limitation of licensing.`,
  scheme: [[`Licensing and franchising explained`, 1], [`Two merits of licensing`, 1], [`One limitation of licensing`, 1]],
}));
Q('s3_wos_ml', short({
  t: 1, d: 4, c: 'application', marks: 3, wl: S3,
  stem: `Vega Labs, an imagined drug maker, plans to set up a wholly owned subsidiary in Ostria. State one merit and two limitations that it should weigh.`,
  model: `1. Merit: Vega Labs keeps full control over operations, quality and its secret formulas.\n2. Limitation: it must invest heavily in land, plant and staff, and bears all the loss if the plant fails.\n3. Limitation: it is exposed to political and legal risks in Ostria, such as a change of policy.`,
  sol: `One merit and two limitations, each linked to the case.`,
  scheme: [[`Merit: full control`, 1], [`Limitation: heavy investment and risk`, 1], [`Limitation: political and legal risk`, 1]],
}));
Q('s3_docs_case', short({
  t: 2, d: 4, c: 'application', marks: 3, wl: S3,
  stem: `Kanchan Textiles ships its sarees to Harbour Fabrics by sea. Name any three documents that it must prepare or obtain, and state the purpose of each.`,
  model: `1. Commercial invoice: the seller's bill that gives the goods, quantity and price.\n2. Packing list: it shows what is inside each package, for customs and the importer.\n3. Marine insurance policy: it covers the cargo against loss or damage at sea. A bill of lading or a certificate of origin would also do.`,
  sol: `Any three documents with purposes.`,
  scheme: [[`First document and purpose`, 1], [`Second document and purpose`, 1], [`Third document and purpose`, 1]],
}));
Q('s3_wto_benefits', short({
  t: 3, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: `Explain any three benefits that a country gets by being a member of the World Trade Organization.`,
  model: `1. Common rules make trade more predictable, so exporters can plan.\n2. A member can seek settlement of a dispute through agreed procedures, instead of being left to the strength of the other side.\n3. Lower trade barriers bring a wider choice of goods and lower prices, and help trade and incomes to grow.`,
  sol: `Any three benefits explained.`,
  scheme: [[`Predictable common rules`, 1], [`Peaceful settlement of disputes`, 1], [`Lower barriers, choice and growth`, 1]],
}));
Q('s3_bodies', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: `State the main role of the International Monetary Fund, the World Bank and UNCTAD, one line each.`,
  model: `1. The International Monetary Fund promotes monetary cooperation and stable exchange arrangements, and gives short-term help to members with payment gaps.\n2. The World Bank lends to countries for reconstruction and development projects.\n3. UNCTAD helps developing countries to gain from trade and investment.`,
  sol: `One role for each body.`,
  scheme: [[`International Monetary Fund`, 1], [`World Bank`, 1], [`UNCTAD`, 1]],
}));

// ================================================================ long answers
Q('l_benefits', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: `Explain the benefits of international business to nations and to firms.`,
  model: `To nations: 1. It earns foreign exchange, which pays for imports. 2. It allows more efficient use of resources, as each country makes what it makes best. 3. It brings growth and employment, and raises the standard of living.\nTo firms: 4. Prospects of higher profits and better use of capacity, since surplus output finds a foreign buyer. 5. Growth prospects, a way out of intense domestic competition and an improved business vision.`,
  sol: `Three points for nations and two for firms, with explanation.`,
  scheme: [[`Foreign exchange`, 1], [`Efficient use of resources`, 1], [`Growth, employment and standard of living`, 1], [`Higher profits and capacity use`, 1], [`Growth, escape from competition and vision`, 1]],
}));
Q('l_modes', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: `Explain contract manufacturing, joint ventures and wholly owned foreign subsidiaries as modes of entry into international business, stating a merit and a limitation of each.`,
  model: `1. Contract manufacturing: a firm has goods made abroad by another firm to its specification. Merit: low investment and quick entry. Limitation: quality control is hard and secrets may leak.\n2. Joint venture: two firms set up a business together. Merit: shared investment and risk, and local knowledge. Limitation: partners may disagree.\n3. Wholly owned subsidiary: the parent owns all the capital. Merit: full control. Limitation: heavy investment and high risk.`,
  sol: `Three modes explained, with merits and limitations.`,
  scheme: [[`Contract manufacturing explained`, 1], [`Joint venture explained`, 1], [`Wholly owned subsidiary explained`, 1], [`Merits of the three`, 1], [`Limitations of the three`, 1]],
}));
Q('l_export_proc', long({
  t: 2, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: `Describe the steps of the export procedure, from the receipt of an enquiry to the securing of payment.`,
  model: `1. Enquiry and quotation, receipt of the order, checking creditworthiness and securing a letter of credit.\n2. Obtaining the Importer Exporter Code and registering with an export promotion council, then pre-shipment finance and production.\n3. Pre-shipment inspection, certificate of origin, reserving shipping space, packing and insurance.\n4. Customs clearance through a shipping bill, mate's receipt, freight and bill of lading.\n5. Preparing the invoice and securing payment through a bank against a bill of exchange.`,
  sol: `Sixteen steps grouped into five stages.`,
  scheme: [[`Enquiry, order and letter of credit`, 1], [`Code, registration, finance and production`, 1], [`Inspection, origin certificate, space, packing, insurance`, 1], [`Customs, mate's receipt, freight, bill of lading`, 1], [`Invoice and payment`, 1]],
}));
Q('l_import_proc', long({
  t: 2, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: `Describe the steps of the import procedure, from the trade enquiry to the release of the goods.`,
  model: `1. Trade enquiry: the importer asks for quotations from suppliers abroad.\n2. Obtaining the Importer Exporter Code and arranging foreign exchange through a bank.\n3. Placing the order (indent) and obtaining a letter of credit.\n4. Arranging finance, and receiving the shipment advice from the exporter.\n5. Retiring the import documents, receiving the goods on arrival, and clearing customs through a bill of entry, after which the goods are released.`,
  sol: `Ten steps grouped into five stages.`,
  scheme: [[`Trade enquiry`, 1], [`Code and foreign exchange`, 1], [`Order and letter of credit`, 1], [`Finance and shipment advice`, 1], [`Retirement of documents, arrival, customs clearance`, 1]],
}));
Q('l_docs', long({
  t: 2, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: `Explain the purpose of any five documents used in an export or an import.`,
  model: `1. Commercial invoice: the seller's bill giving goods, quantity and price.\n2. Packing list: the contents of each package.\n3. Certificate of origin: it shows where the goods were made, which may decide the duty abroad.\n4. Bill of lading: receipt for the goods, evidence of the contract of carriage and document of title.\n5. Marine insurance policy: cover against loss in transit. Others are the shipping bill, mate's receipt, bill of exchange, letter of credit and bill of entry.`,
  sol: `Any five documents with their purposes.`,
  scheme: [[`First document and purpose`, 1], [`Second document and purpose`, 1], [`Third document and purpose`, 1], [`Fourth document and purpose`, 1], [`Fifth document and purpose`, 1]],
}));
Q('l_wto', long({
  t: 3, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: `Explain the objectives and the functions of the World Trade Organization.`,
  model: `Objectives: 1. Raising living standards and promoting full employment. 2. Expanding the production of and trade in goods and services, using resources in a sustainable way, and helping developing countries to share in the growth of trade.\nFunctions: 3. Administering the trade agreements among members. 4. Providing a forum for negotiations and settling disputes. 5. Reviewing the trade policies of members and cooperating with the International Monetary Fund and the World Bank.`,
  sol: `Two points on objectives and three on functions.`,
  scheme: [[`Living standards and employment`, 1], [`Trade expansion, sustainable use, developing countries`, 1], [`Administering agreements`, 1], [`Negotiation forum and dispute settlement`, 1], [`Policy review and cooperation`, 1]],
}));
Q('l_ex_calc', long({
  t: 2, d: 4, c: 'application', marks: 5, wl: L5,
  stem: `Harbour Fabrics, an imagined importer, orders ${fmt(EX.n)} sarees from Kanchan Textiles at ${EX.usd} US dollars each. At an imagined rate of Rs ${EX.rate} to one US dollar, find the order value in rupees, the pre-shipment finance of ${EX.prePct} per cent of that value, and the profit over a cost of Rs ${fmt(EX.cost)} a saree. Name the document by which Kanchan Textiles obtains customs clearance.`,
  model: `1. The order is ${fmt(EX.n)} sarees times ${EX.usd} US dollars, which is ${fmt(EX.usdTotal)} US dollars.\n2. At Rs ${EX.rate} to one US dollar, the order is worth Rs ${fmt(EX.inr)}.\n3. Pre-shipment finance is ${EX.prePct} per cent of that value, which is Rs ${fmt(EX.pre)}, lent by the bank before shipment.\n4. The cost is ${fmt(EX.n)} times Rs ${fmt(EX.cost)}, which is Rs ${fmt(EX.costTot)}, so the profit is Rs ${fmt(EX.margin)}.\n5. Customs clearance of the goods is obtained by filing a shipping bill.`,
  sol: `Order value, finance, profit and the document.`,
  scheme: [[`Order Rs ${fmt(EX.inr)}`, 1], [`Finance Rs ${fmt(EX.pre)}`, 1], [`Cost Rs ${fmt(EX.costTot)}`, 1], [`Profit Rs ${fmt(EX.margin)}`, 1], [`Shipping bill named`, 1]],
}));

// ================================================================ case-based
Q('cb_kanchan', caseQ({
  t: [1, 2], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined exporter and importer.)*`,
  passage: `**Kanchan Textiles (imagined), a maker of cotton sarees in the imagined town of Sutrapur**\n\nHarbour Fabrics, an imagined importer in the imagined country of Valmora, asks Kanchan Textiles for the price of ${fmt(EX.n)} sarees. Kanchan Textiles sends a quotation at ${EX.usd} US dollars a saree. After the order arrives, it asks Harbour Fabrics to have its bank open a letter of credit. It then borrows ${EX.prePct} per cent of the order value from its own bank to buy yarn. Its looms can make ${fmt(EX.cap)} sarees a month and it sells ${fmt(EX.dom)} at home. Take an imagined rate of Rs ${EX.rate} to one US dollar.`,
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'application', stem: `The quotation that Kanchan Textiles sends in reply to the enquiry is known as a`, opts: [`proforma invoice`, `bill of lading`, `bill of entry`, `mate's receipt`], sol: `A quotation that lists goods, price and terms in reply to an enquiry is a proforma invoice. A bill of lading comes from the shipping company, a bill of entry is an importer's filing, and a mate's receipt is given by the ship's officer.` })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: `Quote the line that shows how Kanchan Textiles protects itself against the risk of non-payment.`, model: `"**asks Harbour Fabrics to have its bank open a letter of credit**": the bank's promise to pay protects the exporter.`, sol: `The line on the letter of credit.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: [1, 2], d: 4, c: 'application', marks: 2, stem: `**Either** (i): Find the value of the order in US dollars and in rupees.`, model: `The order is ${fmt(EX.n)} sarees at ${EX.usd} US dollars, which is ${fmt(EX.usdTotal)} US dollars. At Rs ${EX.rate} to one US dollar this is Rs ${fmt(EX.inr)}.`, sol: `Value in two currencies.`, scheme: [[`${fmt(EX.usdTotal)} US dollars`, 1], [`Rs ${fmt(EX.inr)}`, 1]] }), [
      short({ t: 1, d: 4, c: 'application', marks: 2, stem: `**Or** (ii): Find the share of its capacity that Kanchan Textiles uses before and after the order.`, model: `Before the order it sells ${fmt(EX.dom)} of ${fmt(EX.cap)}, which is ${EX.util0} per cent. With ${fmt(EX.n)} more sarees it makes ${fmt(EX.dom + EX.n)}, which is ${EX.util1} per cent of capacity.`, sol: `Two percentages.`, scheme: [[`${EX.util0} per cent before`, 1], [`${EX.util1} per cent after`, 1]] }),
    ]),
  ],
}));
Q('cb_meera', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined spice exporter.)*`,
  passage: `**Meera Spices (imagined), a spice firm of the imagined town of Elapur**\n\nMeera Spices sells its cardamom abroad through Rasa Exports, an imagined export house in the same country. Rasa Exports finds the buyers and handles the shipping papers, and charges ${EH.pct} per cent commission on a consignment of Rs ${fmt(EH.cons)}. The owner, Meera, now wishes to find foreign wholesalers herself and ship directly. She has no overseas office and does not want to invest in one.`,
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'application', stem: `At present Meera Spices is engaged in`, opts: [`indirect exporting`, `direct exporting`, `licensing`, `a joint venture`], sol: `Selling through an export house in its own country is indirect exporting. Direct exporting is what Meera plans next, and licensing and a joint venture do not appear in the passage.` })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: `Quote the line that shows a service that the export house performs for Meera Spices.`, model: `"**finds the buyers and handles the shipping papers**": the export house does the work of selling abroad.`, sol: `The line on buyers and papers.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: 1, d: 4, c: 'application', marks: 2, stem: `**Either** (i): Find the commission of the export house on one consignment and the amount left to Meera Spices.`, model: `The commission is ${EH.pct} per cent of Rs ${fmt(EH.cons)}, which is Rs ${fmt(EH.comm)}. The amount left to Meera Spices is Rs ${fmt(EH.net)}.`, sol: `Commission and balance.`, scheme: [[`Commission Rs ${fmt(EH.comm)}`, 1], [`Balance Rs ${fmt(EH.net)}`, 1]] }), [
      short({ t: 1, d: 3, c: 'understanding', marks: 2, stem: `**Or** (ii): State one merit and one limitation of exporting as a mode of entry.`, model: `A merit is that exporting needs little investment and carries less risk than setting up a plant abroad. A limitation is that transport costs and trade barriers such as duties can reduce the profit.`, sol: `A merit and a limitation.`, scheme: [[`One merit`, 1], [`One limitation`, 1]] }),
    ]),
  ],
}));
Q('cb_tarini', caseQ({
  t: 2, d: 4, c: 'application', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined importer and imagined foreign maker.)*`,
  passage: `**Tarini Engineering (imagined), a packaging firm of the imagined town of Ranipur**\n\nTarini Engineering wants a packaging machine from Berghof Machines, an imagined maker abroad. After a trade enquiry, it obtains its Importer Exporter Code and arranges foreign exchange through its bank. It places an order and has a letter of credit opened. The machine costs ${fmt(IM.machine)} US dollars and freight and insurance add ${fmt(IM.fr)} US dollars. When the goods arrive, Tarini Engineering pays its bank and takes over the shipping documents. Take an imagined rate of Rs ${IM.rate} to one US dollar and an imagined customs duty of ${IM.dutyPct} per cent of the value in rupees.`,
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'application', stem: `To clear the machine through customs, Tarini Engineering files a`, opts: [`bill of entry`, `shipping bill`, `mate's receipt`, `certificate of origin`], sol: `An importer files a bill of entry to clear imported goods. A shipping bill is filed by an exporter, a mate's receipt is given by the ship's officer, and a certificate of origin proves where goods were made.` })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: `Quote the line that shows the retirement of import documents.`, model: `"**pays its bank and takes over the shipping documents**": this is the retirement of import documents.`, sol: `The line on paying the bank and taking the documents.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: 2, d: 4, c: 'application', marks: 2, stem: `**Either** (i): Find the value of machine, freight and insurance in rupees, and the total cost after the customs duty.`, model: `The value is ${fmt(IM.cifUsd)} US dollars at Rs ${IM.rate}, which is Rs ${fmt(IM.cif)}. Duty at ${IM.dutyPct} per cent is Rs ${fmt(IM.duty)}, so the total cost is Rs ${fmt(IM.landed)}.`, sol: `Value, duty and total.`, scheme: [[`Value Rs ${fmt(IM.cif)} and duty Rs ${fmt(IM.duty)}`, 1], [`Total Rs ${fmt(IM.landed)}`, 1]] }), [
      short({ t: 2, d: 3, c: 'application', marks: 2, stem: `**Or** (ii): Name two steps of the import procedure shown in the passage that come before the order is placed, other than the trade enquiry.`, model: `The first is obtaining the Importer Exporter Code. The second is arranging foreign exchange through the bank, so that the price can be paid in foreign currency.`, sol: `Two steps before the order.`, scheme: [[`Importer Exporter Code`, 1], [`Arranging foreign exchange`, 1]] }),
    ]),
  ],
}));
Q('cb_suryakiran', caseQ({
  t: 1, d: 4, c: 'application', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined Indian firm and imagined foreign firm.)*`,
  passage: `**Suryakiran Solar (imagined), a firm of the imagined city of Dhanapur**\n\nSuryakiran Solar and Nordvik Panels, an imagined firm of the imagined country of Fjorland, set up a new company to make solar panels in Dhanapur. The plant costs Rs ${fmt(J2.cost)}, and the two firms put in capital in the ratio ${J2.a} to ${J2.b}. They share profits in the same ratio. In the first year they quarrel over where to build the second plant, because each partner wants its own choice.`,
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'application', stem: `The mode of entry used by the two firms is`, opts: [`a joint venture`, `contract manufacturing`, `a wholly owned subsidiary`, `indirect exporting`], sol: `A company set up and owned together by two firms is a joint venture. Contract manufacturing is a made-to-order arrangement, a wholly owned subsidiary has a single owner, and indirect exporting uses an intermediary.` })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: `Quote the line that shows a limitation of a joint venture.`, model: `"**they quarrel over where to build the second plant**": partners may disagree on decisions.`, sol: `The line on the quarrel.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: 1, d: 4, c: 'application', marks: 2, stem: `**Either** (i): Find the capital put in by each firm and the share of each in a first-year profit of Rs ${fmt(J2.profit)}.`, model: `Suryakiran Solar puts in ${J2.a} per cent, which is Rs ${fmt(J2.aCap)}, and Nordvik Panels puts in Rs ${fmt(J2.bCap)}. Of the profit, Suryakiran Solar gets Rs ${fmt(J2.aProfit)} and Nordvik Panels gets Rs ${fmt(J2.bProfit)}.`, sol: `Capital and profit of each.`, scheme: [[`Capital Rs ${fmt(J2.aCap)} and Rs ${fmt(J2.bCap)}`, 1], [`Profit Rs ${fmt(J2.aProfit)} and Rs ${fmt(J2.bProfit)}`, 1]] }), [
      short({ t: 1, d: 3, c: 'application', marks: 2, stem: `**Or** (ii): Name one merit of a joint venture shown by the passage, and one that it may bring to Suryakiran Solar.`, model: `The passage shows that the two firms share the cost of the plant, so each bears only part of the investment and the risk. A foreign partner may also bring technology and a market abroad to Suryakiran Solar.`, sol: `Two merits.`, scheme: [[`Shared investment and risk`, 1], [`A further merit such as technology or market access`, 1]] }),
    ]),
  ],
}));
Q('cb_wto', caseQ({
  t: 3, d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined member countries.)*`,
  passage: `**Brenmark and Altavia (imagined member countries of the World Trade Organization)**\n\nBrenmark, an imagined tea-growing country, says that a new tax on its tea by Altavia, another imagined member, breaks the agreed rules. After talks fail, Brenmark brings its complaint to the World Trade Organization, which follows its agreed procedure. Members also examine the trade policies of Altavia at regular reviews. Brenmark is a developing country and wants to expand its trade.`,
  parts: [
    child('a', mcq({ t: 3, d: 2, c: 'application', stem: `By bringing its complaint to the Organization, Brenmark uses its function of`, opts: [`settling trade disputes`, `lending for development projects`, `giving short-term loans to cover a payments gap`, `fixing exchange rates`], sol: `Using agreed procedures to resolve a complaint is dispute settlement. Development loans are a World Bank function, short-term loans are an International Monetary Fund function, and the Organization does not fix exchange rates.` })),
    child('b', short({ t: 3, d: 3, c: 'application', marks: 1, stem: `Quote the line that shows the function of reviewing trade policies.`, model: `"**Members also examine the trade policies of Altavia at regular reviews**": this is the review of trade policies.`, sol: `The line on regular reviews.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: 3, d: 3, c: 'application', marks: 2, stem: `**Either** (i): State two objectives of the World Trade Organization that suit the wish of Brenmark.`, model: `One objective is to expand the trade in goods and services, which helps Brenmark to sell more tea. Another is to help developing countries to secure a share in the growth of international trade.`, sol: `Two objectives.`, scheme: [[`Expanding trade in goods and services`, 1], [`Helping developing countries to share in trade growth`, 1]] }), [
      short({ t: 3, d: 3, c: 'application', marks: 2, stem: `**Or** (ii): State two benefits that a member such as Brenmark gets from the common rules of the Organization.`, model: `The common rules make trade more predictable, so tea growers can plan their exports. They also give Brenmark a settled way to bring a complaint, instead of leaving the matter to the strength of the other side.`, sol: `Two benefits.`, scheme: [[`Predictable rules`, 1], [`A settled way to bring complaints`, 1]] }),
    ]),
  ],
}));
