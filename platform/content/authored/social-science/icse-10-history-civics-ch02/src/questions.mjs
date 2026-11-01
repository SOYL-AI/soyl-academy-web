// ICSE 10 History & Civics, ch02 Parliamentary Procedures and Powers of Parliament — question bank.
// Every scenario, diary and imagined member of Parliament is written by SOYL and labelled as imagined; no
// textbook text, box or exercise and no specimen or board-paper item is reused (D-036); no real person is
// quoted and no current office-holder is named. Facts are the stable provisions of the Constitution and the
// rules of procedure (Articles 85, 100, 108, 109, 110, 249, 312; Tenth Schedule; 52nd and 91st Amendments).
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child, Svg } from '../../icse-10-history-civics-ch01/src/lib.mjs';

const S2 = [25, 45];
const S3 = [40, 70];
const L10 = [120, 220];
const IMAG = '*(Imagined document written by SOYL for practice; the people in it are not real.)*';

// ---------------------------------------------------------------- figures used in items (asserted)
export const LS_SEATS_NOW = 543; // present elected membership
export const QUORUM_LS = Math.ceil(LS_SEATS_NOW / 10); // 55 with 543 members (one-tenth, rounded up)
assert.equal(QUORUM_LS, 55);
export const QUORUM_RS = Math.ceil(245 / 10); // Rajya Sabha of 245 members -> 25
assert.equal(QUORUM_RS, 25);
export const MONEY_BILL_DAYS = 14;
export const SESSION_GAP_MONTHS = 6;

/** A month strip for an imagined year of sittings: [label, startMonth, endMonth] (1 = January). */
export function sessionStrip(sessions, alt, caption) {
  const s = new Svg(720, 150);
  const X = (m) => 30 + (m - 1) * 55;
  const M = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D'];
  for (let m = 1; m <= 12; m++) {
    s.rect(X(m), 70, 55, 30, { rx: 0, color: 'muted', sw: 1 });
    s.text(X(m) + 27.5, 118, M[m - 1], { size: 12, muted: true });
  }
  sessions.forEach(([label, a, b]) => {
    s.rect(X(a) + 2, 72, (b - a + 1) * 55 - 4, 26, { rx: 4, fill: 'accent', fillOpacity: 0.35, color: 'accent', sw: 1.5 });
    s.text(X(a) + ((b - a + 1) * 55) / 2, 50, label, { size: 12, bold: true });
  });
  return s.visual(alt, caption);
}
/** Largest gap in whole months between the end of one session and the start of the next (wrapping to next year). */
export function maxGap(sessions) {
  const sorted = [...sessions].sort((p, q) => p[1] - q[1]);
  let g = 0;
  for (let i = 0; i < sorted.length; i++) {
    const end = sorted[i][2];
    const next = i + 1 < sorted.length ? sorted[i + 1][1] : sorted[0][1] + 12;
    g = Math.max(g, next - end - 1);
  }
  return g;
}
export const SESS_OK = [['Budget', 2, 4], ['Monsoon', 7, 8], ['Winter', 11, 12]];
export const SESS_BAD = [['Budget', 2, 3], ['Winter', 11, 12]];
assert.equal(maxGap(SESS_OK), 2);
assert.equal(maxGap(SESS_BAD), 7);

// ================================================================ t01 Sessions and quorum
Q('m_who_summons', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Which authority formally summons each House of Parliament to meet for a session?',
  opts: ['The President of India', 'The Prime Minister', 'The Speaker of the Lok Sabha', 'The Chief Justice of India'],
  sol: 'The Constitution gives the President the power to summon and prorogue the Houses (on the advice of the Council of Ministers). The Prime Minister advises but does not summon; the Speaker presides over sittings; the Chief Justice has no role here.',
}));
Q('m_gap_rule', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'What is the longest interval the Constitution allows between the last sitting of one session of Parliament and the first sitting of the next?',
  opts: ['Six months', 'Three months', 'Nine months', 'One year'],
  sol: 'Parliament must meet at least twice a year, and the gap between two sessions cannot exceed six months. The other periods are not in the Constitution.',
}));
Q('m_strip_gap', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'The strip shows the sittings planned for an imagined year: a Budget Session from February to March and a Winter Session in November and December, with nothing in between. What is wrong with this plan?',
  opts: [
    'The gap between the two sessions is longer than six months, which the Constitution does not allow',
    'Parliament may not meet in winter',
    'A Budget Session must last at least six months',
    'There is nothing wrong, because two sessions a year are enough in every case',
  ],
  sol: `From the end of March to the start of November is ${maxGap(SESS_BAD)} months, more than the six-month limit. Two sessions a year satisfy the minimum number, but not the rule on the gap. Winter sittings are normal, and no session has a fixed minimum length.`,
  assets: [sessionStrip(SESS_BAD, 'Month strip for an imagined year: a Budget Session shaded in February and March and a Winter Session shaded in November and December; April to October are empty', 'Imagined plan of sittings.')],
}));
Q('m_quorum_meaning', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'In the working of either House of Parliament, what does the word quorum refer to?',
  opts: [
    'The minimum number of members who must be present for the House to transact business',
    'The number of votes needed to pass a Money Bill',
    'The total strength of the House fixed by the Constitution',
    'The members who belong to the ruling party',
  ],
  sol: 'Quorum is the minimum attendance needed for a valid sitting: one-tenth of the total membership of the House. It is not a voting majority, the full strength, or a party group.',
}));
Q('n_quorum_ls', mcq({
  t: 1, d: 2, c: 'application',
  stem: `At a sitting of the Lok Sabha with its present membership of ${LS_SEATS_NOW}, only 48 members are in the chamber when the bell rings. What should the presiding officer do?`,
  opts: [
    `Adjourn or suspend the sitting until at least ${QUORUM_LS} members are present`,
    'Continue, because any number of members is enough once the session has begun',
    'Ask the President to dissolve the Lok Sabha',
    'Pass only Money Bills until more members arrive',
  ],
  sol: `One-tenth of ${LS_SEATS_NOW} is ${QUORUM_LS} (rounded up), so 48 members are short of the quorum. Without a quorum the House cannot do business and the presiding officer must adjourn or suspend the sitting. Dissolution and money bills have nothing to do with attendance.`,
}));
Q('fb_three_sessions', fb({
  t: 1, d: 1, c: 'recall',
  stem: 'By convention Parliament usually meets in three sessions a year: the Budget Session, the ___ Session and the Winter Session.',
  acc: [['Monsoon']],
  sol: 'The usual pattern is the Budget Session (early in the year), the Monsoon Session (around July to September) and the Winter Session (November to December).',
}));
Q('tf_prorogue', tf({
  t: 1, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? When the President prorogues the Lok Sabha at the end of a session, the House is dissolved and a general election must follow.',
  sol: 'Prorogation only ends a session; the House continues and meets again in the next session. Dissolution, which ends the life of the Lok Sabha and leads to an election, is a separate act.',
}));
Q('s_quorum_why', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain why a minimum attendance rule matters for the decisions of a legislature, and state the quorum fixed for each House of Parliament.',
  model: 'It ensures that laws and decisions are not made by a handful of members, so they carry the authority of the House. The quorum is **one-tenth of the total membership** in both the **Lok Sabha** and the **Rajya Sabha**.',
  sol: 'One reason, then the one-tenth rule for both Houses.',
  scheme: [['Why a minimum attendance matters', 1], ['One-tenth of total membership in each House', 1]],
}));

// ================================================================ t02 Question Hour and Zero Hour
Q('m_qh_when', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'At which point of a normal day\'s sitting of the Lok Sabha is Question Hour usually held?',
  opts: ['In the first hour of the sitting', 'In the last hour of the sitting', 'Only on Fridays after lunch', 'Only during the Budget Session'],
  sol: 'Question Hour normally takes up the first hour of every sitting. It is not kept for the end of the day, a particular weekday or a particular session.',
}));
Q('m_starred_reply', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which feature tells a starred question apart from an unstarred question during Question Hour?',
  opts: [
    'A starred question gets an oral reply on the floor, and members may ask supplementary questions',
    'A starred question is answered only in writing',
    'A starred question can be asked without any notice',
    'A starred question can be asked only by ministers',
  ],
  sol: 'Starred questions (marked with an asterisk) are answered orally, and supplementaries can follow. Unstarred questions get written answers with no supplementaries. Questions without the usual notice are short notice questions, and ministers answer rather than ask.',
}));
Q('m_short_notice_case', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Floods have cut off several imagined villages two days before a sitting, and a member wants an oral answer from the minister at once instead of waiting for the usual notice period. Which device suits her best?',
  opts: ['A short notice question', 'An unstarred question', 'A no-confidence motion', 'A Money Bill'],
  sol: 'A short notice question deals with an urgent matter of public importance and can be asked with less than ten days\' notice, for an oral reply. An unstarred question gets only a written reply after the normal notice; a no-confidence motion targets the whole government; a Money Bill is a law on taxes and spending.',
}));
Q('m_zero_hour', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which statement about Zero Hour in Parliament is correct?',
  opts: [
    'It follows Question Hour and lets members raise urgent matters; it is a practice, not a rule written in the procedure book',
    'It is the first hour of the sitting, set aside for starred questions',
    'It is laid down in the Constitution as a fundamental duty of members',
    'It is the time when the President addresses both Houses',
  ],
  sol: 'Zero Hour begins after Question Hour (around noon) and grew up as a parliamentary practice; it is not provided for in the rules of procedure. The first hour is Question Hour; the Constitution does not mention Zero Hour; the President\'s address is a separate event.',
}));
Q('tf_unstarred_supp', tf({
  t: 2, d: 1, c: 'recall', ans: false,
  stem: 'True or false? A member who receives a written reply to an unstarred question may immediately ask supplementary questions on the floor of the House.',
  sol: 'Unstarred questions are answered in writing and are not taken up orally, so no supplementary questions arise. Supplementaries are allowed only on starred (oral) questions.',
}));
Q('mt_questions', match({
  t: 2, d: 2, c: 'understanding',
  stem: 'Match each parliamentary device with the description of how it is used.',
  pairs: [
    ['Starred question', 'Oral answer, followed by supplementaries'],
    ['Unstarred question', 'Written answer placed on the table'],
    ['Short notice question', 'Urgent matter, asked with less than ten days\' notice'],
    ['Zero Hour', 'Matters raised after Question Hour without the usual notice'],
  ],
  sol: 'Starred: oral answer with supplementaries. Unstarred: written answer. Short notice: urgent, less than ten days\' notice. Zero Hour: urgent matters raised after Question Hour.',
}));
Q('s_qh_control', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined member asks the railway minister during Question Hour why a new line promised in her district has not begun. Explain how such questioning helps Parliament keep the executive accountable.',
  model: 'The minister must reply **publicly** and on record, so the government has to **explain its actions** and delays. Facts brought out in replies can lead to debates and **pressure for corrective action**, which keeps ministers answerable to Parliament.',
  sol: 'Public reply on record, and the pressure it creates.',
  scheme: [['Minister must explain in public', 1], ['Leads to pressure or corrective action', 1]],
}));
Q('s_starred_unstarred', short({
  t: 2, d: 1, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give two differences between starred and unstarred questions in the Lok Sabha.',
  model: '1. A **starred** question is answered **orally** in the House; an **unstarred** one gets a **written** reply.\n2. **Supplementary questions** can follow a starred question but **not** an unstarred one.',
  sol: 'Mode of reply; supplementaries.',
  scheme: [['Oral versus written reply', 1], ['Supplementaries allowed only on starred', 1]],
}));
Q('s_zero_value', short({
  t: 2, d: 3, c: 'evaluation', marks: 2, wl: S2,
  stem: 'Some observers praise Zero Hour, while others say it can become noisy and disorderly. Give one argument on each side.',
  model: '**For:** it lets members raise **urgent public problems** at once, without waiting for notice, so new issues reach the government quickly.\n**Against:** because it has **no fixed rules**, many members speak at the same time and the time can be lost in **disorder**.',
  sol: 'One merit and one limitation, each with a reason.',
  scheme: [['Argument in favour with reason', 1], ['Argument against with reason', 1]],
}));

// ================================================================ t03 Adjournment motion and no-confidence motion
Q('m_adjourn_purpose', mcq({
  t: 3, d: 1, c: 'understanding',
  stem: 'What is the purpose of moving an adjournment motion in the Lok Sabha?',
  opts: [
    'To set aside the normal business of the House and discuss a definite matter of urgent public importance',
    'To end the session of Parliament',
    'To remove the Speaker from office',
    'To pass the annual budget without debate',
  ],
  sol: 'An adjournment motion interrupts the listed business so that a definite, urgent matter can be debated. It does not end a session (prorogation), remove the Speaker (a separate resolution) or pass the budget.',
}));
Q('m_adjourn_support', mcq({
  t: 3, d: 2, c: 'recall',
  stem: 'How many members of the Lok Sabha must support the request before the Speaker allows an adjournment motion to be taken up?',
  opts: ['At least 50', 'At least 10', 'At least 100', 'One-third of the House'],
  sol: 'An adjournment motion can be taken up only if at least 50 members rise in its support. The other numbers are not the rule.',
}));
Q('m_nc_where', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Why can a no-confidence motion against the Council of Ministers be moved only in the Lok Sabha?',
  opts: [
    'The Council of Ministers is collectively responsible to the Lok Sabha',
    'The Rajya Sabha has no members from political parties',
    'The Rajya Sabha meets only during the Budget Session',
    'The President is a member of the Rajya Sabha',
  ],
  sol: 'Ministers hold office as long as they have the confidence of the Lok Sabha, the directly elected House, so only the Lok Sabha can withdraw that confidence. The Rajya Sabha has party members and meets in every session, and the President belongs to neither House.',
}));
Q('m_nc_result', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'In an imagined year, a no-confidence motion against the government is passed by a majority of the Lok Sabha. What follows?',
  opts: [
    'The whole Council of Ministers, headed by the Prime Minister, must resign',
    'Only the minister who answered the most questions must resign',
    'The Rajya Sabha must vote on the same motion before anything happens',
    'The President must resign',
  ],
  sol: 'Because ministers are collectively responsible to the Lok Sabha, losing its confidence brings down the whole Council of Ministers. A single minister cannot be targeted by this motion, the Rajya Sabha has no role, and the President is not affected.',
}));
Q('ar_nc_collective', ar({
  t: 3, d: 2, c: 'analysis', verdict: 'both-true-explains',
  a: 'If a no-confidence motion is passed in the Lok Sabha, every minister has to leave office together.',
  r: 'The Council of Ministers is collectively responsible to the Lok Sabha.',
  sol: 'Both are true, and collective responsibility is exactly why the defeat of the government in the Lok Sabha removes all ministers at once.',
}));
Q('ar_adjourn_rs', ar({
  t: 3, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: 'An adjournment motion is commonly moved in the Rajya Sabha to censure the government.',
  r: 'An adjournment motion draws attention to a definite matter of urgent public importance.',
  sol: 'A is false: the adjournment motion, which carries an element of censure of the government, is used in the Lok Sabha, not the Rajya Sabha. R is true: it is moved to discuss a definite matter of urgent public importance.',
}));
Q('s_adjourn_vs_nc', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Distinguish between an adjournment motion and a no-confidence motion with respect to their aim and their effect on the government.',
  model: 'An **adjournment motion** aims to discuss **one urgent matter**; even if it is carried, the government **stays in office**. A **no-confidence motion** questions the **whole government**; if it is passed, the **Council of Ministers must resign**.',
  sol: 'Aim and effect of each.',
  scheme: [['Adjournment motion: one urgent matter, government stays', 1], ['No-confidence: whole government, must resign', 1]],
}));
Q('s3_nc_procedure', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'Opposition members in an imagined Lok Sabha believe the government has lost majority support. Describe the procedure they must follow to test this through a no-confidence motion.',
  model: '1. A member gives **written notice** of the motion; it can be moved **only in the Lok Sabha**.\n2. The Speaker admits it if at least **50 members** rise in its support; it need not state any reasons.\n3. After a **debate**, the House **votes**; if a majority supports the motion, the **Council of Ministers must resign**.',
  sol: 'Notice, support of 50, debate and vote, consequence.',
  scheme: [['Notice; Lok Sabha only', 1], ['Support of 50 members to admit', 1], ['Debate, vote and resignation if passed', 1]],
}));

// ================================================================ t04 Anti-Defection Law
Q('m_tenth_schedule', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'The provisions on disqualification of legislators for changing parties were added as the Tenth Schedule by which constitutional amendment?',
  opts: ['The 52nd Amendment (1985)', 'The 42nd Amendment (1976)', 'The 44th Amendment (1978)', 'The 73rd Amendment (1992)'],
  sol: 'The Anti-Defection Law came with the 52nd Amendment in 1985. The 42nd and 44th Amendments dealt with other matters (including emergency provisions), and the 73rd created the panchayati raj framework.',
}));
Q('m_defect_case', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'An imagined member elected on a party ticket votes against her party\'s written direction on an important bill, without its permission, and the party does not condone the vote within the time allowed. Under the Anti-Defection Law she may be',
  opts: ['disqualified from the House', 'sent to prison', 'made a minister', 'asked to contest the next presidential election'],
  sol: 'Voting or abstaining against the party\'s direction without permission, if not condoned within the time allowed, is a ground for disqualification. The law does not impose imprisonment or offer office.',
}));
Q('m_independent_join', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'An imagined member elected as an independent joins a political party one year after the election. What is the position under the Anti-Defection Law?',
  opts: [
    'He becomes liable to disqualification, because an independent member may not join a party after election',
    'Nothing happens, because independents are outside the law',
    'He must first resign from the party he never belonged to',
    'He automatically becomes the leader of the opposition',
  ],
  sol: 'An independent member who joins a party after election is disqualified under the Tenth Schedule. The law covers independents too, and joining a party gives no special post.',
}));
Q('m_who_decides', mcq({
  t: 4, d: 2, c: 'recall',
  stem: 'Who decides, in the first instance, whether a member of the Lok Sabha has become disqualified on grounds of defection?',
  opts: ['The Speaker of the Lok Sabha', 'The President of India', 'The Election Commission', 'The leader of the member\'s party'],
  sol: 'Under the Tenth Schedule, the Speaker (in the Rajya Sabha, the Chairman) decides questions of disqualification for defection; the Supreme Court has held that such decisions are open to judicial review. The President, Election Commission and party leaders do not decide these cases.',
}));
Q('ar_merger', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'Members are not disqualified when at least two-thirds of their legislature party agree to merge with another party.',
  r: 'The Anti-Defection Law was added to the Constitution in 1985.',
  sol: 'Both are true. Merger with the support of two-thirds of the legislature party is an exception under the Tenth Schedule, and the law dates from 1985; but the date of the law does not explain why mergers are exempt, so R is not the explanation.',
}));
Q('tf_split', tf({
  t: 4, d: 3, c: 'understanding', ans: false,
  stem: 'True or false? Under the present Anti-Defection Law, a group of one-third of a legislature party can split away and escape disqualification.',
  sol: 'The 91st Amendment (2003) removed the exception for a split by one-third of the members. Only a merger supported by two-thirds of the legislature party is now protected.',
}));
Q('s_defection_grounds', short({
  t: 4, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State any two grounds on which a member of a House of Parliament can be disqualified under the Anti-Defection Law.',
  model: '1. The member **voluntarily gives up membership** of the party on whose ticket he was elected.\n2. The member **votes or abstains against the party\'s direction** without permission, and the act is not condoned within the time allowed. (Also: an independent joining a party.)',
  sol: 'Any two correct grounds.',
  scheme: [['First ground', 1], ['Second ground', 1]],
}));
Q('s_defection_stability', short({
  t: 4, d: 3, c: 'evaluation', marks: 2, wl: S2,
  stem: 'Explain how the Anti-Defection Law can help keep governments stable, and give one criticism of it.',
  model: 'It discourages members from changing sides for **office or money**, so governments are not brought down by sudden **floor-crossing**. **Criticism:** it restricts a member\'s **freedom to vote by conscience**, because voting against the party whip can cost the seat.',
  sol: 'One way it adds stability; one criticism.',
  scheme: [['How it promotes stability', 1], ['A valid criticism', 1]],
}));
Q('s3_defection_cases', short({
  t: 4, d: 4, c: 'application', marks: 3, wl: S3,
  stem: 'Three imagined members act as follows: (a) a nominated member joins a party in the third month after taking her seat; (b) an elected member formally resigns from his party; (c) two-thirds of a small party\'s members agree to merge with a larger party. State, with reasons, whether each is disqualified.',
  model: '(a) **Not disqualified:** a nominated member may join a party within **six months** of taking her seat.\n(b) **Disqualified:** giving up party membership **voluntarily** is defection.\n(c) **Not disqualified:** a **merger** backed by **two-thirds** of the legislature party is an exception.',
  sol: 'Apply the six-month rule, voluntary resignation and the merger exception.',
  scheme: [['(a) with reason', 1], ['(b) with reason', 1], ['(c) with reason', 1]],
}));

// ================================================================ t05 Passing of an Ordinary Bill and a Money Bill
Q('m_money_bill_where', mcq({
  t: 5, d: 1, c: 'recall',
  stem: 'In which House can a Money Bill be introduced?',
  opts: ['Only in the Lok Sabha', 'Only in the Rajya Sabha', 'In either House', 'Only at a joint sitting of both Houses'],
  sol: 'A Money Bill can be introduced only in the Lok Sabha, on the recommendation of the President. It cannot begin in the Rajya Sabha, and joint sittings are not used for Money Bills.',
}));
Q('m_rs_days', mcq({
  t: 5, d: 1, c: 'recall',
  stem: 'Within how many days must the Rajya Sabha return a Money Bill sent to it by the Lok Sabha?',
  opts: [`${MONEY_BILL_DAYS} days`, '30 days', 'Six months', '7 days'],
  sol: `The Rajya Sabha must return a Money Bill within ${MONEY_BILL_DAYS} days, with or without recommendations; otherwise it is deemed to have been passed by both Houses.`,
}));
Q('m_certify', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'Two imagined members disagree on whether a bill on income tax rates is a Money Bill. Whose decision on this question is final?',
  opts: ['The Speaker of the Lok Sabha', 'The Chairman of the Rajya Sabha', 'The Finance Minister', 'The Attorney General'],
  sol: 'The Speaker certifies whether a bill is a Money Bill, and that decision is final for the purposes of the Constitution. The Chairman, the Finance Minister and the Attorney General do not decide this.',
}));
Q('m_deadlock', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'An imagined ordinary bill on forest protection is passed by the Lok Sabha, but the Rajya Sabha rejects it outright. How can the deadlock be resolved under the Constitution?',
  opts: [
    'The President may summon a joint sitting of both Houses, presided over by the Speaker',
    'The bill lapses permanently and can never be brought again',
    'The Supreme Court decides whether the bill should become law',
    'The Rajya Sabha\'s decision is final because it represents the States',
  ],
  sol: 'For an ordinary bill, disagreement between the Houses (rejection, unacceptable amendments, or no action for six months) can be resolved at a joint sitting summoned by the President and presided over by the Speaker. The bill does not lapse for ever, courts do not decide on passing bills, and the Rajya Sabha has no final veto.',
}));
Q('m_president_money', mcq({
  t: 5, d: 3, c: 'analysis',
  stem: 'Which action is open to the President in the case of an ordinary bill but NOT in the case of a Money Bill passed by Parliament?',
  opts: [
    'Returning the bill to Parliament for reconsideration',
    'Giving assent to the bill',
    'Signing the bill into law',
    'Allowing the bill to be published in the Gazette after assent',
  ],
  sol: 'The President may return an ordinary bill (once) for reconsideration, but a Money Bill, which is introduced on the President\'s own recommendation, is not returned. Assent, signature and publication apply to both kinds of bill.',
}));
Q('m_reading_stage', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'At which stage of an ordinary bill in a House are its clauses considered one by one and amendments voted on?',
  opts: ['The second reading (consideration stage)', 'The first reading', 'The third reading', 'The President\'s assent'],
  sol: 'Clause-by-clause consideration and amendments belong to the second reading. The first reading is introduction; the third reading is a vote on the bill as a whole with only verbal changes; assent comes after both Houses.',
}));
Q('ord_ordinary', ord({
  t: 5, d: 2, c: 'understanding', marks: 2,
  stem: 'Arrange the stages of an imagined ordinary bill, introduced in the Lok Sabha, in the order in which they occur.',
  items: [
    'Introduction (first reading) in the Lok Sabha',
    'General discussion, committee scrutiny and clause-by-clause consideration (second reading)',
    'Vote on the bill as a whole (third reading)',
    'Passage through the same stages in the Rajya Sabha',
    'Assent of the President',
  ],
  sol: 'First reading, second reading (discussion, committee, clauses), third reading, the other House, and finally the President\'s assent.',
}));
Q('fb_joint', fb({
  t: 5, d: 1, c: 'recall',
  stem: 'A joint sitting of the two Houses of Parliament is presided over by the ___ of the Lok Sabha.',
  acc: [['Speaker']],
  sol: 'The Speaker presides over a joint sitting (the Deputy Speaker in the Speaker\'s absence).',
}));
Q('s_money_compare', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two ways in which the procedure for a Money Bill differs from that for an ordinary bill.',
  model: '1. A Money Bill can be introduced **only in the Lok Sabha** (on the President\'s recommendation); an ordinary bill can begin in **either House**.\n2. The Rajya Sabha can only **delay** a Money Bill for **14 days**; for an ordinary bill a **joint sitting** can settle a disagreement.',
  sol: 'Any two correct differences.',
  scheme: [['First difference', 1], ['Second difference', 1]],
}));
Q('s_joint_when', short({
  t: 5, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined ordinary bill passed by the Lok Sabha has been lying with the Rajya Sabha for seven months without being passed or rejected. What can now happen to it, and who decides the outcome?',
  model: 'Since more than **six months** have passed without action, the **President** may summon a **joint sitting**. The bill is then decided by a **majority of the members of both Houses present and voting**, under the Speaker\'s chair.',
  sol: 'Six-month rule, joint sitting, majority of both Houses.',
  scheme: [['Joint sitting can be summoned by the President', 1], ['Decided by majority of both Houses together', 1]],
}));
Q('s_lok_sabha_edge', short({
  t: 5, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Explain why the Lok Sabha usually prevails when the two Houses vote together at a joint sitting.',
  model: 'At a joint sitting the bill is decided by a **majority of all members present and voting**. The Lok Sabha has **far more members** (more than twice the Rajya Sabha), so its view usually decides the result.',
  sol: 'Rule of the joint vote and the difference in numbers.',
  scheme: [['Majority of both Houses together decides', 1], ['Lok Sabha has many more members', 1]],
}));

// ================================================================ t06 Powers and functions of Parliament
Q('m_power_type', mcq({
  t: 6, d: 2, c: 'application',
  stem: 'Parliament removes a judge of the Supreme Court by a special majority in each House after an inquiry finds proved misbehaviour. Which category of Parliament\'s powers does this illustrate?',
  opts: ['Judicial powers', 'Electoral powers', 'Financial powers', 'Amending powers'],
  sol: 'Removing judges (like impeaching the President) is part of Parliament\'s judicial functions. Electing the Vice-President is electoral, approving taxes is financial, and changing the Constitution is amending.',
}));
Q('m_electoral', mcq({
  t: 6, d: 2, c: 'understanding',
  stem: 'Which of these is an electoral function of Parliament?',
  opts: [
    'Members of both Houses elect the Vice-President',
    'Parliament approves the annual budget',
    'Parliament passes a law on the Union List',
    'Parliament debates the President\'s address',
  ],
  sol: 'The Vice-President is elected by the members of both Houses, and elected members of Parliament also take part in electing the President. Budgets are financial, law-making on the Union List is legislative, and the debate on the address is a form of control over the executive.',
}));
Q('m_control', mcq({
  t: 6, d: 2, c: 'application',
  stem: 'An imagined opposition member moves to reduce the amount demanded by a ministry to one rupee, to show disapproval of its policy during the budget debate. Through this step Parliament is mainly',
  opts: ['controlling the executive', 'amending the Constitution', 'electing the President', 'exercising judicial power'],
  sol: 'Cut motions on demands for grants are a way of criticising and controlling the executive through finance. They do not amend the Constitution, elect anyone or act judicially.',
}));
Q('m_state_list', mcq({
  t: 6, d: 3, c: 'analysis',
  stem: 'In which situation can Parliament make a law on a subject in the State List?',
  opts: [
    'When the Rajya Sabha passes a resolution, by two-thirds of members present and voting, that it is necessary in the national interest',
    'Whenever the Lok Sabha passes a simple majority resolution',
    'Whenever a Chief Minister writes to the Prime Minister',
    'Only after the Supreme Court approves the subject',
  ],
  sol: 'Under Article 249 the Rajya Sabha can, by a two-thirds majority of members present and voting, authorise Parliament to legislate on a State List subject in the national interest. (Parliament can also do so during a national emergency, or at the request of two or more States.) A Lok Sabha resolution, a letter from a Chief Minister or court approval does not give this power.',
}));
Q('tf_tax_law', tf({
  t: 6, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? The Union government cannot levy or collect a tax unless a law passed by Parliament allows it.',
  sol: 'The Constitution provides that no tax can be levied or collected except by authority of law, which gives Parliament control over the Union\'s finances.',
}));
Q('s_amend', short({
  t: 6, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain the amending power of Parliament, with one example of a type of amendment that needs more than a special majority in Parliament.',
  model: 'Parliament can **amend the Constitution**, most parts by a **special majority** in each House. Some amendments, such as those affecting the **representation of States** or the **powers of the States**, also need **ratification by at least half of the State legislatures**.',
  sol: 'Meaning of the power plus a ratification example.',
  scheme: [['Amending power with special majority', 1], ['Example needing ratification by half the States', 1]],
}));
Q('s3_control_three', short({
  t: 6, d: 2, c: 'application', marks: 3, wl: S3,
  stem: 'Using the working of an imagined Parliament in one session, describe three ways in which it controls the executive.',
  model: '1. **Questions and Question Hour** force ministers to explain their actions in public.\n2. **Motions**: an **adjournment motion** highlights urgent failures, and a **no-confidence motion** can remove the government.\n3. **Financial control**: ministries spend only what Parliament grants, and **cut motions** and debates on demands allow criticism.',
  sol: 'Three distinct methods of control.',
  scheme: [['Questions', 1], ['Motions', 1], ['Financial control or debates', 1]],
}));
Q('s3_financial', short({
  t: 6, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Parliament is often called the guardian of public money. Give three reasons for this description.',
  model: '1. **No tax** can be imposed or collected without a **law passed by Parliament**.\n2. The **annual budget** and every **demand for grants** must be approved before money is spent.\n3. Parliament\'s committees examine accounts and audit reports, so **misuse** of funds can be exposed.',
  sol: 'Three points on taxes, spending approval and scrutiny.',
  scheme: [['Taxation needs a law', 1], ['Spending needs approval', 1], ['Scrutiny of accounts', 1]],
}));

// ================================================================ t07 Exclusive powers of each House
Q('m_rs_exclusive', mcq({
  t: 7, d: 2, c: 'understanding',
  stem: 'Which power belongs to the Rajya Sabha alone?',
  opts: [
    'Passing a resolution that allows Parliament to create a new All India Service',
    'Moving a no-confidence motion against the Council of Ministers',
    'Introducing a Money Bill',
    'Voting on demands for grants',
  ],
  sol: 'Under Article 312 only the Rajya Sabha can, by a two-thirds majority of members present and voting, declare that a new All India Service should be created. No-confidence motions, Money Bills and demands for grants belong to the Lok Sabha.',
}));
Q('m_ls_exclusive', mcq({
  t: 7, d: 1, c: 'recall',
  stem: 'Which of the following is an exclusive power of the Lok Sabha?',
  opts: ['Voting on demands for grants', 'Initiating the removal of the Vice-President', 'Authorising Parliament to legislate on a State List subject', 'Creating new All India Services'],
  sol: 'Demands for grants are voted only by the Lok Sabha. Removal of the Vice-President begins in the Rajya Sabha, and resolutions under Articles 249 and 312 are passed by the Rajya Sabha.',
}));
Q('m_vp_removal', mcq({
  t: 7, d: 3, c: 'analysis',
  stem: 'Why is the Rajya Sabha given a special role when a resolution to remove the Vice-President is to be moved?',
  opts: [
    'The Vice-President is the ex officio Chairman of the Rajya Sabha, so the resolution must begin there',
    'The Lok Sabha has no say at all in the removal',
    'The Vice-President is elected only by the Rajya Sabha',
    'The Rajya Sabha controls the finances of the Union',
  ],
  sol: 'As the ex officio Chairman of the Rajya Sabha, the Vice-President is removed by a resolution of the Rajya Sabha passed by a majority of all its members, agreed to by the Lok Sabha. So the Lok Sabha does have a say; both Houses elect the Vice-President; and financial control lies mainly with the Lok Sabha.',
}));
Q('ar_finance', ar({
  t: 7, d: 2, c: 'analysis', verdict: 'both-true-explains',
  a: 'The Lok Sabha has the final say over Money Bills.',
  r: 'The Lok Sabha is directly elected by the people, and the government is answerable to it.',
  sol: 'Both are true, and the direct mandate of the people, with the government\'s responsibility to the Lok Sabha, is why the Constitution gives it the last word on taxing and spending.',
}));
Q('ar_rs_249', ar({
  t: 7, d: 4, c: 'analysis', verdict: 'A-true-R-false',
  a: 'The Rajya Sabha can authorise Parliament to make a law on a subject in the State List.',
  r: 'Such a resolution of the Rajya Sabha needs a simple majority of members present and voting.',
  sol: 'A is true under Article 249. R is false: the resolution needs a two-thirds majority of the members present and voting.',
}));
Q('s_rs_two', short({
  t: 7, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Name two exclusive powers of the Rajya Sabha.',
  model: '1. Authorising Parliament, by a **two-thirds** resolution, to legislate on a **State List** subject in the national interest (Article 249).\n2. Authorising the creation of a **new All India Service** by a two-thirds resolution (Article 312).',
  sol: 'Articles 249 and 312 (the Vice-President\'s removal beginning in the Rajya Sabha is also accepted).',
  scheme: [['First exclusive power', 1], ['Second exclusive power', 1]],
}));
Q('s3_ls_stronger', short({
  t: 7, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Give three reasons why the Lok Sabha is regarded as more powerful than the Rajya Sabha in financial matters.',
  model: '1. Money Bills can be **introduced only in the Lok Sabha**.\n2. The Rajya Sabha can only **delay** them for **14 days**, and the Lok Sabha may reject its recommendations.\n3. **Demands for grants** are voted only by the Lok Sabha, to which the government is **responsible**.',
  sol: 'Introduction, limited delay, voting on grants.',
  scheme: [['Introduction only in Lok Sabha', 1], ['Rajya Sabha can only delay 14 days', 1], ['Demands for grants voted by Lok Sabha', 1]],
}));

// ================================================================ long answers (10 marks, 3 + 3 + 4)
Q('l_sessions_quorum', long({
  t: [1, 2], d: 3, c: 'application', marks: 10, wl: L10,
  stem: 'An imagined Parliament meets in February. Read the situations and answer.\n\n(i) Explain the constitutional rule about the gap between sessions and name the three sessions usually held in a year. **[3]**\n(ii) What is meant by quorum? What must the presiding officer do if the quorum is not present? **[3]**\n(iii) Describe how Question Hour works, distinguishing the types of questions, and say how Zero Hour differs from it. **[4]**',
  model: '(i) Parliament must meet **at least twice a year**, and **not more than six months** may pass between two sessions. The usual sessions are the **Budget**, **Monsoon** and **Winter** Sessions.\n\n(ii) **Quorum** is the minimum number of members who must be present for the House to do business: **one-tenth of its total membership**. If it is lacking, the presiding officer **adjourns or suspends** the sitting until it is met.\n\n(iii) **Question Hour** is the **first hour** of a sitting. **Starred** questions get **oral** answers with **supplementaries**; **unstarred** questions get **written** answers; **short notice** questions on urgent matters may be asked with **less than ten days\' notice**. **Zero Hour** follows Question Hour; members raise urgent issues without the usual notice, and it is a **practice** not found in the rules.',
  sol: 'Gap rule and sessions; quorum and its effect; question types and Zero Hour.',
  scheme: [['(i) Six-month rule', 2], ['(i) Three sessions', 1], ['(ii) Meaning: one-tenth', 2], ['(ii) Adjourn or suspend', 1], ['(iii) Starred and unstarred', 2], ['(iii) Short notice', 1], ['(iii) Zero Hour difference', 1]],
}));
Q('l_motions', long({
  t: 3, d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'Answer the following about motions in the Lok Sabha.\n\n(i) What is an adjournment motion? State the support it needs and one way it helps the opposition. **[3]**\n(ii) Explain the procedure for a no-confidence motion. **[3]**\n(iii) Why does the defeat of the government on a no-confidence motion lead to the resignation of all ministers? Explain with reference to the principle involved. **[4]**',
  model: '(i) A motion to **set aside the normal business** to discuss a **definite matter of urgent public importance**. It needs the support of at least **50 members**. It lets the opposition draw immediate attention to a **government failure**, since it carries an element of **censure**.\n\n(ii) Notice of the motion is given in the **Lok Sabha** only; the Speaker admits it if **50 members** support it; it need **not state reasons**; after a **debate** the House **votes**.\n\n(iii) Ministers are **collectively responsible** to the Lok Sabha: they stand or fall **together**. A successful no-confidence motion shows that the government has **lost the confidence of the House**, so the **Prime Minister and the whole Council of Ministers** must resign; this keeps the executive **answerable** to the elected House.',
  sol: 'Adjournment motion; no-confidence procedure; collective responsibility.',
  scheme: [['(i) Meaning and 50 members', 2], ['(i) How it helps the opposition', 1], ['(ii) Lok Sabha, notice, support of 50', 2], ['(ii) Debate and vote', 1], ['(iii) Collective responsibility', 2], ['(iii) Whole Council resigns and why it matters', 2]],
}));
Q('l_defection', long({
  t: 4, d: 3, c: 'evaluation', marks: 10, wl: L10,
  stem: 'The Anti-Defection Law changed how members of Parliament behave.\n\n(i) When and by which amendment was it added to the Constitution, and in which Schedule is it found? **[3]**\n(ii) State three grounds on which a member can be disqualified. **[3]**\n(iii) Who decides questions of disqualification? Evaluate the law by giving two of its benefits and two of its limitations. **[4]**',
  model: '(i) It was added in **1985** by the **52nd Amendment** as the **Tenth Schedule** of the Constitution.\n\n(ii) A member is disqualified if he **voluntarily gives up** his party membership; if he **votes or abstains against the party\'s direction** without permission (not condoned within the time allowed); or, being an **independent**, joins a party after election (a **nominated** member may join only within six months).\n\n(iii) The **Speaker** (or the **Chairman** in the Rajya Sabha) decides, subject to **judicial review**. **Benefits:** it curbs **floor-crossing** for office or money and gives governments **stability**. **Limitations:** it restricts a member\'s **freedom of conscience** and strengthens **party bosses**, and decisions by presiding officers have sometimes been **delayed** or questioned.',
  sol: 'Origin; grounds; deciding authority and a balanced evaluation.',
  scheme: [['(i) 1985, 52nd Amendment', 2], ['(i) Tenth Schedule', 1], ['(ii) Three grounds', 3], ['(iii) Speaker or Chairman decides, with review', 1], ['(iii) Two benefits', 1.5], ['(iii) Two limitations', 1.5]],
}));
Q('l_ordinary_bill', long({
  t: 5, d: 2, c: 'understanding', marks: 10, wl: L10,
  stem: 'Trace an imagined ordinary bill on road safety from its introduction to its becoming law.\n\n(i) Describe the three readings of the bill in the House where it is introduced. **[3]**\n(ii) What can the second House do with the bill? **[3]**\n(iii) Explain how a disagreement between the Houses is settled, and the choices before the President when the bill reaches him. **[4]**',
  model: '(i) **First reading:** the bill is **introduced** and published. **Second reading:** general discussion, possible reference to a **committee**, and **clause-by-clause** consideration with amendments. **Third reading:** the House votes on the bill **as a whole**.\n\n(ii) The other House goes through the same stages. It may **pass** the bill, pass it **with amendments**, **reject** it, or **take no action**.\n\n(iii) If the Houses disagree, or **six months** pass without action, the **President** may summon a **joint sitting**, presided over by the **Speaker**; the bill is decided by a **majority of members of both Houses present and voting**. The President may then **give assent**, **withhold** it, or **return** the bill once for reconsideration; if both Houses pass it again, the President **must assent**.',
  sol: 'Readings; second House options; joint sitting and assent.',
  scheme: [['(i) First and second reading', 2], ['(i) Third reading', 1], ['(ii) Four options of the second House', 3], ['(iii) Joint sitting, Speaker, majority', 2], ['(iii) President\'s options and re-passing', 2]],
}));
Q('l_money_bill', long({
  t: [5, 7], d: 4, c: 'analysis', marks: 10, wl: L10,
  stem: 'Money Bills follow a special path in Parliament.\n\n(i) What is a Money Bill and who decides whether a bill is one? **[3]**\n(ii) Describe the procedure for passing a Money Bill. **[3]**\n(iii) Compare the powers of the two Houses over Money Bills and explain why the difference exists. **[4]**',
  model: '(i) A **Money Bill** deals only with matters such as **taxes**, **borrowing** by the government and spending from the **Consolidated Fund**. The **Speaker** of the Lok Sabha certifies a Money Bill, and the decision is **final**.\n\n(ii) It is introduced **only in the Lok Sabha** on the **President\'s recommendation**. After the Lok Sabha passes it, the **Rajya Sabha** must return it within **14 days**, with or without recommendations; the Lok Sabha may **accept or reject** them; if not returned in time, the bill is **deemed passed**; then it goes for **assent**.\n\n(iii) The **Lok Sabha** has the **final say**, while the **Rajya Sabha** can only **delay** for 14 days and **recommend**; there is **no joint sitting**. The difference exists because the Lok Sabha is **directly elected** and the government is **responsible** to it, so control of the public purse rests with the people\'s House.',
  sol: 'Meaning and certification; procedure; comparison and reason.',
  scheme: [['(i) Meaning', 2], ['(i) Speaker certifies', 1], ['(ii) Lok Sabha only, President\'s recommendation', 1], ['(ii) 14 days and deemed passing', 2], ['(iii) Comparison of powers', 2], ['(iii) Reason for the difference', 2]],
}));
Q('l_powers', long({
  t: 6, d: 2, c: 'understanding', marks: 10, wl: L10,
  stem: 'Parliament is the supreme law-making body of the Union.\n\n(i) Explain the legislative powers of Parliament, including two situations in which it can make laws on State List subjects. **[3]**\n(ii) Explain any three of its judicial and electoral functions. **[3]**\n(iii) Describe Parliament\'s financial powers and its amending power. **[4]**',
  model: '(i) Parliament makes laws on the **Union List**, the **Concurrent List** and **residuary** subjects. It can legislate on **State List** subjects when the **Rajya Sabha** passes a **two-thirds** resolution in the national interest, or during a **national emergency** (also at the request of two or more States).\n\n(ii) **Judicial:** it can **impeach the President** and **remove judges** of the Supreme Court and High Courts. **Electoral:** members of both Houses elect the **Vice-President**, and elected members take part in electing the **President**.\n\n(iii) **Financial:** no tax can be levied without a **law of Parliament**; it passes the **budget**, votes **demands for grants** and checks spending through its committees. **Amending:** it can **amend the Constitution**, mostly by a **special majority**; some amendments also need **ratification by half the States**.',
  sol: 'Legislative; judicial and electoral; financial and amending.',
  scheme: [['(i) Lists', 1], ['(i) Two State List situations', 2], ['(ii) Three judicial or electoral functions', 3], ['(iii) Financial powers', 2], ['(iii) Amending power', 2]],
}));
Q('l_exclusive', long({
  t: 7, d: 4, c: 'analysis', marks: 10, wl: L10,
  stem: 'The two Houses of Parliament are not equal in every respect.\n\n(i) State three exclusive powers of the Lok Sabha. **[3]**\n(ii) State three exclusive powers or special roles of the Rajya Sabha. **[3]**\n(iii) "The Rajya Sabha is not merely a delaying chamber." Do you agree? Give reasons for your answer, considering both sides. **[4]**',
  model: '(i) Money Bills can be **introduced only in the Lok Sabha**; **demands for grants** are voted only by it; and the Council of Ministers is **responsible** to it, so only it can pass a **no-confidence motion**.\n\n(ii) The Rajya Sabha alone can authorise Parliament to legislate on a **State List** subject (two-thirds resolution, **Article 249**); it alone can authorise a **new All India Service** (**Article 312**); and a resolution to **remove the Vice-President** must begin in it.\n\n(iii) **Yes, partly:** it **revises** ordinary bills, can **reject** them, has **equal power** on constitutional amendments, and protects the **interests of the States** through its special resolutions. **But** on **Money Bills** it can only **delay for 14 days**, and at a **joint sitting** the larger Lok Sabha usually prevails. So it is a **revising and federal chamber**, weaker than the Lok Sabha in finance.',
  sol: 'Lok Sabha powers; Rajya Sabha powers; a balanced judgement.',
  scheme: [['(i) Three Lok Sabha powers', 3], ['(ii) Three Rajya Sabha powers', 3], ['(iii) Points showing real powers', 2], ['(iii) Limits and a conclusion', 2]],
}));
Q('l_control_exec', long({
  t: [2, 3, 6], d: 4, c: 'evaluation', marks: 10, wl: L10,
  stem: 'In the parliamentary system the executive is answerable to the legislature.\n\n(i) Explain how Question Hour and Zero Hour help Parliament control the executive. **[3]**\n(ii) How do the adjournment motion and the no-confidence motion add to this control? **[3]**\n(iii) Some argue that a government with a large majority faces little real control from Parliament. Evaluate this view. **[4]**',
  model: '(i) In **Question Hour** ministers must **answer questions** in public, on record; starred questions allow **supplementaries** that probe further. In **Zero Hour** members raise **urgent public issues** without notice, bringing them quickly to the government\'s attention.\n\n(ii) An **adjournment motion** forces a debate on a **definite urgent matter** and implies **censure**. A **no-confidence motion** tests whether the government still has a **majority**; if it is passed, the **whole Council of Ministers** resigns.\n\n(iii) **For the view:** with a big majority, a **no-confidence motion** is unlikely to succeed and **party discipline** (backed by the **Anti-Defection Law**) limits dissent. **Against:** **questions**, **debates**, **committees** and the **budget process** still expose failures to the **public and the media**, and the government must face the voters at the **next election**. So control remains, though mostly through **accountability and publicity** rather than defeat.',
  sol: 'Questions and Zero Hour; motions; balanced evaluation.',
  scheme: [['(i) Question Hour', 2], ['(i) Zero Hour', 1], ['(ii) Adjournment motion', 1.5], ['(ii) No-confidence motion', 1.5], ['(iii) Argument for the view', 2], ['(iii) Argument against and conclusion', 2]],
}));

// ================================================================ source-based items (imagined documents)
Q('sb_member_diary', source({
  t: [2, 3], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the extract from the imagined diary of a first-time member of the Lok Sabha and answer the questions that follow. ${IMAG}`,
  passage: '**Diary of a first-time member of the Lok Sabha (imagined)**\n\nMonday. My question on drinking water in my district was marked with an asterisk, so I got to hear the minister reply in person. When she said work had begun, I stood up and asked why the pipes had not reached two villages. She promised to send me the details.\n\nTuesday. Just after the first hour, members rose one after another to raise matters that were not on the day\'s list: a factory fire, a delayed exam result, a bridge that had cracked. It was noisy, but every issue reached the ministers.\n\nThursday. Fifty-two members stood up to support a request to set aside the day\'s business and discuss the sudden shortage of fertiliser. The Speaker allowed it, and the debate went on into the evening.',
  parts: [
    child('a', short({ t: 2, d: 1, c: 'recall', marks: 1, stem: 'What kind of question did the member ask on Monday, and how do you know?', model: 'A **starred question**: it had an asterisk and got an **oral reply**, with a **supplementary** question.', sol: 'Asterisk, oral reply, supplementary.', scheme: [['Starred question with reason', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Identify the parliamentary practice described in Tuesday\'s entry.', model: '**Zero Hour**, which follows Question Hour.', sol: 'Matters raised after the first hour without being listed.', scheme: [['Zero Hour', 1]] })),
    child('c', short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Which motion was moved on Thursday? Explain why the number of members mentioned mattered.', model: 'An **adjournment motion**. It can be taken up only if at least **50 members** support it; with **52** standing, the Speaker could admit it.', sol: 'Name the motion and the 50-member rule.', scheme: [['Adjournment motion', 1], ['50-member support rule applied', 1]] }), [
      short({ t: [2, 3], d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Using two entries from the diary, explain how Parliament keeps ministers answerable.', model: 'On **Monday** the minister had to answer **in public** and face a follow-up question. On **Thursday** the House **set aside its business** to debate the fertiliser shortage, putting the government under **pressure to act**.', sol: 'Two entries, each linked to accountability.', scheme: [['First entry linked to accountability', 1], ['Second entry linked to accountability', 1]] }),
    ]),
  ],
}));
Q('sb_bill_note', source({
  t: 5, d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the imagined note prepared by a parliamentary intern about two bills and answer the questions that follow. ${IMAG}`,
  passage: '**Intern\'s note on two bills (imagined)**\n\nBill A changes the rates of income tax for the coming year. It was introduced in the Lok Sabha on the recommendation of the President, and the Speaker has certified it. The other House sent back three suggestions on the tenth day.\n\nBill B sets up a national authority for river cleaning. It was introduced in the Rajya Sabha and passed there. The Lok Sabha has passed it with two amendments, which the Rajya Sabha refuses to accept. Some members now talk of the two Houses meeting together.',
  parts: [
    child('a', short({ t: 5, d: 1, c: 'recall', marks: 1, stem: 'What type of bill is Bill A?', model: 'A **Money Bill**.', sol: 'Tax rates, President\'s recommendation, Speaker\'s certificate.', scheme: [['Money Bill', 1]] })),
    child('b', short({ t: 5, d: 2, c: 'application', marks: 1, stem: 'Is the Lok Sabha bound to accept the three suggestions on Bill A? Give a reason.', model: '**No**: the Rajya Sabha can only **recommend**; the Lok Sabha may **accept or reject** them.', sol: 'Recommendations only.', scheme: [['No, with reason', 1]] })),
    child('c', short({ t: 5, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain how the deadlock over Bill B can be resolved and who presides.', model: 'Bill B is an **ordinary bill**, so the **President** may summon a **joint sitting** of both Houses; it is presided over by the **Speaker** and decided by a **majority of members present and voting**.', sol: 'Joint sitting, Speaker, majority.', scheme: [['Joint sitting summoned by the President', 1], ['Speaker presides; majority decides', 1]] }), [
      short({ t: 5, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Why could a joint sitting NOT be used for Bill A?', model: 'Bill A is a **Money Bill**: the Rajya Sabha can only **delay it for 14 days**, after which it is **deemed passed**, so there is **no deadlock** to resolve and no joint sitting.', sol: 'Money Bills do not go to joint sittings.', scheme: [['Money Bill, Rajya Sabha can only delay', 1], ['Deemed passed, no joint sitting', 1]] }),
    ]),
  ],
}));
Q('sb_party_letter', source({
  t: 4, d: 3, c: 'evaluation', origin: 'soyl-original',
  stem: `Read the imagined letter from a voter to her member of Parliament and answer the questions that follow. ${IMAG}`,
  passage: '**Letter from a voter to her member of Parliament (imagined)**\n\nYou were elected on your party\'s ticket, and many of us voted for that party\'s promises. Now I read that you are thinking of joining another party because you were not made a minister. My neighbour says you cannot do this without losing your seat. Another neighbour says that if most of your party\'s members agree, the whole group can join another party safely. I would like to know which of them is right, and whether your vote on the farm bill next week has to follow your party\'s decision.',
  parts: [
    child('a', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Is the first neighbour right? Give a reason.', model: '**Yes**: voluntarily giving up the party\'s membership leads to **disqualification**.', sol: 'Voluntary defection.', scheme: [['Yes, with reason', 1]] })),
    child('b', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Under what condition is the second neighbour right?', model: 'If at least **two-thirds** of the legislature party agree to **merge** with another party.', sol: 'Merger exception.', scheme: [['Two-thirds merger', 1]] })),
    child('c', short({ t: 4, d: 3, c: 'evaluation', marks: 2, stem: '**Either** (i): Must the member vote with the party on the farm bill? Explain the rule and its effect on members.', model: 'If the party issues a **direction (whip)**, voting or abstaining **against** it without permission can lead to **disqualification** unless condoned. This keeps **party discipline** but limits the member\'s **freedom to vote by conscience**.', sol: 'Rule and its effect.', scheme: [['Rule on voting against the party', 1], ['Effect on members', 1]] }), [
      short({ t: 4, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Using the letter, explain why voters might support the Anti-Defection Law.', model: 'Voters chose the member partly for the **party\'s promises**; the law stops members from **switching sides for personal gain** such as a ministerial post, so the **mandate** of voters is respected and governments stay **stable**.', sol: 'Link to voters\' mandate and stability.', scheme: [['Respecting voters\' mandate', 1], ['Prevents switching for gain; stability', 1]] }),
    ]),
  ],
}));
