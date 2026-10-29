// CBSE 12 Business Studies, ch07 Directing — question bank. Every firm, person and situation is
// imagined and written by SOYL for practice (labelled as such); no NCERT text, case or exercise and no
// board/sample-paper item is reused (D-036). Concepts follow the 2026-27 syllabus topics t01–t05.
import { Q, mcq, ar, tf, fb, match, ord, short, long, caseQ, child } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// ================================================================ t01 Directing: concept, characteristics, importance, principles
Q('m_dir_meaning', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Which statement best describes **directing** as a function of management?',
  opts: [
    'Instructing, guiding, motivating, leading and communicating with people so that they work towards the organisation\'s goals',
    'Fixing objectives in advance and deciding how to achieve them',
    'Grouping jobs into departments and fixing reporting relationships',
    'Measuring actual results and comparing them with set standards',
  ],
  sol: 'Directing is the function that sets people in motion through instruction, guidance, motivation, leadership and communication. Fixing objectives in advance is planning, grouping jobs is organising, and comparing results with standards is controlling.',
}));
Q('m_dir_pervasive', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'At an imagined tyre company in Chennai, the managing director guides the plant heads, the plant heads guide the supervisors, and the supervisors guide the machine operators. Which characteristic of directing does this show?',
  opts: ['Directing takes place at every level of management', 'Directing initiates action', 'Directing flows from top to bottom only on paper', 'Directing is needed only at the operational level'],
  sol: 'Every manager, from the managing director to the supervisor, directs the people below. This is the characteristic that directing takes place at every level (it is pervasive). "Initiates action" is a different characteristic, and the other two options are wrong.',
}));
Q('m_dir_initiates', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Plans and the organisation structure exist on paper, but work actually begins only when managers instruct and guide people. Which characteristic of directing is described here?',
  opts: ['Directing initiates action', 'Directing is a continuous process', 'Directing flows from top to bottom', 'Directing takes place at every level'],
  sol: 'Directing is the function that sets the organisation in motion: it initiates action. The other options are true characteristics of directing but are not what the statement describes.',
}));
Q('m_pr_harmony', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'An imagined paint company in Nagpur found that its dealers\' sales staff pushed only cheap paints because their commission was a fixed amount per tin. It changed the commission to a share of profit on each sale, so that staff gained most when the company gained most. Which principle of directing did it follow?',
  opts: ['Harmony of objectives', 'Unity of command', 'Follow through', 'Use of informal organisation'],
  sol: 'The change brings the staff\'s personal goal (higher commission) in line with the company\'s goal (higher profit). That is harmony of objectives. Unity of command is about one boss, follow through about checking implementation, and informal organisation about using informal groups.',
}));
Q('m_pr_follow', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'After explaining a new packing method to her team, the floor manager of an imagined spice unit in Guntur visits the packing line every morning for a week to see how it is going and to clear doubts. Which principle of directing is she following?',
  opts: ['Follow through', 'Maximum individual contribution', 'Appropriateness of direction technique', 'Managerial communication'],
  sol: 'Giving an order is not enough; the manager checks how it is carried out and helps where needed. This is follow through. The other principles are about getting the most from each person, choosing a suitable technique and clear communication.',
}));
Q('m_pr_unity', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'At an imagined furniture showroom in Jaipur, the sales manager tells Rohit to stay at the billing counter, while the store manager tells him at the same time to arrange the new stock. Rohit does not know whom to obey. Which principle of directing has been violated?',
  opts: ['Unity of command', 'Harmony of objectives', 'Follow through', 'Leadership'],
  sol: 'A subordinate should receive instructions from only one superior. Rohit gets conflicting orders from two bosses, so unity of command is violated, which causes confusion and delay.',
}));
Q('m_pr_informal', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Before announcing new shift timings, the works manager of an imagined cement plant in Satna quietly talks to the workers who lead the plant\'s cricket club, so that they can explain the reasons to others over tea. Which principle of directing is he using?',
  opts: ['Use of informal organisation', 'Unity of command', 'Maximum individual contribution', 'Follow through'],
  sol: 'The manager uses the informal groups that exist within the formal structure to pass on information and win acceptance. That is the principle of using informal organisation.',
}));
Q('ar_dir_continuous', ar({
  t: 1, d: 2, c: 'analysis', key: 'a',
  a: 'Directing is a continuous process.',
  r: 'Directing goes on throughout the life of an organisation, whoever occupies the managerial positions.',
  sol: 'Both are true, and R explains A: managers change, but the need to guide and motivate people never stops, so directing is continuous.',
}));
Q('tf_dir_top', tf({
  t: 1, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? Only top-level managers perform the function of directing.',
  sol: 'Every manager directs the people below him or her, from the chief executive down to the supervisor, so directing takes place at every level.',
}));
Q('s_dir_imp', short({
  t: 1, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give two reasons why directing is important for an organisation.',
  model: '1. It **initiates action**: plans are only ideas until managers guide people to start the work.\n2. It **integrates efforts**: by guiding and motivating, managers make individual work add up to the common goals.',
  sol: 'Any two points of importance (initiates action, integrates efforts, helps get maximum out of people, facilitates change, brings balance), each explained briefly.',
  scheme: [['First point with brief explanation', 1], ['Second point with brief explanation', 1]],
}));
Q('s_pr_two', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain the principles of "maximum individual contribution" and "harmony of objectives" in directing.',
  model: '1. **Maximum individual contribution:** directing techniques should draw out the **full potential** of every employee towards the firm\'s goals.\n2. **Harmony of objectives:** the personal goals of employees (pay, growth) should be brought **in line with** the goals of the organisation, so that both are met together.',
  sol: 'One correct explanation for each principle.',
  scheme: [['Maximum individual contribution explained', 1], ['Harmony of objectives explained', 1]],
}));
Q('s3_dir_char', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'State three characteristics of directing.',
  model: '1. **Initiates action:** it starts the actual work; other functions prepare the ground for it.\n2. **Pervasive:** it is done by every manager at every level, wherever people work under a superior.\n3. **Continuous and flows downward:** it goes on throughout the life of the firm, and instructions pass from superiors to subordinates.',
  sol: 'Three distinct characteristics, each with a short explanation.',
  scheme: [['First characteristic', 1], ['Second characteristic', 1], ['Third characteristic', 1]],
}));
Q('l_dir_principles', long({
  t: 1, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'Explain any five principles of directing, giving a short workplace illustration for each.',
  model: '1. **Maximum individual contribution:** use techniques that bring out each person\'s best, e.g. matching tasks to skills.\n2. **Harmony of objectives:** link personal goals to company goals, e.g. a commission tied to profit.\n3. **Unity of command:** one boss for each employee, so orders never conflict.\n4. **Appropriateness of direction technique:** choose the motivation or leadership method that suits the people and the situation.\n5. **Follow through:** check how instructions are carried out and help where needed, e.g. daily visits after a new method is introduced.\n(Also: managerial communication, use of informal organisation, leadership.)',
  sol: 'Any five principles, each named, explained and illustrated in a line.',
  scheme: [['First principle', 1], ['Second principle', 1], ['Third principle', 1], ['Fourth principle', 1], ['Fifth principle', 1]],
}));
Q('l_dir_importance', long({
  t: 1, d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: 'Directing is called the heart of the management process. Explain five points of importance of directing in support of this view.',
  model: '1. **Initiates action:** people start working towards targets only when managers instruct and guide them.\n2. **Integrates efforts:** it ties the work of many people and departments into one direction.\n3. **Brings out potential:** motivation and leadership help employees use their full abilities.\n4. **Facilitates change:** employees resist change; good communication and leadership help them accept it.\n5. **Brings stability and balance:** effective direction keeps people working together smoothly, so the firm can grow steadily.',
  sol: 'Five distinct points of importance, each explained in a line.',
  scheme: [['Initiates action', 1], ['Integrates efforts', 1], ['Brings out potential', 1], ['Facilitates change', 1], ['Stability and balance', 1]],
}));

// ================================================================ t02 Supervision
Q('m_sup_meaning', mcq({
  t: 2, d: 1, c: 'understanding',
  stem: 'In directing, **supervision** mainly means',
  opts: [
    'overseeing the work of subordinates and guiding them on the job so that it is done as planned',
    'preparing the annual budget of the organisation',
    'choosing the best candidate from many applicants',
    'framing the long-term objectives of the business',
  ],
  sol: 'Supervision is watching over work in progress and guiding the people doing it. Budgets and objectives belong to planning, and choosing candidates belongs to staffing.',
}));
Q('m_sup_link', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Sushma, a supervisor at an imagined bicycle factory in Ludhiana, explains management\'s new safety rules to the workers and passes the workers\' complaints about faulty gloves up to the plant manager. Which role of a supervisor does this show most clearly?',
  opts: ['A link between management and workers', 'A guide who trains new workers', 'A planner of the company\'s long-term strategy', 'A recruiter of staff for the factory'],
  sol: 'Sushma carries messages both ways: management\'s rules down and workers\' problems up. This is the supervisor\'s role as a vital link between management and workers.',
}));
Q('m_sup_training', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'A new operator at an imagined printing press in Sivakasi cannot set the colour rollers. The shift supervisor stands with her for two days and shows her how to do it. Which function of a supervisor is being performed?',
  opts: ['Training and guiding workers on the job', 'Maintaining discipline by fines', 'Fixing the firm\'s pricing policy', 'Approving the purchase of new machines'],
  sol: 'Teaching a worker the right way to do a job at the workplace is on-the-job guidance and training, an important function of the supervisor.',
}));
Q('ar_sup_contact', ar({
  t: 2, d: 2, c: 'analysis', key: 'c',
  a: 'A supervisor is in daily, direct contact with the workers.',
  r: 'A supervisor belongs to the top level of management.',
  sol: 'A is true: supervisors work alongside operatives every day. R is false: supervisors are at the lowest (operational) level of management, which is exactly why they are in direct contact with workers.',
}));
Q('s_sup_two', short({
  t: 2, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two ways in which a good supervisor helps the workers under him or her.',
  model: '1. He or she **guides and trains** workers on the job so that they learn the correct method.\n2. He or she **builds team spirit** and keeps workers motivated, so that small groups work together smoothly.',
  sol: 'Any two functions of a supervisor that help workers (guidance and training, motivation, maintaining group unity, feedback).',
  scheme: [['First way', 1], ['Second way', 1]],
}));
Q('s3_sup_role', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Arjun is the supervisor of the loading bay at an imagined warehouse in Nashik. He tells workers about the new delivery targets, settles a quarrel between two loaders, and tells the manager that the conveyor belt needs repair. Identify three roles of a supervisor shown here.',
  model: '1. **Communicating plans to workers:** he explains "the new delivery targets" to the team.\n2. **Maintaining group harmony:** he "settles a quarrel between two loaders", which keeps the team united.\n3. **Feedback to management (link):** he reports that the conveyor belt needs repair, passing problems from the floor upward.',
  sol: 'Three roles, each tied to a line of the situation.',
  scheme: [['First role with evidence', 1], ['Second role with evidence', 1], ['Third role with evidence', 1]],
}));

// ================================================================ t03 Motivation, Maslow and incentives
Q('m_mot_start', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'The process of motivation begins with',
  opts: ['an unsatisfied need', 'a reward from the manager', 'a change in behaviour', 'the satisfaction of a need'],
  sol: 'An unsatisfied need creates tension, which drives a person to act in a way that satisfies the need. Reward, behaviour and satisfaction come later in the process.',
}));
Q('m_maslow_esteem', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Kiran, a senior designer at an imagined jewellery firm in Thrissur, is well paid and feels secure. She now wants her name printed on the collections she designs and a seat at the design committee. Which need is she trying to satisfy?',
  opts: ['Esteem need', 'Safety need', 'Physiological need', 'Affiliation need'],
  sol: 'Recognition, status and respect from others are esteem needs. Her pay (physiological) and security (safety) are already met, and she is not seeking friendship or belonging.',
}));
Q('m_maslow_safety', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Workers at an imagined brick unit in Bareilly ask the owner for permanent appointment letters and a pension scheme rather than a one-time cash gift. Which need do these demands reflect?',
  opts: ['Safety or security need', 'Self-actualisation need', 'Esteem need', 'Affiliation need'],
  sol: 'Job security and provision for old age protect workers against future uncertainty, which is the safety (security) need.',
}));
Q('m_maslow_affil', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'A new accountant at an imagined travel agency in Shillong feels lonely and is happiest on days the team eats lunch together and invites her to their weekend trek. Which need is most important to her now?',
  opts: ['Affiliation or belonging need', 'Physiological need', 'Self-actualisation need', 'Safety need'],
  sol: 'The wish to be accepted, to belong to a group and to have friends at work is the affiliation (belonging) need.',
}));
Q('m_maslow_self', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'Dr Rao, the respected head of research at an imagined seed company in Hyderabad, turns down a bigger title and asks instead to lead a difficult project to breed a drought-proof millet, saying she wants to see what she is truly capable of. Which need is driving her?',
  opts: ['Self-actualisation need', 'Esteem need', 'Safety need', 'Affiliation need'],
  sol: 'The urge to become what one is capable of becoming and to realise one\'s full potential is self-actualisation, the highest need. She already has status (esteem) and refuses a bigger title.',
}));
Q('m_maslow_assume', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which one of the following is an **assumption** of Maslow\'s need hierarchy theory?',
  opts: [
    'A need that has been satisfied no longer motivates; the next higher need becomes the motivator',
    'All people are motivated only by money',
    'Higher needs must be satisfied before lower needs',
    'Needs do not affect people\'s behaviour at work',
  ],
  sol: 'Maslow assumed that behaviour depends on needs, that needs follow a hierarchy from lower to higher, and that a satisfied need stops motivating so the next level takes over. The other options contradict the theory.',
}));
Q('m_fin_copartner', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'An imagined software firm in Pune offers its employees the right to buy the company\'s shares at a price lower than the market price. Which incentive is this?',
  opts: ['Co-partnership or employee stock option', 'Profit sharing in cash', 'Retirement benefit', 'Job enrichment'],
  sol: 'Offering shares at a lower price makes employees part-owners: co-partnership or employee stock option, a financial incentive. Profit sharing gives a share of profit, not shares; job enrichment is non-financial.',
}));
Q('m_nonfin_enrich', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Instead of only fitting soles, workers at an imagined shoe unit in Kanpur are now given whole pairs to make, choose their own work order and check their own quality. Which non-financial incentive is this?',
  opts: ['Job enrichment', 'Job security', 'Status', 'Perquisites'],
  sol: 'Designing jobs with more variety, responsibility and scope for growth is job enrichment. Job security is about continuity of work, status about rank, and perquisites are financial.',
}));
Q('m_nonfin_empower', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'Front-desk staff at an imagined hotel in Udaipur are told they may give a refund or a free room upgrade to an unhappy guest up to a set limit without asking the manager. Which non-financial incentive does this show?',
  opts: ['Employee empowerment', 'Career advancement opportunity', 'Employee recognition', 'Organisational climate'],
  sol: 'Giving employees more autonomy and power to decide on the spot is employee empowerment. It makes them feel trusted and responsible for results.',
}));
Q('m_perq', mcq({
  t: 3, d: 1, c: 'understanding',
  stem: 'Which of the following is an example of **perquisites** offered to managers?',
  opts: ['A company car, free housing and medical facilities', 'A certificate of merit at the annual function', 'A chance to take part in management decisions', 'A more challenging and varied job'],
  sol: 'Perquisites (perks) are fringe benefits such as a car, housing or medical aid over and above salary; they are financial incentives. The other three are non-financial incentives.',
}));
Q('ar_maslow_order', ar({
  t: 3, d: 3, c: 'analysis', key: 'a',
  a: 'A worker who cannot afford two meals a day is unlikely to be motivated by the offer of a grander job title.',
  r: 'According to Maslow, higher-level needs motivate only after the lower-level needs are reasonably satisfied.',
  sol: 'Both are true and R explains A: the worker\'s physiological needs are still unmet, so an esteem reward (a title) has little pull until basic needs are satisfied.',
}));
Q('ar_money_only', ar({
  t: 3, d: 3, c: 'analysis', key: 'd',
  a: 'Money is the only factor that motivates employees.',
  r: 'Financial incentives mainly help satisfy the lower-level needs of employees.',
  sol: 'A is false: recognition, job security, enriched jobs and participation also motivate. R is true: pay and allowances mainly meet physiological and safety needs, which is why non-financial incentives are needed for higher needs.',
}));
Q('ar_recognition', ar({
  t: 3, d: 2, c: 'analysis', key: 'a',
  a: 'Employee recognition programmes can motivate workers even without extra pay.',
  r: 'Recognition satisfies the esteem needs of employees.',
  sol: 'Both are true and R explains A: praise, awards and display of achievements meet the need for respect and status, so they motivate without money.',
}));
Q('tf_bonus', tf({
  t: 3, d: 1, c: 'recall', ans: true,
  stem: 'True or false? A bonus paid over and above wages is a financial incentive.',
  sol: 'A bonus is extra money given over and above the wage, so it is a financial (monetary) incentive.',
}));
Q('fb_highest', fb({
  t: 3, d: 1, c: 'recall',
  stem: 'In Maslow\'s hierarchy, the need at the top, to become everything one is capable of becoming, is called the ___ need.',
  acc: [['self-actualisation', 'self actualisation', 'self-actualization']],
  sol: 'The highest need in the hierarchy is the self-actualisation need.',
}));
Q('ord_maslow', ord({
  t: 3, d: 1, c: 'understanding', marks: 1,
  stem: 'Arrange the needs in Maslow\'s hierarchy from the **lowest** to the **highest**.',
  items: ['Physiological needs', 'Safety or security needs', 'Affiliation or belonging needs', 'Esteem needs', 'Self-actualisation needs'],
  sol: 'Basic physiological needs come first, then safety, then belonging, then esteem, and self-actualisation is at the top.',
}));
Q('mt_incentive', match({
  t: 3, d: 2, c: 'application',
  stem: 'Match each practice at an imagined Kolkata publishing house with the incentive it represents.',
  pairs: [
    ['Editors get a fixed share of the year\'s profit', 'Profit sharing'],
    ['Senior staff get rent-free flats near the office', 'Perquisites'],
    ['The best proofreader\'s photo goes up on the notice board each month', 'Employee recognition'],
    ['Staff are promised that no one will be laid off this year', 'Job security'],
  ],
  sol: 'A share of profit is profit sharing and free flats are perquisites (both financial). A photo on the notice board is recognition and a no-layoff promise is job security (both non-financial).',
}));
Q('s_mot_features', short({
  t: 3, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two features of motivation.',
  model: '1. Motivation is an **internal feeling**: it arises from a person\'s needs, wants and desires.\n2. It can be **positive or negative**: rewards such as a raise, or fear of a penalty, can both push people to act.',
  sol: 'Any two features: internal feeling, produces goal-directed behaviour, positive or negative, complex process (individuals differ).',
  scheme: [['First feature', 1], ['Second feature', 1]],
}));
Q('s_fin_nonfin', short({
  t: 3, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined bank in Bhopal gives its staff (i) a pension after retirement and (ii) a chance to sit on the committee that plans branch timings. Name each incentive and say whether it is financial or non-financial.',
  model: '(i) A pension is a **retirement benefit**, a **financial** incentive because it gives money security after service ends.\n(ii) Sitting on the timings committee is **employee participation**, a **non-financial** incentive because it involves staff in decisions.',
  sol: 'Name and classify each incentive correctly.',
  scheme: [['Retirement benefit, financial', 1], ['Employee participation, non-financial', 1]],
}));
Q('s3_maslow_case', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Identify the need that each employee of an imagined dairy cooperative in Anand is trying to satisfy: (i) Bhavesh, a new milk collector, asks for an advance to pay his family\'s rent and food; (ii) Hetal, a veterinary officer, wants to be called "Senior Officer" after ten years of service; (iii) Mansi, a lab assistant, wants a permanent post instead of yearly contracts.',
  model: '(i) **Physiological need**: Bhavesh is asking for money to pay for rent and food, which are basic needs for survival.\n(ii) **Esteem need**: Hetal wants a senior title after ten years, which would bring her status and respect from others.\n(iii) **Safety or security need**: Mansi wants a permanent post, which protects her against the loss of income when a yearly contract ends.',
  sol: 'One need per person with a reason.',
  scheme: [['Physiological with reason', 1], ['Esteem with reason', 1], ['Safety with reason', 1]],
}));
Q('s3_nonfin', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'The salaries at an imagined call centre in Mohali are good, yet staff morale is low and many leave within a year. Suggest three non-financial incentives the management could use, with a reason for each.',
  model: '1. **Career advancement:** clear promotion paths from agent to team leader give staff a reason to stay.\n2. **Employee recognition:** praising and rewarding good calls publicly meets the need for respect.\n3. **Job enrichment or empowerment:** letting experienced agents solve complaints on their own makes the work less monotonous and more responsible.',
  sol: 'Three suitable non-financial incentives, each with a reason linked to low morale or turnover.',
  scheme: [['First incentive with reason', 1], ['Second incentive with reason', 1], ['Third incentive with reason', 1]],
}));
Q('l_maslow', long({
  t: 3, d: 3, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain Maslow\'s need hierarchy theory. Also state how a manager can use it to motivate employees.',
  model: '1. **Physiological needs:** food, shelter and clothing, met at work through basic pay.\n2. **Safety needs:** security of job and income, met by permanent jobs and pensions.\n3. **Affiliation needs:** belonging and friendship, met by teamwork and a friendly climate.\n4. **Esteem needs:** status and recognition; **self-actualisation:** reaching one\'s full potential through challenging work.\n5. **Use for managers:** find the level each employee has reached and offer incentives for the **next unmet need**, since a satisfied need no longer motivates.',
  sol: 'The five needs in order (two may be combined in one point) and the application of the theory by managers.',
  scheme: [['Physiological', 1], ['Safety', 1], ['Affiliation', 1], ['Esteem and self-actualisation', 1], ['How managers use it', 1]],
}));
Q('l_nonfin', long({
  t: 3, d: 2, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain any five non-financial incentives that a business can offer its employees.',
  model: '1. **Status:** a higher rank or title raises self-respect and standing in the firm.\n2. **Organisational climate:** a friendly, trusting atmosphere with fair treatment makes people want to work.\n3. **Career advancement:** chances of promotion with training encourage employees to improve.\n4. **Employee recognition:** praise, awards or a mention at meetings meet the need for respect.\n5. **Job security:** assurance of continued employment removes fear and lets people concentrate.\n(Also: job enrichment, employee participation, employee empowerment.)',
  sol: 'Any five non-financial incentives, each named and explained.',
  scheme: [['First incentive', 1], ['Second incentive', 1], ['Third incentive', 1], ['Fourth incentive', 1], ['Fifth incentive', 1]],
}));

// ================================================================ t04 Leadership
Q('m_lead_auto', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'The owner of an imagined construction firm in Patna makes every decision himself, gives orders without explanation and expects workers to obey them exactly. Which leadership style is this?',
  opts: ['Autocratic leadership', 'Democratic leadership', 'Laissez-faire leadership', 'Participative leadership'],
  sol: 'Keeping all decision power with the leader and expecting obedience is autocratic (authoritarian) leadership. Democratic and participative styles consult the group, and laissez-faire leaves decisions to the group.',
}));
Q('m_lead_demo', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'Before choosing the theme of the annual sale, the manager of an imagined clothing store in Indore asks her team for ideas, discusses them openly and then decides with their views in mind. Which leadership style is she using?',
  opts: ['Democratic or participative leadership', 'Autocratic leadership', 'Laissez-faire leadership', 'Bureaucratic control'],
  sol: 'Consulting subordinates and taking their views into account before deciding is the democratic (participative) style.',
}));
Q('m_lead_free', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'The head of an imagined research lab in Bengaluru sets the broad goal for a team of highly qualified scientists and leaves them free to decide their own methods, stepping in only when asked. Which leadership style suits this description?',
  opts: ['Laissez-faire or free-rein leadership', 'Autocratic leadership', 'Democratic leadership', 'Paternalistic control'],
  sol: 'Giving a capable, self-driven group full freedom to decide while the leader only supports them is the laissez-faire (free-rein) style.',
}));
Q('m_lead_quality', mcq({
  t: 4, d: 1, c: 'understanding',
  stem: 'Which of the following is a quality of a good leader?',
  opts: ['Initiative: taking the first step without waiting to be told', 'Avoiding all contact with subordinates', 'Keeping all knowledge to oneself', 'Changing decisions without any reason'],
  sol: 'Initiative is a key quality of a good leader, along with knowledge, integrity, communication skill, motivation skill, self-confidence, decisiveness and social skills. The other options describe poor leadership.',
}));
Q('ar_lead_influence', ar({
  t: 4, d: 3, c: 'analysis', key: 'b',
  a: 'Leadership is the ability to influence the behaviour of people towards shared goals.',
  r: 'A good leader possesses qualities such as integrity and self-confidence.',
  sol: 'Both statements are true, but R does not explain A. A defines leadership as influence; R lists qualities of a good leader, which is a different point.',
}));
Q('s_lead_qual', short({
  t: 4, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'State any two qualities of a good leader.',
  model: '1. **Knowledge and competence:** a leader who knows the work well earns the trust of the team.\n2. **Integrity:** honesty and fairness make people willing to follow the leader.',
  sol: 'Any two qualities (physical fitness, knowledge, integrity, initiative, communication skill, motivation skill, self-confidence, decisiveness, social skills) with a brief explanation.',
  scheme: [['First quality', 1], ['Second quality', 1]],
}));
Q('s3_lead_styles', short({
  t: 4, d: 4, c: 'analysis', marks: 3, wl: S3,
  stem: 'Suggest a suitable leadership style for each situation, with a reason: (i) a fire breaks out at an imagined chemical store and workers must be evacuated at once; (ii) a team of experienced architects is designing a new library; (iii) a school\'s teachers are planning the annual sports day.',
  model: '(i) **Autocratic:** in an emergency there is no time for discussion, and clear orders save lives.\n(ii) **Laissez-faire:** experienced, self-driven experts work best with freedom to use their judgement.\n(iii) **Democratic:** teachers\' ideas improve the plan and taking part makes them committed to it.',
  sol: 'One style per situation, each with a reason based on time, the ability of the group and the need for commitment.',
  scheme: [['Style and reason for (i)', 1], ['Style and reason for (ii)', 1], ['Style and reason for (iii)', 1]],
}));
Q('l_lead_importance', long({
  t: 4, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'What is leadership? Explain four points that show its importance to an organisation.',
  model: '**Leadership** is the process of influencing people to work willingly towards the goals of the group.\n1. **Influences behaviour:** a good leader makes people give their best willingly.\n2. **Builds relationships:** the leader keeps good personal ties with followers, which wins their cooperation.\n3. **Introduces change:** people accept new methods more easily when a trusted leader explains them.\n4. **Handles conflict and trains successors:** the leader settles disputes early and prepares capable people for future roles.',
  sol: 'Meaning plus four points of importance.',
  scheme: [['Meaning of leadership', 1], ['First point', 1], ['Second point', 1], ['Third point', 1], ['Fourth point', 1]],
}));

// ================================================================ t05 Communication
Q('m_comm_feedback', mcq({
  t: 5, d: 1, c: 'understanding',
  stem: 'In the communication process, **feedback** is',
  opts: [
    'the receiver\'s response that tells the sender how the message was understood',
    'the channel through which a message travels',
    'the conversion of a message into words or symbols',
    'any disturbance that distorts the message',
  ],
  sol: 'Feedback is the receiver\'s reply or reaction sent back to the sender. The channel is the medium, conversion into symbols is encoding, and disturbance is noise.',
}));
Q('m_comm_semantic', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'The IT head of an imagined grocery chain in Mysuru emails all store staff: "Clear the cache and re-sync the POS terminal with the cloud ERP." Most cashiers do not understand what to do. Which type of barrier is this?',
  opts: ['Semantic barrier', 'Psychological barrier', 'Organisational barrier', 'Personal barrier'],
  sol: 'Technical jargon that the receiver does not understand is a semantic (language) barrier. Psychological barriers come from emotions such as distrust, organisational ones from rules and structure, and personal ones from the attitudes of superiors or subordinates.',
}));
Q('m_comm_grapevine', mcq({
  t: 5, d: 1, c: 'understanding',
  stem: 'Communication that spreads among employees through friendships and casual talk, outside official channels, is called',
  opts: ['grapevine (informal communication)', 'formal communication', 'downward communication', 'a written order'],
  sol: 'Informal communication that moves through social relationships rather than the official chain is called the grapevine.',
}));
Q('m_comm_org', mcq({
  t: 5, d: 3, c: 'application',
  stem: 'At an imagined government-style trading company in Shimla, a clerk\'s suggestion must pass through six levels of officers before it reaches the general manager, and by then it has been changed and delayed. Which kind of barrier is this?',
  opts: ['Organisational barrier', 'Semantic barrier', 'Psychological barrier', 'Barrier due to faulty translation'],
  sol: 'Too many levels in the structure and rigid rules for passing messages are organisational barriers. Nothing in the case is about language or emotions.',
}));
Q('m_comm_decode', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'A receiver reads a message and works out its meaning. This element of the communication process is called',
  opts: ['decoding', 'encoding', 'noise', 'medium'],
  sol: 'Converting the symbols of a message back into meaning is decoding, done by the receiver. Encoding is done by the sender; noise is a disturbance; the medium is the channel.',
}));
Q('m_comm_wheel', mcq({
  t: 5, d: 3, c: 'understanding',
  stem: 'In an imagined design studio in Goa, all five designers send their messages only to the studio head, who passes them on as needed; the designers do not talk to each other about work. Which formal communication network is this?',
  opts: ['Wheel network', 'Single chain network', 'Circular network', 'Free flow network'],
  sol: 'When all subordinates communicate through one central superior, the pattern is the wheel network. A single chain runs down levels one after another, a circle passes messages to neighbours, and in free flow everyone talks to everyone.',
}));
Q('ar_grapevine_fast', ar({
  t: 5, d: 2, c: 'analysis', key: 'c',
  a: 'News spreads very fast through the grapevine.',
  r: 'Grapevine communication strictly follows the formal chain of command.',
  sol: 'A is true: informal news moves quickly from person to person. R is false: the grapevine moves through social links and ignores the official chain, which is one reason it is fast.',
}));
Q('tf_feedback', tf({
  t: 5, d: 1, c: 'understanding', ans: true,
  stem: 'True or false? Feedback from the receiver completes the communication process.',
  sol: 'Feedback tells the sender whether the message was received and understood as intended, so it completes the cycle of communication.',
}));
Q('fb_encoding', fb({
  t: 5, d: 1, c: 'recall',
  stem: 'Converting a message into words, symbols or gestures before sending it is called ___.',
  acc: [['encoding']],
  sol: 'The sender converts the idea into symbols; this step is called encoding.',
}));
Q('mt_barriers', match({
  t: 5, d: 2, c: 'application',
  stem: 'Match each communication problem at an imagined bus depot in Madurai with the type of barrier.',
  pairs: [
    ['A notice in English is badly translated into Tamil and confuses drivers', 'Semantic barrier'],
    ['A conductor ignores the depot manager\'s message because he distrusts him', 'Psychological barrier'],
    ['A rule says all requests must be sent in writing through three officers', 'Organisational barrier'],
    ['The depot manager fears that suggestions from staff will undermine his authority', 'Personal barrier'],
  ],
  sol: 'Faulty translation is semantic; distrust is psychological (emotional); rigid rules and levels are organisational; a superior\'s fear of losing authority is a personal barrier.',
}));
Q('s_formal_informal', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between formal and informal communication on any two bases.',
  model: '1. **Channel:** formal communication follows the **official chain of command**; informal communication moves through **social relationships** (grapevine).\n2. **Speed and reliability:** formal communication is **slower but reliable** and often recorded; informal communication is **fast but may carry rumours**.',
  sol: 'Two bases, with both sides stated on each.',
  scheme: [['First basis, both sides', 1], ['Second basis, both sides', 1]],
}));
Q('s_semantic_case', short({
  t: 5, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'The chief engineer of an imagined water-pump factory in Rajkot tells assembly workers to "maintain a tolerance of plus or minus 0.02 mm on the impeller bore". The workers keep making mistakes. Identify the barrier and suggest one way to overcome it.',
  model: '**Barrier:** a **semantic barrier**, because technical terms such as "tolerance" and "impeller bore" are not understood by the workers.\n**Remedy:** use **simple language** the workers know and show the limit with a sample part or gauge, then ask questions to check understanding.',
  sol: 'Name the barrier with a reason, then give one practical remedy.',
  scheme: [['Semantic barrier with reason', 1], ['Suitable remedy', 1]],
}));
Q('s3_comm_improve', short({
  t: 5, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Suggest three measures a manager can take to improve communication in an organisation.',
  model: '1. **Clarify ideas first:** be clear about what is to be said before saying it.\n2. **Communicate to the receiver\'s needs:** use words and a medium the listener understands.\n3. **Ensure proper feedback:** ask questions and invite replies to confirm that the message was understood. (Also: consult others, be a good listener, follow up.)',
  sol: 'Any three measures, each with a short explanation.',
  scheme: [['First measure', 1], ['Second measure', 1], ['Third measure', 1]],
}));
Q('l_barriers', long({
  t: 5, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain the four categories of barriers to effective communication, giving one example of each from a workplace.',
  model: '1. **Semantic barriers:** problems of language and meaning, e.g. jargon, badly expressed messages or poor translation.\n2. **Psychological or emotional barriers:** the state of mind of sender or receiver, e.g. distrust, premature judgement or inattention.\n3. **Organisational barriers:** arising from the structure and rules, e.g. too many levels, rigid rules or status gaps.\n4. **Personal barriers:** attitudes of superiors and subordinates, e.g. fear of challenge to authority or lack of incentive to suggest.\n5. **Effect:** each distorts or blocks the message, so managers must identify and remove them.',
  sol: 'All four categories, each explained with a workplace example, and a concluding point.',
  scheme: [['Semantic with example', 1], ['Psychological with example', 1], ['Organisational with example', 1], ['Personal with example', 1], ['Effect or conclusion', 1]],
}));

// ================================================================ case-based
Q('cb_annapurna', caseQ({
  t: 1, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the account of Annapurna Bakers and answer the questions that follow. *(Imagined bakery chain in Pune, written by SOYL for practice.)*',
  passage: '**Annapurna Bakers, Pune (imagined)**\n\nAnnapurna Bakers opened three new outlets this year. The production manager, Neha, noticed that bakers were confused because both she and the outlet managers were telling them what to bake each morning. She fixed a rule that bakers would take orders only from her. She also introduced a bonus that grew with the company\'s monthly profit, so that bakers would gain when the chain did well. After launching a new sugar-free range, Neha visited each kitchen every day for a week to see whether the recipes were followed and to help with problems. She also spent time with the senior bakers who were popular among the staff, so that they would explain the changes to others in their own way.',
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Which principle of directing did Neha apply when she ruled that bakers would take orders only from her?', model: '**Unity of command**: each baker now gets instructions from one superior only.', sol: 'One superior per subordinate is unity of command.', scheme: [['Unity of command', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'Quote the line that shows the principle of follow through.', model: '"visited each kitchen every day for a week to see whether the recipes were followed and to help with problems".', sol: 'Checking implementation after giving instructions is follow through.', scheme: [['Correct line', 1]] })),
    child('c', short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify two other principles of directing followed by Neha, quoting the lines.', model: '1. **Harmony of objectives:** "a bonus that grew with the company\'s monthly profit, so that bakers would gain when the chain did well".\n2. **Use of informal organisation:** "spent time with the senior bakers who were popular among the staff, so that they would explain the changes".', sol: 'Two principles, each with a supporting line.', scheme: [['First principle with line', 1], ['Second principle with line', 1]] }), [
      short({ t: 1, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Explain two ways in which the confusion before Neha\'s rule would have harmed Annapurna Bakers.', model: '1. **Wasted effort:** with conflicting orders, bakers may bake the wrong items, causing waste of material and time.\n2. **Poor discipline and morale:** bakers cannot please both bosses, so they feel frustrated and responsibility becomes unclear.', sol: 'Two harmful effects of violating unity of command.', scheme: [['First effect', 1], ['Second effect', 1]] }),
    ]),
  ],
}));
Q('cb_rangrez', caseQ({
  t: 3, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the account of Rangrez Textiles and answer the questions that follow. *(Imagined weaving unit in Surat, written by SOYL for practice.)*',
  passage: '**Rangrez Textiles, Surat (imagined)**\n\nAfter a year of high staff turnover, the owner Farida Mistry met her workers. Many young weavers said their wages barely covered rent and food. Older weavers said they feared being dropped when orders fell and wanted some savings for old age. The two best designers said they no longer felt challenged and wanted to create a full collection of their own. Farida raised the basic wage, started a provident fund for all, and gave the designers charge of a new festive collection that would carry their names. She also began giving a share of every year\'s profit to all staff.',
  parts: [
    child('a', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Which need of Maslow\'s hierarchy were the young weavers trying to satisfy?', model: '**Physiological needs**: wages "barely covered rent and food".', sol: 'Food and shelter are physiological needs.', scheme: [['Physiological need', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Name the financial incentive shown by "a share of every year\'s profit to all staff".', model: '**Profit sharing**.', sol: 'Giving employees a share of profits is profit sharing.', scheme: [['Profit sharing', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify the needs of the older weavers and of the two designers, and state how Farida met each.', model: '1. **Older weavers: safety (security) need**; met by starting a **provident fund**, which gives savings for old age.\n2. **Designers: self-actualisation need**; met by giving them **charge of a new festive collection** that uses their full creative ability.', sol: 'Name each need and link it to Farida\'s action.', scheme: [['Older weavers: need and action', 1], ['Designers: need and action', 1]] }), [
      short({ t: 3, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Farida first raised the basic wage before offering the designers their collection. Is this order sensible according to Maslow? Give a reason.', model: 'Yes. According to Maslow, **lower needs must be met first**; most workers were still struggling for food and rent, so a higher wage addresses the most urgent need, while the designers, whose basic needs were met, could be motivated by **self-actualisation**.', sol: 'Judgement with a reason based on the hierarchy.', scheme: [['Judgement', 1], ['Reason from the hierarchy', 1]] }),
    ]),
  ],
}));
Q('cb_codenirmaan', caseQ({
  t: 4, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the account of Code Nirmaan and answer the questions that follow. *(Imagined software firm in Bengaluru, written by SOYL for practice.)*',
  passage: '**Code Nirmaan, Bengaluru (imagined)**\n\nCode Nirmaan has two team leads. Vikram leads the support team. He decides every shift roster and every reply format himself and does not allow agents to question him; agents follow his instructions but rarely suggest improvements. Ananya leads the product team of senior engineers. She sets the quarter\'s goal, lets the engineers choose their own tools and schedules, and offers help only when they ask. When a major client threatened to leave after a server failure, the chief executive, Mr Iyer, called both teams together, explained the problem, invited ideas and then chose a plan that combined the best suggestions.',
  parts: [
    child('a', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Identify Vikram\'s leadership style.', model: '**Autocratic leadership**: he decides everything himself and does not allow questions.', sol: 'All decisions with the leader and obedience expected: autocratic.', scheme: [['Autocratic', 1]] })),
    child('b', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Identify Ananya\'s leadership style, quoting the line.', model: '**Laissez-faire (free-rein):** "lets the engineers choose their own tools and schedules, and offers help only when they ask".', sol: 'Freedom to the group with support on request: laissez-faire.', scheme: [['Laissez-faire with line', 1]] })),
    child('c', short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Which style did Mr Iyer use during the crisis? Give one advantage of this style for Code Nirmaan.', model: '**Democratic (participative)**: he "invited ideas and then chose a plan that combined the best suggestions". **Advantage:** pooling the ideas of both teams produces a better solution and the staff are committed to carrying it out.', sol: 'Name the style with evidence and give one advantage.', scheme: [['Democratic with evidence', 1], ['One advantage', 1]] }), [
      short({ t: 4, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): Agents in Vikram\'s team "rarely suggest improvements". Explain one drawback of his style and suggest how he could change it.', model: '**Drawback:** autocratic leadership shuts out the knowledge of agents who deal with customers, so useful ideas are lost and morale falls. **Change:** he could **consult agents** on rosters and reply formats, moving towards a democratic style while keeping final responsibility.', sol: 'One drawback linked to the case and one practical change.', scheme: [['Drawback', 1], ['Suggested change', 1]] }),
    ]),
  ],
}));
Q('cb_tezdepot', caseQ({
  t: 5, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the account of the Tez Logistics depot and answer the questions that follow. *(Imagined transport company in Lucknow, written by SOYL for practice.)*',
  passage: '**Tez Logistics depot, Lucknow (imagined)**\n\nThe depot manager, Mr Saxena, sent a circular in English full of terms like "SKU reconciliation" and "dock-to-stock time" to loaders who mostly read Hindi. Few understood it. When a driver, Ramesh, suggested a quicker loading order, Mr Saxena brushed it aside, worried that accepting ideas from below would make him look weak. Meanwhile, a rumour that the depot would be shifted to Kanpur spread over tea within a day, and three loaders started looking for other jobs. Every request for leave had to pass through four officers, so approvals took two weeks.',
  parts: [
    child('a', short({ t: 5, d: 2, c: 'application', marks: 1, stem: 'Identify the barrier shown by the circular to the loaders.', model: '**Semantic barrier**: technical English terms the loaders did not understand.', sol: 'Language and jargon problems are semantic barriers.', scheme: [['Semantic barrier', 1]] })),
    child('b', short({ t: 5, d: 2, c: 'application', marks: 1, stem: 'Which type of barrier is shown by "Every request for leave had to pass through four officers"?', model: '**Organisational barrier**: too many levels and rigid rules slow down communication.', sol: 'Structural levels and rules are organisational barriers.', scheme: [['Organisational barrier', 1]] })),
    child('c', short({ t: 5, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify the barrier in Mr Saxena\'s reaction to Ramesh and suggest one measure to overcome it.', model: '**Personal barrier**: fear that his **authority** would be challenged ("worried that accepting ideas from below would make him look weak"). **Measure:** encourage and reward suggestions from staff, and **be a good listener**, so that useful ideas reach him.', sol: 'Name the barrier with the line and give one suitable measure.', scheme: [['Personal barrier with evidence', 1], ['Suitable measure', 1]] }), [
      short({ t: 5, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): How should Mr Saxena deal with the rumour about the depot shifting?', model: 'He should give **correct information quickly** through formal channels, such as a meeting with all loaders, and also use **trusted informal leaders** to spread the facts, so that the grapevine carries the truth and staff stop leaving.', sol: 'A response that uses formal and informal channels to correct the rumour.', scheme: [['Quick formal clarification', 1], ['Use of informal channels', 1]] }),
    ]),
  ],
}));
Q('cb_gangafoot', caseQ({
  t: [2, 3], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the account of Ganga Footwear and answer the questions that follow. *(Imagined shoe factory in Agra, written by SOYL for practice.)*',
  passage: '**Ganga Footwear, Agra (imagined)**\n\nMeena Kushwaha is the supervisor of the stitching section. Each morning she explains the day\'s targets to her twenty workers and shows new joiners how to stitch a firm heel. When two senior workers stopped speaking to each other over a seating dispute, she sat them down and settled the matter. Meena also told the factory manager that the section\'s old lamps made fine work difficult. Last month the factory started publishing a "Stitcher of the Month" photo on the canteen board, and promised that workers who learned a second skill would be promoted to quality checkers.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Quote the line that shows Meena acting as a guide and trainer.', model: '"shows new joiners how to stitch a firm heel".', sol: 'On-the-job teaching is guidance and training.', scheme: [['Correct line', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which role of a supervisor is shown when Meena tells the manager about the old lamps?', model: 'Acting as a **link between workers and management**, passing the workers\' problems upward (feedback).', sol: 'Carrying shop-floor problems to management is the linking role.', scheme: [['Link or feedback role', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify the two non-financial incentives introduced by the factory, quoting the lines.', model: '1. **Employee recognition:** "publishing a Stitcher of the Month photo on the canteen board".\n2. **Career advancement opportunity:** "workers who learned a second skill would be promoted to quality checkers".', sol: 'Two non-financial incentives with supporting lines.', scheme: [['Recognition with line', 1], ['Career advancement with line', 1]] }), [
      short({ t: 2, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Explain how Meena\'s handling of the seating dispute helps the factory.', model: 'By settling the quarrel early she **maintains group harmony**: the section works as a team, output does not suffer, and the dispute does not grow into a wider conflict that management must handle.', sol: 'Link the action to group unity and its effect on work.', scheme: [['Group harmony', 1], ['Effect on work or the factory', 1]] }),
    ]),
  ],
}));
