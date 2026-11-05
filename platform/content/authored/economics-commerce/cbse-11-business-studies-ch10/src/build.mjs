// Build CBSE 11 Business Studies ch10 International Business. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-11-business-studies-ch10/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-business-studies-ch01/src/lib.mjs';

setUnit('cbse-11-business-studies-ch10', 'economics-commerce');
const { fmt, W, EX, IM, TS, CM, LI, FR, J1, J2, EH } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG helpers
const link = (s, A, B, o = { sw: 1.4, color: 'muted' }) => {
  const ax = A.x + A.w / 2, ay = A.y + A.h / 2, bx = B.x + B.w / 2, by = B.y + B.h / 2;
  const dx = bx - ax, dy = by - ay;
  const t = (b) => Math.min(dx !== 0 ? b.w / 2 / Math.abs(dx) : 9, dy !== 0 ? b.h / 2 / Math.abs(dy) : 9);
  s.line(ax + dx * t(A), ay + dy * t(A), bx - dx * t(B), by - dy * t(B), o);
};
const box = (s, b, title, sub, o = {}) => {
  s.rect(b.x, b.y, b.w, b.h, { fill: o.accent ? 'accent' : 'fill', fillOpacity: o.accent ? 0.16 : undefined, color: o.accent ? 'accent' : 'muted', sw: o.accent ? 1.8 : 1.4 });
  const size = o.size ?? 13;
  if (sub) {
    s.text(b.x + b.w / 2, b.y + b.h / 2 - 10, title, { size, bold: true });
    s.text(b.x + b.w / 2, b.y + b.h / 2 + 11, sub, { size: size - 1 });
  } else s.text(b.x + b.w / 2, b.y + b.h / 2, title, { size, bold: true });
};

// ---------------------------------------------------------------- SVG visuals
// 1. Modes-of-entry ladder: risk, investment and control rise together.
const vLadder = (() => {
  const s = new Svg(760, 372);
  const modes = [['Exporting and', 'importing'], ['Contract', 'manufacturing'], ['Licensing and', 'franchising'], ['Joint', 'ventures'], ['Wholly owned', 'subsidiary']];
  const base = 300;
  modes.forEach(([a, b], i) => {
    const x = 20 + i * 148, h = 70 + i * 40, top = base - h;
    s.rect(x, top, 140, h, { fill: 'accent', fillOpacity: 0.07 + i * 0.05, color: 'accent', sw: 1.6, rx: 6 });
    s.text(x + 70, top + 24, a, { size: 13, bold: true });
    s.text(x + 70, top + 44, b, { size: 13, bold: true });
    s.text(x + 70, top - 14, `Step ${i + 1}`, { size: 12 });
  });
  s.arrow(20, 330, 745, 330, { sw: 1.8, color: 'accent' });
  s.text(20, 352, 'Lower investment, risk and control', { anchor: 'start', size: 13 });
  s.text(745, 352, 'Higher investment, risk and control', { anchor: 'end', size: 13 });
  return s.visual('Ladder of five modes of entry into international business, rising from left to right: exporting and importing, contract manufacturing, licensing and franchising, joint ventures, and a wholly owned subsidiary. Investment, risk and control all rise from the lowest step to the highest', 'Each step up brings more control, and more investment and risk.');
})();

// 2. Export procedure flow: sixteen steps in a snake of four rows.
const vExpFlow = (() => {
  const s = new Svg(760, 340);
  const steps = [
    ['1 Enquiry and', 'proforma invoice'], ['2 Receipt of', 'order (indent)'], ['3 Credit check and', 'letter of credit'], ['4 Importer Exporter Code', 'and council registration'],
    ['5 Pre-shipment', 'finance'], ['6 Production or', 'procurement of goods'], ['7 Pre-shipment', 'inspection'], ['8 Certificate', 'of origin'],
    ['9 Reserving', 'shipping space'], ['10 Packing', 'and forwarding'], ['11 Insurance', ''], ['12 Customs clearance', '(shipping bill)'],
    ['13 Mate\'s receipt', ''], ['14 Freight paid and', 'bill of lading'], ['15 Preparing', 'the invoice'], ['16 Securing payment', '(bill of exchange)'],
  ];
  const BW = 160, BH = 54, GX = 36, GY = 34;
  const pos = steps.map((_, i) => {
    const r = Math.floor(i / 4), c0 = i % 4, c = r % 2 === 0 ? c0 : 3 - c0;
    return { x: 6 + c * (BW + GX), y: 6 + r * (BH + GY), r, c };
  });
  steps.forEach(([a, b], i) => {
    const p = pos[i];
    s.rect(p.x, p.y, BW, BH, { fill: i === 0 || i === 15 ? 'accent' : 'fill', fillOpacity: i === 0 || i === 15 ? 0.16 : undefined, color: i === 0 || i === 15 ? 'accent' : 'muted', sw: 1.4 });
    if (b) { s.text(p.x + BW / 2, p.y + BH / 2 - 9, a, { size: 12, bold: true }); s.text(p.x + BW / 2, p.y + BH / 2 + 10, b, { size: 12 }); } else s.text(p.x + BW / 2, p.y + BH / 2, a, { size: 12, bold: true });
  });
  for (let i = 0; i < 15; i++) {
    const p = pos[i], q = pos[i + 1], yc = p.y + BH / 2;
    if (p.r === q.r) {
      if (p.r % 2 === 0) s.arrow(p.x + BW + 2, yc, q.x - 2, yc, { sw: 1.6, color: 'accent' });
      else s.arrow(p.x - 2, yc, q.x + BW + 2, yc, { sw: 1.6, color: 'accent' });
    } else s.arrow(p.x + BW / 2, p.y + BH + 2, q.x + BW / 2, q.y - 2, { sw: 1.6, color: 'accent' });
  }
  return s.visual('Flow of the sixteen steps of an export procedure, read in four rows that snake from left to right and then right to left. Step one, enquiry and proforma invoice. Two, receipt of the order, called an indent. Three, credit check and letter of credit. Four, Importer Exporter Code and export promotion council registration. Five, pre shipment finance. Six, production or procurement of goods. Seven, pre shipment inspection. Eight, certificate of origin. Nine, reserving shipping space. Ten, packing and forwarding. Eleven, insurance. Twelve, customs clearance through a shipping bill. Thirteen, mate\'s receipt. Fourteen, freight paid and bill of lading. Fifteen, preparing the invoice. Sixteen, securing payment through a bill of exchange', 'Sixteen steps from enquiry to payment.');
})();

// 3. Import procedure flow: ten steps in a snake of two rows.
const vImpFlow = (() => {
  const s = new Svg(760, 184);
  const steps = [
    ['1 Trade', 'enquiry'], ['2 Importer Exporter', 'Code'], ['3 Arranging', 'foreign exchange'], ['4 Placing the', 'order (indent)'], ['5 Obtaining a', 'letter of credit'],
    ['6 Arranging', 'finance'], ['7 Receipt of', 'shipment advice'], ['8 Retirement of', 'import documents'], ['9 Arrival', 'of goods'], ['10 Customs clearance', '(bill of entry)'],
  ];
  const BW = 128, BH = 60, GX = 28, GY = 40;
  const pos = steps.map((_, i) => {
    const r = Math.floor(i / 5), c0 = i % 5, c = r === 0 ? c0 : 4 - c0;
    return { x: 4 + c * (BW + GX), y: 8 + r * (BH + GY), r };
  });
  steps.forEach(([a, b], i) => {
    const p = pos[i];
    s.rect(p.x, p.y, BW, BH, { fill: i === 0 || i === 9 ? 'accent' : 'fill', fillOpacity: i === 0 || i === 9 ? 0.16 : undefined, color: i === 0 || i === 9 ? 'accent' : 'muted', sw: 1.4 });
    s.text(p.x + BW / 2, p.y + BH / 2 - 10, a, { size: 11, bold: true });
    s.text(p.x + BW / 2, p.y + BH / 2 + 10, b, { size: 11 });
  });
  for (let i = 0; i < 9; i++) {
    const p = pos[i], q = pos[i + 1], yc = p.y + BH / 2;
    if (p.r === q.r) {
      if (p.r === 0) s.arrow(p.x + BW + 2, yc, q.x - 2, yc, { sw: 1.6, color: 'accent' });
      else s.arrow(p.x - 2, yc, q.x + BW + 2, yc, { sw: 1.6, color: 'accent' });
    } else s.arrow(p.x + BW / 2, p.y + BH + 2, q.x + BW / 2, q.y - 2, { sw: 1.6, color: 'accent' });
  }
  return s.visual('Flow of the ten steps of an import procedure, in two rows. One, trade enquiry. Two, Importer Exporter Code. Three, arranging foreign exchange. Four, placing the order, called an indent. Five, obtaining a letter of credit. Six, arranging finance. Seven, receipt of shipment advice. Eight, retirement of import documents. Nine, arrival of goods. Ten, customs clearance through a bill of entry, after which the goods are released', 'Ten steps from enquiry to release of goods.');
})();

// 4. Export and import documents chart
const vDocs = (() => {
  const s = new Svg(760, 296);
  const cols = [
    { x: 0, h: 'Goods and origin', docs: [['Commercial invoice', 'Seller\'s bill: goods, quantity, price'], ['Packing list', 'Contents of each package'], ['Certificate of origin', 'Country where goods were made']] },
    { x: 260, h: 'Shipping and customs', docs: [['Shipping bill', 'Exporter\'s declaration to customs'], ['Mate\'s receipt', 'Ship\'s receipt: goods loaded'], ['Bill of lading or airway bill', 'Receipt, contract, document of title'], ['Bill of entry', 'Importer\'s declaration to customs']] },
    { x: 520, h: 'Insurance and payment', docs: [['Marine insurance policy', 'Cover against loss in transit'], ['Bill of exchange', 'Order to pay the sum due'], ['Letter of credit', 'Bank\'s promise to pay the seller']] },
  ];
  cols.forEach((c) => {
    s.text(c.x + 120, 16, c.h, { size: 14, bold: true, color: 'accent' });
    c.docs.forEach(([n, p], j) => {
      const y = 36 + j * 62;
      s.rect(c.x, y, 240, 54, { fill: 'fill', color: 'muted', sw: 1.4 });
      s.text(c.x + 120, y + 17, n, { size: 12, bold: true });
      s.text(c.x + 120, y + 38, p, { size: 11 });
    });
  });
  return s.visual('Chart of ten documents grouped in three columns. Goods and origin: commercial invoice, the seller\'s bill; packing list, the contents of each package; certificate of origin, the country where goods were made. Shipping and customs: shipping bill, the exporter\'s declaration to customs; mate\'s receipt, the ship\'s receipt that goods were loaded; bill of lading or airway bill, receipt, contract and document of title; bill of entry, the importer\'s declaration to customs. Insurance and payment: marine insurance policy, cover against loss in transit; bill of exchange, an order to pay the sum due; letter of credit, a bank\'s promise to pay the seller', 'Ten documents in three groups.');
})();

// 5. WTO functions web
const vWto = (() => {
  const s = new Svg(760, 372);
  const C = { x: 270, y: 154, w: 220, h: 64 };
  const A = { x: 10, y: 20, w: 230, h: 56 }, B = { x: 520, y: 20, w: 230, h: 56 };
  const D = { x: 10, y: 290, w: 230, h: 56 }, E = { x: 520, y: 290, w: 230, h: 56 };
  const F = { x: 265, y: 296, w: 230, h: 56 };
  [A, B, D, E, F].forEach((b) => link(s, C, b));
  box(s, C, 'World Trade', 'Organization', { accent: true });
  box(s, A, 'Administers', 'trade agreements', {});
  box(s, B, 'Forum for', 'trade negotiations', {});
  box(s, D, 'Settles', 'trade disputes', {});
  box(s, E, 'Reviews', 'trade policies', {});
  box(s, F, 'Cooperates with', 'IMF and World Bank', {});
  return s.visual('Web of the five functions of the World Trade Organization around a central box. It administers trade agreements, provides a forum for trade negotiations, settles trade disputes, reviews the trade policies of members, and cooperates with the International Monetary Fund and the World Bank', 'Five functions around one body.');
})();

// ---------------------------------------------------------------- tables and flows
const vRoute1 = flow('LR', ['What it is', 'Why it happens', 'Benefits', 'Modes of entry', 'Choosing a mode'], 'Route map of Part 1: what international business is, why it happens, its benefits, the modes of entry and choosing a mode');
const vRoute2 = flow('LR', ['Export procedure', 'Import procedure', 'Documents', 'World Trade Organization', 'Other bodies'], 'Route map of Part 2: export procedure, import procedure, documents, the World Trade Organization and other bodies');
const vDef = table(['Term', 'Meaning'], [
  ['International business', 'Business activities carried on across national boundaries: trade, manufacturing abroad and investment'],
  ['International trade', 'Exchange of goods and services between countries; one part of international business'],
  ['Internal trade', 'Buying and selling inside the boundaries of one country'],
], 'Table of three terms: international business as business across national boundaries including trade, manufacturing abroad and investment; international trade as exchange of goods and services between countries and one part of it; and internal trade as buying and selling inside one country', 'Trade is only one part.');
const vWhy = table(['Cause', 'Idea', 'Imagined illustration'], [
  ['Unequal natural resources', 'A country lacks what another has in plenty', 'Kolmark has iron ore but little farmland'],
  ['Differences in productivity and cost', 'Workers and factories differ in output and cost', 'A Tesoria worker grows more tea than a Kolmark worker'],
  ['Specialisation', 'Each country concentrates on what it makes best and trades for the rest', 'Tesoria grows tea; Kolmark weaves cloth'],
], 'Table of three reasons for international business: unequal natural resources, differences in labour productivity and cost, and specialisation, each with an imagined illustration from Tesoria and Kolmark', 'Three reasons.');
const vSpec = table(['Good', 'Before specialising', 'After specialising'], [
  [`Tea (Tesoria ${TS.teaT} kg, Kolmark ${TS.teaK} kg a worker)`, `${fmt(TS.tea0)} kg`, `${fmt(TS.tea1)} kg`],
  [`Cloth (Tesoria ${TS.clT} m, Kolmark ${TS.clK} m a worker)`, `${fmt(TS.cl0)} m`, `${fmt(TS.cl1)} m`],
], `Worked example table: with a hundred workers each split equally, Tesoria and Kolmark together make ${W(TS.tea0)} kilograms of tea and ${W(TS.cl0)} metres of cloth; after Tesoria grows only tea and Kolmark weaves only cloth, tea is ${W(TS.tea1)} kilograms and cloth is ${W(TS.cl1)} metres`, 'Both totals rise.');
const vScope = table(['Form', 'Meaning', 'Imagined example'], [
  ['Merchandise exports and imports', 'Goods sold to or bought from other countries', 'Kanchan Textiles ships sarees to Valmora'],
  ['Service exports and imports', 'Services such as software, transport or tourism sold across borders', 'Pixel Path writes software for a foreign client'],
  ['Licensing and franchising', 'Giving others abroad the right to use know-how or a brand for a fee', 'Orchid Beverages licenses a recipe; Brisk Bites franchises cafes'],
  ['Foreign investment', 'Putting capital into a business in another country', 'Vega Labs builds a plant in Ostria'],
], 'Table of four forms in the scope of international business with an imagined example of each: merchandise exports and imports, service exports and imports, licensing and franchising, and foreign investment', 'Four forms.');
const vNat = table(['Benefit to a nation', 'What it means'], [
  ['Earning foreign exchange', 'Exports bring in currency that pays for imports'],
  ['More efficient use of resources', 'Each country makes what it makes best'],
  ['Growth prospects and employment', 'Larger markets create output and jobs'],
  ['Higher standard of living', 'People get more choice at lower cost'],
], 'Table of four benefits of international business to a nation: earning foreign exchange, more efficient use of resources, growth prospects and employment, and a higher standard of living');
const vFirm = table(['Benefit to a firm', 'What it means'], [
  ['Prospects of higher profits', 'Foreign markets may pay better prices'],
  ['Better capacity utilisation', 'Surplus output finds a buyer abroad'],
  ['Growth prospects', 'A wider market lets the firm expand'],
  ['A way out of intense domestic competition', 'The firm finds room abroad'],
  ['Improved business vision', 'Dealing with foreign customers broadens outlook'],
], 'Table of five benefits to a firm: prospects of higher profits, better capacity utilisation, growth prospects, a way out of intense domestic competition and improved business vision');
const vCap = table(['Kanchan Textiles (imagined)', 'Sarees a month'], [
  ['Capacity of the looms', fmt(EX.cap)],
  ['Sold at home', `${fmt(EX.dom)} (${EX.util0} per cent of capacity)`],
  ['Foreign order from Harbour Fabrics', fmt(EX.n)],
  ['Total with the export order', `${fmt(EX.dom + EX.n)} (${EX.util1} per cent of capacity)`],
], `Worked example table: looms can make ${W(EX.cap)} sarees a month; ${W(EX.dom)} sold at home is ${W(EX.util0)} per cent of capacity; an export order of ${W(EX.n)} sarees brings the total to ${W(EX.dom + EX.n)}, which is ${W(EX.util1)} per cent`, 'Use of capacity rises from 60 to 100 per cent.');
const vExpImp = table(['Mode', 'What it is', 'Merit and limitation'], [
  ['Direct exporting', 'The firm finds foreign buyers and ships the goods itself', 'Merit: keeps the whole sale. Limitation: needs export knowledge'],
  ['Indirect exporting', 'An export house or agent in the home country finds buyers and ships', 'Merit: little effort or risk. Limitation: less control and a commission to pay'],
  ['Importing', 'Buying goods from a supplier in another country', 'Merit: goods or inputs not made at home. Limitation: duties and delays'],
], 'Table of exporting and importing as modes of entry: direct exporting where the firm ships itself, indirect exporting through an export house or agent, and importing, with a merit and a limitation of each', 'Low investment and low risk.');
const vContract = table(['Point', 'Contract manufacturing'], [
  ['Meaning', 'A firm has goods made abroad by another firm to its specification and sells them itself'],
  ['Merits', 'Low investment, quick entry, lower cost of making'],
  ['Limitations', 'Quality control is hard; trade secrets may leak'],
  ['Imagined example', 'Lumen Apparel has Sutra Garments make its shirts'],
], 'Table of contract manufacturing: a firm has goods made abroad to its specification and sells them itself, with merits of low investment, quick entry and lower cost, limitations of weak quality control and leakage of trade secrets, and the imagined example of Lumen Apparel and Sutra Garments', 'Another firm makes, you sell.');
const vLicFr = table(['Point', 'Licensing', 'Franchising'], [
  ['Meaning', 'Right to use a patent, trademark or know-how, for a fee', 'Right to run a business under a brand and system, for a fee'],
  ['Merits', 'Little capital, quick entry, royalty income', 'Little capital, fast spread of the brand'],
  ['Limitations', 'The licensee may become a competitor', 'Poor service by one outlet can harm the brand'],
  ['Imagined example', 'Orchid Beverages and Sagar Drinks', 'Brisk Bites and a local cafe owner'],
], 'Table comparing licensing and franchising on meaning, merits, limitations and an imagined example: Orchid Beverages and Sagar Drinks for licensing, Brisk Bites and a local cafe owner for franchising', 'Rights granted for a fee.');
const vCmEx = table(['Item (imagined Lumen Apparel)', 'Figure'], [
  [`${fmt(CM.n)} shirts made by Sutra Garments at Rs ${CM.contract}`, `Rs ${fmt(CM.cCost)}`],
  [`${fmt(CM.n)} shirts in its own plant at Rs ${CM.own}`, `Rs ${fmt(CM.oCost)}`],
  ['Saving from contract manufacturing', `Rs ${fmt(CM.saving)}`],
], `Worked example table: ${W(CM.n)} shirts made by a contract manufacturer at ${W(CM.contract)} rupees each cost ${W(CM.cCost)} rupees, against ${W(CM.oCost)} rupees in its own plant at ${W(CM.own)} each, a saving of ${W(CM.saving)} rupees`, 'Compare the two total costs.');
const vLicEx = table(['Imagined arrangement', 'Income to the grantor'], [
  [`Orchid Beverages: ${LI.pct} per cent royalty on sales of Rs ${fmt(LI.sales)}`, `Rs ${fmt(LI.royalty)}`],
  [`Brisk Bites: initial fee`, `Rs ${fmt(FR.fee)}`],
  [`Brisk Bites: ${FR.pct} per cent of monthly sales of Rs ${fmt(FR.monthly)}`, `Rs ${fmt(FR.share)} a month`],
  ['Brisk Bites: fee plus twelve months of share', `Rs ${fmt(FR.year1)}`],
], `Worked example table: a ${W(LI.pct)} per cent royalty on sales of ${W(LI.sales)} rupees gives ${W(LI.royalty)} rupees; a franchiser with an initial fee of ${W(FR.fee)} rupees and ${W(FR.pct)} per cent of monthly sales of ${W(FR.monthly)} rupees earns ${W(FR.share)} rupees a month and ${W(FR.year1)} rupees in the first year`, 'Royalty and fee income.');
const vJvWos = table(['Point', 'Joint venture', 'Wholly owned subsidiary'], [
  ['Meaning', 'A business set up and owned together by two or more firms', 'A foreign business in which the parent owns all the capital'],
  ['Merits', 'Shared investment and risk; local knowledge', 'Full control; secrets stay inside'],
  ['Limitations', 'Partners may disagree; profits are shared', 'Heavy investment; the whole risk is borne by the parent'],
  ['Imagined example', 'Dhanvantari Foods and Lindqvist Dairies', 'Vega Labs in Ostria'],
], 'Table comparing joint ventures and wholly owned subsidiaries on meaning, merits, limitations and an imagined example: Dhanvantari Foods and Lindqvist Dairies, and Vega Labs in Ostria', 'Shared against sole ownership.');
const vJvEx = table(['Item (imagined joint plant)', 'Dhanvantari Foods', 'Lindqvist Dairies'], [
  [`Capital of Rs ${fmt(J1.cost)} in the ratio ${J1.a} to ${J1.b}`, `Rs ${fmt(J1.aCap)}`, `Rs ${fmt(J1.bCap)}`],
  [`Profit of Rs ${fmt(J1.profit)} in the same ratio`, `Rs ${fmt(J1.aProfit)}`, `Rs ${fmt(J1.bProfit)}`],
], `Worked example table: a joint plant costing ${W(J1.cost)} rupees with capital in the ratio ${W(J1.a)} to ${W(J1.b)} needs ${W(J1.aCap)} and ${W(J1.bCap)} rupees; a profit of ${W(J1.profit)} rupees is shared as ${W(J1.aProfit)} and ${W(J1.bProfit)} rupees`, 'Profit follows the ratio.');
const vSummary1 = table(['Idea', 'Remember'], [
  ['International business', 'Trade, manufacturing and investment across borders; trade is a part'],
  ['Why', 'Unequal resources, differences in productivity and cost, specialisation'],
  ['Scope', 'Merchandise, services, licensing and franchising, foreign investment'],
  ['Benefits', 'Foreign exchange, efficient resource use, growth, standard of living; profits, capacity, vision'],
  ['Modes', 'Exporting and importing, contract manufacturing, licensing and franchising, joint ventures, wholly owned subsidiary'],
], 'Summary table of Part 1: international business, reasons, scope, benefits and modes of entry');
const vTips1 = table(['Common mistake', 'Fix'], [
  ['Treating international trade and international business as the same', 'Trade is one part of business across borders'],
  ['Listing modes without a merit and a limitation', 'Give one of each for every mode'],
  ['Mixing up licensing and franchising', 'Licensing: right to use know-how; franchising: a whole business format'],
  ['Using a real firm as the example', 'Use an imagined firm'],
], 'Exam tips table: four common mistakes about trade and business, merits and limitations, licensing and franchising, and real firm examples');

// ---- Part 2 tables
const vExp1 = table(['Step', 'What happens', 'Imagined Kanchan Textiles'], [
  ['1 Enquiry and quotation', 'The importer asks for a price; the exporter sends a proforma invoice', 'Harbour Fabrics asks about sarees'],
  ['2 Receipt of order', 'The importer places a detailed order, called an indent', 'An order for 2,000 sarees'],
  ['3 Credit check and letter of credit', 'The exporter checks the importer\'s standing and obtains a bank\'s promise to pay', 'The bank of Harbour Fabrics opens a letter of credit'],
  ['4 Code and registration', 'Importer Exporter Code from the Directorate General of Foreign Trade; registration with an export promotion council (as of 2024)', 'Kanchan Textiles holds both'],
  ['5 Pre-shipment finance', 'A bank lends for production and packing before shipment', `Rs ${fmt(EX.pre)} from its bank`],
], 'Table of export steps one to five with what happens at each and an imagined illustration from Kanchan Textiles: enquiry and quotation, receipt of order, credit check and letter of credit, Importer Exporter Code and registration, and pre shipment finance', 'Steps 1 to 5.');
const vExp2 = table(['Step', 'What happens', 'Imagined Kanchan Textiles'], [
  ['6 Production or procurement', 'The exporter makes or buys the goods to the order', 'Looms weave the sarees'],
  ['7 Pre-shipment inspection', 'An inspection agency checks quality', 'A quality check before packing'],
  ['8 Certificate of origin', 'A paper that proves where goods were made', 'Needed for lower duty abroad'],
  ['9 Reserving shipping space', 'The exporter books space with a shipping company', 'Space for the cartons'],
  ['10 Packing and forwarding', 'Goods are packed and marked; a forwarding agent helps', 'Cartons marked with the importer\'s name'],
  ['11 Insurance', 'Marine insurance covers loss or damage in transit', `Insured for Rs ${fmt(EX.insured)} (imagined ${EX.insPct} per cent of value)`],
], 'Table of export steps six to eleven with what happens at each and an imagined illustration: production or procurement, pre shipment inspection, certificate of origin, reserving shipping space, packing and forwarding, and insurance', 'Steps 6 to 11.');
const vExp3 = table(['Step', 'What happens'], [
  ['12 Customs clearance', 'The exporter files a shipping bill and customs allow the export'],
  ['13 Mate\'s receipt', 'The ship\'s captain gives a receipt when the goods are loaded'],
  ['14 Freight and bill of lading', 'Freight is paid against the mate\'s receipt; the shipping company issues the bill of lading'],
  ['15 Invoice', 'The exporter prepares the commercial invoice'],
  ['16 Securing payment', 'Documents go through a bank against a bill of exchange'],
  ['Note', 'Much of this paperwork is now filed electronically (as of 2024). An excise clearance step in older books belongs to the older procedure'],
], 'Table of export steps twelve to sixteen: customs clearance, mate\'s receipt, freight and bill of lading, invoice, and securing payment, with a note that much paperwork is filed electronically and that excise clearance belongs to the older procedure', 'Steps 12 to 16.');
const vExVal = table(['Item (imagined order)', 'Figure'], [
  [`${fmt(EX.n)} sarees at ${EX.usd} US dollars`, `${fmt(EX.usdTotal)} US dollars`],
  [`At an imagined Rs ${EX.rate} to one US dollar`, `Rs ${fmt(EX.inr)}`],
  [`Pre-shipment finance at ${EX.prePct} per cent`, `Rs ${fmt(EX.pre)}`],
  [`Cost of ${fmt(EX.n)} sarees at Rs ${fmt(EX.cost)}`, `Rs ${fmt(EX.costTot)}`],
  ['Profit over cost', `Rs ${fmt(EX.margin)}`],
], `Worked example table: ${W(EX.n)} sarees at ${W(EX.usd)} dollars is ${W(EX.usdTotal)} dollars, which at an imagined rate of ${W(EX.rate)} rupees is ${W(EX.inr)} rupees; finance of ${W(EX.prePct)} per cent is ${W(EX.pre)} rupees; the cost is ${W(EX.costTot)} rupees and the profit is ${W(EX.margin)} rupees`, 'Convert first, then compute.');
const vImp = table(['Step', 'What happens'], [
  ['1 Trade enquiry', 'The importer asks suppliers abroad for quotations'],
  ['2 Importer Exporter Code', 'The importer obtains the code (as of 2024)'],
  ['3 Arranging foreign exchange', 'The importer arranges, through a bank, the currency to pay'],
  ['4 Placing the order', 'The importer sends an indent to the chosen supplier'],
  ['5 Letter of credit', 'The importer has its bank open a letter of credit'],
  ['6 Arranging finance', 'The importer arranges money for payment and duty'],
  ['7 Shipment advice', 'The exporter informs the importer that the goods are on their way'],
  ['8 Retirement of documents', 'The importer pays or accepts the bill and takes the documents from the bank'],
  ['9 Arrival of goods', 'The goods arrive at the port or airport'],
  ['10 Customs clearance', 'The importer files a bill of entry, pays duty and the goods are released'],
], 'Table of the ten steps of an import procedure from trade enquiry to customs clearance and release of goods', 'Ten steps.');
const vLanded = table(['Item (imagined Tarini Engineering)', 'Figure'], [
  [`Machine ${fmt(IM.machine)} plus freight and insurance ${fmt(IM.fr)}`, `${fmt(IM.cifUsd)} US dollars`],
  [`At an imagined Rs ${IM.rate} to one US dollar`, `Rs ${fmt(IM.cif)}`],
  [`Customs duty at an imagined ${IM.dutyPct} per cent`, `Rs ${fmt(IM.duty)}`],
  ['Total cost to the importer', `Rs ${fmt(IM.landed)}`],
], `Worked example table: a machine of ${W(IM.machine)} dollars with ${W(IM.fr)} dollars of freight and insurance totals ${W(IM.cifUsd)} dollars, which at an imagined rate of ${W(IM.rate)} rupees is ${W(IM.cif)} rupees; imagined duty of ${W(IM.dutyPct)} per cent is ${W(IM.duty)} rupees, so the total cost is ${W(IM.landed)} rupees`, 'Convert, add duty, then total.');
const vDocA = table(['Document', 'Purpose'], [
  ['Commercial invoice', 'The seller\'s bill, giving the goods, quantity, price and terms'],
  ['Packing list', 'What is inside each package, for customs, carrier and importer'],
  ['Certificate of origin', 'Proof of the country where the goods were made'],
  ['Shipping bill', 'The exporter\'s declaration to customs to obtain permission to export'],
  ['Mate\'s receipt', 'The ship\'s receipt that the goods have been loaded'],
], 'Table of five documents and their purposes: commercial invoice, packing list, certificate of origin, shipping bill and mate\'s receipt');
const vDocB = table(['Document', 'Purpose'], [
  ['Bill of lading or airway bill', 'The carrier\'s receipt, evidence of the contract of carriage and, for a bill of lading, a document of title'],
  ['Marine insurance policy', 'Cover against loss or damage of the goods in transit'],
  ['Bill of exchange', 'A written order from the exporter to the importer to pay a sum'],
  ['Letter of credit', 'A bank\'s undertaking to pay the exporter against conforming documents'],
  ['Bill of entry', 'The importer\'s declaration to customs to clear imported goods'],
], 'Table of five documents and their purposes: bill of lading or airway bill, marine insurance policy, bill of exchange, letter of credit and bill of entry');
const vWtoWhat = table(['Point', 'World Trade Organization'], [
  ['Established', '1 January 1995'],
  ['Succeeded', 'The General Agreement on Tariffs and Trade, in force since 1948'],
  ['India', 'A founding member (as of 2024)'],
  ['Objective 1', 'Raise standards of living and promote full employment'],
  ['Objective 2', 'Expand the production of and trade in goods and services'],
  ['Objective 3', 'Use the world\'s resources in a sustainable way'],
  ['Objective 4', 'Help developing countries to share in the growth of trade'],
], 'Table of the World Trade Organization: established on 1 January 1995, succeeded the General Agreement on Tariffs and Trade in force since 1948, India a founding member as of 2024, and four objectives', 'Origin and objectives.');
const vWtoBen = table(['Benefit to members', 'How'], [
  ['Predictable rules', 'Common rules let exporters and importers plan'],
  ['Settlement of disputes', 'Agreed procedures settle complaints between members'],
  ['Lower barriers', 'Freer trade brings more choice and lower prices'],
  ['Growth and incomes', 'Wider markets help trade and incomes to grow'],
  ['Fair treatment', 'Rules discourage favouritism among trading partners'],
], 'Table of five benefits of World Trade Organization membership: predictable rules, settlement of disputes, lower barriers, growth and incomes, and fair treatment');
const vBodies = table(['Body', 'Main role'], [
  ['International Monetary Fund', 'Promotes monetary cooperation and exchange stability; gives short-term help for payment gaps'],
  ['World Bank (International Bank for Reconstruction and Development)', 'Lends for reconstruction and development projects'],
  ['UNCTAD (United Nations Conference on Trade and Development)', 'Helps developing countries to gain from trade and investment'],
], 'Table of three international bodies: the International Monetary Fund for monetary cooperation and short term help, the World Bank for reconstruction and development loans, and UNCTAD for helping developing countries gain from trade and investment');
const vFive = table(['Stage in a 5-mark answer', 'Steps grouped for the export procedure'], [
  ['1 Order and credit', 'Enquiry and quotation, order, credit check and letter of credit'],
  ['2 Code and money', 'Importer Exporter Code, registration, pre-shipment finance, production'],
  ['3 Preparing the cargo', 'Inspection, certificate of origin, shipping space, packing, insurance'],
  ['4 Shipment', 'Customs clearance, mate\'s receipt, freight, bill of lading'],
  ['5 Closing', 'Invoice and payment through a bank'],
], 'Worked example table of planning a five mark answer on the export procedure by grouping the sixteen steps into five stages: order and credit, code and money, preparing the cargo, shipment, and closing', 'Group the steps, one mark each.');
const vSummary2 = table(['Idea', 'Remember'], [
  ['Export procedure', 'Sixteen steps from enquiry to payment through a bank'],
  ['Import procedure', 'Ten steps from trade enquiry to customs clearance and release'],
  ['Documents', 'Invoice, packing list, origin certificate, shipping bill, mate\'s receipt, bill of lading, policy, bill of exchange, letter of credit, bill of entry'],
  ['World Trade Organization', 'Began 1 January 1995, after the General Agreement of 1948'],
  ['Other bodies', 'International Monetary Fund, World Bank, UNCTAD'],
], 'Summary table of Part 2: the export procedure, import procedure, documents, the World Trade Organization and other bodies');
const vTips2 = table(['Common mistake', 'Fix'], [
  ['Mixing the shipping bill and the bill of entry', 'Exporter: shipping bill; importer: bill of entry'],
  ['Putting the bill of lading before the mate\'s receipt', 'The mate\'s receipt comes first'],
  ['Listing steps without a sequence', 'Number them in the textbook order'],
  ['Giving a number of members of the World Trade Organization', 'Say that it has a large and growing membership'],
], 'Exam tips table: four common mistakes about shipping bill and bill of entry, mate\'s receipt and bill of lading, the sequence of steps, and member numbers');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Nature, Scope and Modes of International Business',
  goals: [
    'Explain what international business is and why it takes place',
    'Describe its scope and its benefits to nations and firms',
    'Explain the modes of entry with their merits and limitations',
    'Choose a suitable mode of entry for an imagined firm',
  ],
  slides: [
    sl('title', 'Nature, Scope and Modes of International Business', {
      b: 'Part 1: why firms and nations do business across borders, and how a firm can enter a foreign market.',
      v: vRoute1,
      n: 'Why do firms sell, make and invest beyond their own country? In this part we study what international business is, why it happens, its benefits to nations and firms, and the modes of entry into foreign markets.',
    }),
    sl('concept', 'What is international business?', {
      b: '**International business** means business activities, such as trade, manufacturing and investment, carried on across the boundaries of countries.',
      v: vDef,
      n: 'International business means business activities carried on across national boundaries. These include trade, manufacturing abroad and investment. International trade, the exchange of goods and services between countries, is only one part of it. Internal trade, by contrast, stays inside one country.',
    }),
    sl('concept', 'Why does international business take place?', {
      v: vWhy,
      n: 'Three ideas explain why. Natural resources are unequal, so one country lacks what another has. Labour productivity and costs of production differ. And because of these differences, specialisation pays: each country concentrates on what it makes best and buys the rest.',
    }),
    sl('example', 'Worked example 1: gains from specialisation', {
      b: 'Two imagined countries, each with a hundred workers, trade tea and cloth. See how the totals change.',
      bl: ['Step 1: Find the output when workers are split equally.', 'Step 2: Find the output when each country specialises.', 'Step 3: Compare the totals.'],
      v: vSpec,
      n: `In Tesoria a worker grows thirty kilograms of tea or weaves ten metres of cloth. In Kolmark a worker grows ten kilograms or weaves twenty metres. Split equally, the two countries make ${W(TS.tea0)} kilograms of tea and ${W(TS.cl0)} metres of cloth. If Tesoria grows only tea and Kolmark weaves only cloth, tea rises to ${W(TS.tea1)} and cloth to ${W(TS.cl1)}.`,
    }),
    sl('concept', 'Scope of international business', {
      v: vScope,
      n: 'The scope has four parts. Merchandise exports and imports are shipments of goods. Service exports and imports include software and transport. Licensing and franchising give others the right to use know how or a brand. Foreign investment means putting capital into a business in another country.',
    }),
    sl('check', 'Quick check: which form?', {
      b: 'An imagined software firm writes a program for a foreign client and is paid in foreign currency. Name the form.',
      chk: 'mc_serv_exp',
      n: 'Think about whether the foreign client receives goods or a service.',
    }),
    sl('concept', 'Benefits to nations', {
      v: vNat,
      n: 'A nation earns foreign exchange, which pays for imports. Resources are used more efficiently, because each country makes what it makes best. Growth prospects and employment improve, and the standard of living of the people can rise through more choice at lower cost.',
    }),
    sl('concept', 'Benefits to firms', {
      v: vFirm,
      n: 'For a firm, international business offers prospects of higher profits, better use of capacity, and growth prospects. It is a way out of intense competition at home, and dealing with foreign customers gives the firm an improved business vision.',
    }),
    sl('example', 'Worked example 2: use of capacity', {
      b: 'Kanchan Textiles, an imagined firm, gets a foreign order. Find its use of capacity before and after.',
      bl: ['Step 1: Divide home sales by capacity.', 'Step 2: Add the export order.', 'Step 3: Divide the new total by capacity.'],
      v: vCap,
      n: `Kanchan Textiles can weave ${W(EX.cap)} sarees a month but sells ${W(EX.dom)} at home, so its looms run at sixty per cent. An export order for ${W(EX.n)} sarees brings the total to ${W(EX.cap)}, so capacity use rises to one hundred per cent.`,
    }),
    sl('diagram', 'Ladder of modes of entry', {
      v: vLadder,
      n: 'This ladder shows the modes of entry. Moving up from exporting and importing, through contract manufacturing, licensing and franchising, and joint ventures, to a wholly owned subsidiary, the investment, the risk and the control all rise.',
    }),
    sl('concept', 'Exporting and importing', {
      v: vExpImp,
      n: 'Exporting means selling goods abroad and importing means buying goods from abroad. In direct exporting the firm finds the buyers and ships the goods itself. In indirect exporting an export house or agent does this work. The merits are little investment and low risk. The limitations are transport costs, trade barriers and less control.',
    }),
    sl('check', 'Quick check: indirect or direct?', {
      b: 'An imagined spice firm hands its cardamom to an export house that finds the buyers abroad. Name the mode.',
      chk: 'mc_indirect',
      n: 'Think about who finds the foreign buyers.',
    }),
    sl('concept', 'Contract manufacturing', {
      b: '**Contract manufacturing:** a firm has goods made abroad by another firm to its specification, and sells them itself.',
      v: vContract,
      n: 'In contract manufacturing a firm has another firm abroad make goods to its specification, and then sells them under its own name. The merits are low investment and quick entry. The limitations are the difficulty of controlling quality and the risk that trade secrets leak.',
    }),
    sl('concept', 'Licensing and franchising', {
      v: vLicFr,
      n: 'In licensing, a firm grants a foreign party the right to use its patent, trademark or know how for a fee. In franchising, a foreign party runs a business under the brand and system of the franchiser. Both need little capital. The risks are loss of control, and a licensee who may become a competitor.',
    }),
    sl('example', 'Worked example 3: income from licensing and franchising', {
      b: 'Find the royalty of an imagined licensor and the first-year income of an imagined franchiser.',
      bl: ['Step 1: Take the royalty percentage of sales.', 'Step 2: Take the franchise share of monthly sales.', 'Step 3: Add the fee and twelve months of share.'],
      v: vLicEx,
      n: `Orchid Beverages earns a royalty of five per cent on sales of ${W(LI.sales)} rupees, which is ${W(LI.royalty)} rupees. Brisk Bites earns an initial fee of ${W(FR.fee)} rupees and four per cent of monthly sales of ${W(FR.monthly)} rupees, which is ${W(FR.share)} rupees every month. In the first year this is ${W(FR.year1)} rupees.`,
    }),
    sl('check', 'Quick check: the royalty', {
      b: 'An imagined licensor charges five per cent of sales of Rs 2,00,00,000. Find the royalty.',
      chk: 'mc_royalty_calc',
      n: 'Work out five per cent of the sales.',
    }),
    sl('concept', 'Joint ventures and wholly owned subsidiaries', {
      v: vJvWos,
      n: 'A joint venture is a business set up and owned together by two or more firms. It shares the investment and the risk, but partners may disagree. A wholly owned subsidiary is owned entirely by the parent. It gives full control but needs heavy investment and puts the whole risk on the parent.',
    }),
    sl('example', 'Worked example 4: sharing a joint venture', {
      b: 'Two imagined firms build a joint plant. Find the capital and the profit of each.',
      bl: ['Step 1: Split the cost in the agreed ratio.', 'Step 2: Split the profit in the same ratio.', 'Step 3: Check that the parts add up.'],
      v: vJvEx,
      n: `A plant costing ${W(J1.cost)} rupees is financed in the ratio sixty to forty, so the partners put in ${W(J1.aCap)} and ${W(J1.bCap)} rupees. A first year profit of ${W(J1.profit)} rupees is shared in the same ratio, giving ${W(J1.aProfit)} and ${W(J1.bProfit)} rupees.`,
    }),
    sl('check', 'Quick check: match the mode', {
      b: 'Match each imagined firm with the mode of entry that it uses.',
      chk: 'mt_modes',
      n: 'Ask who makes the goods and who owns the business.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up. International business is wider than trade. It arises from unequal resources, differences in productivity and cost, and specialisation. It benefits nations and firms. The modes of entry rise from exporting to a wholly owned subsidiary, with more investment, risk and control at each step.',
    }),
    sl('exam-tips', 'Exam tips', {
      v: vTips1,
      bl: ['Give a merit and a limitation for every mode.', 'Use an imagined firm as the example.'],
      n: 'Some tips. Do not treat international trade and international business as the same. For every mode of entry, give one merit and one limitation. Keep licensing and franchising apart. And use an imagined firm in your examples, never a real one.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Export and Import Procedures, Documents and the WTO',
  goals: [
    'Outline the steps of an export procedure and of an import procedure',
    'State the purpose of the main export and import documents',
    'Describe the objectives, functions and benefits of the World Trade Organization',
    'Name the role of the International Monetary Fund, World Bank and UNCTAD',
  ],
  slides: [
    sl('title', 'Export and Import Procedures, Documents and the WTO', {
      b: 'Part 2: how goods move across a border on paper, and the institutions that guide trade.',
      v: vRoute2,
      n: 'Goods cross a border with a trail of papers. In this part we follow an export and an import step by step, learn the purpose of each document, and then study the World Trade Organization and other international bodies.',
    }),
    sl('diagram', 'The export procedure at a glance', {
      v: vExpFlow,
      n: 'This flow shows the sixteen steps of an export, as the textbook gives them. It starts with an enquiry and a proforma invoice, runs through credit, finance, production, inspection, shipping and customs, and ends with the securing of payment through a bank.',
    }),
    sl('concept', 'Export steps one to five', {
      v: vExp1,
      n: 'The exporter replies to an enquiry with a proforma invoice and receives an order, called an indent. It checks the importer\'s credit standing and secures a letter of credit. It obtains its Importer Exporter Code and registers with an export promotion council. Then it arranges pre shipment finance.',
    }),
    sl('concept', 'Export steps six to eleven', {
      v: vExp2,
      n: 'Next the goods are produced or bought, and a pre shipment inspection checks quality. The exporter obtains a certificate of origin, reserves shipping space, and packs and forwards the goods. Marine insurance covers loss or damage in transit.',
    }),
    sl('concept', 'Export steps twelve to sixteen', {
      v: vExp3,
      n: 'The exporter files a shipping bill and customs clear the goods. The ship\'s captain gives the mate\'s receipt when the goods are loaded. After freight is paid, the shipping company issues the bill of lading. The exporter prepares the invoice and secures payment through a bank against a bill of exchange.',
    }),
    sl('example', 'Worked example 1: values in an export order', {
      b: 'Kanchan Textiles, an imagined exporter, has an order priced in US dollars. Convert it and find the finance and the profit.',
      bl: ['Step 1: Find the value in US dollars.', 'Step 2: Convert it into rupees at the imagined rate.', 'Step 3: Take the finance and compute the profit.'],
      v: vExVal,
      n: `Two thousand sarees at twenty five dollars each come to ${W(EX.usdTotal)} dollars. At an imagined rate of eighty rupees to a dollar, this is ${W(EX.inr)} rupees. Finance at sixty per cent is ${W(EX.pre)} rupees. The cost is ${W(EX.costTot)} rupees, so the profit is ${W(EX.margin)} rupees.`,
    }),
    sl('check', 'Quick check: the first reply', {
      b: 'An imagined exporter replies to an enquiry with a document listing the goods, price and terms, without asking for payment. Name it.',
      chk: 'mc_proforma',
      n: 'Think about what the exporter sends before any order is placed.',
    }),
    sl('diagram', 'The import procedure at a glance', {
      v: vImpFlow,
      n: 'This flow shows the ten steps of an import. It starts with a trade enquiry and the Importer Exporter Code, runs through foreign exchange, the order, the letter of credit and finance, and ends with the arrival of the goods and customs clearance through a bill of entry.',
    }),
    sl('concept', 'The ten steps of an import', {
      v: vImp,
      n: 'The importer makes a trade enquiry, obtains the Importer Exporter Code and arranges foreign exchange. It places an order and has a letter of credit opened. It arranges finance and gets the shipment advice. It retires the import documents, receives the goods, and clears them through a bill of entry.',
    }),
    sl('example', 'Worked example 2: cost of an imported machine', {
      b: 'Tarini Engineering, an imagined importer, buys a machine priced in US dollars. Find its total cost in rupees.',
      bl: ['Step 1: Add freight and insurance to the price.', 'Step 2: Convert into rupees.', 'Step 3: Add the customs duty.'],
      v: vLanded,
      n: `The machine and its freight and insurance come to ${W(IM.cifUsd)} dollars. At an imagined rate of eighty two rupees, this is ${W(IM.cif)} rupees. An imagined customs duty of ten per cent adds ${W(IM.duty)} rupees, so the total cost to the importer is ${W(IM.landed)} rupees.`,
    }),
    sl('diagram', 'Chart of export and import documents', {
      v: vDocs,
      n: 'This chart groups ten documents. The invoice, packing list and certificate of origin describe the goods. The shipping bill, mate\'s receipt, bill of lading and bill of entry deal with shipping and customs. The insurance policy, bill of exchange and letter of credit deal with risk and payment.',
    }),
    sl('concept', 'Documents and their purposes: part one', {
      v: vDocA,
      n: 'The commercial invoice is the seller\'s bill. The packing list shows what is in each package. The certificate of origin proves where the goods were made. The shipping bill is the exporter\'s declaration to customs. The mate\'s receipt shows that the goods have been loaded on the ship.',
    }),
    sl('concept', 'Documents and their purposes: part two', {
      v: vDocB,
      n: 'The bill of lading or airway bill is the carrier\'s receipt and evidence of the contract of carriage. A bill of lading is also a document of title. The marine insurance policy covers loss in transit. The bill of exchange orders payment. The letter of credit is a bank\'s promise to pay. The bill of entry is the importer\'s declaration to customs.',
    }),
    sl('check', 'Quick check: which bill?', {
      b: 'An exporter and an importer each file a declaration with customs. Name the two documents.',
      chk: 'mc_shipbill_entry',
      n: 'Think about who is sending the goods out and who is bringing them in.',
    }),
    sl('concept', 'The World Trade Organization: origin and objectives', {
      b: 'The **World Trade Organization** is the international body that looks after the rules of trade among its members.',
      v: vWtoWhat,
      n: 'The World Trade Organization was established on the first of January nineteen ninety five. It succeeded the General Agreement on Tariffs and Trade, which came into force in nineteen forty eight. India is a founding member. Its objectives are higher living standards and full employment, more trade in goods and services, sustainable use of resources, and help for developing countries.',
    }),
    sl('diagram', 'Functions of the World Trade Organization', {
      v: vWto,
      n: 'This web shows five functions. The Organization administers trade agreements and provides a forum for negotiations. It settles disputes between members and reviews their trade policies. It also cooperates with the International Monetary Fund and the World Bank.',
    }),
    sl('concept', 'Benefits of membership', {
      v: vWtoBen,
      n: 'Members gain predictable rules, which help traders to plan. They have agreed procedures for settling disputes. Lower barriers bring more choice and lower prices. Wider markets help trade and incomes to grow, and the rules discourage favouritism among trading partners.',
    }),
    sl('concept', 'Other international bodies', {
      v: vBodies,
      n: 'The International Monetary Fund promotes monetary cooperation and exchange stability, and gives short term help to members with payment gaps. The World Bank lends for reconstruction and development projects. UNCTAD, the United Nations Conference on Trade and Development, helps developing countries to gain from trade and investment.',
    }),
    sl('check', 'Quick check: the objective', {
      b: 'Which of these is an objective of the World Trade Organization?',
      chk: 'mc_wto_objective',
      n: 'Think about what the Organization aims to expand.',
    }),
    sl('example', 'Worked example 3: planning a five-mark answer', {
      b: 'Plan an answer on the export procedure before writing it.',
      bl: ['Step 1: Group the sixteen steps into five stages.', 'Step 2: Name the key documents in each stage.', 'Step 3: Keep one mark for each stage.'],
      v: vFive,
      n: 'Sixteen steps cannot be told one by one in a short answer, so group them. Stage one is order and credit. Stage two is code and money. Stage three is preparing the cargo. Stage four is shipment. Stage five is the invoice and payment. Name the key document in each stage and you can earn one mark for each.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up. An export has sixteen steps and an import has ten, each with its documents. The World Trade Organization began on the first of January nineteen ninety five after the General Agreement of nineteen forty eight. The International Monetary Fund, the World Bank and UNCTAD have their own roles.',
    }),
    sl('exam-tips', 'Exam tips', {
      v: vTips2,
      bl: ['Exporter: shipping bill. Importer: bill of entry.', 'Mate\'s receipt first, then the bill of lading.'],
      n: 'Some tips. The exporter files a shipping bill and the importer files a bill of entry. The mate\'s receipt comes before the bill of lading. Give the steps in sequence, and group them in a long answer. And do not give a number of members of the World Trade Organization.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'International Business: notes',
  sections: [
    {
      h: '1. Nature of international business and why it takes place',
      t: 1,
      b: '**International business** means business activities, such as trade, manufacturing and investment, carried on across the boundaries of countries. **International trade**, the exchange of goods and services between countries, is one part of it.\n\n**Why it takes place:**\n1. **Unequal natural resources:** a country may lack what another has in plenty.\n2. **Differences in labour productivity and cost of production.**\n3. **Specialisation:** each country concentrates on what it makes best and buys the rest.\n\n**Worked check:** with a hundred workers each, Tesoria and Kolmark together make 2,000 kg of tea and 1,500 m of cloth when workers are split equally, and 3,000 kg of tea and 2,000 m of cloth when each specialises.',
      terms: [['International business', 'Business activities carried on across national boundaries.'], ['International trade', 'Exchange of goods and services between countries; a part of international business.'], ['Specialisation', 'Concentration of each country on the goods it makes best.']],
      v: vDef,
      vs: [vWhy, vSpec],
    },
    {
      h: '2. Scope and benefits',
      t: 1,
      b: '**Scope:** merchandise exports and imports; service exports and imports; licensing and franchising; foreign investment.\n\n**Benefits to nations:** earning foreign exchange; more efficient use of resources; growth prospects and employment; a higher standard of living.\n\n**Benefits to firms:** prospects of higher profits; better capacity utilisation; growth prospects; a way out of intense domestic competition; improved business vision.\n\n**Worked check:** a firm that can make 5,000 sarees and sells 3,000 at home uses 60 per cent of capacity; a foreign order for 2,000 raises it to 100 per cent.',
      terms: [['Merchandise export', 'Sale of goods to another country.'], ['Service export', 'Sale of a service, such as software, to a client in another country.'], ['Foreign investment', 'Putting capital into a business in another country.']],
      v: vScope,
      vs: [vNat, vFirm, vCap],
    },
    {
      h: '3. Modes of entry into international business',
      t: 1,
      b: 'The modes rise in investment, risk and control:\n\n1. **Exporting and importing**, direct or indirect. Merit: little investment and risk. Limitation: transport costs, trade barriers, less control.\n2. **Contract manufacturing.** Merit: low investment, quick entry. Limitation: quality control, leakage of secrets.\n3. **Licensing and franchising.** Merit: little capital, quick entry. Limitation: the licensee may become a competitor; loss of control.\n4. **Joint ventures.** Merit: shared investment and risk, local knowledge. Limitation: disagreement between partners; shared profits.\n5. **Wholly owned foreign subsidiaries.** Merit: full control. Limitation: heavy investment and the whole risk.\n\n**Worked checks:** a 5 per cent royalty on Rs 2,00,00,000 is Rs 10,00,000; a joint plant of Rs 50,00,000 financed 60 to 40 needs Rs 30,00,000 and Rs 20,00,000.',
      terms: [['Direct exporting', 'The firm itself finds the foreign buyers and ships the goods.'], ['Indirect exporting', 'An export house or agent in the home country finds buyers and ships.'], ['Contract manufacturing', 'Having another firm abroad make goods to your specification.'], ['Licensing', 'Granting the right to use a patent, trademark or know-how for a fee.'], ['Franchising', 'Granting the right to run a business under a brand and system for a fee.'], ['Joint venture', 'A business set up and owned together by two or more firms.'], ['Wholly owned subsidiary', 'A foreign business in which the parent owns all the capital.']],
      v: vLadder,
      vs: [vExpImp, vContract, vLicFr, vCmEx, vLicEx, vJvWos, vJvEx],
    },
    {
      h: '4. Export procedure',
      t: 2,
      b: 'The standard sequence of an export:\n1. Receipt of an enquiry and sending a quotation (proforma invoice).\n2. Receipt of the order (indent).\n3. Checking the importer\'s creditworthiness and securing a letter of credit.\n4. Obtaining the Importer Exporter Code from the Directorate General of Foreign Trade and registering with an export promotion council (as of 2024).\n5. Obtaining pre-shipment finance.\n6. Production or procurement of the goods.\n7. Pre-shipment inspection.\n8. Obtaining a certificate of origin.\n9. Reserving shipping space.\n10. Packing and forwarding.\n11. Insurance.\n12. Customs clearance, through a shipping bill.\n13. Obtaining the mate\'s receipt.\n14. Paying freight and obtaining the bill of lading.\n15. Preparing the invoice.\n16. Securing payment, through documents sent via a bank against a bill of exchange.\n\n**Dated note (as of 2024):** much of the paperwork is now filed electronically. A step of excise clearance in older books belongs to the older procedure and is not taught as current.\n\n**Worked check (imagined):** 2,000 sarees at 25 US dollars is 50,000 US dollars; at an imagined Rs 80 to one US dollar it is Rs 40,00,000.',
      terms: [['Proforma invoice', 'A quotation listing the goods, price and terms offered; not a demand for payment.'], ['Indent', 'A detailed order for goods placed by the importer.'], ['Pre-shipment finance', 'Money lent before shipment for production, packing and transport.']],
      v: vExpFlow,
      vs: [vExp1, vExp2, vExp3, vExVal],
    },
    {
      h: '5. Import procedure',
      t: 2,
      b: 'The standard sequence of an import:\n1. Trade enquiry.\n2. Obtaining the Importer Exporter Code (as of 2024).\n3. Arranging foreign exchange.\n4. Placing the order (indent).\n5. Obtaining a letter of credit.\n6. Arranging finance.\n7. Receipt of shipment advice.\n8. Retirement of import documents.\n9. Arrival of goods.\n10. Customs clearance, through a bill of entry, and release of the goods.\n\n**Worked check (imagined):** a machine of 12,000 US dollars plus 1,500 US dollars of freight and insurance is 13,500 US dollars, or Rs 11,07,000 at an imagined Rs 82; an imagined duty of 10 per cent is Rs 1,10,700, so the total cost is Rs 12,17,700.',
      terms: [['Shipment advice', 'A notice from the exporter that the goods have been shipped.'], ['Retirement of import documents', 'Paying or accepting the bill and taking over the shipping documents from the bank.'], ['Bill of entry', 'The importer\'s declaration to customs for clearance of imported goods.']],
      v: vImpFlow,
      vs: [vImp, vLanded],
    },
    {
      h: '6. Export and import documents',
      t: 2,
      b: '1. **Commercial invoice:** the seller\'s bill.\n2. **Packing list:** the contents of each package.\n3. **Certificate of origin:** proof of the country where the goods were made.\n4. **Shipping bill:** the exporter\'s declaration to customs.\n5. **Mate\'s receipt:** the ship\'s receipt that the goods are loaded.\n6. **Bill of lading or airway bill:** the carrier\'s receipt and evidence of the contract of carriage; a bill of lading is also a document of title.\n7. **Marine insurance policy:** cover against loss in transit.\n8. **Bill of exchange:** a written order to pay a sum.\n9. **Letter of credit:** a bank\'s undertaking to pay against conforming documents.\n10. **Bill of entry:** the importer\'s declaration to customs.\n\nThe documents and their forms are as of 2024.',
      terms: [['Mate\'s receipt', 'A receipt issued by the ship\'s captain when goods are loaded.'], ['Bill of lading', 'A receipt and document of title issued by the shipping company after freight is paid.'], ['Letter of credit', 'A bank\'s undertaking to pay the exporter against documents that meet the terms.']],
      v: vDocs,
      vs: [vDocA, vDocB],
    },
    {
      h: '7. The World Trade Organization and other bodies',
      t: 3,
      b: 'The **World Trade Organization** was established on 1 January 1995 and succeeded the General Agreement on Tariffs and Trade, which came into force in 1948. India is a founding member; the membership has grown to over 160 members as of 2024.\n\n**Objectives:** raise standards of living and promote full employment; expand the production of and trade in goods and services; use resources sustainably; help developing countries to share in the growth of trade.\n\n**Functions:** administer trade agreements; provide a forum for negotiations; settle disputes; review the trade policies of members; cooperate with the International Monetary Fund and the World Bank.\n\n**Benefits to members:** predictable rules; settlement of disputes; lower barriers; growth and incomes; fair treatment.\n\n**Other bodies:** the **International Monetary Fund** (monetary cooperation, exchange stability, short-term help); the **World Bank** (loans for reconstruction and development); **UNCTAD** (helping developing countries to gain from trade and investment).',
      terms: [['World Trade Organization', 'The international body, established in 1995, that looks after the rules of trade among its members.'], ['General Agreement on Tariffs and Trade', 'The trade arrangement of 1948 that the World Trade Organization succeeded.'], ['UNCTAD', 'The United Nations Conference on Trade and Development.']],
      v: vWto,
      vs: [vWtoWhat, vWtoBen, vBodies],
    },
  ],
  tips: '**Common mistakes**\n- Treating international trade and international business as the same.\n- Listing modes of entry without a merit and a limitation for each.\n- Mixing up licensing and franchising.\n- Mixing up the shipping bill (exporter) and the bill of entry (importer).\n- Putting the bill of lading before the mate\'s receipt.\n- Teaching the older excise clearance step as current; if your textbook lists it, write it as part of the older procedure.\n- Giving the number of members of the World Trade Organization; say that membership is large and growing.\n- Naming real firms; use imagined ones.\n\n**How marks are usually awarded**\n- 1 mark: a correct option or a quoted line from the case.\n- 2 and 3 marks: one point per benefit, mode, step or document, with a short explanation.\n- 5 marks: five points in a numbered list; group the steps of a procedure into five stages.\n- Case questions: quote the line, name the concept, show the working for a figure.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**International business**', 'Business activities, such as trade, manufacturing and investment, carried on across national boundaries.', 'definition', 1],
  ['**International trade**', 'Exchange of goods and services between countries; one part of international business.', 'definition', 1],
  ['Why international business takes place', 'Unequal natural resources; differences in labour productivity and cost; specialisation.', 'fact', 1],
  ['Scope of international business', 'Merchandise exports and imports; service exports and imports; licensing and franchising; foreign investment.', 'fact', 1],
  ['Benefits to nations', 'Foreign exchange; efficient use of resources; growth and employment; higher standard of living.', 'fact', 1],
  ['Benefits to firms', 'Higher profits; better capacity utilisation; growth; a way out of domestic competition; improved vision.', 'fact', 1],
  ['**Direct and indirect exporting**', 'Direct: the firm finds buyers and ships itself. Indirect: an export house or agent does it.', 'definition', 1],
  ['Merit and limitation of exporting', 'Little investment and risk; but transport costs, trade barriers and less control.', 'concept', 1],
  ['**Contract manufacturing**', 'Having another firm abroad make goods to your specification and selling them yourself.', 'definition', 1],
  ['Limitations of contract manufacturing', 'Hard to control quality; trade secrets may leak.', 'concept', 1],
  ['**Licensing**', 'Granting the right to use a patent, trademark or know-how abroad for a fee or royalty.', 'definition', 1],
  ['**Franchising**', 'Granting the right to run a business under a brand and system for a fee and a share of sales.', 'definition', 1],
  ['Limitation of licensing', 'The licensee may learn the know-how and become a competitor.', 'concept', 1],
  ['**Joint venture**', 'A business set up and owned together by two or more firms, often from different countries.', 'definition', 1],
  ['**Wholly owned foreign subsidiary**', 'A foreign business in which the parent owns all the capital; full control but heavy investment and risk.', 'definition', 1],
  ['Order of modes by investment, risk and control', 'Exporting and importing, contract manufacturing, licensing and franchising, joint ventures, wholly owned subsidiary.', 'exam-tip', 1],
  ['**Proforma invoice**', 'A quotation listing the goods, price and terms offered; not a demand for payment.', 'definition', 2],
  ['**Indent**', 'A detailed order for goods placed by an importer.', 'definition', 2],
  ['Export steps 1 to 5', 'Enquiry and quotation; order; credit check and letter of credit; code and registration; pre-shipment finance.', 'fact', 2],
  ['Export steps 6 to 11', 'Production; inspection; certificate of origin; shipping space; packing and forwarding; insurance.', 'fact', 2],
  ['Export steps 12 to 16', 'Customs clearance (shipping bill); mate\'s receipt; freight and bill of lading; invoice; payment through a bank.', 'fact', 2],
  ['Import steps', 'Trade enquiry; code; foreign exchange; indent; letter of credit; finance; shipment advice; retirement of documents; arrival; customs clearance.', 'fact', 2],
  ['**Letter of credit**', 'A bank\'s undertaking to pay the exporter against documents that meet the agreed terms.', 'definition', 2],
  ['**Shipping bill** and **bill of entry**', 'Shipping bill: the exporter\'s declaration to customs. Bill of entry: the importer\'s declaration to customs.', 'definition', 2],
  ['**Mate\'s receipt**', 'A receipt that the ship\'s captain gives when goods are loaded.', 'definition', 2],
  ['**Bill of lading**', 'The shipping company\'s receipt for the goods, evidence of the contract of carriage and a document of title.', 'definition', 2],
  ['**Certificate of origin**', 'A paper that proves the country where the goods were made.', 'definition', 2],
  ['**Bill of exchange**', 'A written order from the exporter to the importer to pay a sum.', 'definition', 2],
  ['**World Trade Organization**', 'Established on 1 January 1995; it succeeded the General Agreement on Tariffs and Trade of 1948.', 'fact', 3],
  ['Objectives of the World Trade Organization', 'Higher living standards and full employment; more trade in goods and services; sustainable use of resources; help for developing countries.', 'fact', 3],
  ['Functions of the World Trade Organization', 'Administers agreements; forum for negotiations; settles disputes; reviews trade policies; cooperates with the International Monetary Fund and the World Bank.', 'fact', 3],
  ['International Monetary Fund, World Bank, UNCTAD', 'Monetary cooperation and short-term help; development loans; helping developing countries to gain from trade.', 'fact', 3],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short): International Business',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['mc_franchise', 'mc_coo', 'mc_wto_dispute', 'ar_lc'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer the 2-mark questions in about 30 to 50 words and the 3-mark question in about 50 to 80 words.', items: ['s2_proforma', 's2_nat_benefit', 's3_wto_benefits'] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80 to 120 words.', items: [{ attempt: 1, keys: ['l_modes', 'l_export_proc'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks)', instr: 'Read the case and answer all parts. Part (c) has an internal choice.', items: ['cb_kanchan'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long): International Business',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['mc_ib_def', 'mc_capacity', 'mc_jv_share', 'mc_preship_fin', 'mc_bol_airway', 'mc_landed_cost', 'mc_wto_year', 'mc_imf', 'ar_spec', 'ar_wto'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and 3-mark questions in about 50 to 80 words. Questions 13 and 15 have an internal choice.', items: ['s2_it_vs_ib', 's2_bol', { attempt: 1, keys: ['s2_jv', 's2_wto_func'] }, 's3_firm_benefit', { attempt: 1, keys: ['s3_lic_fr', 's3_docs_case'] }] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80 to 120 words each.', items: ['l_import_proc', { attempt: 1, keys: ['l_docs', 'l_wto'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks each)', instr: 'Read each case and answer all parts. Part (c) of each has an internal choice.', items: ['cb_tarini', 'cb_suryakiran'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 to t03 of cbse-11-business-studies-ch10 only (nature, scope and benefits of international business with modes of entry; export and import procedures and documents; the World Trade Organization and other trade bodies)',
    originality: 'every firm, exporter, importer and country is imagined and written by SOYL; no real company is named; no NCERT text, example or exercise and no board or sample-paper item reused (D-036)',
    data: 'figures computed in the build: specialisation totals; capacity use; export order value at an imagined exchange rate; pre-shipment finance; import cost with an imagined duty; royalty and franchise income; contract manufacturing saving; joint venture capital and profit shares; export house commission',
    facts: 'dated as of 2024: export and import procedure steps and the Importer Exporter Code and council registration; the list of documents; electronic filing of paperwork; India as a founding member of the World Trade Organization; the membership of over 160 members; no fee, duty rate or schedule is stated as fact, and every duty rate and exchange rate is imagined',
    gate: 'schema, pipeline lint, deterministic verify, word limits, narration and answer-leak checks run clean in this build',
  },
});
