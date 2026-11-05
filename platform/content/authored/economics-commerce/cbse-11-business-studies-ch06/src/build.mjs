// Build CBSE 11 Business Studies ch06 Social Responsibility of Business and Business Ethics. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-11-business-studies-ch06/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-business-studies-ch01/src/lib.mjs';

setUnit('cbse-11-business-studies-ch06', 'economics-commerce');
const { fmt, LAW, PRITHVI } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// Worked-example figures computed here (Neel Dyes and Vistara Logistics are imagined).
const NEEL = { litres: 20000, pct: 50, rate: 50, days: 300, plant: 300000 };
NEEL.saved = (NEEL.litres * NEEL.pct) / 100; // 10000
NEEL.day = (NEEL.saved / 1000) * NEEL.rate; // 500
NEEL.year = NEEL.day * NEEL.days; // 150000
NEEL.payback = NEEL.plant / NEEL.year; // 2
const VIS = { reports: 40, settled: 34, target: 90 };
VIS.pct = (VIS.settled * 100) / VIS.reports; // 85
VIS.need = (VIS.reports * VIS.target) / 100; // 36
VIS.more = VIS.need - VIS.settled; // 2
PRITHVI.sum = PRITHVI.p.reduce((a, b) => a + b, 0); // 135
if (NEEL.saved !== 10000 || NEEL.day !== 500 || NEEL.year !== 150000 || NEEL.payback !== 2 || VIS.pct !== 85 || VIS.need !== 36 || VIS.more !== 2 || PRITHVI.sum !== 135) throw new Error('figure check failed');

// ---------------------------------------------------------------- SVG helpers
const link = (s, A, B, o = { sw: 1.4, color: 'muted' }) => {
  const ax = A.x + A.w / 2, ay = A.y + A.h / 2, bx = B.x + B.w / 2, by = B.y + B.h / 2;
  const dx = bx - ax, dy = by - ay;
  const t = (b) => Math.min(dx !== 0 ? b.w / 2 / Math.abs(dx) : 9, dy !== 0 ? b.h / 2 / Math.abs(dy) : 9);
  s.line(ax + dx * t(A), ay + dy * t(A), bx - dx * t(B), by - dy * t(B), o);
};

// ---------------------------------------------------------------- SVG visuals
const vCase = (() => {
  const s = new Svg(760, 410);
  s.text(190, 16, 'Case for social responsibility', { size: 15, bold: true });
  s.text(575, 16, 'Case against', { size: 15, bold: true });
  const pro = ['Justification for existence and growth', 'Long-term interest of the firm', 'Avoidance of government regulation', 'Maintenance of society', 'Availability of resources with business', 'Converting problems into opportunities', 'A better environment for doing business', 'Responsibility for problems it has caused'];
  const con = ['Violation of the profit-maximisation objective', 'Burden on consumers through higher prices', 'Lack of social skills', 'Lack of broad public support'];
  pro.forEach((t, i) => { const y = 34 + i * 46; s.rect(10, y, 370, 38, { fill: 'accent', fillOpacity: 0.14, color: 'accent', sw: 1.4 }); s.text(195, y + 19, t, { size: 13 }); });
  con.forEach((t, i) => { const y = 34 + i * 92; s.rect(400, y, 350, 70, { fill: 'fill', color: 'muted', sw: 1.4 }); s.text(575, y + 35, t, { size: 13 }); });
  return s.visual('Chart of the case for and the case against social responsibility. Case for, eight arguments: justification for the existence and growth of business, long-term interest of the firm, avoidance of government regulation, maintenance of society, availability of resources with business, converting problems into opportunities, a better environment for doing business, and responsibility for problems it has caused. Case against, four arguments: violation of the profit-maximisation objective, burden on consumers through higher prices, lack of social skills, and lack of broad public support', 'Arguments on both sides, as some argue and others argue.');
})();

const vKinds = (() => {
  const s = new Svg(760, 330);
  const rows = [
    ['Economic', 'Produce goods and services and earn a fair profit', 'Imagined: Tarang Appliances sells sound fans at fair prices'],
    ['Legal', 'Follow the laws of the land', 'Imagined: Hariyali Paper Mills pays tax and keeps to smoke limits'],
    ['Ethical', 'Do what is right and fair even where no law compels', 'Imagined: Amrit Dugdh will not sell a product it thinks unsafe'],
    ['Discretionary', 'Give or act by choice; no law or custom demands it', 'Imagined: Byteloom Software lends staff to teach at a village school'],
  ];
  rows.forEach((r, i) => {
    const y = 10 + i * 80;
    s.rect(10, y, 190, 68, { fill: 'accent', fillOpacity: 0.18, color: 'accent', sw: 1.8 });
    s.text(105, y + 34, r[0], { size: 15, bold: true });
    s.rect(210, y, 540, 68, { fill: 'fill', color: 'muted', sw: 1.4 });
    s.text(480, y + 24, r[1], { size: 13, bold: true });
    s.text(480, y + 48, r[2], { size: 12 });
  });
  return s.visual('Chart of four kinds of social responsibility. Economic: produce goods and services and earn a fair profit, as the imagined Tarang Appliances does with sound fans. Legal: follow the laws of the land, as the imagined Hariyali Paper Mills does by paying tax and keeping to smoke limits. Ethical: do what is right and fair even where no law compels, as the imagined Amrit Dugdh does by not selling a product it thinks unsafe. Discretionary: give or act by choice, as the imagined Byteloom Software does by lending staff to teach at a village school', 'Four kinds, from what is needed to what is chosen.');
})();

const vWeb = (() => {
  const s = new Svg(760, 420);
  const C = { x: 280, y: 165, w: 200, h: 90 };
  const B = [
    { x: 10, y: 10, w: 330, h: 120, h0: 'Owners and shareholders', l: ['A fair return on investment', 'Safety of the investment', 'True information about the firm'] },
    { x: 420, y: 10, w: 330, h: 120, h0: 'Workers', l: ['Fair wages', 'Good working conditions', 'The right to form unions'] },
    { x: 10, y: 290, w: 330, h: 120, h0: 'Consumers', l: ['Quality goods at fair prices', 'No adulteration or misleading advertising', 'Handling of grievances'] },
    { x: 420, y: 290, w: 330, h: 120, h0: 'Government and community', l: ['Obey the laws; pay taxes honestly', 'Protect the environment', 'Help community welfare'] },
  ];
  B.forEach((b) => link(s, C, b));
  s.rect(C.x, C.y, C.w, C.h, { fill: 'accent', fillOpacity: 0.18, color: 'accent', sw: 2 });
  s.text(C.x + C.w / 2, C.y + 32, 'A business', { size: 15, bold: true });
  s.text(C.x + C.w / 2, C.y + 60, 'owes duties to four groups', { size: 12 });
  B.forEach((b) => {
    s.rect(b.x, b.y, b.w, b.h, { fill: 'fill', color: 'muted', sw: 1.4 });
    s.text(b.x + b.w / 2, b.y + 24, b.h0, { size: 14, bold: true });
    b.l.forEach((t, i) => s.text(b.x + b.w / 2, b.y + 54 + i * 24, t, { size: 12 }));
  });
  return s.visual('Web of responsibilities of a business towards four groups. Owners and shareholders: a fair return on investment, safety of the investment and true information about the firm. Workers: fair wages, good working conditions and the right to form unions. Consumers: quality goods at fair prices, no adulteration or misleading advertising, and handling of grievances. Government and community: obey the laws, pay taxes honestly, protect the environment and help community welfare', 'Four groups and what is owed to each.');
})();

const vRole = (() => {
  const s = new Svg(760, 310);
  const steps = [
    ['1 Top management', 'commitment'], ['2 Commitment', 'throughout the firm'], ['3 Clear policies', 'and programmes'], ['4 Compliance', 'with laws'],
    ['5 Take part in', 'government programmes'], ['6 Periodic', 'assessment'], ['7 Educate dealers', 'and suppliers'],
  ];
  const pos = steps.map((_, i) => (i < 4 ? { x: 10 + i * 185, y: 20 } : { x: 102 + (i - 4) * 185, y: 190 }));
  pos.forEach((p, i) => {
    s.rect(p.x, p.y, 165, 90, { fill: i === 0 ? 'accent' : 'fill', fillOpacity: i === 0 ? 0.18 : 0, color: i === 0 ? 'accent' : 'muted', sw: 1.6 });
    s.text(p.x + 82, p.y + 33, steps[i][0], { size: 13, bold: true });
    s.text(p.x + 82, p.y + 58, steps[i][1], { size: 12 });
    if (i < 3 || (i > 3 && i < 6)) s.arrow(p.x + 168, p.y + 45, p.x + 180, p.y + 45, { sw: 1.6 });
  });
  s.polyline([[10 + 3 * 185 + 82, 110], [10 + 3 * 185 + 82, 150], [102 + 82, 150], [102 + 82, 182]], { sw: 1.6 });
  s.head(102 + 82, 190, 0, 1);
  return s.visual('Flow of the steps by which a business controls pollution, in seven steps: top management commitment; commitment throughout the enterprise; clear policies and programmes; compliance with laws; participation in government programmes; periodic assessment; and educating dealers and suppliers', 'Seven steps, from the top outwards.');
})();

const vEthics = (() => {
  const s = new Svg(760, 290);
  const el = [['Top management', 'commitment'], ['Publish a code', 'of conduct'], ['Set up compliance', 'mechanisms'], ['Involve employees', 'at all levels'], ['Measure', 'results']];
  const ex = [['The chief executive', 'states the stand', 'to all staff'], ['The code is posted', 'on the firm website'], ['An ethics committee', 'and a private', 'helpline'], ['Training for staff', 'from interns', 'to managers'], ['A yearly count of', 'breaches reported', 'and settled']];
  s.text(10, 130, 'Imagined example: Byteloom Software', { anchor: 'start', size: 12, muted: true });
  el.forEach((e, i) => {
    const x = 10 + i * 150;
    s.rect(x, 14, 130, 80, { fill: 'accent', fillOpacity: 0.16, color: 'accent', sw: 1.6 });
    s.text(x + 65, 42, e[0], { size: 13, bold: true });
    s.text(x + 65, 66, e[1], { size: 13, bold: true });
    if (i < 4) s.arrow(x + 132, 54, x + 148, 54, { sw: 1.8 });
    s.rect(x, 146, 130, 124, { fill: 'fill', color: 'muted', sw: 1.3 });
    ex[i].forEach((t, k) => s.text(x + 65, 178 + k * 30, t, { size: 12 }));
  });
  return s.visual('Flow of the five elements of business ethics with an imagined example from Byteloom Software. Top management commitment: the chief executive states the stand to all staff. Publication of a code of conduct: the code is posted on the firm website. Compliance mechanisms: an ethics committee and a private helpline. Involving employees at all levels: training for staff from interns to managers. Measuring results: a yearly count of breaches reported and settled', 'Five elements, in order.');
})();

// ---------------------------------------------------------------- route maps
const vRoute1 = flow('LR', ['Concept of social responsibility', 'Case for and against', 'Kinds of responsibility', 'Factors and the law on CSR'], 'Route map of Part 1: concept of social responsibility, the case for and against, kinds of responsibility, and the factors and the law on corporate social responsibility as of 2024');
const vRoute2 = flow('LR', ['Responsibility to stakeholders', 'Pollution and its control', 'Business ethics', 'Ethics and social responsibility'], 'Route map of Part 2: responsibility towards stakeholders, pollution and its control, business ethics, and how ethics and social responsibility are related');

// ---------------------------------------------------------------- tables, deck 1
const vDef = table(['Point', 'Meaning'], [
  ['Social responsibility', 'The obligation of business to take decisions and actions that are desirable in terms of the objectives and values of society'],
  ['Legal responsibility', 'The duty to comply with the law'],
  ['How they relate', 'Social responsibility goes beyond what the law requires'],
], 'Table defining social responsibility as the obligation of business to take decisions and actions that are desirable in terms of the objectives and values of society, and legal responsibility as the duty to comply with the law, with social responsibility going beyond the law');
const vBeyond = table(['Imagined act of Rangrez Dyeworks', 'Meets'], [
  ['Installs the wastewater unit that the rules demand, and nothing more', 'Legal responsibility only'],
  ['Also funds a clean drinking water tank for the villagers beside the river', 'Goes beyond the law: social responsibility'],
  ['Hides the volume of waste in its returns', 'Fails even the legal duty'],
], 'Table of three imagined acts of Rangrez Dyeworks: meeting only the rules is legal responsibility, funding a water tank for villagers goes beyond the law, and hiding the waste volume fails even the legal duty');
const vFor1 = table(['Argument for', 'Meaning'], [
  ['Justification for existence and growth', 'Business exists by the leave of society and serves its needs'],
  ['Long-term interest of the firm', 'A good name and loyal partners help a firm to earn for years'],
  ['Avoidance of government regulation', 'Responsible conduct leaves less reason for strict rules'],
  ['Maintenance of society', 'Business depends on a sound society and gains from keeping it so'],
], 'Table of four arguments for social responsibility: justification for existence and growth, long-term interest of the firm, avoidance of government regulation, and maintenance of society');
const vFor2 = table(['Argument for', 'Meaning'], [
  ['Availability of resources with business', 'Business holds money, skills and equipment that social work needs'],
  ['Converting problems into opportunities', 'A social problem can open a new line of business'],
  ['A better environment for doing business', 'Healthy, educated and safe communities are better places to trade'],
  ['Responsibility for problems it has caused', 'A firm that causes harm should help to repair it'],
], 'Table of four more arguments for social responsibility: availability of resources with business, converting problems into opportunities, a better environment for doing business, and holding business responsible for problems it has caused');
const vClues1 = table(['Clue in an imagined case', 'Argument'], [
  ['Surya Steel Works owns cranes and trucks that a flooded district lacks', 'For: availability of resources with business'],
  ['A shareholder says that social spending cuts the profit of the owners', 'Against: violation of profit maximisation'],
  ['A cement makers association adopts its own dust rules before a law is framed', 'For: avoidance of government regulation'],
], 'Worked example table of clues and the argument each points to: owning cranes and trucks that others lack is availability of resources, a shareholder saying that spending cuts owner profit is the profit-maximisation argument against, and adopting dust rules before a law is framed is avoidance of regulation', 'Find the clue, then name the side and the argument.');
const vAgainst = table(['Argument against', 'Meaning, as put by those who hold it'], [
  ['Violation of the profit-maximisation objective', 'Some argue that a firm exists to earn the most profit for its owners'],
  ['Burden on consumers through higher prices', 'Some argue that the cost will be added to prices'],
  ['Lack of social skills', 'Some argue that managers are trained for business, not social work'],
  ['Lack of broad public support', 'Some argue that people do not wish business to take up social work'],
], 'Table of four arguments against social responsibility, each stated as the view of those who hold it: violation of the profit-maximisation objective, burden on consumers through higher prices, lack of social skills, and lack of broad public support');
const vKindsT = table(['Kind', 'Meaning', 'Imagined example'], [
  ['Economic', 'Produce goods and services and earn a profit', 'Tarang Appliances sells sound fans at fair prices'],
  ['Legal', 'Obey the law', 'Hariyali Paper Mills pays tax and keeps to smoke limits'],
  ['Ethical (including moral)', 'Do what is right where no law compels', 'Amrit Dugdh will not sell a product it thinks unsafe'],
  ['Discretionary (voluntary)', 'Act by choice for society', 'Byteloom Software lends staff to a village school'],
], 'Table of four kinds of social responsibility with a meaning and an imagined example of each: economic, legal, ethical including moral, and discretionary or voluntary');
const vClues2 = table(['Clue in an imagined case', 'Kind'], [
  ['A bakery earns a profit by selling fresh bread at fair prices', 'Economic'],
  ['A factory files its returns on time and meets the waste rules', 'Legal'],
  ['A shop recalls goods that it fears are unsafe, though no rule asks it to', 'Ethical'],
  ['A mill pays for a free health camp in a nearby village by its own choice', 'Discretionary'],
], 'Worked example table of clues and the kind each shows: a bakery earning profit with fair prices is economic, filing returns and meeting waste rules is legal, recalling goods that it fears are unsafe with no rule is ethical, and paying for a free health camp by choice is discretionary', 'Ask whether the act is needed, required, right or chosen.');
const vFactors = table(['Factor', 'How it moved business'], [
  ['Threat of public regulation', 'Firms act first to keep the government from framing strict rules'],
  ['Pressure of the labour movement', 'Organised workers press for fair treatment'],
  ['Impact of consumer consciousness', 'Aware buyers expect honest goods and dealing'],
  ['Development of social standards', 'Society expects fair and honest conduct'],
  ['Development of business education', 'Courses teach the duties of business to society'],
  ['Relationship between social interest and business interest', 'Firms see that the two often move together'],
  ['Development of a professional managerial class', 'Trained managers weigh society as well as owners'],
], 'Table of seven factors that influenced the acceptance of social obligations: threat of public regulation, pressure of the labour movement, impact of consumer consciousness, development of social standards, development of business education, the relationship between social interest and business interest, and the development of a professional managerial class');
const vLaw = table(['Point, as of 2024', 'Section 135 of the Companies Act 2013'], [
  ['Who is covered', `A company with a net worth of Rs ${LAW.netWorth} crore or more, or a turnover of Rs ${fmt(LAW.turnover)} crore or more, or a net profit of Rs ${LAW.profit} crore or more`],
  ['How much to spend', `At least ${LAW.pct} per cent of the average net profits of the three preceding years`],
  ['On what', 'Corporate social responsibility activities'],
  ['Dated note', 'Limits and rules change by amendment; check the present position'],
], `Table of the corporate social responsibility rule as of 2024: a company with a net worth of ${LAW.netWorth} crore rupees or more, or a turnover of ${fmt(LAW.turnover)} crore rupees or more, or a net profit of ${LAW.profit} crore rupees or more must spend at least ${LAW.pct} per cent of the average net profits of the three preceding years on social responsibility activities, with a note that limits can change`);
const vCsrEx = table(['Step (imagined Prithvi Cements, as of 2024)', 'Result'], [
  [`Net profits of three years, Rs crore: ${PRITHVI.p.join(', ')}`, `Sum ${PRITHVI.sum}`],
  ['Latest net profit of Rs 60 crore is at least the Rs 5 crore limit', 'Covered'],
  [`Average = ${PRITHVI.sum} divided by 3`, `Rs ${PRITHVI.avg} crore`],
  [`${LAW.pct} per cent of the average`, `Rs ${PRITHVI.csr} crore, or Rs ${PRITHVI.lakh} lakh`],
], `Worked example table: the imagined Prithvi Cements had net profits of ${PRITHVI.p.join(', ')} crore rupees, which sum to ${PRITHVI.sum}, an average of ${PRITHVI.avg} crore, and two per cent of that is ${PRITHVI.csr} crore rupees or ${PRITHVI.lakh} lakh rupees`, 'Check coverage, then average, then two per cent.');
const vSummary1 = table(['Idea', 'Remember'], [
  ['Concept', 'Obligation to act in line with the values of society; beyond legal duty'],
  ['Case for and against', 'Eight arguments for; four against; each is a view, not a fact'],
  ['Kinds', 'Economic, legal, ethical, discretionary'],
  ['Factors and law', 'Seven factors; section 135 sets a two per cent spend, as of 2024'],
], 'Summary table of Part 1: concept, case for and against, kinds of responsibility, factors and the law');
const vTips1 = table(['Common mistake', 'Fix'], [
  ['Treating social responsibility as the same as legal duty', 'Social responsibility goes beyond the law'],
  ['Writing only the case for', 'Give both sides, each as the view of some people'],
  ['Quoting the CSR rule with no date', 'Add as of 2024 and say the limits can change'],
  ['Using real firms as examples', 'Use made-up firms'],
], 'Exam tips table: four common mistakes about social responsibility, a one-sided answer, an undated rule and real firm names');

// ---------------------------------------------------------------- tables, deck 2
const vStakeA = table(['Group', 'What the business owes'], [
  ['Owners and shareholders', 'A fair return; safety of the investment; true information about the firm'],
  ['Workers', 'Fair wages; good working conditions; the right to form unions'],
], 'Table of responsibilities towards owners and shareholders: a fair return, safety of the investment and true information; and towards workers: fair wages, good working conditions and the right to form unions');
const vStakeB = table(['Group', 'What the business owes'], [
  ['Consumers', 'Quality goods at fair prices; no adulteration or misleading advertising; handling of grievances'],
  ['Government and community', 'Obeying laws; paying taxes honestly; protecting the environment; helping community welfare'],
], 'Table of responsibilities towards consumers: quality goods at fair prices, no adulteration or misleading advertising and handling of grievances; and towards the government and community: obeying laws, paying taxes honestly, protecting the environment and helping community welfare');
const vClues3 = table(['Clue in an imagined case', 'Responsibility neglected'], [
  ['A mill shows a loss as a profit in the report to shareholders', 'Owners: true information'],
  ['An owner sacks a worker who joins a union', 'Workers: the right to form unions'],
  ['A shop mixes sawdust into chilli powder', 'Consumers: no adulteration'],
  ['A firm keeps two sets of books to cut its tax', 'Government: honest taxes'],
], 'Worked example table of clues and the responsibility neglected: showing a loss as a profit fails true information to owners, sacking a union member fails the right to form unions, mixing sawdust into spice is adulteration, and two sets of books fail honest payment of taxes', 'Find who is harmed, then name the duty.');
const vPoll = table(['Kind of pollution', 'Meaning', 'Imagined case'], [
  ['Air', 'Smoke, dust and harmful gases in the air', 'Soot from the chimney of a brick kiln'],
  ['Water', 'Waste and chemicals in rivers, lakes and the sea', 'Coloured effluent in a river'],
  ['Land', 'Harmful solid waste spoiling the soil', 'Chemical sludge dumped on an empty plot'],
  ['Noise', 'Loud and unwanted sound', 'Heavy presses running all night'],
], 'Table of four kinds of pollution: air pollution from smoke, dust and gases, water pollution from waste in rivers and lakes, land pollution from harmful solid waste, and noise pollution from loud and unwanted sound, each with an imagined case');
const vPollDef = table(['Point', 'Meaning'], [
  ['Pollution', 'The release of harmful or unwanted substances or energy into the surroundings, making them less safe or fit for life'],
  ['Pollution by industry', 'Waste from production reaches air, water or land, or machines make loud sound'],
], 'Table defining pollution as the release of harmful or unwanted substances or energy into the surroundings that makes them less safe or fit for life, and pollution by industry as waste from production reaching air, water or land, or loud machines');
const vCauses = table(['Cause in industry', 'Result'], [
  ['Smoke and gases from furnaces and boilers', 'Air pollution'],
  ['Untreated effluent let into rivers and drains', 'Water pollution'],
  ['Solid and chemical waste dumped on open ground', 'Land pollution'],
  ['Heavy machines and old equipment running loudly', 'Noise pollution'],
  ['Use of out-of-date technology and no treatment of waste, to save cost', 'All kinds'],
  ['Weak checks and low concern for the environment', 'All kinds'],
], 'Table of causes of pollution from industry and their results: smoke and gases cause air pollution, untreated effluent causes water pollution, dumped waste causes land pollution, loud machines cause noise pollution, and out-of-date technology and weak checks add to all kinds');
const vNeedP = table(['Reason for pollution control', 'Meaning'], [
  ['Reduced health hazards', 'Cleaner air and water keep workers and neighbours healthy'],
  ['Reduced risk of liability', 'A firm that does no harm is less likely to face claims and penalties'],
  ['Cost savings', 'Reuse of water and recovery of materials lower expense'],
  ['Improved public image', 'People trust and prefer a firm that cares for the environment'],
  ['Other social benefits', 'Cleaner surroundings and a better life in the whole community'],
], 'Table of five reasons for pollution control: reduced health hazards, reduced risk of liability, cost savings, improved public image and other social benefits');
const vNeelEx = table(['Item (imagined Neel Dyes)', 'Figure'], [
  [`Water used each day; ${NEEL.pct} per cent recycled`, `${fmt(NEEL.litres)} litres; ${fmt(NEEL.saved)} litres saved`],
  [`Water costs Rs ${NEEL.rate} per 1,000 litres`, `Rs ${fmt(NEEL.day)} saved a day`],
  [`Saving over ${NEEL.days} working days`, `Rs ${fmt(NEEL.year)} a year`],
  [`Recycling plant costs Rs ${fmt(NEEL.plant)}`, `Repaid in ${NEEL.payback} years`],
], `Worked example table: the imagined Neel Dyes uses ${fmt(NEEL.litres)} litres of water a day and recycles half, saving ${fmt(NEEL.saved)} litres, worth ${fmt(NEEL.day)} rupees a day and ${fmt(NEEL.year)} rupees over ${NEEL.days} days, so a plant that costs ${fmt(NEEL.plant)} rupees is repaid in ${NEEL.payback} years`, 'Litres saved, rupees saved, years to repay.');
const vRoleAll = table(['Step', 'What the business does'], [
  ['Top management commitment', 'The board backs the cause with policy and funds'],
  ['Commitment throughout the enterprise', 'Every department and worker takes part'],
  ['Clear policies and programmes', 'Aims and steps are written down'],
  ['Compliance with laws', 'Keeps within the legal limits on emissions and waste'],
  ['Participation in government programmes', 'Joins public schemes for a clean environment'],
  ['Periodic assessment', 'Reviews its pollution and its progress at set times'],
  ['Educating dealers and suppliers', 'Teaches those who trade with it to handle waste safely'],
], 'Table of the seven steps in controlling pollution: top management commitment, commitment throughout the enterprise, clear policies and programmes, compliance with laws, participation in government programmes, periodic assessment, and educating dealers and suppliers');
const vEthDef = table(['Point', 'Meaning'], [
  ['Business ethics', 'The socially determined moral principles that should govern business activities'],
  ['Law and ethics', 'Law is enforced by the state; ethics are the standards of right conduct that society holds'],
], 'Table defining business ethics as the socially determined moral principles that should govern business activities, and distinguishing law, which the state enforces, from ethics, which are standards of right conduct held by society');
const vElemT = table(['Element', 'Imagined example (Byteloom Software)'], [
  ['Top management commitment', 'The chief executive says that the firm will turn down a contract rather than break its rules'],
  ['Publication of a code of conduct', 'A written code on gifts, client data and honest reporting is posted'],
  ['Compliance mechanisms', 'An ethics committee and a private helpline hear and settle breaches'],
  ['Involving employees at all levels', 'Staff from interns to managers are trained and asked for views'],
  ['Measuring results', 'The firm counts breaches reported and settled each year'],
], 'Table of five elements of business ethics with an imagined example from Byteloom Software: top management commitment, publication of a code of conduct, compliance mechanisms, involving employees at all levels, and measuring results');
const vVisEx = table(['Item (imagined Vistara Logistics)', 'Figure'], [
  ['Breach reports received in the year', `${VIS.reports}`],
  ['Reports settled', `${VIS.settled}, which is ${VIS.pct} per cent`],
  [`Aim: ${VIS.target} per cent settled`, `${VIS.need} reports`],
  ['Further reports to settle', `${VIS.more}`],
], `Worked example table: the imagined Vistara Logistics received ${VIS.reports} breach reports and settled ${VIS.settled}, which is ${VIS.pct} per cent, and an aim of ${VIS.target} per cent means ${VIS.need} reports, so ${VIS.more} more must be settled`, 'Share settled, aim, gap.');
const vRel = table(['Point', 'Ethics', 'Social responsibility'], [
  ['Concern', 'Moral principles that guide each decision', 'Obligation to act as society values'],
  ['Link', 'Supplies the moral base', 'Puts the principles into action for society'],
  ['Imagined example', 'Honest reporting at Byteloom Software', 'Byteloom Software teaches skills in a village school'],
], 'Table relating business ethics and social responsibility: ethics are the moral principles that guide each decision and supply the moral base, while social responsibility is the obligation to act as society values and puts the principles into action, with Byteloom Software as an imagined example');
const vSummary2 = table(['Idea', 'Remember'], [
  ['Stakeholders', 'Owners, workers, consumers, government and community'],
  ['Pollution', 'Air, water, land, noise; five reasons to control it'],
  ['Role of business', 'Seven steps from top management commitment to educating dealers'],
  ['Ethics', 'Moral principles set by society; five elements; the base of social responsibility'],
], 'Summary table of Part 2: stakeholders, pollution, the role of business and business ethics');
const vTips2 = table(['Common mistake', 'Fix'], [
  ['Listing stakeholders with no duty', 'State what is owed to each group'],
  ['Naming only the kinds of pollution', 'Give a cause and a cost of each'],
  ['Mixing ethics with law', 'Law is enforced by the state; ethics are held by society'],
  ['Using real firms as examples', 'Use made-up firms'],
], 'Exam tips table: four common mistakes about stakeholders, pollution, ethics and law, and real firm names');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Social Responsibility of Business: Concept and Case',
  goals: [
    'Define social responsibility and tell it apart from legal responsibility',
    'Present the arguments for and against social responsibility, as views held by different people',
    'Explain the four kinds of social responsibility and the factors that led firms to accept social obligations',
    'Describe the corporate social responsibility rule of section 135 of the Companies Act 2013, as of 2024, and work out a spend',
  ],
  slides: [
    sl('title', 'Social Responsibility of Business: Concept and Case', {
      b: 'Part 1: what social responsibility is, why people argue for and against it, its kinds and the law.',
      v: vRoute1,
      n: 'A dye factory beside a river must decide how to treat its waste. Obeying the law is one thing. Doing what society values is wider. In this part we define social responsibility, set out the arguments for and against it, study its kinds, and see what the Companies Act asks of large companies.',
    }),
    sl('concept', 'What is social responsibility?', {
      b: '**Social responsibility** is the obligation of business to take decisions and actions that are desirable in terms of the objectives and values of society.',
      v: vDef,
      n: 'Social responsibility is the obligation of business to take decisions and actions that are desirable in terms of the objectives and values of society. Legal responsibility is the duty to comply with the law. Social responsibility is wider, because it goes beyond what the law requires.',
    }),
    sl('concept', 'Going beyond the law', {
      v: vBeyond,
      n: 'Our imagined factory, Rangrez Dyeworks, sets up the wastewater unit that the rules demand. That meets its legal responsibility only. If it also pays for a clean water tank for the villagers, it goes beyond the law. If it hides its waste volume, it fails even the legal duty.',
    }),
    sl('check', 'Quick check: is it the same as the law?', {
      b: 'True or false: social responsibility means the same thing as obeying the law.',
      chk: 'tf_law',
      n: 'Think about whether a firm can obey every law and still fall short of what society values.',
    }),
    sl('diagram', 'The case for and against', {
      v: vCase,
      n: 'This chart sets out the arguments on both sides. Eight arguments are put in favour, and four against. Remember that each one is a view held by some people. Thoughtful people weigh them differently, and a good answer presents both sides with fairness.',
    }),
    sl('concept', 'Arguments for, first four', {
      v: vFor1,
      n: 'Some argue that business exists by the leave of society and serves its needs, which justifies its existence and growth. Some argue that a good name helps the long term interest of the firm. Others argue that responsible conduct avoids government regulation. And some say business depends on a sound society, which is the maintenance of society.',
    }),
    sl('concept', 'Arguments for, other four', {
      v: vFor2,
      n: 'Some argue that business holds money, skills and equipment that social work needs. Others say that a social problem can open a new line of business. Some say healthy and safe communities are better places to trade. And some argue that a firm that causes harm should help to repair it.',
    }),
    sl('example', 'Worked example 1: name the argument', {
      b: 'Three imagined cases. Find the clue, name the side and the argument.',
      bl: ['Step 1: Read what the speaker says or does.', 'Step 2: Decide whether it is for or against.', 'Step 3: Name the argument and give the reason.'],
      v: vClues1,
      n: 'Surya Steel Works owns cranes and trucks that a flooded district lacks. That is an argument for, availability of resources. A shareholder says social spending cuts owner profit. That is an argument against, violation of profit maximisation. A makers association adopts its own dust rules before a law is framed. That is avoidance of government regulation.',
    }),
    sl('concept', 'Arguments against', {
      v: vAgainst,
      n: 'Some argue that a firm exists to earn the most profit for its owners, so social spending violates that aim. Some argue that the cost will be added to prices, a burden on consumers. Some say managers lack social skills. And some say the public does not wish business to take up social work, which is a lack of broad public support.',
    }),
    sl('check', 'Quick check: which argument against?', {
      b: 'A shareholder says every rupee spent on a free school is a rupee less for the owners. Name the argument.',
      chk: 'mc_against_profit',
      n: 'Think about whose money the speaker is worried about.',
    }),
    sl('diagram', 'Kinds of social responsibility', {
      v: vKinds,
      n: 'This chart shows four kinds. Economic responsibility is to produce goods and earn a fair profit. Legal responsibility is to follow the law. Ethical responsibility is to do what is right where no law compels. Discretionary responsibility is to give or act by choice, with no law or custom demanding it.',
    }),
    sl('concept', 'The kinds with imagined examples', {
      v: vKindsT,
      n: 'Tarang Appliances sells sound fans at fair prices, which is economic. Hariyali Paper Mills pays tax and keeps to smoke limits, which is legal. Amrit Dugdh will not sell a product it thinks unsafe, though no law bans it, which is ethical, including moral responsibility. Byteloom Software lends staff to a village school, which is discretionary, or voluntary.',
    }),
    sl('example', 'Worked example 2: classify the kind', {
      b: 'Four imagined acts. Ask whether each is needed, required, right or chosen.',
      bl: ['Step 1: Is it about production and profit? Economic.', 'Step 2: Is a law behind it? Legal.', 'Step 3: Is it right with no law behind it? Ethical.', 'Step 4: Is it a free gift to society? Discretionary.'],
      v: vClues2,
      n: 'A bakery earning a profit by selling fresh bread at fair prices is economic. A factory that files returns and meets waste rules is legal. A shop that recalls goods it fears are unsafe, with no rule asking it to, is ethical. A mill that pays for a health camp by its own choice is discretionary.',
    }),
    sl('check', 'Quick check: the kind of responsibility', {
      b: 'An imagined firm lends its staff, with pay, to teach computer skills at a village school. No law requires it. Which kind is this?',
      chk: 'mc_kind_disc',
      n: 'Ask whether the act is required by law or left wholly to the firm.',
    }),
    sl('concept', 'Factors behind the acceptance of social obligations', {
      v: vFactors,
      n: 'Seven factors moved firms to accept social obligations. The threat of public regulation. The pressure of the labour movement. The impact of consumer consciousness. The development of social standards. The development of business education. The relationship between social interest and business interest. And the development of a professional managerial class.',
    }),
    sl('concept', 'The law on corporate social responsibility, as of 2024', {
      v: vLaw,
      n: 'As of two thousand twenty four, section one hundred thirty five of the Companies Act two thousand thirteen covers a company with a net worth of five hundred crore rupees or more, or a turnover of one thousand crore rupees or more, or a net profit of five crore rupees or more. It must spend at least two per cent of its average net profits of the three preceding years. Limits can change by amendment.',
    }),
    sl('example', 'Worked example 3: the least CSR spend', {
      b: 'The imagined Prithvi Cements had net profits of Rs 30 crore, Rs 45 crore and Rs 60 crore in the three preceding years. Find its least spend, as of 2024.',
      bl: ['Step 1: Check that a limit is reached.', 'Step 2: Add the three profits and divide by three.', 'Step 3: Take two per cent of the average.'],
      v: vCsrEx,
      n: 'The latest net profit is above five crore rupees, so the company is covered. The three profits add up to one hundred thirty five crore. Divided by three, the average is forty five crore. Two per cent of forty five crore is zero point nine crore rupees, which is ninety lakh rupees.',
    }),
    sl('check', 'Quick check: the rule, as of 2024', {
      b: 'Fill in the blanks on the share of profit and the kind of profit.',
      chk: 'fb_csr',
      n: 'Recall the percentage, and recall whether it is taken on a single year or on an average.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up. Social responsibility is the obligation to act in line with the objectives and values of society, and it goes beyond legal duty. Eight arguments are put for it and four against, each as a view. There are four kinds. Seven factors led firms to accept it. And section one hundred thirty five sets a two per cent spend for covered companies, as of two thousand twenty four.',
    }),
    sl('exam-tips', 'Exam tips', {
      v: vTips1,
      bl: ['Give both sides, each as a view.', 'Add as of 2024 to the CSR rule.'],
      n: 'Some tips. Do not say that social responsibility and legal duty are the same. Present both the case for and the case against, using words such as some argue and others argue. Write as of two thousand twenty four next to the corporate social responsibility rule, and say that limits can change. And use made up firms in your examples.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Stakeholders, the Environment and Business Ethics',
  goals: [
    'Explain the responsibilities of a business towards owners, workers, consumers, the government and the community',
    'Describe pollution, its kinds and causes, and the need for pollution control',
    'Explain the role of business in protecting the environment',
    'Explain business ethics, its elements and its link with social responsibility',
  ],
  slides: [
    sl('title', 'Stakeholders, the Environment and Business Ethics', {
      b: 'Part 2: to whom a business is responsible, how it can protect the environment, and what ethics ask of it.',
      v: vRoute2,
      n: 'A dairy company has farmers, buyers, staff and owners, all with a stake in how it behaves. In this part we study what a business owes to each group, how it can control pollution, and what business ethics are, and we see how ethics and social responsibility are linked.',
    }),
    sl('diagram', 'Responsibility towards stakeholders', {
      v: vWeb,
      n: 'A business owes duties to four groups. To owners and shareholders, a fair return, safety of the investment and true information. To workers, fair wages, good working conditions and the right to form unions. To consumers, quality goods at fair prices, no adulteration, and handling of grievances. To the government and community, obeying laws, paying taxes honestly and protecting the environment.',
    }),
    sl('concept', 'Owners and workers', {
      v: vStakeA,
      n: 'Owners expect a fair return, the safety of their investment and true information about the firm. Workers expect fair wages, good working conditions and the right to form unions. Neglecting either group breaks a responsibility of the business, whether or not a law is also broken.',
    }),
    sl('concept', 'Consumers, the government and the community', {
      v: vStakeB,
      n: 'Consumers expect quality goods at fair prices, with no adulteration and no misleading advertisement, and they expect their complaints to be heard. The government expects obedience to laws and honest payment of taxes. The community expects the business to protect the environment and to help in its welfare.',
    }),
    sl('example', 'Worked example 1: which duty is neglected', {
      b: 'Four imagined cases. Find who is harmed, then name the duty.',
      bl: ['Step 1: Find who is harmed.', 'Step 2: Name the group.', 'Step 3: State the duty neglected.'],
      v: vClues3,
      n: 'A mill shows a loss as a profit in its report to shareholders. That fails the duty of true information to owners. An owner sacks a worker for joining a union. That fails the right of workers to form unions. A shop mixes sawdust into chilli powder, which is adulteration. A firm keeps two sets of books to cut its tax, which fails the duty of honest taxes.',
    }),
    sl('check', 'Quick check: match the duty and the group', {
      b: 'Match four duties of an imagined mill with the group to which each is owed.',
      chk: 'mt_stake',
      n: 'For each duty, ask who benefits when it is done and who suffers when it is not.',
    }),
    sl('concept', 'Pollution and its kinds', {
      v: vPoll,
      n: 'Pollution is the release of harmful or unwanted substances or energy into the surroundings, making them less safe or fit for life. There are four kinds. Air pollution from smoke, dust and gases. Water pollution from waste in rivers and lakes. Land pollution from harmful solid waste. And noise pollution from loud and unwanted sound.',
    }),
    sl('concept', 'Causes of pollution from industry', {
      v: vCauses,
      n: 'Smoke and gases from furnaces and boilers cause air pollution. Untreated effluent let into rivers causes water pollution. Waste dumped on open ground causes land pollution. Heavy machines cause noise. Out of date technology, no treatment of waste to save cost, and weak checks add to all kinds.',
    }),
    sl('concept', 'The need for pollution control', {
      v: vNeedP,
      n: 'There are five reasons to control pollution. Reduced health hazards. Reduced risk of liability, since a firm that does no harm faces fewer claims. Cost savings, from reuse of water and materials. Improved public image. And other social benefits, such as a cleaner life for the whole community.',
    }),
    sl('example', 'Worked example 2: the saving from recycling water', {
      b: 'The imagined Neel Dyes recycles part of its water. Find the saving and the years to repay the plant.',
      bl: ['Step 1: Find the litres saved each day.', 'Step 2: Find the rupees saved in a day and in a year.', 'Step 3: Divide the plant cost by the yearly saving.'],
      v: vNeelEx,
      n: 'Neel Dyes uses twenty thousand litres of water a day and recycles half, which saves ten thousand litres. At fifty rupees per thousand litres, that is five hundred rupees a day. Over three hundred days it is one lakh fifty thousand rupees. A plant that costs three lakh rupees is repaid in two years.',
    }),
    sl('check', 'Quick check: name the pollution', {
      b: 'An imagined tannery dumps chemical sludge on an empty plot and nothing will grow there. Which kind of pollution is this?',
      chk: 'mc_poll_land',
      n: 'Think about where the waste ends up.',
    }),
    sl('diagram', 'The role of business in pollution control', {
      v: vRole,
      n: 'This flow shows seven steps. Top management commitment comes first. Then commitment throughout the enterprise, and clear policies and programmes. Then compliance with laws, and participation in government programmes. Then periodic assessment. And finally the education of dealers and suppliers.',
    }),
    sl('concept', 'The seven steps in words', {
      v: vRoleAll,
      n: 'The board backs the cause with a policy and funds. Every department and worker takes part. The aims and steps are written down. The firm keeps within the legal limits on emissions and waste. It joins government programmes for a clean environment, reviews its progress at set times, and teaches its dealers and suppliers to handle waste safely.',
    }),
    sl('check', 'Quick check: which step is this?', {
      b: 'An imagined firm holds workshops for its dealers and suppliers on safe disposal of packing waste. Which step is this?',
      chk: 'mc_role_dealers',
      n: 'Ask whom the workshop is meant for.',
    }),
    sl('concept', 'What are business ethics?', {
      v: vEthDef,
      n: 'Business ethics are the socially determined moral principles that should govern business activities. Law is enforced by the state, while ethics are the standards of right conduct that society holds. A firm may be within the law and still be asked by society to act better.',
    }),
    sl('diagram', 'Elements of business ethics', {
      v: vEthics,
      n: 'This flow shows five elements. Top management commitment. Publication of a code of conduct. Establishment of compliance mechanisms. Involving employees at all levels. And measuring results. The lower row shows an imagined software firm, Byteloom, putting each element into practice.',
    }),
    sl('concept', 'The elements in an imagined firm', {
      v: vElemT,
      n: 'At Byteloom Software, the chief executive says the firm will turn down a contract rather than break its rules. A written code on gifts, client data and honest reporting is posted. An ethics committee and a private helpline hear breaches. Staff from interns to managers are trained. And the firm counts breaches reported and settled each year.',
    }),
    sl('example', 'Worked example 3: measuring results', {
      b: 'The imagined Vistara Logistics wishes to settle ninety per cent of breach reports. Find the gap.',
      bl: ['Step 1: Find the share settled so far.', 'Step 2: Find the number that the aim needs.', 'Step 3: Subtract.'],
      v: vVisEx,
      n: 'Vistara Logistics received forty breach reports and settled thirty four, which is eighty five per cent. An aim of ninety per cent means thirty six reports. So two more must be settled. Measuring results in this way shows a firm how far it has come and what is left to do.',
    }),
    sl('check', 'Quick check: put the steps in order', {
      b: 'Arrange the steps by which an imagined software firm builds an ethical workplace.',
      chk: 'od_ethics_steps',
      n: 'Begin with the stand of the leaders and end with the count of results.',
    }),
    sl('concept', 'Ethics and social responsibility', {
      v: vRel,
      n: 'Ethics are the moral principles that guide each decision, and they supply the moral base of social responsibility. Social responsibility puts those principles into action for society. A firm that is honest in its dealings is better placed to act responsibly towards the community, and the two support one another.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up. A business owes duties to owners, workers, consumers, and the government and community. Pollution is of four kinds, and there are five reasons to control it. Seven steps make up the role of business. And business ethics are moral principles set by society, with five elements, forming the base of social responsibility.',
    }),
    sl('exam-tips', 'Exam tips', {
      v: vTips2,
      bl: ['Name the duty owed to each group.', 'Law is enforced by the state; ethics are held by society.'],
      n: 'Some tips. State what is owed to each group, not just the names of the groups. For pollution, give a cause and a reason for control for each kind. Do not mix up law and ethics. And use made up firms in your examples, never real ones.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Social Responsibility of Business and Business Ethics: notes',
  sections: [
    {
      h: '1. Concept of social responsibility',
      t: 1,
      b: '**Social responsibility** is the obligation of business to take decisions and actions that are desirable in terms of the objectives and values of society.\n\n**Legal responsibility** is the duty to comply with the law. Social responsibility goes beyond it: a firm may obey every rule and still fall short of what society values.\n\n**Imagined example:** Rangrez Dyeworks sets up the wastewater unit that the rules demand (legal responsibility). If it also pays for a clean water tank for the villagers beside the river, it goes beyond the law.',
      terms: [['Social responsibility', 'The obligation of business to take decisions and actions that are desirable in terms of the objectives and values of society.'], ['Legal responsibility', 'The duty of a business to comply with the law.']],
      v: vDef,
      vs: [vBeyond],
    },
    {
      h: '2. The case for and against social responsibility',
      t: 1,
      b: '**Some argue for it, on eight grounds:**\n1. Justification for the existence and growth of business: it exists by the leave of society.\n2. Long-term interest of the firm: a good name helps it to earn for years.\n3. Avoidance of government regulation.\n4. Maintenance of society: business depends on a sound society.\n5. Availability of resources with business: money, skills and equipment.\n6. Converting problems into opportunities.\n7. A better environment for doing business.\n8. Holding business responsible for the social problems it has caused.\n\n**Others argue against it, on four grounds:**\n1. Violation of the profit-maximisation objective.\n2. Burden on consumers through higher prices.\n3. Lack of social skills among managers.\n4. Lack of broad public support.\n\nEach point is a view held by some people. A balanced answer sets out both sides.',
      terms: [['Profit maximisation', 'The objective of earning the highest possible profit for the owners.']],
      v: vCase,
      vs: [vFor1, vFor2, vAgainst, vClues1],
    },
    {
      h: '3. Kinds of social responsibility',
      t: 1,
      b: '1. **Economic responsibility:** produce goods and services that society needs and earn a profit from them.\n2. **Legal responsibility:** obey the laws of the land.\n3. **Ethical responsibility,** including moral responsibility: do what is right and fair where no law compels it.\n4. **Discretionary (voluntary) responsibility:** act or give by choice for society, with no law or custom demanding it.\n\n**Imagined examples:** Tarang Appliances sells sound fans at fair prices (economic); Hariyali Paper Mills pays tax and keeps to smoke limits (legal); Amrit Dugdh will not sell a product it thinks unsafe (ethical); Byteloom Software lends staff to teach at a village school (discretionary).',
      terms: [['Discretionary responsibility', 'A voluntary act for society that a firm takes up by choice, where no law or custom requires it.']],
      v: vKinds,
      vs: [vKindsT, vClues2],
    },
    {
      h: '4. Factors behind social obligations; the law on CSR',
      t: 1,
      b: '**Factors that influenced the acceptance of social obligations:** the threat of public regulation; the pressure of the labour movement; the impact of consumer consciousness; the development of social standards; the development of business education; the relationship between social interest and business interest; and the development of a professional managerial class.\n\n**Corporate social responsibility (CSR) under section 135 of the Companies Act 2013, as of 2024:** a company with a net worth of Rs 500 crore or more, or a turnover of Rs 1,000 crore or more, or a net profit of Rs 5 crore or more must spend at least 2 per cent of the average of its net profits of the three preceding years on CSR activities.\n\n**Dated note, as of 2024:** limits and rules can change by amendment, so check the present position before relying on these figures.\n\n**Worked check:** net profits of Rs 30, 45 and 60 crore have an average of Rs 45 crore, and 2 per cent of it is Rs 0.9 crore (Rs 90 lakh).',
      terms: [['Corporate social responsibility', 'Spending and action by a company for the benefit of society, which a covered company must undertake at a set minimum under section 135 of the Companies Act 2013, as of 2024.']],
      v: vFactors,
      vs: [vLaw, vCsrEx],
    },
    {
      h: '5. Responsibility towards stakeholders',
      t: 2,
      b: '**Owners and shareholders:** a fair return, safety of the investment, and true information about the firm.\n**Workers:** fair wages, good working conditions, and the right to form unions.\n**Consumers:** quality goods at fair prices, no adulteration or misleading advertising, and the handling of grievances.\n**Government and community:** obeying laws, paying taxes honestly, protecting the environment, and helping the welfare of the community.\n\nA business may meet one duty and neglect another; each duty is judged on its own.',
      terms: [['Stakeholder', 'A person or group with an interest in a business and affected by what it does, such as owners, workers, consumers, the government and the community.'], ['Adulteration', 'Mixing a cheap or harmful material into a product so that its quality falls.']],
      v: vWeb,
      vs: [vStakeA, vStakeB, vClues3],
    },
    {
      h: '6. Business and environmental protection',
      t: 2,
      b: '**Pollution** is the release of harmful or unwanted substances or energy into the surroundings, making them less safe or fit for life. Its **kinds** are air, water, land and noise pollution.\n\n**Causes in industry:** smoke and gases; untreated effluent; dumped solid and chemical waste; loud machines; out-of-date technology and no waste treatment to save cost; weak checks and low concern.\n\n**Need for pollution control:** reduced health hazards; reduced risk of liability; cost savings; improved public image; other social benefits.\n\n**Role of business:** top management commitment; commitment throughout the enterprise; clear policies and programmes; compliance with laws; participation in government programmes; periodic assessment; and educating dealers and suppliers.\n\n**Worked check:** recycling 10,000 litres a day at Rs 50 per 1,000 litres saves Rs 500 a day, or Rs 1,50,000 over 300 days.',
      terms: [['Pollution', 'The release of harmful or unwanted substances or energy into the surroundings, making them less safe or fit for life.'], ['Effluent', 'Liquid waste that a factory lets out into drains or water.']],
      v: vRole,
      vs: [vPoll, vCauses, vNeedP, vRoleAll, vNeelEx],
    },
    {
      h: '7. Business ethics',
      t: 3,
      b: '**Business ethics** are the socially determined moral principles that should govern business activities. Law is enforced by the state; ethics are the standards of right conduct that society holds.\n\n**Elements:** top management commitment; publication of a code of conduct; establishment of compliance mechanisms; involving employees at all levels; and measuring results.\n\n**Link with social responsibility:** ethics supply the moral base on which social responsibility rests, and social responsibility puts those principles into action for society. Ethical responsibility is also one of the four kinds of social responsibility.\n\n**Worked check:** 34 of 40 breach reports settled is 85 per cent; an aim of 90 per cent needs 36, so 2 more.',
      terms: [['Business ethics', 'The socially determined moral principles that should govern business activities.'], ['Code of conduct', 'A written statement of the behaviour that a firm expects of its people.']],
      v: vEthics,
      vs: [vEthDef, vElemT, vVisEx, vRel],
    },
  ],
  tips: '**Common mistakes**\n- Writing that social responsibility is the same as legal duty; it goes beyond the law.\n- Giving only one side of the case; present both, each as the view of some people.\n- Quoting the CSR rule without the words as of 2024, or without saying that limits can change.\n- Listing stakeholders without saying what is owed to each.\n- Naming the kinds of pollution without a cause or a reason for control.\n- Mixing ethics with law; law is enforced by the state, ethics are held by society.\n- Using real firms as examples; use made-up ones.\n\n**How marks are usually awarded**\n- 1 mark: a correct option or a quoted line from the case.\n- 2 and 3 marks: one point per argument, kind, factor, duty or element, with a short explanation.\n- 5 marks: five points, each with an explanation, in a numbered list.\n- Case questions: quote the line, name the concept, explain in a sentence.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Social responsibility**', 'The obligation of business to take decisions and actions that are desirable in terms of the objectives and values of society.', 'definition', 1],
  ['**Legal responsibility**', 'The duty of a business to comply with the law; social responsibility goes beyond it.', 'definition', 1],
  ['Eight arguments for social responsibility', 'Justification for existence; long-term interest; avoiding regulation; maintenance of society; resources with business; problems into opportunities; a better business environment; responsibility for harm caused.', 'fact', 1],
  ['Four arguments against social responsibility', 'Violation of profit maximisation; burden on consumers; lack of social skills; lack of broad public support.', 'fact', 1],
  ['Long-term interest of the firm', 'A good name and loyal partners help a firm to earn for many years.', 'concept', 1],
  ['Avoidance of government regulation', 'Responsible conduct leaves less reason for the government to frame strict rules.', 'concept', 1],
  ['Violation of profit maximisation', 'Some argue that social spending cuts the profit that belongs to the owners.', 'concept', 1],
  ['Lack of social skills', 'Some argue that managers are trained for business, not for social work.', 'concept', 1],
  ['Four kinds of social responsibility', 'Economic, legal, ethical (including moral) and discretionary (voluntary).', 'fact', 1],
  ['**Discretionary responsibility**', 'A voluntary act for society, taken up by choice where no law or custom requires it.', 'definition', 1],
  ['Ethical responsibility', 'Doing what is right and fair where no law compels it.', 'concept', 1],
  ['Seven factors behind social obligations', 'Threat of regulation; labour movement; consumer consciousness; social standards; business education; social and business interest; professional managers.', 'fact', 1],
  ['CSR rule, as of 2024', 'Section 135, Companies Act 2013: a covered company spends at least 2 per cent of its average net profits of the three preceding years.', 'exam-tip', 1],
  ['Who is covered by the CSR rule, as of 2024?', 'A company with a net worth of Rs 500 crore or more, or a turnover of Rs 1,000 crore or more, or a net profit of Rs 5 crore or more.', 'fact', 1],
  ['Responsibility towards owners', 'A fair return; safety of the investment; true information about the firm.', 'fact', 2],
  ['Responsibility towards workers', 'Fair wages; good working conditions; the right to form unions.', 'fact', 2],
  ['Responsibility towards consumers', 'Quality goods at fair prices; no adulteration or misleading advertising; handling of grievances.', 'fact', 2],
  ['Responsibility towards government and community', 'Obey laws; pay taxes honestly; protect the environment; help community welfare.', 'fact', 2],
  ['**Pollution**', 'The release of harmful or unwanted substances or energy into the surroundings, making them less safe or fit for life.', 'definition', 2],
  ['Four kinds of pollution', 'Air, water, land and noise.', 'fact', 2],
  ['**Effluent**', 'Liquid waste that a factory lets out into drains or water.', 'definition', 2],
  ['Reasons for pollution control', 'Reduced health hazards; reduced risk of liability; cost savings; improved public image; other social benefits.', 'fact', 2],
  ['Role of business in pollution control', 'Top management commitment; commitment throughout the firm; clear policies and programmes; compliance with laws; government programmes; periodic assessment; educating dealers and suppliers.', 'fact', 2],
  ['First step in controlling pollution', 'Top management commitment: policy and funds come from the top.', 'concept', 2],
  ['**Business ethics**', 'The socially determined moral principles that should govern business activities.', 'definition', 3],
  ['Five elements of business ethics', 'Top management commitment; publication of a code of conduct; compliance mechanisms; involving employees at all levels; measuring results.', 'fact', 3],
  ['**Code of conduct**', 'A written statement of the behaviour that a firm expects of its people.', 'definition', 3],
  ['Compliance mechanisms', 'Means such as an ethics committee and a helpline that see that the code is followed.', 'concept', 3],
  ['Law and ethics', 'Law is enforced by the state; ethics are the standards of right conduct that society holds.', 'concept', 3],
  ['Ethics and social responsibility', 'Ethics supply the moral base of social responsibility; social responsibility puts the principles into action.', 'concept', 3],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short): Social Responsibility of Business and Business Ethics',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['mc_case_resources', 'mc_poll_water', 'mc_elem_code', 'ar_ext'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer the 2-mark questions in about 30 to 50 words and the 3-mark question in about 50 to 80 words.', items: ['s2_sr_def', 's2_consumers', 's3_for'] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80 to 120 words.', items: [{ attempt: 1, keys: ['l_kinds', 'l_ethics'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks)', instr: 'Read the case and answer all parts. Part (c) has an internal choice.', items: ['cb_byteloom'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long): Social Responsibility of Business and Business Ethics',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['mc_sr_def', 'mc_kind_ethical', 'mc_case_regulation', 'mc_against_price', 'mc_csr_2pct', 'mc_owner_info', 'mc_role_mgmt', 'mc_elem_measure', 'ar_pollution_cost', 'ar_ethics_gov'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and 3-mark questions in about 50 to 80 words. Questions 13 and 15 have an internal choice.', items: ['s2_against_app', 's2_need_cost', { attempt: 1, keys: ['s2_factor', 's2_code'] }, 's3_csr', { attempt: 1, keys: ['s3_need_pollution', 's3_elements'] }] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80 to 120 words each.', items: ['l_stake', { attempt: 1, keys: ['l_balance', 'l_pollrole'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks each)', instr: 'Read each case and answer all parts. Part (c) of each has an internal choice.', items: ['cb_rangrez', 'cb_csr'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 to t03 of cbse-11-business-studies-ch06 only (concept and case for social responsibility; responsibility towards stakeholders and environment protection; business ethics)',
    originality: 'every firm, factory, river, town, dairy, cooperative and person is imagined and written by SOYL; no real company is named and no claim is made about any real firm; no NCERT text, example or exercise and no board or sample-paper item reused (D-036)',
    data: 'figures computed in the build: corporate social responsibility spend from average net profit, coverage test against the three limits, water recycled and saved, payback years, training and settlement shares',
    facts: 'dated as of 2024: section 135 of the Companies Act 2013 (limits of net worth, turnover and net profit; two per cent of the average net profit of the three preceding years)',
    gate: 'schema, pipeline lint, deterministic verify, word limits, narration and answer-leak checks run clean in this build',
  },
});
