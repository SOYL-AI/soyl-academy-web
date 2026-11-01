// ICSE 10 History & Civics, ch04 The Prime Minister and the Council of Ministers — question bank.
// Every scenario, diary, letter and minister in it is imagined and written by SOYL (labelled); no textbook text,
// box or exercise and no specimen or board-paper item is reused (D-036); no real person is quoted and no present or
// past Prime Minister is named or evaluated. Facts are the stable provisions of the Constitution: Articles 74, 75,
// 78 and 352(3); the 44th Amendment (1978) and the 91st Amendment (2003).
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child, Svg } from '../../icse-10-history-civics-ch01/src/lib.mjs';

const S2 = [25, 45];
const S3 = [40, 70];
const L10 = [120, 220];
const IMAG = '*(Imagined document written by SOYL for practice; the people in it are not real.)*';

// ---------------------------------------------------------------- figures used in items (asserted)
export const LS_NOW = 543; // present elected membership of the Lok Sabha
export const CAP_SHARE = 0.15; // Article 75(1A), 91st Amendment 2003
export const MAX_MINISTERS = Math.floor(LS_NOW * CAP_SHARE); // 81, including the Prime Minister
assert.equal(MAX_MINISTERS, 81);
export const NON_MEMBER_MONTHS = 6;
// An imagined Lok Sabha used in two items: party seats after an election.
export const HOUSE = [['Party P', 248], ['Party Q', 182], ['Party R', 61], ['Others', 52]];
assert.equal(HOUSE.reduce((s, [, n]) => s + n, 0), LS_NOW);
export const MAJORITY = Math.floor(LS_NOW / 2) + 1; // 272
assert.equal(MAJORITY, 272);
export const P_PLUS_R = 248 + 61; // 309, a coalition majority
assert.ok(P_PLUS_R >= MAJORITY && 248 < MAJORITY);

/** Three-tier picture of the Council of Ministers (the Cabinet is the inner core). */
export function tiers(alt, caption, labels = ['Cabinet Ministers', 'Ministers of State', 'Deputy Ministers']) {
  const s = new Svg(640, 260);
  const rows = [[260, 120], [180, 260], [100, 400]]; // [y, half-width]
  rows.forEach(([y, hw], i) => {
    const top = y - 60;
    s.polygon([[320 - hw + 40, top], [320 + hw - 40, top], [320 + hw, y], [320 - hw, y]], { fill: i === 0 ? 'accent' : 'muted', fillOpacity: i === 0 ? 0.25 : 0.12, color: i === 0 ? 'accent' : 'muted', sw: 1.5 });
    s.text(320, top + 30, labels[2 - i], { size: 14, bold: i === 0 ? false : i === 2 });
  });
  s.polygon([[290, 20], [350, 20], [370, 40], [270, 40]], { fill: 'accent', fillOpacity: 0.5, color: 'accent', sw: 1.5 });
  s.text(320, 30, 'Prime Minister', { size: 12, bold: true });
  return s.visual(alt, caption);
}

/** Bar picture of an imagined House: party seats against the majority mark. */
export function houseBars(alt, caption) {
  const s = new Svg(640, 230);
  const W = (n) => (n / 300) * 430;
  HOUSE.forEach(([lab, n], i) => {
    const y = 30 + i * 42;
    s.text(20, y + 14, lab, { anchor: 'start', size: 13 });
    s.rect(120, y, W(n), 28, { rx: 3, fill: i === 0 ? 'accent' : 'muted', fillOpacity: 0.35, color: i === 0 ? 'accent' : 'muted', sw: 1.2 });
    s.text(120 + W(n) + 8, y + 14, String(n), { anchor: 'start', size: 12 });
  });
  const mx = 120 + W(MAJORITY);
  s.line(mx, 20, mx, 200, { dash: true, color: 'red', sw: 1.5 });
  s.text(mx, 214, `Majority mark: ${MAJORITY}`, { size: 12, color: 'red' });
  return s.visual(alt, caption);
}

// ================================================================ t01 Appointment, formation and tenure
Q('m_pm_appointer', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Under the Constitution, which authority formally appoints the Prime Minister of India?',
  opts: ['The President', 'The Speaker of the Lok Sabha', 'The Chief Justice of India', 'The Vice-President'],
  sol: 'Article 75 says the Prime Minister is appointed by the President. The Speaker presides over the Lok Sabha, the Chief Justice heads the judiciary, and the Vice-President chairs the Rajya Sabha; none of them appoints the Prime Minister.',
}));
Q('m_other_ministers', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'On whose advice does the President appoint the other members of the Union Council of Ministers?',
  opts: ['The Prime Minister', 'The Chief Election Commissioner', 'The Rajya Sabha', 'The Governors of the States'],
  sol: 'Ministers other than the Prime Minister are appointed by the President on the advice of the Prime Minister. The Election Commission, the Rajya Sabha and the Governors have no say in choosing Union ministers.',
}));
Q('m_bars_pm', mcq({
  t: 1, d: 3, c: 'application',
  stem: `The bar picture shows the seats won by parties in an imagined Lok Sabha of ${LS_NOW} members. No single party has crossed the majority mark. Party P and Party R announce an alliance with a common leader. Whom is the President most likely to invite first to form the government?`,
  opts: [
    'The leader of the P–R alliance, because together they have a majority',
    'The leader of Party Q, because it is the second-largest party',
    'The member with the longest service in the House',
    'Nobody: the House must be dissolved at once',
  ],
  sol: `Together P and R hold ${P_PLUS_R} seats, more than the ${MAJORITY} needed, so the alliance leader is the person most likely to command the confidence of the Lok Sabha. Being second-largest gives Q no claim, seniority is irrelevant, and dissolution is not the first step after an election.`,
  assets: [houseBars(`Bar picture of an imagined Lok Sabha of ${LS_NOW}: Party P 248 seats, Party Q 182, Party R 61, others 52; a dashed line marks the majority of ${MAJORITY}, which no party reaches`, 'Imagined election result.')],
}));
Q('m_hung_house', mcq({
  t: 1, d: 3, c: 'analysis',
  stem: 'In which situation does the President have real discretion in choosing the Prime Minister?',
  opts: [
    'When no party or pre-poll alliance has a clear majority in the Lok Sabha',
    'When one party has won a clear majority in the Lok Sabha',
    'When the Rajya Sabha has a different ruling party',
    'Whenever the President disagrees with the majority party',
  ],
  sol: 'If one party or alliance has a clear majority, its leader must be invited. Only in a hung House does the President judge who is most likely to win a vote of confidence. The make-up of the Rajya Sabha and personal preference play no part.',
}));
Q('m_non_member', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'An imagined economist who is not a member of either House is sworn in as a Union minister in January. By when must she enter Parliament to keep her post?',
  opts: ['Within six months of becoming a minister', 'Within one month', 'Within one year', 'She can never be a minister without being a member first'],
  sol: `A minister who is not a member of either House ceases to be a minister after ${NON_MEMBER_MONTHS} consecutive months unless elected or nominated in that time (Article 75(5)). So she must become a member by July. The other periods are not in the Constitution.`,
}));
Q('m_size_cap', mcq({
  t: 1, d: 2, c: 'application',
  stem: `The Lok Sabha has ${LS_NOW} members. What is the largest Council of Ministers, counting the Prime Minister, that the Constitution now allows?`,
  opts: [String(MAX_MINISTERS), '54', '100', '163'],
  sol: `The 91st Amendment (2003) limits the total number of ministers, including the Prime Minister, to 15 per cent of the strength of the Lok Sabha. 15 per cent of ${LS_NOW} is 81.45, so at most ${MAX_MINISTERS} ministers. The distractors use 10 per cent, a round figure and 30 per cent.`,
}));
Q('m_tenure', mcq({
  t: 1, d: 2, c: 'understanding',
  stem: 'For how long does the Union Council of Ministers stay in office in practice?',
  opts: [
    'As long as it keeps the confidence of the Lok Sabha',
    'For a fixed term of six years',
    'Until the President completes his own term',
    'As long as it has a majority in the Rajya Sabha',
  ],
  sol: 'Ministers hold office during the pleasure of the President, but since the President acts on ministerial advice, this means in practice for as long as the Lok Sabha supports the government. There is no fixed term, and the Rajya Sabha cannot remove it.',
}));
Q('m_oath', mcq({
  t: 1, d: 1, c: 'recall',
  stem: 'Before taking up office, a Union minister takes the oaths of office and secrecy. Who administers them?',
  opts: ['The President', 'The Prime Minister', 'The Speaker', 'The Attorney General'],
  sol: 'The President administers the oaths of office and secrecy to the Prime Minister and the other ministers. The Prime Minister, Speaker and Attorney General do not.',
}));
Q('tf_rs_member_pm', tf({
  t: 1, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? A member of the Rajya Sabha can be appointed Prime Minister, provided the Lok Sabha supports the government.',
  sol: 'The Constitution only requires the Prime Minister to be a member of either House (or to become one within six months). What matters is the confidence of the Lok Sabha, not the House the Prime Minister sits in.',
}));
Q('fb_size_amend', fb({
  t: 1, d: 2, c: 'recall',
  stem: 'The limit of 15 per cent of the Lok Sabha strength on the size of the Council of Ministers was added by the ___ Amendment in 2003.',
  acc: [['91st', 'Ninety-first', '91']],
  sol: 'The 91st Amendment (2003) added the 15 per cent ceiling and also tightened the Anti-Defection Law.',
}));
Q('s_pm_appoint', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain how the President decides whom to appoint as Prime Minister after a general election.',
  model: 'The President invites the **leader of the party or alliance with a majority** in the **Lok Sabha**. If no group has a majority, the President uses **discretion** to invite the leader most likely to **win a vote of confidence**, who may be asked to prove it.',
  sol: 'Majority leader; discretion in a hung House.',
  scheme: [['Leader of the majority in the Lok Sabha', 1], ['Discretion in a hung House, with a confidence vote', 1]],
}));
Q('s_size_why', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Why do you think the Constitution was amended to put a ceiling on the number of ministers? Give two reasons.',
  model: '(1) Very large ministries had been used to **reward supporters** and keep coalitions together, which was **costly**. (2) A ceiling of **15 per cent of the Lok Sabha** keeps the government **compact** and makes posts less of a **bait for defection**.',
  sol: 'Any two reasoned points: cost, rewards, defection, efficiency.',
  scheme: [['First reason', 1], ['Second reason', 1]],
}));
Q('s_tenure_pleasure', short({
  t: 1, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Ministers hold office "during the pleasure of the President". Explain what this means in practice.',
  model: 'Formally the President can dismiss a minister, but the President acts on the **advice of the Prime Minister**. So a minister stays as long as the **Prime Minister** wants, and the whole ministry stays as long as it has the **confidence of the Lok Sabha**.',
  sol: 'Formal pleasure versus practical control by the Prime Minister and the Lok Sabha.',
  scheme: [['Acts on the Prime Minister\'s advice', 1], ['Ministry lasts while it keeps the Lok Sabha\'s confidence', 1]],
}));

// ================================================================ t02 Council of Ministers and Cabinet
Q('m_three_ranks', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Which three ranks of ministers make up the Union Council of Ministers?',
  opts: [
    'Cabinet Ministers, Ministers of State and Deputy Ministers',
    'Cabinet Ministers, Governors and Lieutenant Governors',
    'Ministers of State, Secretaries and Joint Secretaries',
    'Cabinet Ministers, judges and Election Commissioners',
  ],
  sol: 'The Council of Ministers has three ranks: Cabinet Ministers, Ministers of State and Deputy Ministers. Governors, civil servants such as Secretaries, judges and Election Commissioners are not ministers.',
}));
Q('m_cabinet_core', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which statement best describes the relationship between the Cabinet and the Council of Ministers?',
  opts: [
    'The Cabinet is a smaller inner group of senior ministers within the larger Council of Ministers',
    'The Cabinet is larger than the Council of Ministers',
    'The Cabinet and the Council of Ministers are two names for exactly the same body',
    'The Cabinet is a committee of the Rajya Sabha',
  ],
  sol: 'The Cabinet is the inner core: only the Cabinet Ministers. The Council of Ministers is larger and includes Ministers of State and Deputy Ministers as well. The Cabinet is part of the executive, not a committee of Parliament.',
}));
Q('m_pyramid_read', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'The diagram shows the ranks of the Union Council of Ministers. Which rank in it attends Cabinet meetings only when specially invited for a matter of its department?',
  opts: ['Ministers of State', 'Cabinet Ministers', 'The Prime Minister', 'None of them ever attends'],
  sol: 'Ministers of State (in the middle tier) may hold independent charge of a department but attend Cabinet meetings only when invited. Cabinet Ministers attend as members, and the Prime Minister presides.',
  assets: [tiers('Three-tier diagram of the Council of Ministers: the Prime Minister at the top, then Cabinet Ministers, then Ministers of State, then Deputy Ministers at the widest base', 'Ranks of the Union Council of Ministers (schematic).')],
}));
Q('m_deputy_role', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'What is the usual role of a Deputy Minister in the Union government?',
  opts: [
    'To assist a Cabinet Minister or Minister of State in the work of a department',
    'To preside over meetings of the Cabinet',
    'To act as the head of the State when the President is abroad',
    'To certify money bills',
  ],
  sol: 'Deputy Ministers have no independent charge; they help senior ministers with parliamentary and departmental work. The Prime Minister presides over the Cabinet, the Vice-President acts for the President, and the Speaker certifies money bills.',
}));
Q('m_council_meets', mcq({
  t: 2, d: 3, c: 'analysis',
  stem: 'Why does the full Council of Ministers rarely meet as a body, while the Cabinet meets regularly?',
  opts: [
    'The Council is too large for regular discussion, so the smaller Cabinet takes the main decisions',
    'The Constitution forbids the Council of Ministers from meeting',
    'Only the Rajya Sabha can call the Council of Ministers together',
    'Ministers of State are not allowed to know about government policy',
  ],
  sol: 'A body of several dozen members is too big for detailed policy discussion, so decisions are taken in the Cabinet and its committees, and the Council follows them. Nothing in the Constitution forbids the Council from meeting, and the other options are false.',
}));
Q('mt_ranks', match({
  t: 2, d: 2, c: 'understanding',
  stem: 'Match each imagined minister in the Union government with the rank that fits the description.',
  pairs: [
    ['Heads the Ministry of Defence and attends every Cabinet meeting', 'Cabinet Minister'],
    ['Holds independent charge of a small ministry and attends the Cabinet when invited', 'Minister of State'],
    ['Helps a senior minister answer questions in the Lok Sabha; no charge of his own', 'Deputy Minister'],
    ['Presides over the Cabinet and allocates portfolios', 'Prime Minister'],
  ],
  sol: 'Department heads in the Cabinet are Cabinet Ministers; independent charge with invitation-only attendance marks a Minister of State; assisting without charge marks a Deputy Minister; presiding and allocating portfolios is the Prime Minister\'s role.',
}));
Q('s_council_cabinet', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give two points of difference between the Council of Ministers and the Cabinet.',
  model: '(1) **Size:** the Council is **large** (all three ranks); the Cabinet is a **small** group of senior ministers. (2) **Role:** the **Cabinet takes policy decisions**; the Council as a whole **rarely meets** and carries out those decisions.',
  sol: 'Any two: size, composition, meetings, decision-making.',
  scheme: [['First difference', 1], ['Second difference', 1]],
}));
Q('s_mos_independent', short({
  t: 2, d: 2, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined Minister of State holds independent charge of the Ministry of Tourism. Explain what "independent charge" means and whether she is a member of the Cabinet.',
  model: 'She **heads the ministry herself**, without a Cabinet Minister above her. She is **not a member of the Cabinet**; she attends Cabinet meetings **only when invited** for matters of her ministry.',
  sol: 'Meaning of independent charge; not a Cabinet member.',
  scheme: [['Heads the ministry without a senior minister', 1], ['Not in the Cabinet; attends when invited', 1]],
}));
Q('s3_council_cabinet', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'The Cabinet is sometimes called the real centre of power in the Union government. Give three points comparing it with the Council of Ministers that support this view.',
  model: '(1) The Cabinet is a **small body of senior ministers**, while the Council includes many junior ministers. (2) The **Cabinet decides policy**; the Council **does not meet as a body** and carries out its decisions. (3) Advice for a **national emergency** must come from the **Cabinet** in writing, not from the whole Council.',
  sol: 'Size, policy role, emergency advice (or another valid point).',
  scheme: [['Size and composition', 1], ['Policy decided by the Cabinet', 1], ['Emergency advice or another valid point', 1]],
}));

// ================================================================ t03 Functions of the Cabinet
Q('m_func_policy', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'The Cabinet of an imagined year decides to raise farmers\' crop-insurance cover and asks ministries to plan how. Which function of the Cabinet does this show most directly?',
  opts: ['Policy making', 'Judicial review', 'Electing the President', 'Certifying a money bill'],
  sol: 'Deciding what the government will do in an area, here crop insurance, is policy making. Judicial review belongs to courts, the Electoral College elects the President, and the Speaker certifies money bills.',
}));
Q('m_func_admin', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'When two ministries disagree over who should build a new rail-cum-road bridge, the matter is settled in a Cabinet meeting. Which Cabinet function is this?',
  opts: ['Coordinating the work of different departments', 'Making financial grants to States without Parliament', 'Amending the Constitution', 'Appointing judges on its own'],
  sol: 'Resolving disputes between ministries is part of the Cabinet\'s administrative function of coordination. It cannot spend without Parliament, amend the Constitution alone, or appoint judges by itself.',
}));
Q('m_func_legis', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which of the following is a legislative function of the Cabinet?',
  opts: [
    'Deciding which government bills will be introduced in Parliament and steering them through',
    'Deciding cases between the Union and a State',
    'Electing the Vice-President',
    'Holding the general elections',
  ],
  sol: 'Most bills are government bills: the Cabinet decides on them, drafts them through ministries and guides them through Parliament. Union–State disputes go to the Supreme Court; Parliament elects the Vice-President; the Election Commission conducts elections.',
}));
Q('m_func_fin', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which statement correctly describes the financial role of the Cabinet?',
  opts: [
    'It decides the budget proposals, which the Finance Minister presents to Parliament',
    'It can collect any tax without the approval of Parliament',
    'It passes the budget without a vote of the Lok Sabha',
    'It has no say in money matters',
  ],
  sol: 'The Cabinet shapes the budget and the Finance Minister presents it, but no tax can be levied and no money spent without Parliament\'s approval. So the first option is right.',
}));
Q('m_emerg_44', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'Since the 44th Amendment (1978), what must happen before the President can proclaim a national emergency?',
  opts: [
    'The Cabinet must recommend it to the President in writing',
    'The Chief Justice must approve it in writing',
    'Half the State legislatures must ask for it',
    'The Prime Minister alone may advise it orally',
  ],
  sol: 'The 44th Amendment requires a written decision of the Union Cabinet before a national emergency can be proclaimed (Article 352(3)). This was meant to prevent the Prime Minister alone from advising it. Courts and State legislatures have no such role.',
}));
Q('tf_cabinet_tax', tf({
  t: 3, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Because it controls the government, the Cabinet can impose a new tax by its own order without a law passed by Parliament.',
  sol: 'No tax can be levied or collected except by authority of law. The Cabinet proposes taxes, but Parliament must pass them.',
}));
Q('ord_policy_path', ord({
  t: 3, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange the stages through which an imagined Cabinet proposal for a new water-saving law becomes law, in the correct order.',
  items: [
    'The ministry concerned prepares a note and the Cabinet approves the proposal',
    'The bill is introduced in Parliament by the minister',
    'Both Houses pass the bill',
    'The President gives assent',
  ],
  sol: 'Cabinet approval comes first, then introduction by the minister, then passage in both Houses, and finally the President\'s assent.',
}));
Q('s_func_two', short({
  t: 3, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'State any two administrative functions of the Union Cabinet.',
  model: '(1) It **coordinates** the work of the different **ministries** and settles disputes between them. (2) It **supervises** how the laws and policies are **carried out** by the departments.',
  sol: 'Any two administrative functions.',
  scheme: [['First function', 1], ['Second function', 1]],
}));
Q('s_emerg_role', short({
  t: 3, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Explain why the requirement of the Cabinet\'s written advice for a national emergency is considered a safeguard.',
  model: 'A national emergency gives the Union **great power** over the States and can affect **rights**. Requiring a **written Cabinet decision** means the **whole Cabinet** shares responsibility, so the **Prime Minister alone** cannot advise it.',
  sol: 'Power of an emergency; collective, written decision as a check.',
  scheme: [['Why an emergency needs a check', 1], ['Written Cabinet decision prevents one-person advice', 1]],
}));
Q('s3_functions', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Explain the legislative, financial and policy-making functions of the Union Cabinet, one point each.',
  model: '(1) **Legislative:** the Cabinet decides which **bills** to introduce and guides them through **Parliament**. (2) **Financial:** it prepares the **budget**, which the **Finance Minister** presents; taxes still need Parliament\'s approval. (3) **Policy making:** it decides the **internal and foreign policies** of the government.',
  sol: 'One accurate point per function.',
  scheme: [['Legislative', 1], ['Financial', 1], ['Policy making', 1]],
}));

// ================================================================ t04 Collective and individual responsibility
Q('m_collective_to', mcq({
  t: 4, d: 1, c: 'recall',
  stem: 'To which body is the Union Council of Ministers collectively responsible under Article 75(3)?',
  opts: ['The Lok Sabha', 'The Rajya Sabha', 'The Supreme Court', 'The President alone'],
  sol: 'The Council of Ministers is collectively responsible to the House of the People, the Lok Sabha. The Rajya Sabha can question ministers but cannot remove the government; courts and the President do not hold it collectively responsible.',
}));
Q('m_individual_to', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Individual responsibility of a Union minister means that the minister is answerable mainly to whom for the working of his department?',
  opts: ['The President, acting on the Prime Minister\'s advice', 'The Chief Justice of India', 'The State Governor', 'The Comptroller and Auditor General alone'],
  sol: 'A minister holds office during the pleasure of the President; in practice the Prime Minister can ask the President to dismiss a minister whose department fails. Courts, Governors and the auditor do not remove ministers.',
}));
Q('m_dissent', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'An imagined Cabinet Minister strongly disagrees with a Cabinet decision to sell a public company and wants to criticise it in public. What does collective responsibility require of him?',
  opts: [
    'He must support the decision in public or resign from the ministry',
    'He may criticise it in public and stay a minister',
    'He must ask the Supreme Court to cancel the decision',
    'He must ask the Rajya Sabha to overrule the Cabinet',
  ],
  sol: 'Ministers may argue inside the Cabinet, but once a decision is taken they must defend it together; a minister who cannot do so should resign. Courts and the Rajya Sabha do not overrule Cabinet decisions in this way.',
}));
Q('m_one_minister_scandal', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'A serious failure is found in an imagined minister\'s department, and the Prime Minister asks him to quit. Which principle explains why only he leaves while the government continues?',
  opts: ['Individual responsibility', 'Collective responsibility', 'Judicial review', 'Separation of powers'],
  sol: 'The failure is his department\'s, so he answers for it personally: individual responsibility. Collective responsibility would remove the whole ministry, which happens only when the Lok Sabha withdraws its confidence.',
}));
Q('ar_collective_ls', ar({
  t: 4, d: 2, c: 'analysis', verdict: 'both-true-explains',
  a: 'When the Lok Sabha rejects the government\'s budget, all the ministers resign together.',
  r: 'The Council of Ministers is collectively responsible to the Lok Sabha.',
  sol: 'Both are true. Defeat on the budget is treated as loss of confidence, and because responsibility is collective, the whole ministry resigns; R explains A.',
}));
Q('ar_rs_remove', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'A-false-R-true',
  a: 'The Rajya Sabha can remove the Council of Ministers by passing a no-confidence motion.',
  r: 'Ministers can be asked questions in both Houses of Parliament.',
  sol: 'A is false: only the Lok Sabha can bring down the government; a no-confidence motion cannot be moved in the Rajya Sabha. R is true: ministers answer questions in both Houses.',
}));
Q('ar_secrecy', ar({
  t: 4, d: 3, c: 'analysis', verdict: 'both-true-not-explains',
  a: 'Ministers take an oath of secrecy before entering office.',
  r: 'The Prime Minister allocates portfolios among the ministers.',
  sol: 'Both are true, but allocating portfolios has nothing to do with the oath of secrecy, which protects confidential Cabinet discussions. So R does not explain A.',
}));
Q('tf_collective_rs', tf({
  t: 4, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? The Council of Ministers is collectively responsible to both Houses of Parliament equally.',
  sol: 'Collective responsibility is to the Lok Sabha only. The Rajya Sabha can question and criticise ministers but cannot remove the government.',
}));
Q('fb_article_75', fb({
  t: 4, d: 2, c: 'recall',
  stem: 'Collective responsibility of the Council of Ministers to the Lok Sabha is laid down in Article ___ of the Constitution.',
  acc: [['75', '75(3)', 'seventy-five']],
  sol: 'Article 75(3) says the Council of Ministers shall be collectively responsible to the House of the People.',
}));
Q('s_collective_meaning', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What is meant by collective responsibility? State one consequence of it.',
  model: 'All ministers are **jointly answerable** to the **Lok Sabha** for every decision of the government; they "**sink or swim together**". **Consequence:** if the Lok Sabha passes a **no-confidence motion**, the **whole ministry resigns**.',
  sol: 'Meaning plus one consequence.',
  scheme: [['Meaning', 1], ['One consequence', 1]],
}));
Q('s_individual_meaning', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain individual responsibility of ministers with one imagined example.',
  model: 'Each minister answers **personally** for the work of his own **department** and holds office at the **pleasure of the President**, so the **Prime Minister** can have him removed. For example, if an imagined railway minister\'s department fails badly, he alone may be asked to **resign**.',
  sol: 'Meaning and an example.',
  scheme: [['Meaning', 1], ['Example', 1]],
}));
Q('s3_collective_why', short({
  t: 4, d: 3, c: 'evaluation', marks: 3, wl: S3,
  stem: 'Evaluate why collective responsibility is important in a parliamentary democracy. Give three points.',
  model: '(1) It keeps the government **answerable to the elected Lok Sabha**, so it cannot ignore the people\'s representatives. (2) It makes the ministry **speak with one voice**, giving **stable and clear** policies. (3) It forces ministers to **settle differences in private** and to **share the blame** for failures.',
  sol: 'Three distinct points on accountability, unity and shared blame.',
  scheme: [['Accountability to the Lok Sabha', 1], ['Unity and stability', 1], ['Shared decision and blame', 1]],
}));

// ================================================================ t05 Position and powers of the Prime Minister
Q('m_real_head', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'Why is the Prime Minister described as the real head of the executive while the President is the nominal head?',
  opts: [
    'The President acts on the advice of the Council of Ministers headed by the Prime Minister',
    'The Prime Minister is elected directly by all citizens',
    'The President has no constitutional powers at all',
    'The Prime Minister can dismiss the President at will',
  ],
  sol: 'Article 74 makes the President act on the advice of the Council of Ministers led by the Prime Minister, so real power lies with the Prime Minister. The Prime Minister is not directly elected by all citizens, the President does have powers, and only impeachment can remove a President.',
}));
Q('m_link', mcq({
  t: 5, d: 2, c: 'recall',
  stem: 'Under Article 78, which duty does the Prime Minister have towards the President?',
  opts: [
    'To communicate all decisions of the Council of Ministers about administration and proposed laws',
    'To get every bill approved by the President before it goes to Parliament',
    'To report only financial matters, once a year',
    'To ask the President to preside over Cabinet meetings',
  ],
  sol: 'The Prime Minister must keep the President informed of decisions about the administration of the Union and proposals for legislation, and give information the President asks for. The President does not pre-approve all bills or preside over the Cabinet.',
}));
Q('m_portfolio', mcq({
  t: 5, d: 2, c: 'application',
  stem: 'After an imagined Cabinet reshuffle, the Minister of Education is moved to the Ministry of Health. Who decides such changes?',
  opts: ['The Prime Minister', 'The Speaker', 'The Rajya Sabha', 'The Cabinet Secretary acting alone'],
  sol: 'Allocating and changing portfolios is the Prime Minister\'s power (formally on the President\'s order). The Speaker, the Rajya Sabha and civil servants have no such power.',
}));
Q('m_pm_resigns', mcq({
  t: 5, d: 3, c: 'analysis',
  stem: 'What happens to the Council of Ministers when the Prime Minister resigns?',
  opts: [
    'The whole Council of Ministers is dissolved',
    'Only the Prime Minister leaves; the other ministers continue as before',
    'The senior-most Cabinet Minister automatically becomes Prime Minister for the full term',
    'The President takes over as head of government',
  ],
  sol: 'The Prime Minister is the head of the Council; when the Prime Minister resigns or dies, the Council of Ministers comes to an end, and a new Prime Minister forms a new ministry. There is no automatic successor for the full term, and the President does not become head of government.',
}));
Q('m_dissolution_advice', mcq({
  t: 5, d: 3, c: 'application',
  stem: 'An imagined Prime Minister who leads a majority wants an early general election. What step can she take?',
  opts: [
    'Advise the President to dissolve the Lok Sabha before its term ends',
    'Dissolve the Lok Sabha herself without informing the President',
    'Ask the Rajya Sabha to dissolve the Lok Sabha',
    'Ask the Supreme Court to call an election',
  ],
  sol: 'The President dissolves the Lok Sabha, normally on the advice of a Prime Minister who has the confidence of the House. The Prime Minister cannot dissolve it alone, and neither the Rajya Sabha nor the courts can.',
}));
Q('m_leader_house', mcq({
  t: 5, d: 2, c: 'understanding',
  stem: 'Which of the following describes the Prime Minister\'s role in relation to Parliament?',
  opts: [
    'Leader of the majority in the Lok Sabha and chief spokesperson of the government',
    'Presiding officer of the Lok Sabha',
    'Chairman of the Rajya Sabha',
    'A neutral umpire who does not take sides in debates',
  ],
  sol: 'The Prime Minister leads the majority, speaks for the government and defends its policies. The Speaker presides over the Lok Sabha, the Vice-President chairs the Rajya Sabha, and the presiding officers, not the Prime Minister, must be neutral.',
}));
Q('m_crisis', mcq({
  t: 5, d: 3, c: 'application',
  stem: 'During an imagined cyclone that hits three coastal States, the Prime Minister chairs meetings of ministers, armed forces chiefs and State officials. Which role of the Prime Minister does this show?',
  opts: ['Coordinator and crisis manager of the government', 'Head of the State', 'Commander of the judiciary', 'Chief of the Election Commission'],
  sol: 'Bringing together ministries, the forces and States in a crisis is the Prime Minister\'s coordinating, crisis-managing role. The President is head of the State, and the Prime Minister commands neither the judiciary nor the Election Commission.',
}));
Q('ar_advice_bind', ar({
  t: 5, d: 3, c: 'analysis', verdict: 'both-true-explains',
  a: 'The President can return the advice of the Council of Ministers once for reconsideration but must then act on it.',
  r: 'The 44th Amendment made the advice of the Council of Ministers binding on the President after one reconsideration.',
  sol: 'Both are true, and R explains A: the 42nd Amendment had made the advice binding, and the 44th Amendment (1978) added the right to ask for one reconsideration, after which the President must act on the advice.',
}));
Q('ar_direct_pm', ar({
  t: 5, d: 3, c: 'analysis', verdict: 'A-true-R-false',
  a: 'The Prime Minister must have the support of a majority in the Lok Sabha.',
  r: 'The Prime Minister is elected directly by all the voters of India.',
  sol: 'A is true: the government survives only with the confidence of the Lok Sabha. R is false: voters elect members of the Lok Sabha; the Prime Minister is appointed by the President as the leader who commands a majority.',
}));
Q('tf_keystone', tf({
  t: 5, d: 2, c: 'understanding', ans: true,
  stem: 'True or false? The resignation or death of the Prime Minister ends the life of the whole Council of Ministers.',
  sol: 'The Council exists around the Prime Minister as its head, so it ends when the Prime Minister leaves office; a new ministry is then formed.',
}));
Q('s_pm_president', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Explain how the Prime Minister acts as a link between the President and the Council of Ministers.',
  model: 'The Prime Minister **informs the President** of all decisions of the Council about **administration and proposed laws**, and supplies information the President asks for (Article 78). The President\'s views reach the **Cabinet** through the Prime Minister.',
  sol: 'Duty to inform; channel both ways.',
  scheme: [['Communicates decisions to the President', 1], ['Channel between President and Cabinet', 1]],
}));
Q('s_pm_cabinet_powers', short({
  t: 5, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'State two powers of the Prime Minister in relation to the Council of Ministers.',
  model: '(1) The Prime Minister advises the President on **appointing and dismissing ministers** and **allocates portfolios**. (2) The Prime Minister **presides over Cabinet meetings** and **coordinates** the work of all ministries.',
  sol: 'Any two powers over the Council.',
  scheme: [['First power', 1], ['Second power', 1]],
}));
Q('s_pm_parliament', short({
  t: 5, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined new Prime Minister wants Parliament to pass her government\'s programme. Give two ways her position in Parliament helps her.',
  model: '(1) As **leader of the majority** in the Lok Sabha, she can count on its **votes** for government bills. (2) As the government\'s **chief spokesperson**, she can **defend policies in debates** and advise on **summoning and proroguing** sessions.',
  sol: 'Two ways linked to her role in Parliament.',
  scheme: [['First way', 1], ['Second way', 1]],
}));
Q('s_conditions_power', short({
  t: 5, d: 4, c: 'evaluation', marks: 2, wl: S2,
  stem: 'The real power of a Prime Minister depends on political conditions. Explain this with two conditions.',
  model: '(1) A Prime Minister whose party has a **clear majority** usually has **more freedom** in choosing ministers and policies. (2) In a **coalition**, partners must be **consulted and kept together**, which **limits** the Prime Minister\'s freedom.',
  sol: 'Two conditions with their effect.',
  scheme: [['Majority strengthens', 1], ['Coalition limits', 1]],
}));
Q('s3_pm_position', short({
  t: 5, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Give three reasons why the Prime Minister is called the head of the government and the key figure of the Union executive.',
  model: '(1) The **President acts on the advice** of the Council of Ministers that the Prime Minister **heads**. (2) The Prime Minister **chooses ministers, allocates portfolios** and can have a minister **dismissed**. (3) The Prime Minister **leads the majority** in the Lok Sabha and **speaks for the nation** at home and abroad.',
  sol: 'Three distinct reasons.',
  scheme: [['Advice binding on the President', 1], ['Control over ministers', 1], ['Leader of the House and the nation', 1]],
}));

// ================================================================ 10-mark structured questions (3 + 3 + 4)
Q('l_formation', long({
  t: [1, 2], d: 3, c: 'application', marks: 10, wl: L10,
  stem: `After an imagined general election, no party wins a majority in the Lok Sabha of ${LS_NOW} members, but two parties form an alliance with ${P_PLUS_R} seats.\n\n(i) Explain how the President will choose the Prime Minister in this situation. **[3]**\n(ii) How are the other ministers appointed, and what limits the size of the ministry? **[3]**\n(iii) Distinguish between the Council of Ministers and the Cabinet that will be formed, giving four points. **[4]**`,
  model: `(i) With no single majority, the President uses **discretion** and invites the **leader of the alliance** (${P_PLUS_R} seats, more than the ${MAJORITY} needed), as that leader is most likely to **command the confidence** of the Lok Sabha; the President may ask for a **vote of confidence** within a time.\n\n(ii) The President appoints the other ministers **on the Prime Minister's advice**. A non-member may be a minister for **six months**. The total, **including the Prime Minister**, cannot exceed **15 per cent** of the Lok Sabha strength (**${MAX_MINISTERS}** here), under the **91st Amendment (2003)**.\n\n(iii) (1) The Council has **three ranks**; the Cabinet only **senior Cabinet Ministers**. (2) The Council is **large**; the Cabinet **small**. (3) The **Cabinet decides policy**; the Council **carries it out**. (4) The Council **rarely meets as a body**; the **Cabinet meets regularly** under the Prime Minister.`,
  sol: 'Discretion in a hung House; appointment and the ceiling; four differences.',
  scheme: [['(i) Alliance leader invited; discretion', 2], ['(i) Confidence vote', 1], ['(ii) Appointed on the Prime Minister\'s advice; six-month rule', 2], ['(ii) 15 per cent ceiling', 1], ['(iii) Four differences', 4]],
}));
Q('l_cabinet_functions', long({
  t: 3, d: 2, c: 'understanding', marks: 10, wl: L10,
  stem: 'The Cabinet is often described as the steering wheel of the government.\n\n(i) Explain the policy-making and administrative functions of the Cabinet. **[3]**\n(ii) Explain its legislative and financial functions. **[3]**\n(iii) What is the role of the Cabinet in a national emergency? Why was this role made stricter by the 44th Amendment? **[4]**',
  model: '(i) **Policy making:** the Cabinet decides the government\'s **domestic and foreign policies** on matters such as farming, industry and defence. **Administrative:** it **coordinates** the ministries, **settles disputes** between them and **supervises** how policies are carried out.\n\n(ii) **Legislative:** it decides which **bills** to introduce, and ministers **pilot them** through Parliament; it advises on **summoning and proroguing** sessions. **Financial:** it prepares the **budget** and tax proposals, presented by the **Finance Minister**; Parliament must approve them.\n\n(iii) A **national emergency** can be proclaimed only on the **written recommendation of the Union Cabinet** (Article 352(3)). The **44th Amendment (1978)** added this so that the **Prime Minister alone** cannot advise an emergency; the **whole Cabinet** must decide and share responsibility, which protects **federalism and rights**.',
  sol: 'Four functions; emergency role and the reason for the 1978 safeguard.',
  scheme: [['(i) Policy making', 1.5], ['(i) Administrative', 1.5], ['(ii) Legislative', 1.5], ['(ii) Financial', 1.5], ['(iii) Written Cabinet decision', 2], ['(iii) Reason for the safeguard', 2]],
}));
Q('l_responsibility', long({
  t: 4, d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'Ministers in India are answerable in two different ways.\n\n(i) What is meant by collective responsibility? To which House does it apply, and under which Article? **[3]**\n(ii) Explain individual responsibility of ministers. **[3]**\n(iii) An imagined minister disagrees with a Cabinet decision, while another minister\'s department is found to have failed. Explain what each principle requires in these two cases. **[4]**',
  model: '(i) All ministers are **jointly responsible** for every decision of the government and **stand or fall together**. It applies to the **Lok Sabha** under **Article 75(3)**; if the Lok Sabha passes a **no-confidence motion** or defeats the budget, the **whole ministry resigns**.\n\n(ii) Each minister answers **personally** for his **department**. Ministers hold office **during the pleasure of the President**, so on the **Prime Minister\'s advice** a minister can be **dismissed** for poor work or misconduct without the government falling.\n\n(iii) **Disagreeing minister:** under **collective responsibility** he may argue **inside the Cabinet**, but once the decision is taken he must **defend it in public** or **resign**. **Failing department:** under **individual responsibility**, that minister may be **asked to resign** or be dismissed, while the **rest of the government continues**.',
  sol: 'Meaning and Article; individual responsibility; application to two cases.',
  scheme: [['(i) Meaning', 1.5], ['(i) Lok Sabha, Article 75(3)', 1.5], ['(ii) Individual responsibility explained', 3], ['(iii) Case of the disagreeing minister', 2], ['(iii) Case of the failing department', 2]],
}));
Q('l_pm_powers', long({
  t: 5, d: 3, c: 'understanding', marks: 10, wl: L10,
  stem: 'The Prime Minister holds the central place in the Union government.\n\n(i) Describe the powers of the Prime Minister in relation to the Council of Ministers. **[3]**\n(ii) Describe the Prime Minister\'s role in relation to the President. **[3]**\n(iii) Describe the Prime Minister\'s role in relation to Parliament and the nation. **[4]**',
  model: '(i) The Prime Minister advises the President on **appointing ministers**, **allocates and changes portfolios**, can ask a minister to **resign** or have him **dismissed**, **presides over the Cabinet** and **coordinates** all ministries. If the Prime Minister resigns, the **whole Council ends**.\n\n(ii) The Prime Minister is the **link** between the President and the Cabinet: he must **communicate all decisions** on administration and legislation (**Article 78**) and give information asked for. He **advises** the President on key **appointments** and on **dissolving** the Lok Sabha.\n\n(iii) The Prime Minister is the **leader of the majority** in the Lok Sabha, the government\'s **chief spokesperson** in debates, and advises on **summoning and proroguing** Parliament. He represents the country at **international meetings** and acts as **crisis manager** in emergencies such as disasters or war.',
  sol: 'Powers over the Council, the President and Parliament and nation.',
  scheme: [['(i) Appointment, portfolios, dismissal', 2], ['(i) Presides and coordinates', 1], ['(ii) Link under Article 78', 2], ['(ii) Advice on appointments or dissolution', 1], ['(iii) Leader in Parliament', 2], ['(iii) National and international role', 2]],
}));
Q('l_real_nominal', long({
  t: [5, 4], d: 4, c: 'evaluation', marks: 10, wl: L10,
  stem: 'The President is the head of the State, but the Prime Minister is the head of the government.\n\n(i) Why is the President called the nominal executive and the Prime Minister the real executive? **[3]**\n(ii) How did the 42nd and 44th Amendments settle the question of ministerial advice to the President? **[3]**\n(iii) Evaluate how the strength of a Prime Minister changes between single-party majority and coalition governments, giving two points for each. **[4]**',
  model: '(i) All executive action is taken **in the President\'s name**, but under **Article 74** the President acts on the **advice of the Council of Ministers** headed by the Prime Minister. So **real power** lies with the Prime Minister and the Cabinet, who are **answerable to the Lok Sabha**.\n\n(ii) The **42nd Amendment (1976)** made the advice **binding** on the President. The **44th Amendment (1978)** let the President **return the advice once** for reconsideration, but the President must **act on the advice** given after that.\n\n(iii) **Single-party majority:** the Prime Minister can **choose ministers freely** and push the **party\'s programme** without bargaining. **Coalition:** the Prime Minister must **share posts** with partners and **consult them** on policy, so decisions may be **slower** and depend on keeping the **alliance together**. In both, the Prime Minister stays the **leader**, but freedom is greater with a single majority.',
  sol: 'Nominal versus real; the two amendments; a balanced evaluation.',
  scheme: [['(i) Article 74, advice of the Council', 2], ['(i) Real power answerable to the Lok Sabha', 1], ['(ii) 42nd Amendment', 1.5], ['(ii) 44th Amendment', 1.5], ['(iii) Single-party majority, two points', 2], ['(iii) Coalition, two points', 2]],
}));
Q('l_tenure_size', long({
  t: [1, 4], d: 3, c: 'application', marks: 10, wl: L10,
  stem: 'Answer the following about the term and size of the Union ministry.\n\n(i) For how long does the Council of Ministers hold office? Explain the phrase "during the pleasure of the President". **[3]**\n(ii) A person who is not a member of Parliament is made a minister. State the rule that applies and its purpose. **[3]**\n(iii) With the Lok Sabha at its present membership, calculate the largest ministry allowed and explain two reasons for this limit. **[4]**',
  model: `(i) The ministry has **no fixed term**. Ministers hold office **during the pleasure of the President**, but since the President acts on **ministerial advice**, the ministry in practice lasts as long as it keeps the **confidence of the Lok Sabha**; a minister lasts as long as the **Prime Minister** wishes.\n\n(ii) Such a person must become a **member of either House within six months**, or cease to be a minister (Article 75(5)). This lets the government use **talented people** while keeping every minister **answerable to Parliament**.\n\n(iii) The limit is **15 per cent** of the Lok Sabha strength, including the Prime Minister: 15 per cent of ${LS_NOW} is 81.45, so at most **${MAX_MINISTERS}** ministers. **Reasons:** to cut the **cost** of oversized ministries, and to stop posts being used as **rewards for defection** in coalitions (**91st Amendment, 2003**).`,
  sol: 'Tenure in practice; six-month rule; computed ceiling and reasons.',
  scheme: [['(i) No fixed term; confidence of the Lok Sabha', 2], ['(i) Meaning of the pleasure clause', 1], ['(ii) Six-month rule', 2], ['(ii) Purpose', 1], ['(iii) Calculation', 2], ['(iii) Two reasons', 2]],
}));
Q('l_cabinet_vs_pm', long({
  t: [2, 5], d: 4, c: 'analysis', marks: 10, wl: L10,
  stem: 'Some people describe the Prime Minister as "first among equals" in the Cabinet, while others say the Prime Minister is far more than that.\n\n(i) What does the phrase "first among equals" suggest about the Prime Minister\'s position? **[3]**\n(ii) Give three powers that make the Prime Minister more than just one minister among others. **[3]**\n(iii) Give two ways in which the Cabinet and the Lok Sabha can still check the Prime Minister, and draw a conclusion. **[4]**',
  model: '(i) It suggests that the Prime Minister is only the **senior member** of a **team of equals**, who **leads discussion** but takes decisions **together** with colleagues, in keeping with **collective responsibility**.\n\n(ii) (1) The Prime Minister decides **who becomes a minister** and can have any minister **removed**. (2) The Prime Minister **allocates portfolios** and **presides** over the Cabinet. (3) The Prime Minister\'s **resignation ends the whole Council**, and only the Prime Minister can **advise dissolution** of the Lok Sabha.\n\n(iii) (1) Senior Cabinet colleagues and **coalition partners** can **resist** decisions and even withdraw support. (2) The **Lok Sabha** can remove the government by a **no-confidence motion**. **Conclusion:** the Prime Minister is much more than first among equals, but power depends on keeping the **support** of the party and the House.',
  sol: 'Meaning of the phrase; three powers; two checks and a balanced conclusion.',
  scheme: [['(i) Meaning of the phrase', 3], ['(ii) Three powers', 3], ['(iii) Two checks', 2], ['(iii) Balanced conclusion', 2]],
}));
Q('l_ls_confidence', long({
  t: [4, 1], d: 3, c: 'analysis', marks: 10, wl: L10,
  stem: 'An imagined government loses an important vote in the Lok Sabha.\n\n(i) Explain why losing the confidence of the Lok Sabha forces the whole ministry to leave office. **[3]**\n(ii) Why can the Rajya Sabha not bring down the government in the same way? **[3]**\n(iii) What choices does the President have once the ministry resigns? Explain two. **[4]**',
  model: '(i) The Council of Ministers is **collectively responsible** to the **Lok Sabha** (**Article 75(3)**). Losing a **no-confidence motion** or a **money vote** shows it no longer has the House\'s **support**, so the **whole ministry** must **resign**.\n\n(ii) The Rajya Sabha is **indirectly elected** and the ministry is **not responsible** to it. A **no-confidence motion** can be moved **only in the Lok Sabha**, and the Rajya Sabha can only **delay** money bills for **14 days**.\n\n(iii) (1) The President may invite **another leader** who can show majority support to **form a new government**. (2) If no stable majority is possible, the President may **dissolve the Lok Sabha** on advice and order **fresh elections**, with the outgoing ministry as a **caretaker** meanwhile.',
  sol: 'Collective responsibility; why the Rajya Sabha cannot; the President\'s choices.',
  scheme: [['(i) Collective responsibility, Article 75(3)', 2], ['(i) Whole ministry resigns', 1], ['(ii) Not responsible to the Rajya Sabha', 1.5], ['(ii) No-confidence only in the Lok Sabha; money bills', 1.5], ['(iii) New government', 2], ['(iii) Dissolution and caretaker', 2]],
}));

// ================================================================ source-based items
Q('sb_minister_diary', source({
  t: [2, 4], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the extract from the imagined diary of a newly appointed Minister of State in the Union government and answer the questions that follow. ${IMAG}`,
  passage: '**Diary of a new Minister of State (imagined)**\n\nSworn in at the President\'s house this morning, along with five Cabinet Ministers and three Deputy Ministers. I took two oaths, one of office and one of secrecy. I have independent charge of the Ministry of Skill Training, so no Cabinet Minister sits above me.\n\nThe Cabinet met today to decide the new apprenticeship policy. I was not in the room; I was invited only for the item on my ministry. In the meeting I argued for a larger stipend for apprentices, but the Cabinet chose a smaller one.\n\nA reporter asked me tonight whether I would criticise the decision. I told him the government has one voice.',
  parts: [
    child('a', short({ t: 2, d: 1, c: 'recall', marks: 1, stem: 'Name the three ranks of ministers mentioned in the diary.', model: '**Cabinet Ministers**, **Ministers of State** and **Deputy Ministers**.', sol: 'Three ranks from the swearing-in.', scheme: [['Three ranks', 1]] })),
    child('b', short({ t: 2, d: 2, c: 'application', marks: 1, stem: 'Why was the diarist present at only part of the Cabinet meeting?', model: 'She is a **Minister of State**, not a Cabinet member; she attends **only when invited** for her ministry\'s items.', sol: 'Not a Cabinet member; invited for her item.', scheme: [['Reason given', 1]] })),
    child('c', short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Which principle explains her reply to the reporter? Explain it.', model: '**Collective responsibility**: ministers may disagree **inside** the Cabinet, but once a decision is taken all must **support it in public**, or resign.', sol: 'Name the principle and what it requires.', scheme: [['Collective responsibility', 1], ['What it requires', 1]] }), [
      short({ t: [2, 4], d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Suggest why the Cabinet, and not the full Council of Ministers, took the decision on the apprenticeship policy.', model: 'The full Council is **too large** to discuss policy in detail; the **Cabinet** of senior ministers is **small** enough to deliberate and is the **decision-making core**.', sol: 'Size and role of the Cabinet.', scheme: [['Council too large', 1], ['Cabinet as decision-making core', 1]] }),
    ]),
  ],
}));
Q('sb_coalition_letter', source({
  t: [1, 5], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the imagined letter written by a student journalist after a general election and answer the questions that follow. ${IMAG}`,
  passage: `**Letter from a student journalist (imagined)**\n\nNo party has won a majority this time. Party P has 248 seats in a Lok Sabha of ${LS_NOW}, and its leader has met the leader of Party R, which has 61 seats. Together they have signed a letter of support and taken it to the President.\n\nPeople are asking how many ministers the new government can have. Party R wants a third of all ministerial posts. The new Prime Minister has said that portfolios will be decided by her after talks with partners.`,
  parts: [
    child('a', short({ t: 1, d: 2, c: 'application', marks: 1, stem: `Do the two parties together have a majority? Show your working.`, model: `Yes: 248 + 61 = **${P_PLUS_R}**, which is more than the **${MAJORITY}** needed in a House of ${LS_NOW}.`, sol: 'Add the seats and compare with the majority mark.', scheme: [['Correct sum and comparison', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'What is the largest number of ministers the new government can have?', model: `**${MAX_MINISTERS}**, since the ministry, including the Prime Minister, cannot exceed **15 per cent** of ${LS_NOW}.`, sol: '15 per cent of 543, rounded down.', scheme: [['Correct figure with the rule', 1]] })),
    child('c', short({ t: 5, d: 3, c: 'evaluation', marks: 2, stem: '**Either** (i): How does being a coalition government affect the new Prime Minister\'s power to allocate portfolios?', model: 'Formally she still **allocates portfolios**, but she must **consult partners** like Party R and **share posts** to keep their **support**, which **limits her freedom**.', sol: 'Formal power versus coalition pressure.', scheme: [['Formal power remains', 1], ['Limited by need to keep partners', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Why did the two leaders take a letter of support to the President?', model: 'With no single majority, the President must judge who can **command the confidence** of the Lok Sabha; a **letter of support** shows that the alliance has a **majority** behind its leader.', sol: 'President\'s judgement in a hung House.', scheme: [['President must judge majority support', 1], ['Letter proves alliance majority', 1]] }),
    ]),
  ],
}));
Q('sb_cabinet_minutes', source({
  t: [3, 5], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the imagined summary of a Cabinet meeting and answer the questions that follow. ${IMAG}`,
  passage: '**Summary of an imagined Cabinet meeting**\n\nItem 1. The Cabinet approved a draft bill to protect wetlands; the Minister of Environment will introduce it in the coming session.\n\nItem 2. The Ministries of Power and Water Resources disagreed over a dam project; the Prime Minister settled the matter by giving the lead to Water Resources.\n\nItem 3. The Cabinet approved the tax proposals that the Finance Minister will place before Parliament in February.\n\nItem 4. After the meeting the Prime Minister met the President and briefed him on all three decisions.',
  parts: [
    child('a', short({ t: 3, d: 1, c: 'application', marks: 1, stem: 'Which function of the Cabinet is shown in Item 1?', model: 'Its **legislative** function: deciding on a **bill** for Parliament.', sol: 'Draft bill for Parliament.', scheme: [['Legislative function', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Which function is shown in Item 2, and who exercised it?', model: '**Coordination** of ministries (administrative function), exercised by the **Prime Minister**.', sol: 'Settling a dispute between ministries.', scheme: [['Coordination by the Prime Minister', 1]] })),
    child('c', short({ t: [3, 5], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Can the tax proposals in Item 3 be collected as soon as the Cabinet approves them? Explain.', model: '**No.** The Cabinet only **proposes** taxes; **no tax can be collected without a law** passed by **Parliament**, so they must first be approved in the **budget**.', sol: 'Parliamentary approval of taxes.', scheme: [['No, with the rule', 1], ['Parliament must pass them', 1]] }), [
      short({ t: 5, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Which duty of the Prime Minister is shown in Item 4? Name the Article.', model: 'The duty to **communicate decisions** of the Council on administration and proposed laws to the **President**, under **Article 78**.', sol: 'Duty under Article 78.', scheme: [['Duty described', 1], ['Article 78', 1]] }),
    ]),
  ],
}));
