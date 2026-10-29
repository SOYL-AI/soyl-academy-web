// CBSE 12 Business Studies, ch02 Principles of Management — question bank. Every business situation,
// firm and person is imagined by SOYL and labelled as such; no NCERT text, exercise or board/sample-paper
// item is reused (D-036). Facts are limited to the standard content of the topic (the nature of
// principles, Fayol's 14 principles, Taylor's principles and techniques). Every figure is computed here.
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from './lib.mjs';

export const inr = (n) => Number(n).toLocaleString('en-IN');
const assert = (cond, msg) => { if (!cond) throw new Error(`figure check failed: ${msg}`); };

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// ---------------------------------------------------------------- computed figures
// Differential piece wage at an imagined Ludhiana hosiery unit: standard output 20 pieces a day.
export const DPW = { std: 20, high: 12, low: 9, a: 24, b: 16 };
export const DPW_A = DPW.a * (DPW.a >= DPW.std ? DPW.high : DPW.low); // 24 × 12 = 288
export const DPW_B = DPW.b * (DPW.b >= DPW.std ? DPW.high : DPW.low); // 16 × 9 = 144
export const DPW_GAP = DPW_A - DPW_B; // 144
// A second set for the case: standard 50 units, ₹6 / ₹5.
export const DPC = { std: 50, high: 6, low: 5, ravi: 55, sunil: 48, ext: 50 };
export const DPC_RAVI = DPC.ravi * DPC.high; // 330
export const DPC_SUNIL = DPC.sunil * DPC.low; // 240
export const DPC_SUNIL_IF = DPC.ext * DPC.high; // 300
assert(DPW_A === 288 && DPW_B === 144 && DPW_GAP === 144, 'dpw');
assert(DPC_RAVI === 330 && DPC_SUNIL === 240 && DPC_SUNIL_IF === 300 && DPC_SUNIL_IF - DPC_SUNIL === 60, 'dpc');

// ================================================================ t01 Nature and significance of principles
Q('m_universal', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'The principles of management can be used by a hospital in Kochi, a software firm in Pune and a cricket academy in Ranchi alike. Which feature of principles does this show?',
  opts: ['Universal applicability', 'Mainly behavioural', 'Cause and effect relationship', 'Contingent'],
  sol: 'Principles apply to every kind of organisation, large or small, business or non-business, which is universal applicability. The other options are features too, but they describe what principles deal with (behaviour), how they work (cause and effect) or when they apply (contingent).',
}));
Q('m_flexible', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Meher, owner of an imagined bakery chain in Indore, divides work strictly in her large central kitchen but lets the three staff in a small outlet share all tasks. Which feature of principles of management does her approach show?',
  opts: ['Flexible: they can be adapted to the situation', 'Universal applicability', 'Formed by practice and experimentation', 'General guidelines that never change'],
  sol: 'She applies the same principle (division of work) differently in a big and a small unit. Principles are flexible and are modified to suit the situation. "General guidelines that never change" is wrong: principles are general guidelines but they do change and are adapted.',
}));
Q('m_behavioural', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Why are principles of management described as **mainly behavioural**?',
  opts: [
    'They aim to influence the behaviour of people working in the organisation',
    'They are derived from laboratory experiments on machines',
    'They give exact results, like the laws of physics',
    'They apply only to the behaviour of customers',
  ],
  sol: 'Management works through people, so its principles guide human behaviour and relationships at work. They are not exact like physical laws, and they concern employees, not only customers.',
}));
Q('m_guidelines', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Principles of management are called **general guidelines** because',
  opts: [
    'they are not ready-made solutions; their use depends on the situation',
    'they are rules that must be followed word for word in every case',
    'they are laws passed by Parliament for companies',
    'they cover only general administration and not production',
  ],
  sol: 'Principles guide action but do not give fixed answers; real situations are complex, so the manager has to judge how to apply them. They are not rigid rules or legal provisions.',
}));
Q('m_contingent', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A manager at an imagined courier firm in Guwahati finds that strict centralisation worked when the firm had two branches but slows decisions now that it has forty. The feature of principles that explains this is that they are',
  opts: ['contingent: their use depends on the prevailing situation', 'universal in every detail', 'unrelated to cause and effect', 'formed only by personal opinion'],
  sol: 'The usefulness of a principle depends on the conditions in which it is applied; as the firm grows, the right degree of centralisation changes. That is the contingent nature of principles.',
}));
Q('m_formed', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Principles of management have been developed mainly',
  opts: ['through the practice, observation and experiments of managers', 'by courts while deciding business disputes', 'through religious and moral teachings', 'by a single government committee'],
  sol: 'Principles are formed by practice and experimentation: managers observed what worked, tested it and generalised it into guidelines.',
}));
Q('m_insight', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A newly promoted manager at an imagined textile mill in Surat reads about principles of management and now foresees which of her decisions could cause conflict. Which significance of principles does this illustrate?',
  opts: ['Providing managers with useful insights into reality', 'Fulfilling social responsibility', 'Management training, education and research', 'Meeting the requirements of a changing environment'],
  sol: 'Understanding principles improves a manager\'s knowledge and foresight, so she can anticipate problems: this is the significance of giving useful insights into reality.',
}));
Q('ar_cause', ar({
  t: 1, d: 2, c: 'analysis', key: 'a',
  a: 'Principles of management help managers predict the likely result of a decision.',
  r: 'Principles establish a cause and effect relationship between actions and their results.',
  sol: 'Both are true, and R explains A: because a principle links an action to its likely result, a manager can predict what will happen if it is applied.',
}));
Q('ar_exact', ar({
  t: 1, d: 3, c: 'analysis', key: 'd',
  a: 'Principles of management are as exact as the principles of pure science.',
  r: 'Principles of management deal with human behaviour, which cannot be predicted with full accuracy.',
  sol: 'A is false: management principles are not exact, since they deal with people. R is true, and it is the very reason A is false.',
}));
Q('tf_social', tf({
  t: 1, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Principles of management help a business fulfil its social responsibility, for example by guiding fair wages for employees.',
  sol: 'Principles such as fair remuneration and equity guide managers towards fair treatment of employees and the wider society, which is part of social responsibility.',
}));
Q('fb_nature', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'Principles of management apply to all kinds of organisations, business as well as non-business. This feature is called ___ applicability.',
  acc: [['universal']],
  sol: 'This is the universal applicability of principles.',
}));
Q('s_nature_two', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain any two features of the nature of principles of management.',
  model: '1. **Flexible:** principles are not rigid; a manager adapts them to the **needs of the situation**.\n2. **Mainly behavioural:** they aim to influence the **behaviour of people** at work, since management gets work done through others.',
  sol: 'Two features, each named and explained.',
  scheme: [['First feature with explanation', 1], ['Second feature with explanation', 1]],
}));
Q('s_sig_optimum', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'How do principles of management help in the optimum use of resources and in effective administration?',
  model: '**Resources:** principles help managers foresee the **cause and effect** of decisions, so men, money and materials are not wasted on trial and error.\n**Administration:** they make management **impersonal**, limiting personal bias, so decisions are fair and consistent.',
  sol: 'One point on resources and one on administration.',
  scheme: [['Optimum use of resources', 1], ['Effective, impersonal administration', 1]],
}));
Q('s3_significance', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'The manager of an imagined chain of pharmacies in Lucknow says that principles of management are only common sense and are not worth studying. Give three reasons to show that he is mistaken.',
  model: '1. **Scientific decisions:** principles make decisions **objective** and based on reasoning, not on personal bias or guesswork.\n2. **Meeting change:** principles are flexible, so they help managers adapt to **changes in technology and competition**, for example when moving to online orders.\n3. **Training and research:** principles are the **basis of management education** and help train new managers quickly.',
  sol: 'Three distinct points of significance, each linked to why study is useful.',
  scheme: [['First significance explained', 1], ['Second significance explained', 1], ['Third significance explained', 1]],
}));
Q('l_nature', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain any five features that describe the nature of principles of management.',
  model: '1. **Universal applicability:** they apply to every organisation, business or non-business, large or small.\n2. **General guidelines:** they guide action but are not ready-made solutions for every problem.\n3. **Formed by practice and experimentation:** they grew out of managers\' experience and experiments.\n4. **Flexible:** managers modify them to suit the situation.\n5. **Cause and effect relationship:** they link an action to its likely result, so outcomes can be predicted. (Also: mainly behavioural; contingent.)',
  sol: 'Any five features, each named and briefly explained.',
  scheme: [['Feature 1', 1], ['Feature 2', 1], ['Feature 3', 1], ['Feature 4', 1], ['Feature 5', 1]],
}));

// ================================================================ t02 Fayol's principles
Q('m_unity_command', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'At an imagined furniture factory in Jodhpur, a carpenter receives orders from both the production supervisor and the quality supervisor, and the orders conflict. Which principle of Fayol is violated?',
  opts: ['Unity of command', 'Unity of direction', 'Division of work', 'Order'],
  sol: 'Unity of command says each employee should receive orders from **one** superior only. Two bosses giving conflicting orders is dual subordination. Unity of direction is about one plan and one head for a group of activities with the same objective.',
}));
Q('m_unity_direction', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'An imagined company in Chennai makes both air coolers and water purifiers. It sets up two separate divisions, each with its own head, plan and staff. Which principle is being followed?',
  opts: ['Unity of direction', 'Unity of command', 'Scalar chain', 'Stability of tenure of personnel'],
  sol: 'One head and one plan for each group of activities with the same objective is unity of direction. Unity of command concerns how many bosses one employee has.',
}));
Q('m_scalar', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'According to Fayol, the **scalar chain** refers to',
  opts: [
    'the formal line of authority from the highest to the lowest rank',
    'the equal treatment of all employees',
    'the arrangement of materials in their proper places',
    'the division of a job into small tasks',
  ],
  sol: 'The scalar chain is the formal line of authority that communications follow from top to bottom. Equal treatment is equity, proper places is order, and small tasks is division of work.',
}));
Q('m_gangplank', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'In an imagined steel plant in Bhilai, a furnace supervisor needs coolant urgently from a stores supervisor at the same level. The usual route goes up three levels and down three. What did Fayol suggest for such an emergency?',
  opts: ['A gang plank: direct contact between the two, with their superiors informed', 'Wait for the message to travel along the full scalar chain', 'Ask the managing director to decide personally', 'Transfer one supervisor to the other department'],
  sol: 'Fayol allowed a gang plank so that employees at the same level can communicate directly in an emergency, keeping their superiors informed. Waiting for the full chain would cause delay.',
}));
Q('m_order', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'In an imagined auto-parts warehouse in Gurugram, every bin is labelled and every worker has a fixed workstation, so nothing is wasted searching. Which principle does this follow?',
  opts: ['Order', 'Discipline', 'Equity', 'Initiative'],
  sol: 'Order means a place for everything and everyone, and everything and everyone in its place. Discipline concerns obedience to rules; equity is fairness; initiative is about suggestions for improvement.',
}));
Q('m_equity', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'The HR head of an imagined hotel in Jaipur insists that promotions be decided on performance alone, whatever the employee\'s religion, gender or home state. Which principle is applied?',
  opts: ['Equity', 'Remuneration of employees', 'Esprit de corps', 'Subordination of individual interest to general interest'],
  sol: 'Equity calls for kindliness and justice, with no discrimination on grounds such as religion, gender or region.',
}));
Q('m_esprit', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'The team leader at an imagined call centre in Mohali always says "we achieved the target" and holds weekly team lunches. Which principle is she promoting?',
  opts: ['Esprit de corps', 'Division of work', 'Centralisation', 'Scalar chain'],
  sol: 'Esprit de corps means team spirit and unity; replacing "I" with "we" builds it.',
}));
Q('m_initiative', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'An imagined biscuit company in Kolkata pays a bonus to any worker whose suggestion cuts wastage on the packing line. Which principle of Fayol is this?',
  opts: ['Initiative', 'Order', 'Stability of tenure of personnel', 'Unity of command'],
  sol: 'Encouraging employees to think of and carry out improvements, for example through a suggestion scheme, is the principle of initiative.',
}));
Q('m_stability', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'An imagined bank in Bhopal transfers its loan officers to a new branch every three months. Customers complain that officers never learn the local business. Which principle is being ignored?',
  opts: ['Stability of tenure of personnel', 'Discipline', 'Order', 'Remuneration of employees'],
  sol: 'Employees should not be moved too often; they need time to learn the job and become effective. Frequent transfers violate stability of tenure.',
}));
Q('m_subordination', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'A purchase manager at an imagined cement company in Raipur wants to buy from his cousin\'s firm at a higher price. The director refuses and buys from the cheapest reliable supplier. Which principle does the director uphold?',
  opts: ['Subordination of individual interest to general interest', 'Unity of direction', 'Authority and responsibility', 'Esprit de corps'],
  sol: 'The interest of the organisation must come before the interest of any individual; the manager\'s family interest cannot override the company\'s.',
}));
Q('m_auth_resp', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Fayol\'s principle of authority and responsibility states that',
  opts: [
    'there should be a balance (parity) between the authority given and the responsibility placed on a person',
    'a manager should have authority but no responsibility',
    'all authority should remain with the top manager',
    'responsibility can be delegated completely to subordinates',
  ],
  sol: 'Authority without responsibility can be misused, and responsibility without authority makes work impossible, so the two must be balanced.',
}));
Q('m_remuneration', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Under Fayol\'s principle of **remuneration of employees**, wages should be',
  opts: [
    'fair to employees and within the paying capacity of the firm',
    'as low as possible to maximise profit',
    'the same for every employee whatever the job',
    'decided only by the workers\' union',
  ],
  sol: 'Pay should give employees at least a reasonable standard of living and be within what the company can afford, so both sides gain.',
}));
Q('m_discipline', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'An imagined garment exporter in Tiruppur agreed to pay overtime at double rate but stopped doing so; workers then stopped following the shift rules. Which principle did the management break first?',
  opts: ['Discipline', 'Order', 'Initiative', 'Unity of direction'],
  sol: 'Discipline means obedience to organisational rules and the employment agreement **by both sides**; it needs fair agreements kept by management. The firm broke the agreement first.',
}));
Q('m_division', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: 'Division of work leads to',
  opts: ['specialisation, which increases speed, accuracy and efficiency', 'conflicting orders from two superiors', 'a breakdown in the line of authority', 'less skill among workers'],
  sol: 'Dividing a job into small tasks lets each worker specialise and become more efficient.',
}));
Q('m_central', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'The owner of an imagined chain of 25 restaurants in Hyderabad decides menus and prices herself but lets each outlet manager hire staff and order supplies. Which principle explains this balance?',
  opts: ['Centralisation and decentralisation', 'Unity of command', 'Scalar chain', 'Order'],
  sol: 'Fayol said no organisation is fully centralised or fully decentralised; the right balance is needed. Key decisions stay at the top, while routine ones are decentralised to outlets.',
}));
Q('ar_dual', ar({
  t: 2, d: 2, c: 'analysis', key: 'a',
  a: 'Violation of unity of command can weaken discipline and cause confusion.',
  r: 'When an employee receives conflicting orders from two superiors, he does not know whose order to follow.',
  sol: 'Both are true, and R explains A: dual subordination leaves the employee confused about whom to obey, which undermines authority and discipline.',
}));
Q('ar_gangplank', ar({
  t: 2, d: 3, c: 'analysis', key: 'c',
  a: 'Fayol allowed a gang plank between employees at the same level in an emergency.',
  r: 'Fayol believed that the scalar chain should be removed altogether from organisations.',
  sol: 'A is true. R is false: Fayol wanted the scalar chain to be followed normally; the gang plank is only a short-cut for emergencies, with superiors informed.',
}));
Q('ar_command_direction', ar({
  t: 2, d: 3, c: 'analysis', key: 'b',
  a: 'Unity of direction helps coordinate the activities of a division working towards one objective.',
  r: 'Unity of command prevents an employee from receiving orders from more than one boss.',
  sol: 'Both statements are true, but R does not explain A. R describes a different principle that concerns the individual employee, while A is about one head and one plan for a group of activities.',
}));
Q('tf_order_equity', tf({
  t: 2, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? The principle of equity means that every employee must be paid exactly the same salary.',
  sol: 'Equity means fairness and no discrimination; it does not mean identical pay. Pay should reflect the job and performance.',
}));
Q('tf_gangplank', tf({
  t: 2, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Under Fayol\'s gang plank, the superiors of the two employees must be kept informed of their direct communication.',
  sol: 'The gang plank is a short-cut for speed, but the scalar chain is respected by keeping the superiors informed.',
}));
Q('fb_order', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'Team spirit and harmony among employees is called esprit de ___.',
  acc: [['corps']],
  sol: 'Esprit de corps means team spirit.',
}));
Q('mt_fayol', match({
  t: 2, d: 2, c: 'application',
  stem: 'Match each imagined situation at a Nagpur logistics company with the Fayol principle it shows.',
  pairs: [
    ['Drivers, loaders and dispatch clerks each do only their own task', 'Division of work'],
    ['Every forklift is parked in its marked bay after use', 'Order'],
    ['Each loader reports only to the shift supervisor', 'Unity of command'],
    ['A loader who suggested a faster loading plan was rewarded', 'Initiative'],
  ],
  sol: 'Specialised tasks show division of work; a place for everything shows order; one boss per employee shows unity of command; rewarding suggestions shows initiative.',
}));
Q('ord_scalar', ord({
  t: 2, d: 2, c: 'application', marks: 1,
  stem: 'In an imagined company, the scalar chain runs from the managing director down to a machine operator. Arrange the positions from the highest to the lowest.',
  items: ['Managing director', 'Works manager', 'Shift supervisor', 'Machine operator'],
  sol: 'The formal line of authority runs from the managing director through the works manager and the shift supervisor to the operator.',
}));
Q('s_command_direction', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Distinguish between unity of command and unity of direction on any three bases.',
  model: '1. **Meaning:** unity of command means **one boss** for each employee; unity of direction means **one head and one plan** for a group of activities with the same objective.\n2. **Aim:** the first prevents **dual subordination**; the second prevents **overlapping** of activities and secures coordination.\n3. **Effect:** the first concerns the working of the **individual employee**; the second the working of the **organisation or division** as a whole.',
  sol: 'Three bases, each stating both sides.',
  scheme: [['Meaning', 1], ['Aim', 1], ['Implication or relation (individual vs organisation)', 1]],
}));
Q('s_discipline', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What does Fayol mean by discipline, and what three things did he say it requires?',
  model: '**Discipline** is obedience to the **rules and employment agreements** of the organisation. It needs **good superiors at all levels**, **clear and fair agreements**, and **judicious use of penalties**.',
  sol: 'Meaning plus the three requirements.',
  scheme: [['Meaning of discipline', 1], ['Its requirements', 1]],
}));
Q('s_scalar_gang', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'In an imagined bank, a cashier (level E) must urgently contact a loans clerk (level K) at the same level in another department. Explain how Fayol\'s scalar chain and gang plank apply.',
  model: 'Normally the message would go **up the scalar chain** from E to the common superior and **down** to K, which takes time. In an urgent case, Fayol allows a **gang plank**: E contacts K **directly**, and both keep their **superiors informed**.',
  sol: 'Describe the normal route, then the emergency short-cut with superiors informed.',
  scheme: [['Normal route along the scalar chain', 1], ['Gang plank with superiors informed', 1]],
}));
Q('s_esprit', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'State the principle of esprit de corps and give one way in which the manager of a school canteen could apply it.',
  model: '**Esprit de corps** means promoting **team spirit, unity and harmony** among employees. The canteen manager could praise the whole team for a successful sports day lunch, saying **we**, not **I**, and share credit with every worker.',
  sol: 'The principle plus a realistic way to apply it.',
  scheme: [['Principle stated', 1], ['Suitable application', 1]],
}));
Q('s3_remuneration_stability', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'An imagined BPO in Noida pays far below other firms in the area and replaces staff every few months. Name the two principles of Fayol being violated and explain one effect on the business.',
  model: '1. **Remuneration of employees** is violated: pay is not fair or enough for a reasonable standard of living.\n2. **Stability of tenure of personnel** is violated: staff are replaced before they learn the job.\n3. **Effect:** high **employee turnover** raises costs of hiring and training, and inexperienced staff give **poor service**, so customers may leave.',
  sol: 'Two principles named and linked to the facts, then one effect.',
  scheme: [['Remuneration violated with reason', 1], ['Stability of tenure violated with reason', 1], ['One effect on the business', 1]],
}));
Q('l_fayol_five', long({
  t: 2, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'Explain any five of Fayol\'s principles of management, with one example from an imagined hospital for each.',
  model: '1. **Division of work:** surgeons, nurses and lab technicians each do specialised work, raising efficiency.\n2. **Unity of command:** each nurse takes orders from **one** ward sister only.\n3. **Order:** medicines are stored in labelled places so they are found at once.\n4. **Equity:** patients\' families and staff are treated fairly, without discrimination.\n5. **Esprit de corps:** the casualty team shares credit for saving lives, building team spirit.',
  sol: 'Five principles, each explained with a hospital example.',
  scheme: [['Principle 1 with example', 1], ['Principle 2 with example', 1], ['Principle 3 with example', 1], ['Principle 4 with example', 1], ['Principle 5 with example', 1]],
}));
Q('l_fayol_violated', long({
  t: 2, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'At an imagined pickle-making unit in Guntur, workers receive orders from three supervisors, jars are kept wherever there is space, the owner promotes only relatives, and suggestions from workers are ignored. Identify the principles of Fayol being violated and suggest how the owner can correct each.',
  model: '1. **Unity of command:** three supervisors give orders; each worker should report to **one** supervisor.\n2. **Order:** jars lie anywhere; fix a **marked place** for raw materials and finished jars.\n3. **Equity:** promoting only relatives is unfair; promote on **merit**.\n4. **Initiative:** ignoring suggestions kills interest; start a **suggestion scheme** with rewards.\n5. **Overall:** applying these principles reduces confusion and waste and improves morale.',
  sol: 'Four principles identified from the lines of the case, each with a correction, and a concluding point.',
  scheme: [['Unity of command identified and corrected', 1], ['Order identified and corrected', 1], ['Equity identified and corrected', 1], ['Initiative identified and corrected', 1], ['Overall effect', 1]],
}));

// ================================================================ t03 Taylor's scientific management
Q('m_rule_thumb', mcq({
  t: 3, d: 1, c: 'understanding',
  stem: 'Taylor\'s principle **science, not rule of thumb** means',
  opts: [
    'every task should be studied scientifically to find the one best method',
    'managers should rely on their past habits and guesses',
    'workers should decide their own methods without guidance',
    'only scientists should be hired as managers',
  ],
  sol: 'Taylor wanted decisions based on study and experiment rather than on habit or guesswork (rule of thumb).',
}));
Q('m_harmony', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which change did Taylor call a **mental revolution**?',
  opts: [
    'Management and workers changing their attitude from conflict to cooperation, sharing the gains',
    'Replacing all workers with machines',
    'Moving the factory to a new city',
    'Paying all workers the same wage',
  ],
  sol: 'Mental revolution means both sides see that they gain together; harmony replaces discord.',
}));
Q('m_motion', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'A consultant at an imagined shoe factory in Agra films workers stitching soles and removes three needless hand movements from each cycle. This is',
  opts: ['motion study', 'time study', 'fatigue study', 'functional foremanship'],
  sol: 'Studying the movements in a job to remove unnecessary ones is motion study. Time study fixes the standard time; fatigue study fixes rest intervals.',
}));
Q('m_time', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'At an imagined mobile-phone assembly unit in Noida, an engineer times many trained workers fitting a screen and fixes 4 minutes as the standard. Which technique is this?',
  opts: ['Time study', 'Method study', 'Motion study', 'Standardisation of work'],
  sol: 'Fixing the standard time for a well-defined job by observing it is time study, which also helps decide wages and the number of workers.',
}));
Q('m_fatigue', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'After studying output through the day, an imagined brick kiln in Bihar fixes a 10-minute break every 90 minutes for its moulders. Which technique did it use?',
  opts: ['Fatigue study', 'Time study', 'Method study', 'Differential piece wage system'],
  sol: 'Fatigue study finds the amount and frequency of rest needed so that workers regain energy and output does not fall.',
}));
Q('m_method', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'An imagined dairy in Anand compares three ways of packing milk pouches, from receiving the milk to loading the crates, and chooses the one with the least cost and time. This is',
  opts: ['method study', 'motion study', 'fatigue study', 'simplification'],
  sol: 'Method study looks at the whole sequence of an operation to find the one best way of doing it.',
}));
Q('m_simplify', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'An imagined paint company in Thane cuts its range of tin sizes from 14 to 5, removing sizes that hardly sell. This technique is',
  opts: ['simplification of work', 'standardisation of work', 'method study', 'fatigue study'],
  sol: 'Simplification eliminates unnecessary varieties, sizes and grades. Standardisation sets fixed standards for a process or product.',
}));
Q('m_foreman_count', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Under functional foremanship, Taylor proposed how many specialist foremen in all?',
  opts: ['Eight', 'Four', 'Six', 'Fourteen'],
  sol: 'Eight: four under the planning in-charge and four under the production in-charge.',
}));
Q('m_speed_boss', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'In functional foremanship, who ensures that machines are run at the right speed and work is completed on time?',
  opts: ['Speed boss', 'Gang boss', 'Route clerk', 'Disciplinarian'],
  sol: 'The speed boss sees that tasks are done on time and at the proper speed. The gang boss keeps machines and tools ready; the route clerk fixes the route of work; the disciplinarian enforces rules.',
}));
Q('m_planning_incharge', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'Which of the following foremen works under the **planning in-charge**?',
  opts: ['Instruction card clerk', 'Repair boss', 'Inspector', 'Gang boss'],
  sol: 'Under the planning in-charge are the route clerk, instruction card clerk, time and cost clerk and disciplinarian. The repair boss, inspector, gang boss and speed boss work under the production in-charge.',
}));
Q('m_dpw', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'The main purpose of Taylor\'s differential piece wage system is to',
  opts: [
    'reward efficient workers with a higher rate and motivate others to reach the standard',
    'pay every worker the same fixed salary',
    'reduce the wages of all workers',
    'pay workers according to their years of service',
  ],
  sol: 'Workers who reach the standard output get a higher rate per piece; those below it get a lower rate, which rewards efficiency.',
}));
Q('m_cooperation', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Managers at an imagined pump factory in Coimbatore invite workers\' suggestions and share the savings with them. Which principle of Taylor is this?',
  opts: ['Cooperation, not individualism', 'Science, not rule of thumb', 'Development of each and every person', 'Functional foremanship'],
  sol: 'Taylor wanted management and workers to work together, with management welcoming workers\' suggestions and both sharing the gains: cooperation, not individualism.',
}));
Q('m_development', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'An imagined electronics firm in Bengaluru tests applicants for finger dexterity, places them on suitable jobs and trains them in the best method. Which principle of Taylor does this follow?',
  opts: ['Development of each and every person to his or her greatest efficiency and prosperity', 'Harmony, not discord', 'Cooperation, not individualism', 'Standardisation of work'],
  sol: 'Scientific selection, placement and training of each worker develop them to their greatest efficiency and prosperity.',
}));
Q('ar_foreman', ar({
  t: 3, d: 3, c: 'analysis', key: 'a',
  a: 'Functional foremanship violates Fayol\'s principle of unity of command.',
  r: 'Under functional foremanship, a worker receives instructions from eight specialist foremen.',
  sol: 'Both are true, and R explains A: with eight foremen giving instructions, a worker has more than one boss, which is against unity of command.',
}));
Q('ar_dpw', ar({
  t: 3, d: 2, c: 'analysis', key: 'a',
  a: 'Under the differential piece wage system, a worker who produces below the standard earns less per piece.',
  r: 'The system uses two piece rates: a higher rate for output at or above the standard and a lower rate below it.',
  sol: 'Both are true, and R explains A: the lower rate applies to output below the standard.',
}));
Q('tf_taylor', tf({
  t: 3, d: 1, c: 'recall', ans: false,
  stem: 'True or false? Taylor developed his ideas mainly from his experience as a top manager, while Fayol developed his ideas from experiments on the shop floor.',
  sol: 'It is the other way round: Taylor worked through observation and experiment on the shop floor, while Fayol drew on his experience as a top manager.',
}));
Q('num_dpw', num({
  t: 3, d: 2, c: 'application', marks: 1, value: DPW_GAP, unit: '₹',
  stem: `At an imagined hosiery unit in Ludhiana the standard output is ${DPW.std} pieces a day. The rate is ₹${DPW.high} a piece at or above the standard and ₹${DPW.low} a piece below it. Arjun makes ${DPW.a} pieces and Kabir makes ${DPW.b} pieces in a day. By how many rupees do Arjun's daily earnings exceed Kabir's?`,
  sol: `Step 1: Arjun is above the standard, so he earns ${DPW.a} × ${DPW.high} = ₹${DPW_A}.\nStep 2: Kabir is below the standard, so he earns ${DPW.b} × ${DPW.low} = ₹${DPW_B}.\nStep 3: Difference = ${DPW_A} − ${DPW_B} = ₹${DPW_GAP}.`,
}));
Q('num_dpw_low', num({
  t: 3, d: 2, c: 'understanding', marks: 1, value: DPW_B, unit: '₹',
  stem: `Using the same hosiery unit (standard ${DPW.std} pieces; ₹${DPW.high} at or above the standard, ₹${DPW.low} below it), what does Kabir earn for ${DPW.b} pieces in a day (in ₹)?`,
  sol: `${DPW.b} is below the standard of ${DPW.std}, so the lower rate applies: ${DPW.b} × ${DPW.low} = ₹${DPW_B}.`,
}));
Q('fb_foreman', fb({
  t: 3, d: 2, c: 'recall',
  stem: 'Under functional foremanship, the ___ boss keeps machines and tools ready for work, and the ___ checks the quality of work.',
  acc: [['gang'], ['inspector']],
  sol: 'The gang boss keeps machines, tools and materials ready, and the inspector checks quality.',
}));
Q('mt_taylor', match({
  t: 3, d: 2, c: 'understanding',
  stem: 'Match each technique of scientific management with what it decides at an imagined bicycle factory in Ludhiana.',
  pairs: [
    ['Time study', 'Standard time to fit a chain'],
    ['Fatigue study', 'How often painters take a rest'],
    ['Motion study', 'Which hand movements in wheel truing can be dropped'],
    ['Simplification', 'Cutting frame sizes from twelve to four'],
  ],
  sol: 'Time study sets standard times; fatigue study sets rest intervals; motion study removes needless movements; simplification removes unnecessary varieties.',
}));
Q('s_mental_revolution', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain the principle of harmony, not discord, and the idea of mental revolution behind it.',
  model: 'Taylor said there should be **harmony** between management and workers, not class conflict. This needs a **mental revolution**: both change their attitude, management **shares gains** with workers and workers work with full effort, so both prosper.',
  sol: 'State the principle and explain the change in attitude it requires.',
  scheme: [['Harmony instead of conflict', 1], ['Mental revolution explained', 1]],
}));
Q('s_standardisation', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between standardisation and simplification of work.',
  model: '**Standardisation** sets fixed **standards** for every activity: the process, raw materials, tools, time and quality. **Simplification** removes **unnecessary diversity** of products, such as extra sizes, types and grades, to cut cost.',
  sol: 'Define each and bring out the difference.',
  scheme: [['Standardisation', 1], ['Simplification', 1]],
}));
Q('s_functional', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain functional foremanship and name the specialists under the planning in-charge and the production in-charge.',
  model: 'Taylor separated **planning from execution** and gave each worker **specialist** foremen, each an expert in one function.\nThe four who plan, under the planning in-charge, are the **route clerk**, the **instruction card clerk**, the **time and cost clerk** and the **disciplinarian**.\nThe four who supervise production are the **speed boss**, the **gang boss**, the **repair boss** and the **inspector**.',
  sol: 'Explain the idea and list all eight under the right head.',
  scheme: [['Concept: separation of planning and execution with specialists', 1], ['Four under the planning in-charge', 1], ['Four under the production in-charge', 1]],
}));
Q('s3_techniques', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'The owner of an imagined tailoring unit in Kanpur finds that orders are late, workers tire by afternoon and each tailor stitches a shirt differently. Suggest one technique of scientific management for each problem.',
  model: '1. **Late orders: time study**, to fix the standard time for each shirt and plan the number of tailors needed.\n2. **Tired workers: fatigue study**, to fix rest breaks so energy and output are kept up.\n3. **Different methods: method study** (with standardisation), to find and fix the **one best way** to stitch a shirt.',
  sol: 'Each problem matched to a suitable technique, with a reason.',
  scheme: [['Technique for late orders', 1], ['Technique for fatigue', 1], ['Technique for differing methods', 1]],
}));
Q('s3_fayol_taylor', short({
  t: [2, 3], d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Compare the contributions of Fayol and Taylor on any three bases.',
  model: '1. **Perspective:** Fayol looked at management from the **top level**; Taylor from the **shop floor** (supervisory level).\n2. **Unity of command:** Fayol held to it strictly; Taylor\'s **functional foremanship** gives a worker eight bosses.\n3. **Basis:** Fayol relied on **personal experience** as a manager; Taylor on **observation and experiments**. (Also: focus on administration vs productivity; universal vs specific application.)',
  sol: 'Three bases, each with both sides.',
  scheme: [['First basis with both sides', 1], ['Second basis with both sides', 1], ['Third basis with both sides', 1]],
}));
Q('l_taylor_principles', long({
  t: 3, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain Taylor\'s principles of scientific management.',
  model: '1. **Science, not rule of thumb:** every job is studied scientifically to find the **one best method**, replacing habit and guesswork.\n2. **Harmony, not discord:** management and workers should end conflict through a **mental revolution**, seeing that they gain together.\n3. **Cooperation, not individualism:** management should welcome **workers\' suggestions** and share gains, and workers should not strike without cause.\n4. **Development of each and every person:** **scientific selection**, placement and **training** to bring out each worker\'s greatest efficiency and prosperity.\n5. **Result:** higher productivity, higher wages and lower costs for both sides.',
  sol: 'All four principles explained, with the overall result.',
  scheme: [['Science, not rule of thumb', 1], ['Harmony, not discord', 1], ['Cooperation, not individualism', 1], ['Development of each person', 1], ['Overall result', 1]],
}));
Q('l_fayol_vs_taylor', long({
  t: [2, 3], d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Distinguish between the contributions of Fayol and Taylor on any five bases.',
  model: '1. **Perspective:** Fayol: top management; Taylor: shop-floor supervision.\n2. **Unity of command:** Fayol followed it strictly; Taylor broke it through **functional foremanship**.\n3. **Applicability:** Fayol\'s principles are **universal**; Taylor\'s suit **specialised situations**.\n4. **Basis:** Fayol: **personal experience**; Taylor: **observation and experimentation**.\n5. **Focus:** Fayol: improving **overall administration**; Taylor: raising **productivity**. (Also: Fayol a practitioner, Taylor a scientist; general theory of administration vs scientific management.)',
  sol: 'Five bases, each with both sides.',
  scheme: [['Basis 1', 1], ['Basis 2', 1], ['Basis 3', 1], ['Basis 4', 1], ['Basis 5', 1]],
}));
Q('l_taylor_techniques', long({
  t: 3, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'An imagined toy factory in Channapatna wants to raise output without hiring more workers. Explain five techniques of scientific management it could use.',
  model: '1. **Method study:** find the **one best way** to cut, turn and lacquer each toy.\n2. **Motion study:** remove **needless movements** of the turners\' hands.\n3. **Time study:** fix a **standard time** per toy to plan work and pay.\n4. **Fatigue study:** schedule **rest breaks** so workers keep up their output.\n5. **Differential piece wage:** pay a **higher rate** to those who reach the standard, motivating everyone to improve.',
  sol: 'Five techniques, each applied to the factory.',
  scheme: [['Technique 1 applied', 1], ['Technique 2 applied', 1], ['Technique 3 applied', 1], ['Technique 4 applied', 1], ['Technique 5 applied', 1]],
}));

// ================================================================ case-based
Q('cb_courier', caseQ({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined business situation written by SOYL for practice.)*',
  passage: '**Swiftline Couriers, Pune (imagined)**\n\nSwiftline\'s sorting hub had become chaotic. Parcels were stacked wherever there was space, and pickers spent hours searching for them. Ramesh, a sorter, complained that the hub manager and the dispatch manager both gave him instructions, often opposite ones. The new operations head, Ms Kaur, gave every parcel route a numbered bay and **told each sorter to take orders only from his shift leader**. She also started a monthly award for the best idea to speed up sorting; a sorter\'s idea of colour-coded tags cut errors by half.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Identify the principle followed when Ms Kaur gave every parcel route a numbered bay.', model: '**Order**: a place for everything and everything in its place.', sol: 'Fixed bays for parcels apply the principle of order.', scheme: [['Order', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which principle had been violated in Ramesh\'s case before the change?', model: '**Unity of command**: Ramesh had two bosses giving opposite orders.', sol: 'Two managers instructing one sorter violates unity of command.', scheme: [['Unity of command', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Identify and explain the principle behind the monthly award for ideas, quoting the line from the passage.', model: '**Initiative**: "She also started a monthly award for the best idea to speed up sorting." Workers are encouraged to **think of and carry out improvements**, which raises their interest and helped cut errors.', sol: 'Name the principle, quote the line and explain.', scheme: [['Initiative with the line quoted', 1], ['Explanation', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): State two likely benefits to Swiftline of the changes made by Ms Kaur.', model: '1. **Less time and waste:** numbered bays end searching, so parcels move faster.\n2. **Better discipline and morale:** one boss per sorter removes confusion, and rewards for ideas raise motivation.', sol: 'Two benefits linked to the changes.', scheme: [['First benefit', 1], ['Second benefit', 1]] }),
    ]),
  ],
}));
Q('cb_tea', caseQ({
  t: 2, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined business situation written by SOYL for practice.)*',
  passage: '**Brahmaputra Leaf Tea Estate, Assam (imagined)**\n\nThe estate has two units: one grows and plucks tea, the other runs a packaging plant. Each unit has its own manager and its own targets. Last season the pluckers were paid less than in nearby estates, and many left mid-season; the new ones were moved between gardens every few weeks. The general manager, Mr Bora, has now raised wages to match the area and **promised that pluckers will stay in the same garden for the whole season**. At the season-end festival he thanked "all of us at Brahmaputra Leaf" for a record crop.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which principle is followed by giving each unit its own manager and targets?', model: '**Unity of direction**: one head and one plan for each group of activities with the same objective.', sol: 'Separate heads and plans for each unit is unity of direction.', scheme: [['Unity of direction', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Name the principle Mr Bora followed by raising wages to match the area.', model: '**Remuneration of employees**: pay should be fair and give a reasonable standard of living.', sol: 'Fair pay within the firm\'s capacity is the principle of remuneration.', scheme: [['Remuneration of employees', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify the principle in the highlighted line and explain why ignoring it last season hurt the estate.', model: '**Stability of tenure of personnel.** Moving new pluckers every few weeks meant they never learnt a garden well, so **efficiency fell** and the cost of training rose; settled workers become productive.', sol: 'Name the principle and explain the cost of frequent moves.', scheme: [['Stability of tenure identified', 1], ['Why ignoring it hurt', 1]] }), [
      short({ t: 2, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Which principle does Mr Bora\'s festival speech reflect? Explain.', model: '**Esprit de corps.** By thanking "all of us" he uses **we**, not I, and gives credit to the whole team, which builds **team spirit and unity**.', sol: 'Name the principle and link it to the words used.', scheme: [['Esprit de corps', 1], ['Explanation from the speech', 1]] }),
    ]),
  ],
}));
Q('cb_tailor_wages', caseQ({
  t: 3, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined business situation written by SOYL for practice.)*',
  passage: `**Kalindi Garments, Tiruppur (imagined)**\n\nAfter timing many trained workers, Kalindi Garments fixed a standard of ${DPC.std} collars a day for its collar-stitchers. It pays ₹${DPC.high} a collar to those who reach the standard and ₹${DPC.low} a collar to those who do not. Yesterday Ravi stitched ${DPC.ravi} collars and Sunil stitched ${DPC.sunil}. The owner has also hired a specialist who checks only the quality of finished collars, and another who only keeps the machines oiled and ready.`,
  parts: [
    child('a', num({ t: 3, d: 2, c: 'application', marks: 1, value: DPC_RAVI, unit: '₹', stem: 'Calculate Ravi\'s earnings for the day (in ₹).', sol: `Ravi reached the standard, so the higher rate applies: ${DPC.ravi} × ${DPC.high} = ₹${DPC_RAVI}.` })),
    child('b', num({ t: 3, d: 2, c: 'application', marks: 1, value: DPC_SUNIL_IF - DPC_SUNIL, unit: '₹', stem: `Sunil earned ₹${DPC_SUNIL}. How much more would he have earned (in ₹) if he had stitched exactly ${DPC.ext} collars?`, sol: `Step 1: At ${DPC.ext} collars he reaches the standard: ${DPC.ext} × ${DPC.high} = ₹${DPC_SUNIL_IF}.\nStep 2: Extra = ${DPC_SUNIL_IF} − ${DPC_SUNIL} = ₹${DPC_SUNIL_IF - DPC_SUNIL}.` })),
    child('c', short({ t: 3, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Identify the technique of scientific management used to fix the wage rates, and explain its purpose.', model: '**Differential piece wage system.** It pays a **higher rate** for output at or above the standard and a **lower rate** below it, so efficient workers are rewarded and others are motivated to reach the standard.', sol: 'Name the technique and explain how the two rates motivate.', scheme: [['Technique identified', 1], ['Purpose explained', 1]] }), [
      short({ t: 3, d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Identify the technique shown by hiring specialists to check quality and to keep machines ready. Name these two specialists.', model: '**Functional foremanship.** The specialist who checks quality is the **inspector**; the one who keeps machines and tools ready is the **gang boss**.', sol: 'Name the technique and the two foremen.', scheme: [['Functional foremanship', 1], ['Inspector and gang boss', 1]] }),
    ]),
  ],
}));
Q('cb_school', caseQ({
  t: [1, 2], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined situation written by SOYL for practice.)*',
  passage: '**Navodaya Public School canteen, Shimla (imagined)**\n\nThe school\'s principal, who had once managed a hotel kitchen, used the same management principles to run the canteen. She split the work: two cooks, one cashier and one helper for cleaning. When the canteen manager wanted to buy vegetables at a higher price from a friend\'s shop, the principal asked him to buy from the cheapest good-quality supplier, since the canteen served the whole school. She **found that strict rules suited the large hotel but adapted them for the small canteen**, where staff now help each other at lunch hour.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which feature of principles of management is shown by using hotel principles in a school canteen?', model: '**Universal applicability**: principles apply to business and non-business organisations alike.', sol: 'The same principles work in a hotel and a school canteen.', scheme: [['Universal applicability', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Name the principle of Fayol shown in the purchase of vegetables.', model: 'The manager\'s personal interest gave way to the school\'s: this is **subordination of individual interest to general interest**.', sol: 'The canteen\'s interest comes before the manager\'s personal interest.', scheme: [['Subordination of individual interest', 1]] })),
    child('c', short({ t: [1, 2], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify the feature of principles in the highlighted line and explain it.', model: '**Flexible** (also contingent): principles are not rigid; the principal **modified** them to suit the small canteen, showing that their application depends on the **situation**.', sol: 'Name the feature and explain with the case.', scheme: [['Flexibility identified', 1], ['Explanation with the case', 1]] }), [
      short({ t: 2, d: 2, c: 'application', marks: 2, stem: '**Or** (ii): Identify the principle of Fayol in the way the principal split the work, and state one benefit.', model: '**Division of work.** Each person does a specialised task, so work is done **faster and with fewer mistakes**.', sol: 'Name the principle and one benefit.', scheme: [['Division of work', 1], ['One benefit', 1]] }),
    ]),
  ],
}));
