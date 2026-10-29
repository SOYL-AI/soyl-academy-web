// Build CBSE 12 Political Science ch01 The End of Bipolarity. Run from platform/:
//   npx tsx content/authored/social-science/cbse-12-political-science-ch01/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-political-science-ch01', 'social-science');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG helpers
/** Ordinal timeline (equal spacing, not to scale): events = [[year, label], ...]; labels alternate above/below. */
function timeline(events, alt, caption, { w = 760, h = 230 } = {}) {
  const s = new Svg(w, h);
  const y = h / 2, x0 = 95, x1 = w - 95;
  s.arrow(x0 - 50, y, x1 + 60, y, { sw: 2 });
  const step = (x1 - x0) / (events.length - 1);
  events.forEach(([year, label], i) => {
    const x = x0 + i * step;
    const up = i % 2 === 0;
    s.dot(x, y, 6, 'accent');
    s.line(x, y, x, up ? y - 34 : y + 34, { sw: 1.2, color: 'muted' });
    s.text(x, up ? y - 46 : y + 46, String(year), { bold: true, size: 15, color: 'accent' });
    const lines = Array.isArray(label) ? label : [label];
    lines.forEach((ln, j) => s.text(x, up ? y - 66 - 16 * (lines.length - 1 - j) : y + 66 + 16 * j, ln, { size: 12 }));
  });
  return s.visual(alt, caption);
}

const vBlocs = (() => {
  const s = new Svg(720, 240);
  s.rect(20, 40, 250, 150, { color: 'blue', sw: 2 });
  s.text(145, 80, 'Western bloc', { bold: true, size: 16, color: 'blue' });
  s.text(145, 108, 'led by the United States', { size: 13 });
  s.text(145, 132, 'capitalism, NATO (1949)', { size: 13 });
  s.text(145, 156, 'the first world', { size: 13, muted: true });
  s.rect(450, 40, 250, 150, { color: 'red', sw: 2 });
  s.text(575, 80, 'Eastern bloc', { bold: true, size: 16, color: 'red' });
  s.text(575, 108, 'led by the Soviet Union', { size: 13 });
  s.text(575, 132, 'socialism, Warsaw Pact (1955)', { size: 13 });
  s.text(575, 156, 'the second world', { size: 13, muted: true });
  s.arrow(285, 100, 435, 100, { sw: 2, color: 'accent' });
  s.arrow(435, 130, 285, 130, { sw: 2, color: 'accent' });
  s.text(360, 82, 'rivalry', { size: 13, color: 'accent' });
  s.text(360, 152, 'arms race', { size: 13, color: 'accent' });
  s.text(360, 218, 'Two poles of power: bipolarity', { size: 14, bold: true });
  return s.visual('Diagram of the bipolar world: a Western bloc led by the United States with capitalism and NATO, and an Eastern bloc led by the Soviet Union with socialism and the Warsaw Pact, linked by two arrows for rivalry and the arms race', 'The Cold War world had two poles of power.');
})();

const vTimeline1 = timeline(
  [[1917, ['Russian', 'Revolution']], [1922, 'Soviet Union formed'], [1955, 'Warsaw Pact'], [1979, ['Troops enter', 'Afghanistan']], [1985, ['Gorbachev', 'takes over']], [1989, ['Berlin Wall', 'opened']], [1991, ['Union dissolved,', 'CIS formed']]],
  'Timeline from 1917 to 1991: Russian Revolution 1917, Soviet Union formed 1922, Warsaw Pact 1955, troops enter Afghanistan 1979, Gorbachev takes over 1985, Berlin Wall opened 1989, Union dissolved and CIS formed 1991',
  'Key dates, equally spaced (not to scale).',
);
const vTimeline1991 = timeline(
  [['Mar 1985', ['Gorbachev', 'leads party']], ['Nov 1989', ['Berlin Wall', 'opened']], ['1990', ['Baltic states', 'claim independence']], ['Aug 1991', ['Coup attempt', 'fails']], ['Dec 1991', ['CIS formed;', 'Gorbachev resigns']]],
  'Timeline of the collapse: March 1985 Gorbachev leads the party, November 1989 Berlin Wall opened, 1990 Baltic states claim independence, August 1991 coup attempt fails, December 1991 CIS formed and Gorbachev resigns',
  'From reform to break-up in six years.',
);
const vTimelineIR = timeline(
  [[1971, ['Treaty of Peace,', 'Friendship and', 'Cooperation']], [1991, ['Russia succeeds', 'the Soviet Union']], [2000, ['Strategic partnership', 'declared']], [2017, ['India a full', 'member of SCO']]],
  'Timeline of India and Russia: 1971 Treaty of Peace, Friendship and Cooperation; 1991 Russia succeeds the Soviet Union; 2000 strategic partnership declared; 2017 India becomes a full member of the Shanghai Cooperation Organisation',
  'India and the Soviet Union, then Russia.',
);

// ---------------------------------------------------------------- tables and flows
const vSystem = table(
  ['Area', 'Soviet system'],
  [
    ['Party', 'One party, the Communist Party, controlled the state'],
    ['Economy', 'Central planning; state ownership of land and industry'],
    ['Society', 'Jobs, health care, schooling and housing provided or subsidised by the state'],
    ['Power', 'Large bureaucracy; decisions from the top; little room for dissent'],
  ],
  'Table of the Soviet system: one-party rule by the Communist Party; central planning and state ownership; state-provided jobs and services; a large bureaucracy with decisions from the top',
);
const vStrengthWeak = table(
  ['Strengths', 'Weaknesses'],
  [
    ['Almost no unemployment', 'Shortages and long queues for consumer goods'],
    ['Subsidised health, education and housing', 'Poor quality; little innovation'],
    ['Strong heavy industry, energy, space and defence', 'Huge defence spending in the arms race'],
    ['Superpower status', 'No free elections; party not accountable to people'],
  ],
  'Two-column table of strengths and weaknesses of the Soviet system: jobs, subsidised services, heavy industry and superpower status against shortages, poor quality, defence burden and lack of political freedom',
);
const vArms = flow('LR', ['Arms race and space race', 'Large share of resources to defence', 'Less for consumer goods and civilian technology', 'Falling behind the West'], 'Flow: the arms race took a large share of resources, leaving less for consumer goods and civilian technology, so the Soviet Union fell behind the West', 'The cost of being a superpower');
const vReforms = table(
  ['Reform', 'Meaning', 'Example'],
  [
    ['Perestroika', 'Restructuring of the economy', 'More freedom for factories; some private businesses'],
    ['Glasnost', 'Openness', 'Freer press and public debate about the past and present'],
  ],
  'Table of Gorbachev\'s reforms: perestroika means restructuring of the economy, with more freedom for factories and some private businesses; glasnost means openness, with a freer press and public debate',
);
const vEastEurope = flow('LR', ['Gorbachev will not use force to keep allies', 'Protests across Eastern Europe', 'Communist governments fall in 1989', 'Germany unified in 1990'], 'Flow: Gorbachev would not use force to keep the allies, protests spread across Eastern Europe, communist governments fell in 1989 and Germany was unified in 1990', '1989 in Eastern Europe');
const vNationalism = table(
  ['Republics', 'What they demanded'],
  [
    ['Estonia, Latvia, Lithuania', 'Full independence, among the first to ask'],
    ['Ukraine, Georgia and others', 'Control over their own affairs and resources'],
    ['Russia under Yeltsin', 'Its own sovereignty against the Union centre'],
  ],
  'Table of nationalist demands: the Baltic republics demanded full independence first; Ukraine, Georgia and others wanted control of their own affairs; Russia under Yeltsin asserted its sovereignty against the Union centre',
);
const vCauses = flow('TB', ['Economic stagnation and shortages', 'Cost of the arms race and Afghanistan', 'Rigid one-party rule loses public trust', 'Reforms raise expectations', 'Nationalism in the republics', 'Break-up of the Union, December 1991'], 'Flow of causes: economic stagnation, the cost of the arms race and Afghanistan, rigid one-party rule, reforms that raised expectations and nationalism in the republics led to the break-up in December 1991', 'Many causes, one outcome');
const vConsequences = table(
  ['Consequence', 'What changed'],
  [
    ['End of the Cold War', 'The bloc rivalry and the arms race ended'],
    ['Unipolar moment', 'The United States became the only superpower'],
    ['Capitalism dominant', 'IMF and World Bank shaped economic policy in many states'],
    ['New countries', 'Fifteen states emerged; the Baltic states later joined the EU and NATO'],
  ],
  'Table of consequences: end of the Cold War, the United States as the only superpower, capitalism and the IMF and World Bank dominant, and fifteen new countries with the Baltic states later in the EU and NATO',
);
const vExample1 = table(
  ['Step', 'What to do with a source'],
  [
    ['1', 'Read the heading: who wrote it, when, where'],
    ['2', 'Underline facts that link to the syllabus (jobs, queues, targets)'],
    ['3', 'Name the concept the line shows (strength, weakness, lack of freedom)'],
    ['4', 'Quote the exact words when asked to identify a line'],
  ],
  'Table of four steps for reading a source: read the heading, underline facts linked to the syllabus, name the concept each line shows, and quote exact words when asked',
  'Applied to an imagined diary from Moscow, 1984.',
);
const vExample2 = table(
  ['Point', 'Cause (5 marks: one point each)'],
  [
    ['1', 'Economic stagnation and shortages'],
    ['2', 'Burden of the arms race and Afghanistan'],
    ['3', 'One-party rule loses legitimacy'],
    ['4', 'Reforms and nationalism in the republics'],
    ['5', 'Judgement: which cause mattered most, and why'],
  ],
  'Table planning a five-mark answer on the causes of the Soviet break-up: four causes, one per point, and a fifth point giving a judgement',
  'About 120 words: one idea per point, key word in bold.',
);
const vSummary1 = table(
  ['Topic', 'Key points'],
  [
    ['Soviet system', 'One party, planned economy, basic needs met, few consumer goods, little freedom'],
    ['Gorbachev', '1985; perestroika and glasnost; East Europe free in 1989'],
    ['Break-up', 'Nationalism, failed coup (August 1991), CIS (December 1991)'],
    ['Result', 'End of the Cold War; the United States the only superpower'],
  ],
  'Summary table of Part 1: the Soviet system, Gorbachev\'s reforms, the break-up in 1991 and its result',
);
const vTips1 = table(
  ['Common mistake', 'Write instead'],
  [
    ['Perestroika means openness', 'Perestroika is restructuring; glasnost is openness'],
    ['Gorbachev wanted to end the Union', 'He wanted to reform it; the break-up was unintended'],
    ['Ukraine took the UN seat', 'Russia, as successor state, took the permanent seat'],
  ],
  'Table of common mistakes in Part 1 and what to write instead',
);

const vTransition = flow('LR', ['Communist, state-run economy', 'Choice of path in 1991', 'Gradual reform', 'Shock therapy: sudden change'], 'Flow: from a communist state-run economy, countries chose in 1991 between gradual reform and shock therapy, a sudden change', 'How fast to change?');
const vShock = table(
  ['Measure', 'What it meant'],
  [
    ['Privatisation', 'State factories and farms sold to private owners'],
    ['Free prices', 'Prices set by the market, not the plan'],
    ['Free trade', 'Borders opened to foreign goods and investment'],
    ['Convertible currency', 'The currency could be exchanged freely'],
  ],
  'Table of shock-therapy measures: privatisation, prices set by the market, free trade and foreign investment, and a convertible currency',
  'Promoted by the World Bank and the IMF.',
);
const vShockChain = flow('LR', ['Rapid privatisation', 'Industries sold cheaply or closed', 'Prices soar, rouble loses value', 'Savings wiped out; inequality grows'], 'Flow of consequences: rapid privatisation, industries sold cheaply or closed, prices soar and the rouble loses value, savings are wiped out and inequality grows', 'The economic shock');
const vShockSocial = table(
  ['Area', 'Effect'],
  [
    ['Welfare', 'Old system of social protection dismantled'],
    ['Farming', 'Collective farms broke up; food supply suffered'],
    ['Society', 'A small rich group; many poor; a criminal economy'],
    ['Politics', 'Elections and constitutions, but weak parliaments and strong executives'],
  ],
  'Table of social and political effects of shock therapy: welfare dismantled, collective farms broke up, inequality and a criminal economy, elections with weak institutions',
);
const vEx3 = table(
  ['Line in the letter', 'Concept'],
  [
    ['Vouchers sold for a few bottles', 'Cheap privatisation, inequality'],
    ['Savings would not buy a coat', 'Inflation'],
    ['Collective farm split; little grain', 'Food insecurity'],
    ['Elections and newspapers now', 'Political change'],
  ],
  'Worked example table linking lines of an imagined 1993 letter to concepts: vouchers to cheap privatisation, lost savings to inflation, split farms to food insecurity, and elections to political change',
  'An imagined letter from a factory town, 1993.',
);
const vRussiaTension = table(
  ['Where', 'Tension after 1991'],
  [
    ['Chechnya, Dagestan (in Russia)', 'Violent secessionist movements'],
    ['Tajikistan', 'Civil war in the 1990s'],
    ['Georgia', 'Two regions sought to break away'],
    ['Baltic states', 'Left early; joined the EU and NATO in 2004'],
  ],
  'Table of tensions in former Soviet states: secessionist movements in Chechnya and Dagestan, civil war in Tajikistan, breakaway regions in Georgia, and the Baltic states joining the EU and NATO in 2004',
);
const vBalkans = flow('LR', ['Yugoslavia: many nations in one federation', 'Ethnic and national divisions after 1991', 'Break-up into several states', 'War in Bosnia; international intervention'], 'Flow: Yugoslavia, a federation of many nations, faced ethnic divisions after 1991, broke into several states, and saw war in Bosnia with international intervention', 'The Balkans');
const vCentral = table(
  ['Feature', 'Central Asian republics'],
  [
    ['Resources', 'Large reserves of oil and natural gas'],
    ['Location', 'Between Russia, China, South Asia and West Asia'],
    ['Outside interest', 'Several powers compete and cooperate for access'],
    ['Challenges', 'Civil war in Tajikistan; hardship in the transition'],
  ],
  'Table of Central Asian features: oil and gas reserves, a location between major regions, competition among outside powers, and challenges such as the civil war in Tajikistan',
);
const vCoop = table(
  ['Field', 'India and Russia'],
  [
    ['World order', 'Both prefer a multipolar world'],
    ['Defence', 'Long-standing supplier of military equipment'],
    ['Energy', 'Nuclear power, oil and gas'],
    ['Space and science', 'Joint projects and training'],
    ['Forums', 'BRICS and the SCO'],
  ],
  'Table of India and Russia cooperation: a multipolar world, defence, energy, space and science, and forums such as BRICS and the SCO',
);
const vEx4 = table(
  ['Mark', 'Feature of India–Russia ties'],
  [
    ['1', 'Shared vision of a multipolar world'],
    ['2', 'Defence supplies and joint production'],
    ['3', 'Energy and space cooperation'],
  ],
  'Worked example table for a three-mark answer: one mark each for a shared multipolar vision, defence ties, and energy and space cooperation',
  'Three features, one sentence each.',
);
const vSummary2 = table(
  ['Topic', 'Key points'],
  [
    ['Shock therapy', 'Rapid move to capitalism; World Bank and IMF; privatisation and free prices'],
    ['Consequences', 'Inflation, lost savings, closed industries, inequality, weak institutions'],
    ['New entities', 'Chechnya, Balkans, Tajikistan; Central Asian oil and gas'],
    ['India and Russia', '1971 treaty; multipolar vision; defence, energy, space; 2000 partnership'],
  ],
  'Summary table of Part 2: shock therapy, its consequences, tensions in new states, and India and Russia',
);
const vTips2 = table(
  ['Common mistake', 'Write instead'],
  [
    ['Shock therapy was gradual', 'It was sudden and all at once'],
    ['Chechnya is a Central Asian state', 'Chechnya is a region within Russia'],
    ['India and Russia want a unipolar world', 'Both prefer a multipolar world'],
  ],
  'Table of common mistakes in Part 2 and what to write instead',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'The End of Bipolarity — Part 1: The Soviet System and its Collapse',
  goals: [
    'Describe the features of the Soviet political and economic system',
    'Weigh the strengths and weaknesses of the Soviet system',
    'Explain Gorbachev\'s reforms and how they led to the break-up of the Soviet Union',
    'Explain the causes and consequences of the end of the Soviet Union',
  ],
  slides: [
    sl('title', 'The End of Bipolarity', {
      b: 'Part 1 — the **Soviet system**, **Gorbachev\'s reforms**, and why the Union broke up in **1991**.',
      v: flow('LR', ['A bipolar world', 'The Soviet system', 'Reform under Gorbachev', 'Collapse in 1991', 'A new world order'], 'Route map of Part 1: a bipolar world, the Soviet system, reform under Gorbachev, the collapse in 1991 and a new world order', 'Part 1 at a glance'),
      n: 'For more than forty years after the Second World War, world politics revolved around two superpowers. Then, in December 1991, one of them simply ceased to exist. In this part we look at how the Soviet system worked, why it ran into trouble, how Mikhail Gorbachev tried to reform it, and why those reforms ended in the break-up of the Soviet Union.',
    }),
    sl('diagram', 'A world with two poles', {
      v: vBlocs,
      n: 'Bipolarity means a world dominated by two poles of power. On one side stood the United States and its Western allies, committed to capitalism and joined in NATO. On the other side stood the Soviet Union and the socialist countries of Eastern Europe, joined in the Warsaw Pact. The two blocs competed for influence everywhere and raced to build more weapons.',
    }),
    sl('diagram', 'From revolution to collapse', {
      v: vTimeline1,
      n: 'Here is the long story in a few dates. The Russian Revolution of 1917 brought the communists to power, and the Soviet Union was formed in 1922. After the Second World War it led a bloc of East European states, tied together in the Warsaw Pact of 1955. In 1979 its troops entered Afghanistan. Gorbachev took over in 1985, and by December 1991 the Union was gone.',
    }),
    sl('concept', 'How the Soviet system worked', {
      v: vSystem,
      n: 'The Soviet system rested on a few pillars. Politically, one party, the Communist Party, ran the state, and no other party could compete. Economically, the state owned land and industry, and planners in Moscow decided what to produce. In return, the state promised every citizen a job and basic services. Power was concentrated at the top, in a large and often slow bureaucracy.',
    }),
    sl('check', 'Quick check: naming the blocs', {
      b: 'What were the East European countries that followed the Soviet model called?',
      chk: 'm_second_world',
      n: 'Remember the three worlds of the Cold War: the West, the Soviet bloc, and the newly independent countries.',
    }),
    sl('two-column', 'Strengths and weaknesses', {
      cols: ['**Strengths:** jobs for nearly all, subsidised services, heavy industry, superpower status.', '**Weaknesses:** shortages, poor quality, defence burden, no political freedom.'],
      v: vStrengthWeak,
      n: 'The Soviet system had real achievements. Unemployment was almost unknown, and health care, schooling and housing were cheap. It built heavy industry, matched the United States in space and weapons, and became a superpower. But ordinary goods were scarce and often poorly made, people queued for hours, defence swallowed huge resources, and citizens had no free elections to change their rulers.',
    }),
    sl('diagram', 'The burden of being a superpower', {
      v: vArms,
      n: 'Competing with the United States was very expensive. The arms race and the space race took a large share of the country\'s resources. That left less for consumer goods, housing and modern civilian technology. Over time the Soviet economy fell further behind the West. The long war in Afghanistan, which began in 1979, added to the strain.',
    }),
    sl('example', 'Worked example 1: reading a source', {
      b: 'An imagined diary of a Moscow teacher, 1984, mentions low rent, free schooling, a two-hour queue for boots and a meeting where no one asked questions. Which concepts does it show?',
      bl: ['Low rent, free school and clinic: **basic needs met**', 'Queue for boots: **shortage of consumer goods**', 'Silent staff meeting: **no freedom to question the party**', 'Quote the words when a question says identify the line'],
      v: vExample1,
      n: 'Let us practise with a source. A teacher in Moscow writes about cheap rent and free schooling: that shows basic needs being met. She queues two hours for boots: that shows shortages of consumer goods. At a staff meeting, no one asks questions: that shows the lack of political freedom. Name the concept, then quote the exact words from the source.',
    }),
    sl('check', 'Quick check: Afghanistan', {
      b: 'In which country did Soviet troops intervene in 1979?',
      chk: 'm_afghan',
      n: 'Think of the long war that began at the end of the nineteen seventies and lasted about ten years.',
    }),
    sl('concept', 'Gorbachev\'s reforms', {
      b: 'Gorbachev became party leader in **1985** and set out to **reform**, not end, the system.',
      v: vReforms,
      n: 'Mikhail Gorbachev became leader of the Communist Party in 1985. He wanted to revive the stagnant economy and catch up with the West. Perestroika means restructuring: factories got more freedom, and some private business was allowed. Glasnost means openness: newspapers could criticise, and people could discuss the past freely. His aim was to save the system by reforming it.',
    }),
    sl('check', 'Quick check: which reform?', {
      b: 'Factories get more freedom to decide what to produce. Which policy is this?',
      chk: 'm_perestroika',
      n: 'One reform was about the economy, the other about information and debate. Which one fits?',
    }),
    sl('diagram', '1989: Eastern Europe breaks free', {
      v: vEastEurope,
      n: 'Gorbachev also decided not to use force to keep the East European allies in line. In 1989, peaceful protests spread across the region, and one communist government after another fell. In November the Berlin Wall was opened, and Germany was unified in 1990. The Soviet bloc in Europe had ended within a single year.',
    }),
    sl('concept', 'Nationalism in the republics', {
      v: vNationalism,
      n: 'Inside the Soviet Union, the fifteen republics began to assert themselves. Estonia, Latvia and Lithuania were among the first to demand full independence. Ukraine, Georgia and others wanted control over their own affairs. Even Russia, under Boris Yeltsin, claimed sovereignty against the Union government. Glasnost had given people the freedom to voice demands that had long been suppressed.',
    }),
    sl('diagram', 'The final years', {
      v: vTimeline1991,
      n: 'Follow the last six years. Reform began in 1985. Eastern Europe broke free in 1989. The Baltic states claimed independence in 1990. In August 1991, hardliners tried to remove Gorbachev, but the coup failed amid public resistance led by Yeltsin. In December 1991 Russia, Ukraine and Belarus declared the Union ended and set up the Commonwealth of Independent States. Gorbachev resigned.',
    }),
    sl('check', 'Quick check: put events in order', {
      b: 'Arrange four events of the late Soviet period in the order they happened.',
      chk: 'ord_events',
      n: 'Start with the change of leadership and finish with the new commonwealth.',
    }),
    sl('diagram', 'Why did the Union collapse?', {
      v: vCauses,
      n: 'Historians point to several causes working together. The economy had stagnated, with shortages and falling behind in technology. The arms race and Afghanistan drained resources. One-party rule had lost the trust of many citizens. Gorbachev\'s reforms raised expectations they could not satisfy. And nationalism in the republics turned reform into break-up. Most textbooks treat nationalism as the most immediate cause.',
    }),
    sl('concept', 'Consequences for the world', {
      v: vConsequences,
      n: 'The end of the Soviet Union changed world politics. The Cold War and its arms race were over. The United States was left as the only superpower, a situation often called unipolar. Capitalism became the dominant model, and institutions like the IMF and the World Bank advised many countries. Fifteen new states appeared, and the Baltic states later joined the European Union and NATO.',
    }),
    sl('example', 'Worked example 2: a five-mark answer', {
      b: 'Question: *Examine the causes of the disintegration of the Soviet Union.* Plan five points of about 25 words each.',
      v: vExample2,
      n: 'For a five mark answer, plan five points. Give one cause per point: economic stagnation, the burden of the arms race and Afghanistan, the loss of trust in one party rule, and reforms together with nationalism. Use your fifth point for a judgement: which cause mattered most, and why. Put the key word of each point in bold, and keep to about one hundred and twenty words.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up: the Soviet system met basic needs but suffered from shortages, poor quality and a lack of freedom. Gorbachev tried to reform it from 1985 with perestroika and glasnost. Eastern Europe broke free in 1989, the republics demanded sovereignty, a coup failed in August 1991, and the Union was dissolved in December 1991, ending the bipolar world.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['One-mark items often test dates: **1985**, **1989**, **August 1991**, **December 1991**', 'Define perestroika and glasnost correctly; they are easy to swap', 'In source questions, **quote the line** when asked to identify it', 'Five-mark answers: five points plus a judgement'],
      v: vTips1,
      n: 'A few tips. One mark questions often test dates, so learn the four key years. Do not mix up perestroika and glasnost. When a source question asks you to identify a line, copy the exact words. And in five mark answers, give five clear points, with a short judgement at the end when the question asks you to evaluate.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'The End of Bipolarity — Part 2: Shock Therapy, New States and India–Russia Relations',
  goals: [
    'Explain shock therapy and assess its consequences',
    'Describe tensions in Russia, the Balkans and Central Asia after 1991',
    'Trace the main features of India\'s relations with Russia',
    'Answer source-based questions on the post-Soviet transition',
  ],
  slides: [
    sl('title', 'After the Collapse', {
      b: 'Part 2 — **shock therapy**, new states and their tensions, and **India and Russia**.',
      v: flow('LR', ['Choosing a path', 'Shock therapy', 'Its consequences', 'New states and tensions', 'India and Russia'], 'Route map of Part 2: choosing a path, shock therapy, its consequences, new states and tensions, and India and Russia', 'Part 2 at a glance'),
      n: 'The Soviet Union was gone, but its people and states remained. In this part we ask how the new states changed their economies, what that change cost ordinary people, what conflicts appeared in Russia, the Balkans and Central Asia, and how India built its relationship with Russia after the Cold War.',
    }),
    sl('diagram', 'How fast to change?', {
      v: vTransition,
      n: 'In 1991 the new governments faced a big choice. They could reform their state run economies step by step, or change everything at once. Most of them, encouraged by the World Bank and the International Monetary Fund, chose the fast route. This sudden transition to a market economy came to be called shock therapy.',
    }),
    sl('concept', 'What shock therapy meant', {
      v: vShock,
      n: 'Shock therapy had four main measures. State factories, farms and shops were privatised, that is, sold to private owners. Prices were freed, so the market rather than the plan decided them. Borders were opened to foreign goods and investment. And the currency was made convertible. Each measure on its own was a big change; together, they were made almost overnight.',
    }),
    sl('check', 'Quick check: identify the approach', {
      b: 'A government sells state factories, frees prices overnight and opens its borders. Which approach is it following?',
      chk: 'm_shock_measure',
      n: 'Notice the word overnight, and how many big changes happen together.',
    }),
    sl('diagram', 'The economic shock', {
      v: vShockChain,
      n: 'The results were painful. Many industries were sold far below their value, and others closed. Prices rose many times over, and the rouble lost most of its value. People who had saved for years found their savings almost worthless. Meanwhile a small group bought valuable assets cheaply and became very rich, so inequality grew sharply.',
    }),
    sl('concept', 'Social and political effects', {
      v: vShockSocial,
      n: 'The old system of social protection was largely dismantled. Collective farms broke up, and food supply suffered in places. A criminal economy and corruption spread. Politically, new constitutions and elections replaced one party rule, but parliaments, courts and the press were often weak, and power stayed concentrated in the hands of presidents and the executive.',
    }),
    sl('example', 'Worked example 1: linking a source to concepts', {
      b: 'An imagined 1993 letter from a factory town mentions vouchers sold cheaply, lost savings, a split collective farm and new elections. Link each line to a concept.',
      v: vEx3,
      n: 'Here is how to read a source about the transition. Workers selling their vouchers cheaply shows how privatisation concentrated wealth. Savings that cannot buy a coat show inflation. A split collective farm and little grain show food insecurity. Elections and newspapers show political change. Write the concept and quote the line that proves it.',
    }),
    sl('check', 'Quick check: what does not belong?', {
      b: 'Which measure would NOT be part of a shock-therapy programme?',
      chk: 'm_check_shock',
      n: 'Look for the option that belongs to the old Soviet way of running the economy.',
    }),
    sl('concept', 'Tensions in the former Soviet states', {
      v: vRussiaTension,
      n: 'Independence did not bring peace everywhere. Inside Russia, Chechnya and Dagestan saw violent secessionist movements in the nineteen nineties. Tajikistan went through a civil war. In Georgia, two regions sought to break away. The three Baltic states took a different road: they turned to the West and joined both the European Union and NATO in 2004.',
    }),
    sl('diagram', 'The Balkans', {
      v: vBalkans,
      n: 'In the Balkans, Yugoslavia had held together many nations in one federation. After 1991, ethnic and national divisions pulled it apart, and several independent states emerged. The war in Bosnia and Herzegovina was the most serious conflict, and it led to international intervention, including by NATO. Examiners expect you to describe these events factually, without taking sides.',
    }),
    sl('concept', 'Central Asia', {
      v: vCentral,
      n: 'The five Central Asian republics became independent in 1991. They hold large reserves of oil and natural gas and sit between Russia, China, South Asia and West Asia. So several outside powers have competed and cooperated for access to their resources and influence. These states also faced hard transitions, and Tajikistan suffered a civil war in the nineteen nineties.',
    }),
    sl('check', 'Quick check: secessionist regions', {
      b: 'In which two regions of Russia did violent secessionist movements arise in the 1990s?',
      chk: 'm_chechnya',
      n: 'Both regions lie in the Caucasus, inside Russia\'s borders.',
    }),
    sl('diagram', 'India and Russia over the years', {
      v: vTimelineIR,
      n: 'India and the Soviet Union were close partners, especially after the Treaty of Peace, Friendship and Cooperation of 1971. When Russia succeeded the Soviet Union, India kept the relationship going. In 2000 the two countries declared a strategic partnership with regular summits. Both are members of groupings such as BRICS and, since 2017, the Shanghai Cooperation Organisation.',
    }),
    sl('concept', 'Areas of cooperation', {
      v: vCoop,
      n: 'What holds the relationship together? Both countries prefer a multipolar world, with power shared among several centres. Russia has long supplied military equipment to India and cooperates in producing it. The two work together on nuclear power, oil and gas, and on space and science. India also builds ties with many other partners, but the Russian partnership remains important.',
    }),
    sl('check', 'Quick check: which partner?', {
      b: 'A report lists defence, nuclear energy and space as long-standing fields of partnership with one country. Which country?',
      chk: 'm_india_russia_area',
      n: 'Think of the partner that has supplied much of India\'s defence equipment over the decades.',
    }),
    sl('example', 'Worked example 2: a three-mark answer', {
      b: 'Question: *Explain any three features of India\'s relations with Russia after the Cold War.*',
      v: vEx4,
      n: 'For three marks, give three distinct features, one sentence each. First, a shared vision of a multipolar world. Second, defence ties, with Russian equipment and joint production. Third, cooperation in energy and space. Do not spend all three points on defence alone; examiners reward three different features.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up: after 1991 most post communist states chose shock therapy, a sudden move to capitalism. It brought inflation, lost savings, closed industries, inequality and weak institutions. New states faced tensions in Chechnya, the Balkans and Central Asia. India kept close ties with Russia, based on a multipolar vision and cooperation in defence, energy and space.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Define **shock therapy** with the word *sudden* and name the World Bank and IMF', 'Give both **economic** and **political** consequences', 'Place each conflict correctly: Chechnya in Russia, Bosnia in the Balkans, Tajikistan in Central Asia', 'India–Russia: name **different** fields of cooperation'],
      v: vTips2,
      n: 'Some final tips. When you define shock therapy, use the word sudden and mention the World Bank and the IMF. For consequences, cover both the economy and politics. Place each conflict in the right region. And for India and Russia, show range: world order, defence, energy, space, and the forums they share.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'The End of Bipolarity — Notes',
  sections: [
    {
      h: '1. The Soviet system',
      t: 1,
      b: 'After the 1917 revolution the **Soviet Union** (formed in 1922) built a socialist state. After the Second World War it led the **second world** of East European socialist states, bound by the **Warsaw Pact** (1955).\n\n**Features:** rule by one party, the **Communist Party of the Soviet Union**; a **planned economy** with state ownership of land and industry; a large bureaucracy and limited freedom of expression.\n\n**Achievements:** near-full employment; subsidised health care, schooling and housing; a strong industrial base, energy resources, and leadership in space and arms.\n\n**Problems:** consumer goods were scarce and often of low quality; enterprises had little reason to innovate; heavy **defence spending** in the arms race; the costly intervention in **Afghanistan** from 1979; citizens could not hold the party to account.',
      terms: [
        ['Bipolarity', 'A world order with two dominant centres of power, here the United States and the Soviet Union.'],
        ['Second world', 'The group of East European socialist states allied with the Soviet Union.'],
        ['Planned economy', 'An economy where the state owns productive assets and planners decide what to produce.'],
      ],
      v: vSystem,
      vs: [vStrengthWeak],
    },
    {
      h: '2. Gorbachev\'s reforms',
      t: 2,
      b: '**Mikhail Gorbachev** became General Secretary of the party in **1985**.\n\n- **Perestroika** (restructuring): looser central control of the economy, some private enterprise.\n- **Glasnost** (openness): freer press, open debate, re-examination of the past.\n- He chose not to use force in Eastern Europe; communist governments there fell in **1989**, the **Berlin Wall** was opened in November 1989, and Germany was unified in 1990.\n\nThe reforms raised hopes that the system could not meet quickly, and alarmed party conservatives.',
      terms: [
        ['Perestroika', 'Gorbachev\'s policy of restructuring the Soviet economy.'],
        ['Glasnost', 'Gorbachev\'s policy of openness in public life and information.'],
      ],
      v: vReforms,
      vs: [vEastEurope],
    },
    {
      h: '3. The disintegration of the Soviet Union',
      t: 2,
      b: '**Sequence:** the **Baltic republics** (Estonia, Latvia, Lithuania) pressed for independence; Russia under **Boris Yeltsin** asserted its own sovereignty; a **coup** by hardliners in **August 1991** failed; in **December 1991** Russia, Ukraine and Belarus declared the Union ended and formed the **Commonwealth of Independent States (CIS)**; Gorbachev resigned. **Russia** became the **successor state** and took the permanent seat in the UN Security Council.\n\n**Causes:** a stagnant economy; the burden of the arms race and Afghanistan; loss of faith in one-party rule; reforms that unleashed expectations; and, most immediately, **nationalism** in the republics.\n\n**Consequences:** end of the **Cold War**; the United States as sole superpower (a **unipolar** moment); capitalism and the **IMF and World Bank** as dominant influences; **fifteen** new states, with the Baltic states joining the EU and NATO in **2004**.',
      terms: [
        ['CIS', 'Commonwealth of Independent States: a loose association of former Soviet republics formed in December 1991.'],
        ['Successor state', 'The state that takes over the international rights and obligations of a dissolved state; for the Soviet Union, Russia.'],
        ['Unipolar', 'A world order with one dominant power.'],
      ],
      v: vTimeline1991,
      vs: [vCauses, vConsequences],
    },
    {
      h: '4. Shock therapy',
      t: 3,
      b: 'The rapid, all-at-once move from a state-controlled to a capitalist economy, backed by the **World Bank** and the **IMF**.\n\n**Measures:** privatisation of state assets; market prices; free trade and foreign investment; a convertible currency; private farms in place of collective farms.\n\n**Consequences:**\n- Industries sold below value or closed; output fell.\n- High **inflation**; the **rouble** lost value and savings vanished.\n- Collective farms broke up, hurting **food security**.\n- Welfare dismantled; **inequality** and a **criminal economy** grew.\n- Elections and constitutions arrived, but institutions stayed weak and the executive strong.\n- Later recovery in Russia relied largely on **oil and gas** exports.',
      terms: [
        ['Shock therapy', 'A sudden transition from a socialist planned economy to a market economy.'],
        ['Privatisation', 'Transfer of state-owned enterprises and assets to private owners.'],
      ],
      v: vShock,
      vs: [vShockChain, vShockSocial],
    },
    {
      h: '5. New entities and tensions',
      t: 4,
      b: '- **Russia:** violent secessionist movements in **Chechnya** and **Dagestan** in the 1990s.\n- **Central Asia:** five new republics with large **oil and gas** reserves, attracting outside powers; **Tajikistan** went through a civil war in the 1990s.\n- **Caucasus:** two regions of **Georgia** sought to break away.\n- **Balkans:** **Yugoslavia** broke into several states along ethnic lines; the war in **Bosnia and Herzegovina** led to international intervention.\n- **Baltic states:** joined the **EU** and **NATO** in 2004.\n\nWrite about these events factually and neutrally; questions test what happened and why, not which side was right.',
      terms: [
        ['Secessionist movement', 'A movement seeking to separate a region from a state.'],
        ['Balkans', 'A region of south-eastern Europe, including the states that emerged from Yugoslavia.'],
      ],
      v: vRussiaTension,
      vs: [vBalkans, vCentral],
    },
    {
      h: '6. India and Russia',
      t: 4,
      b: 'India and the Soviet Union were close partners, marked by the **Treaty of Peace, Friendship and Cooperation (1971)**. After 1991, India continued the relationship with **Russia**.\n\n- **Shared vision:** a **multipolar** world, collective security, a strong role for the UN.\n- **Defence:** Russia has long been a major supplier of India\'s military equipment, with joint production.\n- **Energy:** cooperation in nuclear power, and in oil and gas.\n- **Science and space:** joint projects and training.\n- **Partnership:** a declaration on **strategic partnership** in **2000**; annual summits; both are members of **BRICS** and the **SCO** (India a full member since 2017).\n\nIndia also diversifies its partners, keeping its foreign policy independent.',
      terms: [
        ['Multipolar world', 'A world order with several centres of power rather than one or two.'],
        ['Strategic partnership', 'A long-term framework for cooperation across many fields between two countries.'],
      ],
      v: vTimelineIR,
      vs: [vCoop],
    },
  ],
  tips: '**Common mistakes**\n- Swapping **perestroika** (restructuring) and **glasnost** (openness).\n- Saying Gorbachev set out to end the Union: he set out to **reform** it.\n- Writing that Ukraine took the Soviet seat in the Security Council: it was **Russia**.\n- Calling shock therapy gradual: it was **sudden**.\n- Placing Chechnya in Central Asia: it is a region **within Russia**.\n\n**How marks are usually awarded**\n- 1 mark: one correct option, date or term.\n- 2 marks: two points, about 30–50 words.\n- 3 marks: three distinct points, about 50–80 words.\n- 5 marks: five points, about 80–120 words; for *evaluate* or *examine*, end with a judgement.\n- Source-based (4 marks): read the heading first; quote lines when asked to identify; link each line to a concept.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['What does **bipolarity** mean?', 'A world dominated by **two** superpowers and their blocs: the United States and the Soviet Union.', 'definition', 2],
  ['When was the **Soviet Union** formed?', '**1922**, after the Russian Revolution of 1917.', 'fact', 1],
  ['What was the **second world**?', 'The East European socialist states allied with the Soviet Union.', 'definition', 1],
  ['The **Warsaw Pact**', 'Military alliance of the Soviet bloc, set up in **1955**.', 'fact', 1],
  ['Two political features of the Soviet system', '**One-party rule** by the Communist Party; centralised, bureaucratic power.', 'concept', 1],
  ['Two economic features of the Soviet system', '**Central planning**; **state ownership** of land and industry.', 'concept', 1],
  ['Two strengths of the Soviet system', 'Almost no **unemployment**; subsidised **health, schooling and housing**.', 'concept', 1],
  ['Two weaknesses of the Soviet system', '**Shortages** and poor quality of consumer goods; **no political freedom**.', 'concept', 1],
  ['Soviet intervention in **Afghanistan**', 'Began in **1979**; a long, costly campaign.', 'fact', 1],
  ['When did Gorbachev become party leader?', '**1985**.', 'fact', 2],
  ['**Perestroika**', '**Restructuring** of the economy.', 'definition', 2],
  ['**Glasnost**', '**Openness**: freer information and debate.', 'definition', 2],
  ['When was the **Berlin Wall** opened?', '**November 1989**; Germany unified in 1990.', 'fact', 2],
  ['First republics to demand independence', 'The **Baltic** republics: Estonia, Latvia, Lithuania.', 'fact', 2],
  ['What happened in **August 1991**?', 'A **coup** by hardliners against Gorbachev **failed**; Yeltsin led the resistance.', 'fact', 2],
  ['What happened in **December 1991**?', 'Russia, Ukraine and Belarus ended the Union and formed the **CIS**; Gorbachev resigned.', 'fact', 2],
  ['Who took the Soviet seat in the UN Security Council?', '**Russia**, as successor state.', 'fact', 2],
  ['Most immediate cause of the break-up', '**Nationalism** and demands for sovereignty in the republics.', 'concept', 2],
  ['Three consequences of the break-up', 'End of the **Cold War**; **unipolar** world; **capitalism** dominant; new states.', 'concept', 2],
  ['**Shock therapy**', 'A **sudden** transition from a planned economy to capitalism, backed by the **World Bank** and **IMF**.', 'definition', 3],
  ['Four measures of shock therapy', 'Privatisation; free prices; free trade and foreign investment; convertible currency.', 'concept', 3],
  ['Economic effects of shock therapy', '**Inflation**, lost savings, industries sold cheap or closed, falling output.', 'concept', 3],
  ['Social effects of shock therapy', 'Welfare dismantled; **inequality**; criminal economy; food insecurity.', 'concept', 3],
  ['Political effects of the transition', 'Elections and constitutions, but **weak institutions** and a strong executive.', 'concept', 3],
  ['Secessionist regions in Russia', '**Chechnya** and **Dagestan**.', 'fact', 4],
  ['Why is Central Asia important to outside powers?', 'Large **oil and gas** reserves and a key location.', 'concept', 4],
  ['Which Central Asian state had a civil war in the 1990s?', '**Tajikistan**.', 'fact', 4],
  ['What happened to **Yugoslavia**?', 'Broke into several states along ethnic lines; war in **Bosnia**; international intervention.', 'fact', 4],
  ['Baltic states and the West', 'Joined the **EU** and **NATO** in **2004**.', 'fact', 4],
  ['India–Soviet treaty', '**Treaty of Peace, Friendship and Cooperation, 1971**.', 'fact', 4],
  ['India–Russia: shared vision', 'A **multipolar** world; collective security; strong UN.', 'concept', 4],
  ['India–Russia: fields of cooperation', 'Defence, nuclear energy, oil and gas, space; **strategic partnership** declared in 2000.', 'exam-tip', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-political-science-chapter-test-short',
  title: 'Chapter test (short) — The End of Bipolarity',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_economy_feature', 'm_glasnost', 'm_shock_def', 'ar_reforms'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_glas_pere', 's_shock_two', 's3_india_russia'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_causes', 'l_shock'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks)', instr: 'Read the source and answer all parts. Part (c) has an internal choice.', items: ['src_report'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-political-science-chapter-test-long',
  title: 'Chapter test (long) — The End of Bipolarity',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_party', 'm_strength', 'm_weakness', 'm_coup', 'm_cis', 'm_shock_effect', 'm_yugoslavia', 'm_india_russia_vision', 'ar_planning', 'ar_rouble'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_features', 's_nationalism', { attempt: 1, keys: ['s_unipolar', 's_tensions'] }, 's3_consequences', { attempt: 1, keys: ['s3_shock_inequality', 's3_stagnation'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_india_russia', { attempt: 1, keys: ['l_gorbachev', 'l_new_states'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks each)', instr: 'Read each source and answer all parts. Part (c) of each has an internal choice.', items: ['src_teacher', 'src_engineer'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 of cbse-12-political-science-ch01 only (Soviet system; Gorbachev and the disintegration; shock therapy; new entities and India–Russia relations)',
    originality: 'every source (diary, newspaper report, letter, seminar notes, travel journal) is imagined, written by SOYL and labelled; no NCERT text, boxed source or cartoon, and no board or sample-paper item reused (D-036)',
    facts: 'stable dates only: 1917, 1922, 1955 Warsaw Pact, 1971 treaty, 1979 Afghanistan, 1985 Gorbachev, November 1989 Berlin Wall, 1990 German unification, August 1991 coup, December 1991 CIS, 2000 strategic partnership, 2004 Baltic states in EU and NATO, 2017 India in SCO; nothing after 2024',
    neutrality: 'conflicts (Chechnya, Bosnia, Tajikistan, Georgia) stated as facts without judgement; India–Russia relations described by stable, broad features',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
