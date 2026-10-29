// Build CBSE 12 Business Studies ch04 Planning. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-12-business-studies-ch04/src/build.mjs
import assert from 'node:assert/strict';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-business-studies-ch04', 'economics-commerce');
const { inr, FAIR, FAIR_STALL, FAIR_TRAVEL, FAIR_REST, SB, SB_VALUE } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- worked-example figures (computed)
// Deck 1: sales targets vs actual sales of an imagined paint company (₹ lakh), three regions.
const REG = [
  { name: 'North', target: 80, actual: 84 },
  { name: 'West', target: 100, actual: 92 },
  { name: 'South', target: 60, actual: 60 },
];
const REG_GAP = REG.map((r) => r.actual - r.target); // +4, -8, 0
assert.deepEqual(REG_GAP, [4, -8, 0]);
// Deck 2: sales budget of an imagined ceiling-fan maker (different numbers from the bank item).
const WB = { units: 8000, price: 900 };
const WB_VALUE = WB.units * WB.price; // 72,00,000
assert.equal(WB_VALUE, 7200000);
const WB_Q = { q1: 1500, q2: 1700, q3: 2600 };
const WB_Q4 = WB.units - WB_Q.q1 - WB_Q.q2 - WB_Q.q3; // 2,200
assert.equal(WB_Q4, 2200);

// ---------------------------------------------------------------- visuals
const vRoute1 = flow('LR', ['What planning is', 'Its features', 'Why it matters', 'Its limitations', 'Making plans work'], 'Route map of Part 1: what planning is, its features, why it matters, its limitations and how to make plans work', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['The seven steps of planning', 'Single-use and standing plans', 'Objectives and strategy', 'Policy, procedure, method, rule', 'Programme and budget'], 'Route map of Part 2: the seven steps of planning, single-use and standing plans, objectives and strategy, policy, procedure, method and rule, and programme and budget', 'Part 2 at a glance');
const vQuestions = table(
  ['A plan answers…', 'Example: an imagined juice brand in Nashik'],
  [
    ['What is to be achieved?', 'Sell 2 lakh bottles this summer'],
    ['How will it be done?', 'Supply college canteens and gyms'],
    ['When?', 'March to June'],
    ['Who will do it?', 'Two new sales executives under the sales head'],
  ],
  'Table of the questions a plan answers: what is to be achieved (sell 2 lakh bottles this summer), how (supply college canteens and gyms), when (March to June) and who (two new sales executives under the sales head)',
  'Planning decides these in advance.',
);
const vPrimary = flow('LR', ['Planning: goals and the course of action', 'Organising', 'Staffing', 'Directing', 'Controlling'], 'Flow showing planning first, followed by organising, staffing, directing and controlling, all carried out to fulfil the plan', 'Every other function serves the plan');
const vFeatures = table(
  ['Feature', 'In one line'],
  [
    ['Focuses on objectives', 'Every plan exists to reach a goal'],
    ['Primary function', 'Comes before the other functions'],
    ['Pervasive', 'Found at every level and in every department'],
    ['Continuous', 'One plan follows another, period after period'],
    ['Futuristic', 'Looks ahead and forecasts'],
    ['Involves decision making', 'Choosing among alternatives'],
    ['Mental exercise', 'Needs foresight and judgement'],
  ],
  'Table of seven features of planning: focuses on objectives, primary function, pervasive, continuous, futuristic, involves decision making and is a mental exercise, each with a one-line meaning',
);
const vLevels = table(
  ['Level (imagined cable company)', 'What is planned', 'Time span'],
  [
    ['Top: managing director', 'A new factory in Odisha', 'Three to five years'],
    ['Middle: production manager', 'Monthly output of each cable type', 'A month to a year'],
    ['Lower: shift supervisor', 'Which worker runs which machine today', 'A day or a week'],
  ],
  'Table of planning at three levels of an imagined cable company: the managing director plans a new factory over three to five years, the production manager plans monthly output, and a shift supervisor plans daily machine assignments',
  'Planning is pervasive: scope differs, the activity does not.',
);
const vSpotFeature = table(
  ['Line from the case', 'Feature', 'Clue word'],
  [
    ['"…studied demand expected in the next festive season…"', 'Futuristic', 'next season'],
    ['"…compared three ways and picked the cheapest safe one…"', 'Involves decision making', 'picked'],
    ['"…as soon as the summer plan ended, work began on the winter plan…"', 'Continuous', 'as soon as … ended'],
  ],
  'Worked example table matching three lines from an imagined case to features of planning: studying next season demand shows futuristic, comparing and picking shows decision making, and starting the winter plan when the summer plan ends shows continuous',
);
const vImportance = table(
  ['Importance', 'What it does for the firm'],
  [
    ['Provides direction', 'Everyone knows the goal and their part in it'],
    ['Reduces risks of uncertainty', 'Prepares responses before changes arrive'],
    ['Reduces overlapping and waste', 'Coordinates departments; no duplicate work'],
    ['Promotes innovative ideas', 'The search for options sparks new thinking'],
    ['Facilitates decision making', 'Gives criteria to judge choices'],
    ['Establishes standards for controlling', 'Targets become yardsticks for performance'],
  ],
  'Table of six points of importance of planning: provides direction, reduces risks of uncertainty, reduces overlapping and waste, promotes innovative ideas, facilitates decision making, and establishes standards for controlling',
);
const vTargets = (() => {
  const s = new Svg(560, 300);
  const c = s.chart({ x0: 0, x1: 9, y0: 0, y1: 120, left: 60, top: 30, width: 440, height: 210, xLabel: 'Region', yLabel: 'Sales (₹ lakh)' });
  REG.forEach((r, i) => {
    const x = 1 + i * 3;
    s.rect(c.X(x), c.Y(r.target), c.X(x + 1) - c.X(x), c.Y(0) - c.Y(r.target), { color: 'muted', fill: 'muted', fillOpacity: 0.5, sw: 1, rx: 0 });
    s.rect(c.X(x + 1.1), c.Y(r.actual), c.X(x + 2.1) - c.X(x + 1.1), c.Y(0) - c.Y(r.actual), { color: 'accent', fill: 'accent', fillOpacity: 0.8, sw: 1, rx: 0 });
    c.label([x + 1.05, 0], r.name, { dy: 16, size: 12 });
    c.label([x + 1.6, r.actual], String(r.actual), { dy: -10, size: 11 });
    c.label([x + 0.5, r.target], String(r.target), { dy: -10, size: 11 });
  });
  c.yTick(40, '40').yTick(80, '80').yTick(120, '120');
  s.rect(370, 20, 12, 12, { color: 'muted', fill: 'muted', fillOpacity: 0.5, sw: 1, rx: 0 });
  s.text(388, 26, 'Target (plan)', { anchor: 'start', size: 12 });
  s.rect(370, 40, 12, 12, { color: 'accent', fill: 'accent', fillOpacity: 0.8, sw: 1, rx: 0 });
  s.text(388, 46, 'Actual', { anchor: 'start', size: 12 });
  return s.visual(
    `Bar chart of an imagined paint company's sales in three regions, in lakh rupees: North target ${REG[0].target}, actual ${REG[0].actual}; West target ${REG[1].target}, actual ${REG[1].actual}; South target ${REG[2].target}, actual ${REG[2].actual}`,
    'Imagined figures. Planned targets are the standards; the gap is what controlling acts on.',
  );
})();
const vLimits = table(
  ['Limitation', 'Why it happens'],
  [
    ['Leads to rigidity', 'Managers feel bound to the fixed plan'],
    ['May not work in a dynamic environment', 'Policy, technology or demand changes unexpectedly'],
    ['Reduces creativity', 'Lower levels mainly carry out plans made at the top'],
    ['Involves huge costs', 'Surveys, experts and forecasts are expensive'],
    ['Time-consuming', 'Long preparation can delay action'],
    ['Does not guarantee success', 'A plan helps only if it fits conditions and is carried out'],
  ],
  'Table of six limitations of planning: rigidity, may not work in a dynamic environment, reduces creativity, involves huge costs, time-consuming, and does not guarantee success, each with the reason it arises',
);
const vDynamic = flow('LR', ['Plan fixed in January', 'Customs duty raised in March', 'Costs no longer match the plan', 'Plan must be revised or it fails'], 'Flow of an imagined toy importer: the plan is fixed in January, customs duty is raised in March, costs no longer match the plan, and the plan must be revised or it fails', 'A change in the environment can overtake a plan');
const vSpotLimit = table(
  ['Line from the case (imagined spice exporter)', 'Limitation'],
  [
    ['"…paid a consultancy a large fee…"', 'Huge costs'],
    ['"…spent three months preparing the plan…"', 'Time-consuming'],
    ['"…told the markets were already fixed for the year…"', 'Rigidity'],
    ['"…staff simply followed head-office instructions…"', 'Reduces creativity'],
  ],
  'Worked example table matching four lines from an imagined case to limitations of planning: a large consultancy fee shows huge costs, three months of preparation shows time-consuming, markets already fixed shows rigidity, and staff following instructions shows reduced creativity',
);
const vRemedies = flow('TB', ['Keep plans flexible with review points', 'Involve staff from different levels', 'Use follow-up to correct course', 'Benefits of planning outweigh its limits'], 'Flow of ways to make planning work: keep plans flexible with review points, involve staff from different levels, use follow-up to correct course, so that the benefits outweigh the limitations', 'Living with the limitations');
const vSummary1 = table(
  ['Idea', 'Remember'],
  [
    ['Meaning', 'Deciding in advance what to do, how, when and by whom'],
    ['Features (7)', 'Objectives, primary, pervasive, continuous, futuristic, decision making, mental'],
    ['Importance (6)', 'Direction, uncertainty, overlapping, innovation, decisions, control standards'],
    ['Limitations (6)', 'Rigidity, dynamic environment, creativity, costs, time, no guarantee'],
  ],
  'Summary table of Part 1: meaning of planning, seven features, six points of importance and six limitations',
);
const vProcess = flow('TB', ['1. Setting objectives', '2. Developing premises', '3. Identifying alternative courses of action', '4. Evaluating alternative courses', '5. Selecting an alternative', '6. Implementing the plan', '7. Follow-up action'], 'Flow of the seven steps of the planning process from setting objectives to follow-up action', 'The planning process');
const vPremises = table(
  ['Premise (assumption about the future)', 'Plan it affects'],
  [
    ['Demand for school shoes will rise before June', 'Production plan'],
    ['Leather prices will stay steady', 'Purchase budget'],
    ['A new GST return rule will start next year', 'Accounts staffing'],
  ],
  'Table of three premises of an imagined shoe maker: demand rising before June affects the production plan, steady leather prices affect the purchase budget, and a new tax return rule affects accounts staffing',
  'Premises are forecasts; all planners should work from the same ones.',
);
const vAlternatives = table(
  ['Alternative (imagined sweet shop)', 'Cost', 'Risk', 'Likely gain'],
  [
    ['Open a second outlet', 'High', 'Medium', 'High'],
    ['Start home delivery', 'Low', 'Low', 'Medium'],
    ['Supply hotels', 'Medium', 'High', 'Medium'],
  ],
  'Table comparing three alternatives of an imagined sweet shop on cost, risk and likely gain: a second outlet is high cost, medium risk and high gain; home delivery is low cost, low risk and medium gain; supplying hotels is medium cost, high risk and medium gain',
  'Steps 3 to 5: list, weigh, choose.',
);
const vImplement = flow('LR', ['Selected plan', 'Assign people, money and deadlines', 'Act', 'Monitor results', 'Correct the plan if needed'], 'Flow of steps six and seven: the selected plan is put into action by assigning people, money and deadlines, then results are monitored and the plan corrected if needed', 'Steps 6 and 7');
const vKitchen = table(
  ['Step', 'What Tiffin Tales (imagined cloud kitchen, Pune) does'],
  [
    ['Objectives', 'Serve 600 orders a day within a year'],
    ['Premises', 'Office lunches will keep growing; app fees stay the same'],
    ['Alternatives', 'More cooks; a second kitchen; a smaller menu'],
    ['Evaluation', 'Compares cost, speed and food quality of each'],
    ['Selection', 'A second kitchen plus a smaller menu'],
    ['Implementation', 'Leases space, hires cooks, sets opening date'],
    ['Follow-up', 'Checks daily orders against the target every week'],
  ],
  'Worked example table applying the seven planning steps to an imagined cloud kitchen in Pune, from the objective of 600 orders a day to weekly follow-up of orders against the target',
);
const vTypes = flow('TB', ['Plans', 'Single-use: one event or project (programme, budget)', 'Standing: used again and again (policy, procedure, method, rule)'], 'Flow dividing plans into single-use plans for one event or project, such as programmes and budgets, and standing plans used repeatedly, such as policies, procedures, methods and rules', 'Two families of plans', [{ from: 'n1', to: 'n2' }, { from: 'n1', to: 'n3' }]);
const vObjStrat = table(
  ['', 'Objective', 'Strategy'],
  [
    ['What it is', 'The end result wanted', 'The comprehensive plan to reach long-term goals'],
    ['Imagined example', 'Thirty outlets in Telangana in five years', 'Franchise outlets, local flavours, most funds to the first ten'],
    ['Looks at', 'Where the firm wants to be', 'Direction, action and resources, given the environment'],
  ],
  'Table comparing objectives and strategy: an objective is the end result wanted, such as thirty outlets in five years; a strategy is the comprehensive plan covering direction, action and resources, such as franchise outlets with local flavours',
);
const vPolicyRule = table(
  ['Basis', 'Policy', 'Rule'],
  [
    ['Nature', 'General guide to decisions', 'Specific statement of what to do or not do'],
    ['Discretion', 'Allowed', 'None'],
    ['Penalty', 'Usually none', 'Usually attached'],
    ['Imagined example', '"We prefer local suppliers where possible"', '"No phones on the packing line"'],
  ],
  'Table distinguishing policy and rule: a policy is a general guide that allows discretion and has no penalty; a rule is specific, allows no discretion and usually carries a penalty',
);
const vProcedure = flow('LR', ['Fill in the claim form', 'Manager checks it', 'Accounts verifies bills', 'Payment to the account'], 'Flow of an imagined procedure for an expense claim: fill in the form, the manager checks it, accounts verifies bills, and payment is made to the account', 'A procedure: steps in order. A method: how one step is done (for example, scanning bills instead of photocopying)');
const vFair = (() => {
  const s = new Svg(560, 280);
  const parts = [
    ['Stall', FAIR_STALL, 'accent'],
    ['Travel', FAIR_TRAVEL, 'blue'],
    ['Samples and publicity', FAIR_REST, 'green'],
  ];
  const c = s.chart({ x0: 0, x1: 10, y0: 0, y1: 300000, left: 80, top: 30, width: 420, height: 190, xLabel: 'Head of spending', yLabel: 'Amount (₹)' });
  parts.forEach(([name, v, col], i) => {
    const x = 1 + i * 3;
    s.rect(c.X(x), c.Y(v), c.X(x + 2) - c.X(x), c.Y(0) - c.Y(v), { color: col, fill: col, fillOpacity: 0.75, sw: 1, rx: 0 });
    c.label([x + 1, v], inr(v), { dy: -10, size: 12 });
    c.label([x + 1, 0], name, { dy: 16, size: 12 });
  });
  c.yTick(100000, '1,00,000').yTick(200000, '2,00,000').yTick(300000, '3,00,000');
  return s.visual(
    `Bar chart of an imagined weavers' cooperative's budget for a trade fair, total ${inr(FAIR.total)} rupees: stall ${inr(FAIR_STALL)}, travel ${inr(FAIR_TRAVEL)}, samples and publicity ${inr(FAIR_REST)}`,
    'Imagined figures. A budget is a plan in numbers and later a control device.',
  );
})();
const vClassify = table(
  ['Statement (imagined hotel handbook)', 'Type of plan', 'Clue'],
  [
    ['"Guests with disabilities are given ground-floor rooms where available."', 'Policy', 'guide, "where available"'],
    ['"Check-in: verify ID, enter details, hand over key card."', 'Procedure', 'steps in order'],
    ['"Smoking is not allowed in any room."', 'Rule', 'no discretion'],
    ['"Rooms are cleaned using the two-bucket mopping system."', 'Method', 'how one task is done'],
    ['"Raise room occupancy to 80 per cent by December."', 'Objective', 'end result, deadline'],
  ],
  'Worked example table classifying five statements from an imagined hotel handbook: a guide with room for judgement is a policy, steps in order are a procedure, no smoking is a rule, the mopping system is a method, and a target occupancy is an objective',
);
const vSalesBudget = table(
  ['Quarter', 'Units (imagined ceiling-fan maker)'],
  [
    ['April–June', inr(WB_Q.q1)],
    ['July–September', inr(WB_Q.q2)],
    ['October–December', inr(WB_Q.q3)],
    ['January–March', `${inr(WB_Q4)} (= ${inr(WB.units)} − ${inr(WB_Q.q1)} − ${inr(WB_Q.q2)} − ${inr(WB_Q.q3)})`],
    ['**Year**', `**${inr(WB.units)} units × ₹${inr(WB.price)} = ₹${inr(WB_VALUE)}**`],
  ],
  `Worked example table of an imagined ceiling-fan maker's sales budget: ${inr(WB_Q.q1)}, ${inr(WB_Q.q2)}, ${inr(WB_Q.q3)} and ${inr(WB_Q4)} units in the four quarters, ${inr(WB.units)} units in the year at ${inr(WB.price)} rupees each, worth ${inr(WB_VALUE)} rupees`,
);
const vSummary2 = table(
  ['Idea', 'Remember'],
  [
    ['Planning process', 'Objectives → premises → alternatives → evaluate → select → implement → follow up'],
    ['Single-use plans', 'Programme, budget (one event or project)'],
    ['Standing plans', 'Policy, procedure, method, rule (used repeatedly)'],
    ['Objectives and strategy', 'The end result; the comprehensive plan to reach it'],
  ],
  'Summary table of Part 2: the seven-step planning process, single-use plans (programme, budget), standing plans (policy, procedure, method, rule), and objectives and strategy',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Planning — Part 1: Meaning, Features, Importance and Limitations',
  goals: [
    'Explain the meaning of planning and why it is the primary function of management',
    'Identify the features of planning in business situations',
    'Explain the importance of planning and link it to controlling',
    'Identify the limitations of planning in a case and suggest how to reduce them',
  ],
  slides: [
    sl('title', 'Planning', {
      b: 'Part 1 — what planning is, its **features**, why it **matters** and its **limitations**.',
      v: vRoute1,
      n: 'Every successful trip, wedding or business launch begins with a plan. In this chapter we study planning as a function of management. Part one explains what planning means, its main features, why businesses cannot do without it, and also its limitations, because a plan can sometimes hold a business back.',
    }),
    sl('concept', 'What is planning?', {
      b: '**Planning** is deciding **in advance** what is to be done, how, when and by whom, so that the organisation reaches its goals.',
      v: vQuestions,
      n: 'Planning means deciding in advance. Look at this imagined juice brand. Before summer starts, it decides what to achieve, how to do it, when, and who will be responsible. Once these answers are written down, everyone in the business knows where it is going and how it plans to get there.',
    }),
    sl('concept', 'The primary function', {
      b: 'Planning comes **first**: the other functions of management are carried out to fulfil the plan.',
      v: vPrimary,
      n: 'Management has five functions: planning, organising, staffing, directing and controlling. Planning comes first. Resources are organised, people are hired and guided, and results are checked, all in order to carry out the plan. That is why planning is called the primary function of management.',
    }),
    sl('diagram', 'Seven features of planning', {
      v: vFeatures,
      n: 'Here are seven features. Planning focuses on objectives. It is the primary function. It is pervasive, found at every level. It is continuous, as one plan follows another. It is futuristic, because it looks ahead. It involves decision making, since we choose among alternatives. And it is a mental exercise that needs foresight and judgement.',
    }),
    sl('check', 'Quick check: which feature?', {
      b: 'A snack maker studies next festive season\'s demand before fixing production. Which feature is this?',
      chk: 'm_futuristic',
      n: 'Look for the clue in the time. Is the manager looking back at the past, or forward to a coming period?',
    }),
    sl('concept', 'Planning at every level', {
      b: 'Top, middle and lower managers all plan; only the **scope and time span** differ.',
      v: vLevels,
      n: 'Is planning only for the boss? No. In this imagined cable company, the managing director plans a new factory for the next few years. The production manager plans monthly output. A shift supervisor plans which worker runs which machine today. Each plans, but with a different scope and time span. This is what we mean by pervasive.',
    }),
    sl('example', 'Worked example 1: spotting a feature in a case', {
      b: 'Board questions often quote a line and ask for the feature.',
      bl: ['Step 1 — Find the clue word in the line', 'Step 2 — Match it to one feature only', 'Step 3 — Name the feature and explain it in one sentence using the case'],
      v: vSpotFeature,
      n: 'Let us practise. Studying demand for the next season is about the future, so the feature is futuristic. Comparing three ways and picking one shows decision making. Starting the winter plan as soon as the summer plan ends shows that planning is continuous. Always name the feature, then explain it using words from the case.',
    }),
    sl('diagram', 'Why plan? Six points of importance', {
      v: vImportance,
      n: 'Why do businesses plan? Planning gives direction, so everyone knows the goal. It reduces the risks of uncertainty by preparing for change. It reduces overlapping and waste by coordinating departments. It encourages new ideas. It helps decision making by giving criteria. And it sets the standards that are later used for controlling.',
    }),
    sl('diagram', 'Planning makes controlling possible', {
      b: 'Targets fixed in the plan are the **yardstick**; controlling compares actual results with them.',
      v: vTargets,
      n: 'Here is an imagined paint company. The grey bars are sales targets from the plan; the coloured bars are actual sales. North beat its target by four lakh rupees, West fell short by eight, and South met it exactly. Without the planned targets there would be nothing to compare with. So planning provides the standards for controlling.',
    }),
    sl('check', 'Quick check: which importance?', {
      b: 'Two hospital departments stopped ordering the same medicines separately after a common plan. Which importance is shown?',
      chk: 'm_imp_overlap',
      n: 'Ask yourself what problem disappeared once the departments planned together.',
    }),
    sl('diagram', 'Limitations of planning', {
      v: vLimits,
      n: 'Planning also has limits. A fixed plan can make managers rigid. It may fail when the environment changes suddenly. It can reduce creativity, because people below mostly follow orders. It costs money and takes time. And no plan can guarantee success: it helps only if it suits the conditions and is carried out properly.',
    }),
    sl('two-column', 'Rigidity and a changing environment', {
      cols: ['**Rigidity**\n\nThe plan says Delhi and Jaipur only, so a manager cannot grab a chance in Lucknow.', '**Dynamic environment**\n\nA new duty, rule or technology arrives after the plan is fixed, and the plan stops fitting.'],
      v: vDynamic,
      n: 'Two limitations are often confused. Rigidity is about the firm itself: managers feel bound to the plan even when a better option appears. A dynamic environment is about the outside world: a duty, a rule or a technology changes after the plan is fixed, so the plan no longer fits. In a case, ask whether the problem started inside or outside the firm.',
    }),
    sl('example', 'Worked example 2: finding limitations in a case', {
      b: 'An imagined spice exporter: read each line and name the limitation.',
      bl: ['Step 1 — Underline the costs, delays and refusals in the case', 'Step 2 — Match each to one limitation', 'Step 3 — Quote the line as evidence'],
      v: vSpotLimit,
      n: 'This imagined spice exporter paid consultants a large fee, which shows huge costs. Spending three months on the plan shows it is time consuming. A manager told the markets were already fixed shows rigidity. Staff who simply follow instructions show reduced creativity. Name the limitation and quote the line: that is how marks are awarded.',
    }),
    sl('check', 'Quick check: true or false', {
      b: 'True or false? A carefully prepared plan guarantees success.',
      chk: 'tf_guarantee',
      n: 'Think about everything that can happen after a plan is made.',
    }),
    sl('concept', 'Making planning work', {
      b: 'The limitations do not mean "do not plan"; they mean **plan wisely**.',
      v: vRemedies,
      n: 'Do the limitations mean firms should stop planning? Not at all. Good managers keep plans flexible, with review points. They involve people from different levels so ideas are not lost. And they use follow up to correct the plan as conditions change. Handled this way, the benefits of planning are far greater than its costs.',
    }),
    sl('check', 'Quick check: a limitation', {
      b: 'Supervisors say, "Top management has decided everything; we just follow." Which limitation is this?',
      chk: 'm_lim_creativity',
      n: 'Think about what happens to new ideas from people who only follow orders.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up: planning means deciding in advance what to do, how, when and by whom. It has seven features, from focus on objectives to being a mental exercise. It matters for six reasons, including direction and standards for control. And it has six limitations, such as rigidity and cost, which wise managers reduce with flexible plans.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'In case questions, **name the feature, importance or limitation and quote the line** that shows it.',
        'Do not mix up **rigidity** (inside the firm) with **dynamic environment** (outside change).',
        'Pervasive means **all levels**, not "very important".',
        '5-mark answers: five points, each named in bold and explained in one sentence.',
      ],
      n: 'Some tips. In case questions, examiners give one mark for naming the concept and one for the supporting line, so do both. Keep rigidity and dynamic environment apart. Remember that pervasive means present at all levels. For five mark answers, write five clearly named points, each explained in a sentence.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Planning — Part 2: The Planning Process and Types of Plans',
  goals: [
    'Explain the seven steps of the planning process in order',
    'Apply the planning process to a business situation',
    'Distinguish single-use and standing plans',
    'Identify objectives, strategy, policy, procedure, method, rule, programme and budget in a case',
  ],
  slides: [
    sl('title', 'Planning: process and types', {
      b: 'Part 2 — the **seven steps** of planning and the **eight types of plans**.',
      v: vRoute2,
      n: 'In part two we see how a plan is actually made, step by step, and then the different kinds of plans a business uses. Case questions on this part are very common, so we will practise reading a passage and naming the step or the type of plan.',
    }),
    sl('diagram', 'The planning process', {
      v: vProcess,
      n: 'Planning follows seven steps. First, set objectives. Second, develop premises, the assumptions about the future. Third, identify alternative courses of action. Fourth, evaluate them. Fifth, select the best one. Sixth, implement the plan. Seventh, follow up to see that it works. Learn the order: questions often ask what comes next.',
    }),
    sl('concept', 'Steps 1 and 2: objectives and premises', {
      b: '**Objectives** say what the firm wants. **Premises** are the forecasts the plan is built on.',
      v: vPremises,
      n: 'The first step is to set clear objectives for the whole firm and each department. The second is to develop premises: assumptions about demand, prices or government rules. This imagined shoe maker assumes demand will rise before June and leather prices will stay steady. If the premises are wrong, the plan built on them goes wrong too.',
    }),
    sl('check', 'Quick check: the first step', {
      b: 'Which is the first step in the planning process?',
      chk: 'm_first_step',
      n: 'Before forecasting or comparing options, what must a business decide?',
    }),
    sl('concept', 'Steps 3 to 5: list, weigh, choose', {
      b: 'Identify the options, **evaluate** each on cost, risk and gain, then **select** the best (or a mix).',
      v: vAlternatives,
      n: 'Steps three to five go together. This imagined sweet shop lists three ways to grow. Then it weighs each one on cost, risk and likely gain. Finally it selects the best, which may be a combination, such as home delivery now and a new outlet later. Remember: listing, weighing and choosing are three separate steps.',
    }),
    sl('concept', 'Steps 6 and 7: implement and follow up', {
      b: 'A plan on paper achieves nothing until it is **put into action** and **monitored**.',
      v: vImplement,
      n: 'In step six the plan is implemented: people, money and deadlines are assigned and work begins. Step seven is follow up. Managers keep checking whether the plan is being carried out and whether results match the objectives, and they correct the plan where needed. Follow up links planning to controlling.',
    }),
    sl('example', 'Worked example 1: a cloud kitchen plans to grow', {
      b: 'Apply all seven steps to one imagined business.',
      bl: ['Step 1 — Write the objective with a number and a deadline', 'Step 2 — State at least two premises', 'Step 3 — Show list, weigh and choose as separate steps', 'Step 4 — End with implementation and follow-up'],
      v: vKitchen,
      n: 'Here is an imagined cloud kitchen in Pune. Its objective is six hundred orders a day within a year. It assumes office lunches will keep growing. It lists three options, compares them, and chooses a second kitchen with a smaller menu. Then it leases space and hires cooks, and checks daily orders against the target every week.',
    }),
    sl('check', 'Quick check: put the steps in order', {
      b: 'Arrange the seven steps of planning in the correct order.',
      chk: 'ord_steps',
      n: 'Start with the goal and end with checking the results.',
    }),
    sl('diagram', 'Types of plans', {
      v: vTypes,
      n: 'Plans come in two families. Single use plans are made for one event or project and are not used again, such as a programme or a budget for one occasion. Standing plans are used again and again for situations that keep coming back, such as policies, procedures, methods and rules. Objectives and strategies set the direction for both.',
    }),
    sl('concept', 'Objectives and strategy', {
      b: 'An **objective** is the end result; a **strategy** is the comprehensive plan to reach long-term goals.',
      v: vObjStrat,
      n: 'Objectives are the end results the firm wants, best stated with a number and a deadline. A strategy is a comprehensive plan. It sets the long term direction, the course of action, and how resources will be allocated, keeping the business environment in view. Here an imagined bakery aims for thirty outlets and chooses franchises with local flavours to get there.',
    }),
    sl('two-column', 'Policy and rule', {
      cols: ['**Policy**\n\nA general guide; managers use judgement.', '**Rule**\n\nA must or must not; no judgement, usually a penalty.'],
      v: vPolicyRule,
      n: 'A policy is a general guide to decisions, so managers can use judgement, as in we prefer local suppliers where possible. A rule says exactly what must or must not be done, allows no discretion and usually carries a penalty, as in no phones on the packing line. In a case, words like where possible point to a policy.',
    }),
    sl('check', 'Quick check: steps in order', {
      b: 'A fixed sequence of steps for a travel claim is which type of plan?',
      chk: 'm_procedure',
      n: 'Is it a guide, a strict rule, a way of doing one task, or a series of steps?',
    }),
    sl('concept', 'Procedure and method', {
      b: 'A **procedure** is the order of steps; a **method** is the way one step is done.',
      v: vProcedure,
      n: 'A procedure lays down steps in order for a routine job, like this expense claim: form, check, verify, pay. A method is narrower. It decides how one task is done, for example scanning bills instead of photocopying them. Both are standing plans, used every time the job comes up.',
    }),
    sl('diagram', 'Programme and budget', {
      b: 'A **programme** sets out tasks, people, time and money for one project; a **budget** states a plan in numbers.',
      v: vFair,
      n: 'A programme is a detailed plan for one project, listing tasks, people, time and money. This imagined weavers cooperative plans for a trade fair. Its budget shows the money in numbers: two lakh forty thousand rupees for the stall, one lakh fifty thousand for travel, and two lakh ten thousand for samples and publicity. A budget is also later used for control.',
    }),
    sl('example', 'Worked example 2: classifying statements', {
      b: 'Name the type of plan in each statement from an imagined hotel handbook.',
      bl: ['Step 1 — Look for the clue: guide, steps, must, how, or a target', 'Step 2 — Name the type', 'Step 3 — Give the reason in a few words'],
      v: vClassify,
      n: 'Look for clues. Where available signals a guide, so that line is a policy. Verify, enter, hand over is a series of steps, so it is a procedure. Smoking is not allowed allows no choice, so it is a rule. The two bucket mopping system is how a task is done, a method. And a target with a deadline is an objective.',
    }),
    sl('example', 'Worked example 3: a sales budget', {
      b: `An imagined ceiling-fan maker plans to sell **${inr(WB.units)} fans** at **₹${inr(WB.price)}** each.`,
      bl: ['Step 1 — Budget value = units × price', 'Step 2 — The last quarter = yearly units minus the first three quarters', 'Step 3 — Later, compare actual sales with each quarter\'s budget'],
      v: vSalesBudget,
      n: 'A budget is a plan in numbers. This imagined fan maker plans to sell eight thousand fans at nine hundred rupees each, so its sales budget is seventy two lakh rupees. It has planned fifteen hundred, seventeen hundred and twenty six hundred units for the first three quarters, which leaves twenty two hundred for the last quarter.',
    }),
    sl('check', 'Quick check: a plan in numbers', {
      b: 'Fill in the blank: a statement of expected results in numbers is a ___.',
      chk: 'fb_budget',
      n: 'Which plan is written in rupees, units or hours?',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up: planning has seven steps, from objectives and premises, through listing, weighing and choosing alternatives, to implementation and follow up. Single use plans, such as programmes and budgets, serve one event. Standing plans, such as policies, procedures, methods and rules, are used again and again. Objectives and strategy give the direction.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Learn the **seven steps in order**; "what comes next" is a favourite question.',
        'Identifying alternatives (listing) is **not** evaluating them (weighing).',
        'Policy has room for judgement; a rule does not. Procedure = steps; method = how one step is done.',
        'In case questions, quote the line and give the clue word for each answer.',
      ],
      n: 'Some tips for the exam. Learn the seven steps in order. Keep listing alternatives separate from evaluating them. Remember that a policy allows judgement but a rule does not, and that a procedure is a series of steps while a method is the way one step is done. In case questions, always quote the line that gives the clue.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Planning — Notes',
  sections: [
    {
      h: '1. Meaning and features',
      t: 1,
      b: '**Planning:** deciding beforehand **what** to do, **how**, **when** and **by whom**, so that goals are reached. It is the **first** function of management; organising, staffing, directing and controlling follow it.\n\n**Features**\n1. **Focuses on objectives** — plans are made for goals, never for their own sake.\n2. **Primary function** — the base for all other functions.\n3. **Pervasive** — at top, middle and lower levels, in every department.\n4. **Continuous** — when one plan\'s period ends, another plan begins.\n5. **Futuristic** — looks ahead, using forecasts.\n6. **Involves decision making** — only arises where alternatives exist.\n7. **Mental exercise** — needs foresight, imagination and judgement.',
      terms: [
        ['Planning', 'Deciding in advance what is to be done, how, when and by whom.'],
        ['Pervasive', 'Present at all levels and in all departments of an organisation.'],
        ['Futuristic', 'Looking ahead to conditions of a coming period.'],
      ],
      v: vFeatures,
      vs: [vLevels],
    },
    {
      h: '2. Importance of planning',
      t: 1,
      b: '1. **Direction:** goals stated beforehand tell staff what to aim at.\n2. **Reduces risks of uncertainty:** forecasting lets managers prepare for change.\n3. **Reduces overlapping and wasteful activities:** departments act in harmony; duplication is avoided.\n4. **Promotes innovative ideas:** the hunt for options brings fresh thinking.\n5. **Facilitates decision making:** goals and forecasts give criteria for choosing.\n6. **Establishes standards for controlling:** planned targets are the yardsticks for judging results.\n\n**Link to controlling:** planning sets targets; controlling compares actual results with them. Planning without controlling is pointless; controlling without planning is blind.',
      terms: [
        ['Standard', 'A planned target against which actual performance is compared.'],
        ['Uncertainty', 'Not knowing what will happen in the future, which planning prepares for.'],
      ],
      v: vImportance,
      vs: [vTargets],
    },
    {
      h: '3. Limitations of planning',
      t: 1,
      b: '1. **Rigidity:** managers feel bound to a fixed plan and cannot seize new chances.\n2. **May not work in a dynamic environment:** policy, technology, competition or demand may change after the plan is made.\n3. **Reduces creativity:** plans come from the top; lower levels mostly carry them out.\n4. **Huge costs:** information, experts and forecasts cost money.\n5. **Time-consuming:** long preparation may leave no time for action.\n6. **Does not guarantee success:** past success can breed false confidence.\n\n**Reducing them:** flexible plans, review points, participation of staff, follow-up.',
      terms: [
        ['Rigidity', 'Inability to change a plan once it has been fixed, even when change is needed.'],
        ['Dynamic environment', 'A business environment that keeps changing in ways a plan may not foresee.'],
      ],
      v: vLimits,
      vs: [vDynamic, vRemedies],
    },
    {
      h: '4. The planning process',
      t: 2,
      b: '1. **Setting objectives** for the firm and each department.\n2. **Developing premises**: forecasts and assumptions; every planner should use the same ones.\n3. **Identifying alternative courses of action**.\n4. **Evaluating alternative courses**: positives, negatives, cost, risk, returns.\n5. **Selecting an alternative** (or a combination).\n6. **Implementing the plan**: resources, people and deadlines assigned; action begins.\n7. **Follow-up action**: monitoring and correcting.\n\nTip: steps 3, 4 and 5 are list, weigh, choose.',
      terms: [
        ['Premises', 'Assumptions about future conditions on which plans are based.'],
        ['Follow-up action', 'Monitoring a plan after implementation and correcting it where needed.'],
      ],
      v: vProcess,
      vs: [vPremises, vAlternatives],
    },
    {
      h: '5. Single-use and standing plans; objectives and strategy',
      t: 3,
      b: '**Single-use plans** serve one non-recurring event or project: **programmes**, **budgets** for one occasion. They lapse when the event is over.\n\n**Standing plans** guide recurring situations again and again: **policies, procedures, methods, rules**.\n\n**Objectives:** end results the organisation seeks; best when measurable and time-bound. All other plans serve them.\n\n**Strategy:** a comprehensive plan that fixes long-term direction, the course of action and the allocation of resources, with the business environment in view.',
      terms: [
        ['Single-use plan', 'A plan for a one-time event or project, not used again.'],
        ['Standing plan', 'A plan used repeatedly for situations that recur.'],
        ['Strategy', 'A comprehensive plan covering direction, course of action and allocation of resources.'],
      ],
      v: vTypes,
      vs: [vObjStrat],
    },
    {
      h: '6. Policy, procedure, method, rule, programme, budget',
      t: 3,
      b: '- **Policy:** a general guide to thinking and decisions; leaves room for judgement (e.g. "promote from within where suitable").\n- **Procedure:** a fixed order of steps for a routine activity.\n- **Method:** the prescribed way of doing one task or step; the best method saves time and effort.\n- **Rule:** a specific do or do not; no discretion; a penalty usually follows a breach.\n- **Programme:** a detailed plan of a project: tasks, people, resources and timing.\n- **Budget:** expected results in numbers for a future period; also a control device.',
      terms: [
        ['Policy', 'A general guide to decision making that allows discretion.'],
        ['Procedure', 'The chronological sequence of steps for a routine activity.'],
        ['Method', 'The prescribed way in which one task is performed.'],
        ['Rule', 'A specific statement of what must or must not be done, with no discretion.'],
        ['Budget', 'A plan stating expected results in numerical terms.'],
      ],
      v: vPolicyRule,
      vs: [vProcedure, vFair],
    },
  ],
  tips: '**Common mistakes**\n- Writing "pervasive means very important": it means **present at all levels**.\n- Mixing up **rigidity** (the firm will not change its plan) and **dynamic environment** (the outside world changes).\n- Treating identifying alternatives and evaluating them as one step.\n- Calling a guide with "where possible" a rule (it is a **policy**), or a list of steps a method (it is a **procedure**).\n- Calling a one-time budget a standing plan.\n\n**How marks are usually awarded**\n- 1 mark: the correct option, or the name of the concept.\n- Case parts: 1 mark for naming the feature, step or plan, 1 for the quoted line or reason.\n- 3 marks: three points, each explained.\n- 5 marks: five named points, each explained in a sentence (about 120 words).',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Planning**', 'Deciding **in advance** what to do, how, when and by whom.', 'definition', 1],
  ['Why is planning the **primary** function?', 'All other functions are carried out within the framework of the plan.', 'concept', 1],
  ['**Pervasive**', 'Planning happens at **every level** and in every department.', 'definition', 1],
  ['**Continuous**', 'When one plan\'s period ends, a new plan follows.', 'definition', 1],
  ['**Futuristic**', 'Planning looks ahead and uses forecasts.', 'definition', 1],
  ['Why is planning a **mental exercise**?', 'It needs foresight, imagination and judgement.', 'concept', 1],
  ['Why does planning **involve decision making**?', 'It arises only when there are alternatives to choose from.', 'concept', 1],
  ['Six points of **importance**', 'Direction; less uncertainty; less overlap and waste; new ideas; easier decisions; standards for control.', 'concept', 1],
  ['How does planning help **controlling**?', 'Planned targets are the standards actual results are measured against.', 'concept', 1],
  ['Example: planning **reduces overlapping**', 'One central store buys for all wards, so no ward orders the same items twice.', 'example', 1],
  ['Six **limitations**', 'Rigidity; dynamic environment; less creativity; huge costs; time-consuming; no guarantee of success.', 'concept', 1],
  ['**Rigidity** vs **dynamic environment**', 'Rigidity: the firm will not change its plan. Dynamic environment: the outside world changes.', 'exam-tip', 1],
  ['Why may planning **reduce creativity**?', 'Plans come from the top; lower levels mainly implement them.', 'concept', 1],
  ['Does planning guarantee success?', '**No**: plans must suit conditions and be carried out well.', 'fact', 1],
  ['The **seven steps** of planning', 'Objectives → premises → alternatives → evaluate → select → implement → follow up.', 'concept', 2],
  ['**Premises**', 'Assumptions about the future on which plans are based.', 'definition', 2],
  ['Example of a premise', '"Steel prices will stay stable next year."', 'example', 2],
  ['Identifying vs evaluating alternatives', 'Identifying = listing options. Evaluating = weighing their merits and demerits.', 'exam-tip', 2],
  ['Step after **selecting** an alternative', 'Implementing the plan.', 'fact', 2],
  ['**Follow-up action**', 'Monitoring the plan after implementation and correcting it.', 'definition', 2],
  ['**Single-use** plans', 'For one non-recurring event or project: programme, one-off budget.', 'definition', 3],
  ['**Standing** plans', 'Used repeatedly: policy, procedure, method, rule.', 'definition', 3],
  ['**Objective**', 'An end result to be achieved, ideally measurable and time-bound.', 'definition', 3],
  ['**Strategy**', 'Comprehensive plan: long-term direction, course of action, allocation of resources.', 'definition', 3],
  ['**Policy**', 'A general guide to decisions; allows judgement.', 'definition', 3],
  ['**Rule**', 'A specific do or do not; no discretion; usually a penalty.', 'definition', 3],
  ['**Procedure** vs **method**', 'Procedure: steps in order. Method: how one task is done.', 'exam-tip', 3],
  ['**Programme**', 'Detailed plan of a project: tasks, people, resources, timing.', 'definition', 3],
  ['**Budget**', 'A plan in numbers for a future period; also a control device.', 'definition', 3],
  ['Clue words in cases', '"Where possible" → policy; "must / not allowed" → rule; "first… then…" → procedure.', 'exam-tip', 3],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-default-chapter-test-short',
  title: 'Chapter test (short) — Planning',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_primary', 'm_pervasive', 'm_rule', 'ar_standards'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_premises', 's_single_standing', 's3_features'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_importance', 'l_types'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the passage and answer all parts. Part (c) has an internal choice.', items: ['cb_vegam'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-default-chapter-test-long',
  title: 'Chapter test (long) — Planning',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_mental', 'm_lim_rigidity', 'm_lim_dynamic', 'm_premise_scenario', 'm_followup', 'm_policy', 'm_strategy', 'm_budget', 'ar_creativity', 'ar_rule'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_primacy', 's_policy_rule', { attempt: 1, keys: ['s_innovative', 's_lim_time'] }, 's3_steps_first3', { attempt: 1, keys: ['s3_evaluate_select', 's3_strategy'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_process', { attempt: 1, keys: ['l_limitations', 'l_evaluate'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each passage and answer all parts. Part (c) of each has an internal choice.', items: ['cb_rasoi', 'cb_neelgiri'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t03 of cbse-12-business-studies-ch04 only (concept, features, importance and limitations; planning process; types of plans)',
    originality: 'every firm, case, handbook extract and figure written for this chapter (imagined Indian businesses, labelled); no NCERT text, exercise or board/sample-paper item reused',
    data: `imagined figures computed by the build (fair budget ${inr(FAIR.total)} = ${inr(FAIR_STALL)} + ${inr(FAIR_TRAVEL)} + ${inr(FAIR_REST)}; sales budgets ${inr(SB.units)} × ${inr(SB.price)} = ${inr(SB_VALUE)} and ${inr(WB.units)} × ${inr(WB.price)} = ${inr(WB_VALUE)}; regional sales gaps ${REG_GAP.join(', ')} lakh)`,
    facts: 'no dated or statistical real-world facts; concepts only',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
