// Build CBSE 11 Business Studies ch03 Public, Private and Global Enterprises. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-11-business-studies-ch03/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-business-studies-ch01/src/lib.mjs';

setUnit('cbse-11-business-studies-ch03', 'economics-commerce');
const { fmt, DESH, GOVT_MIN, JV, PPP } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG visuals
const vForms = (() => {
  const s = new Svg(760, 372);
  const x0 = 100, cw = 218, top = 10, hh = 44, rh = 60;
  const cols = [['Departmental', 'undertaking'], ['Statutory', 'corporation'], ['Government', 'company']];
  const rows = [
    ['Created by', [['Part of a ministry;', 'no law of its own'], ['A special Act of', 'Parliament or a state'], ['Registration under', 'the Companies Act']]],
    ['Legal status', [['Not a separate', 'legal entity'], ['Separate legal', 'entity'], ['Separate legal', 'entity (a company)']]],
    ['Finance', [['Funds from treasury;', 'revenue to treasury'], ['Own income; may get', 'capital from government'], ['Government holds at', 'least 51 percent*']]],
    ['Staff', [['Government', 'servants'], ['Not government', 'servants'], ['Under the', "company's rules"]]],
    ['Controls', [['Budget, accounting', 'and audit apply'], ['Departmental budget', 'rules do not apply'], ['Board of directors', 'manages it']]],
  ];
  cols.forEach(([a, b], i) => {
    const x = x0 + i * cw;
    s.rect(x + 2, top, cw - 4, hh, { fill: 'accent', fillOpacity: 0.16, color: 'accent', sw: 1.4, rx: 6 });
    s.text(x + cw / 2, top + 15, a, { size: 13, bold: true });
    s.text(x + cw / 2, top + 32, b, { size: 13, bold: true });
  });
  rows.forEach(([label, cells], r) => {
    const y = top + hh + 6 + r * rh;
    s.text(6, y + (rh - 8) / 2, label, { anchor: 'start', size: 12, bold: true });
    cells.forEach(([a, b], i) => {
      const x = x0 + i * cw;
      s.rect(x + 2, y, cw - 4, rh - 8, { fill: 'fill', color: 'muted', sw: 1.2, rx: 6 });
      s.text(x + cw / 2, y + 19, a, { size: 12 });
      s.text(x + cw / 2, y + 37, b, { size: 12 });
    });
  });
  s.text(6, 362, '* as of 2024, of paid-up share capital', { anchor: 'start', size: 11, muted: true });
  return s.visual('Comparison chart of three forms of public enterprise. Departmental undertaking: part of a ministry with no law of its own, not a separate legal entity, funds from the treasury with revenue paid to the treasury, government servants as staff, and budget, accounting and audit controls. Statutory corporation: created by a special Act, a separate legal entity, own income and possibly capital from the government, staff who are not government servants, and departmental budget rules do not apply. Government company: registered under the Companies Act, a separate legal entity, government holds at least 51 percent of paid-up capital as of 2024, staff under company rules, and managed by a board of directors', 'Three forms compared on five points.');
})();

const vReforms = (() => {
  const s = new Svg(720, 310);
  s.rect(20, 118, 180, 72, { fill: 'accent', fillOpacity: 0.18, color: 'accent', sw: 2 });
  s.text(110, 142, 'Industrial policy', { size: 14, bold: true });
  s.text(110, 166, 'of 1991', { size: 14, bold: true });
  const items = [['Fewer industries reserved', 'for the public sector'], ['Disinvestment: sale of part', "of the government's shares"], ['Memorandum of understanding:', 'agreed performance targets'], ['Policy for sick units:', 'revive or close in order']];
  items.forEach(([a, b], i) => {
    const y = 12 + i * 74;
    s.rect(300, y, 390, 58, { fill: 'fill', color: 'muted', sw: 1.4 });
    s.text(495, y + 20, a, { size: 13, bold: true });
    s.text(495, y + 40, b, { size: 13 });
    s.arrow(204, 154, 296, y + 29, { sw: 1.6 });
  });
  return s.visual('Flow from the industrial policy of 1991 to four changes in the role of the public sector: fewer industries reserved for the public sector, disinvestment, the memorandum of understanding system and a policy for sick units', 'Four changes after 1991.');
})();

const vMncWeb = (() => {
  const s = new Svg(720, 340);
  const bw = 184, bh = 48;
  const cx = 360, cy = 170, cw = 180, ch = 56;
  const nodes = [
    [20, 12, 'Huge capital', 'resources'], [268, 12, 'Foreign', 'collaboration'], [516, 12, 'Advanced', 'technology'],
    [10, 146, 'Product', 'innovation'], [526, 146, 'Marketing', 'strategies'],
    [130, 280, 'Expansion of', 'market territory'], [402, 280, 'Centralised control', 'from head office'],
  ];
  nodes.forEach(([x, y]) => {
    const nx = x + bw / 2, ny = y + bh / 2;
    const dx = nx - cx, dy = ny - cy;
    const t = Math.min(Math.abs(dx) > 0 ? (cw / 2) / Math.abs(dx) : 9, Math.abs(dy) > 0 ? (ch / 2) / Math.abs(dy) : 9);
    const sx = cx + dx * t, sy = cy + dy * t;
    const u = Math.min(Math.abs(dx) > 0 ? (bw / 2) / Math.abs(dx) : 9, Math.abs(dy) > 0 ? (bh / 2) / Math.abs(dy) : 9);
    s.line(sx, sy, nx - dx * u, ny - dy * u, { sw: 1.4, color: 'muted' });
  });
  s.rect(cx - cw / 2, cy - ch / 2, cw, ch, { fill: 'accent', fillOpacity: 0.18, color: 'accent', sw: 2 });
  s.text(cx, cy - 10, 'Global enterprise', { size: 14, bold: true });
  s.text(cx, cy + 12, '(multinational)', { size: 12 });
  nodes.forEach(([x, y, a, b]) => {
    s.rect(x, y, bw, bh, { fill: 'fill', color: 'muted', sw: 1.4 });
    s.text(x + bw / 2, y + 17, a, { size: 13, bold: true });
    s.text(x + bw / 2, y + 35, b, { size: 13, bold: true });
  });
  return s.visual('Web of seven features around a global enterprise: huge capital resources, foreign collaboration, advanced technology, product innovation, marketing strategies, expansion of market territory and centralised control from the head office', 'Seven features of a global enterprise.');
})();

const vJvPpp = (() => {
  const s = new Svg(760, 330);
  const x0 = 110, cw = 322, top = 10, hh = 44, rh = 66;
  const cols = [['Joint venture'], ['Public private', 'partnership']];
  const rows = [
    ['Parties', [['Two or more firms,', 'Indian or foreign'], ['The government and', 'a private enterprise']]],
    ['Purpose', [['One business activity', 'for profit'], ['Public infrastructure', 'or a public service']]],
    ['Sharing', [['Ownership, control', 'and profit'], ['Risk and reward,', 'as agreed']]],
    ['Forms or terms', [['Contractual or', 'equity-based'], ['A long agreement;', 'private partner runs it']]],
  ];
  cols.forEach((c, i) => {
    const x = x0 + i * cw;
    s.rect(x + 2, top, cw - 4, hh, { fill: 'accent', fillOpacity: 0.16, color: 'accent', sw: 1.4, rx: 6 });
    if (c.length === 1) s.text(x + cw / 2, top + hh / 2, c[0], { size: 13, bold: true });
    else { s.text(x + cw / 2, top + 15, c[0], { size: 13, bold: true }); s.text(x + cw / 2, top + 32, c[1], { size: 13, bold: true }); }
  });
  rows.forEach(([label, cells], r) => {
    const y = top + hh + 6 + r * rh;
    s.text(6, y + (rh - 8) / 2, label, { anchor: 'start', size: 12, bold: true });
    cells.forEach(([a, b], i) => {
      const x = x0 + i * cw;
      s.rect(x + 2, y, cw - 4, rh - 8, { fill: 'fill', color: 'muted', sw: 1.2, rx: 6 });
      s.text(x + cw / 2, y + 20, a, { size: 12 });
      s.text(x + cw / 2, y + 40, b, { size: 12 });
    });
  });
  return s.visual('Comparison of a joint venture and a public private partnership. Joint venture: two or more firms, Indian or foreign, for one business activity for profit, sharing ownership, control and profit, in a contractual or equity-based form. Public private partnership: the government and a private enterprise, for public infrastructure or a public service, sharing risk and reward as agreed, under a long agreement in which the private partner runs the project', 'Same idea of partnership, different partners and aims.');
})();

// ---------------------------------------------------------------- tables and flows
const vRoute1 = flow('LR', ['Private and public sector', 'Departmental undertaking', 'Statutory corporation', 'Government company', 'Changing role after 1991'], 'Route map of Part 1: private and public sector, departmental undertaking, statutory corporation, government company and the changing role of the public sector after 1991');
const vRoute2 = flow('LR', ['Global enterprises', 'Joint ventures', 'Public private partnership', 'Comparing the three'], 'Route map of Part 2: global enterprises, joint ventures, public private partnership and a comparison of the three');
const vSectors = table(['Sector', 'Owned by', 'Imagined example'], [
  ['Private sector', 'Individuals or groups', 'Anand Garments, owned by three brothers'],
  ['Public sector', 'Union, state or local government', 'Sarvodaya Seeds Ltd, owned by a state government'],
  ['Mixed economy', 'Both sectors work side by side', 'The economy of India'],
], 'Table of private sector, public sector and mixed economy with owners and imagined examples');
const vThree = flow('LR', ['Departmental undertaking', 'Statutory corporation', 'Government company'], 'Flow listing the three forms of public enterprise: departmental undertaking, statutory corporation and government company', 'The three forms of public enterprise');
const vDeptFeat = table(['Feature', 'Meaning'], [
  ['Part of a ministry', 'Run as a department under direct control of the ministry'],
  ['Treasury finance', 'Funds come from the treasury; revenue goes back to it'],
  ['Government controls', 'Budget, accounting and audit rules apply'],
  ['Staff', 'Employees are government servants'],
  ['Accountability', 'The undertaking answers to the ministry'],
], 'Table of five features of a departmental undertaking: part of a ministry, treasury finance, government controls, government servants as staff and accountability to the ministry');
const vDeptML = table(['Merits', 'Limitations'], [
  ['Effective government control', 'Lack of flexibility'],
  ['Accountable to the public through the ministry', 'Red tape and delay'],
  ['Revenue goes to the government', 'Low incentive to show initiative'],
  ['Suited to sensitive and strategic work', 'Possible political interference'],
], 'Table of merits and limitations of a departmental undertaking');
const vClues = table(['Clue in an imagined case', 'Form it points to'], [
  ['Branch of an imagined ministry, funded by the budget', 'Departmental undertaking'],
  ['Created by its own Act of a state legislature', 'Statutory corporation'],
  ['Registered under the Companies Act with a government stake', 'Government company'],
], 'Worked example table of clues and the form each points to: a branch of a ministry funded by the budget is a departmental undertaking, creation by its own Act is a statutory corporation and registration under the Companies Act with a government stake is a government company', 'Underline the clue, then name the form.');
const vStatFeat = table(['Feature', 'Meaning'], [
  ['Own Act', 'Created by a special Act of Parliament or a state legislature'],
  ['Separate legal entity', 'Can own property, sue and be sued in its own name'],
  ['Financial independence', 'Meets costs from its own income; may get capital from government'],
  ['Own staff rules', 'Employees are not government servants'],
  ['Free of departmental procedures', 'Budget, accounting and audit procedures of departments do not apply'],
], 'Table of five features of a statutory corporation: own Act, separate legal entity, financial independence, own staff rules and freedom from departmental procedures');
const vStatML = table(['Merits', 'Limitations'], [
  ['Operational flexibility and autonomy', 'Government influence in practice'],
  ['Financial independence', 'Rigid procedures can still creep in'],
  ['Professional management', 'Accountable to the legislature, which can slow decisions'],
  ['Own staff rules attract skilled people', 'Creating or changing it needs a law'],
], 'Table of merits and limitations of a statutory corporation');
const vGovFeat = table(['Feature', 'Meaning'], [
  ['Registered company', 'Formed under the Companies Act'],
  ['Government stake', `At least ${GOVT_MIN} percent of paid-up capital, as of 2024`],
  ['Legal entity', 'Can sue and be sued in its own name'],
  ['Board of directors', 'The board manages the company'],
  ['Company rules for staff', 'Employees are not government servants'],
  ['Wholly or partly owned', 'Private shareholders may hold the rest'],
], 'Table of six features of a government company: registered company, government stake of at least 51 percent as of 2024, legal entity, board of directors, company rules for staff and wholly or partly owned by the government');
const vDesh = table(['Item (imagined Desh Steel Ltd)', 'Lakh shares'], [
  ['Total shares', fmt(DESH.total)],
  ['Sold by the government in round one', fmt(DESH.sale1)],
  ['Held by the government after round one', `${fmt(DESH.held1)} = ${DESH.pct1} percent`],
  ['Held if ' + fmt(DESH.sale2) + ' are sold in all', `${fmt(DESH.held2)} = ${DESH.pct2} percent`],
  ['Test, as of 2024', `At least ${GOVT_MIN} percent to stay a government company`],
], 'Worked example table: Desh Steel Ltd has one thousand lakh shares; after selling three hundred and fifty the government holds sixty five percent and remains a government company; if five hundred and twenty are sold it holds forty eight percent, below fifty one percent, so it is no longer a government company', 'Holding after sale = total minus shares sold.');
const vGovML = table(['Merits', 'Limitations'], [
  ['Easy to form under the Companies Act', 'Government influence reduces autonomy'],
  ['Separate legal entity', 'Board may include government nominees'],
  ['Autonomy and flexibility in operations', 'Duty to the public may clash with profit'],
  ['Can raise funds from private shareholders', 'Public accountability can slow decisions'],
], 'Table of merits and limitations of a government company');
const vSummary1 = table(['Form', 'Remember'], [
  ['Departmental undertaking', 'Part of a ministry; treasury; government servants; red tape'],
  ['Statutory corporation', 'Own Act; own income; own staff rules; flexible'],
  ['Government company', `Companies Act; at least ${GOVT_MIN} percent government, as of 2024; board`],
  ['After 1991', 'Fewer reserved industries; disinvestment; MoU; sick-unit policy'],
], 'Summary table of Part 1: departmental undertaking, statutory corporation, government company and the changes after 1991');
const vTips1 = table(['Common mistake', 'Fix'], [
  ['Saying a statutory corporation follows department budget rules', 'It is free of them'],
  ['Writing 51 percent with no date', 'Add as of 2024'],
  ['Calling the employees of every public enterprise government servants', 'Only in a departmental undertaking'],
  ['Judging a government or its policy', 'State the measure and its aim neutrally'],
], 'Exam tips table: four common mistakes about statutory corporation budget rules, dated percentages, government servants and neutral wording');
const vReserved = table(['Measure', 'What it means', 'Dated note'], [
  ['Reserved industries', 'Areas kept only for the public sector', 'A very small number remain, mainly atomic energy and railway operations, as of 2024'],
  ['Disinvestment', 'Sale of part of the government shares', 'Holding below 51 percent ends government company status, as of 2024'],
], 'Table of reserved industries and disinvestment with dated notes as of 2024');
const vMouSick = table(['Measure', 'Idea'], [
  ['Memorandum of understanding', 'Government and enterprise agree yearly targets; performance is rated'],
  ['Policy for sick units', 'Revive viable units; close others in an orderly way, as of 2024 under general company and insolvency law'],
], 'Table of the memorandum of understanding system and the policy for sick units');

const vMncDef = table(['Point', 'Meaning'], [
  ['Global enterprise', 'A large firm with operations in many countries'],
  ['Also called', 'Multinational corporation'],
  ['Head office', 'In one country, controls branches and subsidiaries abroad'],
  ['Imagined example', 'Veltrix Beverages, with plants in fourteen countries'],
], 'Table defining a global enterprise: a large firm with operations in many countries, also called a multinational corporation, controlled from a head office, with the imagined Veltrix Beverages as example');
const vMncFeat = table(['Feature', 'Meaning'], [
  ['Huge capital resources', 'Funds from many countries and markets'],
  ['Foreign collaboration', 'Tie-ups with local firms in host countries'],
  ['Advanced technology', 'Research and modern production'],
  ['Product innovation', 'Steady launch of new products'],
  ['Marketing strategies', 'Strong promotion and distribution'],
  ['Expansion of market territory', 'Entry into new countries'],
  ['Centralised control', 'Head office guides all branches'],
], 'Table of seven features of a global enterprise: huge capital resources, foreign collaboration, advanced technology, product innovation, marketing strategies, expansion of market territory and centralised control');
const vMncEx = table(['Imagined case (Orvane Foods)', 'Feature'], [
  ['Sells in nine new countries after saturating home sales', 'Expansion of market territory'],
  ['Head office sets one pricing policy for all branches', 'Centralised control'],
  ['Builds a research centre for new snacks', 'Advanced technology and product innovation'],
  ['Joins a local distributor in a host country', 'Foreign collaboration'],
], 'Worked example table matching four situations of the imagined Orvane Foods to features of a global enterprise');
const vJvDef = table(['Point', 'Meaning'], [
  ['Joint venture', 'Two or more firms join to carry on a business activity'],
  ['They share', 'Ownership, control and profit'],
  ['Partners', 'Domestic firms, or a domestic and a foreign firm'],
  ['Types', 'Contractual and equity-based'],
], 'Table defining a joint venture: two or more firms carry on a business activity and share ownership, control and profit, with contractual and equity-based types');
const vJvTypes = table(['Type', 'How it works', 'Imagined example'], [
  ['Contractual', 'Cooperation by agreement alone; no new jointly owned entity', 'One firm makes parts, the other markets them under a shared brand'],
  ['Equity-based', 'A new entity is set up; partners hold shares', 'Sundar Nordvik Components Pvt Ltd'],
], 'Table of the two types of joint venture with how each works and an imagined example');
const vJvEx = table(['Item (imagined Sundar Nordvik)', 'Sundar', 'Nordvik'], [
  ['Share of capital (percent)', String(JV.split[0]), String(JV.split[1])],
  [`Capital of Rs ${JV.capital} crore (Rs crore)`, String(JV.parts[0]), String(JV.parts[1])],
  [`Profit of Rs ${JV.profit} crore (Rs crore)`, String(JV.profitParts[0]), String(JV.profitParts[1])],
], 'Worked example table: capital of fifty crore rupees shared sixty to forty gives thirty and twenty crore; a profit of ten crore shared in the same ratio gives six and four crore', 'Each share = total times its percent, divided by 100.');
const vJvBen = table(['Benefit', 'Meaning'], [
  ['More resources and capacity', 'Funds and skills of both firms'],
  ['New markets and networks', "Use of the partner's reach"],
  ['Access to technology', 'Machines and methods of the partner'],
  ['Innovation', 'Joint research and new products'],
  ['Low cost of production', 'Shared plants and large scale'],
  ['Established brand name', "Trusted name of the partner"],
], 'Table of six benefits of a joint venture: more resources and capacity, new markets and networks, access to technology, innovation, low cost of production and an established brand name');
const vPppFlow = flow('LR', ['Government identifies the need', 'Private partner chosen', 'Builds the project', 'Runs it for the agreed period', 'Hands it back'], 'Flow of an imagined public private partnership: the government identifies the need, a private partner is chosen, builds the project, runs it for the agreed period and hands it back', 'A common pattern, in order');
const vPppFeat = table(['Feature', 'Meaning'], [
  ['Partners', 'The government and a private enterprise'],
  ['Purpose', 'Build or run public infrastructure or a service'],
  ['Sharing', 'Risk and reward are shared as agreed'],
  ['Government role', 'Land, approvals or funding'],
  ['Private role', 'Capital, technology and management'],
  ['Term', 'A long agreement with fixed duties'],
], 'Table of six features of a public private partnership: partners, purpose, sharing of risk and reward, government role, private role and term');
const vPppEx = table(['Item (imagined Ghat Expressway)', 'Rs crore'], [
  ['Cost of the road', fmt(PPP.cost)],
  [`State pays ${PPP.govtPct} percent`, fmt(PPP.govt)],
  ['Private partner pays the rest', fmt(PPP.private)],
  [`Net toll over ${PPP.years} years at ${PPP.net} a year`, fmt(PPP.total)],
  ['Toll minus private capital, before interest and tax', fmt(PPP.surplus)],
], 'Worked example table: a road costing eight hundred crore rupees, with the state paying twenty five percent, two hundred crore, and the private partner six hundred crore; net toll of forty crore a year for twenty five years is one thousand crore, four hundred crore above the private capital before interest and tax', 'Cost split first, then reward over the term.');
const vCompare3 = table(['Idea', 'Global enterprise', 'Joint venture', 'PPP'], [
  ['Who', 'One large firm', 'Two or more firms', 'Government and private firm'],
  ['Aim', 'Business in many countries', 'A shared business activity', 'Public infrastructure or service'],
  ['Control', 'Head office', 'Shared', 'Agreed roles'],
], 'Table comparing a global enterprise, a joint venture and a public private partnership on who is involved, the aim and control');
const vSummary2 = table(['Idea', 'Remember'], [
  ['Global enterprise', 'Many countries; seven features; head office control'],
  ['Joint venture', 'Share ownership, control and profit; contractual or equity-based'],
  ['Public private partnership', 'Government and private partner; risk and reward shared'],
], 'Summary table of Part 2: global enterprise, joint venture and public private partnership');
const vTips2 = table(['Common mistake', 'Fix'], [
  ['Naming real companies as examples', 'Use a made-up firm or a general description'],
  ['Calling every tie-up a joint venture', 'A joint venture shares ownership, control and profit'],
  ['Saying the private partner bears all risk in a PPP', 'Risk and reward are shared'],
  ['Listing features without applying them', 'Link each feature to a clue in the case'],
], 'Exam tips table: four common mistakes about naming real companies, calling every tie-up a joint venture, risk in a public private partnership and applying features to the case');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Public and Private Sector Enterprises',
  goals: [
    'Distinguish the private sector from the public sector and explain a mixed economy',
    'Explain the departmental undertaking, the statutory corporation and the government company',
    'List the merits and limitations of each form of public enterprise',
    'Describe the changing role of the public sector after 1991, including dated notes',
  ],
  slides: [
    sl('title', 'Public and Private Sector Enterprises', {
      b: 'Part 1: the **public sector**, its three forms, and how its role has changed.',
      v: vRoute1,
      n: 'Some businesses are owned by a family or a group of investors. Others are owned by the government. In this part we separate the two sectors, study three forms of public enterprise, and see how the role of the public sector changed after nineteen ninety one.',
    }),
    sl('concept', 'Private sector, public sector and the mixed economy', {
      b: 'The **private sector** is owned by individuals or groups. The **public sector** is owned by the government: Union, state or local.',
      v: vSectors,
      n: 'The private sector is owned by individuals or groups. The public sector is owned by the government, which may be the Union, a state or a local body. When both sectors work side by side, as in India, the economy is called a mixed economy. The sector depends on who owns the enterprise.',
    }),
    sl('concept', 'Three forms of public enterprise', {
      bl: ['Departmental undertaking', 'Statutory corporation', 'Government company'],
      v: vThree,
      n: 'Public enterprises take three forms. The departmental undertaking is a part of a ministry. The statutory corporation is created by its own Act. The government company is registered under the Companies Act. Each form balances government control against freedom of action in a different way.',
    }),
    sl('concept', 'Departmental undertaking: features', {
      b: 'A **departmental undertaking** is a public enterprise run as a department of a ministry.',
      v: vDeptFeat,
      n: 'A departmental undertaking is run as a department of a ministry. Its money comes from the treasury and its revenue goes back to the treasury. Budget, accounting and audit rules of the government apply to it, its employees are government servants, and it answers to the ministry.',
    }),
    sl('concept', 'Departmental undertaking: merits and limitations', {
      bl: ['Strengths: control, accountability, revenue', 'Weaknesses: delay, red tape, low incentive'],
      v: vDeptML,
      n: 'The strengths are effective control by the government, accountability through the ministry, revenue that flows to the government, and suitability for sensitive work. The weaknesses are lack of flexibility, red tape that delays decisions, low incentive for staff to show initiative, and the chance of political interference.',
    }),
    sl('example', 'Worked example 1: name the form from the clues', {
      b: 'Three imagined cases. Underline the clue in each and name the form.',
      bl: ['Step 1: Find who created the enterprise.', 'Step 2: Check money, staff and legal status.', 'Step 3: Match the form and give a reason.'],
      v: vClues,
      n: 'Read each case for clues. A branch of a ministry funded from the budget is a departmental undertaking. Creation by its own Act of a legislature points to a statutory corporation. Registration under the Companies Act with a government stake points to a government company. Always give a reason from the case.',
    }),
    sl('check', 'Quick check: name the form', {
      b: 'An imagined telegraph service, a branch of a ministry. Identify the form.',
      chk: 'mc_dept_identify',
      n: 'Look for who runs the service, where its money comes from and who its staff are.',
    }),
    sl('concept', 'Statutory corporation: features', {
      b: 'A **statutory corporation** is created by a special Act of Parliament or a state legislature.',
      v: vStatFeat,
      n: 'A statutory corporation is created by a special Act of Parliament or of a state legislature, and the Act gives it its powers. It is a separate legal entity with financial independence, so it meets its costs from its own income. Its employees are not government servants, and departmental budget and audit procedures do not apply.',
    }),
    sl('concept', 'Statutory corporation: merits and limitations', {
      bl: ['Strengths: flexibility, own finance, skilled staff', 'Weaknesses: government influence, rigid rules'],
      v: vStatML,
      n: 'A statutory corporation has operational flexibility, financial independence and professional management, and its own staff rules help it attract skilled people. Its weaknesses are that the government still influences it in practice, rigid procedures can creep in, accountability to the legislature can slow decisions, and creating or changing one needs a law.',
    }),
    sl('check', 'Quick check: corporation and budget rules', {
      b: 'True or false: a corporation follows the budget rules of a department.',
      chk: 'tf_stat_budget',
      n: 'Think about the financial independence of a statutory corporation.',
    }),
    sl('concept', 'Government company: features', {
      b: 'A **government company** is a company in which the Union and or state governments hold at least fifty one percent of the paid-up share capital, as of 2024.',
      v: vGovFeat,
      n: 'A government company is registered under the Companies Act. As of two thousand twenty four, the Union or state governments hold at least fifty one percent of its paid up share capital. It can sue and be sued, a board of directors manages it, and its employees follow the company rules. It may be wholly or only partly owned by the government.',
    }),
    sl('example', 'Worked example 2: the fifty one percent test', {
      b: 'An imagined government company sells some of its shares. Does it stay a government company?',
      bl: ['Step 1: Shares held = total minus shares sold.', 'Step 2: Holding percent = held divided by total times one hundred.', 'Step 3: Compare with fifty one percent, as of 2024.'],
      v: vDesh,
      n: 'In this imagined company the government holds all the shares. After selling a part, subtract to find the shares held and turn them into a percentage. If the holding is at least fifty one percent, as of two thousand twenty four, the company stays a government company. If a bigger sale takes the holding below that figure, it stops being one.',
    }),
    sl('concept', 'Government company: merits and limitations', {
      bl: ['Strengths: easy to form, autonomy, private funds', 'Weaknesses: influence, public duty, accountability'],
      v: vGovML,
      n: 'A government company is easy to form under the Companies Act, is a separate legal entity, enjoys autonomy and flexibility, and can raise funds from private shareholders. Its limits are that government influence can reduce autonomy, the board may include government nominees, a duty to the public may clash with profit, and public accountability can slow decisions.',
    }),
    sl('check', 'Quick check: the shareholding test', {
      b: 'Fill in the minimum government holding and the Act, as of 2024.',
      chk: 'fb_govco_share',
      n: 'Remember the percentage of paid up capital and the law under which a government company is registered.',
    }),
    sl('diagram', 'Comparing the three forms', {
      v: vForms,
      n: 'This chart compares the three forms on five points. A department has no law of its own and is not a separate entity. A corporation has its own Act, its own income and its own staff rules. A company is registered under the Companies Act and is managed by a board. The government holds a required stake in a government company.',
    }),
    sl('check', 'Quick check: match the enterprise and the form', {
      b: 'Match four imagined enterprises with their forms.',
      chk: 'mt_forms',
      n: 'For each enterprise, ask how it was created and who runs it.',
    }),
    sl('diagram', 'Changing role of the public sector after 1991', {
      v: vReforms,
      n: 'After the industrial policy of nineteen ninety one, the role of the public sector was reshaped in four ways. Fewer industries were reserved for it. The government began to sell part of its shares. The memorandum of understanding system set performance targets. And a policy was framed for sick units. These are described here as measures and their aims.',
    }),
    sl('concept', 'Reserved industries and disinvestment', {
      bl: ['Reserved list cut sharply', 'Disinvestment is the sale of part of the government shares'],
      v: vReserved,
      n: 'Before nineteen ninety one, many industries were reserved only for the public sector. The list was cut sharply, and as of two thousand twenty four a very small number remain, mainly atomic energy and railway operations. Disinvestment means selling part of the government shares in an enterprise. If the holding falls below fifty one percent, the company is no longer a government company.',
    }),
    sl('concept', 'Memorandum of understanding and sick units', {
      bl: ['Targets agreed each year and rated', 'Sick units: revive or close in an orderly way'],
      v: vMouSick,
      n: 'Under the memorandum of understanding system, a public enterprise and the government agree on targets for the year, and performance is rated against them. This gives managers freedom with accountability. For a sick unit, the policy is to revive it if it can be made viable and to close it in an orderly way if not. Older special board arrangements ended in two thousand sixteen.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up. A departmental undertaking is a part of a ministry, with treasury finance and government servants. A statutory corporation has its own Act, income and staff rules. A government company is registered under the Companies Act, with a government stake of at least fifty one percent as of two thousand twenty four. After nineteen ninety one, reserved industries were reduced, and disinvestment and agreed targets were introduced.',
    }),
    sl('exam-tips', 'Exam tips', {
      v: vTips1,
      bl: ['Add as of 2024 to the fifty one percent figure.', 'Link each feature to a clue in the case.'],
      n: 'Some tips. A statutory corporation is free of departmental budget rules. Write as of two thousand twenty four beside the fifty one percent figure. Only a departmental undertaking has government servants as staff. And when you describe changes after nineteen ninety one, state the measure and its aim in neutral words.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Global Enterprises, Joint Ventures and Public Private Partnership',
  goals: [
    'Explain the features of a global enterprise',
    'Distinguish contractual and equity-based joint ventures and list their benefits',
    'Describe the features of a public private partnership',
    'Compare the three arrangements using imagined cases',
  ],
  slides: [
    sl('title', 'Global Enterprises, Joint Ventures and Public Private Partnership', {
      b: 'Part 2: firms that work across countries, firms that join hands, and government that partners with business.',
      v: vRoute2,
      n: 'Some firms sell in fourteen countries. Some firms join together to run one factory. And sometimes the government joins a private firm to build a road. In this part we study the global enterprise, the joint venture and the public private partnership.',
    }),
    sl('concept', 'What is a global enterprise?', {
      b: 'A **global enterprise**, or multinational corporation, is a large firm with operations in many countries.',
      v: vMncDef,
      n: 'A global enterprise is a large firm with operations in many countries. It is also called a multinational corporation. Its head office in one country controls the branches and subsidiaries abroad. Our imagined example, Veltrix Beverages, runs plants and sales offices in fourteen countries.',
    }),
    sl('diagram', 'Features of a global enterprise', {
      v: vMncWeb,
      n: 'This web shows seven features. A global enterprise has huge capital resources, forms foreign collaborations, uses advanced technology, brings product innovation, follows strong marketing strategies, expands its market territory, and is controlled centrally from its head office.',
    }),
    sl('concept', 'The seven features explained', {
      v: vMncFeat,
      n: 'Huge capital lets it build plants in many countries. Foreign collaboration means tie ups with local firms. Advanced technology comes from research and modern production. Innovation brings new products. Marketing strategies promote and distribute them. Expansion takes the firm to new countries. Centralised control keeps all branches following one policy.',
    }),
    sl('example', 'Worked example 1: spot the feature', {
      b: 'Match each situation of an imagined firm to a feature.',
      bl: ['Step 1: Read the action.', 'Step 2: Ask which feature it shows.', 'Step 3: Name it and quote the clue.'],
      v: vMncEx,
      n: 'Orvane Foods is an imagined global enterprise. Selling in nine new countries shows expansion of market territory. One pricing policy from the head office shows centralised control. A new research centre shows advanced technology and product innovation. A tie up with a local distributor is foreign collaboration.',
    }),
    sl('check', 'Quick check: identify the feature', {
      b: 'An imagined firm opens sales in nine new countries. Which feature is this?',
      chk: 'mc_mnc_market',
      n: 'Think about what the firm is trying to reach by entering new countries.',
    }),
    sl('concept', 'Joint ventures: meaning', {
      b: 'A **joint venture** is an arrangement in which two or more firms join to carry on a business activity and share ownership, control and profit.',
      v: vJvDef,
      n: 'In a joint venture, two or more firms join to carry on a business activity. They share ownership, control and profit. The partners may be two domestic firms, or a domestic firm and a foreign firm. There are two types, the contractual joint venture and the equity based joint venture.',
    }),
    sl('concept', 'Contractual and equity-based joint ventures', {
      v: vJvTypes,
      bl: ['Contractual: an agreement alone', 'Equity-based: a jointly owned entity'],
      n: 'In a contractual joint venture, the firms cooperate through an agreement alone, and no new jointly owned entity is created. In an equity based joint venture, the partners set up a new entity and hold shares in it. The imagined firms Sundar Castings and Nordvik Machines formed such a company.',
    }),
    sl('example', 'Worked example 2: sharing capital and profit', {
      b: 'An imagined equity-based venture shares capital and profit in the ratio of equity.',
      bl: ['Step 1: Take each percent of the capital.', 'Step 2: Apply the same percent to the profit.', 'Step 3: Check that the parts add up to the total.'],
      v: vJvEx,
      n: 'The two firms put in fifty crore rupees, sixty percent from the Indian firm and forty percent from the foreign firm. That is thirty crore and twenty crore. A profit of ten crore is shared in the same ratio, six crore and four crore. Check that each pair adds up to the total.',
    }),
    sl('concept', 'Benefits of a joint venture', {
      v: vJvBen,
      n: 'A joint venture offers six benefits. The firms pool resources and capacity. They reach new markets and distribution networks. They gain access to technology and can innovate together. Sharing plants lowers the cost of production, and a partner may bring an established brand name.',
    }),
    sl('check', 'Quick check: a benefit', {
      b: 'An imagined tea firm uses a foreign partner stores. Which benefit is this?',
      chk: 'mc_jv_benefit',
      n: 'Think about what the partner already has that the tea firm lacks.',
    }),
    sl('concept', 'Public private partnership: the idea', {
      b: 'A **public private partnership** is an arrangement between the government and a private enterprise to build and run public infrastructure or services.',
      v: vPppFlow,
      n: 'A public private partnership joins the government with a private enterprise to build and run public infrastructure or services, such as roads, power, water and hospitals. A common pattern is shown here. The government identifies a need, a partner is chosen, builds the project, runs it for an agreed period, and hands it back.',
    }),
    sl('concept', 'Features of a public private partnership', {
      v: vPppFeat,
      n: 'The partners are the government and a private enterprise. The purpose is to provide public infrastructure or a service. Risk and reward are shared as agreed. The government may provide land, approvals or funding, while the private partner brings capital, technology and management. The agreement usually runs for a long, fixed term.',
    }),
    sl('example', 'Worked example 3: an imagined toll road', {
      b: 'The state and a private firm share the cost of an imagined road.',
      bl: ['Step 1: Split the cost by the state percent.', 'Step 2: Find the net toll over the term.', 'Step 3: Compare with the private capital.'],
      v: vPppEx,
      n: 'The road costs eight hundred crore rupees. The state pays twenty five percent, which is two hundred crore, and the private partner pays six hundred crore. The net toll is forty crore a year for twenty five years, one thousand crore. That is four hundred crore above the private capital, before interest and tax.',
    }),
    sl('check', 'Quick check: order of a partnership project', {
      b: 'Arrange the steps of an imagined toll road partnership.',
      chk: 'od_ppp_steps',
      n: 'Start with the need and end with the period of operation.',
    }),
    sl('diagram', 'Joint venture and public private partnership', {
      v: vJvPpp,
      n: 'Both arrangements rest on partnership, but the partners and aims differ. A joint venture joins two or more firms for one business activity, sharing ownership, control and profit. A public private partnership joins the government with a private enterprise to provide public infrastructure or a service, sharing risk and reward as agreed.',
    }),
    sl('check', 'Quick check: risk in a partnership', {
      b: 'Judge the assertion and the reason on risk in a partnership with the government.',
      chk: 'ar_ppp_risk',
      n: 'Decide whether each statement is true, and then whether the reason explains the assertion.',
    }),
    sl('concept', 'Comparing the three arrangements', {
      v: vCompare3,
      n: 'A global enterprise is one large firm operating in many countries, controlled by its head office. A joint venture joins two or more firms for a shared business activity, with shared control. A public private partnership joins the government and a private firm to provide public infrastructure or a service, with roles fixed by agreement.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up. A global enterprise operates in many countries, with seven features and central control from the head office. A joint venture shares ownership, control and profit, and may be contractual or equity based. A public private partnership joins the government and a private partner to build and run public infrastructure, sharing risk and reward.',
    }),
    sl('exam-tips', 'Exam tips', {
      v: vTips2,
      bl: ['Use made-up firms in your examples.', 'Link every feature to a clue in the case.'],
      n: 'Some tips. Give examples with made up firms or general descriptions, not real companies. Do not call every tie up a joint venture. Remember that in a public private partnership risk and reward are shared. And for each feature you list, point to the clue in the case.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Public, Private and Global Enterprises: notes',
  sections: [
    {
      h: '1. Private and public sector; departmental undertaking',
      t: 1,
      b: 'The **private sector** is owned by individuals or groups; the **public sector** is owned by the government (Union, state or local). When both exist side by side, as in India, the economy is a **mixed economy**.\n\nPublic enterprises take three forms. A **departmental undertaking** is run as a department of a ministry.\n\n**Features:** funds from the treasury and revenue paid into it; budget, accounting and audit controls of the government; employees are government servants; accountable to the ministry.\n\n**Merits:** effective control, public accountability, revenue to the government. **Limitations:** lack of flexibility, red tape, low incentive, possible political interference.\n\n**Dated note, as of 2024:** Indian Railways has long been run as a departmental undertaking of a ministry.',
      terms: [['Public sector', 'The part of the economy owned by the government: Union, state or local.'], ['Departmental undertaking', 'A public enterprise run as a department of a ministry, financed from the treasury and staffed by government servants.']],
      v: vDeptFeat,
      vs: [vDeptML],
    },
    {
      h: '2. Statutory corporation',
      t: 1,
      b: 'A **statutory corporation** is created by a special Act of Parliament or a state legislature, which defines its objects and powers.\n\n**Features:** own Act and powers; separate legal entity; financial independence (meets costs from its own income, may receive capital from the government); employees are not government servants; departmental budget, accounting and audit procedures do not apply.\n\n**Merits:** operational flexibility, autonomy, professional management. **Limitations:** government influence in practice, rigid procedures, accountability to the legislature may slow decisions, a law is needed to create or change it.\n\n**Dated note, as of 2024:** the Food Corporation of India, set up in 1965, is a long-standing example.',
      terms: [['Statutory corporation', 'A public enterprise created by a special Act, with its own powers, legal identity and finances.']],
      v: vStatFeat,
      vs: [vStatML],
    },
    {
      h: '3. Government company',
      t: 1,
      b: 'A **government company** is a company registered under the Companies Act in which the Union and or state governments hold at least 51 per cent of the paid-up share capital (as of 2024).\n\n**Features:** registered company; can sue and be sued in its own name; managed by a board of directors; employees follow the company\'s rules; may be wholly or partly government-owned.\n\n**Merits:** easy to form, separate legal entity, autonomy and flexibility, can raise funds from private shareholders. **Limitations:** government influence reduces autonomy, public duty may clash with profit, public accountability can slow decisions.\n\n**Worked check:** if the government sells part of its holding and the remainder is below 51 per cent (as of 2024), the company is no longer a government company.',
      terms: [['Government company', 'A company in which the government holds at least the stake fixed by company law (51 per cent as of 2024) of paid-up capital.']],
      v: vGovFeat,
      vs: [vGovML, vDesh],
    },
    {
      h: '4. Changing role of the public sector after 1991',
      t: 1,
      b: 'After the industrial policy of 1991 the role of the public sector was reshaped in four ways, described here as measures and their aims.\n\n1. **Fewer reserved industries.** As of 2024 a very small number remain reserved, mainly atomic energy and railway operations.\n2. **Disinvestment:** sale of part of the government\'s shares in an enterprise.\n3. **Memorandum of understanding (MoU):** the government and a public enterprise agree on yearly performance targets, and results are rated; this gives managers freedom with accountability.\n4. **Policy for sick units:** revive an enterprise that can be made viable; close others in an orderly way. As of 2024, older special-board arrangements are no longer in place (discontinued in 2016).',
      terms: [['Disinvestment', 'The sale of a part of the government\'s shareholding in a public enterprise.'], ['Memorandum of understanding', 'A yearly agreement between the government and a public enterprise that fixes performance targets.']],
      v: vReforms,
      vs: [vReserved, vMouSick],
    },
    {
      h: '5. Global enterprises',
      t: 2,
      b: 'A **global enterprise** (multinational corporation) is a large firm with operations in many countries, usually controlled from a head office in one country.\n\n**Features:** huge capital resources; foreign collaboration; advanced technology; product innovation; marketing strategies; expansion of market territory; centralised control from the head office.\n\n**Imagined example:** Veltrix Beverages, with plants in fourteen countries under one central plan.',
      terms: [['Global enterprise', 'A large firm that operates in many countries and is controlled from a head office.'], ['Foreign collaboration', 'A tie-up between a global enterprise and a firm in a host country.']],
      v: vMncWeb,
      vs: [vMncFeat],
    },
    {
      h: '6. Joint ventures',
      t: 2,
      b: 'A **joint venture** is an arrangement in which two or more firms join to carry on a business activity and share ownership, control and profits.\n\n**Types:** contractual (cooperation by agreement alone, with no new jointly owned entity) and equity-based (a new entity is set up in which the partners hold shares).\n\n**Benefits:** more resources and capacity; access to new markets and distribution networks; access to technology; innovation; low cost of production; an established brand name.\n\n**Imagined example:** capital of Rs 50 crore shared 60 to 40 gives Rs 30 crore and Rs 20 crore; a profit of Rs 10 crore shared in the same ratio gives Rs 6 crore and Rs 4 crore.',
      terms: [['Joint venture', 'An arrangement in which firms join to run a business activity and share ownership, control and profit.'], ['Equity-based joint venture', 'A joint venture in which the partners set up a jointly owned entity and hold shares in it.']],
      v: vJvTypes,
      vs: [vJvBen, vJvEx],
    },
    {
      h: '7. Public private partnership',
      t: 2,
      b: 'A **public private partnership** is an arrangement between the government and a private enterprise to build and run public infrastructure or services, such as roads, power, water and hospitals.\n\n**Features:** sharing of risk and reward; the government provides land, approvals or funding; the private partner brings capital, technology and management; a long agreement fixes the duties.\n\n**Imagined example:** a toll road costing Rs 800 crore, with the state paying 25 per cent (Rs 200 crore) and the private firm Rs 600 crore, which collects the toll for 25 years and then hands the road back.',
      terms: [['Public private partnership', 'An arrangement between the government and a private enterprise to build and run public infrastructure or services, sharing risk and reward.']],
      v: vPppFeat,
      vs: [vPppEx, vJvPpp],
    },
  ],
  tips: '**Common mistakes**\n- Saying a statutory corporation follows the budget rules of a department; it does not.\n- Writing 51 per cent without the words as of 2024.\n- Saying every public enterprise has government servants as staff; only a departmental undertaking does.\n- Calling any tie-up a joint venture; a joint venture shares ownership, control and profit.\n- Saying the private partner bears all the risk in a public private partnership.\n- Using real company names as examples; use made-up firms.\n\n**How marks are usually awarded**\n- 1 mark: a correct option or a quoted line from the case.\n- 2 and 3 marks: one point per feature or merit with a short explanation.\n- 5 marks: five points, each with an explanation, in a numbered list.\n- Case questions: quote the line, name the concept, explain in a sentence.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Private sector**', 'The part of the economy owned by individuals or groups.', 'definition', 1],
  ['**Public sector**', 'The part of the economy owned by the government: Union, state or local.', 'definition', 1],
  ['**Mixed economy**', 'An economy in which public and private enterprises exist side by side.', 'definition', 1],
  ['Three forms of public enterprise', 'Departmental undertaking, statutory corporation, government company.', 'fact', 1],
  ['**Departmental undertaking**', 'A public enterprise run as a department of a ministry.', 'definition', 1],
  ['Finance of a departmental undertaking', 'Funds from the treasury; revenue paid into the treasury.', 'fact', 1],
  ['Staff of a departmental undertaking', 'Government servants.', 'fact', 1],
  ['Two merits of a departmental undertaking', 'Effective control; public accountability (also revenue to government).', 'fact', 1],
  ['Two limitations of a departmental undertaking', 'Lack of flexibility; red tape (also low incentive).', 'fact', 1],
  ['**Statutory corporation**', 'A public enterprise created by a special Act of Parliament or a state legislature.', 'definition', 1],
  ['Legal status of a statutory corporation', 'A separate legal entity that can sue and be sued.', 'concept', 1],
  ['Finance of a statutory corporation', 'Financially independent: own income, may get capital from government.', 'concept', 1],
  ['Staff of a statutory corporation', 'Not government servants; own service rules.', 'fact', 1],
  ['Controls on a statutory corporation', 'Departmental budget, accounting and audit procedures do not apply.', 'exam-tip', 1],
  ['Two merits of a statutory corporation', 'Operational flexibility; financial independence (also professional management).', 'fact', 1],
  ['Two limitations of a statutory corporation', 'Government influence in practice; rigid procedures.', 'fact', 1],
  ['**Government company**', 'A company registered under the Companies Act in which the government holds at least 51 per cent of paid-up capital (as of 2024).', 'definition', 1],
  ['Features of a government company', 'Registered company; can sue and be sued; board of directors; company rules for staff; wholly or partly owned.', 'fact', 1],
  ['Government company: dated test', 'Holding of at least 51 per cent of paid-up capital, as of 2024.', 'exam-tip', 1],
  ['Two limitations of a government company', 'Government influence limits autonomy; public duty may clash with profit.', 'fact', 1],
  ['**Disinvestment**', 'Sale of a part of the government\'s shares in a public enterprise.', 'definition', 1],
  ['**Memorandum of understanding**', 'Yearly agreement between the government and a public enterprise on performance targets.', 'definition', 1],
  ['Reserved industries (as of 2024)', 'A very small number, mainly atomic energy and railway operations.', 'fact', 1],
  ['Policy for sick units', 'Revive viable units; close others in an orderly way.', 'concept', 1],
  ['**Global enterprise**', 'A large firm with operations in many countries, also called a multinational corporation.', 'definition', 2],
  ['Seven features of a global enterprise', 'Huge capital; foreign collaboration; advanced technology; product innovation; marketing strategies; market expansion; centralised control.', 'fact', 2],
  ['Centralised control', 'The head office controls branches and subsidiaries in other countries.', 'concept', 2],
  ['**Joint venture**', 'Two or more firms join to carry on a business activity and share ownership, control and profit.', 'definition', 2],
  ['Two types of joint venture', 'Contractual (an agreement alone) and equity-based (a jointly owned entity).', 'fact', 2],
  ['Benefits of a joint venture', 'More resources; new markets and networks; technology; innovation; low cost; established brand.', 'fact', 2],
  ['**Public private partnership**', 'An arrangement between the government and a private enterprise to build and run public infrastructure or services.', 'definition', 2],
  ['Roles in a public private partnership', 'Government: land, approvals or funding. Private partner: capital, technology, management. Risk and reward shared.', 'fact', 2],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short): Public, Private and Global Enterprises',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['mc_stat_identify', 'mc_govco_65', 'mc_mnc_identify', 'ar_stat_indep'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer the 2-mark questions in about 30 to 50 words and the 3-mark question in about 50 to 80 words.', items: ['s2_stat_features', 's2_mnc_def', 's3_stat_merits'] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80 to 120 words.', items: [{ attempt: 1, keys: ['l_stat', 'l_reforms'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks)', instr: 'Read the case and answer all parts. Part (c) has an internal choice.', items: ['cb_deshsteel'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long): Public, Private and Global Enterprises',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['mc_dept_audit', 'mc_stat_staff', 'mc_disinvest', 'mc_mou', 'mc_jv_contract', 'mc_jv_equity', 'mc_ppp_identify', 'mc_mnc_central', 'ar_disinvest', 'ar_mnc_central'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and 3-mark questions in about 50 to 80 words. Questions 13 and 15 have an internal choice.', items: ['s2_disinvest', 's2_mou', { attempt: 1, keys: ['s2_jv_def', 's2_ppp_def'] }, 's3_govco', { attempt: 1, keys: ['s3_dept_limits', 's3_mnc_features'] }] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80 to 120 words each.', items: ['l_dept', { attempt: 1, keys: ['l_mnc', 'l_jv'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks each)', instr: 'Read each case and answer all parts. Part (c) of each has an internal choice.', items: ['cb_hillroads', 'cb_toll'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 and t02 of cbse-11-business-studies-ch03 only (private and public sector enterprises; global enterprises, joint ventures and public private partnership)',
    originality: 'every enterprise, ministry, firm and case is imagined and written by SOYL; no NCERT text, example or exercise and no board or sample-paper item reused (D-036)',
    data: 'figures computed in the build: government holding after share sales (65 and 48 percent), joint-venture capital and profit shares (60:40), toll-road cost split and net toll',
    facts: 'dated as of 2024: 51 percent government holding in a government company, very small reserved list (atomic energy, railway operations), older sick-unit board discontinued in 2016, two long-standing public examples in the notes only',
    gate: 'schema, pipeline lint, deterministic verify, word limits, narration and answer-leak checks run clean in this build',
  },
});
