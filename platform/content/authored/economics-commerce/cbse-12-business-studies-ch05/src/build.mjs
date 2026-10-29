// Build CBSE 12 Business Studies ch05 Organising. Run from platform/:
//   npx tsx content/authored/economics-commerce/cbse-12-business-studies-ch05/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from './lib.mjs';

setUnit('cbse-12-business-studies-ch05', 'economics-commerce');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG organisation charts
function box(s, x, y, w, h, label, o = {}) {
  s.rect(x, y, w, h, { fill: o.fill ?? 'fill', color: o.color ?? 'accent', sw: 1.6, rx: 8 });
  const lines = Array.isArray(label) ? label : [label];
  lines.forEach((t, i) => s.text(x + w / 2, y + h / 2 + (i - (lines.length - 1) / 2) * 16, t, { size: o.size ?? 13, bold: o.bold }));
}
/** Elbow connector from the bottom centre of a parent box to the top centre of each child box. */
function connect(s, px, py, children, midY) {
  s.line(px, py, px, midY, { sw: 1.4 });
  const xs = children.map((c) => c[0]);
  s.line(Math.min(...xs), midY, Math.max(...xs), midY, { sw: 1.4 });
  for (const [cx, cy] of children) s.line(cx, midY, cx, cy, { sw: 1.4 });
}

const vFunctional = (() => {
  const s = new Svg(620, 230);
  box(s, 230, 16, 160, 46, 'Managing Director', { fill: 'accent', bold: true });
  const heads = ['Production', 'Marketing', 'Finance', 'Human Resources'];
  const w = 130, gap = 20, x0 = (620 - (4 * w + 3 * gap)) / 2;
  const cx = heads.map((_, i) => x0 + i * (w + gap) + w / 2);
  connect(s, 310, 62, cx.map((x) => [x, 110]), 86);
  heads.forEach((h, i) => box(s, x0 + i * (w + gap), 110, w, 44, [h, 'department']));
  s.text(310, 196, 'Each department does one function for the whole firm', { size: 13, muted: true });
  return s.visual(
    'Functional structure chart: a managing director at the top, with four departments below, production, marketing, finance and human resources, each doing one function for the whole firm',
    'Functional structure: jobs grouped by function (imagined firm).',
  );
})();

const vDivisional = (() => {
  const s = new Svg(640, 270);
  box(s, 240, 14, 160, 44, 'Chief Executive', { fill: 'accent', bold: true });
  const divs = ['Kitchen appliances', 'Paints', 'Packaged foods'];
  const w = 180, gap = 25, x0 = (640 - (3 * w + 2 * gap)) / 2;
  const cx = divs.map((_, i) => x0 + i * (w + gap) + w / 2);
  connect(s, 320, 58, cx.map((x) => [x, 100]), 80);
  divs.forEach((d, i) => {
    const x = x0 + i * (w + gap);
    box(s, x, 100, w, 40, [d, 'division'], { size: 12 });
    const fx = [x + 30, x + 90, x + 150];
    connect(s, x + w / 2, 140, fx.map((f) => [f, 178]), 160);
    ['Prod.', 'Mktg', 'Fin.'].forEach((f, j) => box(s, fx[j] - 27, 178, 54, 32, f, { fill: 'fill', color: 'muted', size: 12 }));
  });
  s.text(320, 246, 'Each product division has its own production, marketing and finance', { size: 13, muted: true });
  return s.visual(
    'Divisional structure chart: a chief executive at the top with three product divisions, kitchen appliances, paints and packaged foods; under each division are its own production, marketing and finance units',
    'Divisional structure: jobs grouped by product (imagined group).',
  );
})();

const vElements = (() => {
  const s = new Svg(560, 270);
  box(s, 180, 14, 200, 50, ['Superior', '(delegates the task)'], { fill: 'accent', bold: true });
  box(s, 180, 200, 200, 50, ['Subordinate', '(does the task)'], { bold: true });
  s.arrow(220, 66, 220, 196, { color: 'accent', sw: 2.4 });
  s.text(210, 130, 'Authority flows down', { anchor: 'end', size: 13, color: 'accent' });
  s.arrow(340, 196, 340, 66, { color: 'blue', sw: 2.4 });
  s.text(350, 112, 'Responsibility and', { anchor: 'start', size: 13, color: 'blue' });
  s.text(350, 130, 'accountability', { anchor: 'start', size: 13, color: 'blue' });
  s.text(350, 148, 'flow up', { anchor: 'start', size: 13, color: 'blue' });
  return s.visual(
    'Diagram of the elements of delegation: authority flows down from the superior to the subordinate; responsibility and accountability flow up from the subordinate to the superior',
    'Authority can be delegated; accountability cannot.',
  );
})();

const vSpread = (() => {
  const s = new Svg(600, 250);
  const levels = [['Top management', 'policy, new units, loans'], ['Middle management', 'regional targets, budgets'], ['Lower management', 'local prices, stock, rosters']];
  levels.forEach(([l, d], i) => {
    const w = 200 + i * 140, x = (600 - w) / 2, y = 20 + i * 72;
    box(s, x, y, w, 52, [l, d], { fill: i === 0 ? 'accent' : 'fill', size: 13 });
  });
  s.text(300, 236, 'Decentralisation spreads decisions to every level; key ones stay at the top', { size: 12, muted: true });
  return s.visual(
    'Pyramid of three levels of management under decentralisation: top management keeps policy, new units and loans; middle management decides regional targets and budgets; lower management decides local prices, stock and rosters',
    'Decentralisation: authority spread systematically across levels.',
  );
})();

// ---------------------------------------------------------------- tables and flows
const vRoute1 = flow('LR', ['What organising is', 'Four steps', 'Why it matters', 'Functional structure', 'Divisional structure'], 'Route map of Part 1: what organising is, its four steps, why it matters, the functional structure and the divisional structure', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Formal organisation', 'Informal organisation', 'Delegation', 'Decentralisation', 'Delegation vs decentralisation'], 'Route map of Part 2: formal organisation, informal organisation, delegation, decentralisation, and how delegation and decentralisation differ', 'Part 2 at a glance');
const vPlace = flow('LR', ['Planning: decide what to do', 'Organising: arrange work, people and authority', 'Staffing, directing and controlling'], 'Flow showing that organising comes after planning: planning decides what to do, organising arranges work, people and authority, and then staffing, directing and controlling follow', 'Organising turns plans into a working arrangement');
const vSteps = flow('LR', ['1. Identify and divide the work', '2. Departmentalise', '3. Assign duties', '4. Establish reporting relationships'], 'Flow of the four steps of organising: identify and divide the work, departmentalise, assign duties, and establish reporting relationships', 'The process of organising');
const vEventCo = table(
  ['Step', 'What Utsav Events (imagined, Guwahati) does'],
  [
    ['Identify and divide work', 'Lists venue booking, decoration, catering, sound, guest management and billing as separate jobs'],
    ['Departmentalise', 'Forms three units: Venue and Décor, Food, and Client Services'],
    ['Assign duties', 'Gives Food to a trained chef and Client Services to an experienced coordinator'],
    ['Reporting relationships', 'Unit staff report to unit heads; unit heads report to the owner'],
  ],
  'Worked example table applying the four steps of organising to an imagined events company in Guwahati: listing jobs, forming three units, assigning heads by skill, and fixing who reports to whom',
  'Worked example: the four steps applied.',
);
const vImportance = table(
  ['Importance', 'In one line'],
  [
    ['Benefits of specialisation', 'Repeating one kind of job builds skill and speed'],
    ['Clarity in working relationships', 'Everyone knows whom to report to'],
    ['Optimum utilisation of resources', 'No overlap of jobs, no idle resources'],
    ['Adaptation to change', 'The structure can be adjusted when conditions change'],
    ['Effective administration', 'Clear jobs remove confusion and duplication'],
    ['Development of personnel', 'Delegated work lets people grow; managers find time for new ideas'],
    ['Expansion and growth', 'New products, branches or units can be added in an orderly way'],
  ],
  'Table of seven points of importance of organising: specialisation, clarity in relationships, optimum use of resources, adaptation to change, effective administration, development of personnel, and expansion and growth',
);
const vStructure = table(
  ['Organisation structure', 'Meaning'],
  [
    ['What it is', 'The framework of jobs, departments and authority relationships within which work is done'],
    ['Shown by', 'An organisation chart'],
    ['Related idea', 'Span of management: the number of subordinates one superior can manage well, which shapes the levels of the structure'],
    ['Two common forms', 'Functional and divisional'],
  ],
  'Table explaining organisation structure: the framework of jobs, departments and authority relationships, shown in an organisation chart, shaped by the span of management, with functional and divisional as the two common forms',
);
const vFuncPros = table(
  ['Advantages', 'Limitations'],
  [
    ['Specialisation and efficiency in each function', 'Departments may chase their own goals over the firm\'s'],
    ['Little duplication of effort', 'Coordination across departments is hard'],
    ['Easy training of staff in a narrow skill set', 'Conflicts of interest between departments'],
    ['Close control within each department', 'Narrow outlook; managers get little all-round experience'],
  ],
  'Table of advantages of the functional structure, such as specialisation, little duplication, easy training and close control, against its limitations, such as departmental goals over firm goals, hard coordination, conflicts and a narrow outlook',
);
const vDivPros = table(
  ['Advantages', 'Limitations'],
  [
    ['Product specialisation; division heads gain varied skills', 'Conflicts among divisions over resources'],
    ['Each division head accountable for its profit', 'Costly: functions are duplicated in each division'],
    ['Quick decisions within a division', 'Division heads may put their division before the firm'],
    ['Easy to add a new division for growth', 'Needs many capable managers'],
  ],
  'Table of advantages of the divisional structure, such as product specialisation, accountability for profit, quick decisions and easy growth, against its limitations, such as conflicts, duplication costs, divisional self-interest and the need for many managers',
);
const vChoose = table(
  ['Imagined firm', 'Products and needs', 'Suitable structure'],
  [
    ['Sutlej Tubes, Ludhiana', 'One product (steel tubes), large output, needs specialists', 'Functional'],
    ['Malabar Group, Kochi', 'Spices, coir mats and boat tours: different inputs and buyers', 'Divisional'],
  ],
  'Worked example table: a single-product steel tube maker suits a functional structure, while a group selling spices, coir mats and boat tours suits a divisional structure',
  'Worked example: match the structure to the business.',
);
const vCompare1 = table(
  ['Basis', 'Functional', 'Divisional'],
  [
    ['Grouping', 'By function', 'By product'],
    ['Specialisation', 'Functional', 'Product'],
    ['Responsibility for results', 'Hard to fix for overall results', 'Division head answerable for profit'],
    ['Cost', 'Economical', 'Costly (duplication)'],
    ['Growth', 'Harder to add products', 'Add a new division easily'],
  ],
  'Comparison table of functional and divisional structures on grouping, specialisation, responsibility for results, cost and growth',
);
const vSummary1 = table(
  ['Idea', 'Remember'],
  [
    ['Organising', 'Arranging work, people, resources and authority to carry out plans'],
    ['Steps', 'Divide work, departmentalise, assign duties, fix reporting lines'],
    ['Functional', 'By function; suits a large single-product firm'],
    ['Divisional', 'By product; suits a firm with many distinct products'],
  ],
  'Summary table of Part 1: meaning of organising, its four steps, and when functional and divisional structures suit a firm',
);
const vFormal = table(
  ['Formal organisation', 'Feature'],
  [
    ['Origin', 'Deliberately designed by top management'],
    ['Rules', 'Written rules, procedures and job descriptions'],
    ['Authority', 'Comes from the position held'],
    ['Communication', 'Through the official chain (scalar chain)'],
  ],
  'Table of features of formal organisation: designed by management, written rules, authority from position, and communication through the official chain',
);
const vInformal = flow('LR', ['People work together', 'Friendships and shared interests', 'Groups with their own norms', 'News spreads through the grapevine'], 'Flow showing how informal organisation arises: people work together, form friendships and shared interests, develop groups with their own norms, and pass news through the grapevine', 'How informal organisation grows');
const vFormalPros = table(
  ['Merits of formal organisation', 'Limitations'],
  [
    ['Responsibility is easy to fix', 'Decisions can be slow (official chain)'],
    ['No overlap of work', 'Rigid; little room for initiative'],
    ['Stability and predictability', 'Ignores social needs of workers'],
  ],
  'Table of merits of formal organisation, such as easy fixing of responsibility, no overlap and stability, against its limitations, such as slow decisions, rigidity and neglect of social needs',
);
const vInformalPros = table(
  ['Merits of informal organisation', 'Limitations'],
  [
    ['Fast communication', 'Rumours spread quickly'],
    ['Meets social needs; sense of belonging', 'Groups may resist change'],
    ['Fills gaps in formal communication', 'Group norms may clash with company goals'],
  ],
  'Table of merits of informal organisation, such as fast communication, meeting social needs and filling gaps, against limitations, such as rumours, resistance to change and clashing group norms',
);
const vCompare2 = table(
  ['Basis', 'Formal', 'Informal'],
  [
    ['Origin', 'Created by management', 'Arises from interaction'],
    ['Authority', 'From position', 'From personal qualities'],
    ['Communication', 'Scalar chain', 'Any direction'],
    ['Nature', 'Rigid', 'Flexible'],
    ['Purpose', 'Organisational goals', 'Social needs of members'],
  ],
  'Comparison table of formal and informal organisation on origin, authority, communication, nature and purpose',
);
const vSpot = table(
  ['Line from an imagined call centre in Gurugram', 'Shows'],
  [
    ['"Agents report to team leaders as per the chart."', 'Formal organisation'],
    ['"The night-shift agents share tiffin and swap tips on difficult callers."', 'Informal organisation'],
    ['"Leave is approved only through the HR portal."', 'Formal organisation'],
    ['"News of the new bonus reached every floor before the email."', 'Informal organisation (grapevine)'],
  ],
  'Worked example table classifying four lines from an imagined call centre: reporting as per the chart and leave through the HR portal show formal organisation; sharing tiffin and fast spread of bonus news show informal organisation',
  'Worked example: spotting formal and informal organisation.',
);
const vDelegFlow = flow('TB', ['Manager has more work than one person can do', 'Assigns a task to a subordinate', 'Grants matching authority', 'Subordinate performs and reports back'], 'Flow of delegation: the manager has too much work, assigns a task to a subordinate, grants matching authority, and the subordinate performs and reports back', 'Delegation in four moves');
const vDelegImp = table(
  ['Importance of delegation', 'How'],
  [
    ['Effective management', 'Managers are freed for important work'],
    ['Employee development', 'Subordinates learn and grow'],
    ['Motivation', 'Trust raises confidence'],
    ['Growth', 'Trained people can run new units'],
    ['Basis of hierarchy', 'Authority relationships form the levels of management'],
    ['Better coordination', 'Clear authority, responsibility and accountability'],
  ],
  'Table of the importance of delegation: effective management, employee development, motivation, growth, basis of the management hierarchy, and better coordination',
);
const vInstr = table(
  ['Words in the instruction (imagined dairy, Anand)', 'Element'],
  [
    ['"You can sign purchase orders for fodder up to the set limit."', 'Authority'],
    ['"Your job is to keep fodder stocks for 30 days."', 'Responsibility'],
    ['"Explain any shortfall to me at the monthly review."', 'Accountability'],
  ],
  'Worked example table identifying the elements of delegation in an imagined dairy manager\'s instructions: signing purchase orders is authority, keeping stocks is responsibility, and explaining shortfalls is accountability',
  'Worked example: authority, responsibility, accountability.',
);
const vDecentImp = table(
  ['Importance of decentralisation', 'How'],
  [
    ['Develops initiative', 'Lower managers learn to decide on their own'],
    ['Develops managerial talent', 'Prepares people for higher posts'],
    ['Quick decision-making', 'Decisions are taken close to the action'],
    ['Relief to top management', 'Time for strategy and growth'],
    ['Facilitates growth', 'Units work with autonomy and can be added'],
    ['Better control', 'Each unit\'s results can be judged'],
  ],
  'Table of the importance of decentralisation: develops initiative and managerial talent, quick decisions, relief to top management, facilitates growth and better control',
);
const vCompare3 = table(
  ['Basis', 'Delegation', 'Decentralisation'],
  [
    ['Nature', 'Compulsory act', 'Optional policy'],
    ['Freedom of action', 'Superior keeps more control', 'More freedom at lower levels'],
    ['Status', 'A process', 'Result of a policy'],
    ['Scope', 'Narrow: one superior and subordinate', 'Wide: all levels'],
    ['Purpose', 'Reduce the manager\'s burden', 'Increase autonomy of lower levels'],
  ],
  'Comparison table of delegation and decentralisation on nature, freedom of action, status, scope and purpose',
);
const vSummary2 = table(
  ['Idea', 'Remember'],
  [
    ['Formal vs informal', 'Designed by management vs grows from social contact'],
    ['Delegation', 'Authority passes down; accountability stays'],
    ['Decentralisation', 'Delegation spread to all levels as a policy'],
    ['Balance', 'Neither complete centralisation nor complete decentralisation'],
  ],
  'Summary table of Part 2: formal and informal organisation, delegation, decentralisation, and the need for balance',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Organising — Part 1: Process, Importance and Structures',
  goals: [
    'Explain the meaning of organising and its four steps',
    'Explain the importance of organising for a business',
    'Describe functional and divisional structures with their merits and limits',
    'Choose a suitable structure for a given business situation',
  ],
  slides: [
    sl('title', 'Organising', {
      b: 'Part 1 — what organising is, its **steps**, its **importance**, and the **functional** and **divisional** structures.',
      v: vRoute1,
      n: 'Namaste! A plan on paper does nothing by itself. Someone must decide who will do which job, with what resources, and who will report to whom. That arranging is organising, the second function of management. In this part we learn its four steps, why it matters, and the two common ways in which businesses group their work: by function and by product.',
    }),
    sl('concept', 'What is organising?', {
      b: '**Organising** is identifying and grouping the work, assigning it to people, and fixing **authority and reporting relationships**, so that people can work together towards the plan.',
      v: vPlace,
      n: 'Planning decides what is to be done. Organising decides how the work will be shared out: which activities are needed, how they are grouped, who does each one, and who has the authority to give instructions. Only after this can staffing, directing and controlling follow. So organising is the bridge between a plan and the work that carries it out.',
    }),
    sl('diagram', 'The four steps of organising', {
      v: vSteps,
      n: 'Organising follows four steps in order. First, identify all the work and divide it into manageable jobs. Second, group related jobs into departments; this is departmentalisation. Third, assign each job to a person whose skills suit it. Fourth, establish reporting relationships, so that everyone knows from whom to take orders and to whom to report. Keep this order in mind; examiners often ask you to spot a step in a case.',
    }),
    sl('example', 'Worked example 1: organising an events company', {
      b: 'An imagined events firm in Guwahati applies the four steps.',
      bl: [
        'Step 1 — List every activity and split it into jobs.',
        'Step 2 — Group related jobs into units.',
        'Step 3 — Match each job to a person with the right skills.',
        'Step 4 — Fix who reports to whom.',
      ],
      v: vEventCo,
      n: 'Let us watch an imagined events firm in Guwahati organise itself. It lists jobs such as venue booking, decoration, catering, sound and billing. It groups them into three units. It gives the food unit to a trained chef and client services to an experienced coordinator. Finally, unit staff report to unit heads, and unit heads report to the owner. In a case question, quote the line and name the step it shows.',
    }),
    sl('check', 'Quick check: put the steps in order', {
      b: 'Arrange the bakery manager\'s actions in the correct order.',
      chk: 'ord_steps',
      n: 'Think about what must come before what. You cannot group jobs until you know what the jobs are, and you cannot fix reporting lines until people have been given their jobs.',
    }),
    sl('diagram', 'Why organising matters', {
      v: vImportance,
      n: 'Why do managers spend time on organising? Because it brings the benefits of specialisation, makes working relationships clear, and uses resources without waste. A good structure can also be adjusted when conditions change. Clear jobs make administration effective, delegated work helps people grow, and a sound framework lets the business expand by adding products, branches or units in an orderly way.',
    }),
    sl('concept', 'Importance in a real-looking setting', {
      b: 'In an imagined hotel in Shimla, two clerks both recorded check-ins while nobody tracked laundry.',
      bl: [
        'After organising, each task had exactly **one owner**.',
        'No duplication and no neglected task: **optimum utilisation of resources**.',
        'Everyone knew whom to report to: **clarity in working relationships**.',
      ],
      n: 'Here is how the importance of organising shows up in practice. In an imagined hotel, two clerks were doing the same job while an important task had no owner at all. Once the work was organised, every task had one person responsible. That removed waste and confusion. In exams, link each point of importance to a line in the case rather than writing a general list.',
    }),
    sl('check', 'Quick check: which importance?', {
      b: 'A bookshop chain moves staff to a new e-commerce team as online orders grow.',
      chk: 'm_imp_adapt',
      n: 'Ask what changed outside the firm and how the structure responded. That points to the right importance of organising.',
    }),
    sl('diagram', 'Organisation structure', {
      v: vStructure,
      n: 'The result of organising is an organisation structure: the framework of jobs, departments and authority relationships within which work is done. It is usually shown in an organisation chart. The number of subordinates one manager can handle well, called the span of management, decides how many levels the structure needs. The two common forms you must know are the functional and the divisional structure.',
    }),
    sl('diagram', 'Functional structure', {
      v: vFunctional,
      n: 'In a functional structure, jobs are grouped by the main functions of the business: production, marketing, finance and human resources. Each department does its function for the whole firm, and each head reports to the managing director. This form suits a large business with a single product line or closely related products, where specialised knowledge in each function matters a great deal.',
    }),
    sl('two-column', 'Functional structure: merits and limits', {
      cols: ['**Merits**\n\n- Specialisation\n- Little duplication\n- Easy training\n- Close control within a department', '**Limits**\n\n- Departmental goals over firm goals\n- Hard coordination\n- Conflicts between departments\n- Narrow outlook'],
      v: vFuncPros,
      n: 'The functional structure brings specialisation, avoids repeating the same work in many places, and makes training and control easier. But each head sees the business through one function. Departments may chase their own goals, coordinating them becomes difficult, conflicts arise, and managers do not get all-round experience. Remember both sides; questions often ask for one merit and one limitation.',
    }),
    sl('check', 'Quick check: spot the structure', {
      b: 'A production head and a marketing head of a garment exporter clash over batch sizes.',
      chk: 'm_func_conflict',
      n: 'Which structure makes heads think mainly about their own function? That is where such clashes are common.',
    }),
    sl('diagram', 'Divisional structure', {
      v: vDivisional,
      n: 'In a divisional structure, the business is split by product. Each division, such as kitchen appliances, paints or packaged foods in this imagined group, has its own production, marketing and finance, and its head reports to the chief executive. This form suits a firm with several distinct product lines, each needing different resources, technology and markets.',
    }),
    sl('two-column', 'Divisional structure: merits and limits', {
      cols: ['**Merits**\n\n- Product specialisation; varied skills for heads\n- Head accountable for profit\n- Quick decisions\n- Easy to add a division', '**Limits**\n\n- Conflicts among divisions\n- Duplication raises cost\n- Divisional self-interest\n- Needs many able managers'],
      v: vDivPros,
      n: 'Because each division is like a small business, its head handles every function of one product and gains wide experience. Its profit can be measured, so the head can be held accountable. Decisions are faster, and a new product can be added as a new division. The costs are duplication of functions, competition among divisions for resources, and heads who may put their division before the firm.',
    }),
    sl('example', 'Worked example 2: choosing a structure', {
      b: 'Decide the structure for two imagined firms and give the reason.',
      bl: [
        'Step 1 — Count the product lines and check whether they need different inputs and buyers.',
        'Step 2 — One product needing specialists: **functional**.',
        'Step 3 — Several distinct products: **divisional**.',
        'Step 4 — Quote the case line that justifies your choice.',
      ],
      v: vChoose,
      n: 'Here is a quick method. First, count the product lines. Sutlej Tubes makes only steel tubes in large volume and needs specialists, so a functional structure fits. Malabar Group sells spices, coir mats and boat tours, which need different raw materials, skills and customers, so a divisional structure fits. Always support your answer with a line from the case.',
    }),
    sl('diagram', 'Functional vs divisional', {
      v: vCompare1,
      n: 'Here are five bases on which the two structures differ. Functional groups by function and gives functional specialisation; divisional groups by product and gives product specialisation. In a divisional firm, each head answers for the profit of a division; in a functional firm, overall responsibility is harder to fix. Functional is economical, divisional is costly, but divisional makes growth easier.',
    }),
    sl('check', 'Quick check: true or false?', {
      b: 'In a divisional structure, each division\'s performance can be judged.',
      chk: 'tf_div_profit',
      n: 'Think about whether a division keeps its own revenues and costs.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSummary1,
      n: 'To sum up: organising arranges work, people, resources and authority so that plans can be carried out. Its four steps are dividing the work, departmentalising, assigning duties and fixing reporting lines. It matters for specialisation, clarity, efficient use of resources, change, administration, people and growth. A functional structure suits a large single-product firm; a divisional structure suits a firm with many distinct products.',
    }),
    sl('exam-tips', 'Exam tips', {
      b: '**Common mistakes**\n- Mixing the order of the steps, or calling "assigning duties" departmentalisation.\n- Choosing divisional just because a firm is large: the test is **many distinct products**.\n- Writing merits of one structure as merits of the other.\n\n**How marks are awarded**\n- Case parts: quote the line **and** name the concept.\n- Differences: state **both sides** on each basis.\n- 5 marks: five clear points of about 20 words each.',
      v: table(['Question type', 'What earns marks'], [['Identify the step', 'Line quoted + step named'], ['Suggest a structure', 'Structure named + reason from the case'], ['Distinguish', 'One basis per point, both sides']], 'Table of exam tips: for identifying a step, quote the line and name the step; for suggesting a structure, name it and give a reason from the case; for distinguishing, give one basis per point with both sides'),
      n: 'A few tips before you practise. Do not confuse the steps of organising; each has a clear meaning. The choice between structures depends on the number of distinct products, not on size alone. In case questions, quote the exact line and name the concept for full marks. In difference questions, write one basis per point and state both sides.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Organising — Part 2: Formal and Informal Organisation, Delegation and Decentralisation',
  goals: [
    'Compare formal and informal organisation with their merits and limits',
    'Explain delegation and its elements: authority, responsibility and accountability',
    'Explain decentralisation and its importance',
    'Distinguish between delegation and decentralisation',
  ],
  slides: [
    sl('title', 'Organising: people and authority', {
      b: 'Part 2 — **formal and informal** organisation, **delegation** and **decentralisation**.',
      v: vRoute2,
      n: 'Welcome back. Every business has two organisations living side by side: the official one that management designs, and the unofficial one that grows among people who work together. In this part we compare them. Then we see how managers share authority through delegation, and how a firm can spread decision-making to every level through decentralisation.',
    }),
    sl('diagram', 'Formal organisation', {
      v: vFormal,
      n: 'Formal organisation is the official structure designed by top management. It has written rules, procedures and job descriptions. Authority comes from the position a person holds, and communication travels through the official chain of command, also called the scalar chain. Its purpose is to get the organisation\'s work done in an orderly, predictable way.',
    }),
    sl('diagram', 'Informal organisation', {
      v: vInformal,
      n: 'Informal organisation grows by itself. When people work together they make friends, share interests such as sport or music, and form groups with their own unwritten norms. News passes between them quickly and in any direction, through what is called the grapevine. No manager designs it, and it exists in every organisation.',
    }),
    sl('two-column', 'Formal organisation: merits and limits', {
      cols: ['**Merits**\n\n- Responsibility easy to fix\n- No overlap of work\n- Stability', '**Limits**\n\n- Slow decisions\n- Rigid\n- Ignores social needs'],
      v: vFormalPros,
      n: 'Formal organisation makes it easy to know who is responsible for what, avoids two people doing the same job, and gives stability. But following the official chain can delay decisions, the rules can be rigid, and it overlooks the human and social side of work.',
    }),
    sl('two-column', 'Informal organisation: merits and limits', {
      cols: ['**Merits**\n\n- Fast communication\n- Social needs met\n- Supports formal organisation', '**Limits**\n\n- Rumours\n- Resistance to change\n- Group norms may clash with goals'],
      v: vInformalPros,
      n: 'Informal organisation spreads news quickly, gives people friendship and a sense of belonging, and helps managers learn what workers really feel. On the other hand, false rumours can travel just as fast, groups may resist change, and the norms of a group can work against company goals. Wise managers use it rather than fight it.',
    }),
    sl('check', 'Quick check: using informal channels', {
      b: 'A production manager learns workers\' views over lunch before announcing a new shift plan.',
      chk: 'm_informal_merit',
      n: 'Which advantage of informal organisation is the manager using here?',
    }),
    sl('diagram', 'Formal vs informal', {
      v: vCompare2,
      n: 'Compare them on five bases. Formal is created by management; informal arises from interaction. In formal, authority comes from position; in informal, from personal qualities. Formal communication follows the scalar chain; informal flows in any direction. Formal is rigid; informal is flexible. Formal serves organisational goals; informal meets the social needs of members.',
    }),
    sl('example', 'Worked example 1: spot formal and informal', {
      b: 'Classify each line from an imagined call centre.',
      bl: [
        'Step 1 — Is it laid down by management (chart, rules, portal)? **Formal**.',
        'Step 2 — Does it arise from friendship or shared interests? **Informal**.',
        'Step 3 — News moving faster than official channels is the **grapevine**.',
      ],
      v: vSpot,
      n: 'Practise with lines from an imagined call centre. Reporting to team leaders as per the chart, and leave approved only through the official portal, are formal. Agents sharing tiffin and tips at night, and news of a bonus reaching every floor before the official email, are informal. Ask one question: was this designed by management, or did it grow among people?',
    }),
    sl('diagram', 'Delegation', {
      b: '**Delegation** is the transfer of part of a superior\'s **authority** to a subordinate to get a task done.',
      v: vDelegFlow,
      n: 'No manager can do all the work alone. So the manager assigns a task to a subordinate and grants enough authority to do it. The subordinate performs the task and reports back. This is delegation. Note that the manager shares authority, but does not escape answerability for the result.',
    }),
    sl('diagram', 'Elements of delegation', {
      v: vElements,
      n: 'Delegation has three elements. Authority is the right to give orders and take decisions; it flows downward. Responsibility is the obligation to do the assigned task properly; it flows upward. Accountability is answerability for the final outcome; it also flows upward and cannot be delegated. The subordinate is accountable to the manager, and the manager stays accountable to his or her own superior.',
    }),
    sl('check', 'Quick check: what can be passed on?', {
      b: 'Does a manager transfer accountability along with the task?',
      chk: 'tf_accountability_delegate',
      n: 'Recall which element of delegation always stays with the person who delegates.',
    }),
    sl('diagram', 'Why delegation matters', {
      v: vDelegImp,
      n: 'Delegation makes management effective, because managers are freed for important work. It develops employees, who learn by doing, and motivates them through trust. It supports growth, because trained people can run new units. It is the basis of the management hierarchy, and with clear authority, responsibility and accountability it improves coordination.',
    }),
    sl('example', 'Worked example 2: name the element', {
      b: 'Identify the element of delegation in each instruction of an imagined dairy manager.',
      bl: [
        'Step 1 — A **right** to decide or act? Authority.',
        'Step 2 — A **duty** to perform? Responsibility.',
        'Step 3 — A duty to **report or explain** the result? Accountability.',
      ],
      v: vInstr,
      n: 'Here is a quick test for each instruction. If it gives a right to decide, such as signing purchase orders, it is authority. If it states a duty, such as keeping stock for a month, it is responsibility. If it asks the person to report or explain results, such as at a monthly review, it is accountability.',
    }),
    sl('check', 'Quick check: match the instructions', {
      b: 'Match lines from a hospital administrator\'s instructions to the element shown.',
      chk: 'mt_elements',
      n: 'Use the right, duty and report test from the worked example. The last line covers many units at once; think about what that means.',
    }),
    sl('diagram', 'Decentralisation', {
      b: '**Decentralisation**: decision-making authority is spread **systematically to all levels**, with only key decisions kept at the top. It is an **optional policy**.',
      v: vSpread,
      n: 'When delegation is extended across all levels of the firm as a deliberate policy, we call it decentralisation. Lower managers decide local matters, while top management keeps key decisions such as policy and new investment. Complete centralisation or complete decentralisation is neither possible nor desirable; firms choose a balance that suits them.',
    }),
    sl('diagram', 'Why decentralise?', {
      v: vDecentImp,
      n: 'Decentralisation develops initiative and confidence among lower managers, and prepares them for higher posts. Decisions are quicker because they are taken close to the action. Top managers get relief from routine and can focus on strategy. Units with autonomy make growth easier, and because each unit\'s results are visible, control can actually improve.',
    }),
    sl('diagram', 'Delegation vs decentralisation', {
      v: vCompare3,
      n: 'Learn these five differences. Delegation is compulsory, decentralisation optional. Under delegation the superior keeps more control; under decentralisation lower levels get more freedom. Delegation is a process; decentralisation is the result of a policy. Delegation is narrow in scope; decentralisation is wide. Delegation reduces a manager\'s burden; decentralisation increases the role of lower levels.',
    }),
    sl('check', 'Quick check: optional or compulsory?', {
      b: 'Why is decentralisation called an optional policy decision?',
      chk: 'm_decent_optional',
      n: 'Compare what a manager must do with what top management may choose to do.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSummary2,
      n: 'To sum up: formal organisation is designed by management, while informal organisation grows from social contact, and both affect how work gets done. In delegation, authority passes down, but accountability stays with the person who delegates. Decentralisation spreads delegation to all levels as a policy, and a sensible balance with centralisation is needed.',
    }),
    sl('exam-tips', 'Exam tips', {
      b: '**Common mistakes**\n- Saying accountability can be delegated: it **cannot**.\n- Writing that authority flows upward: it flows **down**; responsibility and accountability flow **up**.\n- Calling any delegation "decentralisation": decentralisation covers **all levels** as a **policy**.\n\n**How marks are awarded**\n- Case parts: quote the line and name the element or concept.\n- Differences: one basis per point, both sides.\n- 5 marks: five points; for "evaluate", give a judgement with reasons.',
      v: table(['Trap', 'Correct idea'], [['Accountability delegated', 'Never delegated'], ['Delegation is optional', 'Delegation is compulsory; decentralisation is optional'], ['Informal is always harmful', 'It has merits and limits; managers can use it']], 'Table of common traps: accountability is never delegated, delegation is compulsory while decentralisation is optional, and informal organisation has both merits and limits'),
      n: 'Watch out for the classic traps. Accountability is never delegated. Authority flows down; responsibility and accountability flow up. Decentralisation is a policy covering all levels, not a single act of delegation. In case questions, quote the line and name the concept; in evaluation questions, state your judgement clearly and support it with reasons from the case.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Organising — Notes',
  sections: [
    {
      h: '1. Meaning and process of organising',
      t: 1,
      b: '**Organising** arranges the work, people, resources and authority needed to carry out plans. It answers: what jobs are needed, how are they grouped, who does each, and who reports to whom.\n\n**Steps**\n1. **Identification and division of work** into manageable jobs.\n2. **Departmentalisation**: grouping related jobs into units (by function, product or region).\n3. **Assignment of duties** to people suited by skill and training.\n4. **Establishing reporting relationships**, so that authority and communication lines are clear.',
      terms: [
        ['Organising', 'The management function of grouping work, assigning it and fixing authority relationships to carry out plans.'],
        ['Departmentalisation', 'Grouping similar or related jobs into units such as departments or divisions.'],
      ],
      v: vSteps,
      vs: [vEventCo],
    },
    {
      h: '2. Importance of organising',
      t: 1,
      b: '- **Benefits of specialisation:** repetitive work on one job builds skill and speed.\n- **Clarity in working relationships:** who reports to whom is fixed.\n- **Optimum utilisation of resources:** no duplication, no idle resources.\n- **Adaptation to change:** the structure can be modified as conditions change.\n- **Effective administration:** clear jobs remove confusion.\n- **Development of personnel:** delegated work lets people grow; managers get time for innovation.\n- **Expansion and growth:** new products, branches or units can be added smoothly.',
      terms: [['Organisation structure', 'The framework of jobs, departments and authority relationships within which work is done, shown in an organisation chart.']],
      v: vImportance,
      vs: [vStructure],
    },
    {
      h: '3. Functional and divisional structures',
      t: 2,
      b: '**Functional structure:** jobs grouped by **function** (production, marketing, finance, HR). Suits a **large firm with one product line** or closely related products needing specialists. *Merits:* specialisation, little duplication, easy training, close control. *Limits:* departmental goals over firm goals, hard coordination, conflicts, narrow outlook.\n\n**Divisional structure:** jobs grouped by **product**; each division has its own functions. Suits a firm with **many distinct products**. *Merits:* varied skills for division heads, accountability for profit, quick decisions, easy expansion. *Limits:* conflicts over resources, duplication and high cost, divisional self-interest.',
      terms: [
        ['Functional structure', 'A structure in which jobs are grouped by the major functions of the business.'],
        ['Divisional structure', 'A structure in which the firm is split into product divisions, each with its own functions.'],
      ],
      v: vFunctional,
      vs: [vDivisional, vCompare1],
    },
    {
      h: '4. Formal and informal organisation',
      t: 3,
      b: '**Formal organisation** is designed by top management: written rules, defined positions, authority from position, communication through the scalar chain. *Merits:* easy to fix responsibility, no overlap, stability. *Limits:* slow decisions, rigidity, neglect of social needs.\n\n**Informal organisation** arises from social interaction: no written rules, authority from personal qualities, communication in any direction (grapevine). *Merits:* fast communication, social needs met, supports formal organisation. *Limits:* rumours, resistance to change, group norms that may clash with goals.\n\nBoth exist together; good managers use informal channels to support formal goals.',
      terms: [
        ['Formal organisation', 'The official structure of positions, rules and authority designed by management.'],
        ['Informal organisation', 'The network of personal and social relationships that develops among employees.'],
        ['Grapevine', 'The informal channel through which news spreads quickly in any direction.'],
      ],
      v: vCompare2,
      vs: [vInformal],
    },
    {
      h: '5. Delegation',
      t: 4,
      b: '**Delegation** is the downward transfer of part of a superior\'s authority to a subordinate to perform a task. It is **compulsory** in any organisation, because no manager can do everything alone.\n\n**Elements**\n- **Authority:** right to command and decide; flows **downward**; limited by rules and laws.\n- **Responsibility:** obligation to perform the task; flows **upward**.\n- **Accountability:** answerability for the outcome; flows **upward**; **cannot be delegated**.\n\nAuthority should match responsibility. *Importance:* effective management, employee development, motivation, growth, basis of the hierarchy, better coordination.',
      terms: [
        ['Authority', 'The right of a person in a position to give orders and take decisions.'],
        ['Responsibility', 'The obligation of a subordinate to perform the assigned duty.'],
        ['Accountability', 'Answerability for the final outcome; it cannot be delegated.'],
      ],
      v: vElements,
      vs: [vDelegImp],
    },
    {
      h: '6. Decentralisation',
      t: 4,
      b: '**Decentralisation** is the systematic spreading of decision-making authority to **all levels** of management, with only key decisions kept at the top. It is an **optional policy** decision; a **balance** with centralisation is always needed.\n\n*Importance:* develops initiative, develops managerial talent, quick decision-making, relief to top management, facilitates growth, better control.\n\n**Delegation vs decentralisation:** compulsory vs optional; more control vs more freedom; a process vs the result of a policy; narrow vs wide scope; reduces burden vs increases autonomy of lower levels.',
      terms: [
        ['Decentralisation', 'Delegation of authority extended systematically to all levels as a matter of policy.'],
        ['Centralisation', 'Keeping decision-making authority mainly with top management.'],
      ],
      v: vSpread,
      vs: [vCompare3, vDecentImp],
    },
  ],
  tips: '**Common mistakes**\n- Mixing up the steps of organising, or treating assignment of duties as departmentalisation.\n- Choosing a divisional structure only because the firm is big: look for **several distinct products**.\n- Saying accountability can be delegated (it cannot), or that authority flows upward (it flows down).\n- Treating decentralisation as a single act: it is a **policy** covering all levels.\n\n**How marks are usually awarded**\n- 1 mark: one correct option, or a concept named.\n- Case parts: quote the line **and** name the concept.\n- 3 marks: three points with brief explanation (about 50–80 words).\n- 5 marks: five clear points or bases (about 80–120 words); differences state both sides on each basis.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['**Organising**', 'Arranging work, people, resources and authority relationships to carry out plans.', 'definition', 1],
  ['Four steps of organising', 'Identify and divide work → departmentalise → assign duties → establish reporting relationships.', 'concept', 1],
  ['**Departmentalisation**', 'Grouping similar or related jobs into units.', 'definition', 1],
  ['Assignment of duties', 'Giving each job to a person suited by skill and training.', 'definition', 1],
  ['Benefit of specialisation', 'Repeating one job builds skill and speed.', 'concept', 1],
  ['Optimum utilisation of resources', 'No duplication of jobs and no idle resources.', 'concept', 1],
  ['Adaptation to change', 'A sound structure can be modified when conditions change.', 'concept', 1],
  ['Seven points of importance of organising', 'Specialisation, clarity, resources, change, administration, personnel, growth.', 'exam-tip', 1],
  ['**Organisation structure**', 'Framework of jobs, departments and authority relationships; shown in an organisation chart.', 'definition', 2],
  ['**Functional structure**', 'Jobs grouped by function: production, marketing, finance, HR.', 'definition', 2],
  ['When to use a functional structure', 'Large firm with a single product line needing specialists.', 'concept', 2],
  ['**Divisional structure**', 'Firm split into product divisions, each with its own functions.', 'definition', 2],
  ['When to use a divisional structure', 'Several distinct products needing different resources and markets.', 'concept', 2],
  ['Main limitation of functional structure', 'Departments may chase their own goals; coordination is hard.', 'concept', 2],
  ['Main limitation of divisional structure', 'Duplication of functions makes it costly; divisions may conflict.', 'concept', 2],
  ['Why divisional heads make good top managers', 'They handle all functions of one product, so they gain varied skills.', 'concept', 2],
  ['**Formal organisation**', 'Official structure designed by management, with rules and positions.', 'definition', 3],
  ['**Informal organisation**', 'Network of social relationships among employees.', 'definition', 3],
  ['**Grapevine**', 'Informal channel; news spreads fast in any direction.', 'definition', 3],
  ['One merit and one limit of formal organisation', 'Responsibility easy to fix; decisions can be slow.', 'concept', 3],
  ['One merit and one limit of informal organisation', 'Fast communication; rumours.', 'concept', 3],
  ['**Delegation**', 'Transfer of part of a superior\'s authority to a subordinate for a task.', 'definition', 4],
  ['**Authority**', 'Right to command and decide; flows downward.', 'definition', 4],
  ['**Responsibility**', 'Obligation to perform the assigned task; flows upward.', 'definition', 4],
  ['**Accountability**', 'Answerability for the outcome; flows upward; **cannot be delegated**.', 'definition', 4],
  ['Should authority match responsibility?', 'Yes: too little and the task cannot be done; too much invites misuse.', 'concept', 4],
  ['**Decentralisation**', 'Systematic spread of decision-making authority to all levels as a policy.', 'definition', 4],
  ['Is decentralisation compulsory?', 'No, it is an **optional policy**; delegation is compulsory.', 'exam-tip', 4],
  ['Three benefits of decentralisation', 'Quick decisions; develops managerial talent; relief to top management.', 'concept', 4],
  ['Delegation vs decentralisation: scope', 'Delegation is narrow (one superior and subordinate); decentralisation is wide (all levels).', 'exam-tip', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-12-default-chapter-test-short',
  title: 'Chapter test (short) — Organising',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_step_first', 'm_func_suits', 'm_informal_case', 'ar_accountability'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and the 3-mark question in about 50–80 words.', items: ['s_func_meaning', 's_deleg_meaning', 's3_informal_merits'] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80–120 words.', items: [{ attempt: 1, keys: ['l_func_vs_div', 'l_deleg_vs_decent'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks)', instr: 'Read the passage and answer all parts. Part (c) has an internal choice.', items: ['cb_hospital'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-12-default-chapter-test-long',
  title: 'Chapter test (long) — Organising',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A — Objective (1 mark each)', instr: 'Questions 1–10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_step_dept', 'm_imp_spec', 'm_div_disadv', 'm_div_profit', 'm_formal_feature', 'm_grapevine', 'm_accountability', 'm_decent_case', 'ar_func_coord', 'ar_informal_rumour'] },
    { id: 'B', title: 'Section B — Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30–50 words and 3-mark questions in about 50–80 words. Questions 13 and 15 have an internal choice.', items: ['s_meaning', 's_decent_meaning', { attempt: 1, keys: ['s_auth_resp', 's_formal_merits'] }, 's3_steps', { attempt: 1, keys: ['s3_div_limits', 's3_decent_importance'] }] },
    { id: 'C', title: 'Section C — Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80–120 words each.', items: ['l_steps_importance', { attempt: 1, keys: ['l_formal_vs_informal', 'l_decent_importance'] }] },
    { id: 'D', title: 'Section D — Case-based (4 marks each)', instr: 'Read each passage and answer all parts. Part (c) of each has an internal choice.', items: ['cb_structure', 'cb_retail'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 of cbse-12-business-studies-ch05 only (concept, steps and importance; functional and divisional structures; formal and informal organisation; delegation and decentralisation)',
    originality: 'every firm, person, case and line written for this chapter (imagined Indian businesses, labelled); no NCERT text, case or exercise and no board/sample-paper item reused',
    facts: 'standard concepts only; no statistics or real company cases',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
