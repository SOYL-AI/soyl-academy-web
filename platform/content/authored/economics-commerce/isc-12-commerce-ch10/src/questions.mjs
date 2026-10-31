// ISC 12 Commerce, ch10 Staffing — question bank. Every firm, person and situation is imagined and written by SOYL
// and labelled as such; no ISC or CBSE textbook illustration or exercise and no CISCE specimen or board item is
// reused (D-036). Firms, people and set-ups differ from CBSE 12 Business Studies ch06.
import { Q, mcq, ar, tf, fb, ord, match, short, long, caseQ, child } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 75];
const L5 = [100, 150];

// ================================================================ t01 Staffing: meaning, steps and importance
Q('m_meaning', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The new HR manager of the imagined Ambala Science Instruments describes her job as making sure every post on the organisation chart is filled with a suitable person, and stays filled as people retire or leave. This function is',
  opts: ['staffing', 'organising', 'controlling', 'planning'],
  sol: 'Filling the positions in the organisation structure with the right people, and keeping them filled, is staffing.',
}));
Q('m_estimate', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'Before hiring anyone, the HR head of the imagined Bhilwara Yarn Mills works out how many spinners the new machines will need and compares this with the number and skills of spinners already on the rolls. Which step of staffing is this?',
  opts: ['Estimating manpower requirements', 'Recruitment', 'Placement and orientation', 'Performance appraisal'],
  sol: 'Working out the people needed (workload) and those available (workforce) to find the gap is estimating manpower requirements, the first step of staffing.',
}));
Q('m_placement', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Revathi, newly selected by the imagined Hassan Coffee Curers, is put in charge of the moisture-testing laboratory, where her chemistry training fits best. Which step of staffing is this?',
  opts: ['Placement', 'Recruitment', 'Compensation', 'Estimating manpower requirements'],
  sol: 'Putting a selected person in the job for which she was chosen and is best suited is placement.',
}));
Q('m_appraisal', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Twice a year, supervisors at the imagined Pali Dye Works rate each dyer on colour accuracy, wastage and attendance against set standards, and discuss the ratings with the dyer. This step of staffing is',
  opts: ['performance appraisal', 'selection', 'orientation', 'recruitment'],
  sol: 'Judging an employee\'s performance against set standards and giving feedback is performance appraisal.',
}));
Q('m_compensation', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'The imagined Rajkot Diesel Engines revises its pay scales, introduces a yearly bonus and adds medical cover for families. Which step of staffing do these decisions belong to?',
  opts: ['Compensation', 'Training and development', 'Selection', 'Placement'],
  sol: 'Deciding pay and other direct and indirect benefits for employees is compensation.',
}));
Q('m_succession', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'The imagined Durg Steel Fabricators trains a deputy for every senior post. When two plant managers retired in the same month, work went on without a break. Which importance of staffing does this show?',
  opts: ['It ensures continued survival and growth through succession planning', 'It removes the need for training', 'It reduces the need for planning', 'It makes recruitment unnecessary'],
  sol: 'Developing people to take over key posts keeps the firm running and growing when managers leave: succession planning.',
}));
Q('m_steps_combo', mcq({
  t: 1, d: 3, c: 'analysis', fixed: true, key: 'd',
  stem: 'A Class 12 student at an imagined school in Ambala lists four activities:\nP. Recruitment.\nQ. Departmentalisation.\nR. Training and development.\nS. Performance appraisal.\nWhich of these are steps in the **staffing** process?',
  opts: ['P and Q only', 'Q and R only', 'P, Q, R and S', 'P, R and S'],
  sol: 'Recruitment (P), training and development (R) and performance appraisal (S) are steps of staffing. Departmentalisation (Q) is a step of organising.',
}));
Q('ar_staffing', ar({
  t: 1, d: 3, c: 'understanding',
  a: 'Even the owner of a small firm with no HR department must perform staffing.',
  r: 'The manager of a small firm has to choose, train and appraise the people in the team.',
  key: 'a',
  sol: 'Both are true, and the reason explains the assertion: staffing is part of every manager\'s job, so a small-firm owner does it herself.',
}));
Q('tf_staff', tf({
  t: 1, d: 2, c: 'understanding',
  stem: 'Staffing ends as soon as a candidate is selected and appointed.',
  ans: false,
  sol: 'False. Staffing continues with placement, training, appraisal, promotion and compensation, and posts must be refilled as people leave: it is a continuous function.',
}));
Q('fb_staff', fb({
  t: 1, d: 3, c: 'analysis',
  stem: 'Complete the analogy. Controlling : comparing results with standards :: Staffing : managing the ___ element of the organisation',
  acc: [['human', 'human resource', 'people']],
  sol: 'Controlling compares results with standards; staffing is the function that deals with the human element, the people of the organisation.',
}));
Q('s_meaning', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is staffing? Why is it described as a continuous function?',
  model: '**Staffing** means **getting the right people** into every post on the organisation chart and **keeping those posts filled** over time. It is **continuous** because people **retire, resign or are promoted**, and the firm grows, so posts must be filled again and again.',
  sol: 'Meaning and reason for continuity.',
  scheme: [['Meaning', 1], ['Why continuous', 1]],
}));
Q('s_imp2', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'At the imagined Bhilwara Yarn Mills, some sections had idle workers while others ran short, and two skilled spinners left for better jobs. State two ways in which proper staffing could help.',
  model: '1. **Optimum use of human resources:** estimating needs correctly **prevents over-manning and shortages** in different sections.\n2. **Job satisfaction and morale:** fair pay, training and promotion chances help **keep skilled spinners**.',
  sol: 'Two points of importance linked to the mill.',
  scheme: [['First point', 1], ['Second point', 1]],
}));
Q('s3_steps', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'The imagined Hassan Coffee Curers has just selected five new quality checkers. Explain three steps of staffing that should now follow, with an example of each.',
  model: '1. **Placement and orientation:** put each checker in the **section that suits her**, and introduce her to the team, the rules and the curing yard.\n2. **Training and development:** teach the **firm\'s grading method** and, later, build skills for higher posts.\n3. **Performance appraisal:** after six months, **rate each checker** against standards such as accuracy, and give feedback.',
  sol: 'Three later steps of staffing applied to the checkers.',
  scheme: [['First step', 1], ['Second step', 1], ['Third step', 1]],
}));
Q('s3_importance', short({
  t: 1, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain three points of importance of staffing for an organisation.',
  model: '1. **Obtains competent personnel:** it helps **discover and get** capable people for different jobs.\n2. **Higher performance:** putting the **right person in the right job** raises efficiency and output.\n3. **Continued survival and growth:** through **succession planning**, trained people are ready to take over when managers retire or leave.',
  sol: 'Any three points (competent personnel, higher performance, survival and growth, optimum use of people, job satisfaction) explained.',
  scheme: [['First point', 1], ['Second point', 1], ['Third point', 1]],
}));
Q('l_steps', long({
  t: 1, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'The imagined Kolar Silk Reelers is setting up a new reeling unit that will employ forty people. Explain five steps of the staffing process it should follow, in order, with an example of each.',
  model: '1. **Estimating manpower requirements:** work out that the unit needs, say, **30 reelers, 6 helpers and 4 supervisors**, and compare with staff who could be shifted.\n2. **Recruitment:** **advertise** locally and ask **employees to recommend** skilled reelers, so many suitable people apply.\n3. **Selection:** screen applicants, give a **reeling test** and interview them, then choose the best.\n4. **Placement and orientation:** put each person in a **suitable job** and introduce them to the unit, the team and safety rules.\n5. **Training and development:** train reelers in the **unit\'s machines** and prepare supervisors for higher posts. Later steps are appraisal, promotion and compensation.',
  sol: 'Five steps in order, each with an example for the reeling unit.',
  scheme: [['Estimating requirements', 1], ['Recruitment', 1], ['Selection', 1], ['Placement and orientation', 1], ['Training and development', 1]],
}));

// ================================================================ t02 Recruitment: internal and external sources
Q('m_recruit_meaning', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The imagined Mirzapur Carpets advertises in local papers, visits weaving schools and asks its weavers to tell friends about openings, so that many suitable people apply. This activity is',
  opts: ['recruitment', 'selection', 'placement', 'training'],
  sol: 'Searching for prospective employees and encouraging them to apply is recruitment.',
}));
Q('m_promotion', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'When the quality supervisor of the imagined Nellore Aqua Feeds retired, the most experienced feed tester was moved up to the post with higher pay and status. This is',
  opts: ['promotion, an internal source', 'transfer, an internal source', 'casual callers, an external source', 'campus recruitment, an external source'],
  sol: 'Moving an employee to a higher post with more pay, status and responsibility is promotion, an internal source of recruitment.',
}));
Q('m_web', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'The imagined Ambala Science Instruments posts its openings for lab technicians on a job portal, and candidates upload their applications online. Which source of recruitment is this?',
  opts: ['Web publishing, an external source', 'Promotion, an internal source', 'Employment exchange', 'Labour contractor'],
  sol: 'Advertising vacancies on internet job sites and receiving applications online is web publishing, an external source.',
}));
Q('m_contractor', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'For a two-month rush to load coir bales onto ships, the imagined Kakinada Port Logistics asks a contractor to supply forty loaders at short notice. Which source of recruitment is this?',
  opts: ['Labour contractors', 'Campus recruitment', 'Promotion', 'Placement agencies'],
  sol: 'Contractors who supply unskilled or semi-skilled workers, often for short periods, are labour contractors.',
}));
Q('m_internal_limit', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'For ten years the imagined Nellore Aqua Feeds has filled every senior post by promotion. Its products now look old-fashioned beside those of rivals who hire experts from outside. Which limitation of internal sources does this show?',
  opts: ['Fresh talent and new ideas do not enter the firm', 'It is too costly and slow', 'It lowers the morale of existing staff', 'It cannot be used in any firm'],
  sol: 'Relying only on internal sources keeps out new people with fresh skills and ideas.',
}));
Q('m_ext_combo', mcq({
  t: 2, d: 3, c: 'analysis', fixed: true, key: 'b',
  stem: 'An HR officer of the imagined Mirzapur Carpets lists four claims about external sources of recruitment:\nP. They bring in fresh talent.\nQ. They offer a wider choice of candidates.\nR. They are always cheaper and quicker than internal sources.\nS. They create a competitive spirit among existing staff.\nWhich claims are correct?',
  opts: ['P and R only', 'P, Q and S', 'Q, R and S', 'P, Q, R and S'],
  sol: 'Fresh talent (P), wider choice (Q) and competitive spirit (S) are merits of external sources. R is wrong: external recruitment is usually costlier and slower.',
}));
Q('ar_internal', ar({
  t: 2, d: 2, c: 'understanding',
  a: 'Internal recruitment is generally quicker and cheaper than external recruitment.',
  r: 'Internal candidates are already known to the firm, so less advertising and checking is needed.',
  key: 'a',
  sol: 'Both are true, and the reason explains the assertion: known candidates need little searching or screening, which saves time and money.',
}));
Q('ar_external_d', ar({
  t: 2, d: 3, c: 'analysis',
  a: 'Transfers bring fresh talent from outside into the organisation.',
  r: 'Promotion is an external source of recruitment.',
  key: 'd',
  sol: 'Both are false. A transfer moves an existing employee to another post, so no outside talent enters; and promotion is an internal source.',
}));
Q('tf_recruit', tf({
  t: 2, d: 2, c: 'understanding',
  stem: 'Recruitment is called a positive process because it encourages as many suitable people as possible to apply.',
  ans: true,
  sol: 'True. Recruitment widens the pool of applicants, whereas selection narrows it by rejecting the unsuitable.',
}));
Q('fb_recruit', fb({
  t: 2, d: 2, c: 'understanding',
  stem: 'Complete the analogy. Promotion : internal source :: Campus recruitment : ___ source',
  acc: [['external']],
  sol: 'Promotion fills a post from within the firm (internal); campus recruitment brings in people from colleges (external).',
}));
Q('mt_sources', match({
  t: 2, d: 3, c: 'application', marks: 2,
  stem: 'Match each way in which the imagined Mirzapur Carpets finds staff with its source of recruitment.',
  pairs: [
    ['Weavers suggest skilled relatives and friends', 'Recommendations of employees'],
    ['People drop in at the office asking for work, and their forms are kept on file', 'Casual callers'],
    ['Vacancies are notified to the government office that keeps a register of job seekers', 'Employment exchange'],
    ['A finished-goods manager is shifted from the Bhadohi unit to the Mirzapur unit at the same pay', 'Transfer'],
  ],
  sol: 'Suggestions by staff are employee recommendations; walk-in applicants are casual callers; the government register is the employment exchange; moving a manager at the same level is a transfer.',
}));
Q('s_new_firm', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'The imagined Kolar Silk Reelers has just opened its first unit. Give two reasons why it must rely on external sources of recruitment.',
  model: '1. **No existing staff:** a new firm has **no employees** to promote or transfer, so internal sources cannot fill posts.\n2. **Wide range of skills needed:** it needs reelers, supervisors and accountants at once, so it must search a **wide pool** outside.',
  sol: 'Two valid reasons.',
  scheme: [['First reason', 1], ['Second reason', 1]],
}));
Q('s_sources2', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'Suggest a suitable source of recruitment for each post at the imagined Kakinada Port Logistics, with a reason: (i) thirty loaders for a six-week rush; (ii) a head of finance with rare port-industry experience.',
  model: '(i) **Labour contractors:** they can supply many **unskilled workers quickly** for a short period.\n(ii) **Placement agency or management consultant:** they can **search, screen** and find a **rare senior specialist**, saving the firm time.',
  sol: 'A suitable source with a reason for each post.',
  scheme: [['(i) Source with reason', 1], ['(ii) Source with reason', 1]],
}));
Q('s3_external', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain advertisement, campus recruitment and labour contractors as external sources of recruitment, stating the kind of post each suits.',
  model: '1. **Advertisement:** vacancies are announced in **newspapers, journals or online**; suits **senior and skilled** posts needing a wide choice.\n2. **Campus recruitment:** firms visit **colleges and institutes** to test and hire final-year students; suits **trainee** posts for technical and managerial jobs.\n3. **Labour contractors:** contractors **supply workers** on demand; suit **unskilled and semi-skilled** posts, often for short periods.',
  sol: 'Each source explained with the posts it suits.',
  scheme: [['Advertisement', 1], ['Campus recruitment', 1], ['Labour contractors', 1]],
}));
Q('s3_internal', short({
  t: 2, d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: 'The imagined Nellore Aqua Feeds wants to fill the post of head of research by promoting its senior feed tester. Evaluate this choice with three points.',
  model: '1. **For — morale and loyalty:** promotion **rewards** long service and motivates other staff.\n2. **For — known and quick:** the tester\'s **ability is already known**, and no costly search is needed.\n3. **Against — no fresh ideas:** research needs **new knowledge**; an outsider may bring fresh methods. **Verdict:** promote only if the tester has the required **research skills**; otherwise search outside.',
  sol: 'Points for and against leading to a verdict.',
  scheme: [['First point', 1], ['Second point', 1], ['Third point with verdict', 1]],
}));
Q('l_recruit', long({
  t: 2, d: 3, c: 'application', marks: 5, wl: L5,
  stem: '(a) Distinguish between internal and external sources of recruitment on two bases. [2]\n(b) The imagined Kakinada Port Logistics needs (i) a general manager for a new port terminal, (ii) fifty loaders for one season, and (iii) six trainee accountants. Suggest the most suitable source for each, with a reason. [3]',
  model: '(a) 1. **Where candidates come from:** internal sources fill posts **from within** (promotion, transfer); external sources look **outside** the firm.\n2. **Cost and fresh talent:** internal sources are **quicker and cheaper** but bring no new ideas; external sources cost more but bring **fresh talent** and wider choice.\n\n(b) (i) **Advertisement or placement agency/consultant:** a senior post needs a **wide search** for experienced candidates, which an agency can screen.\n(ii) **Labour contractors:** they supply **many unskilled workers quickly** for a short period.\n(iii) **Campus recruitment:** commerce colleges offer **trained graduates** who can be tested and hired as a group.',
  sol: 'Two bases of difference; a suitable source with a reason for each post.',
  scheme: [['(a) Two bases', 2], ['(b) Three sources with reasons', 3]],
}));

// ================================================================ t03 Selection: procedure; recruitment versus selection
Q('m_screening', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Applicants for trainee coffee-tasters at the imagined Hassan Coffee Curers first fill in a short form and have a ten-minute chat at the gate; those clearly unsuitable are told politely that they will not be considered. This step of selection is',
  opts: ['preliminary screening', 'the employment interview', 'the medical examination', 'the job offer'],
  sol: 'The first step, which weeds out clearly unsuitable applicants quickly, is preliminary screening.',
}));
Q('m_trade_test', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Applicants for welder posts at the imagined Durg Steel Fabricators are asked to join two steel plates while a supervisor checks the strength and finish of the joint. Which selection test is this?',
  opts: ['Trade test', 'Intelligence test', 'Interest test', 'Personality test'],
  sol: 'A test of the skill and knowledge a candidate already has in a trade is a trade test.',
}));
Q('m_intelligence', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'Candidates for management trainee posts at the imagined Ambala Science Instruments take a written test of reasoning, memory and working with numbers. Which selection test is this?',
  opts: ['Intelligence test', 'Trade test', 'Interest test', 'Medical test'],
  sol: 'A test of mental abilities such as reasoning, memory and numerical skill measures intelligence.',
}));
Q('m_interest', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'A questionnaire used by the imagined Rajkot Diesel Engines finds out whether each candidate enjoys working with machines, with people or with numbers. Which selection test is this?',
  opts: ['Interest test', 'Aptitude test', 'Trade test', 'Intelligence test'],
  sol: 'A test that finds a person\'s likes and preferences for kinds of work is an interest test.',
}));
Q('m_reference', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Before appointing a cashier, the imagined Tirunelveli Halwa House contacts the bank where she worked earlier and asks about her honesty and conduct. Which step of selection is this?',
  opts: ['Reference and background checks', 'Preliminary screening', 'Placement', 'Selection tests'],
  sol: 'Verifying a candidate\'s past record and character with former employers and referees is a reference and background check.',
}));
Q('m_medical', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'The imagined Kakinada Port Logistics offers a crane operator\'s post to Sunil, subject to his passing a check of eyesight and general fitness. Which step of selection is this?',
  opts: ['Medical examination', 'Employment interview', 'Preliminary screening', 'Contract of employment'],
  sol: 'Checking that a chosen candidate is physically fit for the job is the medical examination.',
}));
Q('m_rec_sel_combo', mcq({
  t: 3, d: 4, c: 'analysis', fixed: true, key: 'a',
  stem: 'Read these statements about recruitment and selection:\nP. Recruitment comes before selection.\nQ. Recruitment is a positive process; selection is a negative process.\nR. Selection aims to widen the pool of applicants.\nS. Selection uses tests and interviews to choose the most suitable candidate.\nWhich statements are correct?',
  opts: ['P, Q and S', 'P and R only', 'Q, R and S', 'P, Q, R and S'],
  sol: 'P, Q and S are correct. R is wrong: it is recruitment that widens the pool; selection narrows it by rejecting the unsuitable.',
}));
Q('ord_selection', ord({
  t: 3, d: 2, c: 'application', marks: 2,
  stem: 'The imagined Tirunelveli Halwa House is hiring a store manager. Arrange its selection steps in the correct order.',
  items: [
    'Sort applications and reject those without retail experience',
    'Give a short test on stock records',
    'Interview the shortlisted candidates',
    'Contact former employers about the best candidate',
    'Decide to appoint her',
    'Arrange a health check-up',
    'Send her a letter offering the post',
    'Both sides sign the terms of employment',
  ],
  sol: 'Preliminary screening, selection tests, employment interview, reference and background checks, selection decision, medical examination, job offer and contract of employment.',
}));
Q('ar_selection', ar({
  t: 3, d: 2, c: 'understanding',
  a: 'Selection is often described as a negative process.',
  r: 'It rejects unsuitable candidates in order to choose the best.',
  key: 'a',
  sol: 'Both are true, and the reason explains the assertion: selection works by turning away more candidates than it accepts.',
}));
Q('ar_sel_c', ar({
  t: 3, d: 3, c: 'analysis',
  a: 'The employment interview is an important step in selection.',
  r: 'The interview is always the very first step of the selection process.',
  key: 'c',
  sol: 'The assertion is true: the interview lets the employer judge suitability face to face. The reason is false: selection begins with preliminary screening, and tests usually come before the interview.',
}));
Q('tf_sel', tf({
  t: 3, d: 2, c: 'understanding',
  stem: 'In the selection process, reference checks are carried out before any tests or interviews.',
  ans: false,
  sol: 'False. References and background are checked after the tests and interview, for the candidates who are likely to be chosen.',
}));
Q('fb_sel', fb({
  t: 3, d: 2, c: 'understanding',
  stem: 'Complete the analogy. Joining two steel plates : trade test :: Questions on reasoning, memory and numbers : ___ test',
  acc: [['intelligence']],
  sol: 'A practical welding task tests existing trade skill; reasoning, memory and number questions make up an intelligence test.',
}));
Q('s_rec_sel', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between recruitment and selection on two bases.',
  model: '1. **Purpose:** recruitment **attracts** as many suitable candidates as possible to apply; selection **chooses** the most suitable among them.\n2. **Nature and order:** recruitment is **positive** and comes **first**; selection is **negative**, rejecting many, and comes **after** recruitment.',
  sol: 'Two valid bases of difference.',
  scheme: [['First basis', 1], ['Second basis', 1]],
}));
Q('s_tests', short({
  t: 3, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Name the selection test the imagined Durg Steel Fabricators should use in each case, with a reason: (i) to check whether a fitter can already assemble a gearbox; (ii) to find whether school-leavers have the potential to learn machining quickly.',
  model: '(i) **Trade test:** it checks the **skill a candidate already has** in a trade.\n(ii) **Aptitude test:** it measures a person\'s **potential to learn** new skills quickly.',
  sol: 'Correct test with a reason for each case.',
  scheme: [['(i) Trade test with reason', 1], ['(ii) Aptitude test with reason', 1]],
}));
Q('s3_selection', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'The imagined Pali Dye Works received 300 applications for the post of colour technician. Explain the first three steps of selection it should follow, with an example of each.',
  model: '1. **Preliminary screening:** reject applicants who lack the **required diploma** or experience, leaving a manageable list.\n2. **Selection tests:** give a **trade test** on matching shades and an **aptitude test** for learning new dyes.\n3. **Employment interview:** a panel meets the shortlisted candidates to judge **knowledge, communication and fit** with the dye house.',
  sol: 'The first three steps applied to the dye works.',
  scheme: [['Preliminary screening', 1], ['Selection tests', 1], ['Employment interview', 1]],
}));
Q('l_selection', long({
  t: 3, d: 3, c: 'application', marks: 5, wl: L5,
  stem: 'The imagined Kolar Silk Reelers has shortlisted six candidates for the post of quality supervisor after preliminary screening. Explain the next five steps of selection it should follow, in order, with an example of each.',
  model: '1. **Selection tests:** a **trade test** on judging silk grades and an **intelligence test** of reasoning.\n2. **Employment interview:** a panel asks about **experience, problem solving and handling workers**.\n3. **Reference and background checks:** the firm contacts **former employers** about the best candidate\'s honesty and record.\n4. **Selection decision:** the panel **chooses** the candidate who did best overall in tests, interview and checks.\n5. **Medical examination:** the chosen candidate\'s **eyesight and fitness** are checked, since grading silk needs good vision.\nThe **job offer** and **contract of employment** then complete selection.',
  sol: 'Five steps after screening, in order, each applied to the reeling firm.',
  scheme: [['Selection tests', 1], ['Interview', 1], ['Reference checks', 1], ['Selection decision', 1], ['Medical examination', 1]],
}));

// ================================================================ t04 Training and development
Q('m_train_dev', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'The imagined Rajkot Diesel Engines sends its future plant heads on a year-long programme in leadership, decision making and handling change. This programme is mainly an example of',
  opts: ['development', 'training for one specific job', 'recruitment', 'placement'],
  sol: 'Development aims at the overall growth of a person, preparing him or her for higher responsibilities, beyond the skills of one job.',
}));
Q('m_vestibule', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'New crane operators at the imagined Kakinada Port Logistics practise on a crane simulator set up in a separate training hall before they handle real cranes on the docks. This method of training is',
  opts: ['vestibule training', 'apprenticeship', 'coaching', 'internship'],
  sol: 'Training on equipment set up away from the actual workplace, so that costly mistakes are avoided, is vestibule training.',
}));
Q('m_apprentice', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Young weavers at the imagined Mirzapur Carpets work at the loom for three years under a master weaver, earning a stipend while they learn the craft. This method of training is',
  opts: ['apprenticeship', 'vestibule training', 'a case study', 'a classroom lecture'],
  sol: 'Learning a skilled trade over a long period under the guidance of a master worker, while being paid, is apprenticeship.',
}));
Q('m_coaching', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'At the imagined Pali Dye Works, the chief chemist meets a junior chemist every morning, sets her small targets and gives feedback on her colour recipes. This method is',
  opts: ['coaching', 'vestibule training', 'apprenticeship', 'a lecture'],
  sol: 'A superior guiding and advising a trainee one to one, with goals and feedback, is coaching, an on-the-job method.',
}));
Q('m_offjob_combo', mcq({
  t: 4, d: 3, c: 'analysis', fixed: true, key: 'c',
  stem: 'The training plan of the imagined Hassan Coffee Curers lists four methods:\nP. Case studies of past quality failures.\nQ. Coaching by the head taster.\nR. Practice on a model roaster in a training room.\nS. Apprenticeship under a master curer.\nWhich of these are **off-the-job** methods?',
  opts: ['P and Q only', 'Q and S only', 'P and R only', 'P, Q, R and S'],
  sol: 'Case studies (P) and practice on a model roaster away from the real line, that is vestibule training (R), are off-the-job. Coaching (Q) and apprenticeship (S) are on-the-job.',
}));
Q('ar_dev_b', ar({
  t: 4, d: 3, c: 'analysis',
  a: 'Development aims at the overall growth of an individual.',
  r: 'Apprenticeship is an on-the-job method of training.',
  key: 'b',
  sol: 'Both statements are true, but the reason, about one training method, does not explain why development is broader than training.',
}));
Q('tf_train', tf({
  t: 4, d: 1, c: 'understanding',
  stem: 'Coaching is an off-the-job method of training.',
  ans: false,
  sol: 'False. Coaching takes place while the trainee works on the actual job, under a superior\'s guidance, so it is an on-the-job method.',
}));
Q('fb_train', fb({
  t: 4, d: 1, c: 'understanding',
  stem: 'Complete the analogy. Apprenticeship : on-the-job method :: Classroom lectures : ___ method',
  acc: [['off-the-job', 'off the job', 'off-job']],
  sol: 'Apprenticeship is learning while doing the job; classroom lectures happen away from the job, so they are an off-the-job method.',
}));
Q('s_train_dev', short({
  t: 4, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'Give one example each of training and of development from an imagined cooperative bank in Kolhapur, and state the difference they show.',
  model: '**Training:** teaching new clerks to use the **bank\'s loan software**. **Development:** a programme in **leadership** for officers who may become branch managers. Training builds **skills for a specific job**; development aims at **overall growth** for future roles.',
  sol: 'An example of each with the difference.',
  scheme: [['Two examples', 1], ['Difference stated', 1]],
}));
Q('s3_methods', short({
  t: 4, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'The imagined Rajkot Diesel Engines must train (i) new assemblers who will handle costly testing rigs, (ii) a promising junior engineer who needs daily guidance, and (iii) diploma students who spend six months at the plant during their course. Suggest a method of training for each, with a reason.',
  model: '(i) **Vestibule training:** assemblers practise on **rigs set up away from the line**, so costly mistakes do not damage real engines.\n(ii) **Coaching:** a senior engineer **guides him daily**, setting goals and giving feedback on the actual job.\n(iii) **Internship:** a joint programme with the **institute**, in which students combine study with practical work at the plant.',
  sol: 'A suitable method with a reason for each group.',
  scheme: [['(i) Vestibule training', 1], ['(ii) Coaching', 1], ['(iii) Internship', 1]],
}));
Q('s3_benefits', short({
  t: 4, d: 2, c: 'application', marks: 3, wl: S3,
  stem: 'Explain three benefits of training to the employees of the imagined Pali Dye Works.',
  model: '1. **Better skills and knowledge:** dyers learn **new colour recipes and machines**, so they do their work better.\n2. **Higher earnings and career growth:** improved performance leads to **bonuses and promotion**.\n3. **Fewer accidents and more confidence:** knowing the **safe way** to handle dyes and chemicals reduces accidents and raises morale.',
  sol: 'Three benefits to employees explained.',
  scheme: [['First benefit', 1], ['Second benefit', 1], ['Third benefit', 1]],
}));
Q('s3_offjob', short({
  t: 4, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain three off-the-job methods of training, giving an example of each from an imagined hotel in Gangtok.',
  model: '1. **Classroom lectures:** talks on **hygiene rules** or guest handling for new staff in a training room.\n2. **Case study:** trainees **analyse a real complaint** that went wrong and suggest better responses.\n3. **Vestibule training:** new front-desk staff practise on a **copy of the booking system** in a separate room before facing guests.',
  sol: 'Three off-the-job methods with hotel examples.',
  scheme: [['First method', 1], ['Second method', 1], ['Third method', 1]],
}));
Q('l_training', long({
  t: [4, 3], d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'The imagined Hassan Coffee Curers is opening a new roasting plant with costly machines. Its owner wants all new staff to "learn on the real machines from day one".\n(a) Distinguish between on-the-job and off-the-job methods of training on two bases. [2]\n(b) Evaluate the owner\'s plan and suggest a better mix of methods. [3]',
  model: '(a) 1. **Place:** on-the-job training happens **at the actual workplace** while doing the job; off-the-job training happens **away from it**, such as in a classroom or training hall.\n2. **Cost of mistakes:** on-the-job methods are practical but **mistakes affect real output**; off-the-job methods let trainees **learn safely** but may feel less realistic.\n\n(b) The plan is **risky**: beginners on **costly roasting machines** may damage them or waste coffee. A better mix: **vestibule training** on a model roaster first, so mistakes cost little; then **coaching** by senior roasters on the real line; and short **lectures or case studies** on quality and safety. This combines safety with real practice.',
  sol: 'Two bases of difference; a reasoned evaluation of the plan with a better mix of methods.',
  scheme: [['(a) Two bases', 2], ['(b) Evaluation of the plan', 1], ['(b) Better mix with reasons', 2]],
}));

// ================================================================ case-based
Q('cb_hassan', caseQ({
  t: [2, 3], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined firm and people, written by SOYL for practice.)*',
  passage: '**Hassan Coffee Curers (imagined), Karnataka**\n\nHassan Coffee Curers needed a new curing supervisor and twelve sorters. It promoted Mahesh, its senior sorter, to supervisor. For the sorters, it placed a notice in local papers and on a job portal, and 400 people applied. Those without basic schooling were turned away at once. The rest sorted a tray of mixed beans while an expert watched. Shortlisted candidates were interviewed, and the firm phoned their earlier employers before deciding.',
  parts: [
    child('a', mcq({ t: 2, d: 2, c: 'application', stem: 'Filling the supervisor\'s post by promoting Mahesh uses which source of recruitment?', opts: ['Internal source', 'External source', 'Labour contractor', 'Campus recruitment'], sol: 'Promotion fills a post from within the firm: an internal source.' })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Name the selection test shown by "sorted a tray of mixed beans while an expert watched".', model: '**Trade test.**', sol: 'Testing a skill the candidate already has: a trade test.', scheme: [['Trade test', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Identify two other steps of selection from the passage, quoting the words.', model: '1. **Preliminary screening:** "**Those without basic schooling were turned away at once**".\n2. **Reference and background checks:** "**phoned their earlier employers**".', sol: 'Two steps with supporting words.', scheme: [['First step with words', 1], ['Second step with words', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Identify two external sources of recruitment used for the sorters, and state one merit of using them.', model: '**Advertisement** ("notice in local papers") and **web publishing** ("job portal"). **Merit:** a **wide choice** — 400 applicants — from which the best sorters could be chosen.', sol: 'Two external sources and one merit.', scheme: [['Two sources', 1], ['Merit', 1]] }),
    ]),
  ],
}));
Q('cb_mirzapur', caseQ({
  t: 4, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: 'Read the passage and answer the questions that follow. *(Imagined firm and people, written by SOYL for practice.)*',
  passage: '**Mirzapur Carpets (imagined), Uttar Pradesh**\n\nMirzapur Carpets trains its people in several ways. Young weavers work for three years under master weavers. New dyeing staff first practise on a small dye vat in a separate shed before working on the main line. Design students from a nearby institute spend six months at the firm as part of their course. Promising supervisors attend a year-long programme on leadership and export markets to prepare them for top posts.',
  parts: [
    child('a', mcq({ t: 4, d: 2, c: 'application', stem: 'Practising on a small dye vat in a separate shed before working on the main line is', opts: ['vestibule training', 'apprenticeship', 'coaching', 'job rotation'], sol: 'Training on equipment set up away from the actual line is vestibule training.' })),
    child('b', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Name the method of training used for the young weavers.', model: '**Apprenticeship.**', sol: 'Learning a trade over years under a master is apprenticeship.', scheme: [['Apprenticeship', 1]] })),
    child('c', short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Is the supervisors\' programme training or development? Explain.', model: '**Development.** It aims at **overall growth** — leadership and export knowledge — to prepare them for **future top posts**, not just the skills of their present job.', sol: 'Development identified and explained.', scheme: [['Identified', 1], ['Explanation', 1]] }), [
      short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Name the method used for the design students, and state one benefit of it to the firm.', model: '**Internship.** **Benefit:** the firm can **observe students at work** and later hire the best, who already know its designs.', sol: 'Internship with one benefit.', scheme: [['Method', 1], ['Benefit', 1]] }),
    ]),
  ],
}));
