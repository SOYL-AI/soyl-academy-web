// Build CBSE 11 Business Studies ch08 Small Business and Enterprises. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-11-business-studies-ch08/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-business-studies-ch01/src/lib.mjs';

setUnit('cbse-11-business-studies-ch08', 'economics-commerce');
const { fmt, W, SAV, SG, MG, DH, HP, LT } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG helpers
// Line between the edges of two boxes {x, y, w, h}, along the line joining their centres.
const link = (s, A, B, o = { sw: 1.4, color: 'muted' }) => {
  const ax = A.x + A.w / 2, ay = A.y + A.h / 2, bx = B.x + B.w / 2, by = B.y + B.h / 2;
  const dx = bx - ax, dy = by - ay;
  const t = (b) => Math.min(dx !== 0 ? b.w / 2 / Math.abs(dx) : 9, dy !== 0 ? b.h / 2 / Math.abs(dy) : 9);
  s.line(ax + dx * t(A), ay + dy * t(A), bx - dx * t(B), by - dy * t(B), o);
};
const node = (s, b, title, sub, o = {}) => {
  s.rect(b.x, b.y, b.w, b.h, { fill: 'fill', color: 'accent', sw: 1.5 });
  s.text(b.x + b.w / 2, b.y + (sub ? b.h * 0.34 : b.h / 2), title, { size: o.size ?? 13, bold: true });
  if (sub) s.text(b.x + b.w / 2, b.y + b.h * 0.7, sub, { size: o.sub ?? 12 });
};

// ---------------------------------------------------------------- SVG visuals
const vWeb = (() => {
  const s = new Svg(760, 330);
  const C = { x: 270, y: 130, w: 220, h: 70 };
  const items = [
    [{ x: 10, y: 12, w: 220, h: 56 }, 'Systematic activity', 'planned and run by method'],
    [{ x: 270, y: 12, w: 220, h: 56 }, 'Innovation', 'something new to offer'],
    [{ x: 530, y: 12, w: 220, h: 56 }, 'Lawful and purposeful', 'within the law, with an aim'],
    [{ x: 70, y: 262, w: 220, h: 56 }, 'Organisation of production', 'bringing resources together'],
    [{ x: 470, y: 262, w: 220, h: 56 }, 'Risk taking', 'returns are uncertain'],
  ];
  items.forEach(([b]) => link(s, C, b));
  s.rect(C.x, C.y, C.w, C.h, { fill: 'accent', fillOpacity: 0.18, color: 'accent', sw: 2 });
  s.text(C.x + C.w / 2, C.y + 26, 'Entrepreneurship', { size: 15, bold: true });
  s.text(C.x + C.w / 2, C.y + 50, 'five characteristics', { size: 12 });
  items.forEach(([b, t, u]) => node(s, b, t, u));
  return s.visual('Web with entrepreneurship in the centre and five characteristics around it: systematic activity, innovation, lawful and purposeful activity, organisation of production and risk taking', 'Five characteristics of entrepreneurship.');
})();

const vMsme = (() => {
  const s = new Svg(760, 320);
  const I1 = { x: 10, y: 34, w: 230, h: 64 };
  const I2 = { x: 10, y: 124, w: 230, h: 64 };
  const M = { x: 300, y: 56, w: 170, h: 100 };
  const O = [0, 1, 2].map((i) => ({ x: 540, y: 28 + i * 64, w: 200, h: 50 }));
  s.text(125, 14, 'Two measures', { size: 12, muted: true });
  s.text(640, 14, 'Three classes', { size: 12, muted: true });
  s.rect(I1.x, I1.y, I1.w, I1.h, { fill: 'fill', color: 'accent', sw: 1.5 });
  s.text(125, 56, 'Investment in plant,', { size: 13, bold: true });
  s.text(125, 78, 'machinery or equipment', { size: 13, bold: true });
  s.rect(I2.x, I2.y, I2.w, I2.h, { fill: 'fill', color: 'accent', sw: 1.5 });
  s.text(125, 156, 'Annual turnover', { size: 13, bold: true });
  s.arrow(I1.x + I1.w, I1.y + 32, M.x, M.y + 30, { sw: 1.6, color: 'muted' });
  s.arrow(I2.x + I2.w, I2.y + 32, M.x, M.y + 70, { sw: 1.6, color: 'muted' });
  s.rect(M.x, M.y, M.w, M.h, { fill: 'accent', fillOpacity: 0.18, color: 'accent', sw: 2 });
  s.text(M.x + M.w / 2, M.y + 38, 'Composite', { size: 14, bold: true });
  s.text(M.x + M.w / 2, M.y + 58, 'criteria', { size: 14, bold: true });
  s.text(M.x + M.w / 2, M.y + 82, 'used together', { size: 12 });
  ['Micro enterprise', 'Small enterprise', 'Medium enterprise'].forEach((t, i) => {
    s.arrow(M.x + M.w, M.y + 50, O[i].x, O[i].y + 25, { sw: 1.6, color: 'muted' });
    node(s, O[i], t, null);
  });
  s.rect(10, 236, 360, 64, { fill: 'accent', fillOpacity: 0.12, color: 'accent', sw: 1.6 });
  s.text(190, 260, 'Same criteria for manufacturing', { size: 13, bold: true });
  s.text(190, 282, 'and for service enterprises', { size: 13, bold: true });
  s.rect(390, 236, 360, 64, { fill: 'accent', fillOpacity: 0.12, color: 'accent', sw: 1.6 });
  s.text(570, 260, 'Limits are set by the government', { size: 13, bold: true });
  s.text(570, 282, 'and revised from time to time', { size: 13, bold: true });
  return s.visual('Diagram of classification of enterprises. Two measures, investment in plant, machinery or equipment and annual turnover, are used together as composite criteria that place an enterprise as micro, small or medium. The same criteria apply to manufacturing and service enterprises, and the limits are set by the government and revised from time to time. No rupee figures are shown', 'Two measures used together; no figures.');
})();

const vProb = (() => {
  const s = new Svg(760, 380);
  const C = { x: 270, y: 150, w: 220, h: 80 };
  const top = [
    ['Finance', 'funds are hard to get'], ['Raw materials', 'supply and price'], ['Managerial skills', 'planning and control'], ['Marketing', 'reaching the buyers'],
  ].map((t, i) => [{ x: 10 + i * 190, y: 8, w: 170, h: 54 }, ...t]);
  const mid = [
    [{ x: 10, y: 164, w: 220, h: 54 }, 'Quality', 'standards and rejects'],
    [{ x: 530, y: 164, w: 220, h: 54 }, 'Capacity utilisation', 'idle capacity'],
  ];
  const bot = [
    ['Technology', 'old machines and methods'], ['Sickness', 'lasting losses, unpaid dues'], ['Global competition', 'rivals from abroad'],
  ].map((t, i) => [{ x: 10 + i * 260, y: 316, w: 220, h: 54 }, ...t]);
  const all = [...top, ...mid, ...bot];
  all.forEach(([b]) => link(s, C, b));
  s.rect(C.x, C.y, C.w, C.h, { fill: 'accent', fillOpacity: 0.18, color: 'accent', sw: 2 });
  s.text(C.x + C.w / 2, C.y + 28, 'Problems of', { size: 15, bold: true });
  s.text(C.x + C.w / 2, C.y + 52, 'small business', { size: 15, bold: true });
  all.forEach(([b, t, u]) => node(s, b, t, u, { sub: 11 }));
  return s.visual('Web with problems of small business in the centre and nine problems around it: finance, raw materials, managerial skills, marketing, quality, capacity utilisation, technology, sickness and global competition', 'Nine problems of small business.');
})();

const vGov = (() => {
  const s = new Svg(760, 330);
  const R = { x: 260, y: 8, w: 240, h: 40 };
  const cols = [
    { x: 10, name: ['National Small', 'Industries', 'Corporation'], year: '1955', d: ['marketing, raw materials,', 'machinery on hire purchase'] },
    { x: 200, name: ['District', 'Industries', 'Centres'], year: '1978', d: ['a single point of support', 'at district level'] },
    { x: 390, name: ['National Bank for', 'Agriculture and', 'Rural Development'], year: '1982', d: ['rural credit', 'and development'] },
    { x: 580, name: ['Small Industries', 'Development Bank', 'of India'], year: '1990', d: ['finance for', 'small industry'] },
  ];
  const boxes = cols.map((c) => ({ x: c.x, y: 84, w: 170, h: 146 }));
  boxes.forEach((b) => link(s, R, b));
  s.rect(R.x, R.y, R.w, R.h, { fill: 'accent', fillOpacity: 0.18, color: 'accent', sw: 2 });
  s.text(R.x + R.w / 2, R.y + 20, 'Government support', { size: 14, bold: true });
  cols.forEach((c, i) => {
    const b = boxes[i];
    s.rect(b.x, b.y, b.w, b.h, { fill: 'fill', color: 'accent', sw: 1.5 });
    c.name.forEach((l, j) => s.text(b.x + 85, b.y + 20 + j * 18, l, { size: 12, bold: true }));
    s.text(b.x + 85, b.y + 84, c.year, { size: 13, bold: true, color: 'accent' });
    c.d.forEach((l, j) => s.text(b.x + 85, b.y + 106 + j * 17, l, { size: 11 }));
  });
  s.rect(10, 262, 740, 56, { fill: 'accent', fillOpacity: 0.12, color: 'accent', sw: 1.6 });
  s.text(380, 283, 'Other support', { size: 13, bold: true });
  s.text(380, 303, 'credit guarantees, procurement preference, training', { size: 12 });
  return s.visual('Chart of government support for small business. National Small Industries Corporation, 1955: marketing, raw materials and machinery on hire purchase. District Industries Centres, 1978: a single point of support at district level. National Bank for Agriculture and Rural Development, 1982: rural credit and development. Small Industries Development Bank of India, 1990: finance for small industry. Other support: credit guarantees, procurement preference and training', 'Four institutions, in order of year.');
})();

const vLadder = (() => {
  const s = new Svg(760, 352);
  s.text(380, 16, 'A common order of use, not a fixed rule', { size: 12, muted: true });
  s.arrow(20, 42, 740, 42, { sw: 1.6, color: 'muted' });
  s.text(380, 30, 'more money raised, higher growth expected', { size: 11, muted: true });
  const steps = [
    ['Bootstrapping', '', 'own savings and', 'early earnings'],
    ['Incubators and', 'accelerators', 'space, mentors,', 'training'],
    ['Crowdfunding and', 'microfinance', 'many small sums', 'and small loans'],
    ['Angel investors', '', 'wealthy individuals', 'for a share'],
    ['Venture capital', '', 'professional funds', 'for fast growth'],
  ];
  steps.forEach((st, i) => {
    const h = 110 + i * 40;
    const x = 10 + i * 148;
    const y = 340 - h;
    s.rect(x, y, 140, h, { fill: 'accent', fillOpacity: 0.08 + i * 0.05, color: 'accent', sw: 1.6 });
    s.text(x + 70, y + 18, st[0], { size: 12, bold: true });
    if (st[1]) s.text(x + 70, y + 36, st[1], { size: 12, bold: true });
    s.text(x + 70, y + 60, st[2], { size: 11 });
    s.text(x + 70, y + 76, st[3], { size: 11 });
  });
  return s.visual('Funding ladder of five steps rising from left to right: bootstrapping with own savings and early earnings; business incubators and accelerators with space, mentors and training; crowdfunding and microfinance with many small sums and small loans; angel investors who are wealthy individuals investing for a share; and venture capital from professional funds for fast growth. The order is a common pattern, not a rule', 'Five steps of start-up funding.');
})();

// ---------------------------------------------------------------- tables and flows
const vRoute1 = flow('LR', ['Entrepreneur', 'Characteristics', 'Need and Startup India', 'Funding ways', 'Classifying enterprises'], 'Route map of Part 1: the entrepreneur, characteristics, the need for entrepreneurship development and Startup India, ways of funding start-ups, and how enterprises are classified');
const vRoute2 = flow('LR', ['Role of small business', 'Rural industries', 'Problems', 'Government institutions', 'Other support'], 'Route map of Part 2: the role of small business, village and cottage industries, problems, government institutions and other support');
const vDef = table(['Term', 'Meaning'], [
  ['Entrepreneur', 'A person who sets up a business, bears its risk and brings resources together to pursue an opportunity'],
  ['Entrepreneurship', 'The process of setting up and running such a venture'],
  ['Imagined example', 'Savita leaves a salaried job and starts a pickle unit in the imagined town of Amravan'],
], 'Table: an entrepreneur is a person who sets up a business, bears risk and brings resources together to pursue an opportunity; entrepreneurship is the process; an imagined example is Savita starting a pickle unit');
const vCharTbl = table(['Characteristic', 'Meaning', 'Imagined Savita'], [
  ['Systematic activity', 'Planned and run by method', 'Writes a budget and keeps records'],
  ['Lawful and purposeful', 'Within the law, with a clear aim', 'Follows food rules, aims at a steady living'],
  ['Innovation', 'Something new to offer', 'A jaggery lime pickle new to the town'],
  ['Organisation of production', 'Bringing resources together', 'Gathers jars, spices, helpers and a place'],
  ['Risk taking', 'Returns are uncertain', 'Her own savings are at stake'],
], 'Table of five characteristics of entrepreneurship with the meaning of each and an imagined illustration from Savita Pickles');
const vClues = table(['Clue in an imagined case', 'Characteristic'], [
  ['Savita writes a monthly budget and keeps a stock book', 'Systematic activity'],
  ['Mitti Gram sells only ware that meets safety rules', 'Lawful and purposeful activity'],
  ['Sargam Apps adds a feature that no rival offers', 'Innovation'],
  ['Savita hires helpers and buys jars and spices', 'Organisation of production'],
  ['Savita pledges her land to buy equipment', 'Risk taking'],
], 'Worked example table of clues and the characteristic each shows: a budget is systematic activity, safety rules are lawful and purposeful activity, a feature no rival offers is innovation, hiring helpers and buying inputs is organisation of production, and pledging land is risk taking', 'Find the clue, then name the characteristic.');
const vNeed = table(['Need', 'How it helps', 'Imagined example'], [
  ['Employment', 'New ventures give jobs', `${MG.units} units in Kumharpada give ${MG.jobs} jobs`],
  ['Innovation', 'New products and methods', 'Sargam Apps teaches music by app'],
  ['Balanced growth', 'Ventures spread to backward areas', 'Small units start in the hill district of Parvatpur'],
], `Table of three needs for entrepreneurship development with imagined examples: employment, with ${MG.units} units giving ${MG.jobs} jobs; innovation, with an app that teaches music; and balanced growth, with small units in a hill district`);
const vStartup = table(['Point', 'Note'], [
  ['Startup India', 'An initiative launched in 2016 to support new enterprises'],
  ['Aim', 'To encourage entrepreneurship and help new ventures start and grow'],
  ['Dated note', 'As of 2026; its features are revised from time to time, so check the present form'],
], 'Table: Startup India is an initiative launched in 2016 to support new enterprises, with the aim of encouraging entrepreneurship, and a dated note that its features, as of 2026, change from time to time');
const vFundTbl = table(['Way of funding', 'Meaning'], [
  ['Bootstrapping', 'Funding from own savings and early earnings, with no outsider'],
  ['Crowdfunding', 'Small sums from many people, often through an online page'],
  ['Angel investors', 'Wealthy individuals who invest their own money early, often as mentors'],
  ['Venture capital', 'Professional funds that invest in fast-growing ventures for a share'],
  ['Incubators and accelerators', 'Programmes that give space, mentors and training'],
  ['Microfinance', 'Small loans to low-income borrowers and tiny enterprises'],
], 'Table of six ways of funding start-ups: bootstrapping, crowdfunding, angel investors, venture capital, incubators and accelerators, and microfinance, with the meaning of each');
const vSavEx = table(['Item (imagined Savita Pickles)', 'Rs'], [
  [`Equipment ${fmt(SAV.equip)}, stock and jars ${fmt(SAV.stock)}, label and licence ${fmt(SAV.label)}, first wages ${fmt(SAV.wages)}: total need`, fmt(SAV.need)],
  ['Own savings: bootstrapping', fmt(SAV.own)],
  [`${fmt(SAV.custs)} customers pay Rs ${fmt(SAV.perCust)} in advance: crowdfunding`, fmt(SAV.crowd)],
  ['Loan from a lender to small enterprises: microfinance', fmt(SAV.mfLoan)],
  ['Total of the three sources', fmt(SAV.total)],
  [`Loan repaid: ${SAV.mfInst} instalments of Rs ${fmt(SAV.mfEach)}`, fmt(SAV.mfPaid)],
  ['Extra paid over the loan', fmt(SAV.mfExtra)],
], `Worked example table: Savita needs ${W(SAV.need)} rupees, and gets ${W(SAV.own)} from savings, ${W(SAV.crowd)} from advance orders and ${W(SAV.mfLoan)} from a small loan, which she repays with ${W(SAV.mfExtra)} rupees extra`, 'Match each source to a way of funding.');
const vSgEx = table(['Step (imagined Sargam Apps)', 'Figure'], [
  [`Angel investor puts in Rs ${fmt(SG.angel)} for ${SG.angelPct} per cent`, `Rs ${fmt(SG.angel)}`],
  [`Implied value of the company: ${fmt(SG.angel)} divided by ${SG.angelPct} per cent`, `Rs ${fmt(SG.post)}`],
  ['Value before the investment', `Rs ${fmt(SG.pre)}`],
  ['Founders keep', `${SG.founders} per cent`],
], `Worked example table: an angel investor puts in ${W(SG.angel)} rupees for twenty per cent, so the implied value is ${W(SG.post)} rupees, the value before the investment is ${W(SG.pre)} rupees, and the founders keep eighty per cent`, 'Money for a share fixes the value.');
const vMsmeTbl = table(['Point', 'Note'], [
  ['Basis', 'Composite criteria: investment in plant, machinery or equipment and annual turnover'],
  ['Scope', 'The same criteria for manufacturing and for service enterprises'],
  ['Limits', 'Set by the government and revised from time to time; look up the present limits'],
  ['History', 'Classes first defined by an Act of 2006, redefined in 2020 by composite criteria, with limits raised again from 2025'],
  ['Registration', 'Udyam registration, an online registration, began in 2020; as of 2026'],
], 'Table: classification is by composite criteria of investment and turnover, the same for manufacturing and services, with limits set by the government and revised from time to time; classes were first defined by an Act of 2006, redefined in 2020 and limits raised again from 2025; Udyam registration is online since 2020, as of 2026');
const vSum1 = table(['Idea', 'Remember'], [
  ['Entrepreneur', 'Sets up a business, bears risk, pursues an opportunity'],
  ['Characteristics', 'Systematic, lawful and purposeful, innovation, organisation, risk taking'],
  ['Need', 'Employment, innovation, balanced growth; Startup India, 2016'],
  ['Funding', 'Bootstrapping, crowdfunding, angels, venture capital, incubators, microfinance'],
  ['Classification', 'Composite criteria of investment and turnover; limits revised'],
], 'Summary table of Part 1: entrepreneur, characteristics, need, funding ways and classification');
const vTips1 = table(['Common mistake', 'Fix'], [
  ['Mixing entrepreneur and entrepreneurship', 'The first is the person, the second is the process'],
  ['Quoting an old rupee limit for classes', 'State the principle: investment and turnover together, limits revised'],
  ['Calling an angel investor a fund', 'An angel is an individual; venture capital is a professional fund'],
  ['Naming real start-ups as examples', 'Use an imagined enterprise'],
], 'Exam tips table: four common mistakes about entrepreneur and entrepreneurship, old rupee limits, angel investors and real start-ups');

const vRole1 = table(['Role', 'Meaning'], [
  ['Employment generation', 'Many jobs with little capital for each job'],
  ['Use of local resources', 'Local materials and skills are put to use'],
  ['Balanced regional development', 'Units can be set up in small towns and backward areas'],
  ['Export contribution', 'Crafts and goods can earn foreign exchange'],
], 'Table of four roles of small business: employment generation, use of local resources, balanced regional development and export contribution');
const vRole2 = table(['Role', 'Meaning'], [
  ['Variety of products', 'Many kinds of goods, often in small batches'],
  ['Personalised service', 'Close attention to each customer'],
  ['Easy to start', 'Relatively low capital is needed to begin'],
  ['Support to large industries', 'Small units supply parts and goods as suppliers'],
], 'Table of four more roles of small business: variety of products, personalised service, ease of starting and support to large industries as suppliers');
const vMgEx = table(['Item (imagined Mitti Gram)', 'Figure'], [
  [`${MG.units} families run units, each with ${MG.perUnit} villagers`, `${MG.jobs} jobs`],
  ['Clay dug from nearby ponds', 'Local resource'],
  ['Work for villagers between harvests', 'Non-farm employment'],
], `Worked example table: ${W(MG.units)} units with six villagers each give ${W(MG.jobs)} jobs, clay from nearby ponds is a local resource, and work between harvests is non-farm employment`, 'Jobs, local resources, non-farm work.');
const vRural = table(['Point', 'Note'], [
  ['Village and cottage industries', 'Small crafts and processing units run from homes or village workshops'],
  ['Main role', 'Non-farm employment, especially between harvests'],
  ['Imagined examples', 'Pottery at Mitti Gram, basket weaving, hand looms'],
  ['Why it matters', 'Gives families a second source of income and uses local skills'],
], 'Table of village and cottage industries as small crafts and processing units run from homes or village workshops, with the main role of non-farm employment, imagined examples and why they matter');
const vProbT1 = table(['Problem', 'What it means', 'Imagined case'], [
  ['Finance', 'Little security, costly funds', 'Dhara Spices has no security for a loan'],
  ['Raw materials', 'Irregular supply, unstable price', 'Kesar Toys waits for seasoned wood'],
  ['Managerial skills', 'Weak planning and costing', 'Rangrez Dyers keeps no costing records'],
  ['Marketing', 'Weak reach, dependence on middlemen', 'Anand Bamboo has no brand or city shop'],
  ['Quality', 'Uneven standards, rejects', 'Pots of Mitti Gram crack in the kiln'],
], 'Table of five problems of small business with meaning and an imagined case: finance, raw materials, managerial skills, marketing and quality');
const vProbT2 = table(['Problem', 'What it means', 'Imagined case'], [
  ['Capacity utilisation', 'Part of capacity lies idle', `A unit makes ${fmt(MG.made)} of ${fmt(MG.cap)} pots`],
  ['Technology', 'Old machines and methods', 'Lohit Tools uses hand-fed machines'],
  ['Sickness', 'Lasting losses, unpaid dues', 'Neel Jute cannot pay its lender'],
  ['Global competition', 'Rivals from abroad sell cheaper', 'Imported toys undercut Kesar Toys'],
], 'Table of four problems of small business with meaning and an imagined case: capacity utilisation, technology, sickness and global competition');
const vCapEx = table(['Item (imagined Mitti Gram unit)', 'Figure'], [
  ['Capacity a month', `${fmt(MG.cap)} pots`],
  ['Made a month', `${fmt(MG.made)} pots`],
  [`Capacity utilisation: ${fmt(MG.made)} divided by ${fmt(MG.cap)}`, `${MG.util} per cent`],
  ['Unused capacity', `${fmt(MG.unused)} pots`],
  [`Rejected for cracks: ${MG.rejected} of ${fmt(MG.made)}`, `${MG.rejPct} per cent`],
  ['Good pots', `${fmt(MG.good)}`],
], `Worked example table: a unit with capacity of ${W(MG.cap)} pots makes ${W(MG.made)}, so utilisation is sixty per cent and ${W(MG.unused)} pots of capacity lie unused; ${W(MG.rejected)} pots are rejected, which is eight per cent, leaving ${W(MG.good)} good pots`, 'Utilisation and rejection rate.');
const vSick = table(['Point', 'Note'], [
  ['Meaning', 'A unit that keeps making losses and cannot meet its dues is called sick'],
  ['Signs', 'Unpaid suppliers, falling output, delays in repaying loans'],
  ['Link', 'Often follows other problems such as finance, quality or competition'],
  ['Outcome', 'Closure, or a plan to revive the unit'],
], 'Table of sickness of a small unit: meaning as lasting losses with unpaid dues, signs, links to other problems and possible outcomes');
const vInstTbl = table(['Institution', 'Year', 'What it does'], [
  ['National Small Industries Corporation', '1955', 'Marketing support, raw materials, machinery on hire purchase'],
  ['District Industries Centres', '1978', 'A single point of support at district level'],
  ['National Bank for Agriculture and Rural Development', '1982', 'Rural credit and development'],
  ['Small Industries Development Bank of India', '1990', 'Finance for small industry'],
], 'Table of four institutions with year and work: National Small Industries Corporation 1955, District Industries Centres 1978, National Bank for Agriculture and Rural Development 1982 and Small Industries Development Bank of India 1990');
const vHpEx = table(['Item (imagined Kesar Toys)', 'Rs'], [
  ['Cash price of a moulding machine', fmt(HP.price)],
  ['Paid at once', fmt(HP.down)],
  [`${HP.inst} instalments of Rs ${fmt(HP.each)}`, fmt(HP.inst * HP.each)],
  ['Total paid under hire purchase', fmt(HP.paid)],
  ['Extra over the cash price', fmt(HP.extra)],
], `Worked example table: a machine with a cash price of ${W(HP.price)} rupees is bought by paying ${W(HP.down)} at once and ${W(HP.inst * HP.each)} in instalments, so ${W(HP.paid)} rupees is paid in all, an extra ${W(HP.extra)} rupees`, 'Down payment plus instalments.');
const vOther = table(['Support', 'Meaning, as of 2026'], [
  ['Credit guarantees', 'A guarantee that eases lending to units that lack security'],
  ['Procurement preference', 'Preference to small units when governments and large buyers purchase'],
  ['Training', 'Skill and management training for owners and workers'],
], 'Table of other support as of 2026: credit guarantees for units lacking security, procurement preference and training');
const vHelp = table(['Problem in an imagined case', 'Help that fits'], [
  ['A unit lacks funds for a modern plant', 'Finance from the Small Industries Development Bank of India'],
  ['A unit cannot find buyers or raw materials', 'Marketing and input support from the National Small Industries Corporation'],
  ['A village workshop needs rural credit', 'National Bank for Agriculture and Rural Development'],
  ['A first-time entrepreneur wants one place to go', 'District Industries Centre'],
  ['Owners lack management skills', 'Training'],
], 'Worked example table matching a problem with the help that fits: funds for a plant with the Small Industries Development Bank of India, buyers and raw materials with the National Small Industries Corporation, rural credit with the National Bank for Agriculture and Rural Development, one place to go with a District Industries Centre, and management skills with training', 'Name the problem, then the help.');
const vSum2 = table(['Idea', 'Remember'], [
  ['Role', 'Employment, local resources, regional balance, exports, variety, service, easy start, supplier'],
  ['Rural role', 'Village and cottage industries give non-farm employment'],
  ['Problems', 'Nine: finance to global competition'],
  ['Institutions', 'NSIC 1955, DIC 1978, NABARD 1982, SIDBI 1990'],
  ['Other support', 'Credit guarantees, procurement preference, training'],
], 'Summary table of Part 2: roles, rural role, nine problems, four institutions with years, and other support');
const vTips2 = table(['Common mistake', 'Fix'], [
  ['Writing a problem with no link to the case', 'Quote the line, then name the problem'],
  ['Mixing the institutions', 'Link each to its work: marketing, district, rural, finance'],
  ['Quoting scheme figures', 'Describe support in general terms with a date'],
  ['Forgetting the working in utilisation', 'Show made divided by capacity, times one hundred'],
], 'Exam tips table: four common mistakes about problems with no case link, mixing institutions, scheme figures and capacity utilisation working');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Entrepreneurship, Start-ups and the Classification of Enterprises',
  goals: [
    'Define an entrepreneur and entrepreneurship and explain five characteristics',
    'Explain the need for entrepreneurship development and Startup India',
    'Describe six ways of funding start-ups with imagined examples',
    'State the principle on which micro, small and medium enterprises are classified, with no figures',
  ],
  slides: [
    sl('title', 'Entrepreneurship, Start-ups and the Classification of Enterprises', {
      b: 'Part 1: who an entrepreneur is, why entrepreneurs matter, how start-ups are funded and how enterprises are classified.',
      v: vRoute1,
      n: 'Every shop, workshop and app began as one person noticing an opportunity. In this part we meet the entrepreneur, study the characteristics of entrepreneurship, see how start ups are funded, and learn the principle on which small enterprises are classified.',
    }),
    sl('concept', 'Entrepreneur and entrepreneurship', {
      b: 'An **entrepreneur** sets up a business, bears its risk and brings resources together to pursue an opportunity.',
      v: vDef,
      n: 'An entrepreneur is a person who sets up a business, bears its risk and brings resources together to pursue an opportunity. Entrepreneurship is the process of setting up and running such a venture. Our imagined entrepreneur is Savita, who leaves a salaried job and starts a pickle unit in the imagined town of Amravan.',
    }),
    sl('diagram', 'Five characteristics of entrepreneurship', {
      v: vWeb,
      n: 'This web shows five characteristics. Entrepreneurship is a systematic activity, planned and run by method. It is lawful and purposeful. It involves innovation, which means something new. It involves organisation of production, bringing resources together. And it involves risk taking, because returns are uncertain.',
    }),
    sl('concept', 'The characteristics with Savita', {
      v: vCharTbl,
      n: 'Savita writes a budget and keeps records, so her work is systematic. She follows food rules and aims at a steady living, so it is lawful and purposeful. Her jaggery lime pickle is new to the town, which is innovation. She gathers jars, spices and helpers, which is organisation. And her own savings are at stake, which is risk taking.',
    }),
    sl('check', 'Quick check: which characteristic?', {
      b: 'An imagined pickle maker writes a plan, sets a budget and records every sale. Name the characteristic.',
      chk: 'mc_char_sys',
      n: 'Think about planning and method. Which characteristic does a written plan with a budget show?',
    }),
    sl('example', 'Worked example 1: spotting the characteristic', {
      b: 'Read each clue from an imagined case and name the characteristic it shows.',
      bl: ['Step 1: Underline the action in the clue.', 'Step 2: Ask what the action is about: method, law, newness, resources or risk.', 'Step 3: Name the characteristic.'],
      v: vClues,
      n: 'A monthly budget shows a systematic activity. Safety rules followed by Mitti Gram show a lawful and purposeful activity. A feature that no rival offers shows innovation. Hiring helpers and buying jars shows organisation of production. And pledging land to buy equipment shows risk taking.',
    }),
    sl('concept', 'Why entrepreneurship development is needed', {
      v: vNeed,
      n: 'There are three needs. The first is employment, because new ventures give jobs. In Kumharpada, forty units give two hundred and forty jobs. The second is innovation, as in an app that teaches music. The third is balanced growth, because ventures can spread to backward areas such as a hill district.',
    }),
    sl('concept', 'Startup India', {
      b: '**Startup India** is an initiative launched in 2016 to support new enterprises.',
      v: vStartup,
      n: 'Startup India is an initiative launched in two thousand sixteen to support new enterprises. Its aim is to encourage entrepreneurship and help new ventures start and grow. Its features are revised from time to time, so check the present form.',
    }),
    sl('check', 'Quick check: which need?', {
      b: 'Forty imagined families set up units and each hires villagers who had no work between harvests. Name the need that is met.',
      chk: 'mc_need_emp',
      n: 'Think about what the new units give to the villagers.',
    }),
    sl('diagram', 'The start-up funding ladder', {
      v: vLadder,
      n: 'This ladder has five steps. A founder often starts with bootstrapping, using own savings. Incubators and accelerators give space, mentors and training. Crowdfunding and microfinance bring many small sums and small loans. Angel investors are wealthy individuals who invest for a share. Venture capital is the step for fast growth. This is a common order, not a rule.',
    }),
    sl('concept', 'Ways of funding start-ups', {
      v: vFundTbl,
      n: 'Bootstrapping means funding from own savings and early earnings. Crowdfunding collects small sums from many people, often online. Angel investors invest their own money early and often act as mentors. Venture capital funds invest in fast growing ventures for a share. Incubators and accelerators give space and training. Microfinance gives small loans to tiny enterprises.',
    }),
    sl('example', 'Worked example 2: Savita funds her unit', {
      b: 'Savita Pickles, an imagined unit, needs money for equipment and stock. Match each source to a way of funding and find the extra paid on the loan.',
      bl: ['Step 1: Add the four needs.', 'Step 2: Name each source and add them.', 'Step 3: Multiply the instalments and subtract the loan.'],
      v: vSavEx,
      n: `Savita needs ${W(SAV.need)} rupees. She puts in ${W(SAV.own)} rupees of savings, which is bootstrapping. Advance orders from four hundred customers bring ${W(SAV.crowd)} rupees, which is crowdfunding. A small loan of ${W(SAV.mfLoan)} rupees is microfinance. She repays ${W(SAV.mfPaid)} rupees in all, so the loan costs ${W(SAV.mfExtra)} rupees extra.`,
    }),
    sl('example', 'Worked example 3: an angel investor for Sargam Apps', {
      b: 'An angel investor puts money into Sargam Apps, an imagined app start-up, for a share. Find what the deal implies.',
      bl: ['Step 1: Divide the money by the share bought.', 'Step 2: Subtract the money to find the value before.', 'Step 3: Find what the founders keep.'],
      v: vSgEx,
      n: `The angel investor puts in ${W(SG.angel)} rupees for twenty per cent. So the company is valued at ${W(SG.post)} rupees after the money is in. Before the investment it was worth ${W(SG.pre)} rupees. The founders keep eighty per cent of the shares, and the investor often guides them as a mentor.`,
    }),
    sl('check', 'Quick check: name the investor', {
      b: 'A retired executive invests her own money in an early app start-up for a share and advises the founders weekly. Name her.',
      chk: 'mc_fund_angel',
      n: 'Is she a pool of money run by professionals, or a wealthy individual?',
    }),
    sl('diagram', 'Classifying enterprises: composite criteria', {
      v: vMsme,
      n: 'This diagram shows the principle. Two measures are used together. One is investment in plant, machinery or equipment. The other is annual turnover. Together they are the composite criteria that place an enterprise as micro, small or medium. The same criteria apply to manufacturing and service enterprises, and the government revises the limits from time to time.',
    }),
    sl('concept', 'What the principle says', {
      v: vMsmeTbl,
      n: 'Since two thousand twenty, classification uses composite criteria of investment and turnover, alike for manufacturing and services. The limits are set and revised by the government, so always look up the present limits and do not quote an old figure. As of two thousand twenty six, online registration called Udyam registration is available.',
    }),
    sl('check', 'Quick check: the basis of classification', {
      b: 'Since 2020, enterprises are classified as micro, small or medium on which basis?',
      chk: 'mc_msme_basis',
      n: 'Remember that two measures are used together.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up. An entrepreneur sets up a business, bears risk and pursues an opportunity. Entrepreneurship has five characteristics. It is needed for employment, innovation and balanced growth. Start ups may be funded by bootstrapping, crowdfunding, angels, venture capital, incubators and microfinance. Enterprises are classified by investment and turnover together.',
    }),
    sl('exam-tips', 'Exam tips', {
      v: vTips1,
      bl: ['Entrepreneur is the person, entrepreneurship is the process.', 'Give the classification principle, not an old rupee limit.'],
      n: 'Some tips. Entrepreneur is the person and entrepreneurship is the process. For classification, state the principle of investment and turnover together and say that limits are revised. An angel investor is an individual, not a fund. And always use an imagined enterprise in your examples.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Role, Problems and Government Support for Small Business',
  goals: [
    'Explain eight roles of small business and the rural role of village and cottage industries',
    'Identify nine problems of small business in imagined cases',
    'Compute capacity utilisation and a hire purchase total for an imagined unit',
    'Name four institutions with their years and work, and other support',
  ],
  slides: [
    sl('title', 'Role, Problems and Government Support for Small Business', {
      b: 'Part 2: what small business does for the economy, what holds it back and what help it gets.',
      v: vRoute2,
      n: 'Small units are everywhere, from the corner tailor to the village potter. In this part we study the role they play, the problems they face, and the institutions that help them.',
    }),
    sl('concept', 'Role of small business in India', {
      v: vRole1,
      n: 'First, employment generation, since small units create many jobs with little capital for each job. Second, use of local resources, such as local materials and skills. Third, balanced regional development, because units can start in small towns and backward areas. Fourth, export contribution, since crafts and goods can earn foreign exchange.',
    }),
    sl('concept', 'More roles of small business', {
      v: vRole2,
      n: 'Fifth, variety of products, because small units make many kinds of goods in small batches. Sixth, personalised service, which means close attention to each customer. Seventh, ease of starting, since relatively low capital is needed. Eighth, support to large industries, because small units supply parts and goods as suppliers.',
    }),
    sl('check', 'Quick check: which role?', {
      b: 'Potters dig clay from nearby ponds instead of buying imported material. Name the role.',
      chk: 'mc_role_local',
      n: 'Think about where the material comes from.',
    }),
    sl('example', 'Worked example 1: the rural role of Mitti Gram', {
      b: 'Mitti Gram, an imagined pottery cluster in the imagined village of Kumharpada, has forty family units. Find its employment and name the roles.',
      bl: ['Step 1: Multiply units by villagers a unit.', 'Step 2: Spot the local resource.', 'Step 3: Name the kind of employment.'],
      v: vMgEx,
      n: `Forty family units, each with six villagers, give ${W(MG.jobs)} jobs. The clay is dug from nearby ponds, which is a local resource. The work between harvests is non farm employment, a key role of village and cottage industries.`,
    }),
    sl('concept', 'Village and cottage industries', {
      v: vRural,
      n: 'Village and cottage industries are small crafts and processing units run from homes or village workshops. Their main role is non farm employment, especially between harvests. Examples are pottery, basket weaving and hand looms. They give families a second source of income and use local skills.',
    }),
    sl('diagram', 'Nine problems of small business', {
      v: vProb,
      n: 'This web shows nine problems. Finance. Raw materials. Managerial skills. Marketing. Quality. Capacity utilisation. Technology. Sickness. And global competition. In an exam, read the case, find the clue and name the problem it shows.',
    }),
    sl('concept', 'Problems one to five', {
      v: vProbT1,
      n: 'Finance means little security and costly funds, as with Dhara Spices. Raw materials means irregular supply and unstable price, as with Kesar Toys. Managerial skills means weak planning and costing. Marketing means weak reach and dependence on middlemen. Quality means uneven standards and rejects.',
    }),
    sl('concept', 'Problems six to nine', {
      v: vProbT2,
      n: 'Capacity utilisation means part of the capacity lies idle. Technology means old machines and methods. Sickness means lasting losses and unpaid dues. Global competition means that rivals from abroad sell cheaper goods, as imported toys do against Kesar Toys.',
    }),
    sl('check', 'Quick check: which problem?', {
      b: 'An imagined toy maker finds good wood arrives late and at a changing price. Name the problem.',
      chk: 'mc_prob_raw',
      n: 'Think about inputs, their supply and their price.',
    }),
    sl('example', 'Worked example 2: capacity and quality', {
      b: 'A unit of Mitti Gram makes pots every month. Find capacity utilisation and the rejection rate.',
      bl: ['Step 1: Divide made by capacity and multiply by one hundred.', 'Step 2: Subtract made from capacity for the unused part.', 'Step 3: Divide rejects by made for the rejection rate.'],
      v: vCapEx,
      n: `The unit can make ${W(MG.cap)} pots and makes ${W(MG.made)}. Utilisation is sixty per cent, and ${W(MG.unused)} pots of capacity lie unused. Of the pots made, ${W(MG.rejected)} crack, which is eight per cent, so ${W(MG.good)} pots are good. These figures show the problems of capacity utilisation and quality.`,
    }),
    sl('concept', 'Sickness of a small unit', {
      v: vSick,
      n: 'A small unit is called sick when it keeps making losses and cannot meet its dues. Signs are unpaid suppliers, falling output and delays in repaying loans. Sickness often follows other problems such as finance, quality or competition. The outcome may be closure, or a plan to revive the unit.',
    }),
    sl('diagram', 'Government support at a glance', {
      v: vGov,
      n: 'This chart shows four institutions in order of year. The National Small Industries Corporation in nineteen fifty five. District Industries Centres in nineteen seventy eight. The National Bank for Agriculture and Rural Development in nineteen eighty two. And the Small Industries Development Bank of India in nineteen ninety. Other support is shown below.',
    }),
    sl('concept', 'The institutions and what they do', {
      v: vInstTbl,
      n: 'The National Small Industries Corporation gives marketing support, helps with raw materials and supplies machinery on hire purchase. District Industries Centres are a single point of support at district level. The rural bank supports rural credit and development. And the Small Industries Development Bank gives finance for small industry.',
    }),
    sl('check', 'Quick check: which office?', {
      b: 'A first-time entrepreneur wants one office in the district for help with a site, a loan and training. Name it.',
      chk: 'mc_dic',
      n: 'Which institution is meant to be a single point of support at district level?',
    }),
    sl('example', 'Worked example 3: hire purchase for Kesar Toys', {
      b: 'Kesar Toys, an imagined toy maker, buys a moulding machine on hire purchase. Find the total paid and the extra over the cash price.',
      bl: ['Step 1: Multiply the instalments by the number of instalments.', 'Step 2: Add the payment made at once.', 'Step 3: Subtract the cash price.'],
      v: vHpEx,
      n: `The cash price is ${W(HP.price)} rupees. The firm pays ${W(HP.down)} rupees at once and twelve instalments of nine thousand rupees, which is ${W(HP.inst * HP.each)} rupees. The total is ${W(HP.paid)} rupees, so the extra over the cash price is ${W(HP.extra)} rupees, the price of paying over time.`,
    }),
    sl('concept', 'Other support', {
      v: vOther,
      n: 'As of two thousand twenty six, other support includes credit guarantees, which ease lending to units that lack security. It includes procurement preference, which favours small units when governments and large buyers purchase. And it includes training for owners and workers. Schemes change, so no figures are given here.',
    }),
    sl('check', 'Quick check: match the institution', {
      b: 'Match four institutions with what each is known for.',
      chk: 'mt_support',
      n: 'Recall the work of each institution. One is for marketing, one for a district, one for rural credit and one for small industry finance.',
    }),
    sl('concept', 'Matching a problem with help', {
      v: vHelp,
      n: 'A unit that lacks funds for a modern plant turns to finance from the Small Industries Development Bank. One that cannot find buyers or raw materials turns to the National Small Industries Corporation. A village workshop needing rural credit turns to the rural bank. A first time entrepreneur goes to a District Industries Centre. And weak management calls for training.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'To sum up. Small business gives employment, uses local resources, balances regions, exports, offers variety and service, is easy to start and supports large industry. Village and cottage industries give non farm employment. There are nine problems. Four institutions help, along with credit guarantees, procurement preference and training.',
    }),
    sl('exam-tips', 'Exam tips', {
      v: vTips2,
      bl: ['Quote the line, then name the problem.', 'Link each institution to its work and year.'],
      n: 'Some tips. Quote the line from the case and then name the problem. Link each institution to its work and its year. Describe other support in general terms and add a date. And in a capacity utilisation question, show made divided by capacity, times one hundred.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Small Business and Enterprises: notes',
  sections: [
    {
      h: '1. Entrepreneur, entrepreneurship and its characteristics',
      t: 1,
      b: 'An **entrepreneur** is a person who sets up a business, bears its risk and brings resources together to pursue an opportunity. **Entrepreneurship** is the process of setting up and running such a venture.\n\n**Characteristics of entrepreneurship:**\n1. **Systematic activity:** planned and run by method.\n2. **Lawful and purposeful activity:** within the law and with a clear aim.\n3. **Innovation:** something new to offer, in a product or a method.\n4. **Organisation of production:** bringing people, materials and equipment together.\n5. **Risk taking:** returns are uncertain and money may be lost.\n\n**Worked check:** Savita writes a budget (systematic), follows food rules (lawful and purposeful), blends jaggery into lime pickle (innovation), gathers jars, spices and helpers (organisation) and puts her savings at stake (risk).',
      terms: [['Entrepreneur', 'A person who sets up a business, bears its risk and brings resources together to pursue an opportunity.'], ['Entrepreneurship', 'The process of setting up and running a venture, bearing its risk.']],
      v: vWeb,
      vs: [vDef, vCharTbl, vClues],
    },
    {
      h: '2. Need for entrepreneurship development and Startup India',
      t: 1,
      b: '**Needs:**\n1. **Employment:** new ventures give jobs.\n2. **Innovation:** entrepreneurs bring new products and methods.\n3. **Balanced growth:** ventures spread to backward areas.\n\n**Startup India** is an initiative launched in 2016 to support new enterprises (as of 2026; its features are revised from time to time).\n\n**Worked check:** forty units in the imagined cluster of Kumharpada with six villagers each give 240 jobs.',
      terms: [['Startup India', 'An initiative launched in 2016 to support new enterprises (as of 2026).']],
      v: vNeed,
      vs: [vStartup],
    },
    {
      h: '3. Ways of funding start-ups',
      t: 1,
      b: '1. **Bootstrapping:** own savings and early earnings.\n2. **Crowdfunding:** small sums from many people, often online.\n3. **Angel investors:** wealthy individuals who invest their own money early, often as mentors.\n4. **Venture capital:** professional funds that invest in fast-growing ventures for a share.\n5. **Business incubators and accelerators:** programmes with space, mentors and training.\n6. **Microfinance:** small loans to low-income borrowers and tiny enterprises.\n\nThe ladder is a common order of use, not a rule.\n\n**Worked check:** Savita needs Rs 3,00,000: savings Rs 1,20,000, advance orders Rs 80,000 (400 customers at Rs 200) and a microfinance loan Rs 1,00,000, repaid as 10 instalments of Rs 11,000, which is Rs 10,000 extra. An angel puts Rs 50,00,000 for 20 per cent, so the company is valued at Rs 2,50,00,000 and the founders keep 80 per cent.',
      terms: [['Bootstrapping', 'Funding a venture from the founder\'s own savings and early earnings.'], ['Crowdfunding', 'Raising small sums from many people, often through an online page.'], ['Angel investor', 'A wealthy individual who invests her own money in an early venture, often as a mentor.'], ['Venture capital', 'Money from professional funds invested in fast-growing ventures for a share.'], ['Microfinance', 'Small loans to low-income borrowers and tiny enterprises.']],
      v: vLadder,
      vs: [vFundTbl, vSavEx, vSgEx],
    },
    {
      h: '4. Micro, small and medium enterprises: the principle',
      t: 1,
      b: 'Since 2020, enterprises are classified as **micro, small or medium** by **composite criteria**: investment in plant, machinery or equipment **and** annual turnover, used together. The same criteria apply to manufacturing and to service enterprises. The limits are set by the government and **revised from time to time**, so the present limits must be looked up; no rupee limit is learnt here.\n\n**Dated notes:** classes were first defined by an Act of 2006 and redefined in 2020; limits were raised again from 2025. Online registration, called Udyam registration, began in 2020 (as of 2026).',
      terms: [['Composite criteria', 'The use of investment in plant, machinery or equipment and annual turnover together to classify an enterprise.']],
      v: vMsme,
      vs: [vMsmeTbl],
    },
    {
      h: '5. Role of small business, including in rural areas',
      t: 1,
      b: '**Roles:**\n1. Employment generation.\n2. Use of local resources.\n3. Balanced regional development.\n4. Export contribution.\n5. Variety of products.\n6. Personalised service.\n7. Ease of starting.\n8. Support to large industries as suppliers.\n\n**Rural areas:** village and cottage industries give **non-farm employment**, especially between harvests, and use local skills and materials.\n\nThe role is described qualitatively; no national figures are given.',
      terms: [['Village and cottage industries', 'Small crafts and processing units run from homes or village workshops, giving non-farm employment.']],
      v: vRole1,
      vs: [vRole2, vMgEx, vRural],
    },
    {
      h: '6. Problems of small business',
      t: 2,
      b: '**Nine problems:** finance; raw materials; managerial skills; marketing; quality; capacity utilisation; technology; sickness; global competition.\n\n**Capacity utilisation** = made divided by capacity, times 100. A unit that makes 1,200 pots of a capacity of 2,000 has a utilisation of 60 per cent and 800 pots of unused capacity. If 96 of the 1,200 are rejected, the rejection rate is 8 per cent.\n\n**Sickness:** a unit that keeps making losses and cannot meet its dues.',
      terms: [['Capacity utilisation', 'The share of capacity that is actually used: output divided by capacity, times 100.'], ['Sick unit', 'A unit that keeps making losses and cannot meet its dues.']],
      v: vProb,
      vs: [vProbT1, vProbT2, vCapEx, vSick],
    },
    {
      h: '7. Government assistance',
      t: 2,
      b: '1. **National Small Industries Corporation (1955):** marketing support, raw materials, machinery on hire purchase.\n2. **District Industries Centres (1978):** a single point of support at district level.\n3. **National Bank for Agriculture and Rural Development (1982):** rural credit and development.\n4. **Small Industries Development Bank of India (1990):** finance for small industry.\n\n**Other support (as of 2026):** credit guarantees, procurement preference and training; schemes change, so no figures are learnt.\n\n**Worked check:** a machine of Rs 1,20,000 bought by Rs 30,000 at once plus 12 instalments of Rs 9,000 costs Rs 1,38,000 in all, an extra Rs 18,000.',
      terms: [['Hire purchase', 'A way of buying in which the buyer pays a part at once and the rest in instalments.'], ['District Industries Centre', 'An office that gives small units a single point of support at district level.']],
      v: vGov,
      vs: [vInstTbl, vHpEx, vOther, vHelp],
    },
  ],
  tips: '**Common mistakes**\n- Mixing entrepreneur (the person) and entrepreneurship (the process).\n- Quoting an old rupee limit for micro, small and medium; give the principle: investment and turnover together, limits revised.\n- Calling an angel investor a fund; an angel is an individual.\n- Naming a problem without quoting the line of the case that shows it.\n- Mixing the institutions; link each to its work and year.\n- Quoting scheme figures; describe support in general terms with a date.\n- Naming real start-ups or firms; use imagined ones.\n\n**How marks are usually awarded**\n- 1 mark: a correct option or a quoted line from the case.\n- 2 and 3 marks: one point per characteristic, role, problem or institution, with a short explanation.\n- 5 marks: five points, each with an explanation, in a numbered list.\n- Case questions: quote the line, name the concept, show the working for a figure.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Entrepreneur**', 'A person who sets up a business, bears its risk and brings resources together to pursue an opportunity.', 'definition', 1],
  ['**Entrepreneurship**', 'The process of setting up and running a venture and bearing its risk.', 'definition', 1],
  ['Five characteristics of entrepreneurship', 'Systematic activity; lawful and purposeful activity; innovation; organisation of production; risk taking.', 'fact', 1],
  ['Innovation as a characteristic', 'Offering something new, in a product, service or method.', 'concept', 1],
  ['Risk taking as a characteristic', 'Returns are uncertain, so the entrepreneur may lose the money put in.', 'concept', 1],
  ['Three needs for entrepreneurship development', 'Employment; innovation; balanced growth.', 'fact', 1],
  ['**Startup India**', 'An initiative launched in 2016 to support new enterprises (as of 2026).', 'definition', 1],
  ['**Bootstrapping**', 'Funding a venture from own savings and early earnings, with no outsider.', 'definition', 1],
  ['**Crowdfunding**', 'Raising small sums from many people, often through an online page.', 'definition', 1],
  ['**Angel investor**', 'A wealthy individual who invests her own money in an early venture, often as a mentor.', 'definition', 1],
  ['**Venture capital**', 'Money from professional funds invested in fast-growing ventures for a share.', 'definition', 1],
  ['**Business incubator or accelerator**', 'A programme that gives young start-ups space, mentors and training.', 'definition', 1],
  ['**Microfinance**', 'Small loans to low-income borrowers and tiny enterprises.', 'definition', 1],
  ['Angel investor against venture capital', 'An angel is an individual investing her own money early; venture capital is a professional fund investing in fast growth.', 'exam-tip', 1],
  ['Basis of classifying micro, small and medium enterprises', 'Since 2020: composite criteria of investment in plant, machinery or equipment and annual turnover, used together.', 'fact', 1],
  ['Same criteria for goods and services', 'Manufacturing and service enterprises are classified by the same composite criteria.', 'fact', 1],
  ['Limits of the classes', 'Set by the government and revised from time to time; look up the present limits.', 'exam-tip', 1],
  ['Eight roles of small business', 'Employment; local resources; balanced regional development; exports; variety; personalised service; ease of starting; support to large industries.', 'fact', 1],
  ['Role of village and cottage industries', 'Non-farm employment in rural areas, especially between harvests.', 'concept', 1],
  ['Nine problems of small business', 'Finance; raw materials; managerial skills; marketing; quality; capacity utilisation; technology; sickness; global competition.', 'fact', 2],
  ['Problem of finance', 'Little security for loans and costly funds.', 'concept', 2],
  ['Problem of raw materials', 'Irregular supply and unstable price of inputs.', 'concept', 2],
  ['Problem of marketing', 'Weak reach to buyers, no brand, dependence on middlemen.', 'concept', 2],
  ['**Capacity utilisation**', 'The share of capacity actually used: output divided by capacity, times 100.', 'definition', 2],
  ['**Sick unit**', 'A unit that keeps making losses and cannot meet its dues.', 'definition', 2],
  ['**National Small Industries Corporation (1955)**', 'Marketing support, raw materials and machinery on hire purchase.', 'definition', 2],
  ['**District Industries Centres (1978)**', 'A single point of support for small units at district level.', 'definition', 2],
  ['**National Bank for Agriculture and Rural Development (1982)**', 'Rural credit and development.', 'definition', 2],
  ['**Small Industries Development Bank of India (1990)**', 'Finance for small industry.', 'definition', 2],
  ['Other support', 'Credit guarantees; procurement preference; training (schemes change; no figures).', 'fact', 2],
  ['**Hire purchase**', 'A way of buying in which a part is paid at once and the rest in instalments.', 'definition', 2],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short): Small Business and Enterprises',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['mc_char_innov', 'mc_fund_vc', 'mc_sidbi', 'ar_risk'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer the 2-mark questions in about 30 to 50 words and the 3-mark question in about 50 to 80 words.', items: ['s2_ent_def', 's2_msme', 's3_need'] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80 to 120 words.', items: [{ attempt: 1, keys: ['l_char', 'l_fund'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks)', instr: 'Read the case and answer all parts. Part (c) has an internal choice.', items: ['cb_savita'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long): Small Business and Enterprises',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['mc_ent_def', 'mc_char_lawful', 'mc_startup', 'mc_fund_micro', 'mc_msme_claim', 'mc_role_supplier', 'mc_prob_global', 'mc_nabard', 'ar_msme', 'ar_sick'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and 3-mark questions in about 50 to 80 words. Questions 13 and 15 have an internal choice.', items: ['s2_innov', 's2_cap', { attempt: 1, keys: ['s2_nsic', 's2_dic'] }, 's3_role', { attempt: 1, keys: ['s3_prob', 's3_inst'] }] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80 to 120 words each.', items: ['l_role', { attempt: 1, keys: ['l_prob', 'l_inst'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks each)', instr: 'Read each case and answer all parts. Part (c) of each has an internal choice.', items: ['cb_sargam', 'cb_lohit'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 and t02 of cbse-11-business-studies-ch08 only (entrepreneurship development and MSMEs; problems of small business and government assistance)',
    originality: 'every entrepreneur, enterprise, cluster and investor is imagined and written by SOYL; no real company is named; no NCERT text, example or exercise and no board or sample-paper item reused (D-036)',
    data: 'figures computed in the build: Savita funding mix and loan cost; angel investment value and founder share; Mitti Gram jobs, capacity utilisation and rejection rate; hire purchase total; Lohit Tools sales and spoilt covers; Dhara Spices utilisation',
    facts: 'dated as of 2026: Startup India (2016), MSME classification principle (composite criteria since 2020, no rupee limit stated), Udyam registration, other support in general terms with no scheme figures; institution years 1955, 1978, 1982, 1990',
    gate: 'schema, pipeline lint, deterministic verify, word limits, narration and answer-leak checks run clean in this build',
  },
});
