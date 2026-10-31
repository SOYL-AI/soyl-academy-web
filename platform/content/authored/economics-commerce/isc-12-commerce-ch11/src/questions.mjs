// ISC 12 Commerce, ch11 Directing — question bank. Every firm, person and situation is imagined and written by
// SOYL and labelled as such; no ISC or CBSE textbook illustration or exercise and no CISCE specimen or board item is
// reused (D-036). Firms, places and set-ups differ from the CBSE 12 Business Studies chapter on directing.
import { Q, mcq, ar, tf, fb, match, short, long, caseQ, child } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 75];
const L5 = [100, 150];

// ================================================================ t01 Directing: meaning and importance
Q('m_dir_def', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'At Lushai Handlooms, an imagined weaving unit in Aizawl, the plan for the winter shawl collection is ready and twenty weavers have been hired. Which function of management will now set the work moving by instructing, guiding and encouraging the weavers?',
  opts: ['Directing', 'Planning', 'Staffing', 'Controlling'],
  sol: 'Plans and people are in place; instructing, guiding, supervising and motivating them so that work actually starts is directing.',
}));
Q('m_dir_integrates', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'The production head of Yamuna Blankets, an imagined mill in Panipat, makes sure that the dyers, weavers and packers time their work so that each team\'s output is ready exactly when the next team needs it. Which point of importance of directing does this show?',
  opts: ['It integrates the efforts of employees', 'It facilitates the introduction of change', 'It brings stability by controlling costs', 'It replaces the need for planning'],
  sol: 'By guiding each team and linking their work, the manager makes individual efforts fit together; directing integrates employees\' efforts.',
}));
Q('m_dir_change', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'When Kallai Timber Mart, an imagined timber yard in Kozhikode, replaced paper registers with tablets, the manager explained the benefits to the clerks, listened to their fears and arranged training, so the new system was accepted without protest. This shows that directing',
  opts: ['helps in introducing changes smoothly', 'is needed only at the top level', 'is a one-time activity', 'is the same as staffing'],
  sol: 'People often resist change; explaining, guiding and motivating them through communication and leadership helps changes go in smoothly.',
}));
Q('ar_dir', ar({
  t: 1, d: 3, c: 'understanding',
  a: 'Directing is said to initiate action in an organisation.',
  r: 'Directing is performed by managers at every level, from the chief executive to the supervisor.',
  key: 'b',
  sol: 'Both statements are true. Directing initiates action because work starts only when people are instructed and guided; the fact that every level performs it (pervasiveness) is true but does not explain this.',
}));
Q('tf_dir', tf({
  t: 1, d: 1, c: 'understanding',
  stem: 'Directing is carried out once, when a new plan is introduced, and then stops until the next plan.',
  ans: false,
  sol: 'False. Managers instruct, guide and motivate people every working day, so directing goes on throughout the life of the organisation.',
}));
Q('fb_dir', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Supervision, motivation, leadership and communication are the four ___ of directing.',
  acc: [['elements', 'element', 'components']],
  sol: 'They are the four elements of directing.',
}));
Q('s_dir_importance', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Rispana Biscuits, an imagined bakery in Dehradun, has just opened a second plant with new staff. State two ways in which directing will help the managers of the new plant.',
  model: '1. **It initiates action:** new staff start work only when managers **instruct and guide** them on recipes and machines.\n2. **It integrates efforts:** guidance links the mixing, baking and packing teams so their work **fits together** towards the plant\'s targets.',
  sol: 'Any two points of importance (initiates action, integrates efforts, motivates, brings stability, facilitates change), linked to the new plant.',
  scheme: [['First point linked to the case', 1], ['Second point linked to the case', 1]],
}));
Q('s3_dir_importance', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Agnigarh Hospital Supplies, an imagined firm in Tezpur, assembles oxygen equipment. Explain how directing helps it (i) get the best out of its technicians, (ii) keep balance between teams, and (iii) bring in a new testing method.',
  model: '(i) **Means of motivation:** through guidance, praise and fair incentives, managers bring out each technician\'s **full potential**.\n(ii) **Stability and balance:** good leadership and communication keep **assembly and testing teams working in step**, avoiding friction.\n(iii) **Facilitates change:** by explaining why the new test is needed and **training staff**, managers reduce resistance so the method is adopted.',
  sol: 'Each point of importance explained and applied to the firm.',
  scheme: [['(i) Motivation explained', 1], ['(ii) Stability and balance explained', 1], ['(iii) Change explained', 1]],
}));
Q('s3_dir_features', short({
  t: 1, d: 2, c: 'application', marks: 3, wl: S3,
  stem: 'In Sky Sarus Airways, an imagined regional airline, the chief executive guides the heads of departments, a duty manager guides the ground crew every shift, and this goes on year after year. Explain three features of directing shown here.',
  model: '1. **Pervasive:** directing is done at **every level**, from the chief executive to the duty manager.\n2. **Continuous:** it goes on **every shift, year after year**, not once.\n3. **Flows from top to bottom:** each superior directs the people **just below**, so instructions move **downward** through the airline.',
  sol: 'Three features (pervasive, continuous, flows downwards; initiates action is also accepted), each linked to the airline.',
  scheme: [['First feature', 1], ['Second feature', 1], ['Third feature', 1]],
}));
Q('l_dir', long({
  t: 1, d: 3, c: 'application', marks: 5, wl: L5,
  stem: '(a) What is meant by directing? [1]\n(b) Shivnath Steel Fabricators, an imagined firm in Bhilai, is installing robotic welding cells and many welders fear for their jobs. Explain four ways in which directing will help the firm through this change. [4]',
  model: '(a) **Directing** is the management function of **instructing, guiding, supervising, motivating and leading** people so that they work towards the organisation\'s goals.\n\n(b) 1. **Facilitates change:** managers **explain** why robots are coming and how welders\' jobs will change, which reduces fear and resistance.\n2. **Initiates action:** clear instructions on **training schedules** start the move from manual to robotic welding.\n3. **Means of motivation:** **assurances, retraining and recognition** of those who learn fast keep welders willing to cooperate.\n4. **Integrates efforts and brings stability:** guidance links **maintenance, welding and quality** teams so that output does not collapse during the change.',
  sol: 'Meaning; four points of importance applied to the change at the firm.',
  scheme: [['(a) Meaning', 1], ['(b) Four points of importance applied', 4]],
}));

// ================================================================ t02 Supervision and span of control
Q('m_sup_meaning', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Hemlata looks after twelve packers at the imagined Chilika Seafoods plant in Puri. She watches their work on the floor, guides them when they go wrong and checks that the day\'s packing is done properly. Hemlata\'s role is best described as',
  opts: ['supervision', 'recruitment', 'planning', 'marketing'],
  sol: 'Overseeing subordinates at work and guiding them so that the work is done as planned is supervision.',
}));
Q('m_sup_training', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Five new welders joined the imagined Shivnath Steel Fabricators in Bhilai. Their supervisor, Mr Ekka, spent the first week at their benches correcting how they held the torch. Which function of a supervisor is this?',
  opts: ['Providing on-the-job training', 'Maintaining group unity', 'Fixing the span of control', 'Preparing the company budget'],
  sol: 'Showing new workers how to do their job at their place of work is on-the-job training, a key supervisory function.',
}));
Q('m_sup_unity', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'At Tawi Dry Fruits, an imagined packing unit in Jammu, the sorting staff split into two groups that refused to share tables. Their supervisor talked to both groups, mixed the seating and set a joint target. Which supervisory function did she perform?',
  opts: ['Maintaining unity and harmony in the work group', 'Giving on-the-job training', 'Preparing long-term plans for the firm', 'Selecting new employees'],
  sol: 'Settling differences and getting the group to work as a team is the supervisor\'s function of maintaining group unity.',
}));
Q('m_span_def', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'In the language of supervision, the number of subordinates that one superior can guide and control effectively is called the',
  opts: ['span of control', 'chain of command', 'unity of command', 'scalar chain'],
  sol: 'This number is the span of control (also called span of management or supervision).',
}));
Q('m_span_narrow', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'At Agnigarh Hospital Supplies (imagined), one supervisor looks after only four technicians who assemble delicate valve parts, while another looks after twenty-five packers doing simple, repeated work. What best explains the difference?',
  opts: ['Complex work needs a narrow span; routine work allows a wide span', 'The first supervisor is less able than the second', 'A wide span is always better than a narrow one', 'Packers do not need any supervision'],
  sol: 'The nature of work is a key factor: complex, delicate work needs close guidance (narrow span), while simple, repetitive work can be supervised with a wide span.',
}));
Q('ar_span', ar({
  t: 2, d: 3, c: 'understanding',
  a: 'A wide span of control can suit workers who do simple, routine jobs.',
  r: 'Routine work needs less frequent guidance from the supervisor.',
  key: 'a',
  sol: 'Both are true, and the reason explains the assertion: because routine work needs little guidance, one supervisor can look after many such workers.',
}));
Q('tf_span', tf({
  t: 2, d: 1, c: 'understanding',
  stem: 'A narrow span of control means that one superior looks after a large number of subordinates.',
  ans: false,
  sol: 'False. A narrow span means few subordinates under one superior; a large number means a wide span.',
}));
Q('fb_span', fb({
  t: 2, d: 3, c: 'analysis',
  stem: 'Complete the analogy. Four technicians under one supervisor : Narrow span :: Thirty packers under one supervisor : ___',
  acc: [['Wide span', 'wide', 'broad span', 'wide span of control']],
  sol: 'A few subordinates per superior is a narrow span; many subordinates per superior is a wide span.',
}));
Q('s_sup_functions', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Rukmini supervises the dyeing section of Yamuna Blankets (imagined), Panipat. State two functions she performs as a supervisor.',
  model: '1. **Link between management and workers:** she passes on **targets and rules** to the dyers and carries their **problems** back to management.\n2. **Ensures work is done as planned:** she **checks colours and quantities** daily and corrects mistakes at once.',
  sol: 'Any two supervisory functions (link pin, group unity, performance as per targets, on-the-job training, morale, feedback, planning daily work), linked to the dyeing section.',
  scheme: [['First function', 1], ['Second function', 1]],
}));
Q('s_span', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is meant by span of control? Why should a supervisor\'s span be neither too wide nor too narrow?',
  model: '**Span of control** means **how many subordinates** a single superior can guide and control well. If it is **too wide**, each worker gets little attention and control weakens; if it is **too narrow**, more supervisors are needed, costs rise and workers feel over-watched.',
  sol: 'Meaning, plus the problem at each extreme.',
  scheme: [['Meaning', 1], ['Problems of too wide and too narrow', 1]],
}));
Q('s3_span_factors', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'The owner of Lakhota Brass Parts, an imagined workshop in Jamnagar, wants to decide how many workers each supervisor should handle. Explain three factors he should consider.',
  model: '1. **Nature of work:** **precision turning** of fittings needs close guidance, so a narrow span; simple **polishing** allows a wider one.\n2. **Ability of the supervisor:** an **experienced, skilled** supervisor can handle more workers.\n3. **Competence of workers:** **trained, experienced** workers need less help, so one supervisor can look after more of them.',
  sol: 'Any three factors (nature of work, ability of supervisor, competence of subordinates, communication techniques, physical spread), each explained.',
  scheme: [['First factor', 1], ['Second factor', 1], ['Third factor', 1]],
}));
Q('s3_sup_functions3', short({
  t: 2, d: 2, c: 'application', marks: 3, wl: S3,
  stem: 'Explain three functions of a supervisor, giving an example of each from an imagined workshop in Udupi that builds bus bodies.',
  model: '1. **Planning and assigning daily work:** the supervisor decides **which team fits panels and which paints** on each bus.\n2. **On-the-job training:** she shows a **new riveter** how to space rivets correctly.\n3. **Building morale and giving feedback:** she **praises** a team that finishes early and reports their **suggestions** on tools to the works manager.',
  sol: 'Three functions, each with a bus-body example.',
  scheme: [['First function with example', 1], ['Second function with example', 1], ['Third function with example', 1]],
}));
Q('l_sup', long({
  t: 2, d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: '(a) Who is a supervisor? [1]\n(b) Explain three functions of a supervisor. [3]\n(c) What is meant by span of control? [1]',
  model: '(a) A **supervisor** is a **first-line manager** who directly **oversees and guides** the workers doing the operational work.\n\n(b) 1. **Link between management and workers:** the supervisor **explains policies and targets** to workers and **conveys their problems and ideas** upward.\n2. **Ensures performance as per targets:** by **watching work closely**, the supervisor spots mistakes early and sees that daily output, quality and safety standards are met.\n3. **Maintains group unity and morale:** the supervisor **settles disputes**, encourages teamwork and **keeps spirits high**, so that workers cooperate willingly.\n\n(c) **Span of control** is the **number of subordinates** that one superior can **supervise effectively**.',
  sol: 'Meaning of supervisor; three functions; meaning of span of control.',
  scheme: [['(a) Supervisor', 1], ['(b) Three functions', 3], ['(c) Span of control', 1]],
}));

// ================================================================ t03 Motivation and Maslow
Q('m_mot_meaning', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'The manager of Shevaroy Steel Utensils, an imagined factory in Salem, wants her workers to put in their best effort willingly, not only because they are told to. What she needs to do is',
  opts: ['motivate them by meeting their needs and stimulating them to act', 'raise the span of control', 'reduce the number of supervisors', 'change the firm\'s objectives'],
  sol: 'Motivation is the process of stimulating people to act willingly towards goals by satisfying their needs.',
}));
Q('m_maslow_phys', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Pakhi, newly hired as a helper at an imagined roadside eatery in Gaya, wants above all a wage that covers food and rent for her family. Which need in Maslow\'s hierarchy is she trying to satisfy?',
  opts: ['Physiological (basic) need', 'Esteem need', 'Self-actualisation need', 'Social need'],
  sol: 'Food, shelter and the wage to pay for them are basic physiological needs, at the bottom of the hierarchy.',
}));
Q('m_maslow_safety', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'After years on day-to-day engagement, the boat crews of Loktak Fish Farms, an imagined fishery in Imphal, ask for written contracts and accident insurance. Which need are they trying to satisfy?',
  opts: ['Safety or security need', 'Esteem need', 'Social need', 'Self-actualisation need'],
  sol: 'Job security and protection against accidents meet safety (security) needs.',
}));
Q('m_maslow_social', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'To help recruits from other states feel they belong, the HR team of Swarna River Software, an imagined firm in Udupi, pairs each newcomer with a buddy and holds a monthly team lunch. Which level of Maslow\'s hierarchy does this mainly target?',
  opts: ['Social (belongingness) need', 'Physiological need', 'Safety need', 'Self-actualisation need'],
  sol: 'Friendship, acceptance and a sense of belonging are social needs.',
}));
Q('m_maslow_esteem', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'The best moulder of the month at Kundanagari Foundry, an imagined foundry in Belagavi, gets a citation from the managing director and her photograph on the notice board. This appeals mainly to the',
  opts: ['esteem need', 'safety need', 'physiological need', 'social need'],
  sol: 'Recognition, status and respect from others satisfy esteem needs.',
}));
Q('m_maslow_self', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'Arvind, a senior engineer at Waltair Marine Fittings, an imagined firm in Visakhapatnam, has a good salary, a secure job, close friends at work and a respected title. He now wants to design a new propeller entirely by himself to see how far his abilities can take him. Which need is now active?',
  opts: ['Self-actualisation need', 'Esteem need', 'Safety need', 'Social need'],
  sol: 'His lower needs are met; the urge to realise his full potential is self-actualisation, the highest need.',
}));
Q('m_maslow_incentive', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'Workers at Subarnarekha Agro Tools, an imagined maker of farm tools in Ranchi, earn fair wages, have permanent jobs and get on well with one another. According to Maslow, which incentive is most likely to motivate them further?',
  opts: ['Public recognition of good work and promotion to a respected title', 'A small rise in the canteen subsidy', 'A longer job contract', 'A staff picnic'],
  sol: 'Physiological, safety and social needs are satisfied, so they no longer motivate much; esteem needs are next, and recognition and status meet them.',
}));
Q('ar_maslow', ar({
  t: 3, d: 3, c: 'understanding',
  a: 'A need that is reasonably satisfied no longer motivates a person strongly.',
  r: 'According to Maslow, once a lower need is reasonably met, the next higher need becomes the main motivator.',
  key: 'a',
  sol: 'Both are true, and the reason explains the assertion: behaviour is driven by the next unmet need, not by needs already met.',
}));
Q('ar_maslow_false', ar({
  t: 3, d: 3, c: 'analysis',
  a: 'According to Maslow, self-actualisation is the first need that a new worker tries to satisfy.',
  r: 'Physiological needs are at the top of Maslow\'s need hierarchy.',
  key: 'd',
  sol: 'Both statements are false. Physiological needs come first and sit at the bottom of the hierarchy; self-actualisation is at the top and comes last.',
}));
Q('tf_maslow', tf({
  t: 3, d: 1, c: 'understanding',
  stem: 'In Maslow\'s hierarchy, esteem needs come below safety needs.',
  ans: false,
  sol: 'False. The order from the bottom is physiological, safety, social, esteem and self-actualisation, so esteem is above safety.',
}));
Q('fb_maslow', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'In Maslow\'s hierarchy, the need for status, recognition and self-respect is called the ___ need.',
  acc: [['esteem', 'ego', 'esteem or ego']],
  sol: 'These form the esteem (ego) need.',
}));
Q('mt_maslow', match({
  t: 3, d: 3, c: 'application', marks: 2,
  stem: 'Match each incentive offered at Dharwad Pedha House, an imagined sweet maker in Hubballi, with the need it mainly satisfies.',
  pairs: [
    ['A fair basic wage paid on time', 'Physiological need'],
    ['Provident fund and a written job contract', 'Safety need'],
    ['Festival celebrations with staff families', 'Social need'],
    ['The title "Master Confectioner" for a senior cook', 'Esteem need'],
  ],
  sol: 'Wages meet basic needs; provident fund and contracts give security; shared celebrations meet the need to belong; a respected title meets esteem.',
}));
Q('s_maslow_assump', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two assumptions on which Maslow\'s need hierarchy theory rests.',
  model: '1. **Behaviour depends on needs:** people act in order to **satisfy unmet needs**.\n2. **Needs follow an order:** a person moves to a **higher need** only after the **lower one is reasonably satisfied**, and a satisfied need no longer motivates.',
  sol: 'Any two assumptions (needs drive behaviour; hierarchical order; satisfied need stops motivating; move up once a lower need is met).',
  scheme: [['First assumption', 1], ['Second assumption', 1]],
}));
Q('s_incentive_levels', short({
  t: 3, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Suggest one suitable incentive for each employee of Chilika Seafoods (imagined), Puri: (i) Sunita, a new packer who struggles to pay her rent; (ii) Gopal, a senior quality checker who wants respect for his twenty years of service.',
  model: '(i) Sunita has an unmet **physiological need**: a **fair wage paid on time** or a small **advance** would motivate her.\n(ii) Gopal seeks **esteem**: **public recognition**, a long-service award or a senior title would motivate him.',
  sol: 'An incentive matched to each person\'s active need.',
  scheme: [['(i) Incentive for physiological need', 1], ['(ii) Incentive for esteem need', 1]],
}));
Q('s3_maslow_levels', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Tawi Dry Fruits (imagined), Jammu, pays fair wages and offers secure jobs, yet workers say that nobody notices their effort and they rarely meet as a team. Using Maslow\'s theory, identify two unmet needs with an incentive for each, and name the need the firm should plan for next.',
  model: '1. **Social need:** workers rarely meet as a team; **team outings, shared lunch breaks** or group projects would meet it.\n2. **Esteem need:** effort goes unnoticed; **recognition schemes, praise** and titles for good work would meet it.\n3. **Next: self-actualisation.** Once these are met, the firm should offer **challenging tasks, autonomy** and chances to learn.',
  sol: 'Social and esteem needs identified with incentives; self-actualisation named as the next level.',
  scheme: [['Social need with incentive', 1], ['Esteem need with incentive', 1], ['Next level: self-actualisation', 1]],
}));
Q('l_maslow', long({
  t: 3, d: 3, c: 'application', marks: 5, wl: L5,
  stem: '(a) Define motivation. [1]\n(b) The HR manager of Kallai Timber Mart (imagined), Kozhikode, wants a ladder of incentives for her staff. Using Maslow\'s theory, name the five needs from the lowest to the highest and suggest one incentive for each. [4]',
  model: '(a) **Motivation** is the process of **stimulating people to act willingly** towards desired goals by **satisfying their needs**.\n\n(b) 1. **Physiological needs:** food, clothing, shelter — a **fair wage paid on time** and meal allowances.\n2. **Safety needs:** security of job and income — **permanent posts, provident fund** and insurance.\n3. **Social needs:** belonging and friendship — **team events** and friendly work groups.\n4. **Esteem needs:** status and recognition — **awards, titles and praise** in staff meetings.\n5. **Self-actualisation needs:** realising one\'s potential — **challenging projects**, freedom to try new methods and chances to learn.',
  sol: 'Definition; five needs in order, each with a suitable incentive.',
  scheme: [['(a) Definition', 1], ['(b) Five needs in correct order', 2], ['(b) Suitable incentives', 2]],
}));

// ================================================================ t04 Leadership (styles: meaning only)
Q('m_lead_meaning', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Without any formal power over them, Meera, a senior nurse at an imagined clinic in Gwalior, gets the younger nurses to follow new hygiene routines willingly. This shows Meera\'s',
  opts: ['leadership: the ability to influence people to work willingly towards goals', 'span of control', 'authority to punish', 'skill in recruitment'],
  sol: 'Influencing the behaviour of others so that they work willingly towards shared goals is leadership.',
}));
Q('m_autocratic', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'In the final week before a delivery deadline, the yard manager of Waltair Marine Fittings (imagined) takes every decision himself, gives exact orders and allows no discussion. Which leadership style is this?',
  opts: ['Autocratic', 'Democratic', 'Laissez-faire', 'Bureaucratic'],
  sol: 'A leader who keeps all decision-making power and expects obedience follows the autocratic style.',
}));
Q('m_democratic', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Before changing shift timings at Lakhota Brass Parts (imagined), the plant head calls a meeting, invites suggestions from the workers and then decides along with them. Which leadership style is this?',
  opts: ['Democratic (participative)', 'Autocratic', 'Laissez-faire', 'Bureaucratic'],
  sol: 'Consulting subordinates and deciding with them is the democratic or participative style.',
}));
Q('m_laissez', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'The editor of an imagined travel magazine in Dharamshala gives her experienced writers a broad theme and leaves them free to choose their places, angles and working hours, stepping in only when asked. Which leadership style is this?',
  opts: ['Laissez-faire (free-rein)', 'Autocratic', 'Bureaucratic', 'Democratic'],
  sol: 'Giving the group almost complete freedom to decide and act is the laissez-faire or free-rein style.',
}));
Q('m_bureaucratic', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'At an imagined state transport depot in Jammu, the depot manager decides every leave request strictly according to the rule book and the chain of authority, refusing any exception. Which leadership style is this?',
  opts: ['Bureaucratic', 'Laissez-faire', 'Democratic', 'Autocratic'],
  sol: 'Leading by fixed rules, procedures and official channels is the bureaucratic style. (An autocrat decides by personal will, not by the rule book.)',
}));
Q('ar_lead', ar({
  t: 4, d: 3, c: 'analysis',
  a: 'A laissez-faire style can work well with highly skilled, self-motivated employees.',
  r: 'Under the laissez-faire style, the leader takes all decisions alone.',
  key: 'c',
  sol: 'The assertion is true: skilled, self-driven people can use freedom well. The reason is false: under laissez-faire the group decides; deciding alone is autocratic.',
}));
Q('tf_bureau', tf({
  t: 4, d: 1, c: 'understanding',
  stem: 'Under bureaucratic leadership, the leader manages strictly according to rules, procedures and official channels.',
  ans: true,
  sol: 'True. A bureaucratic leader goes by the book, following set rules, procedures and the chain of authority.',
}));
Q('mt_lead', match({
  t: 4, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each leadership style with what the leader of a team of delivery riders would do under it.',
  pairs: [
    ['Autocratic', 'Fixes every route himself and expects riders to obey'],
    ['Democratic', 'Plans the routes after discussing them with the riders'],
    ['Laissez-faire', 'Lets the riders work out their own routes'],
    ['Bureaucratic', 'Assigns routes strictly as laid down in the company manual'],
  ],
  sol: 'Autocratic: leader decides alone. Democratic: decides after consulting. Laissez-faire: group decides. Bureaucratic: rules decide.',
}));
Q('s_lead_styles', short({
  t: 4, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Identify the leadership style in each situation at Panchganga Leather Works, an imagined footwear unit in Kolhapur: (i) the owner asks the stitchers to vote on the design of a new sandal; (ii) the owner insists that every step in the procedure manual be followed exactly, without exception.',
  model: '(i) **Democratic (participative):** the owner **involves the stitchers** in the decision through a vote.\n(ii) **Bureaucratic:** the owner leads **strictly by rules and procedures** in the manual, allowing no exceptions.',
  sol: 'Each style identified with a reason from the situation.',
  scheme: [['(i) Democratic with reason', 1], ['(ii) Bureaucratic with reason', 1]],
}));
Q('s3_lead', short({
  t: 4, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'What is leadership? Explain the meaning of the democratic and the laissez-faire styles of leadership.',
  model: '1. **Leadership** is the ability of a manager to **influence the behaviour of people** so that they work **willingly** towards the group\'s goals.\n2. **Democratic style:** the leader **consults subordinates**, welcomes their ideas and takes decisions **with the group**.\n3. **Laissez-faire style:** the leader gives the group **near-complete freedom** to set its own methods and decisions and acts mainly as a **contact and resource person**.',
  sol: 'Meaning of leadership and of each style.',
  scheme: [['Leadership', 1], ['Democratic style', 1], ['Laissez-faire style', 1]],
}));

// ================================================================ t05 Communication
Q('m_encoding', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'Sanjana, sales head of Shevaroy Steel Utensils (imagined), puts her idea of a festive dealer discount into a short voice message in Tamil before sending it to the dealers. Turning the idea into spoken words is called',
  opts: ['encoding', 'decoding', 'feedback', 'noise'],
  sol: 'Converting an idea into words, symbols or gestures that can be sent is encoding; the receiver later decodes it.',
}));
Q('m_feedback', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'After a talk on new hygiene steps, the trainer at Rispana Biscuits (imagined) asks each baker to repeat the steps in their own words. The trainer is seeking',
  opts: ['feedback', 'encoding', 'a new channel', 'noise'],
  sol: 'The receiver\'s response, which shows whether the message was understood, is feedback.',
}));
Q('m_noise', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'During a phone call, a dealer of Yamuna Blankets (imagined) cannot hear the new prices clearly because looms are running loudly next to the caller. In the communication process, this disturbance is called',
  opts: ['noise', 'feedback', 'decoding', 'the medium'],
  sol: 'Anything that disturbs or distorts a message on its way, such as loud machines, is noise.',
}));
Q('m_semantic', mcq({
  t: 5, d: 3, c: 'application',
  stem: 'A notice at Chilika Seafoods (imagined) was translated into Odia using a word for "shift" that can also mean "move house", so workers thought the plant was relocating. Which barrier to communication is this?',
  opts: ['Semantic barrier (faulty translation)', 'Psychological barrier', 'Organisational barrier', 'Personal barrier of the superior'],
  sol: 'Barriers arising from words, language and their meanings, including faulty translation, are semantic barriers.',
}));
Q('m_psych', mcq({
  t: 5, d: 3, c: 'application',
  stem: 'Workers at Kundanagari Foundry (imagined) were twice promised higher bonuses that never came. When the manager announced a new bonus scheme, nobody believed him. Which barrier to communication is at work?',
  opts: ['Psychological barrier (distrust)', 'Semantic barrier', 'Organisational barrier', 'Noise in the channel'],
  sol: 'Distrust from past experience makes receivers doubt the message; such barriers of attitude and emotion are psychological.',
}));
Q('m_org', mcq({
  t: 5, d: 3, c: 'application',
  stem: 'At Agnigarh Hospital Supplies (imagined), every suggestion from workers must be written on a set form and signed by three officers before it reaches management, so workers have stopped making suggestions. Which barrier is this?',
  opts: ['Organisational barrier (rigid rules and procedures)', 'Semantic barrier', 'Psychological barrier', 'Encoding error by the sender'],
  sol: 'Barriers created by the firm\'s rules, structure and procedures are organisational barriers.',
}));
Q('m_personal', mcq({
  t: 5, d: 3, c: 'application',
  stem: 'The production head of Subarnarekha Agro Tools (imagined) never answers workers\' questions and looks annoyed whenever they come to him, so they have stopped reporting problems. Which barrier is this?',
  opts: ['Personal barrier (attitude of the superior)', 'Semantic barrier', 'Organisational barrier', 'Noise'],
  sol: 'A superior\'s unwillingness to listen or to welcome communication from below is a personal barrier.',
}));
Q('ar_comm', ar({
  t: 5, d: 3, c: 'analysis',
  a: 'Using technical jargon with untrained workers can cause a semantic barrier.',
  r: 'Feedback is the last element of the communication process.',
  key: 'b',
  sol: 'Both are true, but the position of feedback in the process does not explain why jargon blocks understanding; that is about words the receiver does not know.',
}));
Q('tf_comm', tf({
  t: 5, d: 1, c: 'understanding',
  stem: 'Decoding means putting an idea into words, symbols or gestures before sending it.',
  ans: false,
  sol: 'False. That describes encoding, done by the sender; decoding is the receiver working out the meaning.',
}));
Q('fb_comm', fb({
  t: 5, d: 3, c: 'analysis',
  stem: 'Complete the analogy. Sender : Encoding :: Receiver : ___',
  acc: [['Decoding', 'decode']],
  sol: 'The sender encodes the message; the receiver decodes it.',
}));
Q('s_comm_objectives', short({
  t: 5, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'State two objectives that the manager of Loktak Fish Farms (imagined), Imphal, can achieve through a weekly meeting with the boat crews.',
  model: '1. **To inform and instruct:** crews learn the week\'s **catch targets, routes and safety rules**.\n2. **To get feedback and build relations:** crews raise **problems and ideas**, which improves trust and **coordination** between boats.',
  sol: 'Any two objectives (inform, instruct, motivate, coordinate, educate, get feedback, build relations) linked to the meeting.',
  scheme: [['First objective', 1], ['Second objective', 1]],
}));
Q('s_barrier_overcome', short({
  t: 5, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Suggest two ways in which the manager of Kundanagari Foundry (imagined) can overcome the distrust that made workers disbelieve the new bonus scheme.',
  model: '1. **Act consistently:** pay the bonus **on the promised date** and announce only what will be delivered, so **actions match words**.\n2. **Two-way communication:** meet workers, **explain the scheme in writing** and **invite questions**, then follow up on concerns.',
  sol: 'Two measures that rebuild trust (consistency, follow-up, two-way talk, written confirmation, listening).',
  scheme: [['First measure', 1], ['Second measure', 1]],
}));
Q('s3_comm_process', short({
  t: 5, d: 2, c: 'application', marks: 3, wl: S3,
  stem: 'The manager of an imagined bus depot in Salem announces a new night-route timetable to drivers. Explain the elements of the communication process using this example.',
  model: '1. **Sender and encoding:** the **manager** turns the new timetable into a **clear notice** with times and routes.\n2. **Channel, receiver and decoding:** the notice goes on the **board and the drivers\' group**; **drivers** read it and work out what it means for their shifts.\n3. **Feedback and noise:** drivers **ask questions or confirm**; a **crowded board** or unclear print is noise that can distort the message.',
  sol: 'All the elements explained in order with the depot example.',
  scheme: [['Sender and encoding', 1], ['Channel, receiver and decoding', 1], ['Feedback and noise', 1]],
}));
Q('s3_barriers', short({
  t: 5, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'At Panchganga Leather Works (imagined), (i) a notice uses the English words "per cent wastage norm" that stitchers do not follow, (ii) workers fear any change means job cuts, and (iii) ideas from the floor must pass through four officers. Identify the barrier in each case and suggest one remedy for each.',
  model: '(i) **Semantic barrier:** use **simple Marathi words** and show an example instead of jargon.\n(ii) **Psychological barrier (fear):** the owner should **meet workers**, explain the change honestly and **assure** them about jobs.\n(iii) **Organisational barrier:** cut the layers; allow a **suggestion box or direct meetings** with the owner.',
  sol: 'Each barrier correctly identified with a matching remedy.',
  scheme: [['(i) Semantic with remedy', 1], ['(ii) Psychological with remedy', 1], ['(iii) Organisational with remedy', 1]],
}));
Q('l_comm', long({
  t: 5, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: '(a) Define communication. [1]\n(b) The new manager of Indravati Forest Produce Cooperative, an imagined society in Jagdalpur, finds that (i) gatherers misread price notices written in formal Hindi, (ii) they distrust the society after earlier delays in payment, and (iii) every complaint must pass through two clerks before he sees it. Identify each barrier and suggest how to overcome it. [3]\n(c) Why should the manager seek feedback after making a change? [1]',
  model: '(a) **Communication** is the process of **exchanging ideas, facts and feelings** between two or more persons so as to create **common understanding**.\n\n(b) (i) **Semantic barrier:** formal words confuse the gatherers; the manager should use **simple local language, pictures** and read notices aloud at collection points.\n(ii) **Psychological barrier (distrust):** past delays make them doubt messages; he should **pay on time**, keep promises and explain any delay openly.\n(iii) **Organisational barrier:** too many layers block complaints; he should hold **open meetings** or let gatherers **reach him directly**.\n\n(c) **Feedback** shows whether the gatherers **understood** the change correctly, so he can **correct** any confusion quickly.',
  sol: 'Definition; three barriers identified with remedies; purpose of feedback.',
  scheme: [['(a) Definition', 1], ['(b) Three barriers with remedies', 3], ['(c) Feedback', 1]],
}));

// ================================================================ case-based
Q('cb_sup_mot', caseQ({
  t: [2, 3], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined firm and people, written by SOYL for practice.)*',
  passage: '**Mahanadi Rice Exports (imagined), Raipur**\n\nRanjit supervises forty sorters at the mill, and new joiners often wait days before anyone shows them how to grade grain. Many sorters are on daily wages and worry about losing work in the lean season. The senior sorters, who have been with the mill for years, earn well but complain that their skill is never acknowledged.',
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'application', stem: 'New joiners wait days before anyone shows them how to grade grain. Which supervisory function is being neglected?', opts: ['On-the-job training', 'Maintaining group unity', 'Linking management with workers', 'Fixing wages'], sol: 'Teaching new workers their job at the workplace is on-the-job training.' })),
    child('b', short({ t: 2, d: 3, c: 'analysis', marks: 1, stem: 'What does the passage suggest about Ranjit\'s span of control?', model: 'It is **too wide**: forty sorters are too many for one supervisor to guide closely.', sol: 'A very wide span; one supervisor cannot give enough attention.', scheme: [['Span too wide, with reason', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify the need of the daily-wage sorters and suggest one incentive for it.', model: '**Safety (security) need:** they fear losing work. **Incentive:** **permanent or longer contracts** with a provident fund.', sol: 'Safety need with a matching incentive.', scheme: [['Need identified', 1], ['Incentive', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Identify the need of the senior sorters and suggest one incentive for it.', model: '**Esteem need:** their skill goes unrecognised. **Incentive:** **titles such as master grader**, awards and public praise.', sol: 'Esteem need with a matching incentive.', scheme: [['Need identified', 1], ['Incentive', 1]] }),
    ]),
  ],
}));
Q('cb_lead_comm', caseQ({
  t: [4, 5], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined firm and people, written by SOYL for practice.)*',
  passage: '**Sur Sangam Instruments (imagined), Gwalior**\n\nThe workshop makes tanpuras and sitars. Its two section heads lead very differently. Ustad Karim, head of the carving section, lets his master carvers choose their own designs and timelines and helps only when asked. Ms Bhadoria, head of finishing, asks her team for ideas every Monday and decides with them. Last month a notice from the office about "humidity-controlled curing" confused the finishers, who did not know the term.',
  parts: [
    child('a', mcq({ t: 4, d: 2, c: 'application', stem: 'Ustad Karim\'s style of leadership is', opts: ['laissez-faire', 'autocratic', 'bureaucratic', 'democratic'], sol: 'Leaving skilled carvers free to decide, with help only on request, is the laissez-faire style.' })),
    child('b', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Name the leadership style of Ms Bhadoria.', model: '**Democratic (participative)** style.', sol: 'She consults the team and decides with them: democratic.', scheme: [['Democratic', 1]] })),
    child('c', short({ t: 5, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify the barrier caused by the office notice and suggest how the office could overcome it.', model: '**Semantic barrier:** a technical term the finishers did not know. The office should use **simple words**, explain the term or **demonstrate** the process.', sol: 'Semantic barrier with a remedy.', scheme: [['Barrier', 1], ['Remedy', 1]] }), [
      short({ t: 5, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Explain how feedback could have prevented the confusion over the notice.', model: 'If the office had **asked finishers to confirm** what they understood, it would have found the **term was unclear** and explained it before work went wrong.', sol: 'Feedback reveals misunderstanding early so it can be corrected.', scheme: [['Role of feedback', 1], ['Applied to the notice', 1]] }),
    ]),
  ],
}));
