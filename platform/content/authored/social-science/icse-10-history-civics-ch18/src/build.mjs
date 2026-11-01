// Build ICSE 10 History & Civics ch18 The Non-Aligned Movement. Run from platform/:
//   npx tsx content/authored/social-science/icse-10-history-civics-ch18/src/build.mjs
// The five principles of Panchsheel appear in one deck table and the notes for understanding only (removed topic:
// they are not tested), and no question asks for them.
import path from "node:path";
import assert from "node:assert/strict";
import { fileURLToPath } from "node:url";
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from "../../icse-10-history-civics-ch01/src/lib.mjs";

setUnit("icse-10-history-civics-ch18", "social-science");
const { groupsSvg, timelineSvg, TL_ALT, GROUPS_ALT, EVENTS, PANCHSHEEL, BANDUNG, BELGRADE, BELGRADE_STATES, ARCHITECTS } = await import("./questions.mjs");
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
assert.equal(BELGRADE - PANCHSHEEL, 7);
assert.equal(BELGRADE - BANDUNG, 6);
assert.equal(ARCHITECTS.length, 5);
assert.ok(EVENTS.some(([y, l]) => y === BELGRADE && /Belgrade/.test(l)));

// ---------------------------------------------------------------- figures
const vTimeline = timelineSvg(TL_ALT, "Schematic timeline drawn by SOYL; label positions are for legibility only.");
const vGroups = groupsSvg(GROUPS_ALT, "The Cold War world in three groups (schematic, drawn by SOYL; countries shown are examples only).");
const vRoute1 = flow("LR", ["Two blocs after 1945", "Meaning of non-alignment", "Why new nations chose it", "Objectives", "Panchsheel"], "Route map of Part 1: the two blocs after 1945, the meaning of non-alignment, why new nations chose it, its objectives, and Panchsheel", "Part 1 at a glance");
const vRoute2 = flow("LR", ["Bandung, 1955", "Brioni, 1956", "Belgrade, 1961", "Nehru and the architects", "After the Cold War"], "Route map of Part 2: the Bandung conference of 1955, the Brioni talks of 1956, the Belgrade summit of 1961, Nehru and the other architects, and the movement after the Cold War", "Part 2 at a glance");
const vMeaning = table(["Non-alignment is", "Non-alignment is not"], [
  ["Staying out of both military blocs", "Joining either the western or the eastern alliance"],
  ["An independent foreign policy", "Following one superpower's lead"],
  ["Judging each issue on its merits", "Silence on world issues (neutrality)"],
  ["Friendship and trade with all", "Cutting off contact (isolation)"],
], "Table: non-alignment is staying out of both blocs, an independent foreign policy, judging each issue on its merits and friendship with all; it is not joining an alliance, following one superpower, silence on world issues, or cutting off contact");
const vTamravati = table(["Fact about the imagined republic", "Feature it shows"], [
  ["Refuses both superpowers' military pacts", "No bloc membership"],
  ["Takes doctors from one, wheat from the other", "Friendly ties with both sides"],
  ["Speaks at the United Nations against colonial rule", "Active, not neutral"],
], "Worked example table matching facts about the imagined republic of Tamravati to features of non-alignment: refusing both pacts shows no bloc membership; taking help from both shows friendly ties; speaking against colonial rule shows it is active, not neutral", "Match each fact to a feature.");
const vWhyNew = flow("TB", ["Freedom won after long colonial rule", "Fear of new outside control by a bloc", "Need for peace and money for development", "Choose to stay out of both blocs"], "Flow: freedom won after colonial rule; fear of new outside control by a bloc; need for peace and money for development; so new nations chose to stay out of both blocs", "Why newly free nations chose non-alignment.");
const vObjectives = table(["Objective", "In practice"], [
  ["Protect independence", "No military pacts with either bloc"],
  ["End colonialism and imperialism", "Support for freedom movements in Asia and Africa"],
  ["Oppose racial discrimination", "Repeated condemnation of apartheid in South Africa"],
  ["Peace and disarmament", "Calls to end the nuclear arms race"],
  ["Development and fair trade", "Demand for a fairer world economic order"],
  ["Strengthen the United Nations", "Use it as a forum for small states"],
], "Table of objectives: protect independence by avoiding military pacts; end colonialism and imperialism; oppose racial discrimination such as apartheid; promote peace and disarmament; seek development and a fairer world economic order; strengthen the United Nations");
const vPanch = table(["Question", "Answer"], [
  ["What does the word mean?", "Five principles"],
  ["What do they stand for?", "Peaceful coexistence between states"],
  ["Where first set out?", "India–China agreement, 29 April 1954"],
  ["The five, for understanding only", "Respect for each other's territory and sovereignty; non-aggression; non-interference in internal affairs; equality and mutual benefit; peaceful coexistence"],
], "Table about Panchsheel: the word means five principles, standing for peaceful coexistence, first set out in the India–China agreement of 29 April 1954; the five are listed for understanding only: respect for territory and sovereignty, non-aggression, non-interference, equality and mutual benefit, and peaceful coexistence", "The five principles are for understanding only; they are not tested.");
const vCoexist = flow("TB", ["Panchsheel, 1954", "Taken up at Bandung, 1955", "Guiding idea of the non-aligned, from 1961"], "Flow: Panchsheel in 1954, taken up at the Bandung conference in 1955, and a guiding idea of the non-aligned countries from 1961", "How an idea travelled.");
const vPlan1 = table(["Part", "Marks", "What to write"], [
  ["(i) Meaning", "3", "No bloc; independent policy; not neutrality"],
  ["(ii) Objectives", "3", "Three distinct aims"],
  ["(iii) Benefits", "4", "Freedom; aid from both; out of the arms race; a shared voice"],
], "Worked example table planning a ten-mark answer on non-alignment: three points on meaning, three objectives, and four benefits for new nations", "One point for each mark.");
const vBandung = table(["Question", "Answer"], [
  ["When and where?", "April 1955, Bandung, Indonesia"],
  ["Who met?", "Newly free countries of Asia and Africa"],
  ["What they stood for", "Peace, peaceful coexistence, an end to colonialism"],
], "Table about Bandung: April 1955 at Bandung in Indonesia, newly free countries of Asia and Africa met and stood for peace, peaceful coexistence and an end to colonialism");
const vBelgrade = table(["Question", "Answer"], [
  ["When and where?", `September ${BELGRADE}, Belgrade, Yugoslavia`],
  ["How many members?", `About ${BELGRADE_STATES} countries`],
  ["What it did", "Founded the Non-Aligned Movement as a continuing group"],
], `Table about Belgrade: September ${BELGRADE} at Belgrade in Yugoslavia, about ${BELGRADE_STATES} member countries founded the Non-Aligned Movement as a continuing group`);
const vArchitects = table(["Architect", "Country"], ARCHITECTS.map(([n, c]) => [n, c]), `Table of the five architects usually named: ${ARCHITECTS.map(([n, c]) => `${n} of ${c}`).join(", ")}`, "The five architects usually named.");
const vNehru = flow("TB", ["1947: India stays out of both blocs", "1954: Panchsheel with China", "1955: active at Bandung", "1956: talks with Tito and Nasser at Brioni", "1961: co-founder at Belgrade"], "Flow of Nehru's role: India stays out of both blocs from 1947; Panchsheel with China in 1954; active at Bandung in 1955; talks with Tito and Nasser at Brioni in 1956; co-founder at Belgrade in 1961", "Nehru's part, step by step.");
const vChart = table(["Student wrote", "Correct"], [
  ["Nehru, India", "Correct"],
  ["Tito, Egypt", "Tito, Yugoslavia"],
  ["Nasser, Yugoslavia", "Nasser, Egypt"],
  ["Sukarno, Indonesia", "Correct"],
], "Worked example table correcting a revision chart: Nehru with India and Sukarno with Indonesia are correct; Tito belongs with Yugoslavia and Nasser with Egypt", "Check every name against its country.");
const vAfter = table(["After about 1991", "What members still sought"], [
  ["The two blocs no longer faced each other", "A shared voice for developing countries"],
  ["New problems rose to the top", "Development, fair trade and reform of world bodies"],
  ["The movement kept meeting", "Peace and cooperation among members"],
], "Table: after about 1991 the two blocs no longer faced each other, new problems rose to the top, and the movement kept meeting; members still sought a shared voice, development, fair trade, reform of world bodies, and peace and cooperation");
const vPlan2 = table(["Part", "Marks", "What to write"], [
  ["(i) Nehru's role", "3", "India's policy; Panchsheel and Bandung; Belgrade"],
  ["(ii) Architects", "3", "Three names, each with a country"],
  ["(iii) India's reasons", "4", "Freedom; peace and development; aid from both; lead against colonialism"],
], "Worked example table planning a ten-mark answer on Nehru: three points on his role, three architects with countries, and four reasons for India's choice", "Plan before you write.");
const vSum1 = flow("TB", ["Two blocs: the western and the eastern alliance", "Non-alignment: no bloc, independent judgement", "Objectives: freedom, anti-colonialism, peace, development", "Panchsheel, 1954: peaceful coexistence"], "Summary flow of Part 1: two blocs; non-alignment as no bloc and independent judgement; objectives of freedom, anti-colonialism, peace and development; Panchsheel in 1954 as peaceful coexistence");
const vSum2 = flow("TB", ["Bandung, 1955: Asia and Africa meet", "Belgrade, 1961: the movement founded", "Architects: Nehru, Tito, Nasser, Sukarno, Nkrumah", "The movement continues after the Cold War"], "Summary flow of Part 2: Bandung in 1955 where Asia and Africa met; Belgrade in 1961 where the movement was founded; the architects Nehru, Tito, Nasser, Sukarno and Nkrumah; and the movement continuing after the Cold War");

// ---------------------------------------------------------------- decks
const part1 = deck({
  part: 1,
  title: "The Non-Aligned Movement — Part 1: Meaning, Objectives and Panchsheel",
  goals: [
    "Explain the meaning of non-alignment in the setting of the Cold War",
    "State the objectives of the Non-Aligned Movement",
    "Explain the meaning of Panchsheel and its link with India's foreign policy",
  ],
  slides: [
    sl("title", "Neither bloc: a third path", {
      b: "Part 1 — what **non-alignment** meant, its **objectives**, and **Panchsheel**.",
      v: vRoute1,
      n: "After the Second World War, the world split into two armed camps. Many countries that had just won their freedom refused to join either one. In this part we see what their policy of non-alignment meant, what it aimed to achieve, and how the idea of peaceful coexistence called Panchsheel was linked to it.",
    }),
    sl("diagram", "Key dates, 1945 to 1965", {
      b: "From India's freedom to the **Belgrade** summit.",
      v: vTimeline,
      n: "This timeline shows the key years. India became free in nineteen forty-seven. The western alliance formed in nineteen forty-nine and the eastern one in nineteen fifty-five. In between came Panchsheel in nineteen fifty-four and the Bandung conference in nineteen fifty-five. The first summit of the non-aligned countries met at Belgrade in nineteen sixty-one.",
    }),
    sl("diagram", "A world in three groups", {
      b: "Two **blocs**, and the states that joined **neither**.",
      v: vGroups,
      n: "Picture the world in three groups. On one side stood the western bloc, led by the United States. On the other stood the eastern bloc, led by the Soviet Union. In the middle were countries such as India, Yugoslavia, Egypt, Indonesia and Ghana, which signed no military pact with either side.",
    }),
    sl("check", "Quick check: the core idea", {
      b: "Which phrase best sums up the core of non-alignment?",
      chk: "m_chk_meaning",
      n: "Think about what the middle group in the diagram had in common.",
    }),
    sl("concept", "What non-alignment meant", {
      b: "An **active**, **independent** policy, not a retreat from the world.",
      v: vMeaning,
      n: "Non-alignment meant staying out of both military blocs and following an independent foreign policy. A non-aligned country kept friendly ties and trade with all, and decided each question on its merits. It was not silence, and it was not cutting oneself off. Non-aligned leaders spoke out often on the great issues of their time.",
    }),
    sl("two-column", "Three words that are often confused", {
      cols: ["**Neutrality**\n\n- Standing aside from a dispute\n- Taking no position\n\n**Isolation**\n\n- Cutting off contact with the world", "**Non-alignment**\n\n- No military bloc, but **active** in world affairs\n- Positions taken on **merits**\n- Friendship and trade with **all**"],
      n: "Students often mix up three ideas. A neutral state stands aside and takes no position. An isolated state cuts itself off. A non-aligned state does neither: it joins no military bloc, but it speaks out, votes on the merits of each question and keeps friendly ties and trade with countries of both blocs.",
    }),
    sl("check", "Quick check: silent or active?", {
      b: "True or false: non-aligned countries never expressed any view on world disputes.",
      chk: "tf_chk_neutral",
      n: "Remember the difference between non-alignment and neutrality.",
    }),
    sl("example", "Worked example 1: is this country non-aligned?", {
      b: "Test an imagined republic against the features of non-alignment.",
      bl: ["Step 1: does it join a **military pact**? If not, the first test is met.", "Step 2: does it keep **ties with both** sides?", "Step 3: does it **speak out** on issues? Then it is active, not neutral."],
      v: vTamravati,
      n: "Let us test an imagined island republic. It refuses the military pacts offered by both superpowers, so it joins no bloc. It takes doctors from one and wheat from the other, so it keeps friendly ties with both. And it speaks against colonial rule at the United Nations, so it is active rather than neutral. It passes all three tests.",
    }),
    sl("diagram", "Why newly free nations chose it", {
      b: "Freedom, **peace** and **development**.",
      v: vWhyNew,
      n: "Why did so many new nations choose this path? They had just won freedom after long colonial rule and did not want to fall under new outside control. They also needed peace, and they needed their money for schools, farms and factories, not for weapons. Staying out of both blocs served all these needs.",
    }),
    sl("concept", "Objectives of the movement", {
      b: "**Six** aims that the members shared.",
      v: vObjectives,
      n: "The movement had several aims. Members wanted to protect their independence by avoiding military pacts. They worked to end colonialism and opposed racial discrimination, such as apartheid in South Africa. They called for peace and an end to the nuclear arms race. They sought development and fairer trade, and they wanted a stronger United Nations.",
    }),
    sl("concept", "Panchsheel: the meaning", {
      b: "**Panchsheel** means **five principles** of **peaceful coexistence**.",
      v: vPanch,
      n: "Panchsheel means five principles. They were set out in an agreement between India and China on the twenty-ninth of April nineteen fifty-four. Together they describe how states with different systems can live side by side in peace. The table lists the five for your understanding; the syllabus does not test them.",
    }),
    sl("check", "Quick check: Panchsheel", {
      b: "Panchsheel is best described as a set of principles of",
      chk: "m_chk_panch",
      n: "Recall what the five principles together were meant to achieve.",
    }),
    sl("diagram", "From Panchsheel to non-alignment", {
      b: "How the idea of **peaceful coexistence** travelled.",
      v: vCoexist,
      n: "The idea of peaceful coexistence did not stay between two countries. It was taken up by Asian and African states at Bandung in nineteen fifty-five, and it became one of the guiding ideas of the non-aligned countries. For India, it fitted the wish to stay friendly with all and out of both blocs.",
    }),
    sl("check", "Quick check: the first agreement", {
      b: "True or false: the Panchsheel principles were first set out in an agreement between India and China.",
      chk: "tf_chk_panch_china",
      n: "Which two countries signed the agreement of nineteen fifty-four?",
    }),
    sl("example", "Worked example 2: planning a ten-mark answer", {
      b: "Plan a **3 + 3 + 4** answer on meaning, objectives and benefits.",
      bl: ["(i) Meaning: no bloc; independent policy; not neutrality.", "(ii) Three distinct objectives.", "(iii) Four benefits for new nations."],
      v: vPlan1,
      n: "Here is a plan for a ten-mark answer in three parts. For meaning, give three points: no bloc, an independent policy, and the difference from neutrality. For objectives, choose three clearly different aims. For the four-mark part, explain four benefits for new nations, such as freedom, help from both sides, staying out of the arms race, and a shared voice.",
    }),
    sl("summary", "Summary of Part 1", {
      v: vSum1,
      n: "To sum up Part One. The world after nineteen forty-five was divided into two blocs. Non-alignment meant joining neither while judging each issue on its merits. Its aims were freedom, an end to colonialism and racism, peace, disarmament and development. Panchsheel, set out in nineteen fifty-four, stood for peaceful coexistence.",
    }),
    sl("exam-tips", "Exam tips", {
      bl: ["Non-alignment is **not** neutrality and **not** isolation.", "Learn **three or four** clearly different objectives.", "Panchsheel: **meaning**, **India and China**, **1954**; the five principles are not tested.", "Use your **own words**; no quotations are needed."],
      v: vMeaning,
      n: "A few tips. Never write that non-alignment meant neutrality or isolation. Learn three or four objectives that are clearly different from one another. For Panchsheel, know its meaning, the two countries and the year. Explain every idea in your own words.",
    }),
  ],
});

const part2 = deck({
  part: 2,
  title: "The Non-Aligned Movement — Part 2: Nehru, the Architects and the Movement",
  goals: [
    "Describe the Bandung conference and the Belgrade summit",
    "Describe Jawaharlal Nehru's role in the Non-Aligned Movement",
    "Name the architects of the movement and their countries",
  ],
  slides: [
    sl("title", "From an idea to a movement", {
      b: "Part 2 — **Bandung**, **Belgrade**, **Nehru** and the **architects**.",
      v: vRoute2,
      n: "An idea becomes a movement when people meet and organise. In this part we follow the meetings that turned non-alignment into the Non-Aligned Movement, meet the leaders who built it, look closely at Jawaharlal Nehru's part, and see what became of the movement after the Cold War.",
    }),
    sl("concept", "Bandung, 1955", {
      b: "**Asia and Africa** meet without the great powers.",
      v: vBandung,
      n: "In April nineteen fifty-five, newly free countries of Asia and Africa met at Bandung in Indonesia. For the first time they spoke together, without the great powers. They called for peace, supported peaceful coexistence and demanded an end to colonial rule. These ideas prepared the ground for the movement.",
    }),
    sl("check", "Quick check: the 1955 conference", {
      b: "The Asian–African conference of April 1955 was held at ___ in Indonesia.",
      chk: "fb_chk_bandung",
      n: "Name the city where the Asian and African countries met in nineteen fifty-five.",
    }),
    sl("concept", "Belgrade, 1961", {
      b: "The **first summit** of the Non-Aligned Movement.",
      v: vBelgrade,
      n: "In September nineteen sixty-one, leaders met at Belgrade, the capital of Yugoslavia. About twenty-five countries took part as members. This summit founded the Non-Aligned Movement as a continuing group, and further summits followed in later years.",
    }),
    sl("check", "Quick check: the year", {
      b: "The first summit of the Non-Aligned Movement was held at Belgrade in the year ___.",
      chk: "fb_chk_belgrade",
      n: "Recall the year of the first summit.",
    }),
    sl("diagram", "The five architects", {
      b: "**Five leaders** are usually named as the architects.",
      v: vArchitects,
      n: "Five leaders are usually named as the architects of the movement. Jawaharlal Nehru of India, Josip Broz Tito of Yugoslavia, Gamal Abdel Nasser of Egypt, Sukarno of Indonesia, and Kwame Nkrumah of Ghana. Learn each name with its country.",
    }),
    sl("check", "Quick check: the host", {
      b: "Which architect led the country that hosted the first summit?",
      chk: "m_chk_tito",
      n: "In which country is Belgrade, and who led it?",
    }),
    sl("diagram", "Nehru's role", {
      b: "From **India's policy** to a **world movement**.",
      v: vNehru,
      n: "Nehru shaped the movement step by step. From nineteen forty-seven he kept India out of both blocs. In nineteen fifty-four he set out Panchsheel with China. He was active at Bandung in nineteen fifty-five, held talks with Tito and Nasser at Brioni in nineteen fifty-six, and helped found the movement at Belgrade in nineteen sixty-one.",
    }),
    sl("two-column", "Why India chose non-alignment", {
      cols: ["**Protect freedom**\n\n- Keep the right to judge issues for itself\n- Avoid new outside control", "**Build the nation**\n\n- Peace and money for **development**\n- **Aid** and technology from both sides\n- Lead **Asia and Africa** against colonialism"],
      n: "Why did India choose this path? First, to protect its newly won freedom and its right to judge each issue for itself. Second, to keep peace and save money for development. Third, to receive aid and technology from both sides. And fourth, to lead Asian and African countries against colonial rule.",
    }),
    sl("check", "Quick check: Egypt's leader", {
      b: "Gamal Abdel Nasser, one of the five architects usually named, represented which country?",
      chk: "m_chk_nasser",
      n: "Recall the country of each architect.",
    }),
    sl("example", "Worked example 1: correcting a revision chart", {
      b: "Find and fix the errors in an imagined student's chart.",
      bl: ["Step 1: check each **name** against its **country**.", "Step 2: mark the pairs that are correct.", "Step 3: swap the pairs that are reversed."],
      v: vChart,
      n: "An imagined student wrote: Nehru, India; Tito, Egypt; Nasser, Yugoslavia; Sukarno, Indonesia. Check each pair. Nehru and Sukarno are correct. But Tito led Yugoslavia and Nasser led Egypt, so those two entries are reversed. Always check every name against its country.",
    }),
    sl("concept", "After the Cold War", {
      b: "The blocs faded, but the movement **kept meeting**.",
      v: vAfter,
      n: "Around nineteen ninety-one the Cold War ended and the two blocs no longer faced each other. The movement continued to meet. Its members used it as a shared voice for developing countries on development, fair trade and reform of world bodies, and as a forum for peace and cooperation.",
    }),
    sl("example", "Worked example 2: planning a ten-mark answer on Nehru", {
      b: "Plan **3 + 3 + 4** marks.",
      bl: ["(i) Nehru's role in three points.", "(ii) Three other architects with countries.", "(iii) Four reasons for India's choice."],
      v: vPlan2,
      n: "Plan a ten-mark answer on Nehru like this. For three marks, describe his role: India's policy, Panchsheel and Bandung, and Belgrade. For three more, name three other architects with their countries. For the four-mark part, explain four reasons why India chose non-alignment.",
    }),
    sl("summary", "Summary of Part 2", {
      v: vSum2,
      n: "To sum up Part Two. Asian and African states met at Bandung in nineteen fifty-five. The movement was founded at Belgrade in nineteen sixty-one. Its architects were Nehru, Tito, Nasser, Sukarno and Nkrumah, and Nehru made non-alignment the basis of India's foreign policy. The movement continued after the Cold War.",
    }),
    sl("exam-tips", "Exam tips", {
      bl: ["Bandung **1955** was an Asian–African conference; Belgrade **1961** was the first summit.", "Learn the **five architects** with their **countries**.", "Nehru: India's policy, Panchsheel, Bandung, Belgrade.", "Describe ideas in your **own words**."],
      v: vArchitects,
      n: "A few tips. Do not confuse Bandung, an Asian and African conference in nineteen fifty-five, with Belgrade, the first summit in nineteen sixty-one. Learn the five architects with their countries. For Nehru, link India's policy, Panchsheel, Bandung and Belgrade. And explain every idea in your own words.",
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: "The Non-Aligned Movement — notes",
  sections: [
    {
      h: "1. A world of two blocs and the meaning of non-alignment",
      t: 1,
      b: "- After 1945 the **USA** led a **western bloc** (military alliance **NATO**, 1949) and the **USSR** an **eastern bloc** (the **Warsaw Pact**, 1955).\n- **Non-alignment:** joining **neither** military bloc, following an **independent foreign policy**, deciding each question on its **merits**, and keeping friendly ties with **all**.\n- It is **not neutrality** (standing aside) and **not isolation** (cutting off contact).",
      terms: [["Non-alignment", "A policy of staying out of both Cold War military blocs while taking an active, independent part in world affairs."], ["Bloc", "A group of states tied together by a military alliance under a leading power."]],
      v: vGroups,
      vs: [vMeaning],
    },
    {
      h: "2. Why new nations chose it, and its objectives",
      t: 1,
      b: "- New nations of Asia and Africa wanted to keep their **freedom**, avoid being drawn into others' wars, and spend on **development**.\n- **Objectives:** protect **independence**; end **colonialism** and **imperialism**; oppose **racial discrimination** such as **apartheid**; promote **peace**, **disarmament** and **peaceful coexistence**; seek **development** and a **fairer world economic order**; strengthen the **United Nations**.",
      terms: [["Apartheid", "The system of racial segregation that existed in South Africa."], ["Disarmament", "Reducing or ending stocks of weapons, especially nuclear weapons."]],
      v: vObjectives,
      vs: [vWhyNew],
    },
    {
      h: "3. Panchsheel",
      t: 2,
      b: `- **Meaning:** five principles of **peaceful coexistence** between states.\n- **First set out:** in the agreement between **India and China** of **29 April ${PANCHSHEEL}**.\n- **Link:** the idea fitted India's wish to be friendly with all; it was taken up at **Bandung (${BANDUNG})** and guided the non-aligned countries.\n- The five principles are shown in the deck **for understanding only**; they are not tested.`,
      terms: [["Peaceful coexistence", "States with different political systems living side by side without war or interference."]],
      v: vPanch,
      vs: [vCoexist],
    },
    {
      h: "4. Bandung and Belgrade",
      t: 3,
      b: `- **Bandung, Indonesia (April ${BANDUNG}):** an Asian–African conference that spoke for peace and against colonialism.\n- **Brioni (1956):** talks between **Nehru**, **Tito** and **Nasser**.\n- **Belgrade, Yugoslavia (September ${BELGRADE}):** the **first summit**; about **${BELGRADE_STATES}** member countries; the movement founded.`,
      terms: [["Summit", "A meeting of heads of state or government."]],
      v: vBelgrade,
      vs: [vBandung, vTimeline],
    },
    {
      h: "5. Nehru and the architects",
      t: 3,
      b: `- **Architects usually named:** ${ARCHITECTS.map(([n, c]) => `**${n}** (${c})`).join(", ")}.\n- **Nehru:** made non-alignment the basis of **India's foreign policy** from 1947; set out Panchsheel with China; took part at Bandung; co-founded the movement at Belgrade.\n- **India's reasons:** keep its **freedom of judgement**; peace and money for **development**; **aid** from both sides; leadership of Asian and African states against **colonialism**.`,
      terms: [["Architect (of a movement)", "A leader who helped plan and build it."]],
      v: vArchitects,
      vs: [vNehru],
    },
    {
      h: "6. The movement after the Cold War",
      t: 1,
      b: "- The Cold War ended around **1991**; the movement **continued to meet**.\n- Members use it as a **common platform** for developing countries on **development**, **fair trade** and **reform** of world bodies.\n- *Dated note:* the movement had about **120 member states, as of 2024**; no question tests this figure.",
      terms: [["Developing countries", "Countries with lower incomes that are working to grow their economies."]],
      v: vAfter,
    },
  ],
  tips: "**Common mistakes**\n- Calling non-alignment **neutrality** or **isolation**.\n- Dating the first summit to **1955** (that was Bandung); Belgrade was **1961**.\n- Mixing up **Tito** (Yugoslavia) and **Nasser** (Egypt).\n- Writing that Nehru founded the movement **alone**.\n- Listing Panchsheel's principles in an answer that asks only for its **meaning**.\n\n**How marks are usually awarded**\n- 1-mark items: one correct option or term.\n- 2 marks: two distinct points.\n- 10-mark questions in 3 + 3 + 4 parts: one point per mark; the 4-mark part often asks you to explain or evaluate.",
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ["Non-alignment", "Joining neither Cold War military bloc; an independent foreign policy.", "definition", 1],
  ["Non-alignment vs neutrality", "Non-aligned states take positions on issues; neutral states stand aside.", "concept", 1],
  ["Non-alignment vs isolation", "Non-aligned states trade and work with all; isolated states cut off contact.", "concept", 1],
  ["Western bloc", "Led by the **USA**; military alliance **NATO** (1949).", "fact", 1],
  ["Eastern bloc", "Led by the **USSR**; the **Warsaw Pact** (1955).", "fact", 1],
  ["Why new nations chose non-alignment", "Keep freedom; avoid others' wars; spend on development.", "concept", 1],
  ["Objective: colonialism", "End colonial rule and imperialism.", "fact", 1],
  ["Objective: racism", "Oppose racial discrimination such as **apartheid**.", "fact", 1],
  ["Objective: peace", "Peace, **disarmament** and peaceful coexistence.", "fact", 1],
  ["Objective: economy", "Development and a **fairer world economic order**.", "fact", 1],
  ["Objective: United Nations", "Strengthen it as a forum for small states.", "fact", 1],
  ["Apartheid", "Racial segregation in South Africa, opposed by the movement.", "definition", 1],
  ["Panchsheel: meaning", "**Five principles** of **peaceful coexistence**.", "definition", 2],
  ["Panchsheel: first set out", `India–China agreement, **29 April ${PANCHSHEEL}**.`, "fact", 2],
  ["Peaceful coexistence", "States with different systems living side by side without war.", "definition", 2],
  ["Panchsheel and non-alignment", `Taken up at Bandung (${BANDUNG}); a guiding idea of the non-aligned.`, "concept", 2],
  ["Panchsheel in exams", "Know the meaning, the countries and the year; the five principles are not tested.", "exam-tip", 2],
  ["Bandung conference", `**April ${BANDUNG}**, Indonesia; Asian and African states.`, "fact", 3],
  ["Brioni talks", "**1956**: Nehru, Tito and Nasser.", "fact", 3],
  ["First non-aligned summit", `**Belgrade**, Yugoslavia, **September ${BELGRADE}**.`, "fact", 3],
  ["Members at Belgrade", `About **${BELGRADE_STATES}** countries.`, "fact", 3],
  ["Nehru", "**India**: made non-alignment the basis of India's foreign policy.", "fact", 3],
  ["Tito", "**Yugoslavia**: host of the first summit.", "fact", 3],
  ["Nasser", "**Egypt**.", "fact", 3],
  ["Sukarno", "**Indonesia**: host of Bandung.", "fact", 3],
  ["Nkrumah", "**Ghana**.", "fact", 3],
  ["Nehru's role in four steps", "India's policy (1947); Panchsheel (1954); Bandung (1955); Belgrade (1961).", "concept", 3],
  ["India's reasons", "Freedom of judgement; peace and development; aid from both; leadership against colonialism.", "concept", 3],
  ["Bandung vs Belgrade", "Bandung 1955 was a conference; Belgrade 1961 founded the movement.", "exam-tip", 3],
  ["After the Cold War", "The movement continued as a voice for developing countries.", "concept", 1],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: "short",
  blueprint: "icse-10-history-civics-chapter-test-short",
  title: "Chapter test (short) — The Non-Aligned Movement",
  duration: 30,
  sections: [
    { id: "I", title: "Part I — Compulsory (10 marks)", instr: "Attempt all questions. Questions 1–6 carry 1 mark each; questions 7 and 8 carry 2 marks each.", items: ["m_meaning_bloc", "m_obj_colonialism", "m_panch_meaning", "m_belgrade_city", "m_tito_country", "ar_nonalign_neutral", "s_meaning_two", "s_architects_two"] },
    { id: "II", title: "Part II — Structured question (10 marks)", instr: "Attempt any ONE of the two questions. Each is in three parts (3 + 3 + 4 marks).", items: [{ attempt: 1, keys: ["l_meaning_obj", "l_nehru"] }] },
  ],
});
const T_LONG = test({
  kind: "long",
  blueprint: "icse-10-history-civics-chapter-test-long",
  title: "Chapter test (long) — The Non-Aligned Movement",
  duration: 60,
  sections: [
    { id: "I", title: "Part I — Compulsory (20 marks)", instr: "Attempt all questions. Questions 1–10 carry 1 mark each; questions 11–15 carry 2 marks each.", items: ["m_not_neutral", "m_obj_apartheid", "m_disarm", "m_economic", "m_panch_year", "m_panch_link", "m_nasser", "m_bandung_role", "m_belgrade_number", "ar_colonial", "s_not_neutral", "s_obj_two_economic", "s_panch_meaning", "s_nehru_two", "s_bandung_two"] },
    { id: "II", title: "Part II — Structured questions (20 marks)", instr: "Attempt any TWO of the three questions. Each is in three parts (3 + 3 + 4 marks).", items: [{ attempt: 2, keys: ["l_panch", "l_bandung_belgrade", "l_cold_context"] }] },
  ],
});

build({
  dir: DIR,
  decks: [part1, part2],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: "topics t01–t03 of icse-10-history-civics-ch18 only (meaning and objectives of non-alignment; Panchsheel as meaning only, its five principles shown for understanding and not tested; Nehru's role and the architects)",
    originality: "every diary, letter, talk and scenario is imagined and written by SOYL (labelled); no textbook text or exercise and no specimen or board-paper item reused (D-036); no speech or historical person quoted",
    data: `event years asserted in date order (${EVENTS.map(([y]) => y).join(", ")}); ${BELGRADE} − ${PANCHSHEEL} = 7; ${BELGRADE} − ${BANDUNG} = 6; five architects`,
    facts: `NATO 1949; Warsaw Pact 1955; Panchsheel in the India–China agreement of 29 April ${PANCHSHEEL}; Bandung conference April ${BANDUNG}; Brioni talks 1956; first summit Belgrade September ${BELGRADE}, about ${BELGRADE_STATES} members; architects ${ARCHITECTS.map(([n, c]) => `${n} (${c})`).join(", ")}; about 120 members as of 2024 (notes only, dated)`,
    gate: "schema, content lint (lintExemplar), deterministic verify, originality pre-check and the editorial counts run clean on this chapter",
  },
});
