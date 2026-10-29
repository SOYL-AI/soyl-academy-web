// Build CBSE 12 Business Studies ch02 Principles of Management. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-12-business-studies-ch02/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-business-studies-ch02', 'economics-commerce');
const { DPW, DPW_A, DPW_B, DPW_GAP, DPC, DPC_RAVI, DPC_SUNIL, DPC_SUNIL_IF } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- worked-example figures (computed)
// Deck 2 worked example: an imagined Moradabad brassware unit, standard 30 pieces, ₹15 / ₹12.
const WE = { std: 30, high: 15, low: 12, meena: 33, tarun: 27 };
const WE_MEENA = WE.meena * WE.high; // 495
const WE_TARUN = WE.tarun * WE.low; // 324
const WE_TARUN_IF = WE.std * WE.high; // 450
if (WE_MEENA !== 495 || WE_TARUN !== 324 || WE_TARUN_IF !== 450 || WE_TARUN_IF - WE_TARUN !== 126) throw new Error('figure check failed');

// ---------------------------------------------------------------- visuals
const vRoute1 = flow('LR', ['What principles are', 'Their nature', 'Why they matter', 'Fayol: 14 principles', 'Applying them to cases'], 'Route map of Part 1: what principles of management are, their nature, why they matter, Fayol\'s fourteen principles, and applying them to cases', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Taylor and scientific management', 'Four principles', 'Techniques', 'Differential piece wage', 'Fayol and Taylor compared'], 'Route map of Part 2: Taylor and scientific management, its four principles, its techniques, the differential piece wage system, and a comparison of Fayol and Taylor', 'Part 2 at a glance');
const vWhatIs = table(
  ['', 'Principle of management', 'Technique of management'],
  [
    ['What it is', 'A broad, general guideline for decisions and behaviour', 'A procedure or method used to do a task'],
    ['Example', 'Unity of command: one boss for each employee', 'Time study: fixing the standard time of a job'],
    ['Role', 'Guides the choice and use of techniques', 'Is applied within the guideline'],
  ],
  'Table comparing a principle and a technique of management: a principle is a broad guideline such as unity of command; a technique is a method such as time study; principles guide how techniques are chosen and used',
);
const vNature = table(
  ['Feature', 'What it means', 'Imagined example'],
  [
    ['Universal applicability', 'Applies to every kind of organisation', 'A temple trust and a car maker both divide work'],
    ['General guidelines', 'Guide action; not ready-made answers', 'Two managers apply equity differently'],
    ['Formed by practice and experimentation', 'Grew from managers\' experience and tests', 'A bakery learns from trial batches'],
    ['Flexible', 'Adapted to the situation', 'Strict rules in a big plant, looser in a small one'],
    ['Mainly behavioural', 'Aim to influence people\'s behaviour', 'Team spirit in a call centre'],
    ['Cause and effect', 'Link actions to likely results', 'Fair pay leads to lower turnover'],
    ['Contingent', 'Use depends on the situation', 'More delegation as a firm grows'],
  ],
  'Table of the seven features of the nature of principles of management: universal applicability, general guidelines, formed by practice and experimentation, flexible, mainly behavioural, cause and effect, and contingent, each with its meaning and an imagined example',
);
const vSignificance = flow('TB', ['Useful insights into reality', 'Optimum use of resources and effective administration', 'Scientific decisions', 'Meeting a changing environment', 'Fulfilling social responsibility', 'Management training, education and research'], 'Flow listing six reasons why principles of management matter: insights into reality, optimum use of resources and effective administration, scientific decisions, meeting a changing environment, fulfilling social responsibility, and management training, education and research', 'Why principles matter');
const vFayol1 = table(
  ['Principle', 'In one line'],
  [
    ['1. Division of work', 'Split work into small tasks; specialisation raises efficiency'],
    ['2. Authority and responsibility', 'Keep the two in balance'],
    ['3. Discipline', 'Obey rules and agreements; both sides keep them'],
    ['4. Unity of command', 'One boss for each employee'],
    ['5. Unity of direction', 'One head, one plan for activities with one objective'],
    ['6. Subordination of individual interest', 'The organisation\'s interest comes first'],
    ['7. Remuneration of employees', 'Fair pay within the firm\'s capacity'],
  ],
  'Table of Fayol\'s principles one to seven: division of work, authority and responsibility, discipline, unity of command, unity of direction, subordination of individual interest to general interest, and remuneration of employees, each summarised in one line',
  'Fayol\'s principles (1–7)',
);
const vFayol2 = table(
  ['Principle', 'In one line'],
  [
    ['8. Centralisation and decentralisation', 'Find the right balance for the firm'],
    ['9. Scalar chain', 'Formal line of authority, top to bottom; gang plank in emergencies'],
    ['10. Order', 'A place for everything and everyone, and each in its place'],
    ['11. Equity', 'Kindliness and justice; no discrimination'],
    ['12. Stability of tenure of personnel', 'Do not move or remove employees too often'],
    ['13. Initiative', 'Encourage employees to suggest and carry out improvements'],
    ['14. Esprit de corps', 'Team spirit: we, not I'],
  ],
  'Table of Fayol\'s principles eight to fourteen: centralisation and decentralisation, scalar chain, order, equity, stability of tenure of personnel, initiative, and esprit de corps, each summarised in one line',
  'Fayol\'s principles (8–14)',
);
const vScalar = (() => {
  const s = new Svg(560, 330);
  const top = [280, 40];
  const L = [[200, 110], [160, 170], [120, 230], [80, 290]];
  const R = [[360, 110], [400, 170], [440, 230], [480, 290]];
  const names = { L: ['B', 'C', 'D', 'E'], R: ['F', 'G', 'H', 'I'] };
  const box = ([x, y], t, o = {}) => { s.rect(x - 22, y - 16, 44, 32, { rx: 6, sw: 1.6, ...o }); s.text(x, y, t, { bold: true, size: 15 }); };
  let prev = top;
  for (const p of L) { s.line(prev[0], prev[1] + 16, p[0], p[1] - 16, { sw: 1.6 }); prev = p; }
  prev = top;
  for (const p of R) { s.line(prev[0], prev[1] + 16, p[0], p[1] - 16, { sw: 1.6 }); prev = p; }
  box(top, 'A', { fill: 'fill' });
  L.forEach((p, i) => box(p, names.L[i]));
  R.forEach((p, i) => box(p, names.R[i]));
  s.line(L[2][0] + 22, L[2][1], R[2][0] - 22, R[2][1], { color: 'accent', dash: true, sw: 2.4 });
  s.text(280, L[2][1] - 12, 'Gang plank D to H', { color: 'accent', size: 13 });
  s.text(280, 312, 'Normal route D to H: up to A and down again', { size: 12, muted: true });
  return s.visual(
    'Scalar chain diagram: A at the top, with one chain B, C, D, E going down on the left and another F, G, H, I on the right. A dashed accent line joins D and H directly, labelled gang plank D to H; normally a message from D to H would go up to A and down again',
    'Imagined organisation: the gang plank is used only in an emergency, with superiors informed.',
  );
})();
const vCommandDirection = table(
  ['Basis', 'Unity of command', 'Unity of direction'],
  [
    ['Meaning', 'One boss for each employee', 'One head and one plan for a group of activities with one objective'],
    ['Aim', 'Prevent dual subordination', 'Prevent overlapping; secure coordination'],
    ['Concerns', 'The individual employee', 'The organisation or a division as a whole'],
  ],
  'Table distinguishing unity of command from unity of direction: the first means one boss for each employee, aims to prevent dual subordination and concerns the individual; the second means one head and one plan for activities with one objective, aims at coordination and concerns the organisation',
);
const vCaseMethod = flow('LR', ['Read the case; underline key lines', 'Match each line to one principle', 'Name the principle exactly', 'Quote the line and explain in one sentence'], 'Flow of the method for case questions: read the case and underline key lines, match each line to one principle, name the principle exactly, then quote the line and explain it in one sentence', 'How to answer a case question');
const vCaseWE = table(
  ['Line in the case (imagined Indore printing press)', 'Principle', 'Why'],
  [
    ['Each press operator reports only to the floor in-charge', 'Unity of command', 'One boss per employee'],
    ['Paper rolls are stacked in marked racks', 'Order', 'A place for everything'],
    ['Operators who suggest faster changeovers get a bonus', 'Initiative', 'Suggestions encouraged'],
    ['The owner calls the team "the Press Family" at every meeting', 'Esprit de corps', 'Team spirit: we, not I'],
  ],
  'Worked example table for an imagined printing press in Indore: reporting to one in-charge shows unity of command, marked racks show order, bonuses for suggestions show initiative, and calling the team a family shows esprit de corps',
  'Worked example: identifying principles from case lines',
);
const vUnityWE = table(
  ['Situation (imagined Patna snack maker)', 'Principle', 'Followed or violated?'],
  [
    ['Namkeen and sweets have separate heads and plans', 'Unity of direction', 'Followed'],
    ['A packer gets orders from both heads', 'Unity of command', 'Violated'],
  ],
  'Worked example table for an imagined snack maker in Patna: separate heads and plans for namkeen and sweets follow unity of direction, but a packer taking orders from both heads violates unity of command',
  'One firm can follow one principle and break the other',
);
const vSummary1 = table(
  ['Remember', 'Key words'],
  [
    ['Nature (7)', 'Universal, guidelines, practice, flexible, behavioural, cause and effect, contingent'],
    ['Significance (6)', 'Insights, resources, scientific decisions, change, social responsibility, training'],
    ['Fayol (14)', 'Division, authority, discipline, command, direction, subordination, remuneration, centralisation, scalar chain, order, equity, stability, initiative, esprit de corps'],
  ],
  'Summary table: seven features of principles, six reasons for their significance, and the key words for Fayol\'s fourteen principles',
);
const vTaylorPrinciples = table(
  ['Principle of scientific management', 'Meaning'],
  [
    ['Science, not rule of thumb', 'Study each job to find the one best way'],
    ['Harmony, not discord', 'End conflict through a mental revolution; share gains'],
    ['Cooperation, not individualism', 'Managers and workers work together; workers\' suggestions welcomed'],
    ['Development of each and every person', 'Scientific selection, placement and training for greatest efficiency'],
  ],
  'Table of Taylor\'s four principles: science not rule of thumb, harmony not discord, cooperation not individualism, and development of each and every person to greatest efficiency and prosperity',
);
const vMental = flow('LR', ['Old attitude: fight over the share of surplus', 'Mental revolution', 'Both raise the surplus together', 'Higher wages and higher profits'], 'Flow of the mental revolution: from fighting over the share of the surplus, both sides change attitude, raise the surplus together and enjoy higher wages and profits', 'Harmony, not discord');
const vForeman = (() => {
  const s = new Svg(620, 300);
  const box = (x, y, w, t, o = {}) => { s.rect(x - w / 2, y - 16, w, 32, { rx: 6, sw: 1.5, ...o }); s.text(x, y, t, { size: 12, bold: !!o.bold }); };
  box(310, 30, 150, 'Factory manager', { fill: 'fill', bold: true });
  box(155, 100, 150, 'Planning in-charge', { bold: true });
  box(465, 100, 160, 'Production in-charge', { bold: true });
  s.line(310, 46, 155, 84, { sw: 1.5 }); s.line(310, 46, 465, 84, { sw: 1.5 });
  const P = ['Route clerk', 'Instruction card clerk', 'Time and cost clerk', 'Disciplinarian'];
  const D = ['Speed boss', 'Gang boss', 'Repair boss', 'Inspector'];
  P.forEach((t, i) => { const y = 160 + i * 36; s.line(60, 116, 60, y, { sw: 1.2, muted: true }); s.line(60, y, 80, y, { sw: 1.2 }); s.text(86, y, t, { anchor: 'start', size: 12 }); });
  D.forEach((t, i) => { const y = 160 + i * 36; s.line(390, 116, 390, y, { sw: 1.2 }); s.line(390, y, 410, y, { sw: 1.2 }); s.text(416, y, t, { anchor: 'start', size: 12, color: 'accent' }); });
  return s.visual(
    'Chart of functional foremanship: the factory manager has a planning in-charge, over the route clerk, instruction card clerk, time and cost clerk and disciplinarian, and a production in-charge, over the speed boss, gang boss, repair boss and inspector',
    'Eight specialist foremen: four plan, four supervise production.',
  );
})();
const vForemanRoles = table(
  ['Foreman', 'Job'],
  [
    ['Route clerk', 'Fixes the sequence of operations'],
    ['Instruction card clerk', 'Prepares written instructions for workers'],
    ['Time and cost clerk', 'Prepares time and cost sheets'],
    ['Disciplinarian', 'Sees that rules and regulations are followed'],
    ['Speed boss', 'Sees that work is done on time and at the right speed'],
    ['Gang boss', 'Keeps machines, tools and materials ready'],
    ['Repair boss', 'Keeps machines in working order'],
    ['Inspector', 'Checks the quality of work'],
  ],
  'Table of the eight specialist foremen and their jobs: route clerk, instruction card clerk, time and cost clerk, disciplinarian, speed boss, gang boss, repair boss and inspector',
);
const vStudies = table(
  ['Technique', 'Question it answers', 'Imagined example'],
  [
    ['Method study', 'What is the one best way to do the whole job?', 'Choosing a packing sequence at a dairy'],
    ['Motion study', 'Which movements can be removed?', 'Cutting needless hand movements in stitching'],
    ['Time study', 'What is the standard time for the job?', 'Four minutes to fit a phone screen'],
    ['Fatigue study', 'How much rest, and how often?', 'A break every 90 minutes at a kiln'],
  ],
  'Table of four work studies: method study finds the best way, motion study removes needless movements, time study fixes the standard time, and fatigue study fixes rest intervals, each with an imagined example',
);
const vStdSimp = table(
  ['', 'Standardisation', 'Simplification'],
  [
    ['Meaning', 'Fixed standards for process, materials, tools, time and quality', 'Removing unnecessary varieties, sizes and grades'],
    ['Aim', 'Uniform output, interchangeable parts', 'Lower cost, fuller use of machines'],
    ['Imagined example', 'One recipe and weight for every biscuit packet', 'Cutting tin sizes from fourteen to five'],
  ],
  'Table comparing standardisation, which fixes standards for process, materials, tools, time and quality, with simplification, which removes unnecessary varieties to cut costs',
);
const vDpwRule = flow('LR', ['Time study fixes the standard output', 'Output at or above the standard: higher rate per piece', 'Output below the standard: lower rate per piece', 'Efficient workers rewarded; others try to reach the standard'], 'Flow of the differential piece wage system: time study fixes the standard; at or above it a higher rate applies, below it a lower rate, which rewards efficient workers and motivates others', 'Differential piece wage system');
const vDpwWE = (() => {
  const s = new Svg(520, 280);
  const c = s.chart({ x1: 4, y1: 560, left: 70, top: 30, width: 400, height: 200, xLabel: 'Worker', yLabel: 'Earnings for the day (₹)' });
  const bars = [[1, WE_MEENA, 'Meena'], [2, WE_TARUN, 'Tarun'], [3, WE_TARUN_IF, 'Tarun at standard']];
  for (const [x, v, name] of bars) {
    s.rect(c.X(x) - 30, c.Y(v), 60, c.Y(0) - c.Y(v), { rx: 0, fill: x === 2 ? 'muted' : 'accent', fillOpacity: 0.85, stroke: false });
    s.text(c.X(x), c.Y(v) - 10, `₹${v}`, { size: 12, bold: true });
    s.text(c.X(x), c.Y(0) + 16, name, { size: 12 });
  }
  c.yTick(250, '250').yTick(500, '500');
  return s.visual(
    `Bar chart of daily earnings at an imagined brassware unit: Meena ${WE.meena} pieces at ${WE.high} rupees earns ${WE_MEENA}; Tarun ${WE.tarun} pieces at ${WE.low} rupees earns ${WE_TARUN}; if Tarun reached the standard of ${WE.std} he would earn ${WE_TARUN_IF}`,
    `Imagined Moradabad brassware unit: standard ${WE.std} pieces; ₹${WE.high} at or above, ₹${WE.low} below.`,
  );
})();
const vDpwTable = table(
  ['Worker', 'Pieces', 'Rate applied (₹)', 'Earnings (₹)'],
  [
    ['Meena', String(WE.meena), `${WE.high} (at or above ${WE.std})`, String(WE_MEENA)],
    ['Tarun', String(WE.tarun), `${WE.low} (below ${WE.std})`, String(WE_TARUN)],
    ['Tarun, if he made 30', String(WE.std), String(WE.high), String(WE_TARUN_IF)],
  ],
  `Worked example table: Meena makes ${WE.meena} pieces at ${WE.high} rupees, earning ${WE_MEENA}; Tarun makes ${WE.tarun} at ${WE.low}, earning ${WE_TARUN}; at ${WE.std} pieces Tarun would earn ${WE_TARUN_IF}`,
  'Worked example 1 (imagined figures)',
);
const vProblemsWE = table(
  ['Problem at an imagined Kanpur leather unit', 'Technique', 'Why'],
  [
    ['Each worker cuts leather in his own way', 'Method study and standardisation', 'Find and fix the one best way'],
    ['Workers walk to a far rack for every cut', 'Motion study', 'Remove needless movements'],
    ['No one knows how long a bag should take', 'Time study', 'Fix the standard time'],
    ['Output drops sharply after lunch', 'Fatigue study', 'Plan rest breaks'],
  ],
  'Worked example table for an imagined leather unit in Kanpur: differing methods call for method study and standardisation, needless walking for motion study, unknown job time for time study, and a fall in output after lunch for fatigue study',
  'Worked example 2: matching problems to techniques',
);
const vCompare = table(
  ['Basis', 'Fayol', 'Taylor'],
  [
    ['Perspective', 'Top management', 'Shop floor (supervisory level)'],
    ['Unity of command', 'Followed strictly', 'Broken by functional foremanship'],
    ['Applicability', 'Universal', 'Specialised situations'],
    ['Basis of ideas', 'Personal experience', 'Observation and experiments'],
    ['Focus', 'Improving overall administration', 'Raising productivity'],
    ['Known as', 'Father of general management', 'Father of scientific management'],
  ],
  'Table comparing Fayol and Taylor: Fayol took a top-management view, followed unity of command, gave universal principles from experience and focused on administration; Taylor worked from the shop floor, broke unity of command, gave principles for specialised situations from experiments and focused on productivity',
);
const vSummary2 = table(
  ['Remember', 'Key words'],
  [
    ['Taylor\'s principles (4)', 'Science; harmony; cooperation; development of each person'],
    ['Techniques', 'Functional foremanship; standardisation and simplification; method, motion, time and fatigue study; differential piece wage'],
    ['Foremen (8)', 'Route, instruction card, time and cost, disciplinarian; speed, gang, repair, inspector'],
  ],
  'Summary table of Taylor\'s four principles, his techniques and the eight foremen',
);

// ---------------------------------------------------------------- deck 1
const part1 = deck({
  part: 1,
  title: 'Principles of Management — Part 1: Nature, Significance and Fayol',
  goals: [
    'Explain the meaning and the nature of principles of management',
    'Explain why principles of management are significant',
    'Explain Fayol\'s fourteen principles and identify them in business situations',
    'Distinguish between unity of command and unity of direction',
  ],
  slides: [
    sl('title', 'Principles of Management', {
      b: 'Part 1 — what principles are, their **nature** and **significance**, and **Fayol\'s fourteen principles**.',
      v: vRoute1,
      n: 'Welcome. Every manager, whether she runs a school canteen or a steel plant, faces the same questions. Who should report to whom? How should work be divided? How do we treat people fairly? Over the years, managers have collected answers to such questions as general rules called principles of management. In this part we see what they are, why they matter, and the fourteen principles given by Henri Fayol.',
    }),
    sl('concept', 'What is a principle of management?', {
      b: 'A **principle of management** is a broad, general **guideline** for decision-making and behaviour. It is not a technique and not a value.',
      v: vWhatIs,
      n: 'A principle of management is a broad and general guideline for making decisions and for behaviour at work. Do not confuse it with a technique. A technique is a method for doing a task, such as time study. A principle is wider: it guides how we choose and use techniques. For example, unity of command tells us that each employee should have one boss.',
    }),
    sl('diagram', 'Nature of principles', {
      v: vNature,
      n: 'Principles of management have seven features. They apply to all organisations. They are general guidelines, not ready-made answers. They were formed by practice and experiments. They are flexible and are mainly about human behaviour. They show a cause and effect link between action and result. And they are contingent, which means their use depends on the situation. Learn each feature with a short example.',
    }),
    sl('check', 'Quick check: which feature?', {
      b: 'A hospital, a software firm and a cricket academy all use the same principles. Which feature is this?',
      chk: 'm_universal',
      n: 'Here is a quick check. Ask yourself whether the example is about where principles apply, how they work, or when they work.',
    }),
    sl('diagram', 'Significance of principles', {
      v: vSignificance,
      n: 'Why should managers study principles? First, they give useful insights into reality, so a manager can foresee problems. Second, they help use resources well and make administration impersonal and fair. Third, they lead to scientific decisions based on reasoning. Fourth, they help firms adjust to change. Fifth, they guide social responsibility, such as fair wages. Sixth, they are the base of management training and research.',
    }),
    sl('concept', 'Fayol and his fourteen principles', {
      b: 'Henri Fayol, a French mining engineer and manager, wrote about general management from the point of view of **top management**. His principles came from his **personal experience**.',
      bl: ['Known as the **father of general management**.', 'Gave **fourteen** principles that apply to all organisations.'],
      v: vFayol1,
      n: 'Henri Fayol was a French engineer who rose to head a large mining company. He studied management from the top, using his own long experience, and he is called the father of general management. He gave fourteen principles. This table shows the first seven: division of work, authority and responsibility, discipline, unity of command, unity of direction, subordination of individual interest, and fair remuneration.',
    }),
    sl('diagram', 'Fayol\'s principles 8 to 14', {
      v: vFayol2,
      n: 'Here are the other seven. Centralisation and decentralisation need a balance. The scalar chain is the formal line of authority. Order means a place for everything and everyone. Equity means fairness without discrimination. Stability of tenure means employees should not be moved too often. Initiative means encouraging suggestions. And esprit de corps means team spirit.',
    }),
    sl('concept', 'Unity of command', {
      b: 'Each employee should receive orders from **one superior only**.',
      bl: ['Two bosses → **dual subordination**: confusion, conflict, weak discipline.', 'Example: a carpenter told by two supervisors to do opposite things.'],
      v: flow('LR', ['Two bosses give orders to one worker', 'Orders conflict', 'Worker is confused', 'Discipline and output suffer'], 'Flow showing what happens when unity of command is violated: two bosses give conflicting orders, the worker is confused, and discipline and output suffer', 'When unity of command is broken'),
      n: 'Unity of command says that every employee should take orders from only one boss. When two bosses give orders, the worker does not know whom to obey, especially if the orders conflict. This is called dual subordination. It causes confusion, weakens discipline and lowers output. In case questions, look for one person getting instructions from two people.',
    }),
    sl('check', 'Quick check: two supervisors', {
      b: 'A carpenter is given conflicting orders by two supervisors. Which principle is violated?',
      chk: 'm_unity_command',
      n: 'Try this one. Count how many people are giving orders to the carpenter.',
    }),
    sl('two-column', 'Unity of command vs unity of direction', {
      cols: ['**Unity of command**\n\nOne boss for each **employee**.', '**Unity of direction**\n\nOne head and one plan for each **group of activities** with the same objective.'],
      v: vCommandDirection,
      n: 'Students often mix up these two. Unity of command is about one employee and one boss. Unity of direction is about a group of activities with the same objective, which should have one head and one plan. The first prevents dual subordination. The second prevents overlapping work and helps coordination. One concerns the individual, the other the organisation.',
    }),
    sl('example', 'Worked example 1: one firm, two principles', {
      b: 'An imagined snack maker in Patna has separate heads and plans for namkeen and sweets, but one packer takes orders from both heads.',
      bl: ['Step 1 — Separate heads and plans for each product line: **unity of direction followed**.', 'Step 2 — One packer, two heads: **unity of command violated**.', 'Step 3 — Fix: each packer reports to one head only.'],
      v: vUnityWE,
      n: 'Let us apply the difference. The snack maker has one head and one plan for namkeen and another for sweets, so unity of direction is followed. But one packer takes orders from both heads, so unity of command is violated. A firm can follow one principle and break the other at the same time. The fix is simple: each packer reports to only one head.',
    }),
    sl('diagram', 'Scalar chain and the gang plank', {
      v: vScalar,
      n: 'The scalar chain is the formal line of authority from the top to the bottom. Normally, if D wants to talk to H, the message goes up to A and comes down the other side. That is slow. In an emergency, Fayol allowed a gang plank, a direct link between D and H at the same level, provided both inform their superiors. The chain is still respected.',
    }),
    sl('check', 'Quick check: the place for everything', {
      b: 'Every bin is labelled and every worker has a fixed workstation. Which principle is this?',
      chk: 'm_order',
      n: 'Quick check. Think about which principle is about places for things and people.',
    }),
    sl('concept', 'Fair treatment: equity, remuneration, discipline', {
      bl: [
        '**Equity:** kindliness and justice; no discrimination on religion, caste, gender, language or region.',
        '**Remuneration:** fair pay, a reasonable standard of living, within the firm\'s capacity.',
        '**Discipline:** obedience to rules and agreements, needing good superiors, clear agreements and fair penalties.',
      ],
      v: table(['Principle', 'Violated when…'], [['Equity', 'Promotions go only to relatives'], ['Remuneration', 'Pay is far below the area'], ['Discipline', 'Management breaks the wage agreement']], 'Table of three fairness principles and how they are violated: equity when promotions go only to relatives, remuneration when pay is far below the area, discipline when management breaks the wage agreement'),
      n: 'Three principles are about fair treatment. Equity means kindness and justice, with no discrimination. Remuneration means pay that is fair to workers and that the firm can afford. Discipline means both sides obey rules and agreements. Notice that discipline is not only for workers: if management breaks its own promises, discipline breaks down too.',
    }),
    sl('concept', 'People and team: stability, initiative, esprit de corps', {
      bl: [
        '**Stability of tenure:** do not move or remove staff too often; they need time to learn.',
        '**Initiative:** encourage suggestions, for example through a suggestion box with rewards.',
        '**Esprit de corps:** build team spirit; say **we**, not **I**.',
      ],
      v: flow('LR', ['Stable jobs', 'Freedom to suggest', 'Team spirit', 'Committed, productive employees'], 'Flow showing that stable jobs, freedom to suggest and team spirit together lead to committed and productive employees', 'Principles that build commitment'),
      n: 'The last group of principles builds commitment. Stability of tenure means people are not moved or removed too often, because they need time to learn the job. Initiative means encouraging employees to suggest and carry out improvements. Esprit de corps means team spirit. A manager who says we instead of I, and shares credit, builds it.',
    }),
    sl('diagram', 'How to answer a case question', {
      v: vCaseMethod,
      n: 'Board papers love short cases. Use a four step method. Read the case and underline the key lines. Match each line to exactly one principle. Write the name of the principle in full. Then quote the line from the case and explain it in one sentence. Marks are given for the correct name and for the link to the case.',
    }),
    sl('example', 'Worked example 2: spotting principles in a case', {
      b: 'An imagined printing press in Indore. Identify the principle in each line.',
      bl: ['Step 1 — Underline: one in-charge; marked racks; bonus for suggestions; the Press Family.', 'Step 2 — Match each line to a principle.', 'Step 3 — Quote and explain.'],
      v: vCaseWE,
      n: 'Let us practise the method on an imagined printing press. Operators report only to the floor in charge: unity of command. Paper rolls are stacked in marked racks: order. Operators who suggest faster changeovers get a bonus: initiative. The owner calls the team the press family: esprit de corps. Notice how each line points to one principle only.',
    }),
    sl('check', 'Quick check: true or false?', {
      b: 'Under the gang plank, the two employees\' superiors must be kept informed. True or false?',
      chk: 'tf_gangplank',
      n: 'One more check. Remember why Fayol allowed the gang plank, and what he did not want to lose.',
    }),
    sl('summary', 'Summary', {
      v: vSummary1,
      n: 'To sum up. A principle is a broad guideline. Principles have seven features and six kinds of significance. Fayol gave fourteen principles from the point of view of top management. Remember the difference between unity of command and unity of direction, and the gang plank as an emergency short cut in the scalar chain.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Write the **full name** of the principle: "subordination of individual interest to general interest", not just "subordination".',
        'In cases, **quote the line** and then explain; one principle per line.',
        'Equity is **fairness**, not equal pay.',
        'Discipline binds **both** management and workers.',
        'For differences, use **bases** (meaning, aim, concerns) and write both sides for each.',
      ],
      v: table(['Marks', 'What to write'], [['1', 'Name of the principle or feature'], ['3', 'Three points, or principle + line + explanation'], ['5', 'Five points or five bases, each explained']], 'Table of how marks are awarded: one mark for the name, three marks for three points or a principle with quoted line and explanation, five marks for five explained points or bases'),
      n: 'Some exam tips. Always write the full name of a principle. In case questions, quote the line and explain, one principle per line. Remember that equity means fairness, not equal pay, and that discipline binds management too. For differences, choose clear bases and write both sides for each one.',
    }),
  ],
});

// ---------------------------------------------------------------- deck 2
const part2 = deck({
  part: 2,
  title: 'Principles of Management — Part 2: Taylor\'s Scientific Management',
  goals: [
    'Explain Taylor\'s four principles of scientific management',
    'Explain the techniques of scientific management, including functional foremanship',
    'Calculate earnings under the differential piece wage system',
    'Compare the contributions of Fayol and Taylor',
  ],
  slides: [
    sl('title', 'Scientific management', {
      b: 'Part 2 — **F. W. Taylor**, the four **principles** and the **techniques** of scientific management.',
      v: vRoute2,
      n: 'Welcome to part two. Frederick Winslow Taylor was an American engineer who worked his way up on the shop floor. He asked a simple question: is there one best way to do each job? His answer, built from careful observation and experiments, is called scientific management. We will study his four principles, his techniques and a simple wage calculation.',
    }),
    sl('concept', 'What is scientific management?', {
      b: 'Knowing exactly what you want people to do, and seeing that they do it in the **best and cheapest** way.',
      bl: ['Taylor is called the **father of scientific management**.', 'Based on **observation and experiments** at the shop floor.'],
      v: flow('LR', ['Old way: rule of thumb, habit and guesswork', 'Study the job scientifically', 'One best way', 'Higher output at lower cost'], 'Flow from the old way of rule of thumb and guesswork, through scientific study of the job, to one best way and higher output at lower cost', 'From rule of thumb to science'),
      n: 'Scientific management means deciding exactly what each worker should do, and seeing that it is done in the best and cheapest way. Before Taylor, most factories ran on rule of thumb, that is, habit and guesswork. Taylor replaced guesswork with study and experiment, so that every job had one best method.',
    }),
    sl('diagram', 'The four principles', {
      v: vTaylorPrinciples,
      n: 'Taylor gave four principles. Science, not rule of thumb: study each job to find the best way. Harmony, not discord: management and workers should stop fighting. Cooperation, not individualism: they should work together and share ideas. And development of each and every person: select, place and train every worker scientifically to reach the greatest efficiency.',
    }),
    sl('diagram', 'Harmony and the mental revolution', {
      v: vMental,
      n: 'Taylor believed that managers and workers often fought over how to divide the surplus. He called for a mental revolution, a complete change of attitude on both sides. Instead of fighting over the size of each share, they should work together to make the surplus bigger. Then both wages and profits can rise.',
    }),
    sl('check', 'Quick check: name the technique', {
      b: 'A consultant films stitchers and removes three needless hand movements. Which technique is this?',
      chk: 'm_motion',
      n: 'Quick check. Is the consultant fixing time, fixing rest, or removing movements?',
    }),
    sl('diagram', 'Functional foremanship', {
      v: vForeman,
      n: 'Taylor felt that one foreman could not be expert in everything. So he separated planning from doing and gave each worker eight specialist foremen. Four work under the planning in charge: the route clerk, instruction card clerk, time and cost clerk, and disciplinarian. Four work under the production in charge: the speed boss, gang boss, repair boss and inspector.',
    }),
    sl('concept', 'Who does what?', {
      v: vForemanRoles,
      n: 'Here are the jobs. The route clerk fixes the sequence of work. The instruction card clerk writes the instructions. The time and cost clerk prepares time and cost sheets. The disciplinarian enforces rules. On the production side, the speed boss keeps work on time, the gang boss keeps machines and tools ready, the repair boss maintains machines, and the inspector checks quality.',
    }),
    sl('check', 'Quick check: how many foremen?', {
      b: 'How many specialist foremen did Taylor propose in all?',
      chk: 'm_foreman_count',
      n: 'A quick one. Count both sides of the chart.',
    }),
    sl('diagram', 'Standardisation and simplification', {
      v: vStdSimp,
      n: 'Standardisation means fixing standards for every part of the work: the process, materials, tools, time and quality. Simplification means removing unnecessary variety, such as extra sizes and grades, which only add cost. Together they cut waste, make parts interchangeable and allow fuller use of machines.',
    }),
    sl('diagram', 'Four work studies', {
      v: vStudies,
      n: 'Taylor used four kinds of study. Method study finds the one best way to do the whole job. Motion study removes needless movements. Time study fixes the standard time for a job, which helps in planning and in deciding wages. Fatigue study fixes how much rest is needed and how often, so that workers keep their energy.',
    }),
    sl('diagram', 'Differential piece wage system', {
      v: vDpwRule,
      n: 'Time study gives a standard output. Under the differential piece wage system, a worker who reaches or beats the standard is paid a higher rate for every piece. A worker below the standard gets a lower rate. The difference is meant to reward efficient workers and to push others to reach the standard.',
    }),
    sl('example', 'Worked example 1: calculating earnings', {
      b: `Imagined Moradabad brassware unit: standard **${WE.std}** pieces a day; **₹${WE.high}** a piece at or above the standard, **₹${WE.low}** below it.`,
      bl: [
        `Step 1 — Meena makes ${WE.meena} (at or above ${WE.std}): ${WE.meena} × ${WE.high} = **₹${WE_MEENA}**.`,
        `Step 2 — Tarun makes ${WE.tarun} (below ${WE.std}): ${WE.tarun} × ${WE.low} = **₹${WE_TARUN}**.`,
        `Step 3 — If Tarun made ${WE.std}: ${WE.std} × ${WE.high} = **₹${WE_TARUN_IF}**, that is ₹${WE_TARUN_IF - WE_TARUN} more.`,
      ],
      v: vDpwTable,
      n: 'Let us calculate. The standard is thirty pieces. Meena makes thirty three, which is above the standard, so she gets fifteen rupees a piece: four hundred and ninety five rupees. Tarun makes twenty seven, below the standard, so he gets twelve rupees a piece: three hundred and twenty four rupees. If Tarun made just three more pieces, he would earn four hundred and fifty rupees. That jump is the incentive.',
    }),
    sl('diagram', 'Seeing the incentive', {
      v: vDpwWE,
      n: 'The chart shows the same figures. Meena earns the most. Tarun earns much less, partly because he made fewer pieces and partly because the lower rate applies. If he reached the standard, his earnings would rise sharply. This is why Taylor believed the system would motivate workers.',
    }),
    sl('check', 'Quick check: earnings below the standard', {
      b: `Standard ${DPW.std} pieces; ₹${DPW.high} at or above, ₹${DPW.low} below. What does a worker earn for ${DPW.b} pieces?`,
      chk: 'num_dpw_low',
      n: 'Try this calculation. First decide which rate applies, then multiply.',
    }),
    sl('example', 'Worked example 2: matching problems to techniques', {
      b: 'An imagined leather unit in Kanpur has four problems. Suggest a technique for each.',
      bl: ['Step 1 — Identify what is going wrong in each line.', 'Step 2 — Ask which study answers that question.', 'Step 3 — Name the technique and give the reason.'],
      v: vProblemsWE,
      n: 'Here is a typical application question. Workers cut leather in different ways, so use method study and standardisation to fix one best way. Workers walk to a far rack for every cut, so use motion study. Nobody knows how long a bag should take, so use time study. Output drops after lunch, so use fatigue study to plan rest breaks.',
    }),
    sl('check', 'Quick check: match the techniques', {
      b: 'Match each technique with what it decides at a bicycle factory.',
      chk: 'mt_taylor',
      n: 'Last check. Match each technique to the question it answers.',
    }),
    sl('diagram', 'Fayol and Taylor compared', {
      v: vCompare,
      n: 'Finally, compare the two pioneers. Fayol looked from the top, Taylor from the shop floor. Fayol insisted on unity of command, while Taylor\'s functional foremanship gives a worker eight bosses. Fayol\'s principles are universal, Taylor\'s suit special situations. Fayol drew on experience, Taylor on experiments. Fayol aimed at better administration, Taylor at higher productivity. Their ideas complement each other.',
    }),
    sl('summary', 'Summary', {
      v: vSummary2,
      n: 'To sum up. Taylor gave four principles: science, harmony, cooperation and development of each person. His techniques are functional foremanship, standardisation and simplification, method, motion, time and fatigue studies, and the differential piece wage system. Remember the eight foremen in two groups of four.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Do not mix up **motion study** (movements) and **time study** (standard time).',
        'Write the eight foremen under the **right** in-charge.',
        'In wage questions, first check the **standard**, then pick the rate, then multiply; show each step.',
        'Mental revolution belongs to **harmony, not discord**.',
        'For Fayol vs Taylor, functional foremanship **violates** unity of command.',
      ],
      v: table(['Common slip', 'Correct idea'], [['Simplification = standardisation', 'Simplification removes varieties; standardisation fixes standards'], ['Speed boss checks quality', 'The inspector checks quality'], ['Lower rate for all pieces above standard', 'Higher rate when output is at or above the standard']], 'Table of common slips and the correct ideas: simplification is not standardisation; the inspector, not the speed boss, checks quality; the higher rate applies at or above the standard'),
      n: 'Some exam tips. Keep motion study and time study apart. Put the eight foremen under the correct in charge. In wage questions, check the standard first, then choose the rate, and show every step. Remember that the mental revolution goes with harmony, and that functional foremanship breaks unity of command.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Principles of Management — Notes',
  sections: [
    {
      h: '1. Meaning and nature of principles of management',
      t: 1,
      b: 'A **principle of management** is a broad, general guideline for decision-making and behaviour. It differs from a **technique** (a method for doing a task) and from a **value** (a moral belief).\n\n**Nature (seven features):**\n1. **Universal applicability:** all organisations, business and non-business, large and small.\n2. **General guidelines:** not ready-made solutions; applied with judgement.\n3. **Formed by practice and experimentation.**\n4. **Flexible:** adapted to the situation.\n5. **Mainly behavioural:** aim to influence how people behave.\n6. **Cause and effect relationship:** link actions to likely results.\n7. **Contingent:** their use depends on the situation.',
      terms: [
        ['Principle of management', 'A broad, general guideline for decisions and behaviour of managers.'],
        ['Contingent', 'Depending on the situation in which a principle is applied.'],
      ],
      v: vNature,
    },
    {
      h: '2. Significance of principles of management',
      t: 1,
      b: '1. **Useful insights into reality:** managers understand situations better and foresee problems.\n2. **Optimum use of resources and effective administration:** less trial and error; impersonal, fair administration.\n3. **Scientific decisions:** based on objective reasoning, not bias.\n4. **Meeting a changing environment:** flexible principles help firms adapt to new technology and competition.\n5. **Fulfilling social responsibility:** for example, fair pay and fair treatment.\n6. **Management training, education and research:** principles are the base of management studies.',
      terms: [['Impersonal administration', 'Decisions based on rules and reasoning rather than personal likes and dislikes.']],
      v: vSignificance,
    },
    {
      h: '3. Fayol\'s principles of management',
      t: 2,
      b: 'Henri Fayol (French mining engineer and manager; **father of general management**) gave fourteen principles from the point of view of **top management**, based on his **experience**.\n\n1. **Division of work** — specialisation. 2. **Authority and responsibility** — balance. 3. **Discipline** — obedience to rules and agreements by both sides; needs good superiors, clear agreements, judicious penalties. 4. **Unity of command** — one boss per employee. 5. **Unity of direction** — one head, one plan for activities with one objective. 6. **Subordination of individual interest to general interest.** 7. **Remuneration of employees** — fair, within paying capacity. 8. **Centralisation and decentralisation** — balance. 9. **Scalar chain** — formal line of authority; **gang plank** for emergencies, superiors informed. 10. **Order** — a place for everything and everyone. 11. **Equity** — kindliness and justice, no discrimination. 12. **Stability of tenure of personnel.** 13. **Initiative** — suggestions encouraged. 14. **Esprit de corps** — team spirit.',
      terms: [
        ['Dual subordination', 'An employee receiving orders from two superiors, against unity of command.'],
        ['Gang plank', 'A direct link between two employees at the same level for quick communication in an emergency.'],
        ['Esprit de corps', 'Team spirit and unity among employees.'],
      ],
      v: vFayol1,
      vs: [vFayol2, vScalar],
    },
    {
      h: '4. Unity of command and unity of direction',
      t: 2,
      b: '| Basis | Unity of command | Unity of direction |\n|---|---|---|\n| Meaning | One superior for each employee | One head and one plan for a group of activities with the same objective |\n| Aim | Prevent dual subordination | Prevent overlapping; coordination |\n| Concerns | Individual employee | Organisation or division |\n\nA firm can follow one and violate the other (see the Patna snack maker in the deck).',
      v: vCommandDirection,
    },
    {
      h: '5. Taylor\'s principles of scientific management',
      t: 3,
      b: 'F. W. Taylor (American engineer; **father of scientific management**) worked through **observation and experiments** on the shop floor.\n\n1. **Science, not rule of thumb:** study each job to find the one best way.\n2. **Harmony, not discord:** end class conflict through a **mental revolution**; both sides share the gains.\n3. **Cooperation, not individualism:** management welcomes workers\' suggestions; workers do not strike without reason.\n4. **Development of each and every person to his or her greatest efficiency and prosperity:** scientific selection, placement and training.',
      terms: [
        ['Rule of thumb', 'Deciding by habit, guesswork or personal judgement instead of study.'],
        ['Mental revolution', 'A change of attitude by management and workers from conflict to cooperation.'],
      ],
      v: vTaylorPrinciples,
      vs: [vMental],
    },
    {
      h: '6. Techniques of scientific management',
      t: 3,
      b: '1. **Functional foremanship:** planning separated from execution; eight specialists. **Planning in-charge:** route clerk, instruction card clerk, time and cost clerk, disciplinarian. **Production in-charge:** speed boss, gang boss, repair boss, inspector.\n2. **Standardisation and simplification of work:** fixed standards; removal of unnecessary varieties.\n3. **Method study:** the one best way of doing the job.\n4. **Motion study:** eliminating needless movements.\n5. **Time study:** standard time for a well-defined job.\n6. **Fatigue study:** frequency and length of rest intervals.\n7. **Differential piece wage system:** a higher rate per piece at or above the standard output, a lower rate below it.\n\nWorked figures (imagined): standard 20 pieces, ₹12 / ₹9 a piece: 24 pieces earn ₹' + DPW_A + '; 16 pieces earn ₹' + DPW_B + '; difference ₹' + DPW_GAP + '.',
      terms: [
        ['Functional foremanship', 'Supervision by eight specialist foremen, separating planning from production.'],
        ['Differential piece wage system', 'Two piece rates: higher for output at or above the standard, lower below it.'],
      ],
      v: vForeman,
      vs: [vStudies, vStdSimp, vDpwTable],
    },
    {
      h: '7. Fayol and Taylor compared',
      t: [2, 3],
      b: 'Perspective: top management (Fayol) vs shop floor (Taylor). Unity of command: followed (Fayol) vs violated by functional foremanship (Taylor). Applicability: universal vs specialised situations. Basis: personal experience vs observation and experiments. Focus: overall administration vs productivity. Their contributions **complement** each other.',
      v: vCompare,
    },
  ],
  tips: '**Common mistakes**\n- Writing a short name ("subordination") instead of the full name of a principle.\n- Confusing **unity of command** (one boss) with **unity of direction** (one head, one plan).\n- Saying equity means equal pay.\n- Mixing up motion study and time study, or standardisation and simplification.\n- Placing the eight foremen under the wrong in-charge.\n- In wage sums, applying the higher rate below the standard.\n\n**How marks are usually awarded**\n- 1 mark: the name of the principle, feature or technique.\n- 3 marks: three explained points, or principle + quoted line + explanation.\n- 4 marks (case): each part asks for an identification and an explanation from the case.\n- 5 marks: five points or five bases, each explained.\n\n**Cases in SOYL practice** are imagined; your board paper will give its own situation. Always quote the line you rely on.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Principle of management**', 'A broad, general **guideline** for decisions and behaviour.', 'definition', 1],
  ['Principle vs technique', 'Principle: a guideline (unity of command). Technique: a method (time study).', 'concept', 1],
  ['Seven features of principles', 'Universal, general guidelines, practice and experimentation, flexible, behavioural, cause and effect, contingent.', 'concept', 1],
  ['What does **contingent** mean?', 'The use of a principle **depends on the situation**.', 'definition', 1],
  ['Six reasons principles matter', 'Insights; resources and administration; scientific decisions; change; social responsibility; training and research.', 'concept', 1],
  ['Who is the father of **general management**?', '**Henri Fayol**.', 'fact', 2],
  ['**Unity of command**', 'Each employee gets orders from **one** superior only.', 'definition', 2],
  ['**Unity of direction**', '**One head and one plan** for a group of activities with the same objective.', 'definition', 2],
  ['Dual subordination', 'One employee, two bosses: violates unity of command.', 'concept', 2],
  ['**Scalar chain**', 'The formal line of authority from the highest to the lowest rank.', 'definition', 2],
  ['**Gang plank**', 'Direct contact between same-level employees in an **emergency**, superiors informed.', 'definition', 2],
  ['**Order**', 'A place for everything and everyone, and everything and everyone in its place.', 'definition', 2],
  ['**Equity**', 'Kindliness and justice; **no discrimination**. Not equal pay.', 'exam-tip', 2],
  ['Discipline needs…', 'Good superiors, clear and fair agreements, judicious penalties.', 'fact', 2],
  ['**Remuneration of employees**', 'Fair pay: a reasonable standard of living, within the firm\'s capacity.', 'definition', 2],
  ['**Stability of tenure of personnel**', 'Do not move or remove employees too often.', 'definition', 2],
  ['**Initiative**', 'Encourage employees to suggest and carry out improvements.', 'definition', 2],
  ['**Esprit de corps**', 'Team spirit: we, not I.', 'definition', 2],
  ['Purchase from a relative at a higher price: which principle is broken?', '**Subordination of individual interest to general interest**.', 'example', 2],
  ['Who is the father of **scientific management**?', '**F. W. Taylor**.', 'fact', 3],
  ['Taylor\'s four principles', 'Science, not rule of thumb; harmony, not discord; cooperation, not individualism; development of each person.', 'concept', 3],
  ['**Mental revolution**', 'Management and workers change from conflict to cooperation and share gains.', 'definition', 3],
  ['Foremen under the **planning** in-charge', 'Route clerk, instruction card clerk, time and cost clerk, disciplinarian.', 'fact', 3],
  ['Foremen under the **production** in-charge', 'Speed boss, gang boss, repair boss, inspector.', 'fact', 3],
  ['**Motion study** vs **time study**', 'Motion: remove needless movements. Time: fix the standard time.', 'exam-tip', 3],
  ['**Fatigue study**', 'Fixes the amount and frequency of rest intervals.', 'definition', 3],
  ['**Method study**', 'Finds the one best way of doing the whole job.', 'definition', 3],
  ['**Simplification**', 'Removing unnecessary varieties, sizes and grades of a product.', 'definition', 3],
  ['**Differential piece wage**', 'Higher rate per piece at or above the standard; lower rate below it.', 'definition', 3],
  [`Standard ${DPW.std}; ₹${DPW.high} / ₹${DPW.low}. Earnings for ${DPW.a} pieces?`, `${DPW.a} × ${DPW.high} = **₹${DPW_A}**.`, 'example', 3],
  ['Which technique violates unity of command?', '**Functional foremanship** (eight bosses).', 'exam-tip', 3],
  ['Fayol vs Taylor: perspective and basis', 'Fayol: top management, experience. Taylor: shop floor, experiments.', 'concept', 3],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-default-chapter-test-short',
  title: 'Chapter test (short) — Principles of Management',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_flexible', 'm_scalar', 'm_time', 'ar_dual'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_discipline', 's_mental_revolution', 's3_techniques'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_nature', 'l_taylor_techniques'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the case and answer all parts. Part (c) has an internal choice.', items: ['cb_courier'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-default-chapter-test-long',
  title: 'Chapter test (long) — Principles of Management',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_contingent', 'm_insight', 'm_unity_direction', 'm_equity', 'm_subordination', 'm_harmony', 'm_simplify', 'm_planning_incharge', 'ar_cause', 'ar_foreman'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_nature_two', 's_scalar_gang', { attempt: 1, keys: ['s_esprit', 's_standardisation'] }, 's_command_direction', { attempt: 1, keys: ['s3_remuneration_stability', 's3_fayol_taylor'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_fayol_violated', { attempt: 1, keys: ['l_taylor_principles', 'l_fayol_vs_taylor'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each case and answer all parts. Part (c) of each has an internal choice.', items: ['cb_tea', 'cb_tailor_wages'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t03 of cbse-12-business-studies-ch02 only (nature and significance of principles; Fayol\'s 14 principles; Taylor\'s principles and techniques)',
    originality: 'every case and situation written for this chapter (imagined firms and people, labelled); no NCERT text, exercise or board/sample-paper item reused',
    data: `differential piece wage figures computed by the build (${DPW.a} × ${DPW.high} = ${DPW_A}, ${DPW.b} × ${DPW.low} = ${DPW_B}; case ${DPC.ravi} × ${DPC.high} = ${DPC_RAVI}, ${DPC.sunil} × ${DPC.low} = ${DPC_SUNIL}, ${DPC.ext} × ${DPC.high} = ${DPC_SUNIL_IF}; deck ${WE.meena} × ${WE.high} = ${WE_MEENA}, ${WE.tarun} × ${WE.low} = ${WE_TARUN})`,
    facts: 'standard content: seven features and six points of significance of principles; Fayol\'s fourteen principles with the gang plank; Taylor\'s four principles, eight functional foremen and techniques; Fayol vs Taylor',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
