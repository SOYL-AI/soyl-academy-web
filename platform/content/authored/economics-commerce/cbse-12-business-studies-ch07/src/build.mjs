// Build CBSE 12 Business Studies ch07 Directing. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-12-business-studies-ch07/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-business-studies-ch07', 'economics-commerce');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG figures
function box(s, x, y, w, h, label, o = {}) {
  s.rect(x, y, w, h, { fill: o.fill ?? 'fill', color: o.color ?? 'accent', sw: 1.6, rx: o.rx ?? 8 });
  const lines = Array.isArray(label) ? label : [label];
  lines.forEach((t, i) => s.text(x + w / 2, y + h / 2 + (i - (lines.length - 1) / 2) * 16, t, { size: o.size ?? 13, bold: o.bold }));
}

/** Directing at the centre, with its four elements around it. */
const vElements = (() => {
  const s = new Svg(600, 300);
  const C = [300, 150];
  const around = [
    [[90, 60], 'Supervision', 'oversee and guide work'],
    [[510, 60], 'Motivation', 'stir the will to work'],
    [[90, 240], 'Leadership', 'influence people'],
    [[510, 240], 'Communication', 'share ideas and orders'],
  ];
  for (const [[x, y]] of around) s.line(C[0], C[1], x, y, { sw: 1.4, color: 'muted' });
  box(s, C[0] - 80, C[1] - 28, 160, 56, ['Directing', 'sets people in motion'], { fill: 'accent', bold: false });
  for (const [[x, y], name, what] of around) box(s, x - 80, y - 28, 160, 56, [name, what], { size: 12 });
  return s.visual(
    'Diagram with directing in the centre, linked to its four elements: supervision to oversee and guide work, motivation to stir the will to work, leadership to influence people, and communication to share ideas and orders',
    'The four elements of directing.',
  );
})();

/** Maslow's hierarchy drawn as five stacked steps, lowest at the bottom. */
const vMaslow = (() => {
  const s = new Svg(600, 330);
  const levels = [
    ['Physiological', 'food, shelter, basic pay'],
    ['Safety', 'job and income security, pension'],
    ['Affiliation', 'belonging, friendship, team'],
    ['Esteem', 'status, recognition, respect'],
    ['Self-actualisation', 'reaching full potential'],
  ];
  const widths = [500, 430, 360, 290, 220];
  levels.forEach(([name, eg], i) => {
    const w = widths[i], h = 50, y = 270 - i * 56, x = 345 - w / 2;
    box(s, x, y, w, h, [name, eg], { size: 12, fill: i === 4 ? 'accent' : 'fill' });
  });
  s.arrow(30, 316, 30, 34, { sw: 1.6 });
  s.text(42, 52, 'Higher', { size: 12, anchor: 'start', muted: true });
  s.text(42, 300, 'Lower', { size: 12, anchor: 'start', muted: true });
  s.text(330, 20, 'Lower needs come first; a satisfied need stops motivating', { size: 12, muted: true });
  return s.visual(
    'Maslow need hierarchy drawn as five stacked steps: physiological needs at the bottom, then safety, affiliation, esteem and self-actualisation at the top, with an arrow showing that lower needs are met first and a satisfied need stops motivating',
    'Maslow\'s need hierarchy.',
  );
})();

/** Three leadership styles: direction of influence between leader and group. */
const vStyles = (() => {
  const s = new Svg(630, 260);
  const panels = [
    [105, 'Autocratic', 'orders flow one way'],
    [315, 'Democratic', 'two-way consultation'],
    [525, 'Laissez-faire', 'group decides itself'],
  ];
  panels.forEach(([cx, name, what], k) => {
    const L = [cx, 50];
    const M = [[cx - 60, 160], [cx, 160], [cx + 60, 160]];
    s.rect(L[0] - 22, L[1] - 22, 44, 44, { fill: 'accent', color: 'accent', rx: 22 });
    s.text(L[0], L[1], 'L', { bold: true });
    for (const [mx, my] of M) {
      if (k === 0) s.arrow(L[0], L[1] + 22, mx, my - 20, { sw: 1.6 });
      if (k === 1) { s.arrow(L[0], L[1] + 22, mx, my - 20, { sw: 1.4 }); s.head(L[0], L[1] + 22, L[0] - mx, L[1] + 22 - (my - 20)); }
      if (k === 2) s.line(L[0], L[1] + 22, mx, my - 20, { sw: 1.2, dash: true, color: 'muted' });
    }
    if (k === 2) { s.line(M[0][0] + 20, 160, M[1][0] - 20, 160, { sw: 1.6 }); s.line(M[1][0] + 20, 160, M[2][0] - 20, 160, { sw: 1.6 }); }
    for (const [mx, my] of M) { s.rect(mx - 18, my - 18, 36, 36, { fill: 'fill', color: 'accent', rx: 18 }); s.text(mx, my, 'M', { size: 13 }); }
    s.text(cx, 210, name, { bold: true });
    s.text(cx, 232, what, { size: 12, muted: true });
  });
  return s.visual(
    'Three diagrams of leadership styles with a leader L and three members M: autocratic, with arrows only from leader to members; democratic, with two-way arrows; laissez-faire, with a dashed link to the leader and members linked to each other',
    'Leadership styles: who decides?',
  );
})();

// ---------------------------------------------------------------- tables and flows
const vRoute1 = flow('LR', ['What directing is', 'Characteristics and importance', 'Principles of directing', 'Supervision', 'Motivation and Maslow'], 'Route map of Part 1: what directing is, its characteristics and importance, the principles of directing, supervision, and motivation with Maslow\'s hierarchy', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Financial incentives', 'Non-financial incentives', 'Leadership and styles', 'Communication process', 'Barriers and remedies'], 'Route map of Part 2: financial incentives, non-financial incentives, leadership and its styles, the communication process, and barriers with remedies', 'Part 2 at a glance');
const vChar = table(
  ['Characteristic', 'What it means'],
  [
    ['Initiates action', 'Work actually starts only when people are directed'],
    ['Takes place at every level', 'Every manager directs those below, from chief executive to supervisor'],
    ['Continuous process', 'It never stops while the organisation exists'],
    ['Flows from top to bottom', 'Superiors direct subordinates'],
  ],
  'Table of four characteristics of directing: it initiates action, takes place at every level, is a continuous process, and flows from top to bottom',
);
const vImportance = table(
  ['Importance', 'Effect on the firm'],
  [
    ['Initiates action', 'Plans turn into work'],
    ['Integrates efforts', 'Many people pull in one direction'],
    ['Brings out potential', 'People use their abilities fully'],
    ['Eases change', 'Resistance to new methods falls'],
    ['Stability and balance', 'Smooth, steady growth'],
  ],
  'Table of the importance of directing: it initiates action, integrates efforts, brings out potential, eases change and gives stability and balance',
);
const vPrinciples1 = table(
  ['Principle', 'In one line'],
  [
    ['Maximum individual contribution', 'Draw out the full potential of every employee'],
    ['Harmony of objectives', 'Personal goals in line with company goals'],
    ['Unity of command', 'One boss for each subordinate'],
    ['Appropriateness of direction technique', 'Pick the method that suits the people and situation'],
  ],
  'Table of the first four principles of directing: maximum individual contribution, harmony of objectives, unity of command, and appropriateness of direction technique, each explained in a line',
);
const vPrinciples2 = table(
  ['Principle', 'In one line'],
  [
    ['Managerial communication', 'Instructions must be clear and understood'],
    ['Use of informal organisation', 'Work with the groups that exist anyway'],
    ['Leadership', 'Influence people without weakening their goodwill'],
    ['Follow through', 'Check how orders are carried out and help'],
  ],
  'Table of the next four principles of directing: managerial communication, use of informal organisation, leadership, and follow through, each explained in a line',
);
const vSpot1 = table(
  ['Line from the case (imagined courier hub, Vizag)', 'Principle'],
  [
    ['Riders now get route orders only from the hub lead', 'Unity of command'],
    ['A rider who cuts fuel use shares in the saving', 'Harmony of objectives'],
    ['The hub lead rides along on day one of the new route', 'Follow through'],
    ['Changes are first explained to the riders\' cricket-team captain', 'Use of informal organisation'],
  ],
  'Worked example table for an imagined courier hub in Vizag: orders only from the hub lead shows unity of command; sharing fuel savings shows harmony of objectives; riding along on day one shows follow through; briefing the cricket-team captain shows use of informal organisation',
);
const vSupervisor = flow('TB', ['Management: plans and policies', 'Supervisor: explains, guides, settles issues', 'Workers: carry out the work', 'Supervisor: carries problems and ideas back up'], 'Flow showing the supervisor between management and workers: management plans, the supervisor explains and guides, workers do the work, and the supervisor carries problems and ideas back up', 'The supervisor as a link');
const vMotTerms = table(
  ['Term', 'Meaning', 'Example (imagined)'],
  [
    ['Motive', 'An inner urge that moves a person to act', 'Wish to own a scooter'],
    ['Motivation', 'The process of stirring people to act towards goals', 'Working overtime to earn more'],
    ['Motivator', 'A tool a manager uses to motivate', 'A bonus or a promotion'],
  ],
  'Table of three terms: a motive is an inner urge, motivation is the process of stirring people to act towards goals, a motivator is a tool such as a bonus or promotion',
);
const vMotProcess = flow('LR', ['Unsatisfied need', 'Tension', 'Drive', 'Search behaviour', 'Need satisfied', 'Tension reduced'], 'Flow of the motivation process: unsatisfied need, tension, drive, search behaviour, need satisfied, tension reduced', 'How motivation works');
const vNeeds = table(
  ['Employee (imagined dairy plant, Erode)', 'What they ask for', 'Need'],
  [
    ['Murugan, a new helper', 'An advance for his family\'s groceries', 'Physiological'],
    ['Lakshmi, on a yearly contract', 'A permanent post', 'Safety'],
    ['Joseph, transferred from Salem', 'To join the staff football team', 'Affiliation'],
    ['Revathi, a quality chemist', 'Her method named in the plant manual', 'Esteem'],
  ],
  'Worked example table for an imagined dairy plant in Erode: a new helper wanting an advance for groceries shows a physiological need; a contract worker wanting a permanent post shows a safety need; a transferred worker wanting to join the football team shows affiliation; a chemist wanting her method named shows esteem',
);
const vSummary1 = table(
  ['Topic', 'Key idea'],
  [
    ['Directing', 'Instructing, guiding, motivating, leading and communicating'],
    ['Features', 'Initiates action, every level, continuous, top to bottom'],
    ['Principles', 'Eight, from maximum contribution to follow through'],
    ['Supervision', 'Overseeing work; the supervisor links management and workers'],
    ['Maslow', 'Five needs; a satisfied need stops motivating'],
  ],
  'Summary table of Part 1: the meaning of directing, its features, eight principles, supervision and the supervisor as a link, and Maslow\'s five needs',
);
const vTips1 = table(
  ['Question type', 'What earns marks'],
  [
    ['Identify the principle', 'Line quoted and principle named'],
    ['Identify the need', 'Need named and the words that reveal it'],
    ['Explain importance', 'One point per mark, each with a short reason'],
  ],
  'Table of exam tips: to identify a principle, quote the line and name it; to identify a need, name it and quote the revealing words; to explain importance, give one point per mark with a reason',
);
const vIncentive = table(
  ['Type', 'What it is', 'Satisfies mainly'],
  [
    ['Financial', 'Money or benefits with money value', 'Lower needs'],
    ['Non-financial', 'Rewards without direct money value', 'Higher needs'],
  ],
  'Table comparing financial incentives, which are money or benefits with money value and mainly satisfy lower needs, with non-financial incentives, which have no direct money value and mainly satisfy higher needs',
);
const vFin = table(
  ['Financial incentive', 'Example (imagined)'],
  [
    ['Pay and allowances', 'Annual raise, dearness allowance'],
    ['Productivity-linked wage', 'Extra pay per carton above target'],
    ['Bonus', 'Festival bonus over the wage'],
    ['Profit sharing', 'A share of the year\'s profit'],
    ['Co-partnership or stock option', 'Shares at a price below market'],
    ['Retirement benefits', 'Provident fund, pension, gratuity'],
    ['Perquisites', 'Car, housing, medical aid'],
  ],
  'Table of seven financial incentives with imagined examples: pay and allowances, productivity-linked wages, bonus, profit sharing, co-partnership or stock options, retirement benefits, and perquisites',
);
const vNonFin = table(
  ['Non-financial incentive', 'Example (imagined)'],
  [
    ['Status', 'Title of senior technician'],
    ['Organisational climate', 'Trust, fairness, open doors'],
    ['Career advancement', 'Clear path to supervisor'],
    ['Job enrichment', 'A whole product to make, not one step'],
    ['Employee recognition', 'Award at the monthly meeting'],
    ['Job security', 'Assurance of continued work'],
    ['Employee participation', 'Seat on a works committee'],
    ['Employee empowerment', 'Freedom to decide on the spot'],
  ],
  'Table of eight non-financial incentives with imagined examples: status, organisational climate, career advancement, job enrichment, employee recognition, job security, employee participation and employee empowerment',
);
const vPackage = table(
  ['Problem at the imagined handloom cooperative, Pochampally', 'Incentive suggested', 'Type'],
  [
    ['Weavers earn too little in the lean season', 'Productivity-linked wage on finished saris', 'Financial'],
    ['Old members worry about life after weaving', 'Pension fund', 'Financial'],
    ['Skilled designers feel unnoticed', 'Their names on the sari labels', 'Non-financial'],
    ['Young members feel they have no say', 'Seats on the cooperative\'s design panel', 'Non-financial'],
  ],
  'Worked example table for an imagined handloom cooperative: low lean-season income is met by a productivity-linked wage, worry about old age by a pension fund, unnoticed designers by their names on labels, and young members without a say by seats on the design panel',
);
const vLeadImp = table(
  ['Why leadership matters', 'Effect'],
  [
    ['Influences behaviour', 'People give their best willingly'],
    ['Builds relationships', 'Followers cooperate'],
    ['Introduces change', 'New methods are accepted'],
    ['Handles conflict', 'Disputes settle early'],
    ['Trains successors', 'Future leaders are ready'],
  ],
  'Table of the importance of leadership: it influences behaviour, builds relationships, introduces change, handles conflict and trains successors',
);
const vQualities = table(
  ['Quality', 'Why it helps'],
  [
    ['Knowledge', 'Earns the trust of the team'],
    ['Integrity', 'People follow an honest leader'],
    ['Initiative', 'Acts without waiting to be told'],
    ['Communication skill', 'Explains clearly and listens'],
    ['Self-confidence and decisiveness', 'Firm in difficult moments'],
    ['Social and motivation skills', 'Understands and inspires people'],
  ],
  'Table of qualities of a good leader: knowledge, integrity, initiative, communication skill, self-confidence and decisiveness, and social and motivation skills, each with why it helps',
);
const vChoose = table(
  ['Situation (imagined)', 'Style', 'Why'],
  [
    ['Gas leak at a fertiliser store in Kota', 'Autocratic', 'No time to discuss'],
    ['New hostel rules for a college', 'Democratic', 'Students must accept them'],
    ['Award-winning film editors cutting a documentary', 'Laissez-faire', 'Skilled, self-driven experts'],
  ],
  'Worked example table: a gas leak calls for an autocratic style because there is no time to discuss; new hostel rules call for a democratic style so students accept them; expert film editors suit a laissez-faire style',
);
const vProcess = flow('LR', ['Sender', 'Encoding', 'Message through media', 'Decoding', 'Receiver', 'Feedback to sender'], 'Flow of the communication process: sender, encoding, message through media, decoding, receiver, and feedback to the sender; noise can disturb any step', 'Communication process (noise can disturb any step)');
const vFormal = table(
  ['Basis', 'Formal communication', 'Informal communication'],
  [
    ['Channel', 'Official chain of command', 'Social links (grapevine)'],
    ['Speed', 'Slower', 'Very fast'],
    ['Reliability', 'Reliable, often written', 'May carry rumours'],
    ['Patterns', 'Single chain, wheel, circular, free flow, inverted V', 'Single strand, gossip, probability, cluster'],
  ],
  'Table comparing formal communication, which follows the official chain, is slower, reliable and has networks such as single chain, wheel, circular, free flow and inverted V, with informal communication, which moves through social links, is very fast, may carry rumours and follows gossip, cluster and other patterns',
);
const vBarriers = table(
  ['Barrier', 'Arises from', 'Example'],
  [
    ['Semantic', 'Language and meaning', 'Jargon, poor translation'],
    ['Psychological', 'State of mind', 'Distrust, poor attention'],
    ['Organisational', 'Structure and rules', 'Too many levels, rigid rules'],
    ['Personal', 'Attitudes of superiors and subordinates', 'Fear of losing authority'],
  ],
  'Table of four barriers to communication: semantic from language and meaning, psychological from state of mind, organisational from structure and rules, and personal from attitudes of superiors and subordinates, each with an example',
);
const vMemo = table(
  ['Problem at the imagined sugar mill, Kolhapur', 'Barrier'],
  [
    ['Notice uses the term "brix level" without explanation', 'Semantic'],
    ['Cane growers ignore the manager they think is unfair', 'Psychological'],
    ['Complaints must climb five levels to reach the director', 'Organisational'],
    ['The director never asks for staff views', 'Personal'],
  ],
  'Worked example table for an imagined sugar mill: an unexplained technical term is a semantic barrier; distrust of an unfair manager is psychological; complaints climbing five levels is organisational; a director who never asks for views is a personal barrier',
);
const vSummary2 = table(
  ['Topic', 'Key idea'],
  [
    ['Incentives', 'Financial for lower needs, non-financial for higher needs'],
    ['Leadership', 'Influencing people; autocratic, democratic, laissez-faire'],
    ['Communication', 'Sender to receiver with feedback; formal and informal'],
    ['Barriers', 'Semantic, psychological, organisational, personal'],
  ],
  'Summary table of Part 2: incentives, leadership and its styles, communication and its forms, and the four types of barriers',
);
const vTips2 = table(
  ['Question type', 'What earns marks'],
  [
    ['Name the incentive', 'Incentive named and classed as financial or not'],
    ['Identify the style', 'Style named with the line that shows it'],
    ['Identify the barrier', 'Category named plus a matching remedy'],
  ],
  'Table of exam tips: name the incentive and class it; identify the leadership style with the supporting line; identify the barrier category and give a matching remedy',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Directing — Part 1: Meaning, Principles, Supervision and Motivation',
  goals: [
    'Explain the meaning, characteristics and importance of directing',
    'Apply the principles of directing to business situations',
    'Describe the role of a supervisor',
    'Explain motivation and identify needs using Maslow\'s hierarchy',
  ],
  slides: [
    sl('title', 'Directing', {
      b: 'Part 1 — what **directing** is, its **principles**, **supervision** and **motivation**.',
      v: vRoute1,
      n: 'A factory can have excellent plans, a neat organisation chart and well chosen staff, and still nothing happens until someone tells people what to do, guides them and keeps them keen. That is directing. In this part we see what directing means, why it matters, the principles that guide it, the role of the supervisor, and how people are motivated.',
    }),
    sl('diagram', 'Four elements of directing', {
      b: '**Directing** means instructing, guiding, motivating, leading and communicating with people so that they work towards the goals of the organisation.',
      v: vElements,
      n: 'Directing has four elements. Supervision is overseeing the work and guiding people on the job. Motivation stirs their willingness to work. Leadership is the ability to influence them. Communication carries ideas, orders and feedback between people. A manager uses all four together, every day, to turn plans into results.',
    }),
    sl('concept', 'Characteristics of directing', {
      v: vChar,
      n: 'Note four characteristics. Directing initiates action, because the other functions only prepare for work. It happens at every level, since every manager has people to guide. It is continuous, going on as long as the organisation exists, whoever holds the posts. And it flows from the top downwards, from superiors to subordinates.',
    }),
    sl('concept', 'Why directing matters', {
      v: vImportance,
      n: 'Directing is often called the heart of management. It starts action. It integrates the efforts of many people so that they pull in one direction. Good guidance draws out people\'s abilities. When a firm changes its methods, directing helps people accept the change. And it brings stability and balance, so that the firm can grow steadily.',
    }),
    sl('concept', 'Principles of directing (1)', {
      v: vPrinciples1,
      n: 'Experience has given managers a set of principles for directing. The first four are these. Get the maximum contribution from each person. Keep personal goals in harmony with the firm\'s goals. Give each subordinate only one boss, which is unity of command. And choose a direction technique that suits the people and the situation, because no single method works everywhere.',
    }),
    sl('concept', 'Principles of directing (2)', {
      v: vPrinciples2,
      n: 'Four more principles complete the list. Communication from managers must be clear so that orders are understood. Informal groups exist in every firm, so managers should use them rather than fight them. Managers should lead, influencing people without hurting their goodwill. Finally, follow through: after giving an order, check how it is being carried out and help where needed.',
    }),
    sl('check', 'Quick check: which principle?', {
      b: 'A paint company changes its sales commission so that staff gain most when the company gains most.',
      chk: 'm_pr_harmony',
      n: 'Ask whose goals are being brought together here, and the principle will be clear.',
    }),
    sl('example', 'Worked example 1: spotting principles in a case', {
      b: 'Match each line from an imagined courier hub to the principle it shows.',
      bl: [
        'Step 1 — Read each line and ask what problem it solves.',
        'Step 2 — One boss for each rider: unity of command.',
        'Step 3 — Rewards that rise with the firm\'s gains: harmony of objectives.',
        'Step 4 — Checking on day one: follow through; working through a team captain: informal organisation.',
      ],
      v: vSpot1,
      n: 'Let us practise on an imagined courier hub in Vizag. Riders taking route orders only from the hub lead shows unity of command. A rider sharing in the fuel he saves shows harmony of objectives. The hub lead riding along on the first day of a new route shows follow through. Explaining changes first to the cricket captain uses informal organisation. In exams, quote the line, then name the principle.',
    }),
    sl('diagram', 'Supervision and the supervisor', {
      b: '**Supervision** is overseeing what subordinates are doing and guiding them so that work is done as planned. The supervisor is at the operational level.',
      v: vSupervisor,
      n: 'Supervision means overseeing subordinates at work and guiding them. The supervisor sits at the lowest level of management, closest to the workers. He or she explains plans to workers, trains and guides them, keeps the group united, and carries their problems and suggestions back to management. That is why the supervisor is often called the link between management and workers.',
    }),
    sl('check', 'Quick check: what is the supervisor doing?', {
      b: 'A shift supervisor at a printing press shows a new operator how to set the colour rollers.',
      chk: 'm_sup_training',
      n: 'Think about which job of the supervisor is about teaching skills at the workplace.',
    }),
    sl('concept', 'Motive, motivation and motivator', {
      v: vMotTerms,
      n: 'Three related words. A motive is an inner urge, such as the wish to own a scooter. Motivation is the process of stirring people to act towards goals. A motivator is a tool a manager uses, such as a bonus or a promotion. Motivation is an internal feeling, it can be positive or negative, and it is complex because people differ.',
    }),
    sl('diagram', 'The motivation process', {
      v: vMotProcess,
      n: 'Motivation starts with an unsatisfied need. The need creates tension, the tension creates a drive, and the drive leads to search behaviour, that is, action to satisfy the need. When the need is satisfied, the tension falls. Managers can use this chain by offering rewards that meet the needs their employees actually feel.',
    }),
    sl('diagram', 'Maslow\'s need hierarchy', {
      v: vMaslow,
      n: 'Abraham Maslow arranged human needs in five levels. At the bottom are physiological needs such as food and shelter, met at work by basic pay. Next come safety needs, then affiliation or belonging. Above those are esteem needs, for status and respect. At the top is self-actualisation, the urge to become everything one is capable of becoming.',
    }),
    sl('check', 'Quick check: climb the hierarchy', {
      b: 'Put the five needs in order from the lowest to the highest.',
      chk: 'ord_maslow',
      n: 'Start with what a person needs simply to survive, and end with reaching one\'s full potential.',
    }),
    sl('concept', 'Assumptions of Maslow\'s theory', {
      bl: [
        'People\'s behaviour depends on their **needs**.',
        'Needs follow an **order** from lower to higher.',
        'A **satisfied need no longer motivates**; the next higher need takes over.',
        'A person moves up only when the lower need is **reasonably met**.',
      ],
      n: 'The theory rests on a few assumptions. Behaviour depends on needs. Needs follow an order, from basic to higher. Once a need is satisfied it stops motivating, and the next higher need becomes the driver. So a manager should first find out where an employee stands, and then offer something that meets the next unmet need.',
    }),
    sl('example', 'Worked example 2: identifying needs', {
      b: 'Four employees of an imagined dairy plant in Erode ask for different things. Name each need.',
      bl: [
        'Step 1 — Find the words that show what the person lacks.',
        'Step 2 — Survival items point to physiological; permanence points to safety.',
        'Step 3 — Friends and groups point to affiliation; names and titles point to esteem.',
      ],
      v: vNeeds,
      n: 'Look at the four employees. Murugan wants an advance for groceries, a basic survival need, so physiological. Lakshmi wants a permanent post, which is about security, so safety. Joseph wants to join the football team, which is about belonging, so affiliation. Revathi wants her method named in the manual, which is about respect, so esteem.',
    }),
    sl('check', 'Quick check: true or false?', {
      b: 'Only top-level managers perform the function of directing.',
      chk: 'tf_dir_top',
      n: 'Think about the supervisor on the shop floor. Does he or she guide anyone?',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up: directing sets people in motion through supervision, motivation, leadership and communication. It initiates action, happens at every level, is continuous and flows downward. Eight principles guide it. The supervisor oversees work and links management with workers. Motivation starts from unsatisfied needs, and Maslow arranges those needs in five levels, from physiological to self-actualisation.',
    }),
    sl('exam-tips', 'Exam tips', {
      b: '**Common mistakes**\n- Calling "one boss" harmony of objectives: it is **unity of command**.\n- Confusing **esteem** (status, recognition) with **self-actualisation** (full potential).\n- Writing that only top managers direct.\n\n**How marks are awarded**\n- Case parts: quote the line **and** name the principle or need.\n- 5 marks: five clear points of about 20 words each.',
      v: vTips1,
      n: 'A few tips. Read each case line slowly and match it to exactly one principle or need. Esteem is about respect and status; self-actualisation is about growing to one\'s full potential. Remember that directing happens at every level. In case questions, marks come for quoting the line and naming the concept, so do both every time.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Directing — Part 2: Incentives, Leadership and Communication',
  goals: [
    'Classify financial and non-financial incentives with examples',
    'Explain the importance of leadership and the qualities of a good leader',
    'Choose a suitable leadership style for a situation',
    'Explain the communication process, its forms and barriers, and ways to improve it',
  ],
  slides: [
    sl('title', 'Directing: incentives, leadership and communication', {
      b: 'Part 2 — **incentives**, **leadership** and **communication**.',
      v: vRoute2,
      n: 'In this part we look at the tools a manager uses while directing. First, incentives, both financial and non-financial. Then leadership: why it matters, what makes a good leader, and the main styles. Finally communication: how it works, formal and informal channels, the barriers that block it, and how to remove them.',
    }),
    sl('concept', 'Incentives: two kinds', {
      v: vIncentive,
      n: 'An incentive is anything that encourages people to work better. Financial incentives are in money or have a money value, such as a raise or a pension. They mainly meet lower needs. Non-financial incentives have no direct money value, such as recognition or a challenging job. They mainly meet higher needs. A good manager uses both.',
    }),
    sl('concept', 'Financial incentives', {
      v: vFin,
      n: 'Here are the main financial incentives. Pay and allowances, such as a yearly raise. Productivity-linked wages that reward higher output. A bonus over the wage. Profit sharing, where staff get part of the profit. Co-partnership or stock options, where staff can buy shares cheaply. Retirement benefits like provident fund and pension. And perquisites such as a car or housing.',
    }),
    sl('concept', 'Non-financial incentives', {
      v: vNonFin,
      n: 'Non-financial incentives include status, a friendly and fair organisational climate, chances of career advancement, and job enrichment, which makes work more varied and challenging. Recognition, job security, participation in decisions and empowerment, which means freedom to decide, also motivate strongly. They matter most once pay is reasonable.',
    }),
    sl('check', 'Quick check: match the incentive', {
      b: 'Match each practice at a publishing house with the incentive it represents.',
      chk: 'mt_incentive',
      n: 'First decide whether each practice involves money. Then name the incentive.',
    }),
    sl('example', 'Worked example 1: building an incentive package', {
      b: 'An imagined handloom cooperative faces four problems. Suggest one incentive for each.',
      bl: [
        'Step 1 — Find the need behind each problem.',
        'Step 2 — Money worries call for financial incentives.',
        'Step 3 — Respect and voice call for non-financial incentives.',
      ],
      v: vPackage,
      n: 'Look at the cooperative in Pochampally. Low lean-season income is a money problem, so a wage linked to finished saris helps. Worry about old age needs a pension fund. Designers who feel unnoticed want respect, so their names on the labels work well. Young members who feel unheard can be given seats on the design panel, which is participation.',
    }),
    sl('concept', 'Leadership and why it matters', {
      b: '**Leadership** is the process of influencing people to work willingly towards group goals.',
      v: vLeadImp,
      n: 'Leadership is influence. A leader makes people want to do what needs doing. It matters because it shapes behaviour, builds relationships with followers, helps introduce change, settles conflicts before they grow, and trains people who can lead in future. A manager with formal authority but no leadership gets only grudging obedience.',
    }),
    sl('concept', 'Qualities of a good leader', {
      v: vQualities,
      n: 'What makes a good leader? Knowledge of the work, so that the team trusts the leader. Integrity, because people follow someone honest. Initiative, acting without waiting to be told. Good communication, including listening. Self-confidence and decisiveness, especially in difficult moments. And social and motivation skills, to understand and inspire people.',
    }),
    sl('diagram', 'Leadership styles', {
      v: vStyles,
      n: 'There are three main styles. An autocratic leader decides alone and expects obedience; orders flow one way. A democratic or participative leader consults the group and decides with their views in mind; communication is two way. A laissez-faire or free-rein leader gives the group freedom to decide for itself and helps only when asked.',
    }),
    sl('check', 'Quick check: name the style', {
      b: 'A construction firm owner makes every decision himself and expects exact obedience.',
      chk: 'm_lead_auto',
      n: 'Who makes the decisions here, and are the workers consulted at all?',
    }),
    sl('example', 'Worked example 2: choosing a style', {
      b: 'Pick a leadership style for three imagined situations and give a reason.',
      bl: [
        'Step 1 — Is there time to consult?',
        'Step 2 — How skilled and self-driven is the group?',
        'Step 3 — Does the decision need the group\'s acceptance?',
      ],
      v: vChoose,
      n: 'No style is always best. A gas leak at a fertiliser store leaves no time for discussion, so clear autocratic orders are right. New hostel rules must be accepted by students, so a democratic approach works better. A team of award-winning film editors is skilled and self-driven, so a free-rein style gets the best from them.',
    }),
    sl('diagram', 'The communication process', {
      b: '**Communication** is the exchange of facts, ideas, opinions or feelings between two or more people to create understanding.',
      v: vProcess,
      n: 'Communication has several elements. The sender has an idea and encodes it into words, symbols or gestures. The message travels through a medium such as speech, a letter or an email. The receiver decodes it into meaning and responds with feedback. Noise, anything that disturbs the message, can creep in at any stage.',
    }),
    sl('check', 'Quick check: name the step', {
      b: 'What is the step of turning an idea into words or symbols called?',
      chk: 'fb_encoding',
      n: 'This step is done by the sender, before the message is sent.',
    }),
    sl('two-column', 'Formal and informal communication', {
      cols: ['**Formal**\n\n- Follows the official chain\n- Slower, often written\n- Reliable\n- Networks: single chain, wheel, circular, free flow, inverted V', '**Informal (grapevine)**\n\n- Moves through social links\n- Very fast\n- May spread rumours\n- Patterns: single strand, gossip, probability, cluster'],
      v: vFormal,
      n: 'Formal communication follows official lines, for example a manager\'s circular to staff. It is slower but reliable and often recorded. Informal communication, the grapevine, travels through friendships and casual talk. It is very fast and can help managers sense moods, but it can also spread rumours. Wise managers use both channels.',
    }),
    sl('concept', 'Barriers to communication', {
      v: vBarriers,
      n: 'Messages often fail. Semantic barriers come from language: jargon, unclear words, poor translation. Psychological barriers come from the mind: distrust, poor attention, judging too early. Organisational barriers come from structure: too many levels, rigid rules, status gaps. Personal barriers come from attitudes, such as a boss who fears that ideas from below will weaken his authority.',
    }),
    sl('check', 'Quick check: match the barrier', {
      b: 'Match each problem at a bus depot with the type of barrier.',
      chk: 'mt_barriers',
      n: 'For each problem, ask: is it language, emotion, structure or a person\'s attitude?',
    }),
    sl('example', 'Worked example 3: diagnosing a sugar mill', {
      b: 'Classify four communication problems at an imagined sugar mill in Kolhapur.',
      bl: [
        'Step 1 — Words not understood: semantic.',
        'Step 2 — Feelings such as distrust: psychological.',
        'Step 3 — Levels and rules: organisational; a superior\'s attitude: personal.',
      ],
      v: vMemo,
      n: 'At the imagined sugar mill, an unexplained technical term on a notice is a semantic barrier. Growers ignoring a manager they think unfair is psychological. Complaints that must climb five levels face an organisational barrier. A director who never asks for staff views shows a personal barrier. Once the barrier is named, a matching remedy follows.',
    }),
    sl('concept', 'Improving communication', {
      bl: [
        'Clarify the idea before sending it.',
        'Suit the words and medium to the receiver.',
        'Consult others when planning a message.',
        'Watch tone and body language.',
        'Listen well and seek feedback; follow up.',
      ],
      n: 'Managers can remove most barriers. Be clear about the idea first. Use words and a medium that the receiver understands. Consult others when planning important messages. Pay attention to tone and body language. Above all, listen and ask for feedback, then follow up to make sure the message was understood and acted upon.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up: incentives can be financial, which mainly meet lower needs, or non-financial, which mainly meet higher needs. Leadership is influence; good leaders have knowledge, integrity and initiative, and choose among autocratic, democratic and laissez-faire styles to suit the situation. Communication runs from sender to receiver with feedback, through formal and informal channels, and four kinds of barrier can block it.',
    }),
    sl('exam-tips', 'Exam tips', {
      b: '**Common mistakes**\n- Calling perquisites non-financial: they are **financial**.\n- Mixing up **semantic** (language) and **psychological** (emotion) barriers.\n- Naming a style without the line that shows it.\n\n**How marks are awarded**\n- Case parts: quote the line **and** name the concept.\n- Differences: state **both sides** on each basis.',
      v: vTips2,
      n: 'A few tips. Perquisites such as a car or housing have money value, so they are financial incentives. A barrier caused by words is semantic, while one caused by feelings is psychological. When you name a leadership style in a case, always quote the line that reveals it. In difference questions, give one basis per point and state both sides.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Directing — Notes',
  sections: [
    {
      h: '1. Meaning, characteristics and importance',
      t: 1,
      b: '**Directing** is the management function of instructing, guiding, motivating, leading and communicating with people so that they work towards organisational goals. Its four elements are **supervision, motivation, leadership and communication**.\n\n**Characteristics:** it initiates action; it takes place at every level; it is a continuous process; it flows from top to bottom.\n\n**Importance:** it starts action, integrates the efforts of many people, brings out their potential, helps people accept change, and gives stability and balance to the organisation.',
      terms: [
        ['Directing', 'Instructing, guiding, motivating, leading and communicating with people towards organisational goals.'],
        ['Elements of directing', 'Supervision, motivation, leadership and communication.'],
      ],
      v: vElements,
      vs: [vChar, vImportance],
    },
    {
      h: '2. Principles of directing',
      t: 1,
      b: '1. **Maximum individual contribution**: techniques should draw out each person\'s full potential.\n2. **Harmony of objectives**: personal and organisational goals should support each other.\n3. **Unity of command**: each subordinate gets orders from one superior only.\n4. **Appropriateness of direction technique**: the method must suit the people and the situation.\n5. **Managerial communication**: orders must be clear and understood.\n6. **Use of informal organisation**: work with informal groups, not against them.\n7. **Leadership**: influence people without weakening their goodwill.\n8. **Follow through**: check how instructions are carried out and help where needed.',
      terms: [
        ['Unity of command', 'A subordinate receives orders from only one superior.'],
        ['Follow through', 'Checking the implementation of instructions and helping with difficulties.'],
      ],
      v: vPrinciples1,
      vs: [vPrinciples2, vSpot1],
    },
    {
      h: '3. Supervision',
      t: 2,
      b: '**Supervision** is overseeing subordinates at work and guiding them so that work is done as planned. The supervisor is at the operational level, in daily contact with workers.\n\n**Role and importance of the supervisor**\n- Explains plans and instructions to workers.\n- Guides and trains workers on the job.\n- Maintains friendly relations and unity in the work group.\n- Motivates workers and keeps up discipline.\n- Passes workers\' problems and ideas to management (the link between the two).\n- Checks that work meets the expected quantity and quality.',
      terms: [
        ['Supervision', 'Overseeing the work of subordinates and guiding them on the job.'],
        ['Supervisor', 'An operational-level manager in direct contact with workers.'],
      ],
      v: vSupervisor,
    },
    {
      h: '4. Motivation and Maslow\'s need hierarchy',
      t: 3,
      b: '**Motive**: an inner urge. **Motivation**: the process of stirring people to act towards goals. **Motivator**: a tool used to motivate.\n\n**Features:** an internal feeling; produces goal-directed behaviour; can be positive or negative; a complex process because people differ.\n\n**Process:** unsatisfied need → tension → drive → search behaviour → need satisfied → tension reduced.\n\n**Importance:** improves performance, changes negative attitudes, reduces turnover and absenteeism, and helps introduce change smoothly.\n\n**Maslow\'s hierarchy** (lowest to highest): physiological, safety or security, affiliation or belonging, esteem, self-actualisation. **Assumptions:** behaviour depends on needs; needs are in an order; a satisfied need no longer motivates; a person moves up when the lower need is reasonably met.',
      terms: [
        ['Esteem need', 'The need for status, recognition and respect.'],
        ['Self-actualisation', 'The urge to become everything one is capable of becoming.'],
      ],
      v: vMaslow,
      vs: [vMotTerms, vMotProcess, vNeeds],
    },
    {
      h: '5. Financial and non-financial incentives',
      t: 3,
      b: '**Financial incentives** (money or money value): pay and allowances; productivity-linked wage incentives; bonus; profit sharing; co-partnership or stock options; retirement benefits such as provident fund, pension and gratuity; perquisites such as a car, housing or medical aid.\n\n**Non-financial incentives**: status; organisational climate; career advancement opportunity; job enrichment; employee recognition programmes; job security; employee participation; employee empowerment.\n\nFinancial incentives mainly meet lower needs; non-financial incentives mainly meet higher needs, so a balanced package uses both.',
      terms: [
        ['Job enrichment', 'Designing jobs with more variety, responsibility and scope for growth.'],
        ['Employee empowerment', 'Giving employees more autonomy and power to decide.'],
        ['Perquisites', 'Fringe benefits such as a car or housing over and above salary.'],
      ],
      v: vFin,
      vs: [vNonFin, vPackage],
    },
    {
      h: '6. Leadership',
      t: 4,
      b: '**Leadership** is the process of influencing people to work willingly towards group goals.\n\n**Importance:** influences behaviour; builds relationships with followers; helps introduce change; handles conflict; trains successors.\n\n**Qualities of a good leader:** physical fitness, knowledge, integrity, initiative, communication skill, motivation skill, self-confidence, decisiveness and social skills.\n\n**Styles**\n- **Autocratic**: the leader decides alone and expects obedience; suits emergencies and unskilled groups.\n- **Democratic or participative**: the leader consults the group before deciding; builds commitment.\n- **Laissez-faire or free-rein**: the group decides; suits skilled, self-driven experts.',
      terms: [
        ['Leadership', 'Influencing people to work willingly towards group goals.'],
        ['Laissez-faire style', 'A style in which the leader leaves decisions to a capable group.'],
      ],
      v: vStyles,
      vs: [vLeadImp, vQualities, vChoose],
    },
    {
      h: '7. Communication',
      t: 5,
      b: '**Communication** is the exchange of facts, ideas, opinions or feelings to create common understanding.\n\n**Elements:** sender, message, encoding, media, decoding, receiver, feedback, noise.\n\n**Formal communication** follows the official chain (networks: single chain, wheel, circular, free flow, inverted V). **Informal communication** (grapevine) moves through social links; it is fast but may carry rumours.\n\n**Barriers:** semantic (language, jargon, translation); psychological or emotional (distrust, inattention, premature judgement); organisational (levels, rigid rules, status); personal (fear of challenge to authority, lack of confidence in subordinates, no incentive to communicate).\n\n**Improving communication:** clarify ideas; communicate to the receiver\'s needs; consult others; mind tone and language; listen; ensure feedback; follow up.',
      terms: [
        ['Encoding', 'Converting a message into words, symbols or gestures.'],
        ['Grapevine', 'Informal communication through social relationships.'],
        ['Semantic barrier', 'A barrier arising from language or meaning, such as jargon.'],
      ],
      v: vProcess,
      vs: [vFormal, vBarriers, vMemo],
    },
  ],
  tips: '**Common mistakes**\n- Writing that directing is done only by top managers: every level directs.\n- Confusing esteem with self-actualisation, or safety with physiological needs.\n- Classing perquisites or retirement benefits as non-financial: they are financial.\n- Mixing semantic (language) with psychological (emotion) barriers.\n\n**How marks are usually awarded**\n- 1-mark objective items: one correct option.\n- Case parts: quote the line and name the principle, need, incentive, style or barrier.\n- 3 marks: three distinct points; 5 marks: five points of about 20 words each.\n- Differences: one basis per point, both sides.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Directing**', 'Instructing, guiding, motivating, leading and communicating with people towards goals.', 'definition', 1],
  ['Four elements of directing', 'Supervision, motivation, leadership, communication.', 'concept', 1],
  ['Characteristics of directing', 'Initiates action; every level; continuous; flows top to bottom.', 'concept', 1],
  ['Why is directing called the heart of management?', 'It starts action and integrates everyone\'s efforts towards goals.', 'concept', 1],
  ['**Harmony of objectives**', 'Personal goals of employees in line with the goals of the firm.', 'definition', 1],
  ['**Unity of command** (directing)', 'Each subordinate receives orders from one superior only.', 'definition', 1],
  ['**Follow through**', 'Checking how orders are carried out and helping where needed.', 'definition', 1],
  ['Use of informal organisation', 'Managers work with informal groups to pass on information and win support.', 'concept', 1],
  ['**Supervision**', 'Overseeing subordinates at work and guiding them on the job.', 'definition', 2],
  ['Why is a supervisor called a link?', 'Carries plans down to workers and their problems up to management.', 'concept', 2],
  ['**Motive** vs **motivator**', 'Motive: inner urge. Motivator: tool a manager uses, such as a bonus.', 'concept', 3],
  ['The motivation process starts with', 'An **unsatisfied need**, which creates tension and drive.', 'fact', 3],
  ['Maslow: lowest to highest', 'Physiological → safety → affiliation → esteem → self-actualisation.', 'concept', 3],
  ['**Esteem** need', 'Status, recognition and respect.', 'definition', 3],
  ['**Self-actualisation**', 'Becoming everything one is capable of becoming.', 'definition', 3],
  ['Key assumption of Maslow', 'A satisfied need no longer motivates.', 'concept', 3],
  ['Wants a permanent post: which need?', '**Safety** (security).', 'example', 3],
  ['Seven financial incentives', 'Pay, productivity-linked wage, bonus, profit sharing, stock options, retirement benefits, perquisites.', 'concept', 3],
  ['**Co-partnership**', 'Employees may buy company shares at a price below market.', 'definition', 3],
  ['Are perquisites financial?', '**Yes**: a car or housing has money value.', 'exam-tip', 3],
  ['Eight non-financial incentives', 'Status, climate, career advancement, job enrichment, recognition, job security, participation, empowerment.', 'concept', 3],
  ['**Job enrichment**', 'More variety, responsibility and growth in a job.', 'definition', 3],
  ['**Leadership**', 'Influencing people to work willingly towards group goals.', 'definition', 4],
  ['Three qualities of a good leader', 'Knowledge, integrity, initiative (also decisiveness, communication skill).', 'concept', 4],
  ['Autocratic style', 'Leader decides alone; orders flow one way; suits emergencies.', 'concept', 4],
  ['Democratic style', 'Leader consults the group before deciding; builds commitment.', 'concept', 4],
  ['Laissez-faire style', 'Group decides; leader helps on request; suits skilled experts.', 'concept', 4],
  ['Elements of communication', 'Sender, encoding, message, media, decoding, receiver, feedback, noise.', 'concept', 5],
  ['**Grapevine**', 'Informal communication through social links: fast, may spread rumours.', 'definition', 5],
  ['Four types of barriers', 'Semantic, psychological, organisational, personal.', 'concept', 5],
  ['Jargon in a notice: which barrier?', '**Semantic**.', 'example', 5],
  ['Five ways to improve communication', 'Clarify ideas, suit the receiver, consult, listen, seek feedback and follow up.', 'concept', 5],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-default-chapter-test-short',
  title: 'Chapter test (short) — Directing',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_dir_initiates', 'm_maslow_safety', 'm_lead_demo', 'ar_dir_continuous'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_dir_imp', 's_lead_qual', 's3_maslow_case'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_dir_principles', 'l_barriers'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the passage and answer all parts. Part (c) has an internal choice.', items: ['cb_annapurna'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-default-chapter-test-long',
  title: 'Chapter test (long) — Directing',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_dir_pervasive', 'm_pr_unity', 'm_sup_link', 'm_maslow_esteem', 'm_fin_copartner', 'm_nonfin_enrich', 'm_lead_free', 'm_comm_semantic', 'ar_maslow_order', 'ar_grapevine_fast'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_mot_features', 's_formal_informal', { attempt: 1, keys: ['s_fin_nonfin', 's_semantic_case'] }, 's3_sup_role', { attempt: 1, keys: ['s3_nonfin', 's3_lead_styles'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_maslow', { attempt: 1, keys: ['l_dir_importance', 'l_lead_importance'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each passage and answer all parts. Part (c) of each has an internal choice.', items: ['cb_rangrez', 'cb_tezdepot'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of cbse-12-business-studies-ch07 only (directing; supervision; motivation, Maslow and incentives; leadership; communication)',
    originality: 'every firm, person, case and line written for this chapter (imagined Indian businesses, labelled); no NCERT text, case or exercise and no board/sample-paper item reused',
    facts: 'standard concepts only; no statistics or real company cases',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
