// Build CBSE 10 English Language and Literature ch22 "For Anne Gregory". Run from platform/:
//   npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch22/src/build.mjs
// LITERATURE RULE: the poem is never quoted or paraphrased line by line; only single words and the title
// appear. Students read the poem in First Flight. After build(), a short forbidden-phrase guard (ch18's
// src/guard.mjs; each entry 4 words or fewer) fails the build on any hit.
import path from "node:path";
import { fileURLToPath } from "node:url";
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from "../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs";
import { checkForbidden } from "../../cbse-10-english-language-and-literature-ch18/src/guard.mjs";

setUnit("cbse-10-english-language-and-literature-ch22", "english-literature");
await import("./questions.mjs");
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const READ = "**Read the poem itself in your textbook, *First Flight* (NCERT), aloud, twice.** This lesson is SOYL's explanation; it does not reproduce the poem.";

// Short distinctive phrases of the poem that must never appear (reproduction guard; 4 words or fewer each).
const FORBID = [
  "never shall a", "young man", "young men", "into despair", "in despair", "honey coloured ramparts",
  "great honey", "ramparts at your", "at your ear", "love you for", "love me for", "for yourself alone",
  "yourself alone", "for myself alone", "myself alone", "yellow hair", "your yellow", "my yellow",
  "get a hair", "hair dye", "set such colour", "or carrot", "brown or black", "old religious man",
  "religious man", "but yesternight", "yesternight declare", "found a text", "text to prove", "only god",
  "my dear", "and not your", "and not my", "i heard an",
];

// ---------------------------------------------------------------- visuals
const vBoard = table(
  ["In the board paper", "Question form", "Marks"],
  [
    ["Reference to context", "an extract with short questions on meaning, tone and devices (answer A or B)", "5"],
    ["Short answer (First Flight)", "40–50 words, any 4 of 5", "3 each"],
  ],
  "Table of how a First Flight poem is examined: a five-mark reference to context extract and three-mark short answers of forty to fifty words.",
  "CBSE 2026-27, Section C (literature).",
);
const vPoet = table(
  ["About the poet", ""],
  [
    ["Poet", "W. B. Yeats (1865–1939), Irish poet and dramatist"],
    ["Honours", "Nobel Prize in Literature, 1923"],
    ["Links", "a leader of the Irish literary revival; co-founded the Abbey Theatre with Lady Gregory"],
    ["Anne Gregory", "Lady Gregory's granddaughter, to whom the poem is addressed"],
  ],
  "Table of facts about W. B. Yeats: an Irish poet and dramatist, 1865 to 1939, Nobel Prize in Literature 1923, a leader of the Irish literary revival who co-founded the Abbey Theatre with Lady Gregory; Anne Gregory was Lady Gregory's granddaughter.",
);
const vGlance = table(
  ["Feature", "For Anne Gregory"],
  [
    ["Form", "a dialogue in three six-line stanzas; lines 2, 4 and 6 rhyme"],
    ["Speakers", "an older man (stanzas 1 and 3) and Anne (stanza 2)"],
    ["Subject", "whether a beautiful young woman can be loved for her true self"],
    ["Key image", "her golden hair as honey-coloured fortress walls"],
    ["Theme", "outer beauty versus inner worth; only divine love is unconditional"],
    ["Tone", "affectionate and teasing, becoming philosophical"],
  ],
  "Table of the poem at a glance: a dialogue in three six-line stanzas, an older man and Anne as speakers, the question of being loved for one's true self, her hair as honey-coloured fortress walls, the theme of outer beauty versus inner worth, and an affectionate tone that becomes philosophical.",
);
const vJourney = flow("LR", ["Older speaker: suitors will love only her hair", "Anne: I could dye it", "Older speaker: God alone loves a person for herself"], "Flow of the poem: the older speaker says suitors will love only her hair; Anne says she could dye it; the older speaker replies that God alone loves a person for herself.", "The three stanzas as a debate (SOYL summary).");
const vViews = table(
  ["", "The older speaker", "Anne"],
  [
    ["Age", "old, experienced", "young, hopeful"],
    ["View of beauty", "it hides the true self from suitors", "it can be changed, like a coat"],
    ["Solution", "none on earth; God alone loves unconditionally", "dye her hair another colour"],
    ["Tone", "teasing, then philosophical", "confident, playful"],
  ],
  "Table comparing the two speakers: the older speaker is experienced, believes beauty hides the true self, offers no earthly solution and speaks teasingly then philosophically; Anne is young and hopeful, believes beauty can be changed, proposes dyeing her hair, and speaks confidently.",
);
const vDevices = table(
  ["Device", "Where in the poem (described)", "A SOYL example of the device"],
  [
    ["Metaphor", "Anne's hair as honey-coloured fortress walls", "Her smile was a lighthouse in the crowded hall."],
    ["Refrain", "nearly the same idea closes each stanza", "And still the river runs, and still the river runs."],
    ["Dialogue", "two speakers taking turns", "Will it rain? asked Tara. Only if you forget your umbrella, said Dev."],
    ["Imagery", "the honey colour of the hair", "Saffron light poured over the evening fields."],
    ["Rhyme", "on the second, fourth and sixth lines", "A grey sky, / a lonely cry, / a bird flies by."],
  ],
  "Table of devices in the poem, described, each with a SOYL example: metaphor, refrain, dialogue, imagery and rhyme.",
);
const vWords = table(
  ["Word", "Meaning"],
  [
    ["ramparts", "defensive walls around a fort or castle"],
    ["despair", "complete loss of hope"],
    ["carrot", "here, a bright orange-red hair colour"],
    ["yesternight", "an old word for last night"],
    ["declare", "announce firmly"],
    ["text", "here, a passage of scripture"],
  ],
  "Table of word meanings: ramparts, despair, carrot, declare, yesternight and text.",
  "Single words from the poem with their meanings.",
);
const vShortPlan = flow("LR", ["Key word of the question", "Point in one sentence", "Speaker's view in your own words", "Link to beauty and true love"], "Flow for a forty to fifty word answer: find the key word, state the point, give the speaker's view in your own words, and link it to beauty and true love.");

// ---------------------------------------------------------------- deck
const D = deck({
  title: "For Anne Gregory — W. B. Yeats",
  goals: [
    "Explain the central idea of the poem stanza by stanza in your own words",
    "Explain the contrast between outer beauty and inner worth",
    "Identify the dialogue form and the imagery of hair",
    "Compare the views of the two speakers",
    "Answer extract-based and 40–50 word questions on the poem",
  ],
  slides: [
    sl("title", "For Anne Gregory — W. B. Yeats", {
      b: `*First Flight*, poetry · Class 10 CBSE English.\n\n${READ}`,
      v: vBoard,
      n: "Welcome. Today's poem is For Anne Gregory by W. B. Yeats. It is a short conversation between an older man and a young woman about a big question: can a beautiful person be loved for who she really is? Please read it in First Flight now, aloud, twice. We will not repeat its lines here. Instead we will follow the debate.",
    }),
    sl("concept", "How to read this poem", {
      bl: [
        "Read it aloud twice from *First Flight*; notice who speaks each stanza.",
        "Ask: what does the older speaker warn? how does Anne answer? who has the last word?",
        "Then ask: what is the poem saying about beauty and love?",
        "In answers, explain in your own words; never copy lines.",
      ],
      n: "Read the poem aloud twice, and notice who is speaking in each stanza. Ask what the older speaker warns, how Anne answers, and who has the last word. Then ask what the poem is saying about beauty and love. In the exam, explain in your own words. Copying lines earns no marks.",
    }),
    sl("concept", "The poet: W. B. Yeats", {
      v: vPoet,
      n: "William Butler Yeats was an Irish poet and dramatist who lived from eighteen sixty-five to nineteen thirty-nine. In nineteen twenty-three he received the Nobel Prize in Literature. With his friend Lady Gregory he helped found the Abbey Theatre in Dublin. Anne Gregory was Lady Gregory's granddaughter, and this poem is addressed to her.",
    }),
    sl("concept", "The poem at a glance", {
      v: vGlance,
      n: "Here is the poem at a glance. It is a dialogue in three six-line stanzas. An older man speaks first and last; Anne speaks in the middle. The question is whether a beautiful young woman can be loved for her true self. The key image is her golden hair as fortress walls. The tone is affectionate, then philosophical.",
    }),
    sl("concept", "Stanza 1: the warning", {
      b: "In SOYL's words: the older speaker tells Anne that the suitors who fall hopelessly for her will never love her purely for herself. What captivates them is her golden hair, which he pictures as honey-coloured walls of a fortress around her ears.",
      n: "In the first stanza, the older speaker gives Anne a warning. The suitors who fall hopelessly for her, he says, will never love her purely for herself. What captivates them is her beautiful golden hair. He pictures it as honey-coloured walls of a fortress around her ears. It is affectionate, but it is also a warning.",
    }),
    sl("concept", "Stanza 2: Anne's answer", {
      b: "In SOYL's words: Anne answers that she can simply dye her hair, perhaps brown, black or bright orange-red, so that suitors will have to value her for her true self. Her reply is quick, practical and a little playful.",
      n: "In the second stanza, Anne answers back. She can simply dye her hair, she says, perhaps brown, black or bright orange-red. Then suitors would have to value her for her true self. Her reply is quick, practical and a little playful. She believes beauty can be removed like a coat, leaving the real person behind.",
    }),
    sl("check", "Check: Anne's solution", {
      chk: "mc_solution",
      n: "Your turn. What does Anne suggest she could do about the problem? Choose the best answer.",
    }),
    sl("concept", "Stanza 3: the last word", {
      b: "In SOYL's words: the older speaker replies that just the night before he heard an elderly, devout man announce that he had found scripture proving that God alone could love a person purely for herself, and not for her golden hair.",
      n: "In the third stanza, the older speaker has the last word. Just the night before, he says, he heard an elderly, devout man announce that he had found scripture proving something: that God alone could love a person purely for herself, and not for her golden hair. The conversation rises from hair to the soul.",
    }),
    sl("concept", "What the ending means", {
      b: "Human love, the poem suggests, is always partly drawn by appearance. A new hair colour would only create a new surface to admire. Only divine love is completely unconditional.",
      n: "What does the ending mean? Human love, the poem suggests, is always partly drawn by appearance. If Anne dyed her hair, suitors would simply admire the new colour, or some other feature. Only divine love sees the soul and ignores the surface. That is the wiser, sadder truth the older speaker offers.",
    }),
    sl("diagram", "A debate in three stanzas", {
      v: vJourney,
      n: "Here is the whole poem as a debate. The older speaker says suitors will love only her hair. Anne says she could dye it. The older speaker replies that God alone loves a person for herself. Notice the shape: a claim, a reply and a final answer, with age having the last word.",
    }),
    sl("two-column", "Two speakers, two views", {
      cols: [
        "**The older speaker**\n\n- experienced\n- beauty hides the true self\n- God alone loves unconditionally",
        "**Anne**\n\n- young and hopeful\n- beauty can be changed\n- dye the hair",
      ],
      v: vViews,
      n: "Put the two speakers side by side. The older speaker is experienced. He thinks beauty hides the true self, and that God alone loves unconditionally. Anne is young and hopeful. She thinks beauty can be changed, so she will dye her hair. The poem lets us smile at both, but it gives the last word to age.",
    }),
    sl("check", "Check: assertion and reason", {
      chk: "ar_hair",
      n: "Check yourself with an assertion and reason. Are both statements true? And does the second explain the first? Think about why the older speaker doubts Anne's suitors.",
    }),
    sl("concept", "Themes and message", {
      bl: [
        "**Outer beauty versus inner worth:** people are drawn by looks more than character.",
        "**The limits of human love:** it always notices appearance.",
        "**Divine love:** God alone loves unconditionally.",
        "**Youth and age:** hopeful plans meet experienced wisdom.",
      ],
      n: "The themes follow. People are drawn by outer beauty more than inner worth. Human love always notices appearance. Only divine love is unconditional. And youth meets age: a hopeful plan meets experienced wisdom. In answers, state a theme and support it with what each speaker says, in your own words.",
    }),
    sl("concept", "Poetic devices, with SOYL's own examples", {
      b: "Each device is described in the poem and illustrated with a SOYL sentence, not with the poem's lines.",
      v: vDevices,
      n: "Now the devices. A metaphor turns Anne's hair into honey-coloured fortress walls. A refrain closes each stanza with nearly the same idea. The poem is a dialogue between two speakers. Imagery gives the hair its honey colour. And rhyme falls on the second, fourth and sixth lines. The examples on the right are our own sentences.",
    }),
    sl("example", "Worked point: the fortress metaphor", {
      b: "Why call hair the walls of a fortress?",
      bl: [
        "**Clue 1:** fortress walls protect what is inside.",
        "**Clue 2:** they also stop outsiders from getting in.",
        "**Meaning:** Anne's beauty guards her, and blocks suitors' view of her true self.",
        "**Why it matters:** the image contains the whole argument of the poem.",
      ],
      n: "Here is a worked point. Why call hair the walls of a fortress? Fortress walls protect what is inside, but they also stop outsiders from getting in. So Anne's beauty guards her, and also blocks suitors from seeing her true self. That one image contains the whole argument of the poem.",
    }),
    sl("concept", "Tone", {
      b: "Affectionate and lightly teasing at first; Anne's reply is confident and playful; the last stanza is reflective and philosophical.",
      n: "Listen to the tone. The older speaker begins affectionately, lightly teasing Anne, like an old family friend. Anne's reply is confident and playful. In the last stanza the tone becomes reflective and philosophical. A light conversation about hair turns into a serious thought about love.",
    }),
    sl("concept", "Word meanings", {
      v: vWords,
      n: "A few words to know. Ramparts, defensive walls around a fort. Despair, complete loss of hope. Carrot, here a bright orange-red hair colour. Yesternight, an old word for last night. Declare, to announce firmly. And text, here a passage of scripture.",
    }),
    sl("check", "Check: the form", {
      chk: "fb_form",
      n: "Quick check. What kind of poem is this, with two speakers taking turns, and how many lines are in each stanza? Complete both blanks.",
    }),
    sl("example", "Worked example: a 40–50 word answer", {
      b: "*Question:* Why does the older speaker doubt Anne's suitors?",
      v: vShortPlan,
      bl: [
        "**Point:** he thinks they love her looks, not her self.",
        "**View (own words):** her golden hair captivates them, like fortress walls.",
        "**Link:** human love notices appearance; God's love alone does not.",
        "**Model (44 words):** *The older speaker believes Anne's admirers are dazzled by her lovely golden hair, which he imagines as fortress walls. They see her beauty, not her character. He adds that human affection always notices looks, and that God alone can love someone purely for herself.*",
      ],
      n: "Here is how to build a three mark answer. Find the key word: doubt. State the point: he thinks they love her looks. Give his view in your own words: her hair captivates them, like fortress walls. Link it to the theme: God's love alone ignores appearance. The model is forty-four words and copies nothing.",
    }),
    sl("check", "Check: refrain", {
      chk: "fb_refrain",
      n: "One more. Nearly the same idea ends each stanza. What is such a repeated ending called? Fill in the blank.",
    }),
    sl("summary", "Summary", {
      bl: [
        "The older speaker warns Anne that suitors will love her golden hair, not her.",
        "He pictures her hair as honey-coloured fortress walls.",
        "Anne replies that she could dye it, so they would love her true self.",
        "He answers that God alone can love a person purely for herself.",
        "Message: human love notices beauty; only divine love is unconditional. Read the poem in *First Flight*.",
      ],
      v: vJourney,
      n: "Let us sum up. The older speaker warns Anne that suitors will love her golden hair, not her. He pictures it as fortress walls. Anne replies that she could dye it. He answers that God alone can love a person purely for herself. The message: human love notices beauty, and only divine love is unconditional.",
    }),
    sl("exam-tips", "Exam tips", {
      bl: [
        "Never write out the poem's lines; give each speaker's view in your own words.",
        "Explain the fortress metaphor and what it implies.",
        "Explain why Anne's plan would not work, using the last stanza.",
        "40–50 word answers: point + speaker's view in own words + link.",
        "Common slips: mixing up the speakers; saying Anne will cut her hair; saying the older man is unkind.",
      ],
      n: "Exam tips. Never write out the lines; give each speaker's view in your own words. Explain the fortress metaphor. Use the last stanza to explain why Anne's plan would not work. And avoid the slips: keep the speakers straight, Anne talks of dyeing, not cutting, her hair, and the older man is affectionate, not unkind.",
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: "For Anne Gregory — study notes",
  sections: [
    {
      h: "1. The poet and the poem",
      t: 1,
      b: `${READ}\n\n**W. B. Yeats** (1865–1939) was an Irish poet and dramatist, a leader of the Irish literary revival and winner of the Nobel Prize in Literature (1923). With Lady Augusta Gregory he helped found Dublin's Abbey Theatre. *For Anne Gregory* is addressed to Lady Gregory's granddaughter.`,
      v: vPoet,
    },
    {
      h: "2. What happens (SOYL summary)",
      t: 1,
      b: "**Stanza 1 (older speaker):** suitors who fall hopelessly for Anne will never love her purely for herself; they are captivated by her golden hair, pictured as honey-coloured fortress walls around her ears.\n\n**Stanza 2 (Anne):** she can dye her hair brown, black or orange-red, so that suitors would have to value her true self.\n\n**Stanza 3 (older speaker):** just the night before, an elderly, devout man announced that he had found scripture proving that God alone could love a person purely for herself, not for her golden hair.",
      v: vJourney,
    },
    {
      h: "3. Themes and message",
      t: 2,
      b: "- **Outer beauty versus inner worth:** people are drawn by appearance more than by character.\n- **The limits of human love:** it always notices looks; changing them only creates a new surface.\n- **Divine love:** God alone loves unconditionally.\n- **Youth and age:** Anne's hopeful plan meets the speaker's experienced, gently ironic wisdom.",
      v: vViews,
    },
    {
      h: "4. Form, devices and imagery",
      t: 3,
      b: "**Form:** a dialogue in three six-line stanzas; the older speaker has stanzas 1 and 3, Anne stanza 2. Rhyme falls on lines 2, 4 and 6 of each stanza.\n\n**Devices:** metaphor (hair as honey-coloured fortress walls); refrain (nearly the same idea ends each stanza); imagery (the honey colour); dialogue.",
      v: vDevices,
      terms: [
        ["Metaphor", "A comparison made without *like* or *as*."],
        ["Refrain", "A line or idea repeated at the end of stanzas."],
        ["Dialogue", "A conversation between two or more speakers."],
      ],
    },
    {
      h: "5. Tone",
      t: 3,
      b: "Affectionate and lightly teasing; Anne's reply is confident and playful; the final stanza is reflective and philosophical.",
    },
    {
      h: "6. Word meanings",
      t: 4,
      b: "Single words from the poem with their meanings.",
      v: vWords,
    },
    {
      h: "7. Answering exam questions",
      t: 4,
      b: "**Extract-based (5 marks):** the board prints the poem's lines; SOYL practice uses commentary passages instead. Expect questions on the speakers, the warning, the metaphor, Anne's plan, the final stanza and the refrain.\n\n**Short answers (3 marks, 40–50 words):** point + speaker's view in your own words + link to beauty and true love.\n\nPractise with the poem itself in *First Flight*; never reproduce its lines in an answer.",
      v: vShortPlan,
    },
  ],
  tips: "**Board weight:** reference-to-context extract (5) and short answers (3 marks, 40–50 words) on First Flight poems (CBSE 2026-27, Section C).\n\n**How marks are awarded:** a correct point, support from the poem in your own words, and accurate expression within the word limit.\n\n**Common mistakes**\n1. Writing out the refrain instead of explaining it.\n2. Mixing up which speaker says what.\n3. Saying Anne plans to cut her hair.\n4. Missing the point of the last stanza.\n5. Calling the older speaker unkind.\n\n**Remember:** read the poem in your textbook, *First Flight*.",
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ["Who wrote *For Anne Gregory*?", "W. B. Yeats (1865–1939), Irish poet and dramatist.", "fact", 1],
  ["Two facts about Yeats", "Nobel Prize in Literature (1923); co-founded the Abbey Theatre.", "fact", 1],
  ["Who was Anne Gregory?", "Lady Gregory's granddaughter; the poem is addressed to her.", "fact", 1],
  ["Who speaks stanzas 1 and 3?", "An older man (the poet's voice).", "fact", 1],
  ["Who speaks stanza 2?", "Anne.", "fact", 1],
  ["The older speaker's warning", "Suitors will love her golden hair, not her true self.", "concept", 1],
  ["Anne's solution", "Dye her hair another colour.", "concept", 1],
  ["The final claim", "God alone can love a person purely for herself.", "concept", 1],
  ["Central idea", "Human love notices beauty; only divine love is unconditional.", "concept", 2],
  ["Why won't dyeing work?", "A new colour becomes a new attraction; human love sees surfaces.", "concept", 2],
  ["Youth and age in the poem", "Anne's hopeful plan meets the speaker's experienced wisdom.", "concept", 2],
  ["What is Anne like?", "Young, confident, spirited, practical.", "concept", 2],
  ["The hair metaphor", "Honey-coloured fortress walls around her ears.", "concept", 3],
  ["What does the fortress suggest?", "Beauty guards her and blocks suitors' view of her self.", "concept", 3],
  ["The refrain", "Nearly the same idea ends each stanza: being loved for oneself.", "concept", 3],
  ["Form", "Dialogue; three six-line stanzas; lines 2, 4, 6 rhyme.", "fact", 3],
  ["Tone", "Affectionate, teasing → reflective, philosophical.", "concept", 3],
  ["*ramparts*", "defensive walls around a fort or castle", "definition", 4],
  ["*despair*", "complete loss of hope", "definition", 4],
  ["*yesternight*", "an old word for last night", "definition", 4],
  ["*declare*", "announce firmly", "definition", 4],
  ["*text* (in the poem)", "a passage of scripture", "definition", 4],
  ["*carrot* (as a colour)", "a bright orange-red", "definition", 4],
  ["Plan for a 40–50 word answer", "Point + speaker's view in own words + link.", "exam-tip", 4],
  ["Most common slip", "Mixing up who says what.", "exam-tip", 4],
  ["Second common slip", "Saying Anne will cut her hair; she talks of dyeing it.", "exam-tip", 4],
  ["How to use the last stanza", "To explain why Anne's plan cannot fully work.", "exam-tip", 4],
  ["Should you quote the refrain?", "No. Explain the repeated idea in your own words.", "exam-tip", 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: "short",
  blueprint: "cbse-10-english-language-and-literature-chapter-test-short",
  title: "Chapter test (short) — For Anne Gregory",
  duration: 40,
  sections: [
    { id: "A", title: "Section A — Extract-based (5 marks)", instr: "Read the commentary and answer all parts. (The passage is SOYL commentary; read the poem in First Flight.)", items: ["src_warning"] },
    { id: "B", title: "Section B — Short answers (3 marks each)", instr: "Answer any three of four in 40–50 words.", items: [{ attempt: 3, keys: ["sa_speaker_says", "sa_anne_reply", "sa_god", "sa_ramparts"] }] },
    { id: "C", title: "Section C — Long answer (6 marks)", instr: "Answer any one in 100–120 words.", items: [{ attempt: 1, keys: ["la_beauty", "la_devices"] }] },
  ],
});
const T_LONG = test({
  kind: "long",
  blueprint: "cbse-10-english-language-and-literature-chapter-test-long",
  title: "Chapter test (long) — For Anne Gregory",
  duration: 90,
  sections: [
    { id: "A", title: "Section A — Extract-based (2 × 5 marks)", instr: "In each pair, answer one passage. (Passages are SOYL commentary.)", items: [{ attempt: 1, keys: ["src_reply", "src_god"] }, { attempt: 1, keys: ["src_metaphor", "src_ages"] }] },
    { id: "B", title: "Section B — Short answers (2 marks each)", instr: "Answer any three of four in 30–40 words.", items: [{ attempt: 3, keys: ["sb_who_anne", "sb_dye", "sb_why_fails", "sb_ramparts"] }] },
    { id: "C", title: "Section C — Short answers (3 marks each)", instr: "Answer any four of five in 40–50 words.", items: [{ attempt: 4, keys: ["sa_theme", "sa_dialogue", "sa_refrain", "sa_anne", "sa_devices"] }] },
    { id: "D", title: "Section D — Long answers (6 marks each)", instr: "Answer one question from each pair in 100–120 words.", items: [{ attempt: 1, keys: ["la_anne_diary", "la_agree"] }, { attempt: 1, keys: ["la_letter", "la_relevance"] }] },
  ],
});

build({
  dir: DIR,
  decks: [D],
  notes: N,
  flashcards: F,
  tests: [T_SHORT, T_LONG],
  checks: {
    syllabus: "topics t01–t04 only; no removed topics for 2026-27",
    literature_rule: "no line or phrase of the poem reproduced (only the title and single words: ramparts, despair, carrot, declare, yesternight, text); each stanza described by what the speaker argues, not paraphrased line by line; the hair metaphor and the refrain described, never quoted; the poem's words for the admirers and the hair colour replaced throughout; device examples are SOYL sentences; extract items use SOYL commentary (passage_origin soyl-commentary); textbook pointer on the title slide, notes and every passage stem; forbidden-phrase guard (ch18 src/guard.mjs) run after the build",
    accuracy: "form (dialogue, three six-line stanzas, rhyme on lines 2, 4, 6) and the speakers of each stanza checked",
    re_solve: "author verifier pass: every item re-answered from its stem",
    gate: "npm test -w @soyl/content-templates and content lint (lintExemplar) run clean on this chapter",
  },
});
checkForbidden(DIR, FORBID);
