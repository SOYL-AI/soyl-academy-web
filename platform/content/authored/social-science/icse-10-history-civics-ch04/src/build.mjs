// Build ICSE 10 History & Civics ch04 The Prime Minister and the Council of Ministers. Run from platform/:
//   npx tsx content/authored/social-science/icse-10-history-civics-ch04/src/build.mjs
import path from 'node:path';
import assert from 'node:assert/strict';
import { fileURLToPath } from 'node:url';
import { setUnit, deck, sl, table, flow, notes, cards, test, build, Svg } from '../../icse-10-history-civics-ch01/src/lib.mjs';

setUnit('icse-10-history-civics-ch04', 'social-science');
const { tiers, houseBars, LS_NOW, MAX_MINISTERS, MAJORITY, P_PLUS_R, NON_MEMBER_MONTHS } = await import('./questions.mjs');
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

// ---------------------------------------------------------------- figures
const vRoute1 = flow('LR', ['Appointing the Prime Minister', 'Forming the Council of Ministers', 'Tenure and size', 'Three ranks of ministers', 'Council versus Cabinet'], 'Route map of Part 1: appointing the Prime Minister, forming the Council of Ministers, its tenure and size, the three ranks of ministers, and the difference between the Council and the Cabinet', 'Part 1 at a glance');
const vRoute2 = flow('LR', ['Functions of the Cabinet', 'Collective responsibility', 'Individual responsibility', 'Position of the Prime Minister', 'Powers of the Prime Minister'], 'Route map of Part 2: functions of the Cabinet, collective and individual responsibility, and the position and powers of the Prime Minister', 'Part 2 at a glance');
const vAppoint = flow('TB', ['General election to the Lok Sabha', 'Clear majority? President invites its leader', 'No majority? President judges who can win a confidence vote', 'Prime Minister appointed and sworn in', 'Other ministers appointed on the Prime Minister\'s advice'], 'Flow of forming the government: after a Lok Sabha election the President invites the leader of the majority, or in a hung House judges who can win a confidence vote; the Prime Minister is sworn in and the other ministers are appointed on the Prime Minister\'s advice', 'How a government is formed.');
const vBars = houseBars(`Bar picture of an imagined Lok Sabha of ${LS_NOW}: Party P 248 seats, Party Q 182, Party R 61, others 52; a dashed line marks the majority of ${MAJORITY}, which no single party reaches`, 'Imagined election result: a hung House.');
const vTiers = tiers('Three-tier diagram of the Council of Ministers: the Prime Minister at the top, then Cabinet Ministers, then Ministers of State, then Deputy Ministers at the widest base; the Cabinet Ministers form the inner core', 'The Council of Ministers and its inner core, the Cabinet (schematic).');
const vRules = table(['Rule', 'What it says', 'Source'], [
  ['Appointment', 'President appoints the Prime Minister; other ministers on the Prime Minister\'s advice', 'Article 75(1)'],
  ['Size', `Not more than 15 per cent of the Lok Sabha strength, including the Prime Minister (${MAX_MINISTERS} for ${LS_NOW})`, 'Article 75(1A), 91st Amendment 2003'],
  ['Tenure', 'During the pleasure of the President: in practice while the Lok Sabha supports the ministry', 'Article 75(2) and 75(3)'],
  ['Non-member', `Must enter either House within ${NON_MEMBER_MONTHS} months`, 'Article 75(5)'],
], 'Table of four constitutional rules on the ministry: appointment by the President, size limited to 15 per cent of the Lok Sabha, tenure during the pleasure of the President, and the six-month rule for non-members');
const vSize = (() => {
  const s = new Svg(640, 170);
  const W = (n) => (n / LS_NOW) * 520;
  s.rect(40, 40, W(LS_NOW), 34, { rx: 3, fill: 'muted', fillOpacity: 0.18, color: 'muted', sw: 1.2 });
  s.text(40 + W(LS_NOW) / 2, 57, `Lok Sabha: ${LS_NOW} members`, { size: 13 });
  s.rect(40, 100, W(MAX_MINISTERS), 34, { rx: 3, fill: 'accent', fillOpacity: 0.4, color: 'accent', sw: 1.5 });
  s.text(40 + W(MAX_MINISTERS) + 10, 117, `Largest ministry: ${MAX_MINISTERS} (15 per cent)`, { anchor: 'start', size: 13 });
  return s.visual(`Two bars: the Lok Sabha of ${LS_NOW} members and, below it, the largest allowed ministry of ${MAX_MINISTERS}, which is 15 per cent of the House`, 'The ceiling added by the 91st Amendment (2003).');
})();
assert.equal(MAX_MINISTERS, Math.floor(LS_NOW * 0.15));
const vCompare = table(['Point', 'Council of Ministers', 'Cabinet'], [
  ['Members', 'All three ranks', 'Cabinet Ministers only'],
  ['Size', 'Large', 'Small'],
  ['Meetings', 'Rarely meets as one body', 'Meets regularly under the Prime Minister'],
  ['Role', 'Carries out decisions', 'Takes the main policy decisions'],
  ['Emergency', 'No separate role', 'Must advise a national emergency in writing'],
], 'Table comparing the Council of Ministers and the Cabinet by members, size, meetings, role and part in a national emergency');
const vRanks = table(['Rank', 'Typical work', 'In Cabinet meetings?'], [
  ['Cabinet Minister', 'Heads an important ministry', 'Yes, as a member'],
  ['Minister of State', 'Helps a Cabinet Minister or holds independent charge', 'Only when invited'],
  ['Deputy Minister', 'Assists senior ministers; no charge of his own', 'No'],
], 'Table of the three ranks of ministers: Cabinet Ministers head important ministries and attend the Cabinet; Ministers of State help or hold independent charge and attend only when invited; Deputy Ministers assist and do not attend');
const vFunctions = table(['Function', 'What the Cabinet does', 'Imagined example'], [
  ['Policy making', 'Decides domestic and foreign policy', 'Raises crop-insurance cover for farmers'],
  ['Administrative', 'Coordinates ministries and settles disputes', 'Decides which ministry builds a bridge'],
  ['Legislative', 'Chooses and steers government bills', 'Approves a wetlands bill for Parliament'],
  ['Financial', 'Prepares the budget and tax proposals', 'Approves proposals for the Finance Minister'],
  ['Emergency', 'Advises a national emergency in writing', 'Written decision before a proclamation'],
], 'Table of the five functions of the Cabinet with what each involves and an imagined example: policy making, administrative coordination, legislative, financial and emergency');
const vEmergency = flow('LR', ['Cabinet meets and decides', 'Written recommendation to the President', 'Proclamation of national emergency', 'Approval by both Houses within one month'], 'Flow of a national emergency after the 44th Amendment: Cabinet decision, written recommendation to the President, proclamation, and approval by both Houses within one month', 'Article 352(3), added by the 44th Amendment (1978).');
const vCollective = flow('LR', ['Cabinet decides together', 'Every minister defends the decision', 'Lok Sabha withdraws confidence', 'Whole Council of Ministers resigns'], 'Flow of collective responsibility: the Cabinet decides together, every minister defends the decision, and if the Lok Sabha withdraws confidence the whole Council of Ministers resigns', 'Article 75(3): they stand or fall together.');
const vTwoResp = table(['', 'Collective responsibility', 'Individual responsibility'], [
  ['Answerable to', 'The Lok Sabha', 'The President, on the Prime Minister\'s advice'],
  ['For', 'Every decision of the government', 'The work of one minister\'s department'],
  ['If it fails', 'The whole ministry resigns', 'That minister alone may be removed'],
  ['Basis', 'Article 75(3)', 'Article 75(2): office during the President\'s pleasure'],
], 'Table comparing collective responsibility (to the Lok Sabha, for all decisions, whole ministry resigns, Article 75(3)) with individual responsibility (to the President on the Prime Minister\'s advice, for one department, only that minister removed, Article 75(2))');
const vPmRoles = (() => {
  const s = new Svg(660, 300);
  s.rect(255, 125, 150, 50, { rx: 10, fill: 'accent', fillOpacity: 0.35, color: 'accent', sw: 2 });
  s.text(330, 150, 'Prime Minister', { size: 14, bold: true });
  const nodes = [
    [110, 45, 'Council of Ministers', 'chooses, presides'],
    [550, 45, 'President', 'link (Article 78)'],
    [110, 255, 'Lok Sabha', 'leader of majority'],
    [550, 255, 'The nation', 'spokesperson, crisis'],
  ];
  nodes.forEach(([x, y, a, b]) => {
    s.rect(x - 95, y - 26, 190, 52, { rx: 8, fill: 'muted', fillOpacity: 0.12, color: 'muted', sw: 1.2 });
    s.text(x, y - 8, a, { size: 13, bold: true });
    s.text(x, y + 12, b, { size: 11, muted: true });
    const tx = x < 330 ? 255 : 405;
    const ty = y < 150 ? 125 : 175;
    s.line(x + (x < 330 ? 95 : -95), y, tx, ty, { sw: 1.4, color: 'accent' });
  });
  return s.visual('Diagram with the Prime Minister at the centre linked to four boxes: the Council of Ministers (chooses and presides), the President (link under Article 78), the Lok Sabha (leader of the majority) and the nation (spokesperson and crisis manager)', 'The four relationships of the Prime Minister.');
})();
const vNominalReal = table(['', 'President', 'Prime Minister'], [
  ['Role', 'Head of the State', 'Head of the government'],
  ['How chosen', 'Indirectly, by an Electoral College', 'Appointed as leader of the Lok Sabha majority'],
  ['Power in practice', 'Acts on ministerial advice (Article 74)', 'Leads the Council that gives the advice'],
  ['Removal', 'Impeachment by Parliament', 'Loss of the Lok Sabha\'s confidence'],
], 'Table comparing the President as nominal head of the State and the Prime Minister as real head of the government by role, how chosen, power in practice and removal');
const vAmend = flow('LR', ['1976: 42nd Amendment makes advice binding', '1978: 44th Amendment allows one reconsideration', 'After reconsideration the President must act on the advice'], 'Timeline flow: in 1976 the 42nd Amendment made ministerial advice binding on the President; in 1978 the 44th Amendment allowed the President to ask for one reconsideration, after which the advice must be followed', 'Article 74(1).');
const vMajCoal = table(['', 'Single-party majority', 'Coalition'], [
  ['Choosing ministers', 'Largely the Prime Minister\'s choice', 'Shared with partners'],
  ['Policy', 'Party programme carried through', 'Common programme negotiated'],
  ['Risk to the government', 'Low while the party is united', 'A partner may withdraw support'],
], 'Table comparing the Prime Minister\'s position in a single-party majority government and in a coalition: choice of ministers, policy and risk to the government');

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: 'The Prime Minister and the Council of Ministers — Part 1: Forming the Government',
  goals: [
    'Explain how the President appoints the Prime Minister, including in a hung House',
    'Describe how the Council of Ministers is formed, its tenure and the limit on its size',
    'Name the three ranks of ministers and their roles',
    'Distinguish the Council of Ministers from the Cabinet',
  ],
  slides: [
    sl('title', 'The Prime Minister and the Council of Ministers', {
      b: 'Part 1 — who becomes **Prime Minister**, how the **ministry** is formed, how long it lasts and how **big** it can be.',
      v: vRoute1,
      n: 'In the last chapter we met the President, the head of the State. But the day to day work of the Union government is done by the Prime Minister and the Council of Ministers. In this part we see how the Prime Minister is chosen, how ministers are appointed, how long the ministry stays in office, and how the Cabinet differs from the larger Council.',
    }),
    sl('diagram', 'Forming the government', {
      v: vAppoint,
      n: 'After a general election to the Lok Sabha, the President invites the leader of the party or alliance that has a majority, and appoints that leader as Prime Minister. The other ministers are then appointed by the President on the advice of the Prime Minister. Everything depends on support in the Lok Sabha, the directly elected House.',
    }),
    sl('concept', 'When the President has a choice', {
      b: 'If one party or a pre-poll alliance has a **clear majority**, its leader **must** be invited. In a **hung House**, the President uses **discretion**.',
      bl: ['Invite the leader most likely to **win a vote of confidence**.', 'The new Prime Minister may be asked to **prove the majority** on the floor within a set time.'],
      n: 'Usually the President has no real choice: the leader of the majority must be invited. Discretion arises only when no party or alliance has a majority. Then the President judges which leader is most likely to win a vote of confidence in the Lok Sabha, and may ask that leader to prove it on the floor of the House within a set time.',
    }),
    sl('example', 'Worked example 1: a hung House', {
      b: `An imagined result: Party P 248, Party Q 182, Party R 61, others 52 in a House of ${LS_NOW}.`,
      bl: [
        `Step 1 — Majority mark: half of ${LS_NOW}, plus one, is ${MAJORITY}.`,
        'Step 2 — No party reaches it alone.',
        `Step 3 — P and R together: 248 plus 61 is ${P_PLUS_R}, above ${MAJORITY}.`,
        'Step 4 — The President invites the P–R alliance leader, who proves the majority in a confidence vote.',
      ],
      v: vBars,
      n: `Let us work through an imagined result. The majority mark in a House of ${LS_NOW} is ${MAJORITY}. Party P, with 248 seats, falls short. But P and R together have ${P_PLUS_R} seats, more than enough. So the President would invite the leader of their alliance, who would then win a vote of confidence. Notice that being the second largest party gives Q no claim.`,
    }),
    sl('check', 'Quick check: tenure', {
      b: 'How long does the Council of Ministers stay in office in practice?',
      chk: 'm_tenure',
      n: 'The phrase in the Constitution is during the pleasure of the President. But think about whose support really keeps a government alive.',
    }),
    sl('diagram', 'Four rules about the ministry', {
      v: vRules,
      n: 'Four rules in Article seventy-five shape the ministry. The President appoints the Prime Minister and, on the Prime Minister\'s advice, the other ministers. The total cannot be more than fifteen per cent of the Lok Sabha. Ministers hold office during the President\'s pleasure, which in practice means as long as the Lok Sabha supports them. And a minister who is not in Parliament must enter it within six months.',
    }),
    sl('concept', 'Tenure: no fixed term', {
      bl: [
        'Ministers hold office **during the pleasure of the President**.',
        'The President acts on the **Prime Minister\'s advice**, so a minister stays as long as the Prime Minister wants.',
        'The **whole ministry** stays as long as it keeps the **confidence of the Lok Sabha**.',
        'A **non-member** can be a minister for up to **six months**.',
      ],
      n: 'The ministry has no fixed term. On paper it serves at the pleasure of the President, but the President acts on ministerial advice, so the real test is the Lok Sabha. A government that loses the support of the Lok Sabha must go. A person who is not a member of either House may become a minister, but must enter Parliament within six months.',
    }),
    sl('diagram', 'How big can the ministry be?', {
      b: 'The **91st Amendment (2003)** limits the ministry, **including the Prime Minister**, to **15 per cent** of the Lok Sabha strength.',
      v: vSize,
      n: `Before two thousand and three, ministries were sometimes very large, partly to reward supporters. The ninety-first amendment fixed a ceiling: the total number of ministers, including the Prime Minister, cannot be more than fifteen per cent of the strength of the Lok Sabha. With ${LS_NOW} members, that is at most ${MAX_MINISTERS} ministers.`,
    }),
    sl('check', 'Quick check: the size limit', {
      b: 'Which amendment added the 15 per cent ceiling?',
      chk: 'fb_size_amend',
      n: 'The same amendment of two thousand and three also tightened the Anti-Defection Law. Recall its number.',
    }),
    sl('example', 'Worked example 2: is this ministry allowed?', {
      b: 'An imagined new government wants 90 ministers, including the Prime Minister, in a Lok Sabha of 543.',
      bl: [
        'Step 1 — 15 per cent of 543 is 81.45.',
        `Step 2 — Round down: at most ${MAX_MINISTERS} ministers.`,
        'Step 3 — 90 is more than the limit, so 9 ministers must be dropped.',
        'Step 4 — In the exam, state the rule, the calculation and the amendment.',
      ],
      v: table(['Item', 'Figure'], [['Lok Sabha strength', String(LS_NOW)], ['15 per cent', '81.45'], ['Largest ministry allowed', String(MAX_MINISTERS)], ['Proposed ministry', '90'], ['Excess', String(90 - MAX_MINISTERS)]], `Table of the worked example: Lok Sabha ${LS_NOW}, 15 per cent is 81.45, the largest ministry allowed is ${MAX_MINISTERS}, the proposed ministry of 90 exceeds it by ${90 - MAX_MINISTERS}`),
      n: `Here is how to check the size of a ministry. Fifteen per cent of ${LS_NOW} is eighty one point four five. A minister is a whole person, so the most allowed is ${MAX_MINISTERS}. A plan for ninety ministers is nine too many. In an answer, state the rule, show the working, and name the ninety-first amendment.`,
    }),
    sl('diagram', 'Three ranks of ministers', {
      v: vTiers,
      n: 'The Council of Ministers has three ranks. Cabinet Ministers head the most important ministries and form the inner core. Ministers of State either help a Cabinet Minister or hold independent charge of a smaller ministry. Deputy Ministers assist senior ministers and have no charge of their own. At the top is the Prime Minister, who leads them all.',
    }),
    sl('diagram', 'What each rank does', {
      v: vRanks,
      n: 'This table sums up the ranks. Only Cabinet Ministers are members of the Cabinet and attend its meetings as of right. A Minister of State attends only when a matter of his or her ministry is discussed. Deputy Ministers do not attend Cabinet meetings at all. Remember the phrase independent charge: it means a Minister of State runs a ministry without a Cabinet Minister above.',
    }),
    sl('check', 'Quick check: the three ranks', {
      b: 'Which three ranks make up the Council of Ministers?',
      chk: 'm_three_ranks',
      n: 'Look for the option in which every name is a kind of minister.',
    }),
    sl('concept', 'Council of Ministers and Cabinet', {
      b: 'The **Cabinet** is the **inner group** of senior ministers inside the larger **Council of Ministers**.',
      bl: ['The Council is large and **rarely meets** as one body.', 'The Cabinet meets **regularly** and takes the main decisions.', 'The Constitution speaks of the **Council**; the word Cabinet appears once, in the emergency provision.'],
      n: 'People often use the words Cabinet and Council of Ministers as if they meant the same thing. They do not. The Council is the whole ministry of all three ranks, too large to discuss policy in detail. The Cabinet is the small inner group of senior ministers that meets regularly and takes the real decisions, which the Council then carries out.',
    }),
    sl('diagram', 'Comparing the two bodies', {
      v: vCompare,
      n: 'Compare them point by point. The Council has all three ranks; the Cabinet only Cabinet Ministers. The Council is large; the Cabinet small. The Council rarely meets as one body; the Cabinet meets regularly under the Prime Minister. The Cabinet decides policy; the Council carries it out. And a national emergency needs the written advice of the Cabinet.',
    }),
    sl('check', 'Quick check: a Rajya Sabha Prime Minister?', {
      b: 'True or false: a member of the Rajya Sabha can become Prime Minister.',
      chk: 'tf_rs_member_pm',
      n: 'Ask what the Constitution requires: membership of a particular House, or the support of a particular House?',
    }),
    sl('summary', 'Summary of Part 1', {
      bl: [
        'President appoints the **Prime Minister**: the majority leader, or by **discretion** in a hung House.',
        'Other ministers appointed **on the Prime Minister\'s advice**; non-members must enter Parliament within **six months**.',
        `No fixed term: in office while the **Lok Sabha** supports it; size at most **15 per cent** (${MAX_MINISTERS}).`,
        'Three ranks; the **Cabinet** is the decision-making core of the **Council**.',
      ],
      v: vTiers,
      n: 'To sum up. The President appoints the leader who can command a majority in the Lok Sabha as Prime Minister, and the other ministers on that leader\'s advice. The ministry has no fixed term and lasts while the Lok Sabha supports it, and it cannot be more than fifteen per cent of the House. Of its three ranks, the Cabinet Ministers form the Cabinet, the real centre of decisions.',
    }),
    sl('exam-tips', 'Exam tips for Part 1', {
      bl: [
        'The President **appoints** the Prime Minister but has **discretion** only in a hung House.',
        'Write "**15 per cent of the Lok Sabha, including the Prime Minister**" and name the **91st Amendment (2003)**.',
        'Keep **Council of Ministers** and **Cabinet** apart; give size, members and role.',
        'In 3 + 3 + 4 questions, write one clear point per mark and show any calculation.',
      ],
      n: 'Common slips to avoid. The President\'s discretion applies only when no one has a majority. The size limit includes the Prime Minister and comes from the ninety-first amendment. Never use Cabinet and Council of Ministers as if they were the same. In long questions, give one clear point for each mark and show your working in any calculation.',
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: 'The Prime Minister and the Council of Ministers — Part 2: Cabinet, Responsibility and the Prime Minister',
  goals: [
    'Explain the policy-making, administrative, legislative, financial and emergency functions of the Cabinet',
    'Distinguish collective responsibility to the Lok Sabha from individual responsibility to the President',
    'Explain why the Prime Minister is the real head of the executive',
    'Describe the powers of the Prime Minister in relation to the Cabinet, the President and Parliament',
  ],
  slides: [
    sl('title', 'How the Union government is steered', {
      b: 'Part 2 — what the **Cabinet** does, how ministers are held **responsible**, and why the **Prime Minister** is the key figure.',
      v: vRoute2,
      n: 'Now that we know who the ministers are, we look at what they do. We study the five functions of the Cabinet, the two kinds of responsibility that keep ministers answerable, and finally the position and powers of the Prime Minister, the real head of the Union executive.',
    }),
    sl('diagram', 'Five functions of the Cabinet', {
      v: vFunctions,
      n: 'The Cabinet has five main functions. It makes policy. It runs the administration by coordinating ministries. It decides which bills to bring before Parliament. It prepares the budget and tax proposals. And it advises the President before a national emergency. The examples in the table are imagined, but each shows one function at work.',
    }),
    sl('concept', 'Policy, administration and law-making', {
      bl: [
        '**Policy making:** decides domestic and foreign policy.',
        '**Administrative:** coordinates ministries, settles disputes, supervises how policies are carried out.',
        '**Legislative:** most bills are government bills; ministers pilot them through Parliament.',
      ],
      n: 'The Cabinet decides what the government will do, from farm support to foreign relations. It also makes sure ministries work together: if two ministries disagree, the Cabinet or the Prime Minister settles the matter. And because most laws begin as government bills, the Cabinet decides which bills go to Parliament and its ministers guide them through.',
    }),
    sl('check', 'Quick check: a tax by order?', {
      b: 'True or false: the Cabinet can impose a tax by its own order.',
      chk: 'tf_cabinet_tax',
      n: 'Remember the rule that no tax can be collected except by the authority of law.',
    }),
    sl('diagram', 'The emergency safeguard', {
      b: 'Since the **44th Amendment (1978)**, a national emergency needs the **written decision of the Cabinet**.',
      v: vEmergency,
      n: 'The Cabinet\'s financial role is to prepare the budget, which Parliament must approve. Its emergency role became stricter in nineteen seventy eight. The forty fourth amendment says the President can proclaim a national emergency only after the Union Cabinet recommends it in writing. This means the Prime Minister alone cannot advise an emergency; the whole Cabinet must decide.',
    }),
    sl('example', 'Worked example 1: name the function', {
      b: 'Classify four items from an imagined Cabinet meeting.',
      bl: [
        'A wetlands bill approved for Parliament → **legislative**.',
        'A dispute between two ministries over a dam settled → **administrative** (coordination).',
        'Tax proposals approved for the Finance Minister → **financial**.',
        'A new export policy adopted → **policy making**.',
      ],
      v: table(['Item', 'Function'], [['Wetlands bill', 'Legislative'], ['Dam dispute settled', 'Administrative'], ['Tax proposals', 'Financial'], ['Export policy', 'Policy making']], 'Table classifying four imagined Cabinet decisions: a wetlands bill is legislative, settling a dam dispute is administrative, tax proposals are financial, an export policy is policy making'),
      n: 'Practise naming the function. A bill for Parliament shows the legislative function. Settling a dispute between ministries is administrative coordination. Approving tax proposals is financial. Choosing a new export policy is policy making. In the exam, name the function and point to the words in the situation that show it.',
    }),
    sl('diagram', 'Collective responsibility', {
      b: 'Article **75(3)**: the Council of Ministers is **collectively responsible** to the **Lok Sabha**.',
      v: vCollective,
      n: 'Collective responsibility means the ministers stand or fall together. Every decision of the Cabinet is the decision of all ministers, and each must defend it in public. A minister who cannot do so should resign. If the Lok Sabha passes a no-confidence motion or rejects the budget, the whole Council of Ministers must resign, not just one minister.',
    }),
    sl('check', 'Quick check: to which House?', {
      b: 'To which body is the Council of Ministers collectively responsible?',
      chk: 'm_collective_to',
      n: 'Only one House can bring down the government. Which one?',
    }),
    sl('diagram', 'Two kinds of responsibility', {
      v: vTwoResp,
      n: 'Compare the two kinds. Collective responsibility is to the Lok Sabha, covers every decision, and if it fails the whole ministry goes. Individual responsibility is to the President, acting on the Prime Minister\'s advice, covers one minister\'s department, and if it fails only that minister is removed. Both keep ministers answerable.',
    }),
    sl('example', 'Worked example 2: which principle applies?', {
      b: 'Two imagined situations in the same government.',
      bl: [
        'A minister disagrees with a Cabinet decision and wants to attack it in public → **collective**: support it or resign.',
        'Another minister\'s department fails badly → **individual**: that minister may be asked to resign.',
        'The government continues in the second case; in the first, the minister leaves or falls in line.',
      ],
      v: table(['Situation', 'Principle', 'Result'], [['Disagrees with a Cabinet decision', 'Collective responsibility', 'Defend it in public or resign'], ['Department fails', 'Individual responsibility', 'That minister may be removed']], 'Table of two imagined situations: a minister who disagrees with a Cabinet decision must defend it or resign under collective responsibility; a minister whose department fails may be removed under individual responsibility'),
      n: 'Here are two situations. A minister who dislikes a Cabinet decision may argue inside the Cabinet, but once it is taken he must defend it or resign: that is collective responsibility. A minister whose department fails may be asked to quit while the government carries on: that is individual responsibility. Always say which principle you are applying.',
    }),
    sl('diagram', 'The Prime Minister at the centre', {
      v: vPmRoles,
      n: 'The Prime Minister is linked to every part of the system. With the Council of Ministers, the Prime Minister chooses ministers and presides. With the President, the Prime Minister is the link and must communicate decisions. In the Lok Sabha, the Prime Minister leads the majority. And for the nation, the Prime Minister is the chief spokesperson and the crisis manager.',
    }),
    sl('concept', 'Powers over the ministry', {
      bl: [
        'Advises the President on **appointing and dismissing** ministers.',
        '**Allocates and changes portfolios**.',
        '**Presides over the Cabinet** and **coordinates** all ministries.',
        'If the Prime Minister **resigns or dies**, the **whole Council ends**.',
      ],
      n: 'Over the ministry, the Prime Minister\'s powers are wide. The Prime Minister picks the ministers, gives them their portfolios, and can have any of them removed. The Prime Minister presides over the Cabinet and coordinates the work of all departments. And because the Council exists around the Prime Minister, it comes to an end if the Prime Minister resigns or dies.',
    }),
    sl('check', 'Quick check: reshuffles', {
      b: 'Who decides when a minister is moved to another ministry?',
      chk: 'm_portfolio',
      n: 'Think about who allocates portfolios.',
    }),
    sl('diagram', 'Nominal and real executive', {
      v: vNominalReal,
      n: 'The President is the head of the State, and all executive action is taken in the President\'s name. But under Article seventy four, the President acts on the advice of the Council of Ministers, headed by the Prime Minister. So the President is the nominal executive and the Prime Minister the real one, answerable to the Lok Sabha.',
    }),
    sl('diagram', 'How advice became binding', {
      v: vAmend,
      n: 'Two amendments settled the question of advice. In nineteen seventy six the forty second amendment made the advice of the Council of Ministers binding on the President. In nineteen seventy eight the forty fourth amendment allowed the President to send the advice back once for reconsideration, but after that the President must act on it.',
    }),
    sl('check', 'Quick check: when the Prime Minister resigns', {
      b: 'True or false: the resignation of the Prime Minister ends the whole Council of Ministers.',
      chk: 'tf_keystone',
      n: 'Think about the Prime Minister\'s place in the Council.',
    }),
    sl('summary', 'Summary of Part 2', {
      bl: [
        'Cabinet functions: **policy, administrative, legislative, financial, emergency** (written advice since 1978).',
        '**Collective** responsibility to the **Lok Sabha** (Article 75(3)); **individual** responsibility to the **President**.',
        'The President acts on the advice of the Council headed by the **Prime Minister** (Article 74).',
        'Prime Minister: chooses ministers, presides, links to the President (Article 78), leads the Lok Sabha majority.',
      ],
      v: vMajCoal,
      n: 'To sum up. The Cabinet makes policy, coordinates ministries, steers bills, prepares the budget and advises on emergencies. Ministers are collectively responsible to the Lok Sabha and individually responsible to the President. The Prime Minister heads the Council whose advice binds the President, making the Prime Minister the real executive, though a coalition can limit that freedom.',
    }),
    sl('exam-tips', 'Exam tips for Part 2', {
      bl: [
        'Collective responsibility is to the **Lok Sabha only**; quote **Article 75(3)**.',
        'For an emergency, write "**written decision of the Union Cabinet**" and the **44th Amendment (1978)**.',
        'Name the function or principle, then point to the words in the case that show it.',
        'When evaluating the Prime Minister\'s power, mention **majority versus coalition**.',
      ],
      n: 'A few tips. Collective responsibility is to the Lok Sabha alone, under Article seventy five. For emergencies, mention the written Cabinet decision required by the forty fourth amendment. In case questions, name the function or principle first, then show the evidence. And when judging the Prime Minister\'s power, compare a single-party majority with a coalition.',
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: 'The Prime Minister and the Council of Ministers — notes',
  sections: [
    {
      h: '1. Appointing the Prime Minister',
      t: 1,
      b: '- **Article 75(1):** the **President** appoints the Prime Minister.\n- Normally the leader of the **party or pre-poll alliance with a majority** in the **Lok Sabha** must be invited.\n- In a **hung House**, the President uses **discretion**: invites the leader most likely to **win a vote of confidence**, who may be asked to prove the majority within a time.\n- The Prime Minister may be from either House, but the government depends on the **Lok Sabha**.',
      terms: [['Hung House', 'A Lok Sabha in which no party or pre-poll alliance has a majority.'], ['Vote of confidence', 'A vote in the Lok Sabha showing that the government has majority support.']],
      v: vAppoint,
      vs: [vBars],
    },
    {
      h: '2. Forming the ministry: tenure and size',
      t: 1,
      b: `- Other ministers are appointed by the President **on the Prime Minister's advice**; the President administers the oaths of **office and secrecy**.\n- **Tenure:** ministers hold office **during the pleasure of the President** (Article 75(2)); in practice the ministry lasts while the **Lok Sabha** supports it, and a minister while the **Prime Minister** wants.\n- **Non-member:** must become a member of either House within **${NON_MEMBER_MONTHS} months** (Article 75(5)).\n- **Size:** the total, **including the Prime Minister**, may not exceed **15 per cent** of the Lok Sabha strength (**91st Amendment, 2003**): at most **${MAX_MINISTERS}** with ${LS_NOW} members.`,
      terms: [['During the pleasure of the President', 'The formal basis of a minister\'s tenure; in practice controlled by the Prime Minister and the Lok Sabha.']],
      v: vRules,
      vs: [vSize],
    },
    {
      h: '3. Three ranks; Council and Cabinet',
      t: 2,
      b: '- **Cabinet Ministers:** head important ministries; members of the Cabinet.\n- **Ministers of State:** help a Cabinet Minister or hold **independent charge**; attend the Cabinet only **when invited**.\n- **Deputy Ministers:** assist senior ministers; no charge of their own.\n- The **Council** is large and rarely meets as one body; the **Cabinet** is small, meets regularly and takes the **main decisions**.',
      terms: [['Independent charge', 'A Minister of State heading a ministry with no Cabinet Minister above.'], ['Cabinet', 'The inner group of Cabinet Ministers that takes the main policy decisions.']],
      v: vTiers,
      vs: [vRanks, vCompare],
    },
    {
      h: '4. Functions of the Cabinet',
      t: 3,
      b: '- **Policy making:** domestic and foreign policy.\n- **Administrative:** coordinates ministries, settles disputes, supervises implementation.\n- **Legislative:** decides government bills; ministers pilot them; advises on summoning and proroguing Parliament.\n- **Financial:** prepares the budget and tax proposals presented by the Finance Minister; Parliament must approve them.\n- **Emergency:** a national emergency only on the **written decision of the Union Cabinet** (Article 352(3), **44th Amendment, 1978**).',
      terms: [['Government bill', 'A bill introduced by a minister on behalf of the government.']],
      v: vFunctions,
      vs: [vEmergency],
    },
    {
      h: '5. Collective and individual responsibility',
      t: 4,
      b: '- **Collective (Article 75(3)):** the Council is responsible to the **Lok Sabha**; ministers **stand or fall together**; a minister who cannot defend a decision should resign; a successful **no-confidence motion** or defeat on the budget removes the **whole ministry**.\n- **Individual:** each minister answers for his **department**; holds office during the President\'s pleasure, so the **Prime Minister** can have him removed without the government falling.\n- The **Rajya Sabha** can question ministers but cannot remove the government.',
      terms: [['Collective responsibility', 'Joint answerability of all ministers to the Lok Sabha for every government decision.'], ['Individual responsibility', 'A minister\'s personal answerability for his own department.']],
      v: vCollective,
      vs: [vTwoResp],
    },
    {
      h: '6. Position and powers of the Prime Minister',
      t: 5,
      b: '- **Real executive:** the President acts on the advice of the Council headed by the Prime Minister (**Article 74**); the **42nd Amendment (1976)** made advice binding, the **44th (1978)** allows one reconsideration.\n- **Over the ministry:** appoints and removes ministers (through the President), allocates portfolios, presides over the Cabinet, coordinates; the Council ends if the Prime Minister resigns or dies.\n- **With the President:** the link; must communicate decisions on administration and legislation (**Article 78**); advises on appointments and dissolution.\n- **In Parliament and the nation:** leader of the majority, chief spokesperson, represents the country abroad, crisis manager.\n- Strength varies: greater with a **single-party majority**, more limited in a **coalition**.',
      terms: [['Nominal executive', 'The head of the State in whose name action is taken (the President).'], ['Real executive', 'Those who actually decide and are answerable (the Prime Minister and the Council of Ministers).']],
      v: vPmRoles,
      vs: [vNominalReal, vAmend, vMajCoal],
    },
  ],
  tips: '**Common mistakes**\n- Writing that the Prime Minister is directly elected by the people.\n- Saying the ministry has a fixed five-year term.\n- Forgetting that the 15 per cent limit includes the Prime Minister.\n- Treating the Cabinet and the Council of Ministers as one body.\n- Saying the Rajya Sabha can remove the government.\n\n**How marks are usually awarded**\n- 1-mark items: one correct option or term.\n- 2 marks: two distinct points.\n- 10-mark questions in 3 + 3 + 4 parts: one clear point per mark; the last part usually needs a reason, a comparison or an evaluation.',
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ['Who appoints the Prime Minister?', 'The **President** (Article 75(1)).', 'fact', 1],
  ['Whom must the President invite after an election?', 'The leader of the **majority** in the **Lok Sabha**.', 'concept', 1],
  ['When does the President have discretion?', 'In a **hung House**: no party or alliance has a majority.', 'concept', 1],
  ['How are other ministers appointed?', 'By the President **on the Prime Minister\'s advice**.', 'fact', 1],
  ['Non-member as minister', `Must enter either House within **${NON_MEMBER_MONTHS} months**.`, 'fact', 1],
  ['Size limit of the ministry', `**15 per cent** of the Lok Sabha, including the Prime Minister (${MAX_MINISTERS} for ${LS_NOW}).`, 'fact', 1],
  ['Which amendment added the size limit?', 'The **91st Amendment (2003)**.', 'fact', 1],
  ['Tenure of ministers', '**During the pleasure of the President**; in practice while the Lok Sabha supports the ministry.', 'concept', 1],
  ['Oaths taken by ministers', 'Oath of **office** and oath of **secrecy**, before the President.', 'fact', 1],
  ['Three ranks of ministers', 'Cabinet Ministers, Ministers of State, Deputy Ministers.', 'fact', 2],
  ['Independent charge', 'A Minister of State heads a ministry with no Cabinet Minister above.', 'definition', 2],
  ['Cabinet', 'The **inner group** of Cabinet Ministers that takes the main decisions.', 'definition', 2],
  ['Council vs Cabinet: size', 'Council **large**; Cabinet **small**.', 'concept', 2],
  ['Does the full Council meet often?', '**Rarely**; the Cabinet meets regularly.', 'fact', 2],
  ['Five functions of the Cabinet', 'Policy, administrative, legislative, financial, emergency.', 'concept', 3],
  ['Administrative function: example', 'Settling a dispute between two ministries.', 'example', 3],
  ['Can the Cabinet levy a tax by order?', '**No**: no tax without a law passed by Parliament.', 'exam-tip', 3],
  ['National emergency advice', '**Written decision of the Union Cabinet** (Article 352(3), 44th Amendment 1978).', 'fact', 3],
  ['Collective responsibility', 'Ministers stand or fall **together** before the **Lok Sabha** (Article 75(3)).', 'definition', 4],
  ['Result of a lost no-confidence motion', 'The **whole Council of Ministers** resigns.', 'concept', 4],
  ['Individual responsibility', 'A minister answers personally for his **department**; can be removed on the Prime Minister\'s advice.', 'definition', 4],
  ['Minister who disagrees with a Cabinet decision', 'Must **defend it in public** or **resign**.', 'concept', 4],
  ['Can the Rajya Sabha remove the government?', '**No**; it can only question and criticise ministers.', 'exam-tip', 4],
  ['Real and nominal executive', 'Prime Minister and Council are real; the President is nominal (Article 74).', 'concept', 5],
  ['42nd and 44th Amendments on advice', '1976: advice binding; 1978: one reconsideration allowed.', 'fact', 5],
  ['Article 78', 'Prime Minister must communicate Council decisions on administration and legislation to the President.', 'fact', 5],
  ['Who allocates portfolios?', 'The **Prime Minister**.', 'fact', 5],
  ['If the Prime Minister resigns', 'The **whole Council of Ministers** comes to an end.', 'concept', 5],
  ['Prime Minister in Parliament', 'Leader of the **majority** in the Lok Sabha; chief spokesperson.', 'concept', 5],
  ['Majority vs coalition', 'A coalition **limits** the Prime Minister\'s freedom in choosing ministers and policy.', 'exam-tip', 5],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: 'short',
  blueprint: 'icse-10-history-civics-chapter-test-short',
  title: 'Chapter test (short) — The Prime Minister and the Council of Ministers',
  duration: 30,
  sections: [
    { id: 'I', title: 'Part I — Compulsory (10 marks)', instr: 'Attempt all questions. Questions 1–6 carry 1 mark each; questions 7 and 8 carry 2 marks each.', items: ['m_pm_appointer', 'm_cabinet_core', 'm_func_policy', 'm_dissent', 'm_real_head', 'ar_collective_ls', 's_council_cabinet', 's_pm_president'] },
    { id: 'II', title: 'Part II — Structured question (10 marks)', instr: 'Attempt any ONE of the two questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 1, keys: ['l_cabinet_functions', 'l_responsibility'] }] },
  ],
});
const T_LONG = test({
  kind: 'long',
  blueprint: 'icse-10-history-civics-chapter-test-long',
  title: 'Chapter test (long) — The Prime Minister and the Council of Ministers',
  duration: 60,
  sections: [
    { id: 'I', title: 'Part I — Compulsory (20 marks)', instr: 'Attempt all questions. Questions 1–10 carry 1 mark each; questions 11–15 carry 2 marks each.', items: ['m_other_ministers', 'm_bars_pm', 'm_size_cap', 'm_pyramid_read', 'm_emerg_44', 'm_one_minister_scandal', 'm_link', 'm_pm_resigns', 'm_crisis', 'ar_direct_pm', 's_pm_appoint', 's_collective_meaning', 's_func_two', 's_emerg_role', 's_pm_cabinet_powers'] },
    { id: 'II', title: 'Part II — Structured questions (20 marks)', instr: 'Attempt any TWO of the three questions. Each is in three parts (3 + 3 + 4 marks).', items: [{ attempt: 2, keys: ['l_formation', 'l_pm_powers', 'l_real_nominal'] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: 'topics t01–t05 of icse-10-history-civics-ch04 only (appointment, formation and tenure; Council of Ministers and Cabinet; functions of the Cabinet; collective and individual responsibility; position and powers of the Prime Minister)',
    originality: 'every scenario, diary, letter and meeting summary is imagined and written by SOYL (labelled); no textbook text or exercise and no specimen or board-paper item reused (D-036); no real person quoted; no present or past Prime Minister named or evaluated',
    data: `imagined House of ${LS_NOW} (248 + 182 + 61 + 52) asserted; majority ${MAJORITY}; alliance ${P_PLUS_R}; size ceiling floor(0.15 x ${LS_NOW}) = ${MAX_MINISTERS} computed`,
    facts: 'Article 74 (advice; 42nd Amendment 1976 binding, 44th Amendment 1978 one reconsideration); Article 75(1) appointment, 75(1A) 15 per cent ceiling (91st Amendment 2003), 75(2) pleasure of the President, 75(3) collective responsibility to the Lok Sabha, 75(5) six months for non-members; Article 78 duties of the Prime Minister; Article 352(3) written Cabinet decision for a national emergency (44th Amendment 1978)',
    gate: 'schema, content lint (lintExemplar), deterministic verify, originality pre-check and the editorial counts run clean on this chapter',
  },
});
