// Build CBSE 11 Political Science ch06 Judiciary. Run from platform/:
//   npx tsx content/authored/social-science/cbse-11-political-science-ch06/src/build.mjs
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../cbse-11-political-science-ch01/src/lib.mjs';

setUnit('cbse-11-political-science-ch06', 'social-science');
await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- SVG figures (no maps)
const vPyramid = (() => {
  const s = new Svg(760, 370);
  s.polygon([[380, 15], [485, 120], [275, 120]], { color: 'brown', sw: 2.5 });
  s.polygon([[275, 120], [485, 120], [595, 230], [165, 230]], { color: 'green', sw: 2.5 });
  s.polygon([[165, 230], [595, 230], [710, 345], [50, 345]], { color: 'blue', sw: 2.5 });
  s.text(380, 85, 'Supreme Court', { bold: true, size: 15, color: 'brown' });
  s.text(380, 168, 'High Courts', { bold: true, size: 15, color: 'green' });
  s.text(380, 190, 'one or more in the states', { size: 13 });
  s.text(380, 276, 'District courts', { bold: true, size: 15, color: 'blue' });
  s.text(380, 298, 'and subordinate courts', { bold: true, size: 15, color: 'blue' });
  s.text(380, 322, 'trial courts for civil and criminal cases', { size: 13 });
  s.text(480, 50, '34 judges in all, as of 2024', { anchor: 'start', size: 13 });
  s.text(480, 72, 'Binding on all courts (Article 141)', { anchor: 'start', size: 13 });
  s.text(560, 160, 'Writ power: Article 226', { anchor: 'start', size: 13 });
  s.text(380, 360, 'An integrated judiciary: one hierarchy, appeals go upward', { size: 13, muted: true });
  return s.visual('Pyramid chart of the Indian judiciary, an integrated hierarchy. At the top is the Supreme Court, with 34 judges in all as of 2024, whose decisions bind all courts under Article 141. Below it are the High Courts in the states, which have a writ power under Article 226. At the base are the district courts and subordinate courts, which are trial courts for civil and criminal cases. Appeals go upward', 'The court hierarchy of India.');
})();

const vWeb = (() => {
  const s = new Svg(760, 380);
  const box = (x, y, w, h, title, lines, col) => {
    s.rect(x, y, w, h, { color: col, sw: 2 });
    s.text(x + w / 2, y + 22, title, { bold: true, size: 14, color: col });
    lines.forEach((ln, j) => s.text(x + w / 2, y + 44 + j * 18, ln, { size: 12 }));
  };
  s.line(380, 100, 380, 150, { sw: 1.6, color: 'muted' });
  s.line(220, 205, 270, 205, { sw: 1.6, color: 'muted' });
  s.line(490, 205, 540, 205, { sw: 1.6, color: 'muted' });
  s.line(310, 260, 240, 290, { sw: 1.6, color: 'muted' });
  s.line(450, 260, 520, 290, { sw: 1.6, color: 'muted' });
  s.rect(270, 150, 220, 110, { color: 'accent', sw: 3 });
  s.text(380, 195, 'Independent', { bold: true, size: 17, color: 'accent' });
  s.text(380, 220, 'judiciary', { bold: true, size: 17, color: 'accent' });
  box(260, 12, 240, 88, 'Appointment', ['By the President; the Chief', 'Justice and a collegium', 'play the decisive role'], 'blue');
  box(10, 160, 210, 90, 'Security of tenure', ['Retire at 65 and 62;', 'removal only by Parliament,', 'by special majority'], 'green');
  box(540, 160, 210, 90, 'Financial independence', ['Salaries and allowances', 'charged on the', 'Consolidated Fund'], 'brown');
  box(60, 290, 240, 80, 'Protection from debate', ['Conduct of judges not', 'discussed in the legislature'], 'red');
  box(460, 290, 240, 80, 'Authority of the courts', ['Power to punish', 'for contempt'], 'blue');
  return s.visual('Web diagram of the safeguards of judicial independence around the independent judiciary: appointment, by the President with the Chief Justice and a collegium playing the decisive role; security of tenure, with retirement at 65 and 62 and removal only by Parliament by a special majority; financial independence, with salaries and allowances charged on the Consolidated Fund; protection from debate, as the conduct of judges is not discussed in the legislature; and the authority of the courts, with the power to punish for contempt', 'How independence of the judiciary is secured.');
})();

const vJur = (() => {
  const s = new Svg(760, 330);
  s.rect(230, 10, 300, 40, { color: 'accent', sw: 2.5 });
  s.text(380, 30, 'Supreme Court: four jurisdictions', { bold: true, size: 15, color: 'accent' });
  const cols = [
    [10, 'Original', 'Article 131', 'blue', ['Disputes between', 'the Union and states,', 'or between states']],
    [200, 'Writ', 'Article 32', 'green', ['Enforcement of', 'Fundamental Rights;', 'High Courts: Art. 226']],
    [390, 'Appellate', 'Articles 132 to 136', 'brown', ['Civil, criminal and', 'constitutional appeals;', 'special leave: Art. 136']],
    [580, 'Advisory', 'Article 143', 'red', ['President seeks', 'the opinion of the', 'Court; not binding']],
  ];
  cols.forEach(([x, name, art, col, lines]) => {
    s.line(380, 50, x + 85, 90, { sw: 1.5, color: 'muted' });
    s.rect(x, 90, 170, 56, { color: col, sw: 2 });
    s.text(x + 85, 109, name, { bold: true, size: 15, color: col });
    s.text(x + 85, 131, art, { size: 12 });
    s.rect(x, 146, 170, 110, { color: col, sw: 1.5, rx: 6 });
    lines.forEach((ln, j) => s.text(x + 85, 176 + j * 24, ln, { size: 12 }));
  });
  s.text(380, 290, 'Original and writ cases start in the Supreme Court; appeals come from lower courts', { size: 13, muted: true });
  s.text(380, 312, 'Art. stands for Article', { size: 11, muted: true });
  return s.visual('Jurisdiction chart of the Supreme Court with four branches. Original jurisdiction, Article 131: disputes between the Union and states, or between states. Writ jurisdiction, Article 32: enforcement of Fundamental Rights, with High Courts having a wider power under Article 226. Appellate jurisdiction: civil, criminal and constitutional appeals, with special leave under Article 136. Advisory jurisdiction, Article 143: the President seeks the opinion of the Court, which is not binding', 'Jurisdiction of the Supreme Court.');
})();

const vPil = (() => {
  const s = new Svg(760, 340);
  const steps = [
    ['A group is harmed by a problem', 'and cannot reach the court', 'blue'],
    ['A concerned person writes a letter', 'or files a petition for them', 'green'],
    ['The court relaxes locus standi and', 'treats the letter as a petition', 'accent'],
    ['Notice to the government; hearing;', 'facts are gathered', 'brown'],
    ['The court gives directions to', 'protect the rights involved', 'red'],
  ];
  steps.forEach(([l1, l2, col], i) => {
    const y = 10 + i * 66;
    s.rect(130, y, 500, 48, { color: col, sw: 2 });
    s.text(380, y + 17, l1, { size: 14 });
    s.text(380, y + 36, l2, { size: 14 });
    s.text(90, y + 24, String(i + 1), { bold: true, size: 18, color: col });
    if (i < steps.length - 1) s.arrow(380, y + 48, 380, y + 66, { sw: 1.8 });
  });
  return s.visual('Flow of public interest litigation in five steps: a group is harmed by a problem and cannot reach the court; a concerned person writes a letter or files a petition for them; the court relaxes locus standi and treats the letter as a petition; notice goes to the government, there is a hearing and facts are gathered; the court gives directions to protect the rights involved', 'How a public interest litigation case moves.');
})();

// ---------------------------------------------------------------- tables and flows: Part 1
const vRoles = table(
  ['Role', 'What the judiciary does'],
  [
    ['Rule of law', 'Applies the same law to everyone, including the government'],
    ['Settling disputes', 'Decides disputes between citizens, between citizens and the government, and between governments'],
    ['Protecting rights', 'Enforces Fundamental Rights and other rights against wrongful acts'],
    ['Guarding the Constitution', 'Examines laws and actions against the Constitution'],
  ],
  'Table of four roles of the judiciary: upholding the rule of law, settling disputes, protecting rights and guarding the Constitution',
);
const vMeaning = table(
  ['Independence means', 'It does not mean'],
  [
    ['Freedom from interference by the legislature and the executive', 'That judges answer to no one'],
    ['Deciding cases on law and evidence', 'That judges may ignore the Constitution'],
    ['Protection of judges from pressure', 'That the judiciary runs the country'],
  ],
  'Table contrasting what independence of the judiciary means with what it does not mean',
  'Accountability remains: reasoned judgments in open court, the Constitution, and removal for proved misbehaviour.',
);
const vAppt = table(
  ['Point', 'Position'],
  [
    ['Formal appointment', 'By the President'],
    ['Since 1993 (Second Judges case)', 'The Supreme Court\'s view: the Chief Justice of India and a collegium of senior judges play the decisive role in recommending names'],
    ['2014', 'The National Judicial Appointments Commission Act passed'],
    ['2015', 'The Act was struck down by the Supreme Court'],
  ],
  'Table on appointment of judges: the President appoints; since the Second Judges case of 1993 the Chief Justice of India and a collegium play the decisive role in recommending names; the National Judicial Appointments Commission Act was passed in 2014 and struck down by the Supreme Court in 2015',
  'Position as of 2024.',
);
const vApptFlow = flow('LR', ['The Chief Justice of India and a collegium of senior judges recommend names', 'The names go to the government', 'The President appoints the judges'], 'Flow of appointment to the Supreme Court: the Chief Justice of India and a collegium recommend names, the names go to the government, and the President appoints the judges', 'Appointment to the Supreme Court');
const vDebate = table(
  ['Some argue', 'Others argue'],
  [
    ['The collegium keeps appointments free from pressure by the executive', 'A wider body that is accountable to the public should also take part'],
    ['Senior judges are best placed to judge who is fit to serve', 'The process should be more open and transparent'],
    ['A commission with outside members could weaken independence', 'A commission could share the responsibility among the organs'],
  ],
  'Table of the debate on the appointment of judges: some argue the collegium protects independence, that senior judges know best, and that a commission could weaken independence; others argue for a wider accountable body, for more openness, and that a commission could share responsibility',
);
const vTenure = table(
  ['Point', 'Provision'],
  [
    ['Retirement', 'Supreme Court judges at 65; High Court judges at 62'],
    ['Who can remove', 'Parliament only'],
    ['Grounds', 'Proved misbehaviour or incapacity'],
    ['Majority', 'A special majority in both Houses'],
    ['Effect', 'Removal is very difficult, so judges are free from pressure'],
  ],
  'Table on security of tenure: Supreme Court judges retire at 65 and High Court judges at 62; only Parliament can remove a judge, on proved misbehaviour or incapacity, by a special majority in both Houses; this makes removal very difficult and protects judges from pressure',
  'Special majority: a majority of the total membership of each House and at least two thirds of the members present and voting.',
);
const vRemFlow = flow('LR', ['A motion to remove is moved in a House of Parliament', 'A committee inquires into the charge', 'Each House passes it by a special majority', 'The President orders the removal'], 'Flow of removal of a judge: a motion is moved in a House of Parliament, a committee inquires into the charge, each House passes it by a special majority, and the President orders the removal', 'Removal of a judge');
const vRemEx = table(
  ['Question', 'Applying the safeguards to imagined Varunadesh'],
  [
    ['Who can remove a High Court judge?', 'Parliament only, not a Chief Minister'],
    ['On what ground?', 'Proved misbehaviour or incapacity, not unwelcome rulings'],
    ['By what majority?', 'A special majority in both Houses'],
    ['Result of the Chief Minister\'s announcement', 'It has no legal effect'],
  ],
  'Worked example table: the Chief Minister of imagined Varunadesh announces the dismissal of a High Court judge; only Parliament can remove a judge, on proved misbehaviour or incapacity, by a special majority in both Houses, so the announcement has no legal effect',
  'Judges are safe from pressure over their rulings.',
);
const vFinance = table(
  ['Safeguard', 'What it does'],
  [
    ['Financial independence', 'Salaries and allowances are charged on the Consolidated Fund of India and are not voted on'],
    ['Protection from debate', 'The conduct of judges cannot be discussed in the legislature, except during removal proceedings'],
    ['Authority of the courts', 'Courts can punish for contempt'],
  ],
  'Table of the other safeguards: salaries and allowances are charged on the Consolidated Fund and are not voted on; the conduct of judges is not discussed in the legislature except during removal; courts can punish for contempt',
);
const vInt = table(
  ['Feature', 'Meaning'],
  [
    ['Integrated judiciary', 'One hierarchy of courts, not separate Union and state systems'],
    ['Article 141', 'The law declared by the Supreme Court is binding on all courts'],
    ['Article 129', 'The Supreme Court is a court of record: its decisions are preserved as records, and it can punish for its own contempt'],
    ['Strength', 'The Chief Justice of India and 33 other judges, 34 in all, as of 2024; Parliament can change the number by law'],
  ],
  'Table of features of the integrated judiciary: one hierarchy; Article 141, Supreme Court law binds all courts; Article 129, court of record; strength of 34 judges in all as of 2024',
);
const vBound = table(
  ['Step', 'Who must follow'],
  [
    ['1. The Supreme Court decides a point of law', 'Its decision declares the law for all courts'],
    ['2. A district court in imagined Varunadesh meets the same point', 'It must follow the Supreme Court'],
    ['3. A High Court meets the same point', 'It must follow the Supreme Court too'],
    ['4. Parliament changes the law', 'Courts then apply the changed law'],
  ],
  'Worked example table of binding decisions: the Supreme Court decides a point of law; a district court and a High Court meeting the same point must follow it; if Parliament changes the law, courts apply the changed law',
  'Article 141: binding on all courts.',
);
const vSum1 = table(
  ['Topic', 'Key points'],
  [
    ['Need', 'Rule of law, disputes, rights, guarding the Constitution'],
    ['Independence', 'Freedom from interference; not freedom from accountability'],
    ['Appointment', 'President; Chief Justice and collegium decisive since 1993; the 2014 Act struck down in 2015'],
    ['Tenure and money', 'Retire at 65 and 62; removal by Parliament; Consolidated Fund'],
    ['Structure', 'Supreme Court, High Courts, district and subordinate courts; Articles 141 and 129'],
  ],
  'Summary table of Part 1: need, independence, appointment, tenure and finance, and structure of the judiciary',
);
const vTips1 = table(
  ['Common mistake', 'Write instead'],
  [
    ['Independence means judges are not accountable', 'Freedom from interference by the legislature and executive; accountability remains'],
    ['A Chief Minister can remove a High Court judge', 'Only Parliament, by a special majority, on proved grounds'],
    ['Judges are appointed by the Chief Justice alone', 'The President appoints; the Chief Justice and a collegium play the decisive role in recommending'],
  ],
  'Table of common mistakes in Part 1 and what to write instead',
);

// ---------------------------------------------------------------- tables and flows: Part 2
const vJurTerms = table(
  ['Term', 'Meaning'],
  [
    ['Jurisdiction', 'The authority of a court to hear and decide certain kinds of cases'],
    ['Original', 'The court hears the dispute first'],
    ['Appellate', 'The court hears appeals against decisions of lower courts'],
    ['Writ', 'An order of the court issued to enforce a right'],
    ['Advisory', 'An opinion given without deciding a dispute'],
  ],
  'Table of terms: jurisdiction is the authority of a court to hear and decide certain cases; original means hearing a dispute first; appellate means hearing appeals; a writ is an order to enforce a right; advisory means giving an opinion without deciding a dispute',
);
const vOriginal = table(
  ['Point', 'Original jurisdiction, Article 131'],
  [
    ['Disputes between', 'The Union and one or more states, or between states'],
    ['Where the case starts', 'Directly in the Supreme Court'],
    ['Why', 'A neutral forum for disputes between governments'],
  ],
  'Table on original jurisdiction under Article 131: disputes between the Union and states or between states begin directly in the Supreme Court, a neutral forum for disputes between governments',
);
const vOrigEx = table(
  ['Step', 'Imagined dispute'],
  [
    ['1. The claim', 'Karnavar says Tilmora owes it money under an agreement on a power plant'],
    ['2. Talks fail', 'The two governments cannot agree'],
    ['3. The forum', 'Karnavar moves the Supreme Court directly'],
    ['4. The jurisdiction', 'Original jurisdiction under Article 131'],
  ],
  'Worked example table: imagined states Karnavar and Tilmora disagree over money owed under a power plant agreement, talks fail, Karnavar moves the Supreme Court directly, which hears it under its original jurisdiction, Article 131',
  'A dispute between two states is not for a district court.',
);
const vWrit = table(
  ['Point', 'Article 32', 'Article 226'],
  [
    ['Court', 'Supreme Court', 'High Court'],
    ['Covers', 'Fundamental Rights', 'Fundamental Rights and other legal rights'],
    ['Nature', 'Itself a Fundamental Right', 'A constitutional power of the High Court'],
    ['Result', 'Narrower in scope', 'Wider in scope'],
  ],
  'Table comparing writ powers: Article 32 of the Supreme Court covers Fundamental Rights and is itself a Fundamental Right; Article 226 of a High Court covers Fundamental Rights and other legal rights, so it is wider',
);
const vAppeals = flow('LR', ['Trial in a district or subordinate court', 'Appeal to the High Court', 'Appeal to the Supreme Court, or special leave under Article 136'], 'Flow of appeals: a case is tried in a district or subordinate court, then appealed to the High Court, then to the Supreme Court, or by special leave under Article 136', 'The route of appeals');
const vAdvis = table(
  ['Point', 'Advisory jurisdiction, Article 143'],
  [
    ['Who asks', 'The President'],
    ['About', 'A question of law or fact of public importance'],
    ['Binding?', 'No: the opinion is advisory'],
  ],
  'Table on advisory jurisdiction under Article 143: the President can seek the opinion of the Supreme Court on a question of law or fact of public importance, and the opinion is not binding',
);
const vReview = table(
  ['Point', 'Judicial review'],
  [
    ['Meaning', 'Examining whether a law or executive action is consistent with the Constitution'],
    ['Result', 'Declared invalid if inconsistent'],
    ['Roots', 'Not named as such in the text, but flows from Articles 13, 32, 226 and others'],
    ['Article 13', 'Laws inconsistent with Fundamental Rights are void to that extent'],
  ],
  'Table on judicial review: examining laws and executive actions against the Constitution and declaring them invalid if inconsistent; it flows from Articles 13, 32 and 226 and others; Article 13 makes laws inconsistent with Fundamental Rights void to that extent',
);
const vRevFlow = flow('LR', ['A law is passed or an action is taken', 'A petitioner says it conflicts with the Constitution', 'The court examines it against the Constitution', 'If inconsistent, it is declared invalid'], 'Flow of judicial review: a law is passed or an action taken, a petitioner says it conflicts with the Constitution, the court examines it against the Constitution, and if inconsistent it is declared invalid', 'Judicial review at work');
const vActiv = table(
  ['Point', 'Judicial activism and PIL'],
  [
    ['Began', 'In the late 1970s and the 1980s'],
    ['Locus standi', 'Relaxed: any person or group can petition for those who cannot'],
    ['Letters and news reports', 'Treated as petitions'],
    ['Examples', 'Prisoners\' rights, bonded labour'],
    ['A case', 'Hussainara Khatoon (1979), on undertrial prisoners'],
  ],
  'Table on judicial activism and public interest litigation: it began in the late 1970s and 1980s; locus standi was relaxed; letters and news reports were treated as petitions; examples are prisoners\' rights and bonded labour; the Hussainara Khatoon case of 1979 concerned undertrial prisoners',
);
const vPilEx = table(
  ['Step', 'Imagined PIL in Varunadesh'],
  [
    ['1. The report', 'A newspaper reports that labourers in a brick kiln are kept working to repay debts'],
    ['2. The letter', 'A retired teacher writes to the High Court'],
    ['3. The Court', 'It treats the letter as a petition and issues notice to the state'],
    ['4. The outcome', 'It orders an inspection and directions for the labourers\' release and care'],
  ],
  'Worked example table of an imagined public interest litigation: a newspaper reports bonded labour in a brick kiln, a retired teacher writes to the High Court, the Court treats the letter as a petition and issues notice, and orders an inspection and directions',
  'The teacher is not a labourer: locus standi is relaxed.',
);
const vEffects = table(
  ['Effects noted', 'Criticisms some raise'],
  [
    ['Wider access to justice for those who cannot reach a court', 'Courts become overburdened with petitions'],
    ['Attention to the rights of the poor and weak', 'Judicial overreach: the line between the organs is blurred'],
    ['Pressure on governments to act on neglected problems', 'Courts may lack the means to supervise administration'],
  ],
  'Table of effects of public interest litigation: wider access to justice, attention to the rights of the poor, pressure to act on neglected problems; and criticisms some raise: overburdened courts, judicial overreach that blurs the line between the organs, and limits in supervising administration',
);
const vParl = table(
  ['Issue', 'Point'],
  [
    ['Conflicts', 'Arose over property rights and over Parliament\'s power to amend the Constitution'],
    ['1973', 'Kesavananda Bharati case: Parliament cannot change the basic structure (see Chapter 9)'],
    ['Separation of powers', 'Each organ has its own role'],
    ['Balance', 'Courts review laws; Parliament makes laws, amends within limits and can remove judges'],
  ],
  'Table on the judiciary and Parliament: conflicts over property rights and the amending power; the Kesavananda Bharati case of 1973 held that Parliament cannot change the basic structure; separation of powers gives each organ its own role; courts review laws while Parliament makes laws, amends within limits and can remove judges',
);
const vSum2 = table(
  ['Topic', 'Key points'],
  [
    ['Original', 'Article 131: disputes between the Union and states, or between states'],
    ['Writ', 'Article 32 for Fundamental Rights; Article 226 wider'],
    ['Appellate and advisory', 'Appeals and Article 136; Article 143 opinion not binding'],
    ['Judicial review', 'Examining laws and actions; Articles 13, 32, 226'],
    ['Activism and PIL', 'Locus standi relaxed; effects and criticisms; Kesavananda Bharati (1973)'],
  ],
  'Summary table of Part 2: original, writ, appellate and advisory jurisdiction, judicial review, and activism and public interest litigation',
);
const vTips2 = table(
  ['Common mistake', 'Write instead'],
  [
    ['The advisory opinion binds the President', 'It is not binding'],
    ['Article 32 covers all legal rights', 'Article 32 covers Fundamental Rights; Article 226 is wider'],
    ['Only the victim can file a PIL', 'Any person or group can, on behalf of those who cannot'],
  ],
  'Table of common mistakes in Part 2 and what to write instead',
);

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Judiciary, Part 1: Independence and Structure',
  goals: [
    'State why a democracy needs an independent judiciary and what independence means',
    'Explain how independence is secured: appointment, tenure, finance and other protections',
    'Present the debate on appointment of judges in a balanced way',
    'Describe the structure of the integrated judiciary, Article 141 and Article 129',
  ],
  slides: [
    sl('title', 'Judiciary: Independence and Structure', {
      b: 'Part 1: why we need an **independent judiciary**, how its **independence** is secured, and how the **courts** are arranged.',
      v: flow('LR', ['Why an independent judiciary', 'What independence means', 'How it is secured', 'The appointment debate', 'Structure of the courts'], 'Route map of Part 1: why an independent judiciary, what independence means, how it is secured, the appointment debate, and the structure of the courts', 'Part 1 at a glance'),
      n: 'When two people disagree, or when a government and a citizen disagree, someone must decide fairly. That is the work of the judiciary. In this part we ask why the judiciary must be independent, how the Constitution secures that independence, and how the courts of India are organised.',
    }),
    sl('concept', 'Why we need an independent judiciary', {
      v: vRoles,
      n: 'A democracy needs the judiciary for four reasons. It upholds the rule of law, so that the law applies to everyone, including the government. It settles disputes. It protects rights. And it guards the Constitution by examining laws and actions that may go against it. To do these tasks fairly, it must be independent.',
    }),
    sl('concept', 'What independence means', {
      v: vMeaning,
      n: 'Independence means freedom from interference by the legislature and the executive when judges decide cases. It does not mean that judges answer to no one. They are bound by the Constitution, they give reasons for their decisions in open court, and they can be removed for proved misbehaviour or incapacity.',
    }),
    sl('diagram', 'How independence is secured', {
      v: vWeb,
      n: 'This web shows the safeguards around the judiciary. There is a method of appointment, security of tenure, financial independence, protection from debate in the legislature and the power of courts to punish for contempt. Each safeguard closes one way in which pressure could be put on a judge. We study them one by one.',
    }),
    sl('concept', 'Appointment of judges', {
      v: vAppt,
      n: 'Judges are appointed by the President. Since the Second Judges case in nineteen ninety three, the Supreme Court has taken the view that the Chief Justice of India and a collegium of senior judges play the decisive role in recommending names. In twenty fourteen Parliament passed an Act to set up a commission. The Supreme Court struck it down in twenty fifteen.',
    }),
    sl('diagram', 'From recommendation to appointment', {
      v: vApptFlow,
      n: 'In practice, for the Supreme Court, the Chief Justice of India and a collegium of senior judges recommend names. The names go to the government. The President then appoints the judges. The formal power is the President\'s, but the recommendation carries great weight. This is the position as of twenty twenty four.',
    }),
    sl('check', 'Quick check: the struck down Act', {
      b: 'In which year did the Supreme Court strike down the National Judicial Appointments Commission Act?',
      chk: 'm_njac',
      n: 'Recall the year of the decision.',
    }),
    sl('concept', 'The appointment debate', {
      v: vDebate,
      n: 'People debate how judges should be chosen. Some argue that the collegium keeps appointments free from pressure by the executive, and that senior judges know best who is fit to serve. Others argue that a wider body that is accountable to the public should also take part, and that the process should be more open. Students should weigh the reasons.',
    }),
    sl('concept', 'Security of tenure', {
      v: vTenure,
      n: 'Supreme Court judges retire at sixty five and High Court judges at sixty two. A judge can be removed only by Parliament, on the grounds of proved misbehaviour or incapacity, by a special majority in both Houses. This means a majority of the total membership of each House and at least two thirds of those present and voting. It is a very difficult process.',
    }),
    sl('diagram', 'How a judge can be removed', {
      v: vRemFlow,
      n: 'A motion for removal is moved in a House of Parliament. A committee inquires into the charge. Each House must then pass the motion by a special majority. Finally the President orders the removal. Because every step is demanding, a judge does not have to fear losing office for an unwelcome ruling.',
    }),
    sl('example', 'Worked example 1: a Chief Minister\'s announcement', {
      b: 'The Chief Minister of imagined Varunadesh announces the dismissal of a High Court judge. Test the claim.',
      bl: ['Who can remove?', 'On which ground, and by what majority?'],
      v: vRemEx,
      n: 'Let us test the claim. Who can remove a High Court judge? Only Parliament, and not a Chief Minister. On what ground? Proved misbehaviour or incapacity, not unwelcome rulings. By what majority? A special majority in both Houses. So the announcement has no legal effect, and the judge continues in office.',
    }),
    sl('check', 'Quick check: true or false', {
      b: 'Independence of the judiciary means that judges are free from every kind of accountability.',
      chk: 'tf_acc',
      n: 'Think about what independence does and does not mean.',
    }),
    sl('concept', 'Finance, debate and contempt', {
      v: vFinance,
      n: 'Three more safeguards. The salaries and allowances of judges are charged on the Consolidated Fund of India, so they are not voted on. The conduct of judges cannot be discussed in the legislature except during removal proceedings. And the courts can punish for contempt, which protects their authority and dignity.',
    }),
    sl('check', 'Quick check: match the safeguard', {
      b: 'Match each safeguard of independence with the feature that provides it.',
      chk: 'mt_safeguard',
      n: 'Pair each safeguard with its feature.',
    }),
    sl('diagram', 'The structure of the courts', {
      v: vPyramid,
      n: 'The courts form a pyramid. The Supreme Court is at the top, with the Chief Justice of India and thirty three other judges, thirty four in all, as of twenty twenty four. High Courts are in the states. District and subordinate courts are below them. Appeals go upward through this single hierarchy.',
    }),
    sl('concept', 'An integrated judiciary', {
      v: vInt,
      n: 'India has an integrated judiciary: one hierarchy of courts, and not separate systems for the Union and the states. Article one hundred and forty one makes the law declared by the Supreme Court binding on all courts. Under Article one hundred and twenty nine the Supreme Court is a court of record, which means its decisions are preserved as records, and it can punish for its own contempt.',
    }),
    sl('example', 'Worked example 2: who must follow whom', {
      b: 'Follow a point of law decided by the Supreme Court down through the courts.',
      bl: ['**Binding** on district courts and High Courts', 'Parliament can **change the law**'],
      v: vBound,
      n: 'Imagine the Supreme Court decides a point of law. A district court in Varunadesh meets the same point later. It must follow the Supreme Court. A High Court meeting the same point must follow it too. If Parliament changes the law, then the courts apply the changed law. This is the force of Article one hundred and forty one.',
    }),
    sl('check', 'Quick check: court of record', {
      b: 'What does it mean to call the Supreme Court a court of record?',
      chk: 'm_record',
      n: 'Recall Article one hundred and twenty nine.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      n: 'To sum up. The judiciary upholds the rule of law, settles disputes, protects rights and guards the Constitution. Independence means freedom from interference, not from accountability. Judges are appointed by the President, with the Chief Justice and a collegium decisive since nineteen ninety three. Tenure, finance and protection from debate secure independence. The courts form one hierarchy with the Supreme Court at the top.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Say **freedom from interference**, not freedom from accountability', 'Give the **grounds** and **majority** for removal', 'Date the facts: **1993**, **2015**, **as of 2024**', 'Use **some argue, others argue** for the appointment debate'],
      v: vTips1,
      n: 'A few tips. When you define independence, say freedom from interference, and not freedom from accountability. When you write about removal, give both the grounds and the special majority. Date your facts, such as nineteen ninety three and twenty fifteen. And for the appointment debate, use the words some argue and others argue.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Judiciary, Part 2: Jurisdiction, Judicial Review and Judicial Activism',
  goals: [
    'Describe the original, writ, appellate and advisory jurisdiction of the Supreme Court',
    'Compare Article 32 and Article 226',
    'Define judicial review and name its sources',
    'Explain judicial activism and public interest litigation, with effects and criticisms',
    'Describe the relations between the judiciary and Parliament and the balance of powers',
  ],
  slides: [
    sl('title', 'Judiciary: Jurisdiction and Review', {
      b: 'Part 2: the **jurisdiction** of the Supreme Court, **judicial review**, and **judicial activism**.',
      v: flow('LR', ['Four jurisdictions', 'Writs', 'Judicial review', 'Activism and public interest litigation', 'Balance with Parliament'], 'Route map of Part 2: four jurisdictions, writs, judicial review, activism and public interest litigation, and balance with Parliament', 'Part 2 at a glance'),
      n: 'Which court hears which case, and what can a court do about a law that goes against the Constitution? In this part we study the jurisdiction of the Supreme Court, the power of judicial review, the rise of public interest litigation, and the relations between the judiciary and Parliament.',
    }),
    sl('concept', 'What is jurisdiction?', {
      v: vJurTerms,
      n: 'Jurisdiction is the authority of a court to hear and decide certain kinds of cases. A court has original jurisdiction when it hears a dispute first, and appellate jurisdiction when it hears appeals against decisions of lower courts. A writ is an order issued to enforce a right. Advisory jurisdiction means giving an opinion without deciding a dispute.',
    }),
    sl('diagram', 'Jurisdiction of the Supreme Court', {
      v: vJur,
      n: 'This chart shows the four jurisdictions of the Supreme Court. Original jurisdiction is under Article one hundred and thirty one. Writ jurisdiction is under Article thirty two. Appellate jurisdiction covers appeals, with special leave under Article one hundred and thirty six. Advisory jurisdiction is under Article one hundred and forty three.',
    }),
    sl('concept', 'Original jurisdiction', {
      v: vOriginal,
      n: 'Under Article one hundred and thirty one, disputes between the Union and one or more states, or between states, begin directly in the Supreme Court. This makes the Supreme Court a neutral forum for disputes between governments, since a court of one state might appear partial to that state.',
    }),
    sl('example', 'Worked example 1: two imagined states', {
      b: 'Karnavar and Tilmora disagree over money. Decide where the dispute goes.',
      bl: ['Parties: **two states**', 'Forum: the **Supreme Court**, original jurisdiction'],
      v: vOrigEx,
      n: 'Imagine that the state of Karnavar says the state of Tilmora owes it money under an agreement on a power plant. Talks fail. Karnavar moves the Supreme Court directly. This is original jurisdiction under Article one hundred and thirty one. A district court would not be the right forum for a dispute between two states.',
    }),
    sl('check', 'Quick check: match the jurisdiction', {
      b: 'Match each jurisdiction of the Supreme Court with its description.',
      chk: 'mt_jurisd',
      n: 'Pair each jurisdiction with its description.',
    }),
    sl('concept', 'Writs: Article 32 and Article 226', {
      v: vWrit,
      n: 'Article thirty two lets a person approach the Supreme Court directly for the enforcement of Fundamental Rights, and it is itself a Fundamental Right. High Courts have a similar power under Article two hundred and twenty six, which is wider because it covers Fundamental Rights and also other legal rights.',
    }),
    sl('diagram', 'Appellate jurisdiction', {
      v: vAppeals,
      n: 'Most cases begin in a district or subordinate court. A person who is dissatisfied can appeal to the High Court, and then to the Supreme Court in civil, criminal and constitutional cases. In addition, under Article one hundred and thirty six, the Supreme Court may grant special leave to appeal, at its discretion.',
    }),
    sl('check', 'Quick check: special leave', {
      b: 'A litigant lost in the High Court and asks the Supreme Court to hear the case. Which route can the litigant try?',
      chk: 'm_slp',
      n: 'Think of the discretion of the Supreme Court to grant leave.',
    }),
    sl('concept', 'Advisory jurisdiction', {
      v: vAdvis,
      n: 'Under Article one hundred and forty three, the President can seek the opinion of the Supreme Court on a question of law or fact of public importance. The Court gives an advisory opinion. It is not a judgment between parties, and it is not binding on the President or the government.',
    }),
    sl('concept', 'Judicial review', {
      v: vReview,
      n: 'Judicial review is the power of the courts to examine whether a law or an executive action is consistent with the Constitution, and to declare it invalid if it is not. The words judicial review do not appear as such in the text. The power flows from Articles thirteen, thirty two, two hundred and twenty six and others. Article thirteen makes laws against Fundamental Rights void to that extent.',
    }),
    sl('diagram', 'Judicial review at work', {
      v: vRevFlow,
      n: 'A law is passed or an action is taken. A petitioner argues that it conflicts with the Constitution. The court examines it against the Constitution. If it is inconsistent, the court declares it invalid. In this way judicial review keeps every organ of government within the limits of the Constitution.',
    }),
    sl('check', 'Quick check: which Article?', {
      b: 'Which Article declares laws that are inconsistent with the Fundamental Rights void to that extent?',
      chk: 'm_art13',
      n: 'Recall the Article that supports judicial review of laws affecting Fundamental Rights.',
    }),
    sl('concept', 'Judicial activism and public interest litigation', {
      v: vActiv,
      n: 'Public interest litigation began in the late nineteen seventies and the nineteen eighties. Courts relaxed the rule of locus standi, which decides who may approach the court, so that any person or group can petition on behalf of those who cannot. Letters and news reports have been treated as petitions. An early case, Hussainara Khatoon in nineteen seventy nine, concerned undertrial prisoners.',
    }),
    sl('diagram', 'How a public interest case moves', {
      v: vPil,
      n: 'This chart shows five steps. A group is harmed and cannot reach the court. A concerned person writes a letter or files a petition. The court relaxes locus standi and treats the letter as a petition. Notice goes to the government and there is a hearing. Then the court gives directions to protect the rights involved.',
    }),
    sl('example', 'Worked example 2: an imagined report', {
      b: 'A newspaper in Varunadesh reports on labourers in a brick kiln. Trace the case.',
      bl: ['The teacher is **not a labourer**', '**Locus standi** is relaxed'],
      v: vPilEx,
      n: 'Imagine that a newspaper in Varunadesh reports that labourers in a brick kiln are kept working to repay debts. A retired teacher writes to the High Court. The Court treats the letter as a petition and issues notice to the state. After a hearing it orders an inspection and gives directions. The teacher is not a labourer, but locus standi has been relaxed.',
    }),
    sl('check', 'Quick check: true or false', {
      b: 'After the rise of public interest litigation, only the person whose own right was violated can approach the court.',
      chk: 'tf_locus',
      n: 'Think about what changed in locus standi.',
    }),
    sl('concept', 'Effects and criticisms', {
      v: vEffects,
      n: 'Public interest litigation has had effects. It has widened access to justice and drawn attention to the rights of the poor and weak. Some argue that it has also raised concerns. They argue that courts have become overburdened, and that judicial overreach blurs the line between the organs. Others reply that courts act where rights would otherwise go unprotected. Students should weigh the reasons.',
    }),
    sl('concept', 'The judiciary and Parliament', {
      v: vParl,
      n: 'In the early decades, conflicts arose between the judiciary and Parliament over property rights and over how far Parliament could amend the Constitution. In the Kesavananda Bharati case in nineteen seventy three, the Supreme Court held that Parliament cannot change the basic structure. Chapter nine studies this in depth. The separation of powers gives each organ its own role and a way of checking the others.',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      n: 'To sum up. The Supreme Court has original, writ, appellate and advisory jurisdiction. Article thirty two protects Fundamental Rights, and Article two hundred and twenty six is wider. Judicial review tests laws and actions against the Constitution. Public interest litigation relaxed locus standi, with effects and criticisms that people debate. The judiciary and Parliament keep a balance within the separation of powers.',
    }),
    sl('exam-tips', 'Exam tips', {
      bl: ['Give the **Article** with each jurisdiction', 'Say the advisory opinion is **not binding**', 'Define **locus standi** whenever you write about public interest litigation', 'Give **effects and criticisms** both, as views'],
      v: vTips2,
      n: 'A few tips. Give the Article number with each jurisdiction. Say that the advisory opinion is not binding. Define locus standi whenever you write about public interest litigation. And give both the effects and the criticisms, presented as views that different people hold.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Judiciary: Notes',
  sections: [
    {
      h: '1. Why an independent judiciary, and what independence means',
      t: 1,
      b: 'A democracy needs a judiciary for four reasons: it upholds the **rule of law**, **settles disputes**, **protects rights** and **guards the Constitution**.\n\n**Independence of the judiciary** means freedom from interference by the legislature and the executive when judges decide cases. It does **not** mean freedom from accountability: judges are bound by the Constitution, give reasoned judgments in open court, and can be removed for proved misbehaviour or incapacity.',
      terms: [
        ['Judiciary', 'The organ of government that interprets and applies the law and settles disputes.'],
        ['Rule of law', 'The principle that the same law applies to everyone, including the government.'],
        ['Independence of the judiciary', 'Freedom of the courts from interference by the legislature and the executive in deciding cases.'],
      ],
      v: vRoles,
      vs: [vMeaning],
    },
    {
      h: '2. Appointment of judges and the debate',
      t: 1,
      b: 'Judges are **appointed by the President**. Since the **Second Judges case (1993)**, the Supreme Court\'s view is that the **Chief Justice of India and a collegium of senior judges** play the decisive role in recommending names. The **National Judicial Appointments Commission Act (2014)** was **struck down by the Supreme Court in 2015**. This is the position as of 2024.\n\n**Some argue** that the collegium keeps appointments free from pressure by the executive; **others argue** that a wider, accountable body should also take part and that the process should be more open.',
      terms: [
        ['Collegium', 'The Chief Justice of India and a group of senior judges who recommend names for appointment as judges.'],
        ['National Judicial Appointments Commission Act', 'A 2014 Act to set up a commission for appointing judges, struck down by the Supreme Court in 2015.'],
      ],
      v: vApptFlow,
      vs: [vDebate],
    },
    {
      h: '3. Tenure, money and other protections',
      t: 1,
      b: '- **Security of tenure:** Supreme Court judges retire at **65** and High Court judges at **62**. Removal is only by **Parliament**, on **proved misbehaviour or incapacity**, by a **special majority** in both Houses: a majority of the total membership of each House and at least two thirds of the members present and voting. It is a very difficult process.\n- **Financial independence:** salaries and allowances are **charged on the Consolidated Fund of India** and are **not voted on**.\n- **Protection from debate:** the conduct of judges **cannot be discussed in the legislature** except during removal proceedings.\n- **Contempt:** the courts can **punish for contempt**.',
      terms: [
        ['Security of tenure', 'Protection of a judge from removal at will; a judge can be removed only on prescribed grounds and by a prescribed procedure.'],
        ['Special majority', 'For removal of a judge, a majority of the total membership of each House and at least two thirds of the members present and voting.'],
        ['Consolidated Fund of India', 'The main fund of the Union government; expenses charged on it, such as judges\' salaries, are not voted on.'],
        ['Contempt of court', 'Conduct that obstructs the working of the courts or lowers their authority; courts can punish it.'],
      ],
      v: vWeb,
      vs: [vTenure, vRemFlow],
    },
    {
      h: '4. Structure of the judiciary',
      t: 1,
      b: 'The judiciary is **integrated**: one hierarchy with the **Supreme Court** at the top (the Chief Justice of India and 33 other judges, **34 in all, as of 2024**), **High Courts** in the states, and **district and subordinate courts** below.\n\n- **Article 141:** the law declared by the Supreme Court is **binding on all courts**.\n- **Article 129:** the Supreme Court is a **court of record**: its proceedings and decisions are preserved as records and it can punish for its own contempt.',
      terms: [
        ['Integrated judiciary', 'A system in which all courts form one hierarchy, with the Supreme Court at the top.'],
        ['High Court', 'The highest court of a state, below the Supreme Court.'],
        ['Court of record', 'A court whose proceedings and decisions are preserved as authoritative records, and which can punish for contempt of itself.'],
      ],
      v: vPyramid,
      vs: [vInt],
    },
    {
      h: '5. Jurisdiction of the Supreme Court',
      t: 2,
      b: '**Jurisdiction** is the authority of a court to hear and decide certain cases.\n\n- **Original (Article 131):** disputes between the Union and states, or between states.\n- **Writ (Article 32):** enforcement of Fundamental Rights. High Courts have a **wider writ power under Article 226**, covering Fundamental Rights and other legal rights.\n- **Appellate:** civil, criminal and constitutional appeals, plus **special leave to appeal (Article 136)**.\n- **Advisory (Article 143):** the President can seek the Court\'s opinion on a question of law or fact of public importance; the opinion is **not binding**.',
      terms: [
        ['Jurisdiction', 'The authority of a court to hear and decide certain kinds of cases.'],
        ['Writ', 'An order of a court issued to enforce a right.'],
        ['Special leave to appeal', 'Permission, granted at the discretion of the Supreme Court, to appeal from a decision of a lower court or tribunal.'],
        ['Advisory opinion', 'An opinion of the Supreme Court given at the request of the President; it is not binding.'],
      ],
      v: vJur,
      vs: [vWrit, vAppeals],
    },
    {
      h: '6. Judicial review',
      t: 2,
      b: '**Judicial review** is the power of the courts to examine whether a **law or an executive action is consistent with the Constitution** and to declare it **invalid** if it is not. The words are not used as such in the text, but the power flows from **Articles 13, 32, 226** and others. **Article 13** declares laws inconsistent with Fundamental Rights void to that extent.',
      terms: [
        ['Judicial review', 'The power of the courts to examine laws and executive actions against the Constitution and declare them invalid if inconsistent.'],
        ['Fundamental Rights', 'Rights guaranteed by the Constitution that courts can enforce against the State.'],
      ],
      v: vRevFlow,
      vs: [vReview],
    },
    {
      h: '7. Judicial activism, PIL and the judiciary and Parliament',
      t: 2,
      b: '**Judicial activism** is an active role of the courts in protecting rights and addressing public problems. **Public interest litigation (PIL)** began in the late **1970s and 1980s**: courts relaxed **locus standi**, so any person or group can approach the court on behalf of those who cannot, and **letters and news reports** have been treated as petitions. Examples include prisoners\' rights and bonded labour; the **Hussainara Khatoon case (1979)** concerned undertrial prisoners.\n\n**Effects:** wider access to justice and attention to the rights of the poor. **Criticisms some raise:** overburdened courts and **judicial overreach**, which blurs the line between the organs.\n\n**Judiciary and Parliament:** conflicts arose over property rights and Parliament\'s power to amend; the **Kesavananda Bharati case (1973)** held that Parliament cannot change the basic structure (Chapter 9). The **separation of powers** gives each organ its own role and a system of mutual checks.',
      terms: [
        ['Judicial activism', 'An active role of the courts in protecting rights and addressing public problems.'],
        ['Public interest litigation', 'A case brought in the public interest by a person or group on behalf of those who cannot approach the court themselves.'],
        ['Locus standi', 'The right to bring a case before a court; relaxed by PIL so that others can petition for those who cannot.'],
        ['Judicial overreach', 'The concern, raised by some, that courts enter the field of the legislature or the executive.'],
        ['Separation of powers', 'The division of government into organs with separate roles that also check one another.'],
      ],
      v: vPil,
      vs: [vActiv, vEffects, vParl],
    },
  ],
  tips: '**Common mistakes**\n- Saying independence means judges are not accountable: it is freedom from interference.\n- Saying a Chief Minister can remove a High Court judge: only Parliament can, by a special majority.\n- Saying the Chief Justice alone appoints judges: the President appoints, with the Chief Justice and collegium decisive in recommending.\n- Saying the advisory opinion is binding: it is not.\n- Saying only the victim can file a PIL: any person or group can, for those who cannot.\n\n**Tips:** give the Article number with each jurisdiction; date facts (1993, 2015, 1973, as of 2024); present the appointment debate and the criticisms of activism as some argue and others argue.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Name four roles of the **judiciary**', 'Upholding the rule of law; settling disputes; protecting rights; guarding the Constitution.', 'concept', 1],
  ['What is the **rule of law**?', 'The principle that the same law applies to everyone, including the government.', 'definition', 1],
  ['What does **independence of the judiciary** mean?', 'Freedom from interference by the legislature and the executive in deciding cases.', 'definition', 1],
  ['Does independence mean freedom from **accountability**?', 'No: judges are bound by the Constitution, give reasons in open court and can be removed for proved misbehaviour or incapacity.', 'concept', 1],
  ['Who **appoints** judges?', 'The President; the Chief Justice of India and a collegium play the decisive role in recommending names (since the Second Judges case, 1993).', 'fact', 1],
  ['What is the **collegium**?', 'The Chief Justice of India and a group of senior judges who recommend names for appointment as judges.', 'definition', 1],
  ['What happened to the **NJAC Act (2014)**?', 'It was struck down by the Supreme Court in 2015.', 'fact', 1],
  ['The debate on appointing judges', 'Some argue the collegium protects independence; others argue a wider, accountable body should take part.', 'concept', 2],
  ['Retirement ages of judges', 'Supreme Court 65; High Court 62.', 'fact', 1],
  ['Who can **remove** a judge, and on what grounds?', 'Parliament only, on proved misbehaviour or incapacity.', 'fact', 1],
  ['What majority is needed to remove a judge?', 'A special majority in both Houses: a majority of the total membership and at least two thirds of those present and voting.', 'fact', 2],
  ['**Financial independence** of judges', 'Salaries and allowances are charged on the Consolidated Fund of India and are not voted on.', 'fact', 1],
  ['When can the conduct of a judge be discussed in the legislature?', 'Only during removal proceedings.', 'fact', 1],
  ['Why can courts punish for **contempt**?', 'To protect their authority and dignity so that their work is not obstructed.', 'concept', 1],
  ['What is an **integrated judiciary**?', 'One hierarchy of courts: Supreme Court, High Courts, district and subordinate courts.', 'definition', 1],
  ['Strength of the **Supreme Court** (as of 2024)', 'The Chief Justice of India and 33 other judges, 34 in all.', 'fact', 1],
  ['**Article 141**', 'The law declared by the Supreme Court is binding on all courts.', 'fact', 1],
  ['**Article 129**', 'The Supreme Court is a court of record.', 'fact', 1],
  ['What is **jurisdiction**?', 'The authority of a court to hear and decide certain kinds of cases.', 'definition', 1],
  ['**Original jurisdiction** (Article 131)', 'Disputes between the Union and states, or between states, begin in the Supreme Court.', 'fact', 1],
  ['**Writ jurisdiction** (Article 32)', 'Approach the Supreme Court for the enforcement of Fundamental Rights.', 'fact', 1],
  ['**Article 226**', 'High Courts can issue writs for Fundamental Rights and other legal rights: a wider power.', 'fact', 2],
  ['**Appellate jurisdiction**', 'Civil, criminal and constitutional appeals, and special leave to appeal (Article 136).', 'fact', 2],
  ['**Advisory jurisdiction** (Article 143)', 'The President can seek the Court\'s opinion; it is not binding.', 'fact', 1],
  ['What is **judicial review**?', 'The power of courts to examine whether a law or executive action is consistent with the Constitution and declare it invalid if not.', 'definition', 1],
  ['Sources of **judicial review**', 'Not named as such in the text; it flows from Articles 13, 32, 226 and others.', 'concept', 2],
  ['What is **public interest litigation**?', 'A case brought by a person or group on behalf of those who cannot approach the court themselves.', 'definition', 1],
  ['What is **locus standi**?', 'The right to bring a case before a court; relaxed by PIL.', 'definition', 1],
  ['Effects of PIL', 'Wider access to justice; attention to the rights of the poor.', 'concept', 2],
  ['Criticisms some raise of judicial activism', 'Overburdened courts; judicial overreach blurring the line between the organs.', 'concept', 2],
  ['**Kesavananda Bharati** (1973)', 'Held that Parliament cannot change the basic structure of the Constitution.', 'fact', 2],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'cbse-11-default-chapter-test-short',
  title: 'Chapter test (short): Judiciary',
  duration: 40,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 4 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_indep', 'm_appoint', 'm_review', 'ar_tenure'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and the 3-mark question in about 50 to 80 words.', items: ['s_indep', 's_review', 's3_jurisdiction'] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer any ONE of the two questions in about 80 to 120 words.', items: [{ attempt: 1, keys: ['l_indep', 'l_pil'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks)', instr: 'Read the passage and answer all parts. Part (c) has an internal choice.', items: ['c_report'] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'cbse-11-default-chapter-test-long',
  title: 'Chapter test (long): Judiciary',
  duration: 90,
  sections: [
    { id: 'A', title: 'Section A: Objective (1 mark each)', instr: 'Questions 1 to 10 are multiple-choice or assertion-reason questions. Choose the correct option.', items: ['m_retire', 'm_removal_app', 'm_salary_app', 'm_structure', 'm_art141', 'm_original_app', 'm_writ_app', 'm_pil_app', 'ar_salary', 'ar_pil'] },
    { id: 'B', title: 'Section B: Short answer (2 and 3 marks)', instr: 'Answer 2-mark questions in about 30 to 50 words and 3-mark questions in about 50 to 80 words. Questions 13 and 15 have an internal choice.', items: ['s_why', 's_tenure', { attempt: 1, keys: ['s_record', 's_advis'] }, 's3_safeguards', { attempt: 1, keys: ['s3_pil_crit', 's3_appoint'] }] },
    { id: 'C', title: 'Section C: Long answer (5 marks)', instr: 'Answer question 16, and any ONE of questions 17 and 18, in about 80 to 120 words each.', items: ['l_structure', { attempt: 1, keys: ['l_jurisdiction', 'l_balance'] }] },
    { id: 'D', title: 'Section D: Case-based (4 marks each)', instr: 'Read each passage and answer all parts. Part (c) of each has an internal choice.', items: ['c_dispute', 'c_letter'] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01 and t02 of cbse-11-political-science-ch06 only (independence and structure of the judiciary; jurisdiction, judicial review and judicial activism)',
    originality: 'every passage (newspaper report, briefing note, case log, classroom discussion) and every state, town, court, petitioner and person is imagined, written by SOYL and labelled; no NCERT text, boxed source or cartoon, no Constitution text, judgment text or board item reused (D-036)',
    facts: 'stable facts only: retirement at 65 and 62; removal by Parliament by special majority; Consolidated Fund; Articles 129, 131, 136, 141, 143, 13, 32, 226; Second Judges case 1993; NJAC Act 2014 struck down 2015; PIL from the late 1970s and 1980s; Hussainara Khatoon 1979; Kesavananda Bharati 1973; Supreme Court strength 34 as of 2024',
    neutrality: 'no judges, office-holders or pending cases named; the appointment debate and the criticisms of activism framed as some argue and others argue',
    gate: 'schema, content lint (lintExemplar) and the deterministic verify checks run clean on this chapter',
  },
});
