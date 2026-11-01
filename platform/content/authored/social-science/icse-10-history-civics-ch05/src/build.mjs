// Build ICSE 10 History & Civics ch05 The Supreme Court. Run from platform/:
//   npx tsx content/authored/social-science/icse-10-history-civics-ch05/src/build.mjs
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from '../../icse-10-history-civics-ch01/src/lib.mjs';

setUnit('icse-10-history-civics-ch05', 'social-science');
const { hierarchySvg, hubSvg, OTHER_JUDGES, STRENGTH, RETIRE_AGE, HC_JUDGE_YEARS, ADVOCATE_YEARS, LS, RS, majorityOfTotal, twoThirdsPresent, VOTE_LS, VOTE_RS, passes } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- figures
const vRoute1 = flow('LR', ['Place in the court system', 'Who sits on the Court', 'How judges are appointed', 'How a judge is removed', 'Why the Court is independent'], 'Route map of Part 1: the Supreme Court\'s place in the court system, who sits on it, how judges are appointed and removed, and why the Court is independent', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Original jurisdiction', 'Appellate jurisdiction', 'Advisory jurisdiction', 'Review, judicial review and Court of Record', 'Writs for Fundamental Rights'], 'Route map of Part 2: original, appellate and advisory jurisdiction; review of its own judgments, judicial review and Court of Record; and writs for Fundamental Rights', 'Part 2 at a glance');
const vHier = hierarchySvg('Box diagram of the hierarchy of courts: the Supreme Court of India in New Delhi at the top, the High Courts in the middle and the District and Sessions Courts at the bottom, with arrows showing that appeals go up the ladder', 'One integrated judiciary for the whole country.');
const vComp = table(['Point', 'Supreme Court of India'], [
  ['Established by', 'Article 124 of the Constitution'],
  ['Members', `Chief Justice of India and up to ${OTHER_JUDGES} other judges (${STRENGTH} in all, as of 2024)`],
  ['Who fixes the number', 'Parliament, by law'],
  ['Seat', 'Delhi, or other places fixed by the Chief Justice with the President\'s approval'],
  ['Retirement age', String(RETIRE_AGE)],
], `Table of the Supreme Court's composition: set up by Article 124; the Chief Justice and up to ${OTHER_JUDGES} other judges, ${STRENGTH} in all as of 2024; strength fixed by Parliament; sits in Delhi; judges retire at ${RETIRE_AGE}`);
assert.equal(STRENGTH, OTHER_JUDGES + 1);
const vQuals = table(['Route', 'Requirement (besides Indian citizenship)'], [
  ['High Court judge', `At least ${HC_JUDGE_YEARS} years as a judge of a High Court`],
  ['Advocate', `At least ${ADVOCATE_YEARS} years as an advocate of a High Court`],
  ['Jurist', 'A distinguished jurist in the opinion of the President'],
], `Table of qualifications for a Supreme Court judge: an Indian citizen who has been a High Court judge for ${HC_JUDGE_YEARS} years, or an advocate of a High Court for ${ADVOCATE_YEARS} years, or a distinguished jurist in the President's opinion`);
const vAppoint = flow('TB', ['Collegium of the Chief Justice and senior-most judges recommends names', 'Government processes the recommendation', 'President signs the warrant of appointment', 'Senior-most judge usually appointed Chief Justice'], 'Flow of appointment: the collegium of the Chief Justice and senior-most judges recommends names, the government processes them, the President signs the warrant, and the senior-most judge is usually appointed Chief Justice', 'Practice shaped by Supreme Court judgments in the 1990s; a 2014 commission was struck down in 2015.');
const vCandidates = table(['Imagined candidate', 'Experience', 'Qualified?'], [
  ['Meenakshi', '12 years as an advocate of a High Court', 'Yes'],
  ['Joseph', '3 years as a High Court judge, no other service', 'No'],
  ['Farida', '7 years as a High Court judge', 'Yes'],
  ['Arvind', '8 years as an advocate in a District Court only', 'No'],
], `Worked example table: Meenakshi with 12 years at the High Court bar qualifies; Joseph with 3 years as a High Court judge does not; Farida with 7 years as a High Court judge qualifies; Arvind with 8 years only in a District Court does not`, 'Check the route and the number of years.');
const vRemove = flow('TB', ['Charge of proved misbehaviour or incapacity', 'Motion admitted in a House of Parliament', 'Inquiry committee examines the charge', 'Each House passes an address by the special majority', 'President orders the removal'], 'Flow of removal of a judge: a charge of proved misbehaviour or incapacity, a motion admitted in a House, an inquiry committee, an address passed in each House by the special majority, and the President\'s order', 'Both Houses, same session.');
const vVotes = table(['House (membership)', 'Present and voting', 'In favour', 'Majority of total needed', 'Two-thirds of present needed', 'Result'], [
  [`Lok Sabha (${LS})`, String(VOTE_LS.present), String(VOTE_LS.yes), String(majorityOfTotal(LS)), String(twoThirdsPresent(VOTE_LS.present)), passes(VOTE_LS, LS) ? 'Passes' : 'Fails'],
  [`Rajya Sabha (${RS})`, String(VOTE_RS.present), String(VOTE_RS.yes), String(majorityOfTotal(RS)), String(twoThirdsPresent(VOTE_RS.present)), passes(VOTE_RS, RS) ? 'Passes' : 'Fails'],
], `Worked example table: in a Lok Sabha of ${LS}, ${VOTE_LS.yes} of ${VOTE_LS.present} present vote yes, meeting both ${majorityOfTotal(LS)} and ${twoThirdsPresent(VOTE_LS.present)}, so it passes; in a Rajya Sabha of ${RS}, ${VOTE_RS.yes} of ${VOTE_RS.present} vote yes, above ${majorityOfTotal(RS)} but below ${twoThirdsPresent(VOTE_RS.present)}, so it fails`, 'Imagined votes; both conditions must hold in each House.');
assert.equal(passes(VOTE_LS, LS), true);
assert.equal(passes(VOTE_RS, RS), false);
const vIndep = flow('TB', ['Security of tenure until sixty-five', 'Salaries charged on the Consolidated Fund and not reducible', 'Conduct not discussed in Parliament except for removal', 'Power to punish for contempt', 'No practice after retirement', 'Separation from the executive'], 'Flow listing six safeguards of judicial independence: security of tenure until sixty-five, salaries charged on the Consolidated Fund and not reducible, no discussion of conduct in Parliament except for removal, power to punish for contempt, no practice after retirement, and separation from the executive', 'Six safeguards.');
const vIndepTable = table(['Safeguard', 'Where it comes from', 'How it helps'], [
  ['Tenure', 'Article 124', 'Judges need not fear losing office for a judgment'],
  ['Salary', 'Article 125 and the Consolidated Fund', 'Pay does not depend on a yearly vote'],
  ['No discussion of conduct', 'Article 121', 'Judges are not attacked in Parliament'],
  ['Contempt power', 'Article 129', 'The Court\'s authority is protected'],
  ['No later practice', 'Article 124', 'No temptation to please future clients'],
  ['Separation', 'Article 50', 'Executive officers do not act as judges'],
], 'Table of safeguards of judicial independence with their source and purpose: tenure (Article 124), salary (Article 125 and the Consolidated Fund), no discussion of conduct (Article 121), contempt power (Article 129), no practice after retirement (Article 124) and separation from the executive (Article 50)');
const vSum1 = flow('TB', [`Chief Justice and up to ${OTHER_JUDGES} judges`, 'Appointed by the President on the collegium\'s recommendation', 'Removed only for proved misbehaviour or incapacity by both Houses', 'Independence protected by tenure, salary and other safeguards'], `Summary flow of Part 1: the Chief Justice and up to ${OTHER_JUDGES} other judges; appointment by the President on the collegium's recommendation; removal only for proved misbehaviour or incapacity by both Houses; independence protected by tenure, salary and other safeguards`, 'Part 1 in four lines.');
const vHub = hubSvg('Hub diagram: the Supreme Court in the centre with original jurisdiction (Union and State disputes), writ jurisdiction (Fundamental Rights, Article 32), appellate jurisdiction (appeals from High Courts) and advisory jurisdiction (opinion to the President, Article 143) around it; a note adds review of its own judgments and the Court of Record', 'Four main jurisdictions, and more.');
const vOrig = table(['Party on one side', 'Party on the other side'], [
  ['The Union', 'One or more States'],
  ['The Union and some States', 'Other States'],
  ['One State', 'Another State'],
], 'Table of disputes within original jurisdiction under Article 131: the Union against one or more States, the Union and some States against other States, and one State against another', 'Article 131: these cases begin in the Supreme Court.');
const vAppeal = table(['Kind of appeal', 'When it lies'], [
  ['Constitutional', 'A High Court certifies a substantial question about interpreting the Constitution'],
  ['Civil', 'A High Court certifies a substantial question of law of general importance'],
  ['Criminal', 'For example, a High Court reverses an acquittal and passes a death sentence'],
  ['Special leave (Article 136)', 'The Supreme Court allows an appeal from almost any court or tribunal, except armed forces tribunals'],
], 'Table of appellate jurisdiction: constitutional appeals on a certificate about interpreting the Constitution; civil appeals on a certificate of a substantial question of general importance; criminal appeals such as when a High Court reverses an acquittal and passes a death sentence; and special leave under Article 136 from almost any court or tribunal except armed forces tribunals');
const vCases = table(['Imagined matter', 'Jurisdiction'], [
  ['Two States quarrel over a border mine', 'Original'],
  ['A death sentence passed after a High Court reverses an acquittal', 'Appellate (criminal)'],
  ['The President asks if a proposed law would be valid', 'Advisory'],
  ['A party shows an obvious error in the Court\'s own judgment', 'Review (Article 137)'],
], 'Worked example table sorting imagined matters: a border dispute between States is original; an appeal against a death sentence after reversal of acquittal is appellate; the President\'s question is advisory; an obvious error in the Court\'s own judgment is review', 'Ask where the case starts and who brings it.');
const vAdvisory = flow('LR', ['Question of law or fact of public importance', 'President refers it under Article 143', 'Court hears and considers', 'Court gives its opinion', 'Opinion guides; not binding like a judgment'], 'Flow of advisory jurisdiction: a question of public importance, reference by the President under Article 143, hearing by the Court, its opinion, which guides but is not binding like a judgment', 'Only the President can refer.');
const vRecord = table(['Power', 'Article', 'Meaning'], [
  ['Review of its own judgments', '137', 'Reconsiders its own decision, for example to correct an obvious error'],
  ['Court of Record', '129', 'Its records are evidence and precedent; can punish for contempt'],
  ['Law binding on all courts', '141', 'Every court in India follows the law it declares'],
], 'Table of three powers: review of its own judgments under Article 137, Court of Record under Article 129 with records as evidence and the contempt power, and Article 141 making its law binding on all courts');
const vJR = flow('TB', ['A law or an order is challenged', 'Court compares it with the Constitution', 'Consistent: it stands', 'Inconsistent: declared void to that extent'], 'Flow of judicial review: a law or order is challenged, the Court compares it with the Constitution, and it stands if consistent or is declared void to the extent it is inconsistent', 'Guardian of the Constitution.');
const vWrits = table(['Writ', 'Literal sense', 'Purpose'], [
  ['Habeas corpus', 'You may have the body', 'Produce a detained person; test the detention'],
  ['Mandamus', 'We command', 'Order a public authority to do its legal duty'],
  ['Prohibition', 'Forbid', 'Stop a lower court before it exceeds its jurisdiction'],
  ['Certiorari', 'To be certified', 'Quash an order already passed without jurisdiction'],
  ['Quo warranto', 'By what authority', 'Test a person\'s right to hold a public office'],
], 'Table of the five writs with their literal sense and purpose: habeas corpus, mandamus, prohibition, certiorari and quo warranto');
const vPC = flow('LR', ['Case pending in a lower tribunal', 'Before decision: prohibition stops it', 'Order passed without jurisdiction', 'After decision: certiorari quashes it'], 'Flow contrasting prohibition and certiorari: while a case is pending in a lower tribunal, prohibition stops it from exceeding its jurisdiction; after an order is passed without jurisdiction, certiorari quashes it', 'Prohibition prevents; certiorari cures.');
const vChoose = table(['Imagined problem', 'Writ'], [
  ['A labourer held by police for a week without being produced before a magistrate', 'Habeas corpus'],
  ['An officer will not register a birth the law requires him to register', 'Mandamus'],
  ['An unqualified person holds the chair of a public board', 'Quo warranto'],
  ['A tribunal has already decided a case outside its powers', 'Certiorari'],
], 'Worked example table choosing writs for imagined problems: unlawful detention needs habeas corpus, refusal of a legal duty needs mandamus, an unqualified office-holder needs quo warranto, and a decision already made beyond powers needs certiorari');
const vSum2 = flow('TB', ['Original: Union and State disputes begin here', 'Appellate: appeals and special leave', 'Advisory: opinion to the President', 'Review, judicial review and Court of Record', 'Five writs under Article 32'], 'Summary flow of Part 2: original jurisdiction for Union and State disputes, appellate jurisdiction with appeals and special leave, advisory opinion to the President, review, judicial review and Court of Record, and five writs under Article 32', 'Part 2 in five lines.');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'The Supreme Court — Part 1: Composition, Appointment, Removal and Independence',
  goals: [
    'State the composition of the Supreme Court and the qualifications of its judges',
    'Describe how judges are appointed and removed',
    'Explain the provisions that keep the judiciary independent of the executive and the legislature',
  ],
  slides: [
    sl('title', 'The Supreme Court of India', {
      b: 'Part 1 — who sits on the **Supreme Court**, how they are **appointed** and **removed**, and why the Court is **independent**.',
      v: vRoute1,
      n: 'When two States quarrel, or a citizen\'s rights are taken away, the final word lies with one court: the Supreme Court of India. In this part we look at who sits on that court, how judges are chosen, how a judge can be removed, and the safeguards that let judges decide cases without fear of the government or of Parliament.',
    }),
    sl('diagram', 'One integrated judiciary', {
      b: 'India has a **single** system of courts, with the **Supreme Court** at the top.',
      v: vHier,
      n: 'Unlike some federations, India does not have separate Union and State court systems. There is one ladder. District and Sessions Courts are at the bottom of the ladder shown here, High Courts stand at the top in each State, and the Supreme Court is at the apex for the whole country. Appeals move up the ladder, and the law declared by the Supreme Court binds every court below it.',
    }),
    sl('check', 'Quick check: the apex court', {
      b: 'Which court\'s rulings bind every other court in India?',
      chk: 'm_head_judiciary',
      n: 'Look again at the ladder of courts. Which court stands at the very top?',
    }),
    sl('diagram', 'Composition of the Supreme Court', {
      b: `A **Chief Justice** and up to **${OTHER_JUDGES}** other judges: **${STRENGTH}** in all (as of 2024).`,
      v: vComp,
      n: 'The Constitution sets up the Supreme Court in Article one hundred and twenty-four. Parliament decides the number of judges by law. Since a law of twenty nineteen, the Court may have the Chief Justice of India and up to thirty-three other judges, thirty-four in all. The Court normally sits in Delhi. Its judges retire when they complete sixty-five years of age.',
    }),
    sl('diagram', 'Who can become a judge?', {
      b: 'Citizenship plus **one** of three routes.',
      v: vQuals,
      n: 'A judge must be a citizen of India. Beyond that there are three routes. The person may have served at least five years as a judge of a High Court, or practised at least ten years as an advocate of a High Court, or be a distinguished jurist in the opinion of the President. Notice that there is no minimum age, only the retirement age.',
    }),
    sl('diagram', 'How judges are appointed', {
      b: 'The **President** appoints; the names come from a **collegium** of senior judges.',
      v: vAppoint,
      n: 'The Constitution says the President appoints the judges after consultation. Supreme Court judgments in the nineteen nineties interpreted this to mean that a collegium, the Chief Justice and the senior-most judges, recommends names. A law of twenty fourteen tried to create a commission for appointments, but the Court struck it down in twenty fifteen, so the collegium practice continues. The senior-most judge is usually made Chief Justice.',
    }),
    sl('check', 'Quick check: the 2015 decision', {
      b: 'Which body for appointing judges did the Court strike down in 2015?',
      chk: 'm_njac',
      n: 'A new body for choosing judges was created in twenty fourteen and struck down the next year. Can you name it?',
    }),
    sl('example', 'Worked example 1: who qualifies?', {
      b: 'Test four imagined candidates against the three routes.',
      bl: ['Step 1: is the person a **citizen**?', 'Step 2: which **route**: High Court judge, advocate, or jurist?', 'Step 3: are the **years** enough?'],
      v: vCandidates,
      n: 'Let us test four imagined candidates. Meenakshi has practised twelve years at a High Court bar, more than the ten needed, so she qualifies. Joseph has been a High Court judge for only three years, less than five. Farida has seven years on a High Court bench, so she qualifies. Arvind has practised only in a District Court, which is not a High Court, so he does not qualify.',
    }),
    sl('diagram', 'Removal of a judge', {
      b: 'Only for **proved misbehaviour or incapacity**, by **both Houses** and the **President**.',
      v: vRemove,
      n: 'A judge cannot be removed for an unpopular judgment. The only grounds are proved misbehaviour or incapacity. A motion is moved in a House of Parliament and an inquiry committee examines the charge. If it is proved, each House must pass an address by a special majority in the same session. The address goes to the President, who then orders the removal.',
    }),
    sl('example', 'Worked example 2: counting the votes', {
      b: 'Two conditions in **each** House: a majority of the **total membership** and **two-thirds of members present and voting**.',
      v: vVotes,
      n: 'Here are imagined votes. In a Lok Sabha of five hundred and forty-three, three hundred and thirty members vote yes out of four hundred and eighty present. That is more than half the whole House and at least two-thirds of those voting, so it passes. In the Rajya Sabha, one hundred and thirty-one yes votes out of two hundred and ten present clears half the House but falls short of two-thirds, so the motion fails.',
    }),
    sl('check', 'Quick check: retirement', {
      b: 'Up to what age does a Supreme Court judge hold office?',
      chk: 'm_retire',
      n: 'Supreme Court judges and High Court judges retire at different ages. Which one belongs to the Supreme Court?',
    }),
    sl('diagram', 'Why independence matters', {
      b: 'The Court often decides cases **against the government**; judges must be free of pressure.',
      v: vIndep,
      n: 'The Supreme Court settles disputes in which the government itself is a party, and it protects the rights of citizens against the State. If judges feared losing their jobs or their pay, they might lean towards the government. So the Constitution builds in safeguards: security of tenure, protected salaries, protection from debate in Parliament, the contempt power, a ban on practice after retirement, and separation from the executive.',
    }),
    sl('two-column', 'Tenure, salary and authority', {
      cols: ['**Tenure and salary**\n\n- Office until **65**; removal only by the hard procedure.\n- Salaries **charged on the Consolidated Fund**; not voted on yearly.\n- Cannot be **reduced** after appointment, except in a **financial emergency**.', '**Conduct and authority**\n\n- Parliament **cannot discuss** a judge\'s conduct except during removal (**Article 121**).\n- Court can **punish for contempt** (**Article 129**).\n- Retired judges **cannot practise** in any court in India.'],
      v: vIndepTable,
      n: 'Think of the safeguards in two groups. The first protects the judge personally: a fixed tenure until sixty-five, and a salary that is charged on the Consolidated Fund, so it is not voted on every year and cannot be cut after appointment except in a financial emergency. The second protects the Court\'s authority: no debate on a judge\'s conduct in Parliament, the power to punish contempt, and no practice after retirement.',
    }),
    sl('check', 'Quick check: debate in Parliament', {
      b: 'When may Parliament discuss a judge\'s conduct?',
      chk: 'm_discuss',
      n: 'Parliament is free to debate almost anything, but there is one limit concerning judges. When is their conduct open to discussion?',
    }),
    sl('summary', 'Summary of Part 1', {
      bl: [`Supreme Court: Chief Justice and up to **${OTHER_JUDGES}** other judges; seat in Delhi.`, 'Qualifications: citizen plus High Court judge 5 years, advocate 10 years, or distinguished jurist.', 'Appointment by the President; names from the collegium.', 'Removal: proved misbehaviour or incapacity; special majority in both Houses.', 'Independence: tenure, salary, no discussion, contempt power, no later practice, separation.'],
      v: vSum1,
      n: 'To sum up Part 1. The Supreme Court has a Chief Justice and up to thirty-three other judges. A judge must be a citizen with five years on a High Court bench, ten years at a High Court bar, or be a distinguished jurist. The President appoints judges on the collegium\'s advice. Removal needs proved misbehaviour or incapacity and a special majority in both Houses. Many safeguards protect independence.',
    }),
    sl('exam-tips', 'Exam tips for Part 1', {
      bl: [
        'Removal needs **both** a majority of the total membership **and** two-thirds of members present and voting, in **each** House.',
        'Supreme Court judges retire at **65**; High Court judges at **62**.',
        'Do not write "impeachment" grounds for judges: it is **proved misbehaviour or incapacity**.',
        'For independence, give **provisions**, not just the word "independent".',
        '10-mark answers: one clear point for each mark in each part.',
      ],
      n: 'Some tips. For removal, mention both conditions of the special majority, and say it applies in each House. Keep the retirement ages apart: sixty-five for the Supreme Court and sixty-two for High Courts. Write proved misbehaviour or incapacity as the grounds. When asked about independence, name the actual provisions. And give one clear point for every mark.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'The Supreme Court — Part 2: Jurisdiction, Judicial Review and Writs',
  goals: [
    'Distinguish original, appellate and advisory jurisdiction with examples',
    'Explain review of its own judgments, judicial review and the Court of Record',
    'Name the five writs and state the purpose of each',
  ],
  slides: [
    sl('title', 'What the Supreme Court can do', {
      b: 'Part 2 — the Court\'s **jurisdictions**, **judicial review** and the **writs** that protect Fundamental Rights.',
      v: vRoute2,
      n: 'Jurisdiction means the kinds of cases a court may hear. In this part we sort the Supreme Court\'s work into original, appellate and advisory jurisdiction, look at its power to review its own judgments, its role as a Court of Record and its power of judicial review, and finally meet the five writs that make Fundamental Rights real.',
    }),
    sl('diagram', 'The Court\'s main jurisdictions', {
      b: 'Original, writ, appellate and advisory, plus review and Court of Record.',
      v: vHub,
      n: 'This hub shows the Court\'s main kinds of work. Some cases begin in the Supreme Court itself: that is original jurisdiction, and writ petitions for Fundamental Rights also start here. Some come on appeal from High Courts: appellate jurisdiction. The President may seek its opinion: advisory jurisdiction. It can also review its own judgments, and it is a Court of Record.',
    }),
    sl('diagram', 'Original jurisdiction', {
      b: '**Article 131:** disputes between the **Union** and **States**, or between **States**, begin here.',
      v: vOrig,
      n: 'Original jurisdiction covers cases that start in the Supreme Court and nowhere else. Under Article one hundred and thirty-one, these are disputes between the Union and one or more States, between the Union and some States on one side and other States on the other, and between two or more States. As a federal umpire, the Court keeps the balance between the Union and the States.',
    }),
    sl('check', 'Quick check: what original means', {
      b: 'What does original jurisdiction mean?',
      chk: 'm_orig_meaning',
      n: 'Remember the meaning of original here. Where does such a case begin?',
    }),
    sl('diagram', 'Appellate jurisdiction', {
      b: 'Appeals from **High Courts**: constitutional, civil and criminal; and **special leave**.',
      v: vAppeal,
      n: 'Most cases reach the Supreme Court on appeal. Constitutional appeals come when a High Court certifies a substantial question about interpreting the Constitution. Civil appeals need a substantial question of general importance. In criminal cases, an appeal lies for example when a High Court reverses an acquittal and passes a death sentence. Under Article one hundred and thirty-six, the Court may also grant special leave to appeal from almost any court.',
    }),
    sl('example', 'Worked example 3: which jurisdiction?', {
      b: 'Sort four imagined matters.',
      bl: ['Does the case **begin** in the Supreme Court? Original.', 'Does it come **from a High Court**? Appellate.', 'Is the **President** asking a question? Advisory.', 'Is the Court looking at **its own** judgment? Review.'],
      v: vCases,
      n: 'Let us sort four imagined matters. Two States quarrelling over a mine on their border start in the Supreme Court, so that is original jurisdiction. A death sentence passed after a High Court reverses an acquittal comes up on appeal. A question from the President is advisory. And a party pointing out an obvious error in the Court\'s own judgment asks for review under Article one hundred and thirty-seven.',
    }),
    sl('diagram', 'Advisory jurisdiction', {
      b: '**Article 143:** only the **President** can ask; the Court\'s opinion **guides** but does not **bind** like a judgment.',
      v: vAdvisory,
      n: 'Sometimes the President needs legal advice before acting. Under Article one hundred and forty-three, the President may refer a question of law or fact of public importance to the Supreme Court. The Court hears the matter and gives its opinion. This opinion guides the government, but it is not a judgment in a dispute and does not bind in the same way.',
    }),
    sl('check', 'Quick check: who may ask?', {
      b: 'True or false: any citizen may seek an advisory opinion.',
      chk: 'tf_advisory_citizen',
      n: 'Only one person may make a reference for an advisory opinion. Can an ordinary citizen do it?',
    }),
    sl('diagram', 'Review, Court of Record and binding law', {
      b: 'Article **137** (review), **129** (Court of Record), **141** (law binding on all courts).',
      v: vRecord,
      n: 'Three more powers complete the picture. Under Article one hundred and thirty-seven, the Court may review its own judgment, for example to correct an obvious error. Under Article one hundred and twenty-nine, it is a Court of Record: its records are evidence and precedent, and it can punish for contempt. Under Article one hundred and forty-one, the law it declares binds all courts in India.',
    }),
    sl('diagram', 'Judicial review', {
      b: 'The power to declare laws and orders **void** if they violate the **Constitution**.',
      v: vJR,
      n: 'Judicial review is the power to test laws and government orders against the Constitution. When a law is challenged, the Court compares it with the Constitution. If it fits, it stands. If it takes away Fundamental Rights beyond what the Constitution allows, or if the Union or a State has gone beyond its powers, the Court declares it void to that extent. This makes the Court the guardian of the Constitution.',
    }),
    sl('check', 'Quick check: an error in a judgment', {
      b: 'Which power lets the Court look again at its own decision?',
      chk: 'm_review',
      n: 'The Court has delivered a judgment, but a party shows an obvious error in it. Which power can the Court use?',
    }),
    sl('diagram', 'The five writs', {
      b: '**Article 32** lets citizens go straight to the Supreme Court; the remedy is itself a **Fundamental Right**.',
      v: vWrits,
      n: 'Rights mean little without a way to enforce them. Article thirty-two lets a person go directly to the Supreme Court, and this remedy is itself a Fundamental Right. The Court may issue five writs. Habeas corpus brings a detained person before the court. Mandamus commands a public authority to do its duty. Prohibition and certiorari control lower courts. Quo warranto tests the right to hold a public office.',
    }),
    sl('diagram', 'Prohibition or certiorari?', {
      b: 'The difference is **timing**: before the decision, or after it.',
      v: vPC,
      n: 'Prohibition and certiorari both deal with lower courts and tribunals that go beyond their powers. The difference is timing. Prohibition is issued while the case is still pending, to stop the tribunal from going ahead. Certiorari is issued after the order is passed, to quash it. A simple way to remember: prohibition prevents, certiorari cures.',
    }),
    sl('example', 'Worked example 4: choose the writ', {
      b: 'Match the problem to the writ.',
      bl: ['Detention? **Habeas corpus**.', 'Duty refused? **Mandamus**.', 'Unqualified office-holder? **Quo warranto**.', 'Order already passed beyond powers? **Certiorari**.'],
      v: vChoose,
      n: 'Let us choose writs for four imagined problems. A labourer held by the police for a week without being produced before a magistrate needs habeas corpus. An officer refusing to register a birth needs mandamus. An unqualified person chairing a public board can be challenged by quo warranto. A tribunal that has already decided a case outside its powers can be corrected by certiorari.',
    }),
    sl('check', 'Quick check: how many writs?', {
      b: 'How many kinds of writs does Article 32 name?',
      chk: 'm_writ_name_count',
      n: 'Count the writs you have met in this part. How many are there?',
    }),
    sl('summary', 'Summary of Part 2', {
      bl: ['Original: Union and State disputes (Article 131).', 'Appellate: constitutional, civil and criminal appeals; special leave (Article 136).', 'Advisory: opinion to the President (Article 143).', 'Review (137), Court of Record (129), law binding on all courts (141), judicial review.', 'Writs under Article 32: habeas corpus, mandamus, prohibition, certiorari, quo warranto.'],
      v: vSum2,
      n: 'To sum up Part 2. Union and State disputes begin in the Supreme Court. Appeals come from High Courts, and the Court may grant special leave. Only the President may seek its advice. It can review its own judgments, is a Court of Record, and its law binds all courts. Judicial review guards the Constitution, and five writs under Article thirty-two enforce Fundamental Rights.',
    }),
    sl('exam-tips', 'Exam tips for Part 2', {
      bl: [
        'Only the **President** can seek an advisory opinion.',
        '**Prohibition** before a decision; **certiorari** after it.',
        'Do not confuse **review** of its own judgments with **judicial review** of laws.',
        'Give an **example** with each jurisdiction in 3-mark answers.',
        'Quote the **Article** where you can: 32, 131, 136, 137, 141, 143.',
      ],
      n: 'A few tips. Only the President can seek an advisory opinion. Prohibition comes before a decision and certiorari after it. Keep review of the Court\'s own judgments separate from judicial review of laws and orders. Give an example for each jurisdiction. And where you can, name the Article, because examiners reward precise answers.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'The Supreme Court — notes',
  sections: [
    {
      h: '1. Composition and qualifications',
      t: 1,
      b: `- Established by **Article 124**; **Chief Justice of India** and up to **${OTHER_JUDGES}** other judges (**${STRENGTH}** in all, as of 2024; number fixed by Parliament by law).\n- Sits in **Delhi** (or elsewhere as the Chief Justice decides with the President's approval).\n- **Qualifications:** citizen of India and either a **High Court judge for ${HC_JUDGE_YEARS} years**, or an **advocate of a High Court for ${ADVOCATE_YEARS} years**, or a **distinguished jurist** in the President's opinion.\n- **Tenure:** until **${RETIRE_AGE}**; may resign by writing to the President.`,
      terms: [['Distinguished jurist', 'An eminent legal scholar whom the President considers fit, even without service on the bench or at the bar.']],
      v: vComp,
      vs: [vQuals, vHier],
    },
    {
      h: '2. Appointment and removal',
      t: 1,
      b: '- **Appointment:** by the **President**; in practice on the recommendation of a **collegium** (Chief Justice and senior-most judges), a practice shaped by Supreme Court judgments in **1993** and **1998**. The **NJAC** (99th Amendment and law of 2014) was **struck down in 2015**. The senior-most judge is usually appointed Chief Justice.\n- **Removal:** only for **proved misbehaviour or incapacity**. Motion in a House, **inquiry committee**, then an **address** passed in **each House** by a **majority of its total membership** and **two-thirds of members present and voting**, in the same session; the **President** orders removal.',
      terms: [['Collegium', 'The Chief Justice of India and the senior-most judges, who recommend names for appointment.'], ['Address', 'A formal resolution of a House presented to the President.']],
      v: vAppoint,
      vs: [vRemove, vVotes],
    },
    {
      h: '3. Independence of the judiciary',
      t: 2,
      b: '- **Security of tenure** until 65; difficult removal.\n- **Salaries** charged on the **Consolidated Fund**; **cannot be reduced** after appointment except in a **financial emergency**.\n- **Article 121:** no discussion of a judge\'s conduct in Parliament except on a removal motion.\n- **Article 129:** power to **punish for contempt**.\n- **No practice** in any court in India after retirement.\n- **Article 50:** separation of the judiciary from the executive.',
      terms: [['Consolidated Fund of India', 'The main account of the Union government; expenditure charged on it is not voted on every year.'], ['Contempt of court', 'Disobeying or showing disrespect to a court in a way that lowers its authority.']],
      v: vIndep,
      vs: [vIndepTable],
    },
    {
      h: '4. Original, appellate and advisory jurisdiction',
      t: 3,
      b: '- **Original (Article 131):** Union and State disputes and disputes between States begin here.\n- **Appellate:** **constitutional** (certificate of a substantial question about the Constitution), **civil** (substantial question of general importance), **criminal** (for example, death sentence after a High Court reverses an acquittal); **special leave (Article 136)** from any court or tribunal except armed forces tribunals.\n- **Advisory (Article 143):** the **President** may refer a question of law or fact of public importance; the opinion **guides** but does not bind like a judgment.',
      terms: [['Jurisdiction', 'The authority of a court to hear and decide particular kinds of cases.'], ['Special leave', 'Permission given by the Supreme Court itself to appeal.']],
      v: vHub,
      vs: [vOrig, vAppeal, vAdvisory],
    },
    {
      h: '5. Review, judicial review and Court of Record',
      t: 4,
      b: '- **Review (Article 137):** the Court may reconsider its **own** judgment, e.g. for an error apparent on the record.\n- **Judicial review:** the power to declare **laws and executive actions void** if they violate the **Constitution**; protects **Fundamental Rights** and the **federal** division of powers.\n- **Court of Record (Article 129):** records are **evidence and precedent**; power to **punish for contempt**.\n- **Article 141:** law declared by the Supreme Court **binds all courts** in India.',
      terms: [['Judicial review', 'Testing laws and orders against the Constitution and striking down those that conflict with it.'], ['Court of Record', 'A court whose records are permanent evidence and which can punish for contempt.']],
      v: vJR,
      vs: [vRecord],
    },
    {
      h: '6. Writs for Fundamental Rights',
      t: 5,
      b: '- **Article 32:** right to move the Supreme Court for enforcing Fundamental Rights; itself a **Fundamental Right**.\n- **Habeas corpus:** produce a detained person.\n- **Mandamus:** command a public authority to do its duty.\n- **Prohibition:** stop a lower court **before** it exceeds its jurisdiction.\n- **Certiorari:** quash an order **already passed** without jurisdiction.\n- **Quo warranto:** test the right to hold a **public office**.',
      terms: [['Writ', 'A written order of a superior court commanding or forbidding an action.']],
      v: vWrits,
      vs: [vPC, vChoose],
    },
  ],
  tips: '**Common mistakes**\n- Writing "impeachment" for the removal of a judge, or giving "violation of the Constitution" as the ground.\n- Giving only one of the two conditions of the special majority.\n- Saying any citizen can seek an advisory opinion.\n- Mixing up prohibition (before) and certiorari (after).\n- Confusing review of the Court\'s own judgments with judicial review.\n\n**How marks are usually awarded**\n- 1-mark items: one correct option or term.\n- 2 marks: two distinct points.\n- 10-mark questions in 3 + 3 + 4 parts: one point per mark; the last part often asks for an explanation, a comparison or a judgement.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Article that establishes the Supreme Court', '**Article 124**.', 'fact', 1],
  ['Sanctioned strength (as of 2024)', `Chief Justice + up to **${OTHER_JUDGES}** others = **${STRENGTH}**.`, 'fact', 1],
  ['Who fixes the number of judges?', '**Parliament**, by law.', 'fact', 1],
  ['Three routes to the Supreme Court bench', `High Court judge ${HC_JUDGE_YEARS} years; High Court advocate ${ADVOCATE_YEARS} years; distinguished jurist.`, 'fact', 1],
  ['Retirement age of a Supreme Court judge', `**${RETIRE_AGE}**.`, 'fact', 1],
  ['Who appoints the judges?', 'The **President**, on the collegium\'s recommendation in practice.', 'fact', 1],
  ['Collegium', 'Chief Justice and senior-most judges who recommend names.', 'definition', 1],
  ['NJAC', 'Commission created in 2014; **struck down in 2015**.', 'fact', 1],
  ['Grounds for removing a judge', '**Proved misbehaviour or incapacity**.', 'fact', 1],
  ['Majority for removal', 'In each House: majority of total membership **and** two-thirds of members present and voting.', 'exam-tip', 1],
  ['Salaries of judges are charged on', 'The **Consolidated Fund of India**.', 'fact', 2],
  ['When may judges\' salaries be cut?', 'Only during a **financial emergency**.', 'fact', 2],
  ['Article 121', 'No discussion of a judge\'s conduct in Parliament except on a removal motion.', 'fact', 2],
  ['Retired Supreme Court judge and legal practice', 'Cannot plead in any court in India.', 'fact', 2],
  ['Article 50', 'Separation of the judiciary from the executive (Directive Principle).', 'fact', 2],
  ['Original jurisdiction', 'Cases that **begin** in the Supreme Court: Union and State disputes (Article 131).', 'definition', 3],
  ['Appellate jurisdiction', 'Appeals from High Courts: constitutional, civil, criminal; special leave.', 'definition', 3],
  ['Article 136', 'Special leave to appeal from any court or tribunal except armed forces tribunals.', 'fact', 3],
  ['Advisory jurisdiction', '**Article 143**: opinion to the **President** on public questions.', 'definition', 3],
  ['Is an advisory opinion binding?', 'It guides; not binding like a judgment.', 'exam-tip', 3],
  ['Article 137', 'Review of its **own** judgments.', 'fact', 4],
  ['Judicial review', 'Declaring laws and orders void if they violate the Constitution.', 'definition', 4],
  ['Court of Record (Article 129)', 'Records are evidence and precedent; power to punish contempt.', 'concept', 4],
  ['Article 141', 'Supreme Court\'s law binds **all courts** in India.', 'fact', 4],
  ['Article 32', 'Right to move the Supreme Court for Fundamental Rights; itself a Fundamental Right.', 'fact', 5],
  ['Habeas corpus', 'Produce a detained person before the court.', 'definition', 5],
  ['Mandamus', 'Command a public authority to perform its duty.', 'definition', 5],
  ['Prohibition vs certiorari', 'Prohibition **before** a decision; certiorari **after**, to quash.', 'exam-tip', 5],
  ['Quo warranto', '"By what authority": tests the right to a public office.', 'definition', 5],
  ['How many writs in Article 32?', '**Five**.', 'fact', 5],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-10-history-civics-chapter-test-short',
  title: 'Chapter test (short) — The Supreme Court',
  duration: 30,
  sections: [
    { id: 'I', title: 'Part I — Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1–6 carry 1 mark each; questions 7 and 8 carry 2 marks each.', items: ['m_qual_advocate', 'm_salary_fund', 'm_orig_case', 'm_habeas', 'm_jr_meaning', 'ar_tenure', 's_quals_three', 's_hc_vs_sc_writs'] },
    { id: 'II', title: 'Part II — Structured question (10 marks)', instr: 'Attempt any ONE of the two questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 1, keys: ['l_composition', 'l_writs'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-10-history-civics-chapter-test-long',
  title: 'Chapter test (long) — The Supreme Court',
  duration: 60,
  sections: [
    { id: 'I', title: 'Part I — Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1–10 carry 1 mark each; questions 11–15 carry 2 marks each.', items: ['m_appoint', 'm_remove_vote', 'm_salary_cut', 'm_contempt', 'm_appeal_criminal', 'm_advisory_who', 'm_record', 'm_mandamus', 'm_quo', 'ar_jr', 's_appoint_how', 's_indep_two', 's_orig_three', 's_record_two', 's_cert_prohib'] },
    { id: 'II', title: 'Part II — Structured questions (20 marks)', instr: 'Attempt any TWO of the three questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 2, keys: ['l_independence', 'l_jurisdiction', 'l_advisory_record'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of icse-10-history-civics-ch05 only (composition, qualifications, appointment and removal; independence; original, appellate and advisory jurisdiction; review, judicial review and Court of Record; writs)',
    originality: 'every scenario, diary, report and note is imagined and written by SOYL (labelled); no textbook text or exercise and no specimen or board-paper item reused (D-036); no real person quoted; no judge named; no judgment evaluated',
    data: `removal votes computed: majority of total ${majorityOfTotal(LS)} of ${LS} and ${majorityOfTotal(RS)} of ${RS}; two-thirds of ${VOTE_LS.present} present is ${twoThirdsPresent(VOTE_LS.present)} and of ${VOTE_RS.present} is ${twoThirdsPresent(VOTE_RS.present)}; the Lok Sabha example passes and the Rajya Sabha example fails`,
    facts: `Article 124: Chief Justice and up to ${OTHER_JUDGES} other judges (${STRENGTH}, as of 2024; 2019 Act); qualifications citizen plus High Court judge ${HC_JUDGE_YEARS} years, advocate ${ADVOCATE_YEARS} years or distinguished jurist; retirement at ${RETIRE_AGE}; collegium practice from the 1993 and 1998 judgments; NJAC struck down in 2015; removal for proved misbehaviour or incapacity by address in each House (majority of total membership and two-thirds present and voting); Articles 50, 121, 125, 129, 131, 136, 137, 141, 143 and 32; salary cut only in a financial emergency; no practice after retirement`,
    gate: 'schema, content lint (lintExemplar), deterministic verify, originality pre-check and the editorial counts run clean on this chapter',
  },
});
