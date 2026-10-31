// Build ISC 12 Commerce ch08 Planning. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-commerce-ch08/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from './lib.mjs';

setUnit('isc-12-commerce-ch08', 'economics-commerce');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- visuals
const vRoute1 = flow('LR', ['Functions of management', 'What planning is', 'Why it matters', 'Steps in planning'], 'Route map of Part 1: the functions of management, the meaning of planning, its importance and the steps in planning', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Limitations', 'Types of plans', 'Telling plans apart'], 'Route map of Part 2: the limitations of planning, the eight types of plans and how to tell them apart', 'Part 2 at a glance');

const vFunctions = flow('LR', ['Planning', 'Organising', 'Staffing', 'Directing', 'Controlling'], 'Flow of the five functions of management: planning, organising, staffing, directing and controlling, with controlling looping back to planning', 'Planning comes first; controlling loops back to it.', [
  { from: 'n1', to: 'n2' }, { from: 'n2', to: 'n3' }, { from: 'n3', to: 'n4' }, { from: 'n4', to: 'n5' }, { from: 'n5', to: 'n1' },
]);
const vFunctionsT = table(
  ['Function', 'Question it answers'],
  [['Planning', 'What is to be done, how, when and by whom?'], ['Organising', 'Who does which task, with what resources?'], ['Staffing', 'Do we have the right people in each post?'], ['Directing', 'Are people guided and motivated?'], ['Controlling', 'Are results matching the plan?']],
  'Table of the five functions of management and the question each answers',
);
const vPlanningQs = table(
  ['Planning decides…', 'Imagined example: a tour operator in Munnar'],
  [['What to do', 'Run forty guided tours a month'], ['How to do it', 'Use local guides and hired jeeps'], ['When', 'From September to May'], ['Who will do it', 'Two tour leaders and six guides']],
  'Table showing that planning decides what to do, how, when and by whom, with an imagined tour operator\'s answers',
);
const vImportance = table(
  ['Importance', 'In short'],
  [
    ['Provides direction', 'Everyone knows what to work towards'],
    ['Reduces risk of uncertainty', 'Looks ahead and prepares for change'],
    ['Reduces overlapping and waste', 'Coordinates who does what and when'],
    ['Promotes innovative ideas', 'Thinking ahead brings new ideas'],
    ['Facilitates decision making', 'Options are compared before choosing'],
    ['Establishes standards for controlling', 'Targets become yardsticks'],
  ],
  'Table of six points of importance of planning with a short explanation of each',
);
const vImpEx = table(
  ['Imagined situation', 'Importance shown'],
  [
    ['Rose farm foresees a fall in demand after February and plans wedding orders', 'Reduces risk of uncertainty'],
    ['Two juice vans no longer visit the same shops', 'Reduces overlapping and waste'],
    ['Planning a new range leads to paint-at-home dolls', 'Promotes innovative ideas'],
    ['Weekly packing targets are compared with actual work', 'Standards for controlling'],
  ],
  'Worked table matching four imagined situations with the importance of planning each shows',
  'Ask what problem the plan solved.',
);
const vSteps = flow('LR', ['Set objectives', 'Develop premises', 'Identify alternatives', 'Evaluate alternatives', 'Select an alternative', 'Implement the plan', 'Follow up'], 'Flow of the seven steps in planning: set objectives, develop premises, identify alternatives, evaluate alternatives, select an alternative, implement the plan, and follow up', 'Seven steps, in order.');
const vPremises = table(
  ['Step', 'What happens', 'Imagined example'],
  [
    ['Developing premises', 'Make assumptions about the future', 'A new highway will bring more weekend visitors'],
    ['Identifying alternatives', 'List every way to reach the goal', 'Monsoon tours, hotel tie-ups, travel apps'],
    ['Evaluating alternatives', 'Weigh merits and demerits of each', 'Score each option on cost, reach and risk'],
    ['Selecting an alternative', 'Choose the best option or a mix', 'Hotel tie-ups plus a travel app'],
  ],
  'Table of the middle steps of planning, from developing premises to selecting an alternative, with imagined examples',
);
const vStepsEx = table(
  ['Action of an imagined pottery school in Khurja', 'Step'],
  [
    ['Aim to enrol 60 weekend students by June', 'Set objectives'],
    ['Assume college holidays stay the same', 'Develop premises'],
    ['Options: posters, a website, school visits', 'Identify alternatives'],
    ['Compare cost and reach of each', 'Evaluate alternatives'],
    ['Choose school visits plus a website', 'Select an alternative'],
    ['Book visits and build the website', 'Implement the plan'],
    ['Count enrolments every fortnight', 'Follow up'],
  ],
  'Worked table: seven actions of an imagined pottery school matched to the seven steps of planning',
  'Each action answers one step in order.',
);
const vSummary1 = table(
  ['Idea', 'Key point'],
  [['Functions', 'Plan, organise, staff, direct, control'], ['Planning', 'Deciding in advance what, how, when and by whom'], ['Importance', 'Direction, less uncertainty, less waste, new ideas, decisions, standards'], ['Steps', 'Objectives, premises, alternatives, evaluate, select, implement, follow up']],
  'Summary table of Part 1: functions of management, meaning, importance and steps of planning',
);
const vCaseSteps = flow('LR', ['Quote the line', 'Name the idea', 'Explain the link'], 'Three steps for case questions: quote the line, name the idea, and explain the link');

const vLimits = table(
  ['Limitation', 'Why it happens'],
  [
    ['Leads to rigidity', 'Managers feel bound to the plan'],
    ['May not work in a dynamic environment', 'Premises can turn out wrong'],
    ['Reduces creativity', 'Others only carry out plans made at the top'],
    ['Involves huge costs', 'Surveys, experts and data cost money'],
    ['Time-consuming', 'Detailed plans can delay action'],
    ['Does not guarantee success', 'Results depend on implementation and events'],
  ],
  'Table of six limitations of planning and why each happens',
);
const vLimitsEx = table(
  ['Imagined situation', 'Limitation'],
  [
    ['A sales officer must ignore a hotel order not in the plan', 'Rigidity'],
    ['A new rule bans the coating a bag maker planned to use', 'Dynamic environment'],
    ['Supervisors stop suggesting designs', 'Reduces creativity'],
    ['A shop spends weeks on surveys and misses Diwali orders', 'Time-consuming'],
  ],
  'Worked table matching four imagined situations with the limitation of planning each shows',
  'Find what went wrong, then name the limitation.',
);
const vStillPlan = table(['Limitation', 'How to reduce it'], [['Rigidity', 'Review plans often'], ['Dynamic environment', 'Prepare back-up plans'], ['Reduced creativity', 'Invite ideas from all levels'], ['Cost and time', 'Keep small plans short and simple']], 'Table of four limitations of planning and a way to reduce each');
const vTypes = table(
  ['Type of plan', 'What it is', 'Imagined example'],
  [
    ['Objective', 'End result to be achieved', 'Sell 8,000 lanterns this year'],
    ['Strategy', 'Comprehensive plan for long-term direction', 'Win small towns through school canteens'],
    ['Policy', 'General guide to decisions, with judgement', 'Prefer artisans\' children as apprentices'],
    ['Procedure', 'Steps of a routine job in fixed order', 'Weigh, sample, log, send to drying yard'],
    ['Method', 'Best way of doing one step', 'Spray the base coat, do not brush it'],
    ['Rule', 'What must or must not be done; no discretion', 'No phones on the workbench'],
    ['Budget', 'Expected results in numbers', 'Monthly income and costs in rupees'],
    ['Programme', 'Detailed plan for one project', 'Tasks, people, dates and money for a new café'],
  ],
  'Table of eight types of plans with what each is and an imagined example',
);
const vPolicyRule = table(['Basis', 'Policy', 'Rule'], [['Nature', 'General guide', 'Exact instruction'], ['Discretion', 'Leaves room for judgement', 'No discretion'], ['Penalty', 'None for not following', 'Usually a penalty']], 'Table comparing a policy and a rule on nature, discretion and penalty');
const vProcMethod = table(['Basis', 'Procedure', 'Method'], [['Covers', 'A series of steps', 'One step or task'], ['Answers', 'In what order?', 'In what way?'], ['Example', 'Steps for booking a parcel', 'Machine-sealing each carton']], 'Table comparing a procedure and a method on what each covers, the question it answers, and an example');
const vTypesEx = table(
  ['Statement at an imagined museum shop in Hyderabad', 'Type'],
  [['"Raise sales by a fifth in two years"', 'Objective'], ['"We prefer crafts made in Telangana"', 'Policy'], ['"Bags must be left at the counter"', 'Rule'], ['"Ring up, wrap, hand over, file the receipt"', 'Procedure']],
  'Worked table classifying four imagined statements from a museum shop as objective, policy, rule and procedure',
  'Look for the clue: a target, a preference, a must, or a sequence.',
);
const vBPS = table(['Plan', 'Clue word in a case'], [['Budget', 'Numbers for a future period'], ['Programme', 'One project with tasks, people, time and money'], ['Strategy', 'Rivals, markets, long-term direction']], 'Table of clue words for budgets, programmes and strategies');
const vSummary2 = table(
  ['Idea', 'Key point'],
  [['Limitations', 'Rigid, may fail in change, less creativity, costly, slow, no guarantee'], ['Broad plans', 'Objectives, strategies, policies'], ['Detailed plans', 'Procedures, methods, rules'], ['Plans in numbers or projects', 'Budgets, programmes']],
  'Summary table of Part 2: limitations of planning and the types of plans grouped as broad, detailed, numerical or project plans',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Planning — Part 1: Functions, Meaning, Importance and Steps',
  goals: [
    'Name the functions of management and explain why planning is the primary function',
    'Explain the importance of planning with examples',
    'Arrange the steps in the planning process in order and explain each',
  ],
  slides: [
    sl('title', 'Planning', {
      b: 'Part 1: the **functions** of management, what **planning** is, why it **matters**, and the **steps** in planning.',
      v: vRoute1,
      n: 'Before a wedding caterer cooks a single dish, someone has decided how many guests, which menu, which cooks and what budget. That deciding in advance is planning. In this part we place planning among the functions of management, see why it matters and learn its seven steps.',
    }),
    sl('diagram', 'The five functions of management', {
      b: 'Management works through **five functions**, beginning with planning.',
      v: vFunctions,
      n: 'Managers carry out five functions. Planning decides what is to be done. Organising arranges tasks and resources. Staffing fills each post with the right person. Directing guides and motivates people. Controlling checks results against the plan, and what it finds feeds back into the next round of planning.',
    }),
    sl('concept', 'What is planning?', {
      b: '**Planning** is deciding in advance **what** to do, **how** to do it, **when** to do it and **who** will do it.',
      v: vPlanningQs,
      n: 'Planning bridges the gap between where we are and where we want to be. It answers four questions in advance: what to do, how, when and by whom. It is called the primary function because organising, staffing, directing and controlling all take place within the framework that plans provide.',
    }),
    sl('check', 'Quick check: the order of functions', {
      b: 'Which list gives the functions of management in their usual order?',
      chk: 'm_functions_order',
      n: 'Start with deciding in advance and end with checking results.',
    }),
    sl('concept', 'Why planning matters', {
      v: vImportance,
      n: 'Planning matters in six ways. It gives direction. It reduces the risk of uncertainty by looking ahead. It cuts overlapping and wasteful work. It brings out new ideas. It helps managers decide, by comparing options. And it sets targets that later become the standards for controlling.',
    }),
    sl('example', 'Worked example 1: which benefit?', {
      b: 'Match each imagined situation with the importance of planning it shows.',
      bl: ['Step 1: ask **what problem** the plan solved.', 'Step 2: name the point of importance.', 'Step 3: link it to the fact in one line.'],
      v: vImpEx,
      n: 'A rose farm that foresees a fall in demand and plans for weddings is reducing uncertainty. Juice vans that no longer visit the same shops show less overlapping. A planning session that produces paint-at-home dolls shows new ideas. Comparing weekly packing with targets shows standards for controlling.',
    }),
    sl('check', 'Quick check: do supervisors plan?', {
      b: 'True or false: a shift supervisor also plans, for example by deciding the next day\'s duties for each worker.',
      chk: 'tf_planning',
      n: 'Is planning only for the top, or for every level?',
    }),
    sl('diagram', 'Steps in planning', {
      b: 'Planning follows **seven steps** in a fixed order.',
      v: vSteps,
      n: 'Planning moves through seven steps. First, set objectives. Second, develop premises, the assumptions about the future. Third, identify the possible courses of action. Fourth, evaluate them. Fifth, select the best. Sixth, implement the plan. Seventh, follow up, to check progress and revise the plan if conditions change.',
    }),
    sl('concept', 'Premises and alternatives', {
      v: vPremises,
      n: 'The middle steps need care. Premises are assumptions, such as a new highway bringing more visitors. Next, list every way of reaching the goal. Then weigh each option\'s merits and demerits, perhaps by scoring cost, reach and risk. Finally, choose the best, or a mix of options.',
    }),
    sl('example', 'Worked example 2: a pottery school plans', {
      b: 'An imagined pottery school in Khurja wants more weekend students.',
      bl: ['Step 1: read each action.', 'Step 2: ask which **question of planning** it answers.', 'Step 3: put the steps in order.'],
      v: vStepsEx,
      n: 'The school aims to enrol sixty weekend students: that is the objective. It assumes college holidays stay the same: a premise. It lists posters, a website and school visits, compares them, and chooses visits plus a website. Then it books visits, builds the website, and counts enrolments every fortnight as follow-up.',
    }),
    sl('check', 'Quick check: the last step', {
      b: 'Complete the analogy: setting objectives is to the first step of planning as follow-up action is to the ___ step of planning.',
      chk: 'fb_steps',
      n: 'Where does follow-up come in the sequence?',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. Management has five functions, and planning comes first. Planning decides in advance what, how, when and by whom. It gives direction, reduces uncertainty and waste, encourages new ideas, helps decisions and sets standards. It follows seven steps from objectives to follow-up.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Learn the **seven steps in order**; examiners often ask you to arrange them.', 'Say planning **reduces** uncertainty; never that it removes it.', 'For importance, link each point to the **firm in the case**.', 'Premises are **assumptions**, not facts.'],
      v: vCaseSteps,
      n: 'A few tips. Learn the seven steps in order. Always say planning reduces uncertainty, never that it removes it. Tie each point of importance to the firm in the question. And remember that premises are assumptions about the future, not certain facts.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Planning — Part 2: Limitations and Types of Plans',
  goals: [
    'Explain the limitations of planning',
    'Distinguish between types of plans and identify the type from an example',
  ],
  slides: [
    sl('title', 'Limitations and Types of Plans', {
      b: 'Part 2: the **limitations** of planning and the eight **types of plans**.',
      v: vRoute2,
      n: 'Planning is powerful, but it has limits. In this part we look at those limitations, then at the many forms a plan can take, from a broad objective to a strict rule. You will learn to spot each type from a single sentence.',
    }),
    sl('concept', 'Limitations of planning', {
      v: vLimits,
      n: 'Planning has six limitations. It can make a firm rigid. It may fail when the environment changes suddenly. It can reduce creativity if only the top plans. It costs money and takes time. And it never guarantees success, because results depend on how well plans are carried out.',
    }),
    sl('example', 'Worked example 1: spot the limitation', {
      b: 'Each imagined situation shows a limitation of planning.',
      bl: ['Step 1: find **what went wrong**.', 'Step 2: name the limitation.', 'Step 3: suggest how it could be reduced.'],
      v: vLimitsEx,
      n: 'A sales officer told to ignore an order outside the plan shows rigidity. A new rule that wrecks a bag maker\'s plan shows the problem of a dynamic environment. Supervisors who stop suggesting designs show reduced creativity. A shop that misses Diwali orders while doing surveys shows that planning takes time.',
    }),
    sl('check', 'Quick check: no budget for a good idea', {
      b: 'A sales officer spots a chance to supply a hotel chain but must wait, because the year\'s plan has no budget for it. Which limitation is this?',
      chk: 'm_limit_rigidity',
      n: 'Is the plan helping her adapt, or holding her back?',
    }),
    sl('two-column', 'Plan anyway', {
      cols: ['**The limits are real**\n\nPlans can be rigid, costly and slow.', '**But they can be reduced**\n\nReview often, prepare back-ups and invite ideas.'],
      v: vStillPlan,
      n: 'Do these limits mean firms should not plan? No. Most can be reduced. Review plans often to avoid rigidity. Keep back-up plans for sudden change. Invite ideas from every level to protect creativity. And keep small plans short and simple to save time and money.',
    }),
    sl('concept', 'Types of plans', {
      v: vTypes,
      n: 'Plans come in eight types. Objectives state end results. Strategies set long-term direction. Policies guide decisions but leave room for judgement. Procedures set the steps of a routine job in order. Methods give the best way of doing one step. Rules say exactly what must be done. Budgets put plans in numbers. Programmes plan one project in detail.',
    }),
    sl('two-column', 'Policy or rule?', {
      cols: ['**Policy**\n\nA general guide; managers use judgement.', '**Rule**\n\nAn exact instruction; no discretion; usually a penalty.'],
      v: vPolicyRule,
      n: 'Policies and rules are often confused. A policy is a general guide, such as preferring local suppliers, and managers decide how to apply it. A rule is exact, such as no phones on the workbench. It leaves no room for judgement and usually carries a penalty.',
    }),
    sl('check', 'Quick check: a general guide', {
      b: 'True or false: a policy is a general statement that guides decisions while leaving managers some room for judgement.',
      chk: 'tf_policy',
      n: 'Does a policy fix every decision, or guide it?',
    }),
    sl('two-column', 'Procedure or method?', {
      cols: ['**Procedure**\n\nSteps of a routine job, in order.', '**Method**\n\nThe best way of doing one step.'],
      v: vProcMethod,
      n: 'A procedure answers the question, in what order? It lists the steps of a routine job, such as booking a parcel. A method answers the question, in what way? It tells you the best way to do one step, such as sealing each carton by machine.',
    }),
    sl('example', 'Worked example 2: classify the statements', {
      b: 'Four statements appear in the handbook of an imagined museum shop in Hyderabad.',
      bl: ['Step 1: look for the **clue**: a target, a preference, a must, or a sequence.', 'Step 2: name the type.', 'Step 3: give the reason.'],
      v: vTypesEx,
      n: 'Raise sales by a fifth in two years is a target, so it is an objective. We prefer crafts made in Telangana is a preference, a policy. Bags must be left at the counter is a must, a rule. Ring up, wrap, hand over and file the receipt is a sequence, a procedure.',
    }),
    sl('check', 'Quick check: spray, not brush', {
      b: 'Painters are told to apply the base coat with a spray gun rather than a brush. Which type of plan is this?',
      chk: 'm_method',
      n: 'Is this a series of steps, or the way of doing one step?',
    }),
    sl('concept', 'Budgets, programmes and strategies', {
      v: vBPS,
      n: 'Three more types have clear clues. If a plan is full of numbers for a future period, it is a budget. If it covers one project with tasks, people, dates and money, it is a programme. If it talks about rivals, markets and long-term direction, it is a strategy.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. Planning can be rigid, may fail when things change, can reduce creativity, costs time and money, and guarantees nothing. Yet these limits can be reduced. Plans range from broad objectives, strategies and policies to detailed procedures, methods and rules, with budgets and programmes in between.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Use the **clue words**: target, prefer, must, in order, in what way, numbers, project, rivals.', 'Policy has **discretion**; rule has **none**.', 'Procedure is a **sequence**; method is **one step**.', 'For limitations, also say how to **reduce** them.'],
      v: vCaseSteps,
      n: 'Final tips. Read each statement for its clue word. A preference is a policy; a must is a rule. A sequence is a procedure; one way of doing a step is a method. Numbers mean a budget, one project means a programme, and rivals mean a strategy.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Planning — notes',
  sections: [
    {
      h: '1. Functions of management',
      t: 1,
      b: 'Management works through five functions:\n- **Planning** — deciding in advance what to do and how.\n- **Organising** — identifying and grouping tasks, assigning them and allocating resources.\n- **Staffing** — filling posts with the right people and keeping them filled.\n- **Directing** — guiding, motivating, leading and communicating with people.\n- **Controlling** — comparing actual results with planned standards and correcting deviations.\n\nThe functions form a **cycle**: controlling feeds back into fresh planning.',
      terms: [['Functions of management', 'Planning, organising, staffing, directing and controlling.']],
      v: vFunctions,
      vs: [vFunctionsT],
    },
    {
      h: '2. Planning: meaning and importance',
      t: 1,
      b: '**Planning** is deciding in advance what to do, how to do it, when to do it and who is to do it. It bridges the gap between where we are and where we want to be. It is the **primary function**: the other functions work within the framework of plans.\n\n**Importance:**\n- **Provides direction** — everyone knows the goal.\n- **Reduces the risk of uncertainty** — it foresees changes and prepares for them.\n- **Reduces overlapping and wasteful activities** — it coordinates work.\n- **Promotes innovative ideas** — thinking ahead brings new ideas.\n- **Facilitates decision making** — alternatives are weighed before choosing.\n- **Establishes standards for controlling** — planned targets become yardsticks.',
      terms: [['Planning', 'Deciding in advance what, how, when and by whom.'], ['Primary function', 'The function that comes before and supports all others.']],
      v: vPlanningQs,
      vs: [vImportance, vImpEx],
    },
    {
      h: '3. Steps in planning',
      t: 2,
      b: '1. **Setting objectives** — what is to be achieved.\n2. **Developing premises** — assumptions about future conditions.\n3. **Identifying alternative courses of action** — every way of reaching the objective.\n4. **Evaluating alternative courses** — weighing merits and demerits of each.\n5. **Selecting an alternative** — choosing the best, or a combination.\n6. **Implementing the plan** — putting it into action with people and resources.\n7. **Follow-up action** — monitoring progress and revising the plan if needed.',
      terms: [['Premises', 'Assumptions about the future on which plans rest.'], ['Follow-up action', 'Monitoring a plan as it runs and revising it if needed.']],
      v: vSteps,
      vs: [vPremises, vStepsEx],
    },
    {
      h: '4. Limitations of planning',
      t: 2,
      b: '- **Leads to rigidity** — managers feel bound to the plan and may miss new chances.\n- **May not work in a dynamic environment** — premises can turn out wrong.\n- **Reduces creativity** — when plans come only from the top, others stop offering ideas.\n- **Involves huge costs** — surveys, experts and data cost money.\n- **Time-consuming** — detailed plans can delay action.\n- **Does not guarantee success** — results depend on implementation and on events.\n\nThese limits can be **reduced** by reviewing plans often, keeping back-up plans, inviting ideas from all levels and keeping small plans simple.',
      terms: [['Rigidity', 'Inability to change course because of a fixed plan.']],
      v: vLimits,
      vs: [vLimitsEx, vStillPlan],
    },
    {
      h: '5. Types of plans',
      t: 3,
      b: '- **Objectives** — end results to be achieved, ideally specific, measurable and time-bound.\n- **Strategies** — comprehensive plans setting long-term direction, how to compete and how to use resources.\n- **Policies** — general statements that guide decisions, leaving room for judgement.\n- **Procedures** — the steps of a routine job in a fixed chronological order.\n- **Methods** — the prescribed way of doing one task or step.\n- **Rules** — exact statements of what must or must not be done; no discretion; usually a penalty.\n- **Budgets** — expected results expressed in numbers for a future period.\n- **Programmes** — detailed plans for one project, combining tasks, people, time and money.',
      terms: [['Policy', 'A general guide to decisions that leaves room for judgement.'], ['Rule', 'An exact instruction with no discretion.'], ['Procedure', 'A sequence of steps for a routine job.'], ['Method', 'The best way of doing one step.']],
      v: vTypes,
      vs: [vPolicyRule, vProcMethod, vTypesEx, vBPS],
    },
  ],
  tips: '**Common mistakes**\n- Saying planning removes uncertainty or guarantees success.\n- Putting the steps of planning in the wrong order (premises come before alternatives).\n- Calling a preference ("we prefer…") a rule; it is a policy.\n- Mixing up a procedure (a sequence) with a method (one step).\n\n**How marks are usually awarded**\n- 1 mark: the correct step, type or point.\n- 2–3 marks: each point named, explained and linked to the case.\n- 5 marks: all steps in order with examples, or each statement classified with a reason.\n- Case questions: quote the line, name the step or type, explain the link.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Five functions of management', 'Planning, organising, staffing, directing, controlling.', 'exam-tip', 1],
  ['**Planning**', 'Deciding in advance what, how, when and by whom.', 'definition', 1],
  ['Why is planning the primary function?', 'The other functions work within the framework of plans.', 'concept', 1],
  ['Six points of importance of planning', 'Direction, less uncertainty, less waste, new ideas, decisions, standards for control.', 'exam-tip', 1],
  ['Does planning remove uncertainty?', 'No: it reduces the risk, never removes it.', 'concept', 1],
  ['Planning and controlling', 'Planning looks ahead; controlling looks back at results.', 'concept', 1],
  ['Seven steps of planning', 'Objectives → premises → identify → evaluate → select → implement → follow up.', 'exam-tip', 2],
  ['**Premises**', 'Assumptions about future conditions on which plans rest.', 'definition', 2],
  ['Identifying vs evaluating alternatives', 'Listing the options vs weighing their merits and demerits.', 'concept', 2],
  ['**Follow-up action**', 'Monitoring the plan and revising it if needed.', 'definition', 2],
  ['Six limitations of planning', 'Rigidity, dynamic environment, less creativity, cost, time, no guarantee.', 'exam-tip', 2],
  ['A good chance missed because "it is not in the plan"', 'Rigidity.', 'fact', 2],
  ['A new law upsets the plan', 'May not work in a dynamic environment.', 'fact', 2],
  ['Supervisors stop suggesting ideas', 'Planning reduces creativity.', 'fact', 2],
  ['**Objective**', 'End result to be achieved: specific, measurable, time-bound.', 'definition', 3],
  ['**Strategy**', 'Comprehensive plan for long-term direction and competing.', 'definition', 3],
  ['**Policy**', 'General guide to decisions; leaves room for judgement.', 'definition', 3],
  ['**Procedure**', 'Steps of a routine job in fixed order.', 'definition', 3],
  ['**Method**', 'The best way of doing one step.', 'definition', 3],
  ['**Rule**', 'Exact instruction; no discretion; usually a penalty.', 'definition', 3],
  ['**Budget**', 'Expected results in numbers for a future period.', 'definition', 3],
  ['**Programme**', 'Detailed plan for one project: tasks, people, time, money.', 'definition', 3],
  ['Clue: "we prefer…"', 'Policy.', 'exam-tip', 3],
  ['Clue: "must" or "no exceptions"', 'Rule.', 'exam-tip', 3],
  ['Clue: steps in order', 'Procedure.', 'exam-tip', 3],
  ['Clue: rivals and markets', 'Strategy.', 'exam-tip', 3],
  ['Policy vs rule', 'Policy guides with discretion; rule commands with none.', 'concept', 3],
  ['Procedure vs method', 'Procedure: in what order. Method: in what way.', 'concept', 3],
  ['Case routine', 'Quote the line, name the step or type, explain the link.', 'exam-tip', 2],
]);

// ---------------------------------------------------------------- tests (ISC class defaults, item for item)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Planning',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A - Objective (5 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_direction', 'm_premises', 'm_policy', 'm_strategy', 'ar_choose'] },
    { id: 'B', title: 'Section B - Short answer (4 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s_meaning', { attempt: 1, keys: ['s_limits2', 's_budget_prog'] }] },
    { id: 'C', title: 'Section C - Short answer (6 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s3_importance', { attempt: 1, keys: ['s3_steps', 's3_types'] }] },
    { id: 'D', title: 'Section D - Long answer (5 marks)', instr: 'Answer the question. It is set in parts.', items: ['l_limits'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Planning',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A - Objective (12 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_primary', 'm_uncertainty', 'm_overlap', 'm_first_step', 'm_evaluate', 'm_limit_env', 'm_objective', 'm_rule', 'm_procedure', 'm_budget', 'ar_primary', 'ar_rule'] },
    { id: 'B', title: 'Section B - Short answer (6 marks)', instr: 'Answer all three questions. Internal choice in the last question.', items: ['s_importance', 's_implement', { attempt: 1, keys: ['s_rule_case', 's_objective2'] }] },
    { id: 'C', title: 'Section C - Short answer (12 marks)', instr: 'Answer all four questions. Internal choice in the last question.', items: ['s3_functions', 's3_limits', 's3_premises', { attempt: 1, keys: ['s3_opr', 's3_procedure_method'] }] },
    { id: 'D', title: 'Section D - Long answer (10 marks)', instr: 'Answer both questions. Internal choice in the second question. Each is set in parts.', items: ['l_steps', { attempt: 1, keys: ['l_importance', 'l_types'] }] },
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
    syllabus: 'topics t01–t03 of isc-12-commerce-ch08 (functions of management and the meaning and importance of planning; steps and limitations of planning; types of plans: objectives, policies, procedures, methods, rules, budgets, programmes and strategies)',
    originality: 'every firm, person and case is imagined and written by SOYL and labelled; no ISC or CBSE textbook text, illustration or exercise and no CISCE specimen or board item reused (D-036); firms, people and set-ups differ from CBSE 12 Business Studies ch04',
    data: 'no computed figures; all examples are imagined and labelled',
    facts: 'stable textbook concepts only (five functions, seven steps of planning, six limitations, eight types of plans)',
    gate: 'schema, pipeline lint, deterministic verify, word limits, narration and answer-leak checks run clean in this build',
  },
});
