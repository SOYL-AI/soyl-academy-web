// ISC 12 Commerce, ch06 Nature and Significance of Management — question bank. Every firm, person and situation is
// imagined and written by SOYL and labelled as such; no ISC or CBSE textbook illustration or exercise and no CISCE
// specimen or board item is reused (D-036). Firms, people and set-ups differ from CBSE 12 Business Studies ch01.
import { Q, mcq, ar, tf, fb, match, short, long, caseQ, child } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 75];
const L5 = [100, 150];

// ================================================================ t01 Meaning: activity, group, discipline, process
Q('m_process', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'On their first morning, new supervisors at the imagined Lonavla Chikki Works are told that their job runs as a chain: decide the week\'s targets, arrange people and machines, fill vacancies, guide the team and then compare results with the targets. In this talk, management is being described as',
  opts: ['a process', 'a group', 'a discipline', 'a profession'],
  sol: 'A series of inter-related functions (planning, organising, staffing, directing, controlling) carried out one after another is management seen as a process.',
}));
Q('m_group', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A notice on the canteen board of the imagined Hampi Stoneware reads: "The management has approved two extra holidays for the harvest festival." Here the word management refers to',
  opts: ['the group of persons who manage the firm', 'a subject taught in colleges', 'the series of functions such as planning and controlling', 'the personal skill of one manager'],
  sol: 'The notice speaks of the people in charge who took a decision, so management is used in the sense of a group (the body of managers).',
}));
Q('m_discipline', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Farida, a commerce graduate from Bhopal, joins an imagined two-year course where she reads case studies, learns principles of running organisations and writes a research project. For Farida, management is',
  opts: ['a discipline, that is, a field of study', 'a group of top officials', 'an activity of decision making on a shop floor', 'a profession with compulsory entry rules'],
  sol: 'An organised body of knowledge that is taught and studied is management as a discipline.',
}));
Q('m_activity', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The manager of the imagined Majuli Mask Studio spends one day meeting a museum buyer, passing on news of a craft fair to the artisans and deciding which of three orders to accept. Seen as interpersonal, informational and decisional tasks, this shows management as',
  opts: ['an activity', 'a discipline', 'a group', 'a science'],
  sol: 'Meeting people (interpersonal), passing on news (informational) and choosing between orders (decisional) are the things managers do: management as an activity.',
}));
Q('tf_discipline', tf({
  t: 1, d: 1, c: 'recall',
  stem: 'Management as a discipline means the organised body of knowledge about managing that is taught and studied in schools and colleges.',
  ans: true,
  sol: 'True. As a discipline, management is a field of study with its own concepts, principles and literature.',
}));
Q('fb_meaning', fb({
  t: 1, d: 3, c: 'analysis',
  stem: 'Complete the analogy. "The management has declared a bonus" : management as a group :: "My sister is doing a degree in management" : management as a ___',
  acc: [['discipline', 'field of study', 'subject']],
  sol: 'The first sentence refers to the people in charge (a group); the second refers to a subject one studies, that is, a discipline.',
}));
Q('ar_process', ar({
  t: 1, d: 2, c: 'understanding',
  a: 'Management is often described as a process.',
  r: 'It is made up of a series of inter-related functions such as planning, organising, staffing, directing and controlling.',
  key: 'a',
  sol: 'Both are true, and the chain of linked functions is exactly what makes management a process.',
}));
Q('mt_meaning', match({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Match each sentence heard at an imagined tea-garden office in Darjeeling with the sense in which it uses the word management.',
  pairs: [
    ['"Our management has decided to open a tasting room."', 'Group'],
    ['"Management is my favourite subject at college."', 'Discipline'],
    ['"Plan, organise, staff, direct and control: that is management."', 'Process'],
    ['"Most of a manager\'s day goes in meeting people, sharing news and taking decisions."', 'Activity'],
  ],
  sol: 'People in charge form a group; a subject of study is a discipline; a chain of functions is a process; what managers do every day is an activity.',
}));
Q('s_meaning', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain the meaning of management as a group and as a discipline.',
  model: '1. **As a group:** management means the **body of persons** who manage an organisation, from the board and chief executive down to supervisors, as in "the management has decided".\n2. **As a discipline:** it is an **organised field of study** with its own principles, taught in schools and colleges.',
  sol: 'Each sense explained.',
  scheme: [['Management as a group', 1], ['Management as a discipline', 1]],
}));
Q('s3_meaning', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Tsering runs the imagined Dhauladhar Trekking Company. Using her work as the example, explain management as an activity, giving one example each of an interpersonal, an informational and a decisional activity.',
  model: '1. **Interpersonal activity:** Tsering **meets guides, porters and clients**, leads the team and settles quarrels on the trail.\n2. **Informational activity:** she **collects weather and permit news** and **passes it on** to guides and trekkers before each trip.\n3. **Decisional activity:** she **decides** whether a trek goes ahead in bad weather, which routes to offer and how to share the budget.',
  sol: 'One example of each kind of activity, linked to the trekking firm.',
  scheme: [['Interpersonal with example', 1], ['Informational with example', 1], ['Decisional with example', 1]],
}));
Q('s3_process', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'A youth club runs an imagined village library near Nalanda. Explain management as a process by showing how three of its functions would be carried out at the library.',
  model: '1. **Planning:** the club **decides in advance** to lend 300 books a month and to open on Sunday mornings.\n2. **Organising and staffing:** it **divides tasks** such as issuing books and repairing covers, and **picks volunteers** suited to each task.\n3. **Controlling:** at the end of each month it **compares** books actually lent with the target and finds the reasons for any shortfall. Each function leads into the next.',
  sol: 'Management as a chain of functions, with three functions applied to the library.',
  scheme: [['First function applied', 1], ['Second function applied', 1], ['Third function applied with the link between them', 1]],
}));

// ================================================================ t02 Objectives and characteristics
Q('m_survival', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'After two seasons of landslides kept tourists away, the imagined Dhauladhar Trekking Company cut its costs, rented out its tents and earned just enough to cover its expenses and stay open. Which objective of management did it put first?',
  opts: ['Survival, an organisational objective', 'Growth, an organisational objective', 'A social objective', 'A personal objective'],
  sol: 'Earning enough to cover costs and remain in business is the organisational objective of survival.',
}));
Q('m_social', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'The imagined Chilika Prawn Exports buys only from fishers who respect the closed breeding season, treats its waste water before release and runs an evening school for fishers\' children. These steps serve which objective of management?',
  opts: ['Social objectives', 'Organisational objectives', 'Personal objectives', 'Only the profit objective'],
  sol: 'Using eco-friendly methods and giving back to the community are social objectives: creating benefit for society.',
}));
Q('m_personal', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Each month the imagined Coorg Pepper House names a "grader of the month", pays for evening computer classes for workers who want them, and revises wages every year in line with prices. These policies serve mainly the',
  opts: ['personal objectives of management', 'social objectives of management', 'organisational objective of growth', 'organisational objective of survival'],
  sol: 'Fair pay (financial needs), recognition (social needs) and chances to learn (higher-level needs) meet the personal objectives of employees.',
}));
Q('m_org_combo', mcq({
  t: 2, d: 3, c: 'analysis', fixed: true, key: 'c',
  stem: 'The owner of the imagined Bhimtal Candles lists four aims for the next three years:\nP. Earn enough to stay in business through the slack summer months.\nQ. Open two more shops in nearby hill towns.\nR. Give jobs to women from nearby villages.\nS. Earn a surplus over costs to reward the owners.\nWhich of these are **organisational** objectives?',
  opts: ['P and Q only', 'Q, R and S', 'P, Q and S', 'P, Q, R and S'],
  sol: 'Survival (P), growth (Q) and profit (S) are organisational objectives. Jobs for women from villages (R) is a social objective.',
}));
Q('m_pervasive', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'A community kitchen in Amritsar, a ferry cooperative in Goa and a chip-design start-up in Hyderabad (all imagined) each plan their work, divide tasks and check results. Which characteristic of management does this show?',
  opts: ['It is pervasive', 'It is intangible', 'It is continuous', 'It is a group activity'],
  sol: 'Management is needed in every kind of organisation, business or not, and at every level: it is pervasive (universal).',
}));
Q('m_intangible', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'No runner at the imagined Sinhagad Ridge Half Marathon ever sees the organising committee at work, yet everyone notices that water points are stocked in time, signs are clear and results appear within an hour. Which characteristic of management is shown?',
  opts: ['Management is intangible', 'Management is pervasive', 'Management is a discipline', 'Management is a group of people'],
  sol: 'Management cannot be seen or touched; its presence is felt through orderly work and results. It is intangible.',
}));
Q('m_continuous', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The manager of the imagined Bhimtal Candles finishes the Diwali sales plan, reviews the November results and at once begins planning for the Christmas and New Year orders. This shows that management is',
  opts: ['a continuous process', 'an intangible force', 'a profession', 'a discipline'],
  sol: 'The functions of management are performed again and again without a break: management is a continuous process.',
}));
Q('m_groupact', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'At the imagined Pochampally Ikat House, dyers, weavers, accountants and sales staff each have their own needs, yet the manager gets them all to work together on one large export order. Which characteristic of management does this show best?',
  opts: ['Management is a group activity', 'Management is intangible', 'Management is a discipline', 'Management is pervasive'],
  sol: 'An organisation is a collection of individuals with different needs; management unites their efforts towards common goals, so it is a group activity.',
}));
Q('m_growth', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The imagined Pochampally Ikat House opens a showroom in Bengaluru, doubles its looms and adds a range of cushion covers. Which objective of management is it pursuing?',
  opts: ['Growth, an organisational objective', 'Survival, an organisational objective', 'A social objective', 'A personal objective'],
  sol: 'Expanding sales, capacity and the product range shows the organisational objective of growth.',
}));
Q('tf_pervasive', tf({
  t: 2, d: 1, c: 'understanding',
  stem: 'Management is needed only in organisations that aim to earn a profit.',
  ans: false,
  sol: 'False. Management is pervasive: schools, hospitals, clubs and government offices need it as much as business firms do.',
}));
Q('ar_goal', ar({
  t: 2, d: 3, c: 'understanding',
  a: 'Management is a goal-oriented process.',
  r: 'Management is intangible, as it cannot be seen or touched.',
  key: 'b',
  sol: 'Both statements are true, but intangibility does not explain why management is goal-oriented; it is goal-oriented because all its activities aim at the organisation\'s objectives.',
}));
Q('tf_intangible', tf({
  t: 2, d: 2, c: 'understanding',
  stem: 'Because management is intangible, its effect on an organisation cannot be noticed in any way.',
  ans: false,
  sol: 'False. Management cannot be seen or touched, but its presence is felt through results such as orderly work, met targets and satisfied staff.',
}));
Q('fb_objectives', fb({
  t: 2, d: 3, c: 'analysis',
  stem: 'Complete the analogy. Earning a surplus over costs : organisational objective :: Supplying safe products to the community : ___ objective',
  acc: [['social', 'social objective']],
  sol: 'Profit is an organisational objective; supplying safe products for the good of society is a social objective.',
}));
Q('s_social', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined private bus company in Shillong wants to meet its social objectives. Suggest two steps it could take, and say why each is a social objective.',
  model: '1. **Running buses on time on remote village routes** even when few passengers travel, because it **serves the community** and not only the firm.\n2. **Keeping engines well tuned to cut smoke**, because it **protects the environment** that society shares.',
  sol: 'Two suitable steps, each linked to benefit for society.',
  scheme: [['First step with reason', 1], ['Second step with reason', 1]],
}));
Q('s_personal', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What are the personal objectives of management? Name the kinds of needs of employees they cover.',
  model: '**Personal objectives** are the aims of meeting the **varied needs of the people** who work in the organisation. They cover **financial needs** (fair pay), **social needs** (recognition by peers) and **higher-level needs** (personal growth and development).',
  sol: 'Meaning plus the three kinds of needs.',
  scheme: [['Meaning', 1], ['Three kinds of needs', 1]],
}));
Q('s3_characteristics', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain these three characteristics of management: it is goal-oriented, it is pervasive and it is continuous.',
  model: '1. **Goal-oriented:** every management activity aims at **definite objectives**, such as a sales or output target; success is judged by how far these are met.\n2. **Pervasive:** management is needed in **all organisations**, business or non-business, large or small, and at all levels.\n3. **Continuous:** its functions are performed **again and again**; one cycle of planning to controlling leads straight into the next.',
  sol: 'Each characteristic explained.',
  scheme: [['Goal-oriented', 1], ['Pervasive', 1], ['Continuous', 1]],
}));
Q('s3_objectives', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Chilika Prawn Exports (imagined) wants to balance all three kinds of objectives of management. Suggest one suitable step for each kind, explaining why it fits that kind.',
  model: '1. **Organisational:** fix **prices above costs** and enter one new export market, so the firm can **survive, earn profit and grow**.\n2. **Social:** **treat waste water** before release and buy only from fishers who respect the breeding season, which **protects the lake** and the community.\n3. **Personal:** pay **fair wages on time** and train packers to become supervisors, meeting **employees\' needs** for income and growth.',
  sol: 'One suitable step for each kind of objective, with a reason.',
  scheme: [['Organisational step with reason', 1], ['Social step with reason', 1], ['Personal step with reason', 1]],
}));
Q('l_char', long({
  t: 2, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'The imagined Pasighat Riverbank Music Festival in Arunachal Pradesh is run by a committee of volunteers. Explain five characteristics of management, illustrating each with an example from the festival.',
  model: '1. **Goal-oriented:** all work aims at clear goals, such as **holding three days of music safely within the budget**.\n2. **Pervasive:** although the festival is **not a business**, it still needs planning, organising and control, so management is found everywhere.\n3. **Continuous:** once one festival ends, the committee **reviews it and starts planning next year\'s**, so the cycle never stops.\n4. **Group activity:** sound engineers, cooks, guides and ticket sellers have **different needs** but work towards **one shared event**.\n5. **Intangible:** visitors never see "the management", but they **feel its presence** in clean campsites, timely shows and smooth entry.',
  sol: 'One mark for each characteristic explained with a festival example.',
  scheme: [['Goal-oriented', 1], ['Pervasive', 1], ['Continuous', 1], ['Group activity', 1], ['Intangible', 1]],
}));

// ================================================================ t03 Science, art and profession
Q('m_art', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'Tsering of the imagined Dhauladhar Trekking Company has read the same books on leading teams as other trek leaders, but her way of calming a tired and angry group at high camp is her own, sharpened over ten seasons. This shows management as',
  opts: ['an art: personal skill used creatively and improved by practice', 'a science: principles with universal validity', 'a profession: restricted entry and a compulsory code', 'a discipline: a subject taught in colleges'],
  sol: 'Personalised application of knowledge, creativity and skill improved through practice are features of an art.',
}));
Q('m_inexact', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'A bonus scheme that raised output sharply at the Hospet unit of the imagined Hampi Stoneware had almost no effect at its Mysuru unit. This is one reason why management is described as',
  opts: ['an inexact (soft) science', 'an exact science like physics', 'a full profession', 'a purely personal art with no principles'],
  sol: 'Management principles deal with human behaviour, which varies, so they do not give the same result everywhere; management is an inexact science.',
}));
Q('m_experiment', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Before choosing a layout for its packing room, the imagined Bhimtal Candles tried three arrangements for a week each, recorded the output and kept the best one. Which feature of science does this show in management?',
  opts: ['Principles based on observation and experiment', 'Personal skill and creativity', 'Restricted entry', 'Service motive'],
  sol: 'Science develops principles through observation and repeated experiment, and management does the same when it tests and records results.',
}));
Q('m_profession_combo', mcq({
  t: 3, d: 4, c: 'analysis', fixed: true, key: 'a',
  stem: 'A debate club at an imagined school in Kohima lists four features of a profession:\nP. A well-defined body of knowledge.\nQ. Entry only through a compulsory degree or licence.\nR. Membership of a professional association required by law.\nS. A code of conduct whose breach can cost a member the right to practise.\nWhich of these does management in India **fully** satisfy today?',
  opts: ['P only', 'P and Q', 'P, R and S', 'Q and R'],
  sol: 'Management has a well-defined, systematised body of knowledge (P). Anyone may become a manager without a set degree (Q not met); membership of a managers\' association is not compulsory (R not met); and there is no legally binding code that can stop a person managing (S not met).',
}));
Q('m_science_feature', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'A student at an imagined coaching class in Kota writes that management has "a systematised body of knowledge with principles based on cause and effect". He is describing management as',
  opts: ['a science', 'an art', 'a group', 'an activity'],
  sol: 'A systematised body of knowledge and cause-and-effect principles are features of a science.',
}));
Q('ar_art', ar({
  t: 3, d: 3, c: 'analysis',
  a: 'Management can be described as an art.',
  r: 'Management principles give exactly the same result in every situation.',
  key: 'c',
  sol: 'The assertion is true: managers apply knowledge with personal skill and creativity. The reason is false: management principles deal with human behaviour and do not give identical results everywhere.',
}));
Q('ar_exact', ar({
  t: 3, d: 3, c: 'analysis',
  a: 'Management principles are as exact as the laws of physics.',
  r: 'In India, a person needs a licence issued under law before working as a manager.',
  key: 'd',
  sol: 'Both are false. Management principles are flexible guidelines about human behaviour, not exact laws; and there is no legal licence needed to work as a manager in India.',
}));
Q('tf_profession', tf({
  t: 3, d: 2, c: 'understanding',
  stem: 'In India, a person must by law hold a management degree before being appointed as a manager of a company.',
  ans: false,
  sol: 'False. There is no legal restriction on entry; a person with any qualification may be appointed a manager, which is why management is not a full profession.',
}));
Q('fb_sap', fb({
  t: 3, d: 3, c: 'analysis',
  stem: 'Complete the analogy. Personalised application of knowledge : art :: Principles based on cause and effect : ___',
  acc: [['science', 'management as a science']],
  sol: 'Personal skill in applying knowledge is a feature of art; cause-and-effect principles are a feature of science.',
}));
Q('s_art', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two features of an art that are present in management.',
  model: '1. **Personalised application:** each manager **applies** the same principles **in an individual way**, with her own style.\n2. **Based on practice and creativity:** managerial skill **improves with practice**, and good managers find **creative** new ways to solve problems.',
  sol: 'Any two features of art (existence of theoretical knowledge, personalised application, practice and creativity) explained.',
  scheme: [['First feature', 1], ['Second feature', 1]],
}));
Q('s_profession2', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give two reasons why management is not yet regarded as a full profession in India.',
  model: '1. **No restricted entry:** **anyone** can be appointed a manager; no degree or licence is required by law.\n2. **No compulsory association or binding code:** joining a managers\' association is **voluntary**, and its code of conduct cannot stop a person from working as a manager.',
  sol: 'Two unmet features of a profession explained.',
  scheme: [['First reason', 1], ['Second reason', 1]],
}));
Q('s3_science', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Ananya, a Class 12 student, tells her friend: "Management is a science, just like chemistry." Using three features of science, examine how far she is right.',
  model: '1. **Systematised body of knowledge:** management **does** have organised principles and theories, so she is partly right.\n2. **Principles based on experiment:** its principles come from **observation and testing** in many firms, though tests on people cannot be fully controlled.\n3. **Universal validity:** management principles **do not give the same result everywhere**, because they deal with human behaviour. So management is only an **inexact (soft) science**, not exact like chemistry.',
  sol: 'Three features of science tested against management, ending with a judgement.',
  scheme: [['Systematised knowledge', 1], ['Experiment-based principles', 1], ['Universal validity and conclusion', 1]],
}));
Q('s3_profession', short({
  t: 3, d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Using three features of a profession, evaluate whether the manager of an imagined hotel in Udaipur can be called a professional in the full sense.',
  model: '1. **Body of knowledge:** **met** — management has a well-defined body of knowledge that the manager can learn.\n2. **Restricted entry:** **not met** — the hotel may appoint **anyone** as manager; no compulsory degree or licence is required by law.\n3. **Professional association and code:** **not fully met** — joining a managers\' association is **voluntary**, and its code cannot stop a member from working. So the manager is **not yet** a professional in the full sense.',
  sol: 'Three features of a profession evaluated with a conclusion.',
  scheme: [['Body of knowledge', 1], ['Restricted entry', 1], ['Association and code, with conclusion', 1]],
}));
Q('l_sap', long({
  t: 3, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Kiran, who runs the imagined Hampi Stoneware, says: "I never studied management, yet my unit runs well. So management is just an art; it is neither a science nor a profession."\n(a) Explain two features of an art that support Kiran. [2]\n(b) Evaluate his claim that management is neither a science nor a profession. [3]',
  model: '(a) **Personalised application:** Kiran uses his **own style** to apply ideas, much like a musician interprets a raga. **Practice and creativity:** his skill has **grown through years of practice** and fresh solutions on the shop floor.\n\n(b) **Science:** Kiran is **only partly right**. Management has a **systematised body of knowledge** and principles drawn from observation, but because they deal with people they are not universally exact, so it is an **inexact science**.\n**Profession:** he is **largely right**. There is a body of knowledge, but **entry is not restricted**, membership of an association is **not compulsory** and no legal code binds managers. So management is **not a full profession**.\n**Conclusion:** management is **both an art and an inexact science**, and it is moving towards becoming a profession.',
  sol: 'Two features of art; a balanced evaluation of science and profession with a conclusion.',
  scheme: [['(a) Two features of art', 2], ['(b) Science evaluated', 1], ['(b) Profession evaluated', 1], ['(b) Balanced conclusion', 1]],
}));

// ================================================================ t04 Importance and levels of management
Q('m_importance_odd', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'After a new manager took charge at the imagined Lonavla Chikki Works, wastage of jaggery fell, each worker got clear duties and a new range of sugar-free chikki was launched. Which of the following is **not** an importance of management shown here?',
  opts: ['It guarantees that the firm will never suffer a loss', 'It increases efficiency by reducing waste', 'It helps the group achieve its goals', 'It creates a dynamic organisation that adapts to change'],
  sol: 'Less waste shows efficiency, clear duties help achieve group goals, and the new range shows a dynamic organisation. No management can guarantee that a firm will never make a loss.',
}));
Q('m_efficiency', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'After the new manager of the imagined Hampi Stoneware fixed a kiln-loading schedule, the firewood used for each batch of pots fell by a quarter with no fall in output. Which importance of management does this show?',
  opts: ['It increases efficiency', 'It helps achieve social objectives', 'It creates a dynamic organisation', 'It helps achieve personal objectives'],
  sol: 'Getting the same output with fewer inputs means lower cost per unit: management increases efficiency.',
}));
Q('m_dynamic', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'When buyers began asking for light cotton saris for summer, the manager of the imagined Pochampally Ikat House persuaded senior weavers, who had always used heavy silk, to try new yarns. Which importance of management does this show?',
  opts: ['It helps create a dynamic organisation', 'It helps achieve personal objectives only', 'It reduces the need for planning', 'It makes the organisation static and stable'],
  sol: 'Management helps people accept change and adapt to new conditions, keeping the organisation dynamic.',
}));
Q('m_top', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'The board and the managing director of the imagined Chilika Prawn Exports decide to start exporting to Japan within two years and set aside funds for a new freezing plant. Which level of management is at work?',
  opts: ['Top management', 'Middle management', 'Supervisory management', 'Operative workers'],
  sol: 'Setting long-term goals and allocating funds for the whole firm is the work of top management.',
}));
Q('m_middle', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'Joseph heads the grading plant of the imagined Coorg Pepper House. He turns the board\'s yearly target into monthly quotas for each shift, gives duties to the shift supervisors and reports progress to the directors. Joseph belongs to',
  opts: ['middle management', 'top management', 'supervisory management', 'the board of directors'],
  sol: 'Interpreting policies of the top, assigning duties to supervisors and reporting upward are middle-management functions.',
}));
Q('m_lower', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'Lalremruati is a line in-charge at an imagined bamboo-blind factory in Aizawl. She checks each worker\'s daily output, settles small quarrels, shows new hands the correct cutting method and passes workers\' complaints upward. Her level of management is',
  opts: ['supervisory (lower) management', 'middle management', 'top management', 'none: she is an operative worker'],
  sol: 'Directly overseeing workers, maintaining quality and discipline, and passing their problems up are supervisory functions.',
}));
Q('m_middle_combo', mcq({
  t: 4, d: 3, c: 'analysis', fixed: true, key: 'b',
  stem: 'Which of the following are functions of **middle** management in an imagined cement company?\nP. Interpreting the policies framed by top management.\nQ. Assigning duties to the plant supervisors.\nR. Deciding the long-term goals of the whole company.\nS. Ensuring cooperation among departments and motivating supervisors.',
  opts: ['P and R only', 'P, Q and S', 'Q, R and S', 'P, Q, R and S'],
  sol: 'Interpreting policies (P), assigning duties (Q) and securing cooperation and motivation (S) are middle-management tasks. Long-term goals (R) are set by top management.',
}));
Q('ar_top', ar({
  t: 4, d: 3, c: 'understanding',
  a: 'Top management is responsible for the welfare and survival of the whole organisation.',
  r: 'Top managers analyse the business environment and frame the overall objectives and strategies of the firm.',
  key: 'a',
  sol: 'Both are true. Because top managers read the environment and frame overall goals and strategies, they are answerable for the survival and welfare of the whole organisation.',
}));
Q('tf_levels', tf({
  t: 4, d: 2, c: 'understanding',
  stem: 'A top manager usually spends more time on planning and less time on day-to-day supervision of workers than a first-line supervisor does.',
  ans: true,
  sol: 'True. Planning takes a larger share of a top manager\'s time, while a supervisor spends most of the day guiding and overseeing workers.',
}));
Q('fb_levels', fb({
  t: 4, d: 2, c: 'understanding',
  stem: 'Complete the analogy. Board of directors and chief executive : top management :: Foremen and line supervisors : ___ management',
  acc: [['supervisory', 'lower', 'operational', 'first-line']],
  sol: 'Directors and the chief executive form top management; foremen and line supervisors form supervisory (lower) management.',
}));
Q('mt_levels', match({
  t: 4, d: 3, c: 'application', marks: 2,
  stem: 'Match each task at an imagined chain of hill-station hotels with the level of management that usually performs it.',
  pairs: [
    ['Decide to open a new hotel in Gangtok within three years', 'Top management'],
    ['Turn the chain\'s yearly room-booking target into targets for each hotel', 'Middle management'],
    ['Check that each room on a floor is cleaned before guests arrive', 'Supervisory management'],
    ['Make the beds and serve breakfast to guests', 'Operative staff, not a level of management'],
  ],
  sol: 'A new hotel is a top-level decision; turning targets into unit plans is middle management; checking rooms each day is supervisory work; making beds and serving guests is operative work done under supervisors.',
}));
Q('s_supervisory', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two functions of the supervisory level of management at an imagined granite-polishing unit in Ongole.',
  model: '1. **Overseeing workers:** the supervisor **checks daily output** of the polishers and makes sure the right method is used.\n2. **Link between workers and middle management:** she **passes workers\' problems upward** and explains the instructions of managers to them.',
  sol: 'Two supervisory functions linked to the polishing unit.',
  scheme: [['First function', 1], ['Second function', 1]],
}));
Q('s_importance2', short({
  t: 4, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Before a manager was appointed at an imagined ferry service in Goa, boats left late and fuel was wasted. State two ways in which good management could help this service.',
  model: '1. **Increases efficiency:** proper **schedules and fuel checks** cut waste and lower costs.\n2. **Helps achieve group goals:** clear duties for crew and ticket staff make everyone work towards **on-time departures** and satisfied passengers.',
  sol: 'Two points of importance linked to the ferry service.',
  scheme: [['First point linked to the case', 1], ['Second point linked to the case', 1]],
}));
Q('s3_middle', short({
  t: 4, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Meghna has just been promoted to head the sales team of an imagined spice company for the whole of eastern India, with six area supervisors under her. Explain three functions she will perform at her new level.',
  model: '1. **Interpreting policies:** she turns the **company\'s yearly sales policy** into plans and targets for each area.\n2. **Assigning duties:** she **divides the work** among the six area supervisors and gives them the resources they need.\n3. **Cooperation and motivation:** she **coordinates** with the warehouse and accounts teams, and **motivates** supervisors to meet targets. She is in **middle management**.',
  sol: 'Three middle-management functions applied to Meghna\'s post.',
  scheme: [['First function applied', 1], ['Second function applied', 1], ['Third function applied', 1]],
}));
Q('s3_society', short({
  t: 4, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain three ways in which management is important not only to a firm but also to society.',
  model: '1. **Development of society:** well-managed firms supply **better goods and services**, create **jobs** and adopt new technology, raising living standards.\n2. **Efficient use of resources:** management **reduces waste** of scarce materials, money and labour, which benefits the whole economy.\n3. **Meeting social objectives:** it helps firms act responsibly, for example by **protecting the environment** and serving the community.',
  sol: 'Three points of importance for society explained.',
  scheme: [['First point', 1], ['Second point', 1], ['Third point', 1]],
}));
Q('l_levels', long({
  t: 4, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'At the imagined Konark Cashew Processors in Odisha, the chief executive and directors decide to double capacity in three years; the factory manager turns this into yearly targets for each shed; and four shed supervisors guide the shelling and packing workers each day.\n(a) Identify the three levels of management in the case. [1]\n(b) Explain two functions of each of the top and middle levels in this firm. [4]',
  model: '(a) **Top:** chief executive and directors; **middle:** factory manager; **supervisory:** the four shed supervisors.\n\n(b) **Top management:**\n1. **Frames long-term goals and strategy**, such as doubling capacity in three years, after studying the market and environment.\n2. **Arranges resources** for the plan, such as funds for new sheds, and is answerable for the firm\'s **survival and welfare**.\n\n**Middle management:**\n1. **Interprets** the directors\' plan and turns it into **yearly targets for each shed**.\n2. **Assigns duties** to the shed supervisors, gives them the materials they need and **coordinates** with purchase and sales so that targets are met.',
  sol: 'Three levels identified; two functions each for top and middle management applied to the firm.',
  scheme: [['(a) Three levels identified', 1], ['(b) Two top-level functions', 2], ['(b) Two middle-level functions', 2]],
}));
Q('l_importance', long({
  t: [4, 2], d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'The imagined Kuttanad Boat Clinic repairs houseboats in Kerala. Its owner says that hiring a trained manager last year "changed everything".\n(a) Explain four points of importance of management that could explain this change, with an example of each from the boat clinic. [4]\n(b) State one personal objective the manager should pursue for the repair crew. [1]',
  model: '(a) 1. **Achieving group goals:** the manager gives every crew member a clear role, so the team works towards **finishing repairs before the tourist season**.\n2. **Increasing efficiency:** better **scheduling of boats and tools** cuts idle time and wastage of timber and paint.\n3. **Creating a dynamic organisation:** the manager helps the crew learn **fibreglass repair** as owners move away from wooden hulls.\n4. **Achieving personal objectives:** fair pay and recognition keep skilled carpenters **motivated** and loyal.\n\n(b) **Training and growth:** sending crew members on a **short course in engine repair**, so they earn more and develop their skills.',
  sol: 'Four points of importance with boat-clinic examples; one personal objective.',
  scheme: [['(a) Four points with examples', 4], ['(b) One personal objective', 1]],
}));

// ================================================================ case-based
Q('cb_majuli', caseQ({
  t: [1, 2], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined firm and people, written by SOYL for practice.)*',
  passage: '**Majuli Mask Studio (imagined), Assam**\n\nMajuli Mask Studio makes painted bamboo masks for theatres and tourists. Its manager, Pranjal, spends his mornings meeting buyers and his afternoons deciding which orders to accept. The studio aims to earn enough to keep twelve artisans in work all year, to grow into online sales, and to keep the craft alive by training young people from the island free of charge. When a large order came from a theatre in Kolkata, carvers, painters and packers, each with different interests, worked together to finish it on time.',
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'application', stem: 'Training young islanders free of charge to keep the craft alive serves which objective of the studio?', opts: ['Social objective', 'Organisational objective', 'Personal objective', 'None of these'], sol: 'Benefiting the community by keeping its craft alive is a social objective.' })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Name the characteristic of management shown when carvers, painters and packers worked together on the theatre order.', model: '**Management is a group activity.**', sol: 'People with different interests working towards a common goal: group activity.', scheme: [['Group activity', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify two kinds of managerial activity performed by Pranjal, quoting the words that show each.', model: '1. **Interpersonal activity:** "**meeting buyers**".\n2. **Decisional activity:** "**deciding which orders to accept**".', sol: 'Two kinds of activity with the matching words.', scheme: [['First activity with words', 1], ['Second activity with words', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Identify two organisational objectives of the studio from the passage, with reasons.', model: '**Survival:** "earn enough to keep twelve artisans in work all year" means staying in business. **Growth:** "grow into online sales" means expanding the business.', sol: 'Survival and growth identified with reasons.', scheme: [['Survival with reason', 1], ['Growth with reason', 1]] }),
    ]),
  ],
}));
Q('cb_kovalam', caseQ({
  t: [3, 4], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined organisation and people, written by SOYL for practice.)*',
  passage: '**Blue Tide Surf School (imagined), Varkala**\n\nThe surf school has a founder-director, a head coach and three beach supervisors. The founder decides each year how many batches to run and whether to open a second beach. The head coach turns these decisions into weekly schedules and divides the trainees among the supervisors. Each supervisor watches the trainees in the water, corrects their stance and reports injuries. The head coach has no management degree but has trained hundreds of surfers, and each coach in the school teaches in a personal style.',
  parts: [
    child('a', mcq({ t: 4, d: 2, c: 'application', stem: 'The head coach in the passage belongs to which level of management?', opts: ['Middle management', 'Top management', 'Supervisory management', 'Operative staff'], sol: 'Turning top-level decisions into schedules and dividing work among supervisors is middle management.' })),
    child('b', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'State one function of the beach supervisors mentioned in the passage.', model: '**Overseeing trainees** in the water and correcting their stance (or reporting injuries upward).', sol: 'Any one supervisory function from the passage.', scheme: [['One supervisory function', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Which line shows management as an art? Explain why.', model: '"**each coach in the school teaches in a personal style**": an art involves the **personalised application** of knowledge, using one\'s own skill and creativity.', sol: 'The line about personal style, explained as personalised application.', scheme: [['Correct line', 1], ['Explanation', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Which feature of a profession is missing in the head coach\'s case? Explain.', model: '**Restricted entry** is missing: he manages without a **management degree or licence**, as no law restricts who may become a manager.', sol: 'Restricted entry identified and explained.', scheme: [['Feature named', 1], ['Explanation', 1]] }),
    ]),
  ],
}));
