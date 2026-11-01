// Build ISC 12 Commerce ch10 Staffing. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-commerce-ch10/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from './lib.mjs';

setUnit('isc-12-commerce-ch10', 'economics-commerce');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- visuals
const vRoute1 = flow('LR', ['What staffing is', 'Its steps', 'Why it matters', 'Recruitment and its sources'], 'Route map of Part 1: the meaning of staffing, its steps, its importance, and recruitment with internal and external sources', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Selection procedure', 'Recruitment vs selection', 'Training and development', 'Methods of training'], 'Route map of Part 2: the selection procedure, recruitment versus selection, training and development, and methods of training', 'Part 2 at a glance');

const vMeaning = table(
  ['Staffing means…', 'Imagined example: a scientific-instruments firm in Ambala'],
  [['Finding how many people are needed', 'Ten lab technicians for a new line'], ['Getting suitable people', 'Advertising, testing and interviewing'], ['Placing and training them', 'Each technician trained on the firm\'s gauges'], ['Keeping posts filled', 'Replacing those who retire or are promoted']],
  'Table of what staffing involves, with an imagined scientific-instruments firm\'s examples',
);
const vSteps = flow('LR', ['Estimate manpower needs', 'Recruitment', 'Selection', 'Placement and orientation', 'Training and development', 'Performance appraisal', 'Promotion and career planning', 'Compensation'], 'Flow of the eight steps of staffing: estimate manpower needs, recruitment, selection, placement and orientation, training and development, performance appraisal, promotion and career planning, and compensation', 'The staffing process.');
const vStepsEx = table(
  ['Imagined action at a yarn mill in Bhilwara', 'Step of staffing'],
  [
    ['Works out how many spinners the new machines need', 'Estimating manpower needs'],
    ['Advertises and invites spinners to apply', 'Recruitment'],
    ['Tests and interviews applicants, then chooses', 'Selection'],
    ['Shows newcomers the mill and the safety rules', 'Placement and orientation'],
    ['Rates each spinner\'s output twice a year', 'Performance appraisal'],
  ],
  'Worked table: five imagined actions at a yarn mill matched to the steps of staffing',
  'Ask: before hiring, during hiring, or after joining?',
);
const vImportance = table(
  ['Importance', 'In short'],
  [
    ['Obtains competent personnel', 'Finds capable people for each job'],
    ['Higher performance', 'Right person in the right job'],
    ['Survival and growth', 'Succession planning readies people for key posts'],
    ['Optimum use of people', 'Avoids both shortages and idle staff'],
    ['Job satisfaction and morale', 'Fair pay, training and promotion keep good people'],
  ],
  'Table of five points of importance of staffing with a short explanation of each',
);
const vInternal = table(
  ['Internal source', 'Meaning', 'Imagined example'],
  [['Promotion', 'Moving up to a higher post, pay and status', 'A senior tester becomes quality supervisor'], ['Transfer', 'Moving to another post or place at about the same level', 'A manager moves from one unit to another at the same pay']],
  'Table of the two internal sources of recruitment, promotion and transfer, with meanings and imagined examples',
);
const vExternal = table(
  ['External source', 'Suits'],
  [
    ['Direct recruitment (notice at the gate)', 'Unskilled and casual jobs'],
    ['Casual callers', 'Jobs filled from applications kept on file'],
    ['Advertisement', 'Senior and skilled posts needing wide choice'],
    ['Employment exchange', 'Clerical and skilled jobs'],
    ['Placement agencies and consultants', 'Senior or rare specialists'],
    ['Campus recruitment', 'Trainees for technical and managerial posts'],
    ['Recommendations of employees', 'Posts where trust matters'],
    ['Labour contractors', 'Unskilled workers, often short-term'],
    ['Web publishing', 'Many kinds of jobs, through job portals'],
  ],
  'Table of nine external sources of recruitment and the kind of post each suits',
);
const vIntExt = table(
  ['Basis', 'Internal sources', 'External sources'],
  [['Speed and cost', 'Quicker and cheaper', 'Slower and costlier'], ['Choice', 'Limited to existing staff', 'Wide choice'], ['Fresh talent', 'None', 'Brings new ideas and skills'], ['Effect on staff', 'Motivates through promotion', 'May disappoint those hoping for promotion']],
  'Table comparing internal and external sources of recruitment on speed and cost, choice, fresh talent and effect on staff',
);
const vSourcesEx = table(
  ['Post at an imagined port firm in Kakinada', 'Best source', 'Why'],
  [['Fifty loaders for one season', 'Labour contractors', 'Many unskilled workers, quickly'], ['General manager for a new terminal', 'Advertisement or placement agency', 'Wide search for rare experience'], ['Six trainee accountants', 'Campus recruitment', 'Trained graduates in one place'], ['A supervisor who knows the firm', 'Promotion', 'Known ability; motivates staff']],
  'Worked table matching four posts at an imagined port firm with the best source of recruitment and a reason',
  'Match the post\'s skill, number and urgency to the source.',
);
const vSummary1 = table(
  ['Idea', 'Key point'],
  [['Staffing', 'Filling and keeping filled the posts with suitable people'], ['Steps', 'Estimate, recruit, select, place, train, appraise, promote, compensate'], ['Importance', 'Competent people, performance, succession, optimum use, morale'], ['Recruitment', 'Internal: promotion, transfer. External: many sources']],
  'Summary table of Part 1: staffing, its steps, its importance and recruitment sources',
);
const vCaseSteps = flow('LR', ['Quote the line', 'Name the step, source or method', 'Explain the link'], 'Three steps for case questions: quote the line, name the step, source or method, and explain the link');

const vSelSteps = flow('LR', ['Preliminary screening', 'Selection tests', 'Employment interview', 'Reference and background checks', 'Selection decision', 'Medical examination', 'Job offer', 'Contract of employment'], 'Flow of the eight steps of selection: preliminary screening, selection tests, employment interview, reference and background checks, selection decision, medical examination, job offer and contract of employment', 'The selection procedure.');
const vTests = table(
  ['Test', 'What it measures', 'Imagined example'],
  [
    ['Intelligence test', 'Reasoning, memory, number skill', 'Written reasoning test for trainees'],
    ['Aptitude test', 'Potential to learn new skills', 'How fast school-leavers pick up machining'],
    ['Personality test', 'Emotions, maturity, values', 'Questions on handling pressure'],
    ['Trade test', 'Skill already possessed', 'Join two steel plates'],
    ['Interest test', 'Likes and preferences for kinds of work', 'Machines, people or numbers?'],
  ],
  'Table of five selection tests, what each measures and an imagined example',
);
const vSelEx = table(
  ['Imagined action: a school in Shimla hires a bus driver', 'Step of selection'],
  [
    ['Rejects applicants without a heavy-vehicle licence', 'Preliminary screening'],
    ['Asks shortlisted drivers to drive a set route', 'Selection test (trade test)'],
    ['Principal and transport head meet each driver', 'Employment interview'],
    ['Checks the best driver\'s record with past employers', 'Reference and background check'],
    ['Checks his eyesight before appointing him', 'Medical examination'],
  ],
  'Worked table: five imagined actions of a school hiring a bus driver matched to the steps of selection',
  'Follow the order: screen, test, interview, check, decide, medical, offer, contract.',
);
const vRecSel = table(
  ['Basis', 'Recruitment', 'Selection'],
  [['Purpose', 'Attract many suitable applicants', 'Choose the most suitable'], ['Nature', 'Positive: widens the pool', 'Negative: rejects many'], ['Order', 'Comes first', 'Comes after recruitment'], ['Process', 'Simple: notices, portals, visits', 'Longer: tests, interviews, checks']],
  'Table comparing recruitment and selection on purpose, nature, order and process',
);
const vTrainDev = table(
  ['Basis', 'Training', 'Development'],
  [['Aim', 'Skills for a specific job', 'Overall growth of the person'], ['Focus', 'Present job', 'Future roles'], ['Who', 'Mainly operative staff', 'Mainly managers'], ['Nature', 'Job-oriented', 'Career-oriented']],
  'Table comparing training and development on aim, focus, who it is mainly for, and nature',
);
const vTypes = table(
  ['Type of training', 'Meaning'],
  [['Induction training', 'Introducing a new employee to the firm, people and rules'], ['Job instruction training', 'Step-by-step teaching of how to do a job'], ['Apprenticeship programme', 'Learning a trade for years under a master worker'], ['Internship training', 'Joint programme with an institute: study plus practical work']],
  'Table of four types of training, induction, job instruction, apprenticeship and internship, with their meanings',
);
const vOnJob = table(
  ['On-the-job method', 'How it works'],
  [['Apprenticeship', 'Learning under a master over a long period, with a stipend'], ['Coaching', 'A superior guides a trainee daily, with goals and feedback'], ['Internship', 'Students work at the firm as part of their course'], ['Job rotation', 'Moving through different jobs to learn many tasks']],
  'Table of four on-the-job methods of training and how each works',
);
const vOffJob = table(
  ['Off-the-job method', 'How it works'],
  [['Classroom lectures', 'Talks and presentations away from the workplace'], ['Films', 'Showing how a task should be done'], ['Case study', 'Analysing real situations and suggesting solutions'], ['Computer modelling', 'Simulating the work on a computer'], ['Vestibule training', 'Practice on copies of real equipment in a separate place'], ['Programmed instruction', 'Learning in small steps, with immediate feedback']],
  'Table of six off-the-job methods of training and how each works',
);
const vMethodEx = table(
  ['Training need at an imagined diesel-engine maker in Rajkot', 'Suitable method'],
  [['New assemblers on costly testing rigs', 'Vestibule training'], ['A junior engineer needing daily guidance', 'Coaching'], ['Diploma students spending six months at the plant', 'Internship'], ['Supervisors learning quality ideas from past failures', 'Case study']],
  'Worked table matching four imagined training needs at a diesel-engine maker with a suitable method',
  'Ask: costly equipment, daily guidance, students, or learning from cases?',
);
const vSummary2 = table(
  ['Idea', 'Key point'],
  [['Selection', 'Screen, test, interview, check, decide, medical, offer, contract'], ['Recruitment vs selection', 'Positive and first vs negative and after'], ['Training vs development', 'Present job skills vs overall growth'], ['Methods', 'On the job: apprenticeship, coaching, internship. Off the job: lectures, cases, vestibule']],
  'Summary table of Part 2: selection steps, recruitment versus selection, training versus development, and methods of training',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Staffing — Part 1: Meaning, Steps, Importance and Recruitment',
  goals: [
    'Explain the steps in the staffing process and why staffing matters',
    'Compare internal and external sources of recruitment with their merits and demerits',
  ],
  slides: [
    sl('title', 'Staffing', {
      b: 'Part 1: what **staffing** is, its **steps**, why it **matters**, and **recruitment** with its sources.',
      v: vRoute1,
      n: 'A firm can have the best plan and a perfect structure, but nothing happens until the right people fill its posts. That is the job of staffing. In this part we learn the steps of staffing, why it matters, and the first big step after estimating needs: recruitment.',
    }),
    sl('concept', 'What is staffing?', {
      b: '**Staffing** is filling, and keeping filled, the positions in the organisation structure with suitable people.',
      v: vMeaning,
      n: 'Staffing deals with the human element of management. It starts by working out how many people of what kind are needed, then finds them, places and trains them, judges their work, and rewards and promotes them. Because people retire, leave and are promoted, staffing never stops; it is a continuous function.',
    }),
    sl('diagram', 'Steps in staffing', {
      b: 'Staffing follows **eight steps**.',
      v: vSteps,
      n: 'First, estimate manpower needs by comparing the people required with those available. Then recruit, which means getting suitable people to apply. Select the best. Place them in suitable jobs and introduce them to the firm. Train and develop them. Appraise their performance. Plan promotions and careers. And decide their compensation.',
    }),
    sl('example', 'Worked example 1: which step?', {
      b: 'An imagined yarn mill in Bhilwara is adding new machines.',
      bl: ['Step 1: ask whether the action comes **before, during or after** hiring.', 'Step 2: name the step.', 'Step 3: link it to the action.'],
      v: vStepsEx,
      n: 'Working out how many spinners the machines need is estimating manpower. Advertising for spinners is recruitment. Testing and choosing is selection. Showing newcomers around is placement and orientation. Rating output twice a year is performance appraisal. Each action fits one step in the chain.',
    }),
    sl('check', 'Quick check: does it end at hiring?', {
      b: 'True or false: staffing ends as soon as a candidate is selected and appointed.',
      chk: 'tf_staff',
      n: 'Think about what happens after someone joins.',
    }),
    sl('concept', 'Why staffing matters', {
      v: vImportance,
      n: 'Staffing matters in five ways. It finds competent people. It puts the right person in the right job, raising performance. Through succession planning, it keeps the firm running when key people leave. It avoids both shortages and idle staff. And with fair pay, training and promotion, it keeps people satisfied and loyal.',
    }),
    sl('concept', 'Recruitment and internal sources', {
      b: '**Recruitment** is searching for prospective employees and encouraging them to apply. **Internal sources** fill posts from within.',
      v: vInternal,
      n: 'Recruitment builds a pool of applicants. The firm can look inside or outside. Inside, it has two sources. Promotion moves a person up to a higher post with more pay. Transfer moves a person to another post or place at about the same level. Both use people the firm already knows.',
    }),
    sl('concept', 'External sources', {
      v: vExternal,
      n: 'Outside the firm there are many sources. Notices at the gate and casual callers suit simple jobs. Advertisements and placement agencies suit senior or rare posts. Employment exchanges, campus visits, employee recommendations, labour contractors and job portals each suit their own kind of post.',
    }),
    sl('check', 'Quick check: a job portal', {
      b: 'A firm posts its openings on a job portal, and candidates apply online. Which source of recruitment is this?',
      chk: 'm_web',
      n: 'Where are the vacancies being published?',
    }),
    sl('two-column', 'Internal or external?', {
      cols: ['**Internal**\n\nQuick, cheap, motivating; but no fresh talent and limited choice.', '**External**\n\nFresh talent and wide choice; but slower, costlier and may disappoint insiders.'],
      v: vIntExt,
      n: 'Internal sources are quicker and cheaper, and promotion motivates staff, but choice is limited and no fresh ideas come in. External sources bring fresh talent and a wide choice, but they cost more, take longer, and may disappoint people hoping for promotion. A new firm has no choice: it must look outside.',
    }),
    sl('example', 'Worked example 2: matching posts to sources', {
      b: 'An imagined port firm in Kakinada has four posts to fill.',
      bl: ['Step 1: note the post\'s **skill**, **number** and **urgency**.', 'Step 2: choose the source.', 'Step 3: give a reason.'],
      v: vSourcesEx,
      n: 'Fifty loaders for a season are best found through labour contractors, who supply many workers fast. A general manager needs a wide search through advertisement or a placement agency. Trainee accountants can be hired on a college campus. And a supervisor who must know the firm well can come through promotion.',
    }),
    sl('check', 'Quick check: an analogy', {
      b: 'Complete the analogy: promotion is to internal source as campus recruitment is to ___ source.',
      chk: 'fb_recruit',
      n: 'Do campus recruits already work for the firm?',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. Staffing fills and keeps filled the posts with suitable people. It has eight steps, from estimating needs to compensation. It brings competent people, better performance, succession and morale. Recruitment searches for applicants through internal sources, promotion and transfer, or many external ones.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Learn the **eight steps** of staffing in order.', 'Internal sources are only **promotion and transfer**.', 'For "suggest a source", match the **post\'s skill, number and urgency**.', 'A **new firm** must use external sources.'],
      v: vCaseSteps,
      n: 'A few tips. Learn the eight steps of staffing in order. Remember that the internal sources are just promotion and transfer. When asked to suggest a source, match it to the post\'s skill, number and urgency, and give a reason. And a brand-new firm can only recruit from outside.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Staffing — Part 2: Selection, Training and Development',
  goals: [
    'Describe the steps of the selection procedure in order and distinguish recruitment from selection',
    'Distinguish training from development',
    'Compare on-the-job and off-the-job methods of training',
  ],
  slides: [
    sl('title', 'Selection, Training and Development', {
      b: 'Part 2: the **selection** procedure, recruitment versus selection, and **training and development** with their methods.',
      v: vRoute2,
      n: 'Recruitment brings in applicants. Now the firm must choose the best of them, and then help them grow. In this part we walk through the steps of selection, compare recruitment with selection, and look at training and development and the many ways firms train their people.',
    }),
    sl('diagram', 'Steps in selection', {
      b: '**Selection** is choosing the most suitable candidates from among the applicants.',
      v: vSelSteps,
      n: 'Selection has eight steps. Preliminary screening weeds out clearly unsuitable applicants. Selection tests measure abilities. The employment interview judges the candidate face to face. References and background are checked. Then the selection decision is made, a medical examination follows, a job offer is sent, and both sides sign the contract of employment.',
    }),
    sl('concept', 'Selection tests', {
      v: vTests,
      n: 'Firms use five main tests. An intelligence test measures reasoning, memory and number skill. An aptitude test measures the potential to learn. A personality test looks at emotions, maturity and values. A trade test checks a skill the candidate already has. And an interest test finds what kind of work a person likes.',
    }),
    sl('example', 'Worked example 1: a school hires a bus driver', {
      b: 'An imagined school in Shimla is choosing a driver for its school bus.',
      bl: ['Step 1: read each action.', 'Step 2: match it to a **step of selection**.', 'Step 3: check the order.'],
      v: vSelEx,
      n: 'Rejecting applicants without a heavy-vehicle licence is preliminary screening. Asking drivers to drive a set route is a trade test. The principal meeting each driver is the interview. Checking the best driver\'s record with past employers is the reference check. Testing his eyesight is the medical examination.',
    }),
    sl('check', 'Quick check: an analogy', {
      b: 'Complete the analogy: joining two steel plates is to trade test as questions on reasoning, memory and numbers are to ___ test.',
      chk: 'fb_sel',
      n: 'Which test measures mental ability?',
    }),
    sl('two-column', 'Recruitment versus selection', {
      cols: ['**Recruitment**\n\nPositive: attracts many applicants. Comes first.', '**Selection**\n\nNegative: rejects many to choose the best. Comes after.'],
      v: vRecSel,
      n: 'Recruitment and selection work in opposite directions. Recruitment is positive: it tries to bring in as many suitable applicants as possible. Selection is negative: it rejects most of them to choose the best. Recruitment comes first and is simple; selection follows and takes longer, with tests, interviews and checks.',
    }),
    sl('concept', 'Training and development', {
      b: '**Training** builds skills for a specific job; **development** aims at the overall growth of the person.',
      v: vTrainDev,
      n: 'Training teaches the skills needed for a particular job, such as using new software. Development is wider: it grows the whole person for future roles, such as a leadership programme for future managers. Training is mainly for operative staff and focuses on the present job; development is mainly for managers and looks ahead.',
    }),
    sl('concept', 'Types of training', {
      v: vTypes,
      n: 'There are four common types of training. Induction training welcomes newcomers and introduces the firm. Job instruction training teaches a job step by step. Apprenticeship programmes train people in a trade over years under a master. And internship training links an institute with a firm, so that students combine study with practical work.',
    }),
    sl('concept', 'On-the-job methods', {
      b: '**On-the-job** methods train people while they do the actual work.',
      v: vOnJob,
      n: 'On-the-job methods train people at the real workplace. In apprenticeship, a trainee works under a master for a long period. In coaching, a superior guides a trainee daily with goals and feedback. In internship, students work at the firm during their course. In job rotation, trainees move between jobs to learn many tasks.',
    }),
    sl('concept', 'Off-the-job methods', {
      b: '**Off-the-job** methods train people away from the actual workplace.',
      v: vOffJob,
      n: 'Off-the-job methods take place away from the real work. They include classroom lectures, films, case studies, computer modelling, vestibule training on copies of real equipment, and programmed instruction in small steps. They let people learn without disturbing production or risking costly mistakes.',
    }),
    sl('check', 'Quick check: daily guidance', {
      b: 'A chief chemist meets a junior chemist every morning, sets her small targets and gives feedback on her recipes. Which method is this?',
      chk: 'm_coaching',
      n: 'Is the trainee learning at the real job, from a superior?',
    }),
    sl('example', 'Worked example 2: choosing a method', {
      b: 'An imagined diesel-engine maker in Rajkot has four training needs.',
      bl: ['Step 1: ask whether mistakes would be **costly**, whether guidance is **daily**, or whether trainees are **students**.', 'Step 2: choose the method.', 'Step 3: give a reason.'],
      v: vMethodEx,
      n: 'New assemblers on costly rigs should start with vestibule training, so mistakes cost little. A junior engineer needing daily guidance suits coaching. Diploma students spending six months at the plant fit internship. Supervisors learning from past quality failures can use case studies.',
    }),
    sl('check', 'Quick check: coaching', {
      b: 'True or false: coaching is an off-the-job method of training.',
      chk: 'tf_train',
      n: 'Where does coaching happen: at the real job, or away from it?',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. Selection follows eight steps, from screening to the contract of employment. Recruitment is positive and comes first; selection is negative and follows. Training builds job skills; development grows the person. On-the-job methods include apprenticeship, coaching and internship; off-the-job methods include lectures, case studies and vestibule training.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Learn the **eight steps of selection** in order.', 'Trade test = **existing skill**; aptitude test = **potential to learn**.', 'Vestibule training suits **costly equipment**.', 'Coaching and apprenticeship are **on the job**.'],
      v: vCaseSteps,
      n: 'Final tips. Learn the eight steps of selection in order. Keep trade and aptitude tests apart: one checks skill you already have, the other your potential to learn. Vestibule training is the answer when equipment is costly. And remember that coaching, apprenticeship and internship are on-the-job methods.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Staffing — notes',
  sections: [
    {
      h: '1. Staffing: meaning, steps and importance',
      t: 1,
      b: '**Staffing** is the function of filling, and keeping filled, the positions in the organisation structure with suitable people. It deals with the **human element** and is a **continuous** function, because people retire, resign and are promoted.\n\n**Steps:**\n1. **Estimating manpower requirements** — workload analysis (people needed) and workforce analysis (people available).\n2. **Recruitment** — getting suitable people to apply.\n3. **Selection** — choosing the most suitable.\n4. **Placement and orientation** — putting each person in a suitable job and introducing them to the firm.\n5. **Training and development.**\n6. **Performance appraisal** — judging work against standards.\n7. **Promotion and career planning.**\n8. **Compensation** — pay and other benefits.\n\n**Importance:** obtains competent personnel; higher performance (right person, right job); continued survival and growth through succession planning; optimum use of human resources; job satisfaction and morale.',
      terms: [['Staffing', 'Filling and keeping filled the posts with suitable people.'], ['Placement', 'Putting a selected person in the job for which he or she was chosen.'], ['Orientation', 'Introducing a new employee to the firm, the team and the rules.']],
      v: vSteps,
      vs: [vMeaning, vStepsEx, vImportance],
    },
    {
      h: '2. Recruitment: internal and external sources',
      t: 2,
      b: '**Recruitment** is the process of searching for prospective employees and stimulating them to apply. It is a **positive** process.\n\n**Internal sources:** **promotion** (moving up to a higher post) and **transfer** (moving to another post or place at about the same level). **Merits:** quicker and cheaper; motivates staff; ability already known. **Limits:** no fresh talent; limited choice; not possible for a new firm; may cause jealousy.\n\n**External sources:** direct recruitment; casual callers; advertisement; employment exchange; placement agencies and management consultants; campus recruitment; recommendations of employees; labour contractors; web publishing. **Merits:** fresh talent; wider choice; competitive spirit. **Limits:** costly and slow; may disappoint existing staff.',
      terms: [['Recruitment', 'Searching for prospective employees and encouraging them to apply.'], ['Promotion', 'Moving to a higher post with more pay and status.'], ['Transfer', 'Moving to another post or place at about the same level.']],
      v: vInternal,
      vs: [vExternal, vIntExt, vSourcesEx],
    },
    {
      h: '3. Selection: procedure; recruitment versus selection',
      t: 3,
      b: '**Selection** is choosing the most suitable candidates from among the applicants. It is a **negative** process, since most applicants are rejected.\n\n**Steps:**\n1. **Preliminary screening** — weeding out clearly unsuitable applicants.\n2. **Selection tests** — intelligence, aptitude, personality, trade and interest tests.\n3. **Employment interview** — face-to-face assessment.\n4. **Reference and background checks.**\n5. **Selection decision.**\n6. **Medical examination.**\n7. **Job offer.**\n8. **Contract of employment** — terms signed by both sides.\n\n**Recruitment vs selection:** recruitment attracts applicants and is positive and first; selection chooses among them, is negative and comes after; recruitment is simple, selection is longer and more complex.',
      terms: [['Selection', 'Choosing the most suitable candidates from the applicants.'], ['Aptitude test', 'Measures potential to learn new skills.'], ['Trade test', 'Measures skill already possessed.']],
      v: vSelSteps,
      vs: [vTests, vSelEx, vRecSel],
    },
    {
      h: '4. Training and development',
      t: 4,
      b: '**Training** increases the knowledge and skills of employees for a **specific job**. **Development** aims at the **overall growth** of a person for future roles. Training is job-oriented and mainly for operative staff; development is career-oriented and mainly for managers.\n\n**Types of training:** induction training; job instruction training; apprenticeship programmes; internship training.\n\n**On-the-job methods:** apprenticeship, coaching, internship, job rotation. **Off-the-job methods:** classroom lectures, films, case studies, computer modelling, vestibule training, programmed instruction.\n\n**Benefits to the organisation:** less waste, higher output, fewer accidents, lower turnover. **Benefits to employees:** better skills, higher earnings, career growth, more confidence and safety.',
      terms: [['Training', 'Building skills for a specific job.'], ['Development', 'Overall growth of a person for future roles.'], ['Vestibule training', 'Practice on copies of real equipment away from the workplace.']],
      v: vTrainDev,
      vs: [vTypes, vOnJob, vOffJob, vMethodEx],
    },
  ],
  tips: '**Common mistakes**\n- Listing advertisement or campus recruitment as internal sources (only promotion and transfer are internal).\n- Mixing up aptitude (potential) and trade (existing skill) tests.\n- Calling coaching or apprenticeship off-the-job methods.\n- Writing the selection steps out of order, for example the interview before tests.\n\n**How marks are usually awarded**\n- 1 mark: the correct step, source, test or method.\n- 2–3 marks: each point named, explained and linked to the case.\n- 5 marks: steps in order with examples; sources or methods recommended with reasons.\n- Case questions: quote the line, name the idea, explain the link.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Staffing**', 'Filling and keeping filled the posts with suitable people.', 'definition', 1],
  ['Eight steps of staffing', 'Estimate, recruit, select, place, train, appraise, promote, compensate.', 'exam-tip', 1],
  ['Why is staffing continuous?', 'People retire, resign and are promoted; firms grow.', 'concept', 1],
  ['Workload vs workforce analysis', 'People needed vs people available.', 'concept', 1],
  ['**Performance appraisal**', 'Judging work against set standards.', 'definition', 1],
  ['**Succession planning**', 'Preparing people to take over key posts.', 'definition', 1],
  ['**Recruitment**', 'Searching for applicants and encouraging them to apply.', 'definition', 2],
  ['Two internal sources', 'Promotion and transfer.', 'fact', 2],
  ['Merits of internal sources', 'Quick, cheap, motivating, ability known.', 'fact', 2],
  ['Limits of internal sources', 'No fresh talent; limited choice; impossible for a new firm.', 'fact', 2],
  ['Merits of external sources', 'Fresh talent, wide choice, competitive spirit.', 'fact', 2],
  ['Unskilled short-term workers → ?', 'Labour contractors.', 'exam-tip', 2],
  ['Rare senior specialist → ?', 'Placement agency or management consultant.', 'exam-tip', 2],
  ['**Selection**', 'Choosing the most suitable applicants.', 'definition', 3],
  ['Eight steps of selection', 'Screen, test, interview, references, decision, medical, offer, contract.', 'exam-tip', 3],
  ['**Trade test**', 'Skill already possessed.', 'definition', 3],
  ['**Aptitude test**', 'Potential to learn.', 'definition', 3],
  ['**Intelligence test**', 'Reasoning, memory, number skill.', 'definition', 3],
  ['**Interest test**', 'Likes and preferences for kinds of work.', 'definition', 3],
  ['Recruitment vs selection', 'Positive and first vs negative and after.', 'concept', 3],
  ['**Training**', 'Skills for a specific job.', 'definition', 4],
  ['**Development**', 'Overall growth for future roles.', 'definition', 4],
  ['Four types of training', 'Induction, job instruction, apprenticeship, internship.', 'fact', 4],
  ['On-the-job methods', 'Apprenticeship, coaching, internship, job rotation.', 'fact', 4],
  ['Off-the-job methods', 'Lectures, films, case study, computer modelling, vestibule, programmed instruction.', 'fact', 4],
  ['**Vestibule training**', 'Practice on copies of real equipment away from the floor.', 'definition', 4],
  ['**Coaching**', 'A superior guides a trainee daily with goals and feedback.', 'definition', 4],
  ['Case routine', 'Quote the line, name the step, source or method, explain the link.', 'exam-tip', 3],
]);

// ---------------------------------------------------------------- tests (ISC class defaults, item for item)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Staffing',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A - Objective (5 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_estimate', 'm_contractor', 'm_trade_test', 'm_vestibule', 'ar_selection'] },
    { id: 'B', title: 'Section B - Short answer (4 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s_meaning', { attempt: 1, keys: ['s_rec_sel', 's_train_dev'] }] },
    { id: 'C', title: 'Section C - Short answer (6 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s3_selection', { attempt: 1, keys: ['s3_internal', 's3_methods'] }] },
    { id: 'D', title: 'Section D - Long answer (5 marks)', instr: 'Answer the question. It is set in parts.', items: ['l_training'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Staffing',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A - Objective (12 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_placement', 'm_appraisal', 'm_succession', 'm_recruit_meaning', 'm_promotion', 'm_internal_limit', 'm_screening', 'm_intelligence', 'm_reference', 'm_apprentice', 'ar_internal', 'ar_sel_c'] },
    { id: 'B', title: 'Section B - Short answer (6 marks)', instr: 'Answer all three questions. Internal choice in the last question.', items: ['s_imp2', 's_sources2', { attempt: 1, keys: ['s_new_firm', 's_tests'] }] },
    { id: 'C', title: 'Section C - Short answer (12 marks)', instr: 'Answer all four questions. Internal choice in the last question.', items: ['s3_steps', 's3_external', 's3_benefits', { attempt: 1, keys: ['s3_importance', 's3_offjob'] }] },
    { id: 'D', title: 'Section D - Long answer (10 marks)', instr: 'Answer both questions. Internal choice in the second question. Each is set in parts.', items: ['l_selection', { attempt: 1, keys: ['l_steps', 'l_recruit'] }] },
  ],
});
if (T_SHORT.total_marks !== 20 || T_LONG.total_marks !== 40) throw new Error(`test marks ${T_SHORT.total_marks} / ${T_LONG.total_marks}`);

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 of isc-12-commerce-ch10 (meaning, steps and importance of staffing; recruitment and its internal and external sources; selection procedure and recruitment versus selection; training and development, their differences, types and on-the-job and off-the-job methods)',
    originality: 'every firm, person and case is imagined and written by SOYL and labelled; no ISC or CBSE textbook text, illustration or exercise and no CISCE specimen or board item reused (D-036); firms, people and set-ups differ from CBSE 12 Business Studies ch06',
    data: 'no computed figures; all examples are imagined and labelled',
    facts: 'stable textbook concepts only (eight steps of staffing, internal and external sources, eight steps of selection, five selection tests, types and methods of training)',
    gate: 'schema, pipeline lint, deterministic verify, word limits, narration and answer-leak checks run clean in this build',
  },
});
