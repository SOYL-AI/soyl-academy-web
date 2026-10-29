// Build CBSE 12 Political Science ch05 Security in the Contemporary World. Run from platform/:
//   npx tsx content/authored/social-science/cbse-12-political-science-ch05/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-political-science-ch05', 'social-science');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG figures
const vChoices = (() => {
  const s = new Svg(660, 250);
  s.rect(230, 14, 200, 44, { color: 'accent', sw: 2 });
  s.text(330, 36, 'Threat of war', { bold: true });
  const boxes = [
    [20, 'Surrender', 'Give in to the attacker'],
    [240, 'Deterrence', 'Make attack too costly'],
    [460, 'Defence', 'Limit or end the war'],
  ];
  for (const [x, h, sub] of boxes) {
    s.arrow(330, 58, x + 90, 128, { sw: 1.6, color: 'muted' });
    s.rect(x, 130, 180, 74, { sw: 1.6 });
    s.text(x + 90, 156, h, { bold: true });
    s.text(x + 90, 182, sub, { size: 13 });
  }
  s.text(330, 232, 'Deterrence works before a war; defence works after it begins.', { size: 13, muted: true });
  return s.visual('Diagram: a threat of war at the top leads to three choices for a government: surrender, deterrence (make an attack too costly so it never happens) and defence (limit or end a war that has begun)', 'Three choices in the traditional view');
})();

const TREATIES = [
  [1968, 'NPT', 'nuclear weapons'],
  [1972, 'BWC and ABM Treaty', 'biological weapons; missile defence'],
  [1992, 'CWC', 'chemical weapons'],
];
const vTimeline = (() => {
  const s = new Svg(660, 220);
  const X = (y) => 60 + ((y - 1960) / (2000 - 1960)) * 540;
  s.arrow(40, 110, 630, 110, { sw: 1.8 });
  for (const yr of [1960, 1970, 1980, 1990, 2000]) {
    s.line(X(yr), 104, X(yr), 116, { sw: 1.2, color: 'muted' });
    s.text(X(yr), 130, String(yr), { size: 12, muted: true });
  }
  TREATIES.forEach(([yr, name, what], i) => {
    const up = i !== 1;
    s.dot(X(yr), 110, 6, 'accent');
    s.line(X(yr), 110, X(yr), up ? 62 : 158, { sw: 1.4, color: 'accent' });
    s.text(X(yr), up ? 32 : 178, `${yr}: ${name}`, { bold: true, size: 13 });
    s.text(X(yr), up ? 52 : 198, what, { size: 12 });
  });
  return s.visual('Timeline from 1960 to 2000: the Nuclear Non-Proliferation Treaty in 1968; the Biological Weapons Convention and the Anti-Ballistic Missile Treaty in 1972; the Chemical Weapons Convention in 1992', 'Arms-control and disarmament milestones');
})();

const vHuman = (() => {
  const s = new Svg(660, 270);
  s.rect(20, 14, 620, 240, { sw: 1.6, fill: 'fill' });
  s.text(330, 40, 'Broad human security', { bold: true });
  s.text(330, 64, 'also freedom from want: hunger, disease, natural disasters', { size: 13 });
  s.rect(170, 92, 320, 140, { sw: 2, color: 'accent' });
  s.text(330, 130, 'Narrow human security', { bold: true, color: 'accent' });
  s.text(330, 158, 'freedom from violence,', { size: 13 });
  s.text(330, 180, 'including violence by', { size: 13 });
  s.text(330, 202, 'one\'s own state', { size: 13 });
  return s.visual('Nested boxes: the inner box is narrow human security, freedom from violence including violence by one\'s own state; the outer box is broad human security, which adds freedom from want such as hunger, disease and natural disasters', 'Both views protect individuals; they differ on which threats count');
})();

const vBorder = (() => {
  const s = new Svg(660, 250);
  s.rect(20, 30, 290, 190, { sw: 1.6 });
  s.rect(350, 30, 290, 190, { sw: 1.6 });
  s.text(165, 52, 'Country A', { bold: true });
  s.text(495, 52, 'Country B', { bold: true });
  s.line(330, 20, 330, 230, { sw: 2.4, dash: true, color: 'accent' });
  s.text(330, 242, 'International border', { size: 12, color: 'accent' });
  s.arrow(110, 160, 230, 100, { sw: 2 });
  s.text(150, 182, 'Internally displaced', { size: 13 });
  s.text(150, 202, '(stay inside Country A)', { size: 12, muted: true });
  s.arrow(250, 130, 450, 130, { sw: 2, color: 'accent' });
  s.text(470, 160, 'Refugees', { bold: true, color: 'accent' });
  s.text(470, 182, '(cross the border)', { size: 12, muted: true });
  return s.visual('Diagram of two countries separated by a dashed international border: an arrow inside Country A shows internally displaced people who stay within their country; an arrow crossing into Country B shows refugees who cross the border', 'The border decides the term');
})();

const PILLARS = ['Military capability', 'International norms and institutions', 'Internal security, democratically', 'Economic development'];
const vPillars = (() => {
  const s = new Svg(660, 270);
  s.polygon([[30, 70], [330, 14], [630, 70]], { sw: 1.8, color: 'accent' });
  s.text(330, 52, 'India\'s security strategy', { bold: true, color: 'accent' });
  PILLARS.forEach((p, i) => {
    const x = 40 + i * 150;
    s.rect(x, 84, 130, 150, { sw: 1.6, rx: 4 });
    const words = p.split(' ');
    const lines = [];
    let cur = '';
    for (const w of words) {
      if ((cur + ' ' + w).trim().length > 14) { lines.push(cur.trim()); cur = w; } else cur = `${cur} ${w}`;
    }
    lines.push(cur.trim());
    lines.forEach((ln, j) => s.text(x + 65, 130 + j * 22, ln, { size: 13 }));
  });
  s.line(20, 246, 640, 246, { sw: 2.4 });
  return s.visual('Diagram of a roof labelled India\'s security strategy resting on four pillars: military capability; international norms and institutions; meeting internal security challenges democratically; and economic development', 'Four components of India\'s strategy');
})();

// ---------------------------------------------------------------- tables and flows
const vRoute1 = flow('LR', ['What security means', 'Traditional: external', 'Traditional: internal', 'Cooperation among rivals', 'Human security', 'Global security'], 'Route map of Part 1: what security means, traditional external and internal security, cooperation among rivals, human security and global security', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Terrorism', 'Human rights', 'Global poverty', 'Migration', 'Epidemics', 'Cooperative security', 'India\'s strategy'], 'Route map of Part 2: terrorism, human rights, global poverty, migration, epidemics, cooperative security and India\'s strategy', 'Part 2 at a glance');
const vMeaning = table(
  ['Question', 'Short answer'],
  [
    ['Security from what?', 'From threats to core values: survival, territory, a way of life'],
    ['Which threats count?', 'Only grave ones that could seriously harm those values'],
    ['Whose security?', 'Traditional view: the state. Newer views: people and the planet'],
  ],
  'Table: security means freedom from threats to core values; only grave threats count; the traditional view protects the state while newer views protect people and the planet',
);
const vComponents = table(
  ['Component', 'Idea', 'When it works'],
  [
    ['Deterrence', 'Make an attack too costly to try', 'Before a war'],
    ['Defence', 'Limit damage, repel the attacker', 'During a war'],
    ['Balance of power', 'Stop a rival from becoming far stronger', 'All the time'],
    ['Alliance building', 'Pool strength with partners', 'Before and during a war'],
  ],
  'Table of the four components of traditional external security: deterrence before a war, defence during a war, balance of power all the time, alliance building before and during a war',
);
const vWE1 = table(
  ['Action by an imagined country', 'Component', 'Clue'],
  [
    ['Warns that any attack will meet a crushing response', 'Deterrence', 'Aims to stop the attack happening'],
    ['Sends troops to push back raiders across the border', 'Defence', 'War has already begun'],
    ['Raises defence spending when a neighbour grows stronger', 'Balance of power', 'Reacts to relative strength'],
    ['Signs a mutual-defence pact with two states', 'Alliance building', 'Coalition of states'],
  ],
  'Worked example table: a warning of a crushing response is deterrence; pushing back raiders is defence; raising spending when a neighbour grows is balance of power; a mutual-defence pact is alliance building',
  'Look for the clue word before naming the component.',
);
const vInternal = table(
  ['', 'Most Western powers after 1945', 'Many new states of Asia and Africa'],
  [
    ['Main worry', 'External threats, especially in the Cold War', 'Both neighbours and internal separatist movements'],
    ['Internal situation', 'Largely stable', 'Often contested borders and identities'],
  ],
  'Comparison table: after 1945 most Western powers worried mainly about external threats and were internally stable, while many new states of Asia and Africa faced both neighbours and internal separatist movements',
);
const vCoop = table(
  ['Form of cooperation', 'What it does', 'Imagined example'],
  [
    ['Disarmament', 'Gives up a whole category of weapons', 'Two rivals destroy all stocks of a nerve gas'],
    ['Arms control', 'Regulates or caps weapons', 'Each side keeps at most fifty launchers'],
    ['Confidence building', 'Shares information to avoid mistakes', 'Advance notice of army exercises'],
  ],
  'Table of three forms of cooperation within traditional security: disarmament gives up a weapon category, arms control caps or regulates weapons, confidence building shares information to avoid mistakes',
);
const vWE2 = table(
  ['Agreement', 'Abolish or regulate?', 'Classification'],
  [
    ['Biological Weapons Convention, 1972', 'Abolishes making and holding biological weapons', 'Disarmament'],
    ['Anti-Ballistic Missile Treaty, 1972', 'Limits missile defence systems', 'Arms control'],
    ['Nuclear Non-Proliferation Treaty, 1968', 'Decides who may hold nuclear weapons', 'Arms control'],
    ['Chemical Weapons Convention, 1992', 'Abolishes chemical weapons', 'Disarmament'],
  ],
  'Worked example table: the Biological and Chemical Weapons Conventions abolish weapons and are disarmament; the ABM Treaty and the NPT regulate weapons and are arms control',
);
const vTradNon = table(
  ['', 'Traditional', 'Non-traditional'],
  [
    ['Whose security', 'The state', 'People and humanity as a whole'],
    ['Main threats', 'Military attack, separatism', 'Also violence by states on people, hunger, disease, climate'],
    ['Main tools', 'Armed force, alliances', 'Cooperation, development, rights'],
  ],
  'Comparison of traditional and non-traditional security: whose security, the main threats and the main tools',
);
const vGlobal = flow('LR', ['Threat crosses borders (warming, epidemics, terrorism)', 'No single state can solve it', 'Countries must cooperate', 'Global security'], 'Flow: threats such as global warming, epidemics and terrorism cross borders, no single state can solve them, so countries must cooperate; this is global security', 'Why global security is a separate idea');
const vSummary1 = table(
  ['Idea', 'Remember'],
  [
    ['Security', 'Freedom from grave threats to core values'],
    ['Traditional external', 'Deterrence, defence, balance of power, alliances'],
    ['Traditional internal', 'A major concern for many new post-colonial states'],
    ['Cooperation among rivals', 'Disarmament, arms control, confidence building'],
    ['Human security', 'Protect people: narrow (violence) or broad (also want)'],
    ['Global security', 'Cross-border threats needing joint action'],
  ],
  'Summary table of Part 1: meaning of security, traditional external and internal security, cooperation among rivals, human security and global security',
);
const vOldNew = table(
  ['Older focus', 'Newer sources of threat'],
  [
    ['Armies of other states', 'Groups that attack civilians'],
    ['Border wars', 'Abuse of people\'s rights'],
    ['Military balance', 'Poverty, migration, epidemics'],
  ],
  'Table contrasting the older focus on enemy armies, border wars and military balance with newer threats: attacks on civilians, rights abuses, poverty, migration and epidemics',
);
const vTerror = flow('LR', ['Violence against civilians', 'Fear spreads', 'Pressure on governments and societies', 'Political aim of the group'], 'Flow showing how terrorism works: violence against civilians spreads fear, which puts pressure on governments to serve the group\'s political aim', 'How terrorism uses fear');
const vRights = table(
  ['Category', 'Imagined example of a demand'],
  [
    ['Political rights', 'Freedom to speak, meet and vote'],
    ['Economic and social rights', 'Clean water, health care, fair wages, schooling'],
    ['Rights of colonised peoples and minorities', 'Self-rule; protection of indigenous and ethnic groups'],
  ],
  'Table of the three categories of human rights with examples: political rights, economic and social rights, and rights of colonised peoples and minorities',
);
const vIntervene = table(
  ['Arguments for intervention', 'Concerns about intervention'],
  [
    ['Grave abuse of people cannot be ignored', 'It can override a country\'s sovereignty'],
    ['Lives matter more than borders', 'Powerful states may act selectively, for their own interests'],
    ['Collective action can stop mass violence', 'It may worsen violence if badly planned'],
  ],
  'Two-sided table of the humanitarian intervention debate: arguments for (grave abuse, lives over borders, collective action) and concerns (sovereignty, selective use by powerful states, worsening violence)',
);
const vPoverty = flow('LR', ['Poverty and inequality', 'Hunger, weak health systems', 'Conflict and migration', 'Effects cross borders'], 'Flow: poverty and inequality cause hunger and weak health systems, which feed conflict and migration, whose effects cross borders', 'Why poverty is a security issue');
const vWE3 = table(
  ['Step', 'What to do with a source'],
  [
    ['1', 'Underline who moves and whether a border is crossed'],
    ['2', 'Mark each threat in the text: fighting, disease, prices'],
    ['3', 'Name the concept (refugee, IDP, epidemic, human security)'],
    ['4', 'Quote the exact words that prove it, then explain in one line'],
  ],
  'Worked example steps for a source question: underline who moves and whether a border is crossed, mark threats, name the concept, quote and explain',
  'Quote, name, explain: the pattern examiners reward.',
);
const vEpidemic = flow('LR', ['New infection appears', 'Travel and trade carry it', 'Health systems overloaded', 'Economies and societies disrupted'], 'Flow: a new infection appears, travel and trade carry it across borders, health systems are overloaded, and economies and societies are disrupted', 'How an epidemic becomes a security threat');
const vCoopLevels = table(
  ['Level', 'Who takes part', 'Imagined example'],
  [
    ['Bilateral', 'Two countries', 'Joint patrols against smugglers'],
    ['Regional', 'Neighbours in a region', 'Shared flood and cyclone warnings'],
    ['Global', 'Most countries, UN agencies', 'A worldwide vaccination drive'],
    ['Non-state', 'NGOs, businesses, individuals', 'Medical charities training nurses'],
  ],
  'Table of levels of cooperative security: bilateral, regional, global and non-state actors, with imagined examples',
);
const vWE4 = table(
  ['Mark', 'Point to write'],
  [
    ['1', 'Military capability, with a reason (past conflicts, nuclear tests 1974 and 1998)'],
    ['1', 'International norms: universal disarmament, decolonisation, the UN'],
    ['1', 'Internal challenges met through democratic, constitutional means'],
    ['1', 'Economic development to remove poverty and inequality'],
    ['1', 'A closing judgement linking the strategy to traditional and human security'],
  ],
  'Worked example plan for a 5-mark answer on India\'s security strategy: four components, one mark each, and a closing judgement',
);
const vSummary2 = table(
  ['Idea', 'Remember'],
  [
    ['Terrorism', 'Deliberate violence on civilians to spread fear'],
    ['Human rights', 'Political; economic and social; colonised peoples and minorities'],
    ['Migration', 'Refugees cross a border; IDPs do not'],
    ['Epidemics, poverty', 'Spread across borders; need joint action'],
    ['Cooperative security', 'Many levels and actors; force only as a last resort'],
    ['India', 'Military, norms, internal democracy, development'],
  ],
  'Summary table of Part 2: terrorism, human rights, migration, epidemics and poverty, cooperative security and India\'s strategy',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Security in the Contemporary World — Part 1: Traditional and Non-traditional Security',
  goals: [
    'Explain what security means and why the term is kept for grave threats',
    'Explain deterrence, defence, balance of power and alliance building, and internal security',
    'Distinguish disarmament, arms control and confidence building',
    'Explain human security (narrow and broad) and global security',
  ],
  slides: [
    sl('title', 'Security in the Contemporary World', {
      b: 'Part 1 — what **security** means, the **traditional** view, and the **non-traditional** view.',
      v: vRoute1,
      n: 'What makes you feel safe? A strong army at the border, or clean water, a doctor nearby and a steady job? Both answers are part of how the world thinks about security today. In this part we first study the older, traditional view, which is about protecting the state from war. Then we see how a newer view puts people and the whole planet at the centre.',
    }),
    sl('concept', 'What does security mean?', {
      b: 'Security is **freedom from threats** to the **core values** of a country or people. Only **grave** threats count.',
      v: vMeaning,
      n: 'At its simplest, security means freedom from threats. But not every problem is a security problem. Scholars keep the word for dangers that could seriously harm the core values of a country or people, such as survival, territory and a way of life. If we called everything a security issue, the word would stop being useful. Notice the last row: the big debate is about whose security we mean.',
    }),
    sl('diagram', 'The traditional view: a threat of war', {
      b: 'In the traditional view the **state** is protected, and the gravest threat is **military attack**.',
      v: vChoices,
      n: 'The traditional view starts with the state. Its biggest fear is an attack by another country, because that threatens territory, independence and the lives of citizens. Faced with such a threat, a government has three basic choices. It can give in. It can try to stop the attack from ever happening by making it too costly. Or it can fight to limit or end a war that has already begun.',
    }),
    sl('check', 'Quick check: why keep the word narrow?', {
      b: 'Why do scholars use "security" only for very grave threats?',
      chk: 'm_grave_threat',
      n: 'Think about what would happen to the idea of security if every everyday problem were included in it.',
    }),
    sl('diagram', 'Four components of external security', {
      v: vComponents,
      n: 'Traditional external security rests on four ideas. Deterrence tries to prevent a war. Defence limits or ends a war once it starts. Balance of power means keeping watch on how strong rivals are, and building up when a neighbour grows much stronger. Alliance building means joining hands with other states. Alliances follow national interest, so they can change when interests change.',
    }),
    sl('example', 'Worked example 1: name the component', {
      b: 'Read each action of an imagined country and name the component it shows.',
      bl: [
        'Step 1 — Ask: has the war **already begun**? If yes, it is defence.',
        'Step 2 — Is the aim to **stop an attack happening**? Deterrence.',
        'Step 3 — Is it a reaction to a rival\'s **growing strength**? Balance of power.',
        'Step 4 — Does it involve **other states** joining in? Alliance building.',
      ],
      v: vWE1,
      n: 'Case questions often describe what a government does and ask you to name the idea. Use the clue in each action. A warning of a crushing response is about preventing war, so it is deterrence. Pushing back raiders means fighting has started, so it is defence. Spending more because a neighbour is growing is balance of power. A pact with two states is an alliance.',
    }),
    sl('check', 'Quick check: match the components', {
      b: 'Match each component with what an imagined government does.',
      chk: 'mt_components',
      n: 'Use the same clues as in the worked example: timing, aim and partners.',
    }),
    sl('concept', 'Internal security', {
      b: 'Traditional security also covers **internal** order. After 1945 this mattered very differently in different parts of the world.',
      v: vInternal,
      n: 'Traditional security is not only about the border. After the Second World War, most Western powers were internally stable, so their main worry was external, especially during the Cold War. Many countries that became free in Asia and Africa faced a double challenge: disputes with neighbours and movements inside their borders that wanted separate states. For them, external and internal security were tied together.',
    }),
    sl('concept', 'Limits on violence', {
      b: 'Even in war, the traditional view accepts **limits**: spare **civilians** and surrendering soldiers, use force **in proportion** and only as a **last resort**.',
      n: 'The traditional view does not say anything goes. An old tradition of thought holds that force should be a last resort, should be used only in proportion to the threat, and should spare people who are not fighting, such as civilians and soldiers who have surrendered. These ideas lie behind many rules of war that countries have accepted.',
    }),
    sl('diagram', 'Cooperation among rivals', {
      b: 'States that distrust each other can still **cooperate** to make war less likely.',
      v: vCoop,
      n: 'Rivals can still cooperate. In disarmament they give up a whole kind of weapon. In arms control they keep weapons but accept limits on how many or what kind. In confidence building they share information, for example about army exercises, so that neither side mistakes a routine move for an attack. All three reduce the chance of war.',
    }),
    sl('diagram', 'Landmark agreements', {
      v: vTimeline,
      n: 'Here are some landmark agreements. The Nuclear Non-Proliferation Treaty came in 1968. In 1972 came the Biological Weapons Convention and the Anti-Ballistic Missile Treaty between the United States and the Soviet Union. The Chemical Weapons Convention followed in 1992. Learn these four years carefully; they are often asked.',
    }),
    sl('check', 'Quick check: the 1972 missile treaty', {
      b: 'The Anti-Ballistic Missile Treaty of 1972 is an example of what?',
      chk: 'm_abm',
      n: 'Ask yourself: did the treaty abolish weapons, or did it limit them?',
    }),
    sl('example', 'Worked example 2: abolish or regulate?', {
      b: 'Classify four agreements as **disarmament** or **arms control**.',
      bl: [
        'Step 1 — Does the agreement **ban a whole category** of weapon? Then it is disarmament.',
        'Step 2 — Does it **limit, cap or decide who may hold** weapons? Then it is arms control.',
        'Step 3 — Write the classification **and** the reason.',
      ],
      v: vWE2,
      n: 'Let us classify four agreements. The biological and chemical weapons conventions ban whole categories of weapons, so they are disarmament. The missile treaty only limited defence systems, and the non-proliferation treaty decided which countries could keep nuclear weapons, so both are arms control. India has not signed the non-proliferation treaty, which it sees as unequal.',
    }),
    sl('two-column', 'Non-traditional security: whose security?', {
      b: 'The non-traditional view widens **whose** security matters and **which** threats count.',
      cols: [
        '**Traditional**\n\n- Protects the state\n- Military threats\n- Armed force and alliances',
        '**Non-traditional**\n\n- Protects people and humanity\n- Also hunger, disease, climate\n- Cooperation and development',
      ],
      v: vTradNon,
      n: 'The non-traditional view asks a different question: whose security? It looks beyond the state to individual human beings and to humanity as a whole. So the list of threats grows to include violence by a government against its own people, hunger, disease and climate change. The tools also change, from armies and alliances to cooperation, development and rights.',
    }),
    sl('diagram', 'Human security: narrow and broad', {
      v: vHuman,
      n: 'Human security puts the individual at the centre. Everyone in this debate agrees that people must be protected. They differ on which threats to include. The narrow view focuses on violence, including violence by a person\'s own government. The broad view adds freedom from want: hunger, disease and natural disasters. One reason for this idea is that some governments have harmed their own citizens.',
    }),
    sl('diagram', 'Global security', {
      v: vGlobal,
      n: 'Global security deals with threats that cross borders, such as global warming, epidemics and international terrorism. No country, however strong, can solve these alone. A rising sea does not stop at a border, and a virus travels on aeroplanes. So countries have to work together, and that cooperation is what global security is about.',
    }),
    sl('check', 'Quick check: the narrow view', {
      b: 'The narrow concept of human security protects people mainly from what?',
      chk: 'm_human_narrow',
      n: 'Remember the difference: the narrow view has one main threat, the broad view adds several more.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. Security means freedom from grave threats to core values. The traditional view protects the state through deterrence, defence, balance of power and alliances, and also worries about internal order. Rivals can still cooperate through disarmament, arms control and confidence building. The newer view protects people, narrowly from violence or broadly from want as well, and tackles global threats together.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Deterrence **before** war; defence **after** it begins. Do not swap them.',
        'Disarmament **abolishes** a weapon type; arms control **regulates** it. NPT and ABM are arms control.',
        'Learn the years: NPT 1968; BWC and ABM 1972; CWC 1992.',
        'Narrow and broad human security agree on **protecting individuals**; they differ on **which threats**.',
        'In source questions, **quote** the line, **name** the concept, **explain** it in one sentence.',
      ],
      n: 'A few exam tips. Keep deterrence and defence apart by timing. Remember that arms control regulates weapons while disarmament abolishes them. Learn the four treaty years. When you compare the two views of human security, say what they agree on as well as how they differ. And in source questions, quote, name and explain.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Security in the Contemporary World — Part 2: New Threats, Cooperation and India',
  goals: [
    'Analyse terrorism, human rights, global poverty, migration and epidemics as threats',
    'Distinguish refugees from internally displaced persons',
    'Explain cooperative security, its levels and actors',
    'Describe the four components of India\'s security strategy',
  ],
  slides: [
    sl('title', 'New sources of threat, cooperation and India', {
      b: 'Part 2 — **new threats**, **cooperative security** and **India\'s strategy**.',
      v: vRoute2,
      n: 'In Part 2 we look at threats that armies alone cannot defeat: terrorism, abuse of human rights, global poverty, forced migration and epidemics. Then we see how countries and other groups cooperate to deal with them, and finally how India puts together its own security strategy.',
    }),
    sl('concept', 'Why call these threats new?', {
      v: vOldNew,
      n: 'Wars between armies have not disappeared, but other dangers now affect many more people. These newer threats often come from groups rather than states, travel across borders, and harm ordinary people directly. That is why they sit at the centre of the non-traditional view of security.',
    }),
    sl('diagram', 'Terrorism', {
      b: '**Terrorism** is political violence that deliberately and indiscriminately targets **civilians** to create fear.',
      v: vTerror,
      n: 'Terrorism means political violence aimed on purpose at ordinary people. Attacks on markets, trains or offices are meant to spread fear, and that fear is used to put pressure on governments to change a political situation. Because many groups work across borders, countries need to share information and act together against them.',
    }),
    sl('concept', 'Human rights as security', {
      b: 'Human rights are grouped into **three** broad categories.',
      v: vRights,
      n: 'Human rights are now seen as part of security. They are usually grouped into three categories. Political rights include free speech and the vote. Economic and social rights include work, wages, health and schooling. The third category covers the rights of colonised peoples and of ethnic and indigenous minorities.',
    }),
    sl('two-column', 'The debate on humanitarian intervention', {
      b: 'Should outside powers step in when a government seriously abuses its own people?',
      cols: [
        '**For**\n\n- Grave abuse cannot be ignored\n- Collective action can save lives',
        '**Concerns**\n\n- Sovereignty is overridden\n- Selective use by powerful states',
      ],
      v: vIntervene,
      n: 'A hard question follows. If a government badly abuses its people, should others intervene? Supporters say lives matter more than borders. Critics worry that powerful countries choose when to act according to their own interests, and that intervention can make violence worse. Most people agree it should be a last resort, decided collectively. In exams, present both sides calmly.',
    }),
    sl('check', 'Quick check: name the threat', {
      b: 'Match each imagined news report with the threat it describes.',
      chk: 'mt_threats',
      n: 'For each report, ask who is harmed and how: is it violence, denial of rights, disease or forced movement?',
    }),
    sl('diagram', 'Global poverty', {
      v: vPoverty,
      n: 'Poverty is not only an economic problem. Large gaps between rich and poor regions, and fast population growth in some of the poorest countries, can lead to hunger, weak health systems and conflict. These push people to migrate and allow diseases to spread, so the effects reach far beyond the poor region itself.',
    }),
    sl('diagram', 'Migration: refugees and internally displaced persons', {
      v: vBorder,
      n: 'Wars, persecution and disasters force people from their homes. If they cross an international border, they are refugees. If they stay inside their own country, they are internally displaced persons. Both groups face hunger, illness and loss of legal protection, and the places that receive them can come under great strain.',
    }),
    sl('example', 'Worked example 1: reading a source', {
      b: 'An imagined camp diary mentions people arriving from **across a river** after fighting, others from a **flooded district of the same country**, a feared **fever outbreak** and **rising market prices**.',
      v: vWE3,
      n: 'Here is how to read a source. People from across the river crossed a border after fighting, so they are refugees. People from a flooded district of the same country are internally displaced. The feared fever outbreak shows the threat of an epidemic. Rising prices show pressure on the host community. Quote each line, name the idea, and explain it in a sentence.',
    }),
    sl('check', 'Quick check: refugees or not?', {
      b: 'People who flee floods but stay inside their own country are called what?',
      chk: 'm_idp',
      n: 'Ask the one deciding question: did they cross an international border?',
    }),
    sl('diagram', 'Health epidemics', {
      v: vEpidemic,
      n: 'Epidemics are a security issue because diseases travel with people and goods. HIV and AIDS, and later outbreaks and pandemics, showed how quickly an infection can spread across continents, overload hospitals and disrupt work and trade. Closing borders alone rarely works; countries need to share information, research and medical help.',
    }),
    sl('concept', 'Cooperative security', {
      b: 'Non-traditional threats need **cooperation** at many levels and among many actors. **Force** is a **last resort**.',
      v: vCoopLevels,
      n: 'Because these threats cross borders, they need cooperation. It can be between two countries, within a region, or across the world. Non-state actors such as international charities, businesses and well-known individuals also play a part. Force is not ruled out, for example against terrorists or to stop mass abuse, but it should be a last resort, ideally with collective approval.',
    }),
    sl('check', 'Quick check: who cooperates?', {
      b: 'A charity, neighbouring governments and a UN agency run vaccination drives together. What is this?',
      chk: 'm_coop_actors',
      n: 'Notice that both governments and groups that are not states are involved.',
    }),
    sl('diagram', 'India\'s security strategy', {
      v: vPillars,
      n: 'India\'s security strategy has four parts. First, strengthening its military, because of past conflicts with neighbours and a region with nuclear-armed states; India tested nuclear devices in 1974 and 1998. Second, strengthening international rules and institutions, such as universal disarmament and the United Nations. Third, meeting internal challenges through democratic means. Fourth, developing the economy so that citizens are not poor.',
    }),
    sl('example', 'Worked example 2: planning a 5-mark answer', {
      b: 'Question: *Describe the components of India\'s security strategy.* Plan one mark per point.',
      v: vWE4,
      n: 'For a five-mark answer, plan five points. Give each of the four components a short heading and one line of explanation, with a reason or example. Use your fifth point to link the strategy to both kinds of security: the military part covers traditional threats, while development and internal democracy address human security.',
    }),
    sl('check', 'Quick check: which pillar?', {
      b: 'A white paper says lifting citizens out of poverty is part of national security. Which component is this?',
      chk: 'm_india_component',
      n: 'Look for the pillar that deals with poverty and inequality.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. Terrorism, abuse of human rights, global poverty, forced migration and epidemics are threats that cross borders and harm people directly. They call for cooperative security among states and other actors, with force only as a last resort. India combines military strength, support for international rules, democratic handling of internal challenges and economic development.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Refugees **cross** a border; internally displaced persons **do not**.',
        'Name **three** categories of human rights, not two.',
        'On humanitarian intervention, give **both sides** and a balanced conclusion.',
        'India\'s strategy has **four** components; the nuclear tests were in **1974 and 1998**.',
        'Avoid opinions about current conflicts; stick to concepts and agreed facts.',
      ],
      n: 'Final tips. The border test separates refugees from internally displaced persons. Remember all three categories of human rights. Debates such as humanitarian intervention need both sides and a calm conclusion. Know the four parts of India\'s strategy and the two test years. And keep your answers to concepts and agreed facts, not opinions about current events.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Security in the Contemporary World — Notes',
  sections: [
    {
      h: '1. Meaning of security and the traditional view',
      t: 1,
      b: '**Security** = freedom from threats to **core values** (survival, territory, way of life). Only **grave** threats, which could seriously damage those values, are treated as security issues; otherwise the idea becomes too wide.\n\n**Traditional view:** the **state** is the object of security and the gravest danger is **military attack**, which threatens sovereignty, territory and civilian lives. A government facing war can surrender, deter or defend.\n\n**Four components of external security:**\n- **Deterrence:** prevent war by making it too costly for an attacker.\n- **Defence:** limit or end a war once it begins.\n- **Balance of power:** keep a check on the relative strength of rivals; build up when a neighbour grows much stronger.\n- **Alliance building:** coalitions of states to deter or fight; based on national interest, so they shift over time.\n\n**Why self-help:** there is no world government above states, so each relies on its own strength and partners.',
      terms: [
        ['Deterrence', 'Preventing an attack by making clear it would cost the attacker too much.'],
        ['Balance of power', 'Keeping the strength of rivals from tilting sharply against one\'s own country.'],
        ['Alliance', 'A coalition of states formed to deter or meet military attack, guided by national interest.'],
      ],
      v: vChoices,
      vs: [vComponents],
    },
    {
      h: '2. Internal security, limits on war and cooperation',
      t: 1,
      b: '**Internal security:** after 1945 most Western powers were stable at home and focused on external, Cold War threats. Many newly independent states of Asia and Africa faced **both** neighbours and separatist movements inside their borders.\n\n**Limits on war:** force as a last resort, in proportion to the threat, sparing non-combatants and surrendering soldiers.\n\n**Cooperation within traditional security:**\n- **Disarmament:** giving up whole categories of weapons, e.g. the **Biological Weapons Convention (1972)** and the **Chemical Weapons Convention (1992)**.\n- **Arms control:** regulating weapons, e.g. the **Anti-Ballistic Missile Treaty (1972)** between the USA and the USSR, and the **Nuclear Non-Proliferation Treaty (1968)**, under which states that tested before 1967 kept their weapons and others gave up the option. India has not signed the NPT and calls it discriminatory.\n- **Confidence building:** sharing military information (exercises, deployments) to avoid surprise and mistaken war.',
      terms: [
        ['Disarmament', 'Agreement to give up or destroy a whole kind of weapon.'],
        ['Arms control', 'Agreement to limit or regulate weapons without abolishing them.'],
        ['Confidence building', 'Exchange of military information between rivals to prevent misunderstanding.'],
      ],
      v: vTimeline,
      vs: [vCoop, vInternal],
    },
    {
      h: '3. Non-traditional security: human and global',
      t: 2,
      b: '**Non-traditional security** widens **whose** security counts (people, humanity) and **which** threats count (beyond the military).\n\n**Human security** protects **individuals**. One reason for the idea: in many cases governments have harmed their own citizens.\n- **Narrow concept:** protection mainly from **violence**.\n- **Broad concept:** also **freedom from want**: hunger, disease, natural disasters.\nBoth camps agree people come first; they differ on the list of threats.\n\n**Global security:** threats such as **global warming, international terrorism and epidemics** that cross borders and that no country can tackle alone.',
      terms: [
        ['Human security', 'Security of individual people rather than of the state alone.'],
        ['Global security', 'Security against threats that affect the whole world and need joint action.'],
      ],
      v: vHuman,
      vs: [vTradNon, vGlobal],
    },
    {
      h: '4. New threats: terrorism, human rights and poverty',
      t: 3,
      b: '**Terrorism:** political violence deliberately aimed at **civilians** to create fear and force political change; often by **non-state** groups working across borders.\n\n**Human rights:** three categories: **political**; **economic and social**; **rights of colonised peoples and ethnic and indigenous minorities**. The debate on **humanitarian intervention** weighs protecting people against **sovereignty** and the risk of **selective** action by powerful states.\n\n**Global poverty:** the gap between rich and poor regions and rapid population growth in some poor countries feed hunger, conflict and migration, with effects across borders.',
      terms: [
        ['Terrorism', 'Political violence that targets civilians on purpose to spread fear.'],
        ['Humanitarian intervention', 'Action by outside powers inside a country to stop grave abuse of its people.'],
      ],
      v: vTerror,
      vs: [vRights, vIntervene, vPoverty],
    },
    {
      h: '5. Migration and health epidemics',
      t: 3,
      b: '**Refugees** flee war, persecution or disaster **across an international border**. **Internally displaced persons** are uprooted but **stay inside** their country. Both face hunger, illness and lack of protection; host areas face strain on services and prices.\n\n**Epidemics** (HIV/AIDS, and later outbreaks and pandemics) spread through **travel, trade and migration**, overload health systems and disrupt economies. Border closures alone are not enough; shared data, research and health aid are needed.',
      terms: [
        ['Refugee', 'A person forced to flee who has crossed an international border.'],
        ['Internally displaced person', 'A person forced to flee who remains within their own country.'],
      ],
      v: vBorder,
      vs: [vEpidemic],
    },
    {
      h: '6. Cooperative security and India\'s security strategy',
      t: 4,
      b: '**Cooperative security:** joint action against non-traditional threats at **bilateral, regional, continental or global** levels, involving states, **international organisations**, **NGOs**, businesses and prominent individuals. **Force** may be used only as a **last resort**, preferably with collective approval (e.g. against terrorists or mass abuse).\n\n**India\'s security strategy (four components):**\n1. **Military capabilities:** conflicts with neighbours and a nuclear-armed neighbourhood; nuclear tests in **1974** and **1998**; a stated policy of **credible minimum deterrence** and **no first use**.\n2. **International norms and institutions:** universal, non-discriminatory disarmament, decolonisation, a fairer world order, the **UN** system.\n3. **Internal security challenges:** handled through **democratic** and constitutional means, such as dialogue and protection of minority rights.\n4. **Economic development:** reducing poverty, inequality and deprivation.',
      terms: [
        ['Cooperative security', 'Security achieved through joint action of many states and other actors, with force as a last resort.'],
        ['No first use', 'A pledge not to be the first to use nuclear weapons in a conflict.'],
      ],
      v: vPillars,
      vs: [vCoopLevels],
    },
  ],
  tips: '**Common mistakes**\n- Swapping **deterrence** (before war) and **defence** (once war begins).\n- Calling the NPT or ABM Treaty **disarmament**: they are **arms control**.\n- Calling people who flee within their own country **refugees**: they are **internally displaced persons**.\n- Listing only two categories of human rights.\n- Giving personal opinions on current conflicts. Stick to concepts and agreed facts.\n\n**How marks are usually awarded**\n- 1 mark: one correct option.\n- 2 marks: two points, or a definition with an example (30–50 words).\n- 3 marks: three distinct points (50–80 words).\n- 5 marks: five headed points (80–120 words); evaluation questions need both sides and a conclusion.\n- Source questions (4 marks): quote, name, explain; part (c) has an internal choice.\n\n**Sources in SOYL practice** are imagined documents written for practice; your board paper will give its own.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['What is **security**?', 'Freedom from **grave threats** to the core values of a country or people.', 'definition', 1],
  ['Why only **grave** threats?', 'If every problem were a security issue, the idea would become too wide to be useful.', 'concept', 1],
  ['Traditional view: whose security?', 'The **state**; the gravest threat is **military attack**.', 'concept', 1],
  ['Three choices facing a threatened government', 'Surrender; **deter** the attack; **defend** once war begins.', 'concept', 1],
  ['**Deterrence**', 'Preventing war by making an attack too costly.', 'definition', 1],
  ['**Defence**', 'Limiting or ending a war that has already begun.', 'definition', 1],
  ['**Balance of power**', 'Watching relative strength and building up when a rival grows much stronger.', 'definition', 1],
  ['Why are alliances temporary?', 'They rest on **national interest**, which changes.', 'concept', 1],
  ['Internal security after 1945', 'A major concern for many new states facing neighbours **and** separatist movements.', 'fact', 1],
  ['**Disarmament** vs **arms control**', 'Disarmament **abolishes** a weapon type; arms control **regulates** weapons.', 'concept', 1],
  ['Year of the **NPT**', '**1968**; an arms-control treaty.', 'fact', 1],
  ['Agreements of **1972**', 'Biological Weapons Convention; Anti-Ballistic Missile Treaty (USA–USSR).', 'fact', 1],
  ['Year of the **Chemical Weapons Convention**', '**1992**.', 'fact', 1],
  ['**Confidence building**', 'Rivals share military information to avoid mistaken war.', 'definition', 1],
  ['Why has India not signed the NPT?', 'It sees the treaty as **discriminatory**: some states may keep nuclear weapons, others may not.', 'fact', 1],
  ['**Human security**', 'Security of **individuals**, not only of states.', 'definition', 2],
  ['Narrow vs broad human security', 'Narrow: freedom from **violence**. Broad: also freedom from **want** (hunger, disease, disasters).', 'concept', 2],
  ['**Global security**', 'Protection from cross-border threats such as global warming, terrorism and epidemics.', 'definition', 2],
  ['**Terrorism**', 'Political violence deliberately aimed at **civilians** to create fear.', 'definition', 3],
  ['Three categories of human rights', 'Political; economic and social; rights of colonised peoples and minorities.', 'concept', 3],
  ['Humanitarian intervention: the main concern', 'It may override sovereignty and be used **selectively** by powerful states.', 'concept', 3],
  ['Why is global poverty a security issue?', 'It feeds conflict, hunger, migration and disease that cross borders.', 'concept', 3],
  ['**Refugee**', 'A person forced to flee who **crosses an international border**.', 'definition', 3],
  ['**Internally displaced person**', 'A person forced to flee who **stays inside** their own country.', 'definition', 3],
  ['Why are epidemics a security threat?', 'They spread through travel and trade, overload health systems and disrupt economies.', 'concept', 3],
  ['**Cooperative security**', 'Joint action by states and other actors, at many levels; force only as a **last resort**.', 'definition', 4],
  ['Non-state actors in cooperative security', 'International organisations, NGOs, businesses, prominent individuals.', 'example', 4],
  ['India\'s nuclear tests', '**1974** and **1998**.', 'fact', 4],
  ['Four components of India\'s security strategy', 'Military capability; international norms and institutions; internal challenges handled democratically; economic development.', 'concept', 4],
  ['India\'s stated nuclear doctrine', '**Credible minimum deterrence** and **no first use**.', 'fact', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-political-science-chapter-test-short',
  title: 'Chapter test (short) — Security in the Contemporary World',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_deterrence', 'm_terror_def', 'm_coop_why', 'ar_choices'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_deter_defence', 's_refugee_idp', 's3_india_strategy'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_traditional', 'l_new_threats'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks)', instr: 'Read the source and answer all parts. Part (c) has an internal choice.', items: ['sb_relief'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-political-science-chapter-test-long',
  title: 'Chapter test (long) — Security in the Contemporary World',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_bop', 'm_new_states', 'm_npt', 'm_freedom_want', 'm_refugee', 'm_intervention', 'm_india_norms', 'm_nfu', 'ar_npt', 'ar_poverty_conflict'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_human_vs_trad', 's_coop_levels', { attempt: 1, keys: ['s_alliances', 's_rights_categories'] }, 's3_terror_threat', { attempt: 1, keys: ['s3_migration', 's3_coop_vs_trad'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_india_strategy', { attempt: 1, keys: ['l_rights_intervention', 'l_coop_security'] }] },
    { id: 'D', title: 'Section D — Source-based (4 marks each)', instr: 'Read each source and answer all parts. Part (c) of each has an internal choice.', items: ['sb_minister', 'sb_whitepaper'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 of cbse-12-political-science-ch05 only (traditional security external and internal; non-traditional: human and global; new sources of threat; cooperative security and India\'s strategy)',
    originality: 'every source, country, speaker and scenario is imagined and written by SOYL (labelled); no NCERT text, cartoon, box or exercise and no board or sample-paper item reused (D-036); no quotation of any real person',
    facts: `treaty years ${TREATIES.map(([y, n]) => `${n} ${y}`).join(', ')}, CWC 1992; India's nuclear tests 1974 and 1998; credible minimum deterrence and no first use; India outside the NPT; nothing after 2024 stated`,
    neutrality: 'humanitarian intervention and military strategy presented with arguments on both sides; no opinion on any current conflict',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
