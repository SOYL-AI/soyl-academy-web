// CBSE 12 Business Studies, ch04 Planning — question bank. Every firm, person, scenario and figure is
// written by SOYL (imagined Indian businesses, labelled as such); no NCERT text, exercise or
// board/sample-paper item is reused (D-036). The one computed figure (a trade-fair budget) is derived here.
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from './lib.mjs';

export const inr = (n) => Number(n).toLocaleString('en-IN');

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// ---------------------------------------------------------------- computed figures
// Trade-fair budget of an imagined handloom cooperative (₹).
export const FAIR = { total: 600000, stallPct: 40, travelPct: 25 };
export const FAIR_STALL = (FAIR.total * FAIR.stallPct) / 100; // 2,40,000
export const FAIR_TRAVEL = (FAIR.total * FAIR.travelPct) / 100; // 1,50,000
export const FAIR_REST = FAIR.total - FAIR_STALL - FAIR_TRAVEL; // 2,10,000
// Sales budget of an imagined pressure-cooker maker.
export const SB = { units: 12000, price: 1250 };
export const SB_VALUE = SB.units * SB.price; // 1,50,00,000
assert.equal(FAIR_STALL, 240000);
assert.equal(FAIR_TRAVEL, 150000);
assert.equal(FAIR_REST, 210000);
assert.equal(SB_VALUE, 15000000);

// ================================================================ t01 Concept, features, importance, limitations
Q('m_primary', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Why is planning described as the **primary** function of management?',
  opts: [
    'Organising, staffing, directing and controlling are all carried out within the framework that planning lays down',
    'Planning is done only by the owners of a business, never by managers',
    'Planning is the function that takes the least time',
    'Planning is needed only when a business is first started',
  ],
  sol: 'Planning comes first: the other functions are performed to carry out the plans it sets. It is done by managers at every level, it is not the quickest function, and it continues throughout the life of a business.',
}));
Q('m_futuristic', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Before fixing production for the coming festive season, the manager of *Kurkura Snacks* (an imagined Indore firm) studies expected demand, likely raw-material prices and rivals\' launches. Which feature of planning does this show?',
  opts: ['Planning is futuristic', 'Planning is pervasive', 'Planning is a primary function', 'Planning is rigid'],
  sol: 'The manager looks ahead and forecasts conditions of a future period before deciding: planning is forward-looking (futuristic). Pervasive means it happens at all levels; rigidity is a limitation, not a feature.',
}));
Q('m_pervasive', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'At *Sahyadri Cables* (imagined), the managing director plans a new factory, the production manager plans monthly output, and a shift supervisor plans which worker operates which machine. This shows that planning is',
  opts: ['pervasive', 'a mental exercise', 'continuous', 'futuristic'],
  sol: 'Planning is carried out at the top, middle and lower levels, each with a different scope: it is pervasive. The other options are true of planning but are not what this situation illustrates.',
}));
Q('m_mental', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Planning is called a **mental exercise** mainly because it',
  opts: [
    'requires foresight, imagination and sound judgement rather than physical work',
    'is done by managers who are trained in psychology',
    'is always written down in a long report',
    'removes every risk from the future',
  ],
  sol: 'Thinking ahead, imagining possibilities and judging between them are intellectual activities. Planning does not need psychology training, it need not be a long report, and it cannot remove all risk.',
}));
Q('m_decision', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Planning is said to **involve decision making** because',
  opts: [
    'it requires choosing the most suitable course from among several alternatives',
    'all decisions in a firm are taken only once a year',
    'managers do not need to think about alternatives once a plan exists',
    'it is concerned only with past performance',
  ],
  sol: 'Planning is needed only where alternatives exist; the planner evaluates them and chooses one. Decisions are taken throughout the year, alternatives are central to planning, and planning looks to the future.',
}));
Q('m_continuous', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A school-bag maker prepares a plan for the April–June season. As that season ends, it starts preparing the plan for the next season, using what it learnt. Which feature of planning is shown?',
  opts: ['Planning is continuous', 'Planning is pervasive', 'Planning reduces creativity', 'Planning is a primary function'],
  sol: 'Each plan covers a period and is followed by a new one: planning is a continuous process. Pervasiveness concerns levels of management; reduced creativity is a limitation.',
}));
Q('m_imp_overlap', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'At an imagined hospital in Nagpur, the pharmacy and the surgical ward used to order the same medicines separately, and some stock expired unused. After a common purchase plan was made, this stopped. Which importance of planning is illustrated?',
  opts: [
    'Planning reduces overlapping and wasteful activities',
    'Planning promotes innovative ideas',
    'Planning establishes standards for controlling',
    'Planning reduces creativity',
  ],
  sol: 'Coordinating the two departments\' purchases removed duplicate orders and wasted stock. Reduced creativity is a limitation; the other two are importance points not shown here.',
}));
Q('m_imp_standards', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'The sales head of *Rangoli Paints* (imagined) compares each region\'s actual sales with the targets set in the annual plan and asks lagging regions for reasons. Which importance of planning makes this possible?',
  opts: [
    'Planning establishes standards for controlling',
    'Planning reduces the risks of uncertainty',
    'Planning provides direction to employees',
    'Planning facilitates decision making',
  ],
  sol: 'The targets in the plan act as standards against which actual results are measured: planning makes controlling possible. The other points are valid importance points but not the one being used here.',
}));
Q('m_lim_rigidity', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Halfway through the year, a manager at *Jharna Water Purifiers* (imagined) spots a chance to enter a new city but is told she must stick to the cities and spending fixed in the annual plan. Which limitation of planning does this show?',
  opts: ['Planning leads to rigidity', 'Planning involves huge costs', 'Planning is time-consuming', 'Planning does not guarantee success'],
  sol: 'A fixed plan prevents the manager from changing course to use a new opportunity: rigidity. Cost and time are other limitations; success is not the issue here.',
}));
Q('m_lim_dynamic', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'An imagined toy importer planned its year around low customs duties. Two months later the government raised the duty sharply, and the plan became unworkable. The limitation highlighted is that planning',
  opts: [
    'may not work in a dynamic environment',
    'reduces creativity',
    'involves huge costs',
    'leads to overlapping of activities',
  ],
  sol: 'The business environment changed in a way the plan could not foresee, so the plan failed: planning may not work in a dynamic environment. Overlapping activities are reduced by planning, not caused by it.',
}));
Q('m_lim_creativity', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'At an imagined textile mill, supervisors say, "Top management has already decided everything; we just follow the plan." Which limitation of planning does this reflect?',
  opts: ['Planning reduces creativity', 'Planning is time-consuming', 'Planning involves huge costs', 'Planning does not guarantee success'],
  sol: 'When plans are made at the top and lower levels only carry them out, people below have little room to suggest new ideas: planning can reduce creativity.',
}));
Q('m_lim_cost', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Spending on consultants, market surveys and expert forecasts while preparing a plan points to which limitation of planning?',
  opts: ['Planning involves huge costs', 'Planning leads to rigidity', 'Planning reduces creativity', 'Planning is pervasive'],
  sol: 'Collecting information, forecasting and evaluating options cost money; for some decisions the benefit may not justify it. Pervasiveness is a feature, not a limitation.',
}));
Q('m_lim_success', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'A firm repeats last year\'s successful plan without checking whether conditions have changed, and this year it fails. Which limitation of planning is best illustrated?',
  opts: [
    'Planning does not guarantee success',
    'Planning reduces overlapping activities',
    'Planning is a mental exercise',
    'Planning is continuous',
  ],
  sol: 'Relying on a plan that worked before creates a false sense of security; a plan helps only if it fits current conditions and is carried out well, so success is not guaranteed. The other options are features or importance points.',
}));
Q('ar_top_only', ar({
  t: 1, d: 2, c: 'analysis', key: 'd',
  a: 'Planning is required only at the top level of management.',
  r: 'Planning is a pervasive function of management.',
  sol: 'A is false: managers at every level plan, though with different scope. R is true: pervasiveness is exactly why A is wrong.',
}));
Q('ar_standards', ar({
  t: 1, d: 2, c: 'analysis', key: 'a',
  a: 'Planning makes controlling possible.',
  r: 'The goals fixed during planning serve as the standards against which actual performance is measured.',
  sol: 'Both are true, and R explains A: without planned targets there would be nothing to compare actual results with.',
}));
Q('ar_creativity', ar({
  t: 1, d: 3, c: 'analysis', key: 'a',
  a: 'Planning may reduce creativity in an organisation.',
  r: 'Middle and lower-level managers mostly implement plans drawn up by top management and have little freedom to change them.',
  sol: 'Both are true, and R explains A: when people below only carry out fixed plans, their initiative and new ideas get little room.',
}));
Q('tf_guarantee', tf({
  t: 1, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? A carefully prepared plan guarantees the success of a business.',
  sol: 'A plan improves the chances of success but cannot ensure it: conditions may change, and the plan must be implemented well.',
}));
Q('mt_features', match({
  t: 1, d: 2, c: 'understanding',
  stem: 'Match each feature of planning with the description that best fits it.',
  pairs: [
    ['Futuristic', 'Looks ahead and prepares for events of a coming period'],
    ['Pervasive', 'Is carried out at every level and in every department'],
    ['Continuous', 'A new plan follows when the period of the earlier one ends'],
    ['Mental exercise', 'Needs foresight, imagination and judgement'],
  ],
  sol: 'Each feature is described by its defining idea: future orientation, presence at all levels, a never-ending cycle, and intellectual effort.',
}));
Q('s_concept', short({
  t: 1, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is meant by planning? Why is it said to be focused on achieving objectives?',
  model: '**Planning** means deciding **in advance what to do and how to do it**: setting goals and choosing the way to reach them. It is **focused on objectives** because every plan starts from a goal, and its activities are chosen only because they help the business reach that goal.',
  sol: 'A definition (deciding in advance) and the link between plans and goals.',
  scheme: [['Meaning of planning', 1], ['Why it is goal-oriented', 1]],
}));
Q('s_primacy', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain why planning comes before the other functions of management.',
  model: 'Planning **sets the goals and the course of action**. Only then can a manager **organise** resources, **staff** positions, **direct** people and **control** results, because each of these is done to carry out the plan. Without a plan the other functions would have no purpose or direction.',
  sol: 'Link the other four functions to the plan they serve.',
  scheme: [['Planning sets goals and the course of action', 1], ['Other functions depend on it', 1]],
}));
Q('s_uncertainty', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: '*Himsheet Cold Stores* (imagined) in Shimla expects long power cuts during winter storms, so it plans ahead by installing a backup generator and fixing a diesel supply contract. Which importance of planning does this show? Explain.',
  model: 'It shows that planning **reduces the risks of uncertainty**. By **anticipating** a likely future problem (power cuts) and arranging a **generator and fuel** in advance, the firm can keep its stores cold and avoid losses when the event occurs.',
  sol: 'Name the importance point and connect it to the anticipated event and the advance arrangement.',
  scheme: [['Reduces risks of uncertainty', 1], ['Explanation from the situation', 1]],
}));
Q('s_innovative', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'How does planning encourage new ideas in an organisation?',
  model: 'While planning, managers must **think of many possible courses** of action and look for **better ways** of reaching goals. This search makes them **creative**: new products, methods and markets are often first proposed during planning, and good ideas then get a place in the final plan.',
  sol: 'Explain that searching for alternatives produces new ideas.',
  scheme: [['Search for alternatives during planning', 1], ['Leads to new ideas being adopted', 1]],
}));
Q('s_lim_time', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: '*Pixelkart* (an imagined online electronics seller) took four months to prepare a detailed plan for a new smartphone range. By the time it was ready, a rival had already launched a similar range. Identify and explain the limitation of planning shown.',
  model: 'The limitation is that planning is **time-consuming**. Collecting information, studying alternatives and preparing a detailed plan took so long that the **opportunity was lost**: in a fast-moving market, the delay let a rival act first.',
  sol: 'Name the limitation and connect it to the lost opportunity.',
  scheme: [['Time-consuming', 1], ['Explanation from the case', 1]],
}));
Q('s3_features', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain any three features of planning.',
  model: '1. **Pervasive:** planning is needed at **every level** — the top plans for the whole firm, middle managers for departments and supervisors for daily work.\n2. **Futuristic:** it is **forward-looking**, preparing the firm for conditions expected in a coming period.\n3. **Involves decision making:** the planner must **choose the best alternative** from several possible courses of action.',
  sol: 'Any three features, each named and explained in a sentence.',
  scheme: [['First feature explained', 1], ['Second feature explained', 1], ['Third feature explained', 1]],
}));
Q('s3_importance', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Before the monsoon, *Arogya Clinic* (an imagined clinic in Kochi) fixes how many fever tests it will stock, assigns each nurse a clear duty and sets a daily target for patients seen. Identify three points of importance of planning reflected here and explain each briefly.',
  model: '1. **Provides direction:** each nurse knows her **duty**, so everyone works towards the same goal.\n2. **Reduces risks of uncertainty:** stocking tests in advance prepares the clinic for the **expected rise** in fever cases.\n3. **Establishes standards for controlling:** the **daily target** lets the clinic compare actual work with the plan.',
  sol: 'Three distinct importance points, each tied to a line of the situation.',
  scheme: [['First point identified and linked', 1], ['Second point identified and linked', 1], ['Third point identified and linked', 1]],
}));
Q('l_importance', long({
  t: 1, d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain any five points that show the importance of planning for a business.',
  model: '1. **Provides direction:** stating goals in advance tells every employee what to work towards.\n2. **Reduces risks of uncertainty:** by forecasting changes, managers prepare responses before problems arise.\n3. **Reduces overlapping and waste:** coordinated plans prevent duplicate work and idle resources.\n4. **Promotes innovative ideas:** searching for the best course of action encourages creative thinking.\n5. **Establishes standards for controlling:** planned targets give the yardstick for measuring actual performance.',
  sol: 'Five distinct importance points, each with a one-line explanation.',
  scheme: [['First point', 1], ['Second point', 1], ['Third point', 1], ['Fourth point', 1], ['Fifth point', 1]],
}));
Q('l_features', long({
  t: 1, d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: 'Describe any five features of planning with a short example of each.',
  model: '1. **Focuses on objectives:** a bakery plans in order to raise sales, not for its own sake.\n2. **Primary function:** staffing and directing follow the plan, so planning comes first.\n3. **Pervasive:** a director plans expansion while a supervisor plans the weekly roster.\n4. **Continuous:** when a quarterly plan ends, the next quarter\'s plan is prepared.\n5. **Mental exercise:** forecasting next year\'s demand needs foresight and judgement, not physical work.',
  sol: 'Five features, each with a brief example.',
  scheme: [['First feature with example', 1], ['Second feature with example', 1], ['Third feature with example', 1], ['Fourth feature with example', 1], ['Fifth feature with example', 1]],
}));
Q('l_limitations', long({
  t: 1, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Planning has several limitations. Explain any five of them.',
  model: '1. **Rigidity:** once fixed, a plan may stop managers from changing course even when a better option appears.\n2. **May not work in a dynamic environment:** sudden changes in policy, technology or demand can make a plan useless.\n3. **Reduces creativity:** lower-level staff mostly implement plans framed at the top, so their initiative suffers.\n4. **Huge costs:** surveys, experts and forecasts make planning expensive.\n5. **Time-consuming:** detailed planning may delay action, so opportunities can be lost.',
  sol: 'Five limitations, each explained in a line.',
  scheme: [['First limitation', 1], ['Second limitation', 1], ['Third limitation', 1], ['Fourth limitation', 1], ['Fifth limitation', 1]],
}));
Q('l_evaluate', long({
  t: [1, 2], d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Planning is costly, takes time and can make a firm rigid. Yet almost every successful business plans. Evaluate this statement, giving arguments on both sides and your conclusion.',
  model: '1. **Against:** planning uses money on surveys and experts and takes time, so quick opportunities may be missed.\n2. **Against:** a fixed plan can make the firm **rigid** in a changing environment.\n3. **For:** planning gives **direction** and helps **anticipate** risks, so the firm is rarely caught unprepared.\n4. **For:** it provides **standards for control** and avoids waste.\n5. **Conclusion:** the limitations are real but manageable; plans should be **flexible**, reviewed through **follow-up**, so their benefits outweigh their costs.',
  sol: 'Two limitations, two benefits, and a reasoned conclusion that recommends flexible plans with review.',
  scheme: [['First argument against', 1], ['Second argument against', 1], ['First argument for', 1], ['Second argument for', 1], ['Reasoned conclusion', 1]],
}));

// ================================================================ t02 Planning process
Q('m_first_step', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Which is the **first** step in the planning process?',
  opts: ['Setting objectives', 'Developing premises', 'Evaluating alternative courses', 'Implementing the plan'],
  sol: 'A firm must first decide what it wants to achieve; premises, alternatives and implementation all follow from the objectives.',
}));
Q('m_premises_meaning', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'In the planning process, **premises** are best described as',
  opts: [
    'assumptions about future conditions on which the plan is based',
    'the buildings and land owned by the business',
    'the final targets the business wants to achieve',
    'the rules employees must follow at work',
  ],
  sol: 'Premises are the forecasts and assumptions (about demand, prices, policy) that form the base of a plan. Business premises in the sense of buildings, objectives and rules are different ideas.',
}));
Q('m_premise_scenario', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'The planning team of *Ganga Logistics* (imagined) assumes that diesel prices will rise by about a tenth next year and that a new expressway will open by June. Which step of planning are they at?',
  opts: ['Developing premises', 'Setting objectives', 'Selecting an alternative', 'Follow-up action'],
  sol: 'Making assumptions about future conditions (fuel prices, a new road) is developing premises. Objectives are goals; selection and follow-up come later.',
}));
Q('m_evaluate', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'A dairy cooperative compares three ways of reaching city buyers — its own milk booths, supermarkets and a delivery app — by looking at the cost, reach and risk of each. Which step of planning is this?',
  opts: ['Evaluating alternative courses', 'Identifying alternative courses of action', 'Implementing the plan', 'Developing premises'],
  sol: 'The options have already been identified; weighing the positives and negatives of each is evaluation. Implementation and premises are different steps.',
}));
Q('m_followup', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Three months after launching a plan to cut delivery time, the manager of an imagined courier firm checks every week whether the targets are being met and adjusts routes where they are not. This is',
  opts: ['follow-up action', 'setting objectives', 'evaluating alternatives', 'developing premises'],
  sol: 'Monitoring whether a plan is being carried out as intended, and correcting it, is follow-up action, the last step of the process.',
}));
Q('m_identify', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'To raise sales, the owner of an imagined sweet shop in Agra lists the options: open a second outlet, start home delivery, or supply hotels. At this point she has not yet compared them. Which step has she completed?',
  opts: ['Identifying alternative courses of action', 'Evaluating alternative courses', 'Selecting an alternative', 'Follow-up action'],
  sol: 'Listing possible courses of action, without comparing them yet, is identifying alternatives. Evaluation and selection come next.',
}));
Q('ar_premises', ar({
  t: 2, d: 2, c: 'analysis', key: 'a',
  a: 'Developing premises is an important step in planning.',
  r: 'Plans rest on assumptions about the future, and wrong assumptions can make a plan fail.',
  sol: 'Both are true, and R explains A: since every plan rests on assumptions, they must be developed carefully and shared with all planners.',
}));
Q('ar_continuous_choice', ar({
  t: [1, 2], d: 3, c: 'analysis', key: 'b',
  a: 'Planning is a continuous process.',
  r: 'Planning involves choosing from among alternative courses of action.',
  sol: 'Both are true, but R does not explain A. Planning is continuous because one plan is followed by another for the next period; choosing among alternatives explains why planning involves decision making.',
}));
Q('tf_followup_last', tf({
  t: 2, d: 1, c: 'recall', ans: true,
  stem: 'True or false? Follow-up action is the last step of the planning process.',
  sol: 'After the plan is implemented, managers check that it is carried out as intended; this monitoring is the final step.',
}));
Q('fb_premises', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'The assumptions about future conditions on which a plan is built are called planning ___.',
  acc: [['premises']],
  sol: 'These assumptions are called premises (for example, expected demand, prices or government policy).',
}));
Q('ord_steps', ord({
  t: 2, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange the steps of the planning process in the correct order.',
  items: [
    'Setting objectives',
    'Developing premises',
    'Identifying alternative courses of action',
    'Evaluating alternative courses',
    'Selecting an alternative',
    'Implementing the plan',
    'Follow-up action',
  ],
  sol: 'Goals come first, then assumptions, then the options are listed, weighed and one is chosen; the plan is put into action and finally monitored.',
}));
Q('s_premises', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What are planning premises? Give two examples of premises a car-parts maker might use.',
  model: '**Premises** are the **assumptions about the future** on which a plan is based. A car-parts maker might assume that (1) **car sales will grow** next year, and (2) **steel prices will stay stable**; its production and purchase plans rest on these forecasts.',
  sol: 'Meaning of premises plus two suitable forecasts.',
  scheme: [['Meaning', 1], ['Two suitable examples', 1]],
}));
Q('s3_steps_first3', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: '*Chai Chaupal* (an imagined tea-stall chain in Lucknow) wants to grow. Explain the first three steps of planning it should follow, using its situation as the example.',
  model: '1. **Setting objectives:** decide what it wants, e.g. **ten new stalls** within two years.\n2. **Developing premises:** assume conditions, e.g. **footfall near colleges** will rise and milk prices stay steady.\n3. **Identifying alternatives:** list ways to grow, such as **own stalls, franchises** or a **delivery kitchen**, before comparing them.',
  sol: 'The three steps in order, each applied to the tea-stall chain.',
  scheme: [['Setting objectives applied', 1], ['Developing premises applied', 1], ['Identifying alternatives applied', 1]],
}));
Q('s3_evaluate_select', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'How is evaluating alternatives different from selecting an alternative? Explain, and say why the manager may choose a combination of courses rather than just one.',
  model: '**Evaluating** means **weighing the merits and demerits** of each option, e.g. cost, risk and returns. **Selecting** is the **decision** that follows: the best option is **adopted**. A manager may **combine** courses when no single option is best on every count, e.g. using own stores in big cities and dealers in small towns.',
  sol: 'The difference between the two steps and the reason for choosing a combination.',
  scheme: [['Evaluating explained', 1], ['Selecting explained', 1], ['Reason for a combination', 1]],
}));
Q('l_process', long({
  t: 2, d: 3, c: 'application', marks: 5, wl: L5,
  stem: '*Pedal Pathway* (an imagined bicycle maker in Ludhiana) wants to launch electric bicycles. Explain the steps of planning it should follow, using its situation.',
  model: '1. **Objectives:** sell **5,000 e-bikes** in the first year.\n2. **Premises:** assume demand from **college students** will grow and battery prices will fall.\n3. **Alternatives and evaluation:** list options (make batteries itself, buy them, or partner with a supplier) and compare their cost and risk.\n4. **Selection and implementation:** choose the **partnership**, then assign tasks, money and deadlines to departments.\n5. **Follow-up:** review **monthly sales** against the target and correct the plan where needed.',
  sol: 'All seven steps, grouped sensibly, each applied to the e-bike launch.',
  scheme: [['Objectives', 1], ['Premises', 1], ['Alternatives identified and evaluated', 1], ['Selection and implementation', 1], ['Follow-up', 1]],
}));

// ================================================================ t03 Types of plans
Q('m_single_use', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which of the following is a **single-use** plan?',
  opts: [
    'A detailed plan and budget for a company\'s twenty-fifth anniversary event',
    'A rule that visitors must sign in at the gate',
    'A procedure for approving leave applications',
    'A policy of promoting staff from within the firm',
  ],
  sol: 'An anniversary event happens once, so its plan is single-use. Rules, procedures and policies are used again and again (standing plans).',
}));
Q('m_policy', mcq({
  t: 3, d: 2, c: 'application',
  stem: '*Annapurna Foods* (imagined) states: "Wherever possible, we buy vegetables from farmer producer organisations within 100 km of our factory." This is an example of a',
  opts: ['policy', 'rule', 'procedure', 'budget'],
  sol: 'It is a general guide to decisions on purchases that still leaves managers judgement ("wherever possible"): a policy. A rule allows no discretion; a procedure is a sequence of steps; a budget is in numbers.',
}));
Q('m_rule', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'A notice at an imagined chemical plant reads: "Safety helmets must be worn on the shop floor at all times. Anyone found without one will be fined ₹500." This is a',
  opts: ['rule', 'policy', 'method', 'strategy'],
  sol: 'It states exactly what must be done, allows no discretion and names a penalty: a rule.',
}));
Q('m_procedure', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'At an imagined bank branch, a staff claim for travel expenses is filled in, checked by the branch manager, verified by accounts and then paid. This fixed sequence of steps is a',
  opts: ['procedure', 'method', 'policy', 'objective'],
  sol: 'A chronological series of steps for a routine activity is a procedure. A method is the way one step is performed.',
}));
Q('m_method', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'An imagined call centre decides that new staff will be trained by sitting beside experienced colleagues on live calls rather than through classroom lectures. This choice of how a task is done is a',
  opts: ['method', 'procedure', 'rule', 'programme'],
  sol: 'A method prescribes the way a particular task (here, training) is to be carried out. A procedure is a sequence of steps; a rule allows no choice; a programme is a detailed plan for a project.',
}));
Q('m_strategy', mcq({
  t: 3, d: 3, c: 'application',
  stem: '*Nirmal Detergents* (imagined) decides to enter rural markets with small low-priced sachets, advertise in regional languages and sell through village shops, putting most of its marketing budget behind this. This is an example of a',
  opts: ['strategy', 'rule', 'procedure', 'method'],
  sol: 'A comprehensive plan that sets a long-term direction, chooses a course of action and commits resources, in response to the environment, is a strategy.',
}));
Q('m_budget', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'A plan that states expected results in numerical terms for a future period is a',
  opts: ['budget', 'policy', 'method', 'rule'],
  sol: 'A budget expresses a plan in numbers (rupees, units, hours). It also serves as a control device.',
}));
Q('m_objective', mcq({
  t: 3, d: 2, c: 'application',
  stem: '"Raise our share of the two-wheeler tyre market in South India from 12 per cent to 15 per cent by March 2028." In the classification of plans, this statement is',
  opts: ['an objective', 'a rule', 'a procedure', 'a method'],
  sol: 'It states an end result to be achieved within a time period: an objective. Rules, procedures and methods concern how work is done.',
}));
Q('m_programme', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'For opening its first store in Guwahati, an imagined furniture retailer prepares a detailed plan listing the tasks, the people responsible, the money needed and the date for each stage. This is a',
  opts: ['programme', 'policy', 'rule', 'method'],
  sol: 'A detailed statement of a one-time project, covering tasks, resources and timing, is a programme (a single-use plan).',
}));
Q('ar_rule', ar({
  t: 3, d: 2, c: 'analysis', key: 'c',
  a: 'A rule leaves no scope for discretion.',
  r: 'A rule is a general guide to thinking that allows managers to use their judgement.',
  sol: 'A is true: a rule says exactly what must or must not be done. R is false: it describes a policy, not a rule.',
}));
Q('ar_strategy', ar({
  t: 3, d: 3, c: 'analysis', key: 'a',
  a: 'A strategy is a comprehensive plan.',
  r: 'A strategy covers the long-term direction of the firm, the course of action to reach it and the allocation of resources, keeping the business environment in view.',
  sol: 'Both are true, and R explains A: because a strategy covers direction, action and resources together, it is comprehensive.',
}));
Q('tf_procedure_single', tf({
  t: 3, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? A procedure is a single-use plan.',
  sol: 'A procedure is a standing plan: the same sequence of steps is used every time the routine activity recurs.',
}));
Q('tf_programme_single', tf({
  t: 3, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? A programme drawn up for launching one new product is a single-use plan.',
  sol: 'It covers a one-time project and is not used again once the launch is over, so it is single-use.',
}));
Q('fb_budget', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'A statement of expected results expressed in numbers, such as a sales target in units and rupees, is called a ___.',
  acc: [['budget']],
  sol: 'Such a numerical plan is a budget.',
}));
Q('fb_single_use', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'Plans made for a one-time event or project that will not recur are called ___ plans.',
  acc: [['single-use', 'single use']],
  sol: 'They are single-use plans, for example a programme or a budget for one event.',
}));
Q('mt_plans', match({
  t: 3, d: 2, c: 'application',
  stem: 'Match each statement from an imagined pharmacy chain with the type of plan it represents.',
  pairs: [
    ['"We try to stock generic medicines wherever a doctor permits it."', 'Policy'],
    ['"No medicine may be sold after its expiry date."', 'Rule'],
    ['"Receive the order, check the batch number, enter it in the register, shelve it."', 'Procedure'],
    ['"Count stock by scanning barcodes, not by hand."', 'Method'],
  ],
  sol: 'A guide with room for judgement is a policy; a strict do or do not is a rule; a sequence of steps is a procedure; the way one task is done is a method.',
}));
Q('n_sales_budget', num({
  t: 3, d: 2, c: 'understanding', marks: 1, value: SB_VALUE, unit: '₹',
  stem: `*Steamwell Appliances* (imagined) plans to sell ${inr(SB.units)} pressure cookers next year at ₹${inr(SB.price)} each. What is the value of its sales budget in rupees?`,
  sol: `Step 1: Sales budget = units × price.\nStep 2: ${inr(SB.units)} × ${inr(SB.price)} = ${inr(SB_VALUE)}. So ₹${inr(SB_VALUE)}.`,
}));
Q('s_policy_rule', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between a policy and a rule on any two bases.',
  model: '1. **Discretion:** a **policy** is a general guide that **allows judgement**; a **rule** allows **no discretion**.\n2. **Penalty:** breaking a rule usually carries a **penalty**; a policy only guides decisions and has no fixed penalty.',
  sol: 'Two bases, each stating the position of both a policy and a rule.',
  scheme: [['First basis, both sides', 1], ['Second basis, both sides', 1]],
}));
Q('s_method_procedure', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'How is a method different from a procedure? Explain with one example from a school office.',
  model: 'A **procedure** is the **sequence of steps** for a routine job; a **method** is the **way one step is done**. Fee collection in a school office follows a procedure (receive, record, issue receipt); recording the fee **on a computer instead of a ledger** is a method.',
  sol: 'Meaning of each and an example that shows the difference.',
  scheme: [['Difference explained', 1], ['Suitable example', 1]],
}));
Q('s_single_standing', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between single-use and standing plans, giving one example of each.',
  model: '**Single-use plans** are made for a **one-time** event and lapse after it, e.g. a **budget for an annual sports day**. **Standing plans** are used **repeatedly** for recurring situations, e.g. a **policy** of promoting staff from within.',
  sol: 'Both types defined with an example of each.',
  scheme: [['Single-use with example', 1], ['Standing with example', 1]],
}));
Q('s3_strategy', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'What is a strategy? Explain the three things a strategy decides, using an imagined bakery chain planning to expand into a new state.',
  model: 'A **strategy** is a **comprehensive plan** for reaching long-term goals in the light of the environment. It decides:\n1. **Long-term objectives:** e.g. **thirty outlets** in Telangana in five years.\n2. **Course of action:** e.g. local flavours and **franchise** outlets.\n3. **Allocation of resources:** e.g. most of the **expansion fund** to the first ten outlets.',
  sol: 'Meaning plus the three dimensions, each applied to the bakery.',
  scheme: [['Objectives dimension', 1], ['Course of action dimension', 1], ['Resource allocation dimension', 1]],
}));
Q('s3_objectives', short({
  t: 3, d: 4, c: 'application', marks: 3, wl: S3,
  stem: 'Explain objectives as a type of plan. Rewrite the vague goal "We want to do better in exports" as a useful objective, and state two qualities your version has.',
  model: '**Objectives** are the **end results** an organisation aims to achieve; all other plans serve them. A useful version: "**Raise export sales by 20 per cent by March 2028.**" It is (1) **measurable**, because results can be checked in numbers, and (2) **time-bound**, because it states a deadline.',
  sol: 'Meaning of objectives, a rewritten objective and two qualities it has.',
  scheme: [['Meaning of objectives', 1], ['Suitable rewritten objective', 1], ['Two qualities stated', 1]],
}));
Q('l_types', long({
  t: 3, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain any five types of plans, with one example of each from an imagined hospital.',
  model: '1. **Objective:** the end result, e.g. cut patient waiting time to **twenty minutes** by next year.\n2. **Policy:** a general guide, e.g. **emergency cases are treated first**, whatever the queue.\n3. **Procedure:** steps in sequence, e.g. register the patient, record vital signs, then send to the doctor.\n4. **Rule:** no discretion, e.g. **no visitors in the intensive care unit**.\n5. **Budget:** a plan in numbers, e.g. **₹40 lakh** for new equipment this year.',
  sol: 'Five types, each with a meaning and a hospital example.',
  scheme: [['First type with example', 1], ['Second type with example', 1], ['Third type with example', 1], ['Fourth type with example', 1], ['Fifth type with example', 1]],
}));

// ================================================================ case-based
Q('cb_vegam', caseQ({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: "Read the passage about Vegam Motors and answer the questions on the planning process that follow. *(Imagined company, written by SOYL for practice.)*",
  passage: '**Vegam Motors, Coimbatore (imagined)**\n\nThe board of Vegam Motors decided to sell 20,000 electric scooters in Tamil Nadu within two years. The planning team then worked on the assumption that state support for electric vehicles would continue and that battery prices would keep falling. Next, the team listed three ways to sell: opening company showrooms, appointing dealers, or selling only online. Each option was studied for its cost, speed and risk. The team chose to appoint dealers in big cities and sell online in smaller towns.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Identify the step of planning shown by: "...worked on the assumption that state support for electric vehicles would continue..."', model: '**Developing premises.**', sol: 'Assumptions about the future are premises.', scheme: [['Developing premises', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Quote the line that shows the step "identifying alternative courses of action".', model: 'The line beginning "**Next, the team listed three ways to sell...**", which names showrooms, dealers and online selling.', sol: 'The line that lists the options before they are compared.', scheme: [['Correct line quoted', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Name and explain the two steps of planning that Vegam Motors still has to carry out.', model: '1. **Implementing the plan:** assign dealers, staff, money and deadlines so that the chosen mix is put into action.\n2. **Follow-up action:** regularly compare actual scooter sales with the 20,000 target and correct the plan if needed.', sol: 'After selection come implementation and follow-up.', scheme: [['Implementing the plan explained', 1], ['Follow-up action explained', 1]] }), [
      short({ t: 2, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Why might the team have chosen a combination of dealers and online sales rather than a single option? Give two reasons.', model: '1. **No single option is best everywhere:** dealers suit big cities with many buyers, while online sales reach small towns cheaply.\n2. **Spreading risk:** using two channels means a problem with one does not stop all sales.', sol: 'Two sound reasons for combining courses of action.', scheme: [['First reason', 1], ['Second reason', 1]] }),
    ]),
  ],
}));
Q('cb_neelgiri', caseQ({
  t: 3, d: 3, c: 'application', origin: 'soyl-original',
  stem: "Read the extract from the Neelgiri Garments handbook and answer the questions on types of plans that follow. *(Imagined firm, written by SOYL for practice.)*",
  passage: '**From the staff handbook of Neelgiri Garments, Tiruppur (imagined)**\n\n(1) "We prefer to buy cloth from mills that use safe dyes, unless supplies are short."\n(2) "Every worker must wear an identity card inside the unit."\n(3) "Damaged pieces are first recorded by the checker, then approved by the floor manager, and finally sent to the outlet store."\n(4) "Next year we will sell 1,50,000 uniforms worth ₹3 crore."',
  parts: [
    child('a', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Identify the type of plan in statement (1).', model: '**Policy.**', sol: 'A general guide that leaves room for judgement ("unless supplies are short") is a policy.', scheme: [['Policy', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Identify the type of plan in statement (4).', model: '**Budget** (a plan expressed in numbers).', sol: 'Expected sales in units and rupees for a future period make it a budget.', scheme: [['Budget', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify the types of plan in statements (2) and (3) and give one difference between them.', model: 'Statement (2) is a **rule**; statement (3) is a **procedure**. A rule states **what must or must not be done**, with no discretion; a procedure lays down the **sequence of steps** for a routine activity.', sol: 'Name both plans and give a valid difference.', scheme: [['Both types identified', 1], ['A valid difference', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Which statements are standing plans and which is a single-use plan? Give a reason.', model: 'Statements (1), (2) and (3) are **standing plans**, because they are used **again and again**. Statement (4) is a **single-use plan**, because it covers **one particular year** and lapses after it.', sol: 'Classify all four statements and give the reason for each group.', scheme: [['Standing plans with reason', 1], ['Single-use plan with reason', 1]] }),
    ]),
  ],
}));
Q('cb_rasoi', caseQ({
  t: 1, d: 4, c: 'analysis', origin: 'soyl-original',
  stem: "Read the passage about Rasoi Spices and answer the questions on the limitations of planning that follow. *(Imagined company, written by SOYL for practice.)*",
  passage: '**Rasoi Spices, Jaipur (imagined)**\n\nRasoi Spices paid a consultancy firm a large fee and spent three months preparing a plan to export spice blends to the Gulf. Soon after the plan was approved, the importing countries tightened their food-labelling rules and the packaging in the plan could no longer be used. A young manager suggested switching the first shipments to Singapore, where demand was rising, but she was told that the budget and markets had already been fixed for the year. Sales staff said they simply followed instructions from head office.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Identify the limitation of planning shown by the large consultancy fee.', model: '**Planning involves huge costs.**', sol: 'Money spent on experts and surveys is the cost limitation.', scheme: [['Huge costs', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which limitation of planning is shown by the change in the importing countries\' labelling rules?', model: 'Planning **may not work in a dynamic environment**.', sol: 'An unforeseen change outside the firm made the plan unworkable.', scheme: [['Does not work in a dynamic environment', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify and explain two other limitations of planning reflected in the passage.', model: '1. **Rigidity:** the manager could not switch to Singapore because markets and budget were **already fixed**.\n2. **Reduces creativity:** sales staff only **followed head-office instructions**, so their ideas had little place.', sol: 'Two further limitations, each tied to a line of the passage.', scheme: [['First limitation with evidence', 1], ['Second limitation with evidence', 1]] }), [
      short({ t: 1, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): Suggest two ways in which Rasoi Spices could reduce these problems in its next plan.', model: '1. Keep the plan **flexible**, with a **review point** each quarter so markets can be changed when rules change.\n2. **Involve sales staff** and younger managers in planning, so new ideas such as Singapore are considered early.', sol: 'Two practical suggestions that address the limitations shown.', scheme: [['First suggestion', 1], ['Second suggestion', 1]] }),
    ]),
  ],
}));
Q('cb_arogya', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: "Read the passage about Sanjeevani Hospital and answer the questions on the importance of planning that follow. *(Imagined hospital, written by SOYL for practice.)*",
  passage: '**Sanjeevani Hospital, Patna (imagined)**\n\nBefore the rainy season, the hospital\'s managers expected a rise in dengue cases. They stocked testing kits and extra beds in advance. Each ward was told exactly how many patients it should be ready to admit, so the staff knew what was expected of them. Purchases for all wards were made through one central store, which ended the old problem of two wards ordering the same items. At the end of each week, the number of patients actually treated was compared with the ward targets.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which importance of planning is shown by stocking kits and beds before the rainy season?', model: 'Planning **reduces the risks of uncertainty**.', sol: 'Preparing in advance for an expected event reduces risk.', scheme: [['Reduces risks of uncertainty', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which importance of planning is shown by buying through one central store?', model: 'Planning **reduces overlapping and wasteful activities**.', sol: 'One store ended duplicate orders by different wards.', scheme: [['Reduces overlapping and wasteful activities', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify two other points of importance of planning in the passage, quoting the lines.', model: '1. **Provides direction:** "...so the staff knew what was expected of them."\n2. **Establishes standards for controlling:** "...compared with the ward targets."', sol: 'Two further importance points, each with the supporting line.', scheme: [['First point with quoted line', 1], ['Second point with quoted line', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Which feature of planning is shown by the managers looking ahead to the rainy season? Explain it.', model: 'Planning is **futuristic**. The managers **forecast** what would happen in a **coming period** (more dengue cases) and prepared for it, instead of reacting only after patients arrived.', sol: 'Name the feature and link it to the forecast in the passage.', scheme: [['Futuristic', 1], ['Explanation from the passage', 1]] }),
    ]),
  ],
}));
Q('cb_fair', caseQ({
  t: 3, d: 3, c: 'application', origin: 'soyl-original',
  stem: "Read the passage about the Kosa Weavers' Cooperative and answer the questions on its plans for a trade fair. *(Imagined cooperative and figures, written by SOYL for practice.)*",
  passage: `**Kosa Weavers' Cooperative, Chhattisgarh (imagined)**\n\nThe cooperative will take part in a national handloom fair next February. Its managers prepared a schedule showing who will book the stall, who will choose the saris, when samples must reach the fair and how much each task will cost. They set aside ₹${inr(FAIR.total)} for the fair: ${FAIR.stallPct} per cent for the stall and ${FAIR.travelPct} per cent for travel, and the rest for samples and publicity. The cooperative also has a long-standing rule that no sari without the handloom mark may be sold.`,
  parts: [
    child('a', num({ t: 3, d: 2, c: 'application', marks: 1, value: FAIR_STALL, unit: '₹', stem: 'How much money (in ₹) has been set aside for the stall?', sol: `Step 1: Stall share = ${FAIR.stallPct}% of ${inr(FAIR.total)}.\nStep 2: ${inr(FAIR.total)} × ${FAIR.stallPct} ÷ 100 = ${inr(FAIR_STALL)}. So ₹${inr(FAIR_STALL)}.` })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Identify the type of plan shown by the schedule of tasks, people, dates and costs for the fair.', model: '**Programme** (a single-use plan).', sol: 'A detailed plan of tasks, responsibilities, timing and resources for one project is a programme.', scheme: [['Programme', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Is the plan for the fair a single-use or a standing plan? Contrast it with the rule mentioned at the end.', model: 'The fair plan is **single-use**: it serves **one event** next February and lapses after it. The handloom-mark rule is a **standing plan**: it applies to **every sale, year after year**.', sol: 'Classify the fair plan and contrast it with the standing rule.', scheme: [['Fair plan classified with reason', 1], ['Rule contrasted as standing', 1]] }), [
      short({ t: 3, d: 3, c: 'application', marks: 2, stem: `**Or** (ii): How much is left for samples and publicity, and which type of plan does the money allocation represent?`, model: `₹${inr(FAIR.total)} − ₹${inr(FAIR_STALL)} − ₹${inr(FAIR_TRAVEL)} = **₹${inr(FAIR_REST)}**. Setting out the planned spending in numbers is a **budget**.`, sol: 'Subtract the stall and travel shares from the total; a numerical plan is a budget.', scheme: [['Correct amount left', 1], ['Budget identified', 1]] }),
    ]),
  ],
}));
