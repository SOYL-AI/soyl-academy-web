// Build ICSE 10 History & Civics ch17 The United Nations. Run from platform/:
//   npx tsx content/authored/social-science/icse-10-history-civics-ch17/src/build.mjs
import path from "node:path";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from "../../icse-10-history-civics-ch01/src/lib.mjs";

setUnit("icse-10-history-civics-ch17", "social-science");
const Qs = await import("./questions.mjs");
const { organsSvg, voteSvg, ORGANS_ALT, VOTE_ALT, UN_YEAR, MEMBERS, FOUNDERS, SC_SIZE, NONPERM, SC_PASS, ICJ_JUDGES, ICJ_TERM, NONPERM_TERM, AGENCIES, UDHR_YEAR, scPasses, V_A, V_B, V_C, V_D, twoThirds, GA_PRESENT } = Qs;
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
assert.equal(SC_SIZE - NONPERM, 5);
assert.equal(AGENCIES.length, 3);

// ---------------------------------------------------------------- figures
const vOrgans = organsSvg(ORGANS_ALT, "Schematic diagram drawn by SOYL; positions are for clarity only.");
const vVote = voteSvg(VOTE_ALT, "Imagined vote, drawn by SOYL.");
const vRoute1 = flow("LR", ["Why a new world body", "Objectives", "General Assembly", "Security Council and the veto"], "Route map of Part 1: why a new world body was needed, its objectives, the General Assembly, and the Security Council with the veto", "Part 1 at a glance");
const vRoute2 = flow("LR", ["International Court of Justice", "UNICEF, WHO, UNESCO", "Universal Declaration of Human Rights", "Organs working together"], "Route map of Part 2: the International Court of Justice, the agencies UNICEF, WHO and UNESCO, the Universal Declaration of Human Rights, and how the organs work together", "Part 2 at a glance");
const vBirth = table(["Date", "Event"], [
  ["26 June 1945", "Charter signed at San Francisco"],
  ["24 October 1945", "Charter comes into force: United Nations Day"],
  [`${UN_YEAR}`, `${FOUNDERS} original members, including India`],
  ["As of 2024", `${MEMBERS} member states`],
], `Table of the birth of the United Nations: Charter signed at San Francisco on 26 June 1945; it came into force on 24 October 1945, now United Nations Day; ${FOUNDERS} original members including India; ${MEMBERS} member states as of 2024`);
const vObjectives = table(["Objective (paraphrased)", "What it means in practice"], [
  ["Maintain international peace and security", "Prevent and stop wars; settle disputes peacefully"],
  ["Develop friendly relations among nations", "Respect equal rights and self-determination of peoples"],
  ["International cooperation", "Solve economic, social, cultural and humanitarian problems together"],
  ["Promote human rights", "Respect rights and freedoms for all, without distinction"],
  ["A centre for harmonising actions", "A meeting place where nations coordinate their efforts"],
], "Table of the objectives of the United Nations, paraphrased: maintaining peace and security; friendly relations based on equal rights; international cooperation on economic, social, cultural and humanitarian problems; promoting human rights; and being a centre for harmonising the actions of nations");
const vLeagueUn = table(["", "League of Nations", "United Nations"], [
  ["Founded", "1920", "1945"],
  ["Great powers", "USA never joined", "All great powers members from the start"],
  ["Enforcement", "No effective means", "Security Council can order sanctions and military action"],
  ["Seat", "Geneva", "New York"],
], "Comparison table of the League of Nations and the United Nations: the League founded 1920 without the USA and with no effective means of enforcement, seated in Geneva; the United Nations founded 1945 with all the great powers, a Security Council able to order sanctions and military action, and its headquarters in New York");
const vGaComp = table(["Feature", "General Assembly"], [
  ["Members", "All member states"],
  ["Representatives", "Up to five per state"],
  ["Votes", "One vote per state"],
  ["Ordinary questions", "Simple majority of members present and voting"],
  ["Important questions", "Two-thirds majority of members present and voting"],
  ["Sessions", "Regular session every year from September; special sessions"],
], "Table of the General Assembly: all member states, up to five representatives each, one vote per state, simple majority on ordinary questions, two-thirds majority on important questions, a regular session every year from September and special sessions");
const vGaFunc = table(["Function", "Examples"], [
  ["Deliberative", "Discusses any matter within the Charter and makes recommendations"],
  ["Elective", "Elects non-permanent Security Council members and Economic and Social Council members"],
  ["With the Security Council", "Elects ICJ judges; admits members and appoints the Secretary-General on the Council's recommendation"],
  ["Budgetary", "Approves the budget and fixes contributions"],
  ["Constituent", "Proposes amendments to the Charter"],
], "Table of the functions of the General Assembly: deliberative, elective, joint functions with the Security Council such as electing judges, admitting members and appointing the Secretary-General, budgetary, and constituent");
const vTwoThirds = table(["Step", "Working"], [
  ["Members present and voting", `${GA_PRESENT}`],
  ["Two-thirds needed", `2 × ${GA_PRESENT} ÷ 3 = ${twoThirds(GA_PRESENT)}`],
  ["Simple majority would be", `${Math.floor(GA_PRESENT / 2) + 1}`],
], `Worked example table: with ${GA_PRESENT} members present and voting, an important question needs two-thirds, that is ${twoThirds(GA_PRESENT)} votes, while a simple majority would be ${Math.floor(GA_PRESENT / 2) + 1}`, "Imagined vote.");
const vScComp = table(["Members", "Number", "How chosen", "Veto"], [
  ["Permanent", "5", "Named in the Charter: China, France, Russia, the United Kingdom, the United States", "Yes"],
  ["Non-permanent", `${NONPERM}`, `Elected by the General Assembly for ${NONPERM_TERM} years; five each year`, "No"],
], `Table of the Security Council's ${SC_SIZE} members: five permanent members named in the Charter, China, France, Russia, the United Kingdom and the United States, with the veto; and ${NONPERM} non-permanent members elected by the General Assembly for ${NONPERM_TERM} years, five each year, without the veto`);
const voteRow = (label, v) => [label, `${v.yes} yes; ${v.permanentNo} permanent no${v.permanentAbstain ? `; ${v.permanentAbstain} permanent abstains` : ""}`, scPasses(v) ? "Passes" : "Fails"];
const vVotes = table(["Imagined vote", "Votes", "Result"], [
  voteRow("A: peacekeepers", V_A),
  voteRow("B: sanctions", V_B),
  voteRow("C: ceasefire", V_C),
  voteRow("D: aid corridor", V_D),
], `Worked example table of four imagined Security Council votes on substantive matters: A with ${V_A.yes} yes and one permanent no fails; B with ${V_B.yes} yes and one permanent abstention passes; C with ${V_C.yes} yes fails; D with ${V_D.yes} yes and no veto passes`, `Rule: at least ${SC_PASS} yes votes and no "no" from a permanent member.`);
const vScFunc = flow("TB", ["Investigates a dispute that may threaten peace", "Recommends peaceful settlement", "Orders economic sanctions if needed", "Authorises military action or sends peacekeepers", "Recommends new members and the Secretary-General"], "Flow of the Security Council's functions: investigating disputes, recommending peaceful settlement, ordering economic sanctions, authorising military action or sending peacekeepers, and recommending new members and the Secretary-General", "From talks to action.");
const vSum1 = flow("TB", [`Charter signed June ${UN_YEAR}; in force 24 October ${UN_YEAR}`, "Objectives: peace, friendly relations, cooperation, human rights", "General Assembly: all members, one vote each", `Security Council: ${SC_SIZE} members, five with the veto`, `Substantive decisions: ${SC_PASS} votes and no veto`], `Summary flow of Part 1: the Charter signed in June ${UN_YEAR} and in force on 24 October ${UN_YEAR}; objectives of peace, friendly relations, cooperation and human rights; the General Assembly of all members with one vote each; the Security Council of ${SC_SIZE} members, five with the veto; substantive decisions need ${SC_PASS} votes and no veto`, "Part 1 in five lines.");
const vIcj = table(["Feature", "International Court of Justice"], [
  ["Seat", "Peace Palace, The Hague"],
  ["Judges", `${ICJ_JUDGES}, elected for ${ICJ_TERM} years; a third every three years`],
  ["Elected by", "General Assembly and Security Council, voting separately"],
  ["Rule", "No two judges of the same nationality"],
], `Table of the International Court of Justice: seat at the Peace Palace in The Hague; ${ICJ_JUDGES} judges elected for ${ICJ_TERM} years with a third elected every three years; elected by the General Assembly and the Security Council voting separately; no two judges of the same nationality`);
const vIcjFunc = flow("LR", ["States accept the Court's jurisdiction", "Contentious case heard under international law", "Majority judgment, binding and final", "If not obeyed: the other party may go to the Security Council"], "Flow of a contentious case at the International Court of Justice: states accept its jurisdiction, the case is heard under international law, the majority judgment is binding and final, and if it is not obeyed the other party may go to the Security Council", "Advisory opinions are given separately to UN organs.");
const vJuris = table(["Imagined request", "Jurisdiction"], [
  ["Two states dispute a shared bay", "Contentious"],
  ["The General Assembly asks a legal question", "Advisory"],
  ["A citizen sues a foreign government", "Not possible: only states are parties"],
], "Worked example table: two states disputing a bay fall under contentious jurisdiction; a legal question from the General Assembly is advisory; a citizen cannot sue a foreign government because only states are parties", "Sort the request first.");
const vAgencies = table(["Agency", "Set up", "Headquarters", "Main work"], AGENCIES.map(([s, full, hq, y]) => [`${s} (${full})`, `${y}`, hq, s === "UNICEF" ? "Children's health, nutrition, clean water, emergency relief, education" : s === "WHO" ? "Health standards, control of epidemics, immunisation, health systems" : "Education and literacy, science, culture and world heritage"]),
  "Table of three United Nations agencies: UNICEF, the United Nations Children's Fund, set up in 1946, headquarters New York, children's health, nutrition, water, relief and education; WHO, the World Health Organisation, 1948, Geneva, health standards, epidemic control, immunisation and health systems; UNESCO, 1945, Paris, education, science, culture and heritage",
  "Only headquarters and functions are required.");
const vChoose = table(["Imagined need", "Agency", "Why"], [
  ["Fever outbreak in a district", "WHO", "Controls epidemics"],
  ["Flood-hit children without food", "UNICEF", "Emergency relief for children"],
  ["Restoring an old temple complex", "UNESCO", "Protects cultural heritage"],
], "Worked example table matching needs to agencies: a fever outbreak to the WHO, which controls epidemics; flood-hit children to UNICEF, which gives emergency relief; restoring a temple complex to UNESCO, which protects heritage", "Name the agency, then give the reason.");
const vUdhr = flow("TB", [`10 December ${UDHR_YEAR}: adopted by the General Assembly in Paris`, "Sets out basic rights and freedoms for every person", "A common standard, not a binding treaty", "Inspired constitutions and later treaties on rights"], `Flow about the Universal Declaration of Human Rights: adopted by the General Assembly in Paris on 10 December ${UDHR_YEAR}; it sets out basic rights and freedoms for every person; it is a common standard rather than a binding treaty; it inspired constitutions and later treaties`, "Meaning only, as the syllabus requires.");
const vTogether = flow("TB", ["Security Council: ceasefire, sanctions, peacekeepers", "If blocked by a veto: General Assembly discusses and recommends", "International Court of Justice: legal dispute, if states accept", "Agencies: relief for refugees, health and schools"], "Flow of organs working together in an imagined invasion: the Security Council calls a ceasefire and may order sanctions or peacekeepers; if blocked by a veto the General Assembly discusses and recommends; the International Court of Justice decides the legal dispute if states accept; agencies give relief, health care and schooling", "An imagined crisis.");
const vSum2 = flow("TB", [`ICJ: ${ICJ_JUDGES} judges, ${ICJ_TERM} years, The Hague`, "Contentious cases between states; advisory opinions", "UNICEF New York; WHO Geneva; UNESCO Paris", `UDHR: 10 December ${UDHR_YEAR}, a common standard of rights`], `Summary flow of Part 2: the International Court of Justice with ${ICJ_JUDGES} judges for ${ICJ_TERM} years at The Hague; contentious cases between states and advisory opinions; UNICEF in New York, WHO in Geneva and UNESCO in Paris; and the Universal Declaration of Human Rights of 10 December ${UDHR_YEAR}`, "Part 2 in four lines.");

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: "The United Nations — Part 1: Objectives, the General Assembly and the Security Council",
  goals: [
    "State when and why the United Nations was created and list its objectives",
    "Describe the composition and functions of the General Assembly",
    "Explain the composition of the Security Council, the veto and the Council's role in keeping peace",
  ],
  slides: [
    sl("title", "A new world body after the war", {
      b: "Part 1 — **objectives**, the **General Assembly** and the **Security Council**.",
      v: vRoute1,
      n: "After the Second World War, the nations wanted a body that could prevent another such disaster. In this part we see how the United Nations was born, what it aims to do, and how two of its main organs, the General Assembly and the Security Council, are organised and work.",
    }),
    sl("diagram", "Six principal organs", {
      b: "The **Charter** created six principal organs.",
      v: vOrgans,
      n: "The Charter set up six principal organs. The General Assembly includes every member. The Security Council keeps the peace. The Economic and Social Council handles cooperation. The International Court of Justice settles legal disputes. The Secretariat is the staff, and the Trusteeship Council's work is now suspended.",
    }),
    sl("concept", "The birth of the United Nations", {
      b: "From **San Francisco** to **New York**.",
      v: vBirth,
      n: "Delegates signed the Charter at San Francisco on the twenty-sixth of June nineteen forty-five. It came into force on the twenty-fourth of October that year, now celebrated as United Nations Day. There were fifty-one original members, including India. As of twenty twenty-four there were one hundred and ninety-three.",
    }),
    sl("check", "Quick check: the Charter", {
      b: "In which month of 1945 was the Charter signed?",
      chk: "m_chk_charter_month",
      n: "Think back to the slide you just saw. In which month did the delegates sign the Charter?",
    }),
    sl("diagram", "The objectives", {
      b: "What the United Nations was set up to do (paraphrased).",
      v: vObjectives,
      n: "The first aim is to maintain international peace and security. The others are to develop friendly relations among nations, to cooperate in solving economic, social, cultural and humanitarian problems, to promote respect for human rights, and to be a centre where nations bring their actions into harmony.",
    }),
    sl("two-column", "Learning from the League", {
      cols: ["**The League of Nations**\n\n- Founded **1920**\n- The **USA** never joined\n- No effective way to stop **aggressors**", "**The United Nations**\n\n- Founded **1945**\n- All the **great powers** joined\n- **Security Council** can order sanctions and force"],
      v: vLeagueUn,
      n: "The founders learnt from the League's failure. The League had no effective way to stop aggressors, and the United States never joined it. The United Nations brought in all the great powers from the start and gave its Security Council the power to order sanctions and even military action.",
    }),
    sl("diagram", "The General Assembly: who sits there", {
      b: "Every member, **one vote**.",
      v: vGaComp,
      n: "Every member state sits in the General Assembly. A state may send up to five representatives, but it has only one vote, whatever its size. Ordinary questions need a simple majority. Important questions, such as admitting members or the budget, need two-thirds of the members present and voting.",
    }),
    sl("check", "Quick check: equal votes", {
      b: "True or false: in the General Assembly, a very small state has the same single vote as the largest.",
      chk: "tf_chk_ga_vote",
      n: "Recall how voting works in the General Assembly. Does size change the number of votes?",
    }),
    sl("diagram", "What the General Assembly does", {
      b: "Five kinds of **functions**.",
      v: vGaFunc,
      n: "The General Assembly discusses any matter within the Charter and makes recommendations. It elects the non-permanent members of the Security Council. Together with the Council it elects the judges of the Court, admits members and appoints the Secretary-General. It approves the budget and can propose amendments to the Charter.",
    }),
    sl("example", "Worked example 1: the two-thirds rule", {
      b: "An imagined vote on admitting a new member.",
      bl: [`Step 1: count members **present and voting**: ${GA_PRESENT}.`, `Step 2: two-thirds of ${GA_PRESENT} is **${twoThirds(GA_PRESENT)}**.`, "Step 3: compare with a simple majority to see the difference."],
      v: vTwoThirds,
      n: "Suppose one hundred and eighty members are present and voting on admitting a new state. Admission is an important question, so two-thirds are needed. Two-thirds of one hundred and eighty is one hundred and twenty. A simple majority would have been only ninety-one, so the higher rule protects big decisions.",
    }),
    sl("diagram", "The Security Council: fifteen members", {
      b: "**Five permanent**, **ten elected**.",
      v: vScComp,
      n: "The Security Council has fifteen members. Five are permanent: China, France, Russia, the United Kingdom and the United States. The other ten are elected by the General Assembly for two years, five each year, and a retiring member cannot be re-elected at once. Only the permanent members hold the veto.",
    }),
    sl("check", "Quick check: elected seats", {
      b: "The Security Council has five permanent and ___ non-permanent members.",
      chk: "fb_chk_p5",
      n: "How many members of the Security Council are elected for two-year terms?",
    }),
    sl("concept", "The veto", {
      b: `A substantive decision needs **${SC_PASS} yes votes** and **no "no"** from a permanent member.`,
      v: vVote,
      n: "On procedural matters, any nine votes are enough. On substantive matters, a decision needs nine votes and no negative vote from a permanent member. A single no from one of the five is a veto and defeats the resolution. By long practice, a permanent member that abstains does not block it.",
    }),
    sl("example", "Worked example 2: does it pass?", {
      b: "Apply the rule to four imagined votes.",
      bl: ["Step 1: count the **yes** votes: at least nine?", "Step 2: did any **permanent** member vote **no**?", "Step 3: an **abstention** is not a veto."],
      v: vVotes,
      n: "Test four imagined votes. Vote A had eleven yes votes but one permanent member voted no, so it fails. Vote B had nine yes votes and a permanent member abstained, so it passes. Vote C had only eight yes votes, so it fails. Vote D had thirteen and no veto, so it passes.",
    }),
    sl("check", "Quick check: who holds the veto?", {
      b: "Who among the following can use the veto?",
      chk: "m_chk_veto_holder",
      n: "Is the veto held by every Council member, or only by some of them?",
    }),
    sl("diagram", "How the Council keeps the peace", {
      b: "From **investigation** to **action**.",
      v: vScFunc,
      n: "The Security Council investigates any dispute that may threaten peace and recommends peaceful ways to settle it. If a threat continues, it can order economic sanctions, and if those fail, it can authorise military action or send peacekeepers. It also recommends new members and the Secretary-General to the General Assembly.",
    }),
    sl("summary", "Summary of Part 1", {
      v: vSum1,
      n: "To sum up Part One. The Charter was signed in June nineteen forty-five and came into force on the twenty-fourth of October. The United Nations works for peace, friendly relations, cooperation and human rights. In the General Assembly every member has one vote. The Security Council has fifteen members, and five hold the veto.",
    }),
    sl("exam-tips", "Exam tips", {
      bl: ["**24 October 1945**: in force; **26 June 1945**: signed.", "General Assembly: **all** members, **one** vote, **two-thirds** on important questions.", `Security Council: **${SC_SIZE}** members, **${NONPERM}** elected for **${NONPERM_TERM}** years.`, "Veto = a **no** by a permanent member on a **substantive** matter; abstention is not a veto.", "Write objectives in your **own words**."],
      v: vVotes,
      n: "A few tips. Do not confuse the day the Charter was signed with the day it came into force. Remember one state, one vote in the General Assembly. Learn the numbers of the Security Council, and explain the veto carefully, including the rule about abstention. Always write the objectives in your own words.",
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: "The United Nations — Part 2: The Court, the Agencies and Human Rights",
  goals: [
    "State the composition, seat and functions of the International Court of Justice",
    "State the headquarters and functions of UNICEF, the WHO and UNESCO",
    "Explain the meaning and significance of the Universal Declaration of Human Rights",
  ],
  slides: [
    sl("title", "Law, welfare and rights", {
      b: "Part 2 — the **Court**, three **agencies** and the **Universal Declaration of Human Rights**.",
      v: vRoute2,
      n: "Peace is not kept by soldiers alone. In this part we meet the world's court, three agencies that work for children, health and education, and a declaration that set out the rights of every human being. Finally we see how the organs work together in a crisis.",
    }),
    sl("diagram", "The International Court of Justice", {
      b: "The world's **court** for disputes between **states**.",
      v: vIcj,
      n: "The International Court of Justice sits in the Peace Palace at The Hague, the only principal organ outside New York. It has fifteen judges, elected for nine years by the General Assembly and the Security Council voting separately. A third are elected every three years, and no two may share a nationality.",
    }),
    sl("check", "Quick check: the judges", {
      b: "True or false: the International Court of Justice has fifteen judges.",
      chk: "tf_chk_icj_judges",
      n: "Recall the number of judges on the world court.",
    }),
    sl("diagram", "What the Court does", {
      b: "**Contentious** cases and **advisory** opinions.",
      v: vIcjFunc,
      n: "When states accept its jurisdiction, the Court hears their legal dispute and decides it under international law. Its majority judgment is binding and final. If a party does not obey, the other may turn to the Security Council. The Court also gives advisory opinions to the General Assembly, the Council and authorised agencies.",
    }),
    sl("example", "Worked example 1: which jurisdiction?", {
      b: "Sort three imagined requests.",
      bl: ["Step 1: is it a **dispute between states**? Then **contentious**.", "Step 2: is a **UN organ** asking a legal question? Then **advisory**.", "Step 3: is a **private person** suing? The ICJ cannot hear it."],
      v: vJuris,
      n: "Practise sorting. Two states disputing a shared bay, both accepting the Court, make a contentious case. When the General Assembly asks a legal question, the Court gives an advisory opinion. A private citizen cannot sue a foreign government at the Court, because only states can be parties.",
    }),
    sl("diagram", "Three United Nations agencies", {
      b: "**UNICEF**, **WHO** and **UNESCO**.",
      v: vAgencies,
      n: "Specialised agencies carry the work of the United Nations into daily life. The United Nations Children's Fund, in New York, works for children's health, food, water and schooling. The World Health Organisation, in Geneva, guards world health. The United Nations Educational, Scientific and Cultural Organisation, in Paris, works for learning, science and culture.",
    }),
    sl("check", "Quick check: which city?", {
      b: "Which agency in this list has its headquarters in Geneva?",
      chk: "m_chk_who_city",
      n: "Match the agency with its home city. Which one is based in Geneva?",
    }),
    sl("concept", "Agencies at work", {
      b: "What each agency **does**.",
      bl: ["**UNICEF:** immunisation, nutrition, clean water, emergency relief, education for children.", "**WHO:** international health standards, control of epidemics, help to health systems.", "**UNESCO:** literacy and education, science, culture, the World Heritage List."],
      v: vAgencies,
      n: "Think of the agencies by what they do. The Children's Fund vaccinates infants, feeds children and helps them in emergencies. The World Health Organisation sets health standards and leads the fight against epidemics. The educational and cultural organisation spreads literacy, links scientists and protects heritage sites on its world list.",
    }),
    sl("check", "Quick check: Paris", {
      b: "UNESCO has its headquarters in the city of ___.",
      chk: "fb_chk_unesco_city",
      n: "Which city is home to the agency for education, science and culture?",
    }),
    sl("example", "Worked example 2: choosing the agency", {
      b: "Match each **imagined need** to an agency, with a reason.",
      bl: ["Step 1: decide the **field**: health, children, or education and culture.", "Step 2: name the **agency**.", "Step 3: give the **reason** in one line."],
      v: vChoose,
      n: "Match needs to agencies. A district fighting a fever outbreak needs the World Health Organisation, which controls epidemics. Flood-hit children without food need the Children's Fund. A town restoring an old temple complex needs the organisation for education, science and culture, which protects heritage. Always add a reason.",
    }),
    sl("diagram", "The Universal Declaration of Human Rights", {
      b: "A **common standard** of rights for everyone.",
      v: vUdhr,
      n: "On the tenth of December nineteen forty-eight, the General Assembly, meeting in Paris, adopted the Universal Declaration of Human Rights. It sets out the basic rights and freedoms that every person should enjoy. It is not a binding treaty, but it has inspired many constitutions and later agreements. The day is now Human Rights Day.",
    }),
    sl("check", "Quick check: the year", {
      b: "In which year did the General Assembly adopt the Universal Declaration of Human Rights?",
      chk: "m_chk_udhr_year",
      n: "Was the Declaration adopted in the same year as the Charter, or later?",
    }),
    sl("two-column", "Why the Declaration still matters", {
      cols: ["**What it is not**\n\n- Not a **treaty** that courts enforce\n- Not a law of the **Security Council**\n- Not limited to **some** countries", "**What it has done**\n\n- Set a **common standard** for all\n- **Inspired** constitutions, including fundamental rights\n- Led to later **treaties** on rights"],
      v: vUdhr,
      n: "The Declaration is not a treaty that any court enforces, and it is not a law of the Security Council. Yet it matters a great deal. It gave the world one common standard of rights, it inspired many constitutions, including chapters on fundamental rights, and later treaties on rights were built upon it.",
    }),
    sl("diagram", "Organs working together", {
      b: "An **imagined** crisis: one state invades another.",
      v: vTogether,
      n: "Picture an imagined invasion. The Security Council calls for a ceasefire and may order sanctions or send peacekeepers. If a veto blocks it, the General Assembly can discuss the crisis and recommend action. The Court may decide the legal dispute if both states accept it, while the agencies care for refugees.",
    }),
    sl("summary", "Summary of Part 2", {
      v: vSum2,
      n: "To sum up Part Two. The International Court of Justice at The Hague has fifteen judges serving nine years and decides disputes between states or gives advisory opinions. The Children's Fund is in New York, the World Health Organisation in Geneva, and the educational and cultural organisation in Paris. The Declaration of nineteen forty-eight sets a common standard of rights.",
    }),
    sl("exam-tips", "Exam tips", {
      bl: ["ICJ: **15** judges, **9** years, **The Hague**; only **states** are parties.", "UNICEF **New York**; WHO **Geneva**; UNESCO **Paris**.", "Give **two functions** for each agency.", "UDHR: **10 December 1948**, General Assembly, **Paris**; a standard, not a treaty.", "Never quote the Charter or the Declaration: **explain** in your own words."],
      v: vSum2,
      n: "A few tips. Learn the three numbers for the Court: fifteen judges, nine years, The Hague. Pair each agency with its city and two functions. Remember that the Declaration was adopted in nineteen forty-eight, is a common standard rather than a treaty, and should always be explained in your own words.",
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: "The United Nations — notes",
  sections: [
    {
      h: "1. Birth and objectives",
      t: 1,
      b: `- **Charter** signed at **San Francisco** on **26 June ${UN_YEAR}**; in force on **24 October ${UN_YEAR}** (United Nations Day). Headquarters: **New York**.\n- **${FOUNDERS} original members**, including **India**; **${MEMBERS}** members as of 2024.\n- **Objectives (paraphrased):** maintain international **peace and security**; develop **friendly relations** based on equal rights and self-determination; achieve **international cooperation** on economic, social, cultural and humanitarian problems; promote **human rights**; be a **centre** for harmonising the actions of nations.\n- Learning from the **League**: all great powers joined, and the Security Council can **enforce** decisions.`,
      terms: [["Charter", "The founding treaty of the United Nations, setting out its aims, organs and rules."], ["Sovereign equality", "The principle that every member state, large or small, has equal standing."]],
      v: vObjectives,
      vs: [vBirth, vLeagueUn],
    },
    {
      h: "2. The General Assembly",
      t: 2,
      b: "- **Composition:** all member states; up to **five representatives**, **one vote** each.\n- **Voting:** simple majority on ordinary questions; **two-thirds** of members present and voting on **important** questions (peace and security, admission, budget).\n- **Sessions:** a regular session every year from **September**; special sessions when needed.\n- **Functions:** deliberative (discusses any matter, recommends); elective (non-permanent Security Council members, Economic and Social Council); with the Security Council, elects **ICJ judges**, **admits members** and **appoints the Secretary-General**; **budgetary**; **constituent** (amendments).",
      terms: [["Important question", "A matter needing a two-thirds majority in the General Assembly."]],
      v: vGaComp,
      vs: [vGaFunc, vTwoThirds],
    },
    {
      h: "3. The Security Council and the veto",
      t: 3,
      b: `- **${SC_SIZE} members:** **five permanent** (China, France, Russia, the United Kingdom, the United States) and **${NONPERM} non-permanent**, elected for **${NONPERM_TERM} years**, five each year, not immediately re-eligible.\n- **Voting:** procedural matters, any **nine** votes; substantive matters, **nine** votes including the **concurring votes** of the permanent members. A **no** by a permanent member is a **veto**; by practice an **abstention** is not.\n- **Functions:** investigate disputes, recommend settlement, order **sanctions**, authorise **military action** and **peacekeeping**, recommend members and the Secretary-General.\n- **Debate:** the veto keeps the great powers inside the UN but can **paralyse** the Council; reforms have been discussed.`,
      terms: [["Veto", "The power of a permanent member to block a substantive decision by voting against it."], ["Sanctions", "Economic or other penalties ordered against a state that threatens peace."]],
      v: vScComp,
      vs: [vVote, vScFunc],
    },
    {
      h: "4. The International Court of Justice",
      t: 4,
      b: `- **Seat:** Peace Palace, **The Hague**.\n- **${ICJ_JUDGES} judges**, elected by the **General Assembly and the Security Council** voting separately, for **${ICJ_TERM} years**; a third every three years; **no two of the same nationality**.\n- **Contentious jurisdiction:** legal disputes between **states** that accept it; judgments are **binding and final**; if not obeyed, the other party may approach the Security Council.\n- **Advisory jurisdiction:** opinions on legal questions for the General Assembly, the Security Council and authorised agencies.\n- Individuals **cannot** bring cases.`,
      terms: [["Contentious jurisdiction", "The Court's power to decide legal disputes between states."], ["Advisory opinion", "The Court's legal opinion given at the request of a UN organ or agency."]],
      v: vIcj,
      vs: [vIcjFunc, vJuris],
    },
    {
      h: "5. UNICEF, WHO and UNESCO",
      t: 5,
      b: "- **UNICEF** (United Nations Children's Fund), set up **1946**, **New York**: child health and immunisation, nutrition, clean water, emergency relief, education.\n- **WHO** (World Health Organisation), **1948**, **Geneva**: international health standards, control of epidemics, immunisation campaigns, help to health systems. World Health Day: **7 April**.\n- **UNESCO** (United Nations Educational, Scientific and Cultural Organisation), **1945**, **Paris**: education and literacy, science, culture, the **World Heritage List**.\n- Only **headquarters and functions** are required.",
      terms: [["Specialised agency", "An international organisation linked to the UN that works in one field such as health or education."]],
      v: vAgencies,
      vs: [vChoose],
    },
    {
      h: "6. The Universal Declaration of Human Rights",
      t: 6,
      b: `- Adopted by the **General Assembly** in **Paris** on **10 December ${UDHR_YEAR}** (Human Rights Day).\n- **Meaning:** a statement of the basic **rights and freedoms** every person should enjoy, without distinction, as a **common standard** for all peoples and nations.\n- **Not a binding treaty**, but it has **inspired** national constitutions (including fundamental rights) and later treaties on rights.\n- Only its **meaning** is required; explain it in your own words.`,
      terms: [["Universal", "Applying to all people everywhere, without distinction of race, sex, religion or nation."]],
      v: vUdhr,
      vs: [vTogether],
    },
  ],
  tips: "**Common mistakes**\n- Writing **26 June** as the founding day (that was the signing; the UN came into existence on **24 October 1945**).\n- Giving the General Assembly the veto (it has **none**).\n- Saying any **no** vote is a veto (only a **permanent** member's no on a **substantive** matter).\n- Treating an **abstention** as a veto.\n- Saying individuals can sue at the **ICJ** (only **states**).\n- Mixing up the cities: UNICEF **New York**, WHO **Geneva**, UNESCO **Paris**, ICJ **The Hague**.\n\n**How marks are usually awarded**\n- 1-mark items: one correct option or term.\n- 2 marks: two distinct points.\n- 10-mark questions in 3 + 3 + 4 parts: one point per mark; the 4-mark part often asks you to explain, apply or evaluate.",
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ["Charter signed", "**26 June 1945**, San Francisco.", "fact", 1],
  ["United Nations Day", "**24 October**: the Charter came into force in 1945.", "fact", 1],
  ["Headquarters", "**New York**.", "fact", 1],
  ["Original members", `**${FOUNDERS}**, including India.`, "fact", 1],
  ["Members (as of 2024)", `**${MEMBERS}**.`, "fact", 1],
  ["First objective", "Maintain international **peace and security**.", "concept", 1],
  ["Other objectives", "Friendly relations; international cooperation; human rights; a centre for harmonising actions.", "concept", 1],
  ["Six principal organs", "General Assembly, Security Council, Economic and Social Council, Trusteeship Council, ICJ, Secretariat.", "fact", 2],
  ["General Assembly: votes", "**One vote** per member; up to five representatives.", "fact", 2],
  ["Important questions", "**Two-thirds** of members present and voting.", "definition", 2],
  ["Elective functions of the Assembly", "Non-permanent Council members; with the Council, ICJ judges, new members, the Secretary-General.", "concept", 2],
  ["Budgetary function", "The General Assembly approves the budget and fixes contributions.", "fact", 2],
  ["Security Council size", `**${SC_SIZE}**: five permanent, ${NONPERM} non-permanent.`, "fact", 3],
  ["Permanent members", "China, France, Russia, the United Kingdom, the United States.", "fact", 3],
  ["Non-permanent term", `**${NONPERM_TERM} years**; five elected each year; no immediate re-election.`, "fact", 3],
  ["Veto", "A permanent member's **no** on a **substantive** matter blocks it.", "definition", 3],
  ["Abstention", "By practice, **not** a veto.", "exam-tip", 3],
  ["Votes needed (substantive)", `**${SC_PASS}**, with no permanent member voting no.`, "fact", 3],
  ["Council's powers", "Investigate, recommend settlement, sanctions, military action, peacekeeping.", "concept", 3],
  ["ICJ seat", "**The Hague** (Peace Palace).", "fact", 4],
  ["ICJ judges", `**${ICJ_JUDGES}**, ${ICJ_TERM}-year terms; no two of one nationality.`, "fact", 4],
  ["Who elects ICJ judges", "The General Assembly and the Security Council, voting separately.", "fact", 4],
  ["Contentious vs advisory", "Disputes between states vs legal opinions for UN organs.", "concept", 4],
  ["Can a citizen sue at the ICJ?", "**No**: only states are parties.", "exam-tip", 4],
  ["UNICEF", "**1946**, **New York**: children's health, food, water, relief, education.", "fact", 5],
  ["WHO", "**1948**, **Geneva**: health standards, epidemics, immunisation.", "fact", 5],
  ["UNESCO", "**1945**, **Paris**: education, science, culture, World Heritage List.", "fact", 5],
  ["UDHR adopted", `**10 December ${UDHR_YEAR}**, General Assembly, Paris.`, "fact", 6],
  ["UDHR meaning", "A **common standard** of rights and freedoms for every person; not a binding treaty.", "definition", 6],
  ["League vs United Nations", "The UN has all the great powers and a Council that can enforce decisions.", "exam-tip", 1],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: "short",
  blueprint: "icse-10-history-civics-chapter-test-short",
  title: "Chapter test (short) — The United Nations",
  duration: 30,
  sections: [
    { id: "I", title: "Part I — Compulsory (10 marks)", instr: "Attempt all questions. Questions 1–6 carry 1 mark each; questions 7 and 8 carry 2 marks each.", items: ["m_obj_peace", "m_ga_members", "m_sc_p5", "m_icj_seat", "m_unicef_hq", "ar_league_lesson", "s_obj_two", "s_sc_comp"] },
    { id: "II", title: "Part II — Structured question (10 marks)", instr: "Attempt any ONE of the two questions. Each is in three parts (3 + 3 + 4 marks).", items: [{ attempt: 1, keys: ["l_ga_full", "l_icj_full"] }] },
  ],
});
const T_LONG = test({
  kind: "long",
  blueprint: "icse-10-history-civics-chapter-test-long",
  title: "Chapter test (long) — The United Nations",
  duration: 60,
  sections: [
    { id: "I", title: "Part I — Compulsory (20 marks)", instr: "Attempt all questions. Questions 1–10 carry 1 mark each; questions 11–15 carry 2 marks each.", items: ["m_founding_day", "m_obj_scenario", "m_ga_important", "m_ga_budget", "m_vote_veto", "m_vote_abstain", "m_icj_election", "m_agency_vaccine", "m_udhr_meaning", "ar_sc_continuous", "s_league_vs_un", "s_ga_comp", "s_veto_two", "s_icj_functions", "s_udhr_meaning"] },
    { id: "II", title: "Part II — Structured questions (20 marks)", instr: "Attempt any TWO of the three questions. Each is in three parts (3 + 3 + 4 marks).", items: [{ attempt: 2, keys: ["l_sc_full", "l_agencies_full", "l_udhr_rights"] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: "topics t01–t06 of icse-10-history-civics-ch17 only (objectives; General Assembly; Security Council and veto; ICJ; UNICEF, WHO and UNESCO with headquarters and functions only; Universal Declaration of Human Rights, meaning only)",
    originality: "every diary, newsletter, note and scenario is imagined and written by SOYL (labelled); no textbook text or exercise and no specimen or board-paper item reused (D-036); no wording of the Charter or the Declaration quoted",
    data: `Security Council votes computed by rule (${SC_PASS} yes and no permanent no): A ${scPasses(V_A) ? "passes" : "fails"}, B ${scPasses(V_B) ? "passes" : "fails"}, C ${scPasses(V_C) ? "passes" : "fails"}, D ${scPasses(V_D) ? "passes" : "fails"}; two-thirds of ${GA_PRESENT} = ${twoThirds(GA_PRESENT)}; ${NONPERM} non-permanent seats / ${NONPERM_TERM} years = 5 a year; ${ICJ_JUDGES} judges / 3 = 5 every three years`,
    facts: `Charter signed San Francisco 26 June 1945; in force 24 October 1945; HQ New York; ${FOUNDERS} original members incl. India; ${MEMBERS} members as of 2024; GA one vote each, two-thirds on important questions; SC ${SC_SIZE} members, P5 China, France, Russia, UK, USA, ${NONPERM} non-permanent for ${NONPERM_TERM} years; ICJ ${ICJ_JUDGES} judges, ${ICJ_TERM} years, The Hague; UNICEF 1946 New York; WHO 1948 Geneva (7 April); UNESCO 1945 Paris; UDHR 10 December ${UDHR_YEAR}, Paris`,
    gate: "schema, content lint (lintExemplar), deterministic verify, originality pre-check and the editorial counts run clean on this chapter",
  },
});
