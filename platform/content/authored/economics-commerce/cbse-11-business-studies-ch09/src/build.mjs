// Build CBSE 11 Business Studies ch09 Internal Trade. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-11-business-studies-ch09/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-business-studies-ch01/src/lib.mjs';

setUnit('cbse-11-business-studies-ch09', 'economics-commerce');
const { fmt, W, RAJU, NB, CH, DS, GS, IM } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG helpers
// Line between the edges of two boxes {x, y, w, h}, along the line joining their centres.
const link = (s, A, B, o = { sw: 1.4, color: 'muted' }) => {
  const ax = A.x + A.w / 2, ay = A.y + A.h / 2, bx = B.x + B.w / 2, by = B.y + B.h / 2;
  const dx = bx - ax, dy = by - ay;
  const t = (b) => Math.min(dx !== 0 ? b.w / 2 / Math.abs(dx) : 9, dy !== 0 ? b.h / 2 / Math.abs(dy) : 9);
  s.line(ax + dx * t(A), ay + dy * t(A), bx - dx * t(B), by - dy * t(B), o);
};
const box = (s, b, title, sub, o = {}) => {
  s.rect(b.x, b.y, b.w, b.h, { fill: o.accent ? 'accent' : 'fill', fillOpacity: o.accent ? 0.16 : undefined, color: o.accent ? 'accent' : 'muted', sw: o.accent ? 1.8 : 1.4 });
  if (sub) {
    s.text(b.x + b.w / 2, b.y + b.h / 2 - 10, title, { size: 13, bold: true });
    s.text(b.x + b.w / 2, b.y + b.h / 2 + 11, sub, { size: 12 });
  } else s.text(b.x + b.w / 2, b.y + b.h / 2, title, { size: 13, bold: true });
};

// ---------------------------------------------------------------- SVG visuals
// 1. Trade classification tree
const vTree = (() => {
  const s = new Svg(760, 344);
  const R = { x: 300, y: 8, w: 160, h: 36 };
  const IN = { x: 90, y: 74, w: 300, h: 48 };
  const IT = { x: 470, y: 74, w: 240, h: 48 };
  const WS = { x: 30, y: 170, w: 240, h: 56 };
  const RT = { x: 300, y: 170, w: 240, h: 56 };
  const NO = { x: 230, y: 270, w: 200, h: 56 };
  const FX = { x: 450, y: 270, w: 200, h: 56 };
  [[R, IN], [R, IT], [IN, WS], [IN, RT], [RT, NO], [RT, FX]].forEach(([a, b]) => link(s, a, b));
  box(s, R, 'Trade', null, { accent: true });
  box(s, IN, 'Internal trade', 'within one country', { accent: true });
  box(s, IT, 'International trade', 'between countries');
  box(s, WS, 'Wholesale trade', 'bulk, to retailers and industry');
  box(s, RT, 'Retail trade', 'small lots, to final buyers');
  box(s, NO, 'Itinerant retailers', 'no fixed place');
  box(s, FX, 'Fixed-shop retailers', 'small and large shops');
  return s.visual('Tree of trade. Trade splits into internal trade, within one country, and international trade, between countries. Internal trade splits into wholesale trade, which deals in bulk with retailers and industrial users, and retail trade, which sells small lots to final buyers. Retail trade splits into itinerant retailers with no fixed place and fixed-shop retailers with small and large shops', 'Trade, internal trade, wholesale and retail.');
})();

// 2. Wholesaler services chart
const vWs = (() => {
  const s = new Svg(760, 380);
  const C = { x: 300, y: 160, w: 160, h: 60 };
  const left = ['Large-scale production', 'Bearing risk', 'Financial assistance', 'Expert advice', 'Help in marketing', 'Continuity of production', 'Storage'];
  const right = ['Availability of goods', 'Marketing support', 'Grant of credit', 'Specialised knowledge', 'Risk sharing'];
  const L = left.map((t, i) => ({ x: 10, y: 36 + i * 48, w: 230, h: 38, t }));
  const Rr = right.map((t, i) => ({ x: 520, y: 36 + i * 72, w: 230, h: 38, t }));
  [...L, ...Rr].forEach((b) => link(s, C, b));
  box(s, C, 'Wholesaler', null, { accent: true });
  s.text(125, 16, 'To manufacturers', { size: 14, bold: true });
  s.text(635, 16, 'To retailers', { size: 14, bold: true });
  [...L, ...Rr].forEach((b) => box(s, b, b.t, null));
  return s.visual('Chart of the services of a wholesaler. To manufacturers: large-scale production, bearing risk, financial assistance, expert advice, help in marketing, continuity of production and storage. To retailers: availability of goods, marketing support, grant of credit, specialised knowledge and risk sharing', 'Seven services to makers; five to retailers.');
})();

// 3. Retailer services chart
const vRt = (() => {
  const s = new Svg(760, 384);
  const C = { x: 300, y: 160, w: 160, h: 60 };
  const left = ['Distribution of goods', 'Personal selling', 'Large-scale operations', 'Market information', 'Help in promotion'];
  const right = ['Regular availability', 'Information on new products', 'Convenience', 'Wide selection', 'After-sales service', 'Credit facilities'];
  const L = left.map((t, i) => ({ x: 10, y: 36 + i * 72, w: 230, h: 38, t }));
  const Rr = right.map((t, i) => ({ x: 520, y: 36 + i * 58, w: 230, h: 38, t }));
  [...L, ...Rr].forEach((b) => link(s, C, b));
  box(s, C, 'Retailer', null, { accent: true });
  s.text(125, 16, 'To producers and wholesalers', { size: 14, bold: true });
  s.text(635, 16, 'To consumers', { size: 14, bold: true });
  [...L, ...Rr].forEach((b) => box(s, b, b.t, null));
  return s.visual('Chart of the services of a retailer. To producers and wholesalers: distribution of goods, personal selling, large-scale operations, market information and help in promotion. To consumers: regular availability, information on new products, convenience, wide selection, after-sales service and credit facilities', 'Five services upstream; six to consumers.');
})();

// 4. Types of retail trade tree
const vTypes = (() => {
  const s = new Svg(760, 372);
  const R = { x: 280, y: 8, w: 200, h: 38 };
  const cols = [
    { x: 10, h: 'Itinerant', sub: 'no fixed place', kids: ['Peddlers and hawkers', 'Market traders', 'Street traders', 'Cheap jacks'] },
    { x: 265, h: 'Small fixed shops', sub: 'small-scale', kids: ['General stores', 'Specialty shops', 'Street stall holders', 'Second-hand goods shops', 'Single-line stores'] },
    { x: 520, h: 'Large fixed shops', sub: 'large-scale', kids: ['Departmental stores', 'Chain stores', 'Shopping malls', 'Supermarkets'] },
  ];
  const heads = cols.map((c) => ({ x: c.x, y: 76, w: 230, h: 48 }));
  heads.forEach((b) => link(s, R, b));
  box(s, R, 'Retail trade', null, { accent: true });
  cols.forEach((c, i) => {
    const hb = heads[i];
    box(s, hb, c.h, c.sub, { accent: true });
    c.kids.forEach((k, j) => {
      const y = 150 + j * 44;
      s.line(hb.x + 115, hb.y + hb.h, hb.x + 115, y, { sw: 1.2, color: 'muted' });
      box(s, { x: hb.x, y, w: 230, h: 36 }, k, null);
    });
  });
  return s.visual('Tree of retail trade. Itinerant retailers with no fixed place: peddlers and hawkers, market traders, street traders and cheap jacks. Small-scale fixed-shop retailers: general stores, specialty shops, street stall holders, second-hand goods shops and single-line stores. Large-scale fixed-shop retailers: departmental stores, chain stores, shopping malls and supermarkets', 'Three groups of retailers.');
})();

// 5. Input tax credit chain flow (all figures computed in questions.mjs)
const vItc = (() => {
  const s = new Svg(790, 296);
  const stages = [
    { n: 'Timber supplier', sell: GS.base0, tax: GS.in0, credit: null, pay: GS.in0 },
    { n: 'Devadaru Woodcraft', sell: GS.s1, tax: GS.out1, credit: GS.in0, pay: GS.pay1 },
    { n: 'Wholesaler', sell: GS.s2, tax: GS.out2, credit: GS.out1, pay: GS.pay2 },
    { n: 'Retailer', sell: GS.s3, tax: GS.out3, credit: GS.out2, pay: GS.pay3 },
  ];
  const xs = [0, 1, 2, 3, 4].map((i) => 10 + i * 160);
  stages.forEach((g, i) => {
    const x = xs[i];
    s.rect(x, 10, 132, 154, { fill: 'fill', color: 'accent', sw: 1.6 });
    s.text(x + 66, 30, g.n, { size: 12, bold: true });
    s.text(x + 66, 52, `Sells Rs ${fmt(g.sell)}`, { size: 12 });
    s.line(x + 8, 66, x + 124, 66, { sw: 1, color: 'muted' });
    s.text(x + 66, 86, `Tax on sale Rs ${fmt(g.tax)}`, { size: 11 });
    s.text(x + 66, 112, g.credit === null ? 'Credit none' : `Credit Rs ${fmt(g.credit)}`, { size: 11 });
    s.text(x + 66, 138, `Pays Rs ${fmt(g.pay)}`, { size: 12, bold: true });
  });
  s.rect(xs[4], 10, 132, 154, { fill: 'accent', fillOpacity: 0.12, color: 'accent', sw: 1.6 });
  s.text(xs[4] + 66, 30, 'Family', { size: 12, bold: true });
  s.text(xs[4] + 66, 52, 'final buyer', { size: 12 });
  s.line(xs[4] + 8, 66, xs[4] + 124, 66, { sw: 1, color: 'muted' });
  s.text(xs[4] + 66, 86, `Price Rs ${fmt(GS.s3)}`, { size: 11 });
  s.text(xs[4] + 66, 112, `Tax Rs ${fmt(GS.out3)}`, { size: 11 });
  s.text(xs[4] + 66, 138, `Pays Rs ${fmt(GS.consumer)}`, { size: 12, bold: true });
  for (let i = 0; i < 4; i++) s.arrow(xs[i] + 134, 87, xs[i + 1] - 2, 87, { sw: 1.6, color: 'accent' });
  s.text(395, 194, `Imagined rate: ${GS.rate} per cent of the selling price at every stage.`, { size: 13 });
  s.text(395, 224, `Paid to the government: ${fmt(GS.in0)} + ${fmt(GS.pay1)} + ${fmt(GS.pay2)} + ${fmt(GS.pay3)} = ${fmt(GS.govt)}, which is ${GS.rate} per cent of the final price.`, { size: 13, bold: true });
  s.text(395, 254, `Without credit, the three traders would pay ${fmt(GS.noCredit)} in all instead of ${fmt(GS.withCredit)}.`, { size: 13 });
  return s.visual(`Flow of an imagined furniture chain at an imagined goods and services tax rate of ${GS.rate} per cent. The timber supplier sells for ${W(GS.base0)} rupees with tax of ${W(GS.in0)} rupees. Devadaru Woodcraft sells for ${W(GS.s1)} rupees, charges tax of ${W(GS.out1)} rupees, claims credit of ${W(GS.in0)} rupees and pays ${W(GS.pay1)} rupees. The wholesaler sells for ${W(GS.s2)} rupees, charges ${W(GS.out2)} rupees, claims ${W(GS.out1)} rupees and pays ${W(GS.pay2)} rupees. The retailer sells for ${W(GS.s3)} rupees, charges ${W(GS.out3)} rupees, claims ${W(GS.out2)} rupees and pays ${W(GS.pay3)} rupees. The family pays ${W(GS.consumer)} rupees. The government receives ${W(GS.govt)} rupees in all`, 'Each stage pays tax only on the value it adds.');
})();

// ---------------------------------------------------------------- tables and flows
const vRoute1 = flow('LR', ['Internal trade', 'Wholesale services', 'Retail services', 'Itinerant retailers', 'Small fixed shops'], 'Route map of Part 1: internal trade, services of wholesalers, services of retailers, itinerant retailers and small fixed shops');
const vRoute2 = flow('LR', ['Departmental stores', 'Chain stores', 'Malls and supermarkets', 'Goods and services tax', 'Input tax credit'], 'Route map of Part 2: departmental stores, chain stores, malls and supermarkets, goods and services tax and input tax credit');
const vWsRt = table(['Point', 'Wholesale trade', 'Retail trade'], [
  ['Buys from', 'Producers and manufacturers', 'Wholesalers, sometimes producers'],
  ['Sells to', 'Retailers and industrial users', 'Final consumers'],
  ['Quantity', 'Large lots', 'Small quantities'],
  ['Imagined example', 'Lakshmi Wholesalers, notebooks', 'Kiran Stationers, notebooks'],
], 'Table comparing wholesale trade and retail trade on whom each buys from, whom each sells to, the quantity and an imagined example of notebooks through Lakshmi Wholesalers and Kiran Stationers', 'Two parts of internal trade.');
const vClue = table(['Imagined case', 'Kind of trade'], [
  [`Tarapur Notebooks sells ${fmt(NB.n)} notebooks to Lakshmi Wholesalers`, 'Sale to a wholesaler; the maker is the producer'],
  ['Lakshmi Wholesalers sells in lots to shops', 'Wholesale trade'],
  ['Kiran Stationers sells a few to students', 'Retail trade'],
  ['A school buys notebooks for its own pupils', 'Final consumer, so the seller is a retailer'],
], 'Worked example table of imagined cases and the kind of trade each shows: a maker selling to a wholesaler, a wholesaler selling in lots to shops, a shop selling a few to students, and a school buying for its pupils', 'Look at the buyer and the quantity.');
const vWsMfr = table(['Service to manufacturers', 'What it means'], [
  ['Large-scale production', 'Bulk orders let the maker plan a big output'],
  ['Bearing risk', 'The wholesaler holds stock and bears price falls, theft and damage'],
  ['Financial assistance', 'Prompt or advance payment gives the maker funds'],
  ['Expert advice', 'The wholesaler knows what the market wants'],
  ['Help in marketing', 'The wholesaler sells and spreads the goods'],
  ['Continuity of production', 'Steady buying keeps the mill running in slack months'],
  ['Storage', 'The godown of the wholesaler holds the stock'],
], 'Table of seven services of wholesalers to manufacturers: large-scale production, bearing risk, financial assistance, expert advice, help in marketing, continuity of production and storage, each with its meaning');
const vWsRet = table(['Service to retailers', 'What it means'], [
  ['Availability of goods', 'Shops can get goods when they need them'],
  ['Marketing support', 'Schemes, displays and promotion help the shop'],
  ['Grant of credit', 'The shop may pay after a period'],
  ['Specialised knowledge', 'Advice on goods, quality and use'],
  ['Risk sharing', 'The wholesaler bears part of the risk of price falls and damage'],
], 'Table of five services of wholesalers to retailers: availability of goods, marketing support, grant of credit, specialised knowledge and risk sharing, each with its meaning');
const vMargin = table(['Item (imagined notebooks)', 'Rs'], [
  [`Lakshmi Wholesalers: ${fmt(NB.n)} bought at Rs ${NB.mfr}`, fmt(NB.wsCost)],
  [`Sold at Rs ${NB.whole} each`, fmt(NB.wsRev)],
  ['Margin of the wholesaler', fmt(NB.wsMargin)],
  [`Kiran Stationers: ${fmt(NB.buy)} bought at Rs ${NB.whole}`, fmt(NB.rtCost)],
  [`Sold at Rs ${NB.retail} each`, fmt(NB.rtRev)],
  ['Margin of the retailer', fmt(NB.rtMargin)],
], `Worked example table: the wholesaler buys ${W(NB.n)} notebooks for ${W(NB.wsCost)} rupees and sells them for ${W(NB.wsRev)} rupees, a margin of ${W(NB.wsMargin)} rupees; the retailer buys ${W(NB.buy)} notebooks for ${W(NB.rtCost)} rupees and sells them for ${W(NB.rtRev)} rupees, a margin of ${W(NB.rtMargin)} rupees`, 'Selling value minus cost value.');
const vRetUp = table(['Service to producers and wholesalers', 'What it means'], [
  ['Distribution of goods', 'Takes goods to the final buyer'],
  ['Personal selling', 'Persuades buyers face to face'],
  ['Large-scale operations', 'Many small sales let producers run on a big scale'],
  ['Collecting market information', 'Reports tastes, complaints and trends'],
  ['Help in promotion', 'Displays and talks that promote the goods'],
], 'Table of five services of retailers to producers and wholesalers: distribution of goods, personal selling, large-scale operations, collecting market information and help in promotion');
const vRetCons = table(['Service to consumers', 'What it means'], [
  ['Regular availability', 'Daily needs are on sale near home'],
  ['Information on new products', 'The shop explains and shows new goods'],
  ['Convenience', 'Buyers can buy small amounts when they wish'],
  ['Wide selection', 'Many brands, sizes and prices to choose from'],
  ['After-sales service', 'Repair, replacement and delivery'],
  ['Credit facilities', 'Some shops let regular buyers pay later'],
], 'Table of six services of retailers to consumers: regular availability, information on new products, convenience, wide selection, after-sales service and credit facilities');
const vItin = table(['Itinerant retailer', 'Main feature', 'Imagined example'], [
  ['Peddlers and hawkers', 'Carry goods from place to place on a cart or head-load', 'Raju sells fruit in the lanes of Pindra'],
  ['Market traders', 'Visit periodic markets held on fixed days', 'Nandini sells pots at village markets'],
  ['Street traders', 'Set up at busy places such as a station or pavement', 'Uma sells watches outside a station'],
  ['Cheap jacks', 'Semi-permanent shops that shift between localities', 'Hari sells plastic goods and moves when demand falls'],
], 'Table of four itinerant retailers with main feature and an imagined example: hawkers such as Raju, market traders such as Nandini, street traders such as Uma and cheap jacks such as Hari', 'No fixed place of business.');
const vSmall = table(['Small-scale fixed shop', 'Main feature', 'Imagined example'], [
  ['General stores', 'Daily-use goods of many kinds in a small shop', 'A provision store in a lane of Madhugram'],
  ['Specialty shops', 'Deal in a particular kind of goods', 'A shop that sells only school uniforms'],
  ['Street stall holders', 'Small stalls at street corners selling cheap goods', 'A tea and snack stall at a crossing'],
  ['Second-hand goods shops', 'Buy and sell used articles at low prices', 'Bhola sells repaired used furniture'],
  ['Single-line stores', 'Deal in one line of goods', 'Harsha Shoe Corner sells only footwear'],
], 'Table of five small-scale fixed-shop retailers with main feature and an imagined example: general stores, specialty shops, street stall holders, second-hand goods shops and single-line stores');
const vFiveMark = table(['Step in a 5-mark answer', 'Example for the services of wholesalers'], [
  ['Write a line on meaning', 'A wholesaler buys in bulk and sells to retailers'],
  ['Group the points', 'Services to manufacturers; services to retailers'],
  ['One point, one line of explanation', 'Bearing risk: the loss from a price fall falls on the wholesaler'],
  ['Link to the case', 'Lakshmi Wholesalers stores notebooks and gives thirty days of credit'],
  ['Count to five', 'Two for the maker, two for the retailer, one for the case'],
], 'Worked example table of how to plan a five-mark answer on the services of wholesalers: a line on meaning, grouping the points, one line of explanation for each, a link to the case and counting to five', 'Plan the answer before writing.');
const vSummary1 = table(['Idea', 'Remember'], [
  ['Internal trade', 'Wholesale and retail trade within a country'],
  ['Wholesaler', 'Seven services to makers; five to retailers'],
  ['Retailer', 'Five services to producers and wholesalers; six to consumers'],
  ['Itinerant retailers', 'Hawkers, market traders, street traders, cheap jacks'],
  ['Small fixed shops', 'General, specialty, stall, second-hand, single-line'],
], 'Summary table of Part 1: internal trade, services of wholesalers, services of retailers, itinerant retailers and small fixed shops');
const vTips1 = table(['Common mistake', 'Fix'], [
  ['Mixing up the buyers of wholesalers and retailers', 'Wholesalers sell to retailers; retailers sell to consumers'],
  ['Listing services without saying to whom', 'Group them by receiver'],
  ['Calling a cheap jack a hawker', 'A cheap jack has a semi-permanent shop that shifts'],
  ['Naming real shops as examples', 'Use an imagined trader'],
], 'Exam tips table: four common mistakes about buyers of wholesalers and retailers, grouping services, cheap jacks and real shop names');

const vDept = table(['Point', 'Departmental store'], [
  ['Meaning', 'A large store with many departments under one roof'],
  ['Location', 'Usually at a central place in a city'],
  ['Buying', 'Centralised purchasing for all departments'],
  ['Imagined example', 'Mahanagar Emporium in Ratnapur'],
], 'Table of a departmental store: a large store with many departments under one roof, at a central place, with centralised purchasing, and an imagined example, Mahanagar Emporium in Ratnapur');
const vDeptML = table(['Merits', 'Limitations'], [
  ['Many goods in one place; convenient', 'High operating expenses, so higher prices'],
  ['Central location draws many buyers', 'Not convenient for small, daily needs far away'],
  ['Bulk buying lowers the cost', 'Less personal touch with each buyer'],
  ['Services such as delivery and a cafe', 'Heavy loss if the store does badly'],
], 'Table of merits of departmental stores: convenience, central location, bulk buying and services; and limitations: high expenses, distance for daily needs, less personal touch and heavy loss if the store does badly');
const vDeptEx = table(['Item (imagined Mahanagar Emporium)', 'Rs'], [
  ['Groceries', fmt(DS.groc)],
  ['Apparel', fmt(DS.app)],
  ['Electronics', fmt(DS.elec)],
  ['Home goods', fmt(DS.home)],
  ['Total sales of the month', fmt(DS.total)],
  [`Electronics share: ${fmt(DS.elec)} of ${fmt(DS.total)}`, `${DS.elecPct} per cent`],
], `Worked example table: department sales of ${W(DS.groc)}, ${W(DS.app)}, ${W(DS.elec)} and ${W(DS.home)} rupees total ${W(DS.total)} rupees, and electronics is ${DS.elecPct} per cent of the total`, 'Add the departments, then find the share.');
const vChain = table(['Point', 'Chain store (multiple shops)'], [
  ['Meaning', 'Identical shops in many localities, owned by one firm'],
  ['Buying', 'Centralised purchasing for all shops'],
  ['Price', 'Standardised prices, the same in every shop'],
  ['Imagined example', 'Charan Footwear, forty shoe shops'],
], 'Table of a chain store: identical shops in many localities owned by one firm, with centralised purchasing, standard prices and an imagined example, Charan Footwear with forty shoe shops');
const vChainML = table(['Merits', 'Limitations'], [
  ['Economies of bulk buying', 'Little freedom for local shops'],
  ['Same prices and quality everywhere', 'Suits only standard, fast-selling goods'],
  ['Risk is spread over many shops', 'Less personal touch; mostly cash sales'],
  ['Easy to move stock between shops', 'Heavy supervision from the head office'],
], 'Table of merits of chain stores: bulk buying, same prices and quality, spread of risk and easy movement of stock; and limitations: little freedom, only standard goods, less personal touch and heavy supervision');
const vChainEx = table(['Item (imagined Charan Footwear)', 'Figure'], [
  [`${CH.stores} shops times ${CH.pairs} pairs`, `${fmt(CH.total)} pairs`],
  [`At Rs ${CH.bulk} a pair in one order`, `Rs ${fmt(CH.bulkCost)}`],
  [`At Rs ${CH.solo} a pair if each shop buys alone`, `Rs ${fmt(CH.soloCost)}`],
  ['Saving from central buying', `Rs ${fmt(CH.saving)}`],
], `Worked example table: ${W(CH.stores)} shops buying ${W(CH.pairs)} pairs each need ${W(CH.total)} pairs; at ${W(CH.bulk)} rupees a pair the cost is ${W(CH.bulkCost)} rupees against ${W(CH.soloCost)} rupees if each shop buys alone, a saving of ${W(CH.saving)} rupees`, 'Compare the two total costs.');
const vDvC = table(['Basis', 'Departmental store', 'Chain store'], [
  ['Location', 'One central place', 'Many localities'],
  ['Range of products', 'Many lines under one roof', 'Narrow range of standard goods'],
  ['Services', 'Many, such as delivery and a cafe', 'Few'],
  ['Price', 'Often higher, because of high costs', 'Standard price in every shop'],
  ['Credit', 'May be allowed', 'Usually cash sales'],
], 'Table comparing a departmental store and a chain store on location, range of products, services, price and credit');
const vMall = table(['Form', 'Meaning'], [
  ['Shopping mall', 'A large complex with many retail shops, often food courts and entertainment, under one roof'],
  ['Supermarket', 'A large self-service store, selling mainly food and daily-use goods'],
  ['Other forms', 'Mail-order houses and vending machines sell without a shop counter'],
], 'Table of shopping malls as large complexes of many shops under one roof, supermarkets as large self-service stores for food and daily-use goods, and other forms such as mail-order houses and vending machines');
const vGst = table(['Point', 'Goods and services tax'], [
  ['Meaning', 'An indirect tax on the supply of goods and services'],
  ['Start', '1 July 2017, through the Constitution (101st Amendment) Act 2016'],
  ['Idea', 'One nation, one tax: it replaced many separate taxes'],
  ['Who pays', 'The final consumer bears it; traders collect and pass it on'],
], 'Table of goods and services tax as an indirect tax on the supply of goods and services, introduced on 1 July 2017 through the Constitution 101st Amendment Act 2016, with the idea of one nation, one tax, borne by the final consumer');
const vGstTypes = table(['Tax', 'Where it applies'], [
  ['Central goods and services tax', 'Supplies within a state; goes to the Centre'],
  ['State goods and services tax', 'Supplies within a state; goes to the state'],
  ['Union territory tax', 'Supplies within a union territory, in place of the state tax'],
  ['Integrated goods and services tax', 'Supplies between states and imports'],
], 'Table of the taxes under goods and services tax: central and state tax on supplies within a state, union territory tax in union territories, and integrated tax on supplies between states and imports');
const vGstSplit = table(['Imagined sale of Rs 50,000 at an imagined 8 per cent', 'Tax'], [
  ['Within one state: central tax at 4 per cent', `Rs ${fmt(IM.half)}`],
  ['Within one state: state tax at 4 per cent', `Rs ${fmt(IM.half)}`],
  ['Total within one state', `Rs ${fmt(IM.tax)}`],
  ['Between two states: integrated tax at 8 per cent', `Rs ${fmt(IM.tax)}`],
], `Worked table: a sale of ${W(IM.value)} rupees at an imagined rate of eight per cent bears central tax of ${W(IM.half)} rupees and state tax of ${W(IM.half)} rupees within a state, or integrated tax of ${W(IM.tax)} rupees between states`, 'Same total, different heads.');
const vGstFeat = table(['Feature', 'What it means'], [
  ['Destination-based', 'Revenue goes to the place of consumption'],
  ['Dual structure', 'Central tax and state tax together within a state'],
  ['Integrated tax', 'Charged by the Centre on supplies between states and on imports'],
  ['Input tax credit', 'Tax paid on purchases is set off against tax on sales'],
  ['One nation, one tax', 'A single tax system across the country'],
], 'Table of five features of goods and services tax: destination-based, dual structure, integrated tax, input tax credit and one nation one tax');
const vGstFeat2 = table(['Feature', 'What it means'], [
  ['The Council', 'Union and state ministers recommend rates and rules'],
  ['Rate slabs', 'A small number of slabs, plus exempt and special categories, set and revised by the Council'],
  ['Registration', 'Needed for businesses above a threshold turnover; the threshold is set by law and may change'],
], 'Table of three more features: the Goods and Services Tax Council of Union and state ministers, a small number of rate slabs with exempt and special categories, and registration above a threshold turnover');
const vGstBen = table(['Benefit', 'How'], [
  ['A common national market', 'One tax across states lowers trade barriers'],
  ['No cascading', 'Input tax credit stops tax on tax'],
  ['Simpler compliance', 'Fewer taxes and one system of returns'],
  ['Transparency', 'The tax in a price is easy to see'],
], 'Table of four benefits of goods and services tax: a common national market, no cascading, simpler compliance and transparency');
const vItcEx = table(['Trader', 'Tax on sale', 'Credit', 'Pays'], [
  ['Devadaru Woodcraft', `Rs ${fmt(GS.out1)}`, `Rs ${fmt(GS.in0)}`, `Rs ${fmt(GS.pay1)}`],
  ['Wholesaler', `Rs ${fmt(GS.out2)}`, `Rs ${fmt(GS.out1)}`, `Rs ${fmt(GS.pay2)}`],
  ['Retailer', `Rs ${fmt(GS.out3)}`, `Rs ${fmt(GS.out2)}`, `Rs ${fmt(GS.pay3)}`],
], `Worked example table at an imagined rate of eight per cent: Devadaru Woodcraft charges ${W(GS.out1)} rupees, claims ${W(GS.in0)} and pays ${W(GS.pay1)}; the wholesaler charges ${W(GS.out2)}, claims ${W(GS.out1)} and pays ${W(GS.pay2)}; the retailer charges ${W(GS.out3)}, claims ${W(GS.out2)} and pays ${W(GS.pay3)}`, 'Tax on sale minus credit.');
const vSummary2 = table(['Idea', 'Remember'], [
  ['Departmental store', 'Many departments, central place, central buying'],
  ['Chain store', 'Identical shops, one owner, central buying, standard price'],
  ['Malls and supermarkets', 'Many shops in one complex; self-service food store'],
  ['Goods and services tax', 'Indirect, destination-based, dual and integrated'],
  ['Input tax credit', 'Set off purchase tax; avoids cascading'],
], 'Summary table of Part 2: departmental store, chain store, malls and supermarkets, goods and services tax and input tax credit');
const vTips2 = table(['Common mistake', 'Fix'], [
  ['Stating the rate slabs of goods and services tax', 'Say there are a few slabs set and revised by the Council'],
  ['Using a rate as if it were current in a worked example', 'Say at an imagined rate of so many per cent'],
  ['Mixing up the central, state and integrated taxes', 'Within a state: central and state; between states: integrated'],
  ['Comparing store types on one point only', 'Use location, range, services, price and credit'],
], 'Exam tips table: four common mistakes about stating rate slabs, using a rate as current, mixing up the three taxes and comparing store types on one point');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Wholesale, Retail and Small Retailers',
  goals: [
    'Explain internal trade and its two parts, wholesale and retail trade',
    'Describe the services of wholesalers to manufacturers and retailers',
    'Describe the services of retailers to producers, wholesalers and consumers',
    'Classify itinerant and small-scale fixed-shop retailers',
  ],
  slides: [
    sl('title', 'Wholesale, Retail and Small Retailers', {
      b: 'Part 1: how goods travel inside a country, and the many kinds of small retailers.',
      v: vRoute1,
      n: 'Every notebook in a school bag, every fruit on a cart, has travelled through traders. In this part we study internal trade, the services of wholesalers and retailers, and the many kinds of small retailers who bring goods close to us.',
    }),
    sl('concept', 'What is internal trade?', {
      b: '**Internal trade** is the buying and selling of goods and services within the boundaries of a country.',
      v: vTree,
      n: 'Internal trade is the buying and selling of goods and services within one country. It has two parts. Wholesale trade deals in bulk with retailers and industrial users. Retail trade sells small lots to final buyers. Trade between countries is international trade, which is another chapter.',
    }),
    sl('concept', 'Wholesale trade and retail trade compared', {
      v: vWsRt,
      n: 'A wholesaler buys from producers in large lots and sells to retailers and industrial users. A retailer buys from wholesalers and sells small quantities to final consumers. In our imagined example, Lakshmi Wholesalers supplies notebooks to shops, and Kiran Stationers sells them to students.',
    }),
    sl('example', 'Worked example 1: which kind of trade?', {
      b: 'Decide whether each imagined case shows a wholesaler or a retailer. Look at the buyer and the quantity.',
      bl: ['Step 1: Find who is buying.', 'Step 2: Check the quantity.', 'Step 3: Name the kind of trade.'],
      v: vClue,
      n: 'The maker sells to a wholesaler. The wholesaler sells in lots to shops, which is wholesale trade. The shop sells a few notebooks to students, which is retail trade. A school buying for its own pupils is a final consumer, so the seller to the school is a retailer. Always look at the buyer and the quantity.',
    }),
    sl('diagram', 'Services of a wholesaler', {
      v: vWs,
      n: 'This chart shows the services of a wholesaler. To manufacturers: large scale production, bearing risk, financial assistance, expert advice, help in marketing, continuity of production, and storage. To retailers: availability of goods, marketing support, grant of credit, specialised knowledge, and risk sharing.',
    }),
    sl('concept', 'Services to manufacturers explained', {
      v: vWsMfr,
      n: 'Bulk orders let a maker produce on a large scale. The wholesaler holds stock and takes the loss when prices fall or goods are damaged. Prompt or advance payment gives funds. The wholesaler also advises on the market, helps in marketing, keeps the mill running in slack months, and stores the goods.',
    }),
    sl('concept', 'Services to retailers explained', {
      v: vWsRet,
      n: 'A shop can get goods whenever it needs them. The wholesaler offers schemes and displays, allows the shop to pay after a period, gives advice on goods, and shares the risk of price falls and damage. Because of this, even a small shop can stock a wide range.',
    }),
    sl('check', 'Quick check: which service to the retailer?', {
      b: 'An imagined shop pays its wholesaler thirty days after delivery. Name the service.',
      chk: 'mc_credit',
      n: 'Think about what the wholesaler allows the shop to do with the payment.',
    }),
    sl('example', 'Worked example 2: margins along the chain', {
      b: 'Find the margin of an imagined wholesaler and of an imagined retailer on a lot of notebooks.',
      bl: ['Step 1: Find the cost of the lot.', 'Step 2: Find what the lot sells for.', 'Step 3: Subtract to get the margin.'],
      v: vMargin,
      n: `Lakshmi Wholesalers buys five thousand notebooks for ${W(NB.wsCost)} rupees and sells them for ${W(NB.wsRev)} rupees, a margin of ${W(NB.wsMargin)} rupees. Kiran Stationers buys five hundred notebooks for ${W(NB.rtCost)} rupees and sells them for ${W(NB.rtRev)} rupees, a margin of ${W(NB.rtMargin)} rupees.`,
    }),
    sl('diagram', 'Services of a retailer', {
      v: vRt,
      n: 'This chart shows the services of a retailer. To producers and wholesalers: distribution of goods, personal selling, large scale operations, market information, and help in promotion. To consumers: regular availability, information on new products, convenience, wide selection, after sales service, and credit facilities.',
    }),
    sl('concept', 'Services to producers and wholesalers explained', {
      v: vRetUp,
      n: 'A retailer takes goods to the final buyer and persuades buyers face to face. Many small sales let producers run on a large scale. The retailer reports tastes and complaints, which helps producers improve their goods, and displays the goods in ways that help promotion.',
    }),
    sl('concept', 'Services to consumers explained', {
      v: vRetCons,
      n: 'A retailer keeps daily needs on sale near home and explains new products. Buyers can buy small amounts when they wish and choose among many brands, sizes and prices. The retailer also offers repair, replacement or delivery after the sale, and some shops let regular buyers pay later.',
    }),
    sl('check', 'Quick check: new products', {
      b: 'An imagined shop shows a customer how a newly launched pressure cooker works. Name the service.',
      chk: 'mc_info',
      n: 'Think about what the shop tells the buyer before the buyer decides.',
    }),
    sl('diagram', 'Types of retail trade', {
      v: vTypes,
      n: 'Retailers fall into three groups. Itinerant retailers have no fixed place of business. Small scale fixed shop retailers have a shop of modest size. Large scale fixed shop retailers include departmental stores and chain stores, which we study in Part 2, and also shopping malls and supermarkets.',
    }),
    sl('concept', 'Itinerant retailers', {
      v: vItin,
      n: 'A hawker like Raju carries goods from place to place. A market trader like Nandini visits periodic markets on fixed days. A street trader like Uma sets up at a busy place such as a station. A cheap jack like Hari has a semi permanent shop that shifts between localities as demand changes.',
    }),
    sl('check', 'Quick check: name the retailer', {
      b: 'An imagined trader packs up his small plastic goods shop and moves to another locality when buyers become few. Name the retailer.',
      chk: 'mc_cheapjack',
      n: 'Think about a shop that is not fixed for ever.',
    }),
    sl('concept', 'Small-scale fixed-shop retailers', {
      v: vSmall,
      n: 'These retailers have a fixed shop. General stores sell daily use goods of many kinds. Specialty shops deal in a particular kind of goods. Street stall holders have small stalls at street corners. Second hand goods shops sell used articles at low prices. Single line stores deal in one line of goods.',
    }),
    sl('example', 'Worked example 3: planning a five-mark answer', {
      b: 'Plan an answer on the services of wholesalers before writing it.',
      bl: ['Step 1: Start with a line of meaning.', 'Step 2: Group the points by receiver.', 'Step 3: Link one point to an imagined firm.'],
      v: vFiveMark,
      n: 'Begin with a line on what a wholesaler is. Group the services by receiver, those to manufacturers and those to retailers. Give one point and one line of explanation each. Link one point to the case, such as the credit that Lakshmi Wholesalers gives. Count to five before you finish.',
    }),
    sl('check', 'Quick check: single line store', {
      b: 'An imagined shop sells only footwear, in many makes and sizes. Name the kind of shop.',
      chk: 'mc_singleline',
      n: 'Think about the number of lines of goods the shop deals in.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up. Internal trade has a wholesale part and a retail part. Wholesalers give seven services to makers and five to retailers. Retailers give five services to producers and wholesalers and six to consumers. Itinerant retailers have no fixed place, and small fixed shops come in five kinds.',
    }),
    sl('exam-tips', 'Exam tips', {
      v: vTips1,
      bl: ['Group services by receiver.', 'Use an imagined trader as the example.'],
      n: 'Some tips. Always say to whom a service is given. Do not call a cheap jack a hawker, since a cheap jack has a semi permanent shop. Check the buyer and the quantity before you decide between wholesale and retail. And use an imagined trader in your examples, never a real shop.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Large-scale Retail and Goods and Services Tax',
  goals: [
    'Describe departmental stores and chain stores with merits and limitations',
    'Compare a departmental store with a chain store',
    'Explain the meaning and main features of goods and services tax',
    'Work out input tax credit in an imagined three-stage chain',
  ],
  slides: [
    sl('title', 'Large-scale Retail and Goods and Services Tax', {
      b: 'Part 2: big retail formats, and the tax that every sale carries.',
      v: vRoute2,
      n: 'Some retailers are very large. In this part we study departmental stores, chain stores, malls and supermarkets. Then we turn to the goods and services tax, which every trader along the supply chain meets.',
    }),
    sl('concept', 'Departmental stores', {
      b: 'A **departmental store** is a large retail store with many departments under one roof.',
      v: vDept,
      n: 'A departmental store is a large store with many departments under one roof. It usually stands at a central place in a city and buys centrally for all its departments. Our imagined example is Mahanagar Emporium in the imagined city of Ratnapur.',
    }),
    sl('concept', 'Merits and limitations of departmental stores', {
      v: vDeptML,
      n: 'Buyers find many goods in one place, and the central location draws crowds. Bulk buying lowers cost, and services such as delivery and a cafe attract buyers. The limitations are high operating expenses that raise prices, less personal touch, and heavy loss if the store does badly.',
    }),
    sl('example', 'Worked example 1: sales by department', {
      b: 'Mahanagar Emporium, an imagined departmental store, lists the sales of its four departments. Find the total and the share of electronics.',
      bl: ['Step 1: Add the four departments.', 'Step 2: Divide electronics by the total.', 'Step 3: Express it as a percentage.'],
      v: vDeptEx,
      n: `The four departments sold goods worth ${W(DS.total)} rupees in the month. Electronics sold ${W(DS.elec)} rupees. Dividing electronics by the total and multiplying by one hundred gives forty per cent, so electronics is the largest department.`,
    }),
    sl('concept', 'Chain stores', {
      b: 'A **chain store** is a group of identical shops in many localities, owned by one firm.',
      v: vChain,
      n: 'A chain store, also called multiple shops, is a group of identical shops in different localities, owned by one firm. The firm buys centrally and fixes standard prices. Our imagined example is Charan Footwear, with forty shoe shops.',
    }),
    sl('concept', 'Merits and limitations of chain stores', {
      v: vChainML,
      n: 'Chain stores enjoy economies of bulk buying and give the same prices and quality everywhere. Risk is spread over many shops, and stock can be moved between them. The limitations are little freedom for local shops, suitability only for standard fast selling goods, less personal touch, and heavy supervision.',
    }),
    sl('example', 'Worked example 2: central buying saves money', {
      b: 'Charan Footwear, an imagined chain, buys for all its shops at once. Find the saving.',
      bl: ['Step 1: Find the total pairs.', 'Step 2: Find the cost in one order and the cost if each shop buys alone.', 'Step 3: Subtract.'],
      v: vChainEx,
      n: `Forty shops times sixty pairs give ${W(CH.total)} pairs. In a single order at ${W(CH.bulk)} rupees a pair, the cost is ${W(CH.bulkCost)} rupees. If each shop bought alone at ${W(CH.solo)} rupees, the cost would be ${W(CH.soloCost)} rupees. Central buying saves ${W(CH.saving)} rupees.`,
    }),
    sl('check', 'Quick check: which merit?', {
      b: 'A chain buys sixty pairs for each of forty shops in one order and gets a lower price. Name the merit.',
      chk: 'mc_chain_merit',
      n: 'Think about what a very large combined order does to the price.',
    }),
    sl('concept', 'Departmental store and chain store compared', {
      v: vDvC,
      n: 'A departmental store is at one central place, while a chain has shops in many localities. A departmental store sells many lines, while a chain sells a narrow range of standard goods. A departmental store gives many services and often charges more, while a chain fixes one price and usually sells for cash.',
    }),
    sl('concept', 'Shopping malls and supermarkets', {
      v: vMall,
      n: 'A shopping mall is a large complex with many retail shops, often with food courts and entertainment, under one roof. A supermarket is a large self service store that sells mainly food and daily use goods. Mail order houses and vending machines sell without a shop counter.',
    }),
    sl('concept', 'What is goods and services tax?', {
      b: '**Goods and services tax (GST)** is an indirect tax on the supply of goods and services.',
      v: vGst,
      n: 'Goods and services tax is an indirect tax on the supply of goods and services. It began on the first of July two thousand seventeen, through the Constitution one hundred and first Amendment Act of two thousand sixteen. It replaced many separate taxes, and the final consumer bears it.',
    }),
    sl('concept', 'Dual structure and integrated tax', {
      v: vGstTypes,
      n: 'On a supply within a state, two taxes are charged: central goods and services tax and state goods and services tax. In a union territory, union territory tax takes the place of the state tax. On a supply between states, and on imports, the Centre charges integrated goods and services tax.',
    }),
    sl('example', 'Worked example 3: the same sale in two settings', {
      b: 'An imagined sale of fifty thousand rupees at an imagined rate of eight per cent. Compare a sale within a state with one between states.',
      bl: ['Step 1: Find the total tax at the imagined rate.', 'Step 2: Within a state, split it into two equal heads.', 'Step 3: Between states, it all goes as integrated tax.'],
      v: vGstSplit,
      n: `At an imagined rate of eight per cent, the tax on fifty thousand rupees is ${W(IM.tax)} rupees. Within a state it is split equally, ${W(IM.half)} rupees as central tax and ${W(IM.half)} rupees as state tax. Between states, the whole ${W(IM.tax)} rupees is integrated tax.`,
    }),
    sl('concept', 'Main features of goods and services tax', {
      v: vGstFeat,
      n: 'The tax is destination based, so revenue goes to the place of consumption. It has a dual structure within a state and an integrated tax between states. Input tax credit sets off tax paid on purchases against tax on sales. The idea is one nation, one tax.',
    }),
    sl('concept', 'The Council, rate slabs and registration', {
      v: vGstFeat2,
      n: 'The Goods and Services Tax Council is a body of Union and state ministers that recommends rates and rules. The rates are arranged in a small number of slabs, plus exempt and special categories, and the Council can revise them. Businesses above a threshold turnover must register, and the threshold is set by law and may change.',
    }),
    sl('check', 'Quick check: removing cascading', {
      b: 'Which feature stops tax from being charged on tax at each stage of the chain?',
      chk: 'mc_cascade',
      n: 'Think about what a trader deducts from the tax due on sales.',
    }),
    sl('diagram', 'Input tax credit in a chain', {
      v: vItc,
      n: `This chart follows an imagined furniture chain at an imagined rate of eight per cent. The timber supplier charges ${W(GS.in0)} rupees. Each trader charges tax on the sale, claims credit for the tax paid on purchases, and pays only the difference. The government receives ${W(GS.govt)} rupees in all, which is eight per cent of the final price.`,
    }),
    sl('example', 'Worked example 4: input tax credit stage by stage', {
      b: 'Find the tax paid by each trader in the furniture chain at an imagined rate of eight per cent.',
      bl: ['Step 1: Find the tax charged on the sale.', 'Step 2: Subtract the credit for the tax on purchases.', 'Step 3: The balance is the tax paid.'],
      v: vItcEx,
      n: `Devadaru Woodcraft charges ${W(GS.out1)} rupees, claims ${W(GS.in0)} rupees and pays ${W(GS.pay1)} rupees. The wholesaler charges ${W(GS.out2)}, claims ${W(GS.out1)} and pays ${W(GS.pay2)}. The retailer charges ${W(GS.out3)}, claims ${W(GS.out2)} and pays ${W(GS.pay3)}. Each trader pays on the value it adds.`,
    }),
    sl('check', 'Quick check: order of the chain', {
      b: 'Arrange the parties of the furniture chain in the order in which the goods pass.',
      chk: 'od_itc',
      n: 'Start with the timber and end with the family that buys the furniture.',
    }),
    sl('concept', 'Benefits of goods and services tax', {
      v: vGstBen,
      n: 'A common national market is created, since one tax across states lowers barriers. Cascading is removed by input tax credit. Compliance becomes simpler, with fewer taxes and one system of returns. And the tax is transparent, since the tax in a price is easy to see.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up. A departmental store has many departments at a central place with central buying. A chain store has identical shops with central buying and standard prices. Goods and services tax is indirect and destination based, with central, state and integrated taxes. Input tax credit avoids cascading.',
    }),
    sl('exam-tips', 'Exam tips', {
      v: vTips2,
      bl: ['Do not state rate slabs; say a few slabs set by the Council.', 'In any worked tax example, write at an imagined rate.'],
      n: 'Some tips. Do not state rate slabs, since they are revised by the Council. Say that there are a few slabs. In any worked example, use an imagined rate. Remember that within a state it is central and state tax, and between states it is integrated tax. And compare stores on five bases.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Internal Trade: notes',
  sections: [
    {
      h: '1. Internal trade, wholesale and retail trade',
      t: 1,
      b: '**Internal trade** is the buying and selling of goods and services within the boundaries of a country. It has two parts.\n\n1. **Wholesale trade:** buying in large quantities and selling to retailers or industrial users.\n2. **Retail trade:** selling in small quantities to final consumers.\n\n**Worked check:** Lakshmi Wholesalers buys 5,000 notebooks at Rs 40 and sells at Rs 46, a margin of Rs 30,000; Kiran Stationers buys 500 at Rs 46 and sells at Rs 55, a margin of Rs 4,500.',
      terms: [['Internal trade', 'Buying and selling of goods and services inside a country.'], ['Wholesaler', 'A trader who buys in large quantities and sells to retailers or industrial users.'], ['Retailer', 'A trader who sells goods in small quantities to final consumers.']],
      v: vTree,
      vs: [vWsRt, vMargin],
    },
    {
      h: '2. Services of wholesalers',
      t: 1,
      b: '**To manufacturers:** large-scale production; bearing risk; financial assistance; expert advice; help in marketing; continuity of production; storage.\n\n**To retailers:** availability of goods; marketing support; grant of credit; specialised knowledge; risk sharing.',
      terms: [['Bearing risk', 'Taking over the loss from price falls, theft, damage and spoilage.'], ['Grant of credit', 'Allowing a retailer to pay some time after delivery.']],
      v: vWs,
      vs: [vWsMfr, vWsRet],
    },
    {
      h: '3. Services of retailers',
      t: 1,
      b: '**To producers and wholesalers:** distribution of goods; personal selling; enabling large-scale operations; collecting market information; help in promotion.\n\n**To consumers:** regular availability; information on new products; convenience; wide selection; after-sales service; credit facilities.',
      terms: [['Personal selling', 'Persuading buyers face to face.'], ['After-sales service', 'Repair, replacement or delivery that a seller gives after a sale.']],
      v: vRt,
      vs: [vRetUp, vRetCons],
    },
    {
      h: '4. Types of retail trade: itinerant and small fixed shops',
      t: 2,
      b: '**Itinerant retailers** have no fixed place of business: peddlers and hawkers; market traders (who visit periodic markets); street traders (pavement vendors); cheap jacks (semi-permanent shops that shift between localities).\n\n**Small-scale fixed-shop retailers:** general stores; specialty shops; street stall holders; second-hand goods shops; single-line stores.',
      terms: [['Itinerant retailer', 'A retailer with no fixed place of business, who moves to the buyers.'], ['Single-line store', 'A fixed shop that deals in one line of goods.']],
      v: vTypes,
      vs: [vItin, vSmall],
    },
    {
      h: '5. Large-scale retailers: departmental and chain stores, malls',
      t: 2,
      b: '**Departmental store:** many departments under one roof, a central location and centralised purchasing. **Merits:** convenience; central location; bulk buying; services. **Limitations:** high operating expenses; less personal touch; heavy loss if it fails.\n\n**Chain store (multiple shops):** identical shops in many localities, owned by one firm, with centralised purchasing and standard prices. **Merits:** bulk buying; same price and quality; spread of risk. **Limitations:** little freedom for the local shop; suited only to standard goods; less personal touch.\n\n**Shopping mall:** a large complex of many shops under one roof. **Supermarket:** a large self-service store for food and daily-use goods.\n\n**Worked check:** 40 shops times 60 pairs is 2,400 pairs; at Rs 640 a pair the cost is Rs 15,36,000 against Rs 16,80,000 at Rs 700, a saving of Rs 1,44,000.',
      terms: [['Departmental store', 'A large retail store with many departments under one roof.'], ['Chain store', 'A group of identical shops in many localities, owned by one firm.']],
      v: vDvC,
      vs: [vDept, vDeptML, vDeptEx, vChain, vChainML, vChainEx, vMall],
    },
    {
      h: '6. Goods and services tax and its features',
      t: 3,
      b: '**Goods and services tax (GST)** is an indirect tax on the supply of goods and services. It began on 1 July 2017 through the Constitution (101st Amendment) Act 2016.\n\n**Features:**\n1. **Destination-based:** revenue goes to the place of consumption.\n2. **Dual structure:** central tax and state tax on supplies within a state (union territory tax in union territories).\n3. **Integrated tax:** on supplies between states and on imports.\n4. **Input tax credit:** tax paid on purchases is set off against tax on sales.\n5. **One nation, one tax.**\n6. **Council:** Union and state ministers recommend rates and rules.\n7. **A small number of rate slabs**, plus exempt and special categories, set and revised by the Council.\n8. **Registration** for businesses above a threshold turnover; the threshold is set by law and may change.\n\n**Dated note:** the rate structure has been revised more than once, including a restructuring of the slabs in 2025. Rates are not stated here; any rate in a worked example is imagined.',
      terms: [['Goods and services tax', 'An indirect tax on the supply of goods and services.'], ['Integrated goods and services tax', 'The tax on supplies between states and on imports.'], ['Input tax credit', 'Set-off of tax paid on purchases against tax payable on sales.']],
      v: vGstFeat,
      vs: [vGstFeat2, vGstTypes, vGstSplit],
    },
    {
      h: '7. Input tax credit and benefits of goods and services tax',
      t: 3,
      b: '**Input tax credit** lets a trader pay tax only on the value that it adds. **Worked check at an imagined rate of 8 per cent:** Devadaru Woodcraft charges Rs 5,600 and has credit of Rs 3,200, so it pays Rs 2,400; the wholesaler charges Rs 7,200 less credit of Rs 5,600, so it pays Rs 1,600; the retailer charges Rs 9,600 less credit of Rs 7,200, so it pays Rs 2,400. With the Rs 3,200 on timber, the government receives Rs 9,600, which is 8 per cent of Rs 1,20,000.\n\n**Benefits:** a common national market; removal of the cascading effect; simpler compliance; transparency.',
      terms: [['Cascading of taxes', 'Tax being charged on tax already paid at an earlier stage.']],
      v: vItc,
      vs: [vItcEx, vGstBen],
    },
  ],
  tips: '**Common mistakes**\n- Mixing up the buyers of wholesalers and retailers.\n- Listing services without saying to whom they are given.\n- Calling a cheap jack a hawker.\n- Comparing a departmental store with a chain store on one point only; use location, range, services, price and credit.\n- Stating rate slabs of goods and services tax; say that there are a few slabs, set and revised by the Council.\n- Using a rate as if it were current in a worked example; write at an imagined rate.\n- Mixing up central, state and integrated tax.\n- Naming real shops or companies; use imagined ones.\n\n**How marks are usually awarded**\n- 1 mark: a correct option or a quoted line from the case.\n- 2 and 3 marks: one point per service, merit, limitation or feature, with a short explanation.\n- 5 marks: five points, each with an explanation, in a numbered list.\n- Case questions: quote the line, name the concept, show the working for a figure.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Internal trade**', 'Buying and selling of goods and services within the boundaries of a country.', 'definition', 1],
  ['Two parts of internal trade', 'Wholesale trade and retail trade.', 'fact', 1],
  ['**Wholesaler**', 'A trader who buys in large quantities and sells to retailers or industrial users.', 'definition', 1],
  ['**Retailer**', 'A trader who sells in small quantities to final consumers.', 'definition', 1],
  ['Services of wholesalers to manufacturers', 'Large-scale production; bearing risk; financial assistance; expert advice; help in marketing; continuity of production; storage.', 'fact', 1],
  ['Services of wholesalers to retailers', 'Availability of goods; marketing support; grant of credit; specialised knowledge; risk sharing.', 'fact', 1],
  ['Services of retailers to producers and wholesalers', 'Distribution; personal selling; large-scale operations; market information; help in promotion.', 'fact', 1],
  ['Services of retailers to consumers', 'Regular availability; information on new products; convenience; wide selection; after-sales service; credit facilities.', 'fact', 1],
  ['**Bearing risk** (wholesaler)', 'The wholesaler holds stock and takes the loss from price falls, theft and damage.', 'concept', 1],
  ['How to tell wholesale from retail', 'Look at the buyer and the quantity: retailers in lots means wholesale; consumers in small quantities means retail.', 'exam-tip', 1],
  ['**Itinerant retailers**', 'Retailers with no fixed place of business, who move to the buyers.', 'definition', 2],
  ['Kinds of itinerant retailer', 'Peddlers and hawkers; market traders; street traders; cheap jacks.', 'fact', 2],
  ['**Cheap jack**', 'A small trader with a semi-permanent shop who shifts between localities as demand changes.', 'definition', 2],
  ['**Market trader**', 'A retailer who visits periodic markets held on fixed days.', 'definition', 2],
  ['Kinds of small fixed shop', 'General stores; specialty shops; street stall holders; second-hand goods shops; single-line stores.', 'fact', 2],
  ['**Single-line store**', 'A fixed shop that deals in one line of goods.', 'definition', 2],
  ['**Departmental store**', 'A large retail store with many departments under one roof, at a central place, with centralised purchasing.', 'definition', 2],
  ['Merits of departmental stores', 'Convenience; central location; bulk buying; services such as delivery.', 'fact', 2],
  ['Limitations of departmental stores', 'High operating expenses and prices; less personal touch; heavy loss if the store fails.', 'fact', 2],
  ['**Chain store** (multiple shops)', 'Identical shops in many localities, owned by one firm, with centralised purchasing and standard prices.', 'definition', 2],
  ['Merits of chain stores', 'Bulk buying; same price and quality everywhere; spread of risk.', 'fact', 2],
  ['Limitations of chain stores', 'Little freedom for local shops; suited only to standard goods; less personal touch.', 'fact', 2],
  ['Departmental store against chain store', 'Compare on location, range of products, services, price and credit.', 'exam-tip', 2],
  ['**Shopping mall**', 'A large complex of many retail shops, often with food courts and entertainment, under one roof.', 'definition', 2],
  ['**Supermarket**', 'A large self-service store that sells mainly food and daily-use goods.', 'definition', 2],
  ['**Goods and services tax**', 'An indirect tax on the supply of goods and services.', 'definition', 3],
  ['Start of goods and services tax', '1 July 2017, through the Constitution (101st Amendment) Act 2016.', 'fact', 3],
  ['Destination-based tax', 'The revenue goes to the place where the goods or services are consumed.', 'concept', 3],
  ['Central and state tax', 'Both are charged on a supply within a state; union territory tax replaces the state tax in union territories.', 'fact', 3],
  ['**Integrated goods and services tax**', 'Charged on supplies between states and on imports.', 'definition', 3],
  ['**Input tax credit**', 'Set-off of tax paid on purchases against tax payable on sales; it avoids cascading.', 'definition', 3],
  ['The Goods and Services Tax Council', 'A body of Union and state ministers that recommends rates and rules.', 'fact', 3],
  ['Benefits of goods and services tax', 'A common national market; no cascading; simpler compliance; transparency.', 'fact', 3],
  ['Rate slabs in an answer', 'Say a small number of slabs, plus exempt and special categories, set and revised by the Council; never state the percentages.', 'exam-tip', 3],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short): Internal Trade',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['mc_ws_id', 'mc_chain_id', 'mc_cgst', 'ar_itc'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer the 2-mark questions in about 30 to 50 words and the 3-mark question in about 50 to 80 words.', items: ['s2_ws_ret', 's2_dest', 's3_dept_merits'] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80 to 120 words.', items: [{ attempt: 1, keys: ['l_ws_services', 'l_types'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks)', instr: 'Read the case and answer all parts. Part (c) has an internal choice.', items: ['cb_charan'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long): Internal Trade',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['mc_trade_def', 'mc_risk', 'mc_market_trader', 'mc_dept_id', 'mc_chain_lim', 'mc_gst_def', 'mc_igst', 'mc_itc_calc', 'ar_ws', 'ar_chain'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and 3-mark questions in about 50 to 80 words. Questions 13 and 15 have an internal choice.', items: ['s2_trade_def', 's2_hawker', { attempt: 1, keys: ['s2_ret_cons', 's2_ws_mfr'] }, 's3_ret_prod', { attempt: 1, keys: ['s3_chain_lim', 's3_itc'] }] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80 to 120 words each.', items: ['l_dept_chain', { attempt: 1, keys: ['l_gst_features', 'l_itc_chain'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks each)', instr: 'Read each case and answer all parts. Part (c) of each has an internal choice.', items: ['cb_devadaru', 'cb_lakshmi'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 to t03 of cbse-11-business-studies-ch09 only (wholesale and retail trade; types of retail trade; goods and services tax and its features)',
    originality: 'every trader, firm and store is imagined and written by SOYL; no real company is named; no NCERT text, example or exercise and no board or sample-paper item reused (D-036)',
    data: 'figures computed in the build: hawker margin; wholesaler and retailer margins on notebooks; chain-store bulk saving; department sales share; input tax credit through a three-stage chain at an imagined rate; central, state and integrated tax on one imagined sale',
    facts: 'dated as of 2024: goods and services tax described; no rate slab, registration threshold or section of any Act is stated; every tax rate in a worked example is imagined',
    gate: 'schema, pipeline lint, deterministic verify, word limits, narration and answer-leak checks run clean in this build',
  },
});
