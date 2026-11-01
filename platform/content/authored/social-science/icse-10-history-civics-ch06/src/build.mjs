// Build ICSE 10 History & Civics ch06 The High Courts and Subordinate Courts. Run from platform/:
//   npx tsx content/authored/social-science/icse-10-history-civics-ch06/src/build.mjs
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../icse-10-history-civics-ch01/src/lib.mjs';

setUnit('icse-10-history-civics-ch06', 'social-science');
const { hierarchySvg, RETIRE_AGE, YEARS_QUAL, DJ_ADVOCATE_YEARS, ADDL_YEARS, LS, majorityOfTotal, twoThirdsPresent, removalNeed } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- figures
const vRoute1 = flow('LR', ['The High Court in the court system', 'Composition', 'Qualifications and appointment', 'Independence', 'Jurisdiction and writs'], 'Route map of Part 1: the High Court in the court system, its composition, qualifications and appointment of judges, independence, and jurisdiction including writs', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Court of the District Judge', 'Sessions Court', 'Civil and criminal routes', 'Lok Adalats and their advantages'], 'Route map of Part 2: the Court of the District Judge, the Sessions Court, civil and criminal routes of appeal, and Lok Adalats with their advantages', 'Part 2 at a glance');
const vHier = hierarchySvg('Box diagram of the courts in a State: the Supreme Court above the High Court; below it the Court of the District Judge for civil cases and the Sessions Court for serious criminal cases; below those, lower civil courts and magistrates\' courts', 'Hierarchy of courts in a State (schematic, not every court shown).');
const vComp = table(['Part of the High Court', 'Who decides or how'], [
  ['Chief Justice', 'One for each High Court'],
  ['Other judges', 'As many as the President decides from time to time'],
  ['Additional judges', `For a temporary rise in work, up to ${ADDL_YEARS} years`],
  ['Acting judges', 'While a permanent judge is absent'],
  ['Common High Court', 'Parliament may provide one for two or more States (Article 231)'],
], 'Table of the composition of a High Court: a Chief Justice, other judges whose number the President fixes, additional judges for up to two years, acting judges during absence, and a common High Court for two or more States');
const vQuals = table(['Condition', 'Requirement'], [
  ['Citizenship', 'Citizen of India'],
  ['Experience, route 1', `At least ${YEARS_QUAL} years in a judicial office in India`],
  ['Experience, route 2', `At least ${YEARS_QUAL} years as an advocate of a High Court`],
  ['Retirement', `At the age of ${RETIRE_AGE}`],
], 'Table of qualifications of a High Court judge: Indian citizenship and either ten years of judicial office or ten years as a High Court advocate; retirement at sixty-two; no minimum age');
const vAppoint = flow('TB', ['Names recommended by a collegium of senior judges (practice since the 1990s)', 'Consultation: Chief Justice of India, Governor, Chief Justice of the High Court', 'Appointment by the President', 'Oath before the Governor'], 'Flow of appointment of High Court judges: a collegium of senior judges recommends names, the President consults the Chief Justice of India, the Governor and the Chief Justice of the High Court, then appoints; the judge takes oath before the Governor', 'Article 217.');
const vWho = table(['Imagined situation', 'Who acts'], [
  ['A new judge is needed', 'The President, after consultation'],
  ['A judge is moved to another State', 'The President, after consulting the Chief Justice of India'],
  ['A judge is accused of proved misbehaviour', 'Parliament (special majority), then the President'],
  ['A judge turns 62', 'Retires automatically'],
], 'Worked example table: a new judge is appointed by the President after consultation; a transfer is ordered by the President after consulting the Chief Justice of India; removal needs a special majority in Parliament and then the President; at sixty-two a judge retires');
const vRemoval = table(['In each House (example)', 'Members needed'], [
  [`Majority of total membership (${LS})`, String(majorityOfTotal(LS))],
  ['Two-thirds of 480 present and voting', String(twoThirdsPresent(480))],
  ['Both conditions met when 480 vote', String(removalNeed(LS, 480))],
], `Worked example table for removal: in a Lok Sabha of ${LS}, a majority of the total membership is ${majorityOfTotal(LS)}; if 480 members vote, two-thirds is ${twoThirdsPresent(480)}; both conditions are met with ${removalNeed(LS, 480)} votes in favour`, 'Imagined attendance; both conditions must be met.');
assert.equal(removalNeed(LS, 480), 320);
const vIndep = flow('TB', ['Appointment by the President, with judicial consultation', `Tenure till ${RETIRE_AGE}; removal only by Parliament and the President`, 'Salaries charged on the Consolidated Fund of the State', 'No practice before the same High Court after retirement'], 'Flow of safeguards of independence: appointment by the President with judicial consultation, tenure till sixty-two with difficult removal, salaries charged on the Consolidated Fund of the State, and no practice before the same High Court after retirement', 'Why judges can decide without fear.');
const vOriginal = table(['Original jurisdiction', 'Example'], [
  ['Writs (Article 226)', 'Fundamental Rights and other legal rights'],
  ['Election petitions', 'Disputes over elections to Parliament or the State Legislature'],
  ['Some civil matters (in some High Courts)', 'Certain admiralty, company or matrimonial cases'],
], 'Table of original jurisdiction of a High Court: writs under Article 226, election petitions for Parliament and the State Legislature, and in some High Courts certain civil matters');
const vWrits = table(['Writ', 'Literal idea', 'Used when'], [
  ['Habeas corpus', 'Produce the body', 'A person is detained unlawfully'],
  ['Mandamus', 'We command', 'A public authority fails in its duty'],
  ['Prohibition', 'Stop', 'A lower court goes beyond its powers in a pending case'],
  ['Certiorari', 'To be informed', 'A lower court\'s order is quashed after decision'],
  ['Quo warranto', 'By what authority', 'A person holds a public office without right'],
], 'Table of the five writs with their literal ideas and uses: habeas corpus for unlawful detention, mandamus for a duty not done, prohibition to stop a lower court in a pending case, certiorari to quash a decided order, quo warranto to test a right to public office');
const vWider = table(['Point', 'High Court (Article 226)', 'Supreme Court (Article 32)'], [
  ['Purpose', 'Fundamental Rights and any other purpose', 'Fundamental Rights only'],
  ['Area', 'Within its territory', 'The whole of India'],
  ['Nature', 'Discretionary', 'Itself a Fundamental Right'],
], 'Table comparing writ powers: a High Court acts for Fundamental Rights and any other purpose within its territory, at its discretion; the Supreme Court acts only for Fundamental Rights across India, and the right to approach it is itself fundamental');
const vAppellate = flow('LR', ['Lower civil courts', 'Court of the District Judge', 'High Court (civil appeals)', 'Supreme Court'], 'Flow of civil appeals: lower civil courts, the Court of the District Judge, the High Court and finally the Supreme Court', 'Civil chain of appeal.');
const vRevise = table(['Power', 'What it allows'], [
  ['Revisory', 'Call for the record of a decided case where no appeal lies and correct errors of jurisdiction'],
  ['Superintendence (Article 227)', 'Supervise all courts and tribunals in its territory, except military tribunals'],
  ['Transfer', 'Take up a case raising a substantial question of constitutional law'],
], 'Table of supervisory powers: revisory power over decided cases where no appeal lies, superintendence over all courts and tribunals under Article 227, and transfer of cases raising constitutional questions');
const vWhich = table(['Imagined case', 'Jurisdiction used'], [
  ['A losing candidate challenges a State election', 'Original'],
  ['An appeal against a District Judge\'s civil decree', 'Appellate (civil)'],
  ['A lower court decided a case it had no power to hear; no appeal lies', 'Revisory'],
  ['A State law is challenged as against Fundamental Rights', 'Judicial review (through a writ)'],
], 'Worked example table matching imagined cases to jurisdiction: an election challenge is original, an appeal from a District Judge is appellate, correcting a lower court that lacked power is revisory, and testing a State law is judicial review');
const vRecord = table(['Court of Record (Article 215)', 'Judicial review'], [
  ['Judgements preserved as records', 'Laws and executive orders tested against the Constitution'],
  ['Cited as precedents; bind lower courts', 'Unconstitutional laws declared void'],
  ['Power to punish for contempt of itself', 'Protects Fundamental Rights and the federal balance'],
], 'Two-column table: as a Court of Record a High Court preserves its judgements, which bind lower courts and are cited as precedents, and can punish contempt; through judicial review it tests laws and orders and declares unconstitutional ones void');
const vSum1 = flow('TB', ['Chief Justice and other judges fixed by the President', 'Citizen with ten years of judicial office or High Court practice', 'Appointed by the President; removed only through Parliament', 'Original, appellate, revisory, writ and review powers; Court of Record'], 'Summary flow of Part 1: composition, qualifications, appointment and removal, and the jurisdiction of a High Court', 'Part 1 in four lines.');
const vDJ = table(['Court of the District Judge', 'Detail'], [
  ['Appointed by', 'The Governor, in consultation with the High Court (Article 233)'],
  ['Direct appointment from the Bar', `At least ${DJ_ADVOCATE_YEARS} years as an advocate`],
  ['Work', 'Civil appeals from lower courts; important civil suits; supervision of civil courts'],
], 'Table on the Court of the District Judge: appointed by the Governor in consultation with the High Court; seven years as an advocate for direct appointment; hears civil appeals, important civil suits and supervises lower civil courts');
const vSessions = table(['Sessions Court', 'Detail'], [
  ['Cases', 'Serious crimes such as murder, robbery and dacoity'],
  ['Sentences', 'Any lawful sentence; a death sentence needs High Court confirmation'],
  ['Appeals', 'From judgements of magistrates\' courts in the district'],
], 'Table on the Sessions Court: tries serious crimes such as murder, robbery and dacoity, can pass any lawful sentence with death sentences confirmed by the High Court, and hears appeals from magistrates');
const vCivCrim = table(['Point', 'District Judge', 'Sessions Judge'], [
  ['Kind of case', 'Civil', 'Criminal'],
  ['Examples', 'Property, contracts, succession', 'Murder, dacoity, robbery'],
  ['Appeals heard from', 'Lower civil courts', 'Magistrates\' courts'],
  ['Next appeal', 'High Court', 'High Court'],
], 'Comparison table: the District Judge hears civil cases such as property and contract disputes and civil appeals; the Sessions Judge hears criminal cases such as murder and criminal appeals from magistrates; both are appealed to the High Court');
const vRouteEx = flow('LR', ['Theft case: Judicial Magistrate', 'Appeal: Sessions Court', 'Further appeal or revision: High Court', 'Supreme Court (only on serious points)'], 'Worked example flow of an imagined theft case: tried by a Judicial Magistrate, appealed to the Sessions Court, then to the High Court, and to the Supreme Court only on serious points', 'Trace the route, court by court.');
const vLA = flow('TB', ['Dispute pending in court, or not yet filed', 'Referred to a Lok Adalat bench', 'Bench of a judicial officer with a lawyer or social worker helps the parties talk', 'Parties agree', 'Award: deemed a decree of a civil court; final, no appeal'], 'Flow of a Lok Adalat: a pending or pre-litigation dispute is referred to a bench of a judicial officer with a lawyer or social worker, the parties are helped to agree, and the award is a deemed civil decree, final with no appeal', 'Legal Services Authorities Act, 1987.');
const vLAadv = table(['Advantage', 'Why it matters'], [
  ['No court fee', 'Fee paid on a pending case is refunded on settlement'],
  ['Speed', 'Many cases settled in one sitting'],
  ['Informal', 'Parties can speak freely, often in their own language'],
  ['Finality', 'No appeal; the matter ends'],
  ['Goodwill', 'A compromise keeps relations between the parties'],
], 'Table of advantages of Lok Adalats: no court fee with refunds, speed, informal procedure, finality with no appeal, and goodwill between the parties');
const vLAlimit = table(['Limitation', 'Example'], [
  ['Needs both sides to agree', 'A party who refuses must go back to the regular court'],
  ['Not for serious crimes', 'Offences that cannot be compromised, such as murder'],
  ['Pressure to settle', 'A weaker party may accept less than is due'],
], 'Table of limitations of Lok Adalats: they need the consent of both sides, they cannot settle serious non-compoundable crimes, and a weaker party may feel pressure to settle');
const vPlan = table(['Part', 'Marks', 'Plan'], [
  ['(i) Meaning and working of a Lok Adalat', '3', 'People\'s court; compromise; judicial officer with members; no fee'],
  ['(ii) Legal status of awards', '3', 'Act of 1987; deemed decree; final, no appeal'],
  ['(iii) Evaluation', '4', 'Two ways it helps; one limitation'],
], 'Worked example table planning a ten-mark answer on Lok Adalats: three marks for meaning and working, three for legal status, four for an evaluation with one limitation');
const vSum2 = flow('TB', ['District Judge: civil appeals and suits; appointed by the Governor with the High Court', 'Sessions Court: serious crimes; death sentences confirmed by the High Court', 'One officer may sit as both', 'Lok Adalat: compromise, no fee, final award'], 'Summary flow of Part 2: the District Judge, the Sessions Court, the same officer in both roles, and Lok Adalats', 'Part 2 in four lines.');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'The High Courts and Subordinate Courts — Part 1: The High Court',
  goals: [
    'Describe the composition of a High Court and the qualifications of its judges',
    'Explain how High Court judges are appointed, transferred and removed',
    'Explain the original, appellate and revisory jurisdiction of a High Court',
    'Compare the writ jurisdiction of a High Court with that of the Supreme Court',
  ],
  slides: [
    sl('title', 'The High Courts and Subordinate Courts', {
      b: 'Part 1 — the **High Court**: who sits in it, how judges are chosen, and what kinds of cases it hears.',
      v: vRoute1,
      n: 'When a farmer is refused a land record, or a family quarrels over a house, or a person is held by the police without reason, where do they go for justice? In most cases, the answer lies within their own State: a district court or the High Court. In this chapter we study the High Court first, and then the courts of the district and the people\'s courts called Lok Adalats.',
    }),
    sl('diagram', 'An integrated system of courts', {
      b: 'India has **one** connected judiciary: the **Supreme Court** at the top, a **High Court** for each State or group of States, and **subordinate courts** in every district.',
      v: vHier,
      n: 'Unlike some federal countries, India has one connected system of courts. The Supreme Court is at the top. Below it, each State, or group of States, has a High Court. Below the High Court are the district courts: the Court of the District Judge for civil cases and the Sessions Court for serious crimes, with smaller courts below them.',
    }),
    sl('diagram', 'Composition of a High Court', {
      b: 'A Chief Justice and **as many other judges as the President decides**.',
      v: vComp,
      n: 'Every High Court has a Chief Justice and other judges. The Constitution does not fix their number; the President decides it from time to time, so large States have bigger High Courts. Additional judges can be added for up to two years when work piles up, and acting judges can fill in during an absence. Parliament may also give two or more States a common High Court.',
    }),
    sl('check', 'Quick check: a shared court', {
      b: 'Can two States share one High Court?',
      chk: 'm_common_hc',
      n: 'Some States in India share a High Court. Think about which body the Constitution allows to set this up.',
    }),
    sl('diagram', 'Who can become a High Court judge?', {
      b: 'Citizenship plus **ten years** of the right experience.',
      v: vQuals,
      n: 'To be appointed a High Court judge, a person must be a citizen of India and must have either held a judicial office in India for at least ten years or practised as an advocate of a High Court for at least ten years. Notice that no minimum age is fixed. A judge holds office until the age of sixty-two.',
    }),
    sl('diagram', 'Appointment of judges', {
      b: 'The **President** appoints, after **consultation**.',
      v: vAppoint,
      n: 'Judges of a High Court are appointed by the President. Before appointing them, the President consults the Chief Justice of India, the Governor of the State and, for ordinary judges, the Chief Justice of that High Court. In practice, since the nineteen nineties, names are recommended by a collegium of senior judges. A new judge takes the oath before the Governor.',
    }),
    sl('check', 'Quick check: retirement', {
      b: 'Up to what age does a High Court judge serve?',
      chk: 'm_retire',
      n: 'The retirement ages of Supreme Court and High Court judges are different. Which one applies here?',
    }),
    sl('example', 'Worked example 1: who acts?', {
      b: 'Four imagined situations: who takes the decision?',
      bl: ['Appointment and transfer: the **President**, after consultation.', 'Removal: **Parliament** by special majority, then the **President**.', 'Retirement: automatic at **62**.'],
      v: vWho,
      n: 'Let us test ourselves. When a new judge is needed, the President appoints after consultation. To move a judge to another High Court, the President acts after consulting the Chief Justice of India. If a judge is accused of proved misbehaviour, both Houses of Parliament must pass an address by a special majority before the President removes him. At sixty-two a judge simply retires.',
    }),
    sl('example', 'Worked example 2: counting a special majority', {
      b: 'Both conditions must be met in **each** House.',
      v: vRemoval,
      n: 'Removal needs a special majority. In each House, the address must be supported by a majority of the total membership and by two-thirds of the members present and voting. In a Lok Sabha of five hundred and forty-three, the first condition needs two hundred and seventy-two. If four hundred and eighty vote, two-thirds is three hundred and twenty, so three hundred and twenty votes meet both conditions.',
    }),
    sl('diagram', 'Keeping judges independent', {
      v: vIndep,
      n: 'Why can judges decide cases against powerful governments? Several safeguards help. They are appointed by the President, not by the State government. They serve till sixty-two and can be removed only through Parliament. Their salaries come from the Consolidated Fund of the State and cannot be cut during their term. And after retiring, they cannot practise before the same High Court.',
    }),
    sl('diagram', 'Original jurisdiction', {
      b: 'Cases the High Court hears **for the first time**.',
      v: vOriginal,
      n: 'Original jurisdiction means hearing a case at its very start. A High Court hears writ petitions under Article two hundred and twenty-six, and petitions challenging elections to Parliament and the State Legislature. Some High Courts also hear certain civil matters directly, such as admiralty or company cases. For most ordinary disputes, however, the case begins in a lower court.',
    }),
    sl('diagram', 'The five writs', {
      v: vWrits,
      n: 'A writ is a formal order of a court. Habeas corpus asks for a detained person to be produced. Mandamus commands an official to do a duty. Prohibition stops a lower court from going beyond its powers in a pending case. Certiorari quashes a lower court\'s order after it is made. Quo warranto asks a person by what authority he holds a public office.',
    }),
    sl('diagram', 'Why the High Court\'s writ power is wider', {
      b: 'Article 226 covers Fundamental Rights **and any other purpose**.',
      v: vWider,
      n: 'Both the Supreme Court and the High Courts issue the same five writs, but the High Court\'s power is wider in one way. Under Article two hundred and twenty-six, it can issue writs for Fundamental Rights and for any other purpose, such as an ordinary legal right. The Supreme Court, under Article thirty-two, issues writs only for Fundamental Rights, though across the whole country.',
    }),
    sl('check', 'Quick check: supervising tribunals', {
      b: 'Which Article gives the High Court superintendence over courts and tribunals?',
      chk: 'm_227',
      n: 'A High Court watches over every court and tribunal in its State, except military tribunals. Which Article gives it this power?',
    }),
    sl('diagram', 'Appellate jurisdiction', {
      b: 'Appeals in **civil** and **criminal** cases.',
      v: vAppellate,
      n: 'Most cases reach a High Court on appeal. In civil cases, appeals come from the Court of the District Judge and other civil courts. In criminal cases, appeals come from the Sessions Court, and a death sentence passed by a Sessions Court cannot be carried out until the High Court confirms it. From the High Court, a further appeal may lie to the Supreme Court.',
    }),
    sl('diagram', 'Revision and superintendence', {
      v: vRevise,
      n: 'Even where no appeal is allowed, a High Court can call for the record of a case decided by a lower court and correct it if that court acted without power or with serious irregularity. This is its revisory jurisdiction. Under Article two hundred and twenty-seven, it also supervises all courts and tribunals in its territory, except military tribunals.',
    }),
    sl('example', 'Worked example 3: which jurisdiction?', {
      b: 'Match four imagined cases to the power used.',
      v: vWhich,
      n: 'Try these four. A losing candidate challenging a State election goes straight to the High Court, so that is original jurisdiction. An appeal against a District Judge\'s decree is appellate. Correcting a lower court that heard a case it had no power to hear, where no appeal lies, is revisory. Striking down a State law that violates Fundamental Rights is judicial review.',
    }),
    sl('diagram', 'Court of Record and judicial review', {
      v: vRecord,
      n: 'Under Article two hundred and fifteen, every High Court is a Court of Record. Its judgements are preserved, bind the courts below and are cited as precedents, and it can punish anyone for contempt of itself. Through judicial review, a High Court can test any law or executive order against the Constitution and declare it void if it violates the Constitution.',
    }),
    sl('summary', 'Summary of Part 1', {
      v: vSum1,
      bl: [
        'A Chief Justice and other judges; the President fixes the number; common High Courts are possible.',
        'Citizen with ten years of judicial office or High Court practice; retires at 62.',
        'Appointed by the President after consultation; removed only through a special majority in Parliament.',
        'Original (writs, election petitions), appellate, revisory and supervisory powers; Court of Record; judicial review.',
      ],
      n: 'To sum up Part 1. A High Court has a Chief Justice and other judges whose number the President fixes. Judges must be citizens with ten years of judicial office or High Court practice, and they retire at sixty-two. The President appoints them after consultation, and only Parliament can begin their removal. The High Court has original, appellate, revisory and writ powers, and is a Court of Record.',
    }),
    sl('exam-tips', 'Exam tips for Part 1', {
      bl: [
        'No minimum age for a High Court judge; retirement at **62** (Supreme Court: 65).',
        'The **President** appoints; the Governor is only **consulted**.',
        'Article **226** is wider than Article **32**: "any other purpose".',
        'High Courts have **no advisory** jurisdiction.',
        '10-mark answers: one clear point per mark in each part.',
      ],
      n: 'A few tips. Do not invent a minimum age for High Court judges, and remember they retire at sixty-two. The President appoints them; the Governor is only consulted. When comparing writ powers, mention that Article two hundred and twenty-six covers any other purpose. Never say a High Court gives advisory opinions. And in long answers, give one point for every mark.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'The High Courts and Subordinate Courts — Part 2: District Courts and Lok Adalats',
  goals: [
    'Describe the appointment and work of the Court of the District Judge',
    'Describe the work of the Sessions Court and distinguish it from the District Judge\'s court',
    'Trace the route of a civil and a criminal case through the courts',
    'Explain what a Lok Adalat is and list its advantages and limits',
  ],
  slides: [
    sl('title', 'District courts and Lok Adalats', {
      b: 'Part 2 — the courts closest to the people: the **District Judge**, the **Sessions Court** and the **Lok Adalat**.',
      v: vRoute2,
      n: 'Most citizens never see the inside of the Supreme Court. Their disputes begin and usually end in their own district. In Part 2 we visit the district court complex: the Court of the District Judge for civil matters, the Sessions Court for serious crimes, and the Lok Adalat, where neighbours can settle a quarrel by agreement without paying any court fee.',
    }),
    sl('diagram', 'District courts in the system', {
      b: 'Below the High Court: **civil** and **criminal** branches.',
      v: vHier,
      n: 'Look again at the hierarchy. Below the High Court, each district has two main branches. On the civil side, the Court of the District Judge sits above the lower civil courts. On the criminal side, the Sessions Court sits above the magistrates\' courts. Both are supervised by the High Court, which also hears appeals from them.',
    }),
    sl('diagram', 'The Court of the District Judge', {
      v: vDJ,
      n: 'The Court of the District Judge is the highest civil court of a district. District Judges are appointed by the Governor in consultation with the High Court. A lawyer can be appointed directly after at least seven years of practice. The court hears appeals from lower civil courts, tries important civil suits about property, contracts and succession, and supervises the civil courts of the district.',
    }),
    sl('check', 'Quick check: from the Bar', {
      b: 'How many years of practice are needed for direct appointment as a District Judge?',
      chk: 'm_dj_bar',
      n: 'The experience needed for a District Judge is different from that for a High Court judge. How many years of practice are needed?',
    }),
    sl('diagram', 'The Sessions Court', {
      v: vSessions,
      n: 'The Sessions Court tries serious crimes such as murder, robbery and dacoity. It can pass any sentence the law allows, but a death sentence cannot be carried out unless the High Court confirms it. The Sessions Court also hears appeals against judgements of the magistrates\' courts in the district.',
    }),
    sl('diagram', 'One officer, two titles', {
      b: 'District Judge for **civil** work; Sessions Judge for **criminal** work.',
      v: vCivCrim,
      n: 'In most districts, the same senior judicial officer heads both branches. When he hears a dispute about property or a contract, he sits as the District Judge. When he tries a murder case, he sits as the Sessions Judge. Appeals from both branches go to the High Court.',
    }),
    sl('example', 'Worked example 4: tracing a criminal case', {
      b: 'An imagined theft case climbs the ladder.',
      v: vRouteEx,
      n: 'Follow an imagined theft case. It is first tried by a Judicial Magistrate. If the convict is unhappy, he appeals to the Sessions Court. From there he may go to the High Court, by appeal or revision. Only on serious points of law or fact does the matter reach the Supreme Court. Each step up is a chance to correct mistakes.',
    }),
    sl('check', 'Quick check: civil or criminal?', {
      b: 'Does the Sessions Court mainly hear rent and property disputes?',
      chk: 'tf_sessions_civil',
      n: 'Think carefully about which branch handles property and rent disputes. Is this statement true or false?',
    }),
    sl('diagram', 'What is a Lok Adalat?', {
      b: 'A **people\'s court**: disputes settled by **agreement**.',
      v: vLA,
      n: 'Lok Adalat means a people\'s court. A dispute that is pending in a court, or not yet filed, is referred to a bench, usually a serving or retired judicial officer with a lawyer or social worker. The bench helps the two sides talk and reach a compromise. Under the Legal Services Authorities Act of nineteen eighty-seven, the award is treated as a civil court\'s decree.',
    }),
    sl('check', 'Quick check: the court fee', {
      b: 'Why does a Lok Adalat suit a litigant with little money?',
      chk: 'm_la_fee',
      n: 'Think about what a person must normally pay to go to court, and what happens to that money at a Lok Adalat.',
    }),
    sl('diagram', 'Advantages of Lok Adalats', {
      v: vLAadv,
      n: 'Lok Adalats have clear advantages. There is no court fee, and fee already paid on a pending case is refunded when it is settled. Many cases can be settled in a single sitting. The procedure is informal, so people can speak freely. The award is final, with no appeal, and because it rests on agreement, the parties often stay on good terms.',
    }),
    sl('diagram', 'Limits of Lok Adalats', {
      v: vLAlimit,
      n: 'Lok Adalats also have limits. They work only when both sides agree; if one side refuses, the case goes back to the regular court. They cannot settle serious crimes that the law does not allow to be compromised, such as murder. And a weaker party may sometimes feel pressed to accept less than is due.',
    }),
    sl('example', 'Worked example 5: planning a 10-mark answer', {
      b: 'Question on Lok Adalats (3 + 3 + 4).',
      v: vPlan,
      n: 'Here is how to plan a ten-mark answer on Lok Adalats. For part one, explain the meaning and working: a people\'s court, a bench led by a judicial officer, compromise and no fee. For part two, give the legal status: the Act of nineteen eighty-seven, a deemed decree, final with no appeal. For part three, evaluate: two ways it helps, and one limitation.',
    }),
    sl('check', 'Quick check: the name', {
      b: 'Complete: Lok Adalat means a ___ court.',
      chk: 'fb_la_people',
      n: 'The name itself tells you whom this court serves. Can you complete it?',
    }),
    sl('summary', 'Summary of Part 2', {
      v: vSum2,
      bl: [
        'District Judge: appointed by the Governor with the High Court; civil appeals, important suits, supervision.',
        'Sessions Court: serious crimes, appeals from magistrates; death sentences confirmed by the High Court.',
        'Often one officer: District Judge (civil) and Sessions Judge (criminal).',
        'Lok Adalat: compromise, no fee, deemed decree, final with no appeal; needs consent.',
      ],
      n: 'To sum up Part 2. The District Judge, appointed by the Governor in consultation with the High Court, heads the civil courts of the district. The Sessions Court tries serious crimes, and its death sentences need High Court confirmation. Often one officer holds both titles. Lok Adalats settle disputes by agreement, without fees, and their awards are final.',
    }),
    sl('exam-tips', 'Exam tips for Part 2', {
      bl: [
        'Do not mix up civil (District Judge) and criminal (Sessions) work.',
        'District Judges are appointed by the **Governor**, not the President.',
        'Say "no appeal" against a Lok Adalat award, and why: it rests on agreement.',
        'Name the **Legal Services Authorities Act, 1987**.',
        'Give one limitation when asked to evaluate Lok Adalats.',
      ],
      n: 'Some final tips. Keep civil and criminal work apart: the District Judge for civil cases, the Sessions Judge for criminal ones. Remember that District Judges are appointed by the Governor. When writing about Lok Adalats, say that no appeal lies and explain that the award rests on agreement, name the Act of nineteen eighty-seven, and add a limitation when asked to evaluate.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'The High Courts and Subordinate Courts — notes',
  sections: [
    {
      h: '1. Composition of a High Court',
      t: 1,
      b: '- A **Chief Justice** and **such other judges as the President** decides from time to time; no fixed number.\n- **Additional judges** for a temporary rise in work (up to **two years**); **acting judges** during absence (Article 224).\n- **Common High Court:** Parliament may provide one for two or more States or Union Territories (**Article 231**).',
      terms: [['Additional judge', 'A judge appointed for up to two years to clear arrears or extra work.'], ['Common High Court', 'One High Court serving two or more States or Union Territories.']],
      v: vComp,
      vs: [vHier],
    },
    {
      h: '2. Qualifications, appointment, transfer and removal',
      t: 1,
      b: '- **Qualifications:** citizen of India; **ten years** in a judicial office in India **or** ten years as an advocate of a High Court. No minimum age; retirement at **62**.\n- **Appointment:** by the **President** after consulting the **Chief Justice of India**, the **Governor** and the **Chief Justice of the High Court**; in practice names come from a **collegium** of senior judges (since the 1990s). Oath before the Governor.\n- **Transfer:** by the President after consulting the Chief Justice of India (Article 222).\n- **Removal:** as for a Supreme Court judge: an address by **each House of Parliament** supported by a **majority of its total membership** and **two-thirds of those present and voting**, on proved **misbehaviour or incapacity**; order by the President.',
      terms: [['Collegium', 'A group of senior judges whose recommendation is followed in appointing judges.'], ['Special majority', 'A majority of total membership plus two-thirds of members present and voting.']],
      v: vQuals,
      vs: [vAppoint, vRemoval],
    },
    {
      h: '3. Independence of High Court judges',
      t: 1,
      b: '- Appointment by the **President** with judicial consultation, not by the State government.\n- **Security of tenure** till 62; removal only through **Parliament**.\n- **Salaries** charged on the **Consolidated Fund of the State**; cannot be reduced during the term except in a financial emergency.\n- A retired permanent judge **may not plead** before the same High Court (only the Supreme Court and other High Courts).',
      terms: [['Security of tenure', 'Protection of a judge\'s term against removal except by a difficult constitutional procedure.']],
      v: vIndep,
    },
    {
      h: '4. Jurisdiction and writs',
      t: 2,
      b: '- **Original:** writs under **Article 226**; **election petitions** for Parliament and the State Legislature; in some High Courts certain civil matters.\n- **Writs:** habeas corpus, mandamus, prohibition, certiorari, quo warranto. Article 226 covers Fundamental Rights **and any other purpose** (wider than Article 32, which covers Fundamental Rights only; Article 32 is itself a Fundamental Right).\n- **Appellate:** civil appeals from the District Judge and other civil courts; criminal appeals from the Sessions Court; **confirmation of death sentences**.\n- **Revisory and supervisory:** revision of decided cases where no appeal lies; **superintendence** over all courts and tribunals (except military) under **Article 227**.\n- **Judicial review:** laws and executive orders declared void if unconstitutional.\n- **Court of Record (Article 215):** judgements preserved and cited as precedents; binding on lower courts; power to punish for contempt.\n- **No advisory** jurisdiction.',
      terms: [['Original jurisdiction', 'The power to hear a case for the first time.'], ['Revisory jurisdiction', 'The power to call for and correct a lower court\'s decided case where no appeal lies.'], ['Court of Record', 'A court whose judgements are preserved as authoritative records and which can punish contempt.']],
      v: vWrits,
      vs: [vWider, vOriginal, vRevise, vRecord],
    },
    {
      h: '5. Subordinate courts: District Judge and Sessions Court',
      t: 3,
      b: '- **District Judge:** appointed by the **Governor in consultation with the High Court** (**Article 233**); direct appointment from the Bar needs **seven years** as an advocate. Hears **civil appeals** from lower courts, tries important **civil suits**, supervises civil courts.\n- **Sessions Court:** tries **serious crimes** (murder, robbery, dacoity); hears appeals from **magistrates**; can pass any lawful sentence, but a **death sentence** must be **confirmed by the High Court** (criminal procedure law; the Bharatiya Nagarik Suraksha Sanhita, 2023, replaced the Code of Criminal Procedure from 1 July 2024 and keeps this rule).\n- The same officer is usually the **District Judge** for civil work and the **Sessions Judge** for criminal work.',
      terms: [['District Judge', 'The highest civil judicial officer of a district.'], ['Sessions Judge', 'The judge who tries serious criminal cases in a district.']],
      v: vCivCrim,
      vs: [vDJ, vSessions, vRouteEx],
    },
    {
      h: '6. Lok Adalats',
      t: 4,
      b: '- **Meaning:** a **people\'s court** that settles disputes by **compromise**. Lok Adalats began in the early 1980s and were given statutory status by the **Legal Services Authorities Act, 1987**.\n- **Working:** a bench, usually a serving or retired **judicial officer** with a lawyer or social worker; cases **pending** in courts or at the **pre-litigation** stage; mainly civil and compoundable matters.\n- **Status of awards:** **deemed decree of a civil court**; **final and binding**; **no appeal**.\n- **Advantages:** no court fee (fee refunded on settlement of a pending case); speed; informality; finality; goodwill; reduces backlog.\n- **Limits:** needs consent of both sides; not for serious non-compoundable crimes.',
      terms: [['Lok Adalat', 'A people\'s court that settles disputes by mutual agreement.'], ['Pre-litigation', 'A dispute settled before a case is filed in court.']],
      v: vLA,
      vs: [vLAadv, vLAlimit],
    },
  ],
  tips: '**Common mistakes**\n- Saying the Governor appoints High Court judges (he appoints District Judges; the President appoints High Court judges).\n- Giving High Court judges a minimum age, or a retirement age of 65.\n- Claiming that High Courts give advisory opinions.\n- Mixing up prohibition (pending case) and certiorari (decided case).\n- Calling the Sessions Court a civil court.\n- Saying an appeal lies against a Lok Adalat award.\n\n**How marks are usually awarded**\n- 1-mark items: one correct option or term.\n- 2 marks: two distinct points.\n- 10-mark questions in 3 + 3 + 4 parts: one point per mark; the last part usually asks for a comparison, a reason or an evaluation.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Composition of a High Court', 'A Chief Justice and other judges whose number the **President** fixes.', 'fact', 1],
  ['Common High Court', 'Parliament may set up one for two or more States (**Article 231**).', 'fact', 1],
  ['Qualifications of a High Court judge', 'Citizen; **10 years** judicial office **or** 10 years as a High Court advocate.', 'fact', 1],
  ['Minimum age for a High Court judge', '**None** is fixed.', 'exam-tip', 1],
  ['Retirement age, High Court judge', '**62** years.', 'fact', 1],
  ['Who appoints High Court judges?', 'The **President**, after consultation.', 'fact', 1],
  ['Whom does the President consult?', 'Chief Justice of India, the Governor, the Chief Justice of the High Court.', 'fact', 1],
  ['Additional judges', 'For extra work; up to **two years**.', 'definition', 1],
  ['Removal of a High Court judge', 'Address by each House with a **special majority**; order by the President.', 'fact', 1],
  ['Transfer of a judge', 'By the President after consulting the Chief Justice of India.', 'fact', 1],
  ['Two safeguards of independence', 'Security of tenure; salaries charged on the Consolidated Fund.', 'concept', 1],
  ['Original jurisdiction: two examples', 'Writ petitions (Article 226); election petitions.', 'example', 2],
  ['Article 226 vs Article 32', '226: Fundamental Rights **and any other purpose**; 32: Fundamental Rights only.', 'concept', 2],
  ['Habeas corpus', 'Produce a detained person before the court.', 'definition', 2],
  ['Mandamus', 'Order to a public authority to do its duty.', 'definition', 2],
  ['Prohibition vs certiorari', 'Prohibition: pending case; certiorari: after the decision.', 'exam-tip', 2],
  ['Quo warranto', 'By what authority do you hold this public office?', 'definition', 2],
  ['Appellate jurisdiction', 'Civil appeals from District Judges; criminal appeals from Sessions Courts.', 'concept', 2],
  ['Revisory jurisdiction', 'Correcting a lower court\'s decided case where no appeal lies.', 'definition', 2],
  ['Article 227', 'Superintendence over all courts and tribunals in the State (except military).', 'fact', 2],
  ['Court of Record', 'Article 215: judgements preserved and cited; power to punish contempt.', 'definition', 2],
  ['Advisory jurisdiction of a High Court?', '**None.** Only the Supreme Court advises (Article 143).', 'exam-tip', 2],
  ['Who appoints a District Judge?', 'The **Governor**, in consultation with the High Court (Article 233).', 'fact', 3],
  ['Years at the Bar for a District Judge', '**Seven**.', 'fact', 3],
  ['Sessions Court', 'Tries serious crimes; hears appeals from magistrates.', 'definition', 3],
  ['Death sentence by a Sessions Court', 'Needs **confirmation by the High Court**.', 'fact', 3],
  ['District Judge or Sessions Judge?', 'Civil work: District Judge; criminal work: Sessions Judge.', 'concept', 3],
  ['Lok Adalat', 'People\'s court; settlement by compromise.', 'definition', 4],
  ['Law behind Lok Adalats', '**Legal Services Authorities Act, 1987**.', 'fact', 4],
  ['Status of a Lok Adalat award', 'Deemed civil decree; final; **no appeal**.', 'fact', 4],
  ['Two advantages of Lok Adalats', 'No court fee (refunds); quick settlement.', 'concept', 4],
  ['One limitation of Lok Adalats', 'Needs both sides to agree; not for serious crimes.', 'concept', 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-10-history-civics-chapter-test-short',
  title: 'Chapter test (short) — The High Courts and Subordinate Courts',
  duration: 30,
  sections: [
    { id: 'I', title: 'Part I — Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1–6 carry 1 mark each; questions 7 and 8 carry 2 marks each.', items: ['m_comp', 'm_original_ex', 'm_record', 'm_sessions_cases', 'm_la_meaning', 'ar_la_speedy', 's_qual_two', 's_dj_vs_sessions'] },
    { id: 'II', title: 'Part II — Structured question (10 marks)', instr: 'Attempt any ONE of the two questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 1, keys: ['l_jurisdiction', 'l_lok_adalat'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-10-history-civics-chapter-test-long',
  title: 'Chapter test (long) — The High Courts and Subordinate Courts',
  duration: 60,
  sections: [
    { id: 'I', title: 'Part I — Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1–10 carry 1 mark each; questions 11–15 carry 2 marks each.', items: ['m_appoint', 'm_removal_who', 'm_226_wider', 'm_appellate_civil', 'm_habeas', 'm_dj_appoint', 'm_death_confirm', 'm_la_appeal', 'm_la_not', 'ar_226_32', 's_consult', 's_original_two', 's_appellate_two', 's_sessions_two', 's_la_two'] },
    { id: 'II', title: 'Part II — Structured questions (20 marks)', instr: 'Attempt any TWO of the three questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 2, keys: ['l_composition', 'l_subordinate', 'l_writs'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t04 of icse-10-history-civics-ch06 only (High Court composition, qualifications and appointment; jurisdiction including writs, judicial review and Court of Record; Court of the District Judge and Sessions Court; Lok Adalats)',
    originality: 'every scenario, diary, notice and report is imagined and written by SOYL (labelled); no textbook text or exercise and no specimen or board-paper item reused (D-036); no real person quoted; no serving judge named',
    data: `special-majority example computed: majority of ${LS} is ${majorityOfTotal(LS)}; two-thirds of 480 present is ${twoThirdsPresent(480)}; both met with ${removalNeed(LS, 480)}`,
    facts: 'Articles 214-217, 220, 222, 224, 226, 227, 231, 233; retirement at 62; ten-year qualification; seven years at the Bar for a District Judge; Article 226 wider than Article 32; Court of Record (Article 215); no advisory jurisdiction; death sentences confirmed by the High Court; Legal Services Authorities Act 1987, awards deemed decrees, no appeal, no court fee',
    gate: 'schema, content lint (lintExemplar), deterministic verify, originality pre-check and the editorial counts run clean on this chapter',
  },
});
