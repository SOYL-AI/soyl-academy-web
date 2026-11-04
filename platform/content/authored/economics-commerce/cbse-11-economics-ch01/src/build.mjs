// Build CBSE 11 Economics ch01 Introduction (Statistics for Economics). Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-11-economics-ch01/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-11-economics-ch01', 'economics-commerce');
const { inr, RAIN, RAINmean, RAINmed, HH, HHn, share, SALES, SALESmean, RICE, riceStep, riceNext, BUNP, BUNQ, bunFall, INC, SAV, savePct, DR, DRn } = await import('./questions.mjs');
const { check, sum } = await import('./stats.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- figures pinned (prose figures below are interpolated)
check(sum(RAIN), 5280, 0, 'rain sum');
check(RAINmean, 880, 2, 'rain mean');
check(sum(SALES), 27000, 0, 'sales sum');
check(SALESmean, 4500, 2, 'sales mean');
check(riceNext, 480, 2, 'rice next');
check(bunFall, 6, 0, 'bun fall');
check(share(HH[0][1]), 40, 2, 'farm share');
check(share(HH[1][1]), 25, 2, 'wage share');
check(share(DR[0][1], DRn), 40, 2, 'tea share');
check(savePct[2], 20, 2, 'saving share family 3');

// ---------------------------------------------------------------- visuals
const vScarcityFlow = flow('LR', ['Unlimited wants', 'Limited resources', 'Choice has to be made', 'Economics studies these choices'], 'Flow: unlimited wants meet limited resources, so choices have to be made, and economics studies these choices', 'The economic problem in four steps');
const vWantsRes = table(
  ['Imagined case', 'Wants', 'Limited resource', 'Choice made'],
  [
    ['A family in Rangpur', 'Food, school fees, a phone, a holiday', '₹10,000 a month', 'Food and fees first; the holiday waits'],
    ['Farida\'s bakery in Pipalnagar', 'Cakes and bread in the morning shift', 'One oven', 'Bread now, cakes in the afternoon'],
    ['A village panchayat', 'A road, a school room, a well', 'One year\'s funds', 'The well first'],
  ],
  'Table of three imagined cases of scarcity: a family with 10,000 rupees a month, a bakery with one oven, and a panchayat with one year of funds, each with wants, the limited resource and the choice made',
  'In each case a want is postponed, which is the cost of choosing.',
);
const vActivities = (() => {
  const s = new Svg(640, 290);
  const box = (x, title, sub) => {
    s.rect(x, 80, 180, 80, { fill: 'fill', color: 'accent', sw: 2 });
    s.text(x + 90, 108, title, { bold: true, size: 16, color: 'accent' });
    s.text(x + 90, 134, sub, { size: 13 });
  };
  box(20, 'Production', 'creates goods and services');
  box(230, 'Distribution', 'shares the income');
  box(440, 'Consumption', 'uses goods to meet wants');
  s.arrow(200, 120, 228, 120, { sw: 2 });
  s.arrow(410, 120, 438, 120, { sw: 2 });
  s.line(530, 160, 530, 215, { sw: 1.8, dash: true, color: 'muted' });
  s.line(530, 215, 110, 215, { sw: 1.8, dash: true, color: 'muted' });
  s.arrow(110, 215, 110, 162, { sw: 1.8, color: 'muted' });
  s.text(320, 240, 'Wants keep creating demand for more production', { size: 13, muted: true });
  s.text(320, 40, 'Economic activities', { bold: true, size: 17 });
  return s.visual('Diagram of the three economic activities: production leads to distribution of income, which leads to consumption, and consumption creates demand that leads back to production', 'The three economic activities go on together in every economy.');
})();
const vActDefs = table(
  ['Activity', 'Meaning', 'Imagined example'],
  [
    ['Consumption', 'Using goods and services to satisfy wants', 'A family eats rice bought from the weekly market'],
    ['Production', 'Creating goods and services from inputs', 'A mill in Chandpur turns paddy into rice'],
    ['Distribution', 'Sharing the income of production among those who helped', 'The mill pays wages, rent and interest and keeps profit'],
  ],
  'Table defining consumption, production and distribution with an imagined example of each: a family eating rice, a mill turning paddy into rice, and the mill paying wages, rent and interest and keeping a profit',
);
const vPottery = table(
  ['What happens in Chandpur (imagined)', 'Activity'],
  [
    ['Potters shape clay into pots', 'Production'],
    ['The owner pays wages and keeps the profit', 'Distribution'],
    ['A household buys a water pot', 'Consumption'],
    ['A potter spends part of her wages on rice', 'Consumption'],
  ],
  'Table of four imagined events in Chandpur and the economic activity each shows: shaping pots is production, paying wages and profit is distribution, and buying a pot or buying rice is consumption',
  'One event can feed the next: wages are distributed, then spent.',
);
const vAgents = table(
  ['Economic agent', 'Meaning', 'Imagined example'],
  [
    ['Consumer', 'Uses goods and services to satisfy wants', 'Meena buying vegetables'],
    ['Producer', 'Organises inputs and makes goods or services for sale', 'Pooja running a chalk factory'],
    ['Service holder', 'Earns a salary or wage by working for others', 'Rita teaching in a private school'],
    ['Government', 'Provides public services and raises revenue through taxes', 'The water department laying pipelines'],
  ],
  'Table of four economic agents, consumer, producer, service holder and government, with a meaning and an imagined example each',
);
const vWeaving = table(
  ['Person or body in the weaving unit (imagined)', 'Agent'],
  [
    ['The owner, who decides output and price', 'Producer'],
    ['Eight weavers paid monthly wages', 'Service holders'],
    ['Households that buy the shawls', 'Consumers'],
    ['The tax office that collects the unit\'s tax', 'Government'],
  ],
  'Table naming the agent for each person in an imagined weaving unit: the owner is a producer, weavers are service holders, households are consumers and the tax office is the government',
  'One person can be more than one agent: a weaver also consumes.',
);
const vLoop = flow('LR', ['Producers make goods and pay wages', 'Service holders earn and spend', 'Consumers buy goods', 'Government taxes and provides services'], 'Flow showing how agents are linked: producers make goods and pay wages, service holders earn and spend, consumers buy goods, and the government taxes and provides services, which feeds back into production', 'The agents depend on one another', [
  { from: 'n1', to: 'n2' }, { from: 'n2', to: 'n3' }, { from: 'n3', to: 'n4' }, { from: 'n4', to: 'n1' },
]);
const vNeedData = flow('LR', ['An economic question', 'Collect numbers', 'Summarise them', 'Draw a conclusion', 'Make a decision'], 'Flow from an economic question to collecting numbers, summarising them, drawing a conclusion and making a decision', 'Decisions need facts; statistics supplies the method');
const vSumm1 = table(
  ['Idea', 'Key point'],
  [
    ['Economic problem', 'Wants are unlimited and resources are scarce, so choice is unavoidable'],
    ['Economics', 'The study of how individuals and society choose to use scarce resources'],
    ['Activities', 'Consumption, production, distribution'],
    ['Agents', 'Consumers, producers, service holders, government'],
  ],
  'Summary table of Part 1: the economic problem, economics, the three activities and the four agents',
);

const vPlural = (() => {
  const s = new Svg(640, 320);
  s.rect(15, 15, 290, 290, { color: 'accent', sw: 2 });
  s.text(160, 40, 'Plural: numerical facts', { bold: true, size: 15, color: 'accent' });
  s.text(160, 68, 'Annual rainfall, Sarangpur (mm)', { size: 13 });
  RAIN.forEach((v, i) => {
    const x = 40 + (i % 3) * 90, y = 105 + Math.floor(i / 3) * 52;
    s.rect(x, y - 20, 76, 38, { fill: 'fill', color: 'accent', sw: 1.2, rx: 6 });
    s.text(x + 38, y - 1, inr(v), { size: 15 });
  });
  s.text(160, 235, 'A collection of figures', { size: 13 });
  s.text(160, 258, 'is called data', { size: 13 });
  s.rect(335, 15, 290, 290, { color: 'accent', sw: 2 });
  s.text(480, 40, 'Singular: a science', { bold: true, size: 15, color: 'accent' });
  ['Collect', 'Organise', 'Present', 'Analyse', 'Interpret'].forEach((t, i) => {
    const y = 62 + i * 48;
    s.rect(400, y, 160, 32, { fill: 'fill', color: 'accent', sw: 1.2, rx: 6 });
    s.text(480, y + 17, t, { size: 14 });
    if (i < 4) s.arrow(480, y + 33, 480, y + 47, { sw: 1.4 });
  });
  return s.visual('Chart contrasting the two senses of statistics: on the left, plural, numerical facts such as six imagined annual rainfall readings of Sarangpur; on the right, singular, the science with five stages: collect, organise, present, analyse and interpret', 'Statistics: numerical facts (plural) and the science of handling them (singular).');
})();
const vKinds = table(
  ['', 'Quantitative data', 'Qualitative data'],
  [
    ['Nature', 'Measured as numbers', 'Attributes or qualities'],
    ['Examples', 'Income, marks, price, rainfall', 'Gender, region, occupation, preference'],
    ['Summarised by', 'Totals, averages, ranges of values', 'Counts and shares by category'],
  ],
  'Table comparing quantitative data, which are measured as numbers such as income, marks and rainfall, with qualitative data, which are attributes such as gender, region and preference and are summarised by counting categories',
);
const vSortingT = table(
  ['Information noted in the Lalpur canteen survey (imagined)', 'Kind of data'],
  [
    ['Favourite drink of each student', 'Qualitative'],
    ['Pocket money of each student, in rupees', 'Quantitative'],
    ['Class section of each student', 'Qualitative'],
    ['Number of students who chose tea', 'A count, from a qualitative attribute'],
  ],
  'Table sorting four items from an imagined canteen survey: favourite drink is qualitative, pocket money is quantitative, class section is qualitative, and the number choosing tea is a count obtained from a qualitative attribute',
);
const vBars = (() => {
  const s = new Svg(560, 310);
  const ch = s.chart({ x0: 0, x1: HH.length, y0: 0, y1: 40, left: 60, top: 30, width: 460, height: 210, xLabel: 'Main source of income', yLabel: 'Households' });
  HH.forEach(([name, v], i) => {
    const xa = ch.X(i + 0.18), xb = ch.X(i + 0.82);
    s.rect(xa, ch.Y(v), xb - xa, ch.Y(0) - ch.Y(v), { fill: 'fill', color: 'accent', sw: 1.5, rx: 2 });
    s.text((xa + xb) / 2, ch.Y(v) - 10, String(v), { size: 13 });
    s.text((xa + xb) / 2, ch.Y(0) + 15, name, { size: 12 });
  });
  for (const v of [10, 20, 30, 40]) ch.yTick(v, String(v));
  return s.visual(`Bar chart of an imagined survey of ${HHn} households in Sarangpur by main source of income: ${HH.map(([n, v]) => `${n.toLowerCase()} ${v}`).join(', ')}`, `Imagined survey of ${HHn} households in Sarangpur.`);
})();
const vShares = table(
  ['Source of income', 'Households', 'Working', 'Share (%)'],
  [
    ...HH.map(([n, v]) => [n, String(v), `${v} ÷ ${HHn} × 100`, String(share(v))]),
    ['**Total**', `**${HHn}**`, '', '**100**'],
  ],
  `Table of shares in the imagined survey of ${HHn} households: farming 40, wage labour 25, trade 15, service 12.5 and other 7.5 per cent, which add to 100`,
  'Imagined survey of 80 households in Sarangpur.',
);
const vFunctions = (() => {
  const s = new Svg(640, 300);
  s.rect(232, 112, 176, 76, { fill: 'fill', color: 'accent', sw: 2.2 });
  s.text(320, 140, 'Statistics', { bold: true, size: 16, color: 'accent' });
  s.text(320, 163, 'in economics', { size: 14 });
  const left = ['Presents facts precisely', 'Condenses data', 'Finds relationships'];
  const right = ['Helps forecasting', 'Supports policy-making', 'Tests theories'];
  const ys = [45, 150, 255];
  left.forEach((t, i) => {
    s.rect(10, ys[i] - 24, 190, 48, { color: 'accent', sw: 1.5 });
    s.text(105, ys[i], t, { size: 13 });
    s.line(200, ys[i], 232, 150, { sw: 1.4, color: 'muted' });
  });
  right.forEach((t, i) => {
    s.rect(440, ys[i] - 24, 190, 48, { color: 'accent', sw: 1.5 });
    s.text(535, ys[i], t, { size: 13 });
    s.line(408, 150, 440, ys[i], { sw: 1.4, color: 'muted' });
  });
  return s.visual('Web diagram of the functions of statistics in economics around a central box: presents facts precisely, condenses data, finds relationships, helps forecasting, supports policy-making and tests theories', 'Six functions of statistics in economics.');
})();
const vSalesAvg = table(
  ['Day', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Total', 'Average'],
  [['Sales (₹)', ...SALES.map(inr), `**${inr(sum(SALES))}**`, `**${inr(SALESmean)}**`]],
  `Table of the imagined Kavita Provision Store sales over six days, ${SALES.map(inr).join(', ')} rupees, total ${inr(sum(SALES))} and average ${inr(SALESmean)}`,
  'Six figures condensed into one: the average sale.',
);
const vBun = table(
  ['Price of a bun (₹)', ...BUNP.map(String)],
  [['Buns sold per day', ...BUNQ.map(String)], ['Fall in buns sold for each ₹2 rise', '', ...BUNQ.slice(1).map((q, i) => String(BUNQ[i] - q))]],
  `Table of an imagined bakery: as the price of a bun rises from ${BUNP[0]} to ${BUNP[4]} rupees, buns sold per day fall from ${BUNQ[0]} to ${BUNQ[4]}, a fall of ${bunFall} for each two rupee rise`,
  'Imagined bakery figures: price and quantity move in opposite directions.',
);
const vRice = table(
  ['Year', '1', '2', '3', '4', '5 (forecast)'],
  [['Monthly rice consumption in Rangpur (tonnes)', ...RICE.map(String), `${riceNext}`], ['Rise over the previous year', '', ...[1, 2, 3].map((i) => String(RICE[i] - RICE[i - 1])), `${riceStep}`]],
  `Table of imagined rice consumption in Rangpur, ${RICE.join(', ')} tonnes a month in four years, rising by ${riceStep} tonnes each year, so the fifth year forecast is ${riceNext} tonnes`,
  'Imagined figures; the forecast assumes the trend continues.',
);
const vUsers = table(
  ['User', 'Uses statistics to', 'Imagined case'],
  [
    ['Consumer', 'Compare prices and quality', 'Averaging asking prices of seven second-hand scooters'],
    ['Producer', 'Decide output and price', 'A bag maker studying sales in five towns'],
    ['Government', 'Plan and frame policy', 'Matching ration shops to households in a block'],
    ['Researcher', 'Test theories', 'Checking whether saving rises with income'],
  ],
  'Table of four users of statistics, consumer, producer, government and researcher, with what each uses it for and an imagined case',
);
const vSaving = table(
  ['Monthly income (₹ thousand)', ...INC.map(String)],
  [['Saving (₹ thousand)', ...SAV.map(String)], ['Saving as % of income', ...savePct.map(String)]],
  `Table of five imagined families: income 12, 18, 24, 30 and 36 thousand rupees; saving 1.2, 2.7, 4.8, 7.5 and 10.8 thousand; saving as a percentage of income 10, 15, 20, 25 and 30`,
  'Imagined figures: richer families here save a larger share.',
);
const vLimits = table(
  ['Limitation', 'What it means', 'Imagined illustration'],
  [
    ['Deals with aggregates', 'It describes groups, not a single unit', 'An average income of ₹36,000 says little about one family'],
    ['True on the average', 'A result need not hold in every case', 'Most richer families save more, but one may not'],
    ['Can be misused', 'Careless data or reading gives wrong conclusions', 'Asking ten people at one counter and claiming all customers agree'],
  ],
  'Table of three limitations of statistics with a meaning and an imagined illustration each: it deals with aggregates, its results are true on the average, and it can be misused',
);
const vSumm2 = table(
  ['Idea', 'Key point'],
  [
    ['Statistics (plural)', 'Numerical facts or data'],
    ['Statistics (singular)', 'Collecting, organising, presenting, analysing and interpreting data'],
    ['Data kinds', 'Quantitative: measured numbers; qualitative: attributes, counted by category'],
    ['Functions', 'Present facts, condense data, find relationships, forecast, plan policy'],
    ['Limitations', 'Aggregates, true on the average, can be misused'],
  ],
  'Summary table of Part 2: the two senses of statistics, the two kinds of data, the functions and the limitations',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Introduction — Part 1: Scarcity, Choice and Economic Activity',
  goals: [
    'Explain why scarcity of resources against unlimited wants forces choices',
    'Describe consumption, production and distribution with examples',
    'Identify consumers, producers, service holders and the government in a situation',
    'Explain why economics needs numerical facts',
  ],
  slides: [
    sl('title', 'Introduction: Why Economics Needs Numbers', {
      b: 'Part 1: **wants and scarcity**, **choice**, the **economic activities** and the **economic agents**.',
      v: vScarcityFlow,
      n: 'Every day somebody decides how to use a limited sum of money, a limited amount of time or a limited piece of land. In this part we see why such choices arise, what economics studies, which three activities go on in every economy, and who the main actors are. Then we are ready to see why numbers are needed.',
    }),
    sl('concept', 'Unlimited wants, limited resources', {
      b: 'Human **wants are unlimited**: when one want is met, another appears. The **resources** that can satisfy them are **scarce** (limited) and can be put to **alternative uses**.',
      v: vWantsRes,
      n: 'A family in Rangpur wants food, school fees, a phone and a holiday, but has only ten thousand rupees a month. A bakery has one oven. A panchayat has one year of funds. In each case something must wait. Wants are many and resources are few, and that gap is the heart of the economic problem.',
    }),
    sl('concept', 'Scarcity makes choice unavoidable', {
      b: 'Because resources are scarce and have alternative uses, every person and every society must **choose**.',
      bl: ['Using a resource for one purpose means giving up another.', '**Economics** is the study of how individuals and society **choose to use scarce resources** to satisfy their wants.', 'Rich or poor, every economy faces this problem.'],
      n: 'Because resources are limited and can be used in different ways, choosing one use means giving up another. That is why we say economics is the study of how people and societies choose to use scarce resources to satisfy their wants. Even a very rich country has to choose, so the problem is never completely solved.',
    }),
    sl('check', 'Quick check: wants and resources', {
      b: 'Which statement about wants and resources is correct?',
      chk: 'm_wants',
      n: 'Read all four statements. Ask whether wants or resources are the ones that never end, and whether choice can ever be avoided.',
    }),
    sl('diagram', 'The three economic activities', {
      v: vActivities,
      n: 'Three activities go on in every economy. Production creates goods and services. Distribution shares the income of production among those who helped. Consumption uses goods to meet wants. The wants of consumers then create demand for more production, so the cycle keeps going.',
    }),
    sl('concept', 'Consumption, production and distribution', {
      b: '**Consumption** uses goods and services to satisfy wants. **Production** creates them from inputs. **Distribution** shares the income of production as wages, rent, interest and profit.',
      v: vActDefs,
      n: 'Consumption is using goods and services to meet wants, like a family eating rice. Production is creating goods and services, like a mill turning paddy into rice. Distribution is the sharing of the income earned in production, as wages to workers, rent to owners of land, interest to lenders and profit to the owner.',
    }),
    sl('example', 'Worked example 1: name the activity', {
      b: 'Decide which activity each imagined event in the village of Chandpur shows.',
      bl: ['Step 1: Is something new being **created**? That is production.', 'Step 2: Is income being **shared out** among those who helped? That is distribution.', 'Step 3: Is something being **used to meet a want**? That is consumption.', 'Step 4: Note that spending wages on rice is again consumption.'],
      v: vPottery,
      n: 'Look at the events in Chandpur. Shaping pots from clay creates something new, so that is production. Paying wages and keeping profit shares the income, so that is distribution. A household buying a pot is consumption. A potter spending wages on rice is also consumption. One event leads to the next.',
    }),
    sl('check', 'Quick check: harvest and use', {
      b: 'A farmer sells part of his wheat and keeps the rest for his own family. What is the family\'s eating of wheat?',
      chk: 'm_dist_consumption_diff',
      n: 'Think about what is happening to the wheat the family keeps. Is anything new being made, is an income being shared, or is a want being met?',
    }),
    sl('concept', 'The economic agents', {
      b: 'The people and bodies who take economic decisions are **economic agents**: **consumers**, **producers**, **service holders** and the **government**.',
      v: vAgents,
      n: 'Four kinds of agents take economic decisions. Consumers use goods and services. Producers organise inputs and make goods for sale. Service holders earn a salary or wage by working for others. The government provides public services and raises revenue through taxes. One person can play more than one role, for example a teacher is both a service holder and a consumer.',
    }),
    sl('example', 'Worked example 2: spot the agents', {
      b: 'In an imagined weaving unit in Chandpur, name the agent for each person or body.',
      bl: ['Step 1: Who decides output and price? The owner, a **producer**.', 'Step 2: Who earns monthly wages? The weavers, **service holders**.', 'Step 3: Who buys the shawls? Households, **consumers**.', 'Step 4: Who collects tax? The **government**.'],
      v: vWeaving,
      n: 'In the weaving unit, the owner decides what to make and at what price, so the owner is a producer. The eight weavers earn monthly wages, so they are service holders. Households buy the shawls, so they are consumers. The tax office is part of the government. A weaver also consumes, so roles can overlap.',
    }),
    sl('check', 'Quick check: match the agents', {
      b: 'Match each imagined person with the role in which she is acting.',
      chk: 'mt_agents',
      n: 'For each person, ask what they are doing in this moment. Are they buying for own use, organising output, working for a salary, or providing a public service?',
    }),
    sl('diagram', 'How the agents are linked', {
      v: vLoop,
      n: 'The agents depend on one another. Producers make goods and pay wages. Service holders earn and spend. Consumers buy the goods. The government taxes and provides services that producers and households use. Then the cycle repeats. Decisions at every point depend on facts about quantities and prices.',
    }),
    sl('concept', 'From choices to numbers', {
      b: 'Every choice rests on facts: how many, how much, how often. Economists need **numerical facts** and a method of handling them. That method is **statistics**.',
      v: vNeedData,
      n: 'To choose well, a farmer, a shopkeeper or a government needs facts. How much rain fell, how many buns were sold, how many households need ration shops. These are numbers. Collecting such numbers and drawing sound conclusions from them is the job of statistics, which we study in the second part.',
    }),
    sl('check', 'Quick check: order the activities', {
      b: 'Arrange the events of the Karanpur cloth story in order.',
      chk: 'ord_activities',
      n: 'Start with the event that creates something, then the event that shares the income, then the event that uses the goods.',
    }),
    sl('summary', 'Summary of Part 1', { v: vSumm1, n: 'Wants are unlimited and resources are scarce, so choice is unavoidable. Economics studies how individuals and society choose. Consumption, production and distribution are the three activities. Consumers, producers, service holders and the government are the main agents. Their decisions depend on numerical facts.' }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Define scarcity with **both** halves: unlimited wants and limited resources.', 'Do not mix **production** (creating) with **distribution** (sharing the income).', 'Name the agent from the **role played**, not from the person: a teacher earning a salary is a service holder.', 'Use a short, specific example for each activity and agent.'],
      n: 'Always define scarcity with both halves: unlimited wants and limited resources. Do not confuse production, which is creating, with distribution, which is sharing income. Decide the agent from the role being played. Support each activity and agent with a short example. These habits earn marks.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Introduction — Part 2: Statistics, Data, Functions and Limitations',
  goals: [
    'Explain statistics in its plural and singular senses',
    'Distinguish quantitative from qualitative data and summarise both',
    'Explain the functions, uses and importance of statistics in economics',
    'State the limitations of statistics and apply them to a claim',
  ],
  slides: [
    sl('title', 'Statistics: Meaning, Uses and Limits', {
      b: 'Part 2: the **two senses** of statistics, **kinds of data**, **functions** and **limitations**.',
      v: vNeedData,
      n: 'In this part we meet statistics itself. We see the two ways the word is used, the two kinds of data, what statistics does for economics, who uses it, why it matters, and what it cannot do. Examples come from villages, shops and families.',
    }),
    sl('concept', 'Two senses of the word statistics', {
      b: 'In the **plural** sense, **statistics** means **numerical facts**, or data. In the **singular** sense, **statistics** is the **science** of collecting, organising, presenting, analysing and interpreting data.',
      v: vPlural,
      n: 'The word statistics is used in two senses. In the plural sense it means numerical facts, like six years of rainfall readings in a village. In the singular sense it means the science of dealing with such facts: collecting them, organising them, presenting them, analysing them and interpreting the results.',
    }),
    sl('diagram', 'Five stages of statistics', {
      v: flow('LR', ['Collection', 'Organisation', 'Presentation', 'Analysis', 'Interpretation'], 'Flow of the five stages of statistics as a science: collection, organisation, presentation, analysis and interpretation', 'Each stage builds on the previous one'),
      n: 'Statistics as a science has five stages. First data are collected. Then they are organised, for example sorted into groups. Next they are presented in tables and diagrams. Then they are analysed, using measures like averages. Finally the results are interpreted, which means saying what they mean for the question.',
    }),
    sl('check', 'Quick check: only collection?', {
      b: 'A student says statistics is only about collecting numbers. Which reply is correct?',
      chk: 'm_stat_steps',
      n: 'Think of the five stages and decide which reply is complete.',
    }),
    sl('concept', 'Quantitative and qualitative data', {
      b: '**Quantitative data** are measured as numbers, such as income or marks. **Qualitative data** are attributes, such as region or preference. Attributes can be **counted by category**.',
      v: vKinds,
      n: 'Quantitative data are measured as numbers, such as income, marks, price or rainfall. Qualitative data describe an attribute, such as gender, region or preference. You cannot measure an attribute, but you can count how many units fall in each category. Counting turns qualitative data into numbers.',
    }),
    sl('example', 'Worked example 1: sort the information', {
      b: 'In an imagined survey at the Lalpur canteen, decide the kind of data for each item.',
      bl: ['Step 1: Can the item be **measured** in numbers? Pocket money, yes: quantitative.', 'Step 2: Is it an **attribute**? Favourite drink or class section: qualitative.', 'Step 3: A **count** of how many chose tea comes from a qualitative attribute.'],
      v: vSortingT,
      n: 'Look at the canteen survey. Pocket money in rupees is measured, so it is quantitative. Favourite drink and class section are attributes, so they are qualitative. The number of students who chose tea is a count obtained by sorting students into categories, so it summarises a qualitative attribute with a number.',
    }),
    sl('check', 'Quick check: fill the blanks', {
      b: 'Complete the sentence on the two kinds of data.',
      chk: 'fb_data_kinds',
      n: 'Think about which kind of data can be measured as a number and which kind describes an attribute.',
    }),
    sl('diagram', 'Counting a qualitative attribute', {
      v: vBars,
      n: 'Here is an imagined survey of eighty households in Sarangpur. The main source of income is an attribute, so it is qualitative. Counting households in each category gives a bar chart. Farming has the tallest bar, followed by wage labour, trade, service and other.',
    }),
    sl('example', 'Worked example 2: shares of households', {
      b: 'Find the percentage share of each category in the imagined Sarangpur survey of 80 households.',
      bl: ['Step 1: Total households = 80.', 'Step 2: Share = households in the category ÷ 80 × 100.', 'Step 3: Farming: 32 ÷ 80 × 100 = 40 per cent.', 'Step 4: Check that all shares add to 100.'],
      v: vShares,
      n: 'To find a share, divide the number in the category by the total and multiply by one hundred. For farming, thirty two divided by eighty gives point four, which is forty per cent. Wage labour is twenty five per cent, trade fifteen, service twelve and a half, and other seven and a half. They add up to one hundred.',
    }),
    sl('check', 'Quick check: a percentage share', {
      b: 'Find the share of trade households in the survey.',
      chk: 'n_share_trade',
      n: 'Divide the count for trade by the total number of households and multiply by one hundred.',
    }),
    sl('diagram', 'Functions of statistics in economics', {
      v: vFunctions,
      n: 'Statistics does six jobs for economics. It presents facts precisely, it condenses large amounts of data, it finds relationships between economic factors, it helps in forecasting, it supports policy-making, and it helps test theories against real figures.',
    }),
    sl('concept', 'Presenting facts and condensing data', {
      b: '**Precision:** exact figures replace loose remarks. **Condensing:** a mass of data is reduced to a few **summary measures**, such as an **average**.',
      v: vSalesAvg,
      n: 'Instead of saying the village had good rain, a report can give exact readings. Instead of listing every day of sales, we can give the average. For the Kavita Provision Store, the six days add up to twenty seven thousand rupees, and the average is four thousand five hundred rupees a day. One figure now stands for six.',
    }),
    sl('example', 'Worked example 3: price and quantity', {
      b: 'An imagined bakery records buns sold at different prices. Find the relationship.',
      bl: ['Step 1: Place price and quantity side by side.', 'Step 2: Price rises from ₹10 to ₹18 and quantity falls from 50 to 26.', 'Step 3: Each ₹2 rise cuts sales by 6 buns.', 'Step 4: Price and quantity demanded move in **opposite** directions.'],
      v: vBun,
      n: 'Look at the bakery table. When the price of a bun rises from ten to twelve rupees, sales fall from fifty to forty four, a fall of six buns. Each further two rupee rise cuts sales by six more. Price and quantity demanded move in opposite directions. Pairing the figures made this relationship visible.',
    }),
    sl('concept', 'Forecasting and policy-making', {
      b: 'Past data show a **trend**. A planner can use the trend to estimate the future need and to frame **policy**. A forecast is an estimate, not a guarantee.',
      v: vRice,
      n: 'Suppose monthly rice consumption in Rangpur was four hundred, four hundred twenty, four hundred forty and four hundred sixty tonnes in four years. It rises by twenty tonnes a year. If the trend continues, the next year needs about four hundred eighty tonnes, so stocks can be arranged in time. It is an estimate, and changes in conditions can make it wrong.',
    }),
    sl('concept', 'Who uses statistics, and why it matters', {
      b: '**Consumers, producers, the government and researchers** use statistics. Economic **theories** are tested with data, and **policies** are framed and judged with data.',
      v: vUsers,
      n: 'A buyer compares prices. A producer decides output and price. The government plans where to build facilities. A researcher checks whether saving rises with income. Theories are tested with data, and policies are framed and later judged with data, so statistics is important to every one of them.',
    }),
    sl('diagram', 'A relationship in numbers: income and saving', {
      v: vSaving,
      n: 'Here are five imagined families. As income rises from twelve thousand to thirty six thousand rupees, saving rises from one point two thousand to ten point eight thousand. As a share of income, saving climbs from ten per cent to thirty per cent. Comparing paired figures is how economists study how two factors are related.',
    }),
    sl('concept', 'Limitations of statistics', {
      b: 'Statistics **deals with aggregates**, not single individuals. Its results are true **on the average**. It can be **misused** if data are collected or read carelessly.',
      v: vLimits,
      n: 'Statistics has limits. It deals with groups, not single units, so an average income of thirty six thousand rupees does not tell us about one family. Its results are true on the average and need not hold in every case. And careless collection or reading of data can lead to wrong conclusions. These limits call for care, not for giving up statistics.',
    }),
    sl('check', 'Quick check: assertion and reason', {
      b: 'Decide whether the assertion and the reason on studying income and saving are true.',
      chk: 'ar_relationship',
      n: 'Check each statement separately, and then ask whether the reason explains the assertion.',
    }),
    sl('summary', 'Summary of Part 2', { v: vSumm2, n: 'Statistics means numerical facts in the plural sense and a science in the singular sense. Data are quantitative or qualitative. Statistics presents facts, condenses data, finds relationships, helps forecasting and policy-making. It is used by consumers, producers, government and researchers. Its limits are that it deals with aggregates, holds on the average, and can be misused.' }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Always say **which sense** of statistics (plural or singular) you are using.', 'Give a **specific example** for each function.', 'For a percentage share, write the **formula** first and then substitute.', 'When asked to evaluate a claim, mention **aggregates** and **average truth**.', 'Do not say statistics is useless; say it must be used with care.'],
      n: 'Say which sense of statistics you mean. Give a specific example with each function. For a percentage, write the formula first and then substitute. When a claim is to be judged, mention aggregates and average truth. And never say statistics is useless; say it needs careful use.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Introduction (Statistics for Economics)',
  sections: [
    {
      h: '1. Scarcity, choice and economics',
      t: 1,
      b: 'Human **wants are unlimited**, but the **resources** that can satisfy them are **scarce** and have **alternative uses**. So individuals and societies must **choose**. **Economics** studies how they choose to use scarce resources to satisfy wants.\n\nExample: an imagined family with ₹10,000 a month cannot buy everything; it puts food and school fees first and postpones a holiday.',
      terms: [
        ['Scarcity', 'The limited availability of resources compared with the wants they could satisfy.'],
        ['Economics', 'The study of how individuals and society choose to use scarce resources to satisfy their wants.'],
        ['Alternative uses', 'The possibility of putting the same resource to different purposes.'],
      ],
      v: vScarcityFlow,
      vs: [vWantsRes],
    },
    {
      h: '2. Economic activities and agents',
      t: 1,
      b: '**Consumption** is the use of goods and services to satisfy wants. **Production** is creating goods and services from inputs. **Distribution** is the sharing of the income of production among those who helped, as wages, rent, interest and profit.\n\nThe **economic agents** are **consumers**, **producers**, **service holders** and the **government**. A person can play more than one role.',
      terms: [
        ['Consumption', 'Using goods and services to satisfy human wants.'],
        ['Production', 'Creating goods and services using land, labour, capital and enterprise.'],
        ['Distribution', 'Sharing the income from production among the factors that contributed.'],
        ['Service holder', 'A person who earns a salary or wage by working for others.'],
      ],
      v: vActivities,
      vs: [vAgents],
    },
    {
      h: '3. Meaning of statistics',
      t: 1,
      b: 'In the **plural** sense, statistics means **numerical facts** (data), for example six imagined years of rainfall readings. In the **singular** sense, statistics is the **science** of **collecting, organising, presenting, analysing and interpreting** numerical data.',
      terms: [
        ['Statistics (plural)', 'Aggregates of numerical facts about a subject.'],
        ['Statistics (singular)', 'The science of collecting, organising, presenting, analysing and interpreting numerical data.'],
      ],
      v: vPlural,
    },
    {
      h: '4. Quantitative and qualitative data',
      t: 1,
      b: '**Quantitative data** are measured numerically (income, marks, price). **Qualitative data** are attributes (gender, region, preference); they cannot be measured but can be **counted by categories**, and shares can be found: **share = count in the category ÷ total × 100**.\n\nIn the imagined Sarangpur survey of 80 households, 32 earn mainly from farming: 32 ÷ 80 × 100 = 40 per cent.',
      terms: [
        ['Quantitative data', 'Data measured as numbers.'],
        ['Qualitative data', 'Data describing attributes, which can be counted by category.'],
      ],
      v: vKinds,
      vs: [vBars, vShares],
    },
    {
      h: '5. Scope, functions and importance of statistics in economics',
      t: 1,
      b: '1. **Presents facts** in a precise, definite form.\n2. **Condenses data** into summary measures such as averages and ratios.\n3. **Finds relationships** between economic factors, such as price and quantity demanded, or income and saving.\n4. **Forecasting** and **policy-making**, for example planning food stocks from past consumption.\n5. Used by **consumers, producers, government and researchers**.\n\n**Importance:** economic theories are tested with data, and policies are framed and judged with data.',
      terms: [
        ['Forecasting', 'Estimating future values from the trend in past data.'],
        ['Summary measure', 'A single figure, such as an average, that stands for many observations.'],
      ],
      v: vFunctions,
      vs: [vSalesAvg, vBun, vRice, vUsers],
    },
    {
      h: '6. Limitations of statistics',
      t: 1,
      b: '1. It deals with **aggregates**, not single individuals.\n2. Its results hold **on the average**, not in every case.\n3. It can be **misused** if data are collected carelessly or interpreted wrongly.\n\nThese limits call for careful use; they do not make statistics useless.',
      terms: [
        ['Aggregate', 'A total or group of units taken together, as opposed to a single unit.'],
      ],
      v: vLimits,
    },
  ],
  tips: '**Common mistakes**\n- Defining statistics in only one sense.\n- Calling an attribute such as occupation quantitative.\n- Confusing distribution (sharing the income of production) with the sale of goods.\n- Writing a percentage without showing the formula.\n- Saying an average holds for every individual.\n\n**Tips**\n- Use a specific example for every function.\n- Mention aggregates and average truth when judging a claim.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Economic problem**', 'Unlimited wants but scarce resources with alternative uses, so choices must be made.', 'definition', 1],
  ['**Economics**', 'The study of how individuals and society choose to use scarce resources to satisfy wants.', 'definition', 1],
  ['**Scarcity**', 'Resources are limited compared with the wants they could meet.', 'definition', 1],
  ['Why is choice unavoidable?', 'Resources are scarce and have **alternative uses**; using one way means giving up another.', 'concept', 1],
  ['Three economic activities', '**Consumption, production, distribution**.', 'fact', 1],
  ['**Consumption**', 'Using goods and services to satisfy wants.', 'definition', 1],
  ['**Production**', 'Creating goods and services from inputs.', 'definition', 1],
  ['**Distribution**', 'Sharing the income of production as wages, rent, interest and profit.', 'definition', 1],
  ['Four economic agents', '**Consumers, producers, service holders, the government**.', 'fact', 1],
  ['**Service holder**', 'A person who earns a salary or wage by working for others.', 'definition', 1],
  ['What does the government do as an agent?', 'Provides public services and raises revenue through taxes.', 'fact', 1],
  ['**Statistics** (plural)', 'Numerical facts or data.', 'definition', 1],
  ['**Statistics** (singular)', 'The science of collecting, organising, presenting, analysing and interpreting data.', 'definition', 1],
  ['Five stages of statistics', 'Collection, organisation, presentation, analysis, interpretation.', 'fact', 1],
  ['**Quantitative data**', 'Measured as numbers: income, marks, price.', 'definition', 1],
  ['**Qualitative data**', 'Attributes: gender, region, preference. Counted by category.', 'definition', 1],
  ['Can qualitative data be expressed in numbers?', 'Yes, by **counting** units in each category.', 'concept', 1],
  ['Formula for a percentage share', '**Share = count in the category ÷ total × 100**.', 'formula', 1],
  [`${HH[0][1]} of ${HHn} households farm. Share?`, `${HH[0][1]} ÷ ${HHn} × 100 = **${share(HH[0][1])}%**.`, 'example', 1],
  ['First function of statistics', 'It **presents facts** in a precise, definite form.', 'concept', 1],
  ['Second function of statistics', 'It **condenses** a mass of data into summary measures such as averages.', 'concept', 1],
  ['Third function of statistics', 'It helps to **find relationships**, such as price and quantity demanded.', 'concept', 1],
  ['Fourth function of statistics', '**Forecasting** and **policy-making**.', 'concept', 1],
  ['Who uses statistics?', 'Consumers, producers, the government and researchers.', 'fact', 1],
  [`Sales of ₹${SALES.map(inr).join(', ₹')} in six days. Average?`, `${inr(sum(SALES))} ÷ 6 = **₹${inr(SALESmean)}** a day.`, 'example', 1],
  ['Why do economists need data?', 'To **test theories** and to **frame and judge policies**.', 'concept', 1],
  ['First limitation of statistics', 'Deals with **aggregates**, not single individuals.', 'exam-tip', 1],
  ['Second limitation of statistics', 'Results are true **on the average**, not in every case.', 'exam-tip', 1],
  ['Third limitation of statistics', 'It can be **misused** if data or interpretation are careless.', 'exam-tip', 1],
  ['Is statistics useless because of its limits?', '**No.** The limits call for careful use of properly collected data.', 'exam-tip', 1],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short): Introduction',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_econ_def', 'm_function_present', 'm_agent_service', 'ar_misuse'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer the 2-mark questions in about 30 to 50 words and the 3-mark question in about 50 to 80 words.', items: ['s_agents', 's_condense', 's3_scope'] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80 to 120 words.', items: [{ attempt: 1, keys: ['l_economics', 'l_functions'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks)', instr: 'Read the passage and answer all parts. Part (c) has an internal choice.', items: ['cb_village'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long): Introduction',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_production', 'm_stat_singular', 'm_qual', 'm_function_forecast', 'm_user_producer', 'm_limit_aggregate', 'm_policy', 'm_rain_mean', 'ar_choice', 'ar_plural'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer the 2-mark questions in about 30 to 50 words and the 3-mark questions in about 50 to 80 words. Questions 13 and 15 have an internal choice.', items: ['s_scarce', 's_plural_sing', { attempt: 1, keys: ['s_limit_two', 's_distribution'] }, 's3_importance', { attempt: 1, keys: ['s3_qual_quant', 's3_limits'] }] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80 to 120 words each.', items: ['l_importance', { attempt: 1, keys: ['l_meaning', 'l_limits'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks each)', instr: 'Read each passage or table and answer all parts. Part (c) of each has an internal choice.', items: ['cb_bakery', 'cb_saving'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topic t01 of cbse-11-economics-ch01 only (meaning, scope, functions, importance and limitations of statistics in economics)',
    originality: 'every scenario, table and passage written for this chapter (imagined villages, shops, surveys and families); no NCERT text, example, table or exercise reused',
    data: 'every figure (rainfall mean, household shares, sales average, rice trend, bun sales fall, saving shares) computed with stats.mjs and pinned with check()',
    facts: 'definitions of economics, scarcity, the three economic activities, the four economic agents, the two senses of statistics, quantitative and qualitative data, functions and limitations of statistics',
    gate: 'schema, content lint and the deterministic verify checks run clean on this chapter',
  },
});
