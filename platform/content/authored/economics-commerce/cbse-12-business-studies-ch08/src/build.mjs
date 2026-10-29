// Build CBSE 12 Business Studies ch08 Controlling. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-12-business-studies-ch08/src/build.mjs
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-business-studies-ch08', 'economics-commerce');
const { inr, dev, OUT, OUT_D, COST, COST_D, POWER, POWER_D, HOURS, HOURS_D, KESAR, KESAR_D, KESAR_TOL } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- worked-example figures (computed)
// Deck 2, worked example 1: an imagined dairy in Karnal.
const DAIRY = [
  { item: 'Milk collected (litres a day)', std: 10000, act: 9400 },
  { item: 'Packets torn in packing (a day)', std: 200, act: 260 },
  { item: 'Vans leaving on time (out of 50)', std: 50, act: 48 },
];
const DAIRY_D = DAIRY.map((r) => dev(r.std, r.act));
assert.deepEqual(DAIRY_D.map((x) => x.abs), [600, 60, 2]);
assert.deepEqual(DAIRY_D.map((x) => x.pct), [6, 30, 4]);
// Deck 2: an imagined bicycle factory in Ludhiana, standard 300 a day; tolerance 5%.
const CYCLE_STD = 300;
const CYCLE_TOL = 5;
const CYCLE = [['Mon', 300], ['Tue', 288], ['Wed', 306], ['Thu', 270], ['Fri', 297]];
const CYCLE_D = CYCLE.map(([, a]) => dev(CYCLE_STD, a));
assert.deepEqual(CYCLE_D.map((x) => x.pct), [0, 4, 2, 10, 1]);
const CYCLE_REPORT = CYCLE.filter((_, i) => CYCLE_D[i].pct > CYCLE_TOL).map(([d]) => d);
assert.deepEqual(CYCLE_REPORT, ['Thu']);

// ---------------------------------------------------------------- visuals
const vRoute1 = flow('LR', ['What controlling is', 'Its features', 'Why it matters', 'Its limits', 'Planning and controlling'], 'Route map of Part 1: what controlling is, its features, why it matters, its limits, and how it links with planning', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Set standards', 'Measure', 'Compare', 'Analyse deviations', 'Correct'], 'Route map of Part 2: the five steps of the controlling process, from setting standards to correcting deviations', 'Part 2 at a glance');
const vMeaning = table(
  ['Question', 'At an imagined school canteen in Bhopal'],
  [
    ['What did we plan?', 'Serve 400 lunches by 1:15 p.m.'],
    ['What actually happened?', '360 lunches served by 1:15 p.m.'],
    ['What is the gap?', '40 lunches late'],
    ['What will we do?', 'Start cooking rice 20 minutes earlier'],
  ],
  'Table showing controlling at an imagined school canteen: the plan was 400 lunches by 1.15 pm, 360 were served, the gap was 40 lunches, and the action is to start cooking rice 20 minutes earlier',
  'Controlling compares what happened with what was planned, then acts.',
);
const vFeatures = table(
  ['Feature', 'In one line'],
  [
    ['Goal-oriented', 'Keeps the organisation moving towards its planned goals'],
    ['Pervasive', 'Done at every level and in every kind of organisation'],
    ['Continuous', 'Goes on all the time, not only at the year end'],
    ['Primary function', 'Every manager must control the work under them'],
    ['Backward- and forward-looking', 'Checks past work and improves future work'],
  ],
  'Table of five features of controlling: goal-oriented, pervasive, continuous, a primary function of every manager, and both backward- and forward-looking',
);
const vLooking = flow('LR', ['Last month\'s results (look back)', 'Compare with standards', 'Find causes', 'Better methods and standards next month (look forward)'], 'Flow showing controlling looking back at last month\'s results, comparing them with standards, finding causes, and improving methods and standards for next month', 'Back and forward together');
const vSpotFeature = table(
  ['Line in a case (imagined firms)', 'Clue', 'Feature'],
  [
    ['"The supervisor checks quality every hour of every shift"', 'every hour, every shift', 'Continuous'],
    ['"Even the small village school checks its exam results"', 'even a small school', 'Pervasive'],
    ['"Last year\'s delays were studied to plan quicker deliveries"', 'last year → next', 'Backward- and forward-looking'],
  ],
  'Table of three case lines with their clue words and features: hourly checks show it is continuous, a village school checking results shows it is pervasive, and studying last year\'s delays to plan quicker deliveries shows it looks back and forward',
);
const vImportance = table(
  ['Importance', 'What it means'],
  [
    ['Accomplishing goals', 'Gaps are spotted and closed in time'],
    ['Judging accuracy of standards', 'Shows when a target is too high or too low'],
    ['Efficient use of resources', 'Work to standards cuts waste'],
    ['Improving motivation', 'People know what is expected and how they will be judged'],
    ['Order and discipline', 'Checks discourage dishonest behaviour'],
    ['Facilitating coordination', 'Departments work to standards that fit together'],
  ],
  'Table of six points of importance of controlling: accomplishing goals, judging accuracy of standards, efficient use of resources, improving motivation, order and discipline, and facilitating coordination',
);
const vSpotImportance = table(
  ['Line in a case (imagined bus depot, Mysuru)', 'Importance'],
  [
    ['"Tyre wear is now checked weekly, and fewer tyres are scrapped early"', 'Efficient use of resources'],
    ['"Ticket cash is counted twice a day, and shortages have stopped"', 'Order and discipline'],
    ['"Drivers know that on-time trips decide their award"', 'Improving motivation'],
    ['"No route ever met the 98% on-time target, so it was reviewed"', 'Judging accuracy of standards'],
  ],
  'Table linking lines from an imagined bus depot in Mysuru to the importance of controlling: weekly tyre checks show efficient use of resources, twice-daily cash counts show order and discipline, an award for on-time trips shows motivation, and reviewing an unmet target shows judging accuracy of standards',
);
const vLimits = table(
  ['Limitation', 'Why control cannot be perfect'],
  [
    ['Hard to set quantitative standards', 'Morale, courtesy and satisfaction resist numbers'],
    ['Little control on external factors', 'Policy, technology and rivals lie outside the firm'],
    ['Resistance from employees', 'Close checks can feel like distrust'],
    ['Costly affair', 'Systems need money, time and effort'],
  ],
  'Table of four limitations of controlling: hard to set quantitative standards, little control on external factors, resistance from employees, and high cost',
);
const vInsideOutside = table(
  ['Ask about the problem…', 'If yes, the limitation is…'],
  [
    ['Can it be put into numbers?', 'If not: difficulty in setting quantitative standards'],
    ['Did it start outside the firm?', 'If so: little control on external factors'],
    ['Are people objecting to the checks?', 'Resistance from employees'],
    ['Is the system worth more than it saves?', 'If not: costly affair'],
  ],
  'Table of four questions to identify a limitation: whether it can be put into numbers, whether it started outside the firm, whether people object to checks, and whether the system costs more than it saves',
);
const vCycle = (() => {
  const s = new Svg(560, 300);
  const boxes = [
    [280, 50, 'Plan: goals and standards'],
    [470, 150, 'Act: carry out the plan'],
    [280, 250, 'Control: measure and compare'],
    [90, 150, 'Correct and replan'],
  ];
  boxes.forEach(([x, y, label]) => {
    s.rect(x - 85, y - 22, 170, 44, { color: 'accent', fill: 'fill', sw: 1.6 });
    s.text(x, y, label, { size: 12 });
  });
  s.arrow(370, 62, 430, 125, { sw: 1.6 });
  s.arrow(430, 175, 370, 238, { sw: 1.6 });
  s.arrow(190, 238, 130, 175, { sw: 1.6 });
  s.arrow(130, 125, 190, 62, { sw: 1.6 });
  s.text(280, 150, 'Inseparable', { bold: true, size: 14, color: 'accent' });
  return s.visual(
    'Cycle diagram: plan sets goals and standards, the plan is carried out, controlling measures and compares results, and correction feeds back into a new plan',
    'Planning gives the standards; controlling feeds back into the next plan.',
  );
})();
const vTwoWays = table(
  ['Function', 'Looks back by…', 'Looks forward by…'],
  [
    ['Planning', 'Using past results and control reports', 'Setting goals for the coming period'],
    ['Controlling', 'Measuring work already done', 'Correcting causes and revising standards'],
  ],
  'Table showing that planning looks back by using past results and looks forward by setting goals, and that controlling looks back by measuring work done and forward by correcting causes and revising standards',
);
const vSummary1 = table(
  ['Idea', 'Remember'],
  [
    ['Controlling', 'Work goes as planned; gaps are corrected'],
    ['Features', 'Goal-oriented, pervasive, continuous, looks back and forward'],
    ['Importance', 'Goals, standards, resources, motivation, discipline, coordination'],
    ['Limitations', 'Numbers, outside factors, resistance, cost'],
    ['With planning', 'Inseparable twins'],
  ],
  'Summary table of Part 1: meaning, features, six points of importance, four limitations and the link with planning',
);
const vProcess = flow('LR', ['1. Set performance standards', '2. Measure actual performance', '3. Compare with standards', '4. Analyse deviations', '5. Take corrective action'], 'Flow of the five steps of the controlling process: set performance standards, measure actual performance, compare with standards, analyse deviations and take corrective action', 'The controlling process');
const vStandards = table(
  ['Quantitative standards (numbers)', 'Qualitative standards (no simple number)'],
  [
    ['Produce 300 bicycles a day', 'Improve the goodwill of the brand'],
    ['Cost of ₹200 per jar', 'Keep workers\' morale high'],
    ['Deliver 98 in 100 parcels within 48 hours', 'Make guests feel welcome'],
  ],
  'Table contrasting quantitative standards such as 300 bicycles a day, a cost of 200 rupees per jar and 98 in 100 parcels within 48 hours with qualitative standards such as goodwill, morale and making guests feel welcome',
  'Standards should be precise and also flexible enough to revise.',
);
const vMeasure = table(
  ['Technique', 'Example (imagined firms)'],
  [
    ['Personal observation', 'A floor manager watches the packing line'],
    ['Sample checking', 'Weighing 50 soap cakes from each batch'],
    ['Performance reports', 'Weekly sales report from each branch'],
  ],
  'Table of three measurement techniques: personal observation, sample checking and performance reports, each with an imagined example',
);
const vBars = (() => {
  const s = new Svg(560, 300);
  const c = s.chart({ x0: 0, x1: 13, y0: 0, y1: 360, left: 60, top: 30, width: 440, height: 200, xLabel: 'Day', yLabel: 'Bicycles assembled' });
  CYCLE.forEach(([d, a], i) => {
    const x = 1 + i * 2;
    s.rect(c.X(x), c.Y(a), c.X(x + 1.2) - c.X(x), c.Y(0) - c.Y(a), { color: 'accent', fill: 'accent', fillOpacity: 0.75, sw: 1, rx: 0 });
    c.label([x + 0.6, 0], d, { dy: 16, size: 12 });
    c.label([x + 0.6, a], String(a), { dy: -10, size: 11 });
  });
  s.line(c.X(0), c.Y(CYCLE_STD), c.X(12.8), c.Y(CYCLE_STD), { color: 'muted', dash: true, sw: 1.6 });
  c.label([10.6, CYCLE_STD], `Standard ${CYCLE_STD}`, { dy: -12, size: 12, anchor: 'start' });
  c.yTick(100, '100').yTick(200, '200');
  return s.visual(
    `Bar chart of bicycles assembled at an imagined Ludhiana factory against a standard of ${CYCLE_STD} a day: ${CYCLE.map(([d, a]) => `${d} ${a}`).join(', ')}`,
    'Imagined figures. Comparing each bar with the dashed standard line is step 3.',
  );
})();
const vDairy = table(
  ['Item (imagined dairy, Karnal)', 'Standard', 'Actual', 'Deviation', 'As % of standard'],
  DAIRY.map((r, i) => [r.item, inr(r.std), inr(r.act), inr(DAIRY_D[i].abs), `${DAIRY_D[i].pct}%`]),
  `Table of an imagined dairy's standards and actuals: milk collected ${inr(DAIRY[0].std)} against ${inr(DAIRY[0].act)} litres, ${DAIRY_D[0].pct} per cent short; torn packets ${DAIRY[1].std} against ${DAIRY[1].act}, ${DAIRY_D[1].pct} per cent over; vans on time ${DAIRY[2].std} against ${DAIRY[2].act}, ${DAIRY_D[2].pct} per cent short`,
  'Percentage deviation = deviation ÷ standard × 100.',
);
const vAnalyse = flow('TB', ['Is it a key result area? (critical point control)', 'Is it beyond the permissible limit? (management by exception)', 'What caused it? (machines, people, materials, standards, outside factors)', 'Decide the corrective action'], 'Flow of analysing deviations: check whether the area is a key result area, whether the deviation is beyond the permissible limit, what caused it, and then decide the corrective action', 'Three questions before acting');
const vCpc = table(
  ['Key result area (watch closely)', 'Minor area (leave to juniors)'],
  [
    ['Cost of steel in a car-parts firm', 'Office tea and snacks'],
    ['Safety readings in a chemical plant', 'Garden upkeep'],
    ['Cash collection in a supermarket', 'Printing of notice boards'],
  ],
  'Table contrasting key result areas such as steel cost, safety readings and cash collection with minor areas such as office tea, garden upkeep and notice-board printing',
  'A small slip in a key result area hurts the whole firm.',
);
const vBand = (() => {
  const s = new Svg(560, 300);
  const c = s.chart({ x0: 0, x1: 6, y0: 0, y1: 12, left: 60, top: 30, width: 440, height: 200, xLabel: 'Day', yLabel: 'Deviation (% of standard)' });
  s.rect(c.X(0), c.Y(CYCLE_TOL), c.X(6) - c.X(0), c.Y(0) - c.Y(CYCLE_TOL), { color: 'green', fill: 'green', fillOpacity: 0.18, sw: 0, stroke: false, rx: 0 });
  s.line(c.X(0), c.Y(CYCLE_TOL), c.X(6), c.Y(CYCLE_TOL), { color: 'red', dash: true, sw: 1.6 });
  c.label([5.9, CYCLE_TOL], `Limit ${CYCLE_TOL}%`, { dy: -12, size: 12, anchor: 'end', color: 'red' });
  CYCLE.forEach(([d], i) => {
    const p = [i + 1, CYCLE_D[i].pct];
    c.dot(p, CYCLE_D[i].pct > CYCLE_TOL ? 'red' : 'accent');
    c.label([i + 1, 0], d, { dy: 16, size: 12 });
    c.label(p, `${CYCLE_D[i].pct}%`, { dx: 22, size: 11 });
  });
  c.yTick(5, '5').yTick(10, '10');
  return s.visual(
    `Dot chart of daily percentage deviations at the imagined bicycle factory against a ${CYCLE_TOL} per cent limit: ${CYCLE.map(([d], i) => `${d} ${CYCLE_D[i].pct}`).join(', ')}; only ${CYCLE_REPORT.join(', ')} is above the limit`,
    'Points inside the shaded band are handled by supervisors; only the point above the line is reported.',
  );
})();
const vReport = table(
  ['Day', 'Actual', 'Deviation', '% of 300', `Beyond ${CYCLE_TOL}%?`],
  CYCLE.map(([d, a], i) => [d, String(a), String(CYCLE_D[i].abs), `${CYCLE_D[i].pct}%`, CYCLE_D[i].pct > CYCLE_TOL ? '**Yes: report**' : 'No']),
  `Table of the imagined bicycle factory's daily output, deviation and percentage deviation from 300, showing that only ${CYCLE_REPORT.join(', ')} is beyond the ${CYCLE_TOL} per cent limit and is reported`,
);
const vCorrect = table(
  ['Cause of deviation', 'Corrective action'],
  [
    ['Old or faulty machines', 'Repair, replace, preventive maintenance'],
    ['Untrained workers', 'Training, closer supervision'],
    ['Late raw material', 'Order earlier, buffer stock, second supplier'],
    ['Low morale', 'Incentives, recognition, listening to grievances'],
    ['Unrealistic standard', 'Revise the standard'],
  ],
  'Table pairing causes of deviation with corrective actions: faulty machines with repair or replacement, untrained workers with training, late material with earlier orders, low morale with incentives, and unrealistic standards with revision',
);
const vSummary2 = table(
  ['Step', 'Key words'],
  [
    ['1. Set standards', 'Quantitative or qualitative; precise and flexible'],
    ['2. Measure', 'Same units; observation, samples, reports'],
    ['3. Compare', 'Size of the gap'],
    ['4. Analyse', 'Critical point control, management by exception, cause'],
    ['5. Correct', 'Remove the cause, or revise the standard'],
  ],
  'Summary table of the five steps of controlling with their key words',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Controlling — Part 1: Meaning, Importance and Limitations',
  goals: [
    'Explain the meaning and features of controlling',
    'Identify the importance of controlling in business situations',
    'Identify the limitations of controlling in a case',
    'Explain why planning and controlling are inseparable',
  ],
  slides: [
    sl('title', 'Controlling', {
      b: 'Part 1 — what controlling **is**, its **features**, why it **matters**, its **limits** and its link with **planning**.',
      v: vRoute1,
      n: 'A cricket captain plans a target score, but during the match he keeps checking the run rate and changes the batting order if needed. Managers do the same. In this chapter we study controlling, the function that checks whether work is going according to plan. Part one covers its meaning, features, importance and limitations, and its close link with planning.',
    }),
    sl('concept', 'What is controlling?', {
      b: '**Controlling** makes sure that activities happen **according to plan**, and corrects them where they do not.',
      v: vMeaning,
      n: 'Look at this imagined school canteen. It planned four hundred lunches by quarter past one. Only three hundred and sixty were ready. The gap is forty lunches. So the manager decides to start cooking rice twenty minutes earlier. That whole cycle of checking results against the plan and fixing the gap is controlling.',
    }),
    sl('diagram', 'Features of controlling', {
      v: vFeatures,
      n: 'Controlling is goal-oriented: it keeps the organisation moving towards its goals. It is pervasive, found at every level and in every kind of organisation, from a factory to a school. It is continuous, not a once-a-year check. Every manager must perform it. And it looks both backward, at work already done, and forward, at how to do better.',
    }),
    sl('check', 'Quick check: which feature?', {
      b: 'A chairperson, a plant manager and a shift supervisor each review results in their own area. Which feature is this?',
      chk: 'm_pervasive',
      n: 'Count the levels of management in the question. What does it tell you when every level is doing the same function?',
    }),
    sl('diagram', 'Looking back and looking forward', {
      v: vLooking,
      n: 'Some students think controlling only looks back, like a post-mortem. Not true. Yes, it measures work already done. But the reason we measure is to find causes and improve methods and standards for next time. So controlling looks back in order to look forward.',
    }),
    sl('example', 'Worked example 1: spotting a feature in a case', {
      b: 'Board cases quote a line and ask for the feature.',
      bl: ['Step 1 — Underline the clue words', 'Step 2 — Match them to one feature', 'Step 3 — Name the feature and explain it with the words of the case'],
      v: vSpotFeature,
      n: 'Let us practise with three imagined lines. Checking quality every hour of every shift shows that controlling is continuous. A small village school checking its results shows that it is pervasive. Studying last year\'s delays to plan quicker deliveries shows it looks both back and forward. Always name the feature first, then explain it using the case.',
    }),
    sl('diagram', 'Why control? Six points of importance', {
      v: vImportance,
      n: 'Why do organisations control? It helps them accomplish goals, because gaps are spotted in time. It shows whether standards are accurate. It makes resources go further by cutting waste. It motivates people, who know what is expected. It keeps order and discipline. And it helps coordination, because every department works to standards that fit together.',
    }),
    sl('check', 'Quick check: which importance?', {
      b: 'Daily stock checks at a medicine warehouse stop cases of missing strips. Which importance of controlling is this?',
      chk: 'm_discipline',
      n: 'Think about what daily checks do to people who might be tempted to take something.',
    }),
    sl('example', 'Worked example 2: finding importance in a case', {
      b: 'Match each line from an imagined bus depot to one point of importance.',
      bl: ['Less waste → efficient use of resources', 'Dishonesty stops → order and discipline', 'Clear basis of reward → motivation', 'Target reviewed → accuracy of standards'],
      v: vSpotImportance,
      n: 'Here is an imagined bus depot in Mysuru. Fewer tyres scrapped early means resources are used efficiently. Cash shortages stopping shows order and discipline. Drivers knowing that on-time trips decide their award shows motivation. And a target that no route ever met being reviewed shows that controlling judges the accuracy of standards.',
    }),
    sl('diagram', 'Limitations of controlling', {
      v: vLimits,
      n: 'Controlling is powerful, but it has four limits. Some standards, like courtesy or morale, are hard to put into numbers. The firm has little control over outside factors such as government policy, new technology or rivals. Employees may resist checks they see as distrust. And control systems cost money, time and effort, which small firms may not afford.',
    }),
    sl('check', 'Quick check: a limitation', {
      b: 'A hospital cannot express "courtesy of nurses" in numbers. Which limitation is this?',
      chk: 'm_lim_quant',
      n: 'Ask yourself whether the problem is about measuring, about the outside world, about people objecting, or about money.',
    }),
    sl('two-column', 'Telling the limitations apart', {
      cols: ['**Inside the firm**\n\nPeople object to checks (resistance); the system costs too much (cost); the quality cannot be counted (standards).', '**Outside the firm**\n\nA new duty, a flood, a rival\'s price cut or a new technology (external factors).'],
      v: vInsideOutside,
      n: 'In a case, ask four quick questions. Can the thing be put into numbers? Did the problem start outside the firm? Are people objecting to the checks? Is the system worth what it costs? The answer points you to the right limitation, and you can then quote the line that proves it.',
    }),
    sl('diagram', 'Planning and controlling: inseparable', {
      v: vCycle,
      n: 'Planning and controlling go together like the two blades of a pair of scissors. Planning sets the goals and standards. Without them, controlling has nothing to measure against, so it is blind. Without controlling, nobody knows whether the plan is working, so planning is meaningless. And the lessons from control flow back into the next plan.',
    }),
    sl('concept', 'Both look back and forward', {
      b: 'Planning is not only forward-looking, and controlling is not only backward-looking.',
      v: vTwoWays,
      n: 'A common exam question asks whether planning only looks forward and controlling only looks back. The better answer is no. Planning uses past results and control reports to set future goals. Controlling measures past work, but its corrective action and revised standards shape the future. So both functions look back and forward.',
    }),
    sl('check', 'Quick check: feedback into the plan', {
      b: 'Control findings show that sales targets for the hills were unrealistic, so next year\'s plan lowers them. What does this show?',
      chk: 'm_feedback',
      n: 'Notice the direction of the arrow here: from control results back into the next plan.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up: controlling makes sure work goes as planned and corrects gaps. It is goal-oriented, pervasive and continuous, and looks back and forward. It helps reach goals, test standards, save resources, motivate people, keep discipline and coordinate departments. It is limited by measurement, outside factors, resistance and cost. And it is inseparable from planning.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'In case questions, **name** the feature, importance or limitation, then **quote** the line.',
        'Do not confuse "judging accuracy of standards" with "accomplishing goals".',
        'External factors start **outside** the firm; resistance comes from **employees**.',
        '"Planning without controlling is meaningless; controlling without planning is blind."',
        '5 marks: five headed points, each with one line of explanation.',
      ],
      n: 'Marks in this chapter come from naming the right idea and proving it with the case. Write the name of the feature or importance as a heading, then quote the exact words. Keep similar ideas apart: a target found to be wrong is about accuracy of standards, not about reaching goals. And learn the line about planning and controlling; it often earns a mark.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Controlling — Part 2: The Controlling Process',
  goals: [
    'List and explain the five steps of the controlling process in order',
    'Calculate a deviation and express it as a percentage of the standard',
    'Apply critical point control and management by exception to decide what needs attention',
    'Suggest corrective action that removes the cause of a deviation',
  ],
  slides: [
    sl('title', 'The controlling process', {
      b: 'Part 2 — five steps: **set**, **measure**, **compare**, **analyse**, **correct**.',
      v: vRoute2,
      n: 'In part two we see how managers actually control. There are five steps: setting standards, measuring performance, comparing the two, analysing the deviations, and taking corrective action. We will also learn two useful ideas for analysing deviations, critical point control and management by exception, and practise some simple calculations.',
    }),
    sl('diagram', 'Five steps of controlling', {
      v: vProcess,
      n: 'Here are the five steps in order. First, set performance standards. Second, measure actual performance. Third, compare actual performance with the standards. Fourth, analyse the deviations to find which matter and why they happened. Fifth, take corrective action. Remember the order: set, measure, compare, analyse, correct.',
    }),
    sl('concept', 'Step 1: setting performance standards', {
      b: 'Standards are the **criteria** against which actual performance is judged.',
      v: vStandards,
      n: 'Standards can be quantitative, such as three hundred bicycles a day or two hundred rupees per jar. Others are qualitative, such as goodwill or morale, and have no simple number. Good standards are precise, so that performance can be measured against them, and flexible, so that they can be changed when conditions change.',
    }),
    sl('check', 'Quick check: put the steps in order', {
      b: 'Arrange the steps followed at an imagined bicycle factory.',
      chk: 'ord_process',
      n: 'Start with the target, and finish with the repair. What must happen in between?',
    }),
    sl('concept', 'Step 2: measuring actual performance', {
      b: 'Measure in the **same units** as the standard, objectively and reliably.',
      v: vMeasure,
      n: 'The second step is to measure what has actually been done. Managers use personal observation, sample checking, where a few items represent a whole batch, and performance reports from branches or departments. Measurement should be in the same units as the standard, otherwise comparison is impossible.',
    }),
    sl('diagram', 'Step 3: comparing actual with standard', {
      v: vBars,
      n: 'Now compare. This imagined bicycle factory has a standard of three hundred bicycles a day. Look at each bar against the dashed line. Monday is exactly on target, Wednesday is a little above, and Tuesday, Thursday and Friday are below. Thursday is far below. Comparison tells us whether there is a gap, and how big it is.',
    }),
    sl('example', 'Worked example 1: deviation as a percentage', {
      b: 'Deviation = actual minus standard; express it as a percentage of the standard.',
      bl: ['Step 1 — Find the gap: actual − standard', 'Step 2 — Divide the gap by the standard', 'Step 3 — Multiply by 100 and say whether it is a shortfall or an excess'],
      v: vDairy,
      n: 'Here is an imagined dairy in Karnal. It aimed to collect ten thousand litres a day but collected nine thousand four hundred: six hundred litres short, which is six per cent of the standard. Torn packets were sixty above the standard of two hundred, that is thirty per cent. Two vans out of fifty left late, which is four per cent.',
    }),
    sl('check', 'Quick check: work out the percentage', {
      b: 'A shoe unit has a standard of 500 pairs a day and produces 460. What is the deviation as a percentage of the standard?',
      chk: 'n_output_pct',
      n: 'Find the gap first, then divide it by the standard, not by the actual figure.',
    }),
    sl('concept', 'Step 4: analysing deviations', {
      b: 'Not every gap deserves the manager\'s time. Ask three questions.',
      v: vAnalyse,
      n: 'Once we know the gaps, we analyse them. Is the gap in a key result area? Is it bigger than the limit we can live with? And what caused it: machines, people, materials, an unrealistic standard, or something outside the firm? Only after these questions can the manager choose the right action.',
    }),
    sl('diagram', 'Critical point control', {
      v: vCpc,
      n: 'Critical point control means focusing on key result areas, the ones that affect the whole organisation. In a car parts firm, even a small rise in the cost of steel hurts profit, while a big rise in the tea bill hardly matters. So managers watch steel closely and leave minor areas to their juniors.',
    }),
    sl('diagram', 'Management by exception', {
      v: vBand,
      n: 'Management by exception says that only significant deviations, beyond a permissible limit, should reach senior managers. Here the limit is five per cent. Four days sit inside the shaded band, so supervisors handle them. Only Thursday, at ten per cent, crosses the line and is reported. The idea is that trying to control everything may end in controlling nothing.',
    }),
    sl('check', 'Quick check: why manage by exception?', {
      b: 'Which is a benefit of management by exception?',
      chk: 'm_mbe_benefit',
      n: 'Think about the manager\'s time. What happens to it when only big deviations reach her desk?',
    }),
    sl('example', 'Worked example 2: what should be reported?', {
      b: `Standard 300 bicycles a day; report only deviations beyond ${CYCLE_TOL}%.`,
      bl: ['Step 1 — Deviation for each day', 'Step 2 — Divide by 300 and multiply by 100', `Step 3 — Compare with the ${CYCLE_TOL}% limit`, 'Step 4 — Report only the days beyond it'],
      v: vReport,
      n: 'Let us apply management by exception. Tuesday is twelve short, which is four per cent. Wednesday is six over, two per cent. Thursday is thirty short, which is ten per cent. Friday is three short, one per cent. Only Thursday is beyond the five per cent limit, so only Thursday goes to the production manager.',
    }),
    sl('concept', 'Step 5: taking corrective action', {
      b: 'Corrective action must remove the **cause**, not just the symptom.',
      v: vCorrect,
      n: 'The last step is to correct. The action must fit the cause. Faulty machines need repair or replacement. Untrained workers need training. Late materials need earlier orders or a second supplier. Low morale needs incentives and recognition. And if the standard itself was unrealistic, the right action is to revise the standard.',
    }),
    sl('two-column', 'Two kinds of correction', {
      cols: ['**Fix the performance**\n\nThe standard is fair, but work fell short: repair, train, reorganise.', '**Fix the standard**\n\nNobody could meet it, or everyone beats it easily: revise it.'],
      n: 'Corrective action can go in two directions. Usually the standard is fair and the work needs fixing. But sometimes analysis shows the standard was wrong, too hard or too easy. Then the sensible correction is to revise the standard. And if the deviation is within the limit, no action is needed at all.',
    }),
    sl('check', 'Quick check: which step and technique?', {
      b: 'A supervisor weighs 50 soap cakes from every batch. Which step, and which technique?',
      chk: 'm_measure_method',
      n: 'Is the supervisor fixing a target, finding a gap, or finding out what was actually produced?',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up: set clear standards, measure actual performance in the same units, compare to find the gap, analyse it using critical point control and management by exception and find its cause, and then correct the cause or revise the standard. Percentage deviation is the gap divided by the standard, multiplied by one hundred.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Learn the five steps **in order**; ordering and "identify the step" questions are common.',
        'Percentage deviation: divide by the **standard**, not the actual.',
        'Critical point control = **which areas**; management by exception = **which deviations**.',
        'In cases, corrective action must match the **cause** given.',
        'Quote the exact line when asked to "quote".',
      ],
      n: 'In the exam, learn the five steps in order. In calculations, always divide the gap by the standard. Keep the two principles apart: critical point control is about which areas to watch, and management by exception is about which deviations to report. And when you suggest a corrective action, make sure it removes the cause mentioned in the case.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Controlling — Notes',
  sections: [
    {
      h: '1. Meaning and features',
      t: 1,
      b: '**Controlling** is the management function of seeing that actual work conforms to plans, and of correcting deviations when it does not. Every manager, at every level, controls the work under them.\n\n**Features**\n1. **Goal-oriented** — it keeps the organisation on course to its goals.\n2. **Pervasive** — at all levels, in business and non-business organisations alike.\n3. **Continuous** — the cycle of checking never stops.\n4. **A primary function** of every manager.\n5. **Backward- and forward-looking** — it reviews work done, and its findings improve future work.',
      terms: [
        ['Controlling', 'Ensuring that activities take place as planned and correcting them where they do not.'],
        ['Deviation', 'The difference between actual performance and the standard.'],
      ],
      v: vFeatures,
      vs: [vMeaning],
    },
    {
      h: '2. Importance of controlling',
      t: 1,
      b: '1. **Accomplishing organisational goals** — gaps are found early and closed.\n2. **Judging accuracy of standards** — repeated large gaps (above or below) show that a standard needs revision.\n3. **Making efficient use of resources** — working to standards reduces waste and spoilage.\n4. **Improving employee motivation** — employees know beforehand what is expected and the basis of appraisal.\n5. **Ensuring order and discipline** — close checks reduce dishonest behaviour.\n6. **Facilitating coordination in action** — each department works to standards that fit with the others.',
      terms: [['Standard', 'A predetermined criterion (target) against which performance is judged.']],
      v: vImportance,
      vs: [vSpotImportance],
    },
    {
      h: '3. Limitations of controlling',
      t: 1,
      b: '1. **Difficulty in setting quantitative standards** — morale, courtesy and job satisfaction cannot easily be counted, so control over them is less effective.\n2. **Little control on external factors** — government policy, technology, competition and natural events lie outside the firm.\n3. **Resistance from employees** — strict checks (cameras, tracking) may be seen as a curb on freedom.\n4. **Costly affair** — control systems take money, time and effort; the benefit should exceed the cost, which can be hard for small firms.',
      v: vLimits,
      vs: [vInsideOutside],
    },
    {
      h: '4. Planning and controlling',
      t: 1,
      b: 'Planning and controlling are **inseparable twins**. Planning sets goals and standards; controlling checks whether they are being achieved.\n\n- Planning **without** controlling is **meaningless**: no one knows whether the plan works.\n- Controlling **without** planning is **blind**: there is nothing to measure against.\n\n**Both look back and forward.** Planning draws on past results and control reports to set future goals; controlling reviews completed work, but corrective action and revised standards improve the future.',
      v: vCycle,
      vs: [vTwoWays],
    },
    {
      h: '5. The controlling process: steps 1 to 3',
      t: 2,
      b: '**1. Setting performance standards** — quantitative (units, cost, time, defects) or qualitative (goodwill, morale). Standards should be **precise** and **flexible**.\n\n**2. Measurement of actual performance** — objective and reliable, in the **same units** as the standard; by personal observation, sample checking or performance reports.\n\n**3. Comparing actual performance with standards** — reveals whether there is a deviation and how large it is.\n\n**Percentage deviation** = (actual − standard) ÷ standard × 100, stated as a shortfall or an excess.',
      terms: [
        ['Sample checking', 'Testing a few items to judge a whole batch.'],
        ['Percentage deviation', 'The gap between actual and standard, divided by the standard and multiplied by 100.'],
      ],
      v: vProcess,
      vs: [vStandards, vMeasure, vBars, vDairy],
    },
    {
      h: '6. Steps 4 and 5: analysing deviations and corrective action',
      t: 2,
      b: '**4. Analysing deviations**\n- **Critical point control:** focus on **key result areas** (KRAs) that affect the entire organisation, e.g. raw-material cost or safety, rather than on everything equally.\n- **Management by exception:** only **significant deviations beyond a permissible limit** are brought to senior managers; minor ones are handled lower down. If managers try to control everything, they may end up controlling nothing.\n- Then find the **cause**: machines, people, materials, unrealistic standards or outside factors.\n\n**5. Taking corrective action** — remove the cause (repair, train, reorder, motivate), or **revise the standard** if it was unrealistic. No action is needed when the deviation is within the limit.',
      terms: [
        ['Key result area', 'An area of work whose results affect the whole organisation.'],
        ['Critical point control', 'Concentrating control on key result areas.'],
        ['Management by exception', 'Reporting only significant deviations, beyond a set limit, to higher management.'],
      ],
      v: vAnalyse,
      vs: [vCpc, vBand, vReport, vCorrect],
    },
  ],
  tips: '**Common mistakes**\n- Writing "comparison" when the line describes **measurement** (counting, weighing, collecting reports).\n- Dividing the deviation by the **actual** figure instead of the **standard**.\n- Mixing up critical point control (which **areas**) and management by exception (which **deviations**).\n- Suggesting a corrective action that does not match the **cause** in the case.\n- Calling controlling only backward-looking.\n\n**How marks are usually awarded**\n- 1 mark: the correct option, or the name of a step, feature, importance or limitation.\n- 3–4 mark cases: name + quoted line for each part.\n- 5 marks: five headed points; for the process, all five steps in order.\n\nAll firms and figures in SOYL practice are imagined; the board paper gives its own case.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Controlling**', 'Ensuring that work goes **according to plan** and correcting deviations.', 'definition', 1],
  ['Why is controlling **goal-oriented**?', 'It keeps the organisation moving towards its planned goals.', 'concept', 1],
  ['**Pervasive** (controlling)', 'Done at every level and in every type of organisation.', 'definition', 1],
  ['Backward- **and** forward-looking?', 'Reviews work done (back) and improves future work through correction (forward).', 'concept', 1],
  ['Six points of importance', 'Goals; accuracy of standards; efficient resources; motivation; order and discipline; coordination.', 'concept', 1],
  ['A target nobody meets is revised. Importance?', '**Judging accuracy of standards.**', 'example', 1],
  ['Theft stops after daily checks. Importance?', '**Ensuring order and discipline.**', 'example', 1],
  ['Four limitations of controlling', 'Hard to set quantitative standards; little control on external factors; resistance from employees; costly.', 'concept', 1],
  ['Staff protest against cameras. Limitation?', '**Resistance from employees.**', 'example', 1],
  ['A new import duty raises costs. Limitation?', '**Little control on external factors.**', 'example', 1],
  ['Planning without controlling is…', '**Meaningless.**', 'fact', 1],
  ['Controlling without planning is…', '**Blind.**', 'fact', 1],
  ['Five steps of controlling', 'Set standards → measure → compare → analyse deviations → corrective action.', 'concept', 2],
  ['Quantitative vs qualitative standard', 'Numbers (300 units a day) vs no simple number (goodwill, morale).', 'concept', 2],
  ['Two qualities of good standards', '**Precise** and **flexible**.', 'fact', 2],
  ['Three ways to measure performance', 'Personal observation, sample checking, performance reports.', 'fact', 2],
  ['**Sample checking**', 'Testing a few items to judge the whole batch.', 'definition', 2],
  ['Percentage deviation', '(Actual − standard) ÷ **standard** × 100.', 'formula', 2],
  ['Standard 500, actual 460: % deviation?', '40 ÷ 500 × 100 = **8%** short.', 'example', 2],
  ['**Key result area**', 'An area whose results affect the whole organisation.', 'definition', 2],
  ['**Critical point control**', 'Focus control on key result areas, not on everything equally.', 'definition', 2],
  ['**Management by exception**', 'Only deviations **beyond a permissible limit** go to senior managers.', 'definition', 2],
  ['"Trying to control everything…"', '"…may end up in controlling nothing." (basis of management by exception)', 'fact', 2],
  ['CPC vs MBE in one line', 'CPC: **which areas** to watch. MBE: **which deviations** to report.', 'exam-tip', 2],
  ['Deviation within the limit?', 'No corrective action; work continues.', 'concept', 2],
  ['Cause: untrained workers. Action?', 'Training and closer supervision.', 'example', 2],
  ['Cause: unrealistic standard. Action?', '**Revise the standard.**', 'example', 2],
  ['Weighing 50 cakes from each batch is which step?', '**Measurement** of actual performance (sample checking).', 'exam-tip', 2],
  ['Finding that blades were worn out is which step?', '**Analysing deviations** (finding the cause).', 'exam-tip', 2],
  ['Last step of controlling', '**Taking corrective action.**', 'fact', 2],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-default-chapter-test-short',
  title: 'Chapter test (short) — Controlling',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_meaning', 'm_cpc', 'm_lim_external', 'ar_goals'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_cpc_mbe', 's_lim_two', 's3_process_steps'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_importance', 'l_corrective'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the passage and answer all parts. Part (c) has an internal choice.', items: ['cb_shanti'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-default-chapter-test-long',
  title: 'Chapter test (long) — Controlling',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_goal_oriented', 'm_both_looking', 'm_accuracy_std', 'm_lim_cost', 'm_plan_control', 'm_first_step', 'm_mbe', 'm_corrective', 'ar_mbe', 'ar_backward'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_meaning_features', 's_measure', { attempt: 1, keys: ['s_plan_control_rel', 's_corrective_examples'] }, 's3_importance_three', { attempt: 1, keys: ['s3_analyse', 's3_mbe_numeric'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_process', { attempt: 1, keys: ['l_limitations_rel', 'l_cpc_mbe'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each passage and answer all parts. Part (c) of each has an internal choice.', items: ['cb_kesar', 'cb_aarohi'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t02 of cbse-12-business-studies-ch08 only (concept, features, importance, limitations and the planning link; the controlling process with critical point control and management by exception)',
    originality: 'every firm, case, report and figure written for this chapter (imagined Indian businesses, labelled); no NCERT text, exercise or board/sample-paper item reused',
    data: `imagined figures computed by the build: ${OUT.std}/${OUT.act} → ${OUT_D.pct}%; ${COST.std}/${COST.act} → ${COST_D.pct}%; ${inr(POWER.std)}/${inr(POWER.act)} → ${POWER_D.pct}% against ${POWER.tol}%; ${inr(HOURS.std)}/${inr(HOURS.act)} → ${HOURS_D.pct}%; Kesar Sweets ${KESAR_D.map((x) => x.pct).join('/')}% against ${KESAR_TOL}%; dairy ${DAIRY_D.map((x) => x.pct).join('/')}%; bicycles ${CYCLE_D.map((x) => x.pct).join('/')}% against ${CYCLE_TOL}% (report ${CYCLE_REPORT.join(', ')})`,
    facts: 'no dated or statistical real-world facts; concepts only',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
