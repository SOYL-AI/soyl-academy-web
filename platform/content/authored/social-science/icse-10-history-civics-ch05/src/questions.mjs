// ICSE 10 History & Civics, ch05 The Supreme Court — question bank.
// Every scenario, petitioner, diary and report is imagined and written by SOYL and labelled as imagined; no textbook
// text, box or exercise and no specimen or board-paper item is reused (D-036); no real person is quoted, no judge is
// named and no specific judgment is evaluated. Facts are stable constitutional provisions (Articles 32, 50, 121,
// 124-125, 129, 131-137, 141, 143, 360) and broadly stated history (Judges cases, NJAC 2015, the 2019 strength Act).
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child, Svg } from '../../icse-10-history-civics-ch01/src/lib.mjs';

const S2 = [25, 45];
const S3 = [40, 70];
const L10 = [120, 220];
const IMAG = '*(Imagined document written by SOYL for practice; the people and cases in it are not real.)*';

// ---------------------------------------------------------------- figures used in items (asserted)
export const OTHER_JUDGES = 33; // maximum number of judges other than the Chief Justice (2019 Act)
export const STRENGTH = OTHER_JUDGES + 1; // sanctioned strength including the Chief Justice of India
assert.equal(STRENGTH, 34);
export const RETIRE_AGE = 65;
export const HC_JUDGE_YEARS = 5;
export const ADVOCATE_YEARS = 10;
export const LS = 543;
export const RS = 245;
export const majorityOfTotal = (n) => Math.floor(n / 2) + 1; // more than half of the total membership
export const twoThirdsPresent = (p) => Math.ceil((2 * p) / 3); // at least two-thirds of members present and voting
assert.equal(majorityOfTotal(LS), 272);
assert.equal(majorityOfTotal(RS), 123);
assert.equal(twoThirdsPresent(480), 320);
assert.equal(twoThirdsPresent(210), 140);
// Imagined removal votes used in an item: both conditions must hold in each House.
export const VOTE_LS = { present: 480, yes: 330 };
export const VOTE_RS = { present: 210, yes: 131 };
export const passes = (v, total) => v.yes >= majorityOfTotal(total) && v.yes >= twoThirdsPresent(v.present);
assert.equal(passes(VOTE_LS, LS), true); // 330 >= 272 and 330 >= 320
assert.equal(passes(VOTE_RS, RS), false); // 131 >= 123 but 131 < 140

/** Hierarchy of courts as boxes (theme colours only). */
export function hierarchySvg(alt, caption) {
  const s = new Svg(640, 300);
  const rows = [
    ['Supreme Court of India', 'Apex court, New Delhi', 245, 18, 'accent'],
    ['High Courts', 'At the top of the judiciary in a State', 245, 98, 'blue'],
    ['District and Sessions Courts', 'Civil and criminal cases of a district', 245, 178, 'green'],
  ];
  rows.forEach(([a, b, x, y, col]) => {
    s.rect(x - 120, y, 290, 56, { rx: 8, fill: col, fillOpacity: 0.2, color: col, sw: 1.6 });
    s.text(x + 25, y + 20, a, { size: 13, bold: true });
    s.text(x + 25, y + 40, b, { size: 11 });
  });
  s.arrow(270, 176, 270, 156, { sw: 1.4 });
  s.arrow(270, 96, 270, 76, { sw: 1.4 });
  s.text(470, 128, 'Appeals go up', { anchor: 'start', size: 11, muted: true });
  s.text(470, 146, 'the ladder', { anchor: 'start', size: 11, muted: true });
  s.text(320, 266, 'Lower courts below the district level are not shown.', { size: 11, muted: true });
  return s.visual(alt, caption);
}

/** The Supreme Court's jurisdictions as a hub diagram. */
export function hubSvg(alt, caption) {
  const s = new Svg(700, 330);
  s.rect(255, 135, 190, 56, { rx: 10, fill: 'accent', fillOpacity: 0.25, color: 'accent', sw: 2 });
  s.text(350, 157, 'Supreme Court', { size: 14, bold: true });
  s.text(350, 177, 'of India', { size: 12 });
  const spokes = [
    ['Original', 'Union and State disputes', 20, 20],
    ['Writ', 'Fundamental Rights (Art. 32)', 480, 20],
    ['Appellate', 'Appeals from High Courts', 20, 250],
    ['Advisory', 'Opinion to the President (Art. 143)', 480, 250],
  ];
  spokes.forEach(([a, b, x, y]) => {
    s.rect(x, y, 200, 56, { rx: 8, fill: 'blue', fillOpacity: 0.15, color: 'blue', sw: 1.4 });
    s.text(x + 100, y + 20, a, { size: 13, bold: true });
    s.text(x + 100, y + 40, b, { size: 11 });
    const cx = x + 100;
    const cy = y < 100 ? y + 58 : y - 2;
    s.line(cx, cy, 350, y < 100 ? 133 : 193, { sw: 1.3, color: 'muted' });
  });
  s.text(350, 312, 'Also: review of its own judgments (Art. 137) and Court of Record (Art. 129)', { size: 11, muted: true });
  return s.visual(alt, caption);
}

// ================================================================ t01 Composition, qualifications, appointment, removal
Q('m_strength', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'What is the sanctioned strength of the Supreme Court of India, counting the Chief Justice (as of 2024)?',
  opts: [String(STRENGTH), '31', '25', '45'],
  sol: `Parliament fixes the number of judges by law; since a 2019 Act the Court may have the Chief Justice and up to ${OTHER_JUDGES} other judges, so ${STRENGTH} in all. Thirty-one was the earlier figure; 25 and 45 are not the present strength.`,
}));
Q('m_who_fixes', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'A student asks who has the power to increase the number of judges of the Supreme Court. Which answer is correct?',
  opts: ['Parliament, by passing a law', 'The Chief Justice, by an order of the Court', 'The President, by an ordinance only', 'The States, by a resolution of their Assemblies'],
  sol: 'The Constitution allows Parliament to prescribe the number of judges by law, which is how the strength has been raised over the years. The Chief Justice and the States cannot change it, and it is not done only by ordinance.',
}));
Q('m_qual_advocate', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Advocate Meenakshi, an imagined lawyer, has practised for twelve years in a High Court. Is she qualified to be appointed a judge of the Supreme Court?',
  opts: [
    `Yes, because ${ADVOCATE_YEARS} years as an advocate of a High Court is one of the qualifications`,
    'No, because only serving High Court judges can be appointed',
    'No, because she must first serve fifteen years as a district judge',
    'Yes, but only as an acting judge for one year',
  ],
  sol: `A citizen who has been an advocate of a High Court for at least ${ADVOCATE_YEARS} years qualifies (with citizenship). Being a High Court judge for ${HC_JUDGE_YEARS} years, or a distinguished jurist in the President's opinion, are the other routes. The other options invent conditions.`,
}));
Q('m_jurist', mcq({
  t: 1, d: 2, c: 'recall',
  stem: 'Apart from service as a High Court judge or as an advocate, which third route to the Supreme Court bench does the Constitution allow?',
  opts: [
    'Being a distinguished jurist in the opinion of the President',
    'Being a member of Parliament for ten years',
    'Being nominated by a State Governor',
    'Passing a special examination held by the Court',
  ],
  sol: 'A citizen who is, in the opinion of the President, a distinguished jurist may also be appointed. Membership of Parliament, nomination by a Governor and an examination are not routes to the Court.',
}));
Q('m_retire', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Up to what age does a judge of the Supreme Court hold office?',
  opts: [`${RETIRE_AGE} years`, '62 years', '60 years', '70 years'],
  sol: `Supreme Court judges retire on completing ${RETIRE_AGE}. Sixty-two is the retirement age for High Court judges; sixty and seventy are not constitutional figures here.`,
}));
Q('m_appoint', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Under the Constitution, which authority formally appoints the judges of the Supreme Court?',
  opts: ['The President', 'The Prime Minister', 'The Speaker of the Lok Sabha', 'The Union Law Minister'],
  sol: 'Judges are appointed by the President by warrant under hand and seal. In practice the recommendations come from a collegium of senior judges; the Prime Minister, the Speaker and the Law Minister do not appoint judges themselves.',
}));
Q('m_collegium', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'The practice by which a group of the senior-most judges recommends names for appointment to the Supreme Court grew out of which development?',
  opts: [
    'Judgments of the Supreme Court in the 1990s interpreting "consultation" (the Second and Third Judges cases)',
    'A constitutional amendment passed in 1950',
    'A resolution of the Rajya Sabha in 1985',
    'An order of the Election Commission',
  ],
  sol: 'The collegium practice was shaped by Supreme Court judgments in 1993 and 1998 (often called the Second and Third Judges cases). It was not created by an amendment in 1950, a Rajya Sabha resolution or the Election Commission.',
}));
Q('m_njac', mcq({
  t: 1, d: 3, c: 'recall',
  stem: 'A body proposed by a 2014 amendment to recommend appointments of judges was struck down by the Supreme Court in 2015. What was it called?',
  opts: ['The National Judicial Appointments Commission', 'The Union Public Service Commission', 'The Finance Commission', 'The National Human Rights Commission'],
  sol: 'The National Judicial Appointments Commission (NJAC) was created by the 99th Amendment and a law of 2014, and the Court held them invalid in 2015, so the collegium practice continued. The other commissions have unrelated roles.',
}));
Q('m_remove_ground', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'On which grounds can a judge of the Supreme Court be removed from office?',
  opts: ['Proved misbehaviour or incapacity', 'Delivering a judgment against the government', 'Disagreement with the Chief Justice', 'Reaching 60 years of age'],
  sol: 'The only grounds are proved misbehaviour or incapacity. Judgments against the government or disagreements cannot be grounds, and retirement is at 65, not removal at 60.',
}));
Q('m_remove_vote', mcq({
  t: 1, d: 3, c: 'application',
  stem: `In an imagined Lok Sabha of ${LS} members, ${VOTE_LS.present} members are present and voting on a motion to remove a judge, and ${VOTE_LS.yes} vote in favour. Does the motion meet the required majority in this House?`,
  opts: [
    `Yes: ${VOTE_LS.yes} is more than half of ${LS} and at least two-thirds of ${VOTE_LS.present}`,
    `No: it needs two-thirds of the total membership, that is 362`,
    `No: it needs a simple majority of members present only`,
    `Yes: any majority of members present is enough`,
  ],
  sol: `The address must be supported by a majority of the total membership (at least ${majorityOfTotal(LS)} of ${LS}) and by two-thirds of members present and voting (at least ${twoThirdsPresent(VOTE_LS.present)} of ${VOTE_LS.present}). ${VOTE_LS.yes} meets both. Two-thirds of the total membership is the rule for impeaching the President, not for removing a judge.`,
}));
Q('tf_rs_vote', tf({
  t: 1, d: 4, c: 'analysis', ans: false,
  stem: `True or false? In an imagined Rajya Sabha of ${RS} members, a motion to remove a judge with ${VOTE_RS.yes} votes in favour and ${VOTE_RS.present} members present and voting meets the required majority.`,
  sol: `It fails. ${VOTE_RS.yes} is more than half of the total membership (${majorityOfTotal(RS)} needed), but two-thirds of ${VOTE_RS.present} members present and voting is ${twoThirdsPresent(VOTE_RS.present)}, and ${VOTE_RS.yes} is less than that. Both conditions must hold.`,
}));
Q('fb_retire', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'A judge of the Supreme Court retires on completing the age of ___ years.',
  acc: [['65', 'sixty-five']],
  sol: 'The retirement age is 65 (sixty-five).',
}));
Q('ord_remove', ord({
  t: 1, d: 2, c: 'understanding', marks: 2,
  stem: 'Put the steps for removing a Supreme Court judge in the correct order.',
  items: [
    'A motion is moved in a House of Parliament and admitted by the presiding officer',
    'A committee investigates the charge of misbehaviour or incapacity',
    'Each House passes an address by a majority of its total membership and two-thirds of members present and voting',
    'The address is presented to the President, who orders the removal',
  ],
  sol: 'Motion and admission; investigation by a committee under the Judges (Inquiry) Act; passing of the address in both Houses in the same session with the special majority; order of the President.',
}));
Q('s_quals_three', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State the qualifications a citizen needs to be appointed a judge of the Supreme Court.',
  model: `The person must be a **citizen of India** and must have been either a **High Court judge for ${HC_JUDGE_YEARS} years**, or an **advocate of a High Court for ${ADVOCATE_YEARS} years**, or a **distinguished jurist** in the President's opinion.`,
  sol: 'Citizenship plus any one of the three routes.',
  scheme: [['Citizen of India', 1], ['One of the three routes, correctly stated', 1]],
}));
Q('s_appoint_how', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'How are the Chief Justice and the other judges of the Supreme Court appointed in practice?',
  model: 'The **President** appoints them. In practice the names are **recommended by a collegium** of the Chief Justice and the senior-most judges, and the **senior-most judge** is usually appointed **Chief Justice**.',
  sol: 'Formal appointment by the President; recommendation by the collegium; seniority convention for the Chief Justice.',
  scheme: [['Appointed by the President', 1], ['Collegium recommendation or seniority convention', 1]],
}));
Q('s3_removal', short({
  t: 1, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Explain the procedure for removing a judge of the Supreme Court, stating the grounds and the majority required.',
  model: '1. The grounds are **proved misbehaviour or incapacity**.\n2. A motion is moved in **either House**; after an **inquiry committee** finds the charge proved, **each House** must pass an **address** by a **majority of its total membership** and **two-thirds of members present and voting**, in the same session.\n3. The address is presented to the **President**, who then **orders the removal**.',
  sol: 'Grounds; motion, inquiry and special majority in both Houses; the President\'s order.',
  scheme: [['Grounds', 1], ['Inquiry and special majority in each House', 1], ['President orders removal', 1]],
}));

// ================================================================ t02 Independence of the judiciary
Q('m_salary_fund', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Why are the salaries of Supreme Court judges charged on the Consolidated Fund of India?',
  opts: [
    'So that they are not voted on by Parliament every year, which protects the judges from pressure',
    'So that judges can raise their own salaries',
    'So that the States pay the judges',
    'So that judges are paid only when the budget is passed',
  ],
  sol: 'Expenditure charged on the Consolidated Fund is not subject to the annual vote of Parliament, so the judges do not depend on the goodwill of the legislature or the executive. Judges cannot fix their own pay, the States do not pay them, and payment does not wait for the budget vote.',
}));
Q('m_salary_cut', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'An imagined government wants to reduce the salary of a serving Supreme Court judge because it dislikes a recent decision. What does the Constitution say?',
  opts: [
    'Salaries cannot be varied to the disadvantage of a judge after appointment, except during a financial emergency',
    'Salaries can be cut at any time by an order of the Law Ministry',
    'Salaries can be cut only by the Chief Justice',
    'Salaries can be cut if the Lok Sabha passes a simple resolution',
  ],
  sol: 'A judge\'s salary and allowances cannot be changed to the judge\'s disadvantage after appointment; the only exception is a financial emergency under Article 360. The other options would make judges dependent on the executive or legislature.',
}));
Q('m_practise', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'After retirement, a former judge of the Supreme Court wishes to appear as a lawyer in a District Court. What is the constitutional position?',
  opts: [
    'A retired Supreme Court judge cannot plead or act in any court or before any authority in India',
    'He may appear in any court except the Supreme Court',
    'He may appear only in High Courts',
    'He may appear anywhere after five years',
  ],
  sol: 'A person who has held office as a Supreme Court judge may not plead or act in any court or before any authority within India. This keeps sitting judges from being tempted by future practice. The other options invent exceptions.',
}));
Q('m_discuss', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'When may Parliament discuss the conduct of a judge of the Supreme Court in the discharge of judicial duties?',
  opts: [
    'Only on a motion for presenting an address for the judge\'s removal',
    'During every Question Hour',
    'Whenever a minister requests it',
    'Never, not even for removal',
  ],
  sol: 'Article 121 bars discussion of a judge\'s conduct in Parliament except on a motion for removal. Question Hour or a minister\'s request do not open such debate, and removal proceedings are the one allowed occasion.',
}));
Q('m_contempt', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'An imagined newspaper repeatedly publishes false claims that a bench of the Supreme Court took bribes, without any evidence. Which power of the Court can it use to protect its authority?',
  opts: ['Power to punish for contempt of court', 'Power to dissolve the Lok Sabha', 'Power to issue an ordinance', 'Power to impeach the editor'],
  sol: 'As a Court of Record, the Supreme Court can punish for contempt of itself, which protects its dignity and authority. Dissolving the Lok Sabha and issuing ordinances belong to the President; impeachment applies only to the President.',
}));
Q('m_art50', mcq({
  t: 2, d: 3, c: 'recall',
  stem: 'Which part of the Constitution directs the State to separate the judiciary from the executive in the public services of the State?',
  opts: ['The Directive Principles of State Policy (Article 50)', 'The Fundamental Duties', 'The Seventh Schedule', 'The Preamble'],
  sol: 'Article 50, a Directive Principle, asks the State to separate the judiciary from the executive. The Fundamental Duties, the Seventh Schedule and the Preamble do not contain this direction.',
}));
Q('ar_tenure', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'Supreme Court judges can decide cases against the government without fear of losing their jobs.',
  r: 'Judges hold office until the age of 65 and can be removed only by a special procedure involving both Houses of Parliament.',
  sol: 'Both statements are true, and R explains A: security of tenure, with removal only by a difficult parliamentary procedure on proved misbehaviour or incapacity, frees judges to decide independently.',
}));
Q('ar_salary', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'The salaries of Supreme Court judges are protected from cuts during their term, except during a financial emergency.',
  r: 'Parliament votes on the judges\' salaries every year when it passes the budget.',
  sol: 'A is true. R is false: the salaries are charged on the Consolidated Fund of India and are not put to the annual vote of Parliament.',
}));
Q('tf_minister_judge', tf({
  t: 2, d: 2, c: 'application', ans: false,
  stem: 'True or false? Under the Constitution, a minister may direct a Supreme Court judge on how to decide a pending case if the case involves the government.',
  sol: 'False. The judiciary is independent of the executive; no minister can direct a judge, and the separation of the judiciary from the executive is part of the constitutional scheme.',
}));
Q('s_indep_two', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Mention two provisions concerning the pay and service of Supreme Court judges that keep them independent of the government.',
  model: '1. Their **salaries are charged on the Consolidated Fund** and **cannot be reduced** after appointment (except in a financial emergency).\n2. They have **security of tenure** until **65** and can be removed only by a **special procedure** in Parliament.',
  sol: 'Any two: salary protection, tenure, difficult removal, no practice after retirement.',
  scheme: [['First provision', 1], ['Second provision', 1]],
}));
Q('s_no_practice', short({
  t: 2, d: 2, c: 'analysis', marks: 2, wl: S2,
  stem: 'Explain how the ban on legal practice after retirement helps keep sitting judges impartial.',
  model: 'A judge **cannot hope to earn later** by appearing for **clients or the government**, so there is **no temptation** to please future clients or officials **while deciding cases** today.',
  sol: 'Link the ban to the absence of temptation during service.',
  scheme: [['No later practice', 1], ['Removes temptation during service', 1]],
}));
Q('s3_indep_four', short({
  t: 2, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'An imagined debating club argues that judges in India are free to decide cases fairly. Give three constitutional provisions they can cite to support this view.',
  model: '1. **Security of tenure:** judges serve until **65** and are removed only on **proved misbehaviour or incapacity** by a special majority of **both Houses**.\n2. **Financial security:** salaries are **charged on the Consolidated Fund** and **cannot be cut** after appointment except in a financial emergency.\n3. **Protection of conduct and authority:** Parliament **cannot discuss** a judge\'s conduct except during removal, and the Court can **punish for contempt**.',
  sol: 'Three distinct provisions, each explained briefly.',
  scheme: [['Tenure and removal', 1], ['Salary protection', 1], ['Another provision (no discussion, contempt, no practice, separation)', 1]],
}));

// ================================================================ t03 Original, appellate and advisory jurisdiction
Q('m_orig_case', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Two imagined States, Uttarvan and Dakshinpur, disagree about which of them may collect a tax on goods crossing their common border. In which jurisdiction would the Supreme Court hear this dispute directly?',
  opts: ['Original jurisdiction', 'Appellate jurisdiction', 'Advisory jurisdiction', 'Revisory jurisdiction'],
  sol: 'Disputes between two or more States (or between the Union and States) are heard by the Supreme Court in its original jurisdiction under Article 131: the case starts there. Appellate means hearing an appeal, advisory means giving an opinion to the President, and revisory means reviewing its own judgment.',
  assets: [hubSvg('Hub diagram: the Supreme Court in the centre with four jurisdictions around it — original (Union and State disputes), writ (Fundamental Rights, Article 32), appellate (appeals from High Courts) and advisory (opinion to the President, Article 143); a note adds review of its own judgments and Court of Record', 'The Court\'s main jurisdictions.')],
}));
Q('m_orig_meaning', mcq({
  t: 3, d: 1, c: 'recall',
  stem: 'What does "original jurisdiction" of the Supreme Court mean?',
  opts: [
    'Cases that begin in the Supreme Court itself',
    'Cases that come to it on appeal from lower courts',
    'Questions referred to it by the President for its opinion',
    'Cases in which it reconsiders its own earlier judgment',
  ],
  sol: 'Original jurisdiction covers cases that can be started directly in the Supreme Court. The other options describe appellate, advisory and review powers.',
}));
Q('m_appeal_criminal', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'A High Court reverses the acquittal of an imagined accused and sentences him to death. To which court can he appeal, and under which kind of jurisdiction?',
  opts: [
    'The Supreme Court, under its appellate jurisdiction in criminal cases',
    'The President, under the original jurisdiction of the High Court',
    'A District Court, under its advisory jurisdiction',
    'The Lok Sabha, under its judicial powers',
  ],
  sol: 'Where a High Court reverses an acquittal and passes a death sentence, an appeal lies to the Supreme Court as of right in its criminal appellate jurisdiction. The President has mercy powers, not appellate jurisdiction; District Courts are below the High Court; the Lok Sabha does not hear criminal appeals.',
}));
Q('m_special_leave', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'Under Article 136, the Supreme Court may grant special leave to appeal against a judgment of almost any court or tribunal in India. Which body is outside this power?',
  opts: ['A court or tribunal of the armed forces', 'A High Court', 'A District Court', 'A tax tribunal'],
  sol: 'Special leave to appeal can be granted against any court or tribunal except those constituted under laws relating to the armed forces. High Courts, District Courts and tax tribunals are within its reach.',
}));
Q('m_advisory_who', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'Who can seek the advisory opinion of the Supreme Court under Article 143?',
  opts: ['The President', 'Any citizen', 'Any State Governor', 'The Speaker of the Lok Sabha'],
  sol: 'Only the President may refer a question of law or fact of public importance to the Supreme Court for its opinion. Citizens, Governors and the Speaker have no such power.',
}));
Q('m_advisory_binding', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'An imagined President refers a question about a proposed law to the Supreme Court and receives its opinion. Which statement about that opinion is correct?',
  opts: [
    'It guides the President but is not binding in the way a judgment is',
    'It becomes a law as soon as it is published',
    'It must be approved by the Lok Sabha before it is given',
    'It can be given only after the law is passed',
  ],
  sol: 'An advisory opinion under Article 143 is advice; it is not a judgment in a dispute and does not bind the President in the way a decision binds parties. It does not become law, needs no Lok Sabha approval, and can be sought on a proposed measure.',
}));
Q('m_appeal_const', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'A High Court certifies that a case before it involves a substantial question of law about the interpretation of the Constitution. Which appeal does this certificate allow?',
  opts: ['An appeal to the Supreme Court in a constitutional case', 'An appeal to the President for mercy', 'A reference to the Election Commission', 'A fresh trial in a District Court'],
  sol: 'Such a certificate opens an appeal to the Supreme Court in its constitutional appellate jurisdiction. Mercy, the Election Commission and fresh trials are unrelated.',
}));
Q('ar_original', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'A dispute between the Union and a State can be taken directly to the Supreme Court.',
  r: 'The Supreme Court can hear appeals in civil cases from the High Courts.',
  sol: 'Both statements are true, but R does not explain A. A rests on the original jurisdiction under Article 131; R is about appellate jurisdiction, which is a different power.',
}));
Q('ar_advisory', ar({
  t: 3, d: 2, c: 'analysis', verdict: 'A-false-R-true',
  a: 'A private company can ask the Supreme Court for an advisory opinion on a new tax.',
  r: 'Under Article 143 the President may refer a question of law or fact of public importance to the Supreme Court.',
  sol: 'A is false: only the President can seek an advisory opinion. R is true and states that rule.',
}));
Q('mt_juris', match({
  t: 3, d: 2, c: 'application',
  stem: 'Match each imagined matter with the jurisdiction under which the Supreme Court deals with it.',
  pairs: [
    ['Two States dispute a river-bank boundary road', 'Original jurisdiction'],
    ['A civil suit lost in a High Court is taken further', 'Appellate jurisdiction'],
    ['The President asks whether a proposed law is valid', 'Advisory jurisdiction'],
    ['The Court reconsiders its own earlier judgment', 'Revisory (review) jurisdiction'],
  ],
  sol: 'Disputes between States begin in the Supreme Court (original); appeals from High Courts are appellate; the President\'s reference is advisory; reconsidering its own judgment is review under Article 137.',
}));
Q('s_orig_three', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Name the kinds of disputes that fall within the original jurisdiction of the Supreme Court.',
  model: 'Disputes **between the Union and one or more States**; between the **Union and some States on one side and other States** on the other; and **between two or more States**.',
  sol: 'The three combinations of Union and State parties under Article 131.',
  scheme: [['Union and State(s)', 1], ['State versus State (or mixed sides)', 1]],
}));
Q('s_appellate_two', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Name two kinds of cases that can reach the Supreme Court under its appellate jurisdiction.',
  model: '1. **Constitutional cases**, on a certificate that a **substantial question about the Constitution** is involved.\n2. **Criminal cases**, for example where a High Court **reverses an acquittal** and passes a **death sentence**. (Also civil cases and appeals by **special leave**.)',
  sol: 'Any two of constitutional, civil, criminal and special-leave appeals with a brief qualifier.',
  scheme: [['First kind with qualifier', 1], ['Second kind with qualifier', 1]],
}));
Q('s3_advisory', short({
  t: 3, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain the advisory jurisdiction of the Supreme Court and why it is useful to the President.',
  model: '1. Under **Article 143**, the **President** may refer a **question of law or fact of public importance** to the Supreme Court.\n2. The Court considers it and **gives its opinion**, which **guides** the government but does **not bind** it like a judgment.\n3. It is useful because the President and ministers can **check the legal position before acting**, avoiding later disputes about **constitutional validity**.',
  sol: 'Meaning, nature of the opinion, and usefulness.',
  scheme: [['Article 143 and who refers', 1], ['Opinion and its nature', 1], ['Usefulness', 1]],
}));

// ================================================================ t04 Revisory jurisdiction, judicial review, Court of Record
Q('m_review', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'After a decision, an imagined party points out an error apparent on the face of the record and asks the Supreme Court to look at its own judgment again. Which power does the Court use?',
  opts: ['Its power to review its own judgments (Article 137)', 'Its advisory power (Article 143)', 'Its original jurisdiction (Article 131)', 'Its power to issue a writ of quo warranto'],
  sol: 'Article 137 lets the Supreme Court review its own judgments or orders, for example to correct an obvious error. Advisory and original jurisdiction and quo warranto do not reopen its own decisions.',
}));
Q('m_jr_meaning', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'What is meant by the judicial review power of the Supreme Court?',
  opts: [
    'The power to examine laws and executive orders and declare them void if they violate the Constitution',
    'The power to make new laws when Parliament is not in session',
    'The power to appoint ministers',
    'The power to review the budget every year',
  ],
  sol: 'Judicial review lets the Court test laws and orders against the Constitution and strike down those that conflict with it. Making laws, appointing ministers and reviewing the budget are not judicial functions.',
}));
Q('m_jr_case', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'An imagined State passes a law that forbids people of one religion from buying land anywhere in the State. A citizen challenges it. What can the Supreme Court do if it finds the law against the Fundamental Rights?',
  opts: [
    'Declare the law unconstitutional and void, using its power of judicial review',
    'Only advise the Governor to reconsider the law',
    'Ask the Lok Sabha to vote on whether the law is fair',
    'Do nothing, because State laws cannot be examined by courts',
  ],
  sol: 'Using judicial review, the Court can declare a law void to the extent it violates the Constitution, including Fundamental Rights. Advice to the Governor or a Lok Sabha vote is not how the Court acts, and State laws are subject to review.',
}));
Q('m_record', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'The Supreme Court is called a "Court of Record". What does this mean for its judgments?',
  opts: [
    'Its judgments are recorded for evidence and as precedents, and it can punish for contempt of itself',
    'It keeps a record of all citizens\' property',
    'It records the votes of Parliament',
    'It records the oath of every minister',
  ],
  sol: 'As a Court of Record (Article 129), its judgments and proceedings are preserved as evidence and precedent that cannot be questioned when produced in a court, and it has the power to punish for contempt. The other options describe unrelated records.',
}));
Q('m_binding', mcq({
  t: 4, d: 2, c: 'recall',
  stem: 'According to Article 141, the law declared by the Supreme Court is binding on whom?',
  opts: ['All courts within the territory of India', 'Only the High Court of Delhi', 'Only the Union government', 'Only the parties to that case'],
  sol: 'Article 141 makes the law declared by the Supreme Court binding on all courts in India. It is not limited to one High Court, the Union government or the parties.',
}));
Q('ar_jr', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'The Supreme Court is often described as the guardian of the Constitution.',
  r: 'Through judicial review, it can strike down laws and executive actions that violate the Constitution.',
  sol: 'Both are true and R explains A: the power to invalidate unconstitutional laws and actions is what lets the Court protect the Constitution.',
}));
Q('tf_record', tf({
  t: 4, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? Because the Supreme Court is a Court of Record, it can punish a person for contempt of the Court.',
  sol: 'True. Article 129 makes it a Court of Record with all the powers of such a court, including the power to punish for contempt of itself.',
}));
Q('fb_review_art', fb({
  t: 4, d: 2, c: 'recall',
  stem: 'The Supreme Court\'s power to review its own judgments is given by Article ___ of the Constitution.',
  acc: [['137']],
  sol: 'Article 137 gives the power of review.',
}));
Q('s_record_two', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give two features of the Supreme Court as a Court of Record.',
  model: '1. Its **judgments and proceedings are recorded** and used as **evidence and precedents**, and cannot be questioned when produced in any court.\n2. It has the power to **punish for contempt** of itself.',
  sol: 'Records as evidence and precedent; contempt power.',
  scheme: [['Records as evidence and precedent', 1], ['Contempt power', 1]],
}));
Q('s_jr_importance', short({
  t: 4, d: 3, c: 'evaluation', marks: 2, wl: S2,
  stem: 'Why is judicial review important for protecting citizens in a democracy?',
  model: 'It ensures that **even a majority in Parliament or a government cannot override the Constitution**; laws or orders that **violate Fundamental Rights** can be **struck down**, so citizens\' rights stay protected.',
  sol: 'Limits on majorities; protection of rights.',
  scheme: [['Limits on the legislature and executive', 1], ['Protection of Fundamental Rights', 1]],
}));
Q('s3_jr_review', short({
  t: 4, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Distinguish between the Supreme Court\'s power of judicial review and its power to review its own judgments.',
  model: '1. **Judicial review** tests **laws and executive actions** of Parliament, State legislatures and governments against the **Constitution**.\n2. **Review of its own judgments (Article 137)** lets the Court **reconsider its own earlier decision**, for example to correct an **error apparent on the record**.\n3. So the first checks **other organs**, while the second corrects the **Court itself**.',
  sol: 'Object of each power and the contrast.',
  scheme: [['Judicial review', 1], ['Review of its own judgments', 1], ['Clear contrast', 1]],
}));

// ================================================================ t05 Writs
Q('m_habeas', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'Ramesh, an imagined shopkeeper, is held by the police for five days without being produced before a magistrate. His sister petitions the Supreme Court. Which writ is most suitable?',
  opts: ['Habeas corpus', 'Mandamus', 'Quo warranto', 'Certiorari'],
  sol: 'Habeas corpus orders the authority to produce the detained person before the court so that the legality of the detention can be examined. Mandamus commands a duty, quo warranto questions a claim to a public office, and certiorari quashes an order of a lower court.',
}));
Q('m_mandamus', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'An imagined municipal officer refuses, without any legal reason, to issue a birth certificate that the law requires him to issue. Which writ commands him to do his duty?',
  opts: ['Mandamus', 'Habeas corpus', 'Prohibition', 'Quo warranto'],
  sol: 'Mandamus ("we command") orders a public authority to perform a public duty it is bound to perform. Habeas corpus concerns detention, prohibition is aimed at lower courts, and quo warranto at the right to hold an office.',
}));
Q('m_quo', mcq({
  t: 5, d: 3, c: 'application',
  stem: 'Citizens find that the chairperson of an imagined State public body was appointed although she does not meet the age condition in the law creating the office. Which writ asks her by what authority she holds the office?',
  opts: ['Quo warranto', 'Mandamus', 'Habeas corpus', 'Prohibition'],
  sol: 'Quo warranto ("by what authority") asks a person to show the legal authority for holding a public office and can remove a person not qualified for it. The other writs serve different purposes.',
}));
Q('m_prohibition', mcq({
  t: 5, d: 3, c: 'analysis',
  stem: 'A lower tribunal is about to decide a case that the law places outside its powers, and the decision has not yet been given. Which writ stops it from going ahead?',
  opts: ['Prohibition', 'Certiorari', 'Mandamus', 'Habeas corpus'],
  sol: 'Prohibition is issued before a decision, to stop a lower court or tribunal from acting beyond its jurisdiction. Certiorari is issued after an order is passed, to quash it. Mandamus and habeas corpus do not deal with jurisdiction of lower courts.',
}));
Q('m_certiorari', mcq({
  t: 5, d: 3, c: 'application',
  stem: 'An imagined tribunal has already passed an order that it had no power to pass. Which writ can the higher court issue to quash that order?',
  opts: ['Certiorari', 'Prohibition', 'Quo warranto', 'Mandamus'],
  sol: 'Certiorari is issued after the order, to transfer the record and quash a decision made without jurisdiction or in clear violation of law. Prohibition would have been used before the decision.',
}));
Q('m_art32', mcq({
  t: 5, d: 1, c: 'recall',
  stem: 'Under which Article can a citizen move the Supreme Court directly for the enforcement of Fundamental Rights?',
  opts: ['Article 32', 'Article 143', 'Article 356', 'Article 72'],
  sol: 'Article 32 gives the right to move the Supreme Court for enforcing Fundamental Rights, and itself is a Fundamental Right. Article 143 is advisory, 356 is President\'s Rule and 72 is the President\'s mercy power.',
}));
Q('tf_art32_right', tf({
  t: 5, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? The right to move the Supreme Court for the enforcement of Fundamental Rights is itself one of the Fundamental Rights.',
  sol: 'True. Article 32 is in Part III of the Constitution, so the remedy is guaranteed as a Fundamental Right; Dr B. R. Ambedkar regarded it as among the most important provisions.',
}));
Q('fb_writ', fb({
  t: 5, d: 2, c: 'recall',
  stem: 'The writ that orders a person who has been detained to be produced before the court is called ___.',
  acc: [['habeas corpus']],
  sol: 'Habeas corpus means "you may have the body"; the detained person is produced before the court.',
}));
Q('mt_writs', match({
  t: 5, d: 2, c: 'understanding', marks: 5,
  stem: 'Match each writ with its purpose.',
  pairs: [
    ['Habeas corpus', 'Produce a detained person before the court'],
    ['Mandamus', 'Command a public authority to perform its duty'],
    ['Prohibition', 'Stop a lower court from exceeding its jurisdiction before it decides'],
    ['Certiorari', 'Quash an order already passed by a lower court without jurisdiction'],
    ['Quo warranto', 'Ask by what authority a person holds a public office'],
  ],
  sol: 'Each writ answers one kind of wrong: unlawful detention, neglect of duty, threatened excess of jurisdiction, completed excess of jurisdiction, and unlawful holding of office.',
}));
Q('ar_writ_lower', ar({
  t: 5, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'The writ of prohibition is issued before a lower court has delivered its decision.',
  r: 'The writ of prohibition can be issued against a private company to stop it from breaking a contract.',
  sol: 'A is true. R is false: prohibition lies against judicial or quasi-judicial bodies acting beyond their powers, not against private companies.',
}));
Q('s_hc_vs_sc_writs', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State the meaning of the writs of habeas corpus and mandamus.',
  model: '**Habeas corpus:** an order to **produce a detained person** before the court so that the **lawfulness of the detention** can be tested.\n**Mandamus:** an order to a **public authority** to **perform a public duty** it is legally bound to do.',
  sol: 'One accurate meaning each.',
  scheme: [['Habeas corpus', 1], ['Mandamus', 1]],
}));
Q('s_cert_prohib', short({
  t: 5, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Distinguish between the writs of prohibition and certiorari.',
  model: '**Prohibition** is issued **before** a lower court or tribunal decides, to **stop** it acting beyond its jurisdiction. **Certiorari** is issued **after** an order is passed, to **quash** an order made without jurisdiction.',
  sol: 'Timing and effect of each.',
  scheme: [['Prohibition: before, stops', 1], ['Certiorari: after, quashes', 1]],
}));
Q('s3_writs_three', short({
  t: 5, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Suggest the writ that an imagined citizen should seek in each case, with a reason: (a) a college principal holds office without the qualification the law requires; (b) a tribunal has passed an order beyond its powers; (c) an official refuses to issue a ration card the law entitles the citizen to.',
  model: '(a) **Quo warranto**, because it questions the **authority** by which the principal **holds a public office**.\n(b) **Certiorari**, because the order is **already passed** and must be **quashed**.\n(c) **Mandamus**, because it **commands the official** to perform a **legal duty**.',
  sol: 'One correct writ and reason for each case.',
  scheme: [['(a) Quo warranto with reason', 1], ['(b) Certiorari with reason', 1], ['(c) Mandamus with reason', 1]],
}));

// ================================================================ long (10-mark, 3 + 3 + 4)
Q('l_composition', long({
  t: 1, d: 3, c: 'application', marks: 10, wl: L10,
  stem: 'A Class 10 student is preparing a talk on how the Supreme Court is staffed.\n\n(i) State the composition of the Supreme Court and the qualifications of its judges. **[3]**\n(ii) Explain how the judges are appointed. **[3]**\n(iii) Describe the grounds and procedure for removing a judge. **[4]**',
  model: `(i) The Court has a **Chief Justice of India** and up to **${OTHER_JUDGES} other judges** (sanctioned strength **${STRENGTH}**, as of 2024). A judge must be a **citizen** and must have been a **High Court judge for ${HC_JUDGE_YEARS} years**, or an **advocate of a High Court for ${ADVOCATE_YEARS} years**, or a **distinguished jurist** in the President's opinion.\n\n(ii) Judges are appointed by the **President**. In practice, names are **recommended by a collegium** of the Chief Justice and senior-most judges, a practice that grew from Supreme Court judgments in the **1990s**; the **senior-most judge** is usually made **Chief Justice**. A 2014 attempt to replace this with a commission (**NJAC**) was **struck down in 2015**.\n\n(iii) A judge can be removed only for **proved misbehaviour or incapacity**. A motion is moved in a House, an **inquiry committee** examines the charge, and **each House** must pass an **address** by a **majority of its total membership** and **two-thirds of members present and voting** in the same session. The **President** then orders the removal. Judges otherwise serve until **${RETIRE_AGE}**.`,
  sol: 'Composition and qualifications; appointment; removal.',
  scheme: [['(i) Composition', 1], ['(i) Qualifications', 2], ['(ii) President, collegium and convention', 3], ['(iii) Grounds', 1], ['(iii) Inquiry and special majority', 2], ['(iii) President orders removal', 1]],
}));
Q('l_independence', long({
  t: 2, d: 3, c: 'evaluation', marks: 10, wl: L10,
  stem: 'Answer the following about the independence of the judiciary.\n\n(i) Why is it important for the judiciary to be independent of the executive and the legislature? **[3]**\n(ii) Explain any three provisions about tenure and salary that protect the judges. **[3]**\n(iii) Explain any two other provisions that keep the Supreme Court independent, and say whether you think they are enough. **[4]**',
  model: '(i) The Court decides **disputes involving the government**, protects **Fundamental Rights** and interprets the **Constitution**; judges must be able to decide **without fear or favour**, or citizens would lose trust in **justice**.\n\n(ii) Judges serve until **65** (**security of tenure**); they can be removed only for **proved misbehaviour or incapacity** by a **special majority of both Houses**; their **salaries are charged on the Consolidated Fund** and **cannot be cut** after appointment except in a **financial emergency**.\n\n(iii) Parliament **cannot discuss a judge\'s conduct** except during removal, and the Court can **punish for contempt**; retired judges **cannot practise** in any court in India. These provisions together give **strong protection**; a balanced answer may add that **public trust** and **transparent appointments** also matter.',
  sol: 'Importance; tenure and salary provisions; other provisions with a judgement.',
  scheme: [['(i) Importance with reasons', 3], ['(ii) Three provisions', 3], ['(iii) Two other provisions', 2], ['(iii) Reasoned judgement', 2]],
}));
Q('l_jurisdiction', long({
  t: 3, d: 3, c: 'application', marks: 10, wl: L10,
  stem: 'Read the situation and answer. *(Imagined.)* In one year the Supreme Court hears a dispute between the Union and the State of Pashchimgarh, an appeal in a murder case from a High Court, and a question sent by the President.\n\n(i) Name the jurisdiction used in each of the three matters. **[3]**\n(ii) Explain the original jurisdiction of the Supreme Court. **[3]**\n(iii) Describe the appellate jurisdiction, mentioning the kinds of appeals it covers. **[4]**',
  model: '(i) The Union–State dispute: **original jurisdiction**; the murder appeal: **appellate jurisdiction (criminal)**; the President\'s question: **advisory jurisdiction**.\n\n(ii) Under **Article 131**, cases that **begin in the Supreme Court**: disputes **between the Union and one or more States**, between the **Union and States on one side and other States** on the other, and **between States**. No other court can hear these.\n\n(iii) It hears **appeals from High Courts** in **constitutional cases** (on a certificate of a substantial question about the Constitution), **civil cases** (substantial question of general importance), and **criminal cases** (for example where a High Court reverses an acquittal and passes a **death sentence**). Under **Article 136** it may grant **special leave to appeal** from almost any court or tribunal except **armed forces tribunals**.',
  sol: 'Identification; original; appellate.',
  scheme: [['(i) Three jurisdictions named', 3], ['(ii) Original jurisdiction', 3], ['(iii) Constitutional and civil appeals', 2], ['(iii) Criminal appeals and special leave', 2]],
}));
Q('l_advisory_record', long({
  t: [3, 4], d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'Answer the following about some special powers of the Supreme Court.\n\n(i) Explain the advisory jurisdiction of the Court. **[3]**\n(ii) Explain the Court\'s power to review its own judgments. **[3]**\n(iii) What is meant by a Court of Record? Explain two of its features. **[4]**',
  model: '(i) Under **Article 143**, the **President** may refer a **question of law or fact of public importance**; the Court gives its **opinion**, which **guides** but does **not bind** like a judgment.\n\n(ii) Under **Article 137**, the Court may **reconsider its own judgment or order**, for example to correct an **error apparent on the record**; this keeps its decisions **just** even after they are delivered.\n\n(iii) A **Court of Record** is one whose **judgments and proceedings are preserved** as **evidence and precedent**. Its records **cannot be questioned** when produced in a court, and it has the power to **punish for contempt** of itself (**Article 129**).',
  sol: 'Advisory; review; Court of Record.',
  scheme: [['(i) Advisory jurisdiction', 3], ['(ii) Review of its own judgments', 3], ['(iii) Meaning', 2], ['(iii) Two features', 2]],
}));
Q('l_jr', long({
  t: 4, d: 4, c: 'evaluation', marks: 10, wl: L10,
  stem: 'A citizen\'s group argues that judicial review makes the Supreme Court the protector of the Constitution.\n\n(i) What is judicial review? **[3]**\n(ii) Explain how judicial review protects Fundamental Rights and the federal division of powers. **[3]**\n(iii) Give two arguments in favour of this power and one concern sometimes raised about it. **[4]**',
  model: '(i) It is the power of the Court to **examine laws** passed by Parliament and State legislatures and **executive orders**, and to declare them **void** if they **violate the Constitution**.\n\n(ii) A law that takes away a **Fundamental Right** beyond what the Constitution allows can be **struck down**; a law made by the **Union on a State subject** (or the reverse) outside its powers can be declared invalid, keeping the **federal balance**.\n\n(iii) **For:** it protects **minorities and individuals** against majorities; it keeps every organ **within constitutional limits**. **Concern:** some argue that **unelected judges** may sometimes go too far into **policy decisions** best left to elected bodies; others respond that the Court acts only on **constitutional grounds**.',
  sol: 'Meaning; protection of rights and federalism; balanced arguments.',
  scheme: [['(i) Meaning', 3], ['(ii) Rights', 2], ['(ii) Federal balance', 1], ['(iii) Two arguments for', 2], ['(iii) One concern stated neutrally', 2]],
}));
Q('l_writs', long({
  t: 5, d: 3, c: 'application', marks: 10, wl: L10,
  stem: 'Answer the following about the enforcement of Fundamental Rights.\n\n(i) Under which Article can a citizen go directly to the Supreme Court, and why is this right important? **[3]**\n(ii) Explain the writs of habeas corpus, mandamus and quo warranto. **[3]**\n(iii) Explain the writs of prohibition and certiorari, bringing out the difference between them. **[4]**',
  model: '(i) **Article 32** gives the right to move the **Supreme Court** for enforcing **Fundamental Rights**; it is **itself a Fundamental Right**, so the rights are **not just promises** but can be **enforced**.\n\n(ii) **Habeas corpus:** produce a **detained person** to test the detention. **Mandamus:** command a **public authority** to do its **legal duty**. **Quo warranto:** ask **by what authority** a person holds a **public office**.\n\n(iii) **Prohibition** is issued to a lower court or tribunal **before** it decides, to **stop** it from going **beyond its jurisdiction**. **Certiorari** is issued **after** the order, to **quash** it. So prohibition **prevents** and certiorari **cures**.',
  sol: 'Article 32 and its importance; three writs; two writs contrasted.',
  scheme: [['(i) Article 32', 1], ['(i) Why important', 2], ['(ii) Three writs', 3], ['(iii) Prohibition', 1], ['(iii) Certiorari', 1], ['(iii) Difference', 2]],
}));
Q('l_compare', long({
  t: [1, 2, 3], d: 4, c: 'analysis', marks: 10, wl: L10,
  stem: 'Compare and explain.\n\n(i) Distinguish between original and appellate jurisdiction with one example of each. **[3]**\n(ii) Compare the removal of a Supreme Court judge with the removal of the President on two points. **[3]**\n(iii) Explain how the Supreme Court acts as the final interpreter of the Constitution. **[4]**',
  model: '(i) **Original:** cases that **begin** in the Supreme Court, e.g. a **dispute between two States**. **Appellate:** cases that come **on appeal** from a **High Court**, e.g. an appeal in a **criminal case** where a death sentence is passed after reversal of an acquittal.\n\n(ii) **Ground:** a judge for **proved misbehaviour or incapacity**; the President for **violation of the Constitution**. **Majority:** a judge needs a **majority of total membership and two-thirds of members present and voting** in each House; the President needs **two-thirds of the total membership** of each House.\n\n(iii) Through **judicial review**, it decides whether laws and actions agree with the **Constitution**; under **Article 141** its rulings **bind all courts**; it **settles Union–State disputes**; and through **writs** and **appeals** its interpretation becomes **final**, subject only to the Constitution being amended within its limits.',
  sol: 'Two jurisdictions; two removals; final interpreter.',
  scheme: [['(i) Distinction with examples', 3], ['(ii) Ground compared', 1], ['(ii) Majority compared', 2], ['(iii) Judicial review and Article 141', 2], ['(iii) Disputes, writs and appeals', 2]],
}));

// ================================================================ source-based
Q('sb_detention_diary', source({
  t: [5, 2], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the extract from the imagined diary of a young lawyer and answer the questions that follow. ${IMAG}`,
  passage: '**Diary of a junior advocate in Delhi (imagined)**\n\nMonday. A woman came with her son\'s photograph. He was taken from his tea stall on Thursday, and nobody will say where he is or why. We filed a petition straight in the Supreme Court in the afternoon.\n\nWednesday. The bench ordered the police to bring him before the court and explain the detention. The officer said the papers were "under preparation". The judges were not impressed.\n\nFriday. He walked out with his mother. On the way home she asked me whether the judges could get into trouble for scolding the police. I told her the judges\' jobs and salaries are protected.',
  parts: [
    child('a', short({ t: 5, d: 1, c: 'recall', marks: 1, stem: 'Name the writ the lawyer most likely sought.', model: '**Habeas corpus**.', sol: 'Production of a detained person.', scheme: [['Habeas corpus', 1]] })),
    child('b', short({ t: 5, d: 2, c: 'application', marks: 1, stem: 'Under which Article could the petition be filed directly in the Supreme Court?', model: '**Article 32**.', sol: 'Right to constitutional remedies.', scheme: [['Article 32', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain two provisions behind the lawyer\'s answer that the judges\' jobs and salaries are protected.', model: 'Judges have **security of tenure** until **65** and can be removed only for **proved misbehaviour or incapacity** by a special majority in **both Houses**; their **salaries are charged on the Consolidated Fund** and **cannot be cut** after appointment except in a **financial emergency**.', sol: 'Tenure and salary protection.', scheme: [['Tenure', 1], ['Salary', 1]] }), [
      short({ t: 5, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Why is it important that a citizen can approach the Supreme Court directly in a case like this?', model: 'Unlawful detention needs **quick relief**; a **direct remedy** under **Article 32**, itself a Fundamental Right, means the **liberty** of a person can be restored **without long appeals**.', sol: 'Speed and the right to liberty.', scheme: [['Quick relief', 1], ['Protection of liberty as a right', 1]] }),
    ]),
  ],
}));
Q('sb_states_report', source({
  t: [3, 4], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the imagined newspaper report and answer the questions that follow. ${IMAG}`,
  passage: '**Report in an imagined newspaper**\n\nThe imagined States of Neelpur and Haripur have both claimed the right to collect royalty from a mine on their shared border. Neither State has gone to a High Court; the matter has been filed directly in the Supreme Court. Last month, a separate bench of the Court declared a Haripur law on land purchases void because it denied equal treatment to people from other States. The State has asked the Court to look at that judgment again, saying an important document was overlooked.',
  parts: [
    child('a', short({ t: 3, d: 1, c: 'recall', marks: 1, stem: 'Under which jurisdiction is the royalty dispute being heard?', model: '**Original jurisdiction** (Article 131).', sol: 'Dispute between States.', scheme: [['Original', 1]] })),
    child('b', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Which power did the Court use when it declared the land law void?', model: '**Judicial review**.', sol: 'Striking down an unconstitutional law.', scheme: [['Judicial review', 1]] })),
    child('c', short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Which power does Haripur ask the Court to use now? Name the Article and explain the power.', model: 'The power to **review its own judgment** under **Article 137**, used to correct an **error apparent on the record** such as an overlooked document.', sol: 'Review of its own judgments.', scheme: [['Review, Article 137', 1], ['Explanation', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Why could the royalty dispute not be started in a High Court?', model: 'Disputes **between States** (or between the Union and States) fall within the **exclusive original jurisdiction** of the **Supreme Court**; no other court can hear them first.', sol: 'Exclusive original jurisdiction.', scheme: [['Dispute between States', 1], ['Exclusive to the Supreme Court', 1]] }),
    ]),
  ],
}));
Q('sb_seminar_note', source({
  t: [1, 2], d: 3, c: 'evaluation', origin: 'soyl-original',
  stem: `Read the imagined notes taken at a school seminar and answer the questions that follow. ${IMAG}`,
  passage: '**Notes from a school seminar on the judiciary (imagined)**\n\nSpeaker 1: The President appoints the judges, but the names come from the senior judges themselves. A law to set up a commission for appointments was made in 2014, and the Court struck it down the next year.\n\nSpeaker 2: Judges cannot be removed just because the government dislikes their judgments. Removal needs proved misbehaviour or incapacity and a difficult vote in both Houses.\n\nSpeaker 3: After retirement, a Supreme Court judge cannot argue cases in any court in India.',
  parts: [
    child('a', short({ t: 1, d: 1, c: 'recall', marks: 1, stem: 'Name the commission Speaker 1 refers to.', model: 'The **National Judicial Appointments Commission (NJAC)**.', sol: 'The 2014 commission struck down in 2015.', scheme: [['NJAC', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'understanding', marks: 1, stem: 'What is the group of senior judges that recommends names commonly called?', model: 'The **collegium**.', sol: 'Collegium practice.', scheme: [['Collegium', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'evaluation', marks: 2, stem: '**Either** (i): How do the points made by Speakers 2 and 3 help keep the judiciary independent?', model: 'Speaker 2: **difficult removal** gives **security of tenure**, so judges can decide **against the government**. Speaker 3: the **ban on practice** removes any **temptation** to please future clients or officials.', sol: 'Tenure and no practice, each linked to independence.', scheme: [['Speaker 2 point', 1], ['Speaker 3 point', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): State the majority each House needs to pass an address for removing a judge.', model: 'A **majority of the total membership** of the House **and** at least **two-thirds of members present and voting**.', sol: 'Both conditions.', scheme: [['Majority of total membership', 1], ['Two-thirds of present and voting', 1]] }),
    ]),
  ],
}));

// ================================================================ extra objective items for check slides
Q('m_seat', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Where does the Supreme Court of India ordinarily sit?',
  opts: ['New Delhi', 'Mumbai', 'Kolkata', 'Chennai'],
  sol: 'The Constitution provides that the Supreme Court sits in Delhi, or at other places the Chief Justice may appoint with the President\'s approval. Mumbai, Kolkata and Chennai have High Courts.',
  assets: [hierarchySvg('Box diagram of the hierarchy of courts: the Supreme Court of India in New Delhi at the top, High Courts in the middle and District and Sessions Courts at the bottom, with arrows showing that appeals go up the ladder', 'An integrated judiciary.')],
}));
Q('m_head_judiciary', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Looking at a chart of the Indian judiciary, a student notices one court at the top whose rulings bind all others. Which court is it?',
  opts: ['The Supreme Court of India', 'The High Court of the student\'s State', 'The District Court', 'A Lok Adalat'],
  sol: 'The Supreme Court is at the apex of a single integrated judiciary, and under Article 141 its law binds all courts. High Courts, District Courts and Lok Adalats are below it.',
}));
Q('m_writ_name_count', mcq({
  t: 5, d: 1, c: 'recall',
  stem: 'How many kinds of writs are named in Article 32 for the enforcement of Fundamental Rights?',
  opts: ['Five', 'Three', 'Seven', 'Two'],
  sol: 'Five: habeas corpus, mandamus, prohibition, certiorari and quo warranto.',
}));
Q('tf_advisory_citizen', tf({
  t: 3, d: 1, c: 'recall', ans: false,
  stem: 'True or false? Any citizen may ask the Supreme Court for an advisory opinion under Article 143.',
  sol: 'False. Only the President may make a reference under Article 143.',
}));
