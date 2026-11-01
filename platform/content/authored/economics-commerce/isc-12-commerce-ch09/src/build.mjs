// Build ISC 12 Commerce ch09 Organising. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-commerce-ch09/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('isc-12-commerce-ch09', 'economics-commerce');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- visuals
const vRoute1 = flow('LR', ['What organising is', 'Its steps', 'Why it matters', 'Functional and divisional structures'], 'Route map of Part 1: the meaning of organising, its steps, its importance, and functional and divisional structures', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Formal and informal organisation', 'Delegation', 'Centralisation and decentralisation'], 'Route map of Part 2: formal and informal organisation, delegation of authority, and centralisation and decentralisation', 'Part 2 at a glance');

const vOrgQs = table(
  ['Organising answers…', 'Imagined example: a fruit canner in Haldwani'],
  [['What work must be done?', 'Washing, cooking, canning, labelling, selling'], ['How is it grouped?', 'Production and Marketing units'], ['Who does each job?', 'A food scientist heads Quality'], ['Who reports to whom?', 'Line leaders to shift supervisor to works manager']],
  'Table of the four questions organising answers, with an imagined fruit canner\'s answers',
);
const vSteps = flow('LR', ['Identify and divide the work', 'Departmentalise', 'Assign duties', 'Establish reporting relationships'], 'Flow of the four steps of organising: identify and divide the work, departmentalise, assign duties, and establish reporting relationships', 'Four steps, in order.');
const vStepsEx = table(
  ['Action for an imagined food stall at a college fest in Kolkata', 'Step'],
  [
    ['List jobs: buying, cooking, serving, billing, cleaning', 'Identify and divide the work'],
    ['Group them into kitchen and counter teams', 'Departmentalise'],
    ['Put the best cook in the kitchen and a quick counter in billing', 'Assign duties'],
    ['Team leads report to the stall captain', 'Establish reporting relationships'],
  ],
  'Worked table: four actions for an imagined college food stall matched to the four steps of organising',
  'Each action answers one step, in order.',
);
const vImportance = table(
  ['Importance', 'In short'],
  [
    ['Benefits of specialisation', 'People repeat one kind of job and get better at it'],
    ['Clarity in working relationships', 'Everyone knows whom to report to'],
    ['Optimum use of resources', 'No duplication; no task left undone'],
    ['Adaptation to change', 'Structure can be adjusted for new needs'],
    ['Effective administration', 'Clear roles make control and coordination easier'],
    ['Development of personnel', 'Delegation lets people learn and grow'],
    ['Expansion and growth', 'New units fit into a clear structure'],
  ],
  'Table of seven points of importance of organising with a short explanation of each',
);
const chartBox = (s, cx, cy, w, label, o = {}) => { s.rect(cx - w / 2, cy - 18, w, 36, { fill: o.fill ?? 'fill', fillOpacity: o.fill ? 0.15 : undefined, color: o.color, sw: 1.5, rx: 6 }); s.text(cx, cy, label, { size: 13, bold: o.bold }); };
const vFunctional = (() => {
  const s = new Svg(560, 230);
  chartBox(s, 280, 34, 180, 'Managing director', { bold: true });
  const xs = [80, 213, 347, 480];
  s.line(280, 52, 280, 90, { sw: 1.5 }).line(xs[0], 90, xs[3], 90, { sw: 1.5 });
  ['Purchase', 'Production', 'Finance', 'Sales'].forEach((d, i) => { s.line(xs[i], 90, xs[i], 112, { sw: 1.5 }); chartBox(s, xs[i], 130, 120, d, { fill: 'blue', color: 'blue' }); });
  s.text(280, 182, 'One main product; work grouped by function', { size: 12 });
  s.text(280, 206, 'Imagined sago mill', { size: 12, muted: true });
  return s.visual('Functional structure chart of an imagined sago mill: the managing director at the top, with four departments below: purchase, production, finance and sales. Work is grouped by function for one main product', 'Functional structure: departments by function.');
})();
const vDivisional = (() => {
  const s = new Svg(560, 250);
  chartBox(s, 280, 34, 180, 'Chief executive', { bold: true });
  const xs = [95, 280, 465];
  s.line(280, 52, 280, 90, { sw: 1.5 }).line(xs[0], 90, xs[2], 90, { sw: 1.5 });
  ['Dairy division', 'Furniture division', 'Travel-bag division'].forEach((d, i) => {
    s.line(xs[i], 90, xs[i], 112, { sw: 1.5 });
    chartBox(s, xs[i], 130, 160, d, { fill: 'green', color: 'green' });
    s.text(xs[i], 166, 'own production,', { size: 11, muted: true }).text(xs[i], 182, 'sales and accounts', { size: 11, muted: true });
  });
  s.text(280, 216, 'Several product lines; each division is a profit centre', { size: 12 });
  s.text(280, 238, 'Imagined group in Navsari', { size: 12, muted: true });
  return s.visual('Divisional structure chart of an imagined group: the chief executive at the top, with three divisions below for dairy, furniture and travel bags, each with its own production, sales and accounts and treated as a profit centre', 'Divisional structure: divisions by product.');
})();
const vStructCompare = table(
  ['Basis', 'Functional', 'Divisional'],
  [
    ['Grouping', 'By function', 'By product line'],
    ['Suits', 'One main product', 'Several different products'],
    ['Specialisation', 'Functional', 'Product; all-round managers'],
    ['Cost', 'Economical', 'Costlier: functions duplicated'],
    ['Accountability', 'Hard to fix for results', 'Each division answers for profit'],
    ['Main risk', 'Conflict between departments', 'Divisions compete for funds'],
  ],
  'Table comparing functional and divisional structures on grouping, suitability, specialisation, cost, accountability and main risk',
);
const vStructEx = table(
  ['Imagined firm', 'Structure', 'Why'],
  [['A mill making only sago on a large scale', 'Functional', 'One product; specialists per function'], ['A group making dairy, furniture and bags', 'Divisional', 'Very different products and markets'], ['A rice mill that adds cattle feed and furniture', 'Divisional', 'New lines need their own units']],
  'Worked table recommending a functional or divisional structure for three imagined firms, with reasons',
  'Ask: one product, or several very different ones?',
);
const vSummary1 = table(
  ['Idea', 'Key point'],
  [['Organising', 'Grouping work, assigning it and fixing reporting lines'], ['Steps', 'Divide work, departmentalise, assign, report'], ['Importance', 'Specialisation, clarity, resources, change, administration, people, growth'], ['Structures', 'Functional for one product; divisional for several']],
  'Summary table of Part 1: meaning, steps and importance of organising, and the two structures',
);
const vCaseSteps = flow('LR', ['Quote the line', 'Name the concept', 'Explain the link'], 'Three steps for case questions: quote the line, name the concept, and explain the link');

const vFormal = table(
  ['Formal organisation', 'Points'],
  [['Meaning', 'Structure of jobs and authority deliberately designed by management'], ['Features', 'Written duties; official chart; follows the scalar chain'], ['Merits', 'Easy to fix responsibility; avoids duplication; gives stability'], ['Limits', 'Delays; ignores social needs; discourages initiative']],
  'Table of the meaning, features, merits and limits of formal organisation',
);
const vInformal = table(
  ['Informal organisation', 'Points'],
  [['Meaning', 'Network of relationships that grows from social interaction'], ['Features', 'Not planned; not on the chart; communicates through the grapevine'], ['Merits', 'Fast communication; meets social needs; fills gaps in rules'], ['Limits', 'Rumours; may resist change; group pressure']],
  'Table of the meaning, features, merits and limits of informal organisation',
);
const vFormInf = table(
  ['Basis', 'Formal', 'Informal'],
  [['Origin', 'Created by management', 'Arises on its own'], ['Purpose', 'Organisational goals', 'Social and personal needs'], ['Communication', 'Through the scalar chain', 'In any direction: grapevine'], ['Shown on chart?', 'Yes', 'No'], ['Nature', 'Stable and rigid', 'Flexible and changing']],
  'Table comparing formal and informal organisation on origin, purpose, communication, whether shown on the chart, and nature',
);
const vFormInfEx = table(
  ['Imagined fact at an engineering works in Bokaro', 'Formal or informal?'],
  [['Written job description for every post', 'Formal'], ['Fitters who share a bus swap machine tips', 'Informal'], ['Tool requests go through supervisor and shop manager', 'Formal'], ['News of a bonus spreads in an hour', 'Informal: grapevine']],
  'Worked table classifying four imagined facts at an engineering works as formal or informal organisation',
  'Ask: was it designed by management, or did it grow on its own?',
);
const vElements = table(
  ['Element', 'Meaning', 'Direction', 'Can it be delegated?'],
  [['Responsibility', 'Obligation to do the task well', 'Upward', 'Assigned with the task'], ['Authority', 'Right to decide and command', 'Downward', 'Yes'], ['Accountability', 'Answerability for results', 'Upward', 'No']],
  'Table of the three elements of delegation, responsibility, authority and accountability, with meaning, direction and whether each can be delegated',
);
const vDelegImp = table(
  ['Importance of delegation', 'Imagined example'],
  [['Effective management', 'An owner hands over daily ice orders and meets export buyers'], ['Employee development', 'A cashier learns to approve refunds'], ['Motivation', 'Trusted supervisors feel valued'], ['Better coordination', 'Clear authority shows who handles what'], ['Basis for growth', 'New managers are ready when outlets open']],
  'Table of five points of importance of delegation, each with an imagined example',
);
const vCentral = table(
  ['Basis', 'Centralisation', 'Decentralisation'],
  [['Where decisions are taken', 'Kept at the top', 'Spread to lower levels'], ['Speed', 'Slow in a large firm', 'Quick local decisions'], ['Suits', 'Small firms; key policy matters', 'Large, spread-out firms'], ['Managers below', 'Little chance to learn', 'Develop decision skills']],
  'Table comparing centralisation and decentralisation on where decisions are taken, speed, suitability and effect on managers below',
);
const vDelDec = table(
  ['Basis', 'Delegation', 'Decentralisation'],
  [['Nature', 'Compulsory', 'Optional policy decision'], ['Scope', 'Between a superior and a subordinate', 'Across all levels'], ['Purpose', 'To lighten one manager\'s load', 'To give more freedom to lower levels'], ['Freedom', 'Under the superior\'s close control', 'More freedom within limits']],
  'Table comparing delegation and decentralisation on nature, scope, purpose and freedom',
);
const vWhoEx = table(
  ['Imagined fact at a turmeric trader in Erode', 'Concept'],
  [['Owner alone decided prices and hiring, before depots', 'Centralisation'], ['Depots fix buying prices within limits', 'Decentralisation'], ['A supervisor lets a clerk sign delivery notes', 'Delegation'], ['Head office keeps export pricing and loans', 'Key decisions kept central']],
  'Worked table matching four imagined facts at a turmeric trader with centralisation, decentralisation, delegation, and key decisions kept central',
  'Ask: who decides, and at how many levels?',
);
const vSummary2 = table(
  ['Idea', 'Key point'],
  [['Formal vs informal', 'Designed by management vs grows on its own'], ['Delegation', 'Responsibility, authority, accountability'], ['Accountability', 'Never delegated; flows upward'], ['Centralisation vs decentralisation', 'Decisions at the top vs spread across levels; balance is best']],
  'Summary table of Part 2: formal and informal organisation, elements of delegation, accountability, and centralisation versus decentralisation',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Organising — Part 1: Meaning, Steps, Importance and Structures',
  goals: [
    'Explain the steps of the organising process and its importance',
    'Recommend a functional or divisional structure for a given business and justify the choice',
  ],
  slides: [
    sl('title', 'Organising', {
      b: 'Part 1: what **organising** is, its **steps**, why it **matters**, and the **functional** and **divisional** structures.',
      v: vRoute1,
      n: 'A plan says what a firm wants to do. Organising decides who will do which part of the work, with what resources, and who will report to whom. In this part we learn the steps of organising, why it matters, and the two common ways of arranging a firm: by function or by product.',
    }),
    sl('concept', 'What is organising?', {
      b: '**Organising** is identifying and grouping the work, assigning it, and setting up authority and reporting relationships so that plans can be carried out.',
      v: vOrgQs,
      n: 'Organising answers four questions. What work must be done? How should it be grouped? Who should do each job? And who reports to whom? Once these are settled, the plan can be turned into action, because everyone knows their task and their place.',
    }),
    sl('diagram', 'Steps in organising', {
      b: 'Organising follows **four steps**.',
      v: vSteps,
      n: 'First, identify the total work and divide it into jobs. Second, group similar jobs into departments, which is called departmentalisation. Third, assign each job to a person suited to it. Fourth, establish reporting relationships, so that everyone knows whose orders to follow and to whom they answer.',
    }),
    sl('example', 'Worked example 1: a college food stall', {
      b: 'Students in Kolkata organise a food stall at their college fest.',
      bl: ['Step 1: read each action.', 'Step 2: match it to a **step of organising**.', 'Step 3: check the order.'],
      v: vStepsEx,
      n: 'Listing buying, cooking, serving, billing and cleaning divides the work. Grouping these into kitchen and counter teams is departmentalisation. Putting the best cook in the kitchen assigns duties. Making team leads report to the stall captain establishes reporting relationships.',
    }),
    sl('check', 'Quick check: the right person', {
      b: 'A fruit canner appoints a food scientist with laboratory experience to head its new Quality department. Which step of organising is this?',
      chk: 'm_assign',
      n: 'Is this grouping work, or giving it to someone?',
    }),
    sl('concept', 'Why organising matters', {
      v: vImportance,
      n: 'Organising brings seven benefits. People specialise and improve. Working relationships become clear. Resources are used fully, without duplication. The firm can adapt to change. Administration becomes effective. People develop through delegation. And the firm can expand, because new units fit into a clear structure.',
    }),
    sl('check', 'Quick check: is reporting part of it?', {
      b: 'True or false: organising is complete once jobs are grouped into departments; deciding who reports to whom is not part of it.',
      chk: 'tf_org',
      n: 'Count the steps of organising.',
    }),
    sl('diagram', 'Functional structure', {
      b: 'A **functional structure** groups activities by **major function**.',
      v: vFunctional,
      n: 'In a functional structure, activities are grouped by function, such as purchase, production, finance and sales, each under a specialist. It suits a large firm with one main product. Its strengths are specialisation and economy. Its weakness is that departments may chase their own goals and clash with each other.',
    }),
    sl('diagram', 'Divisional structure', {
      b: 'A **divisional structure** groups activities by **product line**.',
      v: vDivisional,
      n: 'In a divisional structure, each product line becomes a division with its own production, sales and accounts. It suits a firm with several very different products. Each division can be judged on its own profit, and its head gains all-round skills. But functions are duplicated, so it costs more.',
    }),
    sl('two-column', 'Functional or divisional?', {
      cols: ['**Functional**\n\nOne main product; specialists by function; economical.', '**Divisional**\n\nSeveral products; a profit centre for each; costlier.'],
      v: vStructCompare,
      n: 'To compare them, look at grouping, suitability, specialisation, cost and accountability. Functional groups by function, suits one product, and is economical, but results are hard to pin on anyone. Divisional groups by product, suits many products, and makes each division answer for its profit, but it duplicates functions.',
    }),
    sl('example', 'Worked example 2: which structure?', {
      b: 'Recommend a structure for three imagined firms.',
      bl: ['Step 1: ask **one product or several?**', 'Step 2: check whether products need **different methods and markets**.', 'Step 3: recommend and give a reason.'],
      v: vStructEx,
      n: 'A mill that makes only sago on a large scale should be functional: one product, with specialists for each function. A group making dairy, furniture and bags should be divisional, because its products are very different. A rice mill that adds cattle feed and furniture should also move to divisions.',
    }),
    sl('check', 'Quick check: an analogy', {
      b: 'Complete the analogy: purchase, production and sales departments are to functional structure as dairy, furniture and travel-bag units are to ___ structure.',
      chk: 'fb_struct',
      n: 'Are these units built around functions, or around products?',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. Organising groups work, assigns it and fixes reporting lines. Its four steps are dividing work, departmentalising, assigning duties and establishing reporting relationships. It brings specialisation, clarity and growth. A functional structure suits one main product; a divisional structure suits several different products.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Learn the **four steps in order**.', 'For structure questions, ask **one product or several**.', 'Duplication is a limit of **divisional**; inter-department conflict is a limit of **functional**.', 'Always give a **reason** with a recommendation.'],
      v: vCaseSteps,
      n: 'A few tips. Learn the four steps in order. When recommending a structure, first ask whether the firm has one product or several. Remember that duplication belongs to the divisional structure and conflict between departments to the functional one. And always back a recommendation with a reason.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Organising — Part 2: Formal and Informal Organisation, Delegation and Decentralisation',
  goals: [
    'Distinguish formal from informal organisation and explain how each affects work',
    'Explain the elements of delegation and its importance',
    'Compare centralisation and decentralisation, and distinguish delegation from decentralisation',
  ],
  slides: [
    sl('title', 'Formal, Informal, Delegation and Decentralisation', {
      b: 'Part 2: **formal** and **informal** organisation, **delegation** of authority, and **centralisation** and **decentralisation**.',
      v: vRoute2,
      n: 'Every firm has two organisations: the one on the chart and the one that grows among people. In this part we compare them, then see how managers pass authority down through delegation, and how far a firm should spread decision making through decentralisation.',
    }),
    sl('concept', 'Formal organisation', {
      b: '**Formal organisation** is the structure of jobs and authority deliberately designed by management.',
      v: vFormal,
      n: 'Formal organisation is the planned structure. It has written duties, an official chart, and communication through the scalar chain. It makes responsibility easy to fix, avoids duplication and gives stability. But it can be slow, it ignores people\'s social needs, and it may discourage initiative.',
    }),
    sl('concept', 'Informal organisation', {
      b: '**Informal organisation** is the network of relationships that grows naturally from social interaction at work.',
      v: vInformal,
      n: 'Informal organisation grows on its own, from friendships and shared interests. It does not appear on any chart, and news travels through the grapevine. It is fast, it meets social needs and it fills gaps in the rules. But it can spread rumours, resist change and press members to conform.',
    }),
    sl('two-column', 'Formal versus informal', {
      cols: ['**Formal**\n\nDesigned by management; on the chart; scalar chain.', '**Informal**\n\nGrows on its own; not on the chart; grapevine.'],
      v: vFormInf,
      n: 'Compare the two on origin, purpose and communication. Formal organisation is created by management for organisational goals and works through the scalar chain. Informal organisation arises on its own to meet social needs, and its communication runs in any direction. Wise managers use both.',
    }),
    sl('check', 'Quick check: an analogy', {
      b: 'Complete the analogy: the official chart of positions is to formal organisation as friendship groups that grow on their own are to ___ organisation.',
      chk: 'fb_informal',
      n: 'Was the friendship group designed by management?',
    }),
    sl('example', 'Worked example 1: formal or informal?', {
      b: 'Sort four imagined facts from an engineering works in Bokaro.',
      bl: ['Step 1: ask whether it was **designed by management**.', 'Step 2: if not, it is **informal**.', 'Step 3: name any special feature, such as the grapevine.'],
      v: vFormInfEx,
      n: 'Written job descriptions are designed by management, so they are formal. Fitters who swap tips on the bus form an informal group. Tool requests that pass through the supervisor follow the formal chain. A bonus rumour spreading in an hour is the grapevine, which is informal.',
    }),
    sl('concept', 'Delegation and its three elements', {
      b: '**Delegation** is passing authority to a subordinate to carry out a task, while the manager remains answerable for the result.',
      v: vElements,
      n: 'Delegation has three elements. Responsibility is the subordinate\'s duty to do the task well. Authority is the right to decide and give orders, and it flows downward. Accountability is being answerable for the result. It flows upward, and it cannot be delegated: the manager still answers to her own boss.',
    }),
    sl('concept', 'Why delegate?', {
      v: vDelegImp,
      n: 'Delegation frees managers from routine work so they can focus on important matters. It develops employees by giving them real decisions. It motivates them, because being trusted feels good. It improves coordination, since everyone knows who handles what. And it prepares managers for growth.',
    }),
    sl('check', 'Quick check: which way it flows', {
      b: 'True or false: authority flows downward from superior to subordinate, while accountability flows upward.',
      chk: 'tf_deleg',
      n: 'Who gives the right to decide, and who answers for the result?',
    }),
    sl('two-column', 'Centralisation and decentralisation', {
      cols: ['**Centralisation**\n\nDecisions kept at the top.', '**Decentralisation**\n\nAuthority spread systematically to all levels, within limits.'],
      v: vCentral,
      n: 'Centralisation keeps decision making at the top. It suits small firms and key policy matters, but it slows a large firm down. Decentralisation spreads authority to lower levels, allowing quick local decisions and developing managers. No firm is fully one or the other; the best is a balance that suits its size and spread.',
    }),
    sl('concept', 'Delegation versus decentralisation', {
      v: vDelDec,
      n: 'Delegation and decentralisation are linked but different. Delegation is compulsory, because no manager can do everything alone, and it happens between a superior and a subordinate. Decentralisation is an optional policy of top management that spreads authority across all levels. It is delegation extended throughout the organisation.',
    }),
    sl('example', 'Worked example 2: who decides?', {
      b: 'Four imagined facts from a turmeric trader in Erode.',
      bl: ['Step 1: ask **who** decides.', 'Step 2: ask **at how many levels**.', 'Step 3: name the concept.'],
      v: vWhoEx,
      n: 'When the owner alone decided prices and hiring, that was centralisation. Now that depots fix buying prices within limits, authority is decentralised. A supervisor letting a clerk sign delivery notes is delegation. Keeping export pricing and loans at head office shows that key decisions stay central, giving a balance.',
    }),
    sl('check', 'Quick check: four depots', {
      b: 'Each regional depot fixes its own buying prices and hires its own loaders, within limits set by head office. What does this show?',
      chk: 'm_decentral',
      n: 'Is authority kept at the top, or spread across levels?',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. Formal organisation is designed by management; informal organisation grows on its own, and both affect work. Delegation passes responsibility and authority down, while accountability stays with the manager. Centralisation keeps decisions at the top; decentralisation spreads them. A balance usually works best.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['**Accountability cannot be delegated**; say so whenever delegation appears.', 'Delegation is **compulsory**; decentralisation is **optional**.', 'Grapevine and rumours point to **informal** organisation.', 'For centralisation questions, end with a **balanced verdict**.'],
      v: vCaseSteps,
      n: 'Final tips. Whenever delegation appears, mention that accountability cannot be delegated. Remember that delegation is compulsory while decentralisation is optional. Rumours and the grapevine signal informal organisation. And in centralisation questions, end with a balanced verdict on what to keep at the top.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Organising — notes',
  sections: [
    {
      h: '1. Organising: meaning, steps and importance',
      t: 1,
      b: '**Organising** is the process of identifying and grouping the work to be done, assigning it to people, and establishing authority and reporting relationships so that plans can be carried out.\n\n**Steps:**\n1. **Identification and division of work** — list the total work and split it into jobs.\n2. **Departmentalisation** — group similar or related jobs into departments.\n3. **Assignment of duties** — give each job to a person suited to it.\n4. **Establishing reporting relationships** — decide who reports to whom.\n\n**Importance:** benefits of specialisation; clarity in working relationships; optimum use of resources; adaptation to change; effective administration; development of personnel; expansion and growth.',
      terms: [['Organising', 'Grouping work, assigning it and fixing authority and reporting lines.'], ['Departmentalisation', 'Grouping similar jobs into departments.']],
      v: vSteps,
      vs: [vOrgQs, vStepsEx, vImportance],
    },
    {
      h: '2. Functional and divisional structures',
      t: 2,
      b: '**Functional structure:** activities grouped by major function (purchase, production, finance, sales), each under a specialist. **Suits** a large firm with one main product. **Merits:** specialisation; economy, since functions are not duplicated; easy control within each function. **Demerits:** departments may put their own goals first and conflict; it is hard to fix responsibility for overall results; it gives managers narrow experience.\n\n**Divisional structure:** activities grouped by product line, each division having its own functions. **Suits** a firm with several different products. **Merits:** each division is a profit centre, so results are measurable; division heads gain all-round skills; new products can be added easily. **Demerits:** duplication of resources raises cost; divisions may compete for funds.',
      terms: [['Functional structure', 'Grouping by major function.'], ['Divisional structure', 'Grouping by product line, each division with its own functions.'], ['Profit centre', 'A unit whose own profit can be measured.']],
      v: vFunctional,
      vs: [vDivisional, vStructCompare, vStructEx],
    },
    {
      h: '3. Formal and informal organisation',
      t: 3,
      b: '**Formal organisation:** the structure deliberately designed by management, with written duties, an official chart and communication through the scalar chain. **Merits:** responsibility is easy to fix; duplication is avoided; it gives stability. **Limits:** delays; it ignores social needs; it may discourage initiative.\n\n**Informal organisation:** the network of relationships that arises from social interaction, not planned by management and not on the chart; communication flows through the **grapevine**. **Merits:** fast communication; meets social needs; fills gaps in the formal system; managers can sense feelings. **Limits:** rumours; resistance to change; pressure to conform.',
      terms: [['Grapevine', 'Informal communication passing quickly from person to person in any direction.']],
      v: vFormal,
      vs: [vInformal, vFormInf, vFormInfEx],
    },
    {
      h: '4. Delegation of authority',
      t: 4,
      b: '**Delegation** is the passing of authority by a superior to a subordinate to carry out an assigned task, while the superior stays answerable for the result.\n\n**Elements:**\n- **Responsibility** — the subordinate\'s obligation to do the task properly; it arises from the superior–subordinate relationship.\n- **Authority** — the right to take decisions and give orders; it flows downward and should match responsibility.\n- **Accountability** — answerability for the result; it flows upward and **cannot be delegated**.\n\n**Importance:** effective management (managers are freed for important work); employee development; motivation; better coordination; a basis for growth and for the management hierarchy.',
      terms: [['Authority', 'The right to decide and command.'], ['Responsibility', 'The obligation to perform an assigned task.'], ['Accountability', 'Answerability for results; never delegated.']],
      v: vElements,
      vs: [vDelegImp],
    },
    {
      h: '5. Centralisation and decentralisation',
      t: 5,
      b: '**Centralisation:** decision-making authority is kept at the top. Suits small firms and key policy matters; slows decisions in large firms; gives lower managers little chance to learn.\n\n**Decentralisation:** authority is spread systematically to lower levels, within limits. **Merits:** quick local decisions; develops managers; relieves top management; allows better control through measurable units. Complete decentralisation is not desirable: key decisions such as overall policy and finance stay central. A **balance** is best.\n\n**Delegation vs decentralisation:** delegation is compulsory, narrow (superior to subordinate) and done to lighten a manager\'s load; decentralisation is an optional policy, wide (all levels) and done to give lower levels more freedom. Decentralisation is delegation extended throughout the organisation.',
      terms: [['Centralisation', 'Keeping decision making at the top.'], ['Decentralisation', 'Systematically spreading authority to all levels.']],
      v: vCentral,
      vs: [vDelDec, vWhoEx],
    },
  ],
  tips: '**Common mistakes**\n- Saying accountability can be delegated.\n- Calling decentralisation compulsory.\n- Listing duplication as a limit of the functional structure (it belongs to the divisional one).\n- Treating informal organisation as always harmful.\n\n**How marks are usually awarded**\n- 1 mark: the correct step, structure, element or concept.\n- 2–3 marks: each point named, explained and linked to the case.\n- 5 marks: steps in order with examples; differences on clear bases; a recommendation with reasons.\n- Case questions: quote the line, name the concept, explain the link.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Organising**', 'Grouping work, assigning it and fixing reporting lines.', 'definition', 1],
  ['Four steps of organising', 'Divide work → departmentalise → assign duties → establish reporting relationships.', 'exam-tip', 1],
  ['**Departmentalisation**', 'Grouping similar jobs into departments.', 'definition', 1],
  ['Seven points of importance of organising', 'Specialisation, clarity, resources, change, administration, personnel, growth.', 'exam-tip', 1],
  ['**Functional structure**', 'Activities grouped by major function.', 'definition', 2],
  ['**Divisional structure**', 'Activities grouped by product line.', 'definition', 2],
  ['One main product → ?', 'Functional structure.', 'exam-tip', 2],
  ['Several different products → ?', 'Divisional structure.', 'exam-tip', 2],
  ['Main limit of functional', 'Departments chase their own goals and conflict.', 'fact', 2],
  ['Main limit of divisional', 'Duplication of resources raises cost.', 'fact', 2],
  ['Which structure builds all-round managers?', 'Divisional.', 'fact', 2],
  ['**Formal organisation**', 'Structure deliberately designed by management.', 'definition', 3],
  ['**Informal organisation**', 'Network of relationships that grows from social interaction.', 'definition', 3],
  ['**Grapevine**', 'Fast informal communication in any direction.', 'definition', 3],
  ['Merits of informal organisation', 'Fast news, social needs met, gaps filled.', 'fact', 3],
  ['Limits of informal organisation', 'Rumours, resistance to change, group pressure.', 'fact', 3],
  ['Is informal organisation on the chart?', 'No.', 'fact', 3],
  ['**Delegation**', 'Passing authority to a subordinate for a task.', 'definition', 4],
  ['**Authority**', 'Right to decide and command; flows downward.', 'definition', 4],
  ['**Responsibility**', 'Obligation to perform the task.', 'definition', 4],
  ['**Accountability**', 'Answerability for results; flows upward; never delegated.', 'definition', 4],
  ['Why delegate?', 'Frees managers, develops and motivates staff, aids coordination and growth.', 'concept', 4],
  ['**Centralisation**', 'Decisions kept at the top.', 'definition', 5],
  ['**Decentralisation**', 'Authority spread systematically to all levels.', 'definition', 5],
  ['Delegation vs decentralisation: nature', 'Compulsory vs optional policy.', 'fact', 5],
  ['Delegation vs decentralisation: scope', 'Superior to subordinate vs whole organisation.', 'fact', 5],
  ['Is complete decentralisation desirable?', 'No: key decisions must stay central.', 'concept', 5],
  ['Case routine', 'Quote the line, name the concept, explain the link.', 'exam-tip', 3],
]);

// ---------------------------------------------------------------- tests (ISC class defaults, item for item)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Organising',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A - Objective (5 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_department', 'm_divisional', 'm_grapevine', 'm_accountability', 'ar_struct'] },
    { id: 'B', title: 'Section B - Short answer (4 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s_steps2', { attempt: 1, keys: ['s_informal', 's_elements'] }] },
    { id: 'C', title: 'Section C - Short answer (6 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s3_recommend', { attempt: 1, keys: ['s3_deleg_imp', 's3_formal_informal'] }] },
    { id: 'D', title: 'Section D - Long answer (5 marks)', instr: 'Answer the question. It is set in parts.', items: ['l_decentral'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Organising',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A - Objective (12 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_first_step', 'm_reporting', 'm_functional', 'm_func_limit', 'm_div_limit', 'm_informal_merit', 'm_informal_limit', 'm_delegation', 'm_authority', 'm_central', 'ar_formal', 'ar_deleg'] },
    { id: 'B', title: 'Section B - Short answer (6 marks)', instr: 'Answer all three questions. Internal choice in the last question.', items: ['s_func', 's_deleg_dec', { attempt: 1, keys: ['s_formal_limits', 's_div'] }] },
    { id: 'C', title: 'Section C - Short answer (12 marks)', instr: 'Answer all four questions. Internal choice in the last question.', items: ['s3_importance', 's3_informal_merits', 's3_decentral', { attempt: 1, keys: ['s3_steps', 's3_central'] }] },
    { id: 'D', title: 'Section D - Long answer (10 marks)', instr: 'Answer both questions. Internal choice in the second question. Each is set in parts.', items: ['l_compare', { attempt: 1, keys: ['l_org', 'l_deleg'] }] },
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
    syllabus: 'topics t01–t05 of isc-12-commerce-ch09 (meaning, importance and steps of organising; functional and divisional structures; formal and informal organisation; delegation of authority; centralisation and decentralisation, and delegation versus decentralisation)',
    originality: 'every firm, person and case is imagined and written by SOYL and labelled; no ISC or CBSE textbook text, illustration or exercise and no CISCE specimen or board item reused (D-036); firms, people and set-ups differ from CBSE 12 Business Studies ch05',
    data: 'no computed figures; all examples are imagined and labelled',
    facts: 'stable textbook concepts only (four steps of organising, two structures, formal and informal organisation, three elements of delegation, centralisation and decentralisation)',
    gate: 'schema, pipeline lint, deterministic verify, word limits, narration and answer-leak checks run clean in this build',
  },
});
