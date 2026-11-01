// ISC 12 Commerce, ch08 Planning — question bank. Every firm, person and situation is imagined and written by SOYL
// and labelled as such; no ISC or CBSE textbook illustration or exercise and no CISCE specimen or board item is
// reused (D-036). Firms, people and set-ups differ from CBSE 12 Business Studies ch04.
import { Q, mcq, ar, tf, fb, ord, match, short, long, caseQ, child } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 75];
const L5 = [100, 150];

// ================================================================ t01 Functions of management; planning: meaning and importance
Q('m_functions_order', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'A trainer at the imagined Thanjavur Doll Makers writes the functions of management on the board in their usual order. Which list is correct?',
  opts: ['Planning, organising, staffing, directing, controlling', 'Organising, planning, directing, staffing, controlling', 'Staffing, planning, organising, controlling, directing', 'Directing, controlling, planning, organising, staffing'],
  sol: 'Management first plans, then organises, staffs, directs and finally controls; controlling feeds back into planning.',
}));
Q('m_primary', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The owner of the imagined Cuttack Silver Filigree refuses to hire artisans or buy silver until the year\'s targets and plans are fixed. This reflects the idea that planning is',
  opts: ['the primary function, which comes before the other functions', 'the last function of management', 'a function done only by supervisors', 'the same as controlling'],
  sol: 'Organising, staffing, directing and controlling are carried out within the framework of plans, so planning comes first: it is the primary function.',
}));
Q('m_direction', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Once the imagined Munnar Spice Trails fixed its target of forty guided tours a month, its guides, drivers and booking staff all knew exactly what they were working towards. Which importance of planning does this show?',
  opts: ['Planning provides direction', 'Planning reduces the risk of uncertainty', 'Planning promotes innovative ideas', 'Planning reduces overlapping activities'],
  sol: 'By stating in advance what is to be achieved, planning tells everyone which way to work: it provides direction.',
}));
Q('m_uncertainty', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The imagined Hosur Rose Farms expects demand for red roses to fall sharply after mid-February, so it plans in advance to supply wedding decorators from March. Which importance of planning is shown?',
  opts: ['It reduces the risk of uncertainty', 'It establishes standards for controlling', 'It reduces creativity', 'It guarantees higher prices'],
  sol: 'Planning looks ahead, foresees likely changes and prepares a response, so it reduces (but does not remove) the risk of uncertainty.',
}));
Q('m_overlap', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Before planning delivery routes, two vans of the imagined Nagpur Orange Juices often visited the same shops on the same day while other areas were missed. A route plan ended this. Which importance of planning is this?',
  opts: ['It reduces overlapping and wasteful activities', 'It facilitates decision making', 'It promotes innovative ideas', 'It provides a basis for staffing'],
  sol: 'A clear plan coordinates activities so that two people do not do the same job while other work is left undone.',
}));
Q('m_importance_combo', mcq({
  t: 1, d: 3, c: 'analysis', fixed: true, key: 'a',
  stem: 'A manager at the imagined Vadodara Solar Lamps lists four claims about planning:\nP. It provides direction.\nQ. It removes every risk from business.\nR. It facilitates decision making.\nS. It establishes standards for controlling.\nWhich of these are true points of importance of planning?',
  opts: ['P, R and S', 'P and Q only', 'Q, R and S', 'P, Q, R and S'],
  sol: 'Planning gives direction (P), helps choose between alternatives (R) and sets targets for control (S). It reduces risk but cannot remove every risk (Q is false).',
}));
Q('m_innovative', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'While planning next year\'s range, managers of the imagined Thanjavur Doll Makers came up with the idea of dolls that can be painted at home by children. Which importance of planning does this show?',
  opts: ['It promotes innovative ideas', 'It establishes standards for controlling', 'It reduces overlapping activities', 'It leads to rigidity'],
  sol: 'Planning makes managers think ahead about new ways of meeting goals, so it encourages new and creative ideas.',
}));
Q('ar_primary', ar({
  t: 1, d: 2, c: 'understanding',
  a: 'Planning precedes all other functions of management.',
  r: 'Organising, staffing, directing and controlling are carried out within the framework laid down by plans.',
  key: 'a',
  sol: 'Both are true, and the reason explains the assertion: the other functions need the plan as their base, so planning comes first.',
}));
Q('ar_overlap', ar({
  t: [1, 3], d: 3, c: 'analysis',
  a: 'Planning helps reduce overlapping and wasteful activities.',
  r: 'A strategy is a comprehensive plan for meeting the objectives of the whole organisation.',
  key: 'b',
  sol: 'Both statements are true, but the meaning of a strategy does not explain why planning reduces waste; that happens because plans coordinate who does what and when.',
}));
Q('tf_planning', tf({
  t: 1, d: 2, c: 'understanding',
  stem: 'In a well-run firm, a shift supervisor also plans, for example by deciding the next day\'s duties for each worker on the shift.',
  ans: true,
  sol: 'True. Planning is pervasive: top managers plan for the whole firm, while supervisors plan day-to-day work for their teams.',
}));
Q('fb_planning', fb({
  t: 1, d: 2, c: 'understanding',
  stem: 'Complete the analogy. Planning : looking ahead :: Controlling : looking ___',
  acc: [['back', 'backward', 'backwards']],
  sol: 'Planning looks ahead to decide what to do; controlling looks back to compare what was done with the plan.',
}));
Q('s_meaning', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Define planning and explain why it is described as the primary function of management.',
  model: '**Planning** is **deciding in advance** what to do, how to do it, when and by whom, to reach the goals of the organisation. It is the **primary function** because the other functions are carried out **within the framework of plans**.',
  sol: 'Definition plus the reason it comes first.',
  scheme: [['Definition', 1], ['Why primary', 1]],
}));
Q('s_importance', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'The imagined Ranchi Lac Bangles made a detailed plan for the wedding season for the first time this year. State two benefits it can expect from planning.',
  model: '1. **Direction:** every artisan and salesperson knows the **season\'s target** and works towards it.\n2. **Standards for controlling:** after the season, the owner can **compare actual sales** with the planned figures and find reasons for any gap.',
  sol: 'Two points of importance linked to the bangle maker.',
  scheme: [['First benefit linked to the case', 1], ['Second benefit linked to the case', 1]],
}));
Q('s3_importance', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'The imagined Vadodara Solar Lamps plans to supply 8,000 lanterns to villages next year. Explain three ways in which planning will help the firm.',
  model: '1. **Reduces risk of uncertainty:** by foreseeing a **monsoon slowdown** in rural sales, it can build stock earlier and plan collections.\n2. **Facilitates decision making:** it can **compare options**, such as selling through village shops or self-help groups, and choose the best.\n3. **Promotes innovative ideas:** planning makes managers think ahead, leading to ideas like a **rent-to-own scheme** for poorer buyers.',
  sol: 'Three points of importance applied to the lantern firm.',
  scheme: [['First point applied', 1], ['Second point applied', 1], ['Third point applied', 1]],
}));
Q('s3_functions', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'An imagined wedding-catering firm in Lucknow has planned to serve twelve weddings in December. Explain how this plan links to its organising, staffing and controlling.',
  model: '1. **Organising:** the plan tells the firm **what tasks** are needed, such as cooking, serving and transport, so it can **group them** and assign them.\n2. **Staffing:** it shows **how many cooks and servers** are needed on each date, so the firm can hire in time.\n3. **Controlling:** after each wedding, **actual costs and guest feedback** are compared with the plan\'s targets, and corrections are made for the next one.',
  sol: 'Three links between the plan and the other functions.',
  scheme: [['Organising link', 1], ['Staffing link', 1], ['Controlling link', 1]],
}));
Q('l_importance', long({
  t: 1, d: 3, c: 'application', marks: 5, wl: L5,
  stem: '(a) Name the five functions of management in order. [1]\n(b) The imagined Hosur Rose Farms has started planning each season in detail. Explain four points of importance of planning, with an example of each from the farm. [4]',
  model: '(a) **Planning, organising, staffing, directing and controlling.**\n\n(b) 1. **Provides direction:** the season\'s target, for example **two lakh stems for export**, tells pickers, packers and drivers what to aim for.\n2. **Reduces risk of uncertainty:** foreseeing the **fall in demand after February**, the farm plans to supply wedding decorators instead.\n3. **Reduces overlapping and wasteful activities:** a **cold-room schedule** ends the clash between export and local orders for the same space.\n4. **Establishes standards for controlling:** weekly targets for **stems packed** let the manager compare actual work with the plan and act on any shortfall.',
  sol: 'Functions in order; four points of importance with farm examples.',
  scheme: [['(a) Functions in order', 1], ['(b) Four points with examples', 4]],
}));

// ================================================================ t02 Steps and limitations of planning
Q('m_first_step', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The new manager of the imagined Ranchi Lac Bangles begins planning by writing: "Sell 30,000 pairs of lac bangles this year, a third of them online." Which step of planning is this?',
  opts: ['Setting objectives', 'Developing premises', 'Evaluating alternatives', 'Follow-up action'],
  sol: 'Stating what is to be achieved is setting objectives, the first step in planning.',
}));
Q('m_premises', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Before planning next year\'s tours, the imagined Munnar Spice Trails assumes that a new highway will cut the drive from Kochi by an hour and that hotel rates will stay steady. Which step of planning is this?',
  opts: ['Developing premises', 'Setting objectives', 'Implementing the plan', 'Selecting an alternative'],
  sol: 'Assumptions about future conditions on which plans rest are planning premises; making them is developing premises.',
}));
Q('m_evaluate', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'The imagined Jammu Basmati Mills gives scores for cost, risk and time to each of three possible sites for a new warehouse, noting the strengths and weaknesses of each. Which step of planning is the firm at?',
  opts: ['Evaluating alternative courses of action', 'Identifying alternative courses of action', 'Selecting an alternative', 'Follow-up action'],
  sol: 'Weighing the merits and demerits of each option before choosing is evaluating alternatives.',
}));
Q('m_identify', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'To meet its export target, the planning team of the imagined Jammu Basmati Mills writes down every possible route: an agent in Dubai, an online trade portal, its own sales office, or a partner mill abroad. Which step of planning is this?',
  opts: ['Identifying alternative courses of action', 'Evaluating alternative courses of action', 'Developing premises', 'Implementing the plan'],
  sol: 'Listing the different ways in which the objective could be reached, before judging them, is identifying alternatives.',
}));
Q('m_select', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'After comparing three warehouse sites, the directors of the imagined Jammu Basmati Mills choose the one near the railway siding, combined with a small rented store in the city for busy months. Which step of planning is this?',
  opts: ['Selecting an alternative', 'Identifying alternatives', 'Setting objectives', 'Follow-up action'],
  sol: 'Choosing the best option, or a mix of options, after evaluation is selecting an alternative.',
}));
Q('m_implement', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Having chosen to open a kiosk at Ranchi airport, the manager of the imagined Ranchi Lac Bangles hires two sales assistants, buys display stands and opens the kiosk. Which step of planning is this?',
  opts: ['Implementing the plan', 'Developing premises', 'Evaluating alternatives', 'Setting objectives'],
  sol: 'Putting the chosen plan into action by arranging people and resources is implementing the plan.',
}));
Q('m_after_premises', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'A Class 12 student at an imagined school in Gaya is arranging the steps of planning. Which step comes immediately after developing premises?',
  opts: ['Identifying alternative courses of action', 'Setting objectives', 'Selecting an alternative', 'Implementing the plan'],
  sol: 'The order is: set objectives, develop premises, identify alternatives, evaluate them, select one, implement, and follow up.',
}));
Q('m_limit_rigidity', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'A sales officer at the imagined Gorakhpur Terracotta spots a chance to supply a hotel chain, but she is told that the year\'s plan has no budget for it and she must wait until next year. Which limitation of planning is shown?',
  opts: ['Planning leads to rigidity', 'Planning involves huge costs', 'Planning does not guarantee success', 'Planning reduces overlapping'],
  sol: 'Sticking to a fixed plan even when a good new chance appears shows that planning can make an organisation rigid.',
}));
Q('m_limit_env', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'The imagined Kanpur Leather Bags planned a full year of bags with a plastic coating, but two months later a new state rule banned such coatings and the plan had to be dropped. Which limitation of planning does this show?',
  opts: ['Planning may not work in a dynamic environment', 'Planning reduces creativity', 'Planning is time-consuming', 'Planning leads to rigidity'],
  sol: 'Plans rest on assumptions; when the environment changes suddenly, as with a new rule, the plan may fail.',
}));
Q('m_limit_combo', mcq({
  t: 2, d: 3, c: 'analysis', fixed: true, key: 'd',
  stem: 'Read these statements about planning at the imagined Thanjavur Doll Makers:\nP. Its detailed annual plan stops managers from changing course quickly.\nQ. Painters who only follow the plan rarely suggest new designs.\nR. Its plan guarantees that every festival season will be profitable.\nS. Preparing the plan needed costly market surveys.\nWhich statements describe **limitations** of planning?',
  opts: ['P and R only', 'Q and R only', 'P, Q, R and S', 'P, Q and S'],
  sol: 'Rigidity (P), reduced creativity (Q) and huge cost (S) are limitations. R is false: planning can never guarantee success.',
}));
Q('m_limit_creativity', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'At the imagined Gorakhpur Terracotta, the owner and two senior managers draw up every plan. Supervisors say they simply carry out orders and have stopped suggesting new designs. Which limitation of planning does this show?',
  opts: ['Planning reduces creativity', 'Planning involves huge costs', 'Planning provides direction', 'Planning is time-consuming'],
  sol: 'When plans are made only at the top and others just carry them out, people below stop offering ideas: planning reduces creativity.',
}));
Q('ar_guarantee', ar({
  t: 2, d: 3, c: 'analysis',
  a: 'Even a careful plan does not ensure the success of a business.',
  r: 'Success depends on how well the plan is carried out and on changes in the environment.',
  key: 'a',
  sol: 'Both are true, and the reason explains the assertion: a plan is only a starting point, and its result depends on implementation and on events the plan could not control.',
}));
Q('ar_choose', ar({
  t: 2, d: 3, c: 'analysis',
  a: 'Planning involves choosing from among alternative courses of action.',
  r: 'In planning, a manager usually has only one possible course of action.',
  key: 'c',
  sol: 'The assertion is true: decision making lies at the heart of planning. The reason is false: if there were only one course of action there would be nothing to choose.',
}));
Q('ar_eliminate', ar({
  t: 2, d: 3, c: 'analysis',
  a: 'Planning removes all uncertainty about the future.',
  r: 'Planning is done only once, when a business is first set up.',
  key: 'd',
  sol: 'Both are false. Planning reduces but cannot remove uncertainty, and it is a continuous process repeated for every new period.',
}));
Q('tf_steps', tf({
  t: 2, d: 1, c: 'understanding',
  stem: 'In the planning process, the best alternative is selected before the alternatives are evaluated.',
  ans: false,
  sol: 'False. Alternatives are first identified and evaluated; only then is the best one selected.',
}));
Q('fb_steps', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'Complete the analogy. Setting objectives : first step of planning :: Follow-up action : ___ step of planning',
  acc: [['last', 'final', 'seventh']],
  sol: 'Setting objectives is the first step and follow-up action is the last step of planning.',
}));
Q('ord_steps', ord({
  t: 2, d: 2, c: 'application', marks: 2,
  stem: 'The imagined Patna Litti Café plans to start a home-delivery service. Arrange its planning actions in the correct order.',
  items: [
    'Aim to deliver 150 meals a day within six months',
    'Assume that fuel prices and rents stay roughly the same',
    'List options: own riders, a delivery app, or both',
    'Compare the cost and reach of each option',
    'Choose to start with a delivery app',
    'Sign up with the app and train the kitchen to pack meals',
    'Check daily orders each week and adjust the menu',
  ],
  sol: 'Objectives, premises, identifying alternatives, evaluating them, selecting one, implementing and follow-up action.',
}));
Q('s_limits2', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two limitations of planning, giving an example of each from an imagined shop that sells festival lights in Kolkata.',
  model: '1. **May not work in a dynamic environment:** a sudden **ban on certain imported lights** could make the season\'s stock plan useless.\n2. **Time-consuming:** spending weeks on surveys may **delay orders**, so rivals reach buyers first before Diwali.',
  sol: 'Two limitations with suitable examples.',
  scheme: [['First limitation with example', 1], ['Second limitation with example', 1]],
}));
Q('s_implement', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain the last two steps of the planning process: implementing the plan and follow-up action.',
  model: '1. **Implementing the plan:** putting the chosen plan **into action** by arranging people, money and materials, for example hiring staff and buying equipment.\n2. **Follow-up action:** **monitoring** the plan as it runs, to check that it works and to **revise** it if conditions change.',
  sol: 'Both steps explained.',
  scheme: [['Implementing the plan', 1], ['Follow-up action', 1]],
}));
Q('s3_steps', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'The imagined Hosur Rose Farms has decided to export roses to Europe through an auction agent in the Netherlands. Explain the last three steps of planning it should now follow.',
  model: '1. **Selecting an alternative:** having compared options, it **confirms** the auction agent as the chosen route and records why.\n2. **Implementing the plan:** it **signs** with the agent, books **cold-chain transport** and trains packers in export grading.\n3. **Follow-up action:** it **checks** each shipment\'s prices and quality complaints weekly, and **revises** the plan if results fall short.',
  sol: 'Selecting, implementing and follow-up, each applied to the farm.',
  scheme: [['Selecting', 1], ['Implementing', 1], ['Follow-up', 1]],
}));
Q('s3_premises', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Munnar Spice Trails (imagined) wants to double its tours next year. Explain the steps of developing premises and identifying alternative courses of action, with an example of each from the firm.',
  model: '1. **Developing premises:** premises are **assumptions about the future** on which the plan rests, for example that the **new highway** will bring more weekend visitors and that hotel rates will stay steady.\n2. **Identifying alternatives:** the firm **lists every way** to reach its goal, for example adding **monsoon tours**, tying up with **hotels**, or selling through **travel apps**.\n3. Clear premises make the alternatives realistic.',
  sol: 'Both steps explained with examples.',
  scheme: [['Developing premises with example', 1], ['Identifying alternatives with example', 1], ['Link between them', 1]],
}));
Q('s3_limits', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'The imagined Kanpur Leather Bags spent two months and a large fee on its annual plan. Then a new rule banned its main coating, and managers who suggested switching to jute were told to "stick to the plan". Identify and explain three limitations of planning in this case.',
  model: '1. **Involves huge costs:** the **large fee** paid for the plan raised expenses.\n2. **May not work in a dynamic environment:** the **new rule** on coatings made the plan\'s assumptions wrong.\n3. **Leads to rigidity / reduces creativity:** managers were told to **"stick to the plan"**, so a good new idea, switching to jute, was ignored.',
  sol: 'Three limitations drawn from the case.',
  scheme: [['First limitation', 1], ['Second limitation', 1], ['Third limitation', 1]],
}));
Q('l_steps', long({
  t: 2, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'The imagined Nagpur Orange Juices wants to launch a sugar-free orange drink for schools. Explain the steps in the planning process it should follow, with an example of each from the firm.',
  model: '1. **Setting objectives:** for example, **sell the drink in 200 school canteens** within a year.\n2. **Developing premises:** assume that **orange prices** stay steady and that schools will welcome **healthier drinks**.\n3. **Identifying alternatives:** list options such as **its own vans**, school-canteen **contractors**, or both.\n4. **Evaluating alternatives:** compare each option on **cost, reach and risk**.\n5. **Selecting an alternative:** choose, say, canteen contractors for **wider reach** at lower cost.\n6. **Implementing the plan:** sign contractors, **start production** and train sales staff.\n7. **Follow-up action:** check **monthly sales** in each school and **revise** the plan if needed.',
  sol: 'All seven steps in order, each applied to the drink launch.',
  scheme: [['Objectives and premises', 1], ['Identifying and evaluating alternatives', 1], ['Selecting an alternative', 1], ['Implementing the plan', 1], ['Follow-up action and correct order', 1]],
}));
Q('l_limits', long({
  t: [2, 1], d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'The owner of the imagined Patna Litti Café says: "Plans are a waste of time for a small café. I decide everything as I go."\n(a) Explain three limitations of planning that support her view. [3]\n(b) Evaluate whether she should still plan. Give reasons. [2]',
  model: '(a) 1. **Time-consuming:** detailed planning takes time that a busy owner may prefer to spend **serving customers**.\n2. **Leads to rigidity:** a fixed plan may stop her **changing the menu quickly** when a dish suddenly becomes popular.\n3. **May not work in a dynamic environment:** sudden changes, such as a **rise in flour prices** or a new café nearby, can upset any plan.\n\n(b) She should **still plan, but simply and flexibly**. Even a short plan gives **direction**, such as a monthly sales target, and **reduces the risk** of running short of stock on festival days. It also gives a **standard** to check results against. Keeping plans short and reviewing them often avoids the limitations above.',
  sol: 'Three limitations supporting the owner; a balanced judgement that she should plan simply, with reasons.',
  scheme: [['(a) Three limitations', 3], ['(b) Judgement', 1], ['(b) Reasons', 1]],
}));

// ================================================================ t03 Types of plans
Q('m_objective', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'The imagined Vadodara Solar Lamps writes in its plan: "Sell 8,000 solar lanterns in villages of Gujarat in the year ending 31 March." This is an example of',
  opts: ['an objective', 'a policy', 'a procedure', 'a rule'],
  sol: 'An objective is the end result the firm wants to achieve, stated clearly and, where possible, in numbers and with a time limit.',
}));
Q('m_policy', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'The handbook of the imagined Cuttack Silver Filigree says: "We give preference to artisans\' children when choosing apprentices." This statement is a',
  opts: ['policy', 'rule', 'method', 'budget'],
  sol: 'A policy is a general statement that guides decisions while leaving room for judgement; "give preference" guides, but does not fix, the choice.',
}));
Q('m_rule', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'A notice at the imagined Cuttack Silver Filigree reads: "No mobile phones on the workbench. Anyone breaking this will lose a day\'s bonus." This is a',
  opts: ['rule', 'policy', 'strategy', 'programme'],
  sol: 'A rule states exactly what must or must not be done, allows no discretion and usually carries a penalty.',
}));
Q('m_procedure', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'At the imagined Jammu Basmati Mills, every lorry of paddy is weighed at the gate, sampled for moisture, logged by the clerk and then sent to the drying yard, always in that order. This sequence is a',
  opts: ['procedure', 'method', 'policy', 'strategy'],
  sol: 'A procedure lays down the steps of a routine activity in a fixed chronological order.',
}));
Q('m_method', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'Painters at the imagined Thanjavur Doll Makers are told to apply the base coat with a spray gun rather than a brush, because it is faster and smoother. This instruction is a',
  opts: ['method', 'procedure', 'rule', 'programme'],
  sol: 'A method prescribes the best way of doing one particular task or step.',
}));
Q('m_budget', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'The plan of the imagined Munnar Spice Trails for next year shows its expected income from tours and its expected spending on guides and fuel, month by month, in rupees. This plan is a',
  opts: ['budget', 'policy', 'method', 'rule'],
  sol: 'A budget states expected results in numerical terms for a future period.',
}));
Q('m_programme', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'For the opening of its first café in Shillong, the imagined Tezpur Tea Cafés draws up a plan listing the tasks, the person responsible for each, the time each will take and the money needed. This plan is a',
  opts: ['programme', 'policy', 'rule', 'method'],
  sol: 'A programme is a detailed plan for a particular project, bringing together the tasks, people, timing and resources needed.',
}));
Q('m_strategy', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'Facing a large national rival, the imagined Nagpur Orange Juices decides to focus on small towns, sell through school canteens and stress "no added sugar" in all its advertising. This is a',
  opts: ['strategy', 'procedure', 'rule', 'budget'],
  sol: 'A strategy is a comprehensive plan that sets the firm\'s long-term direction, chooses where and how to compete, and allocates resources, often in response to rivals.',
}));
Q('m_types_combo', mcq({
  t: 3, d: 4, c: 'analysis', fixed: true, key: 'b',
  stem: 'Four statements appear in the staff handbook of an imagined museum shop in Hyderabad:\nP. "Bags must be left at the counter. No exceptions."\nQ. "We prefer to stock crafts made in Telangana."\nR. "Smoking near the textile gallery is prohibited."\nS. "Raise annual sales by a fifth within two years."\nWhich of these are **rules**?',
  opts: ['P and Q only', 'P and R only', 'Q and S only', 'P, R and S'],
  sol: 'P and R state exactly what must or must not be done, with no discretion: rules. Q is a policy (a preference that guides choice) and S is an objective.',
}));
Q('ar_rule', ar({
  t: 3, d: 3, c: 'analysis',
  a: 'A rule tells employees exactly what must or must not be done.',
  r: 'A rule allows managers to use their own judgement in applying it.',
  key: 'c',
  sol: 'The assertion is true. The reason is false: rules are rigid and leave no room for discretion; it is a policy that allows judgement.',
}));
Q('tf_policy', tf({
  t: 3, d: 2, c: 'understanding',
  stem: 'A policy is a general statement that guides decision making while leaving managers some room for judgement.',
  ans: true,
  sol: 'True. A policy sets limits within which decisions are made, but managers still decide how to apply it.',
}));
Q('tf_strategy', tf({
  t: 3, d: 2, c: 'understanding',
  stem: 'A strategy deals only with the small daily tasks of one department, such as how to stack files.',
  ans: false,
  sol: 'False. A strategy is a comprehensive plan for the whole organisation: it sets long-term direction and decides how to compete and use resources.',
}));
Q('fb_types', fb({
  t: 3, d: 3, c: 'analysis',
  stem: 'Complete the analogy. Steps of a routine job in a fixed order : procedure :: The prescribed way of carrying out one step : ___',
  acc: [['method']],
  sol: 'A sequence of steps is a procedure; the best way of doing one step within it is a method.',
}));
Q('mt_types', match({
  t: 3, d: 3, c: 'application', marks: 2,
  stem: 'Match each statement from an imagined chain of bookshops in Chennai with the type of plan it represents.',
  pairs: [
    ['"We encourage staff to recommend books by local authors."', 'Policy'],
    ['"Wrap gift books in recycled paper, folding the edges inward first."', 'Method'],
    ['"Open the new Madurai branch in six weeks: lease, shelving, staff and stock, with dates and costs."', 'Programme'],
    ['"Win readers from online sellers by hosting author readings and same-day delivery in our cities."', 'Strategy'],
  ],
  sol: 'Encouraging local authors guides choices (policy); the wrapping instruction is a method; the branch opening with tasks, dates and costs is a programme; winning readers from online rivals is a strategy.',
}));
Q('s_budget_prog', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between a budget and a programme, giving one example of each from an imagined college canteen.',
  model: '1. **Budget:** a plan of **expected results in numbers** for a period, for example **expected income and costs** of the canteen for the term.\n2. **Programme:** a **detailed plan for one project**, listing tasks, people, timing and money, for example **setting up a salad counter** before exams.',
  sol: 'Both explained with canteen examples.',
  scheme: [['Budget with example', 1], ['Programme with example', 1]],
}));
Q('s_rule_case', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Identify the type of plan in each statement from the imagined Tezpur Tea Cafés, with a reason: (i) "Staff must wear gloves when handling food." (ii) "We prefer to buy tea directly from small growers."',
  model: '(i) **Rule:** it says **exactly what must be done** and leaves no discretion.\n(ii) **Policy:** it is a **general guide** to purchase decisions; managers still use judgement about which growers to buy from.',
  sol: 'Both identified with reasons.',
  scheme: [['(i) Rule with reason', 1], ['(ii) Policy with reason', 1]],
}));
Q('s_objective2', short({
  t: 3, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'The owner of an imagined bicycle-repair chain in Mysuru writes: "We want to do better next year." Rewrite this as a good objective and state why your version is better.',
  model: '**Objective:** "Repair 1,200 bicycles a month across our three shops by next March." It is better because it is **specific, measurable** and has a **time limit**, so staff know the target and results can be checked.',
  sol: 'A specific, measurable, time-bound objective with a reason.',
  scheme: [['Rewritten objective', 1], ['Reason', 1]],
}));
Q('s3_types', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Identify and explain the type of plan in each of these statements of the imagined Cuttack Silver Filigree: (i) "Melt silver only in the fume hood"; (ii) "Each order: record, weigh silver, issue to artisan, inspect, pack"; (iii) "Win buyers in Europe by offering custom designs and exhibiting at craft fairs."',
  model: '(i) **Rule:** it states **exactly** what must be done and allows no exception.\n(ii) **Procedure:** it lays down the **steps of a routine job** in a fixed order.\n(iii) **Strategy:** it is a **comprehensive plan** for competing in a new market, deciding how to win buyers and where to put resources.',
  sol: 'Each statement correctly classified with a reason.',
  scheme: [['(i) Rule', 1], ['(ii) Procedure', 1], ['(iii) Strategy', 1]],
}));
Q('s3_opr', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain objectives, policies and rules as types of plans, giving one example of each from an imagined college hostel.',
  model: '1. **Objectives:** the **end results** to be achieved, for example "serve every resident a balanced breakfast by 8 a.m. each day".\n2. **Policies:** **general guides** to decision making that leave room for judgement, for example "preference for local vegetables".\n3. **Rules:** **exact statements** of what must or must not be done, with **no discretion**, for example "gates close at 10 p.m.".',
  sol: 'Three types explained with hostel examples.',
  scheme: [['Objectives', 1], ['Policies', 1], ['Rules', 1]],
}));
Q('s3_procedure_method', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain procedures, methods and budgets as types of plans, giving one example of each from an imagined railway parcel office.',
  model: '1. **Procedure:** the **steps of a routine job** in fixed order, for example booking a parcel: weigh, label, issue receipt, load.\n2. **Method:** the **best way of doing one step**, for example sealing cartons with machine-applied tape rather than by hand.\n3. **Budget:** a plan of **expected results in numbers**, for example the parcel office\'s expected income and costs for the quarter.',
  sol: 'Three types explained with parcel-office examples.',
  scheme: [['Procedure', 1], ['Method', 1], ['Budget', 1]],
}));
Q('l_types', long({
  t: 3, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'The handbook of the imagined Jammu Basmati Mills contains these statements:\n(i) "Export 5,000 tonnes of rice this year."\n(ii) "Buy paddy from registered farmer groups wherever possible."\n(iii) "Helmets must be worn in the milling hall."\n(iv) "Expected sales and expenses for each quarter are shown below in rupees."\n(v) "Enter the Gulf market by packing rice under buyers\' own labels and pricing below European rivals."\nIdentify the type of plan in each statement and explain it briefly.',
  model: '(i) **Objective:** an **end result** to be achieved, stated in numbers with a time limit.\n(ii) **Policy:** a **general guide** for purchase decisions; "wherever possible" leaves room for **judgement**.\n(iii) **Rule:** says **exactly** what must be done in the hall; **no discretion**, and breaking it may bring a penalty.\n(iv) **Budget:** expected results expressed in **numbers** for a future period.\n(v) **Strategy:** a **comprehensive plan** that chooses a market, a way to compete and how to use resources against rivals.',
  sol: 'One mark for each statement correctly classified and explained.',
  scheme: [['(i) Objective', 1], ['(ii) Policy', 1], ['(iii) Rule', 1], ['(iv) Budget', 1], ['(v) Strategy', 1]],
}));

// ================================================================ case-based
Q('cb_hosur', caseQ({
  t: [1, 2], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined firm and people, written by SOYL for practice.)*',
  passage: '**Hosur Rose Farms (imagined), Tamil Nadu**\n\nHosur Rose Farms grows roses in greenhouses. In June, its manager, Selvi, set a target of selling two lakh stems in the wedding season. She assumed that diesel prices would stay steady and that a new cold-storage centre would open nearby in October. She listed three ways to reach buyers in Bengaluru and Chennai and compared their costs. Once the season began, she checked sales every week. When the cold-storage centre opened late, she changed the delivery schedule.',
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'application', stem: 'Selvi\'s assumptions about diesel prices and the cold-storage centre are examples of', opts: ['planning premises', 'objectives', 'rules', 'budgets'], sol: 'Assumptions about future conditions on which the plan rests are premises.' })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Name the step of planning shown when Selvi checked sales every week and changed the delivery schedule.', model: '**Follow-up action.**', sol: 'Monitoring the plan and revising it is follow-up action.', scheme: [['Follow-up action', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Quote the lines that show two other steps of planning and name each step.', model: '1. "**set a target of selling two lakh stems**": **setting objectives**.\n2. "**listed three ways to reach buyers ... and compared their costs**": **identifying and evaluating alternatives**.', sol: 'Two steps with supporting lines.', scheme: [['First step with line', 1], ['Second step with line', 1]] }), [
      short({ t: [1, 2], d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Which limitation of planning is shown by the late opening of the cold-storage centre? How did follow-up action help?', model: '**Planning may not work in a dynamic environment:** a premise turned out wrong. **Follow-up** let Selvi spot this early and **revise** the delivery schedule, limiting the damage.', sol: 'Limitation named; role of follow-up explained.', scheme: [['Limitation', 1], ['Role of follow-up', 1]] }),
    ]),
  ],
}));
Q('cb_tezpur', caseQ({
  t: 3, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined firm, written by SOYL for practice.)*',
  passage: '**Tezpur Tea Cafés (imagined), Assam**\n\nTezpur Tea Cafés runs six cafés. Its aim is to open four more by the end of next year. Its plan states: cafés should, as far as possible, hire staff from the local area. Every new order is taken, written on a slip, passed to the kitchen and served, in that order. Tea must be brewed for exactly four minutes, and no café may sell packaged tea from other brands. For next year, the expected income and costs of each café are shown month by month.',
  parts: [
    child('a', mcq({ t: 3, d: 2, c: 'application', stem: '"Cafés should, as far as possible, hire staff from the local area" is an example of', opts: ['a policy', 'a rule', 'a procedure', 'a budget'], sol: '"As far as possible" guides decisions but leaves room for judgement: a policy.' })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Name the type of plan shown by the expected income and costs of each café, month by month.', model: '**Budget.**', sol: 'Expected results in numbers for a future period form a budget.', scheme: [['Budget', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify a procedure and a rule from the passage, quoting the words.', model: '**Procedure:** "**taken, written on a slip, passed to the kitchen and served, in that order**". **Rule:** "**no café may sell packaged tea from other brands**".', sol: 'A procedure and a rule with supporting words.', scheme: [['Procedure', 1], ['Rule', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Identify an objective and a method from the passage, quoting the words.', model: '**Objective:** "**open four more by the end of next year**". **Method:** "**brewed for exactly four minutes**", the set way of doing one task.', sol: 'An objective and a method with supporting words.', scheme: [['Objective', 1], ['Method', 1]] }),
    ]),
  ],
}));
