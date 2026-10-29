// Build CBSE 12 Business Studies ch03 Business Environment. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-12-business-studies-ch03/src/build.mjs
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-business-studies-ch03', 'economics-commerce');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- computed deck figures
// Worked example 2 (deck 2): an imagined chemist's receipts before and after the note withdrawal (₹ thousand).
const CHEM = { before: { cash: 170, digital: 30 }, after: { cash: 120, digital: 80 } };
const cTot = (m) => m.cash + m.digital;
const CHEM_BEFORE = (100 * CHEM.before.digital) / cTot(CHEM.before); // 15
const CHEM_AFTER = (100 * CHEM.after.digital) / cTot(CHEM.after); // 40
assert.equal(cTot(CHEM.before), 200);
assert.equal(cTot(CHEM.after), 200);
assert.equal(CHEM_BEFORE, 15);
assert.equal(CHEM_AFTER, 40);

// ---------------------------------------------------------------- visuals
const vRings = (() => {
  const s = new Svg(560, 360);
  const cx = 280, cy = 180;
  s.path(`M ${cx - 260} ${cy} A 260 165 0 1 0 ${cx + 260} ${cy} A 260 165 0 1 0 ${cx - 260} ${cy} Z`, { color: 'muted', sw: 1.6 });
  s.path(`M ${cx - 165} ${cy} A 165 100 0 1 0 ${cx + 165} ${cy} A 165 100 0 1 0 ${cx - 165} ${cy} Z`, { color: 'accent', sw: 2 });
  s.rect(cx - 60, cy - 22, 120, 44, { fill: 'fill', color: 'accent', sw: 2 });
  s.text(cx, cy, 'The firm', { bold: true });
  s.text(cx, cy - 72, 'Customers', { size: 13, color: 'accent' });
  s.text(cx, cy + 72, 'Competitors', { size: 13, color: 'accent' });
  s.text(cx - 112, cy - 34, 'Suppliers', { size: 13, color: 'accent' });
  s.text(cx + 112, cy + 34, 'Investors', { size: 13, color: 'accent' });
  s.text(cx, cy - 140, 'Economic', { size: 14, bold: true });
  s.text(cx - 190, cy - 70, 'Social', { size: 14, bold: true });
  s.text(cx + 184, cy - 70, 'Technological', { size: 14, bold: true });
  s.text(cx - 184, cy + 82, 'Political', { size: 14, bold: true });
  s.text(cx + 184, cy + 82, 'Legal', { size: 14, bold: true });
  s.text(cx, cy + 142, 'Outer ring: general forces (indirect)', { size: 12, muted: true });
  s.text(cx, cy + 118, 'Inner ring: specific forces (direct)', { size: 12, color: 'accent' });
  return s.visual(
    'Diagram of the business environment as rings around a firm: the inner ring holds specific forces (customers, suppliers, competitors, investors) that act directly; the outer ring holds general forces (economic, social, technological, political, legal) that act indirectly',
    'Specific forces touch one firm directly; general forces touch every firm indirectly.',
  );
})();

const vChemBars = (() => {
  const s = new Svg(520, 300);
  const c = s.chart({ x0: 0, x1: 4, y0: 0, y1: 200, left: 70, top: 30, width: 380, height: 200, xLabel: 'Month', yLabel: 'Receipts (₹ thousand)' });
  const bar = (x, from, to, color) => s.rect(c.X(x - 0.35), c.Y(to), c.X(x + 0.35) - c.X(x - 0.35), c.Y(from) - c.Y(to), { rx: 2, fill: color, color, sw: 1, fillOpacity: 0.85 });
  bar(1, 0, CHEM.before.cash, 'muted');
  bar(1, CHEM.before.cash, cTot(CHEM.before), 'accent');
  bar(3, 0, CHEM.after.cash, 'muted');
  bar(3, CHEM.after.cash, cTot(CHEM.after), 'accent');
  c.xTick(1, 'Before').xTick(3, 'After');
  c.yTick(100, '100').yTick(200, '200');
  c.label([1, CHEM.before.cash / 2], `Cash ${CHEM.before.cash}`, { size: 12 });
  c.label([3, CHEM.after.cash / 2], `Cash ${CHEM.after.cash}`, { size: 12 });
  c.label([1.45, CHEM.before.cash + CHEM.before.digital / 2], `Digital ${CHEM.before.digital}`, { size: 12, anchor: 'start', color: 'accent' });
  c.label([3.45, CHEM.after.cash + CHEM.after.digital / 2], `Digital ${CHEM.after.digital}`, { size: 12, anchor: 'start', color: 'accent' });
  return s.visual(
    `Stacked bar chart of an imagined chemist's monthly receipts in thousand rupees: before, cash ${CHEM.before.cash} and digital ${CHEM.before.digital} (total ${cTot(CHEM.before)}); after, cash ${CHEM.after.cash} and digital ${CHEM.after.digital} (total ${cTot(CHEM.after)})`,
    `Imagined chemist. Digital share: ${CHEM_BEFORE} per cent before, ${CHEM_AFTER} per cent after.`,
  );
})();

const vInOut = table(
  ['Inside the firm (not business environment)', 'Outside the firm (business environment)'],
  [
    ['Owners\' decisions, staff, machines, office', 'Customers, suppliers, competitors, investors'],
    ['Its own products, prices and policies', 'Economic, social, technological, political and legal conditions'],
    ['Largely under management\'s control', 'Outside the control of any single firm'],
  ],
  'Table contrasting what lies inside a firm (owners, staff, machines, its own policies, under its control) with the business environment outside it (customers, suppliers, competitors, investors and the general conditions, outside its control)',
);
const vFeat1 = table(
  ['Feature', 'Meaning in one line', 'Quick illustration (imagined)'],
  [
    ['Totality of external forces', 'The sum of all forces outside the firm, taken together', 'Buyers, rivals, laws and technology all at once'],
    ['Specific and general forces', 'Some act on one firm directly; others on all firms indirectly', 'A supplier\'s delay vs a change in interest rates'],
    ['Inter-relatedness', 'A change in one force sets off changes in others', 'A tax change alters prices, demand and advertising'],
  ],
  'Table of three features of business environment: totality of external forces, specific and general forces, and inter-relatedness, with meanings and illustrations',
);
const vFeat2 = table(
  ['Feature', 'Meaning in one line', 'Quick illustration (imagined)'],
  [
    ['Dynamic nature', 'It keeps changing', 'Phone models outdated within a year or two'],
    ['Uncertainty', 'Future changes are hard to predict', 'Will this season\'s colours sell next year?'],
    ['Complexity', 'Many forces, hard to understand together', 'How an election, a drought and a new app combine'],
    ['Relativity', 'Its effect differs by place and firm', 'Raincoats sell in Kerala in June, not in Rajasthan'],
  ],
  'Table of four more features of business environment: dynamic nature, uncertainty, complexity and relativity, with meanings and illustrations',
);
const vChain = flow(
  'LR',
  ['Health awareness grows (social)', 'Demand for baked snacks rises (economic)', 'Firms adopt new ovens (technological)', 'Labelling rules tighten (legal)'],
  'Flow showing inter-relatedness: growing health awareness, a social change, raises demand for baked snacks, which leads firms to adopt new ovens, and labelling rules then tighten',
  'One change ripples through the others',
);
const vSpotFeat = table(
  ['Line in the case (imagined toy maker, Channapatna)', 'Feature', 'Why'],
  [
    ['"Our buyers abroad and our buyers in Mysuru react quite differently to the same price rise"', 'Relativity', 'Same force, different effect by place'],
    ['"Nobody can say whether wooden toys will stay in fashion"', 'Uncertainty', 'The future is hard to predict'],
    ['"Each year brings a new design trend"', 'Dynamic nature', 'Constant change'],
  ],
  'Worked example table: three lines from an imagined toy maker in Channapatna matched to the features relativity, uncertainty and dynamic nature, with reasons',
  'Quote the line, name the feature, give the reason.',
);
const vOppThreat = flow(
  'TB',
  ['Scan the environment', 'Opportunity found → act first (first-mover advantage)', 'Threat found → prepare early (early warning)'],
  'Flow: scanning the environment leads either to an opportunity, where the firm acts first and gains the first-mover advantage, or to a threat, where it prepares early using early warning signals',
  'Two sides of the same habit',
  [
    { from: 'n1', to: 'n2' },
    { from: 'n1', to: 'n3' },
  ],
);
const vImportance = table(
  ['Benefit', 'What the firm gains'],
  [
    ['Identifying opportunities', 'First-mover advantage in new markets'],
    ['Identifying threats', 'Early warning, time to prepare'],
    ['Tapping useful resources', 'Finance, material, machines, people on better terms'],
    ['Coping with rapid changes', 'Adapting in time rather than being surprised'],
    ['Planning and policy formulation', 'A sound basis for goals and courses of action'],
    ['Improving performance', 'Better results over time'],
  ],
  'Table of six benefits of understanding the business environment: identifying opportunities, identifying threats, tapping resources, coping with rapid changes, planning and policy formulation, and improving performance',
);
const vApply = table(
  ['Situation at an imagined dairy in Anand', 'Benefit of understanding the environment'],
  [
    ['Spots demand for lactose-free milk before rivals', 'Opportunity and first-mover advantage'],
    ['Learns early that a big rival will open a plant nearby', 'Threat and early warning'],
    ['Gets a cheaper loan by tracking bank schemes', 'Tapping useful resources'],
    ['Shifts to online orders as habits change', 'Coping with rapid changes'],
  ],
  'Worked example table applying four benefits of understanding the environment to an imagined dairy in Anand',
  'Name the benefit and point to the line that shows it.',
);
const vScan = flow(
  'LR',
  ['Notice the change', 'Judge: opportunity or threat?', 'Revise plans', 'Act and review'],
  'Flow of how a firm responds to its environment: notice the change, judge whether it is an opportunity or a threat, revise plans, then act and review',
  'Responding to change',
);
const vSum1 = table(
  ['Idea', 'Remember'],
  [
    ['Meaning', 'All external forces that can affect a business'],
    ['Features', 'Totality, specific and general, inter-related, dynamic, uncertain, complex, relative'],
    ['Importance', 'Opportunities, threats, resources, coping with change, planning, performance'],
  ],
  'Summary table of Part 1: meaning, seven features and six benefits of understanding the business environment',
);
const vRoute1 = flow('LR', ['Meaning', 'Specific and general forces', 'Features', 'Importance'], 'Route map of Part 1: meaning, specific and general forces, features, importance', 'Part 1 at a glance');

// Deck 2 visuals
const vRoute2 = flow('LR', ['Five dimensions', 'Economic, social, technological', 'Political and legal', 'Demonetisation'], 'Route map of Part 2: the five dimensions of business environment, then demonetisation', 'Part 2 at a glance');
const vDims = table(
  ['Dimension', 'What it includes'],
  [
    ['Economic', 'Interest rates, inflation, incomes, money supply, stock market, tax rates'],
    ['Social', 'Customs, traditions, values, lifestyles, health and education levels'],
    ['Technological', 'Scientific improvements and innovations: new ways of producing and delivering'],
    ['Political', 'Stability of government, law and order, government\'s attitude to business'],
    ['Legal', 'Acts, rules and court decisions that business must follow'],
  ],
  'Table of the five dimensions of business environment and what each includes: economic, social, technological, political and legal',
);
const vEcon = table(
  ['Economic change', 'Likely effect on business'],
  [
    ['Interest rates fall', 'Cheaper loans: more investment and credit buying'],
    ['Inflation rises', 'Costs rise; buyers may cut spending'],
    ['Incomes rise', 'Demand rises for many goods and services'],
  ],
  'Table of economic changes and their likely effects: falling interest rates encourage investment and credit buying, rising inflation raises costs, rising incomes raise demand',
);
const vSocial = table(
  ['Social change', 'Business response (imagined)'],
  [
    ['More women in paid work', 'Creches, ready-to-cook food, home services grow'],
    ['Greater health awareness', 'Gyms and low-sugar foods grow'],
    ['Festivals and traditions', 'Seasonal demand for sweets, lamps, clothes'],
  ],
  'Table of social changes and business responses: more women in paid work, greater health awareness, and festivals and traditions',
);
const vTech = flow(
  'TB',
  ['New technology arrives', 'Firms that adopt it gain new customers (opportunity)', 'Firms with outdated products lose sales (threat)'],
  'Flow: new technology creates an opportunity for firms that adopt it and a threat for firms whose products become outdated',
  'Technology cuts both ways',
  [
    { from: 'n1', to: 'n2' },
    { from: 'n1', to: 'n3' },
  ],
);
const vPolLegal = table(
  ['', 'Political environment', 'Legal environment'],
  [
    ['Covers', 'Political conditions: stability, law and order, attitude to business', 'Acts, rules and court decisions'],
    ['Acts on firms by', 'Shaping confidence and the business climate', 'Binding firms to comply'],
    ['Imagined example', 'A stable state government invites investors', 'A rule makes safety labels compulsory'],
  ],
  'Table contrasting the political environment (stability, law and order, government attitude; shapes confidence) with the legal environment (acts, rules, court decisions; binds firms), with examples',
);
const vClassify = table(
  ['Change faced by an imagined tea company in Darjeeling', 'Dimension'],
  [
    ['Wages of plantation workers rise across the region', 'Economic'],
    ['City buyers prefer green tea for health', 'Social'],
    ['Drones are used to spray and monitor bushes', 'Technological'],
    ['A new rule requires the origin to be printed on every pack', 'Legal'],
  ],
  'Worked example table classifying four changes faced by an imagined tea company: rising wages (economic), preference for green tea (social), drones (technological), origin labelling rule (legal)',
  'Ask: is it about money, people, methods, government conditions, or a binding rule?',
);
const vRipple = flow(
  'LR',
  ['Cheap phones and data (technological)', 'Online shopping habits (social)', 'Online sellers gain sales (economic)', 'Rules on online consumer rights (legal)'],
  'Flow of one change rippling across dimensions: cheap phones and data lead to online shopping habits, online sellers gain sales, and rules on online consumer rights follow',
  'The dimensions are inter-related',
);
const vDemoFacts = table(
  ['Point', 'Detail'],
  [
    ['Announced', '8 November 2016, by the Government of India'],
    ['Notes affected', 'The then existing ₹500 and ₹1,000 notes'],
    ['Meaning', 'They stopped being legal tender'],
    ['What people did', 'Deposited them in banks or exchanged them within a time limit; new notes were issued'],
  ],
  'Table of demonetisation facts: announced 8 November 2016; old 500 and 1,000 rupee notes stopped being legal tender; people deposited or exchanged them within a time limit',
);
const vDemoFeatures = table(
  ['Feature', 'In plain words'],
  [
    ['Tax administration measure', 'Cash comes into banks, so incomes can be checked'],
    ['Curb black money and fake notes', 'Unaccounted and counterfeit cash is exposed'],
    ['Push to a less-cash economy', 'More cards, wallets, transfers'],
    ['Formalisation of savings', 'Money kept at home moves into banks and can be lent'],
  ],
  'Table of features of demonetisation: tax administration measure, curbing black money and fake notes, push to a less-cash economy, formalisation of savings',
);
const vDemoEffects = table(
  ['Short term', 'Longer term'],
  [
    ['Shortage of cash for transactions', 'Wider use of digital payments'],
    ['Lower sales for cash-based trade', 'More firms with bank accounts and formal records'],
    ['Queues at banks, time lost', 'More savings in banks'],
  ],
  'Table of effects of demonetisation on business: short-term cash shortage, lower sales and lost time; longer-term wider digital payments, more formal records and more bank savings',
);
const vSum2 = table(
  ['Idea', 'Remember'],
  [
    ['Five dimensions', 'Economic, social, technological, political, legal'],
    ['Political vs legal', 'Conditions and attitude vs binding rules'],
    ['Demonetisation', '8 Nov 2016; old ₹500 and ₹1,000 notes; tax administration, less cash, formalisation'],
  ],
  'Summary table of Part 2: five dimensions, the political versus legal distinction, and the key points of demonetisation',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Business Environment — Part 1: Meaning, Features and Importance',
  goals: [
    'Explain the meaning of business environment and tell specific forces from general forces',
    'Explain the features of business environment and identify them in a case',
    'Explain why understanding the environment matters for a business',
  ],
  slides: [
    sl('title', 'Business Environment', {
      b: 'Part 1 — what the business environment is, its **features**, and why firms must **understand** it.',
      v: vRoute1,
      n: 'Welcome to Business Environment. No business works in a vacuum. Customers change their tastes, rivals launch new products, banks change interest rates and governments make new rules. In this part we see what the business environment means, what its features are, and why every manager, from a small shop owner to a large company head, must keep watching it.',
    }),
    sl('concept', 'What is business environment?', {
      b: 'The **business environment** is the sum of all **individuals, institutions and other forces outside** a business that are beyond its control but may affect its performance.',
      v: vInOut,
      n: 'Draw a line around a firm. Everything inside, such as the owners, staff, machines and the firm\'s own policies, is largely under management\'s control. Everything outside the line that can affect the firm is its business environment: customers, suppliers, rivals, investors, and the wider economic, social, technological, political and legal conditions. The key words are external and beyond control.',
    }),
    sl('diagram', 'Specific and general forces', {
      v: vRings,
      n: 'Picture the firm at the centre of two rings. The inner ring holds specific forces such as customers, suppliers, competitors and investors. They deal with the firm directly, almost every day. The outer ring holds general forces: economic, social, technological, political and legal conditions. They affect all firms, but indirectly. A supplier\'s strike hits one firm; a rise in interest rates touches everyone.',
    }),
    sl('check', 'Quick check: general or specific?', {
      b: 'Which one of these is a **general** force?',
      chk: 'm_general',
      n: 'Ask whether the force deals with one firm directly, or whether it affects all firms in an indirect way.',
    }),
    sl('concept', 'Features (1): totality, specific and general, inter-relatedness', {
      v: vFeat1,
      n: 'The environment has several features. First, totality: it is the sum of all external forces taken together. Second, it has both specific and general forces. Third, the forces are inter-related. A change in one sets off changes in others. For instance, a new tax may change prices, which changes demand, which changes how firms advertise.',
    }),
    sl('concept', 'Features (2): dynamic, uncertain, complex, relative', {
      v: vFeat2,
      n: 'Four more features. The environment is dynamic: it keeps changing. It is uncertain: the future is hard to predict, especially in fashion and technology. It is complex: there are so many forces that their combined effect is hard to understand. And it is relative: the same force can have a different effect in different places, or on different firms.',
    }),
    sl('check', 'Quick check: name the feature', {
      b: 'Woollen jackets sell more in Ladakh but not in Chennai. Which feature is this?',
      chk: 'm_relativity',
      n: 'The same change, a different result in two places. Which feature describes that?',
    }),
    sl('diagram', 'Inter-relatedness in action', {
      v: vChain,
      n: 'Here is inter-relatedness in action. As people become more health conscious, a social change, demand for baked snacks rises, an economic change. Firms buy new ovens, a technological change, and the government tightens labelling rules, a legal change. So a manager can never look at one force in isolation; one change ripples through the others.',
    }),
    sl('example', 'Worked example 1: spotting features in a case', {
      b: 'Board questions often quote lines from a case and ask you to name the feature.',
      bl: [
        'Step 1 — Read each line and ask what it says about the environment: change, unpredictability, place-to-place difference, linked forces?',
        'Step 2 — Name the **feature** exactly.',
        'Step 3 — Quote the line and give the **reason** in a few words.',
      ],
      v: vSpotFeat,
      n: 'Let us practise with an imagined toy maker in Channapatna. When the owner says buyers abroad and buyers in Mysuru react differently to the same price rise, that is relativity. When she says nobody can tell whether wooden toys will stay in fashion, that is uncertainty. When each year brings a new design trend, that is the dynamic nature. Always quote the line, name the feature and give a reason.',
    }),
    sl('check', 'Quick check: true or false?', {
      b: 'Business environment is complex because its many forces and their combined effect are hard to understand.',
      chk: 'tf_complex',
      n: 'Think about what makes the environment difficult to understand completely.',
    }),
    sl('two-column', 'Why understand the environment? (1)', {
      cols: [
        '**Opportunities**\n\n- Spot new needs early\n- Act before rivals\n- Gain the **first-mover advantage**',
        '**Threats**\n\n- Notice coming dangers\n- New rivals, rules, shortages\n- Use **early warning signals** to prepare',
      ],
      v: vOppThreat,
      n: 'Why should managers study the environment? First, to identify opportunities. A firm that spots a new need early and acts first gains the first-mover advantage. Second, to identify threats. News of a powerful new rival, a stricter rule or a shortage of raw material is an early warning signal; the firm that notices it can prepare before the damage is done.',
    }),
    sl('concept', 'Why understand the environment? (2)', {
      v: vImportance,
      n: 'There are more reasons. The environment is the source of a firm\'s resources such as finance, raw material, machines and people, so understanding it helps tap them on better terms. It helps a firm cope with rapid changes in a fast-moving market. It gives a sound basis for planning and policy formulation. And all of this together improves performance over time.',
    }),
    sl('check', 'Quick check: which benefit?', {
      b: 'A firm launches a millet mix before any rival and becomes the best-known brand. Which benefit did it gain?',
      chk: 'm_firstmover',
      n: 'The firm saw a need early and acted before others. Which benefit is that?',
    }),
    sl('example', 'Worked example 2: applying the benefits', {
      b: 'Match each situation at an imagined dairy in Anand with the benefit it shows.',
      bl: [
        'Step 1 — Is the dairy **gaining** something new (opportunity) or **avoiding** harm (threat)?',
        'Step 2 — Is it about **inputs** (resources), **speed of change** (coping), or **future plans** (planning)?',
        'Step 3 — Write the benefit and point to the words in the situation.',
      ],
      v: vApply,
      n: 'Here is how to apply the benefits. Spotting demand for lactose-free milk before rivals is an opportunity with the first-mover advantage. Hearing early that a large rival will open a plant nearby is a threat noticed in time. Getting a cheaper loan by tracking bank schemes is tapping resources. Moving to online orders as habits change is coping with rapid change.',
    }),
    sl('diagram', 'How firms respond to change', {
      v: vScan,
      n: 'Good firms follow a simple cycle. They notice the change by scanning the environment. They judge whether it is an opportunity or a threat for them. They revise their plans and policies. Then they act, and keep watching the results, because the environment will change again. This is why environmental study is a continuous habit, not a one-time exercise.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up. The business environment is the total of all external forces that may affect a business. It has specific forces acting directly and general forces acting indirectly. Its features are totality, specific and general forces, inter-relatedness, dynamic nature, uncertainty, complexity and relativity. Understanding it helps a firm find opportunities, avoid threats, tap resources, cope with change, plan, and perform better.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Use the word **external**: the environment is outside the firm and beyond its control.',
        'In case questions, **quote the exact line** before naming the feature or benefit.',
        'Do not confuse **relativity** (differs by place or firm) with **uncertainty** (future unknown).',
        'Opportunities go with the **first-mover advantage**; threats go with **early warning signals**.',
        '5-mark questions: five named points, each with one line of explanation.',
      ],
      n: 'A few tips. Always describe the environment as external and beyond the firm\'s control. In case questions, quote the exact line first, then name the feature or benefit. Keep relativity and uncertainty apart. Pair opportunities with the first-mover advantage, and threats with early warning signals. For five marks, write five named points with a line of explanation each.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Business Environment — Part 2: Dimensions and Demonetisation',
  goals: [
    'Classify changes into the economic, social, technological, political and legal dimensions',
    'Distinguish the political environment from the legal environment',
    'Explain the concept and features of demonetisation and how it affected businesses',
  ],
  slides: [
    sl('title', 'Dimensions of business environment', {
      b: 'Part 2 — the **five dimensions** of the general environment, and **demonetisation** (2016).',
      v: vRoute2,
      n: 'In Part 2 we look closely at the general environment, which has five dimensions: economic, social, technological, political and legal. Then we study one real change that affected almost every Indian business at the same time: the withdrawal of the old five hundred and one thousand rupee notes in November 2016.',
    }),
    sl('diagram', 'The five dimensions', {
      v: vDims,
      n: 'Here are the five dimensions. Economic covers interest rates, inflation, incomes and tax rates. Social covers customs, values and lifestyles. Technological covers new inventions and methods. Political covers the stability of government and its attitude towards business. Legal covers the acts, rules and court decisions that firms must obey. Learn one clear example for each.',
    }),
    sl('concept', 'Economic environment', {
      v: vEcon,
      n: 'The economic environment matters most directly for costs and demand. When interest rates fall, loans become cheaper, so firms invest more and customers buy homes and cars on credit. When inflation rises, raw material and wages cost more, and buyers may cut back. When incomes rise, demand rises for many goods and services.',
    }),
    sl('concept', 'Social environment', {
      v: vSocial,
      n: 'The social environment is about people: their customs, traditions, values and ways of living. As more women take up paid work, demand grows for creches and ready-to-cook food. Health awareness lifts gyms and low-sugar foods. Festivals create seasonal demand for sweets, lamps and clothes. A firm that reads these changes well can design the right products.',
    }),
    sl('concept', 'Technological environment', {
      v: vTech,
      n: 'The technological environment covers scientific improvements and innovations that give new ways of making and delivering goods and services. Technology cuts both ways. Firms that adopt a new method or product early gain customers, while firms that stay with outdated products lose sales. Think of how phone cameras affected the makers of film rolls.',
    }),
    sl('check', 'Quick check: which dimension?', {
      b: 'Shopkeepers start accepting payments by QR code. Which dimension is this?',
      chk: 'm_dim_tech',
      n: 'A new way of doing a familiar task. Which dimension does that belong to?',
    }),
    sl('two-column', 'Political and legal environment', {
      cols: [
        '**Political**\n\n- Stability of government\n- Law and order\n- Government\'s attitude to business',
        '**Legal**\n\n- Acts passed by the legislature\n- Rules made by the government\n- Court decisions',
      ],
      v: vPolLegal,
      n: 'Students often mix up these two. The political environment is about political conditions: whether the government is stable, whether there is peace and law and order, and whether the government welcomes business. The legal environment is about the actual laws, rules and court decisions that firms are bound to follow. In short, one sets the mood for investment, while the other lays down what firms must do.',
    }),
    sl('check', 'Quick check: fill in the blank', {
      b: 'Inflation, interest rates and money supply belong to which environment?',
      chk: 'fb_dims',
      n: 'These are all about money, prices and credit. Name the dimension.',
    }),
    sl('example', 'Worked example 1: classifying changes', {
      b: 'An imagined tea company in Darjeeling faces four changes. Classify each.',
      bl: [
        'Step 1 — Money, prices, wages or credit? **Economic**.',
        'Step 2 — People\'s tastes, values, habits? **Social**.',
        'Step 3 — New methods or machines? **Technological**.',
        'Step 4 — Government conditions? **Political**. A binding rule or court order? **Legal**.',
      ],
      v: vClassify,
      n: 'Let us classify four changes for an imagined tea company. Rising wages across the region is about costs, so economic. City buyers preferring green tea for health is about tastes, so social. Drones that spray and monitor the bushes are a new method, so technological. A rule that the origin must be printed on every pack is a binding rule, so legal.',
    }),
    sl('diagram', 'One change, many dimensions', {
      v: vRipple,
      n: 'Remember that the dimensions are inter-related. Cheap phones and data, a technological change, changed shopping habits, a social change. Online sellers gained sales, an economic change, and new rules followed to protect online buyers, a legal change. In a long answer, showing this chain earns marks for understanding, not just for listing.',
    }),
    sl('check', 'Quick check: match the changes', {
      b: 'Match each change faced by an imagined lamp maker with its dimension.',
      chk: 'mt_dims',
      n: 'Take each change in turn and ask the same five questions you used in the worked example.',
    }),
    sl('concept', 'Demonetisation: what happened', {
      v: vDemoFacts,
      n: 'Now a change that touched almost every business together. On the eighth of November 2016, the Government of India announced that the then existing five hundred and one thousand rupee notes would stop being legal tender. People had to deposit them in banks or exchange them within a time limit, and new notes were issued over the following weeks.',
    }),
    sl('concept', 'Features of demonetisation', {
      v: vDemoFeatures,
      n: 'Its stated features and aims were these. It was a tax administration measure, because cash had to come into banks where incomes could be checked. It aimed to curb black money and counterfeit notes. It pushed the economy towards fewer cash payments and more digital ones. And it moved savings kept at home into the formal banking system.',
    }),
    sl('check', 'Quick check: what did it mean?', {
      b: 'What did demonetisation of the old notes mean for a business in practice?',
      chk: 'm_demo_meaning',
      n: 'Think about whether the old notes could still be used to pay, and what holders had to do.',
    }),
    sl('example', 'Worked example 2: reading payment data', {
      b: `An imagined chemist\'s monthly receipts (₹ thousand): before, cash ${CHEM.before.cash} and digital ${CHEM.before.digital}; after, cash ${CHEM.after.cash} and digital ${CHEM.after.digital}.`,
      bl: [
        `Step 1 — Totals: ${CHEM.before.cash} + ${CHEM.before.digital} = ${cTot(CHEM.before)}; ${CHEM.after.cash} + ${CHEM.after.digital} = ${cTot(CHEM.after)}.`,
        `Step 2 — Digital share before: ${CHEM.before.digital} ÷ ${cTot(CHEM.before)} × 100 = ${CHEM_BEFORE} per cent.`,
        `Step 3 — Digital share after: ${CHEM.after.digital} ÷ ${cTot(CHEM.after)} × 100 = ${CHEM_AFTER} per cent.`,
        'Step 4 — Link to a feature: the **push to a less-cash, digital economy**.',
      ],
      v: vChemBars,
      n: 'Case questions may give you figures. For this imagined chemist, total receipts stayed at two hundred thousand rupees a month. Digital receipts were fifteen per cent of the total before and forty per cent after. Once you have worked out the change, link it to a feature: here, the push towards a less-cash, digital economy.',
    }),
    sl('two-column', 'Effects on business', {
      cols: [
        '**Short term**\n\n- Cash shortage\n- Lower sales for cash-based trade\n- Time lost in bank queues',
        '**Longer term**\n\n- More digital payments\n- More formal accounts and records\n- More savings in banks',
      ],
      v: vDemoEffects,
      n: 'For businesses the effects came in two stages. In the short term, cash was scarce, so trades that depended on cash saw lower sales, and owners lost time in bank queues. Over a longer period, more businesses accepted digital payments, kept formal records and held their money in banks. In the exam, describe these effects in neutral terms.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'To sum up Part 2. The general environment has five dimensions: economic, social, technological, political and legal. Political means conditions and attitude; legal means binding rules and court decisions. Demonetisation, announced on the eighth of November 2016, withdrew the old five hundred and one thousand rupee notes as legal tender; its features were tax administration, curbing black money and fake notes, less cash, and formalisation of savings.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Classify by asking: money, people, methods, government conditions, or a binding rule?',
        'A **rule or court order** is **legal**, even if the government made it; stability and attitude are **political**.',
        'Demonetisation: **8 November 2016**, old **₹500 and ₹1,000** notes; do not mix it up with **GST** (2017).',
        'For demonetisation, write **features** in neutral language; do not give a personal verdict.',
        'In case questions, quote the line, then name the dimension or feature.',
      ],
      n: 'Final tips. To classify a change, ask whether it is about money, people, methods, government conditions, or a binding rule. A rule or a court order is legal, even when the government made it. Remember the date and notes for demonetisation, and do not confuse it with the Goods and Services Tax of 2017. Write its features in neutral language, and always quote the line in case questions.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Business Environment — Notes',
  sections: [
    {
      h: '1. Meaning: specific and general forces',
      t: 1,
      b: 'The **business environment** is the sum of all individuals, institutions and other forces **outside** a business that it **cannot control** but that may affect its working.\n\n- **Specific forces** act on an individual firm **directly** in its daily working: customers, suppliers, competitors, investors.\n- **General forces** act on **all** firms, **indirectly**: economic, social, technological, political and legal conditions.\n\nThe firm itself (owners, staff, machines, its own policies) is **not** part of the environment.',
      terms: [
        ['Business environment', 'All external individuals, institutions and forces that may affect a business and lie beyond its control.'],
        ['Specific forces', 'Customers, suppliers, competitors and investors, who affect a firm directly.'],
        ['General forces', 'Economic, social, technological, political and legal conditions that affect all firms indirectly.'],
      ],
      v: vRings,
      vs: [vInOut],
    },
    {
      h: '2. Features of business environment',
      t: 1,
      b: '1. **Totality of external forces**: the aggregate of everything outside the firm.\n2. **Specific and general forces**: direct and indirect influences.\n3. **Inter-relatedness**: forces affect one another; one change sets off others.\n4. **Dynamic nature**: it keeps changing (technology, tastes, competition, policy).\n5. **Uncertainty**: future conditions are hard to predict, especially in fashion and IT.\n6. **Complexity**: many forces whose combined effect is hard to grasp.\n7. **Relativity**: the effect of a force differs from place to place and firm to firm.',
      terms: [
        ['Inter-relatedness', 'The feature that a change in one environmental force leads to changes in others.'],
        ['Relativity', 'The feature that the same force affects different places or firms differently.'],
      ],
      v: vFeat1,
      vs: [vFeat2, vChain],
    },
    {
      h: '3. Importance of understanding the environment',
      t: 1,
      b: '1. **Identifying opportunities and the first-mover advantage**: acting early on new needs.\n2. **Identifying threats and early warning signals**: preparing for new rivals, rules or shortages.\n3. **Tapping useful resources**: inputs such as finance, raw material, machines and labour come from the environment.\n4. **Coping with rapid changes**: adapting in time in a fast-changing market.\n5. **Assistance in planning and policy formulation**: opportunities and threats are the basis of plans.\n6. **Improving performance**: firms that monitor the environment do better over time.\n\nBecause the environment is dynamic, studying it must be a **continuous** process.',
      terms: [
        ['First-mover advantage', 'The lead a firm gains by being the first to act on a new opportunity.'],
        ['Early warning signal', 'An early sign of a coming threat that lets a firm prepare in time.'],
      ],
      v: vImportance,
      vs: [vOppThreat, vScan],
    },
    {
      h: '4. Economic, social and technological dimensions',
      t: 2,
      b: '- **Economic environment**: interest rates, inflation, disposable income, money supply, the stock market, tax rates. These shape **costs and demand**.\n- **Social environment**: customs, traditions, values, lifestyles, health and education levels, population trends. These shape **what people buy**.\n- **Technological environment**: scientific improvements and innovations that give new ways of producing and delivering goods and services. They create **opportunities** for firms that adopt them and **threats** for firms with outdated products.',
      terms: [
        ['Economic environment', 'Money-related conditions such as interest rates, inflation, incomes and tax rates.'],
        ['Social environment', 'The customs, values and ways of living of people in society.'],
        ['Technological environment', 'Scientific improvements and innovations offering new ways of doing things.'],
      ],
      v: vDims,
      vs: [vEcon, vSocial, vTech],
    },
    {
      h: '5. Political and legal dimensions',
      t: 2,
      b: '- **Political environment**: political conditions such as general stability and peace, law and order, and the attitude of the government towards business. These shape **business confidence**.\n- **Legal environment**: legislation passed by Parliament and state legislatures, rules and orders of the government, and **decisions of courts**. Firms are **bound** to comply.\n\nThe five dimensions are **inter-related**: a technological change can alter habits (social), sales (economic) and later rules (legal).',
      terms: [
        ['Political environment', 'Political conditions such as stability, law and order and the government\'s attitude to business.'],
        ['Legal environment', 'Acts, rules and judicial decisions that businesses must follow.'],
      ],
      v: vPolLegal,
      vs: [vClassify, vRipple],
    },
    {
      h: '6. Demonetisation (2016)',
      t: 3,
      b: '**Concept:** on **8 November 2016** the Government of India withdrew the **legal-tender** status of the then existing **₹500 and ₹1,000** notes. Holders had to deposit or exchange them within a time limit; new notes were issued.\n\n**Features and stated aims:**\n1. A **tax administration measure**: cash moved into banks, where incomes could be traced.\n2. To curb **black money** and **counterfeit** currency.\n3. A push towards a **less-cash, digital** economy (cards, wallets, transfers).\n4. **Formalisation of savings**: money held at home moved into the banking system.\n\n**Effects on business:** a short-term **shortage of cash** hit cash-based trade; over time more firms accepted **digital payments** and kept **formal records**. Describe these effects in neutral terms.',
      terms: [
        ['Demonetisation', 'Withdrawing the legal-tender status of a currency unit, so that it stops being valid for payments.'],
        ['Legal tender', 'Money that must be accepted for the payment of debts.'],
      ],
      v: vDemoFacts,
      vs: [vDemoFeatures, vDemoEffects, vChemBars],
    },
  ],
  tips: '**Common mistakes**\n- Including the firm\'s own staff or machines in its environment: the environment is **external**.\n- Calling a binding rule "political": acts, rules and court orders are **legal**; stability and attitude are **political**.\n- Mixing up **relativity** (effect differs by place or firm) and **uncertainty** (future cannot be predicted).\n- Confusing demonetisation (**8 November 2016**, notes) with **GST** (1 July 2017, taxes).\n- Writing a personal verdict on demonetisation instead of its **features** and effects.\n\n**How marks are usually awarded**\n- 1 mark: correct option, or the correct feature or dimension.\n- 3–4 mark case parts: **quote the line**, name the feature/dimension/benefit, explain briefly.\n- 5 marks: five named points, each explained in a line, about 80–120 words.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Business environment**', 'All external individuals, institutions and forces that may affect a business and are beyond its control.', 'definition', 1],
  ['Is a firm\'s own staff part of its environment?', '**No**: the environment is **external** to the firm.', 'concept', 1],
  ['**Specific forces**: examples', 'Customers, suppliers, competitors, investors: they act **directly** on one firm.', 'fact', 1],
  ['**General forces**: examples', 'Economic, social, technological, political, legal: they act **indirectly** on all firms.', 'fact', 1],
  ['Feature: **totality of external forces**', 'The environment is the **sum** of all forces outside the firm.', 'definition', 1],
  ['Feature: **inter-relatedness**', 'A change in one force sets off changes in others.', 'definition', 1],
  ['Feature: **dynamic nature**', 'The environment keeps **changing**.', 'definition', 1],
  ['Feature: **uncertainty**', 'Future conditions are **hard to predict**.', 'definition', 1],
  ['Feature: **complexity**', 'Many forces; their **combined effect** is hard to understand.', 'definition', 1],
  ['Feature: **relativity**', 'The effect of a force **differs by place or firm**.', 'definition', 1],
  ['Raincoats sell in Kerala in June but not in Rajasthan: feature?', '**Relativity**.', 'example', 1],
  ['**First-mover advantage**', 'The lead gained by acting **first** on a new opportunity.', 'definition', 1],
  ['**Early warning signals**', 'Early signs of a **threat** that let a firm prepare in time.', 'definition', 1],
  ['Six benefits of understanding the environment', 'Opportunities; threats; tapping resources; coping with change; planning and policy; improving performance.', 'concept', 1],
  ['Why is environmental study a **continuous** process?', 'Because the environment is **dynamic**: it keeps changing.', 'concept', 1],
  ['Five dimensions of the general environment', '**Economic, social, technological, political, legal**.', 'fact', 2],
  ['**Economic environment** includes', 'Interest rates, inflation, incomes, money supply, stock market, tax rates.', 'fact', 2],
  ['**Social environment** includes', 'Customs, traditions, values, lifestyles, health and education levels.', 'fact', 2],
  ['**Technological environment**', 'Scientific improvements and innovations: new ways of producing and delivering.', 'definition', 2],
  ['**Political environment**', 'Stability of government, law and order, government\'s attitude to business.', 'definition', 2],
  ['**Legal environment**', 'Acts, rules and **court decisions** that firms must follow.', 'definition', 2],
  ['A rule making safety labels compulsory: dimension?', '**Legal**.', 'example', 2],
  ['Interest rates on loans fall: dimension?', '**Economic**.', 'example', 2],
  ['QR-code payments at small shops: dimension?', '**Technological**.', 'example', 2],
  ['Technology as opportunity and threat', 'Gain for firms that adopt it; loss for firms with outdated products.', 'concept', 2],
  ['**Demonetisation**: date', '**8 November 2016**.', 'fact', 3],
  ['**Demonetisation**: which notes?', 'The then existing **₹500 and ₹1,000** notes.', 'fact', 3],
  ['**Legal tender**', 'Money that must be accepted in payment of debts.', 'definition', 3],
  ['Why a **tax administration measure**?', 'Cash had to come into banks, where incomes could be traced.', 'concept', 3],
  ['Four features of demonetisation', 'Tax administration; curb black money and fake notes; push to digital payments; formalisation of savings.', 'concept', 3],
  ['Short-term effect on cash-based shops', 'A **shortage of cash** and lower sales for some weeks.', 'concept', 3],
  ['Demonetisation vs GST', 'Demonetisation (2016): withdrawal of old notes. **GST** (2017): one tax replacing many indirect taxes.', 'exam-tip', 3],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-default-chapter-test-short',
  title: 'Chapter test (short) — Business Environment',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_meaning', 'm_dim_social', 'm_demo_date', 'ar_interrelated'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_specgen', 's_demo_features', 's3_importance'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_importance', 'l_dimensions'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the passage and answer all parts. Part (c) has an internal choice.', items: ['cb_saanjh'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-default-chapter-test-long',
  title: 'Chapter test (long) — Business Environment',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_specific', 'm_dynamic', 'm_uncertainty', 'm_warning', 'm_dim_economic', 'm_dim_legal', 'm_legal_vs_pol', 'm_demo_tax', 'ar_social', 'ar_demo_cash'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_coping', 's_social_env', { attempt: 1, keys: ['s_tech_env', 's_econ_env'] }, 's3_pol_legal', { attempt: 1, keys: ['s3_three_features', 's3_demo_objectives'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_features', { attempt: 1, keys: ['l_interrelated_dims', 'l_demo'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each passage and answer all parts. Part (c) of each has an internal choice.', items: ['cb_vidyut', 'cb_ganesh'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t03 of cbse-12-business-studies-ch03 only (concept, features and importance; five dimensions; demonetisation); the deleted topic on LPG as an impact on business is not taught',
    originality: 'every firm, person, town, case and table written for this chapter (imagined and labelled); no NCERT text, example or exercise and no board/sample-paper item reused',
    data: `imagined figures computed by the build (chemist digital share ${CHEM.before.digital}/${cTot(CHEM.before)} = ${CHEM_BEFORE} per cent and ${CHEM.after.digital}/${cTot(CHEM.after)} = ${CHEM_AFTER} per cent; wholesaler digital share 10 and 47.5 per cent); no statistics`,
    facts: 'demonetisation announced 8 November 2016, withdrawing legal-tender status of the then existing ₹500 and ₹1,000 notes; GST from 1 July 2017 (named only to avoid confusion)',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
