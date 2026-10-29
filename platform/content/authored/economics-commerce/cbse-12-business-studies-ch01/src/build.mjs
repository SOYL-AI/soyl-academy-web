// Build CBSE 12 Business Studies ch01 Nature and Significance of Management. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-12-business-studies-ch01/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-business-studies-ch01', 'economics-commerce');
const { EFF, EFF_UNIT_ACTUAL, EFF_UNIT_PLANNED } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- worked-example figures (computed)
// Deck 1 worked example: four imagined units, target vs result and budget vs cost (₹ thousand).
const UNITS = [
  { name: 'Unit A (Pune)', target: 500, done: 500, budget: 100, cost: 90 },
  { name: 'Unit B (Surat)', target: 500, done: 500, budget: 100, cost: 130 },
  { name: 'Unit C (Patna)', target: 500, done: 420, budget: 100, cost: 80 },
  { name: 'Unit D (Agra)', target: 500, done: 380, budget: 100, cost: 125 },
];
const verdict = (u) => `${u.done >= u.target ? 'Effective' : 'Not effective'}, ${u.cost <= u.budget ? 'efficient' : 'not efficient'}`;
const VERDICTS = UNITS.map(verdict);
if (VERDICTS.join('|') !== 'Effective, efficient|Effective, not efficient|Not effective, efficient|Not effective, not efficient') throw new Error('verdict check failed');
if (EFF_UNIT_ACTUAL >= EFF_UNIT_PLANNED) throw new Error('efficiency example must show a saving');

// ---------------------------------------------------------------- visuals
const vRoute1 = flow('LR', ['What management is', 'Effectiveness and efficiency', 'Objectives', 'Characteristics', 'Importance', 'Science, art or profession?'], 'Route map of Part 1: what management is, effectiveness and efficiency, objectives, characteristics, importance, and whether management is a science, an art or a profession', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Three levels of management', 'Five functions', 'Coordination: meaning', 'Why coordination is needed', 'The essence of management'], 'Route map of Part 2: the three levels of management, the five functions, the meaning of coordination, why it is needed, and why it is the essence of management', 'Part 2 at a glance');

const vMatrix = (() => {
  const s = new Svg(520, 330);
  const x0 = 110, y0 = 40, w = 180, h = 120;
  s.rect(x0, y0, w, h, { fill: 'fill', color: 'muted', sw: 1.5, rx: 6 });
  s.rect(x0 + w, y0, w, h, { fill: 'accent', fillOpacity: 0.18, color: 'accent', sw: 2, rx: 6 });
  s.rect(x0, y0 + h, w, h, { fill: 'fill', color: 'muted', sw: 1.5, rx: 6 });
  s.rect(x0 + w, y0 + h, w, h, { fill: 'fill', color: 'muted', sw: 1.5, rx: 6 });
  s.text(x0 + w / 2, y0 + 50, 'Target met on time,', { size: 13 }).text(x0 + w / 2, y0 + 70, 'but resources wasted', { size: 13 });
  s.text(x0 + w * 1.5, y0 + 50, 'Target met on time', { size: 13, bold: true }).text(x0 + w * 1.5, y0 + 70, 'at low cost: the aim', { size: 13, bold: true });
  s.text(x0 + w / 2, y0 + h + 50, 'Target missed and', { size: 13 }).text(x0 + w / 2, y0 + h + 70, 'resources wasted', { size: 13 });
  s.text(x0 + w * 1.5, y0 + h + 50, 'Low cost, but', { size: 13 }).text(x0 + w * 1.5, y0 + h + 70, 'target missed', { size: 13 });
  s.text(x0 + w / 2, y0 + 2 * h + 22, 'Low efficiency', { size: 13, muted: true }).text(x0 + w * 1.5, y0 + 2 * h + 22, 'High efficiency', { size: 13, muted: true });
  s.text(x0 - 12, y0 + h / 2, 'High', { anchor: 'end', size: 13, muted: true }).text(x0 - 12, y0 + h / 2 + 18, 'effectiveness', { anchor: 'end', size: 12, muted: true });
  s.text(x0 - 12, y0 + 1.5 * h, 'Low', { anchor: 'end', size: 13, muted: true }).text(x0 - 12, y0 + 1.5 * h + 18, 'effectiveness', { anchor: 'end', size: 12, muted: true });
  s.text(x0 + w, y0 - 16, 'Good management aims at the top-right box', { size: 13 });
  return s.visual('Two-by-two grid of effectiveness against efficiency: top right, target met on time at low cost, is the aim of management; top left, target met but resources wasted; bottom right, low cost but target missed; bottom left, target missed and resources wasted', 'Effectiveness is about the end result; efficiency is about cost.');
})();

const vEffEx = table(
  ['Imagined unit', 'Mats: target / made', 'Cost: budget / actual (₹ thousand)', 'Verdict'],
  UNITS.map((u, i) => [u.name, `${u.target} / ${u.done}`, `${u.budget} / ${u.cost}`, VERDICTS[i]]),
  'Table of four imagined units with target and output, budget and cost, and the verdict: Pune effective and efficient; Surat effective but not efficient; Patna efficient but not effective; Agra neither',
  'Imagined figures. Compare output with target, then cost with budget.',
);
const vObjectives = table(
  ['Objective', 'Whose need', 'Examples'],
  [
    ['Organisational', 'The firm itself', 'Survival (cover costs), profit (reward risk), growth (sales, branches, products)'],
    ['Social', 'Society', 'Quality goods at fair prices, eco-friendly methods, jobs for disadvantaged groups, community health or schools'],
    ['Personal', 'Employees', 'Fair pay and benefits; recognition and good relations; training and growth'],
  ],
  'Table of the three objectives of management: organisational (survival, profit, growth), social (fair products, environment, jobs, community welfare) and personal (pay, recognition, growth of employees)',
);
const vObjEx = table(
  ['Line from an imagined case (Tapti Textiles)', 'Objective shown'],
  [
    ['Sales rose by a fifth and two new showrooms opened', 'Organisational: growth'],
    ['Weavers were given a health plan and a supervisors\' course', 'Personal'],
    ['Dye waste is treated before it reaches the river', 'Social'],
    ['Prices were set to cover all costs with a fair margin', 'Organisational: survival and profit'],
  ],
  'Worked example table: four lines from an imagined case matched to objectives: sales and showrooms show growth; health plan and course show personal objectives; treating dye waste shows a social objective; covering costs with a margin shows survival and profit',
  'Underline the words that point to whose need is met.',
);
const vChar = table(
  ['Characteristic', 'Key idea'],
  [
    ['Goal-oriented', 'Exists to achieve predetermined goals'],
    ['Pervasive', 'Needed in all organisations, everywhere'],
    ['Multidimensional', 'Work, people and operations'],
    ['Continuous', 'Functions repeat again and again'],
    ['Group activity', 'Many people, common goals'],
    ['Dynamic', 'Adapts to a changing environment'],
    ['Intangible', 'Not seen; felt through results'],
  ],
  'Table of seven characteristics of management with key ideas: goal-oriented, pervasive, multidimensional, continuous, group activity, dynamic and intangible',
);
const vImportance = flow('TB', ['Achieves group goals', 'Increases efficiency', 'Creates a dynamic organisation', 'Helps achieve personal objectives', 'Helps develop society'], 'Flow of five reasons why management is important: achieving group goals, increasing efficiency, creating a dynamic organisation, helping achieve personal objectives and developing society', 'Why management matters');
const vScience = table(
  ['Feature of science', 'Does management have it?'],
  [
    ['Systematised body of knowledge', 'Yes: principles and theories'],
    ['Principles based on experiment', 'Yes, but experiments involve people'],
    ['Universal validity', 'Not fully: results vary with human behaviour'],
  ],
  'Table testing management against three features of science: it has systematic knowledge and principles based on observation, but universal validity is not fully met, so it is an inexact science',
  'Verdict: an inexact (soft) science.',
);
const vArt = table(
  ['Feature of art', 'In management'],
  [
    ['Theoretical knowledge exists', 'Large literature on management'],
    ['Personalised application', 'Each manager uses it in an own style'],
    ['Practice and creativity', 'Skill grows with practice; new solutions'],
  ],
  'Table of three features of art and how management shows them: theoretical knowledge, personalised application and practice with creativity',
  'Verdict: management is an art.',
);
const vProf = table(
  ['Feature of a profession', 'Met by management?'],
  [
    ['Well-defined body of knowledge', 'Yes'],
    ['Restricted entry (degree or licence by law)', 'No'],
    ['Professional association', 'Partly: exists, not compulsory'],
    ['Ethical code', 'Partly: exists, no legal force'],
    ['Service motive', 'Yes'],
  ],
  'Table testing five features of a profession: body of knowledge yes, restricted entry no, professional association partly, ethical code partly, service motive yes',
  'Verdict: not yet a full profession.',
);
const vProfEx = flow('LR', ['Intro: define a profession', 'Test each of the 5 features', 'Say met / not met / partly', 'Conclude with a reason'], 'Flow for structuring a five-mark answer: introduce, test each of the five features, say whether each is met, and conclude with a reason', 'Answer plan for a 5-mark question');
const vSummary1 = table(
  ['Idea', 'Remember'],
  [
    ['Management', 'Getting work done effectively and efficiently'],
    ['Objectives', 'Organisational, social, personal'],
    ['Characteristics', 'Goal-oriented, pervasive, multidimensional, continuous, group, dynamic, intangible'],
    ['Nature', 'Art; inexact science; not a full profession'],
  ],
  'Summary table of Part 1: meaning of management, the three objectives, seven characteristics and the nature of management',
);

const vPyramid = (() => {
  const s = new Svg(520, 300);
  const cx = 260;
  s.polygon([[cx, 20], [cx + 70, 100], [cx - 70, 100]], { fill: 'accent', fillOpacity: 0.25, color: 'accent', sw: 2 });
  s.polygon([[cx - 70, 100], [cx + 70, 100], [cx + 140, 180], [cx - 140, 180]], { fill: 'fill', sw: 1.5 });
  s.polygon([[cx - 140, 180], [cx + 140, 180], [cx + 210, 260], [cx - 210, 260]], { fill: 'fill', sw: 1.5 });
  s.text(cx, 72, 'Top', { bold: true, size: 14 });
  s.text(cx, 132, 'Middle', { bold: true, size: 14 }).text(cx, 154, 'department heads', { size: 12, muted: true });
  s.text(cx, 212, 'Supervisory / operational', { bold: true, size: 14 }).text(cx, 234, 'foremen, supervisors', { size: 12, muted: true });
  s.text(cx + 90, 50, 'CEO, MD, board', { anchor: 'start', size: 12, muted: true });
  s.text(cx, 284, 'Operative workers below them carry out the work', { size: 12, muted: true });
  return s.visual('Pyramid of the three levels of management: top management (chief executive, managing director, board) at the apex, middle management (department heads) in the middle, and supervisory or operational management (foremen, supervisors) at the base, with operative workers below', 'Authority flows down; information flows both ways.');
})();
const vLevelsTable = table(
  ['Level', 'Who', 'Main tasks'],
  [
    ['Top', 'Chairperson, CEO, MD, board', 'Goals and strategy; coordinate all departments; survival and social impact'],
    ['Middle', 'Heads of production, finance, marketing, HR', 'Interpret policies; staff and assign duties; motivate; link with other departments'],
    ['Supervisory', 'Foremen, supervisors', 'Oversee workers; quality and wastage; morale; pass problems upward'],
  ],
  'Table of the three levels of management with who belongs to each and their main tasks',
);
const vFunctions = (() => {
  const s = new Svg(520, 320);
  const cx = 260, cy = 160, R = 115;
  const names = ['Planning', 'Organising', 'Staffing', 'Directing', 'Controlling'];
  const pts = names.map((_, i) => { const a = (-90 + i * 72) * Math.PI / 180; return [cx + R * Math.cos(a), cy + R * Math.sin(a)]; });
  pts.forEach(([x, y], i) => {
    const [nx, ny] = pts[(i + 1) % pts.length];
    const dx = nx - x, dy = ny - y, L = Math.hypot(dx, dy);
    s.arrow(x + (dx / L) * 52, y + (dy / L) * 22, nx - (dx / L) * 52, ny - (dy / L) * 22, { color: 'muted', sw: 1.6 });
  });
  pts.forEach(([x, y], i) => { s.rect(x - 50, y - 16, 100, 32, { fill: 'fill', color: 'accent', sw: 1.6, rx: 10 }); s.text(x, y, names[i], { size: 13, bold: true }); });
  s.text(cx, cy - 8, 'Coordination', { size: 14, color: 'accent', bold: true }).text(cx, cy + 12, 'runs through all', { size: 12, muted: true });
  return s.visual('Cycle of the five functions of management: planning, organising, staffing, directing and controlling, with coordination at the centre running through all of them', 'The functions repeat as a cycle; coordination is the thread through all of them.');
})();
const vFnEx = table(
  ['Step in an imagined school annual day', 'Function'],
  [
    ['Fix the date, events and budget', 'Planning'],
    ['Form committees for stage, food and invitations', 'Organising'],
    ['Pick and train compères and volunteers', 'Staffing'],
    ['Guide and encourage teams at rehearsals', 'Directing'],
    ['Compare progress and spending with the plan', 'Controlling'],
  ],
  'Worked example table matching five steps of an imagined school annual day to the five functions: planning, organising, staffing, directing and controlling',
  'Look for the verb: decide, divide, hire, guide or check.',
);
const vCoord = flow('LR', ['Production', 'Purchase', 'Sales', 'Finance', 'Unity of action towards common goals'], 'Flow showing departments of production, purchase, sales and finance brought together into unity of action towards common goals by coordination', 'Coordination synchronises departments', [
  { from: 'n1', to: 'n5' }, { from: 'n2', to: 'n5' }, { from: 'n3', to: 'n5' }, { from: 'n4', to: 'n5' },
]);
const vCoordChar = table(
  ['Characteristic of coordination', 'Meaning'],
  [
    ['Integrates group efforts', 'Unites different interests into one purpose'],
    ['Ensures unity of action', 'All work towards a common goal'],
    ['Continuous process', 'From planning to controlling'],
    ['All-pervasive', 'All departments and levels'],
    ['Responsibility of all managers', 'Top to supervisory'],
    ['Deliberate function', 'Consciously done; cooperation alone is not enough'],
  ],
  'Table of six characteristics of coordination and their meanings',
);
const vNeed = flow('TB', ['Growth in size: more people, different goals', 'Functional differentiation: separate departments', 'Specialisation: experts with their own views', 'Greater need for coordination'], 'Flow of three reasons that increase the need for coordination: growth in size, functional differentiation and specialisation', 'Why coordination is needed', [
  { from: 'n1', to: 'n4' }, { from: 'n2', to: 'n4' }, { from: 'n3', to: 'n4' },
]);
const vCaseSteps = flow('LR', ['Read the question: what is asked?', 'Find the clue words in the case', 'Name the concept', 'Quote the line', 'Explain in one or two sentences'], 'Flow of steps for a case-based question: read the question, find clue words, name the concept, quote the line, explain', 'Five steps for case questions');
const vSummary2 = table(
  ['Idea', 'Remember'],
  [
    ['Levels', 'Top (strategy), middle (link), supervisory (workers)'],
    ['Functions', 'Planning, organising, staffing, directing, controlling'],
    ['Coordination', 'Not a separate function; essence of management'],
    ['Need for coordination', 'Size, functional differentiation, specialisation'],
  ],
  'Summary table of Part 2: levels, functions, coordination and the reasons coordination is needed',
);
const vTips = table(
  ['Common mistake', 'Fix'],
  [
    ['Mixing effectiveness and efficiency', 'Effective: on time; efficient: low cost'],
    ['Calling coordination a sixth function', 'It is the essence, present in all functions'],
    ['Naming a concept without a quote in a case', 'Quote the exact line, then explain'],
    ['Calling management a full profession', 'Restricted entry and a binding code are missing'],
  ],
  'Exam tips table of four common mistakes and how to fix them',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Nature and Significance of Management — Part 1: Meaning, Objectives and Nature',
  goals: [
    'Explain management as a process and distinguish effectiveness from efficiency',
    'Identify organisational, social and personal objectives in business situations',
    'Explain the characteristics and importance of management',
    'Evaluate management as a science, an art and a profession',
  ],
  slides: [
    sl('title', 'Nature and Significance of Management', {
      b: 'Part 1: what management is, its **objectives**, **characteristics**, **importance**, and whether it is a **science, art or profession**.',
      v: vRoute1,
      n: 'Think of a school sports day. Somebody fixed the date, divided the work, chose volunteers, guided them and checked that every event started on time. That somebody was managing. In this chapter we ask what management really is, what it aims at, why every organisation needs it, and whether it is a science, an art or a profession.',
    }),
    sl('concept', 'What is management?', {
      b: '**Management** is the process of getting things done **with and through others** to achieve goals **effectively and efficiently**.',
      bl: ['**Process:** a series of functions (planning, organising, staffing, directing, controlling).', '**Effectively:** the task is completed, on time.', '**Efficiently:** resources are used at the lowest cost.'],
      v: flow('LR', ['People and resources', 'Management process', 'Goals achieved on time and at low cost'], 'Flow: people and resources pass through the management process to goals achieved on time and at low cost'),
      n: 'Managers rarely do the work themselves. They get it done through others. The definition has three key words. Process means a chain of functions. Effectively means the job is finished, and finished on time. Efficiently means it is finished without waste, at the lowest possible cost. Good management needs both, not just one.',
    }),
    sl('diagram', 'Effectiveness and efficiency', {
      v: vMatrix,
      n: 'Look at this grid. Effectiveness is about the result: did you meet the target on time? Efficiency is about the cost: did you avoid waste? A firm can meet its target but waste money, or save money but miss the target. Neither is good enough. Managers aim for the top right box, where the target is met on time and at low cost.',
    }),
    sl('example', 'Worked example 1: effective, efficient or both?', {
      b: 'Four imagined units each had a target of 500 mats and a budget of ₹1 lakh.',
      bl: ['Step 1: Compare output with the target. Met means **effective**.', 'Step 2: Compare cost with the budget. Within budget means **efficient**.', 'Step 3: Combine the two verdicts.'],
      v: vEffEx,
      n: 'Let us judge four imagined units. Pune made all 500 mats and spent less than budget, so it is effective and efficient. Surat met the target but overspent, so it is effective but not efficient. Patna saved money but made only 420 mats, so it is efficient but not effective. Agra missed the target and overspent, so it is neither. Always check the two things separately.',
    }),
    sl('check', 'Quick check: two key words', {
      b: 'Fill in the two blanks about completing a task on time and at minimum cost.',
      chk: 'fb_eff',
      n: 'Try this quick one. Which word goes with finishing on time, and which with keeping costs low?',
    }),
    sl('concept', 'Objectives of management', {
      v: vObjectives,
      n: 'Management works towards three groups of objectives. Organisational objectives belong to the firm: survival, profit and growth. Social objectives belong to society: fair products, a clean environment, jobs and community welfare. Personal objectives belong to employees: fair pay, recognition and growth. A well managed firm balances all three.',
    }),
    sl('example', 'Worked example 2: spotting the objective', {
      b: 'In a case, ask **whose need** is being met.',
      bl: ['The firm itself: **organisational**.', 'The community or environment: **social**.', 'The employees: **personal**.'],
      v: vObjEx,
      n: 'Here are four lines from an imagined case about Tapti Textiles. Rising sales and new showrooms show growth, an organisational objective. A health plan and a supervisors course meet the needs of workers, so they are personal. Treating dye waste helps the river and the villages, so it is social. Covering costs with a fair margin means survival and profit.',
    }),
    sl('concept', 'Characteristics of management', {
      v: vChar,
      n: 'Management has seven characteristics. It is goal oriented. It is pervasive, found in every kind of organisation. It is multidimensional, covering work, people and operations. It is continuous, because the functions repeat. It is a group activity. It is dynamic, adapting to change. And it is intangible: you cannot see it, but you can see its results.',
    }),
    sl('check', 'Quick check: a characteristic', {
      b: 'Guests notice smooth service at a hotel but cannot see its management. Which characteristic is this?',
      chk: 'm_intangible',
      n: 'Read the situation carefully and look for the clue about seeing and feeling.',
    }),
    sl('concept', 'Why management is important', {
      v: vImportance,
      n: 'Why does every organisation need management? It unites individual efforts towards group goals. It reduces waste and raises efficiency. It helps the organisation adapt to change. It helps employees meet their own goals through motivation and leadership. And by producing good goods, creating jobs and using new technology, it helps society develop.',
    }),
    sl('check', 'Quick check: a group activity', {
      b: 'Decide whether the statement about management as a group activity is true or false.',
      chk: 'tf_group',
      n: 'Think about what an organisation is made of, and what management does with those people.',
    }),
    sl('two-column', 'Is management a science?', {
      cols: ['**Yes, partly**\n\nIt has a systematic body of knowledge and principles drawn from observation and testing.', '**But inexact**\n\nIts principles deal with people, so the same principle can give different results.'],
      v: vScience,
      n: 'A science has systematic knowledge, principles based on experiment, and results that hold everywhere. Management has the first two in some form. But because its principles deal with human behaviour, the same principle may work differently in two teams. So we call management an inexact, or soft, science.',
    }),
    sl('concept', 'Management as an art', {
      v: vArt,
      n: 'An art is the skilful, personal use of knowledge. Management fits well. There is plenty of theory to learn. Each manager applies it in an own style, so two managers handle the same problem differently. And skill improves with practice and creativity. So management is clearly an art.',
    }),
    sl('concept', 'Management as a profession', {
      v: vProf,
      n: 'A profession such as law or medicine has five features. Management has a body of knowledge and a service motive. But entry is not restricted by law: anyone can be appointed a manager. Associations exist, such as the All India Management Association, but joining is optional and its code has no legal force. So management is not yet a full profession.',
    }),
    sl('example', 'Worked example 3: planning a 5-mark answer', {
      b: 'Question: Can management be called a profession?',
      bl: ['Step 1: One line on what a profession is.', 'Step 2: Take the **five features** one by one.', 'Step 3: For each, write **met, not met or partly met**, with a reason.', 'Step 4: End with a clear **conclusion**.'],
      v: vProfEx,
      n: 'Here is how to plan a five mark answer on the profession question. Start with one line on what a profession is. Then test the five features one at a time, saying whether each is met, not met or partly met, with a short reason. Finish with a clear conclusion. One feature, one mark, so keep each point separate and labelled.',
    }),
    sl('check', 'Quick check: cost per fan', {
      b: `An imagined fan maker made ${EFF.planned.toLocaleString('en-IN')} fans on time for ₹${EFF.costActual.toLocaleString('en-IN')}. Find the cost per fan.`,
      chk: 'n_unit_cost',
      n: 'Divide the total cost by the number of fans, then compare it with the planned cost per fan.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'Let us sum up. Management gets work done through others, effectively and efficiently. It serves organisational, social and personal objectives. It has seven characteristics, from goal oriented to intangible. It is important for the firm, its people and society. It is an art, an inexact science, and not yet a full profession.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['In cases, **quote the line** and then name and explain the concept.', 'Effectiveness is about **time and target**; efficiency is about **cost**.', 'For the profession question, test **all five** features and conclude.', 'Objectives: ask **whose** need is met.'],
      v: vTips,
      n: 'A few tips. In case questions, first quote the exact line, then name the concept and explain it. Keep effectiveness for time and target, and efficiency for cost. In the profession question, cover all five features and give a conclusion. To identify an objective, ask whose need is being met.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Nature and Significance of Management — Part 2: Levels, Functions and Coordination',
  goals: [
    'Describe the three levels of management and the tasks of each',
    'Explain and identify the five functions of management',
    'Explain the meaning and characteristics of coordination',
    'Analyse why coordination is needed and why it is the essence of management',
  ],
  slides: [
    sl('title', 'Levels, functions and coordination', {
      b: 'Part 2: **who** manages, **what** managers do, and how **coordination** binds it all together.',
      v: vRoute2,
      n: 'In Part 1 we learnt what management is. Now we look inside an organisation. Who are the managers, and at what levels do they work? What functions do they perform? And what holds all their work together? The answer to the last question is coordination, often called the essence of management.',
    }),
    sl('diagram', 'Levels of management', {
      v: vPyramid,
      n: 'Managers work at three levels. At the top are the chairperson, chief executive and the board. In the middle are heads of departments such as production or finance. At the base are supervisors and foremen who work directly with the workers. Authority flows down this chain, while information and feedback flow both ways.',
    }),
    sl('concept', 'What each level does', {
      v: vLevelsTable,
      n: 'Top management sets goals and strategy, coordinates all departments and is answerable for the survival of the firm and its impact on society. Middle management interprets these policies, staffs its departments, assigns duties and links with other departments. Supervisory management oversees the workers, keeps quality high and wastage low, maintains morale and carries workers problems upward.',
    }),
    sl('check', 'Quick check: match the level', {
      b: 'Match each imagined manager at an automobile firm with the correct level.',
      chk: 'mt_levels',
      n: 'Ask who takes the big decision, who turns it into a department plan, and who watches the daily work.',
    }),
    sl('diagram', 'Five functions of management', {
      v: vFunctions,
      n: 'All managers perform five functions. Planning decides in advance what to do. Organising divides the work and gives authority and resources. Staffing finds and trains the right people. Directing leads, motivates and communicates. Controlling checks performance against the plan and corrects it. The cycle then starts again, with coordination running through all of it.',
    }),
    sl('concept', 'Functions at different levels', {
      b: 'Every manager performs **all five functions**; only the **time spent** on each differs.',
      bl: ['Top managers spend more time on **planning and organising**.', 'Supervisors spend more time on **directing and controlling** daily work.'],
      v: table(['Level', 'More time on', 'Less time on'], [['Top', 'Planning, organising', 'Day-to-day directing'], ['Middle', 'Organising, staffing, directing', 'Long-term strategy'], ['Supervisory', 'Directing, controlling', 'Long-term planning']], 'Table of how time spent on functions varies by level: top on planning and organising; middle on organising, staffing and directing; supervisory on directing and controlling'),
      n: 'A common mistake is to think that only top managers plan and only supervisors direct. In fact every manager performs all five functions. What changes is the share of time. A chief executive spends more time on planning and organising. A supervisor spends more time guiding and checking the daily work of the team.',
    }),
    sl('example', 'Worked example 1: naming the function', {
      b: 'Match each step of an imagined school annual day to a function.',
      v: vFnEx,
      n: 'Let us use a school annual day. Fixing the date, events and budget is planning. Forming committees for the stage and food is organising. Picking and training compères is staffing. Guiding teams at rehearsals is directing. Comparing progress and spending with the plan is controlling. The verb in each step tells you the function.',
    }),
    sl('check', 'Quick check: order of functions', {
      b: 'Arrange the five functions in their usual order.',
      chk: 'ord_functions',
      n: 'Start with the function that comes before everything else, and end with the one that checks results.',
    }),
    sl('concept', 'What is coordination?', {
      b: '**Coordination** is the process of **synchronising** the activities of different departments and people so that they work as one towards common goals.',
      v: vCoord,
      n: 'Imagine production makes more goods than sales can sell, or purchase buys material too late for production. Each department may be working hard, but not together. Coordination synchronises their timing, sequence and quantity, so that the whole organisation moves as one towards its goals. This unity of action is the purpose of coordination.',
    }),
    sl('concept', 'Characteristics of coordination', {
      v: vCoordChar,
      n: 'Coordination integrates group efforts and ensures unity of action. It is continuous, beginning with planning and going on till controlling. It is all pervasive, needed in every department and at every level. It is the responsibility of every manager. And it is deliberate: even willing, friendly people need someone to consciously fit their work together.',
    }),
    sl('check', 'Quick check: is it a separate function?', {
      b: 'Decide whether coordination is a separate sixth function of management.',
      chk: 'tf_coord_separate',
      n: 'Think about where coordination appears: in one function, or in all of them?',
    }),
    sl('diagram', 'Why coordination is needed', {
      v: vNeed,
      n: 'Three things make coordination necessary. As an organisation grows in size, more people with different needs must be kept on the same path. Functional differentiation creates separate departments that may chase their own targets. And specialists tend to trust their own judgement. Each of these pulls the organisation apart unless coordination pulls it together.',
    }),
    sl('two-column', 'The essence of management', {
      cols: ['**Not a separate function**\n\nIt is present in planning, organising, staffing, directing and controlling.', '**At every level**\n\nTop, middle and supervisory managers all coordinate their teams.'],
      v: vFunctions,
      n: 'Why is coordination called the essence of management? Because it is not one more function. It is the thread that runs through every function and every level. In planning, department plans must fit the master plan. In controlling, results are compared with shared standards. Without coordination, management would be a set of disconnected activities.',
    }),
    sl('example', 'Worked example 2: answering a case', {
      b: 'Case (imagined): sales promised 10,000 jars of pickle, but production had planned 6,000 because no one told them.',
      bl: ['Clue words: *promised*, *planned for only*, *no one told them*.', 'Concept: lack of **coordination** between departments.', 'Quote the line, name the concept, explain in one or two sentences.'],
      v: vCaseSteps,
      n: 'Here is how to tackle a case. Read what is asked. Find the clue words: sales promised one figure, production planned another, and nobody told them. Name the concept, which is a lack of coordination. Quote the line from the case, then explain in a sentence or two why it shows that concept. That is how marks are awarded.',
    }),
    sl('check', 'Quick check: science, art or profession', {
      b: 'Match each feature with science, art or profession.',
      chk: 'mt_science_art_prof',
      n: 'This one revises Part 1. For each feature, ask: is it about experiments, personal skill, or ethics and service?',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. There are three levels of management: top for strategy, middle as the link, and supervisory for the workers. All managers perform five functions: planning, organising, staffing, directing and controlling. Coordination is not a separate function but the essence of management, and its need grows with size, functional differentiation and specialisation.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Identify the **level** from the task, not the job title alone.', 'Never call coordination a separate function.', 'Reasons for coordination: **size, functional differentiation, specialisation**.', 'In cases: quote, name, explain.'],
      v: vCaseSteps,
      n: 'Final tips. Decide the level from what the person does. Never write that coordination is a separate function; write that it is the essence of management. Learn the three reasons for coordination. And in every case question, quote the line, name the concept and explain it. This simple routine earns full marks.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Nature and Significance of Management — notes',
  sections: [
    {
      h: '1. Meaning of management',
      t: 1,
      b: 'Management is a **process** of getting things done **with and through people** so that goals are reached **effectively and efficiently**.\n\n- **Effectiveness** — finishing the right task, on time (focus: result).\n- **Efficiency** — using the least resources for that result (focus: cost and waste).\n\nA unit can be effective without being efficient (target met, money wasted) or efficient without being effective (cheap, but late). Management seeks both.',
      terms: [['Effectiveness', 'Completing the task and achieving the target on time.'], ['Efficiency', 'Achieving the result with minimum cost and resources.']],
      v: vMatrix,
    },
    {
      h: '2. Objectives of management',
      t: 1,
      b: '- **Organisational:** survival (earn enough to cover costs), profit (reward for risk, funds for growth), growth (sales, employees, products, capital).\n- **Social:** benefit for society — quality goods at fair prices, environment-friendly methods, employment for disadvantaged sections, community welfare.\n- **Personal:** employees\' financial needs (pay), social needs (recognition, good relations) and higher needs (growth).\n\nIn a case, identify the objective from **whose need** is met.',
      terms: [['Social objective', 'Creating benefit for society beyond the firm\'s own gain.']],
      v: vObjectives,
    },
    {
      h: '3. Characteristics and importance',
      t: 1,
      b: '**Characteristics:** goal-oriented; pervasive (universal); multidimensional (work, people, operations); continuous; group activity; dynamic (adapts to change); intangible (felt through results).\n\n**Importance:** it achieves group goals; increases efficiency; creates a dynamic organisation; helps people reach personal objectives; helps develop society (quality goods, jobs, new technology).',
      terms: [['Pervasive', 'Present in every kind of organisation and in every country.'], ['Dynamic', 'Changing in response to the environment.']],
      v: vChar,
      vs: [vImportance],
    },
    {
      h: '4. Science, art or profession?',
      t: 2,
      b: '- **Science:** has systematic knowledge and principles built from observation, but results vary with people — an **inexact (soft) science**.\n- **Art:** theory exists, it is applied in a personal style, and skill grows with practice and creativity — management **is an art**.\n- **Profession:** body of knowledge (yes), restricted entry by law (no), association (exists, e.g. AIMA, but optional), ethical code (no legal force), service motive (yes) — **not a full profession**.',
      terms: [['Inexact science', 'A science whose principles do not give the same result every time because they involve human behaviour.']],
      v: vProf,
      vs: [vScience, vArt],
    },
    {
      h: '5. Levels and functions of management',
      t: 3,
      b: '**Levels:** top (chairperson, CEO, board: goals, strategy, survival, coordination of departments); middle (department heads: interpret policy, staffing, assigning duties, inter-department links); supervisory or operational (foremen, supervisors: oversee workers, quality, wastage, morale, pass problems up).\n\n**Functions:** planning (decide in advance), organising (divide work, give authority and resources), staffing (right people in the right jobs, training), directing (lead, motivate, communicate, supervise), controlling (measure, compare with standards, correct). All levels perform all functions; time spent differs.',
      terms: [['Supervisory management', 'The level of management that directly oversees operative workers.']],
      v: vPyramid,
      vs: [vLevelsTable, vFunctions],
    },
    {
      h: '6. Coordination',
      t: 4,
      b: '**Meaning:** synchronising the activities of departments and people for unity of action.\n\n**Characteristics:** integrates group efforts; ensures unity of action; continuous; all-pervasive; every manager\'s responsibility; deliberate.\n\n**Need:** growth in size, functional differentiation, specialisation.\n\n**Essence of management:** it is not a separate function but the binding force present in every function and at every level.',
      terms: [['Coordination', 'The deliberate synchronising of group efforts towards common goals.'], ['Functional differentiation', 'Division of an organisation into departments with their own objectives.']],
      v: vCoord,
      vs: [vCoordChar, vNeed],
    },
  ],
  tips: '**Common mistakes**\n- Using "efficient" when the case is about meeting a deadline (that is effectiveness).\n- Writing coordination as the sixth function.\n- Calling management a full profession, or an exact science.\n- Naming the level from a job title without reading what the person does.\n\n**How marks are usually awarded**\n- 1 mark: one correct option or one quoted line.\n- 3 marks: three points, or concept + quoted line + explanation.\n- 5 marks: five labelled points; in "evaluate" questions, a conclusion.\n- Cases: quote the line, name the concept, explain it.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Management**', 'Getting things done with and through others to achieve goals effectively and efficiently.', 'definition', 1],
  ['**Effectiveness**', 'Achieving the target on time; focus on the end result.', 'definition', 1],
  ['**Efficiency**', 'Achieving the result at minimum cost; focus on resources.', 'definition', 1],
  ['Target met, budget overshot', '**Effective but not efficient.**', 'example', 1],
  ['Three **organisational objectives**', 'Survival, profit, growth.', 'fact', 1],
  ['**Social objective**: one example', 'Treating factory waste before release; jobs for disadvantaged groups.', 'example', 1],
  ['**Personal objectives** cover', 'Employees\' financial, social and higher-level needs.', 'concept', 1],
  ['**Pervasive**', 'Management is used in all kinds of organisations everywhere.', 'definition', 1],
  ['**Multidimensional**', 'Management of work, people and operations.', 'concept', 1],
  ['**Dynamic** management', 'Adapts to changes in the environment.', 'concept', 1],
  ['**Intangible**', 'Management cannot be seen; its effects can be felt.', 'concept', 1],
  ['Five points of **importance**', 'Group goals; efficiency; dynamic organisation; personal objectives; development of society.', 'concept', 1],
  ['Management as **science**: verdict', 'Inexact (soft) science: principles involve human behaviour.', 'exam-tip', 2],
  ['Management as **art**: three features', 'Theory exists; personalised application; practice and creativity.', 'concept', 2],
  ['Profession feature **not met**', 'Restricted entry: no legal degree or licence needed to be a manager.', 'fact', 2],
  ['**AIMA**', 'All India Management Association: has a code of conduct, but membership is optional.', 'fact', 2],
  ['Is management a full profession?', 'No: it has some features (knowledge, service motive) but not all.', 'exam-tip', 2],
  ['**Top management**: who and what', 'Chairperson, CEO, board: goals, strategy, survival, coordinating departments.', 'concept', 3],
  ['**Middle management**: role', 'Link between top and supervisory: interpret policy, staff, assign duties.', 'concept', 3],
  ['**Supervisory management**: role', 'Oversee workers; quality, wastage, morale; pass problems upward.', 'concept', 3],
  ['Five **functions**', 'Planning, organising, staffing, directing, controlling.', 'fact', 3],
  ['**Controlling** in one line', 'Comparing actual performance with standards and correcting deviations.', 'definition', 3],
  ['Do supervisors plan?', 'Yes: all levels perform all functions; only time spent differs.', 'exam-tip', 3],
  ['**Coordination**', 'Synchronising activities of departments and people for unity of action.', 'definition', 4],
  ['Why "essence of management"?', 'It is not separate; it runs through every function and level.', 'concept', 4],
  ['Coordination is **deliberate**', 'Cooperation is not enough; a manager must consciously fit efforts together.', 'concept', 4],
  ['Three reasons coordination is needed', 'Growth in size, functional differentiation, specialisation.', 'fact', 4],
  ['Case routine', 'Quote the line, name the concept, explain it.', 'exam-tip', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-default-chapter-test-short',
  title: 'Chapter test (short) — Nature and Significance of Management',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_effective', 'm_pervasive', 'm_middle', 'ar_continuous'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–75 words.', items: ['s_pervasive', 's_top_fn', 's_coord_char'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 120 words.', items: [{ attempt: 1, keys: ['l_importance', 'l_coord'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the case and answer all parts. Part (c) has an internal choice.', items: ['cb_kaveri_levels'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-default-chapter-test-long',
  title: 'Chapter test (long) — Nature and Significance of Management',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_efficient', 'm_obj_social', 'm_dynamic', 'm_art', 'm_profession_lacking', 'm_supervisory', 'm_planning_fn', 'm_coord_case', 'ar_art', 'ar_coord'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–75 words. Questions 13 and 15 have an internal choice.', items: ['s_goal_oriented', 's_directing_org', { attempt: 1, keys: ['s_social_obj', 's_levels_time'] }, 's_eff_eff', { attempt: 1, keys: ['s_art', 's_middle_fn'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 120 words each.', items: ['l_profession', { attempt: 1, keys: ['l_functions', 'l_levels'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each case and answer all parts. Part (c) of each has an internal choice.', items: ['cb_two_managers', 'cb_konkan_coord'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 of cbse-12-business-studies-ch01 only (concept, objectives, importance and characteristics; science, art and profession; levels and functions; coordination)',
    originality: 'every firm, person and case is imagined and written by SOYL; no NCERT text, example or exercise and no board or sample-paper item reused (D-036)',
    data: 'efficiency figures computed in the build (Godavari Fans 54,000 ÷ 1,200 = 45 against 50 planned; four-unit verdict table; Malabar Coir 1,92,000 ÷ 8,000 = 24)',
    facts: 'AIMA has a voluntary code of conduct; no legal requirement of a degree or licence for managers',
    gate: 'schema, pipeline lint, deterministic verify, word limits, narration and answer-leak checks run clean in this build',
  },
});
