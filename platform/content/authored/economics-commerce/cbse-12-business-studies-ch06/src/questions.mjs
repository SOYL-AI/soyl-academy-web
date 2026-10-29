// CBSE 12 Business Studies, ch06 Staffing — question bank. Every firm, person and situation is
// imagined by SOYL and labelled as such; no NCERT text or exercise and no board/sample-paper item is
// reused (D-036). The two manpower numericals are computed here and checked by assertions.
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, caseQ, child } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// ---------------------------------------------------------------- computed figures
/** Workload analysis gives the workers needed; workforce analysis the workers available. */
export function manpower({ output, perWorker, present, leaving }) {
  const needed = output / perWorker;
  assert.ok(Number.isInteger(needed), 'workload must give a whole number of workers');
  const available = present - leaving;
  return { needed, available, gap: needed - available };
}
// Bank item: an imagined pickle unit.
export const MP1 = { output: 12600, perWorker: 450, present: 22, leaving: 0, ...manpower({ output: 12600, perWorker: 450, present: 22, leaving: 0 }) };
assert.equal(MP1.needed, 28);
assert.equal(MP1.gap, 6);
// Bank item: an imagined call centre with retirements.
export const MP2 = { output: 9000, perWorker: 300, present: 27, leaving: 3, ...manpower({ output: 9000, perWorker: 300, present: 27, leaving: 3 }) };
assert.equal(MP2.needed, 30);
assert.equal(MP2.available, 24);
assert.equal(MP2.gap, 6);
// Deck worked example: an imagined bakery (different figures).
export const MPD = { output: 7200, perWorker: 360, present: 16, leaving: 1, ...manpower({ output: 7200, perWorker: 360, present: 16, leaving: 1 }) };
assert.equal(MPD.needed, 20);
assert.equal(MPD.gap, 5);
const inr = (n) => Number(n).toLocaleString('en-IN');

// ================================================================ t01 Concept, importance, HRM
Q('m_meaning', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Staffing, as a function of management, is best described as',
  opts: [
    'filling and keeping filled the positions in the organisation structure with suitable people',
    'dividing the work of an enterprise into departments and jobs',
    'guiding, instructing and motivating people at work',
    'comparing actual performance with the standards set in advance',
  ],
  sol: 'Staffing is about people: finding, placing, developing and keeping the right people in the positions that organising has created. Dividing work is organising, guiding people is directing, and comparing performance with standards is controlling.',
}));
Q('m_overmanning', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Rangoli Prints (imagined), a textile unit in Surat, found that some departments had idle workers while others were working overtime. Better staffing would mainly help it by',
  opts: [
    'ensuring optimum use of human resources by avoiding both over-manning and under-manning',
    'removing the need for any supervision of workers',
    'guaranteeing that the firm earns a profit every year',
    'replacing the planning function of management',
  ],
  sol: 'Matching the number and kind of workers to the work avoids over-manning (idle staff) and under-manning (overtime, delays). Staffing does not remove supervision, cannot guarantee profit and does not replace planning.',
}));
Q('m_hrm_not', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which one of the following is **NOT** a specialised activity of a human resource department?',
  opts: [
    'Fixing the selling price of the firm\'s products',
    'Developing compensation and incentive plans',
    'Handling grievances and complaints of employees',
    'Maintaining relations between management and unions',
  ],
  sol: 'Pricing is a marketing decision. Compensation plans, grievance handling and union–management relations are all part of human resource management.',
}));
Q('m_evolution', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which sequence shows how the management of people at work has broadened over time?',
  opts: [
    'Labour welfare officer → personnel management → human resource management',
    'Human resource management → personnel management → labour welfare officer',
    'Personnel management → labour welfare officer → human resource management',
    'Labour welfare officer → human resource management → personnel management',
  ],
  sol: 'Firms first appointed a welfare officer to look after workers, then built personnel departments, and today treat people as a resource to be developed through human resource management.',
}));
Q('ar_hrm_part', ar({
  t: 1, d: 2, c: 'analysis', key: 'a',
  a: 'Staffing is often called an integral part of human resource management.',
  r: 'Human resource management covers recruiting, selecting, training, appraising and paying people, which are the very activities of staffing.',
  sol: 'Both are true, and R explains A: the activities that make up staffing are the core of human resource management, so staffing is one of its parts.',
}));
Q('ar_every_manager', ar({
  t: 1, d: 3, c: 'analysis', key: 'b',
  a: 'Staffing is the duty of every manager and not only of the human resource department.',
  r: 'In large organisations a separate human resource department is set up to handle specialised staffing activities.',
  sol: 'Both are true, but R does not explain A. A is true because every manager chooses, trains and appraises the people under them. R is a separate fact about how big firms organise specialised work.',
}));
Q('tf_small_firm', tf({
  t: 1, d: 2, c: 'application', ans: false,
  stem: 'True or false? A tailoring shop in Ludhiana (imagined) with six workers does not perform the staffing function, because it has no human resource department.',
  sol: 'Even a small firm must find, choose, train and pay its workers; the owner simply performs the staffing function personally. A separate department is needed only when a firm grows large.',
}));
Q('s_importance', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give any two reasons why staffing is important for an organisation.',
  model: '1. **Competent personnel:** staffing helps discover and obtain **capable people** for different jobs.\n2. **Continuity and growth:** by developing managers through **succession planning**, it keeps the business running smoothly even when senior people leave or retire.',
  sol: 'Any two of: competent people, right person on the right job, succession and continuity, optimum use of people, job satisfaction and morale.',
  scheme: [['First reason explained', 1], ['Second reason explained', 1]],
}));
Q('s3_hrm_acts', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Human resource management is a wider concept than staffing. State any three specialised activities that a human resource department performs.',
  model: '1. **Recruitment and job analysis:** searching for suitable candidates and studying the nature and needs of each job.\n2. **Compensation:** developing pay, incentive and benefit plans for employees.\n3. **Employee relations and welfare:** maintaining union–management relations, handling grievances and providing social security and welfare to workers.',
  sol: 'Three distinct specialised activities, each with a short explanation.',
  scheme: [['First activity', 1], ['Second activity', 1], ['Third activity', 1]],
}));
Q('l_importance', long({
  t: 1, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the importance of staffing for an organisation, giving five points.',
  model: '1. **Obtaining competent personnel:** staffing helps the firm discover and attract **capable people** for its jobs.\n2. **Right person on the right job:** matching ability to the job raises **performance and output**.\n3. **Survival and growth:** **succession planning** prepares people to take over senior posts, so the business continues smoothly.\n4. **Optimum use of people:** it avoids **over-manning** (idle workers, higher costs) and **under-manning** (overtime, delays).\n5. **Job satisfaction:** fair selection, training and pay improve **morale** and reduce absenteeism and turnover.',
  sol: 'Five distinct points, each with a heading and one line of explanation.',
  scheme: [['Competent personnel', 1], ['Right person, right job', 1], ['Survival and growth (succession)', 1], ['Optimum utilisation', 1], ['Job satisfaction and morale', 1]],
}));

// ================================================================ t02 Staffing process
Q('m_first_step', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'The first step of the staffing process is',
  opts: ['estimating manpower requirements', 'recruitment', 'selection', 'training and development'],
  sol: 'A firm must first know how many people, and of what kind, it needs; only then can it search for and choose them.',
}));
Q('m_workload', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'The HR head of Kaveri Pumps (imagined), Coimbatore, studies how many machinists, fitters and inspectors are needed to produce next year\'s target output. This study is called',
  opts: ['workload analysis', 'workforce analysis', 'performance appraisal', 'job rotation'],
  sol: 'Working out the number and types of people **needed** for the planned work is workload analysis. Workforce analysis looks at the people **available**; appraisal rates past performance; job rotation is a training method.',
}));
Q('m_workforce', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Before hiring, the manager of Saffron Foods (imagined) lists the skills, ages and expected retirements of the 40 workers already on the rolls. She is doing',
  opts: ['workforce analysis', 'workload analysis', 'orientation', 'preliminary screening'],
  sol: 'Studying the number and kind of employees **already available** is workforce analysis. Comparing it with the workload shows the shortage or surplus.',
}));
Q('m_placement', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'On her first day at Meghdoot Couriers (imagined), Ritika is shown around the office, introduced to her team and told the leave rules. This step of staffing is',
  opts: ['orientation', 'selection', 'recruitment', 'performance appraisal'],
  sol: 'Introducing a new employee to the people, place and rules of the organisation is orientation (induction). It follows selection and comes with placement.',
}));
Q('m_compensation', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which of the following is an **indirect** financial payment to an employee?',
  opts: ['Paid vacation and health insurance', 'Monthly salary', 'Sales commission', 'Piece-rate wages'],
  sol: 'Indirect payments are benefits such as paid leave and insurance. Salary, commission and piece wages are direct payments for work done.',
}));
Q('m_career', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'Tejas Electronics (imagined) tells every new engineer which higher posts they can reach in five years and what skills each post needs. This reflects which step of staffing?',
  opts: ['Promotion and career planning', 'Estimating manpower requirements', 'Selection decision', 'Recruitment'],
  sol: 'Showing employees the path to higher posts and what they need to reach them is career planning, which goes with promotion. It keeps capable people motivated to stay.',
}));
Q('ord_process', ord({
  t: 2, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange these steps of the staffing process in the correct order.',
  items: [
    'Estimating manpower requirements',
    'Recruitment',
    'Selection',
    'Placement and orientation',
    'Training and development',
  ],
  sol: 'Need is estimated first, candidates are attracted, the best are chosen, they are placed and introduced, and then they are trained and developed.',
}));
Q('fb_workforce', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'Studying the number and type of employees already available in the organisation is called ___ analysis.',
  acc: [['workforce']],
  sol: 'This is workforce analysis; workload analysis finds the number and type of people needed.',
}));
Q('n_pickle', num({
  t: 2, d: 3, c: 'application', marks: 2, value: MP1.gap, unit: 'workers',
  stem: `An imagined pickle unit in Jaipur must pack ${inr(MP1.output)} jars a month. One packer can pack ${MP1.perWorker} jars a month, and the unit has ${MP1.present} packers now. How many more packers must it recruit?`,
  sol: `Step 1 (workload analysis): packers needed = ${inr(MP1.output)} ÷ ${MP1.perWorker} = ${MP1.needed}.\nStep 2 (workforce analysis): packers available = ${MP1.present}.\nStep 3: shortage = ${MP1.needed} − ${MP1.present} = ${MP1.gap} packers to recruit.`,
  scheme: [[`Workload: ${MP1.needed} packers needed`, 1], [`Shortage of ${MP1.gap}`, 1]],
}));
Q('n_callcentre', num({
  t: 2, d: 4, c: 'application', marks: 2, value: MP2.gap, unit: 'workers',
  stem: `An imagined call centre in Mohali expects ${inr(MP2.output)} customer calls a week. Each agent can handle ${MP2.perWorker} calls a week. It has ${MP2.present} agents, but ${MP2.leaving} of them will retire this month. How many agents must it recruit to meet the workload?`,
  sol: `Step 1 (workload): agents needed = ${inr(MP2.output)} ÷ ${MP2.perWorker} = ${MP2.needed}.\nStep 2 (workforce): agents available = ${MP2.present} − ${MP2.leaving} = ${MP2.available}.\nStep 3: agents to recruit = ${MP2.needed} − ${MP2.available} = ${MP2.gap}.`,
  scheme: [[`Workload: ${MP2.needed} agents needed`, 1], [`Available ${MP2.available}, so ${MP2.gap} to recruit`, 1]],
}));
Q('ar_appraisal', ar({
  t: 2, d: 3, c: 'analysis', key: 'a',
  a: 'Performance appraisal is a useful input for decisions on training and promotion.',
  r: 'Appraisal compares an employee\'s actual performance with the expected standard and shows strengths and gaps.',
  sol: 'Both are true, and R explains A: because appraisal reveals where an employee falls short or excels, it shows who needs training and who deserves promotion.',
}));
Q('s_workload_force', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'How do workload analysis and workforce analysis together help a manager estimate manpower requirements?',
  model: '**Workload analysis** finds the number and types of people **needed** to do the planned work. **Workforce analysis** finds the number and types **already available**. Comparing the two shows whether the firm has a **shortage** to recruit for or a **surplus** to redeploy.',
  sol: 'Define both analyses and state that their comparison gives the shortage or surplus.',
  scheme: [['Both analyses defined', 1], ['Comparison gives shortage or surplus', 1]],
}));
Q('s_placement_orient', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between placement and orientation of a newly selected employee.',
  model: '**Placement** means the employee **occupying the position** or post for which they were selected. **Orientation** (induction) means **introducing** the new employee to colleagues, superiors, the workplace and the **rules and policies** of the organisation.',
  sol: 'One clear sentence on each term.',
  scheme: [['Placement', 1], ['Orientation', 1]],
}));
Q('s3_later_steps', short({
  t: 2, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain the last three steps of the staffing process that come after training and development.',
  model: '1. **Performance appraisal:** evaluating an employee\'s actual performance against the **standards** expected for the job, and giving feedback.\n2. **Promotion and career planning:** moving deserving employees to **higher posts** with more responsibility, pay and status, and showing them a career path.\n3. **Compensation:** fixing **pay and benefits**: direct payments such as salary and incentives, and indirect ones such as insurance and paid leave.',
  sol: 'Name the three steps in order and explain each in one or two lines.',
  scheme: [['Performance appraisal', 1], ['Promotion and career planning', 1], ['Compensation', 1]],
}));
Q('l_process', long({
  t: 2, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the first five steps of the staffing process.',
  model: '1. **Estimating manpower requirements:** **workload analysis** (people needed) and **workforce analysis** (people available) show the shortage or surplus.\n2. **Recruitment:** **searching** for prospective employees and **stimulating** them to apply.\n3. **Selection:** choosing the **most suitable** candidates from the pool through tests and interviews.\n4. **Placement and orientation:** the selected person **takes up the post** and is **introduced** to colleagues, workplace and rules.\n5. **Training and development:** improving the employee\'s **skills and knowledge** for the present job and for future growth.',
  sol: 'Five steps in the correct order, each explained in a line.',
  scheme: [['Estimating manpower requirements', 1], ['Recruitment', 1], ['Selection', 1], ['Placement and orientation', 1], ['Training and development', 1]],
}));

// ================================================================ t03 Recruitment
Q('m_rec_meaning', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'Recruitment means',
  opts: [
    'searching for prospective employees and stimulating them to apply for jobs',
    'choosing the best candidate from those who have applied',
    'improving the skills of employees for their present jobs',
    'introducing a new employee to the workplace and colleagues',
  ],
  sol: 'Recruitment builds a pool of applicants. Choosing among them is selection, improving skills is training, and introducing a newcomer is orientation.',
}));
Q('m_transfer', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'A branch manager of Godavari Cooperative Bank (imagined) is moved from Nashik to Pune at the same grade and pay because the Pune branch is short of a manager. This is an example of',
  opts: ['transfer, an internal source of recruitment', 'promotion, an internal source of recruitment', 'direct recruitment, an external source', 'job rotation, a training method'],
  sol: 'Shifting an employee to another job or place at the **same level**, without a substantial change in pay or responsibility, is a transfer, an internal source. A promotion means a higher post; job rotation is done to train, not to fill a vacancy.',
}));
Q('m_promotion', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which statement about promotion as a source of recruitment is correct?',
  opts: [
    'It moves an employee to a higher post with more responsibility, pay and status, and motivates others',
    'It brings fresh talent and new ideas from outside the organisation',
    'It shifts an employee to another job at the same level',
    'It is the most suitable source for a business that has just started',
  ],
  sol: 'Promotion fills a higher post from inside and motivates employees. It cannot bring outside talent, it is not a same-level move (that is a transfer), and a new business has no staff to promote.',
}));
Q('m_casual_callers', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Many job seekers walk into the office of Indrayani Hotels (imagined) and leave their applications even when no vacancy is advertised. The hotel keeps these on file and contacts them when posts fall vacant. This source of recruitment is',
  opts: ['casual callers', 'employment exchange', 'labour contractors', 'campus recruitment'],
  sol: 'Unsolicited applicants whose details are kept for future vacancies are casual callers. It saves the cost of advertising for each vacancy.',
}));
Q('m_direct', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'A construction firm in Bhopal (imagined) pins a notice at its site gate: "Wanted: 15 helpers. Report at 8 a.m. tomorrow." Helpers who turn up are hired the same day. This source is',
  opts: ['direct recruitment', 'advertisement in newspapers', 'placement agency', 'web publishing'],
  sol: 'A notice at the gate for unskilled jobs, with on-the-spot hiring, is direct recruitment. It is cheap and quick for casual or unskilled vacancies.',
}));
Q('m_consultant', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'Nilachal Steel (imagined) needs a chief technology officer with rare expertise. It hires an outside firm that searches for, screens and short-lists suitable senior professionals for a fee. The source used is',
  opts: ['placement agencies and management consultants', 'employment exchange', 'casual callers', 'recommendations of employees'],
  sol: 'For technical, professional and top-level posts, firms pay placement agencies and management consultants to find and screen candidates. Employment exchanges mainly serve unskilled and skilled operative jobs.',
}));
Q('m_contractor', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Labour contractors are a suitable external source mainly for',
  opts: ['unskilled workers needed quickly', 'senior managers with rare skills', 'fresh management graduates', 'promotion of existing staff'],
  sol: 'Contractors keep in close touch with labourers and can supply unskilled workers at short notice. Senior and professional posts use consultants or advertisements; graduates come through campus recruitment.',
}));
Q('m_ext_merit', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which is a merit of **external** sources of recruitment?',
  opts: [
    'They give management a wider choice and bring fresh talent into the firm',
    'They are always cheaper and quicker than internal sources',
    'They improve the morale of existing employees waiting for promotion',
    'They make the selection process simpler because candidates are already known',
  ],
  sol: 'External sources widen the pool and bring new skills and ideas. They are usually costlier and slower, may disappoint staff hoping for promotion, and the candidates are not already known.',
}));
Q('m_int_limit', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'Which is a **limitation** of filling vacancies only through internal sources?',
  opts: [
    'Employees may become complacent if they expect promotion by seniority, and no fresh talent enters',
    'Existing employees lose motivation because outsiders get the better jobs',
    'The cost of advertising and testing becomes very high',
    'The firm cannot know the past performance of the candidates',
  ],
  sol: 'Relying only on insiders shuts out new ideas and can make staff lethargic. The other options describe limitations of external sources or are false for internal ones (insiders\' records are known).',
}));
Q('ar_promotion_new', ar({
  t: 3, d: 2, c: 'analysis', key: 'a',
  a: 'A newly started enterprise cannot depend on internal sources of recruitment.',
  r: 'Internal sources can be used only when the organisation already has employees who can be transferred or promoted.',
  sol: 'Both are true, and R explains A: a new firm has no existing staff to transfer or promote, so it must recruit from outside.',
}));
Q('ar_ext_costly', ar({
  t: 3, d: 3, c: 'analysis', key: 'c',
  a: 'External recruitment is a costly and lengthy process.',
  r: 'External recruitment always raises the morale of existing employees.',
  sol: 'A is true: advertising, testing and interviewing outsiders takes money and time. R is false: hiring outsiders for senior posts can **lower** the morale of employees who hoped to be promoted.',
}));
Q('tf_campus', tf({
  t: 3, d: 1, c: 'application', ans: true,
  stem: 'True or false? When a software company visits an engineering college to test and interview final-year students, it is using campus recruitment, an external source.',
  sol: 'Visiting colleges and institutes to recruit students is campus recruitment, an external source of recruitment.',
}));
Q('mt_sources', match({
  t: 3, d: 2, c: 'application',
  stem: 'Match each imagined hiring situation with the source of recruitment it uses.',
  pairs: [
    ['A dairy in Anand fills a supervisor\'s post by moving up its senior milk tester', 'Promotion'],
    ['A hospital in Kochi posts vacancies for nurses on its own website and a jobs portal', 'Web publishing'],
    ['A cement plant asks its workers to suggest relatives or friends for vacant fitter posts', 'Recommendations of employees'],
    ['A government-run office keeps a register of job seekers and sends names to a factory', 'Employment exchange'],
  ],
  sol: 'Moving up an insider is promotion; posting on websites is web publishing; names suggested by staff are recommendations of employees; the government register is the employment exchange.',
}));
Q('s_int_ext', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State one merit and one limitation of internal sources of recruitment.',
  model: '**Merit:** promotions **motivate employees** to work better, and selection is simpler because the candidates\' records are **already known**.\n**Limitation:** **no fresh talent** or new ideas enter the firm, and staff may become **complacent** if they expect promotion by seniority.',
  sol: 'One genuine merit and one genuine limitation, each explained.',
  scheme: [['Merit', 1], ['Limitation', 1]],
}));
Q('s_rec_positive', short({
  t: 3, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Recruitment is called a positive process and selection a negative one. Explain why.',
  model: 'Recruitment is **positive** because it **encourages as many suitable people as possible to apply**, building a large pool. Selection is **negative** because it **rejects** most applicants at each step until only the most suitable remain.',
  sol: 'Link "positive" to attracting applicants and "negative" to rejecting them.',
  scheme: [['Recruitment attracts applicants (positive)', 1], ['Selection rejects applicants (negative)', 1]],
}));
Q('s3_ext_sources', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain any three external sources of recruitment, saying for which kind of job each is suitable.',
  model: '1. **Advertisement** in newspapers, journals or online: reaches a **wide** audience; suitable for **middle and senior** posts.\n2. **Placement agencies and management consultants:** search and screen candidates for a fee; suitable for **technical, professional and top** posts.\n3. **Labour contractors:** keep in touch with workers and supply them quickly; suitable for **unskilled** jobs.',
  sol: 'Any three external sources, each with a line on how it works and the jobs it suits.',
  scheme: [['First source with suitable jobs', 1], ['Second source with suitable jobs', 1], ['Third source with suitable jobs', 1]],
}));
Q('s3_ext_limits', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Kesari Motors (imagined) has decided to fill all its senior posts from outside. Explain three problems this policy may create.',
  model: '1. **Dissatisfaction among staff:** existing employees who hoped for promotion may feel ignored, lowering **morale** and loyalty.\n2. **Lengthy process:** advertising, testing and interviewing outsiders takes **a long time**, so posts stay vacant.\n3. **Costly:** advertisements, agency fees and tests make external recruitment **expensive**, and the response is often **uncertain**.',
  sol: 'Three limitations of external sources, applied to the firm\'s policy.',
  scheme: [['Staff dissatisfaction', 1], ['Lengthy process', 1], ['Cost or uncertain response', 1]],
}));
Q('l_internal', long({
  t: 3, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'Sahyadri Agro (imagined) fills most vacancies by transfers and promotions. Explain the two internal sources and any three merits of this policy for the company.',
  model: '1. **Transfer:** shifting an employee to another job, department or place at the **same level**, without a substantial change in pay or status.\n2. **Promotion:** moving an employee to a **higher post** with more responsibility, pay and status.\n3. **Motivation:** the chance of promotion encourages employees to **improve their performance**.\n4. **Simpler selection:** candidates are **already known**, so their record and suitability can be judged more reliably and quickly.\n5. **Adjusting staff and lower cost:** transfers move surplus workers to short-staffed units, and no advertising or agency costs arise.',
  sol: 'Explain both sources, then three merits with reasons.',
  scheme: [['Transfer explained', 1], ['Promotion explained', 1], ['First merit', 1], ['Second merit', 1], ['Third merit', 1]],
}));
Q('l_ext_eval', long({
  t: 3, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'A new solar-panel company in Gandhinagar (imagined) must hire 200 people, from engineers to helpers. Recommend suitable sources of recruitment and evaluate the merits and limitations of relying on external sources.',
  model: '1. **Suitable sources:** **campus recruitment** for young engineers, **advertisement or web publishing** for experienced staff, and **labour contractors or direct recruitment** for helpers.\n2. **Merit, fresh talent:** outsiders bring new skills, which a new company needs.\n3. **Merit, wider choice:** a large pool lets the firm pick the **best-qualified** people.\n4. **Limitations:** external recruitment is **costly** and **time-consuming**, and the response may be uncertain.\n5. **Judgement:** as a **new** firm has no staff to promote, external sources are **unavoidable**; once running, it can mix in promotions to keep staff motivated.',
  sol: 'Recommend sources by job level, give two merits and the limitations, and reach a justified judgement.',
  scheme: [['Sources matched to job levels', 1], ['First merit', 1], ['Second merit', 1], ['Limitations', 1], ['Justified judgement', 1]],
}));

// ================================================================ t04 Selection
Q('m_sel_meaning', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'Selection is the process of',
  opts: [
    'identifying and choosing the best persons from among the prospective candidates for a job',
    'creating a pool of applicants for a vacancy',
    'moving an employee to a higher post',
    'evaluating the performance of an employee after a year',
  ],
  sol: 'Selection chooses from the pool that recruitment has created. Moving to a higher post is promotion; evaluating performance is appraisal.',
}));
Q('m_screening', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'Out of 900 applications for clerks at Vindhya Gramin Bank (imagined), 600 are rejected because the applicants do not have the minimum qualification stated in the advertisement. This step is',
  opts: ['preliminary screening', 'employment interview', 'reference and background checks', 'medical examination'],
  sol: 'Weeding out unqualified applicants on the basis of the application form, before tests and interviews, is preliminary screening.',
}));
Q('m_aptitude', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'Candidates for trainee pilots at an imagined flying school are tested on how quickly they can learn to judge distances and coordinate hands and eyes, before they have any flying skill. This is',
  opts: ['an aptitude test', 'a trade test', 'an interest test', 'an intelligence test'],
  sol: 'An aptitude test measures a person\'s **potential to learn** new skills. A trade test measures skills a person **already has**; an interest test finds likes and dislikes; an intelligence test measures general mental ability (IQ).',
}));
Q('m_trade', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'An imagined furniture firm in Saharanpur asks applicants for carpenters to make a small drawer in two hours to check their existing woodworking skill. The test used is',
  opts: ['a trade test', 'a personality test', 'an aptitude test', 'an interest test'],
  sol: 'A trade test measures the **existing** knowledge and proficiency of a candidate in the trade, here carpentry. An aptitude test would measure potential to learn.',
}));
Q('m_personality', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'A personality test mainly gives clues to a candidate\'s',
  opts: [
    'emotions, reactions, maturity and value system',
    'existing skill in a particular trade',
    'potential to learn new skills',
    'level of general intelligence',
  ],
  sol: 'Personality tests probe emotions, reactions, maturity and values. Existing skill is checked by a trade test, potential by an aptitude test, and general intelligence by an intelligence test.',
}));
Q('m_last_step', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Which is the **last** step of the selection process?',
  opts: ['Contract of employment', 'Job offer', 'Medical examination', 'Selection decision'],
  sol: 'After the selection decision, the medical examination and the job offer, both sides sign the contract of employment, which completes selection.',
}));
Q('m_reference', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'Before appointing an accountant, Ganga Logistics (imagined) phones his former employer and the professor he named to ask about his honesty and conduct. Which step of selection is this?',
  opts: ['Reference and background checks', 'Employment interview', 'Preliminary screening', 'Contract of employment'],
  sol: 'Verifying information and character through referees and past employers is the reference and background check.',
}));
Q('ord_selection', ord({
  t: 4, d: 3, c: 'understanding', marks: 1,
  stem: 'Arrange these steps of the selection process in the correct order.',
  items: [
    'Preliminary screening',
    'Selection tests',
    'Employment interview',
    'Reference and background checks',
    'Selection decision',
    'Medical examination',
  ],
  sol: 'Screening comes first, then tests and the interview, then checks on references, then the decision, followed by the medical examination (before the job offer and contract).',
}));
Q('fb_contract', fb({
  t: 4, d: 2, c: 'recall',
  stem: 'A document stating the job title, duties, pay, working hours and leave rules, signed by both employer and employee, is the ___ of employment.',
  acc: [['contract']],
  sol: 'This is the contract of employment, the final step of selection.',
}));
Q('tf_interest', tf({
  t: 4, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? An interest test is used to measure how well a candidate can already operate a machine.',
  sol: 'Existing skill on a machine is measured by a **trade test**. An interest test finds a person\'s pattern of likes and dislikes for different kinds of work.',
}));
Q('ar_medical', ar({
  t: 4, d: 3, c: 'analysis', key: 'd',
  a: 'The medical examination is the first step of the selection process.',
  r: 'A medical examination checks whether a candidate is physically fit for the job.',
  sol: 'A is false: medical examination comes **after** the selection decision and before the job offer. R is true.',
}));
Q('s_tests_two', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between an aptitude test and a trade test, giving the purpose of each.',
  model: 'An **aptitude test** measures a candidate\'s **potential to learn** new skills, so it shows how well the person can be trained. A **trade test** measures the **existing knowledge and skill** of the candidate in a particular trade or occupation.',
  sol: 'Contrast potential to learn with present skill.',
  scheme: [['Aptitude test', 1], ['Trade test', 1]],
}));
Q('s_interview', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is the purpose of the employment interview in the selection process?',
  model: 'The interview is an **in-depth conversation** with the candidate to judge **suitability** for the job. It also lets the firm **give information** about the job and organisation, and lets the candidate seek information.',
  sol: 'Two purposes: assessing suitability and exchanging information.',
  scheme: [['Assessing suitability', 1], ['Two-way exchange of information', 1]],
}));
Q('s3_sel_steps', short({
  t: 4, d: 3, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain the three steps of selection that come after the selection decision.',
  model: '1. **Medical examination:** the selected candidate is checked for **physical fitness** for the job before the offer is made.\n2. **Job offer:** a **letter of appointment** confirms the post and states the date by which the candidate must join.\n3. **Contract of employment:** a document signed by both sides sets out the **job title, duties, pay, working hours, leave and terms** of termination.',
  sol: 'Three steps in order, each explained.',
  scheme: [['Medical examination', 1], ['Job offer', 1], ['Contract of employment', 1]],
}));
Q('l_selection', long({
  t: 4, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain any five steps of the selection process.',
  model: '1. **Preliminary screening:** application forms are checked and **unqualified** applicants are eliminated.\n2. **Selection tests:** intelligence, aptitude, personality, trade and interest tests measure **ability and potential**.\n3. **Employment interview:** an **in-depth conversation** judges suitability and exchanges information.\n4. **Reference and background checks:** former employers and referees are contacted to verify **character and record**.\n5. **Selection decision:** the final choice is made from those who passed the earlier steps, usually by the **manager** concerned.',
  sol: 'Any five steps in order, each explained in a line.',
  scheme: [['Step 1', 1], ['Step 2', 1], ['Step 3', 1], ['Step 4', 1], ['Step 5', 1]],
}));
Q('l_tests', long({
  t: 4, d: 4, c: 'application', marks: 5, wl: L5,
  stem: 'Prakash Engineering (imagined) is hiring trainee machine operators, sales executives and a quality inspector. Explain five selection tests and suggest which job each would suit best.',
  model: '1. **Intelligence test:** measures general mental ability (IQ); useful for **all** posts, especially where decisions are needed.\n2. **Aptitude test:** measures **potential to learn**; suits **trainee operators**, who will be trained on machines.\n3. **Personality test:** probes emotions, maturity and values; suits **sales executives**, who deal with customers.\n4. **Trade test:** measures **existing skill**; suits the **quality inspector**, who must already know inspection methods.\n5. **Interest test:** finds likes and dislikes about work; helps place each person in a job they will **enjoy and stay in**.',
  sol: 'Five tests explained, each linked to the job it best suits.',
  scheme: [['Intelligence test', 1], ['Aptitude test with job', 1], ['Personality test with job', 1], ['Trade test with job', 1], ['Interest test', 1]],
}));

// ================================================================ t05 Training and development
Q('m_train_meaning', mcq({
  t: 5, d: 1, c: 'recall',
  stem: 'Training is best described as',
  opts: [
    'a process of increasing the knowledge and skills of an employee for doing a particular job',
    'the overall growth of an individual in all respects',
    'increasing general knowledge and understanding of the total environment',
    'choosing the best candidate for a vacancy',
  ],
  sol: 'Training is job-specific. Overall growth is development; general knowledge and understanding is education; choosing candidates is selection.',
}));
Q('m_vestibule', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'New operators at an imagined bottling plant in Nagpur practise on a copy of the filling machine set up in a separate hall, so that mistakes do not stop the real production line. This method is',
  opts: ['vestibule training', 'apprenticeship programme', 'job rotation', 'coaching'],
  sol: 'Training on equipment similar to the real one, in a separate place away from the work floor, is vestibule training. It is used for costly or complex machines.',
}));
Q('m_apprentice', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'Salim joins an imagined electrical contractor in Lucknow and works under a master electrician for two years, learning wiring and repairs on real jobs. This is',
  opts: ['an apprenticeship programme', 'programmed instruction', 'vestibule training', 'a case study'],
  sol: 'Learning a skilled trade over a long period under the guidance of a master worker is an apprenticeship programme, an on-the-job method.',
}));
Q('m_rotation', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'Management trainees at Narmada Fabrics (imagined) spend three months each in purchase, production, sales and accounts before getting a permanent posting. This method is',
  opts: ['job rotation', 'internship training', 'apprenticeship programme', 'vestibule training'],
  sol: 'Moving trainees from one department to another to give them broad experience is job rotation, an on-the-job method.',
}));
Q('m_internship', mcq({
  t: 5, d: 3, c: 'application',
  stem: 'Under an agreement between an imagined polytechnic in Pune and a car-parts maker, students study theory in college and work in the factory for one semester. This is',
  opts: ['internship training', 'coaching', 'job rotation', 'computer modelling'],
  sol: 'A joint programme of an educational institution and a business, combining classroom theory with practical work, is internship training.',
}));
Q('m_off_job', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'Which of the following is an **off-the-job** training method?',
  opts: ['Programmed instruction', 'Coaching', 'Apprenticeship programme', 'Job rotation'],
  sol: 'Programmed instruction (learning from material broken into small units in a logical order) is off the job. Coaching, apprenticeship and job rotation happen while doing the job.',
}));
Q('m_emp_benefit', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'Which is a benefit of training to the **employee** rather than to the organisation?',
  opts: [
    'Better career opportunities and higher earnings from improved skills',
    'Less wastage of materials and lower costs for the firm',
    'A ready supply of future managers for the firm',
    'Lower labour turnover in the firm',
  ],
  sol: 'Improved skills open better careers and higher pay for the employee. Lower wastage, a supply of future managers and lower turnover benefit the organisation.',
}));
Q('fb_programmed', fb({
  t: 5, d: 2, c: 'understanding',
  stem: 'Coaching, internship and job rotation are ___-the-job methods of training, while films and case studies are ___-the-job methods.',
  acc: [['on'], ['off']],
  sol: 'Coaching, internship and job rotation are on-the-job methods; films and case studies are off-the-job methods.',
}));
Q('tf_development', tf({
  t: 5, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Development is a wider concept than training, because it aims at the overall growth of the individual and not only at skill for the present job.',
  sol: 'Training builds job-related skills; development aims at the overall growth of the person and prepares them for future roles.',
}));
Q('ar_vestibule', ar({
  t: 5, d: 3, c: 'analysis', key: 'a',
  a: 'Vestibule training is preferred when employees must learn to handle costly or sophisticated machines.',
  r: 'In vestibule training, employees learn on equipment similar to the real one in a separate place, so their mistakes do not damage actual production.',
  sol: 'Both are true, and R explains A: the separate practice area protects expensive machines and the production line while trainees learn.',
}));
Q('ar_training_cost', ar({
  t: 5, d: 2, c: 'analysis', key: 'c',
  a: 'Training reduces absenteeism and labour turnover in an organisation.',
  r: 'Training is a waste of money because trained employees always leave the firm.',
  sol: 'A is true: trained, confident employees are more satisfied and stay. R is false: training is an investment that raises productivity; it does not make employees always leave.',
}));
Q('mt_methods', match({
  t: 5, d: 2, c: 'application',
  stem: 'Match each training method used by an imagined hospital chain with its description.',
  pairs: [
    ['Coaching', 'A senior nurse guides a new nurse on the ward and checks her work'],
    ['Computer modelling', 'Staff practise on a software simulation of a busy emergency ward'],
    ['Case study', 'Trainees analyse a written account of a past patient complaint and suggest solutions'],
    ['Classroom lectures', 'An expert explains infection-control rules to a group in a training room'],
  ],
  sol: 'Guidance by a superior on the job is coaching; a software simulation is computer modelling; analysing a real-life account is a case study; an expert talking to a group is a classroom lecture.',
}));
Q('s_train_dev', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between training and development on any two bases.',
  model: '1. **Meaning:** training increases **skills for a particular job**; development aims at the **overall growth** of the individual.\n2. **Focus:** training is **job-oriented** and for the present; development is **career-oriented** and prepares people for future roles.',
  sol: 'Two bases, both sides stated for each.',
  scheme: [['First basis, both sides', 1], ['Second basis, both sides', 1]],
}));
Q('s_on_off', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'How do on-the-job training methods differ from off-the-job methods? Give one example of each.',
  model: '**On-the-job** methods train employees **while they do the actual job** at the workplace, e.g. **coaching**. **Off-the-job** methods train them **away from the work floor**, in a separate place, e.g. **vestibule training** or classroom lectures.',
  sol: 'Contrast the place and manner of learning and give a correct example of each.',
  scheme: [['On-the-job with example', 1], ['Off-the-job with example', 1]],
}));
Q('s3_org_benefits', short({
  t: 5, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain any three benefits of training to an organisation.',
  model: '1. **Less wastage:** systematic learning is better than trial and error, so **time, money and materials** are saved.\n2. **Higher productivity:** trained employees produce more and better output, raising **profits**.\n3. **Future managers and stability:** training prepares people for **higher posts** and reduces **absenteeism and labour turnover**.',
  sol: 'Three benefits to the organisation, each explained.',
  scheme: [['First benefit', 1], ['Second benefit', 1], ['Third benefit', 1]],
}));
Q('s3_emp_benefits', short({
  t: 5, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain any three benefits of training to employees.',
  model: '1. **Better career:** improved skills and knowledge open chances of **promotion** and a better career.\n2. **Higher earnings:** better performance leads to **higher pay and incentives**.\n3. **Safety and morale:** trained workers handle machines efficiently, so there are **fewer accidents**, and they feel more **confident and satisfied** at work.',
  sol: 'Three benefits to the employee, each explained.',
  scheme: [['First benefit', 1], ['Second benefit', 1], ['Third benefit', 1]],
}));
Q('l_methods', long({
  t: 5, d: 4, c: 'application', marks: 5, wl: L5,
  stem: 'Swarna Airlines (imagined) needs to train new cabin crew to handle emergencies, new ground staff to use its booking software, and junior managers for senior roles. Suggest and explain a suitable training method for each group, and justify your choices.',
  model: '1. **Cabin crew, vestibule training:** they practise evacuations on a **mock-up cabin** in a separate hall, so mistakes cost nothing and flights are not disturbed.\n2. Emergencies need **realistic practice**, which vestibule training gives safely.\n3. **Ground staff, computer modelling or programmed instruction:** they learn the booking system on a **simulation** or in small logical steps before handling real passengers.\n4. **Junior managers, job rotation and coaching:** moving through departments gives a **broad view**, and a senior manager as coach guides them.\n5. **Justification:** each method fits the **risk and nature** of the job, so learning is safe, quick and effective.',
  sol: 'A suitable method for each group with a reason, and an overall justification.',
  scheme: [['Cabin crew method', 1], ['Reason for it', 1], ['Ground staff method', 1], ['Managers method', 1], ['Overall justification', 1]],
}));

// ================================================================ case-based (4 marks each)
Q('cb_bakery', caseQ({
  t: [3, 2], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the case and answer the questions that follow. *(Imagined business written by SOYL for practice.)*',
  passage: '**Annapurna Bakers, Indore (imagined)**\n\nAnnapurna Bakers is opening a second outlet. The owner, Meera Joshi, first worked out that the new outlet would need four bakers, six counter staff and two delivery riders. She moved her most experienced baker, Raghav, to head the new kitchen at a higher salary. For counter staff she put up a notice at the shop: "Wanted: counter staff. Walk in with your details on Monday." For delivery riders she contacted a government office that keeps a register of job seekers in the city.',
  parts: [
    child('a', short({ t: 2, d: 1, c: 'application', marks: 1, stem: 'Quote the line that shows the first step of the staffing process, and name the step.', model: '"She first worked out that the new outlet would need four bakers, six counter staff and two delivery riders": **estimating manpower requirements**.', sol: 'Working out the number and type of staff needed comes first.', scheme: [['Line and step', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Which internal source of recruitment did Meera use? Quote the line.', model: '**Promotion**: "She moved her most experienced baker, Raghav, to head the new kitchen at a higher salary."', sol: 'A higher post with higher pay from inside is promotion.', scheme: [['Promotion with line', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'application', marks: 2, stem: '**Either** (i): Identify the two external sources of recruitment used in the case, quoting the lines.', model: '(1) **Direct recruitment**: "she put up a notice at the shop: Wanted: counter staff. Walk in with your details on Monday." (2) **Employment exchange**: "she contacted a government office that keeps a register of job seekers in the city."', sol: 'A notice at the premises is direct recruitment; a government register of job seekers is the employment exchange.', scheme: [['Direct recruitment with line', 1], ['Employment exchange with line', 1]] }), [
      short({ t: 3, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): State one merit for the bakery of filling the head baker\'s post from inside, and one risk of doing so.', model: '**Merit:** Raghav\'s skill and loyalty are **already known**, and the promotion **motivates** other staff. **Risk:** the first outlet loses its best baker, and **no fresh ideas** come from outside.', sol: 'One merit and one limitation of promotion, applied to the bakery.', scheme: [['Merit', 1], ['Risk', 1]] }),
    ]),
  ],
}));
Q('cb_selection', caseQ({
  t: 4, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the case and answer the questions that follow. *(Imagined business written by SOYL for practice.)*',
  passage: '**Brahmaputra Tea Company, Jorhat (imagined)**\n\nThe company advertised for two estate supervisors and received 340 applications. Those without a diploma in agriculture were dropped at once. The rest took a written test on reasoning and numbers, and a test that asked how they would react to angry workers and to pressure. Twelve candidates then met a panel for a detailed discussion. The panel phoned the previous employers of the best five to check their conduct. The estate manager chose two of them, who were then checked by the company doctor.',
  parts: [
    child('a', mcq({ t: 4, d: 2, c: 'application', fixed: true, key: 'b', stem: 'Dropping applicants without a diploma is which step of selection?', opts: ['Employment interview', 'Preliminary screening', 'Selection decision', 'Job offer'], sol: 'Rejecting applicants who lack the minimum qualification, before any test, is preliminary screening.' })),
    child('b', short({ t: 4, d: 3, c: 'application', marks: 1, stem: 'Name the two selection tests described in the case.', model: 'An **intelligence test** (reasoning and numbers) and a **personality test** (reactions to angry workers and pressure).', sol: 'Reasoning and number ability point to intelligence; reactions and emotions point to personality.', scheme: [['Both tests named', 1]] })),
    child('c', short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Quote two lines that show two later steps of selection, naming each step.', model: '(1) "The panel phoned the previous employers of the best five to check their conduct": **reference and background checks**. (2) "who were then checked by the company doctor": **medical examination**.', sol: 'Phoning past employers is a reference check; the doctor\'s check is the medical examination.', scheme: [['First step with line', 1], ['Second step with line', 1]] }), [
      short({ t: 4, d: 3, c: 'understanding', marks: 2, stem: '**Or** (ii): Name the two steps that should follow the medical examination to complete the selection process, and state what each involves.', model: '(1) **Job offer**: a letter of appointment confirming the post and the joining date. (2) **Contract of employment**: a signed document stating duties, pay, hours, leave and terms of service.', sol: 'Job offer and contract of employment, in that order.', scheme: [['Job offer', 1], ['Contract of employment', 1]] }),
    ]),
  ],
}));
Q('cb_training', caseQ({
  t: 5, d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the case and answer the questions that follow. *(Imagined business written by SOYL for practice.)*',
  passage: '**Tungabhadra Motors, Hosapete (imagined)**\n\nTungabhadra Motors bought robotic welding machines. Before they touched the real line, new welders practised on an identical robot installed in a separate training hall. Final-year students of a nearby polytechnic spent six months in the plant, applying what they learnt in class. Fresh engineers were moved every two months between the paint shop, assembly and quality control. Each new supervisor worked with a senior manager who guided him and reviewed his decisions every week.',
  parts: [
    child('a', short({ t: 5, d: 2, c: 'application', marks: 1, stem: 'Identify the off-the-job method used for welders.', model: '**Vestibule training**: practice on an identical robot in a separate training hall.', sol: 'Training on similar equipment away from the real line is vestibule training.', scheme: [['Vestibule training', 1]] })),
    child('b', short({ t: 5, d: 2, c: 'application', marks: 1, stem: 'Name the method used for the polytechnic students.', model: '**Internship training**: a joint programme of an educational institution and a business, combining theory with practice.', sol: 'College study plus a spell in the plant is internship training.', scheme: [['Internship training', 1]] })),
    child('c', short({ t: 5, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify the two on-the-job methods used for engineers and supervisors, quoting the lines.', model: '(1) **Job rotation**: "Fresh engineers were moved every two months between the paint shop, assembly and quality control." (2) **Coaching**: "Each new supervisor worked with a senior manager who guided him and reviewed his decisions every week."', sol: 'Moving between departments is job rotation; guidance by a superior is coaching.', scheme: [['Job rotation with line', 1], ['Coaching with line', 1]] }), [
      short({ t: 5, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Give two benefits the company gets from this training effort.', model: '(1) **Less wastage and fewer accidents**: welders learn the costly robots without damaging the line. (2) **Future managers and productivity**: rotated engineers and coached supervisors gain wide skills, raising output and preparing them for **higher posts**.', sol: 'Two benefits to the organisation, linked to the case.', scheme: [['First benefit', 1], ['Second benefit', 1]] }),
    ]),
  ],
}));
Q('cb_hospital', caseQ({
  t: [3, 1], d: 4, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the case and answer the questions that follow. *(Imagined business written by SOYL for practice.)*',
  passage: '**Nilgiri Care Hospital, Ooty (imagined)**\n\nThe hospital has always filled senior posts by promotion. Last year it needed a head of its new cancer unit; no doctor inside had the training, so the post stayed empty for months and patients were sent to other cities. This year the board hired a specialist through a firm that searches for senior medical professionals for a fee. It also visited two nursing colleges to interview final-year students, and asked its own nurses to suggest friends for vacant posts.',
  parts: [
    child('a', short({ t: 3, d: 3, c: 'analysis', marks: 1, stem: 'Which limitation of relying only on internal sources does the case show?', model: '**No fresh talent**: no insider had the specialised training, so the cancer unit\'s post stayed empty.', sol: 'Internal sources cannot supply skills the firm does not already have.', scheme: [['Lack of fresh talent', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Name the source used to hire the specialist.', model: '**Placement agencies and management consultants**.', sol: 'A firm that searches for senior professionals for a fee is a placement agency or management consultant.', scheme: [['Placement agency or consultant', 1]] })),
    child('c', short({ t: [3, 1], d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Name the other two external sources the hospital used, and say how staffing helps its survival and growth.', model: '**Campus recruitment** (nursing colleges) and **recommendations of employees** (nurses suggesting friends). Proper staffing fills key posts with **competent people**, so the hospital can offer new services and keep patients, which ensures its **survival and growth**.', sol: 'Two sources, and the link between competent staff and growth.', scheme: [['Two sources named', 1], ['Link to survival and growth', 1]] }), [
      short({ t: 3, d: 4, c: 'evaluation', marks: 2, stem: '**Or** (ii): Should the hospital now stop promotions altogether? Give a reasoned answer.', model: '**No.** It should use **both**: promotions keep experienced staff **motivated and loyal**, while outside hiring brings **specialised skills** the hospital lacks. A mix balances morale with fresh talent.', sol: 'A justified judgement weighing the merits of internal and external sources.', scheme: [['Judgement', 1], ['Reasoning on both sources', 1]] }),
    ]),
  ],
}));
Q('cb_retail', caseQ({
  t: [2, 5], d: 3, c: 'application', origin: 'soyl-original',
  stem: 'Read the case and answer the questions that follow. *(Imagined business written by SOYL for practice.)*',
  passage: '**Kaveri Mart, Mysuru (imagined)**\n\nKaveri Mart\'s HR manager listed the 48 staff on the rolls, their skills and who would retire soon. She found that the chain needs 60 people for its new outlet plan. After hiring, new cashiers were introduced to their teams and shown the store rules on the first day. They also practised billing on a copy of the billing counter in the back room. At the end of the year, every cashier\'s speed and accuracy were compared with the standards set, and the best were moved to the post of floor supervisor.',
  parts: [
    child('a', num({ t: 2, d: 2, c: 'application', marks: 1, value: 12, unit: 'workers', stem: 'Using the figures in the case, how many more people does Kaveri Mart need (ignoring retirements)?', sol: 'Step 1: people needed = 60; people available = 48.\nStep 2: shortage = 60 − 48 = 12.' })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Quote the line that shows workforce analysis.', model: '"Kaveri Mart\'s HR manager listed the 48 staff on the rolls, their skills and who would retire soon."', sol: 'Listing the employees already available is workforce analysis.', scheme: [['Correct line', 1]] })),
    child('c', short({ t: [2, 5], d: 3, c: 'application', marks: 2, stem: '**Either** (i): Name the steps of staffing shown by "introduced to their teams and shown the store rules" and "compared with the standards set".', model: '(1) **Orientation** (with placement): introducing new staff to colleagues and rules. (2) **Performance appraisal**: comparing actual performance with the standards set.', sol: 'Induction to team and rules is orientation; comparing with standards is appraisal.', scheme: [['Orientation', 1], ['Performance appraisal', 1]] }), [
      short({ t: [5, 2], d: 3, c: 'application', marks: 2, stem: '**Or** (ii): Name the training method used for cashiers and the step of staffing shown by moving the best cashiers up.', model: '(1) **Vestibule training**: billing practice on a copy of the counter in a separate room. (2) **Promotion** (promotion and career planning).', sol: 'A copy of the real equipment in a separate place is vestibule training; moving to a higher post is promotion.', scheme: [['Vestibule training', 1], ['Promotion and career planning', 1]] }),
    ]),
  ],
}));
