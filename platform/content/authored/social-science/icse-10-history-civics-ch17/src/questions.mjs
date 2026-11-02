// ICSE 10 History & Civics, ch17 The United Nations — question bank. Every diary, newsletter, note and scenario is
// imagined and written by SOYL and labelled as imagined; no textbook text, box or exercise and no specimen or
// board-paper item is reused (D-036). No wording of the Charter or of the Universal Declaration of Human Rights is
// quoted: their ideas are paraphrased. No present office-holder is named. Facts are stable, widely taught dates,
// numbers and places, listed in the README; vote counts are computed and asserted below.
import assert from "node:assert/strict";
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child, Svg } from "../../icse-10-history-civics-ch01/src/lib.mjs";

const S2 = [25, 45];
const S3 = [40, 70];
const L10 = [120, 220];
const IMAG = "*(Imagined document written by SOYL for practice; the people and places in it are not real.)*";

// ---------------------------------------------------------------- facts used in items (asserted)
export const UN_YEAR = 1945;
export const MEMBERS = 193; // as of 2024
export const FOUNDERS = 51;
export const SC_SIZE = 15;
export const P5 = ["China", "France", "Russia", "the United Kingdom", "the United States"];
export const NONPERM = SC_SIZE - P5.length;
assert.equal(NONPERM, 10);
export const SC_PASS = 9; // affirmative votes needed
export const ICJ_JUDGES = 15;
export const ICJ_TERM = 9;
export const NONPERM_TERM = 2;
assert.equal(NONPERM / NONPERM_TERM, 5); // five non-permanent seats are filled each year
assert.equal(ICJ_JUDGES / 3, 5); // a third of the Court (five judges) is elected every three years
export const AGENCIES = [
  ["UNICEF", "United Nations Children's Fund", "New York", 1946],
  ["WHO", "World Health Organisation", "Geneva", 1948],
  ["UNESCO", "United Nations Educational, Scientific and Cultural Organisation", "Paris", 1945],
];
export const UDHR_YEAR = 1948;
assert.equal(UDHR_YEAR - UN_YEAR, 3);

/**
 * Security Council vote on a substantive (non-procedural) matter, by the rule in practice: at least nine yes votes and
 * no "no" vote from a permanent member; an abstaining or absent permanent member does not block the decision.
 */
export function scPasses({ yes, permanentNo }) {
  return yes >= SC_PASS && permanentNo === 0;
}
// Votes used in items.
export const V_A = { yes: 11, permanentNo: 1 }; // fails: veto
export const V_B = { yes: 9, permanentNo: 0, permanentAbstain: 1 }; // passes: abstention is not a veto
export const V_C = { yes: 8, permanentNo: 0 }; // fails: too few votes
export const V_D = { yes: 13, permanentNo: 0 }; // passes
assert.equal(scPasses(V_A), false);
assert.equal(scPasses(V_B), true);
assert.equal(scPasses(V_C), false);
assert.equal(scPasses(V_D), true);
// The two-thirds rule in the General Assembly for important questions (members present and voting).
export const twoThirds = (n) => Math.ceil((2 * n) / 3);
export const GA_PRESENT = 180;
assert.equal(twoThirds(GA_PRESENT), 120);

/** The six principal organs around the Charter (theme colours only, schematic). */
export function organsSvg(alt, caption) {
  const s = new Svg(760, 380);
  s.rect(280, 150, 200, 70, { rx: 14, fill: "accent", fillOpacity: 0.15, color: "accent", sw: 2 });
  s.text(380, 176, "The Charter", { size: 14, bold: true, color: "accent" });
  s.text(380, 198, "signed 1945", { size: 12, color: "accent" });
  const boxes = [
    [20, 20, "General Assembly", "all members"],
    [280, 20, "Security Council", "15 members"],
    [540, 20, "Economic and Social", "Council"],
    [20, 280, "International Court", "of Justice, The Hague"],
    [280, 280, "Secretariat", "staff of the UN"],
    [540, 280, "Trusteeship Council", "work suspended"],
  ];
  for (const [x, y, a, b] of boxes) {
    s.rect(x, y, 200, 74, { rx: 10, fill: "fill", color: "blue", sw: 1.6 });
    s.text(x + 100, y + 28, a, { size: 13, bold: true });
    s.text(x + 100, y + 52, b, { size: 12, muted: true });
    const cx = x + 100;
    const cy = y < 100 ? y + 74 : y;
    s.line(cx, cy, 380, y < 100 ? 150 : 220, { sw: 1.2, color: "muted", dash: true });
  }
  s.text(380, 368, "Schematic, drawn by SOYL", { size: 11, muted: true });
  return s.visual(alt, caption);
}

/** Bars of an imagined Security Council vote. */
export function voteSvg(alt, caption, v = V_B) {
  const s = new Svg(640, 300);
  const rows = [["Yes", v.yes, "blue"], ["No", v.permanentNo ?? 0, "red"], ["Abstain", v.permanentAbstain ?? 0, "muted"]];
  const x0 = 130;
  const unit = 30;
  rows.forEach(([label, n, col], i) => {
    const y = 40 + i * 70;
    s.text(x0 - 14, y + 20, label, { size: 13, anchor: "end" });
    s.rect(x0, y, Math.max(n * unit, 4), 40, { rx: 4, fill: col, fillOpacity: 0.35, color: col, sw: 1.4 });
    s.text(x0 + Math.max(n * unit, 4) + 12, y + 20, String(n), { size: 13, anchor: "start" });
  });
  s.line(x0 + SC_PASS * unit, 25, x0 + SC_PASS * unit, 200, { sw: 1.6, dash: true, color: "accent" });
  s.text(x0 + SC_PASS * unit, 228, "nine votes needed", { size: 12, color: "accent" });
  s.text(320, 285, "Imagined vote, drawn by SOYL", { size: 11, muted: true });
  return s.visual(alt, caption);
}

export const ORGANS_ALT = "Diagram of the six principal organs of the United Nations arranged around a central box marked The Charter, signed 1945: the General Assembly of all members, the Security Council of 15 members, the Economic and Social Council, the International Court of Justice at The Hague, the Secretariat, and the Trusteeship Council whose work is suspended";
export const VOTE_ALT = `Bar chart of an imagined Security Council vote on a substantive matter: ${V_B.yes} members vote yes, none votes no, and one permanent member abstains; a dashed line marks the nine votes needed`;

// ================================================================ t01 Objectives
Q("m_founding_day", mcq({
  t: 1, d: 1, c: "recall",
  stem: "Every year 24 October is observed as United Nations Day. What happened on that date in 1945?",
  opts: ["The United Nations formally came into existence after enough states ratified its Charter", "The Charter was first signed at San Francisco", "The League of Nations held its first meeting", "The Universal Declaration of Human Rights was adopted"],
  sol: "The Charter was signed on 26 June 1945 and came into force on 24 October 1945, now United Nations Day. The League first met in 1920, and the Declaration was adopted in 1948.",
}));
Q("m_hq_city", mcq({
  t: 1, d: 1, c: "recall",
  stem: "A Class 10 class in Kochi is writing to the main headquarters of the United Nations. In which city should the letter be addressed?",
  opts: ["New York", "Geneva", "The Hague", "Paris"],
  sol: "The headquarters of the United Nations is in New York. Geneva hosts several UN offices and the WHO, The Hague the ICJ, and Paris UNESCO.",
}));
Q("m_obj_peace", mcq({
  t: 1, d: 2, c: "understanding",
  stem: "Which of these is the first and chief objective of the United Nations named in its Charter?",
  opts: ["To maintain international peace and security", "To create a single world government", "To manage the trade of member states", "To choose the governments of new nations"],
  sol: "Maintaining international peace and security comes first among the aims. The UN is not a world government and does not run members' trade or choose their governments.",
}));
Q("m_obj_scenario", mcq({
  t: 1, d: 3, c: "application",
  stem: "Two imagined neighbouring countries, Avalor and Brenn, agree to accept UN help to share a river fairly and to run joint schools for refugee children. Which objectives of the United Nations does this serve?",
  opts: ["Friendly relations among nations and international cooperation on social problems", "Only the collection of member contributions", "Making Avalor a permanent member of the Security Council", "Ending the sovereign equality of member states"],
  sol: "Settling a shared problem and cooperating on education serve the aims of friendly relations and cooperation on economic, social and humanitarian problems. The other options are not UN objectives.",
}));
Q("ar_league_lesson", ar({
  t: 1, d: 3, c: "analysis", verdict: "both-true-explains",
  a: "The founders of the United Nations gave its Security Council the power to order sanctions and military action.",
  r: "The League of Nations had failed partly because it had no effective means to stop aggressors.",
  sol: "Both are true, and R explains A: learning from the League's failure over Manchuria and Abyssinia, the founders gave the Security Council powers to enforce its decisions.",
}));
Q("ar_world_govt", ar({
  t: 1, d: 3, c: "analysis", verdict: "A-false-R-true",
  a: "The United Nations is a world government that can overrule the laws of its member states.",
  r: "The Charter is based on the sovereign equality of all its members.",
  sol: "A is false: the UN is an organisation of sovereign states, not a world government. R is true: the Charter rests on the sovereign equality of members.",
}));
Q("s_obj_two", short({
  t: 1, d: 1, c: "recall", marks: 2, wl: S2,
  stem: "Apart from keeping peace, state two other objectives set out for the United Nations in 1945.",
  model: "1. To develop **friendly relations** among nations based on **equal rights** and self-determination of peoples.\n2. To achieve **international cooperation** in solving **economic, social, cultural and humanitarian** problems and to promote **human rights**.",
  sol: "Any two objectives other than peace.",
  scheme: [["First objective", 1], ["Second objective", 1]],
}));
Q("s_league_vs_un", short({
  t: 1, d: 3, c: "analysis", marks: 2, wl: S2,
  stem: "Give two ways in which the United Nations was designed to be stronger than the League of Nations it replaced.",
  model: "1. Its **Security Council** can order **sanctions** and **military action**, which the League could not enforce.\n2. The great powers, including the **USA**, joined from the start, and the five permanent members were given a **special role**.",
  sol: "Enforcement powers; membership of the great powers.",
  scheme: [["Enforcement powers", 1], ["Great powers included", 1]],
}));

// ================================================================ t02 General Assembly
Q("m_ga_members", mcq({
  t: 2, d: 1, c: "recall",
  stem: "Which organ of the United Nations includes every member state, each with one vote?",
  opts: ["The General Assembly", "The Security Council", "The International Court of Justice", "The Secretariat"],
  sol: "Every member sits in the General Assembly with one vote. The Security Council has 15 members, the Court 15 judges, and the Secretariat is the staff.",
}));
Q("m_ga_important", mcq({
  t: 2, d: 3, c: "application",
  stem: `In an imagined General Assembly vote on admitting a new member, ${GA_PRESENT} members are present and voting. What is the least number of yes votes needed?`,
  opts: [`${twoThirds(GA_PRESENT)}`, "91", "97", "129"],
  sol: `Admission is an important question, needing a two-thirds majority of members present and voting: two-thirds of ${GA_PRESENT} is ${twoThirds(GA_PRESENT)}. 91 would be a simple majority; 97 and 129 follow no rule.`,
}));
Q("m_ga_budget", mcq({
  t: 2, d: 2, c: "understanding",
  stem: "Which organ approves the budget of the United Nations and decides how much each member contributes?",
  opts: ["The General Assembly", "The Security Council", "The International Court of Justice", "UNESCO"],
  sol: "The General Assembly has the budgetary function: it approves the budget and apportions contributions among members.",
}));
Q("m_ga_elective", mcq({
  t: 2, d: 3, c: "application",
  stem: "Each year the General Assembly fills five seats on another organ for two-year terms. Which seats are these?",
  opts: ["Non-permanent seats on the Security Council", "Permanent seats on the Security Council", "Judgeships of the International Court of Justice by itself alone", "Headships of UNICEF, WHO and UNESCO"],
  sol: `The Assembly elects the ${NONPERM} non-permanent Council members for ${NONPERM_TERM}-year terms, five each year. Permanent seats are fixed by the Charter, and ICJ judges are elected by the Assembly and the Council together.`,
}));
Q("m_ga_sg", mcq({
  t: 2, d: 3, c: "understanding",
  stem: "How is the Secretary-General of the United Nations appointed?",
  opts: ["By the General Assembly on the recommendation of the Security Council", "By the Security Council alone", "By the International Court of Justice", "By a direct vote of the people of member states"],
  sol: "The General Assembly appoints the Secretary-General on the Security Council's recommendation, so both organs take part.",
}));
Q("tf_ga_binding", tf({
  t: 2, d: 3, c: "analysis", ans: false,
  stem: "True or false? A resolution passed by the General Assembly on a world problem is binding on every member state.",
  sol: "False. General Assembly resolutions are mostly recommendations that carry moral and political weight; the Security Council's decisions on peace and security are the ones members are bound to carry out.",
}));
Q("ar_ga_parliament", ar({
  t: 2, d: 3, c: "analysis", verdict: "both-true-explains",
  a: "The General Assembly is often described as a world forum or parliament of nations.",
  r: "Every member state, large or small, is represented in it with an equal vote and may raise any matter within the Charter.",
  sol: "Both are true, and R explains A: universal membership, equal votes and the freedom to discuss any matter make the Assembly a forum where every nation is heard.",
}));
Q("s_ga_comp", short({
  t: 2, d: 1, c: "recall", marks: 2, wl: S2,
  stem: "Describe how the General Assembly is made up and how it takes a decision on an important question.",
  model: "1. **All member states** are members; each may send up to **five representatives** but has **one vote**.\n2. Decisions on **important questions**, such as admitting members or the budget, need a **two-thirds majority** of members present and voting.",
  sol: "Composition and the two-thirds rule.",
  scheme: [["Composition", 1], ["Two-thirds majority on important questions", 1]],
}));
Q("s3_ga_functions", short({
  t: 2, d: 2, c: "understanding", marks: 3, wl: S3,
  stem: "Explain the deliberative, budgetary and constituent functions of the General Assembly, one point each.",
  model: "1. **Deliberative:** it discusses any question within the scope of the Charter, such as peace, development or human rights, and makes **recommendations**.\n2. **Budgetary:** it **approves the budget** and fixes each member's **contribution**.\n3. **Constituent:** it can propose **amendments to the Charter**, which take effect when ratified by two-thirds of members, including all permanent members of the Security Council.",
  sol: "One point for each function.",
  scheme: [["Deliberative", 1], ["Budgetary", 1], ["Constituent", 1]],
}));
Q("l_ga_full", long({
  t: 2, d: 3, c: "analysis", marks: 10, wl: L10,
  stem: "With reference to the General Assembly, answer the following.\n\n(i) Describe its composition and voting. **[3]**\n(ii) Explain its electoral functions. **[3]**\n(iii) Why is it said that small nations have a real voice in the General Assembly? Give four reasons. **[4]**",
  model: "(i) **Every member state** belongs to the General Assembly. Each may send up to **five representatives**, but each state has **one vote**. Ordinary questions are decided by a **simple majority**; **important questions** need a **two-thirds majority** of members present and voting.\n\n(ii) It elects the **ten non-permanent** members of the Security Council and the members of the **Economic and Social Council**. With the Security Council it elects the **judges** of the International Court of Justice, and on the Council's recommendation it **admits new members** and **appoints the Secretary-General**.\n\n(iii) 1. Every state has an **equal vote**, whatever its size or power.\n2. There is **no veto** in the Assembly.\n3. Small states together form a **majority** and can pass resolutions.\n4. Any member may **raise any issue** within the Charter, so its concerns reach the whole world.",
  sol: "Composition and voting; elections; voice of small nations.",
  scheme: [["(i) Composition", 2], ["(i) Voting rules", 1], ["(ii) Non-permanent members and ECOSOC", 1], ["(ii) ICJ judges, admission, Secretary-General", 2], ["(iii) Four reasons, one each", 4]],
}));

// ================================================================ t03 Security Council
Q("m_sc_size", mcq({
  t: 3, d: 1, c: "recall",
  stem: "How many members make up the Security Council at present?",
  opts: [`${SC_SIZE}`, "5", "11", "193"],
  sol: `The Council has ${SC_SIZE} members: five permanent and ten non-permanent. It had 11 members until it was enlarged in 1965; 193 is the whole membership of the UN.`,
}));
Q("m_sc_p5", mcq({
  t: 3, d: 1, c: "recall",
  stem: "Which group lists exactly the five permanent members of the Security Council?",
  opts: ["China, France, Russia, the United Kingdom and the United States", "China, India, Japan, the United Kingdom and the United States", "France, Germany, Russia, the United Kingdom and the United States", "Brazil, China, France, Russia and the United States"],
  sol: "The five permanent members are China, France, Russia, the United Kingdom and the United States. India, Japan, Germany and Brazil are not permanent members.",
}));
Q("m_sc_term", mcq({
  t: 3, d: 2, c: "recall",
  stem: "For how long does a non-permanent member serve on the Security Council?",
  opts: ["Two years", "One year", "Five years", "Nine years"],
  sol: `Non-permanent members are elected by the General Assembly for ${NONPERM_TERM}-year terms; five seats fall vacant each year. Nine years is an ICJ judge's term.`,
}));
Q("m_veto_meaning", mcq({
  t: 3, d: 2, c: "understanding",
  stem: "What does the veto power of a permanent member of the Security Council allow it to do?",
  opts: ["Block a decision on a substantive matter by voting against it", "Expel any member from the UN on its own", "Overrule a judgment of the International Court of Justice", "Pass a resolution without any other votes"],
  sol: "A negative vote by any permanent member defeats a substantive decision, even if nine or more members vote for it. The veto does not let a member expel others, overrule the Court or pass resolutions alone.",
}));
Q("m_vote_veto", mcq({
  t: 3, d: 3, c: "application",
  stem: `In an imagined Security Council vote on sending peacekeepers, ${V_A.yes} members vote yes and one permanent member votes no. What happens?`,
  opts: ["The resolution fails because a permanent member has voted against it", "The resolution passes because more than nine members voted yes", "The matter goes automatically to the International Court of Justice", "The General Assembly must decide within one day"],
  sol: `Even with ${V_A.yes} yes votes, a "no" from a permanent member is a veto on a substantive matter, so the resolution fails.`,
}));
Q("m_vote_abstain", mcq({
  t: 3, d: 3, c: "application",
  stem: `In another imagined vote on sanctions, ${V_B.yes} members vote yes, none votes no, and one permanent member abstains. What happens?`,
  opts: ["The resolution passes, because by practice an abstention is not treated as a veto", "The resolution fails, because every permanent member must vote yes", "The resolution fails, because ten votes are needed", "The vote must be repeated after one month"],
  sol: `By long practice an abstaining permanent member does not block a decision. With ${V_B.yes} yes votes and no veto, the resolution passes.`,
}));
Q("m_vote_short", mcq({
  t: 3, d: 3, c: "application",
  stem: `An imagined resolution on a ceasefire gets ${V_C.yes} yes votes, including all five permanent members, and the rest abstain. What is the result?`,
  opts: ["It fails, because at least nine yes votes are needed", "It passes, because all permanent members agreed", "It passes, because no member voted no", "It fails, because abstentions count as vetoes"],
  sol: `A substantive decision needs at least ${SC_PASS} affirmative votes; ${V_C.yes} is not enough, even with all permanent members in favour.`,
}));
Q("m_sc_sanctions", mcq({
  t: 3, d: 3, c: "application",
  stem: "An imagined state, Kordia, invades its neighbour and ignores calls to withdraw. Which UN organ can decide on binding economic sanctions against Kordia?",
  opts: ["The Security Council", "The General Assembly", "UNESCO", "The International Court of Justice"],
  sol: "Only the Security Council can take decisions on sanctions and military action that members must carry out. The Assembly can recommend, UNESCO works in education and culture, and the Court decides legal disputes.",
}));
Q("ar_sc_continuous", ar({
  t: 3, d: 3, c: "analysis", verdict: "both-true-explains",
  a: "Every member of the Security Council must keep a representative at UN headquarters at all times.",
  r: "The Council must be able to meet at short notice whenever peace is threatened.",
  sol: "Both are true, and R explains A: because a crisis can arise at any moment, the Council is organised to function continuously.",
}));
Q("ar_veto_abstain", ar({
  t: 3, d: 4, c: "analysis", verdict: "A-true-R-false",
  a: "A substantive resolution can pass the Security Council even if one permanent member abstains.",
  r: "Every permanent member must vote yes for any decision of the Council to pass.",
  sol: "A is true: by practice an abstention is not a veto. R is false: what blocks a decision is a negative vote by a permanent member, not the lack of a yes vote.",
}));
Q("tf_sc_reelect", tf({
  t: 3, d: 3, c: "recall", ans: false,
  stem: "True or false? A non-permanent member of the Security Council may be re-elected straight away for the next two-year term.",
  sol: "False. A retiring non-permanent member is not eligible for immediate re-election.",
}));
Q("s_veto_two", short({
  t: 3, d: 3, c: "analysis", marks: 2, wl: S2,
  stem: "Explain the term veto and state one criticism made of it.",
  model: "**Veto** is the power of each **permanent member** to **block** a substantive decision by voting against it, even if nine members support it. **Criticism:** it lets one great power **stop action** on a crisis, which can leave the Council **paralysed**.",
  sol: "Meaning; one criticism.",
  scheme: [["Meaning of veto", 1], ["One criticism", 1]],
}));
Q("s_sc_comp", short({
  t: 3, d: 1, c: "recall", marks: 2, wl: S2,
  stem: "Distinguish between the permanent and non-permanent members of the Security Council.",
  model: "1. The **five permanent members** (China, France, Russia, the UK and the USA) hold their seats **permanently** and each has the **veto**.\n2. The **ten non-permanent members** are **elected** by the General Assembly for **two years** and have **no veto**.",
  sol: "Permanent: five, permanent seats, veto. Non-permanent: ten, elected for two years, no veto.",
  scheme: [["Permanent members", 1], ["Non-permanent members", 1]],
}));
Q("s_sc_peace_two", short({
  t: 3, d: 2, c: "understanding", marks: 2, wl: S2,
  stem: "Mention two steps the Security Council can take when it finds a threat to international peace.",
  model: "1. It can call on the parties to settle the dispute **peacefully** and recommend terms or send a **peacekeeping** force with their consent.\n2. It can order **economic sanctions** or, if they fail, **military action** by member states.",
  sol: "Any two steps.",
  scheme: [["First step", 1], ["Second step", 1]],
}));
Q("s3_vote_explain", short({
  t: 3, d: 3, c: "application", marks: 3, wl: S3,
  stem: `Study the imagined vote shown (${V_B.yes} yes, no "no" votes, one permanent member abstaining). Did the resolution pass? Explain the voting rule you used.`,
  model: `Yes, it **passed**. On a **substantive** matter the Council needs at least **nine affirmative votes** and **no negative vote** from a permanent member. Here there were **${V_B.yes} yes** votes and no veto; by **long practice** an **abstaining** permanent member is **not** counted as voting against, so the abstention did not block it.`,
  sol: "Decision plus the rule.",
  scheme: [["Passed", 1], ["Nine votes rule", 1], ["Abstention is not a veto", 1]],
  assets: [voteSvg(VOTE_ALT, "Imagined vote, drawn by SOYL.")],
}));
Q("l_sc_full", long({
  t: 3, d: 3, c: "understanding", marks: 10, wl: L10,
  stem: "With reference to the Security Council, answer the following.\n\n(i) Describe its composition. **[3]**\n(ii) How are decisions taken on procedural and on substantive matters? **[3]**\n(iii) Explain four functions of the Security Council in maintaining peace. **[4]**",
  model: "(i) The Council has **15 members**. The **permanent** seats, held by **China, France, Russia, the United Kingdom and the United States**, number **five**. **Ten** are **non-permanent**, elected by the General Assembly for **two years**, five each year, and not eligible for immediate re-election.\n\n(ii) Each member has **one vote**. **Procedural** matters need **nine** votes of any members. **Substantive** matters need **nine** votes including the **concurring votes** of the permanent members, so a **no** by any one of them is a **veto**; by practice an **abstention** does not block a decision.\n\n(iii) 1. It **investigates** any dispute that may threaten peace.\n2. It **recommends** peaceful methods of settlement.\n3. It can order **economic sanctions** and, if needed, **military action**.\n4. It sends **peacekeeping** missions and recommends the **admission** of members and the **Secretary-General**.",
  sol: "Composition; voting; four functions.",
  scheme: [["(i) Fifteen, five permanent named", 2], ["(i) Ten non-permanent, two years", 1], ["(ii) Procedural nine votes", 1], ["(ii) Substantive rule and veto", 2], ["(iii) Four functions, one each", 4]],
}));
Q("l_veto_debate", long({
  t: 3, d: 4, c: "evaluation", marks: 10, wl: L10,
  stem: "Answer the following about the veto in the Security Council.\n\n(i) Which members hold the veto, and when can it be used? **[3]**\n(ii) Give three arguments made in favour of the veto. **[3]**\n(iii) Give four arguments made against the veto, and suggest one reform that has been discussed. **[4]**",
  model: "(i) The **five permanent members**, China, France, Russia, the United Kingdom and the United States, hold the veto. It applies to **substantive** (non-procedural) decisions: a **negative vote** by any one of them defeats a resolution even if nine or more members support it.\n\n(ii) 1. It keeps the **great powers** inside the UN, which the League had failed to do.\n2. It prevents the Council from taking **military action** against a great power, which could start a **world war**.\n3. Decisions backed by all the great powers are more likely to be **carried out**.\n\n(iii) 1. It is **undemocratic**: one state can block the will of the rest.\n2. It has **paralysed** the Council in many crises.\n3. Permanent members may use it to protect **themselves or their allies**.\n4. The five reflect the world of **1945**, not of today. **Reform discussed:** adding new permanent members or **limiting** the veto in cases of mass atrocities.",
  sol: "Holders and use; arguments for; arguments against and a reform.",
  scheme: [["(i) Five holders", 2], ["(i) Substantive matters only", 1], ["(ii) Three arguments for", 3], ["(iii) Three arguments against", 3], ["(iii) A reform", 1]],
}));

// ================================================================ t04 International Court of Justice
Q("m_icj_seat", mcq({
  t: 4, d: 1, c: "recall",
  stem: "The principal judicial organ of the United Nations sits in the Peace Palace in which city?",
  opts: ["The Hague", "New York", "Geneva", "Vienna"],
  sol: "The International Court of Justice sits at The Hague in the Netherlands; it is the only principal organ not based in New York.",
}));
Q("m_icj_nationality", mcq({
  t: 4, d: 3, c: "application",
  stem: "Two candidates from the same imagined country, Merovia, are both popular in an ICJ election. What does the Court's rule say?",
  opts: ["No two judges of the Court may be nationals of the same state, so only one can sit", "Both may be elected if they win a majority", "Merovia must choose one by a national vote", "Both may sit but only one may vote"],
  sol: "The Court may not have two judges of the same nationality at the same time, so at most one candidate from Merovia can be a judge.",
}));
Q("m_icj_election", mcq({
  t: 4, d: 3, c: "understanding",
  stem: "Which bodies elect the judges of the International Court of Justice?",
  opts: ["The General Assembly and the Security Council, voting separately", "The Security Council alone", "The General Assembly alone", "The governments of the five permanent members"],
  sol: "A candidate must win an absolute majority in both the General Assembly and the Security Council, voting independently.",
}));
Q("m_icj_case", mcq({
  t: 4, d: 3, c: "application",
  stem: "Two imagined states, Ostra and Valen, both accept the Court's jurisdiction in a dispute over fishing rights in a shared bay. Which kind of jurisdiction will the ICJ use?",
  opts: ["Contentious jurisdiction, deciding a legal dispute between states", "Advisory jurisdiction, giving an opinion to the General Assembly", "Criminal jurisdiction over the fishermen", "Appellate jurisdiction over a national court"],
  sol: "A legal dispute between states that accept the Court's jurisdiction falls under its contentious jurisdiction. The ICJ does not try individuals or hear appeals from national courts.",
}));
Q("ar_icj_advisory", ar({
  t: 4, d: 3, c: "analysis", verdict: "both-true-not-explains",
  a: "The International Court of Justice can give advisory opinions on legal questions.",
  r: "The judges of the International Court of Justice are elected for nine years.",
  sol: "Both are true, but R does not explain A. Advisory opinions are given because the Charter lets the General Assembly, the Security Council and authorised agencies ask for them; the length of judges' terms is unrelated.",
}));
Q("tf_icj_individuals", tf({
  t: 4, d: 3, c: "application", ans: false,
  stem: "True or false? An imagined trader from Merovia, unhappy with a foreign government's customs seizure, can file a case against that government directly in the International Court of Justice.",
  sol: "False. Only states can be parties in contentious cases before the ICJ; individuals cannot bring cases there.",
}));
Q("s_icj_comp", short({
  t: 4, d: 2, c: "recall", marks: 2, wl: S2,
  stem: "State the number of judges of the ICJ, their term, and how many are elected at a time.",
  model: `The Court has **${ICJ_JUDGES} judges**, elected for **${ICJ_TERM} years** and eligible for re-election. To keep continuity, **one-third** (five judges) is elected **every three years**.`,
  sol: "Fifteen; nine years; a third every three years.",
  scheme: [["Fifteen judges, nine years", 1], ["One-third every three years", 1]],
}));
Q("s_icj_functions", short({
  t: 4, d: 2, c: "understanding", marks: 2, wl: S2,
  stem: "Explain the two main functions of the International Court of Justice.",
  model: "1. **Contentious jurisdiction:** it decides **legal disputes between states** that accept its jurisdiction, and its judgment is **binding** on them.\n2. **Advisory jurisdiction:** it gives **advisory opinions** on legal questions referred by the **General Assembly**, the **Security Council** or authorised agencies.",
  sol: "Contentious and advisory.",
  scheme: [["Contentious", 1], ["Advisory", 1]],
}));
Q("s3_icj_qual", short({
  t: 4, d: 3, c: "understanding", marks: 3, wl: S3,
  stem: "What qualities and rules help keep the judges of the ICJ independent and representative of the world? Give three points.",
  model: "1. Judges must be persons of **high moral character** qualified for the **highest judicial offices** or recognised experts in **international law**.\n2. **No two** judges may be of the **same nationality**, and the Court as a whole should represent the world's **main legal systems**.\n3. They serve fixed **nine-year terms** and cannot hold any **political or administrative** office while on the Court.",
  sol: "Three points on independence and representation.",
  scheme: [["Qualifications", 1], ["Nationality and legal systems", 1], ["Fixed term, no other office", 1]],
}));
Q("l_icj_full", long({
  t: 4, d: 3, c: "understanding", marks: 10, wl: L10,
  stem: "With reference to the International Court of Justice, answer the following.\n\n(i) State where it sits and how its judges are chosen. **[3]**\n(ii) What happens when two states bring a dispute before it? **[3]**\n(iii) Explain four ways in which the Court helps the United Nations maintain peace. **[4]**",
  model: "(i) The Court sits in the **Peace Palace** at **The Hague**. Its **15 judges** are elected by an **absolute majority** in **both** the General Assembly and the Security Council, voting separately, for **nine-year** terms; no two may be of the **same nationality**.\n\n(ii) Under its **contentious jurisdiction**, the states that **accept** its jurisdiction present their case. The Court applies **international law**, decides by a **majority** of judges, and its judgment is **final** and **binding** on the parties.\n\n(iii) 1. It offers a **peaceful, legal** way to settle disputes instead of war.\n2. Its **advisory opinions** guide UN organs on legal questions.\n3. Its rulings help develop and clarify **international law**.\n4. If a party does not obey a judgment, the other may turn to the **Security Council** for action.",
  sol: "Seat and election; procedure; contribution to peace.",
  scheme: [["(i) Seat", 1], ["(i) Election and terms", 2], ["(ii) Contentious procedure and binding judgment", 3], ["(iii) Four ways, one each", 4]],
}));

// ================================================================ t05 Agencies
Q("m_unicef_hq", mcq({
  t: 5, d: 1, c: "recall",
  stem: "Where are the headquarters of the United Nations Children's Fund (UNICEF)?",
  opts: ["New York", "Geneva", "Paris", "Rome"],
  sol: "UNICEF has its headquarters in New York. The WHO is in Geneva and UNESCO in Paris.",
}));
Q("m_agency_heritage", mcq({
  t: 5, d: 2, c: "application",
  stem: "An imagined state government wants an old stepwell and its carvings to be recognised on the world list of heritage sites. Which agency keeps that list?",
  opts: ["UNESCO", "WHO", "UNICEF", "The Security Council"],
  sol: "UNESCO maintains the World Heritage List and works to protect cultural and natural sites.",
}));
Q("m_agency_vaccine", mcq({
  t: 5, d: 2, c: "application",
  stem: "A village health worker runs a drive to vaccinate infants and supply clean water and nutrition packets to mothers. Which two agencies most directly support such work?",
  opts: ["UNICEF and the WHO", "UNESCO and the ICJ", "The Security Council and UNESCO", "The ICJ and UNICEF"],
  sol: "UNICEF works for children's health, nutrition and clean water, and the WHO for immunisation and disease control. UNESCO, the ICJ and the Security Council have other roles.",
}));
Q("m_agency_literacy", mcq({
  t: 5, d: 3, c: "application",
  stem: "An imagined programme trains teachers, sets up libraries in remote towns and supports science exchanges between universities. Its work falls most clearly under which agency?",
  opts: ["UNESCO", "WHO", "UNICEF", "The General Assembly"],
  sol: "Education, science and culture are UNESCO's fields. The WHO deals with health, UNICEF with children, and the General Assembly is a principal organ, not an agency.",
}));
Q("mt_agency_hq", match({
  t: 5, d: 1, c: "recall", marks: 3,
  stem: "Match each UN agency or organ with the city where it has its headquarters or seat.",
  pairs: [
    ["UNICEF", "New York"],
    ["World Health Organisation", "Geneva"],
    ["UNESCO", "Paris"],
    ["International Court of Justice", "The Hague"],
  ],
  sol: "UNICEF: New York; WHO: Geneva; UNESCO: Paris; ICJ: The Hague.",
  scheme: [["Four correct pairs (3 marks; deduct 1 for each error)", 3]],
}));
Q("fb_who_day", fb({
  t: 5, d: 2, c: "recall",
  stem: "World Health Day is marked on 7 April, the date in 1948 on which the constitution of the ___ came into force.",
  acc: [["World Health Organisation", "WHO", "World Health Organization"]],
  sol: "The constitution of the World Health Organisation came into force on 7 April 1948, now World Health Day.",
}));
Q("s_unicef_two", short({
  t: 5, d: 1, c: "recall", marks: 2, wl: S2,
  stem: "Name the headquarters of UNICEF and give two of its functions.",
  model: "UNICEF is headquartered in **New York**. It works for **child health** through immunisation, nutrition and clean **water**, and gives **emergency relief** and support for **education** to children in need.",
  sol: "Headquarters plus two functions.",
  scheme: [["Headquarters", 1], ["Two functions", 1]],
}));
Q("s_who_two", short({
  t: 5, d: 1, c: "recall", marks: 2, wl: S2,
  stem: "Name the headquarters of the WHO and state two of its functions.",
  model: "The WHO is headquartered in **Geneva**. It sets **international health standards** and leads the **control of epidemic diseases**, for example through **immunisation** campaigns and help to national **health systems**.",
  sol: "Headquarters plus two functions.",
  scheme: [["Headquarters", 1], ["Two functions", 1]],
}));
Q("s_unesco_two", short({
  t: 5, d: 1, c: "recall", marks: 2, wl: S2,
  stem: "Name the headquarters of UNESCO and give two of its functions.",
  model: "UNESCO is headquartered in **Paris**. It promotes **education** and **literacy**, encourages **scientific** cooperation, and protects **culture** and **heritage**, for example through the World Heritage List.",
  sol: "Headquarters plus two functions.",
  scheme: [["Headquarters", 1], ["Two functions", 1]],
}));
Q("s3_agency_choose", short({
  t: 5, d: 3, c: "application", marks: 3, wl: S3,
  stem: "For each imagined request, name the agency best suited to help and give a reason: (a) a district fighting an outbreak of a fever; (b) a flood-hit town where children lack food; (c) a town restoring an old temple complex.",
  model: "(a) The **WHO**, because it leads the **control of epidemic diseases** and supports health systems.\n(b) **UNICEF**, because it gives **emergency relief**, **nutrition** and clean water to **children**.\n(c) **UNESCO**, because it protects **cultural heritage** and keeps the World Heritage List.",
  sol: "One agency and reason for each.",
  scheme: [["(a) WHO with reason", 1], ["(b) UNICEF with reason", 1], ["(c) UNESCO with reason", 1]],
}));
Q("l_agencies_full", long({
  t: 5, d: 3, c: "application", marks: 10, wl: L10,
  stem: "With reference to the specialised work of the United Nations, answer the following.\n\n(i) State the headquarters and three functions of UNICEF. **[3]**\n(ii) State the headquarters and three functions of the WHO. **[3]**\n(iii) State the headquarters of UNESCO and explain three of its functions; then say how its work helps peace. **[4]**",
  model: "(i) UNICEF, set up in **1946**, has its headquarters in **New York**. It works for **child health** through immunisation and **nutrition** for infants and mothers; it supplies **clean water** and sanitation in poor areas; and it gives **emergency relief** and support for **education** to children caught in wars and disasters.\n\n(ii) The WHO, whose constitution came into force in **1948**, has its headquarters in **Geneva**. It sets **international health standards** for medicines and food; it leads the **control of epidemics** and organises immunisation drives; and it helps countries build **health systems**, train health workers and carry out **research**.\n\n(iii) UNESCO has its headquarters in **Paris**. It promotes **education and literacy**, especially for adults and girls; it encourages **scientific** cooperation between countries; and it protects **culture and heritage**, including sites on the World Heritage List. It helps **peace** because it builds **understanding** among peoples through education, shared knowledge and the exchange of ideas.",
  sol: "Headquarters and functions of each agency.",
  scheme: [["(i) UNICEF headquarters and functions", 3], ["(ii) WHO headquarters and functions", 3], ["(iii) UNESCO headquarters and functions", 3], ["(iii) Link to peace", 1]],
}));

// ================================================================ t06 UDHR
Q("m_udhr_meaning", mcq({
  t: 6, d: 2, c: "understanding",
  stem: "Which description best fits the Universal Declaration of Human Rights?",
  opts: ["A common standard of basic rights and freedoms that every person should enjoy, adopted by the General Assembly", "A treaty that lets the ICJ punish any government that breaks it", "A list of rights that apply only to citizens of permanent members", "A law passed by the Security Council for wartime only"],
  sol: "The Declaration sets out basic rights and freedoms as a common standard for all peoples and nations. It is a declaration of the General Assembly, not an enforceable treaty or a Security Council law.",
}));
Q("ar_udhr_binding", ar({
  t: 6, d: 3, c: "analysis", verdict: "both-true-not-explains",
  a: "The Universal Declaration of Human Rights has influenced the constitutions and laws of many countries.",
  r: "The Declaration was adopted by the General Assembly in Paris in 1948.",
  sol: "Both are true, but R does not explain A. Its influence comes from the respect it commands as a common standard of rights, not from the place or year of its adoption.",
}));
Q("s_udhr_meaning", short({
  t: 6, d: 2, c: "understanding", marks: 2, wl: S2,
  stem: "What is meant by the Universal Declaration of Human Rights, and why is it called universal?",
  model: "It is a statement adopted by the **General Assembly** on **10 December 1948** listing the basic **rights and freedoms** every person should enjoy. It is called **universal** because it applies to **all people everywhere**, without distinction of race, sex, religion or nation.",
  sol: "Meaning and why universal.",
  scheme: [["Meaning", 1], ["Why universal", 1]],
}));
Q("s3_udhr_examples", short({
  t: 6, d: 3, c: "application", marks: 3, wl: S3,
  stem: "Give three examples of rights included in the spirit of the Universal Declaration, and link each to a situation in an imagined school or town.",
  model: "1. **Right to education:** a town opens a free school so that no child is turned away.\n2. **Freedom of expression:** students may publish their views in the school magazine.\n3. **Equality before the law:** a court hears a worker's complaint in the same way as a rich trader's.",
  sol: "Three rights with situations.",
  scheme: [["First right with situation", 1], ["Second right with situation", 1], ["Third right with situation", 1]],
}));
Q("l_udhr_rights", long({
  t: [6, 1], d: 4, c: "evaluation", marks: 10, wl: L10,
  stem: "With reference to human rights and the United Nations, answer the following.\n\n(i) When and by which organ was the Universal Declaration of Human Rights adopted? What does it set out? **[3]**\n(ii) How is the promotion of human rights linked to the objectives of the United Nations? **[3]**\n(iii) The Declaration is not a binding treaty. Evaluate its importance in four points. **[4]**",
  model: "(i) It was adopted by the **General Assembly** on **10 December 1948** in **Paris**. It sets out the basic **civil, political, economic, social and cultural rights** and freedoms that every person should enjoy, as a **common standard** for all peoples and nations.\n\n(ii) Promoting **respect for human rights** without distinction is one of the **objectives** of the Charter. The founders believed that the denial of rights before and during the war had helped cause **conflict**, so protecting rights supports **peace** and **friendly relations**.\n\n(iii) 1. It gave the world its first **common list** of rights.\n2. It has **inspired** many national **constitutions** and laws, including chapters of fundamental rights.\n3. Later **treaties** on civil, political, economic and social rights built on it.\n4. It gives people and groups a **moral standard** for judging governments, though enforcement depends on states.",
  sol: "Adoption and content; link to objectives; evaluation.",
  scheme: [["(i) Date and organ", 1], ["(i) What it sets out", 2], ["(ii) Link to objectives and peace", 3], ["(iii) Four points of importance", 4]],
}));

// ================================================================ cross-topic
Q("ord_un_events", ord({
  t: [1, 5, 6], d: 2, c: "understanding", marks: 1,
  stem: "Put these milestones of the United Nations system in the order in which they happened.",
  items: [
    "The Charter is signed at San Francisco",
    "The Charter comes into force",
    "UNICEF is set up as an emergency fund for children",
    "The World Health Organisation's constitution comes into force",
    "The Universal Declaration of Human Rights is adopted",
  ],
  sol: "June 1945, October 1945, December 1946, April 1948, December 1948.",
}));
Q("m_organ_pick", mcq({
  t: [2, 3, 4], d: 3, c: "application",
  stem: "Match the need to the organ: an imagined state wants a legal ruling on a border treaty with its neighbour. Which organ should it approach?",
  opts: ["The International Court of Justice", "The General Assembly", "The Security Council", "UNICEF"],
  sol: "A legal ruling on a treaty dispute between states is a matter for the International Court of Justice. The Assembly and the Council are political organs, and UNICEF works for children.",
}));
Q("m_organs_six", mcq({
  t: [2, 3, 4], d: 2, c: "understanding",
  stem: "Which body in this list is NOT one of the six principal organs of the United Nations?",
  opts: ["UNESCO", "The Secretariat", "The Economic and Social Council", "The International Court of Justice"],
  sol: "UNESCO is a specialised agency. The six principal organs are the General Assembly, the Security Council, the Economic and Social Council, the Trusteeship Council, the International Court of Justice and the Secretariat.",
}));
Q("l_organs_picture", long({
  t: [2, 3, 4], d: 3, c: "analysis", marks: 10, wl: L10,
  stem: "Study the diagram of the principal organs of the United Nations and answer the following.\n\n(i) Which organ includes every member, and which has fifteen members? Give one difference in their powers. **[3]**\n(ii) Which organ is shown away from New York, where does it sit, and what does it do? **[3]**\n(iii) Show how three organs might work together in an imagined crisis where one state invades another. **[4]**",
  model: "(i) The **General Assembly** includes **every member**; the **Security Council** has **15**. The Assembly mostly **recommends**, while the Council takes **decisions** on peace and security that members must carry out, and its permanent members have a **veto**.\n\n(ii) The **International Court of Justice** sits at **The Hague**. It decides **legal disputes between states** that accept its jurisdiction and gives **advisory opinions** to UN organs.\n\n(iii) 1. The **Security Council** meets at once, calls for a **ceasefire** and may order **sanctions** or a **peacekeeping** force.\n2. If the Council is blocked by a **veto**, the **General Assembly** may discuss the crisis and **recommend** action.\n3. The **International Court of Justice** may decide the **legal dispute** over the border if both states accept its jurisdiction.\n4. The **Secretariat** organises the missions and reports to the organs.",
  sol: "Read the diagram; contrast powers; show cooperation.",
  scheme: [["(i) Identify the two organs", 1], ["(i) One difference", 2], ["(ii) ICJ, The Hague, functions", 3], ["(iii) Cooperation of organs", 4]],
  assets: [organsSvg(ORGANS_ALT, "Schematic diagram drawn by SOYL; positions are for clarity only.")],
}));

Q("m_admit_steps", mcq({
  t: [2, 3], d: 3, c: "application",
  stem: "An imagined newly independent island state, Lumara, applies to join the United Nations. Which route must its application follow?",
  opts: ["The Security Council recommends admission, then the General Assembly decides by a two-thirds majority", "The General Assembly alone admits it by a simple majority", "The International Court of Justice examines and admits it", "The Secretary-General admits it after a visit"],
  sol: "Admission needs a recommendation of the Security Council (where a permanent member's veto applies) followed by a two-thirds vote of the General Assembly.",
}));
Q("m_icj_refuse", mcq({
  t: [3, 4], d: 4, c: "application",
  stem: "In an imagined case, the ICJ rules for Ostra in a fishing dispute, but Valen refuses to obey the judgment. What can Ostra do under the Charter?",
  opts: ["Turn to the Security Council, which may decide on measures to give effect to the judgment", "Appeal to a higher world court", "Ask UNESCO to enforce the judgment", "Nothing, since ICJ judgments are only advice"],
  sol: "ICJ judgments in contentious cases are binding and final, with no appeal; if a party does not comply, the other may go to the Security Council. UNESCO has no such role.",
}));
Q("m_ga_forum", mcq({
  t: 2, d: 3, c: "analysis",
  stem: "A small imagined coastal state, not on the Security Council, wants to raise the danger of rising seas before every nation and win wide support for a resolution. Which organ best suits this aim, and why?",
  opts: ["The General Assembly, because all members sit there with equal votes and any matter within the Charter can be discussed", "The Security Council, because it is the largest organ", "The International Court of Justice, because it makes laws for states", "UNICEF, because it decides world policy on climate"],
  sol: "The General Assembly is the world forum: universal membership, equal votes and wide powers of discussion. The Security Council has only fifteen members, the ICJ decides legal disputes, and UNICEF works for children.",
}));
Q("m_veto_effect", mcq({
  t: 3, d: 4, c: "analysis",
  stem: "Critics say the Security Council has sometimes stood still during serious conflicts even when most of its members wanted action. Which feature best explains this?",
  opts: ["The veto, by which one permanent member can block a substantive decision", "The rule that the Council has fifteen members", "The fact that the Council meets in New York", "The two-year term of non-permanent members"],
  sol: "A single permanent member's negative vote defeats a substantive resolution, so action can be blocked even when a large majority favours it. The other features do not stop decisions.",
}));

// ================================================================ source-based
Q("sb_model_un", source({
  t: [2, 3], d: 3, c: "analysis", origin: "soyl-original",
  stem: `Read the extract from the imagined diary of a student at a school Model United Nations and answer the questions that follow. ${IMAG}`,
  passage: "**Diary of an imagined Class 10 student, Model United Nations, Pune**\n\nToday I represented a small island state. In the big hall, where every country had one seat and one vote, my speech on rising seas was heard just as long as the speech of the largest country. In the afternoon fifteen of us met in the smaller room. Our resolution on a ceasefire won eleven votes, but it still failed, because one delegate whose country holds a permanent seat raised her card against it. Our teacher said that this was how the real thing works.",
  parts: [
    child("a", short({ t: 2, d: 1, c: "recall", marks: 1, stem: "Name the organ represented by the big hall where every country had one vote.", model: "The **General Assembly**.", sol: "General Assembly.", scheme: [["General Assembly", 1]] })),
    child("b", short({ t: 3, d: 2, c: "application", marks: 1, stem: "Name the organ of fifteen members that met in the smaller room.", model: "The **Security Council**.", sol: "Security Council.", scheme: [["Security Council", 1]] })),
    child("c", short({ t: 3, d: 3, c: "analysis", marks: 2, stem: "**Either** (i): Why did the ceasefire resolution fail despite eleven votes in favour?", model: "A **permanent member** voted **against** it. On a **substantive** matter a negative vote by any permanent member is a **veto**, so nine or more yes votes are not enough.", sol: "Veto explained.", scheme: [["Permanent member voted against", 1], ["Veto rule", 1]] }), [
      short({ t: 2, d: 3, c: "evaluation", marks: 2, stem: "**Or** (ii): The student felt heard in the big hall. Give two reasons why small states value the General Assembly.", model: "Every state has an **equal vote** whatever its size, and any member can **raise any issue** within the Charter, so small states can bring their concerns, like rising seas, before the **whole world**.", sol: "Two reasons.", scheme: [["Equal vote", 1], ["Can raise any issue", 1]] }),
    ]),
  ],
}));
Q("sb_health_newsletter", source({
  t: 5, d: 3, c: "application", origin: "soyl-original",
  stem: `Read the extract from an imagined district health newsletter and answer the questions that follow. ${IMAG}`,
  passage: "**Imagined district health newsletter, Sundargarh block**\n\nThis month our health workers visited every hamlet with cold boxes of vaccines for infants. Mothers also received packets of nutritious food and tablets to purify drinking water, supplied with the help of a fund that works only for children. The vaccine schedule and the guidance on stopping the spread of fever came from a world body based in a Swiss city. Next month the block school will begin a new reading programme for adults, supported by an agency based in Paris.",
  parts: [
    child("a", short({ t: 5, d: 2, c: "application", marks: 1, stem: "Name the agency described as a fund that works only for children, and its headquarters.", model: "**UNICEF**, headquartered in **New York**.", sol: "UNICEF; New York.", scheme: [["UNICEF and New York", 1]] })),
    child("b", short({ t: 5, d: 2, c: "application", marks: 1, stem: "Name the world body based in a Swiss city that guided the vaccine schedule.", model: "The **World Health Organisation** (WHO), **Geneva**.", sol: "WHO.", scheme: [["WHO", 1]] })),
    child("c", short({ t: 5, d: 3, c: "analysis", marks: 2, stem: "**Either** (i): Which agency based in Paris supports the reading programme, and what are two of its fields of work?", model: "**UNESCO**. It works for **education and literacy** and for **science and culture**, including heritage.", sol: "UNESCO with fields.", scheme: [["UNESCO", 1], ["Two fields", 1]] }), [
      short({ t: 5, d: 3, c: "evaluation", marks: 2, stem: "**Or** (ii): How does work like this help the United Nations achieve its objectives? Give two points.", model: "It fulfils the aim of **international cooperation** on **social and humanitarian** problems, and by improving health and education it reduces **poverty** and **tension**, which supports **peace**.", sol: "Two links to objectives.", scheme: [["Cooperation on social problems", 1], ["Link to peace", 1]] }),
    ]),
  ],
}));
Q("sb_rights_assembly", source({
  t: [6, 1], d: 3, c: "analysis", origin: "soyl-original",
  stem: `Read the extract from an imagined teacher's notes for a school assembly and answer the questions that follow. ${IMAG}`,
  passage: "**Notes of an imagined teacher, school assembly, 10 December**\n\nToday we remember the day when the nations of the world, meeting in Paris three years after the great war ended, agreed on a common list of the rights and freedoms that belong to every human being. It is not a law that any court can enforce, I will tell the children, yet many countries, including our own, wrote similar rights into their constitutions. I will ask them which of these rights they use every day without noticing.",
  parts: [
    child("a", short({ t: 6, d: 1, c: "recall", marks: 1, stem: "Name the document the teacher is speaking about.", model: "The **Universal Declaration of Human Rights**.", sol: "UDHR.", scheme: [["Universal Declaration of Human Rights", 1]] })),
    child("b", short({ t: 6, d: 2, c: "application", marks: 1, stem: "In which year was it adopted, and by which organ?", model: "In **1948**, by the **General Assembly**.", sol: "1948; General Assembly.", scheme: [["1948 and General Assembly", 1]] })),
    child("c", short({ t: 6, d: 3, c: "analysis", marks: 2, stem: "**Either** (i): The teacher says it is not a law any court can enforce. Why is it still important? Give two reasons.", model: "It is a **common standard** respected by nations, and it has **inspired** national **constitutions** and later **treaties** on rights.", sol: "Two reasons.", scheme: [["Common standard", 1], ["Inspired constitutions and treaties", 1]] }), [
      short({ t: 6, d: 3, c: "application", marks: 2, stem: "**Or** (ii): Name two rights a student might use every day without noticing, in the spirit of the Declaration.", model: "The **right to education** (attending school) and **freedom of expression** (speaking or writing one's views); also freedom of **movement**.", sol: "Any two everyday rights.", scheme: [["First right", 1], ["Second right", 1]] }),
    ]),
  ],
}));

// ================================================================ check-slide items (not used in tests)
Q("m_chk_charter_month", mcq({
  t: 1, d: 1, c: "recall",
  stem: "In which month of 1945 was the United Nations Charter signed?",
  opts: ["June", "October", "January", "December"],
  sol: "The Charter was signed in June 1945 (26 June) and came into force in October 1945.",
}));
Q("tf_chk_ga_vote", tf({
  t: 2, d: 1, c: "recall", ans: true,
  stem: "True or false? In the General Assembly, a very small member state has the same single vote as the largest.",
  sol: "True. Each member state has one vote in the General Assembly.",
}));
Q("fb_chk_p5", fb({
  t: 3, d: 1, c: "recall",
  stem: "The Security Council has five permanent and ___ non-permanent members.",
  acc: [["ten", "10"]],
  sol: "There are ten non-permanent members, elected for two years.",
}));
Q("m_chk_veto_holder", mcq({
  t: 3, d: 2, c: "understanding",
  stem: "Who among the following can use the veto in the Security Council?",
  opts: ["Only the five permanent members", "Every member of the Security Council", "Every member of the General Assembly", "Only the Secretary-General"],
  sol: "Only the five permanent members hold the veto; non-permanent members do not.",
}));
Q("tf_chk_icj_judges", tf({
  t: 4, d: 1, c: "recall", ans: true,
  stem: "True or false? The International Court of Justice has fifteen judges.",
  sol: "True. The Court has fifteen judges, elected for nine years.",
}));
Q("m_chk_who_city", mcq({
  t: 5, d: 1, c: "recall",
  stem: "Which agency in this list has its headquarters in Geneva?",
  opts: ["The World Health Organisation", "UNICEF", "UNESCO", "The International Court of Justice"],
  sol: "The World Health Organisation is based in Geneva. UNICEF is in New York, UNESCO in Paris and the ICJ at The Hague.",
}));
Q("fb_chk_unesco_city", fb({
  t: 5, d: 1, c: "recall",
  stem: "UNESCO has its headquarters in the city of ___.",
  acc: [["Paris"]],
  sol: "UNESCO's headquarters are in Paris.",
}));
Q("m_chk_udhr_year", mcq({
  t: 6, d: 1, c: "recall",
  stem: "In which year did the General Assembly adopt the Universal Declaration of Human Rights?",
  opts: ["1948", "1945", "1946", "1950"],
  sol: "It was adopted on 10 December 1948.",
}));
