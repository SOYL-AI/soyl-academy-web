// CBSE 11 Business Studies, ch06 Social Responsibility of Business and Business Ethics: question bank. Every firm, factory,
// river, town, dairy and person is imagined and written by SOYL; no NCERT example, exercise or board/sample-paper item is reused (D-036).
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child } from '../../cbse-11-business-studies-ch01/src/lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];
export const fmt = (n) => n.toLocaleString('en-IN');

// ---- computed figures used in stems, solutions and slides -------------------------------------------------
// CSR under section 135 of the Companies Act 2013, as of 2024 (amounts in Rs crore).
export const LAW = { pct: 2, netWorth: 500, turnover: 1000, profit: 5 };
export const covered = (nw, to, np) => nw >= LAW.netWorth || to >= LAW.turnover || np >= LAW.profit;
// Surya Steel Works (imagined).
export const SURYA = { nw: 380, to: 1450, p: [60, 75, 90] };
SURYA.avg = SURYA.p.reduce((a, b) => a + b, 0) / SURYA.p.length; // 75
SURYA.csr = (SURYA.avg * LAW.pct) / 100; // 1.5 crore
SURYA.lakh = SURYA.csr * 100; // 150 lakh
// Dhara Foods (imagined): below every limit.
export const DHARA = { nw: 150, to: 600, np: 4 };
// Prithvi Cements (imagined): second computation.
export const PRITHVI = { p: [30, 45, 60] };
PRITHVI.avg = PRITHVI.p.reduce((a, b) => a + b, 0) / PRITHVI.p.length; // 45
PRITHVI.csr = (PRITHVI.avg * LAW.pct) / 100; // 0.9 crore
PRITHVI.lakh = PRITHVI.csr * 100; // 90 lakh
// Rangrez Dyeworks water recycling (imagined).
export const DYE = { litres: 50000, pct: 60, rate: 40, days: 300, plant: 900000 };
DYE.saved = (DYE.litres * DYE.pct) / 100; // 30000 litres a day
DYE.day = (DYE.saved / 1000) * DYE.rate; // Rs 1200 a day
DYE.year = DYE.day * DYE.days; // Rs 360000
DYE.payback = DYE.plant / DYE.year; // 2.5 years
// Byteloom Software ethics training (imagined).
export const BYTE = { staff: 240, trained: 180, target: 90 };
BYTE.pct = (BYTE.trained * 100) / BYTE.staff; // 75
BYTE.need = (BYTE.staff * BYTE.target) / 100; // 216
BYTE.more = BYTE.need - BYTE.trained; // 36
// Amrit Dugdh milk price for farmers (imagined).
export const DAIRY = { litres: 4000, old: 32, now: 38, days: 30 };
DAIRY.gainDay = DAIRY.litres * (DAIRY.now - DAIRY.old); // 24000
DAIRY.gainMonth = DAIRY.gainDay * DAIRY.days; // 720000
if (!covered(SURYA.nw, SURYA.to, 0) || covered(DHARA.nw, DHARA.to, DHARA.np) || !covered(0, 0, 5) || covered(0, 0, 4)) throw new Error('coverage check failed');
if (SURYA.avg !== 75 || SURYA.csr !== 1.5 || SURYA.lakh !== 150 || PRITHVI.avg !== 45 || PRITHVI.lakh !== 90) throw new Error('csr figure check failed');
if (DYE.saved !== 30000 || DYE.day !== 1200 || DYE.year !== 360000 || DYE.payback !== 2.5) throw new Error('water figure check failed');
if (BYTE.pct !== 75 || BYTE.need !== 216 || BYTE.more !== 36 || DAIRY.gainDay !== 24000 || DAIRY.gainMonth !== 720000) throw new Error('figure check failed');

// ================================================================ t01 Concept and case for social responsibility
Q('mc_sr_def', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: `Which statement best describes the social responsibility of business?`,
  opts: [
    `The obligation of business to take decisions and actions that are desirable in terms of the objectives and values of society`,
    `The duty of a firm to maximise the wealth of its owners above everything else`,
    `The duty to obey the laws and to pay taxes, and nothing more`,
    `A sum that every firm must hand to the government each year`,
  ],
  sol: `Social responsibility looks to the objectives and values of society, so it reaches beyond profit and beyond bare legal compliance. Owner wealth alone is the profit view, obeying laws only is legal responsibility, and a fixed sum to the government is a tax.`,
}));
Q('mc_law_only', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Rangrez Dyeworks, an imagined dye factory in the imagined town of Rangpur, set up exactly the wastewater unit that the pollution rules demand and did nothing more. Its conduct meets its`,
  opts: [`legal responsibility, but not any voluntary one`, `discretionary responsibility in full`, `ethical and discretionary responsibility together`, `no responsibility at all`],
  sol: `Doing exactly what the law demands satisfies legal responsibility. Social responsibility goes beyond that, so the factory has not yet met any voluntary responsibility, and it cannot be said to have met none, since the law was followed.`,
}));
Q('mc_case_resources', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Surya Steel Works, an imagined company, has engineers, trucks and cranes. Some people say it should lend them to rebuild a bridge washed away in a flood, because few other bodies in the district have such resources. Which argument for social responsibility is this?`,
  opts: [`Availability of resources with business`, `Avoidance of government regulation`, `Violation of the profit-maximisation objective`, `Lack of social skills`],
  sol: `The point is that business holds the means that society needs, so it can help. Avoiding regulation is a different argument for, and the last two options are arguments against social responsibility.`,
}));
Q('mc_case_longterm', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Amrit Dugdh, an imagined dairy company, pays the farmers of the imagined village of Gokulpur a steady price. The farmers stay loyal and supply good milk for many years. Which argument for social responsibility does this support?`,
  opts: [`Long-term interest of the firm`, `Lack of broad public support`, `Burden on consumers`, `Holding business responsible for problems it has caused`],
  sol: `Fair dealing built loyalty and a steady supply over the years, which serves the firm's own long-term interest. The second and third options are arguments against, and the fourth concerns harm that a firm has done.`,
}));
Q('mc_case_regulation', mcq({
  t: 1, d: 3, c: 'application',
  stem: `The imagined association of leather makers of Charmpur adopted voluntary rules on waste disposal, so that the government need not frame stricter rules for them. Which argument for social responsibility does this reflect?`,
  opts: [`Avoidance of government regulation`, `A better environment for doing business`, `Maintenance of society`, `Converting problems into opportunities`],
  sol: `Setting its own rules to keep the government from making tougher ones is avoidance of government regulation. The other options point to community conditions, the upkeep of society and fresh business openings, none of which the association mentions.`,
}));
Q('mc_against_profit', mcq({
  t: 1, d: 3, c: 'application',
  stem: `A shareholder of the imagined Dhara Foods says that every rupee spent on a free school for villagers is a rupee less for the owners. Which argument against social responsibility is this?`,
  opts: [`Violation of the profit-maximisation objective`, `Burden on consumers`, `Lack of social skills`, `Avoidance of government regulation`],
  sol: `The speaker sees social spending as cutting the profit meant for owners, which is the profit-maximisation argument. The other arguments against speak of prices and of skills, and the last option is an argument for.`,
}));
Q('mc_against_price', mcq({
  t: 1, d: 3, c: 'application',
  stem: `A critic says that the cost of a new waste unit at the imagined Hariyali Paper Mills will be added to the price of its notebooks, and so the buyers will pay for it. Which argument against social responsibility is this?`,
  opts: [`Burden on consumers through higher prices`, `Lack of broad public support`, `Lack of social skills`, `Violation of the profit-maximisation objective`],
  sol: `The critic fears that the cost will be passed on in higher prices, which is the burden on consumers. The others speak of public backing, of managers' skills and of owner profit.`,
}));
Q('mc_against_skills', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Some argue that the managers of the imagined Tarang Appliances are trained to make and sell fans, not to run health camps or village schools, so they may run such work poorly. This is the argument of`,
  opts: [`lack of social skills`, `violation of profit maximisation`, `burden on consumers`, `justification for the existence of business`],
  sol: `The point is that business managers may not have the skills that social work needs. The second and third options speak of profit and price, and the last is an argument in favour.`,
}));
Q('mc_kind_economic', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Tarang Appliances, an imagined firm, makes sound ceiling fans, sells them at fair prices and earns a profit from doing so. Which kind of social responsibility is this?`,
  opts: [`Economic responsibility`, `Legal responsibility`, `Ethical responsibility`, `Discretionary responsibility`],
  sol: `Producing goods that society needs and earning a fair profit is the economic responsibility. Legal responsibility is about following laws, ethical about doing what is right, and discretionary about voluntary acts.`,
}));
Q('mc_kind_legal', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Hariyali Paper Mills, an imagined firm, files its returns on time, pays its taxes and keeps to the limits on factory smoke. Which kind of social responsibility does this show?`,
  opts: [`Legal responsibility`, `Discretionary responsibility`, `Economic responsibility`, `Ethical responsibility`],
  sol: `Keeping to the law of the land is legal responsibility. Discretionary acts are voluntary, economic responsibility concerns production and profit, and ethical responsibility concerns doing right where the law is silent.`,
}));
Q('mc_kind_ethical', mcq({
  t: 1, d: 4, c: 'application',
  stem: `No law bans a certain cheap sweetener, but the imagined Amrit Dugdh will not use it in its sweets because it believes that the sweetener could harm children. Which kind of social responsibility is this?`,
  opts: [`Ethical responsibility`, `Legal responsibility`, `Economic responsibility`, `Discretionary responsibility`],
  sol: `The firm avoids something it holds to be wrong although no law forbids it, which is ethical responsibility, including moral responsibility. A legal duty would follow a rule, an economic one concerns trade, and a discretionary act is a free giving to society, not a refusal to do harm.`,
}));
Q('mc_kind_disc', mcq({
  t: 1, d: 3, c: 'application',
  stem: `Byteloom Software, an imagined firm, lets its staff take paid days to teach computer skills at a village school. No law or custom requires this. Which kind of social responsibility is this?`,
  opts: [`Discretionary responsibility`, `Legal responsibility`, `Economic responsibility`, `A breach of ethics`],
  sol: `An act of giving that the firm chooses freely is discretionary, or voluntary, responsibility. Legal responsibility would be required by law, and economic responsibility concerns production and profit. Nothing in the scene suggests a breach of ethics.`,
}));
Q('mc_factor_labour', mcq({
  t: 1, d: 3, c: 'application',
  stem: `In the imagined town of Lohanagar, workers of several mills formed unions and pressed their employers for safe machines and fair hours, and the mills began to treat workers better. Which factor behind the acceptance of social obligations is this?`,
  opts: [`Pressure of the labour movement`, `Threat of public regulation`, `Development of business education`, `Impact of consumer consciousness`],
  sol: `Workers organising and pressing for better conditions is the pressure of the labour movement. The scene mentions no new law, no school of management and no action by buyers.`,
}));
Q('mc_csr_2pct', mcq({
  t: 1, d: 4, c: 'application',
  stem: `Surya Steel Works, an imagined company covered by section 135 of the Companies Act 2013, made net profits of Rs ${SURYA.p[0]} crore, Rs ${SURYA.p[1]} crore and Rs ${SURYA.p[2]} crore in the three preceding years. As of 2024, the least it must spend on corporate social responsibility in the year is`,
  opts: [`Rs ${SURYA.csr} crore`, `Rs ${SURYA.avg / 100} crore`, `Rs ${SURYA.csr * 2} crore`, `Rs ${SURYA.avg} crore`],
  sol: `The average of the three years is Rs ${SURYA.avg} crore, and ${LAW.pct} per cent of it is Rs ${SURYA.csr} crore. Rs ${SURYA.avg / 100} crore is one per cent of the average, Rs ${SURYA.csr * 2} crore is ${LAW.pct * 2} per cent, and Rs ${SURYA.avg} crore is the average itself.`,
}));
Q('mc_csr_cover', mcq({
  t: 1, d: 4, c: 'analysis',
  stem: `As of 2024, Dhara Foods, an imagined company, has a net worth of Rs ${DHARA.nw} crore, a turnover of Rs ${DHARA.to} crore and a net profit of Rs ${DHARA.np} crore in the preceding year. Is it bound by the corporate social responsibility spending rule of section 135 of the Companies Act 2013?`,
  opts: [
    `No, because it is below all three limits`,
    `Yes, because its turnover is above Rs ${LAW.netWorth} crore`,
    `Yes, because every company must spend on corporate social responsibility`,
    `Yes, because it earns some profit`,
  ],
  sol: `The limits are a net worth of Rs ${LAW.netWorth} crore, a turnover of Rs ${fmt(LAW.turnover)} crore and a net profit of Rs ${LAW.profit} crore; the firm reaches none of them. The figure Rs ${LAW.netWorth} crore applies to net worth, not to turnover, and the duty is not on every company or on every profitable one.`,
}));

// ================================================================ t02 Stakeholders and environment
Q('mc_owner_info', mcq({
  t: 2, d: 3, c: 'application',
  stem: `The managers of the imagined Hariyali Paper Mills showed a loss in the year as a profit in the report sent to shareholders. Which responsibility towards owners did they fail?`,
  opts: [`Giving true information about the firm`, `Paying a fair wage`, `Handling consumer grievances`, `Obeying the labour laws`],
  sol: `Reporting a loss as a profit misleads the owners, so it breaks the duty of true information. Wages and consumer grievances concern other groups, and the scene does not mention any labour law.`,
}));
Q('mc_worker_union', mcq({
  t: 2, d: 3, c: 'application',
  stem: `The owner of the imagined Lohanagar Cycle Works sacks any worker who talks of forming a union. Which responsibility towards workers does he neglect?`,
  opts: [`Respecting the right to form unions`, `Giving true information to shareholders`, `Paying taxes honestly`, `Providing goods of good quality`],
  sol: `Workers may form unions to speak for themselves, and punishing them for it violates that right. The other options concern owners, the government and consumers.`,
}));
Q('mc_consumer_adult', mcq({
  t: 2, d: 3, c: 'application',
  stem: `Nirmal Masala, an imagined spice seller, is found mixing coloured sawdust into chilli powder. Which responsibility towards consumers is broken?`,
  opts: [`No adulteration of goods`, `The right of workers to unionise`, `A fair return to owners`, `Honest payment of taxes`],
  sol: `Mixing a cheap foreign material into a product is adulteration, which a business must avoid. The other options concern workers, owners and the government.`,
}));
Q('mc_gov_tax', mcq({
  t: 2, d: 3, c: 'application',
  stem: `The imagined Kanak Jewellers keeps two sets of account books so that it can show a lower profit and pay a smaller tax. Which responsibility towards the government does it fail?`,
  opts: [`Paying taxes honestly`, `Handling consumer grievances`, `Giving fair wages to workers`, `Educating dealers`],
  sol: `Hiding profit to cut tax goes against honest payment of taxes, a duty to the government. The other options concern consumers, workers and dealers.`,
}));
Q('mc_poll_water', mcq({
  t: 2, d: 3, c: 'application',
  stem: `The imagined Rangrez Dyeworks lets untreated coloured water run into the imagined river Nirmala, and fish in the river die. Which kind of pollution is this?`,
  opts: [`Water pollution`, `Air pollution`, `Land pollution`, `Noise pollution`],
  sol: `Untreated waste released into a river harms the water, so it is water pollution. Air pollution concerns smoke or gases, land pollution concerns waste left on the ground, and noise pollution concerns loud sound.`,
}));
Q('mc_poll_land', mcq({
  t: 2, d: 3, c: 'application',
  stem: `The imagined Charmpur Tannery dumps heaps of chemical sludge on an empty plot behind its factory, and nothing will grow there. Which kind of pollution is this?`,
  opts: [`Land pollution`, `Water pollution`, `Noise pollution`, `Air pollution`],
  sol: `Harmful solid waste left on the ground that spoils the soil is land pollution. The scene says nothing about a river, a sound or a gas.`,
}));
Q('mc_poll_noise', mcq({
  t: 2, d: 2, c: 'application',
  stem: `Residents beside the imagined Lohanagar Press Shop cannot sleep because the heavy machines run loudly through the night. Which kind of pollution does this show?`,
  opts: [`Noise pollution`, `Land pollution`, `Water pollution`, `Air pollution`],
  sol: `Loud, unwanted sound from machines is noise pollution. The other kinds concern the ground, water and air.`,
}));
Q('mc_need_cost', mcq({
  t: 2, d: 3, c: 'application',
  stem: `After Rangrez Dyeworks recycled most of its water, its monthly water bill fell sharply. Which reason for pollution control does this show?`,
  opts: [`Cost savings`, `Improved public image`, `Reduced risk of liability`, `Reduced health hazards`],
  sol: `A smaller bill is a saving in cost. Image, liability and health are other reasons for controlling pollution, but the scene mentions none of them.`,
}));
Q('mc_role_mgmt', mcq({
  t: 2, d: 3, c: 'application',
  stem: `The board of the imagined Hariyali Paper Mills approves a written environment policy, sets aside a budget for it and the chief executive speaks about it at every meeting. Which step in controlling pollution is this?`,
  opts: [`Top management commitment`, `Educating dealers and suppliers`, `Periodic assessment`, `Participation in government programmes`],
  sol: `A board and chief executive backing the cause with policy and money show commitment from the top. The other options concern outside parties, review and public schemes.`,
}));
Q('mc_role_dealers', mcq({
  t: 2, d: 3, c: 'application',
  stem: `The imagined Tarang Appliances holds workshops for its dealers and suppliers on how to dispose of packing waste safely. Which step in controlling pollution is this?`,
  opts: [`Educating dealers and suppliers`, `Compliance with laws`, `Top management commitment`, `Periodic assessment`],
  sol: `Teaching those who trade with the firm to handle waste properly is educating dealers and suppliers. The other options concern law, commitment from the top, and review.`,
}));

// ================================================================ t03 Business ethics
Q('mc_ethics_def', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: `Which statement best describes business ethics?`,
  opts: [
    `The socially determined moral principles that should govern business activities`,
    `The rules of the government on taxes and licences`,
    `The profit that a firm earns in a year`,
    `The private beliefs of each owner, which society cannot judge`,
  ],
  sol: `Ethics are moral principles set by society to guide conduct in business. Rules on taxes and licences are law, profit is a result and not a principle, and ethics are judged by society, not only by the owner.`,
}));
Q('mc_elem_code', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Byteloom Software, an imagined firm, puts a written code on its website that says how its people must treat clients, colleagues and data. Which element of business ethics is this?`,
  opts: [`Publication of a code of conduct`, `Measuring results`, `Establishing compliance mechanisms`, `Involving employees at all levels`],
  sol: `A written statement of conduct made public is the publication of a code of conduct. Measuring results, compliance mechanisms and involving employees are the other elements, and the scene shows none of them.`,
}));
Q('mc_elem_compliance', mcq({
  t: 3, d: 3, c: 'application',
  stem: `Byteloom Software sets up an ethics committee and a private helpline on which an employee may report a breach without fear. This is the element of`,
  opts: [`establishing compliance mechanisms`, `publishing a code of conduct`, `top management commitment`, `measuring results`],
  sol: `A committee and a helpline are the means by which the code is enforced, so they are compliance mechanisms. The code itself is only the statement of conduct.`,
}));
Q('mc_elem_measure', mcq({
  t: 3, d: 3, c: 'application',
  stem: `At the end of each year, Byteloom Software counts the breaches reported, the cases settled and the staff who completed ethics training, and compares them with last year. Which element of business ethics is this?`,
  opts: [`Measuring results`, `Top management commitment`, `Publication of a code of conduct`, `Involving employees at all levels`],
  sol: `Counting and comparing outcomes year on year is measuring results. The other elements concern the stand of the leaders, the written code and the part played by staff.`,
}));
Q('mc_elem_involve', mcq({
  t: 3, d: 4, c: 'application',
  stem: `The imagined Nirmal Masala asks its packers, drivers and clerks, along with its managers, to help write its rules of conduct and to attend sessions on them. Which element of business ethics is this?`,
  opts: [`Involving employees at all levels`, `Top management commitment`, `Measuring results`, `Establishing compliance mechanisms`],
  sol: `Asking staff at every level to take part is involving employees at all levels. The scene does not describe the leaders' stand, a count of outcomes, or a committee.`,
}));
Q('mc_ethics_sr', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: `Which statement best relates business ethics to social responsibility?`,
  opts: [
    `Ethics supply the moral principles on which a firm's social responsibility rests`,
    `Ethics matter only to firms that are too small to have any social responsibility`,
    `Social responsibility is a kind of law, while ethics have no link to society`,
    `The two are opposed, so a firm must choose one`,
  ],
  sol: `Moral principles guide what a firm sees as right towards society, so ethics form the base of its social responsibility. Size has no bearing, social responsibility is wider than law, and the two support one another.`,
}));

// ---- assertion-reason
Q('ar_ext', ar({
  t: 1, d: 4, c: 'analysis', verdict: 'both-true-explains',
  a: `A firm that obeys every law has not necessarily met its social responsibility.`,
  r: `Social responsibility asks for decisions and actions that fit the values of society, and that can go beyond what the law demands.`,
  sol: `Both are true. Because social responsibility reaches beyond the law, legal compliance alone may fall short of it, so R explains A.`,
}));
Q('ar_ltinterest', ar({
  t: 1, d: 4, c: 'analysis', verdict: 'both-true-explains',
  a: `Some argue that the imagined Amrit Dugdh gains in the long run by dealing fairly with its farmers.`,
  r: `Loyal suppliers and a good name in the community help a firm to keep earning over the years.`,
  sol: `Both are true. Lasting loyalty and goodwill are the way in which fair dealing pays the firm, so R explains A.`,
}));
Q('ar_csr_scope', ar({
  t: 1, d: 4, c: 'analysis', verdict: 'both-true-not-explains',
  a: `As of 2024, a company covered by section 135 of the Companies Act 2013 must spend a set share of its average net profit on corporate social responsibility.`,
  r: `Business ethics are the socially determined moral principles that should govern business activities.`,
  sol: `Both are true, but the meaning of business ethics does not explain why a covered company must spend a share of its profit, so R does not explain A.`,
}));
Q('ar_csr_base', ar({
  t: 1, d: 5, c: 'analysis', verdict: 'A-true-R-false',
  a: `As of 2024, the minimum yearly corporate social responsibility spend of a covered company is worked out on the average net profit of the three preceding years.`,
  r: `The minimum is worked out on the turnover of the company in the year just ended.`,
  sol: `A is true: the base is the average net profit of the preceding three years. R is false, because turnover is only one of the tests of coverage and is not the base of the amount.`,
}));
Q('ar_ethics_gov', ar({
  t: 3, d: 4, c: 'analysis', verdict: 'A-false-R-true',
  a: `Business ethics are rules that only the government can write and enforce.`,
  r: `Business ethics are moral principles that society works out to guide business conduct.`,
  sol: `A is false: ethics are set by society, and a firm can follow them even where there is no law. R is true, since ethics are socially determined moral principles.`,
}));
Q('ar_pollution_cost', ar({
  t: 2, d: 4, c: 'analysis', verdict: 'both-true-explains',
  a: `Controlling pollution can lower the costs of a factory.`,
  r: `A factory that recycles water or recovers waste materials buys less of them afresh.`,
  sol: `Both are true. Reusing water or materials cuts what the factory must buy, which is how pollution control saves money, so R explains A.`,
}));

// ---- true-false, fill in the blanks, match, ordering
Q('tf_law', tf({
  t: 1, d: 3, c: 'understanding', ans: false,
  stem: `Social responsibility of business means the same thing as obeying the law.`,
  sol: `Legal responsibility is only one part of it. Social responsibility also asks a firm to act in line with the values of society where the law is silent.`,
}));
Q('tf_disc', tf({
  t: 1, d: 2, c: 'recall', ans: true,
  stem: `Discretionary responsibility is voluntary: a firm takes it up by choice and no law requires it.`,
  sol: `Discretionary or voluntary acts are done by choice, which marks them off from legal and economic duties.`,
}));
Q('tf_noise', tf({
  t: 2, d: 2, c: 'recall', ans: true,
  stem: `Loud and unwanted sound from factory machines is counted as a kind of pollution.`,
  sol: `Noise pollution is one of the four kinds, with air, water and land pollution.`,
}));
Q('tf_code', tf({
  t: 3, d: 3, c: 'understanding', ans: false,
  stem: `A firm that has published a fine code of conduct has done all that business ethics ask of it, even if nobody checks whether the code is followed.`,
  sol: `A code is one element. Without compliance mechanisms, training and a count of results, it may remain words on paper.`,
}));
Q('tf_moral', tf({
  t: 1, d: 2, c: 'recall', ans: true,
  stem: `Moral responsibility is counted within the ethical kind of social responsibility.`,
  sol: `The ethical kind of responsibility includes moral duty, which is doing right and fair even where no law demands it.`,
}));
Q('fb_csr', fb({
  t: 1, d: 3, c: 'recall',
  stem: `As of 2024, a company covered by section 135 of the Companies Act 2013 must spend at least ___ per cent of its average net ___ of the three preceding years on corporate social responsibility.`,
  acc: [['2', 'two'], ['profit', 'profits']],
  sol: `The minimum is 2 per cent of the average net profits of the preceding three years.`,
}));
Q('fb_pollution', fb({
  t: 2, d: 2, c: 'recall',
  stem: `Untreated factory effluent released into a river causes ___ pollution, while loud machinery causes ___ pollution.`,
  acc: [['water'], ['noise']],
  sol: `Effluent in a river is water pollution; loud machinery is noise pollution.`,
}));
Q('fb_ethics', fb({
  t: 3, d: 2, c: 'recall',
  stem: `Business ethics are the socially determined ___ principles that should ___ business activities.`,
  acc: [['moral'], ['govern', 'guide', 'regulate']],
  sol: `Ethics are moral principles that govern business activities.`,
}));
Q('mt_kinds', match({
  t: 1, d: 3, c: 'application',
  stem: `Match each act of an imagined firm with the kind of social responsibility that it shows.`,
  pairs: [
    [`Tarang Appliances sells sound fans at fair prices and earns a profit`, `Economic responsibility`],
    [`Hariyali Paper Mills pays its taxes and keeps within the legal smoke limits`, `Legal responsibility`],
    [`Amrit Dugdh refuses to sell a product it thinks unsafe, though no law bans it`, `Ethical responsibility`],
    [`Byteloom Software lends its staff to teach at a village school`, `Discretionary responsibility`],
  ],
  sol: `Production and profit are economic; following the law is legal; doing what is right without a legal push is ethical; a free act of giving is discretionary.`,
}));
Q('mt_stake', match({
  t: 2, d: 3, c: 'application',
  stem: `Match each duty of the imagined Hariyali Paper Mills with the group to which it is owed.`,
  pairs: [
    [`Paying a fair return and giving true information`, `Owners and shareholders`],
    [`Safe working conditions and the right to form unions`, `Workers`],
    [`Handling complaints about goods and avoiding misleading advertisements`, `Consumers`],
    [`Paying taxes honestly and caring for the town's environment`, `Government and community`],
  ],
  sol: `A return and true information are owed to owners; conditions and unions to workers; complaints and honest advertising to consumers; taxes and environment to the government and the community.`,
}));
Q('od_csr_steps', ord({
  t: 1, d: 4, c: 'application',
  stem: `Arrange the steps by which an imagined company finds out its minimum corporate social responsibility spend, as of 2024.`,
  items: [`Check that net worth, turnover or net profit reaches the set limit`, `Add the net profits of the three preceding years`, `Divide the sum by three to get the average`, `Take 2 per cent of the average as the minimum spend`],
  sol: `First confirm that the company is covered, then add the profits, find the average, and take 2 per cent of it.`,
}));
Q('od_ethics_steps', ord({
  t: 3, d: 3, c: 'understanding',
  stem: `Arrange these steps by which an imagined software firm builds an ethical workplace, in a sensible order.`,
  items: [`The leaders announce that ethics come before targets`, `A code of conduct is written and published`, `An ethics committee and a helpline are set up`, `Staff at every level are trained in the code`, `The number of breaches and cases settled is counted each year`],
  sol: `Leaders set the stand, the code is published, the means of enforcing it are set up, staff are trained, and finally the results are measured.`,
}));

// ================================================================ short answers
Q('s2_sr_def', short({
  t: 1, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: `Define the social responsibility of business and state one way in which it differs from legal responsibility.`,
  model: `Social responsibility is the duty of a business to act and decide in ways that society, by its goals and values, regards as desirable. It differs from legal responsibility, which only asks that the firm obey the law, because it goes beyond it.`,
  sol: `Meaning and one difference.`,
  scheme: [[`Meaning of social responsibility`, 1], [`One difference from legal responsibility`, 1]],
}));
Q('s2_against_app', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: `The owner of the imagined Dhara Foods says that a free eye camp for the village would eat into the profit of the firm. Name the argument and explain it in one sentence.`,
  model: `This is the argument of violation of the profit-maximisation objective. Some argue that a firm exists to earn the highest profit for its owners, so money spent on camps and other social work reduces what the owners should receive.`,
  sol: `Argument named and explained.`,
  scheme: [[`Profit-maximisation argument named`, 1], [`Explained with the case`, 1]],
}));
Q('s2_for_regulation', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: `Explain how avoidance of government regulation is argued as a reason for a business to be socially responsible.`,
  model: `Some argue that when firms act responsibly by themselves, the government has little reason to frame strict rules for them. A firm that cares for society keeps its freedom to run its affairs, and so a response to the people's needs may keep new regulation away.`,
  sol: `The argument and how it works.`,
  scheme: [[`Responsible conduct leaves less reason for regulation`, 1], [`Firm keeps its freedom of action`, 1]],
}));
Q('s2_factor', short({
  t: 1, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: `State any two factors that have led businesses to accept social obligations, with a few words on each.`,
  model: `1. Threat of public regulation: firms act on their own so that the government is not forced to make rules.\n2. Impact of consumer consciousness: buyers who know their rights expect fair goods and honest dealing, and firms respond.`,
  sol: `Any two factors.`,
  scheme: [[`First factor with explanation`, 1], [`Second factor with explanation`, 1]],
}));
Q('s2_consumers', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: `State any two responsibilities of a business towards its consumers.`,
  model: `1. It must supply goods of good quality at fair prices, free from adulteration.\n2. It must not mislead buyers by false advertisements, and it must listen to their complaints and settle them promptly.`,
  sol: `Any two responsibilities.`,
  scheme: [[`First responsibility`, 1], [`Second responsibility`, 1]],
}));
Q('s2_workers', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: `Lohanagar Cycle Works pays below what the work deserves and keeps its welding shop poorly ventilated. Which responsibilities towards workers does it neglect? Name two.`,
  model: `It neglects the duty to pay fair wages, since pay is below what the work deserves, and the duty to provide good working conditions, since the welding shop is badly ventilated and may harm the health of its workers.`,
  sol: `Two responsibilities with the case.`,
  scheme: [[`Fair wages`, 1], [`Good working conditions`, 1]],
}));
Q('s2_pollution_def', short({
  t: 2, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: `What is meant by pollution? Name any two kinds of pollution.`,
  model: `Pollution is the release of harmful or unwanted substances or energy into the surroundings, so that air, water or land becomes unsafe or unfit for life. Two kinds are air pollution and water pollution; land and noise pollution are others.`,
  sol: `Meaning and two kinds.`,
  scheme: [[`Meaning of pollution`, 1], [`Two kinds named`, 1]],
}));
Q('s2_need_cost', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: `Rangrez Dyeworks cleans its wastewater and avoids a heavy claim for damage from the villagers of Rangpur. Which two reasons for pollution control does this show? Explain briefly.`,
  model: `It shows the reduced risk of liability, since the firm is no longer likely to face a claim for harm done to the villagers. It also shows reduced health hazards, since cleaner water protects the people of Rangpur from illness.`,
  sol: `Two reasons with explanation.`,
  scheme: [[`Reduced risk of liability`, 1], [`Reduced health hazards`, 1]],
}));
Q('s2_mgmt', short({
  t: 2, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: `Why is the commitment of top management called the first step in controlling pollution in a business?`,
  model: `Because policy, money and attention for the cause come from the top. If the board and senior managers are firmly behind it, the staff will treat pollution control as a priority, and without that backing the other steps are unlikely to be taken.`,
  sol: `Why the top matters.`,
  scheme: [[`Policy and resources come from the top`, 1], [`Staff follow the lead of top managers`, 1]],
}));
Q('s2_ethics_def', short({
  t: 3, d: 2, c: 'recall', marks: 2, wl: S2,
  stem: `Define business ethics and give one imagined example of an ethical act.`,
  model: `Business ethics means the moral principles, shaped by society, that ought to guide what a firm does. For example, the imagined Nirmal Masala may recall a batch of its spice that fails a quality test, though no one has yet complained.`,
  sol: `Meaning and an example.`,
  scheme: [[`Meaning of business ethics`, 1], [`One example`, 1]],
}));
Q('s2_code', short({
  t: 3, d: 3, c: 'understanding', marks: 2, wl: S2,
  stem: `Why does a firm publish a code of conduct as part of its ethics programme?`,
  model: `A published code tells employees, customers and others what behaviour the firm expects and will not accept. Because it is open to everyone, the firm can be held to it, and workers know clearly what is right and wrong in daily work.`,
  sol: `Two reasons.`,
  scheme: [[`States expected and forbidden behaviour`, 1], [`Makes the firm answerable to the public`, 1]],
}));

Q('s3_for', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: `Explain any three arguments that are put forward in favour of social responsibility of business.`,
  model: `1. Long-term interest: a firm with a good name and loyal partners earns for years.\n2. Maintenance of society: business depends on society, so it benefits from a healthy one.\n3. Availability of resources: business holds money, skills and equipment that social work needs. Other arguments are avoiding regulation and a better environment for business.`,
  sol: `Any three arguments.`,
  scheme: [[`First argument`, 1], [`Second argument`, 1], [`Third argument`, 1]],
}));
Q('s3_against', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: `Some argue that business should not take up social responsibility. Explain any three of their arguments.`,
  model: `1. Violation of profit maximisation: some argue that a firm exists to earn the highest profit, and social spending cuts it.\n2. Burden on consumers: the cost may be added to prices.\n3. Lack of social skills: managers are trained for business, not for social work. Lack of broad public support is another view.`,
  sol: `Any three arguments, stated as views of those who hold them.`,
  scheme: [[`First argument`, 1], [`Second argument`, 1], [`Third argument`, 1]],
}));
Q('s3_kinds', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: `Explain any three kinds of social responsibility of business.`,
  model: `1. Economic: producing goods and services that society needs and earning a profit from them.\n2. Legal: obeying the laws of the land, such as paying taxes.\n3. Ethical: doing what is right and fair, including moral duty, where the law does not compel it. Discretionary responsibility, a voluntary giving to society, is the fourth.`,
  sol: `Any three kinds.`,
  scheme: [[`First kind`, 1], [`Second kind`, 1], [`Third kind`, 1]],
}));
Q('s3_factors', short({
  t: 1, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: `Explain any three factors that have helped to bring about the acceptance of social obligations by business.`,
  model: `1. Pressure of the labour movement: organised workers demanded fair treatment.\n2. Development of social standards: society came to expect honest and fair conduct.\n3. Development of a professional managerial class: trained managers see their duty to society as well as to owners. Threat of regulation and consumer consciousness are others.`,
  sol: `Any three factors.`,
  scheme: [[`First factor`, 1], [`Second factor`, 1], [`Third factor`, 1]],
}));
Q('s3_csr', short({
  t: 1, d: 4, c: 'application', marks: 3, wl: S3,
  stem: `As of 2024, explain the main features of the corporate social responsibility spending rule in section 135 of the Companies Act 2013.`,
  model: `1. It binds a company with a net worth of Rs ${LAW.netWorth} crore or more, a turnover of Rs ${fmt(LAW.turnover)} crore or more, or a net profit of Rs ${LAW.profit} crore or more.\n2. Such a company must spend at least ${LAW.pct} per cent of the average of its net profits in the three preceding years.\n3. The money goes to corporate social responsibility activities.`,
  sol: `Coverage, amount and purpose.`,
  scheme: [[`Limits that bring a company under the rule`, 1], [`Two per cent of the average net profit of three years`, 1], [`Spend on social activities`, 1]],
}));
Q('s3_owners', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: `Explain the responsibilities of a business towards its owners and shareholders.`,
  model: `1. A fair return: the firm should try to give the investors an adequate share of its earnings.\n2. Safety of the investment: the capital that they put in should not be put at risk through reckless decisions.\n3. True information: accounts and reports must show the real position, without hiding losses.`,
  sol: `Three responsibilities.`,
  scheme: [[`Fair return`, 1], [`Safety of investment`, 1], [`True information`, 1]],
}));
Q('s3_need_pollution', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: `Explain any three reasons why a business needs to control pollution.`,
  model: `1. Reduced health hazards: cleaner air and water keep workers and neighbours healthy.\n2. Cost savings: reusing water and materials lowers expenses.\n3. Improved public image: people trust and prefer a firm that cares for the environment. Lower risk of liability and other social benefits are further reasons.`,
  sol: `Any three reasons.`,
  scheme: [[`First reason`, 1], [`Second reason`, 1], [`Third reason`, 1]],
}));
Q('s3_elements', short({
  t: 3, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: `Explain any three elements of business ethics.`,
  model: `1. Top management commitment: leaders show by word and deed that they stand for ethical conduct.\n2. Publication of a code of conduct: a written statement tells everyone what is expected.\n3. Compliance mechanisms: a committee or helpline sees that the code is followed. Involving employees and measuring results are the other two.`,
  sol: `Any three elements.`,
  scheme: [[`First element`, 1], [`Second element`, 1], [`Third element`, 1]],
}));

// ================================================================ long answers
Q('l_for', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: `Explain any five arguments given in favour of social responsibility of business.`,
  model: `1. Justification for existence: business exists to serve society, so it should answer to it.\n2. Long-term interest: goodwill and loyal customers help a firm earn for many years.\n3. Avoidance of government regulation: responsible conduct leaves less reason for strict rules.\n4. Availability of resources: business has the money, skills and equipment that social work needs.\n5. Holding business responsible for problems it has caused: a firm that pollutes should help to repair the damage.`,
  sol: `Five arguments, each with a line of reasoning.`,
  scheme: [[`Justification for existence`, 1], [`Long-term interest`, 1], [`Avoidance of government regulation`, 1], [`Availability of resources`, 1], [`Responsibility for problems caused`, 1]],
}));
Q('l_kinds', long({
  t: 1, d: 3, c: 'application', marks: 5, wl: L5,
  stem: `Explain the kinds of social responsibility, with an imagined example of each kind.`,
  model: `1. Economic: producing needed goods and earning a profit, as Tarang Appliances does with sound fans.\n2. Legal: obeying the law, as Hariyali Paper Mills does when it pays tax and keeps to smoke limits.\n3. Ethical: doing right where no law compels, as when Amrit Dugdh will not sell a product it thinks unsafe.\n4. Discretionary: giving voluntarily, as when Byteloom Software lends staff to a village school.\n5. Together they run from what society needs of business to what business may choose to give.`,
  sol: `Four kinds with examples and a closing point.`,
  scheme: [[`Economic with example`, 1], [`Legal with example`, 1], [`Ethical with example`, 1], [`Discretionary with example`, 1], [`Link among the kinds`, 1]],
}));
Q('l_balance', long({
  t: 1, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: `Some argue for and others against the social responsibility of business. State two arguments on each side and say which side seems stronger to you for a firm that pollutes a river, with a reason.`,
  model: `For: 1. Long-term interest, as goodwill brings lasting custom. 2. Holding business responsible for harm it causes.\nAgainst: 1. Violation of profit maximisation, as social spending cuts owner profit. 2. Burden on consumers, as the cost may be added to prices.\nView: for a firm that pollutes a river, the arguments in favour look stronger, because the harm is its own doing and the cost of repair should not fall on the villagers.`,
  sol: `Two arguments for, two against, and a reasoned view.`,
  scheme: [[`Two arguments for`, 1], [`Two arguments against`, 1], [`Side chosen for the polluting firm`, 1], [`Reason linked to the case`, 1], [`Balanced and clear presentation`, 1]],
}));
Q('l_stake', long({
  t: 2, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: `Explain the responsibilities of a business towards workers, consumers and the government and community.`,
  model: `1. Workers are owed a fair wage, a sound workplace and freedom to organise in a union.\n2. Workers also need respect and a safe workplace, so that they can work without fear.\n3. Consumers: goods of good quality at fair prices, with no adulteration or misleading advertisements.\n4. Consumers also need their complaints to be heard and settled quickly.\n5. Government and community: obeying laws, paying taxes honestly, protecting the environment and helping the welfare of the community.`,
  sol: `Responsibilities to the three groups.`,
  scheme: [[`Workers: wages and conditions`, 1], [`Workers: union rights and safety`, 1], [`Consumers: quality, prices, no adulteration or false advertising`, 1], [`Consumers: grievance handling`, 1], [`Government and community`, 1]],
}));
Q('l_pollrole', long({
  t: 2, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: `Explain any five steps that a business can take to control pollution.`,
  model: `1. Top management commitment: the board backs the cause with a policy and funds.\n2. Commitment throughout the enterprise: every department and worker is brought into the effort.\n3. Clear policies and programmes: the aims and the steps are written down.\n4. Compliance with laws: the firm keeps within the limits set for emissions and waste.\n5. Periodic assessment of progress, with educating dealers and suppliers and joining government programmes as further steps.`,
  sol: `Five steps with a line each.`,
  scheme: [[`Top management commitment`, 1], [`Commitment throughout the enterprise`, 1], [`Policies and programmes`, 1], [`Compliance with laws`, 1], [`Any fifth step`, 1]],
}));
Q('l_ethics', long({
  t: 3, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: `Explain the elements of business ethics, with an imagined software firm as the example.`,
  model: `1. Top management commitment: the chief of Byteloom Software states that ethics come before targets.\n2. Publication of a code of conduct: the firm posts a written code on its website.\n3. Compliance mechanisms: an ethics committee and a private helpline see that the code is followed.\n4. Involving employees at all levels: every worker, from intern to manager, is trained and asked for views.\n5. Measuring results: the firm counts breaches reported and cases settled each year.`,
  sol: `Five elements with the example.`,
  scheme: [[`Top management commitment`, 1], [`Code of conduct`, 1], [`Compliance mechanisms`, 1], [`Involving employees`, 1], [`Measuring results`, 1]],
}));

// ================================================================ case-based
Q('cb_rangrez', caseQ({
  t: [1, 2], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined factory, river and town.)*`,
  passage: `**Rangrez Dyeworks (imagined), a dye factory beside the imagined river Nirmala in the imagined town of Rangpur**\n\nFor years Rangrez Dyeworks let its coloured wastewater run into the river. The fishers of Rangpur caught fewer fish and many children on the bank developed skin rashes. After a notice from the pollution control authority, the owner installed a plant that recycles ${DYE.pct} per cent of the ${fmt(DYE.litres)} litres of water that the factory uses each day. Water costs Rs ${DYE.rate} per 1,000 litres, and the factory works ${DYE.days} days a year. The plant cost Rs ${fmt(DYE.plant)}. The owner now says that the factory should have acted before the notice came.`,
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'application', stem: `The harm that the factory did to the river is an example of`, opts: [`water pollution`, `noise pollution`, `air pollution`, `land pollution`], sol: `Coloured wastewater in a river spoils the water, so it is water pollution. The other kinds concern sound, air and the ground.` })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: `Quote the line that shows the harm done to the community.`, model: `"**The fishers of Rangpur caught fewer fish and many children on the bank developed skin rashes**": this is harm to the livelihood and health of the community.`, sol: `The line on the fishers and the children.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: 2, d: 4, c: 'application', marks: 2, stem: `**Either** (i): Find the water saved each day and the money saved in a year by recycling.`, model: `Water saved is ${DYE.pct} per cent of ${fmt(DYE.litres)} litres, which is ${fmt(DYE.saved)} litres a day, worth Rs ${fmt(DYE.day)} at Rs ${DYE.rate} per 1,000 litres. Over ${DYE.days} days the saving is Rs ${fmt(DYE.year)}.`, sol: `Litres saved, daily value and yearly saving.`, scheme: [[`${fmt(DYE.saved)} litres a day worth Rs ${fmt(DYE.day)}`, 1], [`Rs ${fmt(DYE.year)} in a year`, 1]] }), [
      short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: `**Or** (ii): Find in how many years the savings in water cost repay the plant, and say which reason for pollution control this shows.`, model: `The plant costs Rs ${fmt(DYE.plant)} and saves Rs ${fmt(DYE.year)} a year, so it is repaid in ${DYE.payback} years. This shows cost savings as a reason for pollution control.`, sol: `Payback period and the reason.`, scheme: [[`Payback of ${DYE.payback} years`, 1], [`Cost savings named`, 1]] }),
    ]),
  ],
}));
Q('cb_dairy', caseQ({
  t: [1, 2], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined dairy company and village.)*`,
  passage: `**Amrit Dugdh (imagined), a dairy company, and the farmers of the imagined village of Gokulpur**\n\nAmrit Dugdh buys ${fmt(DAIRY.litres)} litres of milk a day from the farmers of Gokulpur. It raised the price that it pays from Rs ${DAIRY.old} to Rs ${DAIRY.now} a litre and pays on the tenth of every month, without delay. It tests every batch of milk before sale and prints the true fat content on each pack. A director says that the firm is fair to its farmers because their loyalty keeps its supply steady. A shareholder replies that the higher price lowers the dividend. The board has listened to both views.`,
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'application', stem: `Testing every batch and printing the true fat content is a responsibility towards`, opts: [`consumers`, `owners`, `workers`, `the government`], sol: `Quality checks and truthful labels serve the buyers of the milk, so the duty is towards consumers. Owners, workers and the government are not served by a label on a pack.` })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: `Quote the line that shows an argument against social responsibility.`, model: `"**A shareholder replies that the higher price lowers the dividend**": some argue that such spending cuts what the owners receive, which is the profit-maximisation argument.`, sol: `The line on the shareholder's reply.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: 1, d: 4, c: 'application', marks: 2, stem: `**Either** (i): Find how much more the firm pays the farmers each day and in a month of ${DAIRY.days} days.`, model: `The rise is Rs ${DAIRY.now - DAIRY.old} a litre on ${fmt(DAIRY.litres)} litres, which is Rs ${fmt(DAIRY.gainDay)} more each day. Over ${DAIRY.days} days this is Rs ${fmt(DAIRY.gainMonth)}.`, sol: `Extra per day and per month.`, scheme: [[`Rs ${fmt(DAIRY.gainDay)} a day`, 1], [`Rs ${fmt(DAIRY.gainMonth)} in a month`, 1]] }), [
      short({ t: 1, d: 4, c: 'evaluation', marks: 2, stem: `**Or** (ii): Name the argument for social responsibility in the director's view and give one reason why a shareholder might still question it.`, model: `The director's view is the long-term interest of the firm, since loyal farmers keep the supply steady. A shareholder might still question it because the higher price lowers the dividend that the owners receive in the short run.`, sol: `Argument named and a reason for doubt.`, scheme: [[`Long-term interest named`, 1], [`A reason for doubt`, 1]] }),
    ]),
  ],
}));
Q('cb_byteloom', caseQ({
  t: 3, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined software firm.)*`,
  passage: `**Byteloom Software (imagined), an imagined software firm**\n\nByteloom Software has ${BYTE.staff} employees. Its chief executive told a gathering of all staff that the firm will turn down a contract rather than break its rules of conduct. The firm has published a code of conduct that covers gifts, client data and honest reporting. It has also set up an ethics committee and a private helpline for reporting breaches. So far ${BYTE.trained} employees have completed the training on the code, and the firm aims to reach ${BYTE.target} per cent of its staff by the year end.`,
  parts: [
    child('a', mcq({ t: 3, d: 2, c: 'application', stem: `The ethics committee and the private helpline are an example of the element of`, opts: [`establishing compliance mechanisms`, `publication of a code of conduct`, `measuring results`, `involving employees at all levels`], sol: `A committee and a helpline are the means by which the code is enforced, which is a compliance mechanism. The code is the written statement, and the other two elements concern a count of outcomes and the part played by staff.` })),
    child('b', short({ t: 3, d: 3, c: 'application', marks: 1, stem: `Quote the line that shows the commitment of top management.`, model: `"**the firm will turn down a contract rather than break its rules of conduct**": the chief executive puts ethics above a business gain.`, sol: `The line on turning down a contract.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: 3, d: 4, c: 'application', marks: 2, stem: `**Either** (i): Find the share of staff trained so far and how many more must be trained to reach the aim.`, model: `${BYTE.trained} of ${BYTE.staff} is ${BYTE.pct} per cent. The aim of ${BYTE.target} per cent is ${BYTE.need} employees, so ${BYTE.more} more must be trained.`, sol: `Share trained and the number still to train.`, scheme: [[`${BYTE.pct} per cent trained`, 1], [`${BYTE.more} more to train`, 1]] }), [
      short({ t: 3, d: 4, c: 'evaluation', marks: 2, stem: `**Or** (ii): Explain how the ethics shown by Byteloom Software can support its social responsibility.`, model: `The moral principles that the firm follows in dealing with clients, staff and data set the base for how it treats society. Honest reporting and care for client data make its wider responsibility believable.`, sol: `Link of ethics with social responsibility.`, scheme: [[`Ethics are the moral base of conduct`, 1], [`Conduct towards society follows from it`, 1]] }),
    ]),
  ],
}));
Q('cb_csr', caseQ({
  t: 1, d: 5, c: 'analysis', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined company.)*`,
  passage: `**Surya Steel Works (imagined), an imagined steel company**\n\nAs of 2024, Surya Steel Works has a net worth of Rs ${SURYA.nw} crore and a turnover of Rs ${fmt(SURYA.to)} crore. Its net profits in the three preceding years were Rs ${SURYA.p[0]} crore, Rs ${SURYA.p[1]} crore and Rs ${SURYA.p[2]} crore. At the meeting of shareholders, one member argued that spending on social programmes is a cost that the owners should not bear. Another member argued that a firm which uses the land, water and people of a region should give something back to it.`,
  parts: [
    child('a', mcq({ t: 1, d: 3, c: 'analysis', stem: `As of 2024, is Surya Steel Works covered by the corporate social responsibility spending rule of section 135 of the Companies Act 2013?`, opts: [`Yes, because its turnover is at least Rs ${fmt(LAW.turnover)} crore`, `No, because its net worth is below Rs ${LAW.netWorth} crore`, `No, because only public sector firms are covered`, `Yes, because its net profit is below Rs ${LAW.profit} crore`], sol: `Any one of the three limits is enough, and the turnover of Rs ${fmt(SURYA.to)} crore is above Rs ${fmt(LAW.turnover)} crore, so the firm is covered. A low net worth does not take it out, the rule is not limited to the public sector, and a profit below the limit would not bring it in.` })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: `Quote the line that states an argument for social responsibility.`, model: `"**a firm which uses the land, water and people of a region should give something back to it**": some argue that business has a duty to the society whose resources it uses.`, sol: `The line on giving something back.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: 1, d: 4, c: 'application', marks: 2, stem: `**Either** (i): Find the least amount that the company must spend on corporate social responsibility, as of 2024.`, model: `The average of the three profits is Rs ${SURYA.avg} crore. Two per cent of this is Rs ${SURYA.csr} crore, which is Rs ${SURYA.lakh} lakh.`, sol: `Average and two per cent of it.`, scheme: [[`Average Rs ${SURYA.avg} crore`, 1], [`Rs ${SURYA.csr} crore as ${LAW.pct} per cent`, 1]] }), [
      short({ t: 1, d: 5, c: 'evaluation', marks: 2, stem: `**Or** (ii): Name the argument that the first member made and explain how the rule of section 135 bears on that view.`, model: `The first member made the profit-maximisation argument against social responsibility. The rule requires a covered company to spend a set share of its profit, so for such a company the spending is no longer a free choice but a legal duty.`, sol: `Argument named and the effect of the rule.`, scheme: [[`Profit-maximisation argument named`, 1], [`Covered company spends as a legal duty`, 1]] }),
    ]),
  ],
}));
Q('cb_hariyali', caseQ({
  t: 1, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: `Read the passage and answer the questions that follow. *(Imagined paper mill.)*`,
  passage: `**Hariyali Paper Mills (imagined), an imagined paper maker of the imagined town of Kagazpur**\n\nA consumers' group of Kagazpur began to publish tests of notebooks and the practices of the makers, and many buyers now read them before they buy. The workers of the mill, through their union, asked for safer machines and shorter shifts. The management knew that a new law on waste was being drafted. It therefore set up a waste unit, improved the machines and, with no demand from anyone, opened a free reading room for the children of the town. Some members of the board argue that the reading room is a cost without a return; others argue that it builds goodwill.`,
  parts: [
    child('a', mcq({ t: 1, d: 3, c: 'application', stem: `The consumers' group that publishes tests and practices shows the factor of`, opts: [`impact of consumer consciousness`, `pressure of the labour movement`, `development of business education`, `threat of public regulation`], sol: `Buyers who study and compare the makers show growing consumer consciousness. The labour movement is shown by the union, regulation by the draft law, and business education is not mentioned.` })),
    child('b', short({ t: 1, d: 3, c: 'application', marks: 1, stem: `Quote the line that shows the pressure of the labour movement.`, model: `"**The workers of the mill, through their union, asked for safer machines and shorter shifts**": organised workers pressed the management for better conditions.`, sol: `The line on the union's request.`, scheme: [[`Correct line quoted`, 1]] })),
    child('c', short({ t: 1, d: 4, c: 'application', marks: 2, stem: `**Either** (i): Name the kind of social responsibility shown by the free reading room and give one reason.`, model: `The reading room is discretionary responsibility. No law or demand required it, and the mill opened it by its own choice for the children of the town.`, sol: `Kind named with a reason.`, scheme: [[`Discretionary responsibility`, 1], [`Reason from the case`, 1]] }), [
      short({ t: 1, d: 4, c: 'evaluation', marks: 2, stem: `**Or** (ii): Name the factor that explains why the mill set up a waste unit before the law was passed, and explain it in one sentence.`, model: `The factor is the threat of public regulation. The management saw that a law was coming and acted early, so that the mill would be prepared and might shape the response of the authorities.`, sol: `Factor named and explained.`, scheme: [[`Threat of public regulation`, 1], [`Explained with the case`, 1]] }),
    ]),
  ],
}));
