// Build ISC 12 Commerce ch07 Principles of Management. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-commerce-ch07/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('isc-12-commerce-ch07', 'economics-commerce');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- visuals
const vRoute1 = flow('LR', ['Nature of principles', 'Why they are needed', 'Taylor\'s five principles'], 'Route map of Part 1: the nature of principles of management, why managers need them, and Taylor\'s five principles of scientific management', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Fayol\'s fourteen principles', 'Scalar chain and gang plank', 'Taylor and Fayol compared', 'Relevance today'], 'Route map of Part 2: Fayol\'s fourteen principles, the scalar chain and gang plank, a comparison of Taylor and Fayol, and their relevance today', 'Part 2 at a glance');

const vNature = table(
  ['Feature', 'What it means'],
  [
    ['Universal applicability', 'Useful in every kind of organisation'],
    ['General guidelines', 'Guide thinking; no ready-made answers'],
    ['Formed by practice and experiment', 'Grew out of managers\' experience and tests'],
    ['Flexible', 'Can be adapted to the situation'],
    ['Mainly behavioural', 'Aim to influence how people act at work'],
    ['Cause and effect', 'Show the likely result of an action'],
    ['Contingent', 'Their use depends on the conditions'],
  ],
  'Table of seven features of the nature of principles of management with their meanings',
);
const vSciMgmt = table(
  ['Basis', 'Principles of pure science', 'Principles of management'],
  [['Exactness', 'Exact', 'Not exact'], ['Subject', 'Things and forces', 'People at work'], ['Use', 'Applied word for word', 'Adapted to the situation']],
  'Table comparing principles of pure science with principles of management on exactness, subject and use',
);
const vNatureEx = table(
  ['Imagined situation', 'Feature shown'],
  [
    ['One-boss rule works on a ship and in a school canteen', 'Universal applicability'],
    ['Owner gives sales staff freedom in festivals but centralises in a crisis', 'Flexible'],
    ['Principles say what to keep in mind, not exactly what to say', 'General guidelines'],
    ['Most principles deal with how workers relate to each other', 'Mainly behavioural'],
  ],
  'Worked table matching four imagined situations with the feature of principles of management each shows',
  'Look for the clue: everywhere, adapted, only a guide, or about people.',
);
const vNeed = table(
  ['Need', 'Imagined example'],
  [
    ['Useful insights into reality', 'A new supervisor avoids mistakes others made before'],
    ['Optimum use of resources', 'A grape packer cuts idle time and damaged crates'],
    ['Scientific decisions', 'Shift plans rest on reasons, not moods'],
    ['Meeting a changing environment', 'Managers adapt quickly to new export rules'],
    ['Fulfilling social responsibility', 'Fair pay and fair treatment of staff'],
    ['Training, education and research', 'Principles form the base of management courses'],
  ],
  'Table of six reasons why managers need principles of management, each with an imagined example',
);
const vTaylorFlow = flow('LR', ['Science, not rule of thumb', 'Harmony, not discord', 'Cooperation, not individualism', 'Development of each person', 'Maximum, not restricted, output'], 'Flow of Taylor\'s five principles of scientific management, from science not rule of thumb to maximum not restricted output', 'Taylor\'s five principles');
const vTaylor = table(
  ['Principle', 'What it asks for'],
  [
    ['Science, not rule of thumb', 'Find the one best method by study; drop guesswork and habit'],
    ['Harmony, not discord', 'Replace conflict between managers and workers with goodwill'],
    ['Cooperation, not individualism', 'Managers and workers share work and responsibility as partners'],
    ['Development of each person to greatest efficiency and prosperity', 'Select, train and place each worker to use his or her best ability'],
    ['Maximum, not restricted, output', 'Aim for full output so that costs fall and wages rise'],
  ],
  'Table of Taylor\'s five principles of scientific management and what each asks for',
);
const vMental = flow('LR', ['Suspicion and conflict', 'Change of attitude on both sides', 'Partnership and cooperation', 'Higher output', 'Gains shared'], 'Flow of the mental revolution: from suspicion and conflict, through a change of attitude on both sides, to partnership, higher output and shared gains', 'Taylor\'s mental revolution');
const vTaylorEx = table(
  ['Imagined practice at a mango packer in Ratnagiri', 'Principle of Taylor'],
  [
    ['Timed four ways of boxing and taught the best', 'Science, not rule of thumb'],
    ['Sent quick learners on a grading course and promoted them', 'Development of each person'],
    ['Packers stop holding back speed once gains are shared', 'Maximum, not restricted, output'],
    ['Manager and packers\' representatives solve problems together each evening', 'Cooperation, not individualism'],
  ],
  'Worked table matching four imagined practices at a mango packer with Taylor\'s principles',
  'Ask: method, attitude, partnership, training or output?',
);
const vSummary1 = table(
  ['Idea', 'Key point'],
  [['Nature', 'Universal, general guidelines, flexible, mainly behavioural, cause and effect, contingent'], ['Need', 'Insights, resources, scientific decisions, change, social responsibility, training'], ['Taylor', 'Science, harmony, cooperation, development of each person, maximum output'], ['Mental revolution', 'Both sides change attitude: from conflict to partnership']],
  'Summary table of Part 1: nature and need of principles, Taylor\'s five principles and the mental revolution',
);
const vCaseSteps = flow('LR', ['Quote the line', 'Name the principle', 'Explain followed or violated'], 'Three steps for case questions: quote the line, name the principle, and explain whether it is followed or violated');

const vFayol1 = table(
  ['Principle', 'Meaning', 'Imagined example'],
  [
    ['1. Division of work', 'Split work into small tasks for specialisation', 'Graders only grade; packers only pack'],
    ['2. Authority and responsibility', 'Authority must match responsibility', 'A supervisor answerable for an order may call overtime'],
    ['3. Discipline', 'Obey rules; needs good superiors, fair agreements, fair penalties', 'Promised bonus is paid; rules are respected'],
    ['4. Unity of command', 'One boss for each subordinate', 'A deckhand takes orders from the captain only'],
    ['5. Unity of direction', 'One head and one plan for activities with one objective', 'One manager runs the whole trade-fair stall'],
  ],
  'Table of Fayol\'s principles one to five with meanings and imagined examples: division of work, authority and responsibility, discipline, unity of command, unity of direction',
);
const vFayol2 = table(
  ['Principle', 'Meaning', 'Imagined example'],
  [
    ['6. Subordination of individual interest', 'Firm\'s interest comes before any one person\'s', 'Best kiln goes to the urgent export order'],
    ['7. Remuneration of employees', 'Pay fair to workers and affordable for the firm', 'Wages allow a decent living'],
    ['8. Centralisation and decentralisation', 'Balance decisions kept at the top and passed down', 'Prices at head office; shifts by yard heads'],
    ['9. Scalar chain', 'Line of authority from top to bottom', 'Conductor, supervisor, manager, controller'],
    ['10. Order', 'A place for everything and everyone', 'Tools on marked racks; staff where needed'],
  ],
  'Table of Fayol\'s principles six to ten with meanings and imagined examples: subordination of individual interest, remuneration, centralisation and decentralisation, scalar chain, order',
);
const vFayol3 = table(
  ['Principle', 'Meaning', 'Imagined example'],
  [
    ['11. Equity', 'Kindliness and justice for all, without bias', 'Overtime shared fairly, whatever the village'],
    ['12. Stability of tenure', 'Keep staff long enough to learn the job', 'Quality checkers stay for whole seasons'],
    ['13. Initiative', 'Let staff think out and carry out plans', 'A junior perfumer tries her own blend'],
    ['14. Esprit de corps', 'Team spirit and unity', 'Weavers help a sick colleague finish'],
  ],
  'Table of Fayol\'s principles eleven to fourteen with meanings and imagined examples: equity, stability of tenure, initiative, esprit de corps',
);
const vUocUod = table(
  ['Basis', 'Unity of command', 'Unity of direction'],
  [['Meaning', 'One boss for each subordinate', 'One head, one plan for a group of activities'], ['Aim', 'Prevent confusion in orders', 'Coordinate efforts towards one objective'], ['Concerns', 'Each individual employee', 'The organisation or a department as a whole']],
  'Table comparing unity of command and unity of direction on meaning, aim and what each concerns',
);
const vScalar = (() => {
  const s = new Svg(560, 330);
  const box = (cx, cy, label, o = {}) => { s.rect(cx - 85, cy - 18, 170, 36, { fill: o.fill ?? 'fill', color: o.color, sw: 1.5, rx: 6 }); s.text(cx, cy, label, { size: 13, bold: o.bold }); };
  const L = 140, R = 420;
  box(280, 36, 'Plant head', { bold: true });
  box(L, 116, 'Production manager');
  box(R, 116, 'Stores manager');
  box(L, 196, 'Production supervisor');
  box(R, 196, 'Stores supervisor');
  box(L, 276, 'Machine operator');
  box(R, 276, 'Store keeper');
  s.line(280, 54, L, 98, { sw: 1.5 }).line(280, 54, R, 98, { sw: 1.5 });
  s.line(L, 134, L, 178, { sw: 1.5 }).line(L, 214, L, 258, { sw: 1.5 });
  s.line(R, 134, R, 178, { sw: 1.5 }).line(R, 214, R, 258, { sw: 1.5 });
  s.line(L + 85, 196, R - 85, 196, { color: 'accent', sw: 2.5, dash: true });
  s.text(280, 182, 'gang plank', { color: 'accent', size: 13, bold: true });
  s.text(280, 212, 'direct contact', { color: 'accent', size: 12 });
  s.text(280, 316, 'Normal route: up the chain to the plant head and down again', { size: 12, muted: true });
  return s.visual('Scalar chain at an imagined plant: the plant head at the top; on the left, production manager, production supervisor and machine operator; on the right, stores manager, stores supervisor and store keeper. A dashed gang plank joins the production supervisor and the stores supervisor for direct contact, instead of the normal route up to the plant head and down again', 'The gang plank is a shortcut between equals, with both superiors kept informed.');
})();
const vFayolEx = table(
  ['Imagined fact at a bus depot', 'Principle', 'Followed or violated?'],
  [
    ['Conductors get orders from two supervisors', 'Unity of command', 'Violated'],
    ['A supervisor promotes his nephew over abler staff', 'Equity', 'Violated'],
    ['Requests go up from supervisor to manager to controller', 'Scalar chain', 'Followed'],
    ['The route planner is moved every month', 'Stability of tenure', 'Violated'],
  ],
  'Worked table: four imagined facts at a bus depot, the Fayol principle each concerns, and whether it is followed or violated',
  'Name the principle, then say followed or violated.',
);
const vCompare = table(
  ['Basis', 'Taylor', 'Fayol'],
  [
    ['Perspective', 'Engineer at the shop floor', 'Top manager'],
    ['Focus', 'Productivity of workers', 'General administration'],
    ['Unit of concern', 'Operative level', 'Whole organisation'],
    ['Basis of ideas', 'Observation and experiment', 'Personal experience'],
    ['Applicability', 'Mainly specialised production', 'Universal'],
    ['Key expression', 'Scientific management', 'General theory of administration'],
  ],
  'Table comparing Taylor and Fayol on perspective, focus, unit of concern, basis of ideas, applicability and key expression',
);
const vRelevance = table(
  ['Principle', 'How it shows up today'],
  [
    ['Science, not rule of thumb', 'Data from apps used to find the best method'],
    ['Unity of command', 'Each remote worker has one team lead'],
    ['Order', 'Warehouse items tracked by rack codes'],
    ['Initiative', 'Staff encouraged to suggest new ideas'],
    ['Centralisation and decentralisation', 'Needs adapting: more local freedom in fast markets'],
  ],
  'Table of five principles and how each shows up, or needs adapting, in businesses today',
);
const vRelevanceEx = table(
  ['Imagined practice at an online apricot seller', 'Principle', 'Verdict'],
  [['App data shows the fastest packing method', 'Science, not rule of thumb', 'Highly relevant'], ['Staff in three cities each report to one lead', 'Unity of command', 'Relevant'], ['City teams decide local deliveries', 'Decentralisation', 'Relevant, but adapted']],
  'Worked table: three imagined practices at an online apricot seller, the principle each uses, and a verdict on its relevance',
  'Name the principle, then judge: relevant, or relevant if adapted.',
);
const vSummary2 = table(
  ['Idea', 'Key point'],
  [['Fayol', 'Fourteen principles of general administration'], ['Command vs direction', 'One boss each; one head, one plan'], ['Gang plank', 'Direct contact between equals in an emergency'], ['Taylor vs Fayol', 'Shop floor vs whole organisation'], ['Today', 'Still relevant if applied flexibly']],
  'Summary table of Part 2: Fayol\'s principles, unity of command and direction, gang plank, comparison and relevance',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Principles of Management — Part 1: Nature, Need and Taylor',
  goals: [
    'Describe the nature of principles of management and explain why managers need them',
    'Explain Taylor\'s five principles of scientific management with workplace examples',
  ],
  slides: [
    sl('title', 'Principles of Management', {
      b: 'Part 1: what **principles of management** are like, why managers **need** them, and **Taylor\'s** five principles.',
      v: vRoute1,
      n: 'Managers face the same kinds of problems again and again: who gives orders, how to divide work, how to get people to cooperate. Over the years, thinkers turned lessons from practice into principles. In this part we look at what these principles are like, why managers need them, and the five principles of F. W. Taylor.',
    }),
    sl('concept', 'What are principles of management?', {
      b: 'A **principle of management** is a broad, general guideline for decision making and behaviour at work.',
      v: vNature,
      n: 'Principles of management have seven features. They apply everywhere. They are general guidelines, not ready-made answers. They grew out of practice and experiment. They are flexible. They are mainly about human behaviour. They show cause and effect. And their use depends on the situation, so they are contingent.',
    }),
    sl('two-column', 'Not like the laws of science', {
      cols: ['**Pure science**\n\nExact principles about things and forces, applied word for word.', '**Management**\n\nFlexible guidelines about people, adapted to each situation.'],
      v: vSciMgmt,
      n: 'Principles of pure science, such as the laws of motion, are exact and apply in the same way every time. Principles of management deal with people, who think and feel differently, so they are not exact. A manager must adapt them to the situation rather than apply them word for word.',
    }),
    sl('example', 'Worked example 1: which feature?', {
      b: 'Match each imagined situation with the feature of principles it shows.',
      bl: ['Step 1: find the **clue**: everywhere, adapted, only a guide, or about people.', 'Step 2: name the feature.', 'Step 3: explain in one line.'],
      v: vNatureEx,
      n: 'Let us practise. A one-boss rule that works on a ship and in a canteen shows universal applicability. An owner who gives freedom in festivals but centralises in a crisis shows flexibility. Principles that tell you what to keep in mind but not what to say are general guidelines. Principles about how workers relate are mainly behavioural.',
    }),
    sl('check', 'Quick check: everywhere?', {
      b: 'True or false: principles of management are useful only in business firms, not in schools, clubs or hospitals.',
      chk: 'tf_universal',
      n: 'Think about whether a school or a club also needs people to work together.',
    }),
    sl('concept', 'Why managers need principles', {
      v: vNeed,
      n: 'Principles help managers in six ways. They give useful insights into real situations. They help use resources fully, with little waste. They make decisions logical and fair. They help managers adapt to a changing environment. They guide firms towards social responsibility. And they form the base for training, education and research in management.',
    }),
    sl('check', 'Quick check: decisions by mood', {
      b: 'An owner who once planned shifts by mood now bases decisions on clear reasons that others can check. Which need for principles does this show?',
      chk: 'm_need_insight',
      n: 'What kind of decisions does she now take?',
    }),
    sl('concept', 'F. W. Taylor and scientific management', {
      b: '**Frederick Winslow Taylor**, an American engineer, studied work on the shop floor and argued that it should be managed by **science**, not by guesswork.',
      v: vTaylorFlow,
      n: 'Frederick Winslow Taylor was an American engineer who worked his way up from the shop floor. He watched how work was actually done and found a great deal of waste and conflict. He argued that management should be based on careful study, and he set out five principles of what he called scientific management.',
    }),
    sl('concept', 'Taylor\'s five principles', {
      v: vTaylor,
      n: 'Here are the five. Science, not rule of thumb: find the best method by study. Harmony, not discord: replace conflict with goodwill. Cooperation, not individualism: managers and workers act as partners. Development of each person: select, train and place workers well. And maximum, not restricted, output: aim for full production so that everyone gains.',
    }),
    sl('diagram', 'The mental revolution', {
      b: 'Harmony needs a complete change of attitude on **both** sides.',
      v: vMental,
      n: 'Taylor said harmony needs a mental revolution. Managers must stop seeing workers only as a cost, and workers must stop seeing managers as enemies. Once both sides change their attitude, they can work as partners. Output rises, and the gains are shared through higher profits and higher wages.',
    }),
    sl('example', 'Worked example 2: spot Taylor\'s principle', {
      b: 'An imagined mango packer in Ratnagiri changes the way it works this season.',
      bl: ['Step 1: ask whether the practice is about **method, attitude, partnership, training or output**.', 'Step 2: name the principle.', 'Step 3: link it to the fact.'],
      v: vTaylorEx,
      n: 'Timing four ways of boxing and teaching the best is science, not rule of thumb. Training quick learners and promoting them develops each person. Packers who stop holding back speed once gains are shared show maximum, not restricted, output. Manager and workers solving problems together each evening is cooperation, not individualism.',
    }),
    sl('check', 'Quick check: an analogy', {
      b: 'Complete the analogy: harmony is to discord as cooperation is to ___.',
      chk: 'fb_taylor',
      n: 'Taylor paired each good practice with the habit it replaces.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. Principles of management are universal, flexible, mainly behavioural guidelines formed through practice. Managers need them for insight, efficiency, sound decisions, change, social responsibility and training. Taylor gave five principles of scientific management, built on a mental revolution in which managers and workers become partners.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Write Taylor\'s principles in their **full pairs**: science, not rule of thumb.', 'Link **harmony** to the **mental revolution**.', 'For features of principles, find the **clue** in the case.', 'Never list a Fayol principle under Taylor.'],
      v: vCaseSteps,
      n: 'A few tips. Write each of Taylor\'s principles in full, as a pair. Whenever you write harmony, mention the mental revolution. In feature questions, find the clue in the case. And keep Taylor and Fayol apart; unity of command belongs to Fayol, not Taylor.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Principles of Management — Part 2: Fayol, Comparison and Relevance',
  goals: [
    'Explain each of Fayol\'s principles and identify which one is violated in a given situation',
    'Compare Taylor\'s and Fayol\'s contributions and discuss their relevance in a modern Indian business',
  ],
  slides: [
    sl('title', 'Fayol\'s Principles and Their Relevance', {
      b: 'Part 2: **Fayol\'s** fourteen principles, the **scalar chain** and **gang plank**, and how Taylor and Fayol **compare** today.',
      v: vRoute2,
      n: 'Henri Fayol was a French mining engineer who rose to be managing director of a large company. Looking at the whole organisation from the top, he set out fourteen principles of management. In this part we learn them, see how the scalar chain works, and compare his ideas with Taylor\'s.',
    }),
    sl('concept', 'Fayol\'s principles: one to five', {
      v: vFayol1,
      n: 'Division of work splits work into small tasks, so people specialise. Authority and responsibility must match. Discipline needs good superiors, fair agreements and fair penalties. Unity of command means one boss for each person. And unity of direction means one head and one plan for activities that share one objective.',
    }),
    sl('concept', 'Fayol\'s principles: six to ten', {
      v: vFayol2,
      n: 'The interest of the organisation must come before any one person\'s interest. Pay should be fair to workers and affordable for the firm. Centralisation and decentralisation must be balanced. The scalar chain is the line of authority from top to bottom. And order means a place for everything and everyone, with each in its place.',
    }),
    sl('concept', 'Fayol\'s principles: eleven to fourteen', {
      v: vFayol3,
      n: 'Equity means being kind and just to all workers, without bias. Stability of tenure means keeping staff long enough to learn their jobs well. Initiative means letting people think out and carry out their own plans. And esprit de corps means team spirit: in union there is strength.',
    }),
    sl('two-column', 'Unity of command or unity of direction?', {
      cols: ['**Unity of command**\n\nOne boss for each employee.', '**Unity of direction**\n\nOne head and one plan for a group of activities.'],
      v: vUocUod,
      n: 'These two are easy to confuse. Unity of command is about a person: each employee should take orders from just one boss, to avoid confusion. Unity of direction is about a group of activities: all of them should run under one head and one plan, so that efforts move towards one objective.',
    }),
    sl('diagram', 'Scalar chain and gang plank', {
      b: 'The **scalar chain** is the line of authority from top to bottom; the **gang plank** is a shortcut between equals.',
      v: vScalar,
      n: 'In this imagined plant, a production supervisor who needs a spare part would normally send a request up to the production manager, then the plant head, then down to the stores side. That takes too long in an emergency. Fayol allowed a gang plank: the two supervisors talk directly, while keeping their superiors informed.',
    }),
    sl('check', 'Quick check: an analogy', {
      b: 'Complete the analogy: one head and one plan is to unity of direction as one subordinate and one boss is to ___.',
      chk: 'fb_fayol',
      n: 'Which principle is about a single boss?',
    }),
    sl('example', 'Worked example 1: which principle is broken?', {
      b: 'An inspector notes four facts at an imagined bus depot.',
      bl: ['Step 1: find the **principle** each fact concerns.', 'Step 2: decide whether it is **followed or violated**.', 'Step 3: state the effect.'],
      v: vFayolEx,
      n: 'Orders from two supervisors break unity of command. Promoting a nephew over abler staff breaks equity. Requests moving up through each level follow the scalar chain, so that one is fine. Moving the route planner every month breaks stability of tenure. Always say clearly whether a principle is followed or violated.',
    }),
    sl('check', 'Quick check: tools on racks', {
      b: 'A bamboo works keeps every tool on a marked rack and seats each craftsperson where her skill is needed. Which principle is this?',
      chk: 'm_order',
      n: 'Think of a place for everything and everyone.',
    }),
    sl('concept', 'Taylor and Fayol compared', {
      v: vCompare,
      n: 'Taylor was an engineer who looked at the shop floor; Fayol was a top manager who looked at the whole organisation. Taylor focused on the productivity of workers, Fayol on general administration. Taylor built his ideas from experiments, Fayol from experience. Fayol\'s principles apply almost everywhere, while Taylor\'s fit mainly specialised production work.',
    }),
    sl('concept', 'Are the principles still relevant?', {
      v: vRelevance,
      n: 'Many of these ideas are alive today in new forms. Delivery apps use data to find the best method, which is Taylor\'s science in modern clothes. Remote workers still need one clear team lead. Warehouses use rack codes for order. But some ideas, such as tight centralisation, must be adapted for fast-changing markets.',
    }),
    sl('example', 'Worked example 2: an app-based firm', {
      b: 'An imagined apricot seller from Leh now sells online across India.',
      bl: ['Step 1: spot the **practice**.', 'Step 2: name the **principle** behind it.', 'Step 3: judge: relevant, or relevant if **adapted**.'],
      v: vRelevanceEx,
      n: 'Using app data to find the fastest packing method is science, not rule of thumb, and it is highly relevant. Giving staff in three cities one lead each is unity of command, still relevant. Letting city teams decide local deliveries is decentralisation, relevant but adapted for speed. So the principles survive when applied flexibly.',
    }),
    sl('check', 'Quick check: where the ideas came from', {
      b: 'True or false: Fayol drew his principles mainly from his own career as a top manager, while Taylor built his from observation and experiments at the workplace.',
      chk: 'tf_compare',
      n: 'Recall the job each man held.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. Fayol gave fourteen principles of general administration, from division of work to esprit de corps. Unity of command means one boss; unity of direction means one head and one plan. The gang plank is a shortcut between equals. Taylor looked at the shop floor, Fayol at the whole firm, and both remain relevant if used flexibly.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Learn the **fourteen principles** in order, with one example each.', 'In cases, say whether a principle is **followed or violated**.', 'Never mix up **unity of command** and **unity of direction**.', 'For relevance, give a **modern example** and a verdict.'],
      v: vCaseSteps,
      n: 'Final tips. Learn all fourteen principles with a short example for each. In a case, name the principle and say whether it is followed or violated. Keep unity of command and unity of direction apart. And when asked about relevance today, give a modern example and end with a clear verdict.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Principles of Management — notes',
  sections: [
    {
      h: '1. Nature of principles of management',
      t: 1,
      b: 'A **principle of management** is a broad and general guideline for decision making and behaviour at work.\n\n**Features:**\n- **Universal applicability:** usable in all kinds of organisations, business and non-business.\n- **General guidelines:** they guide action but give no ready-made solutions.\n- **Formed by practice and experimentation:** they grew out of managers\' experience and research.\n- **Flexible:** managers can modify them to suit the situation.\n- **Mainly behavioural:** they aim to influence human behaviour.\n- **Cause and effect relationship:** they indicate the likely result of an action.\n- **Contingent:** their use depends on the conditions prevailing at the time.\n\nUnlike principles of pure science, they are **not exact**, because they deal with people.',
      terms: [['Principle of management', 'A broad, general guideline for decision making and behaviour at work.'], ['Contingent', 'Depending on the situation at the time.']],
      v: vNature,
      vs: [vSciMgmt, vNatureEx],
    },
    {
      h: '2. Need for principles of management',
      t: 1,
      b: '- **Useful insights into reality:** they add to managers\' knowledge and help them learn from past experience.\n- **Optimum utilisation of resources:** they help reduce waste of materials, money and time.\n- **Scientific decisions:** decisions become logical, objective and free from personal bias.\n- **Meeting the changing environment:** being flexible, they help firms adapt.\n- **Fulfilling social responsibility:** they guide fair treatment of workers and society.\n- **Management training, education and research:** they form the base of management study.',
      terms: [['Optimum utilisation', 'Getting the best possible use from limited resources.']],
      v: vNeed,
    },
    {
      h: '3. Taylor\'s principles of scientific management',
      t: 2,
      b: '**F. W. Taylor** (an American engineer) believed work should be studied scientifically. His five principles:\n1. **Science, not rule of thumb:** find the one best method through observation and experiment, in place of guesswork and habit.\n2. **Harmony, not discord:** managers and workers should replace conflict with goodwill. This needs a **mental revolution** — a complete change of attitude on both sides.\n3. **Cooperation, not individualism:** managers and workers should work as partners and share responsibility; managers plan, workers offer suggestions.\n4. **Development of each and every person to his or her greatest efficiency and prosperity:** select workers scientifically, train them, and place them where their abilities fit best.\n5. **Maximum, not restricted, output:** aim for full output; lower costs mean higher profits and higher wages.',
      terms: [['Scientific management', 'Managing work on the basis of careful study rather than guesswork.'], ['Mental revolution', 'A change of attitude by managers and workers from conflict to cooperation.']],
      v: vTaylor,
      vs: [vMental, vTaylorEx],
    },
    {
      h: '4. Fayol\'s fourteen principles of management',
      t: 3,
      b: '**Henri Fayol** (a French mining engineer and managing director) gave fourteen principles of general administration:\n1. **Division of work** — specialisation through small tasks.\n2. **Authority and responsibility** — authority should match responsibility.\n3. **Discipline** — obedience to rules; needs good superiors, clear and fair agreements, judicious penalties.\n4. **Unity of command** — one boss for each subordinate.\n5. **Unity of direction** — one head and one plan for activities with the same objective.\n6. **Subordination of individual interest to general interest.**\n7. **Remuneration of employees** — fair to workers, affordable for the firm.\n8. **Centralisation and decentralisation** — a suitable balance.\n9. **Scalar chain** — the line of authority from top to bottom; a **gang plank** allows direct contact between equals in an emergency, keeping superiors informed.\n10. **Order** — a place for everything and everyone.\n11. **Equity** — kindliness and justice to all.\n12. **Stability of tenure of personnel.**\n13. **Initiative** — encourage staff to make and carry out plans.\n14. **Esprit de corps** — team spirit.',
      terms: [['Unity of command', 'Each subordinate takes orders from one superior only.'], ['Unity of direction', 'One head and one plan for a group of activities with one objective.'], ['Gang plank', 'Direct contact between employees at the same level, to avoid delay.']],
      v: vFayol1,
      vs: [vFayol2, vFayol3, vUocUod, vScalar, vFayolEx],
    },
    {
      h: '5. Taylor and Fayol compared; relevance today',
      t: 4,
      b: '**Comparison:** perspective (shop-floor engineer vs top manager); focus (productivity vs general administration); unit of concern (operative level vs whole organisation); basis (observation and experiment vs personal experience); applicability (specialised production vs universal); key expression (scientific management vs general theory of administration). The two are **complementary**.\n\n**Relevance today:** data-driven methods continue Taylor\'s science, not rule of thumb; remote teams still need unity of command; warehouses follow order; firms reward initiative. Ideas such as tight centralisation must be **adapted** for fast, digital markets. The principles remain useful when applied flexibly.',
      terms: [['Complementary', 'Each fills in what the other leaves out.']],
      v: vCompare,
      vs: [vRelevance, vRelevanceEx],
    },
  ],
  tips: '**Common mistakes**\n- Listing unity of command or esprit de corps under Taylor.\n- Confusing unity of command (one boss) with unity of direction (one head, one plan).\n- Writing Taylor\'s principles in half: always the full pair.\n- Forgetting that a gang plank keeps superiors informed.\n\n**How marks are usually awarded**\n- 1 mark: the correct principle or feature.\n- 2–3 marks: principle named, explained, and linked to the case (followed or violated).\n- 5 marks: each principle with an example; comparison questions need clear bases.\n- Case questions: quote the line, name the principle, say followed or violated.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Principle of management**', 'A broad, general guideline for decisions and behaviour at work.', 'definition', 1],
  ['Seven features of principles', 'Universal, general guidelines, practice-based, flexible, mainly behavioural, cause and effect, contingent.', 'exam-tip', 1],
  ['Why "mainly behavioural"?', 'They aim to influence how people act at work.', 'concept', 1],
  ['Why "flexible"?', 'Managers can adapt them to the situation.', 'concept', 1],
  ['Six needs for principles', 'Insights, resources, scientific decisions, change, social responsibility, training.', 'exam-tip', 1],
  ['**Scientific management**', 'Managing work by careful study, not guesswork (Taylor).', 'definition', 2],
  ['Taylor\'s five principles', 'Science; harmony; cooperation; development of each person; maximum output.', 'exam-tip', 2],
  ['**Science, not rule of thumb**', 'Find the one best method by study.', 'definition', 2],
  ['**Harmony, not discord**', 'Goodwill instead of conflict between managers and workers.', 'definition', 2],
  ['**Mental revolution**', 'Both sides change attitude: from conflict to partnership.', 'definition', 2],
  ['**Cooperation, not individualism**', 'Managers and workers share work and responsibility.', 'definition', 2],
  ['**Development of each person**', 'Select, train and place workers for best efficiency and prosperity.', 'definition', 2],
  ['**Maximum, not restricted, output**', 'Aim for full output so costs fall and wages rise.', 'definition', 2],
  ['**Division of work**', 'Small tasks lead to specialisation.', 'definition', 3],
  ['**Authority and responsibility**', 'Authority should match responsibility.', 'definition', 3],
  ['Discipline needs…', 'Good superiors, clear and fair agreements, judicious penalties.', 'fact', 3],
  ['**Unity of command**', 'One boss for each subordinate.', 'definition', 3],
  ['**Unity of direction**', 'One head and one plan for activities with one objective.', 'definition', 3],
  ['**Scalar chain**', 'Line of authority from the top to the lowest rank.', 'definition', 3],
  ['**Gang plank**', 'Direct contact between equals in an emergency, superiors informed.', 'definition', 3],
  ['**Order**', 'A place for everything and everyone, each in its place.', 'definition', 3],
  ['**Equity**', 'Kindliness and justice for all, without bias.', 'definition', 3],
  ['**Stability of tenure**', 'Keep staff long enough to learn the job.', 'definition', 3],
  ['**Initiative**', 'Let staff think out and carry out plans.', 'definition', 3],
  ['**Esprit de corps**', 'Team spirit and unity.', 'definition', 3],
  ['Subordination of individual interest', 'The firm\'s interest comes before any one person\'s.', 'definition', 3],
  ['Taylor vs Fayol: perspective', 'Shop-floor engineer vs top manager.', 'fact', 4],
  ['Taylor vs Fayol: applicability', 'Specialised production vs universal.', 'fact', 4],
  ['Are the principles relevant today?', 'Yes, if applied flexibly; some need adapting.', 'concept', 4],
  ['Case routine', 'Quote the line, name the principle, say followed or violated.', 'exam-tip', 3],
]);

// ---------------------------------------------------------------- tests (ISC class defaults, item for item)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Principles of Management',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A - Objective (5 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_flexible', 'm_harmony', 'm_uoc', 'm_compare', 'ar_taylor'] },
    { id: 'B', title: 'Section B - Short answer (4 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s_need', { attempt: 1, keys: ['s_taylor2', 's_uoc_uod'] }] },
    { id: 'C', title: 'Section C - Short answer (6 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s3_fayol', { attempt: 1, keys: ['s3_compare', 's3_need'] }] },
    { id: 'D', title: 'Section D - Long answer (5 marks)', instr: 'Answer the question. It is set in parts.', items: ['l_relevance'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Principles of Management',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A - Objective (12 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_universal', 'm_guidelines', 'm_science', 'm_cooperation', 'm_maximum', 'm_uod', 'm_equity', 'm_stability', 'm_subordination', 'm_relevance', 'ar_uoc', 'ar_taylor_c'] },
    { id: 'B', title: 'Section B - Short answer (6 marks)', instr: 'Answer all three questions. Internal choice in the last question.', items: ['s_nature2', 's_init_equity', { attempt: 1, keys: ['s_science2', 's_relevance'] }] },
    { id: 'C', title: 'Section C - Short answer (12 marks)', instr: 'Answer all four questions. Internal choice in the last question.', items: ['s3_taylor', 's3_scalar', 's3_harmony', { attempt: 1, keys: ['s3_authority', 's3_relevance'] }] },
    { id: 'D', title: 'Section D - Long answer (10 marks)', instr: 'Answer both questions. Internal choice in the second question. Each is set in parts.', items: ['l_fayol', { attempt: 1, keys: ['l_taylor', 'l_nature'] }] },
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
    syllabus: 'topics t01–t04 of isc-12-commerce-ch07 (nature of and need for principles; Taylor\'s five principles of scientific management; Fayol\'s fourteen principles; comparison of Taylor and Fayol and their relevance today)',
    originality: 'every firm, person and case is imagined and written by SOYL and labelled; no ISC or CBSE textbook text, illustration or exercise and no CISCE specimen or board item reused (D-036); firms, people and set-ups differ from CBSE 12 Business Studies ch02',
    data: 'no computed figures; all examples are imagined and labelled',
    facts: 'stable textbook concepts only (Taylor\'s five principles, Fayol\'s fourteen principles, the gang plank); the techniques of scientific management are outside this ISC chapter and are not taught',
    gate: 'schema, pipeline lint, deterministic verify, word limits, narration and answer-leak checks run clean in this build',
  },
});
