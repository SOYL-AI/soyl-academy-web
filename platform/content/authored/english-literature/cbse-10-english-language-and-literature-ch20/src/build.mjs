// Build CBSE 10 English Language and Literature ch20 "Fog". Run from platform/:
//   npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch20/src/build.mjs
// LITERATURE RULE: the poem is never quoted or paraphrased line by line (it is so short that an ordered
// paraphrase would rebuild it); only single words and the title appear. Students read the poem in First
// Flight. After build(), a short forbidden-phrase guard (ch18's src/guard.mjs) fails the build on any hit.
import path from "node:path";
import { fileURLToPath } from "node:url";
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from "../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs";
import { checkForbidden } from "../../cbse-10-english-language-and-literature-ch18/src/guard.mjs";

setUnit("cbse-10-english-language-and-literature-ch20", "english-literature");
await import("./questions.mjs");
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const READ = "**Read the poem itself in your textbook, *First Flight* (NCERT), aloud, twice.** This lesson is SOYL's explanation; it does not reproduce the poem.";

// Short distinctive phrases of the poem that must never appear (reproduction guard; 4 words or fewer each).
const FORBID = [
  "fog comes", "little cat", "cat feet", "sits looking", "looking over",
  "harbor and city", "harbour and city", "silent haunches", "on silent", "moves on", "then moves", "it sits",
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
    ["Poet", "Carl Sandburg (1878–1967), American poet, journalist and biographer"],
    ["Known as", "a poet of Chicago and of working people"],
    ["Honours", "three Pulitzer Prizes: two for poetry, one for his Abraham Lincoln biography"],
    ["This poem", "first published in *Chicago Poems* (1916)"],
  ],
  "Table of facts about Carl Sandburg: an American poet, journalist and biographer, 1878 to 1967, known as a poet of Chicago, who won three Pulitzer Prizes; the poem first appeared in Chicago Poems in 1916.",
);
const vGlance = table(
  ["Feature", "Fog"],
  [
    ["Form", "free verse: six short lines in two stanzas (two lines, then four)"],
    ["Subject", "fog arriving over a harbour and a city, staying a while, then leaving"],
    ["Main device", "an extended metaphor: the fog behaves as a cat throughout"],
    ["Style", "plain words, one clear picture (close to imagism)"],
    ["Tone", "calm, quiet, observant, slightly mysterious"],
  ],
  "Table of the poem at a glance: six short lines of free verse in two stanzas, fog arriving over a harbour and a city then leaving, an extended metaphor of a cat, a plain imagist style, and a calm, quiet tone.",
);
const vJourney = flow("LR", ["Silent arrival, as if on soft paws", "Settles on its back legs", "Gazes over the harbour and the city", "Rises and leaves without warning"], "Flow of the poem: a silent arrival as if on soft paws, settling on its back legs, gazing over the harbour and the city, and rising to leave without warning.", "The fog's visit, as a cat's (SOYL summary).");
const vCatFog = table(
  ["The cat", "The fog"],
  [
    ["steps softly on padded paws", "creeps in without a sound"],
    ["sits still on its back legs", "settles low and lingers"],
    ["watches calmly, says nothing", "hangs over the city, silent"],
    ["leaves when it chooses", "lifts unpredictably"],
  ],
  "Table matching cat behaviour to fog: a cat steps softly and fog creeps in silently; a cat sits still and fog lingers; a cat watches calmly and fog hangs silent over the city; a cat leaves when it chooses and fog lifts unpredictably.",
);
const vDevices = table(
  ["Device", "Where in the poem (described)", "A SOYL example of the device"],
  [
    ["Extended metaphor", "the fog behaves as a cat from first line to last", "The traffic jam was a python: it coiled round the square, swallowed buses and slept till noon."],
    ["Visual imagery", "the fog resting above a harbour and a city", "Lanterns bobbing on a dark river."],
    ["Free verse", "no rhyme or regular rhythm", "Lines that follow the eye, not a beat."],
    ["Brevity (imagism)", "one clear picture in six short lines", "A single red leaf on fresh snow."],
  ],
  "Table of devices in the poem, described, each with a SOYL example: extended metaphor, visual imagery, free verse and brevity in the imagist manner.",
);
const vWords = table(
  ["Word or term", "Meaning"],
  [
    ["haunches", "the hips and back legs on which an animal sits"],
    ["harbour", "a sheltered stretch of water where ships anchor"],
    ["metaphor", "a comparison made without *like* or *as*"],
    ["extended metaphor", "one comparison carried through a whole poem"],
    ["imagism", "a style that presents one precise image in few words"],
    ["transience", "the quality of lasting only a short time"],
  ],
  "Table of words and terms: haunches, harbour, metaphor, extended metaphor, imagism and transience.",
  "Words from the poem and terms for discussing it.",
);
const vShortPlan = flow("LR", ["Key word of the question", "Point in one sentence", "Cat-like action in your own words", "What it shows about fog"], "Flow for a forty to fifty word answer: find the key word, state the point, describe the cat-like action in your own words, and explain what it shows about fog.");

// ---------------------------------------------------------------- deck
const D = deck({
  title: "Fog — Carl Sandburg",
  goals: [
    "Explain the central idea of the poem in your own words",
    "Explain how fog is compared to a cat",
    "Identify the extended metaphor and free verse",
    "Explain the poem's mood and its view of nature",
    "Answer extract-based and 40–50 word questions on the poem",
  ],
  slides: [
    sl("title", "Fog — Carl Sandburg", {
      b: `*First Flight*, poetry · Class 10 CBSE English.\n\n${READ}`,
      v: vBoard,
      n: "Welcome. Today's poem is Fog by Carl Sandburg. It is one of the shortest poems you will ever study, just six short lines, but it creates a picture you will not forget. Please read it in First Flight now, aloud, twice. We will not repeat its lines here. Instead we will understand its single comparison, its form and its mood.",
    }),
    sl("concept", "How to read this poem", {
      bl: [
        "Read it aloud twice from *First Flight*, slowly; it takes only a few seconds.",
        "Ask: what animal does the fog behave like? what does it do?",
        "Then ask: why this animal? what does the comparison show about fog?",
        "In answers, explain in your own words; never copy lines.",
      ],
      n: "Because the poem is so short, read it slowly. Read it aloud twice. Ask which animal the fog behaves like, and what it does. Then ask why the poet chose this animal and what the comparison shows about fog. In the exam, explain in your own words. With a poem this short, copying even a few words means copying the poem.",
    }),
    sl("concept", "The poet: Carl Sandburg", {
      v: vPoet,
      n: "Carl Sandburg was an American poet, journalist and biographer who lived from eighteen seventy-eight to nineteen sixty-seven. He is known as the poet of Chicago and of working people. He won three Pulitzer Prizes, two for poetry and one for his biography of Abraham Lincoln. This poem first appeared in Chicago Poems in nineteen sixteen.",
    }),
    sl("concept", "The poem at a glance", {
      v: vGlance,
      n: "Here is the poem at a glance. It is free verse, six short lines in two stanzas. Fog arrives over a harbour and a city, stays a while and leaves. The main device is an extended metaphor: the fog behaves as a cat throughout. The words are plain and the picture is clear. The tone is calm and quiet.",
    }),
    sl("concept", "Stanza 1: the arrival", {
      b: "In SOYL's words: the fog does not roll in or fall like a curtain. It creeps in the way a cat does, softly, as if on small padded paws, so quietly that nobody notices until it is there.",
      n: "In the first stanza, the fog arrives. But it does not roll in like a wave or fall like a curtain. It creeps in the way a cat does, softly, as if on small padded paws. Nobody hears it. Suddenly, it is just there. Think about how a cat enters a room. That is exactly how fog arrives.",
    }),
    sl("concept", "Stanza 2: watching, then leaving", {
      b: "In SOYL's words: the fog settles down on its back legs like a cat that has found a good spot, and gazes, still and silent, across the harbour and the city. Then, without warning or reason, it gets up and goes.",
      n: "In the second stanza, the fog stops moving. Like a cat that has found a good spot, it settles on its back legs and gazes across the harbour and the city, still and silent, calm but alert. Then, without any warning, it gets up and goes, the way a cat suddenly loses interest and wanders off.",
    }),
    sl("check", "Check: the animal", {
      chk: "mc_animal",
      n: "Your turn. Which animal does the fog behave like in this poem? Choose the best answer.",
    }),
    sl("concept", "Why a cat?", {
      b: "Fog and cats share real qualities. Both move silently. Both can stay perfectly still. Both seem independent, arriving and leaving when they choose. A gentle animal also gives the poem a gentle mood.",
      v: vCatFog,
      n: "Why a cat? Because fog and cats really are alike. Both move silently. Both can stay perfectly still for a long time. Both seem independent, coming and going as they please. And a cat is a gentle, graceful animal, so it gives the poem a gentle mood. Imagine the poem with a wolf instead. It would feel threatening.",
    }),
    sl("concept", "Metaphor, not simile", {
      b: "Sandburg never says the fog is *like* a cat. He simply lets it behave as one. A comparison without *like* or *as* is a **metaphor**; carried through the whole poem, it is an **extended metaphor**.",
      n: "Here is an important point for the exam. The poet never says the fog is like a cat. He simply lets it behave as one. A comparison without like or as is a metaphor. And because this single comparison runs through the whole poem, from arrival to departure, it is called an extended metaphor.",
    }),
    sl("diagram", "The fog's visit", {
      v: vJourney,
      n: "Here is the whole poem as a flow. A silent arrival, as if on soft paws. Settling on its back legs. Gazing over the harbour and the city. And rising to leave without warning. Four actions, one cat, one fog. That is the entire poem, and every action matches something real about fog.",
    }),
    sl("two-column", "Cat and fog", {
      cols: [
        "**The cat**\n\n- padded paws\n- sits still\n- watches calmly\n- leaves when it chooses",
        "**The fog**\n\n- creeps in silently\n- lingers\n- hangs over the city\n- lifts unpredictably",
      ],
      v: vCatFog,
      n: "Put the cat and the fog side by side. Padded paws, and the fog creeps in silently. Sitting still, and the fog lingers. Watching calmly, and the fog hangs over the city. Leaving when it chooses, and the fog lifts unpredictably. This is why the comparison feels so natural to anyone who has watched a cat.",
    }),
    sl("check", "Check: assertion and reason", {
      chk: "ar_metaphor",
      n: "Check yourself with an assertion and reason. Are both statements true? And does the second explain the first? Think about what makes a comparison a metaphor.",
    }),
    sl("concept", "Themes and message", {
      bl: [
        "**Nature's quiet power:** fog takes over a whole city without a sound.",
        "**Independence of nature:** it comes and goes on its own terms.",
        "**Transience:** the visit is brief; beautiful moments pass.",
        "**Seeing the ordinary freshly:** a nuisance becomes something graceful.",
      ],
      n: "The themes follow. Nature has quiet power: fog takes over a whole city without a sound. Nature is independent: it comes and goes on its own terms. The visit is brief, so the poem is also about transience. And the poem helps us see something ordinary, even annoying, as graceful. In answers, state a theme and support it with the cat's actions.",
    }),
    sl("concept", "Poetic devices, with SOYL's own examples", {
      b: "Each device is described in the poem and illustrated with a SOYL sentence, not with the poem's lines.",
      v: vDevices,
      n: "Now the devices. The extended metaphor is the heart of the poem. Visual imagery lets us see the fog over the harbour and the city. The poem is free verse, with no rhyme or regular rhythm. And its brevity, one clear picture in few words, is close to the style called imagism. The examples on the right are our own sentences.",
    }),
    sl("example", "Worked point: why the title matters", {
      b: "The poem never explains its comparison. The title does that work.",
      bl: [
        "**Clue 1:** every action in the poem is a cat's action.",
        "**Clue 2:** the only place the word for the subject appears is the title.",
        "**Meaning:** the title tells us the cat-like creature is really fog.",
        "**Why it matters:** without the title, we might read the poem as about a real cat.",
      ],
      n: "Here is a worked point. Every action in the poem is a cat's action. So how do we know it is about fog? The title tells us. Without it, we might think we were reading about a real cat. A one-word title, plain and short like the poem, unlocks the whole metaphor.",
    }),
    sl("concept", "Tone and mood", {
      b: "Calm, quiet and observant; the mood is peaceful and slightly mysterious. The poem ignores fog's dangers and shows its grace.",
      n: "Listen to the tone. It is calm, quiet and observant, like someone watching a cat from a window. The mood is peaceful and a little mysterious, because the fog arrives and departs for reasons nobody knows. Notice what the poem leaves out: fog's dangers, such as hidden roads and delayed ships. It shows only fog's grace.",
    }),
    sl("concept", "Words and terms", {
      v: vWords,
      n: "A few words and terms to know. Haunches, the hips and back legs on which an animal sits. Harbour, a sheltered stretch of water for ships. Metaphor, a comparison without like or as. Extended metaphor, one comparison carried through a whole poem. Imagism, one precise image in few words. And transience, lasting only a short time.",
    }),
    sl("check", "Check: the form", {
      chk: "fb_free",
      n: "Quick check. What kind of verse is this poem written in, and how many stanzas does it have? Complete both blanks.",
    }),
    sl("example", "Worked example: a 40–50 word answer", {
      b: "*Question:* How does the fog behave like a cat?",
      v: vShortPlan,
      bl: [
        "**Point:** the fog's every action is a cat's.",
        "**Actions (own words):** soft arrival, still sitting, calm gazing, sudden leaving.",
        "**What it shows:** fog is silent, lingering and unpredictable.",
        "**Model (44 words):** *Sandburg's fog acts entirely like a cat. It creeps in on soundless paws, sits motionless on its back legs and watches the harbour and the city. Then it wanders off without warning. Each action shows a real quality of fog: silence, stillness and unpredictability.*",
      ],
      n: "Here is how to build a three mark answer. Find the key word: cat. State the point: every action of the fog is a cat's. Give the actions in your own words. Say what they show: fog is silent, lingering and unpredictable. The model is forty-four words and copies nothing from the poem.",
    }),
    sl("check", "Check: metaphor", {
      chk: "fb_metaphor",
      n: "One more. A comparison without like or as, carried through a whole poem. What is it called? Fill in the blank.",
    }),
    sl("summary", "Summary", {
      bl: [
        "Fog creeps in silently, as a cat does on soft paws.",
        "It settles on its back legs and gazes over a harbour and a city.",
        "Then it rises and leaves without warning.",
        "Extended metaphor; free verse in two short stanzas; calm, quiet tone.",
        "Message: nature comes and goes on its own terms. Read the poem in *First Flight*.",
      ],
      v: vJourney,
      n: "Let us sum up. Fog creeps in silently, as a cat does. It settles on its back legs and gazes over a harbour and a city. Then it rises and leaves without warning. The device is an extended metaphor. The form is free verse in two short stanzas. The message: nature comes and goes on its own terms.",
    }),
    sl("exam-tips", "Exam tips", {
      bl: [
        "Never write out the poem's lines; with six short lines, even a phrase is too much.",
        "Call the device an extended metaphor, not a simile, and explain why.",
        "Link each cat-like action to a real quality of fog.",
        "40–50 word answers: point + action in own words + what it shows.",
        "Common slips: calling it a simile; saying the fog is frightening; saying the poem rhymes.",
      ],
      n: "Exam tips. Never write out the lines. With a poem this short, even a phrase is too much. Call the device an extended metaphor and explain why. Link each cat-like action to a real quality of fog. And avoid the common slips: it is not a simile, the fog is not frightening, and the poem does not rhyme.",
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: "Fog — study notes",
  sections: [
    {
      h: "1. The poet and the poem",
      t: 1,
      b: `${READ}\n\n**Carl Sandburg** (1878–1967) was an American poet, journalist and biographer, known as a poet of Chicago and of working people. He won three Pulitzer Prizes, two for poetry and one for his biography of Abraham Lincoln. *Fog* first appeared in *Chicago Poems* (1916).`,
      v: vPoet,
    },
    {
      h: "2. What happens (SOYL summary)",
      t: 1,
      b: "**Stanza 1 (two lines):** the fog arrives silently, the way a cat creeps in on padded paws.\n\n**Stanza 2 (four lines):** it settles on its back legs and gazes, still and silent, over a harbour and a city; then it gets up and leaves without warning.",
      v: vJourney,
    },
    {
      h: "3. Themes and message",
      t: 2,
      b: "- **Nature's quiet power:** fog takes over a whole city without a sound.\n- **Independence:** fog, like a cat, comes and goes on its own terms; humans cannot control it.\n- **Transience:** the visit is brief, as beautiful moments are.\n- **Fresh seeing:** a nuisance is shown as graceful and calm.",
    },
    {
      h: "4. The extended metaphor, devices and form",
      t: 3,
      b: "**Extended metaphor:** the fog is never said to be *like* a cat; it simply behaves as one, from arrival to departure. The comparison works because both are silent, still, watchful and independent.\n\n**Other devices:** visual imagery (the fog over a harbour and a city).\n\n**Form:** free verse, six short lines in two stanzas, plain words; one clear image in the manner of imagism. The brevity mirrors fog's brief visit.",
      vs: [vCatFog, vDevices],
      terms: [
        ["Metaphor", "A comparison made without *like* or *as*."],
        ["Extended metaphor", "One comparison carried through a whole poem."],
        ["Imagism", "A style of poetry that presents one precise image in plain, few words."],
      ],
    },
    {
      h: "5. Tone and mood",
      t: 3,
      b: "Calm, quiet and observant; the mood is peaceful and slightly mysterious. The poem leaves out fog's dangers and shows only its grace.",
    },
    {
      h: "6. Words and terms",
      t: 4,
      b: "Words from the poem and terms for discussing it.",
      v: vWords,
    },
    {
      h: "7. Answering exam questions",
      t: 4,
      b: "**Extract-based (5 marks):** the board prints the poem's lines; SOYL practice uses commentary passages instead. Expect questions on the comparison, the cat's actions, the device, the form and the mood.\n\n**Short answers (3 marks, 40–50 words):** point + cat-like action in your own words + what it shows about fog.\n\nPractise with the poem itself in *First Flight*; never reproduce its lines in an answer.",
      v: vShortPlan,
    },
  ],
  tips: "**Board weight:** reference-to-context extract (5) and short answers (3 marks, 40–50 words) on First Flight poems (CBSE 2026-27, Section C).\n\n**How marks are awarded:** a correct point, support from the poem in your own words, and accurate expression within the word limit.\n\n**Common mistakes**\n1. Writing out the poem; it is so short that any phrase reproduces it.\n2. Calling the comparison a simile.\n3. Describing the fog as frightening.\n4. Saying the poem rhymes.\n5. Listing the cat's actions without linking them to fog.\n\n**Remember:** read the poem in your textbook, *First Flight*.",
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ["Who wrote *Fog*?", "Carl Sandburg (1878–1967), American poet.", "fact", 1],
  ["Two facts about Carl Sandburg", "Poet of Chicago; three Pulitzer Prizes (two for poetry, one for a Lincoln biography).", "fact", 1],
  ["Where did *Fog* first appear?", "*Chicago Poems* (1916).", "fact", 1],
  ["What is the fog compared to?", "A cat.", "concept", 1],
  ["How does the fog arrive?", "Silently, as a cat creeps in on padded paws.", "concept", 1],
  ["What does the fog do next?", "Settles on its back legs and gazes over a harbour and a city.", "concept", 1],
  ["How does the fog leave?", "Suddenly, without warning, as a cat wanders off.", "concept", 1],
  ["Central idea", "Fog arrives and departs quietly and independently, like a cat.", "concept", 2],
  ["What does the poem suggest about nature?", "It is independent; humans cannot control its coming or going.", "concept", 2],
  ["Transience in the poem", "The fog's visit is brief; beautiful moments pass.", "concept", 2],
  ["Qualities shared by fog and cats", "Silence, stillness, watchfulness, independence.", "concept", 2],
  ["Main device", "Extended metaphor: the fog behaves as a cat throughout.", "concept", 3],
  ["Why metaphor, not simile?", "No *like* or *as*; the fog simply acts as a cat.", "concept", 3],
  ["Form", "Free verse: six short lines in two stanzas.", "fact", 3],
  ["Why is the poem so short?", "One clear image (imagism); brevity mirrors fog's brief visit.", "concept", 3],
  ["Tone", "Calm, quiet, observant; mood peaceful, slightly mysterious.", "concept", 3],
  ["Why a cat, not a wolf?", "A cat is gentle and graceful, so the fog seems peaceful.", "concept", 3],
  ["Why does the title matter?", "It reveals that the cat-like creature is fog.", "concept", 3],
  ["*haunches*", "the hips and back legs on which an animal sits", "definition", 4],
  ["*harbour*", "a sheltered stretch of water where ships anchor", "definition", 4],
  ["*metaphor*", "a comparison made without *like* or *as*", "definition", 4],
  ["*extended metaphor*", "one comparison carried through a whole poem", "definition", 4],
  ["*imagism*", "a style that presents one precise image in few words", "definition", 4],
  ["*transience*", "the quality of lasting only a short time", "definition", 4],
  ["Plan for a 40–50 word answer", "Point + cat-like action in own words + what it shows about fog.", "exam-tip", 4],
  ["Most common slip", "Calling the comparison a simile.", "exam-tip", 4],
  ["Second common slip", "Calling the fog frightening; the mood is calm.", "exam-tip", 4],
  ["Should you quote the poem in answers?", "No. It is six lines long; describe the actions in your own words.", "exam-tip", 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: "short",
  blueprint: "cbse-10-english-language-and-literature-chapter-test-short",
  title: "Chapter test (short) — Fog",
  duration: 40,
  sections: [
    { id: "A", title: "Section A — Extract-based (5 marks)", instr: "Read the commentary and answer all parts. (The passage is SOYL commentary; read the poem in First Flight.)", items: ["src_arrival"] },
    { id: "B", title: "Section B — Short answers (3 marks each)", instr: "Answer any three of four in 40–50 words.", items: [{ attempt: 3, keys: ["sa_cat", "sa_metaphor", "sa_arrival", "sa_sitting"] }] },
    { id: "C", title: "Section C — Long answer (6 marks)", instr: "Answer any one in 100–120 words.", items: [{ attempt: 1, keys: ["la_extended", "la_imagery"] }] },
  ],
});
const T_LONG = test({
  kind: "long",
  blueprint: "cbse-10-english-language-and-literature-chapter-test-long",
  title: "Chapter test (long) — Fog",
  duration: 90,
  sections: [
    { id: "A", title: "Section A — Extract-based (2 × 5 marks)", instr: "In each pair, answer one passage. (Passages are SOYL commentary.)", items: [{ attempt: 1, keys: ["src_watching", "src_metaphor"] }, { attempt: 1, keys: ["src_city", "src_mood"] }] },
    { id: "B", title: "Section B — Short answers (2 marks each)", instr: "Answer any three of four in 30–40 words.", items: [{ attempt: 3, keys: ["sb_haunches", "sb_leaves", "sb_sees", "sb_short"] }] },
    { id: "C", title: "Section C — Short answers (3 marks each)", instr: "Answer any four of five in 40–50 words.", items: [{ attempt: 4, keys: ["sa_qualities", "sa_free_verse", "sa_nature", "sa_devices", "sa_transience"] }] },
    { id: "D", title: "Section D — Long answers (6 marks each)", instr: "Answer one question from each pair in 100–120 words.", items: [{ attempt: 1, keys: ["la_cat_diary", "la_nature_city"] }, { attempt: 1, keys: ["la_letter", "la_compare"] }] },
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
    literature_rule: "no line or phrase of the poem reproduced (only the title and single words: haunches, harbour, city, silent); the six lines never paraphrased in order, the fog's four actions described by idea; the extended metaphor explained, never quoted; device examples are SOYL sentences; extract items use SOYL commentary (passage_origin soyl-commentary); textbook pointer on the title slide, notes and every passage stem; forbidden-phrase guard (ch18 src/guard.mjs) run after the build",
    accuracy: "form (free verse, six lines, two stanzas of two and four lines) and the fog's actions checked; poet facts (three Pulitzers, Chicago Poems 1916) flagged for confirmation in the README",
    re_solve: "author verifier pass: every item re-answered from its stem",
    gate: "npm test -w @soyl/content-templates and content lint (lintExemplar) run clean on this chapter",
  },
});
checkForbidden(DIR, FORBID);
