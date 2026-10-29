// CBSE 12 Political Science, ch04 International Organisations — question bank. Every source, scenario
// and imagined state is written by SOYL and labelled as such; no NCERT text, exercise, box or cartoon and
// no board/sample-paper item is reused (D-036). Real-world facts are limited to stable, commonly taught
// ones (UN founding 1945, 51 founding and 193 present members, the six principal organs, Security Council
// composition and voting, Trusteeship Council suspended 1994, Bretton Woods 1944, WTO 1995 after GATT,
// IAEA 1957, Amnesty International and Human Rights Watch as NGOs). No current office-holder is named.
// Items on UN reform and India's claim ask for arguments on both sides; no key requires a verdict.
import assert from 'node:assert/strict';
import { Q, mcq, ar, tf, fb, match, ord, num, short, long, source, child } from './lib.mjs';

const S2 = [30, 50];
const S3 = [50, 80];
const L5 = [80, 120];

// ---------------------------------------------------------------- computed figures (Security Council)
export const SC = { members: 15, permanent: 5, elected: 10, termYears: 2, needed: 9 };
assert.equal(SC.permanent + SC.elected, SC.members);
export const SC_ELECTED_EACH_YEAR = SC.elected / SC.termYears; // 5
assert.equal(SC_ELECTED_EACH_YEAR, 5);
// Worked example: an imagined draft resolution on a ceasefire.
export const VOTE1 = { yes: 11, no: 2, abstain: 2, permanentNo: 1 };
assert.equal(VOTE1.yes + VOTE1.no + VOTE1.abstain, SC.members);
export const VOTE1_PASSES = VOTE1.yes >= SC.needed && VOTE1.permanentNo === 0; // false (veto)
assert.equal(VOTE1_PASSES, false);
export const VOTE2 = { yes: 9, no: 3, abstain: 3, permanentNo: 0 };
assert.equal(VOTE2.yes + VOTE2.no + VOTE2.abstain, SC.members);
export const VOTE2_PASSES = VOTE2.yes >= SC.needed && VOTE2.permanentNo === 0; // true
assert.equal(VOTE2_PASSES, true);
export const VOTE3 = { yes: 8, no: 0, abstain: 7, permanentNo: 0 };
assert.equal(VOTE3.yes + VOTE3.no + VOTE3.abstain, SC.members);
export const VOTE3_SHORT = SC.needed - VOTE3.yes; // 1 vote short
assert.equal(VOTE3_SHORT, 1);

// ================================================================ t01 Meaning and significance
Q('m_io_meaning', mcq({
  t: 1, d: 1, c: 'understanding',
  stem: 'Which statement best describes an **international organisation** such as the UN?',
  opts: [
    'A body created by states, through agreement, to help them cooperate on shared problems',
    'A world government whose orders every citizen must obey directly',
    'A private company that trades across many countries',
    'A military alliance that one country controls',
  ],
  sol: 'International organisations are set up by member states and work through their consent; they are not a world government above states. A trading company is a private firm, and an alliance run by one country is not a cooperative body of equals.',
}));
Q('m_io_why', mcq({
  t: 1, d: 2, c: 'application',
  stem: 'A new virus spreads from one imagined country, Tamralipti, to its neighbours within weeks. Why is an international organisation especially useful in such a case?',
  opts: [
    'The problem crosses borders, so no single state can tackle it alone; a common body helps share information and coordinate action',
    'Because an international organisation can arrest the officials of Tamralipti',
    'Because each neighbour can solve the problem better by closing all contact with the world permanently',
    'Because international organisations exist only to deal with diseases',
  ],
  sol: 'Cross-border problems such as epidemics need cooperation, and an international body lowers the cost of sharing information and coordinating action. Such bodies cannot arrest a state\'s officials, permanent isolation is not a solution, and they deal with many issues, not only health.',
}));
Q('m_not_war', mcq({
  t: 1, d: 2, c: 'analysis',
  stem: 'Which of the following is a realistic expectation from an international organisation like the UN?',
  opts: [
    'It can help states discuss disputes and reach peaceful solutions, though it cannot always prevent war',
    'It can abolish all wars between states for ever',
    'It can take over the government of any member that breaks a rule',
    'It can make every member state agree on every issue',
  ],
  sol: 'The UN is a forum where states negotiate and cooperate; its success depends on members. It cannot guarantee that wars will never happen, cannot replace a member\'s government at will, and cannot force agreement on every issue.',
}));
Q('ar_cooperate', ar({
  t: 1, d: 2, c: 'analysis', key: 'a',
  a: 'States often find it easier to cooperate through an international organisation than one by one.',
  r: 'An international organisation provides rules, information and a regular meeting place, which reduce suspicion and the cost of each new negotiation.',
  sol: 'Both are true, and R explains A: a standing body with agreed procedures and shared information makes cooperation cheaper and more predictable than repeated one-to-one bargaining.',
}));
Q('tf_world_govt', tf({
  t: 1, d: 1, c: 'understanding', ans: false,
  stem: 'True or false? The United Nations is a world government that stands above all sovereign states.',
  sol: 'The UN is an organisation of sovereign states; it acts through the consent and cooperation of its members and has no army or police of its own that it can use at will.',
}));
Q('s_why_io', short({
  t: 1, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Give two reasons why states in today\'s world need international organisations.',
  model: '1. Many problems, such as **epidemics, climate change and terrorism**, cross borders and need **joint action** by many states.\n2. A permanent body offers **rules, information and a forum**, so states can settle differences by **talking rather than fighting**.',
  sol: 'One reason about cross-border problems and one about the forum and rules that such a body provides.',
  scheme: [['Cross-border problems need joint action', 1], ['Forum and rules for peaceful discussion', 1]],
}));
Q('s3_io_value', short({
  t: 1, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'An imagined student, Rehana, argues in a school debate: "International organisations are useless, because powerful states do what they want anyway." Give three points with which you could reply to her.',
  model: '1. Even powerful states **gain from rules**: trade, air travel, postal links and health alerts all depend on agreed international standards.\n2. Organisations give **smaller states a voice** and a place to raise complaints that would otherwise be ignored.\n3. They **lower the chance of conflict** by keeping states talking, and their record in areas such as **peacekeeping, refugees and disease control** shows real results, even if they cannot stop every war.',
  sol: 'Three distinct counter-points: shared rules benefit all, voice for weaker states, conflict reduction and practical achievements; a balanced reply may admit the limits she points to.',
  scheme: [['Benefits of common rules even for strong states', 1], ['Voice and forum for smaller states', 1], ['Reduced conflict or practical achievements', 1]],
}));
Q('m_io_feature', mcq({
  t: 1, d: 2, c: 'analysis',
  stem: 'Which of the following helps explain why an international organisation can make cooperation easier among states that distrust each other?',
  opts: [
    'It gives all members the same information and a fixed set of procedures for decisions',
    'It forces the strongest member to give up its army',
    'It lets each member ignore any agreement it dislikes without consequence',
    'It replaces national parliaments in making laws',
  ],
  sol: 'Shared information and agreed procedures reduce suspicion. No organisation disarms its strongest member, membership does carry obligations, and it does not replace national parliaments.',
}));

// ================================================================ t02 Evolution and organs of the UN
Q('m_un_founded', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'The United Nations came into existence on',
  opts: ['24 October 1945', '26 June 1945', '1 January 1942', '10 January 1920'],
  sol: 'The UN Charter was signed at San Francisco in June 1945, and the organisation came into existence on 24 October 1945, now observed as UN Day. 1942 is the year of the declaration by the wartime allies, and 1920 the year the League of Nations began work.',
}));
Q('m_league', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'Which organisation was the predecessor of the United Nations, set up after the First World War?',
  opts: ['The League of Nations', 'The World Trade Organization', 'The Non-Aligned Movement', 'The International Atomic Energy Agency'],
  sol: 'The League of Nations was created after the First World War; its failure to prevent the Second World War led to the creation of the UN. The WTO (1995), NAM (1961) and IAEA (1957) all came later.',
}));
Q('m_founding_members', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'How many states were founding (original) members of the United Nations in 1945?',
  opts: ['51', '193', '15', '100'],
  sol: 'The UN began with 51 member states. 193 is its present membership, and 15 is the size of the Security Council.',
}));
Q('m_ga_vote', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'In the UN General Assembly,',
  opts: [
    'every member state has one vote, whatever its size or wealth',
    'votes are weighted by each member\'s population',
    'only the five permanent members can vote',
    'votes are weighted by each member\'s financial contribution',
  ],
  sol: 'The General Assembly works on the principle of one state, one vote. Weighted voting by money is a feature of the IMF and World Bank, not the Assembly, and the permanent members matter in the Security Council, not here.',
}));
Q('m_sc_perm', mcq({
  t: 2, d: 1, c: 'recall',
  stem: 'Which of the following is NOT a permanent member of the UN Security Council?',
  opts: ['Japan', 'France', 'China', 'Russia'],
  sol: 'The five permanent members are the USA, the UK, France, Russia and China. Japan has been elected a non-permanent member many times but has no permanent seat.',
}));
Q('m_veto', mcq({
  t: 2, d: 2, c: 'understanding',
  stem: 'What is meant by the **veto** in the UN Security Council?',
  opts: [
    'A negative vote by any one permanent member that stops a substantive decision, even if the others support it',
    'The right of any Council member to leave the meeting',
    'The power of the General Assembly to overrule the Security Council',
    'The right of the Secretary-General to cancel a resolution',
  ],
  sol: 'Each of the five permanent members can block a substantive resolution by voting against it. Non-permanent members have no such power, the Assembly cannot overrule the Council on security matters, and the Secretary-General has no veto.',
}));
Q('m_icj', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'Two imagined states, Aranya and Meghpur, disagree over where their sea boundary lies and both agree to let a UN body decide according to international law. Which principal organ will hear the case?',
  opts: ['The International Court of Justice', 'The Economic and Social Council', 'The Trusteeship Council', 'The Secretariat'],
  sol: 'Legal disputes between states that accept its jurisdiction go to the International Court of Justice at The Hague. ECOSOC deals with economic and social matters, the Trusteeship Council has been inactive since 1994, and the Secretariat is the administrative staff.',
}));
Q('m_trustee', mcq({
  t: 2, d: 3, c: 'understanding',
  stem: 'Why has the Trusteeship Council suspended its operations since 1994?',
  opts: [
    'The last trust territory became independent, so it had no territories left to supervise',
    'It was merged into the Security Council',
    'Its members could not agree on a chairperson',
    'It was replaced by the World Trade Organization',
  ],
  sol: 'The Council supervised territories placed under trusteeship; when the last of them (Palau) became independent in 1994, it suspended operations. It was not merged with the Security Council and has nothing to do with the WTO.',
}));
Q('m_secretariat', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'A UN official based in New York prepares reports, organises conferences and carries out the day-to-day administration of the organisation. Which principal organ does this official work for?',
  opts: ['The Secretariat', 'The General Assembly', 'The International Court of Justice', 'The Security Council'],
  sol: 'The Secretariat, headed by the Secretary-General, runs the daily work of the UN. The Assembly and the Council are bodies of member states, and the ICJ is a court.',
}));
Q('m_ecosoc', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'A UN body coordinates the work of agencies dealing with health, education, labour and development, and discusses reports on poverty. Which principal organ is this?',
  opts: ['The Economic and Social Council (ECOSOC)', 'The Security Council', 'The International Court of Justice', 'The Trusteeship Council'],
  sol: 'ECOSOC coordinates the economic, social and related work of the UN and its specialised agencies. The Security Council deals with peace and security, the ICJ with legal disputes, and the Trusteeship Council with trust territories.',
}));
Q('m_agency_match', mcq({
  t: 2, d: 2, c: 'application',
  stem: 'An imagined country asks a UN specialised agency for help to set fair standards for factory working hours and the safety of workers. Which agency deals with such matters?',
  opts: ['The International Labour Organization (ILO)', 'The World Health Organization (WHO)', 'The Food and Agriculture Organization (FAO)', 'The International Atomic Energy Agency (IAEA)'],
  sol: 'Labour standards and workers\' rights are the field of the ILO. WHO deals with health, FAO with food and farming, and the IAEA with nuclear energy.',
}));
Q('m_nonperm_term', mcq({
  t: 2, d: 2, c: 'recall',
  stem: 'The ten non-permanent members of the Security Council are',
  opts: [
    'elected by the General Assembly for two-year terms',
    'appointed by the five permanent members for life',
    'chosen by the Secretary-General every five years',
    'selected by lottery among all member states each year',
  ],
  sol: 'The General Assembly elects the ten non-permanent members for two-year terms, five each year. They are not appointed by the permanent members or the Secretary-General, and there is no lottery.',
}));
Q('ar_veto_abstain', ar({
  t: 2, d: 3, c: 'analysis', key: 'b',
  a: 'A resolution of the Security Council can pass even if one permanent member abstains.',
  r: 'The non-permanent members of the Security Council are elected for two-year terms.',
  sol: 'Both are true. In practice an abstention by a permanent member is not treated as a veto, so the resolution can pass with nine votes in favour. R is a true fact about elected members, but it does not explain why an abstention is not a veto.',
}));
Q('ar_league_failed', ar({
  t: 2, d: 2, c: 'analysis', key: 'a',
  a: 'The United Nations was set up after the Second World War.',
  r: 'The League of Nations, set up after the First World War, had failed to prevent another world war.',
  sol: 'Both are true, and R explains A: the failure of the League to keep peace led the wartime allies to plan a stronger organisation, the UN, in 1945.',
}));
Q('ar_ga_binding', ar({
  t: 2, d: 3, c: 'analysis', key: 'd',
  a: 'Every resolution of the General Assembly is legally binding on all member states.',
  r: 'In the General Assembly each member state has one vote.',
  sol: 'A is false: most General Assembly resolutions are recommendations; decisions of the Security Council on peace and security are the ones members have agreed to carry out. R is true: the Assembly follows one state, one vote.',
}));
Q('tf_trustee', tf({
  t: 2, d: 2, c: 'recall', ans: true,
  stem: 'True or false? The Trusteeship Council is one of the six principal organs of the UN, although it suspended its operations in 1994.',
  sol: 'The Charter lists six principal organs, including the Trusteeship Council; it stopped regular work in 1994 after the last trust territory became independent.',
}));
Q('fb_hq', fb({
  t: 2, d: 1, c: 'recall',
  stem: 'The headquarters of the United Nations is in ___, and the International Court of Justice sits at ___.',
  acc: [['New York', 'New York City'], ['The Hague', 'Hague']],
  sol: 'The UN headquarters is in New York; the ICJ sits at The Hague in the Netherlands.',
}));
Q('mt_organs', match({
  t: 2, d: 2, c: 'understanding',
  stem: 'Match each principal organ of the UN with its main work.',
  pairs: [
    ['General Assembly', 'All members discuss world issues and pass recommendations, one state one vote'],
    ['Security Council', 'Primary responsibility for international peace and security'],
    ['International Court of Justice', 'Settles legal disputes between states'],
    ['Secretariat', 'Day-to-day administration, headed by the Secretary-General'],
  ],
  sol: 'Assembly: forum of all members; Council: peace and security; ICJ: legal disputes; Secretariat: administration.',
}));
Q('ord_road', ord({
  t: 2, d: 2, c: 'understanding', marks: 1,
  stem: 'Arrange these events on the road to and beyond the founding of the UN in chronological order.',
  items: [
    'The League of Nations begins work after the First World War',
    'The Atlantic Charter is announced by the leaders of the USA and the UK',
    'The UN Charter is signed at the San Francisco conference',
    'The International Atomic Energy Agency is set up',
    'The World Trade Organization replaces the GATT framework',
  ],
  sol: 'League of Nations (1920) → Atlantic Charter (1941) → UN Charter signed (June 1945) → IAEA (1957) → WTO (1995).',
}));
Q('n_votes_needed', num({
  t: 2, d: 2, c: 'understanding', marks: 1, value: SC.needed, unit: 'votes',
  stem: 'The Security Council has 15 members. What is the minimum number of votes in favour that a substantive resolution needs (provided no permanent member votes against it)?',
  sol: `Step 1: A substantive decision needs the affirmative votes of nine of the fifteen members.\nStep 2: So at least ${SC.needed} votes, with no negative vote from a permanent member.`,
}));
Q('n_elected_yearly', num({
  t: 2, d: 3, c: 'application', marks: 1, value: SC_ELECTED_EACH_YEAR, unit: 'members',
  stem: 'The Security Council has 10 non-permanent members, each elected for a two-year term, with the terms staggered. How many non-permanent members does the General Assembly elect in a normal year?',
  sol: `Step 1: Ten seats, each held for two years, are filled in two equal halves.\nStep 2: ${SC.elected} ÷ ${SC.termYears} = ${SC_ELECTED_EACH_YEAR} members each year.`,
}));
Q('s_organs_two', short({
  t: 2, d: 1, c: 'recall', marks: 2, wl: S2,
  stem: 'Name any four principal organs of the United Nations.',
  model: 'Any four of: the **General Assembly**, the **Security Council**, the **Economic and Social Council**, the **International Court of Justice**, the **Secretariat** and the **Trusteeship Council**.',
  sol: 'Half a mark for each correct organ, up to four.',
  scheme: [['Two organs named correctly', 1], ['Two more organs named correctly', 1]],
}));
Q('s_sc_comp', short({
  t: 2, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Describe the composition of the UN Security Council.',
  model: 'It has **15 members**: **five permanent** members (the USA, the UK, France, Russia and China), each with a **veto**, and **ten non-permanent** members elected by the General Assembly for **two-year terms**.',
  sol: 'State the total, the permanent five with their veto, and the ten elected members with their term.',
  scheme: [['Five permanent members with veto', 1], ['Ten non-permanent members, two-year terms, elected by the Assembly', 1]],
}));
Q('s3_ga_sc', short({
  t: 2, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'Distinguish between the General Assembly and the Security Council on three bases.',
  model: '1. **Membership:** the Assembly includes **all 193 members**; the Council has only **15**.\n2. **Voting:** the Assembly follows **one state, one vote**; in the Council the **five permanent members hold a veto** on substantive matters.\n3. **Powers:** Assembly resolutions are mostly **recommendations**, while Council decisions on **peace and security** are the ones members have agreed to carry out.',
  sol: 'Three clear bases (membership, voting, nature of decisions), each with both sides stated.',
  scheme: [['Membership compared', 1], ['Voting compared', 1], ['Nature of decisions or powers compared', 1]],
}));
Q('s3_agencies', short({
  t: 2, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'What are the specialised agencies of the UN? Explain the work of any two of them.',
  model: '**Specialised agencies** are separate organisations linked to the UN through agreements, each working in one field and coordinated through **ECOSOC**.\n- The **World Health Organization** sets health standards, fights epidemics and supports vaccination.\n- The **International Labour Organization** sets standards for **workers\' rights, working hours and safety**.',
  sol: 'A definition plus two agencies with their fields (WHO, ILO, FAO, UNESCO and similar are all acceptable).',
  scheme: [['Meaning of specialised agencies', 1], ['First agency and its work', 1], ['Second agency and its work', 1]],
}));
Q('l_un_organs', long({
  t: 2, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Describe the role of any five principal organs of the United Nations.',
  model: '1. **General Assembly:** all member states meet, each with **one vote**; it discusses world issues, approves the budget and elects non-permanent Council members.\n2. **Security Council:** **15 members**, five permanent with a **veto**; it has primary responsibility for **peace and security** and can authorise sanctions or peacekeeping.\n3. **Economic and Social Council:** coordinates economic, social, health and educational work with the **specialised agencies**.\n4. **International Court of Justice:** at **The Hague**, settles **legal disputes between states** and gives advisory opinions.\n5. **Secretariat:** headed by the **Secretary-General**, carries out the daily **administration** of the UN. (The **Trusteeship Council** has been inactive since 1994.)',
  sol: 'Five organs, one clear role each; naming the Trusteeship Council with its suspended status is also acceptable as one organ.',
  scheme: [['First organ and role', 1], ['Second organ and role', 1], ['Third organ and role', 1], ['Fourth organ and role', 1], ['Fifth organ and role', 1]],
}));
Q('l_un_success', long({
  t: [2, 1], d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'It is sometimes said that the UN has failed because wars still take place. Evaluate this view, giving points on both sides.',
  model: '**Limits:**\n1. The **veto** lets one permanent member block action, so the Council sometimes **cannot respond** to a crisis.\n2. The UN has **no army of its own**; it depends on members for troops, money and will.\n**Achievements:**\n3. It gives every state a **forum to talk**, which has helped cool many disputes before they became wars.\n4. **Peacekeeping**, help for **refugees**, disease control and food aid have saved many lives.\n5. **Conclusion:** the UN cannot stop every war, but the world would likely be **less safe without it**; reform can make it more effective.',
  sol: 'Two limits, two achievements and a reasoned conclusion; any balanced judgement with reasons earns the last mark.',
  scheme: [['First limitation with reason', 1], ['Second limitation with reason', 1], ['First achievement', 1], ['Second achievement', 1], ['Balanced conclusion', 1]],
}));

// ================================================================ t03 Reform of the UN; India
Q('m_reform_two', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'The debate on reforming the UN after the Cold War has two broad parts. They are reform of',
  opts: [
    'the organisation\'s structures and processes, and a review of the issues that fall within its jurisdiction',
    'the UN flag and the UN anthem',
    'the national constitutions of member states, and their election laws',
    'the location of the headquarters, and the official languages only',
  ],
  sol: 'Reform is discussed under two heads: structures and processes (for example, the make-up of the Security Council) and jurisdiction (which issues the UN should deal with). The other options are not part of this debate.',
}));
Q('m_reform_why', mcq({
  t: 3, d: 2, c: 'application',
  stem: 'Which change in the world since 1945 is most often given as a reason for changing the membership of the Security Council?',
  opts: [
    'The number of UN members has grown greatly, with many new states from Asia, Africa and Latin America, while the permanent five are unchanged',
    'The UN has moved its headquarters out of New York',
    'The General Assembly has stopped meeting',
    'All the permanent members have given up their veto',
  ],
  sol: 'Membership grew from 51 to 193, mostly through newly independent states, but the permanent five reflect the world of 1945. The other statements are untrue.',
}));
Q('m_criteria', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which of the following has NOT been commonly proposed as a criterion for a new permanent member of the Security Council?',
  opts: [
    'Being the country with the highest number of tourists',
    'Being a major economic power',
    'Contributing substantially to the UN budget',
    'Respecting democracy and human rights',
  ],
  sol: 'Proposals in the reform debate include economic and military weight, budget contribution, population, respect for democracy and human rights, and representation of the world\'s regions. Tourist numbers have never been a criterion.',
}));
Q('m_india_claim', mcq({
  t: 3, d: 2, c: 'understanding',
  stem: 'Which of the following is commonly put forward in support of India\'s claim to a permanent seat on the Security Council?',
  opts: [
    'India has long taken part in UN peacekeeping missions and is one of the world\'s largest democracies',
    'India is the only country that has never sent troops abroad',
    'India was the first country to sign the Atlantic Charter',
    'India has the smallest population in Asia',
  ],
  sol: 'Arguments made for India include its large population and democracy, its long role in peacekeeping, its growing economy and its regular contributions to the UN. The other options are untrue.',
}));
Q('m_objection', mcq({
  t: 3, d: 3, c: 'analysis',
  stem: 'In the debate on Security Council reform, some states oppose adding any new permanent members at all. Which reason is most consistent with their position?',
  opts: [
    'They fear that more permanent seats, especially with a veto, would make the Council even less democratic',
    'They believe the Council should have no members',
    'They want the General Assembly to be abolished',
    'They think the UN should stop dealing with peace and security',
  ],
  sol: 'Opponents of new permanent seats often argue that adding privileged members would widen inequality; some prefer more elected seats instead. The other options do not describe a real position in the debate.',
}));
Q('m_g4', mcq({
  t: 3, d: 3, c: 'recall',
  stem: 'India has worked with which group of countries, each seeking a permanent seat, to press for Security Council reform?',
  opts: ['Brazil, Germany and Japan', 'Nepal, Bhutan and Sri Lanka', 'France, the UK and the USA', 'Canada, Mexico and Australia'],
  sol: 'India, Brazil, Germany and Japan (the G4) support each other\'s claims to permanent seats. France, the UK and the USA already hold permanent seats, and the other groups are not reform blocs of this kind.',
}));
Q('m_one_power', mcq({
  t: 3, d: 4, c: 'analysis',
  stem: 'After the Cold War, some observers worried that the UN could be influenced too much by a single dominant power. Which feature of the UN is most relevant to that worry?',
  opts: [
    'The largest contributor to the budget and a veto-holding member can shape what the organisation does or does not do',
    'Every member has one vote in the General Assembly',
    'The International Court of Justice sits at The Hague',
    'The UN has six official languages',
  ],
  sol: 'Budget dependence and the veto give a powerful member leverage over the UN\'s agenda. Equal voting in the Assembly works the other way, and the ICJ\'s location and the official languages are unrelated.',
}));
Q('ar_reform', ar({
  t: 3, d: 2, c: 'analysis', key: 'a',
  a: 'Many states argue that the Security Council no longer represents the world of today.',
  r: 'Its permanent members were fixed in 1945, while the UN\'s membership has since grown to include many states from Asia, Africa and Latin America.',
  sol: 'Both are true, and R explains A: the gap between the 1945 permanent five and today\'s much larger and more diverse membership is the main basis of the complaint.',
}));
Q('ar_india_tf', ar({
  t: 3, d: 3, c: 'analysis', key: 'c',
  a: 'India has served as a non-permanent member of the Security Council more than once.',
  r: 'India has held a permanent seat with a veto since 1945.',
  sol: 'A is true: India has been elected to the Council several times. R is false: India is not a permanent member and has no veto; a permanent seat is exactly what it seeks.',
}));
Q('tf_veto_reform', tf({
  t: 3, d: 2, c: 'analysis', ans: false,
  stem: 'True or false? All UN members agree that the veto power of the permanent members should be abolished immediately.',
  sol: 'Opinion is divided: many states criticise the veto, some want it limited, and the permanent members themselves oppose giving it up; changing the Charter also needs their agreement.',
}));
Q('fb_reform', fb({
  t: 3, d: 2, c: 'understanding',
  stem: 'The two broad areas of UN reform are reform of its structures and ___, and a review of the issues within its ___.',
  acc: [['processes'], ['jurisdiction']],
  sol: 'Reform covers structures and processes on one side and jurisdiction (the issues it deals with) on the other.',
}));
Q('s_reform_two', short({
  t: 3, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'What are the two kinds of reform being discussed for the United Nations?',
  model: '1. Reform of **structures and processes**, for example changing the **membership and voting** of the Security Council.\n2. A **review of jurisdiction**, that is, deciding which **issues** (such as terrorism or development) the UN should handle.',
  sol: 'Name both kinds and give an example of each.',
  scheme: [['Structures and processes with an example', 1], ['Jurisdiction with an example', 1]],
}));
Q('s_veto_for', short({
  t: 3, d: 3, c: 'analysis', marks: 2, wl: S2,
  stem: 'Give one argument for keeping the veto power and one argument against it.',
  model: '**For:** the veto keeps the **major powers inside** the UN, because they know no decision can be forced on them, so the organisation does not collapse as the League did.\n**Against:** it lets **one state block action** wanted by most members, which is **undemocratic** and can leave the Council silent in a crisis.',
  sol: 'One reasoned argument on each side.',
  scheme: [['Argument for the veto', 1], ['Argument against the veto', 1]],
}));
Q('s3_india_case', short({
  t: 3, d: 3, c: 'application', marks: 3, wl: S3,
  stem: 'State three arguments that India puts forward in support of its claim to a permanent seat in the Security Council.',
  model: '1. India is one of the **two most populous** countries and the **largest democracy**, so its inclusion would make the Council more representative.\n2. It has been one of the **biggest contributors of troops** to UN **peacekeeping** for decades.\n3. It is a **large and growing economy**, pays its UN dues regularly and has followed a policy of **peaceful dispute settlement**.',
  sol: 'Three distinct arguments: population and democracy, peacekeeping record, economic weight and conduct.',
  scheme: [['Population and democracy', 1], ['Peacekeeping record', 1], ['Economy, contributions or conduct', 1]],
}));
Q('s3_criteria', short({
  t: 3, d: 2, c: 'understanding', marks: 3, wl: S3,
  stem: 'Mention any three criteria that have been proposed for admitting new permanent members to the Security Council.',
  model: '1. Being a **major economic power** and, in some proposals, a **major military power**.\n2. Making a **substantial contribution to the UN budget**.\n3. Having a **large population**, **respecting democracy and human rights**, and making the Council **more representative** of the world\'s regions and cultures. (Any three.)',
  sol: 'Any three of the commonly proposed criteria.',
  scheme: [['First criterion', 1], ['Second criterion', 1], ['Third criterion', 1]],
}));
Q('l_reform_debate', long({
  t: 3, d: 4, c: 'evaluation', marks: 5, wl: L5,
  stem: 'Should the Security Council be expanded by adding new permanent members? Present arguments on both sides and give your reasoned view.',
  model: '**In favour:**\n1. The Council reflects **1945**, not today; regions such as **Africa and Latin America** have no permanent seat.\n2. Adding major states with large populations and economies would make its decisions **more legitimate** and easier to enforce.\n**Against:**\n3. More permanent seats, especially with a **veto**, could make the Council **slower** and more often blocked.\n4. It may create a **new privileged group** and leave smaller states with even less voice; some prefer more **elected** seats instead.\n5. **Reasoned view:** expansion is needed for **representation**, but it works best with limits on the veto and a fair regional balance (any balanced, reasoned view earns this mark).',
  sol: 'Two points for, two against and a reasoned personal conclusion; the conclusion is marked for reasoning, not for which side is chosen.',
  scheme: [['First argument for expansion', 1], ['Second argument for expansion', 1], ['First argument against', 1], ['Second argument against', 1], ['Reasoned conclusion', 1]],
}));
Q('l_india_reform', long({
  t: 3, d: 4, c: 'analysis', marks: 5, wl: L5,
  stem: 'Explain India\'s position on the reform of the United Nations and the objections that have been raised to its claim for a permanent seat.',
  model: '1. India supports a **stronger and more democratic UN** and wants the Security Council to be **more representative** of developing countries.\n2. It argues for **more members**, both permanent and non-permanent, so that the Council reflects the present world.\n3. It points to its **population, democracy, economy** and long **peacekeeping** record in support of its own claim, and works with **Brazil, Germany and Japan** for this.\n4. **Objections** raised by some states include India\'s **nuclear weapons**, its **disputes with neighbours**, and doubts about whether it can represent its whole region.\n5. Other states, including some neighbours, prefer **no new permanent seats** at all, which makes the reform hard to achieve.',
  sol: 'Three points on India\'s position and claim, two on objections; stated neutrally as the views of different states.',
  scheme: [['India\'s view of a more representative UN', 1], ['Expansion in both categories', 1], ['Grounds for India\'s claim', 1], ['Objections raised', 1], ['Opposition to new permanent seats', 1]],
}));

// ================================================================ t04 Other organisations
Q('m_imf', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Which international organisation oversees the international financial system and gives advice and loans to countries facing balance of payments problems?',
  opts: ['The International Monetary Fund', 'The World Trade Organization', 'Human Rights Watch', 'The International Atomic Energy Agency'],
  sol: 'The IMF watches over the global monetary and financial system and lends to members in payments difficulty. The WTO deals with trade rules, Human Rights Watch is a human rights NGO, and the IAEA deals with nuclear energy.',
}));
Q('m_wb', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'An imagined developing country, Nilgaon, needs a long-term loan to build rural roads and improve its schools. Which organisation is it most likely to approach?',
  opts: ['The World Bank', 'Amnesty International', 'The International Court of Justice', 'The IAEA'],
  sol: 'The World Bank gives loans and grants for development projects such as infrastructure, education and health. Amnesty is a human rights NGO, the ICJ is a court and the IAEA deals with nuclear matters.',
}));
Q('m_wto', mcq({
  t: 4, d: 2, c: 'application',
  stem: 'An imagined country, Kanakdesh, complains that another member has raised import duties on its textiles in breach of agreed trade rules. Which organisation provides the rules and the dispute process for such a complaint?',
  opts: ['The World Trade Organization', 'The International Labour Organization', 'The Trusteeship Council', 'Human Rights Watch'],
  sol: 'The WTO sets the rules of international trade and has a system for settling trade disputes between members. The other bodies deal with labour, trust territories and human rights.',
}));
Q('m_iaea', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'The International Atomic Energy Agency was set up in 1957 mainly to',
  opts: [
    'promote the peaceful use of nuclear energy and prevent its use for military purposes',
    'build nuclear weapons for the permanent members',
    'regulate world trade in textiles',
    'run elections in newly independent countries',
  ],
  sol: 'The IAEA promotes peaceful nuclear technology and, through inspections, tries to ensure it is not diverted to weapons. It does not build weapons, regulate textiles or run elections.',
}));
Q('m_amnesty', mcq({
  t: 4, d: 2, c: 'understanding',
  stem: 'Amnesty International is best described as',
  opts: [
    'a non-governmental organisation that campaigns for human rights and publishes reports on their violation',
    'a specialised agency of the UN whose decisions are binding on all governments',
    'a military alliance of democratic states',
    'a bank that lends to poor countries',
  ],
  sol: 'Amnesty is an NGO: it researches abuses, publishes reports and campaigns; it has no power to bind governments. It is not a UN agency, an alliance or a bank.',
}));
Q('m_hrw', mcq({
  t: 4, d: 3, c: 'application',
  stem: 'An NGO based in New York researches abuses such as the use of child soldiers and landmines, draws media attention to them and lobbies governments to change policy. This most closely describes the work of',
  opts: ['Human Rights Watch', 'the World Bank', 'the IMF', 'the Security Council'],
  sol: 'Human Rights Watch is an international NGO that investigates and publicises human rights abuses and campaigns for change; it helped build campaigns against landmines and the use of child soldiers. The others are inter-governmental bodies with different roles.',
}));
Q('m_bretton', mcq({
  t: 4, d: 2, c: 'recall',
  stem: 'The IMF and the World Bank were planned at a conference held in 1944 at',
  opts: ['Bretton Woods', 'San Francisco', 'Geneva', 'The Hague'],
  sol: 'Both institutions were planned at the Bretton Woods conference in 1944 and are therefore called the Bretton Woods institutions. The UN Charter was signed at San Francisco.',
}));
Q('m_imf_vote', mcq({
  t: 4, d: 3, c: 'analysis',
  stem: 'Critics argue that developing countries have less say in the IMF than their numbers suggest. Which feature of the IMF is the main basis of this criticism?',
  opts: [
    'Voting power is weighted by each member\'s financial contribution (quota), so the richest members hold a large share of votes',
    'Each member has exactly one vote',
    'Only developing countries can borrow from it',
    'It is run by NGOs',
  ],
  sol: 'Votes in the IMF follow members\' quotas, so a small number of rich countries carry a large share of the vote. One member, one vote is the General Assembly rule, and the other options are untrue.',
}));
Q('ar_wto_consensus', ar({
  t: 4, d: 3, c: 'analysis', key: 'b',
  a: 'Developing countries often complain that major economic powers have a strong influence on WTO negotiations.',
  r: 'The World Trade Organization was set up in 1995 as the successor to the GATT framework.',
  sol: 'Both are true. The complaint arises from the bargaining strength of large economies, not from the date the WTO was set up; so R, though true, does not explain A.',
}));
Q('ar_ngo', ar({
  t: 4, d: 2, c: 'analysis', key: 'a',
  a: 'Human rights NGOs such as Amnesty International can influence governments even though they have no power to enforce decisions.',
  r: 'Their reports draw public and media attention to abuses, which puts pressure on governments to act.',
  sol: 'Both are true, and R explains A: the influence of such NGOs comes from information and publicity, not from legal power.',
}));
Q('tf_ngo_un', tf({
  t: 4, d: 2, c: 'understanding', ans: false,
  stem: 'True or false? Amnesty International and Human Rights Watch are principal organs of the United Nations.',
  sol: 'Both are non-governmental organisations, independent of governments; the six principal organs are the Assembly, the Security Council, ECOSOC, the ICJ, the Secretariat and the Trusteeship Council.',
}));
Q('mt_orgs', match({
  t: 4, d: 2, c: 'understanding',
  stem: 'Match each organisation outside the six principal organs with the field it works in.',
  pairs: [
    ['International Monetary Fund', 'Global financial system and help with payments crises'],
    ['World Bank', 'Loans and grants for development projects'],
    ['World Trade Organization', 'Rules for international trade'],
    ['International Atomic Energy Agency', 'Peaceful use of nuclear energy and safeguards'],
  ],
  sol: 'IMF: finance and payments; World Bank: development; WTO: trade rules; IAEA: nuclear energy.',
}));
Q('s_imf_wb', short({
  t: 4, d: 2, c: 'analysis', marks: 2, wl: S2,
  stem: 'Distinguish between the role of the IMF and that of the World Bank.',
  model: 'The **IMF** looks after the stability of the **international financial system**, advises on economic policy and lends to countries facing **balance of payments** crises. The **World Bank** gives **loans and grants for development**, such as roads, schools, health and farming.',
  sol: 'One clear role for each, showing the contrast between financial stability and development.',
  scheme: [['Role of the IMF', 1], ['Role of the World Bank', 1]],
}));
Q('s_iaea', short({
  t: 4, d: 2, c: 'understanding', marks: 2, wl: S2,
  stem: 'Why was the International Atomic Energy Agency set up? Mention two of its functions.',
  model: 'It was set up in **1957** to promote the **peaceful use of nuclear energy**.\n1. It helps countries use nuclear technology for **power, medicine and farming**.\n2. Its **inspectors** check that nuclear facilities are **not used for weapons**.',
  sol: 'Purpose plus two functions: promotion of peaceful uses and safeguard inspections.',
  scheme: [['Promotion of peaceful use', 1], ['Inspections to prevent military use', 1]],
}));
Q('s_ngo_role', short({
  t: 4, d: 3, c: 'application', marks: 2, wl: S2,
  stem: 'An imagined state, Sarovar, detains journalists without trial. Explain two ways in which an NGO such as Amnesty International may respond.',
  model: '1. It may **investigate and publish a report** on the detentions, drawing **media and public attention** to them.\n2. It may run **campaigns and appeals**, urging people and other governments to press Sarovar to **release or fairly try** the journalists.',
  sol: 'Two NGO methods: research and reports, and campaigns or pressure; NGOs cannot enforce decisions.',
  scheme: [['Investigation and report', 1], ['Campaign or pressure', 1]],
}));
Q('s3_wto', short({
  t: 4, d: 3, c: 'analysis', marks: 3, wl: S3,
  stem: 'What is the World Trade Organization? Why do some developing countries criticise the way it works?',
  model: 'The **WTO**, set up in **1995** as the successor to **GATT**, sets the **rules for global trade** and settles trade disputes among its members.\nCriticisms:\n1. **Major economies** have more bargaining power, so rules often suit their interests.\n2. Developing countries say their concerns, such as **farm subsidies** in rich countries, are not addressed fairly.',
  sol: 'A definition with its origin, then two criticisms from developing countries.',
  scheme: [['Meaning and origin of the WTO', 1], ['First criticism', 1], ['Second criticism', 1]],
}));
Q('l_other_orgs', long({
  t: 4, d: 3, c: 'understanding', marks: 5, wl: L5,
  stem: 'Explain the main functions of any five international organisations other than the principal organs of the UN.',
  model: '1. **IMF:** oversees the **international financial system** and lends to countries in **payments crises**.\n2. **World Bank:** finances **development**: infrastructure, education, health, agriculture and environment.\n3. **WTO:** sets the **rules of world trade** and settles **trade disputes**.\n4. **IAEA:** promotes **peaceful nuclear energy** and inspects facilities to prevent military use.\n5. **Amnesty International / Human Rights Watch:** NGOs that **research, report and campaign** against human rights abuses.',
  sol: 'Five organisations, one main function each.',
  scheme: [['First organisation and function', 1], ['Second organisation and function', 1], ['Third organisation and function', 1], ['Fourth organisation and function', 1], ['Fifth organisation and function', 1]],
}));

// ================================================================ source-based items (imagined documents)
const ORIGIN = '*(An imagined document written by SOYL for practice; the school, people and events in it are not real.)*';

Q('sb_mun_vote', source({
  t: 2, d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the record of a Model UN session at Sunrise School and answer the questions that follow. ${ORIGIN}`,
  passage: '**Minutes of the Model UN Security Council, Sunrise School (imagined)**\n\nThe draft resolution asked for an immediate ceasefire in an imagined border war and for peacekeepers to be sent. Eleven delegates raised their placards in favour, two voted against and two abstained. One of the two votes against came from a delegate representing a permanent member. The chairperson announced that the resolution had not been adopted, and several delegates from the elected members protested that "the majority has been ignored". The session closed with a call for the General Assembly to discuss the crisis instead.',
  parts: [
    child('a', short({ t: 2, d: 1, c: 'understanding', marks: 1, stem: 'Why was the resolution not adopted although eleven members voted for it?', model: 'A **permanent member voted against** it, which is a **veto**.', sol: 'A negative vote by a permanent member blocks a substantive resolution.', scheme: [['Veto by a permanent member', 1]] })),
    child('b', num({ t: 2, d: 2, c: 'application', marks: 1, value: SC.needed, unit: 'votes', stem: 'How many affirmative votes would have been enough if no permanent member had voted against?', sol: `Step 1: A substantive resolution needs nine of the fifteen votes.\nStep 2: So ${SC.needed} votes would have been enough.` })),
    child('c', short({ t: [2, 3], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): The delegates of elected members said "the majority has been ignored". Give one argument supporting their complaint and one argument against it.', model: '**Supporting:** one state blocked a decision backed by **eleven of fifteen**, which looks **undemocratic**.\n**Against:** the veto keeps the **major powers committed** to the UN, since no action can be forced on them; without it they might leave, as happened with the League.', sol: 'One reasoned argument each way.', scheme: [['Argument supporting the complaint', 1], ['Argument against it', 1]] }), [
      short({ t: 2, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Why might the session call on the General Assembly to discuss the crisis? What is the limit of such a step?', model: 'The **Assembly** includes **all members** and has **no veto**, so the crisis can at least be **discussed and a view expressed**. But its resolutions are mostly **recommendations**, so it **cannot order** a ceasefire or send peacekeepers the way the Council can.', sol: 'One reason the Assembly is used and one limit of its powers.', scheme: [['Reason: all members, no veto', 1], ['Limit: mainly recommendations', 1]] }),
    ]),
  ],
}));
Q('sb_editorial', source({
  t: 3, d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the extract from the school magazine of Deodar Public School on reforming the Security Council and answer the questions that follow. ${ORIGIN}`,
  passage: '**From the editorial of an imagined school magazine, Deodar Public School**\n\nWhen the Charter was signed, the world had fifty-one member states and much of Asia and Africa was still under colonial rule. Today almost four times as many states sit in the General Assembly, yet the same five countries hold permanent seats. Our editorial team was divided. Some argued that countries with large populations, strong economies and long records in peacekeeping deserve a permanent voice. Others replied that adding more privileged seats would only enlarge an exclusive club, and that the answer lies in more elected seats and limits on the veto.',
  parts: [
    child('a', short({ t: 3, d: 1, c: 'understanding', marks: 1, stem: 'What change in UN membership does the editorial point to?', model: 'Membership has grown from **51** to almost **four times** as many states, while the **permanent five** are unchanged.', sol: 'The growth of membership against the fixed permanent seats.', scheme: [['Growth in members with unchanged permanent five', 1]] })),
    child('b', short({ t: 3, d: 2, c: 'application', marks: 1, stem: 'Name any one criterion for a permanent seat that the first group of editors suggests.', model: 'Any one: **large population**, **strong economy**, or a **long record in peacekeeping**.', sol: 'Pick a criterion stated in the passage.', scheme: [['One criterion from the passage', 1]] })),
    child('c', short({ t: 3, d: 4, c: 'evaluation', marks: 2, stem: '**Either** (i): Which of the two views in the editorial do you find more convincing? Give two reasons.', model: 'Either view is acceptable with reasons. For example, **more elected seats and veto limits**: (1) they make the Council **more representative without creating new privilege**; (2) they are more likely to win **wide support** among members than new permanent seats.', sol: 'A clear choice supported by two relevant reasons; marks for reasoning, not for the side chosen.', scheme: [['First reason for the chosen view', 1], ['Second reason for the chosen view', 1]] }), [
      short({ t: 3, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): Explain how the end of colonial rule is connected to the demand for reform of the Security Council.', model: 'After colonial rule ended, **many new states** from **Asia and Africa** joined the UN, so most members today were **not present in 1945**. They feel the permanent seats reflect the **old balance of power** and want their regions **represented**.', sol: 'Link decolonisation to the growth of membership and to the demand for representation.', scheme: [['Decolonisation added many new members', 1], ['Demand for representation of their regions', 1]] }),
    ]),
  ],
}));
Q('sb_delegate_diary', source({
  t: [4, 1], d: 3, c: 'application', origin: 'soyl-original',
  stem: `Read the diary entry of an imagined finance official, Karan, from the imagined country of Suryakund, and answer the questions that follow. ${ORIGIN}`,
  passage: '**Diary of Karan, a finance official of Suryakund (imagined)**\n\nOur reserves of foreign currency will pay for barely a month of imports. Tomorrow we meet the team from the international fund in Washington to ask for a short-term loan. They will want us to cut the budget deficit and change our exchange rate. Next week another team, from the development bank, comes to discuss a long-term loan for rural roads and village schools. My colleague grumbled that the richest members have the most votes in both institutions, so their views will decide our conditions.',
  parts: [
    child('a', short({ t: 4, d: 1, c: 'understanding', marks: 1, stem: 'Name the "international fund" from which Suryakund seeks a short-term loan.', model: 'The **International Monetary Fund (IMF)**.', sol: 'Short-term help with a payments crisis comes from the IMF.', scheme: [['IMF', 1]] })),
    child('b', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Which organisation is the "development bank" that will discuss loans for roads and schools?', model: 'The **World Bank**.', sol: 'Long-term development finance is the work of the World Bank.', scheme: [['World Bank', 1]] })),
    child('c', short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): Explain the basis of the colleague\'s complaint about voting in these institutions.', model: 'In the IMF and the World Bank, votes are **weighted by each member\'s financial contribution**, so a **few rich countries** hold a large share of the vote and can shape the **conditions** attached to loans for poorer countries.', sol: 'Explain weighted voting and its effect on borrowers.', scheme: [['Votes weighted by contribution', 1], ['Effect: rich members shape loan conditions', 1]] }), [
      short({ t: 4, d: 3, c: 'evaluation', marks: 2, stem: '**Or** (ii): Give one benefit and one possible drawback for Suryakund of accepting the IMF\'s conditions.', model: '**Benefit:** the loan helps Suryakund **pay for essential imports** and restore confidence. **Drawback:** cuts in the budget may reduce **spending on welfare**, and a changed exchange rate can **raise prices** of imports for ordinary people.', sol: 'One benefit and one drawback, each with a reason.', scheme: [['Benefit with reason', 1], ['Drawback with reason', 1]] }),
    ]),
  ],
}));
Q('sb_inspector', source({
  t: [4, 1], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the imagined news report about nuclear inspectors in the imagined country of Hiranya and answer the questions that follow. ${ORIGIN}`,
  passage: '**An imagined news report from the city of Hiranyapur**\n\nInspectors from an international agency based in Vienna arrived today to check the new nuclear power plant on the river. The government of Hiranya says the plant will only produce electricity and isotopes for its cancer hospitals. A neighbouring state has expressed fears that fuel from the plant could be used to make weapons. Officials say the inspectors will install cameras and seals, and will report to the agency\'s board. A human rights group has separately asked the government to allow villagers displaced by the plant to be heard.',
  parts: [
    child('a', short({ t: 4, d: 1, c: 'recall', marks: 1, stem: 'Name the international agency whose inspectors visited the plant.', model: 'The **International Atomic Energy Agency (IAEA)**.', sol: 'The Vienna-based agency that inspects nuclear facilities is the IAEA.', scheme: [['IAEA', 1]] })),
    child('b', short({ t: 4, d: 2, c: 'application', marks: 1, stem: 'Which two peaceful uses of nuclear energy are mentioned in the report?', model: 'Producing **electricity** and **isotopes for cancer treatment** in hospitals.', sol: 'Both uses are stated by the government in the report.', scheme: [['Electricity and medical isotopes', 1]] })),
    child('c', short({ t: [4, 1], d: 3, c: 'analysis', marks: 2, stem: '**Either** (i): How do the inspections help both Hiranya and its neighbour?', model: 'Hiranya can **prove its plant is peaceful** and keep using nuclear power, while the neighbour gains **independent assurance** that fuel is not being turned into weapons, which **reduces suspicion** and the risk of conflict.', sol: 'One gain for each state, linked to trust.', scheme: [['Benefit to Hiranya', 1], ['Benefit to the neighbour', 1]] }), [
      short({ t: 4, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): How is the role of the "human rights group" different from that of the inspecting agency?', model: 'The agency is an **inter-governmental body** whose inspectors work under agreements with states. The human rights group is an **NGO**: it has **no official power**, but it can **raise its voice**, publish reports and press the government to hear the displaced villagers.', sol: 'Contrast an inter-governmental body with an NGO and their methods.', scheme: [['Inter-governmental agency with agreed powers', 1], ['NGO using advocacy, no enforcement power', 1]] }),
    ]),
  ],
}));
Q('sb_peace_letter', source({
  t: [1, 2], d: 3, c: 'analysis', origin: 'soyl-original',
  stem: `Read the imagined letter from a retired peacekeeper, Major Anil, to his granddaughter Meera and answer the questions that follow. ${ORIGIN}`,
  passage: '**A letter from Major Anil (retired) to his granddaughter Meera (imagined)**\n\nDear Meera, you asked whether the UN really matters. In my year with a peacekeeping force, we wore blue helmets and stood between two armed groups who had agreed to stop fighting. We had no power to conquer anyone; we could only watch, report and help people return home. Soldiers from many countries served with us, sent by their own governments. Some days we felt helpless, because the Council in New York could not agree on more troops. Yet the villages we guarded had children going back to school by the end of my posting.',
  parts: [
    child('a', short({ t: 2, d: 1, c: 'understanding', marks: 1, stem: 'Which principal organ of the UN does Major Anil refer to as "the Council in New York"?', model: 'The **Security Council**.', sol: 'Decisions on peacekeeping forces are taken by the Security Council.', scheme: [['Security Council', 1]] })),
    child('b', short({ t: 1, d: 2, c: 'application', marks: 1, stem: 'What does the letter show about where UN peacekeepers come from?', model: 'They are **soldiers sent by member states**; the UN has **no army of its own**.', sol: 'The letter says soldiers from many countries were sent by their own governments.', scheme: [['Troops provided by member states', 1]] })),
    child('c', short({ t: [1, 2], d: 3, c: 'evaluation', marks: 2, stem: '**Either** (i): Using the letter, give one strength and one limitation of UN peacekeeping.', model: '**Strength:** it can **keep a ceasefire** and help normal life return, as the children went **back to school**. **Limitation:** it depends on the **Council agreeing** and on members sending troops; when they do not, peacekeepers feel **helpless**.', sol: 'One strength and one limitation, each tied to the letter.', scheme: [['Strength from the letter', 1], ['Limitation from the letter', 1]] }), [
      short({ t: 1, d: 3, c: 'analysis', marks: 2, stem: '**Or** (ii): How does the letter answer Meera\'s question, "Does the UN really matter?"', model: 'It suggests the UN **matters in practical ways**: peacekeepers **protected villages** and helped people **return home**, even though the UN **cannot force** a solution and depends on its **members\' will**.', sol: 'A balanced answer drawn from the letter: real benefits and real limits.', scheme: [['Practical benefits shown', 1], ['Limits acknowledged', 1]] }),
    ]),
  ],
}));
