// Build CBSE 10 English Language and Literature ch19 "The Trees". Run from platform/:
//   npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch19/src/build.mjs
// LITERATURE RULE: the poem (in copyright) is never quoted or paraphrased line by line; only single words and
// the title appear. Students read the poem in First Flight. After build(), a short forbidden-phrase guard
// (ch18's src/guard.mjs; each entry 4 words or fewer) fails the build on any hit.
import path from "node:path";
import { fileURLToPath } from "node:url";
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from "../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs";
import { checkForbidden } from "../../cbse-10-english-language-and-literature-ch18/src/guard.mjs";

setUnit("cbse-10-english-language-and-literature-ch19", "english-literature");
await import("./questions.mjs");
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const READ = "**Read the poem itself in your textbook, *First Flight* (NCERT), aloud, twice.** This lesson is SOYL's explanation; it does not reproduce the poem.";

// Short distinctive phrases of the poem that must never appear (reproduction guard; 4 words or fewer each).
const FORBID = [
  "moving out into", "forest that was empty", "no bird could sit", "no insect hide", "bury its feet",
  "full of trees", "all these days", "all these nights", "the roots work", "disengage themselves",
  "veranda floor", "strain toward the glass", "stiff with exertion", "long cramped boughs", "shuffling under the roof",
  "newly discharged", "discharged patients", "half dazed", "clinic doors", "long letters",
  "scarcely mention", "night is fresh", "whole moon shines", "sky still open", "leaves and lichen",
  "like a voice", "full of whispers", "will be silent", "glass is breaking", "stumbling forward",
  "winds rush", "rush to meet them", "broken like a mirror", "pieces flash", "tallest oak",
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
    ["Poet", "Adrienne Rich (1929–2012), American poet and essayist"],
    ["Known as", "a leading feminist voice in American poetry"],
    ["Honours", "National Book Award (1974) for *Diving into the Wreck*"],
  ],
  "Table of facts about Adrienne Rich: an American poet and essayist, 1929 to 2012, a leading feminist voice, who won the National Book Award in 1974 for Diving into the Wreck.",
);
const vGlance = table(
  ["Feature", "The Trees"],
  [
    ["Form", "free verse in four stanzas; no regular rhyme or metre"],
    ["Speaker", "a woman indoors, writing letters (first person)"],
    ["Event", "trees kept inside a house break out and return to the forest"],
    ["Movement", "an empty forest → a night of struggle → a quiet speaker → a sudden break-out"],
    ["Key symbols", "the house (confinement), the forest (freedom), the trees (the confined)"],
    ["Tone", "calm and mysterious, becoming urgent and liberating"],
  ],
  "Table of the poem at a glance: free verse in four stanzas, a woman speaker writing letters indoors, trees breaking out of a house to return to the forest, a movement from an empty forest to a sudden break-out, the house, forest and trees as symbols, and a tone that moves from calm to urgent.",
);
const vJourney = flow("LR", ["The forest stands empty", "Roots and branches struggle all night", "The speaker writes, saying little", "Panes shatter; the trees lurch out", "The winds welcome them; the moon shatters"], "Flow of the poem: the forest stands empty, roots and branches struggle all night, the speaker writes and says little, panes shatter and the trees lurch out, and the winds welcome them as the moon seems to shatter.", "The four stanzas, from confinement to freedom (SOYL summary).");
const vSymbol = table(
  ["", "On the surface", "Underneath"],
  [
    ["The house", "a home with a veranda", "confinement; the domestic limits placed on women"],
    ["The trees", "potted trees and plants", "women, or nature, kept for decoration"],
    ["The forest", "woodland", "freedom, growth, natural belonging"],
    ["Shattered panes and moon", "breaking glass, moonlight", "an old order broken for ever"],
  ],
  "Table of surface and deeper meanings: the house stands for confinement, the trees for women or nature kept for decoration, the forest for freedom and belonging, and the shattered panes and moon for an old order broken for ever.",
);
const vDevices = table(
  ["Device", "Where in the poem (described)", "A SOYL example of the device"],
  [
    ["Personification", "roots labour, branches shuffle, winds hurry to greet", "The old bus groaned up the hill."],
    ["Simile", "branches likened to dazed patients leaving hospital", "The kite trembled like a nervous swimmer."],
    ["Imagery", "struggling roots, a moonlit night, scent drifting indoors", "The smell of wet earth after the first rain."],
    ["Symbolism", "the house, the forest and the trees", "A locked gate stood for every rule she hated."],
    ["Enjambment", "lines run on without punctuation", "A thought that spills over into the next line."],
    ["Free verse", "no regular rhyme or metre", "Lines of any length, following the movement of thought."],
  ],
  "Table of poetic devices in the poem, described, each with a SOYL example: personification, simile, imagery, symbolism, enjambment and free verse.",
);
const vWords = table(
  ["Word", "Meaning"],
  [
    ["veranda", "a roofed platform along the outside of a house"],
    ["disengage", "free oneself; detach"],
    ["exertion", "great physical effort"],
    ["boughs", "large branches of a tree"],
    ["lichen", "a crusty growth on bark and rocks"],
    ["crown", "the top of a tree"],
  ],
  "Table of word meanings: veranda, disengage, exertion, boughs, lichen and crown.",
  "Single words from the poem with their meanings.",
);
const vShortPlan = flow("LR", ["Key word of the question", "Point in one sentence", "Image in your own words", "Link to the theme of freedom"], "Flow for a forty to fifty word answer: find the key word, state the point, describe the image in your own words, and link it to the theme of freedom.");

// ---------------------------------------------------------------- deck
const D = deck({
  title: "The Trees — Adrienne Rich",
  goals: [
    "Explain the central idea of the poem stanza by stanza in your own words",
    "Explain the movement of the trees from house to forest as a symbol of freedom",
    "Identify personification, imagery and symbolism",
    "Interpret the speaker's silence and the poem's two readings",
    "Answer extract-based and 40–50 word questions on the poem",
  ],
  slides: [
    sl("title", "The Trees — Adrienne Rich", {
      b: `*First Flight*, poetry · Class 10 CBSE English.\n\n${READ}`,
      v: vBoard,
      n: "Welcome. Today's poem is The Trees by Adrienne Rich. It describes something impossible: trees that have been kept inside a house break out in the night and return to the forest. Please read it in First Flight now, aloud, twice. We will not repeat its lines here. Instead we will follow the escape, the speaker, the symbols and the devices.",
    }),
    sl("concept", "How to read this poem", {
      bl: [
        "Read it aloud twice from *First Flight*; follow the pictures, not a rhyme.",
        "Ask: where are the trees? what do they do through the night? what does the speaker do?",
        "Then ask: what might the trees, the house and the forest stand for?",
        "In answers, explain in your own words; never copy lines.",
      ],
      n: "This poem has no regular rhyme, so read it for its pictures. Read it aloud twice. Ask where the trees are, what they do through the night and what the speaker does. Then ask the big question: what might the trees, the house and the forest stand for? In the exam, explain in your own words. Copying lines earns no marks.",
    }),
    sl("concept", "The poet: Adrienne Rich", {
      v: vPoet,
      n: "Adrienne Rich was an American poet and essayist who lived from nineteen twenty-nine to two thousand and twelve. She was one of the leading feminist voices in American poetry, and she won the National Book Award in nineteen seventy-four for Diving into the Wreck. Knowing this helps us understand one reading of this poem.",
    }),
    sl("concept", "The poem at a glance", {
      v: vGlance,
      n: "Here is the poem at a glance. It is free verse in four stanzas. The speaker is a woman sitting indoors, writing letters. The event: trees kept inside a house break out and return to the forest. The house, the forest and the trees are symbols. The tone begins calm and mysterious and becomes urgent and liberating.",
    }),
    sl("concept", "Stanza 1: an empty forest", {
      b: "In SOYL's words: the poem opens with news that the trees kept indoors are leaving for the forest. The forest has stood bare for days and nights: birds had nowhere to perch, insects nowhere to shelter, and the sun no shade to rest in. By dawn it will be filled again.",
      n: "The poem opens with strange news. The trees that have been kept indoors are leaving for the forest. Then the poet looks at the forest. It has stood bare for a long time. Birds had nowhere to perch, insects nowhere to shelter, and the sun no shade to rest in. A forest without trees is hardly a forest. By dawn, it will be filled again.",
    }),
    sl("concept", "Stanza 2: a night of struggle", {
      b: "In SOYL's words: all night the roots labour to pull free of cracks in the veranda boards. Leaves press towards the windows, twigs grow rigid with effort, and the big branches, cramped for years under the roof, drag forward like dazed patients just released from hospital.",
      n: "Now the struggle. All night the roots labour to pull free of cracks in the veranda boards. Leaves press towards the windows. Twigs grow rigid with effort. And the big branches, cramped for years under the roof, drag themselves forward like dazed patients just released from hospital. Freedom here is slow, stiff and hard-won.",
    }),
    sl("check", "Check: the simile", {
      chk: "mc_simile",
      n: "Your turn. The poet compares the branches to something. Which of these is the simile? Choose the best answer.",
    }),
    sl("concept", "Stanza 3: the quiet speaker", {
      b: "In SOYL's words: the speaker sits inside with the veranda doors open, writing letters in which she barely refers to the departure. The night is cool and clear, the full moon shines, and the scent of leaves drifts in, compared to a voice calling. Her mind is full of murmurs that will be quiet by tomorrow.",
      n: "Meanwhile the speaker sits indoors with the veranda doors open. She is writing letters, and she barely refers to the trees leaving. The night is cool and clear, and a full moon shines. The scent of leaves drifts into the rooms, and the poet compares it to a voice calling. Her mind is full of murmurs. Why does she say so little?",
    }),
    sl("concept", "Stanza 4: the break-out", {
      b: "In SOYL's words: the last stanza tells us to listen. Window panes are shattering. The trees lurch out into the night, and the winds hurry to greet them. The moon itself seems to shatter like a looking-glass, and its fragments glitter at the top of the tallest tree.",
      n: "The last stanza begins with a command: listen. Window panes are shattering. The trees lurch out into the night, and the winds hurry forward to greet them, as if welcoming them home. Then the moon itself seems to shatter like a looking-glass, and its fragments glitter at the top of the tallest tree. The trees are free.",
    }),
    sl("diagram", "From confinement to freedom", {
      v: vJourney,
      n: "Here is the whole poem as a flow. The forest stands empty. Roots and branches struggle all night. The speaker writes and says little. Panes shatter and the trees lurch out. The winds welcome them and the moon shatters. Notice the shape: a slow, quiet build-up and then a sudden, dramatic release.",
    }),
    sl("two-column", "Surface and depth", {
      cols: [
        "**On the surface**\n\n- a house with a veranda\n- potted trees\n- woodland\n- breaking glass",
        "**Underneath**\n\n- confinement\n- women, or nature, kept for decoration\n- freedom and growth\n- an old order broken",
      ],
      v: vSymbol,
      n: "Every element has a surface and a depth. The house is a home, but also confinement. The potted trees can stand for women kept within the home, or for nature kept as decoration. The forest is woodland, but also freedom and growth. And the shattering glass is the breaking of an old order, for ever.",
    }),
    sl("check", "Check: assertion and reason", {
      chk: "ar_patients",
      n: "Check yourself with an assertion and reason. Are both statements true? And does the second one explain why the comparison in the first one fits?",
    }),
    sl("concept", "Themes and two readings", {
      bl: [
        "**Freedom:** every living thing longs to grow in its natural place.",
        "**A feminist reading:** the trees as women confined to the home; the forest as the wider world.",
        "**An environmental reading:** humans confine nature for decoration; nature reclaims its place.",
        "**The cost of freedom:** escape is slow, painful and needs effort.",
      ],
      n: "The themes follow. Every living thing longs to grow freely. Read one way, the trees are women confined to the home, and the forest is the wider world. Read another way, humans confine nature for decoration, and nature takes back its place. Either way, freedom is hard-won. In answers, give a reading and support it with images.",
    }),
    sl("concept", "Poetic devices, with SOYL's own examples", {
      b: "Each device is described in the poem and illustrated with a SOYL sentence, not with the poem's lines.",
      v: vDevices,
      n: "Now the devices. Personification runs all through the poem: roots labour, branches shuffle, winds greet. A simile likens the branches to dazed patients. Imagery appeals to sight and smell. The house, forest and trees are symbols. Lines run on in enjambment, and the whole poem is free verse. The examples on the right are our own sentences.",
    }),
    sl("example", "Worked point: the speaker's silence", {
      b: "The poem never says why the speaker barely mentions the departure. We work it out from clues.",
      bl: [
        "**Clue 1:** she leaves the veranda doors open.",
        "**Clue 2:** she notices the night, the moon and the scent; she is not unaware.",
        "**Meaning:** she quietly accepts, even supports, the trees' escape.",
        "**Why it matters:** in the feminist reading, she may share their longing to be free.",
      ],
      n: "Here is a worked point. Why does the speaker say so little? First clue: she leaves the doors open. Second clue: she notices the night, the moon and the scent, so she is not unaware. So she quietly accepts, even supports, the escape. In the feminist reading, she may share the trees' longing to be free.",
    }),
    sl("concept", "Tone", {
      b: "Calm and mysterious at first, quiet and dreamlike in the middle, then urgent and liberating at the end. The speaker never sounds alarmed by the departure.",
      n: "Listen to the tone. The opening is calm and mysterious, stating something impossible as plain news. The middle is quiet and dreamlike: a cool night, moonlight and scents. The ending is urgent, full of breaking glass and rushing wind, and it feels liberating. Notice that the speaker never sounds alarmed. That tells us something about her.",
    }),
    sl("concept", "Word meanings", {
      v: vWords,
      n: "A few words to know. Veranda, a roofed platform along the outside of a house. Disengage, to free oneself. Exertion, great physical effort. Boughs, large branches. Lichen, a crusty growth on bark and rocks. And crown, the top of a tree.",
    }),
    sl("check", "Check: free verse", {
      chk: "fb_free",
      n: "Quick check. This poem has no regular rhyme scheme. What kind of verse is it? Complete both blanks.",
    }),
    sl("example", "Worked example: a 40–50 word answer", {
      b: "*Question:* Why is the forest described as empty?",
      v: vShortPlan,
      bl: [
        "**Point:** its trees have been taken away and kept indoors.",
        "**Image (own words):** birds, insects and the sun have nothing to use.",
        "**Link:** the trees' return will restore the forest's life.",
        "**Model (46 words):** *The forest has lost its trees, which humans carried off to decorate a house. Birds therefore find no branches, insects find no cover and the sun finds no shade. The forest cannot be itself until the trees come home, so their escape restores its life.*",
      ],
      n: "Here is how to build a three mark answer. Find the key word: empty. State the point: its trees have been taken indoors. Describe the image in your own words: birds, insects and the sun have nothing to use. Link it to the theme: their return restores the forest. The model is forty-six words and copies nothing.",
    }),
    sl("check", "Check: personification", {
      chk: "fb_personify",
      n: "One more. Roots labour, branches shuffle and winds hurry to greet the trees. What is this device called? Fill in the blank.",
    }),
    sl("summary", "Summary", {
      bl: [
        "Trees kept indoors set off for a forest that has stood empty without them.",
        "All night they struggle; branches drag forward like dazed patients.",
        "The speaker writes letters, barely mentioning it, with the doors open.",
        "Panes shatter, the trees lurch out, the winds greet them, the moon seems to shatter.",
        "Message: confined beings long for freedom. Read the poem in *First Flight*.",
      ],
      v: vJourney,
      n: "Let us sum up. Trees kept indoors set off for an empty forest. All night they struggle, and their branches drag forward like dazed patients. The speaker writes letters and barely mentions it, leaving the doors open. Then panes shatter, the trees lurch out and the moon seems to shatter. The message: confined beings long for freedom.",
    }),
    sl("exam-tips", "Exam tips", {
      bl: [
        "Never write out the poem's lines; describe each stanza in your own words.",
        "Explain at least one symbolic reading: women, or nature.",
        "Use the speaker's silence and the open doors as evidence.",
        "40–50 word answers: point + image in own words + link to freedom.",
        "Common slips: saying the speaker stops the trees; that the escape is easy; that the poem rhymes.",
      ],
      n: "Exam tips. Never write out the lines; describe each stanza in your own words. Explain at least one symbolic reading. Use the speaker's silence and the open doors as evidence. Keep three mark answers to point, image and link. And avoid the slips: the speaker does not stop the trees, the escape is not easy, and the poem does not rhyme.",
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: "The Trees — study notes",
  sections: [
    {
      h: "1. The poet and the poem",
      t: 1,
      b: `${READ}\n\n**Adrienne Rich** (1929–2012) was an American poet and essayist, a leading feminist voice; she won the National Book Award in 1974 for *Diving into the Wreck*. *The Trees* describes an impossible event, trees breaking out of a house, and makes it a powerful image of freedom.`,
      v: vPoet,
    },
    {
      h: "2. What happens (SOYL summary)",
      t: 1,
      b: "**Stanza 1:** the trees kept indoors set off for the forest, which has stood bare: no perches for birds, no shelter for insects, no shade for the sun. By dawn it will be filled.\n\n**Stanza 2:** through the night the roots labour to pull free of the veranda boards; leaves press towards the windows; twigs grow rigid with effort; cramped branches drag forward like dazed patients leaving hospital.\n\n**Stanza 3:** the speaker sits inside with the doors open, writing letters that barely refer to the departure; a cool, clear night, a full moon, the scent of leaves drifting in like a calling voice; her mind full of murmurs.\n\n**Stanza 4:** a command to listen; panes shattering; the trees lurch into the night; the winds hurry to greet them; the moon seems to shatter, its fragments glittering at the top of the tallest tree.",
      v: vJourney,
    },
    {
      h: "3. Themes and message",
      t: 2,
      b: "- **Freedom:** every living thing longs to grow in its natural place.\n- **The feminist reading:** the trees as women confined to the home by social expectations; the forest as the wider world; the speaker's silence as quiet sympathy.\n- **The environmental reading:** humans uproot nature for decoration; the forest is lifeless without its trees; nature reclaims its place.\n- **The cost of freedom:** escape is slow and painful, but once made it is final.",
    },
    {
      h: "4. Symbolism, devices and form",
      t: 3,
      b: "**Symbols:** the house (confinement), the forest (freedom and belonging), the trees (the confined), the shattered panes and moon (an old order broken).\n\n**Devices:** personification (roots, branches, winds); simile (branches likened to dazed patients; the moon to a looking-glass); imagery of sight and smell; enjambment.\n\n**Form:** free verse in four stanzas; long, run-on lines let one image tumble into the next.",
      vs: [vSymbol, vDevices],
      terms: [
        ["Personification", "Giving human actions or feelings to non-human things."],
        ["Simile", "A comparison using *like* or *as*."],
        ["Symbol", "An object that stands for an idea (the forest for freedom)."],
      ],
    },
    {
      h: "5. Tone",
      t: 3,
      b: "Calm and mysterious at first, quiet and dreamlike in the middle, urgent and liberating at the end. The speaker never sounds alarmed, which hints at her sympathy.",
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
      b: "**Extract-based (5 marks):** the board prints the poem's lines; SOYL practice uses commentary passages instead. Expect questions on the empty forest, the struggle, the simile, the speaker, the break-out and the symbols.\n\n**Short answers (3 marks, 40–50 words):** point + image in your own words + link to the theme of freedom.\n\nPractise with the poem itself in *First Flight*; never reproduce its lines in an answer.",
      v: vShortPlan,
    },
  ],
  tips: "**Board weight:** reference-to-context extract (5) and short answers (3 marks, 40–50 words) on First Flight poems (CBSE 2026-27, Section C).\n\n**How marks are awarded:** a correct point, support from the poem in your own words, and accurate expression within the word limit.\n\n**Common mistakes**\n1. Writing out the poem instead of explaining it.\n2. Treating the poem as only about plants.\n3. Saying the speaker tries to stop the trees.\n4. Calling the escape easy or quick.\n5. Mixing up the simile (dazed patients) with personification.\n\n**Remember:** read the poem in your textbook, *First Flight*.",
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ["Who wrote *The Trees*?", "Adrienne Rich (1929–2012), American poet and essayist.", "fact", 1],
  ["Two facts about Adrienne Rich", "A leading feminist voice; National Book Award (1974) for *Diving into the Wreck*.", "fact", 1],
  ["Where have the trees been kept?", "Inside a house, on and around its veranda.", "concept", 1],
  ["Why is the forest empty?", "Its trees have been taken indoors.", "concept", 1],
  ["What is missing in the empty forest?", "Perches for birds, shelter for insects, shade for the sun.", "concept", 1],
  ["What do the roots do all night?", "Labour to pull free of cracks in the veranda boards.", "concept", 1],
  ["What is the speaker doing?", "Writing letters indoors, with the veranda doors open.", "concept", 1],
  ["What does she say about the departure?", "Almost nothing.", "concept", 1],
  ["How does the poem end?", "Panes shatter, the trees lurch out, the winds greet them, the moon seems to shatter.", "concept", 1],
  ["Central idea", "Confined beings long to return to freedom; escape is hard but final.", "concept", 2],
  ["Feminist reading", "Trees = women confined to the home; forest = the wider world.", "concept", 2],
  ["Environmental reading", "Humans confine nature for decoration; nature reclaims its place.", "concept", 2],
  ["Why might the speaker stay quiet?", "She quietly supports the escape, perhaps sharing the longing.", "concept", 2],
  ["The main simile", "Branches likened to dazed patients leaving hospital.", "concept", 3],
  ["Personification in the poem", "Roots labour, branches shuffle, winds hurry to greet.", "concept", 3],
  ["What do the shattering panes and moon suggest?", "An old order broken for ever.", "concept", 3],
  ["Form", "Free verse in four stanzas.", "fact", 3],
  ["Tone", "Calm and mysterious → urgent and liberating.", "concept", 3],
  ["*veranda*", "a roofed platform along the outside of a house", "definition", 4],
  ["*disengage*", "free oneself; detach", "definition", 4],
  ["*exertion*", "great physical effort", "definition", 4],
  ["*boughs*", "large branches of a tree", "definition", 4],
  ["*lichen*", "a crusty growth on bark and rocks", "definition", 4],
  ["*crown* (of a tree)", "the top of a tree", "definition", 4],
  ["Plan for a 40–50 word answer", "Point + image in own words + link to freedom.", "exam-tip", 4],
  ["Most common slip", "Reading the poem as only about plants.", "exam-tip", 4],
  ["Evidence for the speaker's sympathy", "The open doors and her calm, unalarmed tone.", "exam-tip", 4],
  ["Should you quote the poem in answers?", "No. Describe each image in your own words.", "exam-tip", 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: "short",
  blueprint: "cbse-10-english-language-and-literature-chapter-test-short",
  title: "Chapter test (short) — The Trees",
  duration: 40,
  sections: [
    { id: "A", title: "Section A — Extract-based (5 marks)", instr: "Read the commentary and answer all parts. (The passage is SOYL commentary; read the poem in First Flight.)", items: ["src_empty_forest"] },
    { id: "B", title: "Section B — Short answers (3 marks each)", instr: "Answer any three of four in 40–50 words.", items: [{ attempt: 3, keys: ["sa_empty", "sa_effort", "sa_patients", "sa_speaker"] }] },
    { id: "C", title: "Section C — Long answer (6 marks)", instr: "Answer any one in 100–120 words.", items: [{ attempt: 1, keys: ["la_freedom", "la_symbolism"] }] },
  ],
});
const T_LONG = test({
  kind: "long",
  blueprint: "cbse-10-english-language-and-literature-chapter-test-long",
  title: "Chapter test (long) — The Trees",
  duration: 90,
  sections: [
    { id: "A", title: "Section A — Extract-based (2 × 5 marks)", instr: "In each pair, answer one passage. (Passages are SOYL commentary.)", items: [{ attempt: 1, keys: ["src_struggle", "src_speaker"] }, { attempt: 1, keys: ["src_breakout", "src_meaning"] }] },
    { id: "B", title: "Section B — Short answers (2 marks each)", instr: "Answer any three of four in 30–40 words.", items: [{ attempt: 3, keys: ["sb_forest_empty", "sb_letters", "sb_winds", "sb_exertion"] }] },
    { id: "C", title: "Section C — Short answers (3 marks each)", instr: "Answer any four of five in 40–50 words.", items: [{ attempt: 4, keys: ["sa_moon", "sa_feminist", "sa_nature", "sa_devices", "sa_symbols"] }] },
    { id: "D", title: "Section D — Long answers (6 marks each)", instr: "Answer one question from each pair in 100–120 words.", items: [{ attempt: 1, keys: ["la_tree_diary", "la_speaker_view"] }, { attempt: 1, keys: ["la_letter", "la_relevance"] }] },
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
    literature_rule: "poem in copyright: no line or phrase reproduced (only the title and single words: veranda, disengage, exertion, boughs, lichen, crown); each stanza described in SOYL words, not paraphrased line by line; similes described, never quoted; device examples are SOYL sentences; extract items use SOYL commentary (passage_origin soyl-commentary); textbook pointer on the title slide, notes and every passage stem; forbidden-phrase guard (ch18 src/guard.mjs) run after the build",
    accuracy: "form (free verse, four stanzas) and stanza content checked; the speaker is a woman indoors writing letters, not one of the trees",
    re_solve: "author verifier pass: every item re-answered from its stem",
    gate: "npm test -w @soyl/content-templates and content lint (lintExemplar) run clean on this chapter",
  },
});
checkForbidden(DIR, FORBID);
