// Build CBSE 10 English Language and Literature ch18 "Amanda!". Run from platform/:
//   npx tsx content/authored/english-literature/cbse-10-english-language-and-literature-ch18/src/build.mjs
// LITERATURE RULE: the poem (in copyright) is never quoted or paraphrased line by line; only single words,
// the girl's name and the title appear. Students read the poem in First Flight. After build(), a short
// forbidden-phrase guard (src/guard.mjs; each entry 4 words or fewer) fails the build on any hit.
import path from "node:path";
import { fileURLToPath } from "node:url";
import { setUnit, deck, sl, table, flow, notes, cards, test, build } from "../../../english-language/cbse-10-english-language-and-literature-ch02/src/lib.mjs";
import { checkForbidden } from "./guard.mjs";

setUnit("cbse-10-english-language-and-literature-ch18", "english-literature");
await import("./questions.mjs");
const DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const READ = "**Read the poem itself in your textbook, *First Flight* (NCERT), aloud, twice.** This lesson is SOYL's explanation; it does not reproduce the poem.";

// Short distinctive phrases of the poem that must never appear (reproduction guard; 4 words or fewer each).
const FORBID = [
  "bite your nails", "hunch your shoulders", "sit up straight", "stop that slouching",
  "emerald sea", "sole inhabitant", "drifting blissfully", "languid emerald",
  "finish your homework", "tidy your room", "clean your shoes", "roaming the street",
  "bare feet", "soft dust", "silence is golden", "freedom is sweet",
  "eat that chocolate", "remember your acne", "when I'm speaking", "not a care",
  "tranquil and rare", "let down my", "stop that sulking", "always so moody", "nagged at you", "anyone would think",
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
    ["Poet", "Robin Klein (born 1936), Australian writer"],
    ["Known for", "books for children and young people"],
    ["Best-known novel", "*Hating Alison Ashley*"],
  ],
  "Table of facts about Robin Klein: an Australian writer born in 1936, known for books for children and young people, whose best-known novel is Hating Alison Ashley.",
);
const vGlance = table(
  ["Feature", "Amanda!"],
  [
    ["Voices", "two: an adult (probably her mother) and Amanda in her own head"],
    ["Structure", "seven stanzas; the adult's stanzas alternate with three bracketed daydream stanzas"],
    ["The daydreams", "a mermaid alone at sea; an orphan wandering free; Rapunzel in her tower"],
    ["Ending", "the adult complains of sulking and denies nagging: irony"],
    ["Theme", "a child's need for freedom, space and understanding"],
    ["Tone", "adult: impatient, scolding; Amanda: dreamy, wistful"],
  ],
  "Table of the poem at a glance: two voices, seven stanzas with three bracketed daydreams, the three daydreams, an ironic ending, the theme of a child's need for freedom, and two contrasting tones.",
);
const vJourney = flow("LR", ["Habits corrected", "Mermaid: solitude", "Chores demanded", "Orphan: no orders", "Diet and manners", "Tower: a private world", "Sulking blamed; nagging denied"], "Flow of the poem: habits corrected, the mermaid daydream of solitude, chores demanded, the orphan daydream of having no orders, comments on diet and manners, the tower daydream of a private world, and finally sulking blamed while nagging is denied.", "The poem's alternating pattern (SOYL summary).");
const vWorlds = table(
  ["", "The adult's world", "Amanda's world"],
  [
    ["Where", "outside the brackets", "inside the brackets"],
    ["Content", "orders, questions, complaints", "a sea, dusty streets, a tower"],
    ["Pace", "fast, crowded", "slow, spacious"],
    ["Sound", "the name repeated like a bell", "one gentle rhyme per stanza"],
    ["Feeling", "pressure", "freedom"],
  ],
  "Table contrasting the two worlds of the poem: the adult's world outside the brackets, with orders, a fast pace, the repeated name and pressure; Amanda's world inside the brackets, with a sea, dusty streets and a tower, a slow pace, a gentle rhyme and freedom.",
);
const vDevices = table(
  ["Device", "Where in the poem (described)", "A SOYL example of the device"],
  [
    ["Repetition", "the girl's name after almost every command", "Ravi! Shoes! Ravi! Bag! Ravi! Bus!"],
    ["Parentheses (brackets)", "around Amanda's three daydreams", "I nodded at the lecture (and sailed off to Mars)."],
    ["Allusion", "the fairy-tale girl in the tower", "He guarded his notes like a dragon guarding gold."],
    ["Imagery", "the calm green sea, dusty lanes walked barefoot, the tower", "A blue kite hanging still over a sleepy field."],
    ["Irony", "the adult's final denial", "A fire-safety poster that catches fire."],
    ["Contrast", "sharp commands against slow, calm dreams", "A noisy station and, inside the train, one sleeping child."],
  ],
  "Table of poetic devices in the poem, described, each with a SOYL example: repetition, parentheses, allusion, imagery, irony and contrast.",
);
const vWords = table(
  ["Word", "Meaning"],
  [
    ["hunch", "bend the shoulders and back forward"],
    ["slouching", "sitting or standing in a lazy, drooping way"],
    ["languid", "slow, relaxed and unhurried"],
    ["acne", "pimples on the skin, common in the teenage years"],
    ["emerald", "bright green, like the gemstone"],
    ["tranquil", "calm and peaceful"],
    ["sulking", "staying silent and bad-tempered to show displeasure"],
  ],
  "Table of word meanings: hunch, slouching, languid, acne, emerald, tranquil and sulking.",
  "Single words from the poem with their meanings.",
);
const vShortPlan = flow("LR", ["Key word of the question", "Point in one sentence", "Daydream or command in your own words", "Link to freedom or nagging"], "Flow for a forty to fifty word answer: find the key word, state the point, describe the daydream or command in your own words, and link it to freedom or nagging.");

// ---------------------------------------------------------------- deck
const D = deck({
  title: "Amanda! — Robin Klein",
  goals: [
    "Explain the central idea of the poem stanza by stanza in your own words",
    "Explain the child's desire for freedom and the effect of constant nagging",
    "Identify the use of parentheses, imagery and allusion",
    "Interpret the ironic ending",
    "Answer extract-based and 40–50 word questions on the poem",
  ],
  slides: [
    sl("title", "Amanda! — Robin Klein", {
      b: `*First Flight*, poetry · Class 10 CBSE English.\n\n${READ}`,
      v: vBoard,
      n: "Welcome. Today's poem is Amanda, by Robin Klein. It is a poem with two voices: an adult who keeps correcting a girl, and the girl herself, who escapes into her imagination. Please read it in First Flight now, aloud, twice. We will not repeat its lines here. Instead we will understand the voices, the daydreams, the devices and the ending.",
    }),
    sl("concept", "How to read this poem", {
      bl: [
        "Read it aloud twice from *First Flight*; use one voice for the adult and a softer one for the brackets.",
        "Ask: who is speaking in each stanza? what is Amanda told? where does she go in her mind?",
        "Then ask: what does the ending tell us about both of them?",
        "In answers, explain in your own words; never copy lines.",
      ],
      n: "Try reading this poem with two voices. Use a sharp voice for the adult and a soft, dreamy one for the stanzas in brackets. Ask who is speaking each time, what Amanda is told, and where she goes in her mind. Then ask what the ending tells us. In the exam, explain in your own words. Copying lines does not earn marks.",
    }),
    sl("concept", "The poet: Robin Klein", {
      v: vPoet,
      n: "Robin Klein is an Australian writer, born in nineteen thirty-six. She is best known for books for children and young people, and her most famous novel is Hating Alison Ashley. She understands how young people think and feel, and in this poem she lets us hear a girl's private thoughts while an adult talks at her.",
    }),
    sl("concept", "The poem at a glance", {
      v: vGlance,
      n: "Here is the poem at a glance. There are two voices: an adult, probably Amanda's mother, and Amanda inside her own head. Seven stanzas alternate between the adult's commands and three bracketed daydreams. Amanda imagines being a mermaid, an orphan and Rapunzel. The ending is ironic. The theme is a child's need for freedom and understanding.",
    }),
    sl("concept", "The adult's voice", {
      b: "In SOYL's words: the adult's stanzas are a stream of corrections about nail-biting and posture, then homework, an untidy room and dirty shoes, then chocolate and her skin, and good manners while being spoken to. Each one ends with the girl's name, called out sharply.",
      n: "Listen to the adult. She corrects Amanda about nail-biting and posture. Then she asks about homework, the untidy room and dirty shoes. Then she warns about chocolate and Amanda's skin, and demands attention while she is talking. After nearly every command comes the girl's name, called out like an alarm. No single remark is cruel. Together they are exhausting.",
    }),
    sl("concept", "Amanda's escapes", {
      b: "In SOYL's words: after each round of orders, Amanda drifts away inside brackets. First she is a mermaid floating alone in a calm green sea. Next she is an orphan wandering barefoot through quiet, dusty streets. Last she is Rapunzel, content in her tower and refusing ever to lower her hair.",
      n: "Now listen to Amanda. She never answers back. Instead, inside brackets, she drifts away. First she is a mermaid, floating alone in a calm green sea. Then she is an orphan, walking barefoot through quiet, dusty streets with nobody to command her. Finally she is Rapunzel, happy in her tower, and she will never let her hair down for anyone.",
    }),
    sl("check", "Check: the daydreams", {
      chk: "mc_mermaid_alone",
      n: "Your turn. Think about the mermaid, the orphan and the girl in the tower. What do all three daydreams have in common? Choose the best answer.",
    }),
    sl("concept", "Why these dreams?", {
      b: "Each daydream is about being alone and unordered. The mermaid has the whole sea to herself. The orphan has no parents to give instructions. Rapunzel's tower, a prison in the old tale, becomes a refuge that nobody can climb into.",
      n: "Why these three dreams? Each one is about solitude and freedom. The mermaid has the whole sea to herself. The orphan has nobody to give instructions. And Amanda turns the tower, a prison in the old tale, into a refuge nobody can enter. The dreams are not random. Each is an answer to the pressure she has just heard.",
    }),
    sl("concept", "The ending", {
      b: "In SOYL's words: the last stanza has no bracketed reply. The adult scolds Amanda for sulking and moods, then protests that nobody should think she nags. The protest is itself more nagging. Amanda's silence is her answer.",
      n: "Now the ending. This time there is no bracketed daydream. The adult scolds Amanda for sulking and being moody, then protests that nobody should think she nags. That protest is one more piece of nagging. This is irony. And Amanda's silence is her answer. Her sulking is not the cause of the trouble. It is the result of it.",
    }),
    sl("diagram", "The poem's pattern", {
      v: vJourney,
      n: "Here is the whole poem as a pattern. Habits corrected, then the mermaid. Chores demanded, then the orphan. Diet and manners, then the tower. And at the end, sulking blamed and nagging denied, with no reply. The pattern of command and escape is the poem's shape. Notice that the adult speaks first and last.",
    }),
    sl("two-column", "Two worlds", {
      cols: [
        "**The adult's world**\n\n- outside the brackets\n- orders and complaints\n- fast and crowded\n- pressure",
        "**Amanda's world**\n\n- inside the brackets\n- sea, streets, tower\n- slow and spacious\n- freedom",
      ],
      v: vWorlds,
      n: "The poem sets two worlds side by side. Outside the brackets is the adult's world: orders and complaints, fast and crowded, full of pressure. Inside the brackets is Amanda's world: a sea, dusty streets and a tower, slow and spacious, full of freedom. Even the sound differs: a repeated name on one side, a gentle rhyme on the other.",
    }),
    sl("check", "Check: assertion and reason", {
      chk: "ar_daydream",
      n: "Check yourself with an assertion and reason. Read both statements. Are both true? And does the second one explain the first? Think about why a lonely sea would appeal to Amanda.",
    }),
    sl("concept", "Themes and message", {
      bl: [
        "**A child's need for freedom:** space to think, dream and grow.",
        "**The effect of nagging:** constant correction makes a child withdraw.",
        "**Listening:** care without listening feels like criticism.",
        "**Imagination as escape:** daydreams give Amanda the peace home does not.",
      ],
      n: "The themes follow. A child needs freedom and space. Constant correction makes a child withdraw. Care without listening feels like criticism. And imagination becomes Amanda's escape. In answers, state a theme and support it with the poem: the stream of orders, the three daydreams and the silent ending.",
    }),
    sl("concept", "Poetic devices, with SOYL's own examples", {
      b: "Each device is described in the poem and illustrated with a SOYL sentence, not with the poem's lines.",
      v: vDevices,
      n: "Now the devices. Repetition of the name makes the scolding relentless. Brackets hold Amanda's private thoughts. Allusion borrows the fairy tale of Rapunzel. Imagery paints the sea, the dusty streets and the tower. Irony arrives at the end. And contrast runs through the whole poem. The examples on the right are our own sentences.",
    }),
    sl("example", "Worked point: the brackets", {
      b: "The brackets are not decoration. They tell us something about Amanda that the adult never learns.",
      bl: [
        "**Clue 1:** the adult never responds to anything inside them.",
        "**Clue 2:** they hold only Amanda's imagined escapes.",
        "**Meaning:** they mark a private world that the adult cannot hear or enter.",
        "**Why it matters:** the reader hears Amanda; the adult never does.",
      ],
      n: "Here is a worked point. Why brackets? The adult never responds to anything inside them, and they hold only Amanda's escapes. So they mark a private world the adult cannot hear or enter. That gives the reader a special position. We hear Amanda's longing. The adult never does. That is why our sympathy goes to the girl.",
    }),
    sl("concept", "Tone", {
      b: "Two tones clash. The adult's is impatient, scolding and sharp. Amanda's is dreamy, wistful and calm. The ending adds irony, with a note of self-pity from the adult.",
      n: "Listen to the tone. It is really two tones. The adult sounds impatient, scolding and sharp. Amanda sounds dreamy, wistful and calm. At the end, the adult sounds almost hurt, as though she were the one being treated unfairly. That adds irony. The clash of tones is the clash between the two characters.",
    }),
    sl("concept", "Word meanings", {
      v: vWords,
      n: "A few words to know. Hunch, to bend the shoulders forward. Slouching, sitting in a lazy, drooping way. Languid, slow and relaxed. Acne, pimples common in the teenage years. Emerald, bright green. Tranquil, calm and peaceful. And sulking, staying silent and bad-tempered to show displeasure.",
    }),
    sl("check", "Check: the brackets", {
      chk: "fb_brackets",
      n: "Quick check. What appears inside the brackets in this poem? Complete both blanks.",
    }),
    sl("example", "Worked example: a 40–50 word answer", {
      b: "*Question:* Why does Amanda dream of being an orphan?",
      v: vShortPlan,
      bl: [
        "**Point:** she wants freedom from constant orders.",
        "**Daydream (own words):** walking barefoot through quiet streets, alone.",
        "**Link:** it follows reminders about homework, her room and her shoes.",
        "**Model (44 words):** *Amanda pictures herself as an orphan because an orphan has nobody giving instructions. The daydream comes straight after reminders about schoolwork and chores. She ignores the hardship of such a life and imagines only quiet, dusty streets where she can wander freely.*",
      ],
      n: "Here is how to build a three mark answer. Find the key word: orphan. State the point: she wants freedom from orders. Describe the daydream in your own words: quiet streets, walking alone. Link it to the reminders that come just before. The model is forty-four words and copies nothing from the poem.",
    }),
    sl("check", "Check: allusion", {
      chk: "fb_allusion",
      n: "One more. Amanda mentions a girl from a fairy tale. What is a reference to a well-known story called? Fill in the blank.",
    }),
    sl("summary", "Summary", {
      bl: [
        "An adult corrects Amanda again and again, calling her name after each order.",
        "In brackets, Amanda escapes: a mermaid, an orphan, Rapunzel in her tower.",
        "Each dream is about solitude and freedom from orders.",
        "Ending: the adult blames her sulking and denies nagging, ironically.",
        "Message: children need space and to be listened to. Read the poem in *First Flight*.",
      ],
      v: vJourney,
      n: "Let us sum up. An adult corrects Amanda again and again. In brackets, Amanda escapes, as a mermaid, an orphan and Rapunzel. Each dream is about solitude and freedom. At the end the adult blames her sulking and denies nagging, which is ironic. The message: children need space, and they need to be listened to.",
    }),
    sl("exam-tips", "Exam tips", {
      bl: [
        "Never write out the poem's lines; name the commands as topics and describe the dreams.",
        "Always explain why each daydream suits Amanda: solitude, no orders, a private world.",
        "Explain the irony of the ending clearly.",
        "40–50 word answers: point + daydream or command in own words + link.",
        "Common slips: saying Amanda answers back; that Rapunzel's tower is a prison for Amanda; that the adult is simply wicked.",
      ],
      n: "Exam tips. Never write out the lines; name the commands as topics and describe the dreams. Explain why each daydream suits Amanda. Explain the irony of the ending clearly. Keep three mark answers to a point, a description and a link. And avoid the slips: Amanda never answers back, the tower is her refuge, and the adult is worried, not wicked.",
    }),
  ],
});

// ---------------------------------------------------------------- notes
const N = notes({
  title: "Amanda! — study notes",
  sections: [
    {
      h: "1. The poet and the poem",
      t: 1,
      b: `${READ}\n\n**Robin Klein** (born 1936) is an Australian writer, known mainly for books for children and young people; her best-known novel is *Hating Alison Ashley*. *Amanda!* lets us hear both an adult's constant corrections and the private daydreams of the girl who is being corrected.`,
      v: vPoet,
    },
    {
      h: "2. What happens (SOYL summary)",
      t: 1,
      b: "**The adult's stanzas (1, 3, 5, 7):** a stream of corrections: nail-biting and posture; homework, an untidy room and dirty shoes; chocolate and her skin, and attention while being spoken to; finally sulking and moods, with a protest that she is not a nag.\n\n**Amanda's stanzas (2, 4, 6), in brackets:** a mermaid floating alone in a calm green sea; an orphan wandering barefoot through quiet, dusty streets; Rapunzel content in her tower, who would never lower her hair.\n\n**The ending:** no bracketed reply; Amanda's silence answers the adult.",
      v: vJourney,
    },
    {
      h: "3. Themes and message",
      t: 2,
      b: "- **A child's need for freedom:** space to think, dream and grow.\n- **The effect of constant nagging:** the child withdraws into fantasy and silence.\n- **Care without listening:** the adult means well but never asks or waits.\n- **Imagination:** daydreams give Amanda the peace that home does not.\n- **Communication between generations:** both sides need patience; the adult must listen first.",
    },
    {
      h: "4. Structure, devices and imagery",
      t: 3,
      b: "**Structure:** two voices alternate. The adult's stanzas are held together by the repeated name; Amanda's three bracketed stanzas are shorter and each keeps one rhyme sound, giving them a soft music.\n\n**Devices:** repetition (the name); parentheses (the daydreams); allusion (Rapunzel; the mermaid of folklore); imagery (the calm green sea, dusty lanes walked barefoot, the quiet tower); irony (the final denial); contrast (pressure against freedom).",
      vs: [vWorlds, vDevices],
      terms: [
        ["Allusion", "A reference to a well-known story, person or event (here, Rapunzel)."],
        ["Parentheses", "Brackets that set words apart; here they hold Amanda's private thoughts."],
        ["Irony", "A gap between what is said and what is true (the adult denies nagging while nagging)."],
      ],
    },
    {
      h: "5. Tone",
      t: 3,
      b: "Two tones clash: the adult's is impatient, scolding and sharp; Amanda's is dreamy, wistful and calm. The ending adds irony and a touch of self-pity from the adult.",
    },
    {
      h: "6. Word meanings",
      t: 4,
      b: "Single words from the poem with their meanings. *Rapunzel* is a fairy-tale girl kept in a tall tower and reached by climbing her long hair.",
      v: vWords,
    },
    {
      h: "7. Answering exam questions",
      t: 4,
      b: "**Extract-based (5 marks):** the board prints the poem's lines; SOYL practice uses commentary passages instead. Expect questions on who is speaking, what Amanda is told, each daydream, the brackets and the ending.\n\n**Short answers (3 marks, 40–50 words):** point + daydream or command in your own words + link to freedom or nagging.\n\nPractise with the poem itself in *First Flight*; never reproduce its lines in an answer.",
      v: vShortPlan,
    },
  ],
  tips: "**Board weight:** reference-to-context extract (5) and short answers (3 marks, 40–50 words) on First Flight poems (CBSE 2026-27, Section C).\n\n**How marks are awarded:** a correct point, support from the poem in your own words, and accurate expression within the word limit.\n\n**Common mistakes**\n1. Writing out the commands instead of naming them as topics.\n2. Saying Amanda argues with the adult.\n3. Calling Rapunzel's tower a prison in Amanda's dream.\n4. Missing the irony of the ending.\n5. Treating the adult as simply wicked.\n\n**Remember:** read the poem in your textbook, *First Flight*.",
});

// ---------------------------------------------------------------- flashcards
const F = cards([
  ["Who wrote *Amanda!*?", "Robin Klein (born 1936), Australian writer.", "fact", 1],
  ["Robin Klein's best-known novel", "*Hating Alison Ashley*.", "fact", 1],
  ["Who speaks the stanzas outside the brackets?", "An adult, probably Amanda's mother.", "fact", 1],
  ["What is Amanda corrected for?", "Nail-biting, posture, homework, her room, shoes, chocolate, attention, sulking.", "concept", 1],
  ["Daydream 1", "A mermaid floating alone in a calm green sea.", "concept", 1],
  ["Daydream 2", "An orphan wandering barefoot through quiet, dusty streets.", "concept", 1],
  ["Daydream 3", "Rapunzel, happy in her tower, never lowering her hair.", "concept", 1],
  ["What links the three daydreams?", "Solitude and freedom from orders.", "concept", 2],
  ["Why an orphan?", "To Amanda it means nobody to give instructions.", "concept", 2],
  ["Central idea", "Children need freedom and to be listened to; nagging drives them inward.", "concept", 2],
  ["Why does Amanda sulk?", "Because she is constantly corrected and never heard.", "concept", 2],
  ["Is the adult wicked?", "No: she cares, but she never listens.", "concept", 2],
  ["What do the brackets hold?", "Amanda's private daydreams, which the adult never hears.", "concept", 3],
  ["Effect of the repeated name", "The scolding sounds relentless, like an alarm.", "concept", 3],
  ["Allusion in the poem", "Rapunzel, the fairy-tale girl in the tower.", "concept", 3],
  ["How does Amanda change the Rapunzel story?", "The tower becomes a refuge, not a prison.", "concept", 3],
  ["Irony at the end", "The adult denies nagging while nagging.", "concept", 3],
  ["Tone of the two voices", "Adult: impatient, scolding. Amanda: dreamy, wistful.", "concept", 3],
  ["Sound of the bracketed stanzas", "Each keeps one rhyme sound: soft and musical.", "concept", 3],
  ["*hunch*", "bend the shoulders and back forward", "definition", 4],
  ["*slouching*", "sitting or standing in a lazy, drooping way", "definition", 4],
  ["*languid*", "slow, relaxed and unhurried", "definition", 4],
  ["*tranquil*", "calm and peaceful", "definition", 4],
  ["*acne*", "pimples on the skin, common in the teenage years", "definition", 4],
  ["*sulking*", "staying silent and bad-tempered to show displeasure", "definition", 4],
  ["Plan for a 40–50 word answer", "Point + daydream or command in own words + link.", "exam-tip", 4],
  ["Most common slip", "Saying Amanda answers back; she never does.", "exam-tip", 4],
  ["Should you quote the poem in answers?", "No. Name the commands as topics and describe the dreams.", "exam-tip", 4],
]);

// ---------------------------------------------------------------- tests
const T_SHORT = test({
  kind: "short",
  blueprint: "cbse-10-english-language-and-literature-chapter-test-short",
  title: "Chapter test (short) — Amanda!",
  duration: 40,
  sections: [
    { id: "A", title: "Section A — Extract-based (5 marks)", instr: "Read the commentary and answer all parts. (The passage is SOYL commentary; read the poem in First Flight.)", items: ["src_nagging"] },
    { id: "B", title: "Section B — Short answers (3 marks each)", instr: "Answer any three of four in 40–50 words.", items: [{ attempt: 3, keys: ["sa_complaints", "sa_mermaid", "sa_orphan", "sa_rapunzel"] }] },
    { id: "C", title: "Section C — Long answer (6 marks)", instr: "Answer any one in 100–120 words.", items: [{ attempt: 1, keys: ["la_freedom", "la_two_worlds"] }] },
  ],
});
const T_LONG = test({
  kind: "long",
  blueprint: "cbse-10-english-language-and-literature-chapter-test-long",
  title: "Chapter test (long) — Amanda!",
  duration: 90,
  sections: [
    { id: "A", title: "Section A — Extract-based (2 × 5 marks)", instr: "In each pair, answer one passage. (Passages are SOYL commentary.)", items: [{ attempt: 1, keys: ["src_mermaid", "src_orphan"] }, { attempt: 1, keys: ["src_rapunzel", "src_ending"] }] },
    { id: "B", title: "Section B — Short answers (2 marks each)", instr: "Answer any three of four in 30–40 words.", items: [{ attempt: 3, keys: ["sb_acne", "sb_sulking", "sb_orphan_why", "sb_rapunzel_who"] }] },
    { id: "C", title: "Section C — Short answers (3 marks each)", instr: "Answer any four of five in 40–50 words.", items: [{ attempt: 4, keys: ["sa_brackets", "sa_irony", "sa_amanda", "sa_adult", "sa_devices"] }] },
    { id: "D", title: "Section D — Long answers (6 marks each)", instr: "Answer one question from each pair in 100–120 words.", items: [{ attempt: 1, keys: ["la_diary", "la_adult_view"] }, { attempt: 1, keys: ["la_letter", "la_relevance"] }] },
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
    literature_rule: "poem in copyright: no line or phrase reproduced (only the title, the girl's name and single words: hunch, slouching, languid, acne, emerald, tranquil, sulking, Rapunzel); the adult's commands named as topics, never written as commands; the daydreams described in SOYL words, not paraphrased line by line; device examples are SOYL sentences; extract items use SOYL commentary (passage_origin soyl-commentary); textbook pointer on the title slide, notes and every passage stem; forbidden-phrase guard (src/guard.mjs) run after the build",
    accuracy: "structure (seven stanzas, three bracketed daydreams in the order mermaid, orphan, Rapunzel) and the ironic ending checked; the speaker of the commands is an adult, usually read as the mother",
    re_solve: "author verifier pass: every item re-answered from its stem",
    gate: "npm test -w @soyl/content-templates and content lint (lintExemplar) run clean on this chapter",
  },
});
checkForbidden(DIR, FORBID);
