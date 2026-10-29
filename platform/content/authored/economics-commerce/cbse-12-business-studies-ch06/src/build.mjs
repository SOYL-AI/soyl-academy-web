// Build CBSE 12 Business Studies ch06 Staffing. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-12-business-studies-ch06/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-business-studies-ch06', 'economics-commerce');
const { MPD, MP1, MP2 } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG figures
/** The eight steps of the staffing process as a snake of boxes (row 1 left to right, row 2 right to left). */
const vProcessSvg = (() => {
  const steps = [
    ['1. Estimating', 'manpower needs'],
    ['2. Recruitment', ''],
    ['3. Selection', ''],
    ['4. Placement and', 'orientation'],
    ['5. Training and', 'development'],
    ['6. Performance', 'appraisal'],
    ['7. Promotion and', 'career planning'],
    ['8. Compensation', ''],
  ];
  const s = new Svg(760, 250);
  const W = 150, H = 62, gap = 40, x0 = 15, rows = [30, 160];
  const pos = steps.map((_, i) => (i < 4 ? [x0 + i * (W + gap), rows[0]] : [x0 + (7 - i) * (W + gap), rows[1]]));
  steps.forEach(([a, b], i) => {
    const [x, y] = pos[i];
    s.rect(x, y, W, H, { color: i === 0 ? 'accent' : undefined, fill: 'fill', sw: 1.8 });
    if (b) { s.text(x + W / 2, y + 22, a, { size: 13, bold: i === 0 }); s.text(x + W / 2, y + 42, b, { size: 13 }); }
    else s.text(x + W / 2, y + H / 2, a, { size: 13 });
  });
  for (let i = 0; i < 3; i++) s.arrow(pos[i][0] + W + 4, rows[0] + H / 2, pos[i + 1][0] - 4, rows[0] + H / 2, { sw: 1.6 });
  s.arrow(pos[3][0] + W / 2, rows[0] + H + 4, pos[4][0] + W / 2, rows[1] - 4, { sw: 1.6 });
  for (let i = 4; i < 7; i++) s.arrow(pos[i][0] - 4, rows[1] + H / 2, pos[i + 1][0] + W + 4, rows[1] + H / 2, { sw: 1.6 });
  return s.visual(
    'Staffing process in eight steps: estimating manpower requirements, recruitment, selection, placement and orientation, training and development, performance appraisal, promotion and career planning, and compensation',
    'The staffing process: it starts with estimating manpower needs.',
  );
})();

/** Workload vs workforce for the imagined bakery of worked example 1. */
const vManpowerSvg = (() => {
  const s = new Svg(560, 290);
  const c = s.chart({ x1: 4, y1: 24, left: 70, top: 30, width: 430, height: 200, xLabel: 'Analysis', yLabel: 'Bakers' });
  const bar = (x, h, color, label) => {
    s.rect(c.X(x - 0.45), c.Y(h), c.X(x + 0.45) - c.X(x - 0.45), c.Y(0) - c.Y(h), { rx: 2, fill: color, color, sw: 1 });
    s.text(c.X(x), c.Y(h) - 12, label, { size: 13, bold: true });
  };
  bar(1, MPD.needed, 'accent', `${MPD.needed} needed`);
  bar(2, MPD.present - MPD.leaving, 'muted', `${MPD.present - MPD.leaving} available`);
  bar(3, MPD.gap, 'green', `${MPD.gap} to recruit`);
  c.xTick(1, 'Workload').xTick(2, 'Workforce').xTick(3, 'Shortage');
  [0, 5, 10, 15, 20].forEach((v) => c.yTick(v, String(v)));
  return s.visual(
    `Bar chart for an imagined bakery: workload analysis shows ${MPD.needed} bakers needed, workforce analysis shows ${MPD.present - MPD.leaving} available after one leaves, so ${MPD.gap} must be recruited`,
    'Imagined bakery: needed minus available gives the number to recruit.',
  );
})();

// ---------------------------------------------------------------- tables and flows
const vRoute1 = flow('LR', ['What staffing is', 'Why it matters', 'Staffing and HRM', 'The staffing process', 'Recruitment: internal and external'], 'Route map of Part 1: what staffing is, why it matters, staffing and human resource management, the staffing process, and recruitment from internal and external sources', 'Part 1 at a glance');
const vFunctions = table(
  ['Function', 'Its question'],
  [['Planning', 'What to do and how?'], ['Organising', 'Which jobs and departments?'], ['**Staffing**', '**Who will do each job?**'], ['Directing', 'How to guide and motivate them?'], ['Controlling', 'Is work going to plan?']],
  'Table placing staffing among the functions of management: planning asks what to do, organising creates jobs, staffing asks who will do each job, directing guides people and controlling checks progress',
  'Organising creates posts; staffing fills them.',
);
const vImportance = table(
  ['Benefit of good staffing', 'What it means in practice'],
  [
    ['Competent people', 'Capable candidates are found for every post'],
    ['Right person, right job', 'Ability matches the job, so output rises'],
    ['Continuity and growth', 'Successors are ready when seniors leave'],
    ['Optimum use of people', 'Neither idle workers nor endless overtime'],
    ['Morale', 'Fair hiring, training and pay keep people satisfied'],
  ],
  'Table of five benefits of good staffing: competent people, the right person on the right job, continuity through successors, optimum use of people, and better morale',
);
const vEvolution = flow('LR', ['Labour welfare officer (looks after workers)', 'Personnel management (records, wages, rules)', 'Human resource management (people as a resource to develop)'], 'Flow of how managing people at work has widened: from a labour welfare officer, to personnel management, to human resource management', 'Managing people: a widening role');
const vHrm = table(
  ['Specialised HRM activity', 'Example'],
  [
    ['Recruitment and job analysis', 'Studying what a lab-technician job needs and finding applicants'],
    ['Compensation and incentive plans', 'Designing pay scales and bonuses'],
    ['Training and development', 'Running a safety course for new workers'],
    ['Employee relations', 'Meeting the union; handling grievances'],
    ['Welfare and social security', 'Health cover, canteen, provident fund'],
    ['Legal matters', 'Defending the firm in labour cases'],
  ],
  'Table of specialised human resource activities with examples: recruitment and job analysis, compensation plans, training, employee and union relations, welfare and social security, and legal matters',
);
const vWorkload = table(
  ['', 'Workload analysis', 'Workforce analysis'],
  [['Question', 'How many people, and of what kind, are **needed**?', 'How many people, and of what kind, are **available**?'], ['Based on', 'Planned output and work methods', 'Present staff, skills, retirements, resignations'], ['Result', 'Required staff', 'Existing staff']],
  'Table comparing workload analysis, which finds the people needed from planned output, with workforce analysis, which finds the people available from present staff; comparing them gives the shortage or surplus',
  'Needed minus available = shortage (recruit) or surplus (redeploy).',
);
const vLaterSteps = table(
  ['Step', 'What happens'],
  [
    ['Placement and orientation', 'Newcomer takes up the post and is introduced to people, place and rules'],
    ['Training and development', 'Skills for the present job; growth for future roles'],
    ['Performance appraisal', 'Actual performance compared with standards; feedback given'],
    ['Promotion and career planning', 'Higher posts for deserving staff; a path for growth'],
    ['Compensation', 'Direct pay (salary, incentives) and indirect benefits (insurance, paid leave)'],
  ],
  'Table of the later staffing steps: placement and orientation, training and development, performance appraisal, promotion and career planning, and compensation in direct and indirect forms',
);
const vRecruit = flow('LR', ['Vacancy identified', 'Sources searched (internal or external)', 'Job seekers encouraged to apply', 'Pool of applicants for selection'], 'Flow of recruitment: a vacancy is identified, sources are searched, job seekers are encouraged to apply, and a pool of applicants is formed for selection', 'Recruitment builds the pool');
const vInternal = table(
  ['', 'Transfer', 'Promotion'],
  [['Movement', 'Sideways: another job, department or place', 'Upwards: a higher post'], ['Pay and status', 'No substantial change', 'More pay, responsibility and status'], ['Main use', 'Fill a gap, reduce surplus elsewhere, broaden experience', 'Reward and motivate; fill senior posts']],
  'Table comparing transfer, a sideways move with no substantial change in pay, and promotion, an upward move to a higher post with more pay and status',
);
const vIntMerits = table(
  ['Internal sources: merits', 'Internal sources: limitations'],
  [['Motivate employees', 'No fresh talent or new ideas'], ['Candidates already known, so selection is simpler', 'Staff may become complacent'], ['Transfers can adjust surplus and shortage', 'A new firm cannot use them'], ['Cheaper than outside hiring', 'Frequent transfers can lower productivity']],
  'Table of merits of internal sources (motivation, known candidates, adjusting staff, low cost) and limitations (no fresh talent, complacency, unusable by a new firm, disruption from frequent transfers)',
);
const vExternal = table(
  ['External source', 'How it works', 'Usually suits'],
  [
    ['Direct recruitment', 'Notice at the premises; walk-in hiring', 'Unskilled, casual jobs'],
    ['Casual callers', 'Unsolicited applications kept on file', 'Any job, when a vacancy arises'],
    ['Advertisement', 'Newspapers, journals, online job boards', 'Middle and senior posts'],
    ['Employment exchange', 'Government register of job seekers', 'Unskilled and skilled operative jobs'],
    ['Placement agencies, consultants', 'Search and screen for a fee', 'Technical, professional, top posts'],
    ['Campus recruitment', 'Firms visit colleges and institutes', 'Fresh graduates and diploma holders'],
    ['Recommendations of employees', 'Staff suggest friends or relatives', 'Many jobs; candidates are vouched for'],
    ['Labour contractors', 'Contractors supply workers', 'Unskilled workers needed quickly'],
    ['Web publishing', 'Firm\'s website and job portals', 'Wide range of posts'],
  ],
  'Table of nine external sources of recruitment with how each works and the jobs it suits, from direct recruitment and casual callers to placement agencies, campus recruitment, labour contractors and web publishing',
);
const vMatchJobs = table(
  ['Vacancy at an imagined Pune hospital', 'Best source', 'Why'],
  [
    ['20 ward helpers, needed this week', 'Labour contractor or direct recruitment', 'Unskilled, urgent'],
    ['10 fresh nurses', 'Campus recruitment', 'Final-year students, tested on campus'],
    ['A chief cardiologist', 'Placement consultant', 'Rare skill, top post'],
    ['A head of the billing unit', 'Promotion', 'A capable senior clerk is already there'],
  ],
  'Worked example table matching four imagined hospital vacancies to sources: ward helpers through a contractor or direct recruitment, nurses through campus recruitment, a cardiologist through a placement consultant, and a billing head by promotion',
  'Match the source to the level, skill and urgency of the job.',
);
const vExtMerits = table(
  ['External sources: merits', 'External sources: limitations'],
  [['Qualified people', 'Existing staff may feel ignored'], ['Wider choice', 'Lengthy process'], ['Fresh talent and ideas', 'Costly (advertising, fees, tests)'], ['Competition keeps insiders alert', 'Response may be uncertain']],
  'Table of merits of external sources (qualified people, wider choice, fresh talent, competition) and limitations (staff dissatisfaction, a lengthy process, cost, uncertain response)',
);
const vSummary1 = flow('TB', ['Staffing fills posts with suitable people', 'Part of HRM; every manager\'s job', 'Process: estimate needs → recruit → select → place → train → appraise → promote → pay', 'Recruitment: internal (transfer, promotion) or external (nine sources)'], 'Summary flow of Part 1: staffing fills posts; it is part of human resource management and every manager\'s job; the eight-step process; and internal and external recruitment', 'Part 1 in four lines');

const vRoute2 = flow('LR', ['Selection: meaning', 'Selection tests', 'Steps after the interview', 'Training, development, education', 'On-the-job and off-the-job methods'], 'Route map of Part 2: meaning of selection, selection tests, the later steps of selection, training versus development, and training methods', 'Part 2 at a glance');
const vRecSel = table(
  ['', 'Recruitment', 'Selection'],
  [['Aim', 'Attract many suitable applicants', 'Choose the best among them'], ['Nature', 'Positive: invites people to apply', 'Negative: rejects at each step'], ['Order', 'Comes first', 'Follows recruitment']],
  'Table comparing recruitment, a positive process that attracts applicants and comes first, with selection, a negative process that rejects applicants until the best remain',
);
const vSelFlow = flow('TB', ['Preliminary screening', 'Selection tests', 'Employment interview', 'Reference and background checks', 'Selection decision', 'Medical examination', 'Job offer', 'Contract of employment'], 'Flow of the eight steps of selection: preliminary screening, selection tests, employment interview, reference and background checks, selection decision, medical examination, job offer, and contract of employment', 'Selection, step by step');
const vTests = table(
  ['Test', 'Measures', 'Example question or task'],
  [
    ['Intelligence', 'General mental ability (IQ)', 'Number series and reasoning puzzles'],
    ['Aptitude', 'Potential to learn new skills', 'Judging distances, hand–eye coordination'],
    ['Personality', 'Emotions, maturity, values', 'How would you handle an angry customer?'],
    ['Trade', 'Existing skill and knowledge', 'Wire a switchboard; type a letter'],
    ['Interest', 'Likes and dislikes about work', 'Would you rather fix machines or meet clients?'],
  ],
  'Table of five selection tests: intelligence measures general mental ability, aptitude measures potential to learn, personality measures emotions and values, trade measures existing skill, and interest measures likes and dislikes about work',
);
const vChooseTest = table(
  ['Imagined vacancy', 'Clue', 'Test'],
  [['Trainee crane operator (no experience)', 'Can he learn?', 'Aptitude'], ['Experienced typist', 'How good is she now?', 'Trade'], ['Customer-care executive', 'How does he handle stress?', 'Personality'], ['Management trainee', 'General reasoning', 'Intelligence']],
  'Worked example table choosing a test for four imagined vacancies: aptitude for a trainee crane operator, trade for an experienced typist, personality for a customer-care executive and intelligence for a management trainee',
  'Potential to learn → aptitude; present skill → trade.',
);
const vAfter = table(
  ['Step', 'Purpose'],
  [
    ['Employment interview', 'In-depth conversation: judge suitability, share information'],
    ['Reference and background checks', 'Verify record and character with referees and past employers'],
    ['Selection decision', 'Final choice, usually by the manager concerned'],
    ['Medical examination', 'Physical fitness for the job'],
    ['Job offer', 'Appointment letter with joining date'],
    ['Contract of employment', 'Signed terms: duties, pay, hours, leave, termination'],
  ],
  'Table of the later steps of selection and their purpose: interview, reference checks, selection decision, medical examination, job offer, and contract of employment',
);
const vCaseRead = table(
  ['Line from an imagined case (Pragati Textiles)', 'Step of selection'],
  [
    ['"Applicants without a textile diploma were set aside."', 'Preliminary screening'],
    ['"They were asked to set up a loom and correct a fault."', 'Selection test (trade test)'],
    ['"The mill rang the candidate\'s last employer."', 'Reference and background check'],
    ['"The mill doctor declared her fit."', 'Medical examination'],
  ],
  'Worked example table linking four lines from an imagined case to steps of selection: setting aside applicants without a diploma is screening, a loom task is a trade test, ringing a past employer is a reference check, and the doctor\'s check is the medical examination',
  'Quote the line, then name the step: both earn marks.',
);
const vTde = table(
  ['', 'Training', 'Development', 'Education'],
  [['Aim', 'Skill for a particular job', 'Overall growth of the person', 'General knowledge and understanding'], ['Scope', 'Narrow, job-oriented', 'Wide, career-oriented', 'Widest'], ['Example', 'Learning a new billing machine', 'A leadership programme', 'A degree course']],
  'Table comparing training (skill for a particular job), development (overall growth, career-oriented) and education (general knowledge and understanding), with an example of each',
);
const vBenefits = table(
  ['Benefits to the organisation', 'Benefits to the employee'],
  [['Less wastage of time and materials', 'Better career prospects'], ['Higher productivity and profit', 'Higher earnings'], ['Ready supply of future managers', 'Fewer accidents on machines'], ['Lower absenteeism and turnover', 'More confidence and job satisfaction'], ['Quicker response to change', '']],
  'Table of benefits of training: to the organisation (less wastage, higher productivity, future managers, lower absenteeism and turnover, quicker response to change) and to the employee (career, earnings, safety, satisfaction)',
);
const vMethodsFlow = flow('TB', ['Training methods', 'On the job: apprenticeship, coaching, internship, job rotation', 'Off the job: lectures, films, case study, computer modelling, vestibule, programmed instruction'], 'Flow dividing training methods into on-the-job methods (apprenticeship, coaching, internship, job rotation) and off-the-job methods (lectures, films, case study, computer modelling, vestibule training, programmed instruction)', 'Two families of methods', [{ from: 'n1', to: 'n2' }, { from: 'n1', to: 'n3' }]);
const vOnJob = table(
  ['On-the-job method', 'How it works'],
  [['Apprenticeship', 'Learner works for a long period under a master worker (electricians, plumbers)'], ['Coaching', 'A superior guides the trainee and reviews the work'], ['Internship', 'Joint programme: college theory plus practical work in a firm'], ['Job rotation', 'Trainee moves between departments to gain wide experience']],
  'Table of on-the-job training methods: apprenticeship under a master worker, coaching by a superior, internship combining college and work, and job rotation between departments',
);
const vOffJob = table(
  ['Off-the-job method', 'How it works'],
  [['Classroom lectures and conferences', 'Experts explain concepts to a group'], ['Films', 'Show what should be done and how'], ['Case study', 'Trainees analyse real-life situations and suggest solutions'], ['Computer modelling', 'Software simulates the work situation'], ['Vestibule training', 'Practice on similar equipment in a separate area'], ['Programmed instruction', 'Material in small units, in a logical order, learnt step by step']],
  'Table of off-the-job training methods: classroom lectures, films, case studies, computer modelling, vestibule training and programmed instruction, with how each works',
);
const vChooseMethod = table(
  ['Imagined trainee group', 'Method', 'Reason'],
  [['New operators of a costly CNC machine', 'Vestibule training', 'Mistakes must not damage the real machine'], ['Plumbing learners', 'Apprenticeship', 'A trade learnt over time from a master'], ['Graduate trainees for management', 'Job rotation', 'Need a view of every department'], ['Bank staff learning new loan rules', 'Classroom lectures or programmed instruction', 'Concepts for a group']],
  'Worked example table choosing training methods: vestibule training for costly machine operators, apprenticeship for plumbing learners, job rotation for management trainees, and lectures or programmed instruction for bank staff learning rules',
  'Match the method to the risk, skill and group size.',
);
const vSummary2 = flow('TB', ['Selection chooses the best: screening → tests → interview → checks → decision → medical → offer → contract', 'Five tests: intelligence, aptitude, personality, trade, interest', 'Training (job skill) vs development (overall growth)', 'Methods: on the job and off the job'], 'Summary flow of Part 2: the eight steps of selection, five selection tests, training versus development, and on-the-job and off-the-job methods', 'Part 2 in four lines');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Staffing — Part 1: Meaning, Process and Recruitment',
  goals: [
    'Explain the meaning and importance of staffing and its place in human resource management',
    'Describe the steps of the staffing process, including workload and workforce analysis',
    'Compare internal and external sources of recruitment and choose a suitable source for a job',
  ],
  slides: [
    sl('title', 'Staffing', {
      b: 'Part 1 — what staffing is, why it matters, the **staffing process** and **recruitment**.',
      v: vRoute1,
      n: 'Every organisation, from a corner bakery to a large hospital, depends on people. Machines and money are useless without the right people to use them. In this chapter we study staffing, the function of management that finds, chooses, trains and keeps the right people. Part 1 covers what staffing is, why it matters, its eight steps, and where firms look for new employees.',
    }),
    sl('concept', 'What is staffing?', {
      b: '**Staffing** means filling, and keeping filled, the positions in the organisation structure with **suitable people**.',
      bl: ['Organising creates posts; staffing puts people into them.', 'It is a continuous function: people retire, resign and are promoted.', 'It is performed by **every manager**, not only by a human resource department.'],
      v: vFunctions,
      n: 'Organising divides work into jobs and posts. Staffing answers the next question: who will do each job? Because people keep retiring, resigning and moving up, staffing never stops. And it is not only the job of a human resource department; every manager chooses, trains and appraises the people working under him or her.',
    }),
    sl('diagram', 'Why staffing matters', {
      v: vImportance,
      n: 'Good staffing brings five benefits. It finds competent people. It puts the right person on the right job, so performance improves. It prepares successors, so the business keeps running when senior people leave. It avoids both idle workers and endless overtime. And fair hiring, training and pay keep people satisfied, which lowers absenteeism and turnover.',
    }),
    sl('check', 'Quick check: the meaning of staffing', {
      b: 'Which description fits staffing as a function of management?',
      chk: 'm_meaning',
      n: 'Think about which function deals with people for the posts that already exist. Rule out dividing work, guiding people, and checking performance.',
    }),
    sl('concept', 'Staffing and human resource management', {
      b: 'Managing people at work has widened over time. Staffing is a **part** of human resource management (HRM).',
      v: vEvolution,
      n: 'In early factories, a labour welfare officer looked after workers. Later, personnel departments kept records, paid wages and enforced rules. Today firms speak of human resource management, which treats people as a resource to be developed. Staffing, that is recruiting, selecting, training and paying people, sits at the heart of human resource management.',
    }),
    sl('concept', 'Specialised activities of HRM', {
      v: vHrm,
      n: 'In a large firm, a human resource department handles specialised work: studying jobs and finding applicants, designing pay and incentives, running training, meeting unions and handling grievances, providing welfare such as health cover and provident fund, and defending the firm in labour cases. Notice that pricing or advertising products is not on this list; those belong to marketing.',
    }),
    sl('diagram', 'The staffing process', {
      v: vProcessSvg,
      n: 'Staffing follows eight steps. First estimate how many people are needed. Then recruit, which means attracting applicants, and select the best. Place them in their jobs and introduce them to the organisation. Train and develop them. Appraise their performance, promote deserving people and plan their careers, and finally decide their compensation. Learn this order; it is often asked.',
    }),
    sl('concept', 'Step 1: estimating manpower requirements', {
      b: 'Two analyses are compared:',
      v: vWorkload,
      n: 'The first step needs two studies. Workload analysis asks how many people, and of what kind, are needed for the planned work. Workforce analysis asks how many people, and of what kind, the firm already has, allowing for retirements and resignations. Subtract available from needed. A positive gap means recruit; a negative gap means a surplus to transfer or retrain.',
    }),
    sl('example', 'Worked example 1: how many to recruit?', {
      b: `An imagined bakery must bake ${MPD.output.toLocaleString('en-IN')} loaves a day; one baker bakes ${MPD.perWorker}. It has ${MPD.present} bakers, and ${MPD.leaving} will retire.`,
      bl: [
        `Step 1 — Workload: ${MPD.output.toLocaleString('en-IN')} ÷ ${MPD.perWorker} = **${MPD.needed} bakers needed**.`,
        `Step 2 — Workforce: ${MPD.present} − ${MPD.leaving} = **${MPD.present - MPD.leaving} available**.`,
        `Step 3 — Shortage: ${MPD.needed} − ${MPD.present - MPD.leaving} = **${MPD.gap} to recruit**.`,
      ],
      v: vManpowerSvg,
      n: 'Let us estimate for an imagined bakery. It must bake seven thousand two hundred loaves a day, and one baker bakes three hundred and sixty. Dividing gives twenty bakers needed. It has sixteen bakers, but one will retire, so fifteen are available. Twenty minus fifteen gives five bakers to recruit. Always allow for people who are leaving.',
    }),
    sl('check', 'Quick check: the order of staffing', {
      b: 'Arrange five steps of the staffing process in order.',
      chk: 'ord_process',
      n: 'Start with knowing the need. Then think: attract applicants, choose, place, and finally train.',
    }),
    sl('concept', 'Steps 4 to 8', {
      v: vLaterSteps,
      n: 'After selection, the new employee is placed in the post and introduced to colleagues, the workplace and its rules; this is orientation. Training builds job skills, and development prepares the person for the future. Performance appraisal compares actual work with standards. Deserving people are promoted and their careers planned. Compensation covers direct pay such as salary and incentives, and indirect benefits such as insurance and paid leave.',
    }),
    sl('check', 'Quick check: workforce analysis', {
      b: 'Fill in the blank about the study of employees already available.',
      chk: 'fb_workforce',
      n: 'Is the manager looking at work to be done, or at the people already on the rolls?',
    }),
    sl('concept', 'Recruitment', {
      b: '**Recruitment** is searching for prospective employees and stimulating them to apply. It is a **positive** process: it widens the pool.',
      v: vRecruit,
      n: 'Recruitment is the search for prospective employees and the effort to make them apply. Its aim is a large pool of suitable applicants, which is why it is called a positive process. Firms can look inside the organisation, through transfers and promotions, or outside, through many external sources.',
    }),
    sl('diagram', 'Internal sources: transfer and promotion', {
      v: vInternal,
      n: 'There are two internal sources. A transfer moves an employee sideways, to another job, department or place, with no big change in pay or status. It fills gaps and reduces surpluses elsewhere. A promotion moves an employee up to a higher post with more pay, responsibility and status. It rewards good work and motivates others.',
    }),
    sl('two-column', 'Internal sources: merits and limitations', {
      cols: [
        '**Merits**\n- Employees are motivated\n- Candidates are known\n- Surplus and shortage adjusted\n- Cheaper',
        '**Limitations**\n- No fresh talent\n- Complacency\n- Not for a new firm\n- Frequent transfers disrupt work',
      ],
      v: vIntMerits,
      n: 'Internal sources motivate employees, make selection simpler because the firm knows its own people, adjust staff between units, and cost little. But they shut out new ideas, may make staff complacent if they expect promotion by seniority, cannot be used by a new firm that has no staff yet, and frequent transfers can lower productivity.',
    }),
    sl('diagram', 'External sources of recruitment', {
      v: vExternal,
      n: 'Firms have many external sources. A notice at the gate, called direct recruitment, suits casual and unskilled jobs. Casual callers leave applications on file. Advertisements reach a wide audience. Employment exchanges keep a government register of job seekers. Placement agencies and consultants find senior and technical people for a fee. Firms also visit campuses, accept employees\' recommendations, use labour contractors and publish vacancies on the web.',
    }),
    sl('example', 'Worked example 2: matching sources to jobs', {
      b: 'An imagined hospital in Pune has four vacancies. Choose a source for each.',
      bl: ['Step 1 — Ask: what level and skill does the job need?', 'Step 2 — Ask: how urgent is it?', 'Step 3 — Ask: is there a capable insider?', 'Step 4 — Name the source and give the reason.'],
      v: vMatchJobs,
      n: 'Here is how to choose. Twenty ward helpers needed this week are unskilled and urgent, so use a labour contractor or direct recruitment. Ten fresh nurses can come from campus recruitment. A chief cardiologist is rare and senior, so hire a placement consultant. For the head of billing, a capable senior clerk already exists, so promote from within.',
    }),
    sl('check', 'Quick check: name the source', {
      b: 'Job seekers leave applications at a hotel even without a vacancy. Which source is this?',
      chk: 'm_casual_callers',
      n: 'The applications were not invited for any particular vacancy. What do we call such applicants?',
    }),
    sl('two-column', 'External sources: merits and limitations', {
      cols: [
        '**Merits**\n- Qualified personnel\n- Wider choice\n- Fresh talent\n- Competitive spirit',
        '**Limitations**\n- Staff dissatisfaction\n- Lengthy\n- Costly\n- Uncertain response',
      ],
      v: vExtMerits,
      n: 'External sources bring qualified people, a wider choice and fresh ideas, and they keep insiders alert. But existing employees who hoped for promotion may feel let down. The process is lengthy and costly, with advertisements, fees and tests, and the response is not always good. Most firms therefore use a mix of internal and external sources.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. Staffing fills posts with suitable people and is every manager\'s job, as well as a part of human resource management. The process has eight steps, starting with workload and workforce analysis. Recruitment searches for applicants, inside the firm through transfers and promotions, or outside through nine sources, each with its merits and limits.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Workload = people **needed**; workforce = people **available**. Do not swap them.',
        'Transfer is **sideways**; promotion is **upwards** with more pay and status.',
        'In case questions, **quote the line** and then name the source or step.',
        'A new business **cannot** use internal sources.',
        '3-mark answers: three points with a line each (about 50–80 words); 5-mark answers: five points.',
      ],
      n: 'Some tips for the exam. Keep workload and workforce analysis apart: needed versus available. A transfer is a sideways move, a promotion an upward one. In case-based questions, first quote the exact line and then name the source or step; both earn marks. Remember that a brand-new business cannot recruit internally. Write one point per mark, each explained in a line.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Staffing — Part 2: Selection, Training and Development',
  goals: [
    'Explain the steps of the selection process and the purpose of each selection test',
    'Distinguish training, development and education, and state the benefits of training',
    'Choose suitable on-the-job and off-the-job training methods for given situations',
  ],
  slides: [
    sl('title', 'Selection, training and development', {
      b: 'Part 2 — how firms **choose** the best applicants and **develop** them.',
      v: vRoute2,
      n: 'Recruitment gave us a pool of applicants. Now the firm must choose the best of them and then help them grow. In Part 2 we study the steps of selection, the five selection tests, the difference between training and development, and the methods firms use to train people on the job and off the job.',
    }),
    sl('concept', 'What is selection?', {
      b: '**Selection** is identifying and choosing the best persons from among the prospective candidates for a job.',
      v: vRecSel,
      n: 'Selection means identifying and choosing the best candidates from the pool. Recruitment is called positive because it invites people to apply. Selection is called negative because, at every step, some applicants are rejected, until only the most suitable remain. Selection always follows recruitment.',
    }),
    sl('diagram', 'The selection process', {
      v: vSelFlow,
      n: 'Selection has eight steps. Preliminary screening removes clearly unsuitable applicants. Selection tests measure ability. An interview judges suitability in depth. References and background are checked. Then the selection decision is made. A medical examination follows, then the job offer, and finally both sides sign the contract of employment.',
    }),
    sl('concept', 'Screening and selection tests', {
      b: '**Preliminary screening** uses the application form to drop unqualified applicants. Then **tests** measure ability:',
      v: vTests,
      n: 'Screening uses the application form to drop those without the minimum qualification. Then come tests. An intelligence test measures general mental ability. An aptitude test measures the potential to learn new skills. A personality test looks at emotions, maturity and values. A trade test measures the skill a person already has. An interest test finds what kind of work the person likes.',
    }),
    sl('check', 'Quick check: which test?', {
      b: 'Trainee pilots are tested on how quickly they can learn new coordination skills. Which test is this?',
      chk: 'm_aptitude',
      n: 'The candidates have no flying skill yet. Is the test about present skill or about potential to learn?',
    }),
    sl('example', 'Worked example 1: choosing the right test', {
      b: 'Pick the most useful test for four imagined vacancies.',
      bl: ['Step 1 — Does the candidate already have the skill? If not, test **aptitude**.', 'Step 2 — If the skill is claimed, test it with a **trade** test.', 'Step 3 — If dealing with people and stress matters, use a **personality** test.', 'Step 4 — For general reasoning, use an **intelligence** test.'],
      v: vChooseTest,
      n: 'Let us choose tests. A trainee crane operator has no experience, so we ask whether he can learn: an aptitude test. An experienced typist claims a skill, so we check it with a trade test. A customer-care executive must stay calm with angry callers: a personality test. A management trainee needs sharp reasoning: an intelligence test.',
    }),
    sl('concept', 'From interview to contract', {
      v: vAfter,
      n: 'The interview is a detailed, two-way conversation: the firm judges the candidate and also gives information about the job. Reference checks verify the candidate\'s record and character. The manager concerned then makes the selection decision. A medical examination checks fitness. The job offer is an appointment letter with a joining date, and the signed contract sets out duties, pay, hours, leave and terms of termination.',
    }),
    sl('check', 'Quick check: order of selection', {
      b: 'Arrange six steps of selection in order.',
      chk: 'ord_selection',
      n: 'Begin with the step that uses the application form, and end with the step that checks physical fitness.',
    }),
    sl('example', 'Worked example 2: reading a case', {
      b: 'Identify the step of selection from lines in an imagined case about Pragati Textiles.',
      bl: ['Step 1 — Read each line slowly.', 'Step 2 — Look for the key action: setting aside, testing, phoning, examining.', 'Step 3 — Name the step and quote the line.'],
      v: vCaseRead,
      n: 'Board questions often give a short case and ask you to identify steps. Look for the key action in each line. Setting aside applicants without a diploma is preliminary screening. Asking them to set up a loom is a trade test. Ringing the last employer is a reference check. The doctor declaring her fit is the medical examination.',
    }),
    sl('concept', 'Training, development and education', {
      v: vTde,
      n: 'Training increases the knowledge and skill needed for a particular job, such as learning a new billing machine. Development is wider; it aims at the overall growth of the person and prepares them for future roles, such as a leadership programme. Education is the widest, building general knowledge and understanding, such as a degree course.',
    }),
    sl('concept', 'Why train? Benefits to both sides', {
      v: vBenefits,
      n: 'Training helps the organisation: systematic learning wastes less time and material, productivity and profit rise, future managers are ready, and absenteeism and turnover fall. It helps employees too: better careers, higher earnings, fewer accidents because they handle machines well, and more confidence and satisfaction at work.',
    }),
    sl('diagram', 'Two families of training methods', {
      v: vMethodsFlow,
      n: 'Training methods fall into two families. On-the-job methods train people while they do the real work. Off-the-job methods train them away from the work floor, in a classroom, a separate hall or on a computer. Each family has several methods, which we look at next.',
    }),
    sl('concept', 'On-the-job methods', {
      v: vOnJob,
      n: 'In an apprenticeship, a learner works for a long time under a master worker, as electricians and plumbers do. In coaching, a superior guides the trainee and reviews the work. An internship joins a college and a firm: theory in class, practice at work. In job rotation, the trainee moves from one department to another to gain a wide view.',
    }),
    sl('concept', 'Off-the-job methods', {
      v: vOffJob,
      n: 'Off the job, experts give classroom lectures, and films show the right way of working. In a case study, trainees analyse a real-life situation. Computer modelling simulates the work on a screen. In vestibule training, people practise on equipment like the real one, in a separate area. Programmed instruction breaks material into small units in a logical order.',
    }),
    sl('check', 'Quick check: name the method', {
      b: 'New operators practise on a copy of a filling machine in a separate hall. Which method is this?',
      chk: 'm_vestibule',
      n: 'The equipment is similar to the real one, but the place is separate from the production line.',
    }),
    sl('example', 'Worked example 3: choosing a training method', {
      b: 'Match a method to four imagined trainee groups.',
      bl: ['Step 1 — Is the equipment costly or risky? Prefer **vestibule** training.', 'Step 2 — Is it a trade learnt over time? **Apprenticeship**.', 'Step 3 — Do trainees need a wide view? **Job rotation**.', 'Step 4 — Are they learning rules or concepts as a group? **Lectures** or programmed instruction.'],
      v: vChooseMethod,
      n: 'Choose by the risk, the skill and the group. Operators of a costly machine should practise in a vestibule, so mistakes do not damage the real one. Plumbing learners suit an apprenticeship. Graduate management trainees need job rotation to see every department. Bank staff learning new loan rules can attend lectures or use programmed instruction.',
    }),
    sl('check', 'Quick check: on or off the job?', {
      b: 'Fill in the two blanks.',
      chk: 'fb_programmed',
      n: 'Ask where the learning happens: while doing the real job, or away from it.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. Selection chooses the best applicants in eight steps, from screening to the contract of employment. Five tests measure intelligence, aptitude, personality, trade skill and interest. Training builds job skills, development aims at overall growth. Training methods are either on the job, like coaching and job rotation, or off the job, like vestibule training and case studies.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: [
        'Aptitude = **potential** to learn; trade = **present** skill.',
        'Medical examination comes **after** the selection decision, not first.',
        'Vestibule training is **off** the job even though it uses real-like equipment.',
        'Training vs development: give **both sides** on each basis.',
        'In cases, **quote the line**, then name the step, test or method.',
      ],
      n: 'Final tips. An aptitude test is about potential; a trade test is about present skill. The medical examination comes after the selection decision. Vestibule training uses equipment like the real one but is an off-the-job method. When distinguishing training and development, state both sides on each basis. And in case questions, quote the line before naming the step, test or method.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Staffing — notes',
  sections: [
    {
      h: '1. Meaning and importance of staffing',
      t: 1,
      b: 'Staffing is the managerial function of **filling, and keeping filled, the posts** created by organising with suitable people. It is **continuous** (people retire, resign, move up) and is done by **every manager**.\n\n**Importance**\n1. Finds **competent personnel** for all jobs.\n2. Puts the **right person on the right job**, improving performance.\n3. Ensures **continuity and growth** through succession planning.\n4. Ensures **optimum use** of people, avoiding over-manning and under-manning.\n5. Raises **job satisfaction and morale** through fair hiring, training and pay.',
      terms: [
        ['Staffing', 'Filling and keeping filled the positions in the organisation structure with suitable people.'],
        ['Over-manning', 'More employees than the work needs, which raises costs.'],
        ['Under-manning', 'Fewer employees than the work needs, which causes delays and overtime.'],
      ],
      v: vImportance,
    },
    {
      h: '2. Staffing as a part of human resource management',
      t: 1,
      b: 'The management of people widened from a **labour welfare officer**, to **personnel management**, to **human resource management**, which treats people as a resource to develop. Staffing is a part of HRM.\n\n**Specialised HRM activities:** recruitment and job analysis; compensation and incentive plans; training and development; union–management relations and grievance handling; welfare and social security; defending the firm in labour cases.',
      terms: [['Human resource management', 'Managing people at work as a resource: hiring, developing, paying and retaining them.']],
      v: vEvolution,
      vs: [vHrm],
    },
    {
      h: '3. The staffing process',
      t: 2,
      b: '1. **Estimating manpower requirements:** workload analysis (needed) vs workforce analysis (available).\n2. **Recruitment**.\n3. **Selection**.\n4. **Placement and orientation:** taking up the post; introduction to people, place and rules.\n5. **Training and development**.\n6. **Performance appraisal:** actual performance against standards, with feedback.\n7. **Promotion and career planning**.\n8. **Compensation:** direct (wages, salary, incentives, commission, bonus) and indirect (insurance, paid leave, other benefits).\n\n**Calculation:** workers needed = planned work ÷ work per worker; to recruit = needed − (present − leaving).',
      terms: [
        ['Workload analysis', 'Estimating the number and types of employees needed for the planned work.'],
        ['Workforce analysis', 'Studying the number and types of employees already available.'],
        ['Orientation', 'Introducing a new employee to colleagues, superiors, the workplace and rules; also called induction.'],
      ],
      v: vProcessSvg,
      vs: [vWorkload, vLaterSteps],
    },
    {
      h: '4. Recruitment and its sources',
      t: 3,
      b: '**Recruitment:** searching for prospective employees and stimulating them to apply (a **positive** process).\n\n**Internal sources**\n- **Transfer:** sideways move, no substantial change in pay or status.\n- **Promotion:** upward move with more pay, responsibility and status.\n\nMerits: motivation, known candidates, adjusting staff, low cost. Limitations: no fresh talent, complacency, not usable by a new firm, disruption from frequent transfers.\n\n**External sources:** direct recruitment, casual callers, advertisement, employment exchange, placement agencies and management consultants, campus recruitment, recommendations of employees, labour contractors, web publishing.\n\nMerits: qualified people, wider choice, fresh talent, competition. Limitations: staff dissatisfaction, lengthy, costly, uncertain response.',
      terms: [
        ['Recruitment', 'The search for prospective employees and the effort to make them apply.'],
        ['Casual callers', 'Job seekers who apply without any advertised vacancy; their details are kept on file.'],
        ['Campus recruitment', 'Recruiting students by visiting colleges and institutes.'],
      ],
      v: vExternal,
      vs: [vInternal, vIntMerits, vExtMerits],
    },
    {
      h: '5. The selection process',
      t: 4,
      b: '**Selection:** identifying and choosing the best candidates from the pool (a **negative** process, since it rejects).\n\n1. **Preliminary screening** (application forms).\n2. **Selection tests:** intelligence (IQ), aptitude (potential to learn), personality (emotions, maturity, values), trade (existing skill), interest (likes and dislikes).\n3. **Employment interview:** in-depth, two-way conversation.\n4. **Reference and background checks**.\n5. **Selection decision** (by the manager concerned).\n6. **Medical examination**.\n7. **Job offer** (appointment letter).\n8. **Contract of employment** (job title, duties, pay, hours, leave, termination).',
      terms: [
        ['Selection', 'Choosing the most suitable candidates from among the applicants.'],
        ['Aptitude test', 'Measures a person\'s potential for learning new skills.'],
        ['Trade test', 'Measures the existing knowledge and proficiency of a person in a trade.'],
      ],
      v: vSelFlow,
      vs: [vTests, vAfter],
    },
    {
      h: '6. Training and development',
      t: 5,
      b: '**Training** builds skill for a particular job; **development** aims at the overall growth of the individual; **education** builds general knowledge and understanding.\n\n**Benefits to the organisation:** less wastage, higher productivity and profit, future managers, lower absenteeism and turnover, quicker response to change.\n**Benefits to employees:** better career, higher earnings, fewer accidents, more confidence and satisfaction.\n\n**On-the-job methods:** apprenticeship, coaching, internship, job rotation.\n**Off-the-job methods:** classroom lectures and conferences, films, case study, computer modelling, vestibule training, programmed instruction.',
      terms: [
        ['Vestibule training', 'Practice on equipment similar to the real one, set up in a separate area away from the work floor.'],
        ['Job rotation', 'Moving a trainee from one department to another to give wide experience.'],
        ['Programmed instruction', 'Learning material broken into small units arranged in a logical sequence.'],
      ],
      v: vTde,
      vs: [vBenefits, vOnJob, vOffJob],
    },
  ],
  tips: '**Common mistakes**\n- Swapping workload analysis (needed) and workforce analysis (available).\n- Calling a sideways move a promotion: a promotion means a **higher** post.\n- Putting the medical examination first: it comes **after** the selection decision.\n- Confusing aptitude (potential) with trade (present skill).\n- Calling vestibule training on-the-job: it is **off** the job.\n- Writing "training is development": training is job-specific, development is overall growth.\n\n**How marks are usually awarded**\n- 1 mark: one correct option or term.\n- 3 or 4 marks in cases: **quote the line** and name the step, source, test or method.\n- 3 marks: three points with a line each (about 50–80 words).\n- 5 marks: five points with headings (about 80–120 words).\n\n**SOYL cases** use imagined businesses; your board paper will have its own. Read every line before answering.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Staffing**', 'Filling and keeping filled the posts in the organisation structure with suitable people.', 'definition', 1],
  ['Who performs staffing?', '**Every manager**; large firms also have an HR department for specialised work.', 'concept', 1],
  ['Five benefits of staffing', 'Competent people; right person, right job; continuity and growth; optimum use; morale.', 'concept', 1],
  ['Over-manning vs under-manning', 'Too many people (idle, costly) vs too few (delays, overtime).', 'concept', 1],
  ['How managing people evolved', 'Labour welfare officer → personnel management → human resource management.', 'fact', 1],
  ['Three specialised HRM activities', 'Compensation plans; grievance handling and union relations; welfare and social security.', 'concept', 1],
  ['First step of staffing', '**Estimating manpower requirements**.', 'fact', 2],
  ['**Workload analysis**', 'Number and types of people **needed** for the planned work.', 'definition', 2],
  ['**Workforce analysis**', 'Number and types of people **available** now.', 'definition', 2],
  ['Workers to recruit', 'Needed − (present − those leaving).', 'formula', 2],
  ['Eight steps of staffing', 'Estimate needs, recruit, select, place and orient, train, appraise, promote and plan careers, compensate.', 'concept', 2],
  ['**Orientation**', 'Introducing a newcomer to colleagues, workplace and rules (induction).', 'definition', 2],
  ['Direct vs indirect compensation', 'Direct: salary, incentives, commission. Indirect: insurance, paid leave, benefits.', 'concept', 2],
  ['**Recruitment**', 'Searching for prospective employees and stimulating them to apply; a **positive** process.', 'definition', 3],
  ['**Transfer**', 'Sideways move to another job or place, no substantial change in pay or status.', 'definition', 3],
  ['**Promotion**', 'Move to a higher post with more pay, responsibility and status.', 'definition', 3],
  ['Why can a new firm not recruit internally?', 'It has no existing staff to transfer or promote.', 'exam-tip', 3],
  ['Source for unskilled workers needed quickly', '**Labour contractors** (or direct recruitment).', 'example', 3],
  ['Source for top technical posts', '**Placement agencies and management consultants**.', 'example', 3],
  ['**Casual callers**', 'Unsolicited applicants kept on file for future vacancies.', 'definition', 3],
  ['Two merits and two limits of external sources', 'Merits: wider choice, fresh talent. Limits: costly, staff may feel ignored.', 'concept', 3],
  ['**Selection**', 'Choosing the best candidates from the pool; a **negative** process.', 'definition', 4],
  ['Eight steps of selection', 'Screening, tests, interview, reference checks, decision, medical, job offer, contract.', 'concept', 4],
  ['**Aptitude test**', 'Potential to **learn** new skills.', 'definition', 4],
  ['**Trade test**', '**Existing** skill and knowledge in a trade.', 'definition', 4],
  ['Personality and interest tests', 'Personality: emotions, maturity, values. Interest: likes and dislikes about work.', 'concept', 4],
  ['Last step of selection', '**Contract of employment**.', 'fact', 4],
  ['**Training** vs **development**', 'Training: skill for a job. Development: overall growth, future roles.', 'concept', 5],
  ['Four on-the-job methods', 'Apprenticeship, coaching, internship, job rotation.', 'concept', 5],
  ['Six off-the-job methods', 'Lectures, films, case study, computer modelling, vestibule, programmed instruction.', 'concept', 5],
  ['**Vestibule training**', 'Practice on real-like equipment in a separate area; off the job.', 'definition', 5],
  ['Two benefits of training to employees', 'Better career and earnings; fewer accidents and more confidence.', 'concept', 5],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-default-chapter-test-short',
  title: 'Chapter test (short) — Staffing',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_overmanning', 'm_screening', 'm_rotation', 'ar_promotion_new'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_int_ext', 's_train_dev', 's3_sel_steps'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_process', 'l_methods'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the case and answer all parts. Part (c) has an internal choice.', items: ['cb_bakery'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-default-chapter-test-long',
  title: 'Chapter test (long) — Staffing',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_hrm_not', 'm_workforce', 'm_transfer', 'm_consultant', 'm_trade', 'm_reference', 'm_internship', 'm_emp_benefit', 'ar_every_manager', 'ar_vestibule'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_importance', 's_tests_two', { attempt: 1, keys: ['s_rec_positive', 's_on_off'] }, 's3_hrm_acts', { attempt: 1, keys: ['s3_ext_limits', 's3_org_benefits'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_tests', { attempt: 1, keys: ['l_internal', 'l_selection'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each case and answer all parts. Part (c) of each has an internal choice.', items: ['cb_selection', 'cb_hospital'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of cbse-12-business-studies-ch06 only (concept and importance, staffing and HRM; staffing process; recruitment; selection; training and development)',
    originality: 'every firm, person and case written for this chapter (imagined, labelled); no NCERT text, exercise or board/sample-paper item reused',
    data: `manpower figures computed and asserted by the build (bakery ${MPD.output} ÷ ${MPD.perWorker} = ${MPD.needed}, ${MPD.needed} − ${MPD.present - MPD.leaving} = ${MPD.gap}; pickle unit ${MP1.needed} − ${MP1.present} = ${MP1.gap}; call centre ${MP2.needed} − ${MP2.available} = ${MP2.gap}; Kaveri Mart 60 − 48 = 12)`,
    gate: 'npm test -w @soyl/content-templates, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
