// ISC 12 Commerce, ch07 Principles of Management — question bank. Every firm, person and situation is imagined and
// written by SOYL and labelled as such; no ISC or CBSE textbook illustration or exercise and no CISCE specimen or
// board item is reused (D-036). Firms, people and set-ups differ from CBSE 12 Business Studies ch02.
import { Q, mcq, ar, tf, fb, match, short, long, caseQ, child } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 75];
const L5 = [100, 150];

// ================================================================ t01 Nature of and need for principles
Q('m_universal', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A retired naval officer who now runs an imagined school canteen in Visakhapatnam finds that the idea of giving each helper only one boss works as well in the canteen as it did on his ship. Which feature of principles of management does this show?',
  opts: ['Universal applicability', 'Mainly behavioural', 'Cause-and-effect relationship', 'Formed by practice and experiment'],
  sol: 'The same principle works in a navy and a canteen: principles apply to all kinds of organisations, so they are universal.',
}));
Q('m_flexible', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'In the festival season, the owner of the imagined Aligarh Lock Company lets her sales staff decide discounts on the spot. During a quality scare a month later, she insists that every decision pass through her. What does this show about principles of management?',
  opts: ['They are flexible and can be modified to suit the situation', 'They are rigid rules that never change', 'They apply only to large firms', 'They are developed in laboratories'],
  sol: 'The owner adapted how much authority to centralise to the needs of each period: principles are flexible, not rigid.',
}));
Q('m_behavioural', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Most of the principles a manager at the imagined Firozabad Bangle Works uses deal with how furnace workers, packers and supervisors behave and relate to one another. This is why principles of management are said to be',
  opts: ['mainly behavioural', 'exact like the laws of physics', 'technical rules about machines', 'applicable only to top managers'],
  sol: 'Principles of management aim to influence human behaviour at work, so they are mainly behavioural in nature.',
}));
Q('m_guidelines', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A new manager at the imagined Kannauj Attar House finds that Fayol\'s principles tell her what to keep in mind when two perfumers quarrel, but not exactly what to say or do. This shows that principles of management are',
  opts: ['general guidelines, not ready-made solutions', 'rigid rules to be applied word for word', 'useful only in factories', 'formed without any practice'],
  sol: 'Principles guide action but do not give fixed answers for every situation; managers must use judgement.',
}));
Q('m_need_insight', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Before the owner of the imagined Nashik Grape Packers learnt principles of management, she decided shift plans by mood. Now her decisions rest on clear reasons that others can check. Which need for principles does this show?',
  opts: ['Scientific decisions based on facts', 'Meeting changing environment', 'Fulfilling social responsibility', 'Training of managers'],
  sol: 'Principles help managers take decisions that are reasoned, objective and open to review, rather than based on whims.',
}));
Q('m_need_resources', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'After applying principles such as division of work and order, the imagined Nashik Grape Packers found that fewer crates were damaged and pickers no longer stood idle waiting for trucks. Which benefit of principles is this?',
  opts: ['Optimum use of resources', 'Social responsibility', 'Meeting changing environment', 'Universal applicability'],
  sol: 'Less damage and less idle time mean resources are used fully and with little waste: optimum utilisation of resources.',
}));
Q('ar_nature', ar({
  t: 1, d: 2, c: 'understanding',
  a: 'Principles of management are flexible.',
  r: 'Managers can modify them to suit the needs of a particular situation.',
  key: 'a',
  sol: 'Both are true, and the fact that managers can adapt them to the situation is what makes the principles flexible.',
}));
Q('ar_nature_d', ar({
  t: 1, d: 3, c: 'analysis',
  a: 'Principles of management are rigid rules like the laws of physics.',
  r: 'Principles of management were developed in laboratories without any reference to practice.',
  key: 'd',
  sol: 'Both are false. The principles are flexible guidelines, and they grew out of managers\' practice, observation and experiment in real organisations.',
}));
Q('tf_universal', tf({
  t: 1, d: 1, c: 'understanding',
  stem: 'Principles of management are useful only in business firms and not in schools, clubs or hospitals.',
  ans: false,
  sol: 'False. The principles have universal applicability: any organisation that needs people to work together can use them.',
}));
Q('fb_nature', fb({
  t: 1, d: 3, c: 'analysis',
  stem: 'Complete the analogy. Can be modified to suit a situation : flexible :: Seek to influence how people act at work : ___',
  acc: [['mainly behavioural', 'behavioural']],
  sol: 'Principles that can be adapted are flexible; principles that aim at influencing human behaviour are mainly behavioural.',
}));
Q('s_need', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two reasons why managers need principles of management.',
  model: '1. **Useful insights into reality:** principles add to managers\' **knowledge and understanding** of situations, so they avoid repeating mistakes.\n2. **Scientific decisions:** decisions based on principles are **logical, objective and free from bias**, not based on personal whims.',
  sol: 'Any two needs (insights, optimum use of resources, scientific decisions, changing environment, social responsibility, training and research) explained.',
  scheme: [['First reason', 1], ['Second reason', 1]],
}));
Q('s_nature2', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'A trainee at the imagined Aligarh Lock Company says: "Principles of management are fixed rules that must be applied in exactly the same way everywhere." Correct her by explaining two features of principles.',
  model: '1. **Flexible:** principles are **not rigid**; managers can **adapt** them to the size and needs of the firm.\n2. **General guidelines:** they **guide** thinking but do not give **ready-made answers**, because situations and people differ.',
  sol: 'Two features that show principles are not fixed rules.',
  scheme: [['First feature', 1], ['Second feature', 1]],
}));
Q('s3_need', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'The imagined Nashik Grape Packers is growing fast and exporting to new countries. Explain three ways in which principles of management would help its managers.',
  model: '1. **Optimum use of resources:** principles such as **division of work** cut idle time and damage to crates, lowering costs.\n2. **Meeting a changing environment:** principles such as **initiative** help managers adapt quickly to new **export rules** and buyers.\n3. **Training and research:** principles give new supervisors a **base of knowledge**, so they learn faster and can improve methods for each new market.',
  sol: 'Three needs of principles applied to the exporter.',
  scheme: [['First need applied', 1], ['Second need applied', 1], ['Third need applied', 1]],
}));
Q('l_nature', long({
  t: 1, d: 3, c: 'application', marks: 5, wl: L5,
  stem: '(a) Explain three features of the nature of principles of management. [3]\n(b) The owner of the imagined Kannauj Attar House says: "I have twenty years of experience; I do not need principles of management." Give two reasons why she would still benefit from them. [2]',
  model: '(a) 1. **Universal applicability:** principles apply to **all kinds of organisations**, business and non-business, large and small.\n2. **Flexible:** they are **not rigid**; managers can **modify** them to suit the situation.\n3. **Mainly behavioural:** they aim to **influence human behaviour**, so that people work together towards goals.\n\n(b) 1. **Training of successors:** her experience is personal, but principles are a **body of knowledge** that she can use to **train new managers** when she steps back.\n2. **Scientific decisions:** principles help her test her judgement against **reasoned guidelines**, so that decisions are less biased and easier to explain to staff.',
  sol: 'Three features explained; two benefits linked to the experienced owner.',
  scheme: [['(a) Three features', 3], ['(b) Two benefits linked to the case', 2]],
}));

// ================================================================ t02 Taylor's five principles
Q('m_science', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Packers at the imagined Ratnagiri Mango Packers used to stack fruit in boxes the way their elders had always done. The manager studied four methods, measured the bruising in each and made the best one the standard. Which of Taylor\'s principles is this?',
  opts: ['Science, not rule of thumb', 'Harmony, not discord', 'Cooperation, not individualism', 'Maximum, not restricted, output'],
  sol: 'Replacing habit and guesswork with a method found by careful study is science, not rule of thumb.',
}));
Q('m_harmony', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'At the imagined Mangaluru Tile Works, managers and kiln workers used to blame each other for every delay. After a series of open meetings, both sides came to see that more output would benefit them both, and the quarrels stopped. Which principle of Taylor is shown?',
  opts: ['Harmony, not discord', 'Science, not rule of thumb', 'Development of each person to greatest efficiency', 'Unity of direction'],
  sol: 'A change of attitude on both sides, from conflict to partnership, is harmony, not discord, which needs a mental revolution.',
}));
Q('m_cooperation', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Supervisors at the imagined Bishnupur Terracotta Works now share the heavy work of loading the kiln with the potters, and managers do the planning so that potters can focus on shaping. Potters, in turn, agree not to stop work suddenly. Which of Taylor\'s principles is at work?',
  opts: ['Cooperation, not individualism', 'Harmony, not discord', 'Science, not rule of thumb', 'Maximum, not restricted, output'],
  sol: 'Managers and workers sharing responsibility and working as partners, rather than each acting alone, is cooperation, not individualism.',
}));
Q('m_development', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'The imagined Thrissur Bell Metal sends each new caster on a three-week mould-making course, moves those with a fine eye to engraving, and raises their pay as their skill grows. Which of Taylor\'s principles does this follow?',
  opts: ['Development of each and every person to his or her greatest efficiency and prosperity', 'Cooperation, not individualism', 'Harmony, not discord', 'Science, not rule of thumb'],
  sol: 'Training workers, placing them where their abilities fit best and letting them earn more as they improve develops each person to greatest efficiency and prosperity.',
}));
Q('m_maximum', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Cobblers at the imagined Kolhapuri Footwear Cooperative used to slow down, fearing that faster work would mean fewer jobs. The managers showed them that higher output would bring more orders and higher earnings, and output rose. Which principle of Taylor is this?',
  opts: ['Maximum, not restricted, output', 'Science, not rule of thumb', 'Harmony, not discord', 'Unity of command'],
  sol: 'Taylor wanted output to rise to the full, not be held back, so that both the firm and the workers gain: maximum, not restricted, output.',
}));
Q('m_mental', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Taylor said that harmony, not discord, needs a "mental revolution". At an imagined boatyard in Kollam, this would mean',
  opts: ['managers and workers changing their attitude and treating each other as partners', 'workers taking over the management of the boatyard', 'managers paying the same wage to every worker', 'replacing all workers with machines'],
  sol: 'A mental revolution is a complete change of outlook on both sides: from suspicion and conflict to trust and cooperation.',
}));
Q('m_taylor_combo', mcq({
  t: 2, d: 3, c: 'analysis', fixed: true, key: 'b',
  stem: 'A student at an imagined school in Kollam lists four principles under the heading "Taylor":\nP. Harmony, not discord.\nQ. Unity of command.\nR. Cooperation, not individualism.\nS. Esprit de corps.\nWhich of these are actually Taylor\'s principles?',
  opts: ['P and Q only', 'P and R only', 'Q and S only', 'P, Q, R and S'],
  sol: 'Harmony, not discord (P) and cooperation, not individualism (R) are Taylor\'s. Unity of command (Q) and esprit de corps (S) are Fayol\'s principles.',
}));
Q('ar_taylor', ar({
  t: 2, d: 3, c: 'understanding',
  a: 'Taylor\'s principle of harmony, not discord, calls for a mental revolution.',
  r: 'Both managers and workers must change their attitude and see each other as partners.',
  key: 'a',
  sol: 'Both are true. Harmony needs a complete change of outlook on both sides, which is what Taylor meant by a mental revolution.',
}));
Q('ar_taylor_c', ar({
  t: 2, d: 3, c: 'analysis',
  a: 'Under science, not rule of thumb, the best method of doing a job is found by careful study.',
  r: 'Taylor believed that each worker should be free to choose his or her own method.',
  key: 'c',
  sol: 'The assertion is true. The reason is false: Taylor wanted one best method, found by study and taught to all, in place of each worker\'s own rule of thumb.',
}));
Q('tf_taylor', tf({
  t: 2, d: 1, c: 'understanding',
  stem: 'Taylor\'s principle of cooperation, not individualism, asks managers and workers to compete against each other to raise output.',
  ans: false,
  sol: 'False. It asks them to work as partners and share responsibility, not to compete or act alone.',
}));
Q('fb_taylor', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'Complete the analogy. Harmony : discord :: Cooperation : ___',
  acc: [['individualism']],
  sol: 'Taylor\'s principles pair harmony against discord and cooperation against individualism.',
}));
Q('s_taylor2', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain Taylor\'s principle of maximum, not restricted, output.',
  model: 'Taylor wanted production to be **as high as possible**, not held back by workers or managers. Higher output lowers **cost per unit**, so the firm earns **more profit** and can pay **higher wages**; both sides, and consumers, gain.',
  sol: 'Meaning with the benefit to both sides.',
  scheme: [['Meaning', 1], ['Benefit to firm and workers', 1]],
}));
Q('s_science2', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'At an imagined coconut-oil mill in Kozhikode, each worker feeds the press in his own way, and output varies widely. Which principle of Taylor should the manager apply? Explain briefly.',
  model: '**Science, not rule of thumb.** The manager should **study** the different ways of feeding the press, **find the one best method** by observation and testing, and **train** all workers in it, so that output becomes steady and higher.',
  sol: 'Principle named and how to apply it.',
  scheme: [['Principle named', 1], ['How to apply it', 1]],
}));
Q('s3_taylor', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'At the imagined Meerut Willow Works, a cricket-bat maker, (i) the method of pressing willow is fixed after timed trials, (ii) the best sanders are trained to become finishers, and (iii) the owner and the workers\' committee meet weekly to solve problems together. Identify and explain the principle of Taylor in each.',
  model: '(i) **Science, not rule of thumb:** the pressing method is **fixed by study and trials**, not by habit.\n(ii) **Development of each person to greatest efficiency and prosperity:** workers are **trained and moved** to jobs that suit their ability, and earn more.\n(iii) **Cooperation, not individualism:** owner and workers **share responsibility** and solve problems **together** instead of acting alone.',
  sol: 'Three principles identified and explained.',
  scheme: [['(i) Science, not rule of thumb', 1], ['(ii) Development of each person', 1], ['(iii) Cooperation, not individualism', 1]],
}));
Q('s3_harmony', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain Taylor\'s principles of harmony, not discord, and cooperation, not individualism, and show how they are linked.',
  model: '1. **Harmony, not discord:** managers and workers should **replace conflict with harmony**; this needs a **mental revolution**, a change of attitude on both sides.\n2. **Cooperation, not individualism:** they should **work as partners**, sharing responsibility; managers plan and support, workers follow agreed methods and offer suggestions.\n3. **Link:** cooperation is **harmony in action**; once attitudes change, daily work can be shared.',
  sol: 'Both principles explained and the link shown.',
  scheme: [['Harmony, not discord', 1], ['Cooperation, not individualism', 1], ['Link between them', 1]],
}));
Q('l_taylor', long({
  t: 2, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'The imagined Jalandhar Sports Goods stitches footballs. Its output is low, workers and supervisors argue often, and each stitcher works in a different way. Explain Taylor\'s five principles of scientific management, suggesting how each could help this firm.',
  model: '1. **Science, not rule of thumb:** study the stitching methods, **find the one best way** and train every stitcher in it.\n2. **Harmony, not discord:** through a **mental revolution**, supervisors and stitchers should stop blaming each other and see that both **gain** from success.\n3. **Cooperation, not individualism:** managers should plan and support, stitchers should offer **suggestions**, and both should **share** responsibility.\n4. **Development of each person to greatest efficiency and prosperity:** **select and train** stitchers carefully, place them where their skills fit, and let them earn more as they improve.\n5. **Maximum, not restricted, output:** with better methods and goodwill, the firm should aim for **full output**, lowering costs and raising wages.',
  sol: 'One mark for each principle explained and applied to the football firm.',
  scheme: [['Science, not rule of thumb', 1], ['Harmony, not discord', 1], ['Cooperation, not individualism', 1], ['Development of each person', 1], ['Maximum, not restricted, output', 1]],
}));

// ================================================================ t03 Fayol's fourteen principles
Q('m_uoc', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'On a busy morning at the imagined Port Blair Ferry Services, a deckhand is told by the captain to load cargo and, at the same moment, by the ticket-office head to help passengers board. Which principle of Fayol is being violated?',
  opts: ['Unity of command', 'Unity of direction', 'Order', 'Equity'],
  sol: 'The deckhand receives orders from two superiors at once; unity of command says each subordinate should report to one boss only.',
}));
Q('m_uod', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'For a trade fair in Delhi, the imagined Leh Apricot Processors puts every task connected with its stall — design, stock, staff and publicity — under one fair manager working to one plan. Which principle of Fayol does this follow?',
  opts: ['Unity of direction', 'Unity of command', 'Centralisation', 'Scalar chain'],
  sol: 'One head and one plan for a group of activities with the same objective is unity of direction.',
}));
Q('m_scalar', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'At the imagined Hubballi Bus Depot, a conductor\'s request passes to the depot supervisor, then the depot manager, and then the divisional controller. Fayol called this line of authority from the top to the bottom',
  opts: ['the scalar chain', 'unity of direction', 'esprit de corps', 'the gang plank'],
  sol: 'The formal line of authority and communication from the highest to the lowest rank is the scalar chain.',
}));
Q('m_order', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'The imagined Agartala Bamboo Works keeps every tool on a marked rack and has seated each craftsperson where her particular skill is needed most. Which principle of Fayol is being followed?',
  opts: ['Order', 'Discipline', 'Equity', 'Initiative'],
  sol: 'A place for everything and everyone, and everything and everyone in its place, is Fayol\'s principle of order.',
}));
Q('m_equity', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'When handing out overtime, a supervisor at the imagined Firozabad Bangle Works always favours workers from her own village. Which principle of Fayol does she violate?',
  opts: ['Equity', 'Order', 'Stability of tenure', 'Remuneration of employees'],
  sol: 'Equity requires kindliness and justice towards all workers, without bias based on caste, region, religion or friendship.',
}));
Q('m_esprit', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Weavers at the imagined Imphal Handloom Collective help finish a colleague\'s pieces when she falls ill, and their leader always praises the team rather than any one person. Which principle of Fayol is shown?',
  opts: ['Esprit de corps', 'Initiative', 'Discipline', 'Division of work'],
  sol: 'Team spirit, unity and harmony among staff is esprit de corps.',
}));
Q('m_initiative', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'A junior perfumer at the imagined Kannauj Attar House is allowed to try her own idea for a new rose blend, and the manager backs a trial batch. Which principle of Fayol does this follow?',
  opts: ['Initiative', 'Order', 'Equity', 'Unity of direction'],
  sol: 'Encouraging employees to think out and carry out their own plans is Fayol\'s principle of initiative.',
}));
Q('m_stability', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'The imagined Nashik Grape Packers hires its quality checkers for only six weeks at a time, so none of them ever learns to judge export grades well. Which principle of Fayol is ignored?',
  opts: ['Stability of tenure of personnel', 'Unity of command', 'Esprit de corps', 'Centralisation and decentralisation'],
  sol: 'Employees need time to learn their jobs; high turnover wastes training and skill. This is stability of tenure of personnel.',
}));
Q('m_subordination', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'A shed manager at the imagined Mangaluru Tile Works wants to keep the best kiln for his own section to earn a bonus, although another section has an urgent export order. The owner overrules him. Which principle of Fayol guides the owner?',
  opts: ['Subordination of individual interest to general interest', 'Equity', 'Initiative', 'Order'],
  sol: 'The interest of the whole organisation (the export order) must come before the interest of one person or section.',
}));
Q('m_discipline', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'The owner of the imagined Aligarh Lock Company wants better discipline on the shop floor. According to Fayol, discipline requires',
  opts: ['good superiors at all levels, clear and fair agreements, and judicious use of penalties', 'heavy fines for every mistake', 'one boss for each worker', 'equal pay for all workers'],
  sol: 'Fayol held that discipline needs good superiors, clear and fair agreements, and penalties applied with judgement.',
}));
Q('m_authority', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'A supervisor at the imagined Puducherry Paper Crafts is held answerable for finishing a large gift-box order on time, but she is not allowed to call staff for overtime or order extra card. Which principle of Fayol is being violated?',
  opts: ['Authority and responsibility', 'Unity of direction', 'Order', 'Esprit de corps'],
  sol: 'Authority must match responsibility; she is responsible for the result but lacks the authority needed to achieve it.',
}));
Q('m_fayol_combo', mcq({
  t: 3, d: 4, c: 'analysis', fixed: true, key: 'c',
  stem: 'An inspector notes four facts at the imagined Hubballi Bus Depot:\nP. Conductors get orders from two supervisors at the same time.\nQ. A supervisor promotes his nephew over more able staff.\nR. Requests go up the line from supervisor to manager to controller.\nS. The route planner is moved to a new post every month.\nWhich facts show a **violation** of Fayol\'s principles?',
  opts: ['P and R only', 'Q and R only', 'P, Q and S', 'P, Q, R and S'],
  sol: 'P violates unity of command, Q violates equity, and S violates stability of tenure. R follows the scalar chain, so it is not a violation.',
}));
Q('ar_gangplank', ar({
  t: 3, d: 3, c: 'analysis',
  a: 'Fayol\'s gang plank lets two employees at the same level talk directly when quick action is needed.',
  r: 'Unity of direction means one head and one plan for a group of activities having the same objective.',
  key: 'b',
  sol: 'Both statements are true, but unity of direction has nothing to do with why a gang plank is allowed; the gang plank exists to avoid delay in the scalar chain.',
}));
Q('ar_uoc', ar({
  t: 3, d: 2, c: 'understanding',
  a: 'A worker who takes orders from two bosses may not know whom to obey.',
  r: 'Unity of command says that each subordinate should receive orders from only one superior.',
  key: 'a',
  sol: 'Both are true, and the reason explains the assertion: confusion arises exactly because the rule of one boss for each subordinate is broken.',
}));
Q('tf_order', tf({
  t: 3, d: 1, c: 'recall',
  stem: 'Fayol\'s principle of order means there should be a place for everything and everyone, and everything and everyone should be in its place.',
  ans: true,
  sol: 'True. Order covers both materials and people, so that no time is lost searching and each person is placed where needed.',
}));
Q('fb_fayol', fb({
  t: 3, d: 2, c: 'understanding',
  stem: 'Complete the analogy. One head and one plan : unity of direction :: One subordinate and one boss : ___',
  acc: [['unity of command']],
  sol: 'One head and one plan for a group of activities is unity of direction; one boss for each subordinate is unity of command.',
}));
Q('mt_fayol', match({
  t: 3, d: 3, c: 'application', marks: 2,
  stem: 'Match each practice at the imagined Ratnagiri Mango Packers with the principle of Fayol it follows.',
  pairs: [
    ['Graders only grade; packers only pack', 'Division of work'],
    ['Wages are fair to workers and affordable for the firm', 'Remuneration of employees'],
    ['Pricing is decided at head office; shift timings by each yard head', 'Centralisation and decentralisation'],
    ['A packer may suggest and try a faster folding method', 'Initiative'],
  ],
  sol: 'Separate tasks show division of work; fair and affordable wages show remuneration; sharing decisions between head office and yards balances centralisation and decentralisation; trying one\'s own idea is initiative.',
}));
Q('s_uoc_uod', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Using the imagined Leh Apricot Processors as the example, distinguish unity of command from unity of direction on two bases.',
  model: '1. **Meaning:** unity of command means **one boss for each employee**; unity of direction means **one head and one plan** for a group of activities, such as the trade-fair stall.\n2. **Aim:** unity of command **prevents confusion** in orders; unity of direction **coordinates** activities towards **one objective**.',
  sol: 'Two valid bases of difference.',
  scheme: [['First basis', 1], ['Second basis', 1]],
}));
Q('s_init_equity', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'At the imagined Imphal Handloom Collective, the leader welcomes weavers\' new patterns and treats every weaver fairly, whatever her community. Name and explain the two principles of Fayol shown.',
  model: '1. **Initiative:** welcoming weavers\' **own new patterns** encourages them to think out and carry out **their own plans**.\n2. **Equity:** treating every weaver **fairly and kindly**, without bias of **community**, builds loyalty.',
  sol: 'Initiative and equity named and explained.',
  scheme: [['Initiative', 1], ['Equity', 1]],
}));
Q('s3_fayol', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'At the imagined Puducherry Paper Crafts, (i) cutters take orders from both the design head and the dispatch head, (ii) a supervisor gives the easiest work to his friends, and (iii) the owner\'s promise of a festival bonus was broken, and rule-breaking has since increased. Identify the principle of Fayol violated in each and explain its effect.',
  model: '(i) **Unity of command:** two bosses give **conflicting orders**, causing confusion and delay.\n(ii) **Equity:** favouring friends is **unjust**, so other workers lose morale and trust.\n(iii) **Discipline:** discipline needs **clear and fair agreements** honoured by both sides; when the owner broke the bonus promise, workers stopped respecting the rules.',
  sol: 'Three principles identified with their effects.',
  scheme: [['(i) Unity of command', 1], ['(ii) Equity', 1], ['(iii) Discipline', 1]],
}));
Q('s3_scalar', short({
  t: 3, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'At an imagined cement plant, the shift supervisor in production urgently needs a spare part from the stores supervisor, who works at the same level. Explain the scalar chain, and how Fayol\'s gang plank would help here.',
  model: '1. **Scalar chain:** the formal **line of authority and communication** runs from the top manager down to the lowest rank, and messages normally **follow every link**.\n2. **Problem:** going up to the plant head and down again to the stores supervisor would **waste time** in an emergency.\n3. **Gang plank:** the two supervisors may **talk directly**, keeping their **superiors informed**, so the part arrives quickly without breaking the chain.',
  sol: 'Scalar chain, the delay problem and the gang plank explained.',
  scheme: [['Scalar chain', 1], ['Delay through the full chain', 1], ['Gang plank with superiors informed', 1]],
}));
Q('s3_authority', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'The imagined Leh Apricot Processors has three drying yards. The owner fixes prices herself, lets each yard head decide shift timings, and gives each yard head the power to hire helpers for the season she is responsible for. Identify and explain the principles of Fayol shown.',
  model: '1. **Centralisation and decentralisation:** **prices** are decided at the top, while **shift timings** are left to yard heads; Fayol wanted a **balance** suited to the firm.\n2. **Authority and responsibility:** each yard head is **responsible** for the season and is given the **authority** to hire helpers, so the two match.\n3. Together these let the owner **keep control** of key decisions while yard heads act quickly.',
  sol: 'Two principles identified and explained, with their combined effect.',
  scheme: [['Centralisation and decentralisation', 1], ['Authority and responsibility', 1], ['Combined effect', 1]],
}));
Q('l_fayol', long({
  t: 3, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'The imagined Hubballi Bus Depot runs 120 buses with drivers, conductors, mechanics and clerks. Explain any five principles of Fayol, giving an example of how the depot manager could apply each.',
  model: '1. **Division of work:** mechanics **only repair**, clerks **only handle tickets and accounts**, so each becomes skilled.\n2. **Unity of command:** each conductor reports to **one supervisor**, so orders never conflict.\n3. **Scalar chain:** requests move through **supervisor, manager and controller**; in an emergency, two supervisors may use a **gang plank**.\n4. **Equity:** duty rosters and overtime are shared **fairly**, without favour to friends or relatives.\n5. **Stability of tenure of personnel:** route planners stay in their posts **long enough** to learn the routes well, instead of being moved every month.',
  sol: 'One mark for each principle explained with a depot example.',
  scheme: [['First principle with example', 1], ['Second principle with example', 1], ['Third principle with example', 1], ['Fourth principle with example', 1], ['Fifth principle with example', 1]],
}));

// ================================================================ t04 Taylor and Fayol compared; relevance today
Q('m_compare', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'A Class 12 student at an imagined school in Pune makes four statements comparing Taylor and Fayol. Which one is correct?',
  opts: ['Taylor focused on efficiency at the shop floor; Fayol focused on the management of the whole organisation', 'Taylor was a mining engineer who wrote about top management; Fayol was a shop-floor engineer', 'Both based their ideas only on laboratory experiments', 'Fayol\'s principles apply only to factories, while Taylor\'s apply everywhere'],
  sol: 'Taylor looked at the work of the operative level (shop floor); Fayol looked at the whole organisation from the top manager\'s view.',
}));
Q('m_compare_combo', mcq({
  t: 4, d: 3, c: 'analysis', fixed: true, key: 'd',
  stem: 'Read these statements about Taylor and Fayol:\nP. Fayol\'s perspective was that of a top manager.\nQ. Taylor\'s focus was on raising productivity at the shop floor.\nR. Fayol\'s principles have universal application, while Taylor\'s fit mainly specialised production work.\nS. Taylor\'s ideas came mainly from personal experience as a director.\nWhich statements are correct?',
  opts: ['P and S only', 'Q and S only', 'P, R and S', 'P, Q and R'],
  sol: 'P, Q and R are correct. S is wrong: Taylor\'s ideas came from observation and experiments at the shop floor; it was Fayol who drew on his experience as a top manager.',
}));
Q('m_relevance', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'An imagined grocery-delivery start-up in Bengaluru gives each rider just one team lead to report to, and uses delivery data to find and teach the fastest way to pack an order. These practices show that',
  opts: ['Fayol\'s unity of command and Taylor\'s science, not rule of thumb, are still relevant', 'principles of management no longer apply to modern firms', 'only Taylor\'s principles are relevant today', 'only Fayol\'s principles are relevant today'],
  sol: 'One boss per rider is unity of command (Fayol); finding the best method from data is science, not rule of thumb (Taylor). Both remain relevant.',
}));
Q('ar_compare', ar({
  t: 4, d: 3, c: 'analysis',
  a: 'Fayol\'s principles can be applied in almost every kind of organisation.',
  r: 'Taylor\'s principles were developed mainly for work at the production level.',
  key: 'b',
  sol: 'Both statements are true, but the reason describes Taylor and does not explain why Fayol\'s principles apply widely; that comes from their general, administrative nature.',
}));
Q('tf_compare', tf({
  t: 4, d: 2, c: 'understanding',
  stem: 'Henri Fayol drew his principles mainly from his own long career as a top manager, whereas F. W. Taylor built his from observation and experiments at the workplace.',
  ans: true,
  sol: 'True. Fayol wrote from the view of a managing director; Taylor, an engineer, studied work at the operative level.',
}));
Q('s_relevance', short({
  t: 4, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Give two examples of how Fayol\'s principles are relevant in an imagined online bookshop based in Kolkata.',
  model: '1. **Unity of command:** each customer-care agent reports to **one shift lead**, so instructions on refunds never conflict.\n2. **Order:** every book has a **fixed rack code** in the warehouse, so orders are picked quickly without searching.',
  sol: 'Two principles with modern examples.',
  scheme: [['First principle with example', 1], ['Second principle with example', 1]],
}));
Q('s3_compare', short({
  t: 4, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Kabir claims that Taylor and Fayol taught the same things. Correct him by comparing their contributions on three bases: perspective, focus and applicability.',
  model: '1. **Perspective:** Fayol wrote as a **top manager** looking at the whole firm; Taylor wrote as an **engineer** looking at the shop floor.\n2. **Focus:** Fayol focused on **general administration**; Taylor focused on **productivity** and efficiency of workers.\n3. **Applicability:** Fayol\'s principles apply **universally** to all organisations; Taylor\'s suit mainly **specialised production** work.',
  sol: 'Three bases of comparison.',
  scheme: [['Perspective', 1], ['Focus', 1], ['Applicability', 1]],
}));
Q('s3_relevance', short({
  t: 4, d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: 'A manager of an imagined call-centre start-up in Bhubaneswar says that principles written about a hundred years ago are useless today. Evaluate this view with three reasons.',
  model: '1. **Still relevant — unity of command:** agents still need **one team lead**; two bosses would cause confusion in any age.\n2. **Still relevant — science, not rule of thumb:** call scripts and steps are now **tested with data**, the same idea in modern form.\n3. **Needs adapting — flexibility:** some ideas, such as rigid **centralisation**, must be **modified** for fast, digital work. So the view is **wrong**: the principles remain useful, though they must be adapted.',
  sol: 'A judgement supported by three reasons.',
  scheme: [['First reason', 1], ['Second reason', 1], ['Third reason with judgement', 1]],
}));
Q('l_relevance', long({
  t: [4, 2, 3], d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'The imagined Leh Apricot Processors now sells online across India, tracks every order on an app and has young staff in three cities.\n(a) Distinguish between the contributions of Taylor and Fayol on two bases. [2]\n(b) Evaluate the relevance of any three principles, from either thinker, for this firm today. [3]',
  model: '(a) **Perspective:** Fayol saw the firm from the **top manager\'s** chair; Taylor from the **shop floor**. **Applicability:** Fayol\'s principles are **universal**; Taylor\'s fit mainly **specialised production** work.\n\n(b) 1. **Science, not rule of thumb (Taylor):** **highly relevant**; app data can show the fastest way to pack and dispatch orders, replacing guesswork.\n2. **Unity of command (Fayol):** **relevant**; staff spread across three cities need **one clear boss** each, or online instructions may conflict.\n3. **Centralisation and decentralisation (Fayol):** relevant but **needs adapting**; city teams must decide quickly on local deliveries, so the firm should **decentralise** more than a factory of Fayol\'s time.\n\nOverall the principles remain **useful**, provided they are applied **flexibly**.',
  sol: 'Two bases of difference; three principles evaluated for a modern firm with an overall judgement.',
  scheme: [['(a) Two bases', 2], ['(b) Three principles evaluated', 2], ['(b) Overall judgement', 1]],
}));

// ================================================================ case-based
Q('cb_firozabad', caseQ({
  t: 3, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined firm and people, written by SOYL for practice.)*',
  passage: '**Firozabad Bangle Works (imagined), Uttar Pradesh**\n\nAt Firozabad Bangle Works, glass is melted in one shed and shaped in another. Workers in the shaping shed often get instructions from both the shed head and the owner\'s son, who sometimes contradict each other. Moulds lie wherever there is space, so time is lost searching. The owner pays fair wages and has kept most of her furnace workers for over ten years. On Fridays, everyone eats together, and the workers proudly call themselves "one family".',
  parts: [
    child('a', mcq({ t: 3, d: 2, c: 'application', stem: 'Which principle of Fayol is violated when shaping-shed workers get instructions from two people?', opts: ['Unity of command', 'Unity of direction', 'Equity', 'Initiative'], sol: 'Two bosses giving orders to the same workers breaks unity of command.' })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Name the principle of Fayol that is ignored when moulds lie wherever there is space.', model: '**Order.**', sol: 'There is no fixed place for materials, so the principle of order is ignored.', scheme: [['Order', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify two principles of Fayol that the owner follows, quoting the words that show each.', model: '1. **Stability of tenure:** "**kept most of her furnace workers for over ten years**".\n2. **Esprit de corps:** "**everyone eats together**" and "**one family**".', sol: 'Two principles followed, with supporting words.', scheme: [['First principle with words', 1], ['Second principle with words', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Suggest how the owner can fix the problem of contradictory instructions, and name the principle she would then follow.', model: 'She should make the **shed head the only person** who gives instructions to shaping workers, with her son passing his views **through** the shed head. She would then follow **unity of command**.', sol: 'A suitable fix with the principle named.', scheme: [['Suitable fix', 1], ['Principle named', 1]] }),
    ]),
  ],
}));
Q('cb_ratnagiri', caseQ({
  t: [2, 4], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined firm and people, written by SOYL for practice.)*',
  passage: '**Ratnagiri Mango Packers (imagined), Maharashtra**\n\nEvery May, Ratnagiri Mango Packers hires extra packers. This year the manager, Sayali, timed different ways of wrapping and boxing fruit and taught the best one to all. She sent two quick learners on a short grading course and promoted them to graders. Packers who had once worked slowly to stretch the season were told that faster packing would bring more export orders and a bigger bonus, and daily output rose. Sayali now meets the packers\' representatives every evening to sort out problems together.',
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'application', stem: 'Timing different ways of boxing fruit and teaching the best one to all follows which principle of Taylor?', opts: ['Science, not rule of thumb', 'Harmony, not discord', 'Maximum, not restricted, output', 'Unity of command'], sol: 'Finding the best method by study and teaching it to all is science, not rule of thumb.' })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Name the principle of Taylor shown by the change in the packers\' attitude to speed.', model: '**Maximum, not restricted, output.**', sol: 'Packers stop holding back output once they see the gain: maximum, not restricted, output.', scheme: [['Maximum, not restricted, output', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify two other principles of Taylor followed by Sayali, quoting the words that show each.', model: '1. **Development of each person to greatest efficiency and prosperity:** "**sent two quick learners on a short grading course and promoted them**".\n2. **Cooperation, not individualism:** "**meets the packers\' representatives every evening to sort out problems together**".', sol: 'Two principles with supporting words.', scheme: [['First principle with words', 1], ['Second principle with words', 1]] }), [
      short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Explain whether Taylor\'s principles are still relevant for a seasonal business like this one.', model: '**Yes.** The season is **short**, so finding the **best method** and raising **output** quickly matter even more; **training** and **cooperation** keep temporary staff productive.', sol: 'A reasoned judgement on relevance.', scheme: [['Judgement', 1], ['Reasons from the case', 1]] }),
    ]),
  ],
}));
