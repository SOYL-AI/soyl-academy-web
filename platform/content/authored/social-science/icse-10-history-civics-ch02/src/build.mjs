// Build ICSE 10 History & Civics ch02 Parliamentary Procedures and Powers of Parliament. Run from platform/:
//   npx tsx content/authored/social-science/icse-10-history-civics-ch02/src/build.mjs
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../icse-10-history-civics-ch01/src/lib.mjs';

setUnit('icse-10-history-civics-ch02', 'social-science');
const { sessionStrip, maxGap, SESS_OK, SESS_BAD, QUORUM_LS, QUORUM_RS, LS_SEATS_NOW, MONEY_BILL_DAYS } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- figures
const vRoute1 = flow('LR', ['Sessions and quorum', 'Question Hour and Zero Hour', 'Adjournment and no-confidence motions', 'Anti-Defection Law'], 'Route map of Part 1: sessions and quorum, Question Hour and Zero Hour, adjournment and no-confidence motions, and the Anti-Defection Law', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Ordinary Bill', 'Money Bill', 'Joint sitting', 'Powers of Parliament', 'Exclusive powers of each House'], 'Route map of Part 2: the ordinary bill, the money bill, the joint sitting, the powers of Parliament and the exclusive powers of each House', 'Part 2 at a glance');
const vStripOk = sessionStrip(SESS_OK, 'Month strip for an imagined year with three shaded sessions: Budget from February to April, Monsoon in July and August, and Winter in November and December; no gap is longer than two months', `Imagined year: longest gap ${maxGap(SESS_OK)} months, within the limit.`);
const vStripBad = sessionStrip(SESS_BAD, 'Month strip for an imagined year with only two shaded sessions: Budget in February and March and Winter in November and December, leaving April to October empty', `Imagined year: a gap of ${maxGap(SESS_BAD)} months, which breaks the six-month rule.`);
const vQuorum = table(['House', 'Membership used in the example', 'One-tenth', 'Quorum (members)'], [
  ['Lok Sabha', String(LS_SEATS_NOW), (LS_SEATS_NOW / 10).toFixed(1), String(QUORUM_LS)],
  ['Rajya Sabha', '245', '24.5', String(QUORUM_RS)],
], `Table: with ${LS_SEATS_NOW} members the Lok Sabha quorum is ${QUORUM_LS}; with 245 members the Rajya Sabha quorum is ${QUORUM_RS}`, 'Quorum is one-tenth of the total membership, rounded up to a whole member.');

/** A sitting day as a bar: Question Hour, then Zero Hour, then listed business. */
const vDay = (() => {
  const s = new Svg(720, 170);
  const X = (h) => 40 + (h - 11) * 160;
  s.arrow(30, 110, 700, 110, { sw: 1.6 });
  [11, 12, 13, 14, 15].forEach((h) => { s.line(X(h), 104, X(h), 116, { sw: 1.2, color: 'muted' }); s.text(X(h), 132, `${h > 12 ? h - 12 : h}:00`, { size: 12, muted: true }); });
  s.rect(X(11), 70, 160, 32, { rx: 4, fill: 'accent', fillOpacity: 0.35, color: 'accent', sw: 1.5 });
  s.text(X(11) + 80, 86, 'Question Hour', { size: 13, bold: true });
  s.rect(X(12), 70, 70, 32, { rx: 4, fill: 'yellow', fillOpacity: 0.35, color: 'yellow', sw: 1.5 });
  s.text(X(12) + 35, 86, 'Zero Hour', { size: 12, bold: true });
  s.rect(X(12) + 74, 70, 3 * 160 - 80, 32, { rx: 4, fill: 'muted', fillOpacity: 0.2, color: 'muted', sw: 1.2 });
  s.text(X(12) + 74 + (3 * 160 - 80) / 2, 86, 'Listed business: bills, debates, motions', { size: 12 });
  s.text(X(11) + 80, 50, 'Starred, unstarred, short notice', { size: 11, muted: true });
  s.text(X(12) + 35, 30, 'No fixed rules', { size: 11, muted: true });
  s.line(X(12) + 35, 38, X(12) + 35, 68, { sw: 1, color: 'muted' });
  return s.visual('Bar of an imagined Lok Sabha sitting day from 11 in the morning: the first hour is Question Hour with starred, unstarred and short notice questions; Zero Hour follows at noon; listed business takes the rest of the day', 'A typical sitting day (timings are the usual practice).');
})();
const vQTypes = table(['Type', 'How it is answered', 'Supplementaries?', 'Notice'], [
  ['Starred', 'Orally, on the floor', 'Yes', 'Normal notice'],
  ['Unstarred', 'In writing', 'No', 'Normal notice'],
  ['Short notice', 'Orally', 'Yes', 'Less than ten days; urgent matter'],
], 'Table comparing starred questions (oral answer, supplementaries allowed), unstarred questions (written answer, no supplementaries) and short notice questions (oral answer on an urgent matter with less than ten days notice)');
const vMotions = table(['', 'Adjournment motion', 'No-confidence motion'], [
  ['Aim', 'Discuss one definite, urgent matter', 'Test whether the government has the support of the House'],
  ['Support needed to admit', 'At least 50 members', 'At least 50 members'],
  ['House', 'Lok Sabha', 'Lok Sabha only'],
  ['If carried', 'Government stays; it is censured', 'Whole Council of Ministers resigns'],
], 'Table comparing the adjournment motion and the no-confidence motion by aim, support needed, House and result');
const vNoConf = flow('LR', ['Notice of motion in the Lok Sabha', '50 members rise in support', 'Debate on the government\'s record', 'Vote of the House', 'If passed: Council of Ministers resigns'], 'Flow of a no-confidence motion: notice in the Lok Sabha, support of 50 members, debate, vote, and resignation of the Council of Ministers if passed', 'No reason need be stated in the motion.');
const vDefect = table(['Disqualified if the member', 'Not disqualified when'], [
  ['gives up party membership voluntarily', 'two-thirds of the legislature party agree to merge with another party'],
  ['votes or abstains against the party\'s direction without permission (not condoned)', 'the party condones the vote within the time allowed'],
  ['is an independent and joins a party after election', 'a nominated member joins a party within six months of taking the seat'],
], 'Table of the Anti-Defection Law: grounds for disqualification on the left and the exceptions on the right, including the two-thirds merger and the six-month rule for nominated members');
const vDefectTime = flow('LR', ['1985: 52nd Amendment adds the Tenth Schedule', '1992: Supreme Court allows review of the presiding officer\'s decision', '2003: 91st Amendment removes the one-third split exception'], 'Timeline flow of the Anti-Defection Law: 1985 Tenth Schedule added by the 52nd Amendment; 1992 Supreme Court allows judicial review; 2003 the 91st Amendment removes the split exception', 'Three dates to remember.');
const vOrdinary = flow('TB', ['First reading: introduction', 'Second reading: discussion, committee, clause by clause', 'Third reading: vote on the bill as a whole', 'Other House: same three readings', 'Agreement? President\'s assent', 'Disagreement or six months\' delay: joint sitting'], 'Flow of an ordinary bill: first, second and third readings in one House, the same in the other House, then the President\'s assent; if the Houses disagree or six months pass, a joint sitting', 'An ordinary bill can begin in either House.');
const vMoney = flow('LR', ['Introduced only in the Lok Sabha, on the President\'s recommendation', 'Speaker certifies it as a Money Bill', 'Lok Sabha passes it', `Rajya Sabha returns it within ${MONEY_BILL_DAYS} days with recommendations`, 'Lok Sabha accepts or rejects them', 'President\'s assent'], `Flow of a Money Bill: introduced only in the Lok Sabha on the President\'s recommendation, certified by the Speaker, passed by the Lok Sabha, returned by the Rajya Sabha within ${MONEY_BILL_DAYS} days, recommendations accepted or rejected by the Lok Sabha, then assent`, 'No joint sitting for a Money Bill.');
const vCompare = table(['Point', 'Ordinary Bill', 'Money Bill'], [
  ['Where introduced', 'Either House', 'Only the Lok Sabha'],
  ['President\'s recommendation', 'Not needed', 'Needed'],
  ['Power of the Rajya Sabha', 'Can amend or reject', `Can only delay ${MONEY_BILL_DAYS} days and recommend`],
  ['Deadlock', 'Joint sitting', 'Not possible'],
  ['President', 'May return once for reconsideration', 'Does not return it'],
], 'Table comparing an ordinary bill and a money bill on where it is introduced, the President\'s recommendation, the Rajya Sabha\'s power, deadlocks and the President\'s role');
const vSizes = (() => {
  const s = new Svg(640, 200);
  const W = (n) => (n / 550) * 460;
  const rows = [['Lok Sabha', LS_SEATS_NOW, 'accent'], ['Rajya Sabha', 245, 'blue']];
  rows.forEach(([lab, n, col], i) => {
    const y = 50 + i * 60;
    s.text(20, y + 16, lab, { anchor: 'start', size: 13, bold: true });
    s.rect(130, y, W(n), 32, { rx: 4, fill: col, fillOpacity: 0.4, color: col, sw: 1.5 });
    s.text(130 + W(n) + 10, y + 16, String(n), { anchor: 'start', size: 13 });
  });
  s.text(130, 182, 'Members (present membership used in the example)', { anchor: 'start', size: 11, muted: true });
  return s.visual(`Bar chart: the Lok Sabha with ${LS_SEATS_NOW} members is more than twice the size of the Rajya Sabha with 245 members, so it usually prevails in a joint sitting`, 'Why the larger House usually wins a joint vote.');
})();
assert.ok(LS_SEATS_NOW > 2 * 245);
const vPowers = table(['Power', 'Example'], [
  ['Legislative', 'Laws on the Union and Concurrent Lists; State List in special cases'],
  ['Financial', 'No tax without its law; passes the budget and demands for grants'],
  ['Judicial', 'Impeachment of the President; removal of judges'],
  ['Electoral', 'Elects the Vice-President; elected members help elect the President'],
  ['Amending', 'Amends the Constitution, some parts with ratification by half the States'],
  ['Control over the executive', 'Questions, motions, debates, cut motions'],
], 'Table of the six kinds of powers of Parliament with an example of each: legislative, financial, judicial, electoral, amending and control over the executive');
const vStateList = flow('LR', ['Rajya Sabha resolution by two-thirds present and voting (Article 249)', 'National emergency in force', 'Request of two or more States'], 'Flow listing three situations in which Parliament can make laws on State List subjects: a two-thirds Rajya Sabha resolution under Article 249, a national emergency, and a request from two or more States', 'When Parliament may legislate on the State List.');
const vExclusive = table(['Lok Sabha alone', 'Rajya Sabha alone'], [
  ['Money Bills begin here; final say on them', 'Article 249 resolution on a State List subject'],
  ['Votes demands for grants', 'Article 312 resolution for a new All India Service'],
  ['No-confidence motion against the Council of Ministers', 'Resolution to remove the Vice-President begins here'],
], 'Table of exclusive powers: the Lok Sabha controls money bills, demands for grants and no-confidence motions; the Rajya Sabha passes resolutions under Articles 249 and 312 and begins the removal of the Vice-President');
const vControlTools = flow('LR', ['Questions', 'Zero Hour', 'Adjournment motion', 'Cut motions in the budget', 'No-confidence motion'], 'Flow of the tools of parliamentary control from mild to strong: questions, Zero Hour, adjournment motion, cut motions and no-confidence motion', 'From gentle questioning to removing a government.');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'Parliamentary Procedures — Part 1: Sessions, Questions, Motions and Defection',
  goals: [
    'State the rules on sessions of Parliament and on quorum',
    'Distinguish starred, unstarred and short notice questions, and explain Zero Hour',
    'Explain the adjournment motion and the procedure and result of a no-confidence motion',
    'State the main provisions of the Anti-Defection Law and judge its effects',
  ],
  slides: [
    sl('title', 'Parliamentary Procedures and Powers of Parliament', {
      b: 'Part 1 — how Parliament **meets**, **asks questions**, **moves motions** and stops members from **switching sides**.',
      v: vRoute1,
      n: 'In the last chapter we met the two Houses of Parliament and their presiding officers. Now we see how Parliament actually works day to day. When does it meet, and how many members must be present? How do members question ministers? Which motions can embarrass or even remove a government? And what stops members from changing parties for personal gain?',
    }),
    sl('diagram', 'Sessions of Parliament', {
      b: 'The **President** summons and prorogues the Houses. Parliament must meet **at least twice a year**, with **no more than six months** between sessions.',
      v: vStripOk,
      n: 'Parliament does not sit all year. The President summons each House to a session and later prorogues it, acting on the advice of the government. The Constitution sets two rules: there must be at least two sessions a year, and the gap between one session and the next cannot be more than six months. In practice there are three sessions: Budget, Monsoon and Winter.',
    }),
    sl('concept', 'Prorogation is not dissolution', {
      bl: [
        '**Adjournment:** a sitting ends; the session continues.',
        '**Prorogation:** the session ends; the House continues.',
        '**Dissolution:** the life of the **Lok Sabha** ends; elections follow. The Rajya Sabha is never dissolved.',
      ],
      n: 'Three words are often mixed up. Adjourning ends a day\'s sitting. Proroguing ends a whole session, but the House lives on and meets again. Dissolution ends the life of the Lok Sabha, and a general election follows. The Rajya Sabha is a permanent House, so it is never dissolved.',
    }),
    sl('example', 'Worked example 1: is this calendar allowed?', {
      b: 'An imagined plan lists only a Budget Session (February–March) and a Winter Session (November–December).',
      bl: [
        'Step 1 — Count sessions: two, so the minimum number is met.',
        `Step 2 — Measure the gap: April to October is ${maxGap(SESS_BAD)} months.`,
        'Step 3 — Compare with the six-month limit: the gap is too long.',
        'Step 4 — Answer: the plan breaks the rule; a Monsoon Session is needed.',
      ],
      v: vStripBad,
      n: 'Here is how to check a calendar. First count the sessions: two, so the minimum is met. Then measure the gap between the end of one session and the start of the next. From April to October is seven months, more than the six allowed. So the plan breaks the rule, even though it has two sessions. Adding a Monsoon Session in July would fix it.',
    }),
    sl('diagram', 'Quorum', {
      b: 'Quorum = the minimum attendance for business: **one-tenth of the total membership** of the House.',
      v: vQuorum,
      n: `Quorum is the smallest number of members who must be present for a House to do business. It is one-tenth of the House's total membership. With ${LS_SEATS_NOW} members in the Lok Sabha that comes to ${QUORUM_LS}. If too few members are present, the presiding officer must adjourn or suspend the sitting until the quorum is met. This stops a handful of members from making decisions for everyone.`,
    }),
    sl('check', 'Quick check: what is a quorum?', {
      b: 'Choose the correct meaning of quorum.',
      chk: 'm_quorum_meaning',
      n: 'Think about attendance, not votes. Which option describes the smallest number of members who must be present?',
    }),
    sl('diagram', 'A sitting day: Question Hour first', {
      v: vDay,
      n: 'A normal sitting of the Lok Sabha begins with Question Hour, usually the first hour of the day. Members question ministers about the work of their departments. Right after it comes Zero Hour, when members raise urgent matters. After that the House turns to its listed business: bills, debates and motions.',
    }),
    sl('diagram', 'Three kinds of questions', {
      v: vQTypes,
      n: 'Questions come in three kinds. A starred question, marked with an asterisk, is answered aloud, and members can ask follow-up questions called supplementaries. An unstarred question gets a written answer, with no follow-ups. A short notice question is about an urgent matter and can be asked with less than ten days of notice, for an oral answer.',
    }),
    sl('concept', 'Zero Hour', {
      b: '**Zero Hour** follows Question Hour. Members raise **urgent matters** without the usual notice. It grew up as a **practice**; it is **not in the rules** of procedure.',
      bl: ['Strength: urgent problems reach ministers at once.', 'Weakness: no fixed rules, so it can become disorderly.'],
      n: 'Zero Hour is an Indian parliamentary practice. It begins when Question Hour ends, around noon, and members use it to raise urgent public issues that are not on the day\'s list. Because it is not covered by the rules, it is lively and sometimes noisy, but it lets new problems reach the government quickly.',
    }),
    sl('check', 'Quick check: Zero Hour', {
      b: 'Which statement about Zero Hour is correct?',
      chk: 'm_zero_hour',
      n: 'Remember when Zero Hour happens, and whether it is written in the rules of procedure.',
    }),
    sl('diagram', 'Two important motions', {
      v: vMotions,
      n: 'A motion is a formal proposal for the House to decide. The adjournment motion sets aside the day\'s business to discuss one definite and urgent matter; it needs fifty members to support it, and it carries a hint of criticism of the government. The no-confidence motion goes further: it asks whether the government still has the support of the Lok Sabha at all.',
    }),
    sl('diagram', 'How a no-confidence motion works', {
      v: vNoConf,
      n: 'Notice of a no-confidence motion can be given only in the Lok Sabha. If at least fifty members rise in support, the Speaker admits it; no reasons need to be stated. After a debate on the government\'s record, the House votes. If the motion is carried, the Prime Minister and the whole Council of Ministers must resign, because they are collectively responsible to the Lok Sabha.',
    }),
    sl('check', 'Quick check: after the vote', {
      b: 'What follows if a no-confidence motion is passed?',
      chk: 'm_nc_result',
      n: 'Think about collective responsibility. Do ministers leave one at a time, or together?',
    }),
    sl('diagram', 'The Anti-Defection Law', {
      b: 'Added in **1985** by the **52nd Amendment** as the **Tenth Schedule**.',
      v: vDefect,
      n: 'Before 1985, members often changed parties after elections, sometimes for office or money, and governments fell suddenly. The 52nd Amendment added the Tenth Schedule to stop this. A member is disqualified for giving up party membership, voting against the party\'s direction without permission, or, as an independent, joining a party. A merger supported by two-thirds of the legislature party is allowed.',
    }),
    sl('diagram', 'How the law has changed', {
      b: 'The **Speaker** (or the Chairman of the Rajya Sabha) decides disqualification; courts can review the decision.',
      v: vDefectTime,
      n: 'Three dates matter. In 1985 the law was added. In 1992 the Supreme Court held that the presiding officer\'s decision on disqualification can be reviewed by courts. In 2003 the 91st Amendment removed the old exception for a split by one-third of a party, so today only a two-thirds merger is protected.',
    }),
    sl('example', 'Worked example 2: who is disqualified?', {
      b: 'Apply the law to three imagined members.',
      bl: [
        'A nominated member joins a party in her third month → **not** disqualified (within six months).',
        'An elected member resigns from his party → **disqualified** (voluntary defection).',
        'Two-thirds of a small party merge with a larger one → **not** disqualified (merger exception).',
        'Exam habit: give the **rule** behind each answer.',
      ],
      v: table(['Member', 'Action', 'Disqualified?'], [['Nominated member', 'Joins a party in month 3', 'No'], ['Elected member', 'Resigns from party', 'Yes'], ['Group of two-thirds', 'Merges with another party', 'No']], 'Table of three imagined members and whether each is disqualified: the nominated member joining in month three is not, the member who resigns from his party is, and a two-thirds merger is not'),
      n: 'Let us apply the rules. A nominated member may join a party within six months of taking her seat, so joining in the third month is allowed. An elected member who leaves his party of his own will is disqualified. And when two-thirds of a party\'s members agree to merge with another party, they are protected. In the exam, always give the rule as your reason.',
    }),
    sl('check', 'Quick check: the one-third split', {
      b: 'True or false: a one-third split is still protected.',
      chk: 'tf_split',
      n: 'Recall what the 91st Amendment changed in 2003.',
    }),
    sl('summary', 'Summary of Part 1', {
      bl: [
        'At least **two sessions** a year; gap **not more than six months**; quorum **one-tenth**.',
        '**Starred** (oral, supplementaries), **unstarred** (written), **short notice** (urgent); **Zero Hour** follows.',
        '**Adjournment motion** (urgent matter, 50 members); **no-confidence** (Lok Sabha only; whole ministry resigns).',
        '**Tenth Schedule** (1985): grounds, two-thirds merger, Speaker decides; split exception removed in 2003.',
      ],
      v: vControlTools,
      n: 'To sum up: Parliament meets at least twice a year with no gap over six months, and needs one-tenth of its members present. Questions and Zero Hour keep ministers answerable. The adjournment motion spotlights an urgent matter, and the no-confidence motion can bring down a government. The Anti-Defection Law disqualifies members who switch sides, except in a two-thirds merger.',
    }),
    sl('exam-tips', 'Exam tips for Part 1', {
      bl: [
        'Write "**one-tenth of the total membership**", not "one-tenth of members present".',
        'Keep **prorogation** and **dissolution** apart.',
        'Do not say an adjournment motion removes the government; only a **no-confidence** motion does.',
        'For defection, the exception today is a **two-thirds merger**; the one-third split was removed in **2003**.',
        'In 3 + 3 + 4 questions, give one clear point per mark and use the terms in bold.',
      ],
      n: 'Some common slips. Quorum is one-tenth of the total membership, not of those present. Prorogation ends a session; dissolution ends the Lok Sabha. Only a no-confidence motion can remove the government. And the defection exception today is a two-thirds merger. In structured questions, write one clear point for each mark.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'Parliamentary Procedures — Part 2: Making Laws and the Powers of Parliament',
  goals: [
    'Outline the stages of an ordinary bill, including a joint sitting',
    'Compare the procedure for a Money Bill with that for an ordinary bill',
    'Explain the legislative, financial, judicial, electoral, amending and controlling powers of Parliament',
    'List the exclusive powers of each House and explain why the Lok Sabha leads in money matters',
  ],
  slides: [
    sl('title', 'How Parliament makes laws and uses its powers', {
      b: 'Part 2 — the journey of a **bill**, the special path of a **Money Bill**, and the **powers** of Parliament and of each House.',
      v: vRoute2,
      n: 'In this part we follow a bill as it becomes a law. We compare the path of an ordinary bill with the stricter path of a Money Bill, see what happens when the two Houses disagree, and then look at all the powers Parliament uses, and the special powers that belong to each House alone.',
    }),
    sl('diagram', 'The journey of an ordinary bill', {
      v: vOrdinary,
      n: 'An ordinary bill can begin in either House. At the first reading it is introduced. At the second reading the House discusses it, may send it to a committee, and considers it clause by clause. At the third reading the House votes on it as a whole. The other House then goes through the same readings before the bill goes to the President.',
    }),
    sl('check', 'Quick check: which reading?', {
      b: 'At which stage are clauses voted on one by one?',
      chk: 'm_reading_stage',
      n: 'Think about where the detailed work on a bill happens.',
    }),
    sl('concept', 'When the Houses disagree', {
      b: 'If the second House **rejects** the bill, insists on amendments the first House will not accept, or **does nothing for six months**, the **President** may call a **joint sitting**.',
      bl: ['The **Speaker** presides.', 'The bill is decided by a **majority of members of both Houses present and voting**.'],
      v: vSizes,
      n: 'Sometimes the two Houses cannot agree on an ordinary bill. If one House rejects it, or insists on amendments the other will not accept, or simply sits on it for six months, the President may call both Houses to meet together. The Speaker presides, and members of both Houses vote together. Because the Lok Sabha is more than twice as large, its view usually wins.',
    }),
    sl('check', 'Quick check: who presides?', {
      b: 'Fill in the blank about the joint sitting.',
      chk: 'fb_joint',
      n: 'Which presiding officer takes the chair when both Houses sit together?',
    }),
    sl('diagram', 'The President and an ordinary bill', {
      b: 'The President may **assent**, **withhold assent**, or **return** the bill once for reconsideration. If both Houses pass it again, the President **must assent**.',
      v: table(['President\'s choice', 'What happens next'], [['Assent', 'The bill becomes an Act'], ['Withhold assent', 'The bill does not become law'], ['Return for reconsideration', 'If passed again, assent must be given']], 'Table of the President\'s three choices on an ordinary bill: assent, withhold assent, or return it once for reconsideration, after which assent must be given if it is passed again'),
      n: 'When an ordinary bill reaches the President, there are three choices. Assent turns it into an Act. Assent can be withheld. Or the bill can be sent back once, with suggestions, for Parliament to think again. If both Houses pass it a second time, with or without changes, the President must then give assent.',
    }),
    sl('diagram', 'The special path of a Money Bill', {
      v: vMoney,
      n: `A Money Bill deals with taxes, government borrowing and spending from the Consolidated Fund of India. It can be introduced only in the Lok Sabha, and only on the President's recommendation. The Speaker certifies it as a Money Bill, and that decision is final. After the Lok Sabha passes it, the Rajya Sabha must return it within ${MONEY_BILL_DAYS} days. Its suggestions can be accepted or rejected.`,
    }),
    sl('two-column', 'Ordinary Bill and Money Bill side by side', {
      cols: [
        '**Ordinary Bill**\n- Either House\n- Rajya Sabha can amend or reject\n- Deadlock: joint sitting\n- President may return it once',
        `**Money Bill**\n- Lok Sabha only, on the President's recommendation\n- Rajya Sabha can only delay ${MONEY_BILL_DAYS} days\n- No joint sitting\n- Not returned by the President`,
      ],
      v: vCompare,
      n: 'Put the two side by side. An ordinary bill can start in either House, the Rajya Sabha can change or reject it, and a joint sitting settles deadlocks. A Money Bill must start in the Lok Sabha, the Rajya Sabha can only delay it for fourteen days, there is never a joint sitting, and the President does not send it back.',
    }),
    sl('example', 'Worked example 3: two bills in trouble', {
      b: 'Bill A changes income tax rates; Bill B sets up a river-cleaning authority and the Houses disagree on it.',
      bl: [
        'Step 1 — Classify: Bill A is a **Money Bill**; Bill B is an **ordinary bill**.',
        `Step 2 — Bill A: the Rajya Sabha has ${MONEY_BILL_DAYS} days; its suggestions are not binding.`,
        'Step 3 — Bill B: the President may call a **joint sitting**; the Speaker presides.',
        'Step 4 — Conclude: no joint sitting is ever needed for Bill A.',
      ],
      v: flow('LR', ['Classify the bill', 'Apply its procedure', 'Name who decides', 'State the outcome'], 'Flow of the method for bill problems: classify the bill, apply its procedure, name who decides and state the outcome', 'Method for bill problems.'),
      n: 'With any bill problem, first decide what kind of bill it is. A bill on tax rates is a Money Bill, so the Rajya Sabha can only hold it for fourteen days and the Lok Sabha may ignore its suggestions. A bill setting up an authority is an ordinary bill, so a deadlock goes to a joint sitting chaired by the Speaker.',
    }),
    sl('diagram', 'Six kinds of powers', {
      v: vPowers,
      n: 'Parliament has six kinds of powers. It makes laws, controls money, acts as a court when it impeaches the President or removes judges, takes part in elections to high offices, amends the Constitution, and holds the executive to account. Learn one clear example for each kind, because examiners often ask you to explain three or four of them.',
    }),
    sl('diagram', 'Laws on the State List', {
      b: 'Normally the States make these laws, but Parliament can step in.',
      v: vStateList,
      n: 'Subjects in the State List normally belong to the States. Parliament can make laws on them in special situations: when the Rajya Sabha passes a resolution by two-thirds of the members present and voting that it is needed in the national interest, when a national emergency is in force, or when two or more States ask it to.',
    }),
    sl('check', 'Quick check: an electoral function', {
      b: 'Which of these is an electoral function of Parliament?',
      chk: 'm_electoral',
      n: 'Look for the option in which members of Parliament choose someone for an office.',
    }),
    sl('concept', 'Financial power and control of the executive', {
      bl: [
        'No tax without a **law of Parliament**; the budget and **demands for grants** need approval.',
        'Committees check accounts and audit reports.',
        'Control through **questions**, **debates**, **cut motions**, **adjournment** and **no-confidence** motions.',
      ],
      v: vControlTools,
      n: 'Parliament is the keeper of the public purse: no tax can be collected without its law, and no money spent without its approval. It also watches the government constantly, through questions, debates, cut motions on budget demands, adjournment motions and, in the end, the no-confidence motion. These tools range from gentle questioning to removing a government.',
    }),
    sl('diagram', 'Exclusive powers of each House', {
      v: vExclusive,
      n: 'Some powers belong to one House only. The Lok Sabha controls money: Money Bills start there, it alone votes demands for grants, and only it can pass a no-confidence motion. The Rajya Sabha speaks for the States: only it can pass resolutions under Article two hundred and forty-nine and Article three hundred and twelve, and a resolution to remove the Vice-President must begin there.',
    }),
    sl('check', 'Quick check: a Lok Sabha power', {
      b: 'Which power belongs to the Lok Sabha alone?',
      chk: 'm_ls_exclusive',
      n: 'Think about money, and about which House the government answers to.',
    }),
    sl('example', 'Worked example 4: planning a 10-mark answer', {
      b: 'Question: (i) What is a Money Bill? [3] (ii) How is it passed? [3] (iii) Compare the two Houses\' powers over it. [4]',
      bl: [
        '(i) Meaning (taxes, borrowing, Consolidated Fund) + Speaker\'s final certificate.',
        `(ii) Lok Sabha only, President's recommendation, ${MONEY_BILL_DAYS} days, recommendations, deemed passed.`,
        '(iii) Lok Sabha final say; Rajya Sabha delay only; no joint sitting; **reason**: direct election and responsibility.',
        'Aim for one point per mark; the reason in (iii) earns the last marks.',
      ],
      v: table(['Part', 'Marks', 'Points to include'], [['(i)', '3', 'Meaning; Speaker certifies'], ['(ii)', '3', 'Introduction; 14 days; deemed passed'], ['(iii)', '4', 'Comparison; reason for the difference']], 'Table planning a three-part ten-mark answer on Money Bills with the marks and points for each part'),
      n: 'Here is how to plan a ten-mark question in three parts. Give three points for a three-mark part and four for the last part. For part three, do not just list differences; explain why they exist. The Lok Sabha is directly elected and the government answers to it, so it controls money.',
    }),
    sl('summary', 'Summary of Part 2', {
      bl: [
        'Ordinary Bill: three readings in each House; deadlock → **joint sitting** (Speaker presides); President may return once.',
        `Money Bill: **Lok Sabha only**, President's recommendation, **Speaker certifies**, Rajya Sabha **${MONEY_BILL_DAYS} days**, no joint sitting.`,
        'Powers: legislative, financial, judicial, electoral, amending, control over the executive.',
        'Exclusive: Lok Sabha (money, grants, no-confidence); Rajya Sabha (Articles **249**, **312**, Vice-President\'s removal begins there).',
      ],
      v: vCompare,
      n: 'To sum up: an ordinary bill passes three readings in each House, and a joint sitting can settle a deadlock. A Money Bill starts only in the Lok Sabha, is certified by the Speaker, and can be held by the Rajya Sabha for just fourteen days. Parliament has six kinds of powers, and each House has a few powers of its own.',
    }),
    sl('exam-tips', 'Exam tips for Part 2', {
      bl: [
        'Never write that a Money Bill can go to a joint sitting.',
        `The Rajya Sabha's limit on a Money Bill is **${MONEY_BILL_DAYS} days**; for an ordinary bill the joint-sitting trigger is **six months**.`,
        'The **Speaker** certifies Money Bills and presides over joint sittings.',
        'Articles **249** and **312** need a **two-thirds** majority of members present and voting in the Rajya Sabha.',
        'When asked to "compare", give points for both sides and a reason.',
      ],
      n: 'Watch out for these traps. There is no joint sitting for a Money Bill. Fourteen days is the Rajya Sabha\'s limit on a Money Bill, while six months of inaction can lead to a joint sitting on an ordinary bill. The Speaker certifies Money Bills and chairs joint sittings. And the Rajya Sabha\'s special resolutions need a two-thirds majority.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'Parliamentary Procedures and Powers of Parliament — notes',
  sections: [
    {
      h: '1. Sessions and quorum',
      t: 1,
      b: '- The **President** summons and prorogues the Houses and may dissolve the Lok Sabha (on ministerial advice).\n- Parliament must meet **at least twice a year**, and **not more than six months** may pass between two sessions.\n- Usual sessions: **Budget** (early in the year), **Monsoon** (about July–September), **Winter** (November–December).\n- **Adjournment** ends a sitting; **prorogation** ends a session; **dissolution** ends the Lok Sabha\'s term. The Rajya Sabha is permanent.\n- **Quorum:** one-tenth of the total membership of a House, including the presiding officer. Without it the sitting is adjourned or suspended.',
      terms: [['Quorum', 'Minimum attendance for a House to transact business: one-tenth of its total membership.'], ['Prorogation', 'Ending a session of a House by order of the President, without ending the House.']],
      v: vStripOk,
      vs: [vQuorum],
    },
    {
      h: '2. Question Hour and Zero Hour',
      t: 2,
      b: '- **Question Hour** is normally the first hour of a sitting; ministers answer questions about their departments.\n- **Starred:** oral reply; supplementaries allowed. **Unstarred:** written reply placed on the table; no supplementaries. **Short notice:** urgent public matter; less than ten days\' notice; oral reply.\n- **Zero Hour** begins after Question Hour (around noon). Members raise urgent issues without the usual notice. It is a **practice**, not part of the rules of procedure.\n- Both keep the executive **answerable in public**.',
      terms: [['Supplementary question', 'A follow-up question asked after the oral reply to a starred question.'], ['Zero Hour', 'Time after Question Hour when members raise urgent matters without the usual notice.']],
      v: vDay,
      vs: [vQTypes],
    },
    {
      h: '3. Adjournment motion and no-confidence motion',
      t: 3,
      b: '- **Adjournment motion:** sets aside listed business to discuss a **definite matter of urgent public importance**; admitted only if **50 members** support it; used in the Lok Sabha; implies criticism of the government but does not remove it.\n- **No-confidence motion:** only in the **Lok Sabha**; needs **50 members**\' support to be admitted; no reasons need be given; after debate the House votes.\n- If carried, the **Council of Ministers resigns as a body**, because it is **collectively responsible** to the Lok Sabha.',
      terms: [['Collective responsibility', 'Ministers stand or fall together on the confidence of the Lok Sabha.']],
      v: vMotions,
      vs: [vNoConf],
    },
    {
      h: '4. The Anti-Defection Law',
      t: 4,
      b: '- **Tenth Schedule**, added by the **52nd Amendment (1985)**.\n- **Grounds for disqualification:** giving up party membership voluntarily; voting or abstaining against the party\'s direction without permission (unless condoned within the time allowed); an independent joining a party; a nominated member joining a party **after six months**.\n- **Exception:** merger with another party supported by **two-thirds** of the legislature party. The **91st Amendment (2003)** ended the one-third split exception.\n- The **Speaker** or **Chairman** decides; since **1992** the decision can be reviewed by courts.\n- **Assessment:** promotes stability and respects the voters\' party choice; but limits free voting and strengthens party leaders.',
      terms: [['Defection', 'A legislator leaving or acting against the party on whose ticket he was elected.'], ['Tenth Schedule', 'The part of the Constitution containing the Anti-Defection Law.']],
      v: vDefect,
      vs: [vDefectTime],
    },
    {
      h: '5. Making laws: Ordinary Bill and Money Bill',
      t: 5,
      b: '- **Ordinary Bill:** may begin in either House; **first reading** (introduction), **second reading** (discussion, committee, clause-by-clause), **third reading** (passing as a whole); same in the other House; then assent.\n- **Deadlock** (rejection, unacceptable amendments, or six months without action): the President may summon a **joint sitting**; the **Speaker** presides; majority of members of both Houses present and voting decides.\n- **President:** may assent, withhold assent, or return once; must assent if passed again.\n- **Money Bill:** taxes, borrowing, Consolidated Fund; only in the **Lok Sabha** on the President\'s recommendation; **Speaker\'s certificate** is final; Rajya Sabha must return it in **14 days**, with recommendations the Lok Sabha may reject; otherwise deemed passed; no joint sitting.',
      terms: [['Money Bill', 'A bill dealing only with taxation, borrowing or the Consolidated Fund, as certified by the Speaker.'], ['Joint sitting', 'A meeting of both Houses together to settle a disagreement on an ordinary bill.']],
      v: vOrdinary,
      vs: [vMoney, vCompare],
    },
    {
      h: '6. Powers of Parliament and exclusive powers of each House',
      t: [6, 7],
      b: '- **Legislative:** Union List, Concurrent List, residuary subjects; State List under Article 249, a national emergency, or the request of two or more States.\n- **Financial:** no tax without its law; budget and demands for grants.\n- **Judicial:** impeachment of the President; removal of judges.\n- **Electoral:** elects the Vice-President; elected members join in electing the President.\n- **Amending:** most amendments by special majority; some also need ratification by half the States.\n- **Control over the executive:** questions, debates, cut motions, adjournment and no-confidence motions.\n- **Lok Sabha alone:** Money Bills begin there; demands for grants; no-confidence motion.\n- **Rajya Sabha alone:** Article 249 and Article 312 resolutions (two-thirds present and voting); removal of the Vice-President begins there.',
      terms: [['Cut motion', 'A motion to reduce a demand for grants, used to criticise government policy.'], ['Article 312', 'Provision under which the Rajya Sabha can authorise a new All India Service.']],
      v: vPowers,
      vs: [vExclusive, vStateList],
    },
  ],
  tips: '**Common mistakes**\n- Writing that quorum is one-tenth of those present (it is one-tenth of the total membership).\n- Mixing up prorogation and dissolution.\n- Saying an adjournment motion removes the government.\n- Allowing a joint sitting for a Money Bill.\n- Forgetting that the 91st Amendment removed the one-third split exception.\n\n**How marks are usually awarded**\n- 1-mark items: one correct option or term.\n- 2 marks: two distinct points.\n- 10-mark questions in 3 + 3 + 4 parts: one clear point per mark; the last part usually needs a reason or a comparison.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Who summons and prorogues Parliament?', 'The **President** (on ministerial advice).', 'fact', 1],
  ['Longest gap allowed between two sessions', '**Six months**.', 'fact', 1],
  ['The three usual sessions', 'Budget, Monsoon and Winter.', 'fact', 1],
  ['Quorum of a House', 'One-tenth of its **total membership**.', 'definition', 1],
  ['Prorogation vs dissolution', 'Prorogation ends a **session**; dissolution ends the **Lok Sabha**.', 'concept', 1],
  ['Starred question', 'Oral answer; **supplementaries** allowed.', 'definition', 2],
  ['Unstarred question', 'Written answer; no supplementaries.', 'definition', 2],
  ['Short notice question', 'Urgent matter; less than **ten days**\' notice; oral reply.', 'definition', 2],
  ['Zero Hour', 'After Question Hour; urgent matters; a **practice**, not a rule.', 'definition', 2],
  ['Adjournment motion', 'Sets aside business for a **definite urgent matter**; **50** members must support.', 'definition', 3],
  ['No-confidence motion: where and support', '**Lok Sabha** only; **50** members.', 'fact', 3],
  ['No-confidence motion passed', 'The **whole Council of Ministers** resigns.', 'concept', 3],
  ['Anti-Defection Law: amendment and Schedule', '**52nd** Amendment, **1985**; **Tenth** Schedule.', 'fact', 4],
  ['Exception to disqualification today', 'Merger backed by **two-thirds** of the legislature party.', 'fact', 4],
  ['What did the 91st Amendment (2003) change?', 'Removed the **one-third split** exception.', 'fact', 4],
  ['Who decides defection cases?', 'The **Speaker** or **Chairman**; open to judicial review.', 'fact', 4],
  ['Nominated member and parties', 'May join a party within **six months** of taking the seat.', 'fact', 4],
  ['Three readings of a bill', 'Introduction; discussion and clauses; passing as a whole.', 'concept', 5],
  ['Joint sitting: who calls, who presides', 'Called by the **President**; presided over by the **Speaker**.', 'fact', 5],
  ['When can a joint sitting be called?', 'Rejection, unacceptable amendments, or **six months** without action on an ordinary bill.', 'concept', 5],
  ['Money Bill: where introduced', '**Lok Sabha** only, on the President\'s recommendation.', 'fact', 5],
  ['Who certifies a Money Bill?', 'The **Speaker**; the decision is final.', 'fact', 5],
  ['Rajya Sabha and a Money Bill', `Must return it within **${MONEY_BILL_DAYS} days**; recommendations only.`, 'fact', 5],
  ['President and an ordinary bill', 'Assent, withhold, or return **once**.', 'concept', 5],
  ['Six kinds of powers of Parliament', 'Legislative, financial, judicial, electoral, amending, control over the executive.', 'concept', 6],
  ['When can Parliament legislate on the State List?', 'Article 249 resolution; national emergency; request of two or more States.', 'concept', 6],
  ['Judicial powers of Parliament', 'Impeach the President; remove judges.', 'example', 6],
  ['Rajya Sabha exclusive powers', 'Articles **249** and **312**; removal of the Vice-President begins there.', 'fact', 7],
  ['Lok Sabha exclusive powers', 'Money Bills, demands for grants, no-confidence motion.', 'fact', 7],
  ['Why the Lok Sabha leads in money matters', 'It is **directly elected** and the government is **responsible** to it.', 'exam-tip', 7],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-10-history-civics-chapter-test-short',
  title: 'Chapter test (short) — Parliamentary Procedures and Powers of Parliament',
  duration: 30,
  sections: [
    { id: 'I', title: 'Part I — Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1–6 carry 1 mark each; questions 7 and 8 carry 2 marks each.', items: ['m_gap_rule', 'm_starred_reply', 'm_nc_where', 'm_money_bill_where', 'm_rs_exclusive', 'ar_nc_collective', 's_starred_unstarred', 's_money_compare'] },
    { id: 'II', title: 'Part II — Structured question (10 marks)', instr: 'Attempt any ONE of the two questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 1, keys: ['l_motions', 'l_ordinary_bill'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-10-history-civics-chapter-test-long',
  title: 'Chapter test (long) — Parliamentary Procedures and Powers of Parliament',
  duration: 60,
  sections: [
    { id: 'I', title: 'Part I — Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1–10 carry 1 mark each; questions 11–15 carry 2 marks each.', items: ['m_who_summons', 'm_short_notice_case', 'm_adjourn_support', 'm_tenth_schedule', 'm_defect_case', 'm_certify', 'm_deadlock', 'm_power_type', 'm_state_list', 'ar_finance', 's_quorum_why', 's_qh_control', 's_adjourn_vs_nc', 's_defection_grounds', 's_rs_two'] },
    { id: 'II', title: 'Part II — Structured questions (20 marks)', instr: 'Attempt any TWO of the three questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 2, keys: ['l_defection', 'l_money_bill', 'l_powers'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t07 of icse-10-history-civics-ch02 only (sessions and quorum; Question Hour and Zero Hour; adjournment and no-confidence motions; Anti-Defection Law; ordinary and money bills; powers of Parliament; exclusive powers of each House)',
    originality: 'every scenario, diary, note and letter is imagined and written by SOYL (labelled); no textbook text or exercise and no specimen or board-paper item reused (D-036); no real person quoted; no current office-holder named',
    data: `session gaps computed (${maxGap(SESS_OK)} and ${maxGap(SESS_BAD)} months); quorum ${QUORUM_LS} of ${LS_SEATS_NOW} and ${QUORUM_RS} of 245 computed; Lok Sabha more than twice the Rajya Sabha asserted`,
    facts: 'at least two sessions a year, gap not over six months; quorum one-tenth of total membership; Question Hour first hour, starred/unstarred/short notice (less than ten days); Zero Hour a practice after Question Hour; adjournment motion and no-confidence motion need 50 members, no-confidence only in the Lok Sabha; Tenth Schedule by the 52nd Amendment 1985, judicial review 1992, 91st Amendment 2003; Money Bill only in the Lok Sabha on the President\'s recommendation, Speaker certifies, Rajya Sabha 14 days, no joint sitting; joint sitting called by the President, Speaker presides; Articles 249 and 312 two-thirds of members present and voting; removal of the Vice-President begins in the Rajya Sabha',
    gate: 'schema, content lint (lintExemplar), deterministic verify, originality pre-check and the editorial counts run clean on this chapter',
  },
});
