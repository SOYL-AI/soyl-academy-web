// Build CBSE 12 Political Science ch06 Environment and Natural Resources. Run from platform/:
//   npx tsx content/authored/social-science/cbse-12-political-science-ch06/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-political-science-ch06', 'social-science');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG figures
const MILESTONES = [
  [1959, 'Antarctic Treaty'],
  [1972, 'Limits to Growth; UNEP'],
  [1987, 'Brundtland; Montreal'],
  [1992, 'Rio Earth Summit'],
  [1997, 'Kyoto Protocol'],
  [2002, 'India ratifies Kyoto'],
  [2015, 'Paris Agreement'],
];
const vTimeline = (() => {
  const s = new Svg(720, 280);
  const X = (y) => 80 + ((y - 1955) / (2020 - 1955)) * 560;
  const AXIS = 150;
  // Label tiers so neighbouring milestones never collide: [year y, label y, stem end y].
  const TIER = { U1: [92, 110, 120], U2: [36, 54, 64], D1: [184, 202, 172], D2: [238, 256, 226] };
  const LEVEL = ['U1', 'D1', 'U1', 'D2', 'U2', 'D1', 'U1'];
  s.arrow(20, AXIS, 700, AXIS, { sw: 1.8 });
  MILESTONES.forEach(([yr, label], i) => {
    const [ty, ly, end] = TIER[LEVEL[i]];
    s.dot(X(yr), AXIS, 6, 'accent');
    s.line(X(yr), AXIS, X(yr), end, { sw: 1.4, color: 'accent' });
    s.text(X(yr), ty, String(yr), { bold: true, size: 13 });
    s.text(X(yr), ly, label, { size: 12 });
  });
  return s.visual(
    'Timeline from 1959 to 2015: Antarctic Treaty 1959; Limits to Growth and the creation of UNEP 1972; Brundtland Report and Montreal Protocol 1987; Rio Earth Summit 1992; Kyoto Protocol 1997; India ratifies Kyoto 2002; Paris Agreement 2015',
    'Milestones of environmental politics',
  );
})();

const vCommons = (() => {
  const s = new Svg(660, 280);
  s.rect(230, 112, 200, 56, { sw: 2.2, color: 'accent' });
  s.text(330, 132, 'Global commons', { bold: true, color: 'accent' });
  s.text(330, 152, 'no single owner', { size: 12 });
  const boxes = [
    [30, 20, 'Earth\'s atmosphere', 'ozone layer, climate'],
    [450, 20, 'Antarctica', 'peaceful use, science'],
    [30, 200, 'Ocean floor', 'beyond national waters'],
    [450, 200, 'Outer space', 'satellites, debris'],
  ];
  for (const [x, y, h, sub] of boxes) {
    s.rect(x, y, 180, 60, { sw: 1.6 });
    s.text(x + 90, y + 22, h, { bold: true, size: 13 });
    s.text(x + 90, y + 42, sub, { size: 12, muted: true });
    s.line(x < 300 ? x + 180 : x, y < 100 ? y + 60 : y, x < 300 ? 230 : 430, y < 100 ? 112 : 168, { sw: 1.4, color: 'muted' });
  }
  return s.visual(
    'Diagram: the global commons, with no single owner, at the centre, linked to four examples: the earth\'s atmosphere (ozone layer and climate), Antarctica (peaceful use and science), the ocean floor beyond national waters, and outer space (satellites and debris)',
    'Four examples of the global commons',
  );
})();

const vCBDR = (() => {
  const s = new Svg(660, 260);
  s.rect(40, 20, 580, 50, { sw: 1.8, fill: 'fill' });
  s.text(330, 38, 'Common responsibility', { bold: true });
  s.text(330, 58, 'every state must help protect the climate', { size: 12 });
  s.rect(40, 100, 360, 110, { sw: 2.2, color: 'accent' });
  s.text(220, 128, 'Developed countries', { bold: true, color: 'accent' });
  s.text(220, 152, 'larger share: most past emissions,', { size: 12 });
  s.text(220, 172, 'more money and technology', { size: 12 });
  s.text(220, 192, 'cut first, help others', { size: 12 });
  s.rect(420, 130, 200, 80, { sw: 1.6 });
  s.text(520, 154, 'Developing countries', { bold: true, size: 13 });
  s.text(520, 176, 'smaller share,', { size: 12 });
  s.text(520, 194, 'need room to develop', { size: 12 });
  s.text(330, 238, 'Common duty, differentiated burden', { size: 13, muted: true });
  return s.visual(
    'Diagram of common but differentiated responsibilities: a band across the top says every state must help protect the climate; below, a larger box for developed countries (most past emissions, more money and technology, cut first and help others) and a smaller box for developing countries (smaller share, need room to develop)',
    'Common duty, differentiated burden',
  );
})();

const vMovements = (() => {
  const s = new Svg(660, 250);
  s.rect(210, 14, 240, 46, { sw: 2, color: 'accent' });
  s.text(330, 37, 'Environmental movements', { bold: true });
  const boxes = [
    [20, 'Forest movements', 'stop commercial felling', 'e.g. Chipko'],
    [240, 'Anti-dam movements', 'displacement, ecology', 'e.g. Narmada'],
    [460, 'Against mining', 'land, water, sacred sites', 'many regions'],
  ];
  for (const [x, h, sub, eg] of boxes) {
    s.arrow(330, 60, x + 90, 118, { sw: 1.5, color: 'muted' });
    s.rect(x, 120, 180, 96, { sw: 1.6 });
    s.text(x + 90, 146, h, { bold: true, size: 13 });
    s.text(x + 90, 172, sub, { size: 12 });
    s.text(x + 90, 196, eg, { size: 12, muted: true });
  }
  s.text(330, 238, 'Mostly local, people-led: farmers, forest dwellers, women', { size: 12, muted: true });
  return s.visual(
    'Diagram: environmental movements branch into forest movements that stop commercial felling (for example Chipko), anti-dam movements about displacement and ecology (for example Narmada), and movements against mining that defend land, water and sacred sites; most are local and people-led',
    'Three kinds of environmental movement',
  );
})();

const vRiver = (() => {
  const s = new Svg(660, 250);
  s.rect(20, 20, 300, 200, { sw: 1.6 });
  s.rect(340, 20, 300, 200, { sw: 1.6 });
  s.text(170, 42, 'Upstream state', { bold: true });
  s.text(490, 42, 'Downstream state', { bold: true });
  s.line(330, 12, 330, 230, { sw: 2.2, dash: true, color: 'accent' });
  s.text(330, 242, 'Border', { size: 12, color: 'accent' });
  s.path('M 40 120 C 120 90, 200 150, 260 120 S 420 90, 620 130', { color: 'blue', sw: 4 });
  s.rect(230, 96, 18, 48, { sw: 1.6, fill: 'muted', stroke: false });
  s.text(239, 164, 'Dam', { size: 12 });
  s.text(150, 196, 'wants power, irrigation', { size: 12, muted: true });
  s.text(490, 196, 'fears less water for farms', { size: 12, muted: true });
  return s.visual(
    'Diagram of a river flowing from an upstream state across a border into a downstream state; the upstream state builds a dam for power and irrigation, while the downstream state fears less water for its farms',
    'A shared river: one source of resource geopolitics',
  );
})();

// ---------------------------------------------------------------- tables and flows
const vRoute1 = flow('LR', ['Why the environment became global', 'From Stockholm to Rio', 'Global commons', 'Common but differentiated responsibilities'], 'Route map of Part 1: why the environment became a global issue, from Stockholm to Rio, the global commons, and common but differentiated responsibilities', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['India\'s stand', 'Environmental movements', 'Resource geopolitics', 'Indigenous peoples'], 'Route map of Part 2: India\'s stand, environmental movements, resource geopolitics, and indigenous peoples', 'Part 2 at a glance');
const vConcerns = table(
  ['Concern', 'Why it worries the world'],
  [
    ['Farmland', 'Little new land to cultivate; much existing land losing fertility'],
    ['Water', 'Safe drinking water still out of reach for very many people'],
    ['Forests', 'Loss of natural forests reduces biodiversity and harms climate'],
    ['Oceans', 'Overfishing and coastal pollution'],
    ['Ozone layer', 'Thinning exposes life to harmful radiation'],
  ],
  'Table of global environmental concerns: shrinking and degraded farmland, lack of safe drinking water, loss of forests and biodiversity, overfishing and coastal pollution, and the thinning ozone layer',
);
const vStockholm = table(
  ['Year', 'Event', 'Why it matters'],
  [
    ['1972', 'Limits to Growth (Club of Rome)', 'Warned of resource depletion as population grows'],
    ['1972', 'Stockholm conference; UNEP created', 'First big UN step on the environment'],
    ['1987', 'Brundtland Report, Our Common Future', 'Made sustainable development a common goal'],
  ],
  'Table of early milestones: in 1972 Limits to Growth and the Stockholm conference that created UNEP; in 1987 the Brundtland Report, which popularised sustainable development',
);
const vRio = flow('TB', ['Rio Earth Summit, June 1992', 'Climate change framework convention and biodiversity convention', 'Forest principles and Agenda 21', 'Sustainable development as the shared goal'], 'Flow of the Rio Earth Summit of 1992 and its outcomes: the climate change and biodiversity conventions, forest principles and Agenda 21, with sustainable development as the shared goal', 'What Rio produced');
const vNorthSouth = table(
  ['', 'North (developed)', 'South (developing)'],
  [
    ['Main concern', 'Ozone depletion, global warming', 'Link environment with development'],
    ['Wants', 'Commitments from all major emitters', 'Room to grow; finance and technology'],
  ],
  'Comparison of North and South at Rio: the North focused on ozone depletion and global warming and wanted commitments from all, while the South wanted environment linked to development, room to grow, and finance and technology',
);
const vWE1 = table(
  ['Step', 'What to do', 'Example from an imagined summit diary'],
  [
    ['1', 'Find the clue words', '"rich industrial nations", "poorer nations"'],
    ['2', 'Name the concept', 'North–South divide'],
    ['3', 'Link to a real event', 'The Rio Earth Summit, 1992'],
    ['4', 'Explain in one sentence', 'North stressed ozone and warming; South stressed development'],
  ],
  'Worked example table on reading a source: find clue words, name the concept (the North–South divide), link it to the Rio Earth Summit, and explain it in one sentence',
  'Quote, name, link, explain.',
);
const vCommonsHard = table(
  ['Difficulty', 'Imagined illustration'],
  [
    ['Scientific uncertainty', 'States argue about how fast a resource is being damaged'],
    ['Unequal technology', 'Only rich states can mine the deep sea or launch satellites'],
    ['No single authority', 'Every party must agree before rules change'],
  ],
  'Table of difficulties in managing the global commons: scientific uncertainty, unequal technology that favours rich states, and the need for every party to agree',
);
const vOzone = flow('LR', ['Ozone-depleting substances released worldwide', 'Ozone hole over Antarctica (mid-1980s)', 'Montreal Protocol, 1987', 'Substances phased out together'], 'Flow: ozone-depleting substances released worldwide led to the ozone hole over Antarctica found in the mid-1980s, which led to the Montreal Protocol of 1987 and the joint phase-out of these substances', 'Joint action on a global common');
const vClimate = table(
  ['Agreement', 'Year', 'Main idea'],
  [
    ['UN Framework Convention on Climate Change', '1992', 'Act on equity and common but differentiated responsibilities'],
    ['Kyoto Protocol', '1997', 'Binding cuts for industrialised countries only'],
    ['Paris Agreement', '2015', 'Every party sets its own national pledge'],
  ],
  'Table of climate agreements: the framework convention of 1992 based on equity and differentiated responsibilities; the Kyoto Protocol of 1997 with binding cuts for industrialised countries; the Paris Agreement of 2015 with national pledges by every party',
);
const vWE2 = table(
  ['Point of comparison', 'Kyoto (1997)', 'Paris (2015)'],
  [
    ['Who is bound', 'Industrialised countries', 'Every party'],
    ['How targets are set', 'Negotiated and fixed', 'Nationally determined pledges'],
    ['Developing countries', 'No binding cuts', 'Make their own pledges'],
  ],
  'Worked example table comparing Kyoto (1997) and Paris (2015): who is bound, how targets are set, and the position of developing countries',
  'Three points, each stated for both agreements.',
);
const vSummary1 = table(
  ['Idea', 'Remember'],
  [
    ['Why global', 'Damage crosses borders; scarce resources'],
    ['Milestones', '1972 Stockholm and UNEP; 1987 Brundtland; 1992 Rio'],
    ['Rio divide', 'North: ozone and warming. South: development'],
    ['Global commons', 'Atmosphere, Antarctica, ocean floor, outer space'],
    ['CBDR', 'Common duty, bigger burden on developed states'],
    ['Climate deals', 'Kyoto 1997 (industrialised only); Paris 2015 (all)'],
  ],
  'Summary table of Part 1: why the environment is global, the milestones, the Rio divide, the global commons, common but differentiated responsibilities, and the Kyoto and Paris agreements',
);
const vIndiaFacts = table(
  ['Point', 'India\'s position'],
  [
    ['Kyoto', 'Signed and ratified in 2002; no binding cut as a developing country'],
    ['Per capita', 'Emissions per person far below those of rich countries'],
    ['History', 'Most accumulated gases came from early industrial nations'],
    ['Ask', 'Finance and clean technology from richer partners'],
  ],
  'Table of India\'s position: ratified Kyoto in 2002 without a binding cut, low per capita emissions, historical responsibility of early industrial nations, and a request for finance and clean technology',
);
const vIndiaHome = flow('LR', ['Energy Conservation Act, 2001', 'Cleaner vehicle fuels', 'National action plan on climate change', 'Push for solar and other renewables'], 'Flow of India\'s steps at home: the Energy Conservation Act of 2001, cleaner vehicle fuels, a national action plan on climate change, and a push for solar and other renewable energy', 'Action at home');
const vWE3 = table(
  ['Point', 'Content for a 5-mark answer on India\'s stand'],
  [
    ['1', 'Kyoto ratified in 2002; no binding cut'],
    ['2', 'Low per capita emissions; historical responsibility'],
    ['3', 'Common but differentiated responsibilities; finance and technology'],
    ['4', 'Right to development and poverty removal'],
    ['5', 'Domestic measures: energy law, cleaner fuels, climate plan, renewables'],
  ],
  'Worked example table: a five-point plan for a 5-mark answer on India\'s stand, covering Kyoto, per capita and historical arguments, differentiated responsibilities, the right to development, and domestic measures',
  'One idea per point; one mark each.',
);
const vOil = flow('LR', ['Oil vital for industry, transport and armies', 'Reserves concentrated in a few regions', 'Major powers seek secure access', 'Rivalry, alliances, sometimes conflict'], 'Flow: oil is vital for industry, transport and armies; reserves are concentrated in a few regions such as West Asia; major powers seek secure access; this leads to rivalry, alliances and sometimes conflict', 'Oil and world politics');
const vWE4 = table(
  ['Clue in the source', 'Concept'],
  [
    ['Villages to be submerged by a reservoir', 'Anti-dam movement; displacement'],
    ['Forest dwellers with no papers for land used for generations', 'Rights of indigenous peoples'],
    ['River flows on into a neighbouring state', 'Resource geopolitics: shared water'],
  ],
  'Worked example table on reading a source about a valley reservoir: submerged villages point to an anti-dam movement, forest dwellers without land papers to indigenous rights, and a river flowing into a neighbour to resource geopolitics',
  'One source can test several parts of the chapter.',
);
const vIndigenous = table(
  ['Year', 'International step'],
  [
    ['1975', 'World Council of Indigenous Peoples formed'],
    ['1982', 'UN Working Group on Indigenous Populations'],
    ['2007', 'UN Declaration on the Rights of Indigenous Peoples'],
  ],
  'Table of international steps on indigenous peoples: the World Council formed in 1975, the UN Working Group in 1982, and the UN Declaration in 2007',
);
const vDevRights = flow('LR', ['Project planned on forest land', 'Communities face displacement', 'Demand for land rights and fair rehabilitation', 'Need for consent and review'], 'Flow: a project planned on forest land leads to displacement, a demand for land rights and fair rehabilitation, and the need for consent and environmental review', 'Development and rights');
const vSummary2 = table(
  ['Idea', 'Remember'],
  [
    ['India\'s stand', 'Kyoto 2002; per capita; history; CBDR; right to develop'],
    ['At home', 'Energy law 2001, cleaner fuels, climate plan, renewables'],
    ['Movements', 'Forest (Chipko), anti-dam (Narmada), against mining'],
    ['Geopolitics', 'Oil concentrated in a few regions; shared rivers'],
    ['Indigenous peoples', 'Land, displacement, voice; UN Working Group 1982'],
  ],
  'Summary table of Part 2: India\'s stand and domestic action, environmental movements, resource geopolitics, and indigenous peoples',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Environment and Natural Resources — Part 1: Global Concerns, Commons and Shared Responsibility',
  goals: [
    'Explain why the environment became an issue of world politics',
    'Trace the milestones from Stockholm and the Brundtland Report to the Rio Earth Summit',
    'Explain the global commons and why they are hard to manage',
    'Explain common but differentiated responsibilities and compare Kyoto and Paris',
  ],
  slides: [
    sl('title', 'Environment and Natural Resources', {
      b: 'Part 1 — why the **environment** became **global**, the **global commons**, and **who should do what**.',
      v: vRoute1,
      n: 'Smoke from one country can thin the ozone layer over another continent, and a warming climate affects everyone. That is why the environment is no longer only a matter for each government at home. In this part we see how it entered world politics, which areas belong to no one, and how countries argue over who should carry the burden of protecting the planet.',
    }),
    sl('concept', 'Why the environment became global', {
      b: 'From the **1960s**, damage to land, water, forests, oceans and the ozone layer was seen as a problem **no single state** could solve.',
      v: vConcerns,
      n: 'Look at the five concerns in the table. Little new farmland is left and much of it is losing fertility. Many people still lack safe water. Forests are shrinking, fish stocks are overused, and the ozone layer has thinned. Because these problems cross borders and touch everyone, governments began to treat the environment as a subject for negotiation among states.',
    }),
    sl('concept', 'From concern to politics', {
      b: 'Environmental issues became political because they raise questions of **who pays**, **who benefits** and **who decides**.',
      bl: ['Scarce resources create **competition** among states.', 'Protection has **costs**, and states argue over sharing them.', 'International bodies and treaties became the **arena** for these debates.'],
      n: 'Why call this politics and not just science? Because every environmental choice raises political questions. Who will cut pollution, and who will pay for it? Who gets to use scarce water or fish? Which body decides? Once these questions were taken to international conferences and treaties, the environment became a regular part of world politics.',
    }),
    sl('diagram', 'Milestones at a glance', {
      v: vTimeline,
      n: 'Here are the milestones you need. The Antarctic Treaty came in 1959. In 1972 came the Limits to Growth report and the creation of the UN environment programme. In 1987 we have the Brundtland Report and the Montreal Protocol. Then the Rio Earth Summit in 1992, the Kyoto Protocol in 1997, India ratifying Kyoto in 2002, and the Paris Agreement in 2015.',
    }),
    sl('check', 'Quick check: an early warning', {
      b: 'Which body published *Limits to Growth* in 1972?',
      chk: 'm_limits_growth',
      n: 'Think of the early warning about resources running out as population grows. Which group of thinkers published it?',
    }),
    sl('concept', 'Stockholm, UNEP and Brundtland', {
      b: 'The **1972** Stockholm conference led to **UNEP**; the **1987** Brundtland Report made **sustainable development** a shared goal.',
      v: vStockholm,
      n: 'In 1972 the Club of Rome warned that resources could run out as population rose. The same year a UN conference at Stockholm led to the United Nations Environment Programme. In 1987 the Brundtland Report, called Our Common Future, argued that development must meet today\'s needs without harming future generations. That idea is called sustainable development.',
    }),
    sl('concept', 'The Rio Earth Summit, 1992', {
      b: 'A very large gathering of governments at Rio de Janeiro put the environment at the **centre** of world politics.',
      v: vRio,
      n: 'In June 1992 governments met at Rio de Janeiro for the Earth Summit. It produced conventions on climate change and on biological diversity, a set of forest principles, and Agenda 21, a list of practices for sustainable development. Critics later said Agenda 21 leaned towards growth more than conservation, but Rio made the environment a central topic for governments everywhere.',
    }),
    sl('two-column', 'North and South at Rio', {
      b: 'Rio revealed a clear **North–South** difference.',
      cols: [
        '**North (developed)**\n\n- Ozone depletion\n- Global warming',
        '**South (developing)**\n\n- Link environment to development\n- Need for growth, finance, technology',
      ],
      v: vNorthSouth,
      n: 'At Rio the rich countries of the North spoke mostly about the ozone layer and global warming. The developing countries of the South asked how environmental rules could be linked to their need for growth, since many of their people were poor. Both sides finally agreed that growth should be ecologically responsible, but the difference in emphasis has shaped every negotiation since.',
    }),
    sl('example', 'Worked example 1: reading an environment source', {
      b: 'An imagined delegate\'s diary says rich nations spoke about the ozone layer while poorer nations asked about electricity for their people. Identify the concept.',
      bl: ['Step 1 — find the **clue words**.', 'Step 2 — **name** the concept.', 'Step 3 — **link** it to a real event.', 'Step 4 — **explain** in one sentence.'],
      v: vWE1,
      n: 'Let us practise. The clue words are rich industrial nations and poorer nations, and their different worries. That points to the North and South divide. Link it to the Rio Earth Summit of 1992. Then explain in one sentence: the North stressed ozone and warming, while the South stressed development. Quote, name, link and explain is a safe pattern for every source part.',
    }),
    sl('check', 'Quick check: put them in order', {
      b: 'Arrange the milestones of environmental politics in chronological order.',
      chk: 'ord_milestones',
      n: 'Use the timeline you saw earlier. Start with the treaty about the southern ice continent and end with the protocol agreed in Japan.',
    }),
    sl('diagram', 'The global commons', {
      b: 'Areas **outside the jurisdiction of any one state**, which need **common** governance.',
      v: vCommons,
      n: 'Some parts of the planet belong to no country. These are the global commons: the earth\'s atmosphere, Antarctica, the ocean floor beyond national waters, and outer space. Because no state owns them, no state alone can protect them. Their use and care must be agreed among many countries, and that is where the politics begins.',
    }),
    sl('concept', 'Why the commons are hard to manage', {
      b: 'Agreements on the commons are possible but **difficult**.',
      v: vCommonsHard,
      n: 'Managing the commons is hard for three reasons. Scientists may disagree about how fast damage is happening, so states delay. Using the deep sea or outer space needs advanced technology, so rich countries gain most while everyone shares the risk. And since there is no single authority, every party must agree before rules change, which takes a long time.',
    }),
    sl('concept', 'Successes: Antarctica and the ozone layer', {
      b: 'The **Antarctic Treaty (1959)** and the **Montreal Protocol (1987)** show cooperation can work.',
      v: vOzone,
      n: 'There are real successes. The Antarctic Treaty of 1959 keeps that continent for peaceful use and science, and a later protocol added environmental protection. When scientists found an ozone hole over Antarctica in the mid nineteen eighties, states agreed the Montreal Protocol in 1987 to phase out the substances responsible. Joint rules achieved what no single country could.',
    }),
    sl('check', 'Quick check: which is not a common?', {
      b: 'Which one of these is **not** part of the global commons?',
      chk: 'm_commons_example',
      n: 'Ask of each option: does any single state own it and make its laws there?',
    }),
    sl('diagram', 'Common but differentiated responsibilities', {
      b: 'A **shared duty** for all, with a **bigger burden** on those who caused more damage and can pay more.',
      v: vCBDR,
      n: 'This principle answers the question of who should do what. The duty to protect the climate is common to all states. But the burden is differentiated. Developed countries released most of the gases already in the air and have more money and technology, so they should act first and help others. Developing countries need room to grow and remove poverty.',
    }),
    sl('concept', 'Climate agreements: 1992, 1997, 2015', {
      b: 'The **framework convention** set the principle, **Kyoto** bound the industrialised countries, **Paris** asked every party for a pledge.',
      v: vClimate,
      n: 'The UN climate change framework convention of 1992 asked states to act on the basis of equity and differentiated responsibility. The Kyoto Protocol of 1997 set binding cuts for industrialised countries only; India and China had no binding targets. The Paris Agreement of 2015 changed the method: every party, rich or poor, now puts forward its own national pledge.',
    }),
    sl('example', 'Worked example 2: comparing Kyoto and Paris', {
      b: 'Question: compare the Kyoto Protocol and the Paris Agreement on three points (3 marks).',
      bl: ['Choose **three** points of comparison.', 'State each point for **both** agreements.', 'Keep to **one line** per point.'],
      v: vWE2,
      n: 'For a comparison, pick three clear points and state each one for both agreements. Who is bound: industrialised countries under Kyoto, every party under Paris. How targets are set: negotiated and fixed under Kyoto, national pledges under Paris. And the position of developing countries: no binding cuts under Kyoto, their own pledges under Paris. Three points, three marks.',
    }),
    sl('check', 'Quick check: Kyoto and India', {
      b: 'True or false: under Kyoto, India and China had the same binding cuts as industrialised countries?',
      chk: 'tf_kyoto_india',
      n: 'Remember which group of countries Kyoto placed binding targets on, and why.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'Let us sum up. The environment became global because damage crosses borders and resources are scarce. Learn the milestones: Stockholm and the UN environment programme in 1972, Brundtland in 1987 and Rio in 1992. Remember the North and South divide, the four global commons, the principle of common but differentiated responsibilities, and the difference between Kyoto and Paris.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Learn the years: **1959, 1972, 1987, 1992, 1997, 2015**.',
        'Global commons: name **all four** examples.',
        'CBDR has **two halves**: common duty and differentiated burden. Explain both.',
        'Kyoto bound **industrialised** countries only; Paris asks **every party** for a pledge.',
        'In source questions, **quote, name, link, explain**.',
      ],
      n: 'A few tips. Dates carry easy marks, so learn the six key years. When asked about the global commons, name all four. When you explain differentiated responsibilities, give both halves of the idea. Do not say that Kyoto bound developing countries. And in source questions, quote the line, name the concept, link it to a real event and explain.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Environment and Natural Resources — Part 2: India, Movements, Resources and Indigenous Peoples',
  goals: [
    'Describe India\'s stand on climate change abroad and its action at home',
    'Explain the main kinds of environmental movements with examples',
    'Explain resource geopolitics through oil and shared rivers',
    'Explain the concerns of indigenous peoples and how they reached world politics',
  ],
  slides: [
    sl('title', 'India, Movements and Resources', {
      b: 'Part 2 — **India\'s stand**, **environmental movements**, **resource geopolitics** and **indigenous peoples**.',
      v: vRoute2,
      n: 'In this part we come closer to home. First we see what India says in climate negotiations and what it does within the country. Then we meet the people\'s movements that defend forests, rivers and hills, the struggle among states for oil and water, and the indigenous communities whose land and way of life are often at stake.',
    }),
    sl('concept', 'India and the Kyoto Protocol', {
      b: 'India **signed and ratified** Kyoto in **2002**; as a developing country it had **no binding cut**.',
      v: vIndiaFacts,
      n: 'In August 2002 India both signed and ratified the Kyoto Protocol. Like China and other developing countries, it was not given a binding target to cut emissions. India\'s main arguments are that its emissions per person are far lower than those of rich countries, and that the gases already in the air were released mostly by early industrial nations.',
    }),
    sl('concept', 'India\'s main arguments', {
      b: 'India argues on the basis of **equity**.',
      bl: ['**Per capita**: an average Indian emits far less than a person in a rich country.', '**History**: developed countries caused most accumulated emissions.', '**Development**: millions still need energy, jobs and services.', '**Support**: richer partners should provide finance and clean technology.'],
      n: 'Here are India\'s four main arguments. Per person, India\'s emissions are low. Historically, the developed countries caused most of the problem. India still has a large population that needs energy and jobs, so it needs room to develop. And richer partners should help with finance and clean technology. Together these rest on the principle of common but differentiated responsibilities.',
    }),
    sl('check', 'Quick check: a year to remember', {
      b: 'In which year did India sign and ratify the Kyoto Protocol?',
      chk: 'm_india_kyoto',
      n: 'Do not confuse the year the protocol was agreed with the year India ratified it.',
    }),
    sl('concept', 'Action at home', {
      b: 'India has also acted **within the country**.',
      v: vIndiaHome,
      n: 'India has not only made demands of others. It passed an Energy Conservation Act in 2001, moved towards cleaner fuels for vehicles, adopted a national action plan on climate change with missions on solar power and energy efficiency, and promoted renewable energy. Mention these when a question asks about India\'s stand, because they show a balanced position.',
    }),
    sl('example', 'Worked example 1: a 5-mark answer on India\'s stand', {
      b: 'Question: describe India\'s stand on climate change (5 marks).',
      bl: ['Plan **five** separate points.', 'Mix **international** arguments with **domestic** action.', 'Use the key terms: **per capita**, **historical responsibility**, **CBDR**.'],
      v: vWE3,
      n: 'Plan five points, one mark each. Start with Kyoto: ratified in 2002 with no binding cut. Then the per capita and historical arguments. Third, differentiated responsibilities and the request for finance and technology. Fourth, the right to development. Fifth, India\'s domestic steps. Using the key terms in bold tells the examiner you know the concepts exactly.',
    }),
    sl('check', 'Quick check: did India act at home?', {
      b: 'True or false: India took no climate or energy measures of its own because it had no binding Kyoto target?',
      chk: 'tf_india_nopolicy',
      n: 'Recall the steps on the action at home slide.',
    }),
    sl('diagram', 'Environmental movements', {
      b: 'Some of the most vibrant responses to environmental damage come from **people\'s movements**.',
      v: vMovements,
      n: 'Across the world, ordinary people have organised to defend their environment. Forest movements resist commercial felling, as the Chipko movement did in the Himalayan hills in the nineteen seventies. Anti-dam movements question the displacement and ecological cost of big dams, like the Narmada Bachao Andolan. Others resist mining on land and hills that communities depend on. Most are local and people-led.',
    }),
    sl('concept', 'What the movements achieved', {
      b: 'Movements made **displacement**, **rehabilitation** and **environmental review** public issues.',
      bl: ['They gave **affected people a voice** in decisions.', 'They pushed governments towards **impact assessment** and **rehabilitation**.', 'Similar campaigns arose **in many countries**, not only India.', 'Many large projects still went ahead, often with changes.'],
      n: 'What did these movements achieve? They brought the voices of affected villagers into public debate. They made displacement and rehabilitation political questions and pushed governments towards environmental review. Similar campaigns took place in many countries. At the same time, many large projects went ahead, so a fair answer recognises both their influence and their limits.',
    }),
    sl('check', 'Quick check: a famous forest movement', {
      b: 'Where did the Chipko movement begin?',
      chk: 'm_chipko',
      n: 'Think of the Himalayan hills where villagers hugged trees to save them.',
    }),
    sl('concept', 'Resource geopolitics: oil', {
      b: '**Resource geopolitics** is the struggle among states over **who gets which resources**.',
      v: vOil,
      n: 'Resource geopolitics is about how states compete for natural resources. Oil is the clearest example. Modern industry, transport and armies depend on it, and large reserves lie in a few regions, especially West Asia. So major powers have tried to secure access through diplomacy, alliances and sometimes force. Control over oil has been closely linked to power and conflict.',
    }),
    sl('diagram', 'Shared rivers', {
      b: 'Fresh water is **scarce**, and many rivers **cross borders**.',
      v: vRiver,
      n: 'Water is another source of tension. Many rivers flow through more than one country. If an upstream state builds a dam or diverts water, the downstream state may get less for its farms and cities. Disputes over sharing and quality of water have arisen in several regions, and some people warn that water could become a major cause of conflict in the future.',
    }),
    sl('example', 'Worked example 2: one source, three concepts', {
      b: 'An imagined report says forty forest villages will be submerged by a reservoir, the villagers have no land papers, and the river flows on into a neighbouring state.',
      bl: ['Each clue points to a **different** part of the chapter.', 'Answer each part with the **concept it asks for**.'],
      v: vWE4,
      n: 'One source can test several ideas. Villages to be submerged by a reservoir point to an anti-dam movement and displacement. Forest dwellers with no papers for land they have used for generations point to the rights of indigenous peoples. A river flowing into a neighbouring state points to resource geopolitics. Read every sentence and match it to the concept the question asks for.',
    }),
    sl('concept', 'Indigenous peoples', {
      b: 'Descendants of a land\'s **original inhabitants**, who keep their **own traditions** and depend closely on **land and forests**.',
      v: vIndigenous,
      n: 'Indigenous peoples are broadly the descendants of the people who lived in a land before others arrived, and who keep their own ways of life. Their struggles centre on land, forests and displacement. Their voice reached world politics through a world council formed in 1975, a UN working group set up in 1982, and a UN declaration on their rights adopted in 2007.',
    }),
    sl('two-column', 'Development and rights', {
      b: 'Projects can bring benefits to some and **loss** to others.',
      cols: [
        '**Case for projects**\n\n- Water, power, jobs\n- Benefits to the wider region',
        '**Concerns of affected people**\n\n- Loss of land and livelihood\n- Little say in decisions',
      ],
      v: vDevRights,
      n: 'Dams, mines and roads can bring water, power and jobs to a wider region. But they are often built on land used by forest communities, who may lose homes and livelihoods with little say. A balanced view weighs both sides and asks for consent, fair rehabilitation and proper environmental review before such projects go ahead.',
    }),
    sl('check', 'Quick check: match the issue', {
      b: 'Match each imagined protest or issue with the area of environmental politics it belongs to.',
      chk: 'mt_movements',
      n: 'Look for the key action in each protest: trees, a reservoir, river water between states, or customary land.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. India ratified Kyoto in 2002 and argues on equity: low per capita emissions, historical responsibility, differentiated responsibilities and the right to develop, while acting at home. People\'s movements defend forests, rivers and hills. Oil and shared rivers show resource geopolitics. And indigenous peoples seek land rights, fair rehabilitation and a voice.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'India **ratified** Kyoto in **2002**; it was agreed in **1997**. Do not mix the years.',
        'For India\'s stand, give **both** international arguments **and** domestic action.',
        'Name **examples** of movements: **Chipko**, **Narmada Bachao Andolan**.',
        'Resource geopolitics: use **oil** and **shared rivers** as examples.',
        'On development versus rights, write a **balanced** answer.',
      ],
      n: 'Final tips. Keep the Kyoto years apart: agreed in 1997, ratified by India in 2002. For India\'s stand, mention both what India argues abroad and what it does at home. Always give named examples of movements. Use oil and shared rivers to explain resource geopolitics. And when a question sets development against rights, give both sides and a calm conclusion.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Environment and Natural Resources — Notes',
  sections: [
    {
      h: '1. Why the environment is a global political issue',
      t: 1,
      b: 'From the **1960s**, concern grew about the effects of economic growth on the planet.\n\n**Main concerns:** little new **cultivable land** and much degraded farmland; lack of **safe drinking water** for very many people; loss of **natural forests** and biodiversity; **overfishing** and coastal pollution; thinning of the **ozone layer**.\n\n**Why it is political:** the damage **crosses borders**, so no government can fix it alone; protection has **costs**, and states argue over who pays; scarce resources create **competition**.',
      terms: [
        ['Biodiversity', 'The variety of plant and animal life in an area; it falls as forests are lost.'],
        ['Ozone layer', 'A layer in the upper atmosphere that shields life from harmful radiation.'],
      ],
      v: vConcerns,
    },
    {
      h: '2. From Stockholm to Rio',
      t: 1,
      b: '- **1972:** the Club of Rome\'s ***Limits to Growth*** warned of resource depletion as population rises; a UN conference at **Stockholm** led to **UNEP**.\n- **1987:** the **Brundtland Report**, *Our Common Future*, popularised **sustainable development**.\n- **1992:** the **Earth Summit at Rio de Janeiro** produced the **climate change** and **biodiversity** conventions, **forest principles** and **Agenda 21**.\n\n**Rio divide:** the **North** focused on ozone depletion and global warming; the **South** wanted environmental rules linked to **development**. Agreement was reached on **ecologically responsible growth**. **Criticism:** Agenda 21 was said to favour growth over conservation.',
      terms: [
        ['Sustainable development', 'Development that meets present needs without harming the ability of future generations to meet theirs.'],
        ['Agenda 21', 'The list of development practices for sustainable development adopted at Rio in 1992.'],
      ],
      v: vTimeline,
      vs: [vRio, vNorthSouth],
    },
    {
      h: '3. The global commons',
      t: 2,
      b: '**Global commons:** areas outside the **sovereign jurisdiction** of any state, needing common governance: the **earth\'s atmosphere**, **Antarctica**, the **ocean floor** and **outer space**.\n\n**Difficulties:** scientific **uncertainty** delays agreement; **unequal technology** lets advanced states benefit most (deep-sea mining, satellites); every party must **agree** to change rules.\n\n**Successes:** the **Antarctic Treaty (1959)** keeps the continent for peaceful use and science, with a later environmental protocol (1991); the **ozone hole** found over Antarctica in the mid-1980s led to the **Montreal Protocol (1987)** phasing out ozone-depleting substances.',
      terms: [
        ['Global commons', 'Regions beyond the jurisdiction of any state, such as the atmosphere, Antarctica, the ocean floor and outer space.'],
        ['Montreal Protocol', 'The 1987 agreement to phase out substances that damage the ozone layer.'],
      ],
      v: vCommons,
      vs: [vCommonsHard, vOzone],
    },
    {
      h: '4. Common but differentiated responsibilities and climate agreements',
      t: 2,
      b: '**CBDR:** all states share the duty to protect the environment (**common**), but the **developed** countries, responsible for most past emissions and with more resources, should carry a **larger** burden and help others (**differentiated**). The principle appears in the Rio Declaration and the climate convention.\n\n- **UN Framework Convention on Climate Change (1992):** act on equity and CBDR; developed countries to take the lead.\n- **Kyoto Protocol (1997):** binding cuts for **industrialised** countries; **India and China** had no binding targets.\n- **Paris Agreement (2015):** **every party** sets a nationally determined contribution.',
      terms: [
        ['CBDR', 'Common but differentiated responsibilities: a shared duty with a heavier burden on the developed countries.'],
        ['Kyoto Protocol', 'The 1997 agreement that set binding greenhouse gas targets for industrialised countries.'],
      ],
      v: vCBDR,
      vs: [vClimate],
    },
    {
      h: '5. India\'s stand',
      t: 3,
      b: '- India **signed and ratified Kyoto in August 2002**, with no binding target as a developing country.\n- **Per capita:** India\'s emissions per person are a small fraction of those of developed countries.\n- **Historical responsibility:** the gases already in the atmosphere came mainly from early industrial nations.\n- **CBDR and support:** developed countries should lead and provide **finance and clean technology**.\n- **Right to development:** climate action must leave room for removing poverty.\n\n**At home:** the **Energy Conservation Act (2001)**, cleaner fuels for vehicles, a **national action plan on climate change** with missions such as solar power and energy efficiency, and promotion of **renewable energy**.',
      terms: [
        ['Per capita emissions', 'Total emissions of a country divided by its population.'],
        ['Historical responsibility', 'The idea that countries which emitted most in the past should do most now.'],
      ],
      v: vIndiaFacts,
      vs: [vIndiaHome],
    },
    {
      h: '6. Movements, resource geopolitics and indigenous peoples',
      t: 4,
      b: '**Environmental movements** are mostly **local and people-led**:\n- **Forest movements**, e.g. **Chipko** (1970s, Himalayan hills of present-day Uttarakhand).\n- **Anti-dam movements**, e.g. the **Narmada Bachao Andolan**; similar campaigns elsewhere, such as in Australia.\n- **Movements against mining** that defend land, water and sacred sites.\n\n**Resource geopolitics:** competition among states for resources. **Oil** is vital and concentrated in a few regions, notably **West Asia**, so it shapes rivalry and alliances. **Water:** shared rivers can set upstream against downstream states.\n\n**Indigenous peoples:** descendants of a land\'s original inhabitants who keep their own ways of life. Core issues: **land and forest rights**, **displacement** by projects, **recognition** and a voice. International steps: World Council of Indigenous Peoples (**1975**), UN Working Group on Indigenous Populations (**1982**), UN Declaration on their rights (**2007**).',
      terms: [
        ['Resource geopolitics', 'Competition and conflict among states over access to natural resources.'],
        ['Displacement', 'Forced movement of people from their land, for example by a dam or mine.'],
        ['Indigenous peoples', 'Descendants of the original inhabitants of a land who maintain their own traditions.'],
      ],
      v: vMovements,
      vs: [vOil, vRiver, vIndigenous],
    },
  ],
  tips: '**Common mistakes**\n- Mixing up the Kyoto years: agreed in **1997**, ratified by India in **2002**.\n- Saying Kyoto bound developing countries: it bound **industrialised** countries only.\n- Naming only two global commons: there are **four** standard examples.\n- Explaining CBDR with only one half: give the **common** duty and the **differentiated** burden.\n- Writing opinions about current disputes: stick to **concepts and agreed facts**.\n\n**How marks are usually awarded**\n- 1 mark: correct option or a one-line fact.\n- 2 marks: two points, or a definition plus an example.\n- 3 marks: three distinct points.\n- 5 marks: five points, often including an example and a balanced conclusion.\n- Source parts: quote the line, name the concept, explain.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Why is the environment a **global** issue?', 'Damage such as ozone loss and warming **crosses borders**; no state can fix it alone.', 'concept', 1],
  ['*Limits to Growth* (1972)', 'Club of Rome report warning of **resource depletion** as population grows.', 'fact', 1],
  ['**UNEP**: when and after what?', '**1972**, after the UN conference on the human environment at **Stockholm**.', 'fact', 1],
  ['**Brundtland Report** (1987)', '*Our Common Future*; popularised **sustainable development**.', 'fact', 1],
  ['**Sustainable development**', 'Meeting today\'s needs **without harming future generations**.', 'definition', 1],
  ['**Rio Earth Summit**', '**June 1992**: climate and biodiversity conventions, forest principles, **Agenda 21**.', 'fact', 1],
  ['North vs South at Rio', 'North: **ozone and warming**. South: link environment with **development**.', 'concept', 1],
  ['Criticism of **Agenda 21**', 'Said to favour **economic growth** over ecological conservation.', 'concept', 1],
  ['**Global commons**', 'Areas outside any state\'s jurisdiction: **atmosphere, Antarctica, ocean floor, outer space**.', 'definition', 2],
  ['Two difficulties in managing the commons', '**Scientific uncertainty**; **unequal technology** favouring rich states.', 'concept', 2],
  ['**Antarctic Treaty**', '**1959**; continent kept for peaceful purposes and science.', 'fact', 2],
  ['**Montreal Protocol**', '**1987**; phase-out of ozone-depleting substances.', 'fact', 2],
  ['What revealed damage to the ozone layer?', 'The **ozone hole over Antarctica**, found in the mid-1980s.', 'fact', 2],
  ['**CBDR**', 'Common duty for all; **bigger burden** on developed states (past emissions, more resources).', 'definition', 2],
  ['**UNFCCC**', 'UN climate change framework convention, **1992**: act on equity and CBDR.', 'fact', 2],
  ['**Kyoto Protocol**', '**1997**; binding cuts for **industrialised** countries only.', 'fact', 2],
  ['**Paris Agreement**', '**2015**; **every party** sets its own national pledge.', 'fact', 2],
  ['India and Kyoto', 'Signed and ratified in **2002**; **no binding cut** as a developing country.', 'fact', 3],
  ['India\'s **per capita** argument', 'An average Indian emits a **small fraction** of what a person in a rich country emits.', 'concept', 3],
  ['India\'s **historical** argument', 'Most gases in the air came from **early industrial nations**.', 'concept', 3],
  ['India\'s steps at home', 'Energy Conservation Act **2001**, cleaner fuels, **national climate plan**, renewables.', 'fact', 3],
  ['Three kinds of environmental movement', '**Forest**, **anti-dam**, **against mining**.', 'concept', 4],
  ['**Chipko**', '1970s forest movement in the Himalayan hills of present-day **Uttarakhand**.', 'example', 4],
  ['**Narmada Bachao Andolan**', 'Movement questioning **large dams** on the Narmada: displacement, ecology.', 'example', 4],
  ['**Resource geopolitics**', 'Competition among states over **who gets which resources**.', 'definition', 4],
  ['Why oil matters in world politics', 'Vital to economies and armies; reserves **concentrated** in a few regions such as West Asia.', 'concept', 4],
  ['How can rivers cause tension?', '**Upstream** dams or diversions reduce water for **downstream** states.', 'concept', 4],
  ['**Indigenous peoples**', 'Descendants of a land\'s **original inhabitants** keeping their own ways of life.', 'definition', 4],
  ['UN Working Group on Indigenous Populations', 'Set up in **1982**.', 'fact', 4],
  ['Core concerns of indigenous peoples', '**Land and forest rights**, **displacement**, recognition and a voice.', 'exam-tip', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-political-science-chapter-test-short',
  title: 'Chapter test (short) — Environment and Natural Resources',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_why_global', 'm_cbdr_meaning', 'm_nba', 'ar_global_issue'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_cbdr', 's_movements_two', 's3_ozone_commons'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_rio', 'l_india_stand'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks)', instr: 'Read the source and answer all parts. Part (c) has an internal choice.', items: ['sb_ministry_note'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-political-science-chapter-test-long',
  title: 'Chapter test (long) — Environment and Natural Resources',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_brundtland', 'm_rio_outcome', 'm_north_south_rio', 'm_kyoto', 'm_commons_hard', 'm_india_percapita', 'm_geopolitics', 'm_indigenous_issue', 'ar_cbdr', 'ar_indigenous_voice'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_why_politics', 's_india_stand', { attempt: 1, keys: ['s_commons_two', 's_geopolitics_water'] }, 's3_kyoto_paris', { attempt: 1, keys: ['s3_indigenous', 's3_india_eval'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_commons', { attempt: 1, keys: ['l_movements', 'l_cbdr_debate'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks each)', instr: 'Read each source and answer all parts. Part (c) of each has an internal choice.', items: ['sb_summit_diary', 'sb_valley_report'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 of cbse-12-political-science-ch06 only (environment in global politics; global commons and CBDR; India\'s stand; movements, resource geopolitics and indigenous peoples)',
    originality: 'every source, country, speaker and scenario is imagined and written by SOYL (labelled); no NCERT text, cartoon, box or exercise and no board or sample-paper item reused (D-036); no quotation of any real person',
    facts: `milestones ${MILESTONES.map(([y, n]) => `${n} ${y}`).join('; ')}; Antarctic environmental protocol 1991; Energy Conservation Act 2001; World Council of Indigenous Peoples 1975; UN Working Group 1982; UN Declaration 2007; nothing after 2024 stated`,
    neutrality: 'North–South positions, development versus rights and the CBDR debate presented with both sides; no opinion on any current dispute',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
