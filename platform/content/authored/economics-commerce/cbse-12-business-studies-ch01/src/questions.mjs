// CBSE 12 Business Studies, ch01 Nature and Significance of Management — question bank. Every firm,
// person and situation is imagined and written by SOYL; no NCERT example, exercise or board/sample-paper
// item is reused (D-036). Cases follow the board pattern (identify the concept from the lines and explain).
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 75];
const L5 = [100, 150];

// Efficiency figures for the one numerical (computed, not typed).
export const EFF = { planned: 1200, made: 1200, costPlanned: 60000, costActual: 54000 };
export const EFF_SAVING = EFF.costPlanned - EFF.costActual; // 6000
export const EFF_UNIT_PLANNED = EFF.costPlanned / EFF.planned; // 50
export const EFF_UNIT_ACTUAL = EFF.costActual / EFF.made; // 45
if (EFF_SAVING !== 6000 || EFF_UNIT_PLANNED !== 50 || EFF_UNIT_ACTUAL !== 45) throw new Error('figure check failed');

// ================================================================ t01 Concept, objectives, importance, characteristics
Q('m_def', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Which description best captures **management** as a process?',
  opts: [
    'Getting work done through others so that goals are achieved effectively and efficiently',
    'Doing all the work of an organisation personally to save costs',
    'Keeping accounts of income and expenditure of a business',
    'Selling goods at the highest possible price',
  ],
  sol: 'Management is a process of getting things done with and through people to reach goals effectively (on time) and efficiently (at least cost). Doing everything oneself, accounting and pricing are narrower activities, not the definition of management.',
}));
Q('m_effective', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Sunrise Toys (an imagined firm in Jaipur) had to deliver 5,000 toys for a festival sale. It delivered all of them on time but spent much more on overtime and wasted material than budgeted. The firm was',
  opts: ['effective but not efficient', 'efficient but not effective', 'both effective and efficient', 'neither effective nor efficient'],
  sol: 'Completing the task on time means it was effective; spending more than needed means it was not efficient (resources were wasted).',
}));
Q('m_efficient', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A courier unit of the imagined Kaveri Logistics cut its fuel and packing costs by a tenth, but missed the agreed delivery date for a hospital order. In terms of management, the unit was',
  opts: ['efficient but not effective', 'effective but not efficient', 'both effective and efficient', 'neither effective nor efficient'],
  sol: 'Lower cost per unit shows efficiency; missing the deadline means the target was not achieved, so it was not effective.',
}));
Q('m_obj_social', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'An imagined cement company in Satna runs free eye-check camps for nearby villages and uses dust filters beyond legal requirements. Which objective of management does this reflect?',
  opts: ['Social objective', 'Organisational objective', 'Personal objective', 'Survival objective only'],
  sol: 'Creating benefit for society, such as health camps and less pollution, is a social objective. Organisational objectives are survival, profit and growth; personal objectives relate to employees\' needs.',
}));
Q('m_obj_org', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Survival, profit and growth together form which category of management objectives?',
  opts: ['Organisational objectives', 'Social objectives', 'Personal objectives', 'Functional objectives'],
  sol: 'The three organisational objectives are survival, profit and growth; they relate to the firm itself.',
}));
Q('m_pervasive', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Management is needed in a hospital, a school, a temple trust and a cricket club alike. Which characteristic of management does this show?',
  opts: ['Management is pervasive', 'Management is intangible', 'Management is multidimensional', 'Management is a group activity'],
  sol: 'Pervasive means universal: management is used in all kinds of organisations, economic or social, big or small, and in every country.',
}));
Q('m_intangible', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Visitors to the imagined Neelgiri Hotel cannot "see" its management, yet they notice that rooms are ready on time and staff work smoothly together. Which characteristic of management is highlighted?',
  opts: ['It is an intangible force', 'It is goal-oriented', 'It is a continuous process', 'It is dynamic'],
  sol: 'Management cannot be seen; its presence is felt through results such as order, timeliness and satisfied guests. That is what intangible means.',
}));
Q('m_dynamic', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'When customers of the imagined Mehta Sweets began ordering online, the owners started a delivery app and cut sugar in some items for health-conscious buyers. This shows that management is',
  opts: ['dynamic', 'pervasive', 'multidimensional', 'a group activity'],
  sol: 'A dynamic function adapts to changes in the environment (customer habits, technology). Pervasive means universal; multidimensional refers to managing work, people and operations; group activity refers to many people working together.',
}));
Q('m_importance', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which of the following is **not** a reason why management is important?',
  opts: [
    'It guarantees that the organisation will never face losses',
    'It helps in achieving group goals',
    'It increases efficiency by reducing waste',
    'It helps in the development of society',
  ],
  sol: 'Management improves the chances of success but cannot guarantee that there will never be losses; the business environment is uncertain. The other three are standard points of importance.',
}));
Q('m_personal', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'The imagined Tapti Textiles gives its weavers fair wages, a health plan and a chance to train as supervisors. Which objective of management does this mainly serve?',
  opts: ['Personal objectives', 'Social objectives', 'Organisational objectives', 'Economic objectives of the government'],
  sol: 'Fair pay, health cover and growth opportunities meet the financial, social and higher-level needs of employees, which are personal objectives.',
}));
Q('ar_continuous', ar({
  t: 1, d: 2, c: 'analysis', key: 'a',
  a: 'Management is called a continuous process.',
  r: 'The functions of planning, organising, staffing, directing and controlling are performed again and again by all managers.',
  sol: 'Both are true. Because the functions are performed repeatedly and simultaneously, management never ends while the organisation exists, so R explains A.',
}));
Q('ar_efficiency', ar({
  t: 1, d: 3, c: 'analysis', key: 'd',
  a: 'An organisation that achieves its target late but at very low cost is effective.',
  r: 'Efficiency means doing the task correctly with minimum cost and resources.',
  sol: 'A is false: effectiveness means completing the task (achieving the target) on time; a late target is not effective. R is a correct statement of efficiency.',
}));
Q('tf_group', tf({
  t: 1, d: 1, c: 'understanding', ans: true,
  stem: 'True or false? Management is a group activity because an organisation is a collection of individuals with different needs who work towards common goals.',
  sol: 'An organisation brings together people with different needs; management directs their efforts towards common goals while also meeting individual needs.',
}));
Q('fb_eff', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Completing a task on time is called ___, while completing it at minimum cost is called ___.',
  acc: [['effectiveness'], ['efficiency']],
  sol: 'Effectiveness concerns doing the right task and finishing it on time; efficiency concerns using resources economically.',
}));
Q('n_unit_cost', num({
  t: 1, d: 2, c: 'application', marks: 1, value: EFF_UNIT_ACTUAL, unit: '₹',
  stem: `The imagined Godavari Fans planned to make ${EFF.planned.toLocaleString('en-IN')} fans at a total cost of ₹${EFF.costPlanned.toLocaleString('en-IN')}. It made all ${EFF.planned.toLocaleString('en-IN')} fans on time at a total cost of ₹${EFF.costActual.toLocaleString('en-IN')}. What was the actual cost per fan (in ₹)?`,
  sol: `Step 1: Actual cost per fan = total cost ÷ fans made.\nStep 2: ${EFF.costActual} ÷ ${EFF.made} = ${EFF_UNIT_ACTUAL}. So ₹${EFF_UNIT_ACTUAL} per fan, against ₹${EFF_UNIT_PLANNED} planned: the firm was both effective (target met on time) and efficient (lower cost).`,
}));
Q('s_eff_eff', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Distinguish between effectiveness and efficiency in management. Can an organisation be effective without being efficient? Explain briefly.',
  model: '1. **Effectiveness** means achieving the **goal on time**; it concerns the **end result**.\n2. **Efficiency** means using **minimum resources and cost** to get that result; it concerns **input–output** relation.\n3. **Yes:** a firm can meet its target on time but waste money and material, so it is effective but not efficient. Good management aims at **both**.',
  sol: 'Define both terms, state the focus of each, and answer the question with a reason.',
  scheme: [['Effectiveness explained', 1], ['Efficiency explained', 1], ['Yes, with a reason or example', 1]],
}));
Q('s_obj_three', short({
  t: 1, d: 1, c: 'recall', marks: 3, wl: S3,
  stem: 'State the three categories of objectives of management with one example of each.',
  model: '1. **Organisational objectives:** survival, profit and growth, e.g. earning enough revenue to cover costs.\n2. **Social objectives:** creating benefit for society, e.g. using eco-friendly methods or giving jobs to disadvantaged groups.\n3. **Personal objectives:** meeting the needs of employees, e.g. fair pay, recognition and growth.',
  sol: 'One mark for each category with a suitable example.',
  scheme: [['Organisational with example', 1], ['Social with example', 1], ['Personal with example', 1]],
}));
Q('s_pervasive', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why is management described as "pervasive"? Support your answer with two kinds of organisation.',
  model: 'Management is **universal**: the same basic functions are needed in **every** organisation, economic or non-economic, small or large, in every country. For example, a **district hospital** and a **family-run grocery** both need planning, organising and control.',
  sol: 'Meaning of pervasive plus two different organisations as examples.',
  scheme: [['Meaning of pervasive', 1], ['Two suitable organisations', 1]],
}));
Q('s_goal_oriented', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain "management is a goal-oriented process" and "management is multidimensional" as characteristics of management.',
  model: '1. **Goal-oriented:** management unites people\'s efforts to achieve **basic, predetermined goals**, such as increasing sales by a set amount.\n2. **Multidimensional:** it covers management of **work, people and operations** together.',
  sol: 'One mark for each characteristic correctly explained.',
  scheme: [['Goal-oriented explained', 1], ['Multidimensional explained', 1]],
}));
Q('l_importance', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain any five points that show the importance of management for an organisation and for society.',
  model: '1. **Achieves group goals:** it gives a common direction to individual efforts towards the organisation\'s goals.\n2. **Increases efficiency:** better planning, organising and control **reduce costs** and raise productivity.\n3. **Creates a dynamic organisation:** it helps people **adapt to change** in the environment, so the firm stays competitive.\n4. **Achieves personal objectives:** through motivation and leadership, employees meet their own goals while contributing to the organisation.\n5. **Develops society:** it produces **good-quality products**, creates **jobs**, adopts new technology and supports growth.',
  sol: 'Any five standard points, each with a line of explanation.',
  scheme: [['Point 1 with explanation', 1], ['Point 2 with explanation', 1], ['Point 3 with explanation', 1], ['Point 4 with explanation', 1], ['Point 5 with explanation', 1]],
}));
Q('l_characteristics', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain any five characteristics of management.',
  model: '1. **Goal-oriented:** every organisation exists for some basic goals, and management unites the efforts of people to achieve them, e.g. a target of opening ten new outlets in a year.\n2. **Pervasive:** the same basic activities are needed in economic and social organisations alike, in small and large units, and in every country.\n3. **Multidimensional:** it involves managing **work** (the tasks to be done), **people** (as individuals and as groups) and **operations** (turning inputs into outputs).\n4. **Continuous:** the functions of planning, organising, staffing, directing and controlling are performed again and again, and often together.\n5. **Dynamic:** management must adapt the organisation to changes in its environment, such as new technology or changing customer tastes. (Also: group activity; intangible force.)',
  sol: 'Any five characteristics, each with a short explanation.',
  scheme: [['First characteristic', 1], ['Second characteristic', 1], ['Third characteristic', 1], ['Fourth characteristic', 1], ['Fifth characteristic', 1]],
}));

// ================================================================ t02 Science, art, profession
Q('m_art', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Two managers at the imagined Indus Paints read the same management books, yet each handles a strike in her own way, drawing on years of practice and personal style. This shows management as',
  opts: ['an art', 'an exact science', 'a full profession', 'a group activity'],
  sol: 'Personal skill, creativity and practice in applying common knowledge are features of an art.',
}));
Q('m_science_inexact', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Why is management called an **inexact** science?',
  opts: [
    'Its principles deal with human behaviour, so the same principle may not give the same result every time',
    'It has no systematic body of knowledge at all',
    'Its principles are never tested in practice',
    'It is practised only by experts with legal licences',
  ],
  sol: 'Management has systematised knowledge and principles based on observation, but because they deal with people, results cannot be predicted exactly as in physics or chemistry.',
}));
Q('m_profession_lacking', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Which feature of a profession is **not fully** met by management in India today?',
  opts: [
    'Restricted entry through a compulsory licence or degree',
    'A well-defined body of knowledge',
    'Formal methods of acquiring knowledge',
    'A service motive in the work',
  ],
  sol: 'Anyone can be appointed a manager; no degree or licence is legally required, so restricted entry is not met. Management does have a body of knowledge and formal education, and a service motive is expected.',
}));
Q('m_aima', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'Which body in India has laid down a code of conduct for managers, though membership and the code are not legally compulsory?',
  opts: ['All India Management Association (AIMA)', 'Bar Council of India', 'Medical Council of India', 'Institute of Chartered Accountants of India'],
  sol: 'AIMA has a code of conduct for managers, but there is no legal requirement for managers to join it, unlike the councils for lawyers, doctors or chartered accountants.',
}));
Q('ar_art', ar({
  t: 2, d: 3, c: 'analysis', key: 'b',
  a: 'Management is an art.',
  r: 'Management principles are developed through repeated observation and experiment.',
  sol: 'Both are true, but R does not explain A. R describes a feature of science; management is an art because of personal skill, creativity and practice in applying knowledge.',
}));
Q('ar_profession', ar({
  t: 2, d: 3, c: 'analysis', key: 'c',
  a: 'Management does not fully satisfy the features of a profession.',
  r: 'There is a compulsory professional association that all managers in India must join.',
  sol: 'A is true: restricted entry and a compulsory professional body are missing. R is false: no association is compulsory for managers.',
}));
Q('mt_science_art_prof', match({
  t: 2, d: 2, c: 'understanding',
  stem: 'Match each feature with whether it supports management as a science, an art or a profession.',
  pairs: [
    ['Principles based on experiment and observation', 'Science'],
    ['Personal skill and creativity in using knowledge', 'Art'],
    ['A code of conduct and a service motive', 'Profession'],
    ['Perfection through regular practice', 'Art'],
  ],
  sol: 'Experiment-based principles are a feature of science; skill, creativity and practice are features of art; ethics and service motive are features of a profession.',
}));
Q('s_art', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain three features of art that show management is an art.',
  model: '1. **Existence of theoretical knowledge:** a lot of literature on management exists for managers to learn from.\n2. **Personalised application:** each manager applies this knowledge in his or her **own unique way**.\n3. **Based on practice and creativity:** managers improve through **regular practice** and use creativity to find new solutions.',
  sol: 'Three features of art, each linked to management.',
  scheme: [['Theoretical knowledge', 1], ['Personalised application', 1], ['Practice and creativity', 1]],
}));
Q('s_science', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Examine how far management satisfies the features of science.',
  model: '1. **Systematised body of knowledge:** management has its own principles and theories — **satisfied**.\n2. **Principles based on experimentation:** they come from observation and repeated testing — **satisfied**, though tests involve people.\n3. **Universal validity:** results vary because human behaviour is unpredictable — **not fully satisfied**. So management is an **inexact (soft) science**.',
  sol: 'Test each feature of science and conclude.',
  scheme: [['Systematic knowledge', 1], ['Experimentation', 1], ['Universal validity and conclusion', 1]],
}));
Q('l_profession', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Evaluate whether management can be called a profession, examining each feature of a profession.',
  model: '1. **Well-defined body of knowledge:** management has systematic knowledge taught in colleges — **met**.\n2. **Restricted entry:** no degree or licence is legally needed to become a manager — **not met**, though an MBA is preferred.\n3. **Professional association:** bodies such as **AIMA** exist, but membership is **not compulsory** — **not fully met**.\n4. **Ethical code:** AIMA\'s code has **no legal force** — **not fully met**.\n5. **Service motive:** managers are expected to serve stakeholders by providing good-quality products at fair prices — **met**.\n**Conclusion:** management has some features of a profession but **not all**, so it is not a full profession like law or medicine.',
  sol: 'Five features each tested, with a reasoned conclusion.',
  scheme: [['Body of knowledge', 1], ['Restricted entry', 1], ['Association', 1], ['Ethical code', 1], ['Service motive and conclusion', 1]],
}));

// ================================================================ t03 Levels and functions
Q('m_top', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Integrating diverse elements and coordinating the activities of different departments according to overall objectives is the main task of',
  opts: ['top management', 'middle management', 'supervisory management', 'operative workers'],
  sol: 'Top management (chairperson, CEO, board) integrates the whole organisation, frames overall goals and policies, and is responsible for its welfare and survival.',
}));
Q('m_middle', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Ravina, production head at the imagined Narmada Steel, interprets the policies set by the board, assigns duties to her section heads and makes sure her department has enough staff. Ravina belongs to',
  opts: ['middle management', 'top management', 'supervisory management', 'the operative level'],
  sol: 'Interpreting policies of top management, assigning duties and ensuring staffing for a department are functions of middle management, the link between top and lower levels.',
}));
Q('m_supervisory', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Kishore, a foreman at an imagined bottling plant, checks the quality of work daily, keeps up the workers\' morale and passes their problems up to the plant manager. His level of management is',
  opts: ['supervisory or operational management', 'middle management', 'top management', 'none; he is an operative worker'],
  sol: 'Foremen and supervisors directly oversee workers, maintain quality and morale, and communicate workers\' problems upward; this is the supervisory (operational) level.',
}));
Q('m_planning_fn', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Before the monsoon season, the manager of an imagined umbrella maker in Kochi decides how many umbrellas to make, by when, and at what cost. Which function is being performed?',
  opts: ['Planning', 'Organising', 'Directing', 'Controlling'],
  sol: 'Deciding in advance what to do, how and when to do it, and the cost involved is planning.',
}));
Q('m_controlling_fn', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Each month the imagined Shivalik Dairy compares the milk actually collected with its target and finds out why some routes fall short. Which function of management is this?',
  opts: ['Controlling', 'Planning', 'Staffing', 'Organising'],
  sol: 'Comparing actual performance with targets and finding reasons for deviations is controlling.',
}));
Q('m_staffing_fn', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'An imagined start-up in Indore hires three software testers, trains them for two weeks and fixes their pay. Which management function does this show?',
  opts: ['Staffing', 'Directing', 'Planning', 'Coordinating'],
  sol: 'Finding the right people, training them and fixing their pay are parts of staffing.',
}));
Q('ar_levels', ar({
  t: 3, d: 3, c: 'analysis', key: 'a',
  a: 'Supervisory managers play a very important role in an organisation.',
  r: 'They interact directly with the workforce and their efforts decide the quality of output and the morale of workers.',
  sol: 'Both are true, and R explains A: supervisors are the link with the actual workers, so their work directly affects quality, wastage and morale.',
}));
Q('tf_functions_order', tf({
  t: 3, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Only top managers perform the planning function; supervisors only perform controlling.',
  sol: 'All the functions are performed by managers at every level; only the time spent on each function differs by level.',
}));
Q('ord_functions', ord({
  t: 3, d: 1, c: 'recall', marks: 1,
  stem: 'Arrange the functions of management in the order in which they are usually described.',
  items: ['Planning', 'Organising', 'Staffing', 'Directing', 'Controlling'],
  sol: 'The usual sequence is planning, organising, staffing, directing and controlling, though in practice they overlap and are performed together.',
}));
Q('mt_levels', match({
  t: 3, d: 2, c: 'application',
  stem: 'Match each imagined manager at Aravalli Motors with his or her level of management.',
  pairs: [
    ['Managing director who decides to enter the electric-scooter market', 'Top management'],
    ['Plant manager who turns that decision into a production schedule', 'Middle management'],
    ['Assembly-line supervisor who checks daily output and quality', 'Supervisory management'],
  ],
  marks: 3,
  sol: 'Strategic decisions are taken at the top; policies are turned into departmental plans at the middle level; daily output and quality are overseen at the supervisory level.',
}));
Q('fb_middle', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'Middle management is the link between ___ management and ___ management.',
  acc: [['top'], ['supervisory', 'lower', 'operational']],
  sol: 'Middle management links top management and supervisory (lower, operational) management.',
}));
Q('s_top_fn', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State any two functions of top management.',
  model: '1. Framing the **overall objectives and strategies** of the organisation.\n2. Being responsible for the **welfare and survival** of the organisation and its **impact on society**; coordinating the work of all departments.',
  sol: 'Any two correct functions of top management.',
  scheme: [['First function', 1], ['Second function', 1]],
}));
Q('s_middle_fn', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain any three functions of middle management.',
  model: '1. **Interpret policies** framed by top management and turn them into plans for their own departments.\n2. Ensure that their department has the **necessary personnel**, and assign duties and responsibilities to each of them.\n3. **Motivate and direct** the supervisors under them to achieve the desired results, and **cooperate with other departments** so that the organisation works smoothly.',
  sol: 'Three distinct functions, each with a line of explanation.',
  scheme: [['First function', 1], ['Second function', 1], ['Third function', 1]],
}));
Q('s_directing_org', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Briefly explain the functions of organising and directing.',
  model: '1. **Organising:** assigning tasks, grouping them into departments, and **allocating authority and resources** to carry out the plan.\n2. **Directing:** **leading, influencing, motivating and communicating** with employees so that they perform the tasks assigned.',
  sol: 'A clear line on each function.',
  scheme: [['Organising', 1], ['Directing', 1]],
}));
Q('l_functions', long({
  t: 3, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the five functions of management, with an example of each from a school annual-day programme.',
  model: '1. **Planning:** deciding in advance what to do and how — fixing the **date, events and budget** of the annual day.\n2. **Organising:** dividing work and giving authority — forming **committees** for stage, food and invitations.\n3. **Staffing:** putting the right people in each role — choosing **teachers and students** with suitable skills and training them.\n4. **Directing:** leading and motivating — the coordinator **guides and encourages** teams during rehearsals.\n5. **Controlling:** checking progress against the plan — reviewing **rehearsals and spending** and correcting delays.',
  sol: 'All five functions, each defined and illustrated.',
  scheme: [['Planning', 1], ['Organising', 1], ['Staffing', 1], ['Directing', 1], ['Controlling', 1]],
}));
Q('l_levels', long({
  t: 3, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the three levels of management, stating who belongs to each and what they do.',
  model: '1. **Top management:** chairperson, CEO, managing director, board. They frame **overall goals and strategies**, coordinate all departments and are responsible for the firm\'s **survival and its impact on society**.\n2. **Middle management:** heads of departments such as production or finance. They **interpret policies**, assign duties, ensure staff and coordinate with other departments.\n3. **Supervisory (operational) management:** foremen and supervisors. They **oversee workers directly**, maintain **quality and morale**, and pass on workers\' problems and suggestions.\nTogether they form a chain of authority from the top to the workforce.',
  sol: 'Each level with its members and at least two functions; the chain of authority for the final mark.',
  scheme: [['Top: members and functions', 2], ['Middle: members and functions', 1.5], ['Supervisory: members and functions', 1.5]],
}));

// ================================================================ t04 Coordination
Q('m_coord_essence', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Coordination is called the **essence of management** because',
  opts: [
    'it is needed in every function and at every level to bring unity of action',
    'it is a separate function performed only by top management',
    'it is needed only when departments are in conflict',
    'it replaces planning and controlling',
  ],
  sol: 'Coordination is not a separate function; it runs through planning, organising, staffing, directing and controlling at all levels, which is why it is the essence of management.',
}));
Q('m_coord_char', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Which statement about coordination is correct?',
  opts: [
    'It is the responsibility of all managers',
    'It is needed only at the top level',
    'It happens automatically once departments are created',
    'It is performed once at the start of a project',
  ],
  sol: 'Every manager, from the top to the supervisor, must coordinate the work of his or her team; it is a deliberate and continuous process.',
}));
Q('m_coord_case', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'At the imagined Konkan Foods, the sales team promised a big supermarket 10,000 jars of mango pickle in May, but the production team had planned for only 6,000 because no one told them. What was mainly lacking?',
  opts: ['Coordination', 'Staffing', 'Personal objectives', 'Pervasiveness'],
  sol: 'The two departments worked towards different targets because their efforts were not synchronised; that is a failure of coordination.',
}));
Q('m_coord_deliberate', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'Even when people at the imagined Sahyadri Bank are willing to cooperate, a branch manager still holds weekly meetings to schedule their work. This illustrates that coordination is',
  opts: ['a deliberate function', 'a continuous process only', 'pervasive only', 'unnecessary where people cooperate'],
  sol: 'Coordination is deliberate: cooperation alone is not enough, a manager has to consciously synchronise people\'s efforts (timing, sequence and quantity).',
}));
Q('ar_coord', ar({
  t: 4, d: 3, c: 'analysis', key: 'a',
  a: 'The need for coordination increases as an organisation grows in size.',
  r: 'Growth brings more people, more departments and more specialists, whose individual goals and ways of working may differ.',
  sol: 'Both are true and R explains A: size, functional differentiation and specialisation make it harder to keep everyone working together, so more coordination is needed.',
}));
Q('tf_coord_separate', tf({
  t: 4, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Coordination is a separate, sixth function of management performed after controlling.',
  sol: 'Coordination is not a separate function; it is the force that binds all the functions together and is present in each of them.',
}));
Q('s_coord_char', short({
  t: 4, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain any three characteristics of coordination.',
  model: '1. **Integrates group efforts:** it unifies diverse interests into purposeful work activity.\n2. **Ensures unity of action:** it makes departments and people work towards a **common purpose**.\n3. **Continuous and pervasive:** it starts at planning and goes on till controlling, and is needed in **all departments and levels**. (Also: all managers\' responsibility; deliberate function.)',
  sol: 'Any three characteristics, each explained.',
  scheme: [['First characteristic', 1], ['Second characteristic', 1], ['Third characteristic', 1]],
}));
Q('s_coord_need', short({
  t: 4, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'A small bakery with four workers is turning into a chain of twelve outlets. Give two reasons why it will now need more coordination.',
  model: '1. **Growth in size:** many more people with different goals must be made to work as a team.\n2. **Specialisation and functional differentiation:** separate units (baking, delivery, outlets) may each pursue their own targets unless linked.',
  sol: 'Two of size, functional differentiation and specialisation, applied to the bakery.',
  scheme: [['First reason applied', 1], ['Second reason applied', 1]],
}));
Q('l_coord', long({
  t: 4, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: '"Coordination is the essence of management." Analyse this statement and explain why the need for coordination arises in organisations.',
  model: '1. **Essence:** coordination is not a separate function; it is the **force that binds** planning, organising, staffing, directing and controlling, and is needed at **every level**.\n2. **In each function:** e.g. in planning, departmental plans must fit the master plan; in controlling, actual results must match standards set together.\n3. **Need — growth in size:** more people with different needs must be unified towards the organisation\'s goals.\n4. **Need — functional differentiation:** departments such as finance and production may pursue their own objectives and must be linked.\n5. **Need — specialisation:** specialists rely on their own judgement; coordination brings their work together.\nSo, without coordination, management would be a set of disconnected activities.',
  sol: 'Explain why coordination is the essence (two points) and three reasons for its need.',
  scheme: [['Not a separate function; binds all functions', 1], ['Present in every function or level, with illustration', 1], ['Growth in size', 1], ['Functional differentiation', 1], ['Specialisation', 1]],
}));

// ================================================================ case-based (board pattern)
Q('cb_kaveri_levels', caseQ({
  t: [3, 1], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined firm and people, written by SOYL for practice.)*',
  passage: '**Kaveri Agro Machines (imagined), Mysuru**\n\nThe board of Kaveri Agro Machines decided to launch a low-cost power tiller for small farmers and to cut prices by a tenth to build goodwill in villages. Anjali, the production manager, translated this decision into a monthly schedule for her three section heads and asked the HR department for twenty more welders. On the shop floor, supervisor Bhaskar explained the new welding jig to the workers, checked every tenth tiller for defects and reported the workers\' demand for safety gloves to Anjali.',
  parts: [
    child('a', mcq({ t: 3, d: 1, c: 'application', stem: 'At which level of management does Anjali work?', opts: ['Middle management', 'Top management', 'Supervisory management', 'Operative level'], sol: 'She interprets the board\'s decision for her department and arranges staff: middle management.' })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Quote the line showing a function of supervisory management.', model: '"**checked every tenth tiller for defects and reported the workers\' demand for safety gloves to Anjali**" — maintaining quality and passing workers\' problems upward.', sol: 'Any line about Bhaskar\'s direct oversight of workers.', scheme: [['Correct line quoted', 1]] })),
    child('c', short({ t: [1, 3], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify the objective of management shown by the board\'s price cut for small farmers, and explain it.', model: 'This is a **social objective**: the firm is creating **benefit for society** by giving small farmers an affordable machine, beyond earning profit.', sol: 'Name the objective and explain it with the passage.', scheme: [['Social objective', 1], ['Explanation from the passage', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Identify two functions of management performed by Anjali, quoting the lines.', model: '1. **Planning:** "translated this decision into a monthly schedule".\n2. **Staffing:** "asked the HR department for twenty more welders".', sol: 'Two functions, each with a quoted line.', scheme: [['Planning with line', 1], ['Staffing with line', 1]] }),
    ]),
  ],
}));
Q('cb_two_managers', caseQ({
  t: 2, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined people, written by SOYL for practice.)*',
  passage: '**Two branch heads of Sindhu Finance (imagined)**\n\nFarhan and Lata both hold MBA degrees and studied the same principles of motivation. When their teams missed targets, Farhan announced a contest with small rewards and public praise, while Lata held one-to-one talks to understand each officer\'s problems. Both teams improved, each in its own way. Their company does not require managers to join any professional association, though Lata is a member of a management association and follows its code of conduct voluntarily.',
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'application', stem: 'Farhan and Lata applying the same principles in their own ways shows management as', opts: ['an art', 'an exact science', 'a full profession', 'a pervasive force'], sol: 'Personalised application of common knowledge is a feature of art.' })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Quote the line which shows a feature of a profession that is NOT fully met by management.', model: '"**Their company does not require managers to join any professional association**" — membership is not compulsory.', sol: 'The line about voluntary membership.', scheme: [['Correct line quoted', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): State two features of a profession that management does satisfy, with support from the passage.', model: '1. **Body of knowledge:** both studied management principles for an **MBA**.\n2. **Formal education** exists for managers; and Lata\'s voluntary code shows an **ethical code / service motive** is available, though not binding.', sol: 'Two satisfied features, linked to the passage.', scheme: [['First feature with support', 1], ['Second feature with support', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Why did the same principle lead to different actions, and what does this say about management as a science?', model: 'Principles deal with **human behaviour**, which differs from team to team, so managers must adapt them. Hence management is an **inexact (soft) science**: its principles are systematic but not universally exact.', sol: 'Human behaviour, hence inexact science.', scheme: [['Reason: human behaviour varies', 1], ['Conclusion: inexact science', 1]] }),
    ]),
  ],
}));
Q('cb_konkan_coord', caseQ({
  t: 4, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined firm, written by SOYL for practice.)*',
  passage: '**Godavari Garments (imagined), Tiruppur**\n\nGodavari Garments has grown from 40 to 600 workers in five years and now has separate departments for cutting, stitching, finishing and exports. Last month the export department booked an urgent order, but the cutting department was busy with a local order and the finishing unit had sent its best ironers on leave. The order shipped late. The new general manager now holds a short meeting every Monday where all department heads match their weekly plans with the export calendar.',
  parts: [
    child('a', mcq({ t: 4, d: 1, c: 'application', stem: 'The Monday meeting is mainly an attempt at', opts: ['coordination', 'staffing', 'controlling', 'recruitment'], sol: 'Matching departmental plans with a common calendar synchronises effort: coordination.' })),
    child('b', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Quote the line that shows functional differentiation as a reason why coordination is needed.', model: '"**now has separate departments for cutting, stitching, finishing and exports**".', sol: 'The line on separate departments.', scheme: [['Correct line quoted', 1]] })),
    child('c', short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain one other reason, visible in the passage, why the firm needs more coordination now.', model: '**Growth in size:** the firm grew from **40 to 600 workers**; with more people, individual and departmental goals easily drift apart unless deliberately unified.', sol: 'Growth in size, supported by the figures.', scheme: [['Reason identified', 1], ['Explained from the passage', 1]] }), [
      short({ t: 4, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): The owner says, "People here are friendly and cooperative, so we do not need a weekly meeting." Do you agree? Give a reason.', model: '**No.** Cooperation is only willingness to help; coordination is a **deliberate** effort to fix the **timing, sequence and quantity** of work. Friendly departments still shipped the order late.', sol: 'Disagree, explaining coordination as deliberate.', scheme: [['Disagree', 1], ['Reason: coordination is deliberate, beyond cooperation', 1]] }),
    ]),
  ],
}));
Q('cb_tapti_char', caseQ({
  t: [1, 3], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined organisations, written by SOYL for practice.)*',
  passage: '**Notes from a Class 12 visit (imagined)**\n\nOn Monday the students visited Tapti Hospital, a charitable trust; on Wednesday, a private bicycle factory; on Friday, the district sports association. At each place they found someone fixing targets in advance, dividing work among teams, hiring and training staff, guiding people and checking progress. The bicycle factory had recently switched to lighter frames after customers began asking for them. Its manager said, "You cannot see management, but you can feel it — in clean wards, on-time bicycles and well-run matches."',
  parts: [
    child('a', mcq({ t: 1, d: 1, c: 'application', stem: 'Finding management at a hospital, a factory and a sports association shows that management is', opts: ['pervasive', 'dynamic', 'intangible', 'multidimensional'], sol: 'Management is universal across all kinds of organisations: pervasive.' })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Quote the line that shows management as an intangible force.', model: '"**You cannot see management, but you can feel it**".', sol: 'The manager\'s remark.', scheme: [['Correct line quoted', 1]] })),
    child('c', short({ t: [1, 3], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify the characteristic of management shown by the factory\'s switch to lighter frames, and explain it.', model: '**Management is dynamic:** it **adapts to changes** in the environment; when customers wanted lighter bicycles, the factory changed its product.', sol: 'Dynamic, with the passage.', scheme: [['Dynamic', 1], ['Explanation from the passage', 1]] }), [
      short({ t: 3, d: 2, c: 'application', marks: 2, stem: '**Or** (ii): Name any two functions of management that the students observed, quoting the words that show them.', model: '1. **Planning:** "fixing targets in advance".\n2. **Controlling:** "checking progress". (Also organising — "dividing work"; staffing — "hiring and training"; directing — "guiding people".)', sol: 'Any two functions with the matching words.', scheme: [['First function with words', 1], ['Second function with words', 1]] }),
    ]),
  ],
}));
Q('cb_efficiency', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Study the passage and answer the questions that follow. *(Imagined firm and figures, written by SOYL for practice.)*',
  passage: '**Two quarters at Malabar Coir (imagined)**\n\nIn the first quarter the firm promised a retailer 8,000 coir mats and delivered all of them on time, but used extra labour and wasted fibre, so the cost was ₹2,40,000 against a budget of ₹2,00,000. In the second quarter it introduced a new cutting method and worker training; it again delivered 8,000 mats on time, this time at ₹1,92,000. The workers also received a bonus out of the savings.',
  parts: [
    child('a', mcq({ t: 1, d: 2, c: 'application', stem: 'In the first quarter, the firm was', opts: ['effective but not efficient', 'efficient but not effective', 'both effective and efficient', 'neither effective nor efficient'], sol: 'Target met on time (effective), but cost exceeded the budget (not efficient).' })),
    child('b', num({ t: 1, d: 2, c: 'application', marks: 1, value: 24, unit: '₹', stem: 'What was the cost per mat in the second quarter (in ₹)?', sol: 'Step 1: Cost per mat = total cost ÷ mats.\nStep 2: 192000 ÷ 8000 = 24. So ₹24 per mat.' })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Which two objectives of management were met in the second quarter? Support each from the passage.', model: '1. **Organisational objective (profit):** delivering on time at a cost **below budget** improves profit.\n2. **Personal objective:** the workers got **training and a bonus** out of the savings.', sol: 'Two objectives, each with evidence.', scheme: [['Organisational objective with evidence', 1], ['Personal objective with evidence', 1]] }), [
      short({ t: 1, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): "Being effective is enough; efficiency does not matter." Comment with reference to the passage.', model: '**Disagree.** In the first quarter the firm was effective but spent **₹40,000 over budget**, which cuts profit. Good management needs **both**: meeting targets on time and at the lowest cost, as achieved in the second quarter.', sol: 'Disagree, using the overspend and the improved quarter.', scheme: [['Disagree with reason', 1], ['Evidence from the passage', 1]] }),
    ]),
  ],
}));

// ================================================================ more practice items
Q('m_multidim', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'At the imagined Vindhya Cement, one manager looks after the targets for the year, another handles workers\' grievances and growth, and a third schedules kiln operations. Taken together, this shows that management is',
  opts: ['multidimensional', 'intangible', 'an exact science', 'a profession'],
  sol: 'Management of work (targets), people (grievances and growth) and operations (kiln schedule) are the three dimensions of management.',
}));
Q('m_conclusion', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Which conclusion about the nature of management is the most accurate for India today?',
  opts: [
    'It is an art and an inexact science, and it has some but not all features of a profession',
    'It is an exact science like physics',
    'It is a full profession like law, with compulsory licensing',
    'It is neither an art nor a science, only common sense',
  ],
  sol: 'Management uses personal skill (art) and systematic but inexact principles (science); it lacks restricted entry and a binding code, so it is not yet a full profession.',
}));
Q('ar_science', ar({
  t: 2, d: 2, c: 'analysis', key: 'a',
  a: 'Principles of management do not give exactly the same results in every situation.',
  r: 'They deal with human behaviour, which is not fully predictable.',
  sol: 'Both are true, and R explains A: because people react differently, the outcome of applying a principle varies, which is why management is an inexact science.',
}));
Q('s_social_obj', short({
  t: 1, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined paper mill stands on the bank of a river near a group of villages. Suggest two ways in which it can fulfil the social objective of management.',
  model: '1. **Treat its waste water** before releasing it, so the river stays usable for the villagers.\n2. **Employ and train local youth**, and support a village school or health centre from its earnings.',
  sol: 'Two practical actions that benefit society, linked to the mill\'s situation.',
  scheme: [['First suitable action', 1], ['Second suitable action', 1]],
}));
Q('s_levels_time', short({
  t: 3, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'How does the time spent on planning and on directing differ between a top manager and a supervisor? Give a reason.',
  model: 'A **top manager** spends more time on **planning** and organising, because he or she sets long-term goals for the whole firm. A **supervisor** spends more time on **directing**, because he or she works with the workers every day.',
  sol: 'Contrast the two levels and give the reason for each.',
  scheme: [['Top manager: more planning, with reason', 1], ['Supervisor: more directing, with reason', 1]],
}));
Q('s_coord_resp', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain these two features of coordination: it is a continuous process, and it is the responsibility of all managers.',
  model: '1. **Continuous:** it begins at **planning** and goes on till **controlling**; it is never a one-time act.\n2. **All managers:** each manager, from **top to supervisory level**, must synchronise the work of the people under him or her.',
  sol: 'One mark for each feature.',
  scheme: [['Continuous process', 1], ['Responsibility of all managers', 1]],
}));
