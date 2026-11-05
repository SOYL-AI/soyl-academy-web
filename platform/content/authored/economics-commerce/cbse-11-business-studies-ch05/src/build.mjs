// Build CBSE 11 Business Studies ch05 Emerging Modes of Business. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-11-business-studies-ch05/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-business-studies-ch01/src/lib.mjs';

setUnit('cbse-11-business-studies-ch05', 'economics-commerce');
const { fmt, ORD, SHOP, PAY } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG helpers
// Line between the edges of two boxes {x, y, w, h}, along the line joining their centres.
const link = (s, A, B, o = { sw: 1.4, color: 'muted' }) => {
  const ax = A.x + A.w / 2, ay = A.y + A.h / 2, bx = B.x + B.w / 2, by = B.y + B.h / 2;
  const dx = bx - ax, dy = by - ay;
  const t = (b) => Math.min(dx !== 0 ? b.w / 2 / Math.abs(dx) : 9, dy !== 0 ? b.h / 2 / Math.abs(dy) : 9);
  s.line(ax + dx * t(A), ay + dy * t(A), bx - dx * t(B), by - dy * t(B), o);
};

// ---------------------------------------------------------------- SVG visuals
const vScope = (() => {
  const s = new Svg(760, 360);
  const C = { x: 280, y: 140, w: 200, h: 80 };
  const boxes = [
    { x: 10, y: 10, w: 330, h: 100, t: ['Business to business', 'Firm deals with firm', 'Pustak Ghar and a publisher'] },
    { x: 420, y: 10, w: 330, h: 100, t: ['Business to customer', 'Firm sells to an individual buyer', 'Pustak Ghar and a student'] },
    { x: 10, y: 250, w: 330, h: 100, t: ['Intra-business', 'Processes inside one firm', 'Staff leave and pay records'] },
    { x: 420, y: 250, w: 330, h: 100, t: ['Customer to customer', 'One private person to another', 'A student sells an old atlas'] },
  ];
  boxes.forEach((b) => link(s, C, b));
  s.rect(C.x, C.y, C.w, C.h, { fill: 'accent', fillOpacity: 0.18, color: 'accent', sw: 2 });
  s.text(C.x + C.w / 2, C.y + 28, 'E-business', { size: 15, bold: true });
  s.text(C.x + C.w / 2, C.y + 54, 'includes e-commerce', { size: 12 });
  boxes.forEach((b) => {
    s.rect(b.x, b.y, b.w, b.h, { fill: 'fill', color: 'muted', sw: 1.4 });
    s.text(b.x + b.w / 2, b.y + 28, b.t[0], { size: 14, bold: true });
    s.text(b.x + b.w / 2, b.y + 58, b.t[1], { size: 12 });
    s.text(b.x + b.w / 2, b.y + 80, b.t[2], { size: 12 });
  });
  return s.visual('Chart of the scope of e-business with four types around a centre box. Business to business: a firm deals with a firm, such as Pustak Ghar and a publisher. Business to customer: a firm sells to an individual buyer, such as Pustak Ghar and a student. Intra-business: processes inside one firm, such as staff leave and pay records. Customer to customer: one private person deals with another, such as a student selling an old atlas. E-commerce is a part of e-business', 'Four types of e-business dealings.');
})();

const vStages = (() => {
  const s = new Svg(760, 320);
  const cols = [
    { x: 10, h: ['Pre-purchase', 'or pre-sale'], l: ['Information', 'Advertising', 'Browsing and comparing'] },
    { x: 270, h: ['Purchase', 'or sale'], l: ['1 Registration', '2 Order in the shopping cart', '3 Payment'] },
    { x: 530, h: ['Delivery'], l: ['Packing and dispatch', 'Transport and tracking', 'Receipt by the buyer'] },
  ];
  cols.forEach((c, i) => {
    s.rect(c.x, 14, 220, 66, { fill: 'accent', fillOpacity: 0.16, color: 'accent', sw: 1.6 });
    if (c.h.length === 2) { s.text(c.x + 110, 36, c.h[0], { size: 15, bold: true }); s.text(c.x + 110, 58, c.h[1], { size: 15, bold: true }); } else s.text(c.x + 110, 47, c.h[0], { size: 15, bold: true });
    s.rect(c.x, 112, 220, 190, { fill: 'fill', color: 'muted', sw: 1.3 });
    c.l.forEach((t, k) => s.text(c.x + 110, 160 + k * 52, t, { size: 13 }));
    if (i < 2) s.arrow(c.x + 224, 47, c.x + 256, 47, { sw: 1.8 });
  });
  return s.visual('Flow of the three stages of an online transaction. Pre-purchase or pre-sale stage: information, advertising, browsing and comparing. Purchase or sale stage: registration, placing the order in the shopping cart, and payment. Delivery stage: packing and dispatch, transport and tracking, and receipt by the buyer', 'Three stages, in order.');
})();

const vPay = (() => {
  const s = new Svg(760, 360);
  const items = [
    ['Cash on delivery', 'Buyer pays the courier', 'in cash at the door'],
    ['Cheque', 'Written order to the bank', 'to pay; needs clearing'],
    ['Net banking', 'Transfer from the account', 'through the bank website'],
    ['Credit and debit cards', 'Debit: from the balance', 'Credit: pay later in a limit'],
    ['Digital cash, e-wallet', 'Prepaid stored balance', 'used for small payments'],
    ['Unified payments interface', 'Instant transfer between', 'bank accounts by phone'],
  ];
  items.forEach((it, i) => {
    const x = 8 + (i % 3) * 254, y = 10 + Math.floor(i / 3) * 160;
    s.rect(x, y, 236, 140, { fill: 'fill', color: i < 3 ? 'muted' : 'accent', sw: 1.5 });
    s.text(x + 118, y + 34, it[0], { size: 14, bold: true });
    s.text(x + 118, y + 76, it[1], { size: 12 });
    s.text(x + 118, y + 100, it[2], { size: 12 });
  });
  s.text(8, 346, 'Payment methods as of 2024', { anchor: 'start', size: 11, muted: true });
  return s.visual('Chart of six payment mechanisms as of 2024. Cash on delivery: the buyer pays the courier in cash at the door. Cheque: a written order to the bank to pay, which needs clearing. Net banking: a transfer from the account through the bank website. Credit and debit cards: a debit card pays from the balance and a credit card lets the buyer pay later within a limit. Digital cash and e-wallet: a prepaid stored balance used for small payments. Unified payments interface: an instant transfer between bank accounts by phone', 'Six ways to pay, as of 2024.');
})();

const vSecurity = (() => {
  const s = new Svg(760, 350);
  s.text(160, 18, 'Risks', { size: 15, bold: true });
  s.text(600, 18, 'Measures', { size: 15, bold: true });
  const risks = [
    ['Transaction risks', 'Default on order, delivery or payment'],
    ['Data storage and transmission', 'Viruses and hacking'],
    ['Intellectual property and privacy', 'Copying of work; leak of personal data'],
  ];
  risks.forEach((r, i) => {
    const y = 40 + i * 100;
    s.rect(10, y, 300, 80, { fill: 'fill', color: 'muted', sw: 1.5 });
    s.text(160, y + 28, r[0], { size: 14, bold: true });
    s.text(160, y + 56, r[1], { size: 12 });
  });
  ['Encryption', 'Digital signatures and certificates', 'Passwords and one-time passwords', 'Firewalls', 'Secure websites'].forEach((m, i) => {
    const y = 40 + i * 60;
    s.rect(450, y, 300, 52, { fill: 'accent', fillOpacity: 0.14, color: 'accent', sw: 1.4 });
    s.text(600, y + 26, m, { size: 13, bold: true });
  });
  s.arrow(318, 190, 442, 190, { sw: 2 });
  s.text(380, 172, 'met by', { size: 12 });
  return s.visual('Chart of security risks and the measures that answer them. Risks: transaction risks of default on order, delivery or payment; data storage and transmission risks such as viruses and hacking; and risks to intellectual property and privacy. Measures: encryption, digital signatures and certificates, passwords and one-time passwords, firewalls and secure websites', 'Three kinds of risk, five kinds of measure.');
})();

const vOutWeb = (() => {
  const s = new Svg(760, 385);
  const C = { x: 290, y: 150, w: 180, h: 80 };
  const needs = [['Focus on the', 'core business'], ['Quest for', 'excellence'], ['Cost reduction', 'by economies of scale'], ['Knowledge sharing', 'and collaboration'], ['Catalyst for', 'economic development']];
  const concerns = [['Confidentiality', 'of data'], ['Sweatshop', 'exploitation'], ['Ethical', 'concerns'], ['Opposition in', 'home countries']];
  const L = needs.map((t, i) => ({ x: 10, y: 40 + i * 68, w: 220, h: 52, t }));
  const R = concerns.map((t, i) => ({ x: 530, y: 40 + i * 90, w: 220, h: 52, t }));
  [...L, ...R].forEach((b) => link(s, C, b));
  s.rect(C.x, C.y, C.w, C.h, { fill: 'accent', fillOpacity: 0.18, color: 'accent', sw: 2 });
  s.text(C.x + C.w / 2, C.y + 30, 'Outsourcing', { size: 15, bold: true });
  s.text(C.x + C.w / 2, C.y + 56, 'to outside specialists', { size: 12 });
  s.text(120, 18, 'Need', { size: 15, bold: true });
  s.text(640, 18, 'Concerns', { size: 15, bold: true });
  L.forEach((b) => { s.rect(b.x, b.y, b.w, b.h, { fill: 'fill', color: 'accent', sw: 1.4 }); s.text(b.x + 110, b.y + 17, b.t[0], { size: 13, bold: true }); s.text(b.x + 110, b.y + 36, b.t[1], { size: 12 }); });
  R.forEach((b) => { s.rect(b.x, b.y, b.w, b.h, { fill: 'fill', color: 'muted', sw: 1.4 }); s.text(b.x + 110, b.y + 17, b.t[0], { size: 13, bold: true }); s.text(b.x + 110, b.y + 36, b.t[1], { size: 12 }); });
  return s.visual('Web around outsourcing. Needs on the left: focus on the core business, quest for excellence, cost reduction by economies of scale, knowledge sharing and collaboration, and a catalyst for economic development. Concerns on the right: confidentiality of data, sweatshop exploitation, ethical concerns and opposition in home countries', 'Why firms outsource, and what worries people.');
})();

// ---------------------------------------------------------------- tables and flows
const vRoute1 = flow('LR', ['E-business and e-commerce', 'Scope and benefits', 'Limitations', 'Online transaction stages', 'Payment mechanisms'], 'Route map of Part 1: e-business and e-commerce, scope and benefits, limitations, stages of an online transaction and payment mechanisms');
const vRoute2 = flow('LR', ['Security risks', 'Security measures', 'Resources for e-business', 'Outsourcing', 'Need and concerns'], 'Route map of Part 2: security risks, security measures, resources for e-business, outsourcing, and need and concerns');
const vDef = table(['Point', 'Meaning'], [
  ['E-business', 'Carrying out the processes of industry, trade and commerce with the help of computer networks'],
  ['E-commerce', 'Buying and selling online, with the dealings with customers and suppliers around it'],
  ['Imagined example', 'Pustak Ghar sells books on its site and also keeps its stock and staff records on a network'],
], 'Table defining e-business as carrying out the processes of industry, trade and commerce with computer networks, and e-commerce as buying and selling online, with the imagined Pustak Ghar as example');
const vCompare = table(['Idea', 'E-business', 'E-commerce'], [
  ['Wider or narrower', 'The wider idea', 'A part of e-business'],
  ['Processes covered', 'All business processes over networks', 'Buying and selling and related dealings'],
  ['Inside the firm', 'Includes internal processes', 'Mainly concerns outside parties'],
  ['Imagined example', 'Online staff records and online sales', 'Online sales of Pustak Ghar only'],
], 'Table comparing e-business and e-commerce on breadth, processes covered, internal processes and an imagined example');
const vTypes = table(['Type', 'Parties', 'Imagined example'], [
  ['Business to business', 'Firm and firm', 'Pustak Ghar orders books from a publisher on a trade portal'],
  ['Business to customer', 'Firm and individual buyer', 'A student buys a dictionary from the Pustak Ghar site'],
  ['Intra-business', 'Departments and staff of one firm', 'Staff of Pustak Ghar book leave on the firm network'],
  ['Customer to customer', 'One private person and another', 'A student sells an old atlas to another student'],
], 'Table of four types of e-business dealing with the parties and an imagined example of each');
const vClues = table(['Clue in an imagined case', 'Type it points to'], [
  ['A tea estate sells ten tonnes to a packing firm through its trade portal', 'Business to business'],
  ['A cook buys a pressure pan from a store website', 'Business to customer'],
  ['A firm opens a network where its own staff file travel claims', 'Intra-business'],
  ['A retired teacher sells a used cycle to a neighbour on a classified portal', 'Customer to customer'],
], 'Worked example table of clues and the type of e-business each points to: firm to firm is business to business, firm to buyer is business to customer, staff of one firm is intra-business, and one private person to another is customer to customer', 'Ask who the two parties are.');
const vBen = table(['Benefit', 'Meaning'], [
  ['Ease of formation, lower investment', 'A firm can start without costly premises'],
  ['Convenience', 'Business is open at any time, day and night'],
  ['Speed', 'Orders, payments and records move in moments'],
  ['Global reach and access', 'Buyers and sellers in distant places can meet'],
  ['Move towards a paperless society', 'Documents are made and sent electronically'],
], 'Table of five benefits of e-business: ease of formation and lower investment, convenience, speed, global reach and access, and a move towards a paperless society');
const vSave = table(['Item (imagined Pustak Ghar)', 'Rs a month'], [
  ['Rent of a shop in the main market', fmt(SHOP.rent)],
  ['Rent of the stock room used instead', fmt(SHOP.online)],
  ['Saving each month', fmt(SHOP.save)],
  ['Saving in a year', fmt(SHOP.year)],
], 'Worked example table: a shop would cost forty five thousand rupees a month and the stock room twelve thousand, so the monthly saving is thirty three thousand and the yearly saving is three lakh ninety six thousand rupees', 'Saving equals shop rent minus stock room rent.');
const vLim = table(['Limitation', 'Meaning'], [
  ['Low personal touch', 'Buyers cannot see, touch or discuss goods face to face'],
  ['Mismatch of speeds', 'Orders are taken in seconds, but delivery takes days'],
  ['Need for technology capability', 'All parties must have the equipment and the skill'],
  ['Risk from anonymity', 'The parties may not know who is on the other side'],
  ["People's resistance", 'Some people prefer the old ways'],
  ['Ethical fallouts', 'For example, secret monitoring of employees'],
], 'Table of six limitations of e-business: low personal touch, mismatch of speeds, need for technology capability, risk from anonymity, resistance by people and ethical fallouts');
const vStageDetail = table(['Stage', 'What happens', 'Imagined case (Pustak Ghar)'], [
  ['Pre-purchase or pre-sale', 'The buyer seeks information; the seller advertises', 'Veda reads a banner about a school-book sale'],
  ['Purchase or sale: registration', 'The buyer gives name, address and phone', 'Veda registers on the site'],
  ['Purchase or sale: order', 'Goods go into the shopping cart and the order is confirmed', 'Veda confirms four books in the cart'],
  ['Purchase or sale: payment', 'The buyer pays by an agreed method', 'Veda pays through net banking'],
  ['Delivery', 'The goods are packed, sent and received', 'The courier brings the parcel'],
], 'Table of the stages of an online transaction with what happens and an imagined case at Pustak Ghar');
const vPayA = table(['Mechanism', 'How it works, as of 2024'], [
  ['Cash on delivery', 'The buyer pays the courier in cash when the goods arrive'],
  ['Cheque', 'The buyer sends a written order to the bank to pay; it needs clearing'],
  ['Net banking transfer', 'The buyer moves money from her account through the bank website'],
], 'Table of three payment mechanisms as of 2024: cash on delivery, cheque and net banking transfer');
const vPayB = table(['Mechanism', 'How it works, as of 2024'], [
  ['Credit and debit cards', 'A debit card pays from the bank balance; a credit card lets the buyer pay later within a limit'],
  ['Digital cash and e-wallets', 'The buyer loads a prepaid balance and uses it for payments'],
  ['Unified payments interface', 'The buyer approves a payment on a phone and money moves between bank accounts at once'],
], 'Table of three payment mechanisms as of 2024: credit and debit cards, digital cash and e-wallets, and the unified payments interface');
const vOrd = table(['Item (imagined order at Pustak Ghar)', 'Rs'], [
  [`Three books at Rs ${ORD.three} each plus one at Rs ${ORD.one}`, fmt(ORD.sub)],
  [`Coupon of ${ORD.discPct} per cent on the book total`, `minus ${fmt(ORD.disc)}`],
  ['Delivery charge', `plus ${fmt(ORD.ship)}`],
  ['Amount to pay, by any method', fmt(ORD.pay)],
], 'Worked example table: three books at two hundred and forty rupees and one at three hundred and fifty rupees come to one thousand and seventy; a ten percent coupon takes off one hundred and seven and the delivery charge adds forty, so the amount to pay is one thousand and three rupees', 'Total, discount, charge, amount to pay.');
const vSummary1 = table(['Idea', 'Remember'], [
  ['E-business and e-commerce', 'E-commerce is a part of e-business'],
  ['Scope', 'Business to business, business to customer, intra-business, customer to customer'],
  ['Benefits and limitations', 'Five benefits; six limitations'],
  ['Stages and payment', 'Pre-purchase, purchase, delivery; six payment methods as of 2024'],
], 'Summary table of Part 1: e-business and e-commerce, scope, benefits and limitations, stages and payment');
const vTips1 = table(['Common mistake', 'Fix'], [
  ['Treating e-business and e-commerce as the same', 'E-commerce is a part of e-business'],
  ['Listing types with no example', 'Add a made-up firm or customer for each type'],
  ['Naming real shopping sites or apps', 'Use an imagined firm'],
  ['Writing payment methods with no date', 'Add as of 2024'],
], 'Exam tips table: four common mistakes about e-business and e-commerce, examples, real names and dated payment methods');

const vRisks = table(['Risk', 'Meaning'], [
  ['Transaction risks', 'Default on order-taking or order-giving, on delivery, or on payment'],
  ['Data storage and transmission risks', 'Viruses, hacking and loss of data in storage or in transit'],
  ['Risks to intellectual property and privacy', 'Copying of designs and text; leak of personal information'],
], 'Table of three kinds of security risk: transaction risks, data storage and transmission risks, and risks to intellectual property and privacy');
const vRiskDetail = table(['Imagined case', 'Risk'], [
  ['A buyer receives goods from Pustak Ghar and never pays', 'Transaction risk: default on payment'],
  ['A virus damages the order file of a tea shop', 'Data storage and transmission risk'],
  ['A rival copies the photographs of a handicraft cooperative', 'Risk to intellectual property'],
  ['An outsider reads customer phone numbers', 'Risk to privacy'],
], 'Table of four imagined cases and the risk each shows: default on payment, a virus damaging stored data, copying of photographs, and reading of private phone numbers');
const vRiskEx = table(['Clue in an imagined case', 'Risk'], [
  ['The seller took the advance and sent no goods', 'Transaction risk: default on delivery'],
  ['A hacker entered the server of an online shop', 'Data storage and transmission risk'],
  ['A competitor used a firm logo and text without leave', 'Risk to intellectual property'],
], 'Worked example table of clues and the risk each points to: no goods after an advance is default on delivery, a hacker in the server is a data risk, and a copied logo is a risk to intellectual property', 'Read the clue, then name the risk.');
const vEncSig = table(['Measure', 'What it does'], [
  ['Encryption', 'Scrambles data so that only the holder of the key can read it'],
  ['Digital signature', 'Shows who sent an electronic record and that it was not changed'],
  ['Digital certificate', 'Issued by a trusted body to show that a key belongs to a named party'],
  ['Legal note, as of 2024', 'The Information Technology Act 2000 gives legal recognition to electronic records and digital signatures'],
], 'Table of encryption, digital signature and digital certificate with what each does, and a dated legal note that the Information Technology Act 2000 gives legal recognition to electronic records and digital signatures as of 2024');
const vPwFw = table(['Measure', 'What it does'], [
  ['Password', 'Lets only authorised users into an account'],
  ['One-time password', 'A code valid for one transaction or login, which soon expires'],
  ['Firewall', 'Filters traffic between a private network and the internet'],
  ['Secure website', 'Uses an encrypted connection, shown by a padlock and a secure web address, as of 2024'],
], 'Table of passwords, one-time passwords, firewalls and secure websites with what each does');
const vMeasureEx = table(['Need of an imagined shop', 'Measure'], [
  ['Hide card numbers while they travel to the bank', 'Encryption'],
  ['Prove that an export order really came from the buyer', 'Digital signature'],
  ['Make each payment need a fresh code from the phone', 'One-time password'],
  ['Block unknown traffic at the edge of the network', 'Firewall'],
], 'Worked example table of needs of an imagined shop and the measure for each: encryption hides card numbers, a digital signature proves the sender of an order, a one-time password gives a fresh code, and a firewall blocks unknown traffic', 'State the need, then the measure.');
const vRes = table(['Resource', 'Why it is needed'], [
  ['A well-designed website', 'Easy to use, clear in showing goods and prices'],
  ['Technology and security infrastructure', 'Servers, networks and protection against hacking'],
  ['Logistics', 'Packing, carrying and tracking of goods'],
  ['Payment systems', 'Safe ways for customers to pay'],
], 'Table of four resources needed for successful e-business: a well-designed website, technology and security infrastructure, logistics and payment systems');
const vOutDef = table(['Point', 'Meaning'], [
  ['Outsourcing', 'Contracting some activities of a firm to outside specialists'],
  ['Usually outsourced', 'Non-core activities, and sometimes core ones'],
  ['Business process outsourcing', 'Routine business processes handed to a specialist, such as a helpline'],
  ['Knowledge process outsourcing', 'Work that needs expert knowledge, such as research or analysis'],
], 'Table defining outsourcing as contracting some activities of a firm to outside specialists, usually non-core and sometimes core, with business process outsourcing for routine processes and knowledge process outsourcing for expert work');
const vOutScope = table(['Area', 'Imagined example'], [
  ['Finance and accounting', 'Madhuvan Tools gives its payroll to a specialist'],
  ['Advertising', 'A bakery gives its posters and online campaign to an agency'],
  ['Courier and logistics', 'Pustak Ghar gives parcel delivery to a carrier'],
  ['Customer support', 'A broadband firm gives its helpline to a call centre'],
  ['Production and manufacturing', 'A toy brand has its toys made by a contract factory'],
], 'Table of five areas of outsourcing with an imagined example of each: finance and accounting, advertising, courier and logistics, customer support, and production and manufacturing');
const vNeed = table(['Need', 'Meaning'], [
  ['Focus on the core business', 'Managers spend time on the main activity'],
  ['Quest for excellence', 'Specialists do the task with higher skill'],
  ['Cost reduction', 'Specialists gain economies of scale and charge less'],
  ['Knowledge sharing and collaboration', 'Firms learn from one another'],
  ['Catalyst for economic development', 'Jobs and skills grow where the work is done'],
], 'Table of five needs for outsourcing: focus on the core business, quest for excellence, cost reduction, knowledge sharing and collaboration, and a catalyst for economic development');
const vPayEx = table(['Item (imagined Madhuvan Tools)', 'Rs a month'], [
  [`In-house: ${PAY.staff} clerks at Rs ${fmt(PAY.salary)} plus software at Rs ${fmt(PAY.software)}`, fmt(PAY.inhouse)],
  [`Vendor: ${PAY.workers} workers at Rs ${PAY.fee} each`, fmt(PAY.vendor)],
  ['Saving each month', fmt(PAY.save)],
  ['Saving in a year', fmt(PAY.year)],
], 'Worked example table: in-house payroll costs one lakh rupees a month, the vendor charges sixty thousand, so the saving is forty thousand a month and four lakh eighty thousand a year', 'Saving equals in-house cost minus vendor fee.');
const vConcerns = table(['Concern', 'Meaning'], [
  ['Confidentiality', 'Private data given to the vendor may leak'],
  ['Sweatshop exploitation', 'The vendor may pay low wages and demand long hours'],
  ['Ethical concerns', 'Questions of fairness to workers, customers and communities'],
  ['Opposition in home countries', 'People fear that jobs will move elsewhere'],
], 'Table of four concerns about outsourcing: confidentiality, sweatshop exploitation, ethical concerns and opposition in home countries');
const vSummary2 = table(['Idea', 'Remember'], [
  ['Security risks', 'Transaction; data storage and transmission; intellectual property and privacy'],
  ['Security measures', 'Encryption; digital signatures and certificates; passwords; firewalls; secure websites'],
  ['Resources', 'Website; technology and security; logistics; payment systems'],
  ['Outsourcing', 'Five needs; four concerns; business process and knowledge process types'],
], 'Summary table of Part 2: security risks, security measures, resources and outsourcing');
const vTips2 = table(['Common mistake', 'Fix'], [
  ['Writing that a digital signature scrambles data', 'Scrambling is encryption; a signature identifies the sender'],
  ['Quoting the Information Technology Act with no date', 'Add as of 2024'],
  ['Listing needs with no case clue', 'Link each need to a line of the case'],
  ['Naming real firms in outsourcing examples', 'Use made-up firms'],
], 'Exam tips table: four common mistakes about digital signatures, a dated Act, cases and real firm names');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'E-business and Online Transactions',
  goals: [
    'Distinguish e-business from e-commerce and describe its scope with imagined examples',
    'Explain the benefits and limitations of e-business',
    'Describe the stages of an online transaction',
    'Describe payment mechanisms in general terms, as of 2024',
  ],
  slides: [
    sl('title', 'E-business and Online Transactions', {
      b: 'Part 1: what e-business is, who deals with whom, and how an online purchase works.',
      v: vRoute1,
      n: 'A student orders a book at two in the morning and pays on her phone. In this part we explain what e-business is, how it differs from e-commerce, what its benefits and limits are, and how an online purchase moves from browsing to delivery and payment.',
    }),
    sl('concept', 'What is e-business?', {
      b: '**E-business** is carrying out the processes of industry, trade and commerce with the help of computer networks.',
      v: vDef,
      n: 'E-business means carrying out the processes of industry, trade and commerce with the help of computer networks. E-commerce is the buying and selling that happens online, with the dealings with customers and suppliers around it. Our imagined firm, Pustak Ghar, sells books online and also keeps its stock and staff records on a network.',
    }),
    sl('concept', 'E-business and e-commerce compared', {
      bl: ['E-commerce is a part of e-business', 'E-business also covers processes inside the firm'],
      v: vCompare,
      n: 'E-business is the wider idea. E-commerce is a part of it. E-business covers every process done over networks, including internal ones such as staff records. E-commerce mainly concerns buying and selling and the dealings with outside parties. Every e-commerce activity is e-business, but not every e-business process is e-commerce.',
    }),
    sl('check', 'Quick check: which is wider?', {
      b: 'True or false: e-commerce is a wider idea than e-business.',
      chk: 'tf_ecom_wider',
      n: 'Think about which idea includes the other, and about processes inside a firm that involve no sale.',
    }),
    sl('diagram', 'Scope of e-business', {
      v: vScope,
      n: 'This chart shows four types of e-business dealing. Business to business is a firm dealing with a firm. Business to customer is a firm selling to an individual buyer. Intra business is the use of networks inside one firm. Customer to customer is one private person dealing with another. E-commerce sits inside all of these as a part of e-business.',
    }),
    sl('concept', 'The four types with imagined examples', {
      v: vTypes,
      n: 'Pustak Ghar orders books from a publisher on a trade portal, which is business to business. A student buys a dictionary from the Pustak Ghar site, which is business to customer. Its staff book leave on the firm network, which is intra business. And one student sells an old atlas to another, which is customer to customer.',
    }),
    sl('example', 'Worked example 1: name the type', {
      b: 'Four imagined dealings. Ask who the two parties are and name the type.',
      bl: ['Step 1: Find the two parties.', 'Step 2: Check whether both are firms, or one is a person.', 'Step 3: Name the type and give the reason.'],
      v: vClues,
      n: 'Always begin with the two parties. A tea estate selling to a packing firm is business to business. A cook buying a pan from a store is business to customer. Staff of one firm filing claims is intra business. A retired teacher selling a cycle to a neighbour is customer to customer. Give a reason each time.',
    }),
    sl('check', 'Quick check: match the dealing and the type', {
      b: 'Match four imagined dealings with the type of e-business.',
      chk: 'mt_scope',
      n: 'For each dealing, ask who the seller is and who the buyer is.',
    }),
    sl('concept', 'Benefits of e-business', {
      bl: ['Lower investment and ease of formation', 'Convenience, speed and global reach', 'A move towards a paperless society'],
      v: vBen,
      n: 'E-business has five benefits. A firm can start with lower investment and without costly premises. Business is open at any time, day and night. Orders, payments and records move with speed. Buyers and sellers in distant places can meet, which is global reach. And documents are sent electronically, which is a move towards a paperless society.',
    }),
    sl('example', 'Worked example 2: the saving from going online', {
      b: 'Pustak Ghar, an imagined firm, uses a stock room instead of a shop. Find the saving.',
      bl: ['Step 1: Write the rent of the shop and of the stock room.', 'Step 2: Subtract to find the monthly saving.', 'Step 3: Multiply by twelve for the year.'],
      v: vSave,
      n: 'A shop in the main market would cost forty five thousand rupees a month. The stock room costs twelve thousand. The monthly saving is thirty three thousand rupees. Multiplied by twelve, the yearly saving is three lakh ninety six thousand rupees. This shows the benefit of lower investment and ease of formation.',
    }),
    sl('concept', 'Limitations of e-business', {
      bl: ['Low personal touch; mismatch of speeds', 'Technology, anonymity, resistance, ethical fallouts'],
      v: vLim,
      n: 'E-business has six limitations. Buyers cannot touch goods or talk face to face. Orders may be taken in seconds while delivery takes days. All parties need the technology and the skill. The parties may be anonymous. Some people resist change. And there are ethical fallouts, such as secretly watching employees.',
    }),
    sl('diagram', 'Stages of an online transaction', {
      v: vStages,
      n: 'An online transaction has three stages. In the pre purchase or pre sale stage the buyer seeks information and the seller advertises. In the purchase or sale stage the buyer registers, places the order through the shopping cart and pays. In the delivery stage the goods are packed, sent and received.',
    }),
    sl('concept', 'The stages in an imagined purchase', {
      v: vStageDetail,
      n: 'Veda reads a banner about a school book sale, which is the pre purchase stage. She registers on the site, puts four books in the shopping cart and confirms the order. She then pays through net banking. Finally the courier brings the parcel, which is the delivery stage.',
    }),
    sl('check', 'Quick check: put the events in order', {
      b: 'Arrange the events of one imagined online purchase.',
      chk: 'od_stages',
      n: 'Begin with information and end with delivery.',
    }),
    sl('diagram', 'Payment mechanisms at a glance', {
      v: vPay,
      n: 'This chart shows six ways to pay, as of two thousand twenty four. They are cash on delivery, cheque, net banking, credit and debit cards, digital cash and e wallets, and the unified payments interface. Each suits a different buyer and a different kind of purchase.',
    }),
    sl('concept', 'Cash on delivery, cheque and net banking', {
      v: vPayA,
      n: 'In cash on delivery, the buyer pays the courier in cash when the goods arrive. A cheque is a written order to the bank to pay, and it needs clearing. In a net banking transfer, the buyer moves money from her account through the bank website. These descriptions are general and hold as of two thousand twenty four.',
    }),
    sl('concept', 'Cards, wallets and instant transfers', {
      v: vPayB,
      n: 'A debit card pays from the bank balance. A credit card lets the buyer pay later within a limit. Digital cash and e wallets hold a prepaid balance. The unified payments interface lets a buyer approve a payment on a phone, and money moves between bank accounts at once. All of this is as of two thousand twenty four.',
    }),
    sl('check', 'Quick check: name the payment mechanism', {
      b: 'An imagined buyer pays from a prepaid balance kept inside an app.',
      chk: 'mc_wallet',
      n: 'Think about where the money was stored before the purchase.',
    }),
    sl('example', 'Worked example 3: the amount to pay', {
      b: 'An imagined order at Pustak Ghar has a coupon and a delivery charge. Find the amount to pay.',
      bl: ['Step 1: Add the prices of all books.', 'Step 2: Take off the coupon on the book total.', 'Step 3: Add the delivery charge.'],
      v: vOrd,
      n: 'Three books at two hundred and forty rupees and one at three hundred and fifty come to one thousand and seventy rupees. A ten percent coupon takes off one hundred and seven. The delivery charge adds forty. So the amount to pay is one thousand and three rupees, whichever payment method the buyer picks.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up. E-commerce is a part of e-business. The scope covers business to business, business to customer, intra business and customer to customer. There are five benefits and six limitations. An online transaction has three stages, and there are six payment mechanisms in general use, as of two thousand twenty four.',
    }),
    sl('exam-tips', 'Exam tips', {
      v: vTips1,
      bl: ['Give an imagined example for every type.', 'Add as of 2024 to payment methods.'],
      n: 'Some tips. Remember that e-commerce is a part of e-business. Give an example for each type of dealing, using a made up firm. Do not name real shopping sites. And write as of two thousand twenty four next to payment methods, since they change.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Online Security and Outsourcing',
  goals: [
    'Identify the security risks of online transactions',
    'Explain security measures, with a dated note on the Information Technology Act 2000',
    'List the resources needed for successful e-business',
    'Explain the concept, scope, need and concerns of outsourcing using imagined cases',
  ],
  slides: [
    sl('title', 'Online Security and Outsourcing', {
      b: 'Part 2: risks and protections online, then outsourcing to outside specialists.',
      v: vRoute2,
      n: 'Online business brings new risks, and firms have new ways to protect themselves. In this part we study security risks and measures, the resources a firm needs for e-business, and then outsourcing, which means handing activities to outside specialists.',
    }),
    sl('concept', 'Security risks of online transactions', {
      bl: ['Transaction risks', 'Data storage and transmission risks', 'Intellectual property and privacy risks'],
      v: vRisks,
      n: 'There are three kinds of risk. Transaction risks are defaults on order taking or order giving, on delivery, or on payment. Data storage and transmission risks include viruses and hacking. And there are risks to intellectual property and to privacy, such as copying of designs or leaking of personal details.',
    }),
    sl('concept', 'Risks in imagined cases', {
      v: vRiskDetail,
      n: 'A buyer who never pays after receiving goods shows a transaction risk. A virus damaging an order file is a data risk. A rival copying the photographs of a handicraft cooperative is a risk to intellectual property. An outsider reading customer phone numbers is a risk to privacy.',
    }),
    sl('example', 'Worked example 1: name the risk', {
      b: 'Three imagined cases. Underline the clue and name the risk.',
      bl: ['Step 1: Find what went wrong.', 'Step 2: Ask whether it concerns a promise, data, or ownership of ideas.', 'Step 3: Name the risk.'],
      v: vRiskEx,
      n: 'If a seller takes an advance and sends no goods, that is a default on delivery, a transaction risk. A hacker entering a server is a data storage and transmission risk. A competitor using a logo and text without leave is a risk to intellectual property. Always say which clue led to your answer.',
    }),
    sl('diagram', 'Risks and the measures that answer them', {
      v: vSecurity,
      n: 'This chart sets the risks beside the measures. The three risks are transaction risks, data storage and transmission risks, and risks to intellectual property and privacy. The five measures are encryption, digital signatures and certificates, passwords and one time passwords, firewalls and secure websites.',
    }),
    sl('concept', 'Encryption, digital signatures and certificates', {
      v: vEncSig,
      n: 'Encryption scrambles data so that only the holder of the key can read it. A digital signature shows who sent an electronic record and that it was not changed. A digital certificate is issued by a trusted body to show that a key belongs to a named party. As of two thousand twenty four, the Information Technology Act of two thousand gives legal recognition to electronic records and digital signatures.',
    }),
    sl('check', 'Quick check: the Information Technology Act', {
      b: 'Fill in the year and the kind of signature, as of 2024.',
      chk: 'fb_it_act',
      n: 'Recall the year of the Act and the kind of signature that it recognises.',
    }),
    sl('concept', 'Passwords, one time passwords, firewalls and secure sites', {
      v: vPwFw,
      n: 'A password lets only authorised users into an account. A one time password is a code valid for a single transaction, and it soon expires. A firewall filters traffic between a private network and the internet. A secure website uses an encrypted connection, which browsers show with a padlock and a secure web address, as of two thousand twenty four.',
    }),
    sl('check', 'Quick check: match the measure and its work', {
      b: 'Match four security measures with the work each does.',
      chk: 'mt_security',
      n: 'Think about whether the measure hides data, filters traffic, limits a code, or vouches for identity.',
    }),
    sl('example', 'Worked example 2: choose the measure', {
      b: 'Four needs of an imagined online shop. Pick the measure for each.',
      bl: ['Step 1: State what must be protected.', 'Step 2: Ask whether it is content, identity, access or traffic.', 'Step 3: Name the measure.'],
      v: vMeasureEx,
      n: 'To hide card numbers on their way to the bank, use encryption. To prove that an export order came from the buyer, use a digital signature. To make each payment need a fresh code, use a one time password. To block unknown traffic at the edge of the network, use a firewall.',
    }),
    sl('concept', 'Resources for successful e-business', {
      v: vRes,
      n: 'A firm needs four kinds of resources. A well designed website that is easy to use. Technology and security infrastructure, such as servers and protection against hacking. Logistics, to pack, carry and track goods. And payment systems that let customers pay safely.',
    }),
    sl('concept', 'What is outsourcing?', {
      b: '**Outsourcing** means contracting some activities of a firm to outside specialists.',
      v: vOutDef,
      n: 'Outsourcing means contracting some activities of a firm to outside specialists. Usually the activities are non core, though sometimes core activities are outsourced. In business process outsourcing a routine process, such as a helpline, is handed over. In knowledge process outsourcing, work needing expert knowledge, such as research, is handed over.',
    }),
    sl('concept', 'Scope of outsourcing', {
      v: vOutScope,
      n: 'Firms outsource in five main areas. Finance and accounting, such as payroll. Advertising. Courier and logistics. Customer support through call centres. And production and manufacturing. Each example in this table is imagined.',
    }),
    sl('diagram', 'Need and concerns of outsourcing', {
      v: vOutWeb,
      n: 'This web has outsourcing in the middle. On the left are the needs, which are focus on the core business, the quest for excellence, cost reduction, knowledge sharing, and a catalyst for economic development. On the right are the concerns, which are confidentiality, sweatshop exploitation, ethical concerns and opposition in home countries.',
    }),
    sl('concept', 'The need for outsourcing', {
      v: vNeed,
      n: 'Managers can focus on the core business. Specialists bring a quest for excellence. They gain economies of scale and so charge less, which reduces cost. Firms share knowledge and collaborate. And outsourcing can act as a catalyst for economic development, since jobs and skills grow where the work is done.',
    }),
    sl('check', 'Quick check: the area of outsourcing', {
      b: 'An imagined firm hands the pay of its workers to a specialist. Name the area.',
      chk: 'mc_out_pay',
      n: 'Think about which department normally prepares pay slips.',
    }),
    sl('example', 'Worked example 3: the saving from outsourcing payroll', {
      b: 'Compare the cost of doing payroll in the firm with the fee of an imagined vendor.',
      bl: ['Step 1: Add the clerks salaries and the software cost.', 'Step 2: Find the vendor fee for all workers.', 'Step 3: Subtract and multiply by twelve.'],
      v: vPayEx,
      n: 'Three clerks at twenty eight thousand rupees and software at sixteen thousand cost one lakh rupees a month. The vendor charges one hundred and fifty rupees for each of four hundred workers, which is sixty thousand. The saving is forty thousand a month, and four lakh eighty thousand in a year.',
    }),
    sl('concept', 'Concerns about outsourcing', {
      v: vConcerns,
      n: 'There are four concerns. Private data given to the vendor may leak, which is the concern of confidentiality. The vendor may pay low wages and demand long hours, which is sweatshop exploitation. There are wider ethical concerns. And people in home countries may oppose outsourcing because they fear that jobs will move elsewhere.',
    }),
    sl('check', 'Quick check: what is outsourcing?', {
      b: 'True or false: in outsourcing, a firm contracts some activities to outside specialists.',
      chk: 'tf_out',
      n: 'Recall the meaning of outsourcing in one line.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up. The security risks are transaction risks, data risks, and risks to intellectual property and privacy. The measures are encryption, digital signatures and certificates, passwords, firewalls and secure websites. A firm needs a website, security infrastructure, logistics and payment systems. Outsourcing has five needs and four concerns.',
    }),
    sl('exam-tips', 'Exam tips', {
      v: vTips2,
      bl: ['Encryption scrambles; a signature identifies.', 'Add as of 2024 to the Information Technology Act.'],
      n: 'Some tips. A digital signature identifies the sender, while encryption scrambles data. Write as of two thousand twenty four beside the Information Technology Act. Link each need or concern to a line in the case. And use made up firms in your examples.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Emerging Modes of Business: notes',
  sections: [
    {
      h: '1. E-business: meaning and scope',
      t: 1,
      b: '**E-business** means carrying out the processes of industry, trade and commerce by using computer networks. **E-commerce** is the buying and selling of goods and services online, with the dealings with customers and suppliers that go with it. E-commerce is a part of e-business; e-business also covers processes inside the firm, such as staff records.\n\n**Scope (imagined examples):**\n1. **Business to business:** a firm deals with a firm, e.g. an online bookshop orders stock from a publisher.\n2. **Business to customer:** a firm sells to an individual buyer, e.g. a student buys a dictionary from the shop\'s site.\n3. **Intra-business:** processes inside one firm, e.g. staff apply for leave on the firm network.\n4. **Customer to customer:** one private person deals with another, e.g. a student sells an old atlas to another.',
      terms: [['E-business', 'The conduct of industry, trade and commerce processes with the help of computer networks.'], ['E-commerce', 'Buying and selling online, with the dealings with customers and suppliers; a part of e-business.']],
      v: vScope,
      vs: [vDef, vTypes],
    },
    {
      h: '2. Benefits and limitations of e-business',
      t: 1,
      b: '**Benefits:** ease of formation and lower investment; convenience, as business can run at any time; speed; global reach and access; and a move towards a paperless society.\n\n**Limitations:** low personal touch; mismatch between the speed of order-taking and of delivery; the need for technology capability and competence on all sides; risk from the anonymity of the parties; people\'s resistance; and ethical fallouts, such as the monitoring of employees.\n\n**Worked check:** a shop at Rs 45,000 a month against a stock room at Rs 12,000 saves Rs 33,000 a month, or Rs 3,96,000 a year.',
      terms: [['Global reach', 'The ability of an online business to deal with buyers and sellers in distant places.']],
      v: vBen,
      vs: [vLim, vSave],
    },
    {
      h: '3. Stages of an online transaction and payment mechanisms',
      t: 2,
      b: 'An online transaction has three stages. **Pre-purchase or pre-sale:** information and advertising. **Purchase or sale:** registration, placing the order (the shopping cart) and payment. **Delivery:** the goods are packed, sent and received.\n\n**Payment mechanisms, as of 2024:**\n- **Cash on delivery:** the buyer pays the courier in cash on arrival.\n- **Cheque:** a written order to the bank to pay, which needs clearing.\n- **Net banking transfer:** a transfer from the account through the bank\'s website.\n- **Credit and debit cards:** a debit card pays from the account balance; a credit card allows payment later within a limit.\n- **Digital cash and e-wallets:** a prepaid stored balance.\n- **Unified payments interface:** an instant transfer between bank accounts, started from a phone.\n\n**Dated note, as of 2024:** payment systems change quickly, so check the present position before relying on this list.',
      terms: [['Shopping cart', 'A facility on a website in which a buyer collects the items to be bought before confirming the order.'], ['E-wallet', 'A prepaid stored balance, kept electronically and used to pay.']],
      v: vStages,
      vs: [vPay, vOrd],
    },
    {
      h: '4. Security risks and measures',
      t: 2,
      b: '**Risks:**\n1. **Transaction risks:** default on order-taking or order-giving, on delivery, or on payment.\n2. **Data storage and transmission risks:** viruses, hacking and loss of data.\n3. **Risks to intellectual property and privacy:** copying of designs and text; leaking of personal information.\n\n**Measures:**\n- **Encryption:** scrambling data so that only the key-holder can read it.\n- **Digital signatures and certificates:** a signature shows who sent a record and that it was not altered; a certificate from a trusted body shows that a key belongs to a named party.\n- **Passwords and one-time passwords:** a password admits authorised users; a one-time password is valid for a single use.\n- **Firewalls:** filters between a private network and the internet.\n- **Secure websites:** an encrypted connection, shown by a padlock and a secure web address, as of 2024.\n\n**Dated note, as of 2024:** the Information Technology Act 2000 gives legal recognition to electronic records and digital signatures.',
      terms: [['Encryption', 'The scrambling of data into a coded form that only the holder of the right key can read.'], ['Firewall', 'A barrier that filters traffic between a private network and the internet.']],
      v: vSecurity,
      vs: [vRisks, vEncSig, vPwFw],
    },
    {
      h: '5. Resources for successful e-business',
      t: 2,
      b: 'A firm needs: a **well-designed website** that is easy to use; **technology and security infrastructure** such as servers, networks and protection against hacking; **logistics** to pack, carry and track goods; and **payment systems** that let customers pay safely.\n\nA weakness in any one resource spoils the whole experience, however strong the others are. A fine site with no delivery tie-up still leaves customers waiting.',
      terms: [['Logistics', 'The packing, storage, carriage and tracking of goods from seller to buyer.']],
      v: vRes,
      vs: [vMeasureEx],
    },
    {
      h: '6. Outsourcing: concept and scope',
      t: 3,
      b: '**Outsourcing** means contracting some of a firm\'s activities to outside specialists. The activities are usually non-core, and sometimes core. In **business process outsourcing** routine processes, such as a customer helpline, are handed over. In **knowledge process outsourcing** work that needs expert knowledge and analysis is handed over.\n\n**Scope:** finance and accounting; advertising; courier and logistics; customer support through call centres; production and manufacturing.',
      terms: [['Outsourcing', 'Contracting some of the activities of a firm to outside specialists.'], ['Knowledge process outsourcing', 'Handing work that needs expert knowledge and analysis to an outside specialist.']],
      v: vOutDef,
      vs: [vOutScope],
    },
    {
      h: '7. Need for outsourcing and concerns',
      t: 3,
      b: '**Need:** focus on the core business; the quest for excellence; cost reduction through the economies of scale of specialists; growth through knowledge sharing and collaboration among organisations; and a catalyst for economic development.\n\n**Concerns:** confidentiality of data; sweatshop exploitation of the vendor\'s workers; ethical concerns; and opposition in home countries, where people fear a loss of jobs.\n\n**Worked check:** in-house payroll at Rs 1,00,000 a month against a vendor fee of Rs 60,000 saves Rs 40,000 a month, or Rs 4,80,000 a year.',
      terms: [['Economies of scale', 'Lower cost per unit that comes when a firm does a very large volume of the same work.']],
      v: vOutWeb,
      vs: [vNeed, vConcerns, vPayEx],
    },
  ],
  tips: '**Common mistakes**\n- Treating e-business and e-commerce as the same; e-commerce is a part of e-business.\n- Naming types of e-business with no example; add a made-up firm.\n- Naming real shopping sites or firms; use imagined ones.\n- Writing payment methods or the Information Technology Act without the words as of 2024.\n- Saying that a digital signature scrambles data; scrambling is encryption.\n- Listing the need for outsourcing with no link to the case.\n\n**How marks are usually awarded**\n- 1 mark: a correct option or a quoted line from the case.\n- 2 and 3 marks: one point per benefit, limitation, measure or need, with a short explanation.\n- 5 marks: five points, each with an explanation, in a numbered list.\n- Case questions: quote the line, name the concept, explain in a sentence.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**E-business**', 'Carrying out the processes of industry, trade and commerce with the help of computer networks.', 'definition', 1],
  ['**E-commerce**', 'Buying and selling online, with the dealings with customers and suppliers; a part of e-business.', 'definition', 1],
  ['E-business and e-commerce: which is wider?', 'E-business is wider; e-commerce is a part of it.', 'concept', 1],
  ['Four types of e-business dealing', 'Business to business, business to customer, intra-business, customer to customer.', 'fact', 1],
  ['**Business to business**', 'A firm deals with another firm.', 'definition', 1],
  ['**Business to customer**', 'A firm sells to an individual buyer.', 'definition', 1],
  ['**Intra-business**', 'E-business processes inside one firm.', 'definition', 1],
  ['**Customer to customer**', 'One private person deals directly with another.', 'definition', 1],
  ['Five benefits of e-business', 'Ease of formation and lower investment; convenience; speed; global reach; a move towards a paperless society.', 'fact', 1],
  ['Convenience as a benefit', 'Business can run at any time, day and night.', 'concept', 1],
  ['Six limitations of e-business', 'Low personal touch; mismatch of speeds; need for competence; anonymity; resistance; ethical fallouts.', 'fact', 1],
  ['Mismatch of speeds', 'Orders are taken in seconds, but delivery can take days.', 'concept', 1],
  ['Three stages of an online transaction', 'Pre-purchase or pre-sale; purchase or sale; delivery.', 'fact', 2],
  ['Steps of the purchase or sale stage', 'Registration; placing the order in the shopping cart; payment.', 'fact', 2],
  ['**Shopping cart**', 'A facility on a website in which a buyer collects items before confirming the order.', 'definition', 2],
  ['Payment mechanisms, as of 2024', 'Cash on delivery; cheque; net banking; credit and debit cards; digital cash and e-wallets; unified payments interface.', 'fact', 2],
  ['Debit card and credit card', 'A debit card pays from the balance; a credit card lets the buyer pay later within a limit (as of 2024).', 'concept', 2],
  ['**Digital cash or e-wallet**', 'A prepaid stored balance used to pay.', 'definition', 2],
  ['Three kinds of security risk', 'Transaction risks; data storage and transmission risks; risks to intellectual property and privacy.', 'fact', 2],
  ['Transaction risks', 'Default on order-taking or order-giving, on delivery, or on payment.', 'concept', 2],
  ['**Encryption**', 'Scrambling data so that only the holder of the right key can read it.', 'definition', 2],
  ['Digital signature', 'Shows who sent an electronic record and that it was not changed.', 'concept', 2],
  ['Information Technology Act 2000 (as of 2024)', 'Gives legal recognition to electronic records and digital signatures.', 'exam-tip', 2],
  ['**One-time password**', 'A code valid for a single transaction or login, which soon expires.', 'definition', 2],
  ['**Firewall**', 'A barrier that filters traffic between a private network and the internet.', 'definition', 2],
  ['Resources for e-business', 'Well-designed website; technology and security infrastructure; logistics; payment systems.', 'fact', 2],
  ['**Outsourcing**', 'Contracting some of the activities of a firm to outside specialists.', 'definition', 3],
  ['Business process outsourcing', 'Handing routine business processes, such as a helpline, to a specialist.', 'concept', 3],
  ['Knowledge process outsourcing', 'Handing work that needs expert knowledge, such as research, to a specialist.', 'concept', 3],
  ['Scope of outsourcing', 'Finance and accounting; advertising; courier and logistics; customer support; production and manufacturing.', 'fact', 3],
  ['Five needs for outsourcing', 'Focus on core business; excellence; cost reduction; knowledge sharing; catalyst for economic development.', 'fact', 3],
  ['Four concerns about outsourcing', 'Confidentiality; sweatshop exploitation; ethical concerns; opposition in home countries.', 'fact', 3],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short): Emerging Modes of Business',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['mc_c2c_id', 'mc_risk_data', 'mc_bpo_id', 'ar_digsig'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer the 2-mark questions in about 30 to 50 words and the 3-mark question in about 50 to 80 words.', items: ['s2_eb_def', 's2_cart', 's3_out_need'] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80 to 120 words.', items: [{ attempt: 1, keys: ['l_stages', 'l_benlim'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks)', instr: 'Read the case and answer all parts. Part (c) has an internal choice.', items: ['cb_shield'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long): Emerging Modes of Business',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['mc_eb_def', 'mc_intrab_id', 'mc_lim_speed', 'mc_cod', 'mc_risk_trans', 'mc_digsig', 'mc_out_cost', 'mc_out_confid', 'ar_ecom_part', 'ar_outsource'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and 3-mark questions in about 50 to 80 words. Questions 13 and 15 have an internal choice.', items: ['s2_anon', 's2_upi', { attempt: 1, keys: ['s2_bpo_kpo', 's2_ip'] }, 's3_benefits', { attempt: 1, keys: ['s3_payment', 's3_out_concerns'] }] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80 to 120 words each.', items: ['l_scope', { attempt: 1, keys: ['l_secmeasures', 'l_out_need'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks each)', instr: 'Read each case and answer all parts. Part (c) of each has an internal choice.', items: ['cb_kala', 'cb_payroll'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 to t03 of cbse-11-business-studies-ch05 only (e-business scope and benefits; online transactions and security; outsourcing)',
    originality: 'every firm, website, cooperative, buyer and customer is imagined and written by SOYL; no real e-commerce company or app is named; no NCERT text, example or exercise and no board or sample-paper item reused (D-036)',
    data: 'figures computed in the build: order total, discount and amount to pay; shop against stock room rent; export advance and balance; in-house against vendor payroll cost',
    facts: 'dated as of 2024: payment mechanisms, secure website signs, and the legal recognition of electronic records and digital signatures under the Information Technology Act 2000',
    gate: 'schema, pipeline lint, deterministic verify, word limits, narration and answer-leak checks run clean in this build',
  },
});
