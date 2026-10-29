// CBSE 12 Business Studies, ch08 Controlling — question bank. Every firm, person, scenario and figure is
// written by SOYL (imagined Indian businesses, labelled as such); no NCERT text, exercise or
// board/sample-paper item is reused (D-036). Every deviation figure is computed here and asserted.
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from './lib.mjs';

export const inr = (n) => Number(n).toLocaleString('en-IN');
/** Deviation of actual from standard, and that deviation as a percentage of the standard. */
export function dev(standard, actual) {
  const d = actual - standard;
  return { d, abs: Math.abs(d), pct: Math.round((Math.abs(d) / standard) * 10000) / 100 };
}

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// ---------------------------------------------------------------- computed figures
// n_output: an imagined shoe unit in Agra, standard 500 pairs a day, actual 460.
export const OUT = { std: 500, act: 460 };
export const OUT_D = dev(OUT.std, OUT.act);
assert.equal(OUT_D.abs, 40);
assert.equal(OUT_D.pct, 8);
// n_cost: an imagined pickle maker, standard cost ₹200 per jar, actual ₹212.
export const COST = { std: 200, act: 212 };
export const COST_D = dev(COST.std, COST.act);
assert.equal(COST_D.abs, 12);
assert.equal(COST_D.pct, 6);
// n_power: management by exception, electricity budget ₹80,000, actual ₹86,000, tolerance 5%.
export const POWER = { std: 80000, act: 86000, tol: 5 };
export const POWER_D = dev(POWER.std, POWER.act);
assert.equal(POWER_D.abs, 6000);
assert.equal(POWER_D.pct, 7.5);
// n_hours: labour hours, standard 1,200, actual 1,320.
export const HOURS = { std: 1200, act: 1320 };
export const HOURS_D = dev(HOURS.std, HOURS.act);
assert.equal(HOURS_D.pct, 10);
// cb_kesar (case): three departments of an imagined sweets maker, tolerance 4%.
export const KESAR = [
  { dept: 'Packing material (₹)', std: 50000, act: 51500 },
  { dept: 'Milk purchased (litres)', std: 20000, act: 21600 },
  { dept: 'Gas cylinders (number)', std: 400, act: 404 },
];
export const KESAR_TOL = 4;
export const KESAR_D = KESAR.map((r) => dev(r.std, r.act));
assert.deepEqual(KESAR_D.map((x) => x.pct), [3, 8, 1]);

// ================================================================ t01 Concept and importance of controlling
Q('m_meaning', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Controlling, as a function of management, means',
  opts: [
    'ensuring that activities in the organisation are performed as per the plans',
    'deciding in advance what is to be done and how',
    'filling and keeping filled the positions in the organisation structure',
    'guiding and motivating subordinates towards goals',
  ],
  sol: 'Controlling checks that work actually happens according to plan and corrects deviations. Deciding in advance is planning, filling positions is staffing, and guiding and motivating is directing.',
}));
Q('m_goal_oriented', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Controlling is called a **goal-oriented** function because it',
  opts: [
    'makes sure that resources are used to achieve the predetermined goals',
    'is performed only by top management',
    'is performed only once, at the end of the year',
    'replaces the need for planning',
  ],
  sol: 'Its whole purpose is to see that the organisation reaches the goals set in plans. It is done at every level, continuously, and it depends on planning rather than replacing it.',
}));
Q('m_pervasive', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'At Sitara Textiles (imagined), the chairperson reviews yearly profit, the plant manager reviews monthly output and a shift supervisor checks daily attendance. This shows that controlling is',
  opts: ['pervasive', 'a backward-looking function only', 'the primary function of management', 'needed only in large firms'],
  sol: 'Managers at all three levels perform controlling, each for their own area, so it is pervasive. Controlling also looks forward, planning (not controlling) is the primary function, and small firms need control too.',
}));
Q('m_both_looking', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'Why is controlling described as both a **backward-looking** and a **forward-looking** function?',
  opts: [
    'It checks performance that has already taken place and also uses the findings to improve future performance',
    'It looks only at past records and never affects future work',
    'It is performed before planning and again after directing',
    'It deals with past employees and future recruits',
  ],
  sol: 'Measuring what was done is backward-looking; the corrective action and better standards it leads to are forward-looking. It does not ignore the future, it does not come before planning, and it is not about recruitment.',
}));
Q('m_accuracy_std', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'For three months running, every salesperson at Vayu Coolers (imagined) beats the target by more than 40 per cent, even in a weak season. Management raises the targets. Which importance of controlling does this show?',
  opts: [
    'Judging the accuracy of standards',
    'Ensuring order and discipline',
    'Improving employee motivation',
    'Facilitating coordination in action',
  ],
  sol: 'Results far above the standard in a weak season suggest the standard was set too low; controlling reveals this and the standard is revised. Order and discipline, motivation and coordination are other benefits, but none of them is about revising targets.',
}));
Q('m_discipline', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'After daily stock checks began at a medicine warehouse in Lucknow (imagined), cases of missing strips stopped. Which importance of controlling is reflected?',
  opts: [
    'Ensuring order and discipline',
    'Judging the accuracy of standards',
    'Facilitating coordination in action',
    'Accomplishing organisational goals',
  ],
  sol: 'Close checks reduce dishonest behaviour and create discipline among employees. The other options are real benefits of controlling, but the case is about checking misconduct.',
}));
Q('m_motivation', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'How does a good control system improve **employee motivation**?',
  opts: [
    'Employees know in advance what is expected and on what basis their performance will be appraised',
    'Employees are punished for every small mistake',
    'Employees no longer need any supervision',
    'Employees are allowed to set their own standards without review',
  ],
  sol: 'Clear standards and a fair basis of appraisal motivate people to perform. Punishing every slip demotivates, supervision still exists, and standards are set by management and reviewed.',
}));
Q('m_coordination', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'Controlling **facilitates coordination** because',
  opts: [
    'each department works to predetermined standards that are well balanced with those of other departments',
    'it removes the need for departments to communicate',
    'it is carried out only by the coordination department',
    'it lets each department fix its own goals freely',
  ],
  sol: 'When every department has standards fitted to the others and is checked against them, their efforts move together. Communication is still needed, there is no separate coordination department, and free goal-setting would break coordination.',
}));
Q('m_lim_quant', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Sahyog Hospital (imagined) wants to control the "courtesy of nurses towards patients" but cannot express it in numbers. Which limitation of controlling is this?',
  opts: [
    'Difficulty in setting quantitative standards',
    'Little control on external factors',
    'Resistance from employees',
    'Costly affair',
  ],
  sol: 'Courtesy is a behaviour that is hard to measure, so performance cannot be compared against a numeric standard. The case has nothing to do with outside factors, employee opposition or cost.',
}));
Q('m_lim_external', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A sudden change in import duty raised the cost of steel for Lakshmi Fabricators (imagined), and nothing in its control system could prevent it. This shows that',
  opts: [
    'an organisation has little control on external factors',
    'controlling is a costly affair',
    'employees resist controls',
    'standards cannot be set in numbers',
  ],
  sol: 'Duties, technology, competition and policy are outside the firm; controlling cannot stop them. The case is not about cost, resistance or measurability.',
}));
Q('m_lim_resist', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Workers at a call centre in Mohali (imagined) protested when cameras were installed to monitor their breaks. Which limitation of controlling is shown?',
  opts: ['Resistance from employees', 'Costly affair', 'Little control on external factors', 'Difficulty in setting quantitative standards'],
  sol: 'Employees often see close monitoring as a restriction on their freedom and oppose it. The protest is about the control itself, not its cost, external factors or measurement.',
}));
Q('m_lim_cost', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'A small bakery in Shillong (imagined) was advised to buy software worth ₹4 lakh to track the weight of every loaf, though its yearly profit is about ₹3 lakh. The owner refused. Which limitation of controlling explains her decision?',
  opts: ['Controlling is a costly affair', 'Resistance from employees', 'Little control on external factors', 'Controlling is a primary function'],
  sol: 'Control involves expense, time and effort; a small firm must check that the benefit is worth the cost. Here the system would cost more than a year\'s profit. "Primary function" describes planning and is not a limitation.',
}));
Q('m_plan_control', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which statement best describes the relationship between **planning** and **controlling**?',
  opts: [
    'Planning without controlling is meaningless, and controlling without planning is blind',
    'Controlling must be completed before planning begins',
    'Planning and controlling are unrelated functions',
    'Once a plan is made, controlling is not required',
  ],
  sol: 'Plans give the standards that controlling uses, and controlling tells whether plans are being achieved, so each depends on the other. The other statements deny this link or reverse the order.',
}));
Q('m_feedback', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Controlling findings at Tarang Paints (imagined) showed that the sales targets for the hills were unrealistic, so next year\'s plan set lower targets there. This shows that',
  opts: [
    'controlling provides information that helps in better planning',
    'controlling is only a backward-looking function',
    'planning is a backward-looking function',
    'controlling makes planning unnecessary',
  ],
  sol: 'Information from control is fed back into the next plan, which shows the two functions are linked and that controlling looks forward too. Planning still remains necessary.',
}));
Q('ar_goals', ar({
  t: 1, d: 2, c: 'analysis', key: 'a',
  a: 'Controlling helps an organisation accomplish its goals.',
  r: 'Controlling measures progress towards goals and brings to light deviations so that corrective action can be taken.',
  sol: 'Both are true, and R explains A: by spotting deviations early and correcting them, controlling keeps the organisation on course to its goals.',
}));
Q('ar_backward', ar({
  t: 1, d: 3, c: 'analysis', key: 'c',
  a: 'Controlling is a backward-looking as well as a forward-looking function.',
  r: 'Controlling is performed only after all activities of the year are over.',
  sol: 'A is true. R is false: controlling is a continuous function carried out throughout the year, not only at its end.',
}));
Q('ar_quant', ar({
  t: 1, d: 3, c: 'analysis', key: 'b',
  a: 'It is difficult to control the job satisfaction of employees precisely.',
  r: 'Controlling cannot influence factors such as government policy and changes in technology.',
  sol: 'Both are true, but R does not explain A. A is about the difficulty of measuring qualitative factors; R is about external factors, a different limitation.',
}));
Q('ar_resources', ar({
  t: 1, d: 2, c: 'analysis', key: 'a',
  a: 'A good control system helps in the efficient use of resources.',
  r: 'Under control, each activity is performed according to predetermined standards, which reduces waste and spoilage.',
  sol: 'Both are true, and R explains A: working to standards means materials, money and time are not wasted.',
}));
Q('tf_pervasive', tf({
  t: 1, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? Controlling is needed only in large business organisations, not in schools, hospitals or small shops.',
  sol: 'Controlling is pervasive: every organisation, large or small, business or non-business, needs to check that work goes according to plan.',
}));
Q('tf_continuous', tf({
  t: 1, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Controlling is a continuous process: setting standards, measuring, comparing and correcting go on throughout the life of an organisation.',
  sol: 'Control is not a one-time check; managers keep reviewing performance against standards as work goes on.',
}));
Q('fb_blind', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'Planning without controlling is meaningless, and controlling without planning is ___.',
  acc: [['blind']],
  sol: 'Controlling without planning is blind, because there would be no standards to check against.',
}));
Q('mt_importance', match({
  t: 1, d: 3, c: 'application',
  stem: 'Match each situation at the imagined Ganga Dairy cooperative with the importance of controlling it shows.',
  pairs: [
    ['Milk spoilage fell after chilling temperatures were checked twice a day', 'Efficient use of resources'],
    ['Collection centres knew their daily targets, so drivers and chilling plants worked in step', 'Facilitating coordination in action'],
    ['A target that no centre could ever meet was lowered after review', 'Judging accuracy of standards'],
    ['Staff knew how their work would be appraised and worked harder', 'Improving employee motivation'],
  ],
  sol: 'Less spoilage means less waste of milk; balanced targets keep departments in step; reviewing an impossible target tests the standard; a clear basis of appraisal motivates staff.',
}));
Q('s_meaning_features', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State the meaning of controlling and give any two of its features.',
  model: '**Controlling** is the function of seeing that **actual performance conforms to the plan** and correcting it where it does not.\n**Features:** (1) it is **goal-oriented**; (2) it is **pervasive**, done by managers at all levels in every organisation. (Also: continuous; backward- and forward-looking.)',
  sol: 'One mark for the meaning, one for two correct features.',
  scheme: [['Meaning of controlling', 1], ['Any two features', 1]],
}));
Q('s_plan_control_rel', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'How are planning and controlling inseparable? Explain in two points.',
  model: '1. **Planning gives the standards:** without a plan, control has nothing to measure against.\n2. **Controlling checks the plan:** without control, managers cannot know whether the plan is working, and its findings help improve the next plan.',
  sol: 'Show the dependence in both directions.',
  scheme: [['Planning is the base of controlling', 1], ['Controlling evaluates and improves planning', 1]],
}));
Q('s_lim_two', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain any two limitations of controlling.',
  model: '1. **Difficulty in setting quantitative standards:** behaviour, morale and job satisfaction are hard to express in numbers, so control over them is weak.\n2. **Costly affair:** control systems need money, time and effort; for a small firm the cost may be more than the benefit.',
  sol: 'Any two limitations, each with a brief explanation.',
  scheme: [['First limitation explained', 1], ['Second limitation explained', 1]],
}));
Q('s_backward_forward', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'With an example of an imagined coaching institute, show how controlling is both backward-looking and forward-looking.',
  model: 'At an imagined coaching institute in Kota, the director compares last term\'s test results of each batch with the target (**backward-looking**). Finding one batch weak in physics, she plans extra classes and a new teacher for next term (**forward-looking**).',
  sol: 'An example that looks at past results and then improves the future.',
  scheme: [['Backward-looking part of the example', 1], ['Forward-looking part of the example', 1]],
}));
Q('s3_importance_three', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain any three points of importance of controlling for an organisation.',
  model: '1. **Accomplishing goals:** it keeps measuring progress and corrects deviations, so the organisation stays on course.\n2. **Efficient use of resources:** activities follow standards, which cuts waste and spoilage.\n3. **Order and discipline:** close checks reduce dishonest behaviour among employees. (Also: judging accuracy of standards, motivation, coordination.)',
  sol: 'Three distinct points, each explained in a line.',
  scheme: [['First point', 1], ['Second point', 1], ['Third point', 1]],
}));
Q('s3_limits_case', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Kiran runs a chain of 12 tea stalls in Pune (imagined). She wants to control the taste of tea, the friendliness of staff and the amount of milk used. Which of these will be easiest and which hardest to control? Give reasons and name the limitation involved.',
  model: '**Easiest:** the **amount of milk**, because it can be measured in litres per day and compared with a standard.\n**Hardest:** **friendliness of staff** (and, to some extent, taste), because they cannot be expressed in numbers.\n**Limitation:** **difficulty in setting quantitative standards**, so control over such qualities depends on judgement and customer feedback.',
  sol: 'Classify by measurability and name the limitation.',
  scheme: [['Easiest item with reason', 1], ['Hardest item with reason', 1], ['Limitation named', 1]],
}));
Q('l_importance', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'A good control system is said to be the key to a well-run organisation. Explain any five points of importance of controlling.',
  model: '1. **Accomplishing organisational goals:** progress is measured and deviations are corrected in time.\n2. **Judging accuracy of standards:** a careful review shows whether standards are too high or too low.\n3. **Efficient use of resources:** working to standards reduces waste of material, money and time.\n4. **Improving employee motivation:** people know what is expected and how they will be appraised.\n5. **Ensuring order and discipline:** close checks curb dishonest behaviour. (Also: facilitating coordination, since every department works to balanced standards.)',
  sol: 'Five distinct points, each with a heading and an explanation.',
  scheme: [['Point 1', 1], ['Point 2', 1], ['Point 3', 1], ['Point 4', 1], ['Point 5', 1]],
}));
Q('l_limitations_rel', long({
  t: 1, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: '"Controlling is necessary, but it cannot work miracles." Evaluate this statement by explaining the limitations of controlling and suggesting how a manager can reduce any one of them.',
  model: '1. **Quantitative standards are hard** for morale, behaviour or job satisfaction, so control over them is imprecise.\n2. **Little control on external factors** such as policy changes, technology or competition.\n3. **Resistance from employees**, who may see close checks as a restriction on their freedom.\n4. **Costly affair:** control needs money, time and effort, which a small firm may not afford.\n5. **Reducing one:** resistance can be reduced by **involving employees** in setting standards and explaining the purpose of controls. So controlling helps greatly, but within limits.',
  sol: 'Four limitations and one practical remedy, with a conclusion.',
  scheme: [['Limitation 1', 1], ['Limitation 2', 1], ['Limitation 3', 1], ['Limitation 4', 1], ['Suggestion with conclusion', 1]],
}));
Q('l_plan_control', long({
  t: 1, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain the relationship between planning and controlling. Is planning only forward-looking and controlling only backward-looking? Justify your answer.',
  model: '1. **Planning is the base of controlling:** it sets the goals and standards against which performance is measured.\n2. **Controlling makes plans effective:** it checks whether work goes as planned and corrects deviations.\n3. **They are inseparable:** planning without controlling is meaningless; controlling without planning is blind.\n4. **Planning also looks back:** plans are made using past experience and the results of earlier control.\n5. **Controlling also looks forward:** its corrective action and revised standards improve future performance. So the two are **forward- and backward-looking** together.',
  sol: 'Three points on the relationship and two on why the "one-way" view is wrong.',
  scheme: [['Planning as the base', 1], ['Controlling makes plans effective', 1], ['Inseparable', 1], ['Planning also backward-looking', 1], ['Controlling also forward-looking', 1]],
}));

// ================================================================ t02 Controlling process
Q('m_first_step', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'The first step in the controlling process is',
  opts: ['setting performance standards', 'measurement of actual performance', 'taking corrective action', 'analysing deviations'],
  sol: 'Standards must exist before anything can be measured or compared, so setting them comes first. Measuring, analysing deviations and correcting follow in that order.',
}));
Q('m_last_step', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Which is the **last** step of the controlling process?',
  opts: ['Taking corrective action', 'Comparing actual performance with standards', 'Setting performance standards', 'Measurement of actual performance'],
  sol: 'Control ends with action to remove the causes of deviation (or to revise the standard). The other steps come before it.',
}));
Q('m_standards_type', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: '"Improve customer goodwill in the coming year" and "produce 2,000 helmets a day" are examples of standards that are respectively',
  opts: ['qualitative and quantitative', 'quantitative and qualitative', 'both quantitative', 'both qualitative'],
  sol: 'Goodwill cannot be expressed in numbers, so it is a qualitative standard; 2,000 helmets a day is a number, so it is quantitative.',
}));
Q('m_flexible_std', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'Why should performance standards be set in **precise and flexible** terms?',
  opts: [
    'So that performance can be measured against them and they can be revised when conditions change',
    'So that employees cannot understand them',
    'So that they never need to be changed',
    'So that only top managers can use them',
  ],
  sol: 'Precise standards make measurement possible; flexibility allows changes when circumstances change. Standards must be understood by employees and are used at all levels.',
}));
Q('m_measure_method', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'A supervisor at Nirmal Soaps (imagined) picks 50 soap cakes from every batch and checks their weight. Which step of controlling, and which technique, is this?',
  opts: [
    'Measurement of actual performance, by sample checking',
    'Setting performance standards, by personal observation',
    'Taking corrective action, by sample checking',
    'Comparing performance, by a performance report',
  ],
  sol: 'Weighing some cakes measures what has actually been produced; checking a sample from each batch is the technique of sample checking. Standards are set earlier and correction comes later.',
}));
Q('m_compare', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Unity Courier (imagined) aims to deliver 98 per cent of parcels within 48 hours. In June, it delivered 93 per cent. Noting this gap is the step of',
  opts: [
    'comparing actual performance with standards',
    'setting performance standards',
    'taking corrective action',
    'measurement of actual performance',
  ],
  sol: 'Putting the actual figure (93) beside the standard (98) to find the gap is comparison. Setting the 98 per cent aim was the first step, measuring the 93 per cent was the second, and correction comes after analysis.',
}));
Q('m_cpc', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'At Prakash Auto Parts (imagined), a 2 per cent rise in the cost of steel affects profit far more than a 20 per cent rise in the cost of stationery. Management therefore watches steel cost closely. This is the principle of',
  opts: ['critical point control', 'management by exception', 'unity of command', 'scalar chain'],
  sol: 'Critical point control means focusing on key result areas that affect the whole organisation; steel is such an area. Management by exception is about reporting only significant deviations; unity of command and scalar chain are Fayol principles.',
}));
Q('m_mbe', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'The manager of Hira Garments (imagined) is informed only when daily output falls short of the target by more than 5 per cent; smaller gaps are handled by supervisors. This is',
  opts: ['management by exception', 'critical point control', 'functional foremanship', 'decentralisation of control standards'],
  sol: 'Only significant deviations beyond a permissible limit are brought to the manager\'s attention, which is management by exception. Critical point control is about which areas matter most, not about the size of the gap.',
}));
Q('m_mbe_benefit', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'Which is a benefit of **management by exception**?',
  opts: [
    'It saves the time and effort of managers, who deal only with significant deviations',
    'It ensures that every small deviation is reported to the managing director',
    'It removes the need for setting standards',
    'It makes corrective action unnecessary',
  ],
  sol: 'By filtering out minor deviations, managers can concentrate on important problems. Reporting everything is the opposite of the principle, and standards and correction are still needed.',
}));
Q('m_corrective', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Output at a printing press in Sivakasi (imagined) fell short because the machines were old. The **appropriate corrective action** is to',
  opts: [
    'repair or replace the machines',
    'lower the output standard permanently without any review',
    'hire more salespeople',
    'reduce the price of printed goods',
  ],
  sol: 'Corrective action must address the cause of deviation: here, defective machinery. Lowering the standard ignores the cause, and more salespeople or lower prices do not fix production.',
}));
Q('m_cause_wage', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Sales at Mitra Electronics (imagined) fell below target because a rival cut prices sharply. During **analysing deviations**, the manager should first',
  opts: [
    'identify the cause of the deviation, which here lies outside the firm',
    'punish the sales staff for the shortfall',
    'stop measuring sales for the year',
    'ignore the deviation, since it is not significant',
  ],
  sol: 'Analysis means finding why the deviation occurred; the cause here is external (competition), so blaming staff would be unfair. Measurement must continue, and a sharp fall in sales is significant.',
}));
Q('m_within_limit', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'If actual performance matches the standard or the deviation is within the permissible limit, the manager should',
  opts: [
    'take no corrective action and let the work continue',
    'change the whole plan immediately',
    'replace the employees concerned',
    'stop the measurement of performance',
  ],
  sol: 'Control acts only on deviations beyond acceptable limits; otherwise work continues as planned. The other actions are unnecessary.',
}));
Q('ar_mbe', ar({
  t: 2, d: 3, c: 'analysis', key: 'a',
  a: 'Under management by exception, minor deviations are not brought to the notice of top management.',
  r: 'Trying to control everything may end up in controlling nothing.',
  sol: 'Both are true, and R explains A: if managers chase every small deviation, they have no time for important ones, so only significant deviations are reported.',
}));
Q('ar_cpc', ar({
  t: 2, d: 3, c: 'analysis', key: 'd',
  a: 'Critical point control means that every activity of the organisation should be controlled with equal attention.',
  r: 'Key result areas are those that affect the working of the entire organisation.',
  sol: 'A is false: critical point control focuses attention on key result areas, not on every activity equally. R is true.',
}));
Q('ar_standards_first', ar({
  t: 2, d: 2, c: 'analysis', key: 'a',
  a: 'Setting performance standards is the first step of controlling.',
  r: 'Actual performance can be judged only against a predetermined criterion.',
  sol: 'Both are true, and R explains A: without a standard there is nothing to compare actual performance with.',
}));
Q('tf_measure_qual', tf({
  t: 2, d: 2, c: 'application', ans: false,
  stem: 'True or false? The performance of a hotel receptionist can be measured only in numbers, so customer feedback is useless for controlling.',
  sol: 'Many standards, such as courtesy, are qualitative; customer feedback, observation and ratings are useful ways to measure them.',
}));
Q('tf_revise_std', tf({
  t: 2, d: 3, c: 'understanding', ans: true,
  stem: 'True or false? Sometimes the corrective action is to revise the standard itself, if analysis shows it was unrealistic.',
  sol: 'When deviations persist because the standard was set too high or too low, the right step is to revise it.',
}));
Q('fb_cpc', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'Focusing control on key result areas that affect the entire organisation is known as ___ ___ control.',
  acc: [['critical'], ['point']],
  sol: 'This is critical point control.',
}));
Q('fb_measure', fb({
  t: 2, d: 2, c: 'recall',
  stem: 'Checking only a part of the output to judge the whole is the measurement technique called ___ checking.',
  acc: [['sample', 'sampling']],
  sol: 'It is sample checking: a few items are tested to judge a whole batch.',
}));
Q('ord_process', ord({
  t: 2, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange the steps of the controlling process followed at an imagined bicycle factory in Ludhiana in the correct order.',
  items: [
    'Fix the target of 300 bicycles a day',
    'Count the bicycles actually assembled each day',
    'Compare the daily count with 300',
    'Find out why output fell short on some days',
    'Repair the faulty conveyor belt and retrain new workers',
  ],
  sol: 'Setting standards, measuring, comparing, analysing deviations and taking corrective action, in that order.',
}));
Q('mt_steps', match({
  t: 2, d: 2, c: 'application',
  stem: 'Match each action at the imagined Sona Rice Mill with the step of the controlling process it belongs to.',
  pairs: [
    ['Deciding that broken grains must not exceed 3 per cent', 'Setting performance standards'],
    ['Testing samples from each day\'s output for broken grains', 'Measurement of actual performance'],
    ['Finding that the huller blades were worn out', 'Analysing deviations'],
    ['Replacing the huller blades', 'Taking corrective action'],
  ],
  sol: 'A limit on broken grains is a standard; testing samples measures performance; finding worn blades is the cause behind the deviation; replacing them is correction.',
}));
Q('n_output_pct', num({
  t: 2, d: 2, c: 'understanding', marks: 1, value: OUT_D.pct, unit: '%',
  stem: `An imagined shoe unit in Agra has a standard output of ${OUT.std} pairs a day. On Monday it produced ${OUT.act} pairs. Calculate the deviation as a percentage of the standard.`,
  sol: `Step 1: Deviation = ${OUT.std} − ${OUT.act} = ${OUT_D.abs} pairs.\nStep 2: Percentage deviation = ${OUT_D.abs} ÷ ${OUT.std} × 100 = ${OUT_D.pct}. So the deviation is ${OUT_D.pct}% of the standard.`,
}));
Q('n_cost_pct', num({
  t: 2, d: 2, c: 'application', marks: 1, value: COST_D.pct, unit: '%',
  stem: `An imagined pickle maker in Guntur set a standard cost of ₹${COST.std} per jar. The actual cost last month was ₹${COST.act} per jar. By what percentage did the actual cost exceed the standard?`,
  sol: `Step 1: Deviation = ${COST.act} − ${COST.std} = ₹${COST_D.abs} per jar.\nStep 2: ${COST_D.abs} ÷ ${COST.std} × 100 = ${COST_D.pct}. So the cost exceeded the standard by ${COST_D.pct}%.`,
}));
Q('n_power_mbe', num({
  t: 2, d: 3, c: 'application', marks: 2, value: POWER_D.pct, unit: '%',
  stem: `The electricity budget of an imagined cold-storage firm in Agra is ₹${inr(POWER.std)} a month; last month it spent ₹${inr(POWER.act)}. Under management by exception, only deviations above ${POWER.tol}% are reported to the general manager. Find the percentage deviation (the report decision follows from it).`,
  sol: `Step 1: Deviation = ${inr(POWER.act)} − ${inr(POWER.std)} = ₹${inr(POWER_D.abs)}.\nStep 2: ${inr(POWER_D.abs)} ÷ ${inr(POWER.std)} × 100 = ${POWER_D.pct}.\nStep 3: ${POWER_D.pct}% is more than the ${POWER.tol}% limit, so it must be reported to the general manager.`,
  scheme: [['Deviation and percentage worked out', 1], [`${POWER_D.pct}% and the decision to report`, 1]],
}));
Q('n_hours_pct', num({
  t: 2, d: 2, c: 'understanding', marks: 1, value: HOURS_D.pct, unit: '%',
  stem: `A furniture workshop in Saharanpur (imagined) allowed ${inr(HOURS.std)} labour hours for an order but used ${inr(HOURS.act)} hours. Calculate the excess hours as a percentage of the standard.`,
  sol: `Step 1: Excess = ${inr(HOURS.act)} − ${inr(HOURS.std)} = ${HOURS_D.abs} hours.\nStep 2: ${HOURS_D.abs} ÷ ${inr(HOURS.std)} × 100 = ${HOURS_D.pct}. So the excess is ${HOURS_D.pct}%.`,
}));
Q('s_cpc_mbe', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between critical point control and management by exception.',
  model: '**Critical point control** decides **which areas** to watch: the key result areas, such as raw-material cost or safety, that affect the whole organisation.\n**Management by exception** decides **which deviations** reach senior managers: only those beyond a permissible limit.',
  sol: 'One is about the areas to control, the other about the size of deviations to report.',
  scheme: [['Critical point control', 1], ['Management by exception', 1]],
}));
Q('s_measure', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain the second step of the controlling process and name two techniques used in it.',
  model: 'The second step is **measurement of actual performance**: performance is measured in the same units as the standard, objectively and reliably.\n**Techniques:** personal observation, sample checking, performance reports.',
  sol: 'Name and explain the step, then two techniques.',
  scheme: [['Step named and explained', 1], ['Two techniques', 1]],
}));
Q('s_corrective_examples', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Suggest a corrective action for each deviation at an imagined toy factory in Channapatna: (i) many toys fail quality checks because workers are new; (ii) output is low because the paint supply arrives late.',
  model: '(i) Arrange **training** for the new workers, with closer supervision for a few weeks.\n(ii) Improve **purchasing**: place orders earlier, keep a buffer stock of paint or add a second supplier.',
  sol: 'Each action must remove the cause given.',
  scheme: [['Action for (i)', 1], ['Action for (ii)', 1]],
}));
Q('s3_process_steps', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain the first three steps of the controlling process.',
  model: '1. **Setting performance standards:** targets in quantitative (units, cost, time) or qualitative (goodwill, morale) terms, precise and flexible.\n2. **Measuring actual performance** in the same units as the standards, by observation, sample checking or reports.\n3. **Comparing actual with standards** to find out whether, and by how much, performance deviates.',
  sol: 'Three steps in order, each explained.',
  scheme: [['Setting standards', 1], ['Measurement', 1], ['Comparison', 1]],
}));
Q('s3_analyse', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Why is it not enough to find that a deviation exists? Explain what a manager does while analysing deviations.',
  model: '1. A deviation shows only **that** something went wrong, not **why**; correction without the cause may fail.\n2. The manager uses **critical point control** to check whether the deviation is in a **key result area**, and **management by exception** to judge whether it is **beyond the permissible limit**.\n3. The manager then finds the **cause**, such as faulty machines, untrained workers, unrealistic standards or outside factors.',
  sol: 'Reason for analysis, the two principles, and identification of cause.',
  scheme: [['Why analysis is needed', 1], ['Use of CPC and MBE', 1], ['Finding the cause', 1]],
}));
Q('s3_mbe_numeric', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: `The production manager of an imagined fan maker allows a deviation of up to ${POWER.tol}%. Electricity cost was budgeted at ₹${inr(POWER.std)} and the actual cost was ₹${inr(POWER.act)}. Calculate the percentage deviation, state whether it should be reported, and name the principle used.`,
  model: `**Deviation:** the actual cost was ₹${inr(POWER.act)} against a budget of ₹${inr(POWER.std)}, an excess of ₹${inr(POWER_D.abs)}. As a share of the standard this is ${inr(POWER_D.abs)} ÷ ${inr(POWER.std)} × 100 = **${POWER_D.pct}%**.\n**Decision:** ${POWER_D.pct}% is more than the permissible ${POWER.tol}%, so the deviation is significant and **should be reported** to the production manager, who must find its cause and take corrective action.\n**Principle:** this is **management by exception**: smaller gaps within the limit are left to supervisors, so that the manager can concentrate on the deviations that really matter.`,
  sol: 'Compute the percentage, compare with the limit, name the principle.',
  scheme: [[`${POWER_D.pct}% worked out`, 1], ['Should be reported', 1], ['Management by exception', 1]],
}));
Q('l_process', long({
  t: 2, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the five steps of the controlling process.',
  model: '1. **Setting performance standards:** quantitative or qualitative targets, precise and flexible.\n2. **Measurement of actual performance:** in the same units as the standards, through observation, sample checks or reports.\n3. **Comparing actual performance with standards:** reveals the size of the deviation.\n4. **Analysing deviations:** using critical point control (key result areas) and management by exception (beyond permissible limits), and finding the cause.\n5. **Taking corrective action:** remove the cause, e.g. repair machines, retrain workers, or revise unrealistic standards; no action if within limits.',
  sol: 'Five steps in order, each explained.',
  scheme: [['Setting standards', 1], ['Measurement', 1], ['Comparison', 1], ['Analysing deviations', 1], ['Corrective action', 1]],
}));
Q('l_cpc_mbe', long({
  t: 2, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'A newly appointed manager of an imagined supermarket chain wants to check every item, every bill and every employee personally. Using the ideas of critical point control and management by exception, advise her on a better approach.',
  model: '1. **Problem:** checking everything wastes her time; "trying to control everything may end in controlling nothing".\n2. **Critical point control:** identify **key result areas**, such as stock losses, cash collection and fresh-food wastage, and watch them closely.\n3. **Management by exception:** fix **permissible limits**, e.g. stock loss up to 1 per cent, and ask supervisors to report only deviations beyond them.\n4. **Benefits:** saves her time, lets her focus on serious problems and speeds up action.\n5. **Delegation:** supervisors handle minor deviations, which also develops them.',
  sol: 'Diagnose the problem, apply both principles to the case, and show the benefits.',
  scheme: [['Problem diagnosed', 1], ['Critical point control applied', 1], ['Management by exception applied', 1], ['Benefits', 1], ['Role of supervisors', 1]],
}));
Q('l_corrective', long({
  t: 2, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'Corrective action depends on the cause of the deviation. Suggest a corrective action for each of five causes of deviation in an imagined garment export unit in Tiruppur.',
  model: '1. **Defective machinery:** sewing machines that break down often should be repaired or replaced, with a schedule of preventive maintenance.\n2. **Untrained workers:** new tailors who make stitching errors need training and closer supervision for some weeks.\n3. **Shortage of raw material:** late fabric supply can be prevented by ordering earlier, keeping a buffer stock and adding a second supplier.\n4. **Low morale:** absenteeism and slow work call for better incentives, recognition and prompt handling of grievances.\n5. **Unrealistic standards:** if no line can ever meet the target, the standard itself should be revised after a careful review.',
  sol: 'Five causes, each with a matching corrective action.',
  scheme: [['Cause and action 1', 1], ['Cause and action 2', 1], ['Cause and action 3', 1], ['Cause and action 4', 1], ['Cause and action 5', 1]],
}));

// ================================================================ case-based
Q('cb_kesar', caseQ({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Study the monthly control report of Kesar Sweets and answer the questions on analysing deviations that follow. *(Imagined firm and figures, written by SOYL for practice.)*',
  passage: `**Kesar Sweets, Bikaner (imagined): control report for October**\n\n| Item | Standard | Actual |\n|---|---|---|\n| ${KESAR[0].dept} | ${inr(KESAR[0].std)} | ${inr(KESAR[0].act)} |\n| ${KESAR[1].dept} | ${inr(KESAR[1].std)} | ${inr(KESAR[1].act)} |\n| ${KESAR[2].dept} | ${inr(KESAR[2].std)} | ${inr(KESAR[2].act)} |\n\nThe owner, Mr Joshi, has told his managers to report to him only those items where the actual differs from the standard by more than ${KESAR_TOL} per cent. He also says that milk is the one input that decides both the cost and the taste of every sweet.`,
  parts: [
    child('a', num({ t: 2, d: 2, c: 'application', marks: 1, value: KESAR_D[1].pct, unit: '%', stem: 'Calculate the percentage deviation for milk purchased.', sol: `Step 1: ${inr(KESAR[1].act)} − ${inr(KESAR[1].std)} = ${inr(KESAR_D[1].abs)} litres.\nStep 2: ${inr(KESAR_D[1].abs)} ÷ ${inr(KESAR[1].std)} × 100 = ${KESAR_D[1].pct}%.` })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which item(s) should be reported to Mr Joshi? Give a reason.', model: `Only **milk** (${KESAR_D[1].pct}%), because packing material (${KESAR_D[0].pct}%) and gas (${KESAR_D[2].pct}%) are within the ${KESAR_TOL}% limit.`, sol: 'Compare each percentage with the permissible limit.', scheme: [['Milk only, with the comparison', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify the two principles of analysing deviations followed by Mr Joshi, quoting the lines.', model: '1. **Management by exception:** "report to him only those items where the actual differs from the standard by more than 4 per cent".\n2. **Critical point control:** "milk is the one input that decides both the cost and the taste of every sweet" (a key result area).', sol: 'Name each principle with the matching line.', scheme: [['Management by exception with line', 1], ['Critical point control with line', 1]] }), [
      short({ t: 2, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Suggest the next two steps the managers should take about the milk deviation.', model: '1. **Find the cause:** check whether more milk was used because of wastage, spoilage, a change in recipe or higher festival sales.\n2. **Take corrective action** based on the cause, e.g. better storage to cut spoilage, or revising the standard if festival demand was higher.', sol: 'Analyse the cause, then correct it.', scheme: [['Find the cause', 1], ['Matching corrective action', 1]] }),
    ]),
  ],
}));
Q('cb_shanti', caseQ({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the passage about Shanti Water Purifiers and answer the questions on the steps of the controlling process that follow. *(Imagined company, written by SOYL for practice.)*',
  passage: '**Shanti Water Purifiers, Indore (imagined)**\n\nThe service manager, Neha, decided that every complaint must be attended within 24 hours. At the end of each week, she collected the job cards of all technicians and counted how many complaints had been attended late. In the third week, 30 complaints out of 200 were attended after 24 hours. On enquiry she found that two technicians had left and that spare parts were reaching the service centre late. She hired two technicians and arranged for spare parts to be kept at the centre.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Quote the line that shows the first step of the controlling process.', model: '"**...every complaint must be attended within 24 hours.**"', sol: 'A target to be met is a performance standard.', scheme: [['Correct line quoted', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which step of controlling is shown by counting the complaints attended late from the job cards?', model: '**Measurement of actual performance.**', sol: 'Counting what actually happened is measurement.', scheme: [['Measurement of actual performance', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify the last two steps of controlling followed by Neha, quoting the lines.', model: '1. **Analysing deviations:** "On enquiry she found that two technicians had left and that spare parts were reaching the service centre late."\n2. **Taking corrective action:** "She hired two technicians and arranged for spare parts to be kept at the centre."', sol: 'Finding causes, then removing them.', scheme: [['Analysing deviations with line', 1], ['Corrective action with line', 1]] }), [
      short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Calculate the percentage of complaints attended late in the third week, and name the step in which this figure is used.', model: 'Late complaints = 30 ÷ 200 × 100 = **15%**. The figure is used in **comparing actual performance with the standard** (all complaints within 24 hours).', sol: 'Compute the share, then link it to comparison.', scheme: [['15% worked out', 1], ['Comparison step named', 1]] }),
    ]),
  ],
}));
Q('cb_nayak', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the passage about Nayak Logistics and answer the questions on the importance of controlling that follow. *(Imagined company, written by SOYL for practice.)*',
  passage: '**Nayak Logistics, Nagpur (imagined)**\n\nAfter Nayak Logistics started a daily check of fuel used by each truck, diesel theft stopped and drivers became more careful. Each driver was told the fuel and time allowed for every route and how his bonus would depend on them, and many drivers began to beat their targets. Fuel bills fell by a tenth within a year. The checks also showed that the target for the hilly route to Chhindwara was impossible to meet, so it was revised.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which importance of controlling is shown by "diesel theft stopped"?', model: '**Ensuring order and discipline.**', sol: 'Close checks curb dishonest behaviour.', scheme: [['Order and discipline', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which importance of controlling is shown by the revision of the Chhindwara target?', model: '**Judging the accuracy of standards.**', sol: 'Control revealed that the standard was unrealistic.', scheme: [['Judging accuracy of standards', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify two other points of importance of controlling in the passage, quoting the lines.', model: '1. **Improving employee motivation:** "Each driver was told the fuel and time allowed... and how his bonus would depend on them".\n2. **Efficient use of resources:** "Fuel bills fell by a tenth within a year."', sol: 'Two more benefits with matching lines.', scheme: [['First importance with line', 1], ['Second importance with line', 1]] }), [
      short({ t: 1, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Some drivers may object to daily fuel checks. Name this limitation of controlling and suggest one way to reduce it.', model: '**Limitation:** **resistance from employees**, who may feel the checks show distrust. **Remedy:** explain the purpose and involve drivers in setting fair fuel standards, linking savings to their bonus.', sol: 'Name the limitation and give a workable remedy.', scheme: [['Resistance from employees', 1], ['Workable remedy', 1]] }),
    ]),
  ],
}));
Q('cb_aarohi', caseQ({
  t: [1, 2], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage about Aarohi Hotels and answer the questions on the limitations and process of controlling that follow. *(Imagined company, written by SOYL for practice.)*',
  passage: '**Aarohi Hotels, Udaipur (imagined)**\n\nAarohi Hotels wanted guests to feel "warmly welcomed", but the managers could not agree on how to measure warmth. When the hotel fitted electronic key cards to record when room-cleaning staff entered and left rooms, the staff complained that they were being spied upon. A consultant suggested a full guest-tracking software that would cost more than the hotel earned in a season. In the same year, a fall in tourist arrivals after heavy floods in the region cut occupancy far below the target.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Identify the limitation of controlling in the first line of the passage.', model: '**Difficulty in setting quantitative standards.**', sol: '"Warmth" cannot easily be measured in numbers.', scheme: [['Difficulty in setting quantitative standards', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which limitation of controlling is shown by the floods cutting occupancy?', model: '**Little control on external factors.**', sol: 'Floods and tourist arrivals are outside the hotel\'s control.', scheme: [['Little control on external factors', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify the other two limitations of controlling in the passage, quoting the lines.', model: '1. **Resistance from employees:** "the staff complained that they were being spied upon".\n2. **Costly affair:** "full guest-tracking software that would cost more than the hotel earned in a season".', sol: 'Two more limitations, each with its line.', scheme: [['Resistance with line', 1], ['Cost with line', 1]] }), [
      short({ t: 2, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): Suggest how Aarohi Hotels could still set and measure a standard for "warm welcome".', model: '1. Convert it into **measurable indicators**, such as average guest rating on a five-point card, or check-in time under ten minutes.\n2. **Measure** them through guest feedback forms and mystery-guest visits, and compare monthly with the target.', sol: 'Turn a qualitative aim into indicators and say how to measure them.', scheme: [['Measurable indicators', 1], ['Method of measurement', 1]] }),
    ]),
  ],
}));
Q('cb_vasant', caseQ({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the passage about Vasant Fertilisers and answer the questions on critical point control and corrective action that follow. *(Imagined company, written by SOYL for practice.)*',
  passage: '**Vasant Fertilisers, Kakinada (imagined)**\n\nThe general manager of Vasant Fertilisers watches two figures every morning: the ammonia leakage reading and the cost of natural gas, because either can affect the whole plant. He does not look at canteen or stationery bills, which are checked by the office supervisor. One morning the leakage reading was above the safe limit. Engineers traced the cause to a worn valve, which was replaced the same day, and all shift operators were given a refresher course on safety checks.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Name the technique of controlling shown by the general manager watching only the leakage reading and the gas cost.', model: '**Critical point control.**', sol: 'Key result areas that affect the whole plant are watched closely.', scheme: [['Critical point control', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Quote the line that shows the step "analysing deviations".', model: '"**Engineers traced the cause to a worn valve...**"', sol: 'Finding the cause belongs to analysis.', scheme: [['Correct line quoted', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify the two corrective actions taken and explain how each removes a cause of deviation.', model: '1. **Replacing the worn valve** removes the **mechanical** cause of the leak.\n2. **A refresher course for operators** removes a **human** cause by making sure safety checks are done properly.', sol: 'Two actions, each tied to a cause.', scheme: [['First action with cause', 1], ['Second action with cause', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Why does the general manager leave canteen and stationery bills to the office supervisor? Name the principle and give one benefit.', model: 'They are **not key result areas**, so watching them would waste his time; this follows **critical point control** (together with the idea that small matters are handled lower down). **Benefit:** he can concentrate on safety and gas cost, which decide the plant\'s results.', sol: 'Principle plus a benefit.', scheme: [['Principle named', 1], ['Benefit', 1]] }),
    ]),
  ],
}));
