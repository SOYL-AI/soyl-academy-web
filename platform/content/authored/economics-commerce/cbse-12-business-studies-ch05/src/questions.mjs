// CBSE 12 Business Studies, ch05 Organising — question bank. Every firm, person and situation is
// imagined and written by SOYL for practice (labelled as such); no NCERT text, case or exercise and no
// board/sample-paper item is reused (D-036). Concepts follow the 2026-27 syllabus topics t01–t04.
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// ================================================================ t01 Concept, steps and importance of organising
Q('m_meaning', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Which statement best describes **organising** as a function of management?',
  opts: [
    'Arranging activities, people and resources and setting up authority relationships so that plans can be carried out',
    'Deciding in advance what is to be done and how it is to be done',
    'Comparing actual performance with standards and correcting deviations',
    'Guiding, motivating and supervising employees at work',
  ],
  sol: 'Organising puts plans into action by grouping work, assigning it and fixing who reports to whom. Deciding in advance is planning, comparing with standards is controlling, and guiding employees is directing.',
}));
Q('m_step_first', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which is the **first** step in the process of organising?',
  opts: ['Identification and division of work', 'Departmentalisation', 'Assignment of duties', 'Establishing reporting relationships'],
  sol: 'The total work is first identified and split into manageable jobs; only then can similar jobs be grouped (departmentalisation), duties assigned and reporting lines fixed.',
}));
Q('m_step_dept', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'The owner of an imagined furniture firm in Jodhpur groups all carving, polishing and assembly jobs under a "Production" unit and all showroom and online-order jobs under a "Sales" unit. Which step of organising is she performing?',
  opts: ['Departmentalisation', 'Identification and division of work', 'Assignment of duties', 'Establishing reporting relationships'],
  sol: 'Grouping similar jobs into units such as Production and Sales is departmentalisation. Dividing the work into jobs comes before it, and naming people for jobs and fixing who reports to whom come after it.',
}));
Q('m_step_reporting', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'At an imagined courier start-up in Kochi, the founder announces that the four delivery supervisors will report to the operations manager, who in turn will report to her. Which step of organising does this show?',
  opts: ['Establishing reporting relationships', 'Departmentalisation', 'Assignment of duties', 'Identification and division of work'],
  sol: 'Deciding who reports to whom builds the chain of authority, which is the step of establishing reporting relationships.',
}));
Q('m_step_assign', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'After creating a Quality Control department, the manager of an imagined spice-packing unit in Guntur appoints Lakshmi, a food technologist, to head it because of her training. Which step of organising is this?',
  opts: ['Assignment of duties', 'Departmentalisation', 'Establishing reporting relationships', 'Identification and division of work'],
  sol: 'Giving a defined job to a person suited to it by skill and training is assignment of duties.',
}));
Q('m_imp_spec', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'When each worker in a firm repeatedly does one part of the total work, skill and speed improve. Which benefit of organising does this describe?',
  opts: ['Benefits of specialisation', 'Adaptation to change', 'Development of personnel', 'Expansion and growth'],
  sol: 'Repeating one kind of work builds skill and speed, which is the benefit of specialisation that comes from dividing work systematically.',
}));
Q('m_imp_resources', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'An imagined hotel in Shimla found that two clerks were both recording guest check-ins while nobody tracked laundry. After the work was reorganised, each task had exactly one owner. Which importance of organising is shown?',
  opts: ['Optimum utilisation of resources', 'Adaptation to change', 'Development of personnel', 'Expansion and growth'],
  sol: 'Removing duplication of work and covering the neglected task means people and time are used fully and without waste: optimum utilisation of resources.',
}));
Q('m_imp_adapt', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'When online orders overtook walk-in sales, an imagined bookshop chain in Pune shifted staff from shop counters to a new e-commerce team without disturbing the rest of the business. Which importance of organising does this reflect?',
  opts: ['Adaptation to change', 'Benefits of specialisation', 'Clarity in working relationships', 'Effective administration'],
  sol: 'A sound organisation structure can be modified when the environment changes, so the firm adjusts roles to new conditions: adaptation to change.',
}));
Q('ar_steps', ar({
  t: 1, d: 2, c: 'analysis', key: 'a',
  a: 'Departmentalisation can be done only after the total work has been divided into jobs.',
  r: 'Departmentalisation means grouping similar or related jobs into units.',
  sol: 'Both are true, and R explains A: since departmentalisation groups jobs, the jobs must first exist, that is, the work must already have been identified and divided.',
}));
Q('tf_clarity', tf({
  t: 1, d: 1, c: 'understanding', ans: true,
  stem: 'True or false? By fixing who reports to whom, organising brings clarity in working relationships and helps fix responsibility.',
  sol: 'Clear reporting lines tell each person from whom to take orders and to whom to report, so responsibility for each task can be fixed.',
}));
Q('fb_dept', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Grouping similar and related jobs into units such as purchase, production and sales is called ___.',
  acc: [['departmentalisation', 'departmentation']],
  sol: 'This step is departmentalisation: related jobs are grouped into departments.',
}));
Q('ord_steps', ord({
  t: 1, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange the steps that the manager of an imagined bakery in Indore follows while organising, in the correct order.',
  items: [
    'Lists all the work and splits it into jobs such as kneading, baking, packing and selling',
    'Groups related jobs into Production and Sales departments',
    'Gives each job to a suitable person',
    'Decides that bakers report to the head baker and the head baker to the owner',
  ],
  sol: 'Identification and division of work comes first, then departmentalisation, then assignment of duties, and finally establishing reporting relationships.',
}));
Q('s_meaning', short({
  t: 1, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is meant by organising? Why is it called the means of putting plans into action?',
  model: '**Organising** is identifying and grouping the work, assigning it to people and fixing **authority and reporting relationships**. Plans state what is to be done; organising arranges **who will do what, with which resources**, so it turns plans into action.',
  sol: 'Meaning with its elements, then the link with implementing plans.',
  scheme: [['Meaning of organising', 1], ['Link with implementing plans', 1]],
}));
Q('s_spec', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined textile mill in Surat assigns dyeing, weaving and printing to separate trained teams. Explain the importance of organising shown here.',
  model: 'This shows the **benefits of specialisation**. Each team does one kind of work again and again, so it gains **skill and speed**, makes fewer errors and the mill produces more output with the same effort.',
  sol: 'Name the benefit and explain how repetition of one task raises efficiency.',
  scheme: [['Benefits of specialisation identified', 1], ['Explanation', 1]],
}));
Q('s3_steps', short({
  t: 1, d: 2, c: 'application', marks: 3, wl: S3,
  stem: 'Explain any three steps in the process of organising, using an imagined school canteen as your example.',
  model: '1. **Identification and division of work:** the canteen manager lists all work (buying, cooking, serving, cleaning) and splits it into jobs.\n2. **Departmentalisation:** related jobs are grouped, e.g. a kitchen unit and a service counter.\n3. **Establishing reporting relationships:** cooks report to the head cook and counter staff to the supervisor, who reports to the manager.',
  sol: 'Any three of the four steps, each explained and linked to the canteen.',
  scheme: [['First step explained', 1], ['Second step explained', 1], ['Third step explained', 1]],
}));
Q('s3_importance', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'State three ways in which organising helps a growing business.',
  model: '1. **Clarity in working relationships:** everyone knows whom to report to, so communication and responsibility are clear.\n2. **Optimum utilisation of resources:** jobs are fixed without overlap, so people, money and machines are not wasted.\n3. **Expansion and growth:** a sound structure lets the firm add branches, products or departments in an orderly way.',
  sol: 'Any three points of importance, each with a brief explanation.',
  scheme: [['First point', 1], ['Second point', 1], ['Third point', 1]],
}));
Q('l_steps_importance', long({
  t: 1, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'Ritika is setting up an imagined online tutoring company in Bhopal with 40 tutors and 10 support staff. Explain the steps she should follow to organise the company and state one benefit she can expect.',
  model: '1. **Identify and divide the work:** list all activities (teaching, scheduling, technical support, billing, marketing) and split them into jobs.\n2. **Departmentalise:** group related jobs into units such as Academics, Technology, Accounts and Marketing.\n3. **Assign duties:** give each job to a person suited to it, e.g. the maths tutors to Academics and an engineer to Technology.\n4. **Establish reporting relationships:** decide that tutors report to subject heads and heads report to Ritika, so authority is clear.\n5. **Benefit:** with work divided and lines clear, the company gains **specialisation** and **clarity in working relationships**, and can grow by adding new subjects without confusion.',
  sol: 'The four steps applied to the company, plus one relevant benefit.',
  scheme: [['Identification and division of work', 1], ['Departmentalisation', 1], ['Assignment of duties', 1], ['Reporting relationships', 1], ['One benefit with reason', 1]],
}));

// ================================================================ t02 Functional and divisional structures
Q('m_func_meaning', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'In a **functional structure**, activities are grouped on the basis of',
  opts: ['the major functions such as production, marketing, finance and human resources', 'the different products made by the firm', 'the regions in which the firm sells', 'the personal friendships among employees'],
  sol: 'A functional structure groups jobs by function. Grouping by product is the divisional structure; friendships give rise to informal organisation.',
}));
Q('m_func_suits', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'An imagined company in Ludhiana makes only one product, bicycle chains, but its operations are large and need specialised staff. Which structure suits it best?',
  opts: ['Functional structure', 'Divisional structure', 'Informal structure', 'No structure, as the firm makes only one product'],
  sol: 'A large firm with a single product line and a need for specialisation suits a functional structure. A divisional structure is meant for firms with several distinct products.',
}));
Q('m_div_suits', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'An imagined group in Chennai makes cement, packaged tea and solar panels, each needing its own production methods and marketing. Which structure is most suitable?',
  opts: ['Divisional structure', 'Functional structure', 'Informal structure', 'A single department for all three products'],
  sol: 'Several unrelated product lines, each with its own technology and market, call for a divisional structure in which each product forms a separate division.',
}));
Q('m_div_disadv', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which of the following is a **limitation** of the divisional structure?',
  opts: [
    'Each division sets up its own functions, so activities and costs are duplicated',
    'Functional heads stress their own department over the goals of the firm',
    'It cannot be used by a firm with many product lines',
    'Profit of each product cannot be measured',
  ],
  sol: 'Because every division has its own production, marketing and finance, the same activities are repeated, which raises costs. Stress on departmental goals is a limitation of the functional structure; the divisional form suits many product lines and makes profit per product easy to measure.',
}));
Q('m_func_adv', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which advantage is associated with the **functional** structure?',
  opts: [
    'Minimal duplication of effort, since each function is performed in one department',
    'Each division head is accountable for the profit of a product',
    'New product lines can be added without disturbing existing ones',
    'Heads gain experience of all functions of one product',
  ],
  sol: 'In a functional structure each function is concentrated in one department, so work is not repeated. The other three are advantages of the divisional structure.',
}));
Q('m_div_profit', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'The board of an imagined appliance maker in Noida wants to know exactly how profitable its fans, coolers and water heaters each are, and to hold one manager answerable for each. Which structure helps most?',
  opts: ['Divisional structure', 'Functional structure', 'Informal structure', 'Centralised functional structure'],
  sol: 'In a divisional structure each product division has its own revenue and costs, so its profit can be measured and its head held accountable.',
}));
Q('m_func_conflict', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'At an imagined garment exporter in Tiruppur, the production head insists on long runs of one design to cut costs while the marketing head wants many small batches of new designs. This conflict is typical of which structure?',
  opts: ['Functional structure', 'Divisional structure', 'Informal organisation', 'Decentralised organisation'],
  sol: 'In a functional structure each head looks at goals from the view of one function, so conflicts between departments and difficulty in coordination are common.',
}));
Q('m_div_growth', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'An imagined food company in Nagpur plans to launch a frozen-snacks line next year and wants to add it without upsetting its existing biscuit and juice businesses. Which structure makes this easiest?',
  opts: ['Divisional structure', 'Functional structure', 'Informal organisation', 'A structure without reporting relationships'],
  sol: 'A divisional structure allows a new division to be added for a new product without disturbing existing divisions, which supports expansion.',
}));
Q('ar_func_coord', ar({
  t: 2, d: 3, c: 'analysis', key: 'a',
  a: 'Coordination across departments may become difficult in a functional structure.',
  r: 'Each functional head tends to give more importance to the objectives of his or her own department.',
  sol: 'Both are true, and R explains A: when heads chase departmental goals, the departments pull apart and coordinating them becomes harder.',
}));
Q('ar_div_cost', ar({
  t: 2, d: 3, c: 'analysis', key: 'b',
  a: 'A divisional structure can be costly to run.',
  r: 'A divisional structure helps in developing varied skills in the head of a division.',
  sol: 'Both are true, but R does not explain A. The cost comes from duplication of functions in every division; developing varied skills is a separate advantage.',
}));
Q('tf_div_profit', tf({
  t: 2, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? In a divisional structure, the performance of each division can be judged because its revenues and costs are separately known.',
  sol: 'Each division works like a separate unit with its own revenues and costs, so its profit and performance can be assessed and its head held accountable.',
}));
Q('mt_structures', match({
  t: 2, d: 2, c: 'understanding',
  stem: 'Match each feature of an organisation structure with the structure it belongs to.',
  pairs: [
    ['Grouping of jobs by product lines', 'Divisional structure'],
    ['Grouping of jobs by major functions', 'Functional structure'],
    ['Arises from social interaction among employees', 'Informal organisation'],
    ['Deliberately designed, with official rules and positions', 'Formal organisation'],
  ],
  sol: 'Product-wise grouping is divisional; function-wise grouping is functional; networks from social contact are informal; a structure deliberately set by management is formal.',
}));
Q('s_func_meaning', short({
  t: 2, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is a functional structure? Name the kind of business for which it is suitable.',
  model: 'A **functional structure** groups jobs of a similar nature into departments by **function**, such as production, marketing, finance and personnel, each reporting to a head. It suits a **large firm with a single or closely related product line** that needs specialisation.',
  sol: 'Meaning plus suitability.',
  scheme: [['Meaning', 1], ['Suitability', 1]],
}));
Q('s_div_meaning', short({
  t: 2, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is a divisional structure? When should a firm adopt it?',
  model: 'In a **divisional structure** the organisation is split into **divisions by product**, and each division has its own production, marketing and finance. A firm should adopt it when it has **many distinct product lines**, each needing its own resources and expertise.',
  sol: 'Meaning plus suitability.',
  scheme: [['Meaning', 1], ['Suitability', 1]],
}));
Q('s3_func_adv', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'State three advantages of a functional structure for a large single-product manufacturer.',
  model: '1. **Specialisation:** each department focuses on one function, so staff become experts and efficiency rises.\n2. **Less duplication:** each function is done in one place, so effort and cost are not repeated.\n3. **Easier training and control:** staff in one department need training in a narrow set of skills, and the head can supervise them closely.',
  sol: 'Any three advantages of the functional structure, each briefly explained.',
  scheme: [['First advantage', 1], ['Second advantage', 1], ['Third advantage', 1]],
}));
Q('s3_div_limits', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'An imagined consumer-goods group in Kolkata is thinking of moving to a divisional structure. Explain three problems it should be ready for.',
  model: '1. **Conflict among divisions:** divisions may compete for funds, staff and attention from top management.\n2. **Higher cost:** each division needs its own production, marketing and finance, so activities are duplicated.\n3. **Divisional self-interest:** powerful division heads may favour their own division and ignore the interests of the group as a whole.',
  sol: 'Three limitations of the divisional structure, each explained.',
  scheme: [['First limitation', 1], ['Second limitation', 1], ['Third limitation', 1]],
}));
Q('l_func_vs_div', long({
  t: 2, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Distinguish between functional and divisional structures on any five bases.',
  model: '1. **Basis of grouping:** functional groups jobs by **function**; divisional groups them by **product**.\n2. **Specialisation:** functional gives **functional** specialisation; divisional gives **product** specialisation.\n3. **Responsibility for results:** in functional it is hard to fix responsibility for overall performance; in divisional each **division head is accountable for profit**.\n4. **Cost:** functional is **economical** as there is no duplication; divisional is **costly** because each division repeats the functions.\n5. **Coordination and growth:** coordination is **difficult across** functional departments; in divisional it is easier within a division, and new divisions can be added for **expansion**.',
  sol: 'Five bases with both sides stated on each.',
  scheme: [['Basis 1, both sides', 1], ['Basis 2, both sides', 1], ['Basis 3, both sides', 1], ['Basis 4, both sides', 1], ['Basis 5, both sides', 1]],
}));
Q('l_div_merits', long({
  t: 2, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'An imagined company in Ahmedabad makes paints, adhesives and cosmetics. Advise it, with five reasons, whether a divisional structure would suit it.',
  model: 'A **divisional structure** would suit the company because:\n1. **Distinct products:** paints, adhesives and cosmetics need different technologies, suppliers and markets, so each can form a division.\n2. **Accountability:** each division head can be held responsible for that division\'s **profit**, so weak units are spotted early.\n3. **Quick decisions:** divisions have autonomy and can respond fast to their own customers.\n4. **Managerial development:** division heads handle all functions of a product, preparing them for top posts.\n5. **Growth:** a new product line can be added as a new division without disturbing the others. The firm should, however, guard against **duplication of costs**.',
  sol: 'Clear recommendation with five reasons linked to the case; a note on cost is good practice.',
  scheme: [['Recommendation with product diversity', 1], ['Accountability for profit', 1], ['Quick decision-making', 1], ['Development of managers', 1], ['Ease of expansion', 1]],
}));

// ================================================================ t03 Formal and informal organisation
Q('m_formal_feature', mcq({
  t: 3, d: 1, c: 'understanding',
  stem: 'Which is a feature of **formal** organisation?',
  opts: [
    'It is deliberately designed by top management to achieve organisational goals',
    'It arises on its own from friendships among employees',
    'Communication flows in any direction without fixed channels',
    'It has no written rules or procedures',
  ],
  sol: 'Formal organisation is consciously created by management with defined positions and rules. The other three describe informal organisation.',
}));
Q('m_informal_origin', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Informal organisation emerges mainly from',
  opts: ['social interaction among people working together', 'the official organisation chart', 'the rules laid down by the board of directors', 'government regulation of companies'],
  sol: 'When people work together they form friendships and groups based on shared interests; this network is the informal organisation.',
}));
Q('m_grapevine', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'The web of channels through which news passes from person to person in an informal organisation, in any direction, is known as the',
  opts: ['grapevine', 'scalar chain', 'chain of command', 'span of management'],
  sol: 'Informal communication spreads like a grapevine: fast, in all directions, and without following the official chain. Scalar chain and chain of command belong to formal communication.',
}));
Q('m_informal_case', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Staff of an imagined bank branch in Mysuru who play cricket together on Sundays often solve work problems over tea without waiting for official meetings. This illustrates',
  opts: ['informal organisation', 'formal organisation', 'divisional structure', 'decentralisation'],
  sol: 'A group formed through a shared hobby, with communication outside official channels, is informal organisation.',
}));
Q('m_formal_limit', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which is a **limitation** of formal organisation?',
  opts: [
    'Decisions may be delayed because the official chain of command must be followed',
    'Rumours spread quickly and cannot be controlled',
    'It is difficult to fix responsibility',
    'It has no stable rules',
  ],
  sol: 'Following the scalar chain can slow decisions. Rumours are a limitation of informal organisation, and formal organisation actually makes it easy to fix responsibility and gives stability.',
}));
Q('m_informal_merit', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'The production manager of an imagined pharma unit in Baddi uses lunch-time conversations to learn how workers feel about a new shift plan before announcing it. Which advantage of informal organisation is she using?',
  opts: [
    'It gives quick feedback and fills gaps in formal communication',
    'It makes responsibility easy to fix',
    'It ensures unity of command',
    'It provides a written procedure for every task',
  ],
  sol: 'Informal channels carry views quickly and help managers understand workers, complementing formal communication. Fixing responsibility, unity of command and written procedures are features of formal organisation.',
}));
Q('ar_informal_rumour', ar({
  t: 3, d: 2, c: 'analysis', key: 'a',
  a: 'Informal organisation can sometimes harm a business.',
  r: 'False rumours can spread quickly through informal channels.',
  sol: 'Both are true, and R explains A: misleading news spreads fast through the grapevine and can create fear or resistance, which is one way informal organisation can harm the firm.',
}));
Q('ar_formal_rigid', ar({
  t: 3, d: 3, c: 'analysis', key: 'c',
  a: 'Formal organisation gives stability to an organisation.',
  r: 'Formal organisation is flexible because it has no fixed rules.',
  sol: 'A is true: well-defined rules and positions make behaviour predictable, which gives stability. R is false: formal organisation has fixed rules and is often criticised for rigidity.',
}));
Q('tf_informal_written', tf({
  t: 3, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? Informal organisation is created through written rules and an official chart prepared by management.',
  sol: 'False. Informal organisation has no written rules or official chart; it grows out of personal and social relationships. Written rules belong to formal organisation.',
}));
Q('s_informal_meaning', short({
  t: 3, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is informal organisation? Give one example from an imagined office.',
  model: '**Informal organisation** is the network of **personal and social relationships** that forms when people work together, outside the official structure. Example: clerks of an imagined insurance office in Lucknow who share lunch daily and pass on news to one another.',
  sol: 'Meaning plus a suitable example.',
  scheme: [['Meaning', 1], ['Example', 1]],
}));
Q('s3_informal_merits', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain any three advantages of informal organisation for a firm.',
  model: '1. **Faster communication:** news travels quickly because it need not follow the chain of command.\n2. **Social needs met:** workers find friendship and a sense of belonging, which raises job satisfaction.\n3. **Support to formal organisation:** managers learn workers\' real views through informal channels, which helps them plan and fill gaps in formal communication.',
  sol: 'Any three advantages, each briefly explained.',
  scheme: [['First advantage', 1], ['Second advantage', 1], ['Third advantage', 1]],
}));
Q('s_formal_merits', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give two advantages of formal organisation.',
  model: '1. **Easy to fix responsibility:** each position has defined duties and a clear superior, so it is known who is answerable.\n2. **Stability and no overlap:** rules and procedures make behaviour predictable and prevent two people doing the same work.',
  sol: 'Any two advantages, each explained.',
  scheme: [['First advantage', 1], ['Second advantage', 1]],
}));
Q('l_formal_vs_informal', long({
  t: 3, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Differentiate between formal and informal organisation on any five bases.',
  model: '1. **Meaning:** formal is the **official structure** of roles and authority; informal is the **network of social relationships** among employees.\n2. **Origin:** formal is **deliberately created** by management; informal **arises on its own** from interaction.\n3. **Authority:** in formal it comes from **position**; in informal it comes from **personal qualities** and acceptance by the group.\n4. **Communication:** formal follows the **scalar chain**; informal flows freely in **any direction** (grapevine).\n5. **Nature and purpose:** formal is **rigid** and aims at organisational goals; informal is **flexible** and meets members\' social needs.',
  sol: 'Five bases with both sides on each.',
  scheme: [['Basis 1', 1], ['Basis 2', 1], ['Basis 3', 1], ['Basis 4', 1], ['Basis 5', 1]],
}));

// ================================================================ t04 Delegation and decentralisation
Q('m_deleg_meaning', mcq({
  t: 4, d: 1, c: 'understanding',
  stem: 'Delegation of authority means',
  opts: [
    'a superior passing part of his or her authority to a subordinate to get a task done',
    'a subordinate taking over all the authority of the superior',
    'the superior giving up all responsibility for the work',
    'spreading authority to every level of the firm as a policy',
  ],
  sol: 'Delegation is the downward transfer of some authority from a superior to a subordinate for a task. The superior does not give up responsibility or accountability, and spreading authority to all levels as a policy is decentralisation.',
}));
Q('m_accountability', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Which element of delegation **cannot be passed on** to a subordinate?',
  opts: ['Accountability', 'Authority', 'Responsibility for doing the assigned work', 'The task itself'],
  sol: 'The superior stays answerable to his or her own superior for the final result even after delegating, so accountability cannot be delegated.',
}));
Q('m_auth_flow', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Which statement about the elements of delegation is correct?',
  opts: [
    'Authority flows downward, while responsibility and accountability flow upward',
    'Authority flows upward, while responsibility flows downward',
    'All three flow downward',
    'Accountability flows downward from the superior',
  ],
  sol: 'A superior grants authority downward; the subordinate is responsible and answerable upward to the superior.',
}));
Q('m_deleg_case', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'Ananya, sales manager at an imagined mobile-phone retailer in Hyderabad, allows her assistant Kabir to approve discounts up to five per cent for bulk buyers and tells him to report every such deal to her at week end. Which element of delegation is shown by "allows Kabir to approve discounts"?',
  opts: ['Authority', 'Responsibility', 'Accountability', 'Decentralisation'],
  sol: 'The right to take a decision (approve discounts) is authority. Reporting the deals at week end reflects accountability.',
}));
Q('m_decent_optional', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Why is decentralisation described as an **optional policy decision**, unlike delegation?',
  opts: [
    'Top management chooses how far to spread authority to lower levels, whereas no manager can do all work alone without delegating',
    'Decentralisation is required by law while delegation is not',
    'Delegation is never needed in small firms',
    'Decentralisation applies only to government offices',
  ],
  sol: 'Delegation is necessary because a manager cannot do all the work alone; decentralisation is a deliberate choice by top management about how much authority to push down to all levels.',
}));
Q('m_decent_case', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'An imagined supermarket chain lets each of its 30 store managers across Maharashtra decide local stock, staff rosters and festival offers, while head office sets only overall policy. This is an example of',
  opts: ['decentralisation', 'centralisation', 'informal organisation', 'functional structure'],
  sol: 'Systematically spreading decision-making authority to lower levels (store managers) across the organisation, with only key decisions kept at the top, is decentralisation.',
}));
Q('m_decent_benefit', mcq({
  t: 4, d: 4, c: 'analysis',
  stem: 'The founder of an imagined travel company in Jaipur now spends her time on new markets because branch heads handle daily decisions. Which importance of decentralisation does this show?',
  opts: ['Relief to top management', 'Develops initiative among subordinates', 'Better control', 'Quick decision-making at lower levels'],
  sol: 'The focus of the case is that the founder is freed from routine decisions and can concentrate on strategy: relief to top management. The other benefits exist but are not what the situation highlights.',
}));
Q('m_responsibility', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Responsibility in delegation means',
  opts: [
    'the obligation of a subordinate to perform the duty assigned properly',
    'the right to give orders and take decisions',
    'the answerability of the superior to the board',
    'the formal transfer of ownership of the business',
  ],
  sol: 'Responsibility is the duty to carry out the assigned task. The right to give orders is authority, and being answerable for results is accountability.',
}));
Q('ar_accountability', ar({
  t: 4, d: 2, c: 'analysis', key: 'a',
  a: 'A manager remains accountable for a task even after delegating it.',
  r: 'Accountability cannot be delegated.',
  sol: 'Both are true, and R explains A: since accountability cannot be passed on, the manager is still answerable for the result of the delegated task.',
}));
Q('ar_decentral_extension', ar({
  t: 4, d: 3, c: 'analysis', key: 'd',
  a: 'Delegation and decentralisation have the same scope.',
  r: 'Decentralisation is the extension of delegation to the lowest levels of the organisation.',
  sol: 'A is false: delegation has a narrow scope (one superior and subordinate), while decentralisation is wide (all levels). R is true.',
}));
Q('ar_auth_resp', ar({
  t: 4, d: 3, c: 'analysis', key: 'b',
  a: 'A subordinate should be given authority matching the responsibility assigned.',
  r: 'Authority flows downward in an organisation.',
  sol: 'Both are true, but R does not explain A. A holds because without enough authority a subordinate cannot complete the task (and too much invites misuse); R only states the direction in which authority flows.',
}));
Q('tf_accountability_delegate', tf({
  t: 4, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? When a manager delegates a task, he or she also transfers accountability for its result to the subordinate.',
  sol: 'False. Authority is delegated, but accountability cannot be; the manager remains answerable to his or her superior.',
}));
Q('fb_accountability', fb({
  t: 4, d: 1, c: 'recall',
  stem: 'The answerability of a subordinate for the final outcome of an assigned task is called ___.',
  acc: [['accountability']],
  sol: 'Being answerable for the outcome is accountability; it is enforced through regular reporting.',
}));
Q('mt_elements', match({
  t: 4, d: 2, c: 'application',
  stem: 'Match each line from an imagined hospital administrator\'s instructions to the element or concept it shows.',
  pairs: [
    ['"You may order medicines up to the approved budget."', 'Authority'],
    ['"It is your duty to keep the pharmacy stocked."', 'Responsibility'],
    ['"Send me a stock report every Friday."', 'Accountability'],
    ['"All ward heads across our six hospitals will now take such decisions."', 'Decentralisation'],
  ],
  sol: 'The right to order is authority; the duty to keep stock is responsibility; reporting for the outcome is accountability; extending decision-making to all ward heads across units is decentralisation.',
}));
Q('s_deleg_meaning', short({
  t: 4, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'Define delegation and state why it is needed in a large organisation.',
  model: '**Delegation** is the transfer of part of a superior\'s **authority** to a subordinate to perform an assigned task. It is needed because in a large organisation no manager can do all the work alone; delegation lets work be **shared** while the manager focuses on more important tasks.',
  sol: 'Definition plus one reason for need.',
  scheme: [['Definition', 1], ['Need', 1]],
}));
Q('s_auth_resp', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between authority and responsibility on two bases.',
  model: '1. **Meaning:** authority is the **right to command** and decide; responsibility is the **obligation to perform** the assigned duty.\n2. **Direction of flow:** authority flows **downward** from superior to subordinate; responsibility flows **upward** from subordinate to superior.',
  sol: 'Two bases with both sides.',
  scheme: [['First basis', 1], ['Second basis', 1]],
}));
Q('s_decent_meaning', short({
  t: 4, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is decentralisation? Is complete decentralisation desirable?',
  model: 'Under **decentralisation**, top management deliberately pushes **decision-making authority down to every level**, keeping only major decisions such as policy for itself. **Complete** decentralisation is not desirable, because top management must keep control of policy; a **balance** with centralisation is needed.',
  sol: 'Meaning plus the need for balance.',
  scheme: [['Meaning', 1], ['Balance with centralisation', 1]],
}));
Q('s3_deleg_importance', short({
  t: 4, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain three ways in which delegation benefits an organisation.',
  model: '1. **Effective management:** managers are freed from routine work and can focus on planning and important decisions.\n2. **Employee development:** subordinates get chances to use their skills and grow into future managers.\n3. **Motivation:** trust shown through delegated authority gives subordinates confidence and a sense of recognition, so they work better.',
  sol: 'Any three points of importance of delegation, each explained.',
  scheme: [['First point', 1], ['Second point', 1], ['Third point', 1]],
}));
Q('s3_decent_importance', short({
  t: 4, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'An imagined restaurant chain with 25 outlets in South India wants to decentralise. Explain three benefits it can expect.',
  model: '1. **Quick decisions:** outlet managers can change menus or staff rosters on the spot without waiting for head office.\n2. **Develops managerial talent:** outlet managers gain decision-making experience and can be promoted to regional posts.\n3. **Facilitates growth:** each outlet works with some autonomy, so the chain can open new outlets and judge each one by its results.',
  sol: 'Three benefits linked to the restaurant chain.',
  scheme: [['First benefit', 1], ['Second benefit', 1], ['Third benefit', 1]],
}));
Q('l_deleg_vs_decent', long({
  t: 4, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Distinguish between delegation and decentralisation on any five bases.',
  model: '1. **Nature:** delegation is a **compulsory** act, as no manager can do all work alone; decentralisation is an **optional policy** decision of top management.\n2. **Freedom of action:** under delegation the superior keeps **more control**; under decentralisation lower levels get **more freedom**.\n3. **Status:** delegation is a **process**; decentralisation is the **result** of a policy that extends delegation.\n4. **Scope:** delegation is **narrow**, between a superior and subordinate; decentralisation is **wide**, covering all levels.\n5. **Purpose:** delegation aims to **reduce the burden** of the manager; decentralisation aims to **increase the role and autonomy** of lower levels.',
  sol: 'Five bases with both sides on each.',
  scheme: [['Nature', 1], ['Freedom of action', 1], ['Status', 1], ['Scope', 1], ['Purpose', 1]],
}));
Q('l_decent_importance', long({
  t: 4, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'The new CEO of an imagined engineering firm in Pune says, "Every purchase above ₹5,000 must come to my desk." Evaluate this approach and explain four benefits the firm would gain by decentralising instead.',
  model: '**Evaluation:** keeping all such decisions at the top causes **delays**, overloads the CEO and stops managers from learning; some balance is needed, so only major decisions should stay with the CEO.\n**Benefits of decentralising:**\n1. **Quick decision-making:** managers close to the work can buy what they need without waiting.\n2. **Relief to top management:** the CEO gets time for strategy and growth.\n3. **Develops initiative and talent:** managers learn to take decisions and become ready for higher posts.\n4. **Better control and growth:** each unit\'s performance can be judged and the firm can expand with self-reliant units.',
  sol: 'A reasoned judgement on over-centralisation, then four benefits of decentralisation linked to the firm.',
  scheme: [['Evaluation of the CEO\'s approach', 1], ['Benefit 1', 1], ['Benefit 2', 1], ['Benefit 3', 1], ['Benefit 4', 1]],
}));

// ================================================================ case-based items
Q('cb_sweets', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined business, written by SOYL for practice.)*',
  passage: '**Mithaas Sweets, Varanasi (imagined)**\n\nAfter winning a large wedding-catering contract, the owner Harish Gupta sat with his son Aman and listed everything that had to be done: buying milk and sugar, making sweets, packing, delivery, billing and handling customer calls. They then put buying and making together under a "Kitchen" unit, and packing and delivery under a "Dispatch" unit. Aman chose Shabnam, who had run a bakery kitchen for ten years, to lead the Kitchen. Finally, Harish told everyone that kitchen staff would report to Shabnam, dispatch staff to Aman, and both leaders to him.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Quote the line that shows the first step of organising and name the step.', model: '"listed everything that had to be done: buying milk and sugar, making sweets, packing, delivery, billing and handling customer calls": **identification and division of work**.', sol: 'Listing all activities is identification and division of work.', scheme: [['Line quoted with the step named', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which step of organising is shown by choosing Shabnam to lead the Kitchen?', model: '**Assignment of duties**: the job is given to a person whose skill and experience suit it.', sol: 'Matching a job to a suitable person is assignment of duties.', scheme: [['Assignment of duties', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify the remaining two steps of organising from the passage, quoting the lines.', model: '1. **Departmentalisation:** "put buying and making together under a Kitchen unit, and packing and delivery under a Dispatch unit".\n2. **Establishing reporting relationships:** "kitchen staff would report to Shabnam, dispatch staff to Aman, and both leaders to him".', sol: 'Two steps, each with its supporting line.', scheme: [['Departmentalisation with line', 1], ['Reporting relationships with line', 1]] }), [
      short({ t: 1, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): State two benefits Mithaas Sweets will gain from organising in this way.', model: '1. **Clarity in working relationships:** everyone knows whom to report to, so instructions are not confused during the rush.\n2. **Benefits of specialisation:** Shabnam\'s team focuses only on sweets, so quality and speed improve.', sol: 'Any two relevant benefits linked to the case.', scheme: [['First benefit', 1], ['Second benefit', 1]] }),
    ]),
  ],
}));
Q('cb_structure', caseQ({
  t: 2, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined company, written by SOYL for practice.)*',
  passage: '**Narmada Agro Ltd, Indore (imagined)**\n\nFor fifteen years Narmada Agro made only cattle feed. Its managing director had a production head, a purchase head, a sales head and an accounts head, each looking after one area for the whole company. Last year the company started making organic fertiliser and packaged dairy products as well. Each new product has different raw materials, buyers and selling methods. The sales head now complains that his team cannot sell cattle feed to farmers and yoghurt to supermarkets with equal skill, and the board finds it impossible to tell which product earns a profit.',
  parts: [
    child('a', short({ t: 2, d: 1, c: 'understanding', marks: 1, stem: 'Name the organisation structure the company has been following.', model: '**Functional structure**: one head for each function for the whole company.', sol: 'Heads for production, purchase, sales and accounts point to a functional structure.', scheme: [['Functional structure', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which structure should the company now adopt?', model: '**Divisional structure**, with separate divisions for cattle feed, organic fertiliser and dairy products.', sol: 'Several distinct products with different inputs and markets call for divisions.', scheme: [['Divisional structure', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Give two reasons from the passage for your answer to (b).', model: '1. **Distinct products:** each product has "different raw materials, buyers and selling methods", so it needs its own specialised team.\n2. **Profit measurement:** the board "finds it impossible to tell which product earns a profit"; each division would have its own revenues and costs, so its profit and head\'s performance can be judged.', sol: 'Two reasons tied to lines of the passage.', scheme: [['First reason with evidence', 1], ['Second reason with evidence', 1]] }), [
      short({ t: 2, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): State two drawbacks the company must guard against after adopting the structure you suggested.', model: '1. **Higher cost:** each division will need its own purchase, production and sales teams, so activities are duplicated.\n2. **Conflict among divisions:** the three divisions may compete for funds and attention, and heads may put their own division before the company.', sol: 'Two limitations of the divisional structure.', scheme: [['First drawback', 1], ['Second drawback', 1]] }),
    ]),
  ],
}));
Q('cb_canteen', caseQ({
  t: 3, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined factory, written by SOYL for practice.)*',
  passage: '**Kaveri Pumps, Coimbatore (imagined)**\n\nAt Kaveri Pumps every worker has a written job description, and all instructions pass from the plant head to supervisors and then to workers. Many workers also meet at the canteen and at a weekly kabaddi game, where they share news freely. Last month a story spread through these groups that the plant would close, and absenteeism rose for a week before the management denied it. Yet when a machine broke down at night, two workers from different sections who knew each other from the kabaddi team fixed it within an hour, without waiting for the official procedure.',
  parts: [
    child('a', short({ t: 3, d: 1, c: 'understanding', marks: 1, stem: 'Quote the line that shows formal organisation at Kaveri Pumps.', model: '"every worker has a written job description, and all instructions pass from the plant head to supervisors and then to workers".', sol: 'Written job descriptions and an official chain of instructions mark formal organisation.', scheme: [['Correct line', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Identify one limitation of informal organisation shown in the passage.', model: '**Spread of rumours**: the false story of closure spread through the groups and raised absenteeism.', sol: 'The closure story is a rumour carried by informal channels.', scheme: [['Rumours with evidence', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain one advantage of informal organisation shown in the passage, and suggest how management can make use of it.', model: '**Advantage:** quick cooperation across sections; friends from the kabaddi team fixed the machine "within an hour, without waiting for the official procedure". **Use:** managers can **tap the informal network** to spread correct information quickly and to get feedback before changes.', sol: 'An advantage with evidence plus a sensible use by management.', scheme: [['Advantage with evidence', 1], ['Suggested use', 1]] }), [
      short({ t: 3, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Suggest two steps management could take to prevent rumours like the closure story in future.', model: '1. Share **accurate news early** through formal channels, such as notices and meetings, so there is no information gap.\n2. Keep **informal leaders** of the groups informed, so the grapevine carries correct information.', sol: 'Two workable steps addressing rumours.', scheme: [['First step', 1], ['Second step', 1]] }),
    ]),
  ],
}));
Q('cb_hospital', caseQ({
  t: 4, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined hospital, written by SOYL for practice.)*',
  passage: '**Sanjeevani Hospital, Ranchi (imagined)**\n\nDr Meera Oraon, the medical superintendent, could no longer handle every staffing problem herself. She told the nursing head, Sister Grace, "From today you may hire temporary nurses during emergencies, up to ten at a time. Keeping every ward fully staffed is now your job, and you will give me a written report every Monday." In March a ward ran short of nurses for two nights. The hospital board asked Dr Oraon to explain the lapse, and she in turn asked Sister Grace for an explanation.',
  parts: [
    child('a', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Quote the words that show authority being delegated to Sister Grace.', model: '"you may hire temporary nurses during emergencies, up to ten at a time".', sol: 'The right to hire is authority.', scheme: [['Correct line', 1]] })),
    child('b', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Which element of delegation is shown by "you will give me a written report every Monday"?', model: '**Accountability**: Sister Grace must answer to Dr Oraon for the result.', sol: 'Regular reporting enforces accountability.', scheme: [['Accountability', 1]] })),
    child('c', short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): The board asked Dr Oraon, not Sister Grace, to explain the lapse. Explain why, using the principle involved.', model: 'Dr Oraon delegated **authority**, but **accountability cannot be delegated**. She remains answerable to the board for staffing, so the board asks her; she in turn can hold Sister Grace answerable to her.', sol: 'State that accountability stays with the delegator and apply it.', scheme: [['Accountability cannot be delegated', 1], ['Applied to the board and Dr Oraon', 1]] }), [
      short({ t: 4, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): State two benefits the hospital gains from Dr Oraon\'s decision to delegate.', model: '1. **Effective management:** Dr Oraon is freed from routine staffing and can focus on medical services.\n2. **Employee development and motivation:** Sister Grace gains decision-making experience and feels trusted.', sol: 'Two benefits of delegation linked to the hospital.', scheme: [['First benefit', 1], ['Second benefit', 1]] }),
    ]),
  ],
}));
Q('cb_retail', caseQ({
  t: 4, d: 4, c: 'evaluation', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined company, written by SOYL for practice.)*',
  passage: '**Pahadi Mart, Dehradun (imagined)**\n\nPahadi Mart runs 18 grocery stores in the hills. Until last year, every decision, from the price of apples to a cleaner\'s leave, went to the founder, Mr Negi. Stores waited days for replies, and fresh fruit often rotted. This year Mr Negi let each store manager decide local prices, stock and staff leave, keeping only new stores, loans and the brand with himself. Store managers now take decisions on the spot; two of them were recently promoted to regional heads. Mr Negi says he finally has time to plan the company\'s entry into Uttar Pradesh.',
  parts: [
    child('a', short({ t: 4, d: 2, c: 'understanding', marks: 1, stem: 'Name the concept Mr Negi has adopted this year.', model: '**Decentralisation**: decision-making authority is spread to store managers, with key decisions kept at the top.', sol: 'Spreading authority to all store managers as a policy is decentralisation.', scheme: [['Decentralisation', 1]] })),
    child('b', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Quote the line that shows that Mr Negi has not decentralised completely.', model: '"keeping only new stores, loans and the brand with himself".', sol: 'Key decisions kept at the top show a balance between centralisation and decentralisation.', scheme: [['Correct line', 1]] })),
    child('c', short({ t: 4, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Identify two benefits of the concept from the passage, quoting the lines.', model: '1. **Quick decision-making:** "Store managers now take decisions on the spot".\n2. **Develops managerial talent:** "two of them were recently promoted to regional heads". (Also: relief to top management, "finally has time to plan".)', sol: 'Two benefits, each with a supporting line.', scheme: [['First benefit with line', 1], ['Second benefit with line', 1]] }), [
      short({ t: 4, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): Was the earlier system at Pahadi Mart suitable for an 18-store business? Give two reasons.', model: '**No.** (1) Every decision went to one person, so stores "waited days for replies" and fresh fruit rotted: **delays** hurt sales. (2) Store managers had no chance to decide, so their **initiative and talent** were not developed and the founder had no time for growth.', sol: 'A judgement with two reasons drawn from the case.', scheme: [['First reason', 1], ['Second reason', 1]] }),
    ]),
  ],
}));

// ================================================================ extra objective items (practice and deck checks)
Q('m_effective_admin', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'How does organising lead to **effective administration**?',
  opts: [
    'By clearly describing jobs and related duties, it avoids confusion and duplication',
    'By removing the need for managers',
    'By letting every employee decide his or her own duties',
    'By fixing prices of the firm\'s products',
  ],
  sol: 'Clear job descriptions and authority relationships remove confusion and overlap, which makes administration effective.',
}));
Q('m_div_skill', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Why does a divisional structure help develop managers for top positions?',
  opts: [
    'A division head handles all functions of a product and so gains varied experience',
    'Division heads perform only one function',
    'Division heads have no authority',
    'It removes the need for a chief executive',
  ],
  sol: 'Managing production, marketing and finance of one product gives a division head broad skills needed for top management.',
}));
