// ICSE 10 History & Civics, ch18 The Non-Aligned Movement — question bank. Every diary, letter, talk and quiz
// scenario is imagined and written by SOYL and labelled as imagined; imagined countries carry invented names. No
// textbook text, box or exercise and no specimen or board-paper item is reused (D-036). No speech or writing of any
// historical person is quoted: ideas are paraphrased. The five principles of Panchsheel are shown for understanding
// only; no item asks a student to list or name them (removed topic). Facts are stable dates and names, listed in the
// README for a reviewer.
import assert from "node:assert/strict";
import { Q, mcq, ar, tf, fb, match, ord, short, long, source, child, Svg } from "../../icse-10-history-civics-ch01/src/lib.mjs";

const S2 = [25, 45];
const S3 = [40, 70];
const L10 = [120, 220];
const IMAG = "*(Imagined document written by SOYL for practice; the people in it are not real.)*";

// ---------------------------------------------------------------- dates used in items (asserted in order)
export const EVENTS = [
  [1947, "India becomes free"],
  [1949, "NATO formed"],
  [1954, "Panchsheel agreement"],
  [1955, "Bandung conference"],
  [1955, "Warsaw Pact"],
  [1956, "Brioni talks"],
  [1961, "Belgrade summit"],
];
for (let i = 1; i < EVENTS.length; i++) assert.ok(EVENTS[i][0] >= EVENTS[i - 1][0], "events in date order");
export const PANCHSHEEL = 1954;
export const BANDUNG = 1955;
export const BELGRADE = 1961;
export const BELGRADE_STATES = 25;
export const ARCHITECTS = [
  ["Jawaharlal Nehru", "India"],
  ["Josip Broz Tito", "Yugoslavia"],
  ["Gamal Abdel Nasser", "Egypt"],
  ["Sukarno", "Indonesia"],
  ["Kwame Nkrumah", "Ghana"],
];
assert.equal(ARCHITECTS.length, 5);
assert.equal(BELGRADE - PANCHSHEEL, 7); // seven years from the agreement to the first summit
assert.equal(BELGRADE - BANDUNG, 6);

/** Three groups of states in the Cold War years, drawn as boxes (theme colours only). */
export function groupsSvg(alt, caption) {
  const s = new Svg(760, 320);
  s.rect(10, 20, 230, 250, { rx: 12, fill: "blue", fillOpacity: 0.12, color: "blue", sw: 2 });
  s.text(125, 44, "Western bloc", { size: 13, bold: true, color: "blue" });
  ["Led by the USA", "Military alliance:", "NATO (1949)"].forEach((c, i) => s.text(125, 90 + i * 34, c, { size: 12 }));
  s.rect(520, 20, 230, 250, { rx: 12, fill: "red", fillOpacity: 0.12, color: "red", sw: 2 });
  s.text(635, 44, "Eastern bloc", { size: 13, bold: true, color: "red" });
  ["Led by the USSR", "Military alliance:", "Warsaw Pact (1955)"].forEach((c, i) => s.text(635, 90 + i * 34, c, { size: 12 }));
  s.rect(270, 50, 220, 190, { rx: 12, fill: "green", fillOpacity: 0.14, color: "green", sw: 2 });
  s.text(380, 74, "Non-aligned states", { size: 13, bold: true, color: "green" });
  ["India, Yugoslavia, Egypt,", "Indonesia, Ghana", "and many others", "No military pact", "with either bloc"].forEach((c, i) => s.text(380, 104 + i * 26, c, { size: 12 }));
  s.line(240, 145, 268, 145, { sw: 1.6, dash: true, color: "muted" });
  s.line(492, 145, 518, 145, { sw: 1.6, dash: true, color: "muted" });
  s.text(380, 296, "Schematic, drawn by SOYL", { size: 11, muted: true });
  return s.visual(alt, caption);
}

/** A horizontal timeline from 1945 to 1965 with labels in lanes. */
export function timelineSvg(alt, caption, events = EVENTS) {
  const W = 800, H = 380, x0 = 50, x1 = 750, y = 190, a = 1945, b = 1965;
  const X = (yr) => x0 + ((yr - a) / (b - a)) * (x1 - x0);
  const s = new Svg(W, H);
  s.line(x0, y, x1, y, { sw: 2 });
  for (const yr of [1945, 1950, 1955, 1960, 1965]) {
    s.line(X(yr), y - 5, X(yr), y + 5, { sw: 1.2, color: "muted" });
    s.text(X(yr), y + 18, String(yr), { size: 11, muted: true });
  }
  const lanes = [-40, 50, -80, 90, -130, 140, -40];
  const anchors = ["start", "middle", "end", "middle", "start", "middle", "middle"];
  events.forEach(([yr, label], i) => {
    const dy = lanes[i];
    const px = X(yr);
    s.line(px, y, px, y + dy + (dy < 0 ? 8 : -8), { sw: 1, color: "muted" });
    s.dot(px, y, 4, i % 2 ? "blue" : "accent");
    s.text(px, y + dy, `${yr} ${label}`, { size: 11, color: i % 2 ? "blue" : "accent", anchor: anchors[i] });
  });
  return s.visual(alt, caption);
}

export const TL_ALT = "Timeline from 1945 to 1965 marking: 1947 India becomes free, 1949 NATO formed, 1954 Panchsheel agreement between India and China, 1955 Bandung conference of Asian and African states, 1955 Warsaw Pact, 1956 talks at Brioni between Nehru, Tito and Nasser, and 1961 first summit of the Non-Aligned Movement at Belgrade";
export const GROUPS_ALT = "Three boxes: on the left the Western bloc led by the USA with NATO of 1949; on the right the Eastern bloc led by the USSR with the Warsaw Pact of 1955; in the middle the non-aligned states such as India, Yugoslavia, Egypt, Indonesia and Ghana, with no military pact with either bloc";

// ================================================================ t01 Meaning and objectives
Q("m_meaning_bloc", mcq({
  t: 1, d: 1, c: "understanding",
  stem: "In the Cold War years, a newly free country of Asia that refused to join either the American-led or the Soviet-led military alliance was following a policy of",
  opts: ["non-alignment", "appeasement", "isolation", "collective security"],
  sol: "Staying out of both military blocs while taking an active part in world affairs is non-alignment. Appeasement meant giving way to an aggressor, isolation means cutting oneself off, and collective security was the League's idea of joint action.",
}));
Q("m_not_neutral", mcq({
  t: 1, d: 3, c: "analysis",
  stem: "Which statement correctly separates non-alignment from strict neutrality?",
  opts: ["A non-aligned state judged each world issue on its merits and spoke out, while a neutral state keeps out of disputes altogether", "A non-aligned state joined one bloc in wartime only, while a neutral state never did", "A non-aligned state refused all trade with the superpowers, while a neutral state traded with both", "There is no difference; the two words mean exactly the same"],
  sol: "Non-alignment was active: members took positions on colonialism, racism and peace. Neutrality means standing aside from a conflict. Non-aligned states traded with and took aid from both sides and did not join a bloc even in war.",
}));
Q("m_obj_colonialism", mcq({
  t: 1, d: 1, c: "recall",
  stem: "Which of these was one of the aims of the Non-Aligned Movement from its first summit?",
  opts: ["To work for an end to colonial rule everywhere", "To join the North Atlantic alliance as a group", "To build nuclear weapons for each member", "To set up a single government for the whole world"],
  sol: "Most founding members had themselves been colonies, and ending colonialism was a central aim. The movement kept away from military alliances, called for disarmament and respected each member's sovereignty.",
}));
Q("m_obj_apartheid", mcq({
  t: 1, d: 2, c: "understanding",
  stem: "Non-aligned countries repeatedly condemned the system of apartheid in South Africa. This reflects which aim of the movement?",
  opts: ["Ending racial discrimination", "Spreading one economic system", "Supporting one superpower against the other", "Building military bases abroad"],
  sol: "Apartheid was a system of racial segregation, and opposing racial discrimination was one of the movement's stated aims. The other options describe bloc politics, which the movement rejected.",
}));
Q("m_scn_aid", mcq({
  t: 1, d: 3, c: "analysis",
  stem: "The imagined republic of Saranpur, free since 1950, buys steel plants from one superpower and food grain from the other and speaks freely at the United Nations. It has also let the first superpower supply and train its army and run a radar station on its coast, though no treaty has been signed. A commentator says trade with both sides proves Saranpur is non-aligned. Which assessment is best?",
  opts: ["The trade and the independent voice do not settle the matter; the army links and the radar station tie its security to one side, so its non-alignment is doubtful", "Trade with both sides is the test of non-alignment, so Saranpur is fully non-aligned whatever else it allows", "Speaking freely at the United Nations shows Saranpur is fully non-aligned, since military links do not count", "Any dealings with a superpower, even trade, would place Saranpur inside that superpower's bloc"],
  sol: "Non-alignment was judged mainly by freedom from military ties to a bloc, with an independent voice. Here two features pull apart: even trade and an open voice are present, but supply, training and a base-like station tie security to one side. Trade alone is not the test, and ordinary trade or aid did not make a state a bloc member, so the last option overstates.",
}));
Q("m_scn_base", mcq({
  t: 1, d: 3, c: "analysis",
  stem: "Two imagined states, Alta and Berin, both stay out of every military alliance. Alta takes aid from both superpowers and, in world meetings, judges each question on its merits, speaking against colonial rule and racial discrimination. Berin has promised to take no stand on any dispute and to abstain every time. Which comparison is correct?",
  opts: ["Alta's active policy matches non-alignment as the movement understood it, while Berin's silence is closer to neutrality", "Berin is the truer non-aligned state, because it avoids offending either bloc on any question", "Neither is non-aligned, since Alta takes aid from the superpowers and Berin takes no stand", "Both are simply neutral, since staying out of alliances is all that either word means"],
  sol: "Both avoid blocs, but non-alignment was active: members spoke out on colonialism, racism and peace and took aid from both sides. Berin's promise to stay silent and abstain is the stand-aside attitude of neutrality. Aid did not end non-alignment, and the two words are not the same.",
}));
Q("m_scn_vote", mcq({
  t: 1, d: 3, c: "analysis",
  stem: "An imagined critic notes that the non-aligned state of Marnia voted with one superpower on nine of ten United Nations questions in a year. Marnia gave its reasons for each vote, signed no pact and allowed no foreign base. The critic says the record proves Marnia is in that superpower's bloc. Which reply is best?",
  opts: ["Agreeing often is not bloc membership; membership meant military commitments and following the bloc's line whatever the merits, and Marnia has neither", "The critic is right, because a state that agrees with a superpower nine times in ten has in effect joined it", "The critic is wrong, because a non-aligned state had to vote against both superpowers equally often", "The critic is wrong, because non-alignment applied to wars and had no bearing on votes at the United Nations"],
  sol: "Non-alignment meant judging each issue on its merits, so frequent agreement with one power can happen when the merits point that way. What marked a bloc member was a military commitment and a fixed line. Marnia has neither. Nothing required equal opposition to both sides, and non-aligned states did speak and vote on world issues.",
}));
Q("m_disarm", mcq({
  t: 1, d: 2, c: "understanding",
  stem: "The non-aligned countries kept calling for disarmament in the 1960s and 1970s mainly because",
  opts: ["the arms race between the two blocs, including nuclear weapons, threatened world peace", "they wanted to sell weapons to the superpowers", "they had large armies of their own", "the United Nations had banned all armies"],
  sol: "The arms race between the blocs, above all in nuclear weapons, endangered everyone, and the money could have gone to development. The other options are untrue.",
}));
Q("m_economic", mcq({
  t: 1, d: 3, c: "analysis",
  stem: "Why did the non-aligned countries also demand a fairer world economic order?",
  opts: ["Most of them were poor former colonies whose trade and loans were on terms set by richer states", "They wanted to end all trade between countries", "They were richer than the superpowers", "They wished to return to colonial rule"],
  sol: "Political freedom had to be matched by economic progress. Many members depended on exporting raw materials at low prices and on loans from richer countries, so they asked for fairer terms of trade and aid.",
}));
Q("m_un_support", mcq({
  t: 1, d: 2, c: "understanding",
  stem: "How did the non-aligned countries view the United Nations?",
  opts: ["As a forum where small and newly free states could raise their voice and settle disputes peacefully", "As an alliance that they had to leave", "As a body controlled by them alone", "As an organisation that should be closed down"],
  sol: "The movement wanted to strengthen the United Nations, where every member had a vote in the General Assembly and disputes could be settled peacefully.",
}));
Q("m_newly_free", mcq({
  t: 1, d: 3, c: "analysis",
  stem: "Why did so many countries that became free in Asia and Africa after 1945 find non-alignment attractive?",
  opts: ["Joining a bloc could have brought a new kind of outside control over their hard-won freedom", "They had no armies and could not join any alliance", "The United Nations forbade new states from joining alliances", "Both superpowers refused to accept new members"],
  sol: "Having just escaped colonial rule, these states did not want to fall under the influence of either bloc. Nothing forbade them to join an alliance, and both blocs were keen to win them over.",
}));
Q("ar_nonalign_neutral", ar({
  t: 1, d: 3, c: "analysis", verdict: "both-true-explains",
  a: "Non-alignment is not the same as neutrality.",
  r: "Non-aligned countries took clear positions on world issues such as colonialism and the arms race.",
  sol: "Both are true, and R explains A: a neutral state stands aside, while non-aligned states spoke out and judged each issue on its merits, which is why the two ideas differ.",
}));
Q("ar_colonial", ar({
  t: 1, d: 2, c: "analysis", verdict: "both-true-explains",
  a: "The Non-Aligned Movement opposed colonialism.",
  r: "Most of its founding members had themselves recently won freedom from colonial rule.",
  sol: "Both are true, and R explains A: countries that had suffered colonial rule wanted it ended everywhere.",
}));
Q("ar_nehru_aid", ar({
  t: [1, 3], d: 3, c: "analysis", verdict: "A-true-R-false",
  a: "India received economic help from countries of both Cold War blocs in the 1950s.",
  r: "India was a member of the western military alliance formed in 1949.",
  sol: "A is true: India took aid and technical help from both sides. R is false: India never joined NATO; staying out of both alliances was the heart of its non-aligned policy.",
}));
Q("tf_join_bloc", tf({
  t: 1, d: 1, c: "understanding", ans: false,
  stem: "True or false? To be a member of the Non-Aligned Movement, a country had to sign a defence treaty with one of the superpowers.",
  sol: "False. Members stayed out of the military alliances of both blocs; that is what non-aligned means.",
}));
Q("tf_nam_disarm", tf({
  t: 1, d: 1, c: "recall", ans: true,
  stem: "True or false? Promoting world peace and disarmament was one of the aims of the Non-Aligned Movement.",
  sol: "True. Members called for an end to the arms race, especially in nuclear weapons.",
}));
Q("s_meaning_two", short({
  t: 1, d: 1, c: "understanding", marks: 2, wl: S2,
  stem: "Explain in two points what non-alignment meant for a newly free country during the Cold War.",
  model: "1. **Not joining** either the **American-led** or the **Soviet-led** military bloc or alliance.\n2. Following an **independent foreign policy**, judging each issue on its **merits** and keeping friendly ties with all.",
  sol: "Two points: no bloc membership; independent judgement.",
  scheme: [["Not joining either bloc", 1], ["Independent foreign policy", 1]],
}));
Q("s_not_neutral", short({
  t: 1, d: 3, c: "analysis", marks: 2, wl: S2,
  stem: "Give two differences between non-alignment and neutrality.",
  model: "1. A **neutral** state keeps out of disputes, but a **non-aligned** state takes **positions** on world issues on their merits.\n2. Non-alignment is an **active** policy that works for **peace** and against colonialism, not merely standing aside.",
  sol: "Two contrasts.",
  scheme: [["First difference", 1], ["Second difference", 1]],
}));
Q("s_obj_two_political", short({
  t: 1, d: 1, c: "recall", marks: 2, wl: S2,
  stem: "State two political aims of the Non-Aligned Movement.",
  model: "1. To protect the **independence** and **sovereignty** of newly free nations by keeping out of the **blocs**.\n2. To end **colonialism**, **imperialism** and **racial discrimination** such as apartheid.",
  sol: "Any two political aims.",
  scheme: [["First aim", 1], ["Second aim", 1]],
}));
Q("s_obj_two_economic", short({
  t: 1, d: 2, c: "understanding", marks: 2, wl: S2,
  stem: "Mention two economic aims that the non-aligned countries pursued together.",
  model: "1. Faster **economic development** of poor member states, with **aid** that carried no political conditions.\n2. A **fairer world economic order**, with better prices and terms of **trade** for developing countries.",
  sol: "Two economic aims.",
  scheme: [["Development and aid", 1], ["Fair terms of trade", 1]],
}));
Q("s_newly_free_two", short({
  t: 1, d: 3, c: "analysis", marks: 2, wl: S2,
  stem: "Why did newly independent nations prefer to stay outside the two Cold War blocs? Give two reasons.",
  model: "1. They wanted to keep their hard-won **freedom** and not fall under **new outside control**.\n2. They needed **peace** and money for **development**, not for an **arms race** or a war between blocs.",
  sol: "Two reasons.",
  scheme: [["Protect freedom", 1], ["Peace and development", 1]],
}));
Q("s_relevance_two", short({
  t: 1, d: 4, c: "evaluation", marks: 2, wl: S2,
  stem: "The Cold War ended about 1991, yet the Non-Aligned Movement continued to meet. Suggest two reasons why its members found it still useful.",
  model: "1. It remained a **common platform** for developing countries to raise **poverty** and **development** issues.\n2. Members could press together for **reform** of world bodies and **fairer trade**, and keep an **independent** voice.",
  sol: "Any two reasoned points.",
  scheme: [["First reason", 1], ["Second reason", 1]],
}));
Q("s3_objectives_three", short({
  t: 1, d: 2, c: "understanding", marks: 3, wl: S3,
  stem: "Describe three objectives of the Non-Aligned Movement.",
  model: "1. **Independence:** to keep newly free states out of the **military blocs** so that they could follow their own policies.\n2. **Against colonialism and racism:** to end **colonial rule** and **racial discrimination** such as apartheid.\n3. **Peace and development:** to promote **disarmament** and **peaceful coexistence**, and to seek **economic progress** and a **fairer** world economy.",
  sol: "Three distinct objectives.",
  scheme: [["First objective", 1], ["Second objective", 1], ["Third objective", 1]],
}));
Q("s3_scn_policy", short({
  t: 1, d: 3, c: "application", marks: 3, wl: S3,
  stem: "The imagined island republic of Tamravati, free since 1958, accepts doctors from one superpower, buys wheat from the other, refuses both their offers of a military pact, and speaks at the United Nations against colonial rule in Africa. Identify three features of non-alignment in its policy.",
  model: "1. **No bloc membership:** it refuses both **military pacts**.\n2. **Friendly ties with both** sides: it takes **help** and trade from each superpower.\n3. **Active**, not neutral: it **speaks out** against **colonialism**, judging the issue on its merits.",
  sol: "Three features matched to the facts.",
  scheme: [["Refuses pacts", 1], ["Ties with both", 1], ["Active against colonialism", 1]],
}));

// ================================================================ t02 Panchsheel
Q("m_panch_meaning", mcq({
  t: 2, d: 1, c: "recall",
  stem: "The term Panchsheel, often linked with India's foreign policy in the 1950s, refers to",
  opts: ["five principles of peaceful coexistence between states", "five military alliances in Asia", "five founding members of the United Nations", "five five-year plans of India"],
  sol: "Panchsheel means five principles, the principles of peaceful coexistence set out in 1954. It has nothing to do with alliances, the United Nations or the five-year plans.",
}));
Q("m_panch_year", mcq({
  t: 2, d: 2, c: "recall",
  stem: "The principles called Panchsheel were first set out in a 1954 agreement between India and",
  opts: ["China", "Pakistan", "the USSR", "Indonesia"],
  sol: "They were set out in the agreement of 29 April 1954 between India and China. The other countries are not parties to that agreement.",
}));
Q("m_panch_link", mcq({
  t: 2, d: 3, c: "analysis",
  stem: "How was the idea behind Panchsheel connected with the Non-Aligned Movement?",
  opts: ["Its idea of peaceful coexistence among states with different systems became a guiding idea of non-aligned foreign policy", "It created the Non-Aligned Movement as a military alliance", "It required members to accept one economic system", "It made India and China members of the two blocs"],
  sol: "Peaceful coexistence, the core of Panchsheel, fitted the non-aligned wish to live in peace with all, whatever their system. Panchsheel was not an alliance and did not tie anyone to a bloc.",
}));
Q("m_scn_panch", mcq({
  t: 2, d: 3, c: "application",
  stem: "Two imagined neighbouring states, Velora (a monarchy) and Durmak (a republic), sign an agreement in the spirit of Panchsheel: peace, talks to settle disputes, and respect for each other's borders and internal affairs. A year later, Velora's radio begins daily broadcasts urging Durmak's citizens to overthrow their government, though no soldier crosses the border. Which assessment is best?",
  opts: ["The broadcasts go against the spirit of the agreement, because peaceful coexistence includes leaving each other's internal affairs alone, even without any border crossing", "The broadcasts do not breach it, because the agreement dealt only with armies and borders, and none has been crossed", "The agreement was void from the start, because a monarchy and a republic cannot coexist peacefully", "The broadcasts show that Velora has joined the bloc opposed to Durmak's"],
  sol: "Non-interference in internal affairs is part of the idea of peaceful coexistence, so urging a rising against the neighbour's government breaks the spirit even though no border is crossed. The agreement was meant to let different systems live side by side, and broadcasts alone do not show bloc membership.",
}));
Q("ar_panch_coexist", ar({
  t: 2, d: 2, c: "analysis", verdict: "A-true-R-false",
  a: "Panchsheel promoted the idea of peaceful coexistence.",
  r: "Panchsheel was a military alliance between India and China.",
  sol: "A is true: Panchsheel stood for peaceful coexistence. R is false: it was a set of principles in an agreement, not a military alliance.",
}));
Q("fb_five", fb({
  t: 2, d: 1, c: "recall",
  stem: "The word Panchsheel means ___ principles.",
  acc: [["five", "5"]],
  sol: "Panch means five: Panchsheel means five principles.",
}));
Q("s_panch_meaning", short({
  t: 2, d: 1, c: "understanding", marks: 2, wl: S2,
  stem: "What is meant by Panchsheel? When and between which countries was it first set out?",
  model: "Panchsheel means **five principles** of **peaceful coexistence** between states. They were first set out in an agreement between **India** and **China** in **1954**.",
  sol: "Meaning; 1954; India and China.",
  scheme: [["Meaning", 1], ["Year and countries", 1]],
}));
Q("s_panch_india", short({
  t: 2, d: 3, c: "analysis", marks: 2, wl: S2,
  stem: "How did the idea of Panchsheel fit with India's wider foreign policy in the 1950s? Give two points.",
  model: "1. Its idea of **peaceful coexistence** matched India's wish to stay **friendly with all** states and out of the **blocs**.\n2. It was carried into wider Asian and African meetings such as **Bandung (1955)** and influenced **non-alignment**.",
  sol: "Two links.",
  scheme: [["Peaceful coexistence and friendship with all", 1], ["Spread to Bandung and non-alignment", 1]],
}));
Q("s3_panch_three", short({
  t: 2, d: 3, c: "analysis", marks: 3, wl: S3,
  stem: "Explain the meaning of Panchsheel, its origin and one way it influenced international relations in Asia and Africa.",
  model: "1. **Meaning:** five principles of **peaceful coexistence**, so that states with different systems could live side by side.\n2. **Origin:** set out in the **India–China** agreement of **29 April 1954**.\n3. **Influence:** its spirit was taken up at the **Bandung** conference of **1955** and shaped the **non-aligned** idea of peace with all.",
  sol: "Meaning, origin, influence.",
  scheme: [["Meaning", 1], ["Origin", 1], ["Influence", 1]],
}));

// ================================================================ t03 Nehru and the architects
Q("m_belgrade_city", mcq({
  t: 3, d: 1, c: "recall",
  stem: "The first summit conference of the Non-Aligned Movement, held in September 1961, met in the city of",
  opts: ["Belgrade", "Bandung", "Geneva", "New York"],
  sol: "The first summit met at Belgrade, then the capital of Yugoslavia. Bandung hosted the Afro-Asian conference of 1955; Geneva and New York were seats of the League and the United Nations.",
}));
Q("m_tito_country", mcq({
  t: 3, d: 1, c: "recall",
  stem: "Josip Broz Tito, one of the architects of the Non-Aligned Movement, was the leader of",
  opts: ["Yugoslavia", "Egypt", "Indonesia", "Ghana"],
  sol: "Tito led Yugoslavia. Egypt was led by Nasser, Indonesia by Sukarno and Ghana by Nkrumah.",
}));
Q("m_nasser", mcq({
  t: 3, d: 1, c: "recall",
  stem: "Which country did Gamal Abdel Nasser, a founder of the Non-Aligned Movement, lead?",
  opts: ["Egypt", "Yugoslavia", "Indonesia", "India"],
  sol: "Nasser was the leader of Egypt. Tito led Yugoslavia, Sukarno Indonesia, and Nehru India.",
}));
Q("m_sukarno", mcq({
  t: 3, d: 2, c: "recall",
  stem: "Which architect of the Non-Aligned Movement was the leader of the country that hosted the Asian–African conference of 1955?",
  opts: ["Sukarno of Indonesia", "Kwame Nkrumah of Ghana", "Josip Broz Tito of Yugoslavia", "Gamal Abdel Nasser of Egypt"],
  sol: "The 1955 conference met at Bandung in Indonesia, whose leader was Sukarno.",
}));
Q("m_nkrumah", mcq({
  t: 3, d: 2, c: "recall",
  stem: "Kwame Nkrumah, counted among the architects of the Non-Aligned Movement, led which African country?",
  opts: ["Ghana", "Egypt", "Kenya", "Nigeria"],
  sol: "Nkrumah led Ghana. Egypt was led by Nasser; Kenya and Nigeria are not linked to the five architects usually named.",
}));
Q("m_nehru_role", mcq({
  t: 3, d: 2, c: "understanding",
  stem: "Which statement best describes Jawaharlal Nehru's part in the Non-Aligned Movement?",
  opts: ["He was one of its principal architects and made non-alignment the basis of India's foreign policy", "He opposed the movement and took India into a military bloc", "He played no part, as India joined the movement only in the 1990s", "He founded it alone at the Bandung conference"],
  sol: "Nehru was a leading architect: he shaped India's non-aligned policy from 1947 and worked with Tito, Nasser, Sukarno and Nkrumah. India was a founder member, and the movement was the work of several leaders, not one.",
}));
Q("m_bandung_role", mcq({
  t: 3, d: 2, c: "understanding",
  stem: "Why is the Bandung conference of April 1955 seen as an important step towards the Non-Aligned Movement?",
  opts: ["It brought Asian and African countries together to speak for peace and against colonialism", "It was the first summit of the Non-Aligned Movement itself", "It created the Warsaw Pact", "It ended the Second World War"],
  sol: "Bandung gathered newly free Asian and African states and set out shared ideas of peace and anti-colonialism. The first non-aligned summit came later, at Belgrade in 1961.",
}));
Q("m_scn_odd", mcq({
  t: 3, d: 2, c: "recall",
  stem: "A quiz team lists four leaders as architects of the Non-Aligned Movement. Which name does NOT belong on the list?",
  opts: ["Winston Churchill", "Jawaharlal Nehru", "Josip Broz Tito", "Gamal Abdel Nasser"],
  sol: "Churchill led Britain, a member of the western bloc. Nehru, Tito and Nasser were architects of the movement, along with Sukarno and Nkrumah.",
}));
Q("m_scn_chart", mcq({
  t: 3, d: 3, c: "recall",
  stem: "An imagined student's revision chart reads: Nehru, India; Tito, Egypt; Nasser, Yugoslavia; Sukarno, Indonesia. Which correction does the chart need?",
  opts: ["Tito and Nasser's countries should be swapped", "Nehru and Sukarno's countries should be swapped", "Sukarno should be shown as the leader of Ghana", "No correction is needed"],
  sol: "The Yugoslav and Egyptian entries have been swapped: Tito's country was Yugoslavia and Nasser's was Egypt. The pairs for Nehru (India) and Sukarno (Indonesia) need no change.",
}));
Q("m_india_why", mcq({
  t: 3, d: 3, c: "analysis",
  stem: "Why did India, under Nehru, choose non-alignment soon after 1947?",
  opts: ["To keep the freedom to judge each issue for itself and to focus on development with help from both sides", "Because India had no diplomatic relations with any superpower", "Because the Indian Constitution forbids treaties of any kind", "Because India wanted to join the Eastern bloc secretly"],
  sol: "India wanted to protect its newly won independence of judgement, avoid being drawn into bloc rivalry and gain help for development from both sides. India had relations with both superpowers, and the Constitution does not forbid treaties.",
}));
Q("m_belgrade_number", mcq({
  t: 3, d: 2, c: "recall",
  stem: "About how many countries took part as members in the first non-aligned summit at Belgrade in 1961?",
  opts: [String(BELGRADE_STATES), "5", "51", "193"],
  sol: `About ${BELGRADE_STATES} countries took part as members. Five is the number of architects usually named, 51 is the number of founding members of the United Nations, and 193 is the United Nations' later membership.`,
}));
Q("ar_bandung", ar({
  t: 3, d: 2, c: "analysis", verdict: "A-false-R-true",
  a: "The Bandung conference of 1955 was held in Europe.",
  r: "The Bandung conference brought together countries of Asia and Africa.",
  sol: "A is false: Bandung is in Indonesia, in Asia. R is true: it was an Asian–African conference.",
}));
Q("ar_belgrade_un", ar({
  t: 3, d: 3, c: "analysis", verdict: "both-true-not-explains",
  a: "The first summit of the Non-Aligned Movement was held at Belgrade in 1961.",
  r: "The United Nations came into existence in 1945.",
  sol: "Both statements are true, but R does not explain A. The founding of the United Nations sixteen years earlier was not why the summit met at Belgrade; it met there because Yugoslavia, under Tito, was one of the movement's founders.",
}));
Q("fb_ghana", fb({
  t: 3, d: 1, c: "recall",
  stem: "Kwame Nkrumah, one of the architects of the Non-Aligned Movement, was the leader of ___.",
  acc: [["Ghana"]],
  sol: "Nkrumah led Ghana.",
}));
Q("match_architects", match({
  t: 3, d: 2, c: "understanding", marks: 2,
  stem: "Match each architect of the Non-Aligned Movement with the country he led.",
  pairs: [
    ["Josip Broz Tito", "Yugoslavia"],
    ["Gamal Abdel Nasser", "Egypt"],
    ["Sukarno", "Indonesia"],
    ["Kwame Nkrumah", "Ghana"],
  ],
  sol: "Tito led Yugoslavia, Nasser Egypt, Sukarno Indonesia and Nkrumah Ghana; Nehru, the fifth architect usually named, led India.",
}));
Q("ord_nam_steps", ord({
  t: [2, 3], d: 2, c: "understanding", marks: 1,
  stem: "Arrange these steps on the road to the Non-Aligned Movement in the order in which they happened.",
  items: [
    "India becomes independent",
    "India and China set out the Panchsheel principles",
    "Asian and African states meet at Bandung",
    "The first non-aligned summit meets at Belgrade",
  ],
  sol: "India's independence (1947), Panchsheel (1954), Bandung (1955), Belgrade (1961).",
}));
Q("s_nehru_two", short({
  t: 3, d: 2, c: "understanding", marks: 2, wl: S2,
  stem: "State two ways in which Jawaharlal Nehru contributed to the Non-Aligned Movement.",
  model: "1. He made **non-alignment** the basis of **India's foreign policy** from **1947**, staying out of both blocs.\n2. He worked with **Tito**, **Nasser**, **Sukarno** and **Nkrumah** to bring newly free states together, leading to **Belgrade (1961)**.",
  sol: "Two contributions.",
  scheme: [["India's policy", 1], ["Work with other leaders", 1]],
}));
Q("s_architects_two", short({
  t: 3, d: 1, c: "recall", marks: 2, wl: [12, 40],
  stem: "Name any four architects of the Non-Aligned Movement along with the country each one led.",
  model: "**Jawaharlal Nehru** (India), **Josip Broz Tito** (Yugoslavia), **Gamal Abdel Nasser** (Egypt) and **Sukarno** (Indonesia). **Kwame Nkrumah** (Ghana) may be named instead of any one of these.",
  sol: "Four correct names with countries.",
  scheme: [["Two correct pairs", 1], ["Two more correct pairs", 1]],
}));
Q("s_bandung_two", short({
  t: 3, d: 2, c: "understanding", marks: 2, wl: S2,
  stem: "How did the Bandung conference of 1955 prepare the ground for the Non-Aligned Movement? Give two points.",
  model: "1. It brought **Asian and African** states together for the first time to speak with **one voice**.\n2. It supported **peace**, **peaceful coexistence** and an end to **colonialism**, ideas later taken up at **Belgrade**.",
  sol: "Two points.",
  scheme: [["Asian-African unity", 1], ["Shared ideas carried forward", 1]],
}));
Q("s_belgrade_two", short({
  t: 3, d: 1, c: "recall", marks: 2, wl: [15, 45],
  stem: "When and where was the first summit of the Non-Aligned Movement held, and about how many countries took part as members?",
  model: `It was held in **September ${BELGRADE}** at **Belgrade**, in **Yugoslavia**, with about **${BELGRADE_STATES}** member countries taking part.`,
  sol: "Date, place, number.",
  scheme: [["Date and place", 1], ["Number of members", 1]],
}));
Q("s3_nehru_three", short({
  t: 3, d: 3, c: "analysis", marks: 3, wl: S3,
  stem: "Explain three ways in which Nehru shaped the Non-Aligned Movement.",
  model: "1. **Policy:** from **1947** he kept India out of both **military blocs** and made independent judgement the basis of foreign policy.\n2. **Ideas:** through **Panchsheel** (1954) and **Bandung** (1955) he spread the idea of **peaceful coexistence**.\n3. **Leadership:** with **Tito**, **Nasser**, **Sukarno** and **Nkrumah** he helped bring newly free nations together at **Belgrade (1961)**.",
  sol: "Policy, ideas, leadership.",
  scheme: [["India's policy", 1], ["Panchsheel and Bandung", 1], ["Leadership with other architects", 1]],
}));

// ================================================================ long answers (3 + 3 + 4)
Q("l_meaning_obj", long({
  t: 1, d: 3, c: "analysis", marks: 10, wl: L10,
  stem: "With reference to the Non-Aligned Movement, answer the following.\n\n(i) Explain the meaning of non-alignment during the Cold War. **[3]**\n(ii) State three of its objectives. **[3]**\n(iii) Explain four ways in which non-alignment helped newly independent countries. **[4]**",
  model: "(i) Non-alignment meant **not joining** either the **American-led** or the **Soviet-led** military bloc. A non-aligned country followed an **independent foreign policy**, kept **friendly** relations with all, and judged each world issue on its **merits**. It was **not neutrality**, because members spoke out on world issues.\n\n(ii) To end **colonialism** and **imperialism**; to oppose **racial discrimination** such as apartheid; and to promote **world peace** and **disarmament**.\n\n(iii) It protected their **freedom** from new outside control. It let them take **aid and trade** from both blocs for **development**. It kept them out of the **arms race**, saving money for their people. And acting **together** gave small states a stronger **voice** in the United Nations and in world affairs.",
  sol: "Meaning; three objectives; four benefits.",
  scheme: [["(i) Not joining either bloc", 1], ["(i) Independent policy, issues on merit", 1], ["(i) Not neutrality", 1], ["(ii) Three objectives", 3], ["(iii) Four benefits", 4]],
}));
Q("l_nehru", long({
  t: [1, 3], d: 3, c: "analysis", marks: 10, wl: L10,
  stem: "Answer the following about India and the Non-Aligned Movement.\n\n(i) Describe Jawaharlal Nehru's role in the movement. **[3]**\n(ii) Name three other architects of the movement and the country each led. **[3]**\n(iii) Explain four reasons why India chose to remain non-aligned after 1947. **[4]**",
  model: "(i) Nehru made **non-alignment** the basis of **India's foreign policy** from **1947**. He spread the idea of **peaceful coexistence** through **Panchsheel** and the **Bandung** conference, and worked with other leaders to bring newly free nations together at **Belgrade** in **1961**.\n\n(ii) **Josip Broz Tito** (Yugoslavia), **Gamal Abdel Nasser** (Egypt) and **Sukarno** (Indonesia); **Kwame Nkrumah** (Ghana) may be named instead.\n\n(iii) India wanted to protect its newly won **independence** and judge issues for itself. It needed **peace** and money for **development**, not for an arms race. Staying friendly with **both** sides brought **aid** and technology from each. And as a large former colony, India wished to **lead** Asian and African states against **colonialism** and for world peace.",
  sol: "Nehru's role; three architects; four reasons.",
  scheme: [["(i) Nehru's policy for India", 1], ["(i) Panchsheel and Bandung", 1], ["(i) Belgrade leadership", 1], ["(ii) Three architects with countries", 3], ["(iii) Four reasons", 4]],
}));
Q("l_panch", long({
  t: [1, 2], d: 3, c: "analysis", marks: 10, wl: L10,
  stem: "Answer the following about Panchsheel and peaceful coexistence.\n\n(i) What is meant by Panchsheel, and where was it first set out? **[3]**\n(ii) How was Panchsheel linked to India's foreign policy and to non-alignment? **[3]**\n(iii) Explain how the idea of peaceful coexistence could help reduce tension in a world divided into two blocs. **[4]**",
  model: "(i) Panchsheel means **five principles** of **peaceful coexistence** between states. They were first set out in the agreement between **India and China** of **29 April 1954**.\n\n(ii) Its spirit matched India's wish to stay **friendly with all** and out of the **blocs**. Nehru carried the idea to the **Bandung** conference of **1955**, and peaceful coexistence became a guiding idea of the **non-aligned** countries.\n\n(iii) It told states with **different systems** that they could live side by side **without war**. It encouraged settling disputes by **talks** rather than force. It discouraged **interference** in other countries' affairs, which often caused Cold War crises. And by spreading among many newly free states, it built a large group that urged both superpowers towards **peace and disarmament**.",
  sol: "Meaning and origin; link; how coexistence reduced tension.",
  scheme: [["(i) Meaning", 2], ["(i) India–China, 1954", 1], ["(ii) Link with India's policy", 1], ["(ii) Bandung and non-alignment", 2], ["(iii) Four ways", 4]],
}));
Q("l_bandung_belgrade", long({
  t: [1, 3], d: 3, c: "analysis", marks: 10, wl: L10,
  stem: "Two meetings, in 1955 and 1961, mark the rise of the non-aligned idea.\n\n(i) Describe the Asian–African conference held at Bandung in 1955. **[3]**\n(ii) Describe the first non-aligned summit held at Belgrade in 1961. **[3]**\n(iii) Explain how the two meetings together turned an idea into a movement. **[4]**",
  model: "(i) It met at **Bandung**, in **Indonesia**, in **April 1955**. Newly free **Asian and African** countries met without the big powers and spoke for **peace**, **peaceful coexistence** and an end to **colonialism**.\n\n(ii) It met at **Belgrade**, in **Yugoslavia**, in **September 1961**, with about **25** member countries. Leaders such as **Nehru**, **Tito**, **Nasser**, **Sukarno** and **Nkrumah** founded the **Non-Aligned Movement**.\n\n(iii) Bandung showed that many new states shared **common ideas**, but it was a single meeting of Asia and Africa. Belgrade gave those ideas a **name** and a **membership**, and the summits that followed made it a **continuing** movement. Belgrade also widened the group beyond Asia and Africa, since **Yugoslavia** was in Europe. Together they gave newly free states a **united voice** in world affairs.",
  sol: "Bandung; Belgrade; from idea to movement.",
  scheme: [["(i) Place and date", 1], ["(i) Who met and what they stood for", 2], ["(ii) Place, date, number", 2], ["(ii) Leaders and founding", 1], ["(iii) Four points", 4]],
}));
Q("l_cold_context", long({
  t: 1, d: 4, c: "evaluation", marks: 10, wl: L10,
  stem: "Answer the following about non-alignment and the Cold War.\n\n(i) Describe the two military blocs of the Cold War years. **[3]**\n(ii) Why were newly free states wary of joining either bloc? **[3]**\n(iii) Give arguments on both sides: was non-alignment a wise choice for a new nation in those years? **[4]**",
  model: "(i) The **Western bloc**, led by the **USA**, formed **NATO** in **1949**. The **Eastern bloc**, led by the **USSR**, formed the **Warsaw Pact** in **1955**. The two blocs distrusted each other and raced to build **weapons**.\n\n(ii) They feared **new outside control** over their freedom, being dragged into a **war** that was not theirs, and spending scarce money on **arms** instead of development.\n\n(iii) **For:** it kept their **independence**, brought **aid** from both sides, kept them out of the **arms race**, and gave them a **collective voice** at the United Nations. **Against:** without an alliance a state lacked a **protector** in a crisis, and both blocs sometimes **pressured** non-aligned states. On balance, for most new nations it **protected their freedom and development** at a time of great danger.",
  sol: "Blocs; reasons for caution; balanced evaluation.",
  scheme: [["(i) Western bloc and NATO", 1], ["(i) Eastern bloc and Warsaw Pact", 1], ["(i) Rivalry and arms race", 1], ["(ii) Three reasons", 3], ["(iii) Arguments for", 2], ["(iii) Arguments against with conclusion", 2]],
}));
Q("l_neutral_compare", long({
  t: 1, d: 4, c: "evaluation", marks: 10, wl: L10,
  stem: "Answer the following to show what non-alignment was and was not.\n\n(i) How did non-alignment differ from neutrality? **[3]**\n(ii) How did it differ from isolation? **[3]**\n(iii) The imagined state of Mirhan joins no bloc but stays silent on every world issue and trades with no one. Evaluate whether Mirhan follows non-alignment, giving four points. **[4]**",
  model: "(i) A **neutral** state keeps **out of disputes** altogether. A **non-aligned** state takes **positions** on issues such as colonialism and disarmament, judging each on its **merits**.\n\n(ii) An **isolated** state cuts itself off from world affairs. Non-aligned states were **active** in the **United Nations**, met at **summits**, and kept **trade and friendship** with countries of both blocs.\n\n(iii) Mirhan meets **one** test: it joins **no military bloc**. But it **stays silent** on world issues, so it is closer to **neutrality**. It **trades with no one**, which is **isolation**, not non-alignment. It does not work with other states for **peace** or against **colonialism**, as the movement did. So Mirhan is **not** truly non-aligned; it is merely standing apart.",
  sol: "Neutrality; isolation; evaluation of the case.",
  scheme: [["(i) Contrast with neutrality", 3], ["(ii) Contrast with isolation", 3], ["(iii) Four reasoned points with verdict", 4]],
}));
Q("l_groups_picture", long({
  t: [1, 3], d: 3, c: "application", marks: 10, wl: L10,
  stem: "Study the three-group diagram of the Cold War world drawn by SOYL and answer the questions.\n\n(i) Identify the two groups shown at the sides, with their leaders and military alliances. **[3]**\n(ii) Explain the position of the group shown in the middle, naming three of its leading countries. **[3]**\n(iii) Explain four aims that the middle group pursued together. **[4]**",
  model: "(i) On one side is the **Western bloc**, led by the **USA**, with **NATO** (**1949**). On the other is the **Eastern bloc**, led by the **USSR**, with the **Warsaw Pact** (**1955**).\n\n(ii) The middle group is the **non-aligned** states. They signed **no military pact** with either bloc but kept **friendly ties** with both and followed **independent** policies. Leading members included **India**, **Yugoslavia** and **Egypt**, with **Indonesia** and **Ghana** close behind. The dashed lines in the diagram show that they dealt with both blocs without joining either, and they **spoke out** on world issues rather than staying silent.\n\n(iii) To end **colonialism** and **imperialism**; to oppose **racial discrimination** such as apartheid; to promote **peace**, **disarmament** and **peaceful coexistence**; and to seek **economic development** and a **fairer** world economic order, so that political freedom would be matched by better lives for their people.",
  sol: "Read the diagram; explain the middle group; four aims.",
  scheme: [["(i) Western bloc", 1], ["(i) Eastern bloc", 2], ["(ii) Position of the non-aligned", 2], ["(ii) Three countries", 1], ["(iii) Four aims", 4]],
  assets: [groupsSvg(GROUPS_ALT, "The Cold War world in three groups (schematic, drawn by SOYL; countries shown are examples only).")],
}));
Q("l_timeline", long({
  t: [2, 3], d: 3, c: "application", marks: 10, wl: L10,
  stem: "Study the timeline from 1945 to 1965 drawn by SOYL and answer the questions.\n\n(i) Which three events on the timeline are directly linked with the rise of non-alignment? Give their years. **[3]**\n(ii) Which two events show the division of the world into military blocs? **[3]**\n(iii) Using the timeline, explain how the idea of non-alignment grew between 1947 and 1961. **[4]**",
  model: "(i) The **Panchsheel** agreement (**1954**), the **Bandung** conference (**1955**) and the first non-aligned summit at **Belgrade** (**1961**). The **Brioni** talks (**1956**) may also be named.\n\n(ii) The formation of **NATO** (**1949**) and of the **Warsaw Pact** (**1955**), the military alliances of the western and eastern blocs.\n\n(iii) After **1947**, newly free **India** chose to stay out of the blocs. In **1954**, India and China set out **Panchsheel**, the idea of peaceful coexistence. In **1955**, Asian and African states met at **Bandung** and spoke for peace and against colonialism. In **1956**, Nehru, Tito and Nasser met at **Brioni**, and in **1961** the movement was founded at **Belgrade**, while the blocs were hardening.",
  sol: "Read the timeline; blocs; growth of the idea.",
  scheme: [["(i) Three events with years", 3], ["(ii) NATO", 1], ["(ii) Warsaw Pact", 2], ["(iii) Four stages explained", 4]],
  assets: [timelineSvg(TL_ALT, "Schematic timeline drawn by SOYL; label positions are for legibility only.")],
}));

// ================================================================ source-based (imagined documents)
Q("sb_delegate_diary", source({
  t: [1, 3], d: 3, c: "analysis", origin: "soyl-original",
  stem: `Read the extract from the imagined diary of a young interpreter and answer the questions that follow. ${IMAG}`,
  passage: "**Diary of an imagined interpreter at a conference in a Balkan capital, September 1961**\n\nToday the hall was full of flags I had never seen together: delegations from Asia, Africa, Latin America and our own host country. The tall Indian prime minister spoke about peace in a quiet voice; the Egyptian president drew loud applause; our own president welcomed everyone. None of these countries belongs to the western or the eastern alliance. A journalist beside me asked whether they were simply sitting on the fence. My supervisor smiled and said that people who speak out against empires and bombs are not sitting anywhere.",
  parts: [
    child("a", short({ t: 3, d: 1, c: "recall", marks: 1, stem: "Name the city and the event described in the diary.", model: "**Belgrade**; the first summit of the **Non-Aligned Movement** (1961).", sol: "Belgrade; first summit.", scheme: [["Belgrade and the first summit", 1]] })),
    child("b", short({ t: 3, d: 2, c: "application", marks: 1, stem: "Identify the Indian and Egyptian leaders mentioned.", model: "**Jawaharlal Nehru** (India) and **Gamal Abdel Nasser** (Egypt).", sol: "Nehru and Nasser.", scheme: [["Both leaders", 1]] })),
    child("c", short({ t: 1, d: 3, c: "analysis", marks: 2, stem: "**Either** (i): What did the supervisor mean by saying the delegates were not sitting on the fence?", model: "Non-alignment was **not neutrality**: members took **clear positions**, speaking against **colonialism** and the **arms race**, though they joined **no bloc**.", sol: "Active, not neutral.", scheme: [["Not neutral", 1], ["Examples of positions taken", 1]] }), [
      short({ t: 1, d: 3, c: "analysis", marks: 2, stem: "**Or** (ii): Why did countries from many continents want to belong to such a group? Give two reasons.", model: "They wanted to protect their **freedom** from both **blocs**, and to work together for **peace**, **development** and an end to **colonial rule**.", sol: "Two reasons.", scheme: [["First reason", 1], ["Second reason", 1]] }),
    ]),
  ],
}));
Q("sb_student_letter", source({
  t: 2, d: 3, c: "analysis", origin: "soyl-original",
  stem: `Read the extract from an imagined letter and answer the questions that follow. ${IMAG}`,
  passage: "**Letter from an imagined college student in Lucknow to her cousin, May 1954**\n\nThe newspapers are full of an agreement our country has signed with its large northern neighbour about trade and travel in the Himalayan region. Our teacher says the most important part is a short set of principles about how the two countries will behave towards each other: respecting each other's land, not attacking, not interfering, and living side by side in peace. She says that if many countries accepted such ideas, the quarrel between the two great power blocs would matter much less.",
  parts: [
    child("a", short({ t: 2, d: 1, c: "recall", marks: 1, stem: "What name is given to the set of principles the teacher describes?", model: "**Panchsheel**.", sol: "Panchsheel.", scheme: [["Panchsheel", 1]] })),
    child("b", short({ t: 2, d: 2, c: "application", marks: 1, stem: "Name the neighbouring country and the year of the agreement.", model: "**China**; **1954**.", sol: "China, 1954.", scheme: [["China and 1954", 1]] })),
    child("c", short({ t: 2, d: 3, c: "analysis", marks: 2, stem: "**Either** (i): Explain the teacher's view that such ideas could make the quarrel between the blocs matter less.", model: "If states with different systems agreed to live in **peace** and not **interfere**, fewer would be drawn into the **blocs**, and **tension** and the risk of **war** would fall.", sol: "Peaceful coexistence reduces bloc rivalry.", scheme: [["Peaceful coexistence", 1], ["Effect on bloc tension", 1]] }), [
      short({ t: 2, d: 3, c: "analysis", marks: 2, stem: "**Or** (ii): How did the spirit of this agreement connect with the later Non-Aligned Movement?", model: "Its idea of **peaceful coexistence** was taken up at **Bandung (1955)** and became a guiding idea of the **non-aligned** countries founded at **Belgrade (1961)**.", sol: "Bandung and non-alignment.", scheme: [["Peaceful coexistence carried forward", 1], ["Bandung or Belgrade named", 1]] }),
    ]),
  ],
}));
Q("sb_radio_talk", source({
  t: [1, 3], d: 4, c: "evaluation", origin: "soyl-original",
  stem: `Read the extract from an imagined radio talk and answer the questions that follow. ${IMAG}`,
  passage: "**Script of an imagined radio talk by a schoolteacher in a newly free African country, 1962**\n\nFriends, both great powers have offered us help. One offers tractors, the other offers a dam. One asks us to sign a defence treaty, the other asks us to allow its ships into our harbour. Our government has accepted the tractors and the dam and politely refused both treaties. Some of you ask whether this is wise. Our leaders, like the leaders of Ghana, India and Yugoslavia, believe that a country which has just won its freedom should not lend it to anyone.",
  parts: [
    child("a", short({ t: 1, d: 1, c: "recall", marks: 1, stem: "Name the policy the government is following.", model: "**Non-alignment**.", sol: "Non-alignment.", scheme: [["Non-alignment", 1]] })),
    child("b", short({ t: 3, d: 2, c: "application", marks: 1, stem: "Name the leader of Ghana who was among the architects of the Non-Aligned Movement.", model: "**Kwame Nkrumah**.", sol: "Nkrumah.", scheme: [["Nkrumah", 1]] })),
    child("c", short({ t: 1, d: 4, c: "evaluation", marks: 2, stem: "**Either** (i): Give one advantage and one risk of the government's choice.", model: "**Advantage:** it gets **help from both** sides while keeping its **freedom** to decide. **Risk:** without a treaty it has **no ally** to defend it, and either power may **press** it.", sol: "One advantage, one risk.", scheme: [["Advantage", 1], ["Risk", 1]] }), [
      short({ t: 1, d: 4, c: "evaluation", marks: 2, stem: "**Or** (ii): Explain the teacher's last sentence in your own words.", model: "A newly free country should not **give away** its **independence** to a superpower by joining its **bloc**; it should keep the right to **decide for itself**.", sol: "Explain freedom not lent to a bloc.", scheme: [["Independence protected", 1], ["By staying out of blocs", 1]] }),
    ]),
  ],
}));

// ================================================================ more scenario items (application)
Q("m_app_scholarships", mcq({
  t: 1, d: 3, c: "analysis",
  stem: "An imagined editorial of 1960, written by SOYL, reads in outline: the country will sign neither pact offered by the two great powers, but it will not stay silent while colonial rulers govern its neighbours, and it will say so wherever delegates meet. Which reading of the writer's position is best supported?",
  opts: ["The writer backs non-alignment rather than neutrality, since refusing both pacts is joined to a duty to speak on colonial rule", "The writer backs neutrality, since refusing both pacts is the whole of the policy described", "The writer backs one bloc, since a call to end colonial rule was the line of only one side", "The writer backs isolation, since refusing both pacts means having no dealings with the powers"],
  sol: "Refusing both pacts shows the writer stands outside the blocs. The promise to speak out on colonial rule shows an active stand, which separates non-alignment from neutrality. Opposing colonial rule was not the line of one bloc alone, and refusing pacts is not the same as refusing all dealings.",
}));
Q("m_app_resolution", mcq({
  t: 1, d: 3, c: "analysis",
  stem: "An imagined student writes: 'The non-aligned countries called for disarmament, so the movement wanted every state to give up all its armed forces.' Which qualification is best?",
  opts: ["The call was aimed at the arms race between the blocs, above all nuclear weapons, which threatened world peace; members still kept forces for their own defence", "The claim is correct, since a call to disarm is a call to abolish all armed forces everywhere", "The claim is wrong, because the non-aligned countries asked only the weaker bloc to disarm", "The claim is wrong, because the movement approved nuclear weapons for its members to match the superpowers"],
  sol: "The part that is right is that the movement pressed for disarmament. The overstatement is the word 'every': its concern was the blocs' arms race and nuclear danger, and members kept ordinary forces. It did not single out one bloc and did not approve nuclear weapons for its members.",
}));
Q("m_app_prices", mcq({
  t: 1, d: 3, c: "analysis",
  stem: "In 1962, an imagined newly free country earns almost all its money from one crop, sold mostly to countries of one bloc. Its army is small, and both blocs are offering it aid. Which reasoning best explains why its government may prefer non-alignment?",
  opts: ["A pact would tie its politics and trade to one bloc and could make it a target for the other, while staying out keeps aid and markets open on both sides", "A pact would forbid it from trading at all, so staying out is the only way to sell its crop", "Non-alignment promises it military protection from both blocs at once, which no pact could give", "Most of the movement's founders had been colonies, so every former colony was bound to stay out of pacts"],
  sol: "Two pressures meet here: dependence on a few buyers and a small army. A pact would bind it to one bloc and expose it to the other's pressure, while staying out keeps help and markets open on both sides. Pacts did not forbid trade, non-alignment gave no guarantee of protection, and no former colony was bound to join anything.",
}));
Q("m_app_newnation", mcq({
  t: 1, d: 3, c: "application",
  stem: "In 1960, an imagined newly free country is offered a large grant by one superpower. No treaty is asked for, but the grant comes with a joint military exercise programme and an agreement to settle its United Nations votes in advance with that superpower. If the country follows non-alignment, what is it most likely to do?",
  opts: ["Accept the grant but decline the exercises and the vote-settling that would tie it to that bloc", "Accept everything, since no treaty has been signed and so nothing has been given up", "Accept everything and ask the other superpower for an equal package to keep the balance", "Refuse the grant as well, since non-alignment meant taking no help from any superpower"],
  sol: "The money can be taken, as non-aligned states accepted aid from both sides. The exercises and the advance settling of votes would bind its security and its voice to one bloc, which is what non-alignment avoided. A missing treaty does not remove such ties, matching the offer from the other side would still be a tie, and aid itself was not refused.",
}));
Q("s_app_wrong_claim", short({
  t: [1, 3], d: 3, c: "analysis", marks: 2, wl: S2,
  stem: "An imagined student argues: 'Bandung in 1955 was the first summit of the Non-Aligned Movement, because Asian and African leaders, Nehru among them, met there to speak for peace and against colonial rule. So the movement is six years older than 1961.' Assess the claim in two points.",
  model: "1. **Partly right:** Bandung was an important **step**; **Asian and African** states shared ideas of **peace** and **anti-colonialism** there.\n2. **Not the first summit:** some states at Bandung had **joined bloc alliances**, so it was not a non-aligned meeting; that came at **Belgrade** in **1961**.",
  sol: "Credit for what is right; evidence that it was not the first summit.",
  scheme: [["What the claim gets right, with evidence", 1], ["Why Bandung was not the first summit, with evidence", 1]],
}));

// ================================================================ deck-check items (not used in tests)
Q("m_chk_meaning", mcq({
  t: 1, d: 1, c: "recall",
  stem: "Which phrase best sums up the core of non-alignment in the Cold War years?",
  opts: ["Staying out of both military blocs", "Joining the stronger bloc", "Closing borders to all foreigners", "Giving way to every demand of a superpower"],
  sol: "Non-alignment meant staying out of the military blocs of both superpowers while remaining active in world affairs.",
}));
Q("tf_chk_neutral", tf({
  t: 1, d: 1, c: "understanding", ans: false,
  stem: "True or false? Non-aligned countries never expressed any view on world disputes.",
  sol: "False. They spoke out on colonialism, racism and disarmament; non-alignment is not neutrality.",
}));
Q("m_chk_panch", mcq({
  t: 2, d: 1, c: "recall",
  stem: "Panchsheel is best described as a set of principles of",
  opts: ["peaceful coexistence", "military defence", "economic planning", "colonial government"],
  sol: "Panchsheel set out principles of peaceful coexistence between states.",
}));
Q("fb_chk_bandung", fb({
  t: 3, d: 1, c: "recall",
  stem: "The Asian–African conference of April 1955 was held at ___ in Indonesia.",
  acc: [["Bandung"]],
  sol: "It was held at Bandung.",
}));
Q("m_chk_tito", mcq({
  t: 3, d: 1, c: "recall",
  stem: "Which architect of the Non-Aligned Movement led the country that hosted its first summit?",
  opts: ["Josip Broz Tito", "Sukarno", "Kwame Nkrumah", "Jawaharlal Nehru"],
  sol: "The first summit met at Belgrade in Yugoslavia, led by Tito.",
}));
Q("fb_chk_belgrade", fb({
  t: 3, d: 1, c: "recall",
  stem: "The first summit of the Non-Aligned Movement was held at Belgrade in the year ___.",
  acc: [[String(BELGRADE)]],
  sol: `It was held in ${BELGRADE}.`,
}));
Q("m_chk_nasser", mcq({
  t: 3, d: 1, c: "recall",
  stem: "Gamal Abdel Nasser, one of the five architects usually named, represented which country?",
  opts: ["Egypt", "Indonesia", "Ghana", "Yugoslavia"],
  sol: "Nasser led Egypt.",
}));
Q("tf_chk_panch_china", tf({
  t: 2, d: 1, c: "recall", ans: true,
  stem: "True or false? The Panchsheel principles were first set out in an agreement between India and China.",
  sol: "True. They appeared in the India–China agreement of 1954.",
}));
