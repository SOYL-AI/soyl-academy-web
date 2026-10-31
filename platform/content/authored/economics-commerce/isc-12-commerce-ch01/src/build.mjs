// Build ISC 12 Commerce ch01 Business Environment. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-commerce-ch01/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('isc-12-commerce-ch01', 'economics-commerce');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- visuals
const vRoute1 = flow('LR', ['What business environment is', 'Its features', 'Why it matters', 'Environmental scanning'], 'Route map of Part 1: the meaning of business environment, its features, its importance and environmental scanning', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Internal factors', 'External micro factors', 'Macro environment', 'SWOT analysis'], 'Route map of Part 2: internal factors, external micro factors, the five macro dimensions and SWOT analysis', 'Part 2 at a glance');

// Layers of the environment: concentric boxes (internal, external micro, macro).
const vLayers = (() => {
  const s = new Svg(560, 340);
  s.rect(20, 20, 520, 300, { fill: 'blue', fillOpacity: 0.08, color: 'blue', sw: 1.5, rx: 18 });
  s.rect(90, 70, 380, 200, { fill: 'green', fillOpacity: 0.12, color: 'green', sw: 1.5, rx: 16 });
  s.rect(190, 125, 180, 90, { fill: 'accent', fillOpacity: 0.18, color: 'accent', sw: 2, rx: 12 });
  s.text(280, 150, 'Internal factors', { bold: true, size: 14 }).text(280, 172, 'mission, values, people,', { size: 12 }).text(280, 190, 'money, technology', { size: 12 });
  s.text(280, 90, 'External micro: suppliers, customers, competitors,', { size: 12 }).text(280, 250, 'intermediaries, financiers, public', { size: 12 });
  s.text(280, 40, 'Macro: economic, social, technological, political, legal', { size: 13, bold: true });
  s.text(280, 300, 'Control falls as we move outwards', { size: 12, muted: true });
  return s.visual('Three nested boxes: at the centre the firm\'s internal factors (mission, values, people, money, technology); around them the external micro environment (suppliers, customers, competitors, intermediaries, financiers, public); outermost the macro environment (economic, social, technological, political and legal). The firm\'s control falls as we move outwards', 'The firm sits inside its micro environment, which sits inside the macro environment.');
})();

const vFeatures = table(
  ['Feature', 'What it means'],
  [
    ['Totality of forces', 'All forces, taken together, form the environment'],
    ['Specific and general forces', 'Some affect one firm (a rival next door); some affect all (a tax change)'],
    ['Inter-relatedness', 'A change in one factor sets off changes in others'],
    ['Dynamic', 'It keeps changing'],
    ['Uncertainty', 'Future changes are hard to predict'],
    ['Complexity', 'Many factors act together, so effects are hard to judge'],
    ['Relativity', 'Its impact differs by place and firm'],
  ],
  'Table of seven features of business environment with their meanings',
);
const vImportance = table(
  ['Benefit', 'Imagined example'],
  [
    ['Identifying opportunities (first-mover advantage)', 'Pahadi Organics launches millet snacks a year before rivals'],
    ['Early warning of threats', 'Tamarind Tiffins starts phone ordering when cloud kitchens open'],
    ['Tapping useful resources', 'A firm learns of a cheaper input supplier or a bank scheme'],
    ['Coping with rapid change', 'A workshop retrains mechanics for electric scooters'],
    ['Planning and policy making', 'A tea estate times its exports with demand forecasts'],
    ['Improving performance', 'Firms that read change early keep customers and margins'],
  ],
  'Table of six benefits of understanding the business environment, each with an imagined example',
);
const vFeatEx = table(
  ['Imagined situation', 'Feature shown'],
  [
    ['Woollen jackets sell in Shimla, not in Chennai', 'Relativity'],
    ['Fuel prices rise, buyers want e-scooters, mechanics retrain', 'Inter-relatedness'],
    ['Festival colours for next year cannot be predicted', 'Uncertainty'],
    ['A rival opens next door; the government changes a tax', 'Specific and general forces'],
  ],
  'Worked table matching four imagined situations with the feature of business environment each shows',
  'Find the clue word: place, chain of changes, prediction, or one firm versus all firms.',
);
const vScan = flow('LR', ['Gather information', 'Analyse signals', 'Share with managers', 'Plan a response', 'Keep watching'], 'Flow of environmental scanning: gather information, analyse the signals, share them with managers, plan a response, and keep watching', 'Scanning is a continuous cycle.', [
  { from: 'n1', to: 'n2' }, { from: 'n2', to: 'n3' }, { from: 'n3', to: 'n4' }, { from: 'n4', to: 'n5' },
]);
const vScanEx = table(
  ['Signal noticed', 'Opportunity or threat?', 'Planned response'],
  [
    ['Hotels ask for eco-friendly décor', 'Opportunity', 'Design a light marble range'],
    ['Cheap resin copies appear online', 'Threat', 'Stress hand-carving and certificates'],
    ['Export portal waives fees for artisans', 'Opportunity', 'List products on the portal'],
  ],
  'Worked scanning log of an imagined marble-craft firm: three signals classified as opportunity or threat with a planned response',
  'Imagined scanning log of Aravalli Stone Crafts, Jodhpur.',
);
const vInternal = table(
  ['Internal factor', 'Example'],
  [
    ['Value system, mission and objectives', 'A firm that refuses to use child labour'],
    ['Structure and corporate culture', 'Open communication and teamwork'],
    ['Human resources', 'Skilled carpenters, trained sales staff'],
    ['Physical and technological resources', 'Machines, buildings, research'],
    ['Financial resources', 'Owners\' funds, ability to borrow'],
    ['Marketing resources and image', 'A trusted brand, a dealer network'],
  ],
  'Table of internal factors of the environment with examples',
);
const vMicro = table(
  ['External micro factor', 'Who they are', 'Effect on the firm'],
  [
    ['Suppliers', 'Sellers of inputs', 'Cost and timely supply'],
    ['Customers', 'Buyers of the product', 'Demand and sales'],
    ['Competitors', 'Firms selling similar products', 'Prices and market share'],
    ['Marketing intermediaries', 'Dealers, wholesalers, couriers, platforms', 'Reach and delivery'],
    ['Financiers', 'Banks and lenders', 'Cost and availability of funds'],
    ['Public', 'Media, local residents, citizens\' groups', 'Image and goodwill'],
  ],
  'Table of six external micro factors, who they are and how each affects a firm',
);
const vMacro = table(
  ['Dimension', 'Includes', 'Imagined change'],
  [
    ['Economic', 'Interest rates, inflation, incomes, economic policy', 'Loan rates rise'],
    ['Social', 'Values, habits, lifestyles, population', 'More working couples buy meal kits'],
    ['Technological', 'New methods, machines, innovations', 'Drones spray crops'],
    ['Political', 'Stability, government attitude to business', 'A stable state welcomes investment'],
    ['Legal', 'Laws, rules, regulations', 'Salt and sugar must be shown on packs'],
  ],
  'Table of the five macro dimensions, what each includes and an imagined change for each',
);
const vMacroEx = table(
  ['Change faced by Malwa Bakes (imagined)', 'Dimension', 'Effect'],
  [
    ['New labelling law', 'Legal', 'Redesign packs'],
    ['Wheat prices rise', 'Economic', 'Costs rise; review prices'],
    ['Buyers want whole-grain bread', 'Social', 'Add whole-grain lines'],
    ['A new oven controls baking by app', 'Technological', 'Less waste, steadier quality'],
  ],
  'Worked table classifying four changes faced by an imagined bakery into macro dimensions with their effects',
  'Ask: is it about money, people, machines, government or law?',
);
const vSwot = (() => {
  const s = new Svg(540, 320);
  const x0 = 70, y0 = 40, w = 220, h = 120;
  s.rect(x0, y0, w, h, { fill: 'green', fillOpacity: 0.15, color: 'green', sw: 1.5, rx: 6 });
  s.rect(x0 + w, y0, w, h, { fill: 'red', fillOpacity: 0.12, color: 'red', sw: 1.5, rx: 6 });
  s.rect(x0, y0 + h, w, h, { fill: 'blue', fillOpacity: 0.12, color: 'blue', sw: 1.5, rx: 6 });
  s.rect(x0 + w, y0 + h, w, h, { fill: 'yellow', fillOpacity: 0.18, color: 'yellow', sw: 1.5, rx: 6 });
  s.text(x0 + w / 2, y0 + 40, 'Strengths', { bold: true }).text(x0 + w / 2, y0 + 66, 'what we do well', { size: 12 });
  s.text(x0 + 1.5 * w, y0 + 40, 'Weaknesses', { bold: true }).text(x0 + 1.5 * w, y0 + 66, 'what holds us back', { size: 12 });
  s.text(x0 + w / 2, y0 + h + 40, 'Opportunities', { bold: true }).text(x0 + w / 2, y0 + h + 66, 'favourable changes outside', { size: 12 });
  s.text(x0 + 1.5 * w, y0 + h + 40, 'Threats', { bold: true }).text(x0 + 1.5 * w, y0 + h + 66, 'harmful changes outside', { size: 12 });
  s.text(x0 - 10, y0 + h / 2, 'Internal', { anchor: 'end', size: 12, muted: true });
  s.text(x0 - 10, y0 + 1.5 * h, 'External', { anchor: 'end', size: 12, muted: true });
  s.text(x0 + w / 2, y0 - 14, 'Helpful', { size: 12, muted: true }).text(x0 + 1.5 * w, y0 - 14, 'Harmful', { size: 12, muted: true });
  return s.visual('SWOT grid: top row internal (strengths, what we do well; weaknesses, what holds us back); bottom row external (opportunities, favourable changes outside; threats, harmful changes outside); left column helpful, right column harmful', 'Strengths and weaknesses are internal; opportunities and threats are external.');
})();
const vSwotEx = table(
  ['Strengths', 'Weaknesses', 'Opportunities', 'Threats'],
  [['Loyal office customers; home-style taste', 'Only two delivery staff', 'Offices back to full attendance', 'Cloud kitchens with app ordering']],
  'Worked SWOT table for an imagined lunch-box service: loyal customers as a strength, few delivery staff as a weakness, offices returning as an opportunity, cloud kitchens as a threat',
  'Imagined SWOT of Tamarind Tiffins, Madurai.',
);
const vSummary1 = table(
  ['Idea', 'Key point'],
  [['Business environment', 'All forces, inside and outside, that affect a firm'], ['Features', 'Totality, specific and general, inter-related, dynamic, uncertain, complex, relative'], ['Importance', 'Opportunities, threats, resources, change, planning, performance'], ['Environmental scanning', 'Continuous monitoring to catch early signals']],
  'Summary table of Part 1: meaning, features, importance and environmental scanning',
);
const vSummary2 = table(
  ['Layer', 'Contents'],
  [['Internal', 'Mission, values, structure, culture, people, money, technology, image'], ['External micro', 'Suppliers, customers, competitors, intermediaries, financiers, public'], ['Macro', 'Economic, social, technological, political, legal'], ['SWOT', 'Strengths and weaknesses inside; opportunities and threats outside']],
  'Summary table of Part 2: internal factors, external micro factors, macro dimensions and SWOT',
);
const vCaseSteps = flow('LR', ['Quote the line', 'Name the factor or dimension', 'Explain its effect'], 'Three steps for case questions: quote the line, name the factor or dimension, and explain its effect');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Business Environment — Part 1: Meaning, Features, Importance and Scanning',
  goals: [
    'Explain the meaning and features of business environment',
    'Discuss how understanding the environment helps a firm spot opportunities and threats early',
    'Define environmental scanning and explain why firms monitor their environment continuously',
  ],
  slides: [
    sl('title', 'Business Environment', {
      b: 'Part 1: what the **business environment** is, its **features**, why it **matters**, and how firms **scan** it.',
      v: vRoute1,
      n: 'No business works in a vacuum. Suppliers raise prices, customers change their minds, rivals cut rates, and governments pass new laws. All these forces together make up the business environment. In this part we see what it is, what it is like, why a firm must understand it, and how firms keep watch on it.',
    }),
    sl('diagram', 'What is business environment?', {
      b: '**Business environment** is the sum total of all **individuals, institutions and forces**, internal and external, that affect the working and performance of a firm.',
      v: vLayers,
      n: 'Picture the firm at the centre. Close to it are its own internal factors, such as its mission, people and money. Around these are suppliers, customers, competitors and others it deals with directly. Outermost are the big economic, social, technological, political and legal forces. The further out a force is, the less the firm can control it.',
    }),
    sl('concept', 'Features of business environment', {
      v: vFeatures,
      n: 'The environment has seven features. It is a totality of forces. Some forces are specific, touching one firm, and some are general, touching all. The forces are inter-related. The environment is dynamic, always changing, and therefore uncertain. Because many forces act together it is complex, and because its effect differs from place to place it is relative.',
    }),
    sl('example', 'Worked example 1: which feature?', {
      b: 'Match each imagined situation with the feature it shows.',
      bl: ['Step 1: look for the **clue**: place, a chain of changes, prediction, or one firm versus all.', 'Step 2: name the feature.', 'Step 3: explain in one line.'],
      v: vFeatEx,
      n: 'Let us practise. Jackets selling in Shimla but not in Chennai show relativity, because the effect depends on the place. Fuel prices leading to electric scooters and then to retrained mechanics show inter-relatedness. Not knowing next year\'s colours shows uncertainty. A rival next door is a specific force, while a tax change is a general one.',
    }),
    sl('check', 'Quick check: complexity', {
      b: 'True or false: the environment is simple because each factor acts on its own.',
      chk: 'tf_complex',
      n: 'Think about whether factors act alone or together.',
    }),
    sl('concept', 'Why the environment matters', {
      v: vImportance,
      n: 'Understanding the environment helps a firm in six ways. It spots opportunities early and gains a first-mover advantage. It gets early warning of threats. It finds useful resources such as finance and inputs. It copes with rapid change. It plans better. And all of this improves its performance.',
    }),
    sl('two-column', 'Opportunity or threat?', {
      cols: ['**Opportunity**\n\nA favourable change the firm can use, such as rising demand for millet snacks.', '**Threat**\n\nA change that can harm the firm, such as new rivals with app ordering.'],
      v: table(['Change', 'For whom it is…'], [['Millet snacks in demand', 'An opportunity for a health-food firm'], ['Cloud kitchens open nearby', 'A threat to a lunch-box service']], 'Table of two imagined changes, one an opportunity and one a threat'),
      n: 'The same change can be an opportunity for one firm and a threat for another. A craze for millet snacks helps a health-food maker but may hurt a fried-snack seller. That is why each firm must read the environment in the light of its own business.',
    }),
    sl('check', 'Quick check: uncertainty', {
      b: 'A garment exporter cannot be sure which festival colours will sell next year. Which feature is this?',
      chk: 'm_uncertainty',
      n: 'Ask whether the future can be predicted with confidence.',
    }),
    sl('concept', 'Environmental scanning', {
      b: '**Environmental scanning** is the continuous gathering and analysis of information about the environment to detect **early signals** of opportunities and threats.',
      v: vScan,
      n: 'Scanning is how a firm keeps its eyes open. It gathers information from news, trade fairs, customers and rivals. It analyses the signals, shares them with managers, and plans a response. Then it keeps watching, because the environment never stops changing. Scanning is a cycle, not a one-time task.',
    }),
    sl('example', 'Worked example 2: a scanning log', {
      b: 'An imagined marble-craft firm in Jodhpur keeps a monthly log of signals.',
      bl: ['Step 1: note the signal.', 'Step 2: decide whether it is an **opportunity** or a **threat**.', 'Step 3: plan a response.'],
      v: vScanEx,
      n: 'Here is an imagined scanning log. Hotels asking for eco-friendly décor is an opportunity, so the firm designs a light range. Cheap resin copies online are a threat, so it stresses hand carving. An export portal waiving fees is an opportunity, so it lists its products there. Each signal leads to an action.',
    }),
    sl('check', 'Quick check: scanning', {
      b: 'Fill in the blank: careful monitoring of the environment for early signals is environmental ___.',
      chk: 'fb_scan',
      n: 'One word completes the name of this process.',
    }),
    sl('concept', 'Who scans, and how often?', {
      v: table(['Question', 'Answer'], [['Who?', 'Top managers lead; every manager contributes'], ['Sources?', 'News, trade fairs, customers, suppliers, rivals, government notices'], ['How often?', 'Continuously, with regular reviews'], ['Why?', 'To act before rivals and avoid surprises']], 'Table answering who scans the environment, from which sources, how often and why'),
      n: 'Scanning is led by top managers, but every manager notices something useful, from a salesperson\'s talk with a customer to a buyer\'s chat with a supplier. Firms review these signals regularly, so that they can act before their rivals and are not caught by surprise.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. The business environment is the total of all forces, inside and outside, that affect a firm. It is complex, dynamic, uncertain, inter-related and relative. Understanding it helps a firm seize opportunities, prepare for threats and plan better. Firms keep track of it through continuous environmental scanning.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Learn the **definition** word for word: individuals, institutions and forces.', 'For features, find the **clue** in the case.', 'For importance, link each point to the **firm in the question**.', 'Scanning is **continuous**: never say it is done once.'],
      v: vCaseSteps,
      n: 'A few tips. Use the full definition with individuals, institutions and forces. In feature questions, spot the clue in the case. In importance questions, tie each point to the firm you are given. And remember that scanning is continuous. In every case question, quote the line, name the idea and explain it.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Business Environment — Part 2: Micro and Macro Environment and SWOT',
  goals: [
    'Identify internal factors and external micro factors of a firm\'s environment',
    'Classify changes into economic, social, technological, political and legal dimensions and explain their effects',
    'Prepare a simple SWOT analysis for a small Indian business',
  ],
  slides: [
    sl('title', 'Micro, Macro and SWOT', {
      b: 'Part 2: the **internal** factors, the **external micro** factors, the five **macro** dimensions, and **SWOT** analysis.',
      v: vRoute2,
      n: 'In Part 2 we open up the layers of the environment. First, the factors inside the firm. Then the people and firms it deals with directly. Then the big forces that shape every business. Finally, we bring them together in a simple tool called SWOT analysis.',
    }),
    sl('concept', 'Internal factors', {
      b: 'Internal factors lie **inside** the firm and are largely **within its control**.',
      v: vInternal,
      n: 'Internal factors include the firm\'s values, mission and objectives, its structure and culture, its people, its machines and technology, its money, and its brand and marketing strength. Because they are inside the firm, managers can change them, though not overnight.',
    }),
    sl('concept', 'External micro factors', {
      b: 'External micro factors are the people and firms the business deals with **directly**.',
      v: vMicro,
      n: 'Outside the firm but close to it are six groups. Suppliers sell it inputs. Customers buy its products. Competitors sell similar products. Marketing intermediaries, such as dealers and couriers, help its goods reach buyers. Financiers lend it money. And the public, including media and local residents, shapes its image.',
    }),
    sl('check', 'Quick check: inside or outside?', {
      b: 'Which of these is an internal factor of the micro environment?',
      chk: 'm_internal',
      n: 'Look for the factor that the firm itself decides.',
    }),
    sl('two-column', 'Micro versus macro', {
      cols: ['**Micro environment**\n\nImmediate surroundings; affects one firm directly; some factors can be influenced.', '**Macro environment**\n\nWider forces; affect all firms; beyond the firm\'s control.'],
      v: table(['Basis', 'Micro', 'Macro'], [['Nearness', 'Immediate', 'Wider'], ['Effect', 'One firm directly', 'All firms'], ['Control', 'Partly influenced', 'Beyond control']], 'Table comparing micro and macro environment on nearness, effect and control'),
      n: 'The micro environment is close to the firm and affects it directly; a firm can bargain with suppliers or win over customers. The macro environment is wider. It shapes every firm in the economy, and no single firm can control it.',
    }),
    sl('concept', 'The macro environment', {
      v: vMacro,
      n: 'The macro environment has five dimensions. Economic covers interest rates, inflation, incomes and economic policy. Social covers values, habits and lifestyles. Technological covers new methods and machines. Political covers stability and the government\'s attitude to business. Legal covers the laws and rules a firm must follow.',
    }),
    sl('concept', 'Economic policy changes since 1991', {
      v: table(['Change', 'Meaning'], [['Liberalisation', 'Fewer licences and controls; freer business decisions'], ['Privatisation', 'Smaller role for the public sector'], ['Globalisation', 'Closer links with the world economy through trade, investment and technology']], 'Table of liberalisation, privatisation and globalisation with their meanings'),
      n: 'Since nineteen ninety one, Indian business has worked in a very different economic environment. Liberalisation removed many licences and controls. Privatisation reduced the role of the public sector. Globalisation linked India more closely with the world through trade, investment and technology.',
    }),
    sl('example', 'Worked example 1: classifying changes', {
      b: 'An imagined bakery in Indore faces four changes.',
      bl: ['Step 1: ask whether the change is about **money, people, machines, government or law**.', 'Step 2: name the dimension.', 'Step 3: state one effect.'],
      v: vMacroEx,
      n: 'Let us classify four changes for an imagined bakery. A labelling law is legal, so packs must be redesigned. Rising wheat prices are economic, so costs go up. Buyers wanting whole-grain bread is social, so new lines are needed. An oven controlled by an app is technological, giving steadier quality.',
    }),
    sl('check', 'Quick check: odd one out', {
      b: 'Which one is **not** part of the macro environment?',
      chk: 'm_odd',
      n: 'One option affects only firms in the same market. Which one?',
    }),
    sl('diagram', 'SWOT analysis', {
      b: '**SWOT** studies a firm\'s internal **Strengths** and **Weaknesses**, and the external **Opportunities** and **Threats** it faces.',
      v: vSwot,
      n: 'SWOT brings everything together. The top row looks inside the firm: strengths, what it does well, and weaknesses, what holds it back. The bottom row looks outside: opportunities, favourable changes it can use, and threats, harmful changes it must guard against.',
    }),
    sl('example', 'Worked example 2: a simple SWOT', {
      b: 'Facts about an imagined lunch-box service in Madurai: loyal office customers; only two delivery staff; offices back to full attendance; cloud kitchens nearby.',
      bl: ['Step 1: sort facts into **inside** and **outside**.', 'Step 2: mark each as **helpful** or **harmful**.', 'Step 3: fill the four boxes.'],
      v: vSwotEx,
      n: 'Sort the facts. Loyal customers are inside and helpful, a strength. Only two delivery staff are inside and harmful, a weakness. Offices returning to full attendance are outside and helpful, an opportunity. Cloud kitchens nearby are outside and harmful, a threat. A good plan uses strengths to grab opportunities.',
    }),
    sl('check', 'Quick check: a threat', {
      b: 'A supermarket chain plans a bakery section in the same market as a small bakery. In the small bakery\'s SWOT, this is…',
      chk: 'm_threat',
      n: 'Is it inside or outside the bakery, and does it help or harm?',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. Internal factors such as mission, people and money are largely controllable. External micro factors are suppliers, customers, competitors, intermediaries, financiers and the public. The macro environment has economic, social, technological, political and legal dimensions. SWOT sorts strengths and weaknesses inside the firm from opportunities and threats outside.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Name the **exact** micro factor: supplier, intermediary, financier or public.', 'Classify macro changes by asking **money, people, machines, government or law**.', 'In SWOT, **S and W are internal**, **O and T are external**.', 'Link each SWOT point to a **fact in the case**.'],
      v: vCaseSteps,
      n: 'Final tips. Name micro factors precisely; a courier is an intermediary, a bank is a financier. Classify macro changes with the simple question: money, people, machines, government or law. In SWOT, keep strengths and weaknesses inside and opportunities and threats outside. And always tie your points to the facts given.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Business Environment — notes',
  sections: [
    {
      h: '1. Meaning and features of business environment',
      t: 1,
      b: '**Business environment** is the sum total of all **individuals, institutions and forces**, internal and external, that affect the working and performance of a business.\n\n**Features:**\n- **Totality of forces:** the environment is the sum of all forces, taken together.\n- **Specific and general forces:** specific forces (suppliers, customers, competitors) affect a particular firm directly; general forces (economic, social, political, legal, technological) affect all firms.\n- **Inter-relatedness:** factors are linked, so a change in one leads to changes in others.\n- **Dynamic:** the environment keeps changing.\n- **Uncertainty:** future changes are difficult to predict.\n- **Complexity:** many factors act together, so their combined effect is hard to judge.\n- **Relativity:** its impact differs from country to country, region to region and firm to firm.',
      terms: [['Business environment', 'All individuals, institutions and forces, internal and external, that affect a business.'], ['Specific forces', 'Forces such as suppliers and competitors that affect a particular firm directly.'], ['General forces', 'Forces such as economic policy and laws that affect all firms.']],
      v: vLayers,
      vs: [vFeatures],
    },
    {
      h: '2. Importance of understanding the environment',
      t: 1,
      b: '- **Identifying opportunities and getting the first-mover advantage:** firms that spot a favourable trend early can enter before rivals.\n- **Early warning signals of threats:** knowing about possible dangers in time lets a firm prepare.\n- **Tapping useful resources:** the environment is a source of inputs, finance and skills.\n- **Coping with rapid changes:** firms that watch the environment adapt faster.\n- **Assisting in planning and policy formulation:** knowledge of the environment is the basis of plans.\n- **Improving performance:** firms that read the environment well tend to do better over time.\n\nThe same change can be an **opportunity** for one firm and a **threat** for another.',
      terms: [['First-mover advantage', 'The benefit of being first to use an opportunity, before rivals.']],
      v: vImportance,
    },
    {
      h: '3. Environmental scanning',
      t: 2,
      b: '**Environmental scanning** is the careful, **continuous** monitoring of the internal and external environment — gathering, analysing and passing on information about events, trends and relationships — to detect **early signals** of opportunities and threats.\n\n**Why firms scan:** the environment is dynamic and uncertain; early information lets a firm plan, avoid surprises and act before rivals.\n\n**How:** gather information (news, trade fairs, customers, suppliers, rivals, government notices) → analyse it into opportunities and threats → share it with managers → plan a response → keep watching.',
      terms: [['Environmental scanning', 'Continuous monitoring of the environment to detect early signals of change.']],
      v: vScan,
      vs: [vScanEx],
    },
    {
      h: '4. The micro environment',
      t: 3,
      b: '**Internal factors** (largely controllable): value system; vision, mission and objectives; management structure and internal relationships; corporate culture; human resources; physical resources and technological capability; financial resources; marketing resources; company image and brand equity.\n\n**External micro factors** (the firm\'s immediate surroundings):\n- **Suppliers** — sellers of raw materials and components.\n- **Customers** — individuals, businesses, government, exporters who buy the product.\n- **Competitors** — firms offering similar or substitute products.\n- **Marketing intermediaries** — dealers, wholesalers, retailers, couriers, online platforms, advertising agencies.\n- **Financiers** — banks and other lenders and investors.\n- **Public** — media, local residents, citizens\' groups and others with an interest in the firm.',
      terms: [['Internal factors', 'Factors inside the firm, largely within its control.'], ['Marketing intermediaries', 'Firms that help a business promote, sell and distribute its goods.'], ['Public', 'Any group with an actual or potential interest in, or effect on, the firm.']],
      v: vInternal,
      vs: [vMicro],
    },
    {
      h: '5. The macro environment',
      t: 4,
      b: '- **Economic:** interest rates, inflation, incomes, savings, stock-market conditions, economic policies (since 1991: **liberalisation**, **privatisation**, **globalisation**).\n- **Social:** customs, traditions, values, habits, lifestyles, education, population trends.\n- **Technological:** new methods, machines, products and innovations (digital payments, e-commerce, automation).\n- **Political:** political stability, the government\'s attitude to business, relations with other countries.\n- **Legal:** laws and rules — for example on companies, competition, consumer protection, taxes and labelling.\n\nMacro forces affect **all** firms and are **beyond** the control of any single firm.',
      terms: [['Liberalisation', 'Removing unnecessary controls and licences on business.'], ['Privatisation', 'Reducing the role of the public sector.'], ['Globalisation', 'Integrating the economy with the world economy.']],
      v: vMacro,
      vs: [vMacroEx],
    },
    {
      h: '6. SWOT analysis',
      t: 5,
      b: '**SWOT analysis** examines a firm\'s **Strengths** and **Weaknesses** (internal) and the **Opportunities** and **Threats** (external) it faces.\n\n**Preparing a simple SWOT:** list the facts; sort them into inside and outside; mark each as helpful or harmful; fill the four boxes.\n\n**Using it:** build on strengths, correct weaknesses, grab opportunities, and guard against threats — ideally using a strength to seize an opportunity.',
      terms: [['SWOT', 'Strengths, Weaknesses (internal), Opportunities, Threats (external).']],
      v: vSwot,
      vs: [vSwotEx],
    },
  ],
  tips: '**Common mistakes**\n- Calling customers or suppliers internal factors (they are external micro factors).\n- Mixing up a firm\'s own weakness with an outside threat in SWOT.\n- Saying environmental scanning is done once.\n- Classifying consumer tastes as technological (they are social).\n\n**How marks are usually awarded**\n- 1 mark: one correct option, factor or dimension.\n- 2–3 marks: each point named and explained, linked to the case.\n- 5 marks: parts answered separately; SWOT with all four boxes; macro answers with an example for each dimension.\n- Case questions: quote the line, name the factor, explain its effect.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Business environment**', 'All individuals, institutions and forces, internal and external, that affect a business.', 'definition', 1],
  ['**Specific vs general forces**', 'Specific: affect one firm (rivals, suppliers). General: affect all firms (economy, laws).', 'concept', 1],
  ['**Inter-relatedness**', 'A change in one factor sets off changes in others.', 'definition', 1],
  ['**Relativity**', 'The environment\'s impact differs by place and firm.', 'definition', 1],
  ['**Uncertainty**', 'Future changes are hard to predict.', 'definition', 1],
  ['**First-mover advantage**', 'Gain from spotting an opportunity and acting before rivals.', 'concept', 1],
  ['Six benefits of understanding the environment', 'Opportunities, threats, resources, coping with change, planning, performance.', 'exam-tip', 1],
  ['**Environmental scanning**', 'Continuous monitoring of the environment to detect early signals.', 'definition', 2],
  ['Steps of scanning', 'Gather → analyse → share → plan → keep watching.', 'fact', 2],
  ['Why must scanning be continuous?', 'Because the environment is dynamic.', 'concept', 2],
  ['**Internal factors**', 'Mission, values, structure, culture, people, money, technology, image; largely controllable.', 'fact', 3],
  ['Six external micro factors', 'Suppliers, customers, competitors, intermediaries, financiers, public.', 'exam-tip', 3],
  ['**Marketing intermediaries**', 'Dealers, wholesalers, couriers, platforms that help goods reach buyers.', 'definition', 3],
  ['**Public** (micro environment)', 'Media, local residents, citizens\' groups with an interest in the firm.', 'definition', 3],
  ['A bank lending to the firm is a…', 'Financier (external micro factor).', 'fact', 3],
  ['Micro vs macro environment', 'Micro: immediate, one firm, partly influenced. Macro: wide, all firms, beyond control.', 'concept', 3],
  ['Five macro dimensions', 'Economic, social, technological, political, legal.', 'exam-tip', 4],
  ['Interest rates and inflation belong to…', 'The economic environment.', 'fact', 4],
  ['Changing lifestyles belong to…', 'The social environment.', 'fact', 4],
  ['Government stability belongs to…', 'The political environment.', 'fact', 4],
  ['A new labelling rule belongs to…', 'The legal environment.', 'fact', 4],
  ['**Liberalisation**', 'Removing unnecessary licences and controls (since 1991).', 'definition', 4],
  ['**Privatisation**', 'Reducing the role of the public sector.', 'definition', 4],
  ['**Globalisation**', 'Integrating the economy with the world economy.', 'definition', 4],
  ['**SWOT**', 'Strengths, Weaknesses (internal); Opportunities, Threats (external).', 'definition', 5],
  ['A rival opening nearby is a…', 'Threat (external, harmful).', 'exam-tip', 5],
  ['Outdated machines are a…', 'Weakness (internal, harmful).', 'exam-tip', 5],
  ['A new government subsidy is a…', 'Opportunity (external, helpful).', 'exam-tip', 5],
  ['Best use of SWOT', 'Use strengths to seize opportunities; fix weaknesses; guard against threats.', 'concept', 5],
  ['Case routine', 'Quote the line, name the factor or dimension, explain its effect.', 'exam-tip', 4],
]);

// ---------------------------------------------------------------- tests (ISC class defaults, item for item)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Business Environment',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A - Objective (5 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_specific_general', 'm_scan_case', 'm_supplier', 'm_tech', 'ar_dynamic'] },
    { id: 'B', title: 'Section B - Short answer (4 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s_features', { attempt: 1, keys: ['s_internal', 's_swot'] }] },
    { id: 'C', title: 'Section C - Short answer (6 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s3_importance', { attempt: 1, keys: ['s3_micro', 's3_macro'] }] },
    { id: 'D', title: 'Section D - Long answer (5 marks)', instr: 'Answer the question. It is set in parts.', items: ['l_swot'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Business Environment',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A - Objective (12 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_totality', 'm_interrelated', 'm_relativity', 'm_firstmover', 'm_scan_def', 'm_hr', 'm_publics', 'm_economic', 'm_legal', 'm_strength', 'ar_control', 'ar_micro'] },
    { id: 'B', title: 'Section B - Short answer (6 marks)', instr: 'Answer all three questions. Internal choice in the last question.', items: ['s_scan', 's_external_micro', { attempt: 1, keys: ['s_macro2', 's_importance2'] }] },
    { id: 'C', title: 'Section C - Short answer (12 marks)', instr: 'Answer all four questions. Internal choice in the last question.', items: ['s3_scan_steps', 's3_lpg', 's3_swot_make', { attempt: 1, keys: ['s3_features3', 's3_internal3'] }] },
    { id: 'D', title: 'Section D - Long answer (10 marks)', instr: 'Answer both questions. Internal choice in the second question. Each is set in parts.', items: ['l_env', { attempt: 1, keys: ['l_macro', 'l_micro'] }] },
  ],
});
if (T_SHORT.total_marks !== 20 || T_LONG.total_marks !== 40) throw new Error(`test marks ${T_SHORT.total_marks} / ${T_LONG.total_marks}`);

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of isc-12-commerce-ch01 (meaning, features and importance; environmental scanning; internal and external micro environment; economic, social, technological, political and legal macro environment; SWOT)',
    originality: 'every firm, person and case is imagined and written by SOYL and labelled; no ISC or CBSE textbook text, illustration or exercise and no CISCE specimen or board item reused (D-036); firms and places differ from the CBSE 12 Business Studies chapters',
    data: 'no computed figures; all examples are imagined and labelled',
    facts: 'stable textbook concepts only; the 1991 economic reforms (liberalisation, privatisation, globalisation) are stated without dated figures',
    gate: 'schema, pipeline lint, deterministic verify, word limits, narration and answer-leak checks run clean in this build',
  },
});
