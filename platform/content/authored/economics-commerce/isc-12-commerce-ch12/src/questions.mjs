// ISC 12 Commerce, ch12 Controlling and Coordination — question bank. Every firm, person and situation is imagined
// and written by SOYL and labelled as such; no ISC or CBSE textbook illustration or exercise and no CISCE specimen or
// board item is reused (D-036). Firms, places and set-ups differ from the CBSE 12 Business Studies chapters on
// controlling and on the nature of management (coordination).
import { Q, mcq, ar, tf, fb, match, short, long, caseQ, child } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 75];
const L5 = [100, 150];

// ================================================================ t01 Controlling: meaning, steps, importance
Q('m_ctrl_def', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'At Pennar Cement Works, an imagined plant in Nellore, managers check each day\'s output against the plan, find any gaps, trace their causes and put them right. This function of management is',
  opts: ['controlling', 'planning', 'staffing', 'organising'],
  sol: 'Checking that actual performance matches the plan and correcting gaps is controlling.',
}));
Q('m_step_first', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Kalinga Eye Hospital, an imagined hospital in Cuttack, wants to judge how well its cataract unit is doing. Before anything else, it must',
  opts: ['fix standards, such as the number of operations a day and the acceptable infection rate', 'take corrective action against the surgeons', 'compare this year\'s results with last year\'s', 'measure the unit\'s performance without any yardstick'],
  sol: 'Setting performance standards is the first step; without a yardstick, measuring and comparing mean nothing.',
}));
Q('m_step_measure', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Every evening the shift in-charge at Kakatiya Granite, an imagined quarry firm in Warangal, records the number of slabs polished by each machine. Which step of controlling is this?',
  opts: ['Measuring actual performance', 'Setting standards', 'Taking corrective action', 'Analysing deviations'],
  sol: 'Recording what has actually been done is measurement of actual performance.',
}));
Q('m_step_compare', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Netravati Cashew Exports, an imagined firm in Mangaluru, planned to pack 900 tins a day but packed 820 on Monday. Working out that it fell 80 tins short of plan is the step of',
  opts: ['comparing actual performance with the standard', 'setting performance standards', 'taking corrective action', 'revising the firm\'s objectives'],
  sol: 'Placing actual output beside the standard to find the gap (the deviation) is comparison.',
}));
Q('m_step_analyse', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The manager of Netravati Cashew Exports (imagined) then found that the shortfall arose because the roasting drum broke down for two hours on Monday morning. Which step of controlling is she performing?',
  opts: ['Analysing deviations to find their causes', 'Measuring actual performance', 'Setting standards', 'Comparing output with last year'],
  sol: 'Finding out why the gap occurred is analysing deviations; the right correction depends on the cause.',
}));
Q('m_step_corrective', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'At Siddheshwar Terry Towels, an imagined mill in Solapur, analysis showed that towels were being rejected because new weavers did not know how to set loom tension. The manager arranged a two-day training. This is the step of',
  opts: ['taking corrective action', 'analysing deviations', 'measuring performance', 'setting standards'],
  sol: 'Acting on the cause (here, lack of skill) so that the deviation does not recur is corrective action, the last step.',
}));
Q('m_step_order', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'In the controlling process at an imagined bus-body works, which step comes immediately after measuring the actual performance of the welding line?',
  opts: ['Comparing it with the standard', 'Setting the standard', 'Taking corrective action', 'Revising the plan'],
  sol: 'The order is: set standards, measure, compare, analyse deviations, correct. Comparison follows measurement.',
}));
Q('m_standard_type', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Hoysala Coffee Curers, an imagined firm in Hassan, sets four standards. Which one is a **qualitative** standard?',
  opts: ['Courteous handling of every grower\'s complaint', 'Curing four tonnes of beans a day', 'Keeping moisture below eleven per cent', 'Keeping the curing cost within the budget'],
  sol: 'Courtesy cannot easily be counted, so it is qualitative; output, moisture and cost are quantitative standards.',
}));
Q('m_importance_resources', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'After Bhavani Turmeric Traders, an imagined firm in Erode, began weighing turmeric at every stage of boiling, drying and polishing, wastage fell sharply. Which importance of controlling does this show?',
  opts: ['Efficient use of resources', 'Judging the accuracy of standards', 'Improving employee motivation', 'Facilitating coordination'],
  sol: 'Checking each stage against standards reduces waste, so resources are used efficiently.',
}));
Q('m_importance_discipline', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'When Palar Leather Tanners, an imagined tannery in Vellore, began checking each worker\'s time card and output against standards, late arrivals and idle time dropped. Which importance of controlling is shown?',
  opts: ['Ensuring order and discipline', 'Judging the accuracy of standards', 'Efficient use of money only', 'Making planning unnecessary'],
  sol: 'Regular checking keeps people within set rules and standards, which builds order and discipline.',
}));
Q('m_importance_standards', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'Kaveri Delta Rice Mill, an imagined mill in Thanjavur, found that its standard of milling 50 tonnes a day was never reached even by its best shift with every machine running well. It lowered the standard. Which importance of controlling does this show?',
  opts: ['It helps judge whether standards are realistic', 'It ensures order and discipline', 'It improves motivation through bonuses', 'It removes the need for planning'],
  sol: 'Repeated deviations with no fault in the work suggest the standard itself was unrealistic; controlling helps test the accuracy of standards.',
}));
Q('m_deviation_calc', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Tala Nagri Locks, an imagined lock maker in Aligarh, has a standard of 2,000 locks a day. On Tuesday it made 1,880 locks. The deviation, as a percentage of the standard, is',
  opts: ['6 per cent below standard', '12 per cent below standard', '6 per cent above standard', '1.2 per cent below standard'],
  sol: 'The shortfall is 120 locks. Dividing 120 by 2,000 and multiplying by 100 gives 6, so output was 6 per cent below the standard.',
}));
Q('ar_ctrl_cont', ar({
  t: 1, d: 3, c: 'understanding',
  a: 'Controlling is a continuous activity.',
  r: 'A manager needs to check work only once, at the end of a project.',
  key: 'c',
  sol: 'The assertion is true: standards, measurement and correction go on all the time. The reason is false: waiting until the end would leave no chance to correct mistakes in time.',
}));
Q('ar_ctrl_motiv', ar({
  t: 1, d: 3, c: 'analysis',
  a: 'A good control system can improve employee motivation.',
  r: 'Controlling involves comparing actual performance with standards.',
  key: 'b',
  sol: 'Both are true, but comparison alone does not explain motivation. Motivation improves because employees know in advance how they will be judged and rewarded.',
}));
Q('tf_ctrl_first', tf({
  t: 1, d: 1, c: 'recall',
  stem: 'Taking corrective action is the first step in the controlling process.',
  ans: false,
  sol: 'False. Setting standards is the first step; corrective action is the last.',
}));
Q('tf_ctrl_compare', tf({
  t: 1, d: 1, c: 'understanding',
  stem: 'In the controlling process, a manager can compare performance with the standard only after that performance has been measured.',
  ans: true,
  sol: 'True. Measurement supplies the actual figures that are then compared with the standard.',
}));
Q('fb_ctrl_analyse', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Finding out why actual performance differs from the standard is the step of ___ deviations.',
  acc: [['analysing', 'analyzing', 'analysis of']],
  sol: 'This is the step of analysing deviations.',
}));
Q('fb_ctrl_analogy', fb({
  t: 1, d: 3, c: 'analysis',
  stem: 'Complete the analogy. Setting performance standards : First step of controlling :: Taking corrective action : ___',
  acc: [['Last step', 'last step of controlling', 'final step', 'fifth step']],
  sol: 'Setting standards opens the process; taking corrective action is the last step (the fifth).',
}));
Q('mt_steps', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each action at Kranti Sports Gear, an imagined cricket-bat maker in Meerut, with the step of controlling it belongs to.',
  pairs: [
    ['Deciding that each craftsman should finish 12 bats a day', 'Setting standards'],
    ['Counting the bats each craftsman actually finished', 'Measuring actual performance'],
    ['Finding that a willow delivery arrived late', 'Analysing deviations'],
    ['Signing a second willow supplier as a back-up', 'Taking corrective action'],
  ],
  sol: 'A target is a standard; counting output is measurement; finding the late delivery is analysing the cause; a back-up supplier corrects it.',
}));
Q('s_ctrl_meaning', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'What is controlling? State one reason why Kalinga Eye Hospital (imagined), Cuttack, needs it in its operation theatres.',
  model: '**Controlling** means **checking actual performance against set standards** and **correcting** any deviation. The hospital needs it to make sure that **hygiene and safety standards** are met in every operation, because a small lapse can harm a patient.',
  sol: 'Meaning plus one relevant reason linked to the hospital.',
  scheme: [['Meaning', 1], ['Reason linked to the case', 1]],
}));
Q('s_ctrl_importance2', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Explain how controlling helps Siddheshwar Terry Towels (imagined), Solapur, (i) to use its resources efficiently and (ii) to keep its weavers motivated.',
  model: '(i) **Efficient use of resources:** checking **yarn use and rejections** against standards cuts waste of material and machine time.\n(ii) **Motivation:** weavers **know the standards** on which they are judged, and those who meet them can be **fairly rewarded**.',
  sol: 'Each importance explained with the mill.',
  scheme: [['(i) Resources', 1], ['(ii) Motivation', 1]],
}));
Q('s_steps_first2', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Explain the first two steps of controlling with an example from Konkan Mango Packers, an imagined packing house in Ratnagiri.',
  model: '1. **Setting standards:** the firm fixes targets such as **packing 500 boxes a day** with no bruised fruit.\n2. **Measuring actual performance:** supervisors **count boxes packed** and **check samples** for bruising at the end of each day.',
  sol: 'Both steps explained in order with examples.',
  scheme: [['Setting standards with example', 1], ['Measuring performance with example', 1]],
}));
Q('s_ctrl_standards', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between quantitative and qualitative standards, giving one example of each from an imagined lakeside hotel.',
  model: '**Quantitative standards** are expressed in **numbers**, such as rooms cleaned per housekeeper per shift. **Qualitative standards** describe things that are **hard to count**, such as the **warmth of welcome** at the front desk.',
  sol: 'Each kind defined with a hotel example.',
  scheme: [['Quantitative with example', 1], ['Qualitative with example', 1]],
}));
Q('s3_steps_last3', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Betwa Bus Body Works, an imagined firm in Jhansi, planned to finish 10 bus bodies a week but finished only 7. Explain the last three steps of controlling it should now follow, applied to this shortfall.',
  model: '1. **Comparing with the standard:** the firm notes a **deviation of three bodies** a week and checks whether it is beyond the allowed limit.\n2. **Analysing deviations:** it finds the **cause**, for example late steel deliveries or too few welders.\n3. **Taking corrective action:** it acts on that cause, such as **adding a second steel supplier** or **hiring welders**, or revising the standard if it was unrealistic.',
  sol: 'Comparison, analysis and correction, each applied to the shortfall.',
  scheme: [['Comparing', 1], ['Analysing deviations', 1], ['Corrective action', 1]],
}));
Q('s3_importance3', short({
  t: 1, d: 2, c: 'application', marks: 3, wl: S3,
  stem: 'Brahmani Courier Services, an imagined courier firm in Rourkela, checks daily how many parcels each rider delivers on time. Explain three ways in which this control helps the firm.',
  model: '1. **Accomplishing goals:** daily checks show whether the firm is on track for its **on-time delivery target** and allow quick correction.\n2. **Order and discipline:** riders know their **performance is recorded**, so delays and careless handling drop.\n3. **Coordination:** delivery data helps **link sorting, dispatch and riders**, since every team works to the same standards.',
  sol: 'Any three points of importance (goals, accuracy of standards, resources, motivation, discipline, coordination) applied to the courier firm.',
  scheme: [['First point', 1], ['Second point', 1], ['Third point', 1]],
}));
Q('s3_analyse', short({
  t: 1, d: 4, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Crushing at Rapti Sugar Mill, an imagined mill in Gorakhpur, fell 15 per cent short of standard last week. The general manager wants to fine the crushing staff at once. Evaluate this decision, explaining what should be done first and why.',
  model: '1. **The decision is hasty:** a deviation shows only that a gap exists, **not who or what caused it**.\n2. **Analyse first:** the manager should check causes such as **cane shortage, boiler breakdown** or untrained staff, and see if the gap is within limits.\n3. **Act on the cause:** fining staff for a **breakdown or late cane** would be unfair and would not fix the problem; the correction must **match the cause**.',
  sol: 'Judges the decision, explains analysing deviations and links action to cause.',
  scheme: [['Judgement with reason', 1], ['Analysis of causes', 1], ['Correction matched to cause', 1]],
}));
Q('l_ctrl_steps', long({
  t: 1, d: 3, c: 'application', marks: 5, wl: L5,
  stem: '(a) Define controlling. [1]\n(b) Dalma Auto Components, an imagined firm in Jamshedpur, makes brake drums. Explain the steps of the controlling process it should follow, with an example of each from its plant. [4]',
  model: '(a) **Controlling** is the management function of **comparing actual performance with planned standards** and **taking action** to correct any deviation.\n\n(b) 1. **Set standards:** for example **800 drums a shift** with no more than two rejects.\n2. **Measure actual performance:** count drums made and **test samples** for cracks at the end of each shift.\n3. **Compare and find deviations:** a shift that made 740 drums shows a **shortfall of 60**.\n4. **Analyse deviations and correct:** if the cause is a **worn casting mould**, replace it and plan regular maintenance; if the standard was unrealistic, revise it.',
  sol: 'Definition; the steps in order with plant examples.',
  scheme: [['(a) Definition', 1], ['(b) Steps with examples', 4]],
}));
Q('l_ctrl_importance', long({
  t: 1, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'Shivalik Herbal Remedies, an imagined maker of herbal syrups in Haridwar, has no system for checking output, costs or quality, and its owner says controlling is "a waste of time". Explain five points of importance of controlling to convince him.',
  model: '1. **Accomplishing goals:** checks show whether **monthly sales and output targets** are being met, so problems are fixed early.\n2. **Judging accuracy of standards:** results reveal whether targets are **too easy or too hard**, so they can be revised.\n3. **Efficient use of resources:** comparing herb use and costs with standards **cuts waste** of costly ingredients.\n4. **Improving motivation:** workers know the **standards they are judged on**, and good performers can be rewarded.\n5. **Order, discipline and coordination:** regular checking reduces carelessness and keeps **purchase, production and sales** working to common standards.',
  sol: 'Five points of importance, each applied to the syrup maker.',
  scheme: [['Five points, one mark each', 5]],
}));

// ================================================================ t02 Planning and controlling; management by exception
Q('m_plan_ctrl', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Vishwamitri Pharma Labs, an imagined drug maker in Vadodara, set a target of no more than one rejected tablet in a thousand, tracked rejections every day, and used the results to set next year\'s target. This shows that',
  opts: ['planning sets the standards for controlling, and controlling feeds back into planning', 'controlling can work without any plan', 'planning is only backward-looking', 'controlling replaces planning'],
  sol: 'The target (planning) gave the yardstick for daily checks (controlling), and the results helped make the next plan: the two depend on each other.',
}));
Q('m_plan_without', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The new owner of Pushkar Rose Water, an imagined firm in Ajmer, tells his supervisors to "control the work", but no targets for output, cost or quality have ever been fixed. Why will controlling fail here?',
  opts: ['There are no standards against which to compare performance', 'Supervisors cannot measure output', 'Controlling is needed only in large firms', 'Rose water cannot be checked for quality'],
  sol: 'Controlling compares actual work with planned standards; without planning there is nothing to compare against.',
}));
Q('m_mbe_def', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Under management by exception, the managing director of Bhujodi Weavers Collective, an imagined society in Bhuj, will receive reports only on',
  opts: ['significant deviations that go beyond the permitted limits', 'every deviation, however small', 'activities that went exactly to plan', 'complaints from customers'],
  sol: 'Management by exception sends only significant deviations, beyond set limits, to top management; minor ones are handled lower down.',
}));
Q('m_mbe_case', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'The finance head of Siddheshwar Terry Towels (imagined) allows a gap of 3 per cent either way in the monthly power bill. In August the bill was 1 per cent over budget; in September it was 8 per cent over. Under management by exception,',
  opts: ['only the September deviation is reported to top management', 'both deviations are reported to top management', 'neither deviation is reported', 'only the August deviation is reported'],
  sol: 'August is within the 3 per cent limit and is handled at a lower level; September is beyond the limit, so it goes to top management.',
}));
Q('m_mbe_benefit', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which of the following is a benefit of management by exception for the busy top managers of Teesta Cardamom Growers, an imagined company in Gangtok?',
  opts: ['It saves their time for the few problems that really need their attention', 'It requires them to check every small figure personally', 'It removes the need for setting standards', 'It ensures that no deviation ever occurs'],
  sol: 'By filtering out minor deviations, it frees top managers to focus on important issues.',
}));
Q('m_mbe_delegation', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'At Tripura Bamboo Blinds, an imagined firm in Agartala, section heads settle all deviations within the set limits themselves, and only larger ones go to the owner. How does management by exception help the firm here?',
  opts: ['It encourages delegation, because lower managers handle routine deviations', 'It increases the burden on the owner', 'It makes the section heads report every figure', 'It stops the owner from setting standards'],
  sol: 'Routine deviations stay with lower managers, who gain authority and experience; this encourages delegation.',
}));
Q('ar_plan_ctrl', ar({
  t: 2, d: 3, c: 'understanding',
  a: 'Planning and controlling are inseparable functions of management.',
  r: 'Planning provides the standards against which controlling measures performance, and controlling shows how well the plans are working.',
  key: 'a',
  sol: 'Both are true, and the reason explains the assertion: each function needs the other to be meaningful.',
}));
Q('ar_mbe', ar({
  t: 2, d: 3, c: 'analysis',
  a: 'Management by exception saves the time and effort of top managers.',
  r: 'Under management by exception, every deviation, however small, is reported to top management.',
  key: 'c',
  sol: 'The assertion is true. The reason is false: only significant deviations beyond set limits are reported upward, which is exactly why time is saved.',
}));
Q('tf_mbe', tf({
  t: 2, d: 1, c: 'understanding',
  stem: 'Management by exception requires top managers to examine every minor deviation personally.',
  ans: false,
  sol: 'False. Minor deviations within limits are handled at lower levels; only significant ones reach top managers.',
}));
Q('fb_mbe', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'The control principle that only significant deviations, beyond set limits, should be brought to the notice of top management is called management by ___.',
  acc: [['exception']],
  sol: 'It is called management by exception.',
}));
Q('s_plan_ctrl', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Theyyam Handloom Cooperative, an imagined society in Kannur, plans to weave 600 sarees a month. Using this example, show in two points that planning and controlling depend on each other.',
  model: '1. **Planning gives controlling its yardstick:** the target of **600 sarees** is the standard against which monthly output is checked.\n2. **Controlling improves planning:** if output stays near **500** for good reasons, the cooperative **revises next month\'s plan**.',
  sol: 'Two-way link shown with the saree example.',
  scheme: [['Planning sets standards', 1], ['Controlling feeds back to planning', 1]],
}));
Q('s_mbe', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is management by exception? State one benefit of it to a large organisation.',
  model: '**Management by exception** is the principle that only **significant deviations beyond pre-set limits** are reported to top management; small ones are dealt with lower down. **Benefit:** it **saves top managers\' time** for important problems.',
  sol: 'Meaning plus one benefit (saves time, focus, delegation, timely action, better use of talent).',
  scheme: [['Meaning', 1], ['Benefit', 1]],
}));
Q('s3_mbe_benefits', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'The general manager of Damodar Coal Washeries, an imagined firm in Dhanbad, receives a daily report of over two hundred figures and has no time left for planning. Explain three benefits he would gain from management by exception.',
  model: '1. **Saves time and effort:** he sees only the **few figures that cross the limits**, not two hundred.\n2. **Focus on critical problems:** his attention goes to **major issues**, such as a sharp rise in coal loss, and he has time to plan.\n3. **Encourages delegation:** shift managers **handle routine deviations** themselves, which builds their skill and confidence.',
  sol: 'Three benefits applied to the general manager.',
  scheme: [['First benefit', 1], ['Second benefit', 1], ['Third benefit', 1]],
}));
Q('s3_ctrl_to_plan', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Planning is often called looking ahead and controlling looking back. Using an imagined mango packing house, explain why each of them in fact looks both ways.',
  model: '1. **Planning looks back too:** next season\'s targets are set using **last season\'s results** from control reports.\n2. **Controlling looks back:** it checks **work already done**, such as boxes packed against the target.\n3. **Controlling looks ahead:** it **corrects causes** so that future packing improves, and its findings guide **future plans**.',
  sol: 'Shows both functions as backward- and forward-looking with the example.',
  scheme: [['Planning looks back', 1], ['Controlling looks back', 1], ['Controlling looks ahead', 1]],
}));
Q('l_mbe', long({
  t: [2, 1], d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'Kshipra Incense Works, an imagined maker of incense sticks in Ujjain, fixes monthly targets for output and cost, and allows a 4 per cent margin either way.\n(a) Explain two points to show the relationship between planning and controlling at the firm. [2]\n(b) Explain management by exception as it would work at the firm, and state two of its benefits. [3]',
  model: '(a) 1. **Planning sets the standards:** the **monthly output and cost targets** are the yardsticks used in control.\n2. **Controlling feeds back:** if costs keep rising for genuine reasons, control reports lead to **revised plans** for the next month.\n\n(b) Under **management by exception**, deviations **within 4 per cent** of target are handled by section heads; only those **beyond 4 per cent** go to the owner. For example, a 2 per cent rise in cost stays with the section, while a 9 per cent rise is reported.\n**Benefits:** it **saves the owner\'s time** for serious problems, and it **encourages delegation**, because section heads handle routine gaps.',
  sol: 'Two-way relationship; MBE explained with the margin; two benefits.',
  scheme: [['(a) Two points of relationship', 2], ['(b) MBE explained with the case', 1], ['(b) Two benefits', 2]],
}));

// ================================================================ t03 Coordination
Q('m_coord_def', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'The administrator of Kalinga Eye Hospital (imagined) makes sure that the surgery, nursing, pharmacy and billing teams work in step, so that each patient moves smoothly from admission to discharge. This is',
  opts: ['coordination', 'controlling', 'staffing', 'recruitment'],
  sol: 'Harmonising the efforts of different teams so that they act as one towards a common goal is coordination.',
}));
Q('m_coord_essence', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'The managing director of Kranti Sports Gear (imagined) notices that she must harmonise people\'s efforts while making plans, building departments, hiring staff, guiding workers and checking results. This supports the view that coordination is',
  opts: ['the essence of management, running through every function', 'a separate sixth function done after controlling', 'needed only while staffing', 'the job of the personnel department alone'],
  sol: 'Because coordination is needed in planning, organising, staffing, directing and controlling alike, it is called the essence of management.',
}));
Q('m_coord_levels', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'At Barak Valley Tea Estate, an imagined estate near Silchar, the owner aligns the yearly plans of the garden and the factory, the garden manager aligns the plucking gangs, and a supervisor aligns the pluckers in one section. This shows that coordination is',
  opts: ['the responsibility of managers at every level', 'done only by the owner', 'needed only in the factory', 'a one-time activity'],
  sol: 'Top, middle and lower managers each coordinate within their own area: coordination is the responsibility of all managers.',
}));
Q('m_coord_continuous', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Tripura Bamboo Blinds (imagined) coordinated its departments well during last year\'s product launch, so the owner thinks no further coordination is needed. He forgets that coordination is',
  opts: ['a continuous process', 'only needed in large firms', 'the same as cooperation', 'performed by workers alone'],
  sol: 'Coordination must go on all the time, because people, tasks and conditions keep changing.',
}));
Q('m_coord_deliberate', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'The design and sales teams of an imagined blind maker get along well and are always willing to help each other, yet they keep launching colours that buyers never asked for. What is missing?',
  opts: ['Deliberate coordination by managers; willingness to cooperate is not enough', 'Cooperation between the teams', 'Enough staff in the design team', 'A narrow span of control'],
  sol: 'Cooperation is voluntary willingness to help; coordination is the conscious effort of managers to link activities towards a common goal. The teams have the first but lack the second.',
}));
Q('m_coord_cooperation', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which statement correctly distinguishes coordination from cooperation in a firm?',
  opts: ['Coordination is a deliberate effort of managers; cooperation is the voluntary willingness of people to help each other', 'Coordination is voluntary; cooperation is ordered by law', 'Both mean exactly the same thing', 'Cooperation is done only by top managers'],
  sol: 'Coordination is planned and conscious; cooperation is a willing attitude that coordination builds on.',
}));
Q('m_coord_need_size', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'As Konkan Mango Packers (imagined) grew from 15 workers in one shed to 400 workers in three sheds and a cold store, linking everyone\'s work became much harder. Which reason for the need for coordination does this show?',
  opts: ['Growth in the size of the organisation', 'Lack of standards', 'Management by exception', 'A narrow span of control'],
  sol: 'More people, units and individual goals come with growth, so their efforts need deliberate linking.',
}));
Q('m_coord_specialisation', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'At Vishwamitri Pharma Labs (imagined), research chemists, quality testers and marketing staff each believe their own work matters most and use their own technical language. Which reason for the need for coordination does this show?',
  opts: ['Specialisation', 'Growth in size alone', 'Lack of planning', 'A wide span of control'],
  sol: 'Specialists tend to see only their own field; coordination is needed to link their work and views to the firm\'s goal.',
}));
Q('ar_coord_essence', ar({
  t: 3, d: 3, c: 'understanding',
  a: 'Coordination is called the essence of management.',
  r: 'Every function of management requires the efforts of different people and departments to be harmonised.',
  key: 'a',
  sol: 'Both are true, and the reason explains the assertion: since every function needs harmonised effort, coordination runs through all of management.',
}));
Q('ar_coord_false', ar({
  t: 3, d: 3, c: 'analysis',
  a: 'Coordination is the responsibility of top managers only.',
  r: 'Coordination happens automatically whenever people are willing to cooperate.',
  key: 'd',
  sol: 'Both statements are false. Managers at every level must coordinate, and coordination is a deliberate effort; willingness to cooperate alone does not link activities.',
}));
Q('tf_coord', tf({
  t: 3, d: 1, c: 'understanding',
  stem: 'Coordination is needed only at the top level of management.',
  ans: false,
  sol: 'False. Every manager, from the top to the supervisor, must coordinate the work under them.',
}));
Q('fb_coord', fb({
  t: 3, d: 3, c: 'analysis',
  stem: 'Complete the analogy. Keeping many musicians in time and tune : Conductor of an orchestra :: Keeping many departments working in step : ___',
  acc: [['Manager', 'managers', 'management']],
  sol: 'A conductor coordinates musicians; a manager coordinates the departments and people of a firm.',
}));
Q('mt_coord', match({
  t: 3, d: 3, c: 'application', marks: 2,
  stem: 'Match each situation at Naini Lake Boat Club, an imagined boating and café business in Nainital, with the feature of coordination it shows.',
  pairs: [
    ['The boat crew, ticket desk and café plan their timings together', 'Integrates group efforts'],
    ['All teams aim at one goal: a safe, pleasant visit for each guest', 'Ensures unity of action'],
    ['The owner re-aligns timings every season as crowds change', 'Continuous process'],
    ['Both the owner and the café supervisor link work in their areas', 'Responsibility of all managers'],
  ],
  sol: 'Joint planning integrates efforts; one shared goal gives unity of action; seasonal re-alignment shows continuity; coordination by owner and supervisor shows it is every manager\'s job.',
}));
Q('s_coord_features', short({
  t: 3, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'State two features of coordination with an example of each from Naini Lake Boat Club (imagined), Nainital.',
  model: '1. **Integrates group efforts:** the **boat crew, ticket desk and café** time their work together so visitors are not kept waiting.\n2. **Continuous process:** timings are **re-aligned every season** as crowds change, not fixed once.',
  sol: 'Any two features (integrates efforts, unity of action, continuous, pervasive, responsibility of all managers, deliberate), each with an example.',
  scheme: [['First feature with example', 1], ['Second feature with example', 1]],
}));
Q('s_coord_need', short({
  t: 3, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Kakatiya Granite (imagined), Warangal, has opened two new quarries and a polishing unit run by specialist engineers. Give two reasons why it now needs more coordination.',
  model: '1. **Growth in size:** more **sites, people and individual goals** must now be linked to the firm\'s goals.\n2. **Specialisation:** **specialist engineers** at the polishing unit may focus only on their own work, so it must be fitted with quarrying and sales.',
  sol: 'Two reasons (size, functional differentiation, specialisation) linked to the case.',
  scheme: [['First reason', 1], ['Second reason', 1]],
}));
Q('s3_coord_essence', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Explain why coordination is called the essence of management by showing its role in any three functions of management at Beas Apple Orchards, an imagined fruit company in Kullu.',
  model: '1. **Planning:** the **orchard, grading and sales plans** must match, for example picking only as much as can be graded and sold.\n2. **Organising:** duties of **pickers, graders and drivers** are grouped and linked so that work flows smoothly.\n3. **Controlling:** results of **all sections** are checked against common standards so that action keeps them in step.\nSince every function needs it, coordination is the **essence** of management.',
  sol: 'Coordination shown in three functions, with the conclusion.',
  scheme: [['First function', 1], ['Second function', 1], ['Third function with conclusion', 1]],
}));
Q('s3_coord_features3', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain these three features of coordination: it ensures unity of action, it is all-pervasive, and it is a deliberate function.',
  model: '1. **Unity of action:** coordination makes different people and departments **act as one** towards a **common goal**.\n2. **All-pervasive:** it is needed **in every function and at every level** of every organisation.\n3. **Deliberate function:** managers must **consciously plan** for it; it does not happen just because people are willing to cooperate.',
  sol: 'Each of the three features explained.',
  scheme: [['Unity of action', 1], ['All-pervasive', 1], ['Deliberate', 1]],
}));
Q('s3_coord_need3', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Phulkari Crafts, an imagined embroidery business in Patiala, has grown from a family workshop into a firm with separate design, stitching, export and accounts departments, each run by a specialist. Explain three reasons why its need for coordination has risen.',
  model: '1. **Growth in size:** many more **workers and units** now have to be linked to one goal.\n2. **Functional differentiation:** separate **departments** each pursue their own targets, such as stitching for speed and design for novelty, which must be harmonised.\n3. **Specialisation:** **specialists** see work from their own angle and may resist others\' views, so a manager must reconcile them.',
  sol: 'Size, functional differentiation and specialisation, each linked to the firm.',
  scheme: [['Growth in size', 1], ['Functional differentiation', 1], ['Specialisation', 1]],
}));
Q('l_coord', long({
  t: 3, d: 3, c: 'application', marks: 5, wl: L5,
  stem: '(a) What is coordination? [1]\n(b) Godavari Mart, an imagined online grocery firm in Rajahmundry, often delivers late because buying, warehousing and delivery teams do not plan together. Show how coordination is needed in each of the five functions of management at the firm, and explain why it is called the essence of management. [4]',
  model: '(a) **Coordination** is the process of **synchronising and harmonising** the activities of different people and departments so that they achieve **unity of action** towards a common goal.\n\n(b) **Planning:** buying, stock and delivery plans must **match expected orders**.\n**Organising:** duties of buyers, packers and riders are **linked**, with clear hand-overs.\n**Staffing:** enough **packers and riders** are hired for peak hours.\n**Directing:** managers keep teams **informed and motivated** towards the same delivery promise.\n**Controlling:** delivery times are checked against **one common standard**, and causes of delay are fixed jointly.\nSince coordination runs through **every function**, it is the **essence of management**.',
  sol: 'Meaning; coordination in all five functions applied to the firm; conclusion on essence.',
  scheme: [['(a) Meaning', 1], ['(b) Five functions applied', 3], ['(b) Essence explained', 1]],
}));

// ================================================================ case-based
Q('cb_ctrl', caseQ({
  t: [1, 2], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined firm and people, written by SOYL for practice.)*',
  passage: '**Karnal Basmati Foods (imagined), Karnal**\n\nThe firm aims to pack 1,000 bags of rice a shift, allowing a gap of 5 per cent either way. Each evening, supervisor Gurleen counts the bags packed and enters them in a register. On Wednesday the night shift packed 900 bags. Gurleen found that the stitching machine had jammed for an hour. The owner, who usually sees only the exceptional cases, asked for a report.',
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'application', stem: 'Gurleen counting the bags each evening is the step of', opts: ['measuring actual performance', 'setting standards', 'taking corrective action', 'analysing deviations'], sol: 'Recording the actual output is measurement.' })),
    child('b', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'Why was the night shift\'s result reported to the owner?', model: 'A shortfall of 100 bags is **10 per cent**, beyond the **5 per cent** limit, so under **management by exception** it went to the owner.', sol: 'The deviation crossed the permitted limit.', scheme: [['Deviation beyond limit, with MBE', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify the step Gurleen performed when she found the jammed machine, and suggest a suitable corrective action.', model: '**Analysing deviations:** she found the **cause** of the shortfall. **Corrective action:** regular **maintenance** of the stitching machine and a standby machine.', sol: 'Analysis step identified; action matched to the cause.', scheme: [['Step', 1], ['Corrective action', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): State two points of importance of controlling shown in the passage.', model: '**Accomplishing goals:** daily counts show whether the **packing target** is met. **Order and discipline:** the register and limits keep the shifts **accountable**.', sol: 'Two points of importance drawn from the passage.', scheme: [['First point', 1], ['Second point', 1]] }),
    ]),
  ],
}));
Q('cb_coord', caseQ({
  t: [3, 2], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined firm and people, written by SOYL for practice.)*',
  passage: '**Kollam Cashew Roasters (imagined), Kollam**\n\nThe firm has grown from one roasting shed to four units and an export office. Each unit head sets her own targets. Last month the export office booked a large order for whole cashews, but two units had already planned to make broken cashew pieces for local sale. The managing director, Ms Varghese, now holds a planning meeting of all unit heads every Monday and checks progress against one shared plan every Friday.',
  parts: [
    child('a', mcq({ t: 3, d: 2, c: 'application', stem: 'The clash between the export order and the units\' plans shows a lack of', opts: ['coordination', 'staffing', 'recruitment', 'motivation'], sol: 'Different parts of the firm worked towards different ends: a failure of coordination.' })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Name the reason for the need for coordination shown by the firm\'s growth from one shed to four units and an export office.', model: '**Growth in the size** of the organisation.', sol: 'Growth in size.', scheme: [['Growth in size', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): How do Ms Varghese\'s Monday and Friday meetings show that planning and controlling are linked?', model: 'The **Monday meeting** sets one **shared plan** (standards); the **Friday check** compares progress with it, and any gaps feed into the **next plan**.', sol: 'Planning gives the standard; controlling checks it and feeds back.', scheme: [['Planning sets the standard', 1], ['Controlling checks and feeds back', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Identify two features of coordination shown by Ms Varghese\'s new practice.', model: '**Deliberate:** she **consciously sets up** meetings rather than hoping units cooperate. **Continuous:** the meetings happen **every week**.', sol: 'Two features with evidence.', scheme: [['First feature', 1], ['Second feature', 1]] }),
    ]),
  ],
}));
