// Build ISC 12 Commerce ch12 Controlling and Coordination. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-commerce-ch12/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('isc-12-commerce-ch12', 'economics-commerce');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- visuals
const vRoute1 = flow('LR', ['What controlling is', 'Five steps', 'Standards and deviations', 'Why controlling matters'], 'Route map of Part 1: the meaning of controlling, its five steps, standards and deviations, and the importance of controlling', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Planning and controlling', 'Management by exception', 'Coordination', 'Essence of management'], 'Route map of Part 2: the link between planning and controlling, management by exception, coordination and why it is the essence of management', 'Part 2 at a glance');

const vLoop = flow('LR', ['Set standards', 'Measure performance', 'Compare with standards', 'Analyse deviations', 'Take corrective action'], 'The controlling process as a loop of five steps: set standards, measure performance, compare with standards, analyse deviations, take corrective action, and back to standards', 'The five steps form a loop; corrective action may also revise the standard.', [
  { from: 'n1', to: 'n2' }, { from: 'n2', to: 'n3' }, { from: 'n3', to: 'n4' }, { from: 'n4', to: 'n5' }, { from: 'n5', to: 'n1' },
]);
const vSteps = table(
  ['Step', 'Key question'],
  [
    ['1. Set standards', 'What should be achieved?'],
    ['2. Measure actual performance', 'What has actually been achieved?'],
    ['3. Compare with standards', 'Is there a gap, and how big?'],
    ['4. Analyse deviations', 'Why did the gap arise? Is it significant?'],
    ['5. Take corrective action', 'What will remove the cause?'],
  ],
  'Table of the five steps of controlling, each with the key question the manager asks',
);
const vStandards = table(
  ['Kind of standard', 'Meaning', 'Example at an imagined hotel'],
  [
    ['Quantitative', 'Stated in numbers', 'Rooms cleaned per housekeeper per shift'],
    ['Qualitative', 'Hard to count; judged', 'Warmth of welcome at the front desk'],
  ],
  'Table comparing quantitative and qualitative standards with an example of each from an imagined hotel',
);
const vStepsEx = table(
  ['Step', 'At an imagined solar-lamp assembler'],
  [
    ['Set standards', '400 lamps a day, at most four faulty'],
    ['Measure', 'Count lamps and test a sample each evening'],
    ['Compare', 'Monday: 350 lamps, a gap of 50'],
    ['Analyse', 'Battery supplier delivered late'],
    ['Correct', 'Keep two days of battery stock; add a second supplier'],
  ],
  'Worked table applying the five steps of controlling to an imagined solar-lamp assembler',
  'Notice that the correction attacks the cause, not the workers.',
);
const vDevEx = table(
  ['Item', 'Standard', 'Actual', 'Gap', 'Within 5 per cent?'],
  [
    ['Lamps a day', '400', '392', '8 short (2 per cent)', 'Yes'],
    ['Faulty lamps', '4', '9', '5 more', 'No: analyse'],
    ['Power cost (₹ thousand)', '50', '56', '6 more (12 per cent)', 'No: analyse'],
  ],
  'Worked table comparing standard and actual figures for three items at an imagined solar-lamp assembler, showing the gap and whether it lies within a five per cent limit',
  'Gap as a percentage: gap divided by standard, times 100.',
);
const vImportance = table(
  ['Importance of controlling', 'In short'],
  [
    ['Accomplishing goals', 'Shows progress and corrects drift'],
    ['Judging accuracy of standards', 'Reveals targets that are too easy or too hard'],
    ['Efficient use of resources', 'Cuts waste of material, time and money'],
    ['Improving motivation', 'People know how they will be judged and rewarded'],
    ['Order and discipline', 'Checks reduce carelessness and dishonesty'],
    ['Facilitating coordination', 'All units work to common standards'],
  ],
  'Table of six points of importance of controlling with a short meaning for each',
);
const vPlanCtrl = flow('LR', ['Planning sets targets', 'Targets become standards', 'Controlling checks results', 'Results guide next plan'], 'Cycle linking planning and controlling: planning sets targets, which become standards; controlling checks results against them; the results guide the next plan', 'Planning without controlling is aimless; controlling without planning has no yardstick.', [
  { from: 'n1', to: 'n2' }, { from: 'n2', to: 'n3' }, { from: 'n3', to: 'n4' }, { from: 'n4', to: 'n1' },
]);
const vMbe = (() => {
  const s = new Svg(560, 330);
  const c = s.chart({ x0: 0, x1: 7, y0: -10, y1: 10, left: 70, top: 30, width: 420, height: 240, xLabel: 'Month', yLabel: 'Deviation from budget (per cent)' });
  s.polygon([[c.X(0), c.Y(5)], [c.X(7), c.Y(5)], [c.X(7), c.Y(-5)], [c.X(0), c.Y(-5)]], { fill: 'green', fillOpacity: 0.1, stroke: false });
  c.seg([0, 0], [7, 0], { sw: 1.2, color: 'muted', dash: true });
  c.seg([0, 5], [7, 5], { sw: 1.6, color: 'accent', dash: true });
  c.seg([0, -5], [7, -5], { sw: 1.6, color: 'accent', dash: true });
  c.xTick(0, '');
  [[1, 1], [2, -2], [3, 3], [4, 8], [5, -1], [6, -6]].forEach(([m, d]) => {
    c.xTick(m, String(m));
    c.dot([m, d], Math.abs(d) > 5 ? 'red' : 'green');
  });
  for (const y of [-10, -5, 0, 5, 10]) c.yTick(y, String(y));
  c.label([4, 8], 'report', { dx: 30, size: 12, color: 'red' });
  c.label([6, -6], 'report', { dx: 30, size: 12, color: 'red' });
  c.label([1.9, 0], 'handled below', { dy: -42, size: 12, muted: true });
  s.text(500, c.Y(5) - 10, 'limit', { size: 12, color: 'accent', anchor: 'end' });
  return s.visual('Chart of monthly deviation from budget, in per cent, for six months, with a shaded band between plus five and minus five. Months 1, 2, 3 and 5 (plus 1, minus 2, plus 3, minus 1) lie inside the band and are handled lower down; month 4 (plus 8) and month 6 (minus 6) lie outside and are reported to top management', 'Management by exception: only points outside the limits go to top management.');
})();
const vMbeBenefits = table(
  ['Benefit of management by exception', 'Why'],
  [
    ['Saves time and effort', 'Top managers see only a few significant gaps'],
    ['Focus on critical problems', 'Attention goes where it matters most'],
    ['Encourages delegation', 'Lower managers handle routine deviations'],
    ['Timely action', 'Serious gaps stand out and are acted on quickly'],
    ['Better use of managerial talent', 'Senior time goes to planning and big decisions'],
  ],
  'Table of five benefits of management by exception with the reason for each',
);
const vMbeEx = table(
  ['Month', 'Power cost deviation', 'Limit 3 per cent', 'Who handles it'],
  [
    ['July', '2 per cent over', 'Within', 'Section head'],
    ['August', '1 per cent under', 'Within', 'Section head'],
    ['September', '7 per cent over', 'Beyond', 'Top management'],
  ],
  'Worked table for an imagined mill: three months of power cost deviations against a three per cent limit, and who handles each',
  'Only the deviation beyond the limit is reported upward.',
);
const vCoordHub = (() => {
  const s = new Svg(560, 340);
  const cx = 280, cy = 172;
  const nodes = [['Planning', 280, 40], ['Organising', 470, 125], ['Staffing', 410, 295], ['Directing', 150, 295], ['Controlling', 90, 125]];
  for (const [, x, y] of nodes) {
    const dx = cx - x, dy = cy - y, L = Math.hypot(dx, dy), k = Math.min(62 / Math.abs(dx || 1e-9), 20 / Math.abs(dy || 1e-9));
    s.line(cx - (64 * dx) / L, cy - (64 * dy) / L, x + k * dx, y + k * dy, { sw: 1.4, color: 'muted' });
  }
  for (const [name, x, y] of nodes) {
    s.rect(x - 62, y - 20, 124, 40, { fill: 'blue', fillOpacity: 0.12, color: 'blue', sw: 1.4, rx: 8 });
    s.text(x, y, name, { size: 13, bold: true });
  }
  s.parts.push(`<circle cx="${cx}" cy="${cy}" r="64" fill="var(--diagram-accent)" fill-opacity="0.15" stroke="var(--diagram-accent)" stroke-width="2"/>`);
  s.text(cx, cy - 8, 'Coordination', { size: 14, bold: true });
  s.text(cx, cy + 14, 'in every function', { size: 11 });
  return s.visual('Hub diagram: a central circle labelled coordination, in every function, joined by lines to five boxes for planning, organising, staffing, directing and controlling', 'Coordination runs through every function: the essence of management.');
})();
const vCoordFeatures = table(
  ['Feature of coordination', 'Meaning'],
  [
    ['Integrates group efforts', 'Links many people\'s work into one pattern'],
    ['Ensures unity of action', 'Everyone acts towards one common goal'],
    ['Continuous process', 'Goes on as long as the organisation exists'],
    ['All-pervasive', 'Needed in every function and at every level'],
    ['Responsibility of all managers', 'Top, middle and lower managers all coordinate'],
    ['Deliberate function', 'Managers plan it; it does not happen by itself'],
  ],
  'Table of six features of coordination with their meanings',
);
const vCoordNeed = table(
  ['Why coordination is needed', 'What happens'],
  [
    ['Growth in size', 'More people and units with their own aims'],
    ['Functional differentiation', 'Departments pursue their own targets'],
    ['Specialisation', 'Experts see only their own field'],
  ],
  'Table of three reasons why coordination is needed: growth in size, functional differentiation and specialisation',
);
const vCoordEx = table(
  ['Function', 'Coordination at an imagined spice exporter'],
  [
    ['Planning', 'Buying, cleaning and shipping plans match export orders'],
    ['Organising', 'Clear hand-overs between cleaning and packing'],
    ['Staffing', 'Enough packers before the shipping season'],
    ['Directing', 'All teams told the same shipping date'],
    ['Controlling', 'Progress checked against one shared schedule'],
  ],
  'Worked table showing coordination in each of the five functions of management at an imagined spice exporter',
  'If coordination is needed in all five, it is the essence of management.',
);
const vSummary1 = table(
  ['Idea', 'Key point'],
  [
    ['Controlling', 'Checking performance against standards and correcting gaps'],
    ['Five steps', 'Standards, measure, compare, analyse, correct'],
    ['Standards', 'Quantitative (numbers) or qualitative (judged)'],
    ['Importance', 'Goals, accurate standards, resources, motivation, discipline, coordination'],
  ],
  'Summary table of Part 1: meaning of controlling, its five steps, kinds of standards and its importance',
);
const vSummary2 = table(
  ['Idea', 'Key point'],
  [
    ['Planning and controlling', 'Inseparable; each looks both back and ahead'],
    ['Management by exception', 'Only significant deviations go to the top'],
    ['Coordination', 'Deliberate harmonising of efforts for unity of action'],
    ['Essence of management', 'Coordination is needed in every function and at every level'],
  ],
  'Summary table of Part 2: planning and controlling, management by exception, coordination and the essence of management',
);
const vCaseSteps = flow('LR', ['Quote the clue', 'Name the step or concept', 'Explain or suggest'], 'Three steps for case questions: quote the clue, name the step or concept, and explain it or suggest an action');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Controlling and Coordination — Part 1: Controlling',
  goals: [
    'Explain the meaning of controlling',
    'Explain the steps in the controlling process from setting standards to corrective action',
    'Explain the importance of controlling to an organisation',
  ],
  slides: [
    sl('title', 'Controlling', {
      b: 'Part 1: the meaning of **controlling**, its **five steps**, **standards and deviations**, and why controlling **matters**.',
      v: vRoute1,
      n: 'Plans tell a firm where it wants to go. But how does it know whether it is getting there? That is the job of controlling. In this part we see what controlling means, the five steps managers follow, how standards and deviations work, and why every organisation needs control.',
    }),
    sl('concept', 'What is controlling?', {
      b: '**Controlling** means making sure that actual performance **conforms to plans**, by checking results against **standards** and correcting any **deviation**.',
      v: vSteps,
      n: 'Controlling is a manager comparing what is happening with what was planned, and acting on any gap. It is a goal-oriented and continuous function, done at every level. Each step answers a simple question, from what should be achieved to what will remove the cause of a gap.',
    }),
    sl('diagram', 'The controlling process', {
      v: vLoop,
      n: 'The five steps form a loop. Set standards. Measure what is actually achieved. Compare it with the standard. Analyse any deviation to find its cause and decide if it is significant. Then take corrective action. The loop then begins again, and sometimes the correction is to revise the standard itself.',
    }),
    sl('two-column', 'Kinds of standards', {
      cols: ['**Quantitative**\n\nStated in numbers: units, cost, time, rejections.', '**Qualitative**\n\nHard to count: courtesy, goodwill, morale, cleanliness.'],
      v: vStandards,
      n: 'Standards may be quantitative, stated in numbers such as units per day or cost per piece. Or they may be qualitative, such as courtesy or goodwill, which are harder to measure. Managers try to express standards as precisely as they can, while leaving some room for change.',
    }),
    sl('check', 'Quick check: the first step', {
      b: 'True or false: taking corrective action is the first step of controlling.',
      chk: 'tf_ctrl_first',
      n: 'Think about what must exist before anything can be judged.',
    }),
    sl('example', 'Worked example 1: the five steps in a plant', {
      b: 'An imagined solar-lamp assembler applies the five steps.',
      bl: ['Step 1: write the **standard** in numbers.', 'Step 2: record **actual** results.', 'Step 3: find the **gap**, then its **cause**, then a **correction** that removes it.'],
      v: vStepsEx,
      n: 'Here is an imagined lamp assembler. The standard is four hundred lamps a day. On Monday it made three hundred and fifty, a gap of fifty. Analysis shows the battery supplier was late. So the correction is to keep extra battery stock and add a second supplier, rather than blame the workers.',
    }),
    sl('check', 'Quick check: which step?', {
      b: 'A shift in-charge records the number of slabs polished by each machine every evening. Which step is this?',
      chk: 'm_step_measure',
      n: 'Is the in-charge setting, recording, comparing or correcting?',
    }),
    sl('example', 'Worked example 2: is the gap significant?', {
      b: 'The same imagined assembler allows a gap of 5 per cent either way.',
      bl: ['Step 1: the gap is actual minus standard.', 'Step 2: gap as a percentage of the standard.', 'Step 3: only gaps **beyond the limit** need analysis and action at a higher level.'],
      v: vDevEx,
      n: 'Not every gap needs action. Output short by eight lamps is two per cent, within the limit, so it is accepted. But nine faulty lamps instead of four, and power cost twelve per cent above standard, are beyond the limit. These are the deviations the manager must analyse.',
    }),
    sl('concept', 'Analysing deviations and correcting them', {
      bl: ['Find the **cause**: machines, materials, people, methods or an unrealistic standard.', 'Check whether the deviation is **significant**.', 'Choose an action that removes the **cause**.', 'If the standard was wrong, **revise** it.'],
      v: table(['Cause found', 'Suitable corrective action'], [['Old or faulty machines', 'Repair or replace; plan maintenance'], ['Untrained workers', 'Training'], ['Late or poor materials', 'Change or add suppliers'], ['Unrealistic standard', 'Revise the standard']], 'Table of four causes of deviation with a suitable corrective action for each'),
      n: 'Analysis asks why the gap arose. It may be machines, materials, people, methods, or the standard itself. The correction must fit the cause. Training helps untrained workers, maintenance helps old machines, a new supplier helps late materials, and an unrealistic target is simply revised.',
    }),
    sl('concept', 'Why controlling matters', {
      v: vImportance,
      n: 'Controlling matters in six ways. It keeps the firm on course to its goals. It shows whether standards are realistic. It cuts waste of resources. It motivates people, who know how they will be judged. It builds order and discipline. And because all units work to common standards, it helps coordination.',
    }),
    sl('check', 'Quick check: finding causes', {
      b: 'Fill in the blank: finding out why performance differs from the standard is the step of ___ deviations.',
      chk: 'fb_ctrl_analyse',
      n: 'One word, the fourth step.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. Controlling checks actual performance against standards and corrects gaps. Its five steps are set standards, measure, compare, analyse deviations and take corrective action. Standards may be quantitative or qualitative. Controlling helps a firm reach its goals, use resources well, motivate people and keep discipline.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Learn the five steps **in order**.', 'Separate **comparing** (finding the gap) from **analysing** (finding its cause).', 'Match the **corrective action** to the cause in the case.', 'Show any percentage working in words and figures.'],
      v: vCaseSteps,
      n: 'Some tips. Learn the five steps in their exact order. Keep comparing, which finds the gap, separate from analysing, which finds its cause. Always match the correction to the cause given in the case. And when asked for a percentage deviation, show your working step by step.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Controlling and Coordination — Part 2: Planning, Exception and Coordination',
  goals: [
    'Explain why planning and controlling are inseparable',
    'Explain management by exception and its benefits',
    'Explain why coordination is called the essence of management',
  ],
  slides: [
    sl('title', 'Planning, Exception and Coordination', {
      b: 'Part 2: how **planning and controlling** fit together, **management by exception**, and **coordination**, the essence of management.',
      v: vRoute2,
      n: 'In Part 2 we first see how planning and controlling depend on each other. Then we meet management by exception, a way of keeping top managers free for what matters. Finally we look at coordination, which ties every function of management together.',
    }),
    sl('diagram', 'Planning and controlling are inseparable', {
      v: vPlanCtrl,
      n: 'Planning and controlling are like two sides of a coin. Planning sets the targets, which become the standards. Controlling checks results against them. Its findings then guide the next plan. Planning without controlling has no follow-through, and controlling without planning has nothing to measure against.',
    }),
    sl('two-column', 'Looking back and looking ahead', {
      cols: ['**Planning**\n\nLooks ahead to set targets, but uses **past results** from control reports.', '**Controlling**\n\nLooks back at work done, but its corrections **improve the future**.'],
      v: table(['Function', 'Looks back by…', 'Looks ahead by…'], [['Planning', 'Using last period\'s results', 'Setting future targets'], ['Controlling', 'Checking work already done', 'Fixing causes for the future']], 'Table showing how planning and controlling each look both back and ahead'),
      n: 'People often say planning looks ahead and controlling looks back. That is only half true. Planning uses past results to set future targets. Controlling checks work already done, but it corrects causes so that the future improves. Both look both ways.',
    }),
    sl('diagram', 'Management by exception', {
      b: '**Management by exception**: only **significant deviations**, beyond set limits, are reported to top management.',
      v: vMbe,
      n: 'Top managers cannot look at every figure. Under management by exception, a limit is set, here five per cent either way. Deviations inside the band are handled lower down. Only those outside it, like months four and six, are reported to the top. Trying to control everything often ends up controlling nothing.',
    }),
    sl('check', 'Quick check: what reaches the top?', {
      b: 'Under management by exception, the managing director receives reports only on…',
      chk: 'm_mbe_def',
      n: 'Think about which gaps are worth a senior manager\'s time.',
    }),
    sl('example', 'Worked example 1: who handles the deviation?', {
      b: 'An imagined mill allows a 3 per cent gap in its monthly power cost.',
      bl: ['Step 1: note each month\'s deviation.', 'Step 2: compare it with the **limit**.', 'Step 3: within the limit, the section head acts; beyond it, **top management** is told.'],
      v: vMbeEx,
      n: 'In July the power cost was two per cent over, within the three per cent limit, so the section head handles it. August was one per cent under, also within. September was seven per cent over, beyond the limit, so only September is reported to top management.',
    }),
    sl('concept', 'Benefits of management by exception', {
      v: vMbeBenefits,
      n: 'Management by exception saves the time and effort of top managers. It focuses their attention on critical problems. It encourages delegation, since lower managers handle routine gaps. Serious deviations stand out, so action is timely. And senior talent is used for planning and big decisions.',
    }),
    sl('concept', 'Coordination', {
      b: '**Coordination** is the deliberate synchronising of the efforts of people and departments to achieve **unity of action** towards common goals.',
      v: vCoordFeatures,
      n: 'Coordination links the work of many people and departments so that they act as one. It integrates group efforts and ensures unity of action. It is continuous and all-pervasive. It is the responsibility of every manager. And it is deliberate: willingness to cooperate is not enough unless someone links the work.',
    }),
    sl('check', 'Quick check: once is not enough', {
      b: 'An owner thinks last year\'s good coordination means none is needed now. What does he forget?',
      chk: 'm_coord_continuous',
      n: 'Do people, tasks and conditions stay the same?',
    }),
    sl('concept', 'Why coordination is needed', {
      v: vCoordNeed,
      n: 'The need for coordination grows with three things. As a firm grows in size, more people and units bring their own aims. As work is divided into departments, each chases its own targets. And specialists tend to see only their own field. Managers must pull all of these together.',
    }),
    sl('diagram', 'Coordination: the essence of management', {
      v: vCoordHub,
      n: 'Coordination is not a separate function. It is needed while planning, organising, staffing, directing and controlling, and at every level. Because it runs through every function, management writers call coordination the essence of management.',
    }),
    sl('example', 'Worked example 2: coordination in all five functions', {
      b: 'An imagined spice exporter faces a big export order.',
      bl: ['Step 1: take each **function** in turn.', 'Step 2: show what must be **linked** in it.', 'Step 3: conclude that coordination is the **essence**.'],
      v: vCoordEx,
      n: 'Take an imagined spice exporter with a big order. Its buying, cleaning and shipping plans must match. Hand-overs between teams must be clear. Enough packers must be hired in time. All teams must hear the same shipping date. Progress is checked against one schedule. Coordination is needed in every function.',
    }),
    sl('check', 'Quick check: every level?', {
      b: 'True or false: coordination is needed only at the top level of management.',
      chk: 'tf_coord',
      n: 'Think of a supervisor linking the work of a small team.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. Planning and controlling are inseparable, and each looks both back and ahead. Management by exception sends only significant deviations to the top, saving time and encouraging delegation. Coordination deliberately harmonises efforts for unity of action, and because every function needs it, it is the essence of management.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['For planning and controlling, show the link **both ways**.', 'In exception cases, compare each deviation with the **limit** given.', 'Do not call coordination a **separate function**.', 'For essence, show coordination in **each function**.'],
      v: vCaseSteps,
      n: 'Final tips. When linking planning and controlling, show how each helps the other. In management by exception cases, compare every deviation with the limit before deciding who handles it. Never call coordination a separate function. To show it is the essence, take each function in turn.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Controlling and Coordination — notes',
  sections: [
    {
      h: '1. Meaning and process of controlling',
      t: 1,
      b: '**Controlling** is the function of management that ensures activities are carried out **according to plans**: actual performance is measured, compared with standards, and deviations are corrected. It is **goal-oriented**, **pervasive** and **continuous**, and it looks both back (at work done) and ahead (at preventing future gaps).\n\n**Steps:**\n1. **Setting performance standards** — quantitative (output, cost, time) or qualitative (courtesy, goodwill); precise but flexible.\n2. **Measuring actual performance** — by counting, sampling, reports or observation.\n3. **Comparing actual performance with standards** — to find the size and direction of any gap.\n4. **Analysing deviations** — finding causes and judging whether the gap is significant (often against a permitted limit).\n5. **Taking corrective action** — training, repair, new suppliers, or revising an unrealistic standard.',
      terms: [['Controlling', 'Checking actual performance against standards and correcting deviations.'], ['Deviation', 'The gap between actual performance and the standard.'], ['Qualitative standard', 'A standard that is hard to state in numbers, such as courtesy.']],
      v: vLoop,
      vs: [vSteps, vStandards],
    },
    {
      h: '2. Importance of controlling',
      t: 1,
      b: '- **Accomplishing organisational goals** — progress is tracked and drift corrected.\n- **Judging the accuracy of standards** — results show whether targets are realistic.\n- **Making efficient use of resources** — waste of materials, time and money is cut.\n- **Improving employee motivation** — people know the basis on which they will be appraised and rewarded.\n- **Ensuring order and discipline** — regular checking discourages carelessness and dishonesty.\n- **Facilitating coordination in action** — every unit works to common, predetermined standards.',
      terms: [['Goal-oriented function', 'Controlling exists to see that organisational goals are achieved.']],
      v: vImportance,
      vs: [vStepsEx, vDevEx],
    },
    {
      h: '3. Planning and controlling; management by exception',
      t: 2,
      b: '**Planning and controlling are inseparable.** Planning provides the standards; controlling measures performance against them and reports results that shape future plans. Planning without controlling is aimless; controlling without planning has no basis. Both look **back and ahead**: plans draw on past results, and corrective action improves future work.\n\n**Management by exception (MBE):** only **significant deviations**, beyond pre-set limits, are reported to top management; minor ones are handled at lower levels.\n\n**Benefits of MBE:** saves top managers\' time and effort; focuses attention on critical problems; encourages delegation; allows timely action on serious gaps; makes better use of managerial talent.',
      terms: [['Management by exception', 'Reporting only significant deviations beyond set limits to top management.']],
      v: vPlanCtrl,
      vs: [vMbe, vMbeBenefits],
    },
    {
      h: '4. Coordination: the essence of management',
      t: 3,
      b: '**Coordination** is the process of **synchronising** the activities of different individuals and departments so that there is **unity of action** in pursuit of common goals.\n\n**Features:** integrates group efforts; ensures unity of action; continuous; all-pervasive; responsibility of all managers; deliberate (it does not happen just because people cooperate).\n\n**Need for coordination:** growth in **size**; **functional differentiation** (departments chasing their own targets); **specialisation** (experts seeing only their own field).\n\n**Essence of management:** coordination is not a separate function. It is needed in **planning, organising, staffing, directing and controlling**, and at **every level**, so it runs through all of management.',
      terms: [['Coordination', 'Deliberately harmonising efforts for unity of action towards common goals.'], ['Cooperation', 'The voluntary willingness of people to help each other; coordination builds on it.']],
      v: vCoordHub,
      vs: [vCoordFeatures, vCoordNeed, vCoordEx],
    },
  ],
  tips: '**Common mistakes**\n- Starting the controlling process with corrective action or measurement (it starts with standards).\n- Treating comparison and analysis as one step.\n- Saying that every deviation goes to top management under management by exception.\n- Calling coordination a sixth function, or the job of top managers only.\n\n**How marks are usually awarded**\n- 1 mark: correct step, benefit or feature.\n- 2–3 marks: each point named and explained, tied to the case.\n- 5 marks: parts answered separately; steps in order with examples; essence answers show coordination in every function.\n- Case questions: quote the clue, name the step or concept, explain or suggest.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Controlling**', 'Checking actual performance against standards and correcting deviations.', 'definition', 1],
  ['Five steps of controlling', 'Set standards, measure, compare, analyse deviations, take corrective action.', 'exam-tip', 1],
  ['First step of controlling', 'Setting performance standards.', 'fact', 1],
  ['Last step of controlling', 'Taking corrective action.', 'fact', 1],
  ['**Deviation**', 'The gap between actual performance and the standard.', 'definition', 1],
  ['Comparing vs analysing', 'Comparing finds the gap; analysing finds its cause.', 'concept', 1],
  ['**Quantitative standard**', 'Stated in numbers: units, cost, time.', 'definition', 1],
  ['**Qualitative standard**', 'Hard to count: courtesy, goodwill, morale.', 'definition', 1],
  ['Percentage deviation', 'Gap divided by standard, times 100.', 'fact', 1],
  ['Corrective action for untrained workers', 'Training.', 'fact', 1],
  ['When should a standard be revised?', 'When analysis shows it was unrealistic.', 'concept', 1],
  ['Six points of importance of controlling', 'Goals, accurate standards, resources, motivation, discipline, coordination.', 'exam-tip', 1],
  ['How does control improve motivation?', 'People know the standards on which they will be judged and rewarded.', 'concept', 1],
  ['Planning and controlling', 'Inseparable: planning sets standards, controlling checks and feeds back.', 'concept', 2],
  ['Controlling without planning…', 'Has no yardstick to measure against.', 'concept', 2],
  ['Does controlling only look back?', 'No: its corrections improve future work.', 'concept', 2],
  ['**Management by exception**', 'Only significant deviations beyond set limits go to top management.', 'definition', 2],
  ['A deviation within the limit is…', 'Handled at a lower level, not reported to the top.', 'fact', 2],
  ['Benefits of management by exception', 'Saves time, focuses on critical problems, encourages delegation, timely action.', 'exam-tip', 2],
  ['**Coordination**', 'Deliberately synchronising efforts for unity of action towards common goals.', 'definition', 3],
  ['Coordination vs cooperation', 'Coordination is deliberate by managers; cooperation is voluntary willingness.', 'concept', 3],
  ['Features of coordination', 'Integrates efforts, unity of action, continuous, all-pervasive, all managers, deliberate.', 'exam-tip', 3],
  ['Three reasons coordination is needed', 'Growth in size, functional differentiation, specialisation.', 'exam-tip', 3],
  ['Why is coordination the essence of management?', 'It is needed in every function and at every level.', 'concept', 3],
  ['Is coordination a separate function?', 'No: it runs through all five functions.', 'fact', 3],
  ['Who coordinates?', 'Every manager, from top to supervisor.', 'fact', 3],
  ['Case routine', 'Quote the clue, name the step or concept, explain or suggest.', 'exam-tip', 1],
]);

// ---------------------------------------------------------------- tests (ISC class defaults, item for item)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Controlling and Coordination',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A - Objective (5 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_step_compare', 'm_mbe_case', 'm_coord_levels', 'm_importance_resources', 'ar_mbe'] },
    { id: 'B', title: 'Section B - Short answer (4 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s_mbe', { attempt: 1, keys: ['s_ctrl_meaning', 's_coord_features'] }] },
    { id: 'C', title: 'Section C - Short answer (6 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s3_coord_essence', { attempt: 1, keys: ['s3_importance3', 's3_mbe_benefits'] }] },
    { id: 'D', title: 'Section D - Long answer (5 marks)', instr: 'Answer the question. It is set in parts.', items: ['l_coord'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Controlling and Coordination',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A - Objective (12 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_ctrl_def', 'm_step_first', 'm_step_analyse', 'm_step_corrective', 'm_importance_discipline', 'm_deviation_calc', 'm_plan_ctrl', 'm_mbe_benefit', 'm_coord_essence', 'm_coord_specialisation', 'ar_ctrl_motiv', 'ar_coord_essence'] },
    { id: 'B', title: 'Section B - Short answer (6 marks)', instr: 'Answer all three questions. Internal choice in the last question.', items: ['s_steps_first2', 's_plan_ctrl', { attempt: 1, keys: ['s_ctrl_importance2', 's_coord_need'] }] },
    { id: 'C', title: 'Section C - Short answer (12 marks)', instr: 'Answer all four questions. Internal choice in the last question.', items: ['s3_steps_last3', 's3_analyse', 's3_coord_need3', { attempt: 1, keys: ['s3_ctrl_to_plan', 's3_coord_features3'] }] },
    { id: 'D', title: 'Section D - Long answer (10 marks)', instr: 'Answer both questions. Internal choice in the second question. Each is set in parts.', items: ['l_ctrl_steps', { attempt: 1, keys: ['l_ctrl_importance', 'l_mbe'] }] },
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
    syllabus: 'topics t01–t03 of isc-12-commerce-ch12 (controlling: meaning, steps and importance; the relationship between planning and controlling and management by exception; coordination and coordination as the essence of management)',
    originality: 'every firm, person and case is imagined and written by SOYL and labelled; no ISC or CBSE textbook text, illustration or exercise and no CISCE specimen or board item reused (D-036); firms, places and set-ups differ from the CBSE 12 Business Studies chapters on controlling and on the nature of management',
    data: 'all figures are imagined; percentage deviations are computed from the stated standard and actual values',
    facts: 'stable textbook concepts only; no dated figures',
    gate: 'schema, pipeline lint, deterministic verify, word limits, narration and answer-leak checks run clean in this build',
  },
});
