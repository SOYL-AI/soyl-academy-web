// Build ISC 12 Commerce ch06 Nature and Significance of Management. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-commerce-ch06/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('isc-12-commerce-ch06', 'economics-commerce');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- visuals
const vRoute1 = flow('LR', ['Four meanings', 'Objectives', 'Characteristics'], 'Route map of Part 1: the four meanings of management, its objectives and its characteristics', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Science?', 'Art?', 'Profession?', 'Importance', 'Levels'], 'Route map of Part 2: management as a science, an art and a profession, its importance, and the levels of management', 'Part 2 at a glance');

const vMeanings = table(
  ['Management as…', 'What it means', 'You hear it as…'],
  [
    ['An activity', 'What managers do: interpersonal, informational and decisional tasks', 'A manager\'s busy day'],
    ['A group', 'The body of persons who manage an organisation', '"The management has decided…"'],
    ['A discipline', 'An organised field of study with its own principles', '"I am studying management"'],
    ['A process', 'A chain of functions: plan, organise, staff, direct, control', 'How work moves from idea to result'],
  ],
  'Table of the four meanings of management: as an activity, a group, a discipline and a process, with what each means and how it is heard',
);
const vProcess = flow('LR', ['Planning', 'Organising', 'Staffing', 'Directing', 'Controlling'], 'Flow of the five functions of management in order: planning, organising, staffing, directing and controlling, with controlling feeding back into planning', 'Controlling feeds back into the next round of planning.', [
  { from: 'n1', to: 'n2' }, { from: 'n2', to: 'n3' }, { from: 'n3', to: 'n4' }, { from: 'n4', to: 'n5' }, { from: 'n5', to: 'n1' },
]);
const vMeaningEx = table(
  ['Imagined sentence', 'Clue', 'Sense'],
  [
    ['"Management has fixed the new shift timings" (a bakery notice)', 'People who decide', 'Group'],
    ['"He teaches management at a college in Ranchi"', 'A subject', 'Discipline'],
    ['"First we plan the stall, then we assign volunteers, then we check sales"', 'A chain of steps', 'Process'],
    ['"She spent the day meeting suppliers and choosing a vendor"', 'Tasks a manager does', 'Activity'],
  ],
  'Worked table: four imagined sentences, the clue in each, and the sense of management it uses',
  'Look for the clue: people, a subject, a chain of steps, or tasks.',
);
const vActivity = table(
  ['Kind of activity', 'What the manager does', 'Imagined example'],
  [
    ['Interpersonal', 'Deals with people inside and outside', 'Meets a buyer; settles a quarrel'],
    ['Informational', 'Receives and passes on information', 'Shares news of a craft fair'],
    ['Decisional', 'Takes decisions', 'Chooses which order to accept'],
  ],
  'Table of the three kinds of managerial activity, interpersonal, informational and decisional, with an imagined example of each',
);
const vObjectives = table(
  ['Kind', 'Includes', 'Imagined example'],
  [
    ['Organisational', 'Survival, profit, growth', 'A trekking firm cuts costs to stay open in a bad year'],
    ['Social', 'Benefit to society: safe products, jobs, clean environment', 'A seafood exporter treats its waste water'],
    ['Personal', 'Employees\' financial, social and higher-level needs', 'A spice firm pays for evening classes for workers'],
  ],
  'Table of the three kinds of objectives of management, what each includes and an imagined example',
);
const vObjEx = table(
  ['Aim of an imagined pickle cooperative in Rajahmundry', 'Kind of objective'],
  [
    ['Earn enough in the mango season to last the year', 'Organisational: survival'],
    ['Start selling in two new states', 'Organisational: growth'],
    ['Buy mangoes at fair prices from small growers', 'Social'],
    ['Give each member a bonus and a chance to learn bookkeeping', 'Personal'],
  ],
  'Worked table sorting four aims of an imagined pickle cooperative into organisational, social and personal objectives',
  'Ask: who benefits — the firm, society or the people working in it?',
);
const vChars = table(
  ['Characteristic', 'In short'],
  [
    ['Goal-oriented', 'Everything aims at definite objectives'],
    ['Pervasive', 'Found in every kind of organisation and at every level'],
    ['Continuous', 'Its functions repeat without a break'],
    ['Group activity', 'Unites people with different needs towards common goals'],
    ['Intangible', 'Cannot be seen, but its results can be felt'],
  ],
  'Table of five characteristics of management: goal-oriented, pervasive, continuous, group activity and intangible',
);
const vPervInt = table(
  ['Clue in a case', 'Characteristic'],
  [['Many different kinds of organisation all plan and check work', 'Pervasive'], ['Nobody sees the managers, but everything runs smoothly', 'Intangible'], ['The next plan starts as soon as one ends', 'Continuous']],
  'Table of clues in a case and the characteristic each points to: pervasive, intangible and continuous',
);
const vSummary1 = table(
  ['Idea', 'Key point'],
  [['Four meanings', 'Activity, group, discipline, process'], ['Process', 'Plan, organise, staff, direct, control'], ['Objectives', 'Organisational, social, personal'], ['Characteristics', 'Goal-oriented, pervasive, continuous, group activity, intangible']],
  'Summary table of Part 1: four meanings, the process, three kinds of objectives and five characteristics',
);
const vCaseSteps = flow('LR', ['Quote the line', 'Name the idea', 'Explain the link'], 'Three steps for case questions: quote the line, name the idea, and explain the link');

const vScience = table(
  ['Feature of science', 'Does management have it?'],
  [
    ['Systematised body of knowledge', 'Yes: organised principles and theories'],
    ['Principles based on observation and experiment', 'Yes, though people cannot be tested like chemicals'],
    ['Universal validity', 'Only partly: results vary with people and situations'],
  ],
  'Table of three features of science and how far management has each: systematised knowledge yes, experiment-based principles yes, universal validity only partly',
  'So management is an inexact, or soft, science.',
);
const vArt = table(
  ['Feature of art', 'In management'],
  [
    ['Theoretical knowledge exists', 'Many books and principles on managing'],
    ['Personalised application', 'Each manager applies them in an own style'],
    ['Practice and creativity', 'Skill grows with practice and fresh ideas'],
  ],
  'Table of three features of art and how each appears in management',
);
const vProfession = table(
  ['Feature of a profession', 'Met by management?'],
  [
    ['Well-defined body of knowledge', 'Yes'],
    ['Restricted entry (degree or licence)', 'No: anyone can be a manager'],
    ['Compulsory professional association', 'No: membership is voluntary'],
    ['Ethical code with penalties', 'Not fully: codes exist but are not binding by law'],
    ['Service motive', 'Partly: firms serve society but mainly pursue their goals'],
  ],
  'Table of five features of a profession and how far management meets each',
);
const vSapEx = table(
  ['Imagined fact', 'Points to…'],
  [
    ['A tea-shop owner in Indore runs her staff in her own way', 'Art'],
    ['A chain tested two shift patterns and kept the better one', 'Science'],
    ['A hotel appoints a manager with no management degree', 'Not a full profession'],
    ['A bonus that worked in Surat fails in Shillong', 'Inexact science'],
  ],
  'Worked table matching four imagined facts to art, science, not a full profession, or inexact science',
  'Find the feature, then decide whether it is met.',
);
const vVerdict = table(['Is management…', 'Verdict'], [['A science?', 'Yes, but an inexact one'], ['An art?', 'Yes'], ['A profession?', 'Not fully; it is moving that way']], 'Verdict table: management is an inexact science, an art, and not yet a full profession');
const vImportance = table(
  ['Importance', 'Imagined example'],
  [
    ['Helps achieve group goals', 'Every crew member works towards finishing repairs before the season'],
    ['Increases efficiency', 'A potter\'s kiln schedule saves firewood'],
    ['Creates a dynamic organisation', 'Weavers adopt new yarns as tastes change'],
    ['Helps achieve personal objectives', 'Fair pay and recognition keep staff motivated'],
    ['Helps in the development of society', 'Better goods, more jobs, new technology'],
  ],
  'Table of five points of importance of management, each with an imagined example',
);
const vPyramid = (() => {
  const s = new Svg(560, 340);
  const ax = 230, ay = 20, by = 300, half = 200;
  const xAt = (y, side) => ax + side * ((y - ay) / (by - ay)) * half;
  const y1 = 110, y2 = 205;
  s.polygon([[ax, ay], [xAt(y1, 1), y1], [xAt(y1, -1), y1]], { fill: 'accent', fillOpacity: 0.2, color: 'accent', sw: 1.5 });
  s.polygon([[xAt(y1, -1), y1], [xAt(y1, 1), y1], [xAt(y2, 1), y2], [xAt(y2, -1), y2]], { fill: 'green', fillOpacity: 0.15, color: 'green', sw: 1.5 });
  s.polygon([[xAt(y2, -1), y2], [xAt(y2, 1), y2], [xAt(by, 1), by], [xAt(by, -1), by]], { fill: 'blue', fillOpacity: 0.12, color: 'blue', sw: 1.5 });
  s.text(ax, 85, 'Top', { bold: true });
  s.text(ax, 150, 'Middle', { bold: true }).text(ax, 172, 'department and plant heads', { size: 12 });
  s.text(ax, 245, 'Supervisory', { bold: true }).text(ax, 267, 'foremen and line supervisors', { size: 12 });
  s.text(320, 70, 'Board, chief executive:', { anchor: 'start', size: 12 }).text(320, 88, 'goals and strategy', { anchor: 'start', size: 12 });
  s.text(400, 140, 'Interpret, assign,', { anchor: 'start', size: 12 }).text(400, 158, 'coordinate', { anchor: 'start', size: 12 });
  s.text(445, 235, 'Oversee workers,', { anchor: 'start', size: 12 }).text(445, 253, 'link to middle', { anchor: 'start', size: 12 });
  s.text(ax, 325, 'Workers (operatives) are managed, not managers', { size: 12, muted: true });
  return s.visual('Pyramid of three levels of management: top (board and chief executive, setting goals and strategy), middle (department and plant heads, who interpret, assign and coordinate) and supervisory (foremen and line supervisors, who oversee workers and link to middle management). Operative workers below are managed, not managers', 'Three levels of management, from the board down to the shop floor.');
})();
const vLevels = table(
  ['Level', 'Who', 'Main functions'],
  [
    ['Top', 'Board, chief executive, directors', 'Frame goals and strategy; read the environment; answerable for survival and welfare'],
    ['Middle', 'Department, plant and regional heads', 'Interpret policies; assign duties to supervisors; coordinate departments; motivate'],
    ['Supervisory', 'Foremen, line supervisors', 'Oversee workers; keep quality and discipline; pass problems upward'],
  ],
  'Table of the three levels of management, who belongs to each and their main functions',
);
const vLevelsEx = table(
  ['Imagined person at a cashew processor in Odisha', 'Level'],
  [['Directors who decide to double capacity', 'Top'], ['Factory manager who sets yearly targets for each shed', 'Middle'], ['Shed supervisor who guides shellers each day', 'Supervisory'], ['Sheller who works the machine', 'Operative, not management']],
  'Worked table placing four imagined people at a cashew processor at their level of management',
  'Ask: does the person set goals, turn them into plans, or watch the work directly?',
);
const vSummary2 = table(
  ['Idea', 'Key point'],
  [['Science, art, profession', 'Inexact science; an art; not yet a full profession'], ['Importance', 'Group goals, efficiency, dynamic firm, personal objectives, society'], ['Levels', 'Top, middle, supervisory'], ['Time use', 'More planning at the top; more supervising at the bottom']],
  'Summary table of Part 2: science, art and profession; importance; levels; and how managers at each level use their time',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Nature and Significance of Management — Part 1: Meaning, Objectives and Characteristics',
  goals: [
    'Explain the four ways in which the term management is understood',
    'List the organisational, social and personal objectives of management',
    'Describe the characteristics of management with examples',
  ],
  slides: [
    sl('title', 'Nature and Significance of Management', {
      b: 'Part 1: the four **meanings** of management, its **objectives** and its **characteristics**.',
      v: vRoute1,
      n: 'Every organisation, from a village library to a large exporter, needs someone to make sure the work gets done well. That someone, and that work, is management. In this part we see the four ways the word is used, what management tries to achieve, and the features that mark it out.',
    }),
    sl('concept', 'Four ways to read the word', {
      b: '**Management** is the process of getting things done **effectively and efficiently** through others, to achieve the goals of an organisation.',
      v: vMeanings,
      n: 'The word management is used in four senses. As an activity, it is what managers do each day. As a group, it means the people who run the organisation. As a discipline, it is a subject we study. As a process, it is a chain of functions that turns plans into results.',
    }),
    sl('diagram', 'Management as a process', {
      b: 'The five functions follow one another, and controlling feeds back into the next plan.',
      v: vProcess,
      n: 'Seen as a process, management begins with planning, deciding in advance what to do. Organising arranges tasks and resources. Staffing fills posts with the right people. Directing guides and motivates them. Controlling compares results with plans, and what it finds becomes the starting point for the next round of planning.',
    }),
    sl('example', 'Worked example 1: which sense?', {
      b: 'Decide which sense of management each imagined sentence uses.',
      bl: ['Step 1: find the **clue**: people, a subject, a chain of steps, or daily tasks.', 'Step 2: name the sense.', 'Step 3: give a one-line reason.'],
      v: vMeaningEx,
      n: 'Let us practise. A notice saying management has fixed new shift timings refers to people, so it is the group sense. Teaching management at college is the discipline sense. Planning a stall, assigning volunteers and checking sales is a chain of steps, the process sense. Meeting suppliers and choosing a vendor is the activity sense.',
    }),
    sl('check', 'Quick check: a field of study', {
      b: 'True or false: management as a discipline means the organised body of knowledge that is taught and studied.',
      chk: 'tf_discipline',
      n: 'Think about what we mean when we call something a subject of study.',
    }),
    sl('concept', 'Management as an activity', {
      b: 'Managers spend their day on three kinds of tasks.',
      v: vActivity,
      n: 'As an activity, management covers three kinds of work. Interpersonal tasks mean dealing with people, such as meeting a buyer or settling a quarrel. Informational tasks mean collecting and passing on news. Decisional tasks mean making choices, such as which order to accept or how to share a budget.',
    }),
    sl('concept', 'Objectives of management', {
      v: vObjectives,
      n: 'Management works towards three kinds of objectives. Organisational objectives are survival, profit and growth. Social objectives create benefit for society, such as safe products, jobs and a clean environment. Personal objectives meet the needs of employees: fair pay, recognition from others, and the chance to grow.',
    }),
    sl('example', 'Worked example 2: sorting objectives', {
      b: 'An imagined pickle cooperative in Rajahmundry writes down four aims.',
      bl: ['Step 1: ask **who benefits**: the firm, society or employees.', 'Step 2: name the kind of objective.', 'Step 3: for organisational aims, say whether it is survival, profit or growth.'],
      v: vObjEx,
      n: 'Look at the cooperative\'s aims. Earning enough in the mango season to last the year is survival. Selling in two new states is growth. Paying fair prices to small growers benefits society, so it is social. A bonus and a chance to learn bookkeeping meet members\' own needs, so it is personal.',
    }),
    sl('check', 'Quick check: an analogy', {
      b: 'Complete the analogy: earning a surplus over costs is to organisational objective as supplying safe products to the community is to ___ objective.',
      chk: 'fb_objectives',
      n: 'Who benefits from safe products: the firm, society, or the staff?',
    }),
    sl('concept', 'Characteristics of management', {
      v: vChars,
      n: 'Management has five key characteristics. It is goal-oriented, because all its work aims at definite objectives. It is pervasive, found in every kind of organisation. It is continuous, with functions repeating without a break. It is a group activity, uniting people with different needs. And it is intangible: we cannot see it, but we feel its results.',
    }),
    sl('two-column', 'Reading the clues in a case', {
      cols: ['**Pervasive**\n\nA kitchen, a ferry cooperative and a start-up all plan and check their work.', '**Intangible**\n\nNo one sees the organisers, yet the event runs smoothly.'],
      v: vPervInt,
      n: 'In case questions, look for clues. When many different kinds of organisation all plan and check their work, the answer is pervasive. When nobody sees the managers but everything runs smoothly, it is intangible. When a new plan begins as soon as one ends, it is continuous.',
    }),
    sl('check', 'Quick check: working together', {
      b: 'Dyers, weavers, accountants and sales staff with different needs work together on one export order. Which characteristic is this?',
      chk: 'm_groupact',
      n: 'Focus on many different people joining their efforts for one goal.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. Management can be read as an activity, a group, a discipline or a process. Its objectives are organisational, social and personal. It is goal-oriented, pervasive, continuous, a group activity and intangible.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Learn the **four meanings** and the clue for each.', 'For objectives, ask **who benefits**.', 'Name the **exact** characteristic: pervasive, intangible, continuous, group activity or goal-oriented.', 'In cases, quote the line before naming the idea.'],
      v: vCaseSteps,
      n: 'A few tips. Learn the four meanings with a clue for each. Sort objectives by asking who benefits. Name characteristics exactly; do not mix up pervasive and continuous. And in every case question, quote the line, name the idea, then explain the link.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Nature and Significance of Management — Part 2: Science, Art, Profession, Importance and Levels',
  goals: [
    'Evaluate how far management fulfils the features of a science, an art and a profession',
    'Explain the importance of management for an organisation and for society',
    'Describe the functions of top, middle and supervisory levels of management',
  ],
  slides: [
    sl('title', 'Is Management a Science, an Art or a Profession?', {
      b: 'Part 2: the **nature** of management, its **importance**, and the three **levels** of management.',
      v: vRoute2,
      n: 'In Part 2 we ask a famous question: is management a science, an art or a profession? Then we see why management matters to a firm and to society, and finally we meet the three levels of managers who share the work.',
    }),
    sl('concept', 'Management as a science', {
      b: 'A **science** is a systematised body of knowledge with principles that explain cause and effect.',
      v: vScience,
      n: 'Science has three features. It is a systematised body of knowledge. Its principles come from observation and experiment. And they hold true everywhere. Management has the first two. But because it deals with people, its principles do not give the same result in every place. So management is an inexact, or soft, science.',
    }),
    sl('concept', 'Management as an art', {
      b: 'An **art** is the skilful and personal application of knowledge to get results.',
      v: vArt,
      n: 'Art also has three features. There is a body of theory to learn. Each artist applies it in a personal way. And skill grows through practice and creativity. Management fits all three: there are many books on managing, each manager has an individual style, and good managers get better with practice.',
    }),
    sl('concept', 'Management as a profession', {
      b: 'A **profession** is an occupation with special knowledge, restricted entry and a binding code of conduct.',
      v: vProfession,
      n: 'A profession such as medicine or law has a body of knowledge, restricted entry through a set degree, a compulsory association, a code of conduct with penalties, and a service motive. Management has a body of knowledge, but anyone may become a manager, membership of an association is voluntary, and codes do not bind managers by law.',
    }),
    sl('example', 'Worked example 1: science, art or profession?', {
      b: 'Match each imagined fact with the nature of management it shows.',
      bl: ['Step 1: spot the **feature** in the fact.', 'Step 2: decide whether management **meets** it.', 'Step 3: write the verdict.'],
      v: vSapEx,
      n: 'A tea-shop owner managing staff in her own way shows art. A chain testing two shift patterns and keeping the better one shows the method of science. A hotel appointing a manager without a degree shows that management is not a full profession. A bonus that works in one city and fails in another shows an inexact science.',
    }),
    sl('check', 'Quick check: testing layouts', {
      b: 'A candle maker tried three packing-room layouts, recorded output and kept the best. Which feature of science does this show?',
      chk: 'm_experiment',
      n: 'How do scientists arrive at their principles?',
    }),
    sl('two-column', 'The verdict', {
      cols: ['**Yes**\n\nManagement is an art and an inexact science.', '**Not yet**\n\nManagement is not a full profession, though it is moving that way.'],
      v: vVerdict,
      n: 'So what is the verdict? Management is both an art and a science, but an inexact science because it deals with people. It is not yet a full profession, since entry is open and codes are not binding, but it is moving in that direction as more managers are trained formally.',
    }),
    sl('concept', 'Why management matters', {
      v: vImportance,
      n: 'Management matters in five ways. It helps a group achieve its goals by uniting individual efforts. It increases efficiency by cutting waste. It creates a dynamic organisation that adapts to change. It helps meet the personal objectives of staff. And it helps develop society, through better goods, more jobs and new technology.',
    }),
    sl('check', 'Quick check: adapting to change', {
      b: 'A manager persuades senior weavers to try new yarns as buyers ask for light summer saris. Which importance of management is this?',
      chk: 'm_dynamic',
      n: 'Is the firm standing still, or changing with its market?',
    }),
    sl('diagram', 'Levels of management', {
      b: 'Managers are arranged in **three levels**, joined by a chain of authority.',
      v: vPyramid,
      n: 'In most organisations, managers work at three levels. At the top are the board and the chief executive. In the middle are department, plant and regional heads. At the base are supervisors and foremen who work directly with the workers. The workers themselves are managed, but they are not managers.',
    }),
    sl('concept', 'What each level does', {
      v: vLevels,
      n: 'Top managers read the environment, set goals and strategy, and are answerable for the survival of the whole firm. Middle managers interpret those policies, assign duties to supervisors, coordinate departments and motivate their teams. Supervisors oversee the workers, keep quality and discipline, and carry workers\' problems upward.',
    }),
    sl('example', 'Worked example 2: who is at which level?', {
      b: 'Four people work at an imagined cashew processor in Odisha.',
      bl: ['Step 1: ask whether the person **sets goals**, **turns them into plans**, or **watches the work directly**.', 'Step 2: name the level.', 'Step 3: remember that workers are not managers.'],
      v: vLevelsEx,
      n: 'Directors who decide to double capacity are setting goals, so they are top management. The factory manager who sets yearly targets for each shed turns goals into plans, so he is middle management. The shed supervisor who guides workers daily is supervisory. The sheller who runs the machine is an operative, not a manager.',
    }),
    sl('check', 'Quick check: time at each level', {
      b: 'True or false: a top manager usually spends more time on planning and less on day-to-day supervision than a supervisor does.',
      chk: 'tf_levels',
      n: 'Think about what fills the day of a director and of a foreman.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. Management is an art and an inexact science, and not yet a full profession. It helps achieve group goals, raises efficiency, keeps the firm dynamic, meets personal objectives and develops society. Its three levels are top, middle and supervisory, each with its own functions.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['For science, art or profession, **test each feature** and give a verdict.', 'Learn **two functions** for each level.', 'In level cases, ask: **goals, plans or direct supervision**?', 'Never call a worker a manager.'],
      v: vCaseSteps,
      n: 'Final tips. When asked whether management is a science, art or profession, test each feature and end with a clear verdict. Learn at least two functions for each level. In a case, decide whether the person sets goals, turns them into plans, or watches the work directly. And remember that workers are not a level of management.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Nature and Significance of Management — notes',
  sections: [
    {
      h: '1. Meaning of management',
      t: 1,
      b: '**Management** is the process of getting things done **effectively** (on time, meeting the goal) and **efficiently** (at least cost) through others.\n\nThe word is used in four senses:\n- **As an activity:** what managers do — **interpersonal** (dealing with people), **informational** (receiving and passing on information) and **decisional** (taking decisions) tasks.\n- **As a group:** the **body of persons** who manage an organisation, from directors to supervisors.\n- **As a discipline:** an **organised field of study** with its own concepts and principles, taught in schools and colleges.\n- **As a process:** a **chain of inter-related functions** — planning, organising, staffing, directing and controlling — performed to reach goals.',
      terms: [['Management', 'The process of getting things done effectively and efficiently through others.'], ['Effectiveness', 'Completing the right task on time.'], ['Efficiency', 'Doing the task at the least cost of resources.']],
      v: vMeanings,
      vs: [vProcess, vActivity],
    },
    {
      h: '2. Objectives of management',
      t: 2,
      b: '- **Organisational objectives:** **survival** (earning enough to cover costs and stay in business), **profit** (a surplus over costs to reward owners and fund growth) and **growth** (expanding sales, capacity, products or markets).\n- **Social objectives:** creating benefit for society — quality products at fair prices, eco-friendly methods, jobs for disadvantaged groups, support to the community.\n- **Personal objectives:** meeting the varied needs of employees — **financial** (fair pay), **social** (recognition by peers) and **higher-level** (personal growth and development).\n\nA good manager balances all three kinds.',
      terms: [['Organisational objectives', 'Survival, profit and growth of the firm.'], ['Social objectives', 'Benefits the firm creates for society.'], ['Personal objectives', 'Meeting the financial, social and higher-level needs of employees.']],
      v: vObjectives,
      vs: [vObjEx],
    },
    {
      h: '3. Characteristics of management',
      t: 2,
      b: '- **Goal-oriented:** all management work aims at definite objectives; success is judged by how far they are met.\n- **Pervasive:** management is needed in all organisations — business or not, large or small — and at every level.\n- **Continuous:** its functions are performed again and again; controlling leads into fresh planning.\n- **Group activity:** an organisation is a group of individuals with different needs; management unites their efforts towards common goals.\n- **Intangible:** management cannot be seen or touched, but its presence is felt in orderly work, met targets and satisfied people.',
      terms: [['Pervasive', 'Found in every kind of organisation and at every level.'], ['Intangible', 'Cannot be seen, though its effects can be felt.']],
      v: vChars,
      vs: [vPervInt],
    },
    {
      h: '4. Management as a science, an art and a profession',
      t: 3,
      b: '**Science** — features: systematised body of knowledge; principles based on observation and experiment; universal validity. Management has organised knowledge and tested principles, but because they deal with human behaviour they do not hold exactly everywhere: an **inexact (soft) science**.\n\n**Art** — features: existence of theoretical knowledge; personalised application; based on practice and creativity. Management meets all three: it is an **art**.\n\n**Profession** — features: well-defined body of knowledge; restricted entry; professional association; ethical code; service motive. Management has a body of knowledge, but entry is **not restricted**, association membership is **not compulsory**, and no code is binding by law: **not a full profession**.\n\n**Verdict:** management is both an art and an inexact science, and it is moving towards becoming a profession.',
      terms: [['Inexact science', 'A science whose principles do not give identical results everywhere because they deal with people.'], ['Restricted entry', 'Entry to an occupation only through a set degree, examination or licence.']],
      v: vScience,
      vs: [vArt, vProfession, vVerdict],
    },
    {
      h: '5. Importance of management',
      t: 4,
      b: '- **Helps achieve group goals:** it directs individual efforts towards the common goals of the organisation.\n- **Increases efficiency:** better planning, organising and control reduce waste and cost.\n- **Creates a dynamic organisation:** it helps people accept and adapt to change.\n- **Helps achieve personal objectives:** through fair pay, recognition and growth.\n- **Helps in the development of society:** through quality goods, jobs, new technology and responsible use of resources.',
      terms: [['Dynamic organisation', 'One that keeps adapting to changes in its environment.']],
      v: vImportance,
    },
    {
      h: '6. Levels of management and their functions',
      t: 4,
      b: '**Top management** (board, chief executive, directors): analyses the environment; frames overall objectives and strategies; arranges resources; is answerable for the survival and welfare of the whole organisation.\n\n**Middle management** (department, plant and regional heads): interprets the policies of top management; assigns duties to supervisors; ensures enough staff and resources; coordinates departments; motivates supervisors.\n\n**Supervisory (lower) management** (foremen, line supervisors): oversees workers directly; keeps quality and discipline; passes workers\' problems upward and managers\' instructions downward; guides and trains workers.\n\n**Time:** planning takes more of a top manager\'s time; direct supervision takes more of a supervisor\'s. Operative workers are managed but are **not** a level of management.',
      terms: [['Top management', 'The highest level, which sets goals and strategy.'], ['Middle management', 'The link between top and supervisory managers.'], ['Supervisory management', 'The level in direct contact with workers.']],
      v: vPyramid,
      vs: [vLevels, vLevelsEx],
    },
  ],
  tips: '**Common mistakes**\n- Mixing up pervasive (found everywhere) with continuous (never stops).\n- Calling management a full profession, or an exact science.\n- Listing jobs for disadvantaged groups as a personal objective (it is social).\n- Treating operative workers as a level of management.\n\n**How marks are usually awarded**\n- 1 mark: the correct option, sense, objective or level.\n- 2–3 marks: each point named and explained, linked to the case.\n- 5 marks: parts answered separately; science, art and profession questions need each feature tested and a verdict.\n- Case questions: quote the line, name the idea, explain the link.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Management**', 'Getting things done effectively and efficiently through others.', 'definition', 1],
  ['Four senses of the word management', 'Activity, group, discipline, process.', 'exam-tip', 1],
  ['Management as an **activity**', 'Interpersonal, informational and decisional tasks of managers.', 'definition', 1],
  ['Management as a **group**', 'The body of persons who manage an organisation.', 'definition', 1],
  ['Management as a **discipline**', 'An organised field of study with its own principles.', 'definition', 1],
  ['Management as a **process**', 'Planning → organising → staffing → directing → controlling.', 'concept', 1],
  ['Effective vs efficient', 'Effective: the goal is met on time. Efficient: at least cost.', 'concept', 1],
  ['Three organisational objectives', 'Survival, profit, growth.', 'fact', 2],
  ['**Social objectives**', 'Benefits to society: safe products, jobs, clean environment.', 'definition', 2],
  ['**Personal objectives**', 'Employees\' financial, social and higher-level needs.', 'definition', 2],
  ['Five characteristics of management', 'Goal-oriented, pervasive, continuous, group activity, intangible.', 'exam-tip', 2],
  ['**Pervasive**', 'Needed in every kind of organisation and at every level.', 'definition', 2],
  ['**Intangible**', 'Cannot be seen; felt through its results.', 'definition', 2],
  ['**Continuous**', 'Functions repeat without a break.', 'definition', 2],
  ['Three features of science', 'Systematised knowledge; experiment-based principles; universal validity.', 'fact', 3],
  ['Why an **inexact** science?', 'Its principles deal with people, so results vary.', 'concept', 3],
  ['Three features of art', 'Theory exists; personalised application; practice and creativity.', 'fact', 3],
  ['Features of a profession', 'Body of knowledge, restricted entry, association, ethical code, service motive.', 'fact', 3],
  ['Which profession feature does management fully meet?', 'Only a well-defined body of knowledge.', 'exam-tip', 3],
  ['Verdict on the nature of management', 'An art and an inexact science; not yet a full profession.', 'concept', 3],
  ['Five points of importance', 'Group goals, efficiency, dynamic organisation, personal objectives, development of society.', 'exam-tip', 4],
  ['Less waste, same output shows…', 'Management increases efficiency.', 'fact', 4],
  ['Adapting to new tastes shows…', 'Management creates a dynamic organisation.', 'fact', 4],
  ['Three levels of management', 'Top, middle, supervisory (lower).', 'fact', 4],
  ['**Top management** does…', 'Frames goals and strategy; answerable for survival and welfare.', 'concept', 4],
  ['**Middle management** does…', 'Interprets policies, assigns duties, coordinates, motivates.', 'concept', 4],
  ['**Supervisory management** does…', 'Oversees workers; quality and discipline; passes problems upward.', 'concept', 4],
  ['Planning time by level', 'Most at the top; least at the supervisory level.', 'fact', 4],
  ['Are workers a level of management?', 'No: they are managed, not managers.', 'exam-tip', 4],
  ['Case routine', 'Quote the line, name the idea, explain the link.', 'exam-tip', 2],
]);

// ---------------------------------------------------------------- tests (ISC class defaults, item for item)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Nature and Significance of Management',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A - Objective (5 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_group', 'm_social', 'm_inexact', 'm_middle', 'ar_goal'] },
    { id: 'B', title: 'Section B - Short answer (4 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s_meaning', { attempt: 1, keys: ['s_social', 's_art'] }] },
    { id: 'C', title: 'Section C - Short answer (6 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s3_characteristics', { attempt: 1, keys: ['s3_middle', 's3_science'] }] },
    { id: 'D', title: 'Section D - Long answer (5 marks)', instr: 'Answer the question. It is set in parts.', items: ['l_sap'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Nature and Significance of Management',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A - Objective (12 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_process', 'm_discipline', 'm_survival', 'm_personal', 'm_pervasive', 'm_intangible', 'm_art', 'm_profession_combo', 'm_top', 'm_lower', 'ar_art', 'ar_top'] },
    { id: 'B', title: 'Section B - Short answer (6 marks)', instr: 'Answer all three questions. Internal choice in the last question.', items: ['s_personal', 's_supervisory', { attempt: 1, keys: ['s_importance2', 's_profession2'] }] },
    { id: 'C', title: 'Section C - Short answer (12 marks)', instr: 'Answer all four questions. Internal choice in the last question.', items: ['s3_meaning', 's3_objectives', 's3_society', { attempt: 1, keys: ['s3_profession', 's3_process'] }] },
    { id: 'D', title: 'Section D - Long answer (10 marks)', instr: 'Answer both questions. Internal choice in the second question. Each is set in parts.', items: ['l_levels', { attempt: 1, keys: ['l_char', 'l_importance'] }] },
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
    syllabus: 'topics t01–t04 of isc-12-commerce-ch06 (management as an activity, a group, a discipline and a process; objectives and characteristics; management as a science, an art and a profession; importance and levels of management)',
    originality: 'every firm, person and case is imagined and written by SOYL and labelled; no ISC or CBSE textbook text, illustration or exercise and no CISCE specimen or board item reused (D-036); firms, people and set-ups differ from CBSE 12 Business Studies ch01',
    data: 'no computed figures; all examples are imagined and labelled',
    facts: 'stable textbook concepts only (the four senses of management, three kinds of objectives, five characteristics, features of science, art and profession, three levels)',
    gate: 'schema, pipeline lint, deterministic verify, word limits, narration and answer-leak checks run clean in this build',
  },
});
