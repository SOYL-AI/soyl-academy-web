// Build ICSE 9 History & Civics ch17 The Modern Age in Europe: Industrial Revolution, Capitalism and Socialism. Run from platform/:
//   npx tsx content/authored/social-science/icse-9-history-civics-ch17/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../icse-9-history-civics-ch01/src/lib.mjs';

setUnit('icse-9-history-civics-ch17', 'social-science');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG figures (own drawings, schematic)
function boxes(s, list, o = {}) {
  list.forEach(([x, y, w, h, col, title, lines]) => {
    s.rect(x, y, w, h, { rx: 10, fill: col, fillOpacity: 0.12, color: col, sw: 1.8 });
    s.text(x + w / 2, y + 20, title, { size: o.ts ?? 13, bold: true });
    lines.forEach((t, k) => s.text(x + w / 2, y + 42 + k * 17, t, { size: 12 }));
  });
}

function causesWeb(alt, caption) {
  const s = new Svg(730, 332);
  // connectors first, boxes on top
  s.line(92, 94, 250, 124, { sw: 1.4, color: 'muted' });
  s.line(274, 94, 274, 124, { sw: 1.4, color: 'muted' });
  s.line(456, 94, 456, 124, { sw: 1.4, color: 'muted' });
  s.line(638, 94, 480, 124, { sw: 1.4, color: 'muted' });
  s.line(92, 238, 250, 208, { sw: 1.4, color: 'muted' });
  s.line(274, 238, 274, 208, { sw: 1.4, color: 'muted' });
  s.line(456, 238, 456, 208, { sw: 1.4, color: 'muted' });
  s.line(638, 238, 480, 208, { sw: 1.4, color: 'muted' });
  s.line(174, 166, 204, 166, { sw: 1.4, color: 'muted' });
  s.line(526, 166, 556, 166, { sw: 1.4, color: 'muted' });
  boxes(s, [
    [10, 10, 164, 84, 'blue', 'Capital', ['Profits from trade', 'and colonies']],
    [192, 10, 164, 84, 'blue', 'Coal and iron', ['Deposits found', 'close together']],
    [374, 10, 164, 84, 'green', 'Colonies', ['Raw materials and', 'markets for goods']],
    [556, 10, 164, 84, 'green', 'Cheap labour', ['Enclosure and farm', 'changes sent people', 'to the towns']],
    [10, 124, 164, 84, 'accent', 'Canals and roads', ['Moved coal, cotton', 'and goods']],
    [556, 124, 164, 84, 'accent', 'Spirit of invention', ['People tried out', 'new ideas']],
    [10, 238, 164, 84, 'green', 'Navy and shipping', ['Protected and', 'carried trade']],
    [192, 238, 164, 84, 'blue', 'Political stability', ['Steady government', 'helped investment']],
    [374, 238, 164, 84, 'blue', 'Banking system', ['Bank of England,', 'founded 1694']],
    [556, 238, 164, 84, 'green', 'Farming', ['Agricultural revolution', 'fed more people']],
  ]);
  s.rect(204, 124, 322, 84, { rx: 12, fill: 'accent', fillOpacity: 0.2, color: 'accent', sw: 2.2 });
  s.text(365, 152, 'Why England first?', { size: 16, bold: true });
  s.text(365, 178, 'Many causes worked together', { size: 13 });
  return s.visual(alt, caption);
}

function inventionsTimeline(alt, caption) {
  const s = new Svg(760, 330);
  const X = (yr) => 40 + ((yr - 1700) * 640) / 140;
  s.arrow(30, 165, 750, 165, { sw: 1.8 });
  // [year, y of label, anchor, line1, line2, colour]
  const ev = [
    [1709, 40, 'start', '1709', 'Darby: coke iron', 'blue'],
    [1733, 240, 'start', '1733', 'Kay: flying shuttle', 'green'],
    [1764, 95, 'end', 'About 1764', 'Hargreaves: jenny', 'green'],
    [1769, 40, 'start', '1769', 'Watt: steam engine', 'blue'],
    [1769, 272, 'start', '1769', 'Arkwright: water frame', 'green'],
    [1779, 95, 'start', '1779', 'Crompton: mule', 'green'],
    [1785, 240, 'start', '1785', 'Cartwright: power loom', 'green'],
    [1829, 240, 'start', '1829 and 1830', 'Rocket, railway', 'accent'],
  ];
  ev.forEach(([yr, y, anc, a, b, col]) => {
    const x = X(yr);
    const up = y < 165;
    s.line(x, 165, x, up ? y + 22 : y - 14, { sw: 1.3, color: col });
    s.dot(x, 165, 5, col);
    const tx = anc === 'start' ? x + 6 : x - 6;
    s.text(tx, y, a, { size: 13, bold: true, anchor: anc });
    s.text(tx, y + 17, b, { size: 12, anchor: anc });
  });
  s.text(380, 316, 'Drawn to scale from 1700 to 1840', { size: 11, muted: true });
  return s.visual(alt, caption);
}

function comparisonChart(alt, caption) {
  const s = new Svg(730, 372);
  const cols = [[10, 140], [160, 280], [450, 270]];
  const heads = ['Feature', 'Capitalism', 'Socialism'];
  heads.forEach((h, i) => {
    const [x, w] = cols[i];
    s.rect(x, 8, w, 36, { rx: 8, fill: i === 0 ? 'accent' : i === 1 ? 'blue' : 'green', fillOpacity: 0.2, color: i === 0 ? 'accent' : i === 1 ? 'blue' : 'green', sw: 1.8 });
    s.text(x + w / 2, 26, h, { size: 14, bold: true });
  });
  const rows = [
    ['Ownership', 'Mainly private', 'Society or the state'],
    ['Motive', 'Profit', 'Social welfare'],
    ['Prices and output', 'Market: demand and supply', 'Planning guides production'],
    ['Income', 'Depends on market returns', 'Aim: share more evenly'],
    ['Role of the state', 'Limited (laissez-faire)', 'Larger: planning, welfare'],
    ['Competition', 'Central feature', 'Less stress; cooperation'],
  ];
  rows.forEach(([a, b, c], r) => {
    const y = 52 + r * 52;
    [a, b, c].forEach((t, i) => {
      const [x, w] = cols[i];
      s.rect(x, y, w, 44, { rx: 8, fill: i === 0 ? 'accent' : i === 1 ? 'blue' : 'green', fillOpacity: i === 0 ? 0.08 : 0.1, color: 'muted', sw: 1.2 });
      s.text(x + w / 2, y + 22, t, { size: 13, bold: i === 0 });
    });
  });
  return s.visual(alt, caption);
}

function conditionsFlow(alt, caption) {
  const s = new Svg(730, 340);
  s.arrow(240, 170, 270, 170, { sw: 1.6, color: 'muted' });
  [45, 127, 209, 291].forEach((y) => s.arrow(440, 170, 478, y, { sw: 1.4, color: 'muted' }));
  s.rect(10, 10, 230, 320, { rx: 10, fill: 'blue', fillOpacity: 0.12, color: 'blue', sw: 1.8 });
  s.text(125, 32, 'Conditions of workers', { size: 14, bold: true });
  ['Hours of 12 to 16 a day', 'Low wages', 'Child and women\'s labour', 'Unsafe machines', 'Crowded slums and disease', 'No job security'].forEach((t, k) => s.text(125, 80 + k * 38, t, { size: 12 }));
  s.rect(270, 115, 170, 110, { rx: 10, fill: 'accent', fillOpacity: 0.2, color: 'accent', sw: 2 });
  s.text(355, 148, 'A widening gap', { size: 14, bold: true });
  s.text(355, 172, 'between owners', { size: 12 });
  s.text(355, 190, 'and workers', { size: 12 });
  boxes(s, [
    [480, 10, 240, 70, 'green', 'Early socialist thinkers', ['Owen, Saint-Simon, Fourier']],
    [480, 92, 240, 70, 'green', 'Marx and Engels', ['The Communist Manifesto, 1848']],
    [480, 174, 240, 70, 'green', 'Trade unions', ['Workers bargain together']],
    [480, 256, 240, 70, 'green', 'Factory Acts', ['Law of 1833 limits child labour']],
  ]);
  return s.visual(alt, caption);
}

const vWeb = causesWeb('Causes web: Why England first, at the centre, with ten boxes around it: capital, coal and iron, colonies, cheap labour, canals and roads, spirit of invention, navy and shipping, political stability, banking system and farming', 'Causes of the Industrial Revolution in England.');
const vInv = inventionsTimeline('A time arrow from 1700 to 1840 drawn to scale: Darby coke iron 1709, Kay flying shuttle 1733, Hargreaves jenny about 1764, Watt steam engine 1769, Arkwright water frame 1769, Crompton mule 1779, Cartwright power loom 1785, Rocket and railway 1829 and 1830', 'Inventions, 1709 to 1830 (to scale).');
const vChart = comparisonChart('Comparison chart of capitalism and socialism on six features: ownership, motive, prices and output, income, role of the state, and competition', 'Capitalism and socialism side by side.');
const vFlow = conditionsFlow('Flow from the conditions of workers, long hours, low wages, child and women labour, unsafe machines, slums and no job security, to a widening gap between owners and workers, and then to four responses: early socialist thinkers, Marx and Engels, trade unions and Factory Acts', 'From factory conditions to socialist ideas.');

// ---------------------------------------------------------------- tables and flows: Part 1
const vRoute1 = flow('LR', ['Meaning and dates', 'Why England: the causes', 'Inventions', 'Changes it brought'], 'Route map of Part 1: the meaning and dates of the Industrial Revolution, why it began in England, the inventions, and the changes it brought', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Capitalism: meaning and rise', 'Conditions of workers', 'Socialism: ideas and thinkers', 'Comparing the two'], 'Route map of Part 2: capitalism, its meaning and rise, the conditions of workers, socialism and its thinkers, and a comparison of the two', 'Part 2 at a glance');
const vMeaning = table(['Point', 'Fact'], [
  ['What it was', 'A change from hand production in homes and workshops to machine production in factories'],
  ['Power used', 'Water first, then steam'],
  ['Where it began', 'England'],
  ['When', 'From about the 1750s or 1760s to about the 1830s or 1840s'],
  ['Then', 'It spread to other countries'],
], 'Table on the Industrial Revolution: a change from hand production in homes and workshops to machine production in factories, using water and then steam power, beginning in England from about the 1750s or 1760s, lasting to about the 1830s or 1840s, and then spreading to other countries');
const vSpread = flow('LR', ['About 1750s and 1760s: begins in England', 'About 1830s and 1840s: first phase complete', 'Then spreads to other countries'], 'Flow: the Industrial Revolution begins in England about the 1750s and 1760s, the first phase is complete about the 1830s and 1840s, and it then spreads to other countries', 'When and where.');
const vOldNew = table(['', 'Before: the domestic system', 'After: the factory system'], [
  ['Place of work', 'Homes and small workshops', 'Large factories and mills'],
  ['Tools', 'Hand tools, hand wheel, hand loom', 'Machines driven by power'],
  ['Power', 'Human and animal strength', 'Water, then steam'],
  ['Workers', 'Families working at their own pace', 'Workers under fixed hours and a master'],
], 'Table comparing the domestic system with homes, hand tools, human and animal strength and families at their own pace, with the factory system of large mills, machines, water and steam power and workers under fixed hours');
const vCapColonies = table(['Cause', 'How it helped'], [
  ['Capital from trade and colonies', 'Merchants had money to invest in mills, machines and ships'],
  ['Colonies', 'Supplied raw materials such as cotton, and were markets for finished goods'],
  ['Banking system', 'The Bank of England (1694) and other banks lent money'],
], 'Table of three causes: capital from trade and colonies for investment, colonies supplying raw materials such as cotton and markets, and the banking system including the Bank of England of 1694');
const vCoalLab = flow('LR', ['Common land is fenced: enclosure', 'Farm families lose access to the land', 'They move to the towns', 'Cheap labour for factories'], 'Flow: common land is fenced in the enclosure movement, farm families lose access to the land, they move to the towns, and they become cheap labour for factories', 'Enclosure and labour.');
const vCoal = table(['Cause', 'Why it mattered'], [
  ['Coal', 'Fuel for furnaces and later for steam engines'],
  ['Iron ore', 'Raw material for machines, rails and engines'],
  ['Close together', 'Supplies were cheap and quick to move'],
], 'Table: coal was fuel for furnaces and steam engines, iron ore was the raw material for machines, and having them close together made supplies cheap and quick');
const vNavy = table(['Cause', 'How it helped'], [
  ['Large navy and merchant shipping', 'Protected trade routes and carried raw materials and goods'],
  ['Political stability', 'Steady government made owners willing to invest for the long term'],
  ['Agricultural revolution', 'Better farming fed a growing population, including town workers'],
], 'Table of three causes: a large navy and merchant shipping protecting and carrying trade, political stability encouraging investment, and the agricultural revolution feeding a growing population');
const vTrans = table(['Cause', 'How it helped'], [
  ['Canals and roads', 'Moved coal, cotton and finished goods between mines, mills and ports'],
  ['Spirit of invention', 'Many people tried, improved and patented new machines'],
], 'Table of two causes: canals and roads moving coal, cotton and goods, and a spirit of invention in which many people tried and patented new machines');
const vScenes = table(['Imagined scene', 'Cause'], [
  ['A merchant of Tanwick invests his profits from the sale of cloth overseas', 'Capital from trade and colonies'],
  ['A cotton ship from the colonies unloads at Tanwick quay', 'Colonies: raw materials'],
  ['Coal and iron ore lie a few miles apart in Greywater', 'Coal and iron close together'],
  ['Families leave Ashgrove after its common land is fenced', 'Enclosure: cheap labour'],
  ['A banker in Tanwick lends to a mill builder', 'Banking system'],
], 'Table sorting five imagined scenes to causes: investing profits is capital, a cotton ship is colonies, coal and iron a few miles apart is minerals close together, families leaving fenced land is enclosure, and a loan is the banking system');
const vTextile = table(['Machine', 'Inventor', 'Year', 'What it did'], [
  ['Flying shuttle', 'John Kay', '1733', 'Sped up hand weaving'],
  ['Spinning jenny', 'James Hargreaves', 'About 1764', 'Spun several threads at once'],
  ['Water frame', 'Richard Arkwright', '1769', 'Spun thread by water power in mills'],
  ['Mule', 'Samuel Crompton', '1779', 'Spun fine, strong thread'],
  ['Power loom', 'Edmund Cartwright', '1785', 'Wove cloth by power'],
], 'Table of five textile machines with inventor, year and use: flying shuttle by John Kay 1733, spinning jenny by James Hargreaves about 1764, water frame by Richard Arkwright 1769, mule by Samuel Crompton 1779, and power loom by Edmund Cartwright 1785');
const vPower = table(['Invention', 'Person', 'Date', 'Importance'], [
  ['Smelting iron with coke', 'Abraham Darby', 'About 1709', 'Cheaper, plentiful iron'],
  ['Improved steam engine', 'James Watt', 'Patent 1769', 'Power not tied to rivers'],
  ['Locomotive Rocket', 'George Stephenson', '1829', 'Showed the steam locomotive'],
  ['Liverpool to Manchester railway', 'Stephenson and others', '1830', 'Fast rail for goods and people'],
], 'Table of iron, power and transport: Abraham Darby smelting iron with coke about 1709, James Watt improved steam engine patent 1769, George Stephenson locomotive Rocket 1829, and the Liverpool to Manchester railway of 1830');
const vChanges = table(['Area', 'Change'], [
  ['Industry', 'Factories, machines, mass production of cloth and iron goods'],
  ['Transport', 'Canals, better roads, then railways'],
  ['Society', 'Growth of factory towns; new classes of owners and workers'],
], 'Table of changes: industry with factories and mass production, transport with canals, roads and railways, and society with factory towns and new classes of owners and workers');
const vPlan1 = table(['Part', 'Marks', 'Points to include'], [
  ['(i)', '3', 'Meaning, England, and the dates'],
  ['(ii)', '3', 'Capital, colonies, coal and iron'],
  ['(iii)', '4', 'Labour, farming, banking, shipping, stability'],
], 'Table planning a ten-mark answer: part (i) meaning, England and dates for 3 marks, part (ii) capital, colonies, coal and iron for 3 marks, part (iii) labour, farming, banking, shipping and stability for 4 marks');
const vSummary1 = table(['Heading', 'Key points'], [
  ['Meaning', 'Hand production to machine production in factories, water then steam'],
  ['Dates', 'England from about the 1750s or 1760s; to about the 1830s or 1840s'],
  ['Causes', 'Capital, colonies, coal and iron, labour, navy, stability, banks, farming, canals, invention'],
  ['Inventions', 'Kay 1733, Hargreaves about 1764, Arkwright 1769, Crompton 1779, Cartwright 1785, Watt 1769, Darby about 1709, Stephenson 1829 and 1830'],
], 'Summary table of Part 1: meaning, dates, causes and inventions');

// ---------------------------------------------------------------- tables and flows: Part 2
const vCapMeaning = table(['Point', 'Fact'], [
  ['Ownership', 'Land, factories and machines (the means of production) are privately owned'],
  ['Motive', 'Production is run for profit'],
  ['Prices', 'Set by market demand and supply'],
  ['Competition', 'Producers compete for customers'],
  ['Workers', 'Are paid wages'],
], 'Table on capitalism: privately owned means of production, production for profit, prices set by demand and supply, competition between producers, and workers paid wages');
const vCapNeeds = flow('LR', ['Factories and machines cost a great deal', 'Large capital is needed', 'Investors, banks and companies supply it', 'Capitalism grows'], 'Flow: factories and machines cost a great deal, so large capital is needed, investors, banks and companies supply it, and capitalism grows', 'Why capital mattered.');
const vCapCauses = table(['Cause of the rise of capitalism', 'In brief'], [
  ['Need for capital', 'Factories and machines needed large sums'],
  ['Investment of profits', 'Merchants and entrepreneurs put profits back into business'],
  ['Banks and joint-stock companies', 'Pooled the savings of many people'],
  ['Trade and colonies', 'Expanded markets and supplies'],
  ['The middle class', 'Grew in size and put its money into business'],
  ['Free trade and laissez-faire', 'Ideas of limited state interference spread'],
], 'Table of six causes for the rise of capitalism: the need for capital, investment of profits, banks and joint-stock companies, trade and colonies, the growth of the middle class, and ideas of free trade and laissez-faire');
const vJoint = flow('LR', ['Company sells shares', 'Many investors each pay a part', 'Large capital is gathered', 'Each risks only what he or she paid'], 'Flow: a company sells shares, many investors each pay a part, large capital is gathered, and each shareholder risks only the amount paid', 'A joint-stock company.');
const vLaissez = table(['Idea', 'Meaning'], [
  ['Free trade', 'Trade with few controls or duties'],
  ['Laissez-faire', 'The state interferes as little as possible in trade and business'],
  ['A book named', 'The Wealth of Nations by Adam Smith, 1776 (title only)'],
], 'Table: free trade means few controls, laissez-faire means as little state interference as possible, and the book named is The Wealth of Nations by Adam Smith of 1776');
const vCapScenes = table(['Imagined scene', 'Feature'], [
  ['Two bakers of Tanwick lower their prices to win customers', 'Competition'],
  ['Tobias Garn invests his profit in two more mills', 'Profit motive and investment'],
  ['Wool is scarce, so woollen cloth costs more and weavers make more', 'Prices set by demand and supply'],
  ['A mill owner pays his weavers a weekly wage', 'Wages'],
], 'Table sorting four imagined scenes to features of capitalism: lowering prices is competition, investing profit is the profit motive, scarce wool raising prices is demand and supply, and weekly pay is wages');
const vSocMeaning = table(['Point', 'Fact'], [
  ['Ownership', 'The means of production are owned or controlled by society or the state'],
  ['Aim', 'To reduce inequality and share wealth more fairly'],
  ['Method', 'Often planning and welfare'],
], 'Table on socialism: means of production owned or controlled by society or the state, the aim of reducing inequality and sharing wealth more fairly, and often planning and welfare');
const vCond = table(['Condition', 'In the early factory towns'], [
  ['Hours and pay', 'Often 12 to 16 hours a day, for low wages'],
  ['Child and women\'s labour', 'In factories and mines, for less pay'],
  ['Safety', 'Unsafe machines'],
  ['Housing and health', 'Crowded slums and disease'],
  ['Security', 'No job security'],
  ['The gap', 'A widening gap between owners and workers'],
], 'Table of conditions of workers: 12 to 16 hours a day for low wages, child and women labour in factories and mines, unsafe machines, crowded slums and disease, no job security, and a widening gap between owners and workers');
const vEarly = table(['Thinker', 'Idea or action'], [
  ['Robert Owen', 'Ran New Lanark with houses, a school and shorter hours for workers'],
  ['Saint-Simon', 'Wanted industry organised for the good of society as a whole'],
  ['Fourier', 'Proposed small cooperative communities'],
], 'Table of early socialist thinkers: Robert Owen at New Lanark with houses, a school and shorter hours, Saint-Simon wanting industry organised for society, and Fourier proposing small cooperative communities');
const vMarx = table(['Point', 'Fact'], [
  ['Thinkers', 'Karl Marx and Friedrich Engels'],
  ['The Communist Manifesto', '1848, by Marx and Engels'],
  ['Das Kapital', 'First volume 1867, by Marx'],
  ['Idea of class struggle', 'They argued that classes with opposed interests, owners and workers, shaped history'],
], 'Table on Marx and Engels: The Communist Manifesto of 1848, Das Kapital first volume of 1867, and their argument that classes with opposed interests shaped history');
const vResp = table(['Response', 'What it was'], [
  ['Trade unions', 'Associations of workers who bargained together for wages, hours and safety'],
  ['Factory Acts', 'Laws; the Act of 1833 limited child labour in textile factories and provided for inspectors'],
], 'Table of responses: trade unions of workers bargaining for wages, hours and safety, and Factory Acts, such as that of 1833 limiting child labour');
const vClassify = table(['Imagined statement', 'Which system?'], [
  ['The mills of Orrin Falls belong to private owners who aim at profit', 'Capitalism'],
  ['The Harrow Collective\'s committee decides how many ploughs to make', 'Socialism (planning)'],
  ['Cloth prices in the Tanwick market rise and fall with demand and supply', 'Capitalism'],
  ['The aim is to share wealth more fairly among all members', 'Socialism'],
], 'Table classifying four imagined statements: private mills for profit are capitalism, a committee deciding ploughs is socialist planning, prices moving with demand and supply are capitalism, and sharing wealth more fairly is socialism');
const vMerits = table(['', 'Capitalism', 'Socialism'], [
  ['Supporters point to', 'Incentives, choice, new ideas, growth of output', 'Security, fairness, planning for social goals'],
  ['Critics point to', 'Inequality of income and insecurity of workers', 'Weaker incentives and heavy planning'],
], 'Table of merits and criticisms: supporters of capitalism point to incentives, choice, new ideas and growth, critics to inequality and insecurity; supporters of socialism point to security, fairness and planning for social goals, critics to weaker incentives and heavy planning');
const vPlan2 = table(['Part', 'Marks', 'Points to include'], [
  ['(i)', '3', 'Ownership and motive of each system'],
  ['(ii)', '3', 'Prices and output; distribution of income'],
  ['(iii)', '4', 'State, competition; a merit and a criticism of each'],
], 'Table planning a ten-mark comparison: part (i) ownership and motive for 3 marks, part (ii) prices, output and income for 3 marks, part (iii) the state, competition, and a merit and a criticism of each for 4 marks');
const vSummary2 = table(['Heading', 'Key points'], [
  ['Capitalism', 'Private ownership, profit, market prices, competition, wages'],
  ['Rise of capitalism', 'Capital, profits invested, banks, companies, trade, middle class, laissez-faire'],
  ['Socialism', 'Ownership by society or the state; reduce inequality; planning and welfare'],
  ['Its rise', 'Hard conditions of workers; Owen, Saint-Simon, Fourier; Marx and Engels; unions; Factory Act 1833'],
], 'Summary table of Part 2: capitalism, the rise of capitalism, socialism, and the rise of socialism');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'The Industrial Revolution: Part 1 — Meaning, Causes and Inventions',
  goals: [
    'Define the Industrial Revolution and say where and when it began',
    'Explain the causes of the Industrial Revolution and why it began in England',
    'Name the main inventions and describe the changes the Industrial Revolution brought',
  ],
  slides: [
    sl('title', 'The Industrial Revolution: meaning, causes and inventions', {
      b: 'Part 1 — what changed, why in England, and with which machines.',
      v: vRoute1,
      n: 'In this part we learn what the Industrial Revolution was and where and when it began. We study the causes, and why England came first. We meet the main inventions of the textile industry, of iron and of power. Finally we see the changes that the Industrial Revolution brought to industry, transport and society.',
    }),
    sl('diagram', 'What was the Industrial Revolution?', {
      b: 'Learn this definition well; it is the first part of many exam answers.',
      v: vMeaning,
      n: 'The Industrial Revolution was a change from hand production in homes and workshops to machine production in factories. The machines were driven first by water power and then by steam. It began in England and later spread to other countries. It changed industry, transport and society.',
    }),
    sl('diagram', 'When and where', {
      b: 'Use **about** with these dates; historians give approximate ranges.',
      v: vSpread,
      n: 'The Industrial Revolution began in England from about the seventeen fifties or seventeen sixties. By about the eighteen thirties or eighteen forties the first phase was complete. After that it spread to other countries. Always use the word about with these dates, because historians give approximate ranges.',
    }),
    sl('concept', 'From the cottage to the factory', {
      bl: [
        'Before: the **domestic system**, work at home with hand tools.',
        'After: the **factory system**, machines driven by power.',
        'Workers now worked at fixed hours, under a master.',
      ],
      v: vOldNew,
      n: 'Before the change, many families spun and wove at home with hand tools, at their own pace. This is called the domestic system. In the factory system, machines driven by power stood in large mills, and workers kept fixed hours under a master. This contrast is a useful way to explain the meaning.',
    }),
    sl('diagram', 'Why England first? The causes at a glance', {
      b: 'Ten causes worked together. No single cause explains everything.',
      v: vWeb,
      n: 'Look at the web. Ten causes worked together to start the change in England. They are capital, coal and iron, colonies, cheap labour, canals and roads, a spirit of invention, a navy and shipping, political stability, a banking system, and farming changes. No single cause explains everything.',
    }),
    sl('concept', 'Capital, colonies and banks', {
      bl: [
        '**Capital** from trade and colonies could be invested.',
        '**Colonies** supplied raw materials such as cotton and were **markets**.',
        'The **Bank of England** (1694) and other banks lent money.',
      ],
      v: vCapColonies,
      n: 'First, capital. Merchants had made money from trade and colonies, and they could invest it in mills and machines. Colonies supplied raw materials such as cotton, and they were markets for finished cloth. The Bank of England, founded in sixteen ninety four, and other banks lent money to builders of mills.',
    }),
    sl('concept', 'Coal, iron and cheap labour', {
      bl: [
        '**Coal and iron** deposits lay **close together**.',
        'The **enclosure movement** pushed rural people into towns.',
        'They became **cheap labour** for factories.',
      ],
      v: vCoalLab,
      n: 'Coal and iron were found close together in England, so furnaces and engines could be supplied cheaply. Another cause was the enclosure movement. Common land was fenced into large private farms, and many farm families moved to the towns. There they became cheap labour for the new factories.',
    }),
    sl('check', 'Quick check: a surveyor\'s report', {
      b: 'Which cause does the report show?',
      chk: 'm_coal_iron',
      n: 'Read the surveyors report from the Greywater valley. Decide which cause of the Industrial Revolution it shows.',
    }),
    sl('concept', 'Shipping, stability and farming', {
      bl: [
        'A large **navy** and **merchant shipping** protected and carried trade.',
        '**Political stability** encouraged investment.',
        'An **agricultural revolution** fed a growing population.',
      ],
      v: vNavy,
      n: 'A large navy and merchant shipping protected trade routes and carried raw materials and goods. Political stability made owners willing to invest for the long term. And the agricultural revolution, meaning better farming, fed the growing population, including the workers of the new towns.',
    }),
    sl('concept', 'Canals, roads and the spirit of invention', {
      bl: [
        '**Canals and roads** moved coal, cotton and goods.',
        'A **spirit of invention**: many people tried and patented new machines.',
      ],
      v: vTrans,
      n: 'Canals and roads moved coal, cotton and finished goods between mines, mills and ports. And there was a spirit of invention. Many people tried out, improved and patented new machines. In the next slides we meet the inventors one by one.',
    }),
    sl('example', 'Worked example 1: from scene to cause', {
      b: 'Read the scene, find the key words, name the cause.',
      bl: [
        'Step 1 — What is happening in the scene?',
        'Step 2 — Is it about money, materials, land, people or banks?',
        'Step 3 — Name the cause.',
        'Step 4 — Say how it helped industry.',
      ],
      v: vScenes,
      n: 'Use four steps. See what is happening. Decide whether it is about money, materials, land, people or banks. Name the cause, and say how it helped industry. A cotton ship unloading shows colonies as a source of raw materials. Families leaving fenced land show enclosure and cheap labour.',
    }),
    sl('diagram', 'Inventions on a time line, 1709 to 1830', {
      b: 'Use this time line as your map for the inventions.',
      v: vInv,
      n: 'Here is the time line, drawn to scale. About seventeen hundred and nine, Darby smelts iron with coke. In seventeen thirty three, Kay invents the flying shuttle. Then come the spinning jenny, the water frame and Watts engine, the mule, and the power loom. In eighteen twenty nine and eighteen thirty come the Rocket and the railway.',
    }),
    sl('concept', 'Inventions of the textile industry', {
      b: 'Cloth was the leading industry. Learn the machine, the inventor and the year.',
      v: vTextile,
      n: 'Cloth making led the way. The flying shuttle of John Kay, in seventeen thirty three, sped up weaving. The spinning jenny of James Hargreaves, about seventeen sixty four, spun several threads at once. Richard Arkwright built the water frame in seventeen sixty nine. Samuel Crompton made the mule in seventeen seventy nine, and Edmund Cartwright the power loom in seventeen eighty five.',
    }),
    sl('check', 'Quick check: match machine and inventor', {
      b: 'Match each machine with its inventor.',
      chk: 'mt_inventions',
      n: 'Use the table of textile machines. Match each machine with its inventor.',
    }),
    sl('concept', 'Iron, steam and the railway', {
      b: 'Power and iron made factories possible anywhere, and railways joined the towns.',
      v: vPower,
      n: 'Abraham Darby smelted iron using coke, about seventeen hundred and nine, which made iron cheaper. James Watt improved the steam engine, with a patent in seventeen sixty nine, so power no longer depended on rivers. George Stephenson built the locomotive Rocket in eighteen twenty nine, and the Liverpool and Manchester railway opened in eighteen thirty.',
    }),
    sl('check', 'Quick check: cause or effect', {
      b: 'Decide whether the assertion and the reason are true, and whether the reason explains it.',
      chk: 'ar_cheap_labour',
      n: 'Check each statement on its own first. Then ask whether the reason explains the assertion.',
    }),
    sl('concept', 'What the Industrial Revolution changed', {
      b: 'Three areas: industry, transport and society.',
      v: vChanges,
      n: 'The Industrial Revolution changed industry, transport and society. Factories and machines made goods in large numbers. Canals, roads and then railways improved transport. In society, factory towns grew, and new classes of owners and workers appeared. These changes lead into the next two topics.',
    }),
    sl('check', 'Quick check: true or false', {
      b: 'Did it stay in England?',
      chk: 'tf_only_england',
      n: 'Think about what happened after the first phase in England. Decide whether the statement is true or false.',
    }),
    sl('example', 'Worked example 2: planning a 10-mark answer', {
      b: 'Question: (i) Define it and give the dates. [3] (ii) Capital, colonies, coal and iron. [3] (iii) Labour, farming, banking, shipping, stability. [4]',
      bl: [
        '(i) Meaning, England, about the 1750s or 1760s.',
        '(ii) One sentence on each of three causes.',
        '(iii) Four or five short, clear points.',
        'One clear point for each mark.',
      ],
      v: vPlan1,
      n: 'Plan a ten mark answer in three parts. Part one gives the meaning, the place and the dates. Part two explains capital, colonies, and coal and iron. Part three covers labour, farming, banking, shipping and stability. Give one clear point for each mark.',
    }),
    sl('summary', 'Summary of Part 1', {
      bl: [
        '**Meaning:** hand production to machine production in factories, water then steam.',
        '**Dates:** England, about the **1750s or 1760s** to about the **1830s or 1840s**.',
        '**Causes:** capital, colonies, coal and iron, labour, navy, stability, banks, farming, canals, invention.',
        '**Inventions:** Kay, Hargreaves, Arkwright, Crompton, Cartwright, Watt, Darby, Stephenson.',
      ],
      v: vSummary1,
      n: 'To sum up. The Industrial Revolution was a change from hand production to machine production in factories. It began in England from about the seventeen fifties or sixties. Many causes worked together, from capital and colonies to coal and iron. The inventions of Kay, Hargreaves, Arkwright, Crompton, Cartwright, Watt, Darby and Stephenson drove it forward.',
    }),
    sl('exam-tips', 'Exam tips for Part 1', {
      bl: [
        'Begin with the **definition**, then the place and the **dates**, using **about**.',
        'Group the causes: **money**, **materials**, **people**, **transport**, **government**.',
        'Give the **inventor and year** together, for example **Kay, 1733**.',
        'Do not mix up the **water frame** (1769) and the **mule** (1779).',
        'For ten marks, give one clear point for each mark.',
      ],
      n: 'Some exam habits. Begin with the definition, then the place and the dates, and use the word about. Group the causes under money, materials, people, transport and government. Give the inventor and the year together. Do not mix up the water frame and the mule. For ten marks, give one clear point for each mark.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Capitalism and Socialism: Part 2 — Meaning, Rise and Comparison',
  goals: [
    'Explain the meaning of capitalism and the causes of its rise',
    'Explain the meaning of socialism and how the conditions of workers led to its rise',
    'Distinguish capitalism from socialism on six points, without ranking them',
  ],
  slides: [
    sl('title', 'Capitalism and socialism', {
      b: 'Part 2 — two economic systems, how each arose, and how they differ.',
      v: vRoute2,
      n: 'In this part we study two economic systems. We learn the meaning of capitalism and why it rose after the Industrial Revolution. We study the conditions of workers, and how they led to the rise of socialism. Then we compare the two systems.',
    }),
    sl('diagram', 'What is capitalism?', {
      b: 'An economic system with **private ownership** of the means of production.',
      v: vCapMeaning,
      n: 'Capitalism is an economic system in which the means of production are privately owned and run for profit. The means of production are land, factories and machines. Prices are set by market demand and supply. Producers compete for customers, and workers are paid wages.',
    }),
    sl('concept', 'Why capital mattered', {
      bl: [
        'Factories and machines **cost a great deal**.',
        'Large **capital** was needed.',
        'Investors, banks and companies supplied it.',
      ],
      v: vCapNeeds,
      n: 'A factory with machines and engines cost far more than a spinning wheel in a cottage. So large capital was needed. Investors, banks and companies supplied it, and the system based on private capital grew. This is the first cause of the rise of capitalism.',
    }),
    sl('diagram', 'Causes of the rise of capitalism', {
      b: 'Learn these six causes; any three or four usually earn full marks.',
      v: vCapCauses,
      n: 'Six causes are commonly given. The need for capital. The investment of profits by merchants and entrepreneurs. The growth of banks and joint stock companies. The expansion of trade and colonies. The growth of the middle class. And the spread of ideas of free trade and laissez faire.',
    }),
    sl('concept', 'Joint-stock companies', {
      bl: [
        'A company **sells shares** to many investors.',
        'Each shareholder **risks only the sum paid**.',
        'Large capital is gathered for mills and machines.',
      ],
      v: vJoint,
      n: 'A joint stock company sells shares to many investors. Each pays a part, so a very large sum can be gathered. Each shareholder risks only the amount paid for the shares. In this way, mills and machines that no single owner could afford were built.',
    }),
    sl('concept', 'Free trade and laissez-faire', {
      bl: [
        '**Free trade**: few controls on trade.',
        '**Laissez-faire**: the state interferes as little as possible.',
        'Adam Smith\'s **The Wealth of Nations** (1776): remember the title only.',
      ],
      v: vLaissez,
      n: 'Ideas of free trade and laissez faire spread. Free trade means few controls on trade. Laissez faire means that the state interferes as little as possible in trade and business. A book often named with these ideas is The Wealth of Nations by Adam Smith, published in seventeen seventy six. You need to remember only its title.',
    }),
    sl('check', 'Quick check: shares in a mill', {
      b: 'Which feature of the growth of capitalism is shown?',
      chk: 'm_joint_stock',
      n: 'Read about the Tanwick Cotton Company. Decide which feature of the growth of capitalism the company shows.',
    }),
    sl('example', 'Worked example 3: from scene to feature', {
      b: 'Read the scene, find the key words, name the feature.',
      bl: [
        'Step 1 — What is happening?',
        'Step 2 — Is it about rivals, profit, prices or pay?',
        'Step 3 — Name the feature of capitalism.',
        'Step 4 — Write one line of explanation.',
      ],
      v: vCapScenes,
      n: 'Use four steps. See what is happening. Decide whether it is about rivals, profit, prices or pay. Name the feature of capitalism and write one line of explanation. Two bakers lowering prices show competition. Prices that move with scarce wool show demand and supply.',
    }),
    sl('concept', 'What is socialism?', {
      b: 'An economic system or idea of **ownership or control by society or the state**.',
      v: vSocMeaning,
      n: 'Socialism is an economic idea about who should own or control factories, land and machines. Under it, society or the state holds that ownership or control. Its aim is less inequality and a fairer sharing of wealth, and it often relies on planning and welfare. Notice that the word planning is used here, where capitalism speaks of the market.',
    }),
    sl('diagram', 'From factory conditions to socialist ideas', {
      b: 'The conditions of workers led some thinkers and workers to look for other ways.',
      v: vFlow,
      n: 'Look at the flow chart. In the early factory towns, workers faced long hours, low wages, unsafe machines, crowded slums and no job security. Children and women also worked in factories and mines. The gap between owners and workers widened. This led to socialist ideas, and also to trade unions and to laws.',
    }),
    sl('concept', 'Conditions of industrial workers', {
      b: 'Learn these conditions; they are the heart of the third topic.',
      v: vCond,
      n: 'Workers often laboured for twelve to sixteen hours a day, for low wages. Children and women worked in factories and mines. Machines were unsafe. Families lived in crowded slums where disease spread easily. There was no job security. And the gap between owners and workers kept widening.',
    }),
    sl('check', 'Quick check: a mill worker\'s letter', {
      b: 'Which condition does the letter show?',
      chk: 'm_long_hours',
      n: 'Read the imagined letter of a mill worker. Decide which condition of industrial workers it shows.',
    }),
    sl('concept', 'Early socialist thinkers', {
      b: 'Often called **utopian socialists**. One line each is enough.',
      v: vEarly,
      n: 'The early socialist thinkers are often called utopian socialists. Robert Owen ran a mill community at New Lanark with houses, a school and shorter hours. Saint Simon wanted industry organised for the good of society as a whole. Fourier proposed small cooperative communities. One line for each is enough in an exam.',
    }),
    sl('concept', 'Marx and Engels', {
      b: 'Name the works and state the idea of class struggle neutrally.',
      v: vMarx,
      n: 'Karl Marx and Friedrich Engels published The Communist Manifesto in eighteen forty eight. Marx wrote Das Kapital, whose first volume appeared in eighteen sixty seven. You need to know only the titles and the dates. They argued that society had classes with opposed interests, owners and workers, and that the struggle between classes shaped history.',
    }),
    sl('concept', 'Trade unions and Factory Acts', {
      b: 'Workers and the law also responded to the conditions.',
      v: vResp,
      n: 'Workers also responded by forming trade unions. These were associations of workers who bargained together for wages, hours and safety. The law responded too. The British Factory Act of eighteen thirty three limited child labour in textile factories and provided for inspectors. Remember this Act with its year.',
    }),
    sl('check', 'Quick check: match the thinkers', {
      b: 'Match each name with its description.',
      chk: 'mt_thinkers',
      n: 'Use the tables on the early thinkers and on Marx and Engels. Match each name with the right description.',
    }),
    sl('example', 'Worked example 4: which system?', {
      b: 'Read the statement, find the key words, name the system.',
      bl: [
        'Step 1 — Who owns the means of production?',
        'Step 2 — What is the aim: profit or social welfare?',
        'Step 3 — Who decides output: the market or a plan?',
        'Step 4 — Name the system.',
      ],
      v: vClassify,
      n: 'Use four steps. Ask who owns the means of production. Ask whether the aim is profit or social welfare. Ask whether the market or a plan decides output. Then name the system. Private mills run for profit show capitalism. A committee deciding how many ploughs to make shows socialist planning.',
    }),
    sl('diagram', 'Capitalism and socialism side by side', {
      b: 'Compare on six points: ownership, motive, prices, income, state, competition.',
      v: vChart,
      n: 'Here is the comparison on six points. Ownership: mainly private in capitalism, society or the state in socialism. Motive: profit, or social welfare. Prices and output: the market, or planning. Income: market returns, or a more even sharing. The state: limited, or larger. Competition: central, or less stressed.',
    }),
    sl('concept', 'Merits, criticisms and a mixed economy', {
      b: 'Describe both with their merits and criticisms. Do not rank them.',
      bl: [
        'Each has supporters and critics.',
        'Many countries, including India, follow a **mixed economy**.',
      ],
      v: vMerits,
      n: 'Each system has supporters who point to its merits and critics who point to its limits. Supporters of capitalism point to incentives and choice, and critics to inequality. Supporters of socialism point to security and fairness, and critics to weaker incentives. Many countries, including India, follow a mixed economy.',
    }),
    sl('example', 'Worked example 5: planning a 10-mark comparison', {
      b: 'Question: (i) Ownership and motive. [3] (ii) Prices, output and income. [3] (iii) State, competition, merits and criticisms. [4]',
      bl: [
        '(i) Ownership and motive, one line for each system.',
        '(ii) Market or plan; how income is shared.',
        '(iii) State and competition; one merit and one criticism of each.',
      ],
      v: vPlan2,
      n: 'Plan a ten mark comparison in three parts. Part one compares ownership and motive. Part two compares how prices and output are decided and how income is shared. Part three compares the role of the state and competition, and gives one merit and one criticism of each system. Describe both sides evenly.',
    }),
    sl('summary', 'Summary of Part 2', {
      bl: [
        '**Capitalism:** private ownership, profit, market prices, competition, wages.',
        '**Its rise:** capital, investment, banks and companies, trade, middle class, laissez-faire.',
        '**Socialism:** ownership by society or the state; reduce inequality; planning and welfare.',
        '**Its rise:** workers\' conditions; Owen, Saint-Simon, Fourier; Marx and Engels; unions; Factory Act of 1833.',
      ],
      v: vSummary2,
      n: 'To sum up. Capitalism rests on private ownership, profit, market prices, competition and wages. It rose with the need for capital, investment, banks, companies, trade and ideas of free trade. Socialism rests on ownership or control by society or the state. It rose from the hard conditions of workers, and was shaped by early thinkers, Marx and Engels, unions and laws.',
    }),
    sl('exam-tips', 'Exam tips for Part 2', {
      bl: [
        'Define each system in one sentence with **ownership**, **motive** and **method**.',
        'Give **causes** in groups and name **The Wealth of Nations**, **The Communist Manifesto** and **Das Kapital** as titles only.',
        'Never quote or paraphrase long passages; ideas in your own words are enough.',
        'In comparisons, write **both sides** for every point, and do not rank them.',
        'Remember **Factory Act, 1833** and **New Lanark**.',
      ],
      n: 'Some exam habits. Define each system in one sentence, with ownership, motive and method. Give causes in groups. Name the three books by title only. In comparisons, write both sides for every point, and do not rank the systems. Remember the Factory Act of eighteen thirty three and the mill community of New Lanark.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'The Modern Age in Europe: Industrial Revolution, Capitalism and Socialism — notes',
  sections: [
    {
      h: '1. Meaning, dates and the change from home to factory',
      t: 1,
      b: '- **Industrial Revolution:** the change from **hand production in homes and workshops** to **machine production in factories** using power (**water**, then **steam**).\n- It began in **England** from about the **1750s or 1760s**, continued to about the **1830s or 1840s**, and then **spread to other countries**.\n- It changed **industry, transport and society**.\n- Before: the **domestic system**; after: the **factory system**, with fixed hours under a master.',
      terms: [['Industrial Revolution', 'The change from hand to machine production in factories using power.'], ['Domestic system', 'Work done at home with hand tools.'], ['Factory system', 'Machine production in large mills under fixed hours.']],
      v: vMeaning,
      vs: [vSpread, vOldNew],
    },
    {
      h: '2. Why England: the causes',
      t: 1,
      b: '- **Capital** from trade and colonies, and a **banking system** (**Bank of England, 1694**).\n- **Colonies**: raw materials (for example cotton) and markets.\n- **Coal and iron** deposits **close together**.\n- **Cheap labour**: the **enclosure movement** and farming changes pushed rural people to towns.\n- A large **navy** and merchant shipping; **political stability**.\n- An **agricultural revolution** fed a growing population.\n- **Canals and roads**; a **spirit of invention**.\n- No single cause explains it; many worked together.',
      terms: [['Enclosure movement', 'Fencing of common land into large private farms.'], ['Capital', 'Money and resources available to invest in business.'], ['Agricultural revolution', 'Better farming methods that raised food output.']],
      v: vWeb,
      vs: [vCapColonies, vCoalLab, vNavy, vTrans],
    },
    {
      h: '3. Inventions (examples)',
      t: 1,
      b: '- **John Kay**, flying shuttle, **1733**.\n- **James Hargreaves**, spinning jenny, about **1764**.\n- **Richard Arkwright**, water frame, **1769**.\n- **Samuel Crompton**, mule, **1779**.\n- **Edmund Cartwright**, power loom, **1785**.\n- **James Watt**, improved steam engine, patent **1769**.\n- **Abraham Darby**, smelting iron with coke, about **1709**.\n- **George Stephenson**, locomotive **Rocket** (**1829**); **Liverpool to Manchester railway** (**1830**).',
      terms: [['Patent', 'A legal right to an invention for a number of years.'], ['Coke', 'A fuel made from coal, used to smelt iron.']],
      v: vInv,
      vs: [vTextile, vPower, vChanges],
    },
    {
      h: '4. Capitalism: meaning and rise',
      t: 2,
      b: '- **Capitalism:** an economic system in which the **means of production** (land, factories, machines) are **privately owned** and run for **profit**; **prices** set by market **demand and supply**; **competition**; workers paid **wages**.\n- **Causes of its rise** after the Industrial Revolution: factories and machines needed **large capital**; merchants and entrepreneurs **invested profits**; **banks and joint-stock companies** grew; **trade and colonies** expanded; the **middle class** grew; ideas of **free trade and laissez-faire** spread (Adam Smith, **The Wealth of Nations**, **1776**: title only).',
      terms: [['Means of production', 'Land, factories and machines used to make goods.'], ['Joint-stock company', 'A company that raises capital by selling shares to many investors.'], ['Laissez-faire', 'The idea that the state should interfere as little as possible in trade and business.']],
      v: vCapMeaning,
      vs: [vCapCauses, vJoint, vLaissez],
    },
    {
      h: '5. Socialism: meaning and rise',
      t: 3,
      b: '- **Socialism:** an economic system or idea of **social ownership or control** (by society or the state) of the **means of production**. Its **aims** are to **narrow inequality** and to **share wealth more fairly**; it often relies on **planning and welfare**.\n- **Conditions of workers:** **12 to 16 hours** a day and **low wages**; **child and women\'s labour** in factories and mines; **unsafe machines**; **crowded slums and disease**; **no job security**; a **widening gap** between owners and workers.\n- **Early (utopian) socialists:** **Robert Owen** (New Lanark), **Saint-Simon**, **Fourier**.\n- **Karl Marx and Friedrich Engels:** **The Communist Manifesto** (**1848**); Marx\'s **Das Kapital** (first volume **1867**). They argued that classes with opposed interests, owners and workers, shaped history (**class struggle**).\n- **Trade unions**; Britain\'s **Factory Acts**, for example **1833**, limited child labour.',
      terms: [['Socialism', 'An economic idea of ownership or control of the means of production by society or the state.'], ['Trade union', 'An association of workers that bargains for wages, hours and safety.'], ['Class struggle', 'The idea that classes with opposed interests shape history.']],
      v: vSocMeaning,
      vs: [vCond, vFlow, vEarly, vMarx, vResp],
    },
    {
      h: '6. Capitalism and socialism compared',
      t: 3,
      b: '- Compare on **ownership**, **motive**, **how prices and output are decided**, **distribution of income**, **role of the state**, and **competition**.\n- Supporters of each system point to its **merits**, and critics to its **limits**. A history answer describes both side by side and does not rank them.\n- Many countries, including **India**, follow a **mixed economy**.',
      terms: [['Mixed economy', 'An economy combining private enterprise with a role for the state.']],
      v: vChart,
      vs: [vMerits],
    },
  ],
  tips: '**Common mistakes**\n- Writing dates without the word about, or placing the start in the nineteenth century.\n- Mixing up the water frame (Arkwright, 1769) and the mule (Crompton, 1779), or the jenny and the power loom.\n- Listing an effect, such as slums, as a cause of the Industrial Revolution.\n- Confusing laissez-faire (limited state interference) with planning.\n- Quoting books instead of naming them; only the titles and the main idea are needed.\n- Declaring one system better; describe features, merits and criticisms of both.\n\n**How marks are usually awarded**\n- 1-mark items: one correct option, name or date.\n- 2 marks: two distinct points; 3 marks: three points.\n- 10-mark questions in 3 + 3 + 4 parts: one clear point per mark; the last part usually needs a link, reasons or a comparison.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Industrial Revolution', 'The change from **hand production in homes and workshops** to **machine production in factories** using power (water, then steam).', 'definition', 1],
  ['Where and when it began', '**England**, from about the **1750s or 1760s**; first phase to about the **1830s or 1840s**; then spread to other countries.', 'fact', 1],
  ['Capital as a cause', 'Money from **trade and colonies** that merchants could **invest** in mills and machines.', 'concept', 1],
  ['Colonies as a cause', 'Supplied **raw materials** such as cotton and were **markets** for goods.', 'concept', 1],
  ['Coal and iron', 'Deposits found **close together** in England: cheap fuel and raw material.', 'concept', 1],
  ['Enclosure movement', 'Common land fenced into large private farms; people moved to towns as **cheap labour**.', 'definition', 1],
  ['Bank of England', 'Founded in **1694**; part of the banking system that helped industry.', 'fact', 1],
  ['Navy and merchant shipping', 'Protected trade routes and carried raw materials and goods.', 'concept', 1],
  ['Political stability', 'Steady government **encouraged investment**.', 'concept', 1],
  ['Agricultural revolution', 'Better farming that **fed a growing population**.', 'concept', 1],
  ['John Kay', '**Flying shuttle**, **1733**.', 'fact', 1],
  ['James Hargreaves', '**Spinning jenny**, about **1764**: several threads at once.', 'fact', 1],
  ['Richard Arkwright', '**Water frame**, **1769**: water-powered spinning in mills.', 'fact', 1],
  ['Samuel Crompton', '**Mule**, **1779**.', 'fact', 1],
  ['Edmund Cartwright', '**Power loom**, **1785**.', 'fact', 1],
  ['James Watt', 'Improved **steam engine**; patent **1769**.', 'fact', 1],
  ['Abraham Darby', 'Smelted **iron with coke**, about **1709**.', 'fact', 1],
  ['George Stephenson', 'Locomotive **Rocket**, **1829**; **Liverpool to Manchester railway**, **1830**.', 'fact', 1],
  ['Capitalism', 'System in which the **means of production** are **privately owned** and run for **profit**; market prices; competition; wages.', 'definition', 2],
  ['Features of capitalism', 'Private ownership, **profit motive**, prices by **demand and supply**, **competition**, wages.', 'concept', 2],
  ['Causes of the rise of capitalism', 'Need for capital; **profits invested**; **banks and joint-stock companies**; trade and colonies; **middle class**; free trade and **laissez-faire**.', 'concept', 2],
  ['Joint-stock company', 'Raises capital by **selling shares** to many investors, who each risk only what they paid.', 'definition', 2],
  ['Laissez-faire', 'The idea of **limited state interference** in trade and business.', 'definition', 2],
  ['Adam Smith', 'Book **The Wealth of Nations** (**1776**); title only.', 'fact', 2],
  ['Socialism', 'An economic idea of **social ownership or control** of the **means of production** (society or the state), aiming at **less inequality** and a **fairer sharing of wealth**; often **planning and welfare**.', 'definition', 3],
  ['Conditions of early factory workers', '**12 to 16 hours** a day, low wages, child and women\'s labour, unsafe machines, slums and disease, no job security.', 'concept', 3],
  ['Early (utopian) socialists', '**Robert Owen** (New Lanark), **Saint-Simon**, **Fourier**.', 'fact', 3],
  ['Robert Owen', 'Mill community at **New Lanark**: houses, a school, shorter hours.', 'fact', 3],
  ['Marx and Engels', '**The Communist Manifesto** (**1848**); Marx: **Das Kapital** (first volume **1867**).', 'fact', 3],
  ['Class struggle', 'Marx and Engels argued that classes with **opposed interests**, owners and workers, shaped history.', 'concept', 3],
  ['Trade union', 'An **association of workers** that bargains for wages, hours and safety.', 'definition', 3],
  ['Factory Act of 1833', 'British law that **limited child labour** in textile factories.', 'fact', 3],
  ['Capitalism versus socialism: motive', 'Capitalism: **profit**, market decides. Socialism: **social welfare**, planning guides.', 'concept', 3],
  ['Mixed economy', 'Many countries, including **India**, combine features of both systems.', 'fact', 3],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-9-default-chapter-test-short',
  title: 'Chapter test (short) — Industrial Revolution, Capitalism and Socialism',
  duration: 30,
  sections: [
    { id: 'A', title: 'Section A — Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1–5 carry 1 mark each; question 6 carries 2 marks and question 7 carries 3 marks.', items: ['m_define_ir', 'm_cap_define', 'm_soc_define', 'm_union', 'ar_colonies', 's_joint_stock', 's3_conditions'] },
    { id: 'B', title: 'Section B — Structured question (10 marks)', instr: 'Attempt any ONE of the two questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 1, keys: ['l_causes_why', 'l_socialism'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-9-default-chapter-test-long',
  title: 'Chapter test (long) — Industrial Revolution, Capitalism and Socialism',
  duration: 60,
  sections: [
    { id: 'A', title: 'Section A — Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1–8 carry 1 mark each; questions 9–11 carry 2 marks each; questions 12–13 carry 3 marks each.', items: ['m_when', 'm_bank', 'm_watt', 'm_cap_cause', 'm_market_price', 'm_factory_act', 'm_mixed', 'ar_factory_act', 's_define_ir', 's_laissez', 's_owen', 's3_cap_causes', 's3_marx'] },
    { id: 'B', title: 'Section B — Structured questions (20 marks)', instr: 'Attempt any TWO of the three questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 2, keys: ['l_causes_eval', 'l_capitalism', 'l_compare'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t03 of icse-9-history-civics-ch17 only (meaning and causes of the Industrial Revolution; capitalism: meaning and rise; socialism: meaning, rise and comparison)',
    originality: 'every mill, town, club, letter and notice is imagined and written by SOYL (labelled); no textbook text or exercise and no specimen or board-paper item reused (D-036); no work is quoted, only titles named and ideas paraphrased',
    data: 'inventions time line drawn to scale from 1700 to 1840; dates are the commonly taught approximate ones',
    facts: 'Industrial Revolution from about the 1750s or 1760s in England to about the 1830s or 1840s; Bank of England 1694; Kay 1733; Hargreaves about 1764; Arkwright 1769; Crompton 1779; Cartwright 1785; Watt patent 1769; Darby about 1709; Stephenson Rocket 1829 and Liverpool to Manchester railway 1830; Adam Smith The Wealth of Nations 1776; Owen New Lanark, Saint-Simon, Fourier; Marx and Engels The Communist Manifesto 1848, Das Kapital first volume 1867; Factory Act 1833; mixed economy (India)',
    gate: 'schema, content lint (lintExemplar), deterministic verify, originality pre-check and the editorial counts run clean on this chapter',
  },
});
