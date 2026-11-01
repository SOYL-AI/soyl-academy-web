// ICSE 10 History & Civics, ch06 The High Courts and Subordinate Courts — question bank.
// Every scenario, diary, notice and imagined litigant is written by SOYL and labelled as imagined; no textbook text,
// box or exercise and no specimen or board-paper item is reused (D-036); no real person is quoted and no serving
// judge is named. Facts are stable provisions of the Constitution (Articles 214-217, 220, 222, 224, 226, 227, 231, 233)
// and of the Legal Services Authorities Act, 1987.
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child, Svg } from '../../icse-10-history-civics-ch01/src/lib.mjs';

const S2 = [25, 45];
const S3 = [40, 70];
const L10 = [120, 220];
const IMAG = '*(Imagined document written by SOYL for practice; the people and places in it are not real.)*';

// ---------------------------------------------------------------- figures used in items (asserted)
export const RETIRE_AGE = 62; // a High Court judge holds office until 62
export const YEARS_QUAL = 10; // ten years of judicial office, or ten years as a High Court advocate
export const DJ_ADVOCATE_YEARS = 7; // a District Judge appointed from the Bar: seven years as an advocate
export const ADDL_YEARS = 2; // an additional judge is appointed for up to two years
// Removal of a judge needs, in each House, a majority of the total membership and two-thirds of those present and voting.
export const LS = 543;
export const majorityOfTotal = (n) => Math.floor(n / 2) + 1;
export const twoThirdsPresent = (p) => Math.ceil((2 * p) / 3);
export const removalNeed = (total, present) => Math.max(majorityOfTotal(total), twoThirdsPresent(present));
assert.equal(majorityOfTotal(LS), 272);
assert.equal(twoThirdsPresent(480), 320);
assert.equal(removalNeed(LS, 480), 320);
assert.equal(twoThirdsPresent(390), 260);
assert.equal(removalNeed(LS, 390), 272); // with fewer present, the majority of the total is the binding condition

/** Hierarchy of courts in a State (theme colours only). */
export function hierarchySvg(alt, caption) {
  const s = new Svg(720, 330);
  const box = (x, y, w, a, b, col) => {
    s.rect(x, y, w, 52, { rx: 6, fill: col, fillOpacity: 0.18, color: col, sw: 1.5 });
    s.text(x + w / 2, y + 19, a, { size: 13, bold: true });
    if (b) s.text(x + w / 2, y + 37, b, { size: 11 });
  };
  box(260, 14, 200, 'Supreme Court', 'apex court of India', 'blue');
  s.arrow(360, 68, 360, 92, { sw: 1.4 });
  box(240, 94, 240, 'High Court', 'highest court in the State', 'accent');
  s.arrow(300, 148, 180, 186, { sw: 1.4 });
  s.arrow(420, 148, 540, 186, { sw: 1.4 });
  box(60, 188, 240, 'Court of the District Judge', 'civil cases of the district', 'green');
  box(420, 188, 240, 'Sessions Court', 'serious criminal cases', 'red');
  s.arrow(180, 242, 180, 266, { sw: 1.4 });
  s.arrow(540, 242, 540, 266, { sw: 1.4 });
  box(60, 268, 240, 'Lower civil courts', 'civil judges of the district', 'muted');
  box(420, 268, 240, 'Magistrates\' courts', 'smaller criminal cases', 'muted');
  return s.visual(alt, caption);
}

// ================================================================ t01 Composition, qualifications and appointment
Q('m_comp', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Who decides how many judges, besides the Chief Justice, a High Court will have?',
  opts: ['The President of India', 'The Governor of the State', 'The State Legislative Assembly', 'The Chief Minister of the State'],
  sol: 'The Constitution gives each High Court a Chief Justice and such other judges as the President thinks necessary from time to time; there is no fixed number. The Governor, the Assembly and the Chief Minister do not fix the strength.',
}));
Q('m_common_hc', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Two imagined neighbouring States, Pashmir and Tarai, share a single High Court. Is this allowed?',
  opts: [
    'Yes; Parliament may set up a common High Court for two or more States or Union Territories',
    'No; every State must have its own High Court',
    'Only if both States are Union Territories',
    'Only for criminal cases; civil cases need separate High Courts',
  ],
  sol: 'Article 231 allows Parliament to establish one High Court for two or more States, or for States and a Union Territory. Several such common High Courts exist. The other options add conditions the Constitution does not lay down.',
}));
Q('m_qual_bar', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'Advocate Farida Qureshi (imagined) has practised before a High Court for eleven years. Which further condition must she meet to be eligible for appointment as a High Court judge?',
  opts: ['She must be a citizen of India', 'She must be at least 45 years old', 'She must have served as a District Judge', 'She must be a member of the State Bar Council for 20 years'],
  sol: 'A High Court judge must be an Indian citizen who has either held a judicial office in India for ten years or been a High Court advocate for ten years. She already has eleven years at the Bar, so citizenship is the remaining condition. No minimum age is laid down, and service as a District Judge is an alternative route, not a requirement.',
}));
Q('m_qual_judicial', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Which of these is one of the two alternative routes of experience that make a citizen eligible to be appointed a High Court judge?',
  opts: [
    'At least ten years in a judicial office in India',
    'At least five years as a member of a State Legislative Assembly',
    'At least ten years as a professor of law',
    'At least seven years as a Supreme Court advocate only',
  ],
  sol: 'The two routes are ten years in a judicial office in India, or ten years as an advocate of a High Court (or of two or more High Courts in succession). Legislative service is irrelevant, and a law professor is not eligible on that ground alone for a High Court post.',
}));
Q('m_appoint', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'Who formally appoints the judges of a High Court?',
  opts: ['The President of India', 'The Governor of the State', 'The Chief Justice of India', 'The Union Law Minister'],
  sol: 'High Court judges are appointed by the President, after consultation with the Chief Justice of India and the Governor of the State (and, for judges other than the Chief Justice, the Chief Justice of that High Court). The Governor is consulted but does not appoint.',
}));
Q('m_retire', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Up to what age does a permanent judge of a High Court hold office?',
  opts: ['62 years', '65 years', '60 years', '70 years'],
  sol: 'A High Court judge holds office until the age of 62. Sixty-five is the retirement age of Supreme Court judges; the other figures do not apply.',
}));
Q('m_removal_who', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A High Court judge in an imagined State is accused of proved misbehaviour. Which authority alone can finally remove him from office?',
  opts: [
    'The President, after both Houses of Parliament pass an address by a special majority',
    'The Governor, on the advice of the State Council of Ministers',
    'The Chief Justice of India, acting alone',
    'The State Legislative Assembly, by a simple majority',
  ],
  sol: 'A High Court judge is removed in the same way as a Supreme Court judge: the President issues the order after each House of Parliament passes an address supported by a majority of its total membership and two-thirds of those present and voting, on grounds of proved misbehaviour or incapacity. The State government and Assembly have no power of removal.',
}));
Q('m_transfer', mcq({
  t: 1, d: 3, c: 'understanding',
  stem: 'A judge of one High Court is moved to the High Court of another State. Under the Constitution, who orders such a transfer?',
  opts: ['The President, after consulting the Chief Justice of India', 'The Governor of the new State', 'The Chief Justice of the old High Court alone', 'Parliament, by passing a law'],
  sol: 'Article 222 allows the President, after consultation with the Chief Justice of India, to transfer a judge from one High Court to another. The Governor and the Chief Justice of the High Court do not order transfers, and no separate law is needed for each case.',
}));
Q('ar_no_practice', ar({
  t: 1, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'A retired permanent judge of a High Court may not plead as a lawyer before that same High Court.',
  r: 'The rule protects public confidence that a judge\'s decisions were not influenced by hopes of later practice before former colleagues.',
  sol: 'Both statements are true, and R explains A. The bar on practising before the court where one served (a retired judge may plead only before the Supreme Court and other High Courts) keeps the judiciary free of suspicion and so supports its independence.',
}));
Q('tf_age_min', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? The Constitution fixes a minimum age of 35 years for appointment as a High Court judge.',
  sol: 'No minimum age is fixed for a High Court judge; the conditions are citizenship and ten years of judicial office or of practice as a High Court advocate. Thirty-five is the age for the President and Vice-President.',
}));
Q('fb_retire', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'A permanent judge of a High Court holds office until the age of ___ years.',
  acc: [['62', 'sixty-two', 'sixty two']],
  sol: 'The retirement age of a High Court judge is 62 years.',
}));
Q('s_qual_two', short({
  t: 1, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State the qualifications a person needs to be appointed a judge of a High Court.',
  model: '1. The person must be a **citizen of India**.\n2. The person must have held a **judicial office in India for at least ten years**, **or** have been an **advocate of a High Court for at least ten years**.',
  sol: 'Citizenship plus either of the two ten-year routes.',
  scheme: [['Citizenship', 1], ['Ten years of judicial office or of High Court practice', 1]],
}));
Q('s_consult', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Whom does the President consult before appointing a judge (other than the Chief Justice) to a High Court?',
  model: 'The President consults the **Chief Justice of India**, the **Governor of the State** and the **Chief Justice of that High Court**. In practice, since the 1990s the names come from a **collegium of senior judges**.',
  sol: 'Three consultees; collegium practice optional.',
  scheme: [['Chief Justice of India and Governor', 1], ['Chief Justice of the High Court (or the collegium practice)', 1]],
}));
Q('s_additional', short({
  t: 1, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined High Court has a sudden pile-up of pending appeals. What kind of judge can the President appoint to deal with it, and for how long?',
  model: 'The President may appoint **additional judges** to clear a temporary increase in work or arrears, for a period of **up to two years**. (An **acting judge** may also be appointed when a permanent judge is absent.)',
  sol: 'Additional judges, two years.',
  scheme: [['Additional judges', 1], ['Up to two years', 1]],
}));
Q('s3_independence', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Explain three provisions that keep the judges of a High Court independent of the State government.',
  model: '1. **Security of tenure:** a judge serves till 62 and can be removed only by the **President** after a **special majority in Parliament**, not by the State government.\n2. **Salaries** are charged on the **Consolidated Fund of the State** and cannot be reduced during the term (except in a financial emergency).\n3. A retired judge **cannot practise before the same High Court**, so judges have no reason to please future litigants.',
  sol: 'Any three independence safeguards with a line of explanation each.',
  scheme: [['Security of tenure and removal procedure', 1], ['Salaries charged and protected', 1], ['Bar on practice (or another valid safeguard)', 1]],
}));
Q('l_composition', long({
  t: 1, d: 3, c: 'application', marks: 10, wl: L10,
  stem: 'An imagined State, Varunpradesh, has just been formed and needs a High Court.\n\n(i) Describe the composition of a High Court and state whether Varunpradesh could share a High Court with a neighbour. **[3]**\n(ii) State the qualifications for appointment as a judge of the new High Court. **[3]**\n(iii) Explain how its judges are appointed, transferred and removed. **[4]**',
  model: '(i) A High Court has a **Chief Justice** and **such other judges as the President** decides from time to time; **additional** and **acting** judges may also be appointed. Under **Article 231**, Parliament may set up a **common High Court** for two or more States, so Varunpradesh **could share** one.\n\n(ii) A judge must be a **citizen of India** and must have held a **judicial office for ten years** or been an **advocate of a High Court for ten years**. No minimum age is fixed; judges retire at **62**.\n\n(iii) The **President** appoints the judges after consulting the **Chief Justice of India**, the **Governor** and the **Chief Justice of the High Court**; in practice a **collegium** of senior judges recommends names. The President may **transfer** a judge to another High Court after consulting the Chief Justice of India. A judge is **removed** by the President only after **each House of Parliament** passes an address by a **special majority** on grounds of proved **misbehaviour or incapacity**.',
  sol: 'Composition and common court; qualifications; appointment, transfer and removal.',
  scheme: [['(i) Chief Justice and other judges fixed by the President', 2], ['(i) Common High Court possible', 1], ['(ii) Citizenship', 1], ['(ii) Ten years of judicial office or practice', 2], ['(iii) Appointment by the President after consultation', 2], ['(iii) Transfer and removal by special majority', 2]],
}));
Q('l_independence', long({
  t: 1, d: 4, c: 'evaluation', marks: 10, wl: L10,
  stem: 'A student debate in an imagined school asks whether High Court judges are truly free from pressure.\n\n(i) Explain how the method of appointment helps keep the judges independent. **[3]**\n(ii) Explain how the security of tenure and the removal procedure protect them. **[3]**\n(iii) Give two other safeguards of independence and evaluate whether, together, they are enough. **[4]**',
  model: '(i) Judges are appointed by the **President**, not by the State government, after consulting the **Chief Justice of India** and senior judges; the **collegium** practice gives judges themselves the main voice, so appointments do not depend on **party politics**.\n\n(ii) A judge holds office **till 62** and can be removed only by the **President** after **both Houses of Parliament** pass an address by a **special majority** for proved **misbehaviour or incapacity**. Because this is so difficult, a judge can decide cases **without fear** of losing the post.\n\n(iii) **Salaries** are charged on the **Consolidated Fund** and cannot be cut during the term (except in a financial emergency), and a retired judge **cannot practise** before the same High Court. Together these give strong protection; a fair view is that independence also depends on **timely appointments** and on judges\' own **integrity**, which no rule can fully guarantee.',
  sol: 'Appointment; tenure and removal; two further safeguards plus a balanced evaluation.',
  scheme: [['(i) Appointment by the President with judicial consultation', 2], ['(i) Freedom from State politics', 1], ['(ii) Tenure to 62', 1], ['(ii) Difficult removal by Parliament', 2], ['(iii) Two further safeguards', 2], ['(iii) Balanced evaluation', 2]],
}));

// ================================================================ t02 Jurisdiction
Q('m_226_wider', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Why is the writ jurisdiction of a High Court described as wider than that of the Supreme Court?',
  opts: [
    'A High Court can issue writs to enforce Fundamental Rights and also for any other purpose, such as an ordinary legal right',
    'A High Court can issue writs against the President, which the Supreme Court cannot',
    'A High Court can issue more than five kinds of writs',
    'A High Court\'s writs apply across the whole of India, while the Supreme Court\'s apply to one State',
  ],
  sol: 'Under Article 226 a High Court may issue writs for the enforcement of Fundamental Rights and "for any other purpose", while Article 32 lets the Supreme Court issue writs only for Fundamental Rights. Both use the same five writs, and a High Court\'s writs run only within its own territory.',
}));
Q('m_original_ex', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Rohan Bhatia (imagined) lost a Lok Sabha election by a few votes and believes the counting was unlawful. Where must he file his election petition at first instance?',
  opts: ['In the High Court of the State', 'In the Supreme Court directly', 'In the Court of the District Judge', 'Before a Lok Adalat'],
  sol: 'Disputes about elections to Parliament and the State Legislature are tried by the High Court in its original jurisdiction; an appeal then lies to the Supreme Court. District courts and Lok Adalats do not hear election petitions.',
}));
Q('m_appellate_civil', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'A trader is unhappy with the decision of the Court of the District Judge in a civil dispute over a warehouse. To which court does his appeal normally lie?',
  opts: ['The High Court of the State', 'The Sessions Court', 'A Lok Adalat', 'The Court of a Judicial Magistrate'],
  sol: 'Appeals in civil cases from the District Judge lie to the High Court under its appellate jurisdiction. The Sessions Court hears criminal cases; a Lok Adalat settles disputes by agreement and is not an appeal court; a magistrate is lower in rank.',
}));
Q('m_record', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which of the following follows from a High Court being a Court of Record?',
  opts: [
    'Its judgements are preserved and can be cited as precedents, and it can punish for contempt of itself',
    'It can hear cases only after they have been recorded in a Lok Adalat',
    'It keeps a record of all elections held in the State',
    'It can record evidence only in civil cases',
  ],
  sol: 'Article 215 makes every High Court a Court of Record: its decisions are kept as records with evidentiary value, are binding on courts below and are cited as precedents, and it has the power to punish for contempt of itself. The other options describe nothing of the kind.',
}));
Q('m_227', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'A High Court finds that a tribunal in its State has been ignoring its own procedure rules. Under which Article can it exercise superintendence over that tribunal?',
  opts: ['Article 227', 'Article 32', 'Article 123', 'Article 72'],
  sol: 'Article 227 gives every High Court superintendence over all courts and tribunals in its territory (except military tribunals). Article 32 concerns Supreme Court writs, Article 123 ordinances and Article 72 the President\'s mercy powers.',
}));
Q('m_revisory', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'A lower court in an imagined district decided a small case although the law did not give it power over such cases, and no appeal is allowed. How can the High Court step in?',
  opts: [
    'By calling for the record and revising the decision under its revisory jurisdiction',
    'By referring the case to the Governor for a pardon',
    'By transferring the judge to another State',
    'It cannot step in because no appeal lies',
  ],
  sol: 'Even where no appeal lies, a High Court can call for the record of a case decided by a subordinate court and correct it if that court acted without jurisdiction or with serious irregularity. Pardons and transfers have nothing to do with correcting a decision.',
}));
Q('m_review', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'An imagined State passes a law that takes away a citizen\'s right to move freely between districts. A High Court strikes it down. Which power has the High Court used?',
  opts: ['Judicial review', 'Advisory jurisdiction', 'Original jurisdiction in election petitions', 'Power of pardon'],
  sol: 'Judicial review is the power to examine laws and executive orders and declare them void if they violate the Constitution, here a Fundamental Right. High Courts have no advisory jurisdiction; election petitions and pardons are unrelated.',
}));
Q('m_habeas', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Sunaina\'s brother has been held by the police for days without being produced before a magistrate. Which writ should she ask the High Court for?',
  opts: ['Habeas corpus', 'Quo warranto', 'Certiorari', 'Mandamus'],
  sol: 'Habeas corpus orders the person holding someone in custody to produce him before the court, so the court can decide whether the detention is lawful. Quo warranto questions a person\'s right to hold a public office; certiorari quashes a lower court\'s order; mandamus orders a public official to perform a duty.',
}));
Q('ar_226_32', ar({
  t: 2, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'A citizen whose ordinary legal right (not a Fundamental Right) is violated by a State authority can seek a writ from the High Court.',
  r: 'The right to move the Supreme Court for the enforcement of Fundamental Rights is itself a Fundamental Right.',
  sol: 'Both statements are true, but R does not explain A. A is true because Article 226 lets a High Court issue writs "for any other purpose". R describes Article 32, which concerns the Supreme Court and Fundamental Rights only, so it is not the reason for A.',
}));
Q('ar_record_contempt', ar({
  t: 2, d: 2, c: 'analysis', verdict: 'A-true-R-false',
  a: 'A High Court can punish a person for contempt of itself.',
  r: 'A High Court gets its power to punish for contempt from an order of the State Governor.',
  sol: 'A is true; R is false. The power comes from the Constitution: Article 215 makes the High Court a Court of Record with all its powers, including the power to punish for contempt of itself. The Governor confers no such power.',
}));
Q('tf_advisory', tf({
  t: 2, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Like the Supreme Court, a High Court can give advisory opinions to the Governor on questions of law.',
  sol: 'High Courts have no advisory jurisdiction. Only the Supreme Court can advise, and only when the President refers a question under Article 143.',
}));
Q('fb_record', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'Article 215 declares every High Court to be a Court of ___.',
  acc: [['Record']],
  sol: 'Every High Court is a Court of Record under Article 215.',
}));
Q('mt_writs', match({
  t: 2, d: 2, c: 'understanding',
  stem: 'Match each writ that a High Court can issue with what it does.',
  pairs: [
    ['Habeas corpus', 'Orders a detained person to be produced before the court'],
    ['Mandamus', 'Orders a public authority to perform a legal duty'],
    ['Prohibition', 'Stops a lower court from going beyond its powers in a pending case'],
    ['Quo warranto', 'Asks a person by what right he holds a public office'],
  ],
  sol: 'Habeas corpus: produce the body. Mandamus: perform your duty. Prohibition: stop proceeding beyond jurisdiction (issued while the case is pending; certiorari quashes after the decision). Quo warranto: show your authority to hold the office.',
}));
Q('s_original_two', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give two kinds of matters that a High Court can hear directly in its original jurisdiction.',
  model: '1. **Writ petitions** for the enforcement of **Fundamental Rights** and other legal rights (**Article 226**).\n2. **Election petitions** challenging elections to **Parliament** or the **State Legislature**. (Some High Courts also hear certain civil matters, such as admiralty or company cases, at first instance.)',
  sol: 'Any two valid original matters.',
  scheme: [['First matter', 1], ['Second matter', 1]],
}));
Q('s_appellate_two', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain the appellate jurisdiction of a High Court in civil and in criminal cases.',
  model: '**Civil:** the High Court hears appeals against decisions of the **Court of the District Judge** and other subordinate civil courts. **Criminal:** it hears appeals against convictions by the **Sessions Court**, and a **death sentence** passed by a Sessions Court must be **confirmed** by it.',
  sol: 'One line each for civil and criminal appeals.',
  scheme: [['Civil appeals', 1], ['Criminal appeals (and confirmation of death sentences)', 1]],
}));
Q('s_record_two', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two consequences of a High Court being a Court of Record.',
  model: '1. Its **judgements are preserved** and can be **cited as precedents**; they bind the **courts below** it.\n2. It has the power to **punish for contempt** of itself.',
  sol: 'Records and precedents; contempt power.',
  scheme: [['Records and precedents', 1], ['Contempt power', 1]],
}));
Q('s_superintend', short({
  t: 2, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'How does a High Court supervise the courts below it? Give two ways.',
  model: '1. Under **Article 227** it has **superintendence** over all courts and tribunals in its territory.\n2. It can **revise** their decided cases, take up cases raising a **constitutional question**, and is consulted on appointing **district judges**.',
  sol: 'Any two supervisory powers.',
  scheme: [['First way', 1], ['Second way', 1]],
}));
Q('s3_writ_compare', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Compare the writ jurisdiction of a High Court with that of the Supreme Court on three points.',
  model: '1. **Purpose:** a High Court (Article 226) issues writs for Fundamental Rights **and for any other purpose**; the Supreme Court (Article 32) only for **Fundamental Rights**.\n2. **Area:** a High Court\'s writs run within **its territory**; the Supreme Court\'s run throughout **India**.\n3. **Nature:** Article 32 is itself a **Fundamental Right**, so the Supreme Court cannot refuse to act on a proper petition; a High Court\'s writ power is **discretionary**.',
  sol: 'Three distinct points of comparison.',
  scheme: [['Purpose', 1], ['Territorial reach', 1], ['Fundamental right versus discretion', 1]],
}));
Q('l_jurisdiction', long({
  t: 2, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'Read the situation and answer. *(Imagined.)* A law student is preparing a chart of the powers of the High Court of her State.\n\n(i) Explain the original jurisdiction of a High Court with two examples. **[3]**\n(ii) Explain its appellate jurisdiction in civil and criminal cases. **[3]**\n(iii) Explain its revisory jurisdiction and its position as a Court of Record. **[4]**',
  model: '(i) **Original jurisdiction** means hearing a case **for the first time**. A High Court hears **writ petitions** under **Article 226** for Fundamental Rights and other legal rights, and **election petitions** about elections to Parliament and the State Legislature; some High Courts also hear certain **civil** matters directly.\n\n(ii) In **civil** cases it hears **appeals** against decisions of the **District Judge** and other subordinate civil courts. In **criminal** cases it hears appeals against **Sessions Court** convictions, and a **death sentence** passed by a Sessions Court needs its **confirmation**.\n\n(iii) Under its **revisory** power it can **call for the record** of a case decided by a lower court where **no appeal lies** and correct it if that court acted **without jurisdiction** or with serious **irregularity**; under **Article 227** it supervises all courts and tribunals in its territory. As a **Court of Record** (**Article 215**) its judgements are **preserved**, **bind lower courts** and are **cited as precedents**, and it can **punish for contempt** of itself.',
  sol: 'Original; appellate; revisory and Court of Record.',
  scheme: [['(i) Meaning of original jurisdiction', 1], ['(i) Two examples', 2], ['(ii) Civil appeals', 1], ['(ii) Criminal appeals and confirmation', 2], ['(iii) Revisory jurisdiction and superintendence', 2], ['(iii) Court of Record', 2]],
}));
Q('l_writs', long({
  t: 2, d: 4, c: 'analysis', marks: 10, wl: L10,
  stem: 'Three imagined citizens of Varunpradesh approach the High Court.\n\n- Meher has been detained by the police for a week without being produced before a magistrate.\n- A municipal board refuses to issue Arvind\'s trade licence although he meets every condition.\n- A man appointed as head of a State corporation does not have the qualifications the law requires.\n\n(i) Name the writ each person should seek and say why. **[3]**\n(ii) Under which Article does the High Court issue writs, and why is this power called wider than the Supreme Court\'s? **[3]**\n(iii) Explain judicial review by a High Court and why it matters for citizens. **[4]**',
  model: '(i) Meher: **habeas corpus**, so that the court can examine whether her **detention** is lawful. Arvind: **mandamus**, ordering the board to **perform its legal duty**. The corporation case: **quo warranto**, asking the man **by what authority** he holds the office.\n\n(ii) **Article 226**. It is wider because a High Court can issue writs not only for **Fundamental Rights** but also **for any other purpose**, such as ordinary legal rights, whereas under **Article 32** the Supreme Court issues writs only for Fundamental Rights.\n\n(iii) **Judicial review** is the power to examine **laws** and **executive actions** and declare them **void** if they **violate the Constitution**. It matters because it protects **Fundamental Rights**, keeps the Union and State governments within their **constitutional limits**, and gives citizens a **nearby court** to challenge unlawful action.',
  sol: 'Three writs with reasons; Article 226 and its width; judicial review and why it matters.',
  scheme: [['(i) Three correct writs with reasons', 3], ['(ii) Article 226', 1], ['(ii) Any other purpose versus Fundamental Rights only', 2], ['(iii) Meaning of judicial review', 2], ['(iii) Why it matters', 2]],
}));
Q('sb_case_diary', source({
  t: 2, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the extract from the imagined diary of a law intern at a High Court and answer the questions that follow. ${IMAG}`,
  passage: '**Diary of a law intern (imagined)**\n\nMonday. First case of the morning: a farmer from a hill district whose land records a revenue officer refused to correct, though the law requires it. His lawyer asked the High Court to order the officer to act. The judge agreed.\n\nWednesday. A bench heard an appeal against a Sessions Court that had convicted three men of robbery. Later, the same bench was asked to confirm a death sentence passed by another Sessions Court.\n\nFriday. A shopkeeper who had insulted the court in a newspaper was called to explain why he should not be punished for contempt.',
  parts: [
    child('a', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Which writ did the farmer obtain on Monday?', model: '**Mandamus**, ordering the officer to perform his legal duty.', sol: 'An order to a public authority to do its duty.', scheme: [['Mandamus', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'understanding', marks: 1, stem: 'Which jurisdiction was the High Court using on Wednesday?', model: 'Its **appellate jurisdiction** in **criminal** cases (including confirming a death sentence).', sol: 'Appeals from the Sessions Court.', scheme: [['Appellate (criminal) jurisdiction', 1]] })),
    child('c', short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Which status of the High Court allowed it to act on Friday? State one other consequence of that status.', model: 'It is a **Court of Record** (Article 215), so it can **punish for contempt** of itself; its **judgements are preserved** and **cited as precedents**.', sol: 'Court of Record; one further consequence.', scheme: [['Court of Record', 1], ['Another consequence', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): The farmer\'s right was an ordinary legal right, not a Fundamental Right. Explain why he could still go to the High Court for a writ.', model: 'Under **Article 226** a High Court can issue writs **for any other purpose**, not only for **Fundamental Rights**, so an ordinary legal right is also protected.', sol: 'Width of Article 226.', scheme: [['Article 226', 1], ['Any other purpose', 1]] }),
    ]),
  ],
}));

// ================================================================ t03 Subordinate courts
Q('m_dj_appoint', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Who appoints a District Judge?',
  opts: ['The Governor of the State, in consultation with the High Court', 'The President of India', 'The Chief Justice of India', 'The District Collector'],
  sol: 'Under Article 233, District Judges are appointed by the Governor in consultation with the High Court of the State. The President appoints High Court judges, and a Collector is an executive officer.',
}));
Q('m_dj_bar', mcq({
  t: 3, d: 3, c: 'recall',
  stem: 'An advocate who is not already in government service wishes to be appointed directly as a District Judge. For at least how many years must he have practised as an advocate?',
  opts: ['Seven years', 'Ten years', 'Three years', 'Fifteen years'],
  sol: 'Article 233 requires at least seven years as an advocate or pleader for direct appointment as a District Judge. Ten years is the requirement for a High Court judge.',
}));
Q('m_sessions_cases', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'In an imagined district, a man is charged with murder. Which court will try the case?',
  opts: ['The Sessions Court', 'The Court of the District Judge sitting on a civil matter', 'A Lok Adalat', 'The High Court in its advisory jurisdiction'],
  sol: 'Serious criminal offences such as murder are tried by the Sessions Court. Civil matters go to the District Judge\'s court; Lok Adalats cannot settle serious non-compoundable crimes; High Courts have no advisory jurisdiction.',
}));
Q('m_same_judge', mcq({
  t: 3, d: 3, c: 'understanding',
  stem: 'Why is the same judicial officer often described as both the District Judge and the Sessions Judge?',
  opts: [
    'He is called the District Judge when hearing civil cases and the Sessions Judge when hearing criminal cases',
    'He is elected twice, once by lawyers and once by the people',
    'He serves as District Judge in one State and Sessions Judge in another',
    'The titles are given by the Governor only during an emergency',
  ],
  sol: 'At the district level the senior-most judge usually handles both sides of the work: as District Judge for civil cases and as Sessions Judge for criminal cases. The other options describe arrangements that do not exist.',
}));
Q('m_death_confirm', mcq({
  t: 3, d: 3, c: 'application',
  stem: 'A Sessions Court in an imagined district sentences a convict to death. What must happen before the sentence can be carried out?',
  opts: ['The High Court must confirm the sentence', 'The District Collector must sign it', 'A Lok Adalat must approve it', 'The State Assembly must pass a resolution'],
  sol: 'A death sentence passed by a Sessions Court cannot be executed unless the High Court confirms it; the criminal procedure law requires this. Executive officers, Lok Adalats and legislatures have no such role.',
}));
Q('m_dj_civil', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which of the following is a work of the Court of the District Judge?',
  opts: [
    'Hearing appeals from lower civil courts in the district',
    'Trying cases of murder and dacoity',
    'Issuing writs to enforce Fundamental Rights',
    'Electing members of the Rajya Sabha',
  ],
  sol: 'The District Judge\'s court hears civil appeals from lower civil courts of the district and also tries important civil suits. Serious crimes go to the Sessions Court; writs are issued by the High Court and Supreme Court.',
}));
Q('ar_dj_hc', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'The High Court is consulted before a District Judge is appointed.',
  r: 'The High Court supervises the subordinate courts of the State and is best placed to judge the fitness of judicial officers.',
  sol: 'Both statements are true, and R explains A. Because the High Court superintends the district judiciary, the Constitution requires the Governor to consult it on appointments, which also protects the independence of the lower courts.',
}));
Q('tf_sessions_civil', tf({
  t: 3, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? The Sessions Court mainly hears disputes about property, contracts and rent.',
  sol: 'Property, contract and rent disputes are civil matters for civil courts headed by the District Judge. The Sessions Court tries serious criminal cases.',
}));
Q('ord_criminal', ord({
  t: 3, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange the courts in the order in which an imagined criminal case may climb, from where a serious offence is tried to the highest court of appeal.',
  items: [
    'Sessions Court (trial of the serious offence)',
    'High Court (appeal against the conviction)',
    'Supreme Court (further appeal)',
  ],
  sol: 'A serious offence is tried by the Sessions Court; an appeal against conviction lies to the High Court; a further appeal may go to the Supreme Court.',
}));
Q('s_dj_two', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two functions of the Court of the District Judge.',
  model: '1. It hears **appeals** against the decisions of **lower civil courts** in the district.\n2. It tries important **civil suits** (for example about property or succession) and **supervises** the subordinate civil courts of the district.',
  sol: 'Any two valid functions.',
  scheme: [['First function', 1], ['Second function', 1]],
}));
Q('s_sessions_two', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two functions of the Sessions Court.',
  model: '1. It tries **serious criminal cases** such as murder, robbery and dacoity, and can pass any sentence allowed by law, including **death** (which needs **High Court confirmation**).\n2. It hears **appeals** against judgements of **magistrates\' courts** in the district.',
  sol: 'Trials of serious crimes; appeals from magistrates.',
  scheme: [['Trial of serious offences', 1], ['Appeals from magistrates', 1]],
}));
Q('s_dj_vs_sessions', short({
  t: 3, d: 2, c: 'analysis', marks: 2, wl: S2,
  stem: 'Distinguish between the Court of the District Judge and the Sessions Court.',
  model: 'The **Court of the District Judge** deals with **civil** cases: disputes about property, contracts, family matters and civil appeals. The **Sessions Court** deals with **criminal** cases: serious offences and appeals from magistrates.',
  sol: 'Civil versus criminal, with one example each.',
  scheme: [['District Judge: civil cases', 1], ['Sessions Court: criminal cases', 1]],
}));
Q('s3_dj_route', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Kavita (imagined) loses a dispute about her shop\'s rent in a lower civil court of her district. Trace three steps she could take through the courts if she remains dissatisfied.',
  model: '1. She can appeal to the **Court of the District Judge**, which hears civil appeals from lower civil courts.\n2. If she loses there, she can take a further appeal to the **High Court** of the State.\n3. If a substantial question of law is involved, an appeal may finally lie to the **Supreme Court**. (At any stage the parties may also try to settle at a **Lok Adalat**.)',
  sol: 'District Judge, High Court, Supreme Court in order.',
  scheme: [['District Judge', 1], ['High Court', 1], ['Supreme Court', 1]],
}));
Q('l_subordinate', long({
  t: 3, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'Read the situation and answer. *(Imagined.)* A class visits the district court complex of Kesarganj and sees two courtrooms marked "District Judge" and "Sessions Judge".\n\n(i) Explain how a District Judge is appointed and the qualification for direct appointment. **[3]**\n(ii) Describe the functions of the Court of the District Judge. **[3]**\n(iii) Describe the functions of the Sessions Court and explain why the same officer may sit in both courtrooms. **[4]**',
  model: '(i) A District Judge is appointed by the **Governor** of the State **in consultation with the High Court** (**Article 233**). A person not already in judicial service must have been an **advocate for at least seven years** and be recommended by the High Court.\n\n(ii) The Court of the District Judge is the **highest civil court** of the district. It hears **appeals** from lower civil courts, tries important **civil suits** about property, succession and contracts, and **supervises** the subordinate civil courts.\n\n(iii) The **Sessions Court** tries **serious criminal cases** such as murder and dacoity, hears **appeals from magistrates**, and can pass any lawful sentence; a **death sentence** must be **confirmed by the High Court**. The **same judicial officer** usually heads both: he is called the **District Judge** when hearing **civil** matters and the **Sessions Judge** when hearing **criminal** matters.',
  sol: 'Appointment and qualification; civil functions; criminal functions and the dual title.',
  scheme: [['(i) Governor in consultation with the High Court', 2], ['(i) Seven years as an advocate', 1], ['(ii) Civil appeals', 1], ['(ii) Civil suits and supervision', 2], ['(iii) Sessions Court functions and confirmation', 2], ['(iii) Same officer: District Judge and Sessions Judge', 2]],
}));
Q('l_hierarchy', long({
  t: [3, 2], d: 4, c: 'evaluation', marks: 10, wl: L10,
  stem: 'Study the hierarchy of courts in a State shown in the diagram and answer.\n\n(i) Name the courts at each level from the district to the State, and say which kind of case each district court handles. **[3]**\n(ii) Explain how the High Court controls the courts below it. **[3]**\n(iii) Evaluate two advantages of having a single integrated hierarchy of courts in India. **[4]**',
  model: '(i) At the bottom are **lower civil courts** and **magistrates\' courts**; above them, the **Court of the District Judge** (civil cases) and the **Sessions Court** (serious criminal cases); at the top of the State is the **High Court**, and above it the **Supreme Court**.\n\n(ii) The High Court has **superintendence** over all courts and tribunals in its territory under **Article 227**; it hears **appeals** and **revisions** from them; it is **consulted** on the appointment, posting and promotion of district judges; and its judgements as a **Court of Record** bind them.\n\n(iii) First, a **single chain of appeal** lets a citizen take a case from the district to the **Supreme Court**, so mistakes can be corrected. Second, decisions of higher courts **bind** lower courts, which keeps the **law uniform** across the country. A balanced view: the hierarchy also brings **delays**, which is why **Lok Adalats** are used to settle simpler disputes.',
  sol: 'Levels and case types; High Court control; two advantages with a balanced evaluation.',
  scheme: [['(i) Levels named in order', 2], ['(i) Civil and criminal branches', 1], ['(ii) Superintendence and appeals', 2], ['(ii) Consultation or binding judgements', 1], ['(iii) Two advantages', 2], ['(iii) Balanced evaluation', 2]],
  assets: [hierarchySvg('Box diagram of the courts in a State: the Supreme Court above the High Court; below the High Court, the Court of the District Judge for civil cases and the Sessions Court for serious criminal cases; below them, lower civil courts and magistrates\' courts', 'Hierarchy of courts in a State (schematic).')],
}));
Q('sb_district_notice', source({
  t: 3, d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the imagined notice board entry from a district court complex and answer the questions that follow. ${IMAG}`,
  passage: '**Cause list, district courts of Neelganga (imagined)**\n\nCourtroom 1 (Shri A. Rao, presiding): Appeal by Smt. Lata against the order of the Civil Judge in a dispute over a family house; suit about the sale of a tea garden worth a large sum.\n\nCourtroom 1 (afternoon, the same officer presiding): Trial of three accused in a dacoity case; appeal by a convict against a judgement of the Judicial Magistrate.\n\nNote: Records of a case decided in this court last month have been called for by the High Court.',
  parts: [
    child('a', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'In the morning, Shri Rao sits as which judge?', model: 'As the **District Judge**, hearing **civil** matters.', sol: 'Civil work at the district level.', scheme: [['District Judge', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'In the afternoon, which court is he holding?', model: 'The **Sessions Court**, hearing **criminal** matters.', sol: 'Criminal work at the district level.', scheme: [['Sessions Court', 1]] })),
    child('c', short({ t: [3, 2], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Why might the High Court have called for the records of a case decided last month? Name the power used.', model: 'To check whether the court acted **without jurisdiction** or with serious **irregularity**, using its **revisory** jurisdiction (and its **superintendence** under **Article 227**).', sol: 'Revisory jurisdiction with a reason.', scheme: [['Reason', 1], ['Revisory jurisdiction', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): If the dacoity trial ends in a death sentence, explain what must happen next and why.', model: 'The sentence must be **confirmed by the High Court** before it is carried out, because the law requires a **higher court** to review the **gravest punishment**.', sol: 'Confirmation by the High Court with a reason.', scheme: [['Confirmation by the High Court', 1], ['Reason', 1]] }),
    ]),
  ],
}));

// ================================================================ t04 Lok Adalats
Q('m_la_meaning', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'What is a Lok Adalat?',
  opts: [
    'A people\'s court that settles disputes by compromise and agreement between the parties',
    'A special bench of the Supreme Court for constitutional cases',
    'A village council that elects the sarpanch',
    'A tribunal that hears appeals from the High Court',
  ],
  sol: 'A Lok Adalat ("people\'s court") settles pending or pre-litigation disputes by conciliation and mutual agreement. It is not a bench of the Supreme Court, an electoral body or an appeal tribunal.',
}));
Q('m_la_act', mcq({
  t: 4, d: 2, c: 'recall',
  stem: 'Which law gave Lok Adalats statutory status?',
  opts: ['The Legal Services Authorities Act, 1987', 'The Representation of the People Act, 1951', 'The Indian Councils Act, 1861', 'The Right to Information Act, 2005'],
  sol: 'The Legal Services Authorities Act, 1987 gave Lok Adalats a statutory basis and made their awards binding. The other Acts deal with elections, colonial councils and access to information.',
}));
Q('m_la_appeal', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Two imagined neighbours settle a boundary dispute at a Lok Adalat. One of them later wants to appeal against the award. What is the position?',
  opts: [
    'No appeal lies; the award is final and binding like a decree of a civil court',
    'He may appeal to the High Court within one week',
    'He may appeal to the Sessions Court',
    'He may ask the Governor to cancel the award',
  ],
  sol: 'An award of a Lok Adalat is treated as a decree of a civil court, is final and binding on the parties, and no appeal lies against it, because it is based on their own agreement.',
}));
Q('m_la_fee', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'A widow in an imagined town has a pending claim for insurance money and very little cash. Why might her lawyer suggest taking the case to a Lok Adalat?',
  opts: [
    'No court fee is charged, and any fee already paid on a pending case is refunded if it is settled there',
    'A Lok Adalat can award her punishment against the insurer',
    'A Lok Adalat case automatically goes to the Supreme Court',
    'Only lawyers above ten years\' standing can appear there',
  ],
  sol: 'There is no court fee in a Lok Adalat, and the fee paid on a case pending in a regular court is refunded when the case is settled there, so it suits a person of small means. A Lok Adalat does not punish, does not send cases to the Supreme Court, and is informal.',
}));
Q('m_la_not', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'Which of these disputes is a Lok Adalat NOT meant to settle?',
  opts: [
    'A serious criminal charge, such as murder, that the law does not allow to be compromised',
    'A claim for compensation after a road accident',
    'A dispute between a bank and a borrower over a loan',
    'A quarrel between neighbours over a drain',
  ],
  sol: 'Lok Adalats settle civil disputes and compoundable matters by agreement; offences that the law does not allow to be compromised, such as murder, must be tried by the regular criminal courts. Accident claims, bank loans and neighbourhood quarrels are typical Lok Adalat matters.',
}));
Q('ar_la_speedy', ar({
  t: 4, d: 2, c: 'analysis', verdict: 'both-true-explains',
  a: 'Lok Adalats help reduce the number of cases pending in regular courts.',
  r: 'They settle disputes quickly through informal procedure and agreement, without the long stages of a regular trial.',
  sol: 'Both statements are true, and R explains A. Because cases are settled by compromise in a single sitting or a few sittings, many disputes leave the regular courts, easing the backlog.',
}));
Q('tf_la_decree', tf({
  t: 4, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? An award made by a Lok Adalat is deemed to be a decree of a civil court.',
  sol: 'Under the Legal Services Authorities Act, 1987, a Lok Adalat\'s award is deemed a decree of a civil court and is final and binding.',
}));
Q('fb_la_people', fb({
  t: 4, d: 1, c: 'recall',
  stem: 'The words "Lok Adalat" mean a ___ court.',
  acc: [["people's", 'peoples', 'people']],
  sol: 'Lok Adalat means a people\'s court.',
}));
Q('s_la_two', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give two advantages of Lok Adalats for ordinary citizens.',
  model: '1. Justice is **quick and cheap**: **no court fee** is charged, and fee paid on a pending case is **refunded** on settlement.\n2. The procedure is **informal** and based on **agreement**, so the parties stay on good terms and **no appeal** drags it on.',
  sol: 'Any two valid advantages.',
  scheme: [['First advantage', 1], ['Second advantage', 1]],
}));
Q('s_la_who', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Who usually conducts a Lok Adalat, and what kinds of cases can come before it?',
  model: 'A Lok Adalat is usually conducted by a **serving or retired judicial officer** with **one or two other members**, such as a lawyer or social worker. Cases can be **pending in a court** or **at the pre-litigation stage**, mainly **civil** and **compoundable** disputes.',
  sol: 'Who presides; what cases.',
  scheme: [['Who conducts it', 1], ['Kinds of cases', 1]],
}));
Q('s3_la_compare', short({
  t: 4, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Compare a Lok Adalat with a regular civil court on three points.',
  model: '1. **Method:** a Lok Adalat settles by **compromise**; a regular court **decides** after a contested trial.\n2. **Cost and speed:** a Lok Adalat charges **no court fee** and is **quick**; a regular court involves **fees** and often **long delays**.\n3. **Appeal:** a Lok Adalat\'s award is **final, with no appeal**; a regular court\'s decree can be **appealed** to a higher court.',
  sol: 'Three distinct points of comparison.',
  scheme: [['Method', 1], ['Cost and speed', 1], ['Appeal', 1]],
}));
Q('l_lok_adalat', long({
  t: 4, d: 3, c: 'evaluation', marks: 10, wl: L10,
  stem: 'Read the situation and answer. *(Imagined.)* A district in Varunpradesh has tens of thousands of cases waiting in its courts, many of them over small loans, rent and road accidents.\n\n(i) Explain what a Lok Adalat is and how it works. **[3]**\n(ii) Describe the legal status of its awards. **[3]**\n(iii) Evaluate how far Lok Adalats can help this district, giving one limitation. **[4]**',
  model: '(i) A **Lok Adalat** is a **people\'s court** where a **judicial officer** with one or two other members helps the parties reach a **compromise**. It takes up cases **pending in courts** or at the **pre-litigation** stage, works **informally** and charges **no court fee**.\n\n(ii) Under the **Legal Services Authorities Act, 1987**, an award is **deemed a decree of a civil court**. It is **final and binding** on the parties and **no appeal** lies against it; fee paid on a pending case is **refunded**.\n\n(iii) Lok Adalats suit this district well: loan, rent and accident claims are usually **civil and compoundable**, and **one sitting** can settle **many cases**, cutting the **backlog** and saving **money** for poor litigants. A **limitation** is that they work only when **both sides agree**; a party who refuses, or a **serious criminal** case, must still go to the regular courts.',
  sol: 'Meaning and working; legal status; evaluation with a limitation.',
  scheme: [['(i) People\'s court and compromise', 2], ['(i) Informal, no fee', 1], ['(ii) Act of 1987 and deemed decree', 2], ['(ii) Final, no appeal', 1], ['(iii) How it helps the district', 2], ['(iii) A limitation', 2]],
}));
Q('sb_la_camp', source({
  t: 4, d: 3, c: 'evaluation', origin: 'soyl-original',
  stem: `Read the imagined report in a district newsletter and answer the questions that follow. ${IMAG}`,
  passage: '**One Saturday at the court complex (imagined newsletter, Kesarganj)**\n\nLast Saturday, benches made up of a retired judge, a lawyer and a social worker met in the court complex from ten in the morning. By evening, 412 cases had been settled: bank loans, electricity bills, claims after road accidents and a few family quarrels. A farmer said his case over a tractor loan had been pending for four years; it ended in an hour, and he will get back the court fee he had paid. Two parties in a land dispute could not agree, and their case went back to the regular court.',
  parts: [
    child('a', short({ t: 4, d: 1, c: 'recall', marks: 1, stem: 'Identify the institution described in the report.', model: 'A **Lok Adalat** (people\'s court).', sol: 'Settlement by agreement; no fee.', scheme: [['Lok Adalat', 1]] })),
    child('b', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Quote one sign from the report that justice there is cheap.', model: 'The farmer **will get back the court fee** he had paid.', sol: 'Refund of court fee.', scheme: [['Refund of fee', 1]] })),
    child('c', short({ t: 4, d: 3, c: 'evaluation', marks: 2, stem: '**Either** (i): Why did the land dispute go back to the regular court? What does this show about a limitation of Lok Adalats?', model: 'The parties **could not agree**, and a Lok Adalat **cannot impose** a decision; it works **only by consent**, so contested cases remain with the regular courts.', sol: 'Consent-based limitation.', scheme: [['Reason', 1], ['Limitation', 1]] }), [
      short({ t: 4, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Using the report, give two reasons why such sittings help the court system as a whole.', model: 'They **settle many cases in a day** (412 here), reducing the **backlog**, and they end **old cases** quickly (four years pending), freeing judges\' time.', sol: 'Two reasons from the report.', scheme: [['Backlog reduced', 1], ['Old cases closed quickly', 1]] }),
    ]),
  ],
}));

// ---------------------------------------------------------------- extra items (t01–t04) for checks and balance
Q('m_224_acting', mcq({
  t: 1, d: 3, c: 'application',
  stem: 'A permanent judge of an imagined High Court falls ill for six months. Whom can the President appoint to do that judge\'s work meanwhile?',
  opts: ['An acting judge', 'A Lok Adalat bench', 'The District Collector', 'A member of the State Legislative Council'],
  sol: 'When a permanent judge is absent or unable to act, the President may appoint an acting judge (Article 224). The other options are not judges of the High Court.',
}));
Q('m_writ_area', mcq({
  t: 2, d: 3, c: 'application',
  stem: 'A citizen of an imagined State wants a writ against an officer working in that same State. Which statement about where she can go is correct?',
  opts: [
    'She may approach either the High Court of the State or, for a Fundamental Right, the Supreme Court',
    'She may approach only the Court of the District Judge',
    'She may approach only a Lok Adalat',
    'She must first obtain the Governor\'s permission',
  ],
  sol: 'A High Court can issue writs within its territory under Article 226, and the Supreme Court can issue writs for Fundamental Rights under Article 32, so she has a choice. District courts and Lok Adalats do not issue writs, and no permission is needed.',
}));
Q('m_magistrate', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'A convict is unhappy with a judgement of a Judicial Magistrate\'s court in a theft case. To which court does his first appeal normally go?',
  opts: ['The Sessions Court', 'The Court of the District Judge on its civil side', 'The Supreme Court directly', 'A Lok Adalat'],
  sol: 'Appeals against judgements of magistrates in criminal cases go to the Sessions Court. Civil appeals go to the District Judge, the Supreme Court is not the first appeal court, and a Lok Adalat does not hear appeals.',
}));
Q('m_la_presiding', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Which of these best describes the members of a typical Lok Adalat bench?',
  opts: [
    'A serving or retired judicial officer, often joined by a lawyer or a social worker',
    'Three elected members of the State Legislative Assembly',
    'The Governor and two ministers',
    'Five judges of the Supreme Court',
  ],
  sol: 'A Lok Adalat bench is usually headed by a serving or retired judicial officer, with one or two other members such as a lawyer or social worker. Legislators, ministers and Supreme Court benches do not conduct Lok Adalats.',
}));
Q('m_review_whose', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Which of the following can a High Court examine under its power of judicial review?',
  opts: [
    'Both laws made by the State Legislature and laws made by Parliament, as well as executive orders',
    'Only the orders of the District Collector',
    'Only laws made before 1950',
    'Only decisions of Lok Adalats',
  ],
  sol: 'A High Court can test any law, State or Union, and any executive order against the Constitution and declare it void if it violates it. Its review is not limited to Collectors\' orders, older laws or Lok Adalat awards.',
}));
Q('s_why_la', short({
  t: 4, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'A bank in an imagined town has hundreds of small unpaid loans. Explain why it might prefer a Lok Adalat to filing separate suits.',
  model: 'Many loan cases can be **settled in one sitting** by **agreement** with borrowers, saving **time** and **court fees**; the **award is final**, so the bank recovers money **without long appeals**.',
  sol: 'Speed, cost and finality for a large number of small cases.',
  scheme: [['Speed for many cases', 1], ['Cost or finality', 1]],
}));
