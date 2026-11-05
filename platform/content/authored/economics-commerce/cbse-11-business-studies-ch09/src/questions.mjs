// CBSE 11 Business Studies, ch09 Internal Trade: question bank. Every firm, trader and figure is imagined and written by
// SOYL; no NCERT example, exercise or board/sample-paper item is reused (D-036). Every goods and services tax computation
// uses an explicitly imagined rate; no real rate slab is stated anywhere.
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
// Raju, an imagined fruit hawker (Rs).
export const RAJU = { crates: 6, kgPer: 20, cost: 800, soldKg: 100, price: 60 };
RAJU.kg = RAJU.crates * RAJU.kgPer; // 120
RAJU.buy = RAJU.crates * RAJU.cost; // 4,800
RAJU.rev = RAJU.soldKg * RAJU.price; // 6,000
RAJU.gain = RAJU.rev - RAJU.buy; // 1,200
// Notebooks through an imagined wholesaler (Lakshmi Wholesalers) and retailer (Kiran Stationers) (Rs).
export const NB = { n: 5000, mfr: 40, whole: 46, retail: 55, buy: 500 };
NB.wsCost = NB.n * NB.mfr; // 200,000
NB.wsRev = NB.n * NB.whole; // 230,000
NB.wsMargin = NB.wsRev - NB.wsCost; // 30,000
NB.rtCost = NB.buy * NB.whole; // 23,000
NB.rtRev = NB.buy * NB.retail; // 27,500
NB.rtMargin = NB.rtRev - NB.rtCost; // 4,500
// Charan Footwear, an imagined chain of shoe shops (Rs).
export const CH = { stores: 40, pairs: 60, solo: 700, bulk: 640, price: 1200 };
CH.total = CH.stores * CH.pairs; // 2,400
CH.soloCost = CH.total * CH.solo; // 1,680,000
CH.bulkCost = CH.total * CH.bulk; // 1,536,000
CH.saving = CH.soloCost - CH.bulkCost; // 144,000
CH.perPair = CH.solo - CH.bulk; // 60
// Mahanagar Emporium, an imagined departmental store: sales by department in a month (Rs).
export const DS = { groc: 2000000, app: 1600000, elec: 3200000, home: 1200000 };
DS.total = DS.groc + DS.app + DS.elec + DS.home; // 8,000,000
DS.elecPct = (DS.elec * 100) / DS.total; // 40
DS.homePct = (DS.home * 100) / DS.total; // 15
// Devadaru Woodcraft's imagined goods and services tax chain at an imagined rate (Rs).
export const GS = { rate: 8, base0: 40000, s1: 70000, s2: 90000, s3: 120000 };
const tx = (v) => (v * GS.rate) / 100;
GS.in0 = tx(GS.base0); // 3,200 tax paid by the maker on timber
GS.out1 = tx(GS.s1); // 5,600
GS.pay1 = GS.out1 - GS.in0; // 2,400
GS.out2 = tx(GS.s2); // 7,200
GS.pay2 = GS.out2 - GS.out1; // 1,600
GS.out3 = tx(GS.s3); // 9,600
GS.pay3 = GS.out3 - GS.out2; // 2,400
GS.govt = GS.in0 + GS.pay1 + GS.pay2 + GS.pay3; // 9,600
GS.consumer = GS.s3 + GS.out3; // 129,600
GS.noCredit = GS.out1 + GS.out2 + GS.out3; // 22,400
GS.withCredit = GS.pay1 + GS.pay2 + GS.pay3; // 6,400
// A sale inside one state and a sale between states at the same imagined rate (Rs).
export const IM = { value: 50000, rate: 8 };
IM.tax = (IM.value * IM.rate) / 100; // 4,000
IM.half = IM.tax / 2; // 2,000
IM.halfRate = IM.rate / 2; // 4
if (RAJU.kg !== 120 || RAJU.buy !== 4800 || RAJU.rev !== 6000 || RAJU.gain !== 1200 ||
  NB.wsMargin !== 30000 || NB.rtCost !== 23000 || NB.rtRev !== 27500 || NB.rtMargin !== 4500 ||
  CH.total !== 2400 || CH.soloCost !== 1680000 || CH.bulkCost !== 1536000 || CH.saving !== 144000 ||
  DS.total !== 8000000 || DS.elecPct !== 40 || DS.homePct !== 15 ||
  GS.in0 !== 3200 || GS.out1 !== 5600 || GS.pay1 !== 2400 || GS.out2 !== 7200 || GS.pay2 !== 1600 || GS.out3 !== 9600 || GS.pay3 !== 2400 ||
  GS.govt !== 9600 || GS.govt !== (GS.s3 * GS.rate) / 100 || GS.consumer !== 129600 || GS.noCredit !== 22400 || GS.withCredit !== 6400 ||
  IM.tax !== 4000 || IM.half !== 2000 || IM.halfRate !== 4) throw new Error('figure check failed');

// ================================================================ t01 Wholesale and retail trade
Q('mc_trade_def', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Which statement best describes internal trade?`,
  opts: [
    `The buying and selling of goods and services within the boundaries of one country`,
    `The buying and selling of goods and services between two or more countries`,
    `The making of goods in a factory for the use of the maker`,
    `The carrying of goods from one town to another by road or rail`,
  ],
  sol: `Internal trade is trade inside a country, and it has a wholesale part and a retail part. Trade between countries is international trade, making goods is production, and carrying them is transport, which only helps trade.`,
}));
Q('mc_ws_id', mcq({
  t: 1, d: 2, c: 'application',
  stem: `Lakshmi Wholesalers, an imagined firm in the imagined city of Tarapur, buys ${fmt(NB.n)} notebooks from a manufacturer and sells them in lots to shop-owners across the city. Its activity is`,
  opts: [`wholesale trade`, `retail trade`, `international trade`, `peddling`],
  sol: `Buying in bulk from a producer and selling to retailers is wholesale trade. Retail trade means selling to final consumers, nothing here crosses a border, and a peddler carries goods from place to place to consumers.`,
}));
Q('mc_retail_id', mcq({
  t: 1, d: 2, c: 'application',
  stem: `Kiran Stationers, an imagined shop in Tarapur, buys ${fmt(NB.buy)} notebooks from a wholesaler and sells them a few at a time to students and families. Kiran Stationers is engaged in`,
  opts: [`retail trade`, `wholesale trade`, `export trade`, `the work of a manufacturer`],
  sol: `Selling in small quantities to final consumers is retail trade. A wholesaler sells in lots to retailers, no goods are sent abroad, and the shop makes nothing.`,
}));
Q('mc_risk', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Lakshmi Wholesalers keeps the notebooks of a manufacturer in its own godown. If the price of paper falls or damp spoils some stock, the loss is borne by Lakshmi Wholesalers and not by the manufacturer. Which service to the manufacturer does this show?`,
  opts: [`Bearing risk`, `Financial assistance`, `Expert advice`, `Help in marketing`],
  sol: `Taking over the risk of price fall, damage and spoilage is the service of bearing risk. Financial assistance means paying in advance or giving funds, expert advice means telling the maker about the market, and help in marketing means selling on its behalf.`,
}));
Q('mc_credit', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Kiran Stationers pays Lakshmi Wholesalers thirty days after the notebooks are delivered. Which service of the wholesaler to the retailer does this show?`,
  opts: [`Grant of credit`, `Risk sharing`, `Specialised knowledge`, `Marketing support`],
  sol: `Letting the retailer pay later is the grant of credit. Risk sharing is about bearing the loss of price falls and spoilage, specialised knowledge is about expert advice on products, and marketing support is about advertising and schemes.`,
}));
Q('mc_info', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Sahil Stores, an imagined shop in the imagined town of Pindra, tells a customer about a newly launched pressure cooker and shows how it works before the customer buys. Which service of a retailer to consumers is this?`,
  opts: [`Giving information on new products`, `After-sales service`, `Credit facility`, `A wide selection of goods`],
  sol: `Telling buyers about a new product and how it works is the service of information on new products. After-sales service comes after the purchase, credit lets the buyer pay later, and a wide selection means many brands and sizes.`,
}));
Q('mc_marketinfo', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Kiran Stationers notes which sizes and covers students ask for most and passes this to Lakshmi Wholesalers, who tells the manufacturer. Which service of a retailer to the producer and wholesaler is this?`,
  opts: [`Collecting market information`, `Personal selling`, `Distribution of goods`, `Grant of credit`],
  sol: `Reporting what buyers want is the service of collecting market information. Personal selling is face-to-face persuasion, distribution is making goods reach buyers, and grant of credit is a service of the wholesaler.`,
}));
Q('mc_continuity', mcq({
  t: 1, d: 4, c: 'application',
  stem: `Tarapur Notebooks, an imagined manufacturer, sells its whole output to wholesalers all year, so its mills run even in months when schools are shut and few students buy. Which service of wholesalers to manufacturers explains this?`,
  opts: [`Continuity of production`, `Financial assistance`, `Expert advice`, `Personal selling`],
  sol: `Wholesalers keep buying and storing stock, so the mills need not stop in slack months, which is continuity of production. Financial assistance is about funds, expert advice is about market knowledge, and personal selling is a retailer's service.`,
}));
Q('mc_ws_feature', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: `Which feature belongs to wholesale trade and not to retail trade?`,
  opts: [
    `It deals in large quantities and sells mainly to retailers or industrial users`,
    `It sells mainly to final consumers for their own use`,
    `It needs a shop front in a busy market to attract casual buyers`,
    `It deals in small quantities of many items`,
  ],
  sol: `Bulk dealing with retailers and industrial users marks wholesale trade. The other three options describe retail trade, which serves final consumers in small quantities and relies on location and display.`,
}));
Q('mc_nb_margin', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Lakshmi Wholesalers buys ${fmt(NB.n)} notebooks at Rs ${NB.mfr} each and sells them to retailers at Rs ${NB.whole} each. Its margin on the whole lot is`,
  opts: [`Rs ${fmt(NB.wsMargin)}`, `Rs ${NB.whole - NB.mfr}`, `Rs ${fmt(NB.wsRev)}`, `Rs ${fmt(NB.wsCost)}`],
  sol: `The margin per notebook is Rs ${NB.whole - NB.mfr} and for ${fmt(NB.n)} notebooks it is Rs ${fmt(NB.wsMargin)}. The second value is the margin on one notebook only, the third is the sales value, and the fourth is the purchase cost.`,
}));

// ================================================================ t02 Types of retail trade
Q('mc_hawker', mcq({
  t: 2, d: 2, c: 'application',
  stem: `Raju, an imagined fruit seller of the imagined town of Pindra, pushes a handcart of fruit through the lanes of the town and calls out to buyers. He has no shop. He is`,
  opts: [`an itinerant retailer of the hawker type`, `a small-scale retailer with a fixed shop`, `a large-scale retailer`, `a wholesaler`],
  sol: `A retailer who moves with the goods and has no fixed place of business is itinerant, and a seller who goes through lanes with a cart is a hawker. He has no fixed shop, he sells in small quantities and is not a large store, and he sells to households and not to retailers.`,
}));
Q('mc_market_trader', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Nandini, an imagined potter, sells earthen pots in the weekly market of one village on Monday, in another village on Wednesday and in a third on Saturday. She is a`,
  opts: [`market trader`, `cheap jack`, `single-line store owner`, `departmental store owner`],
  sol: `A retailer who visits periodic markets on fixed days is a market trader. A cheap jack has a semi-permanent shop that moves between localities, a single-line store is a fixed shop, and a departmental store is a large fixed store.`,
}));
Q('mc_cheapjack', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Hari runs a small semi-permanent shop of plastic goods in one locality of the imagined town of Madhugram. When buyers there become few he packs up and sets up in another locality. Such a retailer is called a`,
  opts: [`cheap jack`, `general store owner`, `chain store manager`, `specialty shop owner`],
  sol: `A small trader whose shop shifts from locality to locality as demand changes is a cheap jack. A general store, a chain store and a specialty shop all stay where they are.`,
}));
Q('mc_singleline', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Harsha Shoe Corner, an imagined shop in Madhugram, sells only footwear in many makes and sizes and nothing else. Such a shop is a`,
  opts: [`single-line store`, `departmental store`, `chain store`, `second-hand goods shop`],
  sol: `A shop that deals in one line of goods is a single-line store. A departmental store sells many lines, a chain store is one of many identical shops, and a second-hand goods shop deals in used articles.`,
}));
Q('mc_dept_id', mcq({
  t: 2, d: 2, c: 'application',
  stem: `Mahanagar Emporium, an imagined store in the imagined city of Ratnapur, has separate sections for groceries, apparel, electronics and home goods under one roof in the city centre, and its head office does all the buying. This is a`,
  opts: [`departmental store`, `chain store`, `market trader`, `hawker`],
  sol: `Many departments under one roof with central purchasing mark a departmental store. A chain store has many identical shops in different localities, and a market trader and a hawker have no store at all.`,
}));
Q('mc_chain_id', mcq({
  t: 2, d: 2, c: 'application',
  stem: `Charan Footwear, an imagined firm, owns ${CH.stores} identical shoe shops in different localities. One head office buys the stock for all of them, and every shop sells at the same price. These shops form a`,
  opts: [`chain store (multiple shops)`, `departmental store`, `group of cheap jacks`, `shopping mall`],
  sol: `Identical shops in many localities under one owner, with central buying and fixed prices, make a chain store. A departmental store is one big store with many departments, cheap jacks shift their shops, and a mall houses many separate shops.`,
}));
Q('mc_chain_merit', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Charan Footwear buys ${CH.pairs} pairs for each of its ${CH.stores} shops in one order and gets each pair at Rs ${CH.bulk} instead of Rs ${CH.solo}. Which merit of chain stores does this show?`,
  opts: [`Economies of bulk buying through central purchasing`, `Personal attention to each customer`, `Freedom of each shop to choose its own stock`, `Wide variety of goods under one roof`],
  sol: `A lower price for a very large combined order is an economy of bulk buying. The other options are not shown: each shop gets stock chosen centrally, and the chain deals in a narrow range of goods.`,
}));
Q('mc_dept_lim', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Mahanagar Emporium charges more for many goods than the lane shops around Ratnapur, because rent in the city centre and the wages of its large staff are heavy. Which limitation of departmental stores does this show?`,
  opts: [`High operating expenses that push up prices`, `A narrow range of goods`, `No scope for centralised buying`, `A fixed place that moves with demand`],
  sol: `Heavy rent and staff costs that lead to higher prices are the limitation of high operating expenses. A departmental store has a wide range, buys centrally and stays in one place.`,
}));
Q('mc_chain_lim', mcq({
  t: 2, d: 4, c: 'application',
  stem: `The manager of one Charan Footwear shop in a small hill town finds that buyers there want warm boots, but the head office sends the same stock to every shop and the manager cannot change the order. Which limitation of chain stores does this show?`,
  opts: [`Little freedom for the local shop to meet local needs`, `High rent in a central market`, `A wide range of goods under one roof`, `Heavy dependence on credit sales`],
  sol: `Fixed central decisions leave a shop with little freedom to meet local needs, which is a limitation of chain stores. Rent, range and credit are not the problem described.`,
}));
Q('mc_dept_share', mcq({
  t: 2, d: 3, c: 'application',
  stem: `In one month Mahanagar Emporium sold goods worth Rs ${fmt(DS.total)} in all, of which electronics accounted for Rs ${fmt(DS.elec)}. The share of the electronics department in the sales was`,
  opts: [`${DS.elecPct} per cent`, `${DS.elecPct / 2} per cent`, `${DS.elecPct * 2} per cent`, `${DS.homePct} per cent`],
  sol: `Rs ${fmt(DS.elec)} out of Rs ${fmt(DS.total)} is ${DS.elecPct} per cent. Half of that, double that and the share of the home goods department are all different figures.`,
}));
Q('mc_dept_chain_loc', mcq({
  t: 2, d: 4, c: 'understanding',
  stem: `Which statement correctly distinguishes a departmental store from a chain store?`,
  opts: [
    `A departmental store is one large store at a central place with many lines of goods, while a chain store is a set of similar shops spread over many localities`,
    `A departmental store has many branches in different localities, while a chain store is one large store at a central place`,
    `A departmental store deals in one line only, while a chain store has many departments under one roof`,
    `A departmental store is run by itinerant sellers, while a chain store is run by cooperatives only`,
  ],
  sol: `The first option gives the correct contrast in location and range. The second reverses the two, the third swaps the ranges, and the fourth is wrong about the owners of both kinds of store.`,
}));
Q('mc_mall', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: `A shopping mall is best described as`,
  opts: [
    `a large complex with many retail shops, often with food courts and entertainment, under one roof`,
    `one shop whose departments are all run by a single owner`,
    `an open-air market held on fixed days in different villages`,
    `a machine that gives goods against coins`,
  ],
  sol: `A mall brings many separate shops and amusements together in one building. A single owner with many departments is a departmental store, a periodic market is held in the open, and a machine that gives goods is a vending machine.`,
}));

// ================================================================ t03 GST and its features
Q('mc_gst_def', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: `Goods and services tax is best described as`,
  opts: [
    `an indirect tax on the supply of goods and services`,
    `a direct tax on the income of persons`,
    `a tax on the land and buildings that a firm owns`,
    `a fee paid for registering a firm`,
  ],
  sol: `Goods and services tax is charged on the supply of goods and services and is passed on to the buyer, so it is indirect. Income tax is a direct tax, property tax falls on land and buildings, and a registration fee is not a tax on supply.`,
}));
Q('mc_gst_intro', mcq({
  t: 3, d: 2, c: 'recall',
  stem: `Goods and services tax came into force in India on`,
  opts: [
    `1 July 2017, through the Constitution (101st Amendment) Act 2016`,
    `1 July 2007, through the Constitution (101st Amendment) Act 2016`,
    `1 July 2017, through a rule made by one state government alone`,
    `26 January 1950, through the original Constitution`,
  ],
  sol: `The date is 1 July 2017 and the route is the 101st Amendment of the Constitution passed in 2016. The second option has the wrong year, the third wrongly says that one state made it, and the original Constitution did not create it.`,
}));
Q('mc_dest', mcq({
  t: 3, d: 3, c: 'application',
  stem: `A bed is made in a factory of the imagined state of Kolpur and sold to a family in the imagined state of Himapur, where it is used. Under the destination-based feature, the state share of the tax goes to`,
  opts: [`Himapur, where the bed is consumed`, `Kolpur, where the bed was made`, `both states in equal parts`, `neither state`],
  sol: `A destination-based tax accrues to the place of consumption, which is Himapur. The state of making does not get the share merely because the goods were made there, and the share is not divided equally by default.`,
}));
Q('mc_cgst', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Tilak Cycles, an imagined maker in the imagined state of Kolpur, sells a cycle to a dealer in the same state. The goods and services taxes charged on this supply are`,
  opts: [`central and state goods and services tax`, `integrated goods and services tax only`, `central and integrated goods and services tax`, `state and integrated goods and services tax`],
  sol: `A supply within one state bears central tax and state tax together. Integrated tax is charged on supplies between states and on imports, so the other options mix it in wrongly.`,
}));
Q('mc_igst', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Pankaj Pottery, an imagined firm in the imagined state of Kolpur, sells a consignment of pots to a wholesaler in the imagined state of Himapur. The tax charged on this supply is`,
  opts: [`integrated goods and services tax`, `central and state goods and services tax`, `state goods and services tax only`, `no goods and services tax`],
  sol: `A supply between two states is charged integrated tax. Central and state tax together apply within a state, state tax alone is not charged on a supply between states, and the sale is not exempt.`,
}));
Q('mc_itc_calc', mcq({
  t: 3, d: 3, c: 'application',
  stem: `At an imagined goods and services tax rate of ${GS.rate} per cent, Devadaru Woodcraft pays Rs ${fmt(GS.in0)} of tax on its timber and collects Rs ${fmt(GS.out1)} of tax on the furniture it sells. After claiming input tax credit, the tax it must pay to the government is`,
  opts: [`Rs ${fmt(GS.pay1)}`, `Rs ${fmt(GS.out1)}`, `Rs ${fmt(GS.in0)}`, `Rs ${fmt(GS.out1 + GS.in0)}`],
  sol: `The firm pays Rs ${fmt(GS.out1)} less the credit of Rs ${fmt(GS.in0)}, which is Rs ${fmt(GS.pay1)}. The second value ignores the credit, the third is the tax paid on timber, and the fourth wrongly adds the two.`,
}));
Q('mc_council', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: `The Goods and Services Tax Council is`,
  opts: [
    `a body of Union and state ministers that recommends rates and rules`,
    `a court that tries traders who evade tax`,
    `a bank that collects tax from consumers`,
    `a committee of traders that sets prices of goods`,
  ],
  sol: `The Council is made up of Union and state ministers and recommends rates and rules. It is not a court, a bank or a committee of traders.`,
}));
Q('mc_cascade', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: `The feature that prevents tax from being charged on tax at each stage of a supply chain is`,
  opts: [`input tax credit`, `the destination-based nature of the tax`, `the threshold for registration`, `the setting up of a council`],
  sol: `Input tax credit lets a trader deduct tax paid on purchases from tax due on sales, which stops tax on tax. The place where the tax accrues, the registration threshold and the council do not remove cascading.`,
}));

// ---- assertion-reason
Q('ar_ws', ar({
  t: 1, d: 4, c: 'analysis', verdict: 'both-true-explains',
  a: `Wholesalers help manufacturers to produce on a large scale.`,
  r: `Wholesalers buy goods in large quantities, so the manufacturer is assured of a ready market for a big output.`,
  sol: `Both are true. Bulk purchase gives the maker a ready buyer, which lets it plan a large output, so R explains A.`,
}));
Q('ar_chain', ar({
  t: 2, d: 4, c: 'analysis', verdict: 'both-true-explains',
  a: `A chain of shoe shops can usually keep the same price in all its shops.`,
  r: `The shops are owned by one firm, which buys centrally and fixes the price from its head office.`,
  sol: `Both are true. Central buying and central pricing by one owner are what allow the same price in every shop, so R explains A.`,
}));
Q('ar_hawker', ar({
  t: 2, d: 4, c: 'analysis', verdict: 'A-true-R-false',
  a: `A fruit hawker such as Raju can start with very little capital.`,
  r: `A hawker must keep a very large stock of goods in a fixed godown.`,
  sol: `A is true, because a hawker needs only a cart and a small stock. R is false, because a hawker carries a small stock and has no fixed godown.`,
}));
Q('ar_dept', ar({
  t: 2, d: 4, c: 'analysis', verdict: 'A-false-R-true',
  a: `A departmental store always sells every item at a lower price than the small shops near it.`,
  r: `A departmental store has many departments under one roof.`,
  sol: `A is false, because heavy rent and staff costs often make its prices higher. R is true, because many departments under one roof define it.`,
}));
Q('ar_itc', ar({
  t: 3, d: 4, c: 'analysis', verdict: 'both-true-explains',
  a: `Input tax credit avoids the cascading of taxes.`,
  r: `A trader deducts the tax paid on purchases from the tax payable on sales, and pays only the difference.`,
  sol: `Both are true. Because only the difference is paid, tax is not charged again on tax already paid, so R explains A.`,
}));
Q('ar_council', ar({
  t: 3, d: 3, c: 'understanding', verdict: 'both-true-not-explains',
  a: `The Goods and Services Tax Council includes ministers of the states.`,
  r: `Goods and services tax came into force on 1 July 2017.`,
  sol: `Both are true, but the date of introduction does not explain why state ministers sit on the Council, so R does not explain A.`,
}));

// ---- true-false, fill in the blanks, match, ordering
Q('tf_ws', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: `A wholesaler such as Lakshmi Wholesalers mainly sells single items to the households that use them.`,
  sol: `A wholesaler sells in large lots to retailers and industrial users. Selling single items to the households that use them is retail trade.`,
}));
Q('tf_peddler', tf({
  t: 2, d: 2, c: 'recall', ans: true,
  stem: `A peddler or hawker has no fixed place of business and takes goods to the buyers.`,
  sol: `That is the nature of itinerant retailers such as peddlers and hawkers.`,
}));
Q('tf_igst', tf({
  t: 3, d: 3, c: 'understanding', ans: false,
  stem: `Integrated goods and services tax is charged on a sale made between two buyers in the same state.`,
  sol: `Within a state, central and state tax apply. Integrated tax is charged on supplies between states and on imports.`,
}));
Q('fb_trade', fb({
  t: 1, d: 2, c: 'recall',
  stem: `Internal trade has two parts: ___ trade, which supplies retailers in bulk, and ___ trade, which serves final consumers.`,
  acc: [['wholesale'], ['retail']],
  sol: `The two parts of internal trade are wholesale trade and retail trade.`,
}));
Q('fb_dept', fb({
  t: 2, d: 2, c: 'recall',
  stem: `A departmental store has many ___ under one roof and buys its goods through ___ purchasing.`,
  acc: [['departments', 'department'], ['centralised', 'central', 'centralized']],
  sol: `Departments under one roof and centralised purchasing are the marks of a departmental store.`,
}));
Q('fb_gst', fb({
  t: 3, d: 2, c: 'recall',
  stem: `Goods and services tax is an ___ tax and is ___-based, because it accrues where goods and services are consumed.`,
  acc: [['indirect'], ['destination']],
  sol: `It is an indirect tax and a destination-based tax.`,
}));
Q('mt_retail_types', match({
  t: 2, d: 3, c: 'application',
  stem: `Match each imagined retailer with its type.`,
  pairs: [
    [`Raju pushes a fruit cart through town lanes`, `Hawker`],
    [`Nandini sells pots at a different village market each day`, `Market trader`],
    [`Mahanagar Emporium has many departments in a city-centre building`, `Departmental store`],
    [`Charan Footwear has identical shops in many localities`, `Chain store`],
  ],
  sol: `A cart through lanes marks a hawker, visits to periodic markets mark a market trader, many departments under one roof mark a departmental store, and identical shops in many localities mark a chain store.`,
}));
Q('mt_gst_terms', match({
  t: 3, d: 3, c: 'understanding',
  stem: `A trader in the imagined state of Kolpur is learning four terms of goods and services tax. Match each term with its meaning.`,
  pairs: [
    [`Central goods and services tax`, `Charged by the Centre on supplies within a state`],
    [`State goods and services tax`, `Charged by the state on supplies within the state`],
    [`Integrated goods and services tax`, `Charged on supplies between states and on imports`],
    [`Input tax credit`, `Set-off of tax paid on purchases against tax due on sales`],
  ],
  sol: `Central and state taxes are both charged on a supply within a state, the integrated tax applies between states and to imports, and input tax credit is the set-off of purchase tax against sales tax.`,
}));
Q('od_goods', ord({
  t: 1, d: 3, c: 'understanding',
  stem: `Arrange the path of the fruit that Raju sells, from the first to the last holder, in a sensible order.`,
  items: [`A grower picks fruit in the orchard`, `Anand Fruit Traders buys crates from growers and stores them`, `Raju buys crates from the wholesaler on credit`, `A household buys fruit from Raju's cart`],
  sol: `The grower supplies the wholesaler, the wholesaler supplies the retailer, and the retailer supplies the final consumer.`,
}));
Q('od_itc', ord({
  t: 3, d: 3, c: 'understanding',
  stem: `Arrange the parties in the order in which the furniture of Devadaru Woodcraft passes along the supply chain.`,
  items: [`A timber supplier sells wood to Devadaru Woodcraft`, `Devadaru Woodcraft sells furniture to a wholesaler`, `The wholesaler sells furniture to a retailer`, `The retailer sells the furniture to a family`],
  sol: `Timber goes to the maker, the finished furniture goes to the wholesaler, then to the retailer, and finally to the consumer.`,
}));

// ================================================================ short answers
Q('s2_trade_def', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: `What is internal trade? Name its two parts.`,
  model: `Internal trade means the buying and selling of goods and services inside the boundaries of a country. It has two parts: wholesale trade, which supplies retailers and industrial users in bulk, and retail trade, which serves final consumers.`,
  sol: `Meaning and the two parts.`,
  scheme: [[`Meaning of internal trade`, 1], [`Wholesale and retail named`, 1]],
}));
Q('s2_ws_vs_ret', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: `Distinguish wholesale trade from retail trade on the basis of the buyers served and the quantities handled.`,
  model: `A wholesaler buys in large quantities from producers and sells mainly to retailers and industrial users. A retailer buys in smaller lots from wholesalers and sells in small quantities to final consumers for their own use.`,
  sol: `One point on buyers and one on quantities.`,
  scheme: [[`Buyers served by each`, 1], [`Quantities handled by each`, 1]],
}));
Q('s2_ws_mfr', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: `Explain any two services that wholesalers render to manufacturers.`,
  model: `First, by buying in large lots a wholesaler lets the maker produce on a large scale. Second, a wholesaler stores the goods and bears the risk of price falls and damage, so the maker need not hold large stocks.`,
  sol: `Any two services explained.`,
  scheme: [[`First service explained`, 1], [`Second service explained`, 1]],
}));
Q('s2_ws_ret', short({
  t: 1, d: 4, c: 'application', marks: 2, wl: S2,
  stem: `Lakshmi Wholesalers keeps a ready stock of notebooks and lets Kiran Stationers pay thirty days after delivery. Identify the two services to the retailer that this shows.`,
  model: `Keeping a ready stock shows the service of making goods available to the retailer when needed. Letting the shop pay after thirty days shows the grant of credit, which reduces the funds that the retailer must keep tied up.`,
  sol: `Two services identified from the case.`,
  scheme: [[`Availability of goods identified`, 1], [`Grant of credit identified`, 1]],
}));
Q('s2_ret_cons', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: `State and explain any two services that retailers render to consumers.`,
  model: `A retailer ensures regular availability of goods, so a buyer can purchase daily needs near home. A retailer also gives after-sales service, such as repair or replacement, which gives the buyer confidence to buy.`,
  sol: `Any two services stated and explained.`,
  scheme: [[`First service stated and explained`, 1], [`Second service stated and explained`, 1]],
}));
Q('s2_hawker', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: `Raju sells fruit from a handcart in the lanes of Pindra. Name his type of retailer and give two features of this type.`,
  model: `Raju is an itinerant retailer of the hawker kind. Such a retailer has no fixed place of business, carries a small stock to the buyers, and needs very little capital, though the range of goods is narrow.`,
  sol: `Type named and two features.`,
  scheme: [[`Itinerant retailer, hawker, named`, 1], [`Two features`, 1]],
}));
Q('s2_dept_def', short({
  t: 2, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: `What is a departmental store? Give two of its features.`,
  model: `A departmental store is a large retail store that sells many lines of goods in separate departments under one roof. It is usually in a central place, and its purchasing is done centrally for all departments.`,
  sol: `Meaning and two features.`,
  scheme: [[`Meaning of a departmental store`, 1], [`Two features`, 1]],
}));
Q('s2_chain_def', short({
  t: 2, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: `What is a chain store? State two of its features.`,
  model: `A chain store, or multiple shop, is a group of identical shops set up in different localities by one firm. The shops are owned by the same firm, buy centrally and sell at standard prices.`,
  sol: `Meaning and two features.`,
  scheme: [[`Meaning of a chain store`, 1], [`Two features`, 1]],
}));
Q('s2_gst_def', short({
  t: 3, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: `What is goods and services tax? When did it start in India?`,
  model: `It is an indirect tax levied on the supply of goods and services. It began on 1 July 2017 through the Constitution (101st Amendment) Act 2016, and it replaced many separate taxes of the Centre and the states.`,
  sol: `Meaning and date.`,
  scheme: [[`Meaning of goods and services tax`, 1], [`Date and Amendment`, 1]],
}));
Q('s2_dest', short({
  t: 3, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: `Explain the statement that goods and services tax is a destination-based tax.`,
  model: `A destination-based tax is collected at the point where goods or services are finally consumed, and not where they are produced. So the state of consumption gets the revenue, whichever state the supplier belongs to.`,
  sol: `Meaning and its effect on revenue.`,
  scheme: [[`Taxed where consumed`, 1], [`State of consumption gains the revenue`, 1]],
}));
Q('s2_wh_itc', short({
  t: 3, d: 4, c: 'application', marks: 2, wl: S2,
  stem: `At an imagined goods and services tax rate of ${GS.rate} per cent, a wholesaler buys furniture for Rs ${fmt(GS.s1)} and sells it for Rs ${fmt(GS.s2)}. Find the tax that it must pay after input tax credit.`,
  model: `Tax paid on the purchase is ${GS.rate} per cent of Rs ${fmt(GS.s1)}, which is Rs ${fmt(GS.out1)}. Tax collected on the sale is ${GS.rate} per cent of Rs ${fmt(GS.s2)}, which is Rs ${fmt(GS.out2)}. After credit the wholesaler pays Rs ${fmt(GS.pay2)}.`,
  sol: `Purchase tax, sales tax and the difference.`,
  scheme: [[`Tax Rs ${fmt(GS.out1)} on purchase and Rs ${fmt(GS.out2)} on sale`, 1], [`Tax payable Rs ${fmt(GS.pay2)}`, 1]],
}));

Q('s3_ws_mfr', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: `Explain any three services of wholesalers to manufacturers.`,
  model: `1. Large-scale production: bulk orders let the maker plan a big output.\n2. Bearing risk: the wholesaler holds stock and takes the loss from price falls, theft or damage.\n3. Financial assistance: the wholesaler may pay in advance or promptly, so the maker has funds for production.`,
  sol: `Any three services explained.`,
  scheme: [[`First service`, 1], [`Second service`, 1], [`Third service`, 1]],
}));
Q('s3_ret_prod', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: `Explain any three services that retailers render to producers and wholesalers.`,
  model: `1. Distribution: the retailer takes goods to the final buyer, so producers need not reach every buyer.\n2. Personal selling: the retailer persuades buyers face to face, which helps in selling.\n3. Market information: the retailer reports tastes and complaints, which helps producers improve products.`,
  sol: `Any three services explained.`,
  scheme: [[`First service`, 1], [`Second service`, 1], [`Third service`, 1]],
}));
Q('s3_itinerant', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `Raju pushes a fruit cart, Nandini sells pots at village markets on fixed days and Uma sells watches on a pavement outside an imagined station. Name the type of itinerant retailer that each is.`,
  model: `1. Raju is a hawker, who carries goods from lane to lane on a cart.\n2. Nandini is a market trader, who visits periodic markets held on fixed days in different places.\n3. Uma is a street trader, who sets up at a busy place such as a station and sells to passers-by.`,
  sol: `Each of the three named with a reason.`,
  scheme: [[`Raju as hawker`, 1], [`Nandini as market trader`, 1], [`Uma as street trader`, 1]],
}));
Q('s3_dept_merits', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: `Explain any three merits of departmental stores.`,
  model: `1. Convenience: a buyer finds many goods in one place and saves time.\n2. Central location: it draws large numbers of buyers and so sells a lot.\n3. Economies of buying: central purchasing in bulk lowers the cost, and the store can offer services such as home delivery.`,
  sol: `Any three merits.`,
  scheme: [[`First merit`, 1], [`Second merit`, 1], [`Third merit`, 1]],
}));
Q('s3_chain_lim', short({
  t: 2, d: 4, c: 'application', marks: 3, wl: S3,
  stem: `A manager of a shop of Charan Footwear cannot change the stock sent by the head office. Using this case, explain any three limitations of chain stores.`,
  model: `1. Little freedom: a shop manager cannot adjust stock to local tastes, as in this case.\n2. Narrow range: chains suit standardised goods that sell fast, and not slow or special items.\n3. Less personal touch: staff follow fixed rules and may not know regular buyers well.`,
  sol: `Three limitations, one linked to the case.`,
  scheme: [[`Little freedom linked to the case`, 1], [`Suited only to standard goods`, 1], [`Less personal touch`, 1]],
}));
Q('s3_gst_benefits', short({
  t: 3, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: `Explain any three benefits of goods and services tax.`,
  model: `1. A common national market: one tax across the country lowers barriers between states.\n2. No cascading: input tax credit stops tax from being charged on tax.\n3. Simpler compliance and transparency: fewer taxes to deal with, and the tax in a price is easier to see.`,
  sol: `Any three benefits.`,
  scheme: [[`First benefit`, 1], [`Second benefit`, 1], [`Third benefit`, 1]],
}));
Q('s3_itc', short({
  t: 3, d: 4, c: 'application', marks: 3, wl: S3,
  stem: `At an imagined goods and services tax rate of ${GS.rate} per cent, a retailer buys furniture for Rs ${fmt(GS.s2)} and sells it for Rs ${fmt(GS.s3)}. Show how input tax credit works and find the tax it pays.`,
  model: `Tax paid on the purchase is ${GS.rate} per cent of Rs ${fmt(GS.s2)}, which is Rs ${fmt(GS.out2)}. Tax collected on the sale is ${GS.rate} per cent of Rs ${fmt(GS.s3)}, which is Rs ${fmt(GS.out3)}. The retailer sets off Rs ${fmt(GS.out2)} as credit and pays only Rs ${fmt(GS.pay3)} to the government.`,
  sol: `Purchase tax, sales tax and net payment.`,
  scheme: [[`Purchase tax Rs ${fmt(GS.out2)}`, 1], [`Sales tax Rs ${fmt(GS.out3)}`, 1], [`Credit set off and Rs ${fmt(GS.pay3)} paid`, 1]],
}));

// ================================================================ long answers
Q('l_ws_services', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: `Explain the services that wholesalers render to manufacturers and to retailers.`,
  model: `To manufacturers: 1. Bulk buying lets them produce on a large scale and keeps production continuous. 2. Wholesalers store the goods and bear risk, and may give financial help.\nTo retailers: 3. They keep goods available so shops can stock a wide range. 4. They grant credit and give marketing support such as schemes and displays. 5. They give specialised knowledge of products and share risk, such as price falls and damage.`,
  sol: `Services to the two groups, five points in all.`,
  scheme: [[`Large-scale and continuous production`, 1], [`Storage, risk and financial help`, 1], [`Availability of goods to retailers`, 1], [`Credit and marketing support`, 1], [`Specialised knowledge and risk sharing`, 1]],
}));
Q('l_retailer_services', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: `Explain the services of retailers to producers and wholesalers and to consumers.`,
  model: `To producers and wholesalers: 1. Retailers distribute goods to the final buyers and sell personally, persuading each buyer face to face. 2. They enable large-scale operations, because many small sales keep producers busy, and they collect market information on tastes and complaints. 3. They help in promotion through displays and talks about the goods.\nTo consumers: 4. They keep goods regularly available near home, give information on new products, and offer convenience and a wide selection. 5. They give after-sales service such as repair or delivery and, at times, credit to regular buyers.`,
  sol: `Services to the two groups, five points in all.`,
  scheme: [[`Distribution and personal selling`, 1], [`Large-scale operations and market information`, 1], [`Help in promotion`, 1], [`Availability, information, convenience and choice`, 1], [`After-sales service and credit`, 1]],
}));
Q('l_types', long({
  t: 2, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: `Explain how retail trade is classified, with an example of each kind.`,
  model: `1. Itinerant retailers have no fixed place of business; examples are hawkers, market traders, street traders and cheap jacks.\n2. Small-scale fixed-shop retailers have a fixed shop of modest size, such as general stores, specialty shops and second-hand goods shops.\n3. Large-scale fixed-shop retailers include departmental stores and chain stores.\n4. Shopping malls and supermarkets house many goods or shops in one place.\n5. Itinerant retailers need little capital, while large stores need a lot.`,
  sol: `Itinerant, small-scale fixed, large-scale fixed, with examples.`,
  scheme: [[`Itinerant retailers with examples`, 1], [`Small-scale fixed-shop retailers with examples`, 1], [`Large-scale retailers with examples`, 1], [`Malls and supermarkets`, 1], [`A point on capital or size`, 1]],
}));
Q('l_dept_chain', long({
  t: 2, d: 4, c: 'understanding', marks: 5, wl: L5,
  stem: `Distinguish a departmental store from a chain store on the basis of location, range of products, services, price and credit.`,
  model: `1. Location: a departmental store is at one central place, while a chain has shops in many localities.\n2. Range: a departmental store sells many lines, while a chain deals in a narrow range of standard goods.\n3. Services: a departmental store gives many services, such as delivery and a cafe, while a chain gives few.\n4. Price: a departmental store often charges more because of its costs, while a chain fixes one standard price.\n5. Credit: a departmental store may allow credit, while a chain usually sells for cash.`,
  sol: `Five bases of comparison.`,
  scheme: [[`Location`, 1], [`Range of products`, 1], [`Services`, 1], [`Price`, 1], [`Credit`, 1]],
}));
Q('l_gst_features', long({
  t: 3, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: `Explain the main features of goods and services tax.`,
  model: `1. It is a destination-based tax, accruing where goods and services are consumed.\n2. It is a dual tax: central and state tax on supplies within a state, with union territory tax in union territories.\n3. Integrated tax applies to supplies between states and to imports.\n4. Input tax credit avoids cascading, giving the idea of one nation, one tax.\n5. The Council of Union and state ministers recommends rates and rules; there are a few rate slabs, and businesses above a threshold turnover must register.`,
  sol: `Five features.`,
  scheme: [[`Destination-based tax`, 1], [`Dual tax within a state`, 1], [`Integrated tax between states and on imports`, 1], [`Input tax credit and avoiding cascading`, 1], [`Council, rate slabs and registration`, 1]],
}));
Q('l_itc_chain', long({
  t: 3, d: 4, c: 'application', marks: 5, wl: L5,
  stem: `At an imagined goods and services tax rate of ${GS.rate} per cent, Devadaru Woodcraft buys timber for Rs ${fmt(GS.base0)} and sells furniture to a wholesaler for Rs ${fmt(GS.s1)}. The wholesaler sells it to a retailer for Rs ${fmt(GS.s2)}, who sells it to a family for Rs ${fmt(GS.s3)}. Find the tax paid to the government at each of the three stages and say how cascading is avoided.`,
  model: `1. Devadaru: collects Rs ${fmt(GS.out1)} less credit Rs ${fmt(GS.in0)}, so it pays Rs ${fmt(GS.pay1)}.\n2. Wholesaler: collects Rs ${fmt(GS.out2)} less credit Rs ${fmt(GS.out1)}, so it pays Rs ${fmt(GS.pay2)}.\n3. Retailer: collects Rs ${fmt(GS.out3)} less credit Rs ${fmt(GS.out2)}, so it pays Rs ${fmt(GS.pay3)}.\n4. Each stage pays only on the value it adds.\n5. So the tax on the final price is Rs ${fmt(GS.govt)} and no tax is charged on tax.`,
  sol: `Three stage computations and the explanation.`,
  scheme: [[`Devadaru pays Rs ${fmt(GS.pay1)}`, 1], [`Wholesaler pays Rs ${fmt(GS.pay2)}`, 1], [`Retailer pays Rs ${fmt(GS.pay3)}`, 1], [`Tax only on value added`, 1], [`No tax on tax, total Rs ${fmt(GS.govt)}`, 1]],
}));

// ================================================================ case-based
Q('cb_lakshmi', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined wholesaler and retailer.)*`,
  passage: `**Lakshmi Wholesalers (imagined), a notebook wholesaler in the imagined city of Tarapur**\n\nLakshmi Wholesalers buys ${fmt(NB.n)} notebooks at Rs ${NB.mfr} each from Tarapur Notebooks, an imagined maker, and stores them in its godown. It sells them to shops at Rs ${NB.whole} each and allows the shops thirty days to pay. Kiran Stationers, an imagined shop, buys ${fmt(NB.buy)} notebooks and sells them to students at Rs ${NB.retail} each.`,
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'application', stem: `Kiran Stationers is engaged in`, opts: [`retail trade`, `wholesale trade`, `international trade`, `manufacturing`], sol: `Selling to students for their own use is retail trade. Wholesale trade supplies shops, nothing crosses a border, and the shop makes no notebooks.` })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: `Quote the line that shows a service of the wholesaler to the retailer.`, model: `"**allows the shops thirty days to pay**": this is the grant of credit.`, sol: `The line on thirty days to pay.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: 1, d: 4, c: 'application', marks: 2, stem: `**Either** (i): Find the margin of Lakshmi Wholesalers on the whole lot and of Kiran Stationers on its purchase.`, model: `Lakshmi Wholesalers earns Rs ${NB.whole - NB.mfr} on each of ${fmt(NB.n)} notebooks, which is Rs ${fmt(NB.wsMargin)}. Kiran Stationers earns Rs ${NB.retail - NB.whole} on each of ${fmt(NB.buy)} notebooks, which is Rs ${fmt(NB.rtMargin)}.`, sol: `Two margins.`, scheme: [[`Wholesaler margin Rs ${fmt(NB.wsMargin)}`, 1], [`Retailer margin Rs ${fmt(NB.rtMargin)}`, 1]] }), [
      short({ t: 1, d: 3, c: 'application', marks: 2, stem: `**Or** (ii): Name one service of Lakshmi Wholesalers to the manufacturer and one to the retailer, as shown in the passage.`, model: `Storing the notebooks in its godown is a service to the manufacturer, since the maker need not hold the stock. Allowing thirty days to pay is a service to the retailer, in the form of credit.`, sol: `One service to each.`, scheme: [[`Storage for the manufacturer`, 1], [`Credit for the retailer`, 1]] }),
    ]),
  ],
}));
Q('cb_raju', caseQ({
  t: [1, 2], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined hawker and wholesaler.)*`,
  passage: `**Raju (imagined), a fruit hawker of the imagined town of Pindra**\n\nRaju buys ${RAJU.crates} crates of fruit at Rs ${fmt(RAJU.cost)} a crate from Anand Fruit Traders, an imagined wholesaler of the Pindra market, who lets him pay at the end of the week. Each crate holds ${RAJU.kgPer} kg. Raju pushes a handcart through the lanes of the town and sells ${RAJU.soldKg} kg at Rs ${RAJU.price} a kg. He has no shop. The wholesaler keeps the fruit in a cold room and buys it from growers in large lots. For this example, ignore the unsold fruit.`,
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'application', stem: `Raju is`, opts: [`an itinerant retailer`, `a wholesaler`, `a departmental store`, `a chain store`], sol: `He has no fixed shop and moves with a cart, so he is an itinerant retailer. A wholesaler sells to retailers, and the last two are fixed stores.` })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: `Quote the line that shows a service of the wholesaler to the growers.`, model: `"**buys it from growers in large lots**": large buying helps the growers sell a big output.`, sol: `The line on buying in large lots.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: 2, d: 4, c: 'application', marks: 2, stem: `**Either** (i): Find the cost of the fruit, the sales of Raju and his gain over the cost.`, model: `The cost is ${RAJU.crates} times Rs ${fmt(RAJU.cost)}, which is Rs ${fmt(RAJU.buy)}. Sales are ${RAJU.soldKg} kg at Rs ${RAJU.price}, which is Rs ${fmt(RAJU.rev)}. The gain over the cost is Rs ${fmt(RAJU.gain)}.`, sol: `Cost, sales and gain.`, scheme: [[`Cost Rs ${fmt(RAJU.buy)} and sales Rs ${fmt(RAJU.rev)}`, 1], [`Gain Rs ${fmt(RAJU.gain)}`, 1]] }), [
      short({ t: 2, d: 3, c: 'application', marks: 2, stem: `**Or** (ii): Give two features of Raju's type of retailer that are seen in the passage.`, model: `Raju has no shop, so he has no fixed place of business. He takes the goods to the buyers on a handcart, and he needs only a small amount of capital to buy a few crates.`, sol: `Two features.`, scheme: [[`No fixed place of business`, 1], [`Takes goods to buyers`, 1]] }),
    ]),
  ],
}));
Q('cb_charan', caseQ({
  t: 2, d: 4, c: 'application', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined chain of shoe shops.)*`,
  passage: `**Charan Footwear (imagined), a chain of shoe shops in the imagined state of Suvarna**\n\nCharan Footwear owns ${CH.stores} identical shops in different localities. Its head office orders ${CH.pairs} pairs for each shop in a single order and pays Rs ${CH.bulk} a pair, whereas a lone shop would pay Rs ${CH.solo}. Every shop sells a pair at Rs ${fmt(CH.price)}. A manager in a hill town says that his buyers want warm boots, but he must sell what the head office sends.`,
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'application', stem: `Charan Footwear is an example of`, opts: [`a chain store`, `a departmental store`, `a hawker`, `a market trader`], sol: `Identical shops of one firm in many localities with central buying form a chain store. A departmental store is one big store, and hawkers and market traders have no shops.` })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: `Quote the line that shows a limitation of chain stores.`, model: `"**he must sell what the head office sends**": the shop has little freedom to meet local needs.`, sol: `The line on the head office stock.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: 2, d: 4, c: 'application', marks: 2, stem: `**Either** (i): Find the total pairs bought, the cost with a single order and the saving over lone buying.`, model: `The total is ${CH.stores} times ${CH.pairs}, which is ${fmt(CH.total)} pairs. The cost at Rs ${CH.bulk} is Rs ${fmt(CH.bulkCost)}, against Rs ${fmt(CH.soloCost)} at Rs ${CH.solo}. The saving is Rs ${fmt(CH.saving)}.`, sol: `Pairs, cost and saving.`, scheme: [[`${fmt(CH.total)} pairs and cost Rs ${fmt(CH.bulkCost)}`, 1], [`Saving Rs ${fmt(CH.saving)}`, 1]] }), [
      short({ t: 2, d: 4, c: 'application', marks: 2, stem: `**Or** (ii): Name one merit and one limitation of chain stores that the passage shows.`, model: `The merit is the economy of bulk buying, since a pair costs less in a single order. The limitation is that shops have little freedom, since the manager must sell what head office sends.`, sol: `A merit and a limitation.`, scheme: [[`Merit named`, 1], [`Limitation named`, 1]] }),
    ]),
  ],
}));
Q('cb_mahanagar', caseQ({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined departmental store.)*`,
  passage: `**Mahanagar Emporium (imagined), a departmental store in the imagined city of Ratnapur**\n\nMahanagar Emporium stands in the middle of Ratnapur, and its four departments sold goods worth Rs ${fmt(DS.groc)} (groceries), Rs ${fmt(DS.app)} (apparel), Rs ${fmt(DS.elec)} (electronics) and Rs ${fmt(DS.home)} (home goods) in a month. It offers home delivery and a cafe, and its head office does all the buying. Buyers say that it is handy, but that its prices are higher than those of the lane shops.`,
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'application', stem: `Mahanagar Emporium is`, opts: [`a departmental store`, `a chain store`, `a general store`, `a street trader`], sol: `Departments under one roof with central buying make a departmental store. A chain store has shops in many localities, a general store is small, and a street trader has no store.` })),
    child('b', short({ t: 2, d: 3, c: 'application', marks: 1, stem: `Quote the line that shows a limitation of departmental stores.`, model: `"**its prices are higher than those of the lane shops**": the store's costs push up prices.`, sol: `The line on higher prices.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: 2, d: 4, c: 'application', marks: 2, stem: `**Either** (i): Find the total sales of the month and the share of the electronics department.`, model: `Total sales are Rs ${fmt(DS.total)}. Electronics sold Rs ${fmt(DS.elec)}, which is ${DS.elecPct} per cent of the total.`, sol: `Total and share.`, scheme: [[`Total Rs ${fmt(DS.total)}`, 1], [`Share ${DS.elecPct} per cent`, 1]] }), [
      short({ t: 2, d: 3, c: 'application', marks: 2, stem: `**Or** (ii): Name two merits of departmental stores that the passage shows.`, model: `A central location in the middle of the city draws many buyers. Services such as home delivery and a cafe attract customers, and many departments under one roof make shopping handy.`, sol: `Two merits.`, scheme: [[`First merit`, 1], [`Second merit`, 1]] }),
    ]),
  ],
}));
Q('cb_devadaru', caseQ({
  t: 3, d: 4, c: 'application', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined furniture chain and imagined tax rate.)*`,
  passage: `**Devadaru Woodcraft (imagined), a furniture maker in the imagined state of Kolpur**\n\nDevadaru Woodcraft buys timber worth Rs ${fmt(GS.base0)} and makes almirahs. It sells them to Sagar Furniture House, a wholesaler in the same state, for Rs ${fmt(GS.s1)}. The wholesaler sells them to Mohan Home Store, a retailer, for Rs ${fmt(GS.s2)}, and the retailer sells them to a family for Rs ${fmt(GS.s3)}. For this example, goods and services tax is imagined at ${GS.rate} per cent of the selling price at every stage, and every trader claims input tax credit.`,
  parts: [
    child('a', mcq({ t: 3, d: 2, c: 'application', stem: `The sale by Devadaru Woodcraft to Sagar Furniture House is within one state, so the taxes charged are`, opts: [`central and state goods and services tax`, `integrated goods and services tax`, `union territory tax only`, `no goods and services tax`], sol: `A supply inside a state bears central and state tax. Integrated tax is for supplies between states and imports, union territory tax belongs to union territories, and the sale is taxable.` })),
    child('b', short({ t: 3, d: 3, c: 'application', marks: 1, stem: `Quote the line that shows the retailer in the chain.`, model: `"**Mohan Home Store, a retailer**": the shop that sells to the final family.`, sol: `The line naming the retailer.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: 3, d: 4, c: 'application', marks: 2, stem: `**Either** (i): Find the tax that Devadaru Woodcraft collects on its sale, the credit it claims and the tax it pays.`, model: `Devadaru Woodcraft collects ${GS.rate} per cent of Rs ${fmt(GS.s1)}, which is Rs ${fmt(GS.out1)}. Its credit is the tax of Rs ${fmt(GS.in0)} on the timber. It pays Rs ${fmt(GS.pay1)}.`, sol: `Tax collected, credit and payment.`, scheme: [[`Collected Rs ${fmt(GS.out1)} and credit Rs ${fmt(GS.in0)}`, 1], [`Payment Rs ${fmt(GS.pay1)}`, 1]] }), [
      short({ t: 3, d: 4, c: 'application', marks: 2, stem: `**Or** (ii): Find the tax that the retailer pays, and the total tax on the final price after all credits.`, model: `The retailer collects Rs ${fmt(GS.out3)} and has credit of Rs ${fmt(GS.out2)}, so it pays Rs ${fmt(GS.pay3)}. Added to the earlier payments, the whole tax on the final price is Rs ${fmt(GS.govt)}.`, sol: `Retailer payment and total tax.`, scheme: [[`Retailer pays Rs ${fmt(GS.pay3)}`, 1], [`Total Rs ${fmt(GS.govt)}`, 1]] }),
    ]),
  ],
}));
