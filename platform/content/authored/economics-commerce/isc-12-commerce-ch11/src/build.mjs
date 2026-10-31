// Build ISC 12 Commerce ch11 Directing. Run from platform/:
//   npx tsx content/authored/economics-commerce/isc-12-commerce-ch11/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('isc-12-commerce-ch11', 'economics-commerce');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- visuals
const vRoute1 = flow('LR', ['What directing is', 'Why it matters', 'Supervision and span', 'Motivation and Maslow'], 'Route map of Part 1: the meaning and importance of directing, supervision and span of control, and motivation with Maslow\'s need hierarchy', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Leadership', 'Four leadership styles', 'Communication process', 'Barriers and remedies'], 'Route map of Part 2: leadership and its four styles, the communication process, and barriers to communication with ways to overcome them', 'Part 2 at a glance');

const vElements = table(
  ['Element of directing', 'What the manager does'],
  [
    ['Supervision', 'Watches and guides work on the floor'],
    ['Motivation', 'Makes people want to give their best'],
    ['Leadership', 'Influences people to follow willingly'],
    ['Communication', 'Passes ideas and instructions both ways'],
  ],
  'Table of the four elements of directing (supervision, motivation, leadership and communication) with what the manager does in each',
);
const vFeatures = table(
  ['Feature', 'Meaning'],
  [
    ['Initiates action', 'Work starts only when people are told and guided'],
    ['Pervasive', 'Done at every level and in every kind of organisation'],
    ['Continuous', 'Goes on throughout the life of the organisation'],
    ['Flows downward', 'Each superior directs the people just below'],
  ],
  'Table of four features of directing: it initiates action, is pervasive, is continuous and flows from top to bottom',
);
const vImportance = table(
  ['Importance', 'In short'],
  [
    ['Initiates action', 'Turns plans into work'],
    ['Integrates efforts', 'Makes each person\'s work fit the whole'],
    ['Means of motivation', 'Brings out people\'s full potential'],
    ['Stability and balance', 'Keeps teams working in step'],
    ['Facilitates change', 'Reduces resistance to new methods'],
  ],
  'Table of five points of importance of directing with a short meaning for each',
);
const vImpEx = table(
  ['Imagined situation', 'Importance shown'],
  [
    ['Dyers, weavers and packers time their work to fit one another', 'Integrates efforts'],
    ['Clerks are trained and reassured before tablets replace registers', 'Facilitates change'],
    ['New bakers start work once recipes are explained', 'Initiates action'],
    ['Praise and fair rewards lift a team\'s output', 'Means of motivation'],
  ],
  'Worked table matching four imagined workplace situations with the point of importance of directing each shows',
  'Look for the clue: fitting work together, a change, starting work, or effort.',
);
const vSupervision = table(
  ['Function of a supervisor', 'Example on a shop floor'],
  [
    ['Link between management and workers', 'Explains new targets; reports workers\' problems'],
    ['Plans and assigns daily work', 'Decides who runs which machine today'],
    ['Ensures work is done as planned', 'Checks quality and output every hour'],
    ['On-the-job training', 'Shows a new welder how to hold the torch'],
    ['Group unity and morale', 'Settles a quarrel; praises a good team'],
  ],
  'Table of five functions of a supervisor with a shop-floor example of each',
);
const vSpan = (() => {
  const s = new Svg(560, 260);
  s.rect(70, 25, 120, 40, { fill: 'blue', fillOpacity: 0.15, color: 'blue', sw: 1.5, rx: 8 });
  s.text(130, 45, 'Supervisor', { size: 13, bold: true });
  for (const cx of [60, 130, 200]) {
    s.line(130, 65, cx, 140, { sw: 1.4 });
    s.rect(cx - 26, 140, 52, 30, { fill: 'green', fillOpacity: 0.15, color: 'green', sw: 1.4, rx: 6 });
    s.text(cx, 155, 'Worker', { size: 11 });
  }
  s.text(130, 205, 'Narrow span: few subordinates', { size: 13, bold: true });
  s.text(130, 228, 'closer guidance for each', { size: 12, muted: true });
  s.rect(360, 25, 120, 40, { fill: 'blue', fillOpacity: 0.15, color: 'blue', sw: 1.5, rx: 8 });
  s.text(420, 45, 'Supervisor', { size: 13, bold: true });
  for (let i = 0; i < 8; i++) {
    const cx = 308 + i * 32;
    s.line(420, 65, cx, 147, { sw: 1.2 });
    s.dot(cx, 155, 8, 'green');
  }
  s.text(420, 205, 'Wide span: many subordinates', { size: 13, bold: true });
  s.text(420, 228, 'less attention for each', { size: 12, muted: true });
  return s.visual('Two small charts side by side. Left: one supervisor linked to three workers, labelled narrow span, few subordinates, closer guidance for each. Right: one supervisor linked to eight workers, labelled wide span, many subordinates, less attention for each', 'Span of control is the number of subordinates one superior can supervise well.');
})();
const vSpanFactors = table(
  ['Factor', 'Narrow span when…', 'Wide span when…'],
  [
    ['Nature of work', 'Work is complex or delicate', 'Work is simple and repeated'],
    ['Ability of supervisor', 'Supervisor is new', 'Supervisor is skilled and experienced'],
    ['Competence of workers', 'Workers are new or untrained', 'Workers are trained and self-reliant'],
    ['Communication methods', 'Contact is slow or difficult', 'Quick, easy contact is available'],
  ],
  'Table of four factors that decide the span of control, showing when each calls for a narrow span and when it allows a wide span',
);
const vMaslow = (() => {
  const s = new Svg(560, 360);
  const levels = [
    ['Self-actualisation', 'reaching full potential', 'accent'],
    ['Esteem', 'status, recognition, respect', 'yellow'],
    ['Social', 'belonging, friendship, acceptance', 'green'],
    ['Safety', 'job security, protection from harm', 'blue'],
    ['Physiological', 'food, clothing, shelter, basic pay', 'brown'],
  ];
  levels.forEach(([name, sub, col], i) => {
    const w = 200 + i * 70, y = 20 + i * 60;
    s.rect(280 - w / 2, y, w, 56, { fill: col, fillOpacity: 0.16, color: col, sw: 1.5, rx: 6 });
    s.text(280, y + 20, name, { size: 14, bold: true });
    s.text(280, y + 40, sub, { size: 12 });
  });
  s.text(280, 342, 'Lower needs come first; a satisfied need stops motivating', { size: 12, muted: true });
  return s.visual('Maslow\'s need hierarchy drawn as five stacked bands, widest at the bottom. From the bottom: physiological (food, clothing, shelter, basic pay); safety (job security, protection from harm); social (belonging, friendship, acceptance); esteem (status, recognition, respect); and at the top self-actualisation (reaching full potential). Lower needs come first and a satisfied need stops motivating', 'Maslow\'s need hierarchy: people move up as lower needs are reasonably met.');
})();
const vIncentives = table(
  ['Need', 'Suitable incentive'],
  [
    ['Physiological', 'Fair wage paid on time, meal allowance'],
    ['Safety', 'Permanent post, provident fund, insurance'],
    ['Social', 'Team events, friendly work groups'],
    ['Esteem', 'Awards, titles, public praise'],
    ['Self-actualisation', 'Challenging work, freedom to try new ideas'],
  ],
  'Table pairing each level of Maslow\'s hierarchy with a suitable incentive',
);
const vMaslowEx = table(
  ['Imagined employee', 'Active need', 'Incentive'],
  [
    ['New helper who cannot pay rent', 'Physiological', 'Wage on time, small advance'],
    ['Boat crew on day-to-day engagement', 'Safety', 'Written contract, insurance'],
    ['Recruit far from home', 'Social', 'Buddy and team lunch'],
    ['Senior engineer with everything else met', 'Self-actualisation', 'Own design project'],
  ],
  'Worked table: four imagined employees, the need that is active for each and a matching incentive',
  'First find which needs are already met; the next one up is active.',
);
const vLeadFlow = flow('LR', ['Leader', 'Influences followers', 'Willing effort', 'Group goals'], 'Flow showing leadership: the leader influences followers, who give willing effort towards group goals', 'Leadership is influence, not just authority.');
const vStyles = table(
  ['Style', 'Who decides?', 'In one line'],
  [
    ['Autocratic', 'The leader alone', 'Orders are given and obeyed'],
    ['Democratic', 'Leader with the group', 'Ideas are invited before deciding'],
    ['Laissez-faire', 'Mostly the group', 'Members are left free to act'],
    ['Bureaucratic', 'The rule book', 'Everything goes by procedure'],
  ],
  'Table of four leadership styles showing who decides under each and a one-line meaning',
);
const vStyleEx = table(
  ['Imagined situation', 'Style'],
  [
    ['Yard manager gives exact orders before a deadline; no discussion', 'Autocratic'],
    ['Plant head invites suggestions on shift timings and decides with workers', 'Democratic'],
    ['Editor leaves expert writers free to plan their own stories', 'Laissez-faire'],
    ['Depot manager decides leave strictly by the rule book', 'Bureaucratic'],
  ],
  'Worked table matching four imagined situations with the leadership style each shows',
  'Ask: who takes the decision, and on what basis?',
);
const vObjectives = table(
  ['Objective', 'Example'],
  [
    ['Inform and instruct', 'New targets and safety rules'],
    ['Motivate', 'Praise for a team that met its target'],
    ['Coordinate', 'Linking the work of two sections'],
    ['Educate and train', 'A talk on a new machine'],
    ['Get feedback and build relations', 'Workers raise problems in a meeting'],
  ],
  'Table of five objectives of communication in an organisation with an example of each',
);
const vProcess = flow('LR', ['Sender', 'Encoding', 'Message through a channel', 'Decoding', 'Receiver'], 'Communication process: the sender encodes an idea into a message, which travels through a channel; the receiver decodes it, and feedback returns from the receiver to the sender', 'Feedback returns from receiver to sender; noise can disturb any stage.', [
  { from: 'n1', to: 'n2' }, { from: 'n2', to: 'n3' }, { from: 'n3', to: 'n4' }, { from: 'n4', to: 'n5' }, { from: 'n5', to: 'n1' },
]);
const vBarriers = table(
  ['Barrier', 'Arises from', 'Example'],
  [
    ['Semantic', 'Words and their meanings', 'Jargon, faulty translation'],
    ['Psychological', 'Feelings and state of mind', 'Distrust, fear, premature judgement'],
    ['Organisational', 'Structure, rules and procedures', 'Too many levels, rigid forms'],
    ['Personal', 'Attitudes of superiors or subordinates', 'Boss who will not listen'],
  ],
  'Table of four kinds of barriers to communication, where each arises from and an example of each',
);
const vBarrierEx = table(
  ['Problem at an imagined workshop', 'Barrier', 'Remedy'],
  [
    ['Notice uses words workers do not know', 'Semantic', 'Simple local words, a demonstration'],
    ['Workers fear change means job cuts', 'Psychological', 'Honest meeting, assurances'],
    ['Ideas pass through four officers', 'Organisational', 'Fewer layers, suggestion box'],
    ['Head looks annoyed when asked questions', 'Personal', 'Listen and welcome questions'],
  ],
  'Worked table: four problems at an imagined workshop, the barrier behind each and a remedy',
  'Name the barrier first, then give a remedy that fits it.',
);
const vRemedies = table(
  ['Way to overcome barriers', 'Why it helps'],
  [
    ['Clarify ideas before speaking', 'The sender knows exactly what to say'],
    ['Use language the receiver knows', 'Removes semantic confusion'],
    ['Consult others and listen', 'Builds trust and acceptance'],
    ['Ask for feedback and follow up', 'Catches misunderstanding early'],
    ['Make actions match words', 'Removes distrust over time'],
  ],
  'Table of five ways to overcome barriers to communication and why each helps',
);
const vSummary1 = table(
  ['Idea', 'Key point'],
  [
    ['Directing', 'Instructing, guiding, supervising, motivating and leading people'],
    ['Importance', 'Initiates action, integrates, motivates, stabilises, eases change'],
    ['Supervision', 'First-line guidance; span of control sets how many per supervisor'],
    ['Maslow', 'Physiological, safety, social, esteem, self-actualisation'],
  ],
  'Summary table of Part 1: directing, its importance, supervision and span of control, and Maslow\'s needs',
);
const vSummary2 = table(
  ['Idea', 'Key point'],
  [
    ['Leadership', 'Influencing people to work willingly towards goals'],
    ['Styles', 'Autocratic, democratic, laissez-faire, bureaucratic'],
    ['Communication process', 'Sender, encoding, channel, decoding, receiver, feedback; noise'],
    ['Barriers', 'Semantic, psychological, organisational, personal; each has remedies'],
  ],
  'Summary table of Part 2: leadership, the four styles, the communication process and barriers',
);
const vCaseSteps = flow('LR', ['Quote the clue', 'Name the concept', 'Explain or suggest'], 'Three steps for case questions: quote the clue from the case, name the concept, and explain it or suggest a remedy');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Directing — Part 1: Meaning, Importance, Supervision and Motivation',
  goals: [
    'Explain why directing is needed to turn plans into action',
    'Describe the functions of a supervisor and explain span of control',
    'Explain Maslow\'s hierarchy of needs and suggest incentives suited to each level',
  ],
  slides: [
    sl('title', 'Directing', {
      b: 'Part 1: what **directing** is, why it **matters**, **supervision** and **span of control**, and **motivation** through Maslow\'s needs.',
      v: vRoute1,
      n: 'A firm may have excellent plans, a neat structure and the right people, yet nothing happens until someone tells people what to do, shows them how, and makes them want to do it well. That is directing. In this part we look at its meaning and importance, at supervision, and at motivation.',
    }),
    sl('concept', 'What is directing?', {
      b: '**Directing** means **instructing, guiding, supervising, motivating and leading** people so that they work towards the goals of the organisation.',
      v: vElements,
      n: 'Directing is the function that puts people into action. It has four elements. Supervision is watching and guiding work. Motivation makes people want to give their best. Leadership influences them to follow willingly. Communication carries ideas and instructions up and down the organisation.',
    }),
    sl('concept', 'Features of directing', {
      v: vFeatures,
      n: 'Directing has four features. It initiates action, because work begins only when people are guided. It is pervasive, found at every level and in every kind of organisation. It is continuous, going on every working day. And it flows downwards, each superior directing the people just below.',
    }),
    sl('concept', 'Why directing matters', {
      v: vImportance,
      n: 'Directing matters in five ways. It turns plans into action. It integrates the efforts of many people so that their work fits together. It motivates people to give their best. It keeps teams in balance. And it helps a firm bring in change, because people who are guided and reassured resist less.',
    }),
    sl('check', 'Quick check: continuous or one-time?', {
      b: 'True or false: directing is carried out once, when a new plan is introduced.',
      chk: 'tf_dir',
      n: 'Think about what managers do every working day.',
    }),
    sl('example', 'Worked example 1: which importance?', {
      b: 'Match each imagined situation with the point of importance of directing it shows.',
      bl: ['Step 1: find the **clue** in the situation.', 'Step 2: name the point of importance.', 'Step 3: explain it in one line.'],
      v: vImpEx,
      n: 'Let us practise. Teams timing their work to fit one another shows integration of efforts. Training and reassuring clerks before a new system shows that directing eases change. Bakers starting once recipes are explained shows that directing initiates action. Praise lifting output shows directing as a means of motivation.',
    }),
    sl('concept', 'Supervision', {
      b: '**Supervision** is overseeing subordinates at work and guiding them so that work is done as planned. The **supervisor** is the first-line manager.',
      v: vSupervision,
      n: 'The supervisor works closest to the workers. She links management and workers, plans and assigns daily work, checks that it is done as planned, trains new joiners on the job, and keeps the group united and in good spirits.',
    }),
    sl('diagram', 'Span of control', {
      b: '**Span of control** is the number of subordinates one superior can supervise **effectively**.',
      v: vSpan,
      n: 'How many people can one supervisor guide well? That number is the span of control. A narrow span means few subordinates and close guidance, but more supervisors are needed. A wide span means many subordinates and lower cost, but less attention for each person.',
    }),
    sl('concept', 'What decides the span?', {
      v: vSpanFactors,
      n: 'Four factors decide the span. Complex work needs a narrow span, while simple, repeated work allows a wide one. A skilled supervisor can handle more people. Trained workers need less help. And quick, easy ways of communicating let one supervisor look after more people.',
    }),
    sl('check', 'Quick check: span of control', {
      b: 'What is the number of subordinates that one superior can guide effectively called?',
      chk: 'm_span_def',
      n: 'The answer is a three word term from this part.',
    }),
    sl('diagram', 'Motivation and Maslow\'s hierarchy', {
      b: '**Motivation** is stimulating people to act willingly towards goals by satisfying their **needs**. Maslow arranged needs in five levels.',
      v: vMaslow,
      n: 'Abraham Maslow said people have five kinds of needs, arranged like a ladder. First come physiological needs such as food and shelter. Then safety, then social needs for belonging, then esteem, and at the top self-actualisation, becoming all one can be. People move up as lower needs are reasonably met, and a satisfied need no longer motivates.',
    }),
    sl('example', 'Worked example 2: matching incentives to needs', {
      b: 'Four imagined employees, each with a different active need.',
      bl: ['Step 1: see which needs are **already met**.', 'Step 2: the next level up is the **active need**.', 'Step 3: choose an incentive for that level.'],
      v: vMaslowEx,
      n: 'A helper who cannot pay rent has an active physiological need, so a wage on time helps most. Crews without contracts seek safety. A recruit far from home seeks belonging. A senior engineer whose other needs are met seeks self-actualisation, so a challenging project of his own will motivate him best.',
    }),
    sl('check', 'Quick check: which need?', {
      b: 'A new helper wants above all a wage that covers food and rent. Which need is this?',
      chk: 'm_maslow_phys',
      n: 'Start at the bottom of the ladder.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up Part 1. Directing instructs, guides, supervises, motivates and leads people. It initiates action, integrates efforts, motivates, brings balance and eases change. The supervisor guides workers directly, and the span of control sets how many each can handle. Maslow ranks needs from physiological to self-actualisation.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Name all four **elements** of directing when asked for its meaning.', 'For span of control, link the size to the **nature of work**.', 'Learn Maslow\'s needs **in order**, bottom to top.', 'Match each incentive to the **next unmet need**, not one already met.'],
      v: vCaseSteps,
      n: 'Some tips. When defining directing, mention its four elements. When asked about span of control, connect it to the nature of work and the skill of people. Learn Maslow\'s five needs in order. In case questions, find which needs are already met, and suggest an incentive for the next one.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Directing — Part 2: Leadership and Communication',
  goals: [
    'Identify the leadership style used in a given situation',
    'Draw and explain the communication process',
    'Identify barriers to communication in a case and suggest ways to overcome them',
  ],
  slides: [
    sl('title', 'Leadership and Communication', {
      b: 'Part 2: **leadership** and its four **styles**, the **communication process**, and **barriers** to communication with their remedies.',
      v: vRoute2,
      n: 'In Part 2 we look at two more elements of directing. First, leadership, and the four styles a leader may use. Then communication, how a message travels from sender to receiver, what can block it, and how managers can clear the way.',
    }),
    sl('concept', 'What is leadership?', {
      b: '**Leadership** is the ability to **influence** the behaviour of people so that they work **willingly** towards group goals.',
      v: vLeadFlow,
      n: 'A manager has authority because of her post, but a leader gets people to follow willingly. Leadership is the ability to influence people so that they put in willing effort towards shared goals. Good managers try to be good leaders too.',
    }),
    sl('concept', 'Four styles of leadership', {
      v: vStyles,
      n: 'We need only the meaning of four styles. An autocratic leader decides alone and expects obedience. A democratic leader invites ideas and decides with the group. A laissez-faire leader leaves the group free to decide and act. A bureaucratic leader goes strictly by rules and procedures.',
    }),
    sl('example', 'Worked example 1: name the style', {
      b: 'Four imagined leaders at work.',
      bl: ['Step 1: ask **who decides**.', 'Step 2: ask **on what basis**: personal will, discussion, freedom or rules.', 'Step 3: name the style.'],
      v: vStyleEx,
      n: 'A yard manager giving exact orders with no discussion is autocratic. A plant head who invites suggestions and decides with workers is democratic. An editor who leaves expert writers free is laissez-faire. A depot manager who decides leave strictly by the rule book is bureaucratic, because rules, not his own will, decide.',
    }),
    sl('check', 'Quick check: rules decide', {
      b: 'A depot manager decides every leave request strictly by the rule book. Which style?',
      chk: 'm_bureaucratic',
      n: 'Ask whether the leader or the rules make the decision.',
    }),
    sl('concept', 'Communication and its objectives', {
      b: '**Communication** is the exchange of ideas, facts and feelings between people to create **common understanding**.',
      v: vObjectives,
      n: 'Communication runs through every part of directing. In a firm it serves several objectives: to inform and instruct, to motivate, to coordinate the work of different sections, to educate and train, and to get feedback and build good relations.',
    }),
    sl('diagram', 'The communication process', {
      bl: ['**Sender** has an idea and **encodes** it.', 'The **message** travels through a **channel**.', 'The **receiver** **decodes** it.', '**Feedback** goes back to the sender; **noise** can disturb any stage.'],
      v: vProcess,
      n: 'The sender has an idea and encodes it into words or symbols. The message travels through a channel such as a notice, call or meeting. The receiver decodes it to find the meaning. Feedback then goes back to the sender. Noise, anything that disturbs the message, can creep in at any stage.',
    }),
    sl('check', 'Quick check: an analogy', {
      b: 'Complete the analogy. Sender : Encoding :: Receiver : ___',
      chk: 'fb_comm',
      n: 'What does the receiver do to a message?',
    }),
    sl('concept', 'Barriers to communication', {
      v: vBarriers,
      n: 'Messages fail for four kinds of reasons. Semantic barriers come from words, such as jargon or poor translation. Psychological barriers come from feelings such as distrust or fear. Organisational barriers come from rules and too many levels. Personal barriers come from the attitudes of superiors or subordinates.',
    }),
    sl('example', 'Worked example 2: barriers and remedies', {
      b: 'Four problems at an imagined workshop.',
      bl: ['Step 1: find the **cause** of the problem.', 'Step 2: name the **barrier**.', 'Step 3: suggest a **remedy** that removes that cause.'],
      v: vBarrierEx,
      n: 'Words the workers do not know are a semantic barrier, so use simple local words. Fear of job cuts is psychological, so meet workers honestly. Ideas passing through four officers is organisational, so cut layers. A head who looks annoyed at questions shows a personal barrier, so he must learn to listen.',
    }),
    sl('concept', 'Overcoming barriers', {
      v: vRemedies,
      n: 'Managers can clear the way in several ways. Clarify the idea before speaking. Use words the receiver knows. Consult people and listen to them. Ask for feedback and follow up. Above all, make actions match words, because that is what slowly removes distrust.',
    }),
    sl('check', 'Quick check: rigid forms', {
      b: 'Suggestions must pass three signatures on a set form, so workers stop making them. Which barrier?',
      chk: 'm_org',
      n: 'Is the problem in words, feelings, rules, or a person?',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up Part 2. Leadership is influencing people to work willingly. The four styles are autocratic, democratic, laissez-faire and bureaucratic. Communication moves from sender through encoding, channel and decoding to the receiver, with feedback returning. Barriers may be semantic, psychological, organisational or personal, and each can be overcome.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['For styles, ask **who decides** and **on what basis**.', 'Draw the process as **sender → encoding → channel → decoding → receiver**, with **feedback** back.', 'Name the **type** of barrier before giving a remedy.', 'Make each remedy **fit the cause** in the case.'],
      v: vCaseSteps,
      n: 'Final tips. To spot a style, ask who decides and on what basis. When drawing the process, show feedback returning to the sender. In barrier questions, name the type first, then give a remedy that removes that very cause. Quote the clue from the case each time.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Directing — notes',
  sections: [
    {
      h: '1. Meaning, features and importance of directing',
      t: 1,
      b: '**Directing** is the function of management that **instructs, guides, supervises, motivates and leads** people so that they work towards organisational goals. Its four **elements** are supervision, motivation, leadership and communication.\n\n**Features:** it **initiates action**; it is **pervasive** (every level, every organisation); it is **continuous**; it **flows from top to bottom**.\n\n**Importance:**\n- **Initiates action** — plans become work only when people are guided.\n- **Integrates efforts** — each person\'s work is linked to the work of others.\n- **Means of motivation** — guidance and rewards bring out people\'s potential.\n- **Stability and balance** — leadership and communication keep teams in step.\n- **Facilitates change** — explaining and reassuring reduces resistance to new methods.',
      terms: [['Directing', 'Instructing, guiding, supervising, motivating and leading people towards goals.'], ['Elements of directing', 'Supervision, motivation, leadership and communication.']],
      v: vElements,
      vs: [vFeatures, vImportance],
    },
    {
      h: '2. Supervision and span of control',
      t: 2,
      b: '**Supervision** means overseeing people at work and guiding them so that work is done according to plan. The **supervisor** is the first-line manager in direct daily contact with workers.\n\n**Functions of a supervisor:** link between management and workers; planning and assigning daily work; ensuring work meets targets and standards; on-the-job training; maintaining group unity; building morale; giving feedback upward and downward.\n\n**Span of control** is the number of subordinates one superior can supervise effectively. A **narrow span** gives closer guidance but needs more supervisors; a **wide span** costs less but gives less attention to each worker.\n\n**Factors:** nature of work; ability of the supervisor; competence of workers; communication methods; how spread out the workers are.',
      terms: [['Supervisor', 'First-line manager who directly oversees workers.'], ['Span of control', 'Number of subordinates one superior can supervise effectively.']],
      v: vSpan,
      vs: [vSupervision, vSpanFactors],
    },
    {
      h: '3. Motivation and Maslow\'s need hierarchy',
      t: 3,
      b: '**Motivation** is the process of stimulating people to act willingly towards desired goals by satisfying their needs. A **motive** is an inner urge; a **motivator** (incentive) is what a manager offers to satisfy it.\n\n**Maslow\'s hierarchy** (bottom to top):\n1. **Physiological** — food, clothing, shelter; met by basic pay.\n2. **Safety** — security of job and income; met by permanent posts, pension, insurance.\n3. **Social** — belonging and friendship; met by teamwork and friendly groups.\n4. **Esteem** — status, recognition, self-respect; met by titles, awards, praise.\n5. **Self-actualisation** — becoming what one is capable of; met by challenging work and autonomy.\n\n**Assumptions:** behaviour depends on needs; needs are in an order; a person moves up when a lower need is reasonably met; a satisfied need no longer motivates.',
      terms: [['Motivation', 'Stimulating people to act willingly towards goals.'], ['Self-actualisation', 'The need to realise one\'s full potential; top of Maslow\'s hierarchy.'], ['Esteem need', 'Need for status, recognition and self-respect.']],
      v: vMaslow,
      vs: [vIncentives, vMaslowEx],
    },
    {
      h: '4. Leadership and its styles',
      t: 4,
      b: '**Leadership** is the ability of a person to influence others so that they work willingly and enthusiastically towards group goals.\n\n**Styles (meaning only):**\n- **Autocratic** — the leader keeps decision-making power and expects obedience.\n- **Democratic (participative)** — the leader consults the group and decides with them.\n- **Laissez-faire (free-rein)** — the group is left largely free to decide and act; the leader supports when asked.\n- **Bureaucratic** — the leader manages strictly by rules, procedures and official channels.',
      terms: [['Leadership', 'Influencing people to work willingly towards goals.'], ['Bureaucratic style', 'Leading strictly by rules and procedures.'], ['Laissez-faire style', 'Leaving the group free to decide and act.']],
      v: vStyles,
      vs: [vStyleEx],
    },
    {
      h: '5. Communication: objectives, process, barriers',
      t: 5,
      b: '**Communication** is the exchange of facts, ideas and feelings between people so as to create common understanding.\n\n**Objectives:** to inform and instruct; motivate; coordinate; educate and train; obtain feedback; build good relations.\n\n**Process:** sender → **encoding** → message → **channel** → **decoding** → receiver → **feedback** to the sender. **Noise** is any disturbance that distorts the message at any stage.\n\n**Barriers:**\n- **Semantic** — jargon, words with several meanings, faulty translation.\n- **Psychological** — distrust, fear, premature evaluation, poor attention.\n- **Organisational** — rigid rules, too many levels, lack of facilities.\n- **Personal** — superiors who will not listen or subordinates who hesitate to speak.\n\n**Overcoming them:** clarify the idea first; use the receiver\'s language; consult and listen; seek feedback and follow up; keep actions consistent with words.',
      terms: [['Encoding', 'Turning an idea into words, symbols or gestures.'], ['Decoding', 'The receiver working out the meaning of a message.'], ['Noise', 'Anything that disturbs a message on its way.'], ['Semantic barrier', 'A barrier caused by words and their meanings.']],
      v: vProcess,
      vs: [vBarriers, vRemedies],
    },
  ],
  tips: '**Common mistakes**\n- Writing that directing is done only by top managers (it is pervasive).\n- Mixing up encoding (sender) and decoding (receiver).\n- Calling a rule-bound leader autocratic (that is bureaucratic).\n- Suggesting an incentive for a need that is already met.\n\n**How marks are usually awarded**\n- 1 mark: correct option, need, style or barrier.\n- 2–3 marks: each point named and explained, tied to the case.\n- 5 marks: parts answered separately; Maslow answers give all five needs in order; barrier answers pair each barrier with a remedy.\n- Case questions: quote the clue, name the concept, explain or suggest.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Directing**', 'Instructing, guiding, supervising, motivating and leading people towards goals.', 'definition', 1],
  ['Four elements of directing', 'Supervision, motivation, leadership, communication.', 'exam-tip', 1],
  ['Why is directing called pervasive?', 'It is done at every level and in every kind of organisation.', 'concept', 1],
  ['Five points of importance of directing', 'Initiates action, integrates efforts, motivates, gives stability, eases change.', 'exam-tip', 1],
  ['How does directing ease change?', 'Explaining and reassuring people reduces their resistance.', 'concept', 1],
  ['**Supervision**', 'Overseeing and guiding people at work so work goes as planned.', 'definition', 2],
  ['Supervisor as a link pin', 'Passes plans down to workers and carries their problems up to management.', 'concept', 2],
  ['**Span of control**', 'Number of subordinates one superior can supervise effectively.', 'definition', 2],
  ['Complex, delicate work needs a…', 'Narrow span of control.', 'fact', 2],
  ['Factors deciding the span', 'Nature of work, ability of supervisor, competence of workers, communication methods.', 'exam-tip', 2],
  ['**Motivation**', 'Stimulating people to act willingly towards goals by meeting their needs.', 'definition', 3],
  ['Maslow\'s needs, bottom to top', 'Physiological, safety, social, esteem, self-actualisation.', 'exam-tip', 3],
  ['Incentive for safety needs', 'Permanent post, provident fund, insurance.', 'fact', 3],
  ['Incentive for esteem needs', 'Titles, awards, public praise.', 'fact', 3],
  ['**Self-actualisation**', 'Need to become all one is capable of; top of the hierarchy.', 'definition', 3],
  ['A satisfied need…', 'No longer motivates strongly; the next higher need takes over.', 'concept', 3],
  ['**Leadership**', 'Ability to influence people to work willingly towards group goals.', 'definition', 4],
  ['**Autocratic** style', 'Leader decides alone and expects obedience.', 'definition', 4],
  ['**Democratic** style', 'Leader consults the group and decides with them.', 'definition', 4],
  ['**Laissez-faire** style', 'Group left free to decide; leader helps when asked.', 'definition', 4],
  ['**Bureaucratic** style', 'Leader goes strictly by rules and procedures.', 'definition', 4],
  ['**Communication**', 'Exchange of ideas, facts and feelings to create common understanding.', 'definition', 5],
  ['Communication process', 'Sender → encoding → channel → decoding → receiver → feedback.', 'exam-tip', 5],
  ['**Encoding** vs **decoding**', 'Sender puts the idea into words; receiver works out the meaning.', 'concept', 5],
  ['**Noise**', 'Any disturbance that distorts a message.', 'definition', 5],
  ['Jargon or faulty translation is a…', 'Semantic barrier.', 'fact', 5],
  ['Distrust from broken promises is a…', 'Psychological barrier.', 'fact', 5],
  ['Too many levels and rigid forms are an…', 'Organisational barrier.', 'fact', 5],
  ['Best cure for distrust', 'Make actions match words, and follow up.', 'concept', 5],
  ['Case routine', 'Quote the clue, name the concept, explain or suggest.', 'exam-tip', 5],
]);

// ---------------------------------------------------------------- tests (ISC class defaults, item for item)
const T_SHORT = test({
  kind: 'short',
  blueprint: 'isc-12-default-chapter-test-short',
  title: 'Chapter test (short) — Directing',
  duration: 50,
  sections: [
    { id: 'A', title: 'Section A - Objective (5 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_dir_integrates', 'm_span_narrow', 'm_maslow_esteem', 'm_semantic', 'ar_lead'] },
    { id: 'B', title: 'Section B - Short answer (4 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s_lead_styles', { attempt: 1, keys: ['s_span', 's_comm_objectives'] }] },
    { id: 'C', title: 'Section C - Short answer (6 marks)', instr: 'Answer both questions. Internal choice in the second question.', items: ['s3_comm_process', { attempt: 1, keys: ['s3_span_factors', 's3_lead'] }] },
    { id: 'D', title: 'Section D - Long answer (5 marks)', instr: 'Answer the question. It is set in parts.', items: ['l_maslow'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'isc-12-default-chapter-test-long',
  title: 'Chapter test (long) — Directing',
  duration: 100,
  sections: [
    { id: 'A', title: 'Section A - Objective (12 marks)', instr: 'Answer all questions. Multiple-choice and assertion-reason items carry 1 mark each.', items: ['m_dir_def', 'm_dir_change', 'm_sup_training', 'm_sup_unity', 'm_maslow_safety', 'm_maslow_self', 'm_maslow_incentive', 'm_autocratic', 'm_laissez', 'm_psych', 'ar_maslow', 'ar_comm'] },
    { id: 'B', title: 'Section B - Short answer (6 marks)', instr: 'Answer all three questions. Internal choice in the last question.', items: ['s_dir_importance', 's_incentive_levels', { attempt: 1, keys: ['s_sup_functions', 's_barrier_overcome'] }] },
    { id: 'C', title: 'Section C - Short answer (12 marks)', instr: 'Answer all four questions. Internal choice in the last question.', items: ['s3_dir_importance', 's3_maslow_levels', 's3_barriers', { attempt: 1, keys: ['s3_sup_functions3', 's3_dir_features'] }] },
    { id: 'D', title: 'Section D - Long answer (10 marks)', instr: 'Answer both questions. Internal choice in the second question. Each is set in parts.', items: ['l_comm', { attempt: 1, keys: ['l_dir', 'l_sup'] }] },
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
    syllabus: 'topics t01–t05 of isc-12-commerce-ch11 (meaning and importance of directing; supervision, its functions and span of control; motivation and Maslow\'s need hierarchy; leadership and its four styles, meaning only; communication: objectives, process, barriers and remedies)',
    originality: 'every firm, person and case is imagined and written by SOYL and labelled; no ISC or CBSE textbook text, illustration or exercise and no CISCE specimen or board item reused (D-036); firms, places and set-ups differ from the CBSE 12 Business Studies chapter on directing',
    data: 'no computed figures; all examples are imagined and labelled',
    facts: 'stable textbook concepts only; no dated figures',
    gate: 'schema, pipeline lint, deterministic verify, word limits, narration and answer-leak checks run clean in this build',
  },
});
